"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2403,2165],{

/***/ 52165:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(59082)/* .Range */ .e);

/**
 * @param {import("../editor").Editor} editor
 * @param {import("../../ace-internal").Ace.HardWrapOptions} options
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

var Editor = (__webpack_require__(82880)/* .Editor */ .M);
(__webpack_require__(13188).defineOptions)(Editor.prototype, "editor", {
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

/***/ 2403:
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
  var Range = (__webpack_require__(59082)/* .Range */ .e);
  var EventEmitter = (__webpack_require__(23056)/* .EventEmitter */ .v);
  var domLib = __webpack_require__(6359);
  var oop = __webpack_require__(89359);
  var KEYS = __webpack_require__(11797);
  var event = __webpack_require__(17989);
  var Search = (__webpack_require__(46745)/* .Search */ .o);
  var useragent = __webpack_require__(50618);
  var SearchHighlight = (__webpack_require__(57988)/* .SearchHighlight */ .t);
  var multiSelectCommands = __webpack_require__(48506);
  var TextModeTokenRe = (__webpack_require__(98030).Mode.prototype.tokenRe);
  var hardWrap = (__webpack_require__(52165).hardWrap);
  __webpack_require__(62972);

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
      map = CodeMirror.keyMap[map];
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
          if (point.bias == 1) {
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
    var sel = this.ace.selection;
    if (this.ace.inVirtualSelectionMode) {
      this.ace.session.replace(sel.getRange(), p[0] || "");
      return;
    }
    sel.inVirtualSelectionMode = true;
    var ranges = sel.rangeList.ranges;
    if (!ranges.length) ranges = [this.ace.multiSelect.getRange()];
    for (var i = ranges.length; i--;)
       this.ace.session.replace(ranges[i], p[i] || "");
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
    return handle.row;
  }
  this.getLineHandle = function(row) {
    return {text: this.ace.session.getLine(row), row: row};
  }
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

  function transformCursor(cm, range) {
    var vim = cm.state.vim;
    if (!vim || vim.insertMode) return range.head;
    var head = vim.sel.head;
    if (!head)  return range.head;

    if (vim.visualBlock) {
      if (range.head.line != head.line) {
        return;
      }
    }
    if (range.from() == range.anchor && !range.empty()) {
      if (range.head.line == head.line && range.head.ch != head.ch)
        return new Pos(range.head.line, range.head.ch - 1);
    }

    return range.head;
  }

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
    { keys: '<BS>', type: 'keyToKey', toKeys: 'h', context: 'normal'},
    { keys: '<Del>', type: 'keyToKey', toKeys: 'x', context: 'normal'},
    { keys: '<C-Space>', type: 'keyToKey', toKeys: 'W' },
    { keys: '<C-BS>', type: 'keyToKey', toKeys: 'B', context: 'normal' },
    { keys: '<S-Space>', type: 'keyToKey', toKeys: 'w' },
    { keys: '<S-BS>', type: 'keyToKey', toKeys: 'b', context: 'normal' },
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
    { keys: '\'<character>', type: 'motion', motion: 'goToMark', motionArgs: {toJumplist: true, linewise: true}},
    { keys: '`<character>', type: 'motion', motion: 'goToMark', motionArgs: {toJumplist: true}},
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
    { keys: '@<character>', type: 'action', action: 'replayMacro' },
    { keys: 'q<character>', type: 'action', action: 'enterMacroRecordMode' },
    // Handle Replace-mode as a special case of insert mode.
    { keys: 'R', type: 'action', action: 'enterInsertMode', isEdit: true, actionArgs: { replace: true }, context: 'normal'},
    { keys: 'R', type: 'operator', operator: 'change', operatorArgs: { linewise: true, fullLine: true }, context: 'visual', exitVisualBlock: true},
    { keys: 'u', type: 'action', action: 'undo', context: 'normal' },
    { keys: 'u', type: 'operator', operator: 'changeCase', operatorArgs: {toLower: true}, context: 'visual', isEdit: true },
    { keys: 'U', type: 'operator', operator: 'changeCase', operatorArgs: {toLower: false}, context: 'visual', isEdit: true },
    { keys: '<C-r>', type: 'action', action: 'redo' },
    { keys: 'm<character>', type: 'action', action: 'setMark' },
    { keys: '"<character>', type: 'action', action: 'setRegister' },
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
    { keys: 'a<character>', type: 'motion', motion: 'textObjectManipulation' },
    { keys: 'i<character>', type: 'motion', motion: 'textObjectManipulation', motionArgs: { textObjectInner: true }},
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
    { name: 'unmap' },
    { name: 'write', shortName: 'w' },
    { name: 'undo', shortName: 'u' },
    { name: 'redo', shortName: 'red' },
    { name: 'set', shortName: 'se' },
    { name: 'setlocal', shortName: 'setl' },
    { name: 'setglobal', shortName: 'setg' },
    { name: 'sort', shortName: 'sor' },
    { name: 'substitute', shortName: 's', possiblyAsync: true },
    { name: 'nohlsearch', shortName: 'noh' },
    { name: 'yank', shortName: 'y' },
    { name: 'delmarks', shortName: 'delm' },
    { name: 'registers', shortName: 'reg', excludeFromCommandHistory: true },
    { name: 'vglobal', shortName: 'v' },
    { name: 'global', shortName: 'g' }
  ];

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

    function detachVimMap(cm, next) {
      if (this == CodeMirror.keyMap.vim) {
        cm.options.$customCursor = null;
        CodeMirror.rmClass(cm.getWrapperElement(), "cm-fat-cursor");
      }

      if (!next || next.attach != attachVimMap)
        leaveVimMode(cm);
    }
    function attachVimMap(cm, prev) {
      if (this == CodeMirror.keyMap.vim) {
        if (cm.curOp) cm.curOp.selectionChanged = true;
        cm.options.$customCursor = transformCursor;
        CodeMirror.addClass(cm.getWrapperElement(), "cm-fat-cursor");
      }

      if (!prev || prev.attach != attachVimMap)
        enterVimMode(cm);
    }

    // Deprecated, simply setting the keymap works again.
    CodeMirror.defineOption('vimMode', false, function(cm, val, prev) {
      if (val && cm.getOption("keyMap") != "vim")
        cm.setOption("keyMap", "vim");
      else if (!val && prev != CodeMirror.Init && /^vim/.test(cm.getOption("keyMap")))
        cm.setOption("keyMap", "default");
    });

    function cmKey(key, cm) {
      if (!cm) { return undefined; }
      if (this[key]) { return this[key]; }
      var vimKey = cmKeyToVimKey(key);
      if (!vimKey) {
        return false;
      }
      var cmd = vimApi.findKey(cm, vimKey);
      if (typeof cmd == 'function') {
        CodeMirror.signal(cm, 'vim-keypress', vimKey);
      }
      return cmd;
    }

    var modifiers = {Shift:'S',Ctrl:'C',Alt:'A',Cmd:'D',Mod:'A',CapsLock:''};
    var specialKeys = {Enter:'CR',Backspace:'BS',Delete:'Del',Insert:'Ins'};
    function cmKeyToVimKey(key) {
      if (key.charAt(0) == '\'') {
        // Keypress character binding of format "'a'"
        return key.charAt(1);
      }
      var pieces = key.split(/-(?!$)/);
      var lastPiece = pieces[pieces.length - 1];
      if (pieces.length == 1 && pieces[0].length == 1) {
        // No-modifier bindings use literal character bindings above. Skip.
        return false;
      } else if (pieces.length == 2 && pieces[0] == 'Shift' && lastPiece.length == 1) {
        // Ignore Shift+char bindings as they should be handled by literal character.
        return false;
      }
      var hasCharacter = false;
      for (var i = 0; i < pieces.length; i++) {
        var piece = pieces[i];
        if (piece in modifiers) { pieces[i] = modifiers[piece]; }
        else { hasCharacter = true; }
        if (piece in specialKeys) { pieces[i] = specialKeys[piece]; }
      }
      if (!hasCharacter) {
        // Vim does not support modifier only keys.
        return false;
      }
      // TODO: Current bindings expect the character to be lower case, but
      // it looks like vim key notation uses upper case.
      if (isUpperCase(lastPiece)) {
        pieces[pieces.length - 1] = lastPiece.toLowerCase();
      }
      return '<' + pieces.join('-') + '>';
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
    function makeKeyRange(start, size) {
      var keys = [];
      for (var i = start; i < start + size; i++) {
        keys.push(String.fromCharCode(i));
      }
      return keys;
    }
    var upperCaseAlphabet = makeKeyRange(65, 26);
    var lowerCaseAlphabet = makeKeyRange(97, 26);
    var numbers = makeKeyRange(48, 10);
    var validMarks = [].concat(upperCaseAlphabet, lowerCaseAlphabet, numbers, ['<', '>']);
    var validRegisters = [].concat(upperCaseAlphabet, lowerCaseAlphabet, numbers, ['-', '"', '.', ':', '_', '/', '+']);
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
          options: {}
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
        function toCtxArray(ctx) {
          return ctx ? [ctx] : ['normal', 'insert', 'visual'];
        }
        var ctxsToMap = toCtxArray(ctx);
        // Look through all actual defaults to find a map candidate.
        var actualLength = defaultKeymap.length, origLength = defaultKeymapLength;
        for (var i = actualLength - origLength;
             i < actualLength && ctxsToMap.length;
             i++) {
          var mapping = defaultKeymap[i];
          // Omit mappings that operate in the wrong context(s) and those of invalid type.
          if (mapping.keys == rhs &&
              (!ctx || !mapping.context || mapping.context === ctx) &&
              mapping.type.substr(0, 2) !== 'ex' &&
              mapping.type.substr(0, 3) !== 'key') {
            // Make a shallow copy of the original keymap entry.
            var newMapping = {};
            for (var key in mapping) {
              newMapping[key] = mapping[key];
            }
            // Modify it point to the new mapping with the proper context.
            newMapping.keys = lhs;
            if (ctx && !newMapping.context) {
              newMapping.context = ctx;
            }
            // Add it to the keymap with a higher priority than the original.
            this._mapCommand(newMapping);
            // Record the mapped contexts as complete.
            var mappedCtxs = toCtxArray(mapping.context);
            ctxsToMap = ctxsToMap.filter(function(el) { return mappedCtxs.indexOf(el) === -1; });
          }
        }
        // TODO: Create non-recursive keyToKey mappings for the unmapped contexts once those exist.
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
        function doKeyToKey(keys) {
          // TODO: prevent infinite recursion.
          var match;
          while (keys) {
            // Pull off one command key, which is either a single character
            // or a special sequence wrapped in '<' and '>', e.g. '<Space>'.
            match = (/<\w+-.+?>|<\w+>|./).exec(keys);
            key = match[0];
            keys = keys.substring(match.index + key.length);
            vimApi.handleKey(cm, key, 'mapping');
          }
        }

        function handleKeyInsertMode() {
          if (handleEsc()) { return true; }
          var keys = vim.inputState.keyBuffer = vim.inputState.keyBuffer + key;
          var keysAreChars = key.length == 1;
          var match = commandDispatcher.matchCommand(keys, defaultKeymap, vim.inputState, 'insert');
          // Need to check all key substrings in insert mode.
          while (keys.length > 1 && match.type != 'full') {
            var keys = vim.inputState.keyBuffer = keys.slice(1);
            var thisMatch = commandDispatcher.matchCommand(keys, defaultKeymap, vim.inputState, 'insert');
            if (thisMatch.type != 'none') { match = thisMatch; }
          }
          if (match.type == 'none') { clearInputState(cm); return false; }
          else if (match.type == 'partial') {
            if (lastInsertModeKeyTimer) { window.clearTimeout(lastInsertModeKeyTimer); }
            lastInsertModeKeyTimer = window.setTimeout(
              function() { if (vim.insertMode && vim.inputState.keyBuffer) { clearInputState(cm); } },
              getOption('insertModeEscKeysTimeout'));
            return !keysAreChars;
          }

          if (lastInsertModeKeyTimer) { window.clearTimeout(lastInsertModeKeyTimer); }
          if (keysAreChars) {
            var selections = cm.listSelections();
            for (var i = 0; i < selections.length; i++) {
              var here = selections[i].head;
              cm.replaceRange('', offsetCursor(here, 0, -(keys.length - 1)), here, '+input');
            }
            vimGlobalState.macroModeState.lastInsertModeChanges.changes.pop();
          }
          clearInputState(cm);
          return match.command;
        }

        function handleKeyNonInsertMode() {
          if (handleMacroRecording() || handleEsc()) { return true; }

          var keys = vim.inputState.keyBuffer = vim.inputState.keyBuffer + key;
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
          else if (match.type == 'partial') { return true; }
          else if (match.type == 'clear') { clearInputState(cm); return true; }

          vim.inputState.keyBuffer = '';
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
          return undefined; //ace_patch
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
                  doKeyToKey(command.toKeys);
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
      CodeMirror.signal(cm, 'vim-command-done', reason);
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
        return name && inArray(name, validRegisters);
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
          return {type: 'partial'};
        }

        var bestMatch;
        for (var i = 0; i < matches.full.length; i++) {
          var match = matches.full[i];
          if (!bestMatch) {
            bestMatch = match;
          }
        }
        if (bestMatch.keys.slice(-11) == '<character>') {
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
          var keyName = CodeMirror.keyName(e), up, offset;
          if (keyName == 'Up' || keyName == 'Down') {
            up = keyName == 'Up' ? true : false;
            offset = e.target ? e.target.selectionEnd : 0;
            query = vimGlobalState.searchHistoryController.nextMatch(query, up) || '';
            close(query);
            if (offset && e.target) e.target.selectionEnd = e.target.selectionStart = Math.min(offset, e.target.value.length);
          } else {
            if ( keyName != 'Left' && keyName != 'Right' && keyName != 'Ctrl' && keyName != 'Alt' && keyName != 'Shift')
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
          var keyName = CodeMirror.keyName(e);
          if (keyName == 'Esc' || keyName == 'Ctrl-C' || keyName == 'Ctrl-[' ||
              (keyName == 'Backspace' && query == '')) {
            vimGlobalState.searchHistoryController.pushInput(query);
            vimGlobalState.searchHistoryController.reset();
            updateSearchQuery(cm, originalQuery);
            clearSearchHighlight(cm);
            cm.scrollTo(originalScrollPos.left, originalScrollPos.top);
            CodeMirror.e_stop(e);
            clearInputState(cm);
            close();
            cm.focus();
          } else if (keyName == 'Up' || keyName == 'Down') {
            CodeMirror.e_stop(e);
          } else if (keyName == 'Ctrl-U') {
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
            var word = expandWordUnderCursor(cm, false /** inclusive */,
                true /** forward */, false /** bigWord */,
                true /** noSymbol */);
            var isKeyword = true;
            if (!word) {
              word = expandWordUnderCursor(cm, false /** inclusive */,
                  true /** forward */, false /** bigWord */,
                  false /** noSymbol */);
              isKeyword = false;
            }
            if (!word) {
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
          var keyName = CodeMirror.keyName(e), up, offset;
          if (keyName == 'Esc' || keyName == 'Ctrl-C' || keyName == 'Ctrl-[' ||
              (keyName == 'Backspace' && input == '')) {
            vimGlobalState.exCommandHistoryController.pushInput(input);
            vimGlobalState.exCommandHistoryController.reset();
            CodeMirror.e_stop(e);
            clearInputState(cm);
            close();
            cm.focus();
          }
          if (keyName == 'Up' || keyName == 'Down') {
            CodeMirror.e_stop(e);
            up = keyName == 'Up' ? true : false;
            offset = e.target ? e.target.selectionEnd : 0;
            input = vimGlobalState.exCommandHistoryController.nextMatch(input, up) || '';
            close(input);
            if (offset && e.target) e.target.selectionEnd = e.target.selectionStart = Math.min(offset, e.target.value.length);
          } else if (keyName == 'Ctrl-U') {
            // Ctrl-U clears input.
            CodeMirror.e_stop(e);
            close('');
          } else {
            if ( keyName != 'Left' && keyName != 'Right' && keyName != 'Ctrl' && keyName != 'Alt' && keyName != 'Shift')
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
      moveTillCharacter: function(cm, _head, motionArgs) {
        var repeat = motionArgs.repeat;
        var curEnd = moveToCharacter(cm, repeat, motionArgs.forward,
            motionArgs.selectedCharacter);
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
            motionArgs.selectedCharacter) || head;
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

        var tmp;
        if (mirroredPairs[character]) {
          tmp = selectCompanionObject(cm, head, character, inclusive);
        } else if (selfPaired[character]) {
          tmp = findBeginningAndEnd(cm, head, character, inclusive);
        } else if (character === 'W') {
          tmp = expandWordUnderCursor(cm, inclusive, true /** forward */,
                                                     true /** bigWord */);
        } else if (character === 'w') {
          tmp = expandWordUnderCursor(cm, inclusive, true /** forward */,
                                                     false /** bigWord */);
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
        } else {
          // No text object defined for this, don't move.
          return null;
        }

        if (!cm.state.vim.visualMode) {
          return [tmp.start, tmp.end];
        } else {
          return expandSelection(cm, tmp.start, tmp.end);
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
          var prevLineEnd = new Pos(anchor.line - 1, Number.MAX_VALUE);
          var wasLastLine = cm.firstLine() == cm.lastLine();
          if (head.line > cm.lastLine() && args.linewise && !wasLastLine) {
            cm.replaceRange('', prevLineEnd, head);
          } else {
            cm.replaceRange('', anchor, head);
          }
          if (args.linewise) {
            // Push the next line back down, if there is a next line.
            if (!wasLastLine) {
              cm.setCursor(prevLineEnd);
              CodeMirror.commands.newlineAndIndent(cm);
            }
            // make sure cursor ends up at the end of the line.
            anchor.ch = Number.MAX_VALUE;
          }
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
        if (cm.indentMore) {
          var repeat = (vim.visualMode) ? args.repeat : 1;
          for (var j = 0; j < repeat; j++) {
            if (args.indentRight) cm.indentMore();
            else cm.indentLess();
          }
        } else {
          var startLine = ranges[0].anchor.line;
          var endLine = vim.visualBlock ?
            ranges[ranges.length - 1].anchor.line :
            ranges[0].head.line;
          // In visual mode, n> shifts the selection right n times, instead of
          // shifting n lines right once.
          var repeat = (vim.visualMode) ? args.repeat : 1;
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
        if (ranges.length > 1) { // ace_patch
          cm.setSelection(ranges[0].anchor, ranges[ranges.length - 1].head);
        }
        cm.execCommand("indentAuto");
        return motions.moveToFirstNonWhiteSpaceCharacter(cm, ranges[0].anchor);
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
        var idx;
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
            if (linewise && actionArgs.after) {
              curPosFinal = new Pos(
                cur.line + 1,
                findFirstNonWhiteSpaceCharacter(cm.getLine(cur.line + 1)));
            } else if (linewise && !actionArgs.after) {
              curPosFinal = new Pos(
                cur.line,
                findFirstNonWhiteSpaceCharacter(cm.getLine(cur.line)));
            } else if (!linewise && actionArgs.after) {
              idx = cm.indexFromPos(cur);
              curPosFinal = cm.posFromIndex(idx + text.length - 1);
            } else {
              idx = cm.indexFromPos(cur);
              curPosFinal = cm.posFromIndex(idx + text.length);
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
      var maxCh = text.length - 1 + !!includeLineBreak;
      var ch = Math.min(Math.max(0, cur.ch), maxCh);
      // prevent cursor from entering surrogate pair
      var charCode = text.charCodeAt(ch);
      if (0xDC00 < charCode && charCode <0xDFFF) {
        var direction = 1;
        if (oldCur && oldCur.line == line) {
          if (oldCur.ch > ch) {
            direction = -1;
          }
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
      var match, partial = [], full = [];
      for (var i = 0; i < keyMap.length; i++) {
        var command = keyMap[i];
        if (context == 'insert' && command.context != 'insert' ||
            command.context && command.context != context ||
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
      if (mapped.slice(-11) == '<character>') {
        // Last character matches anything.
        var prefixLen = mapped.length - 11;
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
    function expandSelection(cm, start, end) {
      var sel = cm.state.vim.sel;
      var head = sel.head;
      var anchor = sel.anchor;
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

    function expandWordUnderCursor(cm, inclusive, _forward, bigWord, noSymbol) {
      var cur = getHead(cm);
      var line = cm.getLine(cur.line);
      var idx = cur.ch;

      // Seek to first word or non-whitespace character, depending on if
      // noSymbol is true.
      var test = noSymbol ? wordCharTest[0] : bigWordCharTest [0];
      while (!test(line.charAt(idx))) {
        idx++;
        if (idx >= line.length) { return null; }
      }

      if (bigWord) {
        test = bigWordCharTest[0];
      } else {
        test = wordCharTest[0];
        if (!test(line.charAt(idx))) {
          test = wordCharTest[1];
        }
      }

      var end = idx, start = idx;
      while (test(line.charAt(end)) && end < line.length) { end++; }
      while (test(line.charAt(start)) && start >= 0) { start--; }
      start++;

      if (inclusive) {
        // If present, include all whitespace after word.
        // Otherwise, include all whitespace before word, except indentation.
        var wordEnd = end;
        while (/\s/.test(line.charAt(end)) && end < line.length) { end++; }
        if (wordEnd == end) {
          var wordStart = start;
          while (/\s/.test(line.charAt(start - 1)) && start > 0) { start--; }
          if (!start) { start = wordStart; }
        }
      }
      return { start: new Pos(cur.line, start), end: new Pos(cur.line, end) };
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

    function moveToCharacter(cm, repeat, forward, character) {
      var cur = cm.getCursor();
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
      if (!inArray(markName, validMarks)) {
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

      if (!start || !end) {
        return { start: cur, end: cur };
      }

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
        // Why is this line even here???
        // cm.setCursor(cur.line, firstIndex+1);
      }
      // otherwise if the cursor is currently on the closing symbol
      else if (firstIndex < cur.ch && chars[cur.ch] == symb) {
        end = cur.ch; // assign end to the current cursor
        --cur.ch; // make sure to look backwards
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
      return dom(document.createDocumentFragment(),
               dom('span', {$fontFamily: 'monospace', $whiteSpace: 'pre'},
                 prefix,
                 dom('input', {type: 'text', autocorrect: 'off',
                               autocapitalize: 'off', spellcheck: 'false'})),
               desc && dom('span', {$color: '#888'}, desc));
    }

    function showPrompt(cm, options) {
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
      highlightTimeout = setTimeout(function() {
        if (!cm.state.vim) return;
        var searchState = getSearchState(cm);
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
      // ace_patch{
      var undoManager = cm.ace.session.$undoManager;
      if (undoManager && undoManager.$lastDelta)
        return toCmPos(undoManager.$lastDelta.end);
      // ace_patch}
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
        if (vim.visualMode) {
          exitVisualMode(cm);
        }
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
              for (var i = 0; i < command.toKeys.length; i++) {
                vimApi.handleKey(cm, command.toKeys[i], 'mapping');
              }
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
      map: function(lhs, rhs, ctx) {
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
          if (rhs != ':' && rhs.charAt(0) == ':') {
            // Key to Ex mapping.
            var mapping = {
              keys: lhs,
              type: 'keyToEx',
              exArgs: { input: rhs.substring(1) }
            };
            if (ctx) { mapping.context = ctx; }
            defaultKeymap.unshift(mapping);
          } else {
            // Key to key mapping
            var mapping = {
              keys: lhs,
              type: 'keyToKey',
              toKeys: rhs
            };
            if (ctx) { mapping.context = ctx; }
            defaultKeymap.unshift(mapping);
          }
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
      map: function(cm, params, ctx) {
        var mapArgs = params.args;
        if (!mapArgs || mapArgs.length < 2) {
          if (cm) {
            showConfirm(cm, 'Invalid mapping: ' + params.input);
          }
          return;
        }
        exCommandDispatcher.map(mapArgs[0], mapArgs[1], ctx);
      },
      imap: function(cm, params) { this.map(cm, params, 'insert'); },
      nmap: function(cm, params) { this.map(cm, params, 'normal'); },
      vmap: function(cm, params) { this.map(cm, params, 'visual'); },
      unmap: function(cm, params, ctx) {
        var mapArgs = params.args;
        if (!mapArgs || mapArgs.length < 1 || !exCommandDispatcher.unmap(mapArgs[0], ctx)) {
          if (cm) {
            showConfirm(cm, 'No such mapping: ' + params.input);
          }
        }
      },
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

        if (optionName.charAt(optionName.length - 1) == '?') {
          // If post-fixed with ?, then the set is actually a get.
          if (value) { throw Error('Trailing characters: ' + params.argString); }
          optionName = optionName.substring(0, optionName.length - 1);
          forceGet = true;
        }
        if (value === undefined && optionName.substring(0, 2) == 'no') {
          // To set boolean options to false, the option name is prefixed with
          // 'no'.
          optionName = optionName.substring(2);
          value = false;
        }

        var optionIsBoolean = options[optionName] && options[optionName].type == 'boolean';
        if (optionIsBoolean && value == undefined) {
          // Calling set with a boolean option sets it to true.
          value = true;
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
          var line = cm.getLineHandle(i);
          var matched = query.test(line.text);
          if (matched !== inverted) {
            matchedLines.push(cmd ? line : line.text);
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
            var line = matchedLines[index++];
            var lineNum = cm.getLineNumber(line);
            if (lineNum == null) {
              nextCommand();
              return;
            }
            var command = (lineNum + 1) + cmd;
            exCommandDispatcher.processCommand(cm, command, {
              callback: nextCommand
            });
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
        var keyName = CodeMirror.keyName(e);
        switch (keyName) {
          case 'Y':
            replace(); next(); break;
          case 'N':
            next(); break;
          case 'A':
            // replaceAll contains a call to close of its own. We don't want it
            // to fire too early or multiple times.
            var savedCallback = callback;
            callback = undefined;
            cm.operation(replaceAll);
            callback = savedCallback;
            break;
          case 'L':
            replace();
            // fall through and exit.
          case 'Q':
          case 'Esc':
          case 'Ctrl-C':
          case 'Ctrl-[':
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

    CodeMirror.keyMap.vim = {
      attach: attachVimMap,
      detach: detachVimMap,
      call: cmKey
    };

    function exitInsertMode(cm) {
      var vim = cm.state.vim;
      var macroModeState = vimGlobalState.macroModeState;
      var insertModeChangeRegister = vimGlobalState.registerController.getRegister('.');
      var isPlaying = macroModeState.isPlaying;
      var lastChange = macroModeState.lastInsertModeChanges;
      if (!isPlaying) {
        cm.off('change', onChange);
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
      cm.setCursor(cm.getCursor().line, cm.getCursor().ch-1);
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

    CodeMirror.keyMap['vim-insert'] = {
      // TODO: override navigation keys so that Esc will cancel automatic
      // indentation from o, O, i_<CR>
      fallthrough: ['default'],
      attach: attachVimMap,
      detach: detachVimMap,
      call: cmKey
    };

    CodeMirror.keyMap['vim-replace'] = {
      'Backspace': 'goCharLeft',
      fallthrough: ['vim-insert'],
      attach: attachVimMap,
      detach: detachVimMap,
      call: cmKey
    };

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
                lastChange.changes.push(text);
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
    function InsertModeKey(keyName) {
      this.keyName = keyName;
    }

    /**
    * Handles raw key down events from the text area.
    * - Should only be active in insert mode.
    * - For recording deletes in insert mode.
    */
    function onKeyEventTargetKeyDown(e) {
      var macroModeState = vimGlobalState.macroModeState;
      var lastChange = macroModeState.lastInsertModeChanges;
      var keyName = CodeMirror.keyName(e);
      if (!keyName) { return; }
      function onKeyFound() {
        if (lastChange.maybeReset) {
          lastChange.changes = [];
          lastChange.maybeReset = false;
        }
        lastChange.changes.push(new InsertModeKey(keyName));
        return true;
      }
      if (keyName.indexOf('Delete') != -1 || keyName.indexOf('Backspace') != -1) {
        CodeMirror.lookupKey(keyName, 'vim-insert', onKeyFound);
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

    function repeatInsertModeChanges(cm, changes, repeat) {
      function keyHandler(binding) {
        if (typeof binding == 'string') {
          CodeMirror.commands[binding](cm);
        } else {
          binding(cm);
        }
        return true;
      }
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
            CodeMirror.lookupKey(change.keyName, 'vim-insert', keyHandler);
          } else if (typeof change == "string") {
            cm.replaceSelection(change);
          } else {
            var start = cm.getCursor();
            var end = offsetCursor(start, 0, change[0].length);
            cm.replaceRange(change[0], start, end);
            cm.setCursor(end);
          }
        }
      }
      if (visualBlock) {
        cm.setCursor(offsetCursor(head, 0, 1));
      }
    }

    resetVimGlobalState();
  
  // Initialize Vim and make it available as an API.
  CodeMirror.Vim = vimApi;

  var specialKey = {'return':'CR',backspace:'BS','delete':'Del',esc:'Esc',
    left:'Left',right:'Right',up:'Up',down:'Down',space: 'Space',insert: 'Ins',
    home:'Home',end:'End',pageup:'PageUp',pagedown:'PageDown', enter: 'CR'
  };
  function lookupKey(hashId, key, e) {
    if (key.length > 1 && key[0] == "n") {
      key = key.replace("numpad", "");
    }
    key = specialKey[key] || key;
    var name = '';
    if (e.ctrlKey) { name += 'C-'; }
    if (e.altKey) { name += 'A-'; }
    if ((name || key.length > 1) && e.shiftKey) { name += 'S-'; }

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
      cm.operation(function() {
        cm.ace.forEachSelection(function() {
          var sel = cm.ace.selection;
          cm.state.vim.lastHPos = sel.$desiredColumn == null ? sel.lead.column : sel.$desiredColumn;
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
          if (cm.virtualSelectionMode()) {
            cm.state.vim = cloneVimState(old);
          }
        });
        if (cm.curOp.cursorActivity && !isHandled)
          cm.curOp.cursorActivity = false;
      }, true);
    }
    // ace commands like ctrl-alt-l may bring visualMode and selection out of sync
    if (isHandled && !vim.visualMode && !vim.insert && vim.visualMode != cm.somethingSelected()) {
      handleExternalSelection(cm, vim, true);
    }
    return isHandled;
  }
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
        var name = lookupKey(hashId, key, e || {});
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
      CodeMirror.keyMap.vim.attach(cm);
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
      CodeMirror.keyMap.vim.detach(cm);
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

  exports.handler.defaultKeymap = defaultKeymap;
  exports.handler.actions = actions;
  exports.Vim = vimApi;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLHdDQUF3QztBQUNsRjtBQUNBLDBCQUEwQixxQkFBcUI7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCLFVBQVU7QUFDVixrQkFBa0I7QUFDbEI7O0FBRUE7QUFDQSx3QkFBd0IseUJBQXlCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMERBQTBEO0FBQzFEO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUIsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLGlCQUFpQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0EsNEJBQTRCLGlCQUFpQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixrQ0FBa0M7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixtQkFBbUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQ7QUFDM0Qsa0NBQWtDO0FBQ2xDLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixZQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUIsUUFBUTtBQUNSO0FBQ0EsMkJBQTJCO0FBQzNCLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsa0JBQWtCO0FBQ25ELHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsWUFBWTtBQUNsQztBQUNBLGtCQUFrQixpQ0FBaUM7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixtQkFBbUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0Qyx1QkFBdUI7QUFDbkU7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiwyQkFBMkI7QUFDL0M7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMkJBQTJCO0FBQy9DO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0IsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixZQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFLGVBQWU7QUFDcEY7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsc0RBQXNEO0FBQzNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDREQUE0RDtBQUM1RCx1REFBdUQ7QUFDdkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtRUFBbUU7QUFDbkU7QUFDQTtBQUNBLG1FQUFtRTtBQUNuRSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxlQUFlO0FBQ2Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDLGdCQUFnQjtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRSxNQUFNO0FBQzVFLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsTUFBTTtBQUNyRCwrQ0FBK0MsTUFBTSxNQUFNO0FBQzNELFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMsWUFBWSxLQUFLLElBQUksSUFBSSxZQUFZLEtBQUssR0FBRztBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxZQUFZO0FBQzNCLGVBQWUsUUFBUTtBQUN2QixlQUFlLFNBQVM7QUFDeEI7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQSxnQkFBZ0IsT0FBTyx1Q0FBdUM7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLG9DQUFvQztBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsWUFBWTtBQUMzQixlQUFlLEtBQUs7QUFDcEIsZUFBZSxLQUFLO0FBQ3BCLGVBQWUsU0FBUztBQUN4QjtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixZQUFZO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGlCQUFpQix3QkFBd0I7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFlBQVk7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixvQ0FBb0M7QUFDaEU7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsb0JBQW9CO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEMsYUFBYTtBQUNiLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTtBQUNBLGlCQUFpQixtQkFBbUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CO0FBQ25COztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUI7QUFDbkI7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25COztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLFFBQVE7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkI7QUFDM0I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsaUJBQWlCO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsT0FBTyxNQUFNLE9BQU87QUFDOUIsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLFVBQVUsS0FBSyxLQUFLLEtBQUs7QUFDekIsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9GQUFvRiw4QkFBOEI7QUFDbEgsaUZBQWlGLDhCQUE4Qjs7QUFFL0c7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBLGVBQWU7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEIsa0JBQWtCO0FBQ2xCOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsUUFBUTtBQUNSO0FBQ0EseUJBQXlCLGtCQUFrQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEMsaUJBQWlCO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixvQkFBb0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQixnQkFBZ0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBLHVCQUF1QixnQkFBZ0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixnQkFBZ0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyx1QkFBdUI7QUFDekQ7QUFDQSxxQkFBcUIsU0FBUyx5QkFBeUIsYUFBYTtBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUIsc0JBQXNCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw0QkFBNEIsMkRBQTJEO0FBQ3ZGO0FBQ0Esa0NBQWtDLDZCQUE2QjtBQUMvRCxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEIsNkNBQTZDO0FBQ3pFO0FBQ0EsK0JBQStCO0FBQy9CLDBFQUEwRTtBQUMxRSxvQ0FBb0MsZUFBZTtBQUNuRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsa0JBQWtCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixZQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3QixZQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLDJCQUEyQjtBQUN6RDtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtB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QUFFLDZCQUE2QjtBQUMvQixFQUFFLHVCQUF1QjtBQUN6QixFQUFFLFdBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvaGFyZHdyYXAuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMva2V5Ym9hcmQvdmltLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbi8qKlxuICogQHBhcmFtIHtpbXBvcnQoXCIuLi9lZGl0b3JcIikuRWRpdG9yfSBlZGl0b3JcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5IYXJkV3JhcE9wdGlvbnN9IG9wdGlvbnNcbiAqL1xuZnVuY3Rpb24gaGFyZFdyYXAoZWRpdG9yLCBvcHRpb25zKSB7XG4gICAgdmFyIG1heCA9IG9wdGlvbnMuY29sdW1uIHx8IGVkaXRvci5nZXRPcHRpb24oXCJwcmludE1hcmdpbkNvbHVtblwiKTtcbiAgICB2YXIgYWxsb3dNZXJnZSA9IG9wdGlvbnMuYWxsb3dNZXJnZSAhPSBmYWxzZTtcbiAgICAgICBcbiAgICB2YXIgcm93ID0gTWF0aC5taW4ob3B0aW9ucy5zdGFydFJvdywgb3B0aW9ucy5lbmRSb3cpO1xuICAgIHZhciBlbmRSb3cgPSBNYXRoLm1heChvcHRpb25zLnN0YXJ0Um93LCBvcHRpb25zLmVuZFJvdyk7XG4gICAgXG4gICAgdmFyIHNlc3Npb24gPSBlZGl0b3Iuc2Vzc2lvbjtcbiAgICBcbiAgICB3aGlsZSAocm93IDw9IGVuZFJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBpZiAobGluZS5sZW5ndGggPiBtYXgpIHtcbiAgICAgICAgICAgIHZhciBzcGFjZSA9IGZpbmRTcGFjZShsaW5lLCBtYXgsIDUpO1xuICAgICAgICAgICAgaWYgKHNwYWNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGVudGF0aW9uID0gL15cXHMqLy5leGVjKGxpbmUpWzBdO1xuICAgICAgICAgICAgICAgIHNlc3Npb24ucmVwbGFjZShuZXcgUmFuZ2Uocm93LHNwYWNlLnN0YXJ0LHJvdyxzcGFjZS5lbmQpLCBcIlxcblwiICsgaW5kZW50YXRpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kUm93Kys7XG4gICAgICAgIH0gZWxzZSBpZiAoYWxsb3dNZXJnZSAmJiAvXFxTLy50ZXN0KGxpbmUpICYmIHJvdyAhPSBlbmRSb3cpIHtcbiAgICAgICAgICAgIHZhciBuZXh0TGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cgKyAxKTtcbiAgICAgICAgICAgIGlmIChuZXh0TGluZSAmJiAvXFxTLy50ZXN0KG5leHRMaW5lKSkge1xuICAgICAgICAgICAgICAgIHZhciB0cmltbWVkTGluZSA9IGxpbmUucmVwbGFjZSgvXFxzKyQvLCBcIlwiKTtcbiAgICAgICAgICAgICAgICB2YXIgdHJpbW1lZE5leHRMaW5lID0gbmV4dExpbmUucmVwbGFjZSgvXlxccysvLCBcIlwiKTtcbiAgICAgICAgICAgICAgICB2YXIgbWVyZ2VkTGluZSA9IHRyaW1tZWRMaW5lICsgXCIgXCIgKyB0cmltbWVkTmV4dExpbmU7XG5cbiAgICAgICAgICAgICAgICB2YXIgc3BhY2UgPSBmaW5kU3BhY2UobWVyZ2VkTGluZSwgbWF4LCA1KTtcbiAgICAgICAgICAgICAgICBpZiAoc3BhY2UgJiYgc3BhY2Uuc3RhcnQgPiB0cmltbWVkTGluZS5sZW5ndGggfHwgbWVyZ2VkTGluZS5sZW5ndGggPCBtYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VSYW5nZSA9IG5ldyBSYW5nZShyb3csdHJpbW1lZExpbmUubGVuZ3RoLHJvdyArIDEsbmV4dExpbmUubGVuZ3RoIC0gdHJpbW1lZE5leHRMaW5lLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb24ucmVwbGFjZShyZXBsYWNlUmFuZ2UsIFwiIFwiKTtcbiAgICAgICAgICAgICAgICAgICAgcm93LS07XG4gICAgICAgICAgICAgICAgICAgIGVuZFJvdy0tO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodHJpbW1lZExpbmUubGVuZ3RoIDwgbGluZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbi5yZW1vdmUobmV3IFJhbmdlKHJvdywgdHJpbW1lZExpbmUubGVuZ3RoLCByb3csIGxpbmUubGVuZ3RoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJvdysrO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBsaW5lXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG1heFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtaW5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmaW5kU3BhY2UobGluZSwgbWF4LCBtaW4pIHtcbiAgICAgICAgaWYgKGxpbmUubGVuZ3RoIDwgbWF4KVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgYmVmb3JlID0gbGluZS5zbGljZSgwLCBtYXgpO1xuICAgICAgICB2YXIgYWZ0ZXIgPSBsaW5lLnNsaWNlKG1heCk7XG4gICAgICAgIHZhciBzcGFjZUFmdGVyID0gL14oPzooXFxzKyl8KFxcUyspKFxccyspKS8uZXhlYyhhZnRlcik7XG4gICAgICAgIHZhciBzcGFjZUJlZm9yZSA9IC8oPzooXFxzKyl8KFxccyspKFxcUyspKSQvLmV4ZWMoYmVmb3JlKTtcbiAgICAgICAgdmFyIHN0YXJ0ID0gMDtcbiAgICAgICAgdmFyIGVuZCA9IDA7XG4gICAgICAgIGlmIChzcGFjZUJlZm9yZSAmJiAhc3BhY2VCZWZvcmVbMl0pIHtcbiAgICAgICAgICAgIHN0YXJ0ID0gbWF4IC0gc3BhY2VCZWZvcmVbMV0ubGVuZ3RoO1xuICAgICAgICAgICAgZW5kID0gbWF4O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcGFjZUFmdGVyICYmICFzcGFjZUFmdGVyWzJdKSB7XG4gICAgICAgICAgICBpZiAoIXN0YXJ0KVxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gbWF4O1xuICAgICAgICAgICAgZW5kID0gbWF4ICsgc3BhY2VBZnRlclsxXS5sZW5ndGg7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0YXJ0KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgICAgICBlbmQ6IGVuZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3BhY2VCZWZvcmUgJiYgc3BhY2VCZWZvcmVbMl0gJiYgc3BhY2VCZWZvcmUuaW5kZXggPiBtaW4pIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHNwYWNlQmVmb3JlLmluZGV4LFxuICAgICAgICAgICAgICAgIGVuZDogc3BhY2VCZWZvcmUuaW5kZXggKyBzcGFjZUJlZm9yZVsyXS5sZW5ndGhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNwYWNlQWZ0ZXIgJiYgc3BhY2VBZnRlclsyXSkge1xuICAgICAgICAgICAgc3RhcnQgPSAgbWF4ICsgc3BhY2VBZnRlclsyXS5sZW5ndGg7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBzdGFydCxcbiAgICAgICAgICAgICAgICBlbmQ6IHN0YXJ0ICsgc3BhY2VBZnRlclszXS5sZW5ndGhcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG5cbn1cblxuZnVuY3Rpb24gd3JhcEFmdGVySW5wdXQoZSkge1xuICAgIGlmIChlLmNvbW1hbmQubmFtZSA9PSBcImluc2VydHN0cmluZ1wiICYmIC9cXFMvLnRlc3QoZS5hcmdzKSkge1xuICAgICAgICB2YXIgZWRpdG9yID0gZS5lZGl0b3I7XG4gICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3Iuc2VsZWN0aW9uLmN1cnNvcjtcbiAgICAgICAgaWYgKGN1cnNvci5jb2x1bW4gPD0gZWRpdG9yLnJlbmRlcmVyLiRwcmludE1hcmdpbkNvbHVtbikgcmV0dXJuO1xuICAgICAgICB2YXIgbGFzdERlbHRhID0gZWRpdG9yLnNlc3Npb24uJHVuZG9NYW5hZ2VyLiRsYXN0RGVsdGE7XG5cbiAgICAgICAgaGFyZFdyYXAoZWRpdG9yLCB7XG4gICAgICAgICAgICBzdGFydFJvdzogY3Vyc29yLnJvdywgZW5kUm93OiBjdXJzb3Iucm93LFxuICAgICAgICAgICAgYWxsb3dNZXJnZTogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChsYXN0RGVsdGEgIT0gZWRpdG9yLnNlc3Npb24uJHVuZG9NYW5hZ2VyLiRsYXN0RGVsdGEpIFxuICAgICAgICAgICAgZWRpdG9yLnNlc3Npb24ubWFya1VuZG9Hcm91cCgpO1xuICAgIH1cbn1cblxudmFyIEVkaXRvciA9IHJlcXVpcmUoXCIuLi9lZGl0b3JcIikuRWRpdG9yO1xucmVxdWlyZShcIi4uL2NvbmZpZ1wiKS5kZWZpbmVPcHRpb25zKEVkaXRvci5wcm90b3R5cGUsIFwiZWRpdG9yXCIsIHtcbiAgICBoYXJkV3JhcDoge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZHMub24oXCJhZnRlckV4ZWNcIiwgd3JhcEFmdGVySW5wdXQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLm9mZihcImFmdGVyRXhlY1wiLCB3cmFwQWZ0ZXJJbnB1dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHZhbHVlOiBmYWxzZVxuICAgIH1cbn0pO1xuXG5leHBvcnRzLmhhcmRXcmFwID0gaGFyZFdyYXA7XG4iLCIvLyBDb2RlTWlycm9yLCBjb3B5cmlnaHQgKGMpIGJ5IE1hcmlqbiBIYXZlcmJla2UgYW5kIG90aGVyc1xuLy8gRGlzdHJpYnV0ZWQgdW5kZXIgYW4gTUlUIGxpY2Vuc2U6IGh0dHBzOi8vY29kZW1pcnJvci5uZXQvNS9MSUNFTlNFXG5cbi8qKlxuICogU3VwcG9ydGVkIGtleWJpbmRpbmdzOlxuICogICBUb28gbWFueSB0byBsaXN0LiBSZWZlciB0byBkZWZhdWx0S2V5bWFwIGJlbG93LlxuICpcbiAqIFN1cHBvcnRlZCBFeCBjb21tYW5kczpcbiAqICAgUmVmZXIgdG8gZGVmYXVsdEV4Q29tbWFuZE1hcCBiZWxvdy5cbiAqXG4gKiBSZWdpc3RlcnM6IHVubmFtZWQsIC0sIC4sIDosIC8sIF8sIGEteiwgQS1aLCAwLTlcbiAqICAgKERvZXMgbm90IHJlc3BlY3QgdGhlIHNwZWNpYWwgY2FzZSBmb3IgbnVtYmVyIHJlZ2lzdGVycyB3aGVuIGRlbGV0ZVxuICogICAgb3BlcmF0b3IgaXMgbWFkZSB3aXRoIHRoZXNlIGNvbW1hbmRzOiAlLCAoLCApLCAgLCAvLCA/LCBuLCBOLCB7LCB9IClcbiAqICAgVE9ETzogSW1wbGVtZW50IHRoZSByZW1haW5pbmcgcmVnaXN0ZXJzLlxuICpcbiAqIE1hcmtzOiBhLXosIEEtWiwgYW5kIDAtOVxuICogICBUT0RPOiBJbXBsZW1lbnQgdGhlIHJlbWFpbmluZyBzcGVjaWFsIG1hcmtzLiBUaGV5IGhhdmUgbW9yZSBjb21wbGV4XG4gKiAgICAgICBiZWhhdmlvci5cbiAqXG4gKiBFdmVudHM6XG4gKiAgJ3ZpbS1tb2RlLWNoYW5nZScgLSByYWlzZWQgb24gdGhlIGVkaXRvciBhbnl0aW1lIHRoZSBjdXJyZW50IG1vZGUgY2hhbmdlcyxcbiAqICAgICAgICAgICAgICAgICAgICAgIEV2ZW50IG9iamVjdDoge21vZGU6IFwidmlzdWFsXCIsIHN1Yk1vZGU6IFwibGluZXdpc2VcIn1cbiAqXG4gKiBDb2RlIHN0cnVjdHVyZTpcbiAqICAxLiBEZWZhdWx0IGtleW1hcFxuICogIDIuIFZhcmlhYmxlIGRlY2xhcmF0aW9ucyBhbmQgc2hvcnQgYmFzaWMgaGVscGVyc1xuICogIDMuIEluc3RhbmNlIChFeHRlcm5hbCBBUEkpIGltcGxlbWVudGF0aW9uXG4gKiAgNC4gSW50ZXJuYWwgc3RhdGUgdHJhY2tpbmcgb2JqZWN0cyAoaW5wdXQgc3RhdGUsIGNvdW50ZXIpIGltcGxlbWVudGF0aW9uXG4gKiAgICAgYW5kIGluc3RhbnRpYXRpb25cbiAqICA1LiBLZXkgaGFuZGxlciAodGhlIG1haW4gY29tbWFuZCBkaXNwYXRjaGVyKSBpbXBsZW1lbnRhdGlvblxuICogIDYuIE1vdGlvbiwgb3BlcmF0b3IsIGFuZCBhY3Rpb24gaW1wbGVtZW50YXRpb25zXG4gKiAgNy4gSGVscGVyIGZ1bmN0aW9ucyBmb3IgdGhlIGtleSBoYW5kbGVyLCBtb3Rpb25zLCBvcGVyYXRvcnMsIGFuZCBhY3Rpb25zXG4gKiAgOC4gU2V0IHVwIFZpbSB0byB3b3JrIGFzIGEga2V5bWFwIGZvciBDb2RlTWlycm9yLlxuICogIDkuIEV4IGNvbW1hbmQgaW1wbGVtZW50YXRpb25zLlxuICovXG5cbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGZ1bmN0aW9uIGxvZygpIHtcbiAgICB2YXIgZCA9IFwiXCI7XG4gICAgZnVuY3Rpb24gZm9ybWF0KHApIHtcbiAgICAgIGlmICh0eXBlb2YgcCAhPSBcIm9iamVjdFwiKVxuICAgICAgICByZXR1cm4gcCArIFwiXCI7XG4gICAgICBpZiAoXCJsaW5lXCIgaW4gcCkge1xuICAgICAgICByZXR1cm4gcC5saW5lICsgXCI6XCIgKyBwLmNoO1xuICAgICAgfVxuICAgICAgaWYgKFwiYW5jaG9yXCIgaW4gcCkge1xuICAgICAgICByZXR1cm4gZm9ybWF0KHAuYW5jaG9yKSArIFwiLT5cIiArIGZvcm1hdChwLmhlYWQpO1xuICAgICAgfVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkocCkpXG4gICAgICAgIHJldHVybiBcIltcIiArIHAubWFwKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICByZXR1cm4gZm9ybWF0KHgpO1xuICAgICAgICB9KSArIFwiXVwiO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KHApO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHAgPSBhcmd1bWVudHNbaV07XG4gICAgICB2YXIgZiA9IGZvcm1hdChwKTtcbiAgICAgIGQgKz0gZiArIFwiICBcIjtcbiAgICB9XG4gICAgY29uc29sZS5sb2coZCk7XG4gIH1cbiAgdmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuICB2YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcIi4uL2xpYi9ldmVudF9lbWl0dGVyXCIpLkV2ZW50RW1pdHRlcjtcbiAgdmFyIGRvbUxpYiA9IHJlcXVpcmUoXCIuLi9saWIvZG9tXCIpO1xuICB2YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG4gIHZhciBLRVlTID0gcmVxdWlyZShcIi4uL2xpYi9rZXlzXCIpO1xuICB2YXIgZXZlbnQgPSByZXF1aXJlKFwiLi4vbGliL2V2ZW50XCIpO1xuICB2YXIgU2VhcmNoID0gcmVxdWlyZShcIi4uL3NlYXJjaFwiKS5TZWFyY2g7XG4gIHZhciB1c2VyYWdlbnQgPSByZXF1aXJlKFwiLi4vbGliL3VzZXJhZ2VudFwiKTtcbiAgdmFyIFNlYXJjaEhpZ2hsaWdodCA9IHJlcXVpcmUoXCIuLi9zZWFyY2hfaGlnaGxpZ2h0XCIpLlNlYXJjaEhpZ2hsaWdodDtcbiAgdmFyIG11bHRpU2VsZWN0Q29tbWFuZHMgPSByZXF1aXJlKFwiLi4vY29tbWFuZHMvbXVsdGlfc2VsZWN0X2NvbW1hbmRzXCIpO1xuICB2YXIgVGV4dE1vZGVUb2tlblJlID0gcmVxdWlyZShcIi4uL21vZGUvdGV4dFwiKS5Nb2RlLnByb3RvdHlwZS50b2tlblJlO1xuICB2YXIgaGFyZFdyYXAgPSByZXF1aXJlKFwiLi4vZXh0L2hhcmR3cmFwXCIpLmhhcmRXcmFwO1xuICByZXF1aXJlKFwiLi4vbXVsdGlfc2VsZWN0XCIpO1xuXG4gIHZhciBDb2RlTWlycm9yID0gZnVuY3Rpb24oYWNlKSB7XG4gICAgdGhpcy5hY2UgPSBhY2U7XG4gICAgdGhpcy5zdGF0ZSA9IHt9O1xuICAgIHRoaXMubWFya3MgPSB7fTtcbiAgICB0aGlzLm9wdGlvbnMgPSB7fTtcbiAgICB0aGlzLiR1aWQgPSAwO1xuICAgIHRoaXMub25DaGFuZ2UgPSB0aGlzLm9uQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vblNlbGVjdGlvbkNoYW5nZSA9IHRoaXMub25TZWxlY3Rpb25DaGFuZ2UuYmluZCh0aGlzKTtcbiAgICB0aGlzLm9uQmVmb3JlRW5kT3BlcmF0aW9uID0gdGhpcy5vbkJlZm9yZUVuZE9wZXJhdGlvbi5iaW5kKHRoaXMpO1xuICAgIHRoaXMuYWNlLm9uKCdjaGFuZ2UnLCB0aGlzLm9uQ2hhbmdlKTtcbiAgICB0aGlzLmFjZS5vbignY2hhbmdlU2VsZWN0aW9uJywgdGhpcy5vblNlbGVjdGlvbkNoYW5nZSk7XG4gICAgdGhpcy5hY2Uub24oJ2JlZm9yZUVuZE9wZXJhdGlvbicsIHRoaXMub25CZWZvcmVFbmRPcGVyYXRpb24pO1xuICB9O1xuICBDb2RlTWlycm9yLlBvcyA9IGZ1bmN0aW9uKGxpbmUsIGNoKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBvcykpIHJldHVybiBuZXcgUG9zKGxpbmUsIGNoKTtcbiAgICB0aGlzLmxpbmUgPSBsaW5lOyB0aGlzLmNoID0gY2g7XG4gIH07XG4gIENvZGVNaXJyb3IuZGVmaW5lT3B0aW9uID0gZnVuY3Rpb24obmFtZSwgdmFsLCBzZXR0ZXIpIHt9O1xuICBDb2RlTWlycm9yLmNvbW1hbmRzID0ge1xuICAgIHJlZG86IGZ1bmN0aW9uKGNtKSB7IGNtLmFjZS5yZWRvKCk7IH0sXG4gICAgdW5kbzogZnVuY3Rpb24oY20pIHsgY20uYWNlLnVuZG8oKTsgfSxcbiAgICBuZXdsaW5lQW5kSW5kZW50OiBmdW5jdGlvbihjbSkgeyBjbS5hY2UuaW5zZXJ0KFwiXFxuXCIpOyB9LFxuICAgIGdvTGluZUxlZnQ6IGZ1bmN0aW9uKGNtKSB7IGNtLmFjZS5zZWxlY3Rpb24ubW92ZUN1cnNvckxpbmVTdGFydCgpOyB9LFxuICAgIGdvTGluZVJpZ2h0OiBmdW5jdGlvbihjbSkgeyBjbS5hY2Uuc2VsZWN0aW9uLm1vdmVDdXJzb3JMaW5lRW5kKCk7IH1cbiAgfTtcbiAgQ29kZU1pcnJvci5rZXlNYXAgPSB7fTtcbiAgQ29kZU1pcnJvci5hZGRDbGFzcyA9IENvZGVNaXJyb3Iucm1DbGFzcyA9IGZ1bmN0aW9uKCkge307XG4gIENvZGVNaXJyb3IuZV9zdG9wID0gQ29kZU1pcnJvci5lX3ByZXZlbnREZWZhdWx0ID0gZXZlbnQuc3RvcEV2ZW50O1xuICBDb2RlTWlycm9yLmtleU5hbWUgPSBmdW5jdGlvbihlKSB7XG4gICAgdmFyIGtleSA9IChLRVlTW2Uua2V5Q29kZV0gfHwgZS5rZXkgfHwgXCJcIik7XG4gICAgaWYgKGtleS5sZW5ndGggPT0gMSkga2V5ID0ga2V5LnRvVXBwZXJDYXNlKCk7XG4gICAga2V5ID0gZXZlbnQuZ2V0TW9kaWZpZXJTdHJpbmcoZSkucmVwbGFjZSgvKF58LSlcXHcvZywgZnVuY3Rpb24obSkge1xuICAgICAgcmV0dXJuIG0udG9VcHBlckNhc2UoKTtcbiAgICB9KSArIGtleTtcbiAgICByZXR1cm4ga2V5O1xuICB9O1xuICBDb2RlTWlycm9yLmtleU1hcFsnZGVmYXVsdCddID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGNtKSB7XG4gICAgICB2YXIgY21kID0gY20uYWNlLmNvbW1hbmRzLmNvbW1hbmRLZXlCaW5kaW5nW2tleS50b0xvd2VyQ2FzZSgpXTtcbiAgICAgIHJldHVybiBjbWQgJiYgY20uYWNlLmV4ZWNDb21tYW5kKGNtZCkgIT09IGZhbHNlO1xuICAgIH07XG4gIH07XG4gIENvZGVNaXJyb3IubG9va3VwS2V5ID0gZnVuY3Rpb24gbG9va3VwS2V5KGtleSwgbWFwLCBoYW5kbGUpIHtcbiAgICBpZiAoIW1hcCkgbWFwID0gXCJkZWZhdWx0XCI7XG4gICAgaWYgKHR5cGVvZiBtYXAgPT0gXCJzdHJpbmdcIilcbiAgICAgIG1hcCA9IENvZGVNaXJyb3Iua2V5TWFwW21hcF07XG4gICAgdmFyIGZvdW5kID0gdHlwZW9mIG1hcCA9PSBcImZ1bmN0aW9uXCIgPyBtYXAoa2V5KSA6IG1hcFtrZXldO1xuICAgIGlmIChmb3VuZCA9PT0gZmFsc2UpIHJldHVybiBcIm5vdGhpbmdcIjtcbiAgICBpZiAoZm91bmQgPT09IFwiLi4uXCIpIHJldHVybiBcIm11bHRpXCI7XG4gICAgaWYgKGZvdW5kICE9IG51bGwgJiYgaGFuZGxlKGZvdW5kKSkgcmV0dXJuIFwiaGFuZGxlZFwiO1xuXG4gICAgaWYgKG1hcC5mYWxsdGhyb3VnaCkge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KG1hcC5mYWxsdGhyb3VnaCkpXG4gICAgICAgIHJldHVybiBsb29rdXBLZXkoa2V5LCBtYXAuZmFsbHRocm91Z2gsIGhhbmRsZSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1hcC5mYWxsdGhyb3VnaC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcmVzdWx0ID0gbG9va3VwS2V5KGtleSwgbWFwLmZhbGx0aHJvdWdoW2ldLCBoYW5kbGUpO1xuICAgICAgICBpZiAocmVzdWx0KSByZXR1cm4gcmVzdWx0O1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuXG4gIENvZGVNaXJyb3IuZmluZE1hdGNoaW5nVGFnID0gZnVuY3Rpb24gKGNtLCBoZWFkKSB7XG4gICAgcmV0dXJuIGNtLmZpbmRNYXRjaGluZ1RhZyhoZWFkKTtcbiAgfVxuXG4gIENvZGVNaXJyb3IuZmluZEVuY2xvc2luZ1RhZyA9IGZ1bmN0aW9uIChjbSwgaGVhZCkge1xuXG4gIH07XG5cbiAgQ29kZU1pcnJvci5zaWduYWwgPSBmdW5jdGlvbihvLCBuYW1lLCBlKSB7IHJldHVybiBvLl9zaWduYWwobmFtZSwgZSkgfTtcbiAgQ29kZU1pcnJvci5vbiA9IGV2ZW50LmFkZExpc3RlbmVyO1xuICBDb2RlTWlycm9yLm9mZiA9IGV2ZW50LnJlbW92ZUxpc3RlbmVyO1xuICBDb2RlTWlycm9yLmlzV29yZENoYXIgPSBmdW5jdGlvbihjaCkge1xuICAgIGlmIChjaCA8IFwiXFx4N2ZcIikgcmV0dXJuIC9eXFx3JC8udGVzdChjaCk7XG4gICAgVGV4dE1vZGVUb2tlblJlLmxhc3RJbmRleCA9IDA7XG4gICAgcmV0dXJuIFRleHRNb2RlVG9rZW5SZS50ZXN0KGNoKTtcbiAgfTtcblxuKGZ1bmN0aW9uKCkge1xuICBvb3AuaW1wbGVtZW50KENvZGVNaXJyb3IucHJvdG90eXBlLCBFdmVudEVtaXR0ZXIpO1xuXG4gIHRoaXMuZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuYWNlLm9mZignY2hhbmdlJywgdGhpcy5vbkNoYW5nZSk7XG4gICAgdGhpcy5hY2Uub2ZmKCdjaGFuZ2VTZWxlY3Rpb24nLCB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlKTtcbiAgICB0aGlzLmFjZS5vZmYoJ2JlZm9yZUVuZE9wZXJhdGlvbicsIHRoaXMub25CZWZvcmVFbmRPcGVyYXRpb24pO1xuICAgIHRoaXMucmVtb3ZlT3ZlcmxheSgpO1xuICB9O1xuICB0aGlzLnZpcnR1YWxTZWxlY3Rpb25Nb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLmluVmlydHVhbFNlbGVjdGlvbk1vZGUgJiYgdGhpcy5hY2Uuc2VsZWN0aW9uLmluZGV4O1xuICB9O1xuICB0aGlzLm9uQ2hhbmdlID0gZnVuY3Rpb24oZGVsdGEpIHtcbiAgICB2YXIgY2hhbmdlID0geyB0ZXh0OiBkZWx0YS5hY3Rpb25bMF0gPT0gJ2knID8gZGVsdGEubGluZXMgOiBbXSB9O1xuICAgIHZhciBjdXJPcCA9IHRoaXMuY3VyT3AgPSB0aGlzLmN1ck9wIHx8IHt9O1xuICAgIGlmICghY3VyT3AuY2hhbmdlSGFuZGxlcnMpXG4gICAgICBjdXJPcC5jaGFuZ2VIYW5kbGVycyA9IHRoaXMuX2V2ZW50UmVnaXN0cnlbXCJjaGFuZ2VcIl0gJiYgdGhpcy5fZXZlbnRSZWdpc3RyeVtcImNoYW5nZVwiXS5zbGljZSgpO1xuICAgIGlmICghY3VyT3AubGFzdENoYW5nZSkge1xuICAgICAgY3VyT3AubGFzdENoYW5nZSA9IGN1ck9wLmNoYW5nZSA9IGNoYW5nZTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VyT3AubGFzdENoYW5nZS5uZXh0ID0gY3VyT3AubGFzdENoYW5nZSA9IGNoYW5nZTtcbiAgICB9XG4gICAgdGhpcy4kdXBkYXRlTWFya2VycyhkZWx0YSk7XG4gIH07XG4gIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY3VyT3AgPSB0aGlzLmN1ck9wID0gdGhpcy5jdXJPcCB8fCB7fTtcbiAgICBpZiAoIWN1ck9wLmN1cnNvckFjdGl2aXR5SGFuZGxlcnMpXG4gICAgICBjdXJPcC5jdXJzb3JBY3Rpdml0eUhhbmRsZXJzID0gdGhpcy5fZXZlbnRSZWdpc3RyeVtcImN1cnNvckFjdGl2aXR5XCJdICYmIHRoaXMuX2V2ZW50UmVnaXN0cnlbXCJjdXJzb3JBY3Rpdml0eVwiXS5zbGljZSgpO1xuICAgIHRoaXMuY3VyT3AuY3Vyc29yQWN0aXZpdHkgPSB0cnVlO1xuICAgIGlmICh0aGlzLmFjZS5pbk11bHRpU2VsZWN0TW9kZSkge1xuICAgICAgdGhpcy5hY2Uua2V5QmluZGluZy5yZW1vdmVLZXlib2FyZEhhbmRsZXIobXVsdGlTZWxlY3RDb21tYW5kcy5rZXlib2FyZEhhbmRsZXIpO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5vcGVyYXRpb24gPSBmdW5jdGlvbihmbiwgZm9yY2UpIHtcbiAgICBpZiAoIWZvcmNlICYmIHRoaXMuY3VyT3AgfHwgZm9yY2UgJiYgdGhpcy5jdXJPcCAmJiB0aGlzLmN1ck9wLmZvcmNlKSB7XG4gICAgICByZXR1cm4gZm4oKTtcbiAgICB9XG4gICAgaWYgKGZvcmNlIHx8ICF0aGlzLmFjZS5jdXJPcCkge1xuICAgICAgaWYgKHRoaXMuY3VyT3ApXG4gICAgICAgIHRoaXMub25CZWZvcmVFbmRPcGVyYXRpb24oKTtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmFjZS5jdXJPcCkge1xuICAgICAgdmFyIHByZXZPcCA9IHRoaXMuYWNlLnByZXZPcDtcbiAgICAgIHRoaXMuYWNlLnN0YXJ0T3BlcmF0aW9uKHtcbiAgICAgICAgY29tbWFuZDogeyBuYW1lOiBcInZpbVwiLCAgc2Nyb2xsSW50b1ZpZXc6IFwiY3Vyc29yXCIgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHZhciBjdXJPcCA9IHRoaXMuY3VyT3AgPSB0aGlzLmN1ck9wIHx8IHt9O1xuICAgIHRoaXMuY3VyT3AuZm9yY2UgPSBmb3JjZTtcbiAgICB2YXIgcmVzdWx0ID0gZm4oKTtcbiAgICBpZiAodGhpcy5hY2UuY3VyT3AgJiYgdGhpcy5hY2UuY3VyT3AuY29tbWFuZC5uYW1lID09IFwidmltXCIpIHtcbiAgICAgIGlmICh0aGlzLnN0YXRlLmRpYWxvZylcbiAgICAgICAgdGhpcy5hY2UuY3VyT3AuY29tbWFuZC5zY3JvbGxJbnRvVmlldyA9IHRoaXMuYWNlLmN1ck9wLnZpbURpYWxvZ1Njcm9sbDtcbiAgICAgIHRoaXMuYWNlLmVuZE9wZXJhdGlvbigpO1xuICAgICAgaWYgKCFjdXJPcC5jdXJzb3JBY3Rpdml0eSAmJiAhY3VyT3AubGFzdENoYW5nZSAmJiBwcmV2T3ApXG4gICAgICAgIHRoaXMuYWNlLnByZXZPcCA9IHByZXZPcDtcbiAgICB9XG4gICAgaWYgKGZvcmNlIHx8ICF0aGlzLmFjZS5jdXJPcCkge1xuICAgICAgaWYgKHRoaXMuY3VyT3ApXG4gICAgICAgIHRoaXMub25CZWZvcmVFbmRPcGVyYXRpb24oKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbiAgdGhpcy5vbkJlZm9yZUVuZE9wZXJhdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvcCA9IHRoaXMuY3VyT3A7XG4gICAgaWYgKG9wKSB7XG4gICAgICBpZiAob3AuY2hhbmdlKSB7IHRoaXMuc2lnbmFsKFwiY2hhbmdlXCIsIG9wLmNoYW5nZSwgb3ApOyB9XG4gICAgICBpZiAob3AgJiYgb3AuY3Vyc29yQWN0aXZpdHkpIHsgdGhpcy5zaWduYWwoXCJjdXJzb3JBY3Rpdml0eVwiLCBudWxsLCBvcCk7IH1cbiAgICAgIHRoaXMuY3VyT3AgPSBudWxsO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLnNpZ25hbCA9IGZ1bmN0aW9uKGV2ZW50TmFtZSwgZSwgaGFuZGxlcnMpIHtcbiAgICB2YXIgbGlzdGVuZXJzID0gaGFuZGxlcnMgPyBoYW5kbGVyc1tldmVudE5hbWUgKyBcIkhhbmRsZXJzXCJdXG4gICAgICAgIDogKHRoaXMuX2V2ZW50UmVnaXN0cnkgfHwge30pW2V2ZW50TmFtZV07XG4gICAgaWYgKCFsaXN0ZW5lcnMpXG4gICAgICAgIHJldHVybjtcbiAgICBsaXN0ZW5lcnMgPSBsaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICBmb3IgKHZhciBpPTA7IGk8bGlzdGVuZXJzLmxlbmd0aDsgaSsrKVxuICAgICAgICBsaXN0ZW5lcnNbaV0odGhpcywgZSk7XG4gIH07XG4gIHRoaXMuZmlyc3RMaW5lID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuICB0aGlzLmxhc3RMaW5lID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLmFjZS5zZXNzaW9uLmdldExlbmd0aCgpIC0gMTsgfTtcbiAgdGhpcy5saW5lQ291bnQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuYWNlLnNlc3Npb24uZ2V0TGVuZ3RoKCk7IH07XG4gIHRoaXMuc2V0Q3Vyc29yID0gZnVuY3Rpb24obGluZSwgY2gpIHtcbiAgICBpZiAodHlwZW9mIGxpbmUgPT09ICdvYmplY3QnKSB7XG4gICAgICBjaCA9IGxpbmUuY2g7XG4gICAgICBsaW5lID0gbGluZS5saW5lO1xuICAgIH1cbiAgICB2YXIgc2hvdWxkU2Nyb2xsID0gIXRoaXMuY3VyT3AgJiYgIXRoaXMuYWNlLmluVmlydHVhbFNlbGVjdGlvbk1vZGU7XG4gICAgaWYgKCF0aGlzLmFjZS5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlKVxuICAgICAgdGhpcy5hY2UuZXhpdE11bHRpU2VsZWN0TW9kZSgpO1xuICAgIHRoaXMuYWNlLnNlc3Npb24udW5mb2xkKHtyb3c6IGxpbmUsIGNvbHVtbjogY2h9KTtcbiAgICB0aGlzLmFjZS5zZWxlY3Rpb24ubW92ZVRvKGxpbmUsIGNoKTtcbiAgICBpZiAoc2hvdWxkU2Nyb2xsKSB7XG4gICAgICB0aGlzLmFjZS5yZW5kZXJlci5zY3JvbGxDdXJzb3JJbnRvVmlldygpO1xuICAgICAgdGhpcy5hY2UuZW5kT3BlcmF0aW9uKCk7XG4gICAgfVxuICB9O1xuICB0aGlzLmdldEN1cnNvciA9IGZ1bmN0aW9uKHApIHtcbiAgICB2YXIgc2VsID0gdGhpcy5hY2Uuc2VsZWN0aW9uO1xuICAgIHZhciBwb3MgPSBwID09ICdhbmNob3InID8gKHNlbC5pc0VtcHR5KCkgPyBzZWwubGVhZCA6IHNlbC5hbmNob3IpIDpcbiAgICAgICAgcCA9PSAnaGVhZCcgfHwgIXAgPyBzZWwubGVhZCA6IHNlbC5nZXRSYW5nZSgpW3BdO1xuICAgIHJldHVybiB0b0NtUG9zKHBvcyk7XG4gIH07XG4gIHRoaXMubGlzdFNlbGVjdGlvbnMgPSBmdW5jdGlvbihwKSB7XG4gICAgdmFyIHJhbmdlcyA9IHRoaXMuYWNlLm11bHRpU2VsZWN0LnJhbmdlTGlzdC5yYW5nZXM7XG4gICAgaWYgKCFyYW5nZXMubGVuZ3RoIHx8IHRoaXMuYWNlLmluVmlydHVhbFNlbGVjdGlvbk1vZGUpXG4gICAgICByZXR1cm4gW3thbmNob3I6IHRoaXMuZ2V0Q3Vyc29yKCdhbmNob3InKSwgaGVhZDogdGhpcy5nZXRDdXJzb3IoJ2hlYWQnKX1dO1xuICAgIHJldHVybiByYW5nZXMubWFwKGZ1bmN0aW9uKHIpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFuY2hvcjogdGhpcy5jbGlwUG9zKHRvQ21Qb3Moci5jdXJzb3IgPT0gci5lbmQgPyByLnN0YXJ0IDogci5lbmQpKSxcbiAgICAgICAgaGVhZDogdGhpcy5jbGlwUG9zKHRvQ21Qb3Moci5jdXJzb3IpKVxuICAgICAgfTtcbiAgICB9LCB0aGlzKTtcbiAgfTtcbiAgdGhpcy5zZXRTZWxlY3Rpb25zID0gZnVuY3Rpb24ocCwgcHJpbUluZGV4KSB7XG4gICAgdmFyIHNlbCA9IHRoaXMuYWNlLm11bHRpU2VsZWN0O1xuICAgIHZhciByYW5nZXMgPSBwLm1hcChmdW5jdGlvbih4KSB7XG4gICAgICB2YXIgYW5jaG9yID0gdG9BY2VQb3MoeC5hbmNob3IpO1xuICAgICAgdmFyIGhlYWQgPSB0b0FjZVBvcyh4LmhlYWQpO1xuICAgICAgdmFyIHIgPSBSYW5nZS5jb21wYXJlUG9pbnRzKGFuY2hvciwgaGVhZCkgPCAwXG4gICAgICAgID8gbmV3IFJhbmdlLmZyb21Qb2ludHMoYW5jaG9yLCBoZWFkKVxuICAgICAgICA6IG5ldyBSYW5nZS5mcm9tUG9pbnRzKGhlYWQsIGFuY2hvcik7XG4gICAgICByLmN1cnNvciA9IFJhbmdlLmNvbXBhcmVQb2ludHMoci5zdGFydCwgaGVhZCkgPyByLmVuZCA6IHIuc3RhcnQ7XG4gICAgICByZXR1cm4gcjtcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLmFjZS5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlKSB7XG4gICAgICB0aGlzLmFjZS5zZWxlY3Rpb24uZnJvbU9yaWVudGVkUmFuZ2UocmFuZ2VzWzBdKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCFwcmltSW5kZXgpIHtcbiAgICAgICAgcmFuZ2VzID0gcmFuZ2VzLnJldmVyc2UoKTtcbiAgICB9IGVsc2UgaWYgKHJhbmdlc1twcmltSW5kZXhdKSB7XG4gICAgICAgcmFuZ2VzLnB1c2gocmFuZ2VzLnNwbGljZShwcmltSW5kZXgsIDEpWzBdKTtcbiAgICB9XG4gICAgc2VsLnRvU2luZ2xlUmFuZ2UocmFuZ2VzWzBdLmNsb25lKCkpO1xuICAgIHZhciBzZXNzaW9uID0gdGhpcy5hY2Uuc2Vzc2lvbjtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIHJhbmdlID0gc2Vzc2lvbi4kY2xpcFJhbmdlVG9Eb2N1bWVudChyYW5nZXNbaV0pOyAvLyB0b2RvIHdoeSBhY2UgZG9lc24ndCBkbyB0aGlzP1xuICAgICAgc2VsLmFkZFJhbmdlKHJhbmdlKTtcbiAgICB9XG4gIH07XG4gIHRoaXMuc2V0U2VsZWN0aW9uID0gZnVuY3Rpb24oYSwgaCwgb3B0aW9ucykge1xuICAgIHZhciBzZWwgPSB0aGlzLmFjZS5zZWxlY3Rpb247XG4gICAgc2VsLm1vdmVUbyhhLmxpbmUsIGEuY2gpO1xuICAgIHNlbC5zZWxlY3RUbyhoLmxpbmUsIGguY2gpO1xuICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMub3JpZ2luID09ICcqbW91c2UnKSB7XG4gICAgICB0aGlzLm9uQmVmb3JlRW5kT3BlcmF0aW9uKCk7XG4gICAgfVxuICB9O1xuICB0aGlzLnNvbWV0aGluZ1NlbGVjdGVkID0gZnVuY3Rpb24ocCkge1xuICAgIHJldHVybiAhdGhpcy5hY2Uuc2VsZWN0aW9uLmlzRW1wdHkoKTtcbiAgfTtcbiAgdGhpcy5jbGlwUG9zID0gZnVuY3Rpb24ocCkge1xuICAgIHZhciBwb3MgPSB0aGlzLmFjZS5zZXNzaW9uLiRjbGlwUG9zaXRpb25Ub0RvY3VtZW50KHAubGluZSwgcC5jaCk7XG4gICAgcmV0dXJuIHRvQ21Qb3MocG9zKTtcbiAgfTtcbiAgdGhpcy5mb2xkQ29kZSA9IGZ1bmN0aW9uKHBvcykge1xuICAgIHRoaXMuYWNlLnNlc3Npb24uJHRvZ2dsZUZvbGRXaWRnZXQocG9zLmxpbmUsIHt9KTtcbiAgfTtcbiAgdGhpcy5tYXJrVGV4dCA9IGZ1bmN0aW9uKGN1cnNvcikge1xuICAgIC8vIG9ubHkgdXNlZCBmb3IgZmF0LWN1cnNvciwgbm90IG5lZWRlZFxuICAgIHJldHVybiB7Y2xlYXI6IGZ1bmN0aW9uKCkge30sIGZpbmQ6IGZ1bmN0aW9uKCkge319O1xuICB9O1xuICB0aGlzLiR1cGRhdGVNYXJrZXJzID0gZnVuY3Rpb24oZGVsdGEpIHtcbiAgICB2YXIgaXNJbnNlcnQgPSBkZWx0YS5hY3Rpb24gPT0gXCJpbnNlcnRcIjtcbiAgICB2YXIgc3RhcnQgPSBkZWx0YS5zdGFydDtcbiAgICB2YXIgZW5kID0gZGVsdGEuZW5kO1xuICAgIHZhciByb3dTaGlmdCA9IChlbmQucm93IC0gc3RhcnQucm93KSAqIChpc0luc2VydCA/IDEgOiAtMSk7XG4gICAgdmFyIGNvbFNoaWZ0ID0gKGVuZC5jb2x1bW4gLSBzdGFydC5jb2x1bW4pICogKGlzSW5zZXJ0ID8gMSA6IC0xKTtcbiAgICBpZiAoaXNJbnNlcnQpIGVuZCA9IHN0YXJ0O1xuXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLm1hcmtzKSB7XG4gICAgICB2YXIgcG9pbnQgPSB0aGlzLm1hcmtzW2ldO1xuICAgICAgdmFyIGNtcCA9IFJhbmdlLmNvbXBhcmVQb2ludHMocG9pbnQsIHN0YXJ0KTtcbiAgICAgIGlmIChjbXAgPCAwKSB7XG4gICAgICAgIGNvbnRpbnVlOyAvLyBkZWx0YSBzdGFydHMgYWZ0ZXIgdGhlIHJhbmdlXG4gICAgICB9XG4gICAgICBpZiAoY21wID09PSAwKSB7XG4gICAgICAgIGlmIChpc0luc2VydCkge1xuICAgICAgICAgIGlmIChwb2ludC5iaWFzID09IDEpIHtcbiAgICAgICAgICAgIGNtcCA9IDE7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvaW50LmJpYXMgPSAtMTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIGNtcDIgPSBpc0luc2VydCA/IGNtcCA6IFJhbmdlLmNvbXBhcmVQb2ludHMocG9pbnQsIGVuZCk7XG4gICAgICBpZiAoY21wMiA+IDApIHtcbiAgICAgICAgcG9pbnQucm93ICs9IHJvd1NoaWZ0O1xuICAgICAgICBwb2ludC5jb2x1bW4gKz0gcG9pbnQucm93ID09IGVuZC5yb3cgPyBjb2xTaGlmdCA6IDA7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKCFpc0luc2VydCAmJiBjbXAyIDw9IDApIHtcbiAgICAgICAgcG9pbnQucm93ID0gc3RhcnQucm93O1xuICAgICAgICBwb2ludC5jb2x1bW4gPSBzdGFydC5jb2x1bW47XG4gICAgICAgIGlmIChjbXAyID09PSAwKVxuICAgICAgICAgIHBvaW50LmJpYXMgPSAxO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbiAgdmFyIE1hcmtlciA9IGZ1bmN0aW9uKGNtLCBpZCwgcm93LCBjb2x1bW4pIHtcbiAgICB0aGlzLmNtID0gY207XG4gICAgdGhpcy5pZCA9IGlkO1xuICAgIHRoaXMucm93ID0gcm93O1xuICAgIHRoaXMuY29sdW1uID0gY29sdW1uO1xuICAgIGNtLm1hcmtzW3RoaXMuaWRdID0gdGhpcztcbiAgfTtcbiAgTWFya2VyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCkgeyBkZWxldGUgdGhpcy5jbS5tYXJrc1t0aGlzLmlkXSB9O1xuICBNYXJrZXIucHJvdG90eXBlLmZpbmQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRvQ21Qb3ModGhpcykgfTtcbiAgdGhpcy5zZXRCb29rbWFyayA9IGZ1bmN0aW9uKGN1cnNvciwgb3B0aW9ucykge1xuICAgIHZhciBibSA9IG5ldyBNYXJrZXIodGhpcywgdGhpcy4kdWlkKyssIGN1cnNvci5saW5lLCBjdXJzb3IuY2gpO1xuICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5pbnNlcnRMZWZ0KVxuICAgICAgYm0uJGluc2VydFJpZ2h0ID0gdHJ1ZTtcbiAgICB0aGlzLm1hcmtzW2JtLmlkXSA9IGJtO1xuICAgIHJldHVybiBibTtcbiAgfTtcbiAgdGhpcy5tb3ZlSCA9IGZ1bmN0aW9uKGluY3JlbWVudCwgdW5pdCkge1xuICAgIGlmICh1bml0ID09ICdjaGFyJykge1xuICAgICAgdmFyIHNlbCA9IHRoaXMuYWNlLnNlbGVjdGlvbjtcbiAgICAgIHNlbC5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgc2VsLm1vdmVDdXJzb3JCeSgwLCBpbmNyZW1lbnQpO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5maW5kUG9zViA9IGZ1bmN0aW9uKHN0YXJ0LCBhbW91bnQsIHVuaXQsIGdvYWxDb2x1bW4pIHtcbiAgICBpZiAodW5pdCA9PSAncGFnZScpIHtcbiAgICAgIHZhciByZW5kZXJlciA9IHRoaXMuYWNlLnJlbmRlcmVyO1xuICAgICAgdmFyIGNvbmZpZyA9IHJlbmRlcmVyLmxheWVyQ29uZmlnO1xuICAgICAgYW1vdW50ID0gYW1vdW50ICogTWF0aC5mbG9vcihjb25maWcuaGVpZ2h0IC8gY29uZmlnLmxpbmVIZWlnaHQpO1xuICAgICAgdW5pdCA9ICdsaW5lJztcbiAgICB9XG4gICAgaWYgKHVuaXQgPT0gJ2xpbmUnKSB7XG4gICAgICB2YXIgc2NyZWVuUG9zID0gdGhpcy5hY2Uuc2Vzc2lvbi5kb2N1bWVudFRvU2NyZWVuUG9zaXRpb24oc3RhcnQubGluZSwgc3RhcnQuY2gpO1xuICAgICAgaWYgKGdvYWxDb2x1bW4gIT0gbnVsbClcbiAgICAgICAgc2NyZWVuUG9zLmNvbHVtbiA9IGdvYWxDb2x1bW47XG4gICAgICBzY3JlZW5Qb3Mucm93ICs9IGFtb3VudDtcbiAgICAgIC8vIG5vdCB3aGF0IGNvZGVtaXJyb3IgZG9lcyBidXQgdmltIG1vZGUgbmVlZHMgb25seSB0aGlzXG4gICAgICBzY3JlZW5Qb3Mucm93ID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgc2NyZWVuUG9zLnJvdyksIHRoaXMuYWNlLnNlc3Npb24uZ2V0U2NyZWVuTGVuZ3RoKCkgLSAxKTtcbiAgICAgIHZhciBwb3MgPSB0aGlzLmFjZS5zZXNzaW9uLnNjcmVlblRvRG9jdW1lbnRQb3NpdGlvbihzY3JlZW5Qb3Mucm93LCBzY3JlZW5Qb3MuY29sdW1uKTtcbiAgICAgIHJldHVybiB0b0NtUG9zKHBvcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlYnVnZ2VyO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5jaGFyQ29vcmRzID0gZnVuY3Rpb24ocG9zLCBtb2RlKSB7XG4gICAgaWYgKG1vZGUgPT0gJ2RpdicgfHwgIW1vZGUpIHtcbiAgICAgIHZhciBzYyA9IHRoaXMuYWNlLnNlc3Npb24uZG9jdW1lbnRUb1NjcmVlblBvc2l0aW9uKHBvcy5saW5lLCBwb3MuY2gpO1xuICAgICAgcmV0dXJuIHtsZWZ0OiBzYy5jb2x1bW4sIHRvcDogc2Mucm93fTtcbiAgICB9aWYgKG1vZGUgPT0gJ2xvY2FsJykge1xuICAgICAgdmFyIHJlbmRlcmVyID0gdGhpcy5hY2UucmVuZGVyZXI7XG4gICAgICB2YXIgc2MgPSB0aGlzLmFjZS5zZXNzaW9uLmRvY3VtZW50VG9TY3JlZW5Qb3NpdGlvbihwb3MubGluZSwgcG9zLmNoKTtcbiAgICAgIHZhciBsaCA9IHJlbmRlcmVyLmxheWVyQ29uZmlnLmxpbmVIZWlnaHQ7XG4gICAgICB2YXIgY3cgPSByZW5kZXJlci5sYXllckNvbmZpZy5jaGFyYWN0ZXJXaWR0aDtcbiAgICAgIHZhciB0b3AgPSBsaCAqIHNjLnJvdztcbiAgICAgIHJldHVybiB7bGVmdDogc2MuY29sdW1uICogY3csIHRvcDogdG9wLCBib3R0b206IHRvcCArIGxofTtcbiAgICB9XG4gIH07XG4gIHRoaXMuY29vcmRzQ2hhciA9IGZ1bmN0aW9uKHBvcywgbW9kZSkge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXMuYWNlLnJlbmRlcmVyO1xuICAgIGlmIChtb2RlID09ICdsb2NhbCcpIHtcbiAgICAgIHZhciByb3cgPSBNYXRoLm1heCgwLCBNYXRoLmZsb29yKHBvcy50b3AgLyByZW5kZXJlci5saW5lSGVpZ2h0KSk7XG4gICAgICB2YXIgY29sID0gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihwb3MubGVmdCAvIHJlbmRlcmVyLmNoYXJhY3RlcldpZHRoKSk7XG4gICAgICB2YXIgY2ggPSByZW5kZXJlci5zZXNzaW9uLnNjcmVlblRvRG9jdW1lbnRQb3NpdGlvbihyb3csIGNvbCk7XG4gICAgICByZXR1cm4gdG9DbVBvcyhjaCk7XG4gICAgfSBlbHNlIGlmIChtb2RlID09ICdkaXYnKSB7XG4gICAgICB0aHJvdyBcIm5vdCBpbXBsZW1lbnRlZFwiO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5nZXRTZWFyY2hDdXJzb3IgPSBmdW5jdGlvbihxdWVyeSwgcG9zLCBjYXNlRm9sZCkge1xuICAgIHZhciBjYXNlU2Vuc2l0aXZlID0gZmFsc2U7XG4gICAgdmFyIGlzUmVnZXhwID0gZmFsc2U7XG4gICAgaWYgKHF1ZXJ5IGluc3RhbmNlb2YgUmVnRXhwICYmICFxdWVyeS5nbG9iYWwpIHtcbiAgICAgIGNhc2VTZW5zaXRpdmUgPSAhcXVlcnkuaWdub3JlQ2FzZTtcbiAgICAgIHF1ZXJ5ID0gcXVlcnkuc291cmNlO1xuICAgICAgaXNSZWdleHAgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAocXVlcnkgPT0gXCJcXFxcblwiKSB7IHF1ZXJ5ID0gXCJcXG5cIjsgaXNSZWdleHAgPSBmYWxzZTsgfVxuICAgIHZhciBzZWFyY2ggPSBuZXcgU2VhcmNoKCk7XG4gICAgaWYgKHBvcy5jaCA9PSB1bmRlZmluZWQpIHBvcy5jaCA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgdmFyIGFjZVBvcyA9IHtyb3c6IHBvcy5saW5lLCBjb2x1bW46IHBvcy5jaH07XG4gICAgdmFyIGNtID0gdGhpcztcbiAgICB2YXIgbGFzdCA9IG51bGw7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZpbmROZXh0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRoaXMuZmluZChmYWxzZSkgfSxcbiAgICAgIGZpbmRQcmV2aW91czogZnVuY3Rpb24oKSB7cmV0dXJuIHRoaXMuZmluZCh0cnVlKSB9LFxuICAgICAgZmluZDogZnVuY3Rpb24oYmFjaykge1xuICAgICAgICBzZWFyY2guc2V0T3B0aW9ucyh7XG4gICAgICAgICAgbmVlZGxlOiBxdWVyeSxcbiAgICAgICAgICBjYXNlU2Vuc2l0aXZlOiBjYXNlU2Vuc2l0aXZlLFxuICAgICAgICAgIHdyYXA6IGZhbHNlLFxuICAgICAgICAgIGJhY2t3YXJkczogYmFjayxcbiAgICAgICAgICByZWdFeHA6IGlzUmVnZXhwLFxuICAgICAgICAgIHN0YXJ0OiBsYXN0IHx8IGFjZVBvc1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIHJhbmdlID0gc2VhcmNoLmZpbmQoY20uYWNlLnNlc3Npb24pO1xuICAgICAgICBsYXN0ID0gcmFuZ2U7XG4gICAgICAgIHJldHVybiBsYXN0ICYmIFshbGFzdC5pc0VtcHR5KCldO1xuICAgICAgfSxcbiAgICAgIGZyb206IGZ1bmN0aW9uKCkgeyByZXR1cm4gbGFzdCAmJiB0b0NtUG9zKGxhc3Quc3RhcnQpIH0sXG4gICAgICB0bzogZnVuY3Rpb24oKSB7IHJldHVybiBsYXN0ICYmIHRvQ21Qb3MobGFzdC5lbmQpIH0sXG4gICAgICByZXBsYWNlOiBmdW5jdGlvbih0ZXh0KSB7XG4gICAgICAgIGlmIChsYXN0KSB7XG4gICAgICAgICAgbGFzdC5lbmQgPSBjbS5hY2Uuc2Vzc2lvbi5kb2MucmVwbGFjZShsYXN0LCB0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH07XG4gIHRoaXMuc2Nyb2xsVG8gPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgdmFyIHJlbmRlcmVyID0gdGhpcy5hY2UucmVuZGVyZXI7XG4gICAgdmFyIGNvbmZpZyA9IHJlbmRlcmVyLmxheWVyQ29uZmlnO1xuICAgIHZhciBtYXhIZWlnaHQgPSBjb25maWcubWF4SGVpZ2h0O1xuICAgIG1heEhlaWdodCAtPSAocmVuZGVyZXIuJHNpemUuc2Nyb2xsZXJIZWlnaHQgLSByZW5kZXJlci5saW5lSGVpZ2h0KSAqIHJlbmRlcmVyLiRzY3JvbGxQYXN0RW5kO1xuICAgIGlmICh5ICE9IG51bGwpIHRoaXMuYWNlLnNlc3Npb24uc2V0U2Nyb2xsVG9wKE1hdGgubWF4KDAsIE1hdGgubWluKHksIG1heEhlaWdodCkpKTtcbiAgICBpZiAoeCAhPSBudWxsKSB0aGlzLmFjZS5zZXNzaW9uLnNldFNjcm9sbExlZnQoTWF0aC5tYXgoMCwgTWF0aC5taW4oeCwgY29uZmlnLndpZHRoKSkpO1xuICB9O1xuICB0aGlzLnNjcm9sbEluZm8gPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4gIHRoaXMuc2Nyb2xsSW50b1ZpZXcgPSBmdW5jdGlvbihwb3MsIG1hcmdpbikge1xuICAgIGlmIChwb3MpIHtcbiAgICAgIHZhciByZW5kZXJlciA9IHRoaXMuYWNlLnJlbmRlcmVyO1xuICAgICAgdmFyIHZpZXdNYXJnaW4gPSB7IFwidG9wXCI6IDAsIFwiYm90dG9tXCI6IG1hcmdpbiB9O1xuICAgICAgcmVuZGVyZXIuc2Nyb2xsQ3Vyc29ySW50b1ZpZXcodG9BY2VQb3MocG9zKSxcbiAgICAgICAgKHJlbmRlcmVyLmxpbmVIZWlnaHQgKiAyKSAvIHJlbmRlcmVyLiRzaXplLnNjcm9sbGVySGVpZ2h0LCB2aWV3TWFyZ2luKTtcbiAgICB9XG4gIH07XG4gIHRoaXMuZ2V0TGluZSA9IGZ1bmN0aW9uKHJvdykgeyByZXR1cm4gdGhpcy5hY2Uuc2Vzc2lvbi5nZXRMaW5lKHJvdykgfTtcbiAgdGhpcy5nZXRSYW5nZSA9IGZ1bmN0aW9uKHMsIGUpIHtcbiAgICByZXR1cm4gdGhpcy5hY2Uuc2Vzc2lvbi5nZXRUZXh0UmFuZ2UobmV3IFJhbmdlKHMubGluZSwgcy5jaCwgZS5saW5lLCBlLmNoKSk7XG4gIH07XG4gIHRoaXMucmVwbGFjZVJhbmdlID0gZnVuY3Rpb24odGV4dCwgcywgZSkge1xuICAgIGlmICghZSkgZSA9IHM7XG4gICAgLy8gd29ya2Fyb3VuZCBmb3Igc2Vzc2lvbi5yZXBsYWNlIG5vdCBoYW5kbGluZyBuZWdhdGl2ZSByb3dzXG4gICAgdmFyIHJhbmdlID0gbmV3IFJhbmdlKHMubGluZSwgcy5jaCwgZS5saW5lLCBlLmNoKTtcbiAgICB0aGlzLmFjZS5zZXNzaW9uLiRjbGlwUmFuZ2VUb0RvY3VtZW50KHJhbmdlKTtcbiAgICByZXR1cm4gdGhpcy5hY2Uuc2Vzc2lvbi5yZXBsYWNlKHJhbmdlLCB0ZXh0KTtcbiAgfTtcbiAgdGhpcy5yZXBsYWNlU2VsZWN0aW9uID1cbiAgdGhpcy5yZXBsYWNlU2VsZWN0aW9ucyA9IGZ1bmN0aW9uKHApIHtcbiAgICB2YXIgc2VsID0gdGhpcy5hY2Uuc2VsZWN0aW9uO1xuICAgIGlmICh0aGlzLmFjZS5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlKSB7XG4gICAgICB0aGlzLmFjZS5zZXNzaW9uLnJlcGxhY2Uoc2VsLmdldFJhbmdlKCksIHBbMF0gfHwgXCJcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNlbC5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlID0gdHJ1ZTtcbiAgICB2YXIgcmFuZ2VzID0gc2VsLnJhbmdlTGlzdC5yYW5nZXM7XG4gICAgaWYgKCFyYW5nZXMubGVuZ3RoKSByYW5nZXMgPSBbdGhpcy5hY2UubXVsdGlTZWxlY3QuZ2V0UmFuZ2UoKV07XG4gICAgZm9yICh2YXIgaSA9IHJhbmdlcy5sZW5ndGg7IGktLTspXG4gICAgICAgdGhpcy5hY2Uuc2Vzc2lvbi5yZXBsYWNlKHJhbmdlc1tpXSwgcFtpXSB8fCBcIlwiKTtcbiAgICBzZWwuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSA9IGZhbHNlO1xuICB9O1xuICB0aGlzLmdldFNlbGVjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmFjZS5nZXRTZWxlY3RlZFRleHQoKTtcbiAgfTtcbiAgdGhpcy5nZXRTZWxlY3Rpb25zID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubGlzdFNlbGVjdGlvbnMoKS5tYXAoZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHRoaXMuZ2V0UmFuZ2UoeC5hbmNob3IsIHguaGVhZCk7XG4gICAgfSwgdGhpcyk7XG4gIH07XG4gIHRoaXMuZ2V0SW5wdXRGaWVsZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmFjZS50ZXh0SW5wdXQuZ2V0RWxlbWVudCgpO1xuICB9O1xuICB0aGlzLmdldFdyYXBwZXJFbGVtZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLmNvbnRhaW5lcjtcbiAgfTtcbiAgdmFyIG9wdE1hcCA9IHtcbiAgICBpbmRlbnRXaXRoVGFiczogXCJ1c2VTb2Z0VGFic1wiLFxuICAgIGluZGVudFVuaXQ6IFwidGFiU2l6ZVwiLFxuICAgIHRhYlNpemU6IFwidGFiU2l6ZVwiLFxuICAgIGZpcnN0TGluZU51bWJlcjogXCJmaXJzdExpbmVOdW1iZXJcIixcbiAgICByZWFkT25seTogXCJyZWFkT25seVwiXG4gIH07XG4gIHRoaXMuc2V0T3B0aW9uID0gZnVuY3Rpb24obmFtZSwgdmFsKSB7XG4gICAgdGhpcy5zdGF0ZVtuYW1lXSA9IHZhbDtcbiAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgIGNhc2UgJ2luZGVudFdpdGhUYWJzJzpcbiAgICAgICAgbmFtZSA9IG9wdE1hcFtuYW1lXTtcbiAgICAgICAgdmFsID0gIXZhbDtcbiAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAna2V5TWFwJzpcbiAgICAgICAgdGhpcy5zdGF0ZS4ka2V5TWFwID0gdmFsO1xuICAgICAgICByZXR1cm47XG4gICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIG5hbWUgPSBvcHRNYXBbbmFtZV07XG4gICAgfVxuICAgIGlmIChuYW1lKVxuICAgICAgdGhpcy5hY2Uuc2V0T3B0aW9uKG5hbWUsIHZhbCk7XG4gIH07XG4gIHRoaXMuZ2V0T3B0aW9uID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciB2YWw7XG4gICAgdmFyIGFjZU9wdCA9IG9wdE1hcFtuYW1lXTtcbiAgICBpZiAoYWNlT3B0KVxuICAgICAgdmFsID0gdGhpcy5hY2UuZ2V0T3B0aW9uKGFjZU9wdCk7XG4gICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICBjYXNlICdpbmRlbnRXaXRoVGFicyc6XG4gICAgICAgIG5hbWUgPSBvcHRNYXBbbmFtZV07XG4gICAgICAgIHJldHVybiAhdmFsO1xuICAgICAgY2FzZSAna2V5TWFwJzpcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuJGtleU1hcCB8fCAndmltJztcbiAgICB9XG4gICAgcmV0dXJuIGFjZU9wdCA/IHZhbCA6IHRoaXMuc3RhdGVbbmFtZV07XG4gIH07XG4gIHRoaXMudG9nZ2xlT3ZlcndyaXRlID0gZnVuY3Rpb24ob24pIHtcbiAgICB0aGlzLnN0YXRlLm92ZXJ3cml0ZSA9IG9uO1xuICAgIHJldHVybiB0aGlzLmFjZS5zZXRPdmVyd3JpdGUob24pO1xuICB9O1xuICB0aGlzLmFkZE92ZXJsYXkgPSBmdW5jdGlvbihvKSB7XG4gICAgaWYgKCF0aGlzLiRzZWFyY2hIaWdobGlnaHQgfHwgIXRoaXMuJHNlYXJjaEhpZ2hsaWdodC5zZXNzaW9uKSB7XG4gICAgICB2YXIgaGlnaGxpZ2h0ID0gbmV3IFNlYXJjaEhpZ2hsaWdodChudWxsLCBcImFjZV9oaWdobGlnaHQtbWFya2VyXCIsIFwidGV4dFwiKTtcbiAgICAgIHZhciBtYXJrZXIgPSB0aGlzLmFjZS5zZXNzaW9uLmFkZER5bmFtaWNNYXJrZXIoaGlnaGxpZ2h0KTtcbiAgICAgIGhpZ2hsaWdodC5pZCA9IG1hcmtlci5pZDtcbiAgICAgIGhpZ2hsaWdodC5zZXNzaW9uID0gdGhpcy5hY2Uuc2Vzc2lvbjtcbiAgICAgIGhpZ2hsaWdodC5kZXN0cm95ID0gZnVuY3Rpb24obykge1xuICAgICAgICBoaWdobGlnaHQuc2Vzc2lvbi5vZmYoXCJjaGFuZ2VcIiwgaGlnaGxpZ2h0LnVwZGF0ZU9uQ2hhbmdlKTtcbiAgICAgICAgaGlnaGxpZ2h0LnNlc3Npb24ub2ZmKFwiY2hhbmdlRWRpdG9yXCIsIGhpZ2hsaWdodC5kZXN0cm95KTtcbiAgICAgICAgaGlnaGxpZ2h0LnNlc3Npb24ucmVtb3ZlTWFya2VyKGhpZ2hsaWdodC5pZCk7XG4gICAgICAgIGhpZ2hsaWdodC5zZXNzaW9uID0gbnVsbDtcbiAgICAgIH07XG4gICAgICBoaWdobGlnaHQudXBkYXRlT25DaGFuZ2UgPSBmdW5jdGlvbihkZWx0YSkge1xuICAgICAgICB2YXIgcm93ID0gZGVsdGEuc3RhcnQucm93O1xuICAgICAgICBpZiAocm93ID09IGRlbHRhLmVuZC5yb3cpIGhpZ2hsaWdodC5jYWNoZVtyb3ddID0gdW5kZWZpbmVkO1xuICAgICAgICBlbHNlIGhpZ2hsaWdodC5jYWNoZS5zcGxpY2Uocm93LCBoaWdobGlnaHQuY2FjaGUubGVuZ3RoKTtcbiAgICAgIH07XG4gICAgICBoaWdobGlnaHQuc2Vzc2lvbi5vbihcImNoYW5nZUVkaXRvclwiLCBoaWdobGlnaHQuZGVzdHJveSk7XG4gICAgICBoaWdobGlnaHQuc2Vzc2lvbi5vbihcImNoYW5nZVwiLCBoaWdobGlnaHQudXBkYXRlT25DaGFuZ2UpO1xuICAgIH1cbiAgICB2YXIgcmUgPSBuZXcgUmVnRXhwKG8ucXVlcnkuc291cmNlLCBcImdtaVwiKTtcbiAgICB0aGlzLiRzZWFyY2hIaWdobGlnaHQgPSBvLmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcbiAgICB0aGlzLiRzZWFyY2hIaWdobGlnaHQuc2V0UmVnZXhwKHJlKTtcbiAgICB0aGlzLmFjZS5yZW5kZXJlci51cGRhdGVCYWNrTWFya2VycygpO1xuICB9O1xuICB0aGlzLnJlbW92ZU92ZXJsYXkgPSBmdW5jdGlvbihvKSB7XG4gICAgaWYgKHRoaXMuJHNlYXJjaEhpZ2hsaWdodCAmJiB0aGlzLiRzZWFyY2hIaWdobGlnaHQuc2Vzc2lvbikge1xuICAgICAgdGhpcy4kc2VhcmNoSGlnaGxpZ2h0LmRlc3Ryb3koKTtcbiAgICB9XG4gIH07XG4gIHRoaXMuZ2V0U2Nyb2xsSW5mbyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXMuYWNlLnJlbmRlcmVyO1xuICAgIHZhciBjb25maWcgPSByZW5kZXJlci5sYXllckNvbmZpZztcbiAgICByZXR1cm4ge1xuICAgICAgbGVmdDogcmVuZGVyZXIuc2Nyb2xsTGVmdCxcbiAgICAgIHRvcDogcmVuZGVyZXIuc2Nyb2xsVG9wLFxuICAgICAgaGVpZ2h0OiBjb25maWcubWF4SGVpZ2h0LFxuICAgICAgd2lkdGg6IGNvbmZpZy53aWR0aCxcbiAgICAgIGNsaWVudEhlaWdodDogY29uZmlnLmhlaWdodCxcbiAgICAgIGNsaWVudFdpZHRoOiBjb25maWcud2lkdGhcbiAgICB9O1xuICB9O1xuICB0aGlzLmdldFZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLmdldFZhbHVlKCk7XG4gIH07XG4gIHRoaXMuc2V0VmFsdWUgPSBmdW5jdGlvbih2KSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLnNldFZhbHVlKHYsIC0xKTtcbiAgfTtcbiAgdGhpcy5nZXRUb2tlblR5cGVBdCA9IGZ1bmN0aW9uKHBvcykge1xuICAgIHZhciB0b2tlbiA9IHRoaXMuYWNlLnNlc3Npb24uZ2V0VG9rZW5BdChwb3MubGluZSwgcG9zLmNoKTtcbiAgICByZXR1cm4gdG9rZW4gJiYgL2NvbW1lbnR8c3RyaW5nLy50ZXN0KHRva2VuLnR5cGUpID8gXCJzdHJpbmdcIiA6IFwiXCI7XG4gIH07XG4gIHRoaXMuZmluZE1hdGNoaW5nQnJhY2tldCA9IGZ1bmN0aW9uKHBvcykge1xuICAgIHZhciBtID0gdGhpcy5hY2Uuc2Vzc2lvbi5maW5kTWF0Y2hpbmdCcmFja2V0KHRvQWNlUG9zKHBvcykpO1xuICAgIHJldHVybiB7dG86IG0gJiYgdG9DbVBvcyhtKX07XG4gIH07XG4gIHRoaXMuZmluZE1hdGNoaW5nVGFnID0gZnVuY3Rpb24gKHBvcykge1xuICAgIHZhciBtID0gdGhpcy5hY2Uuc2Vzc2lvbi5nZXRNYXRjaGluZ1RhZ3ModG9BY2VQb3MocG9zKSk7XG4gICAgaWYgKCFtKSByZXR1cm47XG4gICAgcmV0dXJuIHtcbiAgICAgIG9wZW46IHtcbiAgICAgICAgZnJvbTogdG9DbVBvcyhtLm9wZW5UYWcuc3RhcnQpLFxuICAgICAgICB0bzogdG9DbVBvcyhtLm9wZW5UYWcuZW5kKVxuICAgICAgfSxcbiAgICAgIGNsb3NlOiB7XG4gICAgICAgIGZyb206IHRvQ21Qb3MobS5jbG9zZVRhZy5zdGFydCksXG4gICAgICAgIHRvOiB0b0NtUG9zKG0uY2xvc2VUYWcuZW5kKVxuICAgICAgfVxuICAgIH07XG4gIH07XG4gIHRoaXMuaW5kZW50TGluZSA9IGZ1bmN0aW9uKGxpbmUsIG1ldGhvZCkge1xuICAgIGlmIChtZXRob2QgPT09IHRydWUpXG4gICAgICAgIHRoaXMuYWNlLnNlc3Npb24uaW5kZW50Um93cyhsaW5lLCBsaW5lLCBcIlxcdFwiKTtcbiAgICBlbHNlIGlmIChtZXRob2QgPT09IGZhbHNlKVxuICAgICAgICB0aGlzLmFjZS5zZXNzaW9uLm91dGRlbnRSb3dzKG5ldyBSYW5nZShsaW5lLCAwLCBsaW5lLCAwKSk7XG4gIH07XG4gIHRoaXMuaW5kZXhGcm9tUG9zID0gZnVuY3Rpb24ocG9zKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLnNlc3Npb24uZG9jLnBvc2l0aW9uVG9JbmRleCh0b0FjZVBvcyhwb3MpKTtcbiAgfTtcbiAgdGhpcy5wb3NGcm9tSW5kZXggPSBmdW5jdGlvbihpbmRleCkge1xuICAgIHJldHVybiB0b0NtUG9zKHRoaXMuYWNlLnNlc3Npb24uZG9jLmluZGV4VG9Qb3NpdGlvbihpbmRleCkpO1xuICB9O1xuICB0aGlzLmZvY3VzID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5hY2UudGV4dElucHV0LmZvY3VzKCk7XG4gIH07XG4gIHRoaXMuYmx1ciA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLmJsdXIoKTtcbiAgfTtcbiAgdGhpcy5kZWZhdWx0VGV4dEhlaWdodCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLnJlbmRlcmVyLmxheWVyQ29uZmlnLmxpbmVIZWlnaHQ7XG4gIH07XG4gIHRoaXMuc2NhbkZvckJyYWNrZXQgPSBmdW5jdGlvbihwb3MsIGRpciwgXywgb3B0aW9ucykge1xuICAgIHZhciByZSA9IG9wdGlvbnMuYnJhY2tldFJlZ2V4LnNvdXJjZTtcbiAgICB2YXIgdG9rZW5SZSA9IC9wYXJlbnx0ZXh0fG9wZXJhdG9yfHRhZy87XG4gICAgaWYgKGRpciA9PSAxKSB7XG4gICAgICB2YXIgbSA9IHRoaXMuYWNlLnNlc3Npb24uJGZpbmRDbG9zaW5nQnJhY2tldChyZS5zbGljZSgxLCAyKSwgdG9BY2VQb3MocG9zKSwgdG9rZW5SZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBtID0gdGhpcy5hY2Uuc2Vzc2lvbi4kZmluZE9wZW5pbmdCcmFja2V0KHJlLnNsaWNlKC0yLCAtMSksIHtyb3c6IHBvcy5saW5lLCBjb2x1bW46IHBvcy5jaCArIDF9LCB0b2tlblJlKTtcbiAgICB9XG4gICAgcmV0dXJuIG0gJiYge3BvczogdG9DbVBvcyhtKX07XG4gIH07XG4gIHRoaXMucmVmcmVzaCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmFjZS5yZXNpemUodHJ1ZSk7XG4gIH07XG4gIHRoaXMuZ2V0TW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB7IG5hbWUgOiB0aGlzLmdldE9wdGlvbihcIm1vZGVcIikgfTtcbiAgfTtcbiAgdGhpcy5leGVjQ29tbWFuZCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICBpZiAoQ29kZU1pcnJvci5jb21tYW5kcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkgcmV0dXJuIENvZGVNaXJyb3IuY29tbWFuZHNbbmFtZV0odGhpcyk7XG4gICAgaWYgKG5hbWUgPT0gXCJpbmRlbnRBdXRvXCIpIHJldHVybiB0aGlzLmFjZS5leGVjQ29tbWFuZChcImF1dG9pbmRlbnRcIik7XG4gICAgY29uc29sZS5sb2cobmFtZSArIFwiIGlzIG5vdCBpbXBsZW1lbnRlZFwiKTtcbiAgfTtcbiAgdGhpcy5nZXRMaW5lTnVtYmVyID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgcmV0dXJuIGhhbmRsZS5yb3c7XG4gIH1cbiAgdGhpcy5nZXRMaW5lSGFuZGxlID0gZnVuY3Rpb24ocm93KSB7XG4gICAgcmV0dXJuIHt0ZXh0OiB0aGlzLmFjZS5zZXNzaW9uLmdldExpbmUocm93KSwgcm93OiByb3d9O1xuICB9XG59KS5jYWxsKENvZGVNaXJyb3IucHJvdG90eXBlKTtcbiAgZnVuY3Rpb24gdG9BY2VQb3MoY21Qb3MpIHtcbiAgICByZXR1cm4ge3JvdzogY21Qb3MubGluZSwgY29sdW1uOiBjbVBvcy5jaH07XG4gIH1cbiAgZnVuY3Rpb24gdG9DbVBvcyhhY2VQb3MpIHtcbiAgICByZXR1cm4gbmV3IFBvcyhhY2VQb3Mucm93LCBhY2VQb3MuY29sdW1uKTtcbiAgfVxuXG4gIHZhciBTdHJpbmdTdHJlYW0gPSBDb2RlTWlycm9yLlN0cmluZ1N0cmVhbSA9IGZ1bmN0aW9uKHN0cmluZywgdGFiU2l6ZSkge1xuICAgIHRoaXMucG9zID0gdGhpcy5zdGFydCA9IDA7XG4gICAgdGhpcy5zdHJpbmcgPSBzdHJpbmc7XG4gICAgdGhpcy50YWJTaXplID0gdGFiU2l6ZSB8fCA4O1xuICAgIHRoaXMubGFzdENvbHVtblBvcyA9IHRoaXMubGFzdENvbHVtblZhbHVlID0gMDtcbiAgICB0aGlzLmxpbmVTdGFydCA9IDA7XG4gIH07XG5cbiAgU3RyaW5nU3RyZWFtLnByb3RvdHlwZSA9IHtcbiAgICBlb2w6IGZ1bmN0aW9uKCkge3JldHVybiB0aGlzLnBvcyA+PSB0aGlzLnN0cmluZy5sZW5ndGg7fSxcbiAgICBzb2w6IGZ1bmN0aW9uKCkge3JldHVybiB0aGlzLnBvcyA9PSB0aGlzLmxpbmVTdGFydDt9LFxuICAgIHBlZWs6IGZ1bmN0aW9uKCkge3JldHVybiB0aGlzLnN0cmluZy5jaGFyQXQodGhpcy5wb3MpIHx8IHVuZGVmaW5lZDt9LFxuICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHRoaXMucG9zIDwgdGhpcy5zdHJpbmcubGVuZ3RoKVxuICAgICAgICByZXR1cm4gdGhpcy5zdHJpbmcuY2hhckF0KHRoaXMucG9zKyspO1xuICAgIH0sXG4gICAgZWF0OiBmdW5jdGlvbihtYXRjaCkge1xuICAgICAgdmFyIGNoID0gdGhpcy5zdHJpbmcuY2hhckF0KHRoaXMucG9zKTtcbiAgICAgIGlmICh0eXBlb2YgbWF0Y2ggPT0gXCJzdHJpbmdcIikgdmFyIG9rID0gY2ggPT0gbWF0Y2g7XG4gICAgICBlbHNlIHZhciBvayA9IGNoICYmIChtYXRjaC50ZXN0ID8gbWF0Y2gudGVzdChjaCkgOiBtYXRjaChjaCkpO1xuICAgICAgaWYgKG9rKSB7Kyt0aGlzLnBvczsgcmV0dXJuIGNoO31cbiAgICB9LFxuICAgIGVhdFdoaWxlOiBmdW5jdGlvbihtYXRjaCkge1xuICAgICAgdmFyIHN0YXJ0ID0gdGhpcy5wb3M7XG4gICAgICB3aGlsZSAodGhpcy5lYXQobWF0Y2gpKXt9XG4gICAgICByZXR1cm4gdGhpcy5wb3MgPiBzdGFydDtcbiAgICB9LFxuICAgIGVhdFNwYWNlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzdGFydCA9IHRoaXMucG9zO1xuICAgICAgd2hpbGUgKC9bXFxzXFx1MDBhMF0vLnRlc3QodGhpcy5zdHJpbmcuY2hhckF0KHRoaXMucG9zKSkpICsrdGhpcy5wb3M7XG4gICAgICByZXR1cm4gdGhpcy5wb3MgPiBzdGFydDtcbiAgICB9LFxuICAgIHNraXBUb0VuZDogZnVuY3Rpb24oKSB7dGhpcy5wb3MgPSB0aGlzLnN0cmluZy5sZW5ndGg7fSxcbiAgICBza2lwVG86IGZ1bmN0aW9uKGNoKSB7XG4gICAgICB2YXIgZm91bmQgPSB0aGlzLnN0cmluZy5pbmRleE9mKGNoLCB0aGlzLnBvcyk7XG4gICAgICBpZiAoZm91bmQgPiAtMSkge3RoaXMucG9zID0gZm91bmQ7IHJldHVybiB0cnVlO31cbiAgICB9LFxuICAgIGJhY2tVcDogZnVuY3Rpb24obikge3RoaXMucG9zIC09IG47fSxcbiAgICBjb2x1bW46IGZ1bmN0aW9uKCkge1xuICAgICAgdGhyb3cgXCJub3QgaW1wbGVtZW50ZWRcIjtcbiAgICB9LFxuICAgIGluZGVudGF0aW9uOiBmdW5jdGlvbigpIHtcbiAgICAgIHRocm93IFwibm90IGltcGxlbWVudGVkXCI7XG4gICAgfSxcbiAgICBtYXRjaDogZnVuY3Rpb24ocGF0dGVybiwgY29uc3VtZSwgY2FzZUluc2Vuc2l0aXZlKSB7XG4gICAgICBpZiAodHlwZW9mIHBhdHRlcm4gPT0gXCJzdHJpbmdcIikge1xuICAgICAgICB2YXIgY2FzZWQgPSBmdW5jdGlvbihzdHIpIHtyZXR1cm4gY2FzZUluc2Vuc2l0aXZlID8gc3RyLnRvTG93ZXJDYXNlKCkgOiBzdHI7fTtcbiAgICAgICAgdmFyIHN1YnN0ciA9IHRoaXMuc3RyaW5nLnN1YnN0cih0aGlzLnBvcywgcGF0dGVybi5sZW5ndGgpO1xuICAgICAgICBpZiAoY2FzZWQoc3Vic3RyKSA9PSBjYXNlZChwYXR0ZXJuKSkge1xuICAgICAgICAgIGlmIChjb25zdW1lICE9PSBmYWxzZSkgdGhpcy5wb3MgKz0gcGF0dGVybi5sZW5ndGg7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBtYXRjaCA9IHRoaXMuc3RyaW5nLnNsaWNlKHRoaXMucG9zKS5tYXRjaChwYXR0ZXJuKTtcbiAgICAgICAgaWYgKG1hdGNoICYmIG1hdGNoLmluZGV4ID4gMCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGlmIChtYXRjaCAmJiBjb25zdW1lICE9PSBmYWxzZSkgdGhpcy5wb3MgKz0gbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICB9XG4gICAgfSxcbiAgICBjdXJyZW50OiBmdW5jdGlvbigpe3JldHVybiB0aGlzLnN0cmluZy5zbGljZSh0aGlzLnN0YXJ0LCB0aGlzLnBvcyk7fSxcbiAgICBoaWRlRmlyc3RDaGFyczogZnVuY3Rpb24obiwgaW5uZXIpIHtcbiAgICAgIHRoaXMubGluZVN0YXJ0ICs9IG47XG4gICAgICB0cnkgeyByZXR1cm4gaW5uZXIoKTsgfVxuICAgICAgZmluYWxseSB7IHRoaXMubGluZVN0YXJ0IC09IG47IH1cbiAgICB9XG4gIH07XG5cbi8vIHRvZG8gcmVwbGFjZSB3aXRoIHNob3dDb21tYW5kTGluZVxuQ29kZU1pcnJvci5kZWZpbmVFeHRlbnNpb24gPSBmdW5jdGlvbihuYW1lLCBmbikge1xuICBDb2RlTWlycm9yLnByb3RvdHlwZVtuYW1lXSA9IGZuO1xufTtcbmRvbUxpYi5pbXBvcnRDc3NTdHJpbmcoYC5ub3JtYWwtbW9kZSAuYWNlX2N1cnNvcntcbiAgICBib3JkZXI6IG5vbmU7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsMCwwLDAuNSk7XG59XG4ubm9ybWFsLW1vZGUgLmFjZV9oaWRkZW4tY3Vyc29ycyAuYWNlX2N1cnNvcntcbiAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcbiAgb3BhY2l0eTogMC43XG59XG4uYWNlX2RpYWxvZyB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDsgcmlnaHQ6IDA7XG4gIGJhY2tncm91bmQ6IGluaGVyaXQ7XG4gIHotaW5kZXg6IDE1O1xuICBwYWRkaW5nOiAuMWVtIC44ZW07XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGNvbG9yOiBpbmhlcml0O1xufVxuLmFjZV9kaWFsb2ctdG9wIHtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICM0NDQ7XG4gIHRvcDogMDtcbn1cbi5hY2VfZGlhbG9nLWJvdHRvbSB7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDQ0O1xuICBib3R0b206IDA7XG59XG4uYWNlX2RpYWxvZyBpbnB1dCB7XG4gIGJvcmRlcjogbm9uZTtcbiAgb3V0bGluZTogbm9uZTtcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG4gIHdpZHRoOiAyMGVtO1xuICBjb2xvcjogaW5oZXJpdDtcbiAgZm9udC1mYW1pbHk6IG1vbm9zcGFjZTtcbn1gLCBcInZpbU1vZGVcIiwgZmFsc2UpO1xuKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBkaWFsb2dEaXYoY20sIHRlbXBsYXRlLCBib3R0b20pIHtcbiAgICB2YXIgd3JhcCA9IGNtLmFjZS5jb250YWluZXI7XG4gICAgdmFyIGRpYWxvZztcbiAgICBkaWFsb2cgPSB3cmFwLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpO1xuICAgIGlmIChib3R0b20pXG4gICAgICBkaWFsb2cuY2xhc3NOYW1lID0gXCJhY2VfZGlhbG9nIGFjZV9kaWFsb2ctYm90dG9tXCI7XG4gICAgZWxzZVxuICAgICAgZGlhbG9nLmNsYXNzTmFtZSA9IFwiYWNlX2RpYWxvZyBhY2VfZGlhbG9nLXRvcFwiO1xuXG4gICAgaWYgKHR5cGVvZiB0ZW1wbGF0ZSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICBkaWFsb2cuaW5uZXJIVE1MID0gdGVtcGxhdGU7XG4gICAgfSBlbHNlIHsgLy8gQXNzdW1pbmcgaXQncyBhIGRldGFjaGVkIERPTSBlbGVtZW50LlxuICAgICAgZGlhbG9nLmFwcGVuZENoaWxkKHRlbXBsYXRlKTtcbiAgICB9XG4gICAgcmV0dXJuIGRpYWxvZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNsb3NlTm90aWZpY2F0aW9uKGNtLCBuZXdWYWwpIHtcbiAgICBpZiAoY20uc3RhdGUuY3VycmVudE5vdGlmaWNhdGlvbkNsb3NlKVxuICAgICAgY20uc3RhdGUuY3VycmVudE5vdGlmaWNhdGlvbkNsb3NlKCk7XG4gICAgY20uc3RhdGUuY3VycmVudE5vdGlmaWNhdGlvbkNsb3NlID0gbmV3VmFsO1xuICB9XG5cbiAgQ29kZU1pcnJvci5kZWZpbmVFeHRlbnNpb24oXCJvcGVuRGlhbG9nXCIsIGZ1bmN0aW9uKHRlbXBsYXRlLCBjYWxsYmFjaywgb3B0aW9ucykge1xuICAgIGlmICh0aGlzLnZpcnR1YWxTZWxlY3Rpb25Nb2RlKCkpIHJldHVybjtcbiAgICBpZiAoIW9wdGlvbnMpIG9wdGlvbnMgPSB7fTtcblxuICAgIGNsb3NlTm90aWZpY2F0aW9uKHRoaXMsIG51bGwpO1xuXG4gICAgdmFyIGRpYWxvZyA9IGRpYWxvZ0Rpdih0aGlzLCB0ZW1wbGF0ZSwgb3B0aW9ucy5ib3R0b20pO1xuICAgIHZhciBjbG9zZWQgPSBmYWxzZSwgbWUgPSB0aGlzO1xuICAgIHRoaXMuc3RhdGUuZGlhbG9nID0gZGlhbG9nO1xuICAgIGZ1bmN0aW9uIGNsb3NlKG5ld1ZhbCkge1xuICAgICAgaWYgKHR5cGVvZiBuZXdWYWwgPT0gJ3N0cmluZycpIHtcbiAgICAgICAgaW5wLnZhbHVlID0gbmV3VmFsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNsb3NlZCkgcmV0dXJuO1xuXG4gICAgICAgIGlmIChuZXdWYWwgJiYgbmV3VmFsLnR5cGUgPT0gXCJibHVyXCIpIHtcbiAgICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PT0gaW5wKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1lLnN0YXRlLmRpYWxvZyA9PSBkaWFsb2cpIHtcbiAgICAgICAgICBtZS5zdGF0ZS5kaWFsb2cgPSBudWxsO1xuICAgICAgICAgIG1lLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2xvc2VkID0gdHJ1ZTtcbiAgICAgICAgZGlhbG9nLnJlbW92ZSgpO1xuXG4gICAgICAgIGlmIChvcHRpb25zLm9uQ2xvc2UpIG9wdGlvbnMub25DbG9zZShkaWFsb2cpO1xuXG4gICAgICAgIC8vIGFjZV9wYXRjaHtcbiAgICAgICAgdmFyIGNtID0gbWU7XG4gICAgICAgIGlmIChjbS5zdGF0ZS52aW0pIHtcbiAgICAgICAgICBjbS5zdGF0ZS52aW0uc3RhdHVzID0gbnVsbDtcbiAgICAgICAgICBjbS5hY2UuX3NpZ25hbChcImNoYW5nZVN0YXR1c1wiKTtcbiAgICAgICAgICBjbS5hY2UucmVuZGVyZXIuJGxvb3Auc2NoZWR1bGUoY20uYWNlLnJlbmRlcmVyLkNIQU5HRV9DVVJTT1IpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFjZV9wYXRjaH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaW5wID0gZGlhbG9nLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW5wdXRcIilbMF0sIGJ1dHRvbjtcbiAgICBpZiAoaW5wKSB7XG4gICAgICBpZiAob3B0aW9ucy52YWx1ZSkge1xuICAgICAgICBpbnAudmFsdWUgPSBvcHRpb25zLnZhbHVlO1xuICAgICAgICBpZiAob3B0aW9ucy5zZWxlY3RWYWx1ZU9uT3BlbiAhPT0gZmFsc2UpIGlucC5zZWxlY3QoKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG9wdGlvbnMub25JbnB1dClcbiAgICAgICAgQ29kZU1pcnJvci5vbihpbnAsIFwiaW5wdXRcIiwgZnVuY3Rpb24oZSkgeyBvcHRpb25zLm9uSW5wdXQoZSwgaW5wLnZhbHVlLCBjbG9zZSk7fSk7XG4gICAgICBpZiAob3B0aW9ucy5vbktleVVwKVxuICAgICAgICBDb2RlTWlycm9yLm9uKGlucCwgXCJrZXl1cFwiLCBmdW5jdGlvbihlKSB7b3B0aW9ucy5vbktleVVwKGUsIGlucC52YWx1ZSwgY2xvc2UpO30pO1xuXG4gICAgICBDb2RlTWlycm9yLm9uKGlucCwgXCJrZXlkb3duXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5vbktleURvd24gJiYgb3B0aW9ucy5vbktleURvd24oZSwgaW5wLnZhbHVlLCBjbG9zZSkpIHsgcmV0dXJuOyB9XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT0gMTMpIGNhbGxiYWNrKGlucC52YWx1ZSk7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT0gMjcgfHwgKG9wdGlvbnMuY2xvc2VPbkVudGVyICE9PSBmYWxzZSAmJiBlLmtleUNvZGUgPT0gMTMpKSB7XG4gICAgICAgICAgQ29kZU1pcnJvci5lX3N0b3AoZSk7XG4gICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGlmIChvcHRpb25zLmNsb3NlT25CbHVyICE9PSBmYWxzZSkgQ29kZU1pcnJvci5vbihpbnAsIFwiYmx1clwiLCBjbG9zZSk7XG5cbiAgICAgIGlucC5mb2N1cygpO1xuICAgIH0gZWxzZSBpZiAoYnV0dG9uID0gZGlhbG9nLmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiYnV0dG9uXCIpWzBdKSB7XG4gICAgICBDb2RlTWlycm9yLm9uKGJ1dHRvbiwgXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgbWUuZm9jdXMoKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAob3B0aW9ucy5jbG9zZU9uQmx1ciAhPT0gZmFsc2UpIENvZGVNaXJyb3Iub24oYnV0dG9uLCBcImJsdXJcIiwgY2xvc2UpO1xuXG4gICAgICBidXR0b24uZm9jdXMoKTtcbiAgICB9XG4gICAgcmV0dXJuIGNsb3NlO1xuICB9KTtcblxuICBDb2RlTWlycm9yLmRlZmluZUV4dGVuc2lvbihcIm9wZW5Ob3RpZmljYXRpb25cIiwgZnVuY3Rpb24odGVtcGxhdGUsIG9wdGlvbnMpIHtcbiAgICBpZiAodGhpcy52aXJ0dWFsU2VsZWN0aW9uTW9kZSgpKSByZXR1cm47XG4gICAgY2xvc2VOb3RpZmljYXRpb24odGhpcywgY2xvc2UpO1xuICAgIHZhciBkaWFsb2cgPSBkaWFsb2dEaXYodGhpcywgdGVtcGxhdGUsIG9wdGlvbnMgJiYgb3B0aW9ucy5ib3R0b20pO1xuICAgIHZhciBjbG9zZWQgPSBmYWxzZSwgZG9uZVRpbWVyO1xuICAgIHZhciBkdXJhdGlvbiA9IG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMuZHVyYXRpb24gIT09IFwidW5kZWZpbmVkXCIgPyBvcHRpb25zLmR1cmF0aW9uIDogNTAwMDtcblxuICAgIGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgaWYgKGNsb3NlZCkgcmV0dXJuO1xuICAgICAgY2xvc2VkID0gdHJ1ZTtcbiAgICAgIGNsZWFyVGltZW91dChkb25lVGltZXIpO1xuICAgICAgZGlhbG9nLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIENvZGVNaXJyb3Iub24oZGlhbG9nLCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICBDb2RlTWlycm9yLmVfcHJldmVudERlZmF1bHQoZSk7XG4gICAgICBjbG9zZSgpO1xuICAgIH0pO1xuXG4gICAgaWYgKGR1cmF0aW9uKVxuICAgICAgZG9uZVRpbWVyID0gc2V0VGltZW91dChjbG9zZSwgZHVyYXRpb24pO1xuXG4gICAgcmV0dXJuIGNsb3NlO1xuICB9KTtcbn0pKCk7XG5cblxuICB2YXIgUG9zID0gQ29kZU1pcnJvci5Qb3M7XG5cbiAgZnVuY3Rpb24gdHJhbnNmb3JtQ3Vyc29yKGNtLCByYW5nZSkge1xuICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgaWYgKCF2aW0gfHwgdmltLmluc2VydE1vZGUpIHJldHVybiByYW5nZS5oZWFkO1xuICAgIHZhciBoZWFkID0gdmltLnNlbC5oZWFkO1xuICAgIGlmICghaGVhZCkgIHJldHVybiByYW5nZS5oZWFkO1xuXG4gICAgaWYgKHZpbS52aXN1YWxCbG9jaykge1xuICAgICAgaWYgKHJhbmdlLmhlYWQubGluZSAhPSBoZWFkLmxpbmUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocmFuZ2UuZnJvbSgpID09IHJhbmdlLmFuY2hvciAmJiAhcmFuZ2UuZW1wdHkoKSkge1xuICAgICAgaWYgKHJhbmdlLmhlYWQubGluZSA9PSBoZWFkLmxpbmUgJiYgcmFuZ2UuaGVhZC5jaCAhPSBoZWFkLmNoKVxuICAgICAgICByZXR1cm4gbmV3IFBvcyhyYW5nZS5oZWFkLmxpbmUsIHJhbmdlLmhlYWQuY2ggLSAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmFuZ2UuaGVhZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGlvbkZvclN1cnJvZ2F0ZUNoYXJhY3RlcnMoY20sIGN1clN0YXJ0LCBjdXJFbmQpIHtcbiAgICAvLyBzdGFydCBhbmQgY2hhcmFjdGVyIHBvc2l0aW9uIHdoZW4gbm8gc2VsZWN0aW9uIFxuICAgIC8vIGlzIHRoZSBzYW1lIGluIHZpc3VhbCBtb2RlLCBhbmQgZGlmZmVycyBpbiAxIGNoYXJhY3RlciBpbiBub3JtYWwgbW9kZVxuICAgIGlmIChjdXJTdGFydC5saW5lID09PSBjdXJFbmQubGluZSAmJiBjdXJTdGFydC5jaCA+PSBjdXJFbmQuY2ggLSAxKSB7XG4gICAgICB2YXIgdGV4dCA9IGNtLmdldExpbmUoY3VyU3RhcnQubGluZSk7XG4gICAgICB2YXIgY2hhckNvZGUgPSB0ZXh0LmNoYXJDb2RlQXQoY3VyU3RhcnQuY2gpO1xuICAgICAgaWYgKDB4RDgwMCA8PSBjaGFyQ29kZSAmJiBjaGFyQ29kZSA8PSAweEQ4RkYpIHtcbiAgICAgICAgY3VyRW5kLmNoICs9IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtzdGFydDogY3VyU3RhcnQsIGVuZDogY3VyRW5kfTtcbiAgfVxuXG4gIHZhciBkZWZhdWx0S2V5bWFwID0gW1xuICAgIC8vIEtleSB0byBrZXkgbWFwcGluZy4gVGhpcyBnb2VzIGZpcnN0IHRvIG1ha2UgaXQgcG9zc2libGUgdG8gb3ZlcnJpZGVcbiAgICAvLyBleGlzdGluZyBtYXBwaW5ncy5cbiAgICB7IGtleXM6ICc8TGVmdD4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdoJyB9LFxuICAgIHsga2V5czogJzxSaWdodD4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdsJyB9LFxuICAgIHsga2V5czogJzxVcD4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdrJyB9LFxuICAgIHsga2V5czogJzxEb3duPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2onIH0sXG4gICAgeyBrZXlzOiAnZzxVcD4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdnaycgfSxcbiAgICB7IGtleXM6ICdnPERvd24+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnZ2onIH0sXG4gICAgeyBrZXlzOiAnPFNwYWNlPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2wnIH0sXG4gICAgeyBrZXlzOiAnPEJTPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2gnLCBjb250ZXh0OiAnbm9ybWFsJ30sXG4gICAgeyBrZXlzOiAnPERlbD4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICd4JywgY29udGV4dDogJ25vcm1hbCd9LFxuICAgIHsga2V5czogJzxDLVNwYWNlPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ1cnIH0sXG4gICAgeyBrZXlzOiAnPEMtQlM+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnQicsIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnPFMtU3BhY2U+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAndycgfSxcbiAgICB7IGtleXM6ICc8Uy1CUz4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdiJywgY29udGV4dDogJ25vcm1hbCcgfSxcbiAgICB7IGtleXM6ICc8Qy1uPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2onIH0sXG4gICAgeyBrZXlzOiAnPEMtcD4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdrJyB9LFxuICAgIHsga2V5czogJzxDLVs+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnPEVzYz4nIH0sXG4gICAgeyBrZXlzOiAnPEMtYz4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICc8RXNjPicgfSxcbiAgICB7IGtleXM6ICc8Qy1bPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJzxFc2M+JywgY29udGV4dDogJ2luc2VydCcgfSxcbiAgICB7IGtleXM6ICc8Qy1jPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJzxFc2M+JywgY29udGV4dDogJ2luc2VydCcgfSxcbiAgICB7IGtleXM6ICc8Qy1Fc2M+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnPEVzYz4nIH0sIC8vIGlwYWQga2V5Ym9hcmQgc2VuZHMgQy1Fc2MgaW5zdGVhZCBvZiBDLVtcbiAgICB7IGtleXM6ICc8Qy1Fc2M+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnPEVzYz4nLCBjb250ZXh0OiAnaW5zZXJ0JyB9LFxuICAgIHsga2V5czogJ3MnLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdjbCcsIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAncycsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2MnLCBjb250ZXh0OiAndmlzdWFsJ30sXG4gICAgeyBrZXlzOiAnUycsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2NjJywgY29udGV4dDogJ25vcm1hbCcgfSxcbiAgICB7IGtleXM6ICdTJywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnVmRPJywgY29udGV4dDogJ3Zpc3VhbCcgfSxcbiAgICB7IGtleXM6ICc8SG9tZT4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICcwJyB9LFxuICAgIHsga2V5czogJzxFbmQ+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnJCcgfSxcbiAgICB7IGtleXM6ICc8UGFnZVVwPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJzxDLWI+JyB9LFxuICAgIHsga2V5czogJzxQYWdlRG93bj4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICc8Qy1mPicgfSxcbiAgICB7IGtleXM6ICc8Q1I+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnal4nLCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJzxJbnM+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnaScsIGNvbnRleHQ6ICdub3JtYWwnfSxcbiAgICB7IGtleXM6ICc8SW5zPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICd0b2dnbGVPdmVyd3JpdGUnLCBjb250ZXh0OiAnaW5zZXJ0JyB9LFxuICAgIC8vIE1vdGlvbnNcbiAgICB7IGtleXM6ICdIJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb1RvcExpbmUnLCBtb3Rpb25BcmdzOiB7IGxpbmV3aXNlOiB0cnVlLCB0b0p1bXBsaXN0OiB0cnVlIH19LFxuICAgIHsga2V5czogJ00nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvTWlkZGxlTGluZScsIG1vdGlvbkFyZ3M6IHsgbGluZXdpc2U6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnTCcsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9Cb3R0b21MaW5lJywgbW90aW9uQXJnczogeyBsaW5ld2lzZTogdHJ1ZSwgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdoJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeUNoYXJhY3RlcnMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJ2wnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5Q2hhcmFjdGVycycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdqJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeUxpbmVzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlLCBsaW5ld2lzZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdrJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeUxpbmVzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgbGluZXdpc2U6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnZ2onLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5RGlzcGxheUxpbmVzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlIH19LFxuICAgIHsga2V5czogJ2drJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeURpc3BsYXlMaW5lcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UgfX0sXG4gICAgeyBrZXlzOiAndycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgd29yZEVuZDogZmFsc2UgfX0sXG4gICAgeyBrZXlzOiAnVycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgd29yZEVuZDogZmFsc2UsIGJpZ1dvcmQ6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnZScsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgd29yZEVuZDogdHJ1ZSwgaW5jbHVzaXZlOiB0cnVlIH19LFxuICAgIHsga2V5czogJ0UnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5V29yZHMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHdvcmRFbmQ6IHRydWUsIGJpZ1dvcmQ6IHRydWUsIGluY2x1c2l2ZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdiJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVdvcmRzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgd29yZEVuZDogZmFsc2UgfX0sXG4gICAgeyBrZXlzOiAnQicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHdvcmRFbmQ6IGZhbHNlLCBiaWdXb3JkOiB0cnVlIH19LFxuICAgIHsga2V5czogJ2dlJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVdvcmRzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgd29yZEVuZDogdHJ1ZSwgaW5jbHVzaXZlOiB0cnVlIH19LFxuICAgIHsga2V5czogJ2dFJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVdvcmRzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgd29yZEVuZDogdHJ1ZSwgYmlnV29yZDogdHJ1ZSwgaW5jbHVzaXZlOiB0cnVlIH19LFxuICAgIHsga2V5czogJ3snLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5UGFyYWdyYXBoJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICd9JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVBhcmFncmFwaCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICcoJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVNlbnRlbmNlJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSB9fSxcbiAgICB7IGtleXM6ICcpJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVNlbnRlbmNlJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlIH19LFxuICAgIHsga2V5czogJzxDLWY+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVBhZ2UnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnPEMtYj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5UGFnZScsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UgfX0sXG4gICAgeyBrZXlzOiAnPEMtZD4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5U2Nyb2xsJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlLCBleHBsaWNpdFJlcGVhdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICc8Qy11PicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlTY3JvbGwnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCBleHBsaWNpdFJlcGVhdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdnZycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9MaW5lT3JFZGdlT2ZEb2N1bWVudCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIGV4cGxpY2l0UmVwZWF0OiB0cnVlLCBsaW5ld2lzZTogdHJ1ZSwgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdHJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb0xpbmVPckVkZ2VPZkRvY3VtZW50JywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlLCBleHBsaWNpdFJlcGVhdDogdHJ1ZSwgbGluZXdpc2U6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAge2tleXM6IFwiZyRcIiwgdHlwZTogXCJtb3Rpb25cIiwgbW90aW9uOiBcIm1vdmVUb0VuZE9mRGlzcGxheUxpbmVcIn0sXG4gICAge2tleXM6IFwiZ15cIiwgdHlwZTogXCJtb3Rpb25cIiwgbW90aW9uOiBcIm1vdmVUb1N0YXJ0T2ZEaXNwbGF5TGluZVwifSxcbiAgICB7a2V5czogXCJnMFwiLCB0eXBlOiBcIm1vdGlvblwiLCBtb3Rpb246IFwibW92ZVRvU3RhcnRPZkRpc3BsYXlMaW5lXCJ9LFxuICAgIHsga2V5czogJzAnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvU3RhcnRPZkxpbmUnIH0sXG4gICAgeyBrZXlzOiAnXicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXInIH0sXG4gICAgeyBrZXlzOiAnKycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlMaW5lcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgdG9GaXJzdENoYXI6dHJ1ZSB9fSxcbiAgICB7IGtleXM6ICctJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeUxpbmVzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgdG9GaXJzdENoYXI6dHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdfJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeUxpbmVzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlLCB0b0ZpcnN0Q2hhcjp0cnVlLCByZXBlYXRPZmZzZXQ6LTEgfX0sXG4gICAgeyBrZXlzOiAnJCcsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9Fb2wnLCBtb3Rpb25BcmdzOiB7IGluY2x1c2l2ZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICclJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb01hdGNoZWRTeW1ib2wnLCBtb3Rpb25BcmdzOiB7IGluY2x1c2l2ZTogdHJ1ZSwgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdmPGNoYXJhY3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvQ2hhcmFjdGVyJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlICwgaW5jbHVzaXZlOiB0cnVlIH19LFxuICAgIHsga2V5czogJ0Y8Y2hhcmFjdGVyPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9DaGFyYWN0ZXInLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJ3Q8Y2hhcmFjdGVyPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVGlsbENoYXJhY3RlcicsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgaW5jbHVzaXZlOiB0cnVlIH19LFxuICAgIHsga2V5czogJ1Q8Y2hhcmFjdGVyPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVGlsbENoYXJhY3RlcicsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UgfX0sXG4gICAgeyBrZXlzOiAnOycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdyZXBlYXRMYXN0Q2hhcmFjdGVyU2VhcmNoJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlIH19LFxuICAgIHsga2V5czogJywnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAncmVwZWF0TGFzdENoYXJhY3RlclNlYXJjaCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UgfX0sXG4gICAgeyBrZXlzOiAnXFwnPGNoYXJhY3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnZ29Ub01hcmsnLCBtb3Rpb25BcmdzOiB7dG9KdW1wbGlzdDogdHJ1ZSwgbGluZXdpc2U6IHRydWV9fSxcbiAgICB7IGtleXM6ICdgPGNoYXJhY3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnZ29Ub01hcmsnLCBtb3Rpb25BcmdzOiB7dG9KdW1wbGlzdDogdHJ1ZX19LFxuICAgIHsga2V5czogJ11gJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ2p1bXBUb01hcmsnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUgfSB9LFxuICAgIHsga2V5czogJ1tgJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ2p1bXBUb01hcmsnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH0gfSxcbiAgICB7IGtleXM6ICddXFwnJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ2p1bXBUb01hcmsnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIGxpbmV3aXNlOiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICdbXFwnJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ2p1bXBUb01hcmsnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCBsaW5ld2lzZTogdHJ1ZSB9IH0sXG4gICAgLy8gdGhlIG5leHQgdHdvIGFyZW4ndCBtb3Rpb25zIGJ1dCBtdXN0IGNvbWUgYmVmb3JlIG1vcmUgZ2VuZXJhbCBtb3Rpb24gZGVjbGFyYXRpb25zXG4gICAgeyBrZXlzOiAnXXAnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncGFzdGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgYWZ0ZXI6IHRydWUsIGlzRWRpdDogdHJ1ZSwgbWF0Y2hJbmRlbnQ6IHRydWV9fSxcbiAgICB7IGtleXM6ICdbcCcsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdwYXN0ZScsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBhZnRlcjogZmFsc2UsIGlzRWRpdDogdHJ1ZSwgbWF0Y2hJbmRlbnQ6IHRydWV9fSxcbiAgICB7IGtleXM6ICddPGNoYXJhY3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvU3ltYm9sJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlLCB0b0p1bXBsaXN0OiB0cnVlfX0sXG4gICAgeyBrZXlzOiAnWzxjaGFyYWN0ZXI+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb1N5bWJvbCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHRvSnVtcGxpc3Q6IHRydWV9fSxcbiAgICB7IGtleXM6ICd8JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb0NvbHVtbid9LFxuICAgIHsga2V5czogJ28nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvT3RoZXJIaWdobGlnaHRlZEVuZCcsIGNvbnRleHQ6J3Zpc3VhbCd9LFxuICAgIHsga2V5czogJ08nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvT3RoZXJIaWdobGlnaHRlZEVuZCcsIG1vdGlvbkFyZ3M6IHtzYW1lTGluZTogdHJ1ZX0sIGNvbnRleHQ6J3Zpc3VhbCd9LFxuICAgIC8vIE9wZXJhdG9yc1xuICAgIHsga2V5czogJ2QnLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2RlbGV0ZScgfSxcbiAgICB7IGtleXM6ICd5JywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICd5YW5rJyB9LFxuICAgIHsga2V5czogJ2MnLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2NoYW5nZScgfSxcbiAgICB7IGtleXM6ICc9JywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdpbmRlbnRBdXRvJyB9LFxuICAgIHsga2V5czogJz4nLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2luZGVudCcsIG9wZXJhdG9yQXJnczogeyBpbmRlbnRSaWdodDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICc8JywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdpbmRlbnQnLCBvcGVyYXRvckFyZ3M6IHsgaW5kZW50UmlnaHQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJ2d+JywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdjaGFuZ2VDYXNlJyB9LFxuICAgIHsga2V5czogJ2d1JywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdjaGFuZ2VDYXNlJywgb3BlcmF0b3JBcmdzOiB7dG9Mb3dlcjogdHJ1ZX0sIGlzRWRpdDogdHJ1ZSB9LFxuICAgIHsga2V5czogJ2dVJywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdjaGFuZ2VDYXNlJywgb3BlcmF0b3JBcmdzOiB7dG9Mb3dlcjogZmFsc2V9LCBpc0VkaXQ6IHRydWUgfSxcbiAgICB7IGtleXM6ICduJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ2ZpbmROZXh0JywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlLCB0b0p1bXBsaXN0OiB0cnVlIH19LFxuICAgIHsga2V5czogJ04nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnZmluZE5leHQnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCB0b0p1bXBsaXN0OiB0cnVlIH19LFxuICAgIHsga2V5czogJ2duJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ2ZpbmRBbmRTZWxlY3ROZXh0SW5jbHVzaXZlJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlIH19LFxuICAgIHsga2V5czogJ2dOJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ2ZpbmRBbmRTZWxlY3ROZXh0SW5jbHVzaXZlJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSB9fSxcbiAgICAvLyBPcGVyYXRvci1Nb3Rpb24gZHVhbCBjb21tYW5kc1xuICAgIHsga2V5czogJ3gnLCB0eXBlOiAnb3BlcmF0b3JNb3Rpb24nLCBvcGVyYXRvcjogJ2RlbGV0ZScsIG1vdGlvbjogJ21vdmVCeUNoYXJhY3RlcnMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUgfSwgb3BlcmF0b3JNb3Rpb25BcmdzOiB7IHZpc3VhbExpbmU6IGZhbHNlIH19LFxuICAgIHsga2V5czogJ1gnLCB0eXBlOiAnb3BlcmF0b3JNb3Rpb24nLCBvcGVyYXRvcjogJ2RlbGV0ZScsIG1vdGlvbjogJ21vdmVCeUNoYXJhY3RlcnMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH0sIG9wZXJhdG9yTW90aW9uQXJnczogeyB2aXN1YWxMaW5lOiB0cnVlIH19LFxuICAgIHsga2V5czogJ0QnLCB0eXBlOiAnb3BlcmF0b3JNb3Rpb24nLCBvcGVyYXRvcjogJ2RlbGV0ZScsIG1vdGlvbjogJ21vdmVUb0VvbCcsIG1vdGlvbkFyZ3M6IHsgaW5jbHVzaXZlOiB0cnVlIH0sIGNvbnRleHQ6ICdub3JtYWwnfSxcbiAgICB7IGtleXM6ICdEJywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdkZWxldGUnLCBvcGVyYXRvckFyZ3M6IHsgbGluZXdpc2U6IHRydWUgfSwgY29udGV4dDogJ3Zpc3VhbCd9LFxuICAgIHsga2V5czogJ1knLCB0eXBlOiAnb3BlcmF0b3JNb3Rpb24nLCBvcGVyYXRvcjogJ3lhbmsnLCBtb3Rpb246ICdleHBhbmRUb0xpbmUnLCBtb3Rpb25BcmdzOiB7IGxpbmV3aXNlOiB0cnVlIH0sIGNvbnRleHQ6ICdub3JtYWwnfSxcbiAgICB7IGtleXM6ICdZJywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICd5YW5rJywgb3BlcmF0b3JBcmdzOiB7IGxpbmV3aXNlOiB0cnVlIH0sIGNvbnRleHQ6ICd2aXN1YWwnfSxcbiAgICB7IGtleXM6ICdDJywgdHlwZTogJ29wZXJhdG9yTW90aW9uJywgb3BlcmF0b3I6ICdjaGFuZ2UnLCBtb3Rpb246ICdtb3ZlVG9Fb2wnLCBtb3Rpb25BcmdzOiB7IGluY2x1c2l2ZTogdHJ1ZSB9LCBjb250ZXh0OiAnbm9ybWFsJ30sXG4gICAgeyBrZXlzOiAnQycsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnY2hhbmdlJywgb3BlcmF0b3JBcmdzOiB7IGxpbmV3aXNlOiB0cnVlIH0sIGNvbnRleHQ6ICd2aXN1YWwnfSxcbiAgICB7IGtleXM6ICd+JywgdHlwZTogJ29wZXJhdG9yTW90aW9uJywgb3BlcmF0b3I6ICdjaGFuZ2VDYXNlJywgbW90aW9uOiAnbW92ZUJ5Q2hhcmFjdGVycycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9LCBvcGVyYXRvckFyZ3M6IHsgc2hvdWxkTW92ZUN1cnNvcjogdHJ1ZSB9LCBjb250ZXh0OiAnbm9ybWFsJ30sXG4gICAgeyBrZXlzOiAnficsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnY2hhbmdlQ2FzZScsIGNvbnRleHQ6ICd2aXN1YWwnfSxcbiAgICB7IGtleXM6ICc8Qy11PicsIHR5cGU6ICdvcGVyYXRvck1vdGlvbicsIG9wZXJhdG9yOiAnZGVsZXRlJywgbW90aW9uOiAnbW92ZVRvU3RhcnRPZkxpbmUnLCBjb250ZXh0OiAnaW5zZXJ0JyB9LFxuICAgIHsga2V5czogJzxDLXc+JywgdHlwZTogJ29wZXJhdG9yTW90aW9uJywgb3BlcmF0b3I6ICdkZWxldGUnLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHdvcmRFbmQ6IGZhbHNlIH0sIGNvbnRleHQ6ICdpbnNlcnQnIH0sXG4gICAgLy9pZ25vcmUgQy13IGluIG5vcm1hbCBtb2RlXG4gICAgeyBrZXlzOiAnPEMtdz4nLCB0eXBlOiAnaWRsZScsIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgLy8gQWN0aW9uc1xuICAgIHsga2V5czogJzxDLWk+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2p1bXBMaXN0V2FsaycsIGFjdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICc8Qy1vPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdqdW1wTGlzdFdhbGsnLCBhY3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJzxDLWU+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbCcsIGFjdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgbGluZXdpc2U6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnPEMteT4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnc2Nyb2xsJywgYWN0aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgbGluZXdpc2U6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnYScsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdlbnRlckluc2VydE1vZGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgaW5zZXJ0QXQ6ICdjaGFyQWZ0ZXInIH0sIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnQScsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdlbnRlckluc2VydE1vZGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgaW5zZXJ0QXQ6ICdlb2wnIH0sIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnQScsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdlbnRlckluc2VydE1vZGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgaW5zZXJ0QXQ6ICdlbmRPZlNlbGVjdGVkQXJlYScgfSwgY29udGV4dDogJ3Zpc3VhbCcgfSxcbiAgICB7IGtleXM6ICdpJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2VudGVySW5zZXJ0TW9kZScsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBpbnNlcnRBdDogJ2lucGxhY2UnIH0sIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnZ2knLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGluc2VydEF0OiAnbGFzdEVkaXQnIH0sIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnSScsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdlbnRlckluc2VydE1vZGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgaW5zZXJ0QXQ6ICdmaXJzdE5vbkJsYW5rJ30sIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnZ0knLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGluc2VydEF0OiAnYm9sJ30sIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnSScsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdlbnRlckluc2VydE1vZGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgaW5zZXJ0QXQ6ICdzdGFydE9mU2VsZWN0ZWRBcmVhJyB9LCBjb250ZXh0OiAndmlzdWFsJyB9LFxuICAgIHsga2V5czogJ28nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnbmV3TGluZUFuZEVudGVySW5zZXJ0TW9kZScsIGlzRWRpdDogdHJ1ZSwgaW50ZXJsYWNlSW5zZXJ0UmVwZWF0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGFmdGVyOiB0cnVlIH0sIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnTycsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICduZXdMaW5lQW5kRW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBpbnRlcmxhY2VJbnNlcnRSZXBlYXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgYWZ0ZXI6IGZhbHNlIH0sIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAndicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICd0b2dnbGVWaXN1YWxNb2RlJyB9LFxuICAgIHsga2V5czogJ1YnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAndG9nZ2xlVmlzdWFsTW9kZScsIGFjdGlvbkFyZ3M6IHsgbGluZXdpc2U6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnPEMtdj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAndG9nZ2xlVmlzdWFsTW9kZScsIGFjdGlvbkFyZ3M6IHsgYmxvY2t3aXNlOiB0cnVlIH19LFxuICAgIHsga2V5czogJzxDLXE+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3RvZ2dsZVZpc3VhbE1vZGUnLCBhY3Rpb25BcmdzOiB7IGJsb2Nrd2lzZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdndicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdyZXNlbGVjdExhc3RTZWxlY3Rpb24nIH0sXG4gICAgeyBrZXlzOiAnSicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdqb2luTGluZXMnLCBpc0VkaXQ6IHRydWUgfSxcbiAgICB7IGtleXM6ICdnSicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdqb2luTGluZXMnLCBhY3Rpb25BcmdzOiB7IGtlZXBTcGFjZXM6IHRydWUgfSwgaXNFZGl0OiB0cnVlIH0sXG4gICAgeyBrZXlzOiAncCcsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdwYXN0ZScsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBhZnRlcjogdHJ1ZSwgaXNFZGl0OiB0cnVlIH19LFxuICAgIHsga2V5czogJ1AnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncGFzdGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgYWZ0ZXI6IGZhbHNlLCBpc0VkaXQ6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAncjxjaGFyYWN0ZXI+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3JlcGxhY2UnLCBpc0VkaXQ6IHRydWUgfSxcbiAgICB7IGtleXM6ICdAPGNoYXJhY3Rlcj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncmVwbGF5TWFjcm8nIH0sXG4gICAgeyBrZXlzOiAncTxjaGFyYWN0ZXI+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2VudGVyTWFjcm9SZWNvcmRNb2RlJyB9LFxuICAgIC8vIEhhbmRsZSBSZXBsYWNlLW1vZGUgYXMgYSBzcGVjaWFsIGNhc2Ugb2YgaW5zZXJ0IG1vZGUuXG4gICAgeyBrZXlzOiAnUicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdlbnRlckluc2VydE1vZGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgcmVwbGFjZTogdHJ1ZSB9LCBjb250ZXh0OiAnbm9ybWFsJ30sXG4gICAgeyBrZXlzOiAnUicsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnY2hhbmdlJywgb3BlcmF0b3JBcmdzOiB7IGxpbmV3aXNlOiB0cnVlLCBmdWxsTGluZTogdHJ1ZSB9LCBjb250ZXh0OiAndmlzdWFsJywgZXhpdFZpc3VhbEJsb2NrOiB0cnVlfSxcbiAgICB7IGtleXM6ICd1JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3VuZG8nLCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ3UnLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2NoYW5nZUNhc2UnLCBvcGVyYXRvckFyZ3M6IHt0b0xvd2VyOiB0cnVlfSwgY29udGV4dDogJ3Zpc3VhbCcsIGlzRWRpdDogdHJ1ZSB9LFxuICAgIHsga2V5czogJ1UnLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2NoYW5nZUNhc2UnLCBvcGVyYXRvckFyZ3M6IHt0b0xvd2VyOiBmYWxzZX0sIGNvbnRleHQ6ICd2aXN1YWwnLCBpc0VkaXQ6IHRydWUgfSxcbiAgICB7IGtleXM6ICc8Qy1yPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdyZWRvJyB9LFxuICAgIHsga2V5czogJ208Y2hhcmFjdGVyPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdzZXRNYXJrJyB9LFxuICAgIHsga2V5czogJ1wiPGNoYXJhY3Rlcj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnc2V0UmVnaXN0ZXInIH0sXG4gICAgeyBrZXlzOiAnenonLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnc2Nyb2xsVG9DdXJzb3InLCBhY3Rpb25BcmdzOiB7IHBvc2l0aW9uOiAnY2VudGVyJyB9fSxcbiAgICB7IGtleXM6ICd6LicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdzY3JvbGxUb0N1cnNvcicsIGFjdGlvbkFyZ3M6IHsgcG9zaXRpb246ICdjZW50ZXInIH0sIG1vdGlvbjogJ21vdmVUb0ZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcicgfSxcbiAgICB7IGtleXM6ICd6dCcsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdzY3JvbGxUb0N1cnNvcicsIGFjdGlvbkFyZ3M6IHsgcG9zaXRpb246ICd0b3AnIH19LFxuICAgIHsga2V5czogJ3o8Q1I+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbFRvQ3Vyc29yJywgYWN0aW9uQXJnczogeyBwb3NpdGlvbjogJ3RvcCcgfSwgbW90aW9uOiAnbW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyJyB9LFxuICAgIHsga2V5czogJ3piJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbFRvQ3Vyc29yJywgYWN0aW9uQXJnczogeyBwb3NpdGlvbjogJ2JvdHRvbScgfX0sXG4gICAgeyBrZXlzOiAnei0nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnc2Nyb2xsVG9DdXJzb3InLCBhY3Rpb25BcmdzOiB7IHBvc2l0aW9uOiAnYm90dG9tJyB9LCBtb3Rpb246ICdtb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXInIH0sXG4gICAgeyBrZXlzOiAnLicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdyZXBlYXRMYXN0RWRpdCcgfSxcbiAgICB7IGtleXM6ICc8Qy1hPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdpbmNyZW1lbnROdW1iZXJUb2tlbicsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczoge2luY3JlYXNlOiB0cnVlLCBiYWNrdHJhY2s6IGZhbHNlfX0sXG4gICAgeyBrZXlzOiAnPEMteD4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnaW5jcmVtZW50TnVtYmVyVG9rZW4nLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHtpbmNyZWFzZTogZmFsc2UsIGJhY2t0cmFjazogZmFsc2V9fSxcbiAgICB7IGtleXM6ICc8Qy10PicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdpbmRlbnQnLCBhY3Rpb25BcmdzOiB7IGluZGVudFJpZ2h0OiB0cnVlIH0sIGNvbnRleHQ6ICdpbnNlcnQnIH0sXG4gICAgeyBrZXlzOiAnPEMtZD4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnaW5kZW50JywgYWN0aW9uQXJnczogeyBpbmRlbnRSaWdodDogZmFsc2UgfSwgY29udGV4dDogJ2luc2VydCcgfSxcbiAgICAvLyBUZXh0IG9iamVjdCBtb3Rpb25zXG4gICAgeyBrZXlzOiAnYTxjaGFyYWN0ZXI+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ3RleHRPYmplY3RNYW5pcHVsYXRpb24nIH0sXG4gICAgeyBrZXlzOiAnaTxjaGFyYWN0ZXI+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ3RleHRPYmplY3RNYW5pcHVsYXRpb24nLCBtb3Rpb25BcmdzOiB7IHRleHRPYmplY3RJbm5lcjogdHJ1ZSB9fSxcbiAgICAvLyBTZWFyY2hcbiAgICB7IGtleXM6ICcvJywgdHlwZTogJ3NlYXJjaCcsIHNlYXJjaEFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgcXVlcnlTcmM6ICdwcm9tcHQnLCB0b0p1bXBsaXN0OiB0cnVlIH19LFxuICAgIHsga2V5czogJz8nLCB0eXBlOiAnc2VhcmNoJywgc2VhcmNoQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgcXVlcnlTcmM6ICdwcm9tcHQnLCB0b0p1bXBsaXN0OiB0cnVlIH19LFxuICAgIHsga2V5czogJyonLCB0eXBlOiAnc2VhcmNoJywgc2VhcmNoQXJnczogeyBmb3J3YXJkOiB0cnVlLCBxdWVyeVNyYzogJ3dvcmRVbmRlckN1cnNvcicsIHdob2xlV29yZE9ubHk6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnIycsIHR5cGU6ICdzZWFyY2gnLCBzZWFyY2hBcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCBxdWVyeVNyYzogJ3dvcmRVbmRlckN1cnNvcicsIHdob2xlV29yZE9ubHk6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnZyonLCB0eXBlOiAnc2VhcmNoJywgc2VhcmNoQXJnczogeyBmb3J3YXJkOiB0cnVlLCBxdWVyeVNyYzogJ3dvcmRVbmRlckN1cnNvcicsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnZyMnLCB0eXBlOiAnc2VhcmNoJywgc2VhcmNoQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgcXVlcnlTcmM6ICd3b3JkVW5kZXJDdXJzb3InLCB0b0p1bXBsaXN0OiB0cnVlIH19LFxuICAgIC8vIEV4IGNvbW1hbmRcbiAgICB7IGtleXM6ICc6JywgdHlwZTogJ2V4JyB9XG4gIF07XG4gIHZhciBkZWZhdWx0S2V5bWFwTGVuZ3RoID0gZGVmYXVsdEtleW1hcC5sZW5ndGg7XG5cbiAgLyoqXG4gICAqIEV4IGNvbW1hbmRzXG4gICAqIENhcmUgbXVzdCBiZSB0YWtlbiB3aGVuIGFkZGluZyB0byB0aGUgZGVmYXVsdCBFeCBjb21tYW5kIG1hcC4gRm9yIGFueVxuICAgKiBwYWlyIG9mIGNvbW1hbmRzIHRoYXQgaGF2ZSBhIHNoYXJlZCBwcmVmaXgsIGF0IGxlYXN0IG9uZSBvZiB0aGVpclxuICAgKiBzaG9ydE5hbWVzIG11c3Qgbm90IG1hdGNoIHRoZSBwcmVmaXggb2YgdGhlIG90aGVyIGNvbW1hbmQuXG4gICAqL1xuICB2YXIgZGVmYXVsdEV4Q29tbWFuZE1hcCA9IFtcbiAgICB7IG5hbWU6ICdjb2xvcnNjaGVtZScsIHNob3J0TmFtZTogJ2NvbG8nIH0sXG4gICAgeyBuYW1lOiAnbWFwJyB9LFxuICAgIHsgbmFtZTogJ2ltYXAnLCBzaG9ydE5hbWU6ICdpbScgfSxcbiAgICB7IG5hbWU6ICdubWFwJywgc2hvcnROYW1lOiAnbm0nIH0sXG4gICAgeyBuYW1lOiAndm1hcCcsIHNob3J0TmFtZTogJ3ZtJyB9LFxuICAgIHsgbmFtZTogJ3VubWFwJyB9LFxuICAgIHsgbmFtZTogJ3dyaXRlJywgc2hvcnROYW1lOiAndycgfSxcbiAgICB7IG5hbWU6ICd1bmRvJywgc2hvcnROYW1lOiAndScgfSxcbiAgICB7IG5hbWU6ICdyZWRvJywgc2hvcnROYW1lOiAncmVkJyB9LFxuICAgIHsgbmFtZTogJ3NldCcsIHNob3J0TmFtZTogJ3NlJyB9LFxuICAgIHsgbmFtZTogJ3NldGxvY2FsJywgc2hvcnROYW1lOiAnc2V0bCcgfSxcbiAgICB7IG5hbWU6ICdzZXRnbG9iYWwnLCBzaG9ydE5hbWU6ICdzZXRnJyB9LFxuICAgIHsgbmFtZTogJ3NvcnQnLCBzaG9ydE5hbWU6ICdzb3InIH0sXG4gICAgeyBuYW1lOiAnc3Vic3RpdHV0ZScsIHNob3J0TmFtZTogJ3MnLCBwb3NzaWJseUFzeW5jOiB0cnVlIH0sXG4gICAgeyBuYW1lOiAnbm9obHNlYXJjaCcsIHNob3J0TmFtZTogJ25vaCcgfSxcbiAgICB7IG5hbWU6ICd5YW5rJywgc2hvcnROYW1lOiAneScgfSxcbiAgICB7IG5hbWU6ICdkZWxtYXJrcycsIHNob3J0TmFtZTogJ2RlbG0nIH0sXG4gICAgeyBuYW1lOiAncmVnaXN0ZXJzJywgc2hvcnROYW1lOiAncmVnJywgZXhjbHVkZUZyb21Db21tYW5kSGlzdG9yeTogdHJ1ZSB9LFxuICAgIHsgbmFtZTogJ3ZnbG9iYWwnLCBzaG9ydE5hbWU6ICd2JyB9LFxuICAgIHsgbmFtZTogJ2dsb2JhbCcsIHNob3J0TmFtZTogJ2cnIH1cbiAgXTtcblxuICAgIGZ1bmN0aW9uIGVudGVyVmltTW9kZShjbSkge1xuICAgICAgY20uc2V0T3B0aW9uKCdkaXNhYmxlSW5wdXQnLCB0cnVlKTtcbiAgICAgIGNtLnNldE9wdGlvbignc2hvd0N1cnNvcldoZW5TZWxlY3RpbmcnLCBmYWxzZSk7XG4gICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwge21vZGU6IFwibm9ybWFsXCJ9KTtcbiAgICAgIGNtLm9uKCdjdXJzb3JBY3Rpdml0eScsIG9uQ3Vyc29yQWN0aXZpdHkpO1xuICAgICAgbWF5YmVJbml0VmltU3RhdGUoY20pO1xuICAgICAgQ29kZU1pcnJvci5vbihjbS5nZXRJbnB1dEZpZWxkKCksICdwYXN0ZScsIGdldE9uUGFzdGVGbihjbSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxlYXZlVmltTW9kZShjbSkge1xuICAgICAgY20uc2V0T3B0aW9uKCdkaXNhYmxlSW5wdXQnLCBmYWxzZSk7XG4gICAgICBjbS5vZmYoJ2N1cnNvckFjdGl2aXR5Jywgb25DdXJzb3JBY3Rpdml0eSk7XG4gICAgICBDb2RlTWlycm9yLm9mZihjbS5nZXRJbnB1dEZpZWxkKCksICdwYXN0ZScsIGdldE9uUGFzdGVGbihjbSkpO1xuICAgICAgY20uc3RhdGUudmltID0gbnVsbDtcbiAgICAgIGlmIChoaWdobGlnaHRUaW1lb3V0KSBjbGVhclRpbWVvdXQoaGlnaGxpZ2h0VGltZW91dCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGV0YWNoVmltTWFwKGNtLCBuZXh0KSB7XG4gICAgICBpZiAodGhpcyA9PSBDb2RlTWlycm9yLmtleU1hcC52aW0pIHtcbiAgICAgICAgY20ub3B0aW9ucy4kY3VzdG9tQ3Vyc29yID0gbnVsbDtcbiAgICAgICAgQ29kZU1pcnJvci5ybUNsYXNzKGNtLmdldFdyYXBwZXJFbGVtZW50KCksIFwiY20tZmF0LWN1cnNvclwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFuZXh0IHx8IG5leHQuYXR0YWNoICE9IGF0dGFjaFZpbU1hcClcbiAgICAgICAgbGVhdmVWaW1Nb2RlKGNtKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYXR0YWNoVmltTWFwKGNtLCBwcmV2KSB7XG4gICAgICBpZiAodGhpcyA9PSBDb2RlTWlycm9yLmtleU1hcC52aW0pIHtcbiAgICAgICAgaWYgKGNtLmN1ck9wKSBjbS5jdXJPcC5zZWxlY3Rpb25DaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgY20ub3B0aW9ucy4kY3VzdG9tQ3Vyc29yID0gdHJhbnNmb3JtQ3Vyc29yO1xuICAgICAgICBDb2RlTWlycm9yLmFkZENsYXNzKGNtLmdldFdyYXBwZXJFbGVtZW50KCksIFwiY20tZmF0LWN1cnNvclwiKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFwcmV2IHx8IHByZXYuYXR0YWNoICE9IGF0dGFjaFZpbU1hcClcbiAgICAgICAgZW50ZXJWaW1Nb2RlKGNtKTtcbiAgICB9XG5cbiAgICAvLyBEZXByZWNhdGVkLCBzaW1wbHkgc2V0dGluZyB0aGUga2V5bWFwIHdvcmtzIGFnYWluLlxuICAgIENvZGVNaXJyb3IuZGVmaW5lT3B0aW9uKCd2aW1Nb2RlJywgZmFsc2UsIGZ1bmN0aW9uKGNtLCB2YWwsIHByZXYpIHtcbiAgICAgIGlmICh2YWwgJiYgY20uZ2V0T3B0aW9uKFwia2V5TWFwXCIpICE9IFwidmltXCIpXG4gICAgICAgIGNtLnNldE9wdGlvbihcImtleU1hcFwiLCBcInZpbVwiKTtcbiAgICAgIGVsc2UgaWYgKCF2YWwgJiYgcHJldiAhPSBDb2RlTWlycm9yLkluaXQgJiYgL152aW0vLnRlc3QoY20uZ2V0T3B0aW9uKFwia2V5TWFwXCIpKSlcbiAgICAgICAgY20uc2V0T3B0aW9uKFwia2V5TWFwXCIsIFwiZGVmYXVsdFwiKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGNtS2V5KGtleSwgY20pIHtcbiAgICAgIGlmICghY20pIHsgcmV0dXJuIHVuZGVmaW5lZDsgfVxuICAgICAgaWYgKHRoaXNba2V5XSkgeyByZXR1cm4gdGhpc1trZXldOyB9XG4gICAgICB2YXIgdmltS2V5ID0gY21LZXlUb1ZpbUtleShrZXkpO1xuICAgICAgaWYgKCF2aW1LZXkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdmFyIGNtZCA9IHZpbUFwaS5maW5kS2V5KGNtLCB2aW1LZXkpO1xuICAgICAgaWYgKHR5cGVvZiBjbWQgPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgJ3ZpbS1rZXlwcmVzcycsIHZpbUtleSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY21kO1xuICAgIH1cblxuICAgIHZhciBtb2RpZmllcnMgPSB7U2hpZnQ6J1MnLEN0cmw6J0MnLEFsdDonQScsQ21kOidEJyxNb2Q6J0EnLENhcHNMb2NrOicnfTtcbiAgICB2YXIgc3BlY2lhbEtleXMgPSB7RW50ZXI6J0NSJyxCYWNrc3BhY2U6J0JTJyxEZWxldGU6J0RlbCcsSW5zZXJ0OidJbnMnfTtcbiAgICBmdW5jdGlvbiBjbUtleVRvVmltS2V5KGtleSkge1xuICAgICAgaWYgKGtleS5jaGFyQXQoMCkgPT0gJ1xcJycpIHtcbiAgICAgICAgLy8gS2V5cHJlc3MgY2hhcmFjdGVyIGJpbmRpbmcgb2YgZm9ybWF0IFwiJ2EnXCJcbiAgICAgICAgcmV0dXJuIGtleS5jaGFyQXQoMSk7XG4gICAgICB9XG4gICAgICB2YXIgcGllY2VzID0ga2V5LnNwbGl0KC8tKD8hJCkvKTtcbiAgICAgIHZhciBsYXN0UGllY2UgPSBwaWVjZXNbcGllY2VzLmxlbmd0aCAtIDFdO1xuICAgICAgaWYgKHBpZWNlcy5sZW5ndGggPT0gMSAmJiBwaWVjZXNbMF0ubGVuZ3RoID09IDEpIHtcbiAgICAgICAgLy8gTm8tbW9kaWZpZXIgYmluZGluZ3MgdXNlIGxpdGVyYWwgY2hhcmFjdGVyIGJpbmRpbmdzIGFib3ZlLiBTa2lwLlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHBpZWNlcy5sZW5ndGggPT0gMiAmJiBwaWVjZXNbMF0gPT0gJ1NoaWZ0JyAmJiBsYXN0UGllY2UubGVuZ3RoID09IDEpIHtcbiAgICAgICAgLy8gSWdub3JlIFNoaWZ0K2NoYXIgYmluZGluZ3MgYXMgdGhleSBzaG91bGQgYmUgaGFuZGxlZCBieSBsaXRlcmFsIGNoYXJhY3Rlci5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgdmFyIGhhc0NoYXJhY3RlciA9IGZhbHNlO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwaWVjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHBpZWNlID0gcGllY2VzW2ldO1xuICAgICAgICBpZiAocGllY2UgaW4gbW9kaWZpZXJzKSB7IHBpZWNlc1tpXSA9IG1vZGlmaWVyc1twaWVjZV07IH1cbiAgICAgICAgZWxzZSB7IGhhc0NoYXJhY3RlciA9IHRydWU7IH1cbiAgICAgICAgaWYgKHBpZWNlIGluIHNwZWNpYWxLZXlzKSB7IHBpZWNlc1tpXSA9IHNwZWNpYWxLZXlzW3BpZWNlXTsgfVxuICAgICAgfVxuICAgICAgaWYgKCFoYXNDaGFyYWN0ZXIpIHtcbiAgICAgICAgLy8gVmltIGRvZXMgbm90IHN1cHBvcnQgbW9kaWZpZXIgb25seSBrZXlzLlxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICAvLyBUT0RPOiBDdXJyZW50IGJpbmRpbmdzIGV4cGVjdCB0aGUgY2hhcmFjdGVyIHRvIGJlIGxvd2VyIGNhc2UsIGJ1dFxuICAgICAgLy8gaXQgbG9va3MgbGlrZSB2aW0ga2V5IG5vdGF0aW9uIHVzZXMgdXBwZXIgY2FzZS5cbiAgICAgIGlmIChpc1VwcGVyQ2FzZShsYXN0UGllY2UpKSB7XG4gICAgICAgIHBpZWNlc1twaWVjZXMubGVuZ3RoIC0gMV0gPSBsYXN0UGllY2UudG9Mb3dlckNhc2UoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAnPCcgKyBwaWVjZXMuam9pbignLScpICsgJz4nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE9uUGFzdGVGbihjbSkge1xuICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgIGlmICghdmltLm9uUGFzdGVGbikge1xuICAgICAgICB2aW0ub25QYXN0ZUZuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCF2aW0uaW5zZXJ0TW9kZSkge1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKG9mZnNldEN1cnNvcihjbS5nZXRDdXJzb3IoKSwgMCwgMSkpO1xuICAgICAgICAgICAgYWN0aW9ucy5lbnRlckluc2VydE1vZGUoY20sIHt9LCB2aW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2aW0ub25QYXN0ZUZuO1xuICAgIH1cblxuICAgIHZhciBudW1iZXJSZWdleCA9IC9bXFxkXS87XG4gICAgdmFyIHdvcmRDaGFyVGVzdCA9IFtDb2RlTWlycm9yLmlzV29yZENoYXIsIGZ1bmN0aW9uKGNoKSB7XG4gICAgICByZXR1cm4gY2ggJiYgIUNvZGVNaXJyb3IuaXNXb3JkQ2hhcihjaCkgJiYgIS9cXHMvLnRlc3QoY2gpO1xuICAgIH1dLCBiaWdXb3JkQ2hhclRlc3QgPSBbZnVuY3Rpb24oY2gpIHtcbiAgICAgIHJldHVybiAvXFxTLy50ZXN0KGNoKTtcbiAgICB9XTtcbiAgICBmdW5jdGlvbiBtYWtlS2V5UmFuZ2Uoc3RhcnQsIHNpemUpIHtcbiAgICAgIHZhciBrZXlzID0gW107XG4gICAgICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBzdGFydCArIHNpemU7IGkrKykge1xuICAgICAgICBrZXlzLnB1c2goU3RyaW5nLmZyb21DaGFyQ29kZShpKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4ga2V5cztcbiAgICB9XG4gICAgdmFyIHVwcGVyQ2FzZUFscGhhYmV0ID0gbWFrZUtleVJhbmdlKDY1LCAyNik7XG4gICAgdmFyIGxvd2VyQ2FzZUFscGhhYmV0ID0gbWFrZUtleVJhbmdlKDk3LCAyNik7XG4gICAgdmFyIG51bWJlcnMgPSBtYWtlS2V5UmFuZ2UoNDgsIDEwKTtcbiAgICB2YXIgdmFsaWRNYXJrcyA9IFtdLmNvbmNhdCh1cHBlckNhc2VBbHBoYWJldCwgbG93ZXJDYXNlQWxwaGFiZXQsIG51bWJlcnMsIFsnPCcsICc+J10pO1xuICAgIHZhciB2YWxpZFJlZ2lzdGVycyA9IFtdLmNvbmNhdCh1cHBlckNhc2VBbHBoYWJldCwgbG93ZXJDYXNlQWxwaGFiZXQsIG51bWJlcnMsIFsnLScsICdcIicsICcuJywgJzonLCAnXycsICcvJywgJysnXSk7XG4gICAgdmFyIHVwcGVyQ2FzZUNoYXJzO1xuICAgIHRyeSB7IHVwcGVyQ2FzZUNoYXJzID0gbmV3IFJlZ0V4cChcIl5bXFxcXHB7THV9XSRcIiwgXCJ1XCIpOyB9XG4gICAgY2F0Y2ggKF8pIHsgdXBwZXJDYXNlQ2hhcnMgPSAvXltBLVpdJC87IH1cblxuICAgIGZ1bmN0aW9uIGlzTGluZShjbSwgbGluZSkge1xuICAgICAgcmV0dXJuIGxpbmUgPj0gY20uZmlyc3RMaW5lKCkgJiYgbGluZSA8PSBjbS5sYXN0TGluZSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0xvd2VyQ2FzZShrKSB7XG4gICAgICByZXR1cm4gKC9eW2Etel0kLykudGVzdChrKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNNYXRjaGFibGVTeW1ib2woaykge1xuICAgICAgcmV0dXJuICcoKVtde30nLmluZGV4T2YoaykgIT0gLTE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTnVtYmVyKGspIHtcbiAgICAgIHJldHVybiBudW1iZXJSZWdleC50ZXN0KGspO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1VwcGVyQ2FzZShrKSB7XG4gICAgICByZXR1cm4gdXBwZXJDYXNlQ2hhcnMudGVzdChrKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNXaGl0ZVNwYWNlU3RyaW5nKGspIHtcbiAgICAgIHJldHVybiAoL15cXHMqJC8pLnRlc3Qoayk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzRW5kT2ZTZW50ZW5jZVN5bWJvbChrKSB7XG4gICAgICByZXR1cm4gJy4/IScuaW5kZXhPZihrKSAhPSAtMTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaW5BcnJheSh2YWwsIGFycikge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFycltpXSA9PSB2YWwpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBvcHRpb25zID0ge307XG4gICAgZnVuY3Rpb24gZGVmaW5lT3B0aW9uKG5hbWUsIGRlZmF1bHRWYWx1ZSwgdHlwZSwgYWxpYXNlcywgY2FsbGJhY2spIHtcbiAgICAgIGlmIChkZWZhdWx0VmFsdWUgPT09IHVuZGVmaW5lZCAmJiAhY2FsbGJhY2spIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ2RlZmF1bHRWYWx1ZSBpcyByZXF1aXJlZCB1bmxlc3MgY2FsbGJhY2sgaXMgcHJvdmlkZWQnKTtcbiAgICAgIH1cbiAgICAgIGlmICghdHlwZSkgeyB0eXBlID0gJ3N0cmluZyc7IH1cbiAgICAgIG9wdGlvbnNbbmFtZV0gPSB7XG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgIGRlZmF1bHRWYWx1ZTogZGVmYXVsdFZhbHVlLFxuICAgICAgICBjYWxsYmFjazogY2FsbGJhY2tcbiAgICAgIH07XG4gICAgICBpZiAoYWxpYXNlcykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFsaWFzZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBvcHRpb25zW2FsaWFzZXNbaV1dID0gb3B0aW9uc1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBzZXRPcHRpb24obmFtZSwgZGVmYXVsdFZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRPcHRpb24obmFtZSwgdmFsdWUsIGNtLCBjZmcpIHtcbiAgICAgIHZhciBvcHRpb24gPSBvcHRpb25zW25hbWVdO1xuICAgICAgY2ZnID0gY2ZnIHx8IHt9O1xuICAgICAgdmFyIHNjb3BlID0gY2ZnLnNjb3BlO1xuICAgICAgaWYgKCFvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignVW5rbm93biBvcHRpb246ICcgKyBuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb24udHlwZSA9PSAnYm9vbGVhbicpIHtcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlICE9PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignSW52YWxpZCBhcmd1bWVudDogJyArIG5hbWUgKyAnPScgKyB2YWx1ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsdWUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgLy8gQm9vbGVhbiBvcHRpb25zIGFyZSBzZXQgdG8gdHJ1ZSBpZiB2YWx1ZSBpcyBub3QgZGVmaW5lZC5cbiAgICAgICAgICB2YWx1ZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb24uY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKHNjb3BlICE9PSAnbG9jYWwnKSB7XG4gICAgICAgICAgb3B0aW9uLmNhbGxiYWNrKHZhbHVlLCB1bmRlZmluZWQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZSAhPT0gJ2dsb2JhbCcgJiYgY20pIHtcbiAgICAgICAgICBvcHRpb24uY2FsbGJhY2sodmFsdWUsIGNtKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNjb3BlICE9PSAnbG9jYWwnKSB7XG4gICAgICAgICAgb3B0aW9uLnZhbHVlID0gb3B0aW9uLnR5cGUgPT0gJ2Jvb2xlYW4nID8gISF2YWx1ZSA6IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZSAhPT0gJ2dsb2JhbCcgJiYgY20pIHtcbiAgICAgICAgICBjbS5zdGF0ZS52aW0ub3B0aW9uc1tuYW1lXSA9IHt2YWx1ZTogdmFsdWV9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0T3B0aW9uKG5hbWUsIGNtLCBjZmcpIHtcbiAgICAgIHZhciBvcHRpb24gPSBvcHRpb25zW25hbWVdO1xuICAgICAgY2ZnID0gY2ZnIHx8IHt9O1xuICAgICAgdmFyIHNjb3BlID0gY2ZnLnNjb3BlO1xuICAgICAgaWYgKCFvcHRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFcnJvcignVW5rbm93biBvcHRpb246ICcgKyBuYW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChvcHRpb24uY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGxvY2FsID0gY20gJiYgb3B0aW9uLmNhbGxiYWNrKHVuZGVmaW5lZCwgY20pO1xuICAgICAgICBpZiAoc2NvcGUgIT09ICdnbG9iYWwnICYmIGxvY2FsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICByZXR1cm4gbG9jYWw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlICE9PSAnbG9jYWwnKSB7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbi5jYWxsYmFjaygpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBsb2NhbCA9IChzY29wZSAhPT0gJ2dsb2JhbCcpICYmIChjbSAmJiBjbS5zdGF0ZS52aW0ub3B0aW9uc1tuYW1lXSk7XG4gICAgICAgIHJldHVybiAobG9jYWwgfHwgKHNjb3BlICE9PSAnbG9jYWwnKSAmJiBvcHRpb24gfHwge30pLnZhbHVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGRlZmluZU9wdGlvbignZmlsZXR5cGUnLCB1bmRlZmluZWQsICdzdHJpbmcnLCBbJ2Z0J10sIGZ1bmN0aW9uKG5hbWUsIGNtKSB7XG4gICAgICAvLyBPcHRpb24gaXMgbG9jYWwuIERvIG5vdGhpbmcgZm9yIGdsb2JhbC5cbiAgICAgIGlmIChjbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFRoZSAnZmlsZXR5cGUnIG9wdGlvbiBwcm94aWVzIHRvIHRoZSBDb2RlTWlycm9yICdtb2RlJyBvcHRpb24uXG4gICAgICBpZiAobmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHZhciBtb2RlID0gY20uZ2V0T3B0aW9uKCdtb2RlJyk7XG4gICAgICAgIHJldHVybiBtb2RlID09ICdudWxsJyA/ICcnIDogbW9kZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBtb2RlID0gbmFtZSA9PSAnJyA/ICdudWxsJyA6IG5hbWU7XG4gICAgICAgIGNtLnNldE9wdGlvbignbW9kZScsIG1vZGUpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgdmFyIGNyZWF0ZUNpcmN1bGFySnVtcExpc3QgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzaXplID0gMTAwO1xuICAgICAgdmFyIHBvaW50ZXIgPSAtMTtcbiAgICAgIHZhciBoZWFkID0gMDtcbiAgICAgIHZhciB0YWlsID0gMDtcbiAgICAgIHZhciBidWZmZXIgPSBuZXcgQXJyYXkoc2l6ZSk7XG4gICAgICBmdW5jdGlvbiBhZGQoY20sIG9sZEN1ciwgbmV3Q3VyKSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gcG9pbnRlciAlIHNpemU7XG4gICAgICAgIHZhciBjdXJNYXJrID0gYnVmZmVyW2N1cnJlbnRdO1xuICAgICAgICBmdW5jdGlvbiB1c2VOZXh0U2xvdChjdXJzb3IpIHtcbiAgICAgICAgICB2YXIgbmV4dCA9ICsrcG9pbnRlciAlIHNpemU7XG4gICAgICAgICAgdmFyIHRyYXNoTWFyayA9IGJ1ZmZlcltuZXh0XTtcbiAgICAgICAgICBpZiAodHJhc2hNYXJrKSB7XG4gICAgICAgICAgICB0cmFzaE1hcmsuY2xlYXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnVmZmVyW25leHRdID0gY20uc2V0Qm9va21hcmsoY3Vyc29yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY3VyTWFyaykge1xuICAgICAgICAgIHZhciBtYXJrUG9zID0gY3VyTWFyay5maW5kKCk7XG4gICAgICAgICAgLy8gYXZvaWQgcmVjb3JkaW5nIHJlZHVuZGFudCBjdXJzb3IgcG9zaXRpb25cbiAgICAgICAgICBpZiAobWFya1BvcyAmJiAhY3Vyc29yRXF1YWwobWFya1Bvcywgb2xkQ3VyKSkge1xuICAgICAgICAgICAgdXNlTmV4dFNsb3Qob2xkQ3VyKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXNlTmV4dFNsb3Qob2xkQ3VyKTtcbiAgICAgICAgfVxuICAgICAgICB1c2VOZXh0U2xvdChuZXdDdXIpO1xuICAgICAgICBoZWFkID0gcG9pbnRlcjtcbiAgICAgICAgdGFpbCA9IHBvaW50ZXIgLSBzaXplICsgMTtcbiAgICAgICAgaWYgKHRhaWwgPCAwKSB7XG4gICAgICAgICAgdGFpbCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIG1vdmUoY20sIG9mZnNldCkge1xuICAgICAgICBwb2ludGVyICs9IG9mZnNldDtcbiAgICAgICAgaWYgKHBvaW50ZXIgPiBoZWFkKSB7XG4gICAgICAgICAgcG9pbnRlciA9IGhlYWQ7XG4gICAgICAgIH0gZWxzZSBpZiAocG9pbnRlciA8IHRhaWwpIHtcbiAgICAgICAgICBwb2ludGVyID0gdGFpbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWFyayA9IGJ1ZmZlclsoc2l6ZSArIHBvaW50ZXIpICUgc2l6ZV07XG4gICAgICAgIC8vIHNraXAgbWFya3MgdGhhdCBhcmUgdGVtcG9yYXJpbHkgcmVtb3ZlZCBmcm9tIHRleHQgYnVmZmVyXG4gICAgICAgIGlmIChtYXJrICYmICFtYXJrLmZpbmQoKSkge1xuICAgICAgICAgIHZhciBpbmMgPSBvZmZzZXQgPiAwID8gMSA6IC0xO1xuICAgICAgICAgIHZhciBuZXdDdXI7XG4gICAgICAgICAgdmFyIG9sZEN1ciA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgIHBvaW50ZXIgKz0gaW5jO1xuICAgICAgICAgICAgbWFyayA9IGJ1ZmZlclsoc2l6ZSArIHBvaW50ZXIpICUgc2l6ZV07XG4gICAgICAgICAgICAvLyBza2lwIG1hcmtzIHRoYXQgYXJlIHRoZSBzYW1lIGFzIGN1cnJlbnQgcG9zaXRpb25cbiAgICAgICAgICAgIGlmIChtYXJrICYmXG4gICAgICAgICAgICAgICAgKG5ld0N1ciA9IG1hcmsuZmluZCgpKSAmJlxuICAgICAgICAgICAgICAgICFjdXJzb3JFcXVhbChvbGRDdXIsIG5ld0N1cikpIHtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSB3aGlsZSAocG9pbnRlciA8IGhlYWQgJiYgcG9pbnRlciA+IHRhaWwpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXJrO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gZmluZChjbSwgb2Zmc2V0KSB7XG4gICAgICAgIHZhciBvbGRQb2ludGVyID0gcG9pbnRlcjtcbiAgICAgICAgdmFyIG1hcmsgPSBtb3ZlKGNtLCBvZmZzZXQpO1xuICAgICAgICBwb2ludGVyID0gb2xkUG9pbnRlcjtcbiAgICAgICAgcmV0dXJuIG1hcmsgJiYgbWFyay5maW5kKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjYWNoZWRDdXJzb3I6IHVuZGVmaW5lZCwgLy91c2VkIGZvciAjIGFuZCAqIGp1bXBzXG4gICAgICAgIGFkZDogYWRkLFxuICAgICAgICBmaW5kOiBmaW5kLFxuICAgICAgICBtb3ZlOiBtb3ZlXG4gICAgICB9O1xuICAgIH07XG5cbiAgICAvLyBSZXR1cm5zIGFuIG9iamVjdCB0byB0cmFjayB0aGUgY2hhbmdlcyBhc3NvY2lhdGVkIGluc2VydCBtb2RlLiAgSXRcbiAgICAvLyBjbG9uZXMgdGhlIG9iamVjdCB0aGF0IGlzIHBhc3NlZCBpbiwgb3IgY3JlYXRlcyBhbiBlbXB0eSBvYmplY3Qgb25lIGlmXG4gICAgLy8gbm9uZSBpcyBwcm92aWRlZC5cbiAgICB2YXIgY3JlYXRlSW5zZXJ0TW9kZUNoYW5nZXMgPSBmdW5jdGlvbihjKSB7XG4gICAgICBpZiAoYykge1xuICAgICAgICAvLyBDb3B5IGNvbnN0cnVjdGlvblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGNoYW5nZXM6IGMuY2hhbmdlcyxcbiAgICAgICAgICBleHBlY3RDdXJzb3JBY3Rpdml0eUZvckNoYW5nZTogYy5leHBlY3RDdXJzb3JBY3Rpdml0eUZvckNoYW5nZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLy8gQ2hhbmdlIGxpc3RcbiAgICAgICAgY2hhbmdlczogW10sXG4gICAgICAgIC8vIFNldCB0byB0cnVlIG9uIGNoYW5nZSwgZmFsc2Ugb24gY3Vyc29yQWN0aXZpdHkuXG4gICAgICAgIGV4cGVjdEN1cnNvckFjdGl2aXR5Rm9yQ2hhbmdlOiBmYWxzZVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gTWFjcm9Nb2RlU3RhdGUoKSB7XG4gICAgICB0aGlzLmxhdGVzdFJlZ2lzdGVyID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuaXNSZWNvcmRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVwbGF5U2VhcmNoUXVlcmllcyA9IFtdO1xuICAgICAgdGhpcy5vblJlY29yZGluZ0RvbmUgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcyA9IGNyZWF0ZUluc2VydE1vZGVDaGFuZ2VzKCk7XG4gICAgfVxuICAgIE1hY3JvTW9kZVN0YXRlLnByb3RvdHlwZSA9IHtcbiAgICAgIGV4aXRNYWNyb1JlY29yZE1vZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgICAgaWYgKG1hY3JvTW9kZVN0YXRlLm9uUmVjb3JkaW5nRG9uZSkge1xuICAgICAgICAgIG1hY3JvTW9kZVN0YXRlLm9uUmVjb3JkaW5nRG9uZSgpOyAvLyBjbG9zZSBkaWFsb2dcbiAgICAgICAgfVxuICAgICAgICBtYWNyb01vZGVTdGF0ZS5vblJlY29yZGluZ0RvbmUgPSB1bmRlZmluZWQ7XG4gICAgICAgIG1hY3JvTW9kZVN0YXRlLmlzUmVjb3JkaW5nID0gZmFsc2U7XG4gICAgICB9LFxuICAgICAgZW50ZXJNYWNyb1JlY29yZE1vZGU6IGZ1bmN0aW9uKGNtLCByZWdpc3Rlck5hbWUpIHtcbiAgICAgICAgdmFyIHJlZ2lzdGVyID1cbiAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5nZXRSZWdpc3RlcihyZWdpc3Rlck5hbWUpO1xuICAgICAgICBpZiAocmVnaXN0ZXIpIHtcbiAgICAgICAgICByZWdpc3Rlci5jbGVhcigpO1xuICAgICAgICAgIHRoaXMubGF0ZXN0UmVnaXN0ZXIgPSByZWdpc3Rlck5hbWU7XG4gICAgICAgICAgaWYgKGNtLm9wZW5EaWFsb2cpIHtcbiAgICAgICAgICAgIHZhciB0ZW1wbGF0ZSA9IGRvbSgnc3BhbicsIHtjbGFzczogJ2NtLXZpbS1tZXNzYWdlJ30sICdyZWNvcmRpbmcgQCcgKyByZWdpc3Rlck5hbWUpO1xuICAgICAgICAgICAgdGhpcy5vblJlY29yZGluZ0RvbmUgPSBjbS5vcGVuRGlhbG9nKHRlbXBsYXRlLCBudWxsLCB7Ym90dG9tOnRydWV9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhpcy5pc1JlY29yZGluZyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbWF5YmVJbml0VmltU3RhdGUoY20pIHtcbiAgICAgIGlmICghY20uc3RhdGUudmltKSB7XG4gICAgICAgIC8vIFN0b3JlIGluc3RhbmNlIHN0YXRlIGluIHRoZSBDb2RlTWlycm9yIG9iamVjdC5cbiAgICAgICAgY20uc3RhdGUudmltID0ge1xuICAgICAgICAgIGlucHV0U3RhdGU6IG5ldyBJbnB1dFN0YXRlKCksXG4gICAgICAgICAgLy8gVmltJ3MgaW5wdXQgc3RhdGUgdGhhdCB0cmlnZ2VyZWQgdGhlIGxhc3QgZWRpdCwgdXNlZCB0byByZXBlYXRcbiAgICAgICAgICAvLyBtb3Rpb25zIGFuZCBvcGVyYXRvcnMgd2l0aCAnLicuXG4gICAgICAgICAgbGFzdEVkaXRJbnB1dFN0YXRlOiB1bmRlZmluZWQsXG4gICAgICAgICAgLy8gVmltJ3MgYWN0aW9uIGNvbW1hbmQgYmVmb3JlIHRoZSBsYXN0IGVkaXQsIHVzZWQgdG8gcmVwZWF0IGFjdGlvbnNcbiAgICAgICAgICAvLyB3aXRoICcuJyBhbmQgaW5zZXJ0IG1vZGUgcmVwZWF0LlxuICAgICAgICAgIGxhc3RFZGl0QWN0aW9uQ29tbWFuZDogdW5kZWZpbmVkLFxuICAgICAgICAgIC8vIFdoZW4gdXNpbmcgamsgZm9yIG5hdmlnYXRpb24sIGlmIHlvdSBtb3ZlIGZyb20gYSBsb25nZXIgbGluZSB0byBhXG4gICAgICAgICAgLy8gc2hvcnRlciBsaW5lLCB0aGUgY3Vyc29yIG1heSBjbGlwIHRvIHRoZSBlbmQgb2YgdGhlIHNob3J0ZXIgbGluZS5cbiAgICAgICAgICAvLyBJZiBqIGlzIHByZXNzZWQgYWdhaW4gYW5kIGN1cnNvciBnb2VzIHRvIHRoZSBuZXh0IGxpbmUsIHRoZVxuICAgICAgICAgIC8vIGN1cnNvciBzaG91bGQgZ28gYmFjayB0byBpdHMgaG9yaXpvbnRhbCBwb3NpdGlvbiBvbiB0aGUgbG9uZ2VyXG4gICAgICAgICAgLy8gbGluZSBpZiBpdCBjYW4uIFRoaXMgaXMgdG8ga2VlcCB0cmFjayBvZiB0aGUgaG9yaXpvbnRhbCBwb3NpdGlvbi5cbiAgICAgICAgICBsYXN0SFBvczogLTEsXG4gICAgICAgICAgLy8gRG9pbmcgdGhlIHNhbWUgd2l0aCBzY3JlZW4tcG9zaXRpb24gZm9yIGdqL2drXG4gICAgICAgICAgbGFzdEhTUG9zOiAtMSxcbiAgICAgICAgICAvLyBUaGUgbGFzdCBtb3Rpb24gY29tbWFuZCBydW4uIENsZWFyZWQgaWYgYSBub24tbW90aW9uIGNvbW1hbmQgZ2V0c1xuICAgICAgICAgIC8vIGV4ZWN1dGVkIGluIGJldHdlZW4uXG4gICAgICAgICAgbGFzdE1vdGlvbjogbnVsbCxcbiAgICAgICAgICBtYXJrczoge30sXG4gICAgICAgICAgaW5zZXJ0TW9kZTogZmFsc2UsXG4gICAgICAgICAgLy8gUmVwZWF0IGNvdW50IGZvciBjaGFuZ2VzIG1hZGUgaW4gaW5zZXJ0IG1vZGUsIHRyaWdnZXJlZCBieSBrZXlcbiAgICAgICAgICAvLyBzZXF1ZW5jZXMgbGlrZSAzLGkuIE9ubHkgZXhpc3RzIHdoZW4gaW5zZXJ0TW9kZSBpcyB0cnVlLlxuICAgICAgICAgIGluc2VydE1vZGVSZXBlYXQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICB2aXN1YWxNb2RlOiBmYWxzZSxcbiAgICAgICAgICAvLyBJZiB3ZSBhcmUgaW4gdmlzdWFsIGxpbmUgbW9kZS4gTm8gZWZmZWN0IGlmIHZpc3VhbE1vZGUgaXMgZmFsc2UuXG4gICAgICAgICAgdmlzdWFsTGluZTogZmFsc2UsXG4gICAgICAgICAgdmlzdWFsQmxvY2s6IGZhbHNlLFxuICAgICAgICAgIGxhc3RTZWxlY3Rpb246IG51bGwsXG4gICAgICAgICAgbGFzdFBhc3RlZFRleHQ6IG51bGwsXG4gICAgICAgICAgc2VsOiB7fSxcbiAgICAgICAgICAvLyBCdWZmZXItbG9jYWwvd2luZG93LWxvY2FsIHZhbHVlcyBvZiB2aW0gb3B0aW9ucy5cbiAgICAgICAgICBvcHRpb25zOiB7fVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNtLnN0YXRlLnZpbTtcbiAgICB9XG4gICAgdmFyIHZpbUdsb2JhbFN0YXRlO1xuICAgIGZ1bmN0aW9uIHJlc2V0VmltR2xvYmFsU3RhdGUoKSB7XG4gICAgICB2aW1HbG9iYWxTdGF0ZSA9IHtcbiAgICAgICAgLy8gVGhlIGN1cnJlbnQgc2VhcmNoIHF1ZXJ5LlxuICAgICAgICBzZWFyY2hRdWVyeTogbnVsbCxcbiAgICAgICAgLy8gV2hldGhlciB3ZSBhcmUgc2VhcmNoaW5nIGJhY2t3YXJkcy5cbiAgICAgICAgc2VhcmNoSXNSZXZlcnNlZDogZmFsc2UsXG4gICAgICAgIC8vIFJlcGxhY2UgcGFydCBvZiB0aGUgbGFzdCBzdWJzdGl0dXRlZCBwYXR0ZXJuXG4gICAgICAgIGxhc3RTdWJzdGl0dXRlUmVwbGFjZVBhcnQ6IHVuZGVmaW5lZCxcbiAgICAgICAganVtcExpc3Q6IGNyZWF0ZUNpcmN1bGFySnVtcExpc3QoKSxcbiAgICAgICAgbWFjcm9Nb2RlU3RhdGU6IG5ldyBNYWNyb01vZGVTdGF0ZSxcbiAgICAgICAgLy8gUmVjb3JkaW5nIGxhdGVzdCBmLCB0LCBGIG9yIFQgbW90aW9uIGNvbW1hbmQuXG4gICAgICAgIGxhc3RDaGFyYWN0ZXJTZWFyY2g6IHtpbmNyZW1lbnQ6MCwgZm9yd2FyZDp0cnVlLCBzZWxlY3RlZENoYXJhY3RlcjonJ30sXG4gICAgICAgIHJlZ2lzdGVyQ29udHJvbGxlcjogbmV3IFJlZ2lzdGVyQ29udHJvbGxlcih7fSksXG4gICAgICAgIC8vIHNlYXJjaCBoaXN0b3J5IGJ1ZmZlclxuICAgICAgICBzZWFyY2hIaXN0b3J5Q29udHJvbGxlcjogbmV3IEhpc3RvcnlDb250cm9sbGVyKCksXG4gICAgICAgIC8vIGV4IENvbW1hbmQgaGlzdG9yeSBidWZmZXJcbiAgICAgICAgZXhDb21tYW5kSGlzdG9yeUNvbnRyb2xsZXIgOiBuZXcgSGlzdG9yeUNvbnRyb2xsZXIoKVxuICAgICAgfTtcbiAgICAgIGZvciAodmFyIG9wdGlvbk5hbWUgaW4gb3B0aW9ucykge1xuICAgICAgICB2YXIgb3B0aW9uID0gb3B0aW9uc1tvcHRpb25OYW1lXTtcbiAgICAgICAgb3B0aW9uLnZhbHVlID0gb3B0aW9uLmRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbGFzdEluc2VydE1vZGVLZXlUaW1lcjtcbiAgICB2YXIgdmltQXBpID0ge1xuICAgICAgZW50ZXJWaW1Nb2RlOiBlbnRlclZpbU1vZGUsXG4gICAgICBsZWF2ZVZpbU1vZGU6IGxlYXZlVmltTW9kZSxcbiAgICAgIGJ1aWxkS2V5TWFwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gVE9ETzogQ29udmVydCBrZXltYXAgaW50byBkaWN0aW9uYXJ5IGZvcm1hdCBmb3IgZmFzdCBsb29rdXAuXG4gICAgICB9LFxuICAgICAgLy8gVGVzdGluZyBob29rLCB0aG91Z2ggaXQgbWlnaHQgYmUgdXNlZnVsIHRvIGV4cG9zZSB0aGUgcmVnaXN0ZXJcbiAgICAgIC8vIGNvbnRyb2xsZXIgYW55d2F5LlxuICAgICAgZ2V0UmVnaXN0ZXJDb250cm9sbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlcjtcbiAgICAgIH0sXG4gICAgICAvLyBUZXN0aW5nIGhvb2suXG4gICAgICByZXNldFZpbUdsb2JhbFN0YXRlXzogcmVzZXRWaW1HbG9iYWxTdGF0ZSxcblxuICAgICAgLy8gVGVzdGluZyBob29rLlxuICAgICAgZ2V0VmltR2xvYmFsU3RhdGVfOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZpbUdsb2JhbFN0YXRlO1xuICAgICAgfSxcblxuICAgICAgLy8gVGVzdGluZyBob29rLlxuICAgICAgbWF5YmVJbml0VmltU3RhdGVfOiBtYXliZUluaXRWaW1TdGF0ZSxcblxuICAgICAgc3VwcHJlc3NFcnJvckxvZ2dpbmc6IGZhbHNlLFxuXG4gICAgICBJbnNlcnRNb2RlS2V5OiBJbnNlcnRNb2RlS2V5LFxuICAgICAgbWFwOiBmdW5jdGlvbihsaHMsIHJocywgY3R4KSB7XG4gICAgICAgIC8vIEFkZCB1c2VyIGRlZmluZWQga2V5IGJpbmRpbmdzLlxuICAgICAgICBleENvbW1hbmREaXNwYXRjaGVyLm1hcChsaHMsIHJocywgY3R4KTtcbiAgICAgIH0sXG4gICAgICB1bm1hcDogZnVuY3Rpb24obGhzLCBjdHgpIHtcbiAgICAgICAgcmV0dXJuIGV4Q29tbWFuZERpc3BhdGNoZXIudW5tYXAobGhzLCBjdHgpO1xuICAgICAgfSxcbiAgICAgIC8vIE5vbi1yZWN1cnNpdmUgbWFwIGZ1bmN0aW9uLlxuICAgICAgLy8gTk9URTogVGhpcyB3aWxsIG5vdCBjcmVhdGUgbWFwcGluZ3MgdG8ga2V5IG1hcHMgdGhhdCBhcmVuJ3QgcHJlc2VudFxuICAgICAgLy8gaW4gdGhlIGRlZmF1bHQga2V5IG1hcC4gU2VlIFRPRE8gYXQgYm90dG9tIG9mIGZ1bmN0aW9uLlxuICAgICAgbm9yZW1hcDogZnVuY3Rpb24obGhzLCByaHMsIGN0eCkge1xuICAgICAgICBmdW5jdGlvbiB0b0N0eEFycmF5KGN0eCkge1xuICAgICAgICAgIHJldHVybiBjdHggPyBbY3R4XSA6IFsnbm9ybWFsJywgJ2luc2VydCcsICd2aXN1YWwnXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY3R4c1RvTWFwID0gdG9DdHhBcnJheShjdHgpO1xuICAgICAgICAvLyBMb29rIHRocm91Z2ggYWxsIGFjdHVhbCBkZWZhdWx0cyB0byBmaW5kIGEgbWFwIGNhbmRpZGF0ZS5cbiAgICAgICAgdmFyIGFjdHVhbExlbmd0aCA9IGRlZmF1bHRLZXltYXAubGVuZ3RoLCBvcmlnTGVuZ3RoID0gZGVmYXVsdEtleW1hcExlbmd0aDtcbiAgICAgICAgZm9yICh2YXIgaSA9IGFjdHVhbExlbmd0aCAtIG9yaWdMZW5ndGg7XG4gICAgICAgICAgICAgaSA8IGFjdHVhbExlbmd0aCAmJiBjdHhzVG9NYXAubGVuZ3RoO1xuICAgICAgICAgICAgIGkrKykge1xuICAgICAgICAgIHZhciBtYXBwaW5nID0gZGVmYXVsdEtleW1hcFtpXTtcbiAgICAgICAgICAvLyBPbWl0IG1hcHBpbmdzIHRoYXQgb3BlcmF0ZSBpbiB0aGUgd3JvbmcgY29udGV4dChzKSBhbmQgdGhvc2Ugb2YgaW52YWxpZCB0eXBlLlxuICAgICAgICAgIGlmIChtYXBwaW5nLmtleXMgPT0gcmhzICYmXG4gICAgICAgICAgICAgICghY3R4IHx8ICFtYXBwaW5nLmNvbnRleHQgfHwgbWFwcGluZy5jb250ZXh0ID09PSBjdHgpICYmXG4gICAgICAgICAgICAgIG1hcHBpbmcudHlwZS5zdWJzdHIoMCwgMikgIT09ICdleCcgJiZcbiAgICAgICAgICAgICAgbWFwcGluZy50eXBlLnN1YnN0cigwLCAzKSAhPT0gJ2tleScpIHtcbiAgICAgICAgICAgIC8vIE1ha2UgYSBzaGFsbG93IGNvcHkgb2YgdGhlIG9yaWdpbmFsIGtleW1hcCBlbnRyeS5cbiAgICAgICAgICAgIHZhciBuZXdNYXBwaW5nID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbWFwcGluZykge1xuICAgICAgICAgICAgICBuZXdNYXBwaW5nW2tleV0gPSBtYXBwaW5nW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBNb2RpZnkgaXQgcG9pbnQgdG8gdGhlIG5ldyBtYXBwaW5nIHdpdGggdGhlIHByb3BlciBjb250ZXh0LlxuICAgICAgICAgICAgbmV3TWFwcGluZy5rZXlzID0gbGhzO1xuICAgICAgICAgICAgaWYgKGN0eCAmJiAhbmV3TWFwcGluZy5jb250ZXh0KSB7XG4gICAgICAgICAgICAgIG5ld01hcHBpbmcuY29udGV4dCA9IGN0eDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEFkZCBpdCB0byB0aGUga2V5bWFwIHdpdGggYSBoaWdoZXIgcHJpb3JpdHkgdGhhbiB0aGUgb3JpZ2luYWwuXG4gICAgICAgICAgICB0aGlzLl9tYXBDb21tYW5kKG5ld01hcHBpbmcpO1xuICAgICAgICAgICAgLy8gUmVjb3JkIHRoZSBtYXBwZWQgY29udGV4dHMgYXMgY29tcGxldGUuXG4gICAgICAgICAgICB2YXIgbWFwcGVkQ3R4cyA9IHRvQ3R4QXJyYXkobWFwcGluZy5jb250ZXh0KTtcbiAgICAgICAgICAgIGN0eHNUb01hcCA9IGN0eHNUb01hcC5maWx0ZXIoZnVuY3Rpb24oZWwpIHsgcmV0dXJuIG1hcHBlZEN0eHMuaW5kZXhPZihlbCkgPT09IC0xOyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gVE9ETzogQ3JlYXRlIG5vbi1yZWN1cnNpdmUga2V5VG9LZXkgbWFwcGluZ3MgZm9yIHRoZSB1bm1hcHBlZCBjb250ZXh0cyBvbmNlIHRob3NlIGV4aXN0LlxuICAgICAgfSxcbiAgICAgIC8vIFJlbW92ZSBhbGwgdXNlci1kZWZpbmVkIG1hcHBpbmdzIGZvciB0aGUgcHJvdmlkZWQgY29udGV4dC5cbiAgICAgIG1hcGNsZWFyOiBmdW5jdGlvbihjdHgpIHtcbiAgICAgICAgLy8gUGFydGl0aW9uIHRoZSBleGlzdGluZyBrZXltYXAgaW50byB1c2VyLWRlZmluZWQgYW5kIHRydWUgZGVmYXVsdHMuXG4gICAgICAgIHZhciBhY3R1YWxMZW5ndGggPSBkZWZhdWx0S2V5bWFwLmxlbmd0aCxcbiAgICAgICAgICAgIG9yaWdMZW5ndGggPSBkZWZhdWx0S2V5bWFwTGVuZ3RoO1xuICAgICAgICB2YXIgdXNlcktleW1hcCA9IGRlZmF1bHRLZXltYXAuc2xpY2UoMCwgYWN0dWFsTGVuZ3RoIC0gb3JpZ0xlbmd0aCk7XG4gICAgICAgIGRlZmF1bHRLZXltYXAgPSBkZWZhdWx0S2V5bWFwLnNsaWNlKGFjdHVhbExlbmd0aCAtIG9yaWdMZW5ndGgpO1xuICAgICAgICBpZiAoY3R4KSB7XG4gICAgICAgICAgLy8gSWYgYSBzcGVjaWZpYyBjb250ZXh0IGlzIGJlaW5nIGNsZWFyZWQsIHdlIG5lZWQgdG8ga2VlcCBtYXBwaW5nc1xuICAgICAgICAgIC8vIGZyb20gYWxsIG90aGVyIGNvbnRleHRzLlxuICAgICAgICAgIGZvciAodmFyIGkgPSB1c2VyS2V5bWFwLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICB2YXIgbWFwcGluZyA9IHVzZXJLZXltYXBbaV07XG4gICAgICAgICAgICBpZiAoY3R4ICE9PSBtYXBwaW5nLmNvbnRleHQpIHtcbiAgICAgICAgICAgICAgaWYgKG1hcHBpbmcuY29udGV4dCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX21hcENvbW1hbmQobWFwcGluZyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYG1hcHBpbmdgIGFwcGxpZXMgdG8gYWxsIGNvbnRleHRzIHNvIGNyZWF0ZSBrZXltYXAgY29waWVzXG4gICAgICAgICAgICAgICAgLy8gZm9yIGVhY2ggY29udGV4dCBleGNlcHQgdGhlIG9uZSBiZWluZyBjbGVhcmVkLlxuICAgICAgICAgICAgICAgIHZhciBjb250ZXh0cyA9IFsnbm9ybWFsJywgJ2luc2VydCcsICd2aXN1YWwnXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqIGluIGNvbnRleHRzKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoY29udGV4dHNbal0gIT09IGN0eCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3TWFwcGluZyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gbWFwcGluZykge1xuICAgICAgICAgICAgICAgICAgICAgIG5ld01hcHBpbmdba2V5XSA9IG1hcHBpbmdba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBuZXdNYXBwaW5nLmNvbnRleHQgPSBjb250ZXh0c1tqXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbWFwQ29tbWFuZChuZXdNYXBwaW5nKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyBUT0RPOiBFeHBvc2Ugc2V0T3B0aW9uIGFuZCBnZXRPcHRpb24gYXMgaW5zdGFuY2UgbWV0aG9kcy4gTmVlZCB0byBkZWNpZGUgaG93IHRvIG5hbWVzcGFjZVxuICAgICAgLy8gdGhlbSwgb3Igc29tZWhvdyBtYWtlIHRoZW0gd29yayB3aXRoIHRoZSBleGlzdGluZyBDb2RlTWlycm9yIHNldE9wdGlvbi9nZXRPcHRpb24gQVBJLlxuICAgICAgc2V0T3B0aW9uOiBzZXRPcHRpb24sXG4gICAgICBnZXRPcHRpb246IGdldE9wdGlvbixcbiAgICAgIGRlZmluZU9wdGlvbjogZGVmaW5lT3B0aW9uLFxuICAgICAgZGVmaW5lRXg6IGZ1bmN0aW9uKG5hbWUsIHByZWZpeCwgZnVuYyl7XG4gICAgICAgIGlmICghcHJlZml4KSB7XG4gICAgICAgICAgcHJlZml4ID0gbmFtZTtcbiAgICAgICAgfSBlbHNlIGlmIChuYW1lLmluZGV4T2YocHJlZml4KSAhPT0gMCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignKFZpbS5kZWZpbmVFeCkgXCInK3ByZWZpeCsnXCIgaXMgbm90IGEgcHJlZml4IG9mIFwiJytuYW1lKydcIiwgY29tbWFuZCBub3QgcmVnaXN0ZXJlZCcpO1xuICAgICAgICB9XG4gICAgICAgIGV4Q29tbWFuZHNbbmFtZV09ZnVuYztcbiAgICAgICAgZXhDb21tYW5kRGlzcGF0Y2hlci5jb21tYW5kTWFwX1twcmVmaXhdPXtuYW1lOm5hbWUsIHNob3J0TmFtZTpwcmVmaXgsIHR5cGU6J2FwaSd9O1xuICAgICAgfSxcbiAgICAgIGhhbmRsZUtleTogZnVuY3Rpb24gKGNtLCBrZXksIG9yaWdpbikge1xuICAgICAgICB2YXIgY29tbWFuZCA9IHRoaXMuZmluZEtleShjbSwga2V5LCBvcmlnaW4pO1xuICAgICAgICBpZiAodHlwZW9mIGNvbW1hbmQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gY29tbWFuZCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbXVsdGlTZWxlY3RIYW5kbGVLZXk6IG11bHRpU2VsZWN0SGFuZGxlS2V5LFxuXG4gICAgICAvKipcbiAgICAgICAqIFRoaXMgaXMgdGhlIG91dGVybW9zdCBmdW5jdGlvbiBjYWxsZWQgYnkgQ29kZU1pcnJvciwgYWZ0ZXIga2V5cyBoYXZlXG4gICAgICAgKiBiZWVuIG1hcHBlZCB0byB0aGVpciBWaW0gZXF1aXZhbGVudHMuXG4gICAgICAgKlxuICAgICAgICogRmluZHMgYSBjb21tYW5kIGJhc2VkIG9uIHRoZSBrZXkgKGFuZCBjYWNoZWQga2V5cyBpZiB0aGVyZSBpcyBhXG4gICAgICAgKiBtdWx0aS1rZXkgc2VxdWVuY2UpLiBSZXR1cm5zIGB1bmRlZmluZWRgIGlmIG5vIGtleSBpcyBtYXRjaGVkLCBhIG5vb3BcbiAgICAgICAqIGZ1bmN0aW9uIGlmIGEgcGFydGlhbCBtYXRjaCBpcyBmb3VuZCAobXVsdGkta2V5KSwgYW5kIGEgZnVuY3Rpb24gdG9cbiAgICAgICAqIGV4ZWN1dGUgdGhlIGJvdW5kIGNvbW1hbmQgaWYgYSBhIGtleSBpcyBtYXRjaGVkLiBUaGUgZnVuY3Rpb24gYWx3YXlzXG4gICAgICAgKiByZXR1cm5zIHRydWUuXG4gICAgICAgKi9cbiAgICAgIGZpbmRLZXk6IGZ1bmN0aW9uKGNtLCBrZXksIG9yaWdpbikge1xuICAgICAgICB2YXIgdmltID0gbWF5YmVJbml0VmltU3RhdGUoY20pO1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGVNYWNyb1JlY29yZGluZygpIHtcbiAgICAgICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgICAgICBpZiAobWFjcm9Nb2RlU3RhdGUuaXNSZWNvcmRpbmcpIHtcbiAgICAgICAgICAgIGlmIChrZXkgPT0gJ3EnKSB7XG4gICAgICAgICAgICAgIG1hY3JvTW9kZVN0YXRlLmV4aXRNYWNyb1JlY29yZE1vZGUoKTtcbiAgICAgICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3JpZ2luICE9ICdtYXBwaW5nJykge1xuICAgICAgICAgICAgICBsb2dLZXkobWFjcm9Nb2RlU3RhdGUsIGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUVzYygpIHtcbiAgICAgICAgICBpZiAoa2V5ID09ICc8RXNjPicpIHtcbiAgICAgICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgICAvLyBHZXQgYmFjayB0byBub3JtYWwgbW9kZS5cbiAgICAgICAgICAgICAgZXhpdFZpc3VhbE1vZGUoY20pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2aW0uaW5zZXJ0TW9kZSkge1xuICAgICAgICAgICAgICAvLyBHZXQgYmFjayB0byBub3JtYWwgbW9kZS5cbiAgICAgICAgICAgICAgZXhpdEluc2VydE1vZGUoY20pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gV2UncmUgYWxyZWFkeSBpbiBub3JtYWwgbW9kZS4gTGV0ICc8RXNjPicgYmUgaGFuZGxlZCBub3JtYWxseS5cbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBkb0tleVRvS2V5KGtleXMpIHtcbiAgICAgICAgICAvLyBUT0RPOiBwcmV2ZW50IGluZmluaXRlIHJlY3Vyc2lvbi5cbiAgICAgICAgICB2YXIgbWF0Y2g7XG4gICAgICAgICAgd2hpbGUgKGtleXMpIHtcbiAgICAgICAgICAgIC8vIFB1bGwgb2ZmIG9uZSBjb21tYW5kIGtleSwgd2hpY2ggaXMgZWl0aGVyIGEgc2luZ2xlIGNoYXJhY3RlclxuICAgICAgICAgICAgLy8gb3IgYSBzcGVjaWFsIHNlcXVlbmNlIHdyYXBwZWQgaW4gJzwnIGFuZCAnPicsIGUuZy4gJzxTcGFjZT4nLlxuICAgICAgICAgICAgbWF0Y2ggPSAoLzxcXHcrLS4rPz58PFxcdys+fC4vKS5leGVjKGtleXMpO1xuICAgICAgICAgICAga2V5ID0gbWF0Y2hbMF07XG4gICAgICAgICAgICBrZXlzID0ga2V5cy5zdWJzdHJpbmcobWF0Y2guaW5kZXggKyBrZXkubGVuZ3RoKTtcbiAgICAgICAgICAgIHZpbUFwaS5oYW5kbGVLZXkoY20sIGtleSwgJ21hcHBpbmcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVLZXlJbnNlcnRNb2RlKCkge1xuICAgICAgICAgIGlmIChoYW5kbGVFc2MoKSkgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICAgIHZhciBrZXlzID0gdmltLmlucHV0U3RhdGUua2V5QnVmZmVyID0gdmltLmlucHV0U3RhdGUua2V5QnVmZmVyICsga2V5O1xuICAgICAgICAgIHZhciBrZXlzQXJlQ2hhcnMgPSBrZXkubGVuZ3RoID09IDE7XG4gICAgICAgICAgdmFyIG1hdGNoID0gY29tbWFuZERpc3BhdGNoZXIubWF0Y2hDb21tYW5kKGtleXMsIGRlZmF1bHRLZXltYXAsIHZpbS5pbnB1dFN0YXRlLCAnaW5zZXJ0Jyk7XG4gICAgICAgICAgLy8gTmVlZCB0byBjaGVjayBhbGwga2V5IHN1YnN0cmluZ3MgaW4gaW5zZXJ0IG1vZGUuXG4gICAgICAgICAgd2hpbGUgKGtleXMubGVuZ3RoID4gMSAmJiBtYXRjaC50eXBlICE9ICdmdWxsJykge1xuICAgICAgICAgICAgdmFyIGtleXMgPSB2aW0uaW5wdXRTdGF0ZS5rZXlCdWZmZXIgPSBrZXlzLnNsaWNlKDEpO1xuICAgICAgICAgICAgdmFyIHRoaXNNYXRjaCA9IGNvbW1hbmREaXNwYXRjaGVyLm1hdGNoQ29tbWFuZChrZXlzLCBkZWZhdWx0S2V5bWFwLCB2aW0uaW5wdXRTdGF0ZSwgJ2luc2VydCcpO1xuICAgICAgICAgICAgaWYgKHRoaXNNYXRjaC50eXBlICE9ICdub25lJykgeyBtYXRjaCA9IHRoaXNNYXRjaDsgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobWF0Y2gudHlwZSA9PSAnbm9uZScpIHsgY2xlYXJJbnB1dFN0YXRlKGNtKTsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgICAgZWxzZSBpZiAobWF0Y2gudHlwZSA9PSAncGFydGlhbCcpIHtcbiAgICAgICAgICAgIGlmIChsYXN0SW5zZXJ0TW9kZUtleVRpbWVyKSB7IHdpbmRvdy5jbGVhclRpbWVvdXQobGFzdEluc2VydE1vZGVLZXlUaW1lcik7IH1cbiAgICAgICAgICAgIGxhc3RJbnNlcnRNb2RlS2V5VGltZXIgPSB3aW5kb3cuc2V0VGltZW91dChcbiAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7IGlmICh2aW0uaW5zZXJ0TW9kZSAmJiB2aW0uaW5wdXRTdGF0ZS5rZXlCdWZmZXIpIHsgY2xlYXJJbnB1dFN0YXRlKGNtKTsgfSB9LFxuICAgICAgICAgICAgICBnZXRPcHRpb24oJ2luc2VydE1vZGVFc2NLZXlzVGltZW91dCcpKTtcbiAgICAgICAgICAgIHJldHVybiAha2V5c0FyZUNoYXJzO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChsYXN0SW5zZXJ0TW9kZUtleVRpbWVyKSB7IHdpbmRvdy5jbGVhclRpbWVvdXQobGFzdEluc2VydE1vZGVLZXlUaW1lcik7IH1cbiAgICAgICAgICBpZiAoa2V5c0FyZUNoYXJzKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9ucyA9IGNtLmxpc3RTZWxlY3Rpb25zKCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIGhlcmUgPSBzZWxlY3Rpb25zW2ldLmhlYWQ7XG4gICAgICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZSgnJywgb2Zmc2V0Q3Vyc29yKGhlcmUsIDAsIC0oa2V5cy5sZW5ndGggLSAxKSksIGhlcmUsICcraW5wdXQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcy5jaGFuZ2VzLnBvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjbGVhcklucHV0U3RhdGUoY20pO1xuICAgICAgICAgIHJldHVybiBtYXRjaC5jb21tYW5kO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlS2V5Tm9uSW5zZXJ0TW9kZSgpIHtcbiAgICAgICAgICBpZiAoaGFuZGxlTWFjcm9SZWNvcmRpbmcoKSB8fCBoYW5kbGVFc2MoKSkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gICAgICAgICAgdmFyIGtleXMgPSB2aW0uaW5wdXRTdGF0ZS5rZXlCdWZmZXIgPSB2aW0uaW5wdXRTdGF0ZS5rZXlCdWZmZXIgKyBrZXk7XG4gICAgICAgICAgaWYgKC9eWzEtOV1cXGQqJC8udGVzdChrZXlzKSkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gICAgICAgICAgdmFyIGtleXNNYXRjaGVyID0gL14oXFxkKikoLiopJC8uZXhlYyhrZXlzKTtcbiAgICAgICAgICBpZiAoIWtleXNNYXRjaGVyKSB7IGNsZWFySW5wdXRTdGF0ZShjbSk7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICAgIHZhciBjb250ZXh0ID0gdmltLnZpc3VhbE1vZGUgPyAndmlzdWFsJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdub3JtYWwnO1xuICAgICAgICAgIHZhciBtYWluS2V5ID0ga2V5c01hdGNoZXJbMl0gfHwga2V5c01hdGNoZXJbMV07XG4gICAgICAgICAgaWYgKHZpbS5pbnB1dFN0YXRlLm9wZXJhdG9yU2hvcnRjdXQgJiYgdmltLmlucHV0U3RhdGUub3BlcmF0b3JTaG9ydGN1dC5zbGljZSgtMSkgPT0gbWFpbktleSkge1xuICAgICAgICAgICAgLy8gbXVsdGlrZXkgb3BlcmF0b3JzIGFjdCBsaW5ld2lzZSBieSByZXBlYXRpbmcgb25seSB0aGUgbGFzdCBjaGFyYWN0ZXJcbiAgICAgICAgICAgIG1haW5LZXkgPSB2aW0uaW5wdXRTdGF0ZS5vcGVyYXRvclNob3J0Y3V0O1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgbWF0Y2ggPSBjb21tYW5kRGlzcGF0Y2hlci5tYXRjaENvbW1hbmQobWFpbktleSwgZGVmYXVsdEtleW1hcCwgdmltLmlucHV0U3RhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChtYXRjaC50eXBlID09ICdub25lJykgeyBjbGVhcklucHV0U3RhdGUoY20pOyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgICBlbHNlIGlmIChtYXRjaC50eXBlID09ICdwYXJ0aWFsJykgeyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICAgIGVsc2UgaWYgKG1hdGNoLnR5cGUgPT0gJ2NsZWFyJykgeyBjbGVhcklucHV0U3RhdGUoY20pOyByZXR1cm4gdHJ1ZTsgfVxuXG4gICAgICAgICAgdmltLmlucHV0U3RhdGUua2V5QnVmZmVyID0gJyc7XG4gICAgICAgICAga2V5c01hdGNoZXIgPSAvXihcXGQqKSguKikkLy5leGVjKGtleXMpO1xuICAgICAgICAgIGlmIChrZXlzTWF0Y2hlclsxXSAmJiBrZXlzTWF0Y2hlclsxXSAhPSAnMCcpIHtcbiAgICAgICAgICAgIHZpbS5pbnB1dFN0YXRlLnB1c2hSZXBlYXREaWdpdChrZXlzTWF0Y2hlclsxXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtYXRjaC5jb21tYW5kO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNvbW1hbmQ7XG4gICAgICAgIGlmICh2aW0uaW5zZXJ0TW9kZSkgeyBjb21tYW5kID0gaGFuZGxlS2V5SW5zZXJ0TW9kZSgpOyB9XG4gICAgICAgIGVsc2UgeyBjb21tYW5kID0gaGFuZGxlS2V5Tm9uSW5zZXJ0TW9kZSgpOyB9XG4gICAgICAgIGlmIChjb21tYW5kID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7IC8vYWNlX3BhdGNoXG4gICAgICAgIH0gZWxzZSBpZiAoY29tbWFuZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIFRPRE86IExvb2sgaW50byB1c2luZyBDb2RlTWlycm9yJ3MgbXVsdGkta2V5IGhhbmRsaW5nLlxuICAgICAgICAgIC8vIFJldHVybiBuby1vcCBzaW5jZSB3ZSBhcmUgY2FjaGluZyB0aGUga2V5LiBDb3VudHMgYXMgaGFuZGxlZCwgYnV0XG4gICAgICAgICAgLy8gZG9uJ3Qgd2FudCBhY3Qgb24gaXQganVzdCB5ZXQuXG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoKGNvbW1hbmQub3BlcmF0b3IgfHwgY29tbWFuZC5pc0VkaXQpICYmIGNtLmdldE9wdGlvbigncmVhZE9ubHknKSlcbiAgICAgICAgICAgICAgcmV0dXJuOyAvLyBhY2VfcGF0Y2hcbiAgICAgICAgICAgIHJldHVybiBjbS5vcGVyYXRpb24oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGNtLmN1ck9wLmlzVmltT3AgPSB0cnVlO1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGlmIChjb21tYW5kLnR5cGUgPT0gJ2tleVRvS2V5Jykge1xuICAgICAgICAgICAgICAgICAgZG9LZXlUb0tleShjb21tYW5kLnRvS2V5cyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNvbW1hbmREaXNwYXRjaGVyLnByb2Nlc3NDb21tYW5kKGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIGNsZWFyIFZJTSBzdGF0ZSBpbiBjYXNlIGl0J3MgaW4gYSBiYWQgc3RhdGUuXG4gICAgICAgICAgICAgICAgY20uc3RhdGUudmltID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIG1heWJlSW5pdFZpbVN0YXRlKGNtKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpbUFwaS5zdXBwcmVzc0Vycm9yTG9nZ2luZykge1xuICAgICAgICAgICAgICAgICAgY29uc29sZVsnbG9nJ10oZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaGFuZGxlRXg6IGZ1bmN0aW9uKGNtLCBpbnB1dCkge1xuICAgICAgICBleENvbW1hbmREaXNwYXRjaGVyLnByb2Nlc3NDb21tYW5kKGNtLCBpbnB1dCk7XG4gICAgICB9LFxuXG4gICAgICBkZWZpbmVNb3Rpb246IGRlZmluZU1vdGlvbixcbiAgICAgIGRlZmluZUFjdGlvbjogZGVmaW5lQWN0aW9uLFxuICAgICAgZGVmaW5lT3BlcmF0b3I6IGRlZmluZU9wZXJhdG9yLFxuICAgICAgbWFwQ29tbWFuZDogbWFwQ29tbWFuZCxcbiAgICAgIF9tYXBDb21tYW5kOiBfbWFwQ29tbWFuZCxcblxuICAgICAgZGVmaW5lUmVnaXN0ZXI6IGRlZmluZVJlZ2lzdGVyLFxuXG4gICAgICBleGl0VmlzdWFsTW9kZTogZXhpdFZpc3VhbE1vZGUsXG4gICAgICBleGl0SW5zZXJ0TW9kZTogZXhpdEluc2VydE1vZGVcbiAgICB9O1xuXG4gICAgLy8gUmVwcmVzZW50cyB0aGUgY3VycmVudCBpbnB1dCBzdGF0ZS5cbiAgICBmdW5jdGlvbiBJbnB1dFN0YXRlKCkge1xuICAgICAgdGhpcy5wcmVmaXhSZXBlYXQgPSBbXTtcbiAgICAgIHRoaXMubW90aW9uUmVwZWF0ID0gW107XG5cbiAgICAgIHRoaXMub3BlcmF0b3IgPSBudWxsO1xuICAgICAgdGhpcy5vcGVyYXRvckFyZ3MgPSBudWxsO1xuICAgICAgdGhpcy5tb3Rpb24gPSBudWxsO1xuICAgICAgdGhpcy5tb3Rpb25BcmdzID0gbnVsbDtcbiAgICAgIHRoaXMua2V5QnVmZmVyID0gW107IC8vIEZvciBtYXRjaGluZyBtdWx0aS1rZXkgY29tbWFuZHMuXG4gICAgICB0aGlzLnJlZ2lzdGVyTmFtZSA9IG51bGw7IC8vIERlZmF1bHRzIHRvIHRoZSB1bm5hbWVkIHJlZ2lzdGVyLlxuICAgIH1cbiAgICBJbnB1dFN0YXRlLnByb3RvdHlwZS5wdXNoUmVwZWF0RGlnaXQgPSBmdW5jdGlvbihuKSB7XG4gICAgICBpZiAoIXRoaXMub3BlcmF0b3IpIHtcbiAgICAgICAgdGhpcy5wcmVmaXhSZXBlYXQgPSB0aGlzLnByZWZpeFJlcGVhdC5jb25jYXQobik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1vdGlvblJlcGVhdCA9IHRoaXMubW90aW9uUmVwZWF0LmNvbmNhdChuKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIElucHV0U3RhdGUucHJvdG90eXBlLmdldFJlcGVhdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlcGVhdCA9IDA7XG4gICAgICBpZiAodGhpcy5wcmVmaXhSZXBlYXQubGVuZ3RoID4gMCB8fCB0aGlzLm1vdGlvblJlcGVhdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlcGVhdCA9IDE7XG4gICAgICAgIGlmICh0aGlzLnByZWZpeFJlcGVhdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmVwZWF0ICo9IHBhcnNlSW50KHRoaXMucHJlZml4UmVwZWF0LmpvaW4oJycpLCAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubW90aW9uUmVwZWF0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXBlYXQgKj0gcGFyc2VJbnQodGhpcy5tb3Rpb25SZXBlYXQuam9pbignJyksIDEwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcGVhdDtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2xlYXJJbnB1dFN0YXRlKGNtLCByZWFzb24pIHtcbiAgICAgIGNtLnN0YXRlLnZpbS5pbnB1dFN0YXRlID0gbmV3IElucHV0U3RhdGUoKTtcbiAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCAndmltLWNvbW1hbmQtZG9uZScsIHJlYXNvbik7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBSZWdpc3RlciBzdG9yZXMgaW5mb3JtYXRpb24gYWJvdXQgY29weSBhbmQgcGFzdGUgcmVnaXN0ZXJzLiAgQmVzaWRlc1xuICAgICAqIHRleHQsIGEgcmVnaXN0ZXIgbXVzdCBzdG9yZSB3aGV0aGVyIGl0IGlzIGxpbmV3aXNlIChpLmUuLCB3aGVuIGl0IGlzXG4gICAgICogcGFzdGVkLCBzaG91bGQgaXQgaW5zZXJ0IGl0c2VsZiBpbnRvIGEgbmV3IGxpbmUsIG9yIHNob3VsZCB0aGUgdGV4dCBiZVxuICAgICAqIGluc2VydGVkIGF0IHRoZSBjdXJzb3IgcG9zaXRpb24uKVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFJlZ2lzdGVyKHRleHQsIGxpbmV3aXNlLCBibG9ja3dpc2UpIHtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHRoaXMua2V5QnVmZmVyID0gW3RleHQgfHwgJyddO1xuICAgICAgdGhpcy5pbnNlcnRNb2RlQ2hhbmdlcyA9IFtdO1xuICAgICAgdGhpcy5zZWFyY2hRdWVyaWVzID0gW107XG4gICAgICB0aGlzLmxpbmV3aXNlID0gISFsaW5ld2lzZTtcbiAgICAgIHRoaXMuYmxvY2t3aXNlID0gISFibG9ja3dpc2U7XG4gICAgfVxuICAgIFJlZ2lzdGVyLnByb3RvdHlwZSA9IHtcbiAgICAgIHNldFRleHQ6IGZ1bmN0aW9uKHRleHQsIGxpbmV3aXNlLCBibG9ja3dpc2UpIHtcbiAgICAgICAgdGhpcy5rZXlCdWZmZXIgPSBbdGV4dCB8fCAnJ107XG4gICAgICAgIHRoaXMubGluZXdpc2UgPSAhIWxpbmV3aXNlO1xuICAgICAgICB0aGlzLmJsb2Nrd2lzZSA9ICEhYmxvY2t3aXNlO1xuICAgICAgfSxcbiAgICAgIHB1c2hUZXh0OiBmdW5jdGlvbih0ZXh0LCBsaW5ld2lzZSkge1xuICAgICAgICAvLyBpZiB0aGlzIHJlZ2lzdGVyIGhhcyBldmVyIGJlZW4gc2V0IHRvIGxpbmV3aXNlLCB1c2UgbGluZXdpc2UuXG4gICAgICAgIGlmIChsaW5ld2lzZSkge1xuICAgICAgICAgIGlmICghdGhpcy5saW5ld2lzZSkge1xuICAgICAgICAgICAgdGhpcy5rZXlCdWZmZXIucHVzaCgnXFxuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubGluZXdpc2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMua2V5QnVmZmVyLnB1c2godGV4dCk7XG4gICAgICB9LFxuICAgICAgcHVzaEluc2VydE1vZGVDaGFuZ2VzOiBmdW5jdGlvbihjaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuaW5zZXJ0TW9kZUNoYW5nZXMucHVzaChjcmVhdGVJbnNlcnRNb2RlQ2hhbmdlcyhjaGFuZ2VzKSk7XG4gICAgICB9LFxuICAgICAgcHVzaFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbihxdWVyeSkge1xuICAgICAgICB0aGlzLnNlYXJjaFF1ZXJpZXMucHVzaChxdWVyeSk7XG4gICAgICB9LFxuICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmtleUJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLmluc2VydE1vZGVDaGFuZ2VzID0gW107XG4gICAgICAgIHRoaXMuc2VhcmNoUXVlcmllcyA9IFtdO1xuICAgICAgICB0aGlzLmxpbmV3aXNlID0gZmFsc2U7XG4gICAgICB9LFxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlCdWZmZXIuam9pbignJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgYW4gZXh0ZXJuYWwgcmVnaXN0ZXIuXG4gICAgICpcbiAgICAgKiBUaGUgbmFtZSBzaG91bGQgYmUgYSBzaW5nbGUgY2hhcmFjdGVyIHRoYXQgd2lsbCBiZSB1c2VkIHRvIHJlZmVyZW5jZSB0aGUgcmVnaXN0ZXIuXG4gICAgICogVGhlIHJlZ2lzdGVyIHNob3VsZCBzdXBwb3J0IHNldFRleHQsIHB1c2hUZXh0LCBjbGVhciwgYW5kIHRvU3RyaW5nKCkuIFNlZSBSZWdpc3RlclxuICAgICAqIGZvciBhIHJlZmVyZW5jZSBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkZWZpbmVSZWdpc3RlcihuYW1lLCByZWdpc3Rlcikge1xuICAgICAgdmFyIHJlZ2lzdGVycyA9IHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5yZWdpc3RlcnM7XG4gICAgICBpZiAoIW5hbWUgfHwgbmFtZS5sZW5ndGggIT0gMSkge1xuICAgICAgICB0aHJvdyBFcnJvcignUmVnaXN0ZXIgbmFtZSBtdXN0IGJlIDEgY2hhcmFjdGVyJyk7XG4gICAgICB9XG4gICAgICAvLyBhY2VfcGF0Y2hcbiAgICAgIHJlZ2lzdGVyc1tuYW1lXSA9IHJlZ2lzdGVyO1xuICAgICAgdmFsaWRSZWdpc3RlcnMucHVzaChuYW1lKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIHZpbSByZWdpc3RlcnMgYWxsb3cgeW91IHRvIGtlZXAgbWFueSBpbmRlcGVuZGVudCBjb3B5IGFuZCBwYXN0ZSBidWZmZXJzLlxuICAgICAqIFNlZSBodHRwOi8vdXNldmltLmNvbS8yMDEyLzA0LzEzL3JlZ2lzdGVycy8gZm9yIGFuIGludHJvZHVjdGlvbi5cbiAgICAgKlxuICAgICAqIFJlZ2lzdGVyQ29udHJvbGxlciBrZWVwcyB0aGUgc3RhdGUgb2YgYWxsIHRoZSByZWdpc3RlcnMuICBBbiBpbml0aWFsXG4gICAgICogc3RhdGUgbWF5IGJlIHBhc3NlZCBpbi4gIFRoZSB1bm5hbWVkIHJlZ2lzdGVyICdcIicgd2lsbCBhbHdheXMgYmVcbiAgICAgKiBvdmVycmlkZGVuLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFJlZ2lzdGVyQ29udHJvbGxlcihyZWdpc3RlcnMpIHtcbiAgICAgIHRoaXMucmVnaXN0ZXJzID0gcmVnaXN0ZXJzO1xuICAgICAgdGhpcy51bm5hbWVkUmVnaXN0ZXIgPSByZWdpc3RlcnNbJ1wiJ10gPSBuZXcgUmVnaXN0ZXIoKTtcbiAgICAgIHJlZ2lzdGVyc1snLiddID0gbmV3IFJlZ2lzdGVyKCk7XG4gICAgICByZWdpc3RlcnNbJzonXSA9IG5ldyBSZWdpc3RlcigpO1xuICAgICAgcmVnaXN0ZXJzWycvJ10gPSBuZXcgUmVnaXN0ZXIoKTtcbiAgICAgIHJlZ2lzdGVyc1snKyddID0gbmV3IFJlZ2lzdGVyKCk7XG4gICAgfVxuICAgIFJlZ2lzdGVyQ29udHJvbGxlci5wcm90b3R5cGUgPSB7XG4gICAgICBwdXNoVGV4dDogZnVuY3Rpb24ocmVnaXN0ZXJOYW1lLCBvcGVyYXRvciwgdGV4dCwgbGluZXdpc2UsIGJsb2Nrd2lzZSkge1xuICAgICAgICAvLyBUaGUgYmxhY2sgaG9sZSByZWdpc3RlciwgXCJfLCBtZWFucyBkZWxldGUveWFuayB0byBub3doZXJlLlxuICAgICAgICBpZiAocmVnaXN0ZXJOYW1lID09PSAnXycpIHJldHVybjtcbiAgICAgICAgaWYgKGxpbmV3aXNlICYmIHRleHQuY2hhckF0KHRleHQubGVuZ3RoIC0gMSkgIT09ICdcXG4nKXtcbiAgICAgICAgICB0ZXh0ICs9ICdcXG4nO1xuICAgICAgICB9XG4gICAgICAgIC8vIExvd2VyY2FzZSBhbmQgdXBwZXJjYXNlIHJlZ2lzdGVycyByZWZlciB0byB0aGUgc2FtZSByZWdpc3Rlci5cbiAgICAgICAgLy8gVXBwZXJjYXNlIGp1c3QgbWVhbnMgYXBwZW5kLlxuICAgICAgICB2YXIgcmVnaXN0ZXIgPSB0aGlzLmlzVmFsaWRSZWdpc3RlcihyZWdpc3Rlck5hbWUpID9cbiAgICAgICAgICAgIHRoaXMuZ2V0UmVnaXN0ZXIocmVnaXN0ZXJOYW1lKSA6IG51bGw7XG4gICAgICAgIC8vIGlmIG5vIHJlZ2lzdGVyL2FuIGludmFsaWQgcmVnaXN0ZXIgd2FzIHNwZWNpZmllZCwgdGhpbmdzIGdvIHRvIHRoZVxuICAgICAgICAvLyBkZWZhdWx0IHJlZ2lzdGVyc1xuICAgICAgICBpZiAoIXJlZ2lzdGVyKSB7XG4gICAgICAgICAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgICAgICAgICAgY2FzZSAneWFuayc6XG4gICAgICAgICAgICAgIC8vIFRoZSAwIHJlZ2lzdGVyIGNvbnRhaW5zIHRoZSB0ZXh0IGZyb20gdGhlIG1vc3QgcmVjZW50IHlhbmsuXG4gICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJzWycwJ10gPSBuZXcgUmVnaXN0ZXIodGV4dCwgbGluZXdpc2UsIGJsb2Nrd2lzZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgICAgICAgIGNhc2UgJ2NoYW5nZSc6XG4gICAgICAgICAgICAgIGlmICh0ZXh0LmluZGV4T2YoJ1xcbicpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gRGVsZXRlIGxlc3MgdGhhbiAxIGxpbmUuIFVwZGF0ZSB0aGUgc21hbGwgZGVsZXRlIHJlZ2lzdGVyLlxuICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJzWyctJ10gPSBuZXcgUmVnaXN0ZXIodGV4dCwgbGluZXdpc2UpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFNoaWZ0IGRvd24gdGhlIGNvbnRlbnRzIG9mIHRoZSBudW1iZXJlZCByZWdpc3RlcnMgYW5kIHB1dCB0aGVcbiAgICAgICAgICAgICAgICAvLyBkZWxldGVkIHRleHQgaW50byByZWdpc3RlciAxLlxuICAgICAgICAgICAgICAgIHRoaXMuc2hpZnROdW1lcmljUmVnaXN0ZXJzXygpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJzWycxJ10gPSBuZXcgUmVnaXN0ZXIodGV4dCwgbGluZXdpc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIHVubmFtZWQgcmVnaXN0ZXIgaXMgc2V0IHRvIHdoYXQganVzdCBoYXBwZW5lZFxuICAgICAgICAgIHRoaXMudW5uYW1lZFJlZ2lzdGVyLnNldFRleHQodGV4dCwgbGluZXdpc2UsIGJsb2Nrd2lzZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgd2UndmUgZ290dGVuIHRvIHRoaXMgcG9pbnQsIHdlJ3ZlIGFjdHVhbGx5IHNwZWNpZmllZCBhIHJlZ2lzdGVyXG4gICAgICAgIHZhciBhcHBlbmQgPSBpc1VwcGVyQ2FzZShyZWdpc3Rlck5hbWUpO1xuICAgICAgICBpZiAoYXBwZW5kKSB7XG4gICAgICAgICAgcmVnaXN0ZXIucHVzaFRleHQodGV4dCwgbGluZXdpc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlZ2lzdGVyLnNldFRleHQodGV4dCwgbGluZXdpc2UsIGJsb2Nrd2lzZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZ2lzdGVyTmFtZSA9PT0gJysnICYmIHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgdHlwZW9mIG5hdmlnYXRvci5jbGlwYm9hcmQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgdHlwZW9mIG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGUgdW5uYW1lZCByZWdpc3RlciBhbHdheXMgaGFzIHRoZSBzYW1lIHZhbHVlIGFzIHRoZSBsYXN0IHVzZWRcbiAgICAgICAgLy8gcmVnaXN0ZXIuXG4gICAgICAgIHRoaXMudW5uYW1lZFJlZ2lzdGVyLnNldFRleHQocmVnaXN0ZXIudG9TdHJpbmcoKSwgbGluZXdpc2UpO1xuICAgICAgfSxcbiAgICAgIC8vIEdldHMgdGhlIHJlZ2lzdGVyIG5hbWVkIEBuYW1lLiAgSWYgb25lIG9mIEBuYW1lIGRvZXNuJ3QgYWxyZWFkeSBleGlzdCxcbiAgICAgIC8vIGNyZWF0ZSBpdC4gIElmIEBuYW1lIGlzIGludmFsaWQsIHJldHVybiB0aGUgdW5uYW1lZFJlZ2lzdGVyLlxuICAgICAgZ2V0UmVnaXN0ZXI6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWRSZWdpc3RlcihuYW1lKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnVubmFtZWRSZWdpc3RlcjtcbiAgICAgICAgfVxuICAgICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoIXRoaXMucmVnaXN0ZXJzW25hbWVdKSB7XG4gICAgICAgICAgdGhpcy5yZWdpc3RlcnNbbmFtZV0gPSBuZXcgUmVnaXN0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcnNbbmFtZV07XG4gICAgICB9LFxuICAgICAgaXNWYWxpZFJlZ2lzdGVyOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHJldHVybiBuYW1lICYmIGluQXJyYXkobmFtZSwgdmFsaWRSZWdpc3RlcnMpO1xuICAgICAgfSxcbiAgICAgIHNoaWZ0TnVtZXJpY1JlZ2lzdGVyc186IGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gOTsgaSA+PSAyOyBpLS0pIHtcbiAgICAgICAgICB0aGlzLnJlZ2lzdGVyc1tpXSA9IHRoaXMuZ2V0UmVnaXN0ZXIoJycgKyAoaSAtIDEpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgZnVuY3Rpb24gSGlzdG9yeUNvbnRyb2xsZXIoKSB7XG4gICAgICAgIHRoaXMuaGlzdG9yeUJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLml0ZXJhdG9yID0gMDtcbiAgICAgICAgdGhpcy5pbml0aWFsUHJlZml4ID0gbnVsbDtcbiAgICB9XG4gICAgSGlzdG9yeUNvbnRyb2xsZXIucHJvdG90eXBlID0ge1xuICAgICAgLy8gdGhlIGlucHV0IGFyZ3VtZW50IGhlcmUgYWN0cyBhIHVzZXIgZW50ZXJlZCBwcmVmaXggZm9yIGEgc21hbGwgdGltZVxuICAgICAgLy8gdW50aWwgd2Ugc3RhcnQgYXV0b2NvbXBsZXRpb24gaW4gd2hpY2ggY2FzZSBpdCBpcyB0aGUgYXV0b2NvbXBsZXRlZC5cbiAgICAgIG5leHRNYXRjaDogZnVuY3Rpb24gKGlucHV0LCB1cCkge1xuICAgICAgICB2YXIgaGlzdG9yeUJ1ZmZlciA9IHRoaXMuaGlzdG9yeUJ1ZmZlcjtcbiAgICAgICAgdmFyIGRpciA9IHVwID8gLTEgOiAxO1xuICAgICAgICBpZiAodGhpcy5pbml0aWFsUHJlZml4ID09PSBudWxsKSB0aGlzLmluaXRpYWxQcmVmaXggPSBpbnB1dDtcbiAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuaXRlcmF0b3IgKyBkaXI7IHVwID8gaSA+PSAwIDogaSA8IGhpc3RvcnlCdWZmZXIubGVuZ3RoOyBpKz0gZGlyKSB7XG4gICAgICAgICAgdmFyIGVsZW1lbnQgPSBoaXN0b3J5QnVmZmVyW2ldO1xuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDw9IGVsZW1lbnQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmluaXRpYWxQcmVmaXggPT0gZWxlbWVudC5zdWJzdHJpbmcoMCwgaikpIHtcbiAgICAgICAgICAgICAgdGhpcy5pdGVyYXRvciA9IGk7XG4gICAgICAgICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzaG91bGQgcmV0dXJuIHRoZSB1c2VyIGlucHV0IGluIGNhc2Ugd2UgcmVhY2ggdGhlIGVuZCBvZiBidWZmZXIuXG4gICAgICAgIGlmIChpID49IGhpc3RvcnlCdWZmZXIubGVuZ3RoKSB7XG4gICAgICAgICAgdGhpcy5pdGVyYXRvciA9IGhpc3RvcnlCdWZmZXIubGVuZ3RoO1xuICAgICAgICAgIHJldHVybiB0aGlzLmluaXRpYWxQcmVmaXg7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmV0dXJuIHRoZSBsYXN0IGF1dG9jb21wbGV0ZWQgcXVlcnkgb3IgZXhDb21tYW5kIGFzIGl0IGlzLlxuICAgICAgICBpZiAoaSA8IDAgKSByZXR1cm4gaW5wdXQ7XG4gICAgICB9LFxuICAgICAgcHVzaElucHV0OiBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLmhpc3RvcnlCdWZmZXIuaW5kZXhPZihpbnB1dCk7XG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB0aGlzLmhpc3RvcnlCdWZmZXIuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgaWYgKGlucHV0Lmxlbmd0aCkgdGhpcy5oaXN0b3J5QnVmZmVyLnB1c2goaW5wdXQpO1xuICAgICAgfSxcbiAgICAgIHJlc2V0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5pbml0aWFsUHJlZml4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5pdGVyYXRvciA9IHRoaXMuaGlzdG9yeUJ1ZmZlci5sZW5ndGg7XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgY29tbWFuZERpc3BhdGNoZXIgPSB7XG4gICAgICBtYXRjaENvbW1hbmQ6IGZ1bmN0aW9uKGtleXMsIGtleU1hcCwgaW5wdXRTdGF0ZSwgY29udGV4dCkge1xuICAgICAgICB2YXIgbWF0Y2hlcyA9IGNvbW1hbmRNYXRjaGVzKGtleXMsIGtleU1hcCwgY29udGV4dCwgaW5wdXRTdGF0ZSk7XG4gICAgICAgIGlmICghbWF0Y2hlcy5mdWxsICYmICFtYXRjaGVzLnBhcnRpYWwpIHtcbiAgICAgICAgICByZXR1cm4ge3R5cGU6ICdub25lJ307XG4gICAgICAgIH0gZWxzZSBpZiAoIW1hdGNoZXMuZnVsbCAmJiBtYXRjaGVzLnBhcnRpYWwpIHtcbiAgICAgICAgICByZXR1cm4ge3R5cGU6ICdwYXJ0aWFsJ307XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYmVzdE1hdGNoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1hdGNoZXMuZnVsbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBtYXRjaCA9IG1hdGNoZXMuZnVsbFtpXTtcbiAgICAgICAgICBpZiAoIWJlc3RNYXRjaCkge1xuICAgICAgICAgICAgYmVzdE1hdGNoID0gbWF0Y2g7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChiZXN0TWF0Y2gua2V5cy5zbGljZSgtMTEpID09ICc8Y2hhcmFjdGVyPicpIHtcbiAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gbGFzdENoYXIoa2V5cyk7XG4gICAgICAgICAgaWYgKCFjaGFyYWN0ZXIgfHwgY2hhcmFjdGVyLmxlbmd0aCA+IDEpIHJldHVybiB7dHlwZTogJ2NsZWFyJ307XG4gICAgICAgICAgaW5wdXRTdGF0ZS5zZWxlY3RlZENoYXJhY3RlciA9IGNoYXJhY3RlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3R5cGU6ICdmdWxsJywgY29tbWFuZDogYmVzdE1hdGNofTtcbiAgICAgIH0sXG4gICAgICBwcm9jZXNzQ29tbWFuZDogZnVuY3Rpb24oY20sIHZpbSwgY29tbWFuZCkge1xuICAgICAgICB2aW0uaW5wdXRTdGF0ZS5yZXBlYXRPdmVycmlkZSA9IGNvbW1hbmQucmVwZWF0T3ZlcnJpZGU7XG4gICAgICAgIHN3aXRjaCAoY29tbWFuZC50eXBlKSB7XG4gICAgICAgICAgY2FzZSAnbW90aW9uJzpcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc01vdGlvbihjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ29wZXJhdG9yJzpcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc09wZXJhdG9yKGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnb3BlcmF0b3JNb3Rpb24nOlxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzT3BlcmF0b3JNb3Rpb24oY20sIHZpbSwgY29tbWFuZCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdhY3Rpb24nOlxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzQWN0aW9uKGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc2VhcmNoJzpcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1NlYXJjaChjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2V4JzpcbiAgICAgICAgICBjYXNlICdrZXlUb0V4JzpcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0V4KGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvY2Vzc01vdGlvbjogZnVuY3Rpb24oY20sIHZpbSwgY29tbWFuZCkge1xuICAgICAgICB2aW0uaW5wdXRTdGF0ZS5tb3Rpb24gPSBjb21tYW5kLm1vdGlvbjtcbiAgICAgICAgdmltLmlucHV0U3RhdGUubW90aW9uQXJncyA9IGNvcHlBcmdzKGNvbW1hbmQubW90aW9uQXJncyk7XG4gICAgICAgIHRoaXMuZXZhbElucHV0KGNtLCB2aW0pO1xuICAgICAgfSxcbiAgICAgIHByb2Nlc3NPcGVyYXRvcjogZnVuY3Rpb24oY20sIHZpbSwgY29tbWFuZCkge1xuICAgICAgICB2YXIgaW5wdXRTdGF0ZSA9IHZpbS5pbnB1dFN0YXRlO1xuICAgICAgICBpZiAoaW5wdXRTdGF0ZS5vcGVyYXRvcikge1xuICAgICAgICAgIGlmIChpbnB1dFN0YXRlLm9wZXJhdG9yID09IGNvbW1hbmQub3BlcmF0b3IpIHtcbiAgICAgICAgICAgIC8vIFR5cGluZyBhbiBvcGVyYXRvciB0d2ljZSBsaWtlICdkZCcgbWFrZXMgdGhlIG9wZXJhdG9yIG9wZXJhdGVcbiAgICAgICAgICAgIC8vIGxpbmV3aXNlXG4gICAgICAgICAgICBpbnB1dFN0YXRlLm1vdGlvbiA9ICdleHBhbmRUb0xpbmUnO1xuICAgICAgICAgICAgaW5wdXRTdGF0ZS5tb3Rpb25BcmdzID0geyBsaW5ld2lzZTogdHJ1ZSB9O1xuICAgICAgICAgICAgdGhpcy5ldmFsSW5wdXQoY20sIHZpbSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIDIgZGlmZmVyZW50IG9wZXJhdG9ycyBpbiBhIHJvdyBkb2Vzbid0IG1ha2Ugc2Vuc2UuXG4gICAgICAgICAgICBjbGVhcklucHV0U3RhdGUoY20pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpbnB1dFN0YXRlLm9wZXJhdG9yID0gY29tbWFuZC5vcGVyYXRvcjtcbiAgICAgICAgaW5wdXRTdGF0ZS5vcGVyYXRvckFyZ3MgPSBjb3B5QXJncyhjb21tYW5kLm9wZXJhdG9yQXJncyk7XG4gICAgICAgIGlmIChjb21tYW5kLmtleXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGlucHV0U3RhdGUub3BlcmF0b3JTaG9ydGN1dCA9IGNvbW1hbmQua2V5cztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tbWFuZC5leGl0VmlzdWFsQmxvY2spIHtcbiAgICAgICAgICAgIHZpbS52aXN1YWxCbG9jayA9IGZhbHNlO1xuICAgICAgICAgICAgdXBkYXRlQ21TZWxlY3Rpb24oY20pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgIC8vIE9wZXJhdGluZyBvbiBhIHNlbGVjdGlvbiBpbiB2aXN1YWwgbW9kZS4gV2UgZG9uJ3QgbmVlZCBhIG1vdGlvbi5cbiAgICAgICAgICB0aGlzLmV2YWxJbnB1dChjbSwgdmltKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHByb2Nlc3NPcGVyYXRvck1vdGlvbjogZnVuY3Rpb24oY20sIHZpbSwgY29tbWFuZCkge1xuICAgICAgICB2YXIgdmlzdWFsTW9kZSA9IHZpbS52aXN1YWxNb2RlO1xuICAgICAgICB2YXIgb3BlcmF0b3JNb3Rpb25BcmdzID0gY29weUFyZ3MoY29tbWFuZC5vcGVyYXRvck1vdGlvbkFyZ3MpO1xuICAgICAgICBpZiAob3BlcmF0b3JNb3Rpb25BcmdzKSB7XG4gICAgICAgICAgLy8gT3BlcmF0b3IgbW90aW9ucyBtYXkgaGF2ZSBzcGVjaWFsIGJlaGF2aW9yIGluIHZpc3VhbCBtb2RlLlxuICAgICAgICAgIGlmICh2aXN1YWxNb2RlICYmIG9wZXJhdG9yTW90aW9uQXJncy52aXN1YWxMaW5lKSB7XG4gICAgICAgICAgICB2aW0udmlzdWFsTGluZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvY2Vzc09wZXJhdG9yKGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICBpZiAoIXZpc3VhbE1vZGUpIHtcbiAgICAgICAgICB0aGlzLnByb2Nlc3NNb3Rpb24oY20sIHZpbSwgY29tbWFuZCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwcm9jZXNzQWN0aW9uOiBmdW5jdGlvbihjbSwgdmltLCBjb21tYW5kKSB7XG4gICAgICAgIHZhciBpbnB1dFN0YXRlID0gdmltLmlucHV0U3RhdGU7XG4gICAgICAgIHZhciByZXBlYXQgPSBpbnB1dFN0YXRlLmdldFJlcGVhdCgpO1xuICAgICAgICB2YXIgcmVwZWF0SXNFeHBsaWNpdCA9ICEhcmVwZWF0O1xuICAgICAgICB2YXIgYWN0aW9uQXJncyA9IGNvcHlBcmdzKGNvbW1hbmQuYWN0aW9uQXJncykgfHwge307XG4gICAgICAgIGlmIChpbnB1dFN0YXRlLnNlbGVjdGVkQ2hhcmFjdGVyKSB7XG4gICAgICAgICAgYWN0aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlciA9IGlucHV0U3RhdGUuc2VsZWN0ZWRDaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWN0aW9ucyBtYXkgb3IgbWF5IG5vdCBoYXZlIG1vdGlvbnMgYW5kIG9wZXJhdG9ycy4gRG8gdGhlc2UgZmlyc3QuXG4gICAgICAgIGlmIChjb21tYW5kLm9wZXJhdG9yKSB7XG4gICAgICAgICAgdGhpcy5wcm9jZXNzT3BlcmF0b3IoY20sIHZpbSwgY29tbWFuZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbW1hbmQubW90aW9uKSB7XG4gICAgICAgICAgdGhpcy5wcm9jZXNzTW90aW9uKGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb21tYW5kLm1vdGlvbiB8fCBjb21tYW5kLm9wZXJhdG9yKSB7XG4gICAgICAgICAgdGhpcy5ldmFsSW5wdXQoY20sIHZpbSk7XG4gICAgICAgIH1cbiAgICAgICAgYWN0aW9uQXJncy5yZXBlYXQgPSByZXBlYXQgfHwgMTtcbiAgICAgICAgYWN0aW9uQXJncy5yZXBlYXRJc0V4cGxpY2l0ID0gcmVwZWF0SXNFeHBsaWNpdDtcbiAgICAgICAgYWN0aW9uQXJncy5yZWdpc3Rlck5hbWUgPSBpbnB1dFN0YXRlLnJlZ2lzdGVyTmFtZTtcbiAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgdmltLmxhc3RNb3Rpb24gPSBudWxsO1xuICAgICAgICBpZiAoY29tbWFuZC5pc0VkaXQpIHtcbiAgICAgICAgICB0aGlzLnJlY29yZExhc3RFZGl0KHZpbSwgaW5wdXRTdGF0ZSwgY29tbWFuZCk7XG4gICAgICAgIH1cbiAgICAgICAgYWN0aW9uc1tjb21tYW5kLmFjdGlvbl0oY20sIGFjdGlvbkFyZ3MsIHZpbSk7XG4gICAgICB9LFxuICAgICAgcHJvY2Vzc1NlYXJjaDogZnVuY3Rpb24oY20sIHZpbSwgY29tbWFuZCkge1xuICAgICAgICBpZiAoIWNtLmdldFNlYXJjaEN1cnNvcikge1xuICAgICAgICAgIC8vIFNlYXJjaCBkZXBlbmRzIG9uIFNlYXJjaEN1cnNvci5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZvcndhcmQgPSBjb21tYW5kLnNlYXJjaEFyZ3MuZm9yd2FyZDtcbiAgICAgICAgdmFyIHdob2xlV29yZE9ubHkgPSBjb21tYW5kLnNlYXJjaEFyZ3Mud2hvbGVXb3JkT25seTtcbiAgICAgICAgZ2V0U2VhcmNoU3RhdGUoY20pLnNldFJldmVyc2VkKCFmb3J3YXJkKTtcbiAgICAgICAgdmFyIHByb21wdFByZWZpeCA9IChmb3J3YXJkKSA/ICcvJyA6ICc/JztcbiAgICAgICAgdmFyIG9yaWdpbmFsUXVlcnkgPSBnZXRTZWFyY2hTdGF0ZShjbSkuZ2V0UXVlcnkoKTtcbiAgICAgICAgdmFyIG9yaWdpbmFsU2Nyb2xsUG9zID0gY20uZ2V0U2Nyb2xsSW5mbygpO1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGVRdWVyeShxdWVyeSwgaWdub3JlQ2FzZSwgc21hcnRDYXNlKSB7XG4gICAgICAgICAgdmltR2xvYmFsU3RhdGUuc2VhcmNoSGlzdG9yeUNvbnRyb2xsZXIucHVzaElucHV0KHF1ZXJ5KTtcbiAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5zZWFyY2hIaXN0b3J5Q29udHJvbGxlci5yZXNldCgpO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB1cGRhdGVTZWFyY2hRdWVyeShjbSwgcXVlcnksIGlnbm9yZUNhc2UsIHNtYXJ0Q2FzZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdJbnZhbGlkIHJlZ2V4OiAnICsgcXVlcnkpO1xuICAgICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29tbWFuZERpc3BhdGNoZXIucHJvY2Vzc01vdGlvbihjbSwgdmltLCB7XG4gICAgICAgICAgICB0eXBlOiAnbW90aW9uJyxcbiAgICAgICAgICAgIG1vdGlvbjogJ2ZpbmROZXh0JyxcbiAgICAgICAgICAgIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgdG9KdW1wbGlzdDogY29tbWFuZC5zZWFyY2hBcmdzLnRvSnVtcGxpc3QgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uUHJvbXB0Q2xvc2UocXVlcnkpIHtcbiAgICAgICAgICAvL2FjZV9wYXRjaCBjbS5zY3JvbGxUbyhvcmlnaW5hbFNjcm9sbFBvcy5sZWZ0LCBvcmlnaW5hbFNjcm9sbFBvcy50b3ApO1xuICAgICAgICAgIGhhbmRsZVF1ZXJ5KHF1ZXJ5LCB0cnVlIC8qKiBpZ25vcmVDYXNlICovLCB0cnVlIC8qKiBzbWFydENhc2UgKi8pO1xuICAgICAgICAgIHZhciBtYWNyb01vZGVTdGF0ZSA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlO1xuICAgICAgICAgIGlmIChtYWNyb01vZGVTdGF0ZS5pc1JlY29yZGluZykge1xuICAgICAgICAgICAgbG9nU2VhcmNoUXVlcnkobWFjcm9Nb2RlU3RhdGUsIHF1ZXJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25Qcm9tcHRLZXlVcChlLCBxdWVyeSwgY2xvc2UpIHtcbiAgICAgICAgICB2YXIga2V5TmFtZSA9IENvZGVNaXJyb3Iua2V5TmFtZShlKSwgdXAsIG9mZnNldDtcbiAgICAgICAgICBpZiAoa2V5TmFtZSA9PSAnVXAnIHx8IGtleU5hbWUgPT0gJ0Rvd24nKSB7XG4gICAgICAgICAgICB1cCA9IGtleU5hbWUgPT0gJ1VwJyA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgIG9mZnNldCA9IGUudGFyZ2V0ID8gZS50YXJnZXQuc2VsZWN0aW9uRW5kIDogMDtcbiAgICAgICAgICAgIHF1ZXJ5ID0gdmltR2xvYmFsU3RhdGUuc2VhcmNoSGlzdG9yeUNvbnRyb2xsZXIubmV4dE1hdGNoKHF1ZXJ5LCB1cCkgfHwgJyc7XG4gICAgICAgICAgICBjbG9zZShxdWVyeSk7XG4gICAgICAgICAgICBpZiAob2Zmc2V0ICYmIGUudGFyZ2V0KSBlLnRhcmdldC5zZWxlY3Rpb25FbmQgPSBlLnRhcmdldC5zZWxlY3Rpb25TdGFydCA9IE1hdGgubWluKG9mZnNldCwgZS50YXJnZXQudmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCBrZXlOYW1lICE9ICdMZWZ0JyAmJiBrZXlOYW1lICE9ICdSaWdodCcgJiYga2V5TmFtZSAhPSAnQ3RybCcgJiYga2V5TmFtZSAhPSAnQWx0JyAmJiBrZXlOYW1lICE9ICdTaGlmdCcpXG4gICAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLnNlYXJjaEhpc3RvcnlDb250cm9sbGVyLnJlc2V0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBwYXJzZWRRdWVyeTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcGFyc2VkUXVlcnkgPSB1cGRhdGVTZWFyY2hRdWVyeShjbSwgcXVlcnksXG4gICAgICAgICAgICAgICAgdHJ1ZSAvKiogaWdub3JlQ2FzZSAqLywgdHJ1ZSAvKiogc21hcnRDYXNlICovKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAvLyBTd2FsbG93IGJhZCByZWdleGVzIGZvciBpbmNyZW1lbnRhbCBzZWFyY2guXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwYXJzZWRRdWVyeSkge1xuICAgICAgICAgICAgY20uc2Nyb2xsSW50b1ZpZXcoZmluZE5leHQoY20sICFmb3J3YXJkLCBwYXJzZWRRdWVyeSksIDMwKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2xlYXJTZWFyY2hIaWdobGlnaHQoY20pO1xuICAgICAgICAgICAgY20uc2Nyb2xsVG8ob3JpZ2luYWxTY3JvbGxQb3MubGVmdCwgb3JpZ2luYWxTY3JvbGxQb3MudG9wKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25Qcm9tcHRLZXlEb3duKGUsIHF1ZXJ5LCBjbG9zZSkge1xuICAgICAgICAgIHZhciBrZXlOYW1lID0gQ29kZU1pcnJvci5rZXlOYW1lKGUpO1xuICAgICAgICAgIGlmIChrZXlOYW1lID09ICdFc2MnIHx8IGtleU5hbWUgPT0gJ0N0cmwtQycgfHwga2V5TmFtZSA9PSAnQ3RybC1bJyB8fFxuICAgICAgICAgICAgICAoa2V5TmFtZSA9PSAnQmFja3NwYWNlJyAmJiBxdWVyeSA9PSAnJykpIHtcbiAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLnNlYXJjaEhpc3RvcnlDb250cm9sbGVyLnB1c2hJbnB1dChxdWVyeSk7XG4gICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5zZWFyY2hIaXN0b3J5Q29udHJvbGxlci5yZXNldCgpO1xuICAgICAgICAgICAgdXBkYXRlU2VhcmNoUXVlcnkoY20sIG9yaWdpbmFsUXVlcnkpO1xuICAgICAgICAgICAgY2xlYXJTZWFyY2hIaWdobGlnaHQoY20pO1xuICAgICAgICAgICAgY20uc2Nyb2xsVG8ob3JpZ2luYWxTY3JvbGxQb3MubGVmdCwgb3JpZ2luYWxTY3JvbGxQb3MudG9wKTtcbiAgICAgICAgICAgIENvZGVNaXJyb3IuZV9zdG9wKGUpO1xuICAgICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgICBjbS5mb2N1cygpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoa2V5TmFtZSA9PSAnVXAnIHx8IGtleU5hbWUgPT0gJ0Rvd24nKSB7XG4gICAgICAgICAgICBDb2RlTWlycm9yLmVfc3RvcChlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGtleU5hbWUgPT0gJ0N0cmwtVScpIHtcbiAgICAgICAgICAgIC8vIEN0cmwtVSBjbGVhcnMgaW5wdXQuXG4gICAgICAgICAgICBDb2RlTWlycm9yLmVfc3RvcChlKTtcbiAgICAgICAgICAgIGNsb3NlKCcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChjb21tYW5kLnNlYXJjaEFyZ3MucXVlcnlTcmMpIHtcbiAgICAgICAgICBjYXNlICdwcm9tcHQnOlxuICAgICAgICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICAgICAgICBpZiAobWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICAgIHZhciBxdWVyeSA9IG1hY3JvTW9kZVN0YXRlLnJlcGxheVNlYXJjaFF1ZXJpZXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgaGFuZGxlUXVlcnkocXVlcnksIHRydWUgLyoqIGlnbm9yZUNhc2UgKi8sIGZhbHNlIC8qKiBzbWFydENhc2UgKi8pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2hvd1Byb21wdChjbSwge1xuICAgICAgICAgICAgICAgICAgb25DbG9zZTogb25Qcm9tcHRDbG9zZSxcbiAgICAgICAgICAgICAgICAgIHByZWZpeDogcHJvbXB0UHJlZml4LFxuICAgICAgICAgICAgICAgICAgZGVzYzogJyhKYXZhU2NyaXB0IHJlZ2V4cCknLFxuICAgICAgICAgICAgICAgICAgb25LZXlVcDogb25Qcm9tcHRLZXlVcCxcbiAgICAgICAgICAgICAgICAgIG9uS2V5RG93bjogb25Qcm9tcHRLZXlEb3duXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnd29yZFVuZGVyQ3Vyc29yJzpcbiAgICAgICAgICAgIHZhciB3b3JkID0gZXhwYW5kV29yZFVuZGVyQ3Vyc29yKGNtLCBmYWxzZSAvKiogaW5jbHVzaXZlICovLFxuICAgICAgICAgICAgICAgIHRydWUgLyoqIGZvcndhcmQgKi8sIGZhbHNlIC8qKiBiaWdXb3JkICovLFxuICAgICAgICAgICAgICAgIHRydWUgLyoqIG5vU3ltYm9sICovKTtcbiAgICAgICAgICAgIHZhciBpc0tleXdvcmQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCF3b3JkKSB7XG4gICAgICAgICAgICAgIHdvcmQgPSBleHBhbmRXb3JkVW5kZXJDdXJzb3IoY20sIGZhbHNlIC8qKiBpbmNsdXNpdmUgKi8sXG4gICAgICAgICAgICAgICAgICB0cnVlIC8qKiBmb3J3YXJkICovLCBmYWxzZSAvKiogYmlnV29yZCAqLyxcbiAgICAgICAgICAgICAgICAgIGZhbHNlIC8qKiBub1N5bWJvbCAqLyk7XG4gICAgICAgICAgICAgIGlzS2V5d29yZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF3b3JkKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBxdWVyeSA9IGNtLmdldExpbmUod29yZC5zdGFydC5saW5lKS5zdWJzdHJpbmcod29yZC5zdGFydC5jaCxcbiAgICAgICAgICAgICAgICB3b3JkLmVuZC5jaCk7XG4gICAgICAgICAgICBpZiAoaXNLZXl3b3JkICYmIHdob2xlV29yZE9ubHkpIHtcbiAgICAgICAgICAgICAgICBxdWVyeSA9ICdcXFxcYicgKyBxdWVyeSArICdcXFxcYic7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBxdWVyeSA9IGVzY2FwZVJlZ2V4KHF1ZXJ5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY2FjaGVkQ3Vyc29yIGlzIHVzZWQgdG8gc2F2ZSB0aGUgb2xkIHBvc2l0aW9uIG9mIHRoZSBjdXJzb3JcbiAgICAgICAgICAgIC8vIHdoZW4gKiBvciAjIGNhdXNlcyB2aW0gdG8gc2VlayBmb3IgdGhlIG5lYXJlc3Qgd29yZCBhbmQgc2hpZnRcbiAgICAgICAgICAgIC8vIHRoZSBjdXJzb3IgYmVmb3JlIGVudGVyaW5nIHRoZSBtb3Rpb24uXG4gICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5qdW1wTGlzdC5jYWNoZWRDdXJzb3IgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcih3b3JkLnN0YXJ0KTtcblxuICAgICAgICAgICAgaGFuZGxlUXVlcnkocXVlcnksIHRydWUgLyoqIGlnbm9yZUNhc2UgKi8sIGZhbHNlIC8qKiBzbWFydENhc2UgKi8pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwcm9jZXNzRXg6IGZ1bmN0aW9uKGNtLCB2aW0sIGNvbW1hbmQpIHtcbiAgICAgICAgZnVuY3Rpb24gb25Qcm9tcHRDbG9zZShpbnB1dCkge1xuICAgICAgICAgIC8vIEdpdmUgdGhlIHByb21wdCBzb21lIHRpbWUgdG8gY2xvc2Ugc28gdGhhdCBpZiBwcm9jZXNzQ29tbWFuZCBzaG93c1xuICAgICAgICAgIC8vIGFuIGVycm9yLCB0aGUgZWxlbWVudHMgZG9uJ3Qgb3ZlcmxhcC5cbiAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5leENvbW1hbmRIaXN0b3J5Q29udHJvbGxlci5wdXNoSW5wdXQoaW5wdXQpO1xuICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLmV4Q29tbWFuZEhpc3RvcnlDb250cm9sbGVyLnJlc2V0KCk7XG4gICAgICAgICAgZXhDb21tYW5kRGlzcGF0Y2hlci5wcm9jZXNzQ29tbWFuZChjbSwgaW5wdXQpO1xuICAgICAgICAgIGlmIChjbS5zdGF0ZS52aW0pIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25Qcm9tcHRLZXlEb3duKGUsIGlucHV0LCBjbG9zZSkge1xuICAgICAgICAgIHZhciBrZXlOYW1lID0gQ29kZU1pcnJvci5rZXlOYW1lKGUpLCB1cCwgb2Zmc2V0O1xuICAgICAgICAgIGlmIChrZXlOYW1lID09ICdFc2MnIHx8IGtleU5hbWUgPT0gJ0N0cmwtQycgfHwga2V5TmFtZSA9PSAnQ3RybC1bJyB8fFxuICAgICAgICAgICAgICAoa2V5TmFtZSA9PSAnQmFja3NwYWNlJyAmJiBpbnB1dCA9PSAnJykpIHtcbiAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLmV4Q29tbWFuZEhpc3RvcnlDb250cm9sbGVyLnB1c2hJbnB1dChpbnB1dCk7XG4gICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5leENvbW1hbmRIaXN0b3J5Q29udHJvbGxlci5yZXNldCgpO1xuICAgICAgICAgICAgQ29kZU1pcnJvci5lX3N0b3AoZSk7XG4gICAgICAgICAgICBjbGVhcklucHV0U3RhdGUoY20pO1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgICAgIGNtLmZvY3VzKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChrZXlOYW1lID09ICdVcCcgfHwga2V5TmFtZSA9PSAnRG93bicpIHtcbiAgICAgICAgICAgIENvZGVNaXJyb3IuZV9zdG9wKGUpO1xuICAgICAgICAgICAgdXAgPSBrZXlOYW1lID09ICdVcCcgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICBvZmZzZXQgPSBlLnRhcmdldCA/IGUudGFyZ2V0LnNlbGVjdGlvbkVuZCA6IDA7XG4gICAgICAgICAgICBpbnB1dCA9IHZpbUdsb2JhbFN0YXRlLmV4Q29tbWFuZEhpc3RvcnlDb250cm9sbGVyLm5leHRNYXRjaChpbnB1dCwgdXApIHx8ICcnO1xuICAgICAgICAgICAgY2xvc2UoaW5wdXQpO1xuICAgICAgICAgICAgaWYgKG9mZnNldCAmJiBlLnRhcmdldCkgZS50YXJnZXQuc2VsZWN0aW9uRW5kID0gZS50YXJnZXQuc2VsZWN0aW9uU3RhcnQgPSBNYXRoLm1pbihvZmZzZXQsIGUudGFyZ2V0LnZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChrZXlOYW1lID09ICdDdHJsLVUnKSB7XG4gICAgICAgICAgICAvLyBDdHJsLVUgY2xlYXJzIGlucHV0LlxuICAgICAgICAgICAgQ29kZU1pcnJvci5lX3N0b3AoZSk7XG4gICAgICAgICAgICBjbG9zZSgnJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICgga2V5TmFtZSAhPSAnTGVmdCcgJiYga2V5TmFtZSAhPSAnUmlnaHQnICYmIGtleU5hbWUgIT0gJ0N0cmwnICYmIGtleU5hbWUgIT0gJ0FsdCcgJiYga2V5TmFtZSAhPSAnU2hpZnQnKVxuICAgICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5leENvbW1hbmRIaXN0b3J5Q29udHJvbGxlci5yZXNldCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tbWFuZC50eXBlID09ICdrZXlUb0V4Jykge1xuICAgICAgICAgIC8vIEhhbmRsZSB1c2VyIGRlZmluZWQgRXggdG8gRXggbWFwcGluZ3NcbiAgICAgICAgICBleENvbW1hbmREaXNwYXRjaGVyLnByb2Nlc3NDb21tYW5kKGNtLCBjb21tYW5kLmV4QXJncy5pbnB1dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICBzaG93UHJvbXB0KGNtLCB7IG9uQ2xvc2U6IG9uUHJvbXB0Q2xvc2UsIHByZWZpeDogJzonLCB2YWx1ZTogJ1xcJzwsXFwnPicsXG4gICAgICAgICAgICAgICAgb25LZXlEb3duOiBvblByb21wdEtleURvd24sIHNlbGVjdFZhbHVlT25PcGVuOiBmYWxzZX0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93UHJvbXB0KGNtLCB7IG9uQ2xvc2U6IG9uUHJvbXB0Q2xvc2UsIHByZWZpeDogJzonLFxuICAgICAgICAgICAgICAgIG9uS2V5RG93bjogb25Qcm9tcHRLZXlEb3dufSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXZhbElucHV0OiBmdW5jdGlvbihjbSwgdmltKSB7XG4gICAgICAgIC8vIElmIHRoZSBtb3Rpb24gY29tbWFuZCBpcyBzZXQsIGV4ZWN1dGUgYm90aCB0aGUgb3BlcmF0b3IgYW5kIG1vdGlvbi5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIHJldHVybi5cbiAgICAgICAgdmFyIGlucHV0U3RhdGUgPSB2aW0uaW5wdXRTdGF0ZTtcbiAgICAgICAgdmFyIG1vdGlvbiA9IGlucHV0U3RhdGUubW90aW9uO1xuICAgICAgICB2YXIgbW90aW9uQXJncyA9IGlucHV0U3RhdGUubW90aW9uQXJncyB8fCB7fTtcbiAgICAgICAgdmFyIG9wZXJhdG9yID0gaW5wdXRTdGF0ZS5vcGVyYXRvcjtcbiAgICAgICAgdmFyIG9wZXJhdG9yQXJncyA9IGlucHV0U3RhdGUub3BlcmF0b3JBcmdzIHx8IHt9O1xuICAgICAgICB2YXIgcmVnaXN0ZXJOYW1lID0gaW5wdXRTdGF0ZS5yZWdpc3Rlck5hbWU7XG4gICAgICAgIHZhciBzZWwgPSB2aW0uc2VsO1xuICAgICAgICAvLyBUT0RPOiBNYWtlIHN1cmUgY20gYW5kIHZpbSBzZWxlY3Rpb25zIGFyZSBpZGVudGljYWwgb3V0c2lkZSB2aXN1YWwgbW9kZS5cbiAgICAgICAgdmFyIG9yaWdIZWFkID0gY29weUN1cnNvcih2aW0udmlzdWFsTW9kZSA/IGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIHNlbC5oZWFkKTogY20uZ2V0Q3Vyc29yKCdoZWFkJykpO1xuICAgICAgICB2YXIgb3JpZ0FuY2hvciA9IGNvcHlDdXJzb3IodmltLnZpc3VhbE1vZGUgPyBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBzZWwuYW5jaG9yKSA6IGNtLmdldEN1cnNvcignYW5jaG9yJykpO1xuICAgICAgICB2YXIgb2xkSGVhZCA9IGNvcHlDdXJzb3Iob3JpZ0hlYWQpO1xuICAgICAgICB2YXIgb2xkQW5jaG9yID0gY29weUN1cnNvcihvcmlnQW5jaG9yKTtcbiAgICAgICAgdmFyIG5ld0hlYWQsIG5ld0FuY2hvcjtcbiAgICAgICAgdmFyIHJlcGVhdDtcbiAgICAgICAgaWYgKG9wZXJhdG9yKSB7XG4gICAgICAgICAgdGhpcy5yZWNvcmRMYXN0RWRpdCh2aW0sIGlucHV0U3RhdGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dFN0YXRlLnJlcGVhdE92ZXJyaWRlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBJZiByZXBlYXRPdmVycmlkZSBpcyBzcGVjaWZpZWQsIHRoYXQgdGFrZXMgcHJlY2VkZW5jZSBvdmVyIHRoZVxuICAgICAgICAgIC8vIGlucHV0IHN0YXRlJ3MgcmVwZWF0LiBVc2VkIGJ5IEV4IG1vZGUgYW5kIGNhbiBiZSB1c2VyIGRlZmluZWQuXG4gICAgICAgICAgcmVwZWF0ID0gaW5wdXRTdGF0ZS5yZXBlYXRPdmVycmlkZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXBlYXQgPSBpbnB1dFN0YXRlLmdldFJlcGVhdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXBlYXQgPiAwICYmIG1vdGlvbkFyZ3MuZXhwbGljaXRSZXBlYXQpIHtcbiAgICAgICAgICBtb3Rpb25BcmdzLnJlcGVhdElzRXhwbGljaXQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKG1vdGlvbkFyZ3Mubm9SZXBlYXQgfHxcbiAgICAgICAgICAgICghbW90aW9uQXJncy5leHBsaWNpdFJlcGVhdCAmJiByZXBlYXQgPT09IDApKSB7XG4gICAgICAgICAgcmVwZWF0ID0gMTtcbiAgICAgICAgICBtb3Rpb25BcmdzLnJlcGVhdElzRXhwbGljaXQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5wdXRTdGF0ZS5zZWxlY3RlZENoYXJhY3Rlcikge1xuICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGEgY2hhcmFjdGVyIGlucHV0LCBzdGljayBpdCBpbiBhbGwgb2YgdGhlIGFyZyBhcnJheXMuXG4gICAgICAgICAgbW90aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlciA9IG9wZXJhdG9yQXJncy5zZWxlY3RlZENoYXJhY3RlciA9XG4gICAgICAgICAgICAgIGlucHV0U3RhdGUuc2VsZWN0ZWRDaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgbW90aW9uQXJncy5yZXBlYXQgPSByZXBlYXQ7XG4gICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgIGlmIChtb3Rpb24pIHtcbiAgICAgICAgICB2YXIgbW90aW9uUmVzdWx0ID0gbW90aW9uc1ttb3Rpb25dKGNtLCBvcmlnSGVhZCwgbW90aW9uQXJncywgdmltLCBpbnB1dFN0YXRlKTtcbiAgICAgICAgICB2aW0ubGFzdE1vdGlvbiA9IG1vdGlvbnNbbW90aW9uXTtcbiAgICAgICAgICBpZiAoIW1vdGlvblJlc3VsdCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobW90aW9uQXJncy50b0p1bXBsaXN0KSB7XG4gICAgICAgICAgICBpZiAoIW9wZXJhdG9yICYmIGNtLmFjZS5jdXJPcCAhPSBudWxsKVxuICAgICAgICAgICAgICBjbS5hY2UuY3VyT3AuY29tbWFuZC5zY3JvbGxJbnRvVmlldyA9IFwiY2VudGVyLWFuaW1hdGVcIjsgLy8gYWNlX3BhdGNoXG4gICAgICAgICAgICB2YXIganVtcExpc3QgPSB2aW1HbG9iYWxTdGF0ZS5qdW1wTGlzdDtcbiAgICAgICAgICAgIC8vIGlmIHRoZSBjdXJyZW50IG1vdGlvbiBpcyAjIG9yICosIHVzZSBjYWNoZWRDdXJzb3JcbiAgICAgICAgICAgIHZhciBjYWNoZWRDdXJzb3IgPSBqdW1wTGlzdC5jYWNoZWRDdXJzb3I7XG4gICAgICAgICAgICBpZiAoY2FjaGVkQ3Vyc29yKSB7XG4gICAgICAgICAgICAgIHJlY29yZEp1bXBQb3NpdGlvbihjbSwgY2FjaGVkQ3Vyc29yLCBtb3Rpb25SZXN1bHQpO1xuICAgICAgICAgICAgICBkZWxldGUganVtcExpc3QuY2FjaGVkQ3Vyc29yO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVjb3JkSnVtcFBvc2l0aW9uKGNtLCBvcmlnSGVhZCwgbW90aW9uUmVzdWx0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1vdGlvblJlc3VsdCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICBuZXdBbmNob3IgPSBtb3Rpb25SZXN1bHRbMF07XG4gICAgICAgICAgICBuZXdIZWFkID0gbW90aW9uUmVzdWx0WzFdO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdIZWFkID0gbW90aW9uUmVzdWx0O1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBUT0RPOiBIYW5kbGUgbnVsbCByZXR1cm5zIGZyb20gbW90aW9uIGNvbW1hbmRzIGJldHRlci5cbiAgICAgICAgICBpZiAoIW5ld0hlYWQpIHtcbiAgICAgICAgICAgIG5ld0hlYWQgPSBjb3B5Q3Vyc29yKG9yaWdIZWFkKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICBpZiAoISh2aW0udmlzdWFsQmxvY2sgJiYgbmV3SGVhZC5jaCA9PT0gSW5maW5pdHkpKSB7XG4gICAgICAgICAgICAgIG5ld0hlYWQgPSBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBuZXdIZWFkLCBvbGRIZWFkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuZXdBbmNob3IpIHtcbiAgICAgICAgICAgICAgbmV3QW5jaG9yID0gY2xpcEN1cnNvclRvQ29udGVudChjbSwgbmV3QW5jaG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5ld0FuY2hvciA9IG5ld0FuY2hvciB8fCBvbGRBbmNob3I7XG4gICAgICAgICAgICBzZWwuYW5jaG9yID0gbmV3QW5jaG9yO1xuICAgICAgICAgICAgc2VsLmhlYWQgPSBuZXdIZWFkO1xuICAgICAgICAgICAgdXBkYXRlQ21TZWxlY3Rpb24oY20pO1xuICAgICAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCAnPCcsXG4gICAgICAgICAgICAgICAgY3Vyc29ySXNCZWZvcmUobmV3QW5jaG9yLCBuZXdIZWFkKSA/IG5ld0FuY2hvclxuICAgICAgICAgICAgICAgICAgICA6IG5ld0hlYWQpO1xuICAgICAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCAnPicsXG4gICAgICAgICAgICAgICAgY3Vyc29ySXNCZWZvcmUobmV3QW5jaG9yLCBuZXdIZWFkKSA/IG5ld0hlYWRcbiAgICAgICAgICAgICAgICAgICAgOiBuZXdBbmNob3IpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIW9wZXJhdG9yKSB7XG4gICAgICAgICAgICBpZiAoY20uYWNlLmN1ck9wKVxuICAgICAgICAgICAgICBjbS5hY2UuY3VyT3AudmltRGlhbG9nU2Nyb2xsID0gXCJjZW50ZXItYW5pbWF0ZVwiOyAvLyBhY2VfcGF0Y2hcbiAgICAgICAgICAgIG5ld0hlYWQgPSBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBuZXdIZWFkLCBvbGRIZWFkKTtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihuZXdIZWFkLmxpbmUsIG5ld0hlYWQuY2gpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAob3BlcmF0b3IpIHtcbiAgICAgICAgICBpZiAob3BlcmF0b3JBcmdzLmxhc3RTZWwpIHtcbiAgICAgICAgICAgIC8vIFJlcGxheWluZyBhIHZpc3VhbCBtb2RlIG9wZXJhdGlvblxuICAgICAgICAgICAgbmV3QW5jaG9yID0gb2xkQW5jaG9yO1xuICAgICAgICAgICAgdmFyIGxhc3RTZWwgPSBvcGVyYXRvckFyZ3MubGFzdFNlbDtcbiAgICAgICAgICAgIHZhciBsaW5lT2Zmc2V0ID0gTWF0aC5hYnMobGFzdFNlbC5oZWFkLmxpbmUgLSBsYXN0U2VsLmFuY2hvci5saW5lKTtcbiAgICAgICAgICAgIHZhciBjaE9mZnNldCA9IE1hdGguYWJzKGxhc3RTZWwuaGVhZC5jaCAtIGxhc3RTZWwuYW5jaG9yLmNoKTtcbiAgICAgICAgICAgIGlmIChsYXN0U2VsLnZpc3VhbExpbmUpIHtcbiAgICAgICAgICAgICAgLy8gTGluZXdpc2UgVmlzdWFsIG1vZGU6IFRoZSBzYW1lIG51bWJlciBvZiBsaW5lcy5cbiAgICAgICAgICAgICAgbmV3SGVhZCA9IG5ldyBQb3Mob2xkQW5jaG9yLmxpbmUgKyBsaW5lT2Zmc2V0LCBvbGRBbmNob3IuY2gpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0U2VsLnZpc3VhbEJsb2NrKSB7XG4gICAgICAgICAgICAgIC8vIEJsb2Nrd2lzZSBWaXN1YWwgbW9kZTogVGhlIHNhbWUgbnVtYmVyIG9mIGxpbmVzIGFuZCBjb2x1bW5zLlxuICAgICAgICAgICAgICBuZXdIZWFkID0gbmV3IFBvcyhvbGRBbmNob3IubGluZSArIGxpbmVPZmZzZXQsIG9sZEFuY2hvci5jaCArIGNoT2Zmc2V0KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGFzdFNlbC5oZWFkLmxpbmUgPT0gbGFzdFNlbC5hbmNob3IubGluZSkge1xuICAgICAgICAgICAgICAvLyBOb3JtYWwgVmlzdWFsIG1vZGUgd2l0aGluIG9uZSBsaW5lOiBUaGUgc2FtZSBudW1iZXIgb2YgY2hhcmFjdGVycy5cbiAgICAgICAgICAgICAgbmV3SGVhZCA9IG5ldyBQb3Mob2xkQW5jaG9yLmxpbmUsIG9sZEFuY2hvci5jaCArIGNoT2Zmc2V0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIE5vcm1hbCBWaXN1YWwgbW9kZSB3aXRoIHNldmVyYWwgbGluZXM6IFRoZSBzYW1lIG51bWJlciBvZiBsaW5lcywgaW4gdGhlXG4gICAgICAgICAgICAgIC8vIGxhc3QgbGluZSB0aGUgc2FtZSBudW1iZXIgb2YgY2hhcmFjdGVycyBhcyBpbiB0aGUgbGFzdCBsaW5lIHRoZSBsYXN0IHRpbWUuXG4gICAgICAgICAgICAgIG5ld0hlYWQgPSBuZXcgUG9zKG9sZEFuY2hvci5saW5lICsgbGluZU9mZnNldCwgb2xkQW5jaG9yLmNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZpbS52aXN1YWxNb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgIHZpbS52aXN1YWxMaW5lID0gbGFzdFNlbC52aXN1YWxMaW5lO1xuICAgICAgICAgICAgdmltLnZpc3VhbEJsb2NrID0gbGFzdFNlbC52aXN1YWxCbG9jaztcbiAgICAgICAgICAgIHNlbCA9IHZpbS5zZWwgPSB7XG4gICAgICAgICAgICAgIGFuY2hvcjogbmV3QW5jaG9yLFxuICAgICAgICAgICAgICBoZWFkOiBuZXdIZWFkXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdXBkYXRlQ21TZWxlY3Rpb24oY20pO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIG9wZXJhdG9yQXJncy5sYXN0U2VsID0ge1xuICAgICAgICAgICAgICBhbmNob3I6IGNvcHlDdXJzb3Ioc2VsLmFuY2hvciksXG4gICAgICAgICAgICAgIGhlYWQ6IGNvcHlDdXJzb3Ioc2VsLmhlYWQpLFxuICAgICAgICAgICAgICB2aXN1YWxCbG9jazogdmltLnZpc3VhbEJsb2NrLFxuICAgICAgICAgICAgICB2aXN1YWxMaW5lOiB2aW0udmlzdWFsTGluZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGN1clN0YXJ0LCBjdXJFbmQsIGxpbmV3aXNlLCBtb2RlO1xuICAgICAgICAgIHZhciBjbVNlbDtcbiAgICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIC8vIEluaXQgdmlzdWFsIG9wXG4gICAgICAgICAgICBjdXJTdGFydCA9IGN1cnNvck1pbihzZWwuaGVhZCwgc2VsLmFuY2hvcik7XG4gICAgICAgICAgICBjdXJFbmQgPSBjdXJzb3JNYXgoc2VsLmhlYWQsIHNlbC5hbmNob3IpO1xuICAgICAgICAgICAgbGluZXdpc2UgPSB2aW0udmlzdWFsTGluZSB8fCBvcGVyYXRvckFyZ3MubGluZXdpc2U7XG4gICAgICAgICAgICBtb2RlID0gdmltLnZpc3VhbEJsb2NrID8gJ2Jsb2NrJyA6XG4gICAgICAgICAgICAgICAgICAgbGluZXdpc2UgPyAnbGluZScgOlxuICAgICAgICAgICAgICAgICAgICdjaGFyJztcbiAgICAgICAgICAgIHZhciBuZXdQb3NpdGlvbnMgPSB1cGRhdGVTZWxlY3Rpb25Gb3JTdXJyb2dhdGVDaGFyYWN0ZXJzKGNtLCBjdXJTdGFydCwgY3VyRW5kKTtcbiAgICAgICAgICAgIGNtU2VsID0gbWFrZUNtU2VsZWN0aW9uKGNtLCB7XG4gICAgICAgICAgICAgIGFuY2hvcjogbmV3UG9zaXRpb25zLnN0YXJ0LFxuICAgICAgICAgICAgICBoZWFkOiBuZXdQb3NpdGlvbnMuZW5kXG4gICAgICAgICAgICB9LCBtb2RlKTtcbiAgICAgICAgICAgIGlmIChsaW5ld2lzZSkge1xuICAgICAgICAgICAgICB2YXIgcmFuZ2VzID0gY21TZWwucmFuZ2VzO1xuICAgICAgICAgICAgICBpZiAobW9kZSA9PSAnYmxvY2snKSB7XG4gICAgICAgICAgICAgICAgLy8gTGluZXdpc2Ugb3BlcmF0b3JzIGluIHZpc3VhbCBibG9jayBtb2RlIGV4dGVuZCB0byBlbmQgb2YgbGluZVxuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICByYW5nZXNbaV0uaGVhZC5jaCA9IGxpbmVMZW5ndGgoY20sIHJhbmdlc1tpXS5oZWFkLmxpbmUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmIChtb2RlID09ICdsaW5lJykge1xuICAgICAgICAgICAgICAgIHJhbmdlc1swXS5oZWFkID0gbmV3IFBvcyhyYW5nZXNbMF0uaGVhZC5saW5lICsgMSwgMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSW5pdCBtb3Rpb24gb3BcbiAgICAgICAgICAgIGN1clN0YXJ0ID0gY29weUN1cnNvcihuZXdBbmNob3IgfHwgb2xkQW5jaG9yKTtcbiAgICAgICAgICAgIGN1ckVuZCA9IGNvcHlDdXJzb3IobmV3SGVhZCB8fCBvbGRIZWFkKTtcbiAgICAgICAgICAgIGlmIChjdXJzb3JJc0JlZm9yZShjdXJFbmQsIGN1clN0YXJ0KSkge1xuICAgICAgICAgICAgICB2YXIgdG1wID0gY3VyU3RhcnQ7XG4gICAgICAgICAgICAgIGN1clN0YXJ0ID0gY3VyRW5kO1xuICAgICAgICAgICAgICBjdXJFbmQgPSB0bXA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsaW5ld2lzZSA9IG1vdGlvbkFyZ3MubGluZXdpc2UgfHwgb3BlcmF0b3JBcmdzLmxpbmV3aXNlO1xuICAgICAgICAgICAgaWYgKGxpbmV3aXNlKSB7XG4gICAgICAgICAgICAgIC8vIEV4cGFuZCBzZWxlY3Rpb24gdG8gZW50aXJlIGxpbmUuXG4gICAgICAgICAgICAgIGV4cGFuZFNlbGVjdGlvblRvTGluZShjbSwgY3VyU3RhcnQsIGN1ckVuZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG1vdGlvbkFyZ3MuZm9yd2FyZCkge1xuICAgICAgICAgICAgICAvLyBDbGlwIHRvIHRyYWlsaW5nIG5ld2xpbmVzIG9ubHkgaWYgdGhlIG1vdGlvbiBnb2VzIGZvcndhcmQuXG4gICAgICAgICAgICAgIGNsaXBUb0xpbmUoY20sIGN1clN0YXJ0LCBjdXJFbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbW9kZSA9ICdjaGFyJztcbiAgICAgICAgICAgIHZhciBleGNsdXNpdmUgPSAhbW90aW9uQXJncy5pbmNsdXNpdmUgfHwgbGluZXdpc2U7XG4gICAgICAgICAgICB2YXIgbmV3UG9zaXRpb25zID0gdXBkYXRlU2VsZWN0aW9uRm9yU3Vycm9nYXRlQ2hhcmFjdGVycyhjbSwgY3VyU3RhcnQsIGN1ckVuZCk7XG4gICAgICAgICAgICBjbVNlbCA9IG1ha2VDbVNlbGVjdGlvbihjbSwge1xuICAgICAgICAgICAgICBhbmNob3I6IG5ld1Bvc2l0aW9ucy5zdGFydCxcbiAgICAgICAgICAgICAgaGVhZDogbmV3UG9zaXRpb25zLmVuZFxuICAgICAgICAgICAgfSwgbW9kZSwgZXhjbHVzaXZlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY20uc2V0U2VsZWN0aW9ucyhjbVNlbC5yYW5nZXMsIGNtU2VsLnByaW1hcnkpO1xuICAgICAgICAgIHZpbS5sYXN0TW90aW9uID0gbnVsbDtcbiAgICAgICAgICBvcGVyYXRvckFyZ3MucmVwZWF0ID0gcmVwZWF0OyAvLyBGb3IgaW5kZW50IGluIHZpc3VhbCBtb2RlLlxuICAgICAgICAgIG9wZXJhdG9yQXJncy5yZWdpc3Rlck5hbWUgPSByZWdpc3Rlck5hbWU7XG4gICAgICAgICAgLy8gS2VlcCB0cmFjayBvZiBsaW5ld2lzZSBhcyBpdCBhZmZlY3RzIGhvdyBwYXN0ZSBhbmQgY2hhbmdlIGJlaGF2ZS5cbiAgICAgICAgICBvcGVyYXRvckFyZ3MubGluZXdpc2UgPSBsaW5ld2lzZTtcbiAgICAgICAgICB2YXIgb3BlcmF0b3JNb3ZlVG8gPSBvcGVyYXRvcnNbb3BlcmF0b3JdKFxuICAgICAgICAgICAgY20sIG9wZXJhdG9yQXJncywgY21TZWwucmFuZ2VzLCBvbGRBbmNob3IsIG5ld0hlYWQpO1xuICAgICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgZXhpdFZpc3VhbE1vZGUoY20sIG9wZXJhdG9yTW92ZVRvICE9IG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAob3BlcmF0b3JNb3ZlVG8pIHtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihvcGVyYXRvck1vdmVUbyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVjb3JkTGFzdEVkaXQ6IGZ1bmN0aW9uKHZpbSwgaW5wdXRTdGF0ZSwgYWN0aW9uQ29tbWFuZCkge1xuICAgICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgICAgaWYgKG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZykgeyByZXR1cm47IH1cbiAgICAgICAgdmltLmxhc3RFZGl0SW5wdXRTdGF0ZSA9IGlucHV0U3RhdGU7XG4gICAgICAgIHZpbS5sYXN0RWRpdEFjdGlvbkNvbW1hbmQgPSBhY3Rpb25Db21tYW5kO1xuICAgICAgICBtYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXMuY2hhbmdlcyA9IFtdO1xuICAgICAgICBtYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXMuZXhwZWN0Q3Vyc29yQWN0aXZpdHlGb3JDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgbWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzLnZpc3VhbEJsb2NrID0gdmltLnZpc3VhbEJsb2NrID8gdmltLnNlbC5oZWFkLmxpbmUgLSB2aW0uc2VsLmFuY2hvci5saW5lIDogMDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogdHlwZWRlZiB7T2JqZWN0e2xpbmU6bnVtYmVyLGNoOm51bWJlcn19IEN1cnNvciBBbiBvYmplY3QgY29udGFpbmluZyB0aGVcbiAgICAgKiAgICAgcG9zaXRpb24gb2YgdGhlIGN1cnNvci5cbiAgICAgKi9cbiAgICAvLyBBbGwgb2YgdGhlIGZ1bmN0aW9ucyBiZWxvdyByZXR1cm4gQ3Vyc29yIG9iamVjdHMuXG4gICAgdmFyIG1vdGlvbnMgPSB7XG4gICAgICBtb3ZlVG9Ub3BMaW5lOiBmdW5jdGlvbihjbSwgX2hlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBnZXRVc2VyVmlzaWJsZUxpbmVzKGNtKS50b3AgKyBtb3Rpb25BcmdzLnJlcGVhdCAtMTtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MobGluZSwgZmluZEZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbS5nZXRMaW5lKGxpbmUpKSk7XG4gICAgICB9LFxuICAgICAgbW92ZVRvTWlkZGxlTGluZTogZnVuY3Rpb24oY20pIHtcbiAgICAgICAgdmFyIHJhbmdlID0gZ2V0VXNlclZpc2libGVMaW5lcyhjbSk7XG4gICAgICAgIHZhciBsaW5lID0gTWF0aC5mbG9vcigocmFuZ2UudG9wICsgcmFuZ2UuYm90dG9tKSAqIDAuNSk7XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGxpbmUsIGZpbmRGaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20uZ2V0TGluZShsaW5lKSkpO1xuICAgICAgfSxcbiAgICAgIG1vdmVUb0JvdHRvbUxpbmU6IGZ1bmN0aW9uKGNtLCBfaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgbGluZSA9IGdldFVzZXJWaXNpYmxlTGluZXMoY20pLmJvdHRvbSAtIG1vdGlvbkFyZ3MucmVwZWF0ICsxO1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhsaW5lLCBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUobGluZSkpKTtcbiAgICAgIH0sXG4gICAgICBleHBhbmRUb0xpbmU6IGZ1bmN0aW9uKF9jbSwgaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICAvLyBFeHBhbmRzIGZvcndhcmQgdG8gZW5kIG9mIGxpbmUsIGFuZCB0aGVuIHRvIG5leHQgbGluZSBpZiByZXBlYXQgaXNcbiAgICAgICAgLy8gPjEuIERvZXMgbm90IGhhbmRsZSBiYWNrd2FyZCBtb3Rpb24hXG4gICAgICAgIHZhciBjdXIgPSBoZWFkO1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhjdXIubGluZSArIG1vdGlvbkFyZ3MucmVwZWF0IC0gMSwgSW5maW5pdHkpO1xuICAgICAgfSxcbiAgICAgIGZpbmROZXh0OiBmdW5jdGlvbihjbSwgX2hlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gZ2V0U2VhcmNoU3RhdGUoY20pO1xuICAgICAgICB2YXIgcXVlcnkgPSBzdGF0ZS5nZXRRdWVyeSgpO1xuICAgICAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcmV2ID0gIW1vdGlvbkFyZ3MuZm9yd2FyZDtcbiAgICAgICAgLy8gSWYgc2VhcmNoIGlzIGluaXRpYXRlZCB3aXRoID8gaW5zdGVhZCBvZiAvLCBuZWdhdGUgZGlyZWN0aW9uLlxuICAgICAgICBwcmV2ID0gKHN0YXRlLmlzUmV2ZXJzZWQoKSkgPyAhcHJldiA6IHByZXY7XG4gICAgICAgIGhpZ2hsaWdodFNlYXJjaE1hdGNoZXMoY20sIHF1ZXJ5KTtcbiAgICAgICAgcmV0dXJuIGZpbmROZXh0KGNtLCBwcmV2LyoqIHByZXYgKi8sIHF1ZXJ5LCBtb3Rpb25BcmdzLnJlcGVhdCk7XG4gICAgICB9LFxuICAgICAgLyoqXG4gICAgICAgKiBGaW5kIGFuZCBzZWxlY3QgdGhlIG5leHQgb2NjdXJyZW5jZSBvZiB0aGUgc2VhcmNoIHF1ZXJ5LiBJZiB0aGUgY3Vyc29yIGlzIGN1cnJlbnRseVxuICAgICAgICogd2l0aGluIGEgbWF0Y2gsIHRoZW4gZmluZCBhbmQgc2VsZWN0IHRoZSBjdXJyZW50IG1hdGNoLiBPdGhlcndpc2UsIGZpbmQgdGhlIG5leHQgb2NjdXJyZW5jZSBpbiB0aGVcbiAgICAgICAqIGFwcHJvcHJpYXRlIGRpcmVjdGlvbi5cbiAgICAgICAqXG4gICAgICAgKiBUaGlzIGRpZmZlcnMgZnJvbSBgZmluZE5leHRgIGluIHRoZSBmb2xsb3dpbmcgd2F5czpcbiAgICAgICAqXG4gICAgICAgKiAxLiBJbnN0ZWFkIG9mIG9ubHkgcmV0dXJuaW5nIHRoZSBcImZyb21cIiwgdGhpcyByZXR1cm5zIGEgXCJmcm9tXCIsIFwidG9cIiByYW5nZS5cbiAgICAgICAqIDIuIElmIHRoZSBjdXJzb3IgaXMgY3VycmVudGx5IGluc2lkZSBhIHNlYXJjaCBtYXRjaCwgdGhpcyBzZWxlY3RzIHRoZSBjdXJyZW50IG1hdGNoXG4gICAgICAgKiAgICBpbnN0ZWFkIG9mIHRoZSBuZXh0IG1hdGNoLlxuICAgICAgICogMy4gSWYgdGhlcmUgaXMgbm8gYXNzb2NpYXRlZCBvcGVyYXRvciwgdGhpcyB3aWxsIHR1cm4gb24gdmlzdWFsIG1vZGUuXG4gICAgICAgKi9cbiAgICAgIGZpbmRBbmRTZWxlY3ROZXh0SW5jbHVzaXZlOiBmdW5jdGlvbihjbSwgX2hlYWQsIG1vdGlvbkFyZ3MsIHZpbSwgcHJldklucHV0U3RhdGUpIHtcbiAgICAgICAgdmFyIHN0YXRlID0gZ2V0U2VhcmNoU3RhdGUoY20pO1xuICAgICAgICB2YXIgcXVlcnkgPSBzdGF0ZS5nZXRRdWVyeSgpO1xuXG4gICAgICAgIGlmICghcXVlcnkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcHJldiA9ICFtb3Rpb25BcmdzLmZvcndhcmQ7XG4gICAgICAgIHByZXYgPSAoc3RhdGUuaXNSZXZlcnNlZCgpKSA/ICFwcmV2IDogcHJldjtcblxuICAgICAgICAvLyBuZXh0OiBbZnJvbSwgdG9dIHwgbnVsbFxuICAgICAgICB2YXIgbmV4dCA9IGZpbmROZXh0RnJvbUFuZFRvSW5jbHVzaXZlKGNtLCBwcmV2LCBxdWVyeSwgbW90aW9uQXJncy5yZXBlYXQsIHZpbSk7XG5cbiAgICAgICAgLy8gTm8gbWF0Y2hlcy5cbiAgICAgICAgaWYgKCFuZXh0KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgdGhlcmUncyBhbiBvcGVyYXRvciB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQsIHJldHVybiB0aGUgc2VsZWN0aW9uLlxuICAgICAgICBpZiAocHJldklucHV0U3RhdGUub3BlcmF0b3IpIHtcbiAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEF0IHRoaXMgcG9pbnQsIHdlIGtub3cgdGhhdCB0aGVyZSBpcyBubyBhY2NvbXBhbnlpbmcgb3BlcmF0b3IgLS0gbGV0J3NcbiAgICAgICAgLy8gZGVhbCB3aXRoIHZpc3VhbCBtb2RlIGluIG9yZGVyIHRvIHNlbGVjdCBhbiBhcHByb3ByaWF0ZSBtYXRjaC5cblxuICAgICAgICB2YXIgZnJvbSA9IG5leHRbMF07XG4gICAgICAgIC8vIEZvciB3aGF0ZXZlciByZWFzb24sIHdoZW4gd2UgdXNlIHRoZSBcInRvXCIgYXMgcmV0dXJuZWQgYnkgc2VhcmNoY3Vyc29yLmpzIGRpcmVjdGx5LFxuICAgICAgICAvLyB0aGUgcmVzdWx0aW5nIHNlbGVjdGlvbiBpcyBleHRlbmRlZCBieSAxIGNoYXIuIExldCdzIHNocmluayBpdCBzbyB0aGF0IG9ubHkgdGhlXG4gICAgICAgIC8vIG1hdGNoIGlzIHNlbGVjdGVkLlxuICAgICAgICB2YXIgdG8gPSBuZXcgUG9zKG5leHRbMV0ubGluZSwgbmV4dFsxXS5jaCAtIDEpO1xuXG4gICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgIC8vIElmIHdlIHdlcmUgaW4gdmlzdWFsTGluZSBvciB2aXN1YWxCbG9jayBtb2RlLCBnZXQgb3V0IG9mIGl0LlxuICAgICAgICAgIGlmICh2aW0udmlzdWFsTGluZSB8fCB2aW0udmlzdWFsQmxvY2spIHtcbiAgICAgICAgICAgIHZpbS52aXN1YWxMaW5lID0gZmFsc2U7XG4gICAgICAgICAgICB2aW0udmlzdWFsQmxvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJ2aXN1YWxcIiwgc3ViTW9kZTogXCJcIn0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIElmIHdlJ3JlIGN1cnJlbnRseSBpbiB2aXN1YWwgbW9kZSwgd2Ugc2hvdWxkIGV4dGVuZCB0aGUgc2VsZWN0aW9uIHRvIGluY2x1ZGVcbiAgICAgICAgICAvLyB0aGUgc2VhcmNoIHJlc3VsdC5cbiAgICAgICAgICB2YXIgYW5jaG9yID0gdmltLnNlbC5hbmNob3I7XG4gICAgICAgICAgaWYgKGFuY2hvcikge1xuICAgICAgICAgICAgaWYgKHN0YXRlLmlzUmV2ZXJzZWQoKSkge1xuICAgICAgICAgICAgICBpZiAobW90aW9uQXJncy5mb3J3YXJkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFthbmNob3IsIGZyb21dO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIFthbmNob3IsIHRvXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChtb3Rpb25BcmdzLmZvcndhcmQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW2FuY2hvciwgdG9dO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIFthbmNob3IsIGZyb21dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBMZXQncyB0dXJuIHZpc3VhbCBtb2RlIG9uLlxuICAgICAgICAgIHZpbS52aXN1YWxNb2RlID0gdHJ1ZTtcbiAgICAgICAgICB2aW0udmlzdWFsTGluZSA9IGZhbHNlO1xuICAgICAgICAgIHZpbS52aXN1YWxCbG9jayA9IGZhbHNlO1xuICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJ2aXN1YWxcIiwgc3ViTW9kZTogXCJcIn0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHByZXYgPyBbdG8sIGZyb21dIDogW2Zyb20sIHRvXTtcbiAgICAgIH0sXG4gICAgICBnb1RvTWFyazogZnVuY3Rpb24oY20sIF9oZWFkLCBtb3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIHBvcyA9IGdldE1hcmtQb3MoY20sIHZpbSwgbW90aW9uQXJncy5zZWxlY3RlZENoYXJhY3Rlcik7XG4gICAgICAgIGlmIChwb3MpIHtcbiAgICAgICAgICByZXR1cm4gbW90aW9uQXJncy5saW5ld2lzZSA/IHsgbGluZTogcG9zLmxpbmUsIGNoOiBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUocG9zLmxpbmUpKSB9IDogcG9zO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcbiAgICAgIG1vdmVUb090aGVySGlnaGxpZ2h0ZWRFbmQ6IGZ1bmN0aW9uKGNtLCBfaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIGlmICh2aW0udmlzdWFsQmxvY2sgJiYgbW90aW9uQXJncy5zYW1lTGluZSkge1xuICAgICAgICAgIHZhciBzZWwgPSB2aW0uc2VsO1xuICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBuZXcgUG9zKHNlbC5hbmNob3IubGluZSwgc2VsLmhlYWQuY2gpKSxcbiAgICAgICAgICAgIGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIG5ldyBQb3Moc2VsLmhlYWQubGluZSwgc2VsLmFuY2hvci5jaCkpXG4gICAgICAgICAgXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gKFt2aW0uc2VsLmhlYWQsIHZpbS5zZWwuYW5jaG9yXSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBqdW1wVG9NYXJrOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciBiZXN0ID0gaGVhZDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb3Rpb25BcmdzLnJlcGVhdDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGN1cnNvciA9IGJlc3Q7XG4gICAgICAgICAgZm9yICh2YXIga2V5IGluIHZpbS5tYXJrcykge1xuICAgICAgICAgICAgaWYgKCFpc0xvd2VyQ2FzZShrZXkpKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1hcmsgPSB2aW0ubWFya3Nba2V5XS5maW5kKCk7XG4gICAgICAgICAgICB2YXIgaXNXcm9uZ0RpcmVjdGlvbiA9IChtb3Rpb25BcmdzLmZvcndhcmQpID9cbiAgICAgICAgICAgICAgY3Vyc29ySXNCZWZvcmUobWFyaywgY3Vyc29yKSA6IGN1cnNvcklzQmVmb3JlKGN1cnNvciwgbWFyayk7XG5cbiAgICAgICAgICAgIGlmIChpc1dyb25nRGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG1vdGlvbkFyZ3MubGluZXdpc2UgJiYgKG1hcmsubGluZSA9PSBjdXJzb3IubGluZSkpIHtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBlcXVhbCA9IGN1cnNvckVxdWFsKGN1cnNvciwgYmVzdCk7XG4gICAgICAgICAgICB2YXIgYmV0d2VlbiA9IChtb3Rpb25BcmdzLmZvcndhcmQpID9cbiAgICAgICAgICAgICAgY3Vyc29ySXNCZXR3ZWVuKGN1cnNvciwgbWFyaywgYmVzdCkgOlxuICAgICAgICAgICAgICBjdXJzb3JJc0JldHdlZW4oYmVzdCwgbWFyaywgY3Vyc29yKTtcblxuICAgICAgICAgICAgaWYgKGVxdWFsIHx8IGJldHdlZW4pIHtcbiAgICAgICAgICAgICAgYmVzdCA9IG1hcms7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vdGlvbkFyZ3MubGluZXdpc2UpIHtcbiAgICAgICAgICAvLyBWaW0gcGxhY2VzIHRoZSBjdXJzb3Igb24gdGhlIGZpcnN0IG5vbi13aGl0ZXNwYWNlIGNoYXJhY3RlciBvZlxuICAgICAgICAgIC8vIHRoZSBsaW5lIGlmIHRoZXJlIGlzIG9uZSwgZWxzZSBpdCBwbGFjZXMgdGhlIGN1cnNvciBhdCB0aGUgZW5kXG4gICAgICAgICAgLy8gb2YgdGhlIGxpbmUsIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciBhIG1hcmsgd2FzIGZvdW5kLlxuICAgICAgICAgIGJlc3QgPSBuZXcgUG9zKGJlc3QubGluZSwgZmluZEZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbS5nZXRMaW5lKGJlc3QubGluZSkpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYmVzdDtcbiAgICAgIH0sXG4gICAgICBtb3ZlQnlDaGFyYWN0ZXJzOiBmdW5jdGlvbihfY20sIGhlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIGN1ciA9IGhlYWQ7XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgdmFyIGNoID0gbW90aW9uQXJncy5mb3J3YXJkID8gY3VyLmNoICsgcmVwZWF0IDogY3VyLmNoIC0gcmVwZWF0O1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhjdXIubGluZSwgY2gpO1xuICAgICAgfSxcbiAgICAgIG1vdmVCeUxpbmVzOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciBjdXIgPSBoZWFkO1xuICAgICAgICB2YXIgZW5kQ2ggPSBjdXIuY2g7XG4gICAgICAgIC8vIERlcGVuZGluZyB3aGF0IG91ciBsYXN0IG1vdGlvbiB3YXMsIHdlIG1heSB3YW50IHRvIGRvIGRpZmZlcmVudFxuICAgICAgICAvLyB0aGluZ3MuIElmIG91ciBsYXN0IG1vdGlvbiB3YXMgbW92aW5nIHZlcnRpY2FsbHksIHdlIHdhbnQgdG9cbiAgICAgICAgLy8gcHJlc2VydmUgdGhlIEhQb3MgZnJvbSBvdXIgbGFzdCBob3Jpem9udGFsIG1vdmUuICBJZiBvdXIgbGFzdCBtb3Rpb25cbiAgICAgICAgLy8gd2FzIGdvaW5nIHRvIHRoZSBlbmQgb2YgYSBsaW5lLCBtb3ZpbmcgdmVydGljYWxseSB3ZSBzaG91bGQgZ28gdG9cbiAgICAgICAgLy8gdGhlIGVuZCBvZiB0aGUgbGluZSwgZXRjLlxuICAgICAgICBzd2l0Y2ggKHZpbS5sYXN0TW90aW9uKSB7XG4gICAgICAgICAgY2FzZSB0aGlzLm1vdmVCeUxpbmVzOlxuICAgICAgICAgIGNhc2UgdGhpcy5tb3ZlQnlEaXNwbGF5TGluZXM6XG4gICAgICAgICAgY2FzZSB0aGlzLm1vdmVCeVNjcm9sbDpcbiAgICAgICAgICBjYXNlIHRoaXMubW92ZVRvQ29sdW1uOlxuICAgICAgICAgIGNhc2UgdGhpcy5tb3ZlVG9Fb2w6XG4gICAgICAgICAgICBlbmRDaCA9IHZpbS5sYXN0SFBvcztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2aW0ubGFzdEhQb3MgPSBlbmRDaDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVwZWF0ID0gbW90aW9uQXJncy5yZXBlYXQrKG1vdGlvbkFyZ3MucmVwZWF0T2Zmc2V0fHwwKTtcbiAgICAgICAgdmFyIGxpbmUgPSBtb3Rpb25BcmdzLmZvcndhcmQgPyBjdXIubGluZSArIHJlcGVhdCA6IGN1ci5saW5lIC0gcmVwZWF0O1xuICAgICAgICB2YXIgZmlyc3QgPSBjbS5maXJzdExpbmUoKTtcbiAgICAgICAgdmFyIGxhc3QgPSBjbS5sYXN0TGluZSgpO1xuICAgICAgICAvLyBWaW0gZ28gdG8gbGluZSBiZWdpbiBvciBsaW5lIGVuZCB3aGVuIGN1cnNvciBhdCBmaXJzdC9sYXN0IGxpbmUgYW5kXG4gICAgICAgIC8vIG1vdmUgdG8gcHJldmlvdXMvbmV4dCBsaW5lIGlzIHRyaWdnZXJlZC5cbiAgICAgICAgaWYgKGxpbmUgPCBmaXJzdCAmJiBjdXIubGluZSA9PSBmaXJzdCl7XG4gICAgICAgICAgcmV0dXJuIHRoaXMubW92ZVRvU3RhcnRPZkxpbmUoY20sIGhlYWQsIG1vdGlvbkFyZ3MsIHZpbSk7XG4gICAgICAgIH0gZWxzZSBpZiAobGluZSA+IGxhc3QgJiYgY3VyLmxpbmUgPT0gbGFzdCl7XG4gICAgICAgICAgICByZXR1cm4gbW92ZVRvRW9sKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0sIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGFjZV9wYXRjaHtcbiAgICAgICAgdmFyIGZvbGQgPSBjbS5hY2Uuc2Vzc2lvbi5nZXRGb2xkTGluZShsaW5lKTtcbiAgICAgICAgaWYgKGZvbGQpIHtcbiAgICAgICAgICBpZiAobW90aW9uQXJncy5mb3J3YXJkKSB7XG4gICAgICAgICAgICBpZiAobGluZSA+IGZvbGQuc3RhcnQucm93KVxuICAgICAgICAgICAgICBsaW5lID0gZm9sZC5lbmQucm93ICsgMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGluZSA9IGZvbGQuc3RhcnQucm93O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBhY2VfcGF0Y2h9XG4gICAgICAgIGlmIChtb3Rpb25BcmdzLnRvRmlyc3RDaGFyKXtcbiAgICAgICAgICBlbmRDaD1maW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUobGluZSkpO1xuICAgICAgICAgIHZpbS5sYXN0SFBvcyA9IGVuZENoO1xuICAgICAgICB9XG4gICAgICAgIHZpbS5sYXN0SFNQb3MgPSBjbS5jaGFyQ29vcmRzKG5ldyBQb3MobGluZSwgZW5kQ2gpLCdkaXYnKS5sZWZ0O1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhsaW5lLCBlbmRDaCk7XG4gICAgICB9LFxuICAgICAgbW92ZUJ5RGlzcGxheUxpbmVzOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciBjdXIgPSBoZWFkO1xuICAgICAgICBzd2l0Y2ggKHZpbS5sYXN0TW90aW9uKSB7XG4gICAgICAgICAgY2FzZSB0aGlzLm1vdmVCeURpc3BsYXlMaW5lczpcbiAgICAgICAgICBjYXNlIHRoaXMubW92ZUJ5U2Nyb2xsOlxuICAgICAgICAgIGNhc2UgdGhpcy5tb3ZlQnlMaW5lczpcbiAgICAgICAgICBjYXNlIHRoaXMubW92ZVRvQ29sdW1uOlxuICAgICAgICAgIGNhc2UgdGhpcy5tb3ZlVG9Fb2w6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmltLmxhc3RIU1BvcyA9IGNtLmNoYXJDb29yZHMoY3VyLCdkaXYnKS5sZWZ0O1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgdmFyIHJlcz1jbS5maW5kUG9zVihjdXIsKG1vdGlvbkFyZ3MuZm9yd2FyZCA/IHJlcGVhdCA6IC1yZXBlYXQpLCdsaW5lJyx2aW0ubGFzdEhTUG9zKTtcbiAgICAgICAgaWYgKHJlcy5oaXRTaWRlKSB7XG4gICAgICAgICAgaWYgKG1vdGlvbkFyZ3MuZm9yd2FyZCkge1xuICAgICAgICAgICAgdmFyIGxhc3RDaGFyQ29vcmRzID0gY20uY2hhckNvb3JkcyhyZXMsICdkaXYnKTtcbiAgICAgICAgICAgIHZhciBnb2FsQ29vcmRzID0geyB0b3A6IGxhc3RDaGFyQ29vcmRzLnRvcCArIDgsIGxlZnQ6IHZpbS5sYXN0SFNQb3MgfTtcbiAgICAgICAgICAgIHZhciByZXMgPSBjbS5jb29yZHNDaGFyKGdvYWxDb29yZHMsICdkaXYnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHJlc0Nvb3JkcyA9IGNtLmNoYXJDb29yZHMobmV3IFBvcyhjbS5maXJzdExpbmUoKSwgMCksICdkaXYnKTtcbiAgICAgICAgICAgIHJlc0Nvb3Jkcy5sZWZ0ID0gdmltLmxhc3RIU1BvcztcbiAgICAgICAgICAgIHJlcyA9IGNtLmNvb3Jkc0NoYXIocmVzQ29vcmRzLCAnZGl2Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZpbS5sYXN0SFBvcyA9IHJlcy5jaDtcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH0sXG4gICAgICBtb3ZlQnlQYWdlOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICAvLyBDb2RlTWlycm9yIG9ubHkgZXhwb3NlcyBmdW5jdGlvbnMgdGhhdCBtb3ZlIHRoZSBjdXJzb3IgcGFnZSBkb3duLCBzb1xuICAgICAgICAvLyBkb2luZyB0aGlzIGJhZCBoYWNrIHRvIG1vdmUgdGhlIGN1cnNvciBhbmQgbW92ZSBpdCBiYWNrLiBldmFsSW5wdXRcbiAgICAgICAgLy8gd2lsbCBtb3ZlIHRoZSBjdXJzb3IgdG8gd2hlcmUgaXQgc2hvdWxkIGJlIGluIHRoZSBlbmQuXG4gICAgICAgIHZhciBjdXJTdGFydCA9IGhlYWQ7XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgcmV0dXJuIGNtLmZpbmRQb3NWKGN1clN0YXJ0LCAobW90aW9uQXJncy5mb3J3YXJkID8gcmVwZWF0IDogLXJlcGVhdCksICdwYWdlJyk7XG4gICAgICB9LFxuICAgICAgbW92ZUJ5UGFyYWdyYXBoOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgZGlyID0gbW90aW9uQXJncy5mb3J3YXJkID8gMSA6IC0xO1xuICAgICAgICByZXR1cm4gZmluZFBhcmFncmFwaChjbSwgaGVhZCwgbW90aW9uQXJncy5yZXBlYXQsIGRpcik7XG4gICAgICB9LFxuICAgICAgbW92ZUJ5U2VudGVuY2U6IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciBkaXIgPSBtb3Rpb25BcmdzLmZvcndhcmQgPyAxIDogLTE7XG4gICAgICAgIHJldHVybiBmaW5kU2VudGVuY2UoY20sIGhlYWQsIG1vdGlvbkFyZ3MucmVwZWF0LCBkaXIpO1xuICAgICAgfSxcbiAgICAgIG1vdmVCeVNjcm9sbDogZnVuY3Rpb24oY20sIGhlYWQsIG1vdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgc2Nyb2xsYm94ID0gY20uZ2V0U2Nyb2xsSW5mbygpO1xuICAgICAgICB2YXIgY3VyRW5kID0gbnVsbDtcbiAgICAgICAgdmFyIHJlcGVhdCA9IG1vdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICBpZiAoIXJlcGVhdCkge1xuICAgICAgICAgIHJlcGVhdCA9IHNjcm9sbGJveC5jbGllbnRIZWlnaHQgLyAoMiAqIGNtLmRlZmF1bHRUZXh0SGVpZ2h0KCkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBvcmlnID0gY20uY2hhckNvb3JkcyhoZWFkLCAnbG9jYWwnKTtcbiAgICAgICAgbW90aW9uQXJncy5yZXBlYXQgPSByZXBlYXQ7XG4gICAgICAgIGN1ckVuZCA9IG1vdGlvbnMubW92ZUJ5RGlzcGxheUxpbmVzKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0pO1xuICAgICAgICBpZiAoIWN1ckVuZCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZXN0ID0gY20uY2hhckNvb3JkcyhjdXJFbmQsICdsb2NhbCcpO1xuICAgICAgICBjbS5zY3JvbGxUbyhudWxsLCBzY3JvbGxib3gudG9wICsgZGVzdC50b3AgLSBvcmlnLnRvcCk7XG4gICAgICAgIHJldHVybiBjdXJFbmQ7XG4gICAgICB9LFxuICAgICAgbW92ZUJ5V29yZHM6IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIHJldHVybiBtb3ZlVG9Xb3JkKGNtLCBoZWFkLCBtb3Rpb25BcmdzLnJlcGVhdCwgISFtb3Rpb25BcmdzLmZvcndhcmQsXG4gICAgICAgICAgICAhIW1vdGlvbkFyZ3Mud29yZEVuZCwgISFtb3Rpb25BcmdzLmJpZ1dvcmQpO1xuICAgICAgfSxcbiAgICAgIG1vdmVUaWxsQ2hhcmFjdGVyOiBmdW5jdGlvbihjbSwgX2hlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIHJlcGVhdCA9IG1vdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICB2YXIgY3VyRW5kID0gbW92ZVRvQ2hhcmFjdGVyKGNtLCByZXBlYXQsIG1vdGlvbkFyZ3MuZm9yd2FyZCxcbiAgICAgICAgICAgIG1vdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXIpO1xuICAgICAgICB2YXIgaW5jcmVtZW50ID0gbW90aW9uQXJncy5mb3J3YXJkID8gLTEgOiAxO1xuICAgICAgICByZWNvcmRMYXN0Q2hhcmFjdGVyU2VhcmNoKGluY3JlbWVudCwgbW90aW9uQXJncyk7XG4gICAgICAgIGlmICghY3VyRW5kKSByZXR1cm4gbnVsbDtcbiAgICAgICAgY3VyRW5kLmNoICs9IGluY3JlbWVudDtcbiAgICAgICAgcmV0dXJuIGN1ckVuZDtcbiAgICAgIH0sXG4gICAgICBtb3ZlVG9DaGFyYWN0ZXI6IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgcmVjb3JkTGFzdENoYXJhY3RlclNlYXJjaCgwLCBtb3Rpb25BcmdzKTtcbiAgICAgICAgcmV0dXJuIG1vdmVUb0NoYXJhY3RlcihjbSwgcmVwZWF0LCBtb3Rpb25BcmdzLmZvcndhcmQsXG4gICAgICAgICAgICBtb3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyKSB8fCBoZWFkO1xuICAgICAgfSxcbiAgICAgIG1vdmVUb1N5bWJvbDogZnVuY3Rpb24oY20sIGhlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIHJlcGVhdCA9IG1vdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICByZXR1cm4gZmluZFN5bWJvbChjbSwgcmVwZWF0LCBtb3Rpb25BcmdzLmZvcndhcmQsXG4gICAgICAgICAgICBtb3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyKSB8fCBoZWFkO1xuICAgICAgfSxcbiAgICAgIG1vdmVUb0NvbHVtbjogZnVuY3Rpb24oY20sIGhlYWQsIG1vdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgcmVwZWF0ID0gbW90aW9uQXJncy5yZXBlYXQ7XG4gICAgICAgIC8vIHJlcGVhdCBpcyBlcXVpdmFsZW50IHRvIHdoaWNoIGNvbHVtbiB3ZSB3YW50IHRvIG1vdmUgdG8hXG4gICAgICAgIHZpbS5sYXN0SFBvcyA9IHJlcGVhdCAtIDE7XG4gICAgICAgIHZpbS5sYXN0SFNQb3MgPSBjbS5jaGFyQ29vcmRzKGhlYWQsJ2RpdicpLmxlZnQ7XG4gICAgICAgIHJldHVybiBtb3ZlVG9Db2x1bW4oY20sIHJlcGVhdCk7XG4gICAgICB9LFxuICAgICAgbW92ZVRvRW9sOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIHJldHVybiBtb3ZlVG9Fb2woY20sIGhlYWQsIG1vdGlvbkFyZ3MsIHZpbSwgZmFsc2UpO1xuICAgICAgfSxcbiAgICAgIG1vdmVUb0ZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcjogZnVuY3Rpb24oY20sIGhlYWQpIHtcbiAgICAgICAgLy8gR28gdG8gdGhlIHN0YXJ0IG9mIHRoZSBsaW5lIHdoZXJlIHRoZSB0ZXh0IGJlZ2lucywgb3IgdGhlIGVuZCBmb3JcbiAgICAgICAgLy8gd2hpdGVzcGFjZS1vbmx5IGxpbmVzXG4gICAgICAgIHZhciBjdXJzb3IgPSBoZWFkO1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhjdXJzb3IubGluZSxcbiAgICAgICAgICAgICAgICAgICBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUoY3Vyc29yLmxpbmUpKSk7XG4gICAgICB9LFxuICAgICAgbW92ZVRvTWF0Y2hlZFN5bWJvbDogZnVuY3Rpb24oY20sIGhlYWQpIHtcbiAgICAgICAgdmFyIGN1cnNvciA9IGhlYWQ7XG4gICAgICAgIHZhciBsaW5lID0gY3Vyc29yLmxpbmU7XG4gICAgICAgIHZhciBjaCA9IGN1cnNvci5jaDtcbiAgICAgICAgdmFyIGxpbmVUZXh0ID0gY20uZ2V0TGluZShsaW5lKTtcbiAgICAgICAgdmFyIHN5bWJvbDtcbiAgICAgICAgZm9yICg7IGNoIDwgbGluZVRleHQubGVuZ3RoOyBjaCsrKSB7XG4gICAgICAgICAgc3ltYm9sID0gbGluZVRleHQuY2hhckF0KGNoKTtcbiAgICAgICAgICBpZiAoc3ltYm9sICYmIGlzTWF0Y2hhYmxlU3ltYm9sKHN5bWJvbCkpIHtcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IGNtLmdldFRva2VuVHlwZUF0KG5ldyBQb3MobGluZSwgY2ggKyAxKSk7XG4gICAgICAgICAgICBpZiAoc3R5bGUgIT09IFwic3RyaW5nXCIgJiYgc3R5bGUgIT09IFwiY29tbWVudFwiKSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY2ggPCBsaW5lVGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAvLyBPbmx5IGluY2x1ZGUgYW5nbGUgYnJhY2tldHMgaW4gYW5hbHlzaXMgaWYgdGhleSBhcmUgYmVpbmcgbWF0Y2hlZC5cbiAgICAgICAgICB2YXIgcmUgPSAvWzw+XS8udGVzdChsaW5lVGV4dFtjaF0pID8gL1soKXt9W1xcXTw+XS8gOiAvWygpe31bXFxdXS87IC8vYWNlX3BhdGNoP1xuICAgICAgICAgIHZhciBtYXRjaGVkID0gY20uZmluZE1hdGNoaW5nQnJhY2tldChuZXcgUG9zKGxpbmUsIGNoKzEpLCB7YnJhY2tldFJlZ2V4OiByZX0pO1xuICAgICAgICAgIHJldHVybiBtYXRjaGVkLnRvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBjdXJzb3I7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtb3ZlVG9TdGFydE9mTGluZTogZnVuY3Rpb24oX2NtLCBoZWFkKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGhlYWQubGluZSwgMCk7XG4gICAgICB9LFxuICAgICAgbW92ZVRvTGluZU9yRWRnZU9mRG9jdW1lbnQ6IGZ1bmN0aW9uKGNtLCBfaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgbGluZU51bSA9IG1vdGlvbkFyZ3MuZm9yd2FyZCA/IGNtLmxhc3RMaW5lKCkgOiBjbS5maXJzdExpbmUoKTtcbiAgICAgICAgaWYgKG1vdGlvbkFyZ3MucmVwZWF0SXNFeHBsaWNpdCkge1xuICAgICAgICAgIGxpbmVOdW0gPSBtb3Rpb25BcmdzLnJlcGVhdCAtIGNtLmdldE9wdGlvbignZmlyc3RMaW5lTnVtYmVyJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQb3MobGluZU51bSxcbiAgICAgICAgICAgICAgICAgICBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUobGluZU51bSkpKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlVG9TdGFydE9mRGlzcGxheUxpbmU6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgIGNtLmV4ZWNDb21tYW5kKFwiZ29MaW5lTGVmdFwiKTtcbiAgICAgICAgcmV0dXJuIGNtLmdldEN1cnNvcigpO1xuICAgICAgfSxcbiAgICAgIG1vdmVUb0VuZE9mRGlzcGxheUxpbmU6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgIGNtLmV4ZWNDb21tYW5kKFwiZ29MaW5lUmlnaHRcIik7XG4gICAgICAgIHZhciBoZWFkID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgIGlmIChoZWFkLnN0aWNreSA9PSBcImJlZm9yZVwiKSBoZWFkLmNoLS07XG4gICAgICAgIHJldHVybiBoZWFkO1xuICAgICAgfSxcbiAgICAgIHRleHRPYmplY3RNYW5pcHVsYXRpb246IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgLy8gVE9ETzogbG90cyBvZiBwb3NzaWJsZSBleGNlcHRpb25zIHRoYXQgY2FuIGJlIHRocm93biBoZXJlLiBUcnkgZGEoXG4gICAgICAgIC8vICAgICBvdXRzaWRlIG9mIGEgKCkgYmxvY2suXG4gICAgICAgIHZhciBtaXJyb3JlZFBhaXJzID0geycoJzogJyknLCAnKSc6ICcoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3snOiAnfScsICd9JzogJ3snLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnWyc6ICddJywgJ10nOiAnWycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICc8JzogJz4nLCAnPic6ICc8J307XG4gICAgICAgIHZhciBzZWxmUGFpcmVkID0geydcXCcnOiB0cnVlLCAnXCInOiB0cnVlLCAnYCc6IHRydWV9O1xuXG4gICAgICAgIHZhciBjaGFyYWN0ZXIgPSBtb3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyO1xuICAgICAgICAvLyAnYicgcmVmZXJzIHRvICAnKCknIGJsb2NrLlxuICAgICAgICAvLyAnQicgcmVmZXJzIHRvICAne30nIGJsb2NrLlxuICAgICAgICBpZiAoY2hhcmFjdGVyID09ICdiJykge1xuICAgICAgICAgIGNoYXJhY3RlciA9ICcoJztcbiAgICAgICAgfSBlbHNlIGlmIChjaGFyYWN0ZXIgPT0gJ0InKSB7XG4gICAgICAgICAgY2hhcmFjdGVyID0gJ3snO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSW5jbHVzaXZlIGlzIHRoZSBkaWZmZXJlbmNlIGJldHdlZW4gYSBhbmQgaVxuICAgICAgICAvLyBUT0RPOiBJbnN0ZWFkIG9mIHVzaW5nIHRoZSBhZGRpdGlvbmFsIHRleHQgb2JqZWN0IG1hcCB0byBwZXJmb3JtIHRleHRcbiAgICAgICAgLy8gICAgIG9iamVjdCBvcGVyYXRpb25zLCBtZXJnZSB0aGUgbWFwIGludG8gdGhlIGRlZmF1bHRLZXlNYXAgYW5kIHVzZVxuICAgICAgICAvLyAgICAgbW90aW9uQXJncyB0byBkZWZpbmUgYmVoYXZpb3IuIERlZmluZSBzZXBhcmF0ZSBlbnRyaWVzIGZvciAnYXcnLFxuICAgICAgICAvLyAgICAgJ2l3JywgJ2FbJywgJ2lbJywgZXRjLlxuICAgICAgICB2YXIgaW5jbHVzaXZlID0gIW1vdGlvbkFyZ3MudGV4dE9iamVjdElubmVyO1xuXG4gICAgICAgIHZhciB0bXA7XG4gICAgICAgIGlmIChtaXJyb3JlZFBhaXJzW2NoYXJhY3Rlcl0pIHtcbiAgICAgICAgICB0bXAgPSBzZWxlY3RDb21wYW5pb25PYmplY3QoY20sIGhlYWQsIGNoYXJhY3RlciwgaW5jbHVzaXZlKTtcbiAgICAgICAgfSBlbHNlIGlmIChzZWxmUGFpcmVkW2NoYXJhY3Rlcl0pIHtcbiAgICAgICAgICB0bXAgPSBmaW5kQmVnaW5uaW5nQW5kRW5kKGNtLCBoZWFkLCBjaGFyYWN0ZXIsIGluY2x1c2l2ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyID09PSAnVycpIHtcbiAgICAgICAgICB0bXAgPSBleHBhbmRXb3JkVW5kZXJDdXJzb3IoY20sIGluY2x1c2l2ZSwgdHJ1ZSAvKiogZm9yd2FyZCAqLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSAvKiogYmlnV29yZCAqLyk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyID09PSAndycpIHtcbiAgICAgICAgICB0bXAgPSBleHBhbmRXb3JkVW5kZXJDdXJzb3IoY20sIGluY2x1c2l2ZSwgdHJ1ZSAvKiogZm9yd2FyZCAqLyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UgLyoqIGJpZ1dvcmQgKi8pO1xuICAgICAgICB9IGVsc2UgaWYgKGNoYXJhY3RlciA9PT0gJ3AnKSB7XG4gICAgICAgICAgdG1wID0gZmluZFBhcmFncmFwaChjbSwgaGVhZCwgbW90aW9uQXJncy5yZXBlYXQsIDAsIGluY2x1c2l2ZSk7XG4gICAgICAgICAgbW90aW9uQXJncy5saW5ld2lzZSA9IHRydWU7XG4gICAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICBpZiAoIXZpbS52aXN1YWxMaW5lKSB7IHZpbS52aXN1YWxMaW5lID0gdHJ1ZTsgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgb3BlcmF0b3JBcmdzID0gdmltLmlucHV0U3RhdGUub3BlcmF0b3JBcmdzO1xuICAgICAgICAgICAgaWYgKG9wZXJhdG9yQXJncykgeyBvcGVyYXRvckFyZ3MubGluZXdpc2UgPSB0cnVlOyB9XG4gICAgICAgICAgICB0bXAuZW5kLmxpbmUtLTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyID09PSAndCcpIHtcbiAgICAgICAgICB0bXAgPSBleHBhbmRUYWdVbmRlckN1cnNvcihjbSwgaGVhZCwgaW5jbHVzaXZlKTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGFyYWN0ZXIgPT09ICdzJykge1xuICAgICAgICAgIC8vIGFjY291bnQgZm9yIGN1cnNvciBvbiBlbmQgb2Ygc2VudGVuY2Ugc3ltYm9sXG4gICAgICAgICAgdmFyIGNvbnRlbnQgPSBjbS5nZXRMaW5lKGhlYWQubGluZSk7XG4gICAgICAgICAgaWYgKGhlYWQuY2ggPiAwICYmIGlzRW5kT2ZTZW50ZW5jZVN5bWJvbChjb250ZW50W2hlYWQuY2hdKSkge1xuICAgICAgICAgICAgaGVhZC5jaCAtPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgZW5kID0gZ2V0U2VudGVuY2UoY20sIGhlYWQsIG1vdGlvbkFyZ3MucmVwZWF0LCAxLCBpbmNsdXNpdmUpXG4gICAgICAgICAgdmFyIHN0YXJ0ID0gZ2V0U2VudGVuY2UoY20sIGhlYWQsIG1vdGlvbkFyZ3MucmVwZWF0LCAtMSwgaW5jbHVzaXZlKVxuICAgICAgICAgIC8vIGNsb3NlciB2aW0gYmVoYXZpb3VyLCAnYScgb25seSB0YWtlcyB0aGUgc3BhY2UgYWZ0ZXIgdGhlIHNlbnRlbmNlIGlmIHRoZXJlIGlzIG9uZSBiZWZvcmUgYW5kIGFmdGVyXG4gICAgICAgICAgaWYgKGlzV2hpdGVTcGFjZVN0cmluZyhjbS5nZXRMaW5lKHN0YXJ0LmxpbmUpW3N0YXJ0LmNoXSlcbiAgICAgICAgICAgICAgJiYgaXNXaGl0ZVNwYWNlU3RyaW5nKGNtLmdldExpbmUoZW5kLmxpbmUpW2VuZC5jaCAtMV0pKSB7XG4gICAgICAgICAgICBzdGFydCA9IHtsaW5lOiBzdGFydC5saW5lLCBjaDogc3RhcnQuY2ggKyAxfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0bXAgPSB7c3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gTm8gdGV4dCBvYmplY3QgZGVmaW5lZCBmb3IgdGhpcywgZG9uJ3QgbW92ZS5cbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY20uc3RhdGUudmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICByZXR1cm4gW3RtcC5zdGFydCwgdG1wLmVuZF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGV4cGFuZFNlbGVjdGlvbihjbSwgdG1wLnN0YXJ0LCB0bXAuZW5kKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgcmVwZWF0TGFzdENoYXJhY3RlclNlYXJjaDogZnVuY3Rpb24oY20sIGhlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIGxhc3RTZWFyY2ggPSB2aW1HbG9iYWxTdGF0ZS5sYXN0Q2hhcmFjdGVyU2VhcmNoO1xuICAgICAgICB2YXIgcmVwZWF0ID0gbW90aW9uQXJncy5yZXBlYXQ7XG4gICAgICAgIHZhciBmb3J3YXJkID0gbW90aW9uQXJncy5mb3J3YXJkID09PSBsYXN0U2VhcmNoLmZvcndhcmQ7XG4gICAgICAgIHZhciBpbmNyZW1lbnQgPSAobGFzdFNlYXJjaC5pbmNyZW1lbnQgPyAxIDogMCkgKiAoZm9yd2FyZCA/IC0xIDogMSk7XG4gICAgICAgIGNtLm1vdmVIKC1pbmNyZW1lbnQsICdjaGFyJyk7XG4gICAgICAgIG1vdGlvbkFyZ3MuaW5jbHVzaXZlID0gZm9yd2FyZCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgdmFyIGN1ckVuZCA9IG1vdmVUb0NoYXJhY3RlcihjbSwgcmVwZWF0LCBmb3J3YXJkLCBsYXN0U2VhcmNoLnNlbGVjdGVkQ2hhcmFjdGVyKTtcbiAgICAgICAgaWYgKCFjdXJFbmQpIHtcbiAgICAgICAgICBjbS5tb3ZlSChpbmNyZW1lbnQsICdjaGFyJyk7XG4gICAgICAgICAgcmV0dXJuIGhlYWQ7XG4gICAgICAgIH1cbiAgICAgICAgY3VyRW5kLmNoICs9IGluY3JlbWVudDtcbiAgICAgICAgcmV0dXJuIGN1ckVuZDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZGVmaW5lTW90aW9uKG5hbWUsIGZuKSB7XG4gICAgICBtb3Rpb25zW25hbWVdID0gZm47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlsbEFycmF5KHZhbCwgdGltZXMpIHtcbiAgICAgIHZhciBhcnIgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGltZXM7IGkrKykge1xuICAgICAgICBhcnIucHVzaCh2YWwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQW4gb3BlcmF0b3IgYWN0cyBvbiBhIHRleHQgc2VsZWN0aW9uLiBJdCByZWNlaXZlcyB0aGUgbGlzdCBvZiBzZWxlY3Rpb25zXG4gICAgICogYXMgaW5wdXQuIFRoZSBjb3JyZXNwb25kaW5nIENvZGVNaXJyb3Igc2VsZWN0aW9uIGlzIGd1YXJhbnRlZWQgdG9cbiAgICAqIG1hdGNoIHRoZSBpbnB1dCBzZWxlY3Rpb24uXG4gICAgICovXG4gICAgdmFyIG9wZXJhdG9ycyA9IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24oY20sIGFyZ3MsIHJhbmdlcykge1xuICAgICAgICB2YXIgZmluYWxIZWFkLCB0ZXh0O1xuICAgICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgICB2YXIgYW5jaG9yID0gcmFuZ2VzWzBdLmFuY2hvcixcbiAgICAgICAgICAgIGhlYWQgPSByYW5nZXNbMF0uaGVhZDtcbiAgICAgICAgaWYgKCF2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgIHRleHQgPSBjbS5nZXRSYW5nZShhbmNob3IsIGhlYWQpO1xuICAgICAgICAgIHZhciBsYXN0U3RhdGUgPSB2aW0ubGFzdEVkaXRJbnB1dFN0YXRlIHx8IHt9O1xuICAgICAgICAgIGlmIChsYXN0U3RhdGUubW90aW9uID09IFwibW92ZUJ5V29yZHNcIiAmJiAhaXNXaGl0ZVNwYWNlU3RyaW5nKHRleHQpKSB7XG4gICAgICAgICAgICAvLyBFeGNsdWRlIHRyYWlsaW5nIHdoaXRlc3BhY2UgaWYgdGhlIHJhbmdlIGlzIG5vdCBhbGwgd2hpdGVzcGFjZS5cbiAgICAgICAgICAgIHZhciBtYXRjaCA9ICgvXFxzKyQvKS5leGVjKHRleHQpO1xuICAgICAgICAgICAgaWYgKG1hdGNoICYmIGxhc3RTdGF0ZS5tb3Rpb25BcmdzICYmIGxhc3RTdGF0ZS5tb3Rpb25BcmdzLmZvcndhcmQpIHtcbiAgICAgICAgICAgICAgaGVhZCA9IG9mZnNldEN1cnNvcihoZWFkLCAwLCAtIG1hdGNoWzBdLmxlbmd0aCk7XG4gICAgICAgICAgICAgIHRleHQgPSB0ZXh0LnNsaWNlKDAsIC0gbWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHByZXZMaW5lRW5kID0gbmV3IFBvcyhhbmNob3IubGluZSAtIDEsIE51bWJlci5NQVhfVkFMVUUpO1xuICAgICAgICAgIHZhciB3YXNMYXN0TGluZSA9IGNtLmZpcnN0TGluZSgpID09IGNtLmxhc3RMaW5lKCk7XG4gICAgICAgICAgaWYgKGhlYWQubGluZSA+IGNtLmxhc3RMaW5lKCkgJiYgYXJncy5saW5ld2lzZSAmJiAhd2FzTGFzdExpbmUpIHtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZSgnJywgcHJldkxpbmVFbmQsIGhlYWQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UoJycsIGFuY2hvciwgaGVhZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhcmdzLmxpbmV3aXNlKSB7XG4gICAgICAgICAgICAvLyBQdXNoIHRoZSBuZXh0IGxpbmUgYmFjayBkb3duLCBpZiB0aGVyZSBpcyBhIG5leHQgbGluZS5cbiAgICAgICAgICAgIGlmICghd2FzTGFzdExpbmUpIHtcbiAgICAgICAgICAgICAgY20uc2V0Q3Vyc29yKHByZXZMaW5lRW5kKTtcbiAgICAgICAgICAgICAgQ29kZU1pcnJvci5jb21tYW5kcy5uZXdsaW5lQW5kSW5kZW50KGNtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG1ha2Ugc3VyZSBjdXJzb3IgZW5kcyB1cCBhdCB0aGUgZW5kIG9mIHRoZSBsaW5lLlxuICAgICAgICAgICAgYW5jaG9yLmNoID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZmluYWxIZWFkID0gYW5jaG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MuZnVsbExpbmUpIHtcbiAgICAgICAgICAgIGhlYWQuY2ggPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICAgICAgaGVhZC5saW5lLS07XG4gICAgICAgICAgICBjbS5zZXRTZWxlY3Rpb24oYW5jaG9yLCBoZWFkKVxuICAgICAgICAgICAgdGV4dCA9IGNtLmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbihcIlwiKTtcbiAgICAgICAgICAgIGZpbmFsSGVhZCA9IGFuY2hvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZXh0ID0gY20uZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgdmFyIHJlcGxhY2VtZW50ID0gZmlsbEFycmF5KCcnLCByYW5nZXMubGVuZ3RoKTtcbiAgICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9ucyhyZXBsYWNlbWVudCk7XG4gICAgICAgICAgZmluYWxIZWFkID0gY3Vyc29yTWluKHJhbmdlc1swXS5oZWFkLCByYW5nZXNbMF0uYW5jaG9yKTtcbiAgICAgICAgfVxuICAgICAgICB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIucHVzaFRleHQoXG4gICAgICAgICAgICBhcmdzLnJlZ2lzdGVyTmFtZSwgJ2NoYW5nZScsIHRleHQsXG4gICAgICAgICAgICBhcmdzLmxpbmV3aXNlLCByYW5nZXMubGVuZ3RoID4gMSk7XG4gICAgICAgIGFjdGlvbnMuZW50ZXJJbnNlcnRNb2RlKGNtLCB7aGVhZDogZmluYWxIZWFkfSwgY20uc3RhdGUudmltKTtcbiAgICAgIH0sXG4gICAgICAvLyBkZWxldGUgaXMgYSBqYXZhc2NyaXB0IGtleXdvcmQuXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oY20sIGFyZ3MsIHJhbmdlcykge1xuICAgICAgICB2YXIgZmluYWxIZWFkLCB0ZXh0O1xuICAgICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgICBpZiAoIXZpbS52aXN1YWxCbG9jaykge1xuICAgICAgICAgIHZhciBhbmNob3IgPSByYW5nZXNbMF0uYW5jaG9yLFxuICAgICAgICAgICAgICBoZWFkID0gcmFuZ2VzWzBdLmhlYWQ7XG4gICAgICAgICAgaWYgKGFyZ3MubGluZXdpc2UgJiZcbiAgICAgICAgICAgICAgaGVhZC5saW5lICE9IGNtLmZpcnN0TGluZSgpICYmXG4gICAgICAgICAgICAgIGFuY2hvci5saW5lID09IGNtLmxhc3RMaW5lKCkgJiZcbiAgICAgICAgICAgICAgYW5jaG9yLmxpbmUgPT0gaGVhZC5saW5lIC0gMSkge1xuICAgICAgICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciBkZCBvbiBsYXN0IGxpbmUgKGFuZCBmaXJzdCBsaW5lKS5cbiAgICAgICAgICAgIGlmIChhbmNob3IubGluZSA9PSBjbS5maXJzdExpbmUoKSkge1xuICAgICAgICAgICAgICBhbmNob3IuY2ggPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYW5jaG9yID0gbmV3IFBvcyhhbmNob3IubGluZSAtIDEsIGxpbmVMZW5ndGgoY20sIGFuY2hvci5saW5lIC0gMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0ZXh0ID0gY20uZ2V0UmFuZ2UoYW5jaG9yLCBoZWFkKTtcbiAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UoJycsIGFuY2hvciwgaGVhZCk7XG4gICAgICAgICAgZmluYWxIZWFkID0gYW5jaG9yO1xuICAgICAgICAgIGlmIChhcmdzLmxpbmV3aXNlKSB7XG4gICAgICAgICAgICBmaW5hbEhlYWQgPSBtb3Rpb25zLm1vdmVUb0ZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbSwgYW5jaG9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGV4dCA9IGNtLmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgIHZhciByZXBsYWNlbWVudCA9IGZpbGxBcnJheSgnJywgcmFuZ2VzLmxlbmd0aCk7XG4gICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbnMocmVwbGFjZW1lbnQpO1xuICAgICAgICAgIGZpbmFsSGVhZCA9IGN1cnNvck1pbihyYW5nZXNbMF0uaGVhZCwgcmFuZ2VzWzBdLmFuY2hvcik7XG4gICAgICAgIH1cbiAgICAgICAgdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLnB1c2hUZXh0KFxuICAgICAgICAgICAgYXJncy5yZWdpc3Rlck5hbWUsICdkZWxldGUnLCB0ZXh0LFxuICAgICAgICAgICAgYXJncy5saW5ld2lzZSwgdmltLnZpc3VhbEJsb2NrKTtcbiAgICAgICAgcmV0dXJuIGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIGZpbmFsSGVhZCk7XG4gICAgICB9LFxuICAgICAgaW5kZW50OiBmdW5jdGlvbihjbSwgYXJncywgcmFuZ2VzKSB7XG4gICAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICAgIGlmIChjbS5pbmRlbnRNb3JlKSB7XG4gICAgICAgICAgdmFyIHJlcGVhdCA9ICh2aW0udmlzdWFsTW9kZSkgPyBhcmdzLnJlcGVhdCA6IDE7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXBlYXQ7IGorKykge1xuICAgICAgICAgICAgaWYgKGFyZ3MuaW5kZW50UmlnaHQpIGNtLmluZGVudE1vcmUoKTtcbiAgICAgICAgICAgIGVsc2UgY20uaW5kZW50TGVzcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgc3RhcnRMaW5lID0gcmFuZ2VzWzBdLmFuY2hvci5saW5lO1xuICAgICAgICAgIHZhciBlbmRMaW5lID0gdmltLnZpc3VhbEJsb2NrID9cbiAgICAgICAgICAgIHJhbmdlc1tyYW5nZXMubGVuZ3RoIC0gMV0uYW5jaG9yLmxpbmUgOlxuICAgICAgICAgICAgcmFuZ2VzWzBdLmhlYWQubGluZTtcbiAgICAgICAgICAvLyBJbiB2aXN1YWwgbW9kZSwgbj4gc2hpZnRzIHRoZSBzZWxlY3Rpb24gcmlnaHQgbiB0aW1lcywgaW5zdGVhZCBvZlxuICAgICAgICAgIC8vIHNoaWZ0aW5nIG4gbGluZXMgcmlnaHQgb25jZS5cbiAgICAgICAgICB2YXIgcmVwZWF0ID0gKHZpbS52aXN1YWxNb2RlKSA/IGFyZ3MucmVwZWF0IDogMTtcbiAgICAgICAgICBpZiAoYXJncy5saW5ld2lzZSkge1xuICAgICAgICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIGRlbGV0ZSBhIG5ld2xpbmUgaXMgdG8gZGVsZXRlIHVudGlsIHRoZSBzdGFydCBvZlxuICAgICAgICAgICAgLy8gdGhlIG5leHQgbGluZSwgc28gaW4gbGluZXdpc2UgbW9kZSBldmFsSW5wdXQgd2lsbCBpbmNsdWRlIHRoZSBuZXh0XG4gICAgICAgICAgICAvLyBsaW5lLiBXZSBkb24ndCB3YW50IHRoaXMgaW4gaW5kZW50LCBzbyB3ZSBnbyBiYWNrIGEgbGluZS5cbiAgICAgICAgICAgIGVuZExpbmUtLTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0TGluZTsgaSA8PSBlbmRMaW5lOyBpKyspIHtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVwZWF0OyBqKyspIHtcbiAgICAgICAgICAgICAgY20uaW5kZW50TGluZShpLCBhcmdzLmluZGVudFJpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1vdGlvbnMubW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLCByYW5nZXNbMF0uYW5jaG9yKTtcbiAgICAgIH0sXG4gICAgICBpbmRlbnRBdXRvOiBmdW5jdGlvbihjbSwgX2FyZ3MsIHJhbmdlcykge1xuICAgICAgICBpZiAocmFuZ2VzLmxlbmd0aCA+IDEpIHsgLy8gYWNlX3BhdGNoXG4gICAgICAgICAgY20uc2V0U2VsZWN0aW9uKHJhbmdlc1swXS5hbmNob3IsIHJhbmdlc1tyYW5nZXMubGVuZ3RoIC0gMV0uaGVhZCk7XG4gICAgICAgIH1cbiAgICAgICAgY20uZXhlY0NvbW1hbmQoXCJpbmRlbnRBdXRvXCIpO1xuICAgICAgICByZXR1cm4gbW90aW9ucy5tb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20sIHJhbmdlc1swXS5hbmNob3IpO1xuICAgICAgfSxcbiAgICAgIGNoYW5nZUNhc2U6IGZ1bmN0aW9uKGNtLCBhcmdzLCByYW5nZXMsIG9sZEFuY2hvciwgbmV3SGVhZCkge1xuICAgICAgICB2YXIgc2VsZWN0aW9ucyA9IGNtLmdldFNlbGVjdGlvbnMoKTtcbiAgICAgICAgdmFyIHN3YXBwZWQgPSBbXTtcbiAgICAgICAgdmFyIHRvTG93ZXIgPSBhcmdzLnRvTG93ZXI7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2VsZWN0aW9ucy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHZhciB0b1N3YXAgPSBzZWxlY3Rpb25zW2pdO1xuICAgICAgICAgIHZhciB0ZXh0ID0gJyc7XG4gICAgICAgICAgaWYgKHRvTG93ZXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRleHQgPSB0b1N3YXAudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRvTG93ZXIgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0ZXh0ID0gdG9Td2FwLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9Td2FwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSB0b1N3YXAuY2hhckF0KGkpO1xuICAgICAgICAgICAgICB0ZXh0ICs9IGlzVXBwZXJDYXNlKGNoYXJhY3RlcikgPyBjaGFyYWN0ZXIudG9Mb3dlckNhc2UoKSA6XG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc3dhcHBlZC5wdXNoKHRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGNtLnJlcGxhY2VTZWxlY3Rpb25zKHN3YXBwZWQpO1xuICAgICAgICBpZiAoYXJncy5zaG91bGRNb3ZlQ3Vyc29yKXtcbiAgICAgICAgICByZXR1cm4gbmV3SGVhZDtcbiAgICAgICAgfSBlbHNlIGlmICghY20uc3RhdGUudmltLnZpc3VhbE1vZGUgJiYgYXJncy5saW5ld2lzZSAmJiByYW5nZXNbMF0uYW5jaG9yLmxpbmUgKyAxID09IHJhbmdlc1swXS5oZWFkLmxpbmUpIHtcbiAgICAgICAgICByZXR1cm4gbW90aW9ucy5tb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20sIG9sZEFuY2hvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoYXJncy5saW5ld2lzZSl7XG4gICAgICAgICAgcmV0dXJuIG9sZEFuY2hvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gY3Vyc29yTWluKHJhbmdlc1swXS5hbmNob3IsIHJhbmdlc1swXS5oZWFkKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHlhbms6IGZ1bmN0aW9uKGNtLCBhcmdzLCByYW5nZXMsIG9sZEFuY2hvcikge1xuICAgICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgICB2YXIgdGV4dCA9IGNtLmdldFNlbGVjdGlvbigpO1xuICAgICAgICB2YXIgZW5kUG9zID0gdmltLnZpc3VhbE1vZGVcbiAgICAgICAgICA/IGN1cnNvck1pbih2aW0uc2VsLmFuY2hvciwgdmltLnNlbC5oZWFkLCByYW5nZXNbMF0uaGVhZCwgcmFuZ2VzWzBdLmFuY2hvcilcbiAgICAgICAgICA6IG9sZEFuY2hvcjtcbiAgICAgICAgdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLnB1c2hUZXh0KFxuICAgICAgICAgICAgYXJncy5yZWdpc3Rlck5hbWUsICd5YW5rJyxcbiAgICAgICAgICAgIHRleHQsIGFyZ3MubGluZXdpc2UsIHZpbS52aXN1YWxCbG9jayk7XG4gICAgICAgIHJldHVybiBlbmRQb3M7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGRlZmluZU9wZXJhdG9yKG5hbWUsIGZuKSB7XG4gICAgICBvcGVyYXRvcnNbbmFtZV0gPSBmbjtcbiAgICB9XG5cbiAgICB2YXIgYWN0aW9ucyA9IHtcbiAgICAgIGp1bXBMaXN0V2FsazogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlcGVhdCA9IGFjdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICB2YXIgZm9yd2FyZCA9IGFjdGlvbkFyZ3MuZm9yd2FyZDtcbiAgICAgICAgdmFyIGp1bXBMaXN0ID0gdmltR2xvYmFsU3RhdGUuanVtcExpc3Q7XG5cbiAgICAgICAgdmFyIG1hcmsgPSBqdW1wTGlzdC5tb3ZlKGNtLCBmb3J3YXJkID8gcmVwZWF0IDogLXJlcGVhdCk7XG4gICAgICAgIHZhciBtYXJrUG9zID0gbWFyayA/IG1hcmsuZmluZCgpIDogdW5kZWZpbmVkO1xuICAgICAgICBtYXJrUG9zID0gbWFya1BvcyA/IG1hcmtQb3MgOiBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgY20uc2V0Q3Vyc29yKG1hcmtQb3MpO1xuICAgICAgICBjbS5hY2UuY3VyT3AuY29tbWFuZC5zY3JvbGxJbnRvVmlldyA9IFwiY2VudGVyLWFuaW1hdGVcIjsgLy8gYWNlX3BhdGNoXG4gICAgICB9LFxuICAgICAgc2Nyb2xsOiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncywgdmltKSB7XG4gICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVwZWF0ID0gYWN0aW9uQXJncy5yZXBlYXQgfHwgMTtcbiAgICAgICAgdmFyIGxpbmVIZWlnaHQgPSBjbS5kZWZhdWx0VGV4dEhlaWdodCgpO1xuICAgICAgICB2YXIgdG9wID0gY20uZ2V0U2Nyb2xsSW5mbygpLnRvcDtcbiAgICAgICAgdmFyIGRlbHRhID0gbGluZUhlaWdodCAqIHJlcGVhdDtcbiAgICAgICAgdmFyIG5ld1BvcyA9IGFjdGlvbkFyZ3MuZm9yd2FyZCA/IHRvcCArIGRlbHRhIDogdG9wIC0gZGVsdGE7XG4gICAgICAgIHZhciBjdXJzb3IgPSBjb3B5Q3Vyc29yKGNtLmdldEN1cnNvcigpKTtcbiAgICAgICAgdmFyIGN1cnNvckNvb3JkcyA9IGNtLmNoYXJDb29yZHMoY3Vyc29yLCAnbG9jYWwnKTtcbiAgICAgICAgaWYgKGFjdGlvbkFyZ3MuZm9yd2FyZCkge1xuICAgICAgICAgIGlmIChuZXdQb3MgPiBjdXJzb3JDb29yZHMudG9wKSB7XG4gICAgICAgICAgICAgY3Vyc29yLmxpbmUgKz0gKG5ld1BvcyAtIGN1cnNvckNvb3Jkcy50b3ApIC8gbGluZUhlaWdodDtcbiAgICAgICAgICAgICBjdXJzb3IubGluZSA9IE1hdGguY2VpbChjdXJzb3IubGluZSk7XG4gICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGN1cnNvcik7XG4gICAgICAgICAgICAgY3Vyc29yQ29vcmRzID0gY20uY2hhckNvb3JkcyhjdXJzb3IsICdsb2NhbCcpO1xuICAgICAgICAgICAgIGNtLnNjcm9sbFRvKG51bGwsIGN1cnNvckNvb3Jkcy50b3ApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgLy8gQ3Vyc29yIHN0YXlzIHdpdGhpbiBib3VuZHMuICBKdXN0IHJlcG9zaXRpb24gdGhlIHNjcm9sbCB3aW5kb3cuXG4gICAgICAgICAgICAgY20uc2Nyb2xsVG8obnVsbCwgbmV3UG9zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG5ld0JvdHRvbSA9IG5ld1BvcyArIGNtLmdldFNjcm9sbEluZm8oKS5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgaWYgKG5ld0JvdHRvbSA8IGN1cnNvckNvb3Jkcy5ib3R0b20pIHtcbiAgICAgICAgICAgICBjdXJzb3IubGluZSAtPSAoY3Vyc29yQ29vcmRzLmJvdHRvbSAtIG5ld0JvdHRvbSkgLyBsaW5lSGVpZ2h0O1xuICAgICAgICAgICAgIGN1cnNvci5saW5lID0gTWF0aC5mbG9vcihjdXJzb3IubGluZSk7XG4gICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGN1cnNvcik7XG4gICAgICAgICAgICAgY3Vyc29yQ29vcmRzID0gY20uY2hhckNvb3JkcyhjdXJzb3IsICdsb2NhbCcpO1xuICAgICAgICAgICAgIGNtLnNjcm9sbFRvKFxuICAgICAgICAgICAgICAgICBudWxsLCBjdXJzb3JDb29yZHMuYm90dG9tIC0gY20uZ2V0U2Nyb2xsSW5mbygpLmNsaWVudEhlaWdodCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAvLyBDdXJzb3Igc3RheXMgd2l0aGluIGJvdW5kcy4gIEp1c3QgcmVwb3NpdGlvbiB0aGUgc2Nyb2xsIHdpbmRvdy5cbiAgICAgICAgICAgICBjbS5zY3JvbGxUbyhudWxsLCBuZXdQb3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNjcm9sbFRvQ3Vyc29yOiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncykge1xuICAgICAgICB2YXIgbGluZU51bSA9IGNtLmdldEN1cnNvcigpLmxpbmU7XG4gICAgICAgIHZhciBjaGFyQ29vcmRzID0gY20uY2hhckNvb3JkcyhuZXcgUG9zKGxpbmVOdW0sIDApLCAnbG9jYWwnKTtcbiAgICAgICAgdmFyIGhlaWdodCA9IGNtLmdldFNjcm9sbEluZm8oKS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHZhciB5ID0gY2hhckNvb3Jkcy50b3A7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uQXJncy5wb3NpdGlvbikge1xuICAgICAgICAgIGNhc2UgJ2NlbnRlcic6IHkgPSBjaGFyQ29vcmRzLmJvdHRvbSAtIGhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgdmFyIGxpbmVMYXN0Q2hhclBvcyA9IG5ldyBQb3MobGluZU51bSwgY20uZ2V0TGluZShsaW5lTnVtKS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIHZhciBsaW5lTGFzdENoYXJDb29yZHMgPSBjbS5jaGFyQ29vcmRzKGxpbmVMYXN0Q2hhclBvcywgJ2xvY2FsJyk7XG4gICAgICAgICAgICB2YXIgbGluZUhlaWdodCA9IGxpbmVMYXN0Q2hhckNvb3Jkcy5ib3R0b20gLSB5O1xuICAgICAgICAgICAgeSA9IHkgLSBoZWlnaHQgKyBsaW5lSGVpZ2h0XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjbS5zY3JvbGxUbyhudWxsLCB5KTtcbiAgICAgIH0sXG4gICAgICByZXBsYXlNYWNybzogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgcmVnaXN0ZXJOYW1lID0gYWN0aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlcjtcbiAgICAgICAgdmFyIHJlcGVhdCA9IGFjdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgICAgaWYgKHJlZ2lzdGVyTmFtZSA9PSAnQCcpIHtcbiAgICAgICAgICByZWdpc3Rlck5hbWUgPSBtYWNyb01vZGVTdGF0ZS5sYXRlc3RSZWdpc3RlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYWNyb01vZGVTdGF0ZS5sYXRlc3RSZWdpc3RlciA9IHJlZ2lzdGVyTmFtZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZShyZXBlYXQtLSl7XG4gICAgICAgICAgZXhlY3V0ZU1hY3JvUmVnaXN0ZXIoY20sIHZpbSwgbWFjcm9Nb2RlU3RhdGUsIHJlZ2lzdGVyTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBlbnRlck1hY3JvUmVjb3JkTW9kZTogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICAgIHZhciByZWdpc3Rlck5hbWUgPSBhY3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyO1xuICAgICAgICBpZiAodmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmlzVmFsaWRSZWdpc3RlcihyZWdpc3Rlck5hbWUpKSB7XG4gICAgICAgICAgbWFjcm9Nb2RlU3RhdGUuZW50ZXJNYWNyb1JlY29yZE1vZGUoY20sIHJlZ2lzdGVyTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b2dnbGVPdmVyd3JpdGU6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgIGlmICghY20uc3RhdGUub3ZlcndyaXRlKSB7XG4gICAgICAgICAgY20udG9nZ2xlT3ZlcndyaXRlKHRydWUpO1xuICAgICAgICAgIGNtLnNldE9wdGlvbigna2V5TWFwJywgJ3ZpbS1yZXBsYWNlJyk7XG4gICAgICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sIFwidmltLW1vZGUtY2hhbmdlXCIsIHttb2RlOiBcInJlcGxhY2VcIn0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNtLnRvZ2dsZU92ZXJ3cml0ZShmYWxzZSk7XG4gICAgICAgICAgY20uc2V0T3B0aW9uKCdrZXlNYXAnLCAndmltLWluc2VydCcpO1xuICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJpbnNlcnRcIn0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZW50ZXJJbnNlcnRNb2RlOiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncywgdmltKSB7XG4gICAgICAgIGlmIChjbS5nZXRPcHRpb24oJ3JlYWRPbmx5JykpIHsgcmV0dXJuOyB9XG4gICAgICAgIHZpbS5pbnNlcnRNb2RlID0gdHJ1ZTtcbiAgICAgICAgdmltLmluc2VydE1vZGVSZXBlYXQgPSBhY3Rpb25BcmdzICYmIGFjdGlvbkFyZ3MucmVwZWF0IHx8IDE7XG4gICAgICAgIHZhciBpbnNlcnRBdCA9IChhY3Rpb25BcmdzKSA/IGFjdGlvbkFyZ3MuaW5zZXJ0QXQgOiBudWxsO1xuICAgICAgICB2YXIgc2VsID0gdmltLnNlbDtcbiAgICAgICAgdmFyIGhlYWQgPSBhY3Rpb25BcmdzLmhlYWQgfHwgY20uZ2V0Q3Vyc29yKCdoZWFkJyk7XG4gICAgICAgIHZhciBoZWlnaHQgPSBjbS5saXN0U2VsZWN0aW9ucygpLmxlbmd0aDtcbiAgICAgICAgaWYgKGluc2VydEF0ID09ICdlb2wnKSB7XG4gICAgICAgICAgaGVhZCA9IG5ldyBQb3MoaGVhZC5saW5lLCBsaW5lTGVuZ3RoKGNtLCBoZWFkLmxpbmUpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnNlcnRBdCA9PSAnYm9sJykge1xuICAgICAgICAgIGhlYWQgPSBuZXcgUG9zKGhlYWQubGluZSwgMCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5zZXJ0QXQgPT0gJ2NoYXJBZnRlcicpIHtcbiAgICAgICAgICB2YXIgbmV3UG9zaXRpb24gPSB1cGRhdGVTZWxlY3Rpb25Gb3JTdXJyb2dhdGVDaGFyYWN0ZXJzKGNtLCBoZWFkLCBvZmZzZXRDdXJzb3IoaGVhZCwgMCwgMSkpO1xuICAgICAgICAgIGhlYWQgPSBuZXdQb3NpdGlvbi5lbmQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5zZXJ0QXQgPT0gJ2ZpcnN0Tm9uQmxhbmsnKSB7XG4gICAgICAgICAgdmFyIG5ld1Bvc2l0aW9uID0gdXBkYXRlU2VsZWN0aW9uRm9yU3Vycm9nYXRlQ2hhcmFjdGVycyhjbSwgaGVhZCwgbW90aW9ucy5tb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20sIGhlYWQpKTtcbiAgICAgICAgICBoZWFkID0gbmV3UG9zaXRpb24uZW5kO1xuICAgICAgICB9IGVsc2UgaWYgKGluc2VydEF0ID09ICdzdGFydE9mU2VsZWN0ZWRBcmVhJykge1xuICAgICAgICAgIGlmICghdmltLnZpc3VhbE1vZGUpXG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICBpZiAoIXZpbS52aXN1YWxCbG9jaykge1xuICAgICAgICAgICAgaWYgKHNlbC5oZWFkLmxpbmUgPCBzZWwuYW5jaG9yLmxpbmUpIHtcbiAgICAgICAgICAgICAgaGVhZCA9IHNlbC5oZWFkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaGVhZCA9IG5ldyBQb3Moc2VsLmFuY2hvci5saW5lLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGVhZCA9IG5ldyBQb3MoXG4gICAgICAgICAgICAgICAgTWF0aC5taW4oc2VsLmhlYWQubGluZSwgc2VsLmFuY2hvci5saW5lKSxcbiAgICAgICAgICAgICAgICBNYXRoLm1pbihzZWwuaGVhZC5jaCwgc2VsLmFuY2hvci5jaCkpO1xuICAgICAgICAgICAgaGVpZ2h0ID0gTWF0aC5hYnMoc2VsLmhlYWQubGluZSAtIHNlbC5hbmNob3IubGluZSkgKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpbnNlcnRBdCA9PSAnZW5kT2ZTZWxlY3RlZEFyZWEnKSB7XG4gICAgICAgICAgICBpZiAoIXZpbS52aXN1YWxNb2RlKVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgaWYgKCF2aW0udmlzdWFsQmxvY2spIHtcbiAgICAgICAgICAgIGlmIChzZWwuaGVhZC5saW5lID49IHNlbC5hbmNob3IubGluZSkge1xuICAgICAgICAgICAgICBoZWFkID0gb2Zmc2V0Q3Vyc29yKHNlbC5oZWFkLCAwLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGhlYWQgPSBuZXcgUG9zKHNlbC5hbmNob3IubGluZSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhlYWQgPSBuZXcgUG9zKFxuICAgICAgICAgICAgICAgIE1hdGgubWluKHNlbC5oZWFkLmxpbmUsIHNlbC5hbmNob3IubGluZSksXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgoc2VsLmhlYWQuY2gsIHNlbC5hbmNob3IuY2gpICsgMSk7XG4gICAgICAgICAgICBoZWlnaHQgPSBNYXRoLmFicyhzZWwuaGVhZC5saW5lIC0gc2VsLmFuY2hvci5saW5lKSArIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGluc2VydEF0ID09ICdpbnBsYWNlJykge1xuICAgICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGluc2VydEF0ID09ICdsYXN0RWRpdCcpIHtcbiAgICAgICAgICBoZWFkID0gZ2V0TGFzdEVkaXRQb3MoY20pIHx8IGhlYWQ7XG4gICAgICAgIH1cbiAgICAgICAgY20uc2V0T3B0aW9uKCdkaXNhYmxlSW5wdXQnLCBmYWxzZSk7XG4gICAgICAgIGlmIChhY3Rpb25BcmdzICYmIGFjdGlvbkFyZ3MucmVwbGFjZSkge1xuICAgICAgICAgIC8vIEhhbmRsZSBSZXBsYWNlLW1vZGUgYXMgYSBzcGVjaWFsIGNhc2Ugb2YgaW5zZXJ0IG1vZGUuXG4gICAgICAgICAgY20udG9nZ2xlT3ZlcndyaXRlKHRydWUpO1xuICAgICAgICAgIGNtLnNldE9wdGlvbigna2V5TWFwJywgJ3ZpbS1yZXBsYWNlJyk7XG4gICAgICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sIFwidmltLW1vZGUtY2hhbmdlXCIsIHttb2RlOiBcInJlcGxhY2VcIn0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNtLnRvZ2dsZU92ZXJ3cml0ZShmYWxzZSk7XG4gICAgICAgICAgY20uc2V0T3B0aW9uKCdrZXlNYXAnLCAndmltLWluc2VydCcpO1xuICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJpbnNlcnRcIn0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgLy8gT25seSByZWNvcmQgaWYgbm90IHJlcGxheWluZy5cbiAgICAgICAgICBjbS5vbignY2hhbmdlJywgb25DaGFuZ2UpO1xuICAgICAgICAgIENvZGVNaXJyb3Iub24oY20uZ2V0SW5wdXRGaWVsZCgpLCAna2V5ZG93bicsIG9uS2V5RXZlbnRUYXJnZXRLZXlEb3duKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICBleGl0VmlzdWFsTW9kZShjbSk7XG4gICAgICAgIH1cbiAgICAgICAgc2VsZWN0Rm9ySW5zZXJ0KGNtLCBoZWFkLCBoZWlnaHQpO1xuICAgICAgfSxcbiAgICAgIHRvZ2dsZVZpc3VhbE1vZGU6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIHJlcGVhdCA9IGFjdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICB2YXIgYW5jaG9yID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgIHZhciBoZWFkO1xuICAgICAgICAvLyBUT0RPOiBUaGUgcmVwZWF0IHNob3VsZCBhY3R1YWxseSBzZWxlY3QgbnVtYmVyIG9mIGNoYXJhY3RlcnMvbGluZXNcbiAgICAgICAgLy8gICAgIGVxdWFsIHRvIHRoZSByZXBlYXQgdGltZXMgdGhlIHNpemUgb2YgdGhlIHByZXZpb3VzIHZpc3VhbFxuICAgICAgICAvLyAgICAgb3BlcmF0aW9uLlxuICAgICAgICBpZiAoIXZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgLy8gRW50ZXJpbmcgdmlzdWFsIG1vZGVcbiAgICAgICAgICB2aW0udmlzdWFsTW9kZSA9IHRydWU7XG4gICAgICAgICAgdmltLnZpc3VhbExpbmUgPSAhIWFjdGlvbkFyZ3MubGluZXdpc2U7XG4gICAgICAgICAgdmltLnZpc3VhbEJsb2NrID0gISFhY3Rpb25BcmdzLmJsb2Nrd2lzZTtcbiAgICAgICAgICBoZWFkID0gY2xpcEN1cnNvclRvQ29udGVudChcbiAgICAgICAgICAgICAgY20sIG5ldyBQb3MoYW5jaG9yLmxpbmUsIGFuY2hvci5jaCArIHJlcGVhdCAtIDEpKTtcbiAgICAgICAgICB2YXIgbmV3UG9zaXRpb24gPSB1cGRhdGVTZWxlY3Rpb25Gb3JTdXJyb2dhdGVDaGFyYWN0ZXJzKGNtLCBhbmNob3IsIGhlYWQpXG4gICAgICAgICAgdmltLnNlbCA9IHtcbiAgICAgICAgICAgIGFuY2hvcjogbmV3UG9zaXRpb24uc3RhcnQsXG4gICAgICAgICAgICBoZWFkOiBuZXdQb3NpdGlvbi5lbmRcbiAgICAgICAgICB9O1xuICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJ2aXN1YWxcIiwgc3ViTW9kZTogdmltLnZpc3VhbExpbmUgPyBcImxpbmV3aXNlXCIgOiB2aW0udmlzdWFsQmxvY2sgPyBcImJsb2Nrd2lzZVwiIDogXCJcIn0pO1xuICAgICAgICAgIHVwZGF0ZUNtU2VsZWN0aW9uKGNtKTtcbiAgICAgICAgICB1cGRhdGVNYXJrKGNtLCB2aW0sICc8JywgY3Vyc29yTWluKGFuY2hvciwgaGVhZCkpO1xuICAgICAgICAgIHVwZGF0ZU1hcmsoY20sIHZpbSwgJz4nLCBjdXJzb3JNYXgoYW5jaG9yLCBoZWFkKSk7XG4gICAgICAgIH0gZWxzZSBpZiAodmltLnZpc3VhbExpbmUgXiBhY3Rpb25BcmdzLmxpbmV3aXNlIHx8XG4gICAgICAgICAgICB2aW0udmlzdWFsQmxvY2sgXiBhY3Rpb25BcmdzLmJsb2Nrd2lzZSkge1xuICAgICAgICAgIC8vIFRvZ2dsaW5nIGJldHdlZW4gbW9kZXNcbiAgICAgICAgICB2aW0udmlzdWFsTGluZSA9ICEhYWN0aW9uQXJncy5saW5ld2lzZTtcbiAgICAgICAgICB2aW0udmlzdWFsQmxvY2sgPSAhIWFjdGlvbkFyZ3MuYmxvY2t3aXNlO1xuICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJ2aXN1YWxcIiwgc3ViTW9kZTogdmltLnZpc3VhbExpbmUgPyBcImxpbmV3aXNlXCIgOiB2aW0udmlzdWFsQmxvY2sgPyBcImJsb2Nrd2lzZVwiIDogXCJcIn0pO1xuICAgICAgICAgIHVwZGF0ZUNtU2VsZWN0aW9uKGNtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleGl0VmlzdWFsTW9kZShjbSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZXNlbGVjdExhc3RTZWxlY3Rpb246IGZ1bmN0aW9uKGNtLCBfYWN0aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciBsYXN0U2VsZWN0aW9uID0gdmltLmxhc3RTZWxlY3Rpb247XG4gICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgIHVwZGF0ZUxhc3RTZWxlY3Rpb24oY20sIHZpbSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGxhc3RTZWxlY3Rpb24pIHtcbiAgICAgICAgICB2YXIgYW5jaG9yID0gbGFzdFNlbGVjdGlvbi5hbmNob3JNYXJrLmZpbmQoKTtcbiAgICAgICAgICB2YXIgaGVhZCA9IGxhc3RTZWxlY3Rpb24uaGVhZE1hcmsuZmluZCgpO1xuICAgICAgICAgIGlmICghYW5jaG9yIHx8ICFoZWFkKSB7XG4gICAgICAgICAgICAvLyBJZiB0aGUgbWFya3MgaGF2ZSBiZWVuIGRlc3Ryb3llZCBkdWUgdG8gZWRpdHMsIGRvIG5vdGhpbmcuXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZpbS5zZWwgPSB7XG4gICAgICAgICAgICBhbmNob3I6IGFuY2hvcixcbiAgICAgICAgICAgIGhlYWQ6IGhlYWRcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZpbS52aXN1YWxNb2RlID0gdHJ1ZTtcbiAgICAgICAgICB2aW0udmlzdWFsTGluZSA9IGxhc3RTZWxlY3Rpb24udmlzdWFsTGluZTtcbiAgICAgICAgICB2aW0udmlzdWFsQmxvY2sgPSBsYXN0U2VsZWN0aW9uLnZpc3VhbEJsb2NrO1xuICAgICAgICAgIHVwZGF0ZUNtU2VsZWN0aW9uKGNtKTtcbiAgICAgICAgICB1cGRhdGVNYXJrKGNtLCB2aW0sICc8JywgY3Vyc29yTWluKGFuY2hvciwgaGVhZCkpO1xuICAgICAgICAgIHVwZGF0ZU1hcmsoY20sIHZpbSwgJz4nLCBjdXJzb3JNYXgoYW5jaG9yLCBoZWFkKSk7XG4gICAgICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sICd2aW0tbW9kZS1jaGFuZ2UnLCB7XG4gICAgICAgICAgICBtb2RlOiAndmlzdWFsJyxcbiAgICAgICAgICAgIHN1Yk1vZGU6IHZpbS52aXN1YWxMaW5lID8gJ2xpbmV3aXNlJyA6XG4gICAgICAgICAgICAgICAgICAgICB2aW0udmlzdWFsQmxvY2sgPyAnYmxvY2t3aXNlJyA6ICcnfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBqb2luTGluZXM6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIGN1clN0YXJ0LCBjdXJFbmQ7XG4gICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgIGN1clN0YXJ0ID0gY20uZ2V0Q3Vyc29yKCdhbmNob3InKTtcbiAgICAgICAgICBjdXJFbmQgPSBjbS5nZXRDdXJzb3IoJ2hlYWQnKTtcbiAgICAgICAgICBpZiAoY3Vyc29ySXNCZWZvcmUoY3VyRW5kLCBjdXJTdGFydCkpIHtcbiAgICAgICAgICAgIHZhciB0bXAgPSBjdXJFbmQ7XG4gICAgICAgICAgICBjdXJFbmQgPSBjdXJTdGFydDtcbiAgICAgICAgICAgIGN1clN0YXJ0ID0gdG1wO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJFbmQuY2ggPSBsaW5lTGVuZ3RoKGNtLCBjdXJFbmQubGluZSkgLSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFJlcGVhdCBpcyB0aGUgbnVtYmVyIG9mIGxpbmVzIHRvIGpvaW4uIE1pbmltdW0gMiBsaW5lcy5cbiAgICAgICAgICB2YXIgcmVwZWF0ID0gTWF0aC5tYXgoYWN0aW9uQXJncy5yZXBlYXQsIDIpO1xuICAgICAgICAgIGN1clN0YXJ0ID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgY3VyRW5kID0gY2xpcEN1cnNvclRvQ29udGVudChjbSwgbmV3IFBvcyhjdXJTdGFydC5saW5lICsgcmVwZWF0IC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSW5maW5pdHkpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZmluYWxDaCA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSBjdXJTdGFydC5saW5lOyBpIDwgY3VyRW5kLmxpbmU7IGkrKykge1xuICAgICAgICAgIGZpbmFsQ2ggPSBsaW5lTGVuZ3RoKGNtLCBjdXJTdGFydC5saW5lKTtcbiAgICAgICAgICB2YXIgdGV4dCA9ICcnO1xuICAgICAgICAgIHZhciBuZXh0U3RhcnRDaCA9IDA7XG4gICAgICAgICAgaWYgKCFhY3Rpb25BcmdzLmtlZXBTcGFjZXMpIHtcbiAgICAgICAgICAgIHZhciBuZXh0TGluZSA9IGNtLmdldExpbmUoY3VyU3RhcnQubGluZSArIDEpO1xuICAgICAgICAgICAgbmV4dFN0YXJ0Q2ggPSBuZXh0TGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKG5leHRTdGFydENoID09IC0xKSB7XG4gICAgICAgICAgICAgIG5leHRTdGFydENoID0gbmV4dExpbmUubGVuZ3RoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGV4dCA9IFwiIFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UodGV4dCwgXG4gICAgICAgICAgICBuZXcgUG9zKGN1clN0YXJ0LmxpbmUsIGZpbmFsQ2gpLFxuICAgICAgICAgICAgbmV3IFBvcyhjdXJTdGFydC5saW5lICsgMSwgbmV4dFN0YXJ0Q2gpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY3VyRmluYWxQb3MgPSBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBuZXcgUG9zKGN1clN0YXJ0LmxpbmUsIGZpbmFsQ2gpKTtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgZXhpdFZpc3VhbE1vZGUoY20sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBjbS5zZXRDdXJzb3IoY3VyRmluYWxQb3MpO1xuICAgICAgfSxcbiAgICAgIG5ld0xpbmVBbmRFbnRlckluc2VydE1vZGU6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmltLmluc2VydE1vZGUgPSB0cnVlO1xuICAgICAgICB2YXIgaW5zZXJ0QXQgPSBjb3B5Q3Vyc29yKGNtLmdldEN1cnNvcigpKTtcbiAgICAgICAgaWYgKGluc2VydEF0LmxpbmUgPT09IGNtLmZpcnN0TGluZSgpICYmICFhY3Rpb25BcmdzLmFmdGVyKSB7XG4gICAgICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciBpbnNlcnRpbmcgbmV3bGluZSBiZWZvcmUgc3RhcnQgb2YgZG9jdW1lbnQuXG4gICAgICAgICAgY20ucmVwbGFjZVJhbmdlKCdcXG4nLCBuZXcgUG9zKGNtLmZpcnN0TGluZSgpLCAwKSk7XG4gICAgICAgICAgY20uc2V0Q3Vyc29yKGNtLmZpcnN0TGluZSgpLCAwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnNlcnRBdC5saW5lID0gKGFjdGlvbkFyZ3MuYWZ0ZXIpID8gaW5zZXJ0QXQubGluZSA6XG4gICAgICAgICAgICAgIGluc2VydEF0LmxpbmUgLSAxO1xuICAgICAgICAgIGluc2VydEF0LmNoID0gbGluZUxlbmd0aChjbSwgaW5zZXJ0QXQubGluZSk7XG4gICAgICAgICAgY20uc2V0Q3Vyc29yKGluc2VydEF0KTtcbiAgICAgICAgICB2YXIgbmV3bGluZUZuID0gQ29kZU1pcnJvci5jb21tYW5kcy5uZXdsaW5lQW5kSW5kZW50Q29udGludWVDb21tZW50IHx8XG4gICAgICAgICAgICAgIENvZGVNaXJyb3IuY29tbWFuZHMubmV3bGluZUFuZEluZGVudDtcbiAgICAgICAgICBuZXdsaW5lRm4oY20pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW50ZXJJbnNlcnRNb2RlKGNtLCB7IHJlcGVhdDogYWN0aW9uQXJncy5yZXBlYXQgfSwgdmltKTtcbiAgICAgIH0sXG4gICAgICBwYXN0ZTogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgcmVnaXN0ZXIgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIuZ2V0UmVnaXN0ZXIoXG4gICAgICAgICAgYWN0aW9uQXJncy5yZWdpc3Rlck5hbWUpO1xuICAgICAgICB2YXIgZmFsbGJhY2sgPSAoKSA9PiB7XG4gICAgICAgICAgdmFyIHRleHQgPSByZWdpc3Rlci50b1N0cmluZygpO1xuICAgICAgICAgIHRoaXMuY29udGludWVQYXN0ZShjbSwgYWN0aW9uQXJncywgdmltLCB0ZXh0LCByZWdpc3Rlcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvbkFyZ3MucmVnaXN0ZXJOYW1lID09PSAnKycgJiZcbiAgICAgICAgICAgICAgdHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgICAgICAgdHlwZW9mIG5hdmlnYXRvci5jbGlwYm9hcmQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgIHR5cGVvZiBuYXZpZ2F0b3IuY2xpcGJvYXJkLnJlYWRUZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC5yZWFkVGV4dCgpLnRoZW4oKHZhbHVlKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbnRpbnVlUGFzdGUoY20sIGFjdGlvbkFyZ3MsIHZpbSwgdmFsdWUsIHJlZ2lzdGVyKTtcbiAgICAgICAgICB9LCAoKSA9PiB7IGZhbGxiYWNrKCkgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmYWxsYmFjaygpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBjb250aW51ZVBhc3RlOiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncywgdmltLCB0ZXh0LCByZWdpc3Rlcikge1xuICAgICAgICB2YXIgY3VyID0gY29weUN1cnNvcihjbS5nZXRDdXJzb3IoKSk7XG4gICAgICAgIGlmICghdGV4dCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aW9uQXJncy5tYXRjaEluZGVudCkge1xuICAgICAgICAgIHZhciB0YWJTaXplID0gY20uZ2V0T3B0aW9uKFwidGFiU2l6ZVwiKTtcbiAgICAgICAgICAvLyBsZW5ndGggdGhhdCBjb25zaWRlcnMgdGFicyBhbmQgdGFiU2l6ZVxuICAgICAgICAgIHZhciB3aGl0ZXNwYWNlTGVuZ3RoID0gZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICB2YXIgdGFicyA9IChzdHIuc3BsaXQoXCJcXHRcIikubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB2YXIgc3BhY2VzID0gKHN0ci5zcGxpdChcIiBcIikubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICByZXR1cm4gdGFicyAqIHRhYlNpemUgKyBzcGFjZXMgKiAxO1xuICAgICAgICAgIH07XG4gICAgICAgICAgdmFyIGN1cnJlbnRMaW5lID0gY20uZ2V0TGluZShjbS5nZXRDdXJzb3IoKS5saW5lKTtcbiAgICAgICAgICB2YXIgaW5kZW50ID0gd2hpdGVzcGFjZUxlbmd0aChjdXJyZW50TGluZS5tYXRjaCgvXlxccyovKVswXSk7XG4gICAgICAgICAgLy8gY2hvbXAgbGFzdCBuZXdsaW5lIGIvYyBkb24ndCB3YW50IGl0IHRvIG1hdGNoIC9eXFxzKi9nbVxuICAgICAgICAgIHZhciBjaG9tcGVkVGV4dCA9IHRleHQucmVwbGFjZSgvXFxuJC8sICcnKTtcbiAgICAgICAgICB2YXIgd2FzQ2hvbXBlZCA9IHRleHQgIT09IGNob21wZWRUZXh0O1xuICAgICAgICAgIHZhciBmaXJzdEluZGVudCA9IHdoaXRlc3BhY2VMZW5ndGgodGV4dC5tYXRjaCgvXlxccyovKVswXSk7XG4gICAgICAgICAgdmFyIHRleHQgPSBjaG9tcGVkVGV4dC5yZXBsYWNlKC9eXFxzKi9nbSwgZnVuY3Rpb24od3NwYWNlKSB7XG4gICAgICAgICAgICB2YXIgbmV3SW5kZW50ID0gaW5kZW50ICsgKHdoaXRlc3BhY2VMZW5ndGgod3NwYWNlKSAtIGZpcnN0SW5kZW50KTtcbiAgICAgICAgICAgIGlmIChuZXdJbmRlbnQgPCAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY20uZ2V0T3B0aW9uKFwiaW5kZW50V2l0aFRhYnNcIikpIHtcbiAgICAgICAgICAgICAgdmFyIHF1b3RpZW50ID0gTWF0aC5mbG9vcihuZXdJbmRlbnQgLyB0YWJTaXplKTtcbiAgICAgICAgICAgICAgcmV0dXJuIEFycmF5KHF1b3RpZW50ICsgMSkuam9pbignXFx0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEFycmF5KG5ld0luZGVudCArIDEpLmpvaW4oJyAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0ZXh0ICs9IHdhc0Nob21wZWQgPyBcIlxcblwiIDogXCJcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYWN0aW9uQXJncy5yZXBlYXQgPiAxKSB7XG4gICAgICAgICAgdmFyIHRleHQgPSBBcnJheShhY3Rpb25BcmdzLnJlcGVhdCArIDEpLmpvaW4odGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpbmV3aXNlID0gcmVnaXN0ZXIubGluZXdpc2U7XG4gICAgICAgIHZhciBibG9ja3dpc2UgPSByZWdpc3Rlci5ibG9ja3dpc2U7XG4gICAgICAgIGlmIChibG9ja3dpc2UpIHtcbiAgICAgICAgICB0ZXh0ID0gdGV4dC5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgaWYgKGxpbmV3aXNlKSB7XG4gICAgICAgICAgICB0ZXh0LnBvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRleHRbaV0gPSAodGV4dFtpXSA9PSAnJykgPyAnICcgOiB0ZXh0W2ldO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXIuY2ggKz0gYWN0aW9uQXJncy5hZnRlciA/IDEgOiAwO1xuICAgICAgICAgIGN1ci5jaCA9IE1hdGgubWluKGxpbmVMZW5ndGgoY20sIGN1ci5saW5lKSwgY3VyLmNoKTtcbiAgICAgICAgfSBlbHNlIGlmIChsaW5ld2lzZSkge1xuICAgICAgICAgIGlmKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICB0ZXh0ID0gdmltLnZpc3VhbExpbmUgPyB0ZXh0LnNsaWNlKDAsIC0xKSA6ICdcXG4nICsgdGV4dC5zbGljZSgwLCB0ZXh0Lmxlbmd0aCAtIDEpICsgJ1xcbic7XG4gICAgICAgICAgfSBlbHNlIGlmIChhY3Rpb25BcmdzLmFmdGVyKSB7XG4gICAgICAgICAgICAvLyBNb3ZlIHRoZSBuZXdsaW5lIGF0IHRoZSBlbmQgdG8gdGhlIHN0YXJ0IGluc3RlYWQsIGFuZCBwYXN0ZSBqdXN0XG4gICAgICAgICAgICAvLyBiZWZvcmUgdGhlIG5ld2xpbmUgY2hhcmFjdGVyIG9mIHRoZSBsaW5lIHdlIGFyZSBvbiByaWdodCBub3cuXG4gICAgICAgICAgICB0ZXh0ID0gJ1xcbicgKyB0ZXh0LnNsaWNlKDAsIHRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICBjdXIuY2ggPSBsaW5lTGVuZ3RoKGNtLCBjdXIubGluZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1ci5jaCA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGN1ci5jaCArPSBhY3Rpb25BcmdzLmFmdGVyID8gMSA6IDA7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGN1clBvc0ZpbmFsO1xuICAgICAgICB2YXIgaWR4O1xuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAvLyAgc2F2ZSB0aGUgcGFzdGVkIHRleHQgZm9yIHJlc2VsZWN0aW9uIGlmIHRoZSBuZWVkIGFyaXNlc1xuICAgICAgICAgIHZpbS5sYXN0UGFzdGVkVGV4dCA9IHRleHQ7XG4gICAgICAgICAgdmFyIGxhc3RTZWxlY3Rpb25DdXJFbmQ7XG4gICAgICAgICAgdmFyIHNlbGVjdGVkQXJlYSA9IGdldFNlbGVjdGVkQXJlYVJhbmdlKGNtLCB2aW0pO1xuICAgICAgICAgIHZhciBzZWxlY3Rpb25TdGFydCA9IHNlbGVjdGVkQXJlYVswXTtcbiAgICAgICAgICB2YXIgc2VsZWN0aW9uRW5kID0gc2VsZWN0ZWRBcmVhWzFdO1xuICAgICAgICAgIHZhciBzZWxlY3RlZFRleHQgPSBjbS5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICB2YXIgc2VsZWN0aW9ucyA9IGNtLmxpc3RTZWxlY3Rpb25zKCk7XG4gICAgICAgICAgdmFyIGVtcHR5U3RyaW5ncyA9IG5ldyBBcnJheShzZWxlY3Rpb25zLmxlbmd0aCkuam9pbignMScpLnNwbGl0KCcxJyk7XG4gICAgICAgICAgLy8gc2F2ZSB0aGUgY3VyRW5kIG1hcmtlciBiZWZvcmUgaXQgZ2V0IGNsZWFyZWQgZHVlIHRvIGNtLnJlcGxhY2VSYW5nZS5cbiAgICAgICAgICBpZiAodmltLmxhc3RTZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIGxhc3RTZWxlY3Rpb25DdXJFbmQgPSB2aW0ubGFzdFNlbGVjdGlvbi5oZWFkTWFyay5maW5kKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHB1c2ggdGhlIHByZXZpb3VzbHkgc2VsZWN0ZWQgdGV4dCB0byB1bm5hbWVkIHJlZ2lzdGVyXG4gICAgICAgICAgdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLnVubmFtZWRSZWdpc3Rlci5zZXRUZXh0KHNlbGVjdGVkVGV4dCk7XG4gICAgICAgICAgaWYgKGJsb2Nrd2lzZSkge1xuICAgICAgICAgICAgLy8gZmlyc3QgZGVsZXRlIHRoZSBzZWxlY3RlZCB0ZXh0XG4gICAgICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9ucyhlbXB0eVN0cmluZ3MpO1xuICAgICAgICAgICAgLy8gU2V0IG5ldyBzZWxlY3Rpb25zIGFzIHBlciB0aGUgYmxvY2sgbGVuZ3RoIG9mIHRoZSB5YW5rZWQgdGV4dFxuICAgICAgICAgICAgc2VsZWN0aW9uRW5kID0gbmV3IFBvcyhzZWxlY3Rpb25TdGFydC5saW5lICsgdGV4dC5sZW5ndGgtMSwgc2VsZWN0aW9uU3RhcnQuY2gpO1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKHNlbGVjdGlvblN0YXJ0KTtcbiAgICAgICAgICAgIHNlbGVjdEJsb2NrKGNtLCBzZWxlY3Rpb25FbmQpO1xuICAgICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbnModGV4dCk7XG4gICAgICAgICAgICBjdXJQb3NGaW5hbCA9IHNlbGVjdGlvblN0YXJ0O1xuICAgICAgICAgIH0gZWxzZSBpZiAodmltLnZpc3VhbEJsb2NrKSB7XG4gICAgICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9ucyhlbXB0eVN0cmluZ3MpO1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKHNlbGVjdGlvblN0YXJ0KTtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZSh0ZXh0LCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uU3RhcnQpO1xuICAgICAgICAgICAgY3VyUG9zRmluYWwgPSBzZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY20ucmVwbGFjZVJhbmdlKHRleHQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpO1xuICAgICAgICAgICAgY3VyUG9zRmluYWwgPSBjbS5wb3NGcm9tSW5kZXgoY20uaW5kZXhGcm9tUG9zKHNlbGVjdGlvblN0YXJ0KSArIHRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHJlc3RvcmUgdGhlIHRoZSBjdXJFbmQgbWFya2VyXG4gICAgICAgICAgaWYobGFzdFNlbGVjdGlvbkN1ckVuZCkge1xuICAgICAgICAgICAgdmltLmxhc3RTZWxlY3Rpb24uaGVhZE1hcmsgPSBjbS5zZXRCb29rbWFyayhsYXN0U2VsZWN0aW9uQ3VyRW5kKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGxpbmV3aXNlKSB7XG4gICAgICAgICAgICBjdXJQb3NGaW5hbC5jaD0wO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoYmxvY2t3aXNlKSB7XG4gICAgICAgICAgICBjbS5zZXRDdXJzb3IoY3VyKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgbGluZSA9IGN1ci5saW5lK2k7XG4gICAgICAgICAgICAgIGlmIChsaW5lID4gY20ubGFzdExpbmUoKSkge1xuICAgICAgICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZSgnXFxuJywgIG5ldyBQb3MobGluZSwgMCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhciBsYXN0Q2ggPSBsaW5lTGVuZ3RoKGNtLCBsaW5lKTtcbiAgICAgICAgICAgICAgaWYgKGxhc3RDaCA8IGN1ci5jaCkge1xuICAgICAgICAgICAgICAgIGV4dGVuZExpbmVUb0NvbHVtbihjbSwgbGluZSwgY3VyLmNoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGN1cik7XG4gICAgICAgICAgICBzZWxlY3RCbG9jayhjbSwgbmV3IFBvcyhjdXIubGluZSArIHRleHQubGVuZ3RoLTEsIGN1ci5jaCkpO1xuICAgICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbnModGV4dCk7XG4gICAgICAgICAgICBjdXJQb3NGaW5hbCA9IGN1cjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY20ucmVwbGFjZVJhbmdlKHRleHQsIGN1cik7XG4gICAgICAgICAgICAvLyBOb3cgZmluZSB0dW5lIHRoZSBjdXJzb3IgdG8gd2hlcmUgd2Ugd2FudCBpdC5cbiAgICAgICAgICAgIGlmIChsaW5ld2lzZSAmJiBhY3Rpb25BcmdzLmFmdGVyKSB7XG4gICAgICAgICAgICAgIGN1clBvc0ZpbmFsID0gbmV3IFBvcyhcbiAgICAgICAgICAgICAgICBjdXIubGluZSArIDEsXG4gICAgICAgICAgICAgICAgZmluZEZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbS5nZXRMaW5lKGN1ci5saW5lICsgMSkpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGluZXdpc2UgJiYgIWFjdGlvbkFyZ3MuYWZ0ZXIpIHtcbiAgICAgICAgICAgICAgY3VyUG9zRmluYWwgPSBuZXcgUG9zKFxuICAgICAgICAgICAgICAgIGN1ci5saW5lLFxuICAgICAgICAgICAgICAgIGZpbmRGaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20uZ2V0TGluZShjdXIubGluZSkpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWxpbmV3aXNlICYmIGFjdGlvbkFyZ3MuYWZ0ZXIpIHtcbiAgICAgICAgICAgICAgaWR4ID0gY20uaW5kZXhGcm9tUG9zKGN1cik7XG4gICAgICAgICAgICAgIGN1clBvc0ZpbmFsID0gY20ucG9zRnJvbUluZGV4KGlkeCArIHRleHQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZHggPSBjbS5pbmRleEZyb21Qb3MoY3VyKTtcbiAgICAgICAgICAgICAgY3VyUG9zRmluYWwgPSBjbS5wb3NGcm9tSW5kZXgoaWR4ICsgdGV4dC5sZW5ndGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICBleGl0VmlzdWFsTW9kZShjbSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGNtLnNldEN1cnNvcihjdXJQb3NGaW5hbCk7XG4gICAgICB9LFxuICAgICAgdW5kbzogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MpIHtcbiAgICAgICAgY20ub3BlcmF0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJlcGVhdEZuKGNtLCBDb2RlTWlycm9yLmNvbW1hbmRzLnVuZG8sIGFjdGlvbkFyZ3MucmVwZWF0KSgpO1xuICAgICAgICAgIGNtLnNldEN1cnNvcihjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBjbS5nZXRDdXJzb3IoJ3N0YXJ0JykpKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgcmVkbzogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MpIHtcbiAgICAgICAgcmVwZWF0Rm4oY20sIENvZGVNaXJyb3IuY29tbWFuZHMucmVkbywgYWN0aW9uQXJncy5yZXBlYXQpKCk7XG4gICAgICB9LFxuICAgICAgc2V0UmVnaXN0ZXI6IGZ1bmN0aW9uKF9jbSwgYWN0aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZpbS5pbnB1dFN0YXRlLnJlZ2lzdGVyTmFtZSA9IGFjdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXI7XG4gICAgICB9LFxuICAgICAgc2V0TWFyazogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgbWFya05hbWUgPSBhY3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyO1xuICAgICAgICB1cGRhdGVNYXJrKGNtLCB2aW0sIG1hcmtOYW1lLCBjbS5nZXRDdXJzb3IoKSk7XG4gICAgICB9LFxuICAgICAgcmVwbGFjZTogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgcmVwbGFjZVdpdGggPSBhY3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyO1xuICAgICAgICB2YXIgY3VyU3RhcnQgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgdmFyIHJlcGxhY2VUbztcbiAgICAgICAgdmFyIGN1ckVuZDtcbiAgICAgICAgdmFyIHNlbGVjdGlvbnMgPSBjbS5saXN0U2VsZWN0aW9ucygpO1xuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICBjdXJTdGFydCA9IGNtLmdldEN1cnNvcignc3RhcnQnKTtcbiAgICAgICAgICBjdXJFbmQgPSBjbS5nZXRDdXJzb3IoJ2VuZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShjdXJTdGFydC5saW5lKTtcbiAgICAgICAgICByZXBsYWNlVG8gPSBjdXJTdGFydC5jaCArIGFjdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICAgIGlmIChyZXBsYWNlVG8gPiBsaW5lLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVwbGFjZVRvPWxpbmUubGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJFbmQgPSBuZXcgUG9zKGN1clN0YXJ0LmxpbmUsIHJlcGxhY2VUbyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmV3UG9zaXRpb25zID0gdXBkYXRlU2VsZWN0aW9uRm9yU3Vycm9nYXRlQ2hhcmFjdGVycyhjbSwgY3VyU3RhcnQsIGN1ckVuZCk7XG4gICAgICAgIGN1clN0YXJ0ID0gbmV3UG9zaXRpb25zLnN0YXJ0O1xuICAgICAgICBjdXJFbmQgPSBuZXdQb3NpdGlvbnMuZW5kO1xuICAgICAgICBpZiAocmVwbGFjZVdpdGg9PSdcXG4nKSB7XG4gICAgICAgICAgaWYgKCF2aW0udmlzdWFsTW9kZSkgY20ucmVwbGFjZVJhbmdlKCcnLCBjdXJTdGFydCwgY3VyRW5kKTtcbiAgICAgICAgICAvLyBzcGVjaWFsIGNhc2UsIHdoZXJlIHZpbSBoZWxwIHNheXMgdG8gcmVwbGFjZSBieSBqdXN0IG9uZSBsaW5lLWJyZWFrXG4gICAgICAgICAgKENvZGVNaXJyb3IuY29tbWFuZHMubmV3bGluZUFuZEluZGVudENvbnRpbnVlQ29tbWVudCB8fCBDb2RlTWlycm9yLmNvbW1hbmRzLm5ld2xpbmVBbmRJbmRlbnQpKGNtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcmVwbGFjZVdpdGhTdHIgPSBjbS5nZXRSYW5nZShjdXJTdGFydCwgY3VyRW5kKTtcbiAgICAgICAgICAvLyByZXBsYWNlIGFsbCBzdXJyb2dhdGUgY2hhcmFjdGVycyB3aXRoIHNlbGVjdGVkIGNoYXJhY3RlclxuICAgICAgICAgIHJlcGxhY2VXaXRoU3RyID0gcmVwbGFjZVdpdGhTdHIucmVwbGFjZSgvW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS9nLCByZXBsYWNlV2l0aCk7XG4gICAgICAgICAgLy9yZXBsYWNlIGFsbCBjaGFyYWN0ZXJzIGluIHJhbmdlIGJ5IHNlbGVjdGVkLCBidXQga2VlcCBsaW5lYnJlYWtzXG4gICAgICAgICAgcmVwbGFjZVdpdGhTdHIgPSByZXBsYWNlV2l0aFN0ci5yZXBsYWNlKC9bXlxcbl0vZywgcmVwbGFjZVdpdGgpO1xuICAgICAgICAgIGlmICh2aW0udmlzdWFsQmxvY2spIHtcbiAgICAgICAgICAgIC8vIFRhYnMgYXJlIHNwbGl0IGluIHZpc3VhIGJsb2NrIGJlZm9yZSByZXBsYWNpbmdcbiAgICAgICAgICAgIHZhciBzcGFjZXMgPSBuZXcgQXJyYXkoY20uZ2V0T3B0aW9uKFwidGFiU2l6ZVwiKSsxKS5qb2luKCcgJyk7XG4gICAgICAgICAgICByZXBsYWNlV2l0aFN0ciA9IGNtLmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgcmVwbGFjZVdpdGhTdHIgPSByZXBsYWNlV2l0aFN0ci5yZXBsYWNlKC9bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdL2csIHJlcGxhY2VXaXRoKTtcbiAgICAgICAgICAgIHJlcGxhY2VXaXRoU3RyID0gcmVwbGFjZVdpdGhTdHIucmVwbGFjZSgvXFx0L2csIHNwYWNlcykucmVwbGFjZSgvW15cXG5dL2csIHJlcGxhY2VXaXRoKS5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9ucyhyZXBsYWNlV2l0aFN0cik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZShyZXBsYWNlV2l0aFN0ciwgY3VyU3RhcnQsIGN1ckVuZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgY3VyU3RhcnQgPSBjdXJzb3JJc0JlZm9yZShzZWxlY3Rpb25zWzBdLmFuY2hvciwgc2VsZWN0aW9uc1swXS5oZWFkKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uc1swXS5hbmNob3IgOiBzZWxlY3Rpb25zWzBdLmhlYWQ7XG4gICAgICAgICAgICBjbS5zZXRDdXJzb3IoY3VyU3RhcnQpO1xuICAgICAgICAgICAgZXhpdFZpc3VhbE1vZGUoY20sIGZhbHNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKG9mZnNldEN1cnNvcihjdXJFbmQsIDAsIC0xKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaW5jcmVtZW50TnVtYmVyVG9rZW46IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciBjdXIgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgdmFyIGxpbmVTdHIgPSBjbS5nZXRMaW5lKGN1ci5saW5lKTtcbiAgICAgICAgdmFyIHJlID0gLygtPykoPzooMHgpKFtcXGRhLWZdKyl8KDBifDB8KShcXGQrKSkvZ2k7XG4gICAgICAgIHZhciBtYXRjaDtcbiAgICAgICAgdmFyIHN0YXJ0O1xuICAgICAgICB2YXIgZW5kO1xuICAgICAgICB2YXIgbnVtYmVyU3RyO1xuICAgICAgICB3aGlsZSAoKG1hdGNoID0gcmUuZXhlYyhsaW5lU3RyKSkgIT09IG51bGwpIHtcbiAgICAgICAgICBzdGFydCA9IG1hdGNoLmluZGV4O1xuICAgICAgICAgIGVuZCA9IHN0YXJ0ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgIGlmIChjdXIuY2ggPCBlbmQpYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhY3Rpb25BcmdzLmJhY2t0cmFjayAmJiAoZW5kIDw9IGN1ci5jaCkpcmV0dXJuO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICB2YXIgYmFzZVN0ciA9IG1hdGNoWzJdIHx8IG1hdGNoWzRdXG4gICAgICAgICAgdmFyIGRpZ2l0cyA9IG1hdGNoWzNdIHx8IG1hdGNoWzVdXG4gICAgICAgICAgdmFyIGluY3JlbWVudCA9IGFjdGlvbkFyZ3MuaW5jcmVhc2UgPyAxIDogLTE7XG4gICAgICAgICAgdmFyIGJhc2UgPSB7JzBiJzogMiwgJzAnOiA4LCAnJzogMTAsICcweCc6IDE2fVtiYXNlU3RyLnRvTG93ZXJDYXNlKCldO1xuICAgICAgICAgIHZhciBudW1iZXIgPSBwYXJzZUludChtYXRjaFsxXSArIGRpZ2l0cywgYmFzZSkgKyAoaW5jcmVtZW50ICogYWN0aW9uQXJncy5yZXBlYXQpO1xuICAgICAgICAgIG51bWJlclN0ciA9IG51bWJlci50b1N0cmluZyhiYXNlKTtcbiAgICAgICAgICB2YXIgemVyb1BhZGRpbmcgPSBiYXNlU3RyID8gbmV3IEFycmF5KGRpZ2l0cy5sZW5ndGggLSBudW1iZXJTdHIubGVuZ3RoICsgMSArIG1hdGNoWzFdLmxlbmd0aCkuam9pbignMCcpIDogJydcbiAgICAgICAgICBpZiAobnVtYmVyU3RyLmNoYXJBdCgwKSA9PT0gJy0nKSB7XG4gICAgICAgICAgICBudW1iZXJTdHIgPSAnLScgKyBiYXNlU3RyICsgemVyb1BhZGRpbmcgKyBudW1iZXJTdHIuc3Vic3RyKDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBudW1iZXJTdHIgPSBiYXNlU3RyICsgemVyb1BhZGRpbmcgKyBudW1iZXJTdHI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBmcm9tID0gbmV3IFBvcyhjdXIubGluZSwgc3RhcnQpO1xuICAgICAgICAgIHZhciB0byA9IG5ldyBQb3MoY3VyLmxpbmUsIGVuZCk7XG4gICAgICAgICAgY20ucmVwbGFjZVJhbmdlKG51bWJlclN0ciwgZnJvbSwgdG8pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjbS5zZXRDdXJzb3IobmV3IFBvcyhjdXIubGluZSwgc3RhcnQgKyBudW1iZXJTdHIubGVuZ3RoIC0gMSkpO1xuICAgICAgfSxcbiAgICAgIHJlcGVhdExhc3RFZGl0OiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciBsYXN0RWRpdElucHV0U3RhdGUgPSB2aW0ubGFzdEVkaXRJbnB1dFN0YXRlO1xuICAgICAgICBpZiAoIWxhc3RFZGl0SW5wdXRTdGF0ZSkgeyByZXR1cm47IH1cbiAgICAgICAgdmFyIHJlcGVhdCA9IGFjdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICBpZiAocmVwZWF0ICYmIGFjdGlvbkFyZ3MucmVwZWF0SXNFeHBsaWNpdCkge1xuICAgICAgICAgIHZpbS5sYXN0RWRpdElucHV0U3RhdGUucmVwZWF0T3ZlcnJpZGUgPSByZXBlYXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwZWF0ID0gdmltLmxhc3RFZGl0SW5wdXRTdGF0ZS5yZXBlYXRPdmVycmlkZSB8fCByZXBlYXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmVwZWF0TGFzdEVkaXQoY20sIHZpbSwgcmVwZWF0LCBmYWxzZSAvKiogcmVwZWF0Rm9ySW5zZXJ0ICovKTtcbiAgICAgIH0sXG4gICAgICBpbmRlbnQ6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzKSB7XG4gICAgICAgIGNtLmluZGVudExpbmUoY20uZ2V0Q3Vyc29yKCkubGluZSwgYWN0aW9uQXJncy5pbmRlbnRSaWdodCk7XG4gICAgICB9LFxuICAgICAgZXhpdEluc2VydE1vZGU6IGV4aXRJbnNlcnRNb2RlXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGRlZmluZUFjdGlvbihuYW1lLCBmbikge1xuICAgICAgYWN0aW9uc1tuYW1lXSA9IGZuO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogQmVsb3cgYXJlIG1pc2NlbGxhbmVvdXMgdXRpbGl0eSBmdW5jdGlvbnMgdXNlZCBieSB2aW0uanNcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIENsaXBzIGN1cnNvciB0byBlbnN1cmUgdGhhdCBsaW5lIGlzIHdpdGhpbiB0aGUgYnVmZmVyJ3MgcmFuZ2VcbiAgICAgKiBhbmQgaXMgbm90IGluc2lkZSBzdXJyb2dhdGUgcGFpclxuICAgICAqIElmIGluY2x1ZGVMaW5lQnJlYWsgaXMgdHJ1ZSwgdGhlbiBhbGxvdyBjdXIuY2ggPT0gbGluZUxlbmd0aC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBjdXIsIG9sZEN1cikge1xuICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgIHZhciBpbmNsdWRlTGluZUJyZWFrID0gdmltLmluc2VydE1vZGUgfHwgdmltLnZpc3VhbE1vZGU7XG4gICAgICB2YXIgbGluZSA9IE1hdGgubWluKE1hdGgubWF4KGNtLmZpcnN0TGluZSgpLCBjdXIubGluZSksIGNtLmxhc3RMaW5lKCkgKTtcbiAgICAgIHZhciB0ZXh0ID0gY20uZ2V0TGluZShsaW5lKTtcbiAgICAgIHZhciBtYXhDaCA9IHRleHQubGVuZ3RoIC0gMSArICEhaW5jbHVkZUxpbmVCcmVhaztcbiAgICAgIHZhciBjaCA9IE1hdGgubWluKE1hdGgubWF4KDAsIGN1ci5jaCksIG1heENoKTtcbiAgICAgIC8vIHByZXZlbnQgY3Vyc29yIGZyb20gZW50ZXJpbmcgc3Vycm9nYXRlIHBhaXJcbiAgICAgIHZhciBjaGFyQ29kZSA9IHRleHQuY2hhckNvZGVBdChjaCk7XG4gICAgICBpZiAoMHhEQzAwIDwgY2hhckNvZGUgJiYgY2hhckNvZGUgPDB4REZGRikge1xuICAgICAgICB2YXIgZGlyZWN0aW9uID0gMTtcbiAgICAgICAgaWYgKG9sZEN1ciAmJiBvbGRDdXIubGluZSA9PSBsaW5lKSB7XG4gICAgICAgICAgaWYgKG9sZEN1ci5jaCA+IGNoKSB7XG4gICAgICAgICAgICBkaXJlY3Rpb24gPSAtMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2ggKz1kaXJlY3Rpb247XG4gICAgICAgIGlmIChjaCA+IG1heENoKSBjaCAtPTI7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFBvcyhsaW5lLCBjaCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvcHlBcmdzKGFyZ3MpIHtcbiAgICAgIHZhciByZXQgPSB7fTtcbiAgICAgIGZvciAodmFyIHByb3AgaW4gYXJncykge1xuICAgICAgICBpZiAoYXJncy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICAgIHJldFtwcm9wXSA9IGFyZ3NbcHJvcF07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9mZnNldEN1cnNvcihjdXIsIG9mZnNldExpbmUsIG9mZnNldENoKSB7XG4gICAgICBpZiAodHlwZW9mIG9mZnNldExpbmUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIG9mZnNldENoID0gb2Zmc2V0TGluZS5jaDtcbiAgICAgICAgb2Zmc2V0TGluZSA9IG9mZnNldExpbmUubGluZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgUG9zKGN1ci5saW5lICsgb2Zmc2V0TGluZSwgY3VyLmNoICsgb2Zmc2V0Q2gpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb21tYW5kTWF0Y2hlcyhrZXlzLCBrZXlNYXAsIGNvbnRleHQsIGlucHV0U3RhdGUpIHtcbiAgICAgIC8vIFBhcnRpYWwgbWF0Y2hlcyBhcmUgbm90IGFwcGxpZWQuIFRoZXkgaW5mb3JtIHRoZSBrZXkgaGFuZGxlclxuICAgICAgLy8gdGhhdCB0aGUgY3VycmVudCBrZXkgc2VxdWVuY2UgaXMgYSBzdWJzZXF1ZW5jZSBvZiBhIHZhbGlkIGtleVxuICAgICAgLy8gc2VxdWVuY2UsIHNvIHRoYXQgdGhlIGtleSBidWZmZXIgaXMgbm90IGNsZWFyZWQuXG4gICAgICB2YXIgbWF0Y2gsIHBhcnRpYWwgPSBbXSwgZnVsbCA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlNYXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNvbW1hbmQgPSBrZXlNYXBbaV07XG4gICAgICAgIGlmIChjb250ZXh0ID09ICdpbnNlcnQnICYmIGNvbW1hbmQuY29udGV4dCAhPSAnaW5zZXJ0JyB8fFxuICAgICAgICAgICAgY29tbWFuZC5jb250ZXh0ICYmIGNvbW1hbmQuY29udGV4dCAhPSBjb250ZXh0IHx8XG4gICAgICAgICAgICBpbnB1dFN0YXRlLm9wZXJhdG9yICYmIGNvbW1hbmQudHlwZSA9PSAnYWN0aW9uJyB8fFxuICAgICAgICAgICAgIShtYXRjaCA9IGNvbW1hbmRNYXRjaChrZXlzLCBjb21tYW5kLmtleXMpKSkgeyBjb250aW51ZTsgfVxuICAgICAgICBpZiAobWF0Y2ggPT0gJ3BhcnRpYWwnKSB7IHBhcnRpYWwucHVzaChjb21tYW5kKTsgfVxuICAgICAgICBpZiAobWF0Y2ggPT0gJ2Z1bGwnKSB7IGZ1bGwucHVzaChjb21tYW5kKTsgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGFydGlhbDogcGFydGlhbC5sZW5ndGggJiYgcGFydGlhbCxcbiAgICAgICAgZnVsbDogZnVsbC5sZW5ndGggJiYgZnVsbFxuICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29tbWFuZE1hdGNoKHByZXNzZWQsIG1hcHBlZCkge1xuICAgICAgaWYgKG1hcHBlZC5zbGljZSgtMTEpID09ICc8Y2hhcmFjdGVyPicpIHtcbiAgICAgICAgLy8gTGFzdCBjaGFyYWN0ZXIgbWF0Y2hlcyBhbnl0aGluZy5cbiAgICAgICAgdmFyIHByZWZpeExlbiA9IG1hcHBlZC5sZW5ndGggLSAxMTtcbiAgICAgICAgdmFyIHByZXNzZWRQcmVmaXggPSBwcmVzc2VkLnNsaWNlKDAsIHByZWZpeExlbik7XG4gICAgICAgIHZhciBtYXBwZWRQcmVmaXggPSBtYXBwZWQuc2xpY2UoMCwgcHJlZml4TGVuKTtcbiAgICAgICAgcmV0dXJuIHByZXNzZWRQcmVmaXggPT0gbWFwcGVkUHJlZml4ICYmIHByZXNzZWQubGVuZ3RoID4gcHJlZml4TGVuID8gJ2Z1bGwnIDpcbiAgICAgICAgICAgICAgIG1hcHBlZFByZWZpeC5pbmRleE9mKHByZXNzZWRQcmVmaXgpID09IDAgPyAncGFydGlhbCcgOiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwcmVzc2VkID09IG1hcHBlZCA/ICdmdWxsJyA6XG4gICAgICAgICAgICAgICBtYXBwZWQuaW5kZXhPZihwcmVzc2VkKSA9PSAwID8gJ3BhcnRpYWwnIDogZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxhc3RDaGFyKGtleXMpIHtcbiAgICAgIHZhciBtYXRjaCA9IC9eLiooPFtePl0rPikkLy5leGVjKGtleXMpO1xuICAgICAgdmFyIHNlbGVjdGVkQ2hhcmFjdGVyID0gbWF0Y2ggPyBtYXRjaFsxXSA6IGtleXMuc2xpY2UoLTEpO1xuICAgICAgaWYgKHNlbGVjdGVkQ2hhcmFjdGVyLmxlbmd0aCA+IDEpe1xuICAgICAgICBzd2l0Y2goc2VsZWN0ZWRDaGFyYWN0ZXIpe1xuICAgICAgICAgIGNhc2UgJzxDUj4nOlxuICAgICAgICAgICAgc2VsZWN0ZWRDaGFyYWN0ZXI9J1xcbic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICc8U3BhY2U+JzpcbiAgICAgICAgICAgIHNlbGVjdGVkQ2hhcmFjdGVyPScgJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzZWxlY3RlZENoYXJhY3Rlcj0nJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc2VsZWN0ZWRDaGFyYWN0ZXI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlcGVhdEZuKGNtLCBmbiwgcmVwZWF0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwZWF0OyBpKyspIHtcbiAgICAgICAgICBmbihjbSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvcHlDdXJzb3IoY3VyKSB7XG4gICAgICByZXR1cm4gbmV3IFBvcyhjdXIubGluZSwgY3VyLmNoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3Vyc29yRXF1YWwoY3VyMSwgY3VyMikge1xuICAgICAgcmV0dXJuIGN1cjEuY2ggPT0gY3VyMi5jaCAmJiBjdXIxLmxpbmUgPT0gY3VyMi5saW5lO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjdXJzb3JJc0JlZm9yZShjdXIxLCBjdXIyKSB7XG4gICAgICBpZiAoY3VyMS5saW5lIDwgY3VyMi5saW5lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKGN1cjEubGluZSA9PSBjdXIyLmxpbmUgJiYgY3VyMS5jaCA8IGN1cjIuY2gpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGN1cnNvck1pbihjdXIxLCBjdXIyKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgY3VyMiA9IGN1cnNvck1pbi5hcHBseSh1bmRlZmluZWQsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGN1cnNvcklzQmVmb3JlKGN1cjEsIGN1cjIpID8gY3VyMSA6IGN1cjI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGN1cnNvck1heChjdXIxLCBjdXIyKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgY3VyMiA9IGN1cnNvck1heC5hcHBseSh1bmRlZmluZWQsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGN1cnNvcklzQmVmb3JlKGN1cjEsIGN1cjIpID8gY3VyMiA6IGN1cjE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGN1cnNvcklzQmV0d2VlbihjdXIxLCBjdXIyLCBjdXIzKSB7XG4gICAgICAvLyByZXR1cm5zIHRydWUgaWYgY3VyMiBpcyBiZXR3ZWVuIGN1cjEgYW5kIGN1cjMuXG4gICAgICB2YXIgY3VyMWJlZm9yZTIgPSBjdXJzb3JJc0JlZm9yZShjdXIxLCBjdXIyKTtcbiAgICAgIHZhciBjdXIyYmVmb3JlMyA9IGN1cnNvcklzQmVmb3JlKGN1cjIsIGN1cjMpO1xuICAgICAgcmV0dXJuIGN1cjFiZWZvcmUyICYmIGN1cjJiZWZvcmUzO1xuICAgIH1cbiAgICBmdW5jdGlvbiBsaW5lTGVuZ3RoKGNtLCBsaW5lTnVtKSB7XG4gICAgICByZXR1cm4gY20uZ2V0TGluZShsaW5lTnVtKS5sZW5ndGg7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyaW0ocykge1xuICAgICAgaWYgKHMudHJpbSkge1xuICAgICAgICByZXR1cm4gcy50cmltKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVzY2FwZVJlZ2V4KHMpIHtcbiAgICAgIHJldHVybiBzLnJlcGxhY2UoLyhbLj8qKyRcXFtcXF1cXC9cXFxcKCl7fXxcXC1dKS9nLCAnXFxcXCQxJyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGV4dGVuZExpbmVUb0NvbHVtbihjbSwgbGluZU51bSwgY29sdW1uKSB7XG4gICAgICB2YXIgZW5kQ2ggPSBsaW5lTGVuZ3RoKGNtLCBsaW5lTnVtKTtcbiAgICAgIHZhciBzcGFjZXMgPSBuZXcgQXJyYXkoY29sdW1uLWVuZENoKzEpLmpvaW4oJyAnKTtcbiAgICAgIGNtLnNldEN1cnNvcihuZXcgUG9zKGxpbmVOdW0sIGVuZENoKSk7XG4gICAgICBjbS5yZXBsYWNlUmFuZ2Uoc3BhY2VzLCBjbS5nZXRDdXJzb3IoKSk7XG4gICAgfVxuICAgIC8vIFRoaXMgZnVuY3Rpb25zIHNlbGVjdHMgYSByZWN0YW5ndWxhciBibG9ja1xuICAgIC8vIG9mIHRleHQgd2l0aCBzZWxlY3Rpb25FbmQgYXMgYW55IG9mIGl0cyBjb3JuZXJcbiAgICAvLyBIZWlnaHQgb2YgYmxvY2s6XG4gICAgLy8gRGlmZmVyZW5jZSBpbiBzZWxlY3Rpb25FbmQubGluZSBhbmQgZmlyc3QvbGFzdCBzZWxlY3Rpb24ubGluZVxuICAgIC8vIFdpZHRoIG9mIHRoZSBibG9jazpcbiAgICAvLyBEaXN0YW5jZSBiZXR3ZWVuIHNlbGVjdGlvbkVuZC5jaCBhbmQgYW55KGZpcnN0IGNvbnNpZGVyZWQgaGVyZSkgc2VsZWN0aW9uLmNoXG4gICAgZnVuY3Rpb24gc2VsZWN0QmxvY2soY20sIHNlbGVjdGlvbkVuZCkge1xuICAgICAgdmFyIHNlbGVjdGlvbnMgPSBbXSwgcmFuZ2VzID0gY20ubGlzdFNlbGVjdGlvbnMoKTtcbiAgICAgIHZhciBoZWFkID0gY29weUN1cnNvcihjbS5jbGlwUG9zKHNlbGVjdGlvbkVuZCkpO1xuICAgICAgdmFyIGlzQ2xpcHBlZCA9ICFjdXJzb3JFcXVhbChzZWxlY3Rpb25FbmQsIGhlYWQpO1xuICAgICAgdmFyIGN1ckhlYWQgPSBjbS5nZXRDdXJzb3IoJ2hlYWQnKTtcbiAgICAgIHZhciBwcmltSW5kZXggPSBnZXRJbmRleChyYW5nZXMsIGN1ckhlYWQpO1xuICAgICAgdmFyIHdhc0NsaXBwZWQgPSBjdXJzb3JFcXVhbChyYW5nZXNbcHJpbUluZGV4XS5oZWFkLCByYW5nZXNbcHJpbUluZGV4XS5hbmNob3IpO1xuICAgICAgdmFyIG1heCA9IHJhbmdlcy5sZW5ndGggLSAxO1xuICAgICAgdmFyIGluZGV4ID0gbWF4IC0gcHJpbUluZGV4ID4gcHJpbUluZGV4ID8gbWF4IDogMDtcbiAgICAgIHZhciBiYXNlID0gcmFuZ2VzW2luZGV4XS5hbmNob3I7XG5cbiAgICAgIHZhciBmaXJzdExpbmUgPSBNYXRoLm1pbihiYXNlLmxpbmUsIGhlYWQubGluZSk7XG4gICAgICB2YXIgbGFzdExpbmUgPSBNYXRoLm1heChiYXNlLmxpbmUsIGhlYWQubGluZSk7XG4gICAgICB2YXIgYmFzZUNoID0gYmFzZS5jaCwgaGVhZENoID0gaGVhZC5jaDtcblxuICAgICAgdmFyIGRpciA9IHJhbmdlc1tpbmRleF0uaGVhZC5jaCAtIGJhc2VDaDtcbiAgICAgIHZhciBuZXdEaXIgPSBoZWFkQ2ggLSBiYXNlQ2g7XG4gICAgICBpZiAoZGlyID4gMCAmJiBuZXdEaXIgPD0gMCkge1xuICAgICAgICBiYXNlQ2grKztcbiAgICAgICAgaWYgKCFpc0NsaXBwZWQpIHsgaGVhZENoLS07IH1cbiAgICAgIH0gZWxzZSBpZiAoZGlyIDwgMCAmJiBuZXdEaXIgPj0gMCkge1xuICAgICAgICBiYXNlQ2gtLTtcbiAgICAgICAgaWYgKCF3YXNDbGlwcGVkKSB7IGhlYWRDaCsrOyB9XG4gICAgICB9IGVsc2UgaWYgKGRpciA8IDAgJiYgbmV3RGlyID09IC0xKSB7XG4gICAgICAgIGJhc2VDaC0tO1xuICAgICAgICBoZWFkQ2grKztcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGxpbmUgPSBmaXJzdExpbmU7IGxpbmUgPD0gbGFzdExpbmU7IGxpbmUrKykge1xuICAgICAgICB2YXIgcmFuZ2UgPSB7YW5jaG9yOiBuZXcgUG9zKGxpbmUsIGJhc2VDaCksIGhlYWQ6IG5ldyBQb3MobGluZSwgaGVhZENoKX07XG4gICAgICAgIHNlbGVjdGlvbnMucHVzaChyYW5nZSk7XG4gICAgICB9XG4gICAgICBjbS5zZXRTZWxlY3Rpb25zKHNlbGVjdGlvbnMpO1xuICAgICAgc2VsZWN0aW9uRW5kLmNoID0gaGVhZENoO1xuICAgICAgYmFzZS5jaCA9IGJhc2VDaDtcbiAgICAgIHJldHVybiBiYXNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZWxlY3RGb3JJbnNlcnQoY20sIGhlYWQsIGhlaWdodCkge1xuICAgICAgdmFyIHNlbCA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZWlnaHQ7IGkrKykge1xuICAgICAgICB2YXIgbGluZUhlYWQgPSBvZmZzZXRDdXJzb3IoaGVhZCwgaSwgMCk7XG4gICAgICAgIHNlbC5wdXNoKHthbmNob3I6IGxpbmVIZWFkLCBoZWFkOiBsaW5lSGVhZH0pO1xuICAgICAgfVxuICAgICAgY20uc2V0U2VsZWN0aW9ucyhzZWwsIDApO1xuICAgIH1cbiAgICAvLyBnZXRJbmRleCByZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgY3Vyc29yIGluIHRoZSBzZWxlY3Rpb25zLlxuICAgIGZ1bmN0aW9uIGdldEluZGV4KHJhbmdlcywgY3Vyc29yLCBlbmQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhdEFuY2hvciA9IGVuZCAhPSAnaGVhZCcgJiYgY3Vyc29yRXF1YWwocmFuZ2VzW2ldLmFuY2hvciwgY3Vyc29yKTtcbiAgICAgICAgdmFyIGF0SGVhZCA9IGVuZCAhPSAnYW5jaG9yJyAmJiBjdXJzb3JFcXVhbChyYW5nZXNbaV0uaGVhZCwgY3Vyc29yKTtcbiAgICAgICAgaWYgKGF0QW5jaG9yIHx8IGF0SGVhZCkge1xuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGVkQXJlYVJhbmdlKGNtLCB2aW0pIHtcbiAgICAgIHZhciBsYXN0U2VsZWN0aW9uID0gdmltLmxhc3RTZWxlY3Rpb247XG4gICAgICB2YXIgZ2V0Q3VycmVudFNlbGVjdGVkQXJlYVJhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxlY3Rpb25zID0gY20ubGlzdFNlbGVjdGlvbnMoKTtcbiAgICAgICAgdmFyIHN0YXJ0ID0gIHNlbGVjdGlvbnNbMF07XG4gICAgICAgIHZhciBlbmQgPSBzZWxlY3Rpb25zW3NlbGVjdGlvbnMubGVuZ3RoLTFdO1xuICAgICAgICB2YXIgc2VsZWN0aW9uU3RhcnQgPSBjdXJzb3JJc0JlZm9yZShzdGFydC5hbmNob3IsIHN0YXJ0LmhlYWQpID8gc3RhcnQuYW5jaG9yIDogc3RhcnQuaGVhZDtcbiAgICAgICAgdmFyIHNlbGVjdGlvbkVuZCA9IGN1cnNvcklzQmVmb3JlKGVuZC5hbmNob3IsIGVuZC5oZWFkKSA/IGVuZC5oZWFkIDogZW5kLmFuY2hvcjtcbiAgICAgICAgcmV0dXJuIFtzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kXTtcbiAgICAgIH07XG4gICAgICB2YXIgZ2V0TGFzdFNlbGVjdGVkQXJlYVJhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxlY3Rpb25TdGFydCA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICB2YXIgc2VsZWN0aW9uRW5kID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgIHZhciBibG9jayA9IGxhc3RTZWxlY3Rpb24udmlzdWFsQmxvY2s7XG4gICAgICAgIGlmIChibG9jaykge1xuICAgICAgICAgIHZhciB3aWR0aCA9IGJsb2NrLndpZHRoO1xuICAgICAgICAgIHZhciBoZWlnaHQgPSBibG9jay5oZWlnaHQ7XG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gbmV3IFBvcyhzZWxlY3Rpb25TdGFydC5saW5lICsgaGVpZ2h0LCBzZWxlY3Rpb25TdGFydC5jaCArIHdpZHRoKTtcbiAgICAgICAgICB2YXIgc2VsZWN0aW9ucyA9IFtdO1xuICAgICAgICAgIC8vIHNlbGVjdEJsb2NrIGNyZWF0ZXMgYSAncHJvcGVyJyByZWN0YW5ndWxhciBibG9jay5cbiAgICAgICAgICAvLyBXZSBkbyBub3Qgd2FudCB0aGF0IGluIGFsbCBjYXNlcywgc28gd2UgbWFudWFsbHkgc2V0IHNlbGVjdGlvbnMuXG4gICAgICAgICAgZm9yICh2YXIgaSA9IHNlbGVjdGlvblN0YXJ0LmxpbmU7IGkgPCBzZWxlY3Rpb25FbmQubGluZTsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYW5jaG9yID0gbmV3IFBvcyhpLCBzZWxlY3Rpb25TdGFydC5jaCk7XG4gICAgICAgICAgICB2YXIgaGVhZCA9IG5ldyBQb3MoaSwgc2VsZWN0aW9uRW5kLmNoKTtcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHthbmNob3I6IGFuY2hvciwgaGVhZDogaGVhZH07XG4gICAgICAgICAgICBzZWxlY3Rpb25zLnB1c2gocmFuZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjbS5zZXRTZWxlY3Rpb25zKHNlbGVjdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBzdGFydCA9IGxhc3RTZWxlY3Rpb24uYW5jaG9yTWFyay5maW5kKCk7XG4gICAgICAgICAgdmFyIGVuZCA9IGxhc3RTZWxlY3Rpb24uaGVhZE1hcmsuZmluZCgpO1xuICAgICAgICAgIHZhciBsaW5lID0gZW5kLmxpbmUgLSBzdGFydC5saW5lO1xuICAgICAgICAgIHZhciBjaCA9IGVuZC5jaCAtIHN0YXJ0LmNoO1xuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHtsaW5lOiBzZWxlY3Rpb25FbmQubGluZSArIGxpbmUsIGNoOiBsaW5lID8gc2VsZWN0aW9uRW5kLmNoIDogY2ggKyBzZWxlY3Rpb25FbmQuY2h9O1xuICAgICAgICAgIGlmIChsYXN0U2VsZWN0aW9uLnZpc3VhbExpbmUpIHtcbiAgICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gbmV3IFBvcyhzZWxlY3Rpb25TdGFydC5saW5lLCAwKTtcbiAgICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IG5ldyBQb3Moc2VsZWN0aW9uRW5kLmxpbmUsIGxpbmVMZW5ndGgoY20sIHNlbGVjdGlvbkVuZC5saW5lKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNtLnNldFNlbGVjdGlvbihzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3NlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmRdO1xuICAgICAgfTtcbiAgICAgIGlmICghdmltLnZpc3VhbE1vZGUpIHtcbiAgICAgIC8vIEluIGNhc2Ugb2YgcmVwbGF5aW5nIHRoZSBhY3Rpb24uXG4gICAgICAgIHJldHVybiBnZXRMYXN0U2VsZWN0ZWRBcmVhUmFuZ2UoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBnZXRDdXJyZW50U2VsZWN0ZWRBcmVhUmFuZ2UoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gVXBkYXRlcyB0aGUgcHJldmlvdXMgc2VsZWN0aW9uIHdpdGggdGhlIGN1cnJlbnQgc2VsZWN0aW9uJ3MgdmFsdWVzLiBUaGlzXG4gICAgLy8gc2hvdWxkIG9ubHkgYmUgY2FsbGVkIGluIHZpc3VhbCBtb2RlLlxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxhc3RTZWxlY3Rpb24oY20sIHZpbSkge1xuICAgICAgdmFyIGFuY2hvciA9IHZpbS5zZWwuYW5jaG9yO1xuICAgICAgdmFyIGhlYWQgPSB2aW0uc2VsLmhlYWQ7XG4gICAgICAvLyBUbyBhY2NvbW1vZGF0ZSB0aGUgZWZmZWN0IG9mIGxhc3RQYXN0ZWRUZXh0IGluIHRoZSBsYXN0IHNlbGVjdGlvblxuICAgICAgaWYgKHZpbS5sYXN0UGFzdGVkVGV4dCkge1xuICAgICAgICBoZWFkID0gY20ucG9zRnJvbUluZGV4KGNtLmluZGV4RnJvbVBvcyhhbmNob3IpICsgdmltLmxhc3RQYXN0ZWRUZXh0Lmxlbmd0aCk7XG4gICAgICAgIHZpbS5sYXN0UGFzdGVkVGV4dCA9IG51bGw7XG4gICAgICB9XG4gICAgICB2aW0ubGFzdFNlbGVjdGlvbiA9IHsnYW5jaG9yTWFyayc6IGNtLnNldEJvb2ttYXJrKGFuY2hvciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnaGVhZE1hcmsnOiBjbS5zZXRCb29rbWFyayhoZWFkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICdhbmNob3InOiBjb3B5Q3Vyc29yKGFuY2hvciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnaGVhZCc6IGNvcHlDdXJzb3IoaGVhZCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndmlzdWFsTW9kZSc6IHZpbS52aXN1YWxNb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Zpc3VhbExpbmUnOiB2aW0udmlzdWFsTGluZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd2aXN1YWxCbG9jayc6IHZpbS52aXN1YWxCbG9ja307XG4gICAgfVxuICAgIGZ1bmN0aW9uIGV4cGFuZFNlbGVjdGlvbihjbSwgc3RhcnQsIGVuZCkge1xuICAgICAgdmFyIHNlbCA9IGNtLnN0YXRlLnZpbS5zZWw7XG4gICAgICB2YXIgaGVhZCA9IHNlbC5oZWFkO1xuICAgICAgdmFyIGFuY2hvciA9IHNlbC5hbmNob3I7XG4gICAgICB2YXIgdG1wO1xuICAgICAgaWYgKGN1cnNvcklzQmVmb3JlKGVuZCwgc3RhcnQpKSB7XG4gICAgICAgIHRtcCA9IGVuZDtcbiAgICAgICAgZW5kID0gc3RhcnQ7XG4gICAgICAgIHN0YXJ0ID0gdG1wO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnNvcklzQmVmb3JlKGhlYWQsIGFuY2hvcikpIHtcbiAgICAgICAgaGVhZCA9IGN1cnNvck1pbihzdGFydCwgaGVhZCk7XG4gICAgICAgIGFuY2hvciA9IGN1cnNvck1heChhbmNob3IsIGVuZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbmNob3IgPSBjdXJzb3JNaW4oc3RhcnQsIGFuY2hvcik7XG4gICAgICAgIGhlYWQgPSBjdXJzb3JNYXgoaGVhZCwgZW5kKTtcbiAgICAgICAgaGVhZCA9IG9mZnNldEN1cnNvcihoZWFkLCAwLCAtMSk7XG4gICAgICAgIGlmIChoZWFkLmNoID09IC0xICYmIGhlYWQubGluZSAhPSBjbS5maXJzdExpbmUoKSkge1xuICAgICAgICAgIGhlYWQgPSBuZXcgUG9zKGhlYWQubGluZSAtIDEsIGxpbmVMZW5ndGgoY20sIGhlYWQubGluZSAtIDEpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIFthbmNob3IsIGhlYWRdO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBDb2RlTWlycm9yIHNlbGVjdGlvbiB0byBtYXRjaCB0aGUgcHJvdmlkZWQgdmltIHNlbGVjdGlvbi5cbiAgICAgKiBJZiBubyBhcmd1bWVudHMgYXJlIGdpdmVuLCBpdCB1c2VzIHRoZSBjdXJyZW50IHZpbSBzZWxlY3Rpb24gc3RhdGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gdXBkYXRlQ21TZWxlY3Rpb24oY20sIHNlbCwgbW9kZSkge1xuICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgIHNlbCA9IHNlbCB8fCB2aW0uc2VsO1xuICAgICAgdmFyIG1vZGUgPSBtb2RlIHx8XG4gICAgICAgIHZpbS52aXN1YWxMaW5lID8gJ2xpbmUnIDogdmltLnZpc3VhbEJsb2NrID8gJ2Jsb2NrJyA6ICdjaGFyJztcbiAgICAgIHZhciBjbVNlbCA9IG1ha2VDbVNlbGVjdGlvbihjbSwgc2VsLCBtb2RlKTtcbiAgICAgIGNtLnNldFNlbGVjdGlvbnMoY21TZWwucmFuZ2VzLCBjbVNlbC5wcmltYXJ5KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gbWFrZUNtU2VsZWN0aW9uKGNtLCBzZWwsIG1vZGUsIGV4Y2x1c2l2ZSkge1xuICAgICAgdmFyIGhlYWQgPSBjb3B5Q3Vyc29yKHNlbC5oZWFkKTtcbiAgICAgIHZhciBhbmNob3IgPSBjb3B5Q3Vyc29yKHNlbC5hbmNob3IpO1xuICAgICAgaWYgKG1vZGUgPT0gJ2NoYXInKSB7XG4gICAgICAgIHZhciBoZWFkT2Zmc2V0ID0gIWV4Y2x1c2l2ZSAmJiAhY3Vyc29ySXNCZWZvcmUoc2VsLmhlYWQsIHNlbC5hbmNob3IpID8gMSA6IDA7XG4gICAgICAgIHZhciBhbmNob3JPZmZzZXQgPSBjdXJzb3JJc0JlZm9yZShzZWwuaGVhZCwgc2VsLmFuY2hvcikgPyAxIDogMDtcbiAgICAgICAgaGVhZCA9IG9mZnNldEN1cnNvcihzZWwuaGVhZCwgMCwgaGVhZE9mZnNldCk7XG4gICAgICAgIGFuY2hvciA9IG9mZnNldEN1cnNvcihzZWwuYW5jaG9yLCAwLCBhbmNob3JPZmZzZXQpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHJhbmdlczogW3thbmNob3I6IGFuY2hvciwgaGVhZDogaGVhZH1dLFxuICAgICAgICAgIHByaW1hcnk6IDBcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAobW9kZSA9PSAnbGluZScpIHtcbiAgICAgICAgaWYgKCFjdXJzb3JJc0JlZm9yZShzZWwuaGVhZCwgc2VsLmFuY2hvcikpIHtcbiAgICAgICAgICBhbmNob3IuY2ggPSAwO1xuXG4gICAgICAgICAgdmFyIGxhc3RMaW5lID0gY20ubGFzdExpbmUoKTtcbiAgICAgICAgICBpZiAoaGVhZC5saW5lID4gbGFzdExpbmUpIHtcbiAgICAgICAgICAgIGhlYWQubGluZSA9IGxhc3RMaW5lO1xuICAgICAgICAgIH1cbiAgICAgICAgICBoZWFkLmNoID0gbGluZUxlbmd0aChjbSwgaGVhZC5saW5lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBoZWFkLmNoID0gMDtcbiAgICAgICAgICBhbmNob3IuY2ggPSBsaW5lTGVuZ3RoKGNtLCBhbmNob3IubGluZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByYW5nZXM6IFt7YW5jaG9yOiBhbmNob3IsIGhlYWQ6IGhlYWR9XSxcbiAgICAgICAgICBwcmltYXJ5OiAwXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKG1vZGUgPT0gJ2Jsb2NrJykge1xuICAgICAgICB2YXIgdG9wID0gTWF0aC5taW4oYW5jaG9yLmxpbmUsIGhlYWQubGluZSksXG4gICAgICAgICAgICBmcm9tQ2ggPSBhbmNob3IuY2gsXG4gICAgICAgICAgICBib3R0b20gPSBNYXRoLm1heChhbmNob3IubGluZSwgaGVhZC5saW5lKSxcbiAgICAgICAgICAgIHRvQ2ggPSBoZWFkLmNoO1xuICAgICAgICBpZiAoZnJvbUNoIDwgdG9DaCkgeyB0b0NoICs9IDEgfVxuICAgICAgICBlbHNlIHsgZnJvbUNoICs9IDEgfTtcbiAgICAgICAgdmFyIGhlaWdodCA9IGJvdHRvbSAtIHRvcCArIDE7XG4gICAgICAgIHZhciBwcmltYXJ5ID0gaGVhZC5saW5lID09IHRvcCA/IDAgOiBoZWlnaHQgLSAxO1xuICAgICAgICB2YXIgcmFuZ2VzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGVpZ2h0OyBpKyspIHtcbiAgICAgICAgICByYW5nZXMucHVzaCh7XG4gICAgICAgICAgICBhbmNob3I6IG5ldyBQb3ModG9wICsgaSwgZnJvbUNoKSxcbiAgICAgICAgICAgIGhlYWQ6IG5ldyBQb3ModG9wICsgaSwgdG9DaClcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHJhbmdlczogcmFuZ2VzLFxuICAgICAgICAgIHByaW1hcnk6IHByaW1hcnlcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0SGVhZChjbSkge1xuICAgICAgdmFyIGN1ciA9IGNtLmdldEN1cnNvcignaGVhZCcpO1xuICAgICAgaWYgKGNtLmdldFNlbGVjdGlvbigpLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIC8vIFNtYWxsIGNvcm5lciBjYXNlIHdoZW4gb25seSAxIGNoYXJhY3RlciBpcyBzZWxlY3RlZC4gVGhlIFwicmVhbFwiXG4gICAgICAgIC8vIGhlYWQgaXMgdGhlIGxlZnQgb2YgaGVhZCBhbmQgYW5jaG9yLlxuICAgICAgICBjdXIgPSBjdXJzb3JNaW4oY3VyLCBjbS5nZXRDdXJzb3IoJ2FuY2hvcicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgbW92ZUhlYWQgaXMgc2V0IHRvIGZhbHNlLCB0aGUgQ29kZU1pcnJvciBzZWxlY3Rpb24gd2lsbCBub3QgYmVcbiAgICAgKiB0b3VjaGVkLiBUaGUgY2FsbGVyIGFzc3VtZXMgdGhlIHJlc3BvbnNpYmlsaXR5IG9mIHB1dHRpbmcgdGhlIGN1cnNvclxuICAgICogaW4gdGhlIHJpZ2h0IHBsYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGV4aXRWaXN1YWxNb2RlKGNtLCBtb3ZlSGVhZCkge1xuICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgIGlmIChtb3ZlSGVhZCAhPT0gZmFsc2UpIHtcbiAgICAgICAgY20uc2V0Q3Vyc29yKGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIHZpbS5zZWwuaGVhZCkpO1xuICAgICAgfVxuICAgICAgdXBkYXRlTGFzdFNlbGVjdGlvbihjbSwgdmltKTtcbiAgICAgIHZpbS52aXN1YWxNb2RlID0gZmFsc2U7XG4gICAgICB2aW0udmlzdWFsTGluZSA9IGZhbHNlO1xuICAgICAgdmltLnZpc3VhbEJsb2NrID0gZmFsc2U7XG4gICAgICBpZiAoIXZpbS5pbnNlcnRNb2RlKSBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwge21vZGU6IFwibm9ybWFsXCJ9KTtcbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgYW55IHRyYWlsaW5nIG5ld2xpbmVzIGZyb20gdGhlIHNlbGVjdGlvbi4gRm9yXG4gICAgLy8gZXhhbXBsZSwgd2l0aCB0aGUgY2FyZXQgYXQgdGhlIHN0YXJ0IG9mIHRoZSBsYXN0IHdvcmQgb24gdGhlIGxpbmUsXG4gICAgLy8gJ2R3JyBzaG91bGQgd29yZCwgYnV0IG5vdCB0aGUgbmV3bGluZSwgd2hpbGUgJ3cnIHNob3VsZCBhZHZhbmNlIHRoZVxuICAgIC8vIGNhcmV0IHRvIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgdGhlIG5leHQgbGluZS5cbiAgICBmdW5jdGlvbiBjbGlwVG9MaW5lKGNtLCBjdXJTdGFydCwgY3VyRW5kKSB7XG4gICAgICB2YXIgc2VsZWN0aW9uID0gY20uZ2V0UmFuZ2UoY3VyU3RhcnQsIGN1ckVuZCk7XG4gICAgICAvLyBPbmx5IGNsaXAgaWYgdGhlIHNlbGVjdGlvbiBlbmRzIHdpdGggdHJhaWxpbmcgbmV3bGluZSArIHdoaXRlc3BhY2VcbiAgICAgIGlmICgvXFxuXFxzKiQvLnRlc3Qoc2VsZWN0aW9uKSkge1xuICAgICAgICB2YXIgbGluZXMgPSBzZWxlY3Rpb24uc3BsaXQoJ1xcbicpO1xuICAgICAgICAvLyBXZSBrbm93IHRoaXMgaXMgYWxsIHdoaXRlc3BhY2UuXG4gICAgICAgIGxpbmVzLnBvcCgpO1xuXG4gICAgICAgIC8vIENhc2VzOlxuICAgICAgICAvLyAxLiBMYXN0IHdvcmQgaXMgYW4gZW1wdHkgbGluZSAtIGRvIG5vdCBjbGlwIHRoZSB0cmFpbGluZyAnXFxuJ1xuICAgICAgICAvLyAyLiBMYXN0IHdvcmQgaXMgbm90IGFuIGVtcHR5IGxpbmUgLSBjbGlwIHRoZSB0cmFpbGluZyAnXFxuJ1xuICAgICAgICB2YXIgbGluZTtcbiAgICAgICAgLy8gRmluZCB0aGUgbGluZSBjb250YWluaW5nIHRoZSBsYXN0IHdvcmQsIGFuZCBjbGlwIGFsbCB3aGl0ZXNwYWNlIHVwXG4gICAgICAgIC8vIHRvIGl0LlxuICAgICAgICBmb3IgKHZhciBsaW5lID0gbGluZXMucG9wKCk7IGxpbmVzLmxlbmd0aCA+IDAgJiYgbGluZSAmJiBpc1doaXRlU3BhY2VTdHJpbmcobGluZSk7IGxpbmUgPSBsaW5lcy5wb3AoKSkge1xuICAgICAgICAgIGN1ckVuZC5saW5lLS07XG4gICAgICAgICAgY3VyRW5kLmNoID0gMDtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgbGFzdCB3b3JkIGlzIG5vdCBhbiBlbXB0eSBsaW5lLCBjbGlwIGFuIGFkZGl0aW9uYWwgbmV3bGluZVxuICAgICAgICBpZiAobGluZSkge1xuICAgICAgICAgIGN1ckVuZC5saW5lLS07XG4gICAgICAgICAgY3VyRW5kLmNoID0gbGluZUxlbmd0aChjbSwgY3VyRW5kLmxpbmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGN1ckVuZC5jaCA9IDA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFeHBhbmQgdGhlIHNlbGVjdGlvbiB0byBsaW5lIGVuZHMuXG4gICAgZnVuY3Rpb24gZXhwYW5kU2VsZWN0aW9uVG9MaW5lKF9jbSwgY3VyU3RhcnQsIGN1ckVuZCkge1xuICAgICAgY3VyU3RhcnQuY2ggPSAwO1xuICAgICAgY3VyRW5kLmNoID0gMDtcbiAgICAgIGN1ckVuZC5saW5lKys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluZEZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3Rlcih0ZXh0KSB7XG4gICAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICB2YXIgZmlyc3ROb25XUyA9IHRleHQuc2VhcmNoKC9cXFMvKTtcbiAgICAgIHJldHVybiBmaXJzdE5vbldTID09IC0xID8gdGV4dC5sZW5ndGggOiBmaXJzdE5vbldTO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4cGFuZFdvcmRVbmRlckN1cnNvcihjbSwgaW5jbHVzaXZlLCBfZm9yd2FyZCwgYmlnV29yZCwgbm9TeW1ib2wpIHtcbiAgICAgIHZhciBjdXIgPSBnZXRIZWFkKGNtKTtcbiAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShjdXIubGluZSk7XG4gICAgICB2YXIgaWR4ID0gY3VyLmNoO1xuXG4gICAgICAvLyBTZWVrIHRvIGZpcnN0IHdvcmQgb3Igbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVyLCBkZXBlbmRpbmcgb24gaWZcbiAgICAgIC8vIG5vU3ltYm9sIGlzIHRydWUuXG4gICAgICB2YXIgdGVzdCA9IG5vU3ltYm9sID8gd29yZENoYXJUZXN0WzBdIDogYmlnV29yZENoYXJUZXN0IFswXTtcbiAgICAgIHdoaWxlICghdGVzdChsaW5lLmNoYXJBdChpZHgpKSkge1xuICAgICAgICBpZHgrKztcbiAgICAgICAgaWYgKGlkeCA+PSBsaW5lLmxlbmd0aCkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgfVxuXG4gICAgICBpZiAoYmlnV29yZCkge1xuICAgICAgICB0ZXN0ID0gYmlnV29yZENoYXJUZXN0WzBdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGVzdCA9IHdvcmRDaGFyVGVzdFswXTtcbiAgICAgICAgaWYgKCF0ZXN0KGxpbmUuY2hhckF0KGlkeCkpKSB7XG4gICAgICAgICAgdGVzdCA9IHdvcmRDaGFyVGVzdFsxXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgZW5kID0gaWR4LCBzdGFydCA9IGlkeDtcbiAgICAgIHdoaWxlICh0ZXN0KGxpbmUuY2hhckF0KGVuZCkpICYmIGVuZCA8IGxpbmUubGVuZ3RoKSB7IGVuZCsrOyB9XG4gICAgICB3aGlsZSAodGVzdChsaW5lLmNoYXJBdChzdGFydCkpICYmIHN0YXJ0ID49IDApIHsgc3RhcnQtLTsgfVxuICAgICAgc3RhcnQrKztcblxuICAgICAgaWYgKGluY2x1c2l2ZSkge1xuICAgICAgICAvLyBJZiBwcmVzZW50LCBpbmNsdWRlIGFsbCB3aGl0ZXNwYWNlIGFmdGVyIHdvcmQuXG4gICAgICAgIC8vIE90aGVyd2lzZSwgaW5jbHVkZSBhbGwgd2hpdGVzcGFjZSBiZWZvcmUgd29yZCwgZXhjZXB0IGluZGVudGF0aW9uLlxuICAgICAgICB2YXIgd29yZEVuZCA9IGVuZDtcbiAgICAgICAgd2hpbGUgKC9cXHMvLnRlc3QobGluZS5jaGFyQXQoZW5kKSkgJiYgZW5kIDwgbGluZS5sZW5ndGgpIHsgZW5kKys7IH1cbiAgICAgICAgaWYgKHdvcmRFbmQgPT0gZW5kKSB7XG4gICAgICAgICAgdmFyIHdvcmRTdGFydCA9IHN0YXJ0O1xuICAgICAgICAgIHdoaWxlICgvXFxzLy50ZXN0KGxpbmUuY2hhckF0KHN0YXJ0IC0gMSkpICYmIHN0YXJ0ID4gMCkgeyBzdGFydC0tOyB9XG4gICAgICAgICAgaWYgKCFzdGFydCkgeyBzdGFydCA9IHdvcmRTdGFydDsgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4geyBzdGFydDogbmV3IFBvcyhjdXIubGluZSwgc3RhcnQpLCBlbmQ6IG5ldyBQb3MoY3VyLmxpbmUsIGVuZCkgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXBlbmRzIG9uIHRoZSBmb2xsb3dpbmc6XG4gICAgICpcbiAgICAgKiAtIGVkaXRvciBtb2RlIHNob3VsZCBiZSBodG1sbWl4ZWRtb2RlIC8geG1sXG4gICAgICogLSBtb2RlL3htbC94bWwuanMgc2hvdWxkIGJlIGxvYWRlZFxuICAgICAqIC0gYWRkb24vZm9sZC94bWwtZm9sZC5qcyBzaG91bGQgYmUgbG9hZGVkXG4gICAgICpcbiAgICAgKiBJZiBhbnkgb2YgdGhlIGFib3ZlIHJlcXVpcmVtZW50cyBhcmUgbm90IHRydWUsIHRoaXMgZnVuY3Rpb24gbm9vcHMuXG4gICAgICpcbiAgICAgKiBUaGlzIGlzIF9OT1RfIGEgMTAwJSBhY2N1cmF0ZSBpbXBsZW1lbnRhdGlvbiBvZiB2aW0gdGFnIHRleHQgb2JqZWN0cy5cbiAgICAgKiBUaGUgZm9sbG93aW5nIGNhdmVhdHMgYXBwbHkgKGJhc2VkIG9mZiBjdXJzb3J5IHRlc3RpbmcsIEknbSBzdXJlIHRoZXJlXG4gICAgICogYXJlIG90aGVyIGRpc2NyZXBhbmNpZXMpOlxuICAgICAqXG4gICAgICogLSBEb2VzIG5vdCB3b3JrIGluc2lkZSBjb21tZW50czpcbiAgICAgKiAgIGBgYFxuICAgICAqICAgPCEtLSA8ZGl2PmJyb2tlbjwvZGl2PiAtLT5cbiAgICAgKiAgIGBgYFxuICAgICAqIC0gRG9lcyBub3Qgd29yayB3aGVuIHRhZ3MgaGF2ZSBkaWZmZXJlbnQgY2FzZXM6XG4gICAgICogICBgYGBcbiAgICAgKiAgIDxkaXY+YnJva2VuPC9ESVY+XG4gICAgICogICBgYGBcbiAgICAgKiAtIERvZXMgbm90IHdvcmsgd2hlbiBjdXJzb3IgaXMgaW5zaWRlIGEgYnJva2VuIHRhZzpcbiAgICAgKiAgIGBgYFxuICAgICAqICAgPGRpdj48YnJvaz48ZW4+PC9kaXY+XG4gICAgICogICBgYGBcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBleHBhbmRUYWdVbmRlckN1cnNvcihjbSwgaGVhZCwgaW5jbHVzaXZlKSB7XG4gICAgICB2YXIgY3VyID0gaGVhZDtcbiAgICAgIGlmICghQ29kZU1pcnJvci5maW5kTWF0Y2hpbmdUYWcgfHwgIUNvZGVNaXJyb3IuZmluZEVuY2xvc2luZ1RhZykge1xuICAgICAgICByZXR1cm4geyBzdGFydDogY3VyLCBlbmQ6IGN1ciB9O1xuICAgICAgfVxuXG4gICAgICB2YXIgdGFncyA9IENvZGVNaXJyb3IuZmluZE1hdGNoaW5nVGFnKGNtLCBoZWFkKSB8fCBDb2RlTWlycm9yLmZpbmRFbmNsb3NpbmdUYWcoY20sIGhlYWQpO1xuICAgICAgaWYgKCF0YWdzIHx8ICF0YWdzLm9wZW4gfHwgIXRhZ3MuY2xvc2UpIHtcbiAgICAgICAgcmV0dXJuIHsgc3RhcnQ6IGN1ciwgZW5kOiBjdXIgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKGluY2x1c2l2ZSkge1xuICAgICAgICByZXR1cm4geyBzdGFydDogdGFncy5vcGVuLmZyb20sIGVuZDogdGFncy5jbG9zZS50byB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHsgc3RhcnQ6IHRhZ3Mub3Blbi50bywgZW5kOiB0YWdzLmNsb3NlLmZyb20gfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWNvcmRKdW1wUG9zaXRpb24oY20sIG9sZEN1ciwgbmV3Q3VyKSB7XG4gICAgICBpZiAoIWN1cnNvckVxdWFsKG9sZEN1ciwgbmV3Q3VyKSkge1xuICAgICAgICB2aW1HbG9iYWxTdGF0ZS5qdW1wTGlzdC5hZGQoY20sIG9sZEN1ciwgbmV3Q3VyKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWNvcmRMYXN0Q2hhcmFjdGVyU2VhcmNoKGluY3JlbWVudCwgYXJncykge1xuICAgICAgICB2aW1HbG9iYWxTdGF0ZS5sYXN0Q2hhcmFjdGVyU2VhcmNoLmluY3JlbWVudCA9IGluY3JlbWVudDtcbiAgICAgICAgdmltR2xvYmFsU3RhdGUubGFzdENoYXJhY3RlclNlYXJjaC5mb3J3YXJkID0gYXJncy5mb3J3YXJkO1xuICAgICAgICB2aW1HbG9iYWxTdGF0ZS5sYXN0Q2hhcmFjdGVyU2VhcmNoLnNlbGVjdGVkQ2hhcmFjdGVyID0gYXJncy5zZWxlY3RlZENoYXJhY3RlcjtcbiAgICB9XG5cbiAgICB2YXIgc3ltYm9sVG9Nb2RlID0ge1xuICAgICAgICAnKCc6ICdicmFja2V0JywgJyknOiAnYnJhY2tldCcsICd7JzogJ2JyYWNrZXQnLCAnfSc6ICdicmFja2V0JyxcbiAgICAgICAgJ1snOiAnc2VjdGlvbicsICddJzogJ3NlY3Rpb24nLFxuICAgICAgICAnKic6ICdjb21tZW50JywgJy8nOiAnY29tbWVudCcsXG4gICAgICAgICdtJzogJ21ldGhvZCcsICdNJzogJ21ldGhvZCcsXG4gICAgICAgICcjJzogJ3ByZXByb2Nlc3MnXG4gICAgfTtcbiAgICB2YXIgZmluZFN5bWJvbE1vZGVzID0ge1xuICAgICAgYnJhY2tldDoge1xuICAgICAgICBpc0NvbXBsZXRlOiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgICAgIGlmIChzdGF0ZS5uZXh0Q2ggPT09IHN0YXRlLnN5bWIpIHtcbiAgICAgICAgICAgIHN0YXRlLmRlcHRoKys7XG4gICAgICAgICAgICBpZiAoc3RhdGUuZGVwdGggPj0gMSlyZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHN0YXRlLm5leHRDaCA9PT0gc3RhdGUucmV2ZXJzZVN5bWIpIHtcbiAgICAgICAgICAgIHN0YXRlLmRlcHRoLS07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNlY3Rpb246IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgICBzdGF0ZS5jdXJNb3ZlVGhyb3VnaCA9IHRydWU7XG4gICAgICAgICAgc3RhdGUuc3ltYiA9IChzdGF0ZS5mb3J3YXJkID8gJ10nIDogJ1snKSA9PT0gc3RhdGUuc3ltYiA/ICd7JyA6ICd9JztcbiAgICAgICAgfSxcbiAgICAgICAgaXNDb21wbGV0ZTogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgICByZXR1cm4gc3RhdGUuaW5kZXggPT09IDAgJiYgc3RhdGUubmV4dENoID09PSBzdGF0ZS5zeW1iO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY29tbWVudDoge1xuICAgICAgICBpc0NvbXBsZXRlOiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgICAgIHZhciBmb3VuZCA9IHN0YXRlLmxhc3RDaCA9PT0gJyonICYmIHN0YXRlLm5leHRDaCA9PT0gJy8nO1xuICAgICAgICAgIHN0YXRlLmxhc3RDaCA9IHN0YXRlLm5leHRDaDtcbiAgICAgICAgICByZXR1cm4gZm91bmQ7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICAvLyBUT0RPOiBUaGUgb3JpZ2luYWwgVmltIGltcGxlbWVudGF0aW9uIG9ubHkgb3BlcmF0ZXMgb24gbGV2ZWwgMSBhbmQgMi5cbiAgICAgIC8vIFRoZSBjdXJyZW50IGltcGxlbWVudGF0aW9uIGRvZXNuJ3QgY2hlY2sgZm9yIGNvZGUgYmxvY2sgbGV2ZWwgYW5kXG4gICAgICAvLyB0aGVyZWZvcmUgaXQgb3BlcmF0ZXMgb24gYW55IGxldmVscy5cbiAgICAgIG1ldGhvZDoge1xuICAgICAgICBpbml0OiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgICAgIHN0YXRlLnN5bWIgPSAoc3RhdGUuc3ltYiA9PT0gJ20nID8gJ3snIDogJ30nKTtcbiAgICAgICAgICBzdGF0ZS5yZXZlcnNlU3ltYiA9IHN0YXRlLnN5bWIgPT09ICd7JyA/ICd9JyA6ICd7JztcbiAgICAgICAgfSxcbiAgICAgICAgaXNDb21wbGV0ZTogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgICBpZiAoc3RhdGUubmV4dENoID09PSBzdGF0ZS5zeW1iKXJldHVybiB0cnVlO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHByZXByb2Nlc3M6IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgICBzdGF0ZS5pbmRleCA9IDA7XG4gICAgICAgIH0sXG4gICAgICAgIGlzQ29tcGxldGU6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgaWYgKHN0YXRlLm5leHRDaCA9PT0gJyMnKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBzdGF0ZS5saW5lVGV4dC5tYXRjaCgvXiMoXFx3KykvKVsxXTtcbiAgICAgICAgICAgIGlmICh0b2tlbiA9PT0gJ2VuZGlmJykge1xuICAgICAgICAgICAgICBpZiAoc3RhdGUuZm9yd2FyZCAmJiBzdGF0ZS5kZXB0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHN0YXRlLmRlcHRoKys7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuID09PSAnaWYnKSB7XG4gICAgICAgICAgICAgIGlmICghc3RhdGUuZm9yd2FyZCAmJiBzdGF0ZS5kZXB0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHN0YXRlLmRlcHRoLS07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9rZW4gPT09ICdlbHNlJyAmJiBzdGF0ZS5kZXB0aCA9PT0gMClyZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICBmdW5jdGlvbiBmaW5kU3ltYm9sKGNtLCByZXBlYXQsIGZvcndhcmQsIHN5bWIpIHtcbiAgICAgIHZhciBjdXIgPSBjb3B5Q3Vyc29yKGNtLmdldEN1cnNvcigpKTtcbiAgICAgIHZhciBpbmNyZW1lbnQgPSBmb3J3YXJkID8gMSA6IC0xO1xuICAgICAgdmFyIGVuZExpbmUgPSBmb3J3YXJkID8gY20ubGluZUNvdW50KCkgOiAtMTtcbiAgICAgIHZhciBjdXJDaCA9IGN1ci5jaDtcbiAgICAgIHZhciBsaW5lID0gY3VyLmxpbmU7XG4gICAgICB2YXIgbGluZVRleHQgPSBjbS5nZXRMaW5lKGxpbmUpO1xuICAgICAgdmFyIHN0YXRlID0ge1xuICAgICAgICBsaW5lVGV4dDogbGluZVRleHQsXG4gICAgICAgIG5leHRDaDogbGluZVRleHQuY2hhckF0KGN1ckNoKSxcbiAgICAgICAgbGFzdENoOiBudWxsLFxuICAgICAgICBpbmRleDogY3VyQ2gsXG4gICAgICAgIHN5bWI6IHN5bWIsXG4gICAgICAgIHJldmVyc2VTeW1iOiAoZm9yd2FyZCA/ICB7ICcpJzogJygnLCAnfSc6ICd7JyB9IDogeyAnKCc6ICcpJywgJ3snOiAnfScgfSlbc3ltYl0sXG4gICAgICAgIGZvcndhcmQ6IGZvcndhcmQsXG4gICAgICAgIGRlcHRoOiAwLFxuICAgICAgICBjdXJNb3ZlVGhyb3VnaDogZmFsc2VcbiAgICAgIH07XG4gICAgICB2YXIgbW9kZSA9IHN5bWJvbFRvTW9kZVtzeW1iXTtcbiAgICAgIGlmICghbW9kZSlyZXR1cm4gY3VyO1xuICAgICAgdmFyIGluaXQgPSBmaW5kU3ltYm9sTW9kZXNbbW9kZV0uaW5pdDtcbiAgICAgIHZhciBpc0NvbXBsZXRlID0gZmluZFN5bWJvbE1vZGVzW21vZGVdLmlzQ29tcGxldGU7XG4gICAgICBpZiAoaW5pdCkgeyBpbml0KHN0YXRlKTsgfVxuICAgICAgd2hpbGUgKGxpbmUgIT09IGVuZExpbmUgJiYgcmVwZWF0KSB7XG4gICAgICAgIHN0YXRlLmluZGV4ICs9IGluY3JlbWVudDtcbiAgICAgICAgc3RhdGUubmV4dENoID0gc3RhdGUubGluZVRleHQuY2hhckF0KHN0YXRlLmluZGV4KTtcbiAgICAgICAgaWYgKCFzdGF0ZS5uZXh0Q2gpIHtcbiAgICAgICAgICBsaW5lICs9IGluY3JlbWVudDtcbiAgICAgICAgICBzdGF0ZS5saW5lVGV4dCA9IGNtLmdldExpbmUobGluZSkgfHwgJyc7XG4gICAgICAgICAgaWYgKGluY3JlbWVudCA+IDApIHtcbiAgICAgICAgICAgIHN0YXRlLmluZGV4ID0gMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGxpbmVMZW4gPSBzdGF0ZS5saW5lVGV4dC5sZW5ndGg7XG4gICAgICAgICAgICBzdGF0ZS5pbmRleCA9IChsaW5lTGVuID4gMCkgPyAobGluZUxlbi0xKSA6IDA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YXRlLm5leHRDaCA9IHN0YXRlLmxpbmVUZXh0LmNoYXJBdChzdGF0ZS5pbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQ29tcGxldGUoc3RhdGUpKSB7XG4gICAgICAgICAgY3VyLmxpbmUgPSBsaW5lO1xuICAgICAgICAgIGN1ci5jaCA9IHN0YXRlLmluZGV4O1xuICAgICAgICAgIHJlcGVhdC0tO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3RhdGUubmV4dENoIHx8IHN0YXRlLmN1ck1vdmVUaHJvdWdoKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGxpbmUsIHN0YXRlLmluZGV4KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXI7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBSZXR1cm5zIHRoZSBib3VuZGFyaWVzIG9mIHRoZSBuZXh0IHdvcmQuIElmIHRoZSBjdXJzb3IgaW4gdGhlIG1pZGRsZSBvZlxuICAgICAqIHRoZSB3b3JkLCB0aGVuIHJldHVybnMgdGhlIGJvdW5kYXJpZXMgb2YgdGhlIGN1cnJlbnQgd29yZCwgc3RhcnRpbmcgYXRcbiAgICAgKiB0aGUgY3Vyc29yLiBJZiB0aGUgY3Vyc29yIGlzIGF0IHRoZSBzdGFydC9lbmQgb2YgYSB3b3JkLCBhbmQgd2UgYXJlIGdvaW5nXG4gICAgICogZm9yd2FyZC9iYWNrd2FyZCwgcmVzcGVjdGl2ZWx5LCBmaW5kIHRoZSBib3VuZGFyaWVzIG9mIHRoZSBuZXh0IHdvcmQuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0NvZGVNaXJyb3J9IGNtIENvZGVNaXJyb3Igb2JqZWN0LlxuICAgICAqIEBwYXJhbSB7Q3Vyc29yfSBjdXIgVGhlIGN1cnNvciBwb3NpdGlvbi5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZvcndhcmQgVHJ1ZSB0byBzZWFyY2ggZm9yd2FyZC4gRmFsc2UgdG8gc2VhcmNoXG4gICAgICogICAgIGJhY2t3YXJkLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYmlnV29yZCBUcnVlIGlmIHB1bmN0dWF0aW9uIGNvdW50IGFzIHBhcnQgb2YgdGhlIHdvcmQuXG4gICAgICogICAgIEZhbHNlIGlmIG9ubHkgW2EtekEtWjAtOV0gY2hhcmFjdGVycyBjb3VudCBhcyBwYXJ0IG9mIHRoZSB3b3JkLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZW1wdHlMaW5lSXNXb3JkIFRydWUgaWYgZW1wdHkgbGluZXMgc2hvdWxkIGJlIHRyZWF0ZWRcbiAgICAgKiAgICAgYXMgd29yZHMuXG4gICAgICogQHJldHVybiB7T2JqZWN0e2Zyb206bnVtYmVyLCB0bzpudW1iZXIsIGxpbmU6IG51bWJlcn19IFRoZSBib3VuZGFyaWVzIG9mXG4gICAgICogICAgIHRoZSB3b3JkLCBvciBudWxsIGlmIHRoZXJlIGFyZSBubyBtb3JlIHdvcmRzLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZpbmRXb3JkKGNtLCBjdXIsIGZvcndhcmQsIGJpZ1dvcmQsIGVtcHR5TGluZUlzV29yZCkge1xuICAgICAgdmFyIGxpbmVOdW0gPSBjdXIubGluZTtcbiAgICAgIHZhciBwb3MgPSBjdXIuY2g7XG4gICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUobGluZU51bSk7XG4gICAgICB2YXIgZGlyID0gZm9yd2FyZCA/IDEgOiAtMTtcbiAgICAgIHZhciBjaGFyVGVzdHMgPSBiaWdXb3JkID8gYmlnV29yZENoYXJUZXN0OiB3b3JkQ2hhclRlc3Q7XG5cbiAgICAgIGlmIChlbXB0eUxpbmVJc1dvcmQgJiYgbGluZSA9PSAnJykge1xuICAgICAgICBsaW5lTnVtICs9IGRpcjtcbiAgICAgICAgbGluZSA9IGNtLmdldExpbmUobGluZU51bSk7XG4gICAgICAgIGlmICghaXNMaW5lKGNtLCBsaW5lTnVtKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHBvcyA9IChmb3J3YXJkKSA/IDAgOiBsaW5lLmxlbmd0aDtcbiAgICAgIH1cblxuICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgaWYgKGVtcHR5TGluZUlzV29yZCAmJiBsaW5lID09ICcnKSB7XG4gICAgICAgICAgcmV0dXJuIHsgZnJvbTogMCwgdG86IDAsIGxpbmU6IGxpbmVOdW0gfTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RvcCA9IChkaXIgPiAwKSA/IGxpbmUubGVuZ3RoIDogLTE7XG4gICAgICAgIHZhciB3b3JkU3RhcnQgPSBzdG9wLCB3b3JkRW5kID0gc3RvcDtcbiAgICAgICAgLy8gRmluZCBib3VuZHMgb2YgbmV4dCB3b3JkLlxuICAgICAgICB3aGlsZSAocG9zICE9IHN0b3ApIHtcbiAgICAgICAgICB2YXIgZm91bmRXb3JkID0gZmFsc2U7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGFyVGVzdHMubGVuZ3RoICYmICFmb3VuZFdvcmQ7ICsraSkge1xuICAgICAgICAgICAgaWYgKGNoYXJUZXN0c1tpXShsaW5lLmNoYXJBdChwb3MpKSkge1xuICAgICAgICAgICAgICB3b3JkU3RhcnQgPSBwb3M7XG4gICAgICAgICAgICAgIC8vIEFkdmFuY2UgdG8gZW5kIG9mIHdvcmQuXG4gICAgICAgICAgICAgIHdoaWxlIChwb3MgIT0gc3RvcCAmJiBjaGFyVGVzdHNbaV0obGluZS5jaGFyQXQocG9zKSkpIHtcbiAgICAgICAgICAgICAgICBwb3MgKz0gZGlyO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHdvcmRFbmQgPSBwb3M7XG4gICAgICAgICAgICAgIGZvdW5kV29yZCA9IHdvcmRTdGFydCAhPSB3b3JkRW5kO1xuICAgICAgICAgICAgICBpZiAod29yZFN0YXJ0ID09IGN1ci5jaCAmJiBsaW5lTnVtID09IGN1ci5saW5lICYmXG4gICAgICAgICAgICAgICAgICB3b3JkRW5kID09IHdvcmRTdGFydCArIGRpcikge1xuICAgICAgICAgICAgICAgIC8vIFdlIHN0YXJ0ZWQgYXQgdGhlIGVuZCBvZiBhIHdvcmQuIEZpbmQgdGhlIG5leHQgb25lLlxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICBmcm9tOiBNYXRoLm1pbih3b3JkU3RhcnQsIHdvcmRFbmQgKyAxKSxcbiAgICAgICAgICAgICAgICAgIHRvOiBNYXRoLm1heCh3b3JkU3RhcnQsIHdvcmRFbmQpLFxuICAgICAgICAgICAgICAgICAgbGluZTogbGluZU51bSB9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghZm91bmRXb3JkKSB7XG4gICAgICAgICAgICBwb3MgKz0gZGlyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBBZHZhbmNlIHRvIG5leHQvcHJldiBsaW5lLlxuICAgICAgICBsaW5lTnVtICs9IGRpcjtcbiAgICAgICAgaWYgKCFpc0xpbmUoY20sIGxpbmVOdW0pKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgbGluZSA9IGNtLmdldExpbmUobGluZU51bSk7XG4gICAgICAgIHBvcyA9IChkaXIgPiAwKSA/IDAgOiBsaW5lLmxlbmd0aDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0NvZGVNaXJyb3J9IGNtIENvZGVNaXJyb3Igb2JqZWN0LlxuICAgICAqIEBwYXJhbSB7UG9zfSBjdXIgVGhlIHBvc2l0aW9uIHRvIHN0YXJ0IGZyb20uXG4gICAgICogQHBhcmFtIHtpbnR9IHJlcGVhdCBOdW1iZXIgb2Ygd29yZHMgdG8gbW92ZSBwYXN0LlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9yd2FyZCBUcnVlIHRvIHNlYXJjaCBmb3J3YXJkLiBGYWxzZSB0byBzZWFyY2hcbiAgICAgKiAgICAgYmFja3dhcmQuXG4gICAgICogQHBhcmFtIHtib29sZWFufSB3b3JkRW5kIFRydWUgdG8gbW92ZSB0byBlbmQgb2Ygd29yZC4gRmFsc2UgdG8gbW92ZSB0b1xuICAgICAqICAgICBiZWdpbm5pbmcgb2Ygd29yZC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGJpZ1dvcmQgVHJ1ZSBpZiBwdW5jdHVhdGlvbiBjb3VudCBhcyBwYXJ0IG9mIHRoZSB3b3JkLlxuICAgICAqICAgICBGYWxzZSBpZiBvbmx5IGFscGhhYmV0IGNoYXJhY3RlcnMgY291bnQgYXMgcGFydCBvZiB0aGUgd29yZC5cbiAgICAgKiBAcmV0dXJuIHtDdXJzb3J9IFRoZSBwb3NpdGlvbiB0aGUgY3Vyc29yIHNob3VsZCBtb3ZlIHRvLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIG1vdmVUb1dvcmQoY20sIGN1ciwgcmVwZWF0LCBmb3J3YXJkLCB3b3JkRW5kLCBiaWdXb3JkKSB7XG4gICAgICB2YXIgY3VyU3RhcnQgPSBjb3B5Q3Vyc29yKGN1cik7XG4gICAgICB2YXIgd29yZHMgPSBbXTtcbiAgICAgIGlmIChmb3J3YXJkICYmICF3b3JkRW5kIHx8ICFmb3J3YXJkICYmIHdvcmRFbmQpIHtcbiAgICAgICAgcmVwZWF0Kys7XG4gICAgICB9XG4gICAgICAvLyBGb3IgJ2UnLCBlbXB0eSBsaW5lcyBhcmUgbm90IGNvbnNpZGVyZWQgd29yZHMsIGdvIGZpZ3VyZS5cbiAgICAgIHZhciBlbXB0eUxpbmVJc1dvcmQgPSAhKGZvcndhcmQgJiYgd29yZEVuZCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcGVhdDsgaSsrKSB7XG4gICAgICAgIHZhciB3b3JkID0gZmluZFdvcmQoY20sIGN1ciwgZm9yd2FyZCwgYmlnV29yZCwgZW1wdHlMaW5lSXNXb3JkKTtcbiAgICAgICAgaWYgKCF3b3JkKSB7XG4gICAgICAgICAgdmFyIGVvZENoID0gbGluZUxlbmd0aChjbSwgY20ubGFzdExpbmUoKSk7XG4gICAgICAgICAgd29yZHMucHVzaChmb3J3YXJkXG4gICAgICAgICAgICAgID8ge2xpbmU6IGNtLmxhc3RMaW5lKCksIGZyb206IGVvZENoLCB0bzogZW9kQ2h9XG4gICAgICAgICAgICAgIDoge2xpbmU6IDAsIGZyb206IDAsIHRvOiAwfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgd29yZHMucHVzaCh3b3JkKTtcbiAgICAgICAgY3VyID0gbmV3IFBvcyh3b3JkLmxpbmUsIGZvcndhcmQgPyAod29yZC50byAtIDEpIDogd29yZC5mcm9tKTtcbiAgICAgIH1cbiAgICAgIHZhciBzaG9ydENpcmN1aXQgPSB3b3Jkcy5sZW5ndGggIT0gcmVwZWF0O1xuICAgICAgdmFyIGZpcnN0V29yZCA9IHdvcmRzWzBdO1xuICAgICAgdmFyIGxhc3RXb3JkID0gd29yZHMucG9wKCk7XG4gICAgICBpZiAoZm9yd2FyZCAmJiAhd29yZEVuZCkge1xuICAgICAgICAvLyB3XG4gICAgICAgIGlmICghc2hvcnRDaXJjdWl0ICYmIChmaXJzdFdvcmQuZnJvbSAhPSBjdXJTdGFydC5jaCB8fCBmaXJzdFdvcmQubGluZSAhPSBjdXJTdGFydC5saW5lKSkge1xuICAgICAgICAgIC8vIFdlIGRpZCBub3Qgc3RhcnQgaW4gdGhlIG1pZGRsZSBvZiBhIHdvcmQuIERpc2NhcmQgdGhlIGV4dHJhIHdvcmQgYXQgdGhlIGVuZC5cbiAgICAgICAgICBsYXN0V29yZCA9IHdvcmRzLnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGxhc3RXb3JkLmxpbmUsIGxhc3RXb3JkLmZyb20pO1xuICAgICAgfSBlbHNlIGlmIChmb3J3YXJkICYmIHdvcmRFbmQpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MobGFzdFdvcmQubGluZSwgbGFzdFdvcmQudG8gLSAxKTtcbiAgICAgIH0gZWxzZSBpZiAoIWZvcndhcmQgJiYgd29yZEVuZCkge1xuICAgICAgICAvLyBnZVxuICAgICAgICBpZiAoIXNob3J0Q2lyY3VpdCAmJiAoZmlyc3RXb3JkLnRvICE9IGN1clN0YXJ0LmNoIHx8IGZpcnN0V29yZC5saW5lICE9IGN1clN0YXJ0LmxpbmUpKSB7XG4gICAgICAgICAgLy8gV2UgZGlkIG5vdCBzdGFydCBpbiB0aGUgbWlkZGxlIG9mIGEgd29yZC4gRGlzY2FyZCB0aGUgZXh0cmEgd29yZCBhdCB0aGUgZW5kLlxuICAgICAgICAgIGxhc3RXb3JkID0gd29yZHMucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQb3MobGFzdFdvcmQubGluZSwgbGFzdFdvcmQudG8pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYlxuICAgICAgICByZXR1cm4gbmV3IFBvcyhsYXN0V29yZC5saW5lLCBsYXN0V29yZC5mcm9tKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtb3ZlVG9Fb2woY20sIGhlYWQsIG1vdGlvbkFyZ3MsIHZpbSwga2VlcEhQb3MpIHtcbiAgICAgIHZhciBjdXIgPSBoZWFkO1xuICAgICAgdmFyIHJldHZhbD0gbmV3IFBvcyhjdXIubGluZSArIG1vdGlvbkFyZ3MucmVwZWF0IC0gMSwgSW5maW5pdHkpO1xuICAgICAgdmFyIGVuZD1jbS5jbGlwUG9zKHJldHZhbCk7XG4gICAgICBlbmQuY2gtLTtcbiAgICAgIGlmICgha2VlcEhQb3MpIHtcbiAgICAgICAgdmltLmxhc3RIUG9zID0gSW5maW5pdHk7XG4gICAgICAgIHZpbS5sYXN0SFNQb3MgPSBjbS5jaGFyQ29vcmRzKGVuZCwnZGl2JykubGVmdDtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXR2YWw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW92ZVRvQ2hhcmFjdGVyKGNtLCByZXBlYXQsIGZvcndhcmQsIGNoYXJhY3Rlcikge1xuICAgICAgdmFyIGN1ciA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgdmFyIHN0YXJ0ID0gY3VyLmNoO1xuICAgICAgdmFyIGlkeDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwZWF0OyBpICsrKSB7XG4gICAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShjdXIubGluZSk7XG4gICAgICAgIGlkeCA9IGNoYXJJZHhJbkxpbmUoc3RhcnQsIGxpbmUsIGNoYXJhY3RlciwgZm9yd2FyZCwgdHJ1ZSk7XG4gICAgICAgIGlmIChpZHggPT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBzdGFydCA9IGlkeDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgUG9zKGNtLmdldEN1cnNvcigpLmxpbmUsIGlkeCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW92ZVRvQ29sdW1uKGNtLCByZXBlYXQpIHtcbiAgICAgIC8vIHJlcGVhdCBpcyBhbHdheXMgPj0gMSwgc28gcmVwZWF0IC0gMSBhbHdheXMgY29ycmVzcG9uZHNcbiAgICAgIC8vIHRvIHRoZSBjb2x1bW4gd2Ugd2FudCB0byBnbyB0by5cbiAgICAgIHZhciBsaW5lID0gY20uZ2V0Q3Vyc29yKCkubGluZTtcbiAgICAgIHJldHVybiBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBuZXcgUG9zKGxpbmUsIHJlcGVhdCAtIDEpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNYXJrKGNtLCB2aW0sIG1hcmtOYW1lLCBwb3MpIHtcbiAgICAgIGlmICghaW5BcnJheShtYXJrTmFtZSwgdmFsaWRNYXJrcykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHZpbS5tYXJrc1ttYXJrTmFtZV0pIHtcbiAgICAgICAgdmltLm1hcmtzW21hcmtOYW1lXS5jbGVhcigpO1xuICAgICAgfVxuICAgICAgdmltLm1hcmtzW21hcmtOYW1lXSA9IGNtLnNldEJvb2ttYXJrKHBvcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hhcklkeEluTGluZShzdGFydCwgbGluZSwgY2hhcmFjdGVyLCBmb3J3YXJkLCBpbmNsdWRlQ2hhcikge1xuICAgICAgLy8gU2VhcmNoIGZvciBjaGFyIGluIGxpbmUuXG4gICAgICAvLyBtb3Rpb25fb3B0aW9uczoge2ZvcndhcmQsIGluY2x1ZGVDaGFyfVxuICAgICAgLy8gSWYgaW5jbHVkZUNoYXIgPSB0cnVlLCBpbmNsdWRlIGl0IHRvby5cbiAgICAgIC8vIElmIGZvcndhcmQgPSB0cnVlLCBzZWFyY2ggZm9yd2FyZCwgZWxzZSBzZWFyY2ggYmFja3dhcmRzLlxuICAgICAgLy8gSWYgY2hhciBpcyBub3QgZm91bmQgb24gdGhpcyBsaW5lLCBkbyBub3RoaW5nXG4gICAgICB2YXIgaWR4O1xuICAgICAgaWYgKGZvcndhcmQpIHtcbiAgICAgICAgaWR4ID0gbGluZS5pbmRleE9mKGNoYXJhY3Rlciwgc3RhcnQgKyAxKTtcbiAgICAgICAgaWYgKGlkeCAhPSAtMSAmJiAhaW5jbHVkZUNoYXIpIHtcbiAgICAgICAgICBpZHggLT0gMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWR4ID0gbGluZS5sYXN0SW5kZXhPZihjaGFyYWN0ZXIsIHN0YXJ0IC0gMSk7XG4gICAgICAgIGlmIChpZHggIT0gLTEgJiYgIWluY2x1ZGVDaGFyKSB7XG4gICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBpZHg7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluZFBhcmFncmFwaChjbSwgaGVhZCwgcmVwZWF0LCBkaXIsIGluY2x1c2l2ZSkge1xuICAgICAgdmFyIGxpbmUgPSBoZWFkLmxpbmU7XG4gICAgICB2YXIgbWluID0gY20uZmlyc3RMaW5lKCk7XG4gICAgICB2YXIgbWF4ID0gY20ubGFzdExpbmUoKTtcbiAgICAgIHZhciBzdGFydCwgZW5kLCBpID0gbGluZTtcbiAgICAgIGZ1bmN0aW9uIGlzRW1wdHkoaSkgeyByZXR1cm4gIS9cXFMvLnRlc3QoY20uZ2V0TGluZShpKSk7IH0gLy8gYWNlX3BhdGNoXG4gICAgICBmdW5jdGlvbiBpc0JvdW5kYXJ5KGksIGRpciwgYW55KSB7XG4gICAgICAgIGlmIChhbnkpIHsgcmV0dXJuIGlzRW1wdHkoaSkgIT0gaXNFbXB0eShpICsgZGlyKTsgfVxuICAgICAgICByZXR1cm4gIWlzRW1wdHkoaSkgJiYgaXNFbXB0eShpICsgZGlyKTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHNraXBGb2xkKGkpIHtcbiAgICAgICAgICBkaXIgPSBkaXIgPiAwID8gMSA6IC0xO1xuICAgICAgICAgIHZhciBmb2xkTGluZSA9IGNtLmFjZS5zZXNzaW9uLmdldEZvbGRMaW5lKGkpO1xuICAgICAgICAgIGlmIChmb2xkTGluZSkge1xuICAgICAgICAgICAgICBpZiAoaSArIGRpciA+IGZvbGRMaW5lLnN0YXJ0LnJvdyAmJiBpICsgZGlyIDwgZm9sZExpbmUuZW5kLnJvdylcbiAgICAgICAgICAgICAgICAgIGRpciA9IChkaXIgPiAwID8gZm9sZExpbmUuZW5kLnJvdyA6IGZvbGRMaW5lLnN0YXJ0LnJvdykgLSBpO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgd2hpbGUgKG1pbiA8PSBpICYmIGkgPD0gbWF4ICYmIHJlcGVhdCA+IDApIHtcbiAgICAgICAgICBza2lwRm9sZChpKTtcbiAgICAgICAgICBpZiAoaXNCb3VuZGFyeShpLCBkaXIpKSB7IHJlcGVhdC0tOyB9XG4gICAgICAgICAgaSArPSBkaXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBQb3MoaSwgMCk7XG4gICAgICB9XG5cbiAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICBpZiAodmltLnZpc3VhbExpbmUgJiYgaXNCb3VuZGFyeShsaW5lLCAxLCB0cnVlKSkge1xuICAgICAgICB2YXIgYW5jaG9yID0gdmltLnNlbC5hbmNob3I7XG4gICAgICAgIGlmIChpc0JvdW5kYXJ5KGFuY2hvci5saW5lLCAtMSwgdHJ1ZSkpIHtcbiAgICAgICAgICBpZiAoIWluY2x1c2l2ZSB8fCBhbmNob3IubGluZSAhPSBsaW5lKSB7XG4gICAgICAgICAgICBsaW5lICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgc3RhcnRTdGF0ZSA9IGlzRW1wdHkobGluZSk7XG4gICAgICBmb3IgKGkgPSBsaW5lOyBpIDw9IG1heCAmJiByZXBlYXQ7IGkrKykge1xuICAgICAgICBpZiAoaXNCb3VuZGFyeShpLCAxLCB0cnVlKSkge1xuICAgICAgICAgIGlmICghaW5jbHVzaXZlIHx8IGlzRW1wdHkoaSkgIT0gc3RhcnRTdGF0ZSkge1xuICAgICAgICAgICAgcmVwZWF0LS07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbmQgPSBuZXcgUG9zKGksIDApO1xuICAgICAgLy8gc2VsZWN0IGJvdW5kYXJ5IGJlZm9yZSBwYXJhZ3JhcGggZm9yIHRoZSBsYXN0IG9uZVxuICAgICAgaWYgKGkgPiBtYXggJiYgIXN0YXJ0U3RhdGUpIHsgc3RhcnRTdGF0ZSA9IHRydWU7IH1cbiAgICAgIGVsc2UgeyBpbmNsdXNpdmUgPSBmYWxzZTsgfVxuICAgICAgZm9yIChpID0gbGluZTsgaSA+IG1pbjsgaS0tKSB7XG4gICAgICAgIGlmICghaW5jbHVzaXZlIHx8IGlzRW1wdHkoaSkgPT0gc3RhcnRTdGF0ZSB8fCBpID09IGxpbmUpIHtcbiAgICAgICAgICBpZiAoaXNCb3VuZGFyeShpLCAtMSwgdHJ1ZSkpIHsgYnJlYWs7IH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgc3RhcnQgPSBuZXcgUG9zKGksIDApO1xuICAgICAgcmV0dXJuIHsgc3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZCB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEJhc2VkIG9uIHtAbGluayBmaW5kU2VudGVuY2V9LiBUaGUgaW50ZXJuYWwgZnVuY3Rpb25zIGhhdmUgdGhlIHNhbWUgbmFtZXMsXG4gICAgICogYnV0IHRoZWlyIGJlaGF2aW91ciBpcyBkaWZmZXJlbnQuIGZpbmRTZW50ZW5jZSgpIGNyb3NzZXMgbGluZSBicmVha3MgYW5kIFxuICAgICAqIGlzIHVzZWQgZm9yIGp1bXBpbmcgdG8gc2VudGVuY2UgYmVnaW5uaW5ncyBiZWZvcmUgb3IgYWZ0ZXIgdGhlIGN1cnJlbnQgY3Vyc29yIHBvc2l0aW9uLCBcbiAgICAgKiB3aGVyZWFzIGdldFNlbnRlbmNlKCkgaXMgZm9yIGdldHRpbmcgdGhlIGJlZ2lubmluZyBvciBlbmQgb2YgdGhlIHNlbnRlbmNlIFxuICAgICAqIGF0IHRoZSBjdXJyZW50IGN1cnNvciBwb3NpdGlvbiwgZWl0aGVyIGluY2x1ZGluZyAoYSkgb3IgZXhjbHVkaW5nIChpKSB3aGl0ZXNwYWNlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGdldFNlbnRlbmNlKGNtLCBjdXIsIHJlcGVhdCwgZGlyLCBpbmNsdXNpdmUgLyppbmNsdWRlcyB3aGl0ZXNwYWNlKi8pIHtcblxuICAgICAgLypcbiAgICAgICAgVGFrZXMgYW4gaW5kZXggb2JqZWN0XG4gICAgICAgIHtcbiAgICAgICAgICBsaW5lOiB0aGUgbGluZSBzdHJpbmcsXG4gICAgICAgICAgbG46IGxpbmUgbnVtYmVyLFxuICAgICAgICAgIHBvczogaW5kZXggaW4gbGluZSxcbiAgICAgICAgICBkaXI6IGRpcmVjdGlvbiBvZiB0cmF2ZXJzYWwgKC0xIG9yIDEpXG4gICAgICAgIH1cbiAgICAgICAgYW5kIG1vZGlmaWVzIHRoZSBwb3MgbWVtYmVyIHRvIHJlcHJlc2VudCB0aGVcbiAgICAgICAgbmV4dCB2YWxpZCBwb3NpdGlvbiBvciBzZXRzIHRoZSBsaW5lIHRvIG51bGwgaWYgdGhlcmUgYXJlXG4gICAgICAgIG5vIG1vcmUgdmFsaWQgcG9zaXRpb25zLlxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBuZXh0Q2hhcihjdXJyKSB7XG4gICAgICAgIGlmIChjdXJyLnBvcyArIGN1cnIuZGlyIDwgMCB8fCBjdXJyLnBvcyArIGN1cnIuZGlyID49IGN1cnIubGluZS5sZW5ndGgpIHtcbiAgICAgICAgICBjdXJyLmxpbmUgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGN1cnIucG9zICs9IGN1cnIuZGlyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICAvKlxuICAgICAgICBQZXJmb3JtcyBvbmUgaXRlcmF0aW9uIG9mIHRyYXZlcnNhbCBpbiBmb3J3YXJkIGRpcmVjdGlvblxuICAgICAgICBSZXR1cm5zIGFuIGluZGV4IG9iamVjdCBvZiB0aGUgc2VudGVuY2UgZW5kXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGZvcndhcmQoY20sIGxuLCBwb3MsIGRpcikge1xuICAgICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUobG4pO1xuXG4gICAgICAgIHZhciBjdXJyID0ge1xuICAgICAgICAgIGxpbmU6IGxpbmUsXG4gICAgICAgICAgbG46IGxuLFxuICAgICAgICAgIHBvczogcG9zLFxuICAgICAgICAgIGRpcjogZGlyLFxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChjdXJyLmxpbmUgPT09IFwiXCIpIHtcbiAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBjdXJyLnBvcyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxhc3RTZW50ZW5jZVBvcyA9IGN1cnIucG9zO1xuXG4gICAgICAgIC8vIE1vdmUgb25lIHN0ZXAgdG8gc2tpcCBjaGFyYWN0ZXIgd2Ugc3RhcnQgb25cbiAgICAgICAgbmV4dENoYXIoY3Vycik7XG5cbiAgICAgICAgd2hpbGUgKGN1cnIubGluZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGxhc3RTZW50ZW5jZVBvcyA9IGN1cnIucG9zO1xuICAgICAgICAgIGlmIChpc0VuZE9mU2VudGVuY2VTeW1ib2woY3Vyci5saW5lW2N1cnIucG9zXSkpIHtcbiAgICAgICAgICAgIGlmICghaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGN1cnIucG9zICsgMSB9O1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBuZXh0Q2hhcihjdXJyKTtcbiAgICAgICAgICAgICAgd2hpbGUgKGN1cnIubGluZSAhPT0gbnVsbCApIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNXaGl0ZVNwYWNlU3RyaW5nKGN1cnIubGluZVtjdXJyLnBvc10pKSB7XG4gICAgICAgICAgICAgICAgICBsYXN0U2VudGVuY2VQb3MgPSBjdXJyLnBvcztcbiAgICAgICAgICAgICAgICAgIG5leHRDaGFyKGN1cnIpXG4gICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBsYXN0U2VudGVuY2VQb3MgKyAxIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIG5leHRDaGFyKGN1cnIpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGxhc3RTZW50ZW5jZVBvcyArIDEgfTtcbiAgICAgIH1cblxuICAgICAgLypcbiAgICAgICAgUGVyZm9ybXMgb25lIGl0ZXJhdGlvbiBvZiB0cmF2ZXJzYWwgaW4gcmV2ZXJzZSBkaXJlY3Rpb25cbiAgICAgICAgUmV0dXJucyBhbiBpbmRleCBvYmplY3Qgb2YgdGhlIHNlbnRlbmNlIHN0YXJ0XG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJldmVyc2UoY20sIGxuLCBwb3MsIGRpcikge1xuICAgICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUobG4pO1xuXG4gICAgICAgIHZhciBjdXJyID0ge1xuICAgICAgICAgIGxpbmU6IGxpbmUsXG4gICAgICAgICAgbG46IGxuLFxuICAgICAgICAgIHBvczogcG9zLFxuICAgICAgICAgIGRpcjogZGlyLFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGN1cnIubGluZSA9PT0gXCJcIikge1xuICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGN1cnIucG9zIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGFzdFNlbnRlbmNlUG9zID0gY3Vyci5wb3M7XG5cbiAgICAgICAgLy8gTW92ZSBvbmUgc3RlcCB0byBza2lwIGNoYXJhY3RlciB3ZSBzdGFydCBvblxuICAgICAgICBuZXh0Q2hhcihjdXJyKTtcblxuICAgICAgICB3aGlsZSAoY3Vyci5saW5lICE9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKCFpc1doaXRlU3BhY2VTdHJpbmcoY3Vyci5saW5lW2N1cnIucG9zXSkgJiYgIWlzRW5kT2ZTZW50ZW5jZVN5bWJvbChjdXJyLmxpbmVbY3Vyci5wb3NdKSkge1xuICAgICAgICAgICAgbGFzdFNlbnRlbmNlUG9zID0gY3Vyci5wb3M7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZWxzZSBpZiAoaXNFbmRPZlNlbnRlbmNlU3ltYm9sKGN1cnIubGluZVtjdXJyLnBvc10pICkge1xuICAgICAgICAgICAgaWYgKCFpbmNsdXNpdmUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgbG46IGN1cnIubG4sIHBvczogbGFzdFNlbnRlbmNlUG9zIH07XG4gICAgICAgICAgICB9IFxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChpc1doaXRlU3BhY2VTdHJpbmcoY3Vyci5saW5lW2N1cnIucG9zICsgMV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbG46IGN1cnIubG4sIHBvczogY3Vyci5wb3MgKyAxIH07XG4gICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGxhc3RTZW50ZW5jZVBvcyB9O1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dENoYXIoY3Vycik7XG4gICAgICAgIH1cbiAgICAgICAgY3Vyci5saW5lID0gbGluZVxuICAgICAgICBpZiAoaW5jbHVzaXZlICYmIGlzV2hpdGVTcGFjZVN0cmluZyhjdXJyLmxpbmVbY3Vyci5wb3NdKSkge1xuICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGN1cnIucG9zIH07XG4gICAgICAgIH0gXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGxhc3RTZW50ZW5jZVBvcyB9O1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgICAgdmFyIGN1cnJfaW5kZXggPSB7XG4gICAgICAgIGxuOiBjdXIubGluZSxcbiAgICAgICAgcG9zOiBjdXIuY2gsXG4gICAgICB9O1xuXG4gICAgICB3aGlsZSAocmVwZWF0ID4gMCkge1xuICAgICAgICBpZiAoZGlyIDwgMCkge1xuICAgICAgICAgIGN1cnJfaW5kZXggPSByZXZlcnNlKGNtLCBjdXJyX2luZGV4LmxuLCBjdXJyX2luZGV4LnBvcywgZGlyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjdXJyX2luZGV4ID0gZm9yd2FyZChjbSwgY3Vycl9pbmRleC5sbiwgY3Vycl9pbmRleC5wb3MsIGRpcik7XG4gICAgICAgIH1cbiAgICAgICAgcmVwZWF0LS07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBuZXcgUG9zKGN1cnJfaW5kZXgubG4sIGN1cnJfaW5kZXgucG9zKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kU2VudGVuY2UoY20sIGN1ciwgcmVwZWF0LCBkaXIpIHtcblxuICAgICAgIC8qXG4gICAgICAgICBUYWtlcyBhbiBpbmRleCBvYmplY3RcbiAgICAgICAgIHtcbiAgICAgICAgICAgbGluZTogdGhlIGxpbmUgc3RyaW5nLFxuICAgICAgICAgICBsbjogbGluZSBudW1iZXIsXG4gICAgICAgICAgIHBvczogaW5kZXggaW4gbGluZSxcbiAgICAgICAgICAgZGlyOiBkaXJlY3Rpb24gb2YgdHJhdmVyc2FsICgtMSBvciAxKVxuICAgICAgICAgfVxuICAgICAgICAgYW5kIG1vZGlmaWVzIHRoZSBsaW5lLCBsbiwgYW5kIHBvcyBtZW1iZXJzIHRvIHJlcHJlc2VudCB0aGVcbiAgICAgICAgIG5leHQgdmFsaWQgcG9zaXRpb24gb3Igc2V0cyB0aGVtIHRvIG51bGwgaWYgdGhlcmUgYXJlXG4gICAgICAgICBubyBtb3JlIHZhbGlkIHBvc2l0aW9ucy5cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gbmV4dENoYXIoY20sIGlkeCkge1xuICAgICAgICBpZiAoaWR4LnBvcyArIGlkeC5kaXIgPCAwIHx8IGlkeC5wb3MgKyBpZHguZGlyID49IGlkeC5saW5lLmxlbmd0aCkge1xuICAgICAgICAgIGlkeC5sbiArPSBpZHguZGlyO1xuICAgICAgICAgIGlmICghaXNMaW5lKGNtLCBpZHgubG4pKSB7XG4gICAgICAgICAgICBpZHgubGluZSA9IG51bGw7XG4gICAgICAgICAgICBpZHgubG4gPSBudWxsO1xuICAgICAgICAgICAgaWR4LnBvcyA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlkeC5saW5lID0gY20uZ2V0TGluZShpZHgubG4pO1xuICAgICAgICAgIGlkeC5wb3MgPSAoaWR4LmRpciA+IDApID8gMCA6IGlkeC5saW5lLmxlbmd0aCAtIDE7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWR4LnBvcyArPSBpZHguZGlyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8qXG4gICAgICAgIFBlcmZvcm1zIG9uZSBpdGVyYXRpb24gb2YgdHJhdmVyc2FsIGluIGZvcndhcmQgZGlyZWN0aW9uXG4gICAgICAgIFJldHVybnMgYW4gaW5kZXggb2JqZWN0IG9mIHRoZSBuZXcgbG9jYXRpb25cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gZm9yd2FyZChjbSwgbG4sIHBvcywgZGlyKSB7XG4gICAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShsbik7XG4gICAgICAgIHZhciBzdG9wID0gKGxpbmUgPT09IFwiXCIpO1xuXG4gICAgICAgIHZhciBjdXJyID0ge1xuICAgICAgICAgIGxpbmU6IGxpbmUsXG4gICAgICAgICAgbG46IGxuLFxuICAgICAgICAgIHBvczogcG9zLFxuICAgICAgICAgIGRpcjogZGlyLFxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxhc3RfdmFsaWQgPSB7XG4gICAgICAgICAgbG46IGN1cnIubG4sXG4gICAgICAgICAgcG9zOiBjdXJyLnBvcyxcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBza2lwX2VtcHR5X2xpbmVzID0gKGN1cnIubGluZSA9PT0gXCJcIik7XG5cbiAgICAgICAgLy8gTW92ZSBvbmUgc3RlcCB0byBza2lwIGNoYXJhY3RlciB3ZSBzdGFydCBvblxuICAgICAgICBuZXh0Q2hhcihjbSwgY3Vycik7XG5cbiAgICAgICAgd2hpbGUgKGN1cnIubGluZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGxhc3RfdmFsaWQubG4gPSBjdXJyLmxuO1xuICAgICAgICAgIGxhc3RfdmFsaWQucG9zID0gY3Vyci5wb3M7XG5cbiAgICAgICAgICBpZiAoY3Vyci5saW5lID09PSBcIlwiICYmICFza2lwX2VtcHR5X2xpbmVzKSB7XG4gICAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBjdXJyLnBvcywgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoc3RvcCAmJiBjdXJyLmxpbmUgIT09IFwiXCIgJiYgIWlzV2hpdGVTcGFjZVN0cmluZyhjdXJyLmxpbmVbY3Vyci5wb3NdKSkge1xuICAgICAgICAgICAgcmV0dXJuIHsgbG46IGN1cnIubG4sIHBvczogY3Vyci5wb3MsIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGlzRW5kT2ZTZW50ZW5jZVN5bWJvbChjdXJyLmxpbmVbY3Vyci5wb3NdKVxuICAgICAgICAgICAgJiYgIXN0b3BcbiAgICAgICAgICAgICYmIChjdXJyLnBvcyA9PT0gY3Vyci5saW5lLmxlbmd0aCAtIDFcbiAgICAgICAgICAgICAgfHwgaXNXaGl0ZVNwYWNlU3RyaW5nKGN1cnIubGluZVtjdXJyLnBvcyArIDFdKSkpIHtcbiAgICAgICAgICAgIHN0b3AgPSB0cnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHRDaGFyKGNtLCBjdXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgU2V0IHRoZSBwb3NpdGlvbiB0byB0aGUgbGFzdCBub24gd2hpdGVzcGFjZSBjaGFyYWN0ZXIgb24gdGhlIGxhc3RcbiAgICAgICAgICB2YWxpZCBsaW5lIGluIHRoZSBjYXNlIHRoYXQgd2UgcmVhY2ggdGhlIGVuZCBvZiB0aGUgZG9jdW1lbnQuXG4gICAgICAgICovXG4gICAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShsYXN0X3ZhbGlkLmxuKTtcbiAgICAgICAgbGFzdF92YWxpZC5wb3MgPSAwO1xuICAgICAgICBmb3IodmFyIGkgPSBsaW5lLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgaWYgKCFpc1doaXRlU3BhY2VTdHJpbmcobGluZVtpXSkpIHtcbiAgICAgICAgICAgIGxhc3RfdmFsaWQucG9zID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBsYXN0X3ZhbGlkO1xuXG4gICAgICB9XG5cbiAgICAgIC8qXG4gICAgICAgIFBlcmZvcm1zIG9uZSBpdGVyYXRpb24gb2YgdHJhdmVyc2FsIGluIHJldmVyc2UgZGlyZWN0aW9uXG4gICAgICAgIFJldHVybnMgYW4gaW5kZXggb2JqZWN0IG9mIHRoZSBuZXcgbG9jYXRpb25cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gcmV2ZXJzZShjbSwgbG4sIHBvcywgZGlyKSB7XG4gICAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShsbik7XG5cbiAgICAgICAgdmFyIGN1cnIgPSB7XG4gICAgICAgICAgbGluZTogbGluZSxcbiAgICAgICAgICBsbjogbG4sXG4gICAgICAgICAgcG9zOiBwb3MsXG4gICAgICAgICAgZGlyOiBkaXIsXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGFzdF92YWxpZCA9IHtcbiAgICAgICAgICBsbjogY3Vyci5sbixcbiAgICAgICAgICBwb3M6IG51bGwsXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHNraXBfZW1wdHlfbGluZXMgPSAoY3Vyci5saW5lID09PSBcIlwiKTtcblxuICAgICAgICAvLyBNb3ZlIG9uZSBzdGVwIHRvIHNraXAgY2hhcmFjdGVyIHdlIHN0YXJ0IG9uXG4gICAgICAgIG5leHRDaGFyKGNtLCBjdXJyKTtcblxuICAgICAgICB3aGlsZSAoY3Vyci5saW5lICE9PSBudWxsKSB7XG5cbiAgICAgICAgICBpZiAoY3Vyci5saW5lID09PSBcIlwiICYmICFza2lwX2VtcHR5X2xpbmVzKSB7XG4gICAgICAgICAgICBpZiAobGFzdF92YWxpZC5wb3MgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGxhc3RfdmFsaWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHsgbG46IGN1cnIubG4sIHBvczogY3Vyci5wb3MgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoaXNFbmRPZlNlbnRlbmNlU3ltYm9sKGN1cnIubGluZVtjdXJyLnBvc10pXG4gICAgICAgICAgICAgICYmIGxhc3RfdmFsaWQucG9zICE9PSBudWxsXG4gICAgICAgICAgICAgICYmICEoY3Vyci5sbiA9PT0gbGFzdF92YWxpZC5sbiAmJiBjdXJyLnBvcyArIDEgPT09IGxhc3RfdmFsaWQucG9zKSkge1xuICAgICAgICAgICAgcmV0dXJuIGxhc3RfdmFsaWQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGN1cnIubGluZSAhPT0gXCJcIiAmJiAhaXNXaGl0ZVNwYWNlU3RyaW5nKGN1cnIubGluZVtjdXJyLnBvc10pKSB7XG4gICAgICAgICAgICBza2lwX2VtcHR5X2xpbmVzID0gZmFsc2U7XG4gICAgICAgICAgICBsYXN0X3ZhbGlkID0geyBsbjogY3Vyci5sbiwgcG9zOiBjdXJyLnBvcyB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbmV4dENoYXIoY20sIGN1cnIpO1xuICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgICBTZXQgdGhlIHBvc2l0aW9uIHRvIHRoZSBmaXJzdCBub24gd2hpdGVzcGFjZSBjaGFyYWN0ZXIgb24gdGhlIGxhc3RcbiAgICAgICAgICB2YWxpZCBsaW5lIGluIHRoZSBjYXNlIHRoYXQgd2UgcmVhY2ggdGhlIGJlZ2lubmluZyBvZiB0aGUgZG9jdW1lbnQuXG4gICAgICAgICovXG4gICAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShsYXN0X3ZhbGlkLmxuKTtcbiAgICAgICAgbGFzdF92YWxpZC5wb3MgPSAwO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGluZS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIGlmICghaXNXaGl0ZVNwYWNlU3RyaW5nKGxpbmVbaV0pKSB7XG4gICAgICAgICAgICBsYXN0X3ZhbGlkLnBvcyA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxhc3RfdmFsaWQ7XG4gICAgICB9XG5cbiAgICAgIHZhciBjdXJyX2luZGV4ID0ge1xuICAgICAgICBsbjogY3VyLmxpbmUsXG4gICAgICAgIHBvczogY3VyLmNoLFxuICAgICAgfTtcblxuICAgICAgd2hpbGUgKHJlcGVhdCA+IDApIHtcbiAgICAgICAgaWYgKGRpciA8IDApIHtcbiAgICAgICAgICBjdXJyX2luZGV4ID0gcmV2ZXJzZShjbSwgY3Vycl9pbmRleC5sbiwgY3Vycl9pbmRleC5wb3MsIGRpcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY3Vycl9pbmRleCA9IGZvcndhcmQoY20sIGN1cnJfaW5kZXgubG4sIGN1cnJfaW5kZXgucG9zLCBkaXIpO1xuICAgICAgICB9XG4gICAgICAgIHJlcGVhdC0tO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFBvcyhjdXJyX2luZGV4LmxuLCBjdXJyX2luZGV4LnBvcyk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogcGVyaGFwcyB0aGlzIGZpbmFnbGluZyBvZiBzdGFydCBhbmQgZW5kIHBvc2l0aW9ucyBiZWxvbmdzXG4gICAgLy8gaW4gY29kZW1pcnJvci9yZXBsYWNlUmFuZ2U/XG4gICAgZnVuY3Rpb24gc2VsZWN0Q29tcGFuaW9uT2JqZWN0KGNtLCBoZWFkLCBzeW1iLCBpbmNsdXNpdmUpIHtcbiAgICAgIHZhciBjdXIgPSBoZWFkLCBzdGFydCwgZW5kO1xuXG4gICAgICB2YXIgYnJhY2tldFJlZ2V4cCA9ICh7XG4gICAgICAgICcoJzogL1soKV0vLCAnKSc6IC9bKCldLyxcbiAgICAgICAgJ1snOiAvW1tcXF1dLywgJ10nOiAvW1tcXF1dLyxcbiAgICAgICAgJ3snOiAvW3t9XS8sICd9JzogL1t7fV0vLFxuICAgICAgICAnPCc6IC9bPD5dLywgJz4nOiAvWzw+XS99KVtzeW1iXTtcbiAgICAgIHZhciBvcGVuU3ltID0gKHtcbiAgICAgICAgJygnOiAnKCcsICcpJzogJygnLFxuICAgICAgICAnWyc6ICdbJywgJ10nOiAnWycsXG4gICAgICAgICd7JzogJ3snLCAnfSc6ICd7JyxcbiAgICAgICAgJzwnOiAnPCcsICc+JzogJzwnfSlbc3ltYl07XG4gICAgICB2YXIgY3VyQ2hhciA9IGNtLmdldExpbmUoY3VyLmxpbmUpLmNoYXJBdChjdXIuY2gpO1xuICAgICAgLy8gRHVlIHRvIHRoZSBiZWhhdmlvciBvZiBzY2FuRm9yQnJhY2tldCwgd2UgbmVlZCB0byBhZGQgYW4gb2Zmc2V0IGlmIHRoZVxuICAgICAgLy8gY3Vyc29yIGlzIG9uIGEgbWF0Y2hpbmcgb3BlbiBicmFja2V0LlxuICAgICAgdmFyIG9mZnNldCA9IGN1ckNoYXIgPT09IG9wZW5TeW0gPyAxIDogMDtcblxuICAgICAgc3RhcnQgPSBjbS5zY2FuRm9yQnJhY2tldChuZXcgUG9zKGN1ci5saW5lLCBjdXIuY2ggKyBvZmZzZXQpLCAtMSwgdW5kZWZpbmVkLCB7J2JyYWNrZXRSZWdleCc6IGJyYWNrZXRSZWdleHB9KTtcbiAgICAgIGVuZCA9IGNtLnNjYW5Gb3JCcmFja2V0KG5ldyBQb3MoY3VyLmxpbmUsIGN1ci5jaCArIG9mZnNldCksIDEsIHVuZGVmaW5lZCwgeydicmFja2V0UmVnZXgnOiBicmFja2V0UmVnZXhwfSk7XG5cbiAgICAgIGlmICghc3RhcnQgfHwgIWVuZCkge1xuICAgICAgICByZXR1cm4geyBzdGFydDogY3VyLCBlbmQ6IGN1ciB9O1xuICAgICAgfVxuXG4gICAgICBzdGFydCA9IHN0YXJ0LnBvcztcbiAgICAgIGVuZCA9IGVuZC5wb3M7XG5cbiAgICAgIGlmICgoc3RhcnQubGluZSA9PSBlbmQubGluZSAmJiBzdGFydC5jaCA+IGVuZC5jaClcbiAgICAgICAgICB8fCAoc3RhcnQubGluZSA+IGVuZC5saW5lKSkge1xuICAgICAgICB2YXIgdG1wID0gc3RhcnQ7XG4gICAgICAgIHN0YXJ0ID0gZW5kO1xuICAgICAgICBlbmQgPSB0bXA7XG4gICAgICB9XG5cbiAgICAgIGlmIChpbmNsdXNpdmUpIHtcbiAgICAgICAgZW5kLmNoICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGFydC5jaCArPSAxO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4geyBzdGFydDogc3RhcnQsIGVuZDogZW5kIH07XG4gICAgfVxuXG4gICAgLy8gVGFrZXMgaW4gYSBzeW1ib2wgYW5kIGEgY3Vyc29yIGFuZCB0cmllcyB0byBzaW11bGF0ZSB0ZXh0IG9iamVjdHMgdGhhdFxuICAgIC8vIGhhdmUgaWRlbnRpY2FsIG9wZW5pbmcgYW5kIGNsb3Npbmcgc3ltYm9sc1xuICAgIC8vIFRPRE8gc3VwcG9ydCBhY3Jvc3MgbXVsdGlwbGUgbGluZXNcbiAgICBmdW5jdGlvbiBmaW5kQmVnaW5uaW5nQW5kRW5kKGNtLCBoZWFkLCBzeW1iLCBpbmNsdXNpdmUpIHtcbiAgICAgIHZhciBjdXIgPSBjb3B5Q3Vyc29yKGhlYWQpO1xuICAgICAgdmFyIGxpbmUgPSBjbS5nZXRMaW5lKGN1ci5saW5lKTtcbiAgICAgIHZhciBjaGFycyA9IGxpbmUuc3BsaXQoJycpO1xuICAgICAgdmFyIHN0YXJ0LCBlbmQsIGksIGxlbjtcbiAgICAgIHZhciBmaXJzdEluZGV4ID0gY2hhcnMuaW5kZXhPZihzeW1iKTtcblxuICAgICAgLy8gdGhlIGRlY2lzaW9uIHRyZWUgaXMgdG8gYWx3YXlzIGxvb2sgYmFja3dhcmRzIGZvciB0aGUgYmVnaW5uaW5nIGZpcnN0LFxuICAgICAgLy8gYnV0IGlmIHRoZSBjdXJzb3IgaXMgaW4gZnJvbnQgb2YgdGhlIGZpcnN0IGluc3RhbmNlIG9mIHRoZSBzeW1iLFxuICAgICAgLy8gdGhlbiBtb3ZlIHRoZSBjdXJzb3IgZm9yd2FyZFxuICAgICAgaWYgKGN1ci5jaCA8IGZpcnN0SW5kZXgpIHtcbiAgICAgICAgY3VyLmNoID0gZmlyc3RJbmRleDtcbiAgICAgICAgLy8gV2h5IGlzIHRoaXMgbGluZSBldmVuIGhlcmU/Pz9cbiAgICAgICAgLy8gY20uc2V0Q3Vyc29yKGN1ci5saW5lLCBmaXJzdEluZGV4KzEpO1xuICAgICAgfVxuICAgICAgLy8gb3RoZXJ3aXNlIGlmIHRoZSBjdXJzb3IgaXMgY3VycmVudGx5IG9uIHRoZSBjbG9zaW5nIHN5bWJvbFxuICAgICAgZWxzZSBpZiAoZmlyc3RJbmRleCA8IGN1ci5jaCAmJiBjaGFyc1tjdXIuY2hdID09IHN5bWIpIHtcbiAgICAgICAgZW5kID0gY3VyLmNoOyAvLyBhc3NpZ24gZW5kIHRvIHRoZSBjdXJyZW50IGN1cnNvclxuICAgICAgICAtLWN1ci5jaDsgLy8gbWFrZSBzdXJlIHRvIGxvb2sgYmFja3dhcmRzXG4gICAgICB9XG5cbiAgICAgIC8vIGlmIHdlJ3JlIGN1cnJlbnRseSBvbiB0aGUgc3ltYm9sLCB3ZSd2ZSBnb3QgYSBzdGFydFxuICAgICAgaWYgKGNoYXJzW2N1ci5jaF0gPT0gc3ltYiAmJiAhZW5kKSB7XG4gICAgICAgIHN0YXJ0ID0gY3VyLmNoICsgMTsgLy8gYXNzaWduIHN0YXJ0IHRvIGFoZWFkIG9mIHRoZSBjdXJzb3JcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGdvIGJhY2t3YXJkcyB0byBmaW5kIHRoZSBzdGFydFxuICAgICAgICBmb3IgKGkgPSBjdXIuY2g7IGkgPiAtMSAmJiAhc3RhcnQ7IGktLSkge1xuICAgICAgICAgIGlmIChjaGFyc1tpXSA9PSBzeW1iKSB7XG4gICAgICAgICAgICBzdGFydCA9IGkgKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBsb29rIGZvcndhcmRzIGZvciB0aGUgZW5kIHN5bWJvbFxuICAgICAgaWYgKHN0YXJ0ICYmICFlbmQpIHtcbiAgICAgICAgZm9yIChpID0gc3RhcnQsIGxlbiA9IGNoYXJzLmxlbmd0aDsgaSA8IGxlbiAmJiAhZW5kOyBpKyspIHtcbiAgICAgICAgICBpZiAoY2hhcnNbaV0gPT0gc3ltYikge1xuICAgICAgICAgICAgZW5kID0gaTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gbm90aGluZyBmb3VuZFxuICAgICAgaWYgKCFzdGFydCB8fCAhZW5kKSB7XG4gICAgICAgIHJldHVybiB7IHN0YXJ0OiBjdXIsIGVuZDogY3VyIH07XG4gICAgICB9XG5cbiAgICAgIC8vIGluY2x1ZGUgdGhlIHN5bWJvbHNcbiAgICAgIGlmIChpbmNsdXNpdmUpIHtcbiAgICAgICAgLS1zdGFydDsgKytlbmQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBuZXcgUG9zKGN1ci5saW5lLCBzdGFydCksXG4gICAgICAgIGVuZDogbmV3IFBvcyhjdXIubGluZSwgZW5kKVxuICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBTZWFyY2ggZnVuY3Rpb25zXG4gICAgZGVmaW5lT3B0aW9uKCdwY3JlJywgdHJ1ZSwgJ2Jvb2xlYW4nKTtcbiAgICBmdW5jdGlvbiBTZWFyY2hTdGF0ZSgpIHt9XG4gICAgU2VhcmNoU3RhdGUucHJvdG90eXBlID0ge1xuICAgICAgZ2V0UXVlcnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmltR2xvYmFsU3RhdGUucXVlcnk7XG4gICAgICB9LFxuICAgICAgc2V0UXVlcnk6IGZ1bmN0aW9uKHF1ZXJ5KSB7XG4gICAgICAgIHZpbUdsb2JhbFN0YXRlLnF1ZXJ5ID0gcXVlcnk7XG4gICAgICB9LFxuICAgICAgZ2V0T3ZlcmxheTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlYXJjaE92ZXJsYXk7XG4gICAgICB9LFxuICAgICAgc2V0T3ZlcmxheTogZnVuY3Rpb24ob3ZlcmxheSkge1xuICAgICAgICB0aGlzLnNlYXJjaE92ZXJsYXkgPSBvdmVybGF5O1xuICAgICAgfSxcbiAgICAgIGlzUmV2ZXJzZWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdmltR2xvYmFsU3RhdGUuaXNSZXZlcnNlZDtcbiAgICAgIH0sXG4gICAgICBzZXRSZXZlcnNlZDogZnVuY3Rpb24ocmV2ZXJzZWQpIHtcbiAgICAgICAgdmltR2xvYmFsU3RhdGUuaXNSZXZlcnNlZCA9IHJldmVyc2VkO1xuICAgICAgfSxcbiAgICAgIGdldFNjcm9sbGJhckFubm90YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYW5ub3RhdGU7XG4gICAgICB9LFxuICAgICAgc2V0U2Nyb2xsYmFyQW5ub3RhdGU6IGZ1bmN0aW9uKGFubm90YXRlKSB7XG4gICAgICAgIHRoaXMuYW5ub3RhdGUgPSBhbm5vdGF0ZTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGZ1bmN0aW9uIGdldFNlYXJjaFN0YXRlKGNtKSB7XG4gICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgcmV0dXJuIHZpbS5zZWFyY2hTdGF0ZV8gfHwgKHZpbS5zZWFyY2hTdGF0ZV8gPSBuZXcgU2VhcmNoU3RhdGUoKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNwbGl0QnlTbGFzaChhcmdTdHJpbmcpIHtcbiAgICAgIHJldHVybiBzcGxpdEJ5U2VwYXJhdG9yKGFyZ1N0cmluZywgJy8nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kVW5lc2NhcGVkU2xhc2hlcyhhcmdTdHJpbmcpIHtcbiAgICAgIHJldHVybiBmaW5kVW5lc2NhcGVkU2VwYXJhdG9ycyhhcmdTdHJpbmcsICcvJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3BsaXRCeVNlcGFyYXRvcihhcmdTdHJpbmcsIHNlcGFyYXRvcikge1xuICAgICAgdmFyIHNsYXNoZXMgPSBmaW5kVW5lc2NhcGVkU2VwYXJhdG9ycyhhcmdTdHJpbmcsIHNlcGFyYXRvcikgfHwgW107XG4gICAgICBpZiAoIXNsYXNoZXMubGVuZ3RoKSByZXR1cm4gW107XG4gICAgICB2YXIgdG9rZW5zID0gW107XG4gICAgICAvLyBpbiBjYXNlIG9mIHN0cmluZ3MgbGlrZSBmb28vYmFyXG4gICAgICBpZiAoc2xhc2hlc1swXSAhPT0gMCkgcmV0dXJuO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGFzaGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2xhc2hlc1tpXSA9PSAnbnVtYmVyJylcbiAgICAgICAgICB0b2tlbnMucHVzaChhcmdTdHJpbmcuc3Vic3RyaW5nKHNsYXNoZXNbaV0gKyAxLCBzbGFzaGVzW2krMV0pKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b2tlbnM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluZFVuZXNjYXBlZFNlcGFyYXRvcnMoc3RyLCBzZXBhcmF0b3IpIHtcbiAgICAgIGlmICghc2VwYXJhdG9yKVxuICAgICAgICBzZXBhcmF0b3IgPSAnLyc7XG5cbiAgICAgIHZhciBlc2NhcGVOZXh0Q2hhciA9IGZhbHNlO1xuICAgICAgdmFyIHNsYXNoZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjID0gc3RyLmNoYXJBdChpKTtcbiAgICAgICAgaWYgKCFlc2NhcGVOZXh0Q2hhciAmJiBjID09IHNlcGFyYXRvcikge1xuICAgICAgICAgIHNsYXNoZXMucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICBlc2NhcGVOZXh0Q2hhciA9ICFlc2NhcGVOZXh0Q2hhciAmJiAoYyA9PSAnXFxcXCcpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNsYXNoZXM7XG4gICAgfVxuXG4gICAgLy8gVHJhbnNsYXRlcyBhIHNlYXJjaCBzdHJpbmcgZnJvbSBleCAodmltKSBzeW50YXggaW50byBqYXZhc2NyaXB0IGZvcm0uXG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlUmVnZXgoc3RyKSB7XG4gICAgICAvLyBXaGVuIHRoZXNlIG1hdGNoLCBhZGQgYSAnXFwnIGlmIHVuZXNjYXBlZCBvciByZW1vdmUgb25lIGlmIGVzY2FwZWQuXG4gICAgICB2YXIgc3BlY2lhbHMgPSAnfCgpeyc7XG4gICAgICAvLyBSZW1vdmUsIGJ1dCBuZXZlciBhZGQsIGEgJ1xcJyBmb3IgdGhlc2UuXG4gICAgICB2YXIgdW5lc2NhcGUgPSAnfSc7XG4gICAgICB2YXIgZXNjYXBlTmV4dENoYXIgPSBmYWxzZTtcbiAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAtMTsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQXQoaSkgfHwgJyc7XG4gICAgICAgIHZhciBuID0gc3RyLmNoYXJBdChpKzEpIHx8ICcnO1xuICAgICAgICB2YXIgc3BlY2lhbENvbWVzTmV4dCA9IChuICYmIHNwZWNpYWxzLmluZGV4T2YobikgIT0gLTEpO1xuICAgICAgICBpZiAoZXNjYXBlTmV4dENoYXIpIHtcbiAgICAgICAgICBpZiAoYyAhPT0gJ1xcXFwnIHx8ICFzcGVjaWFsQ29tZXNOZXh0KSB7XG4gICAgICAgICAgICBvdXQucHVzaChjKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXNjYXBlTmV4dENoYXIgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoYyA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICBlc2NhcGVOZXh0Q2hhciA9IHRydWU7XG4gICAgICAgICAgICAvLyBUcmVhdCB0aGUgdW5lc2NhcGUgbGlzdCBhcyBzcGVjaWFsIGZvciByZW1vdmluZywgYnV0IG5vdCBhZGRpbmcgJ1xcJy5cbiAgICAgICAgICAgIGlmIChuICYmIHVuZXNjYXBlLmluZGV4T2YobikgIT0gLTEpIHtcbiAgICAgICAgICAgICAgc3BlY2lhbENvbWVzTmV4dCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBOb3QgcGFzc2luZyB0aGlzIHRlc3QgbWVhbnMgcmVtb3ZpbmcgYSAnXFwnLlxuICAgICAgICAgICAgaWYgKCFzcGVjaWFsQ29tZXNOZXh0IHx8IG4gPT09ICdcXFxcJykge1xuICAgICAgICAgICAgICBvdXQucHVzaChjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3V0LnB1c2goYyk7XG4gICAgICAgICAgICBpZiAoc3BlY2lhbENvbWVzTmV4dCAmJiBuICE9PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgb3V0LnB1c2goJ1xcXFwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXQuam9pbignJyk7XG4gICAgfVxuXG4gICAgLy8gVHJhbnNsYXRlcyB0aGUgcmVwbGFjZSBwYXJ0IG9mIGEgc2VhcmNoIGFuZCByZXBsYWNlIGZyb20gZXggKHZpbSkgc3ludGF4IGludG9cbiAgICAvLyBqYXZhc2NyaXB0IGZvcm0uICBTaW1pbGFyIHRvIHRyYW5zbGF0ZVJlZ2V4LCBidXQgYWRkaXRpb25hbGx5IGZpeGVzIGJhY2sgcmVmZXJlbmNlc1xuICAgIC8vICh0cmFuc2xhdGVzICdcXFswLi45XScgdG8gJyRbMC4uOV0nKSBhbmQgZm9sbG93cyBkaWZmZXJlbnQgcnVsZXMgZm9yIGVzY2FwaW5nICckJy5cbiAgICB2YXIgY2hhclVuZXNjYXBlcyA9IHsnXFxcXG4nOiAnXFxuJywgJ1xcXFxyJzogJ1xccicsICdcXFxcdCc6ICdcXHQnfTtcbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVSZWdleFJlcGxhY2Uoc3RyKSB7XG4gICAgICB2YXIgZXNjYXBlTmV4dENoYXIgPSBmYWxzZTtcbiAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAtMTsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQXQoaSkgfHwgJyc7XG4gICAgICAgIHZhciBuID0gc3RyLmNoYXJBdChpKzEpIHx8ICcnO1xuICAgICAgICBpZiAoY2hhclVuZXNjYXBlc1tjICsgbl0pIHtcbiAgICAgICAgICBvdXQucHVzaChjaGFyVW5lc2NhcGVzW2Mrbl0pO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfSBlbHNlIGlmIChlc2NhcGVOZXh0Q2hhcikge1xuICAgICAgICAgIC8vIEF0IGFueSBwb2ludCBpbiB0aGUgbG9vcCwgZXNjYXBlTmV4dENoYXIgaXMgdHJ1ZSBpZiB0aGUgcHJldmlvdXNcbiAgICAgICAgICAvLyBjaGFyYWN0ZXIgd2FzIGEgJ1xcJyBhbmQgd2FzIG5vdCBlc2NhcGVkLlxuICAgICAgICAgIG91dC5wdXNoKGMpO1xuICAgICAgICAgIGVzY2FwZU5leHRDaGFyID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGMgPT09ICdcXFxcJykge1xuICAgICAgICAgICAgZXNjYXBlTmV4dENoYXIgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKChpc051bWJlcihuKSB8fCBuID09PSAnJCcpKSB7XG4gICAgICAgICAgICAgIG91dC5wdXNoKCckJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gIT09ICcvJyAmJiBuICE9PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgb3V0LnB1c2goJ1xcXFwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGMgPT09ICckJykge1xuICAgICAgICAgICAgICBvdXQucHVzaCgnJCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0LnB1c2goYyk7XG4gICAgICAgICAgICBpZiAobiA9PT0gJy8nKSB7XG4gICAgICAgICAgICAgIG91dC5wdXNoKCdcXFxcJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0LmpvaW4oJycpO1xuICAgIH1cblxuICAgIC8vIFVuZXNjYXBlIFxcIGFuZCAvIGluIHRoZSByZXBsYWNlIHBhcnQsIGZvciBQQ1JFIG1vZGUuXG4gICAgdmFyIHVuZXNjYXBlcyA9IHsnXFxcXC8nOiAnLycsICdcXFxcXFxcXCc6ICdcXFxcJywgJ1xcXFxuJzogJ1xcbicsICdcXFxccic6ICdcXHInLCAnXFxcXHQnOiAnXFx0JywgJ1xcXFwmJzonJid9O1xuICAgIGZ1bmN0aW9uIHVuZXNjYXBlUmVnZXhSZXBsYWNlKHN0cikge1xuICAgICAgdmFyIHN0cmVhbSA9IG5ldyBDb2RlTWlycm9yLlN0cmluZ1N0cmVhbShzdHIpO1xuICAgICAgdmFyIG91dHB1dCA9IFtdO1xuICAgICAgd2hpbGUgKCFzdHJlYW0uZW9sKCkpIHtcbiAgICAgICAgLy8gU2VhcmNoIGZvciBcXC5cbiAgICAgICAgd2hpbGUgKHN0cmVhbS5wZWVrKCkgJiYgc3RyZWFtLnBlZWsoKSAhPSAnXFxcXCcpIHtcbiAgICAgICAgICBvdXRwdXQucHVzaChzdHJlYW0ubmV4dCgpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWF0Y2hlZCA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBtYXRjaGVyIGluIHVuZXNjYXBlcykge1xuICAgICAgICAgIGlmIChzdHJlYW0ubWF0Y2gobWF0Y2hlciwgdHJ1ZSkpIHtcbiAgICAgICAgICAgIG1hdGNoZWQgPSB0cnVlO1xuICAgICAgICAgICAgb3V0cHV0LnB1c2godW5lc2NhcGVzW21hdGNoZXJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIW1hdGNoZWQpIHtcbiAgICAgICAgICAvLyBEb24ndCBjaGFuZ2UgYW55dGhpbmdcbiAgICAgICAgICBvdXRwdXQucHVzaChzdHJlYW0ubmV4dCgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG91dHB1dC5qb2luKCcnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFeHRyYWN0IHRoZSByZWd1bGFyIGV4cHJlc3Npb24gZnJvbSB0aGUgcXVlcnkgYW5kIHJldHVybiBhIFJlZ2V4cCBvYmplY3QuXG4gICAgICogUmV0dXJucyBudWxsIGlmIHRoZSBxdWVyeSBpcyBibGFuay5cbiAgICAgKiBJZiBpZ25vcmVDYXNlIGlzIHBhc3NlZCBpbiwgdGhlIFJlZ2V4cCBvYmplY3Qgd2lsbCBoYXZlIHRoZSAnaScgZmxhZyBzZXQuXG4gICAgICogSWYgc21hcnRDYXNlIGlzIHBhc3NlZCBpbiwgYW5kIHRoZSBxdWVyeSBjb250YWlucyB1cHBlciBjYXNlIGxldHRlcnMsXG4gICAgICogICB0aGVuIGlnbm9yZUNhc2UgaXMgb3ZlcnJpZGRlbiwgYW5kIHRoZSAnaScgZmxhZyB3aWxsIG5vdCBiZSBzZXQuXG4gICAgICogSWYgdGhlIHF1ZXJ5IGNvbnRhaW5zIHRoZSAvaSBpbiB0aGUgZmxhZyBwYXJ0IG9mIHRoZSByZWd1bGFyIGV4cHJlc3Npb24sXG4gICAgICogICB0aGVuIGJvdGggaWdub3JlQ2FzZSBhbmQgc21hcnRDYXNlIGFyZSBpZ25vcmVkLCBhbmQgJ2knIHdpbGwgYmUgcGFzc2VkXG4gICAgICogICB0aHJvdWdoIHRvIHRoZSBSZWdleCBvYmplY3QuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcGFyc2VRdWVyeShxdWVyeSwgaWdub3JlQ2FzZSwgc21hcnRDYXNlKSB7XG4gICAgICAvLyBGaXJzdCB1cGRhdGUgdGhlIGxhc3Qgc2VhcmNoIHJlZ2lzdGVyXG4gICAgICB2YXIgbGFzdFNlYXJjaFJlZ2lzdGVyID0gdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmdldFJlZ2lzdGVyKCcvJyk7XG4gICAgICBsYXN0U2VhcmNoUmVnaXN0ZXIuc2V0VGV4dChxdWVyeSk7XG4gICAgICAvLyBDaGVjayBpZiB0aGUgcXVlcnkgaXMgYWxyZWFkeSBhIHJlZ2V4LlxuICAgICAgaWYgKHF1ZXJ5IGluc3RhbmNlb2YgUmVnRXhwKSB7IHJldHVybiBxdWVyeTsgfVxuICAgICAgLy8gRmlyc3QgdHJ5IHRvIGV4dHJhY3QgcmVnZXggKyBmbGFncyBmcm9tIHRoZSBpbnB1dC4gSWYgbm8gZmxhZ3MgZm91bmQsXG4gICAgICAvLyBleHRyYWN0IGp1c3QgdGhlIHJlZ2V4LiBJRSBkb2VzIG5vdCBhY2NlcHQgZmxhZ3MgZGlyZWN0bHkgZGVmaW5lZCBpblxuICAgICAgLy8gdGhlIHJlZ2V4IHN0cmluZyBpbiB0aGUgZm9ybSAvcmVnZXgvZmxhZ3NcbiAgICAgIHZhciBzbGFzaGVzID0gZmluZFVuZXNjYXBlZFNsYXNoZXMocXVlcnkpO1xuICAgICAgdmFyIHJlZ2V4UGFydDtcbiAgICAgIHZhciBmb3JjZUlnbm9yZUNhc2U7XG4gICAgICBpZiAoIXNsYXNoZXMubGVuZ3RoKSB7XG4gICAgICAgIC8vIFF1ZXJ5IGxvb2tzIGxpa2UgJ3JlZ2V4cCdcbiAgICAgICAgcmVnZXhQYXJ0ID0gcXVlcnk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBRdWVyeSBsb29rcyBsaWtlICdyZWdleHAvLi4uJ1xuICAgICAgICByZWdleFBhcnQgPSBxdWVyeS5zdWJzdHJpbmcoMCwgc2xhc2hlc1swXSk7XG4gICAgICAgIHZhciBmbGFnc1BhcnQgPSBxdWVyeS5zdWJzdHJpbmcoc2xhc2hlc1swXSk7XG4gICAgICAgIGZvcmNlSWdub3JlQ2FzZSA9IChmbGFnc1BhcnQuaW5kZXhPZignaScpICE9IC0xKTtcbiAgICAgIH1cbiAgICAgIGlmICghcmVnZXhQYXJ0KSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgaWYgKCFnZXRPcHRpb24oJ3BjcmUnKSkge1xuICAgICAgICByZWdleFBhcnQgPSB0cmFuc2xhdGVSZWdleChyZWdleFBhcnQpO1xuICAgICAgfVxuICAgICAgaWYgKHNtYXJ0Q2FzZSkge1xuICAgICAgICBpZ25vcmVDYXNlID0gKC9eW15BLVpdKiQvKS50ZXN0KHJlZ2V4UGFydCk7XG4gICAgICB9XG4gICAgICB2YXIgcmVnZXhwID0gbmV3IFJlZ0V4cChyZWdleFBhcnQsXG4gICAgICAgICAgKGlnbm9yZUNhc2UgfHwgZm9yY2VJZ25vcmVDYXNlKSA/ICdpbScgOiAnbScpO1xuICAgICAgcmV0dXJuIHJlZ2V4cDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBkb20gLSBEb2N1bWVudCBPYmplY3QgTWFuaXB1bGF0b3JcbiAgICAgKiBVc2FnZTpcbiAgICAgKiAgIGRvbSgnPHRhZz4nfDxub2RlPlssIC4uLns8YXR0cmlidXRlcz58PCRzdHlsZXM+fXw8Y2hpbGQtbm9kZT58Jzx0ZXh0PiddKVxuICAgICAqIEV4YW1wbGVzOlxuICAgICAqICAgZG9tKCdkaXYnLCB7aWQ6J3h5eid9LCBkb20oJ3AnLCAnQ00gcm9ja3MhJywgeyRjb2xvcjoncmVkJ30pKVxuICAgICAqICAgZG9tKGRvY3VtZW50LmhlYWQsIGRvbSgnc2NyaXB0JywgJ2FsZXJ0KFwiaGVsbG8hXCIpJykpXG4gICAgICogTm90IHN1cHBvcnRlZDpcbiAgICAgKiAgIGRvbSgncCcsIFsnYXJyYXlzIGFyZSBvYmplY3RzJ10sIEVycm9yKCdvYmplY3RzIHNwZWNpZnkgYXR0cmlidXRlcycpKVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGRvbShuKSB7XG4gICAgICBpZiAodHlwZW9mIG4gPT09ICdzdHJpbmcnKSBuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChuKTtcbiAgICAgIGZvciAodmFyIGEsIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghKGEgPSBhcmd1bWVudHNbaV0pKSBjb250aW51ZTtcbiAgICAgICAgaWYgKHR5cGVvZiBhICE9PSAnb2JqZWN0JykgYSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGEpO1xuICAgICAgICBpZiAoYS5ub2RlVHlwZSkgbi5hcHBlbmRDaGlsZChhKTtcbiAgICAgICAgZWxzZSBmb3IgKHZhciBrZXkgaW4gYSkge1xuICAgICAgICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGEsIGtleSkpIGNvbnRpbnVlO1xuICAgICAgICAgIGlmIChrZXlbMF0gPT09ICckJykgbi5zdHlsZVtrZXkuc2xpY2UoMSldID0gYVtrZXldO1xuICAgICAgICAgIGVsc2Ugbi5zZXRBdHRyaWJ1dGUoa2V5LCBhW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93Q29uZmlybShjbSwgdGVtcGxhdGUpIHtcbiAgICAgIHZhciBwcmUgPSBkb20oJ2RpdicsIHskY29sb3I6ICdyZWQnLCAkd2hpdGVTcGFjZTogJ3ByZScsIGNsYXNzOiAnY20tdmltLW1lc3NhZ2UnfSwgdGVtcGxhdGUpO1xuICAgICAgaWYgKGNtLm9wZW5Ob3RpZmljYXRpb24pIHtcbiAgICAgICAgY20ub3Blbk5vdGlmaWNhdGlvbihwcmUsIHtib3R0b206IHRydWUsIGR1cmF0aW9uOiA1MDAwfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbGVydChwcmUuaW5uZXJUZXh0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYWtlUHJvbXB0KHByZWZpeCwgZGVzYykge1xuICAgICAgcmV0dXJuIGRvbShkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCksXG4gICAgICAgICAgICAgICBkb20oJ3NwYW4nLCB7JGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCAkd2hpdGVTcGFjZTogJ3ByZSd9LFxuICAgICAgICAgICAgICAgICBwcmVmaXgsXG4gICAgICAgICAgICAgICAgIGRvbSgnaW5wdXQnLCB7dHlwZTogJ3RleHQnLCBhdXRvY29ycmVjdDogJ29mZicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b2NhcGl0YWxpemU6ICdvZmYnLCBzcGVsbGNoZWNrOiAnZmFsc2UnfSkpLFxuICAgICAgICAgICAgICAgZGVzYyAmJiBkb20oJ3NwYW4nLCB7JGNvbG9yOiAnIzg4OCd9LCBkZXNjKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd1Byb21wdChjbSwgb3B0aW9ucykge1xuICAgICAgdmFyIHRlbXBsYXRlID0gbWFrZVByb21wdChvcHRpb25zLnByZWZpeCwgb3B0aW9ucy5kZXNjKTtcbiAgICAgIGlmIChjbS5vcGVuRGlhbG9nKSB7XG4gICAgICAgIGNtLm9wZW5EaWFsb2codGVtcGxhdGUsIG9wdGlvbnMub25DbG9zZSwge1xuICAgICAgICAgIG9uS2V5RG93bjogb3B0aW9ucy5vbktleURvd24sIG9uS2V5VXA6IG9wdGlvbnMub25LZXlVcCxcbiAgICAgICAgICBib3R0b206IHRydWUsIHNlbGVjdFZhbHVlT25PcGVuOiBmYWxzZSwgdmFsdWU6IG9wdGlvbnMudmFsdWVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdmFyIHNob3J0VGV4dCA9ICcnO1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbnMucHJlZml4ICE9IFwic3RyaW5nXCIgJiYgb3B0aW9ucy5wcmVmaXgpIHNob3J0VGV4dCArPSBvcHRpb25zLnByZWZpeC50ZXh0Q29udGVudDtcbiAgICAgICAgaWYgKG9wdGlvbnMuZGVzYykgc2hvcnRUZXh0ICs9IFwiIFwiICsgb3B0aW9ucy5kZXNjO1xuICAgICAgICBvcHRpb25zLm9uQ2xvc2UocHJvbXB0KHNob3J0VGV4dCwgJycpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWdleEVxdWFsKHIxLCByMikge1xuICAgICAgaWYgKHIxIGluc3RhbmNlb2YgUmVnRXhwICYmIHIyIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICAgICAgdmFyIHByb3BzID0gWydnbG9iYWwnLCAnbXVsdGlsaW5lJywgJ2lnbm9yZUNhc2UnLCAnc291cmNlJ107XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgcHJvcCA9IHByb3BzW2ldO1xuICAgICAgICAgICAgICBpZiAocjFbcHJvcF0gIT09IHIyW3Byb3BdKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIC8vIFJldHVybnMgdHJ1ZSBpZiB0aGUgcXVlcnkgaXMgdmFsaWQuXG4gICAgZnVuY3Rpb24gdXBkYXRlU2VhcmNoUXVlcnkoY20sIHJhd1F1ZXJ5LCBpZ25vcmVDYXNlLCBzbWFydENhc2UpIHtcbiAgICAgIGlmICghcmF3UXVlcnkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIHN0YXRlID0gZ2V0U2VhcmNoU3RhdGUoY20pO1xuICAgICAgdmFyIHF1ZXJ5ID0gcGFyc2VRdWVyeShyYXdRdWVyeSwgISFpZ25vcmVDYXNlLCAhIXNtYXJ0Q2FzZSk7XG4gICAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGhpZ2hsaWdodFNlYXJjaE1hdGNoZXMoY20sIHF1ZXJ5KTtcbiAgICAgIGlmIChyZWdleEVxdWFsKHF1ZXJ5LCBzdGF0ZS5nZXRRdWVyeSgpKSkge1xuICAgICAgICByZXR1cm4gcXVlcnk7XG4gICAgICB9XG4gICAgICBzdGF0ZS5zZXRRdWVyeShxdWVyeSk7XG4gICAgICByZXR1cm4gcXVlcnk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNlYXJjaE92ZXJsYXkocXVlcnkpIHtcbiAgICAgIGlmIChxdWVyeS5zb3VyY2UuY2hhckF0KDApID09ICdeJykge1xuICAgICAgICB2YXIgbWF0Y2hTb2wgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW46IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgICAgIGlmIChtYXRjaFNvbCAmJiAhc3RyZWFtLnNvbCgpKSB7XG4gICAgICAgICAgICBzdHJlYW0uc2tpcFRvRW5kKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBtYXRjaCA9IHN0cmVhbS5tYXRjaChxdWVyeSwgZmFsc2UpO1xuICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgaWYgKG1hdGNoWzBdLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgIC8vIE1hdGNoZWQgZW1wdHkgc3RyaW5nLCBza2lwIHRvIG5leHQuXG4gICAgICAgICAgICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgICAgICAgICAgIHJldHVybiAnc2VhcmNoaW5nJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghc3RyZWFtLnNvbCgpKSB7XG4gICAgICAgICAgICAgIC8vIEJhY2t0cmFjayAxIHRvIG1hdGNoIFxcYlxuICAgICAgICAgICAgICBzdHJlYW0uYmFja1VwKDEpO1xuICAgICAgICAgICAgICBpZiAoIXF1ZXJ5LmV4ZWMoc3RyZWFtLm5leHQoKSArIG1hdGNoWzBdKSkge1xuICAgICAgICAgICAgICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN0cmVhbS5tYXRjaChxdWVyeSk7XG4gICAgICAgICAgICByZXR1cm4gJ3NlYXJjaGluZyc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHdoaWxlICghc3RyZWFtLmVvbCgpKSB7XG4gICAgICAgICAgICBzdHJlYW0ubmV4dCgpO1xuICAgICAgICAgICAgaWYgKHN0cmVhbS5tYXRjaChxdWVyeSwgZmFsc2UpKSBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHF1ZXJ5OiBxdWVyeVxuICAgICAgfTtcbiAgICB9XG4gICAgdmFyIGhpZ2hsaWdodFRpbWVvdXQgPSAwO1xuICAgIGZ1bmN0aW9uIGhpZ2hsaWdodFNlYXJjaE1hdGNoZXMoY20sIHF1ZXJ5KSB7XG4gICAgICBjbGVhclRpbWVvdXQoaGlnaGxpZ2h0VGltZW91dCk7XG4gICAgICBoaWdobGlnaHRUaW1lb3V0ID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCFjbS5zdGF0ZS52aW0pIHJldHVybjtcbiAgICAgICAgdmFyIHNlYXJjaFN0YXRlID0gZ2V0U2VhcmNoU3RhdGUoY20pO1xuICAgICAgICB2YXIgb3ZlcmxheSA9IHNlYXJjaFN0YXRlLmdldE92ZXJsYXkoKTtcbiAgICAgICAgaWYgKCFvdmVybGF5IHx8IHF1ZXJ5ICE9IG92ZXJsYXkucXVlcnkpIHtcbiAgICAgICAgICBpZiAob3ZlcmxheSkge1xuICAgICAgICAgICAgY20ucmVtb3ZlT3ZlcmxheShvdmVybGF5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgb3ZlcmxheSA9IHNlYXJjaE92ZXJsYXkocXVlcnkpO1xuICAgICAgICAgIGNtLmFkZE92ZXJsYXkob3ZlcmxheSk7XG4gICAgICAgICAgaWYgKGNtLnNob3dNYXRjaGVzT25TY3JvbGxiYXIpIHtcbiAgICAgICAgICAgIGlmIChzZWFyY2hTdGF0ZS5nZXRTY3JvbGxiYXJBbm5vdGF0ZSgpKSB7XG4gICAgICAgICAgICAgIHNlYXJjaFN0YXRlLmdldFNjcm9sbGJhckFubm90YXRlKCkuY2xlYXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlYXJjaFN0YXRlLnNldFNjcm9sbGJhckFubm90YXRlKGNtLnNob3dNYXRjaGVzT25TY3JvbGxiYXIocXVlcnkpKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2VhcmNoU3RhdGUuc2V0T3ZlcmxheShvdmVybGF5KTtcbiAgICAgICAgfVxuICAgICAgfSwgNTApO1xuICAgIH1cbiAgICBmdW5jdGlvbiBmaW5kTmV4dChjbSwgcHJldiwgcXVlcnksIHJlcGVhdCkge1xuICAgICAgaWYgKHJlcGVhdCA9PT0gdW5kZWZpbmVkKSB7IHJlcGVhdCA9IDE7IH1cbiAgICAgIHJldHVybiBjbS5vcGVyYXRpb24oZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwb3MgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgdmFyIGN1cnNvciA9IGNtLmdldFNlYXJjaEN1cnNvcihxdWVyeSwgcG9zKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXBlYXQ7IGkrKykge1xuICAgICAgICAgIHZhciBmb3VuZCA9IGN1cnNvci5maW5kKHByZXYpO1xuICAgICAgICAgIGlmIChpID09IDAgJiYgZm91bmQgJiYgY3Vyc29yRXF1YWwoY3Vyc29yLmZyb20oKSwgcG9zKSkge1xuICAgICAgICAgICAgdmFyIGxhc3RFbmRQb3MgPSBwcmV2ID8gY3Vyc29yLmZyb20oKSA6IGN1cnNvci50bygpO1xuICAgICAgICAgICAgZm91bmQgPSBjdXJzb3IuZmluZChwcmV2KTtcbiAgICAgICAgICAgIGlmIChmb3VuZCAmJiAhZm91bmRbMF0gJiYgY3Vyc29yRXF1YWwoY3Vyc29yLmZyb20oKSwgbGFzdEVuZFBvcykpIHtcbiAgICAgICAgICAgICAgaWYgKGNtLmdldExpbmUobGFzdEVuZFBvcy5saW5lKS5sZW5ndGggPT0gbGFzdEVuZFBvcy5jaClcbiAgICAgICAgICAgICAgICBmb3VuZCA9IGN1cnNvci5maW5kKHByZXYpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAvLyBTZWFyY2hDdXJzb3IgbWF5IGhhdmUgcmV0dXJuZWQgbnVsbCBiZWNhdXNlIGl0IGhpdCBFT0YsIHdyYXBcbiAgICAgICAgICAgIC8vIGFyb3VuZCBhbmQgdHJ5IGFnYWluLlxuICAgICAgICAgICAgY3Vyc29yID0gY20uZ2V0U2VhcmNoQ3Vyc29yKHF1ZXJ5LFxuICAgICAgICAgICAgICAgIChwcmV2KSA/IG5ldyBQb3MoY20ubGFzdExpbmUoKSkgOiBuZXcgUG9zKGNtLmZpcnN0TGluZSgpLCAwKSApO1xuICAgICAgICAgICAgaWYgKCFjdXJzb3IuZmluZChwcmV2KSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjdXJzb3IuZnJvbSgpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByZXR0eSBtdWNoIHRoZSBzYW1lIGFzIGBmaW5kTmV4dGAsIGV4Y2VwdCBmb3IgdGhlIGZvbGxvd2luZyBkaWZmZXJlbmNlczpcbiAgICAgKlxuICAgICAqIDEuIEJlZm9yZSBzdGFydGluZyB0aGUgc2VhcmNoLCBtb3ZlIHRvIHRoZSBwcmV2aW91cyBzZWFyY2guIFRoaXMgd2F5IGlmIG91ciBjdXJzb3IgaXNcbiAgICAgKiBhbHJlYWR5IGluc2lkZSBhIG1hdGNoLCB3ZSBzaG91bGQgcmV0dXJuIHRoZSBjdXJyZW50IG1hdGNoLlxuICAgICAqIDIuIFJhdGhlciB0aGFuIG9ubHkgcmV0dXJuaW5nIHRoZSBjdXJzb3IncyBmcm9tLCB3ZSByZXR1cm4gdGhlIGN1cnNvcidzIGZyb20gYW5kIHRvIGFzIGEgdHVwbGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmluZE5leHRGcm9tQW5kVG9JbmNsdXNpdmUoY20sIHByZXYsIHF1ZXJ5LCByZXBlYXQsIHZpbSkge1xuICAgICAgaWYgKHJlcGVhdCA9PT0gdW5kZWZpbmVkKSB7IHJlcGVhdCA9IDE7IH1cbiAgICAgIHJldHVybiBjbS5vcGVyYXRpb24oZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBwb3MgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgdmFyIGN1cnNvciA9IGNtLmdldFNlYXJjaEN1cnNvcihxdWVyeSwgcG9zKTtcblxuICAgICAgICAvLyBHbyBiYWNrIG9uZSByZXN1bHQgdG8gZW5zdXJlIHRoYXQgaWYgdGhlIGN1cnNvciBpcyBjdXJyZW50bHkgYSBtYXRjaCwgd2Uga2VlcCBpdC5cbiAgICAgICAgdmFyIGZvdW5kID0gY3Vyc29yLmZpbmQoIXByZXYpO1xuXG4gICAgICAgIC8vIElmIHdlIGhhdmVuJ3QgbW92ZWQsIGdvIGJhY2sgb25lIG1vcmUgKHNpbWlsYXIgdG8gaWYgaT09MCBsb2dpYyBpbiBmaW5kTmV4dCkuXG4gICAgICAgIGlmICghdmltLnZpc3VhbE1vZGUgJiYgZm91bmQgJiYgY3Vyc29yRXF1YWwoY3Vyc29yLmZyb20oKSwgcG9zKSkge1xuICAgICAgICAgIGN1cnNvci5maW5kKCFwcmV2KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwZWF0OyBpKyspIHtcbiAgICAgICAgICBmb3VuZCA9IGN1cnNvci5maW5kKHByZXYpO1xuICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgIC8vIFNlYXJjaEN1cnNvciBtYXkgaGF2ZSByZXR1cm5lZCBudWxsIGJlY2F1c2UgaXQgaGl0IEVPRiwgd3JhcFxuICAgICAgICAgICAgLy8gYXJvdW5kIGFuZCB0cnkgYWdhaW4uXG4gICAgICAgICAgICBjdXJzb3IgPSBjbS5nZXRTZWFyY2hDdXJzb3IocXVlcnksXG4gICAgICAgICAgICAgICAgKHByZXYpID8gbmV3IFBvcyhjbS5sYXN0TGluZSgpKSA6IG5ldyBQb3MoY20uZmlyc3RMaW5lKCksIDApICk7XG4gICAgICAgICAgICBpZiAoIWN1cnNvci5maW5kKHByZXYpKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtjdXJzb3IuZnJvbSgpLCBjdXJzb3IudG8oKV07XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY2xlYXJTZWFyY2hIaWdobGlnaHQoY20pIHtcbiAgICAgIHZhciBzdGF0ZSA9IGdldFNlYXJjaFN0YXRlKGNtKTtcbiAgICAgIGNtLnJlbW92ZU92ZXJsYXkoZ2V0U2VhcmNoU3RhdGUoY20pLmdldE92ZXJsYXkoKSk7XG4gICAgICBzdGF0ZS5zZXRPdmVybGF5KG51bGwpO1xuICAgICAgaWYgKHN0YXRlLmdldFNjcm9sbGJhckFubm90YXRlKCkpIHtcbiAgICAgICAgc3RhdGUuZ2V0U2Nyb2xsYmFyQW5ub3RhdGUoKS5jbGVhcigpO1xuICAgICAgICBzdGF0ZS5zZXRTY3JvbGxiYXJBbm5vdGF0ZShudWxsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgcG9zIGlzIGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UsIElOQ0xVU0lWRS5cbiAgICAgKiBSYW5nZSBjYW4gYmUgc3BlY2lmaWVkIHdpdGggMSBvciAyIGFyZ3VtZW50cy5cbiAgICAgKiBJZiB0aGUgZmlyc3QgcmFuZ2UgYXJndW1lbnQgaXMgYW4gYXJyYXksIHRyZWF0IGl0IGFzIGFuIGFycmF5IG9mIGxpbmVcbiAgICAgKiBudW1iZXJzLiBNYXRjaCBwb3MgYWdhaW5zdCBhbnkgb2YgdGhlIGxpbmVzLlxuICAgICAqIElmIHRoZSBmaXJzdCByYW5nZSBhcmd1bWVudCBpcyBhIG51bWJlcixcbiAgICAgKiAgIGlmIHRoZXJlIGlzIG9ubHkgMSByYW5nZSBhcmd1bWVudCwgY2hlY2sgaWYgcG9zIGhhcyB0aGUgc2FtZSBsaW5lXG4gICAgICogICAgICAgbnVtYmVyXG4gICAgICogICBpZiB0aGVyZSBhcmUgMiByYW5nZSBhcmd1bWVudHMsIHRoZW4gY2hlY2sgaWYgcG9zIGlzIGluIGJldHdlZW4gdGhlIHR3b1xuICAgICAqICAgICAgIHJhbmdlIGFyZ3VtZW50cy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0luUmFuZ2UocG9zLCBzdGFydCwgZW5kKSB7XG4gICAgICBpZiAodHlwZW9mIHBvcyAhPSAnbnVtYmVyJykge1xuICAgICAgICAvLyBBc3N1bWUgaXQgaXMgYSBjdXJzb3IgcG9zaXRpb24uIEdldCB0aGUgbGluZSBudW1iZXIuXG4gICAgICAgIHBvcyA9IHBvcy5saW5lO1xuICAgICAgfVxuICAgICAgaWYgKHN0YXJ0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGluQXJyYXkocG9zLCBzdGFydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIGVuZCA9PSAnbnVtYmVyJykge1xuICAgICAgICAgIHJldHVybiAocG9zID49IHN0YXJ0ICYmIHBvcyA8PSBlbmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBwb3MgPT0gc3RhcnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0VXNlclZpc2libGVMaW5lcyhjbSkge1xuICAgICAgLy8gYWNlX3BhdGNoe1xuICAgICAgdmFyIHJlbmRlcmVyID0gY20uYWNlLnJlbmRlcmVyO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiByZW5kZXJlci5nZXRGaXJzdEZ1bGx5VmlzaWJsZVJvdygpLFxuICAgICAgICBib3R0b206IHJlbmRlcmVyLmdldExhc3RGdWxseVZpc2libGVSb3coKVxuICAgICAgfVxuICAgICAgLy8gYWNlX3BhdGNofVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE1hcmtQb3MoY20sIHZpbSwgbWFya05hbWUpIHtcbiAgICAgIGlmIChtYXJrTmFtZSA9PSAnXFwnJyB8fCBtYXJrTmFtZSA9PSAnYCcpIHtcbiAgICAgICAgcmV0dXJuIHZpbUdsb2JhbFN0YXRlLmp1bXBMaXN0LmZpbmQoY20sIC0xKSB8fCBuZXcgUG9zKDAsIDApO1xuICAgICAgfSBlbHNlIGlmIChtYXJrTmFtZSA9PSAnLicpIHtcbiAgICAgICAgcmV0dXJuIGdldExhc3RFZGl0UG9zKGNtKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG1hcmsgPSB2aW0ubWFya3NbbWFya05hbWVdO1xuICAgICAgcmV0dXJuIG1hcmsgJiYgbWFyay5maW5kKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TGFzdEVkaXRQb3MoY20pIHtcbiAgICAgIC8vIGFjZV9wYXRjaHtcbiAgICAgIHZhciB1bmRvTWFuYWdlciA9IGNtLmFjZS5zZXNzaW9uLiR1bmRvTWFuYWdlcjtcbiAgICAgIGlmICh1bmRvTWFuYWdlciAmJiB1bmRvTWFuYWdlci4kbGFzdERlbHRhKVxuICAgICAgICByZXR1cm4gdG9DbVBvcyh1bmRvTWFuYWdlci4kbGFzdERlbHRhLmVuZCk7XG4gICAgICAvLyBhY2VfcGF0Y2h9XG4gICAgfVxuXG4gICAgdmFyIEV4Q29tbWFuZERpc3BhdGNoZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuYnVpbGRDb21tYW5kTWFwXygpO1xuICAgIH07XG4gICAgRXhDb21tYW5kRGlzcGF0Y2hlci5wcm90b3R5cGUgPSB7XG4gICAgICBwcm9jZXNzQ29tbWFuZDogZnVuY3Rpb24oY20sIGlucHV0LCBvcHRfcGFyYW1zKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgY20ub3BlcmF0aW9uKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBjbS5jdXJPcC5pc1ZpbU9wID0gdHJ1ZTtcbiAgICAgICAgICB0aGF0Ll9wcm9jZXNzQ29tbWFuZChjbSwgaW5wdXQsIG9wdF9wYXJhbXMpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBfcHJvY2Vzc0NvbW1hbmQ6IGZ1bmN0aW9uKGNtLCBpbnB1dCwgb3B0X3BhcmFtcykge1xuICAgICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgICB2YXIgY29tbWFuZEhpc3RvcnlSZWdpc3RlciA9IHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5nZXRSZWdpc3RlcignOicpO1xuICAgICAgICB2YXIgcHJldmlvdXNDb21tYW5kID0gY29tbWFuZEhpc3RvcnlSZWdpc3Rlci50b1N0cmluZygpO1xuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICBleGl0VmlzdWFsTW9kZShjbSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlucHV0U3RyZWFtID0gbmV3IENvZGVNaXJyb3IuU3RyaW5nU3RyZWFtKGlucHV0KTtcbiAgICAgICAgLy8gdXBkYXRlIFwiOiB3aXRoIHRoZSBsYXRlc3QgY29tbWFuZCB3aGV0aGVyIHZhbGlkIG9yIGludmFsaWRcbiAgICAgICAgY29tbWFuZEhpc3RvcnlSZWdpc3Rlci5zZXRUZXh0KGlucHV0KTtcbiAgICAgICAgdmFyIHBhcmFtcyA9IG9wdF9wYXJhbXMgfHwge307XG4gICAgICAgIHBhcmFtcy5pbnB1dCA9IGlucHV0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMucGFyc2VJbnB1dF8oY20sIGlucHV0U3RyZWFtLCBwYXJhbXMpO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICBzaG93Q29uZmlybShjbSwgZS50b1N0cmluZygpKTtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb21tYW5kO1xuICAgICAgICB2YXIgY29tbWFuZE5hbWU7XG4gICAgICAgIGlmICghcGFyYW1zLmNvbW1hbmROYW1lKSB7XG4gICAgICAgICAgLy8gSWYgb25seSBhIGxpbmUgcmFuZ2UgaXMgZGVmaW5lZCwgbW92ZSB0byB0aGUgbGluZS5cbiAgICAgICAgICBpZiAocGFyYW1zLmxpbmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29tbWFuZE5hbWUgPSAnbW92ZSc7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbW1hbmQgPSB0aGlzLm1hdGNoQ29tbWFuZF8ocGFyYW1zLmNvbW1hbmROYW1lKTtcbiAgICAgICAgICBpZiAoY29tbWFuZCkge1xuICAgICAgICAgICAgY29tbWFuZE5hbWUgPSBjb21tYW5kLm5hbWU7XG4gICAgICAgICAgICBpZiAoY29tbWFuZC5leGNsdWRlRnJvbUNvbW1hbmRIaXN0b3J5KSB7XG4gICAgICAgICAgICAgIGNvbW1hbmRIaXN0b3J5UmVnaXN0ZXIuc2V0VGV4dChwcmV2aW91c0NvbW1hbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5wYXJzZUNvbW1hbmRBcmdzXyhpbnB1dFN0cmVhbSwgcGFyYW1zLCBjb21tYW5kKTtcbiAgICAgICAgICAgIGlmIChjb21tYW5kLnR5cGUgPT0gJ2V4VG9LZXknKSB7XG4gICAgICAgICAgICAgIC8vIEhhbmRsZSBFeCB0byBLZXkgbWFwcGluZy5cbiAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjb21tYW5kLnRvS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZpbUFwaS5oYW5kbGVLZXkoY20sIGNvbW1hbmQudG9LZXlzW2ldLCAnbWFwcGluZycpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29tbWFuZC50eXBlID09ICdleFRvRXgnKSB7XG4gICAgICAgICAgICAgIC8vIEhhbmRsZSBFeCB0byBFeCBtYXBwaW5nLlxuICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NDb21tYW5kKGNtLCBjb21tYW5kLnRvSW5wdXQpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY29tbWFuZE5hbWUpIHtcbiAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ05vdCBhbiBlZGl0b3IgY29tbWFuZCBcIjonICsgaW5wdXQgKyAnXCInKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBleENvbW1hbmRzW2NvbW1hbmROYW1lXShjbSwgcGFyYW1zKTtcbiAgICAgICAgICAvLyBQb3NzaWJseSBhc3luY2hyb25vdXMgY29tbWFuZHMgKGUuZy4gc3Vic3RpdHV0ZSwgd2hpY2ggbWlnaHQgaGF2ZSBhXG4gICAgICAgICAgLy8gdXNlciBjb25maXJtYXRpb24pLCBhcmUgcmVzcG9uc2libGUgZm9yIGNhbGxpbmcgdGhlIGNhbGxiYWNrIHdoZW5cbiAgICAgICAgICAvLyBkb25lLiBBbGwgb3RoZXJzIGhhdmUgaXQgdGFrZW4gY2FyZSBvZiBmb3IgdGhlbSBoZXJlLlxuICAgICAgICAgIGlmICgoIWNvbW1hbmQgfHwgIWNvbW1hbmQucG9zc2libHlBc3luYykgJiYgcGFyYW1zLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICBwYXJhbXMuY2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgIHNob3dDb25maXJtKGNtLCBlLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwYXJzZUlucHV0XzogZnVuY3Rpb24oY20sIGlucHV0U3RyZWFtLCByZXN1bHQpIHtcbiAgICAgICAgaW5wdXRTdHJlYW0uZWF0V2hpbGUoJzonKTtcbiAgICAgICAgLy8gUGFyc2UgcmFuZ2UuXG4gICAgICAgIGlmIChpbnB1dFN0cmVhbS5lYXQoJyUnKSkge1xuICAgICAgICAgIHJlc3VsdC5saW5lID0gY20uZmlyc3RMaW5lKCk7XG4gICAgICAgICAgcmVzdWx0LmxpbmVFbmQgPSBjbS5sYXN0TGluZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdC5saW5lID0gdGhpcy5wYXJzZUxpbmVTcGVjXyhjbSwgaW5wdXRTdHJlYW0pO1xuICAgICAgICAgIGlmIChyZXN1bHQubGluZSAhPT0gdW5kZWZpbmVkICYmIGlucHV0U3RyZWFtLmVhdCgnLCcpKSB7XG4gICAgICAgICAgICByZXN1bHQubGluZUVuZCA9IHRoaXMucGFyc2VMaW5lU3BlY18oY20sIGlucHV0U3RyZWFtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQYXJzZSBjb21tYW5kIG5hbWUuXG4gICAgICAgIHZhciBjb21tYW5kTWF0Y2ggPSBpbnB1dFN0cmVhbS5tYXRjaCgvXihcXHcrfCEhfEBAfFshIyYqPD0+QH5dKS8pO1xuICAgICAgICBpZiAoY29tbWFuZE1hdGNoKSB7XG4gICAgICAgICAgcmVzdWx0LmNvbW1hbmROYW1lID0gY29tbWFuZE1hdGNoWzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdC5jb21tYW5kTmFtZSA9IGlucHV0U3RyZWFtLm1hdGNoKC8uKi8pWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0sXG4gICAgICBwYXJzZUxpbmVTcGVjXzogZnVuY3Rpb24oY20sIGlucHV0U3RyZWFtKSB7XG4gICAgICAgIHZhciBudW1iZXJNYXRjaCA9IGlucHV0U3RyZWFtLm1hdGNoKC9eKFxcZCspLyk7XG4gICAgICAgIGlmIChudW1iZXJNYXRjaCkge1xuICAgICAgICAgIC8vIEFic29sdXRlIGxpbmUgbnVtYmVyIHBsdXMgb2Zmc2V0IChOK00gb3IgTi1NKSBpcyBwcm9iYWJseSBhIHR5cG8sXG4gICAgICAgICAgLy8gbm90IHNvbWV0aGluZyB0aGUgdXNlciBhY3R1YWxseSB3YW50ZWQuIChOQjogdmltIGRvZXMgYWxsb3cgdGhpcy4pXG4gICAgICAgICAgcmV0dXJuIHBhcnNlSW50KG51bWJlck1hdGNoWzFdLCAxMCkgLSAxO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoaW5wdXRTdHJlYW0ubmV4dCgpKSB7XG4gICAgICAgICAgY2FzZSAnLic6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUxpbmVTcGVjT2Zmc2V0XyhpbnB1dFN0cmVhbSwgY20uZ2V0Q3Vyc29yKCkubGluZSk7XG4gICAgICAgICAgY2FzZSAnJCc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUxpbmVTcGVjT2Zmc2V0XyhpbnB1dFN0cmVhbSwgY20ubGFzdExpbmUoKSk7XG4gICAgICAgICAgY2FzZSAnXFwnJzpcbiAgICAgICAgICAgIHZhciBtYXJrTmFtZSA9IGlucHV0U3RyZWFtLm5leHQoKTtcbiAgICAgICAgICAgIHZhciBtYXJrUG9zID0gZ2V0TWFya1BvcyhjbSwgY20uc3RhdGUudmltLCBtYXJrTmFtZSk7XG4gICAgICAgICAgICBpZiAoIW1hcmtQb3MpIHRocm93IG5ldyBFcnJvcignTWFyayBub3Qgc2V0Jyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUxpbmVTcGVjT2Zmc2V0XyhpbnB1dFN0cmVhbSwgbWFya1Bvcy5saW5lKTtcbiAgICAgICAgICBjYXNlICctJzpcbiAgICAgICAgICBjYXNlICcrJzpcbiAgICAgICAgICAgIGlucHV0U3RyZWFtLmJhY2tVcCgxKTtcbiAgICAgICAgICAgIC8vIE9mZnNldCBpcyByZWxhdGl2ZSB0byBjdXJyZW50IGxpbmUgaWYgbm90IG90aGVyd2lzZSBzcGVjaWZpZWQuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUxpbmVTcGVjT2Zmc2V0XyhpbnB1dFN0cmVhbSwgY20uZ2V0Q3Vyc29yKCkubGluZSk7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGlucHV0U3RyZWFtLmJhY2tVcCgxKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwYXJzZUxpbmVTcGVjT2Zmc2V0XzogZnVuY3Rpb24oaW5wdXRTdHJlYW0sIGxpbmUpIHtcbiAgICAgICAgdmFyIG9mZnNldE1hdGNoID0gaW5wdXRTdHJlYW0ubWF0Y2goL14oWystXSk/KFxcZCspLyk7XG4gICAgICAgIGlmIChvZmZzZXRNYXRjaCkge1xuICAgICAgICAgIHZhciBvZmZzZXQgPSBwYXJzZUludChvZmZzZXRNYXRjaFsyXSwgMTApO1xuICAgICAgICAgIGlmIChvZmZzZXRNYXRjaFsxXSA9PSBcIi1cIikge1xuICAgICAgICAgICAgbGluZSAtPSBvZmZzZXQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpbmUgKz0gb2Zmc2V0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGluZTtcbiAgICAgIH0sXG4gICAgICBwYXJzZUNvbW1hbmRBcmdzXzogZnVuY3Rpb24oaW5wdXRTdHJlYW0sIHBhcmFtcywgY29tbWFuZCkge1xuICAgICAgICBpZiAoaW5wdXRTdHJlYW0uZW9sKCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcGFyYW1zLmFyZ1N0cmluZyA9IGlucHV0U3RyZWFtLm1hdGNoKC8uKi8pWzBdO1xuICAgICAgICAvLyBQYXJzZSBjb21tYW5kLWxpbmUgYXJndW1lbnRzXG4gICAgICAgIHZhciBkZWxpbSA9IGNvbW1hbmQuYXJnRGVsaW1pdGVyIHx8IC9cXHMrLztcbiAgICAgICAgdmFyIGFyZ3MgPSB0cmltKHBhcmFtcy5hcmdTdHJpbmcpLnNwbGl0KGRlbGltKTtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoICYmIGFyZ3NbMF0pIHtcbiAgICAgICAgICBwYXJhbXMuYXJncyA9IGFyZ3M7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtYXRjaENvbW1hbmRfOiBmdW5jdGlvbihjb21tYW5kTmFtZSkge1xuICAgICAgICAvLyBSZXR1cm4gdGhlIGNvbW1hbmQgaW4gdGhlIGNvbW1hbmQgbWFwIHRoYXQgbWF0Y2hlcyB0aGUgc2hvcnRlc3RcbiAgICAgICAgLy8gcHJlZml4IG9mIHRoZSBwYXNzZWQgaW4gY29tbWFuZCBuYW1lLiBUaGUgbWF0Y2ggaXMgZ3VhcmFudGVlZCB0byBiZVxuICAgICAgICAvLyB1bmFtYmlndW91cyBpZiB0aGUgZGVmYXVsdEV4Q29tbWFuZE1hcCdzIHNob3J0TmFtZXMgYXJlIHNldCB1cFxuICAgICAgICAvLyBjb3JyZWN0bHkuIChzZWUgQGNvZGV7ZGVmYXVsdEV4Q29tbWFuZE1hcH0pLlxuICAgICAgICBmb3IgKHZhciBpID0gY29tbWFuZE5hbWUubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgdmFyIHByZWZpeCA9IGNvbW1hbmROYW1lLnN1YnN0cmluZygwLCBpKTtcbiAgICAgICAgICBpZiAodGhpcy5jb21tYW5kTWFwX1twcmVmaXhdKSB7XG4gICAgICAgICAgICB2YXIgY29tbWFuZCA9IHRoaXMuY29tbWFuZE1hcF9bcHJlZml4XTtcbiAgICAgICAgICAgIGlmIChjb21tYW5kLm5hbWUuaW5kZXhPZihjb21tYW5kTmFtZSkgPT09IDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcbiAgICAgIGJ1aWxkQ29tbWFuZE1hcF86IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmNvbW1hbmRNYXBfID0ge307XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVmYXVsdEV4Q29tbWFuZE1hcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBjb21tYW5kID0gZGVmYXVsdEV4Q29tbWFuZE1hcFtpXTtcbiAgICAgICAgICB2YXIga2V5ID0gY29tbWFuZC5zaG9ydE5hbWUgfHwgY29tbWFuZC5uYW1lO1xuICAgICAgICAgIHRoaXMuY29tbWFuZE1hcF9ba2V5XSA9IGNvbW1hbmQ7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtYXA6IGZ1bmN0aW9uKGxocywgcmhzLCBjdHgpIHtcbiAgICAgICAgaWYgKGxocyAhPSAnOicgJiYgbGhzLmNoYXJBdCgwKSA9PSAnOicpIHtcbiAgICAgICAgICBpZiAoY3R4KSB7IHRocm93IEVycm9yKCdNb2RlIG5vdCBzdXBwb3J0ZWQgZm9yIGV4IG1hcHBpbmdzJyk7IH1cbiAgICAgICAgICB2YXIgY29tbWFuZE5hbWUgPSBsaHMuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgIGlmIChyaHMgIT0gJzonICYmIHJocy5jaGFyQXQoMCkgPT0gJzonKSB7XG4gICAgICAgICAgICAvLyBFeCB0byBFeCBtYXBwaW5nXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRNYXBfW2NvbW1hbmROYW1lXSA9IHtcbiAgICAgICAgICAgICAgbmFtZTogY29tbWFuZE5hbWUsXG4gICAgICAgICAgICAgIHR5cGU6ICdleFRvRXgnLFxuICAgICAgICAgICAgICB0b0lucHV0OiByaHMuc3Vic3RyaW5nKDEpLFxuICAgICAgICAgICAgICB1c2VyOiB0cnVlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBFeCB0byBrZXkgbWFwcGluZ1xuICAgICAgICAgICAgdGhpcy5jb21tYW5kTWFwX1tjb21tYW5kTmFtZV0gPSB7XG4gICAgICAgICAgICAgIG5hbWU6IGNvbW1hbmROYW1lLFxuICAgICAgICAgICAgICB0eXBlOiAnZXhUb0tleScsXG4gICAgICAgICAgICAgIHRvS2V5czogcmhzLFxuICAgICAgICAgICAgICB1c2VyOiB0cnVlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAocmhzICE9ICc6JyAmJiByaHMuY2hhckF0KDApID09ICc6Jykge1xuICAgICAgICAgICAgLy8gS2V5IHRvIEV4IG1hcHBpbmcuXG4gICAgICAgICAgICB2YXIgbWFwcGluZyA9IHtcbiAgICAgICAgICAgICAga2V5czogbGhzLFxuICAgICAgICAgICAgICB0eXBlOiAna2V5VG9FeCcsXG4gICAgICAgICAgICAgIGV4QXJnczogeyBpbnB1dDogcmhzLnN1YnN0cmluZygxKSB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKGN0eCkgeyBtYXBwaW5nLmNvbnRleHQgPSBjdHg7IH1cbiAgICAgICAgICAgIGRlZmF1bHRLZXltYXAudW5zaGlmdChtYXBwaW5nKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gS2V5IHRvIGtleSBtYXBwaW5nXG4gICAgICAgICAgICB2YXIgbWFwcGluZyA9IHtcbiAgICAgICAgICAgICAga2V5czogbGhzLFxuICAgICAgICAgICAgICB0eXBlOiAna2V5VG9LZXknLFxuICAgICAgICAgICAgICB0b0tleXM6IHJoc1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChjdHgpIHsgbWFwcGluZy5jb250ZXh0ID0gY3R4OyB9XG4gICAgICAgICAgICBkZWZhdWx0S2V5bWFwLnVuc2hpZnQobWFwcGluZyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdW5tYXA6IGZ1bmN0aW9uKGxocywgY3R4KSB7XG4gICAgICAgIGlmIChsaHMgIT0gJzonICYmIGxocy5jaGFyQXQoMCkgPT0gJzonKSB7XG4gICAgICAgICAgLy8gRXggdG8gRXggb3IgRXggdG8ga2V5IG1hcHBpbmdcbiAgICAgICAgICBpZiAoY3R4KSB7IHRocm93IEVycm9yKCdNb2RlIG5vdCBzdXBwb3J0ZWQgZm9yIGV4IG1hcHBpbmdzJyk7IH1cbiAgICAgICAgICB2YXIgY29tbWFuZE5hbWUgPSBsaHMuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgIGlmICh0aGlzLmNvbW1hbmRNYXBfW2NvbW1hbmROYW1lXSAmJiB0aGlzLmNvbW1hbmRNYXBfW2NvbW1hbmROYW1lXS51c2VyKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5jb21tYW5kTWFwX1tjb21tYW5kTmFtZV07XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gS2V5IHRvIEV4IG9yIGtleSB0byBrZXkgbWFwcGluZ1xuICAgICAgICAgIHZhciBrZXlzID0gbGhzO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVmYXVsdEtleW1hcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGtleXMgPT0gZGVmYXVsdEtleW1hcFtpXS5rZXlzXG4gICAgICAgICAgICAgICAgJiYgZGVmYXVsdEtleW1hcFtpXS5jb250ZXh0ID09PSBjdHgpIHtcbiAgICAgICAgICAgICAgZGVmYXVsdEtleW1hcC5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZXhDb21tYW5kcyA9IHtcbiAgICAgIGNvbG9yc2NoZW1lOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7XG4gICAgICAgIGlmICghcGFyYW1zLmFyZ3MgfHwgcGFyYW1zLmFyZ3MubGVuZ3RoIDwgMSkge1xuICAgICAgICAgIHNob3dDb25maXJtKGNtLCBjbS5nZXRPcHRpb24oJ3RoZW1lJykpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjbS5zZXRPcHRpb24oJ3RoZW1lJywgcGFyYW1zLmFyZ3NbMF0pO1xuICAgICAgfSxcbiAgICAgIG1hcDogZnVuY3Rpb24oY20sIHBhcmFtcywgY3R4KSB7XG4gICAgICAgIHZhciBtYXBBcmdzID0gcGFyYW1zLmFyZ3M7XG4gICAgICAgIGlmICghbWFwQXJncyB8fCBtYXBBcmdzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICBpZiAoY20pIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnSW52YWxpZCBtYXBwaW5nOiAnICsgcGFyYW1zLmlucHV0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGV4Q29tbWFuZERpc3BhdGNoZXIubWFwKG1hcEFyZ3NbMF0sIG1hcEFyZ3NbMV0sIGN0eCk7XG4gICAgICB9LFxuICAgICAgaW1hcDogZnVuY3Rpb24oY20sIHBhcmFtcykgeyB0aGlzLm1hcChjbSwgcGFyYW1zLCAnaW5zZXJ0Jyk7IH0sXG4gICAgICBubWFwOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7IHRoaXMubWFwKGNtLCBwYXJhbXMsICdub3JtYWwnKTsgfSxcbiAgICAgIHZtYXA6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHsgdGhpcy5tYXAoY20sIHBhcmFtcywgJ3Zpc3VhbCcpOyB9LFxuICAgICAgdW5tYXA6IGZ1bmN0aW9uKGNtLCBwYXJhbXMsIGN0eCkge1xuICAgICAgICB2YXIgbWFwQXJncyA9IHBhcmFtcy5hcmdzO1xuICAgICAgICBpZiAoIW1hcEFyZ3MgfHwgbWFwQXJncy5sZW5ndGggPCAxIHx8ICFleENvbW1hbmREaXNwYXRjaGVyLnVubWFwKG1hcEFyZ3NbMF0sIGN0eCkpIHtcbiAgICAgICAgICBpZiAoY20pIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnTm8gc3VjaCBtYXBwaW5nOiAnICsgcGFyYW1zLmlucHV0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtb3ZlOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7XG4gICAgICAgIGNvbW1hbmREaXNwYXRjaGVyLnByb2Nlc3NDb21tYW5kKGNtLCBjbS5zdGF0ZS52aW0sIHtcbiAgICAgICAgICAgIHR5cGU6ICdtb3Rpb24nLFxuICAgICAgICAgICAgbW90aW9uOiAnbW92ZVRvTGluZU9yRWRnZU9mRG9jdW1lbnQnLFxuICAgICAgICAgICAgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgZXhwbGljaXRSZXBlYXQ6IHRydWUsXG4gICAgICAgICAgICAgIGxpbmV3aXNlOiB0cnVlIH0sXG4gICAgICAgICAgICByZXBlYXRPdmVycmlkZTogcGFyYW1zLmxpbmUrMX0pO1xuICAgICAgfSxcbiAgICAgIHNldDogZnVuY3Rpb24oY20sIHBhcmFtcykge1xuICAgICAgICB2YXIgc2V0QXJncyA9IHBhcmFtcy5hcmdzO1xuICAgICAgICAvLyBPcHRpb25zIHBhc3NlZCB0aHJvdWdoIHRvIHRoZSBzZXRPcHRpb24vZ2V0T3B0aW9uIGNhbGxzLiBNYXkgYmUgcGFzc2VkIGluIGJ5IHRoZVxuICAgICAgICAvLyBsb2NhbC9nbG9iYWwgdmVyc2lvbnMgb2YgdGhlIHNldCBjb21tYW5kXG4gICAgICAgIHZhciBzZXRDZmcgPSBwYXJhbXMuc2V0Q2ZnIHx8IHt9O1xuICAgICAgICBpZiAoIXNldEFyZ3MgfHwgc2V0QXJncy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgaWYgKGNtKSB7XG4gICAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ0ludmFsaWQgbWFwcGluZzogJyArIHBhcmFtcy5pbnB1dCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXhwciA9IHNldEFyZ3NbMF0uc3BsaXQoJz0nKTtcbiAgICAgICAgdmFyIG9wdGlvbk5hbWUgPSBleHByWzBdO1xuICAgICAgICB2YXIgdmFsdWUgPSBleHByWzFdO1xuICAgICAgICB2YXIgZm9yY2VHZXQgPSBmYWxzZTtcblxuICAgICAgICBpZiAob3B0aW9uTmFtZS5jaGFyQXQob3B0aW9uTmFtZS5sZW5ndGggLSAxKSA9PSAnPycpIHtcbiAgICAgICAgICAvLyBJZiBwb3N0LWZpeGVkIHdpdGggPywgdGhlbiB0aGUgc2V0IGlzIGFjdHVhbGx5IGEgZ2V0LlxuICAgICAgICAgIGlmICh2YWx1ZSkgeyB0aHJvdyBFcnJvcignVHJhaWxpbmcgY2hhcmFjdGVyczogJyArIHBhcmFtcy5hcmdTdHJpbmcpOyB9XG4gICAgICAgICAgb3B0aW9uTmFtZSA9IG9wdGlvbk5hbWUuc3Vic3RyaW5nKDAsIG9wdGlvbk5hbWUubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgZm9yY2VHZXQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmIG9wdGlvbk5hbWUuc3Vic3RyaW5nKDAsIDIpID09ICdubycpIHtcbiAgICAgICAgICAvLyBUbyBzZXQgYm9vbGVhbiBvcHRpb25zIHRvIGZhbHNlLCB0aGUgb3B0aW9uIG5hbWUgaXMgcHJlZml4ZWQgd2l0aFxuICAgICAgICAgIC8vICdubycuXG4gICAgICAgICAgb3B0aW9uTmFtZSA9IG9wdGlvbk5hbWUuc3Vic3RyaW5nKDIpO1xuICAgICAgICAgIHZhbHVlID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb3B0aW9uSXNCb29sZWFuID0gb3B0aW9uc1tvcHRpb25OYW1lXSAmJiBvcHRpb25zW29wdGlvbk5hbWVdLnR5cGUgPT0gJ2Jvb2xlYW4nO1xuICAgICAgICBpZiAob3B0aW9uSXNCb29sZWFuICYmIHZhbHVlID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIENhbGxpbmcgc2V0IHdpdGggYSBib29sZWFuIG9wdGlvbiBzZXRzIGl0IHRvIHRydWUuXG4gICAgICAgICAgdmFsdWUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIG5vIHZhbHVlIGlzIHByb3ZpZGVkLCB0aGVuIHdlIGFzc3VtZSB0aGlzIGlzIGEgZ2V0LlxuICAgICAgICBpZiAoIW9wdGlvbklzQm9vbGVhbiAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IGZvcmNlR2V0KSB7XG4gICAgICAgICAgdmFyIG9sZFZhbHVlID0gZ2V0T3B0aW9uKG9wdGlvbk5hbWUsIGNtLCBzZXRDZmcpO1xuICAgICAgICAgIGlmIChvbGRWYWx1ZSBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBzaG93Q29uZmlybShjbSwgb2xkVmFsdWUubWVzc2FnZSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChvbGRWYWx1ZSA9PT0gdHJ1ZSB8fCBvbGRWYWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnICcgKyAob2xkVmFsdWUgPyAnJyA6ICdubycpICsgb3B0aW9uTmFtZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnICAnICsgb3B0aW9uTmFtZSArICc9JyArIG9sZFZhbHVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHNldE9wdGlvblJldHVybiA9IHNldE9wdGlvbihvcHRpb25OYW1lLCB2YWx1ZSwgY20sIHNldENmZyk7XG4gICAgICAgICAgaWYgKHNldE9wdGlvblJldHVybiBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgICBzaG93Q29uZmlybShjbSwgc2V0T3B0aW9uUmV0dXJuLm1lc3NhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNldGxvY2FsOiBmdW5jdGlvbiAoY20sIHBhcmFtcykge1xuICAgICAgICAvLyBzZXRDZmcgaXMgcGFzc2VkIHRocm91Z2ggdG8gc2V0T3B0aW9uXG4gICAgICAgIHBhcmFtcy5zZXRDZmcgPSB7c2NvcGU6ICdsb2NhbCd9O1xuICAgICAgICB0aGlzLnNldChjbSwgcGFyYW1zKTtcbiAgICAgIH0sXG4gICAgICBzZXRnbG9iYWw6IGZ1bmN0aW9uIChjbSwgcGFyYW1zKSB7XG4gICAgICAgIC8vIHNldENmZyBpcyBwYXNzZWQgdGhyb3VnaCB0byBzZXRPcHRpb25cbiAgICAgICAgcGFyYW1zLnNldENmZyA9IHtzY29wZTogJ2dsb2JhbCd9O1xuICAgICAgICB0aGlzLnNldChjbSwgcGFyYW1zKTtcbiAgICAgIH0sXG4gICAgICByZWdpc3RlcnM6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgdmFyIHJlZ0FyZ3MgPSBwYXJhbXMuYXJncztcbiAgICAgICAgdmFyIHJlZ2lzdGVycyA9IHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5yZWdpc3RlcnM7XG4gICAgICAgIHZhciByZWdJbmZvID0gJy0tLS0tLS0tLS1SZWdpc3RlcnMtLS0tLS0tLS0tXFxuXFxuJztcbiAgICAgICAgaWYgKCFyZWdBcmdzKSB7XG4gICAgICAgICAgZm9yICh2YXIgcmVnaXN0ZXJOYW1lIGluIHJlZ2lzdGVycykge1xuICAgICAgICAgICAgdmFyIHRleHQgPSByZWdpc3RlcnNbcmVnaXN0ZXJOYW1lXS50b1N0cmluZygpO1xuICAgICAgICAgICAgaWYgKHRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIHJlZ0luZm8gKz0gJ1wiJyArIHJlZ2lzdGVyTmFtZSArICcgICAgJyArIHRleHQgKyAnXFxuJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcmVnaXN0ZXJOYW1lO1xuICAgICAgICAgIHJlZ0FyZ3MgPSByZWdBcmdzLmpvaW4oJycpO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVnQXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcmVnaXN0ZXJOYW1lID0gcmVnQXJncy5jaGFyQXQoaSk7XG4gICAgICAgICAgICBpZiAoIXZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5pc1ZhbGlkUmVnaXN0ZXIocmVnaXN0ZXJOYW1lKSkge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByZWdpc3RlciA9IHJlZ2lzdGVyc1tyZWdpc3Rlck5hbWVdIHx8IG5ldyBSZWdpc3RlcigpO1xuICAgICAgICAgICAgcmVnSW5mbyArPSAnXCInICsgcmVnaXN0ZXJOYW1lICsgJyAgICAnICsgcmVnaXN0ZXIudG9TdHJpbmcoKSArICdcXG4nXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHNob3dDb25maXJtKGNtLCByZWdJbmZvKTtcbiAgICAgIH0sXG4gICAgICBzb3J0OiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7XG4gICAgICAgIHZhciByZXZlcnNlLCBpZ25vcmVDYXNlLCB1bmlxdWUsIG51bWJlciwgcGF0dGVybjtcbiAgICAgICAgZnVuY3Rpb24gcGFyc2VBcmdzKCkge1xuICAgICAgICAgIGlmIChwYXJhbXMuYXJnU3RyaW5nKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IG5ldyBDb2RlTWlycm9yLlN0cmluZ1N0cmVhbShwYXJhbXMuYXJnU3RyaW5nKTtcbiAgICAgICAgICAgIGlmIChhcmdzLmVhdCgnIScpKSB7IHJldmVyc2UgPSB0cnVlOyB9XG4gICAgICAgICAgICBpZiAoYXJncy5lb2woKSkgeyByZXR1cm47IH1cbiAgICAgICAgICAgIGlmICghYXJncy5lYXRTcGFjZSgpKSB7IHJldHVybiAnSW52YWxpZCBhcmd1bWVudHMnOyB9XG4gICAgICAgICAgICB2YXIgb3B0cyA9IGFyZ3MubWF0Y2goLyhbZGludW94XSspP1xccyooXFwvLitcXC8pP1xccyovKTtcbiAgICAgICAgICAgIGlmICghb3B0cyAmJiAhYXJncy5lb2woKSkgeyByZXR1cm4gJ0ludmFsaWQgYXJndW1lbnRzJzsgfVxuICAgICAgICAgICAgaWYgKG9wdHNbMV0pIHtcbiAgICAgICAgICAgICAgaWdub3JlQ2FzZSA9IG9wdHNbMV0uaW5kZXhPZignaScpICE9IC0xO1xuICAgICAgICAgICAgICB1bmlxdWUgPSBvcHRzWzFdLmluZGV4T2YoJ3UnKSAhPSAtMTtcbiAgICAgICAgICAgICAgdmFyIGRlY2ltYWwgPSBvcHRzWzFdLmluZGV4T2YoJ2QnKSAhPSAtMSB8fCBvcHRzWzFdLmluZGV4T2YoJ24nKSAhPSAtMSAmJiAxO1xuICAgICAgICAgICAgICB2YXIgaGV4ID0gb3B0c1sxXS5pbmRleE9mKCd4JykgIT0gLTEgJiYgMTtcbiAgICAgICAgICAgICAgdmFyIG9jdGFsID0gb3B0c1sxXS5pbmRleE9mKCdvJykgIT0gLTEgJiYgMTtcbiAgICAgICAgICAgICAgaWYgKGRlY2ltYWwgKyBoZXggKyBvY3RhbCA+IDEpIHsgcmV0dXJuICdJbnZhbGlkIGFyZ3VtZW50cyc7IH1cbiAgICAgICAgICAgICAgbnVtYmVyID0gZGVjaW1hbCAmJiAnZGVjaW1hbCcgfHwgaGV4ICYmICdoZXgnIHx8IG9jdGFsICYmICdvY3RhbCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0c1syXSkge1xuICAgICAgICAgICAgICBwYXR0ZXJuID0gbmV3IFJlZ0V4cChvcHRzWzJdLnN1YnN0cigxLCBvcHRzWzJdLmxlbmd0aCAtIDIpLCBpZ25vcmVDYXNlID8gJ2knIDogJycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZXJyID0gcGFyc2VBcmdzKCk7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBzaG93Q29uZmlybShjbSwgZXJyICsgJzogJyArIHBhcmFtcy5hcmdTdHJpbmcpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGluZVN0YXJ0ID0gcGFyYW1zLmxpbmUgfHwgY20uZmlyc3RMaW5lKCk7XG4gICAgICAgIHZhciBsaW5lRW5kID0gcGFyYW1zLmxpbmVFbmQgfHwgcGFyYW1zLmxpbmUgfHwgY20ubGFzdExpbmUoKTtcbiAgICAgICAgaWYgKGxpbmVTdGFydCA9PSBsaW5lRW5kKSB7IHJldHVybjsgfVxuICAgICAgICB2YXIgY3VyU3RhcnQgPSBuZXcgUG9zKGxpbmVTdGFydCwgMCk7XG4gICAgICAgIHZhciBjdXJFbmQgPSBuZXcgUG9zKGxpbmVFbmQsIGxpbmVMZW5ndGgoY20sIGxpbmVFbmQpKTtcbiAgICAgICAgdmFyIHRleHQgPSBjbS5nZXRSYW5nZShjdXJTdGFydCwgY3VyRW5kKS5zcGxpdCgnXFxuJyk7XG4gICAgICAgIHZhciBudW1iZXJSZWdleCA9IHBhdHRlcm4gPyBwYXR0ZXJuIDpcbiAgICAgICAgICAgKG51bWJlciA9PSAnZGVjaW1hbCcpID8gLygtPykoW1xcZF0rKS8gOlxuICAgICAgICAgICAobnVtYmVyID09ICdoZXgnKSA/IC8oLT8pKD86MHgpPyhbMC05YS1mXSspL2kgOlxuICAgICAgICAgICAobnVtYmVyID09ICdvY3RhbCcpID8gLyhbMC03XSspLyA6IG51bGw7XG4gICAgICAgIHZhciByYWRpeCA9IChudW1iZXIgPT0gJ2RlY2ltYWwnKSA/IDEwIDogKG51bWJlciA9PSAnaGV4JykgPyAxNiA6IChudW1iZXIgPT0gJ29jdGFsJykgPyA4IDogbnVsbDtcbiAgICAgICAgdmFyIG51bVBhcnQgPSBbXSwgdGV4dFBhcnQgPSBbXTtcbiAgICAgICAgaWYgKG51bWJlciB8fCBwYXR0ZXJuKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbWF0Y2hQYXJ0ID0gcGF0dGVybiA/IHRleHRbaV0ubWF0Y2gocGF0dGVybikgOiBudWxsO1xuICAgICAgICAgICAgaWYgKG1hdGNoUGFydCAmJiBtYXRjaFBhcnRbMF0gIT0gJycpIHtcbiAgICAgICAgICAgICAgbnVtUGFydC5wdXNoKG1hdGNoUGFydCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFwYXR0ZXJuICYmIG51bWJlclJlZ2V4LmV4ZWModGV4dFtpXSkpIHtcbiAgICAgICAgICAgICAgbnVtUGFydC5wdXNoKHRleHRbaV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGV4dFBhcnQucHVzaCh0ZXh0W2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGV4dFBhcnQgPSB0ZXh0O1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNvbXBhcmVGbihhLCBiKSB7XG4gICAgICAgICAgaWYgKHJldmVyc2UpIHsgdmFyIHRtcDsgdG1wID0gYTsgYSA9IGI7IGIgPSB0bXA7IH1cbiAgICAgICAgICBpZiAoaWdub3JlQ2FzZSkgeyBhID0gYS50b0xvd2VyQ2FzZSgpOyBiID0gYi50b0xvd2VyQ2FzZSgpOyB9XG4gICAgICAgICAgdmFyIGFudW0gPSBudW1iZXIgJiYgbnVtYmVyUmVnZXguZXhlYyhhKTtcbiAgICAgICAgICB2YXIgYm51bSA9IG51bWJlciAmJiBudW1iZXJSZWdleC5leGVjKGIpO1xuICAgICAgICAgIGlmICghYW51bSkgeyByZXR1cm4gYSA8IGIgPyAtMSA6IDE7IH1cbiAgICAgICAgICBhbnVtID0gcGFyc2VJbnQoKGFudW1bMV0gKyBhbnVtWzJdKS50b0xvd2VyQ2FzZSgpLCByYWRpeCk7XG4gICAgICAgICAgYm51bSA9IHBhcnNlSW50KChibnVtWzFdICsgYm51bVsyXSkudG9Mb3dlckNhc2UoKSwgcmFkaXgpO1xuICAgICAgICAgIHJldHVybiBhbnVtIC0gYm51bTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjb21wYXJlUGF0dGVybkZuKGEsIGIpIHtcbiAgICAgICAgICBpZiAocmV2ZXJzZSkgeyB2YXIgdG1wOyB0bXAgPSBhOyBhID0gYjsgYiA9IHRtcDsgfVxuICAgICAgICAgIGlmIChpZ25vcmVDYXNlKSB7IGFbMF0gPSBhWzBdLnRvTG93ZXJDYXNlKCk7IGJbMF0gPSBiWzBdLnRvTG93ZXJDYXNlKCk7IH1cbiAgICAgICAgICByZXR1cm4gKGFbMF0gPCBiWzBdKSA/IC0xIDogMTtcbiAgICAgICAgfVxuICAgICAgICBudW1QYXJ0LnNvcnQocGF0dGVybiA/IGNvbXBhcmVQYXR0ZXJuRm4gOiBjb21wYXJlRm4pO1xuICAgICAgICBpZiAocGF0dGVybikge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbnVtUGFydC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgbnVtUGFydFtpXSA9IG51bVBhcnRbaV0uaW5wdXQ7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCFudW1iZXIpIHsgdGV4dFBhcnQuc29ydChjb21wYXJlRm4pOyB9XG4gICAgICAgIHRleHQgPSAoIXJldmVyc2UpID8gdGV4dFBhcnQuY29uY2F0KG51bVBhcnQpIDogbnVtUGFydC5jb25jYXQodGV4dFBhcnQpO1xuICAgICAgICBpZiAodW5pcXVlKSB7IC8vIFJlbW92ZSBkdXBsaWNhdGUgbGluZXNcbiAgICAgICAgICB2YXIgdGV4dE9sZCA9IHRleHQ7XG4gICAgICAgICAgdmFyIGxhc3RMaW5lO1xuICAgICAgICAgIHRleHQgPSBbXTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHRPbGQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0ZXh0T2xkW2ldICE9IGxhc3RMaW5lKSB7XG4gICAgICAgICAgICAgIHRleHQucHVzaCh0ZXh0T2xkW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RMaW5lID0gdGV4dE9sZFtpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY20ucmVwbGFjZVJhbmdlKHRleHQuam9pbignXFxuJyksIGN1clN0YXJ0LCBjdXJFbmQpO1xuICAgICAgfSxcbiAgICAgIHZnbG9iYWw6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgLy8gZ2xvYmFsIGluc3BlY3RzIHBhcmFtcy5jb21tYW5kTmFtZVxuICAgICAgICB0aGlzLmdsb2JhbChjbSwgcGFyYW1zKTtcbiAgICAgIH0sXG4gICAgICBnbG9iYWw6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgLy8gYSBnbG9iYWwgY29tbWFuZCBpcyBvZiB0aGUgZm9ybVxuICAgICAgICAvLyA6W3JhbmdlXWcvcGF0dGVybi9bY21kXVxuICAgICAgICAvLyBhcmdTdHJpbmcgaG9sZHMgdGhlIHN0cmluZyAvcGF0dGVybi9bY21kXVxuICAgICAgICB2YXIgYXJnU3RyaW5nID0gcGFyYW1zLmFyZ1N0cmluZztcbiAgICAgICAgaWYgKCFhcmdTdHJpbmcpIHtcbiAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ1JlZ3VsYXIgRXhwcmVzc2lvbiBtaXNzaW5nIGZyb20gZ2xvYmFsJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbnZlcnRlZCA9IHBhcmFtcy5jb21tYW5kTmFtZVswXSA9PT0gJ3YnO1xuICAgICAgICAvLyByYW5nZSBpcyBzcGVjaWZpZWQgaGVyZVxuICAgICAgICB2YXIgbGluZVN0YXJ0ID0gKHBhcmFtcy5saW5lICE9PSB1bmRlZmluZWQpID8gcGFyYW1zLmxpbmUgOiBjbS5maXJzdExpbmUoKTtcbiAgICAgICAgdmFyIGxpbmVFbmQgPSBwYXJhbXMubGluZUVuZCB8fCBwYXJhbXMubGluZSB8fCBjbS5sYXN0TGluZSgpO1xuICAgICAgICAvLyBnZXQgdGhlIHRva2VucyBmcm9tIGFyZ1N0cmluZ1xuICAgICAgICB2YXIgdG9rZW5zID0gc3BsaXRCeVNsYXNoKGFyZ1N0cmluZyk7XG4gICAgICAgIHZhciByZWdleFBhcnQgPSBhcmdTdHJpbmcsIGNtZDtcbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICByZWdleFBhcnQgPSB0b2tlbnNbMF07XG4gICAgICAgICAgY21kID0gdG9rZW5zLnNsaWNlKDEsIHRva2Vucy5sZW5ndGgpLmpvaW4oJy8nKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVnZXhQYXJ0KSB7XG4gICAgICAgICAgLy8gSWYgcmVnZXggcGFydCBpcyBlbXB0eSwgdGhlbiB1c2UgdGhlIHByZXZpb3VzIHF1ZXJ5LiBPdGhlcndpc2VcbiAgICAgICAgICAvLyB1c2UgdGhlIHJlZ2V4IHBhcnQgYXMgdGhlIG5ldyBxdWVyeS5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICB1cGRhdGVTZWFyY2hRdWVyeShjbSwgcmVnZXhQYXJ0LCB0cnVlIC8qKiBpZ25vcmVDYXNlICovLFxuICAgICAgICAgICAgIHRydWUgLyoqIHNtYXJ0Q2FzZSAqLyk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ0ludmFsaWQgcmVnZXg6ICcgKyByZWdleFBhcnQpO1xuICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIG5vdyB0aGF0IHdlIGhhdmUgdGhlIHJlZ2V4UGFydCwgc2VhcmNoIGZvciByZWdleCBtYXRjaGVzIGluIHRoZVxuICAgICAgICAvLyBzcGVjaWZpZWQgcmFuZ2Ugb2YgbGluZXNcbiAgICAgICAgdmFyIHF1ZXJ5ID0gZ2V0U2VhcmNoU3RhdGUoY20pLmdldFF1ZXJ5KCk7XG4gICAgICAgIHZhciBtYXRjaGVkTGluZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IGxpbmVTdGFydDsgaSA8PSBsaW5lRW5kOyBpKyspIHtcbiAgICAgICAgICB2YXIgbGluZSA9IGNtLmdldExpbmVIYW5kbGUoaSk7XG4gICAgICAgICAgdmFyIG1hdGNoZWQgPSBxdWVyeS50ZXN0KGxpbmUudGV4dCk7XG4gICAgICAgICAgaWYgKG1hdGNoZWQgIT09IGludmVydGVkKSB7XG4gICAgICAgICAgICBtYXRjaGVkTGluZXMucHVzaChjbWQgPyBsaW5lIDogbGluZS50ZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gW2NtZF0sIGp1c3QgZGlzcGxheSB0aGUgbGlzdCBvZiBtYXRjaGVkIGxpbmVzXG4gICAgICAgIGlmICghY21kKSB7XG4gICAgICAgICAgc2hvd0NvbmZpcm0oY20sIG1hdGNoZWRMaW5lcy5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHZhciBuZXh0Q29tbWFuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChpbmRleCA8IG1hdGNoZWRMaW5lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBsaW5lID0gbWF0Y2hlZExpbmVzW2luZGV4KytdO1xuICAgICAgICAgICAgdmFyIGxpbmVOdW0gPSBjbS5nZXRMaW5lTnVtYmVyKGxpbmUpO1xuICAgICAgICAgICAgaWYgKGxpbmVOdW0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICBuZXh0Q29tbWFuZCgpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY29tbWFuZCA9IChsaW5lTnVtICsgMSkgKyBjbWQ7XG4gICAgICAgICAgICBleENvbW1hbmREaXNwYXRjaGVyLnByb2Nlc3NDb21tYW5kKGNtLCBjb21tYW5kLCB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrOiBuZXh0Q29tbWFuZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBuZXh0Q29tbWFuZCgpO1xuICAgICAgfSxcbiAgICAgIHN1YnN0aXR1dGU6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgaWYgKCFjbS5nZXRTZWFyY2hDdXJzb3IpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1NlYXJjaCBmZWF0dXJlIG5vdCBhdmFpbGFibGUuIFJlcXVpcmVzIHNlYXJjaGN1cnNvci5qcyBvciAnICtcbiAgICAgICAgICAgICAgJ2FueSBvdGhlciBnZXRTZWFyY2hDdXJzb3IgaW1wbGVtZW50YXRpb24uJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFyZ1N0cmluZyA9IHBhcmFtcy5hcmdTdHJpbmc7XG4gICAgICAgIHZhciB0b2tlbnMgPSBhcmdTdHJpbmcgPyBzcGxpdEJ5U2VwYXJhdG9yKGFyZ1N0cmluZywgYXJnU3RyaW5nWzBdKSA6IFtdO1xuICAgICAgICB2YXIgcmVnZXhQYXJ0LCByZXBsYWNlUGFydCA9ICcnLCB0cmFpbGluZywgZmxhZ3NQYXJ0LCBjb3VudDtcbiAgICAgICAgdmFyIGNvbmZpcm0gPSBmYWxzZTsgLy8gV2hldGhlciB0byBjb25maXJtIGVhY2ggcmVwbGFjZS5cbiAgICAgICAgdmFyIGdsb2JhbCA9IGZhbHNlOyAvLyBUcnVlIHRvIHJlcGxhY2UgYWxsIGluc3RhbmNlcyBvbiBhIGxpbmUsIGZhbHNlIHRvIHJlcGxhY2Ugb25seSAxLlxuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCkge1xuICAgICAgICAgIHJlZ2V4UGFydCA9IHRva2Vuc1swXTtcbiAgICAgICAgICBpZiAoZ2V0T3B0aW9uKCdwY3JlJykgJiYgcmVnZXhQYXJ0ICE9PSAnJykge1xuICAgICAgICAgICAgICByZWdleFBhcnQgPSBuZXcgUmVnRXhwKHJlZ2V4UGFydCkuc291cmNlOyAvL25vcm1hbGl6ZSBub3QgZXNjYXBlZCBjaGFyYWN0ZXJzXG4gICAgICAgICAgfVxuICAgICAgICAgIHJlcGxhY2VQYXJ0ID0gdG9rZW5zWzFdO1xuICAgICAgICAgIGlmIChyZXBsYWNlUGFydCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZiAoZ2V0T3B0aW9uKCdwY3JlJykpIHtcbiAgICAgICAgICAgICAgcmVwbGFjZVBhcnQgPSB1bmVzY2FwZVJlZ2V4UmVwbGFjZShyZXBsYWNlUGFydC5yZXBsYWNlKC8oW15cXFxcXSkmL2csXCIkMSQkJlwiKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXBsYWNlUGFydCA9IHRyYW5zbGF0ZVJlZ2V4UmVwbGFjZShyZXBsYWNlUGFydCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5sYXN0U3Vic3RpdHV0ZVJlcGxhY2VQYXJ0ID0gcmVwbGFjZVBhcnQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRyYWlsaW5nID0gdG9rZW5zWzJdID8gdG9rZW5zWzJdLnNwbGl0KCcgJykgOiBbXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBlaXRoZXIgdGhlIGFyZ1N0cmluZyBpcyBlbXB0eSBvciBpdHMgb2YgdGhlIGZvcm0gJyBoZWxsby93b3JsZCdcbiAgICAgICAgICAvLyBhY3R1YWxseSBzcGxpdEJ5U2xhc2ggcmV0dXJucyBhIGxpc3Qgb2YgdG9rZW5zXG4gICAgICAgICAgLy8gb25seSBpZiB0aGUgc3RyaW5nIHN0YXJ0cyB3aXRoIGEgJy8nXG4gICAgICAgICAgaWYgKGFyZ1N0cmluZyAmJiBhcmdTdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ1N1YnN0aXR1dGlvbnMgc2hvdWxkIGJlIG9mIHRoZSBmb3JtICcgK1xuICAgICAgICAgICAgICAgICc6cy9wYXR0ZXJuL3JlcGxhY2UvJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIEFmdGVyIHRoZSAzcmQgc2xhc2gsIHdlIGNhbiBoYXZlIGZsYWdzIGZvbGxvd2VkIGJ5IGEgc3BhY2UgZm9sbG93ZWRcbiAgICAgICAgLy8gYnkgY291bnQuXG4gICAgICAgIGlmICh0cmFpbGluZykge1xuICAgICAgICAgIGZsYWdzUGFydCA9IHRyYWlsaW5nWzBdO1xuICAgICAgICAgIGNvdW50ID0gcGFyc2VJbnQodHJhaWxpbmdbMV0pO1xuICAgICAgICAgIGlmIChmbGFnc1BhcnQpIHtcbiAgICAgICAgICAgIGlmIChmbGFnc1BhcnQuaW5kZXhPZignYycpICE9IC0xKSB7XG4gICAgICAgICAgICAgIGNvbmZpcm0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGZsYWdzUGFydC5pbmRleE9mKCdnJykgIT0gLTEpIHtcbiAgICAgICAgICAgICAgZ2xvYmFsID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChnZXRPcHRpb24oJ3BjcmUnKSkge1xuICAgICAgICAgICAgICAgcmVnZXhQYXJ0ID0gcmVnZXhQYXJ0ICsgJy8nICsgZmxhZ3NQYXJ0O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgIHJlZ2V4UGFydCA9IHJlZ2V4UGFydC5yZXBsYWNlKC9cXC8vZywgXCJcXFxcL1wiKSArICcvJyArIGZsYWdzUGFydDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZ2V4UGFydCkge1xuICAgICAgICAgIC8vIElmIHJlZ2V4IHBhcnQgaXMgZW1wdHksIHRoZW4gdXNlIHRoZSBwcmV2aW91cyBxdWVyeS4gT3RoZXJ3aXNlIHVzZVxuICAgICAgICAgIC8vIHRoZSByZWdleCBwYXJ0IGFzIHRoZSBuZXcgcXVlcnkuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHVwZGF0ZVNlYXJjaFF1ZXJ5KGNtLCByZWdleFBhcnQsIHRydWUgLyoqIGlnbm9yZUNhc2UgKi8sXG4gICAgICAgICAgICAgIHRydWUgLyoqIHNtYXJ0Q2FzZSAqLyk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdJbnZhbGlkIHJlZ2V4OiAnICsgcmVnZXhQYXJ0KTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVwbGFjZVBhcnQgPSByZXBsYWNlUGFydCB8fCB2aW1HbG9iYWxTdGF0ZS5sYXN0U3Vic3RpdHV0ZVJlcGxhY2VQYXJ0O1xuICAgICAgICBpZiAocmVwbGFjZVBhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnTm8gcHJldmlvdXMgc3Vic3RpdHV0ZSByZWd1bGFyIGV4cHJlc3Npb24nKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0YXRlID0gZ2V0U2VhcmNoU3RhdGUoY20pO1xuICAgICAgICB2YXIgcXVlcnkgPSBzdGF0ZS5nZXRRdWVyeSgpO1xuICAgICAgICB2YXIgbGluZVN0YXJ0ID0gKHBhcmFtcy5saW5lICE9PSB1bmRlZmluZWQpID8gcGFyYW1zLmxpbmUgOiBjbS5nZXRDdXJzb3IoKS5saW5lO1xuICAgICAgICB2YXIgbGluZUVuZCA9IHBhcmFtcy5saW5lRW5kIHx8IGxpbmVTdGFydDtcbiAgICAgICAgaWYgKGxpbmVTdGFydCA9PSBjbS5maXJzdExpbmUoKSAmJiBsaW5lRW5kID09IGNtLmxhc3RMaW5lKCkpIHtcbiAgICAgICAgICBsaW5lRW5kID0gSW5maW5pdHk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvdW50KSB7XG4gICAgICAgICAgbGluZVN0YXJ0ID0gbGluZUVuZDtcbiAgICAgICAgICBsaW5lRW5kID0gbGluZVN0YXJ0ICsgY291bnQgLSAxO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdGFydFBvcyA9IGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIG5ldyBQb3MobGluZVN0YXJ0LCAwKSk7XG4gICAgICAgIHZhciBjdXJzb3IgPSBjbS5nZXRTZWFyY2hDdXJzb3IocXVlcnksIHN0YXJ0UG9zKTtcbiAgICAgICAgZG9SZXBsYWNlKGNtLCBjb25maXJtLCBnbG9iYWwsIGxpbmVTdGFydCwgbGluZUVuZCwgY3Vyc29yLCBxdWVyeSwgcmVwbGFjZVBhcnQsIHBhcmFtcy5jYWxsYmFjayk7XG4gICAgICB9LFxuICAgICAgcmVkbzogQ29kZU1pcnJvci5jb21tYW5kcy5yZWRvLFxuICAgICAgdW5kbzogQ29kZU1pcnJvci5jb21tYW5kcy51bmRvLFxuICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgIGlmIChDb2RlTWlycm9yLmNvbW1hbmRzLnNhdmUpIHtcbiAgICAgICAgICAvLyBJZiBhIHNhdmUgY29tbWFuZCBpcyBkZWZpbmVkLCBjYWxsIGl0LlxuICAgICAgICAgIENvZGVNaXJyb3IuY29tbWFuZHMuc2F2ZShjbSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY20uc2F2ZSkge1xuICAgICAgICAgIC8vIFNhdmVzIHRvIHRleHQgYXJlYSBpZiBubyBzYXZlIGNvbW1hbmQgaXMgZGVmaW5lZCBhbmQgY20uc2F2ZSgpIGlzIGF2YWlsYWJsZS5cbiAgICAgICAgICBjbS5zYXZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBub2hsc2VhcmNoOiBmdW5jdGlvbihjbSkge1xuICAgICAgICBjbGVhclNlYXJjaEhpZ2hsaWdodChjbSk7XG4gICAgICB9LFxuICAgICAgeWFuazogZnVuY3Rpb24gKGNtKSB7XG4gICAgICAgIHZhciBjdXIgPSBjb3B5Q3Vyc29yKGNtLmdldEN1cnNvcigpKTtcbiAgICAgICAgdmFyIGxpbmUgPSBjdXIubGluZTtcbiAgICAgICAgdmFyIGxpbmVUZXh0ID0gY20uZ2V0TGluZShsaW5lKTtcbiAgICAgICAgdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLnB1c2hUZXh0KFxuICAgICAgICAgICcwJywgJ3lhbmsnLCBsaW5lVGV4dCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICB9LFxuICAgICAgZGVsbWFya3M6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgaWYgKCFwYXJhbXMuYXJnU3RyaW5nIHx8ICF0cmltKHBhcmFtcy5hcmdTdHJpbmcpKSB7XG4gICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdBcmd1bWVudCByZXF1aXJlZCcpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdGF0ZSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgICAgdmFyIHN0cmVhbSA9IG5ldyBDb2RlTWlycm9yLlN0cmluZ1N0cmVhbSh0cmltKHBhcmFtcy5hcmdTdHJpbmcpKTtcbiAgICAgICAgd2hpbGUgKCFzdHJlYW0uZW9sKCkpIHtcbiAgICAgICAgICBzdHJlYW0uZWF0U3BhY2UoKTtcblxuICAgICAgICAgIC8vIFJlY29yZCB0aGUgc3RyZWFtcyBwb3NpdGlvbiBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBsb29wIGZvciB1c2VcbiAgICAgICAgICAvLyBpbiBlcnJvciBtZXNzYWdlcy5cbiAgICAgICAgICB2YXIgY291bnQgPSBzdHJlYW0ucG9zO1xuXG4gICAgICAgICAgaWYgKCFzdHJlYW0ubWF0Y2goL1thLXpBLVpdLywgZmFsc2UpKSB7XG4gICAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ0ludmFsaWQgYXJndW1lbnQ6ICcgKyBwYXJhbXMuYXJnU3RyaW5nLnN1YnN0cmluZyhjb3VudCkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBzeW0gPSBzdHJlYW0ubmV4dCgpO1xuICAgICAgICAgIC8vIENoZWNrIGlmIHRoaXMgc3ltYm9sIGlzIHBhcnQgb2YgYSByYW5nZVxuICAgICAgICAgIGlmIChzdHJlYW0ubWF0Y2goJy0nLCB0cnVlKSkge1xuICAgICAgICAgICAgLy8gVGhpcyBzeW1ib2wgaXMgcGFydCBvZiBhIHJhbmdlLlxuXG4gICAgICAgICAgICAvLyBUaGUgcmFuZ2UgbXVzdCB0ZXJtaW5hdGUgYXQgYW4gYWxwaGFiZXRpYyBjaGFyYWN0ZXIuXG4gICAgICAgICAgICBpZiAoIXN0cmVhbS5tYXRjaCgvW2EtekEtWl0vLCBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdJbnZhbGlkIGFyZ3VtZW50OiAnICsgcGFyYW1zLmFyZ1N0cmluZy5zdWJzdHJpbmcoY291bnQpKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgc3RhcnRNYXJrID0gc3ltO1xuICAgICAgICAgICAgdmFyIGZpbmlzaE1hcmsgPSBzdHJlYW0ubmV4dCgpO1xuICAgICAgICAgICAgLy8gVGhlIHJhbmdlIG11c3QgdGVybWluYXRlIGF0IGFuIGFscGhhYmV0aWMgY2hhcmFjdGVyIHdoaWNoXG4gICAgICAgICAgICAvLyBzaGFyZXMgdGhlIHNhbWUgY2FzZSBhcyB0aGUgc3RhcnQgb2YgdGhlIHJhbmdlLlxuICAgICAgICAgICAgaWYgKGlzTG93ZXJDYXNlKHN0YXJ0TWFyaykgJiYgaXNMb3dlckNhc2UoZmluaXNoTWFyaykgfHxcbiAgICAgICAgICAgICAgICBpc1VwcGVyQ2FzZShzdGFydE1hcmspICYmIGlzVXBwZXJDYXNlKGZpbmlzaE1hcmspKSB7XG4gICAgICAgICAgICAgIHZhciBzdGFydCA9IHN0YXJ0TWFyay5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgICB2YXIgZmluaXNoID0gZmluaXNoTWFyay5jaGFyQ29kZUF0KDApO1xuICAgICAgICAgICAgICBpZiAoc3RhcnQgPj0gZmluaXNoKSB7XG4gICAgICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdJbnZhbGlkIGFyZ3VtZW50OiAnICsgcGFyYW1zLmFyZ1N0cmluZy5zdWJzdHJpbmcoY291bnQpKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBCZWNhdXNlIG1hcmtzIGFyZSBhbHdheXMgQVNDSUkgdmFsdWVzLCBhbmQgd2UgaGF2ZVxuICAgICAgICAgICAgICAvLyBkZXRlcm1pbmVkIHRoYXQgdGhleSBhcmUgdGhlIHNhbWUgY2FzZSwgd2UgY2FuIHVzZVxuICAgICAgICAgICAgICAvLyB0aGVpciBjaGFyIGNvZGVzIHRvIGl0ZXJhdGUgdGhyb3VnaCB0aGUgZGVmaW5lZCByYW5nZS5cbiAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPD0gZmluaXNoIC0gc3RhcnQ7IGorKykge1xuICAgICAgICAgICAgICAgIHZhciBtYXJrID0gU3RyaW5nLmZyb21DaGFyQ29kZShzdGFydCArIGopO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBzdGF0ZS5tYXJrc1ttYXJrXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdJbnZhbGlkIGFyZ3VtZW50OiAnICsgc3RhcnRNYXJrICsgJy0nKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUaGlzIHN5bWJvbCBpcyBhIHZhbGlkIG1hcmssIGFuZCBpcyBub3QgcGFydCBvZiBhIHJhbmdlLlxuICAgICAgICAgICAgZGVsZXRlIHN0YXRlLm1hcmtzW3N5bV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBleENvbW1hbmREaXNwYXRjaGVyID0gbmV3IEV4Q29tbWFuZERpc3BhdGNoZXIoKTtcblxuICAgIC8qKlxuICAgICogQHBhcmFtIHtDb2RlTWlycm9yfSBjbSBDb2RlTWlycm9yIGluc3RhbmNlIHdlIGFyZSBpbi5cbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY29uZmlybSBXaGV0aGVyIHRvIGNvbmZpcm0gZWFjaCByZXBsYWNlLlxuICAgICogQHBhcmFtIHtDdXJzb3J9IGxpbmVTdGFydCBMaW5lIHRvIHN0YXJ0IHJlcGxhY2luZyBmcm9tLlxuICAgICogQHBhcmFtIHtDdXJzb3J9IGxpbmVFbmQgTGluZSB0byBzdG9wIHJlcGxhY2luZyBhdC5cbiAgICAqIEBwYXJhbSB7UmVnRXhwfSBxdWVyeSBRdWVyeSBmb3IgcGVyZm9ybWluZyBtYXRjaGVzIHdpdGguXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVwbGFjZVdpdGggVGV4dCB0byByZXBsYWNlIG1hdGNoZXMgd2l0aC4gTWF5IGNvbnRhaW4gJDEsXG4gICAgKiAgICAgJDIsIGV0YyBmb3IgcmVwbGFjaW5nIGNhcHR1cmVkIGdyb3VwcyB1c2luZyBKYXZhU2NyaXB0IHJlcGxhY2UuXG4gICAgKiBAcGFyYW0ge2Z1bmN0aW9uKCl9IGNhbGxiYWNrIEEgY2FsbGJhY2sgZm9yIHdoZW4gdGhlIHJlcGxhY2UgaXMgZG9uZS5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIGRvUmVwbGFjZShjbSwgY29uZmlybSwgZ2xvYmFsLCBsaW5lU3RhcnQsIGxpbmVFbmQsIHNlYXJjaEN1cnNvciwgcXVlcnksXG4gICAgICAgIHJlcGxhY2VXaXRoLCBjYWxsYmFjaykge1xuICAgICAgLy8gU2V0IHVwIGFsbCB0aGUgZnVuY3Rpb25zLlxuICAgICAgY20uc3RhdGUudmltLmV4TW9kZSA9IHRydWU7XG4gICAgICB2YXIgZG9uZSA9IGZhbHNlO1xuICAgICAgdmFyIGxhc3RQb3MsIG1vZGlmaWVkTGluZU51bWJlciwgam9pbmVkO1xuICAgICAgZnVuY3Rpb24gcmVwbGFjZUFsbCgpIHtcbiAgICAgICAgY20ub3BlcmF0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHdoaWxlICghZG9uZSkge1xuICAgICAgICAgICAgcmVwbGFjZSgpO1xuICAgICAgICAgICAgbmV4dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdG9wKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcmVwbGFjZSgpIHtcbiAgICAgICAgdmFyIHRleHQgPSBjbS5nZXRSYW5nZShzZWFyY2hDdXJzb3IuZnJvbSgpLCBzZWFyY2hDdXJzb3IudG8oKSk7XG4gICAgICAgIHZhciBuZXdUZXh0ID0gdGV4dC5yZXBsYWNlKHF1ZXJ5LCByZXBsYWNlV2l0aCk7XG4gICAgICAgIHZhciB1bm1vZGlmaWVkTGluZU51bWJlciA9IHNlYXJjaEN1cnNvci50bygpLmxpbmU7XG4gICAgICAgIHNlYXJjaEN1cnNvci5yZXBsYWNlKG5ld1RleHQpO1xuICAgICAgICBtb2RpZmllZExpbmVOdW1iZXIgPSBzZWFyY2hDdXJzb3IudG8oKS5saW5lO1xuICAgICAgICBsaW5lRW5kICs9IG1vZGlmaWVkTGluZU51bWJlciAtIHVubW9kaWZpZWRMaW5lTnVtYmVyO1xuICAgICAgICBqb2luZWQgPSBtb2RpZmllZExpbmVOdW1iZXIgPCB1bm1vZGlmaWVkTGluZU51bWJlcjtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGZpbmROZXh0VmFsaWRNYXRjaCgpIHtcbiAgICAgICAgdmFyIGxhc3RNYXRjaFRvID0gbGFzdFBvcyAmJiBjb3B5Q3Vyc29yKHNlYXJjaEN1cnNvci50bygpKTtcbiAgICAgICAgdmFyIG1hdGNoID0gc2VhcmNoQ3Vyc29yLmZpbmROZXh0KCk7XG4gICAgICAgIGlmIChtYXRjaCAmJiAhbWF0Y2hbMF0gJiYgbGFzdE1hdGNoVG8gJiYgY3Vyc29yRXF1YWwoc2VhcmNoQ3Vyc29yLmZyb20oKSwgbGFzdE1hdGNoVG8pKSB7XG4gICAgICAgICAgbWF0Y2ggPSBzZWFyY2hDdXJzb3IuZmluZE5leHQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF0Y2g7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBuZXh0KCkge1xuICAgICAgICAvLyBUaGUgYmVsb3cgb25seSBsb29wcyB0byBza2lwIG92ZXIgbXVsdGlwbGUgb2NjdXJyZW5jZXMgb24gdGhlIHNhbWVcbiAgICAgICAgLy8gbGluZSB3aGVuICdnbG9iYWwnIGlzIG5vdCB0cnVlLlxuICAgICAgICB3aGlsZShmaW5kTmV4dFZhbGlkTWF0Y2goKSAmJlxuICAgICAgICAgICAgICBpc0luUmFuZ2Uoc2VhcmNoQ3Vyc29yLmZyb20oKSwgbGluZVN0YXJ0LCBsaW5lRW5kKSkge1xuICAgICAgICAgIGlmICghZ2xvYmFsICYmIHNlYXJjaEN1cnNvci5mcm9tKCkubGluZSA9PSBtb2RpZmllZExpbmVOdW1iZXIgJiYgIWpvaW5lZCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNtLnNjcm9sbEludG9WaWV3KHNlYXJjaEN1cnNvci5mcm9tKCksIDMwKTtcbiAgICAgICAgICBjbS5zZXRTZWxlY3Rpb24oc2VhcmNoQ3Vyc29yLmZyb20oKSwgc2VhcmNoQ3Vyc29yLnRvKCkpO1xuICAgICAgICAgIGxhc3RQb3MgPSBzZWFyY2hDdXJzb3IuZnJvbSgpO1xuICAgICAgICAgIGRvbmUgPSBmYWxzZTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZG9uZSA9IHRydWU7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBzdG9wKGNsb3NlKSB7XG4gICAgICAgIGlmIChjbG9zZSkgeyBjbG9zZSgpOyB9XG4gICAgICAgIGNtLmZvY3VzKCk7XG4gICAgICAgIGlmIChsYXN0UG9zKSB7XG4gICAgICAgICAgY20uc2V0Q3Vyc29yKGxhc3RQb3MpO1xuICAgICAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICAgICAgdmltLmV4TW9kZSA9IGZhbHNlO1xuICAgICAgICAgIHZpbS5sYXN0SFBvcyA9IHZpbS5sYXN0SFNQb3MgPSBsYXN0UG9zLmNoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjYWxsYmFjaykgeyBjYWxsYmFjaygpOyB9XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBvblByb21wdEtleURvd24oZSwgX3ZhbHVlLCBjbG9zZSkge1xuICAgICAgICAvLyBTd2FsbG93IGFsbCBrZXlzLlxuICAgICAgICBDb2RlTWlycm9yLmVfc3RvcChlKTtcbiAgICAgICAgdmFyIGtleU5hbWUgPSBDb2RlTWlycm9yLmtleU5hbWUoZSk7XG4gICAgICAgIHN3aXRjaCAoa2V5TmFtZSkge1xuICAgICAgICAgIGNhc2UgJ1knOlxuICAgICAgICAgICAgcmVwbGFjZSgpOyBuZXh0KCk7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ04nOlxuICAgICAgICAgICAgbmV4dCgpOyBicmVhaztcbiAgICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICAgIC8vIHJlcGxhY2VBbGwgY29udGFpbnMgYSBjYWxsIHRvIGNsb3NlIG9mIGl0cyBvd24uIFdlIGRvbid0IHdhbnQgaXRcbiAgICAgICAgICAgIC8vIHRvIGZpcmUgdG9vIGVhcmx5IG9yIG11bHRpcGxlIHRpbWVzLlxuICAgICAgICAgICAgdmFyIHNhdmVkQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgICAgIGNhbGxiYWNrID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY20ub3BlcmF0aW9uKHJlcGxhY2VBbGwpO1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBzYXZlZENhbGxiYWNrO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnTCc6XG4gICAgICAgICAgICByZXBsYWNlKCk7XG4gICAgICAgICAgICAvLyBmYWxsIHRocm91Z2ggYW5kIGV4aXQuXG4gICAgICAgICAgY2FzZSAnUSc6XG4gICAgICAgICAgY2FzZSAnRXNjJzpcbiAgICAgICAgICBjYXNlICdDdHJsLUMnOlxuICAgICAgICAgIGNhc2UgJ0N0cmwtWyc6XG4gICAgICAgICAgICBzdG9wKGNsb3NlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmIChkb25lKSB7IHN0b3AoY2xvc2UpOyB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBBY3R1YWxseSBkbyByZXBsYWNlLlxuICAgICAgbmV4dCgpO1xuICAgICAgaWYgKGRvbmUpIHtcbiAgICAgICAgc2hvd0NvbmZpcm0oY20sICdObyBtYXRjaGVzIGZvciAnICsgcXVlcnkuc291cmNlKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFjb25maXJtKSB7XG4gICAgICAgIHJlcGxhY2VBbGwoKTtcbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7IGNhbGxiYWNrKCk7IH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgc2hvd1Byb21wdChjbSwge1xuICAgICAgICBwcmVmaXg6IGRvbSgnc3BhbicsICdyZXBsYWNlIHdpdGggJywgZG9tKCdzdHJvbmcnLCByZXBsYWNlV2l0aCksICcgKHkvbi9hL3EvbCknKSxcbiAgICAgICAgb25LZXlEb3duOiBvblByb21wdEtleURvd25cbiAgICAgIH0pO1xuICAgIH1cblxuICAgIENvZGVNaXJyb3Iua2V5TWFwLnZpbSA9IHtcbiAgICAgIGF0dGFjaDogYXR0YWNoVmltTWFwLFxuICAgICAgZGV0YWNoOiBkZXRhY2hWaW1NYXAsXG4gICAgICBjYWxsOiBjbUtleVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBleGl0SW5zZXJ0TW9kZShjbSkge1xuICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgIHZhciBtYWNyb01vZGVTdGF0ZSA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlO1xuICAgICAgdmFyIGluc2VydE1vZGVDaGFuZ2VSZWdpc3RlciA9IHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5nZXRSZWdpc3RlcignLicpO1xuICAgICAgdmFyIGlzUGxheWluZyA9IG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZztcbiAgICAgIHZhciBsYXN0Q2hhbmdlID0gbWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzO1xuICAgICAgaWYgKCFpc1BsYXlpbmcpIHtcbiAgICAgICAgY20ub2ZmKCdjaGFuZ2UnLCBvbkNoYW5nZSk7XG4gICAgICAgIENvZGVNaXJyb3Iub2ZmKGNtLmdldElucHV0RmllbGQoKSwgJ2tleWRvd24nLCBvbktleUV2ZW50VGFyZ2V0S2V5RG93bik7XG4gICAgICB9XG4gICAgICBpZiAoIWlzUGxheWluZyAmJiB2aW0uaW5zZXJ0TW9kZVJlcGVhdCA+IDEpIHtcbiAgICAgICAgLy8gUGVyZm9ybSBpbnNlcnQgbW9kZSByZXBlYXQgZm9yIGNvbW1hbmRzIGxpa2UgMyxhIGFuZCAzLG8uXG4gICAgICAgIHJlcGVhdExhc3RFZGl0KGNtLCB2aW0sIHZpbS5pbnNlcnRNb2RlUmVwZWF0IC0gMSxcbiAgICAgICAgICAgIHRydWUgLyoqIHJlcGVhdEZvckluc2VydCAqLyk7XG4gICAgICAgIHZpbS5sYXN0RWRpdElucHV0U3RhdGUucmVwZWF0T3ZlcnJpZGUgPSB2aW0uaW5zZXJ0TW9kZVJlcGVhdDtcbiAgICAgIH1cbiAgICAgIGRlbGV0ZSB2aW0uaW5zZXJ0TW9kZVJlcGVhdDtcbiAgICAgIHZpbS5pbnNlcnRNb2RlID0gZmFsc2U7XG4gICAgICBjbS5zZXRDdXJzb3IoY20uZ2V0Q3Vyc29yKCkubGluZSwgY20uZ2V0Q3Vyc29yKCkuY2gtMSk7XG4gICAgICBjbS5zZXRPcHRpb24oJ2tleU1hcCcsICd2aW0nKTtcbiAgICAgIGNtLnNldE9wdGlvbignZGlzYWJsZUlucHV0JywgdHJ1ZSk7XG4gICAgICBjbS50b2dnbGVPdmVyd3JpdGUoZmFsc2UpOyAvLyBleGl0IHJlcGxhY2UgbW9kZSBpZiB3ZSB3ZXJlIGluIGl0LlxuICAgICAgLy8gdXBkYXRlIHRoZSBcIi4gcmVnaXN0ZXIgYmVmb3JlIGV4aXRpbmcgaW5zZXJ0IG1vZGVcbiAgICAgIGluc2VydE1vZGVDaGFuZ2VSZWdpc3Rlci5zZXRUZXh0KGxhc3RDaGFuZ2UuY2hhbmdlcy5qb2luKCcnKSk7XG4gICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwge21vZGU6IFwibm9ybWFsXCJ9KTtcbiAgICAgIGlmIChtYWNyb01vZGVTdGF0ZS5pc1JlY29yZGluZykge1xuICAgICAgICBsb2dJbnNlcnRNb2RlQ2hhbmdlKG1hY3JvTW9kZVN0YXRlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfbWFwQ29tbWFuZChjb21tYW5kKSB7XG4gICAgICBkZWZhdWx0S2V5bWFwLnVuc2hpZnQoY29tbWFuZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFwQ29tbWFuZChrZXlzLCB0eXBlLCBuYW1lLCBhcmdzLCBleHRyYSkge1xuICAgICAgdmFyIGNvbW1hbmQgPSB7a2V5czoga2V5cywgdHlwZTogdHlwZX07XG4gICAgICBjb21tYW5kW3R5cGVdID0gbmFtZTtcbiAgICAgIGNvbW1hbmRbdHlwZSArIFwiQXJnc1wiXSA9IGFyZ3M7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gZXh0cmEpXG4gICAgICAgIGNvbW1hbmRba2V5XSA9IGV4dHJhW2tleV07XG4gICAgICBfbWFwQ29tbWFuZChjb21tYW5kKTtcbiAgICB9XG5cbiAgICAvLyBUaGUgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0d28tY2hhcmFjdGVyIEVTQyBrZXltYXAgc2hvdWxkIGJlXG4gICAgLy8gYWRqdXN0ZWQgYWNjb3JkaW5nIHRvIHlvdXIgdHlwaW5nIHNwZWVkIHRvIHByZXZlbnQgZmFsc2UgcG9zaXRpdmVzLlxuICAgIGRlZmluZU9wdGlvbignaW5zZXJ0TW9kZUVzY0tleXNUaW1lb3V0JywgMjAwLCAnbnVtYmVyJyk7XG5cbiAgICBDb2RlTWlycm9yLmtleU1hcFsndmltLWluc2VydCddID0ge1xuICAgICAgLy8gVE9ETzogb3ZlcnJpZGUgbmF2aWdhdGlvbiBrZXlzIHNvIHRoYXQgRXNjIHdpbGwgY2FuY2VsIGF1dG9tYXRpY1xuICAgICAgLy8gaW5kZW50YXRpb24gZnJvbSBvLCBPLCBpXzxDUj5cbiAgICAgIGZhbGx0aHJvdWdoOiBbJ2RlZmF1bHQnXSxcbiAgICAgIGF0dGFjaDogYXR0YWNoVmltTWFwLFxuICAgICAgZGV0YWNoOiBkZXRhY2hWaW1NYXAsXG4gICAgICBjYWxsOiBjbUtleVxuICAgIH07XG5cbiAgICBDb2RlTWlycm9yLmtleU1hcFsndmltLXJlcGxhY2UnXSA9IHtcbiAgICAgICdCYWNrc3BhY2UnOiAnZ29DaGFyTGVmdCcsXG4gICAgICBmYWxsdGhyb3VnaDogWyd2aW0taW5zZXJ0J10sXG4gICAgICBhdHRhY2g6IGF0dGFjaFZpbU1hcCxcbiAgICAgIGRldGFjaDogZGV0YWNoVmltTWFwLFxuICAgICAgY2FsbDogY21LZXlcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZXhlY3V0ZU1hY3JvUmVnaXN0ZXIoY20sIHZpbSwgbWFjcm9Nb2RlU3RhdGUsIHJlZ2lzdGVyTmFtZSkge1xuICAgICAgdmFyIHJlZ2lzdGVyID0gdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmdldFJlZ2lzdGVyKHJlZ2lzdGVyTmFtZSk7XG4gICAgICBpZiAocmVnaXN0ZXJOYW1lID09ICc6Jykge1xuICAgICAgICAvLyBSZWFkLW9ubHkgcmVnaXN0ZXIgY29udGFpbmluZyBsYXN0IEV4IGNvbW1hbmQuXG4gICAgICAgIGlmIChyZWdpc3Rlci5rZXlCdWZmZXJbMF0pIHtcbiAgICAgICAgICBleENvbW1hbmREaXNwYXRjaGVyLnByb2Nlc3NDb21tYW5kKGNtLCByZWdpc3Rlci5rZXlCdWZmZXJbMF0pO1xuICAgICAgICB9XG4gICAgICAgIG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIga2V5QnVmZmVyID0gcmVnaXN0ZXIua2V5QnVmZmVyO1xuICAgICAgdmFyIGltYyA9IDA7XG4gICAgICBtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmcgPSB0cnVlO1xuICAgICAgbWFjcm9Nb2RlU3RhdGUucmVwbGF5U2VhcmNoUXVlcmllcyA9IHJlZ2lzdGVyLnNlYXJjaFF1ZXJpZXMuc2xpY2UoMCk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleUJ1ZmZlci5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdGV4dCA9IGtleUJ1ZmZlcltpXTtcbiAgICAgICAgdmFyIG1hdGNoLCBrZXk7XG4gICAgICAgIHdoaWxlICh0ZXh0KSB7XG4gICAgICAgICAgLy8gUHVsbCBvZmYgb25lIGNvbW1hbmQga2V5LCB3aGljaCBpcyBlaXRoZXIgYSBzaW5nbGUgY2hhcmFjdGVyXG4gICAgICAgICAgLy8gb3IgYSBzcGVjaWFsIHNlcXVlbmNlIHdyYXBwZWQgaW4gJzwnIGFuZCAnPicsIGUuZy4gJzxTcGFjZT4nLlxuICAgICAgICAgIG1hdGNoID0gKC88XFx3Ky0uKz8+fDxcXHcrPnwuLykuZXhlYyh0ZXh0KTtcbiAgICAgICAgICBrZXkgPSBtYXRjaFswXTtcbiAgICAgICAgICB0ZXh0ID0gdGV4dC5zdWJzdHJpbmcobWF0Y2guaW5kZXggKyBrZXkubGVuZ3RoKTtcbiAgICAgICAgICB2aW1BcGkuaGFuZGxlS2V5KGNtLCBrZXksICdtYWNybycpO1xuICAgICAgICAgIGlmICh2aW0uaW5zZXJ0TW9kZSkge1xuICAgICAgICAgICAgdmFyIGNoYW5nZXMgPSByZWdpc3Rlci5pbnNlcnRNb2RlQ2hhbmdlc1tpbWMrK10uY2hhbmdlcztcbiAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcy5jaGFuZ2VzID1cbiAgICAgICAgICAgICAgICBjaGFuZ2VzO1xuICAgICAgICAgICAgcmVwZWF0SW5zZXJ0TW9kZUNoYW5nZXMoY20sIGNoYW5nZXMsIDEpO1xuICAgICAgICAgICAgZXhpdEluc2VydE1vZGUoY20pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nS2V5KG1hY3JvTW9kZVN0YXRlLCBrZXkpIHtcbiAgICAgIGlmIChtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmcpIHsgcmV0dXJuOyB9XG4gICAgICB2YXIgcmVnaXN0ZXJOYW1lID0gbWFjcm9Nb2RlU3RhdGUubGF0ZXN0UmVnaXN0ZXI7XG4gICAgICB2YXIgcmVnaXN0ZXIgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIuZ2V0UmVnaXN0ZXIocmVnaXN0ZXJOYW1lKTtcbiAgICAgIGlmIChyZWdpc3Rlcikge1xuICAgICAgICByZWdpc3Rlci5wdXNoVGV4dChrZXkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ0luc2VydE1vZGVDaGFuZ2UobWFjcm9Nb2RlU3RhdGUpIHtcbiAgICAgIGlmIChtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmcpIHsgcmV0dXJuOyB9XG4gICAgICB2YXIgcmVnaXN0ZXJOYW1lID0gbWFjcm9Nb2RlU3RhdGUubGF0ZXN0UmVnaXN0ZXI7XG4gICAgICB2YXIgcmVnaXN0ZXIgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIuZ2V0UmVnaXN0ZXIocmVnaXN0ZXJOYW1lKTtcbiAgICAgIGlmIChyZWdpc3RlciAmJiByZWdpc3Rlci5wdXNoSW5zZXJ0TW9kZUNoYW5nZXMpIHtcbiAgICAgICAgcmVnaXN0ZXIucHVzaEluc2VydE1vZGVDaGFuZ2VzKG1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nU2VhcmNoUXVlcnkobWFjcm9Nb2RlU3RhdGUsIHF1ZXJ5KSB7XG4gICAgICBpZiAobWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nKSB7IHJldHVybjsgfVxuICAgICAgdmFyIHJlZ2lzdGVyTmFtZSA9IG1hY3JvTW9kZVN0YXRlLmxhdGVzdFJlZ2lzdGVyO1xuICAgICAgdmFyIHJlZ2lzdGVyID0gdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmdldFJlZ2lzdGVyKHJlZ2lzdGVyTmFtZSk7XG4gICAgICBpZiAocmVnaXN0ZXIgJiYgcmVnaXN0ZXIucHVzaFNlYXJjaFF1ZXJ5KSB7XG4gICAgICAgIHJlZ2lzdGVyLnB1c2hTZWFyY2hRdWVyeShxdWVyeSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTGlzdGVucyBmb3IgY2hhbmdlcyBtYWRlIGluIGluc2VydCBtb2RlLlxuICAgICAqIFNob3VsZCBvbmx5IGJlIGFjdGl2ZSBpbiBpbnNlcnQgbW9kZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBvbkNoYW5nZShjbSwgY2hhbmdlT2JqKSB7XG4gICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgIHZhciBsYXN0Q2hhbmdlID0gbWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzO1xuICAgICAgaWYgKCFtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmcpIHtcbiAgICAgICAgd2hpbGUoY2hhbmdlT2JqKSB7XG4gICAgICAgICAgbGFzdENoYW5nZS5leHBlY3RDdXJzb3JBY3Rpdml0eUZvckNoYW5nZSA9IHRydWU7XG4gICAgICAgICAgaWYgKGxhc3RDaGFuZ2UuaWdub3JlQ291bnQgPiAxKSB7XG4gICAgICAgICAgICBsYXN0Q2hhbmdlLmlnbm9yZUNvdW50LS07XG4gICAgICAgICAgfSBlbHNlIGlmIChjaGFuZ2VPYmoub3JpZ2luID09ICcraW5wdXQnIHx8IGNoYW5nZU9iai5vcmlnaW4gPT0gJ3Bhc3RlJ1xuICAgICAgICAgICAgICB8fCBjaGFuZ2VPYmoub3JpZ2luID09PSB1bmRlZmluZWQgLyogb25seSBpbiB0ZXN0aW5nICovKSB7XG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uQ291bnQgPSBjbS5saXN0U2VsZWN0aW9ucygpLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChzZWxlY3Rpb25Db3VudCA+IDEpXG4gICAgICAgICAgICAgIGxhc3RDaGFuZ2UuaWdub3JlQ291bnQgPSBzZWxlY3Rpb25Db3VudDtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gY2hhbmdlT2JqLnRleHQuam9pbignXFxuJyk7XG4gICAgICAgICAgICBpZiAobGFzdENoYW5nZS5tYXliZVJlc2V0KSB7XG4gICAgICAgICAgICAgIGxhc3RDaGFuZ2UuY2hhbmdlcyA9IFtdO1xuICAgICAgICAgICAgICBsYXN0Q2hhbmdlLm1heWJlUmVzZXQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0ZXh0KSB7XG4gICAgICAgICAgICAgIGlmIChjbS5zdGF0ZS5vdmVyd3JpdGUgJiYgIS9cXG4vLnRlc3QodGV4dCkpIHtcbiAgICAgICAgICAgICAgICBsYXN0Q2hhbmdlLmNoYW5nZXMucHVzaChbdGV4dF0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxhc3RDaGFuZ2UuY2hhbmdlcy5wdXNoKHRleHQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIENoYW5nZSBvYmplY3RzIG1heSBiZSBjaGFpbmVkIHdpdGggbmV4dC5cbiAgICAgICAgICBjaGFuZ2VPYmogPSBjaGFuZ2VPYmoubmV4dDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICogTGlzdGVucyBmb3IgYW55IGtpbmQgb2YgY3Vyc29yIGFjdGl2aXR5IG9uIENvZGVNaXJyb3IuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBvbkN1cnNvckFjdGl2aXR5KGNtKSB7XG4gICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgaWYgKHZpbS5pbnNlcnRNb2RlKSB7XG4gICAgICAgIC8vIFRyYWNraW5nIGN1cnNvciBhY3Rpdml0eSBpbiBpbnNlcnQgbW9kZSAoZm9yIG1hY3JvIHN1cHBvcnQpLlxuICAgICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgICAgaWYgKG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZykgeyByZXR1cm47IH1cbiAgICAgICAgdmFyIGxhc3RDaGFuZ2UgPSBtYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXM7XG4gICAgICAgIGlmIChsYXN0Q2hhbmdlLmV4cGVjdEN1cnNvckFjdGl2aXR5Rm9yQ2hhbmdlKSB7XG4gICAgICAgICAgbGFzdENoYW5nZS5leHBlY3RDdXJzb3JBY3Rpdml0eUZvckNoYW5nZSA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEN1cnNvciBtb3ZlZCBvdXRzaWRlIHRoZSBjb250ZXh0IG9mIGFuIGVkaXQuIFJlc2V0IHRoZSBjaGFuZ2UuXG4gICAgICAgICAgbGFzdENoYW5nZS5tYXliZVJlc2V0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICghY20uY3VyT3AuaXNWaW1PcCkge1xuICAgICAgICBoYW5kbGVFeHRlcm5hbFNlbGVjdGlvbihjbSwgdmltKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gaGFuZGxlRXh0ZXJuYWxTZWxlY3Rpb24oY20sIHZpbSwga2VlcEhQb3MpIHtcbiAgICAgIHZhciBhbmNob3IgPSBjbS5nZXRDdXJzb3IoJ2FuY2hvcicpO1xuICAgICAgdmFyIGhlYWQgPSBjbS5nZXRDdXJzb3IoJ2hlYWQnKTtcbiAgICAgIC8vIEVudGVyIG9yIGV4aXQgdmlzdWFsIG1vZGUgdG8gbWF0Y2ggbW91c2Ugc2VsZWN0aW9uLlxuICAgICAgaWYgKHZpbS52aXN1YWxNb2RlICYmICFjbS5zb21ldGhpbmdTZWxlY3RlZCgpKSB7XG4gICAgICAgIGV4aXRWaXN1YWxNb2RlKGNtLCBmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKCF2aW0udmlzdWFsTW9kZSAmJiAhdmltLmluc2VydE1vZGUgJiYgY20uc29tZXRoaW5nU2VsZWN0ZWQoKSkge1xuICAgICAgICB2aW0udmlzdWFsTW9kZSA9IHRydWU7XG4gICAgICAgIHZpbS52aXN1YWxMaW5lID0gZmFsc2U7XG4gICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJ2aXN1YWxcIn0pO1xuICAgICAgfVxuICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgIC8vIEJpbmQgQ29kZU1pcnJvciBzZWxlY3Rpb24gbW9kZWwgdG8gdmltIHNlbGVjdGlvbiBtb2RlbC5cbiAgICAgICAgLy8gTW91c2Ugc2VsZWN0aW9ucyBhcmUgY29uc2lkZXJlZCB2aXN1YWwgY2hhcmFjdGVyd2lzZS5cbiAgICAgICAgdmFyIGhlYWRPZmZzZXQgPSAhY3Vyc29ySXNCZWZvcmUoaGVhZCwgYW5jaG9yKSA/IC0xIDogMDtcbiAgICAgICAgdmFyIGFuY2hvck9mZnNldCA9IGN1cnNvcklzQmVmb3JlKGhlYWQsIGFuY2hvcikgPyAtMSA6IDA7XG4gICAgICAgIGhlYWQgPSBvZmZzZXRDdXJzb3IoaGVhZCwgMCwgaGVhZE9mZnNldCk7XG4gICAgICAgIGFuY2hvciA9IG9mZnNldEN1cnNvcihhbmNob3IsIDAsIGFuY2hvck9mZnNldCk7XG4gICAgICAgIHZpbS5zZWwgPSB7XG4gICAgICAgICAgYW5jaG9yOiBhbmNob3IsXG4gICAgICAgICAgaGVhZDogaGVhZFxuICAgICAgICB9O1xuICAgICAgICB1cGRhdGVNYXJrKGNtLCB2aW0sICc8JywgY3Vyc29yTWluKGhlYWQsIGFuY2hvcikpO1xuICAgICAgICB1cGRhdGVNYXJrKGNtLCB2aW0sICc+JywgY3Vyc29yTWF4KGhlYWQsIGFuY2hvcikpO1xuICAgICAgfSBlbHNlIGlmICghdmltLmluc2VydE1vZGUgJiYgIWtlZXBIUG9zKSB7XG4gICAgICAgIC8vIFJlc2V0IGxhc3RIUG9zIGlmIHNlbGVjdGlvbiB3YXMgbW9kaWZpZWQgYnkgc29tZXRoaW5nIG91dHNpZGUgb2YgdmltIG1vZGUgZS5nLiBieSBtb3VzZS5cbiAgICAgICAgdmltLmxhc3RIUG9zID0gY20uZ2V0Q3Vyc29yKCkuY2g7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFdyYXBwZXIgZm9yIHNwZWNpYWwga2V5cyBwcmVzc2VkIGluIGluc2VydCBtb2RlICovXG4gICAgZnVuY3Rpb24gSW5zZXJ0TW9kZUtleShrZXlOYW1lKSB7XG4gICAgICB0aGlzLmtleU5hbWUgPSBrZXlOYW1lO1xuICAgIH1cblxuICAgIC8qKlxuICAgICogSGFuZGxlcyByYXcga2V5IGRvd24gZXZlbnRzIGZyb20gdGhlIHRleHQgYXJlYS5cbiAgICAqIC0gU2hvdWxkIG9ubHkgYmUgYWN0aXZlIGluIGluc2VydCBtb2RlLlxuICAgICogLSBGb3IgcmVjb3JkaW5nIGRlbGV0ZXMgaW4gaW5zZXJ0IG1vZGUuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBvbktleUV2ZW50VGFyZ2V0S2V5RG93bihlKSB7XG4gICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgIHZhciBsYXN0Q2hhbmdlID0gbWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzO1xuICAgICAgdmFyIGtleU5hbWUgPSBDb2RlTWlycm9yLmtleU5hbWUoZSk7XG4gICAgICBpZiAoIWtleU5hbWUpIHsgcmV0dXJuOyB9XG4gICAgICBmdW5jdGlvbiBvbktleUZvdW5kKCkge1xuICAgICAgICBpZiAobGFzdENoYW5nZS5tYXliZVJlc2V0KSB7XG4gICAgICAgICAgbGFzdENoYW5nZS5jaGFuZ2VzID0gW107XG4gICAgICAgICAgbGFzdENoYW5nZS5tYXliZVJlc2V0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdENoYW5nZS5jaGFuZ2VzLnB1c2gobmV3IEluc2VydE1vZGVLZXkoa2V5TmFtZSkpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChrZXlOYW1lLmluZGV4T2YoJ0RlbGV0ZScpICE9IC0xIHx8IGtleU5hbWUuaW5kZXhPZignQmFja3NwYWNlJykgIT0gLTEpIHtcbiAgICAgICAgQ29kZU1pcnJvci5sb29rdXBLZXkoa2V5TmFtZSwgJ3ZpbS1pbnNlcnQnLCBvbktleUZvdW5kKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXBlYXRzIHRoZSBsYXN0IGVkaXQsIHdoaWNoIGluY2x1ZGVzIGV4YWN0bHkgMSBjb21tYW5kIGFuZCBhdCBtb3N0IDFcbiAgICAgKiBpbnNlcnQuIE9wZXJhdG9yIGFuZCBtb3Rpb24gY29tbWFuZHMgYXJlIHJlYWQgZnJvbSBsYXN0RWRpdElucHV0U3RhdGUsXG4gICAgICogd2hpbGUgYWN0aW9uIGNvbW1hbmRzIGFyZSByZWFkIGZyb20gbGFzdEVkaXRBY3Rpb25Db21tYW5kLlxuICAgICAqXG4gICAgICogSWYgcmVwZWF0Rm9ySW5zZXJ0IGlzIHRydWUsIHRoZW4gdGhlIGZ1bmN0aW9uIHdhcyBjYWxsZWQgYnlcbiAgICAgKiBleGl0SW5zZXJ0TW9kZSB0byByZXBlYXQgdGhlIGluc2VydCBtb2RlIGNoYW5nZXMgdGhlIHVzZXIganVzdCBtYWRlLiBUaGVcbiAgICAgKiBjb3JyZXNwb25kaW5nIGVudGVySW5zZXJ0TW9kZSBjYWxsIHdhcyBtYWRlIHdpdGggYSBjb3VudC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiByZXBlYXRMYXN0RWRpdChjbSwgdmltLCByZXBlYXQsIHJlcGVhdEZvckluc2VydCkge1xuICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICBtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmcgPSB0cnVlO1xuICAgICAgdmFyIGlzQWN0aW9uID0gISF2aW0ubGFzdEVkaXRBY3Rpb25Db21tYW5kO1xuICAgICAgdmFyIGNhY2hlZElucHV0U3RhdGUgPSB2aW0uaW5wdXRTdGF0ZTtcbiAgICAgIGZ1bmN0aW9uIHJlcGVhdENvbW1hbmQoKSB7XG4gICAgICAgIGlmIChpc0FjdGlvbikge1xuICAgICAgICAgIGNvbW1hbmREaXNwYXRjaGVyLnByb2Nlc3NBY3Rpb24oY20sIHZpbSwgdmltLmxhc3RFZGl0QWN0aW9uQ29tbWFuZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tbWFuZERpc3BhdGNoZXIuZXZhbElucHV0KGNtLCB2aW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiByZXBlYXRJbnNlcnQocmVwZWF0KSB7XG4gICAgICAgIGlmIChtYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXMuY2hhbmdlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgLy8gRm9yIHNvbWUgcmVhc29uLCByZXBlYXQgY3cgaW4gZGVza3RvcCBWSU0gZG9lcyBub3QgcmVwZWF0XG4gICAgICAgICAgLy8gaW5zZXJ0IG1vZGUgY2hhbmdlcy4gV2lsbCBjb25mb3JtIHRvIHRoYXQgYmVoYXZpb3IuXG4gICAgICAgICAgcmVwZWF0ID0gIXZpbS5sYXN0RWRpdEFjdGlvbkNvbW1hbmQgPyAxIDogcmVwZWF0O1xuICAgICAgICAgIHZhciBjaGFuZ2VPYmplY3QgPSBtYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXM7XG4gICAgICAgICAgcmVwZWF0SW5zZXJ0TW9kZUNoYW5nZXMoY20sIGNoYW5nZU9iamVjdC5jaGFuZ2VzLCByZXBlYXQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2aW0uaW5wdXRTdGF0ZSA9IHZpbS5sYXN0RWRpdElucHV0U3RhdGU7XG4gICAgICBpZiAoaXNBY3Rpb24gJiYgdmltLmxhc3RFZGl0QWN0aW9uQ29tbWFuZC5pbnRlcmxhY2VJbnNlcnRSZXBlYXQpIHtcbiAgICAgICAgLy8gbyBhbmQgTyByZXBlYXQgaGF2ZSB0byBiZSBpbnRlcmxhY2VkIHdpdGggaW5zZXJ0IHJlcGVhdHMgc28gdGhhdCB0aGVcbiAgICAgICAgLy8gaW5zZXJ0aW9ucyBhcHBlYXIgb24gc2VwYXJhdGUgbGluZXMgaW5zdGVhZCBvZiB0aGUgbGFzdCBsaW5lLlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcGVhdDsgaSsrKSB7XG4gICAgICAgICAgcmVwZWF0Q29tbWFuZCgpO1xuICAgICAgICAgIHJlcGVhdEluc2VydCgxKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFyZXBlYXRGb3JJbnNlcnQpIHtcbiAgICAgICAgICAvLyBIYWNrIHRvIGdldCB0aGUgY3Vyc29yIHRvIGVuZCB1cCBhdCB0aGUgcmlnaHQgcGxhY2UuIElmIEkgaXNcbiAgICAgICAgICAvLyByZXBlYXRlZCBpbiBpbnNlcnQgbW9kZSByZXBlYXQsIGN1cnNvciB3aWxsIGJlIDEgaW5zZXJ0XG4gICAgICAgICAgLy8gY2hhbmdlIHNldCBsZWZ0IG9mIHdoZXJlIGl0IHNob3VsZCBiZS5cbiAgICAgICAgICByZXBlYXRDb21tYW5kKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmVwZWF0SW5zZXJ0KHJlcGVhdCk7XG4gICAgICB9XG4gICAgICB2aW0uaW5wdXRTdGF0ZSA9IGNhY2hlZElucHV0U3RhdGU7XG4gICAgICBpZiAodmltLmluc2VydE1vZGUgJiYgIXJlcGVhdEZvckluc2VydCkge1xuICAgICAgICAvLyBEb24ndCBleGl0IGluc2VydCBtb2RlIHR3aWNlLiBJZiByZXBlYXRGb3JJbnNlcnQgaXMgc2V0LCB0aGVuIHdlXG4gICAgICAgIC8vIHdlcmUgY2FsbGVkIGJ5IGFuIGV4aXRJbnNlcnRNb2RlIGNhbGwgbG93ZXIgb24gdGhlIHN0YWNrLlxuICAgICAgICBleGl0SW5zZXJ0TW9kZShjbSk7XG4gICAgICB9XG4gICAgICBtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXBlYXRJbnNlcnRNb2RlQ2hhbmdlcyhjbSwgY2hhbmdlcywgcmVwZWF0KSB7XG4gICAgICBmdW5jdGlvbiBrZXlIYW5kbGVyKGJpbmRpbmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiaW5kaW5nID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgQ29kZU1pcnJvci5jb21tYW5kc1tiaW5kaW5nXShjbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYmluZGluZyhjbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICB2YXIgaGVhZCA9IGNtLmdldEN1cnNvcignaGVhZCcpO1xuICAgICAgdmFyIHZpc3VhbEJsb2NrID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzLnZpc3VhbEJsb2NrO1xuICAgICAgaWYgKHZpc3VhbEJsb2NrKSB7XG4gICAgICAgIC8vIFNldCB1cCBibG9jayBzZWxlY3Rpb24gYWdhaW4gZm9yIHJlcGVhdGluZyB0aGUgY2hhbmdlcy5cbiAgICAgICAgc2VsZWN0Rm9ySW5zZXJ0KGNtLCBoZWFkLCB2aXN1YWxCbG9jayArIDEpO1xuICAgICAgICByZXBlYXQgPSBjbS5saXN0U2VsZWN0aW9ucygpLmxlbmd0aDtcbiAgICAgICAgY20uc2V0Q3Vyc29yKGhlYWQpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXBlYXQ7IGkrKykge1xuICAgICAgICBpZiAodmlzdWFsQmxvY2spIHtcbiAgICAgICAgICBjbS5zZXRDdXJzb3Iob2Zmc2V0Q3Vyc29yKGhlYWQsIGksIDApKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGNoYW5nZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgY2hhbmdlID0gY2hhbmdlc1tqXTtcbiAgICAgICAgICBpZiAoY2hhbmdlIGluc3RhbmNlb2YgSW5zZXJ0TW9kZUtleSkge1xuICAgICAgICAgICAgQ29kZU1pcnJvci5sb29rdXBLZXkoY2hhbmdlLmtleU5hbWUsICd2aW0taW5zZXJ0Jywga2V5SGFuZGxlcik7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY2hhbmdlID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VTZWxlY3Rpb24oY2hhbmdlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgICB2YXIgZW5kID0gb2Zmc2V0Q3Vyc29yKHN0YXJ0LCAwLCBjaGFuZ2VbMF0ubGVuZ3RoKTtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZShjaGFuZ2VbMF0sIHN0YXJ0LCBlbmQpO1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGVuZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAodmlzdWFsQmxvY2spIHtcbiAgICAgICAgY20uc2V0Q3Vyc29yKG9mZnNldEN1cnNvcihoZWFkLCAwLCAxKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXRWaW1HbG9iYWxTdGF0ZSgpO1xuICBcbiAgLy8gSW5pdGlhbGl6ZSBWaW0gYW5kIG1ha2UgaXQgYXZhaWxhYmxlIGFzIGFuIEFQSS5cbiAgQ29kZU1pcnJvci5WaW0gPSB2aW1BcGk7XG5cbiAgdmFyIHNwZWNpYWxLZXkgPSB7J3JldHVybic6J0NSJyxiYWNrc3BhY2U6J0JTJywnZGVsZXRlJzonRGVsJyxlc2M6J0VzYycsXG4gICAgbGVmdDonTGVmdCcscmlnaHQ6J1JpZ2h0Jyx1cDonVXAnLGRvd246J0Rvd24nLHNwYWNlOiAnU3BhY2UnLGluc2VydDogJ0lucycsXG4gICAgaG9tZTonSG9tZScsZW5kOidFbmQnLHBhZ2V1cDonUGFnZVVwJyxwYWdlZG93bjonUGFnZURvd24nLCBlbnRlcjogJ0NSJ1xuICB9O1xuICBmdW5jdGlvbiBsb29rdXBLZXkoaGFzaElkLCBrZXksIGUpIHtcbiAgICBpZiAoa2V5Lmxlbmd0aCA+IDEgJiYga2V5WzBdID09IFwiblwiKSB7XG4gICAgICBrZXkgPSBrZXkucmVwbGFjZShcIm51bXBhZFwiLCBcIlwiKTtcbiAgICB9XG4gICAga2V5ID0gc3BlY2lhbEtleVtrZXldIHx8IGtleTtcbiAgICB2YXIgbmFtZSA9ICcnO1xuICAgIGlmIChlLmN0cmxLZXkpIHsgbmFtZSArPSAnQy0nOyB9XG4gICAgaWYgKGUuYWx0S2V5KSB7IG5hbWUgKz0gJ0EtJzsgfVxuICAgIGlmICgobmFtZSB8fCBrZXkubGVuZ3RoID4gMSkgJiYgZS5zaGlmdEtleSkgeyBuYW1lICs9ICdTLSc7IH1cblxuICAgIG5hbWUgKz0ga2V5O1xuICAgIGlmIChuYW1lLmxlbmd0aCA+IDEpIHsgbmFtZSA9ICc8JyArIG5hbWUgKyAnPic7IH1cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuICB2YXIgaGFuZGxlS2V5ID0gdmltQXBpLmhhbmRsZUtleS5iaW5kKHZpbUFwaSk7XG4gIHZpbUFwaS5oYW5kbGVLZXkgPSBmdW5jdGlvbihjbSwga2V5LCBvcmlnaW4pIHtcbiAgICByZXR1cm4gY20ub3BlcmF0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGhhbmRsZUtleShjbSwga2V5LCBvcmlnaW4pO1xuICAgIH0sIHRydWUpO1xuICB9XG4gIGZ1bmN0aW9uIGNsb25lVmltU3RhdGUoc3RhdGUpIHtcbiAgICB2YXIgbiA9IG5ldyBzdGF0ZS5jb25zdHJ1Y3RvcigpO1xuICAgIE9iamVjdC5rZXlzKHN0YXRlKS5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgdmFyIG8gPSBzdGF0ZVtrZXldO1xuICAgICAgaWYgKEFycmF5LmlzQXJyYXkobykpXG4gICAgICAgIG8gPSBvLnNsaWNlKCk7XG4gICAgICBlbHNlIGlmIChvICYmIHR5cGVvZiBvID09IFwib2JqZWN0XCIgJiYgby5jb25zdHJ1Y3RvciAhPSBPYmplY3QpXG4gICAgICAgIG8gPSBjbG9uZVZpbVN0YXRlKG8pO1xuICAgICAgbltrZXldID0gbztcbiAgICB9KTtcbiAgICBpZiAoc3RhdGUuc2VsKSB7XG4gICAgICBuLnNlbCA9IHtcbiAgICAgICAgaGVhZDogc3RhdGUuc2VsLmhlYWQgJiYgY29weUN1cnNvcihzdGF0ZS5zZWwuaGVhZCksXG4gICAgICAgIGFuY2hvcjogc3RhdGUuc2VsLmFuY2hvciAmJiBjb3B5Q3Vyc29yKHN0YXRlLnNlbC5hbmNob3IpXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbjtcbiAgfVxuICBmdW5jdGlvbiBtdWx0aVNlbGVjdEhhbmRsZUtleShjbSwga2V5LCBvcmlnaW4pIHtcbiAgICB2YXIgaXNIYW5kbGVkID0gZmFsc2U7XG4gICAgdmFyIHZpbSA9IHZpbUFwaS5tYXliZUluaXRWaW1TdGF0ZV8oY20pO1xuICAgIHZhciB2aXN1YWxCbG9jayA9IHZpbS52aXN1YWxCbG9jayB8fCB2aW0ud2FzSW5WaXN1YWxCbG9jaztcblxuICAgIHZhciB3YXNNdWx0aXNlbGVjdCA9IGNtLmFjZS5pbk11bHRpU2VsZWN0TW9kZTtcbiAgICBpZiAodmltLndhc0luVmlzdWFsQmxvY2sgJiYgIXdhc011bHRpc2VsZWN0KSB7XG4gICAgICB2aW0ud2FzSW5WaXN1YWxCbG9jayA9IGZhbHNlO1xuICAgIH0gZWxzZSBpZiAod2FzTXVsdGlzZWxlY3QgJiYgdmltLnZpc3VhbEJsb2NrKSB7XG4gICAgICAgdmltLndhc0luVmlzdWFsQmxvY2sgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChrZXkgPT0gJzxFc2M+JyAmJiAhdmltLmluc2VydE1vZGUgJiYgIXZpbS52aXN1YWxNb2RlICYmIHdhc011bHRpc2VsZWN0KSB7XG4gICAgICBjbS5hY2UuZXhpdE11bHRpU2VsZWN0TW9kZSgpO1xuICAgIH0gZWxzZSBpZiAodmlzdWFsQmxvY2sgfHwgIXdhc011bHRpc2VsZWN0IHx8IGNtLmFjZS5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlKSB7XG4gICAgICBpc0hhbmRsZWQgPSB2aW1BcGkuaGFuZGxlS2V5KGNtLCBrZXksIG9yaWdpbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBvbGQgPSBjbG9uZVZpbVN0YXRlKHZpbSk7XG4gICAgICBjbS5vcGVyYXRpb24oZnVuY3Rpb24oKSB7XG4gICAgICAgIGNtLmFjZS5mb3JFYWNoU2VsZWN0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBzZWwgPSBjbS5hY2Uuc2VsZWN0aW9uO1xuICAgICAgICAgIGNtLnN0YXRlLnZpbS5sYXN0SFBvcyA9IHNlbC4kZGVzaXJlZENvbHVtbiA9PSBudWxsID8gc2VsLmxlYWQuY29sdW1uIDogc2VsLiRkZXNpcmVkQ29sdW1uO1xuICAgICAgICAgIHZhciBoZWFkID0gY20uZ2V0Q3Vyc29yKFwiaGVhZFwiKTtcbiAgICAgICAgICB2YXIgYW5jaG9yID0gY20uZ2V0Q3Vyc29yKFwiYW5jaG9yXCIpO1xuICAgICAgICAgIHZhciBoZWFkT2Zmc2V0ID0gIWN1cnNvcklzQmVmb3JlKGhlYWQsIGFuY2hvcikgPyAtMSA6IDA7XG4gICAgICAgICAgdmFyIGFuY2hvck9mZnNldCA9IGN1cnNvcklzQmVmb3JlKGhlYWQsIGFuY2hvcikgPyAtMSA6IDA7XG4gICAgICAgICAgaGVhZCA9IG9mZnNldEN1cnNvcihoZWFkLCAwLCBoZWFkT2Zmc2V0KTtcbiAgICAgICAgICBhbmNob3IgPSBvZmZzZXRDdXJzb3IoYW5jaG9yLCAwLCBhbmNob3JPZmZzZXQpO1xuICAgICAgICAgIGNtLnN0YXRlLnZpbS5zZWwuaGVhZCA9IGhlYWQ7XG4gICAgICAgICAgY20uc3RhdGUudmltLnNlbC5hbmNob3IgPSBhbmNob3I7XG5cbiAgICAgICAgICBpc0hhbmRsZWQgPSBoYW5kbGVLZXkoY20sIGtleSwgb3JpZ2luKTtcbiAgICAgICAgICBzZWwuJGRlc2lyZWRDb2x1bW4gPSBjbS5zdGF0ZS52aW0ubGFzdEhQb3MgPT0gLTEgPyBudWxsIDogY20uc3RhdGUudmltLmxhc3RIUG9zO1xuICAgICAgICAgIGlmIChjbS52aXJ0dWFsU2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICBjbS5zdGF0ZS52aW0gPSBjbG9uZVZpbVN0YXRlKG9sZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGNtLmN1ck9wLmN1cnNvckFjdGl2aXR5ICYmICFpc0hhbmRsZWQpXG4gICAgICAgICAgY20uY3VyT3AuY3Vyc29yQWN0aXZpdHkgPSBmYWxzZTtcbiAgICAgIH0sIHRydWUpO1xuICAgIH1cbiAgICAvLyBhY2UgY29tbWFuZHMgbGlrZSBjdHJsLWFsdC1sIG1heSBicmluZyB2aXN1YWxNb2RlIGFuZCBzZWxlY3Rpb24gb3V0IG9mIHN5bmNcbiAgICBpZiAoaXNIYW5kbGVkICYmICF2aW0udmlzdWFsTW9kZSAmJiAhdmltLmluc2VydCAmJiB2aW0udmlzdWFsTW9kZSAhPSBjbS5zb21ldGhpbmdTZWxlY3RlZCgpKSB7XG4gICAgICBoYW5kbGVFeHRlcm5hbFNlbGVjdGlvbihjbSwgdmltLCB0cnVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGlzSGFuZGxlZDtcbiAgfVxuICBleHBvcnRzLkNvZGVNaXJyb3IgPSBDb2RlTWlycm9yO1xuICB2YXIgZ2V0VmltID0gdmltQXBpLm1heWJlSW5pdFZpbVN0YXRlXztcbiAgZXhwb3J0cy5oYW5kbGVyID0ge1xuICAgICRpZDogXCJhY2Uva2V5Ym9hcmQvdmltXCIsXG4gICAgZHJhd0N1cnNvcjogZnVuY3Rpb24oZWxlbWVudCwgcGl4ZWxQb3MsIGNvbmZpZywgc2VsLCBzZXNzaW9uKSB7XG4gICAgICB2YXIgdmltID0gdGhpcy5zdGF0ZS52aW0gfHwge307XG4gICAgICB2YXIgdyA9IGNvbmZpZy5jaGFyYWN0ZXJXaWR0aDtcbiAgICAgIHZhciBoID0gY29uZmlnLmxpbmVIZWlnaHQ7XG4gICAgICB2YXIgdG9wID0gcGl4ZWxQb3MudG9wO1xuICAgICAgdmFyIGxlZnQgPSBwaXhlbFBvcy5sZWZ0O1xuICAgICAgaWYgKCF2aW0uaW5zZXJ0TW9kZSkge1xuICAgICAgICB2YXIgaXNiYWNrd2FyZHMgPSAhc2VsLmN1cnNvclxuICAgICAgICAgICAgPyBzZXNzaW9uLnNlbGVjdGlvbi5pc0JhY2t3YXJkcygpIHx8IHNlc3Npb24uc2VsZWN0aW9uLmlzRW1wdHkoKVxuICAgICAgICAgICAgOiBSYW5nZS5jb21wYXJlUG9pbnRzKHNlbC5jdXJzb3IsIHNlbC5zdGFydCkgPD0gMDtcbiAgICAgICAgaWYgKCFpc2JhY2t3YXJkcyAmJiBsZWZ0ID4gdylcbiAgICAgICAgICBsZWZ0IC09IHc7XG4gICAgICB9XG4gICAgICBpZiAoIXZpbS5pbnNlcnRNb2RlICYmIHZpbS5zdGF0dXMpIHtcbiAgICAgICAgaCA9IGggLyAyO1xuICAgICAgICB0b3AgKz0gaDtcbiAgICAgIH1cbiAgICAgIGRvbUxpYi50cmFuc2xhdGUoZWxlbWVudCwgbGVmdCwgdG9wKTtcbiAgICAgIGRvbUxpYi5zZXRTdHlsZShlbGVtZW50LnN0eWxlLCBcIndpZHRoXCIsIHcgKyBcInB4XCIpO1xuICAgICAgZG9tTGliLnNldFN0eWxlKGVsZW1lbnQuc3R5bGUsIFwiaGVpZ2h0XCIsIGggKyBcInB4XCIpO1xuICAgIH0sXG4gICAgJGdldERpcmVjdGlvbkZvckhpZ2hsaWdodDogZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgdmFyIGNtID0gZWRpdG9yLnN0YXRlLmNtO1xuICAgICAgdmFyIHZpbSA9IGdldFZpbShjbSk7XG4gICAgICBpZiAoIXZpbS5pbnNlcnRNb2RlKSB7XG4gICAgICAgIHJldHVybiBlZGl0b3Iuc2Vzc2lvbi5zZWxlY3Rpb24uaXNCYWNrd2FyZHMoKSB8fCBlZGl0b3Iuc2Vzc2lvbi5zZWxlY3Rpb24uaXNFbXB0eSgpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaGFuZGxlS2V5Ym9hcmQ6IGZ1bmN0aW9uKGRhdGEsIGhhc2hJZCwga2V5LCBrZXlDb2RlLCBlKSB7XG4gICAgICB2YXIgZWRpdG9yID0gZGF0YS5lZGl0b3I7XG4gICAgICB2YXIgY20gPSBlZGl0b3Iuc3RhdGUuY207XG4gICAgICB2YXIgdmltID0gZ2V0VmltKGNtKTtcbiAgICAgIGlmIChrZXlDb2RlID09IC0xKSByZXR1cm47XG5cbiAgICAgIC8vIGluIG5vbi1pbnNlcnQgbW9kZSB3ZSB0cnkgdG8gZmluZCB0aGUgYXNjaWkga2V5IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHRleHQgaW4gdGV4dGFyZWFcbiAgICAgIC8vIHRoaXMgaXMgbmVlZGVkIGJlY2F1c2UgaW4gbGFuZ3VhZ2VzIHRoYXQgdXNlIGxhdGluIGFscGhhYmV0IHdlIHdhbnQgdG8gZ2V0IHRoZSBrZXkgdGhhdCBicm93c2VyIHNlbmRzIHRvIHRoZSB0ZXh0YXJlYVxuICAgICAgLy8gYW5kIGluIG5vblxuICAgICAgaWYgKCF2aW0uaW5zZXJ0TW9kZSkge1xuICAgICAgICBpZiAoaGFzaElkID09IC0xKSB7XG4gICAgICAgICAgaWYgKGtleS5jaGFyQ29kZUF0KDApID4gMHhGRikge1xuICAgICAgICAgICAgaWYgKGRhdGEuaW5wdXRLZXkpIHtcbiAgICAgICAgICAgICAga2V5ID0gZGF0YS5pbnB1dEtleTtcbiAgICAgICAgICAgICAgaWYgKGtleSAmJiBkYXRhLmlucHV0SGFzaCA9PSA0KVxuICAgICAgICAgICAgICAgIGtleSA9IGtleS50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhLmlucHV0Q2hhciA9IGtleTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChoYXNoSWQgPT0gNCB8fCBoYXNoSWQgPT0gMCkge1xuICAgICAgICAgIGlmIChkYXRhLmlucHV0S2V5ID09IGtleSAmJiBkYXRhLmlucHV0SGFzaCA9PSBoYXNoSWQgJiYgZGF0YS5pbnB1dENoYXIpIHtcbiAgICAgICAgICAgIC8vIG9uIG1hYyB0ZXh0IGlucHV0IGRvZXNuJ3QgcmVwZWF0XG4gICAgICAgICAgICBrZXkgPSBkYXRhLmlucHV0Q2hhcjtcbiAgICAgICAgICAgIGhhc2hJZCA9IC0xXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0YS5pbnB1dENoYXIgPSBudWxsO1xuICAgICAgICAgICAgZGF0YS5pbnB1dEtleSA9IGtleTtcbiAgICAgICAgICAgIGRhdGEuaW5wdXRIYXNoID0gaGFzaElkO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBkYXRhLmlucHV0Q2hhciA9IGRhdGEuaW5wdXRLZXkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmIChjbS5zdGF0ZS5vdmVyd3JpdGUgJiYgdmltLmluc2VydE1vZGUgJiYga2V5ID09IFwiYmFja3NwYWNlXCIgJiYgaGFzaElkID09IDApIHtcbiAgICAgICAgcmV0dXJuIHtjb21tYW5kOiBcImdvdG9sZWZ0XCJ9XG4gICAgICB9XG5cbiAgICAgIC8vIGN0cmwtYyBpcyBzcGVjaWFsIGl0IGJvdGggZXhpdHMgbW9kZSBhbmQgY29waWVzIHRleHRcbiAgICAgIGlmIChrZXkgPT0gXCJjXCIgJiYgaGFzaElkID09IDEpIHsgLy8ga2V5ID09IFwiY3RybC1jXCJcbiAgICAgICAgaWYgKCF1c2VyYWdlbnQuaXNNYWMgJiYgZWRpdG9yLmdldENvcHlUZXh0KCkpIHtcbiAgICAgICAgICBlZGl0b3Iub25jZShcImNvcHlcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodmltLmluc2VydE1vZGUpIGVkaXRvci5zZWxlY3Rpb24uY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIGVsc2UgY20ub3BlcmF0aW9uKGZ1bmN0aW9uKCkgeyBleGl0VmlzdWFsTW9kZShjbSk7IH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiB7Y29tbWFuZDogXCJudWxsXCIsIHBhc3NFdmVudDogdHJ1ZX07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGtleSA9PSBcImVzY1wiICYmICF2aW0uaW5zZXJ0TW9kZSAmJiAhdmltLnZpc3VhbE1vZGUgJiYgIWNtLmFjZS5pbk11bHRpU2VsZWN0TW9kZSkge1xuICAgICAgICB2YXIgc2VhcmNoU3RhdGUgPSBnZXRTZWFyY2hTdGF0ZShjbSk7XG4gICAgICAgIHZhciBvdmVybGF5ID0gc2VhcmNoU3RhdGUuZ2V0T3ZlcmxheSgpO1xuICAgICAgICBpZiAob3ZlcmxheSkgY20ucmVtb3ZlT3ZlcmxheShvdmVybGF5KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGhhc2hJZCA9PSAtMSB8fCBoYXNoSWQgJiAxIHx8IGhhc2hJZCA9PT0gMCAmJiBrZXkubGVuZ3RoID4gMSkge1xuICAgICAgICB2YXIgaW5zZXJ0TW9kZSA9IHZpbS5pbnNlcnRNb2RlO1xuICAgICAgICB2YXIgbmFtZSA9IGxvb2t1cEtleShoYXNoSWQsIGtleSwgZSB8fCB7fSk7XG4gICAgICAgIGlmICh2aW0uc3RhdHVzID09IG51bGwpXG4gICAgICAgICAgdmltLnN0YXR1cyA9IFwiXCI7XG4gICAgICAgIHZhciBpc0hhbmRsZWQgPSBtdWx0aVNlbGVjdEhhbmRsZUtleShjbSwgbmFtZSwgJ3VzZXInKTtcbiAgICAgICAgdmltID0gZ2V0VmltKGNtKTsgLy8gbWF5IGJlIGNoYW5nZWQgYnkgbXVsdGlTZWxlY3RIYW5kbGVLZXlcbiAgICAgICAgaWYgKGlzSGFuZGxlZCAmJiB2aW0uc3RhdHVzICE9IG51bGwpXG4gICAgICAgICAgdmltLnN0YXR1cyArPSBuYW1lO1xuICAgICAgICBlbHNlIGlmICh2aW0uc3RhdHVzID09IG51bGwpXG4gICAgICAgICAgdmltLnN0YXR1cyA9IFwiXCI7XG4gICAgICAgIGNtLl9zaWduYWwoXCJjaGFuZ2VTdGF0dXNcIik7XG4gICAgICAgIGlmICghaXNIYW5kbGVkICYmIChoYXNoSWQgIT0gLTEgfHwgaW5zZXJ0TW9kZSkpXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICByZXR1cm4ge2NvbW1hbmQ6IFwibnVsbFwiLCBwYXNzRXZlbnQ6ICFpc0hhbmRsZWR9O1xuICAgICAgfVxuICAgIH0sXG4gICAgYXR0YWNoOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgIGlmICghZWRpdG9yLnN0YXRlKSBlZGl0b3Iuc3RhdGUgPSB7fTtcbiAgICAgIHZhciBjbSA9IG5ldyBDb2RlTWlycm9yKGVkaXRvcik7XG4gICAgICBlZGl0b3Iuc3RhdGUuY20gPSBjbTtcbiAgICAgIGVkaXRvci4kdmltTW9kZUhhbmRsZXIgPSB0aGlzO1xuICAgICAgQ29kZU1pcnJvci5rZXlNYXAudmltLmF0dGFjaChjbSk7XG4gICAgICBnZXRWaW0oY20pLnN0YXR1cyA9IG51bGw7XG4gICAgICBjbS5vbigndmltLWNvbW1hbmQtZG9uZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoY20udmlydHVhbFNlbGVjdGlvbk1vZGUoKSkgcmV0dXJuO1xuICAgICAgICBnZXRWaW0oY20pLnN0YXR1cyA9IG51bGw7XG4gICAgICAgIGNtLmFjZS5fc2lnbmFsKFwiY2hhbmdlU3RhdHVzXCIpO1xuICAgICAgICBjbS5hY2Uuc2Vzc2lvbi5tYXJrVW5kb0dyb3VwKCk7XG4gICAgICB9KTtcbiAgICAgIGNtLm9uKFwiY2hhbmdlU3RhdHVzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjbS5hY2UucmVuZGVyZXIudXBkYXRlQ3Vyc29yKCk7XG4gICAgICAgIGNtLmFjZS5fc2lnbmFsKFwiY2hhbmdlU3RhdHVzXCIpO1xuICAgICAgfSk7XG4gICAgICBjbS5vbihcInZpbS1tb2RlLWNoYW5nZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGNtLnZpcnR1YWxTZWxlY3Rpb25Nb2RlKCkpIHJldHVybjtcbiAgICAgICAgdXBkYXRlSW5wdXRNb2RlKCk7XG4gICAgICAgIGNtLl9zaWduYWwoXCJjaGFuZ2VTdGF0dXNcIik7XG4gICAgICB9KTtcbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZUlucHV0TW9kZSgpIHtcbiAgICAgICAgdmFyIGlzSW50c2VydCA9IGdldFZpbShjbSkuaW5zZXJ0TW9kZTtcbiAgICAgICAgY20uYWNlLnJlbmRlcmVyLnNldFN0eWxlKFwibm9ybWFsLW1vZGVcIiwgIWlzSW50c2VydCk7XG4gICAgICAgIGVkaXRvci50ZXh0SW5wdXQuc2V0Q29tbWFuZE1vZGUoIWlzSW50c2VydCk7XG4gICAgICAgIC8vIHdpdGhvdXQgdGhpcyBwcmVzcyBhbmQgaG9kbCBwb3B1cCBpbiBtYWMgaXMgc2hvd24gaW4gbm9ybWFsIG1vZGVcbiAgICAgICAgZWRpdG9yLnJlbmRlcmVyLiRrZWVwVGV4dEFyZWFBdEN1cnNvciA9IGlzSW50c2VydDtcbiAgICAgICAgZWRpdG9yLnJlbmRlcmVyLiRibG9ja0N1cnNvciA9ICFpc0ludHNlcnQ7XG4gICAgICB9XG4gICAgICB1cGRhdGVJbnB1dE1vZGUoKTtcbiAgICAgIGVkaXRvci5yZW5kZXJlci4kY3Vyc29yTGF5ZXIuZHJhd0N1cnNvciA9IHRoaXMuZHJhd0N1cnNvci5iaW5kKGNtKTtcbiAgICB9LFxuICAgIGRldGFjaDogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICB2YXIgY20gPSBlZGl0b3Iuc3RhdGUuY207XG4gICAgICBDb2RlTWlycm9yLmtleU1hcC52aW0uZGV0YWNoKGNtKTtcbiAgICAgIGNtLmRlc3Ryb3koKTtcbiAgICAgIGVkaXRvci5zdGF0ZS5jbSA9IG51bGw7XG4gICAgICBlZGl0b3IuJHZpbU1vZGVIYW5kbGVyID0gbnVsbDtcbiAgICAgIGVkaXRvci5yZW5kZXJlci4kY3Vyc29yTGF5ZXIuZHJhd0N1cnNvciA9IG51bGw7XG4gICAgICBlZGl0b3IucmVuZGVyZXIuc2V0U3R5bGUoXCJub3JtYWwtbW9kZVwiLCBmYWxzZSk7XG4gICAgICBlZGl0b3IudGV4dElucHV0LnNldENvbW1hbmRNb2RlKGZhbHNlKTtcbiAgICAgIGVkaXRvci5yZW5kZXJlci4ka2VlcFRleHRBcmVhQXRDdXJzb3IgPSB0cnVlO1xuICAgIH0sXG4gICAgZ2V0U3RhdHVzVGV4dDogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICB2YXIgY20gPSBlZGl0b3Iuc3RhdGUuY207XG4gICAgICB2YXIgdmltID0gZ2V0VmltKGNtKTtcbiAgICAgIGlmICh2aW0uaW5zZXJ0TW9kZSlcbiAgICAgICAgcmV0dXJuIFwiSU5TRVJUXCI7XG4gICAgICB2YXIgc3RhdHVzID0gXCJcIjtcbiAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICBzdGF0dXMgKz0gXCJWSVNVQUxcIjtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxMaW5lKVxuICAgICAgICAgIHN0YXR1cyArPSBcIiBMSU5FXCI7XG4gICAgICAgIGlmICh2aW0udmlzdWFsQmxvY2spXG4gICAgICAgICAgc3RhdHVzICs9IFwiIEJMT0NLXCI7XG4gICAgICB9XG4gICAgICBpZiAodmltLnN0YXR1cylcbiAgICAgICAgc3RhdHVzICs9IChzdGF0dXMgPyBcIiBcIiA6IFwiXCIpICsgdmltLnN0YXR1cztcbiAgICAgIHJldHVybiBzdGF0dXM7XG4gICAgfVxuICB9O1xuICB2aW1BcGkuZGVmaW5lT3B0aW9uKHtcbiAgICBuYW1lOiBcIndyYXBcIixcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlLCBjbSkge1xuICAgICAgaWYgKGNtKSB7Y20uYWNlLnNldE9wdGlvbihcIndyYXBcIiwgdmFsdWUpfVxuICAgIH0sXG4gICAgdHlwZTogXCJib29sZWFuXCJcbiAgfSwgZmFsc2UpO1xuICB2aW1BcGkuZGVmaW5lRXgoJ3dyaXRlJywgJ3cnLCBmdW5jdGlvbigpIHtcbiAgICBjb25zb2xlLmxvZygnOndyaXRlIGlzIG5vdCBpbXBsZW1lbnRlZCcpXG4gIH0pO1xuICBkZWZhdWx0S2V5bWFwLnB1c2goXG4gICAgeyBrZXlzOiAnemMnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZm9sZCcsIGFjdGlvbkFyZ3M6IHsgb3BlbjogZmFsc2UgfSB9LFxuICAgIHsga2V5czogJ3pDJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2ZvbGQnLCBhY3Rpb25BcmdzOiB7IG9wZW46IGZhbHNlLCBhbGw6IHRydWUgfSB9LFxuICAgIHsga2V5czogJ3pvJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2ZvbGQnLCBhY3Rpb25BcmdzOiB7IG9wZW46IHRydWUgfSB9LFxuICAgIHsga2V5czogJ3pPJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2ZvbGQnLCBhY3Rpb25BcmdzOiB7IG9wZW46IHRydWUsIGFsbDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnemEnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZm9sZCcsIGFjdGlvbkFyZ3M6IHsgdG9nZ2xlOiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICd6QScsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdmb2xkJywgYWN0aW9uQXJnczogeyB0b2dnbGU6IHRydWUsIGFsbDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnemYnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZm9sZCcsIGFjdGlvbkFyZ3M6IHsgb3BlbjogdHJ1ZSwgYWxsOiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICd6ZCcsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdmb2xkJywgYWN0aW9uQXJnczogeyBvcGVuOiB0cnVlLCBhbGw6IHRydWUgfSB9LFxuXG4gICAgeyBrZXlzOiAnPEMtQS1rPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdhY2VDb21tYW5kJywgYWN0aW9uQXJnczogeyBuYW1lOiBcImFkZEN1cnNvckFib3ZlXCIgfSB9LFxuICAgIHsga2V5czogJzxDLUEtaj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnYWNlQ29tbWFuZCcsIGFjdGlvbkFyZ3M6IHsgbmFtZTogXCJhZGRDdXJzb3JCZWxvd1wiIH0gfSxcbiAgICB7IGtleXM6ICc8Qy1BLVMtaz4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnYWNlQ29tbWFuZCcsIGFjdGlvbkFyZ3M6IHsgbmFtZTogXCJhZGRDdXJzb3JBYm92ZVNraXBDdXJyZW50XCIgfSB9LFxuICAgIHsga2V5czogJzxDLUEtUy1qPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdhY2VDb21tYW5kJywgYWN0aW9uQXJnczogeyBuYW1lOiBcImFkZEN1cnNvckJlbG93U2tpcEN1cnJlbnRcIiB9IH0sXG4gICAgeyBrZXlzOiAnPEMtQS1oPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdhY2VDb21tYW5kJywgYWN0aW9uQXJnczogeyBuYW1lOiBcInNlbGVjdE1vcmVCZWZvcmVcIiB9IH0sXG4gICAgeyBrZXlzOiAnPEMtQS1sPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdhY2VDb21tYW5kJywgYWN0aW9uQXJnczogeyBuYW1lOiBcInNlbGVjdE1vcmVBZnRlclwiIH0gfSxcbiAgICB7IGtleXM6ICc8Qy1BLVMtaD4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnYWNlQ29tbWFuZCcsIGFjdGlvbkFyZ3M6IHsgbmFtZTogXCJzZWxlY3ROZXh0QmVmb3JlXCIgfSB9LFxuICAgIHsga2V5czogJzxDLUEtUy1sPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdhY2VDb21tYW5kJywgYWN0aW9uQXJnczogeyBuYW1lOiBcInNlbGVjdE5leHRBZnRlclwiIH0gfVxuICApO1xuICBcbiAgZGVmYXVsdEtleW1hcC5wdXNoKHtcbiAgICBrZXlzOiAnZ3EnLFxuICAgIHR5cGU6ICdvcGVyYXRvcicsXG4gICAgb3BlcmF0b3I6ICdoYXJkV3JhcCdcbiAgfSk7XG4gIHZpbUFwaS5kZWZpbmVPcGVyYXRvcihcImhhcmRXcmFwXCIsIGZ1bmN0aW9uKGNtLCBvcGVyYXRvckFyZ3MsIHJhbmdlcywgb2xkQW5jaG9yLCBuZXdIZWFkKSB7XG4gICAgdmFyIGFuY2hvciA9IHJhbmdlc1swXS5hbmNob3IubGluZTtcbiAgICB2YXIgaGVhZCA9IHJhbmdlc1swXS5oZWFkLmxpbmU7XG4gICAgaWYgKG9wZXJhdG9yQXJncy5saW5ld2lzZSkgaGVhZC0tO1xuICAgIGhhcmRXcmFwKGNtLmFjZSwge3N0YXJ0Um93OiBhbmNob3IsIGVuZFJvdzogaGVhZH0pO1xuICAgIHJldHVybiBQb3MoaGVhZCwgMCk7XG4gIH0pO1xuICBkZWZpbmVPcHRpb24oJ3RleHR3aWR0aCcsIHVuZGVmaW5lZCwgJ251bWJlcicsIFsndHcnXSwgZnVuY3Rpb24od2lkdGgsIGNtKSB7XG4gICAgLy8gT3B0aW9uIGlzIGxvY2FsLiBEbyBub3RoaW5nIGZvciBnbG9iYWwuXG4gICAgaWYgKGNtID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gVGhlICdmaWxldHlwZScgb3B0aW9uIHByb3hpZXMgdG8gdGhlIENvZGVNaXJyb3IgJ21vZGUnIG9wdGlvbi5cbiAgICBpZiAod2lkdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgdmFyIHZhbHVlID0gY20uYWNlLmdldE9wdGlvbigncHJpbnRNYXJnaW5Db2x1bW4nKTtcbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIGNvbHVtbiA9IE1hdGgucm91bmQod2lkdGgpO1xuICAgICAgaWYgKGNvbHVtbiA+IDEpIHtcbiAgICAgICAgY20uYWNlLnNldE9wdGlvbigncHJpbnRNYXJnaW5Db2x1bW4nLCBjb2x1bW4pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG4gICAgXG4gIGFjdGlvbnMuYWNlQ29tbWFuZCA9IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICBjbS52aW1DbWQgPSBhY3Rpb25BcmdzO1xuICAgIGlmIChjbS5hY2UuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSlcbiAgICAgIGNtLmFjZS5vbihcImJlZm9yZUVuZE9wZXJhdGlvblwiLCBkZWxheWVkRXhlY0FjZUNvbW1hbmQpO1xuICAgIGVsc2VcbiAgICAgIGRlbGF5ZWRFeGVjQWNlQ29tbWFuZChudWxsLCBjbS5hY2UpO1xuICB9O1xuICBmdW5jdGlvbiBkZWxheWVkRXhlY0FjZUNvbW1hbmQob3AsIGFjZSkge1xuICAgIGFjZS5vZmYoXCJiZWZvcmVFbmRPcGVyYXRpb25cIiwgZGVsYXllZEV4ZWNBY2VDb21tYW5kKTtcbiAgICB2YXIgY21kID0gYWNlLnN0YXRlLmNtLnZpbUNtZDtcbiAgICBpZiAoY21kKSB7XG4gICAgICBhY2UuZXhlY0NvbW1hbmQoY21kLmV4ZWMgPyBjbWQgOiBjbWQubmFtZSwgY21kLmFyZ3MpO1xuICAgIH1cbiAgICBhY2UuY3VyT3AgPSBhY2UucHJldk9wO1xuICB9XG4gIGFjdGlvbnMuZm9sZCA9IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICBjbS5hY2UuZXhlY0NvbW1hbmQoWyd0b2dnbGVGb2xkV2lkZ2V0JywgJ3RvZ2dsZUZvbGRXaWRnZXQnLCAnZm9sZE90aGVyJywgJ3VuZm9sZGFsbCdcbiAgICAgIF1bKGFjdGlvbkFyZ3MuYWxsID8gMiA6IDApICsgKGFjdGlvbkFyZ3Mub3BlbiA/IDEgOiAwKV0pO1xuICB9O1xuXG4gIGV4cG9ydHMuaGFuZGxlci5kZWZhdWx0S2V5bWFwID0gZGVmYXVsdEtleW1hcDtcbiAgZXhwb3J0cy5oYW5kbGVyLmFjdGlvbnMgPSBhY3Rpb25zO1xuICBleHBvcnRzLlZpbSA9IHZpbUFwaTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==