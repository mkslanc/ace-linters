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

    this.detach = function(editor) {
        if (!this.$commandExecHandler) return;
        editor.commands.off('exec', this.$commandExecHandler);
        delete this.$commandExecHandler;
    };

    var handleKeyboard$super = this.handleKeyboard;
    this.handleKeyboard = function(data, hashId, key, keyCode) {
        if (((hashId === 1/*ctrl*/ || hashId === 8/*command*/) && key === 'v')
         || (hashId === 1/*ctrl*/ && key === 'y')) return null;
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

function regExpToObject(re) {
    var string = String(re),
        start = string.indexOf('/'),
        flagStart = string.lastIndexOf('/');
    return {
        expression: string.slice(start+1, flagStart),
        flags: string.slice(flagStart+1)
    };
}

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

    highlight(regexp) {
        var sess = this.$editor.session,
            hl = sess.$isearchHighlight = sess.$isearchHighlight || sess.addDynamicMarker(
                new SearchHighlight(null, "ace_isearch-result", "text"));
        hl.setRegexp(regexp);
        sess._emit("changeBackMarker"); // force highlight layer redraw
    }

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

    addString(s) {
        return this.highlightAndFindWithNeedle(false, function(needle) {
            if (!isRegExp(needle))
              return needle + s;
            var reObj = regExpToObject(needle);
            reObj.expression += s;
            return objectToRegExp(reObj);
        });
    }

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


var oop = __webpack_require__(89359);
var Search = (__webpack_require__(46745)/* .Search */ .o);
var EditSession = (__webpack_require__(66480)/* .EditSession */ .m);
var SearchHighlight = (__webpack_require__(57988)/* .SearchHighlight */ .t);

/**
 * @class Occur
 *
 * Finds all lines matching a search term in the current [[Document
 * `Document`]] and displays them instead of the original `Document`. Keeps
 * track of the mapping between the occur doc and the original doc.
 *
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

    highlight(sess, regexp) {
        var hl = sess.$occurHighlight = sess.$occurHighlight || sess.addDynamicMarker(
                new SearchHighlight(null, "ace_occur-highlight", "text"));
        hl.setRegexp(regexp);
        sess._emit("changeBackMarker"); // force highlight layer redraw
    }

    displayOccurContent(editor, options) {
        // this.setSession(session || new EditSession(""))
        this.$originalSession = editor.session;
        var found = this.matchingLines(editor.session, options);
        var lines = found.map(function(foundLine) { return foundLine.content; });
        var occurSession = new EditSession(lines.join('\n'));
        occurSession.$occur = this;
        occurSession.$occurMatchingLines = found;
        editor.setSession(occurSession);
        this.$useEmacsStyleLineStart = this.$originalSession.$useEmacsStyleLineStart;
        occurSession.$useEmacsStyleLineStart = this.$useEmacsStyleLineStart;
        this.highlight(occurSession, options.re);
        occurSession._emit('changeBackMarker');
    }

    displayOriginalContent(editor) {
        editor.setSession(this.$originalSession);
        this.$originalSession.$useEmacsStyleLineStart = this.$useEmacsStyleLineStart;
    }

    /**
    * Translates the position from the original document to the occur lines in
    * the document or the beginning if the doc {row: 0, column: 0} if not
    * found.
    * @param {EditSession} session The occur session
    * @param {Object} pos The position in the original document
    * @return {Object} position in occur doc
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
    * @param {Object} pos The position in the occur session document
    * @return {Object} position
    **/
    occurToOriginalPosition(session, pos) {
        var lines = session.$occurMatchingLines;
        if (!lines || !lines[pos.row])
            return pos;
        return {row: lines[pos.row].row, column: pos.column};
    }

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b2R1bGVzL2FjZS1jb2RlL3NyYy9jb21tYW5kcy9pbmNyZW1lbnRhbF9zZWFyY2hfY29tbWFuZHMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvY29tbWFuZHMvb2NjdXJfY29tbWFuZHMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvaW5jcmVtZW50YWxfc2VhcmNoLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2tleWJvYXJkL2VtYWNzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL29jY3VyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBjb25maWcgPSByZXF1aXJlKFwiLi4vY29uZmlnXCIpO1xudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIEhhc2hIYW5kbGVyID0gcmVxdWlyZShcIi4uL2tleWJvYXJkL2hhc2hfaGFuZGxlclwiKS5IYXNoSGFuZGxlcjtcbnZhciBvY2N1clN0YXJ0Q29tbWFuZCA9IHJlcXVpcmUoXCIuL29jY3VyX2NvbW1hbmRzXCIpLm9jY3VyU3RhcnRDb21tYW5kO1xuXG4vLyBUaGVzZSBjb21tYW5kcyBjYW4gYmUgaW5zdGFsbGVkIGluIGEgbm9ybWFsIGtleSBoYW5kbGVyIHRvIHN0YXJ0IGlTZWFyY2g6XG5leHBvcnRzLmlTZWFyY2hTdGFydENvbW1hbmRzID0gW3tcbiAgICBuYW1lOiBcImlTZWFyY2hcIixcbiAgICBiaW5kS2V5OiB7d2luOiBcIkN0cmwtRlwiLCBtYWM6IFwiQ29tbWFuZC1GXCJ9LFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvciwgb3B0aW9ucykge1xuICAgICAgICBjb25maWcubG9hZE1vZHVsZShbXCJjb3JlXCIsIFwiYWNlL2luY3JlbWVudGFsX3NlYXJjaFwiXSwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIGlTZWFyY2ggPSBlLmlTZWFyY2ggPSBlLmlTZWFyY2ggfHwgbmV3IGUuSW5jcmVtZW50YWxTZWFyY2goKTtcbiAgICAgICAgICAgIGlTZWFyY2guYWN0aXZhdGUoZWRpdG9yLCBvcHRpb25zLmJhY2t3YXJkcyk7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5qdW1wVG9GaXJzdE1hdGNoKSBpU2VhcmNoLm5leHQob3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgIH0sXG4gICAgcmVhZE9ubHk6IHRydWVcbn0sIHtcbiAgICBuYW1lOiBcImlTZWFyY2hCYWNrd2FyZHNcIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IsIGp1bXBUb05leHQpIHsgZWRpdG9yLmV4ZWNDb21tYW5kKCdpU2VhcmNoJywge2JhY2t3YXJkczogdHJ1ZX0pOyB9LFxuICAgIHJlYWRPbmx5OiB0cnVlXG59LCB7XG4gICAgbmFtZTogXCJpU2VhcmNoQW5kR29cIixcbiAgICBiaW5kS2V5OiB7d2luOiBcIkN0cmwtS1wiLCBtYWM6IFwiQ29tbWFuZC1HXCJ9LFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvciwganVtcFRvTmV4dCkgeyBlZGl0b3IuZXhlY0NvbW1hbmQoJ2lTZWFyY2gnLCB7anVtcFRvRmlyc3RNYXRjaDogdHJ1ZSwgdXNlQ3VycmVudE9yUHJldlNlYXJjaDogdHJ1ZX0pOyB9LFxuICAgIHJlYWRPbmx5OiB0cnVlXG59LCB7XG4gICAgbmFtZTogXCJpU2VhcmNoQmFja3dhcmRzQW5kR29cIixcbiAgICBiaW5kS2V5OiB7d2luOiBcIkN0cmwtU2hpZnQtS1wiLCBtYWM6IFwiQ29tbWFuZC1TaGlmdC1HXCJ9LFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikgeyBlZGl0b3IuZXhlY0NvbW1hbmQoJ2lTZWFyY2gnLCB7anVtcFRvRmlyc3RNYXRjaDogdHJ1ZSwgYmFja3dhcmRzOiB0cnVlLCB1c2VDdXJyZW50T3JQcmV2U2VhcmNoOiB0cnVlfSk7IH0sXG4gICAgcmVhZE9ubHk6IHRydWVcbn1dO1xuXG4vLyBUaGVzZSBjb21tYW5kcyBhcmUgb25seSBhdmFpbGFibGUgd2hlbiBpbmNyZW1lbnRhbCBzZWFyY2ggbW9kZSBpcyBhY3RpdmU6XG5leHBvcnRzLmlTZWFyY2hDb21tYW5kcyA9IFt7XG4gICAgbmFtZTogXCJyZXN0YXJ0U2VhcmNoXCIsXG4gICAgYmluZEtleToge3dpbjogXCJDdHJsLUZcIiwgbWFjOiBcIkNvbW1hbmQtRlwifSxcbiAgICBleGVjOiBmdW5jdGlvbihpU2VhcmNoKSB7XG4gICAgICAgIGlTZWFyY2guY2FuY2VsU2VhcmNoKHRydWUpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcInNlYXJjaEZvcndhcmRcIixcbiAgICBiaW5kS2V5OiB7d2luOiBcIkN0cmwtU3xDdHJsLUtcIiwgbWFjOiBcIkN0cmwtU3xDb21tYW5kLUdcIn0sXG4gICAgZXhlYzogZnVuY3Rpb24oaVNlYXJjaCwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zLnVzZUN1cnJlbnRPclByZXZTZWFyY2ggPSB0cnVlO1xuICAgICAgICBpU2VhcmNoLm5leHQob3B0aW9ucyk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwic2VhcmNoQmFja3dhcmRcIixcbiAgICBiaW5kS2V5OiB7d2luOiBcIkN0cmwtUnxDdHJsLVNoaWZ0LUtcIiwgbWFjOiBcIkN0cmwtUnxDb21tYW5kLVNoaWZ0LUdcIn0sXG4gICAgZXhlYzogZnVuY3Rpb24oaVNlYXJjaCwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zLnVzZUN1cnJlbnRPclByZXZTZWFyY2ggPSB0cnVlO1xuICAgICAgICBvcHRpb25zLmJhY2t3YXJkcyA9IHRydWU7XG4gICAgICAgIGlTZWFyY2gubmV4dChvcHRpb25zKTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogXCJleHRlbmRTZWFyY2hUZXJtXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oaVNlYXJjaCwgc3RyaW5nKSB7XG4gICAgICAgIGlTZWFyY2guYWRkU3RyaW5nKHN0cmluZyk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwiZXh0ZW5kU2VhcmNoVGVybVNwYWNlXCIsXG4gICAgYmluZEtleTogXCJzcGFjZVwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGlTZWFyY2gpIHsgaVNlYXJjaC5hZGRTdHJpbmcoJyAnKTsgfVxufSwge1xuICAgIG5hbWU6IFwic2hyaW5rU2VhcmNoVGVybVwiLFxuICAgIGJpbmRLZXk6IFwiYmFja3NwYWNlXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oaVNlYXJjaCkge1xuICAgICAgICBpU2VhcmNoLnJlbW92ZUNoYXIoKTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogJ2NvbmZpcm1TZWFyY2gnLFxuICAgIGJpbmRLZXk6ICdyZXR1cm4nLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGlTZWFyY2gpIHsgaVNlYXJjaC5kZWFjdGl2YXRlKCk7IH1cbn0sIHtcbiAgICBuYW1lOiAnY2FuY2VsU2VhcmNoJyxcbiAgICBiaW5kS2V5OiAnZXNjfEN0cmwtRycsXG4gICAgZXhlYzogZnVuY3Rpb24oaVNlYXJjaCkgeyBpU2VhcmNoLmRlYWN0aXZhdGUodHJ1ZSk7IH1cbn0sIHtcbiAgICBuYW1lOiAnb2NjdXJpc2VhcmNoJyxcbiAgICBiaW5kS2V5OiAnQ3RybC1PJyxcbiAgICBleGVjOiBmdW5jdGlvbihpU2VhcmNoKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gb29wLm1peGluKHt9LCBpU2VhcmNoLiRvcHRpb25zKTtcbiAgICAgICAgaVNlYXJjaC5kZWFjdGl2YXRlKCk7XG4gICAgICAgIG9jY3VyU3RhcnRDb21tYW5kLmV4ZWMoaVNlYXJjaC4kZWRpdG9yLCBvcHRpb25zKTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogXCJ5YW5rTmV4dFdvcmRcIixcbiAgICBiaW5kS2V5OiBcIkN0cmwtd1wiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGlTZWFyY2gpIHtcbiAgICAgICAgdmFyIGVkID0gaVNlYXJjaC4kZWRpdG9yLFxuICAgICAgICAgICAgcmFuZ2UgPSBlZC5zZWxlY3Rpb24uZ2V0UmFuZ2VPZk1vdmVtZW50cyhmdW5jdGlvbihzZWwpIHsgc2VsLm1vdmVDdXJzb3JXb3JkUmlnaHQoKTsgfSksXG4gICAgICAgICAgICBzdHJpbmcgPSBlZC5zZXNzaW9uLmdldFRleHRSYW5nZShyYW5nZSk7XG4gICAgICAgIGlTZWFyY2guYWRkU3RyaW5nKHN0cmluZyk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwieWFua05leHRDaGFyXCIsXG4gICAgYmluZEtleTogXCJDdHJsLUFsdC15XCIsXG4gICAgZXhlYzogZnVuY3Rpb24oaVNlYXJjaCkge1xuICAgICAgICB2YXIgZWQgPSBpU2VhcmNoLiRlZGl0b3IsXG4gICAgICAgICAgICByYW5nZSA9IGVkLnNlbGVjdGlvbi5nZXRSYW5nZU9mTW92ZW1lbnRzKGZ1bmN0aW9uKHNlbCkgeyBzZWwubW92ZUN1cnNvclJpZ2h0KCk7IH0pLFxuICAgICAgICAgICAgc3RyaW5nID0gZWQuc2Vzc2lvbi5nZXRUZXh0UmFuZ2UocmFuZ2UpO1xuICAgICAgICBpU2VhcmNoLmFkZFN0cmluZyhzdHJpbmcpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiAncmVjZW50ZXJUb3BCb3R0b20nLFxuICAgIGJpbmRLZXk6ICdDdHJsLWwnLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGlTZWFyY2gpIHsgaVNlYXJjaC4kZWRpdG9yLmV4ZWNDb21tYW5kKCdyZWNlbnRlclRvcEJvdHRvbScpOyB9XG59LCB7XG4gICAgbmFtZTogJ3NlbGVjdEFsbE1hdGNoZXMnLFxuICAgIGJpbmRLZXk6ICdDdHJsLXNwYWNlJyxcbiAgICBleGVjOiBmdW5jdGlvbihpU2VhcmNoKSB7XG4gICAgICAgIHZhciBlZCA9IGlTZWFyY2guJGVkaXRvcixcbiAgICAgICAgICAgIGhsID0gZWQuc2Vzc2lvbi4kaXNlYXJjaEhpZ2hsaWdodCxcbiAgICAgICAgICAgIHJhbmdlcyA9IGhsICYmIGhsLmNhY2hlID8gaGwuY2FjaGVcbiAgICAgICAgICAgICAgICAucmVkdWNlKGZ1bmN0aW9uKHJhbmdlcywgZWEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJhbmdlcy5jb25jYXQoZWEgPyBlYSA6IFtdKTsgfSwgW10pIDogW107XG4gICAgICAgIGlTZWFyY2guZGVhY3RpdmF0ZShmYWxzZSk7XG4gICAgICAgIHJhbmdlcy5mb3JFYWNoKGVkLnNlbGVjdGlvbi5hZGRSYW5nZS5iaW5kKGVkLnNlbGVjdGlvbikpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiAnc2VhcmNoQXNSZWdFeHAnLFxuICAgIGJpbmRLZXk6ICdBbHQtcicsXG4gICAgZXhlYzogZnVuY3Rpb24oaVNlYXJjaCkge1xuICAgICAgICBpU2VhcmNoLmNvbnZlcnROZWVkbGVUb1JlZ0V4cCgpO1xuICAgIH1cbn1dLm1hcChmdW5jdGlvbihjbWQpIHtcbiAgICBjbWQucmVhZE9ubHkgPSB0cnVlO1xuICAgIGNtZC5pc0luY3JlbWVudGFsU2VhcmNoQ29tbWFuZCA9IHRydWU7XG4gICAgY21kLnNjcm9sbEludG9WaWV3ID0gXCJhbmltYXRlLWN1cnNvclwiO1xuICAgIHJldHVybiBjbWQ7XG59KTtcblxuZnVuY3Rpb24gSW5jcmVtZW50YWxTZWFyY2hLZXlib2FyZEhhbmRsZXIoaVNlYXJjaCkge1xuICAgIHRoaXMuJGlTZWFyY2ggPSBpU2VhcmNoO1xufVxuXG5vb3AuaW5oZXJpdHMoSW5jcmVtZW50YWxTZWFyY2hLZXlib2FyZEhhbmRsZXIsIEhhc2hIYW5kbGVyKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5hdHRhY2ggPSBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgdmFyIGlTZWFyY2ggPSB0aGlzLiRpU2VhcmNoO1xuICAgICAgICBIYXNoSGFuZGxlci5jYWxsKHRoaXMsIGV4cG9ydHMuaVNlYXJjaENvbW1hbmRzLCBlZGl0b3IuY29tbWFuZHMucGxhdGZvcm0pO1xuICAgICAgICB0aGlzLiRjb21tYW5kRXhlY0hhbmRsZXIgPSBlZGl0b3IuY29tbWFuZHMub24oJ2V4ZWMnLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoIWUuY29tbWFuZC5pc0luY3JlbWVudGFsU2VhcmNoQ29tbWFuZClcbiAgICAgICAgICAgICAgICByZXR1cm4gaVNlYXJjaC5kZWFjdGl2YXRlKCk7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIHNjcm9sbFRvcCA9IGVkaXRvci5zZXNzaW9uLmdldFNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGUuY29tbWFuZC5leGVjKGlTZWFyY2gsIGUuYXJncyB8fCB7fSk7XG4gICAgICAgICAgICBlZGl0b3IucmVuZGVyZXIuc2Nyb2xsQ3Vyc29ySW50b1ZpZXcobnVsbCwgMC41KTtcbiAgICAgICAgICAgIGVkaXRvci5yZW5kZXJlci5hbmltYXRlU2Nyb2xsaW5nKHNjcm9sbFRvcCk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5kZXRhY2ggPSBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgaWYgKCF0aGlzLiRjb21tYW5kRXhlY0hhbmRsZXIpIHJldHVybjtcbiAgICAgICAgZWRpdG9yLmNvbW1hbmRzLm9mZignZXhlYycsIHRoaXMuJGNvbW1hbmRFeGVjSGFuZGxlcik7XG4gICAgICAgIGRlbGV0ZSB0aGlzLiRjb21tYW5kRXhlY0hhbmRsZXI7XG4gICAgfTtcblxuICAgIHZhciBoYW5kbGVLZXlib2FyZCRzdXBlciA9IHRoaXMuaGFuZGxlS2V5Ym9hcmQ7XG4gICAgdGhpcy5oYW5kbGVLZXlib2FyZCA9IGZ1bmN0aW9uKGRhdGEsIGhhc2hJZCwga2V5LCBrZXlDb2RlKSB7XG4gICAgICAgIGlmICgoKGhhc2hJZCA9PT0gMS8qY3RybCovIHx8IGhhc2hJZCA9PT0gOC8qY29tbWFuZCovKSAmJiBrZXkgPT09ICd2JylcbiAgICAgICAgIHx8IChoYXNoSWQgPT09IDEvKmN0cmwqLyAmJiBrZXkgPT09ICd5JykpIHJldHVybiBudWxsO1xuICAgICAgICB2YXIgY21kID0gaGFuZGxlS2V5Ym9hcmQkc3VwZXIuY2FsbCh0aGlzLCBkYXRhLCBoYXNoSWQsIGtleSwga2V5Q29kZSk7XG4gICAgICAgIGlmIChjbWQgJiYgY21kLmNvbW1hbmQpIHsgcmV0dXJuIGNtZDsgfVxuICAgICAgICBpZiAoaGFzaElkID09IC0xKSB7XG4gICAgICAgICAgICB2YXIgZXh0ZW5kQ21kID0gdGhpcy5jb21tYW5kcy5leHRlbmRTZWFyY2hUZXJtO1xuICAgICAgICAgICAgaWYgKGV4dGVuZENtZCkgeyByZXR1cm4ge2NvbW1hbmQ6IGV4dGVuZENtZCwgYXJnczoga2V5fTsgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG59KS5jYWxsKEluY3JlbWVudGFsU2VhcmNoS2V5Ym9hcmRIYW5kbGVyLnByb3RvdHlwZSk7XG5cblxuZXhwb3J0cy5JbmNyZW1lbnRhbFNlYXJjaEtleWJvYXJkSGFuZGxlciA9IEluY3JlbWVudGFsU2VhcmNoS2V5Ym9hcmRIYW5kbGVyO1xuIiwidmFyIGNvbmZpZyA9IHJlcXVpcmUoXCIuLi9jb25maWdcIiksXG4gICAgT2NjdXIgPSByZXF1aXJlKFwiLi4vb2NjdXJcIikuT2NjdXI7XG5cbi8vIFRoZXNlIGNvbW1hbmRzIGNhbiBiZSBpbnN0YWxsZWQgaW4gYSBub3JtYWwgY29tbWFuZCBoYW5kbGVyIHRvIHN0YXJ0IG9jY3VyOlxudmFyIG9jY3VyU3RhcnRDb21tYW5kID0ge1xuICAgIG5hbWU6IFwib2NjdXJcIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGFscmVhZHlJbk9jY3VyID0gISFlZGl0b3Iuc2Vzc2lvbi4kb2NjdXI7XG4gICAgICAgIHZhciBvY2N1clNlc3Npb25BY3RpdmUgPSBuZXcgT2NjdXIoKS5lbnRlcihlZGl0b3IsIG9wdGlvbnMpO1xuICAgICAgICBpZiAob2NjdXJTZXNzaW9uQWN0aXZlICYmICFhbHJlYWR5SW5PY2N1cilcbiAgICAgICAgICAgIE9jY3VyS2V5Ym9hcmRIYW5kbGVyLmluc3RhbGxJbihlZGl0b3IpO1xuICAgIH0sXG4gICAgcmVhZE9ubHk6IHRydWVcbn07XG5cbnZhciBvY2N1ckNvbW1hbmRzID0gW3tcbiAgICBuYW1lOiBcIm9jY3VyZXhpdFwiLFxuICAgIGJpbmRLZXk6ICdlc2N8Q3RybC1HJyxcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgdmFyIG9jY3VyID0gZWRpdG9yLnNlc3Npb24uJG9jY3VyO1xuICAgICAgICBpZiAoIW9jY3VyKSByZXR1cm47XG4gICAgICAgIG9jY3VyLmV4aXQoZWRpdG9yLCB7fSk7XG4gICAgICAgIGlmICghZWRpdG9yLnNlc3Npb24uJG9jY3VyKSBPY2N1cktleWJvYXJkSGFuZGxlci51bmluc3RhbGxGcm9tKGVkaXRvcik7XG4gICAgfSxcbiAgICByZWFkT25seTogdHJ1ZVxufSwge1xuICAgIG5hbWU6IFwib2NjdXJhY2NlcHRcIixcbiAgICBiaW5kS2V5OiAnZW50ZXInLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICB2YXIgb2NjdXIgPSBlZGl0b3Iuc2Vzc2lvbi4kb2NjdXI7XG4gICAgICAgIGlmICghb2NjdXIpIHJldHVybjtcbiAgICAgICAgb2NjdXIuZXhpdChlZGl0b3IsIHt0cmFuc2xhdGVQb3NpdGlvbjogdHJ1ZX0pO1xuICAgICAgICBpZiAoIWVkaXRvci5zZXNzaW9uLiRvY2N1cikgT2NjdXJLZXlib2FyZEhhbmRsZXIudW5pbnN0YWxsRnJvbShlZGl0b3IpO1xuICAgIH0sXG4gICAgcmVhZE9ubHk6IHRydWVcbn1dO1xuXG52YXIgSGFzaEhhbmRsZXIgPSByZXF1aXJlKFwiLi4va2V5Ym9hcmQvaGFzaF9oYW5kbGVyXCIpLkhhc2hIYW5kbGVyO1xudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xuXG5cbmZ1bmN0aW9uIE9jY3VyS2V5Ym9hcmRIYW5kbGVyKCkge31cblxub29wLmluaGVyaXRzKE9jY3VyS2V5Ym9hcmRIYW5kbGVyLCBIYXNoSGFuZGxlcik7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuaXNPY2N1ckhhbmRsZXIgPSB0cnVlO1xuXG4gICAgdGhpcy5hdHRhY2ggPSBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgSGFzaEhhbmRsZXIuY2FsbCh0aGlzLCBvY2N1ckNvbW1hbmRzLCBlZGl0b3IuY29tbWFuZHMucGxhdGZvcm0pO1xuICAgICAgICB0aGlzLiRlZGl0b3IgPSBlZGl0b3I7XG4gICAgfTtcblxuICAgIHZhciBoYW5kbGVLZXlib2FyZCRzdXBlciA9IHRoaXMuaGFuZGxlS2V5Ym9hcmQ7XG4gICAgdGhpcy5oYW5kbGVLZXlib2FyZCA9IGZ1bmN0aW9uKGRhdGEsIGhhc2hJZCwga2V5LCBrZXlDb2RlKSB7XG4gICAgICAgIHZhciBjbWQgPSBoYW5kbGVLZXlib2FyZCRzdXBlci5jYWxsKHRoaXMsIGRhdGEsIGhhc2hJZCwga2V5LCBrZXlDb2RlKTtcbiAgICAgICAgcmV0dXJuIChjbWQgJiYgY21kLmNvbW1hbmQpID8gY21kIDogdW5kZWZpbmVkO1xuICAgIH07XG5cbn0pLmNhbGwoT2NjdXJLZXlib2FyZEhhbmRsZXIucHJvdG90eXBlKTtcblxuT2NjdXJLZXlib2FyZEhhbmRsZXIuaW5zdGFsbEluID0gZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgdmFyIGhhbmRsZXIgPSBuZXcgdGhpcygpO1xuICAgIGVkaXRvci5rZXlCaW5kaW5nLmFkZEtleWJvYXJkSGFuZGxlcihoYW5kbGVyKTtcbiAgICBlZGl0b3IuY29tbWFuZHMuYWRkQ29tbWFuZHMob2NjdXJDb21tYW5kcyk7XG59O1xuXG5PY2N1cktleWJvYXJkSGFuZGxlci51bmluc3RhbGxGcm9tID0gZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgZWRpdG9yLmNvbW1hbmRzLnJlbW92ZUNvbW1hbmRzKG9jY3VyQ29tbWFuZHMpO1xuICAgIHZhciBoYW5kbGVyID0gZWRpdG9yLmdldEtleWJvYXJkSGFuZGxlcigpO1xuICAgIGlmIChoYW5kbGVyLmlzT2NjdXJIYW5kbGVyKVxuICAgICAgICBlZGl0b3Iua2V5QmluZGluZy5yZW1vdmVLZXlib2FyZEhhbmRsZXIoaGFuZGxlcik7XG59O1xuXG5leHBvcnRzLm9jY3VyU3RhcnRDb21tYW5kID0gb2NjdXJTdGFydENvbW1hbmQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJhbmdlID0gcmVxdWlyZShcIi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgU2VhcmNoID0gcmVxdWlyZShcIi4vc2VhcmNoXCIpLlNlYXJjaDtcbnZhciBTZWFyY2hIaWdobGlnaHQgPSByZXF1aXJlKFwiLi9zZWFyY2hfaGlnaGxpZ2h0XCIpLlNlYXJjaEhpZ2hsaWdodDtcbnZhciBpU2VhcmNoQ29tbWFuZE1vZHVsZSA9IHJlcXVpcmUoXCIuL2NvbW1hbmRzL2luY3JlbWVudGFsX3NlYXJjaF9jb21tYW5kc1wiKTtcbnZhciBJU2VhcmNoS2JkID0gaVNlYXJjaENvbW1hbmRNb2R1bGUuSW5jcmVtZW50YWxTZWFyY2hLZXlib2FyZEhhbmRsZXI7XG5cbi8vIHJlZ2V4cCBoYW5kbGluZ1xuXG5mdW5jdGlvbiBpc1JlZ0V4cChvYmopIHtcbiAgICByZXR1cm4gb2JqIGluc3RhbmNlb2YgUmVnRXhwO1xufVxuXG5mdW5jdGlvbiByZWdFeHBUb09iamVjdChyZSkge1xuICAgIHZhciBzdHJpbmcgPSBTdHJpbmcocmUpLFxuICAgICAgICBzdGFydCA9IHN0cmluZy5pbmRleE9mKCcvJyksXG4gICAgICAgIGZsYWdTdGFydCA9IHN0cmluZy5sYXN0SW5kZXhPZignLycpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGV4cHJlc3Npb246IHN0cmluZy5zbGljZShzdGFydCsxLCBmbGFnU3RhcnQpLFxuICAgICAgICBmbGFnczogc3RyaW5nLnNsaWNlKGZsYWdTdGFydCsxKVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHN0cmluZ1RvUmVnRXhwKHN0cmluZywgZmxhZ3MpIHtcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gbmV3IFJlZ0V4cChzdHJpbmcsIGZsYWdzKTtcbiAgICB9IGNhdGNoIChlKSB7IHJldHVybiBzdHJpbmc7IH1cbn1cblxuZnVuY3Rpb24gb2JqZWN0VG9SZWdFeHAob2JqKSB7XG4gICAgcmV0dXJuIHN0cmluZ1RvUmVnRXhwKG9iai5leHByZXNzaW9uLCBvYmouZmxhZ3MpO1xufVxuXG4vKipcbiAqIEltcGxlbWVudHMgaW1tZWRpYXRlIHNlYXJjaGluZyB3aGlsZSB0aGUgdXNlciBpcyB0eXBpbmcuIFdoZW4gaW5jcmVtZW50YWxcbiAqIHNlYXJjaCBpcyBhY3RpdmF0ZWQsIGtleXN0cm9rZXMgaW50byB0aGUgZWRpdG9yIHdpbGwgYmUgdXNlZCBmb3IgY29tcG9zaW5nXG4gKiBhIHNlYXJjaCB0ZXJtLiBJbW1lZGlhdGVseSBhZnRlciBldmVyeSBrZXlzdHJva2UgdGhlIHNlYXJjaCBpcyB1cGRhdGVkOlxuICogLSBzby1mYXItbWF0Y2hpbmcgY2hhcmFjdGVycyBhcmUgaGlnaGxpZ2h0ZWRcbiAqIC0gdGhlIGN1cnNvciBpcyBtb3ZlZCB0byB0aGUgbmV4dCBtYXRjaFxuICpcbiAqKi9cbmNsYXNzIEluY3JlbWVudGFsU2VhcmNoIGV4dGVuZHMgU2VhcmNoIHtcbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGBJbmNyZW1lbnRhbFNlYXJjaGAgb2JqZWN0LlxuICAgICAqKi9cbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy4kb3B0aW9ucyA9IHt3cmFwOiBmYWxzZSwgc2tpcEN1cnJlbnQ6IGZhbHNlfTtcbiAgICAgICAgdGhpcy4ka2V5Ym9hcmRIYW5kbGVyID0gbmV3IElTZWFyY2hLYmQodGhpcyk7XG4gICAgfVxuICAgIFxuICAgIGFjdGl2YXRlKGVkaXRvciwgYmFja3dhcmRzKSB7XG4gICAgICAgIHRoaXMuJGVkaXRvciA9IGVkaXRvcjtcbiAgICAgICAgdGhpcy4kc3RhcnRQb3MgPSB0aGlzLiRjdXJyZW50UG9zID0gZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuJG9wdGlvbnMubmVlZGxlID0gJyc7XG4gICAgICAgIHRoaXMuJG9wdGlvbnMuYmFja3dhcmRzID0gYmFja3dhcmRzO1xuICAgICAgICBlZGl0b3Iua2V5QmluZGluZy5hZGRLZXlib2FyZEhhbmRsZXIodGhpcy4ka2V5Ym9hcmRIYW5kbGVyKTtcbiAgICAgICAgLy8gd2UgbmVlZCB0byBjb21wbGV0ZWx5IGludGVyY2VwdCBwYXN0ZSwganVzdCByZWdpc3RlcmluZyBhbiBldmVudCBoYW5kbGVyIGRvZXMgbm90IHdvcmtcbiAgICAgICAgdGhpcy4kb3JpZ2luYWxFZGl0b3JPblBhc3RlID0gZWRpdG9yLm9uUGFzdGU7IFxuICAgICAgICBlZGl0b3Iub25QYXN0ZSA9IHRoaXMub25QYXN0ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLiRtb3VzZWRvd25IYW5kbGVyID0gZWRpdG9yLm9uKCdtb3VzZWRvd24nLCB0aGlzLm9uTW91c2VEb3duLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLnNlbGVjdGlvbkZpeChlZGl0b3IpO1xuICAgICAgICB0aGlzLnN0YXR1c01lc3NhZ2UodHJ1ZSk7XG4gICAgfVxuXG4gICAgZGVhY3RpdmF0ZShyZXNldCkge1xuICAgICAgICB0aGlzLmNhbmNlbFNlYXJjaChyZXNldCk7XG4gICAgICAgIHZhciBlZGl0b3IgPSB0aGlzLiRlZGl0b3I7XG4gICAgICAgIGVkaXRvci5rZXlCaW5kaW5nLnJlbW92ZUtleWJvYXJkSGFuZGxlcih0aGlzLiRrZXlib2FyZEhhbmRsZXIpO1xuICAgICAgICBpZiAodGhpcy4kbW91c2Vkb3duSGFuZGxlcikge1xuICAgICAgICAgICAgZWRpdG9yLm9mZignbW91c2Vkb3duJywgdGhpcy4kbW91c2Vkb3duSGFuZGxlcik7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy4kbW91c2Vkb3duSGFuZGxlcjtcbiAgICAgICAgfVxuICAgICAgICBlZGl0b3Iub25QYXN0ZSA9IHRoaXMuJG9yaWdpbmFsRWRpdG9yT25QYXN0ZTtcbiAgICAgICAgdGhpcy5tZXNzYWdlKCcnKTtcbiAgICB9XG5cbiAgICBzZWxlY3Rpb25GaXgoZWRpdG9yKSB7XG4gICAgICAgIC8vIEZpeCBzZWxlY3Rpb24gYnVnOiBXaGVuIGNsaWNrZWQgaW5zaWRlIHRoZSBlZGl0b3JcbiAgICAgICAgLy8gZWRpdG9yLnNlbGVjdGlvbi4kaXNFbXB0eSBpcyBmYWxzZSBldmVuIGlmIHRoZSBtb3VzZSBjbGljayBkaWQgbm90XG4gICAgICAgIC8vIG9wZW4gYSBzZWxlY3Rpb24uIFRoaXMgaXMgaW50ZXJwcmV0ZWQgYnkgdGhlIG1vdmUgY29tbWFuZHMgdG9cbiAgICAgICAgLy8gZXh0ZW5kIHRoZSBzZWxlY3Rpb24uIFRvIG9ubHkgZXh0ZW5kIHRoZSBzZWxlY3Rpb24gd2hlbiB0aGVyZSBpc1xuICAgICAgICAvLyBvbmUsIHdlIGNsZWFyIGl0IGhlcmVcbiAgICAgICAgaWYgKGVkaXRvci5zZWxlY3Rpb24uaXNFbXB0eSgpICYmICFlZGl0b3Iuc2Vzc2lvbi4kZW1hY3NNYXJrKSB7XG4gICAgICAgICAgICBlZGl0b3IuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhpZ2hsaWdodChyZWdleHApIHtcbiAgICAgICAgdmFyIHNlc3MgPSB0aGlzLiRlZGl0b3Iuc2Vzc2lvbixcbiAgICAgICAgICAgIGhsID0gc2Vzcy4kaXNlYXJjaEhpZ2hsaWdodCA9IHNlc3MuJGlzZWFyY2hIaWdobGlnaHQgfHwgc2Vzcy5hZGREeW5hbWljTWFya2VyKFxuICAgICAgICAgICAgICAgIG5ldyBTZWFyY2hIaWdobGlnaHQobnVsbCwgXCJhY2VfaXNlYXJjaC1yZXN1bHRcIiwgXCJ0ZXh0XCIpKTtcbiAgICAgICAgaGwuc2V0UmVnZXhwKHJlZ2V4cCk7XG4gICAgICAgIHNlc3MuX2VtaXQoXCJjaGFuZ2VCYWNrTWFya2VyXCIpOyAvLyBmb3JjZSBoaWdobGlnaHQgbGF5ZXIgcmVkcmF3XG4gICAgfVxuXG4gICAgY2FuY2VsU2VhcmNoKHJlc2V0KSB7XG4gICAgICAgIHZhciBlID0gdGhpcy4kZWRpdG9yO1xuICAgICAgICB0aGlzLiRwcmV2TmVlZGxlID0gdGhpcy4kb3B0aW9ucy5uZWVkbGU7XG4gICAgICAgIHRoaXMuJG9wdGlvbnMubmVlZGxlID0gJyc7XG4gICAgICAgIGlmIChyZXNldCkge1xuICAgICAgICAgICAgZS5tb3ZlQ3Vyc29yVG9Qb3NpdGlvbih0aGlzLiRzdGFydFBvcyk7XG4gICAgICAgICAgICB0aGlzLiRjdXJyZW50UG9zID0gdGhpcy4kc3RhcnRQb3M7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlLnB1c2hFbWFjc01hcmsgJiYgZS5wdXNoRW1hY3NNYXJrKHRoaXMuJHN0YXJ0UG9zLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5oaWdobGlnaHQobnVsbCk7XG4gICAgICAgIHJldHVybiBSYW5nZS5mcm9tUG9pbnRzKHRoaXMuJGN1cnJlbnRQb3MsIHRoaXMuJGN1cnJlbnRQb3MpO1xuICAgIH1cblxuICAgIGhpZ2hsaWdodEFuZEZpbmRXaXRoTmVlZGxlKG1vdmVUb05leHQsIG5lZWRsZVVwZGF0ZUZ1bmMpIHtcbiAgICAgICAgaWYgKCF0aGlzLiRlZGl0b3IpIHJldHVybiBudWxsO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHRoaXMuJG9wdGlvbnM7XG5cbiAgICAgICAgLy8gZ2V0IHNlYXJjaCB0ZXJtXG4gICAgICAgIGlmIChuZWVkbGVVcGRhdGVGdW5jKSB7XG4gICAgICAgICAgICBvcHRpb25zLm5lZWRsZSA9IG5lZWRsZVVwZGF0ZUZ1bmMuY2FsbCh0aGlzLCBvcHRpb25zLm5lZWRsZSB8fCAnJykgfHwgJyc7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMubmVlZGxlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhpcy5zdGF0dXNNZXNzYWdlKHRydWUpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FuY2VsU2VhcmNoKHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdHJ5IHRvIGZpbmQgdGhlIG5leHQgb2NjdXJyZW5jZSBhbmQgZW5hYmxlICBoaWdobGlnaHRpbmcgbWFya2VyXG4gICAgICAgIG9wdGlvbnMuc3RhcnQgPSB0aGlzLiRjdXJyZW50UG9zO1xuICAgICAgICB2YXIgc2Vzc2lvbiA9IHRoaXMuJGVkaXRvci5zZXNzaW9uLFxuICAgICAgICAgICAgZm91bmQgPSB0aGlzLmZpbmQoc2Vzc2lvbiksXG4gICAgICAgICAgICBzaG91bGRTZWxlY3QgPSB0aGlzLiRlZGl0b3IuZW1hY3NNYXJrID9cbiAgICAgICAgICAgICAgICAhIXRoaXMuJGVkaXRvci5lbWFjc01hcmsoKSA6ICF0aGlzLiRlZGl0b3Iuc2VsZWN0aW9uLmlzRW1wdHkoKTtcbiAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5iYWNrd2FyZHMpIGZvdW5kID0gUmFuZ2UuZnJvbVBvaW50cyhmb3VuZC5lbmQsIGZvdW5kLnN0YXJ0KTtcbiAgICAgICAgICAgIHRoaXMuJGVkaXRvci5zZWxlY3Rpb24uc2V0UmFuZ2UoUmFuZ2UuZnJvbVBvaW50cyhzaG91bGRTZWxlY3QgPyB0aGlzLiRzdGFydFBvcyA6IGZvdW5kLmVuZCwgZm91bmQuZW5kKSk7XG4gICAgICAgICAgICBpZiAobW92ZVRvTmV4dCkgdGhpcy4kY3VycmVudFBvcyA9IGZvdW5kLmVuZDtcbiAgICAgICAgICAgIC8vIGhpZ2hsaWdodCBhZnRlciBjdXJzb3IgbW92ZSwgc28gc2VsZWN0aW9uIHdvcmtzIHByb3Blcmx5XG4gICAgICAgICAgICB0aGlzLmhpZ2hsaWdodChvcHRpb25zLnJlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdHVzTWVzc2FnZShmb3VuZCk7XG5cbiAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgIH1cblxuICAgIGFkZFN0cmluZyhzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hsaWdodEFuZEZpbmRXaXRoTmVlZGxlKGZhbHNlLCBmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgIGlmICghaXNSZWdFeHAobmVlZGxlKSlcbiAgICAgICAgICAgICAgcmV0dXJuIG5lZWRsZSArIHM7XG4gICAgICAgICAgICB2YXIgcmVPYmogPSByZWdFeHBUb09iamVjdChuZWVkbGUpO1xuICAgICAgICAgICAgcmVPYmouZXhwcmVzc2lvbiArPSBzO1xuICAgICAgICAgICAgcmV0dXJuIG9iamVjdFRvUmVnRXhwKHJlT2JqKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlQ2hhcihjKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hsaWdodEFuZEZpbmRXaXRoTmVlZGxlKGZhbHNlLCBmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgIGlmICghaXNSZWdFeHAobmVlZGxlKSlcbiAgICAgICAgICAgICAgcmV0dXJuIG5lZWRsZS5zdWJzdHJpbmcoMCwgbmVlZGxlLmxlbmd0aC0xKTtcbiAgICAgICAgICAgIHZhciByZU9iaiA9IHJlZ0V4cFRvT2JqZWN0KG5lZWRsZSk7XG4gICAgICAgICAgICByZU9iai5leHByZXNzaW9uID0gcmVPYmouZXhwcmVzc2lvbi5zdWJzdHJpbmcoMCwgcmVPYmouZXhwcmVzc2lvbi5sZW5ndGgtMSk7XG4gICAgICAgICAgICByZXR1cm4gb2JqZWN0VG9SZWdFeHAocmVPYmopO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZXh0KG9wdGlvbnMpIHtcbiAgICAgICAgLy8gdHJ5IHRvIGZpbmQgdGhlIG5leHQgb2NjdXJyZW5jZSBvZiB3aGF0ZXZlciB3ZSBoYXZlIHNlYXJjaGVkIGZvclxuICAgICAgICAvLyBlYXJsaWVyLlxuICAgICAgICAvLyBvcHRpb25zID0ge1tiYWNrd2FyZHM6IEJPT0xdLCBbdXNlQ3VycmVudE9yUHJldlNlYXJjaDogQk9PTF19XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLiRvcHRpb25zLmJhY2t3YXJkcyA9ICEhb3B0aW9ucy5iYWNrd2FyZHM7XG4gICAgICAgIHRoaXMuJGN1cnJlbnRQb3MgPSB0aGlzLiRlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlnaGxpZ2h0QW5kRmluZFdpdGhOZWVkbGUodHJ1ZSwgZnVuY3Rpb24obmVlZGxlKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9ucy51c2VDdXJyZW50T3JQcmV2U2VhcmNoICYmIG5lZWRsZS5sZW5ndGggPT09IDAgP1xuICAgICAgICAgICAgICAgIHRoaXMuJHByZXZOZWVkbGUgfHwgJycgOiBuZWVkbGU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uTW91c2VEb3duKGV2dCkge1xuICAgICAgICAvLyB3aGVuIG1vdXNlIGludGVyYWN0aW9uIGhhcHBlbnMgdGhlbiB3ZSBxdWl0IGluY3JlbWVudGFsIHNlYXJjaFxuICAgICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgb25QYXN0ZSh0ZXh0KSB7XG4gICAgICAgIHRoaXMuYWRkU3RyaW5nKHRleHQpO1xuICAgIH1cblxuICAgIGNvbnZlcnROZWVkbGVUb1JlZ0V4cCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGlnaGxpZ2h0QW5kRmluZFdpdGhOZWVkbGUoZmFsc2UsIGZ1bmN0aW9uKG5lZWRsZSkge1xuICAgICAgICAgICAgcmV0dXJuIGlzUmVnRXhwKG5lZWRsZSkgPyBuZWVkbGUgOiBzdHJpbmdUb1JlZ0V4cChuZWVkbGUsICdpZycpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb252ZXJ0TmVlZGxlVG9TdHJpbmcoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhpZ2hsaWdodEFuZEZpbmRXaXRoTmVlZGxlKGZhbHNlLCBmdW5jdGlvbihuZWVkbGUpIHtcbiAgICAgICAgICAgIHJldHVybiBpc1JlZ0V4cChuZWVkbGUpID8gcmVnRXhwVG9PYmplY3QobmVlZGxlKS5leHByZXNzaW9uIDogbmVlZGxlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzdGF0dXNNZXNzYWdlKGZvdW5kKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gdGhpcy4kb3B0aW9ucywgbXNnID0gJyc7XG4gICAgICAgIG1zZyArPSBvcHRpb25zLmJhY2t3YXJkcyA/ICdyZXZlcnNlLScgOiAnJztcbiAgICAgICAgbXNnICs9ICdpc2VhcmNoOiAnICsgb3B0aW9ucy5uZWVkbGU7XG4gICAgICAgIG1zZyArPSBmb3VuZCA/ICcnIDogJyAobm90IGZvdW5kKSc7XG4gICAgICAgIHRoaXMubWVzc2FnZShtc2cpO1xuICAgIH1cblxuICAgIG1lc3NhZ2UobXNnKSB7XG4gICAgICAgIGlmICh0aGlzLiRlZGl0b3Iuc2hvd0NvbW1hbmRMaW5lKSB7XG4gICAgICAgICAgICB0aGlzLiRlZGl0b3Iuc2hvd0NvbW1hbmRMaW5lKG1zZyk7XG4gICAgICAgICAgICB0aGlzLiRlZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5leHBvcnRzLkluY3JlbWVudGFsU2VhcmNoID0gSW5jcmVtZW50YWxTZWFyY2g7XG5cblxuLyoqXG4gKlxuICogQ29uZmlnIHNldHRpbmdzIGZvciBlbmFibGluZy9kaXNhYmxpbmcgW1tJbmNyZW1lbnRhbFNlYXJjaCBgSW5jcmVtZW50YWxTZWFyY2hgXV0uXG4gKlxuICoqL1xuXG52YXIgZG9tID0gcmVxdWlyZSgnLi9saWIvZG9tJyk7XG5kb20uaW1wb3J0Q3NzU3RyaW5nKGBcbi5hY2VfbWFya2VyLWxheWVyIC5hY2VfaXNlYXJjaC1yZXN1bHQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDY7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG5kaXYuYWNlX2lzZWFyY2gtcmVzdWx0IHtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjAwLCAwLCAwLjUpO1xuICBib3gtc2hhZG93OiAwIDAgNHB4IHJnYigyNTUsIDIwMCwgMCk7XG59XG4uYWNlX2RhcmsgZGl2LmFjZV9pc2VhcmNoLXJlc3VsdCB7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxMDAsIDExMCwgMTYwKTtcbiAgYm94LXNoYWRvdzogMCAwIDRweCByZ2IoODAsIDkwLCAxNDApO1xufWAsIFwiaW5jcmVtZW50YWwtc2VhcmNoLWhpZ2hsaWdodGluZ1wiLCBmYWxzZSk7XG5cbi8vIHN1cHBvcnQgZm9yIGRlZmF1bHQga2V5Ym9hcmQgaGFuZGxlclxudmFyIGNvbW1hbmRzID0gcmVxdWlyZShcIi4vY29tbWFuZHMvY29tbWFuZF9tYW5hZ2VyXCIpO1xuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0dXBJbmNyZW1lbnRhbFNlYXJjaCA9IGZ1bmN0aW9uKGVkaXRvciwgdmFsKSB7XG4gICAgICAgIGlmICh0aGlzLnVzZXNJbmNyZW1lbnRhbFNlYXJjaCA9PSB2YWwpIHJldHVybjtcbiAgICAgICAgdGhpcy51c2VzSW5jcmVtZW50YWxTZWFyY2ggPSB2YWw7XG4gICAgICAgIHZhciBpU2VhcmNoQ29tbWFuZHMgPSBpU2VhcmNoQ29tbWFuZE1vZHVsZS5pU2VhcmNoU3RhcnRDb21tYW5kcztcbiAgICAgICAgdmFyIG1ldGhvZCA9IHZhbCA/ICdhZGRDb21tYW5kcycgOiAncmVtb3ZlQ29tbWFuZHMnO1xuICAgICAgICB0aGlzW21ldGhvZF0oaVNlYXJjaENvbW1hbmRzKTtcbiAgICB9O1xufSkuY2FsbChjb21tYW5kcy5Db21tYW5kTWFuYWdlci5wcm90b3R5cGUpO1xuXG4vLyBpbmNyZW1lbnRhbCBzZWFyY2ggY29uZmlnIG9wdGlvblxudmFyIEVkaXRvciA9IHJlcXVpcmUoXCIuL2VkaXRvclwiKS5FZGl0b3I7XG5yZXF1aXJlKFwiLi9jb25maWdcIikuZGVmaW5lT3B0aW9ucyhFZGl0b3IucHJvdG90eXBlLCBcImVkaXRvclwiLCB7XG4gICAgdXNlSW5jcmVtZW50YWxTZWFyY2g6IHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIHRoaXMua2V5QmluZGluZy4kaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhhbmRsZXIuc2V0dXBJbmNyZW1lbnRhbFNlYXJjaCkge1xuICAgICAgICAgICAgICAgICAgICBoYW5kbGVyLnNldHVwSW5jcmVtZW50YWxTZWFyY2godGhpcywgdmFsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ2luY3JlbWVudGFsU2VhcmNoU2V0dGluZ0NoYW5nZWQnLCB7aXNFbmFibGVkOiB2YWx9KTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBkb20gPSByZXF1aXJlKFwiLi4vbGliL2RvbVwiKTtcbnJlcXVpcmUoXCIuLi9pbmNyZW1lbnRhbF9zZWFyY2hcIik7XG52YXIgaVNlYXJjaENvbW1hbmRNb2R1bGUgPSByZXF1aXJlKFwiLi4vY29tbWFuZHMvaW5jcmVtZW50YWxfc2VhcmNoX2NvbW1hbmRzXCIpO1xuXG5cbnZhciBIYXNoSGFuZGxlciA9IHJlcXVpcmUoXCIuL2hhc2hfaGFuZGxlclwiKS5IYXNoSGFuZGxlcjtcbmV4cG9ydHMuaGFuZGxlciA9IG5ldyBIYXNoSGFuZGxlcigpO1xuXG5leHBvcnRzLmhhbmRsZXIuaXNFbWFjcyA9IHRydWU7XG5leHBvcnRzLmhhbmRsZXIuJGlkID0gXCJhY2Uva2V5Ym9hcmQvZW1hY3NcIjtcblxuXG5kb20uaW1wb3J0Q3NzU3RyaW5nKGBcbi5lbWFjcy1tb2RlIC5hY2VfY3Vyc29ye1xuICAgIGJvcmRlcjogMXB4IHJnYmEoNTAsMjUwLDUwLDAuOCkgc29saWQhaW1wb3J0YW50O1xuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3ghaW1wb3J0YW50O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwyNTAsMCwwLjkpO1xuICAgIG9wYWNpdHk6IDAuNTtcbn1cbi5lbWFjcy1tb2RlIC5hY2VfaGlkZGVuLWN1cnNvcnMgLmFjZV9jdXJzb3J7XG4gICAgb3BhY2l0eTogMTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbn1cbi5lbWFjcy1tb2RlIC5hY2Vfb3ZlcndyaXRlLWN1cnNvcnMgLmFjZV9jdXJzb3Ige1xuICAgIG9wYWNpdHk6IDE7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgYm9yZGVyLXdpZHRoOiAwIDAgMnB4IDJweCAhaW1wb3J0YW50O1xufVxuLmVtYWNzLW1vZGUgLmFjZV90ZXh0LWxheWVyIHtcbiAgICB6LWluZGV4OiA0XG59XG4uZW1hY3MtbW9kZSAuYWNlX2N1cnNvci1sYXllciB7XG4gICAgei1pbmRleDogMlxufWAsICdlbWFjc01vZGUnXG4pO1xudmFyICRmb3JtZXJMb25nV29yZHM7XG52YXIgJGZvcm1lckxpbmVTdGFydDtcblxuZXhwb3J0cy5oYW5kbGVyLmF0dGFjaCA9IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgIC8vIGluIGVtYWNzLCBnb3Rvd29yZGxlZnQvcmlnaHQgc2hvdWxkIG5vdCBjb3VudCBhIHNwYWNlIGFzIGEgd29yZC4uXG4gICAgJGZvcm1lckxvbmdXb3JkcyA9IGVkaXRvci5zZXNzaW9uLiRzZWxlY3RMb25nV29yZHM7XG4gICAgZWRpdG9yLnNlc3Npb24uJHNlbGVjdExvbmdXb3JkcyA9IHRydWU7XG4gICAgLy8gQ1RSTC1BIHNob3VsZCBnbyB0byBhY3R1YWwgYmVnaW5uaW5nIG9mIGxpbmVcbiAgICAkZm9ybWVyTGluZVN0YXJ0ID0gZWRpdG9yLnNlc3Npb24uJHVzZUVtYWNzU3R5bGVMaW5lU3RhcnQ7XG4gICAgZWRpdG9yLnNlc3Npb24uJHVzZUVtYWNzU3R5bGVMaW5lU3RhcnQgPSB0cnVlO1xuXG4gICAgZWRpdG9yLnNlc3Npb24uJGVtYWNzTWFyayA9IG51bGw7IC8vIHRoZSBhY3RpdmUgbWFya1xuICAgIGVkaXRvci5zZXNzaW9uLiRlbWFjc01hcmtSaW5nID0gZWRpdG9yLnNlc3Npb24uJGVtYWNzTWFya1JpbmcgfHwgW107XG5cbiAgICBlZGl0b3IuZW1hY3NNYXJrID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb24uJGVtYWNzTWFyaztcbiAgICB9O1xuXG4gICAgZWRpdG9yLnNldEVtYWNzTWFyayA9IGZ1bmN0aW9uKHApIHtcbiAgICAgICAgLy8gdG8gZGVhY3RpdmF0ZSBwYXNzIGluIGEgZmFsc3kgdmFsdWVcbiAgICAgICAgdGhpcy5zZXNzaW9uLiRlbWFjc01hcmsgPSBwO1xuICAgIH07XG5cbiAgICBlZGl0b3IucHVzaEVtYWNzTWFyayA9IGZ1bmN0aW9uKHAsIGFjdGl2YXRlKSB7XG4gICAgICAgIHZhciBwcmV2TWFyayA9IHRoaXMuc2Vzc2lvbi4kZW1hY3NNYXJrO1xuICAgICAgICBpZiAocHJldk1hcmspXG4gICAgICAgICAgICB0aGlzLnNlc3Npb24uJGVtYWNzTWFya1JpbmcucHVzaChwcmV2TWFyayk7XG4gICAgICAgIGlmICghcCB8fCBhY3RpdmF0ZSkgdGhpcy5zZXRFbWFjc01hcmsocCk7XG4gICAgICAgIGVsc2UgdGhpcy5zZXNzaW9uLiRlbWFjc01hcmtSaW5nLnB1c2gocCk7XG4gICAgfTtcblxuICAgIGVkaXRvci5wb3BFbWFjc01hcmsgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1hcmsgPSB0aGlzLmVtYWNzTWFyaygpO1xuICAgICAgICBpZiAobWFyaykgeyB0aGlzLnNldEVtYWNzTWFyayhudWxsKTsgcmV0dXJuIG1hcms7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMuc2Vzc2lvbi4kZW1hY3NNYXJrUmluZy5wb3AoKTtcbiAgICB9O1xuXG4gICAgZWRpdG9yLmdldExhc3RFbWFjc01hcmsgPSBmdW5jdGlvbihwKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlc3Npb24uJGVtYWNzTWFyayB8fCB0aGlzLnNlc3Npb24uJGVtYWNzTWFya1Jpbmcuc2xpY2UoLTEpWzBdO1xuICAgIH07XG5cbiAgICBlZGl0b3IuZW1hY3NNYXJrRm9yU2VsZWN0aW9uID0gZnVuY3Rpb24ocmVwbGFjZW1lbnQpIHtcbiAgICAgICAgLy8gZmluZCB0aGUgbWFyayBpbiAkZW1hY3NNYXJrUmluZyBjb3JyZXNwb25kaW5nIHRvIHRoZSBjdXJyZW50XG4gICAgICAgIC8vIHNlbGVjdGlvblxuICAgICAgICB2YXIgc2VsID0gdGhpcy5zZWxlY3Rpb24sXG4gICAgICAgICAgICBtdWx0aVJhbmdlTGVuZ3RoID0gdGhpcy5tdWx0aVNlbGVjdCA/XG4gICAgICAgICAgICAgICAgdGhpcy5tdWx0aVNlbGVjdC5nZXRBbGxSYW5nZXMoKS5sZW5ndGggOiAxLFxuICAgICAgICAgICAgc2VsSW5kZXggPSBzZWwuaW5kZXggfHwgMCxcbiAgICAgICAgICAgIG1hcmtSaW5nID0gdGhpcy5zZXNzaW9uLiRlbWFjc01hcmtSaW5nLFxuICAgICAgICAgICAgbWFya0luZGV4ID0gbWFya1JpbmcubGVuZ3RoIC0gKG11bHRpUmFuZ2VMZW5ndGggLSBzZWxJbmRleCksXG4gICAgICAgICAgICBsYXN0TWFyayA9IG1hcmtSaW5nW21hcmtJbmRleF0gfHwgc2VsLmFuY2hvcjtcbiAgICAgICAgaWYgKHJlcGxhY2VtZW50KSB7XG4gICAgICAgICAgICBtYXJrUmluZy5zcGxpY2UobWFya0luZGV4LCAxLFxuICAgICAgICAgICAgICAgIFwicm93XCIgaW4gcmVwbGFjZW1lbnQgJiYgXCJjb2x1bW5cIiBpbiByZXBsYWNlbWVudCA/XG4gICAgICAgICAgICAgICAgICAgIHJlcGxhY2VtZW50IDogdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGFzdE1hcms7XG4gICAgfTtcblxuICAgIGVkaXRvci5vbihcImNsaWNrXCIsICRyZXNldE1hcmtNb2RlKTtcbiAgICBlZGl0b3Iub24oXCJjaGFuZ2VTZXNzaW9uXCIsICRrYlNlc3Npb25DaGFuZ2UpO1xuICAgIGVkaXRvci5yZW5kZXJlci4kYmxvY2tDdXJzb3IgPSB0cnVlO1xuICAgIGVkaXRvci5zZXRTdHlsZShcImVtYWNzLW1vZGVcIik7XG4gICAgZWRpdG9yLmNvbW1hbmRzLmFkZENvbW1hbmRzKGNvbW1hbmRzKTtcbiAgICBleHBvcnRzLmhhbmRsZXIucGxhdGZvcm0gPSBlZGl0b3IuY29tbWFuZHMucGxhdGZvcm07XG4gICAgZWRpdG9yLiRlbWFjc01vZGVIYW5kbGVyID0gdGhpcztcbiAgICBlZGl0b3Iub24oJ2NvcHknLCB0aGlzLm9uQ29weSk7XG4gICAgZWRpdG9yLm9uKCdwYXN0ZScsIHRoaXMub25QYXN0ZSk7XG59O1xuXG5leHBvcnRzLmhhbmRsZXIuZGV0YWNoID0gZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgZWRpdG9yLnJlbmRlcmVyLiRibG9ja0N1cnNvciA9IGZhbHNlO1xuICAgIGVkaXRvci5zZXNzaW9uLiRzZWxlY3RMb25nV29yZHMgPSAkZm9ybWVyTG9uZ1dvcmRzO1xuICAgIGVkaXRvci5zZXNzaW9uLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0ID0gJGZvcm1lckxpbmVTdGFydDtcbiAgICBlZGl0b3Iub2ZmKFwiY2xpY2tcIiwgJHJlc2V0TWFya01vZGUpO1xuICAgIGVkaXRvci5vZmYoXCJjaGFuZ2VTZXNzaW9uXCIsICRrYlNlc3Npb25DaGFuZ2UpO1xuICAgIGVkaXRvci51bnNldFN0eWxlKFwiZW1hY3MtbW9kZVwiKTtcbiAgICBlZGl0b3IuY29tbWFuZHMucmVtb3ZlQ29tbWFuZHMoY29tbWFuZHMpO1xuICAgIGVkaXRvci5vZmYoJ2NvcHknLCB0aGlzLm9uQ29weSk7XG4gICAgZWRpdG9yLm9mZigncGFzdGUnLCB0aGlzLm9uUGFzdGUpO1xuICAgIGVkaXRvci4kZW1hY3NNb2RlSGFuZGxlciA9IG51bGw7XG59O1xuXG52YXIgJGtiU2Vzc2lvbkNoYW5nZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAoZS5vbGRTZXNzaW9uKSB7XG4gICAgICAgIGUub2xkU2Vzc2lvbi4kc2VsZWN0TG9uZ1dvcmRzID0gJGZvcm1lckxvbmdXb3JkcztcbiAgICAgICAgZS5vbGRTZXNzaW9uLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0ID0gJGZvcm1lckxpbmVTdGFydDtcbiAgICB9XG5cbiAgICAkZm9ybWVyTG9uZ1dvcmRzID0gZS5zZXNzaW9uLiRzZWxlY3RMb25nV29yZHM7XG4gICAgZS5zZXNzaW9uLiRzZWxlY3RMb25nV29yZHMgPSB0cnVlO1xuICAgICRmb3JtZXJMaW5lU3RhcnQgPSBlLnNlc3Npb24uJHVzZUVtYWNzU3R5bGVMaW5lU3RhcnQ7XG4gICAgZS5zZXNzaW9uLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0ID0gdHJ1ZTtcblxuICAgIGlmICghZS5zZXNzaW9uLmhhc093blByb3BlcnR5KCckZW1hY3NNYXJrJykpXG4gICAgICAgIGUuc2Vzc2lvbi4kZW1hY3NNYXJrID0gbnVsbDtcbiAgICBpZiAoIWUuc2Vzc2lvbi5oYXNPd25Qcm9wZXJ0eSgnJGVtYWNzTWFya1JpbmcnKSlcbiAgICAgICAgZS5zZXNzaW9uLiRlbWFjc01hcmtSaW5nID0gW107XG59O1xuXG52YXIgJHJlc2V0TWFya01vZGUgPSBmdW5jdGlvbihlKSB7XG4gICAgZS5lZGl0b3Iuc2Vzc2lvbi4kZW1hY3NNYXJrID0gbnVsbDtcbn07XG5cbnZhciBrZXlzID0gcmVxdWlyZShcIi4uL2xpYi9rZXlzXCIpLktFWV9NT0RTO1xudmFyIGVNb2RzID0ge0M6IFwiY3RybFwiLCBTOiBcInNoaWZ0XCIsIE06IFwiYWx0XCIsIENNRDogXCJjb21tYW5kXCJ9O1xudmFyIGNvbWJpbmF0aW9ucyA9IFtcIkMtUy1NLUNNRFwiLFxuICAgICAgICAgICAgICAgICAgICBcIlMtTS1DTURcIiwgXCJDLU0tQ01EXCIsIFwiQy1TLUNNRFwiLCBcIkMtUy1NXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiTS1DTURcIiwgXCJTLUNNRFwiLCBcIlMtTVwiLCBcIkMtQ01EXCIsIFwiQy1NXCIsIFwiQy1TXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiQ01EXCIsIFwiTVwiLCBcIlNcIiwgXCJDXCJdO1xuY29tYmluYXRpb25zLmZvckVhY2goZnVuY3Rpb24oYykge1xuICAgIHZhciBoYXNoSWQgPSAwO1xuICAgIGMuc3BsaXQoXCItXCIpLmZvckVhY2goZnVuY3Rpb24oYykge1xuICAgICAgICBoYXNoSWQgPSBoYXNoSWQgfCBrZXlzW2VNb2RzW2NdXTtcbiAgICB9KTtcbiAgICBlTW9kc1toYXNoSWRdID0gYy50b0xvd2VyQ2FzZSgpICsgXCItXCI7XG59KTtcblxuZXhwb3J0cy5oYW5kbGVyLm9uQ29weSA9IGZ1bmN0aW9uKGUsIGVkaXRvcikge1xuICAgIGlmIChlZGl0b3IuJGhhbmRsZXNFbWFjc09uQ29weSkgcmV0dXJuO1xuICAgIGVkaXRvci4kaGFuZGxlc0VtYWNzT25Db3B5ID0gdHJ1ZTtcbiAgICBleHBvcnRzLmhhbmRsZXIuY29tbWFuZHMua2lsbFJpbmdTYXZlLmV4ZWMoZWRpdG9yKTtcbiAgICBlZGl0b3IuJGhhbmRsZXNFbWFjc09uQ29weSA9IGZhbHNlO1xufTtcblxuZXhwb3J0cy5oYW5kbGVyLm9uUGFzdGUgPSBmdW5jdGlvbihlLCBlZGl0b3IpIHtcbiAgICBlZGl0b3IucHVzaEVtYWNzTWFyayhlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKSk7XG59O1xuXG5leHBvcnRzLmhhbmRsZXIuYmluZEtleSA9IGZ1bmN0aW9uKGtleSwgY29tbWFuZCkge1xuICAgIGlmICh0eXBlb2Yga2V5ID09IFwib2JqZWN0XCIpXG4gICAgICAgIGtleSA9IGtleVt0aGlzLnBsYXRmb3JtXTtcbiAgICBpZiAoIWtleSlcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIGNrYiA9IHRoaXMuY29tbWFuZEtleUJpbmRpbmc7XG4gICAga2V5LnNwbGl0KFwifFwiKS5mb3JFYWNoKGZ1bmN0aW9uKGtleVBhcnQpIHtcbiAgICAgICAga2V5UGFydCA9IGtleVBhcnQudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgY2tiW2tleVBhcnRdID0gY29tbWFuZDtcbiAgICAgICAgLy8gcmVnaXN0ZXIgYWxsIHBhcnRpYWwga2V5IGNvbWJvcyBhcyBudWxsIGNvbW1hbmRzXG4gICAgICAgIC8vIHRvIGJlIGFibGUgdG8gYWN0aXZhdGUga2V5IGNvbWJvcyB3aXRoIGFyYml0cmFyeSBsZW5ndGhcbiAgICAgICAgLy8gRXhhbXBsZTogaWYga2V5UGFydCBpcyBcIkMtYyBDLWwgdFwiIHRoZW4gXCJDLWMgQy1sIHRcIiB3aWxsXG4gICAgICAgIC8vIGdldCBjb21tYW5kIGFzc2lnbmVkIGFuZCBcIkMtY1wiIGFuZCBcIkMtYyBDLWxcIiB3aWxsIGdldFxuICAgICAgICAvLyBhIG51bGwgY29tbWFuZCBhc3NpZ25lZCBpbiB0aGlzLmNvbW1hbmRLZXlCaW5kaW5nLiBGb3JcbiAgICAgICAgLy8gdGhlIGxvb2t1cCBsb2dpYyBzZWUgaGFuZGxlS2V5Ym9hcmQoKVxuICAgICAgICB2YXIga2V5UGFydHMgPSBrZXlQYXJ0LnNwbGl0KFwiIFwiKS5zbGljZSgwLC0xKTtcbiAgICAgICAga2V5UGFydHMucmVkdWNlKGZ1bmN0aW9uKGtleU1hcEtleXMsIGtleVBhcnQsIGkpIHtcbiAgICAgICAgICAgIHZhciBwcmVmaXggPSBrZXlNYXBLZXlzW2ktMV0gPyBrZXlNYXBLZXlzW2ktMV0gKyAnICcgOiAnJztcbiAgICAgICAgICAgIHJldHVybiBrZXlNYXBLZXlzLmNvbmNhdChbcHJlZml4ICsga2V5UGFydF0pO1xuICAgICAgICB9LCBbXSkuZm9yRWFjaChmdW5jdGlvbihrZXlQYXJ0KSB7XG4gICAgICAgICAgICBpZiAoIWNrYltrZXlQYXJ0XSkgY2tiW2tleVBhcnRdID0gXCJudWxsXCI7XG4gICAgICAgIH0pO1xuICAgIH0sIHRoaXMpO1xufTtcblxuZXhwb3J0cy5oYW5kbGVyLmdldFN0YXR1c1RleHQgPSBmdW5jdGlvbihlZGl0b3IsIGRhdGEpIHtcbiAgdmFyIHN0ciA9IFwiXCI7XG4gIGlmIChkYXRhLmNvdW50KVxuICAgIHN0ciArPSBkYXRhLmNvdW50O1xuICBpZiAoZGF0YS5rZXlDaGFpbilcbiAgICBzdHIgKz0gXCIgXCIgKyBkYXRhLmtleUNoYWluO1xuICByZXR1cm4gc3RyO1xufTtcblxuZXhwb3J0cy5oYW5kbGVyLmhhbmRsZUtleWJvYXJkID0gZnVuY3Rpb24oZGF0YSwgaGFzaElkLCBrZXksIGtleUNvZGUpIHtcbiAgICAvLyBpZiBrZXlDb2RlID09IC0xIGEgbm9uLXByaW50YWJsZSBrZXkgd2FzIHByZXNzZWQsIHN1Y2ggYXMganVzdFxuICAgIC8vIGNvbnRyb2wuIEhhbmRsaW5nIHRob3NlIGlzIGN1cnJlbnRseSBub3Qgc3VwcG9ydGVkIGluIHRoaXMgaGFuZGxlclxuICAgIGlmIChrZXlDb2RlID09PSAtMSkgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAgIHZhciBlZGl0b3IgPSBkYXRhLmVkaXRvcjtcbiAgICBlZGl0b3IuX3NpZ25hbChcImNoYW5nZVN0YXR1c1wiKTtcbiAgICAvLyBpbnNlcnRzdHJpbmcgZGF0YS5jb3VudCB0aW1lc1xuICAgIGlmIChoYXNoSWQgPT0gLTEpIHtcbiAgICAgICAgZWRpdG9yLnB1c2hFbWFjc01hcmsoKTtcbiAgICAgICAgaWYgKGRhdGEuY291bnQpIHtcbiAgICAgICAgICAgIHZhciBzdHIgPSBuZXcgQXJyYXkoZGF0YS5jb3VudCArIDEpLmpvaW4oa2V5KTtcbiAgICAgICAgICAgIGRhdGEuY291bnQgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIHtjb21tYW5kOiBcImluc2VydHN0cmluZ1wiLCBhcmdzOiBzdHJ9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIG1vZGlmaWVyID0gZU1vZHNbaGFzaElkXTtcblxuICAgIC8vIENUUkwgKyBudW1iZXIgLyB1bml2ZXJzYWxBcmd1bWVudCBmb3Igc2V0dGluZyBkYXRhLmNvdW50XG4gICAgaWYgKG1vZGlmaWVyID09IFwiYy1cIiB8fCBkYXRhLmNvdW50KSB7XG4gICAgICAgIHZhciBjb3VudCA9IHBhcnNlSW50KGtleVtrZXkubGVuZ3RoIC0gMV0pO1xuICAgICAgICBpZiAodHlwZW9mIGNvdW50ID09PSAnbnVtYmVyJyAmJiAhaXNOYU4oY291bnQpKSB7XG4gICAgICAgICAgICBkYXRhLmNvdW50ID0gTWF0aC5tYXgoZGF0YS5jb3VudCwgMCkgfHwgMDtcbiAgICAgICAgICAgIGRhdGEuY291bnQgPSAxMCAqIGRhdGEuY291bnQgKyBjb3VudDtcbiAgICAgICAgICAgIHJldHVybiB7Y29tbWFuZDogXCJudWxsXCJ9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdGhpcy5jb21tYW5kS2V5QmluZGluZyBtYXBzIGtleSBzcGVjcyBsaWtlIFwiYy1wXCIgKGZvciBDVFJMICsgUCkgdG9cbiAgICAvLyBjb21tYW5kIG9iamVjdHMsIGZvciBsb29rdXAga2V5IG5lZWRzIHRvIGluY2x1ZGUgdGhlIG1vZGlmaWVyXG4gICAgaWYgKG1vZGlmaWVyKSBrZXkgPSBtb2RpZmllciArIGtleTtcblxuICAgIC8vIEtleSBjb21ib3MgbGlrZSBDVFJMK1ggSCBidWlsZCB1cCB0aGUgZGF0YS5rZXlDaGFpblxuICAgIGlmIChkYXRhLmtleUNoYWluKSBrZXkgPSBkYXRhLmtleUNoYWluICs9IFwiIFwiICsga2V5O1xuXG4gICAgLy8gS2V5IGNvbWJvIHByZWZpeGVzIGdldCBzdG9yZWQgYXMgXCJudWxsXCIgKFN0cmluZyEpIGluIHRoaXNcbiAgICAvLyB0aGlzLmNvbW1hbmRLZXlCaW5kaW5nLiBXaGVuIGVuY291bnRlcmVkIG5vIGNvbW1hbmQgaXMgaW52b2tlZCBidXQgd2VcbiAgICAvLyBidWxkIHVwIGRhdGEua2V5Q2hhaW5cbiAgICB2YXIgY29tbWFuZCA9IHRoaXMuY29tbWFuZEtleUJpbmRpbmdba2V5XTtcbiAgICBkYXRhLmtleUNoYWluID0gY29tbWFuZCA9PSBcIm51bGxcIiA/IGtleSA6IFwiXCI7XG5cbiAgICAvLyB0aGVyZSByZWFsbHkgaXMgbm8gY29tbWFuZFxuICAgIGlmICghY29tbWFuZCkgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAgIC8vIHdlIHBhc3MgYi9jIG9mIGtleSBjb21ibyBvciB1bml2ZXJzYWxBcmd1bWVudFxuICAgIGlmIChjb21tYW5kID09PSBcIm51bGxcIikgcmV0dXJuIHtjb21tYW5kOiBcIm51bGxcIn07XG5cbiAgICBpZiAoY29tbWFuZCA9PT0gXCJ1bml2ZXJzYWxBcmd1bWVudFwiKSB7XG4gICAgICAgIC8vIGlmIG5vIG51bWJlciBwcmVzc2VkIGVtYWNzIHJlcGVhdHMgYWN0aW9uIDQgdGltZXMuXG4gICAgICAgIC8vIG1pbnVzIHNpZ24gaXMgbmVlZGVkIHRvIGFsbG93IG5leHQga2V5cHJlc3MgdG8gcmVwbGFjZSBpdFxuICAgICAgICBkYXRhLmNvdW50ID0gLTQ7XG4gICAgICAgIHJldHVybiB7Y29tbWFuZDogXCJudWxsXCJ9O1xuICAgIH1cblxuICAgIC8vIGxvb2t1cCBjb21tYW5kXG4gICAgLy8gVE9ETyBleHRyYWN0IHNwZWNpYWwgaGFuZGxpbmcgb2YgbWFya21vZGVcbiAgICAvLyBUT0RPIHNwZWNpYWwgY2FzZSBjb21tYW5kLmNvbW1hbmQgaXMgcmVhbGx5IHVubmVjZXNzYXJ5LCByZW1vdmVcbiAgICB2YXIgYXJncztcbiAgICBpZiAodHlwZW9mIGNvbW1hbmQgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgYXJncyA9IGNvbW1hbmQuYXJncztcbiAgICAgICAgaWYgKGNvbW1hbmQuY29tbWFuZCkgY29tbWFuZCA9IGNvbW1hbmQuY29tbWFuZDtcbiAgICAgICAgaWYgKGNvbW1hbmQgPT09IFwiZ29vcnNlbGVjdFwiKSB7XG4gICAgICAgICAgICBjb21tYW5kID0gZWRpdG9yLmVtYWNzTWFyaygpID8gYXJnc1sxXSA6IGFyZ3NbMF07XG4gICAgICAgICAgICBhcmdzID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgY29tbWFuZCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBpZiAoY29tbWFuZCA9PT0gXCJpbnNlcnRzdHJpbmdcIiB8fFxuICAgICAgICAgICAgY29tbWFuZCA9PT0gXCJzcGxpdGxpbmVcIiB8fFxuICAgICAgICAgICAgY29tbWFuZCA9PT0gXCJ0b2dnbGVjb21tZW50XCIpIHtcbiAgICAgICAgICAgIGVkaXRvci5wdXNoRW1hY3NNYXJrKCk7XG4gICAgICAgIH1cbiAgICAgICAgY29tbWFuZCA9IHRoaXMuY29tbWFuZHNbY29tbWFuZF0gfHwgZWRpdG9yLmNvbW1hbmRzLmNvbW1hbmRzW2NvbW1hbmRdO1xuICAgICAgICBpZiAoIWNvbW1hbmQpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKCFjb21tYW5kLnJlYWRPbmx5ICYmICFjb21tYW5kLmlzWWFuaylcbiAgICAgICAgZGF0YS5sYXN0Q29tbWFuZCA9IG51bGw7XG5cbiAgICBpZiAoIWNvbW1hbmQucmVhZE9ubHkgJiYgZWRpdG9yLmVtYWNzTWFyaygpKVxuICAgICAgICBlZGl0b3Iuc2V0RW1hY3NNYXJrKG51bGwpO1xuICAgICAgICBcbiAgICBpZiAoZGF0YS5jb3VudCkge1xuICAgICAgICB2YXIgY291bnQgPSBkYXRhLmNvdW50O1xuICAgICAgICBkYXRhLmNvdW50ID0gMDtcbiAgICAgICAgaWYgKCFjb21tYW5kIHx8ICFjb21tYW5kLmhhbmRsZXNDb3VudCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBhcmdzOiBhcmdzLFxuICAgICAgICAgICAgICAgIGNvbW1hbmQ6IHtcbiAgICAgICAgICAgICAgICAgICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yLCBhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvdW50OyBpKyspXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZC5leGVjKGVkaXRvciwgYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG11bHRpU2VsZWN0QWN0aW9uOiBjb21tYW5kLm11bHRpU2VsZWN0QWN0aW9uXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghYXJncykgYXJncyA9IHt9O1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBhcmdzID09PSAnb2JqZWN0JykgYXJncy5jb3VudCA9IGNvdW50O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtjb21tYW5kOiBjb21tYW5kLCBhcmdzOiBhcmdzfTtcbn07XG5cbmV4cG9ydHMuZW1hY3NLZXlzID0ge1xuICAgIC8vIG1vdmVtZW50XG4gICAgXCJVcHxDLXBcIiAgICAgIDoge2NvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb2xpbmV1cFwiLFwic2VsZWN0dXBcIl19LFxuICAgIFwiRG93bnxDLW5cIiAgICA6IHtjb21tYW5kOiBcImdvb3JzZWxlY3RcIiwgYXJnczogW1wiZ29saW5lZG93blwiLFwic2VsZWN0ZG93blwiXX0sXG4gICAgXCJMZWZ0fEMtYlwiICAgIDoge2NvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3RvbGVmdFwiLFwic2VsZWN0bGVmdFwiXX0sXG4gICAgXCJSaWdodHxDLWZcIiAgIDoge2NvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3RvcmlnaHRcIixcInNlbGVjdHJpZ2h0XCJdfSxcbiAgICBcIkMtTGVmdHxNLWJcIiAgOiB7Y29tbWFuZDogXCJnb29yc2VsZWN0XCIsIGFyZ3M6IFtcImdvdG93b3JkbGVmdFwiLFwic2VsZWN0d29yZGxlZnRcIl19LFxuICAgIFwiQy1SaWdodHxNLWZcIiA6IHtjb21tYW5kOiBcImdvb3JzZWxlY3RcIiwgYXJnczogW1wiZ290b3dvcmRyaWdodFwiLFwic2VsZWN0d29yZHJpZ2h0XCJdfSxcbiAgICBcIkhvbWV8Qy1hXCIgICAgOiB7Y29tbWFuZDogXCJnb29yc2VsZWN0XCIsIGFyZ3M6IFtcImdvdG9saW5lc3RhcnRcIixcInNlbGVjdHRvbGluZXN0YXJ0XCJdfSxcbiAgICBcIkVuZHxDLWVcIiAgICAgOiB7Y29tbWFuZDogXCJnb29yc2VsZWN0XCIsIGFyZ3M6IFtcImdvdG9saW5lZW5kXCIsXCJzZWxlY3R0b2xpbmVlbmRcIl19LFxuICAgIFwiQy1Ib21lfFMtTS0sXCI6IHtjb21tYW5kOiBcImdvb3JzZWxlY3RcIiwgYXJnczogW1wiZ290b3N0YXJ0XCIsXCJzZWxlY3R0b3N0YXJ0XCJdfSxcbiAgICBcIkMtRW5kfFMtTS0uXCIgOiB7Y29tbWFuZDogXCJnb29yc2VsZWN0XCIsIGFyZ3M6IFtcImdvdG9lbmRcIixcInNlbGVjdHRvZW5kXCJdfSxcblxuICAgIC8vIHNlbGVjdGlvblxuICAgIFwiUy1VcHxTLUMtcFwiICAgICAgOiBcInNlbGVjdHVwXCIsXG4gICAgXCJTLURvd258Uy1DLW5cIiAgICA6IFwic2VsZWN0ZG93blwiLFxuICAgIFwiUy1MZWZ0fFMtQy1iXCIgICAgOiBcInNlbGVjdGxlZnRcIixcbiAgICBcIlMtUmlnaHR8Uy1DLWZcIiAgIDogXCJzZWxlY3RyaWdodFwiLFxuICAgIFwiUy1DLUxlZnR8Uy1NLWJcIiAgOiBcInNlbGVjdHdvcmRsZWZ0XCIsXG4gICAgXCJTLUMtUmlnaHR8Uy1NLWZcIiA6IFwic2VsZWN0d29yZHJpZ2h0XCIsXG4gICAgXCJTLUhvbWV8Uy1DLWFcIiAgICA6IFwic2VsZWN0dG9saW5lc3RhcnRcIixcbiAgICBcIlMtRW5kfFMtQy1lXCIgICAgIDogXCJzZWxlY3R0b2xpbmVlbmRcIixcbiAgICBcIlMtQy1Ib21lXCIgICAgICAgIDogXCJzZWxlY3R0b3N0YXJ0XCIsXG4gICAgXCJTLUMtRW5kXCIgICAgICAgICA6IFwic2VsZWN0dG9lbmRcIixcblxuICAgIFwiQy1sXCIgOiBcInJlY2VudGVyVG9wQm90dG9tXCIsXG4gICAgXCJNLXNcIiA6IFwiY2VudGVyc2VsZWN0aW9uXCIsXG4gICAgXCJNLWdcIjogXCJnb3RvbGluZVwiLFxuICAgIFwiQy14IEMtcFwiOiBcInNlbGVjdGFsbFwiLFxuXG4gICAgLy8gdG9kbyBmaXggdGhlc2VcbiAgICBcIkMtRG93blwiOiB7Y29tbWFuZDogXCJnb29yc2VsZWN0XCIsIGFyZ3M6IFtcImdvdG9wYWdlZG93blwiLFwic2VsZWN0cGFnZWRvd25cIl19LFxuICAgIFwiQy1VcFwiOiB7Y29tbWFuZDogXCJnb29yc2VsZWN0XCIsIGFyZ3M6IFtcImdvdG9wYWdldXBcIixcInNlbGVjdHBhZ2V1cFwiXX0sXG4gICAgXCJQYWdlRG93bnxDLXZcIjoge2NvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3RvcGFnZWRvd25cIixcInNlbGVjdHBhZ2Vkb3duXCJdfSxcbiAgICBcIlBhZ2VVcHxNLXZcIjoge2NvbW1hbmQ6IFwiZ29vcnNlbGVjdFwiLCBhcmdzOiBbXCJnb3RvcGFnZXVwXCIsXCJzZWxlY3RwYWdldXBcIl19LFxuICAgIFwiUy1DLURvd25cIjogXCJzZWxlY3RwYWdlZG93blwiLFxuICAgIFwiUy1DLVVwXCI6IFwic2VsZWN0cGFnZXVwXCIsXG5cbiAgICBcIkMtc1wiOiBcImlTZWFyY2hcIixcbiAgICBcIkMtclwiOiBcImlTZWFyY2hCYWNrd2FyZHNcIixcblxuICAgIFwiTS1DLXNcIjogXCJmaW5kbmV4dFwiLFxuICAgIFwiTS1DLXJcIjogXCJmaW5kcHJldmlvdXNcIixcbiAgICBcIlMtTS01XCI6IFwicmVwbGFjZVwiLFxuXG4gICAgLy8gYmFzaWMgZWRpdGluZ1xuICAgIFwiQmFja3NwYWNlXCI6IFwiYmFja3NwYWNlXCIsXG4gICAgXCJEZWxldGV8Qy1kXCI6IFwiZGVsXCIsXG4gICAgXCJSZXR1cm58Qy1tXCI6IHtjb21tYW5kOiBcImluc2VydHN0cmluZ1wiLCBhcmdzOiBcIlxcblwifSwgLy8gXCJuZXdsaW5lXCJcbiAgICBcIkMtb1wiOiBcInNwbGl0bGluZVwiLFxuXG4gICAgXCJNLWR8Qy1EZWxldGVcIjoge2NvbW1hbmQ6IFwia2lsbFdvcmRcIiwgYXJnczogXCJyaWdodFwifSxcbiAgICBcIkMtQmFja3NwYWNlfE0tQmFja3NwYWNlfE0tRGVsZXRlXCI6IHtjb21tYW5kOiBcImtpbGxXb3JkXCIsIGFyZ3M6IFwibGVmdFwifSxcbiAgICBcIkMta1wiOiBcImtpbGxMaW5lXCIsXG5cbiAgICBcIkMteXxTLURlbGV0ZVwiOiBcInlhbmtcIixcbiAgICBcIk0teVwiOiBcInlhbmtSb3RhdGVcIixcbiAgICBcIkMtZ1wiOiBcImtleWJvYXJkUXVpdFwiLFxuXG4gICAgXCJDLXd8Qy1TLVdcIjogXCJraWxsUmVnaW9uXCIsXG4gICAgXCJNLXdcIjogXCJraWxsUmluZ1NhdmVcIixcbiAgICBcIkMtU3BhY2VcIjogXCJzZXRNYXJrXCIsXG4gICAgXCJDLXggQy14XCI6IFwiZXhjaGFuZ2VQb2ludEFuZE1hcmtcIixcblxuICAgIFwiQy10XCI6IFwidHJhbnNwb3NlbGV0dGVyc1wiLFxuICAgIFwiTS11XCI6IFwidG91cHBlcmNhc2VcIiwgICAgLy8gRG9lc24ndCB3b3JrXG4gICAgXCJNLWxcIjogXCJ0b2xvd2VyY2FzZVwiLFxuICAgIFwiTS0vXCI6IFwiYXV0b2NvbXBsZXRlXCIsICAgLy8gRG9lc24ndCB3b3JrXG4gICAgXCJDLXVcIjogXCJ1bml2ZXJzYWxBcmd1bWVudFwiLFxuXG4gICAgXCJNLTtcIjogXCJ0b2dnbGVjb21tZW50XCIsXG5cbiAgICBcIkMtL3xDLXggdXxTLUMtLXxDLXpcIjogXCJ1bmRvXCIsXG4gICAgXCJTLUMtL3xTLUMteCB1fEMtLXxTLUMtelwiOiBcInJlZG9cIiwgLy8gaW5maW5pdGUgdW5kbz9cbiAgICAvLyB2ZXJ0aWNhbCBlZGl0aW5nXG4gICAgXCJDLXggclwiOiAgXCJzZWxlY3RSZWN0YW5ndWxhclJlZ2lvblwiLFxuICAgIFwiTS14XCI6IHtjb21tYW5kOiBcImZvY3VzQ29tbWFuZExpbmVcIiwgYXJnczogXCJNLXggXCJ9XG4gICAgLy8gdG9kb1xuICAgIC8vIFwiQy14IEMtdFwiIFwiTS10XCIgXCJNLWNcIiBcIkYxMVwiIFwiQy1NLSBcIk0tcVwiXG59O1xuXG5cbmV4cG9ydHMuaGFuZGxlci5iaW5kS2V5cyhleHBvcnRzLmVtYWNzS2V5cyk7XG5cbmV4cG9ydHMuaGFuZGxlci5hZGRDb21tYW5kcyh7XG4gICAgcmVjZW50ZXJUb3BCb3R0b206IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICB2YXIgcmVuZGVyZXIgPSBlZGl0b3IucmVuZGVyZXI7XG4gICAgICAgIHZhciBwb3MgPSByZW5kZXJlci4kY3Vyc29yTGF5ZXIuZ2V0UGl4ZWxQb3NpdGlvbigpO1xuICAgICAgICB2YXIgaCA9IHJlbmRlcmVyLiRzaXplLnNjcm9sbGVySGVpZ2h0IC0gcmVuZGVyZXIubGluZUhlaWdodDtcbiAgICAgICAgdmFyIHNjcm9sbFRvcCA9IHJlbmRlcmVyLnNjcm9sbFRvcDtcbiAgICAgICAgaWYgKE1hdGguYWJzKHBvcy50b3AgLSBzY3JvbGxUb3ApIDwgMikge1xuICAgICAgICAgICAgc2Nyb2xsVG9wID0gcG9zLnRvcCAtIGg7XG4gICAgICAgIH0gZWxzZSBpZiAoTWF0aC5hYnMocG9zLnRvcCAtIHNjcm9sbFRvcCAtIGggKiAwLjUpIDwgMikge1xuICAgICAgICAgICAgc2Nyb2xsVG9wID0gcG9zLnRvcDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNjcm9sbFRvcCA9IHBvcy50b3AgLSBoICogMC41O1xuICAgICAgICB9XG4gICAgICAgIGVkaXRvci5zZXNzaW9uLnNldFNjcm9sbFRvcChzY3JvbGxUb3ApO1xuICAgIH0sXG4gICAgc2VsZWN0UmVjdGFuZ3VsYXJSZWdpb246ICBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLm11bHRpU2VsZWN0LnRvZ2dsZUJsb2NrU2VsZWN0aW9uKCk7XG4gICAgfSxcbiAgICBzZXRNYXJrOiAge1xuICAgICAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IsIGFyZ3MpIHtcbiAgICAgICAgICAgIC8vIFNldHMgbWFyay1tb2RlIGFuZCBjbGVhcnMgY3VycmVudCBzZWxlY3Rpb24uXG4gICAgICAgICAgICAvLyBXaGVuIG1hcmsgaXMgc2V0LCBrZXlib2FyZCBjdXJzb3IgbW92ZW1lbnQgY29tbWFuZHMgYmVjb21lXG4gICAgICAgICAgICAvLyBzZWxlY3Rpb24gbW9kaWZpY2F0aW9uIGNvbW1hbmRzLiBUaGF0IGlzLFxuICAgICAgICAgICAgLy8gXCJnb3RvXCIgY29tbWFuZHMgYmVjb21lIFwic2VsZWN0XCIgY29tbWFuZHMuXG4gICAgICAgICAgICAvLyBBbnkgaW5zZXJ0aW9uIG9yIG1vdXNlIGNsaWNrIHJlc2V0cyBtYXJrLW1vZGUuXG4gICAgICAgICAgICAvLyBzZXRNYXJrIHR3aWNlIGluIGEgcm93IGF0IHRoZSBzYW1lIHBsYWNlIHJlc2V0cyBtYXJrbW9kZS5cbiAgICAgICAgICAgIC8vIGluIG11bHRpIHNlbGVjdCBtb2RlLCBlYSBzZWxlY3Rpb24gaXMgaGFuZGxlZCBpbmRpdmlkdWFsbHlcblxuICAgICAgICAgICAgaWYgKGFyZ3MgJiYgYXJncy5jb3VudCkge1xuICAgICAgICAgICAgICAgIGlmIChlZGl0b3IuaW5NdWx0aVNlbGVjdE1vZGUpIGVkaXRvci5mb3JFYWNoU2VsZWN0aW9uKG1vdmVUb01hcmspO1xuICAgICAgICAgICAgICAgIGVsc2UgbW92ZVRvTWFyaygpO1xuICAgICAgICAgICAgICAgIG1vdmVUb01hcmsoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBtYXJrID0gZWRpdG9yLmVtYWNzTWFyaygpLFxuICAgICAgICAgICAgICAgIHJhbmdlcyA9IGVkaXRvci5zZWxlY3Rpb24uZ2V0QWxsUmFuZ2VzKCksXG4gICAgICAgICAgICAgICAgcmFuZ2VQb3NpdGlvbnMgPSByYW5nZXMubWFwKGZ1bmN0aW9uKHIpIHsgcmV0dXJuIHtyb3c6IHIuc3RhcnQucm93LCBjb2x1bW46IHIuc3RhcnQuY29sdW1ufTsgfSksXG4gICAgICAgICAgICAgICAgdHJhbnNpZW50TWFya01vZGVBY3RpdmUgPSB0cnVlLFxuICAgICAgICAgICAgICAgIGhhc05vU2VsZWN0aW9uID0gcmFuZ2VzLmV2ZXJ5KGZ1bmN0aW9uKHJhbmdlKSB7IHJldHVybiByYW5nZS5pc0VtcHR5KCk7IH0pO1xuICAgICAgICAgICAgLy8gaWYgdHJhbnNpZW50TWFya01vZGVBY3RpdmUgdGhlbiBtYXJrIGJlaGF2aW9yIGlzIGEgbGl0dGxlXG4gICAgICAgICAgICAvLyBkaWZmZXJlbnQuIERlYWN0aXZhdGUgdGhlIG1hcmsgd2hlbiBzZXRNYXJrIGlzIHJ1biB3aXRoIGFjdGl2ZVxuICAgICAgICAgICAgLy8gbWFya1xuICAgICAgICAgICAgaWYgKHRyYW5zaWVudE1hcmtNb2RlQWN0aXZlICYmIChtYXJrIHx8ICFoYXNOb1NlbGVjdGlvbikpIHtcbiAgICAgICAgICAgICAgICBpZiAoZWRpdG9yLmluTXVsdGlTZWxlY3RNb2RlKSBlZGl0b3IuZm9yRWFjaFNlbGVjdGlvbih7ZXhlYzogZWRpdG9yLmNsZWFyU2VsZWN0aW9uLmJpbmQoZWRpdG9yKX0pO1xuICAgICAgICAgICAgICAgIGVsc2UgZWRpdG9yLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKG1hcmspIGVkaXRvci5wdXNoRW1hY3NNYXJrKG51bGwpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFtYXJrKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2VQb3NpdGlvbnMuZm9yRWFjaChmdW5jdGlvbihwb3MpIHsgZWRpdG9yLnB1c2hFbWFjc01hcmsocG9zKTsgfSk7XG4gICAgICAgICAgICAgICAgZWRpdG9yLnNldEVtYWNzTWFyayhyYW5nZVBvc2l0aW9uc1tyYW5nZVBvc2l0aW9ucy5sZW5ndGgtMV0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gLT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LT0tPS09LVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBtb3ZlVG9NYXJrKCkge1xuICAgICAgICAgICAgICAgIHZhciBtYXJrID0gZWRpdG9yLnBvcEVtYWNzTWFyaygpO1xuICAgICAgICAgICAgICAgIG1hcmsgJiYgZWRpdG9yLm1vdmVDdXJzb3JUb1Bvc2l0aW9uKG1hcmspO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0sXG4gICAgICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgICAgICBoYW5kbGVzQ291bnQ6IHRydWVcbiAgICB9LFxuICAgIGV4Y2hhbmdlUG9pbnRBbmRNYXJrOiB7XG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uIGV4Y2hhbmdlUG9pbnRBbmRNYXJrJGV4ZWMoZWRpdG9yLCBhcmdzKSB7XG4gICAgICAgICAgICB2YXIgc2VsID0gZWRpdG9yLnNlbGVjdGlvbjtcbiAgICAgICAgICAgIGlmICghYXJncy5jb3VudCAmJiAhc2VsLmlzRW1wdHkoKSkgeyAvLyBqdXN0IGludmVydCBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgICBzZWwuc2V0U2VsZWN0aW9uUmFuZ2Uoc2VsLmdldFJhbmdlKCksICFzZWwuaXNCYWNrd2FyZHMoKSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYXJncy5jb3VudCkgeyAvLyByZXBsYWNlIG1hcmsgYW5kIHBvaW50XG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IHtyb3c6IHNlbC5sZWFkLnJvdywgY29sdW1uOiBzZWwubGVhZC5jb2x1bW59O1xuICAgICAgICAgICAgICAgIHNlbC5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgIHNlbC5tb3ZlQ3Vyc29yVG9Qb3NpdGlvbihlZGl0b3IuZW1hY3NNYXJrRm9yU2VsZWN0aW9uKHBvcykpO1xuICAgICAgICAgICAgfSBlbHNlIHsgLy8gY3JlYXRlIHNlbGVjdGlvbiB0byBsYXN0IG1hcmtcbiAgICAgICAgICAgICAgICBzZWwuc2VsZWN0VG9Qb3NpdGlvbihlZGl0b3IuZW1hY3NNYXJrRm9yU2VsZWN0aW9uKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZWFkT25seTogdHJ1ZSxcbiAgICAgICAgaGFuZGxlc0NvdW50OiB0cnVlLFxuICAgICAgICBtdWx0aVNlbGVjdEFjdGlvbjogXCJmb3JFYWNoXCJcbiAgICB9LFxuICAgIGtpbGxXb3JkOiB7XG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvciwgZGlyKSB7XG4gICAgICAgICAgICBlZGl0b3IuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIGlmIChkaXIgPT0gXCJsZWZ0XCIpXG4gICAgICAgICAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5zZWxlY3RXb3JkTGVmdCgpO1xuICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uc2VsZWN0V29yZFJpZ2h0KCk7XG5cbiAgICAgICAgICAgIHZhciByYW5nZSA9IGVkaXRvci5nZXRTZWxlY3Rpb25SYW5nZSgpO1xuICAgICAgICAgICAgdmFyIHRleHQgPSBlZGl0b3Iuc2Vzc2lvbi5nZXRUZXh0UmFuZ2UocmFuZ2UpO1xuICAgICAgICAgICAgZXhwb3J0cy5raWxsUmluZy5hZGQodGV4dCk7XG5cbiAgICAgICAgICAgIGVkaXRvci5zZXNzaW9uLnJlbW92ZShyYW5nZSk7XG4gICAgICAgICAgICBlZGl0b3IuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgfSxcbiAgICAgICAgbXVsdGlTZWxlY3RBY3Rpb246IFwiZm9yRWFjaFwiXG4gICAgfSxcbiAgICBraWxsTGluZTogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5wdXNoRW1hY3NNYXJrKG51bGwpO1xuICAgICAgICAvLyBkb24ndCBkZWxldGUgdGhlIHNlbGVjdGlvbiBpZiBpdCdzIGJlZm9yZSB0aGUgY3Vyc29yXG4gICAgICAgIGVkaXRvci5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB2YXIgcmFuZ2UgPSBlZGl0b3IuZ2V0U2VsZWN0aW9uUmFuZ2UoKTtcbiAgICAgICAgdmFyIGxpbmUgPSBlZGl0b3Iuc2Vzc2lvbi5nZXRMaW5lKHJhbmdlLnN0YXJ0LnJvdyk7XG4gICAgICAgIHJhbmdlLmVuZC5jb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgbGluZSA9IGxpbmUuc3Vic3RyKHJhbmdlLnN0YXJ0LmNvbHVtbik7XG4gICAgICAgIFxuICAgICAgICB2YXIgZm9sZExpbmUgPSBlZGl0b3Iuc2Vzc2lvbi5nZXRGb2xkTGluZShyYW5nZS5zdGFydC5yb3cpO1xuICAgICAgICBpZiAoZm9sZExpbmUgJiYgcmFuZ2UuZW5kLnJvdyAhPSBmb2xkTGluZS5lbmQucm93KSB7XG4gICAgICAgICAgICByYW5nZS5lbmQucm93ID0gZm9sZExpbmUuZW5kLnJvdztcbiAgICAgICAgICAgIGxpbmUgPSBcInhcIjtcbiAgICAgICAgfVxuICAgICAgICAvLyByZW1vdmUgRU9MIGlmIG9ubHkgd2hpdGVzcGFjZSByZW1haW5zIGFmdGVyIHRoZSBjdXJzb3JcbiAgICAgICAgaWYgKC9eXFxzKiQvLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIHJhbmdlLmVuZC5yb3crKztcbiAgICAgICAgICAgIGxpbmUgPSBlZGl0b3Iuc2Vzc2lvbi5nZXRMaW5lKHJhbmdlLmVuZC5yb3cpO1xuICAgICAgICAgICAgcmFuZ2UuZW5kLmNvbHVtbiA9IC9eXFxzKiQvLnRlc3QobGluZSkgPyBsaW5lLmxlbmd0aCA6IDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRleHQgPSBlZGl0b3Iuc2Vzc2lvbi5nZXRUZXh0UmFuZ2UocmFuZ2UpO1xuICAgICAgICBpZiAoZWRpdG9yLnByZXZPcC5jb21tYW5kID09IHRoaXMpXG4gICAgICAgICAgICBleHBvcnRzLmtpbGxSaW5nLmFwcGVuZCh0ZXh0KTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgZXhwb3J0cy5raWxsUmluZy5hZGQodGV4dCk7XG5cbiAgICAgICAgZWRpdG9yLnNlc3Npb24ucmVtb3ZlKHJhbmdlKTtcbiAgICAgICAgZWRpdG9yLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgfSxcbiAgICB5YW5rOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLm9uUGFzdGUoZXhwb3J0cy5raWxsUmluZy5nZXQoKSB8fCAnJyk7XG4gICAgICAgIGVkaXRvci5rZXlCaW5kaW5nLiRkYXRhLmxhc3RDb21tYW5kID0gXCJ5YW5rXCI7XG4gICAgfSxcbiAgICB5YW5rUm90YXRlOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgaWYgKGVkaXRvci5rZXlCaW5kaW5nLiRkYXRhLmxhc3RDb21tYW5kICE9IFwieWFua1wiKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBlZGl0b3IudW5kbygpO1xuICAgICAgICBlZGl0b3Iuc2Vzc2lvbi4kZW1hY3NNYXJrUmluZy5wb3AoKTsgLy8gYWxzbyB1bmRvIHJlY29yZGluZyBtYXJrXG4gICAgICAgIGVkaXRvci5vblBhc3RlKGV4cG9ydHMua2lsbFJpbmcucm90YXRlKCkpO1xuICAgICAgICBlZGl0b3Iua2V5QmluZGluZy4kZGF0YS5sYXN0Q29tbWFuZCA9IFwieWFua1wiO1xuICAgIH0sXG4gICAga2lsbFJlZ2lvbjoge1xuICAgICAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgICAgIGV4cG9ydHMua2lsbFJpbmcuYWRkKGVkaXRvci5nZXRDb3B5VGV4dCgpKTtcbiAgICAgICAgICAgIGVkaXRvci5jb21tYW5kcy5ieU5hbWUuY3V0LmV4ZWMoZWRpdG9yKTtcbiAgICAgICAgICAgIGVkaXRvci5zZXRFbWFjc01hcmsobnVsbCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlYWRPbmx5OiB0cnVlLFxuICAgICAgICBtdWx0aVNlbGVjdEFjdGlvbjogXCJmb3JFYWNoXCJcbiAgICB9LFxuICAgIGtpbGxSaW5nU2F2ZToge1xuICAgICAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgICAgIC8vIGNvcHkgdGV4dCBhbmQgZGVzZWxlY3QuIHdpbGwgc2F2ZSBtYXJrcyBmb3Igc3RhcnRzIG9mIHRoZVxuICAgICAgICAgICAgLy8gc2VsZWN0aW9uKHMpXG5cbiAgICAgICAgICAgIGVkaXRvci4kaGFuZGxlc0VtYWNzT25Db3B5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBtYXJrcyA9IGVkaXRvci5zZXNzaW9uLiRlbWFjc01hcmtSaW5nLnNsaWNlKCksXG4gICAgICAgICAgICAgICAgZGVzZWxlY3RlZE1hcmtzID0gW107XG4gICAgICAgICAgICBleHBvcnRzLmtpbGxSaW5nLmFkZChlZGl0b3IuZ2V0Q29weVRleHQoKSk7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gZGVzZWxlY3QoKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZWwgPSBlZGl0b3Iuc2VsZWN0aW9uLCByYW5nZSA9IHNlbC5nZXRSYW5nZSgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgcG9zID0gc2VsLmlzQmFja3dhcmRzKCkgPyByYW5nZS5lbmQgOiByYW5nZS5zdGFydDtcbiAgICAgICAgICAgICAgICAgICAgZGVzZWxlY3RlZE1hcmtzLnB1c2goe3JvdzogcG9zLnJvdywgY29sdW1uOiBwb3MuY29sdW1ufSk7XG4gICAgICAgICAgICAgICAgICAgIHNlbC5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlZGl0b3IuJGhhbmRsZXNFbWFjc09uQ29weSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGlmIChlZGl0b3IuaW5NdWx0aVNlbGVjdE1vZGUpIGVkaXRvci5mb3JFYWNoU2VsZWN0aW9uKHtleGVjOiBkZXNlbGVjdH0pO1xuICAgICAgICAgICAgICAgIGVsc2UgZGVzZWxlY3QoKTtcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0RW1hY3NNYXJrKG51bGwpO1xuICAgICAgICAgICAgICAgIGVkaXRvci5zZXNzaW9uLiRlbWFjc01hcmtSaW5nID0gbWFya3MuY29uY2F0KGRlc2VsZWN0ZWRNYXJrcy5yZXZlcnNlKCkpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlYWRPbmx5OiB0cnVlXG4gICAgfSxcbiAgICBrZXlib2FyZFF1aXQ6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgIGVkaXRvci5zZXRFbWFjc01hcmsobnVsbCk7XG4gICAgICAgIGVkaXRvci5rZXlCaW5kaW5nLiRkYXRhLmNvdW50ID0gbnVsbDtcbiAgICB9LFxuICAgIGZvY3VzQ29tbWFuZExpbmU6IGZ1bmN0aW9uKGVkaXRvciwgYXJnKSB7XG4gICAgICAgIGlmIChlZGl0b3Iuc2hvd0NvbW1hbmRMaW5lKVxuICAgICAgICAgICAgZWRpdG9yLnNob3dDb21tYW5kTGluZShhcmcpO1xuICAgIH1cbn0pO1xuXG5leHBvcnRzLmhhbmRsZXIuYWRkQ29tbWFuZHMoaVNlYXJjaENvbW1hbmRNb2R1bGUuaVNlYXJjaFN0YXJ0Q29tbWFuZHMpO1xuXG52YXIgY29tbWFuZHMgPSBleHBvcnRzLmhhbmRsZXIuY29tbWFuZHM7XG5jb21tYW5kcy55YW5rLmlzWWFuayA9IHRydWU7XG5jb21tYW5kcy55YW5rUm90YXRlLmlzWWFuayA9IHRydWU7XG5cbmV4cG9ydHMua2lsbFJpbmcgPSB7XG4gICAgJGRhdGE6IFtdLFxuICAgIGFkZDogZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgIHN0ciAmJiB0aGlzLiRkYXRhLnB1c2goc3RyKTtcbiAgICAgICAgaWYgKHRoaXMuJGRhdGEubGVuZ3RoID4gMzApXG4gICAgICAgICAgICB0aGlzLiRkYXRhLnNoaWZ0KCk7XG4gICAgfSxcbiAgICBhcHBlbmQ6IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICB2YXIgaWR4ID0gdGhpcy4kZGF0YS5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgdGV4dCA9IHRoaXMuJGRhdGFbaWR4XSB8fCBcIlwiO1xuICAgICAgICBpZiAoc3RyKSB0ZXh0ICs9IHN0cjtcbiAgICAgICAgaWYgKHRleHQpIHRoaXMuJGRhdGFbaWR4XSA9IHRleHQ7XG4gICAgfSxcbiAgICBnZXQ6IGZ1bmN0aW9uKG4pIHtcbiAgICAgICAgbiA9IG4gfHwgMTtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGRhdGEuc2xpY2UodGhpcy4kZGF0YS5sZW5ndGgtbiwgdGhpcy4kZGF0YS5sZW5ndGgpLnJldmVyc2UoKS5qb2luKCdcXG4nKTtcbiAgICB9LFxuICAgIHBvcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLiRkYXRhLmxlbmd0aCA+IDEpXG4gICAgICAgICAgICB0aGlzLiRkYXRhLnBvcCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5nZXQoKTtcbiAgICB9LFxuICAgIHJvdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuJGRhdGEudW5zaGlmdCh0aGlzLiRkYXRhLnBvcCgpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0KCk7XG4gICAgfVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4vbGliL29vcFwiKTtcbnZhciBTZWFyY2ggPSByZXF1aXJlKFwiLi9zZWFyY2hcIikuU2VhcmNoO1xudmFyIEVkaXRTZXNzaW9uID0gcmVxdWlyZShcIi4vZWRpdF9zZXNzaW9uXCIpLkVkaXRTZXNzaW9uO1xudmFyIFNlYXJjaEhpZ2hsaWdodCA9IHJlcXVpcmUoXCIuL3NlYXJjaF9oaWdobGlnaHRcIikuU2VhcmNoSGlnaGxpZ2h0O1xuXG4vKipcbiAqIEBjbGFzcyBPY2N1clxuICpcbiAqIEZpbmRzIGFsbCBsaW5lcyBtYXRjaGluZyBhIHNlYXJjaCB0ZXJtIGluIHRoZSBjdXJyZW50IFtbRG9jdW1lbnRcbiAqIGBEb2N1bWVudGBdXSBhbmQgZGlzcGxheXMgdGhlbSBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBgRG9jdW1lbnRgLiBLZWVwc1xuICogdHJhY2sgb2YgdGhlIG1hcHBpbmcgYmV0d2VlbiB0aGUgb2NjdXIgZG9jIGFuZCB0aGUgb3JpZ2luYWwgZG9jLlxuICpcbiAqKi9cbmNsYXNzIE9jY3VyIGV4dGVuZHMgU2VhcmNoIHtcblxuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgb2NjdXIgbW9kZS4gZXhwZWN0cyB0aGF0IGBvcHRpb25zLm5lZWRsZWAgaXMgYSBzZWFyY2ggdGVybS5cbiAgICAgKiBUaGlzIHNlYXJjaCB0ZXJtIGlzIHVzZWQgdG8gZmlsdGVyIG91dCBhbGwgdGhlIGxpbmVzIHRoYXQgaW5jbHVkZSBpdFxuICAgICAqIGFuZCB0aGVzZSBhcmUgdGhlbiB1c2VkIGFzIHRoZSBjb250ZW50IG9mIGEgbmV3IFtbRG9jdW1lbnRcbiAgICAgKiBgRG9jdW1lbnRgXV0uIFRoZSBjdXJyZW50IGN1cnNvciBwb3NpdGlvbiBvZiBlZGl0b3Igd2lsbCBiZSB0cmFuc2xhdGVkXG4gICAgICogc28gdGhhdCB0aGUgY3Vyc29yIGlzIG9uIHRoZSBtYXRjaGluZyByb3cvY29sdW1uIGFzIGl0IHdhcyBiZWZvcmUuXG4gICAgICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIG9wdGlvbnMubmVlZGxlIHNob3VsZCBiZSBhIFN0cmluZ1xuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IFdoZXRoZXIgb2NjdXIgYWN0aXZhdGlvbiB3YXMgc3VjY2Vzc2Z1bFxuICAgICAqXG4gICAgICoqL1xuICAgIGVudGVyKGVkaXRvciwgb3B0aW9ucykge1xuICAgICAgICBpZiAoIW9wdGlvbnMubmVlZGxlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHZhciBwb3MgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5T2NjdXJDb250ZW50KGVkaXRvciwgb3B0aW9ucyk7XG4gICAgICAgIHZhciB0cmFuc2xhdGVkUG9zID0gdGhpcy5vcmlnaW5hbFRvT2NjdXJQb3NpdGlvbihlZGl0b3Iuc2Vzc2lvbiwgcG9zKTtcbiAgICAgICAgZWRpdG9yLm1vdmVDdXJzb3JUb1Bvc2l0aW9uKHRyYW5zbGF0ZWRQb3MpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlcyBvY2N1ciBtb2RlLiBSZXNldHMgdGhlIFtbU2Vzc2lvbnMgYEVkaXRTZXNzaW9uYF1dIFtbRG9jdW1lbnRcbiAgICAgKiBgRG9jdW1lbnRgXV0gYmFjayB0byB0aGUgb3JpZ2luYWwgZG9jLiBJZiBvcHRpb25zLnRyYW5zbGF0ZVBvc2l0aW9uIGlzXG4gICAgICogdHJ1dGh5IGFsc28gbWFwcyB0aGUgW1tFZGl0b3JzIGBFZGl0b3JgXV0gY3Vyc29yIHBvc2l0aW9uIGFjY29yZGluZ2x5LlxuICAgICAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBvcHRpb25zLnRyYW5zbGF0ZVBvc2l0aW9uXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gV2hldGhlciBvY2N1ciBkZWFjdGl2YXRpb24gd2FzIHN1Y2Nlc3NmdWxcbiAgICAgKlxuICAgICAqKi9cbiAgICBleGl0KGVkaXRvciwgb3B0aW9ucykge1xuICAgICAgICB2YXIgcG9zID0gb3B0aW9ucy50cmFuc2xhdGVQb3NpdGlvbiAmJiBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHRyYW5zbGF0ZWRQb3MgPSBwb3MgJiYgdGhpcy5vY2N1clRvT3JpZ2luYWxQb3NpdGlvbihlZGl0b3Iuc2Vzc2lvbiwgcG9zKTtcbiAgICAgICAgdGhpcy5kaXNwbGF5T3JpZ2luYWxDb250ZW50KGVkaXRvcik7XG4gICAgICAgIGlmICh0cmFuc2xhdGVkUG9zKVxuICAgICAgICAgICAgZWRpdG9yLm1vdmVDdXJzb3JUb1Bvc2l0aW9uKHRyYW5zbGF0ZWRQb3MpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBoaWdobGlnaHQoc2VzcywgcmVnZXhwKSB7XG4gICAgICAgIHZhciBobCA9IHNlc3MuJG9jY3VySGlnaGxpZ2h0ID0gc2Vzcy4kb2NjdXJIaWdobGlnaHQgfHwgc2Vzcy5hZGREeW5hbWljTWFya2VyKFxuICAgICAgICAgICAgICAgIG5ldyBTZWFyY2hIaWdobGlnaHQobnVsbCwgXCJhY2Vfb2NjdXItaGlnaGxpZ2h0XCIsIFwidGV4dFwiKSk7XG4gICAgICAgIGhsLnNldFJlZ2V4cChyZWdleHApO1xuICAgICAgICBzZXNzLl9lbWl0KFwiY2hhbmdlQmFja01hcmtlclwiKTsgLy8gZm9yY2UgaGlnaGxpZ2h0IGxheWVyIHJlZHJhd1xuICAgIH1cblxuICAgIGRpc3BsYXlPY2N1ckNvbnRlbnQoZWRpdG9yLCBvcHRpb25zKSB7XG4gICAgICAgIC8vIHRoaXMuc2V0U2Vzc2lvbihzZXNzaW9uIHx8IG5ldyBFZGl0U2Vzc2lvbihcIlwiKSlcbiAgICAgICAgdGhpcy4kb3JpZ2luYWxTZXNzaW9uID0gZWRpdG9yLnNlc3Npb247XG4gICAgICAgIHZhciBmb3VuZCA9IHRoaXMubWF0Y2hpbmdMaW5lcyhlZGl0b3Iuc2Vzc2lvbiwgb3B0aW9ucyk7XG4gICAgICAgIHZhciBsaW5lcyA9IGZvdW5kLm1hcChmdW5jdGlvbihmb3VuZExpbmUpIHsgcmV0dXJuIGZvdW5kTGluZS5jb250ZW50OyB9KTtcbiAgICAgICAgdmFyIG9jY3VyU2Vzc2lvbiA9IG5ldyBFZGl0U2Vzc2lvbihsaW5lcy5qb2luKCdcXG4nKSk7XG4gICAgICAgIG9jY3VyU2Vzc2lvbi4kb2NjdXIgPSB0aGlzO1xuICAgICAgICBvY2N1clNlc3Npb24uJG9jY3VyTWF0Y2hpbmdMaW5lcyA9IGZvdW5kO1xuICAgICAgICBlZGl0b3Iuc2V0U2Vzc2lvbihvY2N1clNlc3Npb24pO1xuICAgICAgICB0aGlzLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0ID0gdGhpcy4kb3JpZ2luYWxTZXNzaW9uLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0O1xuICAgICAgICBvY2N1clNlc3Npb24uJHVzZUVtYWNzU3R5bGVMaW5lU3RhcnQgPSB0aGlzLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0O1xuICAgICAgICB0aGlzLmhpZ2hsaWdodChvY2N1clNlc3Npb24sIG9wdGlvbnMucmUpO1xuICAgICAgICBvY2N1clNlc3Npb24uX2VtaXQoJ2NoYW5nZUJhY2tNYXJrZXInKTtcbiAgICB9XG5cbiAgICBkaXNwbGF5T3JpZ2luYWxDb250ZW50KGVkaXRvcikge1xuICAgICAgICBlZGl0b3Iuc2V0U2Vzc2lvbih0aGlzLiRvcmlnaW5hbFNlc3Npb24pO1xuICAgICAgICB0aGlzLiRvcmlnaW5hbFNlc3Npb24uJHVzZUVtYWNzU3R5bGVMaW5lU3RhcnQgPSB0aGlzLiR1c2VFbWFjc1N0eWxlTGluZVN0YXJ0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICogVHJhbnNsYXRlcyB0aGUgcG9zaXRpb24gZnJvbSB0aGUgb3JpZ2luYWwgZG9jdW1lbnQgdG8gdGhlIG9jY3VyIGxpbmVzIGluXG4gICAgKiB0aGUgZG9jdW1lbnQgb3IgdGhlIGJlZ2lubmluZyBpZiB0aGUgZG9jIHtyb3c6IDAsIGNvbHVtbjogMH0gaWYgbm90XG4gICAgKiBmb3VuZC5cbiAgICAqIEBwYXJhbSB7RWRpdFNlc3Npb259IHNlc3Npb24gVGhlIG9jY3VyIHNlc3Npb25cbiAgICAqIEBwYXJhbSB7T2JqZWN0fSBwb3MgVGhlIHBvc2l0aW9uIGluIHRoZSBvcmlnaW5hbCBkb2N1bWVudFxuICAgICogQHJldHVybiB7T2JqZWN0fSBwb3NpdGlvbiBpbiBvY2N1ciBkb2NcbiAgICAqKi9cbiAgICBvcmlnaW5hbFRvT2NjdXJQb3NpdGlvbihzZXNzaW9uLCBwb3MpIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc2Vzc2lvbi4kb2NjdXJNYXRjaGluZ0xpbmVzO1xuICAgICAgICB2YXIgbnVsbFBvcyA9IHtyb3c6IDAsIGNvbHVtbjogMH07XG4gICAgICAgIGlmICghbGluZXMpIHJldHVybiBudWxsUG9zO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAobGluZXNbaV0ucm93ID09PSBwb3Mucm93KVxuICAgICAgICAgICAgICAgIHJldHVybiB7cm93OiBpLCBjb2x1bW46IHBvcy5jb2x1bW59O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsUG9zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogVHJhbnNsYXRlcyB0aGUgcG9zaXRpb24gZnJvbSB0aGUgb2NjdXIgZG9jdW1lbnQgdG8gdGhlIG9yaWdpbmFsIGRvY3VtZW50XG4gICAgKiBvciBgcG9zYCBpZiBub3QgZm91bmQuXG4gICAgKiBAcGFyYW0ge0VkaXRTZXNzaW9ufSBzZXNzaW9uIFRoZSBvY2N1ciBzZXNzaW9uXG4gICAgKiBAcGFyYW0ge09iamVjdH0gcG9zIFRoZSBwb3NpdGlvbiBpbiB0aGUgb2NjdXIgc2Vzc2lvbiBkb2N1bWVudFxuICAgICogQHJldHVybiB7T2JqZWN0fSBwb3NpdGlvblxuICAgICoqL1xuICAgIG9jY3VyVG9PcmlnaW5hbFBvc2l0aW9uKHNlc3Npb24sIHBvcykge1xuICAgICAgICB2YXIgbGluZXMgPSBzZXNzaW9uLiRvY2N1ck1hdGNoaW5nTGluZXM7XG4gICAgICAgIGlmICghbGluZXMgfHwgIWxpbmVzW3Bvcy5yb3ddKVxuICAgICAgICAgICAgcmV0dXJuIHBvcztcbiAgICAgICAgcmV0dXJuIHtyb3c6IGxpbmVzW3Bvcy5yb3ddLnJvdywgY29sdW1uOiBwb3MuY29sdW1ufTtcbiAgICB9XG5cbiAgICBtYXRjaGluZ0xpbmVzKHNlc3Npb24sIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9vcC5taXhpbih7fSwgb3B0aW9ucyk7XG4gICAgICAgIGlmICghc2Vzc2lvbiB8fCAhb3B0aW9ucy5uZWVkbGUpIHJldHVybiBbXTtcbiAgICAgICAgdmFyIHNlYXJjaCA9IG5ldyBTZWFyY2goKTtcbiAgICAgICAgc2VhcmNoLnNldChvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHNlYXJjaC5maW5kQWxsKHNlc3Npb24pLnJlZHVjZShmdW5jdGlvbihsaW5lcywgcmFuZ2UpIHtcbiAgICAgICAgICAgIHZhciByb3cgPSByYW5nZS5zdGFydC5yb3c7XG4gICAgICAgICAgICB2YXIgbGFzdCA9IGxpbmVzW2xpbmVzLmxlbmd0aC0xXTtcbiAgICAgICAgICAgIHJldHVybiBsYXN0ICYmIGxhc3Qucm93ID09PSByb3cgP1xuICAgICAgICAgICAgICAgIGxpbmVzIDpcbiAgICAgICAgICAgICAgICBsaW5lcy5jb25jYXQoe3Jvdzogcm93LCBjb250ZW50OiBzZXNzaW9uLmdldExpbmUocm93KX0pO1xuICAgICAgICB9LCBbXSk7XG4gICAgfVxuXG59XG5cbnZhciBkb20gPSByZXF1aXJlKCcuL2xpYi9kb20nKTtcbmRvbS5pbXBvcnRDc3NTdHJpbmcoXCIuYWNlX29jY3VyLWhpZ2hsaWdodCB7XFxuXFxcbiAgICBib3JkZXItcmFkaXVzOiA0cHg7XFxuXFxcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDg3LCAyNTUsIDgsIDAuMjUpO1xcblxcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcblxcXG4gICAgei1pbmRleDogNDtcXG5cXFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuXFxcbiAgICBib3gtc2hhZG93OiAwIDAgNHB4IHJnYig5MSwgMjU1LCA1MCk7XFxuXFxcbn1cXG5cXFxuLmFjZV9kYXJrIC5hY2Vfb2NjdXItaGlnaGxpZ2h0IHtcXG5cXFxuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYig4MCwgMTQwLCA4NSk7XFxuXFxcbiAgICBib3gtc2hhZG93OiAwIDAgNHB4IHJnYig2MCwgMTIwLCA3MCk7XFxuXFxcbn1cXG5cIiwgXCJpbmNyZW1lbnRhbC1vY2N1ci1oaWdobGlnaHRpbmdcIiwgZmFsc2UpO1xuXG5leHBvcnRzLk9jY3VyID0gT2NjdXI7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=