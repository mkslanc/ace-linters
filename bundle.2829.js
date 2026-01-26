"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2829,7674],{

/***/ 57674:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * ## Text hard wrapping extension for automatic line breaking and text formatting.
 *
 * Provides intelligent line wrapping functionality that breaks long lines at configurable column limits while
 * preserving indentation and optionally merging short adjacent lines. Supports both automatic wrapping during text
 * input and manual formatting of selected text ranges.
 *
 * **Enable:** `editor.setOption("hardWrap", true)`
 * or configure it during editor initialization in the options object.
 * @module
 */



var Range = (__webpack_require__(91902)/* .Range */ .Q);

/**
 * Wraps lines at specified column limits and optionally merges short adjacent lines.
 *
 * Processes text within the specified row range, breaking lines that exceed the maximum column
 * width at appropriate word boundaries while preserving indentation. When merge is enabled,
 * combines short consecutive lines that can fit within the column limit. Automatically adjusts
 * the end row when new line breaks are inserted to ensure all affected content is processed.
 *
 * @param {import("../editor").Editor} editor - The editor instance containing the text to wrap
 * @param {import("../../ace-internal").Ace.HardWrapOptions} options - Configuration options for wrapping behavior
 */

function hardWrap(editor, options) {
    var max = options.column || editor.getOption("printMarginColumn");
    var allowMerge = options.allowMerge != false;
       
    var row = Math.min(options.startRow, options.endRow);
    var endRow = Math.max(options.startRow, options.endRow);
    
    var session = editor.session;
    
    while (row <= endRow) {
        var line = session.getLine(row);
        if (line.length > max) {
            var space = findSpace(line, max, 5);
            if (space) {
                var indentation = /^\s*/.exec(line)[0];
                session.replace(new Range(row,space.start,row,space.end), "\n" + indentation);
            }
            endRow++;
        } else if (allowMerge && /\S/.test(line) && row != endRow) {
            var nextLine = session.getLine(row + 1);
            if (nextLine && /\S/.test(nextLine)) {
                var trimmedLine = line.replace(/\s+$/, "");
                var trimmedNextLine = nextLine.replace(/^\s+/, "");
                var mergedLine = trimmedLine + " " + trimmedNextLine;

                var space = findSpace(mergedLine, max, 5);
                if (space && space.start > trimmedLine.length || mergedLine.length < max) {
                    var replaceRange = new Range(row,trimmedLine.length,row + 1,nextLine.length - trimmedNextLine.length);
                    session.replace(replaceRange, " ");
                    row--;
                    endRow--;
                } else if (trimmedLine.length < line.length) {
                    session.remove(new Range(row, trimmedLine.length, row, line.length));
                }
            }
        }
        row++;
    }

    /**
     * @param {string} line
     * @param {number} max
     * @param {number} min
     */
    function findSpace(line, max, min) {
        if (line.length < max)
            return;
        var before = line.slice(0, max);
        var after = line.slice(max);
        var spaceAfter = /^(?:(\s+)|(\S+)(\s+))/.exec(after);
        var spaceBefore = /(?:(\s+)|(\s+)(\S+))$/.exec(before);
        var start = 0;
        var end = 0;
        if (spaceBefore && !spaceBefore[2]) {
            start = max - spaceBefore[1].length;
            end = max;
        }
        if (spaceAfter && !spaceAfter[2]) {
            if (!start)
                start = max;
            end = max + spaceAfter[1].length;
        }
        if (start) {
            return {
                start: start,
                end: end
            };
        }
        if (spaceBefore && spaceBefore[2] && spaceBefore.index > min) {
            return {
                start: spaceBefore.index,
                end: spaceBefore.index + spaceBefore[2].length
            };
        }
        if (spaceAfter && spaceAfter[2]) {
            start =  max + spaceAfter[2].length;
            return {
                start: start,
                end: start + spaceAfter[3].length
            };
        }
    }

}

function wrapAfterInput(e) {
    if (e.command.name == "insertstring" && /\S/.test(e.args)) {
        var editor = e.editor;
        var cursor = editor.selection.cursor;
        if (cursor.column <= editor.renderer.$printMarginColumn) return;
        var lastDelta = editor.session.$undoManager.$lastDelta;

        hardWrap(editor, {
            startRow: cursor.row, endRow: cursor.row,
            allowMerge: false
        });
        if (lastDelta != editor.session.$undoManager.$lastDelta) 
            editor.session.markUndoGroup();
    }
}

var Editor = (__webpack_require__(27258).Editor);
(__webpack_require__(76321).defineOptions)(Editor.prototype, "editor", {
    hardWrap: {
        set: function(val) {
            if (val) {
                this.commands.on("afterExec", wrapAfterInput);
            } else {
                this.commands.off("afterExec", wrapAfterInput);
            }
        },
        value: false
    }
});

exports.hardWrap = hardWrap;


/***/ }),

/***/ 2829:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: https://codemirror.net/5/LICENSE

/**
 * Supported keybindings:
 *   Too many to list. Refer to defaultKeymap below.
 *
 * Supported Ex commands:
 *   Refer to defaultExCommandMap below.
 *
 * Registers: unnamed, -, ., :, /, _, a-z, A-Z, 0-9
 *   (Does not respect the special case for number registers when delete
 *    operator is made with these commands: %, (, ),  , /, ?, n, N, {, } )
 *   TODO: Implement the remaining registers.
 *
 * Marks: a-z, A-Z, and 0-9
 *   TODO: Implement the remaining special marks. They have more complex
 *       behavior.
 *
 * Events:
 *  'vim-mode-change' - raised on the editor anytime the current mode changes,
 *                      Event object: {mode: "visual", subMode: "linewise"}
 *
 * Code structure:
 *  1. Default keymap
 *  2. Variable declarations and short basic helpers
 *  3. Instance (External API) implementation
 *  4. Internal state tracking objects (input state, counter) implementation
 *     and instantiation
 *  5. Key handler (the main command dispatcher) implementation
 *  6. Motion, operator, and action implementations
 *  7. Helper functions for the key handler, motions, operators, and actions
 *  8. Set up Vim to work as a keymap for CodeMirror.
 *  9. Ex command implementations.
 */

  

  function log() {
    var d = "";
    function format(p) {
      if (typeof p != "object")
        return p + "";
      if ("line" in p) {
        return p.line + ":" + p.ch;
      }
      if ("anchor" in p) {
        return format(p.anchor) + "->" + format(p.head);
      }
      if (Array.isArray(p))
        return "[" + p.map(function(x) {
          return format(x);
        }) + "]";
      return JSON.stringify(p);
    }
    for (var i = 0; i < arguments.length; i++) {
      var p = arguments[i];
      var f = format(p);
      d += f + "  ";
    }
    console.log(d);
  }
  var Range = (__webpack_require__(91902)/* .Range */ .Q);
  var EventEmitter = (__webpack_require__(87366).EventEmitter);
  var domLib = __webpack_require__(71435);
  var oop = __webpack_require__(2645);
  var KEYS = __webpack_require__(29451);
  var event = __webpack_require__(19631);
  var Search = (__webpack_require__(99427)/* .Search */ .v);
  var useragent = __webpack_require__(74943);
  var SearchHighlight = (__webpack_require__(10464)/* .SearchHighlight */ .V);
  var multiSelectCommands = __webpack_require__(45375);
  var TextModeTokenRe = (__webpack_require__(49432).Mode).prototype.tokenRe;
  var hardWrap = (__webpack_require__(57674).hardWrap);
  __webpack_require__(48369);

  var CodeMirror = function(ace) {
    this.ace = ace;
    this.state = {};
    this.marks = {};
    this.options = {};
    this.$uid = 0;
    this.onChange = this.onChange.bind(this);
    this.onSelectionChange = this.onSelectionChange.bind(this);
    this.onBeforeEndOperation = this.onBeforeEndOperation.bind(this);
    this.ace.on('change', this.onChange);
    this.ace.on('changeSelection', this.onSelectionChange);
    this.ace.on('beforeEndOperation', this.onBeforeEndOperation);
  };
  CodeMirror.Pos = function(line, ch) {
    if (!(this instanceof Pos)) return new Pos(line, ch);
    this.line = line; this.ch = ch;
  };
  CodeMirror.defineOption = function(name, val, setter) {};
  CodeMirror.commands = {
    redo: function(cm) { cm.ace.redo(); },
    undo: function(cm) { cm.ace.undo(); },
    newlineAndIndent: function(cm) { cm.ace.insert("\n"); },
    goLineLeft: function(cm) { cm.ace.selection.moveCursorLineStart(); },
    goLineRight: function(cm) { cm.ace.selection.moveCursorLineEnd(); }
  };
  CodeMirror.keyMap = {};
  CodeMirror.addClass = CodeMirror.rmClass = function() {};
  CodeMirror.e_stop = CodeMirror.e_preventDefault = event.stopEvent;
  CodeMirror.keyName = function(e) {
    var key = (KEYS[e.keyCode] || e.key || "");
    if (key.length == 1) key = key.toUpperCase();
    key = event.getModifierString(e).replace(/(^|-)\w/g, function(m) {
      return m.toUpperCase();
    }) + key;
    return key;
  };
  CodeMirror.keyMap['default'] = function(key) {
    return function(cm) {
      var cmd = cm.ace.commands.commandKeyBinding[key.toLowerCase()];
      return cmd && cm.ace.execCommand(cmd) !== false;
    };
  };
  CodeMirror.lookupKey = function lookupKey(key, map, handle) {
    if (!map) map = "default";
    if (typeof map == "string")
      map = CodeMirror.keyMap[map] ||  CodeMirror.keyMap['default'];
    var found = typeof map == "function" ? map(key) : map[key];
    if (found === false) return "nothing";
    if (found === "...") return "multi";
    if (found != null && handle(found)) return "handled";

    if (map.fallthrough) {
      if (!Array.isArray(map.fallthrough))
        return lookupKey(key, map.fallthrough, handle);
      for (var i = 0; i < map.fallthrough.length; i++) {
        var result = lookupKey(key, map.fallthrough[i], handle);
        if (result) return result;
      }
    }
  };


  CodeMirror.findMatchingTag = function (cm, head) {
    return cm.findMatchingTag(head);
  }

  CodeMirror.findEnclosingTag = function (cm, head) {

  };

  CodeMirror.signal = function(o, name, e) { return o._signal(name, e) };
  CodeMirror.on = event.addListener;
  CodeMirror.off = event.removeListener;
  CodeMirror.isWordChar = function(ch) {
    if (ch < "\x7f") return /^\w$/.test(ch);
    TextModeTokenRe.lastIndex = 0;
    return TextModeTokenRe.test(ch);
  };

(function() {
  oop.implement(CodeMirror.prototype, EventEmitter);

  this.destroy = function() {
    this.ace.off('change', this.onChange);
    this.ace.off('changeSelection', this.onSelectionChange);
    this.ace.off('beforeEndOperation', this.onBeforeEndOperation);
    this.removeOverlay();
  };
  this.virtualSelectionMode = function() {
    return this.ace.inVirtualSelectionMode && this.ace.selection.index;
  };
  this.onChange = function(delta) {
    if (this.$lineHandleChanges) {
      this.$lineHandleChanges.push(delta);
    }
    var change = { text: delta.action[0] == 'i' ? delta.lines : [] };
    var curOp = this.curOp = this.curOp || {};
    if (!curOp.changeHandlers)
      curOp.changeHandlers = this._eventRegistry["change"] && this._eventRegistry["change"].slice();
    if (!curOp.lastChange) {
      curOp.lastChange = curOp.change = change;
    } else {
      curOp.lastChange.next = curOp.lastChange = change;
    }
    this.$updateMarkers(delta);
  };
  this.onSelectionChange = function() {
    var curOp = this.curOp = this.curOp || {};
    if (!curOp.cursorActivityHandlers)
      curOp.cursorActivityHandlers = this._eventRegistry["cursorActivity"] && this._eventRegistry["cursorActivity"].slice();
    this.curOp.cursorActivity = true;
    if (this.ace.inMultiSelectMode) {
      this.ace.keyBinding.removeKeyboardHandler(multiSelectCommands.keyboardHandler);
    }
  };
  this.operation = function(fn, force) {
    if (!force && this.curOp || force && this.curOp && this.curOp.force) {
      return fn();
    }
    if (force || !this.ace.curOp) {
      if (this.curOp)
        this.onBeforeEndOperation();
    }
    if (!this.ace.curOp) {
      var prevOp = this.ace.prevOp;
      this.ace.startOperation({
        command: { name: "vim",  scrollIntoView: "cursor" }
      });
    }
    var curOp = this.curOp = this.curOp || {};
    this.curOp.force = force;
    var result = fn();
    if (this.ace.curOp && this.ace.curOp.command.name == "vim") {
      if (this.state.dialog)
        this.ace.curOp.command.scrollIntoView = this.ace.curOp.vimDialogScroll;
      this.ace.endOperation();
      if (!curOp.cursorActivity && !curOp.lastChange && prevOp)
        this.ace.prevOp = prevOp;
    }
    if (force || !this.ace.curOp) {
      if (this.curOp)
        this.onBeforeEndOperation();
    }
    return result;
  };
  this.onBeforeEndOperation = function() {
    var op = this.curOp;
    if (op) {
      if (op.change) { this.signal("change", op.change, op); }
      if (op && op.cursorActivity) { this.signal("cursorActivity", null, op); }
      this.curOp = null;
    }
  };

  this.signal = function(eventName, e, handlers) {
    var listeners = handlers ? handlers[eventName + "Handlers"]
        : (this._eventRegistry || {})[eventName];
    if (!listeners)
        return;
    listeners = listeners.slice();
    for (var i=0; i<listeners.length; i++)
        listeners[i](this, e);
  };
  this.firstLine = function() { return 0; };
  this.lastLine = function() { return this.ace.session.getLength() - 1; };
  this.lineCount = function() { return this.ace.session.getLength(); };
  this.setCursor = function(line, ch) {
    if (typeof line === 'object') {
      ch = line.ch;
      line = line.line;
    }
    var shouldScroll = !this.curOp && !this.ace.inVirtualSelectionMode;
    if (!this.ace.inVirtualSelectionMode)
      this.ace.exitMultiSelectMode();
    this.ace.session.unfold({row: line, column: ch});
    this.ace.selection.moveTo(line, ch);
    if (shouldScroll) {
      this.ace.renderer.scrollCursorIntoView();
      this.ace.endOperation();
    }
  };
  this.getCursor = function(p) {
    var sel = this.ace.selection;
    var pos = p == 'anchor' ? (sel.isEmpty() ? sel.lead : sel.anchor) :
        p == 'head' || !p ? sel.lead : sel.getRange()[p];
    return toCmPos(pos);
  };
  this.listSelections = function(p) {
    var ranges = this.ace.multiSelect.rangeList.ranges;
    if (!ranges.length || this.ace.inVirtualSelectionMode)
      return [{anchor: this.getCursor('anchor'), head: this.getCursor('head')}];
    return ranges.map(function(r) {
      return {
        anchor: this.clipPos(toCmPos(r.cursor == r.end ? r.start : r.end)),
        head: this.clipPos(toCmPos(r.cursor))
      };
    }, this);
  };
  this.setSelections = function(p, primIndex) {
    var sel = this.ace.multiSelect;
    var ranges = p.map(function(x) {
      var anchor = toAcePos(x.anchor);
      var head = toAcePos(x.head);
      var r = Range.comparePoints(anchor, head) < 0
        ? new Range.fromPoints(anchor, head)
        : new Range.fromPoints(head, anchor);
      r.cursor = Range.comparePoints(r.start, head) ? r.end : r.start;
      return r;
    });

    if (this.ace.inVirtualSelectionMode) {
      this.ace.selection.fromOrientedRange(ranges[0]);
      return;
    }
    if (!primIndex) {
        ranges = ranges.reverse();
    } else if (ranges[primIndex]) {
       ranges.push(ranges.splice(primIndex, 1)[0]);
    }
    sel.toSingleRange(ranges[0].clone());
    var session = this.ace.session;
    for (var i = 0; i < ranges.length; i++) {
      var range = session.$clipRangeToDocument(ranges[i]); // todo why ace doesn't do this?
      sel.addRange(range);
    }
  };
  this.setSelection = function(a, h, options) {
    var sel = this.ace.selection;
    sel.moveTo(a.line, a.ch);
    sel.selectTo(h.line, h.ch);
    if (options && options.origin == '*mouse') {
      this.onBeforeEndOperation();
    }
  };
  this.somethingSelected = function(p) {
    return !this.ace.selection.isEmpty();
  };
  this.clipPos = function(p) {
    var pos = this.ace.session.$clipPositionToDocument(p.line, p.ch);
    return toCmPos(pos);
  };
  this.foldCode = function(pos) {
    this.ace.session.$toggleFoldWidget(pos.line, {});
  };
  this.markText = function(cursor) {
    // only used for fat-cursor, not needed
    return {clear: function() {}, find: function() {}};
  };
  this.$updateMarkers = function(delta) {
    var isInsert = delta.action == "insert";
    var start = delta.start;
    var end = delta.end;
    var rowShift = (end.row - start.row) * (isInsert ? 1 : -1);
    var colShift = (end.column - start.column) * (isInsert ? 1 : -1);
    if (isInsert) end = start;

    for (var i in this.marks) {
      var point = this.marks[i];
      var cmp = Range.comparePoints(point, start);
      if (cmp < 0) {
        continue; // delta starts after the range
      }
      if (cmp === 0) {
        if (isInsert) {
          if (!point.$insertRight) {
            cmp = 1;
          }
          else if (point.bias == 1) {
            cmp = 1;
          } else {
            point.bias = -1;
            continue;
          }
        }
      }
      var cmp2 = isInsert ? cmp : Range.comparePoints(point, end);
      if (cmp2 > 0) {
        point.row += rowShift;
        point.column += point.row == end.row ? colShift : 0;
        continue;
      }
      if (!isInsert && cmp2 <= 0) {
        point.row = start.row;
        point.column = start.column;
        if (cmp2 === 0)
          point.bias = 1;
      }
    }
  };
  var Marker = function(cm, id, row, column) {
    this.cm = cm;
    this.id = id;
    this.row = row;
    this.column = column;
    cm.marks[this.id] = this;
  };
  Marker.prototype.clear = function() { delete this.cm.marks[this.id] };
  Marker.prototype.find = function() { return toCmPos(this) };
  this.setBookmark = function(cursor, options) {
    var bm = new Marker(this, this.$uid++, cursor.line, cursor.ch);
    if (!options || !options.insertLeft)
      bm.$insertRight = true;
    this.marks[bm.id] = bm;
    return bm;
  };
  this.moveH = function(increment, unit) {
    if (unit == 'char') {
      var sel = this.ace.selection;
      sel.clearSelection();
      sel.moveCursorBy(0, increment);
    }
  };
  this.findPosV = function(start, amount, unit, goalColumn) {
    if (unit == 'page') {
      var renderer = this.ace.renderer;
      var config = renderer.layerConfig;
      amount = amount * Math.floor(config.height / config.lineHeight);
      unit = 'line';
    }
    if (unit == 'line') {
      var screenPos = this.ace.session.documentToScreenPosition(start.line, start.ch);
      if (goalColumn != null)
        screenPos.column = goalColumn;
      screenPos.row += amount;
      // not what codemirror does but vim mode needs only this
      screenPos.row = Math.min(Math.max(0, screenPos.row), this.ace.session.getScreenLength() - 1);
      var pos = this.ace.session.screenToDocumentPosition(screenPos.row, screenPos.column);
      return toCmPos(pos);
    } else {
      debugger;
    }
  };
  this.charCoords = function(pos, mode) {
    if (mode == 'div' || !mode) {
      var sc = this.ace.session.documentToScreenPosition(pos.line, pos.ch);
      return {left: sc.column, top: sc.row};
    }if (mode == 'local') {
      var renderer = this.ace.renderer;
      var sc = this.ace.session.documentToScreenPosition(pos.line, pos.ch);
      var lh = renderer.layerConfig.lineHeight;
      var cw = renderer.layerConfig.characterWidth;
      var top = lh * sc.row;
      return {left: sc.column * cw, top: top, bottom: top + lh};
    }
  };
  this.coordsChar = function(pos, mode) {
    var renderer = this.ace.renderer;
    if (mode == 'local') {
      var row = Math.max(0, Math.floor(pos.top / renderer.lineHeight));
      var col = Math.max(0, Math.floor(pos.left / renderer.characterWidth));
      var ch = renderer.session.screenToDocumentPosition(row, col);
      return toCmPos(ch);
    } else if (mode == 'div') {
      throw "not implemented";
    }
  };
  this.getSearchCursor = function(query, pos, caseFold) {
    var caseSensitive = false;
    var isRegexp = false;
    if (query instanceof RegExp && !query.global) {
      caseSensitive = !query.ignoreCase;
      query = query.source;
      isRegexp = true;
    }
    if (query == "\\n") { query = "\n"; isRegexp = false; }
    var search = new Search();
    if (pos.ch == undefined) pos.ch = Number.MAX_VALUE;
    var acePos = {row: pos.line, column: pos.ch};
    var cm = this;
    var last = null;
    return {
      findNext: function() { return this.find(false) },
      findPrevious: function() {return this.find(true) },
      find: function(back) {
        search.setOptions({
          needle: query,
          caseSensitive: caseSensitive,
          wrap: false,
          backwards: back,
          regExp: isRegexp,
          start: last || acePos
        });
        var range = search.find(cm.ace.session);
        last = range;
        return last && [!last.isEmpty()];
      },
      from: function() { return last && toCmPos(last.start) },
      to: function() { return last && toCmPos(last.end) },
      replace: function(text) {
        if (last) {
          last.end = cm.ace.session.doc.replace(last, text);
        }
      }
    };
  };
  this.scrollTo = function(x, y) {
    var renderer = this.ace.renderer;
    var config = renderer.layerConfig;
    var maxHeight = config.maxHeight;
    maxHeight -= (renderer.$size.scrollerHeight - renderer.lineHeight) * renderer.$scrollPastEnd;
    if (y != null) this.ace.session.setScrollTop(Math.max(0, Math.min(y, maxHeight)));
    if (x != null) this.ace.session.setScrollLeft(Math.max(0, Math.min(x, config.width)));
  };
  this.scrollInfo = function() { return 0; };
  this.scrollIntoView = function(pos, margin) {
    if (pos) {
      var renderer = this.ace.renderer;
      var viewMargin = { "top": 0, "bottom": margin };
      renderer.scrollCursorIntoView(toAcePos(pos),
        (renderer.lineHeight * 2) / renderer.$size.scrollerHeight, viewMargin);
    }
  };
  this.getLine = function(row) { return this.ace.session.getLine(row) };
  this.getRange = function(s, e) {
    return this.ace.session.getTextRange(new Range(s.line, s.ch, e.line, e.ch));
  };
  this.replaceRange = function(text, s, e) {
    if (!e) e = s;
    // workaround for session.replace not handling negative rows
    var range = new Range(s.line, s.ch, e.line, e.ch);
    this.ace.session.$clipRangeToDocument(range);
    return this.ace.session.replace(range, text);
  };
  this.replaceSelection =
  this.replaceSelections = function(p) {
    var strings = Array.isArray(p) && p;
    var sel = this.ace.selection;
    if (this.ace.inVirtualSelectionMode) {
      this.ace.session.replace(sel.getRange(), strings ? p[0] || "": p );
      return;
    }
    sel.inVirtualSelectionMode = true;
    var ranges = sel.rangeList.ranges;
    if (!ranges.length) ranges = [this.ace.multiSelect.getRange()];
    for (var i = ranges.length; i--;)
       this.ace.session.replace(ranges[i], strings ? p[i] || "" : p);
    sel.inVirtualSelectionMode = false;
  };
  this.getSelection = function() {
    return this.ace.getSelectedText();
  };
  this.getSelections = function() {
    return this.listSelections().map(function(x) {
      return this.getRange(x.anchor, x.head);
    }, this);
  };
  this.getInputField = function() {
    return this.ace.textInput.getElement();
  };
  this.getWrapperElement = function() {
    return this.ace.container;
  };
  var optMap = {
    indentWithTabs: "useSoftTabs",
    indentUnit: "tabSize",
    tabSize: "tabSize",
    firstLineNumber: "firstLineNumber",
    readOnly: "readOnly"
  };
  this.setOption = function(name, val) {
    this.state[name] = val;
    switch (name) {
      case 'indentWithTabs':
        name = optMap[name];
        val = !val;
      break;
      case 'keyMap':
        this.state.$keyMap = val;
        return;
      break;
      default:
        name = optMap[name];
    }
    if (name)
      this.ace.setOption(name, val);
  };
  this.getOption = function(name) {
    var val;
    var aceOpt = optMap[name];
    if (aceOpt)
      val = this.ace.getOption(aceOpt);
    switch (name) {
      case 'indentWithTabs':
        name = optMap[name];
        return !val;
      case 'keyMap':
        return this.state.$keyMap || 'vim';
    }
    return aceOpt ? val : this.state[name];
  };
  this.toggleOverwrite = function(on) {
    this.state.overwrite = on;
    return this.ace.setOverwrite(on);
  };
  this.addOverlay = function(o) {
    if (!this.$searchHighlight || !this.$searchHighlight.session) {
      var highlight = new SearchHighlight(null, "ace_highlight-marker", "text");
      var marker = this.ace.session.addDynamicMarker(highlight);
      highlight.id = marker.id;
      highlight.session = this.ace.session;
      highlight.destroy = function(o) {
        highlight.session.off("change", highlight.updateOnChange);
        highlight.session.off("changeEditor", highlight.destroy);
        highlight.session.removeMarker(highlight.id);
        highlight.session = null;
      };
      highlight.updateOnChange = function(delta) {
        var row = delta.start.row;
        if (row == delta.end.row) highlight.cache[row] = undefined;
        else highlight.cache.splice(row, highlight.cache.length);
      };
      highlight.session.on("changeEditor", highlight.destroy);
      highlight.session.on("change", highlight.updateOnChange);
    }
    var re = new RegExp(o.query.source, "gmi");
    this.$searchHighlight = o.highlight = highlight;
    this.$searchHighlight.setRegexp(re);
    this.ace.renderer.updateBackMarkers();
  };
  this.removeOverlay = function(o) {
    if (this.$searchHighlight && this.$searchHighlight.session) {
      this.$searchHighlight.destroy();
    }
  };
  this.getScrollInfo = function() {
    var renderer = this.ace.renderer;
    var config = renderer.layerConfig;
    return {
      left: renderer.scrollLeft,
      top: renderer.scrollTop,
      height: config.maxHeight,
      width: config.width,
      clientHeight: config.height,
      clientWidth: config.width
    };
  };
  this.getValue = function() {
    return this.ace.getValue();
  };
  this.setValue = function(v) {
    return this.ace.setValue(v, -1);
  };
  this.getTokenTypeAt = function(pos) {
    var token = this.ace.session.getTokenAt(pos.line, pos.ch);
    return token && /comment|string/.test(token.type) ? "string" : "";
  };
  this.findMatchingBracket = function(pos) {
    var m = this.ace.session.findMatchingBracket(toAcePos(pos));
    return {to: m && toCmPos(m)};
  };
  this.findMatchingTag = function (pos) {
    var m = this.ace.session.getMatchingTags(toAcePos(pos));
    if (!m) return;
    return {
      open: {
        from: toCmPos(m.openTag.start),
        to: toCmPos(m.openTag.end)
      },
      close: {
        from: toCmPos(m.closeTag.start),
        to: toCmPos(m.closeTag.end)
      }
    };
  };
  this.indentLine = function(line, method) {
    if (method === true)
        this.ace.session.indentRows(line, line, "\t");
    else if (method === false)
        this.ace.session.outdentRows(new Range(line, 0, line, 0));
  };
  this.indexFromPos = function(pos) {
    return this.ace.session.doc.positionToIndex(toAcePos(pos));
  };
  this.posFromIndex = function(index) {
    return toCmPos(this.ace.session.doc.indexToPosition(index));
  };
  this.focus = function(index) {
    return this.ace.textInput.focus();
  };
  this.blur = function(index) {
    return this.ace.blur();
  };
  this.defaultTextHeight = function(index) {
    return this.ace.renderer.layerConfig.lineHeight;
  };
  this.scanForBracket = function(pos, dir, _, options) {
    var re = options.bracketRegex.source;
    var tokenRe = /paren|text|operator|tag/;
    if (dir == 1) {
      var m = this.ace.session.$findClosingBracket(re.slice(1, 2), toAcePos(pos), tokenRe);
    } else {
      var m = this.ace.session.$findOpeningBracket(re.slice(-2, -1), {row: pos.line, column: pos.ch + 1}, tokenRe);
      if (!m && options.bracketRegex && options.bracketRegex.test(this.getLine(pos.line)[pos.ch - 1])) {
          m = {row: pos.line, column: pos.ch - 1};
      }
    }
    return m && {pos: toCmPos(m)};
  };
  this.refresh = function() {
    return this.ace.resize(true);
  };
  this.getMode = function() {
    return { name : this.getOption("mode") };
  };
  this.execCommand = function(name) {
    if (CodeMirror.commands.hasOwnProperty(name)) return CodeMirror.commands[name](this);
    if (name == "indentAuto") return this.ace.execCommand("autoindent");
    console.log(name + " is not implemented");
  };
  this.getLineNumber = function(handle) {
    var deltas = this.$lineHandleChanges;
    if (!deltas)
        return null;
    var row = handle.row;
    for (var i = 0; i < deltas.length; i++) {
        var delta = deltas[i];
        if (delta.start.row != delta.end.row) {
            if (delta.action[0] == "i") {
                if (delta.start.row < row)
                    row += delta.end.row - delta.start.row;
            }  else {
                if (delta.start.row < row) {
                    if (row < delta.end.row || row == delta.end.row && delta.start.column > 0) {
                        return null;
                    }
                    row -= delta.end.row - delta.start.row;
                }
            }
        }
    }
    return row;
  };
  this.getLineHandle = function(row) {
    if (!this.$lineHandleChanges)
      this.$lineHandleChanges = [];
    return {text: this.ace.session.getLine(row), row: row};
  };
  this.releaseLineHandles = function() {
    this.$lineHandleChanges = undefined;
  };
  this.getLastEditEnd = function() {
    var undoManager = this.ace.session.$undoManager;
    if (undoManager && undoManager.$lastDelta)
      return toCmPos(undoManager.$lastDelta.end);
  };
}).call(CodeMirror.prototype);
  function toAcePos(cmPos) {
    return {row: cmPos.line, column: cmPos.ch};
  }
  function toCmPos(acePos) {
    return new Pos(acePos.row, acePos.column);
  }

  var StringStream = CodeMirror.StringStream = function(string, tabSize) {
    this.pos = this.start = 0;
    this.string = string;
    this.tabSize = tabSize || 8;
    this.lastColumnPos = this.lastColumnValue = 0;
    this.lineStart = 0;
  };

  StringStream.prototype = {
    eol: function() {return this.pos >= this.string.length;},
    sol: function() {return this.pos == this.lineStart;},
    peek: function() {return this.string.charAt(this.pos) || undefined;},
    next: function() {
      if (this.pos < this.string.length)
        return this.string.charAt(this.pos++);
    },
    eat: function(match) {
      var ch = this.string.charAt(this.pos);
      if (typeof match == "string") var ok = ch == match;
      else var ok = ch && (match.test ? match.test(ch) : match(ch));
      if (ok) {++this.pos; return ch;}
    },
    eatWhile: function(match) {
      var start = this.pos;
      while (this.eat(match)){}
      return this.pos > start;
    },
    eatSpace: function() {
      var start = this.pos;
      while (/[\s\u00a0]/.test(this.string.charAt(this.pos))) ++this.pos;
      return this.pos > start;
    },
    skipToEnd: function() {this.pos = this.string.length;},
    skipTo: function(ch) {
      var found = this.string.indexOf(ch, this.pos);
      if (found > -1) {this.pos = found; return true;}
    },
    backUp: function(n) {this.pos -= n;},
    column: function() {
      throw "not implemented";
    },
    indentation: function() {
      throw "not implemented";
    },
    match: function(pattern, consume, caseInsensitive) {
      if (typeof pattern == "string") {
        var cased = function(str) {return caseInsensitive ? str.toLowerCase() : str;};
        var substr = this.string.substr(this.pos, pattern.length);
        if (cased(substr) == cased(pattern)) {
          if (consume !== false) this.pos += pattern.length;
          return true;
        }
      } else {
        var match = this.string.slice(this.pos).match(pattern);
        if (match && match.index > 0) return null;
        if (match && consume !== false) this.pos += match[0].length;
        return match;
      }
    },
    current: function(){return this.string.slice(this.start, this.pos);},
    hideFirstChars: function(n, inner) {
      this.lineStart += n;
      try { return inner(); }
      finally { this.lineStart -= n; }
    }
  };

// todo replace with showCommandLine
CodeMirror.defineExtension = function(name, fn) {
  CodeMirror.prototype[name] = fn;
};
domLib.importCssString(`.normal-mode .ace_cursor{
    border: none;
    background-color: rgba(255,0,0,0.5);
}
.normal-mode .ace_hidden-cursors .ace_cursor{
  background-color: transparent;
  border: 1px solid red;
  opacity: 0.7
}
.ace_dialog {
  position: absolute;
  left: 0; right: 0;
  background: inherit;
  z-index: 15;
  padding: .1em .8em;
  overflow: hidden;
  color: inherit;
}
.ace_dialog-top {
  border-bottom: 1px solid #444;
  top: 0;
}
.ace_dialog-bottom {
  border-top: 1px solid #444;
  bottom: 0;
}
.ace_dialog input {
  border: none;
  outline: none;
  background: transparent;
  width: 20em;
  color: inherit;
  font-family: monospace;
}`, "vimMode", false);
(function() {
  function dialogDiv(cm, template, bottom) {
    var wrap = cm.ace.container;
    var dialog;
    dialog = wrap.appendChild(document.createElement("div"));
    if (bottom)
      dialog.className = "ace_dialog ace_dialog-bottom";
    else
      dialog.className = "ace_dialog ace_dialog-top";

    if (typeof template == "string") {
      dialog.innerHTML = template;
    } else { // Assuming it's a detached DOM element.
      dialog.appendChild(template);
    }
    return dialog;
  }

  function closeNotification(cm, newVal) {
    if (cm.state.currentNotificationClose)
      cm.state.currentNotificationClose();
    cm.state.currentNotificationClose = newVal;
  }

  CodeMirror.defineExtension("openDialog", function(template, callback, options) {
    if (this.virtualSelectionMode()) return;
    if (!options) options = {};

    closeNotification(this, null);

    var dialog = dialogDiv(this, template, options.bottom);
    var closed = false, me = this;
    this.state.dialog = dialog;
    function close(newVal) {
      if (typeof newVal == 'string') {
        inp.value = newVal;
      } else {
        if (closed) return;

        if (newVal && newVal.type == "blur") {
          if (document.activeElement === inp)
            return;
        }

        if (me.state.dialog == dialog) {
          me.state.dialog = null;
          me.focus();
        }
        closed = true;
        dialog.remove();

        if (options.onClose) options.onClose(dialog);

        // ace_patch{
        var cm = me;
        if (cm.state.vim) {
          cm.state.vim.status = null;
          cm.ace._signal("changeStatus");
          cm.ace.renderer.$loop.schedule(cm.ace.renderer.CHANGE_CURSOR);
        }
        // ace_patch}
      }
    }

    var inp = dialog.getElementsByTagName("input")[0], button;
    if (inp) {
      if (options.value) {
        inp.value = options.value;
        if (options.selectValueOnOpen !== false) inp.select();
      }

      if (options.onInput)
        CodeMirror.on(inp, "input", function(e) { options.onInput(e, inp.value, close);});
      if (options.onKeyUp)
        CodeMirror.on(inp, "keyup", function(e) {options.onKeyUp(e, inp.value, close);});

      CodeMirror.on(inp, "keydown", function(e) {
        if (options && options.onKeyDown && options.onKeyDown(e, inp.value, close)) { return; }
        if (e.keyCode == 13) callback(inp.value);
        if (e.keyCode == 27 || (options.closeOnEnter !== false && e.keyCode == 13)) {
          CodeMirror.e_stop(e);
          close();
        }
      });

      if (options.closeOnBlur !== false) CodeMirror.on(inp, "blur", close);

      inp.focus();
    } else if (button = dialog.getElementsByTagName("button")[0]) {
      CodeMirror.on(button, "click", function() {
        close();
        me.focus();
      });

      if (options.closeOnBlur !== false) CodeMirror.on(button, "blur", close);

      button.focus();
    }
    return close;
  });

  CodeMirror.defineExtension("openNotification", function(template, options) {
    if (this.virtualSelectionMode()) return;
    closeNotification(this, close);
    var dialog = dialogDiv(this, template, options && options.bottom);
    var closed = false, doneTimer;
    var duration = options && typeof options.duration !== "undefined" ? options.duration : 5000;

    function close() {
      if (closed) return;
      closed = true;
      clearTimeout(doneTimer);
      dialog.remove();
    }

    CodeMirror.on(dialog, 'click', function(e) {
      CodeMirror.e_preventDefault(e);
      close();
    });

    if (duration)
      doneTimer = setTimeout(close, duration);

    return close;
  });
})();


  var Pos = CodeMirror.Pos;

  function updateSelectionForSurrogateCharacters(cm, curStart, curEnd) {
    // start and character position when no selection 
    // is the same in visual mode, and differs in 1 character in normal mode
    if (curStart.line === curEnd.line && curStart.ch >= curEnd.ch - 1) {
      var text = cm.getLine(curStart.line);
      var charCode = text.charCodeAt(curStart.ch);
      if (0xD800 <= charCode && charCode <= 0xD8FF) {
        curEnd.ch += 1;
      }
    }

    return {start: curStart, end: curEnd};
  }

  var defaultKeymap = [
    // Key to key mapping. This goes first to make it possible to override
    // existing mappings.
    { keys: '<Left>', type: 'keyToKey', toKeys: 'h' },
    { keys: '<Right>', type: 'keyToKey', toKeys: 'l' },
    { keys: '<Up>', type: 'keyToKey', toKeys: 'k' },
    { keys: '<Down>', type: 'keyToKey', toKeys: 'j' },
    { keys: 'g<Up>', type: 'keyToKey', toKeys: 'gk' },
    { keys: 'g<Down>', type: 'keyToKey', toKeys: 'gj' },
    { keys: '<Space>', type: 'keyToKey', toKeys: 'l' },
    { keys: '<BS>', type: 'keyToKey', toKeys: 'h'},
    { keys: '<Del>', type: 'keyToKey', toKeys: 'x' },
    { keys: '<C-Space>', type: 'keyToKey', toKeys: 'W' },
    { keys: '<C-BS>', type: 'keyToKey', toKeys: 'B' },
    { keys: '<S-Space>', type: 'keyToKey', toKeys: 'w' },
    { keys: '<S-BS>', type: 'keyToKey', toKeys: 'b' },
    { keys: '<C-n>', type: 'keyToKey', toKeys: 'j' },
    { keys: '<C-p>', type: 'keyToKey', toKeys: 'k' },
    { keys: '<C-[>', type: 'keyToKey', toKeys: '<Esc>' },
    { keys: '<C-c>', type: 'keyToKey', toKeys: '<Esc>' },
    { keys: '<C-[>', type: 'keyToKey', toKeys: '<Esc>', context: 'insert' },
    { keys: '<C-c>', type: 'keyToKey', toKeys: '<Esc>', context: 'insert' },
    { keys: '<C-Esc>', type: 'keyToKey', toKeys: '<Esc>' }, // ipad keyboard sends C-Esc instead of C-[
    { keys: '<C-Esc>', type: 'keyToKey', toKeys: '<Esc>', context: 'insert' },
    { keys: 's', type: 'keyToKey', toKeys: 'cl', context: 'normal' },
    { keys: 's', type: 'keyToKey', toKeys: 'c', context: 'visual'},
    { keys: 'S', type: 'keyToKey', toKeys: 'cc', context: 'normal' },
    { keys: 'S', type: 'keyToKey', toKeys: 'VdO', context: 'visual' },
    { keys: '<Home>', type: 'keyToKey', toKeys: '0' },
    { keys: '<End>', type: 'keyToKey', toKeys: '$' },
    { keys: '<PageUp>', type: 'keyToKey', toKeys: '<C-b>' },
    { keys: '<PageDown>', type: 'keyToKey', toKeys: '<C-f>' },
    { keys: '<CR>', type: 'keyToKey', toKeys: 'j^', context: 'normal' },
    { keys: '<Ins>', type: 'keyToKey', toKeys: 'i', context: 'normal'},
    { keys: '<Ins>', type: 'action', action: 'toggleOverwrite', context: 'insert' },
    // Motions
    { keys: 'H', type: 'motion', motion: 'moveToTopLine', motionArgs: { linewise: true, toJumplist: true }},
    { keys: 'M', type: 'motion', motion: 'moveToMiddleLine', motionArgs: { linewise: true, toJumplist: true }},
    { keys: 'L', type: 'motion', motion: 'moveToBottomLine', motionArgs: { linewise: true, toJumplist: true }},
    { keys: 'h', type: 'motion', motion: 'moveByCharacters', motionArgs: { forward: false }},
    { keys: 'l', type: 'motion', motion: 'moveByCharacters', motionArgs: { forward: true }},
    { keys: 'j', type: 'motion', motion: 'moveByLines', motionArgs: { forward: true, linewise: true }},
    { keys: 'k', type: 'motion', motion: 'moveByLines', motionArgs: { forward: false, linewise: true }},
    { keys: 'gj', type: 'motion', motion: 'moveByDisplayLines', motionArgs: { forward: true }},
    { keys: 'gk', type: 'motion', motion: 'moveByDisplayLines', motionArgs: { forward: false }},
    { keys: 'w', type: 'motion', motion: 'moveByWords', motionArgs: { forward: true, wordEnd: false }},
    { keys: 'W', type: 'motion', motion: 'moveByWords', motionArgs: { forward: true, wordEnd: false, bigWord: true }},
    { keys: 'e', type: 'motion', motion: 'moveByWords', motionArgs: { forward: true, wordEnd: true, inclusive: true }},
    { keys: 'E', type: 'motion', motion: 'moveByWords', motionArgs: { forward: true, wordEnd: true, bigWord: true, inclusive: true }},
    { keys: 'b', type: 'motion', motion: 'moveByWords', motionArgs: { forward: false, wordEnd: false }},
    { keys: 'B', type: 'motion', motion: 'moveByWords', motionArgs: { forward: false, wordEnd: false, bigWord: true }},
    { keys: 'ge', type: 'motion', motion: 'moveByWords', motionArgs: { forward: false, wordEnd: true, inclusive: true }},
    { keys: 'gE', type: 'motion', motion: 'moveByWords', motionArgs: { forward: false, wordEnd: true, bigWord: true, inclusive: true }},
    { keys: '{', type: 'motion', motion: 'moveByParagraph', motionArgs: { forward: false, toJumplist: true }},
    { keys: '}', type: 'motion', motion: 'moveByParagraph', motionArgs: { forward: true, toJumplist: true }},
    { keys: '(', type: 'motion', motion: 'moveBySentence', motionArgs: { forward: false }},
    { keys: ')', type: 'motion', motion: 'moveBySentence', motionArgs: { forward: true }},
    { keys: '<C-f>', type: 'motion', motion: 'moveByPage', motionArgs: { forward: true }},
    { keys: '<C-b>', type: 'motion', motion: 'moveByPage', motionArgs: { forward: false }},
    { keys: '<C-d>', type: 'motion', motion: 'moveByScroll', motionArgs: { forward: true, explicitRepeat: true }},
    { keys: '<C-u>', type: 'motion', motion: 'moveByScroll', motionArgs: { forward: false, explicitRepeat: true }},
    { keys: 'gg', type: 'motion', motion: 'moveToLineOrEdgeOfDocument', motionArgs: { forward: false, explicitRepeat: true, linewise: true, toJumplist: true }},
    { keys: 'G', type: 'motion', motion: 'moveToLineOrEdgeOfDocument', motionArgs: { forward: true, explicitRepeat: true, linewise: true, toJumplist: true }},
    {keys: "g$", type: "motion", motion: "moveToEndOfDisplayLine"},
    {keys: "g^", type: "motion", motion: "moveToStartOfDisplayLine"},
    {keys: "g0", type: "motion", motion: "moveToStartOfDisplayLine"},
    { keys: '0', type: 'motion', motion: 'moveToStartOfLine' },
    { keys: '^', type: 'motion', motion: 'moveToFirstNonWhiteSpaceCharacter' },
    { keys: '+', type: 'motion', motion: 'moveByLines', motionArgs: { forward: true, toFirstChar:true }},
    { keys: '-', type: 'motion', motion: 'moveByLines', motionArgs: { forward: false, toFirstChar:true }},
    { keys: '_', type: 'motion', motion: 'moveByLines', motionArgs: { forward: true, toFirstChar:true, repeatOffset:-1 }},
    { keys: '$', type: 'motion', motion: 'moveToEol', motionArgs: { inclusive: true }},
    { keys: '%', type: 'motion', motion: 'moveToMatchedSymbol', motionArgs: { inclusive: true, toJumplist: true }},
    { keys: 'f<character>', type: 'motion', motion: 'moveToCharacter', motionArgs: { forward: true , inclusive: true }},
    { keys: 'F<character>', type: 'motion', motion: 'moveToCharacter', motionArgs: { forward: false }},
    { keys: 't<character>', type: 'motion', motion: 'moveTillCharacter', motionArgs: { forward: true, inclusive: true }},
    { keys: 'T<character>', type: 'motion', motion: 'moveTillCharacter', motionArgs: { forward: false }},
    { keys: ';', type: 'motion', motion: 'repeatLastCharacterSearch', motionArgs: { forward: true }},
    { keys: ',', type: 'motion', motion: 'repeatLastCharacterSearch', motionArgs: { forward: false }},
    { keys: '\'<register>', type: 'motion', motion: 'goToMark', motionArgs: {toJumplist: true, linewise: true}},
    { keys: '`<register>', type: 'motion', motion: 'goToMark', motionArgs: {toJumplist: true}},
    { keys: ']`', type: 'motion', motion: 'jumpToMark', motionArgs: { forward: true } },
    { keys: '[`', type: 'motion', motion: 'jumpToMark', motionArgs: { forward: false } },
    { keys: ']\'', type: 'motion', motion: 'jumpToMark', motionArgs: { forward: true, linewise: true } },
    { keys: '[\'', type: 'motion', motion: 'jumpToMark', motionArgs: { forward: false, linewise: true } },
    // the next two aren't motions but must come before more general motion declarations
    { keys: ']p', type: 'action', action: 'paste', isEdit: true, actionArgs: { after: true, isEdit: true, matchIndent: true}},
    { keys: '[p', type: 'action', action: 'paste', isEdit: true, actionArgs: { after: false, isEdit: true, matchIndent: true}},
    { keys: ']<character>', type: 'motion', motion: 'moveToSymbol', motionArgs: { forward: true, toJumplist: true}},
    { keys: '[<character>', type: 'motion', motion: 'moveToSymbol', motionArgs: { forward: false, toJumplist: true}},
    { keys: '|', type: 'motion', motion: 'moveToColumn'},
    { keys: 'o', type: 'motion', motion: 'moveToOtherHighlightedEnd', context:'visual'},
    { keys: 'O', type: 'motion', motion: 'moveToOtherHighlightedEnd', motionArgs: {sameLine: true}, context:'visual'},
    // Operators
    { keys: 'd', type: 'operator', operator: 'delete' },
    { keys: 'y', type: 'operator', operator: 'yank' },
    { keys: 'c', type: 'operator', operator: 'change' },
    { keys: '=', type: 'operator', operator: 'indentAuto' },
    { keys: '>', type: 'operator', operator: 'indent', operatorArgs: { indentRight: true }},
    { keys: '<', type: 'operator', operator: 'indent', operatorArgs: { indentRight: false }},
    { keys: 'g~', type: 'operator', operator: 'changeCase' },
    { keys: 'gu', type: 'operator', operator: 'changeCase', operatorArgs: {toLower: true}, isEdit: true },
    { keys: 'gU', type: 'operator', operator: 'changeCase', operatorArgs: {toLower: false}, isEdit: true },
    { keys: 'n', type: 'motion', motion: 'findNext', motionArgs: { forward: true, toJumplist: true }},
    { keys: 'N', type: 'motion', motion: 'findNext', motionArgs: { forward: false, toJumplist: true }},
    { keys: 'gn', type: 'motion', motion: 'findAndSelectNextInclusive', motionArgs: { forward: true }},
    { keys: 'gN', type: 'motion', motion: 'findAndSelectNextInclusive', motionArgs: { forward: false }},
    { keys: 'gq', type: 'operator', operator: 'hardWrap' },
    { keys: 'gw', type: 'operator', operator: 'hardWrap', operatorArgs: {keepCursor: true}},
    // Operator-Motion dual commands
    { keys: 'x', type: 'operatorMotion', operator: 'delete', motion: 'moveByCharacters', motionArgs: { forward: true }, operatorMotionArgs: { visualLine: false }},
    { keys: 'X', type: 'operatorMotion', operator: 'delete', motion: 'moveByCharacters', motionArgs: { forward: false }, operatorMotionArgs: { visualLine: true }},
    { keys: 'D', type: 'operatorMotion', operator: 'delete', motion: 'moveToEol', motionArgs: { inclusive: true }, context: 'normal'},
    { keys: 'D', type: 'operator', operator: 'delete', operatorArgs: { linewise: true }, context: 'visual'},
    { keys: 'Y', type: 'operatorMotion', operator: 'yank', motion: 'expandToLine', motionArgs: { linewise: true }, context: 'normal'},
    { keys: 'Y', type: 'operator', operator: 'yank', operatorArgs: { linewise: true }, context: 'visual'},
    { keys: 'C', type: 'operatorMotion', operator: 'change', motion: 'moveToEol', motionArgs: { inclusive: true }, context: 'normal'},
    { keys: 'C', type: 'operator', operator: 'change', operatorArgs: { linewise: true }, context: 'visual'},
    { keys: '~', type: 'operatorMotion', operator: 'changeCase', motion: 'moveByCharacters', motionArgs: { forward: true }, operatorArgs: { shouldMoveCursor: true }, context: 'normal'},
    { keys: '~', type: 'operator', operator: 'changeCase', context: 'visual'},
    { keys: '<C-u>', type: 'operatorMotion', operator: 'delete', motion: 'moveToStartOfLine', context: 'insert' },
    { keys: '<C-w>', type: 'operatorMotion', operator: 'delete', motion: 'moveByWords', motionArgs: { forward: false, wordEnd: false }, context: 'insert' },
    //ignore C-w in normal mode
    { keys: '<C-w>', type: 'idle', context: 'normal' },
    // Actions
    { keys: '<C-i>', type: 'action', action: 'jumpListWalk', actionArgs: { forward: true }},
    { keys: '<C-o>', type: 'action', action: 'jumpListWalk', actionArgs: { forward: false }},
    { keys: '<C-e>', type: 'action', action: 'scroll', actionArgs: { forward: true, linewise: true }},
    { keys: '<C-y>', type: 'action', action: 'scroll', actionArgs: { forward: false, linewise: true }},
    { keys: 'a', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { insertAt: 'charAfter' }, context: 'normal' },
    { keys: 'A', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { insertAt: 'eol' }, context: 'normal' },
    { keys: 'A', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { insertAt: 'endOfSelectedArea' }, context: 'visual' },
    { keys: 'i', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { insertAt: 'inplace' }, context: 'normal' },
    { keys: 'gi', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { insertAt: 'lastEdit' }, context: 'normal' },
    { keys: 'I', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { insertAt: 'firstNonBlank'}, context: 'normal' },
    { keys: 'gI', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { insertAt: 'bol'}, context: 'normal' },
    { keys: 'I', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { insertAt: 'startOfSelectedArea' }, context: 'visual' },
    { keys: 'o', type: 'action', action: 'newLineAndEnterInsertMode', isEdit: true, interlaceInsertRepeat: true, actionArgs: { after: true }, context: 'normal' },
    { keys: 'O', type: 'action', action: 'newLineAndEnterInsertMode', isEdit: true, interlaceInsertRepeat: true, actionArgs: { after: false }, context: 'normal' },
    { keys: 'v', type: 'action', action: 'toggleVisualMode' },
    { keys: 'V', type: 'action', action: 'toggleVisualMode', actionArgs: { linewise: true }},
    { keys: '<C-v>', type: 'action', action: 'toggleVisualMode', actionArgs: { blockwise: true }},
    { keys: '<C-q>', type: 'action', action: 'toggleVisualMode', actionArgs: { blockwise: true }},
    { keys: 'gv', type: 'action', action: 'reselectLastSelection' },
    { keys: 'J', type: 'action', action: 'joinLines', isEdit: true },
    { keys: 'gJ', type: 'action', action: 'joinLines', actionArgs: { keepSpaces: true }, isEdit: true },
    { keys: 'p', type: 'action', action: 'paste', isEdit: true, actionArgs: { after: true, isEdit: true }},
    { keys: 'P', type: 'action', action: 'paste', isEdit: true, actionArgs: { after: false, isEdit: true }},
    { keys: 'r<character>', type: 'action', action: 'replace', isEdit: true },
    { keys: '@<register>', type: 'action', action: 'replayMacro' },
    { keys: 'q<register>', type: 'action', action: 'enterMacroRecordMode' },
    // Handle Replace-mode as a special case of insert mode.
    { keys: 'R', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { replace: true }, context: 'normal'},
    { keys: 'R', type: 'operator', operator: 'change', operatorArgs: { linewise: true, fullLine: true }, context: 'visual', exitVisualBlock: true},
    { keys: 'u', type: 'action', action: 'undo', context: 'normal' },
    { keys: 'u', type: 'operator', operator: 'changeCase', operatorArgs: {toLower: true}, context: 'visual', isEdit: true },
    { keys: 'U', type: 'operator', operator: 'changeCase', operatorArgs: {toLower: false}, context: 'visual', isEdit: true },
    { keys: '<C-r>', type: 'action', action: 'redo' },
    { keys: 'm<register>', type: 'action', action: 'setMark' },
    { keys: '"<register>', type: 'action', action: 'setRegister' },
    { keys: '<C-r><register>', type: 'action', action: 'insertRegister', context: 'insert', isEdit: true },
    { keys: '<C-o>', type: 'action', action: 'oneNormalCommand', context: 'insert' },
    { keys: 'zz', type: 'action', action: 'scrollToCursor', actionArgs: { position: 'center' }},
    { keys: 'z.', type: 'action', action: 'scrollToCursor', actionArgs: { position: 'center' }, motion: 'moveToFirstNonWhiteSpaceCharacter' },
    { keys: 'zt', type: 'action', action: 'scrollToCursor', actionArgs: { position: 'top' }},
    { keys: 'z<CR>', type: 'action', action: 'scrollToCursor', actionArgs: { position: 'top' }, motion: 'moveToFirstNonWhiteSpaceCharacter' },
    { keys: 'zb', type: 'action', action: 'scrollToCursor', actionArgs: { position: 'bottom' }},
    { keys: 'z-', type: 'action', action: 'scrollToCursor', actionArgs: { position: 'bottom' }, motion: 'moveToFirstNonWhiteSpaceCharacter' },
    { keys: '.', type: 'action', action: 'repeatLastEdit' },
    { keys: '<C-a>', type: 'action', action: 'incrementNumberToken', isEdit: true, actionArgs: {increase: true, backtrack: false}},
    { keys: '<C-x>', type: 'action', action: 'incrementNumberToken', isEdit: true, actionArgs: {increase: false, backtrack: false}},
    { keys: '<C-t>', type: 'action', action: 'indent', actionArgs: { indentRight: true }, context: 'insert' },
    { keys: '<C-d>', type: 'action', action: 'indent', actionArgs: { indentRight: false }, context: 'insert' },
    // Text object motions
    { keys: 'a<register>', type: 'motion', motion: 'textObjectManipulation' },
    { keys: 'i<register>', type: 'motion', motion: 'textObjectManipulation', motionArgs: { textObjectInner: true }},
    // Search
    { keys: '/', type: 'search', searchArgs: { forward: true, querySrc: 'prompt', toJumplist: true }},
    { keys: '?', type: 'search', searchArgs: { forward: false, querySrc: 'prompt', toJumplist: true }},
    { keys: '*', type: 'search', searchArgs: { forward: true, querySrc: 'wordUnderCursor', wholeWordOnly: true, toJumplist: true }},
    { keys: '#', type: 'search', searchArgs: { forward: false, querySrc: 'wordUnderCursor', wholeWordOnly: true, toJumplist: true }},
    { keys: 'g*', type: 'search', searchArgs: { forward: true, querySrc: 'wordUnderCursor', toJumplist: true }},
    { keys: 'g#', type: 'search', searchArgs: { forward: false, querySrc: 'wordUnderCursor', toJumplist: true }},
    // Ex command
    { keys: ':', type: 'ex' }
  ];
  var defaultKeymapLength = defaultKeymap.length;

  /**
   * Ex commands
   * Care must be taken when adding to the default Ex command map. For any
   * pair of commands that have a shared prefix, at least one of their
   * shortNames must not match the prefix of the other command.
   */
  var defaultExCommandMap = [
    { name: 'colorscheme', shortName: 'colo' },
    { name: 'map' },
    { name: 'imap', shortName: 'im' },
    { name: 'nmap', shortName: 'nm' },
    { name: 'vmap', shortName: 'vm' },
    { name: 'omap', shortName: 'om' },
    { name: 'noremap', shortName: 'no' },
    { name: 'nnoremap', shortName: 'nn' },
    { name: 'vnoremap', shortName: 'vn' },
    { name: 'inoremap', shortName: 'ino' },
    { name: 'onoremap', shortName: 'ono' },
    { name: 'unmap' },
    { name: 'mapclear', shortName: 'mapc' },
    { name: 'nmapclear', shortName: 'nmapc' },
    { name: 'vmapclear', shortName: 'vmapc' },
    { name: 'imapclear', shortName: 'imapc' },
    { name: 'omapclear', shortName: 'omapc' },
    { name: 'write', shortName: 'w' },
    { name: 'undo', shortName: 'u' },
    { name: 'redo', shortName: 'red' },
    { name: 'set', shortName: 'se' },
    { name: 'setlocal', shortName: 'setl' },
    { name: 'setglobal', shortName: 'setg' },
    { name: 'sort', shortName: 'sor' },
    { name: 'substitute', shortName: 's', possiblyAsync: true },
    { name: 'startinsert', shortName: 'start' },
    { name: 'nohlsearch', shortName: 'noh' },
    { name: 'yank', shortName: 'y' },
    { name: 'delmarks', shortName: 'delm' },
    { name: 'registers', shortName: 'reg', excludeFromCommandHistory: true },
    { name: 'vglobal', shortName: 'v' },
    { name: 'delete', shortName: 'd' },
    { name: 'join', shortName: 'j' },
    { name: 'normal', shortName: 'norm' },
    { name: 'global', shortName: 'g' }
  ];

  /**
   * Langmap
   * Determines how to interpret keystrokes in Normal and Visual mode.
   * Useful for people who use a different keyboard layout than QWERTY
   */
  var langmap = parseLangmap('');

    function enterVimMode(cm) {
      cm.setOption('disableInput', true);
      cm.setOption('showCursorWhenSelecting', false);
      CodeMirror.signal(cm, "vim-mode-change", {mode: "normal"});
      cm.on('cursorActivity', onCursorActivity);
      maybeInitVimState(cm);
      CodeMirror.on(cm.getInputField(), 'paste', getOnPasteFn(cm));
    }

    function leaveVimMode(cm) {
      cm.setOption('disableInput', false);
      cm.off('cursorActivity', onCursorActivity);
      CodeMirror.off(cm.getInputField(), 'paste', getOnPasteFn(cm));
      cm.state.vim = null;
      if (highlightTimeout) clearTimeout(highlightTimeout);
    }

    function getOnPasteFn(cm) {
      var vim = cm.state.vim;
      if (!vim.onPasteFn) {
        vim.onPasteFn = function() {
          if (!vim.insertMode) {
            cm.setCursor(offsetCursor(cm.getCursor(), 0, 1));
            actions.enterInsertMode(cm, {}, vim);
          }
        };
      }
      return vim.onPasteFn;
    }

    var numberRegex = /[\d]/;
    var wordCharTest = [CodeMirror.isWordChar, function(ch) {
      return ch && !CodeMirror.isWordChar(ch) && !/\s/.test(ch);
    }], bigWordCharTest = [function(ch) {
      return /\S/.test(ch);
    }];
    var validMarks = ['<', '>'];
    var validRegisters = ['-', '"', '.', ':', '_', '/', '+'];
    var latinCharRegex = /^\w$/
    var upperCaseChars;
    try { upperCaseChars = new RegExp("^[\\p{Lu}]$", "u"); }
    catch (_) { upperCaseChars = /^[A-Z]$/; }

    function isLine(cm, line) {
      return line >= cm.firstLine() && line <= cm.lastLine();
    }
    function isLowerCase(k) {
      return (/^[a-z]$/).test(k);
    }
    function isMatchableSymbol(k) {
      return '()[]{}'.indexOf(k) != -1;
    }
    function isNumber(k) {
      return numberRegex.test(k);
    }
    function isUpperCase(k) {
      return upperCaseChars.test(k);
    }
    function isWhiteSpaceString(k) {
      return (/^\s*$/).test(k);
    }
    function isEndOfSentenceSymbol(k) {
      return '.?!'.indexOf(k) != -1;
    }
    function inArray(val, arr) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          return true;
        }
      }
      return false;
    }

    var options = {};
    function defineOption(name, defaultValue, type, aliases, callback) {
      if (defaultValue === undefined && !callback) {
        throw Error('defaultValue is required unless callback is provided');
      }
      if (!type) { type = 'string'; }
      options[name] = {
        type: type,
        defaultValue: defaultValue,
        callback: callback
      };
      if (aliases) {
        for (var i = 0; i < aliases.length; i++) {
          options[aliases[i]] = options[name];
        }
      }
      if (defaultValue) {
        setOption(name, defaultValue);
      }
    }

    function setOption(name, value, cm, cfg) {
      var option = options[name];
      cfg = cfg || {};
      var scope = cfg.scope;
      if (!option) {
        return new Error('Unknown option: ' + name);
      }
      if (option.type == 'boolean') {
        if (value && value !== true) {
          return new Error('Invalid argument: ' + name + '=' + value);
        } else if (value !== false) {
          // Boolean options are set to true if value is not defined.
          value = true;
        }
      }
      if (option.callback) {
        if (scope !== 'local') {
          option.callback(value, undefined);
        }
        if (scope !== 'global' && cm) {
          option.callback(value, cm);
        }
      } else {
        if (scope !== 'local') {
          option.value = option.type == 'boolean' ? !!value : value;
        }
        if (scope !== 'global' && cm) {
          cm.state.vim.options[name] = {value: value};
        }
      }
    }

    function getOption(name, cm, cfg) {
      var option = options[name];
      cfg = cfg || {};
      var scope = cfg.scope;
      if (!option) {
        return new Error('Unknown option: ' + name);
      }
      if (option.callback) {
        var local = cm && option.callback(undefined, cm);
        if (scope !== 'global' && local !== undefined) {
          return local;
        }
        if (scope !== 'local') {
          return option.callback();
        }
        return;
      } else {
        var local = (scope !== 'global') && (cm && cm.state.vim.options[name]);
        return (local || (scope !== 'local') && option || {}).value;
      }
    }

    defineOption('filetype', undefined, 'string', ['ft'], function(name, cm) {
      // Option is local. Do nothing for global.
      if (cm === undefined) {
        return;
      }
      // The 'filetype' option proxies to the CodeMirror 'mode' option.
      if (name === undefined) {
        var mode = cm.getOption('mode');
        return mode == 'null' ? '' : mode;
      } else {
        var mode = name == '' ? 'null' : name;
        cm.setOption('mode', mode);
      }
    });
    defineOption('textwidth', 80, 'number', ['tw'], function(width, cm) {
      // Option is local. Do nothing for global.
      if (cm === undefined) {
        return;
      }
      // The 'filetype' option proxies to the CodeMirror 'mode' option.
      if (width === undefined) {
        var value = cm.getOption('textwidth');
        return value;
      } else {
        var column = Math.round(width);
        if (column > 1) {
          cm.setOption('textwidth', column);
        }
      }
    });

    var createCircularJumpList = function() {
      var size = 100;
      var pointer = -1;
      var head = 0;
      var tail = 0;
      var buffer = new Array(size);
      function add(cm, oldCur, newCur) {
        var current = pointer % size;
        var curMark = buffer[current];
        function useNextSlot(cursor) {
          var next = ++pointer % size;
          var trashMark = buffer[next];
          if (trashMark) {
            trashMark.clear();
          }
          buffer[next] = cm.setBookmark(cursor);
        }
        if (curMark) {
          var markPos = curMark.find();
          // avoid recording redundant cursor position
          if (markPos && !cursorEqual(markPos, oldCur)) {
            useNextSlot(oldCur);
          }
        } else {
          useNextSlot(oldCur);
        }
        useNextSlot(newCur);
        head = pointer;
        tail = pointer - size + 1;
        if (tail < 0) {
          tail = 0;
        }
      }
      function move(cm, offset) {
        pointer += offset;
        if (pointer > head) {
          pointer = head;
        } else if (pointer < tail) {
          pointer = tail;
        }
        var mark = buffer[(size + pointer) % size];
        // skip marks that are temporarily removed from text buffer
        if (mark && !mark.find()) {
          var inc = offset > 0 ? 1 : -1;
          var newCur;
          var oldCur = cm.getCursor();
          do {
            pointer += inc;
            mark = buffer[(size + pointer) % size];
            // skip marks that are the same as current position
            if (mark &&
                (newCur = mark.find()) &&
                !cursorEqual(oldCur, newCur)) {
              break;
            }
          } while (pointer < head && pointer > tail);
        }
        return mark;
      }
      function find(cm, offset) {
        var oldPointer = pointer;
        var mark = move(cm, offset);
        pointer = oldPointer;
        return mark && mark.find();
      }
      return {
        cachedCursor: undefined, //used for # and * jumps
        add: add,
        find: find,
        move: move
      };
    };

    // Returns an object to track the changes associated insert mode.  It
    // clones the object that is passed in, or creates an empty object one if
    // none is provided.
    var createInsertModeChanges = function(c) {
      if (c) {
        // Copy construction
        return {
          changes: c.changes,
          expectCursorActivityForChange: c.expectCursorActivityForChange
        };
      }
      return {
        // Change list
        changes: [],
        // Set to true on change, false on cursorActivity.
        expectCursorActivityForChange: false
      };
    };

    function MacroModeState() {
      this.latestRegister = undefined;
      this.isPlaying = false;
      this.isRecording = false;
      this.replaySearchQueries = [];
      this.onRecordingDone = undefined;
      this.lastInsertModeChanges = createInsertModeChanges();
    }
    MacroModeState.prototype = {
      exitMacroRecordMode: function() {
        var macroModeState = vimGlobalState.macroModeState;
        if (macroModeState.onRecordingDone) {
          macroModeState.onRecordingDone(); // close dialog
        }
        macroModeState.onRecordingDone = undefined;
        macroModeState.isRecording = false;
      },
      enterMacroRecordMode: function(cm, registerName) {
        var register =
            vimGlobalState.registerController.getRegister(registerName);
        if (register) {
          register.clear();
          this.latestRegister = registerName;
          if (cm.openDialog) {
            var template = dom('span', {class: 'cm-vim-message'}, 'recording @' + registerName);
            this.onRecordingDone = cm.openDialog(template, null, {bottom:true});
          }
          this.isRecording = true;
        }
      }
    };

    function maybeInitVimState(cm) {
      if (!cm.state.vim) {
        // Store instance state in the CodeMirror object.
        cm.state.vim = {
          inputState: new InputState(),
          // Vim's input state that triggered the last edit, used to repeat
          // motions and operators with '.'.
          lastEditInputState: undefined,
          // Vim's action command before the last edit, used to repeat actions
          // with '.' and insert mode repeat.
          lastEditActionCommand: undefined,
          // When using jk for navigation, if you move from a longer line to a
          // shorter line, the cursor may clip to the end of the shorter line.
          // If j is pressed again and cursor goes to the next line, the
          // cursor should go back to its horizontal position on the longer
          // line if it can. This is to keep track of the horizontal position.
          lastHPos: -1,
          // Doing the same with screen-position for gj/gk
          lastHSPos: -1,
          // The last motion command run. Cleared if a non-motion command gets
          // executed in between.
          lastMotion: null,
          marks: {},
          insertMode: false,
          insertModeReturn: false,
          // Repeat count for changes made in insert mode, triggered by key
          // sequences like 3,i. Only exists when insertMode is true.
          insertModeRepeat: undefined,
          visualMode: false,
          // If we are in visual line mode. No effect if visualMode is false.
          visualLine: false,
          visualBlock: false,
          lastSelection: null,
          lastPastedText: null,
          sel: {},
          // Buffer-local/window-local values of vim options.
          options: {},
          // Whether the next character should be interpreted literally
          // Necassary for correct implementation of f<character>, r<character> etc.
          // in terms of langmaps.
          expectLiteralNext: false
        };
      }
      return cm.state.vim;
    }
    var vimGlobalState;
    function resetVimGlobalState() {
      vimGlobalState = {
        // The current search query.
        searchQuery: null,
        // Whether we are searching backwards.
        searchIsReversed: false,
        // Replace part of the last substituted pattern
        lastSubstituteReplacePart: undefined,
        jumpList: createCircularJumpList(),
        macroModeState: new MacroModeState,
        // Recording latest f, t, F or T motion command.
        lastCharacterSearch: {increment:0, forward:true, selectedCharacter:''},
        registerController: new RegisterController({}),
        // search history buffer
        searchHistoryController: new HistoryController(),
        // ex Command history buffer
        exCommandHistoryController : new HistoryController()
      };
      for (var optionName in options) {
        var option = options[optionName];
        option.value = option.defaultValue;
      }
    }

    var lastInsertModeKeyTimer;
    var vimApi = {
      enterVimMode: enterVimMode,
      leaveVimMode: leaveVimMode,
      buildKeyMap: function() {
        // TODO: Convert keymap into dictionary format for fast lookup.
      },
      // Testing hook, though it might be useful to expose the register
      // controller anyway.
      getRegisterController: function() {
        return vimGlobalState.registerController;
      },
      // Testing hook.
      resetVimGlobalState_: resetVimGlobalState,

      // Testing hook.
      getVimGlobalState_: function() {
        return vimGlobalState;
      },

      // Testing hook.
      maybeInitVimState_: maybeInitVimState,

      suppressErrorLogging: false,

      InsertModeKey: InsertModeKey,
      map: function(lhs, rhs, ctx) {
        // Add user defined key bindings.
        exCommandDispatcher.map(lhs, rhs, ctx);
      },
      unmap: function(lhs, ctx) {
        return exCommandDispatcher.unmap(lhs, ctx);
      },
      // Non-recursive map function.
      // NOTE: This will not create mappings to key maps that aren't present
      // in the default key map. See TODO at bottom of function.
      noremap: function(lhs, rhs, ctx) {
        exCommandDispatcher.map(lhs, rhs, ctx, true);
      },
      // Remove all user-defined mappings for the provided context.
      mapclear: function(ctx) {
        // Partition the existing keymap into user-defined and true defaults.
        var actualLength = defaultKeymap.length,
            origLength = defaultKeymapLength;
        var userKeymap = defaultKeymap.slice(0, actualLength - origLength);
        defaultKeymap = defaultKeymap.slice(actualLength - origLength);
        if (ctx) {
          // If a specific context is being cleared, we need to keep mappings
          // from all other contexts.
          for (var i = userKeymap.length - 1; i >= 0; i--) {
            var mapping = userKeymap[i];
            if (ctx !== mapping.context) {
              if (mapping.context) {
                this._mapCommand(mapping);
              } else {
                // `mapping` applies to all contexts so create keymap copies
                // for each context except the one being cleared.
                var contexts = ['normal', 'insert', 'visual'];
                for (var j in contexts) {
                  if (contexts[j] !== ctx) {
                    var newMapping = {};
                    for (var key in mapping) {
                      newMapping[key] = mapping[key];
                    }
                    newMapping.context = contexts[j];
                    this._mapCommand(newMapping);
                  }
                }
              }
            }
          }
        }
      },
      langmap: updateLangmap,
      vimKeyFromEvent: vimKeyFromEvent,
      // TODO: Expose setOption and getOption as instance methods. Need to decide how to namespace
      // them, or somehow make them work with the existing CodeMirror setOption/getOption API.
      setOption: setOption,
      getOption: getOption,
      defineOption: defineOption,
      defineEx: function(name, prefix, func){
        if (!prefix) {
          prefix = name;
        } else if (name.indexOf(prefix) !== 0) {
          throw new Error('(Vim.defineEx) "'+prefix+'" is not a prefix of "'+name+'", command not registered');
        }
        exCommands[name]=func;
        exCommandDispatcher.commandMap_[prefix]={name:name, shortName:prefix, type:'api'};
      },
      handleKey: function (cm, key, origin) {
        var command = this.findKey(cm, key, origin);
        if (typeof command === 'function') {
          return command();
        }
      },
      multiSelectHandleKey: multiSelectHandleKey,

      /**
       * This is the outermost function called by CodeMirror, after keys have
       * been mapped to their Vim equivalents.
       *
       * Finds a command based on the key (and cached keys if there is a
       * multi-key sequence). Returns `undefined` if no key is matched, a noop
       * function if a partial match is found (multi-key), and a function to
       * execute the bound command if a a key is matched. The function always
       * returns true.
       */
      findKey: function(cm, key, origin) {
        var vim = maybeInitVimState(cm);

        function handleMacroRecording() {
          var macroModeState = vimGlobalState.macroModeState;
          if (macroModeState.isRecording) {
            if (key == 'q') {
              macroModeState.exitMacroRecordMode();
              clearInputState(cm);
              return true;
            }
            if (origin != 'mapping') {
              logKey(macroModeState, key);
            }
          }
        }
        function handleEsc() {
          if (key == '<Esc>') {
            if (vim.visualMode) {
              // Get back to normal mode.
              exitVisualMode(cm);
            } else if (vim.insertMode) {
              // Get back to normal mode.
              exitInsertMode(cm);
            } else {
              // We're already in normal mode. Let '<Esc>' be handled normally.
              return;
            }
            clearInputState(cm);
            return true;
          }
        }

        function handleKeyInsertMode() {
          if (handleEsc()) { return true; }
          vim.inputState.keyBuffer.push(key);
          var keys = vim.inputState.keyBuffer.join("");
          var keysAreChars = key.length == 1;
          var match = commandDispatcher.matchCommand(keys, defaultKeymap, vim.inputState, 'insert');
          var changeQueue = vim.inputState.changeQueue;

          if (match.type == 'none') { clearInputState(cm); return false; }
          else if (match.type == 'partial') {
            if (match.expectLiteralNext) vim.expectLiteralNext = true;
            if (lastInsertModeKeyTimer) { window.clearTimeout(lastInsertModeKeyTimer); }
            lastInsertModeKeyTimer = keysAreChars && window.setTimeout(
              function() { if (vim.insertMode && vim.inputState.keyBuffer.length) { clearInputState(cm); } },
              getOption('insertModeEscKeysTimeout'));
            if (keysAreChars) {
              var selections = cm.listSelections();
              if (!changeQueue || changeQueue.removed.length != selections.length)
                changeQueue = vim.inputState.changeQueue = new ChangeQueue;
              changeQueue.inserted += key;
              for (var i = 0; i < selections.length; i++) {
                var from = cursorMin(selections[i].anchor, selections[i].head);
                var to = cursorMax(selections[i].anchor, selections[i].head);
                var text = cm.getRange(from, cm.state.overwrite ? offsetCursor(to, 0, 1) : to);
                changeQueue.removed[i] = (changeQueue.removed[i] || "") + text;
              }
            }
            return !keysAreChars;
          }
          vim.expectLiteralNext = false;

          if (lastInsertModeKeyTimer) { window.clearTimeout(lastInsertModeKeyTimer); }
          if (match.command && changeQueue) {
            var selections = cm.listSelections();
            for (var i = 0; i < selections.length; i++) {
              var here = selections[i].head;
              cm.replaceRange(changeQueue.removed[i] || "", 
                offsetCursor(here, 0, -changeQueue.inserted.length), here, '+input');
            }
            vimGlobalState.macroModeState.lastInsertModeChanges.changes.pop();
          }
          if (!match.command) clearInputState(cm);
          return match.command;
        }

        function handleKeyNonInsertMode() {
          if (handleMacroRecording() || handleEsc()) { return true; }

          vim.inputState.keyBuffer.push(key);
          var keys = vim.inputState.keyBuffer.join("");
          if (/^[1-9]\d*$/.test(keys)) { return true; }

          var keysMatcher = /^(\d*)(.*)$/.exec(keys);
          if (!keysMatcher) { clearInputState(cm); return false; }
          var context = vim.visualMode ? 'visual' :
                                         'normal';
          var mainKey = keysMatcher[2] || keysMatcher[1];
          if (vim.inputState.operatorShortcut && vim.inputState.operatorShortcut.slice(-1) == mainKey) {
            // multikey operators act linewise by repeating only the last character
            mainKey = vim.inputState.operatorShortcut;
          }
          var match = commandDispatcher.matchCommand(mainKey, defaultKeymap, vim.inputState, context);
          if (match.type == 'none') { clearInputState(cm); return false; }
          else if (match.type == 'partial') {
            if (match.expectLiteralNext) vim.expectLiteralNext = true;
            return true;
          }
          else if (match.type == 'clear') { clearInputState(cm); return true; }
          vim.expectLiteralNext = false;

          vim.inputState.keyBuffer.length = 0;
          keysMatcher = /^(\d*)(.*)$/.exec(keys);
          if (keysMatcher[1] && keysMatcher[1] != '0') {
            vim.inputState.pushRepeatDigit(keysMatcher[1]);
          }
          return match.command;
        }

        var command;
        if (vim.insertMode) { command = handleKeyInsertMode(); }
        else { command = handleKeyNonInsertMode(); }
        if (command === false) {
          return !vim.insertMode && key.length === 1 ? function() { return true; } : undefined;
        } else if (command === true) {
          // TODO: Look into using CodeMirror's multi-key handling.
          // Return no-op since we are caching the key. Counts as handled, but
          // don't want act on it just yet.
          return function() { return true; };
        } else {
          return function() {
            if ((command.operator || command.isEdit) && cm.getOption('readOnly'))
              return; // ace_patch
            return cm.operation(function() {
              cm.curOp.isVimOp = true;
              try {
                if (command.type == 'keyToKey') {
                  doKeyToKey(cm, command.toKeys, command);
                } else {
                  commandDispatcher.processCommand(cm, vim, command);
                }
              } catch (e) {
                // clear VIM state in case it's in a bad state.
                cm.state.vim = undefined;
                maybeInitVimState(cm);
                if (!vimApi.suppressErrorLogging) {
                  console['log'](e);
                }
                throw e;
              }
              return true;
            });
          };
        }
      },
      handleEx: function(cm, input) {
        exCommandDispatcher.processCommand(cm, input);
      },

      defineMotion: defineMotion,
      defineAction: defineAction,
      defineOperator: defineOperator,
      mapCommand: mapCommand,
      _mapCommand: _mapCommand,

      defineRegister: defineRegister,

      exitVisualMode: exitVisualMode,
      exitInsertMode: exitInsertMode
    };

    var keyToKeyStack = [];
    var noremap = false;
    var virtualPrompt;
    function sendKeyToPrompt(key) {
      if (key[0] == "<") {
        var lowerKey = key.toLowerCase().slice(1, -1);
        var parts = lowerKey.split('-');
        lowerKey = parts.pop() || '';
        if (lowerKey == 'lt') key = '<';
        else if (lowerKey == 'space') key = ' ';
        else if (lowerKey == 'cr') key = '\n';
        else if (vimToCmKeyMap[lowerKey]) {
          var value = virtualPrompt.value;
          var event =  {
            key: vimToCmKeyMap[lowerKey],
            target: {
              value: value,
              selectionEnd: value.length,
              selectionStart: value.length
            }
          }
          if (virtualPrompt.onKeyDown) {
            virtualPrompt.onKeyDown(event, virtualPrompt.value, close);
          }
          if (virtualPrompt && virtualPrompt.onKeyUp) {
            virtualPrompt.onKeyUp(event, virtualPrompt.value, close);
          }
          return;
        }
      }
      if (key == '\n') {
        var prompt = virtualPrompt;
        virtualPrompt = null;
        prompt.onClose && prompt.onClose(prompt.value);
      } else {
        virtualPrompt.value = (virtualPrompt.value || '') + key;
      }

      function close(value) {
        if (typeof value == 'string') { virtualPrompt.value = value; }
        else { virtualPrompt = null; }
      }
    }
    function doKeyToKey(cm, keys, fromKey) {
      var noremapBefore = noremap;
      // prevent infinite recursion.
      if (fromKey) {
        if (keyToKeyStack.indexOf(fromKey) != -1) return;
        keyToKeyStack.push(fromKey);
        noremap = fromKey.noremap != false;
      }

      try {
        var vim = maybeInitVimState(cm);
        var keyRe = /<(?:[CSMA]-)*\w+>|./gi;

        var match;
        // Pull off one command key, which is either a single character
        // or a special sequence wrapped in '<' and '>', e.g. '<Space>'.
        while ((match = keyRe.exec(keys))) {
          var key = match[0];
          var wasInsert = vim.insertMode;
          if (virtualPrompt) {
            sendKeyToPrompt(key);
            continue;
          }

          var result = vimApi.handleKey(cm, key, 'mapping');

          if (!result && wasInsert && vim.insertMode) {
            if (key[0] == "<") {
              var lowerKey = key.toLowerCase().slice(1, -1);
              var parts = lowerKey.split('-');
              lowerKey = parts.pop() || '';
              if (lowerKey == 'lt') key = '<';
              else if (lowerKey == 'space') key = ' ';
              else if (lowerKey == 'cr') key = '\n';
              else if (vimToCmKeyMap.hasOwnProperty(lowerKey)) {
                // todo support codemirror keys in insertmode vimToCmKeyMap
                key = vimToCmKeyMap[lowerKey];
                sendCmKey(cm, key);
                continue;
              } else {
                key = key[0];
                keyRe.lastIndex = match.index + 1;
              }
            }
            cm.replaceSelection(key);
          }
        }
      } finally {
        keyToKeyStack.pop();
        noremap = keyToKeyStack.length ? noremapBefore : false;
        if (!keyToKeyStack.length && virtualPrompt) {
          var promptOptions = virtualPrompt;
          virtualPrompt = null;
          showPrompt(cm, promptOptions);
        }
      }
    }

    var specialKey = {
      Return: 'CR', Backspace: 'BS', 'Delete': 'Del', Escape: 'Esc', Insert: 'Ins',
      ArrowLeft: 'Left', ArrowRight: 'Right', ArrowUp: 'Up', ArrowDown: 'Down',
      Enter: 'CR', ' ': 'Space'
    };
    var ignoredKeys = { Shift: 1, Alt: 1, Command: 1, Control: 1,
      CapsLock: 1, AltGraph: 1, Dead: 1, Unidentified: 1 };

    var vimToCmKeyMap = {};
    'Left|Right|Up|Down|End|Home'.split('|').concat(Object.keys(specialKey)).forEach(function(x) {
      vimToCmKeyMap[(specialKey[x] || '').toLowerCase()]
         = vimToCmKeyMap[x.toLowerCase()] = x;
    });

    function vimKeyFromEvent(e, vim) {
      var key = e.key;
      if (ignoredKeys[key]) return;
      if (key.length > 1 && key[0] == "n") {
        key = key.replace("Numpad", "");
      }
      key = specialKey[key] || key;

      var name = '';
      if (e.ctrlKey) { name += 'C-'; }
      if (e.altKey) { name += 'A-'; }
      if (e.metaKey) { name += 'M-'; }
      // on mac many characters are entered as option- combos
      // (e.g. on swiss keyboard { is option-8)
      // so we ignore lonely A- modifier for keypress event on mac
      if (CodeMirror.isMac && e.altKey && !e.metaKey && !e.ctrlKey) {
        name = name.slice(2);
      }
      if ((name || key.length > 1) && e.shiftKey) { name += 'S-'; }
  
      if (vim && !vim.expectLiteralNext && key.length == 1) {
        if (langmap.keymap && key in langmap.keymap) {
          if (langmap.remapCtrl != false || !name)
            key = langmap.keymap[key];
        } else if (key.charCodeAt(0) > 255) {
          var code = e.code && e.code.slice(-1) || "";
          if (!e.shiftKey) code = code.toLowerCase();
          if (code) key = code;
        }
      }

      name += key;
      if (name.length > 1) { name = '<' + name + '>'; }
      return name;
    };

    // langmap support
    function updateLangmap(langmapString, remapCtrl) {
      if (langmap.string !== langmapString) {
        langmap = parseLangmap(langmapString);
      }
      langmap.remapCtrl = remapCtrl;
    }
    function parseLangmap(langmapString) {
      // From :help langmap
      /*
        The 'langmap' option is a list of parts, separated with commas.  Each
            part can be in one of two forms:
            1.  A list of pairs.  Each pair is a "from" character immediately
                followed by the "to" character.  Examples: "aA", "aAbBcC".
            2.  A list of "from" characters, a semi-colon and a list of "to"
                characters.  Example: "abc;ABC"
      */

      let keymap = {};
      if (!langmapString) return { keymap: keymap, string: '' };

      function getEscaped(list) {
        return list.split(/\\?(.)/).filter(Boolean);
      }
      langmapString.split(/((?:[^\\,]|\\.)+),/).map(part => {
        if (!part) return;
        const semicolon = part.split(/((?:[^\\;]|\\.)+);/);
        if (semicolon.length == 3) {
          const from = getEscaped(semicolon[1]);
          const to = getEscaped(semicolon[2]);
          if (from.length !== to.length) return; // skip over malformed part
          for (let i = 0; i < from.length; ++i) keymap[from[i]] = to[i];
        } else if (semicolon.length == 1) {
          const pairs = getEscaped(part);
          if (pairs.length % 2 !== 0) return; // skip over malformed part
          for (let i = 0; i < pairs.length; i += 2) keymap[pairs[i]] = pairs[i + 1];
        }
      });

      return { keymap: keymap, string: langmapString };
    }

    defineOption('langmap', undefined, 'string', ['lmap'], function(name, cm) {
      // The 'filetype' option proxies to the CodeMirror 'mode' option.
      if (name === undefined) {
        return langmap.string;
      } else {
        updateLangmap(name);
      }
    });

    // Represents the current input state.
    function InputState() {
      this.prefixRepeat = [];
      this.motionRepeat = [];

      this.operator = null;
      this.operatorArgs = null;
      this.motion = null;
      this.motionArgs = null;
      this.keyBuffer = []; // For matching multi-key commands.
      this.registerName = null; // Defaults to the unnamed register.
      this.changeQueue = null; // For restoring text used by insert mode keybindings
    }
    InputState.prototype.pushRepeatDigit = function(n) {
      if (!this.operator) {
        this.prefixRepeat = this.prefixRepeat.concat(n);
      } else {
        this.motionRepeat = this.motionRepeat.concat(n);
      }
    };
    InputState.prototype.getRepeat = function() {
      var repeat = 0;
      if (this.prefixRepeat.length > 0 || this.motionRepeat.length > 0) {
        repeat = 1;
        if (this.prefixRepeat.length > 0) {
          repeat *= parseInt(this.prefixRepeat.join(''), 10);
        }
        if (this.motionRepeat.length > 0) {
          repeat *= parseInt(this.motionRepeat.join(''), 10);
        }
      }
      return repeat;
    };

    function clearInputState(cm, reason) {
      cm.state.vim.inputState = new InputState();
      cm.state.vim.expectLiteralNext = false;
      CodeMirror.signal(cm, 'vim-command-done', reason);
    }

    function ChangeQueue() {
      this.removed = [];
      this.inserted = "";
    }

    /*
     * Register stores information about copy and paste registers.  Besides
     * text, a register must store whether it is linewise (i.e., when it is
     * pasted, should it insert itself into a new line, or should the text be
     * inserted at the cursor position.)
     */
    function Register(text, linewise, blockwise) {
      this.clear();
      this.keyBuffer = [text || ''];
      this.insertModeChanges = [];
      this.searchQueries = [];
      this.linewise = !!linewise;
      this.blockwise = !!blockwise;
    }
    Register.prototype = {
      setText: function(text, linewise, blockwise) {
        this.keyBuffer = [text || ''];
        this.linewise = !!linewise;
        this.blockwise = !!blockwise;
      },
      pushText: function(text, linewise) {
        // if this register has ever been set to linewise, use linewise.
        if (linewise) {
          if (!this.linewise) {
            this.keyBuffer.push('\n');
          }
          this.linewise = true;
        }
        this.keyBuffer.push(text);
      },
      pushInsertModeChanges: function(changes) {
        this.insertModeChanges.push(createInsertModeChanges(changes));
      },
      pushSearchQuery: function(query) {
        this.searchQueries.push(query);
      },
      clear: function() {
        this.keyBuffer = [];
        this.insertModeChanges = [];
        this.searchQueries = [];
        this.linewise = false;
      },
      toString: function() {
        return this.keyBuffer.join('');
      }
    };

    /**
     * Defines an external register.
     *
     * The name should be a single character that will be used to reference the register.
     * The register should support setText, pushText, clear, and toString(). See Register
     * for a reference implementation.
     */
    function defineRegister(name, register) {
      var registers = vimGlobalState.registerController.registers;
      if (!name || name.length != 1) {
        throw Error('Register name must be 1 character');
      }
      // ace_patch
      registers[name] = register;
      validRegisters.push(name);
    }

    /*
     * vim registers allow you to keep many independent copy and paste buffers.
     * See http://usevim.com/2012/04/13/registers/ for an introduction.
     *
     * RegisterController keeps the state of all the registers.  An initial
     * state may be passed in.  The unnamed register '"' will always be
     * overridden.
     */
    function RegisterController(registers) {
      this.registers = registers;
      this.unnamedRegister = registers['"'] = new Register();
      registers['.'] = new Register();
      registers[':'] = new Register();
      registers['/'] = new Register();
      registers['+'] = new Register();
    }
    RegisterController.prototype = {
      pushText: function(registerName, operator, text, linewise, blockwise) {
        // The black hole register, "_, means delete/yank to nowhere.
        if (registerName === '_') return;
        if (linewise && text.charAt(text.length - 1) !== '\n'){
          text += '\n';
        }
        // Lowercase and uppercase registers refer to the same register.
        // Uppercase just means append.
        var register = this.isValidRegister(registerName) ?
            this.getRegister(registerName) : null;
        // if no register/an invalid register was specified, things go to the
        // default registers
        if (!register) {
          switch (operator) {
            case 'yank':
              // The 0 register contains the text from the most recent yank.
              this.registers['0'] = new Register(text, linewise, blockwise);
              break;
            case 'delete':
            case 'change':
              if (text.indexOf('\n') == -1) {
                // Delete less than 1 line. Update the small delete register.
                this.registers['-'] = new Register(text, linewise);
              } else {
                // Shift down the contents of the numbered registers and put the
                // deleted text into register 1.
                this.shiftNumericRegisters_();
                this.registers['1'] = new Register(text, linewise);
              }
              break;
          }
          // Make sure the unnamed register is set to what just happened
          this.unnamedRegister.setText(text, linewise, blockwise);
          return;
        }

        // If we've gotten to this point, we've actually specified a register
        var append = isUpperCase(registerName);
        if (append) {
          register.pushText(text, linewise);
        } else {
          register.setText(text, linewise, blockwise);
        }
        if (registerName === '+' && typeof navigator !== 'undefined' &&
          typeof navigator.clipboard !== 'undefined' &&
          typeof navigator.clipboard.readText === 'function') {
          navigator.clipboard.writeText(text);
        }
        // The unnamed register always has the same value as the last used
        // register.
        this.unnamedRegister.setText(register.toString(), linewise);
      },
      // Gets the register named @name.  If one of @name doesn't already exist,
      // create it.  If @name is invalid, return the unnamedRegister.
      getRegister: function(name) {
        if (!this.isValidRegister(name)) {
          return this.unnamedRegister;
        }
        name = name.toLowerCase();
        if (!this.registers[name]) {
          this.registers[name] = new Register();
        }
        return this.registers[name];
      },
      isValidRegister: function(name) {
        return name && (inArray(name, validRegisters) || latinCharRegex.test(name));
      },
      shiftNumericRegisters_: function() {
        for (var i = 9; i >= 2; i--) {
          this.registers[i] = this.getRegister('' + (i - 1));
        }
      }
    };
    function HistoryController() {
        this.historyBuffer = [];
        this.iterator = 0;
        this.initialPrefix = null;
    }
    HistoryController.prototype = {
      // the input argument here acts a user entered prefix for a small time
      // until we start autocompletion in which case it is the autocompleted.
      nextMatch: function (input, up) {
        var historyBuffer = this.historyBuffer;
        var dir = up ? -1 : 1;
        if (this.initialPrefix === null) this.initialPrefix = input;
        for (var i = this.iterator + dir; up ? i >= 0 : i < historyBuffer.length; i+= dir) {
          var element = historyBuffer[i];
          for (var j = 0; j <= element.length; j++) {
            if (this.initialPrefix == element.substring(0, j)) {
              this.iterator = i;
              return element;
            }
          }
        }
        // should return the user input in case we reach the end of buffer.
        if (i >= historyBuffer.length) {
          this.iterator = historyBuffer.length;
          return this.initialPrefix;
        }
        // return the last autocompleted query or exCommand as it is.
        if (i < 0 ) return input;
      },
      pushInput: function(input) {
        var index = this.historyBuffer.indexOf(input);
        if (index > -1) this.historyBuffer.splice(index, 1);
        if (input.length) this.historyBuffer.push(input);
      },
      reset: function() {
        this.initialPrefix = null;
        this.iterator = this.historyBuffer.length;
      }
    };
    var commandDispatcher = {
      matchCommand: function(keys, keyMap, inputState, context) {
        var matches = commandMatches(keys, keyMap, context, inputState);
        if (!matches.full && !matches.partial) {
          return {type: 'none'};
        } else if (!matches.full && matches.partial) {
          return {
            type: 'partial',
            expectLiteralNext: matches.partial.length == 1 && matches.partial[0].keys.slice(-11) == '<character>' // langmap literal logic
          };
        }

        var bestMatch;
        for (var i = 0; i < matches.full.length; i++) {
          var match = matches.full[i];
          if (!bestMatch) {
            bestMatch = match;
          }
        }
        if (bestMatch.keys.slice(-11) == '<character>' || bestMatch.keys.slice(-10) == '<register>') {
          var character = lastChar(keys);
          if (!character || character.length > 1) return {type: 'clear'};
          inputState.selectedCharacter = character;
        }
        return {type: 'full', command: bestMatch};
      },
      processCommand: function(cm, vim, command) {
        vim.inputState.repeatOverride = command.repeatOverride;
        switch (command.type) {
          case 'motion':
            this.processMotion(cm, vim, command);
            break;
          case 'operator':
            this.processOperator(cm, vim, command);
            break;
          case 'operatorMotion':
            this.processOperatorMotion(cm, vim, command);
            break;
          case 'action':
            this.processAction(cm, vim, command);
            break;
          case 'search':
            this.processSearch(cm, vim, command);
            break;
          case 'ex':
          case 'keyToEx':
            this.processEx(cm, vim, command);
            break;
          default:
            break;
        }
      },
      processMotion: function(cm, vim, command) {
        vim.inputState.motion = command.motion;
        vim.inputState.motionArgs = copyArgs(command.motionArgs);
        this.evalInput(cm, vim);
      },
      processOperator: function(cm, vim, command) {
        var inputState = vim.inputState;
        if (inputState.operator) {
          if (inputState.operator == command.operator) {
            // Typing an operator twice like 'dd' makes the operator operate
            // linewise
            inputState.motion = 'expandToLine';
            inputState.motionArgs = { linewise: true };
            this.evalInput(cm, vim);
            return;
          } else {
            // 2 different operators in a row doesn't make sense.
            clearInputState(cm);
          }
        }
        inputState.operator = command.operator;
        inputState.operatorArgs = copyArgs(command.operatorArgs);
        if (command.keys.length > 1) {
          inputState.operatorShortcut = command.keys;
        }
        if (command.exitVisualBlock) {
            vim.visualBlock = false;
            updateCmSelection(cm);
        }
        if (vim.visualMode) {
          // Operating on a selection in visual mode. We don't need a motion.
          this.evalInput(cm, vim);
        }
      },
      processOperatorMotion: function(cm, vim, command) {
        var visualMode = vim.visualMode;
        var operatorMotionArgs = copyArgs(command.operatorMotionArgs);
        if (operatorMotionArgs) {
          // Operator motions may have special behavior in visual mode.
          if (visualMode && operatorMotionArgs.visualLine) {
            vim.visualLine = true;
          }
        }
        this.processOperator(cm, vim, command);
        if (!visualMode) {
          this.processMotion(cm, vim, command);
        }
      },
      processAction: function(cm, vim, command) {
        var inputState = vim.inputState;
        var repeat = inputState.getRepeat();
        var repeatIsExplicit = !!repeat;
        var actionArgs = copyArgs(command.actionArgs) || {};
        if (inputState.selectedCharacter) {
          actionArgs.selectedCharacter = inputState.selectedCharacter;
        }
        // Actions may or may not have motions and operators. Do these first.
        if (command.operator) {
          this.processOperator(cm, vim, command);
        }
        if (command.motion) {
          this.processMotion(cm, vim, command);
        }
        if (command.motion || command.operator) {
          this.evalInput(cm, vim);
        }
        actionArgs.repeat = repeat || 1;
        actionArgs.repeatIsExplicit = repeatIsExplicit;
        actionArgs.registerName = inputState.registerName;
        clearInputState(cm);
        vim.lastMotion = null;
        if (command.isEdit) {
          this.recordLastEdit(vim, inputState, command);
        }
        actions[command.action](cm, actionArgs, vim);
      },
      processSearch: function(cm, vim, command) {
        if (!cm.getSearchCursor) {
          // Search depends on SearchCursor.
          return;
        }
        var forward = command.searchArgs.forward;
        var wholeWordOnly = command.searchArgs.wholeWordOnly;
        getSearchState(cm).setReversed(!forward);
        var promptPrefix = (forward) ? '/' : '?';
        var originalQuery = getSearchState(cm).getQuery();
        var originalScrollPos = cm.getScrollInfo();
        function handleQuery(query, ignoreCase, smartCase) {
          vimGlobalState.searchHistoryController.pushInput(query);
          vimGlobalState.searchHistoryController.reset();
          try {
            updateSearchQuery(cm, query, ignoreCase, smartCase);
          } catch (e) {
            showConfirm(cm, 'Invalid regex: ' + query);
            clearInputState(cm);
            return;
          }
          commandDispatcher.processMotion(cm, vim, {
            type: 'motion',
            motion: 'findNext',
            motionArgs: { forward: true, toJumplist: command.searchArgs.toJumplist }
          });
        }
        function onPromptClose(query) {
          //ace_patch cm.scrollTo(originalScrollPos.left, originalScrollPos.top);
          handleQuery(query, true /** ignoreCase */, true /** smartCase */);
          var macroModeState = vimGlobalState.macroModeState;
          if (macroModeState.isRecording) {
            logSearchQuery(macroModeState, query);
          }
        }
        function onPromptKeyUp(e, query, close) {
          var keyName = vimKeyFromEvent(e), up, offset;
          if (keyName == '<Up>' || keyName == '<Down>') {
            up = keyName == '<Up>' ? true : false;
            offset = e.target ? e.target.selectionEnd : 0;
            query = vimGlobalState.searchHistoryController.nextMatch(query, up) || '';
            close(query);
            if (offset && e.target) e.target.selectionEnd = e.target.selectionStart = Math.min(offset, e.target.value.length);
          } else if (keyName && keyName != '<Left>' && keyName != '<Right>') {
            vimGlobalState.searchHistoryController.reset();
          }
          var parsedQuery;
          try {
            parsedQuery = updateSearchQuery(cm, query,
                true /** ignoreCase */, true /** smartCase */);
          } catch (e) {
            // Swallow bad regexes for incremental search.
          }
          if (parsedQuery) {
            cm.scrollIntoView(findNext(cm, !forward, parsedQuery), 30);
          } else {
            clearSearchHighlight(cm);
            cm.scrollTo(originalScrollPos.left, originalScrollPos.top);
          }
        }
        function onPromptKeyDown(e, query, close) {
          var keyName = vimKeyFromEvent(e);
          if (keyName == '<Esc>' || keyName == '<C-c>' || keyName == '<C-[>' ||
              (keyName == '<BS>' && query == '')) {
            vimGlobalState.searchHistoryController.pushInput(query);
            vimGlobalState.searchHistoryController.reset();
            updateSearchQuery(cm, originalQuery);
            clearSearchHighlight(cm);
            cm.scrollTo(originalScrollPos.left, originalScrollPos.top);
            CodeMirror.e_stop(e);
            clearInputState(cm);
            close();
            cm.focus();
          } else if (keyName == '<Up>' || keyName == '<Down>') {
            CodeMirror.e_stop(e);
          } else if (keyName == '<C-u>') {
            // Ctrl-U clears input.
            CodeMirror.e_stop(e);
            close('');
          }
        }
        switch (command.searchArgs.querySrc) {
          case 'prompt':
            var macroModeState = vimGlobalState.macroModeState;
            if (macroModeState.isPlaying) {
              var query = macroModeState.replaySearchQueries.shift();
              handleQuery(query, true /** ignoreCase */, false /** smartCase */);
            } else {
              showPrompt(cm, {
                  onClose: onPromptClose,
                  prefix: promptPrefix,
                  desc: '(JavaScript regexp)',
                  onKeyUp: onPromptKeyUp,
                  onKeyDown: onPromptKeyDown
              });
            }
            break;
          case 'wordUnderCursor':
            var word = expandWordUnderCursor(cm, {noSymbol: true});
            var isKeyword = true;
            if (!word) {
              word = expandWordUnderCursor(cm, {noSymbol: false});
              isKeyword = false;
            }
            if (!word) {
              showConfirm(cm, 'No word under cursor');
              clearInputState(cm);
              return;
            }
            var query = cm.getLine(word.start.line).substring(word.start.ch,
                word.end.ch);
            if (isKeyword && wholeWordOnly) {
                query = '\\b' + query + '\\b';
            } else {
              query = escapeRegex(query);
            }

            // cachedCursor is used to save the old position of the cursor
            // when * or # causes vim to seek for the nearest word and shift
            // the cursor before entering the motion.
            vimGlobalState.jumpList.cachedCursor = cm.getCursor();
            cm.setCursor(word.start);

            handleQuery(query, true /** ignoreCase */, false /** smartCase */);
            break;
        }
      },
      processEx: function(cm, vim, command) {
        function onPromptClose(input) {
          // Give the prompt some time to close so that if processCommand shows
          // an error, the elements don't overlap.
          vimGlobalState.exCommandHistoryController.pushInput(input);
          vimGlobalState.exCommandHistoryController.reset();
          exCommandDispatcher.processCommand(cm, input);
          if (cm.state.vim) clearInputState(cm);
        }
        function onPromptKeyDown(e, input, close) {
          var keyName = vimKeyFromEvent(e), up, offset;
          if (keyName == '<Esc>' || keyName == '<C-c>' || keyName == '<C-[>' ||
              (keyName == '<BS>' && input == '')) {
            vimGlobalState.exCommandHistoryController.pushInput(input);
            vimGlobalState.exCommandHistoryController.reset();
            CodeMirror.e_stop(e);
            clearInputState(cm);
            close();
            cm.focus();
          }
          if (keyName == '<Up>' || keyName == '<Down>') {
            CodeMirror.e_stop(e);
            up = keyName == '<Up>' ? true : false;
            offset = e.target ? e.target.selectionEnd : 0;
            input = vimGlobalState.exCommandHistoryController.nextMatch(input, up) || '';
            close(input);
            if (offset && e.target) e.target.selectionEnd = e.target.selectionStart = Math.min(offset, e.target.value.length);
          } else if (keyName == '<C-u>') {
            // Ctrl-U clears input.
            CodeMirror.e_stop(e);
            close('');
          } else if (keyName && keyName != '<Left>' && keyName != '<Right>') {
              vimGlobalState.exCommandHistoryController.reset();
          }
        }
        if (command.type == 'keyToEx') {
          // Handle user defined Ex to Ex mappings
          exCommandDispatcher.processCommand(cm, command.exArgs.input);
        } else {
          if (vim.visualMode) {
            showPrompt(cm, { onClose: onPromptClose, prefix: ':', value: '\'<,\'>',
                onKeyDown: onPromptKeyDown, selectValueOnOpen: false});
          } else {
            showPrompt(cm, { onClose: onPromptClose, prefix: ':',
                onKeyDown: onPromptKeyDown});
          }
        }
      },
      evalInput: function(cm, vim) {
        // If the motion command is set, execute both the operator and motion.
        // Otherwise return.
        var inputState = vim.inputState;
        var motion = inputState.motion;
        var motionArgs = inputState.motionArgs || {};
        var operator = inputState.operator;
        var operatorArgs = inputState.operatorArgs || {};
        var registerName = inputState.registerName;
        var sel = vim.sel;
        // TODO: Make sure cm and vim selections are identical outside visual mode.
        var origHead = copyCursor(vim.visualMode ? clipCursorToContent(cm, sel.head): cm.getCursor('head'));
        var origAnchor = copyCursor(vim.visualMode ? clipCursorToContent(cm, sel.anchor) : cm.getCursor('anchor'));
        var oldHead = copyCursor(origHead);
        var oldAnchor = copyCursor(origAnchor);
        var newHead, newAnchor;
        var repeat;
        if (operator) {
          this.recordLastEdit(vim, inputState);
        }
        if (inputState.repeatOverride !== undefined) {
          // If repeatOverride is specified, that takes precedence over the
          // input state's repeat. Used by Ex mode and can be user defined.
          repeat = inputState.repeatOverride;
        } else {
          repeat = inputState.getRepeat();
        }
        if (repeat > 0 && motionArgs.explicitRepeat) {
          motionArgs.repeatIsExplicit = true;
        } else if (motionArgs.noRepeat ||
            (!motionArgs.explicitRepeat && repeat === 0)) {
          repeat = 1;
          motionArgs.repeatIsExplicit = false;
        }
        if (inputState.selectedCharacter) {
          // If there is a character input, stick it in all of the arg arrays.
          motionArgs.selectedCharacter = operatorArgs.selectedCharacter =
              inputState.selectedCharacter;
        }
        motionArgs.repeat = repeat;
        clearInputState(cm);
        if (motion) {
          var motionResult = motions[motion](cm, origHead, motionArgs, vim, inputState);
          vim.lastMotion = motions[motion];
          if (!motionResult) {
            return;
          }
          if (motionArgs.toJumplist) {
            if (!operator && cm.ace.curOp != null)
              cm.ace.curOp.command.scrollIntoView = "center-animate"; // ace_patch
            var jumpList = vimGlobalState.jumpList;
            // if the current motion is # or *, use cachedCursor
            var cachedCursor = jumpList.cachedCursor;
            if (cachedCursor) {
              recordJumpPosition(cm, cachedCursor, motionResult);
              delete jumpList.cachedCursor;
            } else {
              recordJumpPosition(cm, origHead, motionResult);
            }
          }
          if (motionResult instanceof Array) {
            newAnchor = motionResult[0];
            newHead = motionResult[1];
          } else {
            newHead = motionResult;
          }
          // TODO: Handle null returns from motion commands better.
          if (!newHead) {
            newHead = copyCursor(origHead);
          }
          if (vim.visualMode) {
            if (!(vim.visualBlock && newHead.ch === Infinity)) {
              newHead = clipCursorToContent(cm, newHead, oldHead);
            }
            if (newAnchor) {
              newAnchor = clipCursorToContent(cm, newAnchor);
            }
            newAnchor = newAnchor || oldAnchor;
            sel.anchor = newAnchor;
            sel.head = newHead;
            updateCmSelection(cm);
            updateMark(cm, vim, '<',
                cursorIsBefore(newAnchor, newHead) ? newAnchor
                    : newHead);
            updateMark(cm, vim, '>',
                cursorIsBefore(newAnchor, newHead) ? newHead
                    : newAnchor);
          } else if (!operator) {
            if (cm.ace.curOp)
              cm.ace.curOp.vimDialogScroll = "center-animate"; // ace_patch
            newHead = clipCursorToContent(cm, newHead, oldHead);
            cm.setCursor(newHead.line, newHead.ch);
          }
        }
        if (operator) {
          if (operatorArgs.lastSel) {
            // Replaying a visual mode operation
            newAnchor = oldAnchor;
            var lastSel = operatorArgs.lastSel;
            var lineOffset = Math.abs(lastSel.head.line - lastSel.anchor.line);
            var chOffset = Math.abs(lastSel.head.ch - lastSel.anchor.ch);
            if (lastSel.visualLine) {
              // Linewise Visual mode: The same number of lines.
              newHead = new Pos(oldAnchor.line + lineOffset, oldAnchor.ch);
            } else if (lastSel.visualBlock) {
              // Blockwise Visual mode: The same number of lines and columns.
              newHead = new Pos(oldAnchor.line + lineOffset, oldAnchor.ch + chOffset);
            } else if (lastSel.head.line == lastSel.anchor.line) {
              // Normal Visual mode within one line: The same number of characters.
              newHead = new Pos(oldAnchor.line, oldAnchor.ch + chOffset);
            } else {
              // Normal Visual mode with several lines: The same number of lines, in the
              // last line the same number of characters as in the last line the last time.
              newHead = new Pos(oldAnchor.line + lineOffset, oldAnchor.ch);
            }
            vim.visualMode = true;
            vim.visualLine = lastSel.visualLine;
            vim.visualBlock = lastSel.visualBlock;
            sel = vim.sel = {
              anchor: newAnchor,
              head: newHead
            };
            updateCmSelection(cm);
          } else if (vim.visualMode) {
            operatorArgs.lastSel = {
              anchor: copyCursor(sel.anchor),
              head: copyCursor(sel.head),
              visualBlock: vim.visualBlock,
              visualLine: vim.visualLine
            };
          }
          var curStart, curEnd, linewise, mode;
          var cmSel;
          if (vim.visualMode) {
            // Init visual op
            curStart = cursorMin(sel.head, sel.anchor);
            curEnd = cursorMax(sel.head, sel.anchor);
            linewise = vim.visualLine || operatorArgs.linewise;
            mode = vim.visualBlock ? 'block' :
                   linewise ? 'line' :
                   'char';
            var newPositions = updateSelectionForSurrogateCharacters(cm, curStart, curEnd);
            cmSel = makeCmSelection(cm, {
              anchor: newPositions.start,
              head: newPositions.end
            }, mode);
            if (linewise) {
              var ranges = cmSel.ranges;
              if (mode == 'block') {
                // Linewise operators in visual block mode extend to end of line
                for (var i = 0; i < ranges.length; i++) {
                  ranges[i].head.ch = lineLength(cm, ranges[i].head.line);
                }
              } else if (mode == 'line') {
                ranges[0].head = new Pos(ranges[0].head.line + 1, 0);
              }
            }
          } else {
            // Init motion op
            curStart = copyCursor(newAnchor || oldAnchor);
            curEnd = copyCursor(newHead || oldHead);
            if (cursorIsBefore(curEnd, curStart)) {
              var tmp = curStart;
              curStart = curEnd;
              curEnd = tmp;
            }
            linewise = motionArgs.linewise || operatorArgs.linewise;
            if (linewise) {
              // Expand selection to entire line.
              expandSelectionToLine(cm, curStart, curEnd);
            } else if (motionArgs.forward) {
              // Clip to trailing newlines only if the motion goes forward.
              clipToLine(cm, curStart, curEnd);
            }
            mode = 'char';
            var exclusive = !motionArgs.inclusive || linewise;
            var newPositions = updateSelectionForSurrogateCharacters(cm, curStart, curEnd);
            cmSel = makeCmSelection(cm, {
              anchor: newPositions.start,
              head: newPositions.end
            }, mode, exclusive);
          }
          cm.setSelections(cmSel.ranges, cmSel.primary);
          vim.lastMotion = null;
          operatorArgs.repeat = repeat; // For indent in visual mode.
          operatorArgs.registerName = registerName;
          // Keep track of linewise as it affects how paste and change behave.
          operatorArgs.linewise = linewise;
          var operatorMoveTo = operators[operator](
            cm, operatorArgs, cmSel.ranges, oldAnchor, newHead);
          if (vim.visualMode) {
            exitVisualMode(cm, operatorMoveTo != null);
          }
          if (operatorMoveTo) {
            cm.setCursor(operatorMoveTo);
          }
        }
      },
      recordLastEdit: function(vim, inputState, actionCommand) {
        var macroModeState = vimGlobalState.macroModeState;
        if (macroModeState.isPlaying) { return; }
        vim.lastEditInputState = inputState;
        vim.lastEditActionCommand = actionCommand;
        macroModeState.lastInsertModeChanges.changes = [];
        macroModeState.lastInsertModeChanges.expectCursorActivityForChange = false;
        macroModeState.lastInsertModeChanges.visualBlock = vim.visualBlock ? vim.sel.head.line - vim.sel.anchor.line : 0;
      }
    };

    /**
     * typedef {Object{line:number,ch:number}} Cursor An object containing the
     *     position of the cursor.
     */
    // All of the functions below return Cursor objects.
    var motions = {
      moveToTopLine: function(cm, _head, motionArgs) {
        var line = getUserVisibleLines(cm).top + motionArgs.repeat -1;
        return new Pos(line, findFirstNonWhiteSpaceCharacter(cm.getLine(line)));
      },
      moveToMiddleLine: function(cm) {
        var range = getUserVisibleLines(cm);
        var line = Math.floor((range.top + range.bottom) * 0.5);
        return new Pos(line, findFirstNonWhiteSpaceCharacter(cm.getLine(line)));
      },
      moveToBottomLine: function(cm, _head, motionArgs) {
        var line = getUserVisibleLines(cm).bottom - motionArgs.repeat +1;
        return new Pos(line, findFirstNonWhiteSpaceCharacter(cm.getLine(line)));
      },
      expandToLine: function(_cm, head, motionArgs) {
        // Expands forward to end of line, and then to next line if repeat is
        // >1. Does not handle backward motion!
        var cur = head;
        return new Pos(cur.line + motionArgs.repeat - 1, Infinity);
      },
      findNext: function(cm, _head, motionArgs) {
        var state = getSearchState(cm);
        var query = state.getQuery();
        if (!query) {
          return;
        }
        var prev = !motionArgs.forward;
        // If search is initiated with ? instead of /, negate direction.
        prev = (state.isReversed()) ? !prev : prev;
        highlightSearchMatches(cm, query);
        return findNext(cm, prev/** prev */, query, motionArgs.repeat);
      },
      /**
       * Find and select the next occurrence of the search query. If the cursor is currently
       * within a match, then find and select the current match. Otherwise, find the next occurrence in the
       * appropriate direction.
       *
       * This differs from `findNext` in the following ways:
       *
       * 1. Instead of only returning the "from", this returns a "from", "to" range.
       * 2. If the cursor is currently inside a search match, this selects the current match
       *    instead of the next match.
       * 3. If there is no associated operator, this will turn on visual mode.
       */
      findAndSelectNextInclusive: function(cm, _head, motionArgs, vim, prevInputState) {
        var state = getSearchState(cm);
        var query = state.getQuery();

        if (!query) {
          return;
        }

        var prev = !motionArgs.forward;
        prev = (state.isReversed()) ? !prev : prev;

        // next: [from, to] | null
        var next = findNextFromAndToInclusive(cm, prev, query, motionArgs.repeat, vim);

        // No matches.
        if (!next) {
          return;
        }

        // If there's an operator that will be executed, return the selection.
        if (prevInputState.operator) {
          return next;
        }

        // At this point, we know that there is no accompanying operator -- let's
        // deal with visual mode in order to select an appropriate match.

        var from = next[0];
        // For whatever reason, when we use the "to" as returned by searchcursor.js directly,
        // the resulting selection is extended by 1 char. Let's shrink it so that only the
        // match is selected.
        var to = new Pos(next[1].line, next[1].ch - 1);

        if (vim.visualMode) {
          // If we were in visualLine or visualBlock mode, get out of it.
          if (vim.visualLine || vim.visualBlock) {
            vim.visualLine = false;
            vim.visualBlock = false;
            CodeMirror.signal(cm, "vim-mode-change", {mode: "visual", subMode: ""});
          }

          // If we're currently in visual mode, we should extend the selection to include
          // the search result.
          var anchor = vim.sel.anchor;
          if (anchor) {
            if (state.isReversed()) {
              if (motionArgs.forward) {
                return [anchor, from];
              }

              return [anchor, to];
            } else {
              if (motionArgs.forward) {
                return [anchor, to];
              }

              return [anchor, from];
            }
          }
        } else {
          // Let's turn visual mode on.
          vim.visualMode = true;
          vim.visualLine = false;
          vim.visualBlock = false;
          CodeMirror.signal(cm, "vim-mode-change", {mode: "visual", subMode: ""});
        }

        return prev ? [to, from] : [from, to];
      },
      goToMark: function(cm, _head, motionArgs, vim) {
        var pos = getMarkPos(cm, vim, motionArgs.selectedCharacter);
        if (pos) {
          return motionArgs.linewise ? { line: pos.line, ch: findFirstNonWhiteSpaceCharacter(cm.getLine(pos.line)) } : pos;
        }
        return null;
      },
      moveToOtherHighlightedEnd: function(cm, _head, motionArgs, vim) {
        if (vim.visualBlock && motionArgs.sameLine) {
          var sel = vim.sel;
          return [
            clipCursorToContent(cm, new Pos(sel.anchor.line, sel.head.ch)),
            clipCursorToContent(cm, new Pos(sel.head.line, sel.anchor.ch))
          ];
        } else {
          return ([vim.sel.head, vim.sel.anchor]);
        }
      },
      jumpToMark: function(cm, head, motionArgs, vim) {
        var best = head;
        for (var i = 0; i < motionArgs.repeat; i++) {
          var cursor = best;
          for (var key in vim.marks) {
            if (!isLowerCase(key)) {
              continue;
            }
            var mark = vim.marks[key].find();
            var isWrongDirection = (motionArgs.forward) ?
              cursorIsBefore(mark, cursor) : cursorIsBefore(cursor, mark);

            if (isWrongDirection) {
              continue;
            }
            if (motionArgs.linewise && (mark.line == cursor.line)) {
              continue;
            }

            var equal = cursorEqual(cursor, best);
            var between = (motionArgs.forward) ?
              cursorIsBetween(cursor, mark, best) :
              cursorIsBetween(best, mark, cursor);

            if (equal || between) {
              best = mark;
            }
          }
        }

        if (motionArgs.linewise) {
          // Vim places the cursor on the first non-whitespace character of
          // the line if there is one, else it places the cursor at the end
          // of the line, regardless of whether a mark was found.
          best = new Pos(best.line, findFirstNonWhiteSpaceCharacter(cm.getLine(best.line)));
        }
        return best;
      },
      moveByCharacters: function(_cm, head, motionArgs) {
        var cur = head;
        var repeat = motionArgs.repeat;
        var ch = motionArgs.forward ? cur.ch + repeat : cur.ch - repeat;
        return new Pos(cur.line, ch);
      },
      moveByLines: function(cm, head, motionArgs, vim) {
        var cur = head;
        var endCh = cur.ch;
        // Depending what our last motion was, we may want to do different
        // things. If our last motion was moving vertically, we want to
        // preserve the HPos from our last horizontal move.  If our last motion
        // was going to the end of a line, moving vertically we should go to
        // the end of the line, etc.
        switch (vim.lastMotion) {
          case this.moveByLines:
          case this.moveByDisplayLines:
          case this.moveByScroll:
          case this.moveToColumn:
          case this.moveToEol:
            endCh = vim.lastHPos;
            break;
          default:
            vim.lastHPos = endCh;
        }
        var repeat = motionArgs.repeat+(motionArgs.repeatOffset||0);
        var line = motionArgs.forward ? cur.line + repeat : cur.line - repeat;
        var first = cm.firstLine();
        var last = cm.lastLine();
        // Vim go to line begin or line end when cursor at first/last line and
        // move to previous/next line is triggered.
        if (line < first && cur.line == first){
          return this.moveToStartOfLine(cm, head, motionArgs, vim);
        } else if (line > last && cur.line == last){
            return moveToEol(cm, head, motionArgs, vim, true);
        }
        // ace_patch{
        var fold = cm.ace.session.getFoldLine(line);
        if (fold) {
          if (motionArgs.forward) {
            if (line > fold.start.row)
              line = fold.end.row + 1;
          } else {
            line = fold.start.row;
          }
        }
        // ace_patch}
        if (motionArgs.toFirstChar){
          endCh=findFirstNonWhiteSpaceCharacter(cm.getLine(line));
          vim.lastHPos = endCh;
        }
        vim.lastHSPos = cm.charCoords(new Pos(line, endCh),'div').left;
        return new Pos(line, endCh);
      },
      moveByDisplayLines: function(cm, head, motionArgs, vim) {
        var cur = head;
        switch (vim.lastMotion) {
          case this.moveByDisplayLines:
          case this.moveByScroll:
          case this.moveByLines:
          case this.moveToColumn:
          case this.moveToEol:
            break;
          default:
            vim.lastHSPos = cm.charCoords(cur,'div').left;
        }
        var repeat = motionArgs.repeat;
        var res=cm.findPosV(cur,(motionArgs.forward ? repeat : -repeat),'line',vim.lastHSPos);
        if (res.hitSide) {
          if (motionArgs.forward) {
            var lastCharCoords = cm.charCoords(res, 'div');
            var goalCoords = { top: lastCharCoords.top + 8, left: vim.lastHSPos };
            var res = cm.coordsChar(goalCoords, 'div');
          } else {
            var resCoords = cm.charCoords(new Pos(cm.firstLine(), 0), 'div');
            resCoords.left = vim.lastHSPos;
            res = cm.coordsChar(resCoords, 'div');
          }
        }
        vim.lastHPos = res.ch;
        return res;
      },
      moveByPage: function(cm, head, motionArgs) {
        // CodeMirror only exposes functions that move the cursor page down, so
        // doing this bad hack to move the cursor and move it back. evalInput
        // will move the cursor to where it should be in the end.
        var curStart = head;
        var repeat = motionArgs.repeat;
        return cm.findPosV(curStart, (motionArgs.forward ? repeat : -repeat), 'page');
      },
      moveByParagraph: function(cm, head, motionArgs) {
        var dir = motionArgs.forward ? 1 : -1;
        return findParagraph(cm, head, motionArgs.repeat, dir);
      },
      moveBySentence: function(cm, head, motionArgs) {
        var dir = motionArgs.forward ? 1 : -1;
        return findSentence(cm, head, motionArgs.repeat, dir);
      },
      moveByScroll: function(cm, head, motionArgs, vim) {
        var scrollbox = cm.getScrollInfo();
        var curEnd = null;
        var repeat = motionArgs.repeat;
        if (!repeat) {
          repeat = scrollbox.clientHeight / (2 * cm.defaultTextHeight());
        }
        var orig = cm.charCoords(head, 'local');
        motionArgs.repeat = repeat;
        curEnd = motions.moveByDisplayLines(cm, head, motionArgs, vim);
        if (!curEnd) {
          return null;
        }
        var dest = cm.charCoords(curEnd, 'local');
        cm.scrollTo(null, scrollbox.top + dest.top - orig.top);
        return curEnd;
      },
      moveByWords: function(cm, head, motionArgs) {
        return moveToWord(cm, head, motionArgs.repeat, !!motionArgs.forward,
            !!motionArgs.wordEnd, !!motionArgs.bigWord);
      },
      moveTillCharacter: function(cm, head, motionArgs) {
        var repeat = motionArgs.repeat;
        var curEnd = moveToCharacter(cm, repeat, motionArgs.forward,
            motionArgs.selectedCharacter, head);
        var increment = motionArgs.forward ? -1 : 1;
        recordLastCharacterSearch(increment, motionArgs);
        if (!curEnd) return null;
        curEnd.ch += increment;
        return curEnd;
      },
      moveToCharacter: function(cm, head, motionArgs) {
        var repeat = motionArgs.repeat;
        recordLastCharacterSearch(0, motionArgs);
        return moveToCharacter(cm, repeat, motionArgs.forward,
            motionArgs.selectedCharacter, head) || head;
      },
      moveToSymbol: function(cm, head, motionArgs) {
        var repeat = motionArgs.repeat;
        return findSymbol(cm, repeat, motionArgs.forward,
            motionArgs.selectedCharacter) || head;
      },
      moveToColumn: function(cm, head, motionArgs, vim) {
        var repeat = motionArgs.repeat;
        // repeat is equivalent to which column we want to move to!
        vim.lastHPos = repeat - 1;
        vim.lastHSPos = cm.charCoords(head,'div').left;
        return moveToColumn(cm, repeat);
      },
      moveToEol: function(cm, head, motionArgs, vim) {
        return moveToEol(cm, head, motionArgs, vim, false);
      },
      moveToFirstNonWhiteSpaceCharacter: function(cm, head) {
        // Go to the start of the line where the text begins, or the end for
        // whitespace-only lines
        var cursor = head;
        return new Pos(cursor.line,
                   findFirstNonWhiteSpaceCharacter(cm.getLine(cursor.line)));
      },
      moveToMatchedSymbol: function(cm, head) {
        var cursor = head;
        var line = cursor.line;
        var ch = cursor.ch;
        var lineText = cm.getLine(line);
        var symbol;
        for (; ch < lineText.length; ch++) {
          symbol = lineText.charAt(ch);
          if (symbol && isMatchableSymbol(symbol)) {
            var style = cm.getTokenTypeAt(new Pos(line, ch + 1));
            if (style !== "string" && style !== "comment") {
              break;
            }
          }
        }
        if (ch < lineText.length) {
          // Only include angle brackets in analysis if they are being matched.
          var re = /[<>]/.test(lineText[ch]) ? /[(){}[\]<>]/ : /[(){}[\]]/; //ace_patch?
          var matched = cm.findMatchingBracket(new Pos(line, ch+1), {bracketRegex: re});
          return matched.to;
        } else {
          return cursor;
        }
      },
      moveToStartOfLine: function(_cm, head) {
        return new Pos(head.line, 0);
      },
      moveToLineOrEdgeOfDocument: function(cm, _head, motionArgs) {
        var lineNum = motionArgs.forward ? cm.lastLine() : cm.firstLine();
        if (motionArgs.repeatIsExplicit) {
          lineNum = motionArgs.repeat - cm.getOption('firstLineNumber');
        }
        return new Pos(lineNum,
                   findFirstNonWhiteSpaceCharacter(cm.getLine(lineNum)));
      },
      moveToStartOfDisplayLine: function(cm) {
        cm.execCommand("goLineLeft");
        return cm.getCursor();
      },
      moveToEndOfDisplayLine: function(cm) {
        cm.execCommand("goLineRight");
        var head = cm.getCursor();
        if (head.sticky == "before") head.ch--;
        return head;
      },
      textObjectManipulation: function(cm, head, motionArgs, vim) {
        // TODO: lots of possible exceptions that can be thrown here. Try da(
        //     outside of a () block.
        var mirroredPairs = {'(': ')', ')': '(',
                             '{': '}', '}': '{',
                             '[': ']', ']': '[',
                             '<': '>', '>': '<'};
        var selfPaired = {'\'': true, '"': true, '`': true};

        var character = motionArgs.selectedCharacter;
        // 'b' refers to  '()' block.
        // 'B' refers to  '{}' block.
        if (character == 'b') {
          character = '(';
        } else if (character == 'B') {
          character = '{';
        }

        // Inclusive is the difference between a and i
        // TODO: Instead of using the additional text object map to perform text
        //     object operations, merge the map into the defaultKeyMap and use
        //     motionArgs to define behavior. Define separate entries for 'aw',
        //     'iw', 'a[', 'i[', etc.
        var inclusive = !motionArgs.textObjectInner;

        var tmp, move;
        if (mirroredPairs[character]) {
          move = true;
          tmp = selectCompanionObject(cm, head, character, inclusive);
          if (!tmp) {
            var sc = cm.getSearchCursor(new RegExp("\\" + character, "g"), head)
            if (sc.find()) {
              tmp = selectCompanionObject(cm, sc.from(), character, inclusive);
            }
          }
        } else if (selfPaired[character]) {
          move = true;
          tmp = findBeginningAndEnd(cm, head, character, inclusive);
        } else if (character === 'W' || character === 'w') {
          var repeat = motionArgs.repeat || 1;
          while (repeat-- > 0) {
            var repeated = expandWordUnderCursor(cm, {
              inclusive,
              innerWord: !inclusive,
              bigWord: character === 'W',
              noSymbol: character === 'W',
              multiline: true
            }, tmp && tmp.end);
            if (repeated) {
              if (!tmp) tmp = repeated;
              tmp.end = repeated.end;
            }
          }
        } else if (character === 'p') {
          tmp = findParagraph(cm, head, motionArgs.repeat, 0, inclusive);
          motionArgs.linewise = true;
          if (vim.visualMode) {
            if (!vim.visualLine) { vim.visualLine = true; }
          } else {
            var operatorArgs = vim.inputState.operatorArgs;
            if (operatorArgs) { operatorArgs.linewise = true; }
            tmp.end.line--;
          }
        } else if (character === 't') {
          tmp = expandTagUnderCursor(cm, head, inclusive);
        } else if (character === 's') {
          // account for cursor on end of sentence symbol
          var content = cm.getLine(head.line);
          if (head.ch > 0 && isEndOfSentenceSymbol(content[head.ch])) {
            head.ch -= 1;
          }
          var end = getSentence(cm, head, motionArgs.repeat, 1, inclusive)
          var start = getSentence(cm, head, motionArgs.repeat, -1, inclusive)
          // closer vim behaviour, 'a' only takes the space after the sentence if there is one before and after
          if (isWhiteSpaceString(cm.getLine(start.line)[start.ch])
              && isWhiteSpaceString(cm.getLine(end.line)[end.ch -1])) {
            start = {line: start.line, ch: start.ch + 1}
          }
          tmp = {start: start, end: end};
        }

        if (!tmp) {
          // No valid text object, don't move.
          return null;
        }

        if (!cm.state.vim.visualMode) {
          return [tmp.start, tmp.end];
        } else {
          return expandSelection(cm, tmp.start, tmp.end, move);
        }
      },

      repeatLastCharacterSearch: function(cm, head, motionArgs) {
        var lastSearch = vimGlobalState.lastCharacterSearch;
        var repeat = motionArgs.repeat;
        var forward = motionArgs.forward === lastSearch.forward;
        var increment = (lastSearch.increment ? 1 : 0) * (forward ? -1 : 1);
        cm.moveH(-increment, 'char');
        motionArgs.inclusive = forward ? true : false;
        var curEnd = moveToCharacter(cm, repeat, forward, lastSearch.selectedCharacter);
        if (!curEnd) {
          cm.moveH(increment, 'char');
          return head;
        }
        curEnd.ch += increment;
        return curEnd;
      }
    };

    function defineMotion(name, fn) {
      motions[name] = fn;
    }

    function fillArray(val, times) {
      var arr = [];
      for (var i = 0; i < times; i++) {
        arr.push(val);
      }
      return arr;
    }
    /**
     * An operator acts on a text selection. It receives the list of selections
     * as input. The corresponding CodeMirror selection is guaranteed to
    * match the input selection.
     */
    var operators = {
      change: function(cm, args, ranges) {
        var finalHead, text;
        var vim = cm.state.vim;
        var anchor = ranges[0].anchor,
            head = ranges[0].head;
        if (!vim.visualMode) {
          text = cm.getRange(anchor, head);
          var lastState = vim.lastEditInputState || {};
          if (lastState.motion == "moveByWords" && !isWhiteSpaceString(text)) {
            // Exclude trailing whitespace if the range is not all whitespace.
            var match = (/\s+$/).exec(text);
            if (match && lastState.motionArgs && lastState.motionArgs.forward) {
              head = offsetCursor(head, 0, - match[0].length);
              text = text.slice(0, - match[0].length);
            }
          }
          if (args.linewise) {
            anchor = new Pos(anchor.line, findFirstNonWhiteSpaceCharacter(cm.getLine(anchor.line)));
            if (head.line > anchor.line) {
              head = new Pos(head.line - 1, Number.MAX_VALUE)
            }
          }
          cm.replaceRange('', anchor, head);
          finalHead = anchor;
        } else if (args.fullLine) {
            head.ch = Number.MAX_VALUE;
            head.line--;
            cm.setSelection(anchor, head)
            text = cm.getSelection();
            cm.replaceSelection("");
            finalHead = anchor;
        } else {
          text = cm.getSelection();
          var replacement = fillArray('', ranges.length);
          cm.replaceSelections(replacement);
          finalHead = cursorMin(ranges[0].head, ranges[0].anchor);
        }
        vimGlobalState.registerController.pushText(
            args.registerName, 'change', text,
            args.linewise, ranges.length > 1);
        actions.enterInsertMode(cm, {head: finalHead}, cm.state.vim);
      },
      // delete is a javascript keyword.
      'delete': function(cm, args, ranges) {
        var finalHead, text;
        var vim = cm.state.vim;
        if (!vim.visualBlock) {
          var anchor = ranges[0].anchor,
              head = ranges[0].head;
          if (args.linewise &&
              head.line != cm.firstLine() &&
              anchor.line == cm.lastLine() &&
              anchor.line == head.line - 1) {
            // Special case for dd on last line (and first line).
            if (anchor.line == cm.firstLine()) {
              anchor.ch = 0;
            } else {
              anchor = new Pos(anchor.line - 1, lineLength(cm, anchor.line - 1));
            }
          }
          text = cm.getRange(anchor, head);
          cm.replaceRange('', anchor, head);
          finalHead = anchor;
          if (args.linewise) {
            finalHead = motions.moveToFirstNonWhiteSpaceCharacter(cm, anchor);
          }
        } else {
          text = cm.getSelection();
          var replacement = fillArray('', ranges.length);
          cm.replaceSelections(replacement);
          finalHead = cursorMin(ranges[0].head, ranges[0].anchor);
        }
        vimGlobalState.registerController.pushText(
            args.registerName, 'delete', text,
            args.linewise, vim.visualBlock);
        return clipCursorToContent(cm, finalHead);
      },
      indent: function(cm, args, ranges) {
        var vim = cm.state.vim;
        // In visual mode, n> shifts the selection right n times, instead of
        // shifting n lines right once.
        var repeat = (vim.visualMode) ? args.repeat : 1;
        if (vim.visualBlock) {
          var tabSize = cm.getOption('tabSize');
          var indent = cm.getOption('indentWithTabs') ? '\t' : ' '.repeat(tabSize);
          var cursor;
          for (var i = ranges.length - 1; i >= 0; i--) {
            cursor = cursorMin(ranges[i].anchor, ranges[i].head);
            if (args.indentRight) {
              cm.replaceRange(indent.repeat(repeat), cursor, cursor);
            } else {
              var text = cm.getLine(cursor.line);
              var end = 0;
              for (var j = 0; j < repeat; j++) {
                var ch = text[cursor.ch + end];
                if (ch == '\t') {
                  end++;
                } else if (ch == ' ') {
                  end++;
                  for (var k = 1; k < indent.length; k++) {
                    ch = text[cursor.ch + end];
                    if (ch !== ' ') break;
                    end++;
                  }
                } else {
                  break
                }
              }
              cm.replaceRange('', cursor, offsetCursor(cursor, 0, end));
            }
          }
          return cursor;
        } else if (cm.indentMore) {
          for (var j = 0; j < repeat; j++) {
            if (args.indentRight) cm.indentMore();
            else cm.indentLess();
          }
        } else {
          var startLine = ranges[0].anchor.line;
          var endLine = vim.visualBlock ?
            ranges[ranges.length - 1].anchor.line :
            ranges[0].head.line;
          if (args.linewise) {
            // The only way to delete a newline is to delete until the start of
            // the next line, so in linewise mode evalInput will include the next
            // line. We don't want this in indent, so we go back a line.
            endLine--;
          }
          for (var i = startLine; i <= endLine; i++) {
            for (var j = 0; j < repeat; j++) {
              cm.indentLine(i, args.indentRight);
            }
          }
        }
        return motions.moveToFirstNonWhiteSpaceCharacter(cm, ranges[0].anchor);
      },
      indentAuto: function(cm, _args, ranges) {
        cm.execCommand("indentAuto");
        return motions.moveToFirstNonWhiteSpaceCharacter(cm, ranges[0].anchor);
      },
      hardWrap: function(cm, operatorArgs, ranges, oldAnchor, newHead) {
        if (!cm.hardWrap) return;
        var from = ranges[0].anchor.line;
        var to = ranges[0].head.line;
        if (operatorArgs.linewise) to--;
        var endRow = cm.hardWrap({from: from, to: to});
        if (endRow > from && operatorArgs.linewise) endRow--;
        return operatorArgs.keepCursor ? oldAnchor : new Pos(endRow, 0);
      },
      changeCase: function(cm, args, ranges, oldAnchor, newHead) {
        var selections = cm.getSelections();
        var swapped = [];
        var toLower = args.toLower;
        for (var j = 0; j < selections.length; j++) {
          var toSwap = selections[j];
          var text = '';
          if (toLower === true) {
            text = toSwap.toLowerCase();
          } else if (toLower === false) {
            text = toSwap.toUpperCase();
          } else {
            for (var i = 0; i < toSwap.length; i++) {
              var character = toSwap.charAt(i);
              text += isUpperCase(character) ? character.toLowerCase() :
                  character.toUpperCase();
            }
          }
          swapped.push(text);
        }
        cm.replaceSelections(swapped);
        if (args.shouldMoveCursor){
          return newHead;
        } else if (!cm.state.vim.visualMode && args.linewise && ranges[0].anchor.line + 1 == ranges[0].head.line) {
          return motions.moveToFirstNonWhiteSpaceCharacter(cm, oldAnchor);
        } else if (args.linewise){
          return oldAnchor;
        } else {
          return cursorMin(ranges[0].anchor, ranges[0].head);
        }
      },
      yank: function(cm, args, ranges, oldAnchor) {
        var vim = cm.state.vim;
        var text = cm.getSelection();
        var endPos = vim.visualMode
          ? cursorMin(vim.sel.anchor, vim.sel.head, ranges[0].head, ranges[0].anchor)
          : oldAnchor;
        vimGlobalState.registerController.pushText(
            args.registerName, 'yank',
            text, args.linewise, vim.visualBlock);
        return endPos;
      }
    };

    function defineOperator(name, fn) {
      operators[name] = fn;
    }

    var actions = {
      jumpListWalk: function(cm, actionArgs, vim) {
        if (vim.visualMode) {
          return;
        }
        var repeat = actionArgs.repeat;
        var forward = actionArgs.forward;
        var jumpList = vimGlobalState.jumpList;

        var mark = jumpList.move(cm, forward ? repeat : -repeat);
        var markPos = mark ? mark.find() : undefined;
        markPos = markPos ? markPos : cm.getCursor();
        cm.setCursor(markPos);
        cm.ace.curOp.command.scrollIntoView = "center-animate"; // ace_patch
      },
      scroll: function(cm, actionArgs, vim) {
        if (vim.visualMode) {
          return;
        }
        var repeat = actionArgs.repeat || 1;
        var lineHeight = cm.defaultTextHeight();
        var top = cm.getScrollInfo().top;
        var delta = lineHeight * repeat;
        var newPos = actionArgs.forward ? top + delta : top - delta;
        var cursor = copyCursor(cm.getCursor());
        var cursorCoords = cm.charCoords(cursor, 'local');
        if (actionArgs.forward) {
          if (newPos > cursorCoords.top) {
             cursor.line += (newPos - cursorCoords.top) / lineHeight;
             cursor.line = Math.ceil(cursor.line);
             cm.setCursor(cursor);
             cursorCoords = cm.charCoords(cursor, 'local');
             cm.scrollTo(null, cursorCoords.top);
          } else {
             // Cursor stays within bounds.  Just reposition the scroll window.
             cm.scrollTo(null, newPos);
          }
        } else {
          var newBottom = newPos + cm.getScrollInfo().clientHeight;
          if (newBottom < cursorCoords.bottom) {
             cursor.line -= (cursorCoords.bottom - newBottom) / lineHeight;
             cursor.line = Math.floor(cursor.line);
             cm.setCursor(cursor);
             cursorCoords = cm.charCoords(cursor, 'local');
             cm.scrollTo(
                 null, cursorCoords.bottom - cm.getScrollInfo().clientHeight);
          } else {
             // Cursor stays within bounds.  Just reposition the scroll window.
             cm.scrollTo(null, newPos);
          }
        }
      },
      scrollToCursor: function(cm, actionArgs) {
        var lineNum = cm.getCursor().line;
        var charCoords = cm.charCoords(new Pos(lineNum, 0), 'local');
        var height = cm.getScrollInfo().clientHeight;
        var y = charCoords.top;
        switch (actionArgs.position) {
          case 'center': y = charCoords.bottom - height / 2;
            break;
          case 'bottom':
            var lineLastCharPos = new Pos(lineNum, cm.getLine(lineNum).length - 1);
            var lineLastCharCoords = cm.charCoords(lineLastCharPos, 'local');
            var lineHeight = lineLastCharCoords.bottom - y;
            y = y - height + lineHeight
            break;
        }
        cm.scrollTo(null, y);
      },
      replayMacro: function(cm, actionArgs, vim) {
        var registerName = actionArgs.selectedCharacter;
        var repeat = actionArgs.repeat;
        var macroModeState = vimGlobalState.macroModeState;
        if (registerName == '@') {
          registerName = macroModeState.latestRegister;
        } else {
          macroModeState.latestRegister = registerName;
        }
        while(repeat--){
          executeMacroRegister(cm, vim, macroModeState, registerName);
        }
      },
      enterMacroRecordMode: function(cm, actionArgs) {
        var macroModeState = vimGlobalState.macroModeState;
        var registerName = actionArgs.selectedCharacter;
        if (vimGlobalState.registerController.isValidRegister(registerName)) {
          macroModeState.enterMacroRecordMode(cm, registerName);
        }
      },
      toggleOverwrite: function(cm) {
        if (!cm.state.overwrite) {
          cm.toggleOverwrite(true);
          cm.setOption('keyMap', 'vim-replace');
          CodeMirror.signal(cm, "vim-mode-change", {mode: "replace"});
        } else {
          cm.toggleOverwrite(false);
          cm.setOption('keyMap', 'vim-insert');
          CodeMirror.signal(cm, "vim-mode-change", {mode: "insert"});
        }
      },
      enterInsertMode: function(cm, actionArgs, vim) {
        if (cm.getOption('readOnly')) { return; }
        vim.insertMode = true;
        vim.insertModeRepeat = actionArgs && actionArgs.repeat || 1;
        var insertAt = (actionArgs) ? actionArgs.insertAt : null;
        var sel = vim.sel;
        var head = actionArgs.head || cm.getCursor('head');
        var height = cm.listSelections().length;
        if (insertAt == 'eol') {
          head = new Pos(head.line, lineLength(cm, head.line));
        } else if (insertAt == 'bol') {
          head = new Pos(head.line, 0);
        } else if (insertAt == 'charAfter') {
          var newPosition = updateSelectionForSurrogateCharacters(cm, head, offsetCursor(head, 0, 1));
          head = newPosition.end;
        } else if (insertAt == 'firstNonBlank') {
          var newPosition = updateSelectionForSurrogateCharacters(cm, head, motions.moveToFirstNonWhiteSpaceCharacter(cm, head));
          head = newPosition.end;
        } else if (insertAt == 'startOfSelectedArea') {
          if (!vim.visualMode)
              return;
          if (!vim.visualBlock) {
            if (sel.head.line < sel.anchor.line) {
              head = sel.head;
            } else {
              head = new Pos(sel.anchor.line, 0);
            }
          } else {
            head = new Pos(
                Math.min(sel.head.line, sel.anchor.line),
                Math.min(sel.head.ch, sel.anchor.ch));
            height = Math.abs(sel.head.line - sel.anchor.line) + 1;
          }
        } else if (insertAt == 'endOfSelectedArea') {
            if (!vim.visualMode)
              return;
          if (!vim.visualBlock) {
            if (sel.head.line >= sel.anchor.line) {
              head = offsetCursor(sel.head, 0, 1);
            } else {
              head = new Pos(sel.anchor.line, 0);
            }
          } else {
            head = new Pos(
                Math.min(sel.head.line, sel.anchor.line),
                Math.max(sel.head.ch, sel.anchor.ch) + 1);
            height = Math.abs(sel.head.line - sel.anchor.line) + 1;
          }
        } else if (insertAt == 'inplace') {
          if (vim.visualMode){
            return;
          }
        } else if (insertAt == 'lastEdit') {
          head = getLastEditPos(cm) || head;
        }
        cm.setOption('disableInput', false);
        if (actionArgs && actionArgs.replace) {
          // Handle Replace-mode as a special case of insert mode.
          cm.toggleOverwrite(true);
          cm.setOption('keyMap', 'vim-replace');
          CodeMirror.signal(cm, "vim-mode-change", {mode: "replace"});
        } else {
          cm.toggleOverwrite(false);
          cm.setOption('keyMap', 'vim-insert');
          CodeMirror.signal(cm, "vim-mode-change", {mode: "insert"});
        }
        if (!vimGlobalState.macroModeState.isPlaying) {
          // Only record if not replaying.
          cm.on('change', onChange);
          if (vim.insertEnd) vim.insertEnd.clear();
          vim.insertEnd = cm.setBookmark(head, {insertLeft: true});
          CodeMirror.on(cm.getInputField(), 'keydown', onKeyEventTargetKeyDown);
        }
        if (vim.visualMode) {
          exitVisualMode(cm);
        }
        selectForInsert(cm, head, height);
      },
      toggleVisualMode: function(cm, actionArgs, vim) {
        var repeat = actionArgs.repeat;
        var anchor = cm.getCursor();
        var head;
        // TODO: The repeat should actually select number of characters/lines
        //     equal to the repeat times the size of the previous visual
        //     operation.
        if (!vim.visualMode) {
          // Entering visual mode
          vim.visualMode = true;
          vim.visualLine = !!actionArgs.linewise;
          vim.visualBlock = !!actionArgs.blockwise;
          head = clipCursorToContent(
              cm, new Pos(anchor.line, anchor.ch + repeat - 1));
          var newPosition = updateSelectionForSurrogateCharacters(cm, anchor, head)
          vim.sel = {
            anchor: newPosition.start,
            head: newPosition.end
          };
          CodeMirror.signal(cm, "vim-mode-change", {mode: "visual", subMode: vim.visualLine ? "linewise" : vim.visualBlock ? "blockwise" : ""});
          updateCmSelection(cm);
          updateMark(cm, vim, '<', cursorMin(anchor, head));
          updateMark(cm, vim, '>', cursorMax(anchor, head));
        } else if (vim.visualLine ^ actionArgs.linewise ||
            vim.visualBlock ^ actionArgs.blockwise) {
          // Toggling between modes
          vim.visualLine = !!actionArgs.linewise;
          vim.visualBlock = !!actionArgs.blockwise;
          CodeMirror.signal(cm, "vim-mode-change", {mode: "visual", subMode: vim.visualLine ? "linewise" : vim.visualBlock ? "blockwise" : ""});
          updateCmSelection(cm);
        } else {
          exitVisualMode(cm);
        }
      },
      reselectLastSelection: function(cm, _actionArgs, vim) {
        var lastSelection = vim.lastSelection;
        if (vim.visualMode) {
          updateLastSelection(cm, vim);
        }
        if (lastSelection) {
          var anchor = lastSelection.anchorMark.find();
          var head = lastSelection.headMark.find();
          if (!anchor || !head) {
            // If the marks have been destroyed due to edits, do nothing.
            return;
          }
          vim.sel = {
            anchor: anchor,
            head: head
          };
          vim.visualMode = true;
          vim.visualLine = lastSelection.visualLine;
          vim.visualBlock = lastSelection.visualBlock;
          updateCmSelection(cm);
          updateMark(cm, vim, '<', cursorMin(anchor, head));
          updateMark(cm, vim, '>', cursorMax(anchor, head));
          CodeMirror.signal(cm, 'vim-mode-change', {
            mode: 'visual',
            subMode: vim.visualLine ? 'linewise' :
                     vim.visualBlock ? 'blockwise' : ''});
        }
      },
      joinLines: function(cm, actionArgs, vim) {
        var curStart, curEnd;
        if (vim.visualMode) {
          curStart = cm.getCursor('anchor');
          curEnd = cm.getCursor('head');
          if (cursorIsBefore(curEnd, curStart)) {
            var tmp = curEnd;
            curEnd = curStart;
            curStart = tmp;
          }
          curEnd.ch = lineLength(cm, curEnd.line) - 1;
        } else {
          // Repeat is the number of lines to join. Minimum 2 lines.
          var repeat = Math.max(actionArgs.repeat, 2);
          curStart = cm.getCursor();
          curEnd = clipCursorToContent(cm, new Pos(curStart.line + repeat - 1,
                                               Infinity));
        }
        var finalCh = 0;
        for (var i = curStart.line; i < curEnd.line; i++) {
          finalCh = lineLength(cm, curStart.line);
          var text = '';
          var nextStartCh = 0;
          if (!actionArgs.keepSpaces) {
            var nextLine = cm.getLine(curStart.line + 1);
            nextStartCh = nextLine.search(/\S/);
            if (nextStartCh == -1) {
              nextStartCh = nextLine.length;
            } else {
              text = " ";
            }
          }
          cm.replaceRange(text, 
            new Pos(curStart.line, finalCh),
            new Pos(curStart.line + 1, nextStartCh));
        }
        var curFinalPos = clipCursorToContent(cm, new Pos(curStart.line, finalCh));
        if (vim.visualMode) {
          exitVisualMode(cm, false);
        }
        cm.setCursor(curFinalPos);
      },
      newLineAndEnterInsertMode: function(cm, actionArgs, vim) {
        vim.insertMode = true;
        var insertAt = copyCursor(cm.getCursor());
        if (insertAt.line === cm.firstLine() && !actionArgs.after) {
          // Special case for inserting newline before start of document.
          cm.replaceRange('\n', new Pos(cm.firstLine(), 0));
          cm.setCursor(cm.firstLine(), 0);
        } else {
          insertAt.line = (actionArgs.after) ? insertAt.line :
              insertAt.line - 1;
          insertAt.ch = lineLength(cm, insertAt.line);
          cm.setCursor(insertAt);
          var newlineFn = CodeMirror.commands.newlineAndIndentContinueComment ||
              CodeMirror.commands.newlineAndIndent;
          newlineFn(cm);
        }
        this.enterInsertMode(cm, { repeat: actionArgs.repeat }, vim);
      },
      paste: function(cm, actionArgs, vim) {
        var register = vimGlobalState.registerController.getRegister(
            actionArgs.registerName);
        var fallback = () => {
          var text = register.toString();
          this.continuePaste(cm, actionArgs, vim, text, register);
        }
        if (actionArgs.registerName === '+' &&
              typeof navigator !== 'undefined' &&
              typeof navigator.clipboard !== 'undefined' &&
              typeof navigator.clipboard.readText === 'function') {
          navigator.clipboard.readText().then((value) => {
            this.continuePaste(cm, actionArgs, vim, value, register);
          }, () => { fallback() })
        } else {
          fallback()
        }
      },
      continuePaste: function(cm, actionArgs, vim, text, register) {
        var cur = copyCursor(cm.getCursor());
        if (!text) {
          return;
        }
        if (actionArgs.matchIndent) {
          var tabSize = cm.getOption("tabSize");
          // length that considers tabs and tabSize
          var whitespaceLength = function(str) {
            var tabs = (str.split("\t").length - 1);
            var spaces = (str.split(" ").length - 1);
            return tabs * tabSize + spaces * 1;
          };
          var currentLine = cm.getLine(cm.getCursor().line);
          var indent = whitespaceLength(currentLine.match(/^\s*/)[0]);
          // chomp last newline b/c don't want it to match /^\s*/gm
          var chompedText = text.replace(/\n$/, '');
          var wasChomped = text !== chompedText;
          var firstIndent = whitespaceLength(text.match(/^\s*/)[0]);
          var text = chompedText.replace(/^\s*/gm, function(wspace) {
            var newIndent = indent + (whitespaceLength(wspace) - firstIndent);
            if (newIndent < 0) {
              return "";
            }
            else if (cm.getOption("indentWithTabs")) {
              var quotient = Math.floor(newIndent / tabSize);
              return Array(quotient + 1).join('\t');
            }
            else {
              return Array(newIndent + 1).join(' ');
            }
          });
          text += wasChomped ? "\n" : "";
        }
        if (actionArgs.repeat > 1) {
          var text = Array(actionArgs.repeat + 1).join(text);
        }
        var linewise = register.linewise;
        var blockwise = register.blockwise;
        if (blockwise) {
          text = text.split('\n');
          if (linewise) {
            text.pop();
          }
          for (var i = 0; i < text.length; i++) {
            text[i] = (text[i] == '') ? ' ' : text[i];
          }
          cur.ch += actionArgs.after ? 1 : 0;
          cur.ch = Math.min(lineLength(cm, cur.line), cur.ch);
        } else if (linewise) {
          if(vim.visualMode) {
            text = vim.visualLine ? text.slice(0, -1) : '\n' + text.slice(0, text.length - 1) + '\n';
          } else if (actionArgs.after) {
            // Move the newline at the end to the start instead, and paste just
            // before the newline character of the line we are on right now.
            text = '\n' + text.slice(0, text.length - 1);
            cur.ch = lineLength(cm, cur.line);
          } else {
            cur.ch = 0;
          }
        } else {
          cur.ch += actionArgs.after ? 1 : 0;
        }
        var curPosFinal;
        if (vim.visualMode) {
          //  save the pasted text for reselection if the need arises
          vim.lastPastedText = text;
          var lastSelectionCurEnd;
          var selectedArea = getSelectedAreaRange(cm, vim);
          var selectionStart = selectedArea[0];
          var selectionEnd = selectedArea[1];
          var selectedText = cm.getSelection();
          var selections = cm.listSelections();
          var emptyStrings = new Array(selections.length).join('1').split('1');
          // save the curEnd marker before it get cleared due to cm.replaceRange.
          if (vim.lastSelection) {
            lastSelectionCurEnd = vim.lastSelection.headMark.find();
          }
          // push the previously selected text to unnamed register
          vimGlobalState.registerController.unnamedRegister.setText(selectedText);
          if (blockwise) {
            // first delete the selected text
            cm.replaceSelections(emptyStrings);
            // Set new selections as per the block length of the yanked text
            selectionEnd = new Pos(selectionStart.line + text.length-1, selectionStart.ch);
            cm.setCursor(selectionStart);
            selectBlock(cm, selectionEnd);
            cm.replaceSelections(text);
            curPosFinal = selectionStart;
          } else if (vim.visualBlock) {
            cm.replaceSelections(emptyStrings);
            cm.setCursor(selectionStart);
            cm.replaceRange(text, selectionStart, selectionStart);
            curPosFinal = selectionStart;
          } else {
            cm.replaceRange(text, selectionStart, selectionEnd);
            curPosFinal = cm.posFromIndex(cm.indexFromPos(selectionStart) + text.length - 1);
          }
          // restore the the curEnd marker
          if(lastSelectionCurEnd) {
            vim.lastSelection.headMark = cm.setBookmark(lastSelectionCurEnd);
          }
          if (linewise) {
            curPosFinal.ch=0;
          }
        } else {
          if (blockwise) {
            cm.setCursor(cur);
            for (var i = 0; i < text.length; i++) {
              var line = cur.line+i;
              if (line > cm.lastLine()) {
                cm.replaceRange('\n',  new Pos(line, 0));
              }
              var lastCh = lineLength(cm, line);
              if (lastCh < cur.ch) {
                extendLineToColumn(cm, line, cur.ch);
              }
            }
            cm.setCursor(cur);
            selectBlock(cm, new Pos(cur.line + text.length-1, cur.ch));
            cm.replaceSelections(text);
            curPosFinal = cur;
          } else {
            cm.replaceRange(text, cur);
            // Now fine tune the cursor to where we want it.
            if (linewise) {
              var line = actionArgs.after ? cur.line + 1 : cur.line;
              curPosFinal = new Pos(line, findFirstNonWhiteSpaceCharacter(cm.getLine(line)));
            } else {
              curPosFinal = copyCursor(cur);
              if (!/\n/.test(text)) {
                curPosFinal.ch += text.length - (actionArgs.after ? 1 : 0);
              }
            }
          }
        }
        if (vim.visualMode) {
          exitVisualMode(cm, false);
        }
        cm.setCursor(curPosFinal);
      },
      undo: function(cm, actionArgs) {
        cm.operation(function() {
          repeatFn(cm, CodeMirror.commands.undo, actionArgs.repeat)();
          cm.setCursor(clipCursorToContent(cm, cm.getCursor('start')));
        });
      },
      redo: function(cm, actionArgs) {
        repeatFn(cm, CodeMirror.commands.redo, actionArgs.repeat)();
      },
      setRegister: function(_cm, actionArgs, vim) {
        vim.inputState.registerName = actionArgs.selectedCharacter;
      },
      insertRegister: function(cm, actionArgs, vim) {
        var registerName = actionArgs.selectedCharacter;
        var register = vimGlobalState.registerController.getRegister(registerName);
        var text = register && register.toString();
        if (text) {
          cm.replaceSelection(text);
        }
      },
      oneNormalCommand: function(cm, actionArgs, vim) {
        exitInsertMode(cm, true);
        vim.insertModeReturn = true;
        CodeMirror.on(cm, 'vim-command-done', function handler() {
          if (vim.visualMode) return;
          if (vim.insertModeReturn) {
            vim.insertModeReturn = false;
            if (!vim.insertMode) {
              actions.enterInsertMode(cm, {}, vim);
            }
          }
          CodeMirror.off(cm, 'vim-command-done', handler);
        });
      },
      setMark: function(cm, actionArgs, vim) {
        var markName = actionArgs.selectedCharacter;
        updateMark(cm, vim, markName, cm.getCursor());
      },
      replace: function(cm, actionArgs, vim) {
        var replaceWith = actionArgs.selectedCharacter;
        var curStart = cm.getCursor();
        var replaceTo;
        var curEnd;
        var selections = cm.listSelections();
        if (vim.visualMode) {
          curStart = cm.getCursor('start');
          curEnd = cm.getCursor('end');
        } else {
          var line = cm.getLine(curStart.line);
          replaceTo = curStart.ch + actionArgs.repeat;
          if (replaceTo > line.length) {
            replaceTo=line.length;
          }
          curEnd = new Pos(curStart.line, replaceTo);
        }

        var newPositions = updateSelectionForSurrogateCharacters(cm, curStart, curEnd);
        curStart = newPositions.start;
        curEnd = newPositions.end;
        if (replaceWith=='\n') {
          if (!vim.visualMode) cm.replaceRange('', curStart, curEnd);
          // special case, where vim help says to replace by just one line-break
          (CodeMirror.commands.newlineAndIndentContinueComment || CodeMirror.commands.newlineAndIndent)(cm);
        } else {
          var replaceWithStr = cm.getRange(curStart, curEnd);
          // replace all surrogate characters with selected character
          replaceWithStr = replaceWithStr.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, replaceWith);
          //replace all characters in range by selected, but keep linebreaks
          replaceWithStr = replaceWithStr.replace(/[^\n]/g, replaceWith);
          if (vim.visualBlock) {
            // Tabs are split in visua block before replacing
            var spaces = new Array(cm.getOption("tabSize")+1).join(' ');
            replaceWithStr = cm.getSelection();
            replaceWithStr = replaceWithStr.replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, replaceWith);
            replaceWithStr = replaceWithStr.replace(/\t/g, spaces).replace(/[^\n]/g, replaceWith).split('\n');
            cm.replaceSelections(replaceWithStr);
          } else {
            cm.replaceRange(replaceWithStr, curStart, curEnd);
          }
          if (vim.visualMode) {
            curStart = cursorIsBefore(selections[0].anchor, selections[0].head) ?
                         selections[0].anchor : selections[0].head;
            cm.setCursor(curStart);
            exitVisualMode(cm, false);
          } else {
            cm.setCursor(offsetCursor(curEnd, 0, -1));
          }
        }
      },
      incrementNumberToken: function(cm, actionArgs) {
        var cur = cm.getCursor();
        var lineStr = cm.getLine(cur.line);
        var re = /(-?)(?:(0x)([\da-f]+)|(0b|0|)(\d+))/gi;
        var match;
        var start;
        var end;
        var numberStr;
        while ((match = re.exec(lineStr)) !== null) {
          start = match.index;
          end = start + match[0].length;
          if (cur.ch < end)break;
        }
        if (!actionArgs.backtrack && (end <= cur.ch))return;
        if (match) {
          var baseStr = match[2] || match[4]
          var digits = match[3] || match[5]
          var increment = actionArgs.increase ? 1 : -1;
          var base = {'0b': 2, '0': 8, '': 10, '0x': 16}[baseStr.toLowerCase()];
          var number = parseInt(match[1] + digits, base) + (increment * actionArgs.repeat);
          numberStr = number.toString(base);
          var zeroPadding = baseStr ? new Array(digits.length - numberStr.length + 1 + match[1].length).join('0') : ''
          if (numberStr.charAt(0) === '-') {
            numberStr = '-' + baseStr + zeroPadding + numberStr.substr(1);
          } else {
            numberStr = baseStr + zeroPadding + numberStr;
          }
          var from = new Pos(cur.line, start);
          var to = new Pos(cur.line, end);
          cm.replaceRange(numberStr, from, to);
        } else {
          return;
        }
        cm.setCursor(new Pos(cur.line, start + numberStr.length - 1));
      },
      repeatLastEdit: function(cm, actionArgs, vim) {
        var lastEditInputState = vim.lastEditInputState;
        if (!lastEditInputState) { return; }
        var repeat = actionArgs.repeat;
        if (repeat && actionArgs.repeatIsExplicit) {
          vim.lastEditInputState.repeatOverride = repeat;
        } else {
          repeat = vim.lastEditInputState.repeatOverride || repeat;
        }
        repeatLastEdit(cm, vim, repeat, false /** repeatForInsert */);
      },
      indent: function(cm, actionArgs) {
        cm.indentLine(cm.getCursor().line, actionArgs.indentRight);
      },
      exitInsertMode: exitInsertMode
    };

    function defineAction(name, fn) {
      actions[name] = fn;
    }

    /*
     * Below are miscellaneous utility functions used by vim.js
     */

    /**
     * Clips cursor to ensure that line is within the buffer's range
     * and is not inside surrogate pair
     * If includeLineBreak is true, then allow cur.ch == lineLength.
     */
    function clipCursorToContent(cm, cur, oldCur) {
      var vim = cm.state.vim;
      var includeLineBreak = vim.insertMode || vim.visualMode;
      var line = Math.min(Math.max(cm.firstLine(), cur.line), cm.lastLine() );
      var text = cm.getLine(line);
      var maxCh = text.length - 1 + Number(!!includeLineBreak);
      var ch = Math.min(Math.max(0, cur.ch), maxCh);
      // prevent cursor from entering surrogate pair
      var charCode = text.charCodeAt(ch);
      if (0xDC00 <= charCode && charCode <= 0xDFFF) {
        var direction = 1;
        if (oldCur && oldCur.line == line && oldCur.ch > ch) {
          direction = -1;
        }
        ch +=direction;
        if (ch > maxCh) ch -=2;
      }
      return new Pos(line, ch);
    }
    function copyArgs(args) {
      var ret = {};
      for (var prop in args) {
        if (args.hasOwnProperty(prop)) {
          ret[prop] = args[prop];
        }
      }
      return ret;
    }
    function offsetCursor(cur, offsetLine, offsetCh) {
      if (typeof offsetLine === 'object') {
        offsetCh = offsetLine.ch;
        offsetLine = offsetLine.line;
      }
      return new Pos(cur.line + offsetLine, cur.ch + offsetCh);
    }
    function commandMatches(keys, keyMap, context, inputState) {
      // Partial matches are not applied. They inform the key handler
      // that the current key sequence is a subsequence of a valid key
      // sequence, so that the key buffer is not cleared.
      if (inputState.operator) context = "operatorPending";
      var match, partial = [], full = [];
      // if currently expanded key comes from a noremap, searcg only in default keys
      var startIndex = noremap ? keyMap.length - defaultKeymapLength : 0;
      for (var i = startIndex; i < keyMap.length; i++) {
        var command = keyMap[i];
        if (context == 'insert' && command.context != 'insert' ||
            (command.context && command.context != context) ||
            inputState.operator && command.type == 'action' ||
            !(match = commandMatch(keys, command.keys))) { continue; }
        if (match == 'partial') { partial.push(command); }
        if (match == 'full') { full.push(command); }
      }
      return {
        partial: partial.length && partial,
        full: full.length && full
      };
    }
    function commandMatch(pressed, mapped) {
      const isLastCharacter = mapped.slice(-11) == '<character>';
      const isLastRegister = mapped.slice(-10) == '<register>';
      if (isLastCharacter || isLastRegister) {
        // Last character matches anything.
        var prefixLen = mapped.length - (isLastCharacter ? 11 : 10);
        var pressedPrefix = pressed.slice(0, prefixLen);
        var mappedPrefix = mapped.slice(0, prefixLen);
        return pressedPrefix == mappedPrefix && pressed.length > prefixLen ? 'full' :
               mappedPrefix.indexOf(pressedPrefix) == 0 ? 'partial' : false;
      } else {
        return pressed == mapped ? 'full' :
               mapped.indexOf(pressed) == 0 ? 'partial' : false;
      }
    }
    function lastChar(keys) {
      var match = /^.*(<[^>]+>)$/.exec(keys);
      var selectedCharacter = match ? match[1] : keys.slice(-1);
      if (selectedCharacter.length > 1){
        switch(selectedCharacter){
          case '<CR>':
            selectedCharacter='\n';
            break;
          case '<Space>':
            selectedCharacter=' ';
            break;
          default:
            selectedCharacter='';
            break;
        }
      }
      return selectedCharacter;
    }
    function repeatFn(cm, fn, repeat) {
      return function() {
        for (var i = 0; i < repeat; i++) {
          fn(cm);
        }
      };
    }
    function copyCursor(cur) {
      return new Pos(cur.line, cur.ch);
    }
    function cursorEqual(cur1, cur2) {
      return cur1.ch == cur2.ch && cur1.line == cur2.line;
    }
    function cursorIsBefore(cur1, cur2) {
      if (cur1.line < cur2.line) {
        return true;
      }
      if (cur1.line == cur2.line && cur1.ch < cur2.ch) {
        return true;
      }
      return false;
    }
    function cursorMin(cur1, cur2) {
      if (arguments.length > 2) {
        cur2 = cursorMin.apply(undefined, Array.prototype.slice.call(arguments, 1));
      }
      return cursorIsBefore(cur1, cur2) ? cur1 : cur2;
    }
    function cursorMax(cur1, cur2) {
      if (arguments.length > 2) {
        cur2 = cursorMax.apply(undefined, Array.prototype.slice.call(arguments, 1));
      }
      return cursorIsBefore(cur1, cur2) ? cur2 : cur1;
    }
    function cursorIsBetween(cur1, cur2, cur3) {
      // returns true if cur2 is between cur1 and cur3.
      var cur1before2 = cursorIsBefore(cur1, cur2);
      var cur2before3 = cursorIsBefore(cur2, cur3);
      return cur1before2 && cur2before3;
    }
    function lineLength(cm, lineNum) {
      return cm.getLine(lineNum).length;
    }
    function trim(s) {
      if (s.trim) {
        return s.trim();
      }
      return s.replace(/^\s+|\s+$/g, '');
    }
    function escapeRegex(s) {
      return s.replace(/([.?*+$\[\]\/\\(){}|\-])/g, '\\$1');
    }
    function extendLineToColumn(cm, lineNum, column) {
      var endCh = lineLength(cm, lineNum);
      var spaces = new Array(column-endCh+1).join(' ');
      cm.setCursor(new Pos(lineNum, endCh));
      cm.replaceRange(spaces, cm.getCursor());
    }
    // This functions selects a rectangular block
    // of text with selectionEnd as any of its corner
    // Height of block:
    // Difference in selectionEnd.line and first/last selection.line
    // Width of the block:
    // Distance between selectionEnd.ch and any(first considered here) selection.ch
    function selectBlock(cm, selectionEnd) {
      var selections = [], ranges = cm.listSelections();
      var head = copyCursor(cm.clipPos(selectionEnd));
      var isClipped = !cursorEqual(selectionEnd, head);
      var curHead = cm.getCursor('head');
      var primIndex = getIndex(ranges, curHead);
      var wasClipped = cursorEqual(ranges[primIndex].head, ranges[primIndex].anchor);
      var max = ranges.length - 1;
      var index = max - primIndex > primIndex ? max : 0;
      var base = ranges[index].anchor;

      var firstLine = Math.min(base.line, head.line);
      var lastLine = Math.max(base.line, head.line);
      var baseCh = base.ch, headCh = head.ch;

      var dir = ranges[index].head.ch - baseCh;
      var newDir = headCh - baseCh;
      if (dir > 0 && newDir <= 0) {
        baseCh++;
        if (!isClipped) { headCh--; }
      } else if (dir < 0 && newDir >= 0) {
        baseCh--;
        if (!wasClipped) { headCh++; }
      } else if (dir < 0 && newDir == -1) {
        baseCh--;
        headCh++;
      }
      for (var line = firstLine; line <= lastLine; line++) {
        var range = {anchor: new Pos(line, baseCh), head: new Pos(line, headCh)};
        selections.push(range);
      }
      cm.setSelections(selections);
      selectionEnd.ch = headCh;
      base.ch = baseCh;
      return base;
    }
    function selectForInsert(cm, head, height) {
      var sel = [];
      for (var i = 0; i < height; i++) {
        var lineHead = offsetCursor(head, i, 0);
        sel.push({anchor: lineHead, head: lineHead});
      }
      cm.setSelections(sel, 0);
    }
    // getIndex returns the index of the cursor in the selections.
    function getIndex(ranges, cursor, end) {
      for (var i = 0; i < ranges.length; i++) {
        var atAnchor = end != 'head' && cursorEqual(ranges[i].anchor, cursor);
        var atHead = end != 'anchor' && cursorEqual(ranges[i].head, cursor);
        if (atAnchor || atHead) {
          return i;
        }
      }
      return -1;
    }
    function getSelectedAreaRange(cm, vim) {
      var lastSelection = vim.lastSelection;
      var getCurrentSelectedAreaRange = function() {
        var selections = cm.listSelections();
        var start =  selections[0];
        var end = selections[selections.length-1];
        var selectionStart = cursorIsBefore(start.anchor, start.head) ? start.anchor : start.head;
        var selectionEnd = cursorIsBefore(end.anchor, end.head) ? end.head : end.anchor;
        return [selectionStart, selectionEnd];
      };
      var getLastSelectedAreaRange = function() {
        var selectionStart = cm.getCursor();
        var selectionEnd = cm.getCursor();
        var block = lastSelection.visualBlock;
        if (block) {
          var width = block.width;
          var height = block.height;
          selectionEnd = new Pos(selectionStart.line + height, selectionStart.ch + width);
          var selections = [];
          // selectBlock creates a 'proper' rectangular block.
          // We do not want that in all cases, so we manually set selections.
          for (var i = selectionStart.line; i < selectionEnd.line; i++) {
            var anchor = new Pos(i, selectionStart.ch);
            var head = new Pos(i, selectionEnd.ch);
            var range = {anchor: anchor, head: head};
            selections.push(range);
          }
          cm.setSelections(selections);
        } else {
          var start = lastSelection.anchorMark.find();
          var end = lastSelection.headMark.find();
          var line = end.line - start.line;
          var ch = end.ch - start.ch;
          selectionEnd = {line: selectionEnd.line + line, ch: line ? selectionEnd.ch : ch + selectionEnd.ch};
          if (lastSelection.visualLine) {
            selectionStart = new Pos(selectionStart.line, 0);
            selectionEnd = new Pos(selectionEnd.line, lineLength(cm, selectionEnd.line));
          }
          cm.setSelection(selectionStart, selectionEnd);
        }
        return [selectionStart, selectionEnd];
      };
      if (!vim.visualMode) {
      // In case of replaying the action.
        return getLastSelectedAreaRange();
      } else {
        return getCurrentSelectedAreaRange();
      }
    }
    // Updates the previous selection with the current selection's values. This
    // should only be called in visual mode.
    function updateLastSelection(cm, vim) {
      var anchor = vim.sel.anchor;
      var head = vim.sel.head;
      // To accommodate the effect of lastPastedText in the last selection
      if (vim.lastPastedText) {
        head = cm.posFromIndex(cm.indexFromPos(anchor) + vim.lastPastedText.length);
        vim.lastPastedText = null;
      }
      vim.lastSelection = {'anchorMark': cm.setBookmark(anchor),
                           'headMark': cm.setBookmark(head),
                           'anchor': copyCursor(anchor),
                           'head': copyCursor(head),
                           'visualMode': vim.visualMode,
                           'visualLine': vim.visualLine,
                           'visualBlock': vim.visualBlock};
    }
    function expandSelection(cm, start, end, move) {
      var sel = cm.state.vim.sel;
      var head = move ? start: sel.head;
      var anchor = move ? start: sel.anchor;
      var tmp;
      if (cursorIsBefore(end, start)) {
        tmp = end;
        end = start;
        start = tmp;
      }
      if (cursorIsBefore(head, anchor)) {
        head = cursorMin(start, head);
        anchor = cursorMax(anchor, end);
      } else {
        anchor = cursorMin(start, anchor);
        head = cursorMax(head, end);
        head = offsetCursor(head, 0, -1);
        if (head.ch == -1 && head.line != cm.firstLine()) {
          head = new Pos(head.line - 1, lineLength(cm, head.line - 1));
        }
      }
      return [anchor, head];
    }
    /**
     * Updates the CodeMirror selection to match the provided vim selection.
     * If no arguments are given, it uses the current vim selection state.
     */
    function updateCmSelection(cm, sel, mode) {
      var vim = cm.state.vim;
      sel = sel || vim.sel;
      var mode = mode ||
        vim.visualLine ? 'line' : vim.visualBlock ? 'block' : 'char';
      var cmSel = makeCmSelection(cm, sel, mode);
      cm.setSelections(cmSel.ranges, cmSel.primary);
    }
    function makeCmSelection(cm, sel, mode, exclusive) {
      var head = copyCursor(sel.head);
      var anchor = copyCursor(sel.anchor);
      if (mode == 'char') {
        var headOffset = !exclusive && !cursorIsBefore(sel.head, sel.anchor) ? 1 : 0;
        var anchorOffset = cursorIsBefore(sel.head, sel.anchor) ? 1 : 0;
        head = offsetCursor(sel.head, 0, headOffset);
        anchor = offsetCursor(sel.anchor, 0, anchorOffset);
        return {
          ranges: [{anchor: anchor, head: head}],
          primary: 0
        };
      } else if (mode == 'line') {
        if (!cursorIsBefore(sel.head, sel.anchor)) {
          anchor.ch = 0;

          var lastLine = cm.lastLine();
          if (head.line > lastLine) {
            head.line = lastLine;
          }
          head.ch = lineLength(cm, head.line);
        } else {
          head.ch = 0;
          anchor.ch = lineLength(cm, anchor.line);
        }
        return {
          ranges: [{anchor: anchor, head: head}],
          primary: 0
        };
      } else if (mode == 'block') {
        var top = Math.min(anchor.line, head.line),
            fromCh = anchor.ch,
            bottom = Math.max(anchor.line, head.line),
            toCh = head.ch;
        if (fromCh < toCh) { toCh += 1 }
        else { fromCh += 1 };
        var height = bottom - top + 1;
        var primary = head.line == top ? 0 : height - 1;
        var ranges = [];
        for (var i = 0; i < height; i++) {
          ranges.push({
            anchor: new Pos(top + i, fromCh),
            head: new Pos(top + i, toCh)
          });
        }
        return {
          ranges: ranges,
          primary: primary
        };
      }
    }
    function getHead(cm) {
      var cur = cm.getCursor('head');
      if (cm.getSelection().length == 1) {
        // Small corner case when only 1 character is selected. The "real"
        // head is the left of head and anchor.
        cur = cursorMin(cur, cm.getCursor('anchor'));
      }
      return cur;
    }

    /**
     * If moveHead is set to false, the CodeMirror selection will not be
     * touched. The caller assumes the responsibility of putting the cursor
    * in the right place.
     */
    function exitVisualMode(cm, moveHead) {
      var vim = cm.state.vim;
      if (moveHead !== false) {
        cm.setCursor(clipCursorToContent(cm, vim.sel.head));
      }
      updateLastSelection(cm, vim);
      vim.visualMode = false;
      vim.visualLine = false;
      vim.visualBlock = false;
      if (!vim.insertMode) CodeMirror.signal(cm, "vim-mode-change", {mode: "normal"});
    }

    // Remove any trailing newlines from the selection. For
    // example, with the caret at the start of the last word on the line,
    // 'dw' should word, but not the newline, while 'w' should advance the
    // caret to the first character of the next line.
    function clipToLine(cm, curStart, curEnd) {
      var selection = cm.getRange(curStart, curEnd);
      // Only clip if the selection ends with trailing newline + whitespace
      if (/\n\s*$/.test(selection)) {
        var lines = selection.split('\n');
        // We know this is all whitespace.
        lines.pop();

        // Cases:
        // 1. Last word is an empty line - do not clip the trailing '\n'
        // 2. Last word is not an empty line - clip the trailing '\n'
        var line;
        // Find the line containing the last word, and clip all whitespace up
        // to it.
        for (var line = lines.pop(); lines.length > 0 && line && isWhiteSpaceString(line); line = lines.pop()) {
          curEnd.line--;
          curEnd.ch = 0;
        }
        // If the last word is not an empty line, clip an additional newline
        if (line) {
          curEnd.line--;
          curEnd.ch = lineLength(cm, curEnd.line);
        } else {
          curEnd.ch = 0;
        }
      }
    }

    // Expand the selection to line ends.
    function expandSelectionToLine(_cm, curStart, curEnd) {
      curStart.ch = 0;
      curEnd.ch = 0;
      curEnd.line++;
    }

    function findFirstNonWhiteSpaceCharacter(text) {
      if (!text) {
        return 0;
      }
      var firstNonWS = text.search(/\S/);
      return firstNonWS == -1 ? text.length : firstNonWS;
    }

    function expandWordUnderCursor(cm, {inclusive, innerWord, bigWord, noSymbol, multiline}, cursor) {
      var cur = cursor || getHead(cm);
      var line = cm.getLine(cur.line);
      var endLine = line;
      var startLineNumber = cur.line
      var endLineNumber = startLineNumber;
      var idx = cur.ch;

      var wordOnNextLine;
      // Seek to first word or non-whitespace character, depending on if
      // noSymbol is true.
      var test = noSymbol ? wordCharTest[0] : bigWordCharTest [0];
      if (innerWord && /\s/.test(line.charAt(idx))) {
        test = function(ch) { return /\s/.test(ch); };
      } else {
        while (!test(line.charAt(idx))) {
          idx++;
          if (idx >= line.length) {
            if (!multiline) return null;
            idx--;
            wordOnNextLine = findWord(cm, cur, true, bigWord, true);
            break
          }
        }

        if (bigWord) {
          test = bigWordCharTest[0];
        } else {
          test = wordCharTest[0];
          if (!test(line.charAt(idx))) {
            test = wordCharTest[1];
          }
        }
      }

      var end = idx, start = idx;
      while (test(line.charAt(start)) && start >= 0) { start--; }
      start++;
      if (wordOnNextLine) {
        end = wordOnNextLine.to;
        endLineNumber = wordOnNextLine.line;
        endLine = cm.getLine(endLineNumber);
        if (!endLine && end == 0) end++;
      } else {
        while (test(line.charAt(end)) && end < line.length) { end++; }
      }

      if (inclusive) {
        // If present, include all whitespace after word.
        // Otherwise, include all whitespace before word, except indentation.
        var wordEnd = end;
        var startsWithSpace = cur.ch <= start && /\s/.test(line.charAt(cur.ch));
        if (!startsWithSpace) {
          while (/\s/.test(endLine.charAt(end)) && end < endLine.length) { end++; }
        }
        if (wordEnd == end || startsWithSpace) {
          var wordStart = start;
          while (/\s/.test(line.charAt(start - 1)) && start > 0) { start--; }
          if (!start && !startsWithSpace) { start = wordStart; }
        }
      }

      return { start: new Pos(startLineNumber, start), end: new Pos(endLineNumber, end) };
    }

    /**
     * Depends on the following:
     *
     * - editor mode should be htmlmixedmode / xml
     * - mode/xml/xml.js should be loaded
     * - addon/fold/xml-fold.js should be loaded
     *
     * If any of the above requirements are not true, this function noops.
     *
     * This is _NOT_ a 100% accurate implementation of vim tag text objects.
     * The following caveats apply (based off cursory testing, I'm sure there
     * are other discrepancies):
     *
     * - Does not work inside comments:
     *   ```
     *   <!-- <div>broken</div> -->
     *   ```
     * - Does not work when tags have different cases:
     *   ```
     *   <div>broken</DIV>
     *   ```
     * - Does not work when cursor is inside a broken tag:
     *   ```
     *   <div><brok><en></div>
     *   ```
     */
    function expandTagUnderCursor(cm, head, inclusive) {
      var cur = head;
      if (!CodeMirror.findMatchingTag || !CodeMirror.findEnclosingTag) {
        return { start: cur, end: cur };
      }

      var tags = CodeMirror.findMatchingTag(cm, head) || CodeMirror.findEnclosingTag(cm, head);
      if (!tags || !tags.open || !tags.close) {
        return { start: cur, end: cur };
      }

      if (inclusive) {
        return { start: tags.open.from, end: tags.close.to };
      }
      return { start: tags.open.to, end: tags.close.from };
    }

    function recordJumpPosition(cm, oldCur, newCur) {
      if (!cursorEqual(oldCur, newCur)) {
        vimGlobalState.jumpList.add(cm, oldCur, newCur);
      }
    }

    function recordLastCharacterSearch(increment, args) {
        vimGlobalState.lastCharacterSearch.increment = increment;
        vimGlobalState.lastCharacterSearch.forward = args.forward;
        vimGlobalState.lastCharacterSearch.selectedCharacter = args.selectedCharacter;
    }

    var symbolToMode = {
        '(': 'bracket', ')': 'bracket', '{': 'bracket', '}': 'bracket',
        '[': 'section', ']': 'section',
        '*': 'comment', '/': 'comment',
        'm': 'method', 'M': 'method',
        '#': 'preprocess'
    };
    var findSymbolModes = {
      bracket: {
        isComplete: function(state) {
          if (state.nextCh === state.symb) {
            state.depth++;
            if (state.depth >= 1)return true;
          } else if (state.nextCh === state.reverseSymb) {
            state.depth--;
          }
          return false;
        }
      },
      section: {
        init: function(state) {
          state.curMoveThrough = true;
          state.symb = (state.forward ? ']' : '[') === state.symb ? '{' : '}';
        },
        isComplete: function(state) {
          return state.index === 0 && state.nextCh === state.symb;
        }
      },
      comment: {
        isComplete: function(state) {
          var found = state.lastCh === '*' && state.nextCh === '/';
          state.lastCh = state.nextCh;
          return found;
        }
      },
      // TODO: The original Vim implementation only operates on level 1 and 2.
      // The current implementation doesn't check for code block level and
      // therefore it operates on any levels.
      method: {
        init: function(state) {
          state.symb = (state.symb === 'm' ? '{' : '}');
          state.reverseSymb = state.symb === '{' ? '}' : '{';
        },
        isComplete: function(state) {
          if (state.nextCh === state.symb)return true;
          return false;
        }
      },
      preprocess: {
        init: function(state) {
          state.index = 0;
        },
        isComplete: function(state) {
          if (state.nextCh === '#') {
            var token = state.lineText.match(/^#(\w+)/)[1];
            if (token === 'endif') {
              if (state.forward && state.depth === 0) {
                return true;
              }
              state.depth++;
            } else if (token === 'if') {
              if (!state.forward && state.depth === 0) {
                return true;
              }
              state.depth--;
            }
            if (token === 'else' && state.depth === 0)return true;
          }
          return false;
        }
      }
    };
    function findSymbol(cm, repeat, forward, symb) {
      var cur = copyCursor(cm.getCursor());
      var increment = forward ? 1 : -1;
      var endLine = forward ? cm.lineCount() : -1;
      var curCh = cur.ch;
      var line = cur.line;
      var lineText = cm.getLine(line);
      var state = {
        lineText: lineText,
        nextCh: lineText.charAt(curCh),
        lastCh: null,
        index: curCh,
        symb: symb,
        reverseSymb: (forward ?  { ')': '(', '}': '{' } : { '(': ')', '{': '}' })[symb],
        forward: forward,
        depth: 0,
        curMoveThrough: false
      };
      var mode = symbolToMode[symb];
      if (!mode)return cur;
      var init = findSymbolModes[mode].init;
      var isComplete = findSymbolModes[mode].isComplete;
      if (init) { init(state); }
      while (line !== endLine && repeat) {
        state.index += increment;
        state.nextCh = state.lineText.charAt(state.index);
        if (!state.nextCh) {
          line += increment;
          state.lineText = cm.getLine(line) || '';
          if (increment > 0) {
            state.index = 0;
          } else {
            var lineLen = state.lineText.length;
            state.index = (lineLen > 0) ? (lineLen-1) : 0;
          }
          state.nextCh = state.lineText.charAt(state.index);
        }
        if (isComplete(state)) {
          cur.line = line;
          cur.ch = state.index;
          repeat--;
        }
      }
      if (state.nextCh || state.curMoveThrough) {
        return new Pos(line, state.index);
      }
      return cur;
    }

    /*
     * Returns the boundaries of the next word. If the cursor in the middle of
     * the word, then returns the boundaries of the current word, starting at
     * the cursor. If the cursor is at the start/end of a word, and we are going
     * forward/backward, respectively, find the boundaries of the next word.
     *
     * @param {CodeMirror} cm CodeMirror object.
     * @param {Cursor} cur The cursor position.
     * @param {boolean} forward True to search forward. False to search
     *     backward.
     * @param {boolean} bigWord True if punctuation count as part of the word.
     *     False if only [a-zA-Z0-9] characters count as part of the word.
     * @param {boolean} emptyLineIsWord True if empty lines should be treated
     *     as words.
     * @return {Object{from:number, to:number, line: number}} The boundaries of
     *     the word, or null if there are no more words.
     */
    function findWord(cm, cur, forward, bigWord, emptyLineIsWord) {
      var lineNum = cur.line;
      var pos = cur.ch;
      var line = cm.getLine(lineNum);
      var dir = forward ? 1 : -1;
      var charTests = bigWord ? bigWordCharTest: wordCharTest;

      if (emptyLineIsWord && line == '') {
        lineNum += dir;
        line = cm.getLine(lineNum);
        if (!isLine(cm, lineNum)) {
          return null;
        }
        pos = (forward) ? 0 : line.length;
      }

      while (true) {
        if (emptyLineIsWord && line == '') {
          return { from: 0, to: 0, line: lineNum };
        }
        var stop = (dir > 0) ? line.length : -1;
        var wordStart = stop, wordEnd = stop;
        // Find bounds of next word.
        while (pos != stop) {
          var foundWord = false;
          for (var i = 0; i < charTests.length && !foundWord; ++i) {
            if (charTests[i](line.charAt(pos))) {
              wordStart = pos;
              // Advance to end of word.
              while (pos != stop && charTests[i](line.charAt(pos))) {
                pos += dir;
              }
              wordEnd = pos;
              foundWord = wordStart != wordEnd;
              if (wordStart == cur.ch && lineNum == cur.line &&
                  wordEnd == wordStart + dir) {
                // We started at the end of a word. Find the next one.
                continue;
              } else {
                return {
                  from: Math.min(wordStart, wordEnd + 1),
                  to: Math.max(wordStart, wordEnd),
                  line: lineNum };
              }
            }
          }
          if (!foundWord) {
            pos += dir;
          }
        }
        // Advance to next/prev line.
        lineNum += dir;
        if (!isLine(cm, lineNum)) {
          return null;
        }
        line = cm.getLine(lineNum);
        pos = (dir > 0) ? 0 : line.length;
      }
    }

    /**
     * @param {CodeMirror} cm CodeMirror object.
     * @param {Pos} cur The position to start from.
     * @param {int} repeat Number of words to move past.
     * @param {boolean} forward True to search forward. False to search
     *     backward.
     * @param {boolean} wordEnd True to move to end of word. False to move to
     *     beginning of word.
     * @param {boolean} bigWord True if punctuation count as part of the word.
     *     False if only alphabet characters count as part of the word.
     * @return {Cursor} The position the cursor should move to.
     */
    function moveToWord(cm, cur, repeat, forward, wordEnd, bigWord) {
      var curStart = copyCursor(cur);
      var words = [];
      if (forward && !wordEnd || !forward && wordEnd) {
        repeat++;
      }
      // For 'e', empty lines are not considered words, go figure.
      var emptyLineIsWord = !(forward && wordEnd);
      for (var i = 0; i < repeat; i++) {
        var word = findWord(cm, cur, forward, bigWord, emptyLineIsWord);
        if (!word) {
          var eodCh = lineLength(cm, cm.lastLine());
          words.push(forward
              ? {line: cm.lastLine(), from: eodCh, to: eodCh}
              : {line: 0, from: 0, to: 0});
          break;
        }
        words.push(word);
        cur = new Pos(word.line, forward ? (word.to - 1) : word.from);
      }
      var shortCircuit = words.length != repeat;
      var firstWord = words[0];
      var lastWord = words.pop();
      if (forward && !wordEnd) {
        // w
        if (!shortCircuit && (firstWord.from != curStart.ch || firstWord.line != curStart.line)) {
          // We did not start in the middle of a word. Discard the extra word at the end.
          lastWord = words.pop();
        }
        return new Pos(lastWord.line, lastWord.from);
      } else if (forward && wordEnd) {
        return new Pos(lastWord.line, lastWord.to - 1);
      } else if (!forward && wordEnd) {
        // ge
        if (!shortCircuit && (firstWord.to != curStart.ch || firstWord.line != curStart.line)) {
          // We did not start in the middle of a word. Discard the extra word at the end.
          lastWord = words.pop();
        }
        return new Pos(lastWord.line, lastWord.to);
      } else {
        // b
        return new Pos(lastWord.line, lastWord.from);
      }
    }

    function moveToEol(cm, head, motionArgs, vim, keepHPos) {
      var cur = head;
      var retval= new Pos(cur.line + motionArgs.repeat - 1, Infinity);
      var end=cm.clipPos(retval);
      end.ch--;
      if (!keepHPos) {
        vim.lastHPos = Infinity;
        vim.lastHSPos = cm.charCoords(end,'div').left;
      }
      return retval;
    }

    function moveToCharacter(cm, repeat, forward, character, head) {
      var cur = head || cm.getCursor();
      var start = cur.ch;
      var idx;
      for (var i = 0; i < repeat; i ++) {
        var line = cm.getLine(cur.line);
        idx = charIdxInLine(start, line, character, forward, true);
        if (idx == -1) {
          return null;
        }
        start = idx;
      }
      return new Pos(cm.getCursor().line, idx);
    }

    function moveToColumn(cm, repeat) {
      // repeat is always >= 1, so repeat - 1 always corresponds
      // to the column we want to go to.
      var line = cm.getCursor().line;
      return clipCursorToContent(cm, new Pos(line, repeat - 1));
    }

    function updateMark(cm, vim, markName, pos) {
      if (!inArray(markName, validMarks) && !latinCharRegex.test(markName)) {
        return;
      }
      if (vim.marks[markName]) {
        vim.marks[markName].clear();
      }
      vim.marks[markName] = cm.setBookmark(pos);
    }

    function charIdxInLine(start, line, character, forward, includeChar) {
      // Search for char in line.
      // motion_options: {forward, includeChar}
      // If includeChar = true, include it too.
      // If forward = true, search forward, else search backwards.
      // If char is not found on this line, do nothing
      var idx;
      if (forward) {
        idx = line.indexOf(character, start + 1);
        if (idx != -1 && !includeChar) {
          idx -= 1;
        }
      } else {
        idx = line.lastIndexOf(character, start - 1);
        if (idx != -1 && !includeChar) {
          idx += 1;
        }
      }
      return idx;
    }

    function findParagraph(cm, head, repeat, dir, inclusive) {
      var line = head.line;
      var min = cm.firstLine();
      var max = cm.lastLine();
      var start, end, i = line;
      function isEmpty(i) { return !/\S/.test(cm.getLine(i)); } // ace_patch
      function isBoundary(i, dir, any) {
        if (any) { return isEmpty(i) != isEmpty(i + dir); }
        return !isEmpty(i) && isEmpty(i + dir);
      }
      function skipFold(i) {
          dir = dir > 0 ? 1 : -1;
          var foldLine = cm.ace.session.getFoldLine(i);
          if (foldLine) {
              if (i + dir > foldLine.start.row && i + dir < foldLine.end.row)
                  dir = (dir > 0 ? foldLine.end.row : foldLine.start.row) - i;
          }
      }
      if (dir) {
        while (min <= i && i <= max && repeat > 0) {
          skipFold(i);
          if (isBoundary(i, dir)) { repeat--; }
          i += dir;
        }
        return new Pos(i, 0);
      }

      var vim = cm.state.vim;
      if (vim.visualLine && isBoundary(line, 1, true)) {
        var anchor = vim.sel.anchor;
        if (isBoundary(anchor.line, -1, true)) {
          if (!inclusive || anchor.line != line) {
            line += 1;
          }
        }
      }
      var startState = isEmpty(line);
      for (i = line; i <= max && repeat; i++) {
        if (isBoundary(i, 1, true)) {
          if (!inclusive || isEmpty(i) != startState) {
            repeat--;
          }
        }
      }
      end = new Pos(i, 0);
      // select boundary before paragraph for the last one
      if (i > max && !startState) { startState = true; }
      else { inclusive = false; }
      for (i = line; i > min; i--) {
        if (!inclusive || isEmpty(i) == startState || i == line) {
          if (isBoundary(i, -1, true)) { break; }
        }
      }
      start = new Pos(i, 0);
      return { start: start, end: end };
    }

    /**
     * Based on {@link findSentence}. The internal functions have the same names,
     * but their behaviour is different. findSentence() crosses line breaks and 
     * is used for jumping to sentence beginnings before or after the current cursor position, 
     * whereas getSentence() is for getting the beginning or end of the sentence 
     * at the current cursor position, either including (a) or excluding (i) whitespace.
     */
    function getSentence(cm, cur, repeat, dir, inclusive /*includes whitespace*/) {

      /*
        Takes an index object
        {
          line: the line string,
          ln: line number,
          pos: index in line,
          dir: direction of traversal (-1 or 1)
        }
        and modifies the pos member to represent the
        next valid position or sets the line to null if there are
        no more valid positions.
       */
      function nextChar(curr) {
        if (curr.pos + curr.dir < 0 || curr.pos + curr.dir >= curr.line.length) {
          curr.line = null;
        }
        else {
          curr.pos += curr.dir;
        }
      }
      /*
        Performs one iteration of traversal in forward direction
        Returns an index object of the sentence end
       */
      function forward(cm, ln, pos, dir) {
        var line = cm.getLine(ln);

        var curr = {
          line: line,
          ln: ln,
          pos: pos,
          dir: dir,
        };

        if (curr.line === "") {
          return { ln: curr.ln, pos: curr.pos };
        }

        var lastSentencePos = curr.pos;

        // Move one step to skip character we start on
        nextChar(curr);

        while (curr.line !== null) {
          lastSentencePos = curr.pos;
          if (isEndOfSentenceSymbol(curr.line[curr.pos])) {
            if (!inclusive) {
              return { ln: curr.ln, pos: curr.pos + 1 };
            } 
            else {
              nextChar(curr);
              while (curr.line !== null ) {
                if (isWhiteSpaceString(curr.line[curr.pos])) {
                  lastSentencePos = curr.pos;
                  nextChar(curr)
                } 
                else {
                  break;
                }
              }
              return { ln: curr.ln, pos: lastSentencePos + 1 };
            }
          }
          nextChar(curr);
        }
        return { ln: curr.ln, pos: lastSentencePos + 1 };
      }

      /*
        Performs one iteration of traversal in reverse direction
        Returns an index object of the sentence start
       */
      function reverse(cm, ln, pos, dir) {
        var line = cm.getLine(ln);

        var curr = {
          line: line,
          ln: ln,
          pos: pos,
          dir: dir,
        }

        if (curr.line === "") {
          return { ln: curr.ln, pos: curr.pos };
        }

        var lastSentencePos = curr.pos;

        // Move one step to skip character we start on
        nextChar(curr);

        while (curr.line !== null) {
          if (!isWhiteSpaceString(curr.line[curr.pos]) && !isEndOfSentenceSymbol(curr.line[curr.pos])) {
            lastSentencePos = curr.pos;
          }

          else if (isEndOfSentenceSymbol(curr.line[curr.pos]) ) {
            if (!inclusive) {
              return { ln: curr.ln, pos: lastSentencePos };
            } 
            else {
              if (isWhiteSpaceString(curr.line[curr.pos + 1])) {
                return { ln: curr.ln, pos: curr.pos + 1 };
              } 
              else {
                return { ln: curr.ln, pos: lastSentencePos };
              }
            }
          }

          nextChar(curr);
        }
        curr.line = line
        if (inclusive && isWhiteSpaceString(curr.line[curr.pos])) {
          return { ln: curr.ln, pos: curr.pos };
        } 
        else {
          return { ln: curr.ln, pos: lastSentencePos };
        }

      }

      var curr_index = {
        ln: cur.line,
        pos: cur.ch,
      };

      while (repeat > 0) {
        if (dir < 0) {
          curr_index = reverse(cm, curr_index.ln, curr_index.pos, dir);
        }
        else {
          curr_index = forward(cm, curr_index.ln, curr_index.pos, dir);
        }
        repeat--;
      }

      return new Pos(curr_index.ln, curr_index.pos);
    }

    function findSentence(cm, cur, repeat, dir) {

       /*
         Takes an index object
         {
           line: the line string,
           ln: line number,
           pos: index in line,
           dir: direction of traversal (-1 or 1)
         }
         and modifies the line, ln, and pos members to represent the
         next valid position or sets them to null if there are
         no more valid positions.
       */
      function nextChar(cm, idx) {
        if (idx.pos + idx.dir < 0 || idx.pos + idx.dir >= idx.line.length) {
          idx.ln += idx.dir;
          if (!isLine(cm, idx.ln)) {
            idx.line = null;
            idx.ln = null;
            idx.pos = null;
            return;
          }
          idx.line = cm.getLine(idx.ln);
          idx.pos = (idx.dir > 0) ? 0 : idx.line.length - 1;
        }
        else {
          idx.pos += idx.dir;
        }
      }

      /*
        Performs one iteration of traversal in forward direction
        Returns an index object of the new location
       */
      function forward(cm, ln, pos, dir) {
        var line = cm.getLine(ln);
        var stop = (line === "");

        var curr = {
          line: line,
          ln: ln,
          pos: pos,
          dir: dir,
        }

        var last_valid = {
          ln: curr.ln,
          pos: curr.pos,
        }

        var skip_empty_lines = (curr.line === "");

        // Move one step to skip character we start on
        nextChar(cm, curr);

        while (curr.line !== null) {
          last_valid.ln = curr.ln;
          last_valid.pos = curr.pos;

          if (curr.line === "" && !skip_empty_lines) {
            return { ln: curr.ln, pos: curr.pos, };
          }
          else if (stop && curr.line !== "" && !isWhiteSpaceString(curr.line[curr.pos])) {
            return { ln: curr.ln, pos: curr.pos, };
          }
          else if (isEndOfSentenceSymbol(curr.line[curr.pos])
            && !stop
            && (curr.pos === curr.line.length - 1
              || isWhiteSpaceString(curr.line[curr.pos + 1]))) {
            stop = true;
          }

          nextChar(cm, curr);
        }

        /*
          Set the position to the last non whitespace character on the last
          valid line in the case that we reach the end of the document.
        */
        var line = cm.getLine(last_valid.ln);
        last_valid.pos = 0;
        for(var i = line.length - 1; i >= 0; --i) {
          if (!isWhiteSpaceString(line[i])) {
            last_valid.pos = i;
            break;
          }
        }

        return last_valid;

      }

      /*
        Performs one iteration of traversal in reverse direction
        Returns an index object of the new location
       */
      function reverse(cm, ln, pos, dir) {
        var line = cm.getLine(ln);

        var curr = {
          line: line,
          ln: ln,
          pos: pos,
          dir: dir,
        }

        var last_valid = {
          ln: curr.ln,
          pos: null,
        };

        var skip_empty_lines = (curr.line === "");

        // Move one step to skip character we start on
        nextChar(cm, curr);

        while (curr.line !== null) {

          if (curr.line === "" && !skip_empty_lines) {
            if (last_valid.pos !== null) {
              return last_valid;
            }
            else {
              return { ln: curr.ln, pos: curr.pos };
            }
          }
          else if (isEndOfSentenceSymbol(curr.line[curr.pos])
              && last_valid.pos !== null
              && !(curr.ln === last_valid.ln && curr.pos + 1 === last_valid.pos)) {
            return last_valid;
          }
          else if (curr.line !== "" && !isWhiteSpaceString(curr.line[curr.pos])) {
            skip_empty_lines = false;
            last_valid = { ln: curr.ln, pos: curr.pos }
          }

          nextChar(cm, curr);
        }

        /*
          Set the position to the first non whitespace character on the last
          valid line in the case that we reach the beginning of the document.
        */
        var line = cm.getLine(last_valid.ln);
        last_valid.pos = 0;
        for(var i = 0; i < line.length; ++i) {
          if (!isWhiteSpaceString(line[i])) {
            last_valid.pos = i;
            break;
          }
        }
        return last_valid;
      }

      var curr_index = {
        ln: cur.line,
        pos: cur.ch,
      };

      while (repeat > 0) {
        if (dir < 0) {
          curr_index = reverse(cm, curr_index.ln, curr_index.pos, dir);
        }
        else {
          curr_index = forward(cm, curr_index.ln, curr_index.pos, dir);
        }
        repeat--;
      }

      return new Pos(curr_index.ln, curr_index.pos);
    }

    // TODO: perhaps this finagling of start and end positions belongs
    // in codemirror/replaceRange?
    function selectCompanionObject(cm, head, symb, inclusive) {
      var cur = head, start, end;

      var bracketRegexp = ({
        '(': /[()]/, ')': /[()]/,
        '[': /[[\]]/, ']': /[[\]]/,
        '{': /[{}]/, '}': /[{}]/,
        '<': /[<>]/, '>': /[<>]/})[symb];
      var openSym = ({
        '(': '(', ')': '(',
        '[': '[', ']': '[',
        '{': '{', '}': '{',
        '<': '<', '>': '<'})[symb];
      var curChar = cm.getLine(cur.line).charAt(cur.ch);
      // Due to the behavior of scanForBracket, we need to add an offset if the
      // cursor is on a matching open bracket.
      var offset = curChar === openSym ? 1 : 0;

      start = cm.scanForBracket(new Pos(cur.line, cur.ch + offset), -1, undefined, {'bracketRegex': bracketRegexp});
      end = cm.scanForBracket(new Pos(cur.line, cur.ch + offset), 1, undefined, {'bracketRegex': bracketRegexp});

      if (!start || !end) return null;

      start = start.pos;
      end = end.pos;

      if ((start.line == end.line && start.ch > end.ch)
          || (start.line > end.line)) {
        var tmp = start;
        start = end;
        end = tmp;
      }

      if (inclusive) {
        end.ch += 1;
      } else {
        start.ch += 1;
      }

      return { start: start, end: end };
    }

    // Takes in a symbol and a cursor and tries to simulate text objects that
    // have identical opening and closing symbols
    // TODO support across multiple lines
    function findBeginningAndEnd(cm, head, symb, inclusive) {
      var cur = copyCursor(head);
      var line = cm.getLine(cur.line);
      var chars = line.split('');
      var start, end, i, len;
      var firstIndex = chars.indexOf(symb);

      // the decision tree is to always look backwards for the beginning first,
      // but if the cursor is in front of the first instance of the symb,
      // then move the cursor forward
      if (cur.ch < firstIndex) {
        cur.ch = firstIndex;
      }
      // otherwise if the cursor is currently on the closing symbol
      else if (firstIndex < cur.ch && chars[cur.ch] == symb) {
        var stringAfter = /string/.test(cm.getTokenTypeAt(offsetCursor(head, 0, 1)));
        var stringBefore = /string/.test(cm.getTokenTypeAt(head));
        var isStringStart = stringAfter && !stringBefore
        if (!isStringStart) {
          end = cur.ch; // assign end to the current cursor
          --cur.ch; // make sure to look backwards
        }
      }

      // if we're currently on the symbol, we've got a start
      if (chars[cur.ch] == symb && !end) {
        start = cur.ch + 1; // assign start to ahead of the cursor
      } else {
        // go backwards to find the start
        for (i = cur.ch; i > -1 && !start; i--) {
          if (chars[i] == symb) {
            start = i + 1;
          }
        }
      }

      // look forwards for the end symbol
      if (start && !end) {
        for (i = start, len = chars.length; i < len && !end; i++) {
          if (chars[i] == symb) {
            end = i;
          }
        }
      }

      // nothing found
      if (!start || !end) {
        return { start: cur, end: cur };
      }

      // include the symbols
      if (inclusive) {
        --start; ++end;
      }

      return {
        start: new Pos(cur.line, start),
        end: new Pos(cur.line, end)
      };
    }

    // Search functions
    defineOption('pcre', true, 'boolean');
    function SearchState() {}
    SearchState.prototype = {
      getQuery: function() {
        return vimGlobalState.query;
      },
      setQuery: function(query) {
        vimGlobalState.query = query;
      },
      getOverlay: function() {
        return this.searchOverlay;
      },
      setOverlay: function(overlay) {
        this.searchOverlay = overlay;
      },
      isReversed: function() {
        return vimGlobalState.isReversed;
      },
      setReversed: function(reversed) {
        vimGlobalState.isReversed = reversed;
      },
      getScrollbarAnnotate: function() {
        return this.annotate;
      },
      setScrollbarAnnotate: function(annotate) {
        this.annotate = annotate;
      }
    };
    function getSearchState(cm) {
      var vim = cm.state.vim;
      return vim.searchState_ || (vim.searchState_ = new SearchState());
    }
    function splitBySlash(argString) {
      return splitBySeparator(argString, '/');
    }

    function findUnescapedSlashes(argString) {
      return findUnescapedSeparators(argString, '/');
    }

    function splitBySeparator(argString, separator) {
      var slashes = findUnescapedSeparators(argString, separator) || [];
      if (!slashes.length) return [];
      var tokens = [];
      // in case of strings like foo/bar
      if (slashes[0] !== 0) return;
      for (var i = 0; i < slashes.length; i++) {
        if (typeof slashes[i] == 'number')
          tokens.push(argString.substring(slashes[i] + 1, slashes[i+1]));
      }
      return tokens;
    }

    function findUnescapedSeparators(str, separator) {
      if (!separator)
        separator = '/';

      var escapeNextChar = false;
      var slashes = [];
      for (var i = 0; i < str.length; i++) {
        var c = str.charAt(i);
        if (!escapeNextChar && c == separator) {
          slashes.push(i);
        }
        escapeNextChar = !escapeNextChar && (c == '\\');
      }
      return slashes;
    }

    // Translates a search string from ex (vim) syntax into javascript form.
    function translateRegex(str) {
      // When these match, add a '\' if unescaped or remove one if escaped.
      var specials = '|(){';
      // Remove, but never add, a '\' for these.
      var unescape = '}';
      var escapeNextChar = false;
      var out = [];
      for (var i = -1; i < str.length; i++) {
        var c = str.charAt(i) || '';
        var n = str.charAt(i+1) || '';
        var specialComesNext = (n && specials.indexOf(n) != -1);
        if (escapeNextChar) {
          if (c !== '\\' || !specialComesNext) {
            out.push(c);
          }
          escapeNextChar = false;
        } else {
          if (c === '\\') {
            escapeNextChar = true;
            // Treat the unescape list as special for removing, but not adding '\'.
            if (n && unescape.indexOf(n) != -1) {
              specialComesNext = true;
            }
            // Not passing this test means removing a '\'.
            if (!specialComesNext || n === '\\') {
              out.push(c);
            }
          } else {
            out.push(c);
            if (specialComesNext && n !== '\\') {
              out.push('\\');
            }
          }
        }
      }
      return out.join('');
    }

    // Translates the replace part of a search and replace from ex (vim) syntax into
    // javascript form.  Similar to translateRegex, but additionally fixes back references
    // (translates '\[0..9]' to '$[0..9]') and follows different rules for escaping '$'.
    var charUnescapes = {'\\n': '\n', '\\r': '\r', '\\t': '\t'};
    function translateRegexReplace(str) {
      var escapeNextChar = false;
      var out = [];
      for (var i = -1; i < str.length; i++) {
        var c = str.charAt(i) || '';
        var n = str.charAt(i+1) || '';
        if (charUnescapes[c + n]) {
          out.push(charUnescapes[c+n]);
          i++;
        } else if (escapeNextChar) {
          // At any point in the loop, escapeNextChar is true if the previous
          // character was a '\' and was not escaped.
          out.push(c);
          escapeNextChar = false;
        } else {
          if (c === '\\') {
            escapeNextChar = true;
            if ((isNumber(n) || n === '$')) {
              out.push('$');
            } else if (n !== '/' && n !== '\\') {
              out.push('\\');
            }
          } else {
            if (c === '$') {
              out.push('$');
            }
            out.push(c);
            if (n === '/') {
              out.push('\\');
            }
          }
        }
      }
      return out.join('');
    }

    // Unescape \ and / in the replace part, for PCRE mode.
    var unescapes = {'\\/': '/', '\\\\': '\\', '\\n': '\n', '\\r': '\r', '\\t': '\t', '\\&':'&'};
    function unescapeRegexReplace(str) {
      var stream = new CodeMirror.StringStream(str);
      var output = [];
      while (!stream.eol()) {
        // Search for \.
        while (stream.peek() && stream.peek() != '\\') {
          output.push(stream.next());
        }
        var matched = false;
        for (var matcher in unescapes) {
          if (stream.match(matcher, true)) {
            matched = true;
            output.push(unescapes[matcher]);
            break;
          }
        }
        if (!matched) {
          // Don't change anything
          output.push(stream.next());
        }
      }
      return output.join('');
    }

    /**
     * Extract the regular expression from the query and return a Regexp object.
     * Returns null if the query is blank.
     * If ignoreCase is passed in, the Regexp object will have the 'i' flag set.
     * If smartCase is passed in, and the query contains upper case letters,
     *   then ignoreCase is overridden, and the 'i' flag will not be set.
     * If the query contains the /i in the flag part of the regular expression,
     *   then both ignoreCase and smartCase are ignored, and 'i' will be passed
     *   through to the Regex object.
     */
    function parseQuery(query, ignoreCase, smartCase) {
      // First update the last search register
      var lastSearchRegister = vimGlobalState.registerController.getRegister('/');
      lastSearchRegister.setText(query);
      // Check if the query is already a regex.
      if (query instanceof RegExp) { return query; }
      // First try to extract regex + flags from the input. If no flags found,
      // extract just the regex. IE does not accept flags directly defined in
      // the regex string in the form /regex/flags
      var slashes = findUnescapedSlashes(query);
      var regexPart;
      var forceIgnoreCase;
      if (!slashes.length) {
        // Query looks like 'regexp'
        regexPart = query;
      } else {
        // Query looks like 'regexp/...'
        regexPart = query.substring(0, slashes[0]);
        var flagsPart = query.substring(slashes[0]);
        forceIgnoreCase = (flagsPart.indexOf('i') != -1);
      }
      if (!regexPart) {
        return null;
      }
      if (!getOption('pcre')) {
        regexPart = translateRegex(regexPart);
      }
      if (smartCase) {
        ignoreCase = (/^[^A-Z]*$/).test(regexPart);
      }
      var regexp = new RegExp(regexPart,
          (ignoreCase || forceIgnoreCase) ? 'im' : 'm');
      return regexp;
    }

    /**
     * dom - Document Object Manipulator
     * Usage:
     *   dom('<tag>'|<node>[, ...{<attributes>|<$styles>}|<child-node>|'<text>'])
     * Examples:
     *   dom('div', {id:'xyz'}, dom('p', 'CM rocks!', {$color:'red'}))
     *   dom(document.head, dom('script', 'alert("hello!")'))
     * Not supported:
     *   dom('p', ['arrays are objects'], Error('objects specify attributes'))
     */
    function dom(n) {
      if (typeof n === 'string') n = document.createElement(n);
      for (var a, i = 1; i < arguments.length; i++) {
        if (!(a = arguments[i])) continue;
        if (typeof a !== 'object') a = document.createTextNode(a);
        if (a.nodeType) n.appendChild(a);
        else for (var key in a) {
          if (!Object.prototype.hasOwnProperty.call(a, key)) continue;
          if (key[0] === '$') n.style[key.slice(1)] = a[key];
          else n.setAttribute(key, a[key]);
        }
      }
      return n;
    }

    function showConfirm(cm, template) {
      var pre = dom('div', {$color: 'red', $whiteSpace: 'pre', class: 'cm-vim-message'}, template);
      if (cm.openNotification) {
        cm.openNotification(pre, {bottom: true, duration: 5000});
      } else {
        alert(pre.innerText);
      }
    }

    function makePrompt(prefix, desc) {
      return dom('div', {$display: 'flex'},
               dom('span', {$fontFamily: 'monospace', $whiteSpace: 'pre', $flex: 1},
                 prefix,
                 dom('input', {type: 'text', autocorrect: 'off',
                               autocapitalize: 'off', spellcheck: 'false', $width: '100%'})),
               desc && dom('span', {$color: '#888'}, desc));
    }

    function showPrompt(cm, options) {
      if (keyToKeyStack.length) {
        if (!options.value) options.value = '';
        virtualPrompt = options;
        return;
      }
      var template = makePrompt(options.prefix, options.desc);
      if (cm.openDialog) {
        cm.openDialog(template, options.onClose, {
          onKeyDown: options.onKeyDown, onKeyUp: options.onKeyUp,
          bottom: true, selectValueOnOpen: false, value: options.value
        });
      }
      else {
        var shortText = '';
        if (typeof options.prefix != "string" && options.prefix) shortText += options.prefix.textContent;
        if (options.desc) shortText += " " + options.desc;
        options.onClose(prompt(shortText, ''));
      }
    }

    function regexEqual(r1, r2) {
      if (r1 instanceof RegExp && r2 instanceof RegExp) {
          var props = ['global', 'multiline', 'ignoreCase', 'source'];
          for (var i = 0; i < props.length; i++) {
              var prop = props[i];
              if (r1[prop] !== r2[prop]) {
                  return false;
              }
          }
          return true;
      }
      return false;
    }
    // Returns true if the query is valid.
    function updateSearchQuery(cm, rawQuery, ignoreCase, smartCase) {
      if (!rawQuery) {
        return;
      }
      var state = getSearchState(cm);
      var query = parseQuery(rawQuery, !!ignoreCase, !!smartCase);
      if (!query) {
        return;
      }
      highlightSearchMatches(cm, query);
      if (regexEqual(query, state.getQuery())) {
        return query;
      }
      state.setQuery(query);
      return query;
    }
    function searchOverlay(query) {
      if (query.source.charAt(0) == '^') {
        var matchSol = true;
      }
      return {
        token: function(stream) {
          if (matchSol && !stream.sol()) {
            stream.skipToEnd();
            return;
          }
          var match = stream.match(query, false);
          if (match) {
            if (match[0].length == 0) {
              // Matched empty string, skip to next.
              stream.next();
              return 'searching';
            }
            if (!stream.sol()) {
              // Backtrack 1 to match \b
              stream.backUp(1);
              if (!query.exec(stream.next() + match[0])) {
                stream.next();
                return null;
              }
            }
            stream.match(query);
            return 'searching';
          }
          while (!stream.eol()) {
            stream.next();
            if (stream.match(query, false)) break;
          }
        },
        query: query
      };
    }
    var highlightTimeout = 0;
    function highlightSearchMatches(cm, query) {
      clearTimeout(highlightTimeout);
      var searchState = getSearchState(cm);
      searchState.highlightTimeout = highlightTimeout;
      highlightTimeout = setTimeout(function() {
        if (!cm.state.vim) return;
        var searchState = getSearchState(cm);
        searchState.highlightTimeout = null;
        var overlay = searchState.getOverlay();
        if (!overlay || query != overlay.query) {
          if (overlay) {
            cm.removeOverlay(overlay);
          }
          overlay = searchOverlay(query);
          cm.addOverlay(overlay);
          if (cm.showMatchesOnScrollbar) {
            if (searchState.getScrollbarAnnotate()) {
              searchState.getScrollbarAnnotate().clear();
            }
            searchState.setScrollbarAnnotate(cm.showMatchesOnScrollbar(query));
          }
          searchState.setOverlay(overlay);
        }
      }, 50);
    }
    function findNext(cm, prev, query, repeat) {
      if (repeat === undefined) { repeat = 1; }
      return cm.operation(function() {
        var pos = cm.getCursor();
        var cursor = cm.getSearchCursor(query, pos);
        for (var i = 0; i < repeat; i++) {
          var found = cursor.find(prev);
          if (i == 0 && found && cursorEqual(cursor.from(), pos)) {
            var lastEndPos = prev ? cursor.from() : cursor.to();
            found = cursor.find(prev);
            if (found && !found[0] && cursorEqual(cursor.from(), lastEndPos)) {
              if (cm.getLine(lastEndPos.line).length == lastEndPos.ch)
                found = cursor.find(prev);
            }
          }
          if (!found) {
            // SearchCursor may have returned null because it hit EOF, wrap
            // around and try again.
            cursor = cm.getSearchCursor(query,
                (prev) ? new Pos(cm.lastLine()) : new Pos(cm.firstLine(), 0) );
            if (!cursor.find(prev)) {
              return;
            }
          }
        }
        return cursor.from();
      });
    }
    /**
     * Pretty much the same as `findNext`, except for the following differences:
     *
     * 1. Before starting the search, move to the previous search. This way if our cursor is
     * already inside a match, we should return the current match.
     * 2. Rather than only returning the cursor's from, we return the cursor's from and to as a tuple.
     */
    function findNextFromAndToInclusive(cm, prev, query, repeat, vim) {
      if (repeat === undefined) { repeat = 1; }
      return cm.operation(function() {
        var pos = cm.getCursor();
        var cursor = cm.getSearchCursor(query, pos);

        // Go back one result to ensure that if the cursor is currently a match, we keep it.
        var found = cursor.find(!prev);

        // If we haven't moved, go back one more (similar to if i==0 logic in findNext).
        if (!vim.visualMode && found && cursorEqual(cursor.from(), pos)) {
          cursor.find(!prev);
        }

        for (var i = 0; i < repeat; i++) {
          found = cursor.find(prev);
          if (!found) {
            // SearchCursor may have returned null because it hit EOF, wrap
            // around and try again.
            cursor = cm.getSearchCursor(query,
                (prev) ? new Pos(cm.lastLine()) : new Pos(cm.firstLine(), 0) );
            if (!cursor.find(prev)) {
              return;
            }
          }
        }
        return [cursor.from(), cursor.to()];
      });
    }
    function clearSearchHighlight(cm) {
      var state = getSearchState(cm);
      if (state.highlightTimeout) {
        clearTimeout(state.highlightTimeout);
        state.highlightTimeout = null;
      }
      cm.removeOverlay(getSearchState(cm).getOverlay());
      state.setOverlay(null);
      if (state.getScrollbarAnnotate()) {
        state.getScrollbarAnnotate().clear();
        state.setScrollbarAnnotate(null);
      }
    }
    /**
     * Check if pos is in the specified range, INCLUSIVE.
     * Range can be specified with 1 or 2 arguments.
     * If the first range argument is an array, treat it as an array of line
     * numbers. Match pos against any of the lines.
     * If the first range argument is a number,
     *   if there is only 1 range argument, check if pos has the same line
     *       number
     *   if there are 2 range arguments, then check if pos is in between the two
     *       range arguments.
     */
    function isInRange(pos, start, end) {
      if (typeof pos != 'number') {
        // Assume it is a cursor position. Get the line number.
        pos = pos.line;
      }
      if (start instanceof Array) {
        return inArray(pos, start);
      } else {
        if (typeof end == 'number') {
          return (pos >= start && pos <= end);
        } else {
          return pos == start;
        }
      }
    }
    function getUserVisibleLines(cm) {
      // ace_patch{
      var renderer = cm.ace.renderer;
      return {
        top: renderer.getFirstFullyVisibleRow(),
        bottom: renderer.getLastFullyVisibleRow()
      }
      // ace_patch}
    }

    function getMarkPos(cm, vim, markName) {
      if (markName == '\'' || markName == '`') {
        return vimGlobalState.jumpList.find(cm, -1) || new Pos(0, 0);
      } else if (markName == '.') {
        return getLastEditPos(cm);
      }

      var mark = vim.marks[markName];
      return mark && mark.find();
    }

    function getLastEditPos(cm) {
      if (cm.getLastEditEnd) {
        return cm.getLastEditEnd();
      }
      // for old cm
      var done = cm.doc.history.done;
      for (var i = done.length; i--;) {
        if (done[i].changes) {
          return copyCursor(done[i].changes[0].to);
        }
      }
    }

    var ExCommandDispatcher = function() {
      this.buildCommandMap_();
    };
    ExCommandDispatcher.prototype = {
      processCommand: function(cm, input, opt_params) {
        var that = this;
        cm.operation(function () {
          cm.curOp.isVimOp = true;
          that._processCommand(cm, input, opt_params);
        });
      },
      _processCommand: function(cm, input, opt_params) {
        var vim = cm.state.vim;
        var commandHistoryRegister = vimGlobalState.registerController.getRegister(':');
        var previousCommand = commandHistoryRegister.toString();
        var inputStream = new CodeMirror.StringStream(input);
        // update ": with the latest command whether valid or invalid
        commandHistoryRegister.setText(input);
        var params = opt_params || {};
        params.input = input;
        try {
          this.parseInput_(cm, inputStream, params);
        } catch(e) {
          showConfirm(cm, e.toString());
          throw e;
        }

        if (vim.visualMode) {
          exitVisualMode(cm);
        }

        var command;
        var commandName;
        if (!params.commandName) {
          // If only a line range is defined, move to the line.
          if (params.line !== undefined) {
            commandName = 'move';
          }
        } else {
          command = this.matchCommand_(params.commandName);
          if (command) {
            commandName = command.name;
            if (command.excludeFromCommandHistory) {
              commandHistoryRegister.setText(previousCommand);
            }
            this.parseCommandArgs_(inputStream, params, command);
            if (command.type == 'exToKey') {
              // Handle Ex to Key mapping.
              doKeyToKey(cm, command.toKeys, command);
              return;
            } else if (command.type == 'exToEx') {
              // Handle Ex to Ex mapping.
              this.processCommand(cm, command.toInput);
              return;
            }
          }
        }
        if (!commandName) {
          showConfirm(cm, 'Not an editor command ":' + input + '"');
          return;
        }
        try {
          exCommands[commandName](cm, params);
          // Possibly asynchronous commands (e.g. substitute, which might have a
          // user confirmation), are responsible for calling the callback when
          // done. All others have it taken care of for them here.
          if ((!command || !command.possiblyAsync) && params.callback) {
            params.callback();
          }
        } catch(e) {
          showConfirm(cm, e.toString());
          throw e;
        }
      },
      parseInput_: function(cm, inputStream, result) {
        inputStream.eatWhile(':');
        // Parse range.
        if (inputStream.eat('%')) {
          result.line = cm.firstLine();
          result.lineEnd = cm.lastLine();
        } else {
          result.line = this.parseLineSpec_(cm, inputStream);
          if (result.line !== undefined && inputStream.eat(',')) {
            result.lineEnd = this.parseLineSpec_(cm, inputStream);
          }
        }

        if (result.line == undefined) {
          if (cm.state.vim.visualMode) {
            var pos = getMarkPos(cm, cm.state.vim, '<');
            result.selectionLine = pos && pos.line;
            pos = getMarkPos(cm, cm.state.vim, '>');
            result.selectionLineEnd = pos && pos.line;
          } else {
            result.selectionLine = cm.getCursor().line;
          }
        } else {
          result.selectionLine = result.line;
          result.selectionLineEnd = result.lineEnd;
        }

        // Parse command name.
        var commandMatch = inputStream.match(/^(\w+|!!|@@|[!#&*<=>@~])/);
        if (commandMatch) {
          result.commandName = commandMatch[1];
        } else {
          result.commandName = inputStream.match(/.*/)[0];
        }

        return result;
      },
      parseLineSpec_: function(cm, inputStream) {
        var numberMatch = inputStream.match(/^(\d+)/);
        if (numberMatch) {
          // Absolute line number plus offset (N+M or N-M) is probably a typo,
          // not something the user actually wanted. (NB: vim does allow this.)
          return parseInt(numberMatch[1], 10) - 1;
        }
        switch (inputStream.next()) {
          case '.':
            return this.parseLineSpecOffset_(inputStream, cm.getCursor().line);
          case '$':
            return this.parseLineSpecOffset_(inputStream, cm.lastLine());
          case '\'':
            var markName = inputStream.next();
            var markPos = getMarkPos(cm, cm.state.vim, markName);
            if (!markPos) throw new Error('Mark not set');
            return this.parseLineSpecOffset_(inputStream, markPos.line);
          case '-':
          case '+':
            inputStream.backUp(1);
            // Offset is relative to current line if not otherwise specified.
            return this.parseLineSpecOffset_(inputStream, cm.getCursor().line);
          default:
            inputStream.backUp(1);
            return undefined;
        }
      },
      parseLineSpecOffset_: function(inputStream, line) {
        var offsetMatch = inputStream.match(/^([+-])?(\d+)/);
        if (offsetMatch) {
          var offset = parseInt(offsetMatch[2], 10);
          if (offsetMatch[1] == "-") {
            line -= offset;
          } else {
            line += offset;
          }
        }
        return line;
      },
      parseCommandArgs_: function(inputStream, params, command) {
        if (inputStream.eol()) {
          return;
        }
        params.argString = inputStream.match(/.*/)[0];
        // Parse command-line arguments
        var delim = command.argDelimiter || /\s+/;
        var args = trim(params.argString).split(delim);
        if (args.length && args[0]) {
          params.args = args;
        }
      },
      matchCommand_: function(commandName) {
        // Return the command in the command map that matches the shortest
        // prefix of the passed in command name. The match is guaranteed to be
        // unambiguous if the defaultExCommandMap's shortNames are set up
        // correctly. (see @code{defaultExCommandMap}).
        for (var i = commandName.length; i > 0; i--) {
          var prefix = commandName.substring(0, i);
          if (this.commandMap_[prefix]) {
            var command = this.commandMap_[prefix];
            if (command.name.indexOf(commandName) === 0) {
              return command;
            }
          }
        }
        return null;
      },
      buildCommandMap_: function() {
        this.commandMap_ = {};
        for (var i = 0; i < defaultExCommandMap.length; i++) {
          var command = defaultExCommandMap[i];
          var key = command.shortName || command.name;
          this.commandMap_[key] = command;
        }
      },
      map: function(lhs, rhs, ctx, noremap) {
        if (lhs != ':' && lhs.charAt(0) == ':') {
          if (ctx) { throw Error('Mode not supported for ex mappings'); }
          var commandName = lhs.substring(1);
          if (rhs != ':' && rhs.charAt(0) == ':') {
            // Ex to Ex mapping
            this.commandMap_[commandName] = {
              name: commandName,
              type: 'exToEx',
              toInput: rhs.substring(1),
              user: true
            };
          } else {
            // Ex to key mapping
            this.commandMap_[commandName] = {
              name: commandName,
              type: 'exToKey',
              toKeys: rhs,
              user: true
            };
          }
        } else {
          // Key to key or ex mapping
          var mapping = {
            keys: lhs,
            type: 'keyToKey',
            toKeys: rhs,
            noremap: !!noremap
          };
          if (ctx) { mapping.context = ctx; }
          defaultKeymap.unshift(mapping);
        }
      },
      unmap: function(lhs, ctx) {
        if (lhs != ':' && lhs.charAt(0) == ':') {
          // Ex to Ex or Ex to key mapping
          if (ctx) { throw Error('Mode not supported for ex mappings'); }
          var commandName = lhs.substring(1);
          if (this.commandMap_[commandName] && this.commandMap_[commandName].user) {
            delete this.commandMap_[commandName];
            return true;
          }
        } else {
          // Key to Ex or key to key mapping
          var keys = lhs;
          for (var i = 0; i < defaultKeymap.length; i++) {
            if (keys == defaultKeymap[i].keys
                && defaultKeymap[i].context === ctx) {
              defaultKeymap.splice(i, 1);
              return true;
            }
          }
        }
      }
    };

    var exCommands = {
      colorscheme: function(cm, params) {
        if (!params.args || params.args.length < 1) {
          showConfirm(cm, cm.getOption('theme'));
          return;
        }
        cm.setOption('theme', params.args[0]);
      },
      map: function(cm, params, ctx, defaultOnly) {
        var mapArgs = params.args;
        if (!mapArgs || mapArgs.length < 2) {
          if (cm) {
            showConfirm(cm, 'Invalid mapping: ' + params.input);
          }
          return;
        }
        exCommandDispatcher.map(mapArgs[0], mapArgs[1], ctx, defaultOnly);
      },
      imap: function(cm, params) { this.map(cm, params, 'insert'); },
      nmap: function(cm, params) { this.map(cm, params, 'normal'); },
      vmap: function(cm, params) { this.map(cm, params, 'visual'); },
      omap: function(cm, params) { this.map(cm, params, 'operatorPending'); },
      noremap: function(cm, params) { this.map(cm, params, undefined, true); },
      inoremap: function(cm, params) { this.map(cm, params, 'insert', true); },
      nnoremap: function(cm, params) { this.map(cm, params, 'normal', true); },
      vnoremap: function(cm, params) { this.map(cm, params, 'visual', true); },
      onoremap: function(cm, params) { this.map(cm, params, 'operatorPending', true); },
      unmap: function(cm, params, ctx) {
        var mapArgs = params.args;
        if (!mapArgs || mapArgs.length < 1 || !exCommandDispatcher.unmap(mapArgs[0], ctx)) {
          if (cm) {
            showConfirm(cm, 'No such mapping: ' + params.input);
          }
        }
      },
      mapclear: function(cm, params) { vimApi.mapclear(); },
      imapclear: function(cm, params) { vimApi.mapclear('insert'); },
      nmapclear: function(cm, params) { vimApi.mapclear('normal'); },
      vmapclear: function(cm, params) { vimApi.mapclear('visual'); },
      omapclear: function(cm, params) { vimApi.mapclear('operatorPending'); },
      move: function(cm, params) {
        commandDispatcher.processCommand(cm, cm.state.vim, {
            type: 'motion',
            motion: 'moveToLineOrEdgeOfDocument',
            motionArgs: { forward: false, explicitRepeat: true,
              linewise: true },
            repeatOverride: params.line+1});
      },
      set: function(cm, params) {
        var setArgs = params.args;
        // Options passed through to the setOption/getOption calls. May be passed in by the
        // local/global versions of the set command
        var setCfg = params.setCfg || {};
        if (!setArgs || setArgs.length < 1) {
          if (cm) {
            showConfirm(cm, 'Invalid mapping: ' + params.input);
          }
          return;
        }
        var expr = setArgs[0].split('=');
        var optionName = expr[0];
        var value = expr[1];
        var forceGet = false;
        var forceToggle = false;

        if (optionName.charAt(optionName.length - 1) == '?') {
          // If post-fixed with ?, then the set is actually a get.
          if (value) { throw Error('Trailing characters: ' + params.argString); }
          optionName = optionName.substring(0, optionName.length - 1);
          forceGet = true;
        } else if (optionName.charAt(optionName.length - 1) == '!') {
          optionName = optionName.substring(0, optionName.length - 1);
          forceToggle = true;
        }
        if (value === undefined && optionName.substring(0, 2) == 'no') {
          // To set boolean options to false, the option name is prefixed with
          // 'no'.
          optionName = optionName.substring(2);
          value = false;
        }

        var optionIsBoolean = options[optionName] && options[optionName].type == 'boolean';
        if (optionIsBoolean) {
          if (forceToggle) {
            value = !getOption(optionName, cm, setCfg);
          } else if (value == undefined) {
            // Calling set with a boolean option sets it to true.
            value = true;
          }
        }
        // If no value is provided, then we assume this is a get.
        if (!optionIsBoolean && value === undefined || forceGet) {
          var oldValue = getOption(optionName, cm, setCfg);
          if (oldValue instanceof Error) {
            showConfirm(cm, oldValue.message);
          } else if (oldValue === true || oldValue === false) {
            showConfirm(cm, ' ' + (oldValue ? '' : 'no') + optionName);
          } else {
            showConfirm(cm, '  ' + optionName + '=' + oldValue);
          }
        } else {
          var setOptionReturn = setOption(optionName, value, cm, setCfg);
          if (setOptionReturn instanceof Error) {
            showConfirm(cm, setOptionReturn.message);
          }
        }
      },
      setlocal: function (cm, params) {
        // setCfg is passed through to setOption
        params.setCfg = {scope: 'local'};
        this.set(cm, params);
      },
      setglobal: function (cm, params) {
        // setCfg is passed through to setOption
        params.setCfg = {scope: 'global'};
        this.set(cm, params);
      },
      registers: function(cm, params) {
        var regArgs = params.args;
        var registers = vimGlobalState.registerController.registers;
        var regInfo = '----------Registers----------\n\n';
        if (!regArgs) {
          for (var registerName in registers) {
            var text = registers[registerName].toString();
            if (text.length) {
              regInfo += '"' + registerName + '    ' + text + '\n'
            }
          }
        } else {
          var registerName;
          regArgs = regArgs.join('');
          for (var i = 0; i < regArgs.length; i++) {
            registerName = regArgs.charAt(i);
            if (!vimGlobalState.registerController.isValidRegister(registerName)) {
              continue;
            }
            var register = registers[registerName] || new Register();
            regInfo += '"' + registerName + '    ' + register.toString() + '\n'
          }
        }
        showConfirm(cm, regInfo);
      },
      sort: function(cm, params) {
        var reverse, ignoreCase, unique, number, pattern;
        function parseArgs() {
          if (params.argString) {
            var args = new CodeMirror.StringStream(params.argString);
            if (args.eat('!')) { reverse = true; }
            if (args.eol()) { return; }
            if (!args.eatSpace()) { return 'Invalid arguments'; }
            var opts = args.match(/([dinuox]+)?\s*(\/.+\/)?\s*/);
            if (!opts && !args.eol()) { return 'Invalid arguments'; }
            if (opts[1]) {
              ignoreCase = opts[1].indexOf('i') != -1;
              unique = opts[1].indexOf('u') != -1;
              var decimal = opts[1].indexOf('d') != -1 || opts[1].indexOf('n') != -1 && 1;
              var hex = opts[1].indexOf('x') != -1 && 1;
              var octal = opts[1].indexOf('o') != -1 && 1;
              if (decimal + hex + octal > 1) { return 'Invalid arguments'; }
              number = decimal && 'decimal' || hex && 'hex' || octal && 'octal';
            }
            if (opts[2]) {
              pattern = new RegExp(opts[2].substr(1, opts[2].length - 2), ignoreCase ? 'i' : '');
            }
          }
        }
        var err = parseArgs();
        if (err) {
          showConfirm(cm, err + ': ' + params.argString);
          return;
        }
        var lineStart = params.line || cm.firstLine();
        var lineEnd = params.lineEnd || params.line || cm.lastLine();
        if (lineStart == lineEnd) { return; }
        var curStart = new Pos(lineStart, 0);
        var curEnd = new Pos(lineEnd, lineLength(cm, lineEnd));
        var text = cm.getRange(curStart, curEnd).split('\n');
        var numberRegex = pattern ? pattern :
           (number == 'decimal') ? /(-?)([\d]+)/ :
           (number == 'hex') ? /(-?)(?:0x)?([0-9a-f]+)/i :
           (number == 'octal') ? /([0-7]+)/ : null;
        var radix = (number == 'decimal') ? 10 : (number == 'hex') ? 16 : (number == 'octal') ? 8 : null;
        var numPart = [], textPart = [];
        if (number || pattern) {
          for (var i = 0; i < text.length; i++) {
            var matchPart = pattern ? text[i].match(pattern) : null;
            if (matchPart && matchPart[0] != '') {
              numPart.push(matchPart);
            } else if (!pattern && numberRegex.exec(text[i])) {
              numPart.push(text[i]);
            } else {
              textPart.push(text[i]);
            }
          }
        } else {
          textPart = text;
        }
        function compareFn(a, b) {
          if (reverse) { var tmp; tmp = a; a = b; b = tmp; }
          if (ignoreCase) { a = a.toLowerCase(); b = b.toLowerCase(); }
          var anum = number && numberRegex.exec(a);
          var bnum = number && numberRegex.exec(b);
          if (!anum) { return a < b ? -1 : 1; }
          anum = parseInt((anum[1] + anum[2]).toLowerCase(), radix);
          bnum = parseInt((bnum[1] + bnum[2]).toLowerCase(), radix);
          return anum - bnum;
        }
        function comparePatternFn(a, b) {
          if (reverse) { var tmp; tmp = a; a = b; b = tmp; }
          if (ignoreCase) { a[0] = a[0].toLowerCase(); b[0] = b[0].toLowerCase(); }
          return (a[0] < b[0]) ? -1 : 1;
        }
        numPart.sort(pattern ? comparePatternFn : compareFn);
        if (pattern) {
          for (var i = 0; i < numPart.length; i++) {
            numPart[i] = numPart[i].input;
          }
        } else if (!number) { textPart.sort(compareFn); }
        text = (!reverse) ? textPart.concat(numPart) : numPart.concat(textPart);
        if (unique) { // Remove duplicate lines
          var textOld = text;
          var lastLine;
          text = [];
          for (var i = 0; i < textOld.length; i++) {
            if (textOld[i] != lastLine) {
              text.push(textOld[i]);
            }
            lastLine = textOld[i];
          }
        }
        cm.replaceRange(text.join('\n'), curStart, curEnd);
      },
      vglobal: function(cm, params) {
        // global inspects params.commandName
        this.global(cm, params);
      },
      normal: function(cm, params) {
        var argString = params.argString;
        if (argString && argString[0] == '!') {
            argString = argString.slice(1);
            noremap = true;
        }
        argString = argString.trimStart();
        if (!argString) {
          showConfirm(cm, 'Argument is required.');
          return;
        }
        var line = params.line;
        if (typeof line == 'number') {
          var lineEnd = isNaN(params.lineEnd) ? line : params.lineEnd;
          for (var i = line; i <= lineEnd; i++) {
            cm.setCursor(i, 0);
            doKeyToKey(cm, params.argString.trimStart());
            if (cm.state.vim.insertMode) {
              exitInsertMode(cm, true);
            }
          }
        } else {
          doKeyToKey(cm, params.argString.trimStart());
          if (cm.state.vim.insertMode) {
            exitInsertMode(cm, true);
          }
        }
      },
      global: function(cm, params) {
        // a global command is of the form
        // :[range]g/pattern/[cmd]
        // argString holds the string /pattern/[cmd]
        var argString = params.argString;
        if (!argString) {
          showConfirm(cm, 'Regular Expression missing from global');
          return;
        }
        var inverted = params.commandName[0] === 'v';
        if (argString[0] === '!' && params.commandName[0] === 'g') {
          inverted = true;
          argString = argString.slice(1);
        }
        // range is specified here
        var lineStart = (params.line !== undefined) ? params.line : cm.firstLine();
        var lineEnd = params.lineEnd || params.line || cm.lastLine();
        // get the tokens from argString
        var tokens = splitBySlash(argString);
        var regexPart = argString, cmd;
        if (tokens.length) {
          regexPart = tokens[0];
          cmd = tokens.slice(1, tokens.length).join('/');
        }
        if (regexPart) {
          // If regex part is empty, then use the previous query. Otherwise
          // use the regex part as the new query.
          try {
           updateSearchQuery(cm, regexPart, true /** ignoreCase */,
             true /** smartCase */);
          } catch (e) {
           showConfirm(cm, 'Invalid regex: ' + regexPart);
           return;
          }
        }
        // now that we have the regexPart, search for regex matches in the
        // specified range of lines
        var query = getSearchState(cm).getQuery();
        var matchedLines = [];
        for (var i = lineStart; i <= lineEnd; i++) {
          var line = cm.getLine(i);
          var matched = query.test(line);
          if (matched !== inverted) {
            matchedLines.push(cmd ? cm.getLineHandle(i) : line);
          }
        }
        // if there is no [cmd], just display the list of matched lines
        if (!cmd) {
          showConfirm(cm, matchedLines.join('\n'));
          return;
        }
        var index = 0;
        var nextCommand = function() {
          if (index < matchedLines.length) {
            var lineHandle = matchedLines[index++];
            var lineNum = cm.getLineNumber(lineHandle);
            if (lineNum == null) {
              nextCommand();
              return;
            }
            var command = (lineNum + 1) + cmd;
            exCommandDispatcher.processCommand(cm, command, {
              callback: nextCommand
            });
          } else if (cm.releaseLineHandles) {
            cm.releaseLineHandles();
          }
        };
        nextCommand();
      },
      substitute: function(cm, params) {
        if (!cm.getSearchCursor) {
          throw new Error('Search feature not available. Requires searchcursor.js or ' +
              'any other getSearchCursor implementation.');
        }
        var argString = params.argString;
        var tokens = argString ? splitBySeparator(argString, argString[0]) : [];
        var regexPart, replacePart = '', trailing, flagsPart, count;
        var confirm = false; // Whether to confirm each replace.
        var global = false; // True to replace all instances on a line, false to replace only 1.
        if (tokens.length) {
          regexPart = tokens[0];
          if (getOption('pcre') && regexPart !== '') {
              regexPart = new RegExp(regexPart).source; //normalize not escaped characters
          }
          replacePart = tokens[1];
          if (replacePart !== undefined) {
            if (getOption('pcre')) {
              replacePart = unescapeRegexReplace(replacePart.replace(/([^\\])&/g,"$1$$&"));
            } else {
              replacePart = translateRegexReplace(replacePart);
            }
            vimGlobalState.lastSubstituteReplacePart = replacePart;
          }
          trailing = tokens[2] ? tokens[2].split(' ') : [];
        } else {
          // either the argString is empty or its of the form ' hello/world'
          // actually splitBySlash returns a list of tokens
          // only if the string starts with a '/'
          if (argString && argString.length) {
            showConfirm(cm, 'Substitutions should be of the form ' +
                ':s/pattern/replace/');
            return;
          }
        }
        // After the 3rd slash, we can have flags followed by a space followed
        // by count.
        if (trailing) {
          flagsPart = trailing[0];
          count = parseInt(trailing[1]);
          if (flagsPart) {
            if (flagsPart.indexOf('c') != -1) {
              confirm = true;
            }
            if (flagsPart.indexOf('g') != -1) {
              global = true;
            }
            if (getOption('pcre')) {
               regexPart = regexPart + '/' + flagsPart;
            } else {
               regexPart = regexPart.replace(/\//g, "\\/") + '/' + flagsPart;
            }
          }
        }
        if (regexPart) {
          // If regex part is empty, then use the previous query. Otherwise use
          // the regex part as the new query.
          try {
            updateSearchQuery(cm, regexPart, true /** ignoreCase */,
              true /** smartCase */);
          } catch (e) {
            showConfirm(cm, 'Invalid regex: ' + regexPart);
            return;
          }
        }
        replacePart = replacePart || vimGlobalState.lastSubstituteReplacePart;
        if (replacePart === undefined) {
          showConfirm(cm, 'No previous substitute regular expression');
          return;
        }
        var state = getSearchState(cm);
        var query = state.getQuery();
        var lineStart = (params.line !== undefined) ? params.line : cm.getCursor().line;
        var lineEnd = params.lineEnd || lineStart;
        if (lineStart == cm.firstLine() && lineEnd == cm.lastLine()) {
          lineEnd = Infinity;
        }
        if (count) {
          lineStart = lineEnd;
          lineEnd = lineStart + count - 1;
        }
        var startPos = clipCursorToContent(cm, new Pos(lineStart, 0));
        var cursor = cm.getSearchCursor(query, startPos);
        doReplace(cm, confirm, global, lineStart, lineEnd, cursor, query, replacePart, params.callback);
      },
      startinsert: function(cm, params) {
        doKeyToKey(cm, params.argString == '!' ? 'A' : 'i', {});
      },
      redo: CodeMirror.commands.redo,
      undo: CodeMirror.commands.undo,
      write: function(cm) {
        if (CodeMirror.commands.save) {
          // If a save command is defined, call it.
          CodeMirror.commands.save(cm);
        } else if (cm.save) {
          // Saves to text area if no save command is defined and cm.save() is available.
          cm.save();
        }
      },
      nohlsearch: function(cm) {
        clearSearchHighlight(cm);
      },
      yank: function (cm) {
        var cur = copyCursor(cm.getCursor());
        var line = cur.line;
        var lineText = cm.getLine(line);
        vimGlobalState.registerController.pushText(
          '0', 'yank', lineText, true, true);
      },
      delete: function(cm, params) {
        var line = params.selectionLine;
        var lineEnd = isNaN(params.selectionLineEnd) ? line : params.selectionLineEnd;
        operators.delete(cm, {linewise: true}, [
          { anchor: new Pos(line, 0),
            head: new Pos(lineEnd + 1, 0) }
        ]);
      },
      join: function(cm, params) {
        var line = params.selectionLine;
        var lineEnd = isNaN(params.selectionLineEnd) ? line : params.selectionLineEnd;
        cm.setCursor(new Pos(line, 0));
        actions.joinLines(cm, {repeat: lineEnd - line}, cm.state.vim);
      },
      delmarks: function(cm, params) {
        if (!params.argString || !trim(params.argString)) {
          showConfirm(cm, 'Argument required');
          return;
        }

        var state = cm.state.vim;
        var stream = new CodeMirror.StringStream(trim(params.argString));
        while (!stream.eol()) {
          stream.eatSpace();

          // Record the streams position at the beginning of the loop for use
          // in error messages.
          var count = stream.pos;

          if (!stream.match(/[a-zA-Z]/, false)) {
            showConfirm(cm, 'Invalid argument: ' + params.argString.substring(count));
            return;
          }

          var sym = stream.next();
          // Check if this symbol is part of a range
          if (stream.match('-', true)) {
            // This symbol is part of a range.

            // The range must terminate at an alphabetic character.
            if (!stream.match(/[a-zA-Z]/, false)) {
              showConfirm(cm, 'Invalid argument: ' + params.argString.substring(count));
              return;
            }

            var startMark = sym;
            var finishMark = stream.next();
            // The range must terminate at an alphabetic character which
            // shares the same case as the start of the range.
            if (isLowerCase(startMark) && isLowerCase(finishMark) ||
                isUpperCase(startMark) && isUpperCase(finishMark)) {
              var start = startMark.charCodeAt(0);
              var finish = finishMark.charCodeAt(0);
              if (start >= finish) {
                showConfirm(cm, 'Invalid argument: ' + params.argString.substring(count));
                return;
              }

              // Because marks are always ASCII values, and we have
              // determined that they are the same case, we can use
              // their char codes to iterate through the defined range.
              for (var j = 0; j <= finish - start; j++) {
                var mark = String.fromCharCode(start + j);
                delete state.marks[mark];
              }
            } else {
              showConfirm(cm, 'Invalid argument: ' + startMark + '-');
              return;
            }
          } else {
            // This symbol is a valid mark, and is not part of a range.
            delete state.marks[sym];
          }
        }
      }
    };

    var exCommandDispatcher = new ExCommandDispatcher();

    /**
    * @param {CodeMirror} cm CodeMirror instance we are in.
    * @param {boolean} confirm Whether to confirm each replace.
    * @param {Cursor} lineStart Line to start replacing from.
    * @param {Cursor} lineEnd Line to stop replacing at.
    * @param {RegExp} query Query for performing matches with.
    * @param {string} replaceWith Text to replace matches with. May contain $1,
    *     $2, etc for replacing captured groups using JavaScript replace.
    * @param {function()} callback A callback for when the replace is done.
    */
    function doReplace(cm, confirm, global, lineStart, lineEnd, searchCursor, query,
        replaceWith, callback) {
      // Set up all the functions.
      cm.state.vim.exMode = true;
      var done = false;
      var lastPos, modifiedLineNumber, joined;
      function replaceAll() {
        cm.operation(function() {
          while (!done) {
            replace();
            next();
          }
          stop();
        });
      }
      function replace() {
        var text = cm.getRange(searchCursor.from(), searchCursor.to());
        var newText = text.replace(query, replaceWith);
        var unmodifiedLineNumber = searchCursor.to().line;
        searchCursor.replace(newText);
        modifiedLineNumber = searchCursor.to().line;
        lineEnd += modifiedLineNumber - unmodifiedLineNumber;
        joined = modifiedLineNumber < unmodifiedLineNumber;
      }
      function findNextValidMatch() {
        var lastMatchTo = lastPos && copyCursor(searchCursor.to());
        var match = searchCursor.findNext();
        if (match && !match[0] && lastMatchTo && cursorEqual(searchCursor.from(), lastMatchTo)) {
          match = searchCursor.findNext();
        }
        return match;
      }
      function next() {
        // The below only loops to skip over multiple occurrences on the same
        // line when 'global' is not true.
        while(findNextValidMatch() &&
              isInRange(searchCursor.from(), lineStart, lineEnd)) {
          if (!global && searchCursor.from().line == modifiedLineNumber && !joined) {
            continue;
          }
          cm.scrollIntoView(searchCursor.from(), 30);
          cm.setSelection(searchCursor.from(), searchCursor.to());
          lastPos = searchCursor.from();
          done = false;
          return;
        }
        done = true;
      }
      function stop(close) {
        if (close) { close(); }
        cm.focus();
        if (lastPos) {
          cm.setCursor(lastPos);
          var vim = cm.state.vim;
          vim.exMode = false;
          vim.lastHPos = vim.lastHSPos = lastPos.ch;
        }
        if (callback) { callback(); }
      }
      function onPromptKeyDown(e, _value, close) {
        // Swallow all keys.
        CodeMirror.e_stop(e);
        var keyName = vimKeyFromEvent(e);
        switch (keyName) {
          case 'y':
            replace(); next(); break;
          case 'n':
            next(); break;
          case 'a':
            // replaceAll contains a call to close of its own. We don't want it
            // to fire too early or multiple times.
            var savedCallback = callback;
            callback = undefined;
            cm.operation(replaceAll);
            callback = savedCallback;
            break;
          case 'l':
            replace();
            // fall through and exit.
          case 'q':
          case '<Esc>':
          case '<C-c>':
          case '<C-[>':
            stop(close);
            break;
        }
        if (done) { stop(close); }
        return true;
      }

      // Actually do replace.
      next();
      if (done) {
        showConfirm(cm, 'No matches for ' + query.source);
        return;
      }
      if (!confirm) {
        replaceAll();
        if (callback) { callback(); }
        return;
      }
      showPrompt(cm, {
        prefix: dom('span', 'replace with ', dom('strong', replaceWith), ' (y/n/a/q/l)'),
        onKeyDown: onPromptKeyDown
      });
    }

    function exitInsertMode(cm, keepCursor) {
      var vim = cm.state.vim;
      var macroModeState = vimGlobalState.macroModeState;
      var insertModeChangeRegister = vimGlobalState.registerController.getRegister('.');
      var isPlaying = macroModeState.isPlaying;
      var lastChange = macroModeState.lastInsertModeChanges;
      if (!isPlaying) {
        cm.off('change', onChange);
        if (vim.insertEnd) vim.insertEnd.clear();
        vim.insertEnd = null;
        CodeMirror.off(cm.getInputField(), 'keydown', onKeyEventTargetKeyDown);
      }
      if (!isPlaying && vim.insertModeRepeat > 1) {
        // Perform insert mode repeat for commands like 3,a and 3,o.
        repeatLastEdit(cm, vim, vim.insertModeRepeat - 1,
            true /** repeatForInsert */);
        vim.lastEditInputState.repeatOverride = vim.insertModeRepeat;
      }
      delete vim.insertModeRepeat;
      vim.insertMode = false;
      if (!keepCursor) {
        cm.setCursor(cm.getCursor().line, cm.getCursor().ch-1);
      }
      cm.setOption('keyMap', 'vim');
      cm.setOption('disableInput', true);
      cm.toggleOverwrite(false); // exit replace mode if we were in it.
      // update the ". register before exiting insert mode
      insertModeChangeRegister.setText(lastChange.changes.join(''));
      CodeMirror.signal(cm, "vim-mode-change", {mode: "normal"});
      if (macroModeState.isRecording) {
        logInsertModeChange(macroModeState);
      }
    }

    function _mapCommand(command) {
      defaultKeymap.unshift(command);
    }

    function mapCommand(keys, type, name, args, extra) {
      var command = {keys: keys, type: type};
      command[type] = name;
      command[type + "Args"] = args;
      for (var key in extra)
        command[key] = extra[key];
      _mapCommand(command);
    }

    // The timeout in milliseconds for the two-character ESC keymap should be
    // adjusted according to your typing speed to prevent false positives.
    defineOption('insertModeEscKeysTimeout', 200, 'number');


    function executeMacroRegister(cm, vim, macroModeState, registerName) {
      var register = vimGlobalState.registerController.getRegister(registerName);
      if (registerName == ':') {
        // Read-only register containing last Ex command.
        if (register.keyBuffer[0]) {
          exCommandDispatcher.processCommand(cm, register.keyBuffer[0]);
        }
        macroModeState.isPlaying = false;
        return;
      }
      var keyBuffer = register.keyBuffer;
      var imc = 0;
      macroModeState.isPlaying = true;
      macroModeState.replaySearchQueries = register.searchQueries.slice(0);
      for (var i = 0; i < keyBuffer.length; i++) {
        var text = keyBuffer[i];
        var match, key;
        while (text) {
          // Pull off one command key, which is either a single character
          // or a special sequence wrapped in '<' and '>', e.g. '<Space>'.
          match = (/<\w+-.+?>|<\w+>|./).exec(text);
          key = match[0];
          text = text.substring(match.index + key.length);
          vimApi.handleKey(cm, key, 'macro');
          if (vim.insertMode) {
            var changes = register.insertModeChanges[imc++].changes;
            vimGlobalState.macroModeState.lastInsertModeChanges.changes =
                changes;
            repeatInsertModeChanges(cm, changes, 1);
            exitInsertMode(cm);
          }
        }
      }
      macroModeState.isPlaying = false;
    }

    function logKey(macroModeState, key) {
      if (macroModeState.isPlaying) { return; }
      var registerName = macroModeState.latestRegister;
      var register = vimGlobalState.registerController.getRegister(registerName);
      if (register) {
        register.pushText(key);
      }
    }

    function logInsertModeChange(macroModeState) {
      if (macroModeState.isPlaying) { return; }
      var registerName = macroModeState.latestRegister;
      var register = vimGlobalState.registerController.getRegister(registerName);
      if (register && register.pushInsertModeChanges) {
        register.pushInsertModeChanges(macroModeState.lastInsertModeChanges);
      }
    }

    function logSearchQuery(macroModeState, query) {
      if (macroModeState.isPlaying) { return; }
      var registerName = macroModeState.latestRegister;
      var register = vimGlobalState.registerController.getRegister(registerName);
      if (register && register.pushSearchQuery) {
        register.pushSearchQuery(query);
      }
    }

    /**
     * Listens for changes made in insert mode.
     * Should only be active in insert mode.
     */
    function onChange(cm, changeObj) {
      var macroModeState = vimGlobalState.macroModeState;
      var lastChange = macroModeState.lastInsertModeChanges;
      if (!macroModeState.isPlaying) {
        var vim = cm.state.vim;
        while(changeObj) {
          lastChange.expectCursorActivityForChange = true;
          if (lastChange.ignoreCount > 1) {
            lastChange.ignoreCount--;
          } else if (changeObj.origin == '+input' || changeObj.origin == 'paste'
              || changeObj.origin === undefined /* only in testing */) {
            var selectionCount = cm.listSelections().length;
            if (selectionCount > 1)
              lastChange.ignoreCount = selectionCount;
            var text = changeObj.text.join('\n');
            if (lastChange.maybeReset) {
              lastChange.changes = [];
              lastChange.maybeReset = false;
            }
            if (text) {
              if (cm.state.overwrite && !/\n/.test(text)) {
                lastChange.changes.push([text]);
              } else {
                if (text.length > 1) {
                  var insertEnd = vim && vim.insertEnd && vim.insertEnd.find()
                  var cursor = cm.getCursor();
                  if (insertEnd && insertEnd.line == cursor.line) {
                    var offset = insertEnd.ch - cursor.ch;
                    if (offset > 0 && offset < text.length) {
                      lastChange.changes.push([text, offset]);
                      text = '';
                    }
                  }
                }
                if (text) lastChange.changes.push(text);
              }
            }
          }
          // Change objects may be chained with next.
          changeObj = changeObj.next;
        }
      }
    }

    /**
    * Listens for any kind of cursor activity on CodeMirror.
    */
    function onCursorActivity(cm) {
      var vim = cm.state.vim;
      if (vim.insertMode) {
        // Tracking cursor activity in insert mode (for macro support).
        var macroModeState = vimGlobalState.macroModeState;
        if (macroModeState.isPlaying) { return; }
        var lastChange = macroModeState.lastInsertModeChanges;
        if (lastChange.expectCursorActivityForChange) {
          lastChange.expectCursorActivityForChange = false;
        } else {
          // Cursor moved outside the context of an edit. Reset the change.
          lastChange.maybeReset = true;
          if (vim.insertEnd) vim.insertEnd.clear();
          vim.insertEnd = cm.setBookmark(cm.getCursor(), {insertLeft: true});
        }
      } else if (!cm.curOp.isVimOp) {
        handleExternalSelection(cm, vim);
      }
    }
    function handleExternalSelection(cm, vim, keepHPos) {
      var anchor = cm.getCursor('anchor');
      var head = cm.getCursor('head');
      // Enter or exit visual mode to match mouse selection.
      if (vim.visualMode && !cm.somethingSelected()) {
        exitVisualMode(cm, false);
      } else if (!vim.visualMode && !vim.insertMode && cm.somethingSelected()) {
        vim.visualMode = true;
        vim.visualLine = false;
        CodeMirror.signal(cm, "vim-mode-change", {mode: "visual"});
      }
      if (vim.visualMode) {
        // Bind CodeMirror selection model to vim selection model.
        // Mouse selections are considered visual characterwise.
        var headOffset = !cursorIsBefore(head, anchor) ? -1 : 0;
        var anchorOffset = cursorIsBefore(head, anchor) ? -1 : 0;
        head = offsetCursor(head, 0, headOffset);
        anchor = offsetCursor(anchor, 0, anchorOffset);
        vim.sel = {
          anchor: anchor,
          head: head
        };
        updateMark(cm, vim, '<', cursorMin(head, anchor));
        updateMark(cm, vim, '>', cursorMax(head, anchor));
      } else if (!vim.insertMode && !keepHPos) {
        // Reset lastHPos if selection was modified by something outside of vim mode e.g. by mouse.
        vim.lastHPos = cm.getCursor().ch;
      }
    }

    /** Wrapper for special keys pressed in insert mode */
    function InsertModeKey(keyName, e) {
      this.keyName = keyName;
      this.key = e.key;
      this.ctrlKey = e.ctrlKey;
      this.altKey = e.altKey;
      this.metaKey = e.metaKey;
      this.shiftKey = e.shiftKey;
    }

    /**
    * Handles raw key down events from the text area.
    * - Should only be active in insert mode.
    * - For recording deletes in insert mode.
    */
    function onKeyEventTargetKeyDown(e) {
      var macroModeState = vimGlobalState.macroModeState;
      var lastChange = macroModeState.lastInsertModeChanges;
      var keyName = CodeMirror.keyName ? CodeMirror.keyName(e) : e.key;
      if (!keyName) { return; }
      
      if (keyName.indexOf('Delete') != -1 || keyName.indexOf('Backspace') != -1) {
        if (lastChange.maybeReset) {
          lastChange.changes = [];
          lastChange.maybeReset = false;
        }
        lastChange.changes.push(new InsertModeKey(keyName, e));
      }
    }

    /**
     * Repeats the last edit, which includes exactly 1 command and at most 1
     * insert. Operator and motion commands are read from lastEditInputState,
     * while action commands are read from lastEditActionCommand.
     *
     * If repeatForInsert is true, then the function was called by
     * exitInsertMode to repeat the insert mode changes the user just made. The
     * corresponding enterInsertMode call was made with a count.
     */
    function repeatLastEdit(cm, vim, repeat, repeatForInsert) {
      var macroModeState = vimGlobalState.macroModeState;
      macroModeState.isPlaying = true;
      var isAction = !!vim.lastEditActionCommand;
      var cachedInputState = vim.inputState;
      function repeatCommand() {
        if (isAction) {
          commandDispatcher.processAction(cm, vim, vim.lastEditActionCommand);
        } else {
          commandDispatcher.evalInput(cm, vim);
        }
      }
      function repeatInsert(repeat) {
        if (macroModeState.lastInsertModeChanges.changes.length > 0) {
          // For some reason, repeat cw in desktop VIM does not repeat
          // insert mode changes. Will conform to that behavior.
          repeat = !vim.lastEditActionCommand ? 1 : repeat;
          var changeObject = macroModeState.lastInsertModeChanges;
          repeatInsertModeChanges(cm, changeObject.changes, repeat);
        }
      }
      vim.inputState = vim.lastEditInputState;
      if (isAction && vim.lastEditActionCommand.interlaceInsertRepeat) {
        // o and O repeat have to be interlaced with insert repeats so that the
        // insertions appear on separate lines instead of the last line.
        for (var i = 0; i < repeat; i++) {
          repeatCommand();
          repeatInsert(1);
        }
      } else {
        if (!repeatForInsert) {
          // Hack to get the cursor to end up at the right place. If I is
          // repeated in insert mode repeat, cursor will be 1 insert
          // change set left of where it should be.
          repeatCommand();
        }
        repeatInsert(repeat);
      }
      vim.inputState = cachedInputState;
      if (vim.insertMode && !repeatForInsert) {
        // Don't exit insert mode twice. If repeatForInsert is set, then we
        // were called by an exitInsertMode call lower on the stack.
        exitInsertMode(cm);
      }
      macroModeState.isPlaying = false;
    }

    function sendCmKey(cm, key) {
      CodeMirror.lookupKey(key, 'vim-insert', function keyHandler(binding) {
        if (typeof binding == 'string') {
          CodeMirror.commands[binding](cm);
        } else {
          binding(cm);
        }
        return true;
      });
    }
    function repeatInsertModeChanges(cm, changes, repeat) {
      var head = cm.getCursor('head');
      var visualBlock = vimGlobalState.macroModeState.lastInsertModeChanges.visualBlock;
      if (visualBlock) {
        // Set up block selection again for repeating the changes.
        selectForInsert(cm, head, visualBlock + 1);
        repeat = cm.listSelections().length;
        cm.setCursor(head);
      }
      for (var i = 0; i < repeat; i++) {
        if (visualBlock) {
          cm.setCursor(offsetCursor(head, i, 0));
        }
        for (var j = 0; j < changes.length; j++) {
          var change = changes[j];
          if (change instanceof InsertModeKey) {
            sendCmKey(cm, change.keyName, change);
          } else if (typeof change == "string") {
            cm.replaceSelection(change);
          } else {
            var start = cm.getCursor();
            var end = offsetCursor(start, 0, change[0].length - (change[1] || 0));
            cm.replaceRange(change[0], start, change[1] ? start: end);
            cm.setCursor(end);
          }
        }
      }
      if (visualBlock) {
        cm.setCursor(offsetCursor(head, 0, 1));
      }
    }

    // multiselect support
  // Initialize Vim and make it available as an API.
  CodeMirror.Vim = vimApi;

  var specialKeyAce = {'return':'CR',backspace:'BS','delete':'Del',esc:'Esc',
    left:'Left',right:'Right',up:'Up',down:'Down',space: 'Space',insert: 'Ins',
    home:'Home',end:'End',pageup:'PageUp',pagedown:'PageDown', enter: 'CR'
  };
  function lookupKey(hashId, key, e, vim) {
    if (key.length > 1 && key[0] == "n") {
      key = key.replace("numpad", "");
    }
    key = specialKeyAce[key] || key;
    var name = '';
    if (e.ctrlKey) { name += 'C-'; }
    if (e.altKey) { name += 'A-'; }
    if ((name || key.length > 1) && e.shiftKey) { name += 'S-'; }

    if (vim && !vim.expectLiteralNext && key.length == 1) {
      if (langmap.keymap && key in langmap.keymap) {
        if (langmap.remapCtrl !== false || !name)
          key = langmap.keymap[key];
      } else if (key.charCodeAt(0) > 255) {
        var code = e.code && e.code.slice(-1) || "";
        if (!e.shiftKey) code = code.toLowerCase();
        if (code) key = code;
      }
    }

    name += key;
    if (name.length > 1) { name = '<' + name + '>'; }
    return name;
  }
  var handleKey = vimApi.handleKey.bind(vimApi);
  vimApi.handleKey = function(cm, key, origin) {
    return cm.operation(function() {
      return handleKey(cm, key, origin);
    }, true);
  }
    function cloneVimState(state) {
      var n = new state.constructor();
      Object.keys(state).forEach(function(key) {
        if (key == "insertEnd") return;
        var o = state[key];
        if (Array.isArray(o))
          o = o.slice();
        else if (o && typeof o == "object" && o.constructor != Object)
          o = cloneVimState(o);
        n[key] = o;
      });
      if (state.sel) {
        n.sel = {
          head: state.sel.head && copyCursor(state.sel.head),
          anchor: state.sel.anchor && copyCursor(state.sel.anchor)
        };
      }
      return n;
    }
    function multiSelectHandleKey(cm, key, origin) {
      var isHandled = false;
      var vim = vimApi.maybeInitVimState_(cm);
      var visualBlock = vim.visualBlock || vim.wasInVisualBlock;

      var wasMultiselect = cm.ace.inMultiSelectMode;
      if (vim.wasInVisualBlock && !wasMultiselect) {
        vim.wasInVisualBlock = false;
      } else if (wasMultiselect && vim.visualBlock) {
         vim.wasInVisualBlock = true;
      }

    if (key == '<Esc>' && !vim.insertMode && !vim.visualMode && wasMultiselect) {
      cm.ace.exitMultiSelectMode();
    } else if (visualBlock || !wasMultiselect || cm.ace.inVirtualSelectionMode) {
      isHandled = vimApi.handleKey(cm, key, origin);
      } else {
        var old = cloneVimState(vim);
        var changeQueueList = vim.inputState.changeQueueList || [];

        cm.operation(function() {
          cm.curOp.isVimOp = true;
          var index = 0;
          cm.ace.forEachSelection(function() {
            var sel = cm.ace.selection;
            cm.state.vim.lastHPos = sel.$desiredColumn == null ? sel.lead.column : sel.$desiredColumn;
            cm.state.vim.inputState.changeQueue = changeQueueList[index];
            var head = cm.getCursor("head");
            var anchor = cm.getCursor("anchor");
            var headOffset = !cursorIsBefore(head, anchor) ? -1 : 0;
            var anchorOffset = cursorIsBefore(head, anchor) ? -1 : 0;
            head = offsetCursor(head, 0, headOffset);
            anchor = offsetCursor(anchor, 0, anchorOffset);
            cm.state.vim.sel.head = head;
            cm.state.vim.sel.anchor = anchor;

            isHandled = handleKey(cm, key, origin);
            sel.$desiredColumn = cm.state.vim.lastHPos == -1 ? null : cm.state.vim.lastHPos;
            // TODO why does cm.virtualSelectionMode check index?
            if (cm.ace.inVirtualSelectionMode) {
              changeQueueList[index] = cm.state.vim.inputState.changeQueue;
            }
            if (cm.virtualSelectionMode()) {
              cm.state.vim = cloneVimState(old);
            }
            index++;
          });
          if (cm.curOp.cursorActivity && !isHandled)
            cm.curOp.cursorActivity = false;
          vim.status = cm.state.vim.status;
          cm.state.vim = vim;
          vim.inputState.changeQueueList = changeQueueList;
          vim.inputState.changeQueue = null;
        }, true);
      }
      // some commands may bring visualMode and selection out of sync
      if (isHandled && !vim.visualMode && !vim.insert && vim.visualMode != cm.somethingSelected()) {
        handleExternalSelection(cm, vim, true);
      }
      return isHandled;
    }
    resetVimGlobalState();


  exports.CodeMirror = CodeMirror;
  var getVim = vimApi.maybeInitVimState_;
  exports.handler = {
    $id: "ace/keyboard/vim",
    drawCursor: function(element, pixelPos, config, sel, session) {
      var vim = this.state.vim || {};
      var w = config.characterWidth;
      var h = config.lineHeight;
      var top = pixelPos.top;
      var left = pixelPos.left;
      if (!vim.insertMode) {
        var isbackwards = !sel.cursor
            ? session.selection.isBackwards() || session.selection.isEmpty()
            : Range.comparePoints(sel.cursor, sel.start) <= 0;
        if (!isbackwards && left > w)
          left -= w;
      }
      if (!vim.insertMode && vim.status) {
        h = h / 2;
        top += h;
      }
      domLib.translate(element, left, top);
      domLib.setStyle(element.style, "width", w + "px");
      domLib.setStyle(element.style, "height", h + "px");
    },
    $getDirectionForHighlight: function (editor) {
      var cm = editor.state.cm;
      var vim = getVim(cm);
      if (!vim.insertMode) {
        return editor.session.selection.isBackwards() || editor.session.selection.isEmpty();
      }
    },
    handleKeyboard: function(data, hashId, key, keyCode, e) {
      var editor = data.editor;
      var cm = editor.state.cm;
      var vim = getVim(cm);
      if (keyCode == -1) return;

      // in non-insert mode we try to find the ascii key corresponding to the text in textarea
      // this is needed because in languages that use latin alphabet we want to get the key that browser sends to the textarea
      // and in non
      if (!vim.insertMode) {
        if (hashId == -1) {
          if (key.charCodeAt(0) > 0xFF) {
            if (data.inputKey) {
              key = data.inputKey;
              if (key && data.inputHash == 4)
                key = key.toUpperCase();
            }
          }
          data.inputChar = key;
        }
        else if (hashId == 4 || hashId == 0) {
          if (data.inputKey == key && data.inputHash == hashId && data.inputChar) {
            // on mac text input doesn't repeat
            key = data.inputChar;
            hashId = -1
          }
          else {
            data.inputChar = null;
            data.inputKey = key;
            data.inputHash = hashId;
          }
        }
        else {
          data.inputChar = data.inputKey = null;
        }
      }
      
      if (cm.state.overwrite && vim.insertMode && key == "backspace" && hashId == 0) {
        return {command: "gotoleft"}
      }

      // ctrl-c is special it both exits mode and copies text
      if (key == "c" && hashId == 1) { // key == "ctrl-c"
        if (!useragent.isMac && editor.getCopyText()) {
          editor.once("copy", function() {
            if (vim.insertMode) editor.selection.clearSelection();
            else cm.operation(function() { exitVisualMode(cm); });
          });
          return {command: "null", passEvent: true};
        }
      }

      if (key == "esc" && !vim.insertMode && !vim.visualMode && !cm.ace.inMultiSelectMode) {
        var searchState = getSearchState(cm);
        var overlay = searchState.getOverlay();
        if (overlay) cm.removeOverlay(overlay);
      }

      if (hashId == -1 || hashId & 1 || hashId === 0 && key.length > 1) {
        var insertMode = vim.insertMode;
        var name = lookupKey(hashId, key, e || {}, vim);
        if (vim.status == null)
          vim.status = "";
        var isHandled = multiSelectHandleKey(cm, name, 'user');
        vim = getVim(cm); // may be changed by multiSelectHandleKey
        if (isHandled && vim.status != null)
          vim.status += name;
        else if (vim.status == null)
          vim.status = "";
        cm._signal("changeStatus");
        if (!isHandled && (hashId != -1 || insertMode))
          return;
        return {command: "null", passEvent: !isHandled};
      }
    },
    attach: function(editor) {
      if (!editor.state) editor.state = {};
      var cm = new CodeMirror(editor);
      editor.state.cm = cm;
      editor.$vimModeHandler = this;
      enterVimMode(cm);
      getVim(cm).status = null;
      cm.on('vim-command-done', function() {
        if (cm.virtualSelectionMode()) return;
        getVim(cm).status = null;
        cm.ace._signal("changeStatus");
        cm.ace.session.markUndoGroup();
      });
      cm.on("changeStatus", function() {
        cm.ace.renderer.updateCursor();
        cm.ace._signal("changeStatus");
      });
      cm.on("vim-mode-change", function() {
        if (cm.virtualSelectionMode()) return;
        updateInputMode();
        cm._signal("changeStatus");
      });
      function updateInputMode() {
        var isIntsert = getVim(cm).insertMode;
        cm.ace.renderer.setStyle("normal-mode", !isIntsert);
        editor.textInput.setCommandMode(!isIntsert);
        // without this press and hodl popup in mac is shown in normal mode
        editor.renderer.$keepTextAreaAtCursor = isIntsert;
        editor.renderer.$blockCursor = !isIntsert;
      }
      updateInputMode();
      editor.renderer.$cursorLayer.drawCursor = this.drawCursor.bind(cm);
    },
    detach: function(editor) {
      var cm = editor.state.cm;
      leaveVimMode(cm);
      cm.destroy();
      editor.state.cm = null;
      editor.$vimModeHandler = null;
      editor.renderer.$cursorLayer.drawCursor = null;
      editor.renderer.setStyle("normal-mode", false);
      editor.textInput.setCommandMode(false);
      editor.renderer.$keepTextAreaAtCursor = true;
    },
    getStatusText: function(editor) {
      var cm = editor.state.cm;
      var vim = getVim(cm);
      if (vim.insertMode)
        return "INSERT";
      var status = "";
      if (vim.visualMode) {
        status += "VISUAL";
        if (vim.visualLine)
          status += " LINE";
        if (vim.visualBlock)
          status += " BLOCK";
      }
      if (vim.status)
        status += (status ? " " : "") + vim.status;
      return status;
    }
  };
  vimApi.defineOption({
    name: "wrap",
    set: function(value, cm) {
      if (cm) {cm.ace.setOption("wrap", value)}
    },
    type: "boolean"
  }, false);
  vimApi.defineEx('write', 'w', function() {
    console.log(':write is not implemented')
  });
  defaultKeymap.push(
    { keys: 'zc', type: 'action', action: 'fold', actionArgs: { open: false } },
    { keys: 'zC', type: 'action', action: 'fold', actionArgs: { open: false, all: true } },
    { keys: 'zo', type: 'action', action: 'fold', actionArgs: { open: true } },
    { keys: 'zO', type: 'action', action: 'fold', actionArgs: { open: true, all: true } },
    { keys: 'za', type: 'action', action: 'fold', actionArgs: { toggle: true } },
    { keys: 'zA', type: 'action', action: 'fold', actionArgs: { toggle: true, all: true } },
    { keys: 'zf', type: 'action', action: 'fold', actionArgs: { open: true, all: true } },
    { keys: 'zd', type: 'action', action: 'fold', actionArgs: { open: true, all: true } },

    { keys: '<C-A-k>', type: 'action', action: 'aceCommand', actionArgs: { name: "addCursorAbove" } },
    { keys: '<C-A-j>', type: 'action', action: 'aceCommand', actionArgs: { name: "addCursorBelow" } },
    { keys: '<C-A-S-k>', type: 'action', action: 'aceCommand', actionArgs: { name: "addCursorAboveSkipCurrent" } },
    { keys: '<C-A-S-j>', type: 'action', action: 'aceCommand', actionArgs: { name: "addCursorBelowSkipCurrent" } },
    { keys: '<C-A-h>', type: 'action', action: 'aceCommand', actionArgs: { name: "selectMoreBefore" } },
    { keys: '<C-A-l>', type: 'action', action: 'aceCommand', actionArgs: { name: "selectMoreAfter" } },
    { keys: '<C-A-S-h>', type: 'action', action: 'aceCommand', actionArgs: { name: "selectNextBefore" } },
    { keys: '<C-A-S-l>', type: 'action', action: 'aceCommand', actionArgs: { name: "selectNextAfter" } }
  );
  
  defaultKeymap.push({
    keys: 'gq',
    type: 'operator',
    operator: 'hardWrap'
  });
  vimApi.defineOperator("hardWrap", function(cm, operatorArgs, ranges, oldAnchor, newHead) {
    var anchor = ranges[0].anchor.line;
    var head = ranges[0].head.line;
    if (operatorArgs.linewise) head--;
    hardWrap(cm.ace, {startRow: anchor, endRow: head});
    return Pos(head, 0);
  });
  defineOption('textwidth', undefined, 'number', ['tw'], function(width, cm) {
    // Option is local. Do nothing for global.
    if (cm === undefined) {
      return;
    }
    // The 'filetype' option proxies to the CodeMirror 'mode' option.
    if (width === undefined) {
      var value = cm.ace.getOption('printMarginColumn');
      return value;
    } else {
      var column = Math.round(width);
      if (column > 1) {
        cm.ace.setOption('printMarginColumn', column);
      }
    }
  });
    
  actions.aceCommand = function(cm, actionArgs, vim) {
    cm.vimCmd = actionArgs;
    if (cm.ace.inVirtualSelectionMode)
      cm.ace.on("beforeEndOperation", delayedExecAceCommand);
    else
      delayedExecAceCommand(null, cm.ace);
  };
  function delayedExecAceCommand(op, ace) {
    ace.off("beforeEndOperation", delayedExecAceCommand);
    var cmd = ace.state.cm.vimCmd;
    if (cmd) {
      ace.execCommand(cmd.exec ? cmd : cmd.name, cmd.args);
    }
    ace.curOp = ace.prevOp;
  }
  actions.fold = function(cm, actionArgs, vim) {
    cm.ace.execCommand(['toggleFoldWidget', 'toggleFoldWidget', 'foldOther', 'unfoldall'
      ][(actionArgs.all ? 2 : 0) + (actionArgs.open ? 1 : 0)]);
  };

  defaultKeymapLength = defaultKeymap.length; // ace_patch

  exports.handler.defaultKeymap = defaultKeymap;
  exports.handler.actions = actions;
  exports.Vim = vimApi;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQztBQUN0QztBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsc0JBQXNCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscURBQXFELGdCQUFnQixPQUFPO0FBQzVFLHFFQUFxRSxpQkFBaUI7QUFDdEY7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QiwrQkFBK0IsS0FBSyxLQUFLLEtBQUs7QUFDOUM7QUFDQTtBQUNBLDBCQUEwQjs7QUFFMUI7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0EsVUFBVTtBQUNWLHdCQUF3QjtBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DLFlBQVk7QUFDWjtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IsV0FBVztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxnQkFBZ0I7QUFDckQsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsUUFBUTtBQUNsRDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLDhCQUE4QixZQUFZO0FBQzFDO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBLGtDQUFrQyxtQkFBbUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsMEJBQTBCLFlBQVk7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLGNBQWM7QUFDaEQsNEJBQTRCLFlBQVk7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxtQkFBbUI7QUFDckQ7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1QkFBdUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQSxZQUFZO0FBQ1osNEJBQTRCLG1CQUFtQjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdFQUFnRTtBQUNoRSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxnQkFBZ0I7QUFDcEUsVUFBVTtBQUNWO0FBQ0E7QUFDQSxvREFBb0QsZUFBZTtBQUNuRTtBQUNBLE9BQU87QUFDUDtBQUNBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsZ0JBQWdCO0FBQ3BFLFVBQVU7QUFDVjtBQUNBO0FBQ0Esb0RBQW9ELGVBQWU7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxpQkFBaUI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELDBGQUEwRjtBQUM5STtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsMEZBQTBGO0FBQzlJO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0Q7QUFDeEQ7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxpQkFBaUI7QUFDckQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQywyQkFBMkI7QUFDOUQsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxVQUFVLFlBQVk7QUFDakMsVUFBVTtBQUNWO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGlCQUFpQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLDRCQUE0QixpQkFBaUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CO0FBQ25COztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxRQUFRO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLFlBQVk7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsd0JBQXdCLFlBQVk7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLElBQUk7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7O0FBRUEsOENBQThDOztBQUU5QyxFQUFFLDZCQUE2QjtBQUMvQixFQUFFLHVCQUF1QjtBQUN6QixFQUFFLFdBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvaGFyZHdyYXAuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMva2V5Ym9hcmQvdmltLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogIyMgVGV4dCBoYXJkIHdyYXBwaW5nIGV4dGVuc2lvbiBmb3IgYXV0b21hdGljIGxpbmUgYnJlYWtpbmcgYW5kIHRleHQgZm9ybWF0dGluZy5cbiAqXG4gKiBQcm92aWRlcyBpbnRlbGxpZ2VudCBsaW5lIHdyYXBwaW5nIGZ1bmN0aW9uYWxpdHkgdGhhdCBicmVha3MgbG9uZyBsaW5lcyBhdCBjb25maWd1cmFibGUgY29sdW1uIGxpbWl0cyB3aGlsZVxuICogcHJlc2VydmluZyBpbmRlbnRhdGlvbiBhbmQgb3B0aW9uYWxseSBtZXJnaW5nIHNob3J0IGFkamFjZW50IGxpbmVzLiBTdXBwb3J0cyBib3RoIGF1dG9tYXRpYyB3cmFwcGluZyBkdXJpbmcgdGV4dFxuICogaW5wdXQgYW5kIG1hbnVhbCBmb3JtYXR0aW5nIG9mIHNlbGVjdGVkIHRleHQgcmFuZ2VzLlxuICpcbiAqICoqRW5hYmxlOioqIGBlZGl0b3Iuc2V0T3B0aW9uKFwiaGFyZFdyYXBcIiwgdHJ1ZSlgXG4gKiBvciBjb25maWd1cmUgaXQgZHVyaW5nIGVkaXRvciBpbml0aWFsaXphdGlvbiBpbiB0aGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAbW9kdWxlXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcblxuLyoqXG4gKiBXcmFwcyBsaW5lcyBhdCBzcGVjaWZpZWQgY29sdW1uIGxpbWl0cyBhbmQgb3B0aW9uYWxseSBtZXJnZXMgc2hvcnQgYWRqYWNlbnQgbGluZXMuXG4gKlxuICogUHJvY2Vzc2VzIHRleHQgd2l0aGluIHRoZSBzcGVjaWZpZWQgcm93IHJhbmdlLCBicmVha2luZyBsaW5lcyB0aGF0IGV4Y2VlZCB0aGUgbWF4aW11bSBjb2x1bW5cbiAqIHdpZHRoIGF0IGFwcHJvcHJpYXRlIHdvcmQgYm91bmRhcmllcyB3aGlsZSBwcmVzZXJ2aW5nIGluZGVudGF0aW9uLiBXaGVuIG1lcmdlIGlzIGVuYWJsZWQsXG4gKiBjb21iaW5lcyBzaG9ydCBjb25zZWN1dGl2ZSBsaW5lcyB0aGF0IGNhbiBmaXQgd2l0aGluIHRoZSBjb2x1bW4gbGltaXQuIEF1dG9tYXRpY2FsbHkgYWRqdXN0c1xuICogdGhlIGVuZCByb3cgd2hlbiBuZXcgbGluZSBicmVha3MgYXJlIGluc2VydGVkIHRvIGVuc3VyZSBhbGwgYWZmZWN0ZWQgY29udGVudCBpcyBwcm9jZXNzZWQuXG4gKlxuICogQHBhcmFtIHtpbXBvcnQoXCIuLi9lZGl0b3JcIikuRWRpdG9yfSBlZGl0b3IgLSBUaGUgZWRpdG9yIGluc3RhbmNlIGNvbnRhaW5pbmcgdGhlIHRleHQgdG8gd3JhcFxuICogQHBhcmFtIHtpbXBvcnQoXCIuLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLkhhcmRXcmFwT3B0aW9uc30gb3B0aW9ucyAtIENvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3Igd3JhcHBpbmcgYmVoYXZpb3JcbiAqL1xuXG5mdW5jdGlvbiBoYXJkV3JhcChlZGl0b3IsIG9wdGlvbnMpIHtcbiAgICB2YXIgbWF4ID0gb3B0aW9ucy5jb2x1bW4gfHwgZWRpdG9yLmdldE9wdGlvbihcInByaW50TWFyZ2luQ29sdW1uXCIpO1xuICAgIHZhciBhbGxvd01lcmdlID0gb3B0aW9ucy5hbGxvd01lcmdlICE9IGZhbHNlO1xuICAgICAgIFxuICAgIHZhciByb3cgPSBNYXRoLm1pbihvcHRpb25zLnN0YXJ0Um93LCBvcHRpb25zLmVuZFJvdyk7XG4gICAgdmFyIGVuZFJvdyA9IE1hdGgubWF4KG9wdGlvbnMuc3RhcnRSb3csIG9wdGlvbnMuZW5kUm93KTtcbiAgICBcbiAgICB2YXIgc2Vzc2lvbiA9IGVkaXRvci5zZXNzaW9uO1xuICAgIFxuICAgIHdoaWxlIChyb3cgPD0gZW5kUm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIGlmIChsaW5lLmxlbmd0aCA+IG1heCkge1xuICAgICAgICAgICAgdmFyIHNwYWNlID0gZmluZFNwYWNlKGxpbmUsIG1heCwgNSk7XG4gICAgICAgICAgICBpZiAoc3BhY2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZW50YXRpb24gPSAvXlxccyovLmV4ZWMobGluZSlbMF07XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5yZXBsYWNlKG5ldyBSYW5nZShyb3csc3BhY2Uuc3RhcnQscm93LHNwYWNlLmVuZCksIFwiXFxuXCIgKyBpbmRlbnRhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3crKztcbiAgICAgICAgfSBlbHNlIGlmIChhbGxvd01lcmdlICYmIC9cXFMvLnRlc3QobGluZSkgJiYgcm93ICE9IGVuZFJvdykge1xuICAgICAgICAgICAgdmFyIG5leHRMaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyArIDEpO1xuICAgICAgICAgICAgaWYgKG5leHRMaW5lICYmIC9cXFMvLnRlc3QobmV4dExpbmUpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyaW1tZWRMaW5lID0gbGluZS5yZXBsYWNlKC9cXHMrJC8sIFwiXCIpO1xuICAgICAgICAgICAgICAgIHZhciB0cmltbWVkTmV4dExpbmUgPSBuZXh0TGluZS5yZXBsYWNlKC9eXFxzKy8sIFwiXCIpO1xuICAgICAgICAgICAgICAgIHZhciBtZXJnZWRMaW5lID0gdHJpbW1lZExpbmUgKyBcIiBcIiArIHRyaW1tZWROZXh0TGluZTtcblxuICAgICAgICAgICAgICAgIHZhciBzcGFjZSA9IGZpbmRTcGFjZShtZXJnZWRMaW5lLCBtYXgsIDUpO1xuICAgICAgICAgICAgICAgIGlmIChzcGFjZSAmJiBzcGFjZS5zdGFydCA+IHRyaW1tZWRMaW5lLmxlbmd0aCB8fCBtZXJnZWRMaW5lLmxlbmd0aCA8IG1heCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZVJhbmdlID0gbmV3IFJhbmdlKHJvdyx0cmltbWVkTGluZS5sZW5ndGgscm93ICsgMSxuZXh0TGluZS5sZW5ndGggLSB0cmltbWVkTmV4dExpbmUubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbi5yZXBsYWNlKHJlcGxhY2VSYW5nZSwgXCIgXCIpO1xuICAgICAgICAgICAgICAgICAgICByb3ctLTtcbiAgICAgICAgICAgICAgICAgICAgZW5kUm93LS07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0cmltbWVkTGluZS5sZW5ndGggPCBsaW5lLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uLnJlbW92ZShuZXcgUmFuZ2Uocm93LCB0cmltbWVkTGluZS5sZW5ndGgsIHJvdywgbGluZS5sZW5ndGgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcm93Kys7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGxpbmVcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWF4XG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1pblxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZpbmRTcGFjZShsaW5lLCBtYXgsIG1pbikge1xuICAgICAgICBpZiAobGluZS5sZW5ndGggPCBtYXgpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBiZWZvcmUgPSBsaW5lLnNsaWNlKDAsIG1heCk7XG4gICAgICAgIHZhciBhZnRlciA9IGxpbmUuc2xpY2UobWF4KTtcbiAgICAgICAgdmFyIHNwYWNlQWZ0ZXIgPSAvXig/OihcXHMrKXwoXFxTKykoXFxzKykpLy5leGVjKGFmdGVyKTtcbiAgICAgICAgdmFyIHNwYWNlQmVmb3JlID0gLyg/OihcXHMrKXwoXFxzKykoXFxTKykpJC8uZXhlYyhiZWZvcmUpO1xuICAgICAgICB2YXIgc3RhcnQgPSAwO1xuICAgICAgICB2YXIgZW5kID0gMDtcbiAgICAgICAgaWYgKHNwYWNlQmVmb3JlICYmICFzcGFjZUJlZm9yZVsyXSkge1xuICAgICAgICAgICAgc3RhcnQgPSBtYXggLSBzcGFjZUJlZm9yZVsxXS5sZW5ndGg7XG4gICAgICAgICAgICBlbmQgPSBtYXg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNwYWNlQWZ0ZXIgJiYgIXNwYWNlQWZ0ZXJbMl0pIHtcbiAgICAgICAgICAgIGlmICghc3RhcnQpXG4gICAgICAgICAgICAgICAgc3RhcnQgPSBtYXg7XG4gICAgICAgICAgICBlbmQgPSBtYXggKyBzcGFjZUFmdGVyWzFdLmxlbmd0aDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RhcnQpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgICAgIGVuZDogZW5kXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcGFjZUJlZm9yZSAmJiBzcGFjZUJlZm9yZVsyXSAmJiBzcGFjZUJlZm9yZS5pbmRleCA+IG1pbikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogc3BhY2VCZWZvcmUuaW5kZXgsXG4gICAgICAgICAgICAgICAgZW5kOiBzcGFjZUJlZm9yZS5pbmRleCArIHNwYWNlQmVmb3JlWzJdLmxlbmd0aFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3BhY2VBZnRlciAmJiBzcGFjZUFmdGVyWzJdKSB7XG4gICAgICAgICAgICBzdGFydCA9ICBtYXggKyBzcGFjZUFmdGVyWzJdLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0LFxuICAgICAgICAgICAgICAgIGVuZDogc3RhcnQgKyBzcGFjZUFmdGVyWzNdLmxlbmd0aFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxufVxuXG5mdW5jdGlvbiB3cmFwQWZ0ZXJJbnB1dChlKSB7XG4gICAgaWYgKGUuY29tbWFuZC5uYW1lID09IFwiaW5zZXJ0c3RyaW5nXCIgJiYgL1xcUy8udGVzdChlLmFyZ3MpKSB7XG4gICAgICAgIHZhciBlZGl0b3IgPSBlLmVkaXRvcjtcbiAgICAgICAgdmFyIGN1cnNvciA9IGVkaXRvci5zZWxlY3Rpb24uY3Vyc29yO1xuICAgICAgICBpZiAoY3Vyc29yLmNvbHVtbiA8PSBlZGl0b3IucmVuZGVyZXIuJHByaW50TWFyZ2luQ29sdW1uKSByZXR1cm47XG4gICAgICAgIHZhciBsYXN0RGVsdGEgPSBlZGl0b3Iuc2Vzc2lvbi4kdW5kb01hbmFnZXIuJGxhc3REZWx0YTtcblxuICAgICAgICBoYXJkV3JhcChlZGl0b3IsIHtcbiAgICAgICAgICAgIHN0YXJ0Um93OiBjdXJzb3Iucm93LCBlbmRSb3c6IGN1cnNvci5yb3csXG4gICAgICAgICAgICBhbGxvd01lcmdlOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGxhc3REZWx0YSAhPSBlZGl0b3Iuc2Vzc2lvbi4kdW5kb01hbmFnZXIuJGxhc3REZWx0YSkgXG4gICAgICAgICAgICBlZGl0b3Iuc2Vzc2lvbi5tYXJrVW5kb0dyb3VwKCk7XG4gICAgfVxufVxuXG52YXIgRWRpdG9yID0gcmVxdWlyZShcIi4uL2VkaXRvclwiKS5FZGl0b3I7XG5yZXF1aXJlKFwiLi4vY29uZmlnXCIpLmRlZmluZU9wdGlvbnMoRWRpdG9yLnByb3RvdHlwZSwgXCJlZGl0b3JcIiwge1xuICAgIGhhcmRXcmFwOiB7XG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kcy5vbihcImFmdGVyRXhlY1wiLCB3cmFwQWZ0ZXJJbnB1dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZHMub2ZmKFwiYWZ0ZXJFeGVjXCIsIHdyYXBBZnRlcklucHV0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgfVxufSk7XG5cbmV4cG9ydHMuaGFyZFdyYXAgPSBoYXJkV3JhcDtcbiIsIi8vIENvZGVNaXJyb3IsIGNvcHlyaWdodCAoYykgYnkgTWFyaWpuIEhhdmVyYmVrZSBhbmQgb3RoZXJzXG4vLyBEaXN0cmlidXRlZCB1bmRlciBhbiBNSVQgbGljZW5zZTogaHR0cHM6Ly9jb2RlbWlycm9yLm5ldC81L0xJQ0VOU0VcblxuLyoqXG4gKiBTdXBwb3J0ZWQga2V5YmluZGluZ3M6XG4gKiAgIFRvbyBtYW55IHRvIGxpc3QuIFJlZmVyIHRvIGRlZmF1bHRLZXltYXAgYmVsb3cuXG4gKlxuICogU3VwcG9ydGVkIEV4IGNvbW1hbmRzOlxuICogICBSZWZlciB0byBkZWZhdWx0RXhDb21tYW5kTWFwIGJlbG93LlxuICpcbiAqIFJlZ2lzdGVyczogdW5uYW1lZCwgLSwgLiwgOiwgLywgXywgYS16LCBBLVosIDAtOVxuICogICAoRG9lcyBub3QgcmVzcGVjdCB0aGUgc3BlY2lhbCBjYXNlIGZvciBudW1iZXIgcmVnaXN0ZXJzIHdoZW4gZGVsZXRlXG4gKiAgICBvcGVyYXRvciBpcyBtYWRlIHdpdGggdGhlc2UgY29tbWFuZHM6ICUsICgsICksICAsIC8sID8sIG4sIE4sIHssIH0gKVxuICogICBUT0RPOiBJbXBsZW1lbnQgdGhlIHJlbWFpbmluZyByZWdpc3RlcnMuXG4gKlxuICogTWFya3M6IGEteiwgQS1aLCBhbmQgMC05XG4gKiAgIFRPRE86IEltcGxlbWVudCB0aGUgcmVtYWluaW5nIHNwZWNpYWwgbWFya3MuIFRoZXkgaGF2ZSBtb3JlIGNvbXBsZXhcbiAqICAgICAgIGJlaGF2aW9yLlxuICpcbiAqIEV2ZW50czpcbiAqICAndmltLW1vZGUtY2hhbmdlJyAtIHJhaXNlZCBvbiB0aGUgZWRpdG9yIGFueXRpbWUgdGhlIGN1cnJlbnQgbW9kZSBjaGFuZ2VzLFxuICogICAgICAgICAgICAgICAgICAgICAgRXZlbnQgb2JqZWN0OiB7bW9kZTogXCJ2aXN1YWxcIiwgc3ViTW9kZTogXCJsaW5ld2lzZVwifVxuICpcbiAqIENvZGUgc3RydWN0dXJlOlxuICogIDEuIERlZmF1bHQga2V5bWFwXG4gKiAgMi4gVmFyaWFibGUgZGVjbGFyYXRpb25zIGFuZCBzaG9ydCBiYXNpYyBoZWxwZXJzXG4gKiAgMy4gSW5zdGFuY2UgKEV4dGVybmFsIEFQSSkgaW1wbGVtZW50YXRpb25cbiAqICA0LiBJbnRlcm5hbCBzdGF0ZSB0cmFja2luZyBvYmplY3RzIChpbnB1dCBzdGF0ZSwgY291bnRlcikgaW1wbGVtZW50YXRpb25cbiAqICAgICBhbmQgaW5zdGFudGlhdGlvblxuICogIDUuIEtleSBoYW5kbGVyICh0aGUgbWFpbiBjb21tYW5kIGRpc3BhdGNoZXIpIGltcGxlbWVudGF0aW9uXG4gKiAgNi4gTW90aW9uLCBvcGVyYXRvciwgYW5kIGFjdGlvbiBpbXBsZW1lbnRhdGlvbnNcbiAqICA3LiBIZWxwZXIgZnVuY3Rpb25zIGZvciB0aGUga2V5IGhhbmRsZXIsIG1vdGlvbnMsIG9wZXJhdG9ycywgYW5kIGFjdGlvbnNcbiAqICA4LiBTZXQgdXAgVmltIHRvIHdvcmsgYXMgYSBrZXltYXAgZm9yIENvZGVNaXJyb3IuXG4gKiAgOS4gRXggY29tbWFuZCBpbXBsZW1lbnRhdGlvbnMuXG4gKi9cblxuICAndXNlIHN0cmljdCc7XG5cbiAgZnVuY3Rpb24gbG9nKCkge1xuICAgIHZhciBkID0gXCJcIjtcbiAgICBmdW5jdGlvbiBmb3JtYXQocCkge1xuICAgICAgaWYgKHR5cGVvZiBwICE9IFwib2JqZWN0XCIpXG4gICAgICAgIHJldHVybiBwICsgXCJcIjtcbiAgICAgIGlmIChcImxpbmVcIiBpbiBwKSB7XG4gICAgICAgIHJldHVybiBwLmxpbmUgKyBcIjpcIiArIHAuY2g7XG4gICAgICB9XG4gICAgICBpZiAoXCJhbmNob3JcIiBpbiBwKSB7XG4gICAgICAgIHJldHVybiBmb3JtYXQocC5hbmNob3IpICsgXCItPlwiICsgZm9ybWF0KHAuaGVhZCk7XG4gICAgICB9XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwKSlcbiAgICAgICAgcmV0dXJuIFwiW1wiICsgcC5tYXAoZnVuY3Rpb24oeCkge1xuICAgICAgICAgIHJldHVybiBmb3JtYXQoeCk7XG4gICAgICAgIH0pICsgXCJdXCI7XG4gICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkocCk7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcCA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIHZhciBmID0gZm9ybWF0KHApO1xuICAgICAgZCArPSBmICsgXCIgIFwiO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyhkKTtcbiAgfVxuICB2YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG4gIHZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKFwiLi4vbGliL2V2ZW50X2VtaXR0ZXJcIikuRXZlbnRFbWl0dGVyO1xuICB2YXIgZG9tTGliID0gcmVxdWlyZShcIi4uL2xpYi9kb21cIik7XG4gIHZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbiAgdmFyIEtFWVMgPSByZXF1aXJlKFwiLi4vbGliL2tleXNcIik7XG4gIHZhciBldmVudCA9IHJlcXVpcmUoXCIuLi9saWIvZXZlbnRcIik7XG4gIHZhciBTZWFyY2ggPSByZXF1aXJlKFwiLi4vc2VhcmNoXCIpLlNlYXJjaDtcbiAgdmFyIHVzZXJhZ2VudCA9IHJlcXVpcmUoXCIuLi9saWIvdXNlcmFnZW50XCIpO1xuICB2YXIgU2VhcmNoSGlnaGxpZ2h0ID0gcmVxdWlyZShcIi4uL3NlYXJjaF9oaWdobGlnaHRcIikuU2VhcmNoSGlnaGxpZ2h0O1xuICB2YXIgbXVsdGlTZWxlY3RDb21tYW5kcyA9IHJlcXVpcmUoXCIuLi9jb21tYW5kcy9tdWx0aV9zZWxlY3RfY29tbWFuZHNcIik7XG4gIHZhciBUZXh0TW9kZVRva2VuUmUgPSByZXF1aXJlKFwiLi4vbW9kZS90ZXh0XCIpLk1vZGUucHJvdG90eXBlLnRva2VuUmU7XG4gIHZhciBoYXJkV3JhcCA9IHJlcXVpcmUoXCIuLi9leHQvaGFyZHdyYXBcIikuaGFyZFdyYXA7XG4gIHJlcXVpcmUoXCIuLi9tdWx0aV9zZWxlY3RcIik7XG5cbiAgdmFyIENvZGVNaXJyb3IgPSBmdW5jdGlvbihhY2UpIHtcbiAgICB0aGlzLmFjZSA9IGFjZTtcbiAgICB0aGlzLnN0YXRlID0ge307XG4gICAgdGhpcy5tYXJrcyA9IHt9O1xuICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuICAgIHRoaXMuJHVpZCA9IDA7XG4gICAgdGhpcy5vbkNoYW5nZSA9IHRoaXMub25DaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlID0gdGhpcy5vblNlbGVjdGlvbkNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25CZWZvcmVFbmRPcGVyYXRpb24gPSB0aGlzLm9uQmVmb3JlRW5kT3BlcmF0aW9uLmJpbmQodGhpcyk7XG4gICAgdGhpcy5hY2Uub24oJ2NoYW5nZScsIHRoaXMub25DaGFuZ2UpO1xuICAgIHRoaXMuYWNlLm9uKCdjaGFuZ2VTZWxlY3Rpb24nLCB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlKTtcbiAgICB0aGlzLmFjZS5vbignYmVmb3JlRW5kT3BlcmF0aW9uJywgdGhpcy5vbkJlZm9yZUVuZE9wZXJhdGlvbik7XG4gIH07XG4gIENvZGVNaXJyb3IuUG9zID0gZnVuY3Rpb24obGluZSwgY2gpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgUG9zKSkgcmV0dXJuIG5ldyBQb3MobGluZSwgY2gpO1xuICAgIHRoaXMubGluZSA9IGxpbmU7IHRoaXMuY2ggPSBjaDtcbiAgfTtcbiAgQ29kZU1pcnJvci5kZWZpbmVPcHRpb24gPSBmdW5jdGlvbihuYW1lLCB2YWwsIHNldHRlcikge307XG4gIENvZGVNaXJyb3IuY29tbWFuZHMgPSB7XG4gICAgcmVkbzogZnVuY3Rpb24oY20pIHsgY20uYWNlLnJlZG8oKTsgfSxcbiAgICB1bmRvOiBmdW5jdGlvbihjbSkgeyBjbS5hY2UudW5kbygpOyB9LFxuICAgIG5ld2xpbmVBbmRJbmRlbnQ6IGZ1bmN0aW9uKGNtKSB7IGNtLmFjZS5pbnNlcnQoXCJcXG5cIik7IH0sXG4gICAgZ29MaW5lTGVmdDogZnVuY3Rpb24oY20pIHsgY20uYWNlLnNlbGVjdGlvbi5tb3ZlQ3Vyc29yTGluZVN0YXJ0KCk7IH0sXG4gICAgZ29MaW5lUmlnaHQ6IGZ1bmN0aW9uKGNtKSB7IGNtLmFjZS5zZWxlY3Rpb24ubW92ZUN1cnNvckxpbmVFbmQoKTsgfVxuICB9O1xuICBDb2RlTWlycm9yLmtleU1hcCA9IHt9O1xuICBDb2RlTWlycm9yLmFkZENsYXNzID0gQ29kZU1pcnJvci5ybUNsYXNzID0gZnVuY3Rpb24oKSB7fTtcbiAgQ29kZU1pcnJvci5lX3N0b3AgPSBDb2RlTWlycm9yLmVfcHJldmVudERlZmF1bHQgPSBldmVudC5zdG9wRXZlbnQ7XG4gIENvZGVNaXJyb3Iua2V5TmFtZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIga2V5ID0gKEtFWVNbZS5rZXlDb2RlXSB8fCBlLmtleSB8fCBcIlwiKTtcbiAgICBpZiAoa2V5Lmxlbmd0aCA9PSAxKSBrZXkgPSBrZXkudG9VcHBlckNhc2UoKTtcbiAgICBrZXkgPSBldmVudC5nZXRNb2RpZmllclN0cmluZyhlKS5yZXBsYWNlKC8oXnwtKVxcdy9nLCBmdW5jdGlvbihtKSB7XG4gICAgICByZXR1cm4gbS50b1VwcGVyQ2FzZSgpO1xuICAgIH0pICsga2V5O1xuICAgIHJldHVybiBrZXk7XG4gIH07XG4gIENvZGVNaXJyb3Iua2V5TWFwWydkZWZhdWx0J10gPSBmdW5jdGlvbihrZXkpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oY20pIHtcbiAgICAgIHZhciBjbWQgPSBjbS5hY2UuY29tbWFuZHMuY29tbWFuZEtleUJpbmRpbmdba2V5LnRvTG93ZXJDYXNlKCldO1xuICAgICAgcmV0dXJuIGNtZCAmJiBjbS5hY2UuZXhlY0NvbW1hbmQoY21kKSAhPT0gZmFsc2U7XG4gICAgfTtcbiAgfTtcbiAgQ29kZU1pcnJvci5sb29rdXBLZXkgPSBmdW5jdGlvbiBsb29rdXBLZXkoa2V5LCBtYXAsIGhhbmRsZSkge1xuICAgIGlmICghbWFwKSBtYXAgPSBcImRlZmF1bHRcIjtcbiAgICBpZiAodHlwZW9mIG1hcCA9PSBcInN0cmluZ1wiKVxuICAgICAgbWFwID0gQ29kZU1pcnJvci5rZXlNYXBbbWFwXSB8fCAgQ29kZU1pcnJvci5rZXlNYXBbJ2RlZmF1bHQnXTtcbiAgICB2YXIgZm91bmQgPSB0eXBlb2YgbWFwID09IFwiZnVuY3Rpb25cIiA/IG1hcChrZXkpIDogbWFwW2tleV07XG4gICAgaWYgKGZvdW5kID09PSBmYWxzZSkgcmV0dXJuIFwibm90aGluZ1wiO1xuICAgIGlmIChmb3VuZCA9PT0gXCIuLi5cIikgcmV0dXJuIFwibXVsdGlcIjtcbiAgICBpZiAoZm91bmQgIT0gbnVsbCAmJiBoYW5kbGUoZm91bmQpKSByZXR1cm4gXCJoYW5kbGVkXCI7XG5cbiAgICBpZiAobWFwLmZhbGx0aHJvdWdoKSB7XG4gICAgICBpZiAoIUFycmF5LmlzQXJyYXkobWFwLmZhbGx0aHJvdWdoKSlcbiAgICAgICAgcmV0dXJuIGxvb2t1cEtleShrZXksIG1hcC5mYWxsdGhyb3VnaCwgaGFuZGxlKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWFwLmZhbGx0aHJvdWdoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBsb29rdXBLZXkoa2V5LCBtYXAuZmFsbHRocm91Z2hbaV0sIGhhbmRsZSk7XG4gICAgICAgIGlmIChyZXN1bHQpIHJldHVybiByZXN1bHQ7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG5cbiAgQ29kZU1pcnJvci5maW5kTWF0Y2hpbmdUYWcgPSBmdW5jdGlvbiAoY20sIGhlYWQpIHtcbiAgICByZXR1cm4gY20uZmluZE1hdGNoaW5nVGFnKGhlYWQpO1xuICB9XG5cbiAgQ29kZU1pcnJvci5maW5kRW5jbG9zaW5nVGFnID0gZnVuY3Rpb24gKGNtLCBoZWFkKSB7XG5cbiAgfTtcblxuICBDb2RlTWlycm9yLnNpZ25hbCA9IGZ1bmN0aW9uKG8sIG5hbWUsIGUpIHsgcmV0dXJuIG8uX3NpZ25hbChuYW1lLCBlKSB9O1xuICBDb2RlTWlycm9yLm9uID0gZXZlbnQuYWRkTGlzdGVuZXI7XG4gIENvZGVNaXJyb3Iub2ZmID0gZXZlbnQucmVtb3ZlTGlzdGVuZXI7XG4gIENvZGVNaXJyb3IuaXNXb3JkQ2hhciA9IGZ1bmN0aW9uKGNoKSB7XG4gICAgaWYgKGNoIDwgXCJcXHg3ZlwiKSByZXR1cm4gL15cXHckLy50ZXN0KGNoKTtcbiAgICBUZXh0TW9kZVRva2VuUmUubGFzdEluZGV4ID0gMDtcbiAgICByZXR1cm4gVGV4dE1vZGVUb2tlblJlLnRlc3QoY2gpO1xuICB9O1xuXG4oZnVuY3Rpb24oKSB7XG4gIG9vcC5pbXBsZW1lbnQoQ29kZU1pcnJvci5wcm90b3R5cGUsIEV2ZW50RW1pdHRlcik7XG5cbiAgdGhpcy5kZXN0cm95ID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5hY2Uub2ZmKCdjaGFuZ2UnLCB0aGlzLm9uQ2hhbmdlKTtcbiAgICB0aGlzLmFjZS5vZmYoJ2NoYW5nZVNlbGVjdGlvbicsIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UpO1xuICAgIHRoaXMuYWNlLm9mZignYmVmb3JlRW5kT3BlcmF0aW9uJywgdGhpcy5vbkJlZm9yZUVuZE9wZXJhdGlvbik7XG4gICAgdGhpcy5yZW1vdmVPdmVybGF5KCk7XG4gIH07XG4gIHRoaXMudmlydHVhbFNlbGVjdGlvbk1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5hY2UuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSAmJiB0aGlzLmFjZS5zZWxlY3Rpb24uaW5kZXg7XG4gIH07XG4gIHRoaXMub25DaGFuZ2UgPSBmdW5jdGlvbihkZWx0YSkge1xuICAgIGlmICh0aGlzLiRsaW5lSGFuZGxlQ2hhbmdlcykge1xuICAgICAgdGhpcy4kbGluZUhhbmRsZUNoYW5nZXMucHVzaChkZWx0YSk7XG4gICAgfVxuICAgIHZhciBjaGFuZ2UgPSB7IHRleHQ6IGRlbHRhLmFjdGlvblswXSA9PSAnaScgPyBkZWx0YS5saW5lcyA6IFtdIH07XG4gICAgdmFyIGN1ck9wID0gdGhpcy5jdXJPcCA9IHRoaXMuY3VyT3AgfHwge307XG4gICAgaWYgKCFjdXJPcC5jaGFuZ2VIYW5kbGVycylcbiAgICAgIGN1ck9wLmNoYW5nZUhhbmRsZXJzID0gdGhpcy5fZXZlbnRSZWdpc3RyeVtcImNoYW5nZVwiXSAmJiB0aGlzLl9ldmVudFJlZ2lzdHJ5W1wiY2hhbmdlXCJdLnNsaWNlKCk7XG4gICAgaWYgKCFjdXJPcC5sYXN0Q2hhbmdlKSB7XG4gICAgICBjdXJPcC5sYXN0Q2hhbmdlID0gY3VyT3AuY2hhbmdlID0gY2hhbmdlO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJPcC5sYXN0Q2hhbmdlLm5leHQgPSBjdXJPcC5sYXN0Q2hhbmdlID0gY2hhbmdlO1xuICAgIH1cbiAgICB0aGlzLiR1cGRhdGVNYXJrZXJzKGRlbHRhKTtcbiAgfTtcbiAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjdXJPcCA9IHRoaXMuY3VyT3AgPSB0aGlzLmN1ck9wIHx8IHt9O1xuICAgIGlmICghY3VyT3AuY3Vyc29yQWN0aXZpdHlIYW5kbGVycylcbiAgICAgIGN1ck9wLmN1cnNvckFjdGl2aXR5SGFuZGxlcnMgPSB0aGlzLl9ldmVudFJlZ2lzdHJ5W1wiY3Vyc29yQWN0aXZpdHlcIl0gJiYgdGhpcy5fZXZlbnRSZWdpc3RyeVtcImN1cnNvckFjdGl2aXR5XCJdLnNsaWNlKCk7XG4gICAgdGhpcy5jdXJPcC5jdXJzb3JBY3Rpdml0eSA9IHRydWU7XG4gICAgaWYgKHRoaXMuYWNlLmluTXVsdGlTZWxlY3RNb2RlKSB7XG4gICAgICB0aGlzLmFjZS5rZXlCaW5kaW5nLnJlbW92ZUtleWJvYXJkSGFuZGxlcihtdWx0aVNlbGVjdENvbW1hbmRzLmtleWJvYXJkSGFuZGxlcik7XG4gICAgfVxuICB9O1xuICB0aGlzLm9wZXJhdGlvbiA9IGZ1bmN0aW9uKGZuLCBmb3JjZSkge1xuICAgIGlmICghZm9yY2UgJiYgdGhpcy5jdXJPcCB8fCBmb3JjZSAmJiB0aGlzLmN1ck9wICYmIHRoaXMuY3VyT3AuZm9yY2UpIHtcbiAgICAgIHJldHVybiBmbigpO1xuICAgIH1cbiAgICBpZiAoZm9yY2UgfHwgIXRoaXMuYWNlLmN1ck9wKSB7XG4gICAgICBpZiAodGhpcy5jdXJPcClcbiAgICAgICAgdGhpcy5vbkJlZm9yZUVuZE9wZXJhdGlvbigpO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuYWNlLmN1ck9wKSB7XG4gICAgICB2YXIgcHJldk9wID0gdGhpcy5hY2UucHJldk9wO1xuICAgICAgdGhpcy5hY2Uuc3RhcnRPcGVyYXRpb24oe1xuICAgICAgICBjb21tYW5kOiB7IG5hbWU6IFwidmltXCIsICBzY3JvbGxJbnRvVmlldzogXCJjdXJzb3JcIiB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgdmFyIGN1ck9wID0gdGhpcy5jdXJPcCA9IHRoaXMuY3VyT3AgfHwge307XG4gICAgdGhpcy5jdXJPcC5mb3JjZSA9IGZvcmNlO1xuICAgIHZhciByZXN1bHQgPSBmbigpO1xuICAgIGlmICh0aGlzLmFjZS5jdXJPcCAmJiB0aGlzLmFjZS5jdXJPcC5jb21tYW5kLm5hbWUgPT0gXCJ2aW1cIikge1xuICAgICAgaWYgKHRoaXMuc3RhdGUuZGlhbG9nKVxuICAgICAgICB0aGlzLmFjZS5jdXJPcC5jb21tYW5kLnNjcm9sbEludG9WaWV3ID0gdGhpcy5hY2UuY3VyT3AudmltRGlhbG9nU2Nyb2xsO1xuICAgICAgdGhpcy5hY2UuZW5kT3BlcmF0aW9uKCk7XG4gICAgICBpZiAoIWN1ck9wLmN1cnNvckFjdGl2aXR5ICYmICFjdXJPcC5sYXN0Q2hhbmdlICYmIHByZXZPcClcbiAgICAgICAgdGhpcy5hY2UucHJldk9wID0gcHJldk9wO1xuICAgIH1cbiAgICBpZiAoZm9yY2UgfHwgIXRoaXMuYWNlLmN1ck9wKSB7XG4gICAgICBpZiAodGhpcy5jdXJPcClcbiAgICAgICAgdGhpcy5vbkJlZm9yZUVuZE9wZXJhdGlvbigpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuICB0aGlzLm9uQmVmb3JlRW5kT3BlcmF0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9wID0gdGhpcy5jdXJPcDtcbiAgICBpZiAob3ApIHtcbiAgICAgIGlmIChvcC5jaGFuZ2UpIHsgdGhpcy5zaWduYWwoXCJjaGFuZ2VcIiwgb3AuY2hhbmdlLCBvcCk7IH1cbiAgICAgIGlmIChvcCAmJiBvcC5jdXJzb3JBY3Rpdml0eSkgeyB0aGlzLnNpZ25hbChcImN1cnNvckFjdGl2aXR5XCIsIG51bGwsIG9wKTsgfVxuICAgICAgdGhpcy5jdXJPcCA9IG51bGw7XG4gICAgfVxuICB9O1xuXG4gIHRoaXMuc2lnbmFsID0gZnVuY3Rpb24oZXZlbnROYW1lLCBlLCBoYW5kbGVycykge1xuICAgIHZhciBsaXN0ZW5lcnMgPSBoYW5kbGVycyA/IGhhbmRsZXJzW2V2ZW50TmFtZSArIFwiSGFuZGxlcnNcIl1cbiAgICAgICAgOiAodGhpcy5fZXZlbnRSZWdpc3RyeSB8fCB7fSlbZXZlbnROYW1lXTtcbiAgICBpZiAoIWxpc3RlbmVycylcbiAgICAgICAgcmV0dXJuO1xuICAgIGxpc3RlbmVycyA9IGxpc3RlbmVycy5zbGljZSgpO1xuICAgIGZvciAodmFyIGk9MDsgaTxsaXN0ZW5lcnMubGVuZ3RoOyBpKyspXG4gICAgICAgIGxpc3RlbmVyc1tpXSh0aGlzLCBlKTtcbiAgfTtcbiAgdGhpcy5maXJzdExpbmUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4gIHRoaXMubGFzdExpbmUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuYWNlLnNlc3Npb24uZ2V0TGVuZ3RoKCkgLSAxOyB9O1xuICB0aGlzLmxpbmVDb3VudCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5hY2Uuc2Vzc2lvbi5nZXRMZW5ndGgoKTsgfTtcbiAgdGhpcy5zZXRDdXJzb3IgPSBmdW5jdGlvbihsaW5lLCBjaCkge1xuICAgIGlmICh0eXBlb2YgbGluZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIGNoID0gbGluZS5jaDtcbiAgICAgIGxpbmUgPSBsaW5lLmxpbmU7XG4gICAgfVxuICAgIHZhciBzaG91bGRTY3JvbGwgPSAhdGhpcy5jdXJPcCAmJiAhdGhpcy5hY2UuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZTtcbiAgICBpZiAoIXRoaXMuYWNlLmluVmlydHVhbFNlbGVjdGlvbk1vZGUpXG4gICAgICB0aGlzLmFjZS5leGl0TXVsdGlTZWxlY3RNb2RlKCk7XG4gICAgdGhpcy5hY2Uuc2Vzc2lvbi51bmZvbGQoe3JvdzogbGluZSwgY29sdW1uOiBjaH0pO1xuICAgIHRoaXMuYWNlLnNlbGVjdGlvbi5tb3ZlVG8obGluZSwgY2gpO1xuICAgIGlmIChzaG91bGRTY3JvbGwpIHtcbiAgICAgIHRoaXMuYWNlLnJlbmRlcmVyLnNjcm9sbEN1cnNvckludG9WaWV3KCk7XG4gICAgICB0aGlzLmFjZS5lbmRPcGVyYXRpb24oKTtcbiAgICB9XG4gIH07XG4gIHRoaXMuZ2V0Q3Vyc29yID0gZnVuY3Rpb24ocCkge1xuICAgIHZhciBzZWwgPSB0aGlzLmFjZS5zZWxlY3Rpb247XG4gICAgdmFyIHBvcyA9IHAgPT0gJ2FuY2hvcicgPyAoc2VsLmlzRW1wdHkoKSA/IHNlbC5sZWFkIDogc2VsLmFuY2hvcikgOlxuICAgICAgICBwID09ICdoZWFkJyB8fCAhcCA/IHNlbC5sZWFkIDogc2VsLmdldFJhbmdlKClbcF07XG4gICAgcmV0dXJuIHRvQ21Qb3MocG9zKTtcbiAgfTtcbiAgdGhpcy5saXN0U2VsZWN0aW9ucyA9IGZ1bmN0aW9uKHApIHtcbiAgICB2YXIgcmFuZ2VzID0gdGhpcy5hY2UubXVsdGlTZWxlY3QucmFuZ2VMaXN0LnJhbmdlcztcbiAgICBpZiAoIXJhbmdlcy5sZW5ndGggfHwgdGhpcy5hY2UuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSlcbiAgICAgIHJldHVybiBbe2FuY2hvcjogdGhpcy5nZXRDdXJzb3IoJ2FuY2hvcicpLCBoZWFkOiB0aGlzLmdldEN1cnNvcignaGVhZCcpfV07XG4gICAgcmV0dXJuIHJhbmdlcy5tYXAoZnVuY3Rpb24ocikge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYW5jaG9yOiB0aGlzLmNsaXBQb3ModG9DbVBvcyhyLmN1cnNvciA9PSByLmVuZCA/IHIuc3RhcnQgOiByLmVuZCkpLFxuICAgICAgICBoZWFkOiB0aGlzLmNsaXBQb3ModG9DbVBvcyhyLmN1cnNvcikpXG4gICAgICB9O1xuICAgIH0sIHRoaXMpO1xuICB9O1xuICB0aGlzLnNldFNlbGVjdGlvbnMgPSBmdW5jdGlvbihwLCBwcmltSW5kZXgpIHtcbiAgICB2YXIgc2VsID0gdGhpcy5hY2UubXVsdGlTZWxlY3Q7XG4gICAgdmFyIHJhbmdlcyA9IHAubWFwKGZ1bmN0aW9uKHgpIHtcbiAgICAgIHZhciBhbmNob3IgPSB0b0FjZVBvcyh4LmFuY2hvcik7XG4gICAgICB2YXIgaGVhZCA9IHRvQWNlUG9zKHguaGVhZCk7XG4gICAgICB2YXIgciA9IFJhbmdlLmNvbXBhcmVQb2ludHMoYW5jaG9yLCBoZWFkKSA8IDBcbiAgICAgICAgPyBuZXcgUmFuZ2UuZnJvbVBvaW50cyhhbmNob3IsIGhlYWQpXG4gICAgICAgIDogbmV3IFJhbmdlLmZyb21Qb2ludHMoaGVhZCwgYW5jaG9yKTtcbiAgICAgIHIuY3Vyc29yID0gUmFuZ2UuY29tcGFyZVBvaW50cyhyLnN0YXJ0LCBoZWFkKSA/IHIuZW5kIDogci5zdGFydDtcbiAgICAgIHJldHVybiByO1xuICAgIH0pO1xuXG4gICAgaWYgKHRoaXMuYWNlLmluVmlydHVhbFNlbGVjdGlvbk1vZGUpIHtcbiAgICAgIHRoaXMuYWNlLnNlbGVjdGlvbi5mcm9tT3JpZW50ZWRSYW5nZShyYW5nZXNbMF0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXByaW1JbmRleCkge1xuICAgICAgICByYW5nZXMgPSByYW5nZXMucmV2ZXJzZSgpO1xuICAgIH0gZWxzZSBpZiAocmFuZ2VzW3ByaW1JbmRleF0pIHtcbiAgICAgICByYW5nZXMucHVzaChyYW5nZXMuc3BsaWNlKHByaW1JbmRleCwgMSlbMF0pO1xuICAgIH1cbiAgICBzZWwudG9TaW5nbGVSYW5nZShyYW5nZXNbMF0uY2xvbmUoKSk7XG4gICAgdmFyIHNlc3Npb24gPSB0aGlzLmFjZS5zZXNzaW9uO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLiRjbGlwUmFuZ2VUb0RvY3VtZW50KHJhbmdlc1tpXSk7IC8vIHRvZG8gd2h5IGFjZSBkb2Vzbid0IGRvIHRoaXM/XG4gICAgICBzZWwuYWRkUmFuZ2UocmFuZ2UpO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5zZXRTZWxlY3Rpb24gPSBmdW5jdGlvbihhLCBoLCBvcHRpb25zKSB7XG4gICAgdmFyIHNlbCA9IHRoaXMuYWNlLnNlbGVjdGlvbjtcbiAgICBzZWwubW92ZVRvKGEubGluZSwgYS5jaCk7XG4gICAgc2VsLnNlbGVjdFRvKGgubGluZSwgaC5jaCk7XG4gICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5vcmlnaW4gPT0gJyptb3VzZScpIHtcbiAgICAgIHRoaXMub25CZWZvcmVFbmRPcGVyYXRpb24oKTtcbiAgICB9XG4gIH07XG4gIHRoaXMuc29tZXRoaW5nU2VsZWN0ZWQgPSBmdW5jdGlvbihwKSB7XG4gICAgcmV0dXJuICF0aGlzLmFjZS5zZWxlY3Rpb24uaXNFbXB0eSgpO1xuICB9O1xuICB0aGlzLmNsaXBQb3MgPSBmdW5jdGlvbihwKSB7XG4gICAgdmFyIHBvcyA9IHRoaXMuYWNlLnNlc3Npb24uJGNsaXBQb3NpdGlvblRvRG9jdW1lbnQocC5saW5lLCBwLmNoKTtcbiAgICByZXR1cm4gdG9DbVBvcyhwb3MpO1xuICB9O1xuICB0aGlzLmZvbGRDb2RlID0gZnVuY3Rpb24ocG9zKSB7XG4gICAgdGhpcy5hY2Uuc2Vzc2lvbi4kdG9nZ2xlRm9sZFdpZGdldChwb3MubGluZSwge30pO1xuICB9O1xuICB0aGlzLm1hcmtUZXh0ID0gZnVuY3Rpb24oY3Vyc29yKSB7XG4gICAgLy8gb25seSB1c2VkIGZvciBmYXQtY3Vyc29yLCBub3QgbmVlZGVkXG4gICAgcmV0dXJuIHtjbGVhcjogZnVuY3Rpb24oKSB7fSwgZmluZDogZnVuY3Rpb24oKSB7fX07XG4gIH07XG4gIHRoaXMuJHVwZGF0ZU1hcmtlcnMgPSBmdW5jdGlvbihkZWx0YSkge1xuICAgIHZhciBpc0luc2VydCA9IGRlbHRhLmFjdGlvbiA9PSBcImluc2VydFwiO1xuICAgIHZhciBzdGFydCA9IGRlbHRhLnN0YXJ0O1xuICAgIHZhciBlbmQgPSBkZWx0YS5lbmQ7XG4gICAgdmFyIHJvd1NoaWZ0ID0gKGVuZC5yb3cgLSBzdGFydC5yb3cpICogKGlzSW5zZXJ0ID8gMSA6IC0xKTtcbiAgICB2YXIgY29sU2hpZnQgPSAoZW5kLmNvbHVtbiAtIHN0YXJ0LmNvbHVtbikgKiAoaXNJbnNlcnQgPyAxIDogLTEpO1xuICAgIGlmIChpc0luc2VydCkgZW5kID0gc3RhcnQ7XG5cbiAgICBmb3IgKHZhciBpIGluIHRoaXMubWFya3MpIHtcbiAgICAgIHZhciBwb2ludCA9IHRoaXMubWFya3NbaV07XG4gICAgICB2YXIgY21wID0gUmFuZ2UuY29tcGFyZVBvaW50cyhwb2ludCwgc3RhcnQpO1xuICAgICAgaWYgKGNtcCA8IDApIHtcbiAgICAgICAgY29udGludWU7IC8vIGRlbHRhIHN0YXJ0cyBhZnRlciB0aGUgcmFuZ2VcbiAgICAgIH1cbiAgICAgIGlmIChjbXAgPT09IDApIHtcbiAgICAgICAgaWYgKGlzSW5zZXJ0KSB7XG4gICAgICAgICAgaWYgKCFwb2ludC4kaW5zZXJ0UmlnaHQpIHtcbiAgICAgICAgICAgIGNtcCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHBvaW50LmJpYXMgPT0gMSkge1xuICAgICAgICAgICAgY21wID0gMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcG9pbnQuYmlhcyA9IC0xO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgY21wMiA9IGlzSW5zZXJ0ID8gY21wIDogUmFuZ2UuY29tcGFyZVBvaW50cyhwb2ludCwgZW5kKTtcbiAgICAgIGlmIChjbXAyID4gMCkge1xuICAgICAgICBwb2ludC5yb3cgKz0gcm93U2hpZnQ7XG4gICAgICAgIHBvaW50LmNvbHVtbiArPSBwb2ludC5yb3cgPT0gZW5kLnJvdyA/IGNvbFNoaWZ0IDogMDtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoIWlzSW5zZXJ0ICYmIGNtcDIgPD0gMCkge1xuICAgICAgICBwb2ludC5yb3cgPSBzdGFydC5yb3c7XG4gICAgICAgIHBvaW50LmNvbHVtbiA9IHN0YXJ0LmNvbHVtbjtcbiAgICAgICAgaWYgKGNtcDIgPT09IDApXG4gICAgICAgICAgcG9pbnQuYmlhcyA9IDE7XG4gICAgICB9XG4gICAgfVxuICB9O1xuICB2YXIgTWFya2VyID0gZnVuY3Rpb24oY20sIGlkLCByb3csIGNvbHVtbikge1xuICAgIHRoaXMuY20gPSBjbTtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5yb3cgPSByb3c7XG4gICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gICAgY20ubWFya3NbdGhpcy5pZF0gPSB0aGlzO1xuICB9O1xuICBNYXJrZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24oKSB7IGRlbGV0ZSB0aGlzLmNtLm1hcmtzW3RoaXMuaWRdIH07XG4gIE1hcmtlci5wcm90b3R5cGUuZmluZCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdG9DbVBvcyh0aGlzKSB9O1xuICB0aGlzLnNldEJvb2ttYXJrID0gZnVuY3Rpb24oY3Vyc29yLCBvcHRpb25zKSB7XG4gICAgdmFyIGJtID0gbmV3IE1hcmtlcih0aGlzLCB0aGlzLiR1aWQrKywgY3Vyc29yLmxpbmUsIGN1cnNvci5jaCk7XG4gICAgaWYgKCFvcHRpb25zIHx8ICFvcHRpb25zLmluc2VydExlZnQpXG4gICAgICBibS4kaW5zZXJ0UmlnaHQgPSB0cnVlO1xuICAgIHRoaXMubWFya3NbYm0uaWRdID0gYm07XG4gICAgcmV0dXJuIGJtO1xuICB9O1xuICB0aGlzLm1vdmVIID0gZnVuY3Rpb24oaW5jcmVtZW50LCB1bml0KSB7XG4gICAgaWYgKHVuaXQgPT0gJ2NoYXInKSB7XG4gICAgICB2YXIgc2VsID0gdGhpcy5hY2Uuc2VsZWN0aW9uO1xuICAgICAgc2VsLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICBzZWwubW92ZUN1cnNvckJ5KDAsIGluY3JlbWVudCk7XG4gICAgfVxuICB9O1xuICB0aGlzLmZpbmRQb3NWID0gZnVuY3Rpb24oc3RhcnQsIGFtb3VudCwgdW5pdCwgZ29hbENvbHVtbikge1xuICAgIGlmICh1bml0ID09ICdwYWdlJykge1xuICAgICAgdmFyIHJlbmRlcmVyID0gdGhpcy5hY2UucmVuZGVyZXI7XG4gICAgICB2YXIgY29uZmlnID0gcmVuZGVyZXIubGF5ZXJDb25maWc7XG4gICAgICBhbW91bnQgPSBhbW91bnQgKiBNYXRoLmZsb29yKGNvbmZpZy5oZWlnaHQgLyBjb25maWcubGluZUhlaWdodCk7XG4gICAgICB1bml0ID0gJ2xpbmUnO1xuICAgIH1cbiAgICBpZiAodW5pdCA9PSAnbGluZScpIHtcbiAgICAgIHZhciBzY3JlZW5Qb3MgPSB0aGlzLmFjZS5zZXNzaW9uLmRvY3VtZW50VG9TY3JlZW5Qb3NpdGlvbihzdGFydC5saW5lLCBzdGFydC5jaCk7XG4gICAgICBpZiAoZ29hbENvbHVtbiAhPSBudWxsKVxuICAgICAgICBzY3JlZW5Qb3MuY29sdW1uID0gZ29hbENvbHVtbjtcbiAgICAgIHNjcmVlblBvcy5yb3cgKz0gYW1vdW50O1xuICAgICAgLy8gbm90IHdoYXQgY29kZW1pcnJvciBkb2VzIGJ1dCB2aW0gbW9kZSBuZWVkcyBvbmx5IHRoaXNcbiAgICAgIHNjcmVlblBvcy5yb3cgPSBNYXRoLm1pbihNYXRoLm1heCgwLCBzY3JlZW5Qb3Mucm93KSwgdGhpcy5hY2Uuc2Vzc2lvbi5nZXRTY3JlZW5MZW5ndGgoKSAtIDEpO1xuICAgICAgdmFyIHBvcyA9IHRoaXMuYWNlLnNlc3Npb24uc2NyZWVuVG9Eb2N1bWVudFBvc2l0aW9uKHNjcmVlblBvcy5yb3csIHNjcmVlblBvcy5jb2x1bW4pO1xuICAgICAgcmV0dXJuIHRvQ21Qb3MocG9zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVidWdnZXI7XG4gICAgfVxuICB9O1xuICB0aGlzLmNoYXJDb29yZHMgPSBmdW5jdGlvbihwb3MsIG1vZGUpIHtcbiAgICBpZiAobW9kZSA9PSAnZGl2JyB8fCAhbW9kZSkge1xuICAgICAgdmFyIHNjID0gdGhpcy5hY2Uuc2Vzc2lvbi5kb2N1bWVudFRvU2NyZWVuUG9zaXRpb24ocG9zLmxpbmUsIHBvcy5jaCk7XG4gICAgICByZXR1cm4ge2xlZnQ6IHNjLmNvbHVtbiwgdG9wOiBzYy5yb3d9O1xuICAgIH1pZiAobW9kZSA9PSAnbG9jYWwnKSB7XG4gICAgICB2YXIgcmVuZGVyZXIgPSB0aGlzLmFjZS5yZW5kZXJlcjtcbiAgICAgIHZhciBzYyA9IHRoaXMuYWNlLnNlc3Npb24uZG9jdW1lbnRUb1NjcmVlblBvc2l0aW9uKHBvcy5saW5lLCBwb3MuY2gpO1xuICAgICAgdmFyIGxoID0gcmVuZGVyZXIubGF5ZXJDb25maWcubGluZUhlaWdodDtcbiAgICAgIHZhciBjdyA9IHJlbmRlcmVyLmxheWVyQ29uZmlnLmNoYXJhY3RlcldpZHRoO1xuICAgICAgdmFyIHRvcCA9IGxoICogc2Mucm93O1xuICAgICAgcmV0dXJuIHtsZWZ0OiBzYy5jb2x1bW4gKiBjdywgdG9wOiB0b3AsIGJvdHRvbTogdG9wICsgbGh9O1xuICAgIH1cbiAgfTtcbiAgdGhpcy5jb29yZHNDaGFyID0gZnVuY3Rpb24ocG9zLCBtb2RlKSB7XG4gICAgdmFyIHJlbmRlcmVyID0gdGhpcy5hY2UucmVuZGVyZXI7XG4gICAgaWYgKG1vZGUgPT0gJ2xvY2FsJykge1xuICAgICAgdmFyIHJvdyA9IE1hdGgubWF4KDAsIE1hdGguZmxvb3IocG9zLnRvcCAvIHJlbmRlcmVyLmxpbmVIZWlnaHQpKTtcbiAgICAgIHZhciBjb2wgPSBNYXRoLm1heCgwLCBNYXRoLmZsb29yKHBvcy5sZWZ0IC8gcmVuZGVyZXIuY2hhcmFjdGVyV2lkdGgpKTtcbiAgICAgIHZhciBjaCA9IHJlbmRlcmVyLnNlc3Npb24uc2NyZWVuVG9Eb2N1bWVudFBvc2l0aW9uKHJvdywgY29sKTtcbiAgICAgIHJldHVybiB0b0NtUG9zKGNoKTtcbiAgICB9IGVsc2UgaWYgKG1vZGUgPT0gJ2RpdicpIHtcbiAgICAgIHRocm93IFwibm90IGltcGxlbWVudGVkXCI7XG4gICAgfVxuICB9O1xuICB0aGlzLmdldFNlYXJjaEN1cnNvciA9IGZ1bmN0aW9uKHF1ZXJ5LCBwb3MsIGNhc2VGb2xkKSB7XG4gICAgdmFyIGNhc2VTZW5zaXRpdmUgPSBmYWxzZTtcbiAgICB2YXIgaXNSZWdleHAgPSBmYWxzZTtcbiAgICBpZiAocXVlcnkgaW5zdGFuY2VvZiBSZWdFeHAgJiYgIXF1ZXJ5Lmdsb2JhbCkge1xuICAgICAgY2FzZVNlbnNpdGl2ZSA9ICFxdWVyeS5pZ25vcmVDYXNlO1xuICAgICAgcXVlcnkgPSBxdWVyeS5zb3VyY2U7XG4gICAgICBpc1JlZ2V4cCA9IHRydWU7XG4gICAgfVxuICAgIGlmIChxdWVyeSA9PSBcIlxcXFxuXCIpIHsgcXVlcnkgPSBcIlxcblwiOyBpc1JlZ2V4cCA9IGZhbHNlOyB9XG4gICAgdmFyIHNlYXJjaCA9IG5ldyBTZWFyY2goKTtcbiAgICBpZiAocG9zLmNoID09IHVuZGVmaW5lZCkgcG9zLmNoID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICB2YXIgYWNlUG9zID0ge3JvdzogcG9zLmxpbmUsIGNvbHVtbjogcG9zLmNofTtcbiAgICB2YXIgY20gPSB0aGlzO1xuICAgIHZhciBsYXN0ID0gbnVsbDtcbiAgICByZXR1cm4ge1xuICAgICAgZmluZE5leHQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5maW5kKGZhbHNlKSB9LFxuICAgICAgZmluZFByZXZpb3VzOiBmdW5jdGlvbigpIHtyZXR1cm4gdGhpcy5maW5kKHRydWUpIH0sXG4gICAgICBmaW5kOiBmdW5jdGlvbihiYWNrKSB7XG4gICAgICAgIHNlYXJjaC5zZXRPcHRpb25zKHtcbiAgICAgICAgICBuZWVkbGU6IHF1ZXJ5LFxuICAgICAgICAgIGNhc2VTZW5zaXRpdmU6IGNhc2VTZW5zaXRpdmUsXG4gICAgICAgICAgd3JhcDogZmFsc2UsXG4gICAgICAgICAgYmFja3dhcmRzOiBiYWNrLFxuICAgICAgICAgIHJlZ0V4cDogaXNSZWdleHAsXG4gICAgICAgICAgc3RhcnQ6IGxhc3QgfHwgYWNlUG9zXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgcmFuZ2UgPSBzZWFyY2guZmluZChjbS5hY2Uuc2Vzc2lvbik7XG4gICAgICAgIGxhc3QgPSByYW5nZTtcbiAgICAgICAgcmV0dXJuIGxhc3QgJiYgWyFsYXN0LmlzRW1wdHkoKV07XG4gICAgICB9LFxuICAgICAgZnJvbTogZnVuY3Rpb24oKSB7IHJldHVybiBsYXN0ICYmIHRvQ21Qb3MobGFzdC5zdGFydCkgfSxcbiAgICAgIHRvOiBmdW5jdGlvbigpIHsgcmV0dXJuIGxhc3QgJiYgdG9DbVBvcyhsYXN0LmVuZCkgfSxcbiAgICAgIHJlcGxhY2U6IGZ1bmN0aW9uKHRleHQpIHtcbiAgICAgICAgaWYgKGxhc3QpIHtcbiAgICAgICAgICBsYXN0LmVuZCA9IGNtLmFjZS5zZXNzaW9uLmRvYy5yZXBsYWNlKGxhc3QsIHRleHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfTtcbiAgdGhpcy5zY3JvbGxUbyA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICB2YXIgcmVuZGVyZXIgPSB0aGlzLmFjZS5yZW5kZXJlcjtcbiAgICB2YXIgY29uZmlnID0gcmVuZGVyZXIubGF5ZXJDb25maWc7XG4gICAgdmFyIG1heEhlaWdodCA9IGNvbmZpZy5tYXhIZWlnaHQ7XG4gICAgbWF4SGVpZ2h0IC09IChyZW5kZXJlci4kc2l6ZS5zY3JvbGxlckhlaWdodCAtIHJlbmRlcmVyLmxpbmVIZWlnaHQpICogcmVuZGVyZXIuJHNjcm9sbFBhc3RFbmQ7XG4gICAgaWYgKHkgIT0gbnVsbCkgdGhpcy5hY2Uuc2Vzc2lvbi5zZXRTY3JvbGxUb3AoTWF0aC5tYXgoMCwgTWF0aC5taW4oeSwgbWF4SGVpZ2h0KSkpO1xuICAgIGlmICh4ICE9IG51bGwpIHRoaXMuYWNlLnNlc3Npb24uc2V0U2Nyb2xsTGVmdChNYXRoLm1heCgwLCBNYXRoLm1pbih4LCBjb25maWcud2lkdGgpKSk7XG4gIH07XG4gIHRoaXMuc2Nyb2xsSW5mbyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiAgdGhpcy5zY3JvbGxJbnRvVmlldyA9IGZ1bmN0aW9uKHBvcywgbWFyZ2luKSB7XG4gICAgaWYgKHBvcykge1xuICAgICAgdmFyIHJlbmRlcmVyID0gdGhpcy5hY2UucmVuZGVyZXI7XG4gICAgICB2YXIgdmlld01hcmdpbiA9IHsgXCJ0b3BcIjogMCwgXCJib3R0b21cIjogbWFyZ2luIH07XG4gICAgICByZW5kZXJlci5zY3JvbGxDdXJzb3JJbnRvVmlldyh0b0FjZVBvcyhwb3MpLFxuICAgICAgICAocmVuZGVyZXIubGluZUhlaWdodCAqIDIpIC8gcmVuZGVyZXIuJHNpemUuc2Nyb2xsZXJIZWlnaHQsIHZpZXdNYXJnaW4pO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5nZXRMaW5lID0gZnVuY3Rpb24ocm93KSB7IHJldHVybiB0aGlzLmFjZS5zZXNzaW9uLmdldExpbmUocm93KSB9O1xuICB0aGlzLmdldFJhbmdlID0gZnVuY3Rpb24ocywgZSkge1xuICAgIHJldHVybiB0aGlzLmFjZS5zZXNzaW9uLmdldFRleHRSYW5nZShuZXcgUmFuZ2Uocy5saW5lLCBzLmNoLCBlLmxpbmUsIGUuY2gpKTtcbiAgfTtcbiAgdGhpcy5yZXBsYWNlUmFuZ2UgPSBmdW5jdGlvbih0ZXh0LCBzLCBlKSB7XG4gICAgaWYgKCFlKSBlID0gcztcbiAgICAvLyB3b3JrYXJvdW5kIGZvciBzZXNzaW9uLnJlcGxhY2Ugbm90IGhhbmRsaW5nIG5lZ2F0aXZlIHJvd3NcbiAgICB2YXIgcmFuZ2UgPSBuZXcgUmFuZ2Uocy5saW5lLCBzLmNoLCBlLmxpbmUsIGUuY2gpO1xuICAgIHRoaXMuYWNlLnNlc3Npb24uJGNsaXBSYW5nZVRvRG9jdW1lbnQocmFuZ2UpO1xuICAgIHJldHVybiB0aGlzLmFjZS5zZXNzaW9uLnJlcGxhY2UocmFuZ2UsIHRleHQpO1xuICB9O1xuICB0aGlzLnJlcGxhY2VTZWxlY3Rpb24gPVxuICB0aGlzLnJlcGxhY2VTZWxlY3Rpb25zID0gZnVuY3Rpb24ocCkge1xuICAgIHZhciBzdHJpbmdzID0gQXJyYXkuaXNBcnJheShwKSAmJiBwO1xuICAgIHZhciBzZWwgPSB0aGlzLmFjZS5zZWxlY3Rpb247XG4gICAgaWYgKHRoaXMuYWNlLmluVmlydHVhbFNlbGVjdGlvbk1vZGUpIHtcbiAgICAgIHRoaXMuYWNlLnNlc3Npb24ucmVwbGFjZShzZWwuZ2V0UmFuZ2UoKSwgc3RyaW5ncyA/IHBbMF0gfHwgXCJcIjogcCApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZWwuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSA9IHRydWU7XG4gICAgdmFyIHJhbmdlcyA9IHNlbC5yYW5nZUxpc3QucmFuZ2VzO1xuICAgIGlmICghcmFuZ2VzLmxlbmd0aCkgcmFuZ2VzID0gW3RoaXMuYWNlLm11bHRpU2VsZWN0LmdldFJhbmdlKCldO1xuICAgIGZvciAodmFyIGkgPSByYW5nZXMubGVuZ3RoOyBpLS07KVxuICAgICAgIHRoaXMuYWNlLnNlc3Npb24ucmVwbGFjZShyYW5nZXNbaV0sIHN0cmluZ3MgPyBwW2ldIHx8IFwiXCIgOiBwKTtcbiAgICBzZWwuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSA9IGZhbHNlO1xuICB9O1xuICB0aGlzLmdldFNlbGVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmFjZS5nZXRTZWxlY3RlZFRleHQoKTtcbiAgfTtcbiAgdGhpcy5nZXRTZWxlY3Rpb25zID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubGlzdFNlbGVjdGlvbnMoKS5tYXAoZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UmFuZ2UoeC5hbmNob3IsIHguaGVhZCk7XG4gICAgfSwgdGhpcyk7XG4gIH07XG4gIHRoaXMuZ2V0SW5wdXRGaWVsZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmFjZS50ZXh0SW5wdXQuZ2V0RWxlbWVudCgpO1xuICB9O1xuICB0aGlzLmdldFdyYXBwZXJFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLmNvbnRhaW5lcjtcbiAgfTtcbiAgdmFyIG9wdE1hcCA9IHtcbiAgICBpbmRlbnRXaXRoVGFiczogXCJ1c2VTb2Z0VGFic1wiLFxuICAgIGluZGVudFVuaXQ6IFwidGFiU2l6ZVwiLFxuICAgIHRhYlNpemU6IFwidGFiU2l6ZVwiLFxuICAgIGZpcnN0TGluZU51bWJlcjogXCJmaXJzdExpbmVOdW1iZXJcIixcbiAgICByZWFkT25seTogXCJyZWFkT25seVwiXG4gIH07XG4gIHRoaXMuc2V0T3B0aW9uID0gZnVuY3Rpb24obmFtZSwgdmFsKSB7XG4gICAgdGhpcy5zdGF0ZVtuYW1lXSA9IHZhbDtcbiAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgIGNhc2UgJ2luZGVudFdpdGhUYWJzJzpcbiAgICAgICAgbmFtZSA9IG9wdE1hcFtuYW1lXTtcbiAgICAgICAgdmFsID0gIXZhbDtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAna2V5TWFwJzpcbiAgICAgICAgdGhpcy5zdGF0ZS4ka2V5TWFwID0gdmFsO1xuICAgICAgICByZXR1cm47XG4gICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG5hbWUgPSBvcHRNYXBbbmFtZV07XG4gICAgfVxuICAgIGlmIChuYW1lKVxuICAgICAgdGhpcy5hY2Uuc2V0T3B0aW9uKG5hbWUsIHZhbCk7XG4gIH07XG4gIHRoaXMuZ2V0T3B0aW9uID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciB2YWw7XG4gICAgdmFyIGFjZU9wdCA9IG9wdE1hcFtuYW1lXTtcbiAgICBpZiAoYWNlT3B0KVxuICAgICAgdmFsID0gdGhpcy5hY2UuZ2V0T3B0aW9uKGFjZU9wdCk7XG4gICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICBjYXNlICdpbmRlbnRXaXRoVGFicyc6XG4gICAgICAgIG5hbWUgPSBvcHRNYXBbbmFtZV07XG4gICAgICAgIHJldHVybiAhdmFsO1xuICAgICAgY2FzZSAna2V5TWFwJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuJGtleU1hcCB8fCAndmltJztcbiAgICB9XG4gICAgcmV0dXJuIGFjZU9wdCA/IHZhbCA6IHRoaXMuc3RhdGVbbmFtZV07XG4gIH07XG4gIHRoaXMudG9nZ2xlT3ZlcndyaXRlID0gZnVuY3Rpb24ob24pIHtcbiAgICB0aGlzLnN0YXRlLm92ZXJ3cml0ZSA9IG9uO1xuICAgIHJldHVybiB0aGlzLmFjZS5zZXRPdmVyd3JpdGUob24pO1xuICB9O1xuICB0aGlzLmFkZE92ZXJsYXkgPSBmdW5jdGlvbihvKSB7XG4gICAgaWYgKCF0aGlzLiRzZWFyY2hIaWdobGlnaHQgfHwgIXRoaXMuJHNlYXJjaEhpZ2hsaWdodC5zZXNzaW9uKSB7XG4gICAgICB2YXIgaGlnaGxpZ2h0ID0gbmV3IFNlYXJjaEhpZ2hsaWdodChudWxsLCBcImFjZV9oaWdobGlnaHQtbWFya2VyXCIsIFwidGV4dFwiKTtcbiAgICAgIHZhciBtYXJrZXIgPSB0aGlzLmFjZS5zZXNzaW9uLmFkZER5bmFtaWNNYXJrZXIoaGlnaGxpZ2h0KTtcbiAgICAgIGhpZ2hsaWdodC5pZCA9IG1hcmtlci5pZDtcbiAgICAgIGhpZ2hsaWdodC5zZXNzaW9uID0gdGhpcy5hY2Uuc2Vzc2lvbjtcbiAgICAgIGhpZ2hsaWdodC5kZXN0cm95ID0gZnVuY3Rpb24obykge1xuICAgICAgICBoaWdobGlnaHQuc2Vzc2lvbi5vZmYoXCJjaGFuZ2VcIiwgaGlnaGxpZ2h0LnVwZGF0ZU9uQ2hhbmdlKTtcbiAgICAgICAgaGlnaGxpZ2h0LnNlc3Npb24ub2ZmKFwiY2hhbmdlRWRpdG9yXCIsIGhpZ2hsaWdodC5kZXN0cm95KTtcbiAgICAgICAgaGlnaGxpZ2h0LnNlc3Npb24ucmVtb3ZlTWFya2VyKGhpZ2hsaWdodC5pZCk7XG4gICAgICAgIGhpZ2hsaWdodC5zZXNzaW9uID0gbnVsbDtcbiAgICAgIH07XG4gICAgICBoaWdobGlnaHQudXBkYXRlT25DaGFuZ2UgPSBmdW5jdGlvbihkZWx0YSkge1xuICAgICAgICB2YXIgcm93ID0gZGVsdGEuc3RhcnQucm93O1xuICAgICAgICBpZiAocm93ID09IGRlbHRhLmVuZC5yb3cpIGhpZ2hsaWdodC5jYWNoZVtyb3ddID0gdW5kZWZpbmVkO1xuICAgICAgICBlbHNlIGhpZ2hsaWdodC5jYWNoZS5zcGxpY2Uocm93LCBoaWdobGlnaHQuY2FjaGUubGVuZ3RoKTtcbiAgICAgIH07XG4gICAgICBoaWdobGlnaHQuc2Vzc2lvbi5vbihcImNoYW5nZUVkaXRvclwiLCBoaWdobGlnaHQuZGVzdHJveSk7XG4gICAgICBoaWdobGlnaHQuc2Vzc2lvbi5vbihcImNoYW5nZVwiLCBoaWdobGlnaHQudXBkYXRlT25DaGFuZ2UpO1xuICAgIH1cbiAgICB2YXIgcmUgPSBuZXcgUmVnRXhwKG8ucXVlcnkuc291cmNlLCBcImdtaVwiKTtcbiAgICB0aGlzLiRzZWFyY2hIaWdobGlnaHQgPSBvLmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcbiAgICB0aGlzLiRzZWFyY2hIaWdobGlnaHQuc2V0UmVnZXhwKHJlKTtcbiAgICB0aGlzLmFjZS5yZW5kZXJlci51cGRhdGVCYWNrTWFya2VycygpO1xuICB9O1xuICB0aGlzLnJlbW92ZU92ZXJsYXkgPSBmdW5jdGlvbihvKSB7XG4gICAgaWYgKHRoaXMuJHNlYXJjaEhpZ2hsaWdodCAmJiB0aGlzLiRzZWFyY2hIaWdobGlnaHQuc2Vzc2lvbikge1xuICAgICAgdGhpcy4kc2VhcmNoSGlnaGxpZ2h0LmRlc3Ryb3koKTtcbiAgICB9XG4gIH07XG4gIHRoaXMuZ2V0U2Nyb2xsSW5mbyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXMuYWNlLnJlbmRlcmVyO1xuICAgIHZhciBjb25maWcgPSByZW5kZXJlci5sYXllckNvbmZpZztcbiAgICByZXR1cm4ge1xuICAgICAgbGVmdDogcmVuZGVyZXIuc2Nyb2xsTGVmdCxcbiAgICAgIHRvcDogcmVuZGVyZXIuc2Nyb2xsVG9wLFxuICAgICAgaGVpZ2h0OiBjb25maWcubWF4SGVpZ2h0LFxuICAgICAgd2lkdGg6IGNvbmZpZy53aWR0aCxcbiAgICAgIGNsaWVudEhlaWdodDogY29uZmlnLmhlaWdodCxcbiAgICAgIGNsaWVudFdpZHRoOiBjb25maWcud2lkdGhcbiAgICB9O1xuICB9O1xuICB0aGlzLmdldFZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLmdldFZhbHVlKCk7XG4gIH07XG4gIHRoaXMuc2V0VmFsdWUgPSBmdW5jdGlvbih2KSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLnNldFZhbHVlKHYsIC0xKTtcbiAgfTtcbiAgdGhpcy5nZXRUb2tlblR5cGVBdCA9IGZ1bmN0aW9uKHBvcykge1xuICAgIHZhciB0b2tlbiA9IHRoaXMuYWNlLnNlc3Npb24uZ2V0VG9rZW5BdChwb3MubGluZSwgcG9zLmNoKTtcbiAgICByZXR1cm4gdG9rZW4gJiYgL2NvbW1lbnR8c3RyaW5nLy50ZXN0KHRva2VuLnR5cGUpID8gXCJzdHJpbmdcIiA6IFwiXCI7XG4gIH07XG4gIHRoaXMuZmluZE1hdGNoaW5nQnJhY2tldCA9IGZ1bmN0aW9uKHBvcykge1xuICAgIHZhciBtID0gdGhpcy5hY2Uuc2Vzc2lvbi5maW5kTWF0Y2hpbmdCcmFja2V0KHRvQWNlUG9zKHBvcykpO1xuICAgIHJldHVybiB7dG86IG0gJiYgdG9DbVBvcyhtKX07XG4gIH07XG4gIHRoaXMuZmluZE1hdGNoaW5nVGFnID0gZnVuY3Rpb24gKHBvcykge1xuICAgIHZhciBtID0gdGhpcy5hY2Uuc2Vzc2lvbi5nZXRNYXRjaGluZ1RhZ3ModG9BY2VQb3MocG9zKSk7XG4gICAgaWYgKCFtKSByZXR1cm47XG4gICAgcmV0dXJuIHtcbiAgICAgIG9wZW46IHtcbiAgICAgICAgZnJvbTogdG9DbVBvcyhtLm9wZW5UYWcuc3RhcnQpLFxuICAgICAgICB0bzogdG9DbVBvcyhtLm9wZW5UYWcuZW5kKVxuICAgICAgfSxcbiAgICAgIGNsb3NlOiB7XG4gICAgICAgIGZyb206IHRvQ21Qb3MobS5jbG9zZVRhZy5zdGFydCksXG4gICAgICAgIHRvOiB0b0NtUG9zKG0uY2xvc2VUYWcuZW5kKVxuICAgICAgfVxuICAgIH07XG4gIH07XG4gIHRoaXMuaW5kZW50TGluZSA9IGZ1bmN0aW9uKGxpbmUsIG1ldGhvZCkge1xuICAgIGlmIChtZXRob2QgPT09IHRydWUpXG4gICAgICAgIHRoaXMuYWNlLnNlc3Npb24uaW5kZW50Um93cyhsaW5lLCBsaW5lLCBcIlxcdFwiKTtcbiAgICBlbHNlIGlmIChtZXRob2QgPT09IGZhbHNlKVxuICAgICAgICB0aGlzLmFjZS5zZXNzaW9uLm91dGRlbnRSb3dzKG5ldyBSYW5nZShsaW5lLCAwLCBsaW5lLCAwKSk7XG4gIH07XG4gIHRoaXMuaW5kZXhGcm9tUG9zID0gZnVuY3Rpb24ocG9zKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLnNlc3Npb24uZG9jLnBvc2l0aW9uVG9JbmRleCh0b0FjZVBvcyhwb3MpKTtcbiAgfTtcbiAgdGhpcy5wb3NGcm9tSW5kZXggPSBmdW5jdGlvbihpbmRleCkge1xuICAgIHJldHVybiB0b0NtUG9zKHRoaXMuYWNlLnNlc3Npb24uZG9jLmluZGV4VG9Qb3NpdGlvbihpbmRleCkpO1xuICB9O1xuICB0aGlzLmZvY3VzID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5hY2UudGV4dElucHV0LmZvY3VzKCk7XG4gIH07XG4gIHRoaXMuYmx1ciA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLmJsdXIoKTtcbiAgfTtcbiAgdGhpcy5kZWZhdWx0VGV4dEhlaWdodCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLnJlbmRlcmVyLmxheWVyQ29uZmlnLmxpbmVIZWlnaHQ7XG4gIH07XG4gIHRoaXMuc2NhbkZvckJyYWNrZXQgPSBmdW5jdGlvbihwb3MsIGRpciwgXywgb3B0aW9ucykge1xuICAgIHZhciByZSA9IG9wdGlvbnMuYnJhY2tldFJlZ2V4LnNvdXJjZTtcbiAgICB2YXIgdG9rZW5SZSA9IC9wYXJlbnx0ZXh0fG9wZXJhdG9yfHRhZy87XG4gICAgaWYgKGRpciA9PSAxKSB7XG4gICAgICB2YXIgbSA9IHRoaXMuYWNlLnNlc3Npb24uJGZpbmRDbG9zaW5nQnJhY2tldChyZS5zbGljZSgxLCAyKSwgdG9BY2VQb3MocG9zKSwgdG9rZW5SZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtID0gdGhpcy5hY2Uuc2Vzc2lvbi4kZmluZE9wZW5pbmdCcmFja2V0KHJlLnNsaWNlKC0yLCAtMSksIHtyb3c6IHBvcy5saW5lLCBjb2x1bW46IHBvcy5jaCArIDF9LCB0b2tlblJlKTtcbiAgICAgIGlmICghbSAmJiBvcHRpb25zLmJyYWNrZXRSZWdleCAmJiBvcHRpb25zLmJyYWNrZXRSZWdleC50ZXN0KHRoaXMuZ2V0TGluZShwb3MubGluZSlbcG9zLmNoIC0gMV0pKSB7XG4gICAgICAgICAgbSA9IHtyb3c6IHBvcy5saW5lLCBjb2x1bW46IHBvcy5jaCAtIDF9O1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbSAmJiB7cG9zOiB0b0NtUG9zKG0pfTtcbiAgfTtcbiAgdGhpcy5yZWZyZXNoID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLnJlc2l6ZSh0cnVlKTtcbiAgfTtcbiAgdGhpcy5nZXRNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHsgbmFtZSA6IHRoaXMuZ2V0T3B0aW9uKFwibW9kZVwiKSB9O1xuICB9O1xuICB0aGlzLmV4ZWNDb21tYW5kID0gZnVuY3Rpb24obmFtZSkge1xuICAgIGlmIChDb2RlTWlycm9yLmNvbW1hbmRzLmhhc093blByb3BlcnR5KG5hbWUpKSByZXR1cm4gQ29kZU1pcnJvci5jb21tYW5kc1tuYW1lXSh0aGlzKTtcbiAgICBpZiAobmFtZSA9PSBcImluZGVudEF1dG9cIikgcmV0dXJuIHRoaXMuYWNlLmV4ZWNDb21tYW5kKFwiYXV0b2luZGVudFwiKTtcbiAgICBjb25zb2xlLmxvZyhuYW1lICsgXCIgaXMgbm90IGltcGxlbWVudGVkXCIpO1xuICB9O1xuICB0aGlzLmdldExpbmVOdW1iZXIgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICB2YXIgZGVsdGFzID0gdGhpcy4kbGluZUhhbmRsZUNoYW5nZXM7XG4gICAgaWYgKCFkZWx0YXMpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIHZhciByb3cgPSBoYW5kbGUucm93O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVsdGFzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBkZWx0YSA9IGRlbHRhc1tpXTtcbiAgICAgICAgaWYgKGRlbHRhLnN0YXJ0LnJvdyAhPSBkZWx0YS5lbmQucm93KSB7XG4gICAgICAgICAgICBpZiAoZGVsdGEuYWN0aW9uWzBdID09IFwiaVwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhLnN0YXJ0LnJvdyA8IHJvdylcbiAgICAgICAgICAgICAgICAgICAgcm93ICs9IGRlbHRhLmVuZC5yb3cgLSBkZWx0YS5zdGFydC5yb3c7XG4gICAgICAgICAgICB9ICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVsdGEuc3RhcnQucm93IDwgcm93KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyb3cgPCBkZWx0YS5lbmQucm93IHx8IHJvdyA9PSBkZWx0YS5lbmQucm93ICYmIGRlbHRhLnN0YXJ0LmNvbHVtbiA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJvdyAtPSBkZWx0YS5lbmQucm93IC0gZGVsdGEuc3RhcnQucm93O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcm93O1xuICB9O1xuICB0aGlzLmdldExpbmVIYW5kbGUgPSBmdW5jdGlvbihyb3cpIHtcbiAgICBpZiAoIXRoaXMuJGxpbmVIYW5kbGVDaGFuZ2VzKVxuICAgICAgdGhpcy4kbGluZUhhbmRsZUNoYW5nZXMgPSBbXTtcbiAgICByZXR1cm4ge3RleHQ6IHRoaXMuYWNlLnNlc3Npb24uZ2V0TGluZShyb3cpLCByb3c6IHJvd307XG4gIH07XG4gIHRoaXMucmVsZWFzZUxpbmVIYW5kbGVzID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kbGluZUhhbmRsZUNoYW5nZXMgPSB1bmRlZmluZWQ7XG4gIH07XG4gIHRoaXMuZ2V0TGFzdEVkaXRFbmQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdW5kb01hbmFnZXIgPSB0aGlzLmFjZS5zZXNzaW9uLiR1bmRvTWFuYWdlcjtcbiAgICBpZiAodW5kb01hbmFnZXIgJiYgdW5kb01hbmFnZXIuJGxhc3REZWx0YSlcbiAgICAgIHJldHVybiB0b0NtUG9zKHVuZG9NYW5hZ2VyLiRsYXN0RGVsdGEuZW5kKTtcbiAgfTtcbn0pLmNhbGwoQ29kZU1pcnJvci5wcm90b3R5cGUpO1xuICBmdW5jdGlvbiB0b0FjZVBvcyhjbVBvcykge1xuICAgIHJldHVybiB7cm93OiBjbVBvcy5saW5lLCBjb2x1bW46IGNtUG9zLmNofTtcbiAgfVxuICBmdW5jdGlvbiB0b0NtUG9zKGFjZVBvcykge1xuICAgIHJldHVybiBuZXcgUG9zKGFjZVBvcy5yb3csIGFjZVBvcy5jb2x1bW4pO1xuICB9XG5cbiAgdmFyIFN0cmluZ1N0cmVhbSA9IENvZGVNaXJyb3IuU3RyaW5nU3RyZWFtID0gZnVuY3Rpb24oc3RyaW5nLCB0YWJTaXplKSB7XG4gICAgdGhpcy5wb3MgPSB0aGlzLnN0YXJ0ID0gMDtcbiAgICB0aGlzLnN0cmluZyA9IHN0cmluZztcbiAgICB0aGlzLnRhYlNpemUgPSB0YWJTaXplIHx8IDg7XG4gICAgdGhpcy5sYXN0Q29sdW1uUG9zID0gdGhpcy5sYXN0Q29sdW1uVmFsdWUgPSAwO1xuICAgIHRoaXMubGluZVN0YXJ0ID0gMDtcbiAgfTtcblxuICBTdHJpbmdTdHJlYW0ucHJvdG90eXBlID0ge1xuICAgIGVvbDogZnVuY3Rpb24oKSB7cmV0dXJuIHRoaXMucG9zID49IHRoaXMuc3RyaW5nLmxlbmd0aDt9LFxuICAgIHNvbDogZnVuY3Rpb24oKSB7cmV0dXJuIHRoaXMucG9zID09IHRoaXMubGluZVN0YXJ0O30sXG4gICAgcGVlazogZnVuY3Rpb24oKSB7cmV0dXJuIHRoaXMuc3RyaW5nLmNoYXJBdCh0aGlzLnBvcykgfHwgdW5kZWZpbmVkO30sXG4gICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5wb3MgPCB0aGlzLnN0cmluZy5sZW5ndGgpXG4gICAgICAgIHJldHVybiB0aGlzLnN0cmluZy5jaGFyQXQodGhpcy5wb3MrKyk7XG4gICAgfSxcbiAgICBlYXQ6IGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICB2YXIgY2ggPSB0aGlzLnN0cmluZy5jaGFyQXQodGhpcy5wb3MpO1xuICAgICAgaWYgKHR5cGVvZiBtYXRjaCA9PSBcInN0cmluZ1wiKSB2YXIgb2sgPSBjaCA9PSBtYXRjaDtcbiAgICAgIGVsc2UgdmFyIG9rID0gY2ggJiYgKG1hdGNoLnRlc3QgPyBtYXRjaC50ZXN0KGNoKSA6IG1hdGNoKGNoKSk7XG4gICAgICBpZiAob2spIHsrK3RoaXMucG9zOyByZXR1cm4gY2g7fVxuICAgIH0sXG4gICAgZWF0V2hpbGU6IGZ1bmN0aW9uKG1hdGNoKSB7XG4gICAgICB2YXIgc3RhcnQgPSB0aGlzLnBvcztcbiAgICAgIHdoaWxlICh0aGlzLmVhdChtYXRjaCkpe31cbiAgICAgIHJldHVybiB0aGlzLnBvcyA+IHN0YXJ0O1xuICAgIH0sXG4gICAgZWF0U3BhY2U6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5wb3M7XG4gICAgICB3aGlsZSAoL1tcXHNcXHUwMGEwXS8udGVzdCh0aGlzLnN0cmluZy5jaGFyQXQodGhpcy5wb3MpKSkgKyt0aGlzLnBvcztcbiAgICAgIHJldHVybiB0aGlzLnBvcyA+IHN0YXJ0O1xuICAgIH0sXG4gICAgc2tpcFRvRW5kOiBmdW5jdGlvbigpIHt0aGlzLnBvcyA9IHRoaXMuc3RyaW5nLmxlbmd0aDt9LFxuICAgIHNraXBUbzogZnVuY3Rpb24oY2gpIHtcbiAgICAgIHZhciBmb3VuZCA9IHRoaXMuc3RyaW5nLmluZGV4T2YoY2gsIHRoaXMucG9zKTtcbiAgICAgIGlmIChmb3VuZCA+IC0xKSB7dGhpcy5wb3MgPSBmb3VuZDsgcmV0dXJuIHRydWU7fVxuICAgIH0sXG4gICAgYmFja1VwOiBmdW5jdGlvbihuKSB7dGhpcy5wb3MgLT0gbjt9LFxuICAgIGNvbHVtbjogZnVuY3Rpb24oKSB7XG4gICAgICB0aHJvdyBcIm5vdCBpbXBsZW1lbnRlZFwiO1xuICAgIH0sXG4gICAgaW5kZW50YXRpb246IGZ1bmN0aW9uKCkge1xuICAgICAgdGhyb3cgXCJub3QgaW1wbGVtZW50ZWRcIjtcbiAgICB9LFxuICAgIG1hdGNoOiBmdW5jdGlvbihwYXR0ZXJuLCBjb25zdW1lLCBjYXNlSW5zZW5zaXRpdmUpIHtcbiAgICAgIGlmICh0eXBlb2YgcGF0dGVybiA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHZhciBjYXNlZCA9IGZ1bmN0aW9uKHN0cikge3JldHVybiBjYXNlSW5zZW5zaXRpdmUgPyBzdHIudG9Mb3dlckNhc2UoKSA6IHN0cjt9O1xuICAgICAgICB2YXIgc3Vic3RyID0gdGhpcy5zdHJpbmcuc3Vic3RyKHRoaXMucG9zLCBwYXR0ZXJuLmxlbmd0aCk7XG4gICAgICAgIGlmIChjYXNlZChzdWJzdHIpID09IGNhc2VkKHBhdHRlcm4pKSB7XG4gICAgICAgICAgaWYgKGNvbnN1bWUgIT09IGZhbHNlKSB0aGlzLnBvcyArPSBwYXR0ZXJuLmxlbmd0aDtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG1hdGNoID0gdGhpcy5zdHJpbmcuc2xpY2UodGhpcy5wb3MpLm1hdGNoKHBhdHRlcm4pO1xuICAgICAgICBpZiAobWF0Y2ggJiYgbWF0Y2guaW5kZXggPiAwKSByZXR1cm4gbnVsbDtcbiAgICAgICAgaWYgKG1hdGNoICYmIGNvbnN1bWUgIT09IGZhbHNlKSB0aGlzLnBvcyArPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgIH1cbiAgICB9LFxuICAgIGN1cnJlbnQ6IGZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuc3RyaW5nLnNsaWNlKHRoaXMuc3RhcnQsIHRoaXMucG9zKTt9LFxuICAgIGhpZGVGaXJzdENoYXJzOiBmdW5jdGlvbihuLCBpbm5lcikge1xuICAgICAgdGhpcy5saW5lU3RhcnQgKz0gbjtcbiAgICAgIHRyeSB7IHJldHVybiBpbm5lcigpOyB9XG4gICAgICBmaW5hbGx5IHsgdGhpcy5saW5lU3RhcnQgLT0gbjsgfVxuICAgIH1cbiAgfTtcblxuLy8gdG9kbyByZXBsYWNlIHdpdGggc2hvd0NvbW1hbmRMaW5lXG5Db2RlTWlycm9yLmRlZmluZUV4dGVuc2lvbiA9IGZ1bmN0aW9uKG5hbWUsIGZuKSB7XG4gIENvZGVNaXJyb3IucHJvdG90eXBlW25hbWVdID0gZm47XG59O1xuZG9tTGliLmltcG9ydENzc1N0cmluZyhgLm5vcm1hbC1tb2RlIC5hY2VfY3Vyc29ye1xuICAgIGJvcmRlcjogbm9uZTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwwLDAsMC41KTtcbn1cbi5ub3JtYWwtbW9kZSAuYWNlX2hpZGRlbi1jdXJzb3JzIC5hY2VfY3Vyc29ye1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xuICBvcGFjaXR5OiAwLjdcbn1cbi5hY2VfZGlhbG9nIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwOyByaWdodDogMDtcbiAgYmFja2dyb3VuZDogaW5oZXJpdDtcbiAgei1pbmRleDogMTU7XG4gIHBhZGRpbmc6IC4xZW0gLjhlbTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgY29sb3I6IGluaGVyaXQ7XG59XG4uYWNlX2RpYWxvZy10b3Age1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzQ0NDtcbiAgdG9wOiAwO1xufVxuLmFjZV9kaWFsb2ctYm90dG9tIHtcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0NDQ7XG4gIGJvdHRvbTogMDtcbn1cbi5hY2VfZGlhbG9nIGlucHV0IHtcbiAgYm9yZGVyOiBub25lO1xuICBvdXRsaW5lOiBub25lO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgd2lkdGg6IDIwZW07XG4gIGNvbG9yOiBpbmhlcml0O1xuICBmb250LWZhbWlseTogbW9ub3NwYWNlO1xufWAsIFwidmltTW9kZVwiLCBmYWxzZSk7XG4oZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIGRpYWxvZ0RpdihjbSwgdGVtcGxhdGUsIGJvdHRvbSkge1xuICAgIHZhciB3cmFwID0gY20uYWNlLmNvbnRhaW5lcjtcbiAgICB2YXIgZGlhbG9nO1xuICAgIGRpYWxvZyA9IHdyYXAuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSk7XG4gICAgaWYgKGJvdHRvbSlcbiAgICAgIGRpYWxvZy5jbGFzc05hbWUgPSBcImFjZV9kaWFsb2cgYWNlX2RpYWxvZy1ib3R0b21cIjtcbiAgICBlbHNlXG4gICAgICBkaWFsb2cuY2xhc3NOYW1lID0gXCJhY2VfZGlhbG9nIGFjZV9kaWFsb2ctdG9wXCI7XG5cbiAgICBpZiAodHlwZW9mIHRlbXBsYXRlID09IFwic3RyaW5nXCIpIHtcbiAgICAgIGRpYWxvZy5pbm5lckhUTUwgPSB0ZW1wbGF0ZTtcbiAgICB9IGVsc2UgeyAvLyBBc3N1bWluZyBpdCdzIGEgZGV0YWNoZWQgRE9NIGVsZW1lbnQuXG4gICAgICBkaWFsb2cuYXBwZW5kQ2hpbGQodGVtcGxhdGUpO1xuICAgIH1cbiAgICByZXR1cm4gZGlhbG9nO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VOb3RpZmljYXRpb24oY20sIG5ld1ZhbCkge1xuICAgIGlmIChjbS5zdGF0ZS5jdXJyZW50Tm90aWZpY2F0aW9uQ2xvc2UpXG4gICAgICBjbS5zdGF0ZS5jdXJyZW50Tm90aWZpY2F0aW9uQ2xvc2UoKTtcbiAgICBjbS5zdGF0ZS5jdXJyZW50Tm90aWZpY2F0aW9uQ2xvc2UgPSBuZXdWYWw7XG4gIH1cblxuICBDb2RlTWlycm9yLmRlZmluZUV4dGVuc2lvbihcIm9wZW5EaWFsb2dcIiwgZnVuY3Rpb24odGVtcGxhdGUsIGNhbGxiYWNrLCBvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMudmlydHVhbFNlbGVjdGlvbk1vZGUoKSkgcmV0dXJuO1xuICAgIGlmICghb3B0aW9ucykgb3B0aW9ucyA9IHt9O1xuXG4gICAgY2xvc2VOb3RpZmljYXRpb24odGhpcywgbnVsbCk7XG5cbiAgICB2YXIgZGlhbG9nID0gZGlhbG9nRGl2KHRoaXMsIHRlbXBsYXRlLCBvcHRpb25zLmJvdHRvbSk7XG4gICAgdmFyIGNsb3NlZCA9IGZhbHNlLCBtZSA9IHRoaXM7XG4gICAgdGhpcy5zdGF0ZS5kaWFsb2cgPSBkaWFsb2c7XG4gICAgZnVuY3Rpb24gY2xvc2UobmV3VmFsKSB7XG4gICAgICBpZiAodHlwZW9mIG5ld1ZhbCA9PSAnc3RyaW5nJykge1xuICAgICAgICBpbnAudmFsdWUgPSBuZXdWYWw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY2xvc2VkKSByZXR1cm47XG5cbiAgICAgICAgaWYgKG5ld1ZhbCAmJiBuZXdWYWwudHlwZSA9PSBcImJsdXJcIikge1xuICAgICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09PSBpbnApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWUuc3RhdGUuZGlhbG9nID09IGRpYWxvZykge1xuICAgICAgICAgIG1lLnN0YXRlLmRpYWxvZyA9IG51bGw7XG4gICAgICAgICAgbWUuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBjbG9zZWQgPSB0cnVlO1xuICAgICAgICBkaWFsb2cucmVtb3ZlKCk7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMub25DbG9zZSkgb3B0aW9ucy5vbkNsb3NlKGRpYWxvZyk7XG5cbiAgICAgICAgLy8gYWNlX3BhdGNoe1xuICAgICAgICB2YXIgY20gPSBtZTtcbiAgICAgICAgaWYgKGNtLnN0YXRlLnZpbSkge1xuICAgICAgICAgIGNtLnN0YXRlLnZpbS5zdGF0dXMgPSBudWxsO1xuICAgICAgICAgIGNtLmFjZS5fc2lnbmFsKFwiY2hhbmdlU3RhdHVzXCIpO1xuICAgICAgICAgIGNtLmFjZS5yZW5kZXJlci4kbG9vcC5zY2hlZHVsZShjbS5hY2UucmVuZGVyZXIuQ0hBTkdFX0NVUlNPUik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYWNlX3BhdGNofVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBpbnAgPSBkaWFsb2cuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbnB1dFwiKVswXSwgYnV0dG9uO1xuICAgIGlmIChpbnApIHtcbiAgICAgIGlmIChvcHRpb25zLnZhbHVlKSB7XG4gICAgICAgIGlucC52YWx1ZSA9IG9wdGlvbnMudmFsdWU7XG4gICAgICAgIGlmIChvcHRpb25zLnNlbGVjdFZhbHVlT25PcGVuICE9PSBmYWxzZSkgaW5wLnNlbGVjdCgpO1xuICAgICAgfVxuXG4gICAgICBpZiAob3B0aW9ucy5vbklucHV0KVxuICAgICAgICBDb2RlTWlycm9yLm9uKGlucCwgXCJpbnB1dFwiLCBmdW5jdGlvbihlKSB7IG9wdGlvbnMub25JbnB1dChlLCBpbnAudmFsdWUsIGNsb3NlKTt9KTtcbiAgICAgIGlmIChvcHRpb25zLm9uS2V5VXApXG4gICAgICAgIENvZGVNaXJyb3Iub24oaW5wLCBcImtleXVwXCIsIGZ1bmN0aW9uKGUpIHtvcHRpb25zLm9uS2V5VXAoZSwgaW5wLnZhbHVlLCBjbG9zZSk7fSk7XG5cbiAgICAgIENvZGVNaXJyb3Iub24oaW5wLCBcImtleWRvd25cIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLm9uS2V5RG93biAmJiBvcHRpb25zLm9uS2V5RG93bihlLCBpbnAudmFsdWUsIGNsb3NlKSkgeyByZXR1cm47IH1cbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAxMykgY2FsbGJhY2soaW5wLnZhbHVlKTtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PSAyNyB8fCAob3B0aW9ucy5jbG9zZU9uRW50ZXIgIT09IGZhbHNlICYmIGUua2V5Q29kZSA9PSAxMykpIHtcbiAgICAgICAgICBDb2RlTWlycm9yLmVfc3RvcChlKTtcbiAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgaWYgKG9wdGlvbnMuY2xvc2VPbkJsdXIgIT09IGZhbHNlKSBDb2RlTWlycm9yLm9uKGlucCwgXCJibHVyXCIsIGNsb3NlKTtcblxuICAgICAgaW5wLmZvY3VzKCk7XG4gICAgfSBlbHNlIGlmIChidXR0b24gPSBkaWFsb2cuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJidXR0b25cIilbMF0pIHtcbiAgICAgIENvZGVNaXJyb3Iub24oYnV0dG9uLCBcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjbG9zZSgpO1xuICAgICAgICBtZS5mb2N1cygpO1xuICAgICAgfSk7XG5cbiAgICAgIGlmIChvcHRpb25zLmNsb3NlT25CbHVyICE9PSBmYWxzZSkgQ29kZU1pcnJvci5vbihidXR0b24sIFwiYmx1clwiLCBjbG9zZSk7XG5cbiAgICAgIGJ1dHRvbi5mb2N1cygpO1xuICAgIH1cbiAgICByZXR1cm4gY2xvc2U7XG4gIH0pO1xuXG4gIENvZGVNaXJyb3IuZGVmaW5lRXh0ZW5zaW9uKFwib3Blbk5vdGlmaWNhdGlvblwiLCBmdW5jdGlvbih0ZW1wbGF0ZSwgb3B0aW9ucykge1xuICAgIGlmICh0aGlzLnZpcnR1YWxTZWxlY3Rpb25Nb2RlKCkpIHJldHVybjtcbiAgICBjbG9zZU5vdGlmaWNhdGlvbih0aGlzLCBjbG9zZSk7XG4gICAgdmFyIGRpYWxvZyA9IGRpYWxvZ0Rpdih0aGlzLCB0ZW1wbGF0ZSwgb3B0aW9ucyAmJiBvcHRpb25zLmJvdHRvbSk7XG4gICAgdmFyIGNsb3NlZCA9IGZhbHNlLCBkb25lVGltZXI7XG4gICAgdmFyIGR1cmF0aW9uID0gb3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5kdXJhdGlvbiAhPT0gXCJ1bmRlZmluZWRcIiA/IG9wdGlvbnMuZHVyYXRpb24gOiA1MDAwO1xuXG4gICAgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICBpZiAoY2xvc2VkKSByZXR1cm47XG4gICAgICBjbG9zZWQgPSB0cnVlO1xuICAgICAgY2xlYXJUaW1lb3V0KGRvbmVUaW1lcik7XG4gICAgICBkaWFsb2cucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgQ29kZU1pcnJvci5vbihkaWFsb2csICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgIENvZGVNaXJyb3IuZV9wcmV2ZW50RGVmYXVsdChlKTtcbiAgICAgIGNsb3NlKCk7XG4gICAgfSk7XG5cbiAgICBpZiAoZHVyYXRpb24pXG4gICAgICBkb25lVGltZXIgPSBzZXRUaW1lb3V0KGNsb3NlLCBkdXJhdGlvbik7XG5cbiAgICByZXR1cm4gY2xvc2U7XG4gIH0pO1xufSkoKTtcblxuXG4gIHZhciBQb3MgPSBDb2RlTWlycm9yLlBvcztcblxuICBmdW5jdGlvbiB1cGRhdGVTZWxlY3Rpb25Gb3JTdXJyb2dhdGVDaGFyYWN0ZXJzKGNtLCBjdXJTdGFydCwgY3VyRW5kKSB7XG4gICAgLy8gc3RhcnQgYW5kIGNoYXJhY3RlciBwb3NpdGlvbiB3aGVuIG5vIHNlbGVjdGlvbiBcbiAgICAvLyBpcyB0aGUgc2FtZSBpbiB2aXN1YWwgbW9kZSwgYW5kIGRpZmZlcnMgaW4gMSBjaGFyYWN0ZXIgaW4gbm9ybWFsIG1vZGVcbiAgICBpZiAoY3VyU3RhcnQubGluZSA9PT0gY3VyRW5kLmxpbmUgJiYgY3VyU3RhcnQuY2ggPj0gY3VyRW5kLmNoIC0gMSkge1xuICAgICAgdmFyIHRleHQgPSBjbS5nZXRMaW5lKGN1clN0YXJ0LmxpbmUpO1xuICAgICAgdmFyIGNoYXJDb2RlID0gdGV4dC5jaGFyQ29kZUF0KGN1clN0YXJ0LmNoKTtcbiAgICAgIGlmICgweEQ4MDAgPD0gY2hhckNvZGUgJiYgY2hhckNvZGUgPD0gMHhEOEZGKSB7XG4gICAgICAgIGN1ckVuZC5jaCArPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7c3RhcnQ6IGN1clN0YXJ0LCBlbmQ6IGN1ckVuZH07XG4gIH1cblxuICB2YXIgZGVmYXVsdEtleW1hcCA9IFtcbiAgICAvLyBLZXkgdG8ga2V5IG1hcHBpbmcuIFRoaXMgZ29lcyBmaXJzdCB0byBtYWtlIGl0IHBvc3NpYmxlIHRvIG92ZXJyaWRlXG4gICAgLy8gZXhpc3RpbmcgbWFwcGluZ3MuXG4gICAgeyBrZXlzOiAnPExlZnQ+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnaCcgfSxcbiAgICB7IGtleXM6ICc8UmlnaHQ+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnbCcgfSxcbiAgICB7IGtleXM6ICc8VXA+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnaycgfSxcbiAgICB7IGtleXM6ICc8RG93bj4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdqJyB9LFxuICAgIHsga2V5czogJ2c8VXA+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnZ2snIH0sXG4gICAgeyBrZXlzOiAnZzxEb3duPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2dqJyB9LFxuICAgIHsga2V5czogJzxTcGFjZT4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdsJyB9LFxuICAgIHsga2V5czogJzxCUz4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdoJ30sXG4gICAgeyBrZXlzOiAnPERlbD4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICd4JyB9LFxuICAgIHsga2V5czogJzxDLVNwYWNlPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ1cnIH0sXG4gICAgeyBrZXlzOiAnPEMtQlM+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnQicgfSxcbiAgICB7IGtleXM6ICc8Uy1TcGFjZT4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICd3JyB9LFxuICAgIHsga2V5czogJzxTLUJTPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2InIH0sXG4gICAgeyBrZXlzOiAnPEMtbj4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdqJyB9LFxuICAgIHsga2V5czogJzxDLXA+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnaycgfSxcbiAgICB7IGtleXM6ICc8Qy1bPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJzxFc2M+JyB9LFxuICAgIHsga2V5czogJzxDLWM+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnPEVzYz4nIH0sXG4gICAgeyBrZXlzOiAnPEMtWz4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICc8RXNjPicsIGNvbnRleHQ6ICdpbnNlcnQnIH0sXG4gICAgeyBrZXlzOiAnPEMtYz4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICc8RXNjPicsIGNvbnRleHQ6ICdpbnNlcnQnIH0sXG4gICAgeyBrZXlzOiAnPEMtRXNjPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJzxFc2M+JyB9LCAvLyBpcGFkIGtleWJvYXJkIHNlbmRzIEMtRXNjIGluc3RlYWQgb2YgQy1bXG4gICAgeyBrZXlzOiAnPEMtRXNjPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJzxFc2M+JywgY29udGV4dDogJ2luc2VydCcgfSxcbiAgICB7IGtleXM6ICdzJywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnY2wnLCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ3MnLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdjJywgY29udGV4dDogJ3Zpc3VhbCd9LFxuICAgIHsga2V5czogJ1MnLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdjYycsIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnUycsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ1ZkTycsIGNvbnRleHQ6ICd2aXN1YWwnIH0sXG4gICAgeyBrZXlzOiAnPEhvbWU+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnMCcgfSxcbiAgICB7IGtleXM6ICc8RW5kPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJyQnIH0sXG4gICAgeyBrZXlzOiAnPFBhZ2VVcD4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICc8Qy1iPicgfSxcbiAgICB7IGtleXM6ICc8UGFnZURvd24+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnPEMtZj4nIH0sXG4gICAgeyBrZXlzOiAnPENSPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2peJywgY29udGV4dDogJ25vcm1hbCcgfSxcbiAgICB7IGtleXM6ICc8SW5zPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2knLCBjb250ZXh0OiAnbm9ybWFsJ30sXG4gICAgeyBrZXlzOiAnPElucz4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAndG9nZ2xlT3ZlcndyaXRlJywgY29udGV4dDogJ2luc2VydCcgfSxcbiAgICAvLyBNb3Rpb25zXG4gICAgeyBrZXlzOiAnSCcsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9Ub3BMaW5lJywgbW90aW9uQXJnczogeyBsaW5ld2lzZTogdHJ1ZSwgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdNJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb01pZGRsZUxpbmUnLCBtb3Rpb25BcmdzOiB7IGxpbmV3aXNlOiB0cnVlLCB0b0p1bXBsaXN0OiB0cnVlIH19LFxuICAgIHsga2V5czogJ0wnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvQm90dG9tTGluZScsIG1vdGlvbkFyZ3M6IHsgbGluZXdpc2U6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnaCcsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlDaGFyYWN0ZXJzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSB9fSxcbiAgICB7IGtleXM6ICdsJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeUNoYXJhY3RlcnMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnaicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlMaW5lcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgbGluZXdpc2U6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnaycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlMaW5lcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIGxpbmV3aXNlOiB0cnVlIH19LFxuICAgIHsga2V5czogJ2dqJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeURpc3BsYXlMaW5lcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdnaycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlEaXNwbGF5TGluZXMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJ3cnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5V29yZHMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHdvcmRFbmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJ1cnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5V29yZHMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHdvcmRFbmQ6IGZhbHNlLCBiaWdXb3JkOiB0cnVlIH19LFxuICAgIHsga2V5czogJ2UnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5V29yZHMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHdvcmRFbmQ6IHRydWUsIGluY2x1c2l2ZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdFJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVdvcmRzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlLCB3b3JkRW5kOiB0cnVlLCBiaWdXb3JkOiB0cnVlLCBpbmNsdXNpdmU6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnYicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHdvcmRFbmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJ0InLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5V29yZHMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCB3b3JkRW5kOiBmYWxzZSwgYmlnV29yZDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdnZScsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHdvcmRFbmQ6IHRydWUsIGluY2x1c2l2ZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdnRScsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHdvcmRFbmQ6IHRydWUsIGJpZ1dvcmQ6IHRydWUsIGluY2x1c2l2ZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICd7JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVBhcmFncmFwaCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnfScsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlQYXJhZ3JhcGgnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnKCcsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlTZW50ZW5jZScsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UgfX0sXG4gICAgeyBrZXlzOiAnKScsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlTZW50ZW5jZScsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICc8Qy1mPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlQYWdlJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlIH19LFxuICAgIHsga2V5czogJzxDLWI+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVBhZ2UnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJzxDLWQ+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVNjcm9sbCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgZXhwbGljaXRSZXBlYXQ6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnPEMtdT4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5U2Nyb2xsJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgZXhwbGljaXRSZXBlYXQ6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnZ2cnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvTGluZU9yRWRnZU9mRG9jdW1lbnQnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCBleHBsaWNpdFJlcGVhdDogdHJ1ZSwgbGluZXdpc2U6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnRycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9MaW5lT3JFZGdlT2ZEb2N1bWVudCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgZXhwbGljaXRSZXBlYXQ6IHRydWUsIGxpbmV3aXNlOiB0cnVlLCB0b0p1bXBsaXN0OiB0cnVlIH19LFxuICAgIHtrZXlzOiBcImckXCIsIHR5cGU6IFwibW90aW9uXCIsIG1vdGlvbjogXCJtb3ZlVG9FbmRPZkRpc3BsYXlMaW5lXCJ9LFxuICAgIHtrZXlzOiBcImdeXCIsIHR5cGU6IFwibW90aW9uXCIsIG1vdGlvbjogXCJtb3ZlVG9TdGFydE9mRGlzcGxheUxpbmVcIn0sXG4gICAge2tleXM6IFwiZzBcIiwgdHlwZTogXCJtb3Rpb25cIiwgbW90aW9uOiBcIm1vdmVUb1N0YXJ0T2ZEaXNwbGF5TGluZVwifSxcbiAgICB7IGtleXM6ICcwJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb1N0YXJ0T2ZMaW5lJyB9LFxuICAgIHsga2V5czogJ14nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyJyB9LFxuICAgIHsga2V5czogJysnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5TGluZXMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHRvRmlyc3RDaGFyOnRydWUgfX0sXG4gICAgeyBrZXlzOiAnLScsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlMaW5lcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHRvRmlyc3RDaGFyOnRydWUgfX0sXG4gICAgeyBrZXlzOiAnXycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlMaW5lcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgdG9GaXJzdENoYXI6dHJ1ZSwgcmVwZWF0T2Zmc2V0Oi0xIH19LFxuICAgIHsga2V5czogJyQnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvRW9sJywgbW90aW9uQXJnczogeyBpbmNsdXNpdmU6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnJScsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9NYXRjaGVkU3ltYm9sJywgbW90aW9uQXJnczogeyBpbmNsdXNpdmU6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnZjxjaGFyYWN0ZXI+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb0NoYXJhY3RlcicsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSAsIGluY2x1c2l2ZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdGPGNoYXJhY3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvQ2hhcmFjdGVyJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSB9fSxcbiAgICB7IGtleXM6ICd0PGNoYXJhY3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRpbGxDaGFyYWN0ZXInLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIGluY2x1c2l2ZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdUPGNoYXJhY3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRpbGxDaGFyYWN0ZXInLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJzsnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAncmVwZWF0TGFzdENoYXJhY3RlclNlYXJjaCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICcsJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ3JlcGVhdExhc3RDaGFyYWN0ZXJTZWFyY2gnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJ1xcJzxyZWdpc3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnZ29Ub01hcmsnLCBtb3Rpb25BcmdzOiB7dG9KdW1wbGlzdDogdHJ1ZSwgbGluZXdpc2U6IHRydWV9fSxcbiAgICB7IGtleXM6ICdgPHJlZ2lzdGVyPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdnb1RvTWFyaycsIG1vdGlvbkFyZ3M6IHt0b0p1bXBsaXN0OiB0cnVlfX0sXG4gICAgeyBrZXlzOiAnXWAnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnanVtcFRvTWFyaycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnW2AnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnanVtcFRvTWFyaycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UgfSB9LFxuICAgIHsga2V5czogJ11cXCcnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnanVtcFRvTWFyaycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgbGluZXdpc2U6IHRydWUgfSB9LFxuICAgIHsga2V5czogJ1tcXCcnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnanVtcFRvTWFyaycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIGxpbmV3aXNlOiB0cnVlIH0gfSxcbiAgICAvLyB0aGUgbmV4dCB0d28gYXJlbid0IG1vdGlvbnMgYnV0IG11c3QgY29tZSBiZWZvcmUgbW9yZSBnZW5lcmFsIG1vdGlvbiBkZWNsYXJhdGlvbnNcbiAgICB7IGtleXM6ICddcCcsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdwYXN0ZScsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBhZnRlcjogdHJ1ZSwgaXNFZGl0OiB0cnVlLCBtYXRjaEluZGVudDogdHJ1ZX19LFxuICAgIHsga2V5czogJ1twJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Bhc3RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGFmdGVyOiBmYWxzZSwgaXNFZGl0OiB0cnVlLCBtYXRjaEluZGVudDogdHJ1ZX19LFxuICAgIHsga2V5czogJ108Y2hhcmFjdGVyPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9TeW1ib2wnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWV9fSxcbiAgICB7IGtleXM6ICdbPGNoYXJhY3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvU3ltYm9sJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgdG9KdW1wbGlzdDogdHJ1ZX19LFxuICAgIHsga2V5czogJ3wnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvQ29sdW1uJ30sXG4gICAgeyBrZXlzOiAnbycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9PdGhlckhpZ2hsaWdodGVkRW5kJywgY29udGV4dDondmlzdWFsJ30sXG4gICAgeyBrZXlzOiAnTycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9PdGhlckhpZ2hsaWdodGVkRW5kJywgbW90aW9uQXJnczoge3NhbWVMaW5lOiB0cnVlfSwgY29udGV4dDondmlzdWFsJ30sXG4gICAgLy8gT3BlcmF0b3JzXG4gICAgeyBrZXlzOiAnZCcsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnZGVsZXRlJyB9LFxuICAgIHsga2V5czogJ3knLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ3lhbmsnIH0sXG4gICAgeyBrZXlzOiAnYycsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnY2hhbmdlJyB9LFxuICAgIHsga2V5czogJz0nLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2luZGVudEF1dG8nIH0sXG4gICAgeyBrZXlzOiAnPicsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnaW5kZW50Jywgb3BlcmF0b3JBcmdzOiB7IGluZGVudFJpZ2h0OiB0cnVlIH19LFxuICAgIHsga2V5czogJzwnLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2luZGVudCcsIG9wZXJhdG9yQXJnczogeyBpbmRlbnRSaWdodDogZmFsc2UgfX0sXG4gICAgeyBrZXlzOiAnZ34nLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2NoYW5nZUNhc2UnIH0sXG4gICAgeyBrZXlzOiAnZ3UnLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2NoYW5nZUNhc2UnLCBvcGVyYXRvckFyZ3M6IHt0b0xvd2VyOiB0cnVlfSwgaXNFZGl0OiB0cnVlIH0sXG4gICAgeyBrZXlzOiAnZ1UnLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2NoYW5nZUNhc2UnLCBvcGVyYXRvckFyZ3M6IHt0b0xvd2VyOiBmYWxzZX0sIGlzRWRpdDogdHJ1ZSB9LFxuICAgIHsga2V5czogJ24nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnZmluZE5leHQnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnTicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdmaW5kTmV4dCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnZ24nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnZmluZEFuZFNlbGVjdE5leHRJbmNsdXNpdmUnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnZ04nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnZmluZEFuZFNlbGVjdE5leHRJbmNsdXNpdmUnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJ2dxJywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdoYXJkV3JhcCcgfSxcbiAgICB7IGtleXM6ICdndycsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnaGFyZFdyYXAnLCBvcGVyYXRvckFyZ3M6IHtrZWVwQ3Vyc29yOiB0cnVlfX0sXG4gICAgLy8gT3BlcmF0b3ItTW90aW9uIGR1YWwgY29tbWFuZHNcbiAgICB7IGtleXM6ICd4JywgdHlwZTogJ29wZXJhdG9yTW90aW9uJywgb3BlcmF0b3I6ICdkZWxldGUnLCBtb3Rpb246ICdtb3ZlQnlDaGFyYWN0ZXJzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlIH0sIG9wZXJhdG9yTW90aW9uQXJnczogeyB2aXN1YWxMaW5lOiBmYWxzZSB9fSxcbiAgICB7IGtleXM6ICdYJywgdHlwZTogJ29wZXJhdG9yTW90aW9uJywgb3BlcmF0b3I6ICdkZWxldGUnLCBtb3Rpb246ICdtb3ZlQnlDaGFyYWN0ZXJzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSB9LCBvcGVyYXRvck1vdGlvbkFyZ3M6IHsgdmlzdWFsTGluZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdEJywgdHlwZTogJ29wZXJhdG9yTW90aW9uJywgb3BlcmF0b3I6ICdkZWxldGUnLCBtb3Rpb246ICdtb3ZlVG9Fb2wnLCBtb3Rpb25BcmdzOiB7IGluY2x1c2l2ZTogdHJ1ZSB9LCBjb250ZXh0OiAnbm9ybWFsJ30sXG4gICAgeyBrZXlzOiAnRCcsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnZGVsZXRlJywgb3BlcmF0b3JBcmdzOiB7IGxpbmV3aXNlOiB0cnVlIH0sIGNvbnRleHQ6ICd2aXN1YWwnfSxcbiAgICB7IGtleXM6ICdZJywgdHlwZTogJ29wZXJhdG9yTW90aW9uJywgb3BlcmF0b3I6ICd5YW5rJywgbW90aW9uOiAnZXhwYW5kVG9MaW5lJywgbW90aW9uQXJnczogeyBsaW5ld2lzZTogdHJ1ZSB9LCBjb250ZXh0OiAnbm9ybWFsJ30sXG4gICAgeyBrZXlzOiAnWScsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAneWFuaycsIG9wZXJhdG9yQXJnczogeyBsaW5ld2lzZTogdHJ1ZSB9LCBjb250ZXh0OiAndmlzdWFsJ30sXG4gICAgeyBrZXlzOiAnQycsIHR5cGU6ICdvcGVyYXRvck1vdGlvbicsIG9wZXJhdG9yOiAnY2hhbmdlJywgbW90aW9uOiAnbW92ZVRvRW9sJywgbW90aW9uQXJnczogeyBpbmNsdXNpdmU6IHRydWUgfSwgY29udGV4dDogJ25vcm1hbCd9LFxuICAgIHsga2V5czogJ0MnLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2NoYW5nZScsIG9wZXJhdG9yQXJnczogeyBsaW5ld2lzZTogdHJ1ZSB9LCBjb250ZXh0OiAndmlzdWFsJ30sXG4gICAgeyBrZXlzOiAnficsIHR5cGU6ICdvcGVyYXRvck1vdGlvbicsIG9wZXJhdG9yOiAnY2hhbmdlQ2FzZScsIG1vdGlvbjogJ21vdmVCeUNoYXJhY3RlcnMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUgfSwgb3BlcmF0b3JBcmdzOiB7IHNob3VsZE1vdmVDdXJzb3I6IHRydWUgfSwgY29udGV4dDogJ25vcm1hbCd9LFxuICAgIHsga2V5czogJ34nLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2NoYW5nZUNhc2UnLCBjb250ZXh0OiAndmlzdWFsJ30sXG4gICAgeyBrZXlzOiAnPEMtdT4nLCB0eXBlOiAnb3BlcmF0b3JNb3Rpb24nLCBvcGVyYXRvcjogJ2RlbGV0ZScsIG1vdGlvbjogJ21vdmVUb1N0YXJ0T2ZMaW5lJywgY29udGV4dDogJ2luc2VydCcgfSxcbiAgICB7IGtleXM6ICc8Qy13PicsIHR5cGU6ICdvcGVyYXRvck1vdGlvbicsIG9wZXJhdG9yOiAnZGVsZXRlJywgbW90aW9uOiAnbW92ZUJ5V29yZHMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCB3b3JkRW5kOiBmYWxzZSB9LCBjb250ZXh0OiAnaW5zZXJ0JyB9LFxuICAgIC8vaWdub3JlIEMtdyBpbiBub3JtYWwgbW9kZVxuICAgIHsga2V5czogJzxDLXc+JywgdHlwZTogJ2lkbGUnLCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIC8vIEFjdGlvbnNcbiAgICB7IGtleXM6ICc8Qy1pPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdqdW1wTGlzdFdhbGsnLCBhY3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnPEMtbz4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnanVtcExpc3RXYWxrJywgYWN0aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSB9fSxcbiAgICB7IGtleXM6ICc8Qy1lPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdzY3JvbGwnLCBhY3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIGxpbmV3aXNlOiB0cnVlIH19LFxuICAgIHsga2V5czogJzxDLXk+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbCcsIGFjdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIGxpbmV3aXNlOiB0cnVlIH19LFxuICAgIHsga2V5czogJ2EnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGluc2VydEF0OiAnY2hhckFmdGVyJyB9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ0EnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGluc2VydEF0OiAnZW9sJyB9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ0EnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGluc2VydEF0OiAnZW5kT2ZTZWxlY3RlZEFyZWEnIH0sIGNvbnRleHQ6ICd2aXN1YWwnIH0sXG4gICAgeyBrZXlzOiAnaScsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdlbnRlckluc2VydE1vZGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgaW5zZXJ0QXQ6ICdpbnBsYWNlJyB9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ2dpJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2VudGVySW5zZXJ0TW9kZScsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBpbnNlcnRBdDogJ2xhc3RFZGl0JyB9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ0knLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGluc2VydEF0OiAnZmlyc3ROb25CbGFuayd9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ2dJJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2VudGVySW5zZXJ0TW9kZScsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBpbnNlcnRBdDogJ2JvbCd9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ0knLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGluc2VydEF0OiAnc3RhcnRPZlNlbGVjdGVkQXJlYScgfSwgY29udGV4dDogJ3Zpc3VhbCcgfSxcbiAgICB7IGtleXM6ICdvJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ25ld0xpbmVBbmRFbnRlckluc2VydE1vZGUnLCBpc0VkaXQ6IHRydWUsIGludGVybGFjZUluc2VydFJlcGVhdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBhZnRlcjogdHJ1ZSB9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ08nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnbmV3TGluZUFuZEVudGVySW5zZXJ0TW9kZScsIGlzRWRpdDogdHJ1ZSwgaW50ZXJsYWNlSW5zZXJ0UmVwZWF0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGFmdGVyOiBmYWxzZSB9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ3YnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAndG9nZ2xlVmlzdWFsTW9kZScgfSxcbiAgICB7IGtleXM6ICdWJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3RvZ2dsZVZpc3VhbE1vZGUnLCBhY3Rpb25BcmdzOiB7IGxpbmV3aXNlOiB0cnVlIH19LFxuICAgIHsga2V5czogJzxDLXY+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3RvZ2dsZVZpc3VhbE1vZGUnLCBhY3Rpb25BcmdzOiB7IGJsb2Nrd2lzZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICc8Qy1xPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICd0b2dnbGVWaXN1YWxNb2RlJywgYWN0aW9uQXJnczogeyBibG9ja3dpc2U6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnZ3YnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncmVzZWxlY3RMYXN0U2VsZWN0aW9uJyB9LFxuICAgIHsga2V5czogJ0onLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnam9pbkxpbmVzJywgaXNFZGl0OiB0cnVlIH0sXG4gICAgeyBrZXlzOiAnZ0onLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnam9pbkxpbmVzJywgYWN0aW9uQXJnczogeyBrZWVwU3BhY2VzOiB0cnVlIH0sIGlzRWRpdDogdHJ1ZSB9LFxuICAgIHsga2V5czogJ3AnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncGFzdGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgYWZ0ZXI6IHRydWUsIGlzRWRpdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdQJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Bhc3RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGFmdGVyOiBmYWxzZSwgaXNFZGl0OiB0cnVlIH19LFxuICAgIHsga2V5czogJ3I8Y2hhcmFjdGVyPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdyZXBsYWNlJywgaXNFZGl0OiB0cnVlIH0sXG4gICAgeyBrZXlzOiAnQDxyZWdpc3Rlcj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncmVwbGF5TWFjcm8nIH0sXG4gICAgeyBrZXlzOiAncTxyZWdpc3Rlcj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJNYWNyb1JlY29yZE1vZGUnIH0sXG4gICAgLy8gSGFuZGxlIFJlcGxhY2UtbW9kZSBhcyBhIHNwZWNpYWwgY2FzZSBvZiBpbnNlcnQgbW9kZS5cbiAgICB7IGtleXM6ICdSJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2VudGVySW5zZXJ0TW9kZScsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczogeyByZXBsYWNlOiB0cnVlIH0sIGNvbnRleHQ6ICdub3JtYWwnfSxcbiAgICB7IGtleXM6ICdSJywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdjaGFuZ2UnLCBvcGVyYXRvckFyZ3M6IHsgbGluZXdpc2U6IHRydWUsIGZ1bGxMaW5lOiB0cnVlIH0sIGNvbnRleHQ6ICd2aXN1YWwnLCBleGl0VmlzdWFsQmxvY2s6IHRydWV9LFxuICAgIHsga2V5czogJ3UnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAndW5kbycsIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAndScsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnY2hhbmdlQ2FzZScsIG9wZXJhdG9yQXJnczoge3RvTG93ZXI6IHRydWV9LCBjb250ZXh0OiAndmlzdWFsJywgaXNFZGl0OiB0cnVlIH0sXG4gICAgeyBrZXlzOiAnVScsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnY2hhbmdlQ2FzZScsIG9wZXJhdG9yQXJnczoge3RvTG93ZXI6IGZhbHNlfSwgY29udGV4dDogJ3Zpc3VhbCcsIGlzRWRpdDogdHJ1ZSB9LFxuICAgIHsga2V5czogJzxDLXI+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3JlZG8nIH0sXG4gICAgeyBrZXlzOiAnbTxyZWdpc3Rlcj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnc2V0TWFyaycgfSxcbiAgICB7IGtleXM6ICdcIjxyZWdpc3Rlcj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnc2V0UmVnaXN0ZXInIH0sXG4gICAgeyBrZXlzOiAnPEMtcj48cmVnaXN0ZXI+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2luc2VydFJlZ2lzdGVyJywgY29udGV4dDogJ2luc2VydCcsIGlzRWRpdDogdHJ1ZSB9LFxuICAgIHsga2V5czogJzxDLW8+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ29uZU5vcm1hbENvbW1hbmQnLCBjb250ZXh0OiAnaW5zZXJ0JyB9LFxuICAgIHsga2V5czogJ3p6JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbFRvQ3Vyc29yJywgYWN0aW9uQXJnczogeyBwb3NpdGlvbjogJ2NlbnRlcicgfX0sXG4gICAgeyBrZXlzOiAnei4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnc2Nyb2xsVG9DdXJzb3InLCBhY3Rpb25BcmdzOiB7IHBvc2l0aW9uOiAnY2VudGVyJyB9LCBtb3Rpb246ICdtb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXInIH0sXG4gICAgeyBrZXlzOiAnenQnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnc2Nyb2xsVG9DdXJzb3InLCBhY3Rpb25BcmdzOiB7IHBvc2l0aW9uOiAndG9wJyB9fSxcbiAgICB7IGtleXM6ICd6PENSPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdzY3JvbGxUb0N1cnNvcicsIGFjdGlvbkFyZ3M6IHsgcG9zaXRpb246ICd0b3AnIH0sIG1vdGlvbjogJ21vdmVUb0ZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcicgfSxcbiAgICB7IGtleXM6ICd6YicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdzY3JvbGxUb0N1cnNvcicsIGFjdGlvbkFyZ3M6IHsgcG9zaXRpb246ICdib3R0b20nIH19LFxuICAgIHsga2V5czogJ3otJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbFRvQ3Vyc29yJywgYWN0aW9uQXJnczogeyBwb3NpdGlvbjogJ2JvdHRvbScgfSwgbW90aW9uOiAnbW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyJyB9LFxuICAgIHsga2V5czogJy4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncmVwZWF0TGFzdEVkaXQnIH0sXG4gICAgeyBrZXlzOiAnPEMtYT4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnaW5jcmVtZW50TnVtYmVyVG9rZW4nLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHtpbmNyZWFzZTogdHJ1ZSwgYmFja3RyYWNrOiBmYWxzZX19LFxuICAgIHsga2V5czogJzxDLXg+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2luY3JlbWVudE51bWJlclRva2VuJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7aW5jcmVhc2U6IGZhbHNlLCBiYWNrdHJhY2s6IGZhbHNlfX0sXG4gICAgeyBrZXlzOiAnPEMtdD4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnaW5kZW50JywgYWN0aW9uQXJnczogeyBpbmRlbnRSaWdodDogdHJ1ZSB9LCBjb250ZXh0OiAnaW5zZXJ0JyB9LFxuICAgIHsga2V5czogJzxDLWQ+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2luZGVudCcsIGFjdGlvbkFyZ3M6IHsgaW5kZW50UmlnaHQ6IGZhbHNlIH0sIGNvbnRleHQ6ICdpbnNlcnQnIH0sXG4gICAgLy8gVGV4dCBvYmplY3QgbW90aW9uc1xuICAgIHsga2V5czogJ2E8cmVnaXN0ZXI+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ3RleHRPYmplY3RNYW5pcHVsYXRpb24nIH0sXG4gICAgeyBrZXlzOiAnaTxyZWdpc3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAndGV4dE9iamVjdE1hbmlwdWxhdGlvbicsIG1vdGlvbkFyZ3M6IHsgdGV4dE9iamVjdElubmVyOiB0cnVlIH19LFxuICAgIC8vIFNlYXJjaFxuICAgIHsga2V5czogJy8nLCB0eXBlOiAnc2VhcmNoJywgc2VhcmNoQXJnczogeyBmb3J3YXJkOiB0cnVlLCBxdWVyeVNyYzogJ3Byb21wdCcsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnPycsIHR5cGU6ICdzZWFyY2gnLCBzZWFyY2hBcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCBxdWVyeVNyYzogJ3Byb21wdCcsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnKicsIHR5cGU6ICdzZWFyY2gnLCBzZWFyY2hBcmdzOiB7IGZvcndhcmQ6IHRydWUsIHF1ZXJ5U3JjOiAnd29yZFVuZGVyQ3Vyc29yJywgd2hvbGVXb3JkT25seTogdHJ1ZSwgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICcjJywgdHlwZTogJ3NlYXJjaCcsIHNlYXJjaEFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHF1ZXJ5U3JjOiAnd29yZFVuZGVyQ3Vyc29yJywgd2hvbGVXb3JkT25seTogdHJ1ZSwgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdnKicsIHR5cGU6ICdzZWFyY2gnLCBzZWFyY2hBcmdzOiB7IGZvcndhcmQ6IHRydWUsIHF1ZXJ5U3JjOiAnd29yZFVuZGVyQ3Vyc29yJywgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdnIycsIHR5cGU6ICdzZWFyY2gnLCBzZWFyY2hBcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCBxdWVyeVNyYzogJ3dvcmRVbmRlckN1cnNvcicsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgLy8gRXggY29tbWFuZFxuICAgIHsga2V5czogJzonLCB0eXBlOiAnZXgnIH1cbiAgXTtcbiAgdmFyIGRlZmF1bHRLZXltYXBMZW5ndGggPSBkZWZhdWx0S2V5bWFwLmxlbmd0aDtcblxuICAvKipcbiAgICogRXggY29tbWFuZHNcbiAgICogQ2FyZSBtdXN0IGJlIHRha2VuIHdoZW4gYWRkaW5nIHRvIHRoZSBkZWZhdWx0IEV4IGNvbW1hbmQgbWFwLiBGb3IgYW55XG4gICAqIHBhaXIgb2YgY29tbWFuZHMgdGhhdCBoYXZlIGEgc2hhcmVkIHByZWZpeCwgYXQgbGVhc3Qgb25lIG9mIHRoZWlyXG4gICAqIHNob3J0TmFtZXMgbXVzdCBub3QgbWF0Y2ggdGhlIHByZWZpeCBvZiB0aGUgb3RoZXIgY29tbWFuZC5cbiAgICovXG4gIHZhciBkZWZhdWx0RXhDb21tYW5kTWFwID0gW1xuICAgIHsgbmFtZTogJ2NvbG9yc2NoZW1lJywgc2hvcnROYW1lOiAnY29sbycgfSxcbiAgICB7IG5hbWU6ICdtYXAnIH0sXG4gICAgeyBuYW1lOiAnaW1hcCcsIHNob3J0TmFtZTogJ2ltJyB9LFxuICAgIHsgbmFtZTogJ25tYXAnLCBzaG9ydE5hbWU6ICdubScgfSxcbiAgICB7IG5hbWU6ICd2bWFwJywgc2hvcnROYW1lOiAndm0nIH0sXG4gICAgeyBuYW1lOiAnb21hcCcsIHNob3J0TmFtZTogJ29tJyB9LFxuICAgIHsgbmFtZTogJ25vcmVtYXAnLCBzaG9ydE5hbWU6ICdubycgfSxcbiAgICB7IG5hbWU6ICdubm9yZW1hcCcsIHNob3J0TmFtZTogJ25uJyB9LFxuICAgIHsgbmFtZTogJ3Zub3JlbWFwJywgc2hvcnROYW1lOiAndm4nIH0sXG4gICAgeyBuYW1lOiAnaW5vcmVtYXAnLCBzaG9ydE5hbWU6ICdpbm8nIH0sXG4gICAgeyBuYW1lOiAnb25vcmVtYXAnLCBzaG9ydE5hbWU6ICdvbm8nIH0sXG4gICAgeyBuYW1lOiAndW5tYXAnIH0sXG4gICAgeyBuYW1lOiAnbWFwY2xlYXInLCBzaG9ydE5hbWU6ICdtYXBjJyB9LFxuICAgIHsgbmFtZTogJ25tYXBjbGVhcicsIHNob3J0TmFtZTogJ25tYXBjJyB9LFxuICAgIHsgbmFtZTogJ3ZtYXBjbGVhcicsIHNob3J0TmFtZTogJ3ZtYXBjJyB9LFxuICAgIHsgbmFtZTogJ2ltYXBjbGVhcicsIHNob3J0TmFtZTogJ2ltYXBjJyB9LFxuICAgIHsgbmFtZTogJ29tYXBjbGVhcicsIHNob3J0TmFtZTogJ29tYXBjJyB9LFxuICAgIHsgbmFtZTogJ3dyaXRlJywgc2hvcnROYW1lOiAndycgfSxcbiAgICB7IG5hbWU6ICd1bmRvJywgc2hvcnROYW1lOiAndScgfSxcbiAgICB7IG5hbWU6ICdyZWRvJywgc2hvcnROYW1lOiAncmVkJyB9LFxuICAgIHsgbmFtZTogJ3NldCcsIHNob3J0TmFtZTogJ3NlJyB9LFxuICAgIHsgbmFtZTogJ3NldGxvY2FsJywgc2hvcnROYW1lOiAnc2V0bCcgfSxcbiAgICB7IG5hbWU6ICdzZXRnbG9iYWwnLCBzaG9ydE5hbWU6ICdzZXRnJyB9LFxuICAgIHsgbmFtZTogJ3NvcnQnLCBzaG9ydE5hbWU6ICdzb3InIH0sXG4gICAgeyBuYW1lOiAnc3Vic3RpdHV0ZScsIHNob3J0TmFtZTogJ3MnLCBwb3NzaWJseUFzeW5jOiB0cnVlIH0sXG4gICAgeyBuYW1lOiAnc3RhcnRpbnNlcnQnLCBzaG9ydE5hbWU6ICdzdGFydCcgfSxcbiAgICB7IG5hbWU6ICdub2hsc2VhcmNoJywgc2hvcnROYW1lOiAnbm9oJyB9LFxuICAgIHsgbmFtZTogJ3lhbmsnLCBzaG9ydE5hbWU6ICd5JyB9LFxuICAgIHsgbmFtZTogJ2RlbG1hcmtzJywgc2hvcnROYW1lOiAnZGVsbScgfSxcbiAgICB7IG5hbWU6ICdyZWdpc3RlcnMnLCBzaG9ydE5hbWU6ICdyZWcnLCBleGNsdWRlRnJvbUNvbW1hbmRIaXN0b3J5OiB0cnVlIH0sXG4gICAgeyBuYW1lOiAndmdsb2JhbCcsIHNob3J0TmFtZTogJ3YnIH0sXG4gICAgeyBuYW1lOiAnZGVsZXRlJywgc2hvcnROYW1lOiAnZCcgfSxcbiAgICB7IG5hbWU6ICdqb2luJywgc2hvcnROYW1lOiAnaicgfSxcbiAgICB7IG5hbWU6ICdub3JtYWwnLCBzaG9ydE5hbWU6ICdub3JtJyB9LFxuICAgIHsgbmFtZTogJ2dsb2JhbCcsIHNob3J0TmFtZTogJ2cnIH1cbiAgXTtcblxuICAvKipcbiAgICogTGFuZ21hcFxuICAgKiBEZXRlcm1pbmVzIGhvdyB0byBpbnRlcnByZXQga2V5c3Ryb2tlcyBpbiBOb3JtYWwgYW5kIFZpc3VhbCBtb2RlLlxuICAgKiBVc2VmdWwgZm9yIHBlb3BsZSB3aG8gdXNlIGEgZGlmZmVyZW50IGtleWJvYXJkIGxheW91dCB0aGFuIFFXRVJUWVxuICAgKi9cbiAgdmFyIGxhbmdtYXAgPSBwYXJzZUxhbmdtYXAoJycpO1xuXG4gICAgZnVuY3Rpb24gZW50ZXJWaW1Nb2RlKGNtKSB7XG4gICAgICBjbS5zZXRPcHRpb24oJ2Rpc2FibGVJbnB1dCcsIHRydWUpO1xuICAgICAgY20uc2V0T3B0aW9uKCdzaG93Q3Vyc29yV2hlblNlbGVjdGluZycsIGZhbHNlKTtcbiAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJub3JtYWxcIn0pO1xuICAgICAgY20ub24oJ2N1cnNvckFjdGl2aXR5Jywgb25DdXJzb3JBY3Rpdml0eSk7XG4gICAgICBtYXliZUluaXRWaW1TdGF0ZShjbSk7XG4gICAgICBDb2RlTWlycm9yLm9uKGNtLmdldElucHV0RmllbGQoKSwgJ3Bhc3RlJywgZ2V0T25QYXN0ZUZuKGNtKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbGVhdmVWaW1Nb2RlKGNtKSB7XG4gICAgICBjbS5zZXRPcHRpb24oJ2Rpc2FibGVJbnB1dCcsIGZhbHNlKTtcbiAgICAgIGNtLm9mZignY3Vyc29yQWN0aXZpdHknLCBvbkN1cnNvckFjdGl2aXR5KTtcbiAgICAgIENvZGVNaXJyb3Iub2ZmKGNtLmdldElucHV0RmllbGQoKSwgJ3Bhc3RlJywgZ2V0T25QYXN0ZUZuKGNtKSk7XG4gICAgICBjbS5zdGF0ZS52aW0gPSBudWxsO1xuICAgICAgaWYgKGhpZ2hsaWdodFRpbWVvdXQpIGNsZWFyVGltZW91dChoaWdobGlnaHRUaW1lb3V0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRPblBhc3RlRm4oY20pIHtcbiAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICBpZiAoIXZpbS5vblBhc3RlRm4pIHtcbiAgICAgICAgdmltLm9uUGFzdGVGbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICghdmltLmluc2VydE1vZGUpIHtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihvZmZzZXRDdXJzb3IoY20uZ2V0Q3Vyc29yKCksIDAsIDEpKTtcbiAgICAgICAgICAgIGFjdGlvbnMuZW50ZXJJbnNlcnRNb2RlKGNtLCB7fSwgdmltKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gdmltLm9uUGFzdGVGbjtcbiAgICB9XG5cbiAgICB2YXIgbnVtYmVyUmVnZXggPSAvW1xcZF0vO1xuICAgIHZhciB3b3JkQ2hhclRlc3QgPSBbQ29kZU1pcnJvci5pc1dvcmRDaGFyLCBmdW5jdGlvbihjaCkge1xuICAgICAgcmV0dXJuIGNoICYmICFDb2RlTWlycm9yLmlzV29yZENoYXIoY2gpICYmICEvXFxzLy50ZXN0KGNoKTtcbiAgICB9XSwgYmlnV29yZENoYXJUZXN0ID0gW2Z1bmN0aW9uKGNoKSB7XG4gICAgICByZXR1cm4gL1xcUy8udGVzdChjaCk7XG4gICAgfV07XG4gICAgdmFyIHZhbGlkTWFya3MgPSBbJzwnLCAnPiddO1xuICAgIHZhciB2YWxpZFJlZ2lzdGVycyA9IFsnLScsICdcIicsICcuJywgJzonLCAnXycsICcvJywgJysnXTtcbiAgICB2YXIgbGF0aW5DaGFyUmVnZXggPSAvXlxcdyQvXG4gICAgdmFyIHVwcGVyQ2FzZUNoYXJzO1xuICAgIHRyeSB7IHVwcGVyQ2FzZUNoYXJzID0gbmV3IFJlZ0V4cChcIl5bXFxcXHB7THV9XSRcIiwgXCJ1XCIpOyB9XG4gICAgY2F0Y2ggKF8pIHsgdXBwZXJDYXNlQ2hhcnMgPSAvXltBLVpdJC87IH1cblxuICAgIGZ1bmN0aW9uIGlzTGluZShjbSwgbGluZSkge1xuICAgICAgcmV0dXJuIGxpbmUgPj0gY20uZmlyc3RMaW5lKCkgJiYgbGluZSA8PSBjbS5sYXN0TGluZSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0xvd2VyQ2FzZShrKSB7XG4gICAgICByZXR1cm4gKC9eW2Etel0kLykudGVzdChrKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNNYXRjaGFibGVTeW1ib2woaykge1xuICAgICAgcmV0dXJuICcoKVtde30nLmluZGV4T2YoaykgIT0gLTE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTnVtYmVyKGspIHtcbiAgICAgIHJldHVybiBudW1iZXJSZWdleC50ZXN0KGspO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1VwcGVyQ2FzZShrKSB7XG4gICAgICByZXR1cm4gdXBwZXJDYXNlQ2hhcnMudGVzdChrKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNXaGl0ZVNwYWNlU3RyaW5nKGspIHtcbiAgICAgIHJldHVybiAoL15cXHMqJC8pLnRlc3Qoayk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzRW5kT2ZTZW50ZW5jZVN5bWJvbChrKSB7XG4gICAgICByZXR1cm4gJy4/IScuaW5kZXhPZihrKSAhPSAtMTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5BcnJheSh2YWwsIGFycikge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFycltpXSA9PSB2YWwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBvcHRpb25zID0ge307XG4gICAgZnVuY3Rpb24gZGVmaW5lT3B0aW9uKG5hbWUsIGRlZmF1bHRWYWx1ZSwgdHlwZSwgYWxpYXNlcywgY2FsbGJhY2spIHtcbiAgICAgIGlmIChkZWZhdWx0VmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhY2FsbGJhY2spIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ2RlZmF1bHRWYWx1ZSBpcyByZXF1aXJlZCB1bmxlc3MgY2FsbGJhY2sgaXMgcHJvdmlkZWQnKTtcbiAgICAgIH1cbiAgICAgIGlmICghdHlwZSkgeyB0eXBlID0gJ3N0cmluZyc7IH1cbiAgICAgIG9wdGlvbnNbbmFtZV0gPSB7XG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogZGVmYXVsdFZhbHVlLFxuICAgICAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgICAgIH07XG4gICAgICBpZiAoYWxpYXNlcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFsaWFzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBvcHRpb25zW2FsaWFzZXNbaV1dID0gb3B0aW9uc1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBzZXRPcHRpb24obmFtZSwgZGVmYXVsdFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRPcHRpb24obmFtZSwgdmFsdWUsIGNtLCBjZmcpIHtcbiAgICAgIHZhciBvcHRpb24gPSBvcHRpb25zW25hbWVdO1xuICAgICAgY2ZnID0gY2ZnIHx8IHt9O1xuICAgICAgdmFyIHNjb3BlID0gY2ZnLnNjb3BlO1xuICAgICAgaWYgKCFvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignVW5rbm93biBvcHRpb246ICcgKyBuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb24udHlwZSA9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudDogJyArIG5hbWUgKyAnPScgKyB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgLy8gQm9vbGVhbiBvcHRpb25zIGFyZSBzZXQgdG8gdHJ1ZSBpZiB2YWx1ZSBpcyBub3QgZGVmaW5lZC5cbiAgICAgICAgICB2YWx1ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb24uY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHNjb3BlICE9PSAnbG9jYWwnKSB7XG4gICAgICAgICAgb3B0aW9uLmNhbGxiYWNrKHZhbHVlLCB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZSAhPT0gJ2dsb2JhbCcgJiYgY20pIHtcbiAgICAgICAgICBvcHRpb24uY2FsbGJhY2sodmFsdWUsIGNtKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNjb3BlICE9PSAnbG9jYWwnKSB7XG4gICAgICAgICAgb3B0aW9uLnZhbHVlID0gb3B0aW9uLnR5cGUgPT0gJ2Jvb2xlYW4nID8gISF2YWx1ZSA6IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZSAhPT0gJ2dsb2JhbCcgJiYgY20pIHtcbiAgICAgICAgICBjbS5zdGF0ZS52aW0ub3B0aW9uc1tuYW1lXSA9IHt2YWx1ZTogdmFsdWV9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0T3B0aW9uKG5hbWUsIGNtLCBjZmcpIHtcbiAgICAgIHZhciBvcHRpb24gPSBvcHRpb25zW25hbWVdO1xuICAgICAgY2ZnID0gY2ZnIHx8IHt9O1xuICAgICAgdmFyIHNjb3BlID0gY2ZnLnNjb3BlO1xuICAgICAgaWYgKCFvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignVW5rbm93biBvcHRpb246ICcgKyBuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb24uY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGxvY2FsID0gY20gJiYgb3B0aW9uLmNhbGxiYWNrKHVuZGVmaW5lZCwgY20pO1xuICAgICAgICBpZiAoc2NvcGUgIT09ICdnbG9iYWwnICYmIGxvY2FsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gbG9jYWw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlICE9PSAnbG9jYWwnKSB7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbi5jYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBsb2NhbCA9IChzY29wZSAhPT0gJ2dsb2JhbCcpICYmIChjbSAmJiBjbS5zdGF0ZS52aW0ub3B0aW9uc1tuYW1lXSk7XG4gICAgICAgIHJldHVybiAobG9jYWwgfHwgKHNjb3BlICE9PSAnbG9jYWwnKSAmJiBvcHRpb24gfHwge30pLnZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRlZmluZU9wdGlvbignZmlsZXR5cGUnLCB1bmRlZmluZWQsICdzdHJpbmcnLCBbJ2Z0J10sIGZ1bmN0aW9uKG5hbWUsIGNtKSB7XG4gICAgICAvLyBPcHRpb24gaXMgbG9jYWwuIERvIG5vdGhpbmcgZm9yIGdsb2JhbC5cbiAgICAgIGlmIChjbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFRoZSAnZmlsZXR5cGUnIG9wdGlvbiBwcm94aWVzIHRvIHRoZSBDb2RlTWlycm9yICdtb2RlJyBvcHRpb24uXG4gICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBtb2RlID0gY20uZ2V0T3B0aW9uKCdtb2RlJyk7XG4gICAgICAgIHJldHVybiBtb2RlID09ICdudWxsJyA/ICcnIDogbW9kZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBtb2RlID0gbmFtZSA9PSAnJyA/ICdudWxsJyA6IG5hbWU7XG4gICAgICAgIGNtLnNldE9wdGlvbignbW9kZScsIG1vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGRlZmluZU9wdGlvbigndGV4dHdpZHRoJywgODAsICdudW1iZXInLCBbJ3R3J10sIGZ1bmN0aW9uKHdpZHRoLCBjbSkge1xuICAgICAgLy8gT3B0aW9uIGlzIGxvY2FsLiBEbyBub3RoaW5nIGZvciBnbG9iYWwuXG4gICAgICBpZiAoY20gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBUaGUgJ2ZpbGV0eXBlJyBvcHRpb24gcHJveGllcyB0byB0aGUgQ29kZU1pcnJvciAnbW9kZScgb3B0aW9uLlxuICAgICAgaWYgKHdpZHRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gY20uZ2V0T3B0aW9uKCd0ZXh0d2lkdGgnKTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGNvbHVtbiA9IE1hdGgucm91bmQod2lkdGgpO1xuICAgICAgICBpZiAoY29sdW1uID4gMSkge1xuICAgICAgICAgIGNtLnNldE9wdGlvbigndGV4dHdpZHRoJywgY29sdW1uKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGNyZWF0ZUNpcmN1bGFySnVtcExpc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzaXplID0gMTAwO1xuICAgICAgdmFyIHBvaW50ZXIgPSAtMTtcbiAgICAgIHZhciBoZWFkID0gMDtcbiAgICAgIHZhciB0YWlsID0gMDtcbiAgICAgIHZhciBidWZmZXIgPSBuZXcgQXJyYXkoc2l6ZSk7XG4gICAgICBmdW5jdGlvbiBhZGQoY20sIG9sZEN1ciwgbmV3Q3VyKSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gcG9pbnRlciAlIHNpemU7XG4gICAgICAgIHZhciBjdXJNYXJrID0gYnVmZmVyW2N1cnJlbnRdO1xuICAgICAgICBmdW5jdGlvbiB1c2VOZXh0U2xvdChjdXJzb3IpIHtcbiAgICAgICAgICB2YXIgbmV4dCA9ICsrcG9pbnRlciAlIHNpemU7XG4gICAgICAgICAgdmFyIHRyYXNoTWFyayA9IGJ1ZmZlcltuZXh0XTtcbiAgICAgICAgICBpZiAodHJhc2hNYXJrKSB7XG4gICAgICAgICAgICB0cmFzaE1hcmsuY2xlYXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnVmZmVyW25leHRdID0gY20uc2V0Qm9va21hcmsoY3Vyc29yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VyTWFyaykge1xuICAgICAgICAgIHZhciBtYXJrUG9zID0gY3VyTWFyay5maW5kKCk7XG4gICAgICAgICAgLy8gYXZvaWQgcmVjb3JkaW5nIHJlZHVuZGFudCBjdXJzb3IgcG9zaXRpb25cbiAgICAgICAgICBpZiAobWFya1BvcyAmJiAhY3Vyc29yRXF1YWwobWFya1Bvcywgb2xkQ3VyKSkge1xuICAgICAgICAgICAgdXNlTmV4dFNsb3Qob2xkQ3VyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXNlTmV4dFNsb3Qob2xkQ3VyKTtcbiAgICAgICAgfVxuICAgICAgICB1c2VOZXh0U2xvdChuZXdDdXIpO1xuICAgICAgICBoZWFkID0gcG9pbnRlcjtcbiAgICAgICAgdGFpbCA9IHBvaW50ZXIgLSBzaXplICsgMTtcbiAgICAgICAgaWYgKHRhaWwgPCAwKSB7XG4gICAgICAgICAgdGFpbCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIG1vdmUoY20sIG9mZnNldCkge1xuICAgICAgICBwb2ludGVyICs9IG9mZnNldDtcbiAgICAgICAgaWYgKHBvaW50ZXIgPiBoZWFkKSB7XG4gICAgICAgICAgcG9pbnRlciA9IGhlYWQ7XG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnRlciA8IHRhaWwpIHtcbiAgICAgICAgICBwb2ludGVyID0gdGFpbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWFyayA9IGJ1ZmZlclsoc2l6ZSArIHBvaW50ZXIpICUgc2l6ZV07XG4gICAgICAgIC8vIHNraXAgbWFya3MgdGhhdCBhcmUgdGVtcG9yYXJpbHkgcmVtb3ZlZCBmcm9tIHRleHQgYnVmZmVyXG4gICAgICAgIGlmIChtYXJrICYmICFtYXJrLmZpbmQoKSkge1xuICAgICAgICAgIHZhciBpbmMgPSBvZmZzZXQgPiAwID8gMSA6IC0xO1xuICAgICAgICAgIHZhciBuZXdDdXI7XG4gICAgICAgICAgdmFyIG9sZEN1ciA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIHBvaW50ZXIgKz0gaW5jO1xuICAgICAgICAgICAgbWFyayA9IGJ1ZmZlclsoc2l6ZSArIHBvaW50ZXIpICUgc2l6ZV07XG4gICAgICAgICAgICAvLyBza2lwIG1hcmtzIHRoYXQgYXJlIHRoZSBzYW1lIGFzIGN1cnJlbnQgcG9zaXRpb25cbiAgICAgICAgICAgIGlmIChtYXJrICYmXG4gICAgICAgICAgICAgICAgKG5ld0N1ciA9IG1hcmsuZmluZCgpKSAmJlxuICAgICAgICAgICAgICAgICFjdXJzb3JFcXVhbChvbGRDdXIsIG5ld0N1cikpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSB3aGlsZSAocG9pbnRlciA8IGhlYWQgJiYgcG9pbnRlciA+IHRhaWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXJrO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gZmluZChjbSwgb2Zmc2V0KSB7XG4gICAgICAgIHZhciBvbGRQb2ludGVyID0gcG9pbnRlcjtcbiAgICAgICAgdmFyIG1hcmsgPSBtb3ZlKGNtLCBvZmZzZXQpO1xuICAgICAgICBwb2ludGVyID0gb2xkUG9pbnRlcjtcbiAgICAgICAgcmV0dXJuIG1hcmsgJiYgbWFyay5maW5kKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjYWNoZWRDdXJzb3I6IHVuZGVmaW5lZCwgLy91c2VkIGZvciAjIGFuZCAqIGp1bXBzXG4gICAgICAgIGFkZDogYWRkLFxuICAgICAgICBmaW5kOiBmaW5kLFxuICAgICAgICBtb3ZlOiBtb3ZlXG4gICAgICB9O1xuICAgIH07XG5cbiAgICAvLyBSZXR1cm5zIGFuIG9iamVjdCB0byB0cmFjayB0aGUgY2hhbmdlcyBhc3NvY2lhdGVkIGluc2VydCBtb2RlLiAgSXRcbiAgICAvLyBjbG9uZXMgdGhlIG9iamVjdCB0aGF0IGlzIHBhc3NlZCBpbiwgb3IgY3JlYXRlcyBhbiBlbXB0eSBvYmplY3Qgb25lIGlmXG4gICAgLy8gbm9uZSBpcyBwcm92aWRlZC5cbiAgICB2YXIgY3JlYXRlSW5zZXJ0TW9kZUNoYW5nZXMgPSBmdW5jdGlvbihjKSB7XG4gICAgICBpZiAoYykge1xuICAgICAgICAvLyBDb3B5IGNvbnN0cnVjdGlvblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNoYW5nZXM6IGMuY2hhbmdlcyxcbiAgICAgICAgICBleHBlY3RDdXJzb3JBY3Rpdml0eUZvckNoYW5nZTogYy5leHBlY3RDdXJzb3JBY3Rpdml0eUZvckNoYW5nZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLy8gQ2hhbmdlIGxpc3RcbiAgICAgICAgY2hhbmdlczogW10sXG4gICAgICAgIC8vIFNldCB0byB0cnVlIG9uIGNoYW5nZSwgZmFsc2Ugb24gY3Vyc29yQWN0aXZpdHkuXG4gICAgICAgIGV4cGVjdEN1cnNvckFjdGl2aXR5Rm9yQ2hhbmdlOiBmYWxzZVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gTWFjcm9Nb2RlU3RhdGUoKSB7XG4gICAgICB0aGlzLmxhdGVzdFJlZ2lzdGVyID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNSZWNvcmRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVwbGF5U2VhcmNoUXVlcmllcyA9IFtdO1xuICAgICAgdGhpcy5vblJlY29yZGluZ0RvbmUgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcyA9IGNyZWF0ZUluc2VydE1vZGVDaGFuZ2VzKCk7XG4gICAgfVxuICAgIE1hY3JvTW9kZVN0YXRlLnByb3RvdHlwZSA9IHtcbiAgICAgIGV4aXRNYWNyb1JlY29yZE1vZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgICAgaWYgKG1hY3JvTW9kZVN0YXRlLm9uUmVjb3JkaW5nRG9uZSkge1xuICAgICAgICAgIG1hY3JvTW9kZVN0YXRlLm9uUmVjb3JkaW5nRG9uZSgpOyAvLyBjbG9zZSBkaWFsb2dcbiAgICAgICAgfVxuICAgICAgICBtYWNyb01vZGVTdGF0ZS5vblJlY29yZGluZ0RvbmUgPSB1bmRlZmluZWQ7XG4gICAgICAgIG1hY3JvTW9kZVN0YXRlLmlzUmVjb3JkaW5nID0gZmFsc2U7XG4gICAgICB9LFxuICAgICAgZW50ZXJNYWNyb1JlY29yZE1vZGU6IGZ1bmN0aW9uKGNtLCByZWdpc3Rlck5hbWUpIHtcbiAgICAgICAgdmFyIHJlZ2lzdGVyID1cbiAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5nZXRSZWdpc3RlcihyZWdpc3Rlck5hbWUpO1xuICAgICAgICBpZiAocmVnaXN0ZXIpIHtcbiAgICAgICAgICByZWdpc3Rlci5jbGVhcigpO1xuICAgICAgICAgIHRoaXMubGF0ZXN0UmVnaXN0ZXIgPSByZWdpc3Rlck5hbWU7XG4gICAgICAgICAgaWYgKGNtLm9wZW5EaWFsb2cpIHtcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IGRvbSgnc3BhbicsIHtjbGFzczogJ2NtLXZpbS1tZXNzYWdlJ30sICdyZWNvcmRpbmcgQCcgKyByZWdpc3Rlck5hbWUpO1xuICAgICAgICAgICAgdGhpcy5vblJlY29yZGluZ0RvbmUgPSBjbS5vcGVuRGlhbG9nKHRlbXBsYXRlLCBudWxsLCB7Ym90dG9tOnRydWV9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5pc1JlY29yZGluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbWF5YmVJbml0VmltU3RhdGUoY20pIHtcbiAgICAgIGlmICghY20uc3RhdGUudmltKSB7XG4gICAgICAgIC8vIFN0b3JlIGluc3RhbmNlIHN0YXRlIGluIHRoZSBDb2RlTWlycm9yIG9iamVjdC5cbiAgICAgICAgY20uc3RhdGUudmltID0ge1xuICAgICAgICAgIGlucHV0U3RhdGU6IG5ldyBJbnB1dFN0YXRlKCksXG4gICAgICAgICAgLy8gVmltJ3MgaW5wdXQgc3RhdGUgdGhhdCB0cmlnZ2VyZWQgdGhlIGxhc3QgZWRpdCwgdXNlZCB0byByZXBlYXRcbiAgICAgICAgICAvLyBtb3Rpb25zIGFuZCBvcGVyYXRvcnMgd2l0aCAnLicuXG4gICAgICAgICAgbGFzdEVkaXRJbnB1dFN0YXRlOiB1bmRlZmluZWQsXG4gICAgICAgICAgLy8gVmltJ3MgYWN0aW9uIGNvbW1hbmQgYmVmb3JlIHRoZSBsYXN0IGVkaXQsIHVzZWQgdG8gcmVwZWF0IGFjdGlvbnNcbiAgICAgICAgICAvLyB3aXRoICcuJyBhbmQgaW5zZXJ0IG1vZGUgcmVwZWF0LlxuICAgICAgICAgIGxhc3RFZGl0QWN0aW9uQ29tbWFuZDogdW5kZWZpbmVkLFxuICAgICAgICAgIC8vIFdoZW4gdXNpbmcgamsgZm9yIG5hdmlnYXRpb24sIGlmIHlvdSBtb3ZlIGZyb20gYSBsb25nZXIgbGluZSB0byBhXG4gICAgICAgICAgLy8gc2hvcnRlciBsaW5lLCB0aGUgY3Vyc29yIG1heSBjbGlwIHRvIHRoZSBlbmQgb2YgdGhlIHNob3J0ZXIgbGluZS5cbiAgICAgICAgICAvLyBJZiBqIGlzIHByZXNzZWQgYWdhaW4gYW5kIGN1cnNvciBnb2VzIHRvIHRoZSBuZXh0IGxpbmUsIHRoZVxuICAgICAgICAgIC8vIGN1cnNvciBzaG91bGQgZ28gYmFjayB0byBpdHMgaG9yaXpvbnRhbCBwb3NpdGlvbiBvbiB0aGUgbG9uZ2VyXG4gICAgICAgICAgLy8gbGluZSBpZiBpdCBjYW4uIFRoaXMgaXMgdG8ga2VlcCB0cmFjayBvZiB0aGUgaG9yaXpvbnRhbCBwb3NpdGlvbi5cbiAgICAgICAgICBsYXN0SFBvczogLTEsXG4gICAgICAgICAgLy8gRG9pbmcgdGhlIHNhbWUgd2l0aCBzY3JlZW4tcG9zaXRpb24gZm9yIGdqL2drXG4gICAgICAgICAgbGFzdEhTUG9zOiAtMSxcbiAgICAgICAgICAvLyBUaGUgbGFzdCBtb3Rpb24gY29tbWFuZCBydW4uIENsZWFyZWQgaWYgYSBub24tbW90aW9uIGNvbW1hbmQgZ2V0c1xuICAgICAgICAgIC8vIGV4ZWN1dGVkIGluIGJldHdlZW4uXG4gICAgICAgICAgbGFzdE1vdGlvbjogbnVsbCxcbiAgICAgICAgICBtYXJrczoge30sXG4gICAgICAgICAgaW5zZXJ0TW9kZTogZmFsc2UsXG4gICAgICAgICAgaW5zZXJ0TW9kZVJldHVybjogZmFsc2UsXG4gICAgICAgICAgLy8gUmVwZWF0IGNvdW50IGZvciBjaGFuZ2VzIG1hZGUgaW4gaW5zZXJ0IG1vZGUsIHRyaWdnZXJlZCBieSBrZXlcbiAgICAgICAgICAvLyBzZXF1ZW5jZXMgbGlrZSAzLGkuIE9ubHkgZXhpc3RzIHdoZW4gaW5zZXJ0TW9kZSBpcyB0cnVlLlxuICAgICAgICAgIGluc2VydE1vZGVSZXBlYXQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICB2aXN1YWxNb2RlOiBmYWxzZSxcbiAgICAgICAgICAvLyBJZiB3ZSBhcmUgaW4gdmlzdWFsIGxpbmUgbW9kZS4gTm8gZWZmZWN0IGlmIHZpc3VhbE1vZGUgaXMgZmFsc2UuXG4gICAgICAgICAgdmlzdWFsTGluZTogZmFsc2UsXG4gICAgICAgICAgdmlzdWFsQmxvY2s6IGZhbHNlLFxuICAgICAgICAgIGxhc3RTZWxlY3Rpb246IG51bGwsXG4gICAgICAgICAgbGFzdFBhc3RlZFRleHQ6IG51bGwsXG4gICAgICAgICAgc2VsOiB7fSxcbiAgICAgICAgICAvLyBCdWZmZXItbG9jYWwvd2luZG93LWxvY2FsIHZhbHVlcyBvZiB2aW0gb3B0aW9ucy5cbiAgICAgICAgICBvcHRpb25zOiB7fSxcbiAgICAgICAgICAvLyBXaGV0aGVyIHRoZSBuZXh0IGNoYXJhY3RlciBzaG91bGQgYmUgaW50ZXJwcmV0ZWQgbGl0ZXJhbGx5XG4gICAgICAgICAgLy8gTmVjYXNzYXJ5IGZvciBjb3JyZWN0IGltcGxlbWVudGF0aW9uIG9mIGY8Y2hhcmFjdGVyPiwgcjxjaGFyYWN0ZXI+IGV0Yy5cbiAgICAgICAgICAvLyBpbiB0ZXJtcyBvZiBsYW5nbWFwcy5cbiAgICAgICAgICBleHBlY3RMaXRlcmFsTmV4dDogZmFsc2VcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjbS5zdGF0ZS52aW07XG4gICAgfVxuICAgIHZhciB2aW1HbG9iYWxTdGF0ZTtcbiAgICBmdW5jdGlvbiByZXNldFZpbUdsb2JhbFN0YXRlKCkge1xuICAgICAgdmltR2xvYmFsU3RhdGUgPSB7XG4gICAgICAgIC8vIFRoZSBjdXJyZW50IHNlYXJjaCBxdWVyeS5cbiAgICAgICAgc2VhcmNoUXVlcnk6IG51bGwsXG4gICAgICAgIC8vIFdoZXRoZXIgd2UgYXJlIHNlYXJjaGluZyBiYWNrd2FyZHMuXG4gICAgICAgIHNlYXJjaElzUmV2ZXJzZWQ6IGZhbHNlLFxuICAgICAgICAvLyBSZXBsYWNlIHBhcnQgb2YgdGhlIGxhc3Qgc3Vic3RpdHV0ZWQgcGF0dGVyblxuICAgICAgICBsYXN0U3Vic3RpdHV0ZVJlcGxhY2VQYXJ0OiB1bmRlZmluZWQsXG4gICAgICAgIGp1bXBMaXN0OiBjcmVhdGVDaXJjdWxhckp1bXBMaXN0KCksXG4gICAgICAgIG1hY3JvTW9kZVN0YXRlOiBuZXcgTWFjcm9Nb2RlU3RhdGUsXG4gICAgICAgIC8vIFJlY29yZGluZyBsYXRlc3QgZiwgdCwgRiBvciBUIG1vdGlvbiBjb21tYW5kLlxuICAgICAgICBsYXN0Q2hhcmFjdGVyU2VhcmNoOiB7aW5jcmVtZW50OjAsIGZvcndhcmQ6dHJ1ZSwgc2VsZWN0ZWRDaGFyYWN0ZXI6Jyd9LFxuICAgICAgICByZWdpc3RlckNvbnRyb2xsZXI6IG5ldyBSZWdpc3RlckNvbnRyb2xsZXIoe30pLFxuICAgICAgICAvLyBzZWFyY2ggaGlzdG9yeSBidWZmZXJcbiAgICAgICAgc2VhcmNoSGlzdG9yeUNvbnRyb2xsZXI6IG5ldyBIaXN0b3J5Q29udHJvbGxlcigpLFxuICAgICAgICAvLyBleCBDb21tYW5kIGhpc3RvcnkgYnVmZmVyXG4gICAgICAgIGV4Q29tbWFuZEhpc3RvcnlDb250cm9sbGVyIDogbmV3IEhpc3RvcnlDb250cm9sbGVyKClcbiAgICAgIH07XG4gICAgICBmb3IgKHZhciBvcHRpb25OYW1lIGluIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIG9wdGlvbiA9IG9wdGlvbnNbb3B0aW9uTmFtZV07XG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IG9wdGlvbi5kZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGxhc3RJbnNlcnRNb2RlS2V5VGltZXI7XG4gICAgdmFyIHZpbUFwaSA9IHtcbiAgICAgIGVudGVyVmltTW9kZTogZW50ZXJWaW1Nb2RlLFxuICAgICAgbGVhdmVWaW1Nb2RlOiBsZWF2ZVZpbU1vZGUsXG4gICAgICBidWlsZEtleU1hcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFRPRE86IENvbnZlcnQga2V5bWFwIGludG8gZGljdGlvbmFyeSBmb3JtYXQgZm9yIGZhc3QgbG9va3VwLlxuICAgICAgfSxcbiAgICAgIC8vIFRlc3RpbmcgaG9vaywgdGhvdWdoIGl0IG1pZ2h0IGJlIHVzZWZ1bCB0byBleHBvc2UgdGhlIHJlZ2lzdGVyXG4gICAgICAvLyBjb250cm9sbGVyIGFueXdheS5cbiAgICAgIGdldFJlZ2lzdGVyQ29udHJvbGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXI7XG4gICAgICB9LFxuICAgICAgLy8gVGVzdGluZyBob29rLlxuICAgICAgcmVzZXRWaW1HbG9iYWxTdGF0ZV86IHJlc2V0VmltR2xvYmFsU3RhdGUsXG5cbiAgICAgIC8vIFRlc3RpbmcgaG9vay5cbiAgICAgIGdldFZpbUdsb2JhbFN0YXRlXzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2aW1HbG9iYWxTdGF0ZTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIFRlc3RpbmcgaG9vay5cbiAgICAgIG1heWJlSW5pdFZpbVN0YXRlXzogbWF5YmVJbml0VmltU3RhdGUsXG5cbiAgICAgIHN1cHByZXNzRXJyb3JMb2dnaW5nOiBmYWxzZSxcblxuICAgICAgSW5zZXJ0TW9kZUtleTogSW5zZXJ0TW9kZUtleSxcbiAgICAgIG1hcDogZnVuY3Rpb24obGhzLCByaHMsIGN0eCkge1xuICAgICAgICAvLyBBZGQgdXNlciBkZWZpbmVkIGtleSBiaW5kaW5ncy5cbiAgICAgICAgZXhDb21tYW5kRGlzcGF0Y2hlci5tYXAobGhzLCByaHMsIGN0eCk7XG4gICAgICB9LFxuICAgICAgdW5tYXA6IGZ1bmN0aW9uKGxocywgY3R4KSB7XG4gICAgICAgIHJldHVybiBleENvbW1hbmREaXNwYXRjaGVyLnVubWFwKGxocywgY3R4KTtcbiAgICAgIH0sXG4gICAgICAvLyBOb24tcmVjdXJzaXZlIG1hcCBmdW5jdGlvbi5cbiAgICAgIC8vIE5PVEU6IFRoaXMgd2lsbCBub3QgY3JlYXRlIG1hcHBpbmdzIHRvIGtleSBtYXBzIHRoYXQgYXJlbid0IHByZXNlbnRcbiAgICAgIC8vIGluIHRoZSBkZWZhdWx0IGtleSBtYXAuIFNlZSBUT0RPIGF0IGJvdHRvbSBvZiBmdW5jdGlvbi5cbiAgICAgIG5vcmVtYXA6IGZ1bmN0aW9uKGxocywgcmhzLCBjdHgpIHtcbiAgICAgICAgZXhDb21tYW5kRGlzcGF0Y2hlci5tYXAobGhzLCByaHMsIGN0eCwgdHJ1ZSk7XG4gICAgICB9LFxuICAgICAgLy8gUmVtb3ZlIGFsbCB1c2VyLWRlZmluZWQgbWFwcGluZ3MgZm9yIHRoZSBwcm92aWRlZCBjb250ZXh0LlxuICAgICAgbWFwY2xlYXI6IGZ1bmN0aW9uKGN0eCkge1xuICAgICAgICAvLyBQYXJ0aXRpb24gdGhlIGV4aXN0aW5nIGtleW1hcCBpbnRvIHVzZXItZGVmaW5lZCBhbmQgdHJ1ZSBkZWZhdWx0cy5cbiAgICAgICAgdmFyIGFjdHVhbExlbmd0aCA9IGRlZmF1bHRLZXltYXAubGVuZ3RoLFxuICAgICAgICAgICAgb3JpZ0xlbmd0aCA9IGRlZmF1bHRLZXltYXBMZW5ndGg7XG4gICAgICAgIHZhciB1c2VyS2V5bWFwID0gZGVmYXVsdEtleW1hcC5zbGljZSgwLCBhY3R1YWxMZW5ndGggLSBvcmlnTGVuZ3RoKTtcbiAgICAgICAgZGVmYXVsdEtleW1hcCA9IGRlZmF1bHRLZXltYXAuc2xpY2UoYWN0dWFsTGVuZ3RoIC0gb3JpZ0xlbmd0aCk7XG4gICAgICAgIGlmIChjdHgpIHtcbiAgICAgICAgICAvLyBJZiBhIHNwZWNpZmljIGNvbnRleHQgaXMgYmVpbmcgY2xlYXJlZCwgd2UgbmVlZCB0byBrZWVwIG1hcHBpbmdzXG4gICAgICAgICAgLy8gZnJvbSBhbGwgb3RoZXIgY29udGV4dHMuXG4gICAgICAgICAgZm9yICh2YXIgaSA9IHVzZXJLZXltYXAubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgICAgIHZhciBtYXBwaW5nID0gdXNlcktleW1hcFtpXTtcbiAgICAgICAgICAgIGlmIChjdHggIT09IG1hcHBpbmcuY29udGV4dCkge1xuICAgICAgICAgICAgICBpZiAobWFwcGluZy5jb250ZXh0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWFwQ29tbWFuZChtYXBwaW5nKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBgbWFwcGluZ2AgYXBwbGllcyB0byBhbGwgY29udGV4dHMgc28gY3JlYXRlIGtleW1hcCBjb3BpZXNcbiAgICAgICAgICAgICAgICAvLyBmb3IgZWFjaCBjb250ZXh0IGV4Y2VwdCB0aGUgb25lIGJlaW5nIGNsZWFyZWQuXG4gICAgICAgICAgICAgICAgdmFyIGNvbnRleHRzID0gWydub3JtYWwnLCAnaW5zZXJ0JywgJ3Zpc3VhbCddO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGogaW4gY29udGV4dHMpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChjb250ZXh0c1tqXSAhPT0gY3R4KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXdNYXBwaW5nID0ge307XG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBtYXBwaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbmV3TWFwcGluZ1trZXldID0gbWFwcGluZ1trZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5ld01hcHBpbmcuY29udGV4dCA9IGNvbnRleHRzW2pdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tYXBDb21tYW5kKG5ld01hcHBpbmcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGxhbmdtYXA6IHVwZGF0ZUxhbmdtYXAsXG4gICAgICB2aW1LZXlGcm9tRXZlbnQ6IHZpbUtleUZyb21FdmVudCxcbiAgICAgIC8vIFRPRE86IEV4cG9zZSBzZXRPcHRpb24gYW5kIGdldE9wdGlvbiBhcyBpbnN0YW5jZSBtZXRob2RzLiBOZWVkIHRvIGRlY2lkZSBob3cgdG8gbmFtZXNwYWNlXG4gICAgICAvLyB0aGVtLCBvciBzb21laG93IG1ha2UgdGhlbSB3b3JrIHdpdGggdGhlIGV4aXN0aW5nIENvZGVNaXJyb3Igc2V0T3B0aW9uL2dldE9wdGlvbiBBUEkuXG4gICAgICBzZXRPcHRpb246IHNldE9wdGlvbixcbiAgICAgIGdldE9wdGlvbjogZ2V0T3B0aW9uLFxuICAgICAgZGVmaW5lT3B0aW9uOiBkZWZpbmVPcHRpb24sXG4gICAgICBkZWZpbmVFeDogZnVuY3Rpb24obmFtZSwgcHJlZml4LCBmdW5jKXtcbiAgICAgICAgaWYgKCFwcmVmaXgpIHtcbiAgICAgICAgICBwcmVmaXggPSBuYW1lO1xuICAgICAgICB9IGVsc2UgaWYgKG5hbWUuaW5kZXhPZihwcmVmaXgpICE9PSAwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCcoVmltLmRlZmluZUV4KSBcIicrcHJlZml4KydcIiBpcyBub3QgYSBwcmVmaXggb2YgXCInK25hbWUrJ1wiLCBjb21tYW5kIG5vdCByZWdpc3RlcmVkJyk7XG4gICAgICAgIH1cbiAgICAgICAgZXhDb21tYW5kc1tuYW1lXT1mdW5jO1xuICAgICAgICBleENvbW1hbmREaXNwYXRjaGVyLmNvbW1hbmRNYXBfW3ByZWZpeF09e25hbWU6bmFtZSwgc2hvcnROYW1lOnByZWZpeCwgdHlwZTonYXBpJ307XG4gICAgICB9LFxuICAgICAgaGFuZGxlS2V5OiBmdW5jdGlvbiAoY20sIGtleSwgb3JpZ2luKSB7XG4gICAgICAgIHZhciBjb21tYW5kID0gdGhpcy5maW5kS2V5KGNtLCBrZXksIG9yaWdpbik7XG4gICAgICAgIGlmICh0eXBlb2YgY29tbWFuZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiBjb21tYW5kKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtdWx0aVNlbGVjdEhhbmRsZUtleTogbXVsdGlTZWxlY3RIYW5kbGVLZXksXG5cbiAgICAgIC8qKlxuICAgICAgICogVGhpcyBpcyB0aGUgb3V0ZXJtb3N0IGZ1bmN0aW9uIGNhbGxlZCBieSBDb2RlTWlycm9yLCBhZnRlciBrZXlzIGhhdmVcbiAgICAgICAqIGJlZW4gbWFwcGVkIHRvIHRoZWlyIFZpbSBlcXVpdmFsZW50cy5cbiAgICAgICAqXG4gICAgICAgKiBGaW5kcyBhIGNvbW1hbmQgYmFzZWQgb24gdGhlIGtleSAoYW5kIGNhY2hlZCBrZXlzIGlmIHRoZXJlIGlzIGFcbiAgICAgICAqIG11bHRpLWtleSBzZXF1ZW5jZSkuIFJldHVybnMgYHVuZGVmaW5lZGAgaWYgbm8ga2V5IGlzIG1hdGNoZWQsIGEgbm9vcFxuICAgICAgICogZnVuY3Rpb24gaWYgYSBwYXJ0aWFsIG1hdGNoIGlzIGZvdW5kIChtdWx0aS1rZXkpLCBhbmQgYSBmdW5jdGlvbiB0b1xuICAgICAgICogZXhlY3V0ZSB0aGUgYm91bmQgY29tbWFuZCBpZiBhIGEga2V5IGlzIG1hdGNoZWQuIFRoZSBmdW5jdGlvbiBhbHdheXNcbiAgICAgICAqIHJldHVybnMgdHJ1ZS5cbiAgICAgICAqL1xuICAgICAgZmluZEtleTogZnVuY3Rpb24oY20sIGtleSwgb3JpZ2luKSB7XG4gICAgICAgIHZhciB2aW0gPSBtYXliZUluaXRWaW1TdGF0ZShjbSk7XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlTWFjcm9SZWNvcmRpbmcoKSB7XG4gICAgICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICAgICAgaWYgKG1hY3JvTW9kZVN0YXRlLmlzUmVjb3JkaW5nKSB7XG4gICAgICAgICAgICBpZiAoa2V5ID09ICdxJykge1xuICAgICAgICAgICAgICBtYWNyb01vZGVTdGF0ZS5leGl0TWFjcm9SZWNvcmRNb2RlKCk7XG4gICAgICAgICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9yaWdpbiAhPSAnbWFwcGluZycpIHtcbiAgICAgICAgICAgICAgbG9nS2V5KG1hY3JvTW9kZVN0YXRlLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVFc2MoKSB7XG4gICAgICAgICAgaWYgKGtleSA9PSAnPEVzYz4nKSB7XG4gICAgICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgICAgLy8gR2V0IGJhY2sgdG8gbm9ybWFsIG1vZGUuXG4gICAgICAgICAgICAgIGV4aXRWaXN1YWxNb2RlKGNtKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmltLmluc2VydE1vZGUpIHtcbiAgICAgICAgICAgICAgLy8gR2V0IGJhY2sgdG8gbm9ybWFsIG1vZGUuXG4gICAgICAgICAgICAgIGV4aXRJbnNlcnRNb2RlKGNtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFdlJ3JlIGFscmVhZHkgaW4gbm9ybWFsIG1vZGUuIExldCAnPEVzYz4nIGJlIGhhbmRsZWQgbm9ybWFsbHkuXG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVLZXlJbnNlcnRNb2RlKCkge1xuICAgICAgICAgIGlmIChoYW5kbGVFc2MoKSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICAgIHZpbS5pbnB1dFN0YXRlLmtleUJ1ZmZlci5wdXNoKGtleSk7XG4gICAgICAgICAgdmFyIGtleXMgPSB2aW0uaW5wdXRTdGF0ZS5rZXlCdWZmZXIuam9pbihcIlwiKTtcbiAgICAgICAgICB2YXIga2V5c0FyZUNoYXJzID0ga2V5Lmxlbmd0aCA9PSAxO1xuICAgICAgICAgIHZhciBtYXRjaCA9IGNvbW1hbmREaXNwYXRjaGVyLm1hdGNoQ29tbWFuZChrZXlzLCBkZWZhdWx0S2V5bWFwLCB2aW0uaW5wdXRTdGF0ZSwgJ2luc2VydCcpO1xuICAgICAgICAgIHZhciBjaGFuZ2VRdWV1ZSA9IHZpbS5pbnB1dFN0YXRlLmNoYW5nZVF1ZXVlO1xuXG4gICAgICAgICAgaWYgKG1hdGNoLnR5cGUgPT0gJ25vbmUnKSB7IGNsZWFySW5wdXRTdGF0ZShjbSk7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICAgIGVsc2UgaWYgKG1hdGNoLnR5cGUgPT0gJ3BhcnRpYWwnKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2guZXhwZWN0TGl0ZXJhbE5leHQpIHZpbS5leHBlY3RMaXRlcmFsTmV4dCA9IHRydWU7XG4gICAgICAgICAgICBpZiAobGFzdEluc2VydE1vZGVLZXlUaW1lcikgeyB3aW5kb3cuY2xlYXJUaW1lb3V0KGxhc3RJbnNlcnRNb2RlS2V5VGltZXIpOyB9XG4gICAgICAgICAgICBsYXN0SW5zZXJ0TW9kZUtleVRpbWVyID0ga2V5c0FyZUNoYXJzICYmIHdpbmRvdy5zZXRUaW1lb3V0KFxuICAgICAgICAgICAgICBmdW5jdGlvbigpIHsgaWYgKHZpbS5pbnNlcnRNb2RlICYmIHZpbS5pbnB1dFN0YXRlLmtleUJ1ZmZlci5sZW5ndGgpIHsgY2xlYXJJbnB1dFN0YXRlKGNtKTsgfSB9LFxuICAgICAgICAgICAgICBnZXRPcHRpb24oJ2luc2VydE1vZGVFc2NLZXlzVGltZW91dCcpKTtcbiAgICAgICAgICAgIGlmIChrZXlzQXJlQ2hhcnMpIHtcbiAgICAgICAgICAgICAgdmFyIHNlbGVjdGlvbnMgPSBjbS5saXN0U2VsZWN0aW9ucygpO1xuICAgICAgICAgICAgICBpZiAoIWNoYW5nZVF1ZXVlIHx8IGNoYW5nZVF1ZXVlLnJlbW92ZWQubGVuZ3RoICE9IHNlbGVjdGlvbnMubGVuZ3RoKVxuICAgICAgICAgICAgICAgIGNoYW5nZVF1ZXVlID0gdmltLmlucHV0U3RhdGUuY2hhbmdlUXVldWUgPSBuZXcgQ2hhbmdlUXVldWU7XG4gICAgICAgICAgICAgIGNoYW5nZVF1ZXVlLmluc2VydGVkICs9IGtleTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZyb20gPSBjdXJzb3JNaW4oc2VsZWN0aW9uc1tpXS5hbmNob3IsIHNlbGVjdGlvbnNbaV0uaGVhZCk7XG4gICAgICAgICAgICAgICAgdmFyIHRvID0gY3Vyc29yTWF4KHNlbGVjdGlvbnNbaV0uYW5jaG9yLCBzZWxlY3Rpb25zW2ldLmhlYWQpO1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gY20uZ2V0UmFuZ2UoZnJvbSwgY20uc3RhdGUub3ZlcndyaXRlID8gb2Zmc2V0Q3Vyc29yKHRvLCAwLCAxKSA6IHRvKTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VRdWV1ZS5yZW1vdmVkW2ldID0gKGNoYW5nZVF1ZXVlLnJlbW92ZWRbaV0gfHwgXCJcIikgKyB0ZXh0O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gIWtleXNBcmVDaGFycztcbiAgICAgICAgICB9XG4gICAgICAgICAgdmltLmV4cGVjdExpdGVyYWxOZXh0ID0gZmFsc2U7XG5cbiAgICAgICAgICBpZiAobGFzdEluc2VydE1vZGVLZXlUaW1lcikgeyB3aW5kb3cuY2xlYXJUaW1lb3V0KGxhc3RJbnNlcnRNb2RlS2V5VGltZXIpOyB9XG4gICAgICAgICAgaWYgKG1hdGNoLmNvbW1hbmQgJiYgY2hhbmdlUXVldWUpIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb25zID0gY20ubGlzdFNlbGVjdGlvbnMoKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZWN0aW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgaGVyZSA9IHNlbGVjdGlvbnNbaV0uaGVhZDtcbiAgICAgICAgICAgICAgY20ucmVwbGFjZVJhbmdlKGNoYW5nZVF1ZXVlLnJlbW92ZWRbaV0gfHwgXCJcIiwgXG4gICAgICAgICAgICAgICAgb2Zmc2V0Q3Vyc29yKGhlcmUsIDAsIC1jaGFuZ2VRdWV1ZS5pbnNlcnRlZC5sZW5ndGgpLCBoZXJlLCAnK2lucHV0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXMuY2hhbmdlcy5wb3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFtYXRjaC5jb21tYW5kKSBjbGVhcklucHV0U3RhdGUoY20pO1xuICAgICAgICAgIHJldHVybiBtYXRjaC5jb21tYW5kO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlS2V5Tm9uSW5zZXJ0TW9kZSgpIHtcbiAgICAgICAgICBpZiAoaGFuZGxlTWFjcm9SZWNvcmRpbmcoKSB8fCBoYW5kbGVFc2MoKSkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gICAgICAgICAgdmltLmlucHV0U3RhdGUua2V5QnVmZmVyLnB1c2goa2V5KTtcbiAgICAgICAgICB2YXIga2V5cyA9IHZpbS5pbnB1dFN0YXRlLmtleUJ1ZmZlci5qb2luKFwiXCIpO1xuICAgICAgICAgIGlmICgvXlsxLTldXFxkKiQvLnRlc3Qoa2V5cykpIHsgcmV0dXJuIHRydWU7IH1cblxuICAgICAgICAgIHZhciBrZXlzTWF0Y2hlciA9IC9eKFxcZCopKC4qKSQvLmV4ZWMoa2V5cyk7XG4gICAgICAgICAgaWYgKCFrZXlzTWF0Y2hlcikgeyBjbGVhcklucHV0U3RhdGUoY20pOyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgICB2YXIgY29udGV4dCA9IHZpbS52aXN1YWxNb2RlID8gJ3Zpc3VhbCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbm9ybWFsJztcbiAgICAgICAgICB2YXIgbWFpbktleSA9IGtleXNNYXRjaGVyWzJdIHx8IGtleXNNYXRjaGVyWzFdO1xuICAgICAgICAgIGlmICh2aW0uaW5wdXRTdGF0ZS5vcGVyYXRvclNob3J0Y3V0ICYmIHZpbS5pbnB1dFN0YXRlLm9wZXJhdG9yU2hvcnRjdXQuc2xpY2UoLTEpID09IG1haW5LZXkpIHtcbiAgICAgICAgICAgIC8vIG11bHRpa2V5IG9wZXJhdG9ycyBhY3QgbGluZXdpc2UgYnkgcmVwZWF0aW5nIG9ubHkgdGhlIGxhc3QgY2hhcmFjdGVyXG4gICAgICAgICAgICBtYWluS2V5ID0gdmltLmlucHV0U3RhdGUub3BlcmF0b3JTaG9ydGN1dDtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIG1hdGNoID0gY29tbWFuZERpc3BhdGNoZXIubWF0Y2hDb21tYW5kKG1haW5LZXksIGRlZmF1bHRLZXltYXAsIHZpbS5pbnB1dFN0YXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAobWF0Y2gudHlwZSA9PSAnbm9uZScpIHsgY2xlYXJJbnB1dFN0YXRlKGNtKTsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgICAgZWxzZSBpZiAobWF0Y2gudHlwZSA9PSAncGFydGlhbCcpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaC5leHBlY3RMaXRlcmFsTmV4dCkgdmltLmV4cGVjdExpdGVyYWxOZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChtYXRjaC50eXBlID09ICdjbGVhcicpIHsgY2xlYXJJbnB1dFN0YXRlKGNtKTsgcmV0dXJuIHRydWU7IH1cbiAgICAgICAgICB2aW0uZXhwZWN0TGl0ZXJhbE5leHQgPSBmYWxzZTtcblxuICAgICAgICAgIHZpbS5pbnB1dFN0YXRlLmtleUJ1ZmZlci5sZW5ndGggPSAwO1xuICAgICAgICAgIGtleXNNYXRjaGVyID0gL14oXFxkKikoLiopJC8uZXhlYyhrZXlzKTtcbiAgICAgICAgICBpZiAoa2V5c01hdGNoZXJbMV0gJiYga2V5c01hdGNoZXJbMV0gIT0gJzAnKSB7XG4gICAgICAgICAgICB2aW0uaW5wdXRTdGF0ZS5wdXNoUmVwZWF0RGlnaXQoa2V5c01hdGNoZXJbMV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWF0Y2guY29tbWFuZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb21tYW5kO1xuICAgICAgICBpZiAodmltLmluc2VydE1vZGUpIHsgY29tbWFuZCA9IGhhbmRsZUtleUluc2VydE1vZGUoKTsgfVxuICAgICAgICBlbHNlIHsgY29tbWFuZCA9IGhhbmRsZUtleU5vbkluc2VydE1vZGUoKTsgfVxuICAgICAgICBpZiAoY29tbWFuZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gIXZpbS5pbnNlcnRNb2RlICYmIGtleS5sZW5ndGggPT09IDEgPyBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH0gOiB1bmRlZmluZWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoY29tbWFuZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIFRPRE86IExvb2sgaW50byB1c2luZyBDb2RlTWlycm9yJ3MgbXVsdGkta2V5IGhhbmRsaW5nLlxuICAgICAgICAgIC8vIFJldHVybiBuby1vcCBzaW5jZSB3ZSBhcmUgY2FjaGluZyB0aGUga2V5LiBDb3VudHMgYXMgaGFuZGxlZCwgYnV0XG4gICAgICAgICAgLy8gZG9uJ3Qgd2FudCBhY3Qgb24gaXQganVzdCB5ZXQuXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoKGNvbW1hbmQub3BlcmF0b3IgfHwgY29tbWFuZC5pc0VkaXQpICYmIGNtLmdldE9wdGlvbigncmVhZE9ubHknKSlcbiAgICAgICAgICAgICAgcmV0dXJuOyAvLyBhY2VfcGF0Y2hcbiAgICAgICAgICAgIHJldHVybiBjbS5vcGVyYXRpb24oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGNtLmN1ck9wLmlzVmltT3AgPSB0cnVlO1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChjb21tYW5kLnR5cGUgPT0gJ2tleVRvS2V5Jykge1xuICAgICAgICAgICAgICAgICAgZG9LZXlUb0tleShjbSwgY29tbWFuZC50b0tleXMsIGNvbW1hbmQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjb21tYW5kRGlzcGF0Y2hlci5wcm9jZXNzQ29tbWFuZChjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAvLyBjbGVhciBWSU0gc3RhdGUgaW4gY2FzZSBpdCdzIGluIGEgYmFkIHN0YXRlLlxuICAgICAgICAgICAgICAgIGNtLnN0YXRlLnZpbSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBtYXliZUluaXRWaW1TdGF0ZShjbSk7XG4gICAgICAgICAgICAgICAgaWYgKCF2aW1BcGkuc3VwcHJlc3NFcnJvckxvZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGVbJ2xvZyddKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhbmRsZUV4OiBmdW5jdGlvbihjbSwgaW5wdXQpIHtcbiAgICAgICAgZXhDb21tYW5kRGlzcGF0Y2hlci5wcm9jZXNzQ29tbWFuZChjbSwgaW5wdXQpO1xuICAgICAgfSxcblxuICAgICAgZGVmaW5lTW90aW9uOiBkZWZpbmVNb3Rpb24sXG4gICAgICBkZWZpbmVBY3Rpb246IGRlZmluZUFjdGlvbixcbiAgICAgIGRlZmluZU9wZXJhdG9yOiBkZWZpbmVPcGVyYXRvcixcbiAgICAgIG1hcENvbW1hbmQ6IG1hcENvbW1hbmQsXG4gICAgICBfbWFwQ29tbWFuZDogX21hcENvbW1hbmQsXG5cbiAgICAgIGRlZmluZVJlZ2lzdGVyOiBkZWZpbmVSZWdpc3RlcixcblxuICAgICAgZXhpdFZpc3VhbE1vZGU6IGV4aXRWaXN1YWxNb2RlLFxuICAgICAgZXhpdEluc2VydE1vZGU6IGV4aXRJbnNlcnRNb2RlXG4gICAgfTtcblxuICAgIHZhciBrZXlUb0tleVN0YWNrID0gW107XG4gICAgdmFyIG5vcmVtYXAgPSBmYWxzZTtcbiAgICB2YXIgdmlydHVhbFByb21wdDtcbiAgICBmdW5jdGlvbiBzZW5kS2V5VG9Qcm9tcHQoa2V5KSB7XG4gICAgICBpZiAoa2V5WzBdID09IFwiPFwiKSB7XG4gICAgICAgIHZhciBsb3dlcktleSA9IGtleS50b0xvd2VyQ2FzZSgpLnNsaWNlKDEsIC0xKTtcbiAgICAgICAgdmFyIHBhcnRzID0gbG93ZXJLZXkuc3BsaXQoJy0nKTtcbiAgICAgICAgbG93ZXJLZXkgPSBwYXJ0cy5wb3AoKSB8fCAnJztcbiAgICAgICAgaWYgKGxvd2VyS2V5ID09ICdsdCcpIGtleSA9ICc8JztcbiAgICAgICAgZWxzZSBpZiAobG93ZXJLZXkgPT0gJ3NwYWNlJykga2V5ID0gJyAnO1xuICAgICAgICBlbHNlIGlmIChsb3dlcktleSA9PSAnY3InKSBrZXkgPSAnXFxuJztcbiAgICAgICAgZWxzZSBpZiAodmltVG9DbUtleU1hcFtsb3dlcktleV0pIHtcbiAgICAgICAgICB2YXIgdmFsdWUgPSB2aXJ0dWFsUHJvbXB0LnZhbHVlO1xuICAgICAgICAgIHZhciBldmVudCA9ICB7XG4gICAgICAgICAgICBrZXk6IHZpbVRvQ21LZXlNYXBbbG93ZXJLZXldLFxuICAgICAgICAgICAgdGFyZ2V0OiB7XG4gICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgICAgICAgICAgc2VsZWN0aW9uRW5kOiB2YWx1ZS5sZW5ndGgsXG4gICAgICAgICAgICAgIHNlbGVjdGlvblN0YXJ0OiB2YWx1ZS5sZW5ndGhcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZpcnR1YWxQcm9tcHQub25LZXlEb3duKSB7XG4gICAgICAgICAgICB2aXJ0dWFsUHJvbXB0Lm9uS2V5RG93bihldmVudCwgdmlydHVhbFByb21wdC52YWx1ZSwgY2xvc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodmlydHVhbFByb21wdCAmJiB2aXJ0dWFsUHJvbXB0Lm9uS2V5VXApIHtcbiAgICAgICAgICAgIHZpcnR1YWxQcm9tcHQub25LZXlVcChldmVudCwgdmlydHVhbFByb21wdC52YWx1ZSwgY2xvc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChrZXkgPT0gJ1xcbicpIHtcbiAgICAgICAgdmFyIHByb21wdCA9IHZpcnR1YWxQcm9tcHQ7XG4gICAgICAgIHZpcnR1YWxQcm9tcHQgPSBudWxsO1xuICAgICAgICBwcm9tcHQub25DbG9zZSAmJiBwcm9tcHQub25DbG9zZShwcm9tcHQudmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmlydHVhbFByb21wdC52YWx1ZSA9ICh2aXJ0dWFsUHJvbXB0LnZhbHVlIHx8ICcnKSArIGtleTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gY2xvc2UodmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJykgeyB2aXJ0dWFsUHJvbXB0LnZhbHVlID0gdmFsdWU7IH1cbiAgICAgICAgZWxzZSB7IHZpcnR1YWxQcm9tcHQgPSBudWxsOyB9XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGRvS2V5VG9LZXkoY20sIGtleXMsIGZyb21LZXkpIHtcbiAgICAgIHZhciBub3JlbWFwQmVmb3JlID0gbm9yZW1hcDtcbiAgICAgIC8vIHByZXZlbnQgaW5maW5pdGUgcmVjdXJzaW9uLlxuICAgICAgaWYgKGZyb21LZXkpIHtcbiAgICAgICAgaWYgKGtleVRvS2V5U3RhY2suaW5kZXhPZihmcm9tS2V5KSAhPSAtMSkgcmV0dXJuO1xuICAgICAgICBrZXlUb0tleVN0YWNrLnB1c2goZnJvbUtleSk7XG4gICAgICAgIG5vcmVtYXAgPSBmcm9tS2V5Lm5vcmVtYXAgIT0gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHZhciB2aW0gPSBtYXliZUluaXRWaW1TdGF0ZShjbSk7XG4gICAgICAgIHZhciBrZXlSZSA9IC88KD86W0NTTUFdLSkqXFx3Kz58Li9naTtcblxuICAgICAgICB2YXIgbWF0Y2g7XG4gICAgICAgIC8vIFB1bGwgb2ZmIG9uZSBjb21tYW5kIGtleSwgd2hpY2ggaXMgZWl0aGVyIGEgc2luZ2xlIGNoYXJhY3RlclxuICAgICAgICAvLyBvciBhIHNwZWNpYWwgc2VxdWVuY2Ugd3JhcHBlZCBpbiAnPCcgYW5kICc+JywgZS5nLiAnPFNwYWNlPicuXG4gICAgICAgIHdoaWxlICgobWF0Y2ggPSBrZXlSZS5leGVjKGtleXMpKSkge1xuICAgICAgICAgIHZhciBrZXkgPSBtYXRjaFswXTtcbiAgICAgICAgICB2YXIgd2FzSW5zZXJ0ID0gdmltLmluc2VydE1vZGU7XG4gICAgICAgICAgaWYgKHZpcnR1YWxQcm9tcHQpIHtcbiAgICAgICAgICAgIHNlbmRLZXlUb1Byb21wdChrZXkpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHJlc3VsdCA9IHZpbUFwaS5oYW5kbGVLZXkoY20sIGtleSwgJ21hcHBpbmcnKTtcblxuICAgICAgICAgIGlmICghcmVzdWx0ICYmIHdhc0luc2VydCAmJiB2aW0uaW5zZXJ0TW9kZSkge1xuICAgICAgICAgICAgaWYgKGtleVswXSA9PSBcIjxcIikge1xuICAgICAgICAgICAgICB2YXIgbG93ZXJLZXkgPSBrZXkudG9Mb3dlckNhc2UoKS5zbGljZSgxLCAtMSk7XG4gICAgICAgICAgICAgIHZhciBwYXJ0cyA9IGxvd2VyS2V5LnNwbGl0KCctJyk7XG4gICAgICAgICAgICAgIGxvd2VyS2V5ID0gcGFydHMucG9wKCkgfHwgJyc7XG4gICAgICAgICAgICAgIGlmIChsb3dlcktleSA9PSAnbHQnKSBrZXkgPSAnPCc7XG4gICAgICAgICAgICAgIGVsc2UgaWYgKGxvd2VyS2V5ID09ICdzcGFjZScpIGtleSA9ICcgJztcbiAgICAgICAgICAgICAgZWxzZSBpZiAobG93ZXJLZXkgPT0gJ2NyJykga2V5ID0gJ1xcbic7XG4gICAgICAgICAgICAgIGVsc2UgaWYgKHZpbVRvQ21LZXlNYXAuaGFzT3duUHJvcGVydHkobG93ZXJLZXkpKSB7XG4gICAgICAgICAgICAgICAgLy8gdG9kbyBzdXBwb3J0IGNvZGVtaXJyb3Iga2V5cyBpbiBpbnNlcnRtb2RlIHZpbVRvQ21LZXlNYXBcbiAgICAgICAgICAgICAgICBrZXkgPSB2aW1Ub0NtS2V5TWFwW2xvd2VyS2V5XTtcbiAgICAgICAgICAgICAgICBzZW5kQ21LZXkoY20sIGtleSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAga2V5ID0ga2V5WzBdO1xuICAgICAgICAgICAgICAgIGtleVJlLmxhc3RJbmRleCA9IG1hdGNoLmluZGV4ICsgMTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbihrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAga2V5VG9LZXlTdGFjay5wb3AoKTtcbiAgICAgICAgbm9yZW1hcCA9IGtleVRvS2V5U3RhY2subGVuZ3RoID8gbm9yZW1hcEJlZm9yZSA6IGZhbHNlO1xuICAgICAgICBpZiAoIWtleVRvS2V5U3RhY2subGVuZ3RoICYmIHZpcnR1YWxQcm9tcHQpIHtcbiAgICAgICAgICB2YXIgcHJvbXB0T3B0aW9ucyA9IHZpcnR1YWxQcm9tcHQ7XG4gICAgICAgICAgdmlydHVhbFByb21wdCA9IG51bGw7XG4gICAgICAgICAgc2hvd1Byb21wdChjbSwgcHJvbXB0T3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc3BlY2lhbEtleSA9IHtcbiAgICAgIFJldHVybjogJ0NSJywgQmFja3NwYWNlOiAnQlMnLCAnRGVsZXRlJzogJ0RlbCcsIEVzY2FwZTogJ0VzYycsIEluc2VydDogJ0lucycsXG4gICAgICBBcnJvd0xlZnQ6ICdMZWZ0JywgQXJyb3dSaWdodDogJ1JpZ2h0JywgQXJyb3dVcDogJ1VwJywgQXJyb3dEb3duOiAnRG93bicsXG4gICAgICBFbnRlcjogJ0NSJywgJyAnOiAnU3BhY2UnXG4gICAgfTtcbiAgICB2YXIgaWdub3JlZEtleXMgPSB7IFNoaWZ0OiAxLCBBbHQ6IDEsIENvbW1hbmQ6IDEsIENvbnRyb2w6IDEsXG4gICAgICBDYXBzTG9jazogMSwgQWx0R3JhcGg6IDEsIERlYWQ6IDEsIFVuaWRlbnRpZmllZDogMSB9O1xuXG4gICAgdmFyIHZpbVRvQ21LZXlNYXAgPSB7fTtcbiAgICAnTGVmdHxSaWdodHxVcHxEb3dufEVuZHxIb21lJy5zcGxpdCgnfCcpLmNvbmNhdChPYmplY3Qua2V5cyhzcGVjaWFsS2V5KSkuZm9yRWFjaChmdW5jdGlvbih4KSB7XG4gICAgICB2aW1Ub0NtS2V5TWFwWyhzcGVjaWFsS2V5W3hdIHx8ICcnKS50b0xvd2VyQ2FzZSgpXVxuICAgICAgICAgPSB2aW1Ub0NtS2V5TWFwW3gudG9Mb3dlckNhc2UoKV0gPSB4O1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gdmltS2V5RnJvbUV2ZW50KGUsIHZpbSkge1xuICAgICAgdmFyIGtleSA9IGUua2V5O1xuICAgICAgaWYgKGlnbm9yZWRLZXlzW2tleV0pIHJldHVybjtcbiAgICAgIGlmIChrZXkubGVuZ3RoID4gMSAmJiBrZXlbMF0gPT0gXCJuXCIpIHtcbiAgICAgICAga2V5ID0ga2V5LnJlcGxhY2UoXCJOdW1wYWRcIiwgXCJcIik7XG4gICAgICB9XG4gICAgICBrZXkgPSBzcGVjaWFsS2V5W2tleV0gfHwga2V5O1xuXG4gICAgICB2YXIgbmFtZSA9ICcnO1xuICAgICAgaWYgKGUuY3RybEtleSkgeyBuYW1lICs9ICdDLSc7IH1cbiAgICAgIGlmIChlLmFsdEtleSkgeyBuYW1lICs9ICdBLSc7IH1cbiAgICAgIGlmIChlLm1ldGFLZXkpIHsgbmFtZSArPSAnTS0nOyB9XG4gICAgICAvLyBvbiBtYWMgbWFueSBjaGFyYWN0ZXJzIGFyZSBlbnRlcmVkIGFzIG9wdGlvbi0gY29tYm9zXG4gICAgICAvLyAoZS5nLiBvbiBzd2lzcyBrZXlib2FyZCB7IGlzIG9wdGlvbi04KVxuICAgICAgLy8gc28gd2UgaWdub3JlIGxvbmVseSBBLSBtb2RpZmllciBmb3Iga2V5cHJlc3MgZXZlbnQgb24gbWFjXG4gICAgICBpZiAoQ29kZU1pcnJvci5pc01hYyAmJiBlLmFsdEtleSAmJiAhZS5tZXRhS2V5ICYmICFlLmN0cmxLZXkpIHtcbiAgICAgICAgbmFtZSA9IG5hbWUuc2xpY2UoMik7XG4gICAgICB9XG4gICAgICBpZiAoKG5hbWUgfHwga2V5Lmxlbmd0aCA+IDEpICYmIGUuc2hpZnRLZXkpIHsgbmFtZSArPSAnUy0nOyB9XG4gIFxuICAgICAgaWYgKHZpbSAmJiAhdmltLmV4cGVjdExpdGVyYWxOZXh0ICYmIGtleS5sZW5ndGggPT0gMSkge1xuICAgICAgICBpZiAobGFuZ21hcC5rZXltYXAgJiYga2V5IGluIGxhbmdtYXAua2V5bWFwKSB7XG4gICAgICAgICAgaWYgKGxhbmdtYXAucmVtYXBDdHJsICE9IGZhbHNlIHx8ICFuYW1lKVxuICAgICAgICAgICAga2V5ID0gbGFuZ21hcC5rZXltYXBba2V5XTtcbiAgICAgICAgfSBlbHNlIGlmIChrZXkuY2hhckNvZGVBdCgwKSA+IDI1NSkge1xuICAgICAgICAgIHZhciBjb2RlID0gZS5jb2RlICYmIGUuY29kZS5zbGljZSgtMSkgfHwgXCJcIjtcbiAgICAgICAgICBpZiAoIWUuc2hpZnRLZXkpIGNvZGUgPSBjb2RlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgaWYgKGNvZGUpIGtleSA9IGNvZGU7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbmFtZSArPSBrZXk7XG4gICAgICBpZiAobmFtZS5sZW5ndGggPiAxKSB7IG5hbWUgPSAnPCcgKyBuYW1lICsgJz4nOyB9XG4gICAgICByZXR1cm4gbmFtZTtcbiAgICB9O1xuXG4gICAgLy8gbGFuZ21hcCBzdXBwb3J0XG4gICAgZnVuY3Rpb24gdXBkYXRlTGFuZ21hcChsYW5nbWFwU3RyaW5nLCByZW1hcEN0cmwpIHtcbiAgICAgIGlmIChsYW5nbWFwLnN0cmluZyAhPT0gbGFuZ21hcFN0cmluZykge1xuICAgICAgICBsYW5nbWFwID0gcGFyc2VMYW5nbWFwKGxhbmdtYXBTdHJpbmcpO1xuICAgICAgfVxuICAgICAgbGFuZ21hcC5yZW1hcEN0cmwgPSByZW1hcEN0cmw7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHBhcnNlTGFuZ21hcChsYW5nbWFwU3RyaW5nKSB7XG4gICAgICAvLyBGcm9tIDpoZWxwIGxhbmdtYXBcbiAgICAgIC8qXG4gICAgICAgIFRoZSAnbGFuZ21hcCcgb3B0aW9uIGlzIGEgbGlzdCBvZiBwYXJ0cywgc2VwYXJhdGVkIHdpdGggY29tbWFzLiAgRWFjaFxuICAgICAgICAgICAgcGFydCBjYW4gYmUgaW4gb25lIG9mIHR3byBmb3JtczpcbiAgICAgICAgICAgIDEuICBBIGxpc3Qgb2YgcGFpcnMuICBFYWNoIHBhaXIgaXMgYSBcImZyb21cIiBjaGFyYWN0ZXIgaW1tZWRpYXRlbHlcbiAgICAgICAgICAgICAgICBmb2xsb3dlZCBieSB0aGUgXCJ0b1wiIGNoYXJhY3Rlci4gIEV4YW1wbGVzOiBcImFBXCIsIFwiYUFiQmNDXCIuXG4gICAgICAgICAgICAyLiAgQSBsaXN0IG9mIFwiZnJvbVwiIGNoYXJhY3RlcnMsIGEgc2VtaS1jb2xvbiBhbmQgYSBsaXN0IG9mIFwidG9cIlxuICAgICAgICAgICAgICAgIGNoYXJhY3RlcnMuICBFeGFtcGxlOiBcImFiYztBQkNcIlxuICAgICAgKi9cblxuICAgICAgbGV0IGtleW1hcCA9IHt9O1xuICAgICAgaWYgKCFsYW5nbWFwU3RyaW5nKSByZXR1cm4geyBrZXltYXA6IGtleW1hcCwgc3RyaW5nOiAnJyB9O1xuXG4gICAgICBmdW5jdGlvbiBnZXRFc2NhcGVkKGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIGxpc3Quc3BsaXQoL1xcXFw/KC4pLykuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgfVxuICAgICAgbGFuZ21hcFN0cmluZy5zcGxpdCgvKCg/OlteXFxcXCxdfFxcXFwuKSspLC8pLm1hcChwYXJ0ID0+IHtcbiAgICAgICAgaWYgKCFwYXJ0KSByZXR1cm47XG4gICAgICAgIGNvbnN0IHNlbWljb2xvbiA9IHBhcnQuc3BsaXQoLygoPzpbXlxcXFw7XXxcXFxcLikrKTsvKTtcbiAgICAgICAgaWYgKHNlbWljb2xvbi5sZW5ndGggPT0gMykge1xuICAgICAgICAgIGNvbnN0IGZyb20gPSBnZXRFc2NhcGVkKHNlbWljb2xvblsxXSk7XG4gICAgICAgICAgY29uc3QgdG8gPSBnZXRFc2NhcGVkKHNlbWljb2xvblsyXSk7XG4gICAgICAgICAgaWYgKGZyb20ubGVuZ3RoICE9PSB0by5sZW5ndGgpIHJldHVybjsgLy8gc2tpcCBvdmVyIG1hbGZvcm1lZCBwYXJ0XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmcm9tLmxlbmd0aDsgKytpKSBrZXltYXBbZnJvbVtpXV0gPSB0b1tpXTtcbiAgICAgICAgfSBlbHNlIGlmIChzZW1pY29sb24ubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICBjb25zdCBwYWlycyA9IGdldEVzY2FwZWQocGFydCk7XG4gICAgICAgICAgaWYgKHBhaXJzLmxlbmd0aCAlIDIgIT09IDApIHJldHVybjsgLy8gc2tpcCBvdmVyIG1hbGZvcm1lZCBwYXJ0XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYWlycy5sZW5ndGg7IGkgKz0gMikga2V5bWFwW3BhaXJzW2ldXSA9IHBhaXJzW2kgKyAxXTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiB7IGtleW1hcDoga2V5bWFwLCBzdHJpbmc6IGxhbmdtYXBTdHJpbmcgfTtcbiAgICB9XG5cbiAgICBkZWZpbmVPcHRpb24oJ2xhbmdtYXAnLCB1bmRlZmluZWQsICdzdHJpbmcnLCBbJ2xtYXAnXSwgZnVuY3Rpb24obmFtZSwgY20pIHtcbiAgICAgIC8vIFRoZSAnZmlsZXR5cGUnIG9wdGlvbiBwcm94aWVzIHRvIHRoZSBDb2RlTWlycm9yICdtb2RlJyBvcHRpb24uXG4gICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBsYW5nbWFwLnN0cmluZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZUxhbmdtYXAobmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBSZXByZXNlbnRzIHRoZSBjdXJyZW50IGlucHV0IHN0YXRlLlxuICAgIGZ1bmN0aW9uIElucHV0U3RhdGUoKSB7XG4gICAgICB0aGlzLnByZWZpeFJlcGVhdCA9IFtdO1xuICAgICAgdGhpcy5tb3Rpb25SZXBlYXQgPSBbXTtcblxuICAgICAgdGhpcy5vcGVyYXRvciA9IG51bGw7XG4gICAgICB0aGlzLm9wZXJhdG9yQXJncyA9IG51bGw7XG4gICAgICB0aGlzLm1vdGlvbiA9IG51bGw7XG4gICAgICB0aGlzLm1vdGlvbkFyZ3MgPSBudWxsO1xuICAgICAgdGhpcy5rZXlCdWZmZXIgPSBbXTsgLy8gRm9yIG1hdGNoaW5nIG11bHRpLWtleSBjb21tYW5kcy5cbiAgICAgIHRoaXMucmVnaXN0ZXJOYW1lID0gbnVsbDsgLy8gRGVmYXVsdHMgdG8gdGhlIHVubmFtZWQgcmVnaXN0ZXIuXG4gICAgICB0aGlzLmNoYW5nZVF1ZXVlID0gbnVsbDsgLy8gRm9yIHJlc3RvcmluZyB0ZXh0IHVzZWQgYnkgaW5zZXJ0IG1vZGUga2V5YmluZGluZ3NcbiAgICB9XG4gICAgSW5wdXRTdGF0ZS5wcm90b3R5cGUucHVzaFJlcGVhdERpZ2l0ID0gZnVuY3Rpb24obikge1xuICAgICAgaWYgKCF0aGlzLm9wZXJhdG9yKSB7XG4gICAgICAgIHRoaXMucHJlZml4UmVwZWF0ID0gdGhpcy5wcmVmaXhSZXBlYXQuY29uY2F0KG4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tb3Rpb25SZXBlYXQgPSB0aGlzLm1vdGlvblJlcGVhdC5jb25jYXQobik7XG4gICAgICB9XG4gICAgfTtcbiAgICBJbnB1dFN0YXRlLnByb3RvdHlwZS5nZXRSZXBlYXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZXBlYXQgPSAwO1xuICAgICAgaWYgKHRoaXMucHJlZml4UmVwZWF0Lmxlbmd0aCA+IDAgfHwgdGhpcy5tb3Rpb25SZXBlYXQubGVuZ3RoID4gMCkge1xuICAgICAgICByZXBlYXQgPSAxO1xuICAgICAgICBpZiAodGhpcy5wcmVmaXhSZXBlYXQubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJlcGVhdCAqPSBwYXJzZUludCh0aGlzLnByZWZpeFJlcGVhdC5qb2luKCcnKSwgMTApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm1vdGlvblJlcGVhdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmVwZWF0ICo9IHBhcnNlSW50KHRoaXMubW90aW9uUmVwZWF0LmpvaW4oJycpLCAxMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXBlYXQ7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNsZWFySW5wdXRTdGF0ZShjbSwgcmVhc29uKSB7XG4gICAgICBjbS5zdGF0ZS52aW0uaW5wdXRTdGF0ZSA9IG5ldyBJbnB1dFN0YXRlKCk7XG4gICAgICBjbS5zdGF0ZS52aW0uZXhwZWN0TGl0ZXJhbE5leHQgPSBmYWxzZTtcbiAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCAndmltLWNvbW1hbmQtZG9uZScsIHJlYXNvbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gQ2hhbmdlUXVldWUoKSB7XG4gICAgICB0aGlzLnJlbW92ZWQgPSBbXTtcbiAgICAgIHRoaXMuaW5zZXJ0ZWQgPSBcIlwiO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogUmVnaXN0ZXIgc3RvcmVzIGluZm9ybWF0aW9uIGFib3V0IGNvcHkgYW5kIHBhc3RlIHJlZ2lzdGVycy4gIEJlc2lkZXNcbiAgICAgKiB0ZXh0LCBhIHJlZ2lzdGVyIG11c3Qgc3RvcmUgd2hldGhlciBpdCBpcyBsaW5ld2lzZSAoaS5lLiwgd2hlbiBpdCBpc1xuICAgICAqIHBhc3RlZCwgc2hvdWxkIGl0IGluc2VydCBpdHNlbGYgaW50byBhIG5ldyBsaW5lLCBvciBzaG91bGQgdGhlIHRleHQgYmVcbiAgICAgKiBpbnNlcnRlZCBhdCB0aGUgY3Vyc29yIHBvc2l0aW9uLilcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBSZWdpc3Rlcih0ZXh0LCBsaW5ld2lzZSwgYmxvY2t3aXNlKSB7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aGlzLmtleUJ1ZmZlciA9IFt0ZXh0IHx8ICcnXTtcbiAgICAgIHRoaXMuaW5zZXJ0TW9kZUNoYW5nZXMgPSBbXTtcbiAgICAgIHRoaXMuc2VhcmNoUXVlcmllcyA9IFtdO1xuICAgICAgdGhpcy5saW5ld2lzZSA9ICEhbGluZXdpc2U7XG4gICAgICB0aGlzLmJsb2Nrd2lzZSA9ICEhYmxvY2t3aXNlO1xuICAgIH1cbiAgICBSZWdpc3Rlci5wcm90b3R5cGUgPSB7XG4gICAgICBzZXRUZXh0OiBmdW5jdGlvbih0ZXh0LCBsaW5ld2lzZSwgYmxvY2t3aXNlKSB7XG4gICAgICAgIHRoaXMua2V5QnVmZmVyID0gW3RleHQgfHwgJyddO1xuICAgICAgICB0aGlzLmxpbmV3aXNlID0gISFsaW5ld2lzZTtcbiAgICAgICAgdGhpcy5ibG9ja3dpc2UgPSAhIWJsb2Nrd2lzZTtcbiAgICAgIH0sXG4gICAgICBwdXNoVGV4dDogZnVuY3Rpb24odGV4dCwgbGluZXdpc2UpIHtcbiAgICAgICAgLy8gaWYgdGhpcyByZWdpc3RlciBoYXMgZXZlciBiZWVuIHNldCB0byBsaW5ld2lzZSwgdXNlIGxpbmV3aXNlLlxuICAgICAgICBpZiAobGluZXdpc2UpIHtcbiAgICAgICAgICBpZiAoIXRoaXMubGluZXdpc2UpIHtcbiAgICAgICAgICAgIHRoaXMua2V5QnVmZmVyLnB1c2goJ1xcbicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmxpbmV3aXNlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmtleUJ1ZmZlci5wdXNoKHRleHQpO1xuICAgICAgfSxcbiAgICAgIHB1c2hJbnNlcnRNb2RlQ2hhbmdlczogZnVuY3Rpb24oY2hhbmdlcykge1xuICAgICAgICB0aGlzLmluc2VydE1vZGVDaGFuZ2VzLnB1c2goY3JlYXRlSW5zZXJ0TW9kZUNoYW5nZXMoY2hhbmdlcykpO1xuICAgICAgfSxcbiAgICAgIHB1c2hTZWFyY2hRdWVyeTogZnVuY3Rpb24ocXVlcnkpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hRdWVyaWVzLnB1c2gocXVlcnkpO1xuICAgICAgfSxcbiAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5rZXlCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5pbnNlcnRNb2RlQ2hhbmdlcyA9IFtdO1xuICAgICAgICB0aGlzLnNlYXJjaFF1ZXJpZXMgPSBbXTtcbiAgICAgICAgdGhpcy5saW5ld2lzZSA9IGZhbHNlO1xuICAgICAgfSxcbiAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5QnVmZmVyLmpvaW4oJycpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGFuIGV4dGVybmFsIHJlZ2lzdGVyLlxuICAgICAqXG4gICAgICogVGhlIG5hbWUgc2hvdWxkIGJlIGEgc2luZ2xlIGNoYXJhY3RlciB0aGF0IHdpbGwgYmUgdXNlZCB0byByZWZlcmVuY2UgdGhlIHJlZ2lzdGVyLlxuICAgICAqIFRoZSByZWdpc3RlciBzaG91bGQgc3VwcG9ydCBzZXRUZXh0LCBwdXNoVGV4dCwgY2xlYXIsIGFuZCB0b1N0cmluZygpLiBTZWUgUmVnaXN0ZXJcbiAgICAgKiBmb3IgYSByZWZlcmVuY2UgaW1wbGVtZW50YXRpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gZGVmaW5lUmVnaXN0ZXIobmFtZSwgcmVnaXN0ZXIpIHtcbiAgICAgIHZhciByZWdpc3RlcnMgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIucmVnaXN0ZXJzO1xuICAgICAgaWYgKCFuYW1lIHx8IG5hbWUubGVuZ3RoICE9IDEpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1JlZ2lzdGVyIG5hbWUgbXVzdCBiZSAxIGNoYXJhY3RlcicpO1xuICAgICAgfVxuICAgICAgLy8gYWNlX3BhdGNoXG4gICAgICByZWdpc3RlcnNbbmFtZV0gPSByZWdpc3RlcjtcbiAgICAgIHZhbGlkUmVnaXN0ZXJzLnB1c2gobmFtZSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiB2aW0gcmVnaXN0ZXJzIGFsbG93IHlvdSB0byBrZWVwIG1hbnkgaW5kZXBlbmRlbnQgY29weSBhbmQgcGFzdGUgYnVmZmVycy5cbiAgICAgKiBTZWUgaHR0cDovL3VzZXZpbS5jb20vMjAxMi8wNC8xMy9yZWdpc3RlcnMvIGZvciBhbiBpbnRyb2R1Y3Rpb24uXG4gICAgICpcbiAgICAgKiBSZWdpc3RlckNvbnRyb2xsZXIga2VlcHMgdGhlIHN0YXRlIG9mIGFsbCB0aGUgcmVnaXN0ZXJzLiAgQW4gaW5pdGlhbFxuICAgICAqIHN0YXRlIG1heSBiZSBwYXNzZWQgaW4uICBUaGUgdW5uYW1lZCByZWdpc3RlciAnXCInIHdpbGwgYWx3YXlzIGJlXG4gICAgICogb3ZlcnJpZGRlbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBSZWdpc3RlckNvbnRyb2xsZXIocmVnaXN0ZXJzKSB7XG4gICAgICB0aGlzLnJlZ2lzdGVycyA9IHJlZ2lzdGVycztcbiAgICAgIHRoaXMudW5uYW1lZFJlZ2lzdGVyID0gcmVnaXN0ZXJzWydcIiddID0gbmV3IFJlZ2lzdGVyKCk7XG4gICAgICByZWdpc3RlcnNbJy4nXSA9IG5ldyBSZWdpc3RlcigpO1xuICAgICAgcmVnaXN0ZXJzWyc6J10gPSBuZXcgUmVnaXN0ZXIoKTtcbiAgICAgIHJlZ2lzdGVyc1snLyddID0gbmV3IFJlZ2lzdGVyKCk7XG4gICAgICByZWdpc3RlcnNbJysnXSA9IG5ldyBSZWdpc3RlcigpO1xuICAgIH1cbiAgICBSZWdpc3RlckNvbnRyb2xsZXIucHJvdG90eXBlID0ge1xuICAgICAgcHVzaFRleHQ6IGZ1bmN0aW9uKHJlZ2lzdGVyTmFtZSwgb3BlcmF0b3IsIHRleHQsIGxpbmV3aXNlLCBibG9ja3dpc2UpIHtcbiAgICAgICAgLy8gVGhlIGJsYWNrIGhvbGUgcmVnaXN0ZXIsIFwiXywgbWVhbnMgZGVsZXRlL3lhbmsgdG8gbm93aGVyZS5cbiAgICAgICAgaWYgKHJlZ2lzdGVyTmFtZSA9PT0gJ18nKSByZXR1cm47XG4gICAgICAgIGlmIChsaW5ld2lzZSAmJiB0ZXh0LmNoYXJBdCh0ZXh0Lmxlbmd0aCAtIDEpICE9PSAnXFxuJyl7XG4gICAgICAgICAgdGV4dCArPSAnXFxuJztcbiAgICAgICAgfVxuICAgICAgICAvLyBMb3dlcmNhc2UgYW5kIHVwcGVyY2FzZSByZWdpc3RlcnMgcmVmZXIgdG8gdGhlIHNhbWUgcmVnaXN0ZXIuXG4gICAgICAgIC8vIFVwcGVyY2FzZSBqdXN0IG1lYW5zIGFwcGVuZC5cbiAgICAgICAgdmFyIHJlZ2lzdGVyID0gdGhpcy5pc1ZhbGlkUmVnaXN0ZXIocmVnaXN0ZXJOYW1lKSA/XG4gICAgICAgICAgICB0aGlzLmdldFJlZ2lzdGVyKHJlZ2lzdGVyTmFtZSkgOiBudWxsO1xuICAgICAgICAvLyBpZiBubyByZWdpc3Rlci9hbiBpbnZhbGlkIHJlZ2lzdGVyIHdhcyBzcGVjaWZpZWQsIHRoaW5ncyBnbyB0byB0aGVcbiAgICAgICAgLy8gZGVmYXVsdCByZWdpc3RlcnNcbiAgICAgICAgaWYgKCFyZWdpc3Rlcikge1xuICAgICAgICAgIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgJ3lhbmsnOlxuICAgICAgICAgICAgICAvLyBUaGUgMCByZWdpc3RlciBjb250YWlucyB0aGUgdGV4dCBmcm9tIHRoZSBtb3N0IHJlY2VudCB5YW5rLlxuICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyc1snMCddID0gbmV3IFJlZ2lzdGVyKHRleHQsIGxpbmV3aXNlLCBibG9ja3dpc2UpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgICBjYXNlICdjaGFuZ2UnOlxuICAgICAgICAgICAgICBpZiAodGV4dC5pbmRleE9mKCdcXG4nKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vIERlbGV0ZSBsZXNzIHRoYW4gMSBsaW5lLiBVcGRhdGUgdGhlIHNtYWxsIGRlbGV0ZSByZWdpc3Rlci5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyc1snLSddID0gbmV3IFJlZ2lzdGVyKHRleHQsIGxpbmV3aXNlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBTaGlmdCBkb3duIHRoZSBjb250ZW50cyBvZiB0aGUgbnVtYmVyZWQgcmVnaXN0ZXJzIGFuZCBwdXQgdGhlXG4gICAgICAgICAgICAgICAgLy8gZGVsZXRlZCB0ZXh0IGludG8gcmVnaXN0ZXIgMS5cbiAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0TnVtZXJpY1JlZ2lzdGVyc18oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyc1snMSddID0gbmV3IFJlZ2lzdGVyKHRleHQsIGxpbmV3aXNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSB1bm5hbWVkIHJlZ2lzdGVyIGlzIHNldCB0byB3aGF0IGp1c3QgaGFwcGVuZWRcbiAgICAgICAgICB0aGlzLnVubmFtZWRSZWdpc3Rlci5zZXRUZXh0KHRleHQsIGxpbmV3aXNlLCBibG9ja3dpc2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHdlJ3ZlIGdvdHRlbiB0byB0aGlzIHBvaW50LCB3ZSd2ZSBhY3R1YWxseSBzcGVjaWZpZWQgYSByZWdpc3RlclxuICAgICAgICB2YXIgYXBwZW5kID0gaXNVcHBlckNhc2UocmVnaXN0ZXJOYW1lKTtcbiAgICAgICAgaWYgKGFwcGVuZCkge1xuICAgICAgICAgIHJlZ2lzdGVyLnB1c2hUZXh0KHRleHQsIGxpbmV3aXNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWdpc3Rlci5zZXRUZXh0KHRleHQsIGxpbmV3aXNlLCBibG9ja3dpc2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWdpc3Rlck5hbWUgPT09ICcrJyAmJiB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgIHR5cGVvZiBuYXZpZ2F0b3IuY2xpcGJvYXJkICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgIHR5cGVvZiBuYXZpZ2F0b3IuY2xpcGJvYXJkLnJlYWRUZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIHVubmFtZWQgcmVnaXN0ZXIgYWx3YXlzIGhhcyB0aGUgc2FtZSB2YWx1ZSBhcyB0aGUgbGFzdCB1c2VkXG4gICAgICAgIC8vIHJlZ2lzdGVyLlxuICAgICAgICB0aGlzLnVubmFtZWRSZWdpc3Rlci5zZXRUZXh0KHJlZ2lzdGVyLnRvU3RyaW5nKCksIGxpbmV3aXNlKTtcbiAgICAgIH0sXG4gICAgICAvLyBHZXRzIHRoZSByZWdpc3RlciBuYW1lZCBAbmFtZS4gIElmIG9uZSBvZiBAbmFtZSBkb2Vzbid0IGFscmVhZHkgZXhpc3QsXG4gICAgICAvLyBjcmVhdGUgaXQuICBJZiBAbmFtZSBpcyBpbnZhbGlkLCByZXR1cm4gdGhlIHVubmFtZWRSZWdpc3Rlci5cbiAgICAgIGdldFJlZ2lzdGVyOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkUmVnaXN0ZXIobmFtZSkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy51bm5hbWVkUmVnaXN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKCF0aGlzLnJlZ2lzdGVyc1tuYW1lXSkge1xuICAgICAgICAgIHRoaXMucmVnaXN0ZXJzW25hbWVdID0gbmV3IFJlZ2lzdGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJzW25hbWVdO1xuICAgICAgfSxcbiAgICAgIGlzVmFsaWRSZWdpc3RlcjogZnVuY3Rpb24obmFtZSkge1xuICAgICAgICByZXR1cm4gbmFtZSAmJiAoaW5BcnJheShuYW1lLCB2YWxpZFJlZ2lzdGVycykgfHwgbGF0aW5DaGFyUmVnZXgudGVzdChuYW1lKSk7XG4gICAgICB9LFxuICAgICAgc2hpZnROdW1lcmljUmVnaXN0ZXJzXzogZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSA5OyBpID49IDI7IGktLSkge1xuICAgICAgICAgIHRoaXMucmVnaXN0ZXJzW2ldID0gdGhpcy5nZXRSZWdpc3RlcignJyArIChpIC0gMSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBmdW5jdGlvbiBIaXN0b3J5Q29udHJvbGxlcigpIHtcbiAgICAgICAgdGhpcy5oaXN0b3J5QnVmZmVyID0gW107XG4gICAgICAgIHRoaXMuaXRlcmF0b3IgPSAwO1xuICAgICAgICB0aGlzLmluaXRpYWxQcmVmaXggPSBudWxsO1xuICAgIH1cbiAgICBIaXN0b3J5Q29udHJvbGxlci5wcm90b3R5cGUgPSB7XG4gICAgICAvLyB0aGUgaW5wdXQgYXJndW1lbnQgaGVyZSBhY3RzIGEgdXNlciBlbnRlcmVkIHByZWZpeCBmb3IgYSBzbWFsbCB0aW1lXG4gICAgICAvLyB1bnRpbCB3ZSBzdGFydCBhdXRvY29tcGxldGlvbiBpbiB3aGljaCBjYXNlIGl0IGlzIHRoZSBhdXRvY29tcGxldGVkLlxuICAgICAgbmV4dE1hdGNoOiBmdW5jdGlvbiAoaW5wdXQsIHVwKSB7XG4gICAgICAgIHZhciBoaXN0b3J5QnVmZmVyID0gdGhpcy5oaXN0b3J5QnVmZmVyO1xuICAgICAgICB2YXIgZGlyID0gdXAgPyAtMSA6IDE7XG4gICAgICAgIGlmICh0aGlzLmluaXRpYWxQcmVmaXggPT09IG51bGwpIHRoaXMuaW5pdGlhbFByZWZpeCA9IGlucHV0O1xuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5pdGVyYXRvciArIGRpcjsgdXAgPyBpID49IDAgOiBpIDwgaGlzdG9yeUJ1ZmZlci5sZW5ndGg7IGkrPSBkaXIpIHtcbiAgICAgICAgICB2YXIgZWxlbWVudCA9IGhpc3RvcnlCdWZmZXJbaV07XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPD0gZWxlbWVudC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5pdGlhbFByZWZpeCA9PSBlbGVtZW50LnN1YnN0cmluZygwLCBqKSkge1xuICAgICAgICAgICAgICB0aGlzLml0ZXJhdG9yID0gaTtcbiAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHNob3VsZCByZXR1cm4gdGhlIHVzZXIgaW5wdXQgaW4gY2FzZSB3ZSByZWFjaCB0aGUgZW5kIG9mIGJ1ZmZlci5cbiAgICAgICAgaWYgKGkgPj0gaGlzdG9yeUJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgICAgICB0aGlzLml0ZXJhdG9yID0gaGlzdG9yeUJ1ZmZlci5sZW5ndGg7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuaW5pdGlhbFByZWZpeDtcbiAgICAgICAgfVxuICAgICAgICAvLyByZXR1cm4gdGhlIGxhc3QgYXV0b2NvbXBsZXRlZCBxdWVyeSBvciBleENvbW1hbmQgYXMgaXQgaXMuXG4gICAgICAgIGlmIChpIDwgMCApIHJldHVybiBpbnB1dDtcbiAgICAgIH0sXG4gICAgICBwdXNoSW5wdXQ6IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuaGlzdG9yeUJ1ZmZlci5pbmRleE9mKGlucHV0KTtcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHRoaXMuaGlzdG9yeUJ1ZmZlci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICBpZiAoaW5wdXQubGVuZ3RoKSB0aGlzLmhpc3RvcnlCdWZmZXIucHVzaChpbnB1dCk7XG4gICAgICB9LFxuICAgICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmluaXRpYWxQcmVmaXggPSBudWxsO1xuICAgICAgICB0aGlzLml0ZXJhdG9yID0gdGhpcy5oaXN0b3J5QnVmZmVyLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBjb21tYW5kRGlzcGF0Y2hlciA9IHtcbiAgICAgIG1hdGNoQ29tbWFuZDogZnVuY3Rpb24oa2V5cywga2V5TWFwLCBpbnB1dFN0YXRlLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciBtYXRjaGVzID0gY29tbWFuZE1hdGNoZXMoa2V5cywga2V5TWFwLCBjb250ZXh0LCBpbnB1dFN0YXRlKTtcbiAgICAgICAgaWYgKCFtYXRjaGVzLmZ1bGwgJiYgIW1hdGNoZXMucGFydGlhbCkge1xuICAgICAgICAgIHJldHVybiB7dHlwZTogJ25vbmUnfTtcbiAgICAgICAgfSBlbHNlIGlmICghbWF0Y2hlcy5mdWxsICYmIG1hdGNoZXMucGFydGlhbCkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAncGFydGlhbCcsXG4gICAgICAgICAgICBleHBlY3RMaXRlcmFsTmV4dDogbWF0Y2hlcy5wYXJ0aWFsLmxlbmd0aCA9PSAxICYmIG1hdGNoZXMucGFydGlhbFswXS5rZXlzLnNsaWNlKC0xMSkgPT0gJzxjaGFyYWN0ZXI+JyAvLyBsYW5nbWFwIGxpdGVyYWwgbG9naWNcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGJlc3RNYXRjaDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXRjaGVzLmZ1bGwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBtYXRjaGVzLmZ1bGxbaV07XG4gICAgICAgICAgaWYgKCFiZXN0TWF0Y2gpIHtcbiAgICAgICAgICAgIGJlc3RNYXRjaCA9IG1hdGNoO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYmVzdE1hdGNoLmtleXMuc2xpY2UoLTExKSA9PSAnPGNoYXJhY3Rlcj4nIHx8IGJlc3RNYXRjaC5rZXlzLnNsaWNlKC0xMCkgPT0gJzxyZWdpc3Rlcj4nKSB7XG4gICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGxhc3RDaGFyKGtleXMpO1xuICAgICAgICAgIGlmICghY2hhcmFjdGVyIHx8IGNoYXJhY3Rlci5sZW5ndGggPiAxKSByZXR1cm4ge3R5cGU6ICdjbGVhcid9O1xuICAgICAgICAgIGlucHV0U3RhdGUuc2VsZWN0ZWRDaGFyYWN0ZXIgPSBjaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt0eXBlOiAnZnVsbCcsIGNvbW1hbmQ6IGJlc3RNYXRjaH07XG4gICAgICB9LFxuICAgICAgcHJvY2Vzc0NvbW1hbmQ6IGZ1bmN0aW9uKGNtLCB2aW0sIGNvbW1hbmQpIHtcbiAgICAgICAgdmltLmlucHV0U3RhdGUucmVwZWF0T3ZlcnJpZGUgPSBjb21tYW5kLnJlcGVhdE92ZXJyaWRlO1xuICAgICAgICBzd2l0Y2ggKGNvbW1hbmQudHlwZSkge1xuICAgICAgICAgIGNhc2UgJ21vdGlvbic6XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NNb3Rpb24oY20sIHZpbSwgY29tbWFuZCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdvcGVyYXRvcic6XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NPcGVyYXRvcihjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ29wZXJhdG9yTW90aW9uJzpcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc09wZXJhdG9yTW90aW9uKGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYWN0aW9uJzpcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0FjdGlvbihjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NlYXJjaCc6XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NTZWFyY2goY20sIHZpbSwgY29tbWFuZCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdleCc6XG4gICAgICAgICAgY2FzZSAna2V5VG9FeCc6XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NFeChjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHByb2Nlc3NNb3Rpb246IGZ1bmN0aW9uKGNtLCB2aW0sIGNvbW1hbmQpIHtcbiAgICAgICAgdmltLmlucHV0U3RhdGUubW90aW9uID0gY29tbWFuZC5tb3Rpb247XG4gICAgICAgIHZpbS5pbnB1dFN0YXRlLm1vdGlvbkFyZ3MgPSBjb3B5QXJncyhjb21tYW5kLm1vdGlvbkFyZ3MpO1xuICAgICAgICB0aGlzLmV2YWxJbnB1dChjbSwgdmltKTtcbiAgICAgIH0sXG4gICAgICBwcm9jZXNzT3BlcmF0b3I6IGZ1bmN0aW9uKGNtLCB2aW0sIGNvbW1hbmQpIHtcbiAgICAgICAgdmFyIGlucHV0U3RhdGUgPSB2aW0uaW5wdXRTdGF0ZTtcbiAgICAgICAgaWYgKGlucHV0U3RhdGUub3BlcmF0b3IpIHtcbiAgICAgICAgICBpZiAoaW5wdXRTdGF0ZS5vcGVyYXRvciA9PSBjb21tYW5kLm9wZXJhdG9yKSB7XG4gICAgICAgICAgICAvLyBUeXBpbmcgYW4gb3BlcmF0b3IgdHdpY2UgbGlrZSAnZGQnIG1ha2VzIHRoZSBvcGVyYXRvciBvcGVyYXRlXG4gICAgICAgICAgICAvLyBsaW5ld2lzZVxuICAgICAgICAgICAgaW5wdXRTdGF0ZS5tb3Rpb24gPSAnZXhwYW5kVG9MaW5lJztcbiAgICAgICAgICAgIGlucHV0U3RhdGUubW90aW9uQXJncyA9IHsgbGluZXdpc2U6IHRydWUgfTtcbiAgICAgICAgICAgIHRoaXMuZXZhbElucHV0KGNtLCB2aW0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAyIGRpZmZlcmVudCBvcGVyYXRvcnMgaW4gYSByb3cgZG9lc24ndCBtYWtlIHNlbnNlLlxuICAgICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaW5wdXRTdGF0ZS5vcGVyYXRvciA9IGNvbW1hbmQub3BlcmF0b3I7XG4gICAgICAgIGlucHV0U3RhdGUub3BlcmF0b3JBcmdzID0gY29weUFyZ3MoY29tbWFuZC5vcGVyYXRvckFyZ3MpO1xuICAgICAgICBpZiAoY29tbWFuZC5rZXlzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBpbnB1dFN0YXRlLm9wZXJhdG9yU2hvcnRjdXQgPSBjb21tYW5kLmtleXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbW1hbmQuZXhpdFZpc3VhbEJsb2NrKSB7XG4gICAgICAgICAgICB2aW0udmlzdWFsQmxvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIHVwZGF0ZUNtU2VsZWN0aW9uKGNtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAvLyBPcGVyYXRpbmcgb24gYSBzZWxlY3Rpb24gaW4gdmlzdWFsIG1vZGUuIFdlIGRvbid0IG5lZWQgYSBtb3Rpb24uXG4gICAgICAgICAgdGhpcy5ldmFsSW5wdXQoY20sIHZpbSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwcm9jZXNzT3BlcmF0b3JNb3Rpb246IGZ1bmN0aW9uKGNtLCB2aW0sIGNvbW1hbmQpIHtcbiAgICAgICAgdmFyIHZpc3VhbE1vZGUgPSB2aW0udmlzdWFsTW9kZTtcbiAgICAgICAgdmFyIG9wZXJhdG9yTW90aW9uQXJncyA9IGNvcHlBcmdzKGNvbW1hbmQub3BlcmF0b3JNb3Rpb25BcmdzKTtcbiAgICAgICAgaWYgKG9wZXJhdG9yTW90aW9uQXJncykge1xuICAgICAgICAgIC8vIE9wZXJhdG9yIG1vdGlvbnMgbWF5IGhhdmUgc3BlY2lhbCBiZWhhdmlvciBpbiB2aXN1YWwgbW9kZS5cbiAgICAgICAgICBpZiAodmlzdWFsTW9kZSAmJiBvcGVyYXRvck1vdGlvbkFyZ3MudmlzdWFsTGluZSkge1xuICAgICAgICAgICAgdmltLnZpc3VhbExpbmUgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb2Nlc3NPcGVyYXRvcihjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgaWYgKCF2aXN1YWxNb2RlKSB7XG4gICAgICAgICAgdGhpcy5wcm9jZXNzTW90aW9uKGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvY2Vzc0FjdGlvbjogZnVuY3Rpb24oY20sIHZpbSwgY29tbWFuZCkge1xuICAgICAgICB2YXIgaW5wdXRTdGF0ZSA9IHZpbS5pbnB1dFN0YXRlO1xuICAgICAgICB2YXIgcmVwZWF0ID0gaW5wdXRTdGF0ZS5nZXRSZXBlYXQoKTtcbiAgICAgICAgdmFyIHJlcGVhdElzRXhwbGljaXQgPSAhIXJlcGVhdDtcbiAgICAgICAgdmFyIGFjdGlvbkFyZ3MgPSBjb3B5QXJncyhjb21tYW5kLmFjdGlvbkFyZ3MpIHx8IHt9O1xuICAgICAgICBpZiAoaW5wdXRTdGF0ZS5zZWxlY3RlZENoYXJhY3Rlcikge1xuICAgICAgICAgIGFjdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXIgPSBpbnB1dFN0YXRlLnNlbGVjdGVkQ2hhcmFjdGVyO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFjdGlvbnMgbWF5IG9yIG1heSBub3QgaGF2ZSBtb3Rpb25zIGFuZCBvcGVyYXRvcnMuIERvIHRoZXNlIGZpcnN0LlxuICAgICAgICBpZiAoY29tbWFuZC5vcGVyYXRvcikge1xuICAgICAgICAgIHRoaXMucHJvY2Vzc09wZXJhdG9yKGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb21tYW5kLm1vdGlvbikge1xuICAgICAgICAgIHRoaXMucHJvY2Vzc01vdGlvbihjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tbWFuZC5tb3Rpb24gfHwgY29tbWFuZC5vcGVyYXRvcikge1xuICAgICAgICAgIHRoaXMuZXZhbElucHV0KGNtLCB2aW0pO1xuICAgICAgICB9XG4gICAgICAgIGFjdGlvbkFyZ3MucmVwZWF0ID0gcmVwZWF0IHx8IDE7XG4gICAgICAgIGFjdGlvbkFyZ3MucmVwZWF0SXNFeHBsaWNpdCA9IHJlcGVhdElzRXhwbGljaXQ7XG4gICAgICAgIGFjdGlvbkFyZ3MucmVnaXN0ZXJOYW1lID0gaW5wdXRTdGF0ZS5yZWdpc3Rlck5hbWU7XG4gICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgIHZpbS5sYXN0TW90aW9uID0gbnVsbDtcbiAgICAgICAgaWYgKGNvbW1hbmQuaXNFZGl0KSB7XG4gICAgICAgICAgdGhpcy5yZWNvcmRMYXN0RWRpdCh2aW0sIGlucHV0U3RhdGUsIGNvbW1hbmQpO1xuICAgICAgICB9XG4gICAgICAgIGFjdGlvbnNbY29tbWFuZC5hY3Rpb25dKGNtLCBhY3Rpb25BcmdzLCB2aW0pO1xuICAgICAgfSxcbiAgICAgIHByb2Nlc3NTZWFyY2g6IGZ1bmN0aW9uKGNtLCB2aW0sIGNvbW1hbmQpIHtcbiAgICAgICAgaWYgKCFjbS5nZXRTZWFyY2hDdXJzb3IpIHtcbiAgICAgICAgICAvLyBTZWFyY2ggZGVwZW5kcyBvbiBTZWFyY2hDdXJzb3IuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmb3J3YXJkID0gY29tbWFuZC5zZWFyY2hBcmdzLmZvcndhcmQ7XG4gICAgICAgIHZhciB3aG9sZVdvcmRPbmx5ID0gY29tbWFuZC5zZWFyY2hBcmdzLndob2xlV29yZE9ubHk7XG4gICAgICAgIGdldFNlYXJjaFN0YXRlKGNtKS5zZXRSZXZlcnNlZCghZm9yd2FyZCk7XG4gICAgICAgIHZhciBwcm9tcHRQcmVmaXggPSAoZm9yd2FyZCkgPyAnLycgOiAnPyc7XG4gICAgICAgIHZhciBvcmlnaW5hbFF1ZXJ5ID0gZ2V0U2VhcmNoU3RhdGUoY20pLmdldFF1ZXJ5KCk7XG4gICAgICAgIHZhciBvcmlnaW5hbFNjcm9sbFBvcyA9IGNtLmdldFNjcm9sbEluZm8oKTtcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUXVlcnkocXVlcnksIGlnbm9yZUNhc2UsIHNtYXJ0Q2FzZSkge1xuICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLnNlYXJjaEhpc3RvcnlDb250cm9sbGVyLnB1c2hJbnB1dChxdWVyeSk7XG4gICAgICAgICAgdmltR2xvYmFsU3RhdGUuc2VhcmNoSGlzdG9yeUNvbnRyb2xsZXIucmVzZXQoKTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdXBkYXRlU2VhcmNoUXVlcnkoY20sIHF1ZXJ5LCBpZ25vcmVDYXNlLCBzbWFydENhc2UpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnSW52YWxpZCByZWdleDogJyArIHF1ZXJ5KTtcbiAgICAgICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbW1hbmREaXNwYXRjaGVyLnByb2Nlc3NNb3Rpb24oY20sIHZpbSwge1xuICAgICAgICAgICAgdHlwZTogJ21vdGlvbicsXG4gICAgICAgICAgICBtb3Rpb246ICdmaW5kTmV4dCcsXG4gICAgICAgICAgICBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHRvSnVtcGxpc3Q6IGNvbW1hbmQuc2VhcmNoQXJncy50b0p1bXBsaXN0IH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvblByb21wdENsb3NlKHF1ZXJ5KSB7XG4gICAgICAgICAgLy9hY2VfcGF0Y2ggY20uc2Nyb2xsVG8ob3JpZ2luYWxTY3JvbGxQb3MubGVmdCwgb3JpZ2luYWxTY3JvbGxQb3MudG9wKTtcbiAgICAgICAgICBoYW5kbGVRdWVyeShxdWVyeSwgdHJ1ZSAvKiogaWdub3JlQ2FzZSAqLywgdHJ1ZSAvKiogc21hcnRDYXNlICovKTtcbiAgICAgICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgICAgICBpZiAobWFjcm9Nb2RlU3RhdGUuaXNSZWNvcmRpbmcpIHtcbiAgICAgICAgICAgIGxvZ1NlYXJjaFF1ZXJ5KG1hY3JvTW9kZVN0YXRlLCBxdWVyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uUHJvbXB0S2V5VXAoZSwgcXVlcnksIGNsb3NlKSB7XG4gICAgICAgICAgdmFyIGtleU5hbWUgPSB2aW1LZXlGcm9tRXZlbnQoZSksIHVwLCBvZmZzZXQ7XG4gICAgICAgICAgaWYgKGtleU5hbWUgPT0gJzxVcD4nIHx8IGtleU5hbWUgPT0gJzxEb3duPicpIHtcbiAgICAgICAgICAgIHVwID0ga2V5TmFtZSA9PSAnPFVwPicgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICBvZmZzZXQgPSBlLnRhcmdldCA/IGUudGFyZ2V0LnNlbGVjdGlvbkVuZCA6IDA7XG4gICAgICAgICAgICBxdWVyeSA9IHZpbUdsb2JhbFN0YXRlLnNlYXJjaEhpc3RvcnlDb250cm9sbGVyLm5leHRNYXRjaChxdWVyeSwgdXApIHx8ICcnO1xuICAgICAgICAgICAgY2xvc2UocXVlcnkpO1xuICAgICAgICAgICAgaWYgKG9mZnNldCAmJiBlLnRhcmdldCkgZS50YXJnZXQuc2VsZWN0aW9uRW5kID0gZS50YXJnZXQuc2VsZWN0aW9uU3RhcnQgPSBNYXRoLm1pbihvZmZzZXQsIGUudGFyZ2V0LnZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChrZXlOYW1lICYmIGtleU5hbWUgIT0gJzxMZWZ0PicgJiYga2V5TmFtZSAhPSAnPFJpZ2h0PicpIHtcbiAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLnNlYXJjaEhpc3RvcnlDb250cm9sbGVyLnJlc2V0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBwYXJzZWRRdWVyeTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcGFyc2VkUXVlcnkgPSB1cGRhdGVTZWFyY2hRdWVyeShjbSwgcXVlcnksXG4gICAgICAgICAgICAgICAgdHJ1ZSAvKiogaWdub3JlQ2FzZSAqLywgdHJ1ZSAvKiogc21hcnRDYXNlICovKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBTd2FsbG93IGJhZCByZWdleGVzIGZvciBpbmNyZW1lbnRhbCBzZWFyY2guXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwYXJzZWRRdWVyeSkge1xuICAgICAgICAgICAgY20uc2Nyb2xsSW50b1ZpZXcoZmluZE5leHQoY20sICFmb3J3YXJkLCBwYXJzZWRRdWVyeSksIDMwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2xlYXJTZWFyY2hIaWdobGlnaHQoY20pO1xuICAgICAgICAgICAgY20uc2Nyb2xsVG8ob3JpZ2luYWxTY3JvbGxQb3MubGVmdCwgb3JpZ2luYWxTY3JvbGxQb3MudG9wKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25Qcm9tcHRLZXlEb3duKGUsIHF1ZXJ5LCBjbG9zZSkge1xuICAgICAgICAgIHZhciBrZXlOYW1lID0gdmltS2V5RnJvbUV2ZW50KGUpO1xuICAgICAgICAgIGlmIChrZXlOYW1lID09ICc8RXNjPicgfHwga2V5TmFtZSA9PSAnPEMtYz4nIHx8IGtleU5hbWUgPT0gJzxDLVs+JyB8fFxuICAgICAgICAgICAgICAoa2V5TmFtZSA9PSAnPEJTPicgJiYgcXVlcnkgPT0gJycpKSB7XG4gICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5zZWFyY2hIaXN0b3J5Q29udHJvbGxlci5wdXNoSW5wdXQocXVlcnkpO1xuICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUuc2VhcmNoSGlzdG9yeUNvbnRyb2xsZXIucmVzZXQoKTtcbiAgICAgICAgICAgIHVwZGF0ZVNlYXJjaFF1ZXJ5KGNtLCBvcmlnaW5hbFF1ZXJ5KTtcbiAgICAgICAgICAgIGNsZWFyU2VhcmNoSGlnaGxpZ2h0KGNtKTtcbiAgICAgICAgICAgIGNtLnNjcm9sbFRvKG9yaWdpbmFsU2Nyb2xsUG9zLmxlZnQsIG9yaWdpbmFsU2Nyb2xsUG9zLnRvcCk7XG4gICAgICAgICAgICBDb2RlTWlycm9yLmVfc3RvcChlKTtcbiAgICAgICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgY20uZm9jdXMoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGtleU5hbWUgPT0gJzxVcD4nIHx8IGtleU5hbWUgPT0gJzxEb3duPicpIHtcbiAgICAgICAgICAgIENvZGVNaXJyb3IuZV9zdG9wKGUpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoa2V5TmFtZSA9PSAnPEMtdT4nKSB7XG4gICAgICAgICAgICAvLyBDdHJsLVUgY2xlYXJzIGlucHV0LlxuICAgICAgICAgICAgQ29kZU1pcnJvci5lX3N0b3AoZSk7XG4gICAgICAgICAgICBjbG9zZSgnJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoY29tbWFuZC5zZWFyY2hBcmdzLnF1ZXJ5U3JjKSB7XG4gICAgICAgICAgY2FzZSAncHJvbXB0JzpcbiAgICAgICAgICAgIHZhciBtYWNyb01vZGVTdGF0ZSA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlO1xuICAgICAgICAgICAgaWYgKG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZykge1xuICAgICAgICAgICAgICB2YXIgcXVlcnkgPSBtYWNyb01vZGVTdGF0ZS5yZXBsYXlTZWFyY2hRdWVyaWVzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgIGhhbmRsZVF1ZXJ5KHF1ZXJ5LCB0cnVlIC8qKiBpZ25vcmVDYXNlICovLCBmYWxzZSAvKiogc21hcnRDYXNlICovKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNob3dQcm9tcHQoY20sIHtcbiAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6IG9uUHJvbXB0Q2xvc2UsXG4gICAgICAgICAgICAgICAgICBwcmVmaXg6IHByb21wdFByZWZpeCxcbiAgICAgICAgICAgICAgICAgIGRlc2M6ICcoSmF2YVNjcmlwdCByZWdleHApJyxcbiAgICAgICAgICAgICAgICAgIG9uS2V5VXA6IG9uUHJvbXB0S2V5VXAsXG4gICAgICAgICAgICAgICAgICBvbktleURvd246IG9uUHJvbXB0S2V5RG93blxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3dvcmRVbmRlckN1cnNvcic6XG4gICAgICAgICAgICB2YXIgd29yZCA9IGV4cGFuZFdvcmRVbmRlckN1cnNvcihjbSwge25vU3ltYm9sOiB0cnVlfSk7XG4gICAgICAgICAgICB2YXIgaXNLZXl3b3JkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICghd29yZCkge1xuICAgICAgICAgICAgICB3b3JkID0gZXhwYW5kV29yZFVuZGVyQ3Vyc29yKGNtLCB7bm9TeW1ib2w6IGZhbHNlfSk7XG4gICAgICAgICAgICAgIGlzS2V5d29yZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF3b3JkKSB7XG4gICAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnTm8gd29yZCB1bmRlciBjdXJzb3InKTtcbiAgICAgICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHF1ZXJ5ID0gY20uZ2V0TGluZSh3b3JkLnN0YXJ0LmxpbmUpLnN1YnN0cmluZyh3b3JkLnN0YXJ0LmNoLFxuICAgICAgICAgICAgICAgIHdvcmQuZW5kLmNoKTtcbiAgICAgICAgICAgIGlmIChpc0tleXdvcmQgJiYgd2hvbGVXb3JkT25seSkge1xuICAgICAgICAgICAgICAgIHF1ZXJ5ID0gJ1xcXFxiJyArIHF1ZXJ5ICsgJ1xcXFxiJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHF1ZXJ5ID0gZXNjYXBlUmVnZXgocXVlcnkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjYWNoZWRDdXJzb3IgaXMgdXNlZCB0byBzYXZlIHRoZSBvbGQgcG9zaXRpb24gb2YgdGhlIGN1cnNvclxuICAgICAgICAgICAgLy8gd2hlbiAqIG9yICMgY2F1c2VzIHZpbSB0byBzZWVrIGZvciB0aGUgbmVhcmVzdCB3b3JkIGFuZCBzaGlmdFxuICAgICAgICAgICAgLy8gdGhlIGN1cnNvciBiZWZvcmUgZW50ZXJpbmcgdGhlIG1vdGlvbi5cbiAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLmp1bXBMaXN0LmNhY2hlZEN1cnNvciA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKHdvcmQuc3RhcnQpO1xuXG4gICAgICAgICAgICBoYW5kbGVRdWVyeShxdWVyeSwgdHJ1ZSAvKiogaWdub3JlQ2FzZSAqLywgZmFsc2UgLyoqIHNtYXJ0Q2FzZSAqLyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHByb2Nlc3NFeDogZnVuY3Rpb24oY20sIHZpbSwgY29tbWFuZCkge1xuICAgICAgICBmdW5jdGlvbiBvblByb21wdENsb3NlKGlucHV0KSB7XG4gICAgICAgICAgLy8gR2l2ZSB0aGUgcHJvbXB0IHNvbWUgdGltZSB0byBjbG9zZSBzbyB0aGF0IGlmIHByb2Nlc3NDb21tYW5kIHNob3dzXG4gICAgICAgICAgLy8gYW4gZXJyb3IsIHRoZSBlbGVtZW50cyBkb24ndCBvdmVybGFwLlxuICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLmV4Q29tbWFuZEhpc3RvcnlDb250cm9sbGVyLnB1c2hJbnB1dChpbnB1dCk7XG4gICAgICAgICAgdmltR2xvYmFsU3RhdGUuZXhDb21tYW5kSGlzdG9yeUNvbnRyb2xsZXIucmVzZXQoKTtcbiAgICAgICAgICBleENvbW1hbmREaXNwYXRjaGVyLnByb2Nlc3NDb21tYW5kKGNtLCBpbnB1dCk7XG4gICAgICAgICAgaWYgKGNtLnN0YXRlLnZpbSkgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvblByb21wdEtleURvd24oZSwgaW5wdXQsIGNsb3NlKSB7XG4gICAgICAgICAgdmFyIGtleU5hbWUgPSB2aW1LZXlGcm9tRXZlbnQoZSksIHVwLCBvZmZzZXQ7XG4gICAgICAgICAgaWYgKGtleU5hbWUgPT0gJzxFc2M+JyB8fCBrZXlOYW1lID09ICc8Qy1jPicgfHwga2V5TmFtZSA9PSAnPEMtWz4nIHx8XG4gICAgICAgICAgICAgIChrZXlOYW1lID09ICc8QlM+JyAmJiBpbnB1dCA9PSAnJykpIHtcbiAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLmV4Q29tbWFuZEhpc3RvcnlDb250cm9sbGVyLnB1c2hJbnB1dChpbnB1dCk7XG4gICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5leENvbW1hbmRIaXN0b3J5Q29udHJvbGxlci5yZXNldCgpO1xuICAgICAgICAgICAgQ29kZU1pcnJvci5lX3N0b3AoZSk7XG4gICAgICAgICAgICBjbGVhcklucHV0U3RhdGUoY20pO1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICAgIGNtLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChrZXlOYW1lID09ICc8VXA+JyB8fCBrZXlOYW1lID09ICc8RG93bj4nKSB7XG4gICAgICAgICAgICBDb2RlTWlycm9yLmVfc3RvcChlKTtcbiAgICAgICAgICAgIHVwID0ga2V5TmFtZSA9PSAnPFVwPicgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICBvZmZzZXQgPSBlLnRhcmdldCA/IGUudGFyZ2V0LnNlbGVjdGlvbkVuZCA6IDA7XG4gICAgICAgICAgICBpbnB1dCA9IHZpbUdsb2JhbFN0YXRlLmV4Q29tbWFuZEhpc3RvcnlDb250cm9sbGVyLm5leHRNYXRjaChpbnB1dCwgdXApIHx8ICcnO1xuICAgICAgICAgICAgY2xvc2UoaW5wdXQpO1xuICAgICAgICAgICAgaWYgKG9mZnNldCAmJiBlLnRhcmdldCkgZS50YXJnZXQuc2VsZWN0aW9uRW5kID0gZS50YXJnZXQuc2VsZWN0aW9uU3RhcnQgPSBNYXRoLm1pbihvZmZzZXQsIGUudGFyZ2V0LnZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChrZXlOYW1lID09ICc8Qy11PicpIHtcbiAgICAgICAgICAgIC8vIEN0cmwtVSBjbGVhcnMgaW5wdXQuXG4gICAgICAgICAgICBDb2RlTWlycm9yLmVfc3RvcChlKTtcbiAgICAgICAgICAgIGNsb3NlKCcnKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGtleU5hbWUgJiYga2V5TmFtZSAhPSAnPExlZnQ+JyAmJiBrZXlOYW1lICE9ICc8UmlnaHQ+Jykge1xuICAgICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5leENvbW1hbmRIaXN0b3J5Q29udHJvbGxlci5yZXNldCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tbWFuZC50eXBlID09ICdrZXlUb0V4Jykge1xuICAgICAgICAgIC8vIEhhbmRsZSB1c2VyIGRlZmluZWQgRXggdG8gRXggbWFwcGluZ3NcbiAgICAgICAgICBleENvbW1hbmREaXNwYXRjaGVyLnByb2Nlc3NDb21tYW5kKGNtLCBjb21tYW5kLmV4QXJncy5pbnB1dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICBzaG93UHJvbXB0KGNtLCB7IG9uQ2xvc2U6IG9uUHJvbXB0Q2xvc2UsIHByZWZpeDogJzonLCB2YWx1ZTogJ1xcJzwsXFwnPicsXG4gICAgICAgICAgICAgICAgb25LZXlEb3duOiBvblByb21wdEtleURvd24sIHNlbGVjdFZhbHVlT25PcGVuOiBmYWxzZX0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93UHJvbXB0KGNtLCB7IG9uQ2xvc2U6IG9uUHJvbXB0Q2xvc2UsIHByZWZpeDogJzonLFxuICAgICAgICAgICAgICAgIG9uS2V5RG93bjogb25Qcm9tcHRLZXlEb3dufSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXZhbElucHV0OiBmdW5jdGlvbihjbSwgdmltKSB7XG4gICAgICAgIC8vIElmIHRoZSBtb3Rpb24gY29tbWFuZCBpcyBzZXQsIGV4ZWN1dGUgYm90aCB0aGUgb3BlcmF0b3IgYW5kIG1vdGlvbi5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIHJldHVybi5cbiAgICAgICAgdmFyIGlucHV0U3RhdGUgPSB2aW0uaW5wdXRTdGF0ZTtcbiAgICAgICAgdmFyIG1vdGlvbiA9IGlucHV0U3RhdGUubW90aW9uO1xuICAgICAgICB2YXIgbW90aW9uQXJncyA9IGlucHV0U3RhdGUubW90aW9uQXJncyB8fCB7fTtcbiAgICAgICAgdmFyIG9wZXJhdG9yID0gaW5wdXRTdGF0ZS5vcGVyYXRvcjtcbiAgICAgICAgdmFyIG9wZXJhdG9yQXJncyA9IGlucHV0U3RhdGUub3BlcmF0b3JBcmdzIHx8IHt9O1xuICAgICAgICB2YXIgcmVnaXN0ZXJOYW1lID0gaW5wdXRTdGF0ZS5yZWdpc3Rlck5hbWU7XG4gICAgICAgIHZhciBzZWwgPSB2aW0uc2VsO1xuICAgICAgICAvLyBUT0RPOiBNYWtlIHN1cmUgY20gYW5kIHZpbSBzZWxlY3Rpb25zIGFyZSBpZGVudGljYWwgb3V0c2lkZSB2aXN1YWwgbW9kZS5cbiAgICAgICAgdmFyIG9yaWdIZWFkID0gY29weUN1cnNvcih2aW0udmlzdWFsTW9kZSA/IGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIHNlbC5oZWFkKTogY20uZ2V0Q3Vyc29yKCdoZWFkJykpO1xuICAgICAgICB2YXIgb3JpZ0FuY2hvciA9IGNvcHlDdXJzb3IodmltLnZpc3VhbE1vZGUgPyBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBzZWwuYW5jaG9yKSA6IGNtLmdldEN1cnNvcignYW5jaG9yJykpO1xuICAgICAgICB2YXIgb2xkSGVhZCA9IGNvcHlDdXJzb3Iob3JpZ0hlYWQpO1xuICAgICAgICB2YXIgb2xkQW5jaG9yID0gY29weUN1cnNvcihvcmlnQW5jaG9yKTtcbiAgICAgICAgdmFyIG5ld0hlYWQsIG5ld0FuY2hvcjtcbiAgICAgICAgdmFyIHJlcGVhdDtcbiAgICAgICAgaWYgKG9wZXJhdG9yKSB7XG4gICAgICAgICAgdGhpcy5yZWNvcmRMYXN0RWRpdCh2aW0sIGlucHV0U3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dFN0YXRlLnJlcGVhdE92ZXJyaWRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBJZiByZXBlYXRPdmVycmlkZSBpcyBzcGVjaWZpZWQsIHRoYXQgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIHRoZVxuICAgICAgICAgIC8vIGlucHV0IHN0YXRlJ3MgcmVwZWF0LiBVc2VkIGJ5IEV4IG1vZGUgYW5kIGNhbiBiZSB1c2VyIGRlZmluZWQuXG4gICAgICAgICAgcmVwZWF0ID0gaW5wdXRTdGF0ZS5yZXBlYXRPdmVycmlkZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXBlYXQgPSBpbnB1dFN0YXRlLmdldFJlcGVhdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXBlYXQgPiAwICYmIG1vdGlvbkFyZ3MuZXhwbGljaXRSZXBlYXQpIHtcbiAgICAgICAgICBtb3Rpb25BcmdzLnJlcGVhdElzRXhwbGljaXQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKG1vdGlvbkFyZ3Mubm9SZXBlYXQgfHxcbiAgICAgICAgICAgICghbW90aW9uQXJncy5leHBsaWNpdFJlcGVhdCAmJiByZXBlYXQgPT09IDApKSB7XG4gICAgICAgICAgcmVwZWF0ID0gMTtcbiAgICAgICAgICBtb3Rpb25BcmdzLnJlcGVhdElzRXhwbGljaXQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5wdXRTdGF0ZS5zZWxlY3RlZENoYXJhY3Rlcikge1xuICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGEgY2hhcmFjdGVyIGlucHV0LCBzdGljayBpdCBpbiBhbGwgb2YgdGhlIGFyZyBhcnJheXMuXG4gICAgICAgICAgbW90aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlciA9IG9wZXJhdG9yQXJncy5zZWxlY3RlZENoYXJhY3RlciA9XG4gICAgICAgICAgICAgIGlucHV0U3RhdGUuc2VsZWN0ZWRDaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgbW90aW9uQXJncy5yZXBlYXQgPSByZXBlYXQ7XG4gICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgIGlmIChtb3Rpb24pIHtcbiAgICAgICAgICB2YXIgbW90aW9uUmVzdWx0ID0gbW90aW9uc1ttb3Rpb25dKGNtLCBvcmlnSGVhZCwgbW90aW9uQXJncywgdmltLCBpbnB1dFN0YXRlKTtcbiAgICAgICAgICB2aW0ubGFzdE1vdGlvbiA9IG1vdGlvbnNbbW90aW9uXTtcbiAgICAgICAgICBpZiAoIW1vdGlvblJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobW90aW9uQXJncy50b0p1bXBsaXN0KSB7XG4gICAgICAgICAgICBpZiAoIW9wZXJhdG9yICYmIGNtLmFjZS5jdXJPcCAhPSBudWxsKVxuICAgICAgICAgICAgICBjbS5hY2UuY3VyT3AuY29tbWFuZC5zY3JvbGxJbnRvVmlldyA9IFwiY2VudGVyLWFuaW1hdGVcIjsgLy8gYWNlX3BhdGNoXG4gICAgICAgICAgICB2YXIganVtcExpc3QgPSB2aW1HbG9iYWxTdGF0ZS5qdW1wTGlzdDtcbiAgICAgICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IG1vdGlvbiBpcyAjIG9yICosIHVzZSBjYWNoZWRDdXJzb3JcbiAgICAgICAgICAgIHZhciBjYWNoZWRDdXJzb3IgPSBqdW1wTGlzdC5jYWNoZWRDdXJzb3I7XG4gICAgICAgICAgICBpZiAoY2FjaGVkQ3Vyc29yKSB7XG4gICAgICAgICAgICAgIHJlY29yZEp1bXBQb3NpdGlvbihjbSwgY2FjaGVkQ3Vyc29yLCBtb3Rpb25SZXN1bHQpO1xuICAgICAgICAgICAgICBkZWxldGUganVtcExpc3QuY2FjaGVkQ3Vyc29yO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVjb3JkSnVtcFBvc2l0aW9uKGNtLCBvcmlnSGVhZCwgbW90aW9uUmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1vdGlvblJlc3VsdCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBuZXdBbmNob3IgPSBtb3Rpb25SZXN1bHRbMF07XG4gICAgICAgICAgICBuZXdIZWFkID0gbW90aW9uUmVzdWx0WzFdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdIZWFkID0gbW90aW9uUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBUT0RPOiBIYW5kbGUgbnVsbCByZXR1cm5zIGZyb20gbW90aW9uIGNvbW1hbmRzIGJldHRlci5cbiAgICAgICAgICBpZiAoIW5ld0hlYWQpIHtcbiAgICAgICAgICAgIG5ld0hlYWQgPSBjb3B5Q3Vyc29yKG9yaWdIZWFkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICBpZiAoISh2aW0udmlzdWFsQmxvY2sgJiYgbmV3SGVhZC5jaCA9PT0gSW5maW5pdHkpKSB7XG4gICAgICAgICAgICAgIG5ld0hlYWQgPSBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBuZXdIZWFkLCBvbGRIZWFkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXdBbmNob3IpIHtcbiAgICAgICAgICAgICAgbmV3QW5jaG9yID0gY2xpcEN1cnNvclRvQ29udGVudChjbSwgbmV3QW5jaG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld0FuY2hvciA9IG5ld0FuY2hvciB8fCBvbGRBbmNob3I7XG4gICAgICAgICAgICBzZWwuYW5jaG9yID0gbmV3QW5jaG9yO1xuICAgICAgICAgICAgc2VsLmhlYWQgPSBuZXdIZWFkO1xuICAgICAgICAgICAgdXBkYXRlQ21TZWxlY3Rpb24oY20pO1xuICAgICAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCAnPCcsXG4gICAgICAgICAgICAgICAgY3Vyc29ySXNCZWZvcmUobmV3QW5jaG9yLCBuZXdIZWFkKSA/IG5ld0FuY2hvclxuICAgICAgICAgICAgICAgICAgICA6IG5ld0hlYWQpO1xuICAgICAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCAnPicsXG4gICAgICAgICAgICAgICAgY3Vyc29ySXNCZWZvcmUobmV3QW5jaG9yLCBuZXdIZWFkKSA/IG5ld0hlYWRcbiAgICAgICAgICAgICAgICAgICAgOiBuZXdBbmNob3IpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIW9wZXJhdG9yKSB7XG4gICAgICAgICAgICBpZiAoY20uYWNlLmN1ck9wKVxuICAgICAgICAgICAgICBjbS5hY2UuY3VyT3AudmltRGlhbG9nU2Nyb2xsID0gXCJjZW50ZXItYW5pbWF0ZVwiOyAvLyBhY2VfcGF0Y2hcbiAgICAgICAgICAgIG5ld0hlYWQgPSBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBuZXdIZWFkLCBvbGRIZWFkKTtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihuZXdIZWFkLmxpbmUsIG5ld0hlYWQuY2gpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3BlcmF0b3IpIHtcbiAgICAgICAgICBpZiAob3BlcmF0b3JBcmdzLmxhc3RTZWwpIHtcbiAgICAgICAgICAgIC8vIFJlcGxheWluZyBhIHZpc3VhbCBtb2RlIG9wZXJhdGlvblxuICAgICAgICAgICAgbmV3QW5jaG9yID0gb2xkQW5jaG9yO1xuICAgICAgICAgICAgdmFyIGxhc3RTZWwgPSBvcGVyYXRvckFyZ3MubGFzdFNlbDtcbiAgICAgICAgICAgIHZhciBsaW5lT2Zmc2V0ID0gTWF0aC5hYnMobGFzdFNlbC5oZWFkLmxpbmUgLSBsYXN0U2VsLmFuY2hvci5saW5lKTtcbiAgICAgICAgICAgIHZhciBjaE9mZnNldCA9IE1hdGguYWJzKGxhc3RTZWwuaGVhZC5jaCAtIGxhc3RTZWwuYW5jaG9yLmNoKTtcbiAgICAgICAgICAgIGlmIChsYXN0U2VsLnZpc3VhbExpbmUpIHtcbiAgICAgICAgICAgICAgLy8gTGluZXdpc2UgVmlzdWFsIG1vZGU6IFRoZSBzYW1lIG51bWJlciBvZiBsaW5lcy5cbiAgICAgICAgICAgICAgbmV3SGVhZCA9IG5ldyBQb3Mob2xkQW5jaG9yLmxpbmUgKyBsaW5lT2Zmc2V0LCBvbGRBbmNob3IuY2gpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0U2VsLnZpc3VhbEJsb2NrKSB7XG4gICAgICAgICAgICAgIC8vIEJsb2Nrd2lzZSBWaXN1YWwgbW9kZTogVGhlIHNhbWUgbnVtYmVyIG9mIGxpbmVzIGFuZCBjb2x1bW5zLlxuICAgICAgICAgICAgICBuZXdIZWFkID0gbmV3IFBvcyhvbGRBbmNob3IubGluZSArIGxpbmVPZmZzZXQsIG9sZEFuY2hvci5jaCArIGNoT2Zmc2V0KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGFzdFNlbC5oZWFkLmxpbmUgPT0gbGFzdFNlbC5hbmNob3IubGluZSkge1xuICAgICAgICAgICAgICAvLyBOb3JtYWwgVmlzdWFsIG1vZGUgd2l0aGluIG9uZSBsaW5lOiBUaGUgc2FtZSBudW1iZXIgb2YgY2hhcmFjdGVycy5cbiAgICAgICAgICAgICAgbmV3SGVhZCA9IG5ldyBQb3Mob2xkQW5jaG9yLmxpbmUsIG9sZEFuY2hvci5jaCArIGNoT2Zmc2V0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIE5vcm1hbCBWaXN1YWwgbW9kZSB3aXRoIHNldmVyYWwgbGluZXM6IFRoZSBzYW1lIG51bWJlciBvZiBsaW5lcywgaW4gdGhlXG4gICAgICAgICAgICAgIC8vIGxhc3QgbGluZSB0aGUgc2FtZSBudW1iZXIgb2YgY2hhcmFjdGVycyBhcyBpbiB0aGUgbGFzdCBsaW5lIHRoZSBsYXN0IHRpbWUuXG4gICAgICAgICAgICAgIG5ld0hlYWQgPSBuZXcgUG9zKG9sZEFuY2hvci5saW5lICsgbGluZU9mZnNldCwgb2xkQW5jaG9yLmNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZpbS52aXN1YWxNb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgIHZpbS52aXN1YWxMaW5lID0gbGFzdFNlbC52aXN1YWxMaW5lO1xuICAgICAgICAgICAgdmltLnZpc3VhbEJsb2NrID0gbGFzdFNlbC52aXN1YWxCbG9jaztcbiAgICAgICAgICAgIHNlbCA9IHZpbS5zZWwgPSB7XG4gICAgICAgICAgICAgIGFuY2hvcjogbmV3QW5jaG9yLFxuICAgICAgICAgICAgICBoZWFkOiBuZXdIZWFkXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdXBkYXRlQ21TZWxlY3Rpb24oY20pO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIG9wZXJhdG9yQXJncy5sYXN0U2VsID0ge1xuICAgICAgICAgICAgICBhbmNob3I6IGNvcHlDdXJzb3Ioc2VsLmFuY2hvciksXG4gICAgICAgICAgICAgIGhlYWQ6IGNvcHlDdXJzb3Ioc2VsLmhlYWQpLFxuICAgICAgICAgICAgICB2aXN1YWxCbG9jazogdmltLnZpc3VhbEJsb2NrLFxuICAgICAgICAgICAgICB2aXN1YWxMaW5lOiB2aW0udmlzdWFsTGluZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGN1clN0YXJ0LCBjdXJFbmQsIGxpbmV3aXNlLCBtb2RlO1xuICAgICAgICAgIHZhciBjbVNlbDtcbiAgICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIC8vIEluaXQgdmlzdWFsIG9wXG4gICAgICAgICAgICBjdXJTdGFydCA9IGN1cnNvck1pbihzZWwuaGVhZCwgc2VsLmFuY2hvcik7XG4gICAgICAgICAgICBjdXJFbmQgPSBjdXJzb3JNYXgoc2VsLmhlYWQsIHNlbC5hbmNob3IpO1xuICAgICAgICAgICAgbGluZXdpc2UgPSB2aW0udmlzdWFsTGluZSB8fCBvcGVyYXRvckFyZ3MubGluZXdpc2U7XG4gICAgICAgICAgICBtb2RlID0gdmltLnZpc3VhbEJsb2NrID8gJ2Jsb2NrJyA6XG4gICAgICAgICAgICAgICAgICAgbGluZXdpc2UgPyAnbGluZScgOlxuICAgICAgICAgICAgICAgICAgICdjaGFyJztcbiAgICAgICAgICAgIHZhciBuZXdQb3NpdGlvbnMgPSB1cGRhdGVTZWxlY3Rpb25Gb3JTdXJyb2dhdGVDaGFyYWN0ZXJzKGNtLCBjdXJTdGFydCwgY3VyRW5kKTtcbiAgICAgICAgICAgIGNtU2VsID0gbWFrZUNtU2VsZWN0aW9uKGNtLCB7XG4gICAgICAgICAgICAgIGFuY2hvcjogbmV3UG9zaXRpb25zLnN0YXJ0LFxuICAgICAgICAgICAgICBoZWFkOiBuZXdQb3NpdGlvbnMuZW5kXG4gICAgICAgICAgICB9LCBtb2RlKTtcbiAgICAgICAgICAgIGlmIChsaW5ld2lzZSkge1xuICAgICAgICAgICAgICB2YXIgcmFuZ2VzID0gY21TZWwucmFuZ2VzO1xuICAgICAgICAgICAgICBpZiAobW9kZSA9PSAnYmxvY2snKSB7XG4gICAgICAgICAgICAgICAgLy8gTGluZXdpc2Ugb3BlcmF0b3JzIGluIHZpc3VhbCBibG9jayBtb2RlIGV4dGVuZCB0byBlbmQgb2YgbGluZVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICByYW5nZXNbaV0uaGVhZC5jaCA9IGxpbmVMZW5ndGgoY20sIHJhbmdlc1tpXS5oZWFkLmxpbmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChtb2RlID09ICdsaW5lJykge1xuICAgICAgICAgICAgICAgIHJhbmdlc1swXS5oZWFkID0gbmV3IFBvcyhyYW5nZXNbMF0uaGVhZC5saW5lICsgMSwgMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSW5pdCBtb3Rpb24gb3BcbiAgICAgICAgICAgIGN1clN0YXJ0ID0gY29weUN1cnNvcihuZXdBbmNob3IgfHwgb2xkQW5jaG9yKTtcbiAgICAgICAgICAgIGN1ckVuZCA9IGNvcHlDdXJzb3IobmV3SGVhZCB8fCBvbGRIZWFkKTtcbiAgICAgICAgICAgIGlmIChjdXJzb3JJc0JlZm9yZShjdXJFbmQsIGN1clN0YXJ0KSkge1xuICAgICAgICAgICAgICB2YXIgdG1wID0gY3VyU3RhcnQ7XG4gICAgICAgICAgICAgIGN1clN0YXJ0ID0gY3VyRW5kO1xuICAgICAgICAgICAgICBjdXJFbmQgPSB0bXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaW5ld2lzZSA9IG1vdGlvbkFyZ3MubGluZXdpc2UgfHwgb3BlcmF0b3JBcmdzLmxpbmV3aXNlO1xuICAgICAgICAgICAgaWYgKGxpbmV3aXNlKSB7XG4gICAgICAgICAgICAgIC8vIEV4cGFuZCBzZWxlY3Rpb24gdG8gZW50aXJlIGxpbmUuXG4gICAgICAgICAgICAgIGV4cGFuZFNlbGVjdGlvblRvTGluZShjbSwgY3VyU3RhcnQsIGN1ckVuZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vdGlvbkFyZ3MuZm9yd2FyZCkge1xuICAgICAgICAgICAgICAvLyBDbGlwIHRvIHRyYWlsaW5nIG5ld2xpbmVzIG9ubHkgaWYgdGhlIG1vdGlvbiBnb2VzIGZvcndhcmQuXG4gICAgICAgICAgICAgIGNsaXBUb0xpbmUoY20sIGN1clN0YXJ0LCBjdXJFbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbW9kZSA9ICdjaGFyJztcbiAgICAgICAgICAgIHZhciBleGNsdXNpdmUgPSAhbW90aW9uQXJncy5pbmNsdXNpdmUgfHwgbGluZXdpc2U7XG4gICAgICAgICAgICB2YXIgbmV3UG9zaXRpb25zID0gdXBkYXRlU2VsZWN0aW9uRm9yU3Vycm9nYXRlQ2hhcmFjdGVycyhjbSwgY3VyU3RhcnQsIGN1ckVuZCk7XG4gICAgICAgICAgICBjbVNlbCA9IG1ha2VDbVNlbGVjdGlvbihjbSwge1xuICAgICAgICAgICAgICBhbmNob3I6IG5ld1Bvc2l0aW9ucy5zdGFydCxcbiAgICAgICAgICAgICAgaGVhZDogbmV3UG9zaXRpb25zLmVuZFxuICAgICAgICAgICAgfSwgbW9kZSwgZXhjbHVzaXZlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY20uc2V0U2VsZWN0aW9ucyhjbVNlbC5yYW5nZXMsIGNtU2VsLnByaW1hcnkpO1xuICAgICAgICAgIHZpbS5sYXN0TW90aW9uID0gbnVsbDtcbiAgICAgICAgICBvcGVyYXRvckFyZ3MucmVwZWF0ID0gcmVwZWF0OyAvLyBGb3IgaW5kZW50IGluIHZpc3VhbCBtb2RlLlxuICAgICAgICAgIG9wZXJhdG9yQXJncy5yZWdpc3Rlck5hbWUgPSByZWdpc3Rlck5hbWU7XG4gICAgICAgICAgLy8gS2VlcCB0cmFjayBvZiBsaW5ld2lzZSBhcyBpdCBhZmZlY3RzIGhvdyBwYXN0ZSBhbmQgY2hhbmdlIGJlaGF2ZS5cbiAgICAgICAgICBvcGVyYXRvckFyZ3MubGluZXdpc2UgPSBsaW5ld2lzZTtcbiAgICAgICAgICB2YXIgb3BlcmF0b3JNb3ZlVG8gPSBvcGVyYXRvcnNbb3BlcmF0b3JdKFxuICAgICAgICAgICAgY20sIG9wZXJhdG9yQXJncywgY21TZWwucmFuZ2VzLCBvbGRBbmNob3IsIG5ld0hlYWQpO1xuICAgICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgZXhpdFZpc3VhbE1vZGUoY20sIG9wZXJhdG9yTW92ZVRvICE9IG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAob3BlcmF0b3JNb3ZlVG8pIHtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihvcGVyYXRvck1vdmVUbyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVjb3JkTGFzdEVkaXQ6IGZ1bmN0aW9uKHZpbSwgaW5wdXRTdGF0ZSwgYWN0aW9uQ29tbWFuZCkge1xuICAgICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgICAgaWYgKG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZykgeyByZXR1cm47IH1cbiAgICAgICAgdmltLmxhc3RFZGl0SW5wdXRTdGF0ZSA9IGlucHV0U3RhdGU7XG4gICAgICAgIHZpbS5sYXN0RWRpdEFjdGlvbkNvbW1hbmQgPSBhY3Rpb25Db21tYW5kO1xuICAgICAgICBtYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXMuY2hhbmdlcyA9IFtdO1xuICAgICAgICBtYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXMuZXhwZWN0Q3Vyc29yQWN0aXZpdHlGb3JDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgbWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzLnZpc3VhbEJsb2NrID0gdmltLnZpc3VhbEJsb2NrID8gdmltLnNlbC5oZWFkLmxpbmUgLSB2aW0uc2VsLmFuY2hvci5saW5lIDogMDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogdHlwZWRlZiB7T2JqZWN0e2xpbmU6bnVtYmVyLGNoOm51bWJlcn19IEN1cnNvciBBbiBvYmplY3QgY29udGFpbmluZyB0aGVcbiAgICAgKiAgICAgcG9zaXRpb24gb2YgdGhlIGN1cnNvci5cbiAgICAgKi9cbiAgICAvLyBBbGwgb2YgdGhlIGZ1bmN0aW9ucyBiZWxvdyByZXR1cm4gQ3Vyc29yIG9iamVjdHMuXG4gICAgdmFyIG1vdGlvbnMgPSB7XG4gICAgICBtb3ZlVG9Ub3BMaW5lOiBmdW5jdGlvbihjbSwgX2hlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBnZXRVc2VyVmlzaWJsZUxpbmVzKGNtKS50b3AgKyBtb3Rpb25BcmdzLnJlcGVhdCAtMTtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MobGluZSwgZmluZEZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbS5nZXRMaW5lKGxpbmUpKSk7XG4gICAgICB9LFxuICAgICAgbW92ZVRvTWlkZGxlTGluZTogZnVuY3Rpb24oY20pIHtcbiAgICAgICAgdmFyIHJhbmdlID0gZ2V0VXNlclZpc2libGVMaW5lcyhjbSk7XG4gICAgICAgIHZhciBsaW5lID0gTWF0aC5mbG9vcigocmFuZ2UudG9wICsgcmFuZ2UuYm90dG9tKSAqIDAuNSk7XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGxpbmUsIGZpbmRGaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20uZ2V0TGluZShsaW5lKSkpO1xuICAgICAgfSxcbiAgICAgIG1vdmVUb0JvdHRvbUxpbmU6IGZ1bmN0aW9uKGNtLCBfaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgbGluZSA9IGdldFVzZXJWaXNpYmxlTGluZXMoY20pLmJvdHRvbSAtIG1vdGlvbkFyZ3MucmVwZWF0ICsxO1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhsaW5lLCBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUobGluZSkpKTtcbiAgICAgIH0sXG4gICAgICBleHBhbmRUb0xpbmU6IGZ1bmN0aW9uKF9jbSwgaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICAvLyBFeHBhbmRzIGZvcndhcmQgdG8gZW5kIG9mIGxpbmUsIGFuZCB0aGVuIHRvIG5leHQgbGluZSBpZiByZXBlYXQgaXNcbiAgICAgICAgLy8gPjEuIERvZXMgbm90IGhhbmRsZSBiYWNrd2FyZCBtb3Rpb24hXG4gICAgICAgIHZhciBjdXIgPSBoZWFkO1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhjdXIubGluZSArIG1vdGlvbkFyZ3MucmVwZWF0IC0gMSwgSW5maW5pdHkpO1xuICAgICAgfSxcbiAgICAgIGZpbmROZXh0OiBmdW5jdGlvbihjbSwgX2hlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gZ2V0U2VhcmNoU3RhdGUoY20pO1xuICAgICAgICB2YXIgcXVlcnkgPSBzdGF0ZS5nZXRRdWVyeSgpO1xuICAgICAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmV2ID0gIW1vdGlvbkFyZ3MuZm9yd2FyZDtcbiAgICAgICAgLy8gSWYgc2VhcmNoIGlzIGluaXRpYXRlZCB3aXRoID8gaW5zdGVhZCBvZiAvLCBuZWdhdGUgZGlyZWN0aW9uLlxuICAgICAgICBwcmV2ID0gKHN0YXRlLmlzUmV2ZXJzZWQoKSkgPyAhcHJldiA6IHByZXY7XG4gICAgICAgIGhpZ2hsaWdodFNlYXJjaE1hdGNoZXMoY20sIHF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIGZpbmROZXh0KGNtLCBwcmV2LyoqIHByZXYgKi8sIHF1ZXJ5LCBtb3Rpb25BcmdzLnJlcGVhdCk7XG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiBGaW5kIGFuZCBzZWxlY3QgdGhlIG5leHQgb2NjdXJyZW5jZSBvZiB0aGUgc2VhcmNoIHF1ZXJ5LiBJZiB0aGUgY3Vyc29yIGlzIGN1cnJlbnRseVxuICAgICAgICogd2l0aGluIGEgbWF0Y2gsIHRoZW4gZmluZCBhbmQgc2VsZWN0IHRoZSBjdXJyZW50IG1hdGNoLiBPdGhlcndpc2UsIGZpbmQgdGhlIG5leHQgb2NjdXJyZW5jZSBpbiB0aGVcbiAgICAgICAqIGFwcHJvcHJpYXRlIGRpcmVjdGlvbi5cbiAgICAgICAqXG4gICAgICAgKiBUaGlzIGRpZmZlcnMgZnJvbSBgZmluZE5leHRgIGluIHRoZSBmb2xsb3dpbmcgd2F5czpcbiAgICAgICAqXG4gICAgICAgKiAxLiBJbnN0ZWFkIG9mIG9ubHkgcmV0dXJuaW5nIHRoZSBcImZyb21cIiwgdGhpcyByZXR1cm5zIGEgXCJmcm9tXCIsIFwidG9cIiByYW5nZS5cbiAgICAgICAqIDIuIElmIHRoZSBjdXJzb3IgaXMgY3VycmVudGx5IGluc2lkZSBhIHNlYXJjaCBtYXRjaCwgdGhpcyBzZWxlY3RzIHRoZSBjdXJyZW50IG1hdGNoXG4gICAgICAgKiAgICBpbnN0ZWFkIG9mIHRoZSBuZXh0IG1hdGNoLlxuICAgICAgICogMy4gSWYgdGhlcmUgaXMgbm8gYXNzb2NpYXRlZCBvcGVyYXRvciwgdGhpcyB3aWxsIHR1cm4gb24gdmlzdWFsIG1vZGUuXG4gICAgICAgKi9cbiAgICAgIGZpbmRBbmRTZWxlY3ROZXh0SW5jbHVzaXZlOiBmdW5jdGlvbihjbSwgX2hlYWQsIG1vdGlvbkFyZ3MsIHZpbSwgcHJldklucHV0U3RhdGUpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gZ2V0U2VhcmNoU3RhdGUoY20pO1xuICAgICAgICB2YXIgcXVlcnkgPSBzdGF0ZS5nZXRRdWVyeSgpO1xuXG4gICAgICAgIGlmICghcXVlcnkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcHJldiA9ICFtb3Rpb25BcmdzLmZvcndhcmQ7XG4gICAgICAgIHByZXYgPSAoc3RhdGUuaXNSZXZlcnNlZCgpKSA/ICFwcmV2IDogcHJldjtcblxuICAgICAgICAvLyBuZXh0OiBbZnJvbSwgdG9dIHwgbnVsbFxuICAgICAgICB2YXIgbmV4dCA9IGZpbmROZXh0RnJvbUFuZFRvSW5jbHVzaXZlKGNtLCBwcmV2LCBxdWVyeSwgbW90aW9uQXJncy5yZXBlYXQsIHZpbSk7XG5cbiAgICAgICAgLy8gTm8gbWF0Y2hlcy5cbiAgICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlcmUncyBhbiBvcGVyYXRvciB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQsIHJldHVybiB0aGUgc2VsZWN0aW9uLlxuICAgICAgICBpZiAocHJldklucHV0U3RhdGUub3BlcmF0b3IpIHtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEF0IHRoaXMgcG9pbnQsIHdlIGtub3cgdGhhdCB0aGVyZSBpcyBubyBhY2NvbXBhbnlpbmcgb3BlcmF0b3IgLS0gbGV0J3NcbiAgICAgICAgLy8gZGVhbCB3aXRoIHZpc3VhbCBtb2RlIGluIG9yZGVyIHRvIHNlbGVjdCBhbiBhcHByb3ByaWF0ZSBtYXRjaC5cblxuICAgICAgICB2YXIgZnJvbSA9IG5leHRbMF07XG4gICAgICAgIC8vIEZvciB3aGF0ZXZlciByZWFzb24sIHdoZW4gd2UgdXNlIHRoZSBcInRvXCIgYXMgcmV0dXJuZWQgYnkgc2VhcmNoY3Vyc29yLmpzIGRpcmVjdGx5LFxuICAgICAgICAvLyB0aGUgcmVzdWx0aW5nIHNlbGVjdGlvbiBpcyBleHRlbmRlZCBieSAxIGNoYXIuIExldCdzIHNocmluayBpdCBzbyB0aGF0IG9ubHkgdGhlXG4gICAgICAgIC8vIG1hdGNoIGlzIHNlbGVjdGVkLlxuICAgICAgICB2YXIgdG8gPSBuZXcgUG9zKG5leHRbMV0ubGluZSwgbmV4dFsxXS5jaCAtIDEpO1xuXG4gICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgIC8vIElmIHdlIHdlcmUgaW4gdmlzdWFsTGluZSBvciB2aXN1YWxCbG9jayBtb2RlLCBnZXQgb3V0IG9mIGl0LlxuICAgICAgICAgIGlmICh2aW0udmlzdWFsTGluZSB8fCB2aW0udmlzdWFsQmxvY2spIHtcbiAgICAgICAgICAgIHZpbS52aXN1YWxMaW5lID0gZmFsc2U7XG4gICAgICAgICAgICB2aW0udmlzdWFsQmxvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJ2aXN1YWxcIiwgc3ViTW9kZTogXCJcIn0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIElmIHdlJ3JlIGN1cnJlbnRseSBpbiB2aXN1YWwgbW9kZSwgd2Ugc2hvdWxkIGV4dGVuZCB0aGUgc2VsZWN0aW9uIHRvIGluY2x1ZGVcbiAgICAgICAgICAvLyB0aGUgc2VhcmNoIHJlc3VsdC5cbiAgICAgICAgICB2YXIgYW5jaG9yID0gdmltLnNlbC5hbmNob3I7XG4gICAgICAgICAgaWYgKGFuY2hvcikge1xuICAgICAgICAgICAgaWYgKHN0YXRlLmlzUmV2ZXJzZWQoKSkge1xuICAgICAgICAgICAgICBpZiAobW90aW9uQXJncy5mb3J3YXJkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFthbmNob3IsIGZyb21dO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIFthbmNob3IsIHRvXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChtb3Rpb25BcmdzLmZvcndhcmQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW2FuY2hvciwgdG9dO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIFthbmNob3IsIGZyb21dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBMZXQncyB0dXJuIHZpc3VhbCBtb2RlIG9uLlxuICAgICAgICAgIHZpbS52aXN1YWxNb2RlID0gdHJ1ZTtcbiAgICAgICAgICB2aW0udmlzdWFsTGluZSA9IGZhbHNlO1xuICAgICAgICAgIHZpbS52aXN1YWxCbG9jayA9IGZhbHNlO1xuICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJ2aXN1YWxcIiwgc3ViTW9kZTogXCJcIn0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByZXYgPyBbdG8sIGZyb21dIDogW2Zyb20sIHRvXTtcbiAgICAgIH0sXG4gICAgICBnb1RvTWFyazogZnVuY3Rpb24oY20sIF9oZWFkLCBtb3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIHBvcyA9IGdldE1hcmtQb3MoY20sIHZpbSwgbW90aW9uQXJncy5zZWxlY3RlZENoYXJhY3Rlcik7XG4gICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICByZXR1cm4gbW90aW9uQXJncy5saW5ld2lzZSA/IHsgbGluZTogcG9zLmxpbmUsIGNoOiBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUocG9zLmxpbmUpKSB9IDogcG9zO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcbiAgICAgIG1vdmVUb090aGVySGlnaGxpZ2h0ZWRFbmQ6IGZ1bmN0aW9uKGNtLCBfaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIGlmICh2aW0udmlzdWFsQmxvY2sgJiYgbW90aW9uQXJncy5zYW1lTGluZSkge1xuICAgICAgICAgIHZhciBzZWwgPSB2aW0uc2VsO1xuICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBuZXcgUG9zKHNlbC5hbmNob3IubGluZSwgc2VsLmhlYWQuY2gpKSxcbiAgICAgICAgICAgIGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIG5ldyBQb3Moc2VsLmhlYWQubGluZSwgc2VsLmFuY2hvci5jaCkpXG4gICAgICAgICAgXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gKFt2aW0uc2VsLmhlYWQsIHZpbS5zZWwuYW5jaG9yXSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBqdW1wVG9NYXJrOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciBiZXN0ID0gaGVhZDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb3Rpb25BcmdzLnJlcGVhdDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGN1cnNvciA9IGJlc3Q7XG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIHZpbS5tYXJrcykge1xuICAgICAgICAgICAgaWYgKCFpc0xvd2VyQ2FzZShrZXkpKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1hcmsgPSB2aW0ubWFya3Nba2V5XS5maW5kKCk7XG4gICAgICAgICAgICB2YXIgaXNXcm9uZ0RpcmVjdGlvbiA9IChtb3Rpb25BcmdzLmZvcndhcmQpID9cbiAgICAgICAgICAgICAgY3Vyc29ySXNCZWZvcmUobWFyaywgY3Vyc29yKSA6IGN1cnNvcklzQmVmb3JlKGN1cnNvciwgbWFyayk7XG5cbiAgICAgICAgICAgIGlmIChpc1dyb25nRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1vdGlvbkFyZ3MubGluZXdpc2UgJiYgKG1hcmsubGluZSA9PSBjdXJzb3IubGluZSkpIHtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBlcXVhbCA9IGN1cnNvckVxdWFsKGN1cnNvciwgYmVzdCk7XG4gICAgICAgICAgICB2YXIgYmV0d2VlbiA9IChtb3Rpb25BcmdzLmZvcndhcmQpID9cbiAgICAgICAgICAgICAgY3Vyc29ySXNCZXR3ZWVuKGN1cnNvciwgbWFyaywgYmVzdCkgOlxuICAgICAgICAgICAgICBjdXJzb3JJc0JldHdlZW4oYmVzdCwgbWFyaywgY3Vyc29yKTtcblxuICAgICAgICAgICAgaWYgKGVxdWFsIHx8IGJldHdlZW4pIHtcbiAgICAgICAgICAgICAgYmVzdCA9IG1hcms7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vdGlvbkFyZ3MubGluZXdpc2UpIHtcbiAgICAgICAgICAvLyBWaW0gcGxhY2VzIHRoZSBjdXJzb3Igb24gdGhlIGZpcnN0IG5vbi13aGl0ZXNwYWNlIGNoYXJhY3RlciBvZlxuICAgICAgICAgIC8vIHRoZSBsaW5lIGlmIHRoZXJlIGlzIG9uZSwgZWxzZSBpdCBwbGFjZXMgdGhlIGN1cnNvciBhdCB0aGUgZW5kXG4gICAgICAgICAgLy8gb2YgdGhlIGxpbmUsIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciBhIG1hcmsgd2FzIGZvdW5kLlxuICAgICAgICAgIGJlc3QgPSBuZXcgUG9zKGJlc3QubGluZSwgZmluZEZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbS5nZXRMaW5lKGJlc3QubGluZSkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmVzdDtcbiAgICAgIH0sXG4gICAgICBtb3ZlQnlDaGFyYWN0ZXJzOiBmdW5jdGlvbihfY20sIGhlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIGN1ciA9IGhlYWQ7XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgdmFyIGNoID0gbW90aW9uQXJncy5mb3J3YXJkID8gY3VyLmNoICsgcmVwZWF0IDogY3VyLmNoIC0gcmVwZWF0O1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhjdXIubGluZSwgY2gpO1xuICAgICAgfSxcbiAgICAgIG1vdmVCeUxpbmVzOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciBjdXIgPSBoZWFkO1xuICAgICAgICB2YXIgZW5kQ2ggPSBjdXIuY2g7XG4gICAgICAgIC8vIERlcGVuZGluZyB3aGF0IG91ciBsYXN0IG1vdGlvbiB3YXMsIHdlIG1heSB3YW50IHRvIGRvIGRpZmZlcmVudFxuICAgICAgICAvLyB0aGluZ3MuIElmIG91ciBsYXN0IG1vdGlvbiB3YXMgbW92aW5nIHZlcnRpY2FsbHksIHdlIHdhbnQgdG9cbiAgICAgICAgLy8gcHJlc2VydmUgdGhlIEhQb3MgZnJvbSBvdXIgbGFzdCBob3Jpem9udGFsIG1vdmUuICBJZiBvdXIgbGFzdCBtb3Rpb25cbiAgICAgICAgLy8gd2FzIGdvaW5nIHRvIHRoZSBlbmQgb2YgYSBsaW5lLCBtb3ZpbmcgdmVydGljYWxseSB3ZSBzaG91bGQgZ28gdG9cbiAgICAgICAgLy8gdGhlIGVuZCBvZiB0aGUgbGluZSwgZXRjLlxuICAgICAgICBzd2l0Y2ggKHZpbS5sYXN0TW90aW9uKSB7XG4gICAgICAgICAgY2FzZSB0aGlzLm1vdmVCeUxpbmVzOlxuICAgICAgICAgIGNhc2UgdGhpcy5tb3ZlQnlEaXNwbGF5TGluZXM6XG4gICAgICAgICAgY2FzZSB0aGlzLm1vdmVCeVNjcm9sbDpcbiAgICAgICAgICBjYXNlIHRoaXMubW92ZVRvQ29sdW1uOlxuICAgICAgICAgIGNhc2UgdGhpcy5tb3ZlVG9Fb2w6XG4gICAgICAgICAgICBlbmRDaCA9IHZpbS5sYXN0SFBvcztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2aW0ubGFzdEhQb3MgPSBlbmRDaDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVwZWF0ID0gbW90aW9uQXJncy5yZXBlYXQrKG1vdGlvbkFyZ3MucmVwZWF0T2Zmc2V0fHwwKTtcbiAgICAgICAgdmFyIGxpbmUgPSBtb3Rpb25BcmdzLmZvcndhcmQgPyBjdXIubGluZSArIHJlcGVhdCA6IGN1ci5saW5lIC0gcmVwZWF0O1xuICAgICAgICB2YXIgZmlyc3QgPSBjbS5maXJzdExpbmUoKTtcbiAgICAgICAgdmFyIGxhc3QgPSBjbS5sYXN0TGluZSgpO1xuICAgICAgICAvLyBWaW0gZ28gdG8gbGluZSBiZWdpbiBvciBsaW5lIGVuZCB3aGVuIGN1cnNvciBhdCBmaXJzdC9sYXN0IGxpbmUgYW5kXG4gICAgICAgIC8vIG1vdmUgdG8gcHJldmlvdXMvbmV4dCBsaW5lIGlzIHRyaWdnZXJlZC5cbiAgICAgICAgaWYgKGxpbmUgPCBmaXJzdCAmJiBjdXIubGluZSA9PSBmaXJzdCl7XG4gICAgICAgICAgcmV0dXJuIHRoaXMubW92ZVRvU3RhcnRPZkxpbmUoY20sIGhlYWQsIG1vdGlvbkFyZ3MsIHZpbSk7XG4gICAgICAgIH0gZWxzZSBpZiAobGluZSA+IGxhc3QgJiYgY3VyLmxpbmUgPT0gbGFzdCl7XG4gICAgICAgICAgICByZXR1cm4gbW92ZVRvRW9sKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0sIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFjZV9wYXRjaHtcbiAgICAgICAgdmFyIGZvbGQgPSBjbS5hY2Uuc2Vzc2lvbi5nZXRGb2xkTGluZShsaW5lKTtcbiAgICAgICAgaWYgKGZvbGQpIHtcbiAgICAgICAgICBpZiAobW90aW9uQXJncy5mb3J3YXJkKSB7XG4gICAgICAgICAgICBpZiAobGluZSA+IGZvbGQuc3RhcnQucm93KVxuICAgICAgICAgICAgICBsaW5lID0gZm9sZC5lbmQucm93ICsgMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGluZSA9IGZvbGQuc3RhcnQucm93O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBhY2VfcGF0Y2h9XG4gICAgICAgIGlmIChtb3Rpb25BcmdzLnRvRmlyc3RDaGFyKXtcbiAgICAgICAgICBlbmRDaD1maW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUobGluZSkpO1xuICAgICAgICAgIHZpbS5sYXN0SFBvcyA9IGVuZENoO1xuICAgICAgICB9XG4gICAgICAgIHZpbS5sYXN0SFNQb3MgPSBjbS5jaGFyQ29vcmRzKG5ldyBQb3MobGluZSwgZW5kQ2gpLCdkaXYnKS5sZWZ0O1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhsaW5lLCBlbmRDaCk7XG4gICAgICB9LFxuICAgICAgbW92ZUJ5RGlzcGxheUxpbmVzOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciBjdXIgPSBoZWFkO1xuICAgICAgICBzd2l0Y2ggKHZpbS5sYXN0TW90aW9uKSB7XG4gICAgICAgICAgY2FzZSB0aGlzLm1vdmVCeURpc3BsYXlMaW5lczpcbiAgICAgICAgICBjYXNlIHRoaXMubW92ZUJ5U2Nyb2xsOlxuICAgICAgICAgIGNhc2UgdGhpcy5tb3ZlQnlMaW5lczpcbiAgICAgICAgICBjYXNlIHRoaXMubW92ZVRvQ29sdW1uOlxuICAgICAgICAgIGNhc2UgdGhpcy5tb3ZlVG9Fb2w6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmltLmxhc3RIU1BvcyA9IGNtLmNoYXJDb29yZHMoY3VyLCdkaXYnKS5sZWZ0O1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgdmFyIHJlcz1jbS5maW5kUG9zVihjdXIsKG1vdGlvbkFyZ3MuZm9yd2FyZCA/IHJlcGVhdCA6IC1yZXBlYXQpLCdsaW5lJyx2aW0ubGFzdEhTUG9zKTtcbiAgICAgICAgaWYgKHJlcy5oaXRTaWRlKSB7XG4gICAgICAgICAgaWYgKG1vdGlvbkFyZ3MuZm9yd2FyZCkge1xuICAgICAgICAgICAgdmFyIGxhc3RDaGFyQ29vcmRzID0gY20uY2hhckNvb3JkcyhyZXMsICdkaXYnKTtcbiAgICAgICAgICAgIHZhciBnb2FsQ29vcmRzID0geyB0b3A6IGxhc3RDaGFyQ29vcmRzLnRvcCArIDgsIGxlZnQ6IHZpbS5sYXN0SFNQb3MgfTtcbiAgICAgICAgICAgIHZhciByZXMgPSBjbS5jb29yZHNDaGFyKGdvYWxDb29yZHMsICdkaXYnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHJlc0Nvb3JkcyA9IGNtLmNoYXJDb29yZHMobmV3IFBvcyhjbS5maXJzdExpbmUoKSwgMCksICdkaXYnKTtcbiAgICAgICAgICAgIHJlc0Nvb3Jkcy5sZWZ0ID0gdmltLmxhc3RIU1BvcztcbiAgICAgICAgICAgIHJlcyA9IGNtLmNvb3Jkc0NoYXIocmVzQ29vcmRzLCAnZGl2Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZpbS5sYXN0SFBvcyA9IHJlcy5jaDtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0sXG4gICAgICBtb3ZlQnlQYWdlOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICAvLyBDb2RlTWlycm9yIG9ubHkgZXhwb3NlcyBmdW5jdGlvbnMgdGhhdCBtb3ZlIHRoZSBjdXJzb3IgcGFnZSBkb3duLCBzb1xuICAgICAgICAvLyBkb2luZyB0aGlzIGJhZCBoYWNrIHRvIG1vdmUgdGhlIGN1cnNvciBhbmQgbW92ZSBpdCBiYWNrLiBldmFsSW5wdXRcbiAgICAgICAgLy8gd2lsbCBtb3ZlIHRoZSBjdXJzb3IgdG8gd2hlcmUgaXQgc2hvdWxkIGJlIGluIHRoZSBlbmQuXG4gICAgICAgIHZhciBjdXJTdGFydCA9IGhlYWQ7XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgcmV0dXJuIGNtLmZpbmRQb3NWKGN1clN0YXJ0LCAobW90aW9uQXJncy5mb3J3YXJkID8gcmVwZWF0IDogLXJlcGVhdCksICdwYWdlJyk7XG4gICAgICB9LFxuICAgICAgbW92ZUJ5UGFyYWdyYXBoOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgZGlyID0gbW90aW9uQXJncy5mb3J3YXJkID8gMSA6IC0xO1xuICAgICAgICByZXR1cm4gZmluZFBhcmFncmFwaChjbSwgaGVhZCwgbW90aW9uQXJncy5yZXBlYXQsIGRpcik7XG4gICAgICB9LFxuICAgICAgbW92ZUJ5U2VudGVuY2U6IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciBkaXIgPSBtb3Rpb25BcmdzLmZvcndhcmQgPyAxIDogLTE7XG4gICAgICAgIHJldHVybiBmaW5kU2VudGVuY2UoY20sIGhlYWQsIG1vdGlvbkFyZ3MucmVwZWF0LCBkaXIpO1xuICAgICAgfSxcbiAgICAgIG1vdmVCeVNjcm9sbDogZnVuY3Rpb24oY20sIGhlYWQsIG1vdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgc2Nyb2xsYm94ID0gY20uZ2V0U2Nyb2xsSW5mbygpO1xuICAgICAgICB2YXIgY3VyRW5kID0gbnVsbDtcbiAgICAgICAgdmFyIHJlcGVhdCA9IG1vdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICBpZiAoIXJlcGVhdCkge1xuICAgICAgICAgIHJlcGVhdCA9IHNjcm9sbGJveC5jbGllbnRIZWlnaHQgLyAoMiAqIGNtLmRlZmF1bHRUZXh0SGVpZ2h0KCkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvcmlnID0gY20uY2hhckNvb3JkcyhoZWFkLCAnbG9jYWwnKTtcbiAgICAgICAgbW90aW9uQXJncy5yZXBlYXQgPSByZXBlYXQ7XG4gICAgICAgIGN1ckVuZCA9IG1vdGlvbnMubW92ZUJ5RGlzcGxheUxpbmVzKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0pO1xuICAgICAgICBpZiAoIWN1ckVuZCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZXN0ID0gY20uY2hhckNvb3JkcyhjdXJFbmQsICdsb2NhbCcpO1xuICAgICAgICBjbS5zY3JvbGxUbyhudWxsLCBzY3JvbGxib3gudG9wICsgZGVzdC50b3AgLSBvcmlnLnRvcCk7XG4gICAgICAgIHJldHVybiBjdXJFbmQ7XG4gICAgICB9LFxuICAgICAgbW92ZUJ5V29yZHM6IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIHJldHVybiBtb3ZlVG9Xb3JkKGNtLCBoZWFkLCBtb3Rpb25BcmdzLnJlcGVhdCwgISFtb3Rpb25BcmdzLmZvcndhcmQsXG4gICAgICAgICAgICAhIW1vdGlvbkFyZ3Mud29yZEVuZCwgISFtb3Rpb25BcmdzLmJpZ1dvcmQpO1xuICAgICAgfSxcbiAgICAgIG1vdmVUaWxsQ2hhcmFjdGVyOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgcmVwZWF0ID0gbW90aW9uQXJncy5yZXBlYXQ7XG4gICAgICAgIHZhciBjdXJFbmQgPSBtb3ZlVG9DaGFyYWN0ZXIoY20sIHJlcGVhdCwgbW90aW9uQXJncy5mb3J3YXJkLFxuICAgICAgICAgICAgbW90aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlciwgaGVhZCk7XG4gICAgICAgIHZhciBpbmNyZW1lbnQgPSBtb3Rpb25BcmdzLmZvcndhcmQgPyAtMSA6IDE7XG4gICAgICAgIHJlY29yZExhc3RDaGFyYWN0ZXJTZWFyY2goaW5jcmVtZW50LCBtb3Rpb25BcmdzKTtcbiAgICAgICAgaWYgKCFjdXJFbmQpIHJldHVybiBudWxsO1xuICAgICAgICBjdXJFbmQuY2ggKz0gaW5jcmVtZW50O1xuICAgICAgICByZXR1cm4gY3VyRW5kO1xuICAgICAgfSxcbiAgICAgIG1vdmVUb0NoYXJhY3RlcjogZnVuY3Rpb24oY20sIGhlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIHJlcGVhdCA9IG1vdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICByZWNvcmRMYXN0Q2hhcmFjdGVyU2VhcmNoKDAsIG1vdGlvbkFyZ3MpO1xuICAgICAgICByZXR1cm4gbW92ZVRvQ2hhcmFjdGVyKGNtLCByZXBlYXQsIG1vdGlvbkFyZ3MuZm9yd2FyZCxcbiAgICAgICAgICAgIG1vdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXIsIGhlYWQpIHx8IGhlYWQ7XG4gICAgICB9LFxuICAgICAgbW92ZVRvU3ltYm9sOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgcmVwZWF0ID0gbW90aW9uQXJncy5yZXBlYXQ7XG4gICAgICAgIHJldHVybiBmaW5kU3ltYm9sKGNtLCByZXBlYXQsIG1vdGlvbkFyZ3MuZm9yd2FyZCxcbiAgICAgICAgICAgIG1vdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXIpIHx8IGhlYWQ7XG4gICAgICB9LFxuICAgICAgbW92ZVRvQ29sdW1uOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgLy8gcmVwZWF0IGlzIGVxdWl2YWxlbnQgdG8gd2hpY2ggY29sdW1uIHdlIHdhbnQgdG8gbW92ZSB0byFcbiAgICAgICAgdmltLmxhc3RIUG9zID0gcmVwZWF0IC0gMTtcbiAgICAgICAgdmltLmxhc3RIU1BvcyA9IGNtLmNoYXJDb29yZHMoaGVhZCwnZGl2JykubGVmdDtcbiAgICAgICAgcmV0dXJuIG1vdmVUb0NvbHVtbihjbSwgcmVwZWF0KTtcbiAgICAgIH0sXG4gICAgICBtb3ZlVG9Fb2w6IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgcmV0dXJuIG1vdmVUb0VvbChjbSwgaGVhZCwgbW90aW9uQXJncywgdmltLCBmYWxzZSk7XG4gICAgICB9LFxuICAgICAgbW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyOiBmdW5jdGlvbihjbSwgaGVhZCkge1xuICAgICAgICAvLyBHbyB0byB0aGUgc3RhcnQgb2YgdGhlIGxpbmUgd2hlcmUgdGhlIHRleHQgYmVnaW5zLCBvciB0aGUgZW5kIGZvclxuICAgICAgICAvLyB3aGl0ZXNwYWNlLW9ubHkgbGluZXNcbiAgICAgICAgdmFyIGN1cnNvciA9IGhlYWQ7XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGN1cnNvci5saW5lLFxuICAgICAgICAgICAgICAgICAgIGZpbmRGaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20uZ2V0TGluZShjdXJzb3IubGluZSkpKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlVG9NYXRjaGVkU3ltYm9sOiBmdW5jdGlvbihjbSwgaGVhZCkge1xuICAgICAgICB2YXIgY3Vyc29yID0gaGVhZDtcbiAgICAgICAgdmFyIGxpbmUgPSBjdXJzb3IubGluZTtcbiAgICAgICAgdmFyIGNoID0gY3Vyc29yLmNoO1xuICAgICAgICB2YXIgbGluZVRleHQgPSBjbS5nZXRMaW5lKGxpbmUpO1xuICAgICAgICB2YXIgc3ltYm9sO1xuICAgICAgICBmb3IgKDsgY2ggPCBsaW5lVGV4dC5sZW5ndGg7IGNoKyspIHtcbiAgICAgICAgICBzeW1ib2wgPSBsaW5lVGV4dC5jaGFyQXQoY2gpO1xuICAgICAgICAgIGlmIChzeW1ib2wgJiYgaXNNYXRjaGFibGVTeW1ib2woc3ltYm9sKSkge1xuICAgICAgICAgICAgdmFyIHN0eWxlID0gY20uZ2V0VG9rZW5UeXBlQXQobmV3IFBvcyhsaW5lLCBjaCArIDEpKTtcbiAgICAgICAgICAgIGlmIChzdHlsZSAhPT0gXCJzdHJpbmdcIiAmJiBzdHlsZSAhPT0gXCJjb21tZW50XCIpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjaCA8IGxpbmVUZXh0Lmxlbmd0aCkge1xuICAgICAgICAgIC8vIE9ubHkgaW5jbHVkZSBhbmdsZSBicmFja2V0cyBpbiBhbmFseXNpcyBpZiB0aGV5IGFyZSBiZWluZyBtYXRjaGVkLlxuICAgICAgICAgIHZhciByZSA9IC9bPD5dLy50ZXN0KGxpbmVUZXh0W2NoXSkgPyAvWygpe31bXFxdPD5dLyA6IC9bKCl7fVtcXF1dLzsgLy9hY2VfcGF0Y2g/XG4gICAgICAgICAgdmFyIG1hdGNoZWQgPSBjbS5maW5kTWF0Y2hpbmdCcmFja2V0KG5ldyBQb3MobGluZSwgY2grMSksIHticmFja2V0UmVnZXg6IHJlfSk7XG4gICAgICAgICAgcmV0dXJuIG1hdGNoZWQudG87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGN1cnNvcjtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG1vdmVUb1N0YXJ0T2ZMaW5lOiBmdW5jdGlvbihfY20sIGhlYWQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MoaGVhZC5saW5lLCAwKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlVG9MaW5lT3JFZGdlT2ZEb2N1bWVudDogZnVuY3Rpb24oY20sIF9oZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciBsaW5lTnVtID0gbW90aW9uQXJncy5mb3J3YXJkID8gY20ubGFzdExpbmUoKSA6IGNtLmZpcnN0TGluZSgpO1xuICAgICAgICBpZiAobW90aW9uQXJncy5yZXBlYXRJc0V4cGxpY2l0KSB7XG4gICAgICAgICAgbGluZU51bSA9IG1vdGlvbkFyZ3MucmVwZWF0IC0gY20uZ2V0T3B0aW9uKCdmaXJzdExpbmVOdW1iZXInKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFBvcyhsaW5lTnVtLFxuICAgICAgICAgICAgICAgICAgIGZpbmRGaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20uZ2V0TGluZShsaW5lTnVtKSkpO1xuICAgICAgfSxcbiAgICAgIG1vdmVUb1N0YXJ0T2ZEaXNwbGF5TGluZTogZnVuY3Rpb24oY20pIHtcbiAgICAgICAgY20uZXhlY0NvbW1hbmQoXCJnb0xpbmVMZWZ0XCIpO1xuICAgICAgICByZXR1cm4gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICB9LFxuICAgICAgbW92ZVRvRW5kT2ZEaXNwbGF5TGluZTogZnVuY3Rpb24oY20pIHtcbiAgICAgICAgY20uZXhlY0NvbW1hbmQoXCJnb0xpbmVSaWdodFwiKTtcbiAgICAgICAgdmFyIGhlYWQgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgaWYgKGhlYWQuc3RpY2t5ID09IFwiYmVmb3JlXCIpIGhlYWQuY2gtLTtcbiAgICAgICAgcmV0dXJuIGhlYWQ7XG4gICAgICB9LFxuICAgICAgdGV4dE9iamVjdE1hbmlwdWxhdGlvbjogZnVuY3Rpb24oY20sIGhlYWQsIG1vdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICAvLyBUT0RPOiBsb3RzIG9mIHBvc3NpYmxlIGV4Y2VwdGlvbnMgdGhhdCBjYW4gYmUgdGhyb3duIGhlcmUuIFRyeSBkYShcbiAgICAgICAgLy8gICAgIG91dHNpZGUgb2YgYSAoKSBibG9jay5cbiAgICAgICAgdmFyIG1pcnJvcmVkUGFpcnMgPSB7JygnOiAnKScsICcpJzogJygnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAneyc6ICd9JywgJ30nOiAneycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICdbJzogJ10nLCAnXSc6ICdbJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJzwnOiAnPicsICc+JzogJzwnfTtcbiAgICAgICAgdmFyIHNlbGZQYWlyZWQgPSB7J1xcJyc6IHRydWUsICdcIic6IHRydWUsICdgJzogdHJ1ZX07XG5cbiAgICAgICAgdmFyIGNoYXJhY3RlciA9IG1vdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXI7XG4gICAgICAgIC8vICdiJyByZWZlcnMgdG8gICcoKScgYmxvY2suXG4gICAgICAgIC8vICdCJyByZWZlcnMgdG8gICd7fScgYmxvY2suXG4gICAgICAgIGlmIChjaGFyYWN0ZXIgPT0gJ2InKSB7XG4gICAgICAgICAgY2hhcmFjdGVyID0gJygnO1xuICAgICAgICB9IGVsc2UgaWYgKGNoYXJhY3RlciA9PSAnQicpIHtcbiAgICAgICAgICBjaGFyYWN0ZXIgPSAneyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJbmNsdXNpdmUgaXMgdGhlIGRpZmZlcmVuY2UgYmV0d2VlbiBhIGFuZCBpXG4gICAgICAgIC8vIFRPRE86IEluc3RlYWQgb2YgdXNpbmcgdGhlIGFkZGl0aW9uYWwgdGV4dCBvYmplY3QgbWFwIHRvIHBlcmZvcm0gdGV4dFxuICAgICAgICAvLyAgICAgb2JqZWN0IG9wZXJhdGlvbnMsIG1lcmdlIHRoZSBtYXAgaW50byB0aGUgZGVmYXVsdEtleU1hcCBhbmQgdXNlXG4gICAgICAgIC8vICAgICBtb3Rpb25BcmdzIHRvIGRlZmluZSBiZWhhdmlvci4gRGVmaW5lIHNlcGFyYXRlIGVudHJpZXMgZm9yICdhdycsXG4gICAgICAgIC8vICAgICAnaXcnLCAnYVsnLCAnaVsnLCBldGMuXG4gICAgICAgIHZhciBpbmNsdXNpdmUgPSAhbW90aW9uQXJncy50ZXh0T2JqZWN0SW5uZXI7XG5cbiAgICAgICAgdmFyIHRtcCwgbW92ZTtcbiAgICAgICAgaWYgKG1pcnJvcmVkUGFpcnNbY2hhcmFjdGVyXSkge1xuICAgICAgICAgIG1vdmUgPSB0cnVlO1xuICAgICAgICAgIHRtcCA9IHNlbGVjdENvbXBhbmlvbk9iamVjdChjbSwgaGVhZCwgY2hhcmFjdGVyLCBpbmNsdXNpdmUpO1xuICAgICAgICAgIGlmICghdG1wKSB7XG4gICAgICAgICAgICB2YXIgc2MgPSBjbS5nZXRTZWFyY2hDdXJzb3IobmV3IFJlZ0V4cChcIlxcXFxcIiArIGNoYXJhY3RlciwgXCJnXCIpLCBoZWFkKVxuICAgICAgICAgICAgaWYgKHNjLmZpbmQoKSkge1xuICAgICAgICAgICAgICB0bXAgPSBzZWxlY3RDb21wYW5pb25PYmplY3QoY20sIHNjLmZyb20oKSwgY2hhcmFjdGVyLCBpbmNsdXNpdmUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzZWxmUGFpcmVkW2NoYXJhY3Rlcl0pIHtcbiAgICAgICAgICBtb3ZlID0gdHJ1ZTtcbiAgICAgICAgICB0bXAgPSBmaW5kQmVnaW5uaW5nQW5kRW5kKGNtLCBoZWFkLCBjaGFyYWN0ZXIsIGluY2x1c2l2ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyID09PSAnVycgfHwgY2hhcmFjdGVyID09PSAndycpIHtcbiAgICAgICAgICB2YXIgcmVwZWF0ID0gbW90aW9uQXJncy5yZXBlYXQgfHwgMTtcbiAgICAgICAgICB3aGlsZSAocmVwZWF0LS0gPiAwKSB7XG4gICAgICAgICAgICB2YXIgcmVwZWF0ZWQgPSBleHBhbmRXb3JkVW5kZXJDdXJzb3IoY20sIHtcbiAgICAgICAgICAgICAgaW5jbHVzaXZlLFxuICAgICAgICAgICAgICBpbm5lcldvcmQ6ICFpbmNsdXNpdmUsXG4gICAgICAgICAgICAgIGJpZ1dvcmQ6IGNoYXJhY3RlciA9PT0gJ1cnLFxuICAgICAgICAgICAgICBub1N5bWJvbDogY2hhcmFjdGVyID09PSAnVycsXG4gICAgICAgICAgICAgIG11bHRpbGluZTogdHJ1ZVxuICAgICAgICAgICAgfSwgdG1wICYmIHRtcC5lbmQpO1xuICAgICAgICAgICAgaWYgKHJlcGVhdGVkKSB7XG4gICAgICAgICAgICAgIGlmICghdG1wKSB0bXAgPSByZXBlYXRlZDtcbiAgICAgICAgICAgICAgdG1wLmVuZCA9IHJlcGVhdGVkLmVuZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyID09PSAncCcpIHtcbiAgICAgICAgICB0bXAgPSBmaW5kUGFyYWdyYXBoKGNtLCBoZWFkLCBtb3Rpb25BcmdzLnJlcGVhdCwgMCwgaW5jbHVzaXZlKTtcbiAgICAgICAgICBtb3Rpb25BcmdzLmxpbmV3aXNlID0gdHJ1ZTtcbiAgICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIGlmICghdmltLnZpc3VhbExpbmUpIHsgdmltLnZpc3VhbExpbmUgPSB0cnVlOyB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBvcGVyYXRvckFyZ3MgPSB2aW0uaW5wdXRTdGF0ZS5vcGVyYXRvckFyZ3M7XG4gICAgICAgICAgICBpZiAob3BlcmF0b3JBcmdzKSB7IG9wZXJhdG9yQXJncy5saW5ld2lzZSA9IHRydWU7IH1cbiAgICAgICAgICAgIHRtcC5lbmQubGluZS0tO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjaGFyYWN0ZXIgPT09ICd0Jykge1xuICAgICAgICAgIHRtcCA9IGV4cGFuZFRhZ1VuZGVyQ3Vyc29yKGNtLCBoZWFkLCBpbmNsdXNpdmUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNoYXJhY3RlciA9PT0gJ3MnKSB7XG4gICAgICAgICAgLy8gYWNjb3VudCBmb3IgY3Vyc29yIG9uIGVuZCBvZiBzZW50ZW5jZSBzeW1ib2xcbiAgICAgICAgICB2YXIgY29udGVudCA9IGNtLmdldExpbmUoaGVhZC5saW5lKTtcbiAgICAgICAgICBpZiAoaGVhZC5jaCA+IDAgJiYgaXNFbmRPZlNlbnRlbmNlU3ltYm9sKGNvbnRlbnRbaGVhZC5jaF0pKSB7XG4gICAgICAgICAgICBoZWFkLmNoIC09IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBlbmQgPSBnZXRTZW50ZW5jZShjbSwgaGVhZCwgbW90aW9uQXJncy5yZXBlYXQsIDEsIGluY2x1c2l2ZSlcbiAgICAgICAgICB2YXIgc3RhcnQgPSBnZXRTZW50ZW5jZShjbSwgaGVhZCwgbW90aW9uQXJncy5yZXBlYXQsIC0xLCBpbmNsdXNpdmUpXG4gICAgICAgICAgLy8gY2xvc2VyIHZpbSBiZWhhdmlvdXIsICdhJyBvbmx5IHRha2VzIHRoZSBzcGFjZSBhZnRlciB0aGUgc2VudGVuY2UgaWYgdGhlcmUgaXMgb25lIGJlZm9yZSBhbmQgYWZ0ZXJcbiAgICAgICAgICBpZiAoaXNXaGl0ZVNwYWNlU3RyaW5nKGNtLmdldExpbmUoc3RhcnQubGluZSlbc3RhcnQuY2hdKVxuICAgICAgICAgICAgICAmJiBpc1doaXRlU3BhY2VTdHJpbmcoY20uZ2V0TGluZShlbmQubGluZSlbZW5kLmNoIC0xXSkpIHtcbiAgICAgICAgICAgIHN0YXJ0ID0ge2xpbmU6IHN0YXJ0LmxpbmUsIGNoOiBzdGFydC5jaCArIDF9XG4gICAgICAgICAgfVxuICAgICAgICAgIHRtcCA9IHtzdGFydDogc3RhcnQsIGVuZDogZW5kfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdG1wKSB7XG4gICAgICAgICAgLy8gTm8gdmFsaWQgdGV4dCBvYmplY3QsIGRvbid0IG1vdmUuXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNtLnN0YXRlLnZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgcmV0dXJuIFt0bXAuc3RhcnQsIHRtcC5lbmRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBleHBhbmRTZWxlY3Rpb24oY20sIHRtcC5zdGFydCwgdG1wLmVuZCwgbW92ZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIHJlcGVhdExhc3RDaGFyYWN0ZXJTZWFyY2g6IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciBsYXN0U2VhcmNoID0gdmltR2xvYmFsU3RhdGUubGFzdENoYXJhY3RlclNlYXJjaDtcbiAgICAgICAgdmFyIHJlcGVhdCA9IG1vdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICB2YXIgZm9yd2FyZCA9IG1vdGlvbkFyZ3MuZm9yd2FyZCA9PT0gbGFzdFNlYXJjaC5mb3J3YXJkO1xuICAgICAgICB2YXIgaW5jcmVtZW50ID0gKGxhc3RTZWFyY2guaW5jcmVtZW50ID8gMSA6IDApICogKGZvcndhcmQgPyAtMSA6IDEpO1xuICAgICAgICBjbS5tb3ZlSCgtaW5jcmVtZW50LCAnY2hhcicpO1xuICAgICAgICBtb3Rpb25BcmdzLmluY2x1c2l2ZSA9IGZvcndhcmQgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHZhciBjdXJFbmQgPSBtb3ZlVG9DaGFyYWN0ZXIoY20sIHJlcGVhdCwgZm9yd2FyZCwgbGFzdFNlYXJjaC5zZWxlY3RlZENoYXJhY3Rlcik7XG4gICAgICAgIGlmICghY3VyRW5kKSB7XG4gICAgICAgICAgY20ubW92ZUgoaW5jcmVtZW50LCAnY2hhcicpO1xuICAgICAgICAgIHJldHVybiBoZWFkO1xuICAgICAgICB9XG4gICAgICAgIGN1ckVuZC5jaCArPSBpbmNyZW1lbnQ7XG4gICAgICAgIHJldHVybiBjdXJFbmQ7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGRlZmluZU1vdGlvbihuYW1lLCBmbikge1xuICAgICAgbW90aW9uc1tuYW1lXSA9IGZuO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbGxBcnJheSh2YWwsIHRpbWVzKSB7XG4gICAgICB2YXIgYXJyID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRpbWVzOyBpKyspIHtcbiAgICAgICAgYXJyLnB1c2godmFsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFuIG9wZXJhdG9yIGFjdHMgb24gYSB0ZXh0IHNlbGVjdGlvbi4gSXQgcmVjZWl2ZXMgdGhlIGxpc3Qgb2Ygc2VsZWN0aW9uc1xuICAgICAqIGFzIGlucHV0LiBUaGUgY29ycmVzcG9uZGluZyBDb2RlTWlycm9yIHNlbGVjdGlvbiBpcyBndWFyYW50ZWVkIHRvXG4gICAgKiBtYXRjaCB0aGUgaW5wdXQgc2VsZWN0aW9uLlxuICAgICAqL1xuICAgIHZhciBvcGVyYXRvcnMgPSB7XG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKGNtLCBhcmdzLCByYW5nZXMpIHtcbiAgICAgICAgdmFyIGZpbmFsSGVhZCwgdGV4dDtcbiAgICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgICAgdmFyIGFuY2hvciA9IHJhbmdlc1swXS5hbmNob3IsXG4gICAgICAgICAgICBoZWFkID0gcmFuZ2VzWzBdLmhlYWQ7XG4gICAgICAgIGlmICghdmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICB0ZXh0ID0gY20uZ2V0UmFuZ2UoYW5jaG9yLCBoZWFkKTtcbiAgICAgICAgICB2YXIgbGFzdFN0YXRlID0gdmltLmxhc3RFZGl0SW5wdXRTdGF0ZSB8fCB7fTtcbiAgICAgICAgICBpZiAobGFzdFN0YXRlLm1vdGlvbiA9PSBcIm1vdmVCeVdvcmRzXCIgJiYgIWlzV2hpdGVTcGFjZVN0cmluZyh0ZXh0KSkge1xuICAgICAgICAgICAgLy8gRXhjbHVkZSB0cmFpbGluZyB3aGl0ZXNwYWNlIGlmIHRoZSByYW5nZSBpcyBub3QgYWxsIHdoaXRlc3BhY2UuXG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSAoL1xccyskLykuZXhlYyh0ZXh0KTtcbiAgICAgICAgICAgIGlmIChtYXRjaCAmJiBsYXN0U3RhdGUubW90aW9uQXJncyAmJiBsYXN0U3RhdGUubW90aW9uQXJncy5mb3J3YXJkKSB7XG4gICAgICAgICAgICAgIGhlYWQgPSBvZmZzZXRDdXJzb3IoaGVhZCwgMCwgLSBtYXRjaFswXS5sZW5ndGgpO1xuICAgICAgICAgICAgICB0ZXh0ID0gdGV4dC5zbGljZSgwLCAtIG1hdGNoWzBdLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhcmdzLmxpbmV3aXNlKSB7XG4gICAgICAgICAgICBhbmNob3IgPSBuZXcgUG9zKGFuY2hvci5saW5lLCBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUoYW5jaG9yLmxpbmUpKSk7XG4gICAgICAgICAgICBpZiAoaGVhZC5saW5lID4gYW5jaG9yLmxpbmUpIHtcbiAgICAgICAgICAgICAgaGVhZCA9IG5ldyBQb3MoaGVhZC5saW5lIC0gMSwgTnVtYmVyLk1BWF9WQUxVRSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY20ucmVwbGFjZVJhbmdlKCcnLCBhbmNob3IsIGhlYWQpO1xuICAgICAgICAgIGZpbmFsSGVhZCA9IGFuY2hvcjtcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzLmZ1bGxMaW5lKSB7XG4gICAgICAgICAgICBoZWFkLmNoID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgICAgIGhlYWQubGluZS0tO1xuICAgICAgICAgICAgY20uc2V0U2VsZWN0aW9uKGFuY2hvciwgaGVhZClcbiAgICAgICAgICAgIHRleHQgPSBjbS5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VTZWxlY3Rpb24oXCJcIik7XG4gICAgICAgICAgICBmaW5hbEhlYWQgPSBhbmNob3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGV4dCA9IGNtLmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgIHZhciByZXBsYWNlbWVudCA9IGZpbGxBcnJheSgnJywgcmFuZ2VzLmxlbmd0aCk7XG4gICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbnMocmVwbGFjZW1lbnQpO1xuICAgICAgICAgIGZpbmFsSGVhZCA9IGN1cnNvck1pbihyYW5nZXNbMF0uaGVhZCwgcmFuZ2VzWzBdLmFuY2hvcik7XG4gICAgICAgIH1cbiAgICAgICAgdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLnB1c2hUZXh0KFxuICAgICAgICAgICAgYXJncy5yZWdpc3Rlck5hbWUsICdjaGFuZ2UnLCB0ZXh0LFxuICAgICAgICAgICAgYXJncy5saW5ld2lzZSwgcmFuZ2VzLmxlbmd0aCA+IDEpO1xuICAgICAgICBhY3Rpb25zLmVudGVySW5zZXJ0TW9kZShjbSwge2hlYWQ6IGZpbmFsSGVhZH0sIGNtLnN0YXRlLnZpbSk7XG4gICAgICB9LFxuICAgICAgLy8gZGVsZXRlIGlzIGEgamF2YXNjcmlwdCBrZXl3b3JkLlxuICAgICAgJ2RlbGV0ZSc6IGZ1bmN0aW9uKGNtLCBhcmdzLCByYW5nZXMpIHtcbiAgICAgICAgdmFyIGZpbmFsSGVhZCwgdGV4dDtcbiAgICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgICAgaWYgKCF2aW0udmlzdWFsQmxvY2spIHtcbiAgICAgICAgICB2YXIgYW5jaG9yID0gcmFuZ2VzWzBdLmFuY2hvcixcbiAgICAgICAgICAgICAgaGVhZCA9IHJhbmdlc1swXS5oZWFkO1xuICAgICAgICAgIGlmIChhcmdzLmxpbmV3aXNlICYmXG4gICAgICAgICAgICAgIGhlYWQubGluZSAhPSBjbS5maXJzdExpbmUoKSAmJlxuICAgICAgICAgICAgICBhbmNob3IubGluZSA9PSBjbS5sYXN0TGluZSgpICYmXG4gICAgICAgICAgICAgIGFuY2hvci5saW5lID09IGhlYWQubGluZSAtIDEpIHtcbiAgICAgICAgICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgZGQgb24gbGFzdCBsaW5lIChhbmQgZmlyc3QgbGluZSkuXG4gICAgICAgICAgICBpZiAoYW5jaG9yLmxpbmUgPT0gY20uZmlyc3RMaW5lKCkpIHtcbiAgICAgICAgICAgICAgYW5jaG9yLmNoID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFuY2hvciA9IG5ldyBQb3MoYW5jaG9yLmxpbmUgLSAxLCBsaW5lTGVuZ3RoKGNtLCBhbmNob3IubGluZSAtIDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGV4dCA9IGNtLmdldFJhbmdlKGFuY2hvciwgaGVhZCk7XG4gICAgICAgICAgY20ucmVwbGFjZVJhbmdlKCcnLCBhbmNob3IsIGhlYWQpO1xuICAgICAgICAgIGZpbmFsSGVhZCA9IGFuY2hvcjtcbiAgICAgICAgICBpZiAoYXJncy5saW5ld2lzZSkge1xuICAgICAgICAgICAgZmluYWxIZWFkID0gbW90aW9ucy5tb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20sIGFuY2hvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRleHQgPSBjbS5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICB2YXIgcmVwbGFjZW1lbnQgPSBmaWxsQXJyYXkoJycsIHJhbmdlcy5sZW5ndGgpO1xuICAgICAgICAgIGNtLnJlcGxhY2VTZWxlY3Rpb25zKHJlcGxhY2VtZW50KTtcbiAgICAgICAgICBmaW5hbEhlYWQgPSBjdXJzb3JNaW4ocmFuZ2VzWzBdLmhlYWQsIHJhbmdlc1swXS5hbmNob3IpO1xuICAgICAgICB9XG4gICAgICAgIHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5wdXNoVGV4dChcbiAgICAgICAgICAgIGFyZ3MucmVnaXN0ZXJOYW1lLCAnZGVsZXRlJywgdGV4dCxcbiAgICAgICAgICAgIGFyZ3MubGluZXdpc2UsIHZpbS52aXN1YWxCbG9jayk7XG4gICAgICAgIHJldHVybiBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBmaW5hbEhlYWQpO1xuICAgICAgfSxcbiAgICAgIGluZGVudDogZnVuY3Rpb24oY20sIGFyZ3MsIHJhbmdlcykge1xuICAgICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgICAvLyBJbiB2aXN1YWwgbW9kZSwgbj4gc2hpZnRzIHRoZSBzZWxlY3Rpb24gcmlnaHQgbiB0aW1lcywgaW5zdGVhZCBvZlxuICAgICAgICAvLyBzaGlmdGluZyBuIGxpbmVzIHJpZ2h0IG9uY2UuXG4gICAgICAgIHZhciByZXBlYXQgPSAodmltLnZpc3VhbE1vZGUpID8gYXJncy5yZXBlYXQgOiAxO1xuICAgICAgICBpZiAodmltLnZpc3VhbEJsb2NrKSB7XG4gICAgICAgICAgdmFyIHRhYlNpemUgPSBjbS5nZXRPcHRpb24oJ3RhYlNpemUnKTtcbiAgICAgICAgICB2YXIgaW5kZW50ID0gY20uZ2V0T3B0aW9uKCdpbmRlbnRXaXRoVGFicycpID8gJ1xcdCcgOiAnICcucmVwZWF0KHRhYlNpemUpO1xuICAgICAgICAgIHZhciBjdXJzb3I7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IHJhbmdlcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgY3Vyc29yID0gY3Vyc29yTWluKHJhbmdlc1tpXS5hbmNob3IsIHJhbmdlc1tpXS5oZWFkKTtcbiAgICAgICAgICAgIGlmIChhcmdzLmluZGVudFJpZ2h0KSB7XG4gICAgICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZShpbmRlbnQucmVwZWF0KHJlcGVhdCksIGN1cnNvciwgY3Vyc29yKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciB0ZXh0ID0gY20uZ2V0TGluZShjdXJzb3IubGluZSk7XG4gICAgICAgICAgICAgIHZhciBlbmQgPSAwO1xuICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlcGVhdDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNoID0gdGV4dFtjdXJzb3IuY2ggKyBlbmRdO1xuICAgICAgICAgICAgICAgIGlmIChjaCA9PSAnXFx0Jykge1xuICAgICAgICAgICAgICAgICAgZW5kKys7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChjaCA9PSAnICcpIHtcbiAgICAgICAgICAgICAgICAgIGVuZCsrO1xuICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDE7IGsgPCBpbmRlbnQubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY2ggPSB0ZXh0W2N1cnNvci5jaCArIGVuZF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChjaCAhPT0gJyAnKSBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZW5kKys7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZSgnJywgY3Vyc29yLCBvZmZzZXRDdXJzb3IoY3Vyc29yLCAwLCBlbmQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGN1cnNvcjtcbiAgICAgICAgfSBlbHNlIGlmIChjbS5pbmRlbnRNb3JlKSB7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXBlYXQ7IGorKykge1xuICAgICAgICAgICAgaWYgKGFyZ3MuaW5kZW50UmlnaHQpIGNtLmluZGVudE1vcmUoKTtcbiAgICAgICAgICAgIGVsc2UgY20uaW5kZW50TGVzcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgc3RhcnRMaW5lID0gcmFuZ2VzWzBdLmFuY2hvci5saW5lO1xuICAgICAgICAgIHZhciBlbmRMaW5lID0gdmltLnZpc3VhbEJsb2NrID9cbiAgICAgICAgICAgIHJhbmdlc1tyYW5nZXMubGVuZ3RoIC0gMV0uYW5jaG9yLmxpbmUgOlxuICAgICAgICAgICAgcmFuZ2VzWzBdLmhlYWQubGluZTtcbiAgICAgICAgICBpZiAoYXJncy5saW5ld2lzZSkge1xuICAgICAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIGRlbGV0ZSBhIG5ld2xpbmUgaXMgdG8gZGVsZXRlIHVudGlsIHRoZSBzdGFydCBvZlxuICAgICAgICAgICAgLy8gdGhlIG5leHQgbGluZSwgc28gaW4gbGluZXdpc2UgbW9kZSBldmFsSW5wdXQgd2lsbCBpbmNsdWRlIHRoZSBuZXh0XG4gICAgICAgICAgICAvLyBsaW5lLiBXZSBkb24ndCB3YW50IHRoaXMgaW4gaW5kZW50LCBzbyB3ZSBnbyBiYWNrIGEgbGluZS5cbiAgICAgICAgICAgIGVuZExpbmUtLTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0TGluZTsgaSA8PSBlbmRMaW5lOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVwZWF0OyBqKyspIHtcbiAgICAgICAgICAgICAgY20uaW5kZW50TGluZShpLCBhcmdzLmluZGVudFJpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1vdGlvbnMubW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLCByYW5nZXNbMF0uYW5jaG9yKTtcbiAgICAgIH0sXG4gICAgICBpbmRlbnRBdXRvOiBmdW5jdGlvbihjbSwgX2FyZ3MsIHJhbmdlcykge1xuICAgICAgICBjbS5leGVjQ29tbWFuZChcImluZGVudEF1dG9cIik7XG4gICAgICAgIHJldHVybiBtb3Rpb25zLm1vdmVUb0ZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbSwgcmFuZ2VzWzBdLmFuY2hvcik7XG4gICAgICB9LFxuICAgICAgaGFyZFdyYXA6IGZ1bmN0aW9uKGNtLCBvcGVyYXRvckFyZ3MsIHJhbmdlcywgb2xkQW5jaG9yLCBuZXdIZWFkKSB7XG4gICAgICAgIGlmICghY20uaGFyZFdyYXApIHJldHVybjtcbiAgICAgICAgdmFyIGZyb20gPSByYW5nZXNbMF0uYW5jaG9yLmxpbmU7XG4gICAgICAgIHZhciB0byA9IHJhbmdlc1swXS5oZWFkLmxpbmU7XG4gICAgICAgIGlmIChvcGVyYXRvckFyZ3MubGluZXdpc2UpIHRvLS07XG4gICAgICAgIHZhciBlbmRSb3cgPSBjbS5oYXJkV3JhcCh7ZnJvbTogZnJvbSwgdG86IHRvfSk7XG4gICAgICAgIGlmIChlbmRSb3cgPiBmcm9tICYmIG9wZXJhdG9yQXJncy5saW5ld2lzZSkgZW5kUm93LS07XG4gICAgICAgIHJldHVybiBvcGVyYXRvckFyZ3Mua2VlcEN1cnNvciA/IG9sZEFuY2hvciA6IG5ldyBQb3MoZW5kUm93LCAwKTtcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VDYXNlOiBmdW5jdGlvbihjbSwgYXJncywgcmFuZ2VzLCBvbGRBbmNob3IsIG5ld0hlYWQpIHtcbiAgICAgICAgdmFyIHNlbGVjdGlvbnMgPSBjbS5nZXRTZWxlY3Rpb25zKCk7XG4gICAgICAgIHZhciBzd2FwcGVkID0gW107XG4gICAgICAgIHZhciB0b0xvd2VyID0gYXJncy50b0xvd2VyO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlbGVjdGlvbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgdG9Td2FwID0gc2VsZWN0aW9uc1tqXTtcbiAgICAgICAgICB2YXIgdGV4dCA9ICcnO1xuICAgICAgICAgIGlmICh0b0xvd2VyID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0ZXh0ID0gdG9Td2FwLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0b0xvd2VyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGV4dCA9IHRvU3dhcC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvU3dhcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gdG9Td2FwLmNoYXJBdChpKTtcbiAgICAgICAgICAgICAgdGV4dCArPSBpc1VwcGVyQ2FzZShjaGFyYWN0ZXIpID8gY2hhcmFjdGVyLnRvTG93ZXJDYXNlKCkgOlxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHN3YXBwZWQucHVzaCh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9ucyhzd2FwcGVkKTtcbiAgICAgICAgaWYgKGFyZ3Muc2hvdWxkTW92ZUN1cnNvcil7XG4gICAgICAgICAgcmV0dXJuIG5ld0hlYWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoIWNtLnN0YXRlLnZpbS52aXN1YWxNb2RlICYmIGFyZ3MubGluZXdpc2UgJiYgcmFuZ2VzWzBdLmFuY2hvci5saW5lICsgMSA9PSByYW5nZXNbMF0uaGVhZC5saW5lKSB7XG4gICAgICAgICAgcmV0dXJuIG1vdGlvbnMubW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLCBvbGRBbmNob3IpO1xuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MubGluZXdpc2Upe1xuICAgICAgICAgIHJldHVybiBvbGRBbmNob3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGN1cnNvck1pbihyYW5nZXNbMF0uYW5jaG9yLCByYW5nZXNbMF0uaGVhZCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB5YW5rOiBmdW5jdGlvbihjbSwgYXJncywgcmFuZ2VzLCBvbGRBbmNob3IpIHtcbiAgICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgICAgdmFyIHRleHQgPSBjbS5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgdmFyIGVuZFBvcyA9IHZpbS52aXN1YWxNb2RlXG4gICAgICAgICAgPyBjdXJzb3JNaW4odmltLnNlbC5hbmNob3IsIHZpbS5zZWwuaGVhZCwgcmFuZ2VzWzBdLmhlYWQsIHJhbmdlc1swXS5hbmNob3IpXG4gICAgICAgICAgOiBvbGRBbmNob3I7XG4gICAgICAgIHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5wdXNoVGV4dChcbiAgICAgICAgICAgIGFyZ3MucmVnaXN0ZXJOYW1lLCAneWFuaycsXG4gICAgICAgICAgICB0ZXh0LCBhcmdzLmxpbmV3aXNlLCB2aW0udmlzdWFsQmxvY2spO1xuICAgICAgICByZXR1cm4gZW5kUG9zO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVPcGVyYXRvcihuYW1lLCBmbikge1xuICAgICAgb3BlcmF0b3JzW25hbWVdID0gZm47XG4gICAgfVxuXG4gICAgdmFyIGFjdGlvbnMgPSB7XG4gICAgICBqdW1wTGlzdFdhbGs6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXBlYXQgPSBhY3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgdmFyIGZvcndhcmQgPSBhY3Rpb25BcmdzLmZvcndhcmQ7XG4gICAgICAgIHZhciBqdW1wTGlzdCA9IHZpbUdsb2JhbFN0YXRlLmp1bXBMaXN0O1xuXG4gICAgICAgIHZhciBtYXJrID0ganVtcExpc3QubW92ZShjbSwgZm9yd2FyZCA/IHJlcGVhdCA6IC1yZXBlYXQpO1xuICAgICAgICB2YXIgbWFya1BvcyA9IG1hcmsgPyBtYXJrLmZpbmQoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgbWFya1BvcyA9IG1hcmtQb3MgPyBtYXJrUG9zIDogY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgIGNtLnNldEN1cnNvcihtYXJrUG9zKTtcbiAgICAgICAgY20uYWNlLmN1ck9wLmNvbW1hbmQuc2Nyb2xsSW50b1ZpZXcgPSBcImNlbnRlci1hbmltYXRlXCI7IC8vIGFjZV9wYXRjaFxuICAgICAgfSxcbiAgICAgIHNjcm9sbDogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlcGVhdCA9IGFjdGlvbkFyZ3MucmVwZWF0IHx8IDE7XG4gICAgICAgIHZhciBsaW5lSGVpZ2h0ID0gY20uZGVmYXVsdFRleHRIZWlnaHQoKTtcbiAgICAgICAgdmFyIHRvcCA9IGNtLmdldFNjcm9sbEluZm8oKS50b3A7XG4gICAgICAgIHZhciBkZWx0YSA9IGxpbmVIZWlnaHQgKiByZXBlYXQ7XG4gICAgICAgIHZhciBuZXdQb3MgPSBhY3Rpb25BcmdzLmZvcndhcmQgPyB0b3AgKyBkZWx0YSA6IHRvcCAtIGRlbHRhO1xuICAgICAgICB2YXIgY3Vyc29yID0gY29weUN1cnNvcihjbS5nZXRDdXJzb3IoKSk7XG4gICAgICAgIHZhciBjdXJzb3JDb29yZHMgPSBjbS5jaGFyQ29vcmRzKGN1cnNvciwgJ2xvY2FsJyk7XG4gICAgICAgIGlmIChhY3Rpb25BcmdzLmZvcndhcmQpIHtcbiAgICAgICAgICBpZiAobmV3UG9zID4gY3Vyc29yQ29vcmRzLnRvcCkge1xuICAgICAgICAgICAgIGN1cnNvci5saW5lICs9IChuZXdQb3MgLSBjdXJzb3JDb29yZHMudG9wKSAvIGxpbmVIZWlnaHQ7XG4gICAgICAgICAgICAgY3Vyc29yLmxpbmUgPSBNYXRoLmNlaWwoY3Vyc29yLmxpbmUpO1xuICAgICAgICAgICAgIGNtLnNldEN1cnNvcihjdXJzb3IpO1xuICAgICAgICAgICAgIGN1cnNvckNvb3JkcyA9IGNtLmNoYXJDb29yZHMoY3Vyc29yLCAnbG9jYWwnKTtcbiAgICAgICAgICAgICBjbS5zY3JvbGxUbyhudWxsLCBjdXJzb3JDb29yZHMudG9wKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgIC8vIEN1cnNvciBzdGF5cyB3aXRoaW4gYm91bmRzLiAgSnVzdCByZXBvc2l0aW9uIHRoZSBzY3JvbGwgd2luZG93LlxuICAgICAgICAgICAgIGNtLnNjcm9sbFRvKG51bGwsIG5ld1Bvcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBuZXdCb3R0b20gPSBuZXdQb3MgKyBjbS5nZXRTY3JvbGxJbmZvKCkuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgIGlmIChuZXdCb3R0b20gPCBjdXJzb3JDb29yZHMuYm90dG9tKSB7XG4gICAgICAgICAgICAgY3Vyc29yLmxpbmUgLT0gKGN1cnNvckNvb3Jkcy5ib3R0b20gLSBuZXdCb3R0b20pIC8gbGluZUhlaWdodDtcbiAgICAgICAgICAgICBjdXJzb3IubGluZSA9IE1hdGguZmxvb3IoY3Vyc29yLmxpbmUpO1xuICAgICAgICAgICAgIGNtLnNldEN1cnNvcihjdXJzb3IpO1xuICAgICAgICAgICAgIGN1cnNvckNvb3JkcyA9IGNtLmNoYXJDb29yZHMoY3Vyc29yLCAnbG9jYWwnKTtcbiAgICAgICAgICAgICBjbS5zY3JvbGxUbyhcbiAgICAgICAgICAgICAgICAgbnVsbCwgY3Vyc29yQ29vcmRzLmJvdHRvbSAtIGNtLmdldFNjcm9sbEluZm8oKS5jbGllbnRIZWlnaHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgLy8gQ3Vyc29yIHN0YXlzIHdpdGhpbiBib3VuZHMuICBKdXN0IHJlcG9zaXRpb24gdGhlIHNjcm9sbCB3aW5kb3cuXG4gICAgICAgICAgICAgY20uc2Nyb2xsVG8obnVsbCwgbmV3UG9zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzY3JvbGxUb0N1cnNvcjogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIGxpbmVOdW0gPSBjbS5nZXRDdXJzb3IoKS5saW5lO1xuICAgICAgICB2YXIgY2hhckNvb3JkcyA9IGNtLmNoYXJDb29yZHMobmV3IFBvcyhsaW5lTnVtLCAwKSwgJ2xvY2FsJyk7XG4gICAgICAgIHZhciBoZWlnaHQgPSBjbS5nZXRTY3JvbGxJbmZvKCkuY2xpZW50SGVpZ2h0O1xuICAgICAgICB2YXIgeSA9IGNoYXJDb29yZHMudG9wO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbkFyZ3MucG9zaXRpb24pIHtcbiAgICAgICAgICBjYXNlICdjZW50ZXInOiB5ID0gY2hhckNvb3Jkcy5ib3R0b20gLSBoZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgIHZhciBsaW5lTGFzdENoYXJQb3MgPSBuZXcgUG9zKGxpbmVOdW0sIGNtLmdldExpbmUobGluZU51bSkubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB2YXIgbGluZUxhc3RDaGFyQ29vcmRzID0gY20uY2hhckNvb3JkcyhsaW5lTGFzdENoYXJQb3MsICdsb2NhbCcpO1xuICAgICAgICAgICAgdmFyIGxpbmVIZWlnaHQgPSBsaW5lTGFzdENoYXJDb29yZHMuYm90dG9tIC0geTtcbiAgICAgICAgICAgIHkgPSB5IC0gaGVpZ2h0ICsgbGluZUhlaWdodFxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY20uc2Nyb2xsVG8obnVsbCwgeSk7XG4gICAgICB9LFxuICAgICAgcmVwbGF5TWFjcm86IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIHJlZ2lzdGVyTmFtZSA9IGFjdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXI7XG4gICAgICAgIHZhciByZXBlYXQgPSBhY3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICAgIGlmIChyZWdpc3Rlck5hbWUgPT0gJ0AnKSB7XG4gICAgICAgICAgcmVnaXN0ZXJOYW1lID0gbWFjcm9Nb2RlU3RhdGUubGF0ZXN0UmVnaXN0ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFjcm9Nb2RlU3RhdGUubGF0ZXN0UmVnaXN0ZXIgPSByZWdpc3Rlck5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUocmVwZWF0LS0pe1xuICAgICAgICAgIGV4ZWN1dGVNYWNyb1JlZ2lzdGVyKGNtLCB2aW0sIG1hY3JvTW9kZVN0YXRlLCByZWdpc3Rlck5hbWUpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZW50ZXJNYWNyb1JlY29yZE1vZGU6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciBtYWNyb01vZGVTdGF0ZSA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlO1xuICAgICAgICB2YXIgcmVnaXN0ZXJOYW1lID0gYWN0aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlcjtcbiAgICAgICAgaWYgKHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5pc1ZhbGlkUmVnaXN0ZXIocmVnaXN0ZXJOYW1lKSkge1xuICAgICAgICAgIG1hY3JvTW9kZVN0YXRlLmVudGVyTWFjcm9SZWNvcmRNb2RlKGNtLCByZWdpc3Rlck5hbWUpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdG9nZ2xlT3ZlcndyaXRlOiBmdW5jdGlvbihjbSkge1xuICAgICAgICBpZiAoIWNtLnN0YXRlLm92ZXJ3cml0ZSkge1xuICAgICAgICAgIGNtLnRvZ2dsZU92ZXJ3cml0ZSh0cnVlKTtcbiAgICAgICAgICBjbS5zZXRPcHRpb24oJ2tleU1hcCcsICd2aW0tcmVwbGFjZScpO1xuICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJyZXBsYWNlXCJ9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbS50b2dnbGVPdmVyd3JpdGUoZmFsc2UpO1xuICAgICAgICAgIGNtLnNldE9wdGlvbigna2V5TWFwJywgJ3ZpbS1pbnNlcnQnKTtcbiAgICAgICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwge21vZGU6IFwiaW5zZXJ0XCJ9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGVudGVySW5zZXJ0TW9kZTogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICBpZiAoY20uZ2V0T3B0aW9uKCdyZWFkT25seScpKSB7IHJldHVybjsgfVxuICAgICAgICB2aW0uaW5zZXJ0TW9kZSA9IHRydWU7XG4gICAgICAgIHZpbS5pbnNlcnRNb2RlUmVwZWF0ID0gYWN0aW9uQXJncyAmJiBhY3Rpb25BcmdzLnJlcGVhdCB8fCAxO1xuICAgICAgICB2YXIgaW5zZXJ0QXQgPSAoYWN0aW9uQXJncykgPyBhY3Rpb25BcmdzLmluc2VydEF0IDogbnVsbDtcbiAgICAgICAgdmFyIHNlbCA9IHZpbS5zZWw7XG4gICAgICAgIHZhciBoZWFkID0gYWN0aW9uQXJncy5oZWFkIHx8IGNtLmdldEN1cnNvcignaGVhZCcpO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gY20ubGlzdFNlbGVjdGlvbnMoKS5sZW5ndGg7XG4gICAgICAgIGlmIChpbnNlcnRBdCA9PSAnZW9sJykge1xuICAgICAgICAgIGhlYWQgPSBuZXcgUG9zKGhlYWQubGluZSwgbGluZUxlbmd0aChjbSwgaGVhZC5saW5lKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5zZXJ0QXQgPT0gJ2JvbCcpIHtcbiAgICAgICAgICBoZWFkID0gbmV3IFBvcyhoZWFkLmxpbmUsIDApO1xuICAgICAgICB9IGVsc2UgaWYgKGluc2VydEF0ID09ICdjaGFyQWZ0ZXInKSB7XG4gICAgICAgICAgdmFyIG5ld1Bvc2l0aW9uID0gdXBkYXRlU2VsZWN0aW9uRm9yU3Vycm9nYXRlQ2hhcmFjdGVycyhjbSwgaGVhZCwgb2Zmc2V0Q3Vyc29yKGhlYWQsIDAsIDEpKTtcbiAgICAgICAgICBoZWFkID0gbmV3UG9zaXRpb24uZW5kO1xuICAgICAgICB9IGVsc2UgaWYgKGluc2VydEF0ID09ICdmaXJzdE5vbkJsYW5rJykge1xuICAgICAgICAgIHZhciBuZXdQb3NpdGlvbiA9IHVwZGF0ZVNlbGVjdGlvbkZvclN1cnJvZ2F0ZUNoYXJhY3RlcnMoY20sIGhlYWQsIG1vdGlvbnMubW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLCBoZWFkKSk7XG4gICAgICAgICAgaGVhZCA9IG5ld1Bvc2l0aW9uLmVuZDtcbiAgICAgICAgfSBlbHNlIGlmIChpbnNlcnRBdCA9PSAnc3RhcnRPZlNlbGVjdGVkQXJlYScpIHtcbiAgICAgICAgICBpZiAoIXZpbS52aXN1YWxNb2RlKVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgaWYgKCF2aW0udmlzdWFsQmxvY2spIHtcbiAgICAgICAgICAgIGlmIChzZWwuaGVhZC5saW5lIDwgc2VsLmFuY2hvci5saW5lKSB7XG4gICAgICAgICAgICAgIGhlYWQgPSBzZWwuaGVhZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGhlYWQgPSBuZXcgUG9zKHNlbC5hbmNob3IubGluZSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhlYWQgPSBuZXcgUG9zKFxuICAgICAgICAgICAgICAgIE1hdGgubWluKHNlbC5oZWFkLmxpbmUsIHNlbC5hbmNob3IubGluZSksXG4gICAgICAgICAgICAgICAgTWF0aC5taW4oc2VsLmhlYWQuY2gsIHNlbC5hbmNob3IuY2gpKTtcbiAgICAgICAgICAgIGhlaWdodCA9IE1hdGguYWJzKHNlbC5oZWFkLmxpbmUgLSBzZWwuYW5jaG9yLmxpbmUpICsgMTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaW5zZXJ0QXQgPT0gJ2VuZE9mU2VsZWN0ZWRBcmVhJykge1xuICAgICAgICAgICAgaWYgKCF2aW0udmlzdWFsTW9kZSlcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIGlmICghdmltLnZpc3VhbEJsb2NrKSB7XG4gICAgICAgICAgICBpZiAoc2VsLmhlYWQubGluZSA+PSBzZWwuYW5jaG9yLmxpbmUpIHtcbiAgICAgICAgICAgICAgaGVhZCA9IG9mZnNldEN1cnNvcihzZWwuaGVhZCwgMCwgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBoZWFkID0gbmV3IFBvcyhzZWwuYW5jaG9yLmxpbmUsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoZWFkID0gbmV3IFBvcyhcbiAgICAgICAgICAgICAgICBNYXRoLm1pbihzZWwuaGVhZC5saW5lLCBzZWwuYW5jaG9yLmxpbmUpLFxuICAgICAgICAgICAgICAgIE1hdGgubWF4KHNlbC5oZWFkLmNoLCBzZWwuYW5jaG9yLmNoKSArIDEpO1xuICAgICAgICAgICAgaGVpZ2h0ID0gTWF0aC5hYnMoc2VsLmhlYWQubGluZSAtIHNlbC5hbmNob3IubGluZSkgKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpbnNlcnRBdCA9PSAnaW5wbGFjZScpIHtcbiAgICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpbnNlcnRBdCA9PSAnbGFzdEVkaXQnKSB7XG4gICAgICAgICAgaGVhZCA9IGdldExhc3RFZGl0UG9zKGNtKSB8fCBoZWFkO1xuICAgICAgICB9XG4gICAgICAgIGNtLnNldE9wdGlvbignZGlzYWJsZUlucHV0JywgZmFsc2UpO1xuICAgICAgICBpZiAoYWN0aW9uQXJncyAmJiBhY3Rpb25BcmdzLnJlcGxhY2UpIHtcbiAgICAgICAgICAvLyBIYW5kbGUgUmVwbGFjZS1tb2RlIGFzIGEgc3BlY2lhbCBjYXNlIG9mIGluc2VydCBtb2RlLlxuICAgICAgICAgIGNtLnRvZ2dsZU92ZXJ3cml0ZSh0cnVlKTtcbiAgICAgICAgICBjbS5zZXRPcHRpb24oJ2tleU1hcCcsICd2aW0tcmVwbGFjZScpO1xuICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJyZXBsYWNlXCJ9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbS50b2dnbGVPdmVyd3JpdGUoZmFsc2UpO1xuICAgICAgICAgIGNtLnNldE9wdGlvbigna2V5TWFwJywgJ3ZpbS1pbnNlcnQnKTtcbiAgICAgICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwge21vZGU6IFwiaW5zZXJ0XCJ9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlLmlzUGxheWluZykge1xuICAgICAgICAgIC8vIE9ubHkgcmVjb3JkIGlmIG5vdCByZXBsYXlpbmcuXG4gICAgICAgICAgY20ub24oJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICAgICAgICBpZiAodmltLmluc2VydEVuZCkgdmltLmluc2VydEVuZC5jbGVhcigpO1xuICAgICAgICAgIHZpbS5pbnNlcnRFbmQgPSBjbS5zZXRCb29rbWFyayhoZWFkLCB7aW5zZXJ0TGVmdDogdHJ1ZX0pO1xuICAgICAgICAgIENvZGVNaXJyb3Iub24oY20uZ2V0SW5wdXRGaWVsZCgpLCAna2V5ZG93bicsIG9uS2V5RXZlbnRUYXJnZXRLZXlEb3duKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICBleGl0VmlzdWFsTW9kZShjbSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0Rm9ySW5zZXJ0KGNtLCBoZWFkLCBoZWlnaHQpO1xuICAgICAgfSxcbiAgICAgIHRvZ2dsZVZpc3VhbE1vZGU6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIHJlcGVhdCA9IGFjdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICB2YXIgYW5jaG9yID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgIHZhciBoZWFkO1xuICAgICAgICAvLyBUT0RPOiBUaGUgcmVwZWF0IHNob3VsZCBhY3R1YWxseSBzZWxlY3QgbnVtYmVyIG9mIGNoYXJhY3RlcnMvbGluZXNcbiAgICAgICAgLy8gICAgIGVxdWFsIHRvIHRoZSByZXBlYXQgdGltZXMgdGhlIHNpemUgb2YgdGhlIHByZXZpb3VzIHZpc3VhbFxuICAgICAgICAvLyAgICAgb3BlcmF0aW9uLlxuICAgICAgICBpZiAoIXZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgLy8gRW50ZXJpbmcgdmlzdWFsIG1vZGVcbiAgICAgICAgICB2aW0udmlzdWFsTW9kZSA9IHRydWU7XG4gICAgICAgICAgdmltLnZpc3VhbExpbmUgPSAhIWFjdGlvbkFyZ3MubGluZXdpc2U7XG4gICAgICAgICAgdmltLnZpc3VhbEJsb2NrID0gISFhY3Rpb25BcmdzLmJsb2Nrd2lzZTtcbiAgICAgICAgICBoZWFkID0gY2xpcEN1cnNvclRvQ29udGVudChcbiAgICAgICAgICAgICAgY20sIG5ldyBQb3MoYW5jaG9yLmxpbmUsIGFuY2hvci5jaCArIHJlcGVhdCAtIDEpKTtcbiAgICAgICAgICB2YXIgbmV3UG9zaXRpb24gPSB1cGRhdGVTZWxlY3Rpb25Gb3JTdXJyb2dhdGVDaGFyYWN0ZXJzKGNtLCBhbmNob3IsIGhlYWQpXG4gICAgICAgICAgdmltLnNlbCA9IHtcbiAgICAgICAgICAgIGFuY2hvcjogbmV3UG9zaXRpb24uc3RhcnQsXG4gICAgICAgICAgICBoZWFkOiBuZXdQb3NpdGlvbi5lbmRcbiAgICAgICAgICB9O1xuICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJ2aXN1YWxcIiwgc3ViTW9kZTogdmltLnZpc3VhbExpbmUgPyBcImxpbmV3aXNlXCIgOiB2aW0udmlzdWFsQmxvY2sgPyBcImJsb2Nrd2lzZVwiIDogXCJcIn0pO1xuICAgICAgICAgIHVwZGF0ZUNtU2VsZWN0aW9uKGNtKTtcbiAgICAgICAgICB1cGRhdGVNYXJrKGNtLCB2aW0sICc8JywgY3Vyc29yTWluKGFuY2hvciwgaGVhZCkpO1xuICAgICAgICAgIHVwZGF0ZU1hcmsoY20sIHZpbSwgJz4nLCBjdXJzb3JNYXgoYW5jaG9yLCBoZWFkKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmltLnZpc3VhbExpbmUgXiBhY3Rpb25BcmdzLmxpbmV3aXNlIHx8XG4gICAgICAgICAgICB2aW0udmlzdWFsQmxvY2sgXiBhY3Rpb25BcmdzLmJsb2Nrd2lzZSkge1xuICAgICAgICAgIC8vIFRvZ2dsaW5nIGJldHdlZW4gbW9kZXNcbiAgICAgICAgICB2aW0udmlzdWFsTGluZSA9ICEhYWN0aW9uQXJncy5saW5ld2lzZTtcbiAgICAgICAgICB2aW0udmlzdWFsQmxvY2sgPSAhIWFjdGlvbkFyZ3MuYmxvY2t3aXNlO1xuICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJ2aXN1YWxcIiwgc3ViTW9kZTogdmltLnZpc3VhbExpbmUgPyBcImxpbmV3aXNlXCIgOiB2aW0udmlzdWFsQmxvY2sgPyBcImJsb2Nrd2lzZVwiIDogXCJcIn0pO1xuICAgICAgICAgIHVwZGF0ZUNtU2VsZWN0aW9uKGNtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleGl0VmlzdWFsTW9kZShjbSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZXNlbGVjdExhc3RTZWxlY3Rpb246IGZ1bmN0aW9uKGNtLCBfYWN0aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciBsYXN0U2VsZWN0aW9uID0gdmltLmxhc3RTZWxlY3Rpb247XG4gICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgIHVwZGF0ZUxhc3RTZWxlY3Rpb24oY20sIHZpbSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RTZWxlY3Rpb24pIHtcbiAgICAgICAgICB2YXIgYW5jaG9yID0gbGFzdFNlbGVjdGlvbi5hbmNob3JNYXJrLmZpbmQoKTtcbiAgICAgICAgICB2YXIgaGVhZCA9IGxhc3RTZWxlY3Rpb24uaGVhZE1hcmsuZmluZCgpO1xuICAgICAgICAgIGlmICghYW5jaG9yIHx8ICFoZWFkKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgbWFya3MgaGF2ZSBiZWVuIGRlc3Ryb3llZCBkdWUgdG8gZWRpdHMsIGRvIG5vdGhpbmcuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZpbS5zZWwgPSB7XG4gICAgICAgICAgICBhbmNob3I6IGFuY2hvcixcbiAgICAgICAgICAgIGhlYWQ6IGhlYWRcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZpbS52aXN1YWxNb2RlID0gdHJ1ZTtcbiAgICAgICAgICB2aW0udmlzdWFsTGluZSA9IGxhc3RTZWxlY3Rpb24udmlzdWFsTGluZTtcbiAgICAgICAgICB2aW0udmlzdWFsQmxvY2sgPSBsYXN0U2VsZWN0aW9uLnZpc3VhbEJsb2NrO1xuICAgICAgICAgIHVwZGF0ZUNtU2VsZWN0aW9uKGNtKTtcbiAgICAgICAgICB1cGRhdGVNYXJrKGNtLCB2aW0sICc8JywgY3Vyc29yTWluKGFuY2hvciwgaGVhZCkpO1xuICAgICAgICAgIHVwZGF0ZU1hcmsoY20sIHZpbSwgJz4nLCBjdXJzb3JNYXgoYW5jaG9yLCBoZWFkKSk7XG4gICAgICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sICd2aW0tbW9kZS1jaGFuZ2UnLCB7XG4gICAgICAgICAgICBtb2RlOiAndmlzdWFsJyxcbiAgICAgICAgICAgIHN1Yk1vZGU6IHZpbS52aXN1YWxMaW5lID8gJ2xpbmV3aXNlJyA6XG4gICAgICAgICAgICAgICAgICAgICB2aW0udmlzdWFsQmxvY2sgPyAnYmxvY2t3aXNlJyA6ICcnfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBqb2luTGluZXM6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIGN1clN0YXJ0LCBjdXJFbmQ7XG4gICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgIGN1clN0YXJ0ID0gY20uZ2V0Q3Vyc29yKCdhbmNob3InKTtcbiAgICAgICAgICBjdXJFbmQgPSBjbS5nZXRDdXJzb3IoJ2hlYWQnKTtcbiAgICAgICAgICBpZiAoY3Vyc29ySXNCZWZvcmUoY3VyRW5kLCBjdXJTdGFydCkpIHtcbiAgICAgICAgICAgIHZhciB0bXAgPSBjdXJFbmQ7XG4gICAgICAgICAgICBjdXJFbmQgPSBjdXJTdGFydDtcbiAgICAgICAgICAgIGN1clN0YXJ0ID0gdG1wO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJFbmQuY2ggPSBsaW5lTGVuZ3RoKGNtLCBjdXJFbmQubGluZSkgLSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFJlcGVhdCBpcyB0aGUgbnVtYmVyIG9mIGxpbmVzIHRvIGpvaW4uIE1pbmltdW0gMiBsaW5lcy5cbiAgICAgICAgICB2YXIgcmVwZWF0ID0gTWF0aC5tYXgoYWN0aW9uQXJncy5yZXBlYXQsIDIpO1xuICAgICAgICAgIGN1clN0YXJ0ID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgY3VyRW5kID0gY2xpcEN1cnNvclRvQ29udGVudChjbSwgbmV3IFBvcyhjdXJTdGFydC5saW5lICsgcmVwZWF0IC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW5maW5pdHkpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZmluYWxDaCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSBjdXJTdGFydC5saW5lOyBpIDwgY3VyRW5kLmxpbmU7IGkrKykge1xuICAgICAgICAgIGZpbmFsQ2ggPSBsaW5lTGVuZ3RoKGNtLCBjdXJTdGFydC5saW5lKTtcbiAgICAgICAgICB2YXIgdGV4dCA9ICcnO1xuICAgICAgICAgIHZhciBuZXh0U3RhcnRDaCA9IDA7XG4gICAgICAgICAgaWYgKCFhY3Rpb25BcmdzLmtlZXBTcGFjZXMpIHtcbiAgICAgICAgICAgIHZhciBuZXh0TGluZSA9IGNtLmdldExpbmUoY3VyU3RhcnQubGluZSArIDEpO1xuICAgICAgICAgICAgbmV4dFN0YXJ0Q2ggPSBuZXh0TGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKG5leHRTdGFydENoID09IC0xKSB7XG4gICAgICAgICAgICAgIG5leHRTdGFydENoID0gbmV4dExpbmUubGVuZ3RoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGV4dCA9IFwiIFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UodGV4dCwgXG4gICAgICAgICAgICBuZXcgUG9zKGN1clN0YXJ0LmxpbmUsIGZpbmFsQ2gpLFxuICAgICAgICAgICAgbmV3IFBvcyhjdXJTdGFydC5saW5lICsgMSwgbmV4dFN0YXJ0Q2gpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY3VyRmluYWxQb3MgPSBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBuZXcgUG9zKGN1clN0YXJ0LmxpbmUsIGZpbmFsQ2gpKTtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgZXhpdFZpc3VhbE1vZGUoY20sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBjbS5zZXRDdXJzb3IoY3VyRmluYWxQb3MpO1xuICAgICAgfSxcbiAgICAgIG5ld0xpbmVBbmRFbnRlckluc2VydE1vZGU6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmltLmluc2VydE1vZGUgPSB0cnVlO1xuICAgICAgICB2YXIgaW5zZXJ0QXQgPSBjb3B5Q3Vyc29yKGNtLmdldEN1cnNvcigpKTtcbiAgICAgICAgaWYgKGluc2VydEF0LmxpbmUgPT09IGNtLmZpcnN0TGluZSgpICYmICFhY3Rpb25BcmdzLmFmdGVyKSB7XG4gICAgICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciBpbnNlcnRpbmcgbmV3bGluZSBiZWZvcmUgc3RhcnQgb2YgZG9jdW1lbnQuXG4gICAgICAgICAgY20ucmVwbGFjZVJhbmdlKCdcXG4nLCBuZXcgUG9zKGNtLmZpcnN0TGluZSgpLCAwKSk7XG4gICAgICAgICAgY20uc2V0Q3Vyc29yKGNtLmZpcnN0TGluZSgpLCAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnNlcnRBdC5saW5lID0gKGFjdGlvbkFyZ3MuYWZ0ZXIpID8gaW5zZXJ0QXQubGluZSA6XG4gICAgICAgICAgICAgIGluc2VydEF0LmxpbmUgLSAxO1xuICAgICAgICAgIGluc2VydEF0LmNoID0gbGluZUxlbmd0aChjbSwgaW5zZXJ0QXQubGluZSk7XG4gICAgICAgICAgY20uc2V0Q3Vyc29yKGluc2VydEF0KTtcbiAgICAgICAgICB2YXIgbmV3bGluZUZuID0gQ29kZU1pcnJvci5jb21tYW5kcy5uZXdsaW5lQW5kSW5kZW50Q29udGludWVDb21tZW50IHx8XG4gICAgICAgICAgICAgIENvZGVNaXJyb3IuY29tbWFuZHMubmV3bGluZUFuZEluZGVudDtcbiAgICAgICAgICBuZXdsaW5lRm4oY20pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW50ZXJJbnNlcnRNb2RlKGNtLCB7IHJlcGVhdDogYWN0aW9uQXJncy5yZXBlYXQgfSwgdmltKTtcbiAgICAgIH0sXG4gICAgICBwYXN0ZTogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgcmVnaXN0ZXIgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIuZ2V0UmVnaXN0ZXIoXG4gICAgICAgICAgICBhY3Rpb25BcmdzLnJlZ2lzdGVyTmFtZSk7XG4gICAgICAgIHZhciBmYWxsYmFjayA9ICgpID0+IHtcbiAgICAgICAgICB2YXIgdGV4dCA9IHJlZ2lzdGVyLnRvU3RyaW5nKCk7XG4gICAgICAgICAgdGhpcy5jb250aW51ZVBhc3RlKGNtLCBhY3Rpb25BcmdzLCB2aW0sIHRleHQsIHJlZ2lzdGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aW9uQXJncy5yZWdpc3Rlck5hbWUgPT09ICcrJyAmJlxuICAgICAgICAgICAgICB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICB0eXBlb2YgbmF2aWdhdG9yLmNsaXBib2FyZCAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgdHlwZW9mIG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLnJlYWRUZXh0KCkudGhlbigodmFsdWUpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY29udGludWVQYXN0ZShjbSwgYWN0aW9uQXJncywgdmltLCB2YWx1ZSwgcmVnaXN0ZXIpO1xuICAgICAgICAgIH0sICgpID0+IHsgZmFsbGJhY2soKSB9KVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZhbGxiYWNrKClcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbnRpbnVlUGFzdGU6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0sIHRleHQsIHJlZ2lzdGVyKSB7XG4gICAgICAgIHZhciBjdXIgPSBjb3B5Q3Vyc29yKGNtLmdldEN1cnNvcigpKTtcbiAgICAgICAgaWYgKCF0ZXh0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhY3Rpb25BcmdzLm1hdGNoSW5kZW50KSB7XG4gICAgICAgICAgdmFyIHRhYlNpemUgPSBjbS5nZXRPcHRpb24oXCJ0YWJTaXplXCIpO1xuICAgICAgICAgIC8vIGxlbmd0aCB0aGF0IGNvbnNpZGVycyB0YWJzIGFuZCB0YWJTaXplXG4gICAgICAgICAgdmFyIHdoaXRlc3BhY2VMZW5ndGggPSBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgIHZhciB0YWJzID0gKHN0ci5zcGxpdChcIlxcdFwiKS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIHZhciBzcGFjZXMgPSAoc3RyLnNwbGl0KFwiIFwiKS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIHJldHVybiB0YWJzICogdGFiU2l6ZSArIHNwYWNlcyAqIDE7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB2YXIgY3VycmVudExpbmUgPSBjbS5nZXRMaW5lKGNtLmdldEN1cnNvcigpLmxpbmUpO1xuICAgICAgICAgIHZhciBpbmRlbnQgPSB3aGl0ZXNwYWNlTGVuZ3RoKGN1cnJlbnRMaW5lLm1hdGNoKC9eXFxzKi8pWzBdKTtcbiAgICAgICAgICAvLyBjaG9tcCBsYXN0IG5ld2xpbmUgYi9jIGRvbid0IHdhbnQgaXQgdG8gbWF0Y2ggL15cXHMqL2dtXG4gICAgICAgICAgdmFyIGNob21wZWRUZXh0ID0gdGV4dC5yZXBsYWNlKC9cXG4kLywgJycpO1xuICAgICAgICAgIHZhciB3YXNDaG9tcGVkID0gdGV4dCAhPT0gY2hvbXBlZFRleHQ7XG4gICAgICAgICAgdmFyIGZpcnN0SW5kZW50ID0gd2hpdGVzcGFjZUxlbmd0aCh0ZXh0Lm1hdGNoKC9eXFxzKi8pWzBdKTtcbiAgICAgICAgICB2YXIgdGV4dCA9IGNob21wZWRUZXh0LnJlcGxhY2UoL15cXHMqL2dtLCBmdW5jdGlvbih3c3BhY2UpIHtcbiAgICAgICAgICAgIHZhciBuZXdJbmRlbnQgPSBpbmRlbnQgKyAod2hpdGVzcGFjZUxlbmd0aCh3c3BhY2UpIC0gZmlyc3RJbmRlbnQpO1xuICAgICAgICAgICAgaWYgKG5ld0luZGVudCA8IDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChjbS5nZXRPcHRpb24oXCJpbmRlbnRXaXRoVGFic1wiKSkge1xuICAgICAgICAgICAgICB2YXIgcXVvdGllbnQgPSBNYXRoLmZsb29yKG5ld0luZGVudCAvIHRhYlNpemUpO1xuICAgICAgICAgICAgICByZXR1cm4gQXJyYXkocXVvdGllbnQgKyAxKS5qb2luKCdcXHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gQXJyYXkobmV3SW5kZW50ICsgMSkuam9pbignICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRleHQgKz0gd2FzQ2hvbXBlZCA/IFwiXFxuXCIgOiBcIlwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhY3Rpb25BcmdzLnJlcGVhdCA+IDEpIHtcbiAgICAgICAgICB2YXIgdGV4dCA9IEFycmF5KGFjdGlvbkFyZ3MucmVwZWF0ICsgMSkuam9pbih0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGluZXdpc2UgPSByZWdpc3Rlci5saW5ld2lzZTtcbiAgICAgICAgdmFyIGJsb2Nrd2lzZSA9IHJlZ2lzdGVyLmJsb2Nrd2lzZTtcbiAgICAgICAgaWYgKGJsb2Nrd2lzZSkge1xuICAgICAgICAgIHRleHQgPSB0ZXh0LnNwbGl0KCdcXG4nKTtcbiAgICAgICAgICBpZiAobGluZXdpc2UpIHtcbiAgICAgICAgICAgIHRleHQucG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGV4dFtpXSA9ICh0ZXh0W2ldID09ICcnKSA/ICcgJyA6IHRleHRbaV07XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1ci5jaCArPSBhY3Rpb25BcmdzLmFmdGVyID8gMSA6IDA7XG4gICAgICAgICAgY3VyLmNoID0gTWF0aC5taW4obGluZUxlbmd0aChjbSwgY3VyLmxpbmUpLCBjdXIuY2gpO1xuICAgICAgICB9IGVsc2UgaWYgKGxpbmV3aXNlKSB7XG4gICAgICAgICAgaWYodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIHRleHQgPSB2aW0udmlzdWFsTGluZSA/IHRleHQuc2xpY2UoMCwgLTEpIDogJ1xcbicgKyB0ZXh0LnNsaWNlKDAsIHRleHQubGVuZ3RoIC0gMSkgKyAnXFxuJztcbiAgICAgICAgICB9IGVsc2UgaWYgKGFjdGlvbkFyZ3MuYWZ0ZXIpIHtcbiAgICAgICAgICAgIC8vIE1vdmUgdGhlIG5ld2xpbmUgYXQgdGhlIGVuZCB0byB0aGUgc3RhcnQgaW5zdGVhZCwgYW5kIHBhc3RlIGp1c3RcbiAgICAgICAgICAgIC8vIGJlZm9yZSB0aGUgbmV3bGluZSBjaGFyYWN0ZXIgb2YgdGhlIGxpbmUgd2UgYXJlIG9uIHJpZ2h0IG5vdy5cbiAgICAgICAgICAgIHRleHQgPSAnXFxuJyArIHRleHQuc2xpY2UoMCwgdGV4dC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIGN1ci5jaCA9IGxpbmVMZW5ndGgoY20sIGN1ci5saW5lKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VyLmNoID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VyLmNoICs9IGFjdGlvbkFyZ3MuYWZ0ZXIgPyAxIDogMDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY3VyUG9zRmluYWw7XG4gICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgIC8vICBzYXZlIHRoZSBwYXN0ZWQgdGV4dCBmb3IgcmVzZWxlY3Rpb24gaWYgdGhlIG5lZWQgYXJpc2VzXG4gICAgICAgICAgdmltLmxhc3RQYXN0ZWRUZXh0ID0gdGV4dDtcbiAgICAgICAgICB2YXIgbGFzdFNlbGVjdGlvbkN1ckVuZDtcbiAgICAgICAgICB2YXIgc2VsZWN0ZWRBcmVhID0gZ2V0U2VsZWN0ZWRBcmVhUmFuZ2UoY20sIHZpbSk7XG4gICAgICAgICAgdmFyIHNlbGVjdGlvblN0YXJ0ID0gc2VsZWN0ZWRBcmVhWzBdO1xuICAgICAgICAgIHZhciBzZWxlY3Rpb25FbmQgPSBzZWxlY3RlZEFyZWFbMV07XG4gICAgICAgICAgdmFyIHNlbGVjdGVkVGV4dCA9IGNtLmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgIHZhciBzZWxlY3Rpb25zID0gY20ubGlzdFNlbGVjdGlvbnMoKTtcbiAgICAgICAgICB2YXIgZW1wdHlTdHJpbmdzID0gbmV3IEFycmF5KHNlbGVjdGlvbnMubGVuZ3RoKS5qb2luKCcxJykuc3BsaXQoJzEnKTtcbiAgICAgICAgICAvLyBzYXZlIHRoZSBjdXJFbmQgbWFya2VyIGJlZm9yZSBpdCBnZXQgY2xlYXJlZCBkdWUgdG8gY20ucmVwbGFjZVJhbmdlLlxuICAgICAgICAgIGlmICh2aW0ubGFzdFNlbGVjdGlvbikge1xuICAgICAgICAgICAgbGFzdFNlbGVjdGlvbkN1ckVuZCA9IHZpbS5sYXN0U2VsZWN0aW9uLmhlYWRNYXJrLmZpbmQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcHVzaCB0aGUgcHJldmlvdXNseSBzZWxlY3RlZCB0ZXh0IHRvIHVubmFtZWQgcmVnaXN0ZXJcbiAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIudW5uYW1lZFJlZ2lzdGVyLnNldFRleHQoc2VsZWN0ZWRUZXh0KTtcbiAgICAgICAgICBpZiAoYmxvY2t3aXNlKSB7XG4gICAgICAgICAgICAvLyBmaXJzdCBkZWxldGUgdGhlIHNlbGVjdGVkIHRleHRcbiAgICAgICAgICAgIGNtLnJlcGxhY2VTZWxlY3Rpb25zKGVtcHR5U3RyaW5ncyk7XG4gICAgICAgICAgICAvLyBTZXQgbmV3IHNlbGVjdGlvbnMgYXMgcGVyIHRoZSBibG9jayBsZW5ndGggb2YgdGhlIHlhbmtlZCB0ZXh0XG4gICAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBuZXcgUG9zKHNlbGVjdGlvblN0YXJ0LmxpbmUgKyB0ZXh0Lmxlbmd0aC0xLCBzZWxlY3Rpb25TdGFydC5jaCk7XG4gICAgICAgICAgICBjbS5zZXRDdXJzb3Ioc2VsZWN0aW9uU3RhcnQpO1xuICAgICAgICAgICAgc2VsZWN0QmxvY2soY20sIHNlbGVjdGlvbkVuZCk7XG4gICAgICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9ucyh0ZXh0KTtcbiAgICAgICAgICAgIGN1clBvc0ZpbmFsID0gc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgfSBlbHNlIGlmICh2aW0udmlzdWFsQmxvY2spIHtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VTZWxlY3Rpb25zKGVtcHR5U3RyaW5ncyk7XG4gICAgICAgICAgICBjbS5zZXRDdXJzb3Ioc2VsZWN0aW9uU3RhcnQpO1xuICAgICAgICAgICAgY20ucmVwbGFjZVJhbmdlKHRleHQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25TdGFydCk7XG4gICAgICAgICAgICBjdXJQb3NGaW5hbCA9IHNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UodGV4dCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCk7XG4gICAgICAgICAgICBjdXJQb3NGaW5hbCA9IGNtLnBvc0Zyb21JbmRleChjbS5pbmRleEZyb21Qb3Moc2VsZWN0aW9uU3RhcnQpICsgdGV4dC5sZW5ndGggLSAxKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gcmVzdG9yZSB0aGUgdGhlIGN1ckVuZCBtYXJrZXJcbiAgICAgICAgICBpZihsYXN0U2VsZWN0aW9uQ3VyRW5kKSB7XG4gICAgICAgICAgICB2aW0ubGFzdFNlbGVjdGlvbi5oZWFkTWFyayA9IGNtLnNldEJvb2ttYXJrKGxhc3RTZWxlY3Rpb25DdXJFbmQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobGluZXdpc2UpIHtcbiAgICAgICAgICAgIGN1clBvc0ZpbmFsLmNoPTA7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChibG9ja3dpc2UpIHtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihjdXIpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBsaW5lID0gY3VyLmxpbmUraTtcbiAgICAgICAgICAgICAgaWYgKGxpbmUgPiBjbS5sYXN0TGluZSgpKSB7XG4gICAgICAgICAgICAgICAgY20ucmVwbGFjZVJhbmdlKCdcXG4nLCAgbmV3IFBvcyhsaW5lLCAwKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyIGxhc3RDaCA9IGxpbmVMZW5ndGgoY20sIGxpbmUpO1xuICAgICAgICAgICAgICBpZiAobGFzdENoIDwgY3VyLmNoKSB7XG4gICAgICAgICAgICAgICAgZXh0ZW5kTGluZVRvQ29sdW1uKGNtLCBsaW5lLCBjdXIuY2gpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbS5zZXRDdXJzb3IoY3VyKTtcbiAgICAgICAgICAgIHNlbGVjdEJsb2NrKGNtLCBuZXcgUG9zKGN1ci5saW5lICsgdGV4dC5sZW5ndGgtMSwgY3VyLmNoKSk7XG4gICAgICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9ucyh0ZXh0KTtcbiAgICAgICAgICAgIGN1clBvc0ZpbmFsID0gY3VyO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UodGV4dCwgY3VyKTtcbiAgICAgICAgICAgIC8vIE5vdyBmaW5lIHR1bmUgdGhlIGN1cnNvciB0byB3aGVyZSB3ZSB3YW50IGl0LlxuICAgICAgICAgICAgaWYgKGxpbmV3aXNlKSB7XG4gICAgICAgICAgICAgIHZhciBsaW5lID0gYWN0aW9uQXJncy5hZnRlciA/IGN1ci5saW5lICsgMSA6IGN1ci5saW5lO1xuICAgICAgICAgICAgICBjdXJQb3NGaW5hbCA9IG5ldyBQb3MobGluZSwgZmluZEZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbS5nZXRMaW5lKGxpbmUpKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjdXJQb3NGaW5hbCA9IGNvcHlDdXJzb3IoY3VyKTtcbiAgICAgICAgICAgICAgaWYgKCEvXFxuLy50ZXN0KHRleHQpKSB7XG4gICAgICAgICAgICAgICAgY3VyUG9zRmluYWwuY2ggKz0gdGV4dC5sZW5ndGggLSAoYWN0aW9uQXJncy5hZnRlciA/IDEgOiAwKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICBleGl0VmlzdWFsTW9kZShjbSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGNtLnNldEN1cnNvcihjdXJQb3NGaW5hbCk7XG4gICAgICB9LFxuICAgICAgdW5kbzogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MpIHtcbiAgICAgICAgY20ub3BlcmF0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJlcGVhdEZuKGNtLCBDb2RlTWlycm9yLmNvbW1hbmRzLnVuZG8sIGFjdGlvbkFyZ3MucmVwZWF0KSgpO1xuICAgICAgICAgIGNtLnNldEN1cnNvcihjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBjbS5nZXRDdXJzb3IoJ3N0YXJ0JykpKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgcmVkbzogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MpIHtcbiAgICAgICAgcmVwZWF0Rm4oY20sIENvZGVNaXJyb3IuY29tbWFuZHMucmVkbywgYWN0aW9uQXJncy5yZXBlYXQpKCk7XG4gICAgICB9LFxuICAgICAgc2V0UmVnaXN0ZXI6IGZ1bmN0aW9uKF9jbSwgYWN0aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZpbS5pbnB1dFN0YXRlLnJlZ2lzdGVyTmFtZSA9IGFjdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXI7XG4gICAgICB9LFxuICAgICAgaW5zZXJ0UmVnaXN0ZXI6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIHJlZ2lzdGVyTmFtZSA9IGFjdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXI7XG4gICAgICAgIHZhciByZWdpc3RlciA9IHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5nZXRSZWdpc3RlcihyZWdpc3Rlck5hbWUpO1xuICAgICAgICB2YXIgdGV4dCA9IHJlZ2lzdGVyICYmIHJlZ2lzdGVyLnRvU3RyaW5nKCk7XG4gICAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbih0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9uZU5vcm1hbENvbW1hbmQ6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgZXhpdEluc2VydE1vZGUoY20sIHRydWUpO1xuICAgICAgICB2aW0uaW5zZXJ0TW9kZVJldHVybiA9IHRydWU7XG4gICAgICAgIENvZGVNaXJyb3Iub24oY20sICd2aW0tY29tbWFuZC1kb25lJywgZnVuY3Rpb24gaGFuZGxlcigpIHtcbiAgICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHJldHVybjtcbiAgICAgICAgICBpZiAodmltLmluc2VydE1vZGVSZXR1cm4pIHtcbiAgICAgICAgICAgIHZpbS5pbnNlcnRNb2RlUmV0dXJuID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoIXZpbS5pbnNlcnRNb2RlKSB7XG4gICAgICAgICAgICAgIGFjdGlvbnMuZW50ZXJJbnNlcnRNb2RlKGNtLCB7fSwgdmltKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgQ29kZU1pcnJvci5vZmYoY20sICd2aW0tY29tbWFuZC1kb25lJywgaGFuZGxlcik7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHNldE1hcms6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIG1hcmtOYW1lID0gYWN0aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlcjtcbiAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCBtYXJrTmFtZSwgY20uZ2V0Q3Vyc29yKCkpO1xuICAgICAgfSxcbiAgICAgIHJlcGxhY2U6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIHJlcGxhY2VXaXRoID0gYWN0aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlcjtcbiAgICAgICAgdmFyIGN1clN0YXJ0ID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgIHZhciByZXBsYWNlVG87XG4gICAgICAgIHZhciBjdXJFbmQ7XG4gICAgICAgIHZhciBzZWxlY3Rpb25zID0gY20ubGlzdFNlbGVjdGlvbnMoKTtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgY3VyU3RhcnQgPSBjbS5nZXRDdXJzb3IoJ3N0YXJ0Jyk7XG4gICAgICAgICAgY3VyRW5kID0gY20uZ2V0Q3Vyc29yKCdlbmQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUoY3VyU3RhcnQubGluZSk7XG4gICAgICAgICAgcmVwbGFjZVRvID0gY3VyU3RhcnQuY2ggKyBhY3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgICBpZiAocmVwbGFjZVRvID4gbGluZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlcGxhY2VUbz1saW5lLmxlbmd0aDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VyRW5kID0gbmV3IFBvcyhjdXJTdGFydC5saW5lLCByZXBsYWNlVG8pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5ld1Bvc2l0aW9ucyA9IHVwZGF0ZVNlbGVjdGlvbkZvclN1cnJvZ2F0ZUNoYXJhY3RlcnMoY20sIGN1clN0YXJ0LCBjdXJFbmQpO1xuICAgICAgICBjdXJTdGFydCA9IG5ld1Bvc2l0aW9ucy5zdGFydDtcbiAgICAgICAgY3VyRW5kID0gbmV3UG9zaXRpb25zLmVuZDtcbiAgICAgICAgaWYgKHJlcGxhY2VXaXRoPT0nXFxuJykge1xuICAgICAgICAgIGlmICghdmltLnZpc3VhbE1vZGUpIGNtLnJlcGxhY2VSYW5nZSgnJywgY3VyU3RhcnQsIGN1ckVuZCk7XG4gICAgICAgICAgLy8gc3BlY2lhbCBjYXNlLCB3aGVyZSB2aW0gaGVscCBzYXlzIHRvIHJlcGxhY2UgYnkganVzdCBvbmUgbGluZS1icmVha1xuICAgICAgICAgIChDb2RlTWlycm9yLmNvbW1hbmRzLm5ld2xpbmVBbmRJbmRlbnRDb250aW51ZUNvbW1lbnQgfHwgQ29kZU1pcnJvci5jb21tYW5kcy5uZXdsaW5lQW5kSW5kZW50KShjbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHJlcGxhY2VXaXRoU3RyID0gY20uZ2V0UmFuZ2UoY3VyU3RhcnQsIGN1ckVuZCk7XG4gICAgICAgICAgLy8gcmVwbGFjZSBhbGwgc3Vycm9nYXRlIGNoYXJhY3RlcnMgd2l0aCBzZWxlY3RlZCBjaGFyYWN0ZXJcbiAgICAgICAgICByZXBsYWNlV2l0aFN0ciA9IHJlcGxhY2VXaXRoU3RyLnJlcGxhY2UoL1tcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vZywgcmVwbGFjZVdpdGgpO1xuICAgICAgICAgIC8vcmVwbGFjZSBhbGwgY2hhcmFjdGVycyBpbiByYW5nZSBieSBzZWxlY3RlZCwgYnV0IGtlZXAgbGluZWJyZWFrc1xuICAgICAgICAgIHJlcGxhY2VXaXRoU3RyID0gcmVwbGFjZVdpdGhTdHIucmVwbGFjZSgvW15cXG5dL2csIHJlcGxhY2VXaXRoKTtcbiAgICAgICAgICBpZiAodmltLnZpc3VhbEJsb2NrKSB7XG4gICAgICAgICAgICAvLyBUYWJzIGFyZSBzcGxpdCBpbiB2aXN1YSBibG9jayBiZWZvcmUgcmVwbGFjaW5nXG4gICAgICAgICAgICB2YXIgc3BhY2VzID0gbmV3IEFycmF5KGNtLmdldE9wdGlvbihcInRhYlNpemVcIikrMSkuam9pbignICcpO1xuICAgICAgICAgICAgcmVwbGFjZVdpdGhTdHIgPSBjbS5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHJlcGxhY2VXaXRoU3RyID0gcmVwbGFjZVdpdGhTdHIucmVwbGFjZSgvW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS9nLCByZXBsYWNlV2l0aCk7XG4gICAgICAgICAgICByZXBsYWNlV2l0aFN0ciA9IHJlcGxhY2VXaXRoU3RyLnJlcGxhY2UoL1xcdC9nLCBzcGFjZXMpLnJlcGxhY2UoL1teXFxuXS9nLCByZXBsYWNlV2l0aCkuc3BsaXQoJ1xcbicpO1xuICAgICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbnMocmVwbGFjZVdpdGhTdHIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UocmVwbGFjZVdpdGhTdHIsIGN1clN0YXJ0LCBjdXJFbmQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIGN1clN0YXJ0ID0gY3Vyc29ySXNCZWZvcmUoc2VsZWN0aW9uc1swXS5hbmNob3IsIHNlbGVjdGlvbnNbMF0uaGVhZCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbnNbMF0uYW5jaG9yIDogc2VsZWN0aW9uc1swXS5oZWFkO1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGN1clN0YXJ0KTtcbiAgICAgICAgICAgIGV4aXRWaXN1YWxNb2RlKGNtLCBmYWxzZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihvZmZzZXRDdXJzb3IoY3VyRW5kLCAwLCAtMSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGluY3JlbWVudE51bWJlclRva2VuOiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncykge1xuICAgICAgICB2YXIgY3VyID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgIHZhciBsaW5lU3RyID0gY20uZ2V0TGluZShjdXIubGluZSk7XG4gICAgICAgIHZhciByZSA9IC8oLT8pKD86KDB4KShbXFxkYS1mXSspfCgwYnwwfCkoXFxkKykpL2dpO1xuICAgICAgICB2YXIgbWF0Y2g7XG4gICAgICAgIHZhciBzdGFydDtcbiAgICAgICAgdmFyIGVuZDtcbiAgICAgICAgdmFyIG51bWJlclN0cjtcbiAgICAgICAgd2hpbGUgKChtYXRjaCA9IHJlLmV4ZWMobGluZVN0cikpICE9PSBudWxsKSB7XG4gICAgICAgICAgc3RhcnQgPSBtYXRjaC5pbmRleDtcbiAgICAgICAgICBlbmQgPSBzdGFydCArIG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgICBpZiAoY3VyLmNoIDwgZW5kKWJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYWN0aW9uQXJncy5iYWNrdHJhY2sgJiYgKGVuZCA8PSBjdXIuY2gpKXJldHVybjtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgdmFyIGJhc2VTdHIgPSBtYXRjaFsyXSB8fCBtYXRjaFs0XVxuICAgICAgICAgIHZhciBkaWdpdHMgPSBtYXRjaFszXSB8fCBtYXRjaFs1XVxuICAgICAgICAgIHZhciBpbmNyZW1lbnQgPSBhY3Rpb25BcmdzLmluY3JlYXNlID8gMSA6IC0xO1xuICAgICAgICAgIHZhciBiYXNlID0geycwYic6IDIsICcwJzogOCwgJyc6IDEwLCAnMHgnOiAxNn1bYmFzZVN0ci50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgICB2YXIgbnVtYmVyID0gcGFyc2VJbnQobWF0Y2hbMV0gKyBkaWdpdHMsIGJhc2UpICsgKGluY3JlbWVudCAqIGFjdGlvbkFyZ3MucmVwZWF0KTtcbiAgICAgICAgICBudW1iZXJTdHIgPSBudW1iZXIudG9TdHJpbmcoYmFzZSk7XG4gICAgICAgICAgdmFyIHplcm9QYWRkaW5nID0gYmFzZVN0ciA/IG5ldyBBcnJheShkaWdpdHMubGVuZ3RoIC0gbnVtYmVyU3RyLmxlbmd0aCArIDEgKyBtYXRjaFsxXS5sZW5ndGgpLmpvaW4oJzAnKSA6ICcnXG4gICAgICAgICAgaWYgKG51bWJlclN0ci5jaGFyQXQoMCkgPT09ICctJykge1xuICAgICAgICAgICAgbnVtYmVyU3RyID0gJy0nICsgYmFzZVN0ciArIHplcm9QYWRkaW5nICsgbnVtYmVyU3RyLnN1YnN0cigxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbnVtYmVyU3RyID0gYmFzZVN0ciArIHplcm9QYWRkaW5nICsgbnVtYmVyU3RyO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgZnJvbSA9IG5ldyBQb3MoY3VyLmxpbmUsIHN0YXJ0KTtcbiAgICAgICAgICB2YXIgdG8gPSBuZXcgUG9zKGN1ci5saW5lLCBlbmQpO1xuICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZShudW1iZXJTdHIsIGZyb20sIHRvKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY20uc2V0Q3Vyc29yKG5ldyBQb3MoY3VyLmxpbmUsIHN0YXJ0ICsgbnVtYmVyU3RyLmxlbmd0aCAtIDEpKTtcbiAgICAgIH0sXG4gICAgICByZXBlYXRMYXN0RWRpdDogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgbGFzdEVkaXRJbnB1dFN0YXRlID0gdmltLmxhc3RFZGl0SW5wdXRTdGF0ZTtcbiAgICAgICAgaWYgKCFsYXN0RWRpdElucHV0U3RhdGUpIHsgcmV0dXJuOyB9XG4gICAgICAgIHZhciByZXBlYXQgPSBhY3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgaWYgKHJlcGVhdCAmJiBhY3Rpb25BcmdzLnJlcGVhdElzRXhwbGljaXQpIHtcbiAgICAgICAgICB2aW0ubGFzdEVkaXRJbnB1dFN0YXRlLnJlcGVhdE92ZXJyaWRlID0gcmVwZWF0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcGVhdCA9IHZpbS5sYXN0RWRpdElucHV0U3RhdGUucmVwZWF0T3ZlcnJpZGUgfHwgcmVwZWF0O1xuICAgICAgICB9XG4gICAgICAgIHJlcGVhdExhc3RFZGl0KGNtLCB2aW0sIHJlcGVhdCwgZmFsc2UgLyoqIHJlcGVhdEZvckluc2VydCAqLyk7XG4gICAgICB9LFxuICAgICAgaW5kZW50OiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncykge1xuICAgICAgICBjbS5pbmRlbnRMaW5lKGNtLmdldEN1cnNvcigpLmxpbmUsIGFjdGlvbkFyZ3MuaW5kZW50UmlnaHQpO1xuICAgICAgfSxcbiAgICAgIGV4aXRJbnNlcnRNb2RlOiBleGl0SW5zZXJ0TW9kZVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVBY3Rpb24obmFtZSwgZm4pIHtcbiAgICAgIGFjdGlvbnNbbmFtZV0gPSBmbjtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIEJlbG93IGFyZSBtaXNjZWxsYW5lb3VzIHV0aWxpdHkgZnVuY3Rpb25zIHVzZWQgYnkgdmltLmpzXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDbGlwcyBjdXJzb3IgdG8gZW5zdXJlIHRoYXQgbGluZSBpcyB3aXRoaW4gdGhlIGJ1ZmZlcidzIHJhbmdlXG4gICAgICogYW5kIGlzIG5vdCBpbnNpZGUgc3Vycm9nYXRlIHBhaXJcbiAgICAgKiBJZiBpbmNsdWRlTGluZUJyZWFrIGlzIHRydWUsIHRoZW4gYWxsb3cgY3VyLmNoID09IGxpbmVMZW5ndGguXG4gICAgICovXG4gICAgZnVuY3Rpb24gY2xpcEN1cnNvclRvQ29udGVudChjbSwgY3VyLCBvbGRDdXIpIHtcbiAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICB2YXIgaW5jbHVkZUxpbmVCcmVhayA9IHZpbS5pbnNlcnRNb2RlIHx8IHZpbS52aXN1YWxNb2RlO1xuICAgICAgdmFyIGxpbmUgPSBNYXRoLm1pbihNYXRoLm1heChjbS5maXJzdExpbmUoKSwgY3VyLmxpbmUpLCBjbS5sYXN0TGluZSgpICk7XG4gICAgICB2YXIgdGV4dCA9IGNtLmdldExpbmUobGluZSk7XG4gICAgICB2YXIgbWF4Q2ggPSB0ZXh0Lmxlbmd0aCAtIDEgKyBOdW1iZXIoISFpbmNsdWRlTGluZUJyZWFrKTtcbiAgICAgIHZhciBjaCA9IE1hdGgubWluKE1hdGgubWF4KDAsIGN1ci5jaCksIG1heENoKTtcbiAgICAgIC8vIHByZXZlbnQgY3Vyc29yIGZyb20gZW50ZXJpbmcgc3Vycm9nYXRlIHBhaXJcbiAgICAgIHZhciBjaGFyQ29kZSA9IHRleHQuY2hhckNvZGVBdChjaCk7XG4gICAgICBpZiAoMHhEQzAwIDw9IGNoYXJDb2RlICYmIGNoYXJDb2RlIDw9IDB4REZGRikge1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gMTtcbiAgICAgICAgaWYgKG9sZEN1ciAmJiBvbGRDdXIubGluZSA9PSBsaW5lICYmIG9sZEN1ci5jaCA+IGNoKSB7XG4gICAgICAgICAgZGlyZWN0aW9uID0gLTE7XG4gICAgICAgIH1cbiAgICAgICAgY2ggKz1kaXJlY3Rpb247XG4gICAgICAgIGlmIChjaCA+IG1heENoKSBjaCAtPTI7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFBvcyhsaW5lLCBjaCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvcHlBcmdzKGFyZ3MpIHtcbiAgICAgIHZhciByZXQgPSB7fTtcbiAgICAgIGZvciAodmFyIHByb3AgaW4gYXJncykge1xuICAgICAgICBpZiAoYXJncy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgIHJldFtwcm9wXSA9IGFyZ3NbcHJvcF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9mZnNldEN1cnNvcihjdXIsIG9mZnNldExpbmUsIG9mZnNldENoKSB7XG4gICAgICBpZiAodHlwZW9mIG9mZnNldExpbmUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG9mZnNldENoID0gb2Zmc2V0TGluZS5jaDtcbiAgICAgICAgb2Zmc2V0TGluZSA9IG9mZnNldExpbmUubGluZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgUG9zKGN1ci5saW5lICsgb2Zmc2V0TGluZSwgY3VyLmNoICsgb2Zmc2V0Q2gpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb21tYW5kTWF0Y2hlcyhrZXlzLCBrZXlNYXAsIGNvbnRleHQsIGlucHV0U3RhdGUpIHtcbiAgICAgIC8vIFBhcnRpYWwgbWF0Y2hlcyBhcmUgbm90IGFwcGxpZWQuIFRoZXkgaW5mb3JtIHRoZSBrZXkgaGFuZGxlclxuICAgICAgLy8gdGhhdCB0aGUgY3VycmVudCBrZXkgc2VxdWVuY2UgaXMgYSBzdWJzZXF1ZW5jZSBvZiBhIHZhbGlkIGtleVxuICAgICAgLy8gc2VxdWVuY2UsIHNvIHRoYXQgdGhlIGtleSBidWZmZXIgaXMgbm90IGNsZWFyZWQuXG4gICAgICBpZiAoaW5wdXRTdGF0ZS5vcGVyYXRvcikgY29udGV4dCA9IFwib3BlcmF0b3JQZW5kaW5nXCI7XG4gICAgICB2YXIgbWF0Y2gsIHBhcnRpYWwgPSBbXSwgZnVsbCA9IFtdO1xuICAgICAgLy8gaWYgY3VycmVudGx5IGV4cGFuZGVkIGtleSBjb21lcyBmcm9tIGEgbm9yZW1hcCwgc2VhcmNnIG9ubHkgaW4gZGVmYXVsdCBrZXlzXG4gICAgICB2YXIgc3RhcnRJbmRleCA9IG5vcmVtYXAgPyBrZXlNYXAubGVuZ3RoIC0gZGVmYXVsdEtleW1hcExlbmd0aCA6IDA7XG4gICAgICBmb3IgKHZhciBpID0gc3RhcnRJbmRleDsgaSA8IGtleU1hcC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY29tbWFuZCA9IGtleU1hcFtpXTtcbiAgICAgICAgaWYgKGNvbnRleHQgPT0gJ2luc2VydCcgJiYgY29tbWFuZC5jb250ZXh0ICE9ICdpbnNlcnQnIHx8XG4gICAgICAgICAgICAoY29tbWFuZC5jb250ZXh0ICYmIGNvbW1hbmQuY29udGV4dCAhPSBjb250ZXh0KSB8fFxuICAgICAgICAgICAgaW5wdXRTdGF0ZS5vcGVyYXRvciAmJiBjb21tYW5kLnR5cGUgPT0gJ2FjdGlvbicgfHxcbiAgICAgICAgICAgICEobWF0Y2ggPSBjb21tYW5kTWF0Y2goa2V5cywgY29tbWFuZC5rZXlzKSkpIHsgY29udGludWU7IH1cbiAgICAgICAgaWYgKG1hdGNoID09ICdwYXJ0aWFsJykgeyBwYXJ0aWFsLnB1c2goY29tbWFuZCk7IH1cbiAgICAgICAgaWYgKG1hdGNoID09ICdmdWxsJykgeyBmdWxsLnB1c2goY29tbWFuZCk7IH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhcnRpYWw6IHBhcnRpYWwubGVuZ3RoICYmIHBhcnRpYWwsXG4gICAgICAgIGZ1bGw6IGZ1bGwubGVuZ3RoICYmIGZ1bGxcbiAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbW1hbmRNYXRjaChwcmVzc2VkLCBtYXBwZWQpIHtcbiAgICAgIGNvbnN0IGlzTGFzdENoYXJhY3RlciA9IG1hcHBlZC5zbGljZSgtMTEpID09ICc8Y2hhcmFjdGVyPic7XG4gICAgICBjb25zdCBpc0xhc3RSZWdpc3RlciA9IG1hcHBlZC5zbGljZSgtMTApID09ICc8cmVnaXN0ZXI+JztcbiAgICAgIGlmIChpc0xhc3RDaGFyYWN0ZXIgfHwgaXNMYXN0UmVnaXN0ZXIpIHtcbiAgICAgICAgLy8gTGFzdCBjaGFyYWN0ZXIgbWF0Y2hlcyBhbnl0aGluZy5cbiAgICAgICAgdmFyIHByZWZpeExlbiA9IG1hcHBlZC5sZW5ndGggLSAoaXNMYXN0Q2hhcmFjdGVyID8gMTEgOiAxMCk7XG4gICAgICAgIHZhciBwcmVzc2VkUHJlZml4ID0gcHJlc3NlZC5zbGljZSgwLCBwcmVmaXhMZW4pO1xuICAgICAgICB2YXIgbWFwcGVkUHJlZml4ID0gbWFwcGVkLnNsaWNlKDAsIHByZWZpeExlbik7XG4gICAgICAgIHJldHVybiBwcmVzc2VkUHJlZml4ID09IG1hcHBlZFByZWZpeCAmJiBwcmVzc2VkLmxlbmd0aCA+IHByZWZpeExlbiA/ICdmdWxsJyA6XG4gICAgICAgICAgICAgICBtYXBwZWRQcmVmaXguaW5kZXhPZihwcmVzc2VkUHJlZml4KSA9PSAwID8gJ3BhcnRpYWwnIDogZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcHJlc3NlZCA9PSBtYXBwZWQgPyAnZnVsbCcgOlxuICAgICAgICAgICAgICAgbWFwcGVkLmluZGV4T2YocHJlc3NlZCkgPT0gMCA/ICdwYXJ0aWFsJyA6IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBsYXN0Q2hhcihrZXlzKSB7XG4gICAgICB2YXIgbWF0Y2ggPSAvXi4qKDxbXj5dKz4pJC8uZXhlYyhrZXlzKTtcbiAgICAgIHZhciBzZWxlY3RlZENoYXJhY3RlciA9IG1hdGNoID8gbWF0Y2hbMV0gOiBrZXlzLnNsaWNlKC0xKTtcbiAgICAgIGlmIChzZWxlY3RlZENoYXJhY3Rlci5sZW5ndGggPiAxKXtcbiAgICAgICAgc3dpdGNoKHNlbGVjdGVkQ2hhcmFjdGVyKXtcbiAgICAgICAgICBjYXNlICc8Q1I+JzpcbiAgICAgICAgICAgIHNlbGVjdGVkQ2hhcmFjdGVyPSdcXG4nO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnPFNwYWNlPic6XG4gICAgICAgICAgICBzZWxlY3RlZENoYXJhY3Rlcj0nICc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgc2VsZWN0ZWRDaGFyYWN0ZXI9Jyc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGVjdGVkQ2hhcmFjdGVyO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXBlYXRGbihjbSwgZm4sIHJlcGVhdCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcGVhdDsgaSsrKSB7XG4gICAgICAgICAgZm4oY20pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb3B5Q3Vyc29yKGN1cikge1xuICAgICAgcmV0dXJuIG5ldyBQb3MoY3VyLmxpbmUsIGN1ci5jaCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGN1cnNvckVxdWFsKGN1cjEsIGN1cjIpIHtcbiAgICAgIHJldHVybiBjdXIxLmNoID09IGN1cjIuY2ggJiYgY3VyMS5saW5lID09IGN1cjIubGluZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3Vyc29ySXNCZWZvcmUoY3VyMSwgY3VyMikge1xuICAgICAgaWYgKGN1cjEubGluZSA8IGN1cjIubGluZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXIxLmxpbmUgPT0gY3VyMi5saW5lICYmIGN1cjEuY2ggPCBjdXIyLmNoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjdXJzb3JNaW4oY3VyMSwgY3VyMikge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKSB7XG4gICAgICAgIGN1cjIgPSBjdXJzb3JNaW4uYXBwbHkodW5kZWZpbmVkLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXJzb3JJc0JlZm9yZShjdXIxLCBjdXIyKSA/IGN1cjEgOiBjdXIyO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjdXJzb3JNYXgoY3VyMSwgY3VyMikge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKSB7XG4gICAgICAgIGN1cjIgPSBjdXJzb3JNYXguYXBwbHkodW5kZWZpbmVkLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXJzb3JJc0JlZm9yZShjdXIxLCBjdXIyKSA/IGN1cjIgOiBjdXIxO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjdXJzb3JJc0JldHdlZW4oY3VyMSwgY3VyMiwgY3VyMykge1xuICAgICAgLy8gcmV0dXJucyB0cnVlIGlmIGN1cjIgaXMgYmV0d2VlbiBjdXIxIGFuZCBjdXIzLlxuICAgICAgdmFyIGN1cjFiZWZvcmUyID0gY3Vyc29ySXNCZWZvcmUoY3VyMSwgY3VyMik7XG4gICAgICB2YXIgY3VyMmJlZm9yZTMgPSBjdXJzb3JJc0JlZm9yZShjdXIyLCBjdXIzKTtcbiAgICAgIHJldHVybiBjdXIxYmVmb3JlMiAmJiBjdXIyYmVmb3JlMztcbiAgICB9XG4gICAgZnVuY3Rpb24gbGluZUxlbmd0aChjbSwgbGluZU51bSkge1xuICAgICAgcmV0dXJuIGNtLmdldExpbmUobGluZU51bSkubGVuZ3RoO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0cmltKHMpIHtcbiAgICAgIGlmIChzLnRyaW0pIHtcbiAgICAgICAgcmV0dXJuIHMudHJpbSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHMucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBlc2NhcGVSZWdleChzKSB7XG4gICAgICByZXR1cm4gcy5yZXBsYWNlKC8oWy4/KiskXFxbXFxdXFwvXFxcXCgpe318XFwtXSkvZywgJ1xcXFwkMScpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBleHRlbmRMaW5lVG9Db2x1bW4oY20sIGxpbmVOdW0sIGNvbHVtbikge1xuICAgICAgdmFyIGVuZENoID0gbGluZUxlbmd0aChjbSwgbGluZU51bSk7XG4gICAgICB2YXIgc3BhY2VzID0gbmV3IEFycmF5KGNvbHVtbi1lbmRDaCsxKS5qb2luKCcgJyk7XG4gICAgICBjbS5zZXRDdXJzb3IobmV3IFBvcyhsaW5lTnVtLCBlbmRDaCkpO1xuICAgICAgY20ucmVwbGFjZVJhbmdlKHNwYWNlcywgY20uZ2V0Q3Vyc29yKCkpO1xuICAgIH1cbiAgICAvLyBUaGlzIGZ1bmN0aW9ucyBzZWxlY3RzIGEgcmVjdGFuZ3VsYXIgYmxvY2tcbiAgICAvLyBvZiB0ZXh0IHdpdGggc2VsZWN0aW9uRW5kIGFzIGFueSBvZiBpdHMgY29ybmVyXG4gICAgLy8gSGVpZ2h0IG9mIGJsb2NrOlxuICAgIC8vIERpZmZlcmVuY2UgaW4gc2VsZWN0aW9uRW5kLmxpbmUgYW5kIGZpcnN0L2xhc3Qgc2VsZWN0aW9uLmxpbmVcbiAgICAvLyBXaWR0aCBvZiB0aGUgYmxvY2s6XG4gICAgLy8gRGlzdGFuY2UgYmV0d2VlbiBzZWxlY3Rpb25FbmQuY2ggYW5kIGFueShmaXJzdCBjb25zaWRlcmVkIGhlcmUpIHNlbGVjdGlvbi5jaFxuICAgIGZ1bmN0aW9uIHNlbGVjdEJsb2NrKGNtLCBzZWxlY3Rpb25FbmQpIHtcbiAgICAgIHZhciBzZWxlY3Rpb25zID0gW10sIHJhbmdlcyA9IGNtLmxpc3RTZWxlY3Rpb25zKCk7XG4gICAgICB2YXIgaGVhZCA9IGNvcHlDdXJzb3IoY20uY2xpcFBvcyhzZWxlY3Rpb25FbmQpKTtcbiAgICAgIHZhciBpc0NsaXBwZWQgPSAhY3Vyc29yRXF1YWwoc2VsZWN0aW9uRW5kLCBoZWFkKTtcbiAgICAgIHZhciBjdXJIZWFkID0gY20uZ2V0Q3Vyc29yKCdoZWFkJyk7XG4gICAgICB2YXIgcHJpbUluZGV4ID0gZ2V0SW5kZXgocmFuZ2VzLCBjdXJIZWFkKTtcbiAgICAgIHZhciB3YXNDbGlwcGVkID0gY3Vyc29yRXF1YWwocmFuZ2VzW3ByaW1JbmRleF0uaGVhZCwgcmFuZ2VzW3ByaW1JbmRleF0uYW5jaG9yKTtcbiAgICAgIHZhciBtYXggPSByYW5nZXMubGVuZ3RoIC0gMTtcbiAgICAgIHZhciBpbmRleCA9IG1heCAtIHByaW1JbmRleCA+IHByaW1JbmRleCA/IG1heCA6IDA7XG4gICAgICB2YXIgYmFzZSA9IHJhbmdlc1tpbmRleF0uYW5jaG9yO1xuXG4gICAgICB2YXIgZmlyc3RMaW5lID0gTWF0aC5taW4oYmFzZS5saW5lLCBoZWFkLmxpbmUpO1xuICAgICAgdmFyIGxhc3RMaW5lID0gTWF0aC5tYXgoYmFzZS5saW5lLCBoZWFkLmxpbmUpO1xuICAgICAgdmFyIGJhc2VDaCA9IGJhc2UuY2gsIGhlYWRDaCA9IGhlYWQuY2g7XG5cbiAgICAgIHZhciBkaXIgPSByYW5nZXNbaW5kZXhdLmhlYWQuY2ggLSBiYXNlQ2g7XG4gICAgICB2YXIgbmV3RGlyID0gaGVhZENoIC0gYmFzZUNoO1xuICAgICAgaWYgKGRpciA+IDAgJiYgbmV3RGlyIDw9IDApIHtcbiAgICAgICAgYmFzZUNoKys7XG4gICAgICAgIGlmICghaXNDbGlwcGVkKSB7IGhlYWRDaC0tOyB9XG4gICAgICB9IGVsc2UgaWYgKGRpciA8IDAgJiYgbmV3RGlyID49IDApIHtcbiAgICAgICAgYmFzZUNoLS07XG4gICAgICAgIGlmICghd2FzQ2xpcHBlZCkgeyBoZWFkQ2grKzsgfVxuICAgICAgfSBlbHNlIGlmIChkaXIgPCAwICYmIG5ld0RpciA9PSAtMSkge1xuICAgICAgICBiYXNlQ2gtLTtcbiAgICAgICAgaGVhZENoKys7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBsaW5lID0gZmlyc3RMaW5lOyBsaW5lIDw9IGxhc3RMaW5lOyBsaW5lKyspIHtcbiAgICAgICAgdmFyIHJhbmdlID0ge2FuY2hvcjogbmV3IFBvcyhsaW5lLCBiYXNlQ2gpLCBoZWFkOiBuZXcgUG9zKGxpbmUsIGhlYWRDaCl9O1xuICAgICAgICBzZWxlY3Rpb25zLnB1c2gocmFuZ2UpO1xuICAgICAgfVxuICAgICAgY20uc2V0U2VsZWN0aW9ucyhzZWxlY3Rpb25zKTtcbiAgICAgIHNlbGVjdGlvbkVuZC5jaCA9IGhlYWRDaDtcbiAgICAgIGJhc2UuY2ggPSBiYXNlQ2g7XG4gICAgICByZXR1cm4gYmFzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2VsZWN0Rm9ySW5zZXJ0KGNtLCBoZWFkLCBoZWlnaHQpIHtcbiAgICAgIHZhciBzZWwgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGVpZ2h0OyBpKyspIHtcbiAgICAgICAgdmFyIGxpbmVIZWFkID0gb2Zmc2V0Q3Vyc29yKGhlYWQsIGksIDApO1xuICAgICAgICBzZWwucHVzaCh7YW5jaG9yOiBsaW5lSGVhZCwgaGVhZDogbGluZUhlYWR9KTtcbiAgICAgIH1cbiAgICAgIGNtLnNldFNlbGVjdGlvbnMoc2VsLCAwKTtcbiAgICB9XG4gICAgLy8gZ2V0SW5kZXggcmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGN1cnNvciBpbiB0aGUgc2VsZWN0aW9ucy5cbiAgICBmdW5jdGlvbiBnZXRJbmRleChyYW5nZXMsIGN1cnNvciwgZW5kKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYXRBbmNob3IgPSBlbmQgIT0gJ2hlYWQnICYmIGN1cnNvckVxdWFsKHJhbmdlc1tpXS5hbmNob3IsIGN1cnNvcik7XG4gICAgICAgIHZhciBhdEhlYWQgPSBlbmQgIT0gJ2FuY2hvcicgJiYgY3Vyc29yRXF1YWwocmFuZ2VzW2ldLmhlYWQsIGN1cnNvcik7XG4gICAgICAgIGlmIChhdEFuY2hvciB8fCBhdEhlYWQpIHtcbiAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRTZWxlY3RlZEFyZWFSYW5nZShjbSwgdmltKSB7XG4gICAgICB2YXIgbGFzdFNlbGVjdGlvbiA9IHZpbS5sYXN0U2VsZWN0aW9uO1xuICAgICAgdmFyIGdldEN1cnJlbnRTZWxlY3RlZEFyZWFSYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZWN0aW9ucyA9IGNtLmxpc3RTZWxlY3Rpb25zKCk7XG4gICAgICAgIHZhciBzdGFydCA9ICBzZWxlY3Rpb25zWzBdO1xuICAgICAgICB2YXIgZW5kID0gc2VsZWN0aW9uc1tzZWxlY3Rpb25zLmxlbmd0aC0xXTtcbiAgICAgICAgdmFyIHNlbGVjdGlvblN0YXJ0ID0gY3Vyc29ySXNCZWZvcmUoc3RhcnQuYW5jaG9yLCBzdGFydC5oZWFkKSA/IHN0YXJ0LmFuY2hvciA6IHN0YXJ0LmhlYWQ7XG4gICAgICAgIHZhciBzZWxlY3Rpb25FbmQgPSBjdXJzb3JJc0JlZm9yZShlbmQuYW5jaG9yLCBlbmQuaGVhZCkgPyBlbmQuaGVhZCA6IGVuZC5hbmNob3I7XG4gICAgICAgIHJldHVybiBbc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZF07XG4gICAgICB9O1xuICAgICAgdmFyIGdldExhc3RTZWxlY3RlZEFyZWFSYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZWN0aW9uU3RhcnQgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgdmFyIHNlbGVjdGlvbkVuZCA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICB2YXIgYmxvY2sgPSBsYXN0U2VsZWN0aW9uLnZpc3VhbEJsb2NrO1xuICAgICAgICBpZiAoYmxvY2spIHtcbiAgICAgICAgICB2YXIgd2lkdGggPSBibG9jay53aWR0aDtcbiAgICAgICAgICB2YXIgaGVpZ2h0ID0gYmxvY2suaGVpZ2h0O1xuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IG5ldyBQb3Moc2VsZWN0aW9uU3RhcnQubGluZSArIGhlaWdodCwgc2VsZWN0aW9uU3RhcnQuY2ggKyB3aWR0aCk7XG4gICAgICAgICAgdmFyIHNlbGVjdGlvbnMgPSBbXTtcbiAgICAgICAgICAvLyBzZWxlY3RCbG9jayBjcmVhdGVzIGEgJ3Byb3BlcicgcmVjdGFuZ3VsYXIgYmxvY2suXG4gICAgICAgICAgLy8gV2UgZG8gbm90IHdhbnQgdGhhdCBpbiBhbGwgY2FzZXMsIHNvIHdlIG1hbnVhbGx5IHNldCBzZWxlY3Rpb25zLlxuICAgICAgICAgIGZvciAodmFyIGkgPSBzZWxlY3Rpb25TdGFydC5saW5lOyBpIDwgc2VsZWN0aW9uRW5kLmxpbmU7IGkrKykge1xuICAgICAgICAgICAgdmFyIGFuY2hvciA9IG5ldyBQb3MoaSwgc2VsZWN0aW9uU3RhcnQuY2gpO1xuICAgICAgICAgICAgdmFyIGhlYWQgPSBuZXcgUG9zKGksIHNlbGVjdGlvbkVuZC5jaCk7XG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSB7YW5jaG9yOiBhbmNob3IsIGhlYWQ6IGhlYWR9O1xuICAgICAgICAgICAgc2VsZWN0aW9ucy5wdXNoKHJhbmdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY20uc2V0U2VsZWN0aW9ucyhzZWxlY3Rpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgc3RhcnQgPSBsYXN0U2VsZWN0aW9uLmFuY2hvck1hcmsuZmluZCgpO1xuICAgICAgICAgIHZhciBlbmQgPSBsYXN0U2VsZWN0aW9uLmhlYWRNYXJrLmZpbmQoKTtcbiAgICAgICAgICB2YXIgbGluZSA9IGVuZC5saW5lIC0gc3RhcnQubGluZTtcbiAgICAgICAgICB2YXIgY2ggPSBlbmQuY2ggLSBzdGFydC5jaDtcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSB7bGluZTogc2VsZWN0aW9uRW5kLmxpbmUgKyBsaW5lLCBjaDogbGluZSA/IHNlbGVjdGlvbkVuZC5jaCA6IGNoICsgc2VsZWN0aW9uRW5kLmNofTtcbiAgICAgICAgICBpZiAobGFzdFNlbGVjdGlvbi52aXN1YWxMaW5lKSB7XG4gICAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IG5ldyBQb3Moc2VsZWN0aW9uU3RhcnQubGluZSwgMCk7XG4gICAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBuZXcgUG9zKHNlbGVjdGlvbkVuZC5saW5lLCBsaW5lTGVuZ3RoKGNtLCBzZWxlY3Rpb25FbmQubGluZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjbS5zZXRTZWxlY3Rpb24oc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kXTtcbiAgICAgIH07XG4gICAgICBpZiAoIXZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAvLyBJbiBjYXNlIG9mIHJlcGxheWluZyB0aGUgYWN0aW9uLlxuICAgICAgICByZXR1cm4gZ2V0TGFzdFNlbGVjdGVkQXJlYVJhbmdlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZ2V0Q3VycmVudFNlbGVjdGVkQXJlYVJhbmdlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFVwZGF0ZXMgdGhlIHByZXZpb3VzIHNlbGVjdGlvbiB3aXRoIHRoZSBjdXJyZW50IHNlbGVjdGlvbidzIHZhbHVlcy4gVGhpc1xuICAgIC8vIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBpbiB2aXN1YWwgbW9kZS5cbiAgICBmdW5jdGlvbiB1cGRhdGVMYXN0U2VsZWN0aW9uKGNtLCB2aW0pIHtcbiAgICAgIHZhciBhbmNob3IgPSB2aW0uc2VsLmFuY2hvcjtcbiAgICAgIHZhciBoZWFkID0gdmltLnNlbC5oZWFkO1xuICAgICAgLy8gVG8gYWNjb21tb2RhdGUgdGhlIGVmZmVjdCBvZiBsYXN0UGFzdGVkVGV4dCBpbiB0aGUgbGFzdCBzZWxlY3Rpb25cbiAgICAgIGlmICh2aW0ubGFzdFBhc3RlZFRleHQpIHtcbiAgICAgICAgaGVhZCA9IGNtLnBvc0Zyb21JbmRleChjbS5pbmRleEZyb21Qb3MoYW5jaG9yKSArIHZpbS5sYXN0UGFzdGVkVGV4dC5sZW5ndGgpO1xuICAgICAgICB2aW0ubGFzdFBhc3RlZFRleHQgPSBudWxsO1xuICAgICAgfVxuICAgICAgdmltLmxhc3RTZWxlY3Rpb24gPSB7J2FuY2hvck1hcmsnOiBjbS5zZXRCb29rbWFyayhhbmNob3IpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2hlYWRNYXJrJzogY20uc2V0Qm9va21hcmsoaGVhZCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnYW5jaG9yJzogY29weUN1cnNvcihhbmNob3IpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2hlYWQnOiBjb3B5Q3Vyc29yKGhlYWQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Zpc3VhbE1vZGUnOiB2aW0udmlzdWFsTW9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd2aXN1YWxMaW5lJzogdmltLnZpc3VhbExpbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndmlzdWFsQmxvY2snOiB2aW0udmlzdWFsQmxvY2t9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBleHBhbmRTZWxlY3Rpb24oY20sIHN0YXJ0LCBlbmQsIG1vdmUpIHtcbiAgICAgIHZhciBzZWwgPSBjbS5zdGF0ZS52aW0uc2VsO1xuICAgICAgdmFyIGhlYWQgPSBtb3ZlID8gc3RhcnQ6IHNlbC5oZWFkO1xuICAgICAgdmFyIGFuY2hvciA9IG1vdmUgPyBzdGFydDogc2VsLmFuY2hvcjtcbiAgICAgIHZhciB0bXA7XG4gICAgICBpZiAoY3Vyc29ySXNCZWZvcmUoZW5kLCBzdGFydCkpIHtcbiAgICAgICAgdG1wID0gZW5kO1xuICAgICAgICBlbmQgPSBzdGFydDtcbiAgICAgICAgc3RhcnQgPSB0bXA7XG4gICAgICB9XG4gICAgICBpZiAoY3Vyc29ySXNCZWZvcmUoaGVhZCwgYW5jaG9yKSkge1xuICAgICAgICBoZWFkID0gY3Vyc29yTWluKHN0YXJ0LCBoZWFkKTtcbiAgICAgICAgYW5jaG9yID0gY3Vyc29yTWF4KGFuY2hvciwgZW5kKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFuY2hvciA9IGN1cnNvck1pbihzdGFydCwgYW5jaG9yKTtcbiAgICAgICAgaGVhZCA9IGN1cnNvck1heChoZWFkLCBlbmQpO1xuICAgICAgICBoZWFkID0gb2Zmc2V0Q3Vyc29yKGhlYWQsIDAsIC0xKTtcbiAgICAgICAgaWYgKGhlYWQuY2ggPT0gLTEgJiYgaGVhZC5saW5lICE9IGNtLmZpcnN0TGluZSgpKSB7XG4gICAgICAgICAgaGVhZCA9IG5ldyBQb3MoaGVhZC5saW5lIC0gMSwgbGluZUxlbmd0aChjbSwgaGVhZC5saW5lIC0gMSkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gW2FuY2hvciwgaGVhZF07XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIENvZGVNaXJyb3Igc2VsZWN0aW9uIHRvIG1hdGNoIHRoZSBwcm92aWRlZCB2aW0gc2VsZWN0aW9uLlxuICAgICAqIElmIG5vIGFyZ3VtZW50cyBhcmUgZ2l2ZW4sIGl0IHVzZXMgdGhlIGN1cnJlbnQgdmltIHNlbGVjdGlvbiBzdGF0ZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiB1cGRhdGVDbVNlbGVjdGlvbihjbSwgc2VsLCBtb2RlKSB7XG4gICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgc2VsID0gc2VsIHx8IHZpbS5zZWw7XG4gICAgICB2YXIgbW9kZSA9IG1vZGUgfHxcbiAgICAgICAgdmltLnZpc3VhbExpbmUgPyAnbGluZScgOiB2aW0udmlzdWFsQmxvY2sgPyAnYmxvY2snIDogJ2NoYXInO1xuICAgICAgdmFyIGNtU2VsID0gbWFrZUNtU2VsZWN0aW9uKGNtLCBzZWwsIG1vZGUpO1xuICAgICAgY20uc2V0U2VsZWN0aW9ucyhjbVNlbC5yYW5nZXMsIGNtU2VsLnByaW1hcnkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtYWtlQ21TZWxlY3Rpb24oY20sIHNlbCwgbW9kZSwgZXhjbHVzaXZlKSB7XG4gICAgICB2YXIgaGVhZCA9IGNvcHlDdXJzb3Ioc2VsLmhlYWQpO1xuICAgICAgdmFyIGFuY2hvciA9IGNvcHlDdXJzb3Ioc2VsLmFuY2hvcik7XG4gICAgICBpZiAobW9kZSA9PSAnY2hhcicpIHtcbiAgICAgICAgdmFyIGhlYWRPZmZzZXQgPSAhZXhjbHVzaXZlICYmICFjdXJzb3JJc0JlZm9yZShzZWwuaGVhZCwgc2VsLmFuY2hvcikgPyAxIDogMDtcbiAgICAgICAgdmFyIGFuY2hvck9mZnNldCA9IGN1cnNvcklzQmVmb3JlKHNlbC5oZWFkLCBzZWwuYW5jaG9yKSA/IDEgOiAwO1xuICAgICAgICBoZWFkID0gb2Zmc2V0Q3Vyc29yKHNlbC5oZWFkLCAwLCBoZWFkT2Zmc2V0KTtcbiAgICAgICAgYW5jaG9yID0gb2Zmc2V0Q3Vyc29yKHNlbC5hbmNob3IsIDAsIGFuY2hvck9mZnNldCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcmFuZ2VzOiBbe2FuY2hvcjogYW5jaG9yLCBoZWFkOiBoZWFkfV0sXG4gICAgICAgICAgcHJpbWFyeTogMFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChtb2RlID09ICdsaW5lJykge1xuICAgICAgICBpZiAoIWN1cnNvcklzQmVmb3JlKHNlbC5oZWFkLCBzZWwuYW5jaG9yKSkge1xuICAgICAgICAgIGFuY2hvci5jaCA9IDA7XG5cbiAgICAgICAgICB2YXIgbGFzdExpbmUgPSBjbS5sYXN0TGluZSgpO1xuICAgICAgICAgIGlmIChoZWFkLmxpbmUgPiBsYXN0TGluZSkge1xuICAgICAgICAgICAgaGVhZC5saW5lID0gbGFzdExpbmU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGhlYWQuY2ggPSBsaW5lTGVuZ3RoKGNtLCBoZWFkLmxpbmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGhlYWQuY2ggPSAwO1xuICAgICAgICAgIGFuY2hvci5jaCA9IGxpbmVMZW5ndGgoY20sIGFuY2hvci5saW5lKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHJhbmdlczogW3thbmNob3I6IGFuY2hvciwgaGVhZDogaGVhZH1dLFxuICAgICAgICAgIHByaW1hcnk6IDBcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAobW9kZSA9PSAnYmxvY2snKSB7XG4gICAgICAgIHZhciB0b3AgPSBNYXRoLm1pbihhbmNob3IubGluZSwgaGVhZC5saW5lKSxcbiAgICAgICAgICAgIGZyb21DaCA9IGFuY2hvci5jaCxcbiAgICAgICAgICAgIGJvdHRvbSA9IE1hdGgubWF4KGFuY2hvci5saW5lLCBoZWFkLmxpbmUpLFxuICAgICAgICAgICAgdG9DaCA9IGhlYWQuY2g7XG4gICAgICAgIGlmIChmcm9tQ2ggPCB0b0NoKSB7IHRvQ2ggKz0gMSB9XG4gICAgICAgIGVsc2UgeyBmcm9tQ2ggKz0gMSB9O1xuICAgICAgICB2YXIgaGVpZ2h0ID0gYm90dG9tIC0gdG9wICsgMTtcbiAgICAgICAgdmFyIHByaW1hcnkgPSBoZWFkLmxpbmUgPT0gdG9wID8gMCA6IGhlaWdodCAtIDE7XG4gICAgICAgIHZhciByYW5nZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZWlnaHQ7IGkrKykge1xuICAgICAgICAgIHJhbmdlcy5wdXNoKHtcbiAgICAgICAgICAgIGFuY2hvcjogbmV3IFBvcyh0b3AgKyBpLCBmcm9tQ2gpLFxuICAgICAgICAgICAgaGVhZDogbmV3IFBvcyh0b3AgKyBpLCB0b0NoKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcmFuZ2VzOiByYW5nZXMsXG4gICAgICAgICAgcHJpbWFyeTogcHJpbWFyeVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRIZWFkKGNtKSB7XG4gICAgICB2YXIgY3VyID0gY20uZ2V0Q3Vyc29yKCdoZWFkJyk7XG4gICAgICBpZiAoY20uZ2V0U2VsZWN0aW9uKCkubGVuZ3RoID09IDEpIHtcbiAgICAgICAgLy8gU21hbGwgY29ybmVyIGNhc2Ugd2hlbiBvbmx5IDEgY2hhcmFjdGVyIGlzIHNlbGVjdGVkLiBUaGUgXCJyZWFsXCJcbiAgICAgICAgLy8gaGVhZCBpcyB0aGUgbGVmdCBvZiBoZWFkIGFuZCBhbmNob3IuXG4gICAgICAgIGN1ciA9IGN1cnNvck1pbihjdXIsIGNtLmdldEN1cnNvcignYW5jaG9yJykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGN1cjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiBtb3ZlSGVhZCBpcyBzZXQgdG8gZmFsc2UsIHRoZSBDb2RlTWlycm9yIHNlbGVjdGlvbiB3aWxsIG5vdCBiZVxuICAgICAqIHRvdWNoZWQuIFRoZSBjYWxsZXIgYXNzdW1lcyB0aGUgcmVzcG9uc2liaWxpdHkgb2YgcHV0dGluZyB0aGUgY3Vyc29yXG4gICAgKiBpbiB0aGUgcmlnaHQgcGxhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZXhpdFZpc3VhbE1vZGUoY20sIG1vdmVIZWFkKSB7XG4gICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgaWYgKG1vdmVIZWFkICE9PSBmYWxzZSkge1xuICAgICAgICBjbS5zZXRDdXJzb3IoY2xpcEN1cnNvclRvQ29udGVudChjbSwgdmltLnNlbC5oZWFkKSk7XG4gICAgICB9XG4gICAgICB1cGRhdGVMYXN0U2VsZWN0aW9uKGNtLCB2aW0pO1xuICAgICAgdmltLnZpc3VhbE1vZGUgPSBmYWxzZTtcbiAgICAgIHZpbS52aXN1YWxMaW5lID0gZmFsc2U7XG4gICAgICB2aW0udmlzdWFsQmxvY2sgPSBmYWxzZTtcbiAgICAgIGlmICghdmltLmluc2VydE1vZGUpIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJub3JtYWxcIn0pO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSBhbnkgdHJhaWxpbmcgbmV3bGluZXMgZnJvbSB0aGUgc2VsZWN0aW9uLiBGb3JcbiAgICAvLyBleGFtcGxlLCB3aXRoIHRoZSBjYXJldCBhdCB0aGUgc3RhcnQgb2YgdGhlIGxhc3Qgd29yZCBvbiB0aGUgbGluZSxcbiAgICAvLyAnZHcnIHNob3VsZCB3b3JkLCBidXQgbm90IHRoZSBuZXdsaW5lLCB3aGlsZSAndycgc2hvdWxkIGFkdmFuY2UgdGhlXG4gICAgLy8gY2FyZXQgdG8gdGhlIGZpcnN0IGNoYXJhY3RlciBvZiB0aGUgbmV4dCBsaW5lLlxuICAgIGZ1bmN0aW9uIGNsaXBUb0xpbmUoY20sIGN1clN0YXJ0LCBjdXJFbmQpIHtcbiAgICAgIHZhciBzZWxlY3Rpb24gPSBjbS5nZXRSYW5nZShjdXJTdGFydCwgY3VyRW5kKTtcbiAgICAgIC8vIE9ubHkgY2xpcCBpZiB0aGUgc2VsZWN0aW9uIGVuZHMgd2l0aCB0cmFpbGluZyBuZXdsaW5lICsgd2hpdGVzcGFjZVxuICAgICAgaWYgKC9cXG5cXHMqJC8udGVzdChzZWxlY3Rpb24pKSB7XG4gICAgICAgIHZhciBsaW5lcyA9IHNlbGVjdGlvbi5zcGxpdCgnXFxuJyk7XG4gICAgICAgIC8vIFdlIGtub3cgdGhpcyBpcyBhbGwgd2hpdGVzcGFjZS5cbiAgICAgICAgbGluZXMucG9wKCk7XG5cbiAgICAgICAgLy8gQ2FzZXM6XG4gICAgICAgIC8vIDEuIExhc3Qgd29yZCBpcyBhbiBlbXB0eSBsaW5lIC0gZG8gbm90IGNsaXAgdGhlIHRyYWlsaW5nICdcXG4nXG4gICAgICAgIC8vIDIuIExhc3Qgd29yZCBpcyBub3QgYW4gZW1wdHkgbGluZSAtIGNsaXAgdGhlIHRyYWlsaW5nICdcXG4nXG4gICAgICAgIHZhciBsaW5lO1xuICAgICAgICAvLyBGaW5kIHRoZSBsaW5lIGNvbnRhaW5pbmcgdGhlIGxhc3Qgd29yZCwgYW5kIGNsaXAgYWxsIHdoaXRlc3BhY2UgdXBcbiAgICAgICAgLy8gdG8gaXQuXG4gICAgICAgIGZvciAodmFyIGxpbmUgPSBsaW5lcy5wb3AoKTsgbGluZXMubGVuZ3RoID4gMCAmJiBsaW5lICYmIGlzV2hpdGVTcGFjZVN0cmluZyhsaW5lKTsgbGluZSA9IGxpbmVzLnBvcCgpKSB7XG4gICAgICAgICAgY3VyRW5kLmxpbmUtLTtcbiAgICAgICAgICBjdXJFbmQuY2ggPSAwO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZSBsYXN0IHdvcmQgaXMgbm90IGFuIGVtcHR5IGxpbmUsIGNsaXAgYW4gYWRkaXRpb25hbCBuZXdsaW5lXG4gICAgICAgIGlmIChsaW5lKSB7XG4gICAgICAgICAgY3VyRW5kLmxpbmUtLTtcbiAgICAgICAgICBjdXJFbmQuY2ggPSBsaW5lTGVuZ3RoKGNtLCBjdXJFbmQubGluZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY3VyRW5kLmNoID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEV4cGFuZCB0aGUgc2VsZWN0aW9uIHRvIGxpbmUgZW5kcy5cbiAgICBmdW5jdGlvbiBleHBhbmRTZWxlY3Rpb25Ub0xpbmUoX2NtLCBjdXJTdGFydCwgY3VyRW5kKSB7XG4gICAgICBjdXJTdGFydC5jaCA9IDA7XG4gICAgICBjdXJFbmQuY2ggPSAwO1xuICAgICAgY3VyRW5kLmxpbmUrKztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKHRleHQpIHtcbiAgICAgIGlmICghdGV4dCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICAgIH1cbiAgICAgIHZhciBmaXJzdE5vbldTID0gdGV4dC5zZWFyY2goL1xcUy8pO1xuICAgICAgcmV0dXJuIGZpcnN0Tm9uV1MgPT0gLTEgPyB0ZXh0Lmxlbmd0aCA6IGZpcnN0Tm9uV1M7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhwYW5kV29yZFVuZGVyQ3Vyc29yKGNtLCB7aW5jbHVzaXZlLCBpbm5lcldvcmQsIGJpZ1dvcmQsIG5vU3ltYm9sLCBtdWx0aWxpbmV9LCBjdXJzb3IpIHtcbiAgICAgIHZhciBjdXIgPSBjdXJzb3IgfHwgZ2V0SGVhZChjbSk7XG4gICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUoY3VyLmxpbmUpO1xuICAgICAgdmFyIGVuZExpbmUgPSBsaW5lO1xuICAgICAgdmFyIHN0YXJ0TGluZU51bWJlciA9IGN1ci5saW5lXG4gICAgICB2YXIgZW5kTGluZU51bWJlciA9IHN0YXJ0TGluZU51bWJlcjtcbiAgICAgIHZhciBpZHggPSBjdXIuY2g7XG5cbiAgICAgIHZhciB3b3JkT25OZXh0TGluZTtcbiAgICAgIC8vIFNlZWsgdG8gZmlyc3Qgd29yZCBvciBub24td2hpdGVzcGFjZSBjaGFyYWN0ZXIsIGRlcGVuZGluZyBvbiBpZlxuICAgICAgLy8gbm9TeW1ib2wgaXMgdHJ1ZS5cbiAgICAgIHZhciB0ZXN0ID0gbm9TeW1ib2wgPyB3b3JkQ2hhclRlc3RbMF0gOiBiaWdXb3JkQ2hhclRlc3QgWzBdO1xuICAgICAgaWYgKGlubmVyV29yZCAmJiAvXFxzLy50ZXN0KGxpbmUuY2hhckF0KGlkeCkpKSB7XG4gICAgICAgIHRlc3QgPSBmdW5jdGlvbihjaCkgeyByZXR1cm4gL1xccy8udGVzdChjaCk7IH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aGlsZSAoIXRlc3QobGluZS5jaGFyQXQoaWR4KSkpIHtcbiAgICAgICAgICBpZHgrKztcbiAgICAgICAgICBpZiAoaWR4ID49IGxpbmUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoIW11bHRpbGluZSkgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICBpZHgtLTtcbiAgICAgICAgICAgIHdvcmRPbk5leHRMaW5lID0gZmluZFdvcmQoY20sIGN1ciwgdHJ1ZSwgYmlnV29yZCwgdHJ1ZSk7XG4gICAgICAgICAgICBicmVha1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChiaWdXb3JkKSB7XG4gICAgICAgICAgdGVzdCA9IGJpZ1dvcmRDaGFyVGVzdFswXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZXN0ID0gd29yZENoYXJUZXN0WzBdO1xuICAgICAgICAgIGlmICghdGVzdChsaW5lLmNoYXJBdChpZHgpKSkge1xuICAgICAgICAgICAgdGVzdCA9IHdvcmRDaGFyVGVzdFsxXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGVuZCA9IGlkeCwgc3RhcnQgPSBpZHg7XG4gICAgICB3aGlsZSAodGVzdChsaW5lLmNoYXJBdChzdGFydCkpICYmIHN0YXJ0ID49IDApIHsgc3RhcnQtLTsgfVxuICAgICAgc3RhcnQrKztcbiAgICAgIGlmICh3b3JkT25OZXh0TGluZSkge1xuICAgICAgICBlbmQgPSB3b3JkT25OZXh0TGluZS50bztcbiAgICAgICAgZW5kTGluZU51bWJlciA9IHdvcmRPbk5leHRMaW5lLmxpbmU7XG4gICAgICAgIGVuZExpbmUgPSBjbS5nZXRMaW5lKGVuZExpbmVOdW1iZXIpO1xuICAgICAgICBpZiAoIWVuZExpbmUgJiYgZW5kID09IDApIGVuZCsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2hpbGUgKHRlc3QobGluZS5jaGFyQXQoZW5kKSkgJiYgZW5kIDwgbGluZS5sZW5ndGgpIHsgZW5kKys7IH1cbiAgICAgIH1cblxuICAgICAgaWYgKGluY2x1c2l2ZSkge1xuICAgICAgICAvLyBJZiBwcmVzZW50LCBpbmNsdWRlIGFsbCB3aGl0ZXNwYWNlIGFmdGVyIHdvcmQuXG4gICAgICAgIC8vIE90aGVyd2lzZSwgaW5jbHVkZSBhbGwgd2hpdGVzcGFjZSBiZWZvcmUgd29yZCwgZXhjZXB0IGluZGVudGF0aW9uLlxuICAgICAgICB2YXIgd29yZEVuZCA9IGVuZDtcbiAgICAgICAgdmFyIHN0YXJ0c1dpdGhTcGFjZSA9IGN1ci5jaCA8PSBzdGFydCAmJiAvXFxzLy50ZXN0KGxpbmUuY2hhckF0KGN1ci5jaCkpO1xuICAgICAgICBpZiAoIXN0YXJ0c1dpdGhTcGFjZSkge1xuICAgICAgICAgIHdoaWxlICgvXFxzLy50ZXN0KGVuZExpbmUuY2hhckF0KGVuZCkpICYmIGVuZCA8IGVuZExpbmUubGVuZ3RoKSB7IGVuZCsrOyB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHdvcmRFbmQgPT0gZW5kIHx8IHN0YXJ0c1dpdGhTcGFjZSkge1xuICAgICAgICAgIHZhciB3b3JkU3RhcnQgPSBzdGFydDtcbiAgICAgICAgICB3aGlsZSAoL1xccy8udGVzdChsaW5lLmNoYXJBdChzdGFydCAtIDEpKSAmJiBzdGFydCA+IDApIHsgc3RhcnQtLTsgfVxuICAgICAgICAgIGlmICghc3RhcnQgJiYgIXN0YXJ0c1dpdGhTcGFjZSkgeyBzdGFydCA9IHdvcmRTdGFydDsgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7IHN0YXJ0OiBuZXcgUG9zKHN0YXJ0TGluZU51bWJlciwgc3RhcnQpLCBlbmQ6IG5ldyBQb3MoZW5kTGluZU51bWJlciwgZW5kKSB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlcGVuZHMgb24gdGhlIGZvbGxvd2luZzpcbiAgICAgKlxuICAgICAqIC0gZWRpdG9yIG1vZGUgc2hvdWxkIGJlIGh0bWxtaXhlZG1vZGUgLyB4bWxcbiAgICAgKiAtIG1vZGUveG1sL3htbC5qcyBzaG91bGQgYmUgbG9hZGVkXG4gICAgICogLSBhZGRvbi9mb2xkL3htbC1mb2xkLmpzIHNob3VsZCBiZSBsb2FkZWRcbiAgICAgKlxuICAgICAqIElmIGFueSBvZiB0aGUgYWJvdmUgcmVxdWlyZW1lbnRzIGFyZSBub3QgdHJ1ZSwgdGhpcyBmdW5jdGlvbiBub29wcy5cbiAgICAgKlxuICAgICAqIFRoaXMgaXMgX05PVF8gYSAxMDAlIGFjY3VyYXRlIGltcGxlbWVudGF0aW9uIG9mIHZpbSB0YWcgdGV4dCBvYmplY3RzLlxuICAgICAqIFRoZSBmb2xsb3dpbmcgY2F2ZWF0cyBhcHBseSAoYmFzZWQgb2ZmIGN1cnNvcnkgdGVzdGluZywgSSdtIHN1cmUgdGhlcmVcbiAgICAgKiBhcmUgb3RoZXIgZGlzY3JlcGFuY2llcyk6XG4gICAgICpcbiAgICAgKiAtIERvZXMgbm90IHdvcmsgaW5zaWRlIGNvbW1lbnRzOlxuICAgICAqICAgYGBgXG4gICAgICogICA8IS0tIDxkaXY+YnJva2VuPC9kaXY+IC0tPlxuICAgICAqICAgYGBgXG4gICAgICogLSBEb2VzIG5vdCB3b3JrIHdoZW4gdGFncyBoYXZlIGRpZmZlcmVudCBjYXNlczpcbiAgICAgKiAgIGBgYFxuICAgICAqICAgPGRpdj5icm9rZW48L0RJVj5cbiAgICAgKiAgIGBgYFxuICAgICAqIC0gRG9lcyBub3Qgd29yayB3aGVuIGN1cnNvciBpcyBpbnNpZGUgYSBicm9rZW4gdGFnOlxuICAgICAqICAgYGBgXG4gICAgICogICA8ZGl2Pjxicm9rPjxlbj48L2Rpdj5cbiAgICAgKiAgIGBgYFxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGV4cGFuZFRhZ1VuZGVyQ3Vyc29yKGNtLCBoZWFkLCBpbmNsdXNpdmUpIHtcbiAgICAgIHZhciBjdXIgPSBoZWFkO1xuICAgICAgaWYgKCFDb2RlTWlycm9yLmZpbmRNYXRjaGluZ1RhZyB8fCAhQ29kZU1pcnJvci5maW5kRW5jbG9zaW5nVGFnKSB7XG4gICAgICAgIHJldHVybiB7IHN0YXJ0OiBjdXIsIGVuZDogY3VyIH07XG4gICAgICB9XG5cbiAgICAgIHZhciB0YWdzID0gQ29kZU1pcnJvci5maW5kTWF0Y2hpbmdUYWcoY20sIGhlYWQpIHx8IENvZGVNaXJyb3IuZmluZEVuY2xvc2luZ1RhZyhjbSwgaGVhZCk7XG4gICAgICBpZiAoIXRhZ3MgfHwgIXRhZ3Mub3BlbiB8fCAhdGFncy5jbG9zZSkge1xuICAgICAgICByZXR1cm4geyBzdGFydDogY3VyLCBlbmQ6IGN1ciB9O1xuICAgICAgfVxuXG4gICAgICBpZiAoaW5jbHVzaXZlKSB7XG4gICAgICAgIHJldHVybiB7IHN0YXJ0OiB0YWdzLm9wZW4uZnJvbSwgZW5kOiB0YWdzLmNsb3NlLnRvIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyBzdGFydDogdGFncy5vcGVuLnRvLCBlbmQ6IHRhZ3MuY2xvc2UuZnJvbSB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlY29yZEp1bXBQb3NpdGlvbihjbSwgb2xkQ3VyLCBuZXdDdXIpIHtcbiAgICAgIGlmICghY3Vyc29yRXF1YWwob2xkQ3VyLCBuZXdDdXIpKSB7XG4gICAgICAgIHZpbUdsb2JhbFN0YXRlLmp1bXBMaXN0LmFkZChjbSwgb2xkQ3VyLCBuZXdDdXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlY29yZExhc3RDaGFyYWN0ZXJTZWFyY2goaW5jcmVtZW50LCBhcmdzKSB7XG4gICAgICAgIHZpbUdsb2JhbFN0YXRlLmxhc3RDaGFyYWN0ZXJTZWFyY2guaW5jcmVtZW50ID0gaW5jcmVtZW50O1xuICAgICAgICB2aW1HbG9iYWxTdGF0ZS5sYXN0Q2hhcmFjdGVyU2VhcmNoLmZvcndhcmQgPSBhcmdzLmZvcndhcmQ7XG4gICAgICAgIHZpbUdsb2JhbFN0YXRlLmxhc3RDaGFyYWN0ZXJTZWFyY2guc2VsZWN0ZWRDaGFyYWN0ZXIgPSBhcmdzLnNlbGVjdGVkQ2hhcmFjdGVyO1xuICAgIH1cblxuICAgIHZhciBzeW1ib2xUb01vZGUgPSB7XG4gICAgICAgICcoJzogJ2JyYWNrZXQnLCAnKSc6ICdicmFja2V0JywgJ3snOiAnYnJhY2tldCcsICd9JzogJ2JyYWNrZXQnLFxuICAgICAgICAnWyc6ICdzZWN0aW9uJywgJ10nOiAnc2VjdGlvbicsXG4gICAgICAgICcqJzogJ2NvbW1lbnQnLCAnLyc6ICdjb21tZW50JyxcbiAgICAgICAgJ20nOiAnbWV0aG9kJywgJ00nOiAnbWV0aG9kJyxcbiAgICAgICAgJyMnOiAncHJlcHJvY2VzcydcbiAgICB9O1xuICAgIHZhciBmaW5kU3ltYm9sTW9kZXMgPSB7XG4gICAgICBicmFja2V0OiB7XG4gICAgICAgIGlzQ29tcGxldGU6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgaWYgKHN0YXRlLm5leHRDaCA9PT0gc3RhdGUuc3ltYikge1xuICAgICAgICAgICAgc3RhdGUuZGVwdGgrKztcbiAgICAgICAgICAgIGlmIChzdGF0ZS5kZXB0aCA+PSAxKXJldHVybiB0cnVlO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdGUubmV4dENoID09PSBzdGF0ZS5yZXZlcnNlU3ltYikge1xuICAgICAgICAgICAgc3RhdGUuZGVwdGgtLTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2VjdGlvbjoge1xuICAgICAgICBpbml0OiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgICAgIHN0YXRlLmN1ck1vdmVUaHJvdWdoID0gdHJ1ZTtcbiAgICAgICAgICBzdGF0ZS5zeW1iID0gKHN0YXRlLmZvcndhcmQgPyAnXScgOiAnWycpID09PSBzdGF0ZS5zeW1iID8gJ3snIDogJ30nO1xuICAgICAgICB9LFxuICAgICAgICBpc0NvbXBsZXRlOiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgICAgIHJldHVybiBzdGF0ZS5pbmRleCA9PT0gMCAmJiBzdGF0ZS5uZXh0Q2ggPT09IHN0YXRlLnN5bWI7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb21tZW50OiB7XG4gICAgICAgIGlzQ29tcGxldGU6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgdmFyIGZvdW5kID0gc3RhdGUubGFzdENoID09PSAnKicgJiYgc3RhdGUubmV4dENoID09PSAnLyc7XG4gICAgICAgICAgc3RhdGUubGFzdENoID0gc3RhdGUubmV4dENoO1xuICAgICAgICAgIHJldHVybiBmb3VuZDtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIC8vIFRPRE86IFRoZSBvcmlnaW5hbCBWaW0gaW1wbGVtZW50YXRpb24gb25seSBvcGVyYXRlcyBvbiBsZXZlbCAxIGFuZCAyLlxuICAgICAgLy8gVGhlIGN1cnJlbnQgaW1wbGVtZW50YXRpb24gZG9lc24ndCBjaGVjayBmb3IgY29kZSBibG9jayBsZXZlbCBhbmRcbiAgICAgIC8vIHRoZXJlZm9yZSBpdCBvcGVyYXRlcyBvbiBhbnkgbGV2ZWxzLlxuICAgICAgbWV0aG9kOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgc3RhdGUuc3ltYiA9IChzdGF0ZS5zeW1iID09PSAnbScgPyAneycgOiAnfScpO1xuICAgICAgICAgIHN0YXRlLnJldmVyc2VTeW1iID0gc3RhdGUuc3ltYiA9PT0gJ3snID8gJ30nIDogJ3snO1xuICAgICAgICB9LFxuICAgICAgICBpc0NvbXBsZXRlOiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgICAgIGlmIChzdGF0ZS5uZXh0Q2ggPT09IHN0YXRlLnN5bWIpcmV0dXJuIHRydWU7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJlcHJvY2Vzczoge1xuICAgICAgICBpbml0OiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgICAgIHN0YXRlLmluZGV4ID0gMDtcbiAgICAgICAgfSxcbiAgICAgICAgaXNDb21wbGV0ZTogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgICBpZiAoc3RhdGUubmV4dENoID09PSAnIycpIHtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IHN0YXRlLmxpbmVUZXh0Lm1hdGNoKC9eIyhcXHcrKS8pWzFdO1xuICAgICAgICAgICAgaWYgKHRva2VuID09PSAnZW5kaWYnKSB7XG4gICAgICAgICAgICAgIGlmIChzdGF0ZS5mb3J3YXJkICYmIHN0YXRlLmRlcHRoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc3RhdGUuZGVwdGgrKztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4gPT09ICdpZicpIHtcbiAgICAgICAgICAgICAgaWYgKCFzdGF0ZS5mb3J3YXJkICYmIHN0YXRlLmRlcHRoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgc3RhdGUuZGVwdGgtLTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b2tlbiA9PT0gJ2Vsc2UnICYmIHN0YXRlLmRlcHRoID09PSAwKXJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGZ1bmN0aW9uIGZpbmRTeW1ib2woY20sIHJlcGVhdCwgZm9yd2FyZCwgc3ltYikge1xuICAgICAgdmFyIGN1ciA9IGNvcHlDdXJzb3IoY20uZ2V0Q3Vyc29yKCkpO1xuICAgICAgdmFyIGluY3JlbWVudCA9IGZvcndhcmQgPyAxIDogLTE7XG4gICAgICB2YXIgZW5kTGluZSA9IGZvcndhcmQgPyBjbS5saW5lQ291bnQoKSA6IC0xO1xuICAgICAgdmFyIGN1ckNoID0gY3VyLmNoO1xuICAgICAgdmFyIGxpbmUgPSBjdXIubGluZTtcbiAgICAgIHZhciBsaW5lVGV4dCA9IGNtLmdldExpbmUobGluZSk7XG4gICAgICB2YXIgc3RhdGUgPSB7XG4gICAgICAgIGxpbmVUZXh0OiBsaW5lVGV4dCxcbiAgICAgICAgbmV4dENoOiBsaW5lVGV4dC5jaGFyQXQoY3VyQ2gpLFxuICAgICAgICBsYXN0Q2g6IG51bGwsXG4gICAgICAgIGluZGV4OiBjdXJDaCxcbiAgICAgICAgc3ltYjogc3ltYixcbiAgICAgICAgcmV2ZXJzZVN5bWI6IChmb3J3YXJkID8gIHsgJyknOiAnKCcsICd9JzogJ3snIH0gOiB7ICcoJzogJyknLCAneyc6ICd9JyB9KVtzeW1iXSxcbiAgICAgICAgZm9yd2FyZDogZm9yd2FyZCxcbiAgICAgICAgZGVwdGg6IDAsXG4gICAgICAgIGN1ck1vdmVUaHJvdWdoOiBmYWxzZVxuICAgICAgfTtcbiAgICAgIHZhciBtb2RlID0gc3ltYm9sVG9Nb2RlW3N5bWJdO1xuICAgICAgaWYgKCFtb2RlKXJldHVybiBjdXI7XG4gICAgICB2YXIgaW5pdCA9IGZpbmRTeW1ib2xNb2Rlc1ttb2RlXS5pbml0O1xuICAgICAgdmFyIGlzQ29tcGxldGUgPSBmaW5kU3ltYm9sTW9kZXNbbW9kZV0uaXNDb21wbGV0ZTtcbiAgICAgIGlmIChpbml0KSB7IGluaXQoc3RhdGUpOyB9XG4gICAgICB3aGlsZSAobGluZSAhPT0gZW5kTGluZSAmJiByZXBlYXQpIHtcbiAgICAgICAgc3RhdGUuaW5kZXggKz0gaW5jcmVtZW50O1xuICAgICAgICBzdGF0ZS5uZXh0Q2ggPSBzdGF0ZS5saW5lVGV4dC5jaGFyQXQoc3RhdGUuaW5kZXgpO1xuICAgICAgICBpZiAoIXN0YXRlLm5leHRDaCkge1xuICAgICAgICAgIGxpbmUgKz0gaW5jcmVtZW50O1xuICAgICAgICAgIHN0YXRlLmxpbmVUZXh0ID0gY20uZ2V0TGluZShsaW5lKSB8fCAnJztcbiAgICAgICAgICBpZiAoaW5jcmVtZW50ID4gMCkge1xuICAgICAgICAgICAgc3RhdGUuaW5kZXggPSAwO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbGluZUxlbiA9IHN0YXRlLmxpbmVUZXh0Lmxlbmd0aDtcbiAgICAgICAgICAgIHN0YXRlLmluZGV4ID0gKGxpbmVMZW4gPiAwKSA/IChsaW5lTGVuLTEpIDogMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RhdGUubmV4dENoID0gc3RhdGUubGluZVRleHQuY2hhckF0KHN0YXRlLmluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNDb21wbGV0ZShzdGF0ZSkpIHtcbiAgICAgICAgICBjdXIubGluZSA9IGxpbmU7XG4gICAgICAgICAgY3VyLmNoID0gc3RhdGUuaW5kZXg7XG4gICAgICAgICAgcmVwZWF0LS07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdGF0ZS5uZXh0Q2ggfHwgc3RhdGUuY3VyTW92ZVRocm91Z2gpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MobGluZSwgc3RhdGUuaW5kZXgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGN1cjtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIFJldHVybnMgdGhlIGJvdW5kYXJpZXMgb2YgdGhlIG5leHQgd29yZC4gSWYgdGhlIGN1cnNvciBpbiB0aGUgbWlkZGxlIG9mXG4gICAgICogdGhlIHdvcmQsIHRoZW4gcmV0dXJucyB0aGUgYm91bmRhcmllcyBvZiB0aGUgY3VycmVudCB3b3JkLCBzdGFydGluZyBhdFxuICAgICAqIHRoZSBjdXJzb3IuIElmIHRoZSBjdXJzb3IgaXMgYXQgdGhlIHN0YXJ0L2VuZCBvZiBhIHdvcmQsIGFuZCB3ZSBhcmUgZ29pbmdcbiAgICAgKiBmb3J3YXJkL2JhY2t3YXJkLCByZXNwZWN0aXZlbHksIGZpbmQgdGhlIGJvdW5kYXJpZXMgb2YgdGhlIG5leHQgd29yZC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Q29kZU1pcnJvcn0gY20gQ29kZU1pcnJvciBvYmplY3QuXG4gICAgICogQHBhcmFtIHtDdXJzb3J9IGN1ciBUaGUgY3Vyc29yIHBvc2l0aW9uLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9yd2FyZCBUcnVlIHRvIHNlYXJjaCBmb3J3YXJkLiBGYWxzZSB0byBzZWFyY2hcbiAgICAgKiAgICAgYmFja3dhcmQuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBiaWdXb3JkIFRydWUgaWYgcHVuY3R1YXRpb24gY291bnQgYXMgcGFydCBvZiB0aGUgd29yZC5cbiAgICAgKiAgICAgRmFsc2UgaWYgb25seSBbYS16QS1aMC05XSBjaGFyYWN0ZXJzIGNvdW50IGFzIHBhcnQgb2YgdGhlIHdvcmQuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBlbXB0eUxpbmVJc1dvcmQgVHJ1ZSBpZiBlbXB0eSBsaW5lcyBzaG91bGQgYmUgdHJlYXRlZFxuICAgICAqICAgICBhcyB3b3Jkcy5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R7ZnJvbTpudW1iZXIsIHRvOm51bWJlciwgbGluZTogbnVtYmVyfX0gVGhlIGJvdW5kYXJpZXMgb2ZcbiAgICAgKiAgICAgdGhlIHdvcmQsIG9yIG51bGwgaWYgdGhlcmUgYXJlIG5vIG1vcmUgd29yZHMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmluZFdvcmQoY20sIGN1ciwgZm9yd2FyZCwgYmlnV29yZCwgZW1wdHlMaW5lSXNXb3JkKSB7XG4gICAgICB2YXIgbGluZU51bSA9IGN1ci5saW5lO1xuICAgICAgdmFyIHBvcyA9IGN1ci5jaDtcbiAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShsaW5lTnVtKTtcbiAgICAgIHZhciBkaXIgPSBmb3J3YXJkID8gMSA6IC0xO1xuICAgICAgdmFyIGNoYXJUZXN0cyA9IGJpZ1dvcmQgPyBiaWdXb3JkQ2hhclRlc3Q6IHdvcmRDaGFyVGVzdDtcblxuICAgICAgaWYgKGVtcHR5TGluZUlzV29yZCAmJiBsaW5lID09ICcnKSB7XG4gICAgICAgIGxpbmVOdW0gKz0gZGlyO1xuICAgICAgICBsaW5lID0gY20uZ2V0TGluZShsaW5lTnVtKTtcbiAgICAgICAgaWYgKCFpc0xpbmUoY20sIGxpbmVOdW0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcG9zID0gKGZvcndhcmQpID8gMCA6IGxpbmUubGVuZ3RoO1xuICAgICAgfVxuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICBpZiAoZW1wdHlMaW5lSXNXb3JkICYmIGxpbmUgPT0gJycpIHtcbiAgICAgICAgICByZXR1cm4geyBmcm9tOiAwLCB0bzogMCwgbGluZTogbGluZU51bSB9O1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdG9wID0gKGRpciA+IDApID8gbGluZS5sZW5ndGggOiAtMTtcbiAgICAgICAgdmFyIHdvcmRTdGFydCA9IHN0b3AsIHdvcmRFbmQgPSBzdG9wO1xuICAgICAgICAvLyBGaW5kIGJvdW5kcyBvZiBuZXh0IHdvcmQuXG4gICAgICAgIHdoaWxlIChwb3MgIT0gc3RvcCkge1xuICAgICAgICAgIHZhciBmb3VuZFdvcmQgPSBmYWxzZTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYXJUZXN0cy5sZW5ndGggJiYgIWZvdW5kV29yZDsgKytpKSB7XG4gICAgICAgICAgICBpZiAoY2hhclRlc3RzW2ldKGxpbmUuY2hhckF0KHBvcykpKSB7XG4gICAgICAgICAgICAgIHdvcmRTdGFydCA9IHBvcztcbiAgICAgICAgICAgICAgLy8gQWR2YW5jZSB0byBlbmQgb2Ygd29yZC5cbiAgICAgICAgICAgICAgd2hpbGUgKHBvcyAhPSBzdG9wICYmIGNoYXJUZXN0c1tpXShsaW5lLmNoYXJBdChwb3MpKSkge1xuICAgICAgICAgICAgICAgIHBvcyArPSBkaXI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgd29yZEVuZCA9IHBvcztcbiAgICAgICAgICAgICAgZm91bmRXb3JkID0gd29yZFN0YXJ0ICE9IHdvcmRFbmQ7XG4gICAgICAgICAgICAgIGlmICh3b3JkU3RhcnQgPT0gY3VyLmNoICYmIGxpbmVOdW0gPT0gY3VyLmxpbmUgJiZcbiAgICAgICAgICAgICAgICAgIHdvcmRFbmQgPT0gd29yZFN0YXJ0ICsgZGlyKSB7XG4gICAgICAgICAgICAgICAgLy8gV2Ugc3RhcnRlZCBhdCB0aGUgZW5kIG9mIGEgd29yZC4gRmluZCB0aGUgbmV4dCBvbmUuXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgIGZyb206IE1hdGgubWluKHdvcmRTdGFydCwgd29yZEVuZCArIDEpLFxuICAgICAgICAgICAgICAgICAgdG86IE1hdGgubWF4KHdvcmRTdGFydCwgd29yZEVuZCksXG4gICAgICAgICAgICAgICAgICBsaW5lOiBsaW5lTnVtIH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFmb3VuZFdvcmQpIHtcbiAgICAgICAgICAgIHBvcyArPSBkaXI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEFkdmFuY2UgdG8gbmV4dC9wcmV2IGxpbmUuXG4gICAgICAgIGxpbmVOdW0gKz0gZGlyO1xuICAgICAgICBpZiAoIWlzTGluZShjbSwgbGluZU51bSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsaW5lID0gY20uZ2V0TGluZShsaW5lTnVtKTtcbiAgICAgICAgcG9zID0gKGRpciA+IDApID8gMCA6IGxpbmUubGVuZ3RoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Q29kZU1pcnJvcn0gY20gQ29kZU1pcnJvciBvYmplY3QuXG4gICAgICogQHBhcmFtIHtQb3N9IGN1ciBUaGUgcG9zaXRpb24gdG8gc3RhcnQgZnJvbS5cbiAgICAgKiBAcGFyYW0ge2ludH0gcmVwZWF0IE51bWJlciBvZiB3b3JkcyB0byBtb3ZlIHBhc3QuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBmb3J3YXJkIFRydWUgdG8gc2VhcmNoIGZvcndhcmQuIEZhbHNlIHRvIHNlYXJjaFxuICAgICAqICAgICBiYWNrd2FyZC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHdvcmRFbmQgVHJ1ZSB0byBtb3ZlIHRvIGVuZCBvZiB3b3JkLiBGYWxzZSB0byBtb3ZlIHRvXG4gICAgICogICAgIGJlZ2lubmluZyBvZiB3b3JkLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYmlnV29yZCBUcnVlIGlmIHB1bmN0dWF0aW9uIGNvdW50IGFzIHBhcnQgb2YgdGhlIHdvcmQuXG4gICAgICogICAgIEZhbHNlIGlmIG9ubHkgYWxwaGFiZXQgY2hhcmFjdGVycyBjb3VudCBhcyBwYXJ0IG9mIHRoZSB3b3JkLlxuICAgICAqIEByZXR1cm4ge0N1cnNvcn0gVGhlIHBvc2l0aW9uIHRoZSBjdXJzb3Igc2hvdWxkIG1vdmUgdG8uXG4gICAgICovXG4gICAgZnVuY3Rpb24gbW92ZVRvV29yZChjbSwgY3VyLCByZXBlYXQsIGZvcndhcmQsIHdvcmRFbmQsIGJpZ1dvcmQpIHtcbiAgICAgIHZhciBjdXJTdGFydCA9IGNvcHlDdXJzb3IoY3VyKTtcbiAgICAgIHZhciB3b3JkcyA9IFtdO1xuICAgICAgaWYgKGZvcndhcmQgJiYgIXdvcmRFbmQgfHwgIWZvcndhcmQgJiYgd29yZEVuZCkge1xuICAgICAgICByZXBlYXQrKztcbiAgICAgIH1cbiAgICAgIC8vIEZvciAnZScsIGVtcHR5IGxpbmVzIGFyZSBub3QgY29uc2lkZXJlZCB3b3JkcywgZ28gZmlndXJlLlxuICAgICAgdmFyIGVtcHR5TGluZUlzV29yZCA9ICEoZm9yd2FyZCAmJiB3b3JkRW5kKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwZWF0OyBpKyspIHtcbiAgICAgICAgdmFyIHdvcmQgPSBmaW5kV29yZChjbSwgY3VyLCBmb3J3YXJkLCBiaWdXb3JkLCBlbXB0eUxpbmVJc1dvcmQpO1xuICAgICAgICBpZiAoIXdvcmQpIHtcbiAgICAgICAgICB2YXIgZW9kQ2ggPSBsaW5lTGVuZ3RoKGNtLCBjbS5sYXN0TGluZSgpKTtcbiAgICAgICAgICB3b3Jkcy5wdXNoKGZvcndhcmRcbiAgICAgICAgICAgICAgPyB7bGluZTogY20ubGFzdExpbmUoKSwgZnJvbTogZW9kQ2gsIHRvOiBlb2RDaH1cbiAgICAgICAgICAgICAgOiB7bGluZTogMCwgZnJvbTogMCwgdG86IDB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB3b3Jkcy5wdXNoKHdvcmQpO1xuICAgICAgICBjdXIgPSBuZXcgUG9zKHdvcmQubGluZSwgZm9yd2FyZCA/ICh3b3JkLnRvIC0gMSkgOiB3b3JkLmZyb20pO1xuICAgICAgfVxuICAgICAgdmFyIHNob3J0Q2lyY3VpdCA9IHdvcmRzLmxlbmd0aCAhPSByZXBlYXQ7XG4gICAgICB2YXIgZmlyc3RXb3JkID0gd29yZHNbMF07XG4gICAgICB2YXIgbGFzdFdvcmQgPSB3b3Jkcy5wb3AoKTtcbiAgICAgIGlmIChmb3J3YXJkICYmICF3b3JkRW5kKSB7XG4gICAgICAgIC8vIHdcbiAgICAgICAgaWYgKCFzaG9ydENpcmN1aXQgJiYgKGZpcnN0V29yZC5mcm9tICE9IGN1clN0YXJ0LmNoIHx8IGZpcnN0V29yZC5saW5lICE9IGN1clN0YXJ0LmxpbmUpKSB7XG4gICAgICAgICAgLy8gV2UgZGlkIG5vdCBzdGFydCBpbiB0aGUgbWlkZGxlIG9mIGEgd29yZC4gRGlzY2FyZCB0aGUgZXh0cmEgd29yZCBhdCB0aGUgZW5kLlxuICAgICAgICAgIGxhc3RXb3JkID0gd29yZHMucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQb3MobGFzdFdvcmQubGluZSwgbGFzdFdvcmQuZnJvbSk7XG4gICAgICB9IGVsc2UgaWYgKGZvcndhcmQgJiYgd29yZEVuZCkge1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhsYXN0V29yZC5saW5lLCBsYXN0V29yZC50byAtIDEpO1xuICAgICAgfSBlbHNlIGlmICghZm9yd2FyZCAmJiB3b3JkRW5kKSB7XG4gICAgICAgIC8vIGdlXG4gICAgICAgIGlmICghc2hvcnRDaXJjdWl0ICYmIChmaXJzdFdvcmQudG8gIT0gY3VyU3RhcnQuY2ggfHwgZmlyc3RXb3JkLmxpbmUgIT0gY3VyU3RhcnQubGluZSkpIHtcbiAgICAgICAgICAvLyBXZSBkaWQgbm90IHN0YXJ0IGluIHRoZSBtaWRkbGUgb2YgYSB3b3JkLiBEaXNjYXJkIHRoZSBleHRyYSB3b3JkIGF0IHRoZSBlbmQuXG4gICAgICAgICAgbGFzdFdvcmQgPSB3b3Jkcy5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFBvcyhsYXN0V29yZC5saW5lLCBsYXN0V29yZC50byk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBiXG4gICAgICAgIHJldHVybiBuZXcgUG9zKGxhc3RXb3JkLmxpbmUsIGxhc3RXb3JkLmZyb20pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmVUb0VvbChjbSwgaGVhZCwgbW90aW9uQXJncywgdmltLCBrZWVwSFBvcykge1xuICAgICAgdmFyIGN1ciA9IGhlYWQ7XG4gICAgICB2YXIgcmV0dmFsPSBuZXcgUG9zKGN1ci5saW5lICsgbW90aW9uQXJncy5yZXBlYXQgLSAxLCBJbmZpbml0eSk7XG4gICAgICB2YXIgZW5kPWNtLmNsaXBQb3MocmV0dmFsKTtcbiAgICAgIGVuZC5jaC0tO1xuICAgICAgaWYgKCFrZWVwSFBvcykge1xuICAgICAgICB2aW0ubGFzdEhQb3MgPSBJbmZpbml0eTtcbiAgICAgICAgdmltLmxhc3RIU1BvcyA9IGNtLmNoYXJDb29yZHMoZW5kLCdkaXYnKS5sZWZ0O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJldHZhbDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3ZlVG9DaGFyYWN0ZXIoY20sIHJlcGVhdCwgZm9yd2FyZCwgY2hhcmFjdGVyLCBoZWFkKSB7XG4gICAgICB2YXIgY3VyID0gaGVhZCB8fCBjbS5nZXRDdXJzb3IoKTtcbiAgICAgIHZhciBzdGFydCA9IGN1ci5jaDtcbiAgICAgIHZhciBpZHg7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcGVhdDsgaSArKykge1xuICAgICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUoY3VyLmxpbmUpO1xuICAgICAgICBpZHggPSBjaGFySWR4SW5MaW5lKHN0YXJ0LCBsaW5lLCBjaGFyYWN0ZXIsIGZvcndhcmQsIHRydWUpO1xuICAgICAgICBpZiAoaWR4ID09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgc3RhcnQgPSBpZHg7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFBvcyhjbS5nZXRDdXJzb3IoKS5saW5lLCBpZHgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmVUb0NvbHVtbihjbSwgcmVwZWF0KSB7XG4gICAgICAvLyByZXBlYXQgaXMgYWx3YXlzID49IDEsIHNvIHJlcGVhdCAtIDEgYWx3YXlzIGNvcnJlc3BvbmRzXG4gICAgICAvLyB0byB0aGUgY29sdW1uIHdlIHdhbnQgdG8gZ28gdG8uXG4gICAgICB2YXIgbGluZSA9IGNtLmdldEN1cnNvcigpLmxpbmU7XG4gICAgICByZXR1cm4gY2xpcEN1cnNvclRvQ29udGVudChjbSwgbmV3IFBvcyhsaW5lLCByZXBlYXQgLSAxKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWFyayhjbSwgdmltLCBtYXJrTmFtZSwgcG9zKSB7XG4gICAgICBpZiAoIWluQXJyYXkobWFya05hbWUsIHZhbGlkTWFya3MpICYmICFsYXRpbkNoYXJSZWdleC50ZXN0KG1hcmtOYW1lKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAodmltLm1hcmtzW21hcmtOYW1lXSkge1xuICAgICAgICB2aW0ubWFya3NbbWFya05hbWVdLmNsZWFyKCk7XG4gICAgICB9XG4gICAgICB2aW0ubWFya3NbbWFya05hbWVdID0gY20uc2V0Qm9va21hcmsocG9zKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGFySWR4SW5MaW5lKHN0YXJ0LCBsaW5lLCBjaGFyYWN0ZXIsIGZvcndhcmQsIGluY2x1ZGVDaGFyKSB7XG4gICAgICAvLyBTZWFyY2ggZm9yIGNoYXIgaW4gbGluZS5cbiAgICAgIC8vIG1vdGlvbl9vcHRpb25zOiB7Zm9yd2FyZCwgaW5jbHVkZUNoYXJ9XG4gICAgICAvLyBJZiBpbmNsdWRlQ2hhciA9IHRydWUsIGluY2x1ZGUgaXQgdG9vLlxuICAgICAgLy8gSWYgZm9yd2FyZCA9IHRydWUsIHNlYXJjaCBmb3J3YXJkLCBlbHNlIHNlYXJjaCBiYWNrd2FyZHMuXG4gICAgICAvLyBJZiBjaGFyIGlzIG5vdCBmb3VuZCBvbiB0aGlzIGxpbmUsIGRvIG5vdGhpbmdcbiAgICAgIHZhciBpZHg7XG4gICAgICBpZiAoZm9yd2FyZCkge1xuICAgICAgICBpZHggPSBsaW5lLmluZGV4T2YoY2hhcmFjdGVyLCBzdGFydCArIDEpO1xuICAgICAgICBpZiAoaWR4ICE9IC0xICYmICFpbmNsdWRlQ2hhcikge1xuICAgICAgICAgIGlkeCAtPSAxO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZHggPSBsaW5lLmxhc3RJbmRleE9mKGNoYXJhY3Rlciwgc3RhcnQgLSAxKTtcbiAgICAgICAgaWYgKGlkeCAhPSAtMSAmJiAhaW5jbHVkZUNoYXIpIHtcbiAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGlkeDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kUGFyYWdyYXBoKGNtLCBoZWFkLCByZXBlYXQsIGRpciwgaW5jbHVzaXZlKSB7XG4gICAgICB2YXIgbGluZSA9IGhlYWQubGluZTtcbiAgICAgIHZhciBtaW4gPSBjbS5maXJzdExpbmUoKTtcbiAgICAgIHZhciBtYXggPSBjbS5sYXN0TGluZSgpO1xuICAgICAgdmFyIHN0YXJ0LCBlbmQsIGkgPSBsaW5lO1xuICAgICAgZnVuY3Rpb24gaXNFbXB0eShpKSB7IHJldHVybiAhL1xcUy8udGVzdChjbS5nZXRMaW5lKGkpKTsgfSAvLyBhY2VfcGF0Y2hcbiAgICAgIGZ1bmN0aW9uIGlzQm91bmRhcnkoaSwgZGlyLCBhbnkpIHtcbiAgICAgICAgaWYgKGFueSkgeyByZXR1cm4gaXNFbXB0eShpKSAhPSBpc0VtcHR5KGkgKyBkaXIpOyB9XG4gICAgICAgIHJldHVybiAhaXNFbXB0eShpKSAmJiBpc0VtcHR5KGkgKyBkaXIpO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gc2tpcEZvbGQoaSkge1xuICAgICAgICAgIGRpciA9IGRpciA+IDAgPyAxIDogLTE7XG4gICAgICAgICAgdmFyIGZvbGRMaW5lID0gY20uYWNlLnNlc3Npb24uZ2V0Rm9sZExpbmUoaSk7XG4gICAgICAgICAgaWYgKGZvbGRMaW5lKSB7XG4gICAgICAgICAgICAgIGlmIChpICsgZGlyID4gZm9sZExpbmUuc3RhcnQucm93ICYmIGkgKyBkaXIgPCBmb2xkTGluZS5lbmQucm93KVxuICAgICAgICAgICAgICAgICAgZGlyID0gKGRpciA+IDAgPyBmb2xkTGluZS5lbmQucm93IDogZm9sZExpbmUuc3RhcnQucm93KSAtIGk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGRpcikge1xuICAgICAgICB3aGlsZSAobWluIDw9IGkgJiYgaSA8PSBtYXggJiYgcmVwZWF0ID4gMCkge1xuICAgICAgICAgIHNraXBGb2xkKGkpO1xuICAgICAgICAgIGlmIChpc0JvdW5kYXJ5KGksIGRpcikpIHsgcmVwZWF0LS07IH1cbiAgICAgICAgICBpICs9IGRpcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFBvcyhpLCAwKTtcbiAgICAgIH1cblxuICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgIGlmICh2aW0udmlzdWFsTGluZSAmJiBpc0JvdW5kYXJ5KGxpbmUsIDEsIHRydWUpKSB7XG4gICAgICAgIHZhciBhbmNob3IgPSB2aW0uc2VsLmFuY2hvcjtcbiAgICAgICAgaWYgKGlzQm91bmRhcnkoYW5jaG9yLmxpbmUsIC0xLCB0cnVlKSkge1xuICAgICAgICAgIGlmICghaW5jbHVzaXZlIHx8IGFuY2hvci5saW5lICE9IGxpbmUpIHtcbiAgICAgICAgICAgIGxpbmUgKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBzdGFydFN0YXRlID0gaXNFbXB0eShsaW5lKTtcbiAgICAgIGZvciAoaSA9IGxpbmU7IGkgPD0gbWF4ICYmIHJlcGVhdDsgaSsrKSB7XG4gICAgICAgIGlmIChpc0JvdW5kYXJ5KGksIDEsIHRydWUpKSB7XG4gICAgICAgICAgaWYgKCFpbmNsdXNpdmUgfHwgaXNFbXB0eShpKSAhPSBzdGFydFN0YXRlKSB7XG4gICAgICAgICAgICByZXBlYXQtLTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVuZCA9IG5ldyBQb3MoaSwgMCk7XG4gICAgICAvLyBzZWxlY3QgYm91bmRhcnkgYmVmb3JlIHBhcmFncmFwaCBmb3IgdGhlIGxhc3Qgb25lXG4gICAgICBpZiAoaSA+IG1heCAmJiAhc3RhcnRTdGF0ZSkgeyBzdGFydFN0YXRlID0gdHJ1ZTsgfVxuICAgICAgZWxzZSB7IGluY2x1c2l2ZSA9IGZhbHNlOyB9XG4gICAgICBmb3IgKGkgPSBsaW5lOyBpID4gbWluOyBpLS0pIHtcbiAgICAgICAgaWYgKCFpbmNsdXNpdmUgfHwgaXNFbXB0eShpKSA9PSBzdGFydFN0YXRlIHx8IGkgPT0gbGluZSkge1xuICAgICAgICAgIGlmIChpc0JvdW5kYXJ5KGksIC0xLCB0cnVlKSkgeyBicmVhazsgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBzdGFydCA9IG5ldyBQb3MoaSwgMCk7XG4gICAgICByZXR1cm4geyBzdGFydDogc3RhcnQsIGVuZDogZW5kIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQmFzZWQgb24ge0BsaW5rIGZpbmRTZW50ZW5jZX0uIFRoZSBpbnRlcm5hbCBmdW5jdGlvbnMgaGF2ZSB0aGUgc2FtZSBuYW1lcyxcbiAgICAgKiBidXQgdGhlaXIgYmVoYXZpb3VyIGlzIGRpZmZlcmVudC4gZmluZFNlbnRlbmNlKCkgY3Jvc3NlcyBsaW5lIGJyZWFrcyBhbmQgXG4gICAgICogaXMgdXNlZCBmb3IganVtcGluZyB0byBzZW50ZW5jZSBiZWdpbm5pbmdzIGJlZm9yZSBvciBhZnRlciB0aGUgY3VycmVudCBjdXJzb3IgcG9zaXRpb24sIFxuICAgICAqIHdoZXJlYXMgZ2V0U2VudGVuY2UoKSBpcyBmb3IgZ2V0dGluZyB0aGUgYmVnaW5uaW5nIG9yIGVuZCBvZiB0aGUgc2VudGVuY2UgXG4gICAgICogYXQgdGhlIGN1cnJlbnQgY3Vyc29yIHBvc2l0aW9uLCBlaXRoZXIgaW5jbHVkaW5nIChhKSBvciBleGNsdWRpbmcgKGkpIHdoaXRlc3BhY2UuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZ2V0U2VudGVuY2UoY20sIGN1ciwgcmVwZWF0LCBkaXIsIGluY2x1c2l2ZSAvKmluY2x1ZGVzIHdoaXRlc3BhY2UqLykge1xuXG4gICAgICAvKlxuICAgICAgICBUYWtlcyBhbiBpbmRleCBvYmplY3RcbiAgICAgICAge1xuICAgICAgICAgIGxpbmU6IHRoZSBsaW5lIHN0cmluZyxcbiAgICAgICAgICBsbjogbGluZSBudW1iZXIsXG4gICAgICAgICAgcG9zOiBpbmRleCBpbiBsaW5lLFxuICAgICAgICAgIGRpcjogZGlyZWN0aW9uIG9mIHRyYXZlcnNhbCAoLTEgb3IgMSlcbiAgICAgICAgfVxuICAgICAgICBhbmQgbW9kaWZpZXMgdGhlIHBvcyBtZW1iZXIgdG8gcmVwcmVzZW50IHRoZVxuICAgICAgICBuZXh0IHZhbGlkIHBvc2l0aW9uIG9yIHNldHMgdGhlIGxpbmUgdG8gbnVsbCBpZiB0aGVyZSBhcmVcbiAgICAgICAgbm8gbW9yZSB2YWxpZCBwb3NpdGlvbnMuXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIG5leHRDaGFyKGN1cnIpIHtcbiAgICAgICAgaWYgKGN1cnIucG9zICsgY3Vyci5kaXIgPCAwIHx8IGN1cnIucG9zICsgY3Vyci5kaXIgPj0gY3Vyci5saW5lLmxlbmd0aCkge1xuICAgICAgICAgIGN1cnIubGluZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY3Vyci5wb3MgKz0gY3Vyci5kaXI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC8qXG4gICAgICAgIFBlcmZvcm1zIG9uZSBpdGVyYXRpb24gb2YgdHJhdmVyc2FsIGluIGZvcndhcmQgZGlyZWN0aW9uXG4gICAgICAgIFJldHVybnMgYW4gaW5kZXggb2JqZWN0IG9mIHRoZSBzZW50ZW5jZSBlbmRcbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gZm9yd2FyZChjbSwgbG4sIHBvcywgZGlyKSB7XG4gICAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShsbik7XG5cbiAgICAgICAgdmFyIGN1cnIgPSB7XG4gICAgICAgICAgbGluZTogbGluZSxcbiAgICAgICAgICBsbjogbG4sXG4gICAgICAgICAgcG9zOiBwb3MsXG4gICAgICAgICAgZGlyOiBkaXIsXG4gICAgICAgIH07XG5cbiAgICAgICAgaWYgKGN1cnIubGluZSA9PT0gXCJcIikge1xuICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGN1cnIucG9zIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGFzdFNlbnRlbmNlUG9zID0gY3Vyci5wb3M7XG5cbiAgICAgICAgLy8gTW92ZSBvbmUgc3RlcCB0byBza2lwIGNoYXJhY3RlciB3ZSBzdGFydCBvblxuICAgICAgICBuZXh0Q2hhcihjdXJyKTtcblxuICAgICAgICB3aGlsZSAoY3Vyci5saW5lICE9PSBudWxsKSB7XG4gICAgICAgICAgbGFzdFNlbnRlbmNlUG9zID0gY3Vyci5wb3M7XG4gICAgICAgICAgaWYgKGlzRW5kT2ZTZW50ZW5jZVN5bWJvbChjdXJyLmxpbmVbY3Vyci5wb3NdKSkge1xuICAgICAgICAgICAgaWYgKCFpbmNsdXNpdmUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgbG46IGN1cnIubG4sIHBvczogY3Vyci5wb3MgKyAxIH07XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIG5leHRDaGFyKGN1cnIpO1xuICAgICAgICAgICAgICB3aGlsZSAoY3Vyci5saW5lICE9PSBudWxsICkge1xuICAgICAgICAgICAgICAgIGlmIChpc1doaXRlU3BhY2VTdHJpbmcoY3Vyci5saW5lW2N1cnIucG9zXSkpIHtcbiAgICAgICAgICAgICAgICAgIGxhc3RTZW50ZW5jZVBvcyA9IGN1cnIucG9zO1xuICAgICAgICAgICAgICAgICAgbmV4dENoYXIoY3VycilcbiAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGxhc3RTZW50ZW5jZVBvcyArIDEgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgbmV4dENoYXIoY3Vycik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgbG46IGN1cnIubG4sIHBvczogbGFzdFNlbnRlbmNlUG9zICsgMSB9O1xuICAgICAgfVxuXG4gICAgICAvKlxuICAgICAgICBQZXJmb3JtcyBvbmUgaXRlcmF0aW9uIG9mIHRyYXZlcnNhbCBpbiByZXZlcnNlIGRpcmVjdGlvblxuICAgICAgICBSZXR1cm5zIGFuIGluZGV4IG9iamVjdCBvZiB0aGUgc2VudGVuY2Ugc3RhcnRcbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gcmV2ZXJzZShjbSwgbG4sIHBvcywgZGlyKSB7XG4gICAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShsbik7XG5cbiAgICAgICAgdmFyIGN1cnIgPSB7XG4gICAgICAgICAgbGluZTogbGluZSxcbiAgICAgICAgICBsbjogbG4sXG4gICAgICAgICAgcG9zOiBwb3MsXG4gICAgICAgICAgZGlyOiBkaXIsXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY3Vyci5saW5lID09PSBcIlwiKSB7XG4gICAgICAgICAgcmV0dXJuIHsgbG46IGN1cnIubG4sIHBvczogY3Vyci5wb3MgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsYXN0U2VudGVuY2VQb3MgPSBjdXJyLnBvcztcblxuICAgICAgICAvLyBNb3ZlIG9uZSBzdGVwIHRvIHNraXAgY2hhcmFjdGVyIHdlIHN0YXJ0IG9uXG4gICAgICAgIG5leHRDaGFyKGN1cnIpO1xuXG4gICAgICAgIHdoaWxlIChjdXJyLmxpbmUgIT09IG51bGwpIHtcbiAgICAgICAgICBpZiAoIWlzV2hpdGVTcGFjZVN0cmluZyhjdXJyLmxpbmVbY3Vyci5wb3NdKSAmJiAhaXNFbmRPZlNlbnRlbmNlU3ltYm9sKGN1cnIubGluZVtjdXJyLnBvc10pKSB7XG4gICAgICAgICAgICBsYXN0U2VudGVuY2VQb3MgPSBjdXJyLnBvcztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBlbHNlIGlmIChpc0VuZE9mU2VudGVuY2VTeW1ib2woY3Vyci5saW5lW2N1cnIucG9zXSkgKSB7XG4gICAgICAgICAgICBpZiAoIWluY2x1c2l2ZSkge1xuICAgICAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBsYXN0U2VudGVuY2VQb3MgfTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGlzV2hpdGVTcGFjZVN0cmluZyhjdXJyLmxpbmVbY3Vyci5wb3MgKyAxXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBjdXJyLnBvcyArIDEgfTtcbiAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbG46IGN1cnIubG4sIHBvczogbGFzdFNlbnRlbmNlUG9zIH07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0Q2hhcihjdXJyKTtcbiAgICAgICAgfVxuICAgICAgICBjdXJyLmxpbmUgPSBsaW5lXG4gICAgICAgIGlmIChpbmNsdXNpdmUgJiYgaXNXaGl0ZVNwYWNlU3RyaW5nKGN1cnIubGluZVtjdXJyLnBvc10pKSB7XG4gICAgICAgICAgcmV0dXJuIHsgbG46IGN1cnIubG4sIHBvczogY3Vyci5wb3MgfTtcbiAgICAgICAgfSBcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHsgbG46IGN1cnIubG4sIHBvczogbGFzdFNlbnRlbmNlUG9zIH07XG4gICAgICAgIH1cblxuICAgICAgfVxuXG4gICAgICB2YXIgY3Vycl9pbmRleCA9IHtcbiAgICAgICAgbG46IGN1ci5saW5lLFxuICAgICAgICBwb3M6IGN1ci5jaCxcbiAgICAgIH07XG5cbiAgICAgIHdoaWxlIChyZXBlYXQgPiAwKSB7XG4gICAgICAgIGlmIChkaXIgPCAwKSB7XG4gICAgICAgICAgY3Vycl9pbmRleCA9IHJldmVyc2UoY20sIGN1cnJfaW5kZXgubG4sIGN1cnJfaW5kZXgucG9zLCBkaXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGN1cnJfaW5kZXggPSBmb3J3YXJkKGNtLCBjdXJyX2luZGV4LmxuLCBjdXJyX2luZGV4LnBvcywgZGlyKTtcbiAgICAgICAgfVxuICAgICAgICByZXBlYXQtLTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQb3MoY3Vycl9pbmRleC5sbiwgY3Vycl9pbmRleC5wb3MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmRTZW50ZW5jZShjbSwgY3VyLCByZXBlYXQsIGRpcikge1xuXG4gICAgICAgLypcbiAgICAgICAgIFRha2VzIGFuIGluZGV4IG9iamVjdFxuICAgICAgICAge1xuICAgICAgICAgICBsaW5lOiB0aGUgbGluZSBzdHJpbmcsXG4gICAgICAgICAgIGxuOiBsaW5lIG51bWJlcixcbiAgICAgICAgICAgcG9zOiBpbmRleCBpbiBsaW5lLFxuICAgICAgICAgICBkaXI6IGRpcmVjdGlvbiBvZiB0cmF2ZXJzYWwgKC0xIG9yIDEpXG4gICAgICAgICB9XG4gICAgICAgICBhbmQgbW9kaWZpZXMgdGhlIGxpbmUsIGxuLCBhbmQgcG9zIG1lbWJlcnMgdG8gcmVwcmVzZW50IHRoZVxuICAgICAgICAgbmV4dCB2YWxpZCBwb3NpdGlvbiBvciBzZXRzIHRoZW0gdG8gbnVsbCBpZiB0aGVyZSBhcmVcbiAgICAgICAgIG5vIG1vcmUgdmFsaWQgcG9zaXRpb25zLlxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBuZXh0Q2hhcihjbSwgaWR4KSB7XG4gICAgICAgIGlmIChpZHgucG9zICsgaWR4LmRpciA8IDAgfHwgaWR4LnBvcyArIGlkeC5kaXIgPj0gaWR4LmxpbmUubGVuZ3RoKSB7XG4gICAgICAgICAgaWR4LmxuICs9IGlkeC5kaXI7XG4gICAgICAgICAgaWYgKCFpc0xpbmUoY20sIGlkeC5sbikpIHtcbiAgICAgICAgICAgIGlkeC5saW5lID0gbnVsbDtcbiAgICAgICAgICAgIGlkeC5sbiA9IG51bGw7XG4gICAgICAgICAgICBpZHgucG9zID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWR4LmxpbmUgPSBjbS5nZXRMaW5lKGlkeC5sbik7XG4gICAgICAgICAgaWR4LnBvcyA9IChpZHguZGlyID4gMCkgPyAwIDogaWR4LmxpbmUubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZHgucG9zICs9IGlkeC5kaXI7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLypcbiAgICAgICAgUGVyZm9ybXMgb25lIGl0ZXJhdGlvbiBvZiB0cmF2ZXJzYWwgaW4gZm9yd2FyZCBkaXJlY3Rpb25cbiAgICAgICAgUmV0dXJucyBhbiBpbmRleCBvYmplY3Qgb2YgdGhlIG5ldyBsb2NhdGlvblxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBmb3J3YXJkKGNtLCBsbiwgcG9zLCBkaXIpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBjbS5nZXRMaW5lKGxuKTtcbiAgICAgICAgdmFyIHN0b3AgPSAobGluZSA9PT0gXCJcIik7XG5cbiAgICAgICAgdmFyIGN1cnIgPSB7XG4gICAgICAgICAgbGluZTogbGluZSxcbiAgICAgICAgICBsbjogbG4sXG4gICAgICAgICAgcG9zOiBwb3MsXG4gICAgICAgICAgZGlyOiBkaXIsXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGFzdF92YWxpZCA9IHtcbiAgICAgICAgICBsbjogY3Vyci5sbixcbiAgICAgICAgICBwb3M6IGN1cnIucG9zLFxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNraXBfZW1wdHlfbGluZXMgPSAoY3Vyci5saW5lID09PSBcIlwiKTtcblxuICAgICAgICAvLyBNb3ZlIG9uZSBzdGVwIHRvIHNraXAgY2hhcmFjdGVyIHdlIHN0YXJ0IG9uXG4gICAgICAgIG5leHRDaGFyKGNtLCBjdXJyKTtcblxuICAgICAgICB3aGlsZSAoY3Vyci5saW5lICE9PSBudWxsKSB7XG4gICAgICAgICAgbGFzdF92YWxpZC5sbiA9IGN1cnIubG47XG4gICAgICAgICAgbGFzdF92YWxpZC5wb3MgPSBjdXJyLnBvcztcblxuICAgICAgICAgIGlmIChjdXJyLmxpbmUgPT09IFwiXCIgJiYgIXNraXBfZW1wdHlfbGluZXMpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGN1cnIucG9zLCB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChzdG9wICYmIGN1cnIubGluZSAhPT0gXCJcIiAmJiAhaXNXaGl0ZVNwYWNlU3RyaW5nKGN1cnIubGluZVtjdXJyLnBvc10pKSB7XG4gICAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBjdXJyLnBvcywgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoaXNFbmRPZlNlbnRlbmNlU3ltYm9sKGN1cnIubGluZVtjdXJyLnBvc10pXG4gICAgICAgICAgICAmJiAhc3RvcFxuICAgICAgICAgICAgJiYgKGN1cnIucG9zID09PSBjdXJyLmxpbmUubGVuZ3RoIC0gMVxuICAgICAgICAgICAgICB8fCBpc1doaXRlU3BhY2VTdHJpbmcoY3Vyci5saW5lW2N1cnIucG9zICsgMV0pKSkge1xuICAgICAgICAgICAgc3RvcCA9IHRydWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dENoYXIoY20sIGN1cnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgICBTZXQgdGhlIHBvc2l0aW9uIHRvIHRoZSBsYXN0IG5vbiB3aGl0ZXNwYWNlIGNoYXJhY3RlciBvbiB0aGUgbGFzdFxuICAgICAgICAgIHZhbGlkIGxpbmUgaW4gdGhlIGNhc2UgdGhhdCB3ZSByZWFjaCB0aGUgZW5kIG9mIHRoZSBkb2N1bWVudC5cbiAgICAgICAgKi9cbiAgICAgICAgdmFyIGxpbmUgPSBjbS5nZXRMaW5lKGxhc3RfdmFsaWQubG4pO1xuICAgICAgICBsYXN0X3ZhbGlkLnBvcyA9IDA7XG4gICAgICAgIGZvcih2YXIgaSA9IGxpbmUubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICBpZiAoIWlzV2hpdGVTcGFjZVN0cmluZyhsaW5lW2ldKSkge1xuICAgICAgICAgICAgbGFzdF92YWxpZC5wb3MgPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxhc3RfdmFsaWQ7XG5cbiAgICAgIH1cblxuICAgICAgLypcbiAgICAgICAgUGVyZm9ybXMgb25lIGl0ZXJhdGlvbiBvZiB0cmF2ZXJzYWwgaW4gcmV2ZXJzZSBkaXJlY3Rpb25cbiAgICAgICAgUmV0dXJucyBhbiBpbmRleCBvYmplY3Qgb2YgdGhlIG5ldyBsb2NhdGlvblxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiByZXZlcnNlKGNtLCBsbiwgcG9zLCBkaXIpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBjbS5nZXRMaW5lKGxuKTtcblxuICAgICAgICB2YXIgY3VyciA9IHtcbiAgICAgICAgICBsaW5lOiBsaW5lLFxuICAgICAgICAgIGxuOiBsbixcbiAgICAgICAgICBwb3M6IHBvcyxcbiAgICAgICAgICBkaXI6IGRpcixcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsYXN0X3ZhbGlkID0ge1xuICAgICAgICAgIGxuOiBjdXJyLmxuLFxuICAgICAgICAgIHBvczogbnVsbCxcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgc2tpcF9lbXB0eV9saW5lcyA9IChjdXJyLmxpbmUgPT09IFwiXCIpO1xuXG4gICAgICAgIC8vIE1vdmUgb25lIHN0ZXAgdG8gc2tpcCBjaGFyYWN0ZXIgd2Ugc3RhcnQgb25cbiAgICAgICAgbmV4dENoYXIoY20sIGN1cnIpO1xuXG4gICAgICAgIHdoaWxlIChjdXJyLmxpbmUgIT09IG51bGwpIHtcblxuICAgICAgICAgIGlmIChjdXJyLmxpbmUgPT09IFwiXCIgJiYgIXNraXBfZW1wdHlfbGluZXMpIHtcbiAgICAgICAgICAgIGlmIChsYXN0X3ZhbGlkLnBvcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm4gbGFzdF92YWxpZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBjdXJyLnBvcyB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChpc0VuZE9mU2VudGVuY2VTeW1ib2woY3Vyci5saW5lW2N1cnIucG9zXSlcbiAgICAgICAgICAgICAgJiYgbGFzdF92YWxpZC5wb3MgIT09IG51bGxcbiAgICAgICAgICAgICAgJiYgIShjdXJyLmxuID09PSBsYXN0X3ZhbGlkLmxuICYmIGN1cnIucG9zICsgMSA9PT0gbGFzdF92YWxpZC5wb3MpKSB7XG4gICAgICAgICAgICByZXR1cm4gbGFzdF92YWxpZDtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoY3Vyci5saW5lICE9PSBcIlwiICYmICFpc1doaXRlU3BhY2VTdHJpbmcoY3Vyci5saW5lW2N1cnIucG9zXSkpIHtcbiAgICAgICAgICAgIHNraXBfZW1wdHlfbGluZXMgPSBmYWxzZTtcbiAgICAgICAgICAgIGxhc3RfdmFsaWQgPSB7IGxuOiBjdXJyLmxuLCBwb3M6IGN1cnIucG9zIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0Q2hhcihjbSwgY3Vycik7XG4gICAgICAgIH1cblxuICAgICAgICAvKlxuICAgICAgICAgIFNldCB0aGUgcG9zaXRpb24gdG8gdGhlIGZpcnN0IG5vbiB3aGl0ZXNwYWNlIGNoYXJhY3RlciBvbiB0aGUgbGFzdFxuICAgICAgICAgIHZhbGlkIGxpbmUgaW4gdGhlIGNhc2UgdGhhdCB3ZSByZWFjaCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBkb2N1bWVudC5cbiAgICAgICAgKi9cbiAgICAgICAgdmFyIGxpbmUgPSBjbS5nZXRMaW5lKGxhc3RfdmFsaWQubG4pO1xuICAgICAgICBsYXN0X3ZhbGlkLnBvcyA9IDA7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsaW5lLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgaWYgKCFpc1doaXRlU3BhY2VTdHJpbmcobGluZVtpXSkpIHtcbiAgICAgICAgICAgIGxhc3RfdmFsaWQucG9zID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGFzdF92YWxpZDtcbiAgICAgIH1cblxuICAgICAgdmFyIGN1cnJfaW5kZXggPSB7XG4gICAgICAgIGxuOiBjdXIubGluZSxcbiAgICAgICAgcG9zOiBjdXIuY2gsXG4gICAgICB9O1xuXG4gICAgICB3aGlsZSAocmVwZWF0ID4gMCkge1xuICAgICAgICBpZiAoZGlyIDwgMCkge1xuICAgICAgICAgIGN1cnJfaW5kZXggPSByZXZlcnNlKGNtLCBjdXJyX2luZGV4LmxuLCBjdXJyX2luZGV4LnBvcywgZGlyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjdXJyX2luZGV4ID0gZm9yd2FyZChjbSwgY3Vycl9pbmRleC5sbiwgY3Vycl9pbmRleC5wb3MsIGRpcik7XG4gICAgICAgIH1cbiAgICAgICAgcmVwZWF0LS07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUG9zKGN1cnJfaW5kZXgubG4sIGN1cnJfaW5kZXgucG9zKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBwZXJoYXBzIHRoaXMgZmluYWdsaW5nIG9mIHN0YXJ0IGFuZCBlbmQgcG9zaXRpb25zIGJlbG9uZ3NcbiAgICAvLyBpbiBjb2RlbWlycm9yL3JlcGxhY2VSYW5nZT9cbiAgICBmdW5jdGlvbiBzZWxlY3RDb21wYW5pb25PYmplY3QoY20sIGhlYWQsIHN5bWIsIGluY2x1c2l2ZSkge1xuICAgICAgdmFyIGN1ciA9IGhlYWQsIHN0YXJ0LCBlbmQ7XG5cbiAgICAgIHZhciBicmFja2V0UmVnZXhwID0gKHtcbiAgICAgICAgJygnOiAvWygpXS8sICcpJzogL1soKV0vLFxuICAgICAgICAnWyc6IC9bW1xcXV0vLCAnXSc6IC9bW1xcXV0vLFxuICAgICAgICAneyc6IC9be31dLywgJ30nOiAvW3t9XS8sXG4gICAgICAgICc8JzogL1s8Pl0vLCAnPic6IC9bPD5dL30pW3N5bWJdO1xuICAgICAgdmFyIG9wZW5TeW0gPSAoe1xuICAgICAgICAnKCc6ICcoJywgJyknOiAnKCcsXG4gICAgICAgICdbJzogJ1snLCAnXSc6ICdbJyxcbiAgICAgICAgJ3snOiAneycsICd9JzogJ3snLFxuICAgICAgICAnPCc6ICc8JywgJz4nOiAnPCd9KVtzeW1iXTtcbiAgICAgIHZhciBjdXJDaGFyID0gY20uZ2V0TGluZShjdXIubGluZSkuY2hhckF0KGN1ci5jaCk7XG4gICAgICAvLyBEdWUgdG8gdGhlIGJlaGF2aW9yIG9mIHNjYW5Gb3JCcmFja2V0LCB3ZSBuZWVkIHRvIGFkZCBhbiBvZmZzZXQgaWYgdGhlXG4gICAgICAvLyBjdXJzb3IgaXMgb24gYSBtYXRjaGluZyBvcGVuIGJyYWNrZXQuXG4gICAgICB2YXIgb2Zmc2V0ID0gY3VyQ2hhciA9PT0gb3BlblN5bSA/IDEgOiAwO1xuXG4gICAgICBzdGFydCA9IGNtLnNjYW5Gb3JCcmFja2V0KG5ldyBQb3MoY3VyLmxpbmUsIGN1ci5jaCArIG9mZnNldCksIC0xLCB1bmRlZmluZWQsIHsnYnJhY2tldFJlZ2V4JzogYnJhY2tldFJlZ2V4cH0pO1xuICAgICAgZW5kID0gY20uc2NhbkZvckJyYWNrZXQobmV3IFBvcyhjdXIubGluZSwgY3VyLmNoICsgb2Zmc2V0KSwgMSwgdW5kZWZpbmVkLCB7J2JyYWNrZXRSZWdleCc6IGJyYWNrZXRSZWdleHB9KTtcblxuICAgICAgaWYgKCFzdGFydCB8fCAhZW5kKSByZXR1cm4gbnVsbDtcblxuICAgICAgc3RhcnQgPSBzdGFydC5wb3M7XG4gICAgICBlbmQgPSBlbmQucG9zO1xuXG4gICAgICBpZiAoKHN0YXJ0LmxpbmUgPT0gZW5kLmxpbmUgJiYgc3RhcnQuY2ggPiBlbmQuY2gpXG4gICAgICAgICAgfHwgKHN0YXJ0LmxpbmUgPiBlbmQubGluZSkpIHtcbiAgICAgICAgdmFyIHRtcCA9IHN0YXJ0O1xuICAgICAgICBzdGFydCA9IGVuZDtcbiAgICAgICAgZW5kID0gdG1wO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW5jbHVzaXZlKSB7XG4gICAgICAgIGVuZC5jaCArPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhcnQuY2ggKz0gMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgc3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZCB9O1xuICAgIH1cblxuICAgIC8vIFRha2VzIGluIGEgc3ltYm9sIGFuZCBhIGN1cnNvciBhbmQgdHJpZXMgdG8gc2ltdWxhdGUgdGV4dCBvYmplY3RzIHRoYXRcbiAgICAvLyBoYXZlIGlkZW50aWNhbCBvcGVuaW5nIGFuZCBjbG9zaW5nIHN5bWJvbHNcbiAgICAvLyBUT0RPIHN1cHBvcnQgYWNyb3NzIG11bHRpcGxlIGxpbmVzXG4gICAgZnVuY3Rpb24gZmluZEJlZ2lubmluZ0FuZEVuZChjbSwgaGVhZCwgc3ltYiwgaW5jbHVzaXZlKSB7XG4gICAgICB2YXIgY3VyID0gY29weUN1cnNvcihoZWFkKTtcbiAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShjdXIubGluZSk7XG4gICAgICB2YXIgY2hhcnMgPSBsaW5lLnNwbGl0KCcnKTtcbiAgICAgIHZhciBzdGFydCwgZW5kLCBpLCBsZW47XG4gICAgICB2YXIgZmlyc3RJbmRleCA9IGNoYXJzLmluZGV4T2Yoc3ltYik7XG5cbiAgICAgIC8vIHRoZSBkZWNpc2lvbiB0cmVlIGlzIHRvIGFsd2F5cyBsb29rIGJhY2t3YXJkcyBmb3IgdGhlIGJlZ2lubmluZyBmaXJzdCxcbiAgICAgIC8vIGJ1dCBpZiB0aGUgY3Vyc29yIGlzIGluIGZyb250IG9mIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiB0aGUgc3ltYixcbiAgICAgIC8vIHRoZW4gbW92ZSB0aGUgY3Vyc29yIGZvcndhcmRcbiAgICAgIGlmIChjdXIuY2ggPCBmaXJzdEluZGV4KSB7XG4gICAgICAgIGN1ci5jaCA9IGZpcnN0SW5kZXg7XG4gICAgICB9XG4gICAgICAvLyBvdGhlcndpc2UgaWYgdGhlIGN1cnNvciBpcyBjdXJyZW50bHkgb24gdGhlIGNsb3Npbmcgc3ltYm9sXG4gICAgICBlbHNlIGlmIChmaXJzdEluZGV4IDwgY3VyLmNoICYmIGNoYXJzW2N1ci5jaF0gPT0gc3ltYikge1xuICAgICAgICB2YXIgc3RyaW5nQWZ0ZXIgPSAvc3RyaW5nLy50ZXN0KGNtLmdldFRva2VuVHlwZUF0KG9mZnNldEN1cnNvcihoZWFkLCAwLCAxKSkpO1xuICAgICAgICB2YXIgc3RyaW5nQmVmb3JlID0gL3N0cmluZy8udGVzdChjbS5nZXRUb2tlblR5cGVBdChoZWFkKSk7XG4gICAgICAgIHZhciBpc1N0cmluZ1N0YXJ0ID0gc3RyaW5nQWZ0ZXIgJiYgIXN0cmluZ0JlZm9yZVxuICAgICAgICBpZiAoIWlzU3RyaW5nU3RhcnQpIHtcbiAgICAgICAgICBlbmQgPSBjdXIuY2g7IC8vIGFzc2lnbiBlbmQgdG8gdGhlIGN1cnJlbnQgY3Vyc29yXG4gICAgICAgICAgLS1jdXIuY2g7IC8vIG1ha2Ugc3VyZSB0byBsb29rIGJhY2t3YXJkc1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHdlJ3JlIGN1cnJlbnRseSBvbiB0aGUgc3ltYm9sLCB3ZSd2ZSBnb3QgYSBzdGFydFxuICAgICAgaWYgKGNoYXJzW2N1ci5jaF0gPT0gc3ltYiAmJiAhZW5kKSB7XG4gICAgICAgIHN0YXJ0ID0gY3VyLmNoICsgMTsgLy8gYXNzaWduIHN0YXJ0IHRvIGFoZWFkIG9mIHRoZSBjdXJzb3JcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGdvIGJhY2t3YXJkcyB0byBmaW5kIHRoZSBzdGFydFxuICAgICAgICBmb3IgKGkgPSBjdXIuY2g7IGkgPiAtMSAmJiAhc3RhcnQ7IGktLSkge1xuICAgICAgICAgIGlmIChjaGFyc1tpXSA9PSBzeW1iKSB7XG4gICAgICAgICAgICBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBsb29rIGZvcndhcmRzIGZvciB0aGUgZW5kIHN5bWJvbFxuICAgICAgaWYgKHN0YXJ0ICYmICFlbmQpIHtcbiAgICAgICAgZm9yIChpID0gc3RhcnQsIGxlbiA9IGNoYXJzLmxlbmd0aDsgaSA8IGxlbiAmJiAhZW5kOyBpKyspIHtcbiAgICAgICAgICBpZiAoY2hhcnNbaV0gPT0gc3ltYikge1xuICAgICAgICAgICAgZW5kID0gaTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gbm90aGluZyBmb3VuZFxuICAgICAgaWYgKCFzdGFydCB8fCAhZW5kKSB7XG4gICAgICAgIHJldHVybiB7IHN0YXJ0OiBjdXIsIGVuZDogY3VyIH07XG4gICAgICB9XG5cbiAgICAgIC8vIGluY2x1ZGUgdGhlIHN5bWJvbHNcbiAgICAgIGlmIChpbmNsdXNpdmUpIHtcbiAgICAgICAgLS1zdGFydDsgKytlbmQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBuZXcgUG9zKGN1ci5saW5lLCBzdGFydCksXG4gICAgICAgIGVuZDogbmV3IFBvcyhjdXIubGluZSwgZW5kKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBTZWFyY2ggZnVuY3Rpb25zXG4gICAgZGVmaW5lT3B0aW9uKCdwY3JlJywgdHJ1ZSwgJ2Jvb2xlYW4nKTtcbiAgICBmdW5jdGlvbiBTZWFyY2hTdGF0ZSgpIHt9XG4gICAgU2VhcmNoU3RhdGUucHJvdG90eXBlID0ge1xuICAgICAgZ2V0UXVlcnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmltR2xvYmFsU3RhdGUucXVlcnk7XG4gICAgICB9LFxuICAgICAgc2V0UXVlcnk6IGZ1bmN0aW9uKHF1ZXJ5KSB7XG4gICAgICAgIHZpbUdsb2JhbFN0YXRlLnF1ZXJ5ID0gcXVlcnk7XG4gICAgICB9LFxuICAgICAgZ2V0T3ZlcmxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaE92ZXJsYXk7XG4gICAgICB9LFxuICAgICAgc2V0T3ZlcmxheTogZnVuY3Rpb24ob3ZlcmxheSkge1xuICAgICAgICB0aGlzLnNlYXJjaE92ZXJsYXkgPSBvdmVybGF5O1xuICAgICAgfSxcbiAgICAgIGlzUmV2ZXJzZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmltR2xvYmFsU3RhdGUuaXNSZXZlcnNlZDtcbiAgICAgIH0sXG4gICAgICBzZXRSZXZlcnNlZDogZnVuY3Rpb24ocmV2ZXJzZWQpIHtcbiAgICAgICAgdmltR2xvYmFsU3RhdGUuaXNSZXZlcnNlZCA9IHJldmVyc2VkO1xuICAgICAgfSxcbiAgICAgIGdldFNjcm9sbGJhckFubm90YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5ub3RhdGU7XG4gICAgICB9LFxuICAgICAgc2V0U2Nyb2xsYmFyQW5ub3RhdGU6IGZ1bmN0aW9uKGFubm90YXRlKSB7XG4gICAgICAgIHRoaXMuYW5ub3RhdGUgPSBhbm5vdGF0ZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGZ1bmN0aW9uIGdldFNlYXJjaFN0YXRlKGNtKSB7XG4gICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgcmV0dXJuIHZpbS5zZWFyY2hTdGF0ZV8gfHwgKHZpbS5zZWFyY2hTdGF0ZV8gPSBuZXcgU2VhcmNoU3RhdGUoKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNwbGl0QnlTbGFzaChhcmdTdHJpbmcpIHtcbiAgICAgIHJldHVybiBzcGxpdEJ5U2VwYXJhdG9yKGFyZ1N0cmluZywgJy8nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kVW5lc2NhcGVkU2xhc2hlcyhhcmdTdHJpbmcpIHtcbiAgICAgIHJldHVybiBmaW5kVW5lc2NhcGVkU2VwYXJhdG9ycyhhcmdTdHJpbmcsICcvJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3BsaXRCeVNlcGFyYXRvcihhcmdTdHJpbmcsIHNlcGFyYXRvcikge1xuICAgICAgdmFyIHNsYXNoZXMgPSBmaW5kVW5lc2NhcGVkU2VwYXJhdG9ycyhhcmdTdHJpbmcsIHNlcGFyYXRvcikgfHwgW107XG4gICAgICBpZiAoIXNsYXNoZXMubGVuZ3RoKSByZXR1cm4gW107XG4gICAgICB2YXIgdG9rZW5zID0gW107XG4gICAgICAvLyBpbiBjYXNlIG9mIHN0cmluZ3MgbGlrZSBmb28vYmFyXG4gICAgICBpZiAoc2xhc2hlc1swXSAhPT0gMCkgcmV0dXJuO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGFzaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2xhc2hlc1tpXSA9PSAnbnVtYmVyJylcbiAgICAgICAgICB0b2tlbnMucHVzaChhcmdTdHJpbmcuc3Vic3RyaW5nKHNsYXNoZXNbaV0gKyAxLCBzbGFzaGVzW2krMV0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlbnM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluZFVuZXNjYXBlZFNlcGFyYXRvcnMoc3RyLCBzZXBhcmF0b3IpIHtcbiAgICAgIGlmICghc2VwYXJhdG9yKVxuICAgICAgICBzZXBhcmF0b3IgPSAnLyc7XG5cbiAgICAgIHZhciBlc2NhcGVOZXh0Q2hhciA9IGZhbHNlO1xuICAgICAgdmFyIHNsYXNoZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgaWYgKCFlc2NhcGVOZXh0Q2hhciAmJiBjID09IHNlcGFyYXRvcikge1xuICAgICAgICAgIHNsYXNoZXMucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICBlc2NhcGVOZXh0Q2hhciA9ICFlc2NhcGVOZXh0Q2hhciAmJiAoYyA9PSAnXFxcXCcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNsYXNoZXM7XG4gICAgfVxuXG4gICAgLy8gVHJhbnNsYXRlcyBhIHNlYXJjaCBzdHJpbmcgZnJvbSBleCAodmltKSBzeW50YXggaW50byBqYXZhc2NyaXB0IGZvcm0uXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlUmVnZXgoc3RyKSB7XG4gICAgICAvLyBXaGVuIHRoZXNlIG1hdGNoLCBhZGQgYSAnXFwnIGlmIHVuZXNjYXBlZCBvciByZW1vdmUgb25lIGlmIGVzY2FwZWQuXG4gICAgICB2YXIgc3BlY2lhbHMgPSAnfCgpeyc7XG4gICAgICAvLyBSZW1vdmUsIGJ1dCBuZXZlciBhZGQsIGEgJ1xcJyBmb3IgdGhlc2UuXG4gICAgICB2YXIgdW5lc2NhcGUgPSAnfSc7XG4gICAgICB2YXIgZXNjYXBlTmV4dENoYXIgPSBmYWxzZTtcbiAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAtMTsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQXQoaSkgfHwgJyc7XG4gICAgICAgIHZhciBuID0gc3RyLmNoYXJBdChpKzEpIHx8ICcnO1xuICAgICAgICB2YXIgc3BlY2lhbENvbWVzTmV4dCA9IChuICYmIHNwZWNpYWxzLmluZGV4T2YobikgIT0gLTEpO1xuICAgICAgICBpZiAoZXNjYXBlTmV4dENoYXIpIHtcbiAgICAgICAgICBpZiAoYyAhPT0gJ1xcXFwnIHx8ICFzcGVjaWFsQ29tZXNOZXh0KSB7XG4gICAgICAgICAgICBvdXQucHVzaChjKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXNjYXBlTmV4dENoYXIgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoYyA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICBlc2NhcGVOZXh0Q2hhciA9IHRydWU7XG4gICAgICAgICAgICAvLyBUcmVhdCB0aGUgdW5lc2NhcGUgbGlzdCBhcyBzcGVjaWFsIGZvciByZW1vdmluZywgYnV0IG5vdCBhZGRpbmcgJ1xcJy5cbiAgICAgICAgICAgIGlmIChuICYmIHVuZXNjYXBlLmluZGV4T2YobikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgc3BlY2lhbENvbWVzTmV4dCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOb3QgcGFzc2luZyB0aGlzIHRlc3QgbWVhbnMgcmVtb3ZpbmcgYSAnXFwnLlxuICAgICAgICAgICAgaWYgKCFzcGVjaWFsQ29tZXNOZXh0IHx8IG4gPT09ICdcXFxcJykge1xuICAgICAgICAgICAgICBvdXQucHVzaChjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0LnB1c2goYyk7XG4gICAgICAgICAgICBpZiAoc3BlY2lhbENvbWVzTmV4dCAmJiBuICE9PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgb3V0LnB1c2goJ1xcXFwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXQuam9pbignJyk7XG4gICAgfVxuXG4gICAgLy8gVHJhbnNsYXRlcyB0aGUgcmVwbGFjZSBwYXJ0IG9mIGEgc2VhcmNoIGFuZCByZXBsYWNlIGZyb20gZXggKHZpbSkgc3ludGF4IGludG9cbiAgICAvLyBqYXZhc2NyaXB0IGZvcm0uICBTaW1pbGFyIHRvIHRyYW5zbGF0ZVJlZ2V4LCBidXQgYWRkaXRpb25hbGx5IGZpeGVzIGJhY2sgcmVmZXJlbmNlc1xuICAgIC8vICh0cmFuc2xhdGVzICdcXFswLi45XScgdG8gJyRbMC4uOV0nKSBhbmQgZm9sbG93cyBkaWZmZXJlbnQgcnVsZXMgZm9yIGVzY2FwaW5nICckJy5cbiAgICB2YXIgY2hhclVuZXNjYXBlcyA9IHsnXFxcXG4nOiAnXFxuJywgJ1xcXFxyJzogJ1xccicsICdcXFxcdCc6ICdcXHQnfTtcbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVSZWdleFJlcGxhY2Uoc3RyKSB7XG4gICAgICB2YXIgZXNjYXBlTmV4dENoYXIgPSBmYWxzZTtcbiAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAtMTsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQXQoaSkgfHwgJyc7XG4gICAgICAgIHZhciBuID0gc3RyLmNoYXJBdChpKzEpIHx8ICcnO1xuICAgICAgICBpZiAoY2hhclVuZXNjYXBlc1tjICsgbl0pIHtcbiAgICAgICAgICBvdXQucHVzaChjaGFyVW5lc2NhcGVzW2Mrbl0pO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfSBlbHNlIGlmIChlc2NhcGVOZXh0Q2hhcikge1xuICAgICAgICAgIC8vIEF0IGFueSBwb2ludCBpbiB0aGUgbG9vcCwgZXNjYXBlTmV4dENoYXIgaXMgdHJ1ZSBpZiB0aGUgcHJldmlvdXNcbiAgICAgICAgICAvLyBjaGFyYWN0ZXIgd2FzIGEgJ1xcJyBhbmQgd2FzIG5vdCBlc2NhcGVkLlxuICAgICAgICAgIG91dC5wdXNoKGMpO1xuICAgICAgICAgIGVzY2FwZU5leHRDaGFyID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGMgPT09ICdcXFxcJykge1xuICAgICAgICAgICAgZXNjYXBlTmV4dENoYXIgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKChpc051bWJlcihuKSB8fCBuID09PSAnJCcpKSB7XG4gICAgICAgICAgICAgIG91dC5wdXNoKCckJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gIT09ICcvJyAmJiBuICE9PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgb3V0LnB1c2goJ1xcXFwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGMgPT09ICckJykge1xuICAgICAgICAgICAgICBvdXQucHVzaCgnJCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0LnB1c2goYyk7XG4gICAgICAgICAgICBpZiAobiA9PT0gJy8nKSB7XG4gICAgICAgICAgICAgIG91dC5wdXNoKCdcXFxcJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0LmpvaW4oJycpO1xuICAgIH1cblxuICAgIC8vIFVuZXNjYXBlIFxcIGFuZCAvIGluIHRoZSByZXBsYWNlIHBhcnQsIGZvciBQQ1JFIG1vZGUuXG4gICAgdmFyIHVuZXNjYXBlcyA9IHsnXFxcXC8nOiAnLycsICdcXFxcXFxcXCc6ICdcXFxcJywgJ1xcXFxuJzogJ1xcbicsICdcXFxccic6ICdcXHInLCAnXFxcXHQnOiAnXFx0JywgJ1xcXFwmJzonJid9O1xuICAgIGZ1bmN0aW9uIHVuZXNjYXBlUmVnZXhSZXBsYWNlKHN0cikge1xuICAgICAgdmFyIHN0cmVhbSA9IG5ldyBDb2RlTWlycm9yLlN0cmluZ1N0cmVhbShzdHIpO1xuICAgICAgdmFyIG91dHB1dCA9IFtdO1xuICAgICAgd2hpbGUgKCFzdHJlYW0uZW9sKCkpIHtcbiAgICAgICAgLy8gU2VhcmNoIGZvciBcXC5cbiAgICAgICAgd2hpbGUgKHN0cmVhbS5wZWVrKCkgJiYgc3RyZWFtLnBlZWsoKSAhPSAnXFxcXCcpIHtcbiAgICAgICAgICBvdXRwdXQucHVzaChzdHJlYW0ubmV4dCgpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWF0Y2hlZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBtYXRjaGVyIGluIHVuZXNjYXBlcykge1xuICAgICAgICAgIGlmIChzdHJlYW0ubWF0Y2gobWF0Y2hlciwgdHJ1ZSkpIHtcbiAgICAgICAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgb3V0cHV0LnB1c2godW5lc2NhcGVzW21hdGNoZXJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1hdGNoZWQpIHtcbiAgICAgICAgICAvLyBEb24ndCBjaGFuZ2UgYW55dGhpbmdcbiAgICAgICAgICBvdXRwdXQucHVzaChzdHJlYW0ubmV4dCgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dC5qb2luKCcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHRyYWN0IHRoZSByZWd1bGFyIGV4cHJlc3Npb24gZnJvbSB0aGUgcXVlcnkgYW5kIHJldHVybiBhIFJlZ2V4cCBvYmplY3QuXG4gICAgICogUmV0dXJucyBudWxsIGlmIHRoZSBxdWVyeSBpcyBibGFuay5cbiAgICAgKiBJZiBpZ25vcmVDYXNlIGlzIHBhc3NlZCBpbiwgdGhlIFJlZ2V4cCBvYmplY3Qgd2lsbCBoYXZlIHRoZSAnaScgZmxhZyBzZXQuXG4gICAgICogSWYgc21hcnRDYXNlIGlzIHBhc3NlZCBpbiwgYW5kIHRoZSBxdWVyeSBjb250YWlucyB1cHBlciBjYXNlIGxldHRlcnMsXG4gICAgICogICB0aGVuIGlnbm9yZUNhc2UgaXMgb3ZlcnJpZGRlbiwgYW5kIHRoZSAnaScgZmxhZyB3aWxsIG5vdCBiZSBzZXQuXG4gICAgICogSWYgdGhlIHF1ZXJ5IGNvbnRhaW5zIHRoZSAvaSBpbiB0aGUgZmxhZyBwYXJ0IG9mIHRoZSByZWd1bGFyIGV4cHJlc3Npb24sXG4gICAgICogICB0aGVuIGJvdGggaWdub3JlQ2FzZSBhbmQgc21hcnRDYXNlIGFyZSBpZ25vcmVkLCBhbmQgJ2knIHdpbGwgYmUgcGFzc2VkXG4gICAgICogICB0aHJvdWdoIHRvIHRoZSBSZWdleCBvYmplY3QuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcGFyc2VRdWVyeShxdWVyeSwgaWdub3JlQ2FzZSwgc21hcnRDYXNlKSB7XG4gICAgICAvLyBGaXJzdCB1cGRhdGUgdGhlIGxhc3Qgc2VhcmNoIHJlZ2lzdGVyXG4gICAgICB2YXIgbGFzdFNlYXJjaFJlZ2lzdGVyID0gdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmdldFJlZ2lzdGVyKCcvJyk7XG4gICAgICBsYXN0U2VhcmNoUmVnaXN0ZXIuc2V0VGV4dChxdWVyeSk7XG4gICAgICAvLyBDaGVjayBpZiB0aGUgcXVlcnkgaXMgYWxyZWFkeSBhIHJlZ2V4LlxuICAgICAgaWYgKHF1ZXJ5IGluc3RhbmNlb2YgUmVnRXhwKSB7IHJldHVybiBxdWVyeTsgfVxuICAgICAgLy8gRmlyc3QgdHJ5IHRvIGV4dHJhY3QgcmVnZXggKyBmbGFncyBmcm9tIHRoZSBpbnB1dC4gSWYgbm8gZmxhZ3MgZm91bmQsXG4gICAgICAvLyBleHRyYWN0IGp1c3QgdGhlIHJlZ2V4LiBJRSBkb2VzIG5vdCBhY2NlcHQgZmxhZ3MgZGlyZWN0bHkgZGVmaW5lZCBpblxuICAgICAgLy8gdGhlIHJlZ2V4IHN0cmluZyBpbiB0aGUgZm9ybSAvcmVnZXgvZmxhZ3NcbiAgICAgIHZhciBzbGFzaGVzID0gZmluZFVuZXNjYXBlZFNsYXNoZXMocXVlcnkpO1xuICAgICAgdmFyIHJlZ2V4UGFydDtcbiAgICAgIHZhciBmb3JjZUlnbm9yZUNhc2U7XG4gICAgICBpZiAoIXNsYXNoZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIFF1ZXJ5IGxvb2tzIGxpa2UgJ3JlZ2V4cCdcbiAgICAgICAgcmVnZXhQYXJ0ID0gcXVlcnk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBRdWVyeSBsb29rcyBsaWtlICdyZWdleHAvLi4uJ1xuICAgICAgICByZWdleFBhcnQgPSBxdWVyeS5zdWJzdHJpbmcoMCwgc2xhc2hlc1swXSk7XG4gICAgICAgIHZhciBmbGFnc1BhcnQgPSBxdWVyeS5zdWJzdHJpbmcoc2xhc2hlc1swXSk7XG4gICAgICAgIGZvcmNlSWdub3JlQ2FzZSA9IChmbGFnc1BhcnQuaW5kZXhPZignaScpICE9IC0xKTtcbiAgICAgIH1cbiAgICAgIGlmICghcmVnZXhQYXJ0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKCFnZXRPcHRpb24oJ3BjcmUnKSkge1xuICAgICAgICByZWdleFBhcnQgPSB0cmFuc2xhdGVSZWdleChyZWdleFBhcnQpO1xuICAgICAgfVxuICAgICAgaWYgKHNtYXJ0Q2FzZSkge1xuICAgICAgICBpZ25vcmVDYXNlID0gKC9eW15BLVpdKiQvKS50ZXN0KHJlZ2V4UGFydCk7XG4gICAgICB9XG4gICAgICB2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cChyZWdleFBhcnQsXG4gICAgICAgICAgKGlnbm9yZUNhc2UgfHwgZm9yY2VJZ25vcmVDYXNlKSA/ICdpbScgOiAnbScpO1xuICAgICAgcmV0dXJuIHJlZ2V4cDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBkb20gLSBEb2N1bWVudCBPYmplY3QgTWFuaXB1bGF0b3JcbiAgICAgKiBVc2FnZTpcbiAgICAgKiAgIGRvbSgnPHRhZz4nfDxub2RlPlssIC4uLns8YXR0cmlidXRlcz58PCRzdHlsZXM+fXw8Y2hpbGQtbm9kZT58Jzx0ZXh0PiddKVxuICAgICAqIEV4YW1wbGVzOlxuICAgICAqICAgZG9tKCdkaXYnLCB7aWQ6J3h5eid9LCBkb20oJ3AnLCAnQ00gcm9ja3MhJywgeyRjb2xvcjoncmVkJ30pKVxuICAgICAqICAgZG9tKGRvY3VtZW50LmhlYWQsIGRvbSgnc2NyaXB0JywgJ2FsZXJ0KFwiaGVsbG8hXCIpJykpXG4gICAgICogTm90IHN1cHBvcnRlZDpcbiAgICAgKiAgIGRvbSgncCcsIFsnYXJyYXlzIGFyZSBvYmplY3RzJ10sIEVycm9yKCdvYmplY3RzIHNwZWNpZnkgYXR0cmlidXRlcycpKVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRvbShuKSB7XG4gICAgICBpZiAodHlwZW9mIG4gPT09ICdzdHJpbmcnKSBuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuKTtcbiAgICAgIGZvciAodmFyIGEsIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghKGEgPSBhcmd1bWVudHNbaV0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKHR5cGVvZiBhICE9PSAnb2JqZWN0JykgYSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGEpO1xuICAgICAgICBpZiAoYS5ub2RlVHlwZSkgbi5hcHBlbmRDaGlsZChhKTtcbiAgICAgICAgZWxzZSBmb3IgKHZhciBrZXkgaW4gYSkge1xuICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGEsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICAgIGlmIChrZXlbMF0gPT09ICckJykgbi5zdHlsZVtrZXkuc2xpY2UoMSldID0gYVtrZXldO1xuICAgICAgICAgIGVsc2Ugbi5zZXRBdHRyaWJ1dGUoa2V5LCBhW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93Q29uZmlybShjbSwgdGVtcGxhdGUpIHtcbiAgICAgIHZhciBwcmUgPSBkb20oJ2RpdicsIHskY29sb3I6ICdyZWQnLCAkd2hpdGVTcGFjZTogJ3ByZScsIGNsYXNzOiAnY20tdmltLW1lc3NhZ2UnfSwgdGVtcGxhdGUpO1xuICAgICAgaWYgKGNtLm9wZW5Ob3RpZmljYXRpb24pIHtcbiAgICAgICAgY20ub3Blbk5vdGlmaWNhdGlvbihwcmUsIHtib3R0b206IHRydWUsIGR1cmF0aW9uOiA1MDAwfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydChwcmUuaW5uZXJUZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlUHJvbXB0KHByZWZpeCwgZGVzYykge1xuICAgICAgcmV0dXJuIGRvbSgnZGl2JywgeyRkaXNwbGF5OiAnZmxleCd9LFxuICAgICAgICAgICAgICAgZG9tKCdzcGFuJywgeyRmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgJHdoaXRlU3BhY2U6ICdwcmUnLCAkZmxleDogMX0sXG4gICAgICAgICAgICAgICAgIHByZWZpeCxcbiAgICAgICAgICAgICAgICAgZG9tKCdpbnB1dCcsIHt0eXBlOiAndGV4dCcsIGF1dG9jb3JyZWN0OiAnb2ZmJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhdXRvY2FwaXRhbGl6ZTogJ29mZicsIHNwZWxsY2hlY2s6ICdmYWxzZScsICR3aWR0aDogJzEwMCUnfSkpLFxuICAgICAgICAgICAgICAgZGVzYyAmJiBkb20oJ3NwYW4nLCB7JGNvbG9yOiAnIzg4OCd9LCBkZXNjKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd1Byb21wdChjbSwgb3B0aW9ucykge1xuICAgICAgaWYgKGtleVRvS2V5U3RhY2subGVuZ3RoKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy52YWx1ZSkgb3B0aW9ucy52YWx1ZSA9ICcnO1xuICAgICAgICB2aXJ0dWFsUHJvbXB0ID0gb3B0aW9ucztcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIHRlbXBsYXRlID0gbWFrZVByb21wdChvcHRpb25zLnByZWZpeCwgb3B0aW9ucy5kZXNjKTtcbiAgICAgIGlmIChjbS5vcGVuRGlhbG9nKSB7XG4gICAgICAgIGNtLm9wZW5EaWFsb2codGVtcGxhdGUsIG9wdGlvbnMub25DbG9zZSwge1xuICAgICAgICAgIG9uS2V5RG93bjogb3B0aW9ucy5vbktleURvd24sIG9uS2V5VXA6IG9wdGlvbnMub25LZXlVcCxcbiAgICAgICAgICBib3R0b206IHRydWUsIHNlbGVjdFZhbHVlT25PcGVuOiBmYWxzZSwgdmFsdWU6IG9wdGlvbnMudmFsdWVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIHNob3J0VGV4dCA9ICcnO1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMucHJlZml4ICE9IFwic3RyaW5nXCIgJiYgb3B0aW9ucy5wcmVmaXgpIHNob3J0VGV4dCArPSBvcHRpb25zLnByZWZpeC50ZXh0Q29udGVudDtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGVzYykgc2hvcnRUZXh0ICs9IFwiIFwiICsgb3B0aW9ucy5kZXNjO1xuICAgICAgICBvcHRpb25zLm9uQ2xvc2UocHJvbXB0KHNob3J0VGV4dCwgJycpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWdleEVxdWFsKHIxLCByMikge1xuICAgICAgaWYgKHIxIGluc3RhbmNlb2YgUmVnRXhwICYmIHIyIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgdmFyIHByb3BzID0gWydnbG9iYWwnLCAnbXVsdGlsaW5lJywgJ2lnbm9yZUNhc2UnLCAnc291cmNlJ107XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgICAgICAgICBpZiAocjFbcHJvcF0gIT09IHIyW3Byb3BdKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFJldHVybnMgdHJ1ZSBpZiB0aGUgcXVlcnkgaXMgdmFsaWQuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2VhcmNoUXVlcnkoY20sIHJhd1F1ZXJ5LCBpZ25vcmVDYXNlLCBzbWFydENhc2UpIHtcbiAgICAgIGlmICghcmF3UXVlcnkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIHN0YXRlID0gZ2V0U2VhcmNoU3RhdGUoY20pO1xuICAgICAgdmFyIHF1ZXJ5ID0gcGFyc2VRdWVyeShyYXdRdWVyeSwgISFpZ25vcmVDYXNlLCAhIXNtYXJ0Q2FzZSk7XG4gICAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGhpZ2hsaWdodFNlYXJjaE1hdGNoZXMoY20sIHF1ZXJ5KTtcbiAgICAgIGlmIChyZWdleEVxdWFsKHF1ZXJ5LCBzdGF0ZS5nZXRRdWVyeSgpKSkge1xuICAgICAgICByZXR1cm4gcXVlcnk7XG4gICAgICB9XG4gICAgICBzdGF0ZS5zZXRRdWVyeShxdWVyeSk7XG4gICAgICByZXR1cm4gcXVlcnk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNlYXJjaE92ZXJsYXkocXVlcnkpIHtcbiAgICAgIGlmIChxdWVyeS5zb3VyY2UuY2hhckF0KDApID09ICdeJykge1xuICAgICAgICB2YXIgbWF0Y2hTb2wgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW46IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAgIGlmIChtYXRjaFNvbCAmJiAhc3RyZWFtLnNvbCgpKSB7XG4gICAgICAgICAgICBzdHJlYW0uc2tpcFRvRW5kKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBtYXRjaCA9IHN0cmVhbS5tYXRjaChxdWVyeSwgZmFsc2UpO1xuICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgaWYgKG1hdGNoWzBdLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgIC8vIE1hdGNoZWQgZW1wdHkgc3RyaW5nLCBza2lwIHRvIG5leHQuXG4gICAgICAgICAgICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgICAgICAgICAgIHJldHVybiAnc2VhcmNoaW5nJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc3RyZWFtLnNvbCgpKSB7XG4gICAgICAgICAgICAgIC8vIEJhY2t0cmFjayAxIHRvIG1hdGNoIFxcYlxuICAgICAgICAgICAgICBzdHJlYW0uYmFja1VwKDEpO1xuICAgICAgICAgICAgICBpZiAoIXF1ZXJ5LmV4ZWMoc3RyZWFtLm5leHQoKSArIG1hdGNoWzBdKSkge1xuICAgICAgICAgICAgICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0cmVhbS5tYXRjaChxdWVyeSk7XG4gICAgICAgICAgICByZXR1cm4gJ3NlYXJjaGluZyc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHdoaWxlICghc3RyZWFtLmVvbCgpKSB7XG4gICAgICAgICAgICBzdHJlYW0ubmV4dCgpO1xuICAgICAgICAgICAgaWYgKHN0cmVhbS5tYXRjaChxdWVyeSwgZmFsc2UpKSBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHF1ZXJ5OiBxdWVyeVxuICAgICAgfTtcbiAgICB9XG4gICAgdmFyIGhpZ2hsaWdodFRpbWVvdXQgPSAwO1xuICAgIGZ1bmN0aW9uIGhpZ2hsaWdodFNlYXJjaE1hdGNoZXMoY20sIHF1ZXJ5KSB7XG4gICAgICBjbGVhclRpbWVvdXQoaGlnaGxpZ2h0VGltZW91dCk7XG4gICAgICB2YXIgc2VhcmNoU3RhdGUgPSBnZXRTZWFyY2hTdGF0ZShjbSk7XG4gICAgICBzZWFyY2hTdGF0ZS5oaWdobGlnaHRUaW1lb3V0ID0gaGlnaGxpZ2h0VGltZW91dDtcbiAgICAgIGhpZ2hsaWdodFRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIWNtLnN0YXRlLnZpbSkgcmV0dXJuO1xuICAgICAgICB2YXIgc2VhcmNoU3RhdGUgPSBnZXRTZWFyY2hTdGF0ZShjbSk7XG4gICAgICAgIHNlYXJjaFN0YXRlLmhpZ2hsaWdodFRpbWVvdXQgPSBudWxsO1xuICAgICAgICB2YXIgb3ZlcmxheSA9IHNlYXJjaFN0YXRlLmdldE92ZXJsYXkoKTtcbiAgICAgICAgaWYgKCFvdmVybGF5IHx8IHF1ZXJ5ICE9IG92ZXJsYXkucXVlcnkpIHtcbiAgICAgICAgICBpZiAob3ZlcmxheSkge1xuICAgICAgICAgICAgY20ucmVtb3ZlT3ZlcmxheShvdmVybGF5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3ZlcmxheSA9IHNlYXJjaE92ZXJsYXkocXVlcnkpO1xuICAgICAgICAgIGNtLmFkZE92ZXJsYXkob3ZlcmxheSk7XG4gICAgICAgICAgaWYgKGNtLnNob3dNYXRjaGVzT25TY3JvbGxiYXIpIHtcbiAgICAgICAgICAgIGlmIChzZWFyY2hTdGF0ZS5nZXRTY3JvbGxiYXJBbm5vdGF0ZSgpKSB7XG4gICAgICAgICAgICAgIHNlYXJjaFN0YXRlLmdldFNjcm9sbGJhckFubm90YXRlKCkuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlYXJjaFN0YXRlLnNldFNjcm9sbGJhckFubm90YXRlKGNtLnNob3dNYXRjaGVzT25TY3JvbGxiYXIocXVlcnkpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2VhcmNoU3RhdGUuc2V0T3ZlcmxheShvdmVybGF5KTtcbiAgICAgICAgfVxuICAgICAgfSwgNTApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmaW5kTmV4dChjbSwgcHJldiwgcXVlcnksIHJlcGVhdCkge1xuICAgICAgaWYgKHJlcGVhdCA9PT0gdW5kZWZpbmVkKSB7IHJlcGVhdCA9IDE7IH1cbiAgICAgIHJldHVybiBjbS5vcGVyYXRpb24oZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwb3MgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgdmFyIGN1cnNvciA9IGNtLmdldFNlYXJjaEN1cnNvcihxdWVyeSwgcG9zKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXBlYXQ7IGkrKykge1xuICAgICAgICAgIHZhciBmb3VuZCA9IGN1cnNvci5maW5kKHByZXYpO1xuICAgICAgICAgIGlmIChpID09IDAgJiYgZm91bmQgJiYgY3Vyc29yRXF1YWwoY3Vyc29yLmZyb20oKSwgcG9zKSkge1xuICAgICAgICAgICAgdmFyIGxhc3RFbmRQb3MgPSBwcmV2ID8gY3Vyc29yLmZyb20oKSA6IGN1cnNvci50bygpO1xuICAgICAgICAgICAgZm91bmQgPSBjdXJzb3IuZmluZChwcmV2KTtcbiAgICAgICAgICAgIGlmIChmb3VuZCAmJiAhZm91bmRbMF0gJiYgY3Vyc29yRXF1YWwoY3Vyc29yLmZyb20oKSwgbGFzdEVuZFBvcykpIHtcbiAgICAgICAgICAgICAgaWYgKGNtLmdldExpbmUobGFzdEVuZFBvcy5saW5lKS5sZW5ndGggPT0gbGFzdEVuZFBvcy5jaClcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGN1cnNvci5maW5kKHByZXYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAvLyBTZWFyY2hDdXJzb3IgbWF5IGhhdmUgcmV0dXJuZWQgbnVsbCBiZWNhdXNlIGl0IGhpdCBFT0YsIHdyYXBcbiAgICAgICAgICAgIC8vIGFyb3VuZCBhbmQgdHJ5IGFnYWluLlxuICAgICAgICAgICAgY3Vyc29yID0gY20uZ2V0U2VhcmNoQ3Vyc29yKHF1ZXJ5LFxuICAgICAgICAgICAgICAgIChwcmV2KSA/IG5ldyBQb3MoY20ubGFzdExpbmUoKSkgOiBuZXcgUG9zKGNtLmZpcnN0TGluZSgpLCAwKSApO1xuICAgICAgICAgICAgaWYgKCFjdXJzb3IuZmluZChwcmV2KSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJzb3IuZnJvbSgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByZXR0eSBtdWNoIHRoZSBzYW1lIGFzIGBmaW5kTmV4dGAsIGV4Y2VwdCBmb3IgdGhlIGZvbGxvd2luZyBkaWZmZXJlbmNlczpcbiAgICAgKlxuICAgICAqIDEuIEJlZm9yZSBzdGFydGluZyB0aGUgc2VhcmNoLCBtb3ZlIHRvIHRoZSBwcmV2aW91cyBzZWFyY2guIFRoaXMgd2F5IGlmIG91ciBjdXJzb3IgaXNcbiAgICAgKiBhbHJlYWR5IGluc2lkZSBhIG1hdGNoLCB3ZSBzaG91bGQgcmV0dXJuIHRoZSBjdXJyZW50IG1hdGNoLlxuICAgICAqIDIuIFJhdGhlciB0aGFuIG9ubHkgcmV0dXJuaW5nIHRoZSBjdXJzb3IncyBmcm9tLCB3ZSByZXR1cm4gdGhlIGN1cnNvcidzIGZyb20gYW5kIHRvIGFzIGEgdHVwbGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmluZE5leHRGcm9tQW5kVG9JbmNsdXNpdmUoY20sIHByZXYsIHF1ZXJ5LCByZXBlYXQsIHZpbSkge1xuICAgICAgaWYgKHJlcGVhdCA9PT0gdW5kZWZpbmVkKSB7IHJlcGVhdCA9IDE7IH1cbiAgICAgIHJldHVybiBjbS5vcGVyYXRpb24oZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwb3MgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgdmFyIGN1cnNvciA9IGNtLmdldFNlYXJjaEN1cnNvcihxdWVyeSwgcG9zKTtcblxuICAgICAgICAvLyBHbyBiYWNrIG9uZSByZXN1bHQgdG8gZW5zdXJlIHRoYXQgaWYgdGhlIGN1cnNvciBpcyBjdXJyZW50bHkgYSBtYXRjaCwgd2Uga2VlcCBpdC5cbiAgICAgICAgdmFyIGZvdW5kID0gY3Vyc29yLmZpbmQoIXByZXYpO1xuXG4gICAgICAgIC8vIElmIHdlIGhhdmVuJ3QgbW92ZWQsIGdvIGJhY2sgb25lIG1vcmUgKHNpbWlsYXIgdG8gaWYgaT09MCBsb2dpYyBpbiBmaW5kTmV4dCkuXG4gICAgICAgIGlmICghdmltLnZpc3VhbE1vZGUgJiYgZm91bmQgJiYgY3Vyc29yRXF1YWwoY3Vyc29yLmZyb20oKSwgcG9zKSkge1xuICAgICAgICAgIGN1cnNvci5maW5kKCFwcmV2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwZWF0OyBpKyspIHtcbiAgICAgICAgICBmb3VuZCA9IGN1cnNvci5maW5kKHByZXYpO1xuICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgIC8vIFNlYXJjaEN1cnNvciBtYXkgaGF2ZSByZXR1cm5lZCBudWxsIGJlY2F1c2UgaXQgaGl0IEVPRiwgd3JhcFxuICAgICAgICAgICAgLy8gYXJvdW5kIGFuZCB0cnkgYWdhaW4uXG4gICAgICAgICAgICBjdXJzb3IgPSBjbS5nZXRTZWFyY2hDdXJzb3IocXVlcnksXG4gICAgICAgICAgICAgICAgKHByZXYpID8gbmV3IFBvcyhjbS5sYXN0TGluZSgpKSA6IG5ldyBQb3MoY20uZmlyc3RMaW5lKCksIDApICk7XG4gICAgICAgICAgICBpZiAoIWN1cnNvci5maW5kKHByZXYpKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtjdXJzb3IuZnJvbSgpLCBjdXJzb3IudG8oKV07XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2xlYXJTZWFyY2hIaWdobGlnaHQoY20pIHtcbiAgICAgIHZhciBzdGF0ZSA9IGdldFNlYXJjaFN0YXRlKGNtKTtcbiAgICAgIGlmIChzdGF0ZS5oaWdobGlnaHRUaW1lb3V0KSB7XG4gICAgICAgIGNsZWFyVGltZW91dChzdGF0ZS5oaWdobGlnaHRUaW1lb3V0KTtcbiAgICAgICAgc3RhdGUuaGlnaGxpZ2h0VGltZW91dCA9IG51bGw7XG4gICAgICB9XG4gICAgICBjbS5yZW1vdmVPdmVybGF5KGdldFNlYXJjaFN0YXRlKGNtKS5nZXRPdmVybGF5KCkpO1xuICAgICAgc3RhdGUuc2V0T3ZlcmxheShudWxsKTtcbiAgICAgIGlmIChzdGF0ZS5nZXRTY3JvbGxiYXJBbm5vdGF0ZSgpKSB7XG4gICAgICAgIHN0YXRlLmdldFNjcm9sbGJhckFubm90YXRlKCkuY2xlYXIoKTtcbiAgICAgICAgc3RhdGUuc2V0U2Nyb2xsYmFyQW5ub3RhdGUobnVsbCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHBvcyBpcyBpbiB0aGUgc3BlY2lmaWVkIHJhbmdlLCBJTkNMVVNJVkUuXG4gICAgICogUmFuZ2UgY2FuIGJlIHNwZWNpZmllZCB3aXRoIDEgb3IgMiBhcmd1bWVudHMuXG4gICAgICogSWYgdGhlIGZpcnN0IHJhbmdlIGFyZ3VtZW50IGlzIGFuIGFycmF5LCB0cmVhdCBpdCBhcyBhbiBhcnJheSBvZiBsaW5lXG4gICAgICogbnVtYmVycy4gTWF0Y2ggcG9zIGFnYWluc3QgYW55IG9mIHRoZSBsaW5lcy5cbiAgICAgKiBJZiB0aGUgZmlyc3QgcmFuZ2UgYXJndW1lbnQgaXMgYSBudW1iZXIsXG4gICAgICogICBpZiB0aGVyZSBpcyBvbmx5IDEgcmFuZ2UgYXJndW1lbnQsIGNoZWNrIGlmIHBvcyBoYXMgdGhlIHNhbWUgbGluZVxuICAgICAqICAgICAgIG51bWJlclxuICAgICAqICAgaWYgdGhlcmUgYXJlIDIgcmFuZ2UgYXJndW1lbnRzLCB0aGVuIGNoZWNrIGlmIHBvcyBpcyBpbiBiZXR3ZWVuIHRoZSB0d29cbiAgICAgKiAgICAgICByYW5nZSBhcmd1bWVudHMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNJblJhbmdlKHBvcywgc3RhcnQsIGVuZCkge1xuICAgICAgaWYgKHR5cGVvZiBwb3MgIT0gJ251bWJlcicpIHtcbiAgICAgICAgLy8gQXNzdW1lIGl0IGlzIGEgY3Vyc29yIHBvc2l0aW9uLiBHZXQgdGhlIGxpbmUgbnVtYmVyLlxuICAgICAgICBwb3MgPSBwb3MubGluZTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGFydCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHJldHVybiBpbkFycmF5KHBvcywgc3RhcnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHR5cGVvZiBlbmQgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICByZXR1cm4gKHBvcyA+PSBzdGFydCAmJiBwb3MgPD0gZW5kKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcG9zID09IHN0YXJ0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFVzZXJWaXNpYmxlTGluZXMoY20pIHtcbiAgICAgIC8vIGFjZV9wYXRjaHtcbiAgICAgIHZhciByZW5kZXJlciA9IGNtLmFjZS5yZW5kZXJlcjtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogcmVuZGVyZXIuZ2V0Rmlyc3RGdWxseVZpc2libGVSb3coKSxcbiAgICAgICAgYm90dG9tOiByZW5kZXJlci5nZXRMYXN0RnVsbHlWaXNpYmxlUm93KClcbiAgICAgIH1cbiAgICAgIC8vIGFjZV9wYXRjaH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRNYXJrUG9zKGNtLCB2aW0sIG1hcmtOYW1lKSB7XG4gICAgICBpZiAobWFya05hbWUgPT0gJ1xcJycgfHwgbWFya05hbWUgPT0gJ2AnKSB7XG4gICAgICAgIHJldHVybiB2aW1HbG9iYWxTdGF0ZS5qdW1wTGlzdC5maW5kKGNtLCAtMSkgfHwgbmV3IFBvcygwLCAwKTtcbiAgICAgIH0gZWxzZSBpZiAobWFya05hbWUgPT0gJy4nKSB7XG4gICAgICAgIHJldHVybiBnZXRMYXN0RWRpdFBvcyhjbSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBtYXJrID0gdmltLm1hcmtzW21hcmtOYW1lXTtcbiAgICAgIHJldHVybiBtYXJrICYmIG1hcmsuZmluZCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldExhc3RFZGl0UG9zKGNtKSB7XG4gICAgICBpZiAoY20uZ2V0TGFzdEVkaXRFbmQpIHtcbiAgICAgICAgcmV0dXJuIGNtLmdldExhc3RFZGl0RW5kKCk7XG4gICAgICB9XG4gICAgICAvLyBmb3Igb2xkIGNtXG4gICAgICB2YXIgZG9uZSA9IGNtLmRvYy5oaXN0b3J5LmRvbmU7XG4gICAgICBmb3IgKHZhciBpID0gZG9uZS5sZW5ndGg7IGktLTspIHtcbiAgICAgICAgaWYgKGRvbmVbaV0uY2hhbmdlcykge1xuICAgICAgICAgIHJldHVybiBjb3B5Q3Vyc29yKGRvbmVbaV0uY2hhbmdlc1swXS50byk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgRXhDb21tYW5kRGlzcGF0Y2hlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdGhpcy5idWlsZENvbW1hbmRNYXBfKCk7XG4gICAgfTtcbiAgICBFeENvbW1hbmREaXNwYXRjaGVyLnByb3RvdHlwZSA9IHtcbiAgICAgIHByb2Nlc3NDb21tYW5kOiBmdW5jdGlvbihjbSwgaW5wdXQsIG9wdF9wYXJhbXMpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICBjbS5vcGVyYXRpb24oZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGNtLmN1ck9wLmlzVmltT3AgPSB0cnVlO1xuICAgICAgICAgIHRoYXQuX3Byb2Nlc3NDb21tYW5kKGNtLCBpbnB1dCwgb3B0X3BhcmFtcyk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIF9wcm9jZXNzQ29tbWFuZDogZnVuY3Rpb24oY20sIGlucHV0LCBvcHRfcGFyYW1zKSB7XG4gICAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICAgIHZhciBjb21tYW5kSGlzdG9yeVJlZ2lzdGVyID0gdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmdldFJlZ2lzdGVyKCc6Jyk7XG4gICAgICAgIHZhciBwcmV2aW91c0NvbW1hbmQgPSBjb21tYW5kSGlzdG9yeVJlZ2lzdGVyLnRvU3RyaW5nKCk7XG4gICAgICAgIHZhciBpbnB1dFN0cmVhbSA9IG5ldyBDb2RlTWlycm9yLlN0cmluZ1N0cmVhbShpbnB1dCk7XG4gICAgICAgIC8vIHVwZGF0ZSBcIjogd2l0aCB0aGUgbGF0ZXN0IGNvbW1hbmQgd2hldGhlciB2YWxpZCBvciBpbnZhbGlkXG4gICAgICAgIGNvbW1hbmRIaXN0b3J5UmVnaXN0ZXIuc2V0VGV4dChpbnB1dCk7XG4gICAgICAgIHZhciBwYXJhbXMgPSBvcHRfcGFyYW1zIHx8IHt9O1xuICAgICAgICBwYXJhbXMuaW5wdXQgPSBpbnB1dDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLnBhcnNlSW5wdXRfKGNtLCBpbnB1dFN0cmVhbSwgcGFyYW1zKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgc2hvd0NvbmZpcm0oY20sIGUudG9TdHJpbmcoKSk7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgIGV4aXRWaXN1YWxNb2RlKGNtKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb21tYW5kO1xuICAgICAgICB2YXIgY29tbWFuZE5hbWU7XG4gICAgICAgIGlmICghcGFyYW1zLmNvbW1hbmROYW1lKSB7XG4gICAgICAgICAgLy8gSWYgb25seSBhIGxpbmUgcmFuZ2UgaXMgZGVmaW5lZCwgbW92ZSB0byB0aGUgbGluZS5cbiAgICAgICAgICBpZiAocGFyYW1zLmxpbmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29tbWFuZE5hbWUgPSAnbW92ZSc7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbW1hbmQgPSB0aGlzLm1hdGNoQ29tbWFuZF8ocGFyYW1zLmNvbW1hbmROYW1lKTtcbiAgICAgICAgICBpZiAoY29tbWFuZCkge1xuICAgICAgICAgICAgY29tbWFuZE5hbWUgPSBjb21tYW5kLm5hbWU7XG4gICAgICAgICAgICBpZiAoY29tbWFuZC5leGNsdWRlRnJvbUNvbW1hbmRIaXN0b3J5KSB7XG4gICAgICAgICAgICAgIGNvbW1hbmRIaXN0b3J5UmVnaXN0ZXIuc2V0VGV4dChwcmV2aW91c0NvbW1hbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wYXJzZUNvbW1hbmRBcmdzXyhpbnB1dFN0cmVhbSwgcGFyYW1zLCBjb21tYW5kKTtcbiAgICAgICAgICAgIGlmIChjb21tYW5kLnR5cGUgPT0gJ2V4VG9LZXknKSB7XG4gICAgICAgICAgICAgIC8vIEhhbmRsZSBFeCB0byBLZXkgbWFwcGluZy5cbiAgICAgICAgICAgICAgZG9LZXlUb0tleShjbSwgY29tbWFuZC50b0tleXMsIGNvbW1hbmQpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbW1hbmQudHlwZSA9PSAnZXhUb0V4Jykge1xuICAgICAgICAgICAgICAvLyBIYW5kbGUgRXggdG8gRXggbWFwcGluZy5cbiAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzQ29tbWFuZChjbSwgY29tbWFuZC50b0lucHV0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbW1hbmROYW1lKSB7XG4gICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdOb3QgYW4gZWRpdG9yIGNvbW1hbmQgXCI6JyArIGlucHV0ICsgJ1wiJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZXhDb21tYW5kc1tjb21tYW5kTmFtZV0oY20sIHBhcmFtcyk7XG4gICAgICAgICAgLy8gUG9zc2libHkgYXN5bmNocm9ub3VzIGNvbW1hbmRzIChlLmcuIHN1YnN0aXR1dGUsIHdoaWNoIG1pZ2h0IGhhdmUgYVxuICAgICAgICAgIC8vIHVzZXIgY29uZmlybWF0aW9uKSwgYXJlIHJlc3BvbnNpYmxlIGZvciBjYWxsaW5nIHRoZSBjYWxsYmFjayB3aGVuXG4gICAgICAgICAgLy8gZG9uZS4gQWxsIG90aGVycyBoYXZlIGl0IHRha2VuIGNhcmUgb2YgZm9yIHRoZW0gaGVyZS5cbiAgICAgICAgICBpZiAoKCFjb21tYW5kIHx8ICFjb21tYW5kLnBvc3NpYmx5QXN5bmMpICYmIHBhcmFtcy5jYWxsYmFjaykge1xuICAgICAgICAgICAgcGFyYW1zLmNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICBzaG93Q29uZmlybShjbSwgZS50b1N0cmluZygpKTtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcGFyc2VJbnB1dF86IGZ1bmN0aW9uKGNtLCBpbnB1dFN0cmVhbSwgcmVzdWx0KSB7XG4gICAgICAgIGlucHV0U3RyZWFtLmVhdFdoaWxlKCc6Jyk7XG4gICAgICAgIC8vIFBhcnNlIHJhbmdlLlxuICAgICAgICBpZiAoaW5wdXRTdHJlYW0uZWF0KCclJykpIHtcbiAgICAgICAgICByZXN1bHQubGluZSA9IGNtLmZpcnN0TGluZSgpO1xuICAgICAgICAgIHJlc3VsdC5saW5lRW5kID0gY20ubGFzdExpbmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHQubGluZSA9IHRoaXMucGFyc2VMaW5lU3BlY18oY20sIGlucHV0U3RyZWFtKTtcbiAgICAgICAgICBpZiAocmVzdWx0LmxpbmUgIT09IHVuZGVmaW5lZCAmJiBpbnB1dFN0cmVhbS5lYXQoJywnKSkge1xuICAgICAgICAgICAgcmVzdWx0LmxpbmVFbmQgPSB0aGlzLnBhcnNlTGluZVNwZWNfKGNtLCBpbnB1dFN0cmVhbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHJlc3VsdC5saW5lID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGlmIChjbS5zdGF0ZS52aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgdmFyIHBvcyA9IGdldE1hcmtQb3MoY20sIGNtLnN0YXRlLnZpbSwgJzwnKTtcbiAgICAgICAgICAgIHJlc3VsdC5zZWxlY3Rpb25MaW5lID0gcG9zICYmIHBvcy5saW5lO1xuICAgICAgICAgICAgcG9zID0gZ2V0TWFya1BvcyhjbSwgY20uc3RhdGUudmltLCAnPicpO1xuICAgICAgICAgICAgcmVzdWx0LnNlbGVjdGlvbkxpbmVFbmQgPSBwb3MgJiYgcG9zLmxpbmU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdC5zZWxlY3Rpb25MaW5lID0gY20uZ2V0Q3Vyc29yKCkubGluZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVzdWx0LnNlbGVjdGlvbkxpbmUgPSByZXN1bHQubGluZTtcbiAgICAgICAgICByZXN1bHQuc2VsZWN0aW9uTGluZUVuZCA9IHJlc3VsdC5saW5lRW5kO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUGFyc2UgY29tbWFuZCBuYW1lLlxuICAgICAgICB2YXIgY29tbWFuZE1hdGNoID0gaW5wdXRTdHJlYW0ubWF0Y2goL14oXFx3K3whIXxAQHxbISMmKjw9PkB+XSkvKTtcbiAgICAgICAgaWYgKGNvbW1hbmRNYXRjaCkge1xuICAgICAgICAgIHJlc3VsdC5jb21tYW5kTmFtZSA9IGNvbW1hbmRNYXRjaFsxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHQuY29tbWFuZE5hbWUgPSBpbnB1dFN0cmVhbS5tYXRjaCgvLiovKVswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LFxuICAgICAgcGFyc2VMaW5lU3BlY186IGZ1bmN0aW9uKGNtLCBpbnB1dFN0cmVhbSkge1xuICAgICAgICB2YXIgbnVtYmVyTWF0Y2ggPSBpbnB1dFN0cmVhbS5tYXRjaCgvXihcXGQrKS8pO1xuICAgICAgICBpZiAobnVtYmVyTWF0Y2gpIHtcbiAgICAgICAgICAvLyBBYnNvbHV0ZSBsaW5lIG51bWJlciBwbHVzIG9mZnNldCAoTitNIG9yIE4tTSkgaXMgcHJvYmFibHkgYSB0eXBvLFxuICAgICAgICAgIC8vIG5vdCBzb21ldGhpbmcgdGhlIHVzZXIgYWN0dWFsbHkgd2FudGVkLiAoTkI6IHZpbSBkb2VzIGFsbG93IHRoaXMuKVxuICAgICAgICAgIHJldHVybiBwYXJzZUludChudW1iZXJNYXRjaFsxXSwgMTApIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGlucHV0U3RyZWFtLm5leHQoKSkge1xuICAgICAgICAgIGNhc2UgJy4nOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VMaW5lU3BlY09mZnNldF8oaW5wdXRTdHJlYW0sIGNtLmdldEN1cnNvcigpLmxpbmUpO1xuICAgICAgICAgIGNhc2UgJyQnOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VMaW5lU3BlY09mZnNldF8oaW5wdXRTdHJlYW0sIGNtLmxhc3RMaW5lKCkpO1xuICAgICAgICAgIGNhc2UgJ1xcJyc6XG4gICAgICAgICAgICB2YXIgbWFya05hbWUgPSBpbnB1dFN0cmVhbS5uZXh0KCk7XG4gICAgICAgICAgICB2YXIgbWFya1BvcyA9IGdldE1hcmtQb3MoY20sIGNtLnN0YXRlLnZpbSwgbWFya05hbWUpO1xuICAgICAgICAgICAgaWYgKCFtYXJrUG9zKSB0aHJvdyBuZXcgRXJyb3IoJ01hcmsgbm90IHNldCcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VMaW5lU3BlY09mZnNldF8oaW5wdXRTdHJlYW0sIG1hcmtQb3MubGluZSk7XG4gICAgICAgICAgY2FzZSAnLSc6XG4gICAgICAgICAgY2FzZSAnKyc6XG4gICAgICAgICAgICBpbnB1dFN0cmVhbS5iYWNrVXAoMSk7XG4gICAgICAgICAgICAvLyBPZmZzZXQgaXMgcmVsYXRpdmUgdG8gY3VycmVudCBsaW5lIGlmIG5vdCBvdGhlcndpc2Ugc3BlY2lmaWVkLlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VMaW5lU3BlY09mZnNldF8oaW5wdXRTdHJlYW0sIGNtLmdldEN1cnNvcigpLmxpbmUpO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpbnB1dFN0cmVhbS5iYWNrVXAoMSk7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcGFyc2VMaW5lU3BlY09mZnNldF86IGZ1bmN0aW9uKGlucHV0U3RyZWFtLCBsaW5lKSB7XG4gICAgICAgIHZhciBvZmZzZXRNYXRjaCA9IGlucHV0U3RyZWFtLm1hdGNoKC9eKFsrLV0pPyhcXGQrKS8pO1xuICAgICAgICBpZiAob2Zmc2V0TWF0Y2gpIHtcbiAgICAgICAgICB2YXIgb2Zmc2V0ID0gcGFyc2VJbnQob2Zmc2V0TWF0Y2hbMl0sIDEwKTtcbiAgICAgICAgICBpZiAob2Zmc2V0TWF0Y2hbMV0gPT0gXCItXCIpIHtcbiAgICAgICAgICAgIGxpbmUgLT0gb2Zmc2V0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaW5lICs9IG9mZnNldDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgICB9LFxuICAgICAgcGFyc2VDb21tYW5kQXJnc186IGZ1bmN0aW9uKGlucHV0U3RyZWFtLCBwYXJhbXMsIGNvbW1hbmQpIHtcbiAgICAgICAgaWYgKGlucHV0U3RyZWFtLmVvbCgpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHBhcmFtcy5hcmdTdHJpbmcgPSBpbnB1dFN0cmVhbS5tYXRjaCgvLiovKVswXTtcbiAgICAgICAgLy8gUGFyc2UgY29tbWFuZC1saW5lIGFyZ3VtZW50c1xuICAgICAgICB2YXIgZGVsaW0gPSBjb21tYW5kLmFyZ0RlbGltaXRlciB8fCAvXFxzKy87XG4gICAgICAgIHZhciBhcmdzID0gdHJpbShwYXJhbXMuYXJnU3RyaW5nKS5zcGxpdChkZWxpbSk7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCAmJiBhcmdzWzBdKSB7XG4gICAgICAgICAgcGFyYW1zLmFyZ3MgPSBhcmdzO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWF0Y2hDb21tYW5kXzogZnVuY3Rpb24oY29tbWFuZE5hbWUpIHtcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBjb21tYW5kIGluIHRoZSBjb21tYW5kIG1hcCB0aGF0IG1hdGNoZXMgdGhlIHNob3J0ZXN0XG4gICAgICAgIC8vIHByZWZpeCBvZiB0aGUgcGFzc2VkIGluIGNvbW1hbmQgbmFtZS4gVGhlIG1hdGNoIGlzIGd1YXJhbnRlZWQgdG8gYmVcbiAgICAgICAgLy8gdW5hbWJpZ3VvdXMgaWYgdGhlIGRlZmF1bHRFeENvbW1hbmRNYXAncyBzaG9ydE5hbWVzIGFyZSBzZXQgdXBcbiAgICAgICAgLy8gY29ycmVjdGx5LiAoc2VlIEBjb2Rle2RlZmF1bHRFeENvbW1hbmRNYXB9KS5cbiAgICAgICAgZm9yICh2YXIgaSA9IGNvbW1hbmROYW1lLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgIHZhciBwcmVmaXggPSBjb21tYW5kTmFtZS5zdWJzdHJpbmcoMCwgaSk7XG4gICAgICAgICAgaWYgKHRoaXMuY29tbWFuZE1hcF9bcHJlZml4XSkge1xuICAgICAgICAgICAgdmFyIGNvbW1hbmQgPSB0aGlzLmNvbW1hbmRNYXBfW3ByZWZpeF07XG4gICAgICAgICAgICBpZiAoY29tbWFuZC5uYW1lLmluZGV4T2YoY29tbWFuZE5hbWUpID09PSAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjb21tYW5kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0sXG4gICAgICBidWlsZENvbW1hbmRNYXBfOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jb21tYW5kTWFwXyA9IHt9O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlZmF1bHRFeENvbW1hbmRNYXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgY29tbWFuZCA9IGRlZmF1bHRFeENvbW1hbmRNYXBbaV07XG4gICAgICAgICAgdmFyIGtleSA9IGNvbW1hbmQuc2hvcnROYW1lIHx8IGNvbW1hbmQubmFtZTtcbiAgICAgICAgICB0aGlzLmNvbW1hbmRNYXBfW2tleV0gPSBjb21tYW5kO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWFwOiBmdW5jdGlvbihsaHMsIHJocywgY3R4LCBub3JlbWFwKSB7XG4gICAgICAgIGlmIChsaHMgIT0gJzonICYmIGxocy5jaGFyQXQoMCkgPT0gJzonKSB7XG4gICAgICAgICAgaWYgKGN0eCkgeyB0aHJvdyBFcnJvcignTW9kZSBub3Qgc3VwcG9ydGVkIGZvciBleCBtYXBwaW5ncycpOyB9XG4gICAgICAgICAgdmFyIGNvbW1hbmROYW1lID0gbGhzLnN1YnN0cmluZygxKTtcbiAgICAgICAgICBpZiAocmhzICE9ICc6JyAmJiByaHMuY2hhckF0KDApID09ICc6Jykge1xuICAgICAgICAgICAgLy8gRXggdG8gRXggbWFwcGluZ1xuICAgICAgICAgICAgdGhpcy5jb21tYW5kTWFwX1tjb21tYW5kTmFtZV0gPSB7XG4gICAgICAgICAgICAgIG5hbWU6IGNvbW1hbmROYW1lLFxuICAgICAgICAgICAgICB0eXBlOiAnZXhUb0V4JyxcbiAgICAgICAgICAgICAgdG9JbnB1dDogcmhzLnN1YnN0cmluZygxKSxcbiAgICAgICAgICAgICAgdXNlcjogdHJ1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gRXggdG8ga2V5IG1hcHBpbmdcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZE1hcF9bY29tbWFuZE5hbWVdID0ge1xuICAgICAgICAgICAgICBuYW1lOiBjb21tYW5kTmFtZSxcbiAgICAgICAgICAgICAgdHlwZTogJ2V4VG9LZXknLFxuICAgICAgICAgICAgICB0b0tleXM6IHJocyxcbiAgICAgICAgICAgICAgdXNlcjogdHJ1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gS2V5IHRvIGtleSBvciBleCBtYXBwaW5nXG4gICAgICAgICAgdmFyIG1hcHBpbmcgPSB7XG4gICAgICAgICAgICBrZXlzOiBsaHMsXG4gICAgICAgICAgICB0eXBlOiAna2V5VG9LZXknLFxuICAgICAgICAgICAgdG9LZXlzOiByaHMsXG4gICAgICAgICAgICBub3JlbWFwOiAhIW5vcmVtYXBcbiAgICAgICAgICB9O1xuICAgICAgICAgIGlmIChjdHgpIHsgbWFwcGluZy5jb250ZXh0ID0gY3R4OyB9XG4gICAgICAgICAgZGVmYXVsdEtleW1hcC51bnNoaWZ0KG1hcHBpbmcpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdW5tYXA6IGZ1bmN0aW9uKGxocywgY3R4KSB7XG4gICAgICAgIGlmIChsaHMgIT0gJzonICYmIGxocy5jaGFyQXQoMCkgPT0gJzonKSB7XG4gICAgICAgICAgLy8gRXggdG8gRXggb3IgRXggdG8ga2V5IG1hcHBpbmdcbiAgICAgICAgICBpZiAoY3R4KSB7IHRocm93IEVycm9yKCdNb2RlIG5vdCBzdXBwb3J0ZWQgZm9yIGV4IG1hcHBpbmdzJyk7IH1cbiAgICAgICAgICB2YXIgY29tbWFuZE5hbWUgPSBsaHMuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgIGlmICh0aGlzLmNvbW1hbmRNYXBfW2NvbW1hbmROYW1lXSAmJiB0aGlzLmNvbW1hbmRNYXBfW2NvbW1hbmROYW1lXS51c2VyKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb21tYW5kTWFwX1tjb21tYW5kTmFtZV07XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gS2V5IHRvIEV4IG9yIGtleSB0byBrZXkgbWFwcGluZ1xuICAgICAgICAgIHZhciBrZXlzID0gbGhzO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVmYXVsdEtleW1hcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGtleXMgPT0gZGVmYXVsdEtleW1hcFtpXS5rZXlzXG4gICAgICAgICAgICAgICAgJiYgZGVmYXVsdEtleW1hcFtpXS5jb250ZXh0ID09PSBjdHgpIHtcbiAgICAgICAgICAgICAgZGVmYXVsdEtleW1hcC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZXhDb21tYW5kcyA9IHtcbiAgICAgIGNvbG9yc2NoZW1lOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7XG4gICAgICAgIGlmICghcGFyYW1zLmFyZ3MgfHwgcGFyYW1zLmFyZ3MubGVuZ3RoIDwgMSkge1xuICAgICAgICAgIHNob3dDb25maXJtKGNtLCBjbS5nZXRPcHRpb24oJ3RoZW1lJykpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjbS5zZXRPcHRpb24oJ3RoZW1lJywgcGFyYW1zLmFyZ3NbMF0pO1xuICAgICAgfSxcbiAgICAgIG1hcDogZnVuY3Rpb24oY20sIHBhcmFtcywgY3R4LCBkZWZhdWx0T25seSkge1xuICAgICAgICB2YXIgbWFwQXJncyA9IHBhcmFtcy5hcmdzO1xuICAgICAgICBpZiAoIW1hcEFyZ3MgfHwgbWFwQXJncy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgaWYgKGNtKSB7XG4gICAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ0ludmFsaWQgbWFwcGluZzogJyArIHBhcmFtcy5pbnB1dCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBleENvbW1hbmREaXNwYXRjaGVyLm1hcChtYXBBcmdzWzBdLCBtYXBBcmdzWzFdLCBjdHgsIGRlZmF1bHRPbmx5KTtcbiAgICAgIH0sXG4gICAgICBpbWFwOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7IHRoaXMubWFwKGNtLCBwYXJhbXMsICdpbnNlcnQnKTsgfSxcbiAgICAgIG5tYXA6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHsgdGhpcy5tYXAoY20sIHBhcmFtcywgJ25vcm1hbCcpOyB9LFxuICAgICAgdm1hcDogZnVuY3Rpb24oY20sIHBhcmFtcykgeyB0aGlzLm1hcChjbSwgcGFyYW1zLCAndmlzdWFsJyk7IH0sXG4gICAgICBvbWFwOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7IHRoaXMubWFwKGNtLCBwYXJhbXMsICdvcGVyYXRvclBlbmRpbmcnKTsgfSxcbiAgICAgIG5vcmVtYXA6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHsgdGhpcy5tYXAoY20sIHBhcmFtcywgdW5kZWZpbmVkLCB0cnVlKTsgfSxcbiAgICAgIGlub3JlbWFwOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7IHRoaXMubWFwKGNtLCBwYXJhbXMsICdpbnNlcnQnLCB0cnVlKTsgfSxcbiAgICAgIG5ub3JlbWFwOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7IHRoaXMubWFwKGNtLCBwYXJhbXMsICdub3JtYWwnLCB0cnVlKTsgfSxcbiAgICAgIHZub3JlbWFwOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7IHRoaXMubWFwKGNtLCBwYXJhbXMsICd2aXN1YWwnLCB0cnVlKTsgfSxcbiAgICAgIG9ub3JlbWFwOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7IHRoaXMubWFwKGNtLCBwYXJhbXMsICdvcGVyYXRvclBlbmRpbmcnLCB0cnVlKTsgfSxcbiAgICAgIHVubWFwOiBmdW5jdGlvbihjbSwgcGFyYW1zLCBjdHgpIHtcbiAgICAgICAgdmFyIG1hcEFyZ3MgPSBwYXJhbXMuYXJncztcbiAgICAgICAgaWYgKCFtYXBBcmdzIHx8IG1hcEFyZ3MubGVuZ3RoIDwgMSB8fCAhZXhDb21tYW5kRGlzcGF0Y2hlci51bm1hcChtYXBBcmdzWzBdLCBjdHgpKSB7XG4gICAgICAgICAgaWYgKGNtKSB7XG4gICAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ05vIHN1Y2ggbWFwcGluZzogJyArIHBhcmFtcy5pbnB1dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWFwY2xlYXI6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHsgdmltQXBpLm1hcGNsZWFyKCk7IH0sXG4gICAgICBpbWFwY2xlYXI6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHsgdmltQXBpLm1hcGNsZWFyKCdpbnNlcnQnKTsgfSxcbiAgICAgIG5tYXBjbGVhcjogZnVuY3Rpb24oY20sIHBhcmFtcykgeyB2aW1BcGkubWFwY2xlYXIoJ25vcm1hbCcpOyB9LFxuICAgICAgdm1hcGNsZWFyOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7IHZpbUFwaS5tYXBjbGVhcigndmlzdWFsJyk7IH0sXG4gICAgICBvbWFwY2xlYXI6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHsgdmltQXBpLm1hcGNsZWFyKCdvcGVyYXRvclBlbmRpbmcnKTsgfSxcbiAgICAgIG1vdmU6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgY29tbWFuZERpc3BhdGNoZXIucHJvY2Vzc0NvbW1hbmQoY20sIGNtLnN0YXRlLnZpbSwge1xuICAgICAgICAgICAgdHlwZTogJ21vdGlvbicsXG4gICAgICAgICAgICBtb3Rpb246ICdtb3ZlVG9MaW5lT3JFZGdlT2ZEb2N1bWVudCcsXG4gICAgICAgICAgICBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCBleHBsaWNpdFJlcGVhdDogdHJ1ZSxcbiAgICAgICAgICAgICAgbGluZXdpc2U6IHRydWUgfSxcbiAgICAgICAgICAgIHJlcGVhdE92ZXJyaWRlOiBwYXJhbXMubGluZSsxfSk7XG4gICAgICB9LFxuICAgICAgc2V0OiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7XG4gICAgICAgIHZhciBzZXRBcmdzID0gcGFyYW1zLmFyZ3M7XG4gICAgICAgIC8vIE9wdGlvbnMgcGFzc2VkIHRocm91Z2ggdG8gdGhlIHNldE9wdGlvbi9nZXRPcHRpb24gY2FsbHMuIE1heSBiZSBwYXNzZWQgaW4gYnkgdGhlXG4gICAgICAgIC8vIGxvY2FsL2dsb2JhbCB2ZXJzaW9ucyBvZiB0aGUgc2V0IGNvbW1hbmRcbiAgICAgICAgdmFyIHNldENmZyA9IHBhcmFtcy5zZXRDZmcgfHwge307XG4gICAgICAgIGlmICghc2V0QXJncyB8fCBzZXRBcmdzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICBpZiAoY20pIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnSW52YWxpZCBtYXBwaW5nOiAnICsgcGFyYW1zLmlucHV0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBleHByID0gc2V0QXJnc1swXS5zcGxpdCgnPScpO1xuICAgICAgICB2YXIgb3B0aW9uTmFtZSA9IGV4cHJbMF07XG4gICAgICAgIHZhciB2YWx1ZSA9IGV4cHJbMV07XG4gICAgICAgIHZhciBmb3JjZUdldCA9IGZhbHNlO1xuICAgICAgICB2YXIgZm9yY2VUb2dnbGUgPSBmYWxzZTtcblxuICAgICAgICBpZiAob3B0aW9uTmFtZS5jaGFyQXQob3B0aW9uTmFtZS5sZW5ndGggLSAxKSA9PSAnPycpIHtcbiAgICAgICAgICAvLyBJZiBwb3N0LWZpeGVkIHdpdGggPywgdGhlbiB0aGUgc2V0IGlzIGFjdHVhbGx5IGEgZ2V0LlxuICAgICAgICAgIGlmICh2YWx1ZSkgeyB0aHJvdyBFcnJvcignVHJhaWxpbmcgY2hhcmFjdGVyczogJyArIHBhcmFtcy5hcmdTdHJpbmcpOyB9XG4gICAgICAgICAgb3B0aW9uTmFtZSA9IG9wdGlvbk5hbWUuc3Vic3RyaW5nKDAsIG9wdGlvbk5hbWUubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgZm9yY2VHZXQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbk5hbWUuY2hhckF0KG9wdGlvbk5hbWUubGVuZ3RoIC0gMSkgPT0gJyEnKSB7XG4gICAgICAgICAgb3B0aW9uTmFtZSA9IG9wdGlvbk5hbWUuc3Vic3RyaW5nKDAsIG9wdGlvbk5hbWUubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgZm9yY2VUb2dnbGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmIG9wdGlvbk5hbWUuc3Vic3RyaW5nKDAsIDIpID09ICdubycpIHtcbiAgICAgICAgICAvLyBUbyBzZXQgYm9vbGVhbiBvcHRpb25zIHRvIGZhbHNlLCB0aGUgb3B0aW9uIG5hbWUgaXMgcHJlZml4ZWQgd2l0aFxuICAgICAgICAgIC8vICdubycuXG4gICAgICAgICAgb3B0aW9uTmFtZSA9IG9wdGlvbk5hbWUuc3Vic3RyaW5nKDIpO1xuICAgICAgICAgIHZhbHVlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3B0aW9uSXNCb29sZWFuID0gb3B0aW9uc1tvcHRpb25OYW1lXSAmJiBvcHRpb25zW29wdGlvbk5hbWVdLnR5cGUgPT0gJ2Jvb2xlYW4nO1xuICAgICAgICBpZiAob3B0aW9uSXNCb29sZWFuKSB7XG4gICAgICAgICAgaWYgKGZvcmNlVG9nZ2xlKSB7XG4gICAgICAgICAgICB2YWx1ZSA9ICFnZXRPcHRpb24ob3B0aW9uTmFtZSwgY20sIHNldENmZyk7XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIENhbGxpbmcgc2V0IHdpdGggYSBib29sZWFuIG9wdGlvbiBzZXRzIGl0IHRvIHRydWUuXG4gICAgICAgICAgICB2YWx1ZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIG5vIHZhbHVlIGlzIHByb3ZpZGVkLCB0aGVuIHdlIGFzc3VtZSB0aGlzIGlzIGEgZ2V0LlxuICAgICAgICBpZiAoIW9wdGlvbklzQm9vbGVhbiAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlR2V0KSB7XG4gICAgICAgICAgdmFyIG9sZFZhbHVlID0gZ2V0T3B0aW9uKG9wdGlvbk5hbWUsIGNtLCBzZXRDZmcpO1xuICAgICAgICAgIGlmIChvbGRWYWx1ZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBzaG93Q29uZmlybShjbSwgb2xkVmFsdWUubWVzc2FnZSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChvbGRWYWx1ZSA9PT0gdHJ1ZSB8fCBvbGRWYWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnICcgKyAob2xkVmFsdWUgPyAnJyA6ICdubycpICsgb3B0aW9uTmFtZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnICAnICsgb3B0aW9uTmFtZSArICc9JyArIG9sZFZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHNldE9wdGlvblJldHVybiA9IHNldE9wdGlvbihvcHRpb25OYW1lLCB2YWx1ZSwgY20sIHNldENmZyk7XG4gICAgICAgICAgaWYgKHNldE9wdGlvblJldHVybiBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBzaG93Q29uZmlybShjbSwgc2V0T3B0aW9uUmV0dXJuLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNldGxvY2FsOiBmdW5jdGlvbiAoY20sIHBhcmFtcykge1xuICAgICAgICAvLyBzZXRDZmcgaXMgcGFzc2VkIHRocm91Z2ggdG8gc2V0T3B0aW9uXG4gICAgICAgIHBhcmFtcy5zZXRDZmcgPSB7c2NvcGU6ICdsb2NhbCd9O1xuICAgICAgICB0aGlzLnNldChjbSwgcGFyYW1zKTtcbiAgICAgIH0sXG4gICAgICBzZXRnbG9iYWw6IGZ1bmN0aW9uIChjbSwgcGFyYW1zKSB7XG4gICAgICAgIC8vIHNldENmZyBpcyBwYXNzZWQgdGhyb3VnaCB0byBzZXRPcHRpb25cbiAgICAgICAgcGFyYW1zLnNldENmZyA9IHtzY29wZTogJ2dsb2JhbCd9O1xuICAgICAgICB0aGlzLnNldChjbSwgcGFyYW1zKTtcbiAgICAgIH0sXG4gICAgICByZWdpc3RlcnM6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgdmFyIHJlZ0FyZ3MgPSBwYXJhbXMuYXJncztcbiAgICAgICAgdmFyIHJlZ2lzdGVycyA9IHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5yZWdpc3RlcnM7XG4gICAgICAgIHZhciByZWdJbmZvID0gJy0tLS0tLS0tLS1SZWdpc3RlcnMtLS0tLS0tLS0tXFxuXFxuJztcbiAgICAgICAgaWYgKCFyZWdBcmdzKSB7XG4gICAgICAgICAgZm9yICh2YXIgcmVnaXN0ZXJOYW1lIGluIHJlZ2lzdGVycykge1xuICAgICAgICAgICAgdmFyIHRleHQgPSByZWdpc3RlcnNbcmVnaXN0ZXJOYW1lXS50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJlZ0luZm8gKz0gJ1wiJyArIHJlZ2lzdGVyTmFtZSArICcgICAgJyArIHRleHQgKyAnXFxuJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcmVnaXN0ZXJOYW1lO1xuICAgICAgICAgIHJlZ0FyZ3MgPSByZWdBcmdzLmpvaW4oJycpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVnQXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVnaXN0ZXJOYW1lID0gcmVnQXJncy5jaGFyQXQoaSk7XG4gICAgICAgICAgICBpZiAoIXZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5pc1ZhbGlkUmVnaXN0ZXIocmVnaXN0ZXJOYW1lKSkge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZWdpc3RlciA9IHJlZ2lzdGVyc1tyZWdpc3Rlck5hbWVdIHx8IG5ldyBSZWdpc3RlcigpO1xuICAgICAgICAgICAgcmVnSW5mbyArPSAnXCInICsgcmVnaXN0ZXJOYW1lICsgJyAgICAnICsgcmVnaXN0ZXIudG9TdHJpbmcoKSArICdcXG4nXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNob3dDb25maXJtKGNtLCByZWdJbmZvKTtcbiAgICAgIH0sXG4gICAgICBzb3J0OiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7XG4gICAgICAgIHZhciByZXZlcnNlLCBpZ25vcmVDYXNlLCB1bmlxdWUsIG51bWJlciwgcGF0dGVybjtcbiAgICAgICAgZnVuY3Rpb24gcGFyc2VBcmdzKCkge1xuICAgICAgICAgIGlmIChwYXJhbXMuYXJnU3RyaW5nKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IG5ldyBDb2RlTWlycm9yLlN0cmluZ1N0cmVhbShwYXJhbXMuYXJnU3RyaW5nKTtcbiAgICAgICAgICAgIGlmIChhcmdzLmVhdCgnIScpKSB7IHJldmVyc2UgPSB0cnVlOyB9XG4gICAgICAgICAgICBpZiAoYXJncy5lb2woKSkgeyByZXR1cm47IH1cbiAgICAgICAgICAgIGlmICghYXJncy5lYXRTcGFjZSgpKSB7IHJldHVybiAnSW52YWxpZCBhcmd1bWVudHMnOyB9XG4gICAgICAgICAgICB2YXIgb3B0cyA9IGFyZ3MubWF0Y2goLyhbZGludW94XSspP1xccyooXFwvLitcXC8pP1xccyovKTtcbiAgICAgICAgICAgIGlmICghb3B0cyAmJiAhYXJncy5lb2woKSkgeyByZXR1cm4gJ0ludmFsaWQgYXJndW1lbnRzJzsgfVxuICAgICAgICAgICAgaWYgKG9wdHNbMV0pIHtcbiAgICAgICAgICAgICAgaWdub3JlQ2FzZSA9IG9wdHNbMV0uaW5kZXhPZignaScpICE9IC0xO1xuICAgICAgICAgICAgICB1bmlxdWUgPSBvcHRzWzFdLmluZGV4T2YoJ3UnKSAhPSAtMTtcbiAgICAgICAgICAgICAgdmFyIGRlY2ltYWwgPSBvcHRzWzFdLmluZGV4T2YoJ2QnKSAhPSAtMSB8fCBvcHRzWzFdLmluZGV4T2YoJ24nKSAhPSAtMSAmJiAxO1xuICAgICAgICAgICAgICB2YXIgaGV4ID0gb3B0c1sxXS5pbmRleE9mKCd4JykgIT0gLTEgJiYgMTtcbiAgICAgICAgICAgICAgdmFyIG9jdGFsID0gb3B0c1sxXS5pbmRleE9mKCdvJykgIT0gLTEgJiYgMTtcbiAgICAgICAgICAgICAgaWYgKGRlY2ltYWwgKyBoZXggKyBvY3RhbCA+IDEpIHsgcmV0dXJuICdJbnZhbGlkIGFyZ3VtZW50cyc7IH1cbiAgICAgICAgICAgICAgbnVtYmVyID0gZGVjaW1hbCAmJiAnZGVjaW1hbCcgfHwgaGV4ICYmICdoZXgnIHx8IG9jdGFsICYmICdvY3RhbCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0c1syXSkge1xuICAgICAgICAgICAgICBwYXR0ZXJuID0gbmV3IFJlZ0V4cChvcHRzWzJdLnN1YnN0cigxLCBvcHRzWzJdLmxlbmd0aCAtIDIpLCBpZ25vcmVDYXNlID8gJ2knIDogJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyID0gcGFyc2VBcmdzKCk7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBzaG93Q29uZmlybShjbSwgZXJyICsgJzogJyArIHBhcmFtcy5hcmdTdHJpbmcpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGluZVN0YXJ0ID0gcGFyYW1zLmxpbmUgfHwgY20uZmlyc3RMaW5lKCk7XG4gICAgICAgIHZhciBsaW5lRW5kID0gcGFyYW1zLmxpbmVFbmQgfHwgcGFyYW1zLmxpbmUgfHwgY20ubGFzdExpbmUoKTtcbiAgICAgICAgaWYgKGxpbmVTdGFydCA9PSBsaW5lRW5kKSB7IHJldHVybjsgfVxuICAgICAgICB2YXIgY3VyU3RhcnQgPSBuZXcgUG9zKGxpbmVTdGFydCwgMCk7XG4gICAgICAgIHZhciBjdXJFbmQgPSBuZXcgUG9zKGxpbmVFbmQsIGxpbmVMZW5ndGgoY20sIGxpbmVFbmQpKTtcbiAgICAgICAgdmFyIHRleHQgPSBjbS5nZXRSYW5nZShjdXJTdGFydCwgY3VyRW5kKS5zcGxpdCgnXFxuJyk7XG4gICAgICAgIHZhciBudW1iZXJSZWdleCA9IHBhdHRlcm4gPyBwYXR0ZXJuIDpcbiAgICAgICAgICAgKG51bWJlciA9PSAnZGVjaW1hbCcpID8gLygtPykoW1xcZF0rKS8gOlxuICAgICAgICAgICAobnVtYmVyID09ICdoZXgnKSA/IC8oLT8pKD86MHgpPyhbMC05YS1mXSspL2kgOlxuICAgICAgICAgICAobnVtYmVyID09ICdvY3RhbCcpID8gLyhbMC03XSspLyA6IG51bGw7XG4gICAgICAgIHZhciByYWRpeCA9IChudW1iZXIgPT0gJ2RlY2ltYWwnKSA/IDEwIDogKG51bWJlciA9PSAnaGV4JykgPyAxNiA6IChudW1iZXIgPT0gJ29jdGFsJykgPyA4IDogbnVsbDtcbiAgICAgICAgdmFyIG51bVBhcnQgPSBbXSwgdGV4dFBhcnQgPSBbXTtcbiAgICAgICAgaWYgKG51bWJlciB8fCBwYXR0ZXJuKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2hQYXJ0ID0gcGF0dGVybiA/IHRleHRbaV0ubWF0Y2gocGF0dGVybikgOiBudWxsO1xuICAgICAgICAgICAgaWYgKG1hdGNoUGFydCAmJiBtYXRjaFBhcnRbMF0gIT0gJycpIHtcbiAgICAgICAgICAgICAgbnVtUGFydC5wdXNoKG1hdGNoUGFydCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFwYXR0ZXJuICYmIG51bWJlclJlZ2V4LmV4ZWModGV4dFtpXSkpIHtcbiAgICAgICAgICAgICAgbnVtUGFydC5wdXNoKHRleHRbaV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGV4dFBhcnQucHVzaCh0ZXh0W2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGV4dFBhcnQgPSB0ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNvbXBhcmVGbihhLCBiKSB7XG4gICAgICAgICAgaWYgKHJldmVyc2UpIHsgdmFyIHRtcDsgdG1wID0gYTsgYSA9IGI7IGIgPSB0bXA7IH1cbiAgICAgICAgICBpZiAoaWdub3JlQ2FzZSkgeyBhID0gYS50b0xvd2VyQ2FzZSgpOyBiID0gYi50b0xvd2VyQ2FzZSgpOyB9XG4gICAgICAgICAgdmFyIGFudW0gPSBudW1iZXIgJiYgbnVtYmVyUmVnZXguZXhlYyhhKTtcbiAgICAgICAgICB2YXIgYm51bSA9IG51bWJlciAmJiBudW1iZXJSZWdleC5leGVjKGIpO1xuICAgICAgICAgIGlmICghYW51bSkgeyByZXR1cm4gYSA8IGIgPyAtMSA6IDE7IH1cbiAgICAgICAgICBhbnVtID0gcGFyc2VJbnQoKGFudW1bMV0gKyBhbnVtWzJdKS50b0xvd2VyQ2FzZSgpLCByYWRpeCk7XG4gICAgICAgICAgYm51bSA9IHBhcnNlSW50KChibnVtWzFdICsgYm51bVsyXSkudG9Mb3dlckNhc2UoKSwgcmFkaXgpO1xuICAgICAgICAgIHJldHVybiBhbnVtIC0gYm51bTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjb21wYXJlUGF0dGVybkZuKGEsIGIpIHtcbiAgICAgICAgICBpZiAocmV2ZXJzZSkgeyB2YXIgdG1wOyB0bXAgPSBhOyBhID0gYjsgYiA9IHRtcDsgfVxuICAgICAgICAgIGlmIChpZ25vcmVDYXNlKSB7IGFbMF0gPSBhWzBdLnRvTG93ZXJDYXNlKCk7IGJbMF0gPSBiWzBdLnRvTG93ZXJDYXNlKCk7IH1cbiAgICAgICAgICByZXR1cm4gKGFbMF0gPCBiWzBdKSA/IC0xIDogMTtcbiAgICAgICAgfVxuICAgICAgICBudW1QYXJ0LnNvcnQocGF0dGVybiA/IGNvbXBhcmVQYXR0ZXJuRm4gOiBjb21wYXJlRm4pO1xuICAgICAgICBpZiAocGF0dGVybikge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtUGFydC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbnVtUGFydFtpXSA9IG51bVBhcnRbaV0uaW5wdXQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCFudW1iZXIpIHsgdGV4dFBhcnQuc29ydChjb21wYXJlRm4pOyB9XG4gICAgICAgIHRleHQgPSAoIXJldmVyc2UpID8gdGV4dFBhcnQuY29uY2F0KG51bVBhcnQpIDogbnVtUGFydC5jb25jYXQodGV4dFBhcnQpO1xuICAgICAgICBpZiAodW5pcXVlKSB7IC8vIFJlbW92ZSBkdXBsaWNhdGUgbGluZXNcbiAgICAgICAgICB2YXIgdGV4dE9sZCA9IHRleHQ7XG4gICAgICAgICAgdmFyIGxhc3RMaW5lO1xuICAgICAgICAgIHRleHQgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHRPbGQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0ZXh0T2xkW2ldICE9IGxhc3RMaW5lKSB7XG4gICAgICAgICAgICAgIHRleHQucHVzaCh0ZXh0T2xkW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RMaW5lID0gdGV4dE9sZFtpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY20ucmVwbGFjZVJhbmdlKHRleHQuam9pbignXFxuJyksIGN1clN0YXJ0LCBjdXJFbmQpO1xuICAgICAgfSxcbiAgICAgIHZnbG9iYWw6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgLy8gZ2xvYmFsIGluc3BlY3RzIHBhcmFtcy5jb21tYW5kTmFtZVxuICAgICAgICB0aGlzLmdsb2JhbChjbSwgcGFyYW1zKTtcbiAgICAgIH0sXG4gICAgICBub3JtYWw6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgdmFyIGFyZ1N0cmluZyA9IHBhcmFtcy5hcmdTdHJpbmc7XG4gICAgICAgIGlmIChhcmdTdHJpbmcgJiYgYXJnU3RyaW5nWzBdID09ICchJykge1xuICAgICAgICAgICAgYXJnU3RyaW5nID0gYXJnU3RyaW5nLnNsaWNlKDEpO1xuICAgICAgICAgICAgbm9yZW1hcCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgYXJnU3RyaW5nID0gYXJnU3RyaW5nLnRyaW1TdGFydCgpO1xuICAgICAgICBpZiAoIWFyZ1N0cmluZykge1xuICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnQXJndW1lbnQgaXMgcmVxdWlyZWQuJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaW5lID0gcGFyYW1zLmxpbmU7XG4gICAgICAgIGlmICh0eXBlb2YgbGluZSA9PSAnbnVtYmVyJykge1xuICAgICAgICAgIHZhciBsaW5lRW5kID0gaXNOYU4ocGFyYW1zLmxpbmVFbmQpID8gbGluZSA6IHBhcmFtcy5saW5lRW5kO1xuICAgICAgICAgIGZvciAodmFyIGkgPSBsaW5lOyBpIDw9IGxpbmVFbmQ7IGkrKykge1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGksIDApO1xuICAgICAgICAgICAgZG9LZXlUb0tleShjbSwgcGFyYW1zLmFyZ1N0cmluZy50cmltU3RhcnQoKSk7XG4gICAgICAgICAgICBpZiAoY20uc3RhdGUudmltLmluc2VydE1vZGUpIHtcbiAgICAgICAgICAgICAgZXhpdEluc2VydE1vZGUoY20sIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb0tleVRvS2V5KGNtLCBwYXJhbXMuYXJnU3RyaW5nLnRyaW1TdGFydCgpKTtcbiAgICAgICAgICBpZiAoY20uc3RhdGUudmltLmluc2VydE1vZGUpIHtcbiAgICAgICAgICAgIGV4aXRJbnNlcnRNb2RlKGNtLCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBnbG9iYWw6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgLy8gYSBnbG9iYWwgY29tbWFuZCBpcyBvZiB0aGUgZm9ybVxuICAgICAgICAvLyA6W3JhbmdlXWcvcGF0dGVybi9bY21kXVxuICAgICAgICAvLyBhcmdTdHJpbmcgaG9sZHMgdGhlIHN0cmluZyAvcGF0dGVybi9bY21kXVxuICAgICAgICB2YXIgYXJnU3RyaW5nID0gcGFyYW1zLmFyZ1N0cmluZztcbiAgICAgICAgaWYgKCFhcmdTdHJpbmcpIHtcbiAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ1JlZ3VsYXIgRXhwcmVzc2lvbiBtaXNzaW5nIGZyb20gZ2xvYmFsJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbnZlcnRlZCA9IHBhcmFtcy5jb21tYW5kTmFtZVswXSA9PT0gJ3YnO1xuICAgICAgICBpZiAoYXJnU3RyaW5nWzBdID09PSAnIScgJiYgcGFyYW1zLmNvbW1hbmROYW1lWzBdID09PSAnZycpIHtcbiAgICAgICAgICBpbnZlcnRlZCA9IHRydWU7XG4gICAgICAgICAgYXJnU3RyaW5nID0gYXJnU3RyaW5nLnNsaWNlKDEpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHJhbmdlIGlzIHNwZWNpZmllZCBoZXJlXG4gICAgICAgIHZhciBsaW5lU3RhcnQgPSAocGFyYW1zLmxpbmUgIT09IHVuZGVmaW5lZCkgPyBwYXJhbXMubGluZSA6IGNtLmZpcnN0TGluZSgpO1xuICAgICAgICB2YXIgbGluZUVuZCA9IHBhcmFtcy5saW5lRW5kIHx8IHBhcmFtcy5saW5lIHx8IGNtLmxhc3RMaW5lKCk7XG4gICAgICAgIC8vIGdldCB0aGUgdG9rZW5zIGZyb20gYXJnU3RyaW5nXG4gICAgICAgIHZhciB0b2tlbnMgPSBzcGxpdEJ5U2xhc2goYXJnU3RyaW5nKTtcbiAgICAgICAgdmFyIHJlZ2V4UGFydCA9IGFyZ1N0cmluZywgY21kO1xuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgICAgIHJlZ2V4UGFydCA9IHRva2Vuc1swXTtcbiAgICAgICAgICBjbWQgPSB0b2tlbnMuc2xpY2UoMSwgdG9rZW5zLmxlbmd0aCkuam9pbignLycpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWdleFBhcnQpIHtcbiAgICAgICAgICAvLyBJZiByZWdleCBwYXJ0IGlzIGVtcHR5LCB0aGVuIHVzZSB0aGUgcHJldmlvdXMgcXVlcnkuIE90aGVyd2lzZVxuICAgICAgICAgIC8vIHVzZSB0aGUgcmVnZXggcGFydCBhcyB0aGUgbmV3IHF1ZXJ5LlxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgIHVwZGF0ZVNlYXJjaFF1ZXJ5KGNtLCByZWdleFBhcnQsIHRydWUgLyoqIGlnbm9yZUNhc2UgKi8sXG4gICAgICAgICAgICAgdHJ1ZSAvKiogc21hcnRDYXNlICovKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnSW52YWxpZCByZWdleDogJyArIHJlZ2V4UGFydCk7XG4gICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gbm93IHRoYXQgd2UgaGF2ZSB0aGUgcmVnZXhQYXJ0LCBzZWFyY2ggZm9yIHJlZ2V4IG1hdGNoZXMgaW4gdGhlXG4gICAgICAgIC8vIHNwZWNpZmllZCByYW5nZSBvZiBsaW5lc1xuICAgICAgICB2YXIgcXVlcnkgPSBnZXRTZWFyY2hTdGF0ZShjbSkuZ2V0UXVlcnkoKTtcbiAgICAgICAgdmFyIG1hdGNoZWRMaW5lcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gbGluZVN0YXJ0OyBpIDw9IGxpbmVFbmQ7IGkrKykge1xuICAgICAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShpKTtcbiAgICAgICAgICB2YXIgbWF0Y2hlZCA9IHF1ZXJ5LnRlc3QobGluZSk7XG4gICAgICAgICAgaWYgKG1hdGNoZWQgIT09IGludmVydGVkKSB7XG4gICAgICAgICAgICBtYXRjaGVkTGluZXMucHVzaChjbWQgPyBjbS5nZXRMaW5lSGFuZGxlKGkpIDogbGluZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIFtjbWRdLCBqdXN0IGRpc3BsYXkgdGhlIGxpc3Qgb2YgbWF0Y2hlZCBsaW5lc1xuICAgICAgICBpZiAoIWNtZCkge1xuICAgICAgICAgIHNob3dDb25maXJtKGNtLCBtYXRjaGVkTGluZXMuam9pbignXFxuJykpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICB2YXIgbmV4dENvbW1hbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoaW5kZXggPCBtYXRjaGVkTGluZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgbGluZUhhbmRsZSA9IG1hdGNoZWRMaW5lc1tpbmRleCsrXTtcbiAgICAgICAgICAgIHZhciBsaW5lTnVtID0gY20uZ2V0TGluZU51bWJlcihsaW5lSGFuZGxlKTtcbiAgICAgICAgICAgIGlmIChsaW5lTnVtID09IG51bGwpIHtcbiAgICAgICAgICAgICAgbmV4dENvbW1hbmQoKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNvbW1hbmQgPSAobGluZU51bSArIDEpICsgY21kO1xuICAgICAgICAgICAgZXhDb21tYW5kRGlzcGF0Y2hlci5wcm9jZXNzQ29tbWFuZChjbSwgY29tbWFuZCwge1xuICAgICAgICAgICAgICBjYWxsYmFjazogbmV4dENvbW1hbmRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY20ucmVsZWFzZUxpbmVIYW5kbGVzKSB7XG4gICAgICAgICAgICBjbS5yZWxlYXNlTGluZUhhbmRsZXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIG5leHRDb21tYW5kKCk7XG4gICAgICB9LFxuICAgICAgc3Vic3RpdHV0ZTogZnVuY3Rpb24oY20sIHBhcmFtcykge1xuICAgICAgICBpZiAoIWNtLmdldFNlYXJjaEN1cnNvcikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignU2VhcmNoIGZlYXR1cmUgbm90IGF2YWlsYWJsZS4gUmVxdWlyZXMgc2VhcmNoY3Vyc29yLmpzIG9yICcgK1xuICAgICAgICAgICAgICAnYW55IG90aGVyIGdldFNlYXJjaEN1cnNvciBpbXBsZW1lbnRhdGlvbi4nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYXJnU3RyaW5nID0gcGFyYW1zLmFyZ1N0cmluZztcbiAgICAgICAgdmFyIHRva2VucyA9IGFyZ1N0cmluZyA/IHNwbGl0QnlTZXBhcmF0b3IoYXJnU3RyaW5nLCBhcmdTdHJpbmdbMF0pIDogW107XG4gICAgICAgIHZhciByZWdleFBhcnQsIHJlcGxhY2VQYXJ0ID0gJycsIHRyYWlsaW5nLCBmbGFnc1BhcnQsIGNvdW50O1xuICAgICAgICB2YXIgY29uZmlybSA9IGZhbHNlOyAvLyBXaGV0aGVyIHRvIGNvbmZpcm0gZWFjaCByZXBsYWNlLlxuICAgICAgICB2YXIgZ2xvYmFsID0gZmFsc2U7IC8vIFRydWUgdG8gcmVwbGFjZSBhbGwgaW5zdGFuY2VzIG9uIGEgbGluZSwgZmFsc2UgdG8gcmVwbGFjZSBvbmx5IDEuXG4gICAgICAgIGlmICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmVnZXhQYXJ0ID0gdG9rZW5zWzBdO1xuICAgICAgICAgIGlmIChnZXRPcHRpb24oJ3BjcmUnKSAmJiByZWdleFBhcnQgIT09ICcnKSB7XG4gICAgICAgICAgICAgIHJlZ2V4UGFydCA9IG5ldyBSZWdFeHAocmVnZXhQYXJ0KS5zb3VyY2U7IC8vbm9ybWFsaXplIG5vdCBlc2NhcGVkIGNoYXJhY3RlcnNcbiAgICAgICAgICB9XG4gICAgICAgICAgcmVwbGFjZVBhcnQgPSB0b2tlbnNbMV07XG4gICAgICAgICAgaWYgKHJlcGxhY2VQYXJ0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmIChnZXRPcHRpb24oJ3BjcmUnKSkge1xuICAgICAgICAgICAgICByZXBsYWNlUGFydCA9IHVuZXNjYXBlUmVnZXhSZXBsYWNlKHJlcGxhY2VQYXJ0LnJlcGxhY2UoLyhbXlxcXFxdKSYvZyxcIiQxJCQmXCIpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlcGxhY2VQYXJ0ID0gdHJhbnNsYXRlUmVnZXhSZXBsYWNlKHJlcGxhY2VQYXJ0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLmxhc3RTdWJzdGl0dXRlUmVwbGFjZVBhcnQgPSByZXBsYWNlUGFydDtcbiAgICAgICAgICB9XG4gICAgICAgICAgdHJhaWxpbmcgPSB0b2tlbnNbMl0gPyB0b2tlbnNbMl0uc3BsaXQoJyAnKSA6IFtdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGVpdGhlciB0aGUgYXJnU3RyaW5nIGlzIGVtcHR5IG9yIGl0cyBvZiB0aGUgZm9ybSAnIGhlbGxvL3dvcmxkJ1xuICAgICAgICAgIC8vIGFjdHVhbGx5IHNwbGl0QnlTbGFzaCByZXR1cm5zIGEgbGlzdCBvZiB0b2tlbnNcbiAgICAgICAgICAvLyBvbmx5IGlmIHRoZSBzdHJpbmcgc3RhcnRzIHdpdGggYSAnLydcbiAgICAgICAgICBpZiAoYXJnU3RyaW5nICYmIGFyZ1N0cmluZy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnU3Vic3RpdHV0aW9ucyBzaG91bGQgYmUgb2YgdGhlIGZvcm0gJyArXG4gICAgICAgICAgICAgICAgJzpzL3BhdHRlcm4vcmVwbGFjZS8nKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWZ0ZXIgdGhlIDNyZCBzbGFzaCwgd2UgY2FuIGhhdmUgZmxhZ3MgZm9sbG93ZWQgYnkgYSBzcGFjZSBmb2xsb3dlZFxuICAgICAgICAvLyBieSBjb3VudC5cbiAgICAgICAgaWYgKHRyYWlsaW5nKSB7XG4gICAgICAgICAgZmxhZ3NQYXJ0ID0gdHJhaWxpbmdbMF07XG4gICAgICAgICAgY291bnQgPSBwYXJzZUludCh0cmFpbGluZ1sxXSk7XG4gICAgICAgICAgaWYgKGZsYWdzUGFydCkge1xuICAgICAgICAgICAgaWYgKGZsYWdzUGFydC5pbmRleE9mKCdjJykgIT0gLTEpIHtcbiAgICAgICAgICAgICAgY29uZmlybSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZmxhZ3NQYXJ0LmluZGV4T2YoJ2cnKSAhPSAtMSkge1xuICAgICAgICAgICAgICBnbG9iYWwgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGdldE9wdGlvbigncGNyZScpKSB7XG4gICAgICAgICAgICAgICByZWdleFBhcnQgPSByZWdleFBhcnQgKyAnLycgKyBmbGFnc1BhcnQ7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgcmVnZXhQYXJ0ID0gcmVnZXhQYXJ0LnJlcGxhY2UoL1xcLy9nLCBcIlxcXFwvXCIpICsgJy8nICsgZmxhZ3NQYXJ0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAocmVnZXhQYXJ0KSB7XG4gICAgICAgICAgLy8gSWYgcmVnZXggcGFydCBpcyBlbXB0eSwgdGhlbiB1c2UgdGhlIHByZXZpb3VzIHF1ZXJ5LiBPdGhlcndpc2UgdXNlXG4gICAgICAgICAgLy8gdGhlIHJlZ2V4IHBhcnQgYXMgdGhlIG5ldyBxdWVyeS5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdXBkYXRlU2VhcmNoUXVlcnkoY20sIHJlZ2V4UGFydCwgdHJ1ZSAvKiogaWdub3JlQ2FzZSAqLyxcbiAgICAgICAgICAgICAgdHJ1ZSAvKiogc21hcnRDYXNlICovKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ0ludmFsaWQgcmVnZXg6ICcgKyByZWdleFBhcnQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXBsYWNlUGFydCA9IHJlcGxhY2VQYXJ0IHx8IHZpbUdsb2JhbFN0YXRlLmxhc3RTdWJzdGl0dXRlUmVwbGFjZVBhcnQ7XG4gICAgICAgIGlmIChyZXBsYWNlUGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdObyBwcmV2aW91cyBzdWJzdGl0dXRlIHJlZ3VsYXIgZXhwcmVzc2lvbicpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RhdGUgPSBnZXRTZWFyY2hTdGF0ZShjbSk7XG4gICAgICAgIHZhciBxdWVyeSA9IHN0YXRlLmdldFF1ZXJ5KCk7XG4gICAgICAgIHZhciBsaW5lU3RhcnQgPSAocGFyYW1zLmxpbmUgIT09IHVuZGVmaW5lZCkgPyBwYXJhbXMubGluZSA6IGNtLmdldEN1cnNvcigpLmxpbmU7XG4gICAgICAgIHZhciBsaW5lRW5kID0gcGFyYW1zLmxpbmVFbmQgfHwgbGluZVN0YXJ0O1xuICAgICAgICBpZiAobGluZVN0YXJ0ID09IGNtLmZpcnN0TGluZSgpICYmIGxpbmVFbmQgPT0gY20ubGFzdExpbmUoKSkge1xuICAgICAgICAgIGxpbmVFbmQgPSBJbmZpbml0eTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY291bnQpIHtcbiAgICAgICAgICBsaW5lU3RhcnQgPSBsaW5lRW5kO1xuICAgICAgICAgIGxpbmVFbmQgPSBsaW5lU3RhcnQgKyBjb3VudCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0YXJ0UG9zID0gY2xpcEN1cnNvclRvQ29udGVudChjbSwgbmV3IFBvcyhsaW5lU3RhcnQsIDApKTtcbiAgICAgICAgdmFyIGN1cnNvciA9IGNtLmdldFNlYXJjaEN1cnNvcihxdWVyeSwgc3RhcnRQb3MpO1xuICAgICAgICBkb1JlcGxhY2UoY20sIGNvbmZpcm0sIGdsb2JhbCwgbGluZVN0YXJ0LCBsaW5lRW5kLCBjdXJzb3IsIHF1ZXJ5LCByZXBsYWNlUGFydCwgcGFyYW1zLmNhbGxiYWNrKTtcbiAgICAgIH0sXG4gICAgICBzdGFydGluc2VydDogZnVuY3Rpb24oY20sIHBhcmFtcykge1xuICAgICAgICBkb0tleVRvS2V5KGNtLCBwYXJhbXMuYXJnU3RyaW5nID09ICchJyA/ICdBJyA6ICdpJywge30pO1xuICAgICAgfSxcbiAgICAgIHJlZG86IENvZGVNaXJyb3IuY29tbWFuZHMucmVkbyxcbiAgICAgIHVuZG86IENvZGVNaXJyb3IuY29tbWFuZHMudW5kbyxcbiAgICAgIHdyaXRlOiBmdW5jdGlvbihjbSkge1xuICAgICAgICBpZiAoQ29kZU1pcnJvci5jb21tYW5kcy5zYXZlKSB7XG4gICAgICAgICAgLy8gSWYgYSBzYXZlIGNvbW1hbmQgaXMgZGVmaW5lZCwgY2FsbCBpdC5cbiAgICAgICAgICBDb2RlTWlycm9yLmNvbW1hbmRzLnNhdmUoY20pO1xuICAgICAgICB9IGVsc2UgaWYgKGNtLnNhdmUpIHtcbiAgICAgICAgICAvLyBTYXZlcyB0byB0ZXh0IGFyZWEgaWYgbm8gc2F2ZSBjb21tYW5kIGlzIGRlZmluZWQgYW5kIGNtLnNhdmUoKSBpcyBhdmFpbGFibGUuXG4gICAgICAgICAgY20uc2F2ZSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbm9obHNlYXJjaDogZnVuY3Rpb24oY20pIHtcbiAgICAgICAgY2xlYXJTZWFyY2hIaWdobGlnaHQoY20pO1xuICAgICAgfSxcbiAgICAgIHlhbms6IGZ1bmN0aW9uIChjbSkge1xuICAgICAgICB2YXIgY3VyID0gY29weUN1cnNvcihjbS5nZXRDdXJzb3IoKSk7XG4gICAgICAgIHZhciBsaW5lID0gY3VyLmxpbmU7XG4gICAgICAgIHZhciBsaW5lVGV4dCA9IGNtLmdldExpbmUobGluZSk7XG4gICAgICAgIHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5wdXNoVGV4dChcbiAgICAgICAgICAnMCcsICd5YW5rJywgbGluZVRleHQsIHRydWUsIHRydWUpO1xuICAgICAgfSxcbiAgICAgIGRlbGV0ZTogZnVuY3Rpb24oY20sIHBhcmFtcykge1xuICAgICAgICB2YXIgbGluZSA9IHBhcmFtcy5zZWxlY3Rpb25MaW5lO1xuICAgICAgICB2YXIgbGluZUVuZCA9IGlzTmFOKHBhcmFtcy5zZWxlY3Rpb25MaW5lRW5kKSA/IGxpbmUgOiBwYXJhbXMuc2VsZWN0aW9uTGluZUVuZDtcbiAgICAgICAgb3BlcmF0b3JzLmRlbGV0ZShjbSwge2xpbmV3aXNlOiB0cnVlfSwgW1xuICAgICAgICAgIHsgYW5jaG9yOiBuZXcgUG9zKGxpbmUsIDApLFxuICAgICAgICAgICAgaGVhZDogbmV3IFBvcyhsaW5lRW5kICsgMSwgMCkgfVxuICAgICAgICBdKTtcbiAgICAgIH0sXG4gICAgICBqb2luOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7XG4gICAgICAgIHZhciBsaW5lID0gcGFyYW1zLnNlbGVjdGlvbkxpbmU7XG4gICAgICAgIHZhciBsaW5lRW5kID0gaXNOYU4ocGFyYW1zLnNlbGVjdGlvbkxpbmVFbmQpID8gbGluZSA6IHBhcmFtcy5zZWxlY3Rpb25MaW5lRW5kO1xuICAgICAgICBjbS5zZXRDdXJzb3IobmV3IFBvcyhsaW5lLCAwKSk7XG4gICAgICAgIGFjdGlvbnMuam9pbkxpbmVzKGNtLCB7cmVwZWF0OiBsaW5lRW5kIC0gbGluZX0sIGNtLnN0YXRlLnZpbSk7XG4gICAgICB9LFxuICAgICAgZGVsbWFya3M6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgaWYgKCFwYXJhbXMuYXJnU3RyaW5nIHx8ICF0cmltKHBhcmFtcy5hcmdTdHJpbmcpKSB7XG4gICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdBcmd1bWVudCByZXF1aXJlZCcpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGF0ZSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgICAgdmFyIHN0cmVhbSA9IG5ldyBDb2RlTWlycm9yLlN0cmluZ1N0cmVhbSh0cmltKHBhcmFtcy5hcmdTdHJpbmcpKTtcbiAgICAgICAgd2hpbGUgKCFzdHJlYW0uZW9sKCkpIHtcbiAgICAgICAgICBzdHJlYW0uZWF0U3BhY2UoKTtcblxuICAgICAgICAgIC8vIFJlY29yZCB0aGUgc3RyZWFtcyBwb3NpdGlvbiBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsb29wIGZvciB1c2VcbiAgICAgICAgICAvLyBpbiBlcnJvciBtZXNzYWdlcy5cbiAgICAgICAgICB2YXIgY291bnQgPSBzdHJlYW0ucG9zO1xuXG4gICAgICAgICAgaWYgKCFzdHJlYW0ubWF0Y2goL1thLXpBLVpdLywgZmFsc2UpKSB7XG4gICAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ0ludmFsaWQgYXJndW1lbnQ6ICcgKyBwYXJhbXMuYXJnU3RyaW5nLnN1YnN0cmluZyhjb3VudCkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBzeW0gPSBzdHJlYW0ubmV4dCgpO1xuICAgICAgICAgIC8vIENoZWNrIGlmIHRoaXMgc3ltYm9sIGlzIHBhcnQgb2YgYSByYW5nZVxuICAgICAgICAgIGlmIChzdHJlYW0ubWF0Y2goJy0nLCB0cnVlKSkge1xuICAgICAgICAgICAgLy8gVGhpcyBzeW1ib2wgaXMgcGFydCBvZiBhIHJhbmdlLlxuXG4gICAgICAgICAgICAvLyBUaGUgcmFuZ2UgbXVzdCB0ZXJtaW5hdGUgYXQgYW4gYWxwaGFiZXRpYyBjaGFyYWN0ZXIuXG4gICAgICAgICAgICBpZiAoIXN0cmVhbS5tYXRjaCgvW2EtekEtWl0vLCBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdJbnZhbGlkIGFyZ3VtZW50OiAnICsgcGFyYW1zLmFyZ1N0cmluZy5zdWJzdHJpbmcoY291bnQpKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3RhcnRNYXJrID0gc3ltO1xuICAgICAgICAgICAgdmFyIGZpbmlzaE1hcmsgPSBzdHJlYW0ubmV4dCgpO1xuICAgICAgICAgICAgLy8gVGhlIHJhbmdlIG11c3QgdGVybWluYXRlIGF0IGFuIGFscGhhYmV0aWMgY2hhcmFjdGVyIHdoaWNoXG4gICAgICAgICAgICAvLyBzaGFyZXMgdGhlIHNhbWUgY2FzZSBhcyB0aGUgc3RhcnQgb2YgdGhlIHJhbmdlLlxuICAgICAgICAgICAgaWYgKGlzTG93ZXJDYXNlKHN0YXJ0TWFyaykgJiYgaXNMb3dlckNhc2UoZmluaXNoTWFyaykgfHxcbiAgICAgICAgICAgICAgICBpc1VwcGVyQ2FzZShzdGFydE1hcmspICYmIGlzVXBwZXJDYXNlKGZpbmlzaE1hcmspKSB7XG4gICAgICAgICAgICAgIHZhciBzdGFydCA9IHN0YXJ0TWFyay5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgICB2YXIgZmluaXNoID0gZmluaXNoTWFyay5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgICBpZiAoc3RhcnQgPj0gZmluaXNoKSB7XG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdJbnZhbGlkIGFyZ3VtZW50OiAnICsgcGFyYW1zLmFyZ1N0cmluZy5zdWJzdHJpbmcoY291bnQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBCZWNhdXNlIG1hcmtzIGFyZSBhbHdheXMgQVNDSUkgdmFsdWVzLCBhbmQgd2UgaGF2ZVxuICAgICAgICAgICAgICAvLyBkZXRlcm1pbmVkIHRoYXQgdGhleSBhcmUgdGhlIHNhbWUgY2FzZSwgd2UgY2FuIHVzZVxuICAgICAgICAgICAgICAvLyB0aGVpciBjaGFyIGNvZGVzIHRvIGl0ZXJhdGUgdGhyb3VnaCB0aGUgZGVmaW5lZCByYW5nZS5cbiAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPD0gZmluaXNoIC0gc3RhcnQ7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBtYXJrID0gU3RyaW5nLmZyb21DaGFyQ29kZShzdGFydCArIGopO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBzdGF0ZS5tYXJrc1ttYXJrXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdJbnZhbGlkIGFyZ3VtZW50OiAnICsgc3RhcnRNYXJrICsgJy0nKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUaGlzIHN5bWJvbCBpcyBhIHZhbGlkIG1hcmssIGFuZCBpcyBub3QgcGFydCBvZiBhIHJhbmdlLlxuICAgICAgICAgICAgZGVsZXRlIHN0YXRlLm1hcmtzW3N5bV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBleENvbW1hbmREaXNwYXRjaGVyID0gbmV3IEV4Q29tbWFuZERpc3BhdGNoZXIoKTtcblxuICAgIC8qKlxuICAgICogQHBhcmFtIHtDb2RlTWlycm9yfSBjbSBDb2RlTWlycm9yIGluc3RhbmNlIHdlIGFyZSBpbi5cbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY29uZmlybSBXaGV0aGVyIHRvIGNvbmZpcm0gZWFjaCByZXBsYWNlLlxuICAgICogQHBhcmFtIHtDdXJzb3J9IGxpbmVTdGFydCBMaW5lIHRvIHN0YXJ0IHJlcGxhY2luZyBmcm9tLlxuICAgICogQHBhcmFtIHtDdXJzb3J9IGxpbmVFbmQgTGluZSB0byBzdG9wIHJlcGxhY2luZyBhdC5cbiAgICAqIEBwYXJhbSB7UmVnRXhwfSBxdWVyeSBRdWVyeSBmb3IgcGVyZm9ybWluZyBtYXRjaGVzIHdpdGguXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVwbGFjZVdpdGggVGV4dCB0byByZXBsYWNlIG1hdGNoZXMgd2l0aC4gTWF5IGNvbnRhaW4gJDEsXG4gICAgKiAgICAgJDIsIGV0YyBmb3IgcmVwbGFjaW5nIGNhcHR1cmVkIGdyb3VwcyB1c2luZyBKYXZhU2NyaXB0IHJlcGxhY2UuXG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCl9IGNhbGxiYWNrIEEgY2FsbGJhY2sgZm9yIHdoZW4gdGhlIHJlcGxhY2UgaXMgZG9uZS5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGRvUmVwbGFjZShjbSwgY29uZmlybSwgZ2xvYmFsLCBsaW5lU3RhcnQsIGxpbmVFbmQsIHNlYXJjaEN1cnNvciwgcXVlcnksXG4gICAgICAgIHJlcGxhY2VXaXRoLCBjYWxsYmFjaykge1xuICAgICAgLy8gU2V0IHVwIGFsbCB0aGUgZnVuY3Rpb25zLlxuICAgICAgY20uc3RhdGUudmltLmV4TW9kZSA9IHRydWU7XG4gICAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgICAgdmFyIGxhc3RQb3MsIG1vZGlmaWVkTGluZU51bWJlciwgam9pbmVkO1xuICAgICAgZnVuY3Rpb24gcmVwbGFjZUFsbCgpIHtcbiAgICAgICAgY20ub3BlcmF0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgICAgICAgcmVwbGFjZSgpO1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdG9wKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcmVwbGFjZSgpIHtcbiAgICAgICAgdmFyIHRleHQgPSBjbS5nZXRSYW5nZShzZWFyY2hDdXJzb3IuZnJvbSgpLCBzZWFyY2hDdXJzb3IudG8oKSk7XG4gICAgICAgIHZhciBuZXdUZXh0ID0gdGV4dC5yZXBsYWNlKHF1ZXJ5LCByZXBsYWNlV2l0aCk7XG4gICAgICAgIHZhciB1bm1vZGlmaWVkTGluZU51bWJlciA9IHNlYXJjaEN1cnNvci50bygpLmxpbmU7XG4gICAgICAgIHNlYXJjaEN1cnNvci5yZXBsYWNlKG5ld1RleHQpO1xuICAgICAgICBtb2RpZmllZExpbmVOdW1iZXIgPSBzZWFyY2hDdXJzb3IudG8oKS5saW5lO1xuICAgICAgICBsaW5lRW5kICs9IG1vZGlmaWVkTGluZU51bWJlciAtIHVubW9kaWZpZWRMaW5lTnVtYmVyO1xuICAgICAgICBqb2luZWQgPSBtb2RpZmllZExpbmVOdW1iZXIgPCB1bm1vZGlmaWVkTGluZU51bWJlcjtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGZpbmROZXh0VmFsaWRNYXRjaCgpIHtcbiAgICAgICAgdmFyIGxhc3RNYXRjaFRvID0gbGFzdFBvcyAmJiBjb3B5Q3Vyc29yKHNlYXJjaEN1cnNvci50bygpKTtcbiAgICAgICAgdmFyIG1hdGNoID0gc2VhcmNoQ3Vyc29yLmZpbmROZXh0KCk7XG4gICAgICAgIGlmIChtYXRjaCAmJiAhbWF0Y2hbMF0gJiYgbGFzdE1hdGNoVG8gJiYgY3Vyc29yRXF1YWwoc2VhcmNoQ3Vyc29yLmZyb20oKSwgbGFzdE1hdGNoVG8pKSB7XG4gICAgICAgICAgbWF0Y2ggPSBzZWFyY2hDdXJzb3IuZmluZE5leHQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAvLyBUaGUgYmVsb3cgb25seSBsb29wcyB0byBza2lwIG92ZXIgbXVsdGlwbGUgb2NjdXJyZW5jZXMgb24gdGhlIHNhbWVcbiAgICAgICAgLy8gbGluZSB3aGVuICdnbG9iYWwnIGlzIG5vdCB0cnVlLlxuICAgICAgICB3aGlsZShmaW5kTmV4dFZhbGlkTWF0Y2goKSAmJlxuICAgICAgICAgICAgICBpc0luUmFuZ2Uoc2VhcmNoQ3Vyc29yLmZyb20oKSwgbGluZVN0YXJ0LCBsaW5lRW5kKSkge1xuICAgICAgICAgIGlmICghZ2xvYmFsICYmIHNlYXJjaEN1cnNvci5mcm9tKCkubGluZSA9PSBtb2RpZmllZExpbmVOdW1iZXIgJiYgIWpvaW5lZCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNtLnNjcm9sbEludG9WaWV3KHNlYXJjaEN1cnNvci5mcm9tKCksIDMwKTtcbiAgICAgICAgICBjbS5zZXRTZWxlY3Rpb24oc2VhcmNoQ3Vyc29yLmZyb20oKSwgc2VhcmNoQ3Vyc29yLnRvKCkpO1xuICAgICAgICAgIGxhc3RQb3MgPSBzZWFyY2hDdXJzb3IuZnJvbSgpO1xuICAgICAgICAgIGRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBzdG9wKGNsb3NlKSB7XG4gICAgICAgIGlmIChjbG9zZSkgeyBjbG9zZSgpOyB9XG4gICAgICAgIGNtLmZvY3VzKCk7XG4gICAgICAgIGlmIChsYXN0UG9zKSB7XG4gICAgICAgICAgY20uc2V0Q3Vyc29yKGxhc3RQb3MpO1xuICAgICAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICAgICAgdmltLmV4TW9kZSA9IGZhbHNlO1xuICAgICAgICAgIHZpbS5sYXN0SFBvcyA9IHZpbS5sYXN0SFNQb3MgPSBsYXN0UG9zLmNoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYWxsYmFjaykgeyBjYWxsYmFjaygpOyB9XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBvblByb21wdEtleURvd24oZSwgX3ZhbHVlLCBjbG9zZSkge1xuICAgICAgICAvLyBTd2FsbG93IGFsbCBrZXlzLlxuICAgICAgICBDb2RlTWlycm9yLmVfc3RvcChlKTtcbiAgICAgICAgdmFyIGtleU5hbWUgPSB2aW1LZXlGcm9tRXZlbnQoZSk7XG4gICAgICAgIHN3aXRjaCAoa2V5TmFtZSkge1xuICAgICAgICAgIGNhc2UgJ3knOlxuICAgICAgICAgICAgcmVwbGFjZSgpOyBuZXh0KCk7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ24nOlxuICAgICAgICAgICAgbmV4dCgpOyBicmVhaztcbiAgICAgICAgICBjYXNlICdhJzpcbiAgICAgICAgICAgIC8vIHJlcGxhY2VBbGwgY29udGFpbnMgYSBjYWxsIHRvIGNsb3NlIG9mIGl0cyBvd24uIFdlIGRvbid0IHdhbnQgaXRcbiAgICAgICAgICAgIC8vIHRvIGZpcmUgdG9vIGVhcmx5IG9yIG11bHRpcGxlIHRpbWVzLlxuICAgICAgICAgICAgdmFyIHNhdmVkQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgICAgIGNhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY20ub3BlcmF0aW9uKHJlcGxhY2VBbGwpO1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBzYXZlZENhbGxiYWNrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbCc6XG4gICAgICAgICAgICByZXBsYWNlKCk7XG4gICAgICAgICAgICAvLyBmYWxsIHRocm91Z2ggYW5kIGV4aXQuXG4gICAgICAgICAgY2FzZSAncSc6XG4gICAgICAgICAgY2FzZSAnPEVzYz4nOlxuICAgICAgICAgIGNhc2UgJzxDLWM+JzpcbiAgICAgICAgICBjYXNlICc8Qy1bPic6XG4gICAgICAgICAgICBzdG9wKGNsb3NlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkb25lKSB7IHN0b3AoY2xvc2UpOyB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBBY3R1YWxseSBkbyByZXBsYWNlLlxuICAgICAgbmV4dCgpO1xuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgc2hvd0NvbmZpcm0oY20sICdObyBtYXRjaGVzIGZvciAnICsgcXVlcnkuc291cmNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFjb25maXJtKSB7XG4gICAgICAgIHJlcGxhY2VBbGwoKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7IGNhbGxiYWNrKCk7IH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2hvd1Byb21wdChjbSwge1xuICAgICAgICBwcmVmaXg6IGRvbSgnc3BhbicsICdyZXBsYWNlIHdpdGggJywgZG9tKCdzdHJvbmcnLCByZXBsYWNlV2l0aCksICcgKHkvbi9hL3EvbCknKSxcbiAgICAgICAgb25LZXlEb3duOiBvblByb21wdEtleURvd25cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4aXRJbnNlcnRNb2RlKGNtLCBrZWVwQ3Vyc29yKSB7XG4gICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICB2YXIgaW5zZXJ0TW9kZUNoYW5nZVJlZ2lzdGVyID0gdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmdldFJlZ2lzdGVyKCcuJyk7XG4gICAgICB2YXIgaXNQbGF5aW5nID0gbWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nO1xuICAgICAgdmFyIGxhc3RDaGFuZ2UgPSBtYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXM7XG4gICAgICBpZiAoIWlzUGxheWluZykge1xuICAgICAgICBjbS5vZmYoJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICAgICAgaWYgKHZpbS5pbnNlcnRFbmQpIHZpbS5pbnNlcnRFbmQuY2xlYXIoKTtcbiAgICAgICAgdmltLmluc2VydEVuZCA9IG51bGw7XG4gICAgICAgIENvZGVNaXJyb3Iub2ZmKGNtLmdldElucHV0RmllbGQoKSwgJ2tleWRvd24nLCBvbktleUV2ZW50VGFyZ2V0S2V5RG93bik7XG4gICAgICB9XG4gICAgICBpZiAoIWlzUGxheWluZyAmJiB2aW0uaW5zZXJ0TW9kZVJlcGVhdCA+IDEpIHtcbiAgICAgICAgLy8gUGVyZm9ybSBpbnNlcnQgbW9kZSByZXBlYXQgZm9yIGNvbW1hbmRzIGxpa2UgMyxhIGFuZCAzLG8uXG4gICAgICAgIHJlcGVhdExhc3RFZGl0KGNtLCB2aW0sIHZpbS5pbnNlcnRNb2RlUmVwZWF0IC0gMSxcbiAgICAgICAgICAgIHRydWUgLyoqIHJlcGVhdEZvckluc2VydCAqLyk7XG4gICAgICAgIHZpbS5sYXN0RWRpdElucHV0U3RhdGUucmVwZWF0T3ZlcnJpZGUgPSB2aW0uaW5zZXJ0TW9kZVJlcGVhdDtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZSB2aW0uaW5zZXJ0TW9kZVJlcGVhdDtcbiAgICAgIHZpbS5pbnNlcnRNb2RlID0gZmFsc2U7XG4gICAgICBpZiAoIWtlZXBDdXJzb3IpIHtcbiAgICAgICAgY20uc2V0Q3Vyc29yKGNtLmdldEN1cnNvcigpLmxpbmUsIGNtLmdldEN1cnNvcigpLmNoLTEpO1xuICAgICAgfVxuICAgICAgY20uc2V0T3B0aW9uKCdrZXlNYXAnLCAndmltJyk7XG4gICAgICBjbS5zZXRPcHRpb24oJ2Rpc2FibGVJbnB1dCcsIHRydWUpO1xuICAgICAgY20udG9nZ2xlT3ZlcndyaXRlKGZhbHNlKTsgLy8gZXhpdCByZXBsYWNlIG1vZGUgaWYgd2Ugd2VyZSBpbiBpdC5cbiAgICAgIC8vIHVwZGF0ZSB0aGUgXCIuIHJlZ2lzdGVyIGJlZm9yZSBleGl0aW5nIGluc2VydCBtb2RlXG4gICAgICBpbnNlcnRNb2RlQ2hhbmdlUmVnaXN0ZXIuc2V0VGV4dChsYXN0Q2hhbmdlLmNoYW5nZXMuam9pbignJykpO1xuICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sIFwidmltLW1vZGUtY2hhbmdlXCIsIHttb2RlOiBcIm5vcm1hbFwifSk7XG4gICAgICBpZiAobWFjcm9Nb2RlU3RhdGUuaXNSZWNvcmRpbmcpIHtcbiAgICAgICAgbG9nSW5zZXJ0TW9kZUNoYW5nZShtYWNyb01vZGVTdGF0ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX21hcENvbW1hbmQoY29tbWFuZCkge1xuICAgICAgZGVmYXVsdEtleW1hcC51bnNoaWZ0KGNvbW1hbmQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hcENvbW1hbmQoa2V5cywgdHlwZSwgbmFtZSwgYXJncywgZXh0cmEpIHtcbiAgICAgIHZhciBjb21tYW5kID0ge2tleXM6IGtleXMsIHR5cGU6IHR5cGV9O1xuICAgICAgY29tbWFuZFt0eXBlXSA9IG5hbWU7XG4gICAgICBjb21tYW5kW3R5cGUgKyBcIkFyZ3NcIl0gPSBhcmdzO1xuICAgICAgZm9yICh2YXIga2V5IGluIGV4dHJhKVxuICAgICAgICBjb21tYW5kW2tleV0gPSBleHRyYVtrZXldO1xuICAgICAgX21hcENvbW1hbmQoY29tbWFuZCk7XG4gICAgfVxuXG4gICAgLy8gVGhlIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHdvLWNoYXJhY3RlciBFU0Mga2V5bWFwIHNob3VsZCBiZVxuICAgIC8vIGFkanVzdGVkIGFjY29yZGluZyB0byB5b3VyIHR5cGluZyBzcGVlZCB0byBwcmV2ZW50IGZhbHNlIHBvc2l0aXZlcy5cbiAgICBkZWZpbmVPcHRpb24oJ2luc2VydE1vZGVFc2NLZXlzVGltZW91dCcsIDIwMCwgJ251bWJlcicpO1xuXG5cbiAgICBmdW5jdGlvbiBleGVjdXRlTWFjcm9SZWdpc3RlcihjbSwgdmltLCBtYWNyb01vZGVTdGF0ZSwgcmVnaXN0ZXJOYW1lKSB7XG4gICAgICB2YXIgcmVnaXN0ZXIgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIuZ2V0UmVnaXN0ZXIocmVnaXN0ZXJOYW1lKTtcbiAgICAgIGlmIChyZWdpc3Rlck5hbWUgPT0gJzonKSB7XG4gICAgICAgIC8vIFJlYWQtb25seSByZWdpc3RlciBjb250YWluaW5nIGxhc3QgRXggY29tbWFuZC5cbiAgICAgICAgaWYgKHJlZ2lzdGVyLmtleUJ1ZmZlclswXSkge1xuICAgICAgICAgIGV4Q29tbWFuZERpc3BhdGNoZXIucHJvY2Vzc0NvbW1hbmQoY20sIHJlZ2lzdGVyLmtleUJ1ZmZlclswXSk7XG4gICAgICAgIH1cbiAgICAgICAgbWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBrZXlCdWZmZXIgPSByZWdpc3Rlci5rZXlCdWZmZXI7XG4gICAgICB2YXIgaW1jID0gMDtcbiAgICAgIG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZyA9IHRydWU7XG4gICAgICBtYWNyb01vZGVTdGF0ZS5yZXBsYXlTZWFyY2hRdWVyaWVzID0gcmVnaXN0ZXIuc2VhcmNoUXVlcmllcy5zbGljZSgwKTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5QnVmZmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0ZXh0ID0ga2V5QnVmZmVyW2ldO1xuICAgICAgICB2YXIgbWF0Y2gsIGtleTtcbiAgICAgICAgd2hpbGUgKHRleHQpIHtcbiAgICAgICAgICAvLyBQdWxsIG9mZiBvbmUgY29tbWFuZCBrZXksIHdoaWNoIGlzIGVpdGhlciBhIHNpbmdsZSBjaGFyYWN0ZXJcbiAgICAgICAgICAvLyBvciBhIHNwZWNpYWwgc2VxdWVuY2Ugd3JhcHBlZCBpbiAnPCcgYW5kICc+JywgZS5nLiAnPFNwYWNlPicuXG4gICAgICAgICAgbWF0Y2ggPSAoLzxcXHcrLS4rPz58PFxcdys+fC4vKS5leGVjKHRleHQpO1xuICAgICAgICAgIGtleSA9IG1hdGNoWzBdO1xuICAgICAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cmluZyhtYXRjaC5pbmRleCArIGtleS5sZW5ndGgpO1xuICAgICAgICAgIHZpbUFwaS5oYW5kbGVLZXkoY20sIGtleSwgJ21hY3JvJyk7XG4gICAgICAgICAgaWYgKHZpbS5pbnNlcnRNb2RlKSB7XG4gICAgICAgICAgICB2YXIgY2hhbmdlcyA9IHJlZ2lzdGVyLmluc2VydE1vZGVDaGFuZ2VzW2ltYysrXS5jaGFuZ2VzO1xuICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzLmNoYW5nZXMgPVxuICAgICAgICAgICAgICAgIGNoYW5nZXM7XG4gICAgICAgICAgICByZXBlYXRJbnNlcnRNb2RlQ2hhbmdlcyhjbSwgY2hhbmdlcywgMSk7XG4gICAgICAgICAgICBleGl0SW5zZXJ0TW9kZShjbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dLZXkobWFjcm9Nb2RlU3RhdGUsIGtleSkge1xuICAgICAgaWYgKG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZykgeyByZXR1cm47IH1cbiAgICAgIHZhciByZWdpc3Rlck5hbWUgPSBtYWNyb01vZGVTdGF0ZS5sYXRlc3RSZWdpc3RlcjtcbiAgICAgIHZhciByZWdpc3RlciA9IHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5nZXRSZWdpc3RlcihyZWdpc3Rlck5hbWUpO1xuICAgICAgaWYgKHJlZ2lzdGVyKSB7XG4gICAgICAgIHJlZ2lzdGVyLnB1c2hUZXh0KGtleSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nSW5zZXJ0TW9kZUNoYW5nZShtYWNyb01vZGVTdGF0ZSkge1xuICAgICAgaWYgKG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZykgeyByZXR1cm47IH1cbiAgICAgIHZhciByZWdpc3Rlck5hbWUgPSBtYWNyb01vZGVTdGF0ZS5sYXRlc3RSZWdpc3RlcjtcbiAgICAgIHZhciByZWdpc3RlciA9IHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5nZXRSZWdpc3RlcihyZWdpc3Rlck5hbWUpO1xuICAgICAgaWYgKHJlZ2lzdGVyICYmIHJlZ2lzdGVyLnB1c2hJbnNlcnRNb2RlQ2hhbmdlcykge1xuICAgICAgICByZWdpc3Rlci5wdXNoSW5zZXJ0TW9kZUNoYW5nZXMobWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dTZWFyY2hRdWVyeShtYWNyb01vZGVTdGF0ZSwgcXVlcnkpIHtcbiAgICAgIGlmIChtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmcpIHsgcmV0dXJuOyB9XG4gICAgICB2YXIgcmVnaXN0ZXJOYW1lID0gbWFjcm9Nb2RlU3RhdGUubGF0ZXN0UmVnaXN0ZXI7XG4gICAgICB2YXIgcmVnaXN0ZXIgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIuZ2V0UmVnaXN0ZXIocmVnaXN0ZXJOYW1lKTtcbiAgICAgIGlmIChyZWdpc3RlciAmJiByZWdpc3Rlci5wdXNoU2VhcmNoUXVlcnkpIHtcbiAgICAgICAgcmVnaXN0ZXIucHVzaFNlYXJjaFF1ZXJ5KHF1ZXJ5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBMaXN0ZW5zIGZvciBjaGFuZ2VzIG1hZGUgaW4gaW5zZXJ0IG1vZGUuXG4gICAgICogU2hvdWxkIG9ubHkgYmUgYWN0aXZlIGluIGluc2VydCBtb2RlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG9uQ2hhbmdlKGNtLCBjaGFuZ2VPYmopIHtcbiAgICAgIHZhciBtYWNyb01vZGVTdGF0ZSA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlO1xuICAgICAgdmFyIGxhc3RDaGFuZ2UgPSBtYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXM7XG4gICAgICBpZiAoIW1hY3JvTW9kZVN0YXRlLmlzUGxheWluZykge1xuICAgICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgICB3aGlsZShjaGFuZ2VPYmopIHtcbiAgICAgICAgICBsYXN0Q2hhbmdlLmV4cGVjdEN1cnNvckFjdGl2aXR5Rm9yQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgICBpZiAobGFzdENoYW5nZS5pZ25vcmVDb3VudCA+IDEpIHtcbiAgICAgICAgICAgIGxhc3RDaGFuZ2UuaWdub3JlQ291bnQtLTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNoYW5nZU9iai5vcmlnaW4gPT0gJytpbnB1dCcgfHwgY2hhbmdlT2JqLm9yaWdpbiA9PSAncGFzdGUnXG4gICAgICAgICAgICAgIHx8IGNoYW5nZU9iai5vcmlnaW4gPT09IHVuZGVmaW5lZCAvKiBvbmx5IGluIHRlc3RpbmcgKi8pIHtcbiAgICAgICAgICAgIHZhciBzZWxlY3Rpb25Db3VudCA9IGNtLmxpc3RTZWxlY3Rpb25zKCkubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGlvbkNvdW50ID4gMSlcbiAgICAgICAgICAgICAgbGFzdENoYW5nZS5pZ25vcmVDb3VudCA9IHNlbGVjdGlvbkNvdW50O1xuICAgICAgICAgICAgdmFyIHRleHQgPSBjaGFuZ2VPYmoudGV4dC5qb2luKCdcXG4nKTtcbiAgICAgICAgICAgIGlmIChsYXN0Q2hhbmdlLm1heWJlUmVzZXQpIHtcbiAgICAgICAgICAgICAgbGFzdENoYW5nZS5jaGFuZ2VzID0gW107XG4gICAgICAgICAgICAgIGxhc3RDaGFuZ2UubWF5YmVSZXNldCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICAgICAgaWYgKGNtLnN0YXRlLm92ZXJ3cml0ZSAmJiAhL1xcbi8udGVzdCh0ZXh0KSkge1xuICAgICAgICAgICAgICAgIGxhc3RDaGFuZ2UuY2hhbmdlcy5wdXNoKFt0ZXh0XSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgICAgdmFyIGluc2VydEVuZCA9IHZpbSAmJiB2aW0uaW5zZXJ0RW5kICYmIHZpbS5pbnNlcnRFbmQuZmluZCgpXG4gICAgICAgICAgICAgICAgICB2YXIgY3Vyc29yID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgICAgICAgICBpZiAoaW5zZXJ0RW5kICYmIGluc2VydEVuZC5saW5lID09IGN1cnNvci5saW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvZmZzZXQgPSBpbnNlcnRFbmQuY2ggLSBjdXJzb3IuY2g7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvZmZzZXQgPiAwICYmIG9mZnNldCA8IHRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbGFzdENoYW5nZS5jaGFuZ2VzLnB1c2goW3RleHQsIG9mZnNldF0pO1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGV4dCkgbGFzdENoYW5nZS5jaGFuZ2VzLnB1c2godGV4dCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gQ2hhbmdlIG9iamVjdHMgbWF5IGJlIGNoYWluZWQgd2l0aCBuZXh0LlxuICAgICAgICAgIGNoYW5nZU9iaiA9IGNoYW5nZU9iai5uZXh0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBMaXN0ZW5zIGZvciBhbnkga2luZCBvZiBjdXJzb3IgYWN0aXZpdHkgb24gQ29kZU1pcnJvci5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIG9uQ3Vyc29yQWN0aXZpdHkoY20pIHtcbiAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICBpZiAodmltLmluc2VydE1vZGUpIHtcbiAgICAgICAgLy8gVHJhY2tpbmcgY3Vyc29yIGFjdGl2aXR5IGluIGluc2VydCBtb2RlIChmb3IgbWFjcm8gc3VwcG9ydCkuXG4gICAgICAgIHZhciBtYWNyb01vZGVTdGF0ZSA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlO1xuICAgICAgICBpZiAobWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nKSB7IHJldHVybjsgfVxuICAgICAgICB2YXIgbGFzdENoYW5nZSA9IG1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcztcbiAgICAgICAgaWYgKGxhc3RDaGFuZ2UuZXhwZWN0Q3Vyc29yQWN0aXZpdHlGb3JDaGFuZ2UpIHtcbiAgICAgICAgICBsYXN0Q2hhbmdlLmV4cGVjdEN1cnNvckFjdGl2aXR5Rm9yQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQ3Vyc29yIG1vdmVkIG91dHNpZGUgdGhlIGNvbnRleHQgb2YgYW4gZWRpdC4gUmVzZXQgdGhlIGNoYW5nZS5cbiAgICAgICAgICBsYXN0Q2hhbmdlLm1heWJlUmVzZXQgPSB0cnVlO1xuICAgICAgICAgIGlmICh2aW0uaW5zZXJ0RW5kKSB2aW0uaW5zZXJ0RW5kLmNsZWFyKCk7XG4gICAgICAgICAgdmltLmluc2VydEVuZCA9IGNtLnNldEJvb2ttYXJrKGNtLmdldEN1cnNvcigpLCB7aW5zZXJ0TGVmdDogdHJ1ZX0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCFjbS5jdXJPcC5pc1ZpbU9wKSB7XG4gICAgICAgIGhhbmRsZUV4dGVybmFsU2VsZWN0aW9uKGNtLCB2aW0pO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBoYW5kbGVFeHRlcm5hbFNlbGVjdGlvbihjbSwgdmltLCBrZWVwSFBvcykge1xuICAgICAgdmFyIGFuY2hvciA9IGNtLmdldEN1cnNvcignYW5jaG9yJyk7XG4gICAgICB2YXIgaGVhZCA9IGNtLmdldEN1cnNvcignaGVhZCcpO1xuICAgICAgLy8gRW50ZXIgb3IgZXhpdCB2aXN1YWwgbW9kZSB0byBtYXRjaCBtb3VzZSBzZWxlY3Rpb24uXG4gICAgICBpZiAodmltLnZpc3VhbE1vZGUgJiYgIWNtLnNvbWV0aGluZ1NlbGVjdGVkKCkpIHtcbiAgICAgICAgZXhpdFZpc3VhbE1vZGUoY20sIGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAoIXZpbS52aXN1YWxNb2RlICYmICF2aW0uaW5zZXJ0TW9kZSAmJiBjbS5zb21ldGhpbmdTZWxlY3RlZCgpKSB7XG4gICAgICAgIHZpbS52aXN1YWxNb2RlID0gdHJ1ZTtcbiAgICAgICAgdmltLnZpc3VhbExpbmUgPSBmYWxzZTtcbiAgICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sIFwidmltLW1vZGUtY2hhbmdlXCIsIHttb2RlOiBcInZpc3VhbFwifSk7XG4gICAgICB9XG4gICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgLy8gQmluZCBDb2RlTWlycm9yIHNlbGVjdGlvbiBtb2RlbCB0byB2aW0gc2VsZWN0aW9uIG1vZGVsLlxuICAgICAgICAvLyBNb3VzZSBzZWxlY3Rpb25zIGFyZSBjb25zaWRlcmVkIHZpc3VhbCBjaGFyYWN0ZXJ3aXNlLlxuICAgICAgICB2YXIgaGVhZE9mZnNldCA9ICFjdXJzb3JJc0JlZm9yZShoZWFkLCBhbmNob3IpID8gLTEgOiAwO1xuICAgICAgICB2YXIgYW5jaG9yT2Zmc2V0ID0gY3Vyc29ySXNCZWZvcmUoaGVhZCwgYW5jaG9yKSA/IC0xIDogMDtcbiAgICAgICAgaGVhZCA9IG9mZnNldEN1cnNvcihoZWFkLCAwLCBoZWFkT2Zmc2V0KTtcbiAgICAgICAgYW5jaG9yID0gb2Zmc2V0Q3Vyc29yKGFuY2hvciwgMCwgYW5jaG9yT2Zmc2V0KTtcbiAgICAgICAgdmltLnNlbCA9IHtcbiAgICAgICAgICBhbmNob3I6IGFuY2hvcixcbiAgICAgICAgICBoZWFkOiBoZWFkXG4gICAgICAgIH07XG4gICAgICAgIHVwZGF0ZU1hcmsoY20sIHZpbSwgJzwnLCBjdXJzb3JNaW4oaGVhZCwgYW5jaG9yKSk7XG4gICAgICAgIHVwZGF0ZU1hcmsoY20sIHZpbSwgJz4nLCBjdXJzb3JNYXgoaGVhZCwgYW5jaG9yKSk7XG4gICAgICB9IGVsc2UgaWYgKCF2aW0uaW5zZXJ0TW9kZSAmJiAha2VlcEhQb3MpIHtcbiAgICAgICAgLy8gUmVzZXQgbGFzdEhQb3MgaWYgc2VsZWN0aW9uIHdhcyBtb2RpZmllZCBieSBzb21ldGhpbmcgb3V0c2lkZSBvZiB2aW0gbW9kZSBlLmcuIGJ5IG1vdXNlLlxuICAgICAgICB2aW0ubGFzdEhQb3MgPSBjbS5nZXRDdXJzb3IoKS5jaDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKiogV3JhcHBlciBmb3Igc3BlY2lhbCBrZXlzIHByZXNzZWQgaW4gaW5zZXJ0IG1vZGUgKi9cbiAgICBmdW5jdGlvbiBJbnNlcnRNb2RlS2V5KGtleU5hbWUsIGUpIHtcbiAgICAgIHRoaXMua2V5TmFtZSA9IGtleU5hbWU7XG4gICAgICB0aGlzLmtleSA9IGUua2V5O1xuICAgICAgdGhpcy5jdHJsS2V5ID0gZS5jdHJsS2V5O1xuICAgICAgdGhpcy5hbHRLZXkgPSBlLmFsdEtleTtcbiAgICAgIHRoaXMubWV0YUtleSA9IGUubWV0YUtleTtcbiAgICAgIHRoaXMuc2hpZnRLZXkgPSBlLnNoaWZ0S2V5O1xuICAgIH1cblxuICAgIC8qKlxuICAgICogSGFuZGxlcyByYXcga2V5IGRvd24gZXZlbnRzIGZyb20gdGhlIHRleHQgYXJlYS5cbiAgICAqIC0gU2hvdWxkIG9ubHkgYmUgYWN0aXZlIGluIGluc2VydCBtb2RlLlxuICAgICogLSBGb3IgcmVjb3JkaW5nIGRlbGV0ZXMgaW4gaW5zZXJ0IG1vZGUuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBvbktleUV2ZW50VGFyZ2V0S2V5RG93bihlKSB7XG4gICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgIHZhciBsYXN0Q2hhbmdlID0gbWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzO1xuICAgICAgdmFyIGtleU5hbWUgPSBDb2RlTWlycm9yLmtleU5hbWUgPyBDb2RlTWlycm9yLmtleU5hbWUoZSkgOiBlLmtleTtcbiAgICAgIGlmICgha2V5TmFtZSkgeyByZXR1cm47IH1cbiAgICAgIFxuICAgICAgaWYgKGtleU5hbWUuaW5kZXhPZignRGVsZXRlJykgIT0gLTEgfHwga2V5TmFtZS5pbmRleE9mKCdCYWNrc3BhY2UnKSAhPSAtMSkge1xuICAgICAgICBpZiAobGFzdENoYW5nZS5tYXliZVJlc2V0KSB7XG4gICAgICAgICAgbGFzdENoYW5nZS5jaGFuZ2VzID0gW107XG4gICAgICAgICAgbGFzdENoYW5nZS5tYXliZVJlc2V0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdENoYW5nZS5jaGFuZ2VzLnB1c2gobmV3IEluc2VydE1vZGVLZXkoa2V5TmFtZSwgZSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlcGVhdHMgdGhlIGxhc3QgZWRpdCwgd2hpY2ggaW5jbHVkZXMgZXhhY3RseSAxIGNvbW1hbmQgYW5kIGF0IG1vc3QgMVxuICAgICAqIGluc2VydC4gT3BlcmF0b3IgYW5kIG1vdGlvbiBjb21tYW5kcyBhcmUgcmVhZCBmcm9tIGxhc3RFZGl0SW5wdXRTdGF0ZSxcbiAgICAgKiB3aGlsZSBhY3Rpb24gY29tbWFuZHMgYXJlIHJlYWQgZnJvbSBsYXN0RWRpdEFjdGlvbkNvbW1hbmQuXG4gICAgICpcbiAgICAgKiBJZiByZXBlYXRGb3JJbnNlcnQgaXMgdHJ1ZSwgdGhlbiB0aGUgZnVuY3Rpb24gd2FzIGNhbGxlZCBieVxuICAgICAqIGV4aXRJbnNlcnRNb2RlIHRvIHJlcGVhdCB0aGUgaW5zZXJ0IG1vZGUgY2hhbmdlcyB0aGUgdXNlciBqdXN0IG1hZGUuIFRoZVxuICAgICAqIGNvcnJlc3BvbmRpbmcgZW50ZXJJbnNlcnRNb2RlIGNhbGwgd2FzIG1hZGUgd2l0aCBhIGNvdW50LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHJlcGVhdExhc3RFZGl0KGNtLCB2aW0sIHJlcGVhdCwgcmVwZWF0Rm9ySW5zZXJ0KSB7XG4gICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgIG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZyA9IHRydWU7XG4gICAgICB2YXIgaXNBY3Rpb24gPSAhIXZpbS5sYXN0RWRpdEFjdGlvbkNvbW1hbmQ7XG4gICAgICB2YXIgY2FjaGVkSW5wdXRTdGF0ZSA9IHZpbS5pbnB1dFN0YXRlO1xuICAgICAgZnVuY3Rpb24gcmVwZWF0Q29tbWFuZCgpIHtcbiAgICAgICAgaWYgKGlzQWN0aW9uKSB7XG4gICAgICAgICAgY29tbWFuZERpc3BhdGNoZXIucHJvY2Vzc0FjdGlvbihjbSwgdmltLCB2aW0ubGFzdEVkaXRBY3Rpb25Db21tYW5kKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21tYW5kRGlzcGF0Y2hlci5ldmFsSW5wdXQoY20sIHZpbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHJlcGVhdEluc2VydChyZXBlYXQpIHtcbiAgICAgICAgaWYgKG1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcy5jaGFuZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAvLyBGb3Igc29tZSByZWFzb24sIHJlcGVhdCBjdyBpbiBkZXNrdG9wIFZJTSBkb2VzIG5vdCByZXBlYXRcbiAgICAgICAgICAvLyBpbnNlcnQgbW9kZSBjaGFuZ2VzLiBXaWxsIGNvbmZvcm0gdG8gdGhhdCBiZWhhdmlvci5cbiAgICAgICAgICByZXBlYXQgPSAhdmltLmxhc3RFZGl0QWN0aW9uQ29tbWFuZCA/IDEgOiByZXBlYXQ7XG4gICAgICAgICAgdmFyIGNoYW5nZU9iamVjdCA9IG1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcztcbiAgICAgICAgICByZXBlYXRJbnNlcnRNb2RlQ2hhbmdlcyhjbSwgY2hhbmdlT2JqZWN0LmNoYW5nZXMsIHJlcGVhdCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZpbS5pbnB1dFN0YXRlID0gdmltLmxhc3RFZGl0SW5wdXRTdGF0ZTtcbiAgICAgIGlmIChpc0FjdGlvbiAmJiB2aW0ubGFzdEVkaXRBY3Rpb25Db21tYW5kLmludGVybGFjZUluc2VydFJlcGVhdCkge1xuICAgICAgICAvLyBvIGFuZCBPIHJlcGVhdCBoYXZlIHRvIGJlIGludGVybGFjZWQgd2l0aCBpbnNlcnQgcmVwZWF0cyBzbyB0aGF0IHRoZVxuICAgICAgICAvLyBpbnNlcnRpb25zIGFwcGVhciBvbiBzZXBhcmF0ZSBsaW5lcyBpbnN0ZWFkIG9mIHRoZSBsYXN0IGxpbmUuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwZWF0OyBpKyspIHtcbiAgICAgICAgICByZXBlYXRDb21tYW5kKCk7XG4gICAgICAgICAgcmVwZWF0SW5zZXJ0KDEpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXJlcGVhdEZvckluc2VydCkge1xuICAgICAgICAgIC8vIEhhY2sgdG8gZ2V0IHRoZSBjdXJzb3IgdG8gZW5kIHVwIGF0IHRoZSByaWdodCBwbGFjZS4gSWYgSSBpc1xuICAgICAgICAgIC8vIHJlcGVhdGVkIGluIGluc2VydCBtb2RlIHJlcGVhdCwgY3Vyc29yIHdpbGwgYmUgMSBpbnNlcnRcbiAgICAgICAgICAvLyBjaGFuZ2Ugc2V0IGxlZnQgb2Ygd2hlcmUgaXQgc2hvdWxkIGJlLlxuICAgICAgICAgIHJlcGVhdENvbW1hbmQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXBlYXRJbnNlcnQocmVwZWF0KTtcbiAgICAgIH1cbiAgICAgIHZpbS5pbnB1dFN0YXRlID0gY2FjaGVkSW5wdXRTdGF0ZTtcbiAgICAgIGlmICh2aW0uaW5zZXJ0TW9kZSAmJiAhcmVwZWF0Rm9ySW5zZXJ0KSB7XG4gICAgICAgIC8vIERvbid0IGV4aXQgaW5zZXJ0IG1vZGUgdHdpY2UuIElmIHJlcGVhdEZvckluc2VydCBpcyBzZXQsIHRoZW4gd2VcbiAgICAgICAgLy8gd2VyZSBjYWxsZWQgYnkgYW4gZXhpdEluc2VydE1vZGUgY2FsbCBsb3dlciBvbiB0aGUgc3RhY2suXG4gICAgICAgIGV4aXRJbnNlcnRNb2RlKGNtKTtcbiAgICAgIH1cbiAgICAgIG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNlbmRDbUtleShjbSwga2V5KSB7XG4gICAgICBDb2RlTWlycm9yLmxvb2t1cEtleShrZXksICd2aW0taW5zZXJ0JywgZnVuY3Rpb24ga2V5SGFuZGxlcihiaW5kaW5nKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYmluZGluZyA9PSAnc3RyaW5nJykge1xuICAgICAgICAgIENvZGVNaXJyb3IuY29tbWFuZHNbYmluZGluZ10oY20pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJpbmRpbmcoY20pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlcGVhdEluc2VydE1vZGVDaGFuZ2VzKGNtLCBjaGFuZ2VzLCByZXBlYXQpIHtcbiAgICAgIHZhciBoZWFkID0gY20uZ2V0Q3Vyc29yKCdoZWFkJyk7XG4gICAgICB2YXIgdmlzdWFsQmxvY2sgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXMudmlzdWFsQmxvY2s7XG4gICAgICBpZiAodmlzdWFsQmxvY2spIHtcbiAgICAgICAgLy8gU2V0IHVwIGJsb2NrIHNlbGVjdGlvbiBhZ2FpbiBmb3IgcmVwZWF0aW5nIHRoZSBjaGFuZ2VzLlxuICAgICAgICBzZWxlY3RGb3JJbnNlcnQoY20sIGhlYWQsIHZpc3VhbEJsb2NrICsgMSk7XG4gICAgICAgIHJlcGVhdCA9IGNtLmxpc3RTZWxlY3Rpb25zKCkubGVuZ3RoO1xuICAgICAgICBjbS5zZXRDdXJzb3IoaGVhZCk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcGVhdDsgaSsrKSB7XG4gICAgICAgIGlmICh2aXN1YWxCbG9jaykge1xuICAgICAgICAgIGNtLnNldEN1cnNvcihvZmZzZXRDdXJzb3IoaGVhZCwgaSwgMCkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgY2hhbmdlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHZhciBjaGFuZ2UgPSBjaGFuZ2VzW2pdO1xuICAgICAgICAgIGlmIChjaGFuZ2UgaW5zdGFuY2VvZiBJbnNlcnRNb2RlS2V5KSB7XG4gICAgICAgICAgICBzZW5kQ21LZXkoY20sIGNoYW5nZS5rZXlOYW1lLCBjaGFuZ2UpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNoYW5nZSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9uKGNoYW5nZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICAgICAgdmFyIGVuZCA9IG9mZnNldEN1cnNvcihzdGFydCwgMCwgY2hhbmdlWzBdLmxlbmd0aCAtIChjaGFuZ2VbMV0gfHwgMCkpO1xuICAgICAgICAgICAgY20ucmVwbGFjZVJhbmdlKGNoYW5nZVswXSwgc3RhcnQsIGNoYW5nZVsxXSA/IHN0YXJ0OiBlbmQpO1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGVuZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodmlzdWFsQmxvY2spIHtcbiAgICAgICAgY20uc2V0Q3Vyc29yKG9mZnNldEN1cnNvcihoZWFkLCAwLCAxKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gbXVsdGlzZWxlY3Qgc3VwcG9ydFxuICAvLyBJbml0aWFsaXplIFZpbSBhbmQgbWFrZSBpdCBhdmFpbGFibGUgYXMgYW4gQVBJLlxuICBDb2RlTWlycm9yLlZpbSA9IHZpbUFwaTtcblxuICB2YXIgc3BlY2lhbEtleUFjZSA9IHsncmV0dXJuJzonQ1InLGJhY2tzcGFjZTonQlMnLCdkZWxldGUnOidEZWwnLGVzYzonRXNjJyxcbiAgICBsZWZ0OidMZWZ0JyxyaWdodDonUmlnaHQnLHVwOidVcCcsZG93bjonRG93bicsc3BhY2U6ICdTcGFjZScsaW5zZXJ0OiAnSW5zJyxcbiAgICBob21lOidIb21lJyxlbmQ6J0VuZCcscGFnZXVwOidQYWdlVXAnLHBhZ2Vkb3duOidQYWdlRG93bicsIGVudGVyOiAnQ1InXG4gIH07XG4gIGZ1bmN0aW9uIGxvb2t1cEtleShoYXNoSWQsIGtleSwgZSwgdmltKSB7XG4gICAgaWYgKGtleS5sZW5ndGggPiAxICYmIGtleVswXSA9PSBcIm5cIikge1xuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoXCJudW1wYWRcIiwgXCJcIik7XG4gICAgfVxuICAgIGtleSA9IHNwZWNpYWxLZXlBY2Vba2V5XSB8fCBrZXk7XG4gICAgdmFyIG5hbWUgPSAnJztcbiAgICBpZiAoZS5jdHJsS2V5KSB7IG5hbWUgKz0gJ0MtJzsgfVxuICAgIGlmIChlLmFsdEtleSkgeyBuYW1lICs9ICdBLSc7IH1cbiAgICBpZiAoKG5hbWUgfHwga2V5Lmxlbmd0aCA+IDEpICYmIGUuc2hpZnRLZXkpIHsgbmFtZSArPSAnUy0nOyB9XG5cbiAgICBpZiAodmltICYmICF2aW0uZXhwZWN0TGl0ZXJhbE5leHQgJiYga2V5Lmxlbmd0aCA9PSAxKSB7XG4gICAgICBpZiAobGFuZ21hcC5rZXltYXAgJiYga2V5IGluIGxhbmdtYXAua2V5bWFwKSB7XG4gICAgICAgIGlmIChsYW5nbWFwLnJlbWFwQ3RybCAhPT0gZmFsc2UgfHwgIW5hbWUpXG4gICAgICAgICAga2V5ID0gbGFuZ21hcC5rZXltYXBba2V5XTtcbiAgICAgIH0gZWxzZSBpZiAoa2V5LmNoYXJDb2RlQXQoMCkgPiAyNTUpIHtcbiAgICAgICAgdmFyIGNvZGUgPSBlLmNvZGUgJiYgZS5jb2RlLnNsaWNlKC0xKSB8fCBcIlwiO1xuICAgICAgICBpZiAoIWUuc2hpZnRLZXkpIGNvZGUgPSBjb2RlLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgIGlmIChjb2RlKSBrZXkgPSBjb2RlO1xuICAgICAgfVxuICAgIH1cblxuICAgIG5hbWUgKz0ga2V5O1xuICAgIGlmIChuYW1lLmxlbmd0aCA+IDEpIHsgbmFtZSA9ICc8JyArIG5hbWUgKyAnPic7IH1cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuICB2YXIgaGFuZGxlS2V5ID0gdmltQXBpLmhhbmRsZUtleS5iaW5kKHZpbUFwaSk7XG4gIHZpbUFwaS5oYW5kbGVLZXkgPSBmdW5jdGlvbihjbSwga2V5LCBvcmlnaW4pIHtcbiAgICByZXR1cm4gY20ub3BlcmF0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUtleShjbSwga2V5LCBvcmlnaW4pO1xuICAgIH0sIHRydWUpO1xuICB9XG4gICAgZnVuY3Rpb24gY2xvbmVWaW1TdGF0ZShzdGF0ZSkge1xuICAgICAgdmFyIG4gPSBuZXcgc3RhdGUuY29uc3RydWN0b3IoKTtcbiAgICAgIE9iamVjdC5rZXlzKHN0YXRlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBpZiAoa2V5ID09IFwiaW5zZXJ0RW5kXCIpIHJldHVybjtcbiAgICAgICAgdmFyIG8gPSBzdGF0ZVtrZXldO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvKSlcbiAgICAgICAgICBvID0gby5zbGljZSgpO1xuICAgICAgICBlbHNlIGlmIChvICYmIHR5cGVvZiBvID09IFwib2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvciAhPSBPYmplY3QpXG4gICAgICAgICAgbyA9IGNsb25lVmltU3RhdGUobyk7XG4gICAgICAgIG5ba2V5XSA9IG87XG4gICAgICB9KTtcbiAgICAgIGlmIChzdGF0ZS5zZWwpIHtcbiAgICAgICAgbi5zZWwgPSB7XG4gICAgICAgICAgaGVhZDogc3RhdGUuc2VsLmhlYWQgJiYgY29weUN1cnNvcihzdGF0ZS5zZWwuaGVhZCksXG4gICAgICAgICAgYW5jaG9yOiBzdGF0ZS5zZWwuYW5jaG9yICYmIGNvcHlDdXJzb3Ioc3RhdGUuc2VsLmFuY2hvcilcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuO1xuICAgIH1cbiAgICBmdW5jdGlvbiBtdWx0aVNlbGVjdEhhbmRsZUtleShjbSwga2V5LCBvcmlnaW4pIHtcbiAgICAgIHZhciBpc0hhbmRsZWQgPSBmYWxzZTtcbiAgICAgIHZhciB2aW0gPSB2aW1BcGkubWF5YmVJbml0VmltU3RhdGVfKGNtKTtcbiAgICAgIHZhciB2aXN1YWxCbG9jayA9IHZpbS52aXN1YWxCbG9jayB8fCB2aW0ud2FzSW5WaXN1YWxCbG9jaztcblxuICAgICAgdmFyIHdhc011bHRpc2VsZWN0ID0gY20uYWNlLmluTXVsdGlTZWxlY3RNb2RlO1xuICAgICAgaWYgKHZpbS53YXNJblZpc3VhbEJsb2NrICYmICF3YXNNdWx0aXNlbGVjdCkge1xuICAgICAgICB2aW0ud2FzSW5WaXN1YWxCbG9jayA9IGZhbHNlO1xuICAgICAgfSBlbHNlIGlmICh3YXNNdWx0aXNlbGVjdCAmJiB2aW0udmlzdWFsQmxvY2spIHtcbiAgICAgICAgIHZpbS53YXNJblZpc3VhbEJsb2NrID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgIGlmIChrZXkgPT0gJzxFc2M+JyAmJiAhdmltLmluc2VydE1vZGUgJiYgIXZpbS52aXN1YWxNb2RlICYmIHdhc011bHRpc2VsZWN0KSB7XG4gICAgICBjbS5hY2UuZXhpdE11bHRpU2VsZWN0TW9kZSgpO1xuICAgIH0gZWxzZSBpZiAodmlzdWFsQmxvY2sgfHwgIXdhc011bHRpc2VsZWN0IHx8IGNtLmFjZS5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlKSB7XG4gICAgICBpc0hhbmRsZWQgPSB2aW1BcGkuaGFuZGxlS2V5KGNtLCBrZXksIG9yaWdpbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgb2xkID0gY2xvbmVWaW1TdGF0ZSh2aW0pO1xuICAgICAgICB2YXIgY2hhbmdlUXVldWVMaXN0ID0gdmltLmlucHV0U3RhdGUuY2hhbmdlUXVldWVMaXN0IHx8IFtdO1xuXG4gICAgICAgIGNtLm9wZXJhdGlvbihmdW5jdGlvbigpIHtcbiAgICAgICAgICBjbS5jdXJPcC5pc1ZpbU9wID0gdHJ1ZTtcbiAgICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICAgIGNtLmFjZS5mb3JFYWNoU2VsZWN0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHNlbCA9IGNtLmFjZS5zZWxlY3Rpb247XG4gICAgICAgICAgICBjbS5zdGF0ZS52aW0ubGFzdEhQb3MgPSBzZWwuJGRlc2lyZWRDb2x1bW4gPT0gbnVsbCA/IHNlbC5sZWFkLmNvbHVtbiA6IHNlbC4kZGVzaXJlZENvbHVtbjtcbiAgICAgICAgICAgIGNtLnN0YXRlLnZpbS5pbnB1dFN0YXRlLmNoYW5nZVF1ZXVlID0gY2hhbmdlUXVldWVMaXN0W2luZGV4XTtcbiAgICAgICAgICAgIHZhciBoZWFkID0gY20uZ2V0Q3Vyc29yKFwiaGVhZFwiKTtcbiAgICAgICAgICAgIHZhciBhbmNob3IgPSBjbS5nZXRDdXJzb3IoXCJhbmNob3JcIik7XG4gICAgICAgICAgICB2YXIgaGVhZE9mZnNldCA9ICFjdXJzb3JJc0JlZm9yZShoZWFkLCBhbmNob3IpID8gLTEgOiAwO1xuICAgICAgICAgICAgdmFyIGFuY2hvck9mZnNldCA9IGN1cnNvcklzQmVmb3JlKGhlYWQsIGFuY2hvcikgPyAtMSA6IDA7XG4gICAgICAgICAgICBoZWFkID0gb2Zmc2V0Q3Vyc29yKGhlYWQsIDAsIGhlYWRPZmZzZXQpO1xuICAgICAgICAgICAgYW5jaG9yID0gb2Zmc2V0Q3Vyc29yKGFuY2hvciwgMCwgYW5jaG9yT2Zmc2V0KTtcbiAgICAgICAgICAgIGNtLnN0YXRlLnZpbS5zZWwuaGVhZCA9IGhlYWQ7XG4gICAgICAgICAgICBjbS5zdGF0ZS52aW0uc2VsLmFuY2hvciA9IGFuY2hvcjtcblxuICAgICAgICAgICAgaXNIYW5kbGVkID0gaGFuZGxlS2V5KGNtLCBrZXksIG9yaWdpbik7XG4gICAgICAgICAgICBzZWwuJGRlc2lyZWRDb2x1bW4gPSBjbS5zdGF0ZS52aW0ubGFzdEhQb3MgPT0gLTEgPyBudWxsIDogY20uc3RhdGUudmltLmxhc3RIUG9zO1xuICAgICAgICAgICAgLy8gVE9ETyB3aHkgZG9lcyBjbS52aXJ0dWFsU2VsZWN0aW9uTW9kZSBjaGVjayBpbmRleD9cbiAgICAgICAgICAgIGlmIChjbS5hY2UuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSkge1xuICAgICAgICAgICAgICBjaGFuZ2VRdWV1ZUxpc3RbaW5kZXhdID0gY20uc3RhdGUudmltLmlucHV0U3RhdGUuY2hhbmdlUXVldWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoY20udmlydHVhbFNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgICBjbS5zdGF0ZS52aW0gPSBjbG9uZVZpbVN0YXRlKG9sZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChjbS5jdXJPcC5jdXJzb3JBY3Rpdml0eSAmJiAhaXNIYW5kbGVkKVxuICAgICAgICAgICAgY20uY3VyT3AuY3Vyc29yQWN0aXZpdHkgPSBmYWxzZTtcbiAgICAgICAgICB2aW0uc3RhdHVzID0gY20uc3RhdGUudmltLnN0YXR1cztcbiAgICAgICAgICBjbS5zdGF0ZS52aW0gPSB2aW07XG4gICAgICAgICAgdmltLmlucHV0U3RhdGUuY2hhbmdlUXVldWVMaXN0ID0gY2hhbmdlUXVldWVMaXN0O1xuICAgICAgICAgIHZpbS5pbnB1dFN0YXRlLmNoYW5nZVF1ZXVlID0gbnVsbDtcbiAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICAvLyBzb21lIGNvbW1hbmRzIG1heSBicmluZyB2aXN1YWxNb2RlIGFuZCBzZWxlY3Rpb24gb3V0IG9mIHN5bmNcbiAgICAgIGlmIChpc0hhbmRsZWQgJiYgIXZpbS52aXN1YWxNb2RlICYmICF2aW0uaW5zZXJ0ICYmIHZpbS52aXN1YWxNb2RlICE9IGNtLnNvbWV0aGluZ1NlbGVjdGVkKCkpIHtcbiAgICAgICAgaGFuZGxlRXh0ZXJuYWxTZWxlY3Rpb24oY20sIHZpbSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gaXNIYW5kbGVkO1xuICAgIH1cbiAgICByZXNldFZpbUdsb2JhbFN0YXRlKCk7XG5cblxuICBleHBvcnRzLkNvZGVNaXJyb3IgPSBDb2RlTWlycm9yO1xuICB2YXIgZ2V0VmltID0gdmltQXBpLm1heWJlSW5pdFZpbVN0YXRlXztcbiAgZXhwb3J0cy5oYW5kbGVyID0ge1xuICAgICRpZDogXCJhY2Uva2V5Ym9hcmQvdmltXCIsXG4gICAgZHJhd0N1cnNvcjogZnVuY3Rpb24oZWxlbWVudCwgcGl4ZWxQb3MsIGNvbmZpZywgc2VsLCBzZXNzaW9uKSB7XG4gICAgICB2YXIgdmltID0gdGhpcy5zdGF0ZS52aW0gfHwge307XG4gICAgICB2YXIgdyA9IGNvbmZpZy5jaGFyYWN0ZXJXaWR0aDtcbiAgICAgIHZhciBoID0gY29uZmlnLmxpbmVIZWlnaHQ7XG4gICAgICB2YXIgdG9wID0gcGl4ZWxQb3MudG9wO1xuICAgICAgdmFyIGxlZnQgPSBwaXhlbFBvcy5sZWZ0O1xuICAgICAgaWYgKCF2aW0uaW5zZXJ0TW9kZSkge1xuICAgICAgICB2YXIgaXNiYWNrd2FyZHMgPSAhc2VsLmN1cnNvclxuICAgICAgICAgICAgPyBzZXNzaW9uLnNlbGVjdGlvbi5pc0JhY2t3YXJkcygpIHx8IHNlc3Npb24uc2VsZWN0aW9uLmlzRW1wdHkoKVxuICAgICAgICAgICAgOiBSYW5nZS5jb21wYXJlUG9pbnRzKHNlbC5jdXJzb3IsIHNlbC5zdGFydCkgPD0gMDtcbiAgICAgICAgaWYgKCFpc2JhY2t3YXJkcyAmJiBsZWZ0ID4gdylcbiAgICAgICAgICBsZWZ0IC09IHc7XG4gICAgICB9XG4gICAgICBpZiAoIXZpbS5pbnNlcnRNb2RlICYmIHZpbS5zdGF0dXMpIHtcbiAgICAgICAgaCA9IGggLyAyO1xuICAgICAgICB0b3AgKz0gaDtcbiAgICAgIH1cbiAgICAgIGRvbUxpYi50cmFuc2xhdGUoZWxlbWVudCwgbGVmdCwgdG9wKTtcbiAgICAgIGRvbUxpYi5zZXRTdHlsZShlbGVtZW50LnN0eWxlLCBcIndpZHRoXCIsIHcgKyBcInB4XCIpO1xuICAgICAgZG9tTGliLnNldFN0eWxlKGVsZW1lbnQuc3R5bGUsIFwiaGVpZ2h0XCIsIGggKyBcInB4XCIpO1xuICAgIH0sXG4gICAgJGdldERpcmVjdGlvbkZvckhpZ2hsaWdodDogZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGNtID0gZWRpdG9yLnN0YXRlLmNtO1xuICAgICAgdmFyIHZpbSA9IGdldFZpbShjbSk7XG4gICAgICBpZiAoIXZpbS5pbnNlcnRNb2RlKSB7XG4gICAgICAgIHJldHVybiBlZGl0b3Iuc2Vzc2lvbi5zZWxlY3Rpb24uaXNCYWNrd2FyZHMoKSB8fCBlZGl0b3Iuc2Vzc2lvbi5zZWxlY3Rpb24uaXNFbXB0eSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlS2V5Ym9hcmQ6IGZ1bmN0aW9uKGRhdGEsIGhhc2hJZCwga2V5LCBrZXlDb2RlLCBlKSB7XG4gICAgICB2YXIgZWRpdG9yID0gZGF0YS5lZGl0b3I7XG4gICAgICB2YXIgY20gPSBlZGl0b3Iuc3RhdGUuY207XG4gICAgICB2YXIgdmltID0gZ2V0VmltKGNtKTtcbiAgICAgIGlmIChrZXlDb2RlID09IC0xKSByZXR1cm47XG5cbiAgICAgIC8vIGluIG5vbi1pbnNlcnQgbW9kZSB3ZSB0cnkgdG8gZmluZCB0aGUgYXNjaWkga2V5IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHRleHQgaW4gdGV4dGFyZWFcbiAgICAgIC8vIHRoaXMgaXMgbmVlZGVkIGJlY2F1c2UgaW4gbGFuZ3VhZ2VzIHRoYXQgdXNlIGxhdGluIGFscGhhYmV0IHdlIHdhbnQgdG8gZ2V0IHRoZSBrZXkgdGhhdCBicm93c2VyIHNlbmRzIHRvIHRoZSB0ZXh0YXJlYVxuICAgICAgLy8gYW5kIGluIG5vblxuICAgICAgaWYgKCF2aW0uaW5zZXJ0TW9kZSkge1xuICAgICAgICBpZiAoaGFzaElkID09IC0xKSB7XG4gICAgICAgICAgaWYgKGtleS5jaGFyQ29kZUF0KDApID4gMHhGRikge1xuICAgICAgICAgICAgaWYgKGRhdGEuaW5wdXRLZXkpIHtcbiAgICAgICAgICAgICAga2V5ID0gZGF0YS5pbnB1dEtleTtcbiAgICAgICAgICAgICAgaWYgKGtleSAmJiBkYXRhLmlucHV0SGFzaCA9PSA0KVxuICAgICAgICAgICAgICAgIGtleSA9IGtleS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmlucHV0Q2hhciA9IGtleTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChoYXNoSWQgPT0gNCB8fCBoYXNoSWQgPT0gMCkge1xuICAgICAgICAgIGlmIChkYXRhLmlucHV0S2V5ID09IGtleSAmJiBkYXRhLmlucHV0SGFzaCA9PSBoYXNoSWQgJiYgZGF0YS5pbnB1dENoYXIpIHtcbiAgICAgICAgICAgIC8vIG9uIG1hYyB0ZXh0IGlucHV0IGRvZXNuJ3QgcmVwZWF0XG4gICAgICAgICAgICBrZXkgPSBkYXRhLmlucHV0Q2hhcjtcbiAgICAgICAgICAgIGhhc2hJZCA9IC0xXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0YS5pbnB1dENoYXIgPSBudWxsO1xuICAgICAgICAgICAgZGF0YS5pbnB1dEtleSA9IGtleTtcbiAgICAgICAgICAgIGRhdGEuaW5wdXRIYXNoID0gaGFzaElkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkYXRhLmlucHV0Q2hhciA9IGRhdGEuaW5wdXRLZXkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmIChjbS5zdGF0ZS5vdmVyd3JpdGUgJiYgdmltLmluc2VydE1vZGUgJiYga2V5ID09IFwiYmFja3NwYWNlXCIgJiYgaGFzaElkID09IDApIHtcbiAgICAgICAgcmV0dXJuIHtjb21tYW5kOiBcImdvdG9sZWZ0XCJ9XG4gICAgICB9XG5cbiAgICAgIC8vIGN0cmwtYyBpcyBzcGVjaWFsIGl0IGJvdGggZXhpdHMgbW9kZSBhbmQgY29waWVzIHRleHRcbiAgICAgIGlmIChrZXkgPT0gXCJjXCIgJiYgaGFzaElkID09IDEpIHsgLy8ga2V5ID09IFwiY3RybC1jXCJcbiAgICAgICAgaWYgKCF1c2VyYWdlbnQuaXNNYWMgJiYgZWRpdG9yLmdldENvcHlUZXh0KCkpIHtcbiAgICAgICAgICBlZGl0b3Iub25jZShcImNvcHlcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodmltLmluc2VydE1vZGUpIGVkaXRvci5zZWxlY3Rpb24uY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIGVsc2UgY20ub3BlcmF0aW9uKGZ1bmN0aW9uKCkgeyBleGl0VmlzdWFsTW9kZShjbSk7IH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiB7Y29tbWFuZDogXCJudWxsXCIsIHBhc3NFdmVudDogdHJ1ZX07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGtleSA9PSBcImVzY1wiICYmICF2aW0uaW5zZXJ0TW9kZSAmJiAhdmltLnZpc3VhbE1vZGUgJiYgIWNtLmFjZS5pbk11bHRpU2VsZWN0TW9kZSkge1xuICAgICAgICB2YXIgc2VhcmNoU3RhdGUgPSBnZXRTZWFyY2hTdGF0ZShjbSk7XG4gICAgICAgIHZhciBvdmVybGF5ID0gc2VhcmNoU3RhdGUuZ2V0T3ZlcmxheSgpO1xuICAgICAgICBpZiAob3ZlcmxheSkgY20ucmVtb3ZlT3ZlcmxheShvdmVybGF5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGhhc2hJZCA9PSAtMSB8fCBoYXNoSWQgJiAxIHx8IGhhc2hJZCA9PT0gMCAmJiBrZXkubGVuZ3RoID4gMSkge1xuICAgICAgICB2YXIgaW5zZXJ0TW9kZSA9IHZpbS5pbnNlcnRNb2RlO1xuICAgICAgICB2YXIgbmFtZSA9IGxvb2t1cEtleShoYXNoSWQsIGtleSwgZSB8fCB7fSwgdmltKTtcbiAgICAgICAgaWYgKHZpbS5zdGF0dXMgPT0gbnVsbClcbiAgICAgICAgICB2aW0uc3RhdHVzID0gXCJcIjtcbiAgICAgICAgdmFyIGlzSGFuZGxlZCA9IG11bHRpU2VsZWN0SGFuZGxlS2V5KGNtLCBuYW1lLCAndXNlcicpO1xuICAgICAgICB2aW0gPSBnZXRWaW0oY20pOyAvLyBtYXkgYmUgY2hhbmdlZCBieSBtdWx0aVNlbGVjdEhhbmRsZUtleVxuICAgICAgICBpZiAoaXNIYW5kbGVkICYmIHZpbS5zdGF0dXMgIT0gbnVsbClcbiAgICAgICAgICB2aW0uc3RhdHVzICs9IG5hbWU7XG4gICAgICAgIGVsc2UgaWYgKHZpbS5zdGF0dXMgPT0gbnVsbClcbiAgICAgICAgICB2aW0uc3RhdHVzID0gXCJcIjtcbiAgICAgICAgY20uX3NpZ25hbChcImNoYW5nZVN0YXR1c1wiKTtcbiAgICAgICAgaWYgKCFpc0hhbmRsZWQgJiYgKGhhc2hJZCAhPSAtMSB8fCBpbnNlcnRNb2RlKSlcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIHJldHVybiB7Y29tbWFuZDogXCJudWxsXCIsIHBhc3NFdmVudDogIWlzSGFuZGxlZH07XG4gICAgICB9XG4gICAgfSxcbiAgICBhdHRhY2g6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgaWYgKCFlZGl0b3Iuc3RhdGUpIGVkaXRvci5zdGF0ZSA9IHt9O1xuICAgICAgdmFyIGNtID0gbmV3IENvZGVNaXJyb3IoZWRpdG9yKTtcbiAgICAgIGVkaXRvci5zdGF0ZS5jbSA9IGNtO1xuICAgICAgZWRpdG9yLiR2aW1Nb2RlSGFuZGxlciA9IHRoaXM7XG4gICAgICBlbnRlclZpbU1vZGUoY20pO1xuICAgICAgZ2V0VmltKGNtKS5zdGF0dXMgPSBudWxsO1xuICAgICAgY20ub24oJ3ZpbS1jb21tYW5kLWRvbmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGNtLnZpcnR1YWxTZWxlY3Rpb25Nb2RlKCkpIHJldHVybjtcbiAgICAgICAgZ2V0VmltKGNtKS5zdGF0dXMgPSBudWxsO1xuICAgICAgICBjbS5hY2UuX3NpZ25hbChcImNoYW5nZVN0YXR1c1wiKTtcbiAgICAgICAgY20uYWNlLnNlc3Npb24ubWFya1VuZG9Hcm91cCgpO1xuICAgICAgfSk7XG4gICAgICBjbS5vbihcImNoYW5nZVN0YXR1c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY20uYWNlLnJlbmRlcmVyLnVwZGF0ZUN1cnNvcigpO1xuICAgICAgICBjbS5hY2UuX3NpZ25hbChcImNoYW5nZVN0YXR1c1wiKTtcbiAgICAgIH0pO1xuICAgICAgY20ub24oXCJ2aW0tbW9kZS1jaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChjbS52aXJ0dWFsU2VsZWN0aW9uTW9kZSgpKSByZXR1cm47XG4gICAgICAgIHVwZGF0ZUlucHV0TW9kZSgpO1xuICAgICAgICBjbS5fc2lnbmFsKFwiY2hhbmdlU3RhdHVzXCIpO1xuICAgICAgfSk7XG4gICAgICBmdW5jdGlvbiB1cGRhdGVJbnB1dE1vZGUoKSB7XG4gICAgICAgIHZhciBpc0ludHNlcnQgPSBnZXRWaW0oY20pLmluc2VydE1vZGU7XG4gICAgICAgIGNtLmFjZS5yZW5kZXJlci5zZXRTdHlsZShcIm5vcm1hbC1tb2RlXCIsICFpc0ludHNlcnQpO1xuICAgICAgICBlZGl0b3IudGV4dElucHV0LnNldENvbW1hbmRNb2RlKCFpc0ludHNlcnQpO1xuICAgICAgICAvLyB3aXRob3V0IHRoaXMgcHJlc3MgYW5kIGhvZGwgcG9wdXAgaW4gbWFjIGlzIHNob3duIGluIG5vcm1hbCBtb2RlXG4gICAgICAgIGVkaXRvci5yZW5kZXJlci4ka2VlcFRleHRBcmVhQXRDdXJzb3IgPSBpc0ludHNlcnQ7XG4gICAgICAgIGVkaXRvci5yZW5kZXJlci4kYmxvY2tDdXJzb3IgPSAhaXNJbnRzZXJ0O1xuICAgICAgfVxuICAgICAgdXBkYXRlSW5wdXRNb2RlKCk7XG4gICAgICBlZGl0b3IucmVuZGVyZXIuJGN1cnNvckxheWVyLmRyYXdDdXJzb3IgPSB0aGlzLmRyYXdDdXJzb3IuYmluZChjbSk7XG4gICAgfSxcbiAgICBkZXRhY2g6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgdmFyIGNtID0gZWRpdG9yLnN0YXRlLmNtO1xuICAgICAgbGVhdmVWaW1Nb2RlKGNtKTtcbiAgICAgIGNtLmRlc3Ryb3koKTtcbiAgICAgIGVkaXRvci5zdGF0ZS5jbSA9IG51bGw7XG4gICAgICBlZGl0b3IuJHZpbU1vZGVIYW5kbGVyID0gbnVsbDtcbiAgICAgIGVkaXRvci5yZW5kZXJlci4kY3Vyc29yTGF5ZXIuZHJhd0N1cnNvciA9IG51bGw7XG4gICAgICBlZGl0b3IucmVuZGVyZXIuc2V0U3R5bGUoXCJub3JtYWwtbW9kZVwiLCBmYWxzZSk7XG4gICAgICBlZGl0b3IudGV4dElucHV0LnNldENvbW1hbmRNb2RlKGZhbHNlKTtcbiAgICAgIGVkaXRvci5yZW5kZXJlci4ka2VlcFRleHRBcmVhQXRDdXJzb3IgPSB0cnVlO1xuICAgIH0sXG4gICAgZ2V0U3RhdHVzVGV4dDogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICB2YXIgY20gPSBlZGl0b3Iuc3RhdGUuY207XG4gICAgICB2YXIgdmltID0gZ2V0VmltKGNtKTtcbiAgICAgIGlmICh2aW0uaW5zZXJ0TW9kZSlcbiAgICAgICAgcmV0dXJuIFwiSU5TRVJUXCI7XG4gICAgICB2YXIgc3RhdHVzID0gXCJcIjtcbiAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICBzdGF0dXMgKz0gXCJWSVNVQUxcIjtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxMaW5lKVxuICAgICAgICAgIHN0YXR1cyArPSBcIiBMSU5FXCI7XG4gICAgICAgIGlmICh2aW0udmlzdWFsQmxvY2spXG4gICAgICAgICAgc3RhdHVzICs9IFwiIEJMT0NLXCI7XG4gICAgICB9XG4gICAgICBpZiAodmltLnN0YXR1cylcbiAgICAgICAgc3RhdHVzICs9IChzdGF0dXMgPyBcIiBcIiA6IFwiXCIpICsgdmltLnN0YXR1cztcbiAgICAgIHJldHVybiBzdGF0dXM7XG4gICAgfVxuICB9O1xuICB2aW1BcGkuZGVmaW5lT3B0aW9uKHtcbiAgICBuYW1lOiBcIndyYXBcIixcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlLCBjbSkge1xuICAgICAgaWYgKGNtKSB7Y20uYWNlLnNldE9wdGlvbihcIndyYXBcIiwgdmFsdWUpfVxuICAgIH0sXG4gICAgdHlwZTogXCJib29sZWFuXCJcbiAgfSwgZmFsc2UpO1xuICB2aW1BcGkuZGVmaW5lRXgoJ3dyaXRlJywgJ3cnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnOndyaXRlIGlzIG5vdCBpbXBsZW1lbnRlZCcpXG4gIH0pO1xuICBkZWZhdWx0S2V5bWFwLnB1c2goXG4gICAgeyBrZXlzOiAnemMnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZm9sZCcsIGFjdGlvbkFyZ3M6IHsgb3BlbjogZmFsc2UgfSB9LFxuICAgIHsga2V5czogJ3pDJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2ZvbGQnLCBhY3Rpb25BcmdzOiB7IG9wZW46IGZhbHNlLCBhbGw6IHRydWUgfSB9LFxuICAgIHsga2V5czogJ3pvJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2ZvbGQnLCBhY3Rpb25BcmdzOiB7IG9wZW46IHRydWUgfSB9LFxuICAgIHsga2V5czogJ3pPJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2ZvbGQnLCBhY3Rpb25BcmdzOiB7IG9wZW46IHRydWUsIGFsbDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnemEnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZm9sZCcsIGFjdGlvbkFyZ3M6IHsgdG9nZ2xlOiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICd6QScsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdmb2xkJywgYWN0aW9uQXJnczogeyB0b2dnbGU6IHRydWUsIGFsbDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnemYnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZm9sZCcsIGFjdGlvbkFyZ3M6IHsgb3BlbjogdHJ1ZSwgYWxsOiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICd6ZCcsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdmb2xkJywgYWN0aW9uQXJnczogeyBvcGVuOiB0cnVlLCBhbGw6IHRydWUgfSB9LFxuXG4gICAgeyBrZXlzOiAnPEMtQS1rPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdhY2VDb21tYW5kJywgYWN0aW9uQXJnczogeyBuYW1lOiBcImFkZEN1cnNvckFib3ZlXCIgfSB9LFxuICAgIHsga2V5czogJzxDLUEtaj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnYWNlQ29tbWFuZCcsIGFjdGlvbkFyZ3M6IHsgbmFtZTogXCJhZGRDdXJzb3JCZWxvd1wiIH0gfSxcbiAgICB7IGtleXM6ICc8Qy1BLVMtaz4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnYWNlQ29tbWFuZCcsIGFjdGlvbkFyZ3M6IHsgbmFtZTogXCJhZGRDdXJzb3JBYm92ZVNraXBDdXJyZW50XCIgfSB9LFxuICAgIHsga2V5czogJzxDLUEtUy1qPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdhY2VDb21tYW5kJywgYWN0aW9uQXJnczogeyBuYW1lOiBcImFkZEN1cnNvckJlbG93U2tpcEN1cnJlbnRcIiB9IH0sXG4gICAgeyBrZXlzOiAnPEMtQS1oPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdhY2VDb21tYW5kJywgYWN0aW9uQXJnczogeyBuYW1lOiBcInNlbGVjdE1vcmVCZWZvcmVcIiB9IH0sXG4gICAgeyBrZXlzOiAnPEMtQS1sPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdhY2VDb21tYW5kJywgYWN0aW9uQXJnczogeyBuYW1lOiBcInNlbGVjdE1vcmVBZnRlclwiIH0gfSxcbiAgICB7IGtleXM6ICc8Qy1BLVMtaD4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnYWNlQ29tbWFuZCcsIGFjdGlvbkFyZ3M6IHsgbmFtZTogXCJzZWxlY3ROZXh0QmVmb3JlXCIgfSB9LFxuICAgIHsga2V5czogJzxDLUEtUy1sPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdhY2VDb21tYW5kJywgYWN0aW9uQXJnczogeyBuYW1lOiBcInNlbGVjdE5leHRBZnRlclwiIH0gfVxuICApO1xuICBcbiAgZGVmYXVsdEtleW1hcC5wdXNoKHtcbiAgICBrZXlzOiAnZ3EnLFxuICAgIHR5cGU6ICdvcGVyYXRvcicsXG4gICAgb3BlcmF0b3I6ICdoYXJkV3JhcCdcbiAgfSk7XG4gIHZpbUFwaS5kZWZpbmVPcGVyYXRvcihcImhhcmRXcmFwXCIsIGZ1bmN0aW9uKGNtLCBvcGVyYXRvckFyZ3MsIHJhbmdlcywgb2xkQW5jaG9yLCBuZXdIZWFkKSB7XG4gICAgdmFyIGFuY2hvciA9IHJhbmdlc1swXS5hbmNob3IubGluZTtcbiAgICB2YXIgaGVhZCA9IHJhbmdlc1swXS5oZWFkLmxpbmU7XG4gICAgaWYgKG9wZXJhdG9yQXJncy5saW5ld2lzZSkgaGVhZC0tO1xuICAgIGhhcmRXcmFwKGNtLmFjZSwge3N0YXJ0Um93OiBhbmNob3IsIGVuZFJvdzogaGVhZH0pO1xuICAgIHJldHVybiBQb3MoaGVhZCwgMCk7XG4gIH0pO1xuICBkZWZpbmVPcHRpb24oJ3RleHR3aWR0aCcsIHVuZGVmaW5lZCwgJ251bWJlcicsIFsndHcnXSwgZnVuY3Rpb24od2lkdGgsIGNtKSB7XG4gICAgLy8gT3B0aW9uIGlzIGxvY2FsLiBEbyBub3RoaW5nIGZvciBnbG9iYWwuXG4gICAgaWYgKGNtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gVGhlICdmaWxldHlwZScgb3B0aW9uIHByb3hpZXMgdG8gdGhlIENvZGVNaXJyb3IgJ21vZGUnIG9wdGlvbi5cbiAgICBpZiAod2lkdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIHZhbHVlID0gY20uYWNlLmdldE9wdGlvbigncHJpbnRNYXJnaW5Db2x1bW4nKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGNvbHVtbiA9IE1hdGgucm91bmQod2lkdGgpO1xuICAgICAgaWYgKGNvbHVtbiA+IDEpIHtcbiAgICAgICAgY20uYWNlLnNldE9wdGlvbigncHJpbnRNYXJnaW5Db2x1bW4nLCBjb2x1bW4pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gICAgXG4gIGFjdGlvbnMuYWNlQ29tbWFuZCA9IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICBjbS52aW1DbWQgPSBhY3Rpb25BcmdzO1xuICAgIGlmIChjbS5hY2UuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSlcbiAgICAgIGNtLmFjZS5vbihcImJlZm9yZUVuZE9wZXJhdGlvblwiLCBkZWxheWVkRXhlY0FjZUNvbW1hbmQpO1xuICAgIGVsc2VcbiAgICAgIGRlbGF5ZWRFeGVjQWNlQ29tbWFuZChudWxsLCBjbS5hY2UpO1xuICB9O1xuICBmdW5jdGlvbiBkZWxheWVkRXhlY0FjZUNvbW1hbmQob3AsIGFjZSkge1xuICAgIGFjZS5vZmYoXCJiZWZvcmVFbmRPcGVyYXRpb25cIiwgZGVsYXllZEV4ZWNBY2VDb21tYW5kKTtcbiAgICB2YXIgY21kID0gYWNlLnN0YXRlLmNtLnZpbUNtZDtcbiAgICBpZiAoY21kKSB7XG4gICAgICBhY2UuZXhlY0NvbW1hbmQoY21kLmV4ZWMgPyBjbWQgOiBjbWQubmFtZSwgY21kLmFyZ3MpO1xuICAgIH1cbiAgICBhY2UuY3VyT3AgPSBhY2UucHJldk9wO1xuICB9XG4gIGFjdGlvbnMuZm9sZCA9IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICBjbS5hY2UuZXhlY0NvbW1hbmQoWyd0b2dnbGVGb2xkV2lkZ2V0JywgJ3RvZ2dsZUZvbGRXaWRnZXQnLCAnZm9sZE90aGVyJywgJ3VuZm9sZGFsbCdcbiAgICAgIF1bKGFjdGlvbkFyZ3MuYWxsID8gMiA6IDApICsgKGFjdGlvbkFyZ3Mub3BlbiA/IDEgOiAwKV0pO1xuICB9O1xuXG4gIGRlZmF1bHRLZXltYXBMZW5ndGggPSBkZWZhdWx0S2V5bWFwLmxlbmd0aDsgLy8gYWNlX3BhdGNoXG5cbiAgZXhwb3J0cy5oYW5kbGVyLmRlZmF1bHRLZXltYXAgPSBkZWZhdWx0S2V5bWFwO1xuICBleHBvcnRzLmhhbmRsZXIuYWN0aW9ucyA9IGFjdGlvbnM7XG4gIGV4cG9ydHMuVmltID0gdmltQXBpO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9