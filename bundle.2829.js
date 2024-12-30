"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2829,7674],{

/***/ 57674:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(91902)/* .Range */ .Q);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsZUFBZTtBQUNqRTtBQUNBO0FB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQSw0QkFBNEIsaUJBQWlCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsUUFBUTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMz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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixZQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3QixZQUFZO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxJQUFJO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBOztBQUVBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7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Oi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L2hhcmR3cmFwLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2tleWJvYXJkL3ZpbS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG4vKipcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vZWRpdG9yXCIpLkVkaXRvcn0gZWRpdG9yXG4gKiBAcGFyYW0ge2ltcG9ydChcIi4uLy4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuSGFyZFdyYXBPcHRpb25zfSBvcHRpb25zXG4gKi9cbmZ1bmN0aW9uIGhhcmRXcmFwKGVkaXRvciwgb3B0aW9ucykge1xuICAgIHZhciBtYXggPSBvcHRpb25zLmNvbHVtbiB8fCBlZGl0b3IuZ2V0T3B0aW9uKFwicHJpbnRNYXJnaW5Db2x1bW5cIik7XG4gICAgdmFyIGFsbG93TWVyZ2UgPSBvcHRpb25zLmFsbG93TWVyZ2UgIT0gZmFsc2U7XG4gICAgICAgXG4gICAgdmFyIHJvdyA9IE1hdGgubWluKG9wdGlvbnMuc3RhcnRSb3csIG9wdGlvbnMuZW5kUm93KTtcbiAgICB2YXIgZW5kUm93ID0gTWF0aC5tYXgob3B0aW9ucy5zdGFydFJvdywgb3B0aW9ucy5lbmRSb3cpO1xuICAgIFxuICAgIHZhciBzZXNzaW9uID0gZWRpdG9yLnNlc3Npb247XG4gICAgXG4gICAgd2hpbGUgKHJvdyA8PSBlbmRSb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgaWYgKGxpbmUubGVuZ3RoID4gbWF4KSB7XG4gICAgICAgICAgICB2YXIgc3BhY2UgPSBmaW5kU3BhY2UobGluZSwgbWF4LCA1KTtcbiAgICAgICAgICAgIGlmIChzcGFjZSkge1xuICAgICAgICAgICAgICAgIHZhciBpbmRlbnRhdGlvbiA9IC9eXFxzKi8uZXhlYyhsaW5lKVswXTtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLnJlcGxhY2UobmV3IFJhbmdlKHJvdyxzcGFjZS5zdGFydCxyb3csc3BhY2UuZW5kKSwgXCJcXG5cIiArIGluZGVudGF0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdysrO1xuICAgICAgICB9IGVsc2UgaWYgKGFsbG93TWVyZ2UgJiYgL1xcUy8udGVzdChsaW5lKSAmJiByb3cgIT0gZW5kUm93KSB7XG4gICAgICAgICAgICB2YXIgbmV4dExpbmUgPSBzZXNzaW9uLmdldExpbmUocm93ICsgMSk7XG4gICAgICAgICAgICBpZiAobmV4dExpbmUgJiYgL1xcUy8udGVzdChuZXh0TGluZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJpbW1lZExpbmUgPSBsaW5lLnJlcGxhY2UoL1xccyskLywgXCJcIik7XG4gICAgICAgICAgICAgICAgdmFyIHRyaW1tZWROZXh0TGluZSA9IG5leHRMaW5lLnJlcGxhY2UoL15cXHMrLywgXCJcIik7XG4gICAgICAgICAgICAgICAgdmFyIG1lcmdlZExpbmUgPSB0cmltbWVkTGluZSArIFwiIFwiICsgdHJpbW1lZE5leHRMaW5lO1xuXG4gICAgICAgICAgICAgICAgdmFyIHNwYWNlID0gZmluZFNwYWNlKG1lcmdlZExpbmUsIG1heCwgNSk7XG4gICAgICAgICAgICAgICAgaWYgKHNwYWNlICYmIHNwYWNlLnN0YXJ0ID4gdHJpbW1lZExpbmUubGVuZ3RoIHx8IG1lcmdlZExpbmUubGVuZ3RoIDwgbWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXBsYWNlUmFuZ2UgPSBuZXcgUmFuZ2Uocm93LHRyaW1tZWRMaW5lLmxlbmd0aCxyb3cgKyAxLG5leHRMaW5lLmxlbmd0aCAtIHRyaW1tZWROZXh0TGluZS5sZW5ndGgpO1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uLnJlcGxhY2UocmVwbGFjZVJhbmdlLCBcIiBcIik7XG4gICAgICAgICAgICAgICAgICAgIHJvdy0tO1xuICAgICAgICAgICAgICAgICAgICBlbmRSb3ctLTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRyaW1tZWRMaW5lLmxlbmd0aCA8IGxpbmUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlc3Npb24ucmVtb3ZlKG5ldyBSYW5nZShyb3csIHRyaW1tZWRMaW5lLmxlbmd0aCwgcm93LCBsaW5lLmxlbmd0aCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByb3crKztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbGluZVxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBtYXhcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbWluXG4gICAgICovXG4gICAgZnVuY3Rpb24gZmluZFNwYWNlKGxpbmUsIG1heCwgbWluKSB7XG4gICAgICAgIGlmIChsaW5lLmxlbmd0aCA8IG1heClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGJlZm9yZSA9IGxpbmUuc2xpY2UoMCwgbWF4KTtcbiAgICAgICAgdmFyIGFmdGVyID0gbGluZS5zbGljZShtYXgpO1xuICAgICAgICB2YXIgc3BhY2VBZnRlciA9IC9eKD86KFxccyspfChcXFMrKShcXHMrKSkvLmV4ZWMoYWZ0ZXIpO1xuICAgICAgICB2YXIgc3BhY2VCZWZvcmUgPSAvKD86KFxccyspfChcXHMrKShcXFMrKSkkLy5leGVjKGJlZm9yZSk7XG4gICAgICAgIHZhciBzdGFydCA9IDA7XG4gICAgICAgIHZhciBlbmQgPSAwO1xuICAgICAgICBpZiAoc3BhY2VCZWZvcmUgJiYgIXNwYWNlQmVmb3JlWzJdKSB7XG4gICAgICAgICAgICBzdGFydCA9IG1heCAtIHNwYWNlQmVmb3JlWzFdLmxlbmd0aDtcbiAgICAgICAgICAgIGVuZCA9IG1heDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3BhY2VBZnRlciAmJiAhc3BhY2VBZnRlclsyXSkge1xuICAgICAgICAgICAgaWYgKCFzdGFydClcbiAgICAgICAgICAgICAgICBzdGFydCA9IG1heDtcbiAgICAgICAgICAgIGVuZCA9IG1heCArIHNwYWNlQWZ0ZXJbMV0ubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICAgICAgZW5kOiBlbmRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNwYWNlQmVmb3JlICYmIHNwYWNlQmVmb3JlWzJdICYmIHNwYWNlQmVmb3JlLmluZGV4ID4gbWluKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBzcGFjZUJlZm9yZS5pbmRleCxcbiAgICAgICAgICAgICAgICBlbmQ6IHNwYWNlQmVmb3JlLmluZGV4ICsgc3BhY2VCZWZvcmVbMl0ubGVuZ3RoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcGFjZUFmdGVyICYmIHNwYWNlQWZ0ZXJbMl0pIHtcbiAgICAgICAgICAgIHN0YXJ0ID0gIG1heCArIHNwYWNlQWZ0ZXJbMl0ubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICAgICAgZW5kOiBzdGFydCArIHNwYWNlQWZ0ZXJbM10ubGVuZ3RoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIHdyYXBBZnRlcklucHV0KGUpIHtcbiAgICBpZiAoZS5jb21tYW5kLm5hbWUgPT0gXCJpbnNlcnRzdHJpbmdcIiAmJiAvXFxTLy50ZXN0KGUuYXJncykpIHtcbiAgICAgICAgdmFyIGVkaXRvciA9IGUuZWRpdG9yO1xuICAgICAgICB2YXIgY3Vyc29yID0gZWRpdG9yLnNlbGVjdGlvbi5jdXJzb3I7XG4gICAgICAgIGlmIChjdXJzb3IuY29sdW1uIDw9IGVkaXRvci5yZW5kZXJlci4kcHJpbnRNYXJnaW5Db2x1bW4pIHJldHVybjtcbiAgICAgICAgdmFyIGxhc3REZWx0YSA9IGVkaXRvci5zZXNzaW9uLiR1bmRvTWFuYWdlci4kbGFzdERlbHRhO1xuXG4gICAgICAgIGhhcmRXcmFwKGVkaXRvciwge1xuICAgICAgICAgICAgc3RhcnRSb3c6IGN1cnNvci5yb3csIGVuZFJvdzogY3Vyc29yLnJvdyxcbiAgICAgICAgICAgIGFsbG93TWVyZ2U6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobGFzdERlbHRhICE9IGVkaXRvci5zZXNzaW9uLiR1bmRvTWFuYWdlci4kbGFzdERlbHRhKSBcbiAgICAgICAgICAgIGVkaXRvci5zZXNzaW9uLm1hcmtVbmRvR3JvdXAoKTtcbiAgICB9XG59XG5cbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi4vZWRpdG9yXCIpLkVkaXRvcjtcbnJlcXVpcmUoXCIuLi9jb25maWdcIikuZGVmaW5lT3B0aW9ucyhFZGl0b3IucHJvdG90eXBlLCBcImVkaXRvclwiLCB7XG4gICAgaGFyZFdyYXA6IHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLm9uKFwiYWZ0ZXJFeGVjXCIsIHdyYXBBZnRlcklucHV0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kcy5vZmYoXCJhZnRlckV4ZWNcIiwgd3JhcEFmdGVySW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICB9XG59KTtcblxuZXhwb3J0cy5oYXJkV3JhcCA9IGhhcmRXcmFwO1xuIiwiLy8gQ29kZU1pcnJvciwgY29weXJpZ2h0IChjKSBieSBNYXJpam4gSGF2ZXJiZWtlIGFuZCBvdGhlcnNcbi8vIERpc3RyaWJ1dGVkIHVuZGVyIGFuIE1JVCBsaWNlbnNlOiBodHRwczovL2NvZGVtaXJyb3IubmV0LzUvTElDRU5TRVxuXG4vKipcbiAqIFN1cHBvcnRlZCBrZXliaW5kaW5nczpcbiAqICAgVG9vIG1hbnkgdG8gbGlzdC4gUmVmZXIgdG8gZGVmYXVsdEtleW1hcCBiZWxvdy5cbiAqXG4gKiBTdXBwb3J0ZWQgRXggY29tbWFuZHM6XG4gKiAgIFJlZmVyIHRvIGRlZmF1bHRFeENvbW1hbmRNYXAgYmVsb3cuXG4gKlxuICogUmVnaXN0ZXJzOiB1bm5hbWVkLCAtLCAuLCA6LCAvLCBfLCBhLXosIEEtWiwgMC05XG4gKiAgIChEb2VzIG5vdCByZXNwZWN0IHRoZSBzcGVjaWFsIGNhc2UgZm9yIG51bWJlciByZWdpc3RlcnMgd2hlbiBkZWxldGVcbiAqICAgIG9wZXJhdG9yIGlzIG1hZGUgd2l0aCB0aGVzZSBjb21tYW5kczogJSwgKCwgKSwgICwgLywgPywgbiwgTiwgeywgfSApXG4gKiAgIFRPRE86IEltcGxlbWVudCB0aGUgcmVtYWluaW5nIHJlZ2lzdGVycy5cbiAqXG4gKiBNYXJrczogYS16LCBBLVosIGFuZCAwLTlcbiAqICAgVE9ETzogSW1wbGVtZW50IHRoZSByZW1haW5pbmcgc3BlY2lhbCBtYXJrcy4gVGhleSBoYXZlIG1vcmUgY29tcGxleFxuICogICAgICAgYmVoYXZpb3IuXG4gKlxuICogRXZlbnRzOlxuICogICd2aW0tbW9kZS1jaGFuZ2UnIC0gcmFpc2VkIG9uIHRoZSBlZGl0b3IgYW55dGltZSB0aGUgY3VycmVudCBtb2RlIGNoYW5nZXMsXG4gKiAgICAgICAgICAgICAgICAgICAgICBFdmVudCBvYmplY3Q6IHttb2RlOiBcInZpc3VhbFwiLCBzdWJNb2RlOiBcImxpbmV3aXNlXCJ9XG4gKlxuICogQ29kZSBzdHJ1Y3R1cmU6XG4gKiAgMS4gRGVmYXVsdCBrZXltYXBcbiAqICAyLiBWYXJpYWJsZSBkZWNsYXJhdGlvbnMgYW5kIHNob3J0IGJhc2ljIGhlbHBlcnNcbiAqICAzLiBJbnN0YW5jZSAoRXh0ZXJuYWwgQVBJKSBpbXBsZW1lbnRhdGlvblxuICogIDQuIEludGVybmFsIHN0YXRlIHRyYWNraW5nIG9iamVjdHMgKGlucHV0IHN0YXRlLCBjb3VudGVyKSBpbXBsZW1lbnRhdGlvblxuICogICAgIGFuZCBpbnN0YW50aWF0aW9uXG4gKiAgNS4gS2V5IGhhbmRsZXIgKHRoZSBtYWluIGNvbW1hbmQgZGlzcGF0Y2hlcikgaW1wbGVtZW50YXRpb25cbiAqICA2LiBNb3Rpb24sIG9wZXJhdG9yLCBhbmQgYWN0aW9uIGltcGxlbWVudGF0aW9uc1xuICogIDcuIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBrZXkgaGFuZGxlciwgbW90aW9ucywgb3BlcmF0b3JzLCBhbmQgYWN0aW9uc1xuICogIDguIFNldCB1cCBWaW0gdG8gd29yayBhcyBhIGtleW1hcCBmb3IgQ29kZU1pcnJvci5cbiAqICA5LiBFeCBjb21tYW5kIGltcGxlbWVudGF0aW9ucy5cbiAqL1xuXG4gICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBsb2coKSB7XG4gICAgdmFyIGQgPSBcIlwiO1xuICAgIGZ1bmN0aW9uIGZvcm1hdChwKSB7XG4gICAgICBpZiAodHlwZW9mIHAgIT0gXCJvYmplY3RcIilcbiAgICAgICAgcmV0dXJuIHAgKyBcIlwiO1xuICAgICAgaWYgKFwibGluZVwiIGluIHApIHtcbiAgICAgICAgcmV0dXJuIHAubGluZSArIFwiOlwiICsgcC5jaDtcbiAgICAgIH1cbiAgICAgIGlmIChcImFuY2hvclwiIGluIHApIHtcbiAgICAgICAgcmV0dXJuIGZvcm1hdChwLmFuY2hvcikgKyBcIi0+XCIgKyBmb3JtYXQocC5oZWFkKTtcbiAgICAgIH1cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHApKVxuICAgICAgICByZXR1cm4gXCJbXCIgKyBwLm1hcChmdW5jdGlvbih4KSB7XG4gICAgICAgICAgcmV0dXJuIGZvcm1hdCh4KTtcbiAgICAgICAgfSkgKyBcIl1cIjtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShwKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwID0gYXJndW1lbnRzW2ldO1xuICAgICAgdmFyIGYgPSBmb3JtYXQocCk7XG4gICAgICBkICs9IGYgKyBcIiAgXCI7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGQpO1xuICB9XG4gIHZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcbiAgdmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoXCIuLi9saWIvZXZlbnRfZW1pdHRlclwiKS5FdmVudEVtaXR0ZXI7XG4gIHZhciBkb21MaWIgPSByZXF1aXJlKFwiLi4vbGliL2RvbVwiKTtcbiAgdmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xuICB2YXIgS0VZUyA9IHJlcXVpcmUoXCIuLi9saWIva2V5c1wiKTtcbiAgdmFyIGV2ZW50ID0gcmVxdWlyZShcIi4uL2xpYi9ldmVudFwiKTtcbiAgdmFyIFNlYXJjaCA9IHJlcXVpcmUoXCIuLi9zZWFyY2hcIikuU2VhcmNoO1xuICB2YXIgdXNlcmFnZW50ID0gcmVxdWlyZShcIi4uL2xpYi91c2VyYWdlbnRcIik7XG4gIHZhciBTZWFyY2hIaWdobGlnaHQgPSByZXF1aXJlKFwiLi4vc2VhcmNoX2hpZ2hsaWdodFwiKS5TZWFyY2hIaWdobGlnaHQ7XG4gIHZhciBtdWx0aVNlbGVjdENvbW1hbmRzID0gcmVxdWlyZShcIi4uL2NvbW1hbmRzL211bHRpX3NlbGVjdF9jb21tYW5kc1wiKTtcbiAgdmFyIFRleHRNb2RlVG9rZW5SZSA9IHJlcXVpcmUoXCIuLi9tb2RlL3RleHRcIikuTW9kZS5wcm90b3R5cGUudG9rZW5SZTtcbiAgdmFyIGhhcmRXcmFwID0gcmVxdWlyZShcIi4uL2V4dC9oYXJkd3JhcFwiKS5oYXJkV3JhcDtcbiAgcmVxdWlyZShcIi4uL211bHRpX3NlbGVjdFwiKTtcblxuICB2YXIgQ29kZU1pcnJvciA9IGZ1bmN0aW9uKGFjZSkge1xuICAgIHRoaXMuYWNlID0gYWNlO1xuICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgICB0aGlzLm1hcmtzID0ge307XG4gICAgdGhpcy5vcHRpb25zID0ge307XG4gICAgdGhpcy4kdWlkID0gMDtcbiAgICB0aGlzLm9uQ2hhbmdlID0gdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UgPSB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJlZm9yZUVuZE9wZXJhdGlvbiA9IHRoaXMub25CZWZvcmVFbmRPcGVyYXRpb24uYmluZCh0aGlzKTtcbiAgICB0aGlzLmFjZS5vbignY2hhbmdlJywgdGhpcy5vbkNoYW5nZSk7XG4gICAgdGhpcy5hY2Uub24oJ2NoYW5nZVNlbGVjdGlvbicsIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UpO1xuICAgIHRoaXMuYWNlLm9uKCdiZWZvcmVFbmRPcGVyYXRpb24nLCB0aGlzLm9uQmVmb3JlRW5kT3BlcmF0aW9uKTtcbiAgfTtcbiAgQ29kZU1pcnJvci5Qb3MgPSBmdW5jdGlvbihsaW5lLCBjaCkge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQb3MpKSByZXR1cm4gbmV3IFBvcyhsaW5lLCBjaCk7XG4gICAgdGhpcy5saW5lID0gbGluZTsgdGhpcy5jaCA9IGNoO1xuICB9O1xuICBDb2RlTWlycm9yLmRlZmluZU9wdGlvbiA9IGZ1bmN0aW9uKG5hbWUsIHZhbCwgc2V0dGVyKSB7fTtcbiAgQ29kZU1pcnJvci5jb21tYW5kcyA9IHtcbiAgICByZWRvOiBmdW5jdGlvbihjbSkgeyBjbS5hY2UucmVkbygpOyB9LFxuICAgIHVuZG86IGZ1bmN0aW9uKGNtKSB7IGNtLmFjZS51bmRvKCk7IH0sXG4gICAgbmV3bGluZUFuZEluZGVudDogZnVuY3Rpb24oY20pIHsgY20uYWNlLmluc2VydChcIlxcblwiKTsgfSxcbiAgICBnb0xpbmVMZWZ0OiBmdW5jdGlvbihjbSkgeyBjbS5hY2Uuc2VsZWN0aW9uLm1vdmVDdXJzb3JMaW5lU3RhcnQoKTsgfSxcbiAgICBnb0xpbmVSaWdodDogZnVuY3Rpb24oY20pIHsgY20uYWNlLnNlbGVjdGlvbi5tb3ZlQ3Vyc29yTGluZUVuZCgpOyB9XG4gIH07XG4gIENvZGVNaXJyb3Iua2V5TWFwID0ge307XG4gIENvZGVNaXJyb3IuYWRkQ2xhc3MgPSBDb2RlTWlycm9yLnJtQ2xhc3MgPSBmdW5jdGlvbigpIHt9O1xuICBDb2RlTWlycm9yLmVfc3RvcCA9IENvZGVNaXJyb3IuZV9wcmV2ZW50RGVmYXVsdCA9IGV2ZW50LnN0b3BFdmVudDtcbiAgQ29kZU1pcnJvci5rZXlOYW1lID0gZnVuY3Rpb24oZSkge1xuICAgIHZhciBrZXkgPSAoS0VZU1tlLmtleUNvZGVdIHx8IGUua2V5IHx8IFwiXCIpO1xuICAgIGlmIChrZXkubGVuZ3RoID09IDEpIGtleSA9IGtleS50b1VwcGVyQ2FzZSgpO1xuICAgIGtleSA9IGV2ZW50LmdldE1vZGlmaWVyU3RyaW5nKGUpLnJlcGxhY2UoLyhefC0pXFx3L2csIGZ1bmN0aW9uKG0pIHtcbiAgICAgIHJldHVybiBtLnRvVXBwZXJDYXNlKCk7XG4gICAgfSkgKyBrZXk7XG4gICAgcmV0dXJuIGtleTtcbiAgfTtcbiAgQ29kZU1pcnJvci5rZXlNYXBbJ2RlZmF1bHQnXSA9IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBmdW5jdGlvbihjbSkge1xuICAgICAgdmFyIGNtZCA9IGNtLmFjZS5jb21tYW5kcy5jb21tYW5kS2V5QmluZGluZ1trZXkudG9Mb3dlckNhc2UoKV07XG4gICAgICByZXR1cm4gY21kICYmIGNtLmFjZS5leGVjQ29tbWFuZChjbWQpICE9PSBmYWxzZTtcbiAgICB9O1xuICB9O1xuICBDb2RlTWlycm9yLmxvb2t1cEtleSA9IGZ1bmN0aW9uIGxvb2t1cEtleShrZXksIG1hcCwgaGFuZGxlKSB7XG4gICAgaWYgKCFtYXApIG1hcCA9IFwiZGVmYXVsdFwiO1xuICAgIGlmICh0eXBlb2YgbWFwID09IFwic3RyaW5nXCIpXG4gICAgICBtYXAgPSBDb2RlTWlycm9yLmtleU1hcFttYXBdIHx8ICBDb2RlTWlycm9yLmtleU1hcFsnZGVmYXVsdCddO1xuICAgIHZhciBmb3VuZCA9IHR5cGVvZiBtYXAgPT0gXCJmdW5jdGlvblwiID8gbWFwKGtleSkgOiBtYXBba2V5XTtcbiAgICBpZiAoZm91bmQgPT09IGZhbHNlKSByZXR1cm4gXCJub3RoaW5nXCI7XG4gICAgaWYgKGZvdW5kID09PSBcIi4uLlwiKSByZXR1cm4gXCJtdWx0aVwiO1xuICAgIGlmIChmb3VuZCAhPSBudWxsICYmIGhhbmRsZShmb3VuZCkpIHJldHVybiBcImhhbmRsZWRcIjtcblxuICAgIGlmIChtYXAuZmFsbHRocm91Z2gpIHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShtYXAuZmFsbHRocm91Z2gpKVxuICAgICAgICByZXR1cm4gbG9va3VwS2V5KGtleSwgbWFwLmZhbGx0aHJvdWdoLCBoYW5kbGUpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXAuZmFsbHRocm91Z2gubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGxvb2t1cEtleShrZXksIG1hcC5mYWxsdGhyb3VnaFtpXSwgaGFuZGxlKTtcbiAgICAgICAgaWYgKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cblxuICBDb2RlTWlycm9yLmZpbmRNYXRjaGluZ1RhZyA9IGZ1bmN0aW9uIChjbSwgaGVhZCkge1xuICAgIHJldHVybiBjbS5maW5kTWF0Y2hpbmdUYWcoaGVhZCk7XG4gIH1cblxuICBDb2RlTWlycm9yLmZpbmRFbmNsb3NpbmdUYWcgPSBmdW5jdGlvbiAoY20sIGhlYWQpIHtcblxuICB9O1xuXG4gIENvZGVNaXJyb3Iuc2lnbmFsID0gZnVuY3Rpb24obywgbmFtZSwgZSkgeyByZXR1cm4gby5fc2lnbmFsKG5hbWUsIGUpIH07XG4gIENvZGVNaXJyb3Iub24gPSBldmVudC5hZGRMaXN0ZW5lcjtcbiAgQ29kZU1pcnJvci5vZmYgPSBldmVudC5yZW1vdmVMaXN0ZW5lcjtcbiAgQ29kZU1pcnJvci5pc1dvcmRDaGFyID0gZnVuY3Rpb24oY2gpIHtcbiAgICBpZiAoY2ggPCBcIlxceDdmXCIpIHJldHVybiAvXlxcdyQvLnRlc3QoY2gpO1xuICAgIFRleHRNb2RlVG9rZW5SZS5sYXN0SW5kZXggPSAwO1xuICAgIHJldHVybiBUZXh0TW9kZVRva2VuUmUudGVzdChjaCk7XG4gIH07XG5cbihmdW5jdGlvbigpIHtcbiAgb29wLmltcGxlbWVudChDb2RlTWlycm9yLnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyKTtcblxuICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmFjZS5vZmYoJ2NoYW5nZScsIHRoaXMub25DaGFuZ2UpO1xuICAgIHRoaXMuYWNlLm9mZignY2hhbmdlU2VsZWN0aW9uJywgdGhpcy5vblNlbGVjdGlvbkNoYW5nZSk7XG4gICAgdGhpcy5hY2Uub2ZmKCdiZWZvcmVFbmRPcGVyYXRpb24nLCB0aGlzLm9uQmVmb3JlRW5kT3BlcmF0aW9uKTtcbiAgICB0aGlzLnJlbW92ZU92ZXJsYXkoKTtcbiAgfTtcbiAgdGhpcy52aXJ0dWFsU2VsZWN0aW9uTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmFjZS5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlICYmIHRoaXMuYWNlLnNlbGVjdGlvbi5pbmRleDtcbiAgfTtcbiAgdGhpcy5vbkNoYW5nZSA9IGZ1bmN0aW9uKGRlbHRhKSB7XG4gICAgaWYgKHRoaXMuJGxpbmVIYW5kbGVDaGFuZ2VzKSB7XG4gICAgICB0aGlzLiRsaW5lSGFuZGxlQ2hhbmdlcy5wdXNoKGRlbHRhKTtcbiAgICB9XG4gICAgdmFyIGNoYW5nZSA9IHsgdGV4dDogZGVsdGEuYWN0aW9uWzBdID09ICdpJyA/IGRlbHRhLmxpbmVzIDogW10gfTtcbiAgICB2YXIgY3VyT3AgPSB0aGlzLmN1ck9wID0gdGhpcy5jdXJPcCB8fCB7fTtcbiAgICBpZiAoIWN1ck9wLmNoYW5nZUhhbmRsZXJzKVxuICAgICAgY3VyT3AuY2hhbmdlSGFuZGxlcnMgPSB0aGlzLl9ldmVudFJlZ2lzdHJ5W1wiY2hhbmdlXCJdICYmIHRoaXMuX2V2ZW50UmVnaXN0cnlbXCJjaGFuZ2VcIl0uc2xpY2UoKTtcbiAgICBpZiAoIWN1ck9wLmxhc3RDaGFuZ2UpIHtcbiAgICAgIGN1ck9wLmxhc3RDaGFuZ2UgPSBjdXJPcC5jaGFuZ2UgPSBjaGFuZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1ck9wLmxhc3RDaGFuZ2UubmV4dCA9IGN1ck9wLmxhc3RDaGFuZ2UgPSBjaGFuZ2U7XG4gICAgfVxuICAgIHRoaXMuJHVwZGF0ZU1hcmtlcnMoZGVsdGEpO1xuICB9O1xuICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN1ck9wID0gdGhpcy5jdXJPcCA9IHRoaXMuY3VyT3AgfHwge307XG4gICAgaWYgKCFjdXJPcC5jdXJzb3JBY3Rpdml0eUhhbmRsZXJzKVxuICAgICAgY3VyT3AuY3Vyc29yQWN0aXZpdHlIYW5kbGVycyA9IHRoaXMuX2V2ZW50UmVnaXN0cnlbXCJjdXJzb3JBY3Rpdml0eVwiXSAmJiB0aGlzLl9ldmVudFJlZ2lzdHJ5W1wiY3Vyc29yQWN0aXZpdHlcIl0uc2xpY2UoKTtcbiAgICB0aGlzLmN1ck9wLmN1cnNvckFjdGl2aXR5ID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5hY2UuaW5NdWx0aVNlbGVjdE1vZGUpIHtcbiAgICAgIHRoaXMuYWNlLmtleUJpbmRpbmcucmVtb3ZlS2V5Ym9hcmRIYW5kbGVyKG11bHRpU2VsZWN0Q29tbWFuZHMua2V5Ym9hcmRIYW5kbGVyKTtcbiAgICB9XG4gIH07XG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24oZm4sIGZvcmNlKSB7XG4gICAgaWYgKCFmb3JjZSAmJiB0aGlzLmN1ck9wIHx8IGZvcmNlICYmIHRoaXMuY3VyT3AgJiYgdGhpcy5jdXJPcC5mb3JjZSkge1xuICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuICAgIGlmIChmb3JjZSB8fCAhdGhpcy5hY2UuY3VyT3ApIHtcbiAgICAgIGlmICh0aGlzLmN1ck9wKVxuICAgICAgICB0aGlzLm9uQmVmb3JlRW5kT3BlcmF0aW9uKCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5hY2UuY3VyT3ApIHtcbiAgICAgIHZhciBwcmV2T3AgPSB0aGlzLmFjZS5wcmV2T3A7XG4gICAgICB0aGlzLmFjZS5zdGFydE9wZXJhdGlvbih7XG4gICAgICAgIGNvbW1hbmQ6IHsgbmFtZTogXCJ2aW1cIiwgIHNjcm9sbEludG9WaWV3OiBcImN1cnNvclwiIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgY3VyT3AgPSB0aGlzLmN1ck9wID0gdGhpcy5jdXJPcCB8fCB7fTtcbiAgICB0aGlzLmN1ck9wLmZvcmNlID0gZm9yY2U7XG4gICAgdmFyIHJlc3VsdCA9IGZuKCk7XG4gICAgaWYgKHRoaXMuYWNlLmN1ck9wICYmIHRoaXMuYWNlLmN1ck9wLmNvbW1hbmQubmFtZSA9PSBcInZpbVwiKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5kaWFsb2cpXG4gICAgICAgIHRoaXMuYWNlLmN1ck9wLmNvbW1hbmQuc2Nyb2xsSW50b1ZpZXcgPSB0aGlzLmFjZS5jdXJPcC52aW1EaWFsb2dTY3JvbGw7XG4gICAgICB0aGlzLmFjZS5lbmRPcGVyYXRpb24oKTtcbiAgICAgIGlmICghY3VyT3AuY3Vyc29yQWN0aXZpdHkgJiYgIWN1ck9wLmxhc3RDaGFuZ2UgJiYgcHJldk9wKVxuICAgICAgICB0aGlzLmFjZS5wcmV2T3AgPSBwcmV2T3A7XG4gICAgfVxuICAgIGlmIChmb3JjZSB8fCAhdGhpcy5hY2UuY3VyT3ApIHtcbiAgICAgIGlmICh0aGlzLmN1ck9wKVxuICAgICAgICB0aGlzLm9uQmVmb3JlRW5kT3BlcmF0aW9uKCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHRoaXMub25CZWZvcmVFbmRPcGVyYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3AgPSB0aGlzLmN1ck9wO1xuICAgIGlmIChvcCkge1xuICAgICAgaWYgKG9wLmNoYW5nZSkgeyB0aGlzLnNpZ25hbChcImNoYW5nZVwiLCBvcC5jaGFuZ2UsIG9wKTsgfVxuICAgICAgaWYgKG9wICYmIG9wLmN1cnNvckFjdGl2aXR5KSB7IHRoaXMuc2lnbmFsKFwiY3Vyc29yQWN0aXZpdHlcIiwgbnVsbCwgb3ApOyB9XG4gICAgICB0aGlzLmN1ck9wID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5zaWduYWwgPSBmdW5jdGlvbihldmVudE5hbWUsIGUsIGhhbmRsZXJzKSB7XG4gICAgdmFyIGxpc3RlbmVycyA9IGhhbmRsZXJzID8gaGFuZGxlcnNbZXZlbnROYW1lICsgXCJIYW5kbGVyc1wiXVxuICAgICAgICA6ICh0aGlzLl9ldmVudFJlZ2lzdHJ5IHx8IHt9KVtldmVudE5hbWVdO1xuICAgIGlmICghbGlzdGVuZXJzKVxuICAgICAgICByZXR1cm47XG4gICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgZm9yICh2YXIgaT0wOyBpPGxpc3RlbmVycy5sZW5ndGg7IGkrKylcbiAgICAgICAgbGlzdGVuZXJzW2ldKHRoaXMsIGUpO1xuICB9O1xuICB0aGlzLmZpcnN0TGluZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiAgdGhpcy5sYXN0TGluZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5hY2Uuc2Vzc2lvbi5nZXRMZW5ndGgoKSAtIDE7IH07XG4gIHRoaXMubGluZUNvdW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLmFjZS5zZXNzaW9uLmdldExlbmd0aCgpOyB9O1xuICB0aGlzLnNldEN1cnNvciA9IGZ1bmN0aW9uKGxpbmUsIGNoKSB7XG4gICAgaWYgKHR5cGVvZiBsaW5lID09PSAnb2JqZWN0Jykge1xuICAgICAgY2ggPSBsaW5lLmNoO1xuICAgICAgbGluZSA9IGxpbmUubGluZTtcbiAgICB9XG4gICAgdmFyIHNob3VsZFNjcm9sbCA9ICF0aGlzLmN1ck9wICYmICF0aGlzLmFjZS5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlO1xuICAgIGlmICghdGhpcy5hY2UuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSlcbiAgICAgIHRoaXMuYWNlLmV4aXRNdWx0aVNlbGVjdE1vZGUoKTtcbiAgICB0aGlzLmFjZS5zZXNzaW9uLnVuZm9sZCh7cm93OiBsaW5lLCBjb2x1bW46IGNofSk7XG4gICAgdGhpcy5hY2Uuc2VsZWN0aW9uLm1vdmVUbyhsaW5lLCBjaCk7XG4gICAgaWYgKHNob3VsZFNjcm9sbCkge1xuICAgICAgdGhpcy5hY2UucmVuZGVyZXIuc2Nyb2xsQ3Vyc29ySW50b1ZpZXcoKTtcbiAgICAgIHRoaXMuYWNlLmVuZE9wZXJhdGlvbigpO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5nZXRDdXJzb3IgPSBmdW5jdGlvbihwKSB7XG4gICAgdmFyIHNlbCA9IHRoaXMuYWNlLnNlbGVjdGlvbjtcbiAgICB2YXIgcG9zID0gcCA9PSAnYW5jaG9yJyA/IChzZWwuaXNFbXB0eSgpID8gc2VsLmxlYWQgOiBzZWwuYW5jaG9yKSA6XG4gICAgICAgIHAgPT0gJ2hlYWQnIHx8ICFwID8gc2VsLmxlYWQgOiBzZWwuZ2V0UmFuZ2UoKVtwXTtcbiAgICByZXR1cm4gdG9DbVBvcyhwb3MpO1xuICB9O1xuICB0aGlzLmxpc3RTZWxlY3Rpb25zID0gZnVuY3Rpb24ocCkge1xuICAgIHZhciByYW5nZXMgPSB0aGlzLmFjZS5tdWx0aVNlbGVjdC5yYW5nZUxpc3QucmFuZ2VzO1xuICAgIGlmICghcmFuZ2VzLmxlbmd0aCB8fCB0aGlzLmFjZS5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlKVxuICAgICAgcmV0dXJuIFt7YW5jaG9yOiB0aGlzLmdldEN1cnNvcignYW5jaG9yJyksIGhlYWQ6IHRoaXMuZ2V0Q3Vyc29yKCdoZWFkJyl9XTtcbiAgICByZXR1cm4gcmFuZ2VzLm1hcChmdW5jdGlvbihyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhbmNob3I6IHRoaXMuY2xpcFBvcyh0b0NtUG9zKHIuY3Vyc29yID09IHIuZW5kID8gci5zdGFydCA6IHIuZW5kKSksXG4gICAgICAgIGhlYWQ6IHRoaXMuY2xpcFBvcyh0b0NtUG9zKHIuY3Vyc29yKSlcbiAgICAgIH07XG4gICAgfSwgdGhpcyk7XG4gIH07XG4gIHRoaXMuc2V0U2VsZWN0aW9ucyA9IGZ1bmN0aW9uKHAsIHByaW1JbmRleCkge1xuICAgIHZhciBzZWwgPSB0aGlzLmFjZS5tdWx0aVNlbGVjdDtcbiAgICB2YXIgcmFuZ2VzID0gcC5tYXAoZnVuY3Rpb24oeCkge1xuICAgICAgdmFyIGFuY2hvciA9IHRvQWNlUG9zKHguYW5jaG9yKTtcbiAgICAgIHZhciBoZWFkID0gdG9BY2VQb3MoeC5oZWFkKTtcbiAgICAgIHZhciByID0gUmFuZ2UuY29tcGFyZVBvaW50cyhhbmNob3IsIGhlYWQpIDwgMFxuICAgICAgICA/IG5ldyBSYW5nZS5mcm9tUG9pbnRzKGFuY2hvciwgaGVhZClcbiAgICAgICAgOiBuZXcgUmFuZ2UuZnJvbVBvaW50cyhoZWFkLCBhbmNob3IpO1xuICAgICAgci5jdXJzb3IgPSBSYW5nZS5jb21wYXJlUG9pbnRzKHIuc3RhcnQsIGhlYWQpID8gci5lbmQgOiByLnN0YXJ0O1xuICAgICAgcmV0dXJuIHI7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5hY2UuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSkge1xuICAgICAgdGhpcy5hY2Uuc2VsZWN0aW9uLmZyb21PcmllbnRlZFJhbmdlKHJhbmdlc1swXSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghcHJpbUluZGV4KSB7XG4gICAgICAgIHJhbmdlcyA9IHJhbmdlcy5yZXZlcnNlKCk7XG4gICAgfSBlbHNlIGlmIChyYW5nZXNbcHJpbUluZGV4XSkge1xuICAgICAgIHJhbmdlcy5wdXNoKHJhbmdlcy5zcGxpY2UocHJpbUluZGV4LCAxKVswXSk7XG4gICAgfVxuICAgIHNlbC50b1NpbmdsZVJhbmdlKHJhbmdlc1swXS5jbG9uZSgpKTtcbiAgICB2YXIgc2Vzc2lvbiA9IHRoaXMuYWNlLnNlc3Npb247XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uJGNsaXBSYW5nZVRvRG9jdW1lbnQocmFuZ2VzW2ldKTsgLy8gdG9kbyB3aHkgYWNlIGRvZXNuJ3QgZG8gdGhpcz9cbiAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG4gICAgfVxuICB9O1xuICB0aGlzLnNldFNlbGVjdGlvbiA9IGZ1bmN0aW9uKGEsIGgsIG9wdGlvbnMpIHtcbiAgICB2YXIgc2VsID0gdGhpcy5hY2Uuc2VsZWN0aW9uO1xuICAgIHNlbC5tb3ZlVG8oYS5saW5lLCBhLmNoKTtcbiAgICBzZWwuc2VsZWN0VG8oaC5saW5lLCBoLmNoKTtcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLm9yaWdpbiA9PSAnKm1vdXNlJykge1xuICAgICAgdGhpcy5vbkJlZm9yZUVuZE9wZXJhdGlvbigpO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5zb21ldGhpbmdTZWxlY3RlZCA9IGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gIXRoaXMuYWNlLnNlbGVjdGlvbi5pc0VtcHR5KCk7XG4gIH07XG4gIHRoaXMuY2xpcFBvcyA9IGZ1bmN0aW9uKHApIHtcbiAgICB2YXIgcG9zID0gdGhpcy5hY2Uuc2Vzc2lvbi4kY2xpcFBvc2l0aW9uVG9Eb2N1bWVudChwLmxpbmUsIHAuY2gpO1xuICAgIHJldHVybiB0b0NtUG9zKHBvcyk7XG4gIH07XG4gIHRoaXMuZm9sZENvZGUgPSBmdW5jdGlvbihwb3MpIHtcbiAgICB0aGlzLmFjZS5zZXNzaW9uLiR0b2dnbGVGb2xkV2lkZ2V0KHBvcy5saW5lLCB7fSk7XG4gIH07XG4gIHRoaXMubWFya1RleHQgPSBmdW5jdGlvbihjdXJzb3IpIHtcbiAgICAvLyBvbmx5IHVzZWQgZm9yIGZhdC1jdXJzb3IsIG5vdCBuZWVkZWRcbiAgICByZXR1cm4ge2NsZWFyOiBmdW5jdGlvbigpIHt9LCBmaW5kOiBmdW5jdGlvbigpIHt9fTtcbiAgfTtcbiAgdGhpcy4kdXBkYXRlTWFya2VycyA9IGZ1bmN0aW9uKGRlbHRhKSB7XG4gICAgdmFyIGlzSW5zZXJ0ID0gZGVsdGEuYWN0aW9uID09IFwiaW5zZXJ0XCI7XG4gICAgdmFyIHN0YXJ0ID0gZGVsdGEuc3RhcnQ7XG4gICAgdmFyIGVuZCA9IGRlbHRhLmVuZDtcbiAgICB2YXIgcm93U2hpZnQgPSAoZW5kLnJvdyAtIHN0YXJ0LnJvdykgKiAoaXNJbnNlcnQgPyAxIDogLTEpO1xuICAgIHZhciBjb2xTaGlmdCA9IChlbmQuY29sdW1uIC0gc3RhcnQuY29sdW1uKSAqIChpc0luc2VydCA/IDEgOiAtMSk7XG4gICAgaWYgKGlzSW5zZXJ0KSBlbmQgPSBzdGFydDtcblxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5tYXJrcykge1xuICAgICAgdmFyIHBvaW50ID0gdGhpcy5tYXJrc1tpXTtcbiAgICAgIHZhciBjbXAgPSBSYW5nZS5jb21wYXJlUG9pbnRzKHBvaW50LCBzdGFydCk7XG4gICAgICBpZiAoY21wIDwgMCkge1xuICAgICAgICBjb250aW51ZTsgLy8gZGVsdGEgc3RhcnRzIGFmdGVyIHRoZSByYW5nZVxuICAgICAgfVxuICAgICAgaWYgKGNtcCA9PT0gMCkge1xuICAgICAgICBpZiAoaXNJbnNlcnQpIHtcbiAgICAgICAgICBpZiAoIXBvaW50LiRpbnNlcnRSaWdodCkge1xuICAgICAgICAgICAgY21wID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAocG9pbnQuYmlhcyA9PSAxKSB7XG4gICAgICAgICAgICBjbXAgPSAxO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwb2ludC5iaWFzID0gLTE7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBjbXAyID0gaXNJbnNlcnQgPyBjbXAgOiBSYW5nZS5jb21wYXJlUG9pbnRzKHBvaW50LCBlbmQpO1xuICAgICAgaWYgKGNtcDIgPiAwKSB7XG4gICAgICAgIHBvaW50LnJvdyArPSByb3dTaGlmdDtcbiAgICAgICAgcG9pbnQuY29sdW1uICs9IHBvaW50LnJvdyA9PSBlbmQucm93ID8gY29sU2hpZnQgOiAwO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICghaXNJbnNlcnQgJiYgY21wMiA8PSAwKSB7XG4gICAgICAgIHBvaW50LnJvdyA9IHN0YXJ0LnJvdztcbiAgICAgICAgcG9pbnQuY29sdW1uID0gc3RhcnQuY29sdW1uO1xuICAgICAgICBpZiAoY21wMiA9PT0gMClcbiAgICAgICAgICBwb2ludC5iaWFzID0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHZhciBNYXJrZXIgPSBmdW5jdGlvbihjbSwgaWQsIHJvdywgY29sdW1uKSB7XG4gICAgdGhpcy5jbSA9IGNtO1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnJvdyA9IHJvdztcbiAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgICBjbS5tYXJrc1t0aGlzLmlkXSA9IHRoaXM7XG4gIH07XG4gIE1hcmtlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHsgZGVsZXRlIHRoaXMuY20ubWFya3NbdGhpcy5pZF0gfTtcbiAgTWFya2VyLnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24oKSB7IHJldHVybiB0b0NtUG9zKHRoaXMpIH07XG4gIHRoaXMuc2V0Qm9va21hcmsgPSBmdW5jdGlvbihjdXJzb3IsIG9wdGlvbnMpIHtcbiAgICB2YXIgYm0gPSBuZXcgTWFya2VyKHRoaXMsIHRoaXMuJHVpZCsrLCBjdXJzb3IubGluZSwgY3Vyc29yLmNoKTtcbiAgICBpZiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMuaW5zZXJ0TGVmdClcbiAgICAgIGJtLiRpbnNlcnRSaWdodCA9IHRydWU7XG4gICAgdGhpcy5tYXJrc1tibS5pZF0gPSBibTtcbiAgICByZXR1cm4gYm07XG4gIH07XG4gIHRoaXMubW92ZUggPSBmdW5jdGlvbihpbmNyZW1lbnQsIHVuaXQpIHtcbiAgICBpZiAodW5pdCA9PSAnY2hhcicpIHtcbiAgICAgIHZhciBzZWwgPSB0aGlzLmFjZS5zZWxlY3Rpb247XG4gICAgICBzZWwuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgIHNlbC5tb3ZlQ3Vyc29yQnkoMCwgaW5jcmVtZW50KTtcbiAgICB9XG4gIH07XG4gIHRoaXMuZmluZFBvc1YgPSBmdW5jdGlvbihzdGFydCwgYW1vdW50LCB1bml0LCBnb2FsQ29sdW1uKSB7XG4gICAgaWYgKHVuaXQgPT0gJ3BhZ2UnKSB7XG4gICAgICB2YXIgcmVuZGVyZXIgPSB0aGlzLmFjZS5yZW5kZXJlcjtcbiAgICAgIHZhciBjb25maWcgPSByZW5kZXJlci5sYXllckNvbmZpZztcbiAgICAgIGFtb3VudCA9IGFtb3VudCAqIE1hdGguZmxvb3IoY29uZmlnLmhlaWdodCAvIGNvbmZpZy5saW5lSGVpZ2h0KTtcbiAgICAgIHVuaXQgPSAnbGluZSc7XG4gICAgfVxuICAgIGlmICh1bml0ID09ICdsaW5lJykge1xuICAgICAgdmFyIHNjcmVlblBvcyA9IHRoaXMuYWNlLnNlc3Npb24uZG9jdW1lbnRUb1NjcmVlblBvc2l0aW9uKHN0YXJ0LmxpbmUsIHN0YXJ0LmNoKTtcbiAgICAgIGlmIChnb2FsQ29sdW1uICE9IG51bGwpXG4gICAgICAgIHNjcmVlblBvcy5jb2x1bW4gPSBnb2FsQ29sdW1uO1xuICAgICAgc2NyZWVuUG9zLnJvdyArPSBhbW91bnQ7XG4gICAgICAvLyBub3Qgd2hhdCBjb2RlbWlycm9yIGRvZXMgYnV0IHZpbSBtb2RlIG5lZWRzIG9ubHkgdGhpc1xuICAgICAgc2NyZWVuUG9zLnJvdyA9IE1hdGgubWluKE1hdGgubWF4KDAsIHNjcmVlblBvcy5yb3cpLCB0aGlzLmFjZS5zZXNzaW9uLmdldFNjcmVlbkxlbmd0aCgpIC0gMSk7XG4gICAgICB2YXIgcG9zID0gdGhpcy5hY2Uuc2Vzc2lvbi5zY3JlZW5Ub0RvY3VtZW50UG9zaXRpb24oc2NyZWVuUG9zLnJvdywgc2NyZWVuUG9zLmNvbHVtbik7XG4gICAgICByZXR1cm4gdG9DbVBvcyhwb3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Z2dlcjtcbiAgICB9XG4gIH07XG4gIHRoaXMuY2hhckNvb3JkcyA9IGZ1bmN0aW9uKHBvcywgbW9kZSkge1xuICAgIGlmIChtb2RlID09ICdkaXYnIHx8ICFtb2RlKSB7XG4gICAgICB2YXIgc2MgPSB0aGlzLmFjZS5zZXNzaW9uLmRvY3VtZW50VG9TY3JlZW5Qb3NpdGlvbihwb3MubGluZSwgcG9zLmNoKTtcbiAgICAgIHJldHVybiB7bGVmdDogc2MuY29sdW1uLCB0b3A6IHNjLnJvd307XG4gICAgfWlmIChtb2RlID09ICdsb2NhbCcpIHtcbiAgICAgIHZhciByZW5kZXJlciA9IHRoaXMuYWNlLnJlbmRlcmVyO1xuICAgICAgdmFyIHNjID0gdGhpcy5hY2Uuc2Vzc2lvbi5kb2N1bWVudFRvU2NyZWVuUG9zaXRpb24ocG9zLmxpbmUsIHBvcy5jaCk7XG4gICAgICB2YXIgbGggPSByZW5kZXJlci5sYXllckNvbmZpZy5saW5lSGVpZ2h0O1xuICAgICAgdmFyIGN3ID0gcmVuZGVyZXIubGF5ZXJDb25maWcuY2hhcmFjdGVyV2lkdGg7XG4gICAgICB2YXIgdG9wID0gbGggKiBzYy5yb3c7XG4gICAgICByZXR1cm4ge2xlZnQ6IHNjLmNvbHVtbiAqIGN3LCB0b3A6IHRvcCwgYm90dG9tOiB0b3AgKyBsaH07XG4gICAgfVxuICB9O1xuICB0aGlzLmNvb3Jkc0NoYXIgPSBmdW5jdGlvbihwb3MsIG1vZGUpIHtcbiAgICB2YXIgcmVuZGVyZXIgPSB0aGlzLmFjZS5yZW5kZXJlcjtcbiAgICBpZiAobW9kZSA9PSAnbG9jYWwnKSB7XG4gICAgICB2YXIgcm93ID0gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihwb3MudG9wIC8gcmVuZGVyZXIubGluZUhlaWdodCkpO1xuICAgICAgdmFyIGNvbCA9IE1hdGgubWF4KDAsIE1hdGguZmxvb3IocG9zLmxlZnQgLyByZW5kZXJlci5jaGFyYWN0ZXJXaWR0aCkpO1xuICAgICAgdmFyIGNoID0gcmVuZGVyZXIuc2Vzc2lvbi5zY3JlZW5Ub0RvY3VtZW50UG9zaXRpb24ocm93LCBjb2wpO1xuICAgICAgcmV0dXJuIHRvQ21Qb3MoY2gpO1xuICAgIH0gZWxzZSBpZiAobW9kZSA9PSAnZGl2Jykge1xuICAgICAgdGhyb3cgXCJub3QgaW1wbGVtZW50ZWRcIjtcbiAgICB9XG4gIH07XG4gIHRoaXMuZ2V0U2VhcmNoQ3Vyc29yID0gZnVuY3Rpb24ocXVlcnksIHBvcywgY2FzZUZvbGQpIHtcbiAgICB2YXIgY2FzZVNlbnNpdGl2ZSA9IGZhbHNlO1xuICAgIHZhciBpc1JlZ2V4cCA9IGZhbHNlO1xuICAgIGlmIChxdWVyeSBpbnN0YW5jZW9mIFJlZ0V4cCAmJiAhcXVlcnkuZ2xvYmFsKSB7XG4gICAgICBjYXNlU2Vuc2l0aXZlID0gIXF1ZXJ5Lmlnbm9yZUNhc2U7XG4gICAgICBxdWVyeSA9IHF1ZXJ5LnNvdXJjZTtcbiAgICAgIGlzUmVnZXhwID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHF1ZXJ5ID09IFwiXFxcXG5cIikgeyBxdWVyeSA9IFwiXFxuXCI7IGlzUmVnZXhwID0gZmFsc2U7IH1cbiAgICB2YXIgc2VhcmNoID0gbmV3IFNlYXJjaCgpO1xuICAgIGlmIChwb3MuY2ggPT0gdW5kZWZpbmVkKSBwb3MuY2ggPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgIHZhciBhY2VQb3MgPSB7cm93OiBwb3MubGluZSwgY29sdW1uOiBwb3MuY2h9O1xuICAgIHZhciBjbSA9IHRoaXM7XG4gICAgdmFyIGxhc3QgPSBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICBmaW5kTmV4dDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLmZpbmQoZmFsc2UpIH0sXG4gICAgICBmaW5kUHJldmlvdXM6IGZ1bmN0aW9uKCkge3JldHVybiB0aGlzLmZpbmQodHJ1ZSkgfSxcbiAgICAgIGZpbmQ6IGZ1bmN0aW9uKGJhY2spIHtcbiAgICAgICAgc2VhcmNoLnNldE9wdGlvbnMoe1xuICAgICAgICAgIG5lZWRsZTogcXVlcnksXG4gICAgICAgICAgY2FzZVNlbnNpdGl2ZTogY2FzZVNlbnNpdGl2ZSxcbiAgICAgICAgICB3cmFwOiBmYWxzZSxcbiAgICAgICAgICBiYWNrd2FyZHM6IGJhY2ssXG4gICAgICAgICAgcmVnRXhwOiBpc1JlZ2V4cCxcbiAgICAgICAgICBzdGFydDogbGFzdCB8fCBhY2VQb3NcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciByYW5nZSA9IHNlYXJjaC5maW5kKGNtLmFjZS5zZXNzaW9uKTtcbiAgICAgICAgbGFzdCA9IHJhbmdlO1xuICAgICAgICByZXR1cm4gbGFzdCAmJiBbIWxhc3QuaXNFbXB0eSgpXTtcbiAgICAgIH0sXG4gICAgICBmcm9tOiBmdW5jdGlvbigpIHsgcmV0dXJuIGxhc3QgJiYgdG9DbVBvcyhsYXN0LnN0YXJ0KSB9LFxuICAgICAgdG86IGZ1bmN0aW9uKCkgeyByZXR1cm4gbGFzdCAmJiB0b0NtUG9zKGxhc3QuZW5kKSB9LFxuICAgICAgcmVwbGFjZTogZnVuY3Rpb24odGV4dCkge1xuICAgICAgICBpZiAobGFzdCkge1xuICAgICAgICAgIGxhc3QuZW5kID0gY20uYWNlLnNlc3Npb24uZG9jLnJlcGxhY2UobGFzdCwgdGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9O1xuICB0aGlzLnNjcm9sbFRvID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXMuYWNlLnJlbmRlcmVyO1xuICAgIHZhciBjb25maWcgPSByZW5kZXJlci5sYXllckNvbmZpZztcbiAgICB2YXIgbWF4SGVpZ2h0ID0gY29uZmlnLm1heEhlaWdodDtcbiAgICBtYXhIZWlnaHQgLT0gKHJlbmRlcmVyLiRzaXplLnNjcm9sbGVySGVpZ2h0IC0gcmVuZGVyZXIubGluZUhlaWdodCkgKiByZW5kZXJlci4kc2Nyb2xsUGFzdEVuZDtcbiAgICBpZiAoeSAhPSBudWxsKSB0aGlzLmFjZS5zZXNzaW9uLnNldFNjcm9sbFRvcChNYXRoLm1heCgwLCBNYXRoLm1pbih5LCBtYXhIZWlnaHQpKSk7XG4gICAgaWYgKHggIT0gbnVsbCkgdGhpcy5hY2Uuc2Vzc2lvbi5zZXRTY3JvbGxMZWZ0KE1hdGgubWF4KDAsIE1hdGgubWluKHgsIGNvbmZpZy53aWR0aCkpKTtcbiAgfTtcbiAgdGhpcy5zY3JvbGxJbmZvID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuICB0aGlzLnNjcm9sbEludG9WaWV3ID0gZnVuY3Rpb24ocG9zLCBtYXJnaW4pIHtcbiAgICBpZiAocG9zKSB7XG4gICAgICB2YXIgcmVuZGVyZXIgPSB0aGlzLmFjZS5yZW5kZXJlcjtcbiAgICAgIHZhciB2aWV3TWFyZ2luID0geyBcInRvcFwiOiAwLCBcImJvdHRvbVwiOiBtYXJnaW4gfTtcbiAgICAgIHJlbmRlcmVyLnNjcm9sbEN1cnNvckludG9WaWV3KHRvQWNlUG9zKHBvcyksXG4gICAgICAgIChyZW5kZXJlci5saW5lSGVpZ2h0ICogMikgLyByZW5kZXJlci4kc2l6ZS5zY3JvbGxlckhlaWdodCwgdmlld01hcmdpbik7XG4gICAgfVxuICB9O1xuICB0aGlzLmdldExpbmUgPSBmdW5jdGlvbihyb3cpIHsgcmV0dXJuIHRoaXMuYWNlLnNlc3Npb24uZ2V0TGluZShyb3cpIH07XG4gIHRoaXMuZ2V0UmFuZ2UgPSBmdW5jdGlvbihzLCBlKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLnNlc3Npb24uZ2V0VGV4dFJhbmdlKG5ldyBSYW5nZShzLmxpbmUsIHMuY2gsIGUubGluZSwgZS5jaCkpO1xuICB9O1xuICB0aGlzLnJlcGxhY2VSYW5nZSA9IGZ1bmN0aW9uKHRleHQsIHMsIGUpIHtcbiAgICBpZiAoIWUpIGUgPSBzO1xuICAgIC8vIHdvcmthcm91bmQgZm9yIHNlc3Npb24ucmVwbGFjZSBub3QgaGFuZGxpbmcgbmVnYXRpdmUgcm93c1xuICAgIHZhciByYW5nZSA9IG5ldyBSYW5nZShzLmxpbmUsIHMuY2gsIGUubGluZSwgZS5jaCk7XG4gICAgdGhpcy5hY2Uuc2Vzc2lvbi4kY2xpcFJhbmdlVG9Eb2N1bWVudChyYW5nZSk7XG4gICAgcmV0dXJuIHRoaXMuYWNlLnNlc3Npb24ucmVwbGFjZShyYW5nZSwgdGV4dCk7XG4gIH07XG4gIHRoaXMucmVwbGFjZVNlbGVjdGlvbiA9XG4gIHRoaXMucmVwbGFjZVNlbGVjdGlvbnMgPSBmdW5jdGlvbihwKSB7XG4gICAgdmFyIHN0cmluZ3MgPSBBcnJheS5pc0FycmF5KHApICYmIHA7XG4gICAgdmFyIHNlbCA9IHRoaXMuYWNlLnNlbGVjdGlvbjtcbiAgICBpZiAodGhpcy5hY2UuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSkge1xuICAgICAgdGhpcy5hY2Uuc2Vzc2lvbi5yZXBsYWNlKHNlbC5nZXRSYW5nZSgpLCBzdHJpbmdzID8gcFswXSB8fCBcIlwiOiBwICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNlbC5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlID0gdHJ1ZTtcbiAgICB2YXIgcmFuZ2VzID0gc2VsLnJhbmdlTGlzdC5yYW5nZXM7XG4gICAgaWYgKCFyYW5nZXMubGVuZ3RoKSByYW5nZXMgPSBbdGhpcy5hY2UubXVsdGlTZWxlY3QuZ2V0UmFuZ2UoKV07XG4gICAgZm9yICh2YXIgaSA9IHJhbmdlcy5sZW5ndGg7IGktLTspXG4gICAgICAgdGhpcy5hY2Uuc2Vzc2lvbi5yZXBsYWNlKHJhbmdlc1tpXSwgc3RyaW5ncyA/IHBbaV0gfHwgXCJcIiA6IHApO1xuICAgIHNlbC5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlID0gZmFsc2U7XG4gIH07XG4gIHRoaXMuZ2V0U2VsZWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLmdldFNlbGVjdGVkVGV4dCgpO1xuICB9O1xuICB0aGlzLmdldFNlbGVjdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5saXN0U2VsZWN0aW9ucygpLm1hcChmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gdGhpcy5nZXRSYW5nZSh4LmFuY2hvciwgeC5oZWFkKTtcbiAgICB9LCB0aGlzKTtcbiAgfTtcbiAgdGhpcy5nZXRJbnB1dEZpZWxkID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLnRleHRJbnB1dC5nZXRFbGVtZW50KCk7XG4gIH07XG4gIHRoaXMuZ2V0V3JhcHBlckVsZW1lbnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5hY2UuY29udGFpbmVyO1xuICB9O1xuICB2YXIgb3B0TWFwID0ge1xuICAgIGluZGVudFdpdGhUYWJzOiBcInVzZVNvZnRUYWJzXCIsXG4gICAgaW5kZW50VW5pdDogXCJ0YWJTaXplXCIsXG4gICAgdGFiU2l6ZTogXCJ0YWJTaXplXCIsXG4gICAgZmlyc3RMaW5lTnVtYmVyOiBcImZpcnN0TGluZU51bWJlclwiLFxuICAgIHJlYWRPbmx5OiBcInJlYWRPbmx5XCJcbiAgfTtcbiAgdGhpcy5zZXRPcHRpb24gPSBmdW5jdGlvbihuYW1lLCB2YWwpIHtcbiAgICB0aGlzLnN0YXRlW25hbWVdID0gdmFsO1xuICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgY2FzZSAnaW5kZW50V2l0aFRhYnMnOlxuICAgICAgICBuYW1lID0gb3B0TWFwW25hbWVdO1xuICAgICAgICB2YWwgPSAhdmFsO1xuICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdrZXlNYXAnOlxuICAgICAgICB0aGlzLnN0YXRlLiRrZXlNYXAgPSB2YWw7XG4gICAgICAgIHJldHVybjtcbiAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbmFtZSA9IG9wdE1hcFtuYW1lXTtcbiAgICB9XG4gICAgaWYgKG5hbWUpXG4gICAgICB0aGlzLmFjZS5zZXRPcHRpb24obmFtZSwgdmFsKTtcbiAgfTtcbiAgdGhpcy5nZXRPcHRpb24gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIHZhbDtcbiAgICB2YXIgYWNlT3B0ID0gb3B0TWFwW25hbWVdO1xuICAgIGlmIChhY2VPcHQpXG4gICAgICB2YWwgPSB0aGlzLmFjZS5nZXRPcHRpb24oYWNlT3B0KTtcbiAgICBzd2l0Y2ggKG5hbWUpIHtcbiAgICAgIGNhc2UgJ2luZGVudFdpdGhUYWJzJzpcbiAgICAgICAgbmFtZSA9IG9wdE1hcFtuYW1lXTtcbiAgICAgICAgcmV0dXJuICF2YWw7XG4gICAgICBjYXNlICdrZXlNYXAnOlxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS4ka2V5TWFwIHx8ICd2aW0nO1xuICAgIH1cbiAgICByZXR1cm4gYWNlT3B0ID8gdmFsIDogdGhpcy5zdGF0ZVtuYW1lXTtcbiAgfTtcbiAgdGhpcy50b2dnbGVPdmVyd3JpdGUgPSBmdW5jdGlvbihvbikge1xuICAgIHRoaXMuc3RhdGUub3ZlcndyaXRlID0gb247XG4gICAgcmV0dXJuIHRoaXMuYWNlLnNldE92ZXJ3cml0ZShvbik7XG4gIH07XG4gIHRoaXMuYWRkT3ZlcmxheSA9IGZ1bmN0aW9uKG8pIHtcbiAgICBpZiAoIXRoaXMuJHNlYXJjaEhpZ2hsaWdodCB8fCAhdGhpcy4kc2VhcmNoSGlnaGxpZ2h0LnNlc3Npb24pIHtcbiAgICAgIHZhciBoaWdobGlnaHQgPSBuZXcgU2VhcmNoSGlnaGxpZ2h0KG51bGwsIFwiYWNlX2hpZ2hsaWdodC1tYXJrZXJcIiwgXCJ0ZXh0XCIpO1xuICAgICAgdmFyIG1hcmtlciA9IHRoaXMuYWNlLnNlc3Npb24uYWRkRHluYW1pY01hcmtlcihoaWdobGlnaHQpO1xuICAgICAgaGlnaGxpZ2h0LmlkID0gbWFya2VyLmlkO1xuICAgICAgaGlnaGxpZ2h0LnNlc3Npb24gPSB0aGlzLmFjZS5zZXNzaW9uO1xuICAgICAgaGlnaGxpZ2h0LmRlc3Ryb3kgPSBmdW5jdGlvbihvKSB7XG4gICAgICAgIGhpZ2hsaWdodC5zZXNzaW9uLm9mZihcImNoYW5nZVwiLCBoaWdobGlnaHQudXBkYXRlT25DaGFuZ2UpO1xuICAgICAgICBoaWdobGlnaHQuc2Vzc2lvbi5vZmYoXCJjaGFuZ2VFZGl0b3JcIiwgaGlnaGxpZ2h0LmRlc3Ryb3kpO1xuICAgICAgICBoaWdobGlnaHQuc2Vzc2lvbi5yZW1vdmVNYXJrZXIoaGlnaGxpZ2h0LmlkKTtcbiAgICAgICAgaGlnaGxpZ2h0LnNlc3Npb24gPSBudWxsO1xuICAgICAgfTtcbiAgICAgIGhpZ2hsaWdodC51cGRhdGVPbkNoYW5nZSA9IGZ1bmN0aW9uKGRlbHRhKSB7XG4gICAgICAgIHZhciByb3cgPSBkZWx0YS5zdGFydC5yb3c7XG4gICAgICAgIGlmIChyb3cgPT0gZGVsdGEuZW5kLnJvdykgaGlnaGxpZ2h0LmNhY2hlW3Jvd10gPSB1bmRlZmluZWQ7XG4gICAgICAgIGVsc2UgaGlnaGxpZ2h0LmNhY2hlLnNwbGljZShyb3csIGhpZ2hsaWdodC5jYWNoZS5sZW5ndGgpO1xuICAgICAgfTtcbiAgICAgIGhpZ2hsaWdodC5zZXNzaW9uLm9uKFwiY2hhbmdlRWRpdG9yXCIsIGhpZ2hsaWdodC5kZXN0cm95KTtcbiAgICAgIGhpZ2hsaWdodC5zZXNzaW9uLm9uKFwiY2hhbmdlXCIsIGhpZ2hsaWdodC51cGRhdGVPbkNoYW5nZSk7XG4gICAgfVxuICAgIHZhciByZSA9IG5ldyBSZWdFeHAoby5xdWVyeS5zb3VyY2UsIFwiZ21pXCIpO1xuICAgIHRoaXMuJHNlYXJjaEhpZ2hsaWdodCA9IG8uaGlnaGxpZ2h0ID0gaGlnaGxpZ2h0O1xuICAgIHRoaXMuJHNlYXJjaEhpZ2hsaWdodC5zZXRSZWdleHAocmUpO1xuICAgIHRoaXMuYWNlLnJlbmRlcmVyLnVwZGF0ZUJhY2tNYXJrZXJzKCk7XG4gIH07XG4gIHRoaXMucmVtb3ZlT3ZlcmxheSA9IGZ1bmN0aW9uKG8pIHtcbiAgICBpZiAodGhpcy4kc2VhcmNoSGlnaGxpZ2h0ICYmIHRoaXMuJHNlYXJjaEhpZ2hsaWdodC5zZXNzaW9uKSB7XG4gICAgICB0aGlzLiRzZWFyY2hIaWdobGlnaHQuZGVzdHJveSgpO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5nZXRTY3JvbGxJbmZvID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlbmRlcmVyID0gdGhpcy5hY2UucmVuZGVyZXI7XG4gICAgdmFyIGNvbmZpZyA9IHJlbmRlcmVyLmxheWVyQ29uZmlnO1xuICAgIHJldHVybiB7XG4gICAgICBsZWZ0OiByZW5kZXJlci5zY3JvbGxMZWZ0LFxuICAgICAgdG9wOiByZW5kZXJlci5zY3JvbGxUb3AsXG4gICAgICBoZWlnaHQ6IGNvbmZpZy5tYXhIZWlnaHQsXG4gICAgICB3aWR0aDogY29uZmlnLndpZHRoLFxuICAgICAgY2xpZW50SGVpZ2h0OiBjb25maWcuaGVpZ2h0LFxuICAgICAgY2xpZW50V2lkdGg6IGNvbmZpZy53aWR0aFxuICAgIH07XG4gIH07XG4gIHRoaXMuZ2V0VmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5hY2UuZ2V0VmFsdWUoKTtcbiAgfTtcbiAgdGhpcy5zZXRWYWx1ZSA9IGZ1bmN0aW9uKHYpIHtcbiAgICByZXR1cm4gdGhpcy5hY2Uuc2V0VmFsdWUodiwgLTEpO1xuICB9O1xuICB0aGlzLmdldFRva2VuVHlwZUF0ID0gZnVuY3Rpb24ocG9zKSB7XG4gICAgdmFyIHRva2VuID0gdGhpcy5hY2Uuc2Vzc2lvbi5nZXRUb2tlbkF0KHBvcy5saW5lLCBwb3MuY2gpO1xuICAgIHJldHVybiB0b2tlbiAmJiAvY29tbWVudHxzdHJpbmcvLnRlc3QodG9rZW4udHlwZSkgPyBcInN0cmluZ1wiIDogXCJcIjtcbiAgfTtcbiAgdGhpcy5maW5kTWF0Y2hpbmdCcmFja2V0ID0gZnVuY3Rpb24ocG9zKSB7XG4gICAgdmFyIG0gPSB0aGlzLmFjZS5zZXNzaW9uLmZpbmRNYXRjaGluZ0JyYWNrZXQodG9BY2VQb3MocG9zKSk7XG4gICAgcmV0dXJuIHt0bzogbSAmJiB0b0NtUG9zKG0pfTtcbiAgfTtcbiAgdGhpcy5maW5kTWF0Y2hpbmdUYWcgPSBmdW5jdGlvbiAocG9zKSB7XG4gICAgdmFyIG0gPSB0aGlzLmFjZS5zZXNzaW9uLmdldE1hdGNoaW5nVGFncyh0b0FjZVBvcyhwb3MpKTtcbiAgICBpZiAoIW0pIHJldHVybjtcbiAgICByZXR1cm4ge1xuICAgICAgb3Blbjoge1xuICAgICAgICBmcm9tOiB0b0NtUG9zKG0ub3BlblRhZy5zdGFydCksXG4gICAgICAgIHRvOiB0b0NtUG9zKG0ub3BlblRhZy5lbmQpXG4gICAgICB9LFxuICAgICAgY2xvc2U6IHtcbiAgICAgICAgZnJvbTogdG9DbVBvcyhtLmNsb3NlVGFnLnN0YXJ0KSxcbiAgICAgICAgdG86IHRvQ21Qb3MobS5jbG9zZVRhZy5lbmQpXG4gICAgICB9XG4gICAgfTtcbiAgfTtcbiAgdGhpcy5pbmRlbnRMaW5lID0gZnVuY3Rpb24obGluZSwgbWV0aG9kKSB7XG4gICAgaWYgKG1ldGhvZCA9PT0gdHJ1ZSlcbiAgICAgICAgdGhpcy5hY2Uuc2Vzc2lvbi5pbmRlbnRSb3dzKGxpbmUsIGxpbmUsIFwiXFx0XCIpO1xuICAgIGVsc2UgaWYgKG1ldGhvZCA9PT0gZmFsc2UpXG4gICAgICAgIHRoaXMuYWNlLnNlc3Npb24ub3V0ZGVudFJvd3MobmV3IFJhbmdlKGxpbmUsIDAsIGxpbmUsIDApKTtcbiAgfTtcbiAgdGhpcy5pbmRleEZyb21Qb3MgPSBmdW5jdGlvbihwb3MpIHtcbiAgICByZXR1cm4gdGhpcy5hY2Uuc2Vzc2lvbi5kb2MucG9zaXRpb25Ub0luZGV4KHRvQWNlUG9zKHBvcykpO1xuICB9O1xuICB0aGlzLnBvc0Zyb21JbmRleCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgcmV0dXJuIHRvQ21Qb3ModGhpcy5hY2Uuc2Vzc2lvbi5kb2MuaW5kZXhUb1Bvc2l0aW9uKGluZGV4KSk7XG4gIH07XG4gIHRoaXMuZm9jdXMgPSBmdW5jdGlvbihpbmRleCkge1xuICAgIHJldHVybiB0aGlzLmFjZS50ZXh0SW5wdXQuZm9jdXMoKTtcbiAgfTtcbiAgdGhpcy5ibHVyID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5hY2UuYmx1cigpO1xuICB9O1xuICB0aGlzLmRlZmF1bHRUZXh0SGVpZ2h0ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5hY2UucmVuZGVyZXIubGF5ZXJDb25maWcubGluZUhlaWdodDtcbiAgfTtcbiAgdGhpcy5zY2FuRm9yQnJhY2tldCA9IGZ1bmN0aW9uKHBvcywgZGlyLCBfLCBvcHRpb25zKSB7XG4gICAgdmFyIHJlID0gb3B0aW9ucy5icmFja2V0UmVnZXguc291cmNlO1xuICAgIHZhciB0b2tlblJlID0gL3BhcmVufHRleHR8b3BlcmF0b3J8dGFnLztcbiAgICBpZiAoZGlyID09IDEpIHtcbiAgICAgIHZhciBtID0gdGhpcy5hY2Uuc2Vzc2lvbi4kZmluZENsb3NpbmdCcmFja2V0KHJlLnNsaWNlKDEsIDIpLCB0b0FjZVBvcyhwb3MpLCB0b2tlblJlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG0gPSB0aGlzLmFjZS5zZXNzaW9uLiRmaW5kT3BlbmluZ0JyYWNrZXQocmUuc2xpY2UoLTIsIC0xKSwge3JvdzogcG9zLmxpbmUsIGNvbHVtbjogcG9zLmNoICsgMX0sIHRva2VuUmUpO1xuICAgICAgaWYgKCFtICYmIG9wdGlvbnMuYnJhY2tldFJlZ2V4ICYmIG9wdGlvbnMuYnJhY2tldFJlZ2V4LnRlc3QodGhpcy5nZXRMaW5lKHBvcy5saW5lKVtwb3MuY2ggLSAxXSkpIHtcbiAgICAgICAgICBtID0ge3JvdzogcG9zLmxpbmUsIGNvbHVtbjogcG9zLmNoIC0gMX07XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtICYmIHtwb3M6IHRvQ21Qb3MobSl9O1xuICB9O1xuICB0aGlzLnJlZnJlc2ggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5hY2UucmVzaXplKHRydWUpO1xuICB9O1xuICB0aGlzLmdldE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4geyBuYW1lIDogdGhpcy5nZXRPcHRpb24oXCJtb2RlXCIpIH07XG4gIH07XG4gIHRoaXMuZXhlY0NvbW1hbmQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgaWYgKENvZGVNaXJyb3IuY29tbWFuZHMuaGFzT3duUHJvcGVydHkobmFtZSkpIHJldHVybiBDb2RlTWlycm9yLmNvbW1hbmRzW25hbWVdKHRoaXMpO1xuICAgIGlmIChuYW1lID09IFwiaW5kZW50QXV0b1wiKSByZXR1cm4gdGhpcy5hY2UuZXhlY0NvbW1hbmQoXCJhdXRvaW5kZW50XCIpO1xuICAgIGNvbnNvbGUubG9nKG5hbWUgKyBcIiBpcyBub3QgaW1wbGVtZW50ZWRcIik7XG4gIH07XG4gIHRoaXMuZ2V0TGluZU51bWJlciA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgIHZhciBkZWx0YXMgPSB0aGlzLiRsaW5lSGFuZGxlQ2hhbmdlcztcbiAgICBpZiAoIWRlbHRhcylcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgdmFyIHJvdyA9IGhhbmRsZS5yb3c7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZWx0YXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGRlbHRhID0gZGVsdGFzW2ldO1xuICAgICAgICBpZiAoZGVsdGEuc3RhcnQucm93ICE9IGRlbHRhLmVuZC5yb3cpIHtcbiAgICAgICAgICAgIGlmIChkZWx0YS5hY3Rpb25bMF0gPT0gXCJpXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGVsdGEuc3RhcnQucm93IDwgcm93KVxuICAgICAgICAgICAgICAgICAgICByb3cgKz0gZGVsdGEuZW5kLnJvdyAtIGRlbHRhLnN0YXJ0LnJvdztcbiAgICAgICAgICAgIH0gIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChkZWx0YS5zdGFydC5yb3cgPCByb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJvdyA8IGRlbHRhLmVuZC5yb3cgfHwgcm93ID09IGRlbHRhLmVuZC5yb3cgJiYgZGVsdGEuc3RhcnQuY29sdW1uID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcm93IC09IGRlbHRhLmVuZC5yb3cgLSBkZWx0YS5zdGFydC5yb3c7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiByb3c7XG4gIH07XG4gIHRoaXMuZ2V0TGluZUhhbmRsZSA9IGZ1bmN0aW9uKHJvdykge1xuICAgIGlmICghdGhpcy4kbGluZUhhbmRsZUNoYW5nZXMpXG4gICAgICB0aGlzLiRsaW5lSGFuZGxlQ2hhbmdlcyA9IFtdO1xuICAgIHJldHVybiB7dGV4dDogdGhpcy5hY2Uuc2Vzc2lvbi5nZXRMaW5lKHJvdyksIHJvdzogcm93fTtcbiAgfTtcbiAgdGhpcy5yZWxlYXNlTGluZUhhbmRsZXMgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRsaW5lSGFuZGxlQ2hhbmdlcyA9IHVuZGVmaW5lZDtcbiAgfTtcbiAgdGhpcy5nZXRMYXN0RWRpdEVuZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciB1bmRvTWFuYWdlciA9IHRoaXMuYWNlLnNlc3Npb24uJHVuZG9NYW5hZ2VyO1xuICAgIGlmICh1bmRvTWFuYWdlciAmJiB1bmRvTWFuYWdlci4kbGFzdERlbHRhKVxuICAgICAgcmV0dXJuIHRvQ21Qb3ModW5kb01hbmFnZXIuJGxhc3REZWx0YS5lbmQpO1xuICB9O1xufSkuY2FsbChDb2RlTWlycm9yLnByb3RvdHlwZSk7XG4gIGZ1bmN0aW9uIHRvQWNlUG9zKGNtUG9zKSB7XG4gICAgcmV0dXJuIHtyb3c6IGNtUG9zLmxpbmUsIGNvbHVtbjogY21Qb3MuY2h9O1xuICB9XG4gIGZ1bmN0aW9uIHRvQ21Qb3MoYWNlUG9zKSB7XG4gICAgcmV0dXJuIG5ldyBQb3MoYWNlUG9zLnJvdywgYWNlUG9zLmNvbHVtbik7XG4gIH1cblxuICB2YXIgU3RyaW5nU3RyZWFtID0gQ29kZU1pcnJvci5TdHJpbmdTdHJlYW0gPSBmdW5jdGlvbihzdHJpbmcsIHRhYlNpemUpIHtcbiAgICB0aGlzLnBvcyA9IHRoaXMuc3RhcnQgPSAwO1xuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xuICAgIHRoaXMudGFiU2l6ZSA9IHRhYlNpemUgfHwgODtcbiAgICB0aGlzLmxhc3RDb2x1bW5Qb3MgPSB0aGlzLmxhc3RDb2x1bW5WYWx1ZSA9IDA7XG4gICAgdGhpcy5saW5lU3RhcnQgPSAwO1xuICB9O1xuXG4gIFN0cmluZ1N0cmVhbS5wcm90b3R5cGUgPSB7XG4gICAgZW9sOiBmdW5jdGlvbigpIHtyZXR1cm4gdGhpcy5wb3MgPj0gdGhpcy5zdHJpbmcubGVuZ3RoO30sXG4gICAgc29sOiBmdW5jdGlvbigpIHtyZXR1cm4gdGhpcy5wb3MgPT0gdGhpcy5saW5lU3RhcnQ7fSxcbiAgICBwZWVrOiBmdW5jdGlvbigpIHtyZXR1cm4gdGhpcy5zdHJpbmcuY2hhckF0KHRoaXMucG9zKSB8fCB1bmRlZmluZWQ7fSxcbiAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnBvcyA8IHRoaXMuc3RyaW5nLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyaW5nLmNoYXJBdCh0aGlzLnBvcysrKTtcbiAgICB9LFxuICAgIGVhdDogZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgIHZhciBjaCA9IHRoaXMuc3RyaW5nLmNoYXJBdCh0aGlzLnBvcyk7XG4gICAgICBpZiAodHlwZW9mIG1hdGNoID09IFwic3RyaW5nXCIpIHZhciBvayA9IGNoID09IG1hdGNoO1xuICAgICAgZWxzZSB2YXIgb2sgPSBjaCAmJiAobWF0Y2gudGVzdCA/IG1hdGNoLnRlc3QoY2gpIDogbWF0Y2goY2gpKTtcbiAgICAgIGlmIChvaykgeysrdGhpcy5wb3M7IHJldHVybiBjaDt9XG4gICAgfSxcbiAgICBlYXRXaGlsZTogZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgIHZhciBzdGFydCA9IHRoaXMucG9zO1xuICAgICAgd2hpbGUgKHRoaXMuZWF0KG1hdGNoKSl7fVxuICAgICAgcmV0dXJuIHRoaXMucG9zID4gc3RhcnQ7XG4gICAgfSxcbiAgICBlYXRTcGFjZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc3RhcnQgPSB0aGlzLnBvcztcbiAgICAgIHdoaWxlICgvW1xcc1xcdTAwYTBdLy50ZXN0KHRoaXMuc3RyaW5nLmNoYXJBdCh0aGlzLnBvcykpKSArK3RoaXMucG9zO1xuICAgICAgcmV0dXJuIHRoaXMucG9zID4gc3RhcnQ7XG4gICAgfSxcbiAgICBza2lwVG9FbmQ6IGZ1bmN0aW9uKCkge3RoaXMucG9zID0gdGhpcy5zdHJpbmcubGVuZ3RoO30sXG4gICAgc2tpcFRvOiBmdW5jdGlvbihjaCkge1xuICAgICAgdmFyIGZvdW5kID0gdGhpcy5zdHJpbmcuaW5kZXhPZihjaCwgdGhpcy5wb3MpO1xuICAgICAgaWYgKGZvdW5kID4gLTEpIHt0aGlzLnBvcyA9IGZvdW5kOyByZXR1cm4gdHJ1ZTt9XG4gICAgfSxcbiAgICBiYWNrVXA6IGZ1bmN0aW9uKG4pIHt0aGlzLnBvcyAtPSBuO30sXG4gICAgY29sdW1uOiBmdW5jdGlvbigpIHtcbiAgICAgIHRocm93IFwibm90IGltcGxlbWVudGVkXCI7XG4gICAgfSxcbiAgICBpbmRlbnRhdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICB0aHJvdyBcIm5vdCBpbXBsZW1lbnRlZFwiO1xuICAgIH0sXG4gICAgbWF0Y2g6IGZ1bmN0aW9uKHBhdHRlcm4sIGNvbnN1bWUsIGNhc2VJbnNlbnNpdGl2ZSkge1xuICAgICAgaWYgKHR5cGVvZiBwYXR0ZXJuID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdmFyIGNhc2VkID0gZnVuY3Rpb24oc3RyKSB7cmV0dXJuIGNhc2VJbnNlbnNpdGl2ZSA/IHN0ci50b0xvd2VyQ2FzZSgpIDogc3RyO307XG4gICAgICAgIHZhciBzdWJzdHIgPSB0aGlzLnN0cmluZy5zdWJzdHIodGhpcy5wb3MsIHBhdHRlcm4ubGVuZ3RoKTtcbiAgICAgICAgaWYgKGNhc2VkKHN1YnN0cikgPT0gY2FzZWQocGF0dGVybikpIHtcbiAgICAgICAgICBpZiAoY29uc3VtZSAhPT0gZmFsc2UpIHRoaXMucG9zICs9IHBhdHRlcm4ubGVuZ3RoO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLnN0cmluZy5zbGljZSh0aGlzLnBvcykubWF0Y2gocGF0dGVybik7XG4gICAgICAgIGlmIChtYXRjaCAmJiBtYXRjaC5pbmRleCA+IDApIHJldHVybiBudWxsO1xuICAgICAgICBpZiAobWF0Y2ggJiYgY29uc3VtZSAhPT0gZmFsc2UpIHRoaXMucG9zICs9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgfVxuICAgIH0sXG4gICAgY3VycmVudDogZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zdHJpbmcuc2xpY2UodGhpcy5zdGFydCwgdGhpcy5wb3MpO30sXG4gICAgaGlkZUZpcnN0Q2hhcnM6IGZ1bmN0aW9uKG4sIGlubmVyKSB7XG4gICAgICB0aGlzLmxpbmVTdGFydCArPSBuO1xuICAgICAgdHJ5IHsgcmV0dXJuIGlubmVyKCk7IH1cbiAgICAgIGZpbmFsbHkgeyB0aGlzLmxpbmVTdGFydCAtPSBuOyB9XG4gICAgfVxuICB9O1xuXG4vLyB0b2RvIHJlcGxhY2Ugd2l0aCBzaG93Q29tbWFuZExpbmVcbkNvZGVNaXJyb3IuZGVmaW5lRXh0ZW5zaW9uID0gZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgQ29kZU1pcnJvci5wcm90b3R5cGVbbmFtZV0gPSBmbjtcbn07XG5kb21MaWIuaW1wb3J0Q3NzU3RyaW5nKGAubm9ybWFsLW1vZGUgLmFjZV9jdXJzb3J7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LDAsMCwwLjUpO1xufVxuLm5vcm1hbC1tb2RlIC5hY2VfaGlkZGVuLWN1cnNvcnMgLmFjZV9jdXJzb3J7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IDFweCBzb2xpZCByZWQ7XG4gIG9wYWNpdHk6IDAuN1xufVxuLmFjZV9kaWFsb2cge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7IHJpZ2h0OiAwO1xuICBiYWNrZ3JvdW5kOiBpbmhlcml0O1xuICB6LWluZGV4OiAxNTtcbiAgcGFkZGluZzogLjFlbSAuOGVtO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBjb2xvcjogaW5oZXJpdDtcbn1cbi5hY2VfZGlhbG9nLXRvcCB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjNDQ0O1xuICB0b3A6IDA7XG59XG4uYWNlX2RpYWxvZy1ib3R0b20ge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgIzQ0NDtcbiAgYm90dG9tOiAwO1xufVxuLmFjZV9kaWFsb2cgaW5wdXQge1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICB3aWR0aDogMjBlbTtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG59YCwgXCJ2aW1Nb2RlXCIsIGZhbHNlKTtcbihmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gZGlhbG9nRGl2KGNtLCB0ZW1wbGF0ZSwgYm90dG9tKSB7XG4gICAgdmFyIHdyYXAgPSBjbS5hY2UuY29udGFpbmVyO1xuICAgIHZhciBkaWFsb2c7XG4gICAgZGlhbG9nID0gd3JhcC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICBpZiAoYm90dG9tKVxuICAgICAgZGlhbG9nLmNsYXNzTmFtZSA9IFwiYWNlX2RpYWxvZyBhY2VfZGlhbG9nLWJvdHRvbVwiO1xuICAgIGVsc2VcbiAgICAgIGRpYWxvZy5jbGFzc05hbWUgPSBcImFjZV9kaWFsb2cgYWNlX2RpYWxvZy10b3BcIjtcblxuICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgPT0gXCJzdHJpbmdcIikge1xuICAgICAgZGlhbG9nLmlubmVySFRNTCA9IHRlbXBsYXRlO1xuICAgIH0gZWxzZSB7IC8vIEFzc3VtaW5nIGl0J3MgYSBkZXRhY2hlZCBET00gZWxlbWVudC5cbiAgICAgIGRpYWxvZy5hcHBlbmRDaGlsZCh0ZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBkaWFsb2c7XG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZU5vdGlmaWNhdGlvbihjbSwgbmV3VmFsKSB7XG4gICAgaWYgKGNtLnN0YXRlLmN1cnJlbnROb3RpZmljYXRpb25DbG9zZSlcbiAgICAgIGNtLnN0YXRlLmN1cnJlbnROb3RpZmljYXRpb25DbG9zZSgpO1xuICAgIGNtLnN0YXRlLmN1cnJlbnROb3RpZmljYXRpb25DbG9zZSA9IG5ld1ZhbDtcbiAgfVxuXG4gIENvZGVNaXJyb3IuZGVmaW5lRXh0ZW5zaW9uKFwib3BlbkRpYWxvZ1wiLCBmdW5jdGlvbih0ZW1wbGF0ZSwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICBpZiAodGhpcy52aXJ0dWFsU2VsZWN0aW9uTW9kZSgpKSByZXR1cm47XG4gICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG5cbiAgICBjbG9zZU5vdGlmaWNhdGlvbih0aGlzLCBudWxsKTtcblxuICAgIHZhciBkaWFsb2cgPSBkaWFsb2dEaXYodGhpcywgdGVtcGxhdGUsIG9wdGlvbnMuYm90dG9tKTtcbiAgICB2YXIgY2xvc2VkID0gZmFsc2UsIG1lID0gdGhpcztcbiAgICB0aGlzLnN0YXRlLmRpYWxvZyA9IGRpYWxvZztcbiAgICBmdW5jdGlvbiBjbG9zZShuZXdWYWwpIHtcbiAgICAgIGlmICh0eXBlb2YgbmV3VmFsID09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlucC52YWx1ZSA9IG5ld1ZhbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjbG9zZWQpIHJldHVybjtcblxuICAgICAgICBpZiAobmV3VmFsICYmIG5ld1ZhbC50eXBlID09IFwiYmx1clwiKSB7XG4gICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGlucClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZS5zdGF0ZS5kaWFsb2cgPT0gZGlhbG9nKSB7XG4gICAgICAgICAgbWUuc3RhdGUuZGlhbG9nID0gbnVsbDtcbiAgICAgICAgICBtZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIGNsb3NlZCA9IHRydWU7XG4gICAgICAgIGRpYWxvZy5yZW1vdmUoKTtcblxuICAgICAgICBpZiAob3B0aW9ucy5vbkNsb3NlKSBvcHRpb25zLm9uQ2xvc2UoZGlhbG9nKTtcblxuICAgICAgICAvLyBhY2VfcGF0Y2h7XG4gICAgICAgIHZhciBjbSA9IG1lO1xuICAgICAgICBpZiAoY20uc3RhdGUudmltKSB7XG4gICAgICAgICAgY20uc3RhdGUudmltLnN0YXR1cyA9IG51bGw7XG4gICAgICAgICAgY20uYWNlLl9zaWduYWwoXCJjaGFuZ2VTdGF0dXNcIik7XG4gICAgICAgICAgY20uYWNlLnJlbmRlcmVyLiRsb29wLnNjaGVkdWxlKGNtLmFjZS5yZW5kZXJlci5DSEFOR0VfQ1VSU09SKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhY2VfcGF0Y2h9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGlucCA9IGRpYWxvZy5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpWzBdLCBidXR0b247XG4gICAgaWYgKGlucCkge1xuICAgICAgaWYgKG9wdGlvbnMudmFsdWUpIHtcbiAgICAgICAgaW5wLnZhbHVlID0gb3B0aW9ucy52YWx1ZTtcbiAgICAgICAgaWYgKG9wdGlvbnMuc2VsZWN0VmFsdWVPbk9wZW4gIT09IGZhbHNlKSBpbnAuc2VsZWN0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLm9uSW5wdXQpXG4gICAgICAgIENvZGVNaXJyb3Iub24oaW5wLCBcImlucHV0XCIsIGZ1bmN0aW9uKGUpIHsgb3B0aW9ucy5vbklucHV0KGUsIGlucC52YWx1ZSwgY2xvc2UpO30pO1xuICAgICAgaWYgKG9wdGlvbnMub25LZXlVcClcbiAgICAgICAgQ29kZU1pcnJvci5vbihpbnAsIFwia2V5dXBcIiwgZnVuY3Rpb24oZSkge29wdGlvbnMub25LZXlVcChlLCBpbnAudmFsdWUsIGNsb3NlKTt9KTtcblxuICAgICAgQ29kZU1pcnJvci5vbihpbnAsIFwia2V5ZG93blwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMub25LZXlEb3duICYmIG9wdGlvbnMub25LZXlEb3duKGUsIGlucC52YWx1ZSwgY2xvc2UpKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoZS5rZXlDb2RlID09IDEzKSBjYWxsYmFjayhpbnAudmFsdWUpO1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09IDI3IHx8IChvcHRpb25zLmNsb3NlT25FbnRlciAhPT0gZmFsc2UgJiYgZS5rZXlDb2RlID09IDEzKSkge1xuICAgICAgICAgIENvZGVNaXJyb3IuZV9zdG9wKGUpO1xuICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAob3B0aW9ucy5jbG9zZU9uQmx1ciAhPT0gZmFsc2UpIENvZGVNaXJyb3Iub24oaW5wLCBcImJsdXJcIiwgY2xvc2UpO1xuXG4gICAgICBpbnAuZm9jdXMoKTtcbiAgICB9IGVsc2UgaWYgKGJ1dHRvbiA9IGRpYWxvZy5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJ1dHRvblwiKVswXSkge1xuICAgICAgQ29kZU1pcnJvci5vbihidXR0b24sIFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsb3NlKCk7XG4gICAgICAgIG1lLmZvY3VzKCk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKG9wdGlvbnMuY2xvc2VPbkJsdXIgIT09IGZhbHNlKSBDb2RlTWlycm9yLm9uKGJ1dHRvbiwgXCJibHVyXCIsIGNsb3NlKTtcblxuICAgICAgYnV0dG9uLmZvY3VzKCk7XG4gICAgfVxuICAgIHJldHVybiBjbG9zZTtcbiAgfSk7XG5cbiAgQ29kZU1pcnJvci5kZWZpbmVFeHRlbnNpb24oXCJvcGVuTm90aWZpY2F0aW9uXCIsIGZ1bmN0aW9uKHRlbXBsYXRlLCBvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMudmlydHVhbFNlbGVjdGlvbk1vZGUoKSkgcmV0dXJuO1xuICAgIGNsb3NlTm90aWZpY2F0aW9uKHRoaXMsIGNsb3NlKTtcbiAgICB2YXIgZGlhbG9nID0gZGlhbG9nRGl2KHRoaXMsIHRlbXBsYXRlLCBvcHRpb25zICYmIG9wdGlvbnMuYm90dG9tKTtcbiAgICB2YXIgY2xvc2VkID0gZmFsc2UsIGRvbmVUaW1lcjtcbiAgICB2YXIgZHVyYXRpb24gPSBvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLmR1cmF0aW9uICE9PSBcInVuZGVmaW5lZFwiID8gb3B0aW9ucy5kdXJhdGlvbiA6IDUwMDA7XG5cbiAgICBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgIGlmIChjbG9zZWQpIHJldHVybjtcbiAgICAgIGNsb3NlZCA9IHRydWU7XG4gICAgICBjbGVhclRpbWVvdXQoZG9uZVRpbWVyKTtcbiAgICAgIGRpYWxvZy5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBDb2RlTWlycm9yLm9uKGRpYWxvZywgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgQ29kZU1pcnJvci5lX3ByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgY2xvc2UoKTtcbiAgICB9KTtcblxuICAgIGlmIChkdXJhdGlvbilcbiAgICAgIGRvbmVUaW1lciA9IHNldFRpbWVvdXQoY2xvc2UsIGR1cmF0aW9uKTtcblxuICAgIHJldHVybiBjbG9zZTtcbiAgfSk7XG59KSgpO1xuXG5cbiAgdmFyIFBvcyA9IENvZGVNaXJyb3IuUG9zO1xuXG4gIGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGlvbkZvclN1cnJvZ2F0ZUNoYXJhY3RlcnMoY20sIGN1clN0YXJ0LCBjdXJFbmQpIHtcbiAgICAvLyBzdGFydCBhbmQgY2hhcmFjdGVyIHBvc2l0aW9uIHdoZW4gbm8gc2VsZWN0aW9uIFxuICAgIC8vIGlzIHRoZSBzYW1lIGluIHZpc3VhbCBtb2RlLCBhbmQgZGlmZmVycyBpbiAxIGNoYXJhY3RlciBpbiBub3JtYWwgbW9kZVxuICAgIGlmIChjdXJTdGFydC5saW5lID09PSBjdXJFbmQubGluZSAmJiBjdXJTdGFydC5jaCA+PSBjdXJFbmQuY2ggLSAxKSB7XG4gICAgICB2YXIgdGV4dCA9IGNtLmdldExpbmUoY3VyU3RhcnQubGluZSk7XG4gICAgICB2YXIgY2hhckNvZGUgPSB0ZXh0LmNoYXJDb2RlQXQoY3VyU3RhcnQuY2gpO1xuICAgICAgaWYgKDB4RDgwMCA8PSBjaGFyQ29kZSAmJiBjaGFyQ29kZSA8PSAweEQ4RkYpIHtcbiAgICAgICAgY3VyRW5kLmNoICs9IDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtzdGFydDogY3VyU3RhcnQsIGVuZDogY3VyRW5kfTtcbiAgfVxuXG4gIHZhciBkZWZhdWx0S2V5bWFwID0gW1xuICAgIC8vIEtleSB0byBrZXkgbWFwcGluZy4gVGhpcyBnb2VzIGZpcnN0IHRvIG1ha2UgaXQgcG9zc2libGUgdG8gb3ZlcnJpZGVcbiAgICAvLyBleGlzdGluZyBtYXBwaW5ncy5cbiAgICB7IGtleXM6ICc8TGVmdD4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdoJyB9LFxuICAgIHsga2V5czogJzxSaWdodD4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdsJyB9LFxuICAgIHsga2V5czogJzxVcD4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdrJyB9LFxuICAgIHsga2V5czogJzxEb3duPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2onIH0sXG4gICAgeyBrZXlzOiAnZzxVcD4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdnaycgfSxcbiAgICB7IGtleXM6ICdnPERvd24+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnZ2onIH0sXG4gICAgeyBrZXlzOiAnPFNwYWNlPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2wnIH0sXG4gICAgeyBrZXlzOiAnPEJTPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2gnfSxcbiAgICB7IGtleXM6ICc8RGVsPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ3gnIH0sXG4gICAgeyBrZXlzOiAnPEMtU3BhY2U+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnVycgfSxcbiAgICB7IGtleXM6ICc8Qy1CUz4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdCJyB9LFxuICAgIHsga2V5czogJzxTLVNwYWNlPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ3cnIH0sXG4gICAgeyBrZXlzOiAnPFMtQlM+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnYicgfSxcbiAgICB7IGtleXM6ICc8Qy1uPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2onIH0sXG4gICAgeyBrZXlzOiAnPEMtcD4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdrJyB9LFxuICAgIHsga2V5czogJzxDLVs+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnPEVzYz4nIH0sXG4gICAgeyBrZXlzOiAnPEMtYz4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICc8RXNjPicgfSxcbiAgICB7IGtleXM6ICc8Qy1bPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJzxFc2M+JywgY29udGV4dDogJ2luc2VydCcgfSxcbiAgICB7IGtleXM6ICc8Qy1jPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJzxFc2M+JywgY29udGV4dDogJ2luc2VydCcgfSxcbiAgICB7IGtleXM6ICc8Qy1Fc2M+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnPEVzYz4nIH0sIC8vIGlwYWQga2V5Ym9hcmQgc2VuZHMgQy1Fc2MgaW5zdGVhZCBvZiBDLVtcbiAgICB7IGtleXM6ICc8Qy1Fc2M+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnPEVzYz4nLCBjb250ZXh0OiAnaW5zZXJ0JyB9LFxuICAgIHsga2V5czogJ3MnLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdjbCcsIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAncycsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2MnLCBjb250ZXh0OiAndmlzdWFsJ30sXG4gICAgeyBrZXlzOiAnUycsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2NjJywgY29udGV4dDogJ25vcm1hbCcgfSxcbiAgICB7IGtleXM6ICdTJywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnVmRPJywgY29udGV4dDogJ3Zpc3VhbCcgfSxcbiAgICB7IGtleXM6ICc8SG9tZT4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICcwJyB9LFxuICAgIHsga2V5czogJzxFbmQ+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnJCcgfSxcbiAgICB7IGtleXM6ICc8UGFnZVVwPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJzxDLWI+JyB9LFxuICAgIHsga2V5czogJzxQYWdlRG93bj4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICc8Qy1mPicgfSxcbiAgICB7IGtleXM6ICc8Q1I+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnal4nLCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJzxJbnM+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnaScsIGNvbnRleHQ6ICdub3JtYWwnfSxcbiAgICB7IGtleXM6ICc8SW5zPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICd0b2dnbGVPdmVyd3JpdGUnLCBjb250ZXh0OiAnaW5zZXJ0JyB9LFxuICAgIC8vIE1vdGlvbnNcbiAgICB7IGtleXM6ICdIJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb1RvcExpbmUnLCBtb3Rpb25BcmdzOiB7IGxpbmV3aXNlOiB0cnVlLCB0b0p1bXBsaXN0OiB0cnVlIH19LFxuICAgIHsga2V5czogJ00nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvTWlkZGxlTGluZScsIG1vdGlvbkFyZ3M6IHsgbGluZXdpc2U6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnTCcsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9Cb3R0b21MaW5lJywgbW90aW9uQXJnczogeyBsaW5ld2lzZTogdHJ1ZSwgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdoJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeUNoYXJhY3RlcnMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJ2wnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5Q2hhcmFjdGVycycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdqJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeUxpbmVzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlLCBsaW5ld2lzZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdrJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeUxpbmVzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgbGluZXdpc2U6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnZ2onLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5RGlzcGxheUxpbmVzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlIH19LFxuICAgIHsga2V5czogJ2drJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeURpc3BsYXlMaW5lcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UgfX0sXG4gICAgeyBrZXlzOiAndycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgd29yZEVuZDogZmFsc2UgfX0sXG4gICAgeyBrZXlzOiAnVycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgd29yZEVuZDogZmFsc2UsIGJpZ1dvcmQ6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnZScsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgd29yZEVuZDogdHJ1ZSwgaW5jbHVzaXZlOiB0cnVlIH19LFxuICAgIHsga2V5czogJ0UnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5V29yZHMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHdvcmRFbmQ6IHRydWUsIGJpZ1dvcmQ6IHRydWUsIGluY2x1c2l2ZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdiJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVdvcmRzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgd29yZEVuZDogZmFsc2UgfX0sXG4gICAgeyBrZXlzOiAnQicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHdvcmRFbmQ6IGZhbHNlLCBiaWdXb3JkOiB0cnVlIH19LFxuICAgIHsga2V5czogJ2dlJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVdvcmRzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgd29yZEVuZDogdHJ1ZSwgaW5jbHVzaXZlOiB0cnVlIH19LFxuICAgIHsga2V5czogJ2dFJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVdvcmRzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgd29yZEVuZDogdHJ1ZSwgYmlnV29yZDogdHJ1ZSwgaW5jbHVzaXZlOiB0cnVlIH19LFxuICAgIHsga2V5czogJ3snLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5UGFyYWdyYXBoJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICd9JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVBhcmFncmFwaCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICcoJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVNlbnRlbmNlJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSB9fSxcbiAgICB7IGtleXM6ICcpJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVNlbnRlbmNlJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlIH19LFxuICAgIHsga2V5czogJzxDLWY+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVBhZ2UnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnPEMtYj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5UGFnZScsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UgfX0sXG4gICAgeyBrZXlzOiAnPEMtZD4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5U2Nyb2xsJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlLCBleHBsaWNpdFJlcGVhdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICc8Qy11PicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlTY3JvbGwnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCBleHBsaWNpdFJlcGVhdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdnZycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9MaW5lT3JFZGdlT2ZEb2N1bWVudCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIGV4cGxpY2l0UmVwZWF0OiB0cnVlLCBsaW5ld2lzZTogdHJ1ZSwgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdHJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb0xpbmVPckVkZ2VPZkRvY3VtZW50JywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlLCBleHBsaWNpdFJlcGVhdDogdHJ1ZSwgbGluZXdpc2U6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAge2tleXM6IFwiZyRcIiwgdHlwZTogXCJtb3Rpb25cIiwgbW90aW9uOiBcIm1vdmVUb0VuZE9mRGlzcGxheUxpbmVcIn0sXG4gICAge2tleXM6IFwiZ15cIiwgdHlwZTogXCJtb3Rpb25cIiwgbW90aW9uOiBcIm1vdmVUb1N0YXJ0T2ZEaXNwbGF5TGluZVwifSxcbiAgICB7a2V5czogXCJnMFwiLCB0eXBlOiBcIm1vdGlvblwiLCBtb3Rpb246IFwibW92ZVRvU3RhcnRPZkRpc3BsYXlMaW5lXCJ9LFxuICAgIHsga2V5czogJzAnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvU3RhcnRPZkxpbmUnIH0sXG4gICAgeyBrZXlzOiAnXicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXInIH0sXG4gICAgeyBrZXlzOiAnKycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlMaW5lcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgdG9GaXJzdENoYXI6dHJ1ZSB9fSxcbiAgICB7IGtleXM6ICctJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeUxpbmVzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgdG9GaXJzdENoYXI6dHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdfJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeUxpbmVzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlLCB0b0ZpcnN0Q2hhcjp0cnVlLCByZXBlYXRPZmZzZXQ6LTEgfX0sXG4gICAgeyBrZXlzOiAnJCcsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9Fb2wnLCBtb3Rpb25BcmdzOiB7IGluY2x1c2l2ZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICclJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb01hdGNoZWRTeW1ib2wnLCBtb3Rpb25BcmdzOiB7IGluY2x1c2l2ZTogdHJ1ZSwgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdmPGNoYXJhY3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvQ2hhcmFjdGVyJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlICwgaW5jbHVzaXZlOiB0cnVlIH19LFxuICAgIHsga2V5czogJ0Y8Y2hhcmFjdGVyPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9DaGFyYWN0ZXInLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJ3Q8Y2hhcmFjdGVyPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVGlsbENoYXJhY3RlcicsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgaW5jbHVzaXZlOiB0cnVlIH19LFxuICAgIHsga2V5czogJ1Q8Y2hhcmFjdGVyPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVGlsbENoYXJhY3RlcicsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UgfX0sXG4gICAgeyBrZXlzOiAnOycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdyZXBlYXRMYXN0Q2hhcmFjdGVyU2VhcmNoJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlIH19LFxuICAgIHsga2V5czogJywnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAncmVwZWF0TGFzdENoYXJhY3RlclNlYXJjaCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UgfX0sXG4gICAgeyBrZXlzOiAnXFwnPHJlZ2lzdGVyPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdnb1RvTWFyaycsIG1vdGlvbkFyZ3M6IHt0b0p1bXBsaXN0OiB0cnVlLCBsaW5ld2lzZTogdHJ1ZX19LFxuICAgIHsga2V5czogJ2A8cmVnaXN0ZXI+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ2dvVG9NYXJrJywgbW90aW9uQXJnczoge3RvSnVtcGxpc3Q6IHRydWV9fSxcbiAgICB7IGtleXM6ICddYCcsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdqdW1wVG9NYXJrJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICdbYCcsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdqdW1wVG9NYXJrJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSB9IH0sXG4gICAgeyBrZXlzOiAnXVxcJycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdqdW1wVG9NYXJrJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlLCBsaW5ld2lzZTogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnW1xcJycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdqdW1wVG9NYXJrJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgbGluZXdpc2U6IHRydWUgfSB9LFxuICAgIC8vIHRoZSBuZXh0IHR3byBhcmVuJ3QgbW90aW9ucyBidXQgbXVzdCBjb21lIGJlZm9yZSBtb3JlIGdlbmVyYWwgbW90aW9uIGRlY2xhcmF0aW9uc1xuICAgIHsga2V5czogJ11wJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Bhc3RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGFmdGVyOiB0cnVlLCBpc0VkaXQ6IHRydWUsIG1hdGNoSW5kZW50OiB0cnVlfX0sXG4gICAgeyBrZXlzOiAnW3AnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncGFzdGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgYWZ0ZXI6IGZhbHNlLCBpc0VkaXQ6IHRydWUsIG1hdGNoSW5kZW50OiB0cnVlfX0sXG4gICAgeyBrZXlzOiAnXTxjaGFyYWN0ZXI+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb1N5bWJvbCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgdG9KdW1wbGlzdDogdHJ1ZX19LFxuICAgIHsga2V5czogJ1s8Y2hhcmFjdGVyPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9TeW1ib2wnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCB0b0p1bXBsaXN0OiB0cnVlfX0sXG4gICAgeyBrZXlzOiAnfCcsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9Db2x1bW4nfSxcbiAgICB7IGtleXM6ICdvJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb090aGVySGlnaGxpZ2h0ZWRFbmQnLCBjb250ZXh0Oid2aXN1YWwnfSxcbiAgICB7IGtleXM6ICdPJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb090aGVySGlnaGxpZ2h0ZWRFbmQnLCBtb3Rpb25BcmdzOiB7c2FtZUxpbmU6IHRydWV9LCBjb250ZXh0Oid2aXN1YWwnfSxcbiAgICAvLyBPcGVyYXRvcnNcbiAgICB7IGtleXM6ICdkJywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdkZWxldGUnIH0sXG4gICAgeyBrZXlzOiAneScsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAneWFuaycgfSxcbiAgICB7IGtleXM6ICdjJywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdjaGFuZ2UnIH0sXG4gICAgeyBrZXlzOiAnPScsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnaW5kZW50QXV0bycgfSxcbiAgICB7IGtleXM6ICc+JywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdpbmRlbnQnLCBvcGVyYXRvckFyZ3M6IHsgaW5kZW50UmlnaHQ6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnPCcsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnaW5kZW50Jywgb3BlcmF0b3JBcmdzOiB7IGluZGVudFJpZ2h0OiBmYWxzZSB9fSxcbiAgICB7IGtleXM6ICdnficsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnY2hhbmdlQ2FzZScgfSxcbiAgICB7IGtleXM6ICdndScsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnY2hhbmdlQ2FzZScsIG9wZXJhdG9yQXJnczoge3RvTG93ZXI6IHRydWV9LCBpc0VkaXQ6IHRydWUgfSxcbiAgICB7IGtleXM6ICdnVScsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnY2hhbmdlQ2FzZScsIG9wZXJhdG9yQXJnczoge3RvTG93ZXI6IGZhbHNlfSwgaXNFZGl0OiB0cnVlIH0sXG4gICAgeyBrZXlzOiAnbicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdmaW5kTmV4dCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdOJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ2ZpbmROZXh0JywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdnbicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdmaW5kQW5kU2VsZWN0TmV4dEluY2x1c2l2ZScsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdnTicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdmaW5kQW5kU2VsZWN0TmV4dEluY2x1c2l2ZScsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UgfX0sXG4gICAgeyBrZXlzOiAnZ3EnLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2hhcmRXcmFwJyB9LFxuICAgIHsga2V5czogJ2d3JywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdoYXJkV3JhcCcsIG9wZXJhdG9yQXJnczoge2tlZXBDdXJzb3I6IHRydWV9fSxcbiAgICAvLyBPcGVyYXRvci1Nb3Rpb24gZHVhbCBjb21tYW5kc1xuICAgIHsga2V5czogJ3gnLCB0eXBlOiAnb3BlcmF0b3JNb3Rpb24nLCBvcGVyYXRvcjogJ2RlbGV0ZScsIG1vdGlvbjogJ21vdmVCeUNoYXJhY3RlcnMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUgfSwgb3BlcmF0b3JNb3Rpb25BcmdzOiB7IHZpc3VhbExpbmU6IGZhbHNlIH19LFxuICAgIHsga2V5czogJ1gnLCB0eXBlOiAnb3BlcmF0b3JNb3Rpb24nLCBvcGVyYXRvcjogJ2RlbGV0ZScsIG1vdGlvbjogJ21vdmVCeUNoYXJhY3RlcnMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH0sIG9wZXJhdG9yTW90aW9uQXJnczogeyB2aXN1YWxMaW5lOiB0cnVlIH19LFxuICAgIHsga2V5czogJ0QnLCB0eXBlOiAnb3BlcmF0b3JNb3Rpb24nLCBvcGVyYXRvcjogJ2RlbGV0ZScsIG1vdGlvbjogJ21vdmVUb0VvbCcsIG1vdGlvbkFyZ3M6IHsgaW5jbHVzaXZlOiB0cnVlIH0sIGNvbnRleHQ6ICdub3JtYWwnfSxcbiAgICB7IGtleXM6ICdEJywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdkZWxldGUnLCBvcGVyYXRvckFyZ3M6IHsgbGluZXdpc2U6IHRydWUgfSwgY29udGV4dDogJ3Zpc3VhbCd9LFxuICAgIHsga2V5czogJ1knLCB0eXBlOiAnb3BlcmF0b3JNb3Rpb24nLCBvcGVyYXRvcjogJ3lhbmsnLCBtb3Rpb246ICdleHBhbmRUb0xpbmUnLCBtb3Rpb25BcmdzOiB7IGxpbmV3aXNlOiB0cnVlIH0sIGNvbnRleHQ6ICdub3JtYWwnfSxcbiAgICB7IGtleXM6ICdZJywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICd5YW5rJywgb3BlcmF0b3JBcmdzOiB7IGxpbmV3aXNlOiB0cnVlIH0sIGNvbnRleHQ6ICd2aXN1YWwnfSxcbiAgICB7IGtleXM6ICdDJywgdHlwZTogJ29wZXJhdG9yTW90aW9uJywgb3BlcmF0b3I6ICdjaGFuZ2UnLCBtb3Rpb246ICdtb3ZlVG9Fb2wnLCBtb3Rpb25BcmdzOiB7IGluY2x1c2l2ZTogdHJ1ZSB9LCBjb250ZXh0OiAnbm9ybWFsJ30sXG4gICAgeyBrZXlzOiAnQycsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnY2hhbmdlJywgb3BlcmF0b3JBcmdzOiB7IGxpbmV3aXNlOiB0cnVlIH0sIGNvbnRleHQ6ICd2aXN1YWwnfSxcbiAgICB7IGtleXM6ICd+JywgdHlwZTogJ29wZXJhdG9yTW90aW9uJywgb3BlcmF0b3I6ICdjaGFuZ2VDYXNlJywgbW90aW9uOiAnbW92ZUJ5Q2hhcmFjdGVycycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9LCBvcGVyYXRvckFyZ3M6IHsgc2hvdWxkTW92ZUN1cnNvcjogdHJ1ZSB9LCBjb250ZXh0OiAnbm9ybWFsJ30sXG4gICAgeyBrZXlzOiAnficsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnY2hhbmdlQ2FzZScsIGNvbnRleHQ6ICd2aXN1YWwnfSxcbiAgICB7IGtleXM6ICc8Qy11PicsIHR5cGU6ICdvcGVyYXRvck1vdGlvbicsIG9wZXJhdG9yOiAnZGVsZXRlJywgbW90aW9uOiAnbW92ZVRvU3RhcnRPZkxpbmUnLCBjb250ZXh0OiAnaW5zZXJ0JyB9LFxuICAgIHsga2V5czogJzxDLXc+JywgdHlwZTogJ29wZXJhdG9yTW90aW9uJywgb3BlcmF0b3I6ICdkZWxldGUnLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHdvcmRFbmQ6IGZhbHNlIH0sIGNvbnRleHQ6ICdpbnNlcnQnIH0sXG4gICAgLy9pZ25vcmUgQy13IGluIG5vcm1hbCBtb2RlXG4gICAgeyBrZXlzOiAnPEMtdz4nLCB0eXBlOiAnaWRsZScsIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgLy8gQWN0aW9uc1xuICAgIHsga2V5czogJzxDLWk+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2p1bXBMaXN0V2FsaycsIGFjdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICc8Qy1vPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdqdW1wTGlzdFdhbGsnLCBhY3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJzxDLWU+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbCcsIGFjdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgbGluZXdpc2U6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnPEMteT4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnc2Nyb2xsJywgYWN0aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgbGluZXdpc2U6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnYScsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdlbnRlckluc2VydE1vZGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgaW5zZXJ0QXQ6ICdjaGFyQWZ0ZXInIH0sIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnQScsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdlbnRlckluc2VydE1vZGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgaW5zZXJ0QXQ6ICdlb2wnIH0sIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnQScsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdlbnRlckluc2VydE1vZGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgaW5zZXJ0QXQ6ICdlbmRPZlNlbGVjdGVkQXJlYScgfSwgY29udGV4dDogJ3Zpc3VhbCcgfSxcbiAgICB7IGtleXM6ICdpJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2VudGVySW5zZXJ0TW9kZScsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBpbnNlcnRBdDogJ2lucGxhY2UnIH0sIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnZ2knLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGluc2VydEF0OiAnbGFzdEVkaXQnIH0sIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnSScsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdlbnRlckluc2VydE1vZGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgaW5zZXJ0QXQ6ICdmaXJzdE5vbkJsYW5rJ30sIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnZ0knLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGluc2VydEF0OiAnYm9sJ30sIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnSScsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdlbnRlckluc2VydE1vZGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgaW5zZXJ0QXQ6ICdzdGFydE9mU2VsZWN0ZWRBcmVhJyB9LCBjb250ZXh0OiAndmlzdWFsJyB9LFxuICAgIHsga2V5czogJ28nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnbmV3TGluZUFuZEVudGVySW5zZXJ0TW9kZScsIGlzRWRpdDogdHJ1ZSwgaW50ZXJsYWNlSW5zZXJ0UmVwZWF0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGFmdGVyOiB0cnVlIH0sIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnTycsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICduZXdMaW5lQW5kRW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBpbnRlcmxhY2VJbnNlcnRSZXBlYXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgYWZ0ZXI6IGZhbHNlIH0sIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAndicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICd0b2dnbGVWaXN1YWxNb2RlJyB9LFxuICAgIHsga2V5czogJ1YnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAndG9nZ2xlVmlzdWFsTW9kZScsIGFjdGlvbkFyZ3M6IHsgbGluZXdpc2U6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnPEMtdj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAndG9nZ2xlVmlzdWFsTW9kZScsIGFjdGlvbkFyZ3M6IHsgYmxvY2t3aXNlOiB0cnVlIH19LFxuICAgIHsga2V5czogJzxDLXE+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3RvZ2dsZVZpc3VhbE1vZGUnLCBhY3Rpb25BcmdzOiB7IGJsb2Nrd2lzZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdndicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdyZXNlbGVjdExhc3RTZWxlY3Rpb24nIH0sXG4gICAgeyBrZXlzOiAnSicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdqb2luTGluZXMnLCBpc0VkaXQ6IHRydWUgfSxcbiAgICB7IGtleXM6ICdnSicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdqb2luTGluZXMnLCBhY3Rpb25BcmdzOiB7IGtlZXBTcGFjZXM6IHRydWUgfSwgaXNFZGl0OiB0cnVlIH0sXG4gICAgeyBrZXlzOiAncCcsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdwYXN0ZScsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBhZnRlcjogdHJ1ZSwgaXNFZGl0OiB0cnVlIH19LFxuICAgIHsga2V5czogJ1AnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncGFzdGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgYWZ0ZXI6IGZhbHNlLCBpc0VkaXQ6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAncjxjaGFyYWN0ZXI+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3JlcGxhY2UnLCBpc0VkaXQ6IHRydWUgfSxcbiAgICB7IGtleXM6ICdAPHJlZ2lzdGVyPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdyZXBsYXlNYWNybycgfSxcbiAgICB7IGtleXM6ICdxPHJlZ2lzdGVyPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdlbnRlck1hY3JvUmVjb3JkTW9kZScgfSxcbiAgICAvLyBIYW5kbGUgUmVwbGFjZS1tb2RlIGFzIGEgc3BlY2lhbCBjYXNlIG9mIGluc2VydCBtb2RlLlxuICAgIHsga2V5czogJ1InLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IHJlcGxhY2U6IHRydWUgfSwgY29udGV4dDogJ25vcm1hbCd9LFxuICAgIHsga2V5czogJ1InLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2NoYW5nZScsIG9wZXJhdG9yQXJnczogeyBsaW5ld2lzZTogdHJ1ZSwgZnVsbExpbmU6IHRydWUgfSwgY29udGV4dDogJ3Zpc3VhbCcsIGV4aXRWaXN1YWxCbG9jazogdHJ1ZX0sXG4gICAgeyBrZXlzOiAndScsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICd1bmRvJywgY29udGV4dDogJ25vcm1hbCcgfSxcbiAgICB7IGtleXM6ICd1JywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdjaGFuZ2VDYXNlJywgb3BlcmF0b3JBcmdzOiB7dG9Mb3dlcjogdHJ1ZX0sIGNvbnRleHQ6ICd2aXN1YWwnLCBpc0VkaXQ6IHRydWUgfSxcbiAgICB7IGtleXM6ICdVJywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdjaGFuZ2VDYXNlJywgb3BlcmF0b3JBcmdzOiB7dG9Mb3dlcjogZmFsc2V9LCBjb250ZXh0OiAndmlzdWFsJywgaXNFZGl0OiB0cnVlIH0sXG4gICAgeyBrZXlzOiAnPEMtcj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncmVkbycgfSxcbiAgICB7IGtleXM6ICdtPHJlZ2lzdGVyPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdzZXRNYXJrJyB9LFxuICAgIHsga2V5czogJ1wiPHJlZ2lzdGVyPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdzZXRSZWdpc3RlcicgfSxcbiAgICB7IGtleXM6ICc8Qy1yPjxyZWdpc3Rlcj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnaW5zZXJ0UmVnaXN0ZXInLCBjb250ZXh0OiAnaW5zZXJ0JywgaXNFZGl0OiB0cnVlIH0sXG4gICAgeyBrZXlzOiAnPEMtbz4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnb25lTm9ybWFsQ29tbWFuZCcsIGNvbnRleHQ6ICdpbnNlcnQnIH0sXG4gICAgeyBrZXlzOiAnenonLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnc2Nyb2xsVG9DdXJzb3InLCBhY3Rpb25BcmdzOiB7IHBvc2l0aW9uOiAnY2VudGVyJyB9fSxcbiAgICB7IGtleXM6ICd6LicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdzY3JvbGxUb0N1cnNvcicsIGFjdGlvbkFyZ3M6IHsgcG9zaXRpb246ICdjZW50ZXInIH0sIG1vdGlvbjogJ21vdmVUb0ZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcicgfSxcbiAgICB7IGtleXM6ICd6dCcsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdzY3JvbGxUb0N1cnNvcicsIGFjdGlvbkFyZ3M6IHsgcG9zaXRpb246ICd0b3AnIH19LFxuICAgIHsga2V5czogJ3o8Q1I+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbFRvQ3Vyc29yJywgYWN0aW9uQXJnczogeyBwb3NpdGlvbjogJ3RvcCcgfSwgbW90aW9uOiAnbW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyJyB9LFxuICAgIHsga2V5czogJ3piJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbFRvQ3Vyc29yJywgYWN0aW9uQXJnczogeyBwb3NpdGlvbjogJ2JvdHRvbScgfX0sXG4gICAgeyBrZXlzOiAnei0nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnc2Nyb2xsVG9DdXJzb3InLCBhY3Rpb25BcmdzOiB7IHBvc2l0aW9uOiAnYm90dG9tJyB9LCBtb3Rpb246ICdtb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXInIH0sXG4gICAgeyBrZXlzOiAnLicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdyZXBlYXRMYXN0RWRpdCcgfSxcbiAgICB7IGtleXM6ICc8Qy1hPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdpbmNyZW1lbnROdW1iZXJUb2tlbicsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczoge2luY3JlYXNlOiB0cnVlLCBiYWNrdHJhY2s6IGZhbHNlfX0sXG4gICAgeyBrZXlzOiAnPEMteD4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnaW5jcmVtZW50TnVtYmVyVG9rZW4nLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHtpbmNyZWFzZTogZmFsc2UsIGJhY2t0cmFjazogZmFsc2V9fSxcbiAgICB7IGtleXM6ICc8Qy10PicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdpbmRlbnQnLCBhY3Rpb25BcmdzOiB7IGluZGVudFJpZ2h0OiB0cnVlIH0sIGNvbnRleHQ6ICdpbnNlcnQnIH0sXG4gICAgeyBrZXlzOiAnPEMtZD4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnaW5kZW50JywgYWN0aW9uQXJnczogeyBpbmRlbnRSaWdodDogZmFsc2UgfSwgY29udGV4dDogJ2luc2VydCcgfSxcbiAgICAvLyBUZXh0IG9iamVjdCBtb3Rpb25zXG4gICAgeyBrZXlzOiAnYTxyZWdpc3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAndGV4dE9iamVjdE1hbmlwdWxhdGlvbicgfSxcbiAgICB7IGtleXM6ICdpPHJlZ2lzdGVyPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICd0ZXh0T2JqZWN0TWFuaXB1bGF0aW9uJywgbW90aW9uQXJnczogeyB0ZXh0T2JqZWN0SW5uZXI6IHRydWUgfX0sXG4gICAgLy8gU2VhcmNoXG4gICAgeyBrZXlzOiAnLycsIHR5cGU6ICdzZWFyY2gnLCBzZWFyY2hBcmdzOiB7IGZvcndhcmQ6IHRydWUsIHF1ZXJ5U3JjOiAncHJvbXB0JywgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICc/JywgdHlwZTogJ3NlYXJjaCcsIHNlYXJjaEFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHF1ZXJ5U3JjOiAncHJvbXB0JywgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICcqJywgdHlwZTogJ3NlYXJjaCcsIHNlYXJjaEFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgcXVlcnlTcmM6ICd3b3JkVW5kZXJDdXJzb3InLCB3aG9sZVdvcmRPbmx5OiB0cnVlLCB0b0p1bXBsaXN0OiB0cnVlIH19LFxuICAgIHsga2V5czogJyMnLCB0eXBlOiAnc2VhcmNoJywgc2VhcmNoQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgcXVlcnlTcmM6ICd3b3JkVW5kZXJDdXJzb3InLCB3aG9sZVdvcmRPbmx5OiB0cnVlLCB0b0p1bXBsaXN0OiB0cnVlIH19LFxuICAgIHsga2V5czogJ2cqJywgdHlwZTogJ3NlYXJjaCcsIHNlYXJjaEFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgcXVlcnlTcmM6ICd3b3JkVW5kZXJDdXJzb3InLCB0b0p1bXBsaXN0OiB0cnVlIH19LFxuICAgIHsga2V5czogJ2cjJywgdHlwZTogJ3NlYXJjaCcsIHNlYXJjaEFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHF1ZXJ5U3JjOiAnd29yZFVuZGVyQ3Vyc29yJywgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICAvLyBFeCBjb21tYW5kXG4gICAgeyBrZXlzOiAnOicsIHR5cGU6ICdleCcgfVxuICBdO1xuICB2YXIgZGVmYXVsdEtleW1hcExlbmd0aCA9IGRlZmF1bHRLZXltYXAubGVuZ3RoO1xuXG4gIC8qKlxuICAgKiBFeCBjb21tYW5kc1xuICAgKiBDYXJlIG11c3QgYmUgdGFrZW4gd2hlbiBhZGRpbmcgdG8gdGhlIGRlZmF1bHQgRXggY29tbWFuZCBtYXAuIEZvciBhbnlcbiAgICogcGFpciBvZiBjb21tYW5kcyB0aGF0IGhhdmUgYSBzaGFyZWQgcHJlZml4LCBhdCBsZWFzdCBvbmUgb2YgdGhlaXJcbiAgICogc2hvcnROYW1lcyBtdXN0IG5vdCBtYXRjaCB0aGUgcHJlZml4IG9mIHRoZSBvdGhlciBjb21tYW5kLlxuICAgKi9cbiAgdmFyIGRlZmF1bHRFeENvbW1hbmRNYXAgPSBbXG4gICAgeyBuYW1lOiAnY29sb3JzY2hlbWUnLCBzaG9ydE5hbWU6ICdjb2xvJyB9LFxuICAgIHsgbmFtZTogJ21hcCcgfSxcbiAgICB7IG5hbWU6ICdpbWFwJywgc2hvcnROYW1lOiAnaW0nIH0sXG4gICAgeyBuYW1lOiAnbm1hcCcsIHNob3J0TmFtZTogJ25tJyB9LFxuICAgIHsgbmFtZTogJ3ZtYXAnLCBzaG9ydE5hbWU6ICd2bScgfSxcbiAgICB7IG5hbWU6ICdvbWFwJywgc2hvcnROYW1lOiAnb20nIH0sXG4gICAgeyBuYW1lOiAnbm9yZW1hcCcsIHNob3J0TmFtZTogJ25vJyB9LFxuICAgIHsgbmFtZTogJ25ub3JlbWFwJywgc2hvcnROYW1lOiAnbm4nIH0sXG4gICAgeyBuYW1lOiAndm5vcmVtYXAnLCBzaG9ydE5hbWU6ICd2bicgfSxcbiAgICB7IG5hbWU6ICdpbm9yZW1hcCcsIHNob3J0TmFtZTogJ2lubycgfSxcbiAgICB7IG5hbWU6ICdvbm9yZW1hcCcsIHNob3J0TmFtZTogJ29ubycgfSxcbiAgICB7IG5hbWU6ICd1bm1hcCcgfSxcbiAgICB7IG5hbWU6ICdtYXBjbGVhcicsIHNob3J0TmFtZTogJ21hcGMnIH0sXG4gICAgeyBuYW1lOiAnbm1hcGNsZWFyJywgc2hvcnROYW1lOiAnbm1hcGMnIH0sXG4gICAgeyBuYW1lOiAndm1hcGNsZWFyJywgc2hvcnROYW1lOiAndm1hcGMnIH0sXG4gICAgeyBuYW1lOiAnaW1hcGNsZWFyJywgc2hvcnROYW1lOiAnaW1hcGMnIH0sXG4gICAgeyBuYW1lOiAnb21hcGNsZWFyJywgc2hvcnROYW1lOiAnb21hcGMnIH0sXG4gICAgeyBuYW1lOiAnd3JpdGUnLCBzaG9ydE5hbWU6ICd3JyB9LFxuICAgIHsgbmFtZTogJ3VuZG8nLCBzaG9ydE5hbWU6ICd1JyB9LFxuICAgIHsgbmFtZTogJ3JlZG8nLCBzaG9ydE5hbWU6ICdyZWQnIH0sXG4gICAgeyBuYW1lOiAnc2V0Jywgc2hvcnROYW1lOiAnc2UnIH0sXG4gICAgeyBuYW1lOiAnc2V0bG9jYWwnLCBzaG9ydE5hbWU6ICdzZXRsJyB9LFxuICAgIHsgbmFtZTogJ3NldGdsb2JhbCcsIHNob3J0TmFtZTogJ3NldGcnIH0sXG4gICAgeyBuYW1lOiAnc29ydCcsIHNob3J0TmFtZTogJ3NvcicgfSxcbiAgICB7IG5hbWU6ICdzdWJzdGl0dXRlJywgc2hvcnROYW1lOiAncycsIHBvc3NpYmx5QXN5bmM6IHRydWUgfSxcbiAgICB7IG5hbWU6ICdzdGFydGluc2VydCcsIHNob3J0TmFtZTogJ3N0YXJ0JyB9LFxuICAgIHsgbmFtZTogJ25vaGxzZWFyY2gnLCBzaG9ydE5hbWU6ICdub2gnIH0sXG4gICAgeyBuYW1lOiAneWFuaycsIHNob3J0TmFtZTogJ3knIH0sXG4gICAgeyBuYW1lOiAnZGVsbWFya3MnLCBzaG9ydE5hbWU6ICdkZWxtJyB9LFxuICAgIHsgbmFtZTogJ3JlZ2lzdGVycycsIHNob3J0TmFtZTogJ3JlZycsIGV4Y2x1ZGVGcm9tQ29tbWFuZEhpc3Rvcnk6IHRydWUgfSxcbiAgICB7IG5hbWU6ICd2Z2xvYmFsJywgc2hvcnROYW1lOiAndicgfSxcbiAgICB7IG5hbWU6ICdkZWxldGUnLCBzaG9ydE5hbWU6ICdkJyB9LFxuICAgIHsgbmFtZTogJ2pvaW4nLCBzaG9ydE5hbWU6ICdqJyB9LFxuICAgIHsgbmFtZTogJ25vcm1hbCcsIHNob3J0TmFtZTogJ25vcm0nIH0sXG4gICAgeyBuYW1lOiAnZ2xvYmFsJywgc2hvcnROYW1lOiAnZycgfVxuICBdO1xuXG4gIC8qKlxuICAgKiBMYW5nbWFwXG4gICAqIERldGVybWluZXMgaG93IHRvIGludGVycHJldCBrZXlzdHJva2VzIGluIE5vcm1hbCBhbmQgVmlzdWFsIG1vZGUuXG4gICAqIFVzZWZ1bCBmb3IgcGVvcGxlIHdobyB1c2UgYSBkaWZmZXJlbnQga2V5Ym9hcmQgbGF5b3V0IHRoYW4gUVdFUlRZXG4gICAqL1xuICB2YXIgbGFuZ21hcCA9IHBhcnNlTGFuZ21hcCgnJyk7XG5cbiAgICBmdW5jdGlvbiBlbnRlclZpbU1vZGUoY20pIHtcbiAgICAgIGNtLnNldE9wdGlvbignZGlzYWJsZUlucHV0JywgdHJ1ZSk7XG4gICAgICBjbS5zZXRPcHRpb24oJ3Nob3dDdXJzb3JXaGVuU2VsZWN0aW5nJywgZmFsc2UpO1xuICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sIFwidmltLW1vZGUtY2hhbmdlXCIsIHttb2RlOiBcIm5vcm1hbFwifSk7XG4gICAgICBjbS5vbignY3Vyc29yQWN0aXZpdHknLCBvbkN1cnNvckFjdGl2aXR5KTtcbiAgICAgIG1heWJlSW5pdFZpbVN0YXRlKGNtKTtcbiAgICAgIENvZGVNaXJyb3Iub24oY20uZ2V0SW5wdXRGaWVsZCgpLCAncGFzdGUnLCBnZXRPblBhc3RlRm4oY20pKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsZWF2ZVZpbU1vZGUoY20pIHtcbiAgICAgIGNtLnNldE9wdGlvbignZGlzYWJsZUlucHV0JywgZmFsc2UpO1xuICAgICAgY20ub2ZmKCdjdXJzb3JBY3Rpdml0eScsIG9uQ3Vyc29yQWN0aXZpdHkpO1xuICAgICAgQ29kZU1pcnJvci5vZmYoY20uZ2V0SW5wdXRGaWVsZCgpLCAncGFzdGUnLCBnZXRPblBhc3RlRm4oY20pKTtcbiAgICAgIGNtLnN0YXRlLnZpbSA9IG51bGw7XG4gICAgICBpZiAoaGlnaGxpZ2h0VGltZW91dCkgY2xlYXJUaW1lb3V0KGhpZ2hsaWdodFRpbWVvdXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE9uUGFzdGVGbihjbSkge1xuICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgIGlmICghdmltLm9uUGFzdGVGbikge1xuICAgICAgICB2aW0ub25QYXN0ZUZuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCF2aW0uaW5zZXJ0TW9kZSkge1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKG9mZnNldEN1cnNvcihjbS5nZXRDdXJzb3IoKSwgMCwgMSkpO1xuICAgICAgICAgICAgYWN0aW9ucy5lbnRlckluc2VydE1vZGUoY20sIHt9LCB2aW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2aW0ub25QYXN0ZUZuO1xuICAgIH1cblxuICAgIHZhciBudW1iZXJSZWdleCA9IC9bXFxkXS87XG4gICAgdmFyIHdvcmRDaGFyVGVzdCA9IFtDb2RlTWlycm9yLmlzV29yZENoYXIsIGZ1bmN0aW9uKGNoKSB7XG4gICAgICByZXR1cm4gY2ggJiYgIUNvZGVNaXJyb3IuaXNXb3JkQ2hhcihjaCkgJiYgIS9cXHMvLnRlc3QoY2gpO1xuICAgIH1dLCBiaWdXb3JkQ2hhclRlc3QgPSBbZnVuY3Rpb24oY2gpIHtcbiAgICAgIHJldHVybiAvXFxTLy50ZXN0KGNoKTtcbiAgICB9XTtcbiAgICB2YXIgdmFsaWRNYXJrcyA9IFsnPCcsICc+J107XG4gICAgdmFyIHZhbGlkUmVnaXN0ZXJzID0gWyctJywgJ1wiJywgJy4nLCAnOicsICdfJywgJy8nLCAnKyddO1xuICAgIHZhciBsYXRpbkNoYXJSZWdleCA9IC9eXFx3JC9cbiAgICB2YXIgdXBwZXJDYXNlQ2hhcnM7XG4gICAgdHJ5IHsgdXBwZXJDYXNlQ2hhcnMgPSBuZXcgUmVnRXhwKFwiXltcXFxccHtMdX1dJFwiLCBcInVcIik7IH1cbiAgICBjYXRjaCAoXykgeyB1cHBlckNhc2VDaGFycyA9IC9eW0EtWl0kLzsgfVxuXG4gICAgZnVuY3Rpb24gaXNMaW5lKGNtLCBsaW5lKSB7XG4gICAgICByZXR1cm4gbGluZSA+PSBjbS5maXJzdExpbmUoKSAmJiBsaW5lIDw9IGNtLmxhc3RMaW5lKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTG93ZXJDYXNlKGspIHtcbiAgICAgIHJldHVybiAoL15bYS16XSQvKS50ZXN0KGspO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc01hdGNoYWJsZVN5bWJvbChrKSB7XG4gICAgICByZXR1cm4gJygpW117fScuaW5kZXhPZihrKSAhPSAtMTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNOdW1iZXIoaykge1xuICAgICAgcmV0dXJuIG51bWJlclJlZ2V4LnRlc3Qoayk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzVXBwZXJDYXNlKGspIHtcbiAgICAgIHJldHVybiB1cHBlckNhc2VDaGFycy50ZXN0KGspO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc1doaXRlU3BhY2VTdHJpbmcoaykge1xuICAgICAgcmV0dXJuICgvXlxccyokLykudGVzdChrKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNFbmRPZlNlbnRlbmNlU3ltYm9sKGspIHtcbiAgICAgIHJldHVybiAnLj8hJy5pbmRleE9mKGspICE9IC0xO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpbkFycmF5KHZhbCwgYXJyKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoYXJyW2ldID09IHZhbCkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIG9wdGlvbnMgPSB7fTtcbiAgICBmdW5jdGlvbiBkZWZpbmVPcHRpb24obmFtZSwgZGVmYXVsdFZhbHVlLCB0eXBlLCBhbGlhc2VzLCBjYWxsYmFjaykge1xuICAgICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gdW5kZWZpbmVkICYmICFjYWxsYmFjaykge1xuICAgICAgICB0aHJvdyBFcnJvcignZGVmYXVsdFZhbHVlIGlzIHJlcXVpcmVkIHVubGVzcyBjYWxsYmFjayBpcyBwcm92aWRlZCcpO1xuICAgICAgfVxuICAgICAgaWYgKCF0eXBlKSB7IHR5cGUgPSAnc3RyaW5nJzsgfVxuICAgICAgb3B0aW9uc1tuYW1lXSA9IHtcbiAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBkZWZhdWx0VmFsdWUsXG4gICAgICAgIGNhbGxiYWNrOiBjYWxsYmFja1xuICAgICAgfTtcbiAgICAgIGlmIChhbGlhc2VzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWxpYXNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIG9wdGlvbnNbYWxpYXNlc1tpXV0gPSBvcHRpb25zW25hbWVdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIHNldE9wdGlvbihuYW1lLCBkZWZhdWx0VmFsdWUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldE9wdGlvbihuYW1lLCB2YWx1ZSwgY20sIGNmZykge1xuICAgICAgdmFyIG9wdGlvbiA9IG9wdGlvbnNbbmFtZV07XG4gICAgICBjZmcgPSBjZmcgfHwge307XG4gICAgICB2YXIgc2NvcGUgPSBjZmcuc2NvcGU7XG4gICAgICBpZiAoIW9wdGlvbikge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdVbmtub3duIG9wdGlvbjogJyArIG5hbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbi50eXBlID09ICdib29sZWFuJykge1xuICAgICAgICBpZiAodmFsdWUgJiYgdmFsdWUgIT09IHRydWUpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdJbnZhbGlkIGFyZ3VtZW50OiAnICsgbmFtZSArICc9JyArIHZhbHVlKTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAvLyBCb29sZWFuIG9wdGlvbnMgYXJlIHNldCB0byB0cnVlIGlmIHZhbHVlIGlzIG5vdCBkZWZpbmVkLlxuICAgICAgICAgIHZhbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbi5jYWxsYmFjaykge1xuICAgICAgICBpZiAoc2NvcGUgIT09ICdsb2NhbCcpIHtcbiAgICAgICAgICBvcHRpb24uY2FsbGJhY2sodmFsdWUsIHVuZGVmaW5lZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlICE9PSAnZ2xvYmFsJyAmJiBjbSkge1xuICAgICAgICAgIG9wdGlvbi5jYWxsYmFjayh2YWx1ZSwgY20pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2NvcGUgIT09ICdsb2NhbCcpIHtcbiAgICAgICAgICBvcHRpb24udmFsdWUgPSBvcHRpb24udHlwZSA9PSAnYm9vbGVhbicgPyAhIXZhbHVlIDogdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlICE9PSAnZ2xvYmFsJyAmJiBjbSkge1xuICAgICAgICAgIGNtLnN0YXRlLnZpbS5vcHRpb25zW25hbWVdID0ge3ZhbHVlOiB2YWx1ZX07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRPcHRpb24obmFtZSwgY20sIGNmZykge1xuICAgICAgdmFyIG9wdGlvbiA9IG9wdGlvbnNbbmFtZV07XG4gICAgICBjZmcgPSBjZmcgfHwge307XG4gICAgICB2YXIgc2NvcGUgPSBjZmcuc2NvcGU7XG4gICAgICBpZiAoIW9wdGlvbikge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKCdVbmtub3duIG9wdGlvbjogJyArIG5hbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG9wdGlvbi5jYWxsYmFjaykge1xuICAgICAgICB2YXIgbG9jYWwgPSBjbSAmJiBvcHRpb24uY2FsbGJhY2sodW5kZWZpbmVkLCBjbSk7XG4gICAgICAgIGlmIChzY29wZSAhPT0gJ2dsb2JhbCcgJiYgbG9jYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBsb2NhbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUgIT09ICdsb2NhbCcpIHtcbiAgICAgICAgICByZXR1cm4gb3B0aW9uLmNhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGxvY2FsID0gKHNjb3BlICE9PSAnZ2xvYmFsJykgJiYgKGNtICYmIGNtLnN0YXRlLnZpbS5vcHRpb25zW25hbWVdKTtcbiAgICAgICAgcmV0dXJuIChsb2NhbCB8fCAoc2NvcGUgIT09ICdsb2NhbCcpICYmIG9wdGlvbiB8fCB7fSkudmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZGVmaW5lT3B0aW9uKCdmaWxldHlwZScsIHVuZGVmaW5lZCwgJ3N0cmluZycsIFsnZnQnXSwgZnVuY3Rpb24obmFtZSwgY20pIHtcbiAgICAgIC8vIE9wdGlvbiBpcyBsb2NhbC4gRG8gbm90aGluZyBmb3IgZ2xvYmFsLlxuICAgICAgaWYgKGNtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgLy8gVGhlICdmaWxldHlwZScgb3B0aW9uIHByb3hpZXMgdG8gdGhlIENvZGVNaXJyb3IgJ21vZGUnIG9wdGlvbi5cbiAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFyIG1vZGUgPSBjbS5nZXRPcHRpb24oJ21vZGUnKTtcbiAgICAgICAgcmV0dXJuIG1vZGUgPT0gJ251bGwnID8gJycgOiBtb2RlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG1vZGUgPSBuYW1lID09ICcnID8gJ251bGwnIDogbmFtZTtcbiAgICAgICAgY20uc2V0T3B0aW9uKCdtb2RlJywgbW9kZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgZGVmaW5lT3B0aW9uKCd0ZXh0d2lkdGgnLCA4MCwgJ251bWJlcicsIFsndHcnXSwgZnVuY3Rpb24od2lkdGgsIGNtKSB7XG4gICAgICAvLyBPcHRpb24gaXMgbG9jYWwuIERvIG5vdGhpbmcgZm9yIGdsb2JhbC5cbiAgICAgIGlmIChjbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIFRoZSAnZmlsZXR5cGUnIG9wdGlvbiBwcm94aWVzIHRvIHRoZSBDb2RlTWlycm9yICdtb2RlJyBvcHRpb24uXG4gICAgICBpZiAod2lkdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBjbS5nZXRPcHRpb24oJ3RleHR3aWR0aCcpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgY29sdW1uID0gTWF0aC5yb3VuZCh3aWR0aCk7XG4gICAgICAgIGlmIChjb2x1bW4gPiAxKSB7XG4gICAgICAgICAgY20uc2V0T3B0aW9uKCd0ZXh0d2lkdGgnLCBjb2x1bW4pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgY3JlYXRlQ2lyY3VsYXJKdW1wTGlzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNpemUgPSAxMDA7XG4gICAgICB2YXIgcG9pbnRlciA9IC0xO1xuICAgICAgdmFyIGhlYWQgPSAwO1xuICAgICAgdmFyIHRhaWwgPSAwO1xuICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBBcnJheShzaXplKTtcbiAgICAgIGZ1bmN0aW9uIGFkZChjbSwgb2xkQ3VyLCBuZXdDdXIpIHtcbiAgICAgICAgdmFyIGN1cnJlbnQgPSBwb2ludGVyICUgc2l6ZTtcbiAgICAgICAgdmFyIGN1ck1hcmsgPSBidWZmZXJbY3VycmVudF07XG4gICAgICAgIGZ1bmN0aW9uIHVzZU5leHRTbG90KGN1cnNvcikge1xuICAgICAgICAgIHZhciBuZXh0ID0gKytwb2ludGVyICUgc2l6ZTtcbiAgICAgICAgICB2YXIgdHJhc2hNYXJrID0gYnVmZmVyW25leHRdO1xuICAgICAgICAgIGlmICh0cmFzaE1hcmspIHtcbiAgICAgICAgICAgIHRyYXNoTWFyay5jbGVhcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBidWZmZXJbbmV4dF0gPSBjbS5zZXRCb29rbWFyayhjdXJzb3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdXJNYXJrKSB7XG4gICAgICAgICAgdmFyIG1hcmtQb3MgPSBjdXJNYXJrLmZpbmQoKTtcbiAgICAgICAgICAvLyBhdm9pZCByZWNvcmRpbmcgcmVkdW5kYW50IGN1cnNvciBwb3NpdGlvblxuICAgICAgICAgIGlmIChtYXJrUG9zICYmICFjdXJzb3JFcXVhbChtYXJrUG9zLCBvbGRDdXIpKSB7XG4gICAgICAgICAgICB1c2VOZXh0U2xvdChvbGRDdXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1c2VOZXh0U2xvdChvbGRDdXIpO1xuICAgICAgICB9XG4gICAgICAgIHVzZU5leHRTbG90KG5ld0N1cik7XG4gICAgICAgIGhlYWQgPSBwb2ludGVyO1xuICAgICAgICB0YWlsID0gcG9pbnRlciAtIHNpemUgKyAxO1xuICAgICAgICBpZiAodGFpbCA8IDApIHtcbiAgICAgICAgICB0YWlsID0gMDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZnVuY3Rpb24gbW92ZShjbSwgb2Zmc2V0KSB7XG4gICAgICAgIHBvaW50ZXIgKz0gb2Zmc2V0O1xuICAgICAgICBpZiAocG9pbnRlciA+IGhlYWQpIHtcbiAgICAgICAgICBwb2ludGVyID0gaGVhZDtcbiAgICAgICAgfSBlbHNlIGlmIChwb2ludGVyIDwgdGFpbCkge1xuICAgICAgICAgIHBvaW50ZXIgPSB0YWlsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtYXJrID0gYnVmZmVyWyhzaXplICsgcG9pbnRlcikgJSBzaXplXTtcbiAgICAgICAgLy8gc2tpcCBtYXJrcyB0aGF0IGFyZSB0ZW1wb3JhcmlseSByZW1vdmVkIGZyb20gdGV4dCBidWZmZXJcbiAgICAgICAgaWYgKG1hcmsgJiYgIW1hcmsuZmluZCgpKSB7XG4gICAgICAgICAgdmFyIGluYyA9IG9mZnNldCA+IDAgPyAxIDogLTE7XG4gICAgICAgICAgdmFyIG5ld0N1cjtcbiAgICAgICAgICB2YXIgb2xkQ3VyID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgZG8ge1xuICAgICAgICAgICAgcG9pbnRlciArPSBpbmM7XG4gICAgICAgICAgICBtYXJrID0gYnVmZmVyWyhzaXplICsgcG9pbnRlcikgJSBzaXplXTtcbiAgICAgICAgICAgIC8vIHNraXAgbWFya3MgdGhhdCBhcmUgdGhlIHNhbWUgYXMgY3VycmVudCBwb3NpdGlvblxuICAgICAgICAgICAgaWYgKG1hcmsgJiZcbiAgICAgICAgICAgICAgICAobmV3Q3VyID0gbWFyay5maW5kKCkpICYmXG4gICAgICAgICAgICAgICAgIWN1cnNvckVxdWFsKG9sZEN1ciwgbmV3Q3VyKSkge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IHdoaWxlIChwb2ludGVyIDwgaGVhZCAmJiBwb2ludGVyID4gdGFpbCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hcms7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBmaW5kKGNtLCBvZmZzZXQpIHtcbiAgICAgICAgdmFyIG9sZFBvaW50ZXIgPSBwb2ludGVyO1xuICAgICAgICB2YXIgbWFyayA9IG1vdmUoY20sIG9mZnNldCk7XG4gICAgICAgIHBvaW50ZXIgPSBvbGRQb2ludGVyO1xuICAgICAgICByZXR1cm4gbWFyayAmJiBtYXJrLmZpbmQoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNhY2hlZEN1cnNvcjogdW5kZWZpbmVkLCAvL3VzZWQgZm9yICMgYW5kICoganVtcHNcbiAgICAgICAgYWRkOiBhZGQsXG4gICAgICAgIGZpbmQ6IGZpbmQsXG4gICAgICAgIG1vdmU6IG1vdmVcbiAgICAgIH07XG4gICAgfTtcblxuICAgIC8vIFJldHVybnMgYW4gb2JqZWN0IHRvIHRyYWNrIHRoZSBjaGFuZ2VzIGFzc29jaWF0ZWQgaW5zZXJ0IG1vZGUuICBJdFxuICAgIC8vIGNsb25lcyB0aGUgb2JqZWN0IHRoYXQgaXMgcGFzc2VkIGluLCBvciBjcmVhdGVzIGFuIGVtcHR5IG9iamVjdCBvbmUgaWZcbiAgICAvLyBub25lIGlzIHByb3ZpZGVkLlxuICAgIHZhciBjcmVhdGVJbnNlcnRNb2RlQ2hhbmdlcyA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgIGlmIChjKSB7XG4gICAgICAgIC8vIENvcHkgY29uc3RydWN0aW9uXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgY2hhbmdlczogYy5jaGFuZ2VzLFxuICAgICAgICAgIGV4cGVjdEN1cnNvckFjdGl2aXR5Rm9yQ2hhbmdlOiBjLmV4cGVjdEN1cnNvckFjdGl2aXR5Rm9yQ2hhbmdlXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICAvLyBDaGFuZ2UgbGlzdFxuICAgICAgICBjaGFuZ2VzOiBbXSxcbiAgICAgICAgLy8gU2V0IHRvIHRydWUgb24gY2hhbmdlLCBmYWxzZSBvbiBjdXJzb3JBY3Rpdml0eS5cbiAgICAgICAgZXhwZWN0Q3Vyc29yQWN0aXZpdHlGb3JDaGFuZ2U6IGZhbHNlXG4gICAgICB9O1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBNYWNyb01vZGVTdGF0ZSgpIHtcbiAgICAgIHRoaXMubGF0ZXN0UmVnaXN0ZXIgPSB1bmRlZmluZWQ7XG4gICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5pc1JlY29yZGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5yZXBsYXlTZWFyY2hRdWVyaWVzID0gW107XG4gICAgICB0aGlzLm9uUmVjb3JkaW5nRG9uZSA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMubGFzdEluc2VydE1vZGVDaGFuZ2VzID0gY3JlYXRlSW5zZXJ0TW9kZUNoYW5nZXMoKTtcbiAgICB9XG4gICAgTWFjcm9Nb2RlU3RhdGUucHJvdG90eXBlID0ge1xuICAgICAgZXhpdE1hY3JvUmVjb3JkTW9kZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtYWNyb01vZGVTdGF0ZSA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlO1xuICAgICAgICBpZiAobWFjcm9Nb2RlU3RhdGUub25SZWNvcmRpbmdEb25lKSB7XG4gICAgICAgICAgbWFjcm9Nb2RlU3RhdGUub25SZWNvcmRpbmdEb25lKCk7IC8vIGNsb3NlIGRpYWxvZ1xuICAgICAgICB9XG4gICAgICAgIG1hY3JvTW9kZVN0YXRlLm9uUmVjb3JkaW5nRG9uZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgbWFjcm9Nb2RlU3RhdGUuaXNSZWNvcmRpbmcgPSBmYWxzZTtcbiAgICAgIH0sXG4gICAgICBlbnRlck1hY3JvUmVjb3JkTW9kZTogZnVuY3Rpb24oY20sIHJlZ2lzdGVyTmFtZSkge1xuICAgICAgICB2YXIgcmVnaXN0ZXIgPVxuICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmdldFJlZ2lzdGVyKHJlZ2lzdGVyTmFtZSk7XG4gICAgICAgIGlmIChyZWdpc3Rlcikge1xuICAgICAgICAgIHJlZ2lzdGVyLmNsZWFyKCk7XG4gICAgICAgICAgdGhpcy5sYXRlc3RSZWdpc3RlciA9IHJlZ2lzdGVyTmFtZTtcbiAgICAgICAgICBpZiAoY20ub3BlbkRpYWxvZykge1xuICAgICAgICAgICAgdmFyIHRlbXBsYXRlID0gZG9tKCdzcGFuJywge2NsYXNzOiAnY20tdmltLW1lc3NhZ2UnfSwgJ3JlY29yZGluZyBAJyArIHJlZ2lzdGVyTmFtZSk7XG4gICAgICAgICAgICB0aGlzLm9uUmVjb3JkaW5nRG9uZSA9IGNtLm9wZW5EaWFsb2codGVtcGxhdGUsIG51bGwsIHtib3R0b206dHJ1ZX0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmlzUmVjb3JkaW5nID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtYXliZUluaXRWaW1TdGF0ZShjbSkge1xuICAgICAgaWYgKCFjbS5zdGF0ZS52aW0pIHtcbiAgICAgICAgLy8gU3RvcmUgaW5zdGFuY2Ugc3RhdGUgaW4gdGhlIENvZGVNaXJyb3Igb2JqZWN0LlxuICAgICAgICBjbS5zdGF0ZS52aW0gPSB7XG4gICAgICAgICAgaW5wdXRTdGF0ZTogbmV3IElucHV0U3RhdGUoKSxcbiAgICAgICAgICAvLyBWaW0ncyBpbnB1dCBzdGF0ZSB0aGF0IHRyaWdnZXJlZCB0aGUgbGFzdCBlZGl0LCB1c2VkIHRvIHJlcGVhdFxuICAgICAgICAgIC8vIG1vdGlvbnMgYW5kIG9wZXJhdG9ycyB3aXRoICcuJy5cbiAgICAgICAgICBsYXN0RWRpdElucHV0U3RhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICAvLyBWaW0ncyBhY3Rpb24gY29tbWFuZCBiZWZvcmUgdGhlIGxhc3QgZWRpdCwgdXNlZCB0byByZXBlYXQgYWN0aW9uc1xuICAgICAgICAgIC8vIHdpdGggJy4nIGFuZCBpbnNlcnQgbW9kZSByZXBlYXQuXG4gICAgICAgICAgbGFzdEVkaXRBY3Rpb25Db21tYW5kOiB1bmRlZmluZWQsXG4gICAgICAgICAgLy8gV2hlbiB1c2luZyBqayBmb3IgbmF2aWdhdGlvbiwgaWYgeW91IG1vdmUgZnJvbSBhIGxvbmdlciBsaW5lIHRvIGFcbiAgICAgICAgICAvLyBzaG9ydGVyIGxpbmUsIHRoZSBjdXJzb3IgbWF5IGNsaXAgdG8gdGhlIGVuZCBvZiB0aGUgc2hvcnRlciBsaW5lLlxuICAgICAgICAgIC8vIElmIGogaXMgcHJlc3NlZCBhZ2FpbiBhbmQgY3Vyc29yIGdvZXMgdG8gdGhlIG5leHQgbGluZSwgdGhlXG4gICAgICAgICAgLy8gY3Vyc29yIHNob3VsZCBnbyBiYWNrIHRvIGl0cyBob3Jpem9udGFsIHBvc2l0aW9uIG9uIHRoZSBsb25nZXJcbiAgICAgICAgICAvLyBsaW5lIGlmIGl0IGNhbi4gVGhpcyBpcyB0byBrZWVwIHRyYWNrIG9mIHRoZSBob3Jpem9udGFsIHBvc2l0aW9uLlxuICAgICAgICAgIGxhc3RIUG9zOiAtMSxcbiAgICAgICAgICAvLyBEb2luZyB0aGUgc2FtZSB3aXRoIHNjcmVlbi1wb3NpdGlvbiBmb3IgZ2ovZ2tcbiAgICAgICAgICBsYXN0SFNQb3M6IC0xLFxuICAgICAgICAgIC8vIFRoZSBsYXN0IG1vdGlvbiBjb21tYW5kIHJ1bi4gQ2xlYXJlZCBpZiBhIG5vbi1tb3Rpb24gY29tbWFuZCBnZXRzXG4gICAgICAgICAgLy8gZXhlY3V0ZWQgaW4gYmV0d2Vlbi5cbiAgICAgICAgICBsYXN0TW90aW9uOiBudWxsLFxuICAgICAgICAgIG1hcmtzOiB7fSxcbiAgICAgICAgICBpbnNlcnRNb2RlOiBmYWxzZSxcbiAgICAgICAgICBpbnNlcnRNb2RlUmV0dXJuOiBmYWxzZSxcbiAgICAgICAgICAvLyBSZXBlYXQgY291bnQgZm9yIGNoYW5nZXMgbWFkZSBpbiBpbnNlcnQgbW9kZSwgdHJpZ2dlcmVkIGJ5IGtleVxuICAgICAgICAgIC8vIHNlcXVlbmNlcyBsaWtlIDMsaS4gT25seSBleGlzdHMgd2hlbiBpbnNlcnRNb2RlIGlzIHRydWUuXG4gICAgICAgICAgaW5zZXJ0TW9kZVJlcGVhdDogdW5kZWZpbmVkLFxuICAgICAgICAgIHZpc3VhbE1vZGU6IGZhbHNlLFxuICAgICAgICAgIC8vIElmIHdlIGFyZSBpbiB2aXN1YWwgbGluZSBtb2RlLiBObyBlZmZlY3QgaWYgdmlzdWFsTW9kZSBpcyBmYWxzZS5cbiAgICAgICAgICB2aXN1YWxMaW5lOiBmYWxzZSxcbiAgICAgICAgICB2aXN1YWxCbG9jazogZmFsc2UsXG4gICAgICAgICAgbGFzdFNlbGVjdGlvbjogbnVsbCxcbiAgICAgICAgICBsYXN0UGFzdGVkVGV4dDogbnVsbCxcbiAgICAgICAgICBzZWw6IHt9LFxuICAgICAgICAgIC8vIEJ1ZmZlci1sb2NhbC93aW5kb3ctbG9jYWwgdmFsdWVzIG9mIHZpbSBvcHRpb25zLlxuICAgICAgICAgIG9wdGlvbnM6IHt9LFxuICAgICAgICAgIC8vIFdoZXRoZXIgdGhlIG5leHQgY2hhcmFjdGVyIHNob3VsZCBiZSBpbnRlcnByZXRlZCBsaXRlcmFsbHlcbiAgICAgICAgICAvLyBOZWNhc3NhcnkgZm9yIGNvcnJlY3QgaW1wbGVtZW50YXRpb24gb2YgZjxjaGFyYWN0ZXI+LCByPGNoYXJhY3Rlcj4gZXRjLlxuICAgICAgICAgIC8vIGluIHRlcm1zIG9mIGxhbmdtYXBzLlxuICAgICAgICAgIGV4cGVjdExpdGVyYWxOZXh0OiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNtLnN0YXRlLnZpbTtcbiAgICB9XG4gICAgdmFyIHZpbUdsb2JhbFN0YXRlO1xuICAgIGZ1bmN0aW9uIHJlc2V0VmltR2xvYmFsU3RhdGUoKSB7XG4gICAgICB2aW1HbG9iYWxTdGF0ZSA9IHtcbiAgICAgICAgLy8gVGhlIGN1cnJlbnQgc2VhcmNoIHF1ZXJ5LlxuICAgICAgICBzZWFyY2hRdWVyeTogbnVsbCxcbiAgICAgICAgLy8gV2hldGhlciB3ZSBhcmUgc2VhcmNoaW5nIGJhY2t3YXJkcy5cbiAgICAgICAgc2VhcmNoSXNSZXZlcnNlZDogZmFsc2UsXG4gICAgICAgIC8vIFJlcGxhY2UgcGFydCBvZiB0aGUgbGFzdCBzdWJzdGl0dXRlZCBwYXR0ZXJuXG4gICAgICAgIGxhc3RTdWJzdGl0dXRlUmVwbGFjZVBhcnQ6IHVuZGVmaW5lZCxcbiAgICAgICAganVtcExpc3Q6IGNyZWF0ZUNpcmN1bGFySnVtcExpc3QoKSxcbiAgICAgICAgbWFjcm9Nb2RlU3RhdGU6IG5ldyBNYWNyb01vZGVTdGF0ZSxcbiAgICAgICAgLy8gUmVjb3JkaW5nIGxhdGVzdCBmLCB0LCBGIG9yIFQgbW90aW9uIGNvbW1hbmQuXG4gICAgICAgIGxhc3RDaGFyYWN0ZXJTZWFyY2g6IHtpbmNyZW1lbnQ6MCwgZm9yd2FyZDp0cnVlLCBzZWxlY3RlZENoYXJhY3RlcjonJ30sXG4gICAgICAgIHJlZ2lzdGVyQ29udHJvbGxlcjogbmV3IFJlZ2lzdGVyQ29udHJvbGxlcih7fSksXG4gICAgICAgIC8vIHNlYXJjaCBoaXN0b3J5IGJ1ZmZlclxuICAgICAgICBzZWFyY2hIaXN0b3J5Q29udHJvbGxlcjogbmV3IEhpc3RvcnlDb250cm9sbGVyKCksXG4gICAgICAgIC8vIGV4IENvbW1hbmQgaGlzdG9yeSBidWZmZXJcbiAgICAgICAgZXhDb21tYW5kSGlzdG9yeUNvbnRyb2xsZXIgOiBuZXcgSGlzdG9yeUNvbnRyb2xsZXIoKVxuICAgICAgfTtcbiAgICAgIGZvciAodmFyIG9wdGlvbk5hbWUgaW4gb3B0aW9ucykge1xuICAgICAgICB2YXIgb3B0aW9uID0gb3B0aW9uc1tvcHRpb25OYW1lXTtcbiAgICAgICAgb3B0aW9uLnZhbHVlID0gb3B0aW9uLmRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbGFzdEluc2VydE1vZGVLZXlUaW1lcjtcbiAgICB2YXIgdmltQXBpID0ge1xuICAgICAgZW50ZXJWaW1Nb2RlOiBlbnRlclZpbU1vZGUsXG4gICAgICBsZWF2ZVZpbU1vZGU6IGxlYXZlVmltTW9kZSxcbiAgICAgIGJ1aWxkS2V5TWFwOiBmdW5jdGlvbigpIHtcbiAgICAgICAgLy8gVE9ETzogQ29udmVydCBrZXltYXAgaW50byBkaWN0aW9uYXJ5IGZvcm1hdCBmb3IgZmFzdCBsb29rdXAuXG4gICAgICB9LFxuICAgICAgLy8gVGVzdGluZyBob29rLCB0aG91Z2ggaXQgbWlnaHQgYmUgdXNlZnVsIHRvIGV4cG9zZSB0aGUgcmVnaXN0ZXJcbiAgICAgIC8vIGNvbnRyb2xsZXIgYW55d2F5LlxuICAgICAgZ2V0UmVnaXN0ZXJDb250cm9sbGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlcjtcbiAgICAgIH0sXG4gICAgICAvLyBUZXN0aW5nIGhvb2suXG4gICAgICByZXNldFZpbUdsb2JhbFN0YXRlXzogcmVzZXRWaW1HbG9iYWxTdGF0ZSxcblxuICAgICAgLy8gVGVzdGluZyBob29rLlxuICAgICAgZ2V0VmltR2xvYmFsU3RhdGVfOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZpbUdsb2JhbFN0YXRlO1xuICAgICAgfSxcblxuICAgICAgLy8gVGVzdGluZyBob29rLlxuICAgICAgbWF5YmVJbml0VmltU3RhdGVfOiBtYXliZUluaXRWaW1TdGF0ZSxcblxuICAgICAgc3VwcHJlc3NFcnJvckxvZ2dpbmc6IGZhbHNlLFxuXG4gICAgICBJbnNlcnRNb2RlS2V5OiBJbnNlcnRNb2RlS2V5LFxuICAgICAgbWFwOiBmdW5jdGlvbihsaHMsIHJocywgY3R4KSB7XG4gICAgICAgIC8vIEFkZCB1c2VyIGRlZmluZWQga2V5IGJpbmRpbmdzLlxuICAgICAgICBleENvbW1hbmREaXNwYXRjaGVyLm1hcChsaHMsIHJocywgY3R4KTtcbiAgICAgIH0sXG4gICAgICB1bm1hcDogZnVuY3Rpb24obGhzLCBjdHgpIHtcbiAgICAgICAgcmV0dXJuIGV4Q29tbWFuZERpc3BhdGNoZXIudW5tYXAobGhzLCBjdHgpO1xuICAgICAgfSxcbiAgICAgIC8vIE5vbi1yZWN1cnNpdmUgbWFwIGZ1bmN0aW9uLlxuICAgICAgLy8gTk9URTogVGhpcyB3aWxsIG5vdCBjcmVhdGUgbWFwcGluZ3MgdG8ga2V5IG1hcHMgdGhhdCBhcmVuJ3QgcHJlc2VudFxuICAgICAgLy8gaW4gdGhlIGRlZmF1bHQga2V5IG1hcC4gU2VlIFRPRE8gYXQgYm90dG9tIG9mIGZ1bmN0aW9uLlxuICAgICAgbm9yZW1hcDogZnVuY3Rpb24obGhzLCByaHMsIGN0eCkge1xuICAgICAgICBleENvbW1hbmREaXNwYXRjaGVyLm1hcChsaHMsIHJocywgY3R4LCB0cnVlKTtcbiAgICAgIH0sXG4gICAgICAvLyBSZW1vdmUgYWxsIHVzZXItZGVmaW5lZCBtYXBwaW5ncyBmb3IgdGhlIHByb3ZpZGVkIGNvbnRleHQuXG4gICAgICBtYXBjbGVhcjogZnVuY3Rpb24oY3R4KSB7XG4gICAgICAgIC8vIFBhcnRpdGlvbiB0aGUgZXhpc3Rpbmcga2V5bWFwIGludG8gdXNlci1kZWZpbmVkIGFuZCB0cnVlIGRlZmF1bHRzLlxuICAgICAgICB2YXIgYWN0dWFsTGVuZ3RoID0gZGVmYXVsdEtleW1hcC5sZW5ndGgsXG4gICAgICAgICAgICBvcmlnTGVuZ3RoID0gZGVmYXVsdEtleW1hcExlbmd0aDtcbiAgICAgICAgdmFyIHVzZXJLZXltYXAgPSBkZWZhdWx0S2V5bWFwLnNsaWNlKDAsIGFjdHVhbExlbmd0aCAtIG9yaWdMZW5ndGgpO1xuICAgICAgICBkZWZhdWx0S2V5bWFwID0gZGVmYXVsdEtleW1hcC5zbGljZShhY3R1YWxMZW5ndGggLSBvcmlnTGVuZ3RoKTtcbiAgICAgICAgaWYgKGN0eCkge1xuICAgICAgICAgIC8vIElmIGEgc3BlY2lmaWMgY29udGV4dCBpcyBiZWluZyBjbGVhcmVkLCB3ZSBuZWVkIHRvIGtlZXAgbWFwcGluZ3NcbiAgICAgICAgICAvLyBmcm9tIGFsbCBvdGhlciBjb250ZXh0cy5cbiAgICAgICAgICBmb3IgKHZhciBpID0gdXNlcktleW1hcC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgdmFyIG1hcHBpbmcgPSB1c2VyS2V5bWFwW2ldO1xuICAgICAgICAgICAgaWYgKGN0eCAhPT0gbWFwcGluZy5jb250ZXh0KSB7XG4gICAgICAgICAgICAgIGlmIChtYXBwaW5nLmNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXBDb21tYW5kKG1hcHBpbmcpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGBtYXBwaW5nYCBhcHBsaWVzIHRvIGFsbCBjb250ZXh0cyBzbyBjcmVhdGUga2V5bWFwIGNvcGllc1xuICAgICAgICAgICAgICAgIC8vIGZvciBlYWNoIGNvbnRleHQgZXhjZXB0IHRoZSBvbmUgYmVpbmcgY2xlYXJlZC5cbiAgICAgICAgICAgICAgICB2YXIgY29udGV4dHMgPSBbJ25vcm1hbCcsICdpbnNlcnQnLCAndmlzdWFsJ107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiBpbiBjb250ZXh0cykge1xuICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHRzW2pdICE9PSBjdHgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld01hcHBpbmcgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG1hcHBpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICBuZXdNYXBwaW5nW2tleV0gPSBtYXBwaW5nW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbmV3TWFwcGluZy5jb250ZXh0ID0gY29udGV4dHNbal07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcENvbW1hbmQobmV3TWFwcGluZyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbGFuZ21hcDogdXBkYXRlTGFuZ21hcCxcbiAgICAgIHZpbUtleUZyb21FdmVudDogdmltS2V5RnJvbUV2ZW50LFxuICAgICAgLy8gVE9ETzogRXhwb3NlIHNldE9wdGlvbiBhbmQgZ2V0T3B0aW9uIGFzIGluc3RhbmNlIG1ldGhvZHMuIE5lZWQgdG8gZGVjaWRlIGhvdyB0byBuYW1lc3BhY2VcbiAgICAgIC8vIHRoZW0sIG9yIHNvbWVob3cgbWFrZSB0aGVtIHdvcmsgd2l0aCB0aGUgZXhpc3RpbmcgQ29kZU1pcnJvciBzZXRPcHRpb24vZ2V0T3B0aW9uIEFQSS5cbiAgICAgIHNldE9wdGlvbjogc2V0T3B0aW9uLFxuICAgICAgZ2V0T3B0aW9uOiBnZXRPcHRpb24sXG4gICAgICBkZWZpbmVPcHRpb246IGRlZmluZU9wdGlvbixcbiAgICAgIGRlZmluZUV4OiBmdW5jdGlvbihuYW1lLCBwcmVmaXgsIGZ1bmMpe1xuICAgICAgICBpZiAoIXByZWZpeCkge1xuICAgICAgICAgIHByZWZpeCA9IG5hbWU7XG4gICAgICAgIH0gZWxzZSBpZiAobmFtZS5pbmRleE9mKHByZWZpeCkgIT09IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJyhWaW0uZGVmaW5lRXgpIFwiJytwcmVmaXgrJ1wiIGlzIG5vdCBhIHByZWZpeCBvZiBcIicrbmFtZSsnXCIsIGNvbW1hbmQgbm90IHJlZ2lzdGVyZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBleENvbW1hbmRzW25hbWVdPWZ1bmM7XG4gICAgICAgIGV4Q29tbWFuZERpc3BhdGNoZXIuY29tbWFuZE1hcF9bcHJlZml4XT17bmFtZTpuYW1lLCBzaG9ydE5hbWU6cHJlZml4LCB0eXBlOidhcGknfTtcbiAgICAgIH0sXG4gICAgICBoYW5kbGVLZXk6IGZ1bmN0aW9uIChjbSwga2V5LCBvcmlnaW4pIHtcbiAgICAgICAgdmFyIGNvbW1hbmQgPSB0aGlzLmZpbmRLZXkoY20sIGtleSwgb3JpZ2luKTtcbiAgICAgICAgaWYgKHR5cGVvZiBjb21tYW5kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbW1hbmQoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG11bHRpU2VsZWN0SGFuZGxlS2V5OiBtdWx0aVNlbGVjdEhhbmRsZUtleSxcblxuICAgICAgLyoqXG4gICAgICAgKiBUaGlzIGlzIHRoZSBvdXRlcm1vc3QgZnVuY3Rpb24gY2FsbGVkIGJ5IENvZGVNaXJyb3IsIGFmdGVyIGtleXMgaGF2ZVxuICAgICAgICogYmVlbiBtYXBwZWQgdG8gdGhlaXIgVmltIGVxdWl2YWxlbnRzLlxuICAgICAgICpcbiAgICAgICAqIEZpbmRzIGEgY29tbWFuZCBiYXNlZCBvbiB0aGUga2V5IChhbmQgY2FjaGVkIGtleXMgaWYgdGhlcmUgaXMgYVxuICAgICAgICogbXVsdGkta2V5IHNlcXVlbmNlKS4gUmV0dXJucyBgdW5kZWZpbmVkYCBpZiBubyBrZXkgaXMgbWF0Y2hlZCwgYSBub29wXG4gICAgICAgKiBmdW5jdGlvbiBpZiBhIHBhcnRpYWwgbWF0Y2ggaXMgZm91bmQgKG11bHRpLWtleSksIGFuZCBhIGZ1bmN0aW9uIHRvXG4gICAgICAgKiBleGVjdXRlIHRoZSBib3VuZCBjb21tYW5kIGlmIGEgYSBrZXkgaXMgbWF0Y2hlZC4gVGhlIGZ1bmN0aW9uIGFsd2F5c1xuICAgICAgICogcmV0dXJucyB0cnVlLlxuICAgICAgICovXG4gICAgICBmaW5kS2V5OiBmdW5jdGlvbihjbSwga2V5LCBvcmlnaW4pIHtcbiAgICAgICAgdmFyIHZpbSA9IG1heWJlSW5pdFZpbVN0YXRlKGNtKTtcblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVNYWNyb1JlY29yZGluZygpIHtcbiAgICAgICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgICAgICBpZiAobWFjcm9Nb2RlU3RhdGUuaXNSZWNvcmRpbmcpIHtcbiAgICAgICAgICAgIGlmIChrZXkgPT0gJ3EnKSB7XG4gICAgICAgICAgICAgIG1hY3JvTW9kZVN0YXRlLmV4aXRNYWNyb1JlY29yZE1vZGUoKTtcbiAgICAgICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3JpZ2luICE9ICdtYXBwaW5nJykge1xuICAgICAgICAgICAgICBsb2dLZXkobWFjcm9Nb2RlU3RhdGUsIGtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUVzYygpIHtcbiAgICAgICAgICBpZiAoa2V5ID09ICc8RXNjPicpIHtcbiAgICAgICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgICAvLyBHZXQgYmFjayB0byBub3JtYWwgbW9kZS5cbiAgICAgICAgICAgICAgZXhpdFZpc3VhbE1vZGUoY20pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh2aW0uaW5zZXJ0TW9kZSkge1xuICAgICAgICAgICAgICAvLyBHZXQgYmFjayB0byBub3JtYWwgbW9kZS5cbiAgICAgICAgICAgICAgZXhpdEluc2VydE1vZGUoY20pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gV2UncmUgYWxyZWFkeSBpbiBub3JtYWwgbW9kZS4gTGV0ICc8RXNjPicgYmUgaGFuZGxlZCBub3JtYWxseS5cbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUtleUluc2VydE1vZGUoKSB7XG4gICAgICAgICAgaWYgKGhhbmRsZUVzYygpKSB7IHJldHVybiB0cnVlOyB9XG4gICAgICAgICAgdmltLmlucHV0U3RhdGUua2V5QnVmZmVyLnB1c2goa2V5KTtcbiAgICAgICAgICB2YXIga2V5cyA9IHZpbS5pbnB1dFN0YXRlLmtleUJ1ZmZlci5qb2luKFwiXCIpO1xuICAgICAgICAgIHZhciBrZXlzQXJlQ2hhcnMgPSBrZXkubGVuZ3RoID09IDE7XG4gICAgICAgICAgdmFyIG1hdGNoID0gY29tbWFuZERpc3BhdGNoZXIubWF0Y2hDb21tYW5kKGtleXMsIGRlZmF1bHRLZXltYXAsIHZpbS5pbnB1dFN0YXRlLCAnaW5zZXJ0Jyk7XG4gICAgICAgICAgdmFyIGNoYW5nZVF1ZXVlID0gdmltLmlucHV0U3RhdGUuY2hhbmdlUXVldWU7XG5cbiAgICAgICAgICBpZiAobWF0Y2gudHlwZSA9PSAnbm9uZScpIHsgY2xlYXJJbnB1dFN0YXRlKGNtKTsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgICAgZWxzZSBpZiAobWF0Y2gudHlwZSA9PSAncGFydGlhbCcpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaC5leHBlY3RMaXRlcmFsTmV4dCkgdmltLmV4cGVjdExpdGVyYWxOZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChsYXN0SW5zZXJ0TW9kZUtleVRpbWVyKSB7IHdpbmRvdy5jbGVhclRpbWVvdXQobGFzdEluc2VydE1vZGVLZXlUaW1lcik7IH1cbiAgICAgICAgICAgIGxhc3RJbnNlcnRNb2RlS2V5VGltZXIgPSBrZXlzQXJlQ2hhcnMgJiYgd2luZG93LnNldFRpbWVvdXQoXG4gICAgICAgICAgICAgIGZ1bmN0aW9uKCkgeyBpZiAodmltLmluc2VydE1vZGUgJiYgdmltLmlucHV0U3RhdGUua2V5QnVmZmVyLmxlbmd0aCkgeyBjbGVhcklucHV0U3RhdGUoY20pOyB9IH0sXG4gICAgICAgICAgICAgIGdldE9wdGlvbignaW5zZXJ0TW9kZUVzY0tleXNUaW1lb3V0JykpO1xuICAgICAgICAgICAgaWYgKGtleXNBcmVDaGFycykge1xuICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9ucyA9IGNtLmxpc3RTZWxlY3Rpb25zKCk7XG4gICAgICAgICAgICAgIGlmICghY2hhbmdlUXVldWUgfHwgY2hhbmdlUXVldWUucmVtb3ZlZC5sZW5ndGggIT0gc2VsZWN0aW9ucy5sZW5ndGgpXG4gICAgICAgICAgICAgICAgY2hhbmdlUXVldWUgPSB2aW0uaW5wdXRTdGF0ZS5jaGFuZ2VRdWV1ZSA9IG5ldyBDaGFuZ2VRdWV1ZTtcbiAgICAgICAgICAgICAgY2hhbmdlUXVldWUuaW5zZXJ0ZWQgKz0ga2V5O1xuICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGVjdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZnJvbSA9IGN1cnNvck1pbihzZWxlY3Rpb25zW2ldLmFuY2hvciwgc2VsZWN0aW9uc1tpXS5oZWFkKTtcbiAgICAgICAgICAgICAgICB2YXIgdG8gPSBjdXJzb3JNYXgoc2VsZWN0aW9uc1tpXS5hbmNob3IsIHNlbGVjdGlvbnNbaV0uaGVhZCk7XG4gICAgICAgICAgICAgICAgdmFyIHRleHQgPSBjbS5nZXRSYW5nZShmcm9tLCBjbS5zdGF0ZS5vdmVyd3JpdGUgPyBvZmZzZXRDdXJzb3IodG8sIDAsIDEpIDogdG8pO1xuICAgICAgICAgICAgICAgIGNoYW5nZVF1ZXVlLnJlbW92ZWRbaV0gPSAoY2hhbmdlUXVldWUucmVtb3ZlZFtpXSB8fCBcIlwiKSArIHRleHQ7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiAha2V5c0FyZUNoYXJzO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2aW0uZXhwZWN0TGl0ZXJhbE5leHQgPSBmYWxzZTtcblxuICAgICAgICAgIGlmIChsYXN0SW5zZXJ0TW9kZUtleVRpbWVyKSB7IHdpbmRvdy5jbGVhclRpbWVvdXQobGFzdEluc2VydE1vZGVLZXlUaW1lcik7IH1cbiAgICAgICAgICBpZiAobWF0Y2guY29tbWFuZCAmJiBjaGFuZ2VRdWV1ZSkge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbnMgPSBjbS5saXN0U2VsZWN0aW9ucygpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBoZXJlID0gc2VsZWN0aW9uc1tpXS5oZWFkO1xuICAgICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UoY2hhbmdlUXVldWUucmVtb3ZlZFtpXSB8fCBcIlwiLCBcbiAgICAgICAgICAgICAgICBvZmZzZXRDdXJzb3IoaGVyZSwgMCwgLWNoYW5nZVF1ZXVlLmluc2VydGVkLmxlbmd0aCksIGhlcmUsICcraW5wdXQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcy5jaGFuZ2VzLnBvcCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIW1hdGNoLmNvbW1hbmQpIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgICAgcmV0dXJuIG1hdGNoLmNvbW1hbmQ7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVLZXlOb25JbnNlcnRNb2RlKCkge1xuICAgICAgICAgIGlmIChoYW5kbGVNYWNyb1JlY29yZGluZygpIHx8IGhhbmRsZUVzYygpKSB7IHJldHVybiB0cnVlOyB9XG5cbiAgICAgICAgICB2aW0uaW5wdXRTdGF0ZS5rZXlCdWZmZXIucHVzaChrZXkpO1xuICAgICAgICAgIHZhciBrZXlzID0gdmltLmlucHV0U3RhdGUua2V5QnVmZmVyLmpvaW4oXCJcIik7XG4gICAgICAgICAgaWYgKC9eWzEtOV1cXGQqJC8udGVzdChrZXlzKSkgeyByZXR1cm4gdHJ1ZTsgfVxuXG4gICAgICAgICAgdmFyIGtleXNNYXRjaGVyID0gL14oXFxkKikoLiopJC8uZXhlYyhrZXlzKTtcbiAgICAgICAgICBpZiAoIWtleXNNYXRjaGVyKSB7IGNsZWFySW5wdXRTdGF0ZShjbSk7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICAgIHZhciBjb250ZXh0ID0gdmltLnZpc3VhbE1vZGUgPyAndmlzdWFsJyA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdub3JtYWwnO1xuICAgICAgICAgIHZhciBtYWluS2V5ID0ga2V5c01hdGNoZXJbMl0gfHwga2V5c01hdGNoZXJbMV07XG4gICAgICAgICAgaWYgKHZpbS5pbnB1dFN0YXRlLm9wZXJhdG9yU2hvcnRjdXQgJiYgdmltLmlucHV0U3RhdGUub3BlcmF0b3JTaG9ydGN1dC5zbGljZSgtMSkgPT0gbWFpbktleSkge1xuICAgICAgICAgICAgLy8gbXVsdGlrZXkgb3BlcmF0b3JzIGFjdCBsaW5ld2lzZSBieSByZXBlYXRpbmcgb25seSB0aGUgbGFzdCBjaGFyYWN0ZXJcbiAgICAgICAgICAgIG1haW5LZXkgPSB2aW0uaW5wdXRTdGF0ZS5vcGVyYXRvclNob3J0Y3V0O1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgbWF0Y2ggPSBjb21tYW5kRGlzcGF0Y2hlci5tYXRjaENvbW1hbmQobWFpbktleSwgZGVmYXVsdEtleW1hcCwgdmltLmlucHV0U3RhdGUsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChtYXRjaC50eXBlID09ICdub25lJykgeyBjbGVhcklucHV0U3RhdGUoY20pOyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgICBlbHNlIGlmIChtYXRjaC50eXBlID09ICdwYXJ0aWFsJykge1xuICAgICAgICAgICAgaWYgKG1hdGNoLmV4cGVjdExpdGVyYWxOZXh0KSB2aW0uZXhwZWN0TGl0ZXJhbE5leHQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKG1hdGNoLnR5cGUgPT0gJ2NsZWFyJykgeyBjbGVhcklucHV0U3RhdGUoY20pOyByZXR1cm4gdHJ1ZTsgfVxuICAgICAgICAgIHZpbS5leHBlY3RMaXRlcmFsTmV4dCA9IGZhbHNlO1xuXG4gICAgICAgICAgdmltLmlucHV0U3RhdGUua2V5QnVmZmVyLmxlbmd0aCA9IDA7XG4gICAgICAgICAga2V5c01hdGNoZXIgPSAvXihcXGQqKSguKikkLy5leGVjKGtleXMpO1xuICAgICAgICAgIGlmIChrZXlzTWF0Y2hlclsxXSAmJiBrZXlzTWF0Y2hlclsxXSAhPSAnMCcpIHtcbiAgICAgICAgICAgIHZpbS5pbnB1dFN0YXRlLnB1c2hSZXBlYXREaWdpdChrZXlzTWF0Y2hlclsxXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtYXRjaC5jb21tYW5kO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNvbW1hbmQ7XG4gICAgICAgIGlmICh2aW0uaW5zZXJ0TW9kZSkgeyBjb21tYW5kID0gaGFuZGxlS2V5SW5zZXJ0TW9kZSgpOyB9XG4gICAgICAgIGVsc2UgeyBjb21tYW5kID0gaGFuZGxlS2V5Tm9uSW5zZXJ0TW9kZSgpOyB9XG4gICAgICAgIGlmIChjb21tYW5kID09PSBmYWxzZSkge1xuICAgICAgICAgIHJldHVybiAhdmltLmluc2VydE1vZGUgJiYga2V5Lmxlbmd0aCA9PT0gMSA/IGZ1bmN0aW9uKCkgeyByZXR1cm4gdHJ1ZTsgfSA6IHVuZGVmaW5lZDtcbiAgICAgICAgfSBlbHNlIGlmIChjb21tYW5kID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gVE9ETzogTG9vayBpbnRvIHVzaW5nIENvZGVNaXJyb3IncyBtdWx0aS1rZXkgaGFuZGxpbmcuXG4gICAgICAgICAgLy8gUmV0dXJuIG5vLW9wIHNpbmNlIHdlIGFyZSBjYWNoaW5nIHRoZSBrZXkuIENvdW50cyBhcyBoYW5kbGVkLCBidXRcbiAgICAgICAgICAvLyBkb24ndCB3YW50IGFjdCBvbiBpdCBqdXN0IHlldC5cbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgoY29tbWFuZC5vcGVyYXRvciB8fCBjb21tYW5kLmlzRWRpdCkgJiYgY20uZ2V0T3B0aW9uKCdyZWFkT25seScpKVxuICAgICAgICAgICAgICByZXR1cm47IC8vIGFjZV9wYXRjaFxuICAgICAgICAgICAgcmV0dXJuIGNtLm9wZXJhdGlvbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgY20uY3VyT3AuaXNWaW1PcCA9IHRydWU7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbW1hbmQudHlwZSA9PSAna2V5VG9LZXknKSB7XG4gICAgICAgICAgICAgICAgICBkb0tleVRvS2V5KGNtLCBjb21tYW5kLnRvS2V5cywgY29tbWFuZCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNvbW1hbmREaXNwYXRjaGVyLnByb2Nlc3NDb21tYW5kKGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIC8vIGNsZWFyIFZJTSBzdGF0ZSBpbiBjYXNlIGl0J3MgaW4gYSBiYWQgc3RhdGUuXG4gICAgICAgICAgICAgICAgY20uc3RhdGUudmltID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIG1heWJlSW5pdFZpbVN0YXRlKGNtKTtcbiAgICAgICAgICAgICAgICBpZiAoIXZpbUFwaS5zdXBwcmVzc0Vycm9yTG9nZ2luZykge1xuICAgICAgICAgICAgICAgICAgY29uc29sZVsnbG9nJ10oZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaGFuZGxlRXg6IGZ1bmN0aW9uKGNtLCBpbnB1dCkge1xuICAgICAgICBleENvbW1hbmREaXNwYXRjaGVyLnByb2Nlc3NDb21tYW5kKGNtLCBpbnB1dCk7XG4gICAgICB9LFxuXG4gICAgICBkZWZpbmVNb3Rpb246IGRlZmluZU1vdGlvbixcbiAgICAgIGRlZmluZUFjdGlvbjogZGVmaW5lQWN0aW9uLFxuICAgICAgZGVmaW5lT3BlcmF0b3I6IGRlZmluZU9wZXJhdG9yLFxuICAgICAgbWFwQ29tbWFuZDogbWFwQ29tbWFuZCxcbiAgICAgIF9tYXBDb21tYW5kOiBfbWFwQ29tbWFuZCxcblxuICAgICAgZGVmaW5lUmVnaXN0ZXI6IGRlZmluZVJlZ2lzdGVyLFxuXG4gICAgICBleGl0VmlzdWFsTW9kZTogZXhpdFZpc3VhbE1vZGUsXG4gICAgICBleGl0SW5zZXJ0TW9kZTogZXhpdEluc2VydE1vZGVcbiAgICB9O1xuXG4gICAgdmFyIGtleVRvS2V5U3RhY2sgPSBbXTtcbiAgICB2YXIgbm9yZW1hcCA9IGZhbHNlO1xuICAgIHZhciB2aXJ0dWFsUHJvbXB0O1xuICAgIGZ1bmN0aW9uIHNlbmRLZXlUb1Byb21wdChrZXkpIHtcbiAgICAgIGlmIChrZXlbMF0gPT0gXCI8XCIpIHtcbiAgICAgICAgdmFyIGxvd2VyS2V5ID0ga2V5LnRvTG93ZXJDYXNlKCkuc2xpY2UoMSwgLTEpO1xuICAgICAgICB2YXIgcGFydHMgPSBsb3dlcktleS5zcGxpdCgnLScpO1xuICAgICAgICBsb3dlcktleSA9IHBhcnRzLnBvcCgpIHx8ICcnO1xuICAgICAgICBpZiAobG93ZXJLZXkgPT0gJ2x0Jykga2V5ID0gJzwnO1xuICAgICAgICBlbHNlIGlmIChsb3dlcktleSA9PSAnc3BhY2UnKSBrZXkgPSAnICc7XG4gICAgICAgIGVsc2UgaWYgKGxvd2VyS2V5ID09ICdjcicpIGtleSA9ICdcXG4nO1xuICAgICAgICBlbHNlIGlmICh2aW1Ub0NtS2V5TWFwW2xvd2VyS2V5XSkge1xuICAgICAgICAgIHZhciB2YWx1ZSA9IHZpcnR1YWxQcm9tcHQudmFsdWU7XG4gICAgICAgICAgdmFyIGV2ZW50ID0gIHtcbiAgICAgICAgICAgIGtleTogdmltVG9DbUtleU1hcFtsb3dlcktleV0sXG4gICAgICAgICAgICB0YXJnZXQ6IHtcbiAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgICBzZWxlY3Rpb25FbmQ6IHZhbHVlLmxlbmd0aCxcbiAgICAgICAgICAgICAgc2VsZWN0aW9uU3RhcnQ6IHZhbHVlLmxlbmd0aFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodmlydHVhbFByb21wdC5vbktleURvd24pIHtcbiAgICAgICAgICAgIHZpcnR1YWxQcm9tcHQub25LZXlEb3duKGV2ZW50LCB2aXJ0dWFsUHJvbXB0LnZhbHVlLCBjbG9zZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2aXJ0dWFsUHJvbXB0ICYmIHZpcnR1YWxQcm9tcHQub25LZXlVcCkge1xuICAgICAgICAgICAgdmlydHVhbFByb21wdC5vbktleVVwKGV2ZW50LCB2aXJ0dWFsUHJvbXB0LnZhbHVlLCBjbG9zZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGtleSA9PSAnXFxuJykge1xuICAgICAgICB2YXIgcHJvbXB0ID0gdmlydHVhbFByb21wdDtcbiAgICAgICAgdmlydHVhbFByb21wdCA9IG51bGw7XG4gICAgICAgIHByb21wdC5vbkNsb3NlICYmIHByb21wdC5vbkNsb3NlKHByb21wdC52YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2aXJ0dWFsUHJvbXB0LnZhbHVlID0gKHZpcnR1YWxQcm9tcHQudmFsdWUgfHwgJycpICsga2V5O1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjbG9zZSh2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7IHZpcnR1YWxQcm9tcHQudmFsdWUgPSB2YWx1ZTsgfVxuICAgICAgICBlbHNlIHsgdmlydHVhbFByb21wdCA9IG51bGw7IH1cbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZG9LZXlUb0tleShjbSwga2V5cywgZnJvbUtleSkge1xuICAgICAgdmFyIG5vcmVtYXBCZWZvcmUgPSBub3JlbWFwO1xuICAgICAgLy8gcHJldmVudCBpbmZpbml0ZSByZWN1cnNpb24uXG4gICAgICBpZiAoZnJvbUtleSkge1xuICAgICAgICBpZiAoa2V5VG9LZXlTdGFjay5pbmRleE9mKGZyb21LZXkpICE9IC0xKSByZXR1cm47XG4gICAgICAgIGtleVRvS2V5U3RhY2sucHVzaChmcm9tS2V5KTtcbiAgICAgICAgbm9yZW1hcCA9IGZyb21LZXkubm9yZW1hcCAhPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgdmFyIHZpbSA9IG1heWJlSW5pdFZpbVN0YXRlKGNtKTtcbiAgICAgICAgdmFyIGtleVJlID0gLzwoPzpbQ1NNQV0tKSpcXHcrPnwuL2dpO1xuXG4gICAgICAgIHZhciBtYXRjaDtcbiAgICAgICAgLy8gUHVsbCBvZmYgb25lIGNvbW1hbmQga2V5LCB3aGljaCBpcyBlaXRoZXIgYSBzaW5nbGUgY2hhcmFjdGVyXG4gICAgICAgIC8vIG9yIGEgc3BlY2lhbCBzZXF1ZW5jZSB3cmFwcGVkIGluICc8JyBhbmQgJz4nLCBlLmcuICc8U3BhY2U+Jy5cbiAgICAgICAgd2hpbGUgKChtYXRjaCA9IGtleVJlLmV4ZWMoa2V5cykpKSB7XG4gICAgICAgICAgdmFyIGtleSA9IG1hdGNoWzBdO1xuICAgICAgICAgIHZhciB3YXNJbnNlcnQgPSB2aW0uaW5zZXJ0TW9kZTtcbiAgICAgICAgICBpZiAodmlydHVhbFByb21wdCkge1xuICAgICAgICAgICAgc2VuZEtleVRvUHJvbXB0KGtleSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgcmVzdWx0ID0gdmltQXBpLmhhbmRsZUtleShjbSwga2V5LCAnbWFwcGluZycpO1xuXG4gICAgICAgICAgaWYgKCFyZXN1bHQgJiYgd2FzSW5zZXJ0ICYmIHZpbS5pbnNlcnRNb2RlKSB7XG4gICAgICAgICAgICBpZiAoa2V5WzBdID09IFwiPFwiKSB7XG4gICAgICAgICAgICAgIHZhciBsb3dlcktleSA9IGtleS50b0xvd2VyQ2FzZSgpLnNsaWNlKDEsIC0xKTtcbiAgICAgICAgICAgICAgdmFyIHBhcnRzID0gbG93ZXJLZXkuc3BsaXQoJy0nKTtcbiAgICAgICAgICAgICAgbG93ZXJLZXkgPSBwYXJ0cy5wb3AoKSB8fCAnJztcbiAgICAgICAgICAgICAgaWYgKGxvd2VyS2V5ID09ICdsdCcpIGtleSA9ICc8JztcbiAgICAgICAgICAgICAgZWxzZSBpZiAobG93ZXJLZXkgPT0gJ3NwYWNlJykga2V5ID0gJyAnO1xuICAgICAgICAgICAgICBlbHNlIGlmIChsb3dlcktleSA9PSAnY3InKSBrZXkgPSAnXFxuJztcbiAgICAgICAgICAgICAgZWxzZSBpZiAodmltVG9DbUtleU1hcC5oYXNPd25Qcm9wZXJ0eShsb3dlcktleSkpIHtcbiAgICAgICAgICAgICAgICAvLyB0b2RvIHN1cHBvcnQgY29kZW1pcnJvciBrZXlzIGluIGluc2VydG1vZGUgdmltVG9DbUtleU1hcFxuICAgICAgICAgICAgICAgIGtleSA9IHZpbVRvQ21LZXlNYXBbbG93ZXJLZXldO1xuICAgICAgICAgICAgICAgIHNlbmRDbUtleShjbSwga2V5KTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBrZXkgPSBrZXlbMF07XG4gICAgICAgICAgICAgICAga2V5UmUubGFzdEluZGV4ID0gbWF0Y2guaW5kZXggKyAxO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9uKGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBrZXlUb0tleVN0YWNrLnBvcCgpO1xuICAgICAgICBub3JlbWFwID0ga2V5VG9LZXlTdGFjay5sZW5ndGggPyBub3JlbWFwQmVmb3JlIDogZmFsc2U7XG4gICAgICAgIGlmICgha2V5VG9LZXlTdGFjay5sZW5ndGggJiYgdmlydHVhbFByb21wdCkge1xuICAgICAgICAgIHZhciBwcm9tcHRPcHRpb25zID0gdmlydHVhbFByb21wdDtcbiAgICAgICAgICB2aXJ0dWFsUHJvbXB0ID0gbnVsbDtcbiAgICAgICAgICBzaG93UHJvbXB0KGNtLCBwcm9tcHRPcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBzcGVjaWFsS2V5ID0ge1xuICAgICAgUmV0dXJuOiAnQ1InLCBCYWNrc3BhY2U6ICdCUycsICdEZWxldGUnOiAnRGVsJywgRXNjYXBlOiAnRXNjJywgSW5zZXJ0OiAnSW5zJyxcbiAgICAgIEFycm93TGVmdDogJ0xlZnQnLCBBcnJvd1JpZ2h0OiAnUmlnaHQnLCBBcnJvd1VwOiAnVXAnLCBBcnJvd0Rvd246ICdEb3duJyxcbiAgICAgIEVudGVyOiAnQ1InLCAnICc6ICdTcGFjZSdcbiAgICB9O1xuICAgIHZhciBpZ25vcmVkS2V5cyA9IHsgU2hpZnQ6IDEsIEFsdDogMSwgQ29tbWFuZDogMSwgQ29udHJvbDogMSxcbiAgICAgIENhcHNMb2NrOiAxLCBBbHRHcmFwaDogMSwgRGVhZDogMSwgVW5pZGVudGlmaWVkOiAxIH07XG5cbiAgICB2YXIgdmltVG9DbUtleU1hcCA9IHt9O1xuICAgICdMZWZ0fFJpZ2h0fFVwfERvd258RW5kfEhvbWUnLnNwbGl0KCd8JykuY29uY2F0KE9iamVjdC5rZXlzKHNwZWNpYWxLZXkpKS5mb3JFYWNoKGZ1bmN0aW9uKHgpIHtcbiAgICAgIHZpbVRvQ21LZXlNYXBbKHNwZWNpYWxLZXlbeF0gfHwgJycpLnRvTG93ZXJDYXNlKCldXG4gICAgICAgICA9IHZpbVRvQ21LZXlNYXBbeC50b0xvd2VyQ2FzZSgpXSA9IHg7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiB2aW1LZXlGcm9tRXZlbnQoZSwgdmltKSB7XG4gICAgICB2YXIga2V5ID0gZS5rZXk7XG4gICAgICBpZiAoaWdub3JlZEtleXNba2V5XSkgcmV0dXJuO1xuICAgICAgaWYgKGtleS5sZW5ndGggPiAxICYmIGtleVswXSA9PSBcIm5cIikge1xuICAgICAgICBrZXkgPSBrZXkucmVwbGFjZShcIk51bXBhZFwiLCBcIlwiKTtcbiAgICAgIH1cbiAgICAgIGtleSA9IHNwZWNpYWxLZXlba2V5XSB8fCBrZXk7XG5cbiAgICAgIHZhciBuYW1lID0gJyc7XG4gICAgICBpZiAoZS5jdHJsS2V5KSB7IG5hbWUgKz0gJ0MtJzsgfVxuICAgICAgaWYgKGUuYWx0S2V5KSB7IG5hbWUgKz0gJ0EtJzsgfVxuICAgICAgaWYgKGUubWV0YUtleSkgeyBuYW1lICs9ICdNLSc7IH1cbiAgICAgIC8vIG9uIG1hYyBtYW55IGNoYXJhY3RlcnMgYXJlIGVudGVyZWQgYXMgb3B0aW9uLSBjb21ib3NcbiAgICAgIC8vIChlLmcuIG9uIHN3aXNzIGtleWJvYXJkIHsgaXMgb3B0aW9uLTgpXG4gICAgICAvLyBzbyB3ZSBpZ25vcmUgbG9uZWx5IEEtIG1vZGlmaWVyIGZvciBrZXlwcmVzcyBldmVudCBvbiBtYWNcbiAgICAgIGlmIChDb2RlTWlycm9yLmlzTWFjICYmIGUuYWx0S2V5ICYmICFlLm1ldGFLZXkgJiYgIWUuY3RybEtleSkge1xuICAgICAgICBuYW1lID0gbmFtZS5zbGljZSgyKTtcbiAgICAgIH1cbiAgICAgIGlmICgobmFtZSB8fCBrZXkubGVuZ3RoID4gMSkgJiYgZS5zaGlmdEtleSkgeyBuYW1lICs9ICdTLSc7IH1cbiAgXG4gICAgICBpZiAodmltICYmICF2aW0uZXhwZWN0TGl0ZXJhbE5leHQgJiYga2V5Lmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIGlmIChsYW5nbWFwLmtleW1hcCAmJiBrZXkgaW4gbGFuZ21hcC5rZXltYXApIHtcbiAgICAgICAgICBpZiAobGFuZ21hcC5yZW1hcEN0cmwgIT0gZmFsc2UgfHwgIW5hbWUpXG4gICAgICAgICAgICBrZXkgPSBsYW5nbWFwLmtleW1hcFtrZXldO1xuICAgICAgICB9IGVsc2UgaWYgKGtleS5jaGFyQ29kZUF0KDApID4gMjU1KSB7XG4gICAgICAgICAgdmFyIGNvZGUgPSBlLmNvZGUgJiYgZS5jb2RlLnNsaWNlKC0xKSB8fCBcIlwiO1xuICAgICAgICAgIGlmICghZS5zaGlmdEtleSkgY29kZSA9IGNvZGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICBpZiAoY29kZSkga2V5ID0gY29kZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBuYW1lICs9IGtleTtcbiAgICAgIGlmIChuYW1lLmxlbmd0aCA+IDEpIHsgbmFtZSA9ICc8JyArIG5hbWUgKyAnPic7IH1cbiAgICAgIHJldHVybiBuYW1lO1xuICAgIH07XG5cbiAgICAvLyBsYW5nbWFwIHN1cHBvcnRcbiAgICBmdW5jdGlvbiB1cGRhdGVMYW5nbWFwKGxhbmdtYXBTdHJpbmcsIHJlbWFwQ3RybCkge1xuICAgICAgaWYgKGxhbmdtYXAuc3RyaW5nICE9PSBsYW5nbWFwU3RyaW5nKSB7XG4gICAgICAgIGxhbmdtYXAgPSBwYXJzZUxhbmdtYXAobGFuZ21hcFN0cmluZyk7XG4gICAgICB9XG4gICAgICBsYW5nbWFwLnJlbWFwQ3RybCA9IHJlbWFwQ3RybDtcbiAgICB9XG4gICAgZnVuY3Rpb24gcGFyc2VMYW5nbWFwKGxhbmdtYXBTdHJpbmcpIHtcbiAgICAgIC8vIEZyb20gOmhlbHAgbGFuZ21hcFxuICAgICAgLypcbiAgICAgICAgVGhlICdsYW5nbWFwJyBvcHRpb24gaXMgYSBsaXN0IG9mIHBhcnRzLCBzZXBhcmF0ZWQgd2l0aCBjb21tYXMuICBFYWNoXG4gICAgICAgICAgICBwYXJ0IGNhbiBiZSBpbiBvbmUgb2YgdHdvIGZvcm1zOlxuICAgICAgICAgICAgMS4gIEEgbGlzdCBvZiBwYWlycy4gIEVhY2ggcGFpciBpcyBhIFwiZnJvbVwiIGNoYXJhY3RlciBpbW1lZGlhdGVseVxuICAgICAgICAgICAgICAgIGZvbGxvd2VkIGJ5IHRoZSBcInRvXCIgY2hhcmFjdGVyLiAgRXhhbXBsZXM6IFwiYUFcIiwgXCJhQWJCY0NcIi5cbiAgICAgICAgICAgIDIuICBBIGxpc3Qgb2YgXCJmcm9tXCIgY2hhcmFjdGVycywgYSBzZW1pLWNvbG9uIGFuZCBhIGxpc3Qgb2YgXCJ0b1wiXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVycy4gIEV4YW1wbGU6IFwiYWJjO0FCQ1wiXG4gICAgICAqL1xuXG4gICAgICBsZXQga2V5bWFwID0ge307XG4gICAgICBpZiAoIWxhbmdtYXBTdHJpbmcpIHJldHVybiB7IGtleW1hcDoga2V5bWFwLCBzdHJpbmc6ICcnIH07XG5cbiAgICAgIGZ1bmN0aW9uIGdldEVzY2FwZWQobGlzdCkge1xuICAgICAgICByZXR1cm4gbGlzdC5zcGxpdCgvXFxcXD8oLikvKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICB9XG4gICAgICBsYW5nbWFwU3RyaW5nLnNwbGl0KC8oKD86W15cXFxcLF18XFxcXC4pKyksLykubWFwKHBhcnQgPT4ge1xuICAgICAgICBpZiAoIXBhcnQpIHJldHVybjtcbiAgICAgICAgY29uc3Qgc2VtaWNvbG9uID0gcGFydC5zcGxpdCgvKCg/OlteXFxcXDtdfFxcXFwuKSspOy8pO1xuICAgICAgICBpZiAoc2VtaWNvbG9uLmxlbmd0aCA9PSAzKSB7XG4gICAgICAgICAgY29uc3QgZnJvbSA9IGdldEVzY2FwZWQoc2VtaWNvbG9uWzFdKTtcbiAgICAgICAgICBjb25zdCB0byA9IGdldEVzY2FwZWQoc2VtaWNvbG9uWzJdKTtcbiAgICAgICAgICBpZiAoZnJvbS5sZW5ndGggIT09IHRvLmxlbmd0aCkgcmV0dXJuOyAvLyBza2lwIG92ZXIgbWFsZm9ybWVkIHBhcnRcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZyb20ubGVuZ3RoOyArK2kpIGtleW1hcFtmcm9tW2ldXSA9IHRvW2ldO1xuICAgICAgICB9IGVsc2UgaWYgKHNlbWljb2xvbi5sZW5ndGggPT0gMSkge1xuICAgICAgICAgIGNvbnN0IHBhaXJzID0gZ2V0RXNjYXBlZChwYXJ0KTtcbiAgICAgICAgICBpZiAocGFpcnMubGVuZ3RoICUgMiAhPT0gMCkgcmV0dXJuOyAvLyBza2lwIG92ZXIgbWFsZm9ybWVkIHBhcnRcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSArPSAyKSBrZXltYXBbcGFpcnNbaV1dID0gcGFpcnNbaSArIDFdO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHsga2V5bWFwOiBrZXltYXAsIHN0cmluZzogbGFuZ21hcFN0cmluZyB9O1xuICAgIH1cblxuICAgIGRlZmluZU9wdGlvbignbGFuZ21hcCcsIHVuZGVmaW5lZCwgJ3N0cmluZycsIFsnbG1hcCddLCBmdW5jdGlvbihuYW1lLCBjbSkge1xuICAgICAgLy8gVGhlICdmaWxldHlwZScgb3B0aW9uIHByb3hpZXMgdG8gdGhlIENvZGVNaXJyb3IgJ21vZGUnIG9wdGlvbi5cbiAgICAgIGlmIChuYW1lID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxhbmdtYXAuc3RyaW5nO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXBkYXRlTGFuZ21hcChuYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFJlcHJlc2VudHMgdGhlIGN1cnJlbnQgaW5wdXQgc3RhdGUuXG4gICAgZnVuY3Rpb24gSW5wdXRTdGF0ZSgpIHtcbiAgICAgIHRoaXMucHJlZml4UmVwZWF0ID0gW107XG4gICAgICB0aGlzLm1vdGlvblJlcGVhdCA9IFtdO1xuXG4gICAgICB0aGlzLm9wZXJhdG9yID0gbnVsbDtcbiAgICAgIHRoaXMub3BlcmF0b3JBcmdzID0gbnVsbDtcbiAgICAgIHRoaXMubW90aW9uID0gbnVsbDtcbiAgICAgIHRoaXMubW90aW9uQXJncyA9IG51bGw7XG4gICAgICB0aGlzLmtleUJ1ZmZlciA9IFtdOyAvLyBGb3IgbWF0Y2hpbmcgbXVsdGkta2V5IGNvbW1hbmRzLlxuICAgICAgdGhpcy5yZWdpc3Rlck5hbWUgPSBudWxsOyAvLyBEZWZhdWx0cyB0byB0aGUgdW5uYW1lZCByZWdpc3Rlci5cbiAgICAgIHRoaXMuY2hhbmdlUXVldWUgPSBudWxsOyAvLyBGb3IgcmVzdG9yaW5nIHRleHQgdXNlZCBieSBpbnNlcnQgbW9kZSBrZXliaW5kaW5nc1xuICAgIH1cbiAgICBJbnB1dFN0YXRlLnByb3RvdHlwZS5wdXNoUmVwZWF0RGlnaXQgPSBmdW5jdGlvbihuKSB7XG4gICAgICBpZiAoIXRoaXMub3BlcmF0b3IpIHtcbiAgICAgICAgdGhpcy5wcmVmaXhSZXBlYXQgPSB0aGlzLnByZWZpeFJlcGVhdC5jb25jYXQobik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1vdGlvblJlcGVhdCA9IHRoaXMubW90aW9uUmVwZWF0LmNvbmNhdChuKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIElucHV0U3RhdGUucHJvdG90eXBlLmdldFJlcGVhdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlcGVhdCA9IDA7XG4gICAgICBpZiAodGhpcy5wcmVmaXhSZXBlYXQubGVuZ3RoID4gMCB8fCB0aGlzLm1vdGlvblJlcGVhdC5sZW5ndGggPiAwKSB7XG4gICAgICAgIHJlcGVhdCA9IDE7XG4gICAgICAgIGlmICh0aGlzLnByZWZpeFJlcGVhdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmVwZWF0ICo9IHBhcnNlSW50KHRoaXMucHJlZml4UmVwZWF0LmpvaW4oJycpLCAxMCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubW90aW9uUmVwZWF0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZXBlYXQgKj0gcGFyc2VJbnQodGhpcy5tb3Rpb25SZXBlYXQuam9pbignJyksIDEwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcGVhdDtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2xlYXJJbnB1dFN0YXRlKGNtLCByZWFzb24pIHtcbiAgICAgIGNtLnN0YXRlLnZpbS5pbnB1dFN0YXRlID0gbmV3IElucHV0U3RhdGUoKTtcbiAgICAgIGNtLnN0YXRlLnZpbS5leHBlY3RMaXRlcmFsTmV4dCA9IGZhbHNlO1xuICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sICd2aW0tY29tbWFuZC1kb25lJywgcmVhc29uKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBDaGFuZ2VRdWV1ZSgpIHtcbiAgICAgIHRoaXMucmVtb3ZlZCA9IFtdO1xuICAgICAgdGhpcy5pbnNlcnRlZCA9IFwiXCI7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBSZWdpc3RlciBzdG9yZXMgaW5mb3JtYXRpb24gYWJvdXQgY29weSBhbmQgcGFzdGUgcmVnaXN0ZXJzLiAgQmVzaWRlc1xuICAgICAqIHRleHQsIGEgcmVnaXN0ZXIgbXVzdCBzdG9yZSB3aGV0aGVyIGl0IGlzIGxpbmV3aXNlIChpLmUuLCB3aGVuIGl0IGlzXG4gICAgICogcGFzdGVkLCBzaG91bGQgaXQgaW5zZXJ0IGl0c2VsZiBpbnRvIGEgbmV3IGxpbmUsIG9yIHNob3VsZCB0aGUgdGV4dCBiZVxuICAgICAqIGluc2VydGVkIGF0IHRoZSBjdXJzb3IgcG9zaXRpb24uKVxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFJlZ2lzdGVyKHRleHQsIGxpbmV3aXNlLCBibG9ja3dpc2UpIHtcbiAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgIHRoaXMua2V5QnVmZmVyID0gW3RleHQgfHwgJyddO1xuICAgICAgdGhpcy5pbnNlcnRNb2RlQ2hhbmdlcyA9IFtdO1xuICAgICAgdGhpcy5zZWFyY2hRdWVyaWVzID0gW107XG4gICAgICB0aGlzLmxpbmV3aXNlID0gISFsaW5ld2lzZTtcbiAgICAgIHRoaXMuYmxvY2t3aXNlID0gISFibG9ja3dpc2U7XG4gICAgfVxuICAgIFJlZ2lzdGVyLnByb3RvdHlwZSA9IHtcbiAgICAgIHNldFRleHQ6IGZ1bmN0aW9uKHRleHQsIGxpbmV3aXNlLCBibG9ja3dpc2UpIHtcbiAgICAgICAgdGhpcy5rZXlCdWZmZXIgPSBbdGV4dCB8fCAnJ107XG4gICAgICAgIHRoaXMubGluZXdpc2UgPSAhIWxpbmV3aXNlO1xuICAgICAgICB0aGlzLmJsb2Nrd2lzZSA9ICEhYmxvY2t3aXNlO1xuICAgICAgfSxcbiAgICAgIHB1c2hUZXh0OiBmdW5jdGlvbih0ZXh0LCBsaW5ld2lzZSkge1xuICAgICAgICAvLyBpZiB0aGlzIHJlZ2lzdGVyIGhhcyBldmVyIGJlZW4gc2V0IHRvIGxpbmV3aXNlLCB1c2UgbGluZXdpc2UuXG4gICAgICAgIGlmIChsaW5ld2lzZSkge1xuICAgICAgICAgIGlmICghdGhpcy5saW5ld2lzZSkge1xuICAgICAgICAgICAgdGhpcy5rZXlCdWZmZXIucHVzaCgnXFxuJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMubGluZXdpc2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMua2V5QnVmZmVyLnB1c2godGV4dCk7XG4gICAgICB9LFxuICAgICAgcHVzaEluc2VydE1vZGVDaGFuZ2VzOiBmdW5jdGlvbihjaGFuZ2VzKSB7XG4gICAgICAgIHRoaXMuaW5zZXJ0TW9kZUNoYW5nZXMucHVzaChjcmVhdGVJbnNlcnRNb2RlQ2hhbmdlcyhjaGFuZ2VzKSk7XG4gICAgICB9LFxuICAgICAgcHVzaFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbihxdWVyeSkge1xuICAgICAgICB0aGlzLnNlYXJjaFF1ZXJpZXMucHVzaChxdWVyeSk7XG4gICAgICB9LFxuICAgICAgY2xlYXI6IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmtleUJ1ZmZlciA9IFtdO1xuICAgICAgICB0aGlzLmluc2VydE1vZGVDaGFuZ2VzID0gW107XG4gICAgICAgIHRoaXMuc2VhcmNoUXVlcmllcyA9IFtdO1xuICAgICAgICB0aGlzLmxpbmV3aXNlID0gZmFsc2U7XG4gICAgICB9LFxuICAgICAgdG9TdHJpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlCdWZmZXIuam9pbignJyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERlZmluZXMgYW4gZXh0ZXJuYWwgcmVnaXN0ZXIuXG4gICAgICpcbiAgICAgKiBUaGUgbmFtZSBzaG91bGQgYmUgYSBzaW5nbGUgY2hhcmFjdGVyIHRoYXQgd2lsbCBiZSB1c2VkIHRvIHJlZmVyZW5jZSB0aGUgcmVnaXN0ZXIuXG4gICAgICogVGhlIHJlZ2lzdGVyIHNob3VsZCBzdXBwb3J0IHNldFRleHQsIHB1c2hUZXh0LCBjbGVhciwgYW5kIHRvU3RyaW5nKCkuIFNlZSBSZWdpc3RlclxuICAgICAqIGZvciBhIHJlZmVyZW5jZSBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkZWZpbmVSZWdpc3RlcihuYW1lLCByZWdpc3Rlcikge1xuICAgICAgdmFyIHJlZ2lzdGVycyA9IHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5yZWdpc3RlcnM7XG4gICAgICBpZiAoIW5hbWUgfHwgbmFtZS5sZW5ndGggIT0gMSkge1xuICAgICAgICB0aHJvdyBFcnJvcignUmVnaXN0ZXIgbmFtZSBtdXN0IGJlIDEgY2hhcmFjdGVyJyk7XG4gICAgICB9XG4gICAgICAvLyBhY2VfcGF0Y2hcbiAgICAgIHJlZ2lzdGVyc1tuYW1lXSA9IHJlZ2lzdGVyO1xuICAgICAgdmFsaWRSZWdpc3RlcnMucHVzaChuYW1lKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIHZpbSByZWdpc3RlcnMgYWxsb3cgeW91IHRvIGtlZXAgbWFueSBpbmRlcGVuZGVudCBjb3B5IGFuZCBwYXN0ZSBidWZmZXJzLlxuICAgICAqIFNlZSBodHRwOi8vdXNldmltLmNvbS8yMDEyLzA0LzEzL3JlZ2lzdGVycy8gZm9yIGFuIGludHJvZHVjdGlvbi5cbiAgICAgKlxuICAgICAqIFJlZ2lzdGVyQ29udHJvbGxlciBrZWVwcyB0aGUgc3RhdGUgb2YgYWxsIHRoZSByZWdpc3RlcnMuICBBbiBpbml0aWFsXG4gICAgICogc3RhdGUgbWF5IGJlIHBhc3NlZCBpbi4gIFRoZSB1bm5hbWVkIHJlZ2lzdGVyICdcIicgd2lsbCBhbHdheXMgYmVcbiAgICAgKiBvdmVycmlkZGVuLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIFJlZ2lzdGVyQ29udHJvbGxlcihyZWdpc3RlcnMpIHtcbiAgICAgIHRoaXMucmVnaXN0ZXJzID0gcmVnaXN0ZXJzO1xuICAgICAgdGhpcy51bm5hbWVkUmVnaXN0ZXIgPSByZWdpc3RlcnNbJ1wiJ10gPSBuZXcgUmVnaXN0ZXIoKTtcbiAgICAgIHJlZ2lzdGVyc1snLiddID0gbmV3IFJlZ2lzdGVyKCk7XG4gICAgICByZWdpc3RlcnNbJzonXSA9IG5ldyBSZWdpc3RlcigpO1xuICAgICAgcmVnaXN0ZXJzWycvJ10gPSBuZXcgUmVnaXN0ZXIoKTtcbiAgICAgIHJlZ2lzdGVyc1snKyddID0gbmV3IFJlZ2lzdGVyKCk7XG4gICAgfVxuICAgIFJlZ2lzdGVyQ29udHJvbGxlci5wcm90b3R5cGUgPSB7XG4gICAgICBwdXNoVGV4dDogZnVuY3Rpb24ocmVnaXN0ZXJOYW1lLCBvcGVyYXRvciwgdGV4dCwgbGluZXdpc2UsIGJsb2Nrd2lzZSkge1xuICAgICAgICAvLyBUaGUgYmxhY2sgaG9sZSByZWdpc3RlciwgXCJfLCBtZWFucyBkZWxldGUveWFuayB0byBub3doZXJlLlxuICAgICAgICBpZiAocmVnaXN0ZXJOYW1lID09PSAnXycpIHJldHVybjtcbiAgICAgICAgaWYgKGxpbmV3aXNlICYmIHRleHQuY2hhckF0KHRleHQubGVuZ3RoIC0gMSkgIT09ICdcXG4nKXtcbiAgICAgICAgICB0ZXh0ICs9ICdcXG4nO1xuICAgICAgICB9XG4gICAgICAgIC8vIExvd2VyY2FzZSBhbmQgdXBwZXJjYXNlIHJlZ2lzdGVycyByZWZlciB0byB0aGUgc2FtZSByZWdpc3Rlci5cbiAgICAgICAgLy8gVXBwZXJjYXNlIGp1c3QgbWVhbnMgYXBwZW5kLlxuICAgICAgICB2YXIgcmVnaXN0ZXIgPSB0aGlzLmlzVmFsaWRSZWdpc3RlcihyZWdpc3Rlck5hbWUpID9cbiAgICAgICAgICAgIHRoaXMuZ2V0UmVnaXN0ZXIocmVnaXN0ZXJOYW1lKSA6IG51bGw7XG4gICAgICAgIC8vIGlmIG5vIHJlZ2lzdGVyL2FuIGludmFsaWQgcmVnaXN0ZXIgd2FzIHNwZWNpZmllZCwgdGhpbmdzIGdvIHRvIHRoZVxuICAgICAgICAvLyBkZWZhdWx0IHJlZ2lzdGVyc1xuICAgICAgICBpZiAoIXJlZ2lzdGVyKSB7XG4gICAgICAgICAgc3dpdGNoIChvcGVyYXRvcikge1xuICAgICAgICAgICAgY2FzZSAneWFuayc6XG4gICAgICAgICAgICAgIC8vIFRoZSAwIHJlZ2lzdGVyIGNvbnRhaW5zIHRoZSB0ZXh0IGZyb20gdGhlIG1vc3QgcmVjZW50IHlhbmsuXG4gICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJzWycwJ10gPSBuZXcgUmVnaXN0ZXIodGV4dCwgbGluZXdpc2UsIGJsb2Nrd2lzZSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnZGVsZXRlJzpcbiAgICAgICAgICAgIGNhc2UgJ2NoYW5nZSc6XG4gICAgICAgICAgICAgIGlmICh0ZXh0LmluZGV4T2YoJ1xcbicpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gRGVsZXRlIGxlc3MgdGhhbiAxIGxpbmUuIFVwZGF0ZSB0aGUgc21hbGwgZGVsZXRlIHJlZ2lzdGVyLlxuICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJzWyctJ10gPSBuZXcgUmVnaXN0ZXIodGV4dCwgbGluZXdpc2UpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIFNoaWZ0IGRvd24gdGhlIGNvbnRlbnRzIG9mIHRoZSBudW1iZXJlZCByZWdpc3RlcnMgYW5kIHB1dCB0aGVcbiAgICAgICAgICAgICAgICAvLyBkZWxldGVkIHRleHQgaW50byByZWdpc3RlciAxLlxuICAgICAgICAgICAgICAgIHRoaXMuc2hpZnROdW1lcmljUmVnaXN0ZXJzXygpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVnaXN0ZXJzWycxJ10gPSBuZXcgUmVnaXN0ZXIodGV4dCwgbGluZXdpc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIHVubmFtZWQgcmVnaXN0ZXIgaXMgc2V0IHRvIHdoYXQganVzdCBoYXBwZW5lZFxuICAgICAgICAgIHRoaXMudW5uYW1lZFJlZ2lzdGVyLnNldFRleHQodGV4dCwgbGluZXdpc2UsIGJsb2Nrd2lzZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gSWYgd2UndmUgZ290dGVuIHRvIHRoaXMgcG9pbnQsIHdlJ3ZlIGFjdHVhbGx5IHNwZWNpZmllZCBhIHJlZ2lzdGVyXG4gICAgICAgIHZhciBhcHBlbmQgPSBpc1VwcGVyQ2FzZShyZWdpc3Rlck5hbWUpO1xuICAgICAgICBpZiAoYXBwZW5kKSB7XG4gICAgICAgICAgcmVnaXN0ZXIucHVzaFRleHQodGV4dCwgbGluZXdpc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlZ2lzdGVyLnNldFRleHQodGV4dCwgbGluZXdpc2UsIGJsb2Nrd2lzZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZ2lzdGVyTmFtZSA9PT0gJysnICYmIHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgdHlwZW9mIG5hdmlnYXRvci5jbGlwYm9hcmQgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgdHlwZW9mIG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBUaGUgdW5uYW1lZCByZWdpc3RlciBhbHdheXMgaGFzIHRoZSBzYW1lIHZhbHVlIGFzIHRoZSBsYXN0IHVzZWRcbiAgICAgICAgLy8gcmVnaXN0ZXIuXG4gICAgICAgIHRoaXMudW5uYW1lZFJlZ2lzdGVyLnNldFRleHQocmVnaXN0ZXIudG9TdHJpbmcoKSwgbGluZXdpc2UpO1xuICAgICAgfSxcbiAgICAgIC8vIEdldHMgdGhlIHJlZ2lzdGVyIG5hbWVkIEBuYW1lLiAgSWYgb25lIG9mIEBuYW1lIGRvZXNuJ3QgYWxyZWFkeSBleGlzdCxcbiAgICAgIC8vIGNyZWF0ZSBpdC4gIElmIEBuYW1lIGlzIGludmFsaWQsIHJldHVybiB0aGUgdW5uYW1lZFJlZ2lzdGVyLlxuICAgICAgZ2V0UmVnaXN0ZXI6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWRSZWdpc3RlcihuYW1lKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnVubmFtZWRSZWdpc3RlcjtcbiAgICAgICAgfVxuICAgICAgICBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoIXRoaXMucmVnaXN0ZXJzW25hbWVdKSB7XG4gICAgICAgICAgdGhpcy5yZWdpc3RlcnNbbmFtZV0gPSBuZXcgUmVnaXN0ZXIoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5yZWdpc3RlcnNbbmFtZV07XG4gICAgICB9LFxuICAgICAgaXNWYWxpZFJlZ2lzdGVyOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIHJldHVybiBuYW1lICYmIChpbkFycmF5KG5hbWUsIHZhbGlkUmVnaXN0ZXJzKSB8fCBsYXRpbkNoYXJSZWdleC50ZXN0KG5hbWUpKTtcbiAgICAgIH0sXG4gICAgICBzaGlmdE51bWVyaWNSZWdpc3RlcnNfOiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDk7IGkgPj0gMjsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZWdpc3RlcnNbaV0gPSB0aGlzLmdldFJlZ2lzdGVyKCcnICsgKGkgLSAxKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGZ1bmN0aW9uIEhpc3RvcnlDb250cm9sbGVyKCkge1xuICAgICAgICB0aGlzLmhpc3RvcnlCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5pdGVyYXRvciA9IDA7XG4gICAgICAgIHRoaXMuaW5pdGlhbFByZWZpeCA9IG51bGw7XG4gICAgfVxuICAgIEhpc3RvcnlDb250cm9sbGVyLnByb3RvdHlwZSA9IHtcbiAgICAgIC8vIHRoZSBpbnB1dCBhcmd1bWVudCBoZXJlIGFjdHMgYSB1c2VyIGVudGVyZWQgcHJlZml4IGZvciBhIHNtYWxsIHRpbWVcbiAgICAgIC8vIHVudGlsIHdlIHN0YXJ0IGF1dG9jb21wbGV0aW9uIGluIHdoaWNoIGNhc2UgaXQgaXMgdGhlIGF1dG9jb21wbGV0ZWQuXG4gICAgICBuZXh0TWF0Y2g6IGZ1bmN0aW9uIChpbnB1dCwgdXApIHtcbiAgICAgICAgdmFyIGhpc3RvcnlCdWZmZXIgPSB0aGlzLmhpc3RvcnlCdWZmZXI7XG4gICAgICAgIHZhciBkaXIgPSB1cCA/IC0xIDogMTtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbFByZWZpeCA9PT0gbnVsbCkgdGhpcy5pbml0aWFsUHJlZml4ID0gaW5wdXQ7XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLml0ZXJhdG9yICsgZGlyOyB1cCA/IGkgPj0gMCA6IGkgPCBoaXN0b3J5QnVmZmVyLmxlbmd0aDsgaSs9IGRpcikge1xuICAgICAgICAgIHZhciBlbGVtZW50ID0gaGlzdG9yeUJ1ZmZlcltpXTtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8PSBlbGVtZW50Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbml0aWFsUHJlZml4ID09IGVsZW1lbnQuc3Vic3RyaW5nKDAsIGopKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXRlcmF0b3IgPSBpO1xuICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2hvdWxkIHJldHVybiB0aGUgdXNlciBpbnB1dCBpbiBjYXNlIHdlIHJlYWNoIHRoZSBlbmQgb2YgYnVmZmVyLlxuICAgICAgICBpZiAoaSA+PSBoaXN0b3J5QnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuaXRlcmF0b3IgPSBoaXN0b3J5QnVmZmVyLmxlbmd0aDtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbml0aWFsUHJlZml4O1xuICAgICAgICB9XG4gICAgICAgIC8vIHJldHVybiB0aGUgbGFzdCBhdXRvY29tcGxldGVkIHF1ZXJ5IG9yIGV4Q29tbWFuZCBhcyBpdCBpcy5cbiAgICAgICAgaWYgKGkgPCAwICkgcmV0dXJuIGlucHV0O1xuICAgICAgfSxcbiAgICAgIHB1c2hJbnB1dDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5oaXN0b3J5QnVmZmVyLmluZGV4T2YoaW5wdXQpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5oaXN0b3J5QnVmZmVyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGlmIChpbnB1dC5sZW5ndGgpIHRoaXMuaGlzdG9yeUJ1ZmZlci5wdXNoKGlucHV0KTtcbiAgICAgIH0sXG4gICAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbFByZWZpeCA9IG51bGw7XG4gICAgICAgIHRoaXMuaXRlcmF0b3IgPSB0aGlzLmhpc3RvcnlCdWZmZXIubGVuZ3RoO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGNvbW1hbmREaXNwYXRjaGVyID0ge1xuICAgICAgbWF0Y2hDb21tYW5kOiBmdW5jdGlvbihrZXlzLCBrZXlNYXAsIGlucHV0U3RhdGUsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBjb21tYW5kTWF0Y2hlcyhrZXlzLCBrZXlNYXAsIGNvbnRleHQsIGlucHV0U3RhdGUpO1xuICAgICAgICBpZiAoIW1hdGNoZXMuZnVsbCAmJiAhbWF0Y2hlcy5wYXJ0aWFsKSB7XG4gICAgICAgICAgcmV0dXJuIHt0eXBlOiAnbm9uZSd9O1xuICAgICAgICB9IGVsc2UgaWYgKCFtYXRjaGVzLmZ1bGwgJiYgbWF0Y2hlcy5wYXJ0aWFsKSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdwYXJ0aWFsJyxcbiAgICAgICAgICAgIGV4cGVjdExpdGVyYWxOZXh0OiBtYXRjaGVzLnBhcnRpYWwubGVuZ3RoID09IDEgJiYgbWF0Y2hlcy5wYXJ0aWFsWzBdLmtleXMuc2xpY2UoLTExKSA9PSAnPGNoYXJhY3Rlcj4nIC8vIGxhbmdtYXAgbGl0ZXJhbCBsb2dpY1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYmVzdE1hdGNoO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1hdGNoZXMuZnVsbC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBtYXRjaCA9IG1hdGNoZXMuZnVsbFtpXTtcbiAgICAgICAgICBpZiAoIWJlc3RNYXRjaCkge1xuICAgICAgICAgICAgYmVzdE1hdGNoID0gbWF0Y2g7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChiZXN0TWF0Y2gua2V5cy5zbGljZSgtMTEpID09ICc8Y2hhcmFjdGVyPicgfHwgYmVzdE1hdGNoLmtleXMuc2xpY2UoLTEwKSA9PSAnPHJlZ2lzdGVyPicpIHtcbiAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gbGFzdENoYXIoa2V5cyk7XG4gICAgICAgICAgaWYgKCFjaGFyYWN0ZXIgfHwgY2hhcmFjdGVyLmxlbmd0aCA+IDEpIHJldHVybiB7dHlwZTogJ2NsZWFyJ307XG4gICAgICAgICAgaW5wdXRTdGF0ZS5zZWxlY3RlZENoYXJhY3RlciA9IGNoYXJhY3RlcjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge3R5cGU6ICdmdWxsJywgY29tbWFuZDogYmVzdE1hdGNofTtcbiAgICAgIH0sXG4gICAgICBwcm9jZXNzQ29tbWFuZDogZnVuY3Rpb24oY20sIHZpbSwgY29tbWFuZCkge1xuICAgICAgICB2aW0uaW5wdXRTdGF0ZS5yZXBlYXRPdmVycmlkZSA9IGNvbW1hbmQucmVwZWF0T3ZlcnJpZGU7XG4gICAgICAgIHN3aXRjaCAoY29tbWFuZC50eXBlKSB7XG4gICAgICAgICAgY2FzZSAnbW90aW9uJzpcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc01vdGlvbihjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ29wZXJhdG9yJzpcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc09wZXJhdG9yKGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnb3BlcmF0b3JNb3Rpb24nOlxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzT3BlcmF0b3JNb3Rpb24oY20sIHZpbSwgY29tbWFuZCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdhY3Rpb24nOlxuICAgICAgICAgICAgdGhpcy5wcm9jZXNzQWN0aW9uKGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnc2VhcmNoJzpcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc1NlYXJjaChjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2V4JzpcbiAgICAgICAgICBjYXNlICdrZXlUb0V4JzpcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0V4KGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvY2Vzc01vdGlvbjogZnVuY3Rpb24oY20sIHZpbSwgY29tbWFuZCkge1xuICAgICAgICB2aW0uaW5wdXRTdGF0ZS5tb3Rpb24gPSBjb21tYW5kLm1vdGlvbjtcbiAgICAgICAgdmltLmlucHV0U3RhdGUubW90aW9uQXJncyA9IGNvcHlBcmdzKGNvbW1hbmQubW90aW9uQXJncyk7XG4gICAgICAgIHRoaXMuZXZhbElucHV0KGNtLCB2aW0pO1xuICAgICAgfSxcbiAgICAgIHByb2Nlc3NPcGVyYXRvcjogZnVuY3Rpb24oY20sIHZpbSwgY29tbWFuZCkge1xuICAgICAgICB2YXIgaW5wdXRTdGF0ZSA9IHZpbS5pbnB1dFN0YXRlO1xuICAgICAgICBpZiAoaW5wdXRTdGF0ZS5vcGVyYXRvcikge1xuICAgICAgICAgIGlmIChpbnB1dFN0YXRlLm9wZXJhdG9yID09IGNvbW1hbmQub3BlcmF0b3IpIHtcbiAgICAgICAgICAgIC8vIFR5cGluZyBhbiBvcGVyYXRvciB0d2ljZSBsaWtlICdkZCcgbWFrZXMgdGhlIG9wZXJhdG9yIG9wZXJhdGVcbiAgICAgICAgICAgIC8vIGxpbmV3aXNlXG4gICAgICAgICAgICBpbnB1dFN0YXRlLm1vdGlvbiA9ICdleHBhbmRUb0xpbmUnO1xuICAgICAgICAgICAgaW5wdXRTdGF0ZS5tb3Rpb25BcmdzID0geyBsaW5ld2lzZTogdHJ1ZSB9O1xuICAgICAgICAgICAgdGhpcy5ldmFsSW5wdXQoY20sIHZpbSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIDIgZGlmZmVyZW50IG9wZXJhdG9ycyBpbiBhIHJvdyBkb2Vzbid0IG1ha2Ugc2Vuc2UuXG4gICAgICAgICAgICBjbGVhcklucHV0U3RhdGUoY20pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpbnB1dFN0YXRlLm9wZXJhdG9yID0gY29tbWFuZC5vcGVyYXRvcjtcbiAgICAgICAgaW5wdXRTdGF0ZS5vcGVyYXRvckFyZ3MgPSBjb3B5QXJncyhjb21tYW5kLm9wZXJhdG9yQXJncyk7XG4gICAgICAgIGlmIChjb21tYW5kLmtleXMubGVuZ3RoID4gMSkge1xuICAgICAgICAgIGlucHV0U3RhdGUub3BlcmF0b3JTaG9ydGN1dCA9IGNvbW1hbmQua2V5cztcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tbWFuZC5leGl0VmlzdWFsQmxvY2spIHtcbiAgICAgICAgICAgIHZpbS52aXN1YWxCbG9jayA9IGZhbHNlO1xuICAgICAgICAgICAgdXBkYXRlQ21TZWxlY3Rpb24oY20pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgIC8vIE9wZXJhdGluZyBvbiBhIHNlbGVjdGlvbiBpbiB2aXN1YWwgbW9kZS4gV2UgZG9uJ3QgbmVlZCBhIG1vdGlvbi5cbiAgICAgICAgICB0aGlzLmV2YWxJbnB1dChjbSwgdmltKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHByb2Nlc3NPcGVyYXRvck1vdGlvbjogZnVuY3Rpb24oY20sIHZpbSwgY29tbWFuZCkge1xuICAgICAgICB2YXIgdmlzdWFsTW9kZSA9IHZpbS52aXN1YWxNb2RlO1xuICAgICAgICB2YXIgb3BlcmF0b3JNb3Rpb25BcmdzID0gY29weUFyZ3MoY29tbWFuZC5vcGVyYXRvck1vdGlvbkFyZ3MpO1xuICAgICAgICBpZiAob3BlcmF0b3JNb3Rpb25BcmdzKSB7XG4gICAgICAgICAgLy8gT3BlcmF0b3IgbW90aW9ucyBtYXkgaGF2ZSBzcGVjaWFsIGJlaGF2aW9yIGluIHZpc3VhbCBtb2RlLlxuICAgICAgICAgIGlmICh2aXN1YWxNb2RlICYmIG9wZXJhdG9yTW90aW9uQXJncy52aXN1YWxMaW5lKSB7XG4gICAgICAgICAgICB2aW0udmlzdWFsTGluZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMucHJvY2Vzc09wZXJhdG9yKGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICBpZiAoIXZpc3VhbE1vZGUpIHtcbiAgICAgICAgICB0aGlzLnByb2Nlc3NNb3Rpb24oY20sIHZpbSwgY29tbWFuZCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwcm9jZXNzQWN0aW9uOiBmdW5jdGlvbihjbSwgdmltLCBjb21tYW5kKSB7XG4gICAgICAgIHZhciBpbnB1dFN0YXRlID0gdmltLmlucHV0U3RhdGU7XG4gICAgICAgIHZhciByZXBlYXQgPSBpbnB1dFN0YXRlLmdldFJlcGVhdCgpO1xuICAgICAgICB2YXIgcmVwZWF0SXNFeHBsaWNpdCA9ICEhcmVwZWF0O1xuICAgICAgICB2YXIgYWN0aW9uQXJncyA9IGNvcHlBcmdzKGNvbW1hbmQuYWN0aW9uQXJncykgfHwge307XG4gICAgICAgIGlmIChpbnB1dFN0YXRlLnNlbGVjdGVkQ2hhcmFjdGVyKSB7XG4gICAgICAgICAgYWN0aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlciA9IGlucHV0U3RhdGUuc2VsZWN0ZWRDaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWN0aW9ucyBtYXkgb3IgbWF5IG5vdCBoYXZlIG1vdGlvbnMgYW5kIG9wZXJhdG9ycy4gRG8gdGhlc2UgZmlyc3QuXG4gICAgICAgIGlmIChjb21tYW5kLm9wZXJhdG9yKSB7XG4gICAgICAgICAgdGhpcy5wcm9jZXNzT3BlcmF0b3IoY20sIHZpbSwgY29tbWFuZCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbW1hbmQubW90aW9uKSB7XG4gICAgICAgICAgdGhpcy5wcm9jZXNzTW90aW9uKGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb21tYW5kLm1vdGlvbiB8fCBjb21tYW5kLm9wZXJhdG9yKSB7XG4gICAgICAgICAgdGhpcy5ldmFsSW5wdXQoY20sIHZpbSk7XG4gICAgICAgIH1cbiAgICAgICAgYWN0aW9uQXJncy5yZXBlYXQgPSByZXBlYXQgfHwgMTtcbiAgICAgICAgYWN0aW9uQXJncy5yZXBlYXRJc0V4cGxpY2l0ID0gcmVwZWF0SXNFeHBsaWNpdDtcbiAgICAgICAgYWN0aW9uQXJncy5yZWdpc3Rlck5hbWUgPSBpbnB1dFN0YXRlLnJlZ2lzdGVyTmFtZTtcbiAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgdmltLmxhc3RNb3Rpb24gPSBudWxsO1xuICAgICAgICBpZiAoY29tbWFuZC5pc0VkaXQpIHtcbiAgICAgICAgICB0aGlzLnJlY29yZExhc3RFZGl0KHZpbSwgaW5wdXRTdGF0ZSwgY29tbWFuZCk7XG4gICAgICAgIH1cbiAgICAgICAgYWN0aW9uc1tjb21tYW5kLmFjdGlvbl0oY20sIGFjdGlvbkFyZ3MsIHZpbSk7XG4gICAgICB9LFxuICAgICAgcHJvY2Vzc1NlYXJjaDogZnVuY3Rpb24oY20sIHZpbSwgY29tbWFuZCkge1xuICAgICAgICBpZiAoIWNtLmdldFNlYXJjaEN1cnNvcikge1xuICAgICAgICAgIC8vIFNlYXJjaCBkZXBlbmRzIG9uIFNlYXJjaEN1cnNvci5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZvcndhcmQgPSBjb21tYW5kLnNlYXJjaEFyZ3MuZm9yd2FyZDtcbiAgICAgICAgdmFyIHdob2xlV29yZE9ubHkgPSBjb21tYW5kLnNlYXJjaEFyZ3Mud2hvbGVXb3JkT25seTtcbiAgICAgICAgZ2V0U2VhcmNoU3RhdGUoY20pLnNldFJldmVyc2VkKCFmb3J3YXJkKTtcbiAgICAgICAgdmFyIHByb21wdFByZWZpeCA9IChmb3J3YXJkKSA/ICcvJyA6ICc/JztcbiAgICAgICAgdmFyIG9yaWdpbmFsUXVlcnkgPSBnZXRTZWFyY2hTdGF0ZShjbSkuZ2V0UXVlcnkoKTtcbiAgICAgICAgdmFyIG9yaWdpbmFsU2Nyb2xsUG9zID0gY20uZ2V0U2Nyb2xsSW5mbygpO1xuICAgICAgICBmdW5jdGlvbiBoYW5kbGVRdWVyeShxdWVyeSwgaWdub3JlQ2FzZSwgc21hcnRDYXNlKSB7XG4gICAgICAgICAgdmltR2xvYmFsU3RhdGUuc2VhcmNoSGlzdG9yeUNvbnRyb2xsZXIucHVzaElucHV0KHF1ZXJ5KTtcbiAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5zZWFyY2hIaXN0b3J5Q29udHJvbGxlci5yZXNldCgpO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB1cGRhdGVTZWFyY2hRdWVyeShjbSwgcXVlcnksIGlnbm9yZUNhc2UsIHNtYXJ0Q2FzZSk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdJbnZhbGlkIHJlZ2V4OiAnICsgcXVlcnkpO1xuICAgICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29tbWFuZERpc3BhdGNoZXIucHJvY2Vzc01vdGlvbihjbSwgdmltLCB7XG4gICAgICAgICAgICB0eXBlOiAnbW90aW9uJyxcbiAgICAgICAgICAgIG1vdGlvbjogJ2ZpbmROZXh0JyxcbiAgICAgICAgICAgIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgdG9KdW1wbGlzdDogY29tbWFuZC5zZWFyY2hBcmdzLnRvSnVtcGxpc3QgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uUHJvbXB0Q2xvc2UocXVlcnkpIHtcbiAgICAgICAgICAvL2FjZV9wYXRjaCBjbS5zY3JvbGxUbyhvcmlnaW5hbFNjcm9sbFBvcy5sZWZ0LCBvcmlnaW5hbFNjcm9sbFBvcy50b3ApO1xuICAgICAgICAgIGhhbmRsZVF1ZXJ5KHF1ZXJ5LCB0cnVlIC8qKiBpZ25vcmVDYXNlICovLCB0cnVlIC8qKiBzbWFydENhc2UgKi8pO1xuICAgICAgICAgIHZhciBtYWNyb01vZGVTdGF0ZSA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlO1xuICAgICAgICAgIGlmIChtYWNyb01vZGVTdGF0ZS5pc1JlY29yZGluZykge1xuICAgICAgICAgICAgbG9nU2VhcmNoUXVlcnkobWFjcm9Nb2RlU3RhdGUsIHF1ZXJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gb25Qcm9tcHRLZXlVcChlLCBxdWVyeSwgY2xvc2UpIHtcbiAgICAgICAgICB2YXIga2V5TmFtZSA9IHZpbUtleUZyb21FdmVudChlKSwgdXAsIG9mZnNldDtcbiAgICAgICAgICBpZiAoa2V5TmFtZSA9PSAnPFVwPicgfHwga2V5TmFtZSA9PSAnPERvd24+Jykge1xuICAgICAgICAgICAgdXAgPSBrZXlOYW1lID09ICc8VXA+JyA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgIG9mZnNldCA9IGUudGFyZ2V0ID8gZS50YXJnZXQuc2VsZWN0aW9uRW5kIDogMDtcbiAgICAgICAgICAgIHF1ZXJ5ID0gdmltR2xvYmFsU3RhdGUuc2VhcmNoSGlzdG9yeUNvbnRyb2xsZXIubmV4dE1hdGNoKHF1ZXJ5LCB1cCkgfHwgJyc7XG4gICAgICAgICAgICBjbG9zZShxdWVyeSk7XG4gICAgICAgICAgICBpZiAob2Zmc2V0ICYmIGUudGFyZ2V0KSBlLnRhcmdldC5zZWxlY3Rpb25FbmQgPSBlLnRhcmdldC5zZWxlY3Rpb25TdGFydCA9IE1hdGgubWluKG9mZnNldCwgZS50YXJnZXQudmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGtleU5hbWUgJiYga2V5TmFtZSAhPSAnPExlZnQ+JyAmJiBrZXlOYW1lICE9ICc8UmlnaHQ+Jykge1xuICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUuc2VhcmNoSGlzdG9yeUNvbnRyb2xsZXIucmVzZXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHBhcnNlZFF1ZXJ5O1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBwYXJzZWRRdWVyeSA9IHVwZGF0ZVNlYXJjaFF1ZXJ5KGNtLCBxdWVyeSxcbiAgICAgICAgICAgICAgICB0cnVlIC8qKiBpZ25vcmVDYXNlICovLCB0cnVlIC8qKiBzbWFydENhc2UgKi8pO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIC8vIFN3YWxsb3cgYmFkIHJlZ2V4ZXMgZm9yIGluY3JlbWVudGFsIHNlYXJjaC5cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBhcnNlZFF1ZXJ5KSB7XG4gICAgICAgICAgICBjbS5zY3JvbGxJbnRvVmlldyhmaW5kTmV4dChjbSwgIWZvcndhcmQsIHBhcnNlZFF1ZXJ5KSwgMzApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbGVhclNlYXJjaEhpZ2hsaWdodChjbSk7XG4gICAgICAgICAgICBjbS5zY3JvbGxUbyhvcmlnaW5hbFNjcm9sbFBvcy5sZWZ0LCBvcmlnaW5hbFNjcm9sbFBvcy50b3ApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvblByb21wdEtleURvd24oZSwgcXVlcnksIGNsb3NlKSB7XG4gICAgICAgICAgdmFyIGtleU5hbWUgPSB2aW1LZXlGcm9tRXZlbnQoZSk7XG4gICAgICAgICAgaWYgKGtleU5hbWUgPT0gJzxFc2M+JyB8fCBrZXlOYW1lID09ICc8Qy1jPicgfHwga2V5TmFtZSA9PSAnPEMtWz4nIHx8XG4gICAgICAgICAgICAgIChrZXlOYW1lID09ICc8QlM+JyAmJiBxdWVyeSA9PSAnJykpIHtcbiAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLnNlYXJjaEhpc3RvcnlDb250cm9sbGVyLnB1c2hJbnB1dChxdWVyeSk7XG4gICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5zZWFyY2hIaXN0b3J5Q29udHJvbGxlci5yZXNldCgpO1xuICAgICAgICAgICAgdXBkYXRlU2VhcmNoUXVlcnkoY20sIG9yaWdpbmFsUXVlcnkpO1xuICAgICAgICAgICAgY2xlYXJTZWFyY2hIaWdobGlnaHQoY20pO1xuICAgICAgICAgICAgY20uc2Nyb2xsVG8ob3JpZ2luYWxTY3JvbGxQb3MubGVmdCwgb3JpZ2luYWxTY3JvbGxQb3MudG9wKTtcbiAgICAgICAgICAgIENvZGVNaXJyb3IuZV9zdG9wKGUpO1xuICAgICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgICBjbS5mb2N1cygpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoa2V5TmFtZSA9PSAnPFVwPicgfHwga2V5TmFtZSA9PSAnPERvd24+Jykge1xuICAgICAgICAgICAgQ29kZU1pcnJvci5lX3N0b3AoZSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChrZXlOYW1lID09ICc8Qy11PicpIHtcbiAgICAgICAgICAgIC8vIEN0cmwtVSBjbGVhcnMgaW5wdXQuXG4gICAgICAgICAgICBDb2RlTWlycm9yLmVfc3RvcChlKTtcbiAgICAgICAgICAgIGNsb3NlKCcnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3dpdGNoIChjb21tYW5kLnNlYXJjaEFyZ3MucXVlcnlTcmMpIHtcbiAgICAgICAgICBjYXNlICdwcm9tcHQnOlxuICAgICAgICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICAgICAgICBpZiAobWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgICAgIHZhciBxdWVyeSA9IG1hY3JvTW9kZVN0YXRlLnJlcGxheVNlYXJjaFF1ZXJpZXMuc2hpZnQoKTtcbiAgICAgICAgICAgICAgaGFuZGxlUXVlcnkocXVlcnksIHRydWUgLyoqIGlnbm9yZUNhc2UgKi8sIGZhbHNlIC8qKiBzbWFydENhc2UgKi8pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2hvd1Byb21wdChjbSwge1xuICAgICAgICAgICAgICAgICAgb25DbG9zZTogb25Qcm9tcHRDbG9zZSxcbiAgICAgICAgICAgICAgICAgIHByZWZpeDogcHJvbXB0UHJlZml4LFxuICAgICAgICAgICAgICAgICAgZGVzYzogJyhKYXZhU2NyaXB0IHJlZ2V4cCknLFxuICAgICAgICAgICAgICAgICAgb25LZXlVcDogb25Qcm9tcHRLZXlVcCxcbiAgICAgICAgICAgICAgICAgIG9uS2V5RG93bjogb25Qcm9tcHRLZXlEb3duXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnd29yZFVuZGVyQ3Vyc29yJzpcbiAgICAgICAgICAgIHZhciB3b3JkID0gZXhwYW5kV29yZFVuZGVyQ3Vyc29yKGNtLCB7bm9TeW1ib2w6IHRydWV9KTtcbiAgICAgICAgICAgIHZhciBpc0tleXdvcmQgPSB0cnVlO1xuICAgICAgICAgICAgaWYgKCF3b3JkKSB7XG4gICAgICAgICAgICAgIHdvcmQgPSBleHBhbmRXb3JkVW5kZXJDdXJzb3IoY20sIHtub1N5bWJvbDogZmFsc2V9KTtcbiAgICAgICAgICAgICAgaXNLZXl3b3JkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXdvcmQpIHtcbiAgICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdObyB3b3JkIHVuZGVyIGN1cnNvcicpO1xuICAgICAgICAgICAgICBjbGVhcklucHV0U3RhdGUoY20pO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcXVlcnkgPSBjbS5nZXRMaW5lKHdvcmQuc3RhcnQubGluZSkuc3Vic3RyaW5nKHdvcmQuc3RhcnQuY2gsXG4gICAgICAgICAgICAgICAgd29yZC5lbmQuY2gpO1xuICAgICAgICAgICAgaWYgKGlzS2V5d29yZCAmJiB3aG9sZVdvcmRPbmx5KSB7XG4gICAgICAgICAgICAgICAgcXVlcnkgPSAnXFxcXGInICsgcXVlcnkgKyAnXFxcXGInO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcXVlcnkgPSBlc2NhcGVSZWdleChxdWVyeSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNhY2hlZEN1cnNvciBpcyB1c2VkIHRvIHNhdmUgdGhlIG9sZCBwb3NpdGlvbiBvZiB0aGUgY3Vyc29yXG4gICAgICAgICAgICAvLyB3aGVuICogb3IgIyBjYXVzZXMgdmltIHRvIHNlZWsgZm9yIHRoZSBuZWFyZXN0IHdvcmQgYW5kIHNoaWZ0XG4gICAgICAgICAgICAvLyB0aGUgY3Vyc29yIGJlZm9yZSBlbnRlcmluZyB0aGUgbW90aW9uLlxuICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUuanVtcExpc3QuY2FjaGVkQ3Vyc29yID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgICBjbS5zZXRDdXJzb3Iod29yZC5zdGFydCk7XG5cbiAgICAgICAgICAgIGhhbmRsZVF1ZXJ5KHF1ZXJ5LCB0cnVlIC8qKiBpZ25vcmVDYXNlICovLCBmYWxzZSAvKiogc21hcnRDYXNlICovKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvY2Vzc0V4OiBmdW5jdGlvbihjbSwgdmltLCBjb21tYW5kKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uUHJvbXB0Q2xvc2UoaW5wdXQpIHtcbiAgICAgICAgICAvLyBHaXZlIHRoZSBwcm9tcHQgc29tZSB0aW1lIHRvIGNsb3NlIHNvIHRoYXQgaWYgcHJvY2Vzc0NvbW1hbmQgc2hvd3NcbiAgICAgICAgICAvLyBhbiBlcnJvciwgdGhlIGVsZW1lbnRzIGRvbid0IG92ZXJsYXAuXG4gICAgICAgICAgdmltR2xvYmFsU3RhdGUuZXhDb21tYW5kSGlzdG9yeUNvbnRyb2xsZXIucHVzaElucHV0KGlucHV0KTtcbiAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5leENvbW1hbmRIaXN0b3J5Q29udHJvbGxlci5yZXNldCgpO1xuICAgICAgICAgIGV4Q29tbWFuZERpc3BhdGNoZXIucHJvY2Vzc0NvbW1hbmQoY20sIGlucHV0KTtcbiAgICAgICAgICBpZiAoY20uc3RhdGUudmltKSBjbGVhcklucHV0U3RhdGUoY20pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uUHJvbXB0S2V5RG93bihlLCBpbnB1dCwgY2xvc2UpIHtcbiAgICAgICAgICB2YXIga2V5TmFtZSA9IHZpbUtleUZyb21FdmVudChlKSwgdXAsIG9mZnNldDtcbiAgICAgICAgICBpZiAoa2V5TmFtZSA9PSAnPEVzYz4nIHx8IGtleU5hbWUgPT0gJzxDLWM+JyB8fCBrZXlOYW1lID09ICc8Qy1bPicgfHxcbiAgICAgICAgICAgICAgKGtleU5hbWUgPT0gJzxCUz4nICYmIGlucHV0ID09ICcnKSkge1xuICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUuZXhDb21tYW5kSGlzdG9yeUNvbnRyb2xsZXIucHVzaElucHV0KGlucHV0KTtcbiAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLmV4Q29tbWFuZEhpc3RvcnlDb250cm9sbGVyLnJlc2V0KCk7XG4gICAgICAgICAgICBDb2RlTWlycm9yLmVfc3RvcChlKTtcbiAgICAgICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgY20uZm9jdXMoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGtleU5hbWUgPT0gJzxVcD4nIHx8IGtleU5hbWUgPT0gJzxEb3duPicpIHtcbiAgICAgICAgICAgIENvZGVNaXJyb3IuZV9zdG9wKGUpO1xuICAgICAgICAgICAgdXAgPSBrZXlOYW1lID09ICc8VXA+JyA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgICAgIG9mZnNldCA9IGUudGFyZ2V0ID8gZS50YXJnZXQuc2VsZWN0aW9uRW5kIDogMDtcbiAgICAgICAgICAgIGlucHV0ID0gdmltR2xvYmFsU3RhdGUuZXhDb21tYW5kSGlzdG9yeUNvbnRyb2xsZXIubmV4dE1hdGNoKGlucHV0LCB1cCkgfHwgJyc7XG4gICAgICAgICAgICBjbG9zZShpbnB1dCk7XG4gICAgICAgICAgICBpZiAob2Zmc2V0ICYmIGUudGFyZ2V0KSBlLnRhcmdldC5zZWxlY3Rpb25FbmQgPSBlLnRhcmdldC5zZWxlY3Rpb25TdGFydCA9IE1hdGgubWluKG9mZnNldCwgZS50YXJnZXQudmFsdWUubGVuZ3RoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGtleU5hbWUgPT0gJzxDLXU+Jykge1xuICAgICAgICAgICAgLy8gQ3RybC1VIGNsZWFycyBpbnB1dC5cbiAgICAgICAgICAgIENvZGVNaXJyb3IuZV9zdG9wKGUpO1xuICAgICAgICAgICAgY2xvc2UoJycpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoa2V5TmFtZSAmJiBrZXlOYW1lICE9ICc8TGVmdD4nICYmIGtleU5hbWUgIT0gJzxSaWdodD4nKSB7XG4gICAgICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLmV4Q29tbWFuZEhpc3RvcnlDb250cm9sbGVyLnJlc2V0KCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb21tYW5kLnR5cGUgPT0gJ2tleVRvRXgnKSB7XG4gICAgICAgICAgLy8gSGFuZGxlIHVzZXIgZGVmaW5lZCBFeCB0byBFeCBtYXBwaW5nc1xuICAgICAgICAgIGV4Q29tbWFuZERpc3BhdGNoZXIucHJvY2Vzc0NvbW1hbmQoY20sIGNvbW1hbmQuZXhBcmdzLmlucHV0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIHNob3dQcm9tcHQoY20sIHsgb25DbG9zZTogb25Qcm9tcHRDbG9zZSwgcHJlZml4OiAnOicsIHZhbHVlOiAnXFwnPCxcXCc+JyxcbiAgICAgICAgICAgICAgICBvbktleURvd246IG9uUHJvbXB0S2V5RG93biwgc2VsZWN0VmFsdWVPbk9wZW46IGZhbHNlfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNob3dQcm9tcHQoY20sIHsgb25DbG9zZTogb25Qcm9tcHRDbG9zZSwgcHJlZml4OiAnOicsXG4gICAgICAgICAgICAgICAgb25LZXlEb3duOiBvblByb21wdEtleURvd259KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBldmFsSW5wdXQ6IGZ1bmN0aW9uKGNtLCB2aW0pIHtcbiAgICAgICAgLy8gSWYgdGhlIG1vdGlvbiBjb21tYW5kIGlzIHNldCwgZXhlY3V0ZSBib3RoIHRoZSBvcGVyYXRvciBhbmQgbW90aW9uLlxuICAgICAgICAvLyBPdGhlcndpc2UgcmV0dXJuLlxuICAgICAgICB2YXIgaW5wdXRTdGF0ZSA9IHZpbS5pbnB1dFN0YXRlO1xuICAgICAgICB2YXIgbW90aW9uID0gaW5wdXRTdGF0ZS5tb3Rpb247XG4gICAgICAgIHZhciBtb3Rpb25BcmdzID0gaW5wdXRTdGF0ZS5tb3Rpb25BcmdzIHx8IHt9O1xuICAgICAgICB2YXIgb3BlcmF0b3IgPSBpbnB1dFN0YXRlLm9wZXJhdG9yO1xuICAgICAgICB2YXIgb3BlcmF0b3JBcmdzID0gaW5wdXRTdGF0ZS5vcGVyYXRvckFyZ3MgfHwge307XG4gICAgICAgIHZhciByZWdpc3Rlck5hbWUgPSBpbnB1dFN0YXRlLnJlZ2lzdGVyTmFtZTtcbiAgICAgICAgdmFyIHNlbCA9IHZpbS5zZWw7XG4gICAgICAgIC8vIFRPRE86IE1ha2Ugc3VyZSBjbSBhbmQgdmltIHNlbGVjdGlvbnMgYXJlIGlkZW50aWNhbCBvdXRzaWRlIHZpc3VhbCBtb2RlLlxuICAgICAgICB2YXIgb3JpZ0hlYWQgPSBjb3B5Q3Vyc29yKHZpbS52aXN1YWxNb2RlID8gY2xpcEN1cnNvclRvQ29udGVudChjbSwgc2VsLmhlYWQpOiBjbS5nZXRDdXJzb3IoJ2hlYWQnKSk7XG4gICAgICAgIHZhciBvcmlnQW5jaG9yID0gY29weUN1cnNvcih2aW0udmlzdWFsTW9kZSA/IGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIHNlbC5hbmNob3IpIDogY20uZ2V0Q3Vyc29yKCdhbmNob3InKSk7XG4gICAgICAgIHZhciBvbGRIZWFkID0gY29weUN1cnNvcihvcmlnSGVhZCk7XG4gICAgICAgIHZhciBvbGRBbmNob3IgPSBjb3B5Q3Vyc29yKG9yaWdBbmNob3IpO1xuICAgICAgICB2YXIgbmV3SGVhZCwgbmV3QW5jaG9yO1xuICAgICAgICB2YXIgcmVwZWF0O1xuICAgICAgICBpZiAob3BlcmF0b3IpIHtcbiAgICAgICAgICB0aGlzLnJlY29yZExhc3RFZGl0KHZpbSwgaW5wdXRTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0U3RhdGUucmVwZWF0T3ZlcnJpZGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIElmIHJlcGVhdE92ZXJyaWRlIGlzIHNwZWNpZmllZCwgdGhhdCB0YWtlcyBwcmVjZWRlbmNlIG92ZXIgdGhlXG4gICAgICAgICAgLy8gaW5wdXQgc3RhdGUncyByZXBlYXQuIFVzZWQgYnkgRXggbW9kZSBhbmQgY2FuIGJlIHVzZXIgZGVmaW5lZC5cbiAgICAgICAgICByZXBlYXQgPSBpbnB1dFN0YXRlLnJlcGVhdE92ZXJyaWRlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcGVhdCA9IGlucHV0U3RhdGUuZ2V0UmVwZWF0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcGVhdCA+IDAgJiYgbW90aW9uQXJncy5leHBsaWNpdFJlcGVhdCkge1xuICAgICAgICAgIG1vdGlvbkFyZ3MucmVwZWF0SXNFeHBsaWNpdCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAobW90aW9uQXJncy5ub1JlcGVhdCB8fFxuICAgICAgICAgICAgKCFtb3Rpb25BcmdzLmV4cGxpY2l0UmVwZWF0ICYmIHJlcGVhdCA9PT0gMCkpIHtcbiAgICAgICAgICByZXBlYXQgPSAxO1xuICAgICAgICAgIG1vdGlvbkFyZ3MucmVwZWF0SXNFeHBsaWNpdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbnB1dFN0YXRlLnNlbGVjdGVkQ2hhcmFjdGVyKSB7XG4gICAgICAgICAgLy8gSWYgdGhlcmUgaXMgYSBjaGFyYWN0ZXIgaW5wdXQsIHN0aWNrIGl0IGluIGFsbCBvZiB0aGUgYXJnIGFycmF5cy5cbiAgICAgICAgICBtb3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyID0gb3BlcmF0b3JBcmdzLnNlbGVjdGVkQ2hhcmFjdGVyID1cbiAgICAgICAgICAgICAgaW5wdXRTdGF0ZS5zZWxlY3RlZENoYXJhY3RlcjtcbiAgICAgICAgfVxuICAgICAgICBtb3Rpb25BcmdzLnJlcGVhdCA9IHJlcGVhdDtcbiAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgaWYgKG1vdGlvbikge1xuICAgICAgICAgIHZhciBtb3Rpb25SZXN1bHQgPSBtb3Rpb25zW21vdGlvbl0oY20sIG9yaWdIZWFkLCBtb3Rpb25BcmdzLCB2aW0sIGlucHV0U3RhdGUpO1xuICAgICAgICAgIHZpbS5sYXN0TW90aW9uID0gbW90aW9uc1ttb3Rpb25dO1xuICAgICAgICAgIGlmICghbW90aW9uUmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtb3Rpb25BcmdzLnRvSnVtcGxpc3QpIHtcbiAgICAgICAgICAgIGlmICghb3BlcmF0b3IgJiYgY20uYWNlLmN1ck9wICE9IG51bGwpXG4gICAgICAgICAgICAgIGNtLmFjZS5jdXJPcC5jb21tYW5kLnNjcm9sbEludG9WaWV3ID0gXCJjZW50ZXItYW5pbWF0ZVwiOyAvLyBhY2VfcGF0Y2hcbiAgICAgICAgICAgIHZhciBqdW1wTGlzdCA9IHZpbUdsb2JhbFN0YXRlLmp1bXBMaXN0O1xuICAgICAgICAgICAgLy8gaWYgdGhlIGN1cnJlbnQgbW90aW9uIGlzICMgb3IgKiwgdXNlIGNhY2hlZEN1cnNvclxuICAgICAgICAgICAgdmFyIGNhY2hlZEN1cnNvciA9IGp1bXBMaXN0LmNhY2hlZEN1cnNvcjtcbiAgICAgICAgICAgIGlmIChjYWNoZWRDdXJzb3IpIHtcbiAgICAgICAgICAgICAgcmVjb3JkSnVtcFBvc2l0aW9uKGNtLCBjYWNoZWRDdXJzb3IsIG1vdGlvblJlc3VsdCk7XG4gICAgICAgICAgICAgIGRlbGV0ZSBqdW1wTGlzdC5jYWNoZWRDdXJzb3I7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZWNvcmRKdW1wUG9zaXRpb24oY20sIG9yaWdIZWFkLCBtb3Rpb25SZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAobW90aW9uUmVzdWx0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIG5ld0FuY2hvciA9IG1vdGlvblJlc3VsdFswXTtcbiAgICAgICAgICAgIG5ld0hlYWQgPSBtb3Rpb25SZXN1bHRbMV07XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0hlYWQgPSBtb3Rpb25SZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFRPRE86IEhhbmRsZSBudWxsIHJldHVybnMgZnJvbSBtb3Rpb24gY29tbWFuZHMgYmV0dGVyLlxuICAgICAgICAgIGlmICghbmV3SGVhZCkge1xuICAgICAgICAgICAgbmV3SGVhZCA9IGNvcHlDdXJzb3Iob3JpZ0hlYWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIGlmICghKHZpbS52aXN1YWxCbG9jayAmJiBuZXdIZWFkLmNoID09PSBJbmZpbml0eSkpIHtcbiAgICAgICAgICAgICAgbmV3SGVhZCA9IGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIG5ld0hlYWQsIG9sZEhlYWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG5ld0FuY2hvcikge1xuICAgICAgICAgICAgICBuZXdBbmNob3IgPSBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBuZXdBbmNob3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmV3QW5jaG9yID0gbmV3QW5jaG9yIHx8IG9sZEFuY2hvcjtcbiAgICAgICAgICAgIHNlbC5hbmNob3IgPSBuZXdBbmNob3I7XG4gICAgICAgICAgICBzZWwuaGVhZCA9IG5ld0hlYWQ7XG4gICAgICAgICAgICB1cGRhdGVDbVNlbGVjdGlvbihjbSk7XG4gICAgICAgICAgICB1cGRhdGVNYXJrKGNtLCB2aW0sICc8JyxcbiAgICAgICAgICAgICAgICBjdXJzb3JJc0JlZm9yZShuZXdBbmNob3IsIG5ld0hlYWQpID8gbmV3QW5jaG9yXG4gICAgICAgICAgICAgICAgICAgIDogbmV3SGVhZCk7XG4gICAgICAgICAgICB1cGRhdGVNYXJrKGNtLCB2aW0sICc+JyxcbiAgICAgICAgICAgICAgICBjdXJzb3JJc0JlZm9yZShuZXdBbmNob3IsIG5ld0hlYWQpID8gbmV3SGVhZFxuICAgICAgICAgICAgICAgICAgICA6IG5ld0FuY2hvcik7XG4gICAgICAgICAgfSBlbHNlIGlmICghb3BlcmF0b3IpIHtcbiAgICAgICAgICAgIGlmIChjbS5hY2UuY3VyT3ApXG4gICAgICAgICAgICAgIGNtLmFjZS5jdXJPcC52aW1EaWFsb2dTY3JvbGwgPSBcImNlbnRlci1hbmltYXRlXCI7IC8vIGFjZV9wYXRjaFxuICAgICAgICAgICAgbmV3SGVhZCA9IGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIG5ld0hlYWQsIG9sZEhlYWQpO1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKG5ld0hlYWQubGluZSwgbmV3SGVhZC5jaCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChvcGVyYXRvcikge1xuICAgICAgICAgIGlmIChvcGVyYXRvckFyZ3MubGFzdFNlbCkge1xuICAgICAgICAgICAgLy8gUmVwbGF5aW5nIGEgdmlzdWFsIG1vZGUgb3BlcmF0aW9uXG4gICAgICAgICAgICBuZXdBbmNob3IgPSBvbGRBbmNob3I7XG4gICAgICAgICAgICB2YXIgbGFzdFNlbCA9IG9wZXJhdG9yQXJncy5sYXN0U2VsO1xuICAgICAgICAgICAgdmFyIGxpbmVPZmZzZXQgPSBNYXRoLmFicyhsYXN0U2VsLmhlYWQubGluZSAtIGxhc3RTZWwuYW5jaG9yLmxpbmUpO1xuICAgICAgICAgICAgdmFyIGNoT2Zmc2V0ID0gTWF0aC5hYnMobGFzdFNlbC5oZWFkLmNoIC0gbGFzdFNlbC5hbmNob3IuY2gpO1xuICAgICAgICAgICAgaWYgKGxhc3RTZWwudmlzdWFsTGluZSkge1xuICAgICAgICAgICAgICAvLyBMaW5ld2lzZSBWaXN1YWwgbW9kZTogVGhlIHNhbWUgbnVtYmVyIG9mIGxpbmVzLlxuICAgICAgICAgICAgICBuZXdIZWFkID0gbmV3IFBvcyhvbGRBbmNob3IubGluZSArIGxpbmVPZmZzZXQsIG9sZEFuY2hvci5jaCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxhc3RTZWwudmlzdWFsQmxvY2spIHtcbiAgICAgICAgICAgICAgLy8gQmxvY2t3aXNlIFZpc3VhbCBtb2RlOiBUaGUgc2FtZSBudW1iZXIgb2YgbGluZXMgYW5kIGNvbHVtbnMuXG4gICAgICAgICAgICAgIG5ld0hlYWQgPSBuZXcgUG9zKG9sZEFuY2hvci5saW5lICsgbGluZU9mZnNldCwgb2xkQW5jaG9yLmNoICsgY2hPZmZzZXQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChsYXN0U2VsLmhlYWQubGluZSA9PSBsYXN0U2VsLmFuY2hvci5saW5lKSB7XG4gICAgICAgICAgICAgIC8vIE5vcm1hbCBWaXN1YWwgbW9kZSB3aXRoaW4gb25lIGxpbmU6IFRoZSBzYW1lIG51bWJlciBvZiBjaGFyYWN0ZXJzLlxuICAgICAgICAgICAgICBuZXdIZWFkID0gbmV3IFBvcyhvbGRBbmNob3IubGluZSwgb2xkQW5jaG9yLmNoICsgY2hPZmZzZXQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gTm9ybWFsIFZpc3VhbCBtb2RlIHdpdGggc2V2ZXJhbCBsaW5lczogVGhlIHNhbWUgbnVtYmVyIG9mIGxpbmVzLCBpbiB0aGVcbiAgICAgICAgICAgICAgLy8gbGFzdCBsaW5lIHRoZSBzYW1lIG51bWJlciBvZiBjaGFyYWN0ZXJzIGFzIGluIHRoZSBsYXN0IGxpbmUgdGhlIGxhc3QgdGltZS5cbiAgICAgICAgICAgICAgbmV3SGVhZCA9IG5ldyBQb3Mob2xkQW5jaG9yLmxpbmUgKyBsaW5lT2Zmc2V0LCBvbGRBbmNob3IuY2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmltLnZpc3VhbE1vZGUgPSB0cnVlO1xuICAgICAgICAgICAgdmltLnZpc3VhbExpbmUgPSBsYXN0U2VsLnZpc3VhbExpbmU7XG4gICAgICAgICAgICB2aW0udmlzdWFsQmxvY2sgPSBsYXN0U2VsLnZpc3VhbEJsb2NrO1xuICAgICAgICAgICAgc2VsID0gdmltLnNlbCA9IHtcbiAgICAgICAgICAgICAgYW5jaG9yOiBuZXdBbmNob3IsXG4gICAgICAgICAgICAgIGhlYWQ6IG5ld0hlYWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB1cGRhdGVDbVNlbGVjdGlvbihjbSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgb3BlcmF0b3JBcmdzLmxhc3RTZWwgPSB7XG4gICAgICAgICAgICAgIGFuY2hvcjogY29weUN1cnNvcihzZWwuYW5jaG9yKSxcbiAgICAgICAgICAgICAgaGVhZDogY29weUN1cnNvcihzZWwuaGVhZCksXG4gICAgICAgICAgICAgIHZpc3VhbEJsb2NrOiB2aW0udmlzdWFsQmxvY2ssXG4gICAgICAgICAgICAgIHZpc3VhbExpbmU6IHZpbS52aXN1YWxMaW5lXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgY3VyU3RhcnQsIGN1ckVuZCwgbGluZXdpc2UsIG1vZGU7XG4gICAgICAgICAgdmFyIGNtU2VsO1xuICAgICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgLy8gSW5pdCB2aXN1YWwgb3BcbiAgICAgICAgICAgIGN1clN0YXJ0ID0gY3Vyc29yTWluKHNlbC5oZWFkLCBzZWwuYW5jaG9yKTtcbiAgICAgICAgICAgIGN1ckVuZCA9IGN1cnNvck1heChzZWwuaGVhZCwgc2VsLmFuY2hvcik7XG4gICAgICAgICAgICBsaW5ld2lzZSA9IHZpbS52aXN1YWxMaW5lIHx8IG9wZXJhdG9yQXJncy5saW5ld2lzZTtcbiAgICAgICAgICAgIG1vZGUgPSB2aW0udmlzdWFsQmxvY2sgPyAnYmxvY2snIDpcbiAgICAgICAgICAgICAgICAgICBsaW5ld2lzZSA/ICdsaW5lJyA6XG4gICAgICAgICAgICAgICAgICAgJ2NoYXInO1xuICAgICAgICAgICAgdmFyIG5ld1Bvc2l0aW9ucyA9IHVwZGF0ZVNlbGVjdGlvbkZvclN1cnJvZ2F0ZUNoYXJhY3RlcnMoY20sIGN1clN0YXJ0LCBjdXJFbmQpO1xuICAgICAgICAgICAgY21TZWwgPSBtYWtlQ21TZWxlY3Rpb24oY20sIHtcbiAgICAgICAgICAgICAgYW5jaG9yOiBuZXdQb3NpdGlvbnMuc3RhcnQsXG4gICAgICAgICAgICAgIGhlYWQ6IG5ld1Bvc2l0aW9ucy5lbmRcbiAgICAgICAgICAgIH0sIG1vZGUpO1xuICAgICAgICAgICAgaWYgKGxpbmV3aXNlKSB7XG4gICAgICAgICAgICAgIHZhciByYW5nZXMgPSBjbVNlbC5yYW5nZXM7XG4gICAgICAgICAgICAgIGlmIChtb2RlID09ICdibG9jaycpIHtcbiAgICAgICAgICAgICAgICAvLyBMaW5ld2lzZSBvcGVyYXRvcnMgaW4gdmlzdWFsIGJsb2NrIG1vZGUgZXh0ZW5kIHRvIGVuZCBvZiBsaW5lXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIHJhbmdlc1tpXS5oZWFkLmNoID0gbGluZUxlbmd0aChjbSwgcmFuZ2VzW2ldLmhlYWQubGluZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKG1vZGUgPT0gJ2xpbmUnKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2VzWzBdLmhlYWQgPSBuZXcgUG9zKHJhbmdlc1swXS5oZWFkLmxpbmUgKyAxLCAwKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJbml0IG1vdGlvbiBvcFxuICAgICAgICAgICAgY3VyU3RhcnQgPSBjb3B5Q3Vyc29yKG5ld0FuY2hvciB8fCBvbGRBbmNob3IpO1xuICAgICAgICAgICAgY3VyRW5kID0gY29weUN1cnNvcihuZXdIZWFkIHx8IG9sZEhlYWQpO1xuICAgICAgICAgICAgaWYgKGN1cnNvcklzQmVmb3JlKGN1ckVuZCwgY3VyU3RhcnQpKSB7XG4gICAgICAgICAgICAgIHZhciB0bXAgPSBjdXJTdGFydDtcbiAgICAgICAgICAgICAgY3VyU3RhcnQgPSBjdXJFbmQ7XG4gICAgICAgICAgICAgIGN1ckVuZCA9IHRtcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxpbmV3aXNlID0gbW90aW9uQXJncy5saW5ld2lzZSB8fCBvcGVyYXRvckFyZ3MubGluZXdpc2U7XG4gICAgICAgICAgICBpZiAobGluZXdpc2UpIHtcbiAgICAgICAgICAgICAgLy8gRXhwYW5kIHNlbGVjdGlvbiB0byBlbnRpcmUgbGluZS5cbiAgICAgICAgICAgICAgZXhwYW5kU2VsZWN0aW9uVG9MaW5lKGNtLCBjdXJTdGFydCwgY3VyRW5kKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobW90aW9uQXJncy5mb3J3YXJkKSB7XG4gICAgICAgICAgICAgIC8vIENsaXAgdG8gdHJhaWxpbmcgbmV3bGluZXMgb25seSBpZiB0aGUgbW90aW9uIGdvZXMgZm9yd2FyZC5cbiAgICAgICAgICAgICAgY2xpcFRvTGluZShjbSwgY3VyU3RhcnQsIGN1ckVuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtb2RlID0gJ2NoYXInO1xuICAgICAgICAgICAgdmFyIGV4Y2x1c2l2ZSA9ICFtb3Rpb25BcmdzLmluY2x1c2l2ZSB8fCBsaW5ld2lzZTtcbiAgICAgICAgICAgIHZhciBuZXdQb3NpdGlvbnMgPSB1cGRhdGVTZWxlY3Rpb25Gb3JTdXJyb2dhdGVDaGFyYWN0ZXJzKGNtLCBjdXJTdGFydCwgY3VyRW5kKTtcbiAgICAgICAgICAgIGNtU2VsID0gbWFrZUNtU2VsZWN0aW9uKGNtLCB7XG4gICAgICAgICAgICAgIGFuY2hvcjogbmV3UG9zaXRpb25zLnN0YXJ0LFxuICAgICAgICAgICAgICBoZWFkOiBuZXdQb3NpdGlvbnMuZW5kXG4gICAgICAgICAgICB9LCBtb2RlLCBleGNsdXNpdmUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjbS5zZXRTZWxlY3Rpb25zKGNtU2VsLnJhbmdlcywgY21TZWwucHJpbWFyeSk7XG4gICAgICAgICAgdmltLmxhc3RNb3Rpb24gPSBudWxsO1xuICAgICAgICAgIG9wZXJhdG9yQXJncy5yZXBlYXQgPSByZXBlYXQ7IC8vIEZvciBpbmRlbnQgaW4gdmlzdWFsIG1vZGUuXG4gICAgICAgICAgb3BlcmF0b3JBcmdzLnJlZ2lzdGVyTmFtZSA9IHJlZ2lzdGVyTmFtZTtcbiAgICAgICAgICAvLyBLZWVwIHRyYWNrIG9mIGxpbmV3aXNlIGFzIGl0IGFmZmVjdHMgaG93IHBhc3RlIGFuZCBjaGFuZ2UgYmVoYXZlLlxuICAgICAgICAgIG9wZXJhdG9yQXJncy5saW5ld2lzZSA9IGxpbmV3aXNlO1xuICAgICAgICAgIHZhciBvcGVyYXRvck1vdmVUbyA9IG9wZXJhdG9yc1tvcGVyYXRvcl0oXG4gICAgICAgICAgICBjbSwgb3BlcmF0b3JBcmdzLCBjbVNlbC5yYW5nZXMsIG9sZEFuY2hvciwgbmV3SGVhZCk7XG4gICAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICBleGl0VmlzdWFsTW9kZShjbSwgb3BlcmF0b3JNb3ZlVG8gIT0gbnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChvcGVyYXRvck1vdmVUbykge1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKG9wZXJhdG9yTW92ZVRvKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZWNvcmRMYXN0RWRpdDogZnVuY3Rpb24odmltLCBpbnB1dFN0YXRlLCBhY3Rpb25Db21tYW5kKSB7XG4gICAgICAgIHZhciBtYWNyb01vZGVTdGF0ZSA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlO1xuICAgICAgICBpZiAobWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nKSB7IHJldHVybjsgfVxuICAgICAgICB2aW0ubGFzdEVkaXRJbnB1dFN0YXRlID0gaW5wdXRTdGF0ZTtcbiAgICAgICAgdmltLmxhc3RFZGl0QWN0aW9uQ29tbWFuZCA9IGFjdGlvbkNvbW1hbmQ7XG4gICAgICAgIG1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcy5jaGFuZ2VzID0gW107XG4gICAgICAgIG1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcy5leHBlY3RDdXJzb3JBY3Rpdml0eUZvckNoYW5nZSA9IGZhbHNlO1xuICAgICAgICBtYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXMudmlzdWFsQmxvY2sgPSB2aW0udmlzdWFsQmxvY2sgPyB2aW0uc2VsLmhlYWQubGluZSAtIHZpbS5zZWwuYW5jaG9yLmxpbmUgOiAwO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiB0eXBlZGVmIHtPYmplY3R7bGluZTpudW1iZXIsY2g6bnVtYmVyfX0gQ3Vyc29yIEFuIG9iamVjdCBjb250YWluaW5nIHRoZVxuICAgICAqICAgICBwb3NpdGlvbiBvZiB0aGUgY3Vyc29yLlxuICAgICAqL1xuICAgIC8vIEFsbCBvZiB0aGUgZnVuY3Rpb25zIGJlbG93IHJldHVybiBDdXJzb3Igb2JqZWN0cy5cbiAgICB2YXIgbW90aW9ucyA9IHtcbiAgICAgIG1vdmVUb1RvcExpbmU6IGZ1bmN0aW9uKGNtLCBfaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgbGluZSA9IGdldFVzZXJWaXNpYmxlTGluZXMoY20pLnRvcCArIG1vdGlvbkFyZ3MucmVwZWF0IC0xO1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhsaW5lLCBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUobGluZSkpKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlVG9NaWRkbGVMaW5lOiBmdW5jdGlvbihjbSkge1xuICAgICAgICB2YXIgcmFuZ2UgPSBnZXRVc2VyVmlzaWJsZUxpbmVzKGNtKTtcbiAgICAgICAgdmFyIGxpbmUgPSBNYXRoLmZsb29yKChyYW5nZS50b3AgKyByYW5nZS5ib3R0b20pICogMC41KTtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MobGluZSwgZmluZEZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbS5nZXRMaW5lKGxpbmUpKSk7XG4gICAgICB9LFxuICAgICAgbW92ZVRvQm90dG9tTGluZTogZnVuY3Rpb24oY20sIF9oZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciBsaW5lID0gZ2V0VXNlclZpc2libGVMaW5lcyhjbSkuYm90dG9tIC0gbW90aW9uQXJncy5yZXBlYXQgKzE7XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGxpbmUsIGZpbmRGaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20uZ2V0TGluZShsaW5lKSkpO1xuICAgICAgfSxcbiAgICAgIGV4cGFuZFRvTGluZTogZnVuY3Rpb24oX2NtLCBoZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIC8vIEV4cGFuZHMgZm9yd2FyZCB0byBlbmQgb2YgbGluZSwgYW5kIHRoZW4gdG8gbmV4dCBsaW5lIGlmIHJlcGVhdCBpc1xuICAgICAgICAvLyA+MS4gRG9lcyBub3QgaGFuZGxlIGJhY2t3YXJkIG1vdGlvbiFcbiAgICAgICAgdmFyIGN1ciA9IGhlYWQ7XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGN1ci5saW5lICsgbW90aW9uQXJncy5yZXBlYXQgLSAxLCBJbmZpbml0eSk7XG4gICAgICB9LFxuICAgICAgZmluZE5leHQ6IGZ1bmN0aW9uKGNtLCBfaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgc3RhdGUgPSBnZXRTZWFyY2hTdGF0ZShjbSk7XG4gICAgICAgIHZhciBxdWVyeSA9IHN0YXRlLmdldFF1ZXJ5KCk7XG4gICAgICAgIGlmICghcXVlcnkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZXYgPSAhbW90aW9uQXJncy5mb3J3YXJkO1xuICAgICAgICAvLyBJZiBzZWFyY2ggaXMgaW5pdGlhdGVkIHdpdGggPyBpbnN0ZWFkIG9mIC8sIG5lZ2F0ZSBkaXJlY3Rpb24uXG4gICAgICAgIHByZXYgPSAoc3RhdGUuaXNSZXZlcnNlZCgpKSA/ICFwcmV2IDogcHJldjtcbiAgICAgICAgaGlnaGxpZ2h0U2VhcmNoTWF0Y2hlcyhjbSwgcXVlcnkpO1xuICAgICAgICByZXR1cm4gZmluZE5leHQoY20sIHByZXYvKiogcHJldiAqLywgcXVlcnksIG1vdGlvbkFyZ3MucmVwZWF0KTtcbiAgICAgIH0sXG4gICAgICAvKipcbiAgICAgICAqIEZpbmQgYW5kIHNlbGVjdCB0aGUgbmV4dCBvY2N1cnJlbmNlIG9mIHRoZSBzZWFyY2ggcXVlcnkuIElmIHRoZSBjdXJzb3IgaXMgY3VycmVudGx5XG4gICAgICAgKiB3aXRoaW4gYSBtYXRjaCwgdGhlbiBmaW5kIGFuZCBzZWxlY3QgdGhlIGN1cnJlbnQgbWF0Y2guIE90aGVyd2lzZSwgZmluZCB0aGUgbmV4dCBvY2N1cnJlbmNlIGluIHRoZVxuICAgICAgICogYXBwcm9wcmlhdGUgZGlyZWN0aW9uLlxuICAgICAgICpcbiAgICAgICAqIFRoaXMgZGlmZmVycyBmcm9tIGBmaW5kTmV4dGAgaW4gdGhlIGZvbGxvd2luZyB3YXlzOlxuICAgICAgICpcbiAgICAgICAqIDEuIEluc3RlYWQgb2Ygb25seSByZXR1cm5pbmcgdGhlIFwiZnJvbVwiLCB0aGlzIHJldHVybnMgYSBcImZyb21cIiwgXCJ0b1wiIHJhbmdlLlxuICAgICAgICogMi4gSWYgdGhlIGN1cnNvciBpcyBjdXJyZW50bHkgaW5zaWRlIGEgc2VhcmNoIG1hdGNoLCB0aGlzIHNlbGVjdHMgdGhlIGN1cnJlbnQgbWF0Y2hcbiAgICAgICAqICAgIGluc3RlYWQgb2YgdGhlIG5leHQgbWF0Y2guXG4gICAgICAgKiAzLiBJZiB0aGVyZSBpcyBubyBhc3NvY2lhdGVkIG9wZXJhdG9yLCB0aGlzIHdpbGwgdHVybiBvbiB2aXN1YWwgbW9kZS5cbiAgICAgICAqL1xuICAgICAgZmluZEFuZFNlbGVjdE5leHRJbmNsdXNpdmU6IGZ1bmN0aW9uKGNtLCBfaGVhZCwgbW90aW9uQXJncywgdmltLCBwcmV2SW5wdXRTdGF0ZSkge1xuICAgICAgICB2YXIgc3RhdGUgPSBnZXRTZWFyY2hTdGF0ZShjbSk7XG4gICAgICAgIHZhciBxdWVyeSA9IHN0YXRlLmdldFF1ZXJ5KCk7XG5cbiAgICAgICAgaWYgKCFxdWVyeSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwcmV2ID0gIW1vdGlvbkFyZ3MuZm9yd2FyZDtcbiAgICAgICAgcHJldiA9IChzdGF0ZS5pc1JldmVyc2VkKCkpID8gIXByZXYgOiBwcmV2O1xuXG4gICAgICAgIC8vIG5leHQ6IFtmcm9tLCB0b10gfCBudWxsXG4gICAgICAgIHZhciBuZXh0ID0gZmluZE5leHRGcm9tQW5kVG9JbmNsdXNpdmUoY20sIHByZXYsIHF1ZXJ5LCBtb3Rpb25BcmdzLnJlcGVhdCwgdmltKTtcblxuICAgICAgICAvLyBObyBtYXRjaGVzLlxuICAgICAgICBpZiAoIW5leHQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiB0aGVyZSdzIGFuIG9wZXJhdG9yIHRoYXQgd2lsbCBiZSBleGVjdXRlZCwgcmV0dXJuIHRoZSBzZWxlY3Rpb24uXG4gICAgICAgIGlmIChwcmV2SW5wdXRTdGF0ZS5vcGVyYXRvcikge1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXQgdGhpcyBwb2ludCwgd2Uga25vdyB0aGF0IHRoZXJlIGlzIG5vIGFjY29tcGFueWluZyBvcGVyYXRvciAtLSBsZXQnc1xuICAgICAgICAvLyBkZWFsIHdpdGggdmlzdWFsIG1vZGUgaW4gb3JkZXIgdG8gc2VsZWN0IGFuIGFwcHJvcHJpYXRlIG1hdGNoLlxuXG4gICAgICAgIHZhciBmcm9tID0gbmV4dFswXTtcbiAgICAgICAgLy8gRm9yIHdoYXRldmVyIHJlYXNvbiwgd2hlbiB3ZSB1c2UgdGhlIFwidG9cIiBhcyByZXR1cm5lZCBieSBzZWFyY2hjdXJzb3IuanMgZGlyZWN0bHksXG4gICAgICAgIC8vIHRoZSByZXN1bHRpbmcgc2VsZWN0aW9uIGlzIGV4dGVuZGVkIGJ5IDEgY2hhci4gTGV0J3Mgc2hyaW5rIGl0IHNvIHRoYXQgb25seSB0aGVcbiAgICAgICAgLy8gbWF0Y2ggaXMgc2VsZWN0ZWQuXG4gICAgICAgIHZhciB0byA9IG5ldyBQb3MobmV4dFsxXS5saW5lLCBuZXh0WzFdLmNoIC0gMSk7XG5cbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgLy8gSWYgd2Ugd2VyZSBpbiB2aXN1YWxMaW5lIG9yIHZpc3VhbEJsb2NrIG1vZGUsIGdldCBvdXQgb2YgaXQuXG4gICAgICAgICAgaWYgKHZpbS52aXN1YWxMaW5lIHx8IHZpbS52aXN1YWxCbG9jaykge1xuICAgICAgICAgICAgdmltLnZpc3VhbExpbmUgPSBmYWxzZTtcbiAgICAgICAgICAgIHZpbS52aXN1YWxCbG9jayA9IGZhbHNlO1xuICAgICAgICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sIFwidmltLW1vZGUtY2hhbmdlXCIsIHttb2RlOiBcInZpc3VhbFwiLCBzdWJNb2RlOiBcIlwifSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gSWYgd2UncmUgY3VycmVudGx5IGluIHZpc3VhbCBtb2RlLCB3ZSBzaG91bGQgZXh0ZW5kIHRoZSBzZWxlY3Rpb24gdG8gaW5jbHVkZVxuICAgICAgICAgIC8vIHRoZSBzZWFyY2ggcmVzdWx0LlxuICAgICAgICAgIHZhciBhbmNob3IgPSB2aW0uc2VsLmFuY2hvcjtcbiAgICAgICAgICBpZiAoYW5jaG9yKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUuaXNSZXZlcnNlZCgpKSB7XG4gICAgICAgICAgICAgIGlmIChtb3Rpb25BcmdzLmZvcndhcmQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW2FuY2hvciwgZnJvbV07XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gW2FuY2hvciwgdG9dO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKG1vdGlvbkFyZ3MuZm9yd2FyZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbYW5jaG9yLCB0b107XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gW2FuY2hvciwgZnJvbV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIExldCdzIHR1cm4gdmlzdWFsIG1vZGUgb24uXG4gICAgICAgICAgdmltLnZpc3VhbE1vZGUgPSB0cnVlO1xuICAgICAgICAgIHZpbS52aXN1YWxMaW5lID0gZmFsc2U7XG4gICAgICAgICAgdmltLnZpc3VhbEJsb2NrID0gZmFsc2U7XG4gICAgICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sIFwidmltLW1vZGUtY2hhbmdlXCIsIHttb2RlOiBcInZpc3VhbFwiLCBzdWJNb2RlOiBcIlwifSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcHJldiA/IFt0bywgZnJvbV0gOiBbZnJvbSwgdG9dO1xuICAgICAgfSxcbiAgICAgIGdvVG9NYXJrOiBmdW5jdGlvbihjbSwgX2hlYWQsIG1vdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgcG9zID0gZ2V0TWFya1BvcyhjbSwgdmltLCBtb3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyKTtcbiAgICAgICAgaWYgKHBvcykge1xuICAgICAgICAgIHJldHVybiBtb3Rpb25BcmdzLmxpbmV3aXNlID8geyBsaW5lOiBwb3MubGluZSwgY2g6IGZpbmRGaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20uZ2V0TGluZShwb3MubGluZSkpIH0gOiBwb3M7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9LFxuICAgICAgbW92ZVRvT3RoZXJIaWdobGlnaHRlZEVuZDogZnVuY3Rpb24oY20sIF9oZWFkLCBtb3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxCbG9jayAmJiBtb3Rpb25BcmdzLnNhbWVMaW5lKSB7XG4gICAgICAgICAgdmFyIHNlbCA9IHZpbS5zZWw7XG4gICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIG5ldyBQb3Moc2VsLmFuY2hvci5saW5lLCBzZWwuaGVhZC5jaCkpLFxuICAgICAgICAgICAgY2xpcEN1cnNvclRvQ29udGVudChjbSwgbmV3IFBvcyhzZWwuaGVhZC5saW5lLCBzZWwuYW5jaG9yLmNoKSlcbiAgICAgICAgICBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAoW3ZpbS5zZWwuaGVhZCwgdmltLnNlbC5hbmNob3JdKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGp1bXBUb01hcms6IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIGJlc3QgPSBoZWFkO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vdGlvbkFyZ3MucmVwZWF0OyBpKyspIHtcbiAgICAgICAgICB2YXIgY3Vyc29yID0gYmVzdDtcbiAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdmltLm1hcmtzKSB7XG4gICAgICAgICAgICBpZiAoIWlzTG93ZXJDYXNlKGtleSkpIHtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWFyayA9IHZpbS5tYXJrc1trZXldLmZpbmQoKTtcbiAgICAgICAgICAgIHZhciBpc1dyb25nRGlyZWN0aW9uID0gKG1vdGlvbkFyZ3MuZm9yd2FyZCkgP1xuICAgICAgICAgICAgICBjdXJzb3JJc0JlZm9yZShtYXJrLCBjdXJzb3IpIDogY3Vyc29ySXNCZWZvcmUoY3Vyc29yLCBtYXJrKTtcblxuICAgICAgICAgICAgaWYgKGlzV3JvbmdEaXJlY3Rpb24pIHtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobW90aW9uQXJncy5saW5ld2lzZSAmJiAobWFyay5saW5lID09IGN1cnNvci5saW5lKSkge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGVxdWFsID0gY3Vyc29yRXF1YWwoY3Vyc29yLCBiZXN0KTtcbiAgICAgICAgICAgIHZhciBiZXR3ZWVuID0gKG1vdGlvbkFyZ3MuZm9yd2FyZCkgP1xuICAgICAgICAgICAgICBjdXJzb3JJc0JldHdlZW4oY3Vyc29yLCBtYXJrLCBiZXN0KSA6XG4gICAgICAgICAgICAgIGN1cnNvcklzQmV0d2VlbihiZXN0LCBtYXJrLCBjdXJzb3IpO1xuXG4gICAgICAgICAgICBpZiAoZXF1YWwgfHwgYmV0d2Vlbikge1xuICAgICAgICAgICAgICBiZXN0ID0gbWFyaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW90aW9uQXJncy5saW5ld2lzZSkge1xuICAgICAgICAgIC8vIFZpbSBwbGFjZXMgdGhlIGN1cnNvciBvbiB0aGUgZmlyc3Qgbm9uLXdoaXRlc3BhY2UgY2hhcmFjdGVyIG9mXG4gICAgICAgICAgLy8gdGhlIGxpbmUgaWYgdGhlcmUgaXMgb25lLCBlbHNlIGl0IHBsYWNlcyB0aGUgY3Vyc29yIGF0IHRoZSBlbmRcbiAgICAgICAgICAvLyBvZiB0aGUgbGluZSwgcmVnYXJkbGVzcyBvZiB3aGV0aGVyIGEgbWFyayB3YXMgZm91bmQuXG4gICAgICAgICAgYmVzdCA9IG5ldyBQb3MoYmVzdC5saW5lLCBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUoYmVzdC5saW5lKSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBiZXN0O1xuICAgICAgfSxcbiAgICAgIG1vdmVCeUNoYXJhY3RlcnM6IGZ1bmN0aW9uKF9jbSwgaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgY3VyID0gaGVhZDtcbiAgICAgICAgdmFyIHJlcGVhdCA9IG1vdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICB2YXIgY2ggPSBtb3Rpb25BcmdzLmZvcndhcmQgPyBjdXIuY2ggKyByZXBlYXQgOiBjdXIuY2ggLSByZXBlYXQ7XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGN1ci5saW5lLCBjaCk7XG4gICAgICB9LFxuICAgICAgbW92ZUJ5TGluZXM6IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIGN1ciA9IGhlYWQ7XG4gICAgICAgIHZhciBlbmRDaCA9IGN1ci5jaDtcbiAgICAgICAgLy8gRGVwZW5kaW5nIHdoYXQgb3VyIGxhc3QgbW90aW9uIHdhcywgd2UgbWF5IHdhbnQgdG8gZG8gZGlmZmVyZW50XG4gICAgICAgIC8vIHRoaW5ncy4gSWYgb3VyIGxhc3QgbW90aW9uIHdhcyBtb3ZpbmcgdmVydGljYWxseSwgd2Ugd2FudCB0b1xuICAgICAgICAvLyBwcmVzZXJ2ZSB0aGUgSFBvcyBmcm9tIG91ciBsYXN0IGhvcml6b250YWwgbW92ZS4gIElmIG91ciBsYXN0IG1vdGlvblxuICAgICAgICAvLyB3YXMgZ29pbmcgdG8gdGhlIGVuZCBvZiBhIGxpbmUsIG1vdmluZyB2ZXJ0aWNhbGx5IHdlIHNob3VsZCBnbyB0b1xuICAgICAgICAvLyB0aGUgZW5kIG9mIHRoZSBsaW5lLCBldGMuXG4gICAgICAgIHN3aXRjaCAodmltLmxhc3RNb3Rpb24pIHtcbiAgICAgICAgICBjYXNlIHRoaXMubW92ZUJ5TGluZXM6XG4gICAgICAgICAgY2FzZSB0aGlzLm1vdmVCeURpc3BsYXlMaW5lczpcbiAgICAgICAgICBjYXNlIHRoaXMubW92ZUJ5U2Nyb2xsOlxuICAgICAgICAgIGNhc2UgdGhpcy5tb3ZlVG9Db2x1bW46XG4gICAgICAgICAgY2FzZSB0aGlzLm1vdmVUb0VvbDpcbiAgICAgICAgICAgIGVuZENoID0gdmltLmxhc3RIUG9zO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZpbS5sYXN0SFBvcyA9IGVuZENoO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdCsobW90aW9uQXJncy5yZXBlYXRPZmZzZXR8fDApO1xuICAgICAgICB2YXIgbGluZSA9IG1vdGlvbkFyZ3MuZm9yd2FyZCA/IGN1ci5saW5lICsgcmVwZWF0IDogY3VyLmxpbmUgLSByZXBlYXQ7XG4gICAgICAgIHZhciBmaXJzdCA9IGNtLmZpcnN0TGluZSgpO1xuICAgICAgICB2YXIgbGFzdCA9IGNtLmxhc3RMaW5lKCk7XG4gICAgICAgIC8vIFZpbSBnbyB0byBsaW5lIGJlZ2luIG9yIGxpbmUgZW5kIHdoZW4gY3Vyc29yIGF0IGZpcnN0L2xhc3QgbGluZSBhbmRcbiAgICAgICAgLy8gbW92ZSB0byBwcmV2aW91cy9uZXh0IGxpbmUgaXMgdHJpZ2dlcmVkLlxuICAgICAgICBpZiAobGluZSA8IGZpcnN0ICYmIGN1ci5saW5lID09IGZpcnN0KXtcbiAgICAgICAgICByZXR1cm4gdGhpcy5tb3ZlVG9TdGFydE9mTGluZShjbSwgaGVhZCwgbW90aW9uQXJncywgdmltKTtcbiAgICAgICAgfSBlbHNlIGlmIChsaW5lID4gbGFzdCAmJiBjdXIubGluZSA9PSBsYXN0KXtcbiAgICAgICAgICAgIHJldHVybiBtb3ZlVG9Fb2woY20sIGhlYWQsIG1vdGlvbkFyZ3MsIHZpbSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gYWNlX3BhdGNoe1xuICAgICAgICB2YXIgZm9sZCA9IGNtLmFjZS5zZXNzaW9uLmdldEZvbGRMaW5lKGxpbmUpO1xuICAgICAgICBpZiAoZm9sZCkge1xuICAgICAgICAgIGlmIChtb3Rpb25BcmdzLmZvcndhcmQpIHtcbiAgICAgICAgICAgIGlmIChsaW5lID4gZm9sZC5zdGFydC5yb3cpXG4gICAgICAgICAgICAgIGxpbmUgPSBmb2xkLmVuZC5yb3cgKyAxO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaW5lID0gZm9sZC5zdGFydC5yb3c7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGFjZV9wYXRjaH1cbiAgICAgICAgaWYgKG1vdGlvbkFyZ3MudG9GaXJzdENoYXIpe1xuICAgICAgICAgIGVuZENoPWZpbmRGaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20uZ2V0TGluZShsaW5lKSk7XG4gICAgICAgICAgdmltLmxhc3RIUG9zID0gZW5kQ2g7XG4gICAgICAgIH1cbiAgICAgICAgdmltLmxhc3RIU1BvcyA9IGNtLmNoYXJDb29yZHMobmV3IFBvcyhsaW5lLCBlbmRDaCksJ2RpdicpLmxlZnQ7XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGxpbmUsIGVuZENoKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlQnlEaXNwbGF5TGluZXM6IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIGN1ciA9IGhlYWQ7XG4gICAgICAgIHN3aXRjaCAodmltLmxhc3RNb3Rpb24pIHtcbiAgICAgICAgICBjYXNlIHRoaXMubW92ZUJ5RGlzcGxheUxpbmVzOlxuICAgICAgICAgIGNhc2UgdGhpcy5tb3ZlQnlTY3JvbGw6XG4gICAgICAgICAgY2FzZSB0aGlzLm1vdmVCeUxpbmVzOlxuICAgICAgICAgIGNhc2UgdGhpcy5tb3ZlVG9Db2x1bW46XG4gICAgICAgICAgY2FzZSB0aGlzLm1vdmVUb0VvbDpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2aW0ubGFzdEhTUG9zID0gY20uY2hhckNvb3JkcyhjdXIsJ2RpdicpLmxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlcGVhdCA9IG1vdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICB2YXIgcmVzPWNtLmZpbmRQb3NWKGN1ciwobW90aW9uQXJncy5mb3J3YXJkID8gcmVwZWF0IDogLXJlcGVhdCksJ2xpbmUnLHZpbS5sYXN0SFNQb3MpO1xuICAgICAgICBpZiAocmVzLmhpdFNpZGUpIHtcbiAgICAgICAgICBpZiAobW90aW9uQXJncy5mb3J3YXJkKSB7XG4gICAgICAgICAgICB2YXIgbGFzdENoYXJDb29yZHMgPSBjbS5jaGFyQ29vcmRzKHJlcywgJ2RpdicpO1xuICAgICAgICAgICAgdmFyIGdvYWxDb29yZHMgPSB7IHRvcDogbGFzdENoYXJDb29yZHMudG9wICsgOCwgbGVmdDogdmltLmxhc3RIU1BvcyB9O1xuICAgICAgICAgICAgdmFyIHJlcyA9IGNtLmNvb3Jkc0NoYXIoZ29hbENvb3JkcywgJ2RpdicpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmVzQ29vcmRzID0gY20uY2hhckNvb3JkcyhuZXcgUG9zKGNtLmZpcnN0TGluZSgpLCAwKSwgJ2RpdicpO1xuICAgICAgICAgICAgcmVzQ29vcmRzLmxlZnQgPSB2aW0ubGFzdEhTUG9zO1xuICAgICAgICAgICAgcmVzID0gY20uY29vcmRzQ2hhcihyZXNDb29yZHMsICdkaXYnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmltLmxhc3RIUG9zID0gcmVzLmNoO1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfSxcbiAgICAgIG1vdmVCeVBhZ2U6IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIC8vIENvZGVNaXJyb3Igb25seSBleHBvc2VzIGZ1bmN0aW9ucyB0aGF0IG1vdmUgdGhlIGN1cnNvciBwYWdlIGRvd24sIHNvXG4gICAgICAgIC8vIGRvaW5nIHRoaXMgYmFkIGhhY2sgdG8gbW92ZSB0aGUgY3Vyc29yIGFuZCBtb3ZlIGl0IGJhY2suIGV2YWxJbnB1dFxuICAgICAgICAvLyB3aWxsIG1vdmUgdGhlIGN1cnNvciB0byB3aGVyZSBpdCBzaG91bGQgYmUgaW4gdGhlIGVuZC5cbiAgICAgICAgdmFyIGN1clN0YXJ0ID0gaGVhZDtcbiAgICAgICAgdmFyIHJlcGVhdCA9IG1vdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICByZXR1cm4gY20uZmluZFBvc1YoY3VyU3RhcnQsIChtb3Rpb25BcmdzLmZvcndhcmQgPyByZXBlYXQgOiAtcmVwZWF0KSwgJ3BhZ2UnKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlQnlQYXJhZ3JhcGg6IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciBkaXIgPSBtb3Rpb25BcmdzLmZvcndhcmQgPyAxIDogLTE7XG4gICAgICAgIHJldHVybiBmaW5kUGFyYWdyYXBoKGNtLCBoZWFkLCBtb3Rpb25BcmdzLnJlcGVhdCwgZGlyKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlQnlTZW50ZW5jZTogZnVuY3Rpb24oY20sIGhlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIGRpciA9IG1vdGlvbkFyZ3MuZm9yd2FyZCA/IDEgOiAtMTtcbiAgICAgICAgcmV0dXJuIGZpbmRTZW50ZW5jZShjbSwgaGVhZCwgbW90aW9uQXJncy5yZXBlYXQsIGRpcik7XG4gICAgICB9LFxuICAgICAgbW92ZUJ5U2Nyb2xsOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciBzY3JvbGxib3ggPSBjbS5nZXRTY3JvbGxJbmZvKCk7XG4gICAgICAgIHZhciBjdXJFbmQgPSBudWxsO1xuICAgICAgICB2YXIgcmVwZWF0ID0gbW90aW9uQXJncy5yZXBlYXQ7XG4gICAgICAgIGlmICghcmVwZWF0KSB7XG4gICAgICAgICAgcmVwZWF0ID0gc2Nyb2xsYm94LmNsaWVudEhlaWdodCAvICgyICogY20uZGVmYXVsdFRleHRIZWlnaHQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9yaWcgPSBjbS5jaGFyQ29vcmRzKGhlYWQsICdsb2NhbCcpO1xuICAgICAgICBtb3Rpb25BcmdzLnJlcGVhdCA9IHJlcGVhdDtcbiAgICAgICAgY3VyRW5kID0gbW90aW9ucy5tb3ZlQnlEaXNwbGF5TGluZXMoY20sIGhlYWQsIG1vdGlvbkFyZ3MsIHZpbSk7XG4gICAgICAgIGlmICghY3VyRW5kKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRlc3QgPSBjbS5jaGFyQ29vcmRzKGN1ckVuZCwgJ2xvY2FsJyk7XG4gICAgICAgIGNtLnNjcm9sbFRvKG51bGwsIHNjcm9sbGJveC50b3AgKyBkZXN0LnRvcCAtIG9yaWcudG9wKTtcbiAgICAgICAgcmV0dXJuIGN1ckVuZDtcbiAgICAgIH0sXG4gICAgICBtb3ZlQnlXb3JkczogZnVuY3Rpb24oY20sIGhlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIG1vdmVUb1dvcmQoY20sIGhlYWQsIG1vdGlvbkFyZ3MucmVwZWF0LCAhIW1vdGlvbkFyZ3MuZm9yd2FyZCxcbiAgICAgICAgICAgICEhbW90aW9uQXJncy53b3JkRW5kLCAhIW1vdGlvbkFyZ3MuYmlnV29yZCk7XG4gICAgICB9LFxuICAgICAgbW92ZVRpbGxDaGFyYWN0ZXI6IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgdmFyIGN1ckVuZCA9IG1vdmVUb0NoYXJhY3RlcihjbSwgcmVwZWF0LCBtb3Rpb25BcmdzLmZvcndhcmQsXG4gICAgICAgICAgICBtb3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyLCBoZWFkKTtcbiAgICAgICAgdmFyIGluY3JlbWVudCA9IG1vdGlvbkFyZ3MuZm9yd2FyZCA/IC0xIDogMTtcbiAgICAgICAgcmVjb3JkTGFzdENoYXJhY3RlclNlYXJjaChpbmNyZW1lbnQsIG1vdGlvbkFyZ3MpO1xuICAgICAgICBpZiAoIWN1ckVuZCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGN1ckVuZC5jaCArPSBpbmNyZW1lbnQ7XG4gICAgICAgIHJldHVybiBjdXJFbmQ7XG4gICAgICB9LFxuICAgICAgbW92ZVRvQ2hhcmFjdGVyOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgcmVwZWF0ID0gbW90aW9uQXJncy5yZXBlYXQ7XG4gICAgICAgIHJlY29yZExhc3RDaGFyYWN0ZXJTZWFyY2goMCwgbW90aW9uQXJncyk7XG4gICAgICAgIHJldHVybiBtb3ZlVG9DaGFyYWN0ZXIoY20sIHJlcGVhdCwgbW90aW9uQXJncy5mb3J3YXJkLFxuICAgICAgICAgICAgbW90aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlciwgaGVhZCkgfHwgaGVhZDtcbiAgICAgIH0sXG4gICAgICBtb3ZlVG9TeW1ib2w6IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgcmV0dXJuIGZpbmRTeW1ib2woY20sIHJlcGVhdCwgbW90aW9uQXJncy5mb3J3YXJkLFxuICAgICAgICAgICAgbW90aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlcikgfHwgaGVhZDtcbiAgICAgIH0sXG4gICAgICBtb3ZlVG9Db2x1bW46IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIHJlcGVhdCA9IG1vdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICAvLyByZXBlYXQgaXMgZXF1aXZhbGVudCB0byB3aGljaCBjb2x1bW4gd2Ugd2FudCB0byBtb3ZlIHRvIVxuICAgICAgICB2aW0ubGFzdEhQb3MgPSByZXBlYXQgLSAxO1xuICAgICAgICB2aW0ubGFzdEhTUG9zID0gY20uY2hhckNvb3JkcyhoZWFkLCdkaXYnKS5sZWZ0O1xuICAgICAgICByZXR1cm4gbW92ZVRvQ29sdW1uKGNtLCByZXBlYXQpO1xuICAgICAgfSxcbiAgICAgIG1vdmVUb0VvbDogZnVuY3Rpb24oY20sIGhlYWQsIG1vdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICByZXR1cm4gbW92ZVRvRW9sKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0sIGZhbHNlKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXI6IGZ1bmN0aW9uKGNtLCBoZWFkKSB7XG4gICAgICAgIC8vIEdvIHRvIHRoZSBzdGFydCBvZiB0aGUgbGluZSB3aGVyZSB0aGUgdGV4dCBiZWdpbnMsIG9yIHRoZSBlbmQgZm9yXG4gICAgICAgIC8vIHdoaXRlc3BhY2Utb25seSBsaW5lc1xuICAgICAgICB2YXIgY3Vyc29yID0gaGVhZDtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MoY3Vyc29yLmxpbmUsXG4gICAgICAgICAgICAgICAgICAgZmluZEZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbS5nZXRMaW5lKGN1cnNvci5saW5lKSkpO1xuICAgICAgfSxcbiAgICAgIG1vdmVUb01hdGNoZWRTeW1ib2w6IGZ1bmN0aW9uKGNtLCBoZWFkKSB7XG4gICAgICAgIHZhciBjdXJzb3IgPSBoZWFkO1xuICAgICAgICB2YXIgbGluZSA9IGN1cnNvci5saW5lO1xuICAgICAgICB2YXIgY2ggPSBjdXJzb3IuY2g7XG4gICAgICAgIHZhciBsaW5lVGV4dCA9IGNtLmdldExpbmUobGluZSk7XG4gICAgICAgIHZhciBzeW1ib2w7XG4gICAgICAgIGZvciAoOyBjaCA8IGxpbmVUZXh0Lmxlbmd0aDsgY2grKykge1xuICAgICAgICAgIHN5bWJvbCA9IGxpbmVUZXh0LmNoYXJBdChjaCk7XG4gICAgICAgICAgaWYgKHN5bWJvbCAmJiBpc01hdGNoYWJsZVN5bWJvbChzeW1ib2wpKSB7XG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBjbS5nZXRUb2tlblR5cGVBdChuZXcgUG9zKGxpbmUsIGNoICsgMSkpO1xuICAgICAgICAgICAgaWYgKHN0eWxlICE9PSBcInN0cmluZ1wiICYmIHN0eWxlICE9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoIDwgbGluZVRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgLy8gT25seSBpbmNsdWRlIGFuZ2xlIGJyYWNrZXRzIGluIGFuYWx5c2lzIGlmIHRoZXkgYXJlIGJlaW5nIG1hdGNoZWQuXG4gICAgICAgICAgdmFyIHJlID0gL1s8Pl0vLnRlc3QobGluZVRleHRbY2hdKSA/IC9bKCl7fVtcXF08Pl0vIDogL1soKXt9W1xcXV0vOyAvL2FjZV9wYXRjaD9cbiAgICAgICAgICB2YXIgbWF0Y2hlZCA9IGNtLmZpbmRNYXRjaGluZ0JyYWNrZXQobmV3IFBvcyhsaW5lLCBjaCsxKSwge2JyYWNrZXRSZWdleDogcmV9KTtcbiAgICAgICAgICByZXR1cm4gbWF0Y2hlZC50bztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gY3Vyc29yO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbW92ZVRvU3RhcnRPZkxpbmU6IGZ1bmN0aW9uKF9jbSwgaGVhZCkge1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhoZWFkLmxpbmUsIDApO1xuICAgICAgfSxcbiAgICAgIG1vdmVUb0xpbmVPckVkZ2VPZkRvY3VtZW50OiBmdW5jdGlvbihjbSwgX2hlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIGxpbmVOdW0gPSBtb3Rpb25BcmdzLmZvcndhcmQgPyBjbS5sYXN0TGluZSgpIDogY20uZmlyc3RMaW5lKCk7XG4gICAgICAgIGlmIChtb3Rpb25BcmdzLnJlcGVhdElzRXhwbGljaXQpIHtcbiAgICAgICAgICBsaW5lTnVtID0gbW90aW9uQXJncy5yZXBlYXQgLSBjbS5nZXRPcHRpb24oJ2ZpcnN0TGluZU51bWJlcicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGxpbmVOdW0sXG4gICAgICAgICAgICAgICAgICAgZmluZEZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbS5nZXRMaW5lKGxpbmVOdW0pKSk7XG4gICAgICB9LFxuICAgICAgbW92ZVRvU3RhcnRPZkRpc3BsYXlMaW5lOiBmdW5jdGlvbihjbSkge1xuICAgICAgICBjbS5leGVjQ29tbWFuZChcImdvTGluZUxlZnRcIik7XG4gICAgICAgIHJldHVybiBjbS5nZXRDdXJzb3IoKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlVG9FbmRPZkRpc3BsYXlMaW5lOiBmdW5jdGlvbihjbSkge1xuICAgICAgICBjbS5leGVjQ29tbWFuZChcImdvTGluZVJpZ2h0XCIpO1xuICAgICAgICB2YXIgaGVhZCA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICBpZiAoaGVhZC5zdGlja3kgPT0gXCJiZWZvcmVcIikgaGVhZC5jaC0tO1xuICAgICAgICByZXR1cm4gaGVhZDtcbiAgICAgIH0sXG4gICAgICB0ZXh0T2JqZWN0TWFuaXB1bGF0aW9uOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIC8vIFRPRE86IGxvdHMgb2YgcG9zc2libGUgZXhjZXB0aW9ucyB0aGF0IGNhbiBiZSB0aHJvd24gaGVyZS4gVHJ5IGRhKFxuICAgICAgICAvLyAgICAgb3V0c2lkZSBvZiBhICgpIGJsb2NrLlxuICAgICAgICB2YXIgbWlycm9yZWRQYWlycyA9IHsnKCc6ICcpJywgJyknOiAnKCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICd7JzogJ30nLCAnfSc6ICd7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1snOiAnXScsICddJzogJ1snLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPCc6ICc+JywgJz4nOiAnPCd9O1xuICAgICAgICB2YXIgc2VsZlBhaXJlZCA9IHsnXFwnJzogdHJ1ZSwgJ1wiJzogdHJ1ZSwgJ2AnOiB0cnVlfTtcblxuICAgICAgICB2YXIgY2hhcmFjdGVyID0gbW90aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlcjtcbiAgICAgICAgLy8gJ2InIHJlZmVycyB0byAgJygpJyBibG9jay5cbiAgICAgICAgLy8gJ0InIHJlZmVycyB0byAgJ3t9JyBibG9jay5cbiAgICAgICAgaWYgKGNoYXJhY3RlciA9PSAnYicpIHtcbiAgICAgICAgICBjaGFyYWN0ZXIgPSAnKCc7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyID09ICdCJykge1xuICAgICAgICAgIGNoYXJhY3RlciA9ICd7JztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluY2x1c2l2ZSBpcyB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIGEgYW5kIGlcbiAgICAgICAgLy8gVE9ETzogSW5zdGVhZCBvZiB1c2luZyB0aGUgYWRkaXRpb25hbCB0ZXh0IG9iamVjdCBtYXAgdG8gcGVyZm9ybSB0ZXh0XG4gICAgICAgIC8vICAgICBvYmplY3Qgb3BlcmF0aW9ucywgbWVyZ2UgdGhlIG1hcCBpbnRvIHRoZSBkZWZhdWx0S2V5TWFwIGFuZCB1c2VcbiAgICAgICAgLy8gICAgIG1vdGlvbkFyZ3MgdG8gZGVmaW5lIGJlaGF2aW9yLiBEZWZpbmUgc2VwYXJhdGUgZW50cmllcyBmb3IgJ2F3JyxcbiAgICAgICAgLy8gICAgICdpdycsICdhWycsICdpWycsIGV0Yy5cbiAgICAgICAgdmFyIGluY2x1c2l2ZSA9ICFtb3Rpb25BcmdzLnRleHRPYmplY3RJbm5lcjtcblxuICAgICAgICB2YXIgdG1wLCBtb3ZlO1xuICAgICAgICBpZiAobWlycm9yZWRQYWlyc1tjaGFyYWN0ZXJdKSB7XG4gICAgICAgICAgbW92ZSA9IHRydWU7XG4gICAgICAgICAgdG1wID0gc2VsZWN0Q29tcGFuaW9uT2JqZWN0KGNtLCBoZWFkLCBjaGFyYWN0ZXIsIGluY2x1c2l2ZSk7XG4gICAgICAgICAgaWYgKCF0bXApIHtcbiAgICAgICAgICAgIHZhciBzYyA9IGNtLmdldFNlYXJjaEN1cnNvcihuZXcgUmVnRXhwKFwiXFxcXFwiICsgY2hhcmFjdGVyLCBcImdcIiksIGhlYWQpXG4gICAgICAgICAgICBpZiAoc2MuZmluZCgpKSB7XG4gICAgICAgICAgICAgIHRtcCA9IHNlbGVjdENvbXBhbmlvbk9iamVjdChjbSwgc2MuZnJvbSgpLCBjaGFyYWN0ZXIsIGluY2x1c2l2ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHNlbGZQYWlyZWRbY2hhcmFjdGVyXSkge1xuICAgICAgICAgIG1vdmUgPSB0cnVlO1xuICAgICAgICAgIHRtcCA9IGZpbmRCZWdpbm5pbmdBbmRFbmQoY20sIGhlYWQsIGNoYXJhY3RlciwgaW5jbHVzaXZlKTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGFyYWN0ZXIgPT09ICdXJyB8fCBjaGFyYWN0ZXIgPT09ICd3Jykge1xuICAgICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdCB8fCAxO1xuICAgICAgICAgIHdoaWxlIChyZXBlYXQtLSA+IDApIHtcbiAgICAgICAgICAgIHZhciByZXBlYXRlZCA9IGV4cGFuZFdvcmRVbmRlckN1cnNvcihjbSwge1xuICAgICAgICAgICAgICBpbmNsdXNpdmUsXG4gICAgICAgICAgICAgIGlubmVyV29yZDogIWluY2x1c2l2ZSxcbiAgICAgICAgICAgICAgYmlnV29yZDogY2hhcmFjdGVyID09PSAnVycsXG4gICAgICAgICAgICAgIG5vU3ltYm9sOiBjaGFyYWN0ZXIgPT09ICdXJyxcbiAgICAgICAgICAgICAgbXVsdGlsaW5lOiB0cnVlXG4gICAgICAgICAgICB9LCB0bXAgJiYgdG1wLmVuZCk7XG4gICAgICAgICAgICBpZiAocmVwZWF0ZWQpIHtcbiAgICAgICAgICAgICAgaWYgKCF0bXApIHRtcCA9IHJlcGVhdGVkO1xuICAgICAgICAgICAgICB0bXAuZW5kID0gcmVwZWF0ZWQuZW5kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjaGFyYWN0ZXIgPT09ICdwJykge1xuICAgICAgICAgIHRtcCA9IGZpbmRQYXJhZ3JhcGgoY20sIGhlYWQsIG1vdGlvbkFyZ3MucmVwZWF0LCAwLCBpbmNsdXNpdmUpO1xuICAgICAgICAgIG1vdGlvbkFyZ3MubGluZXdpc2UgPSB0cnVlO1xuICAgICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgaWYgKCF2aW0udmlzdWFsTGluZSkgeyB2aW0udmlzdWFsTGluZSA9IHRydWU7IH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIG9wZXJhdG9yQXJncyA9IHZpbS5pbnB1dFN0YXRlLm9wZXJhdG9yQXJncztcbiAgICAgICAgICAgIGlmIChvcGVyYXRvckFyZ3MpIHsgb3BlcmF0b3JBcmdzLmxpbmV3aXNlID0gdHJ1ZTsgfVxuICAgICAgICAgICAgdG1wLmVuZC5saW5lLS07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGNoYXJhY3RlciA9PT0gJ3QnKSB7XG4gICAgICAgICAgdG1wID0gZXhwYW5kVGFnVW5kZXJDdXJzb3IoY20sIGhlYWQsIGluY2x1c2l2ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyID09PSAncycpIHtcbiAgICAgICAgICAvLyBhY2NvdW50IGZvciBjdXJzb3Igb24gZW5kIG9mIHNlbnRlbmNlIHN5bWJvbFxuICAgICAgICAgIHZhciBjb250ZW50ID0gY20uZ2V0TGluZShoZWFkLmxpbmUpO1xuICAgICAgICAgIGlmIChoZWFkLmNoID4gMCAmJiBpc0VuZE9mU2VudGVuY2VTeW1ib2woY29udGVudFtoZWFkLmNoXSkpIHtcbiAgICAgICAgICAgIGhlYWQuY2ggLT0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGVuZCA9IGdldFNlbnRlbmNlKGNtLCBoZWFkLCBtb3Rpb25BcmdzLnJlcGVhdCwgMSwgaW5jbHVzaXZlKVxuICAgICAgICAgIHZhciBzdGFydCA9IGdldFNlbnRlbmNlKGNtLCBoZWFkLCBtb3Rpb25BcmdzLnJlcGVhdCwgLTEsIGluY2x1c2l2ZSlcbiAgICAgICAgICAvLyBjbG9zZXIgdmltIGJlaGF2aW91ciwgJ2EnIG9ubHkgdGFrZXMgdGhlIHNwYWNlIGFmdGVyIHRoZSBzZW50ZW5jZSBpZiB0aGVyZSBpcyBvbmUgYmVmb3JlIGFuZCBhZnRlclxuICAgICAgICAgIGlmIChpc1doaXRlU3BhY2VTdHJpbmcoY20uZ2V0TGluZShzdGFydC5saW5lKVtzdGFydC5jaF0pXG4gICAgICAgICAgICAgICYmIGlzV2hpdGVTcGFjZVN0cmluZyhjbS5nZXRMaW5lKGVuZC5saW5lKVtlbmQuY2ggLTFdKSkge1xuICAgICAgICAgICAgc3RhcnQgPSB7bGluZTogc3RhcnQubGluZSwgY2g6IHN0YXJ0LmNoICsgMX1cbiAgICAgICAgICB9XG4gICAgICAgICAgdG1wID0ge3N0YXJ0OiBzdGFydCwgZW5kOiBlbmR9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0bXApIHtcbiAgICAgICAgICAvLyBObyB2YWxpZCB0ZXh0IG9iamVjdCwgZG9uJ3QgbW92ZS5cbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghY20uc3RhdGUudmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICByZXR1cm4gW3RtcC5zdGFydCwgdG1wLmVuZF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGV4cGFuZFNlbGVjdGlvbihjbSwgdG1wLnN0YXJ0LCB0bXAuZW5kLCBtb3ZlKTtcbiAgICAgICAgfVxuICAgICAgfSxcblxuICAgICAgcmVwZWF0TGFzdENoYXJhY3RlclNlYXJjaDogZnVuY3Rpb24oY20sIGhlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIGxhc3RTZWFyY2ggPSB2aW1HbG9iYWxTdGF0ZS5sYXN0Q2hhcmFjdGVyU2VhcmNoO1xuICAgICAgICB2YXIgcmVwZWF0ID0gbW90aW9uQXJncy5yZXBlYXQ7XG4gICAgICAgIHZhciBmb3J3YXJkID0gbW90aW9uQXJncy5mb3J3YXJkID09PSBsYXN0U2VhcmNoLmZvcndhcmQ7XG4gICAgICAgIHZhciBpbmNyZW1lbnQgPSAobGFzdFNlYXJjaC5pbmNyZW1lbnQgPyAxIDogMCkgKiAoZm9yd2FyZCA/IC0xIDogMSk7XG4gICAgICAgIGNtLm1vdmVIKC1pbmNyZW1lbnQsICdjaGFyJyk7XG4gICAgICAgIG1vdGlvbkFyZ3MuaW5jbHVzaXZlID0gZm9yd2FyZCA/IHRydWUgOiBmYWxzZTtcbiAgICAgICAgdmFyIGN1ckVuZCA9IG1vdmVUb0NoYXJhY3RlcihjbSwgcmVwZWF0LCBmb3J3YXJkLCBsYXN0U2VhcmNoLnNlbGVjdGVkQ2hhcmFjdGVyKTtcbiAgICAgICAgaWYgKCFjdXJFbmQpIHtcbiAgICAgICAgICBjbS5tb3ZlSChpbmNyZW1lbnQsICdjaGFyJyk7XG4gICAgICAgICAgcmV0dXJuIGhlYWQ7XG4gICAgICAgIH1cbiAgICAgICAgY3VyRW5kLmNoICs9IGluY3JlbWVudDtcbiAgICAgICAgcmV0dXJuIGN1ckVuZDtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZGVmaW5lTW90aW9uKG5hbWUsIGZuKSB7XG4gICAgICBtb3Rpb25zW25hbWVdID0gZm47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlsbEFycmF5KHZhbCwgdGltZXMpIHtcbiAgICAgIHZhciBhcnIgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGltZXM7IGkrKykge1xuICAgICAgICBhcnIucHVzaCh2YWwpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGFycjtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQW4gb3BlcmF0b3IgYWN0cyBvbiBhIHRleHQgc2VsZWN0aW9uLiBJdCByZWNlaXZlcyB0aGUgbGlzdCBvZiBzZWxlY3Rpb25zXG4gICAgICogYXMgaW5wdXQuIFRoZSBjb3JyZXNwb25kaW5nIENvZGVNaXJyb3Igc2VsZWN0aW9uIGlzIGd1YXJhbnRlZWQgdG9cbiAgICAqIG1hdGNoIHRoZSBpbnB1dCBzZWxlY3Rpb24uXG4gICAgICovXG4gICAgdmFyIG9wZXJhdG9ycyA9IHtcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24oY20sIGFyZ3MsIHJhbmdlcykge1xuICAgICAgICB2YXIgZmluYWxIZWFkLCB0ZXh0O1xuICAgICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgICB2YXIgYW5jaG9yID0gcmFuZ2VzWzBdLmFuY2hvcixcbiAgICAgICAgICAgIGhlYWQgPSByYW5nZXNbMF0uaGVhZDtcbiAgICAgICAgaWYgKCF2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgIHRleHQgPSBjbS5nZXRSYW5nZShhbmNob3IsIGhlYWQpO1xuICAgICAgICAgIHZhciBsYXN0U3RhdGUgPSB2aW0ubGFzdEVkaXRJbnB1dFN0YXRlIHx8IHt9O1xuICAgICAgICAgIGlmIChsYXN0U3RhdGUubW90aW9uID09IFwibW92ZUJ5V29yZHNcIiAmJiAhaXNXaGl0ZVNwYWNlU3RyaW5nKHRleHQpKSB7XG4gICAgICAgICAgICAvLyBFeGNsdWRlIHRyYWlsaW5nIHdoaXRlc3BhY2UgaWYgdGhlIHJhbmdlIGlzIG5vdCBhbGwgd2hpdGVzcGFjZS5cbiAgICAgICAgICAgIHZhciBtYXRjaCA9ICgvXFxzKyQvKS5leGVjKHRleHQpO1xuICAgICAgICAgICAgaWYgKG1hdGNoICYmIGxhc3RTdGF0ZS5tb3Rpb25BcmdzICYmIGxhc3RTdGF0ZS5tb3Rpb25BcmdzLmZvcndhcmQpIHtcbiAgICAgICAgICAgICAgaGVhZCA9IG9mZnNldEN1cnNvcihoZWFkLCAwLCAtIG1hdGNoWzBdLmxlbmd0aCk7XG4gICAgICAgICAgICAgIHRleHQgPSB0ZXh0LnNsaWNlKDAsIC0gbWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFyZ3MubGluZXdpc2UpIHtcbiAgICAgICAgICAgIGFuY2hvciA9IG5ldyBQb3MoYW5jaG9yLmxpbmUsIGZpbmRGaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20uZ2V0TGluZShhbmNob3IubGluZSkpKTtcbiAgICAgICAgICAgIGlmIChoZWFkLmxpbmUgPiBhbmNob3IubGluZSkge1xuICAgICAgICAgICAgICBoZWFkID0gbmV3IFBvcyhoZWFkLmxpbmUgLSAxLCBOdW1iZXIuTUFYX1ZBTFVFKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UoJycsIGFuY2hvciwgaGVhZCk7XG4gICAgICAgICAgZmluYWxIZWFkID0gYW5jaG9yO1xuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MuZnVsbExpbmUpIHtcbiAgICAgICAgICAgIGhlYWQuY2ggPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgICAgICAgICAgaGVhZC5saW5lLS07XG4gICAgICAgICAgICBjbS5zZXRTZWxlY3Rpb24oYW5jaG9yLCBoZWFkKVxuICAgICAgICAgICAgdGV4dCA9IGNtLmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbihcIlwiKTtcbiAgICAgICAgICAgIGZpbmFsSGVhZCA9IGFuY2hvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZXh0ID0gY20uZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgdmFyIHJlcGxhY2VtZW50ID0gZmlsbEFycmF5KCcnLCByYW5nZXMubGVuZ3RoKTtcbiAgICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9ucyhyZXBsYWNlbWVudCk7XG4gICAgICAgICAgZmluYWxIZWFkID0gY3Vyc29yTWluKHJhbmdlc1swXS5oZWFkLCByYW5nZXNbMF0uYW5jaG9yKTtcbiAgICAgICAgfVxuICAgICAgICB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIucHVzaFRleHQoXG4gICAgICAgICAgICBhcmdzLnJlZ2lzdGVyTmFtZSwgJ2NoYW5nZScsIHRleHQsXG4gICAgICAgICAgICBhcmdzLmxpbmV3aXNlLCByYW5nZXMubGVuZ3RoID4gMSk7XG4gICAgICAgIGFjdGlvbnMuZW50ZXJJbnNlcnRNb2RlKGNtLCB7aGVhZDogZmluYWxIZWFkfSwgY20uc3RhdGUudmltKTtcbiAgICAgIH0sXG4gICAgICAvLyBkZWxldGUgaXMgYSBqYXZhc2NyaXB0IGtleXdvcmQuXG4gICAgICAnZGVsZXRlJzogZnVuY3Rpb24oY20sIGFyZ3MsIHJhbmdlcykge1xuICAgICAgICB2YXIgZmluYWxIZWFkLCB0ZXh0O1xuICAgICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgICBpZiAoIXZpbS52aXN1YWxCbG9jaykge1xuICAgICAgICAgIHZhciBhbmNob3IgPSByYW5nZXNbMF0uYW5jaG9yLFxuICAgICAgICAgICAgICBoZWFkID0gcmFuZ2VzWzBdLmhlYWQ7XG4gICAgICAgICAgaWYgKGFyZ3MubGluZXdpc2UgJiZcbiAgICAgICAgICAgICAgaGVhZC5saW5lICE9IGNtLmZpcnN0TGluZSgpICYmXG4gICAgICAgICAgICAgIGFuY2hvci5saW5lID09IGNtLmxhc3RMaW5lKCkgJiZcbiAgICAgICAgICAgICAgYW5jaG9yLmxpbmUgPT0gaGVhZC5saW5lIC0gMSkge1xuICAgICAgICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciBkZCBvbiBsYXN0IGxpbmUgKGFuZCBmaXJzdCBsaW5lKS5cbiAgICAgICAgICAgIGlmIChhbmNob3IubGluZSA9PSBjbS5maXJzdExpbmUoKSkge1xuICAgICAgICAgICAgICBhbmNob3IuY2ggPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgYW5jaG9yID0gbmV3IFBvcyhhbmNob3IubGluZSAtIDEsIGxpbmVMZW5ndGgoY20sIGFuY2hvci5saW5lIC0gMSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICB0ZXh0ID0gY20uZ2V0UmFuZ2UoYW5jaG9yLCBoZWFkKTtcbiAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UoJycsIGFuY2hvciwgaGVhZCk7XG4gICAgICAgICAgZmluYWxIZWFkID0gYW5jaG9yO1xuICAgICAgICAgIGlmIChhcmdzLmxpbmV3aXNlKSB7XG4gICAgICAgICAgICBmaW5hbEhlYWQgPSBtb3Rpb25zLm1vdmVUb0ZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbSwgYW5jaG9yKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGV4dCA9IGNtLmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgIHZhciByZXBsYWNlbWVudCA9IGZpbGxBcnJheSgnJywgcmFuZ2VzLmxlbmd0aCk7XG4gICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbnMocmVwbGFjZW1lbnQpO1xuICAgICAgICAgIGZpbmFsSGVhZCA9IGN1cnNvck1pbihyYW5nZXNbMF0uaGVhZCwgcmFuZ2VzWzBdLmFuY2hvcik7XG4gICAgICAgIH1cbiAgICAgICAgdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLnB1c2hUZXh0KFxuICAgICAgICAgICAgYXJncy5yZWdpc3Rlck5hbWUsICdkZWxldGUnLCB0ZXh0LFxuICAgICAgICAgICAgYXJncy5saW5ld2lzZSwgdmltLnZpc3VhbEJsb2NrKTtcbiAgICAgICAgcmV0dXJuIGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIGZpbmFsSGVhZCk7XG4gICAgICB9LFxuICAgICAgaW5kZW50OiBmdW5jdGlvbihjbSwgYXJncywgcmFuZ2VzKSB7XG4gICAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICAgIC8vIEluIHZpc3VhbCBtb2RlLCBuPiBzaGlmdHMgdGhlIHNlbGVjdGlvbiByaWdodCBuIHRpbWVzLCBpbnN0ZWFkIG9mXG4gICAgICAgIC8vIHNoaWZ0aW5nIG4gbGluZXMgcmlnaHQgb25jZS5cbiAgICAgICAgdmFyIHJlcGVhdCA9ICh2aW0udmlzdWFsTW9kZSkgPyBhcmdzLnJlcGVhdCA6IDE7XG4gICAgICAgIGlmICh2aW0udmlzdWFsQmxvY2spIHtcbiAgICAgICAgICB2YXIgdGFiU2l6ZSA9IGNtLmdldE9wdGlvbigndGFiU2l6ZScpO1xuICAgICAgICAgIHZhciBpbmRlbnQgPSBjbS5nZXRPcHRpb24oJ2luZGVudFdpdGhUYWJzJykgPyAnXFx0JyA6ICcgJy5yZXBlYXQodGFiU2l6ZSk7XG4gICAgICAgICAgdmFyIGN1cnNvcjtcbiAgICAgICAgICBmb3IgKHZhciBpID0gcmFuZ2VzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjdXJzb3IgPSBjdXJzb3JNaW4ocmFuZ2VzW2ldLmFuY2hvciwgcmFuZ2VzW2ldLmhlYWQpO1xuICAgICAgICAgICAgaWYgKGFyZ3MuaW5kZW50UmlnaHQpIHtcbiAgICAgICAgICAgICAgY20ucmVwbGFjZVJhbmdlKGluZGVudC5yZXBlYXQocmVwZWF0KSwgY3Vyc29yLCBjdXJzb3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdmFyIHRleHQgPSBjbS5nZXRMaW5lKGN1cnNvci5saW5lKTtcbiAgICAgICAgICAgICAgdmFyIGVuZCA9IDA7XG4gICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVwZWF0OyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgY2ggPSB0ZXh0W2N1cnNvci5jaCArIGVuZF07XG4gICAgICAgICAgICAgICAgaWYgKGNoID09ICdcXHQnKSB7XG4gICAgICAgICAgICAgICAgICBlbmQrKztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoID09ICcgJykge1xuICAgICAgICAgICAgICAgICAgZW5kKys7XG4gICAgICAgICAgICAgICAgICBmb3IgKHZhciBrID0gMTsgayA8IGluZGVudC5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICBjaCA9IHRleHRbY3Vyc29yLmNoICsgZW5kXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNoICE9PSAnICcpIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBlbmQrKztcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY20ucmVwbGFjZVJhbmdlKCcnLCBjdXJzb3IsIG9mZnNldEN1cnNvcihjdXJzb3IsIDAsIGVuZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gY3Vyc29yO1xuICAgICAgICB9IGVsc2UgaWYgKGNtLmluZGVudE1vcmUpIHtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlcGVhdDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoYXJncy5pbmRlbnRSaWdodCkgY20uaW5kZW50TW9yZSgpO1xuICAgICAgICAgICAgZWxzZSBjbS5pbmRlbnRMZXNzKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBzdGFydExpbmUgPSByYW5nZXNbMF0uYW5jaG9yLmxpbmU7XG4gICAgICAgICAgdmFyIGVuZExpbmUgPSB2aW0udmlzdWFsQmxvY2sgP1xuICAgICAgICAgICAgcmFuZ2VzW3Jhbmdlcy5sZW5ndGggLSAxXS5hbmNob3IubGluZSA6XG4gICAgICAgICAgICByYW5nZXNbMF0uaGVhZC5saW5lO1xuICAgICAgICAgIGlmIChhcmdzLmxpbmV3aXNlKSB7XG4gICAgICAgICAgICAvLyBUaGUgb25seSB3YXkgdG8gZGVsZXRlIGEgbmV3bGluZSBpcyB0byBkZWxldGUgdW50aWwgdGhlIHN0YXJ0IG9mXG4gICAgICAgICAgICAvLyB0aGUgbmV4dCBsaW5lLCBzbyBpbiBsaW5ld2lzZSBtb2RlIGV2YWxJbnB1dCB3aWxsIGluY2x1ZGUgdGhlIG5leHRcbiAgICAgICAgICAgIC8vIGxpbmUuIFdlIGRvbid0IHdhbnQgdGhpcyBpbiBpbmRlbnQsIHNvIHdlIGdvIGJhY2sgYSBsaW5lLlxuICAgICAgICAgICAgZW5kTGluZS0tO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3IgKHZhciBpID0gc3RhcnRMaW5lOyBpIDw9IGVuZExpbmU7IGkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCByZXBlYXQ7IGorKykge1xuICAgICAgICAgICAgICBjbS5pbmRlbnRMaW5lKGksIGFyZ3MuaW5kZW50UmlnaHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbW90aW9ucy5tb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20sIHJhbmdlc1swXS5hbmNob3IpO1xuICAgICAgfSxcbiAgICAgIGluZGVudEF1dG86IGZ1bmN0aW9uKGNtLCBfYXJncywgcmFuZ2VzKSB7XG4gICAgICAgIGNtLmV4ZWNDb21tYW5kKFwiaW5kZW50QXV0b1wiKTtcbiAgICAgICAgcmV0dXJuIG1vdGlvbnMubW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLCByYW5nZXNbMF0uYW5jaG9yKTtcbiAgICAgIH0sXG4gICAgICBoYXJkV3JhcDogZnVuY3Rpb24oY20sIG9wZXJhdG9yQXJncywgcmFuZ2VzLCBvbGRBbmNob3IsIG5ld0hlYWQpIHtcbiAgICAgICAgaWYgKCFjbS5oYXJkV3JhcCkgcmV0dXJuO1xuICAgICAgICB2YXIgZnJvbSA9IHJhbmdlc1swXS5hbmNob3IubGluZTtcbiAgICAgICAgdmFyIHRvID0gcmFuZ2VzWzBdLmhlYWQubGluZTtcbiAgICAgICAgaWYgKG9wZXJhdG9yQXJncy5saW5ld2lzZSkgdG8tLTtcbiAgICAgICAgdmFyIGVuZFJvdyA9IGNtLmhhcmRXcmFwKHtmcm9tOiBmcm9tLCB0bzogdG99KTtcbiAgICAgICAgaWYgKGVuZFJvdyA+IGZyb20gJiYgb3BlcmF0b3JBcmdzLmxpbmV3aXNlKSBlbmRSb3ctLTtcbiAgICAgICAgcmV0dXJuIG9wZXJhdG9yQXJncy5rZWVwQ3Vyc29yID8gb2xkQW5jaG9yIDogbmV3IFBvcyhlbmRSb3csIDApO1xuICAgICAgfSxcbiAgICAgIGNoYW5nZUNhc2U6IGZ1bmN0aW9uKGNtLCBhcmdzLCByYW5nZXMsIG9sZEFuY2hvciwgbmV3SGVhZCkge1xuICAgICAgICB2YXIgc2VsZWN0aW9ucyA9IGNtLmdldFNlbGVjdGlvbnMoKTtcbiAgICAgICAgdmFyIHN3YXBwZWQgPSBbXTtcbiAgICAgICAgdmFyIHRvTG93ZXIgPSBhcmdzLnRvTG93ZXI7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgc2VsZWN0aW9ucy5sZW5ndGg7IGorKykge1xuICAgICAgICAgIHZhciB0b1N3YXAgPSBzZWxlY3Rpb25zW2pdO1xuICAgICAgICAgIHZhciB0ZXh0ID0gJyc7XG4gICAgICAgICAgaWYgKHRvTG93ZXIgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRleHQgPSB0b1N3YXAudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHRvTG93ZXIgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0ZXh0ID0gdG9Td2FwLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9Td2FwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBjaGFyYWN0ZXIgPSB0b1N3YXAuY2hhckF0KGkpO1xuICAgICAgICAgICAgICB0ZXh0ICs9IGlzVXBwZXJDYXNlKGNoYXJhY3RlcikgPyBjaGFyYWN0ZXIudG9Mb3dlckNhc2UoKSA6XG4gICAgICAgICAgICAgICAgICBjaGFyYWN0ZXIudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc3dhcHBlZC5wdXNoKHRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGNtLnJlcGxhY2VTZWxlY3Rpb25zKHN3YXBwZWQpO1xuICAgICAgICBpZiAoYXJncy5zaG91bGRNb3ZlQ3Vyc29yKXtcbiAgICAgICAgICByZXR1cm4gbmV3SGVhZDtcbiAgICAgICAgfSBlbHNlIGlmICghY20uc3RhdGUudmltLnZpc3VhbE1vZGUgJiYgYXJncy5saW5ld2lzZSAmJiByYW5nZXNbMF0uYW5jaG9yLmxpbmUgKyAxID09IHJhbmdlc1swXS5oZWFkLmxpbmUpIHtcbiAgICAgICAgICByZXR1cm4gbW90aW9ucy5tb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20sIG9sZEFuY2hvcik7XG4gICAgICAgIH0gZWxzZSBpZiAoYXJncy5saW5ld2lzZSl7XG4gICAgICAgICAgcmV0dXJuIG9sZEFuY2hvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gY3Vyc29yTWluKHJhbmdlc1swXS5hbmNob3IsIHJhbmdlc1swXS5oZWFkKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHlhbms6IGZ1bmN0aW9uKGNtLCBhcmdzLCByYW5nZXMsIG9sZEFuY2hvcikge1xuICAgICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgICB2YXIgdGV4dCA9IGNtLmdldFNlbGVjdGlvbigpO1xuICAgICAgICB2YXIgZW5kUG9zID0gdmltLnZpc3VhbE1vZGVcbiAgICAgICAgICA/IGN1cnNvck1pbih2aW0uc2VsLmFuY2hvciwgdmltLnNlbC5oZWFkLCByYW5nZXNbMF0uaGVhZCwgcmFuZ2VzWzBdLmFuY2hvcilcbiAgICAgICAgICA6IG9sZEFuY2hvcjtcbiAgICAgICAgdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLnB1c2hUZXh0KFxuICAgICAgICAgICAgYXJncy5yZWdpc3Rlck5hbWUsICd5YW5rJyxcbiAgICAgICAgICAgIHRleHQsIGFyZ3MubGluZXdpc2UsIHZpbS52aXN1YWxCbG9jayk7XG4gICAgICAgIHJldHVybiBlbmRQb3M7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGRlZmluZU9wZXJhdG9yKG5hbWUsIGZuKSB7XG4gICAgICBvcGVyYXRvcnNbbmFtZV0gPSBmbjtcbiAgICB9XG5cbiAgICB2YXIgYWN0aW9ucyA9IHtcbiAgICAgIGp1bXBMaXN0V2FsazogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlcGVhdCA9IGFjdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICB2YXIgZm9yd2FyZCA9IGFjdGlvbkFyZ3MuZm9yd2FyZDtcbiAgICAgICAgdmFyIGp1bXBMaXN0ID0gdmltR2xvYmFsU3RhdGUuanVtcExpc3Q7XG5cbiAgICAgICAgdmFyIG1hcmsgPSBqdW1wTGlzdC5tb3ZlKGNtLCBmb3J3YXJkID8gcmVwZWF0IDogLXJlcGVhdCk7XG4gICAgICAgIHZhciBtYXJrUG9zID0gbWFyayA/IG1hcmsuZmluZCgpIDogdW5kZWZpbmVkO1xuICAgICAgICBtYXJrUG9zID0gbWFya1BvcyA/IG1hcmtQb3MgOiBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgY20uc2V0Q3Vyc29yKG1hcmtQb3MpO1xuICAgICAgICBjbS5hY2UuY3VyT3AuY29tbWFuZC5zY3JvbGxJbnRvVmlldyA9IFwiY2VudGVyLWFuaW1hdGVcIjsgLy8gYWNlX3BhdGNoXG4gICAgICB9LFxuICAgICAgc2Nyb2xsOiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncywgdmltKSB7XG4gICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVwZWF0ID0gYWN0aW9uQXJncy5yZXBlYXQgfHwgMTtcbiAgICAgICAgdmFyIGxpbmVIZWlnaHQgPSBjbS5kZWZhdWx0VGV4dEhlaWdodCgpO1xuICAgICAgICB2YXIgdG9wID0gY20uZ2V0U2Nyb2xsSW5mbygpLnRvcDtcbiAgICAgICAgdmFyIGRlbHRhID0gbGluZUhlaWdodCAqIHJlcGVhdDtcbiAgICAgICAgdmFyIG5ld1BvcyA9IGFjdGlvbkFyZ3MuZm9yd2FyZCA/IHRvcCArIGRlbHRhIDogdG9wIC0gZGVsdGE7XG4gICAgICAgIHZhciBjdXJzb3IgPSBjb3B5Q3Vyc29yKGNtLmdldEN1cnNvcigpKTtcbiAgICAgICAgdmFyIGN1cnNvckNvb3JkcyA9IGNtLmNoYXJDb29yZHMoY3Vyc29yLCAnbG9jYWwnKTtcbiAgICAgICAgaWYgKGFjdGlvbkFyZ3MuZm9yd2FyZCkge1xuICAgICAgICAgIGlmIChuZXdQb3MgPiBjdXJzb3JDb29yZHMudG9wKSB7XG4gICAgICAgICAgICAgY3Vyc29yLmxpbmUgKz0gKG5ld1BvcyAtIGN1cnNvckNvb3Jkcy50b3ApIC8gbGluZUhlaWdodDtcbiAgICAgICAgICAgICBjdXJzb3IubGluZSA9IE1hdGguY2VpbChjdXJzb3IubGluZSk7XG4gICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGN1cnNvcik7XG4gICAgICAgICAgICAgY3Vyc29yQ29vcmRzID0gY20uY2hhckNvb3JkcyhjdXJzb3IsICdsb2NhbCcpO1xuICAgICAgICAgICAgIGNtLnNjcm9sbFRvKG51bGwsIGN1cnNvckNvb3Jkcy50b3ApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgLy8gQ3Vyc29yIHN0YXlzIHdpdGhpbiBib3VuZHMuICBKdXN0IHJlcG9zaXRpb24gdGhlIHNjcm9sbCB3aW5kb3cuXG4gICAgICAgICAgICAgY20uc2Nyb2xsVG8obnVsbCwgbmV3UG9zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIG5ld0JvdHRvbSA9IG5ld1BvcyArIGNtLmdldFNjcm9sbEluZm8oKS5jbGllbnRIZWlnaHQ7XG4gICAgICAgICAgaWYgKG5ld0JvdHRvbSA8IGN1cnNvckNvb3Jkcy5ib3R0b20pIHtcbiAgICAgICAgICAgICBjdXJzb3IubGluZSAtPSAoY3Vyc29yQ29vcmRzLmJvdHRvbSAtIG5ld0JvdHRvbSkgLyBsaW5lSGVpZ2h0O1xuICAgICAgICAgICAgIGN1cnNvci5saW5lID0gTWF0aC5mbG9vcihjdXJzb3IubGluZSk7XG4gICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGN1cnNvcik7XG4gICAgICAgICAgICAgY3Vyc29yQ29vcmRzID0gY20uY2hhckNvb3JkcyhjdXJzb3IsICdsb2NhbCcpO1xuICAgICAgICAgICAgIGNtLnNjcm9sbFRvKFxuICAgICAgICAgICAgICAgICBudWxsLCBjdXJzb3JDb29yZHMuYm90dG9tIC0gY20uZ2V0U2Nyb2xsSW5mbygpLmNsaWVudEhlaWdodCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAvLyBDdXJzb3Igc3RheXMgd2l0aGluIGJvdW5kcy4gIEp1c3QgcmVwb3NpdGlvbiB0aGUgc2Nyb2xsIHdpbmRvdy5cbiAgICAgICAgICAgICBjbS5zY3JvbGxUbyhudWxsLCBuZXdQb3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNjcm9sbFRvQ3Vyc29yOiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncykge1xuICAgICAgICB2YXIgbGluZU51bSA9IGNtLmdldEN1cnNvcigpLmxpbmU7XG4gICAgICAgIHZhciBjaGFyQ29vcmRzID0gY20uY2hhckNvb3JkcyhuZXcgUG9zKGxpbmVOdW0sIDApLCAnbG9jYWwnKTtcbiAgICAgICAgdmFyIGhlaWdodCA9IGNtLmdldFNjcm9sbEluZm8oKS5jbGllbnRIZWlnaHQ7XG4gICAgICAgIHZhciB5ID0gY2hhckNvb3Jkcy50b3A7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uQXJncy5wb3NpdGlvbikge1xuICAgICAgICAgIGNhc2UgJ2NlbnRlcic6IHkgPSBjaGFyQ29vcmRzLmJvdHRvbSAtIGhlaWdodCAvIDI7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdib3R0b20nOlxuICAgICAgICAgICAgdmFyIGxpbmVMYXN0Q2hhclBvcyA9IG5ldyBQb3MobGluZU51bSwgY20uZ2V0TGluZShsaW5lTnVtKS5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIHZhciBsaW5lTGFzdENoYXJDb29yZHMgPSBjbS5jaGFyQ29vcmRzKGxpbmVMYXN0Q2hhclBvcywgJ2xvY2FsJyk7XG4gICAgICAgICAgICB2YXIgbGluZUhlaWdodCA9IGxpbmVMYXN0Q2hhckNvb3Jkcy5ib3R0b20gLSB5O1xuICAgICAgICAgICAgeSA9IHkgLSBoZWlnaHQgKyBsaW5lSGVpZ2h0XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjbS5zY3JvbGxUbyhudWxsLCB5KTtcbiAgICAgIH0sXG4gICAgICByZXBsYXlNYWNybzogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgcmVnaXN0ZXJOYW1lID0gYWN0aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlcjtcbiAgICAgICAgdmFyIHJlcGVhdCA9IGFjdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgICAgaWYgKHJlZ2lzdGVyTmFtZSA9PSAnQCcpIHtcbiAgICAgICAgICByZWdpc3Rlck5hbWUgPSBtYWNyb01vZGVTdGF0ZS5sYXRlc3RSZWdpc3RlcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBtYWNyb01vZGVTdGF0ZS5sYXRlc3RSZWdpc3RlciA9IHJlZ2lzdGVyTmFtZTtcbiAgICAgICAgfVxuICAgICAgICB3aGlsZShyZXBlYXQtLSl7XG4gICAgICAgICAgZXhlY3V0ZU1hY3JvUmVnaXN0ZXIoY20sIHZpbSwgbWFjcm9Nb2RlU3RhdGUsIHJlZ2lzdGVyTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBlbnRlck1hY3JvUmVjb3JkTW9kZTogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICAgIHZhciByZWdpc3Rlck5hbWUgPSBhY3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyO1xuICAgICAgICBpZiAodmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmlzVmFsaWRSZWdpc3RlcihyZWdpc3Rlck5hbWUpKSB7XG4gICAgICAgICAgbWFjcm9Nb2RlU3RhdGUuZW50ZXJNYWNyb1JlY29yZE1vZGUoY20sIHJlZ2lzdGVyTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB0b2dnbGVPdmVyd3JpdGU6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgIGlmICghY20uc3RhdGUub3ZlcndyaXRlKSB7XG4gICAgICAgICAgY20udG9nZ2xlT3ZlcndyaXRlKHRydWUpO1xuICAgICAgICAgIGNtLnNldE9wdGlvbigna2V5TWFwJywgJ3ZpbS1yZXBsYWNlJyk7XG4gICAgICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sIFwidmltLW1vZGUtY2hhbmdlXCIsIHttb2RlOiBcInJlcGxhY2VcIn0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNtLnRvZ2dsZU92ZXJ3cml0ZShmYWxzZSk7XG4gICAgICAgICAgY20uc2V0T3B0aW9uKCdrZXlNYXAnLCAndmltLWluc2VydCcpO1xuICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJpbnNlcnRcIn0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZW50ZXJJbnNlcnRNb2RlOiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncywgdmltKSB7XG4gICAgICAgIGlmIChjbS5nZXRPcHRpb24oJ3JlYWRPbmx5JykpIHsgcmV0dXJuOyB9XG4gICAgICAgIHZpbS5pbnNlcnRNb2RlID0gdHJ1ZTtcbiAgICAgICAgdmltLmluc2VydE1vZGVSZXBlYXQgPSBhY3Rpb25BcmdzICYmIGFjdGlvbkFyZ3MucmVwZWF0IHx8IDE7XG4gICAgICAgIHZhciBpbnNlcnRBdCA9IChhY3Rpb25BcmdzKSA/IGFjdGlvbkFyZ3MuaW5zZXJ0QXQgOiBudWxsO1xuICAgICAgICB2YXIgc2VsID0gdmltLnNlbDtcbiAgICAgICAgdmFyIGhlYWQgPSBhY3Rpb25BcmdzLmhlYWQgfHwgY20uZ2V0Q3Vyc29yKCdoZWFkJyk7XG4gICAgICAgIHZhciBoZWlnaHQgPSBjbS5saXN0U2VsZWN0aW9ucygpLmxlbmd0aDtcbiAgICAgICAgaWYgKGluc2VydEF0ID09ICdlb2wnKSB7XG4gICAgICAgICAgaGVhZCA9IG5ldyBQb3MoaGVhZC5saW5lLCBsaW5lTGVuZ3RoKGNtLCBoZWFkLmxpbmUpKTtcbiAgICAgICAgfSBlbHNlIGlmIChpbnNlcnRBdCA9PSAnYm9sJykge1xuICAgICAgICAgIGhlYWQgPSBuZXcgUG9zKGhlYWQubGluZSwgMCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5zZXJ0QXQgPT0gJ2NoYXJBZnRlcicpIHtcbiAgICAgICAgICB2YXIgbmV3UG9zaXRpb24gPSB1cGRhdGVTZWxlY3Rpb25Gb3JTdXJyb2dhdGVDaGFyYWN0ZXJzKGNtLCBoZWFkLCBvZmZzZXRDdXJzb3IoaGVhZCwgMCwgMSkpO1xuICAgICAgICAgIGhlYWQgPSBuZXdQb3NpdGlvbi5lbmQ7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5zZXJ0QXQgPT0gJ2ZpcnN0Tm9uQmxhbmsnKSB7XG4gICAgICAgICAgdmFyIG5ld1Bvc2l0aW9uID0gdXBkYXRlU2VsZWN0aW9uRm9yU3Vycm9nYXRlQ2hhcmFjdGVycyhjbSwgaGVhZCwgbW90aW9ucy5tb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20sIGhlYWQpKTtcbiAgICAgICAgICBoZWFkID0gbmV3UG9zaXRpb24uZW5kO1xuICAgICAgICB9IGVsc2UgaWYgKGluc2VydEF0ID09ICdzdGFydE9mU2VsZWN0ZWRBcmVhJykge1xuICAgICAgICAgIGlmICghdmltLnZpc3VhbE1vZGUpXG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICBpZiAoIXZpbS52aXN1YWxCbG9jaykge1xuICAgICAgICAgICAgaWYgKHNlbC5oZWFkLmxpbmUgPCBzZWwuYW5jaG9yLmxpbmUpIHtcbiAgICAgICAgICAgICAgaGVhZCA9IHNlbC5oZWFkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaGVhZCA9IG5ldyBQb3Moc2VsLmFuY2hvci5saW5lLCAwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaGVhZCA9IG5ldyBQb3MoXG4gICAgICAgICAgICAgICAgTWF0aC5taW4oc2VsLmhlYWQubGluZSwgc2VsLmFuY2hvci5saW5lKSxcbiAgICAgICAgICAgICAgICBNYXRoLm1pbihzZWwuaGVhZC5jaCwgc2VsLmFuY2hvci5jaCkpO1xuICAgICAgICAgICAgaGVpZ2h0ID0gTWF0aC5hYnMoc2VsLmhlYWQubGluZSAtIHNlbC5hbmNob3IubGluZSkgKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpbnNlcnRBdCA9PSAnZW5kT2ZTZWxlY3RlZEFyZWEnKSB7XG4gICAgICAgICAgICBpZiAoIXZpbS52aXN1YWxNb2RlKVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgaWYgKCF2aW0udmlzdWFsQmxvY2spIHtcbiAgICAgICAgICAgIGlmIChzZWwuaGVhZC5saW5lID49IHNlbC5hbmNob3IubGluZSkge1xuICAgICAgICAgICAgICBoZWFkID0gb2Zmc2V0Q3Vyc29yKHNlbC5oZWFkLCAwLCAxKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGhlYWQgPSBuZXcgUG9zKHNlbC5hbmNob3IubGluZSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhlYWQgPSBuZXcgUG9zKFxuICAgICAgICAgICAgICAgIE1hdGgubWluKHNlbC5oZWFkLmxpbmUsIHNlbC5hbmNob3IubGluZSksXG4gICAgICAgICAgICAgICAgTWF0aC5tYXgoc2VsLmhlYWQuY2gsIHNlbC5hbmNob3IuY2gpICsgMSk7XG4gICAgICAgICAgICBoZWlnaHQgPSBNYXRoLmFicyhzZWwuaGVhZC5saW5lIC0gc2VsLmFuY2hvci5saW5lKSArIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGluc2VydEF0ID09ICdpbnBsYWNlJykge1xuICAgICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSl7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGluc2VydEF0ID09ICdsYXN0RWRpdCcpIHtcbiAgICAgICAgICBoZWFkID0gZ2V0TGFzdEVkaXRQb3MoY20pIHx8IGhlYWQ7XG4gICAgICAgIH1cbiAgICAgICAgY20uc2V0T3B0aW9uKCdkaXNhYmxlSW5wdXQnLCBmYWxzZSk7XG4gICAgICAgIGlmIChhY3Rpb25BcmdzICYmIGFjdGlvbkFyZ3MucmVwbGFjZSkge1xuICAgICAgICAgIC8vIEhhbmRsZSBSZXBsYWNlLW1vZGUgYXMgYSBzcGVjaWFsIGNhc2Ugb2YgaW5zZXJ0IG1vZGUuXG4gICAgICAgICAgY20udG9nZ2xlT3ZlcndyaXRlKHRydWUpO1xuICAgICAgICAgIGNtLnNldE9wdGlvbigna2V5TWFwJywgJ3ZpbS1yZXBsYWNlJyk7XG4gICAgICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sIFwidmltLW1vZGUtY2hhbmdlXCIsIHttb2RlOiBcInJlcGxhY2VcIn0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNtLnRvZ2dsZU92ZXJ3cml0ZShmYWxzZSk7XG4gICAgICAgICAgY20uc2V0T3B0aW9uKCdrZXlNYXAnLCAndmltLWluc2VydCcpO1xuICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJpbnNlcnRcIn0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nKSB7XG4gICAgICAgICAgLy8gT25seSByZWNvcmQgaWYgbm90IHJlcGxheWluZy5cbiAgICAgICAgICBjbS5vbignY2hhbmdlJywgb25DaGFuZ2UpO1xuICAgICAgICAgIGlmICh2aW0uaW5zZXJ0RW5kKSB2aW0uaW5zZXJ0RW5kLmNsZWFyKCk7XG4gICAgICAgICAgdmltLmluc2VydEVuZCA9IGNtLnNldEJvb2ttYXJrKGhlYWQsIHtpbnNlcnRMZWZ0OiB0cnVlfSk7XG4gICAgICAgICAgQ29kZU1pcnJvci5vbihjbS5nZXRJbnB1dEZpZWxkKCksICdrZXlkb3duJywgb25LZXlFdmVudFRhcmdldEtleURvd24pO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgIGV4aXRWaXN1YWxNb2RlKGNtKTtcbiAgICAgICAgfVxuICAgICAgICBzZWxlY3RGb3JJbnNlcnQoY20sIGhlYWQsIGhlaWdodCk7XG4gICAgICB9LFxuICAgICAgdG9nZ2xlVmlzdWFsTW9kZTogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgcmVwZWF0ID0gYWN0aW9uQXJncy5yZXBlYXQ7XG4gICAgICAgIHZhciBhbmNob3IgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgdmFyIGhlYWQ7XG4gICAgICAgIC8vIFRPRE86IFRoZSByZXBlYXQgc2hvdWxkIGFjdHVhbGx5IHNlbGVjdCBudW1iZXIgb2YgY2hhcmFjdGVycy9saW5lc1xuICAgICAgICAvLyAgICAgZXF1YWwgdG8gdGhlIHJlcGVhdCB0aW1lcyB0aGUgc2l6ZSBvZiB0aGUgcHJldmlvdXMgdmlzdWFsXG4gICAgICAgIC8vICAgICBvcGVyYXRpb24uXG4gICAgICAgIGlmICghdmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAvLyBFbnRlcmluZyB2aXN1YWwgbW9kZVxuICAgICAgICAgIHZpbS52aXN1YWxNb2RlID0gdHJ1ZTtcbiAgICAgICAgICB2aW0udmlzdWFsTGluZSA9ICEhYWN0aW9uQXJncy5saW5ld2lzZTtcbiAgICAgICAgICB2aW0udmlzdWFsQmxvY2sgPSAhIWFjdGlvbkFyZ3MuYmxvY2t3aXNlO1xuICAgICAgICAgIGhlYWQgPSBjbGlwQ3Vyc29yVG9Db250ZW50KFxuICAgICAgICAgICAgICBjbSwgbmV3IFBvcyhhbmNob3IubGluZSwgYW5jaG9yLmNoICsgcmVwZWF0IC0gMSkpO1xuICAgICAgICAgIHZhciBuZXdQb3NpdGlvbiA9IHVwZGF0ZVNlbGVjdGlvbkZvclN1cnJvZ2F0ZUNoYXJhY3RlcnMoY20sIGFuY2hvciwgaGVhZClcbiAgICAgICAgICB2aW0uc2VsID0ge1xuICAgICAgICAgICAgYW5jaG9yOiBuZXdQb3NpdGlvbi5zdGFydCxcbiAgICAgICAgICAgIGhlYWQ6IG5ld1Bvc2l0aW9uLmVuZFxuICAgICAgICAgIH07XG4gICAgICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sIFwidmltLW1vZGUtY2hhbmdlXCIsIHttb2RlOiBcInZpc3VhbFwiLCBzdWJNb2RlOiB2aW0udmlzdWFsTGluZSA/IFwibGluZXdpc2VcIiA6IHZpbS52aXN1YWxCbG9jayA/IFwiYmxvY2t3aXNlXCIgOiBcIlwifSk7XG4gICAgICAgICAgdXBkYXRlQ21TZWxlY3Rpb24oY20pO1xuICAgICAgICAgIHVwZGF0ZU1hcmsoY20sIHZpbSwgJzwnLCBjdXJzb3JNaW4oYW5jaG9yLCBoZWFkKSk7XG4gICAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCAnPicsIGN1cnNvck1heChhbmNob3IsIGhlYWQpKTtcbiAgICAgICAgfSBlbHNlIGlmICh2aW0udmlzdWFsTGluZSBeIGFjdGlvbkFyZ3MubGluZXdpc2UgfHxcbiAgICAgICAgICAgIHZpbS52aXN1YWxCbG9jayBeIGFjdGlvbkFyZ3MuYmxvY2t3aXNlKSB7XG4gICAgICAgICAgLy8gVG9nZ2xpbmcgYmV0d2VlbiBtb2Rlc1xuICAgICAgICAgIHZpbS52aXN1YWxMaW5lID0gISFhY3Rpb25BcmdzLmxpbmV3aXNlO1xuICAgICAgICAgIHZpbS52aXN1YWxCbG9jayA9ICEhYWN0aW9uQXJncy5ibG9ja3dpc2U7XG4gICAgICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sIFwidmltLW1vZGUtY2hhbmdlXCIsIHttb2RlOiBcInZpc3VhbFwiLCBzdWJNb2RlOiB2aW0udmlzdWFsTGluZSA/IFwibGluZXdpc2VcIiA6IHZpbS52aXN1YWxCbG9jayA/IFwiYmxvY2t3aXNlXCIgOiBcIlwifSk7XG4gICAgICAgICAgdXBkYXRlQ21TZWxlY3Rpb24oY20pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4aXRWaXN1YWxNb2RlKGNtKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlc2VsZWN0TGFzdFNlbGVjdGlvbjogZnVuY3Rpb24oY20sIF9hY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIGxhc3RTZWxlY3Rpb24gPSB2aW0ubGFzdFNlbGVjdGlvbjtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgdXBkYXRlTGFzdFNlbGVjdGlvbihjbSwgdmltKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGFzdFNlbGVjdGlvbikge1xuICAgICAgICAgIHZhciBhbmNob3IgPSBsYXN0U2VsZWN0aW9uLmFuY2hvck1hcmsuZmluZCgpO1xuICAgICAgICAgIHZhciBoZWFkID0gbGFzdFNlbGVjdGlvbi5oZWFkTWFyay5maW5kKCk7XG4gICAgICAgICAgaWYgKCFhbmNob3IgfHwgIWhlYWQpIHtcbiAgICAgICAgICAgIC8vIElmIHRoZSBtYXJrcyBoYXZlIGJlZW4gZGVzdHJveWVkIGR1ZSB0byBlZGl0cywgZG8gbm90aGluZy5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmltLnNlbCA9IHtcbiAgICAgICAgICAgIGFuY2hvcjogYW5jaG9yLFxuICAgICAgICAgICAgaGVhZDogaGVhZFxuICAgICAgICAgIH07XG4gICAgICAgICAgdmltLnZpc3VhbE1vZGUgPSB0cnVlO1xuICAgICAgICAgIHZpbS52aXN1YWxMaW5lID0gbGFzdFNlbGVjdGlvbi52aXN1YWxMaW5lO1xuICAgICAgICAgIHZpbS52aXN1YWxCbG9jayA9IGxhc3RTZWxlY3Rpb24udmlzdWFsQmxvY2s7XG4gICAgICAgICAgdXBkYXRlQ21TZWxlY3Rpb24oY20pO1xuICAgICAgICAgIHVwZGF0ZU1hcmsoY20sIHZpbSwgJzwnLCBjdXJzb3JNaW4oYW5jaG9yLCBoZWFkKSk7XG4gICAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCAnPicsIGN1cnNvck1heChhbmNob3IsIGhlYWQpKTtcbiAgICAgICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgJ3ZpbS1tb2RlLWNoYW5nZScsIHtcbiAgICAgICAgICAgIG1vZGU6ICd2aXN1YWwnLFxuICAgICAgICAgICAgc3ViTW9kZTogdmltLnZpc3VhbExpbmUgPyAnbGluZXdpc2UnIDpcbiAgICAgICAgICAgICAgICAgICAgIHZpbS52aXN1YWxCbG9jayA/ICdibG9ja3dpc2UnIDogJyd9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGpvaW5MaW5lczogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgY3VyU3RhcnQsIGN1ckVuZDtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgY3VyU3RhcnQgPSBjbS5nZXRDdXJzb3IoJ2FuY2hvcicpO1xuICAgICAgICAgIGN1ckVuZCA9IGNtLmdldEN1cnNvcignaGVhZCcpO1xuICAgICAgICAgIGlmIChjdXJzb3JJc0JlZm9yZShjdXJFbmQsIGN1clN0YXJ0KSkge1xuICAgICAgICAgICAgdmFyIHRtcCA9IGN1ckVuZDtcbiAgICAgICAgICAgIGN1ckVuZCA9IGN1clN0YXJ0O1xuICAgICAgICAgICAgY3VyU3RhcnQgPSB0bXA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGN1ckVuZC5jaCA9IGxpbmVMZW5ndGgoY20sIGN1ckVuZC5saW5lKSAtIDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gUmVwZWF0IGlzIHRoZSBudW1iZXIgb2YgbGluZXMgdG8gam9pbi4gTWluaW11bSAyIGxpbmVzLlxuICAgICAgICAgIHZhciByZXBlYXQgPSBNYXRoLm1heChhY3Rpb25BcmdzLnJlcGVhdCwgMik7XG4gICAgICAgICAgY3VyU3RhcnQgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgICBjdXJFbmQgPSBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBuZXcgUG9zKGN1clN0YXJ0LmxpbmUgKyByZXBlYXQgLSAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBJbmZpbml0eSkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmaW5hbENoID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IGN1clN0YXJ0LmxpbmU7IGkgPCBjdXJFbmQubGluZTsgaSsrKSB7XG4gICAgICAgICAgZmluYWxDaCA9IGxpbmVMZW5ndGgoY20sIGN1clN0YXJ0LmxpbmUpO1xuICAgICAgICAgIHZhciB0ZXh0ID0gJyc7XG4gICAgICAgICAgdmFyIG5leHRTdGFydENoID0gMDtcbiAgICAgICAgICBpZiAoIWFjdGlvbkFyZ3Mua2VlcFNwYWNlcykge1xuICAgICAgICAgICAgdmFyIG5leHRMaW5lID0gY20uZ2V0TGluZShjdXJTdGFydC5saW5lICsgMSk7XG4gICAgICAgICAgICBuZXh0U3RhcnRDaCA9IG5leHRMaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAobmV4dFN0YXJ0Q2ggPT0gLTEpIHtcbiAgICAgICAgICAgICAgbmV4dFN0YXJ0Q2ggPSBuZXh0TGluZS5sZW5ndGg7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0ZXh0ID0gXCIgXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZSh0ZXh0LCBcbiAgICAgICAgICAgIG5ldyBQb3MoY3VyU3RhcnQubGluZSwgZmluYWxDaCksXG4gICAgICAgICAgICBuZXcgUG9zKGN1clN0YXJ0LmxpbmUgKyAxLCBuZXh0U3RhcnRDaCkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJGaW5hbFBvcyA9IGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIG5ldyBQb3MoY3VyU3RhcnQubGluZSwgZmluYWxDaCkpO1xuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICBleGl0VmlzdWFsTW9kZShjbSwgZmFsc2UpO1xuICAgICAgICB9XG4gICAgICAgIGNtLnNldEN1cnNvcihjdXJGaW5hbFBvcyk7XG4gICAgICB9LFxuICAgICAgbmV3TGluZUFuZEVudGVySW5zZXJ0TW9kZTogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2aW0uaW5zZXJ0TW9kZSA9IHRydWU7XG4gICAgICAgIHZhciBpbnNlcnRBdCA9IGNvcHlDdXJzb3IoY20uZ2V0Q3Vyc29yKCkpO1xuICAgICAgICBpZiAoaW5zZXJ0QXQubGluZSA9PT0gY20uZmlyc3RMaW5lKCkgJiYgIWFjdGlvbkFyZ3MuYWZ0ZXIpIHtcbiAgICAgICAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIGluc2VydGluZyBuZXdsaW5lIGJlZm9yZSBzdGFydCBvZiBkb2N1bWVudC5cbiAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UoJ1xcbicsIG5ldyBQb3MoY20uZmlyc3RMaW5lKCksIDApKTtcbiAgICAgICAgICBjbS5zZXRDdXJzb3IoY20uZmlyc3RMaW5lKCksIDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGluc2VydEF0LmxpbmUgPSAoYWN0aW9uQXJncy5hZnRlcikgPyBpbnNlcnRBdC5saW5lIDpcbiAgICAgICAgICAgICAgaW5zZXJ0QXQubGluZSAtIDE7XG4gICAgICAgICAgaW5zZXJ0QXQuY2ggPSBsaW5lTGVuZ3RoKGNtLCBpbnNlcnRBdC5saW5lKTtcbiAgICAgICAgICBjbS5zZXRDdXJzb3IoaW5zZXJ0QXQpO1xuICAgICAgICAgIHZhciBuZXdsaW5lRm4gPSBDb2RlTWlycm9yLmNvbW1hbmRzLm5ld2xpbmVBbmRJbmRlbnRDb250aW51ZUNvbW1lbnQgfHxcbiAgICAgICAgICAgICAgQ29kZU1pcnJvci5jb21tYW5kcy5uZXdsaW5lQW5kSW5kZW50O1xuICAgICAgICAgIG5ld2xpbmVGbihjbSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5lbnRlckluc2VydE1vZGUoY20sIHsgcmVwZWF0OiBhY3Rpb25BcmdzLnJlcGVhdCB9LCB2aW0pO1xuICAgICAgfSxcbiAgICAgIHBhc3RlOiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciByZWdpc3RlciA9IHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5nZXRSZWdpc3RlcihcbiAgICAgICAgICAgIGFjdGlvbkFyZ3MucmVnaXN0ZXJOYW1lKTtcbiAgICAgICAgdmFyIGZhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICAgIHZhciB0ZXh0ID0gcmVnaXN0ZXIudG9TdHJpbmcoKTtcbiAgICAgICAgICB0aGlzLmNvbnRpbnVlUGFzdGUoY20sIGFjdGlvbkFyZ3MsIHZpbSwgdGV4dCwgcmVnaXN0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhY3Rpb25BcmdzLnJlZ2lzdGVyTmFtZSA9PT0gJysnICYmXG4gICAgICAgICAgICAgIHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgIHR5cGVvZiBuYXZpZ2F0b3IuY2xpcGJvYXJkICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICB0eXBlb2YgbmF2aWdhdG9yLmNsaXBib2FyZC5yZWFkVGV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQoKS50aGVuKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb250aW51ZVBhc3RlKGNtLCBhY3Rpb25BcmdzLCB2aW0sIHZhbHVlLCByZWdpc3Rlcik7XG4gICAgICAgICAgfSwgKCkgPT4geyBmYWxsYmFjaygpIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmFsbGJhY2soKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY29udGludWVQYXN0ZTogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSwgdGV4dCwgcmVnaXN0ZXIpIHtcbiAgICAgICAgdmFyIGN1ciA9IGNvcHlDdXJzb3IoY20uZ2V0Q3Vyc29yKCkpO1xuICAgICAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvbkFyZ3MubWF0Y2hJbmRlbnQpIHtcbiAgICAgICAgICB2YXIgdGFiU2l6ZSA9IGNtLmdldE9wdGlvbihcInRhYlNpemVcIik7XG4gICAgICAgICAgLy8gbGVuZ3RoIHRoYXQgY29uc2lkZXJzIHRhYnMgYW5kIHRhYlNpemVcbiAgICAgICAgICB2YXIgd2hpdGVzcGFjZUxlbmd0aCA9IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgdmFyIHRhYnMgPSAoc3RyLnNwbGl0KFwiXFx0XCIpLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgdmFyIHNwYWNlcyA9IChzdHIuc3BsaXQoXCIgXCIpLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRhYnMgKiB0YWJTaXplICsgc3BhY2VzICogMTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBjdXJyZW50TGluZSA9IGNtLmdldExpbmUoY20uZ2V0Q3Vyc29yKCkubGluZSk7XG4gICAgICAgICAgdmFyIGluZGVudCA9IHdoaXRlc3BhY2VMZW5ndGgoY3VycmVudExpbmUubWF0Y2goL15cXHMqLylbMF0pO1xuICAgICAgICAgIC8vIGNob21wIGxhc3QgbmV3bGluZSBiL2MgZG9uJ3Qgd2FudCBpdCB0byBtYXRjaCAvXlxccyovZ21cbiAgICAgICAgICB2YXIgY2hvbXBlZFRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcbiQvLCAnJyk7XG4gICAgICAgICAgdmFyIHdhc0Nob21wZWQgPSB0ZXh0ICE9PSBjaG9tcGVkVGV4dDtcbiAgICAgICAgICB2YXIgZmlyc3RJbmRlbnQgPSB3aGl0ZXNwYWNlTGVuZ3RoKHRleHQubWF0Y2goL15cXHMqLylbMF0pO1xuICAgICAgICAgIHZhciB0ZXh0ID0gY2hvbXBlZFRleHQucmVwbGFjZSgvXlxccyovZ20sIGZ1bmN0aW9uKHdzcGFjZSkge1xuICAgICAgICAgICAgdmFyIG5ld0luZGVudCA9IGluZGVudCArICh3aGl0ZXNwYWNlTGVuZ3RoKHdzcGFjZSkgLSBmaXJzdEluZGVudCk7XG4gICAgICAgICAgICBpZiAobmV3SW5kZW50IDwgMCkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNtLmdldE9wdGlvbihcImluZGVudFdpdGhUYWJzXCIpKSB7XG4gICAgICAgICAgICAgIHZhciBxdW90aWVudCA9IE1hdGguZmxvb3IobmV3SW5kZW50IC8gdGFiU2l6ZSk7XG4gICAgICAgICAgICAgIHJldHVybiBBcnJheShxdW90aWVudCArIDEpLmpvaW4oJ1xcdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBBcnJheShuZXdJbmRlbnQgKyAxKS5qb2luKCcgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGV4dCArPSB3YXNDaG9tcGVkID8gXCJcXG5cIiA6IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvbkFyZ3MucmVwZWF0ID4gMSkge1xuICAgICAgICAgIHZhciB0ZXh0ID0gQXJyYXkoYWN0aW9uQXJncy5yZXBlYXQgKyAxKS5qb2luKHRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaW5ld2lzZSA9IHJlZ2lzdGVyLmxpbmV3aXNlO1xuICAgICAgICB2YXIgYmxvY2t3aXNlID0gcmVnaXN0ZXIuYmxvY2t3aXNlO1xuICAgICAgICBpZiAoYmxvY2t3aXNlKSB7XG4gICAgICAgICAgdGV4dCA9IHRleHQuc3BsaXQoJ1xcbicpO1xuICAgICAgICAgIGlmIChsaW5ld2lzZSkge1xuICAgICAgICAgICAgdGV4dC5wb3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0ZXh0W2ldID0gKHRleHRbaV0gPT0gJycpID8gJyAnIDogdGV4dFtpXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VyLmNoICs9IGFjdGlvbkFyZ3MuYWZ0ZXIgPyAxIDogMDtcbiAgICAgICAgICBjdXIuY2ggPSBNYXRoLm1pbihsaW5lTGVuZ3RoKGNtLCBjdXIubGluZSksIGN1ci5jaCk7XG4gICAgICAgIH0gZWxzZSBpZiAobGluZXdpc2UpIHtcbiAgICAgICAgICBpZih2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgdGV4dCA9IHZpbS52aXN1YWxMaW5lID8gdGV4dC5zbGljZSgwLCAtMSkgOiAnXFxuJyArIHRleHQuc2xpY2UoMCwgdGV4dC5sZW5ndGggLSAxKSArICdcXG4nO1xuICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uQXJncy5hZnRlcikge1xuICAgICAgICAgICAgLy8gTW92ZSB0aGUgbmV3bGluZSBhdCB0aGUgZW5kIHRvIHRoZSBzdGFydCBpbnN0ZWFkLCBhbmQgcGFzdGUganVzdFxuICAgICAgICAgICAgLy8gYmVmb3JlIHRoZSBuZXdsaW5lIGNoYXJhY3RlciBvZiB0aGUgbGluZSB3ZSBhcmUgb24gcmlnaHQgbm93LlxuICAgICAgICAgICAgdGV4dCA9ICdcXG4nICsgdGV4dC5zbGljZSgwLCB0ZXh0Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgY3VyLmNoID0gbGluZUxlbmd0aChjbSwgY3VyLmxpbmUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXIuY2ggPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdXIuY2ggKz0gYWN0aW9uQXJncy5hZnRlciA/IDEgOiAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJQb3NGaW5hbDtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgLy8gIHNhdmUgdGhlIHBhc3RlZCB0ZXh0IGZvciByZXNlbGVjdGlvbiBpZiB0aGUgbmVlZCBhcmlzZXNcbiAgICAgICAgICB2aW0ubGFzdFBhc3RlZFRleHQgPSB0ZXh0O1xuICAgICAgICAgIHZhciBsYXN0U2VsZWN0aW9uQ3VyRW5kO1xuICAgICAgICAgIHZhciBzZWxlY3RlZEFyZWEgPSBnZXRTZWxlY3RlZEFyZWFSYW5nZShjbSwgdmltKTtcbiAgICAgICAgICB2YXIgc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3RlZEFyZWFbMF07XG4gICAgICAgICAgdmFyIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGVkQXJlYVsxXTtcbiAgICAgICAgICB2YXIgc2VsZWN0ZWRUZXh0ID0gY20uZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgdmFyIHNlbGVjdGlvbnMgPSBjbS5saXN0U2VsZWN0aW9ucygpO1xuICAgICAgICAgIHZhciBlbXB0eVN0cmluZ3MgPSBuZXcgQXJyYXkoc2VsZWN0aW9ucy5sZW5ndGgpLmpvaW4oJzEnKS5zcGxpdCgnMScpO1xuICAgICAgICAgIC8vIHNhdmUgdGhlIGN1ckVuZCBtYXJrZXIgYmVmb3JlIGl0IGdldCBjbGVhcmVkIGR1ZSB0byBjbS5yZXBsYWNlUmFuZ2UuXG4gICAgICAgICAgaWYgKHZpbS5sYXN0U2VsZWN0aW9uKSB7XG4gICAgICAgICAgICBsYXN0U2VsZWN0aW9uQ3VyRW5kID0gdmltLmxhc3RTZWxlY3Rpb24uaGVhZE1hcmsuZmluZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBwdXNoIHRoZSBwcmV2aW91c2x5IHNlbGVjdGVkIHRleHQgdG8gdW5uYW1lZCByZWdpc3RlclxuICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci51bm5hbWVkUmVnaXN0ZXIuc2V0VGV4dChzZWxlY3RlZFRleHQpO1xuICAgICAgICAgIGlmIChibG9ja3dpc2UpIHtcbiAgICAgICAgICAgIC8vIGZpcnN0IGRlbGV0ZSB0aGUgc2VsZWN0ZWQgdGV4dFxuICAgICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbnMoZW1wdHlTdHJpbmdzKTtcbiAgICAgICAgICAgIC8vIFNldCBuZXcgc2VsZWN0aW9ucyBhcyBwZXIgdGhlIGJsb2NrIGxlbmd0aCBvZiB0aGUgeWFua2VkIHRleHRcbiAgICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IG5ldyBQb3Moc2VsZWN0aW9uU3RhcnQubGluZSArIHRleHQubGVuZ3RoLTEsIHNlbGVjdGlvblN0YXJ0LmNoKTtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihzZWxlY3Rpb25TdGFydCk7XG4gICAgICAgICAgICBzZWxlY3RCbG9jayhjbSwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VTZWxlY3Rpb25zKHRleHQpO1xuICAgICAgICAgICAgY3VyUG9zRmluYWwgPSBzZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZpbS52aXN1YWxCbG9jaykge1xuICAgICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbnMoZW1wdHlTdHJpbmdzKTtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihzZWxlY3Rpb25TdGFydCk7XG4gICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UodGV4dCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvblN0YXJ0KTtcbiAgICAgICAgICAgIGN1clBvc0ZpbmFsID0gc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZSh0ZXh0LCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgIGN1clBvc0ZpbmFsID0gY20ucG9zRnJvbUluZGV4KGNtLmluZGV4RnJvbVBvcyhzZWxlY3Rpb25TdGFydCkgKyB0ZXh0Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyByZXN0b3JlIHRoZSB0aGUgY3VyRW5kIG1hcmtlclxuICAgICAgICAgIGlmKGxhc3RTZWxlY3Rpb25DdXJFbmQpIHtcbiAgICAgICAgICAgIHZpbS5sYXN0U2VsZWN0aW9uLmhlYWRNYXJrID0gY20uc2V0Qm9va21hcmsobGFzdFNlbGVjdGlvbkN1ckVuZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChsaW5ld2lzZSkge1xuICAgICAgICAgICAgY3VyUG9zRmluYWwuY2g9MDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGJsb2Nrd2lzZSkge1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGN1cik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIGxpbmUgPSBjdXIubGluZStpO1xuICAgICAgICAgICAgICBpZiAobGluZSA+IGNtLmxhc3RMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UoJ1xcbicsICBuZXcgUG9zKGxpbmUsIDApKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgbGFzdENoID0gbGluZUxlbmd0aChjbSwgbGluZSk7XG4gICAgICAgICAgICAgIGlmIChsYXN0Q2ggPCBjdXIuY2gpIHtcbiAgICAgICAgICAgICAgICBleHRlbmRMaW5lVG9Db2x1bW4oY20sIGxpbmUsIGN1ci5jaCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihjdXIpO1xuICAgICAgICAgICAgc2VsZWN0QmxvY2soY20sIG5ldyBQb3MoY3VyLmxpbmUgKyB0ZXh0Lmxlbmd0aC0xLCBjdXIuY2gpKTtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VTZWxlY3Rpb25zKHRleHQpO1xuICAgICAgICAgICAgY3VyUG9zRmluYWwgPSBjdXI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZSh0ZXh0LCBjdXIpO1xuICAgICAgICAgICAgLy8gTm93IGZpbmUgdHVuZSB0aGUgY3Vyc29yIHRvIHdoZXJlIHdlIHdhbnQgaXQuXG4gICAgICAgICAgICBpZiAobGluZXdpc2UpIHtcbiAgICAgICAgICAgICAgdmFyIGxpbmUgPSBhY3Rpb25BcmdzLmFmdGVyID8gY3VyLmxpbmUgKyAxIDogY3VyLmxpbmU7XG4gICAgICAgICAgICAgIGN1clBvc0ZpbmFsID0gbmV3IFBvcyhsaW5lLCBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUobGluZSkpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGN1clBvc0ZpbmFsID0gY29weUN1cnNvcihjdXIpO1xuICAgICAgICAgICAgICBpZiAoIS9cXG4vLnRlc3QodGV4dCkpIHtcbiAgICAgICAgICAgICAgICBjdXJQb3NGaW5hbC5jaCArPSB0ZXh0Lmxlbmd0aCAtIChhY3Rpb25BcmdzLmFmdGVyID8gMSA6IDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgIGV4aXRWaXN1YWxNb2RlKGNtLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgY20uc2V0Q3Vyc29yKGN1clBvc0ZpbmFsKTtcbiAgICAgIH0sXG4gICAgICB1bmRvOiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncykge1xuICAgICAgICBjbS5vcGVyYXRpb24oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmVwZWF0Rm4oY20sIENvZGVNaXJyb3IuY29tbWFuZHMudW5kbywgYWN0aW9uQXJncy5yZXBlYXQpKCk7XG4gICAgICAgICAgY20uc2V0Q3Vyc29yKGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIGNtLmdldEN1cnNvcignc3RhcnQnKSkpO1xuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICByZWRvOiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncykge1xuICAgICAgICByZXBlYXRGbihjbSwgQ29kZU1pcnJvci5jb21tYW5kcy5yZWRvLCBhY3Rpb25BcmdzLnJlcGVhdCkoKTtcbiAgICAgIH0sXG4gICAgICBzZXRSZWdpc3RlcjogZnVuY3Rpb24oX2NtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmltLmlucHV0U3RhdGUucmVnaXN0ZXJOYW1lID0gYWN0aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlcjtcbiAgICAgIH0sXG4gICAgICBpbnNlcnRSZWdpc3RlcjogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgcmVnaXN0ZXJOYW1lID0gYWN0aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlcjtcbiAgICAgICAgdmFyIHJlZ2lzdGVyID0gdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmdldFJlZ2lzdGVyKHJlZ2lzdGVyTmFtZSk7XG4gICAgICAgIHZhciB0ZXh0ID0gcmVnaXN0ZXIgJiYgcmVnaXN0ZXIudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKHRleHQpIHtcbiAgICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9uKHRleHQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25lTm9ybWFsQ29tbWFuZDogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICBleGl0SW5zZXJ0TW9kZShjbSwgdHJ1ZSk7XG4gICAgICAgIHZpbS5pbnNlcnRNb2RlUmV0dXJuID0gdHJ1ZTtcbiAgICAgICAgQ29kZU1pcnJvci5vbihjbSwgJ3ZpbS1jb21tYW5kLWRvbmUnLCBmdW5jdGlvbiBoYW5kbGVyKCkge1xuICAgICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkgcmV0dXJuO1xuICAgICAgICAgIGlmICh2aW0uaW5zZXJ0TW9kZVJldHVybikge1xuICAgICAgICAgICAgdmltLmluc2VydE1vZGVSZXR1cm4gPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICghdmltLmluc2VydE1vZGUpIHtcbiAgICAgICAgICAgICAgYWN0aW9ucy5lbnRlckluc2VydE1vZGUoY20sIHt9LCB2aW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBDb2RlTWlycm9yLm9mZihjbSwgJ3ZpbS1jb21tYW5kLWRvbmUnLCBoYW5kbGVyKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgc2V0TWFyazogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgbWFya05hbWUgPSBhY3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyO1xuICAgICAgICB1cGRhdGVNYXJrKGNtLCB2aW0sIG1hcmtOYW1lLCBjbS5nZXRDdXJzb3IoKSk7XG4gICAgICB9LFxuICAgICAgcmVwbGFjZTogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgcmVwbGFjZVdpdGggPSBhY3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyO1xuICAgICAgICB2YXIgY3VyU3RhcnQgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgdmFyIHJlcGxhY2VUbztcbiAgICAgICAgdmFyIGN1ckVuZDtcbiAgICAgICAgdmFyIHNlbGVjdGlvbnMgPSBjbS5saXN0U2VsZWN0aW9ucygpO1xuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICBjdXJTdGFydCA9IGNtLmdldEN1cnNvcignc3RhcnQnKTtcbiAgICAgICAgICBjdXJFbmQgPSBjbS5nZXRDdXJzb3IoJ2VuZCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShjdXJTdGFydC5saW5lKTtcbiAgICAgICAgICByZXBsYWNlVG8gPSBjdXJTdGFydC5jaCArIGFjdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICAgIGlmIChyZXBsYWNlVG8gPiBsaW5lLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVwbGFjZVRvPWxpbmUubGVuZ3RoO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjdXJFbmQgPSBuZXcgUG9zKGN1clN0YXJ0LmxpbmUsIHJlcGxhY2VUbyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbmV3UG9zaXRpb25zID0gdXBkYXRlU2VsZWN0aW9uRm9yU3Vycm9nYXRlQ2hhcmFjdGVycyhjbSwgY3VyU3RhcnQsIGN1ckVuZCk7XG4gICAgICAgIGN1clN0YXJ0ID0gbmV3UG9zaXRpb25zLnN0YXJ0O1xuICAgICAgICBjdXJFbmQgPSBuZXdQb3NpdGlvbnMuZW5kO1xuICAgICAgICBpZiAocmVwbGFjZVdpdGg9PSdcXG4nKSB7XG4gICAgICAgICAgaWYgKCF2aW0udmlzdWFsTW9kZSkgY20ucmVwbGFjZVJhbmdlKCcnLCBjdXJTdGFydCwgY3VyRW5kKTtcbiAgICAgICAgICAvLyBzcGVjaWFsIGNhc2UsIHdoZXJlIHZpbSBoZWxwIHNheXMgdG8gcmVwbGFjZSBieSBqdXN0IG9uZSBsaW5lLWJyZWFrXG4gICAgICAgICAgKENvZGVNaXJyb3IuY29tbWFuZHMubmV3bGluZUFuZEluZGVudENvbnRpbnVlQ29tbWVudCB8fCBDb2RlTWlycm9yLmNvbW1hbmRzLm5ld2xpbmVBbmRJbmRlbnQpKGNtKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgcmVwbGFjZVdpdGhTdHIgPSBjbS5nZXRSYW5nZShjdXJTdGFydCwgY3VyRW5kKTtcbiAgICAgICAgICAvLyByZXBsYWNlIGFsbCBzdXJyb2dhdGUgY2hhcmFjdGVycyB3aXRoIHNlbGVjdGVkIGNoYXJhY3RlclxuICAgICAgICAgIHJlcGxhY2VXaXRoU3RyID0gcmVwbGFjZVdpdGhTdHIucmVwbGFjZSgvW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS9nLCByZXBsYWNlV2l0aCk7XG4gICAgICAgICAgLy9yZXBsYWNlIGFsbCBjaGFyYWN0ZXJzIGluIHJhbmdlIGJ5IHNlbGVjdGVkLCBidXQga2VlcCBsaW5lYnJlYWtzXG4gICAgICAgICAgcmVwbGFjZVdpdGhTdHIgPSByZXBsYWNlV2l0aFN0ci5yZXBsYWNlKC9bXlxcbl0vZywgcmVwbGFjZVdpdGgpO1xuICAgICAgICAgIGlmICh2aW0udmlzdWFsQmxvY2spIHtcbiAgICAgICAgICAgIC8vIFRhYnMgYXJlIHNwbGl0IGluIHZpc3VhIGJsb2NrIGJlZm9yZSByZXBsYWNpbmdcbiAgICAgICAgICAgIHZhciBzcGFjZXMgPSBuZXcgQXJyYXkoY20uZ2V0T3B0aW9uKFwidGFiU2l6ZVwiKSsxKS5qb2luKCcgJyk7XG4gICAgICAgICAgICByZXBsYWNlV2l0aFN0ciA9IGNtLmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgICAgcmVwbGFjZVdpdGhTdHIgPSByZXBsYWNlV2l0aFN0ci5yZXBsYWNlKC9bXFx1RDgwMC1cXHVEQkZGXVtcXHVEQzAwLVxcdURGRkZdL2csIHJlcGxhY2VXaXRoKTtcbiAgICAgICAgICAgIHJlcGxhY2VXaXRoU3RyID0gcmVwbGFjZVdpdGhTdHIucmVwbGFjZSgvXFx0L2csIHNwYWNlcykucmVwbGFjZSgvW15cXG5dL2csIHJlcGxhY2VXaXRoKS5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9ucyhyZXBsYWNlV2l0aFN0cik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZShyZXBsYWNlV2l0aFN0ciwgY3VyU3RhcnQsIGN1ckVuZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgY3VyU3RhcnQgPSBjdXJzb3JJc0JlZm9yZShzZWxlY3Rpb25zWzBdLmFuY2hvciwgc2VsZWN0aW9uc1swXS5oZWFkKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uc1swXS5hbmNob3IgOiBzZWxlY3Rpb25zWzBdLmhlYWQ7XG4gICAgICAgICAgICBjbS5zZXRDdXJzb3IoY3VyU3RhcnQpO1xuICAgICAgICAgICAgZXhpdFZpc3VhbE1vZGUoY20sIGZhbHNlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKG9mZnNldEN1cnNvcihjdXJFbmQsIDAsIC0xKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgaW5jcmVtZW50TnVtYmVyVG9rZW46IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciBjdXIgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgdmFyIGxpbmVTdHIgPSBjbS5nZXRMaW5lKGN1ci5saW5lKTtcbiAgICAgICAgdmFyIHJlID0gLygtPykoPzooMHgpKFtcXGRhLWZdKyl8KDBifDB8KShcXGQrKSkvZ2k7XG4gICAgICAgIHZhciBtYXRjaDtcbiAgICAgICAgdmFyIHN0YXJ0O1xuICAgICAgICB2YXIgZW5kO1xuICAgICAgICB2YXIgbnVtYmVyU3RyO1xuICAgICAgICB3aGlsZSAoKG1hdGNoID0gcmUuZXhlYyhsaW5lU3RyKSkgIT09IG51bGwpIHtcbiAgICAgICAgICBzdGFydCA9IG1hdGNoLmluZGV4O1xuICAgICAgICAgIGVuZCA9IHN0YXJ0ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuICAgICAgICAgIGlmIChjdXIuY2ggPCBlbmQpYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFhY3Rpb25BcmdzLmJhY2t0cmFjayAmJiAoZW5kIDw9IGN1ci5jaCkpcmV0dXJuO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICB2YXIgYmFzZVN0ciA9IG1hdGNoWzJdIHx8IG1hdGNoWzRdXG4gICAgICAgICAgdmFyIGRpZ2l0cyA9IG1hdGNoWzNdIHx8IG1hdGNoWzVdXG4gICAgICAgICAgdmFyIGluY3JlbWVudCA9IGFjdGlvbkFyZ3MuaW5jcmVhc2UgPyAxIDogLTE7XG4gICAgICAgICAgdmFyIGJhc2UgPSB7JzBiJzogMiwgJzAnOiA4LCAnJzogMTAsICcweCc6IDE2fVtiYXNlU3RyLnRvTG93ZXJDYXNlKCldO1xuICAgICAgICAgIHZhciBudW1iZXIgPSBwYXJzZUludChtYXRjaFsxXSArIGRpZ2l0cywgYmFzZSkgKyAoaW5jcmVtZW50ICogYWN0aW9uQXJncy5yZXBlYXQpO1xuICAgICAgICAgIG51bWJlclN0ciA9IG51bWJlci50b1N0cmluZyhiYXNlKTtcbiAgICAgICAgICB2YXIgemVyb1BhZGRpbmcgPSBiYXNlU3RyID8gbmV3IEFycmF5KGRpZ2l0cy5sZW5ndGggLSBudW1iZXJTdHIubGVuZ3RoICsgMSArIG1hdGNoWzFdLmxlbmd0aCkuam9pbignMCcpIDogJydcbiAgICAgICAgICBpZiAobnVtYmVyU3RyLmNoYXJBdCgwKSA9PT0gJy0nKSB7XG4gICAgICAgICAgICBudW1iZXJTdHIgPSAnLScgKyBiYXNlU3RyICsgemVyb1BhZGRpbmcgKyBudW1iZXJTdHIuc3Vic3RyKDEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBudW1iZXJTdHIgPSBiYXNlU3RyICsgemVyb1BhZGRpbmcgKyBudW1iZXJTdHI7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBmcm9tID0gbmV3IFBvcyhjdXIubGluZSwgc3RhcnQpO1xuICAgICAgICAgIHZhciB0byA9IG5ldyBQb3MoY3VyLmxpbmUsIGVuZCk7XG4gICAgICAgICAgY20ucmVwbGFjZVJhbmdlKG51bWJlclN0ciwgZnJvbSwgdG8pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjbS5zZXRDdXJzb3IobmV3IFBvcyhjdXIubGluZSwgc3RhcnQgKyBudW1iZXJTdHIubGVuZ3RoIC0gMSkpO1xuICAgICAgfSxcbiAgICAgIHJlcGVhdExhc3RFZGl0OiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciBsYXN0RWRpdElucHV0U3RhdGUgPSB2aW0ubGFzdEVkaXRJbnB1dFN0YXRlO1xuICAgICAgICBpZiAoIWxhc3RFZGl0SW5wdXRTdGF0ZSkgeyByZXR1cm47IH1cbiAgICAgICAgdmFyIHJlcGVhdCA9IGFjdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICBpZiAocmVwZWF0ICYmIGFjdGlvbkFyZ3MucmVwZWF0SXNFeHBsaWNpdCkge1xuICAgICAgICAgIHZpbS5sYXN0RWRpdElucHV0U3RhdGUucmVwZWF0T3ZlcnJpZGUgPSByZXBlYXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwZWF0ID0gdmltLmxhc3RFZGl0SW5wdXRTdGF0ZS5yZXBlYXRPdmVycmlkZSB8fCByZXBlYXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmVwZWF0TGFzdEVkaXQoY20sIHZpbSwgcmVwZWF0LCBmYWxzZSAvKiogcmVwZWF0Rm9ySW5zZXJ0ICovKTtcbiAgICAgIH0sXG4gICAgICBpbmRlbnQ6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzKSB7XG4gICAgICAgIGNtLmluZGVudExpbmUoY20uZ2V0Q3Vyc29yKCkubGluZSwgYWN0aW9uQXJncy5pbmRlbnRSaWdodCk7XG4gICAgICB9LFxuICAgICAgZXhpdEluc2VydE1vZGU6IGV4aXRJbnNlcnRNb2RlXG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGRlZmluZUFjdGlvbihuYW1lLCBmbikge1xuICAgICAgYWN0aW9uc1tuYW1lXSA9IGZuO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogQmVsb3cgYXJlIG1pc2NlbGxhbmVvdXMgdXRpbGl0eSBmdW5jdGlvbnMgdXNlZCBieSB2aW0uanNcbiAgICAgKi9cblxuICAgIC8qKlxuICAgICAqIENsaXBzIGN1cnNvciB0byBlbnN1cmUgdGhhdCBsaW5lIGlzIHdpdGhpbiB0aGUgYnVmZmVyJ3MgcmFuZ2VcbiAgICAgKiBhbmQgaXMgbm90IGluc2lkZSBzdXJyb2dhdGUgcGFpclxuICAgICAqIElmIGluY2x1ZGVMaW5lQnJlYWsgaXMgdHJ1ZSwgdGhlbiBhbGxvdyBjdXIuY2ggPT0gbGluZUxlbmd0aC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBjdXIsIG9sZEN1cikge1xuICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgIHZhciBpbmNsdWRlTGluZUJyZWFrID0gdmltLmluc2VydE1vZGUgfHwgdmltLnZpc3VhbE1vZGU7XG4gICAgICB2YXIgbGluZSA9IE1hdGgubWluKE1hdGgubWF4KGNtLmZpcnN0TGluZSgpLCBjdXIubGluZSksIGNtLmxhc3RMaW5lKCkgKTtcbiAgICAgIHZhciB0ZXh0ID0gY20uZ2V0TGluZShsaW5lKTtcbiAgICAgIHZhciBtYXhDaCA9IHRleHQubGVuZ3RoIC0gMSArIE51bWJlcighIWluY2x1ZGVMaW5lQnJlYWspO1xuICAgICAgdmFyIGNoID0gTWF0aC5taW4oTWF0aC5tYXgoMCwgY3VyLmNoKSwgbWF4Q2gpO1xuICAgICAgLy8gcHJldmVudCBjdXJzb3IgZnJvbSBlbnRlcmluZyBzdXJyb2dhdGUgcGFpclxuICAgICAgdmFyIGNoYXJDb2RlID0gdGV4dC5jaGFyQ29kZUF0KGNoKTtcbiAgICAgIGlmICgweERDMDAgPD0gY2hhckNvZGUgJiYgY2hhckNvZGUgPD0gMHhERkZGKSB7XG4gICAgICAgIHZhciBkaXJlY3Rpb24gPSAxO1xuICAgICAgICBpZiAob2xkQ3VyICYmIG9sZEN1ci5saW5lID09IGxpbmUgJiYgb2xkQ3VyLmNoID4gY2gpIHtcbiAgICAgICAgICBkaXJlY3Rpb24gPSAtMTtcbiAgICAgICAgfVxuICAgICAgICBjaCArPWRpcmVjdGlvbjtcbiAgICAgICAgaWYgKGNoID4gbWF4Q2gpIGNoIC09MjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgUG9zKGxpbmUsIGNoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29weUFyZ3MoYXJncykge1xuICAgICAgdmFyIHJldCA9IHt9O1xuICAgICAgZm9yICh2YXIgcHJvcCBpbiBhcmdzKSB7XG4gICAgICAgIGlmIChhcmdzLmhhc093blByb3BlcnR5KHByb3ApKSB7XG4gICAgICAgICAgcmV0W3Byb3BdID0gYXJnc1twcm9wXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gICAgZnVuY3Rpb24gb2Zmc2V0Q3Vyc29yKGN1ciwgb2Zmc2V0TGluZSwgb2Zmc2V0Q2gpIHtcbiAgICAgIGlmICh0eXBlb2Ygb2Zmc2V0TGluZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgb2Zmc2V0Q2ggPSBvZmZzZXRMaW5lLmNoO1xuICAgICAgICBvZmZzZXRMaW5lID0gb2Zmc2V0TGluZS5saW5lO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBQb3MoY3VyLmxpbmUgKyBvZmZzZXRMaW5lLCBjdXIuY2ggKyBvZmZzZXRDaCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbW1hbmRNYXRjaGVzKGtleXMsIGtleU1hcCwgY29udGV4dCwgaW5wdXRTdGF0ZSkge1xuICAgICAgLy8gUGFydGlhbCBtYXRjaGVzIGFyZSBub3QgYXBwbGllZC4gVGhleSBpbmZvcm0gdGhlIGtleSBoYW5kbGVyXG4gICAgICAvLyB0aGF0IHRoZSBjdXJyZW50IGtleSBzZXF1ZW5jZSBpcyBhIHN1YnNlcXVlbmNlIG9mIGEgdmFsaWQga2V5XG4gICAgICAvLyBzZXF1ZW5jZSwgc28gdGhhdCB0aGUga2V5IGJ1ZmZlciBpcyBub3QgY2xlYXJlZC5cbiAgICAgIGlmIChpbnB1dFN0YXRlLm9wZXJhdG9yKSBjb250ZXh0ID0gXCJvcGVyYXRvclBlbmRpbmdcIjtcbiAgICAgIHZhciBtYXRjaCwgcGFydGlhbCA9IFtdLCBmdWxsID0gW107XG4gICAgICAvLyBpZiBjdXJyZW50bHkgZXhwYW5kZWQga2V5IGNvbWVzIGZyb20gYSBub3JlbWFwLCBzZWFyY2cgb25seSBpbiBkZWZhdWx0IGtleXNcbiAgICAgIHZhciBzdGFydEluZGV4ID0gbm9yZW1hcCA/IGtleU1hcC5sZW5ndGggLSBkZWZhdWx0S2V5bWFwTGVuZ3RoIDogMDtcbiAgICAgIGZvciAodmFyIGkgPSBzdGFydEluZGV4OyBpIDwga2V5TWFwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjb21tYW5kID0ga2V5TWFwW2ldO1xuICAgICAgICBpZiAoY29udGV4dCA9PSAnaW5zZXJ0JyAmJiBjb21tYW5kLmNvbnRleHQgIT0gJ2luc2VydCcgfHxcbiAgICAgICAgICAgIChjb21tYW5kLmNvbnRleHQgJiYgY29tbWFuZC5jb250ZXh0ICE9IGNvbnRleHQpIHx8XG4gICAgICAgICAgICBpbnB1dFN0YXRlLm9wZXJhdG9yICYmIGNvbW1hbmQudHlwZSA9PSAnYWN0aW9uJyB8fFxuICAgICAgICAgICAgIShtYXRjaCA9IGNvbW1hbmRNYXRjaChrZXlzLCBjb21tYW5kLmtleXMpKSkgeyBjb250aW51ZTsgfVxuICAgICAgICBpZiAobWF0Y2ggPT0gJ3BhcnRpYWwnKSB7IHBhcnRpYWwucHVzaChjb21tYW5kKTsgfVxuICAgICAgICBpZiAobWF0Y2ggPT0gJ2Z1bGwnKSB7IGZ1bGwucHVzaChjb21tYW5kKTsgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgcGFydGlhbDogcGFydGlhbC5sZW5ndGggJiYgcGFydGlhbCxcbiAgICAgICAgZnVsbDogZnVsbC5sZW5ndGggJiYgZnVsbFxuICAgICAgfTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29tbWFuZE1hdGNoKHByZXNzZWQsIG1hcHBlZCkge1xuICAgICAgY29uc3QgaXNMYXN0Q2hhcmFjdGVyID0gbWFwcGVkLnNsaWNlKC0xMSkgPT0gJzxjaGFyYWN0ZXI+JztcbiAgICAgIGNvbnN0IGlzTGFzdFJlZ2lzdGVyID0gbWFwcGVkLnNsaWNlKC0xMCkgPT0gJzxyZWdpc3Rlcj4nO1xuICAgICAgaWYgKGlzTGFzdENoYXJhY3RlciB8fCBpc0xhc3RSZWdpc3Rlcikge1xuICAgICAgICAvLyBMYXN0IGNoYXJhY3RlciBtYXRjaGVzIGFueXRoaW5nLlxuICAgICAgICB2YXIgcHJlZml4TGVuID0gbWFwcGVkLmxlbmd0aCAtIChpc0xhc3RDaGFyYWN0ZXIgPyAxMSA6IDEwKTtcbiAgICAgICAgdmFyIHByZXNzZWRQcmVmaXggPSBwcmVzc2VkLnNsaWNlKDAsIHByZWZpeExlbik7XG4gICAgICAgIHZhciBtYXBwZWRQcmVmaXggPSBtYXBwZWQuc2xpY2UoMCwgcHJlZml4TGVuKTtcbiAgICAgICAgcmV0dXJuIHByZXNzZWRQcmVmaXggPT0gbWFwcGVkUHJlZml4ICYmIHByZXNzZWQubGVuZ3RoID4gcHJlZml4TGVuID8gJ2Z1bGwnIDpcbiAgICAgICAgICAgICAgIG1hcHBlZFByZWZpeC5pbmRleE9mKHByZXNzZWRQcmVmaXgpID09IDAgPyAncGFydGlhbCcgOiBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBwcmVzc2VkID09IG1hcHBlZCA/ICdmdWxsJyA6XG4gICAgICAgICAgICAgICBtYXBwZWQuaW5kZXhPZihwcmVzc2VkKSA9PSAwID8gJ3BhcnRpYWwnIDogZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGxhc3RDaGFyKGtleXMpIHtcbiAgICAgIHZhciBtYXRjaCA9IC9eLiooPFtePl0rPikkLy5leGVjKGtleXMpO1xuICAgICAgdmFyIHNlbGVjdGVkQ2hhcmFjdGVyID0gbWF0Y2ggPyBtYXRjaFsxXSA6IGtleXMuc2xpY2UoLTEpO1xuICAgICAgaWYgKHNlbGVjdGVkQ2hhcmFjdGVyLmxlbmd0aCA+IDEpe1xuICAgICAgICBzd2l0Y2goc2VsZWN0ZWRDaGFyYWN0ZXIpe1xuICAgICAgICAgIGNhc2UgJzxDUj4nOlxuICAgICAgICAgICAgc2VsZWN0ZWRDaGFyYWN0ZXI9J1xcbic7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICc8U3BhY2U+JzpcbiAgICAgICAgICAgIHNlbGVjdGVkQ2hhcmFjdGVyPScgJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBzZWxlY3RlZENoYXJhY3Rlcj0nJztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gc2VsZWN0ZWRDaGFyYWN0ZXI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlcGVhdEZuKGNtLCBmbiwgcmVwZWF0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwZWF0OyBpKyspIHtcbiAgICAgICAgICBmbihjbSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvcHlDdXJzb3IoY3VyKSB7XG4gICAgICByZXR1cm4gbmV3IFBvcyhjdXIubGluZSwgY3VyLmNoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3Vyc29yRXF1YWwoY3VyMSwgY3VyMikge1xuICAgICAgcmV0dXJuIGN1cjEuY2ggPT0gY3VyMi5jaCAmJiBjdXIxLmxpbmUgPT0gY3VyMi5saW5lO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjdXJzb3JJc0JlZm9yZShjdXIxLCBjdXIyKSB7XG4gICAgICBpZiAoY3VyMS5saW5lIDwgY3VyMi5saW5lKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKGN1cjEubGluZSA9PSBjdXIyLmxpbmUgJiYgY3VyMS5jaCA8IGN1cjIuY2gpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGN1cnNvck1pbihjdXIxLCBjdXIyKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgY3VyMiA9IGN1cnNvck1pbi5hcHBseSh1bmRlZmluZWQsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGN1cnNvcklzQmVmb3JlKGN1cjEsIGN1cjIpID8gY3VyMSA6IGN1cjI7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGN1cnNvck1heChjdXIxLCBjdXIyKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDIpIHtcbiAgICAgICAgY3VyMiA9IGN1cnNvck1heC5hcHBseSh1bmRlZmluZWQsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGN1cnNvcklzQmVmb3JlKGN1cjEsIGN1cjIpID8gY3VyMiA6IGN1cjE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGN1cnNvcklzQmV0d2VlbihjdXIxLCBjdXIyLCBjdXIzKSB7XG4gICAgICAvLyByZXR1cm5zIHRydWUgaWYgY3VyMiBpcyBiZXR3ZWVuIGN1cjEgYW5kIGN1cjMuXG4gICAgICB2YXIgY3VyMWJlZm9yZTIgPSBjdXJzb3JJc0JlZm9yZShjdXIxLCBjdXIyKTtcbiAgICAgIHZhciBjdXIyYmVmb3JlMyA9IGN1cnNvcklzQmVmb3JlKGN1cjIsIGN1cjMpO1xuICAgICAgcmV0dXJuIGN1cjFiZWZvcmUyICYmIGN1cjJiZWZvcmUzO1xuICAgIH1cbiAgICBmdW5jdGlvbiBsaW5lTGVuZ3RoKGNtLCBsaW5lTnVtKSB7XG4gICAgICByZXR1cm4gY20uZ2V0TGluZShsaW5lTnVtKS5sZW5ndGg7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHRyaW0ocykge1xuICAgICAgaWYgKHMudHJpbSkge1xuICAgICAgICByZXR1cm4gcy50cmltKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGVzY2FwZVJlZ2V4KHMpIHtcbiAgICAgIHJldHVybiBzLnJlcGxhY2UoLyhbLj8qKyRcXFtcXF1cXC9cXFxcKCl7fXxcXC1dKS9nLCAnXFxcXCQxJyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGV4dGVuZExpbmVUb0NvbHVtbihjbSwgbGluZU51bSwgY29sdW1uKSB7XG4gICAgICB2YXIgZW5kQ2ggPSBsaW5lTGVuZ3RoKGNtLCBsaW5lTnVtKTtcbiAgICAgIHZhciBzcGFjZXMgPSBuZXcgQXJyYXkoY29sdW1uLWVuZENoKzEpLmpvaW4oJyAnKTtcbiAgICAgIGNtLnNldEN1cnNvcihuZXcgUG9zKGxpbmVOdW0sIGVuZENoKSk7XG4gICAgICBjbS5yZXBsYWNlUmFuZ2Uoc3BhY2VzLCBjbS5nZXRDdXJzb3IoKSk7XG4gICAgfVxuICAgIC8vIFRoaXMgZnVuY3Rpb25zIHNlbGVjdHMgYSByZWN0YW5ndWxhciBibG9ja1xuICAgIC8vIG9mIHRleHQgd2l0aCBzZWxlY3Rpb25FbmQgYXMgYW55IG9mIGl0cyBjb3JuZXJcbiAgICAvLyBIZWlnaHQgb2YgYmxvY2s6XG4gICAgLy8gRGlmZmVyZW5jZSBpbiBzZWxlY3Rpb25FbmQubGluZSBhbmQgZmlyc3QvbGFzdCBzZWxlY3Rpb24ubGluZVxuICAgIC8vIFdpZHRoIG9mIHRoZSBibG9jazpcbiAgICAvLyBEaXN0YW5jZSBiZXR3ZWVuIHNlbGVjdGlvbkVuZC5jaCBhbmQgYW55KGZpcnN0IGNvbnNpZGVyZWQgaGVyZSkgc2VsZWN0aW9uLmNoXG4gICAgZnVuY3Rpb24gc2VsZWN0QmxvY2soY20sIHNlbGVjdGlvbkVuZCkge1xuICAgICAgdmFyIHNlbGVjdGlvbnMgPSBbXSwgcmFuZ2VzID0gY20ubGlzdFNlbGVjdGlvbnMoKTtcbiAgICAgIHZhciBoZWFkID0gY29weUN1cnNvcihjbS5jbGlwUG9zKHNlbGVjdGlvbkVuZCkpO1xuICAgICAgdmFyIGlzQ2xpcHBlZCA9ICFjdXJzb3JFcXVhbChzZWxlY3Rpb25FbmQsIGhlYWQpO1xuICAgICAgdmFyIGN1ckhlYWQgPSBjbS5nZXRDdXJzb3IoJ2hlYWQnKTtcbiAgICAgIHZhciBwcmltSW5kZXggPSBnZXRJbmRleChyYW5nZXMsIGN1ckhlYWQpO1xuICAgICAgdmFyIHdhc0NsaXBwZWQgPSBjdXJzb3JFcXVhbChyYW5nZXNbcHJpbUluZGV4XS5oZWFkLCByYW5nZXNbcHJpbUluZGV4XS5hbmNob3IpO1xuICAgICAgdmFyIG1heCA9IHJhbmdlcy5sZW5ndGggLSAxO1xuICAgICAgdmFyIGluZGV4ID0gbWF4IC0gcHJpbUluZGV4ID4gcHJpbUluZGV4ID8gbWF4IDogMDtcbiAgICAgIHZhciBiYXNlID0gcmFuZ2VzW2luZGV4XS5hbmNob3I7XG5cbiAgICAgIHZhciBmaXJzdExpbmUgPSBNYXRoLm1pbihiYXNlLmxpbmUsIGhlYWQubGluZSk7XG4gICAgICB2YXIgbGFzdExpbmUgPSBNYXRoLm1heChiYXNlLmxpbmUsIGhlYWQubGluZSk7XG4gICAgICB2YXIgYmFzZUNoID0gYmFzZS5jaCwgaGVhZENoID0gaGVhZC5jaDtcblxuICAgICAgdmFyIGRpciA9IHJhbmdlc1tpbmRleF0uaGVhZC5jaCAtIGJhc2VDaDtcbiAgICAgIHZhciBuZXdEaXIgPSBoZWFkQ2ggLSBiYXNlQ2g7XG4gICAgICBpZiAoZGlyID4gMCAmJiBuZXdEaXIgPD0gMCkge1xuICAgICAgICBiYXNlQ2grKztcbiAgICAgICAgaWYgKCFpc0NsaXBwZWQpIHsgaGVhZENoLS07IH1cbiAgICAgIH0gZWxzZSBpZiAoZGlyIDwgMCAmJiBuZXdEaXIgPj0gMCkge1xuICAgICAgICBiYXNlQ2gtLTtcbiAgICAgICAgaWYgKCF3YXNDbGlwcGVkKSB7IGhlYWRDaCsrOyB9XG4gICAgICB9IGVsc2UgaWYgKGRpciA8IDAgJiYgbmV3RGlyID09IC0xKSB7XG4gICAgICAgIGJhc2VDaC0tO1xuICAgICAgICBoZWFkQ2grKztcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGxpbmUgPSBmaXJzdExpbmU7IGxpbmUgPD0gbGFzdExpbmU7IGxpbmUrKykge1xuICAgICAgICB2YXIgcmFuZ2UgPSB7YW5jaG9yOiBuZXcgUG9zKGxpbmUsIGJhc2VDaCksIGhlYWQ6IG5ldyBQb3MobGluZSwgaGVhZENoKX07XG4gICAgICAgIHNlbGVjdGlvbnMucHVzaChyYW5nZSk7XG4gICAgICB9XG4gICAgICBjbS5zZXRTZWxlY3Rpb25zKHNlbGVjdGlvbnMpO1xuICAgICAgc2VsZWN0aW9uRW5kLmNoID0gaGVhZENoO1xuICAgICAgYmFzZS5jaCA9IGJhc2VDaDtcbiAgICAgIHJldHVybiBiYXNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZWxlY3RGb3JJbnNlcnQoY20sIGhlYWQsIGhlaWdodCkge1xuICAgICAgdmFyIHNlbCA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBoZWlnaHQ7IGkrKykge1xuICAgICAgICB2YXIgbGluZUhlYWQgPSBvZmZzZXRDdXJzb3IoaGVhZCwgaSwgMCk7XG4gICAgICAgIHNlbC5wdXNoKHthbmNob3I6IGxpbmVIZWFkLCBoZWFkOiBsaW5lSGVhZH0pO1xuICAgICAgfVxuICAgICAgY20uc2V0U2VsZWN0aW9ucyhzZWwsIDApO1xuICAgIH1cbiAgICAvLyBnZXRJbmRleCByZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgY3Vyc29yIGluIHRoZSBzZWxlY3Rpb25zLlxuICAgIGZ1bmN0aW9uIGdldEluZGV4KHJhbmdlcywgY3Vyc29yLCBlbmQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmFuZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBhdEFuY2hvciA9IGVuZCAhPSAnaGVhZCcgJiYgY3Vyc29yRXF1YWwocmFuZ2VzW2ldLmFuY2hvciwgY3Vyc29yKTtcbiAgICAgICAgdmFyIGF0SGVhZCA9IGVuZCAhPSAnYW5jaG9yJyAmJiBjdXJzb3JFcXVhbChyYW5nZXNbaV0uaGVhZCwgY3Vyc29yKTtcbiAgICAgICAgaWYgKGF0QW5jaG9yIHx8IGF0SGVhZCkge1xuICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGVkQXJlYVJhbmdlKGNtLCB2aW0pIHtcbiAgICAgIHZhciBsYXN0U2VsZWN0aW9uID0gdmltLmxhc3RTZWxlY3Rpb247XG4gICAgICB2YXIgZ2V0Q3VycmVudFNlbGVjdGVkQXJlYVJhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxlY3Rpb25zID0gY20ubGlzdFNlbGVjdGlvbnMoKTtcbiAgICAgICAgdmFyIHN0YXJ0ID0gIHNlbGVjdGlvbnNbMF07XG4gICAgICAgIHZhciBlbmQgPSBzZWxlY3Rpb25zW3NlbGVjdGlvbnMubGVuZ3RoLTFdO1xuICAgICAgICB2YXIgc2VsZWN0aW9uU3RhcnQgPSBjdXJzb3JJc0JlZm9yZShzdGFydC5hbmNob3IsIHN0YXJ0LmhlYWQpID8gc3RhcnQuYW5jaG9yIDogc3RhcnQuaGVhZDtcbiAgICAgICAgdmFyIHNlbGVjdGlvbkVuZCA9IGN1cnNvcklzQmVmb3JlKGVuZC5hbmNob3IsIGVuZC5oZWFkKSA/IGVuZC5oZWFkIDogZW5kLmFuY2hvcjtcbiAgICAgICAgcmV0dXJuIFtzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kXTtcbiAgICAgIH07XG4gICAgICB2YXIgZ2V0TGFzdFNlbGVjdGVkQXJlYVJhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxlY3Rpb25TdGFydCA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICB2YXIgc2VsZWN0aW9uRW5kID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgIHZhciBibG9jayA9IGxhc3RTZWxlY3Rpb24udmlzdWFsQmxvY2s7XG4gICAgICAgIGlmIChibG9jaykge1xuICAgICAgICAgIHZhciB3aWR0aCA9IGJsb2NrLndpZHRoO1xuICAgICAgICAgIHZhciBoZWlnaHQgPSBibG9jay5oZWlnaHQ7XG4gICAgICAgICAgc2VsZWN0aW9uRW5kID0gbmV3IFBvcyhzZWxlY3Rpb25TdGFydC5saW5lICsgaGVpZ2h0LCBzZWxlY3Rpb25TdGFydC5jaCArIHdpZHRoKTtcbiAgICAgICAgICB2YXIgc2VsZWN0aW9ucyA9IFtdO1xuICAgICAgICAgIC8vIHNlbGVjdEJsb2NrIGNyZWF0ZXMgYSAncHJvcGVyJyByZWN0YW5ndWxhciBibG9jay5cbiAgICAgICAgICAvLyBXZSBkbyBub3Qgd2FudCB0aGF0IGluIGFsbCBjYXNlcywgc28gd2UgbWFudWFsbHkgc2V0IHNlbGVjdGlvbnMuXG4gICAgICAgICAgZm9yICh2YXIgaSA9IHNlbGVjdGlvblN0YXJ0LmxpbmU7IGkgPCBzZWxlY3Rpb25FbmQubGluZTsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYW5jaG9yID0gbmV3IFBvcyhpLCBzZWxlY3Rpb25TdGFydC5jaCk7XG4gICAgICAgICAgICB2YXIgaGVhZCA9IG5ldyBQb3MoaSwgc2VsZWN0aW9uRW5kLmNoKTtcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHthbmNob3I6IGFuY2hvciwgaGVhZDogaGVhZH07XG4gICAgICAgICAgICBzZWxlY3Rpb25zLnB1c2gocmFuZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjbS5zZXRTZWxlY3Rpb25zKHNlbGVjdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBzdGFydCA9IGxhc3RTZWxlY3Rpb24uYW5jaG9yTWFyay5maW5kKCk7XG4gICAgICAgICAgdmFyIGVuZCA9IGxhc3RTZWxlY3Rpb24uaGVhZE1hcmsuZmluZCgpO1xuICAgICAgICAgIHZhciBsaW5lID0gZW5kLmxpbmUgLSBzdGFydC5saW5lO1xuICAgICAgICAgIHZhciBjaCA9IGVuZC5jaCAtIHN0YXJ0LmNoO1xuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IHtsaW5lOiBzZWxlY3Rpb25FbmQubGluZSArIGxpbmUsIGNoOiBsaW5lID8gc2VsZWN0aW9uRW5kLmNoIDogY2ggKyBzZWxlY3Rpb25FbmQuY2h9O1xuICAgICAgICAgIGlmIChsYXN0U2VsZWN0aW9uLnZpc3VhbExpbmUpIHtcbiAgICAgICAgICAgIHNlbGVjdGlvblN0YXJ0ID0gbmV3IFBvcyhzZWxlY3Rpb25TdGFydC5saW5lLCAwKTtcbiAgICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IG5ldyBQb3Moc2VsZWN0aW9uRW5kLmxpbmUsIGxpbmVMZW5ndGgoY20sIHNlbGVjdGlvbkVuZC5saW5lKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNtLnNldFNlbGVjdGlvbihzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3NlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmRdO1xuICAgICAgfTtcbiAgICAgIGlmICghdmltLnZpc3VhbE1vZGUpIHtcbiAgICAgIC8vIEluIGNhc2Ugb2YgcmVwbGF5aW5nIHRoZSBhY3Rpb24uXG4gICAgICAgIHJldHVybiBnZXRMYXN0U2VsZWN0ZWRBcmVhUmFuZ2UoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBnZXRDdXJyZW50U2VsZWN0ZWRBcmVhUmFuZ2UoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gVXBkYXRlcyB0aGUgcHJldmlvdXMgc2VsZWN0aW9uIHdpdGggdGhlIGN1cnJlbnQgc2VsZWN0aW9uJ3MgdmFsdWVzLiBUaGlzXG4gICAgLy8gc2hvdWxkIG9ubHkgYmUgY2FsbGVkIGluIHZpc3VhbCBtb2RlLlxuICAgIGZ1bmN0aW9uIHVwZGF0ZUxhc3RTZWxlY3Rpb24oY20sIHZpbSkge1xuICAgICAgdmFyIGFuY2hvciA9IHZpbS5zZWwuYW5jaG9yO1xuICAgICAgdmFyIGhlYWQgPSB2aW0uc2VsLmhlYWQ7XG4gICAgICAvLyBUbyBhY2NvbW1vZGF0ZSB0aGUgZWZmZWN0IG9mIGxhc3RQYXN0ZWRUZXh0IGluIHRoZSBsYXN0IHNlbGVjdGlvblxuICAgICAgaWYgKHZpbS5sYXN0UGFzdGVkVGV4dCkge1xuICAgICAgICBoZWFkID0gY20ucG9zRnJvbUluZGV4KGNtLmluZGV4RnJvbVBvcyhhbmNob3IpICsgdmltLmxhc3RQYXN0ZWRUZXh0Lmxlbmd0aCk7XG4gICAgICAgIHZpbS5sYXN0UGFzdGVkVGV4dCA9IG51bGw7XG4gICAgICB9XG4gICAgICB2aW0ubGFzdFNlbGVjdGlvbiA9IHsnYW5jaG9yTWFyayc6IGNtLnNldEJvb2ttYXJrKGFuY2hvciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnaGVhZE1hcmsnOiBjbS5zZXRCb29rbWFyayhoZWFkKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICdhbmNob3InOiBjb3B5Q3Vyc29yKGFuY2hvciksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnaGVhZCc6IGNvcHlDdXJzb3IoaGVhZCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndmlzdWFsTW9kZSc6IHZpbS52aXN1YWxNb2RlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Zpc3VhbExpbmUnOiB2aW0udmlzdWFsTGluZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd2aXN1YWxCbG9jayc6IHZpbS52aXN1YWxCbG9ja307XG4gICAgfVxuICAgIGZ1bmN0aW9uIGV4cGFuZFNlbGVjdGlvbihjbSwgc3RhcnQsIGVuZCwgbW92ZSkge1xuICAgICAgdmFyIHNlbCA9IGNtLnN0YXRlLnZpbS5zZWw7XG4gICAgICB2YXIgaGVhZCA9IG1vdmUgPyBzdGFydDogc2VsLmhlYWQ7XG4gICAgICB2YXIgYW5jaG9yID0gbW92ZSA/IHN0YXJ0OiBzZWwuYW5jaG9yO1xuICAgICAgdmFyIHRtcDtcbiAgICAgIGlmIChjdXJzb3JJc0JlZm9yZShlbmQsIHN0YXJ0KSkge1xuICAgICAgICB0bXAgPSBlbmQ7XG4gICAgICAgIGVuZCA9IHN0YXJ0O1xuICAgICAgICBzdGFydCA9IHRtcDtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJzb3JJc0JlZm9yZShoZWFkLCBhbmNob3IpKSB7XG4gICAgICAgIGhlYWQgPSBjdXJzb3JNaW4oc3RhcnQsIGhlYWQpO1xuICAgICAgICBhbmNob3IgPSBjdXJzb3JNYXgoYW5jaG9yLCBlbmQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYW5jaG9yID0gY3Vyc29yTWluKHN0YXJ0LCBhbmNob3IpO1xuICAgICAgICBoZWFkID0gY3Vyc29yTWF4KGhlYWQsIGVuZCk7XG4gICAgICAgIGhlYWQgPSBvZmZzZXRDdXJzb3IoaGVhZCwgMCwgLTEpO1xuICAgICAgICBpZiAoaGVhZC5jaCA9PSAtMSAmJiBoZWFkLmxpbmUgIT0gY20uZmlyc3RMaW5lKCkpIHtcbiAgICAgICAgICBoZWFkID0gbmV3IFBvcyhoZWFkLmxpbmUgLSAxLCBsaW5lTGVuZ3RoKGNtLCBoZWFkLmxpbmUgLSAxKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBbYW5jaG9yLCBoZWFkXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgQ29kZU1pcnJvciBzZWxlY3Rpb24gdG8gbWF0Y2ggdGhlIHByb3ZpZGVkIHZpbSBzZWxlY3Rpb24uXG4gICAgICogSWYgbm8gYXJndW1lbnRzIGFyZSBnaXZlbiwgaXQgdXNlcyB0aGUgY3VycmVudCB2aW0gc2VsZWN0aW9uIHN0YXRlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZUNtU2VsZWN0aW9uKGNtLCBzZWwsIG1vZGUpIHtcbiAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICBzZWwgPSBzZWwgfHwgdmltLnNlbDtcbiAgICAgIHZhciBtb2RlID0gbW9kZSB8fFxuICAgICAgICB2aW0udmlzdWFsTGluZSA/ICdsaW5lJyA6IHZpbS52aXN1YWxCbG9jayA/ICdibG9jaycgOiAnY2hhcic7XG4gICAgICB2YXIgY21TZWwgPSBtYWtlQ21TZWxlY3Rpb24oY20sIHNlbCwgbW9kZSk7XG4gICAgICBjbS5zZXRTZWxlY3Rpb25zKGNtU2VsLnJhbmdlcywgY21TZWwucHJpbWFyeSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1ha2VDbVNlbGVjdGlvbihjbSwgc2VsLCBtb2RlLCBleGNsdXNpdmUpIHtcbiAgICAgIHZhciBoZWFkID0gY29weUN1cnNvcihzZWwuaGVhZCk7XG4gICAgICB2YXIgYW5jaG9yID0gY29weUN1cnNvcihzZWwuYW5jaG9yKTtcbiAgICAgIGlmIChtb2RlID09ICdjaGFyJykge1xuICAgICAgICB2YXIgaGVhZE9mZnNldCA9ICFleGNsdXNpdmUgJiYgIWN1cnNvcklzQmVmb3JlKHNlbC5oZWFkLCBzZWwuYW5jaG9yKSA/IDEgOiAwO1xuICAgICAgICB2YXIgYW5jaG9yT2Zmc2V0ID0gY3Vyc29ySXNCZWZvcmUoc2VsLmhlYWQsIHNlbC5hbmNob3IpID8gMSA6IDA7XG4gICAgICAgIGhlYWQgPSBvZmZzZXRDdXJzb3Ioc2VsLmhlYWQsIDAsIGhlYWRPZmZzZXQpO1xuICAgICAgICBhbmNob3IgPSBvZmZzZXRDdXJzb3Ioc2VsLmFuY2hvciwgMCwgYW5jaG9yT2Zmc2V0KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByYW5nZXM6IFt7YW5jaG9yOiBhbmNob3IsIGhlYWQ6IGhlYWR9XSxcbiAgICAgICAgICBwcmltYXJ5OiAwXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKG1vZGUgPT0gJ2xpbmUnKSB7XG4gICAgICAgIGlmICghY3Vyc29ySXNCZWZvcmUoc2VsLmhlYWQsIHNlbC5hbmNob3IpKSB7XG4gICAgICAgICAgYW5jaG9yLmNoID0gMDtcblxuICAgICAgICAgIHZhciBsYXN0TGluZSA9IGNtLmxhc3RMaW5lKCk7XG4gICAgICAgICAgaWYgKGhlYWQubGluZSA+IGxhc3RMaW5lKSB7XG4gICAgICAgICAgICBoZWFkLmxpbmUgPSBsYXN0TGluZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaGVhZC5jaCA9IGxpbmVMZW5ndGgoY20sIGhlYWQubGluZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGVhZC5jaCA9IDA7XG4gICAgICAgICAgYW5jaG9yLmNoID0gbGluZUxlbmd0aChjbSwgYW5jaG9yLmxpbmUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcmFuZ2VzOiBbe2FuY2hvcjogYW5jaG9yLCBoZWFkOiBoZWFkfV0sXG4gICAgICAgICAgcHJpbWFyeTogMFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChtb2RlID09ICdibG9jaycpIHtcbiAgICAgICAgdmFyIHRvcCA9IE1hdGgubWluKGFuY2hvci5saW5lLCBoZWFkLmxpbmUpLFxuICAgICAgICAgICAgZnJvbUNoID0gYW5jaG9yLmNoLFxuICAgICAgICAgICAgYm90dG9tID0gTWF0aC5tYXgoYW5jaG9yLmxpbmUsIGhlYWQubGluZSksXG4gICAgICAgICAgICB0b0NoID0gaGVhZC5jaDtcbiAgICAgICAgaWYgKGZyb21DaCA8IHRvQ2gpIHsgdG9DaCArPSAxIH1cbiAgICAgICAgZWxzZSB7IGZyb21DaCArPSAxIH07XG4gICAgICAgIHZhciBoZWlnaHQgPSBib3R0b20gLSB0b3AgKyAxO1xuICAgICAgICB2YXIgcHJpbWFyeSA9IGhlYWQubGluZSA9PSB0b3AgPyAwIDogaGVpZ2h0IC0gMTtcbiAgICAgICAgdmFyIHJhbmdlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhlaWdodDsgaSsrKSB7XG4gICAgICAgICAgcmFuZ2VzLnB1c2goe1xuICAgICAgICAgICAgYW5jaG9yOiBuZXcgUG9zKHRvcCArIGksIGZyb21DaCksXG4gICAgICAgICAgICBoZWFkOiBuZXcgUG9zKHRvcCArIGksIHRvQ2gpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByYW5nZXM6IHJhbmdlcyxcbiAgICAgICAgICBwcmltYXJ5OiBwcmltYXJ5XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEhlYWQoY20pIHtcbiAgICAgIHZhciBjdXIgPSBjbS5nZXRDdXJzb3IoJ2hlYWQnKTtcbiAgICAgIGlmIChjbS5nZXRTZWxlY3Rpb24oKS5sZW5ndGggPT0gMSkge1xuICAgICAgICAvLyBTbWFsbCBjb3JuZXIgY2FzZSB3aGVuIG9ubHkgMSBjaGFyYWN0ZXIgaXMgc2VsZWN0ZWQuIFRoZSBcInJlYWxcIlxuICAgICAgICAvLyBoZWFkIGlzIHRoZSBsZWZ0IG9mIGhlYWQgYW5kIGFuY2hvci5cbiAgICAgICAgY3VyID0gY3Vyc29yTWluKGN1ciwgY20uZ2V0Q3Vyc29yKCdhbmNob3InKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY3VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIG1vdmVIZWFkIGlzIHNldCB0byBmYWxzZSwgdGhlIENvZGVNaXJyb3Igc2VsZWN0aW9uIHdpbGwgbm90IGJlXG4gICAgICogdG91Y2hlZC4gVGhlIGNhbGxlciBhc3N1bWVzIHRoZSByZXNwb25zaWJpbGl0eSBvZiBwdXR0aW5nIHRoZSBjdXJzb3JcbiAgICAqIGluIHRoZSByaWdodCBwbGFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBleGl0VmlzdWFsTW9kZShjbSwgbW92ZUhlYWQpIHtcbiAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICBpZiAobW92ZUhlYWQgIT09IGZhbHNlKSB7XG4gICAgICAgIGNtLnNldEN1cnNvcihjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCB2aW0uc2VsLmhlYWQpKTtcbiAgICAgIH1cbiAgICAgIHVwZGF0ZUxhc3RTZWxlY3Rpb24oY20sIHZpbSk7XG4gICAgICB2aW0udmlzdWFsTW9kZSA9IGZhbHNlO1xuICAgICAgdmltLnZpc3VhbExpbmUgPSBmYWxzZTtcbiAgICAgIHZpbS52aXN1YWxCbG9jayA9IGZhbHNlO1xuICAgICAgaWYgKCF2aW0uaW5zZXJ0TW9kZSkgQ29kZU1pcnJvci5zaWduYWwoY20sIFwidmltLW1vZGUtY2hhbmdlXCIsIHttb2RlOiBcIm5vcm1hbFwifSk7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFueSB0cmFpbGluZyBuZXdsaW5lcyBmcm9tIHRoZSBzZWxlY3Rpb24uIEZvclxuICAgIC8vIGV4YW1wbGUsIHdpdGggdGhlIGNhcmV0IGF0IHRoZSBzdGFydCBvZiB0aGUgbGFzdCB3b3JkIG9uIHRoZSBsaW5lLFxuICAgIC8vICdkdycgc2hvdWxkIHdvcmQsIGJ1dCBub3QgdGhlIG5ld2xpbmUsIHdoaWxlICd3JyBzaG91bGQgYWR2YW5jZSB0aGVcbiAgICAvLyBjYXJldCB0byB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBuZXh0IGxpbmUuXG4gICAgZnVuY3Rpb24gY2xpcFRvTGluZShjbSwgY3VyU3RhcnQsIGN1ckVuZCkge1xuICAgICAgdmFyIHNlbGVjdGlvbiA9IGNtLmdldFJhbmdlKGN1clN0YXJ0LCBjdXJFbmQpO1xuICAgICAgLy8gT25seSBjbGlwIGlmIHRoZSBzZWxlY3Rpb24gZW5kcyB3aXRoIHRyYWlsaW5nIG5ld2xpbmUgKyB3aGl0ZXNwYWNlXG4gICAgICBpZiAoL1xcblxccyokLy50ZXN0KHNlbGVjdGlvbikpIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc2VsZWN0aW9uLnNwbGl0KCdcXG4nKTtcbiAgICAgICAgLy8gV2Uga25vdyB0aGlzIGlzIGFsbCB3aGl0ZXNwYWNlLlxuICAgICAgICBsaW5lcy5wb3AoKTtcblxuICAgICAgICAvLyBDYXNlczpcbiAgICAgICAgLy8gMS4gTGFzdCB3b3JkIGlzIGFuIGVtcHR5IGxpbmUgLSBkbyBub3QgY2xpcCB0aGUgdHJhaWxpbmcgJ1xcbidcbiAgICAgICAgLy8gMi4gTGFzdCB3b3JkIGlzIG5vdCBhbiBlbXB0eSBsaW5lIC0gY2xpcCB0aGUgdHJhaWxpbmcgJ1xcbidcbiAgICAgICAgdmFyIGxpbmU7XG4gICAgICAgIC8vIEZpbmQgdGhlIGxpbmUgY29udGFpbmluZyB0aGUgbGFzdCB3b3JkLCBhbmQgY2xpcCBhbGwgd2hpdGVzcGFjZSB1cFxuICAgICAgICAvLyB0byBpdC5cbiAgICAgICAgZm9yICh2YXIgbGluZSA9IGxpbmVzLnBvcCgpOyBsaW5lcy5sZW5ndGggPiAwICYmIGxpbmUgJiYgaXNXaGl0ZVNwYWNlU3RyaW5nKGxpbmUpOyBsaW5lID0gbGluZXMucG9wKCkpIHtcbiAgICAgICAgICBjdXJFbmQubGluZS0tO1xuICAgICAgICAgIGN1ckVuZC5jaCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIGxhc3Qgd29yZCBpcyBub3QgYW4gZW1wdHkgbGluZSwgY2xpcCBhbiBhZGRpdGlvbmFsIG5ld2xpbmVcbiAgICAgICAgaWYgKGxpbmUpIHtcbiAgICAgICAgICBjdXJFbmQubGluZS0tO1xuICAgICAgICAgIGN1ckVuZC5jaCA9IGxpbmVMZW5ndGgoY20sIGN1ckVuZC5saW5lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdXJFbmQuY2ggPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRXhwYW5kIHRoZSBzZWxlY3Rpb24gdG8gbGluZSBlbmRzLlxuICAgIGZ1bmN0aW9uIGV4cGFuZFNlbGVjdGlvblRvTGluZShfY20sIGN1clN0YXJ0LCBjdXJFbmQpIHtcbiAgICAgIGN1clN0YXJ0LmNoID0gMDtcbiAgICAgIGN1ckVuZC5jaCA9IDA7XG4gICAgICBjdXJFbmQubGluZSsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmRGaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIodGV4dCkge1xuICAgICAgaWYgKCF0ZXh0KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgdmFyIGZpcnN0Tm9uV1MgPSB0ZXh0LnNlYXJjaCgvXFxTLyk7XG4gICAgICByZXR1cm4gZmlyc3ROb25XUyA9PSAtMSA/IHRleHQubGVuZ3RoIDogZmlyc3ROb25XUztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHBhbmRXb3JkVW5kZXJDdXJzb3IoY20sIHtpbmNsdXNpdmUsIGlubmVyV29yZCwgYmlnV29yZCwgbm9TeW1ib2wsIG11bHRpbGluZX0sIGN1cnNvcikge1xuICAgICAgdmFyIGN1ciA9IGN1cnNvciB8fCBnZXRIZWFkKGNtKTtcbiAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShjdXIubGluZSk7XG4gICAgICB2YXIgZW5kTGluZSA9IGxpbmU7XG4gICAgICB2YXIgc3RhcnRMaW5lTnVtYmVyID0gY3VyLmxpbmVcbiAgICAgIHZhciBlbmRMaW5lTnVtYmVyID0gc3RhcnRMaW5lTnVtYmVyO1xuICAgICAgdmFyIGlkeCA9IGN1ci5jaDtcblxuICAgICAgdmFyIHdvcmRPbk5leHRMaW5lO1xuICAgICAgLy8gU2VlayB0byBmaXJzdCB3b3JkIG9yIG5vbi13aGl0ZXNwYWNlIGNoYXJhY3RlciwgZGVwZW5kaW5nIG9uIGlmXG4gICAgICAvLyBub1N5bWJvbCBpcyB0cnVlLlxuICAgICAgdmFyIHRlc3QgPSBub1N5bWJvbCA/IHdvcmRDaGFyVGVzdFswXSA6IGJpZ1dvcmRDaGFyVGVzdCBbMF07XG4gICAgICBpZiAoaW5uZXJXb3JkICYmIC9cXHMvLnRlc3QobGluZS5jaGFyQXQoaWR4KSkpIHtcbiAgICAgICAgdGVzdCA9IGZ1bmN0aW9uKGNoKSB7IHJldHVybiAvXFxzLy50ZXN0KGNoKTsgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdoaWxlICghdGVzdChsaW5lLmNoYXJBdChpZHgpKSkge1xuICAgICAgICAgIGlkeCsrO1xuICAgICAgICAgIGlmIChpZHggPj0gbGluZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICghbXVsdGlsaW5lKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIGlkeC0tO1xuICAgICAgICAgICAgd29yZE9uTmV4dExpbmUgPSBmaW5kV29yZChjbSwgY3VyLCB0cnVlLCBiaWdXb3JkLCB0cnVlKTtcbiAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGJpZ1dvcmQpIHtcbiAgICAgICAgICB0ZXN0ID0gYmlnV29yZENoYXJUZXN0WzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRlc3QgPSB3b3JkQ2hhclRlc3RbMF07XG4gICAgICAgICAgaWYgKCF0ZXN0KGxpbmUuY2hhckF0KGlkeCkpKSB7XG4gICAgICAgICAgICB0ZXN0ID0gd29yZENoYXJUZXN0WzFdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgZW5kID0gaWR4LCBzdGFydCA9IGlkeDtcbiAgICAgIHdoaWxlICh0ZXN0KGxpbmUuY2hhckF0KHN0YXJ0KSkgJiYgc3RhcnQgPj0gMCkgeyBzdGFydC0tOyB9XG4gICAgICBzdGFydCsrO1xuICAgICAgaWYgKHdvcmRPbk5leHRMaW5lKSB7XG4gICAgICAgIGVuZCA9IHdvcmRPbk5leHRMaW5lLnRvO1xuICAgICAgICBlbmRMaW5lTnVtYmVyID0gd29yZE9uTmV4dExpbmUubGluZTtcbiAgICAgICAgZW5kTGluZSA9IGNtLmdldExpbmUoZW5kTGluZU51bWJlcik7XG4gICAgICAgIGlmICghZW5kTGluZSAmJiBlbmQgPT0gMCkgZW5kKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aGlsZSAodGVzdChsaW5lLmNoYXJBdChlbmQpKSAmJiBlbmQgPCBsaW5lLmxlbmd0aCkgeyBlbmQrKzsgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaW5jbHVzaXZlKSB7XG4gICAgICAgIC8vIElmIHByZXNlbnQsIGluY2x1ZGUgYWxsIHdoaXRlc3BhY2UgYWZ0ZXIgd29yZC5cbiAgICAgICAgLy8gT3RoZXJ3aXNlLCBpbmNsdWRlIGFsbCB3aGl0ZXNwYWNlIGJlZm9yZSB3b3JkLCBleGNlcHQgaW5kZW50YXRpb24uXG4gICAgICAgIHZhciB3b3JkRW5kID0gZW5kO1xuICAgICAgICB2YXIgc3RhcnRzV2l0aFNwYWNlID0gY3VyLmNoIDw9IHN0YXJ0ICYmIC9cXHMvLnRlc3QobGluZS5jaGFyQXQoY3VyLmNoKSk7XG4gICAgICAgIGlmICghc3RhcnRzV2l0aFNwYWNlKSB7XG4gICAgICAgICAgd2hpbGUgKC9cXHMvLnRlc3QoZW5kTGluZS5jaGFyQXQoZW5kKSkgJiYgZW5kIDwgZW5kTGluZS5sZW5ndGgpIHsgZW5kKys7IH1cbiAgICAgICAgfVxuICAgICAgICBpZiAod29yZEVuZCA9PSBlbmQgfHwgc3RhcnRzV2l0aFNwYWNlKSB7XG4gICAgICAgICAgdmFyIHdvcmRTdGFydCA9IHN0YXJ0O1xuICAgICAgICAgIHdoaWxlICgvXFxzLy50ZXN0KGxpbmUuY2hhckF0KHN0YXJ0IC0gMSkpICYmIHN0YXJ0ID4gMCkgeyBzdGFydC0tOyB9XG4gICAgICAgICAgaWYgKCFzdGFydCAmJiAhc3RhcnRzV2l0aFNwYWNlKSB7IHN0YXJ0ID0gd29yZFN0YXJ0OyB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgc3RhcnQ6IG5ldyBQb3Moc3RhcnRMaW5lTnVtYmVyLCBzdGFydCksIGVuZDogbmV3IFBvcyhlbmRMaW5lTnVtYmVyLCBlbmQpIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVwZW5kcyBvbiB0aGUgZm9sbG93aW5nOlxuICAgICAqXG4gICAgICogLSBlZGl0b3IgbW9kZSBzaG91bGQgYmUgaHRtbG1peGVkbW9kZSAvIHhtbFxuICAgICAqIC0gbW9kZS94bWwveG1sLmpzIHNob3VsZCBiZSBsb2FkZWRcbiAgICAgKiAtIGFkZG9uL2ZvbGQveG1sLWZvbGQuanMgc2hvdWxkIGJlIGxvYWRlZFxuICAgICAqXG4gICAgICogSWYgYW55IG9mIHRoZSBhYm92ZSByZXF1aXJlbWVudHMgYXJlIG5vdCB0cnVlLCB0aGlzIGZ1bmN0aW9uIG5vb3BzLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBfTk9UXyBhIDEwMCUgYWNjdXJhdGUgaW1wbGVtZW50YXRpb24gb2YgdmltIHRhZyB0ZXh0IG9iamVjdHMuXG4gICAgICogVGhlIGZvbGxvd2luZyBjYXZlYXRzIGFwcGx5IChiYXNlZCBvZmYgY3Vyc29yeSB0ZXN0aW5nLCBJJ20gc3VyZSB0aGVyZVxuICAgICAqIGFyZSBvdGhlciBkaXNjcmVwYW5jaWVzKTpcbiAgICAgKlxuICAgICAqIC0gRG9lcyBub3Qgd29yayBpbnNpZGUgY29tbWVudHM6XG4gICAgICogICBgYGBcbiAgICAgKiAgIDwhLS0gPGRpdj5icm9rZW48L2Rpdj4gLS0+XG4gICAgICogICBgYGBcbiAgICAgKiAtIERvZXMgbm90IHdvcmsgd2hlbiB0YWdzIGhhdmUgZGlmZmVyZW50IGNhc2VzOlxuICAgICAqICAgYGBgXG4gICAgICogICA8ZGl2PmJyb2tlbjwvRElWPlxuICAgICAqICAgYGBgXG4gICAgICogLSBEb2VzIG5vdCB3b3JrIHdoZW4gY3Vyc29yIGlzIGluc2lkZSBhIGJyb2tlbiB0YWc6XG4gICAgICogICBgYGBcbiAgICAgKiAgIDxkaXY+PGJyb2s+PGVuPjwvZGl2PlxuICAgICAqICAgYGBgXG4gICAgICovXG4gICAgZnVuY3Rpb24gZXhwYW5kVGFnVW5kZXJDdXJzb3IoY20sIGhlYWQsIGluY2x1c2l2ZSkge1xuICAgICAgdmFyIGN1ciA9IGhlYWQ7XG4gICAgICBpZiAoIUNvZGVNaXJyb3IuZmluZE1hdGNoaW5nVGFnIHx8ICFDb2RlTWlycm9yLmZpbmRFbmNsb3NpbmdUYWcpIHtcbiAgICAgICAgcmV0dXJuIHsgc3RhcnQ6IGN1ciwgZW5kOiBjdXIgfTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhZ3MgPSBDb2RlTWlycm9yLmZpbmRNYXRjaGluZ1RhZyhjbSwgaGVhZCkgfHwgQ29kZU1pcnJvci5maW5kRW5jbG9zaW5nVGFnKGNtLCBoZWFkKTtcbiAgICAgIGlmICghdGFncyB8fCAhdGFncy5vcGVuIHx8ICF0YWdzLmNsb3NlKSB7XG4gICAgICAgIHJldHVybiB7IHN0YXJ0OiBjdXIsIGVuZDogY3VyIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChpbmNsdXNpdmUpIHtcbiAgICAgICAgcmV0dXJuIHsgc3RhcnQ6IHRhZ3Mub3Blbi5mcm9tLCBlbmQ6IHRhZ3MuY2xvc2UudG8gfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IHN0YXJ0OiB0YWdzLm9wZW4udG8sIGVuZDogdGFncy5jbG9zZS5mcm9tIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVjb3JkSnVtcFBvc2l0aW9uKGNtLCBvbGRDdXIsIG5ld0N1cikge1xuICAgICAgaWYgKCFjdXJzb3JFcXVhbChvbGRDdXIsIG5ld0N1cikpIHtcbiAgICAgICAgdmltR2xvYmFsU3RhdGUuanVtcExpc3QuYWRkKGNtLCBvbGRDdXIsIG5ld0N1cik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVjb3JkTGFzdENoYXJhY3RlclNlYXJjaChpbmNyZW1lbnQsIGFyZ3MpIHtcbiAgICAgICAgdmltR2xvYmFsU3RhdGUubGFzdENoYXJhY3RlclNlYXJjaC5pbmNyZW1lbnQgPSBpbmNyZW1lbnQ7XG4gICAgICAgIHZpbUdsb2JhbFN0YXRlLmxhc3RDaGFyYWN0ZXJTZWFyY2guZm9yd2FyZCA9IGFyZ3MuZm9yd2FyZDtcbiAgICAgICAgdmltR2xvYmFsU3RhdGUubGFzdENoYXJhY3RlclNlYXJjaC5zZWxlY3RlZENoYXJhY3RlciA9IGFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXI7XG4gICAgfVxuXG4gICAgdmFyIHN5bWJvbFRvTW9kZSA9IHtcbiAgICAgICAgJygnOiAnYnJhY2tldCcsICcpJzogJ2JyYWNrZXQnLCAneyc6ICdicmFja2V0JywgJ30nOiAnYnJhY2tldCcsXG4gICAgICAgICdbJzogJ3NlY3Rpb24nLCAnXSc6ICdzZWN0aW9uJyxcbiAgICAgICAgJyonOiAnY29tbWVudCcsICcvJzogJ2NvbW1lbnQnLFxuICAgICAgICAnbSc6ICdtZXRob2QnLCAnTSc6ICdtZXRob2QnLFxuICAgICAgICAnIyc6ICdwcmVwcm9jZXNzJ1xuICAgIH07XG4gICAgdmFyIGZpbmRTeW1ib2xNb2RlcyA9IHtcbiAgICAgIGJyYWNrZXQ6IHtcbiAgICAgICAgaXNDb21wbGV0ZTogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgICBpZiAoc3RhdGUubmV4dENoID09PSBzdGF0ZS5zeW1iKSB7XG4gICAgICAgICAgICBzdGF0ZS5kZXB0aCsrO1xuICAgICAgICAgICAgaWYgKHN0YXRlLmRlcHRoID49IDEpcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChzdGF0ZS5uZXh0Q2ggPT09IHN0YXRlLnJldmVyc2VTeW1iKSB7XG4gICAgICAgICAgICBzdGF0ZS5kZXB0aC0tO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZWN0aW9uOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgc3RhdGUuY3VyTW92ZVRocm91Z2ggPSB0cnVlO1xuICAgICAgICAgIHN0YXRlLnN5bWIgPSAoc3RhdGUuZm9yd2FyZCA/ICddJyA6ICdbJykgPT09IHN0YXRlLnN5bWIgPyAneycgOiAnfSc7XG4gICAgICAgIH0sXG4gICAgICAgIGlzQ29tcGxldGU6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlLmluZGV4ID09PSAwICYmIHN0YXRlLm5leHRDaCA9PT0gc3RhdGUuc3ltYjtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbW1lbnQ6IHtcbiAgICAgICAgaXNDb21wbGV0ZTogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgICB2YXIgZm91bmQgPSBzdGF0ZS5sYXN0Q2ggPT09ICcqJyAmJiBzdGF0ZS5uZXh0Q2ggPT09ICcvJztcbiAgICAgICAgICBzdGF0ZS5sYXN0Q2ggPSBzdGF0ZS5uZXh0Q2g7XG4gICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gVE9ETzogVGhlIG9yaWdpbmFsIFZpbSBpbXBsZW1lbnRhdGlvbiBvbmx5IG9wZXJhdGVzIG9uIGxldmVsIDEgYW5kIDIuXG4gICAgICAvLyBUaGUgY3VycmVudCBpbXBsZW1lbnRhdGlvbiBkb2Vzbid0IGNoZWNrIGZvciBjb2RlIGJsb2NrIGxldmVsIGFuZFxuICAgICAgLy8gdGhlcmVmb3JlIGl0IG9wZXJhdGVzIG9uIGFueSBsZXZlbHMuXG4gICAgICBtZXRob2Q6IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgICBzdGF0ZS5zeW1iID0gKHN0YXRlLnN5bWIgPT09ICdtJyA/ICd7JyA6ICd9Jyk7XG4gICAgICAgICAgc3RhdGUucmV2ZXJzZVN5bWIgPSBzdGF0ZS5zeW1iID09PSAneycgPyAnfScgOiAneyc7XG4gICAgICAgIH0sXG4gICAgICAgIGlzQ29tcGxldGU6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgaWYgKHN0YXRlLm5leHRDaCA9PT0gc3RhdGUuc3ltYilyZXR1cm4gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwcmVwcm9jZXNzOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgc3RhdGUuaW5kZXggPSAwO1xuICAgICAgICB9LFxuICAgICAgICBpc0NvbXBsZXRlOiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgICAgIGlmIChzdGF0ZS5uZXh0Q2ggPT09ICcjJykge1xuICAgICAgICAgICAgdmFyIHRva2VuID0gc3RhdGUubGluZVRleHQubWF0Y2goL14jKFxcdyspLylbMV07XG4gICAgICAgICAgICBpZiAodG9rZW4gPT09ICdlbmRpZicpIHtcbiAgICAgICAgICAgICAgaWYgKHN0YXRlLmZvcndhcmQgJiYgc3RhdGUuZGVwdGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzdGF0ZS5kZXB0aCsrO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbiA9PT0gJ2lmJykge1xuICAgICAgICAgICAgICBpZiAoIXN0YXRlLmZvcndhcmQgJiYgc3RhdGUuZGVwdGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzdGF0ZS5kZXB0aC0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRva2VuID09PSAnZWxzZScgJiYgc3RhdGUuZGVwdGggPT09IDApcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgZnVuY3Rpb24gZmluZFN5bWJvbChjbSwgcmVwZWF0LCBmb3J3YXJkLCBzeW1iKSB7XG4gICAgICB2YXIgY3VyID0gY29weUN1cnNvcihjbS5nZXRDdXJzb3IoKSk7XG4gICAgICB2YXIgaW5jcmVtZW50ID0gZm9yd2FyZCA/IDEgOiAtMTtcbiAgICAgIHZhciBlbmRMaW5lID0gZm9yd2FyZCA/IGNtLmxpbmVDb3VudCgpIDogLTE7XG4gICAgICB2YXIgY3VyQ2ggPSBjdXIuY2g7XG4gICAgICB2YXIgbGluZSA9IGN1ci5saW5lO1xuICAgICAgdmFyIGxpbmVUZXh0ID0gY20uZ2V0TGluZShsaW5lKTtcbiAgICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgICAgbGluZVRleHQ6IGxpbmVUZXh0LFxuICAgICAgICBuZXh0Q2g6IGxpbmVUZXh0LmNoYXJBdChjdXJDaCksXG4gICAgICAgIGxhc3RDaDogbnVsbCxcbiAgICAgICAgaW5kZXg6IGN1ckNoLFxuICAgICAgICBzeW1iOiBzeW1iLFxuICAgICAgICByZXZlcnNlU3ltYjogKGZvcndhcmQgPyAgeyAnKSc6ICcoJywgJ30nOiAneycgfSA6IHsgJygnOiAnKScsICd7JzogJ30nIH0pW3N5bWJdLFxuICAgICAgICBmb3J3YXJkOiBmb3J3YXJkLFxuICAgICAgICBkZXB0aDogMCxcbiAgICAgICAgY3VyTW92ZVRocm91Z2g6IGZhbHNlXG4gICAgICB9O1xuICAgICAgdmFyIG1vZGUgPSBzeW1ib2xUb01vZGVbc3ltYl07XG4gICAgICBpZiAoIW1vZGUpcmV0dXJuIGN1cjtcbiAgICAgIHZhciBpbml0ID0gZmluZFN5bWJvbE1vZGVzW21vZGVdLmluaXQ7XG4gICAgICB2YXIgaXNDb21wbGV0ZSA9IGZpbmRTeW1ib2xNb2Rlc1ttb2RlXS5pc0NvbXBsZXRlO1xuICAgICAgaWYgKGluaXQpIHsgaW5pdChzdGF0ZSk7IH1cbiAgICAgIHdoaWxlIChsaW5lICE9PSBlbmRMaW5lICYmIHJlcGVhdCkge1xuICAgICAgICBzdGF0ZS5pbmRleCArPSBpbmNyZW1lbnQ7XG4gICAgICAgIHN0YXRlLm5leHRDaCA9IHN0YXRlLmxpbmVUZXh0LmNoYXJBdChzdGF0ZS5pbmRleCk7XG4gICAgICAgIGlmICghc3RhdGUubmV4dENoKSB7XG4gICAgICAgICAgbGluZSArPSBpbmNyZW1lbnQ7XG4gICAgICAgICAgc3RhdGUubGluZVRleHQgPSBjbS5nZXRMaW5lKGxpbmUpIHx8ICcnO1xuICAgICAgICAgIGlmIChpbmNyZW1lbnQgPiAwKSB7XG4gICAgICAgICAgICBzdGF0ZS5pbmRleCA9IDA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBsaW5lTGVuID0gc3RhdGUubGluZVRleHQubGVuZ3RoO1xuICAgICAgICAgICAgc3RhdGUuaW5kZXggPSAobGluZUxlbiA+IDApID8gKGxpbmVMZW4tMSkgOiAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdGF0ZS5uZXh0Q2ggPSBzdGF0ZS5saW5lVGV4dC5jaGFyQXQoc3RhdGUuaW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0NvbXBsZXRlKHN0YXRlKSkge1xuICAgICAgICAgIGN1ci5saW5lID0gbGluZTtcbiAgICAgICAgICBjdXIuY2ggPSBzdGF0ZS5pbmRleDtcbiAgICAgICAgICByZXBlYXQtLTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN0YXRlLm5leHRDaCB8fCBzdGF0ZS5jdXJNb3ZlVGhyb3VnaCkge1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhsaW5lLCBzdGF0ZS5pbmRleCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY3VyO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogUmV0dXJucyB0aGUgYm91bmRhcmllcyBvZiB0aGUgbmV4dCB3b3JkLiBJZiB0aGUgY3Vyc29yIGluIHRoZSBtaWRkbGUgb2ZcbiAgICAgKiB0aGUgd29yZCwgdGhlbiByZXR1cm5zIHRoZSBib3VuZGFyaWVzIG9mIHRoZSBjdXJyZW50IHdvcmQsIHN0YXJ0aW5nIGF0XG4gICAgICogdGhlIGN1cnNvci4gSWYgdGhlIGN1cnNvciBpcyBhdCB0aGUgc3RhcnQvZW5kIG9mIGEgd29yZCwgYW5kIHdlIGFyZSBnb2luZ1xuICAgICAqIGZvcndhcmQvYmFja3dhcmQsIHJlc3BlY3RpdmVseSwgZmluZCB0aGUgYm91bmRhcmllcyBvZiB0aGUgbmV4dCB3b3JkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtDb2RlTWlycm9yfSBjbSBDb2RlTWlycm9yIG9iamVjdC5cbiAgICAgKiBAcGFyYW0ge0N1cnNvcn0gY3VyIFRoZSBjdXJzb3IgcG9zaXRpb24uXG4gICAgICogQHBhcmFtIHtib29sZWFufSBmb3J3YXJkIFRydWUgdG8gc2VhcmNoIGZvcndhcmQuIEZhbHNlIHRvIHNlYXJjaFxuICAgICAqICAgICBiYWNrd2FyZC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGJpZ1dvcmQgVHJ1ZSBpZiBwdW5jdHVhdGlvbiBjb3VudCBhcyBwYXJ0IG9mIHRoZSB3b3JkLlxuICAgICAqICAgICBGYWxzZSBpZiBvbmx5IFthLXpBLVowLTldIGNoYXJhY3RlcnMgY291bnQgYXMgcGFydCBvZiB0aGUgd29yZC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVtcHR5TGluZUlzV29yZCBUcnVlIGlmIGVtcHR5IGxpbmVzIHNob3VsZCBiZSB0cmVhdGVkXG4gICAgICogICAgIGFzIHdvcmRzLlxuICAgICAqIEByZXR1cm4ge09iamVjdHtmcm9tOm51bWJlciwgdG86bnVtYmVyLCBsaW5lOiBudW1iZXJ9fSBUaGUgYm91bmRhcmllcyBvZlxuICAgICAqICAgICB0aGUgd29yZCwgb3IgbnVsbCBpZiB0aGVyZSBhcmUgbm8gbW9yZSB3b3Jkcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmaW5kV29yZChjbSwgY3VyLCBmb3J3YXJkLCBiaWdXb3JkLCBlbXB0eUxpbmVJc1dvcmQpIHtcbiAgICAgIHZhciBsaW5lTnVtID0gY3VyLmxpbmU7XG4gICAgICB2YXIgcG9zID0gY3VyLmNoO1xuICAgICAgdmFyIGxpbmUgPSBjbS5nZXRMaW5lKGxpbmVOdW0pO1xuICAgICAgdmFyIGRpciA9IGZvcndhcmQgPyAxIDogLTE7XG4gICAgICB2YXIgY2hhclRlc3RzID0gYmlnV29yZCA/IGJpZ1dvcmRDaGFyVGVzdDogd29yZENoYXJUZXN0O1xuXG4gICAgICBpZiAoZW1wdHlMaW5lSXNXb3JkICYmIGxpbmUgPT0gJycpIHtcbiAgICAgICAgbGluZU51bSArPSBkaXI7XG4gICAgICAgIGxpbmUgPSBjbS5nZXRMaW5lKGxpbmVOdW0pO1xuICAgICAgICBpZiAoIWlzTGluZShjbSwgbGluZU51bSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBwb3MgPSAoZm9yd2FyZCkgPyAwIDogbGluZS5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGlmIChlbXB0eUxpbmVJc1dvcmQgJiYgbGluZSA9PSAnJykge1xuICAgICAgICAgIHJldHVybiB7IGZyb206IDAsIHRvOiAwLCBsaW5lOiBsaW5lTnVtIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0b3AgPSAoZGlyID4gMCkgPyBsaW5lLmxlbmd0aCA6IC0xO1xuICAgICAgICB2YXIgd29yZFN0YXJ0ID0gc3RvcCwgd29yZEVuZCA9IHN0b3A7XG4gICAgICAgIC8vIEZpbmQgYm91bmRzIG9mIG5leHQgd29yZC5cbiAgICAgICAgd2hpbGUgKHBvcyAhPSBzdG9wKSB7XG4gICAgICAgICAgdmFyIGZvdW5kV29yZCA9IGZhbHNlO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhclRlc3RzLmxlbmd0aCAmJiAhZm91bmRXb3JkOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChjaGFyVGVzdHNbaV0obGluZS5jaGFyQXQocG9zKSkpIHtcbiAgICAgICAgICAgICAgd29yZFN0YXJ0ID0gcG9zO1xuICAgICAgICAgICAgICAvLyBBZHZhbmNlIHRvIGVuZCBvZiB3b3JkLlxuICAgICAgICAgICAgICB3aGlsZSAocG9zICE9IHN0b3AgJiYgY2hhclRlc3RzW2ldKGxpbmUuY2hhckF0KHBvcykpKSB7XG4gICAgICAgICAgICAgICAgcG9zICs9IGRpcjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB3b3JkRW5kID0gcG9zO1xuICAgICAgICAgICAgICBmb3VuZFdvcmQgPSB3b3JkU3RhcnQgIT0gd29yZEVuZDtcbiAgICAgICAgICAgICAgaWYgKHdvcmRTdGFydCA9PSBjdXIuY2ggJiYgbGluZU51bSA9PSBjdXIubGluZSAmJlxuICAgICAgICAgICAgICAgICAgd29yZEVuZCA9PSB3b3JkU3RhcnQgKyBkaXIpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBzdGFydGVkIGF0IHRoZSBlbmQgb2YgYSB3b3JkLiBGaW5kIHRoZSBuZXh0IG9uZS5cbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgZnJvbTogTWF0aC5taW4od29yZFN0YXJ0LCB3b3JkRW5kICsgMSksXG4gICAgICAgICAgICAgICAgICB0bzogTWF0aC5tYXgod29yZFN0YXJ0LCB3b3JkRW5kKSxcbiAgICAgICAgICAgICAgICAgIGxpbmU6IGxpbmVOdW0gfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWZvdW5kV29yZCkge1xuICAgICAgICAgICAgcG9zICs9IGRpcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWR2YW5jZSB0byBuZXh0L3ByZXYgbGluZS5cbiAgICAgICAgbGluZU51bSArPSBkaXI7XG4gICAgICAgIGlmICghaXNMaW5lKGNtLCBsaW5lTnVtKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxpbmUgPSBjbS5nZXRMaW5lKGxpbmVOdW0pO1xuICAgICAgICBwb3MgPSAoZGlyID4gMCkgPyAwIDogbGluZS5sZW5ndGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtDb2RlTWlycm9yfSBjbSBDb2RlTWlycm9yIG9iamVjdC5cbiAgICAgKiBAcGFyYW0ge1Bvc30gY3VyIFRoZSBwb3NpdGlvbiB0byBzdGFydCBmcm9tLlxuICAgICAqIEBwYXJhbSB7aW50fSByZXBlYXQgTnVtYmVyIG9mIHdvcmRzIHRvIG1vdmUgcGFzdC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZvcndhcmQgVHJ1ZSB0byBzZWFyY2ggZm9yd2FyZC4gRmFsc2UgdG8gc2VhcmNoXG4gICAgICogICAgIGJhY2t3YXJkLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gd29yZEVuZCBUcnVlIHRvIG1vdmUgdG8gZW5kIG9mIHdvcmQuIEZhbHNlIHRvIG1vdmUgdG9cbiAgICAgKiAgICAgYmVnaW5uaW5nIG9mIHdvcmQuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBiaWdXb3JkIFRydWUgaWYgcHVuY3R1YXRpb24gY291bnQgYXMgcGFydCBvZiB0aGUgd29yZC5cbiAgICAgKiAgICAgRmFsc2UgaWYgb25seSBhbHBoYWJldCBjaGFyYWN0ZXJzIGNvdW50IGFzIHBhcnQgb2YgdGhlIHdvcmQuXG4gICAgICogQHJldHVybiB7Q3Vyc29yfSBUaGUgcG9zaXRpb24gdGhlIGN1cnNvciBzaG91bGQgbW92ZSB0by5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtb3ZlVG9Xb3JkKGNtLCBjdXIsIHJlcGVhdCwgZm9yd2FyZCwgd29yZEVuZCwgYmlnV29yZCkge1xuICAgICAgdmFyIGN1clN0YXJ0ID0gY29weUN1cnNvcihjdXIpO1xuICAgICAgdmFyIHdvcmRzID0gW107XG4gICAgICBpZiAoZm9yd2FyZCAmJiAhd29yZEVuZCB8fCAhZm9yd2FyZCAmJiB3b3JkRW5kKSB7XG4gICAgICAgIHJlcGVhdCsrO1xuICAgICAgfVxuICAgICAgLy8gRm9yICdlJywgZW1wdHkgbGluZXMgYXJlIG5vdCBjb25zaWRlcmVkIHdvcmRzLCBnbyBmaWd1cmUuXG4gICAgICB2YXIgZW1wdHlMaW5lSXNXb3JkID0gIShmb3J3YXJkICYmIHdvcmRFbmQpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXBlYXQ7IGkrKykge1xuICAgICAgICB2YXIgd29yZCA9IGZpbmRXb3JkKGNtLCBjdXIsIGZvcndhcmQsIGJpZ1dvcmQsIGVtcHR5TGluZUlzV29yZCk7XG4gICAgICAgIGlmICghd29yZCkge1xuICAgICAgICAgIHZhciBlb2RDaCA9IGxpbmVMZW5ndGgoY20sIGNtLmxhc3RMaW5lKCkpO1xuICAgICAgICAgIHdvcmRzLnB1c2goZm9yd2FyZFxuICAgICAgICAgICAgICA/IHtsaW5lOiBjbS5sYXN0TGluZSgpLCBmcm9tOiBlb2RDaCwgdG86IGVvZENofVxuICAgICAgICAgICAgICA6IHtsaW5lOiAwLCBmcm9tOiAwLCB0bzogMH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHdvcmRzLnB1c2god29yZCk7XG4gICAgICAgIGN1ciA9IG5ldyBQb3Mod29yZC5saW5lLCBmb3J3YXJkID8gKHdvcmQudG8gLSAxKSA6IHdvcmQuZnJvbSk7XG4gICAgICB9XG4gICAgICB2YXIgc2hvcnRDaXJjdWl0ID0gd29yZHMubGVuZ3RoICE9IHJlcGVhdDtcbiAgICAgIHZhciBmaXJzdFdvcmQgPSB3b3Jkc1swXTtcbiAgICAgIHZhciBsYXN0V29yZCA9IHdvcmRzLnBvcCgpO1xuICAgICAgaWYgKGZvcndhcmQgJiYgIXdvcmRFbmQpIHtcbiAgICAgICAgLy8gd1xuICAgICAgICBpZiAoIXNob3J0Q2lyY3VpdCAmJiAoZmlyc3RXb3JkLmZyb20gIT0gY3VyU3RhcnQuY2ggfHwgZmlyc3RXb3JkLmxpbmUgIT0gY3VyU3RhcnQubGluZSkpIHtcbiAgICAgICAgICAvLyBXZSBkaWQgbm90IHN0YXJ0IGluIHRoZSBtaWRkbGUgb2YgYSB3b3JkLiBEaXNjYXJkIHRoZSBleHRyYSB3b3JkIGF0IHRoZSBlbmQuXG4gICAgICAgICAgbGFzdFdvcmQgPSB3b3Jkcy5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFBvcyhsYXN0V29yZC5saW5lLCBsYXN0V29yZC5mcm9tKTtcbiAgICAgIH0gZWxzZSBpZiAoZm9yd2FyZCAmJiB3b3JkRW5kKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGxhc3RXb3JkLmxpbmUsIGxhc3RXb3JkLnRvIC0gMSk7XG4gICAgICB9IGVsc2UgaWYgKCFmb3J3YXJkICYmIHdvcmRFbmQpIHtcbiAgICAgICAgLy8gZ2VcbiAgICAgICAgaWYgKCFzaG9ydENpcmN1aXQgJiYgKGZpcnN0V29yZC50byAhPSBjdXJTdGFydC5jaCB8fCBmaXJzdFdvcmQubGluZSAhPSBjdXJTdGFydC5saW5lKSkge1xuICAgICAgICAgIC8vIFdlIGRpZCBub3Qgc3RhcnQgaW4gdGhlIG1pZGRsZSBvZiBhIHdvcmQuIERpc2NhcmQgdGhlIGV4dHJhIHdvcmQgYXQgdGhlIGVuZC5cbiAgICAgICAgICBsYXN0V29yZCA9IHdvcmRzLnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGxhc3RXb3JkLmxpbmUsIGxhc3RXb3JkLnRvKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGJcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MobGFzdFdvcmQubGluZSwgbGFzdFdvcmQuZnJvbSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW92ZVRvRW9sKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0sIGtlZXBIUG9zKSB7XG4gICAgICB2YXIgY3VyID0gaGVhZDtcbiAgICAgIHZhciByZXR2YWw9IG5ldyBQb3MoY3VyLmxpbmUgKyBtb3Rpb25BcmdzLnJlcGVhdCAtIDEsIEluZmluaXR5KTtcbiAgICAgIHZhciBlbmQ9Y20uY2xpcFBvcyhyZXR2YWwpO1xuICAgICAgZW5kLmNoLS07XG4gICAgICBpZiAoIWtlZXBIUG9zKSB7XG4gICAgICAgIHZpbS5sYXN0SFBvcyA9IEluZmluaXR5O1xuICAgICAgICB2aW0ubGFzdEhTUG9zID0gY20uY2hhckNvb3JkcyhlbmQsJ2RpdicpLmxlZnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0dmFsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmVUb0NoYXJhY3RlcihjbSwgcmVwZWF0LCBmb3J3YXJkLCBjaGFyYWN0ZXIsIGhlYWQpIHtcbiAgICAgIHZhciBjdXIgPSBoZWFkIHx8IGNtLmdldEN1cnNvcigpO1xuICAgICAgdmFyIHN0YXJ0ID0gY3VyLmNoO1xuICAgICAgdmFyIGlkeDtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwZWF0OyBpICsrKSB7XG4gICAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShjdXIubGluZSk7XG4gICAgICAgIGlkeCA9IGNoYXJJZHhJbkxpbmUoc3RhcnQsIGxpbmUsIGNoYXJhY3RlciwgZm9yd2FyZCwgdHJ1ZSk7XG4gICAgICAgIGlmIChpZHggPT0gLTEpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBzdGFydCA9IGlkeDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgUG9zKGNtLmdldEN1cnNvcigpLmxpbmUsIGlkeCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW92ZVRvQ29sdW1uKGNtLCByZXBlYXQpIHtcbiAgICAgIC8vIHJlcGVhdCBpcyBhbHdheXMgPj0gMSwgc28gcmVwZWF0IC0gMSBhbHdheXMgY29ycmVzcG9uZHNcbiAgICAgIC8vIHRvIHRoZSBjb2x1bW4gd2Ugd2FudCB0byBnbyB0by5cbiAgICAgIHZhciBsaW5lID0gY20uZ2V0Q3Vyc29yKCkubGluZTtcbiAgICAgIHJldHVybiBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBuZXcgUG9zKGxpbmUsIHJlcGVhdCAtIDEpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVNYXJrKGNtLCB2aW0sIG1hcmtOYW1lLCBwb3MpIHtcbiAgICAgIGlmICghaW5BcnJheShtYXJrTmFtZSwgdmFsaWRNYXJrcykgJiYgIWxhdGluQ2hhclJlZ2V4LnRlc3QobWFya05hbWUpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh2aW0ubWFya3NbbWFya05hbWVdKSB7XG4gICAgICAgIHZpbS5tYXJrc1ttYXJrTmFtZV0uY2xlYXIoKTtcbiAgICAgIH1cbiAgICAgIHZpbS5tYXJrc1ttYXJrTmFtZV0gPSBjbS5zZXRCb29rbWFyayhwb3MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoYXJJZHhJbkxpbmUoc3RhcnQsIGxpbmUsIGNoYXJhY3RlciwgZm9yd2FyZCwgaW5jbHVkZUNoYXIpIHtcbiAgICAgIC8vIFNlYXJjaCBmb3IgY2hhciBpbiBsaW5lLlxuICAgICAgLy8gbW90aW9uX29wdGlvbnM6IHtmb3J3YXJkLCBpbmNsdWRlQ2hhcn1cbiAgICAgIC8vIElmIGluY2x1ZGVDaGFyID0gdHJ1ZSwgaW5jbHVkZSBpdCB0b28uXG4gICAgICAvLyBJZiBmb3J3YXJkID0gdHJ1ZSwgc2VhcmNoIGZvcndhcmQsIGVsc2Ugc2VhcmNoIGJhY2t3YXJkcy5cbiAgICAgIC8vIElmIGNoYXIgaXMgbm90IGZvdW5kIG9uIHRoaXMgbGluZSwgZG8gbm90aGluZ1xuICAgICAgdmFyIGlkeDtcbiAgICAgIGlmIChmb3J3YXJkKSB7XG4gICAgICAgIGlkeCA9IGxpbmUuaW5kZXhPZihjaGFyYWN0ZXIsIHN0YXJ0ICsgMSk7XG4gICAgICAgIGlmIChpZHggIT0gLTEgJiYgIWluY2x1ZGVDaGFyKSB7XG4gICAgICAgICAgaWR4IC09IDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlkeCA9IGxpbmUubGFzdEluZGV4T2YoY2hhcmFjdGVyLCBzdGFydCAtIDEpO1xuICAgICAgICBpZiAoaWR4ICE9IC0xICYmICFpbmNsdWRlQ2hhcikge1xuICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gaWR4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmRQYXJhZ3JhcGgoY20sIGhlYWQsIHJlcGVhdCwgZGlyLCBpbmNsdXNpdmUpIHtcbiAgICAgIHZhciBsaW5lID0gaGVhZC5saW5lO1xuICAgICAgdmFyIG1pbiA9IGNtLmZpcnN0TGluZSgpO1xuICAgICAgdmFyIG1heCA9IGNtLmxhc3RMaW5lKCk7XG4gICAgICB2YXIgc3RhcnQsIGVuZCwgaSA9IGxpbmU7XG4gICAgICBmdW5jdGlvbiBpc0VtcHR5KGkpIHsgcmV0dXJuICEvXFxTLy50ZXN0KGNtLmdldExpbmUoaSkpOyB9IC8vIGFjZV9wYXRjaFxuICAgICAgZnVuY3Rpb24gaXNCb3VuZGFyeShpLCBkaXIsIGFueSkge1xuICAgICAgICBpZiAoYW55KSB7IHJldHVybiBpc0VtcHR5KGkpICE9IGlzRW1wdHkoaSArIGRpcik7IH1cbiAgICAgICAgcmV0dXJuICFpc0VtcHR5KGkpICYmIGlzRW1wdHkoaSArIGRpcik7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBza2lwRm9sZChpKSB7XG4gICAgICAgICAgZGlyID0gZGlyID4gMCA/IDEgOiAtMTtcbiAgICAgICAgICB2YXIgZm9sZExpbmUgPSBjbS5hY2Uuc2Vzc2lvbi5nZXRGb2xkTGluZShpKTtcbiAgICAgICAgICBpZiAoZm9sZExpbmUpIHtcbiAgICAgICAgICAgICAgaWYgKGkgKyBkaXIgPiBmb2xkTGluZS5zdGFydC5yb3cgJiYgaSArIGRpciA8IGZvbGRMaW5lLmVuZC5yb3cpXG4gICAgICAgICAgICAgICAgICBkaXIgPSAoZGlyID4gMCA/IGZvbGRMaW5lLmVuZC5yb3cgOiBmb2xkTGluZS5zdGFydC5yb3cpIC0gaTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHdoaWxlIChtaW4gPD0gaSAmJiBpIDw9IG1heCAmJiByZXBlYXQgPiAwKSB7XG4gICAgICAgICAgc2tpcEZvbGQoaSk7XG4gICAgICAgICAgaWYgKGlzQm91bmRhcnkoaSwgZGlyKSkgeyByZXBlYXQtLTsgfVxuICAgICAgICAgIGkgKz0gZGlyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGksIDApO1xuICAgICAgfVxuXG4gICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgaWYgKHZpbS52aXN1YWxMaW5lICYmIGlzQm91bmRhcnkobGluZSwgMSwgdHJ1ZSkpIHtcbiAgICAgICAgdmFyIGFuY2hvciA9IHZpbS5zZWwuYW5jaG9yO1xuICAgICAgICBpZiAoaXNCb3VuZGFyeShhbmNob3IubGluZSwgLTEsIHRydWUpKSB7XG4gICAgICAgICAgaWYgKCFpbmNsdXNpdmUgfHwgYW5jaG9yLmxpbmUgIT0gbGluZSkge1xuICAgICAgICAgICAgbGluZSArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIHN0YXJ0U3RhdGUgPSBpc0VtcHR5KGxpbmUpO1xuICAgICAgZm9yIChpID0gbGluZTsgaSA8PSBtYXggJiYgcmVwZWF0OyBpKyspIHtcbiAgICAgICAgaWYgKGlzQm91bmRhcnkoaSwgMSwgdHJ1ZSkpIHtcbiAgICAgICAgICBpZiAoIWluY2x1c2l2ZSB8fCBpc0VtcHR5KGkpICE9IHN0YXJ0U3RhdGUpIHtcbiAgICAgICAgICAgIHJlcGVhdC0tO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZW5kID0gbmV3IFBvcyhpLCAwKTtcbiAgICAgIC8vIHNlbGVjdCBib3VuZGFyeSBiZWZvcmUgcGFyYWdyYXBoIGZvciB0aGUgbGFzdCBvbmVcbiAgICAgIGlmIChpID4gbWF4ICYmICFzdGFydFN0YXRlKSB7IHN0YXJ0U3RhdGUgPSB0cnVlOyB9XG4gICAgICBlbHNlIHsgaW5jbHVzaXZlID0gZmFsc2U7IH1cbiAgICAgIGZvciAoaSA9IGxpbmU7IGkgPiBtaW47IGktLSkge1xuICAgICAgICBpZiAoIWluY2x1c2l2ZSB8fCBpc0VtcHR5KGkpID09IHN0YXJ0U3RhdGUgfHwgaSA9PSBsaW5lKSB7XG4gICAgICAgICAgaWYgKGlzQm91bmRhcnkoaSwgLTEsIHRydWUpKSB7IGJyZWFrOyB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHN0YXJ0ID0gbmV3IFBvcyhpLCAwKTtcbiAgICAgIHJldHVybiB7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCYXNlZCBvbiB7QGxpbmsgZmluZFNlbnRlbmNlfS4gVGhlIGludGVybmFsIGZ1bmN0aW9ucyBoYXZlIHRoZSBzYW1lIG5hbWVzLFxuICAgICAqIGJ1dCB0aGVpciBiZWhhdmlvdXIgaXMgZGlmZmVyZW50LiBmaW5kU2VudGVuY2UoKSBjcm9zc2VzIGxpbmUgYnJlYWtzIGFuZCBcbiAgICAgKiBpcyB1c2VkIGZvciBqdW1waW5nIHRvIHNlbnRlbmNlIGJlZ2lubmluZ3MgYmVmb3JlIG9yIGFmdGVyIHRoZSBjdXJyZW50IGN1cnNvciBwb3NpdGlvbiwgXG4gICAgICogd2hlcmVhcyBnZXRTZW50ZW5jZSgpIGlzIGZvciBnZXR0aW5nIHRoZSBiZWdpbm5pbmcgb3IgZW5kIG9mIHRoZSBzZW50ZW5jZSBcbiAgICAgKiBhdCB0aGUgY3VycmVudCBjdXJzb3IgcG9zaXRpb24sIGVpdGhlciBpbmNsdWRpbmcgKGEpIG9yIGV4Y2x1ZGluZyAoaSkgd2hpdGVzcGFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRTZW50ZW5jZShjbSwgY3VyLCByZXBlYXQsIGRpciwgaW5jbHVzaXZlIC8qaW5jbHVkZXMgd2hpdGVzcGFjZSovKSB7XG5cbiAgICAgIC8qXG4gICAgICAgIFRha2VzIGFuIGluZGV4IG9iamVjdFxuICAgICAgICB7XG4gICAgICAgICAgbGluZTogdGhlIGxpbmUgc3RyaW5nLFxuICAgICAgICAgIGxuOiBsaW5lIG51bWJlcixcbiAgICAgICAgICBwb3M6IGluZGV4IGluIGxpbmUsXG4gICAgICAgICAgZGlyOiBkaXJlY3Rpb24gb2YgdHJhdmVyc2FsICgtMSBvciAxKVxuICAgICAgICB9XG4gICAgICAgIGFuZCBtb2RpZmllcyB0aGUgcG9zIG1lbWJlciB0byByZXByZXNlbnQgdGhlXG4gICAgICAgIG5leHQgdmFsaWQgcG9zaXRpb24gb3Igc2V0cyB0aGUgbGluZSB0byBudWxsIGlmIHRoZXJlIGFyZVxuICAgICAgICBubyBtb3JlIHZhbGlkIHBvc2l0aW9ucy5cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gbmV4dENoYXIoY3Vycikge1xuICAgICAgICBpZiAoY3Vyci5wb3MgKyBjdXJyLmRpciA8IDAgfHwgY3Vyci5wb3MgKyBjdXJyLmRpciA+PSBjdXJyLmxpbmUubGVuZ3RoKSB7XG4gICAgICAgICAgY3Vyci5saW5lID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjdXJyLnBvcyArPSBjdXJyLmRpcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLypcbiAgICAgICAgUGVyZm9ybXMgb25lIGl0ZXJhdGlvbiBvZiB0cmF2ZXJzYWwgaW4gZm9yd2FyZCBkaXJlY3Rpb25cbiAgICAgICAgUmV0dXJucyBhbiBpbmRleCBvYmplY3Qgb2YgdGhlIHNlbnRlbmNlIGVuZFxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBmb3J3YXJkKGNtLCBsbiwgcG9zLCBkaXIpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBjbS5nZXRMaW5lKGxuKTtcblxuICAgICAgICB2YXIgY3VyciA9IHtcbiAgICAgICAgICBsaW5lOiBsaW5lLFxuICAgICAgICAgIGxuOiBsbixcbiAgICAgICAgICBwb3M6IHBvcyxcbiAgICAgICAgICBkaXI6IGRpcixcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoY3Vyci5saW5lID09PSBcIlwiKSB7XG4gICAgICAgICAgcmV0dXJuIHsgbG46IGN1cnIubG4sIHBvczogY3Vyci5wb3MgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsYXN0U2VudGVuY2VQb3MgPSBjdXJyLnBvcztcblxuICAgICAgICAvLyBNb3ZlIG9uZSBzdGVwIHRvIHNraXAgY2hhcmFjdGVyIHdlIHN0YXJ0IG9uXG4gICAgICAgIG5leHRDaGFyKGN1cnIpO1xuXG4gICAgICAgIHdoaWxlIChjdXJyLmxpbmUgIT09IG51bGwpIHtcbiAgICAgICAgICBsYXN0U2VudGVuY2VQb3MgPSBjdXJyLnBvcztcbiAgICAgICAgICBpZiAoaXNFbmRPZlNlbnRlbmNlU3ltYm9sKGN1cnIubGluZVtjdXJyLnBvc10pKSB7XG4gICAgICAgICAgICBpZiAoIWluY2x1c2l2ZSkge1xuICAgICAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBjdXJyLnBvcyArIDEgfTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgbmV4dENoYXIoY3Vycik7XG4gICAgICAgICAgICAgIHdoaWxlIChjdXJyLmxpbmUgIT09IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzV2hpdGVTcGFjZVN0cmluZyhjdXJyLmxpbmVbY3Vyci5wb3NdKSkge1xuICAgICAgICAgICAgICAgICAgbGFzdFNlbnRlbmNlUG9zID0gY3Vyci5wb3M7XG4gICAgICAgICAgICAgICAgICBuZXh0Q2hhcihjdXJyKVxuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHsgbG46IGN1cnIubG4sIHBvczogbGFzdFNlbnRlbmNlUG9zICsgMSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBuZXh0Q2hhcihjdXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBsYXN0U2VudGVuY2VQb3MgKyAxIH07XG4gICAgICB9XG5cbiAgICAgIC8qXG4gICAgICAgIFBlcmZvcm1zIG9uZSBpdGVyYXRpb24gb2YgdHJhdmVyc2FsIGluIHJldmVyc2UgZGlyZWN0aW9uXG4gICAgICAgIFJldHVybnMgYW4gaW5kZXggb2JqZWN0IG9mIHRoZSBzZW50ZW5jZSBzdGFydFxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiByZXZlcnNlKGNtLCBsbiwgcG9zLCBkaXIpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBjbS5nZXRMaW5lKGxuKTtcblxuICAgICAgICB2YXIgY3VyciA9IHtcbiAgICAgICAgICBsaW5lOiBsaW5lLFxuICAgICAgICAgIGxuOiBsbixcbiAgICAgICAgICBwb3M6IHBvcyxcbiAgICAgICAgICBkaXI6IGRpcixcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJyLmxpbmUgPT09IFwiXCIpIHtcbiAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBjdXJyLnBvcyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxhc3RTZW50ZW5jZVBvcyA9IGN1cnIucG9zO1xuXG4gICAgICAgIC8vIE1vdmUgb25lIHN0ZXAgdG8gc2tpcCBjaGFyYWN0ZXIgd2Ugc3RhcnQgb25cbiAgICAgICAgbmV4dENoYXIoY3Vycik7XG5cbiAgICAgICAgd2hpbGUgKGN1cnIubGluZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlmICghaXNXaGl0ZVNwYWNlU3RyaW5nKGN1cnIubGluZVtjdXJyLnBvc10pICYmICFpc0VuZE9mU2VudGVuY2VTeW1ib2woY3Vyci5saW5lW2N1cnIucG9zXSkpIHtcbiAgICAgICAgICAgIGxhc3RTZW50ZW5jZVBvcyA9IGN1cnIucG9zO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGVsc2UgaWYgKGlzRW5kT2ZTZW50ZW5jZVN5bWJvbChjdXJyLmxpbmVbY3Vyci5wb3NdKSApIHtcbiAgICAgICAgICAgIGlmICghaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGxhc3RTZW50ZW5jZVBvcyB9O1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoaXNXaGl0ZVNwYWNlU3RyaW5nKGN1cnIubGluZVtjdXJyLnBvcyArIDFdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGN1cnIucG9zICsgMSB9O1xuICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBsYXN0U2VudGVuY2VQb3MgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHRDaGFyKGN1cnIpO1xuICAgICAgICB9XG4gICAgICAgIGN1cnIubGluZSA9IGxpbmVcbiAgICAgICAgaWYgKGluY2x1c2l2ZSAmJiBpc1doaXRlU3BhY2VTdHJpbmcoY3Vyci5saW5lW2N1cnIucG9zXSkpIHtcbiAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBjdXJyLnBvcyB9O1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBsYXN0U2VudGVuY2VQb3MgfTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIHZhciBjdXJyX2luZGV4ID0ge1xuICAgICAgICBsbjogY3VyLmxpbmUsXG4gICAgICAgIHBvczogY3VyLmNoLFxuICAgICAgfTtcblxuICAgICAgd2hpbGUgKHJlcGVhdCA+IDApIHtcbiAgICAgICAgaWYgKGRpciA8IDApIHtcbiAgICAgICAgICBjdXJyX2luZGV4ID0gcmV2ZXJzZShjbSwgY3Vycl9pbmRleC5sbiwgY3Vycl9pbmRleC5wb3MsIGRpcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY3Vycl9pbmRleCA9IGZvcndhcmQoY20sIGN1cnJfaW5kZXgubG4sIGN1cnJfaW5kZXgucG9zLCBkaXIpO1xuICAgICAgICB9XG4gICAgICAgIHJlcGVhdC0tO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFBvcyhjdXJyX2luZGV4LmxuLCBjdXJyX2luZGV4LnBvcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluZFNlbnRlbmNlKGNtLCBjdXIsIHJlcGVhdCwgZGlyKSB7XG5cbiAgICAgICAvKlxuICAgICAgICAgVGFrZXMgYW4gaW5kZXggb2JqZWN0XG4gICAgICAgICB7XG4gICAgICAgICAgIGxpbmU6IHRoZSBsaW5lIHN0cmluZyxcbiAgICAgICAgICAgbG46IGxpbmUgbnVtYmVyLFxuICAgICAgICAgICBwb3M6IGluZGV4IGluIGxpbmUsXG4gICAgICAgICAgIGRpcjogZGlyZWN0aW9uIG9mIHRyYXZlcnNhbCAoLTEgb3IgMSlcbiAgICAgICAgIH1cbiAgICAgICAgIGFuZCBtb2RpZmllcyB0aGUgbGluZSwgbG4sIGFuZCBwb3MgbWVtYmVycyB0byByZXByZXNlbnQgdGhlXG4gICAgICAgICBuZXh0IHZhbGlkIHBvc2l0aW9uIG9yIHNldHMgdGhlbSB0byBudWxsIGlmIHRoZXJlIGFyZVxuICAgICAgICAgbm8gbW9yZSB2YWxpZCBwb3NpdGlvbnMuXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIG5leHRDaGFyKGNtLCBpZHgpIHtcbiAgICAgICAgaWYgKGlkeC5wb3MgKyBpZHguZGlyIDwgMCB8fCBpZHgucG9zICsgaWR4LmRpciA+PSBpZHgubGluZS5sZW5ndGgpIHtcbiAgICAgICAgICBpZHgubG4gKz0gaWR4LmRpcjtcbiAgICAgICAgICBpZiAoIWlzTGluZShjbSwgaWR4LmxuKSkge1xuICAgICAgICAgICAgaWR4LmxpbmUgPSBudWxsO1xuICAgICAgICAgICAgaWR4LmxuID0gbnVsbDtcbiAgICAgICAgICAgIGlkeC5wb3MgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZHgubGluZSA9IGNtLmdldExpbmUoaWR4LmxuKTtcbiAgICAgICAgICBpZHgucG9zID0gKGlkeC5kaXIgPiAwKSA/IDAgOiBpZHgubGluZS5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlkeC5wb3MgKz0gaWR4LmRpcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKlxuICAgICAgICBQZXJmb3JtcyBvbmUgaXRlcmF0aW9uIG9mIHRyYXZlcnNhbCBpbiBmb3J3YXJkIGRpcmVjdGlvblxuICAgICAgICBSZXR1cm5zIGFuIGluZGV4IG9iamVjdCBvZiB0aGUgbmV3IGxvY2F0aW9uXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGZvcndhcmQoY20sIGxuLCBwb3MsIGRpcikge1xuICAgICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUobG4pO1xuICAgICAgICB2YXIgc3RvcCA9IChsaW5lID09PSBcIlwiKTtcblxuICAgICAgICB2YXIgY3VyciA9IHtcbiAgICAgICAgICBsaW5lOiBsaW5lLFxuICAgICAgICAgIGxuOiBsbixcbiAgICAgICAgICBwb3M6IHBvcyxcbiAgICAgICAgICBkaXI6IGRpcixcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsYXN0X3ZhbGlkID0ge1xuICAgICAgICAgIGxuOiBjdXJyLmxuLFxuICAgICAgICAgIHBvczogY3Vyci5wb3MsXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2tpcF9lbXB0eV9saW5lcyA9IChjdXJyLmxpbmUgPT09IFwiXCIpO1xuXG4gICAgICAgIC8vIE1vdmUgb25lIHN0ZXAgdG8gc2tpcCBjaGFyYWN0ZXIgd2Ugc3RhcnQgb25cbiAgICAgICAgbmV4dENoYXIoY20sIGN1cnIpO1xuXG4gICAgICAgIHdoaWxlIChjdXJyLmxpbmUgIT09IG51bGwpIHtcbiAgICAgICAgICBsYXN0X3ZhbGlkLmxuID0gY3Vyci5sbjtcbiAgICAgICAgICBsYXN0X3ZhbGlkLnBvcyA9IGN1cnIucG9zO1xuXG4gICAgICAgICAgaWYgKGN1cnIubGluZSA9PT0gXCJcIiAmJiAhc2tpcF9lbXB0eV9saW5lcykge1xuICAgICAgICAgICAgcmV0dXJuIHsgbG46IGN1cnIubG4sIHBvczogY3Vyci5wb3MsIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHN0b3AgJiYgY3Vyci5saW5lICE9PSBcIlwiICYmICFpc1doaXRlU3BhY2VTdHJpbmcoY3Vyci5saW5lW2N1cnIucG9zXSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGN1cnIucG9zLCB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChpc0VuZE9mU2VudGVuY2VTeW1ib2woY3Vyci5saW5lW2N1cnIucG9zXSlcbiAgICAgICAgICAgICYmICFzdG9wXG4gICAgICAgICAgICAmJiAoY3Vyci5wb3MgPT09IGN1cnIubGluZS5sZW5ndGggLSAxXG4gICAgICAgICAgICAgIHx8IGlzV2hpdGVTcGFjZVN0cmluZyhjdXJyLmxpbmVbY3Vyci5wb3MgKyAxXSkpKSB7XG4gICAgICAgICAgICBzdG9wID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0Q2hhcihjbSwgY3Vycik7XG4gICAgICAgIH1cblxuICAgICAgICAvKlxuICAgICAgICAgIFNldCB0aGUgcG9zaXRpb24gdG8gdGhlIGxhc3Qgbm9uIHdoaXRlc3BhY2UgY2hhcmFjdGVyIG9uIHRoZSBsYXN0XG4gICAgICAgICAgdmFsaWQgbGluZSBpbiB0aGUgY2FzZSB0aGF0IHdlIHJlYWNoIHRoZSBlbmQgb2YgdGhlIGRvY3VtZW50LlxuICAgICAgICAqL1xuICAgICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUobGFzdF92YWxpZC5sbik7XG4gICAgICAgIGxhc3RfdmFsaWQucG9zID0gMDtcbiAgICAgICAgZm9yKHZhciBpID0gbGluZS5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgIGlmICghaXNXaGl0ZVNwYWNlU3RyaW5nKGxpbmVbaV0pKSB7XG4gICAgICAgICAgICBsYXN0X3ZhbGlkLnBvcyA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGFzdF92YWxpZDtcblxuICAgICAgfVxuXG4gICAgICAvKlxuICAgICAgICBQZXJmb3JtcyBvbmUgaXRlcmF0aW9uIG9mIHRyYXZlcnNhbCBpbiByZXZlcnNlIGRpcmVjdGlvblxuICAgICAgICBSZXR1cm5zIGFuIGluZGV4IG9iamVjdCBvZiB0aGUgbmV3IGxvY2F0aW9uXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJldmVyc2UoY20sIGxuLCBwb3MsIGRpcikge1xuICAgICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUobG4pO1xuXG4gICAgICAgIHZhciBjdXJyID0ge1xuICAgICAgICAgIGxpbmU6IGxpbmUsXG4gICAgICAgICAgbG46IGxuLFxuICAgICAgICAgIHBvczogcG9zLFxuICAgICAgICAgIGRpcjogZGlyLFxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxhc3RfdmFsaWQgPSB7XG4gICAgICAgICAgbG46IGN1cnIubG4sXG4gICAgICAgICAgcG9zOiBudWxsLFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBza2lwX2VtcHR5X2xpbmVzID0gKGN1cnIubGluZSA9PT0gXCJcIik7XG5cbiAgICAgICAgLy8gTW92ZSBvbmUgc3RlcCB0byBza2lwIGNoYXJhY3RlciB3ZSBzdGFydCBvblxuICAgICAgICBuZXh0Q2hhcihjbSwgY3Vycik7XG5cbiAgICAgICAgd2hpbGUgKGN1cnIubGluZSAhPT0gbnVsbCkge1xuXG4gICAgICAgICAgaWYgKGN1cnIubGluZSA9PT0gXCJcIiAmJiAhc2tpcF9lbXB0eV9saW5lcykge1xuICAgICAgICAgICAgaWYgKGxhc3RfdmFsaWQucG9zICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBsYXN0X3ZhbGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGN1cnIucG9zIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGlzRW5kT2ZTZW50ZW5jZVN5bWJvbChjdXJyLmxpbmVbY3Vyci5wb3NdKVxuICAgICAgICAgICAgICAmJiBsYXN0X3ZhbGlkLnBvcyAhPT0gbnVsbFxuICAgICAgICAgICAgICAmJiAhKGN1cnIubG4gPT09IGxhc3RfdmFsaWQubG4gJiYgY3Vyci5wb3MgKyAxID09PSBsYXN0X3ZhbGlkLnBvcykpIHtcbiAgICAgICAgICAgIHJldHVybiBsYXN0X3ZhbGlkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChjdXJyLmxpbmUgIT09IFwiXCIgJiYgIWlzV2hpdGVTcGFjZVN0cmluZyhjdXJyLmxpbmVbY3Vyci5wb3NdKSkge1xuICAgICAgICAgICAgc2tpcF9lbXB0eV9saW5lcyA9IGZhbHNlO1xuICAgICAgICAgICAgbGFzdF92YWxpZCA9IHsgbG46IGN1cnIubG4sIHBvczogY3Vyci5wb3MgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHRDaGFyKGNtLCBjdXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgU2V0IHRoZSBwb3NpdGlvbiB0byB0aGUgZmlyc3Qgbm9uIHdoaXRlc3BhY2UgY2hhcmFjdGVyIG9uIHRoZSBsYXN0XG4gICAgICAgICAgdmFsaWQgbGluZSBpbiB0aGUgY2FzZSB0aGF0IHdlIHJlYWNoIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGRvY3VtZW50LlxuICAgICAgICAqL1xuICAgICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUobGFzdF92YWxpZC5sbik7XG4gICAgICAgIGxhc3RfdmFsaWQucG9zID0gMDtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxpbmUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBpZiAoIWlzV2hpdGVTcGFjZVN0cmluZyhsaW5lW2ldKSkge1xuICAgICAgICAgICAgbGFzdF92YWxpZC5wb3MgPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsYXN0X3ZhbGlkO1xuICAgICAgfVxuXG4gICAgICB2YXIgY3Vycl9pbmRleCA9IHtcbiAgICAgICAgbG46IGN1ci5saW5lLFxuICAgICAgICBwb3M6IGN1ci5jaCxcbiAgICAgIH07XG5cbiAgICAgIHdoaWxlIChyZXBlYXQgPiAwKSB7XG4gICAgICAgIGlmIChkaXIgPCAwKSB7XG4gICAgICAgICAgY3Vycl9pbmRleCA9IHJldmVyc2UoY20sIGN1cnJfaW5kZXgubG4sIGN1cnJfaW5kZXgucG9zLCBkaXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGN1cnJfaW5kZXggPSBmb3J3YXJkKGNtLCBjdXJyX2luZGV4LmxuLCBjdXJyX2luZGV4LnBvcywgZGlyKTtcbiAgICAgICAgfVxuICAgICAgICByZXBlYXQtLTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQb3MoY3Vycl9pbmRleC5sbiwgY3Vycl9pbmRleC5wb3MpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IHBlcmhhcHMgdGhpcyBmaW5hZ2xpbmcgb2Ygc3RhcnQgYW5kIGVuZCBwb3NpdGlvbnMgYmVsb25nc1xuICAgIC8vIGluIGNvZGVtaXJyb3IvcmVwbGFjZVJhbmdlP1xuICAgIGZ1bmN0aW9uIHNlbGVjdENvbXBhbmlvbk9iamVjdChjbSwgaGVhZCwgc3ltYiwgaW5jbHVzaXZlKSB7XG4gICAgICB2YXIgY3VyID0gaGVhZCwgc3RhcnQsIGVuZDtcblxuICAgICAgdmFyIGJyYWNrZXRSZWdleHAgPSAoe1xuICAgICAgICAnKCc6IC9bKCldLywgJyknOiAvWygpXS8sXG4gICAgICAgICdbJzogL1tbXFxdXS8sICddJzogL1tbXFxdXS8sXG4gICAgICAgICd7JzogL1t7fV0vLCAnfSc6IC9be31dLyxcbiAgICAgICAgJzwnOiAvWzw+XS8sICc+JzogL1s8Pl0vfSlbc3ltYl07XG4gICAgICB2YXIgb3BlblN5bSA9ICh7XG4gICAgICAgICcoJzogJygnLCAnKSc6ICcoJyxcbiAgICAgICAgJ1snOiAnWycsICddJzogJ1snLFxuICAgICAgICAneyc6ICd7JywgJ30nOiAneycsXG4gICAgICAgICc8JzogJzwnLCAnPic6ICc8J30pW3N5bWJdO1xuICAgICAgdmFyIGN1ckNoYXIgPSBjbS5nZXRMaW5lKGN1ci5saW5lKS5jaGFyQXQoY3VyLmNoKTtcbiAgICAgIC8vIER1ZSB0byB0aGUgYmVoYXZpb3Igb2Ygc2NhbkZvckJyYWNrZXQsIHdlIG5lZWQgdG8gYWRkIGFuIG9mZnNldCBpZiB0aGVcbiAgICAgIC8vIGN1cnNvciBpcyBvbiBhIG1hdGNoaW5nIG9wZW4gYnJhY2tldC5cbiAgICAgIHZhciBvZmZzZXQgPSBjdXJDaGFyID09PSBvcGVuU3ltID8gMSA6IDA7XG5cbiAgICAgIHN0YXJ0ID0gY20uc2NhbkZvckJyYWNrZXQobmV3IFBvcyhjdXIubGluZSwgY3VyLmNoICsgb2Zmc2V0KSwgLTEsIHVuZGVmaW5lZCwgeydicmFja2V0UmVnZXgnOiBicmFja2V0UmVnZXhwfSk7XG4gICAgICBlbmQgPSBjbS5zY2FuRm9yQnJhY2tldChuZXcgUG9zKGN1ci5saW5lLCBjdXIuY2ggKyBvZmZzZXQpLCAxLCB1bmRlZmluZWQsIHsnYnJhY2tldFJlZ2V4JzogYnJhY2tldFJlZ2V4cH0pO1xuXG4gICAgICBpZiAoIXN0YXJ0IHx8ICFlbmQpIHJldHVybiBudWxsO1xuXG4gICAgICBzdGFydCA9IHN0YXJ0LnBvcztcbiAgICAgIGVuZCA9IGVuZC5wb3M7XG5cbiAgICAgIGlmICgoc3RhcnQubGluZSA9PSBlbmQubGluZSAmJiBzdGFydC5jaCA+IGVuZC5jaClcbiAgICAgICAgICB8fCAoc3RhcnQubGluZSA+IGVuZC5saW5lKSkge1xuICAgICAgICB2YXIgdG1wID0gc3RhcnQ7XG4gICAgICAgIHN0YXJ0ID0gZW5kO1xuICAgICAgICBlbmQgPSB0bXA7XG4gICAgICB9XG5cbiAgICAgIGlmIChpbmNsdXNpdmUpIHtcbiAgICAgICAgZW5kLmNoICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdGFydC5jaCArPSAxO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4geyBzdGFydDogc3RhcnQsIGVuZDogZW5kIH07XG4gICAgfVxuXG4gICAgLy8gVGFrZXMgaW4gYSBzeW1ib2wgYW5kIGEgY3Vyc29yIGFuZCB0cmllcyB0byBzaW11bGF0ZSB0ZXh0IG9iamVjdHMgdGhhdFxuICAgIC8vIGhhdmUgaWRlbnRpY2FsIG9wZW5pbmcgYW5kIGNsb3Npbmcgc3ltYm9sc1xuICAgIC8vIFRPRE8gc3VwcG9ydCBhY3Jvc3MgbXVsdGlwbGUgbGluZXNcbiAgICBmdW5jdGlvbiBmaW5kQmVnaW5uaW5nQW5kRW5kKGNtLCBoZWFkLCBzeW1iLCBpbmNsdXNpdmUpIHtcbiAgICAgIHZhciBjdXIgPSBjb3B5Q3Vyc29yKGhlYWQpO1xuICAgICAgdmFyIGxpbmUgPSBjbS5nZXRMaW5lKGN1ci5saW5lKTtcbiAgICAgIHZhciBjaGFycyA9IGxpbmUuc3BsaXQoJycpO1xuICAgICAgdmFyIHN0YXJ0LCBlbmQsIGksIGxlbjtcbiAgICAgIHZhciBmaXJzdEluZGV4ID0gY2hhcnMuaW5kZXhPZihzeW1iKTtcblxuICAgICAgLy8gdGhlIGRlY2lzaW9uIHRyZWUgaXMgdG8gYWx3YXlzIGxvb2sgYmFja3dhcmRzIGZvciB0aGUgYmVnaW5uaW5nIGZpcnN0LFxuICAgICAgLy8gYnV0IGlmIHRoZSBjdXJzb3IgaXMgaW4gZnJvbnQgb2YgdGhlIGZpcnN0IGluc3RhbmNlIG9mIHRoZSBzeW1iLFxuICAgICAgLy8gdGhlbiBtb3ZlIHRoZSBjdXJzb3IgZm9yd2FyZFxuICAgICAgaWYgKGN1ci5jaCA8IGZpcnN0SW5kZXgpIHtcbiAgICAgICAgY3VyLmNoID0gZmlyc3RJbmRleDtcbiAgICAgIH1cbiAgICAgIC8vIG90aGVyd2lzZSBpZiB0aGUgY3Vyc29yIGlzIGN1cnJlbnRseSBvbiB0aGUgY2xvc2luZyBzeW1ib2xcbiAgICAgIGVsc2UgaWYgKGZpcnN0SW5kZXggPCBjdXIuY2ggJiYgY2hhcnNbY3VyLmNoXSA9PSBzeW1iKSB7XG4gICAgICAgIHZhciBzdHJpbmdBZnRlciA9IC9zdHJpbmcvLnRlc3QoY20uZ2V0VG9rZW5UeXBlQXQob2Zmc2V0Q3Vyc29yKGhlYWQsIDAsIDEpKSk7XG4gICAgICAgIHZhciBzdHJpbmdCZWZvcmUgPSAvc3RyaW5nLy50ZXN0KGNtLmdldFRva2VuVHlwZUF0KGhlYWQpKTtcbiAgICAgICAgdmFyIGlzU3RyaW5nU3RhcnQgPSBzdHJpbmdBZnRlciAmJiAhc3RyaW5nQmVmb3JlXG4gICAgICAgIGlmICghaXNTdHJpbmdTdGFydCkge1xuICAgICAgICAgIGVuZCA9IGN1ci5jaDsgLy8gYXNzaWduIGVuZCB0byB0aGUgY3VycmVudCBjdXJzb3JcbiAgICAgICAgICAtLWN1ci5jaDsgLy8gbWFrZSBzdXJlIHRvIGxvb2sgYmFja3dhcmRzXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gaWYgd2UncmUgY3VycmVudGx5IG9uIHRoZSBzeW1ib2wsIHdlJ3ZlIGdvdCBhIHN0YXJ0XG4gICAgICBpZiAoY2hhcnNbY3VyLmNoXSA9PSBzeW1iICYmICFlbmQpIHtcbiAgICAgICAgc3RhcnQgPSBjdXIuY2ggKyAxOyAvLyBhc3NpZ24gc3RhcnQgdG8gYWhlYWQgb2YgdGhlIGN1cnNvclxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZ28gYmFja3dhcmRzIHRvIGZpbmQgdGhlIHN0YXJ0XG4gICAgICAgIGZvciAoaSA9IGN1ci5jaDsgaSA+IC0xICYmICFzdGFydDsgaS0tKSB7XG4gICAgICAgICAgaWYgKGNoYXJzW2ldID09IHN5bWIpIHtcbiAgICAgICAgICAgIHN0YXJ0ID0gaSArIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIGxvb2sgZm9yd2FyZHMgZm9yIHRoZSBlbmQgc3ltYm9sXG4gICAgICBpZiAoc3RhcnQgJiYgIWVuZCkge1xuICAgICAgICBmb3IgKGkgPSBzdGFydCwgbGVuID0gY2hhcnMubGVuZ3RoOyBpIDwgbGVuICYmICFlbmQ7IGkrKykge1xuICAgICAgICAgIGlmIChjaGFyc1tpXSA9PSBzeW1iKSB7XG4gICAgICAgICAgICBlbmQgPSBpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBub3RoaW5nIGZvdW5kXG4gICAgICBpZiAoIXN0YXJ0IHx8ICFlbmQpIHtcbiAgICAgICAgcmV0dXJuIHsgc3RhcnQ6IGN1ciwgZW5kOiBjdXIgfTtcbiAgICAgIH1cblxuICAgICAgLy8gaW5jbHVkZSB0aGUgc3ltYm9sc1xuICAgICAgaWYgKGluY2x1c2l2ZSkge1xuICAgICAgICAtLXN0YXJ0OyArK2VuZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQ6IG5ldyBQb3MoY3VyLmxpbmUsIHN0YXJ0KSxcbiAgICAgICAgZW5kOiBuZXcgUG9zKGN1ci5saW5lLCBlbmQpXG4gICAgICB9O1xuICAgIH1cblxuICAgIC8vIFNlYXJjaCBmdW5jdGlvbnNcbiAgICBkZWZpbmVPcHRpb24oJ3BjcmUnLCB0cnVlLCAnYm9vbGVhbicpO1xuICAgIGZ1bmN0aW9uIFNlYXJjaFN0YXRlKCkge31cbiAgICBTZWFyY2hTdGF0ZS5wcm90b3R5cGUgPSB7XG4gICAgICBnZXRRdWVyeTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2aW1HbG9iYWxTdGF0ZS5xdWVyeTtcbiAgICAgIH0sXG4gICAgICBzZXRRdWVyeTogZnVuY3Rpb24ocXVlcnkpIHtcbiAgICAgICAgdmltR2xvYmFsU3RhdGUucXVlcnkgPSBxdWVyeTtcbiAgICAgIH0sXG4gICAgICBnZXRPdmVybGF5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VhcmNoT3ZlcmxheTtcbiAgICAgIH0sXG4gICAgICBzZXRPdmVybGF5OiBmdW5jdGlvbihvdmVybGF5KSB7XG4gICAgICAgIHRoaXMuc2VhcmNoT3ZlcmxheSA9IG92ZXJsYXk7XG4gICAgICB9LFxuICAgICAgaXNSZXZlcnNlZDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2aW1HbG9iYWxTdGF0ZS5pc1JldmVyc2VkO1xuICAgICAgfSxcbiAgICAgIHNldFJldmVyc2VkOiBmdW5jdGlvbihyZXZlcnNlZCkge1xuICAgICAgICB2aW1HbG9iYWxTdGF0ZS5pc1JldmVyc2VkID0gcmV2ZXJzZWQ7XG4gICAgICB9LFxuICAgICAgZ2V0U2Nyb2xsYmFyQW5ub3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5hbm5vdGF0ZTtcbiAgICAgIH0sXG4gICAgICBzZXRTY3JvbGxiYXJBbm5vdGF0ZTogZnVuY3Rpb24oYW5ub3RhdGUpIHtcbiAgICAgICAgdGhpcy5hbm5vdGF0ZSA9IGFubm90YXRlO1xuICAgICAgfVxuICAgIH07XG4gICAgZnVuY3Rpb24gZ2V0U2VhcmNoU3RhdGUoY20pIHtcbiAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICByZXR1cm4gdmltLnNlYXJjaFN0YXRlXyB8fCAodmltLnNlYXJjaFN0YXRlXyA9IG5ldyBTZWFyY2hTdGF0ZSgpKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc3BsaXRCeVNsYXNoKGFyZ1N0cmluZykge1xuICAgICAgcmV0dXJuIHNwbGl0QnlTZXBhcmF0b3IoYXJnU3RyaW5nLCAnLycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmRVbmVzY2FwZWRTbGFzaGVzKGFyZ1N0cmluZykge1xuICAgICAgcmV0dXJuIGZpbmRVbmVzY2FwZWRTZXBhcmF0b3JzKGFyZ1N0cmluZywgJy8nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzcGxpdEJ5U2VwYXJhdG9yKGFyZ1N0cmluZywgc2VwYXJhdG9yKSB7XG4gICAgICB2YXIgc2xhc2hlcyA9IGZpbmRVbmVzY2FwZWRTZXBhcmF0b3JzKGFyZ1N0cmluZywgc2VwYXJhdG9yKSB8fCBbXTtcbiAgICAgIGlmICghc2xhc2hlcy5sZW5ndGgpIHJldHVybiBbXTtcbiAgICAgIHZhciB0b2tlbnMgPSBbXTtcbiAgICAgIC8vIGluIGNhc2Ugb2Ygc3RyaW5ncyBsaWtlIGZvby9iYXJcbiAgICAgIGlmIChzbGFzaGVzWzBdICE9PSAwKSByZXR1cm47XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsYXNoZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzbGFzaGVzW2ldID09ICdudW1iZXInKVxuICAgICAgICAgIHRva2Vucy5wdXNoKGFyZ1N0cmluZy5zdWJzdHJpbmcoc2xhc2hlc1tpXSArIDEsIHNsYXNoZXNbaSsxXSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VucztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kVW5lc2NhcGVkU2VwYXJhdG9ycyhzdHIsIHNlcGFyYXRvcikge1xuICAgICAgaWYgKCFzZXBhcmF0b3IpXG4gICAgICAgIHNlcGFyYXRvciA9ICcvJztcblxuICAgICAgdmFyIGVzY2FwZU5leHRDaGFyID0gZmFsc2U7XG4gICAgICB2YXIgc2xhc2hlcyA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckF0KGkpO1xuICAgICAgICBpZiAoIWVzY2FwZU5leHRDaGFyICYmIGMgPT0gc2VwYXJhdG9yKSB7XG4gICAgICAgICAgc2xhc2hlcy5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICAgIGVzY2FwZU5leHRDaGFyID0gIWVzY2FwZU5leHRDaGFyICYmIChjID09ICdcXFxcJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc2xhc2hlcztcbiAgICB9XG5cbiAgICAvLyBUcmFuc2xhdGVzIGEgc2VhcmNoIHN0cmluZyBmcm9tIGV4ICh2aW0pIHN5bnRheCBpbnRvIGphdmFzY3JpcHQgZm9ybS5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVSZWdleChzdHIpIHtcbiAgICAgIC8vIFdoZW4gdGhlc2UgbWF0Y2gsIGFkZCBhICdcXCcgaWYgdW5lc2NhcGVkIG9yIHJlbW92ZSBvbmUgaWYgZXNjYXBlZC5cbiAgICAgIHZhciBzcGVjaWFscyA9ICd8KCl7JztcbiAgICAgIC8vIFJlbW92ZSwgYnV0IG5ldmVyIGFkZCwgYSAnXFwnIGZvciB0aGVzZS5cbiAgICAgIHZhciB1bmVzY2FwZSA9ICd9JztcbiAgICAgIHZhciBlc2NhcGVOZXh0Q2hhciA9IGZhbHNlO1xuICAgICAgdmFyIG91dCA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IC0xOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjID0gc3RyLmNoYXJBdChpKSB8fCAnJztcbiAgICAgICAgdmFyIG4gPSBzdHIuY2hhckF0KGkrMSkgfHwgJyc7XG4gICAgICAgIHZhciBzcGVjaWFsQ29tZXNOZXh0ID0gKG4gJiYgc3BlY2lhbHMuaW5kZXhPZihuKSAhPSAtMSk7XG4gICAgICAgIGlmIChlc2NhcGVOZXh0Q2hhcikge1xuICAgICAgICAgIGlmIChjICE9PSAnXFxcXCcgfHwgIXNwZWNpYWxDb21lc05leHQpIHtcbiAgICAgICAgICAgIG91dC5wdXNoKGMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlc2NhcGVOZXh0Q2hhciA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChjID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgIGVzY2FwZU5leHRDaGFyID0gdHJ1ZTtcbiAgICAgICAgICAgIC8vIFRyZWF0IHRoZSB1bmVzY2FwZSBsaXN0IGFzIHNwZWNpYWwgZm9yIHJlbW92aW5nLCBidXQgbm90IGFkZGluZyAnXFwnLlxuICAgICAgICAgICAgaWYgKG4gJiYgdW5lc2NhcGUuaW5kZXhPZihuKSAhPSAtMSkge1xuICAgICAgICAgICAgICBzcGVjaWFsQ29tZXNOZXh0ID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIE5vdCBwYXNzaW5nIHRoaXMgdGVzdCBtZWFucyByZW1vdmluZyBhICdcXCcuXG4gICAgICAgICAgICBpZiAoIXNwZWNpYWxDb21lc05leHQgfHwgbiA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgIG91dC5wdXNoKGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvdXQucHVzaChjKTtcbiAgICAgICAgICAgIGlmIChzcGVjaWFsQ29tZXNOZXh0ICYmIG4gIT09ICdcXFxcJykge1xuICAgICAgICAgICAgICBvdXQucHVzaCgnXFxcXCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG91dC5qb2luKCcnKTtcbiAgICB9XG5cbiAgICAvLyBUcmFuc2xhdGVzIHRoZSByZXBsYWNlIHBhcnQgb2YgYSBzZWFyY2ggYW5kIHJlcGxhY2UgZnJvbSBleCAodmltKSBzeW50YXggaW50b1xuICAgIC8vIGphdmFzY3JpcHQgZm9ybS4gIFNpbWlsYXIgdG8gdHJhbnNsYXRlUmVnZXgsIGJ1dCBhZGRpdGlvbmFsbHkgZml4ZXMgYmFjayByZWZlcmVuY2VzXG4gICAgLy8gKHRyYW5zbGF0ZXMgJ1xcWzAuLjldJyB0byAnJFswLi45XScpIGFuZCBmb2xsb3dzIGRpZmZlcmVudCBydWxlcyBmb3IgZXNjYXBpbmcgJyQnLlxuICAgIHZhciBjaGFyVW5lc2NhcGVzID0geydcXFxcbic6ICdcXG4nLCAnXFxcXHInOiAnXFxyJywgJ1xcXFx0JzogJ1xcdCd9O1xuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVJlZ2V4UmVwbGFjZShzdHIpIHtcbiAgICAgIHZhciBlc2NhcGVOZXh0Q2hhciA9IGZhbHNlO1xuICAgICAgdmFyIG91dCA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IC0xOyBpIDwgc3RyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjID0gc3RyLmNoYXJBdChpKSB8fCAnJztcbiAgICAgICAgdmFyIG4gPSBzdHIuY2hhckF0KGkrMSkgfHwgJyc7XG4gICAgICAgIGlmIChjaGFyVW5lc2NhcGVzW2MgKyBuXSkge1xuICAgICAgICAgIG91dC5wdXNoKGNoYXJVbmVzY2FwZXNbYytuXSk7XG4gICAgICAgICAgaSsrO1xuICAgICAgICB9IGVsc2UgaWYgKGVzY2FwZU5leHRDaGFyKSB7XG4gICAgICAgICAgLy8gQXQgYW55IHBvaW50IGluIHRoZSBsb29wLCBlc2NhcGVOZXh0Q2hhciBpcyB0cnVlIGlmIHRoZSBwcmV2aW91c1xuICAgICAgICAgIC8vIGNoYXJhY3RlciB3YXMgYSAnXFwnIGFuZCB3YXMgbm90IGVzY2FwZWQuXG4gICAgICAgICAgb3V0LnB1c2goYyk7XG4gICAgICAgICAgZXNjYXBlTmV4dENoYXIgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoYyA9PT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICBlc2NhcGVOZXh0Q2hhciA9IHRydWU7XG4gICAgICAgICAgICBpZiAoKGlzTnVtYmVyKG4pIHx8IG4gPT09ICckJykpIHtcbiAgICAgICAgICAgICAgb3V0LnB1c2goJyQnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobiAhPT0gJy8nICYmIG4gIT09ICdcXFxcJykge1xuICAgICAgICAgICAgICBvdXQucHVzaCgnXFxcXCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoYyA9PT0gJyQnKSB7XG4gICAgICAgICAgICAgIG91dC5wdXNoKCckJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvdXQucHVzaChjKTtcbiAgICAgICAgICAgIGlmIChuID09PSAnLycpIHtcbiAgICAgICAgICAgICAgb3V0LnB1c2goJ1xcXFwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXQuam9pbignJyk7XG4gICAgfVxuXG4gICAgLy8gVW5lc2NhcGUgXFwgYW5kIC8gaW4gdGhlIHJlcGxhY2UgcGFydCwgZm9yIFBDUkUgbW9kZS5cbiAgICB2YXIgdW5lc2NhcGVzID0geydcXFxcLyc6ICcvJywgJ1xcXFxcXFxcJzogJ1xcXFwnLCAnXFxcXG4nOiAnXFxuJywgJ1xcXFxyJzogJ1xccicsICdcXFxcdCc6ICdcXHQnLCAnXFxcXCYnOicmJ307XG4gICAgZnVuY3Rpb24gdW5lc2NhcGVSZWdleFJlcGxhY2Uoc3RyKSB7XG4gICAgICB2YXIgc3RyZWFtID0gbmV3IENvZGVNaXJyb3IuU3RyaW5nU3RyZWFtKHN0cik7XG4gICAgICB2YXIgb3V0cHV0ID0gW107XG4gICAgICB3aGlsZSAoIXN0cmVhbS5lb2woKSkge1xuICAgICAgICAvLyBTZWFyY2ggZm9yIFxcLlxuICAgICAgICB3aGlsZSAoc3RyZWFtLnBlZWsoKSAmJiBzdHJlYW0ucGVlaygpICE9ICdcXFxcJykge1xuICAgICAgICAgIG91dHB1dC5wdXNoKHN0cmVhbS5uZXh0KCkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtYXRjaGVkID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIG1hdGNoZXIgaW4gdW5lc2NhcGVzKSB7XG4gICAgICAgICAgaWYgKHN0cmVhbS5tYXRjaChtYXRjaGVyLCB0cnVlKSkge1xuICAgICAgICAgICAgbWF0Y2hlZCA9IHRydWU7XG4gICAgICAgICAgICBvdXRwdXQucHVzaCh1bmVzY2FwZXNbbWF0Y2hlcl0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghbWF0Y2hlZCkge1xuICAgICAgICAgIC8vIERvbid0IGNoYW5nZSBhbnl0aGluZ1xuICAgICAgICAgIG91dHB1dC5wdXNoKHN0cmVhbS5uZXh0KCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0cHV0LmpvaW4oJycpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEV4dHJhY3QgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbiBmcm9tIHRoZSBxdWVyeSBhbmQgcmV0dXJuIGEgUmVnZXhwIG9iamVjdC5cbiAgICAgKiBSZXR1cm5zIG51bGwgaWYgdGhlIHF1ZXJ5IGlzIGJsYW5rLlxuICAgICAqIElmIGlnbm9yZUNhc2UgaXMgcGFzc2VkIGluLCB0aGUgUmVnZXhwIG9iamVjdCB3aWxsIGhhdmUgdGhlICdpJyBmbGFnIHNldC5cbiAgICAgKiBJZiBzbWFydENhc2UgaXMgcGFzc2VkIGluLCBhbmQgdGhlIHF1ZXJ5IGNvbnRhaW5zIHVwcGVyIGNhc2UgbGV0dGVycyxcbiAgICAgKiAgIHRoZW4gaWdub3JlQ2FzZSBpcyBvdmVycmlkZGVuLCBhbmQgdGhlICdpJyBmbGFnIHdpbGwgbm90IGJlIHNldC5cbiAgICAgKiBJZiB0aGUgcXVlcnkgY29udGFpbnMgdGhlIC9pIGluIHRoZSBmbGFnIHBhcnQgb2YgdGhlIHJlZ3VsYXIgZXhwcmVzc2lvbixcbiAgICAgKiAgIHRoZW4gYm90aCBpZ25vcmVDYXNlIGFuZCBzbWFydENhc2UgYXJlIGlnbm9yZWQsIGFuZCAnaScgd2lsbCBiZSBwYXNzZWRcbiAgICAgKiAgIHRocm91Z2ggdG8gdGhlIFJlZ2V4IG9iamVjdC5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBwYXJzZVF1ZXJ5KHF1ZXJ5LCBpZ25vcmVDYXNlLCBzbWFydENhc2UpIHtcbiAgICAgIC8vIEZpcnN0IHVwZGF0ZSB0aGUgbGFzdCBzZWFyY2ggcmVnaXN0ZXJcbiAgICAgIHZhciBsYXN0U2VhcmNoUmVnaXN0ZXIgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIuZ2V0UmVnaXN0ZXIoJy8nKTtcbiAgICAgIGxhc3RTZWFyY2hSZWdpc3Rlci5zZXRUZXh0KHF1ZXJ5KTtcbiAgICAgIC8vIENoZWNrIGlmIHRoZSBxdWVyeSBpcyBhbHJlYWR5IGEgcmVnZXguXG4gICAgICBpZiAocXVlcnkgaW5zdGFuY2VvZiBSZWdFeHApIHsgcmV0dXJuIHF1ZXJ5OyB9XG4gICAgICAvLyBGaXJzdCB0cnkgdG8gZXh0cmFjdCByZWdleCArIGZsYWdzIGZyb20gdGhlIGlucHV0LiBJZiBubyBmbGFncyBmb3VuZCxcbiAgICAgIC8vIGV4dHJhY3QganVzdCB0aGUgcmVnZXguIElFIGRvZXMgbm90IGFjY2VwdCBmbGFncyBkaXJlY3RseSBkZWZpbmVkIGluXG4gICAgICAvLyB0aGUgcmVnZXggc3RyaW5nIGluIHRoZSBmb3JtIC9yZWdleC9mbGFnc1xuICAgICAgdmFyIHNsYXNoZXMgPSBmaW5kVW5lc2NhcGVkU2xhc2hlcyhxdWVyeSk7XG4gICAgICB2YXIgcmVnZXhQYXJ0O1xuICAgICAgdmFyIGZvcmNlSWdub3JlQ2FzZTtcbiAgICAgIGlmICghc2xhc2hlcy5sZW5ndGgpIHtcbiAgICAgICAgLy8gUXVlcnkgbG9va3MgbGlrZSAncmVnZXhwJ1xuICAgICAgICByZWdleFBhcnQgPSBxdWVyeTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFF1ZXJ5IGxvb2tzIGxpa2UgJ3JlZ2V4cC8uLi4nXG4gICAgICAgIHJlZ2V4UGFydCA9IHF1ZXJ5LnN1YnN0cmluZygwLCBzbGFzaGVzWzBdKTtcbiAgICAgICAgdmFyIGZsYWdzUGFydCA9IHF1ZXJ5LnN1YnN0cmluZyhzbGFzaGVzWzBdKTtcbiAgICAgICAgZm9yY2VJZ25vcmVDYXNlID0gKGZsYWdzUGFydC5pbmRleE9mKCdpJykgIT0gLTEpO1xuICAgICAgfVxuICAgICAgaWYgKCFyZWdleFBhcnQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICBpZiAoIWdldE9wdGlvbigncGNyZScpKSB7XG4gICAgICAgIHJlZ2V4UGFydCA9IHRyYW5zbGF0ZVJlZ2V4KHJlZ2V4UGFydCk7XG4gICAgICB9XG4gICAgICBpZiAoc21hcnRDYXNlKSB7XG4gICAgICAgIGlnbm9yZUNhc2UgPSAoL15bXkEtWl0qJC8pLnRlc3QocmVnZXhQYXJ0KTtcbiAgICAgIH1cbiAgICAgIHZhciByZWdleHAgPSBuZXcgUmVnRXhwKHJlZ2V4UGFydCxcbiAgICAgICAgICAoaWdub3JlQ2FzZSB8fCBmb3JjZUlnbm9yZUNhc2UpID8gJ2ltJyA6ICdtJyk7XG4gICAgICByZXR1cm4gcmVnZXhwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGRvbSAtIERvY3VtZW50IE9iamVjdCBNYW5pcHVsYXRvclxuICAgICAqIFVzYWdlOlxuICAgICAqICAgZG9tKCc8dGFnPid8PG5vZGU+WywgLi4uezxhdHRyaWJ1dGVzPnw8JHN0eWxlcz59fDxjaGlsZC1ub2RlPnwnPHRleHQ+J10pXG4gICAgICogRXhhbXBsZXM6XG4gICAgICogICBkb20oJ2RpdicsIHtpZDoneHl6J30sIGRvbSgncCcsICdDTSByb2NrcyEnLCB7JGNvbG9yOidyZWQnfSkpXG4gICAgICogICBkb20oZG9jdW1lbnQuaGVhZCwgZG9tKCdzY3JpcHQnLCAnYWxlcnQoXCJoZWxsbyFcIiknKSlcbiAgICAgKiBOb3Qgc3VwcG9ydGVkOlxuICAgICAqICAgZG9tKCdwJywgWydhcnJheXMgYXJlIG9iamVjdHMnXSwgRXJyb3IoJ29iamVjdHMgc3BlY2lmeSBhdHRyaWJ1dGVzJykpXG4gICAgICovXG4gICAgZnVuY3Rpb24gZG9tKG4pIHtcbiAgICAgIGlmICh0eXBlb2YgbiA9PT0gJ3N0cmluZycpIG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG4pO1xuICAgICAgZm9yICh2YXIgYSwgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCEoYSA9IGFyZ3VtZW50c1tpXSkpIGNvbnRpbnVlO1xuICAgICAgICBpZiAodHlwZW9mIGEgIT09ICdvYmplY3QnKSBhID0gZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoYSk7XG4gICAgICAgIGlmIChhLm5vZGVUeXBlKSBuLmFwcGVuZENoaWxkKGEpO1xuICAgICAgICBlbHNlIGZvciAodmFyIGtleSBpbiBhKSB7XG4gICAgICAgICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYSwga2V5KSkgY29udGludWU7XG4gICAgICAgICAgaWYgKGtleVswXSA9PT0gJyQnKSBuLnN0eWxlW2tleS5zbGljZSgxKV0gPSBhW2tleV07XG4gICAgICAgICAgZWxzZSBuLnNldEF0dHJpYnV0ZShrZXksIGFba2V5XSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBuO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3dDb25maXJtKGNtLCB0ZW1wbGF0ZSkge1xuICAgICAgdmFyIHByZSA9IGRvbSgnZGl2JywgeyRjb2xvcjogJ3JlZCcsICR3aGl0ZVNwYWNlOiAncHJlJywgY2xhc3M6ICdjbS12aW0tbWVzc2FnZSd9LCB0ZW1wbGF0ZSk7XG4gICAgICBpZiAoY20ub3Blbk5vdGlmaWNhdGlvbikge1xuICAgICAgICBjbS5vcGVuTm90aWZpY2F0aW9uKHByZSwge2JvdHRvbTogdHJ1ZSwgZHVyYXRpb246IDUwMDB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsZXJ0KHByZS5pbm5lclRleHQpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1ha2VQcm9tcHQocHJlZml4LCBkZXNjKSB7XG4gICAgICByZXR1cm4gZG9tKCdkaXYnLCB7JGRpc3BsYXk6ICdmbGV4J30sXG4gICAgICAgICAgICAgICBkb20oJ3NwYW4nLCB7JGZvbnRGYW1pbHk6ICdtb25vc3BhY2UnLCAkd2hpdGVTcGFjZTogJ3ByZScsICRmbGV4OiAxfSxcbiAgICAgICAgICAgICAgICAgcHJlZml4LFxuICAgICAgICAgICAgICAgICBkb20oJ2lucHV0Jywge3R5cGU6ICd0ZXh0JywgYXV0b2NvcnJlY3Q6ICdvZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9jYXBpdGFsaXplOiAnb2ZmJywgc3BlbGxjaGVjazogJ2ZhbHNlJywgJHdpZHRoOiAnMTAwJSd9KSksXG4gICAgICAgICAgICAgICBkZXNjICYmIGRvbSgnc3BhbicsIHskY29sb3I6ICcjODg4J30sIGRlc2MpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93UHJvbXB0KGNtLCBvcHRpb25zKSB7XG4gICAgICBpZiAoa2V5VG9LZXlTdGFjay5sZW5ndGgpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLnZhbHVlKSBvcHRpb25zLnZhbHVlID0gJyc7XG4gICAgICAgIHZpcnR1YWxQcm9tcHQgPSBvcHRpb25zO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgdGVtcGxhdGUgPSBtYWtlUHJvbXB0KG9wdGlvbnMucHJlZml4LCBvcHRpb25zLmRlc2MpO1xuICAgICAgaWYgKGNtLm9wZW5EaWFsb2cpIHtcbiAgICAgICAgY20ub3BlbkRpYWxvZyh0ZW1wbGF0ZSwgb3B0aW9ucy5vbkNsb3NlLCB7XG4gICAgICAgICAgb25LZXlEb3duOiBvcHRpb25zLm9uS2V5RG93biwgb25LZXlVcDogb3B0aW9ucy5vbktleVVwLFxuICAgICAgICAgIGJvdHRvbTogdHJ1ZSwgc2VsZWN0VmFsdWVPbk9wZW46IGZhbHNlLCB2YWx1ZTogb3B0aW9ucy52YWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB2YXIgc2hvcnRUZXh0ID0gJyc7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5wcmVmaXggIT0gXCJzdHJpbmdcIiAmJiBvcHRpb25zLnByZWZpeCkgc2hvcnRUZXh0ICs9IG9wdGlvbnMucHJlZml4LnRleHRDb250ZW50O1xuICAgICAgICBpZiAob3B0aW9ucy5kZXNjKSBzaG9ydFRleHQgKz0gXCIgXCIgKyBvcHRpb25zLmRlc2M7XG4gICAgICAgIG9wdGlvbnMub25DbG9zZShwcm9tcHQoc2hvcnRUZXh0LCAnJykpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZ2V4RXF1YWwocjEsIHIyKSB7XG4gICAgICBpZiAocjEgaW5zdGFuY2VvZiBSZWdFeHAgJiYgcjIgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICB2YXIgcHJvcHMgPSBbJ2dsb2JhbCcsICdtdWx0aWxpbmUnLCAnaWdub3JlQ2FzZScsICdzb3VyY2UnXTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBwcm9wID0gcHJvcHNbaV07XG4gICAgICAgICAgICAgIGlmIChyMVtwcm9wXSAhPT0gcjJbcHJvcF0pIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgLy8gUmV0dXJucyB0cnVlIGlmIHRoZSBxdWVyeSBpcyB2YWxpZC5cbiAgICBmdW5jdGlvbiB1cGRhdGVTZWFyY2hRdWVyeShjbSwgcmF3UXVlcnksIGlnbm9yZUNhc2UsIHNtYXJ0Q2FzZSkge1xuICAgICAgaWYgKCFyYXdRdWVyeSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgc3RhdGUgPSBnZXRTZWFyY2hTdGF0ZShjbSk7XG4gICAgICB2YXIgcXVlcnkgPSBwYXJzZVF1ZXJ5KHJhd1F1ZXJ5LCAhIWlnbm9yZUNhc2UsICEhc21hcnRDYXNlKTtcbiAgICAgIGlmICghcXVlcnkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaGlnaGxpZ2h0U2VhcmNoTWF0Y2hlcyhjbSwgcXVlcnkpO1xuICAgICAgaWYgKHJlZ2V4RXF1YWwocXVlcnksIHN0YXRlLmdldFF1ZXJ5KCkpKSB7XG4gICAgICAgIHJldHVybiBxdWVyeTtcbiAgICAgIH1cbiAgICAgIHN0YXRlLnNldFF1ZXJ5KHF1ZXJ5KTtcbiAgICAgIHJldHVybiBxdWVyeTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2VhcmNoT3ZlcmxheShxdWVyeSkge1xuICAgICAgaWYgKHF1ZXJ5LnNvdXJjZS5jaGFyQXQoMCkgPT0gJ14nKSB7XG4gICAgICAgIHZhciBtYXRjaFNvbCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbjogZnVuY3Rpb24oc3RyZWFtKSB7XG4gICAgICAgICAgaWYgKG1hdGNoU29sICYmICFzdHJlYW0uc29sKCkpIHtcbiAgICAgICAgICAgIHN0cmVhbS5za2lwVG9FbmQoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIG1hdGNoID0gc3RyZWFtLm1hdGNoKHF1ZXJ5LCBmYWxzZSk7XG4gICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBpZiAobWF0Y2hbMF0ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgLy8gTWF0Y2hlZCBlbXB0eSBzdHJpbmcsIHNraXAgdG8gbmV4dC5cbiAgICAgICAgICAgICAgc3RyZWFtLm5leHQoKTtcbiAgICAgICAgICAgICAgcmV0dXJuICdzZWFyY2hpbmcnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFzdHJlYW0uc29sKCkpIHtcbiAgICAgICAgICAgICAgLy8gQmFja3RyYWNrIDEgdG8gbWF0Y2ggXFxiXG4gICAgICAgICAgICAgIHN0cmVhbS5iYWNrVXAoMSk7XG4gICAgICAgICAgICAgIGlmICghcXVlcnkuZXhlYyhzdHJlYW0ubmV4dCgpICsgbWF0Y2hbMF0pKSB7XG4gICAgICAgICAgICAgICAgc3RyZWFtLm5leHQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RyZWFtLm1hdGNoKHF1ZXJ5KTtcbiAgICAgICAgICAgIHJldHVybiAnc2VhcmNoaW5nJztcbiAgICAgICAgICB9XG4gICAgICAgICAgd2hpbGUgKCFzdHJlYW0uZW9sKCkpIHtcbiAgICAgICAgICAgIHN0cmVhbS5uZXh0KCk7XG4gICAgICAgICAgICBpZiAoc3RyZWFtLm1hdGNoKHF1ZXJ5LCBmYWxzZSkpIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcXVlcnk6IHF1ZXJ5XG4gICAgICB9O1xuICAgIH1cbiAgICB2YXIgaGlnaGxpZ2h0VGltZW91dCA9IDA7XG4gICAgZnVuY3Rpb24gaGlnaGxpZ2h0U2VhcmNoTWF0Y2hlcyhjbSwgcXVlcnkpIHtcbiAgICAgIGNsZWFyVGltZW91dChoaWdobGlnaHRUaW1lb3V0KTtcbiAgICAgIHZhciBzZWFyY2hTdGF0ZSA9IGdldFNlYXJjaFN0YXRlKGNtKTtcbiAgICAgIHNlYXJjaFN0YXRlLmhpZ2hsaWdodFRpbWVvdXQgPSBoaWdobGlnaHRUaW1lb3V0O1xuICAgICAgaGlnaGxpZ2h0VGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghY20uc3RhdGUudmltKSByZXR1cm47XG4gICAgICAgIHZhciBzZWFyY2hTdGF0ZSA9IGdldFNlYXJjaFN0YXRlKGNtKTtcbiAgICAgICAgc2VhcmNoU3RhdGUuaGlnaGxpZ2h0VGltZW91dCA9IG51bGw7XG4gICAgICAgIHZhciBvdmVybGF5ID0gc2VhcmNoU3RhdGUuZ2V0T3ZlcmxheSgpO1xuICAgICAgICBpZiAoIW92ZXJsYXkgfHwgcXVlcnkgIT0gb3ZlcmxheS5xdWVyeSkge1xuICAgICAgICAgIGlmIChvdmVybGF5KSB7XG4gICAgICAgICAgICBjbS5yZW1vdmVPdmVybGF5KG92ZXJsYXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBvdmVybGF5ID0gc2VhcmNoT3ZlcmxheShxdWVyeSk7XG4gICAgICAgICAgY20uYWRkT3ZlcmxheShvdmVybGF5KTtcbiAgICAgICAgICBpZiAoY20uc2hvd01hdGNoZXNPblNjcm9sbGJhcikge1xuICAgICAgICAgICAgaWYgKHNlYXJjaFN0YXRlLmdldFNjcm9sbGJhckFubm90YXRlKCkpIHtcbiAgICAgICAgICAgICAgc2VhcmNoU3RhdGUuZ2V0U2Nyb2xsYmFyQW5ub3RhdGUoKS5jbGVhcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VhcmNoU3RhdGUuc2V0U2Nyb2xsYmFyQW5ub3RhdGUoY20uc2hvd01hdGNoZXNPblNjcm9sbGJhcihxdWVyeSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZWFyY2hTdGF0ZS5zZXRPdmVybGF5KG92ZXJsYXkpO1xuICAgICAgICB9XG4gICAgICB9LCA1MCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZpbmROZXh0KGNtLCBwcmV2LCBxdWVyeSwgcmVwZWF0KSB7XG4gICAgICBpZiAocmVwZWF0ID09PSB1bmRlZmluZWQpIHsgcmVwZWF0ID0gMTsgfVxuICAgICAgcmV0dXJuIGNtLm9wZXJhdGlvbihmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBvcyA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICB2YXIgY3Vyc29yID0gY20uZ2V0U2VhcmNoQ3Vyc29yKHF1ZXJ5LCBwb3MpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcGVhdDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGZvdW5kID0gY3Vyc29yLmZpbmQocHJldik7XG4gICAgICAgICAgaWYgKGkgPT0gMCAmJiBmb3VuZCAmJiBjdXJzb3JFcXVhbChjdXJzb3IuZnJvbSgpLCBwb3MpKSB7XG4gICAgICAgICAgICB2YXIgbGFzdEVuZFBvcyA9IHByZXYgPyBjdXJzb3IuZnJvbSgpIDogY3Vyc29yLnRvKCk7XG4gICAgICAgICAgICBmb3VuZCA9IGN1cnNvci5maW5kKHByZXYpO1xuICAgICAgICAgICAgaWYgKGZvdW5kICYmICFmb3VuZFswXSAmJiBjdXJzb3JFcXVhbChjdXJzb3IuZnJvbSgpLCBsYXN0RW5kUG9zKSkge1xuICAgICAgICAgICAgICBpZiAoY20uZ2V0TGluZShsYXN0RW5kUG9zLmxpbmUpLmxlbmd0aCA9PSBsYXN0RW5kUG9zLmNoKVxuICAgICAgICAgICAgICAgIGZvdW5kID0gY3Vyc29yLmZpbmQocHJldik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgIC8vIFNlYXJjaEN1cnNvciBtYXkgaGF2ZSByZXR1cm5lZCBudWxsIGJlY2F1c2UgaXQgaGl0IEVPRiwgd3JhcFxuICAgICAgICAgICAgLy8gYXJvdW5kIGFuZCB0cnkgYWdhaW4uXG4gICAgICAgICAgICBjdXJzb3IgPSBjbS5nZXRTZWFyY2hDdXJzb3IocXVlcnksXG4gICAgICAgICAgICAgICAgKHByZXYpID8gbmV3IFBvcyhjbS5sYXN0TGluZSgpKSA6IG5ldyBQb3MoY20uZmlyc3RMaW5lKCksIDApICk7XG4gICAgICAgICAgICBpZiAoIWN1cnNvci5maW5kKHByZXYpKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnNvci5mcm9tKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJldHR5IG11Y2ggdGhlIHNhbWUgYXMgYGZpbmROZXh0YCwgZXhjZXB0IGZvciB0aGUgZm9sbG93aW5nIGRpZmZlcmVuY2VzOlxuICAgICAqXG4gICAgICogMS4gQmVmb3JlIHN0YXJ0aW5nIHRoZSBzZWFyY2gsIG1vdmUgdG8gdGhlIHByZXZpb3VzIHNlYXJjaC4gVGhpcyB3YXkgaWYgb3VyIGN1cnNvciBpc1xuICAgICAqIGFscmVhZHkgaW5zaWRlIGEgbWF0Y2gsIHdlIHNob3VsZCByZXR1cm4gdGhlIGN1cnJlbnQgbWF0Y2guXG4gICAgICogMi4gUmF0aGVyIHRoYW4gb25seSByZXR1cm5pbmcgdGhlIGN1cnNvcidzIGZyb20sIHdlIHJldHVybiB0aGUgY3Vyc29yJ3MgZnJvbSBhbmQgdG8gYXMgYSB0dXBsZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmaW5kTmV4dEZyb21BbmRUb0luY2x1c2l2ZShjbSwgcHJldiwgcXVlcnksIHJlcGVhdCwgdmltKSB7XG4gICAgICBpZiAocmVwZWF0ID09PSB1bmRlZmluZWQpIHsgcmVwZWF0ID0gMTsgfVxuICAgICAgcmV0dXJuIGNtLm9wZXJhdGlvbihmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHBvcyA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICB2YXIgY3Vyc29yID0gY20uZ2V0U2VhcmNoQ3Vyc29yKHF1ZXJ5LCBwb3MpO1xuXG4gICAgICAgIC8vIEdvIGJhY2sgb25lIHJlc3VsdCB0byBlbnN1cmUgdGhhdCBpZiB0aGUgY3Vyc29yIGlzIGN1cnJlbnRseSBhIG1hdGNoLCB3ZSBrZWVwIGl0LlxuICAgICAgICB2YXIgZm91bmQgPSBjdXJzb3IuZmluZCghcHJldik7XG5cbiAgICAgICAgLy8gSWYgd2UgaGF2ZW4ndCBtb3ZlZCwgZ28gYmFjayBvbmUgbW9yZSAoc2ltaWxhciB0byBpZiBpPT0wIGxvZ2ljIGluIGZpbmROZXh0KS5cbiAgICAgICAgaWYgKCF2aW0udmlzdWFsTW9kZSAmJiBmb3VuZCAmJiBjdXJzb3JFcXVhbChjdXJzb3IuZnJvbSgpLCBwb3MpKSB7XG4gICAgICAgICAgY3Vyc29yLmZpbmQoIXByZXYpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXBlYXQ7IGkrKykge1xuICAgICAgICAgIGZvdW5kID0gY3Vyc29yLmZpbmQocHJldik7XG4gICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgLy8gU2VhcmNoQ3Vyc29yIG1heSBoYXZlIHJldHVybmVkIG51bGwgYmVjYXVzZSBpdCBoaXQgRU9GLCB3cmFwXG4gICAgICAgICAgICAvLyBhcm91bmQgYW5kIHRyeSBhZ2Fpbi5cbiAgICAgICAgICAgIGN1cnNvciA9IGNtLmdldFNlYXJjaEN1cnNvcihxdWVyeSxcbiAgICAgICAgICAgICAgICAocHJldikgPyBuZXcgUG9zKGNtLmxhc3RMaW5lKCkpIDogbmV3IFBvcyhjbS5maXJzdExpbmUoKSwgMCkgKTtcbiAgICAgICAgICAgIGlmICghY3Vyc29yLmZpbmQocHJldikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2N1cnNvci5mcm9tKCksIGN1cnNvci50bygpXTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjbGVhclNlYXJjaEhpZ2hsaWdodChjbSkge1xuICAgICAgdmFyIHN0YXRlID0gZ2V0U2VhcmNoU3RhdGUoY20pO1xuICAgICAgaWYgKHN0YXRlLmhpZ2hsaWdodFRpbWVvdXQpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHN0YXRlLmhpZ2hsaWdodFRpbWVvdXQpO1xuICAgICAgICBzdGF0ZS5oaWdobGlnaHRUaW1lb3V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIGNtLnJlbW92ZU92ZXJsYXkoZ2V0U2VhcmNoU3RhdGUoY20pLmdldE92ZXJsYXkoKSk7XG4gICAgICBzdGF0ZS5zZXRPdmVybGF5KG51bGwpO1xuICAgICAgaWYgKHN0YXRlLmdldFNjcm9sbGJhckFubm90YXRlKCkpIHtcbiAgICAgICAgc3RhdGUuZ2V0U2Nyb2xsYmFyQW5ub3RhdGUoKS5jbGVhcigpO1xuICAgICAgICBzdGF0ZS5zZXRTY3JvbGxiYXJBbm5vdGF0ZShudWxsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgcG9zIGlzIGluIHRoZSBzcGVjaWZpZWQgcmFuZ2UsIElOQ0xVU0lWRS5cbiAgICAgKiBSYW5nZSBjYW4gYmUgc3BlY2lmaWVkIHdpdGggMSBvciAyIGFyZ3VtZW50cy5cbiAgICAgKiBJZiB0aGUgZmlyc3QgcmFuZ2UgYXJndW1lbnQgaXMgYW4gYXJyYXksIHRyZWF0IGl0IGFzIGFuIGFycmF5IG9mIGxpbmVcbiAgICAgKiBudW1iZXJzLiBNYXRjaCBwb3MgYWdhaW5zdCBhbnkgb2YgdGhlIGxpbmVzLlxuICAgICAqIElmIHRoZSBmaXJzdCByYW5nZSBhcmd1bWVudCBpcyBhIG51bWJlcixcbiAgICAgKiAgIGlmIHRoZXJlIGlzIG9ubHkgMSByYW5nZSBhcmd1bWVudCwgY2hlY2sgaWYgcG9zIGhhcyB0aGUgc2FtZSBsaW5lXG4gICAgICogICAgICAgbnVtYmVyXG4gICAgICogICBpZiB0aGVyZSBhcmUgMiByYW5nZSBhcmd1bWVudHMsIHRoZW4gY2hlY2sgaWYgcG9zIGlzIGluIGJldHdlZW4gdGhlIHR3b1xuICAgICAqICAgICAgIHJhbmdlIGFyZ3VtZW50cy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBpc0luUmFuZ2UocG9zLCBzdGFydCwgZW5kKSB7XG4gICAgICBpZiAodHlwZW9mIHBvcyAhPSAnbnVtYmVyJykge1xuICAgICAgICAvLyBBc3N1bWUgaXQgaXMgYSBjdXJzb3IgcG9zaXRpb24uIEdldCB0aGUgbGluZSBudW1iZXIuXG4gICAgICAgIHBvcyA9IHBvcy5saW5lO1xuICAgICAgfVxuICAgICAgaWYgKHN0YXJ0IGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIGluQXJyYXkocG9zLCBzdGFydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAodHlwZW9mIGVuZCA9PSAnbnVtYmVyJykge1xuICAgICAgICAgIHJldHVybiAocG9zID49IHN0YXJ0ICYmIHBvcyA8PSBlbmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBwb3MgPT0gc3RhcnQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0VXNlclZpc2libGVMaW5lcyhjbSkge1xuICAgICAgLy8gYWNlX3BhdGNoe1xuICAgICAgdmFyIHJlbmRlcmVyID0gY20uYWNlLnJlbmRlcmVyO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG9wOiByZW5kZXJlci5nZXRGaXJzdEZ1bGx5VmlzaWJsZVJvdygpLFxuICAgICAgICBib3R0b206IHJlbmRlcmVyLmdldExhc3RGdWxseVZpc2libGVSb3coKVxuICAgICAgfVxuICAgICAgLy8gYWNlX3BhdGNofVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE1hcmtQb3MoY20sIHZpbSwgbWFya05hbWUpIHtcbiAgICAgIGlmIChtYXJrTmFtZSA9PSAnXFwnJyB8fCBtYXJrTmFtZSA9PSAnYCcpIHtcbiAgICAgICAgcmV0dXJuIHZpbUdsb2JhbFN0YXRlLmp1bXBMaXN0LmZpbmQoY20sIC0xKSB8fCBuZXcgUG9zKDAsIDApO1xuICAgICAgfSBlbHNlIGlmIChtYXJrTmFtZSA9PSAnLicpIHtcbiAgICAgICAgcmV0dXJuIGdldExhc3RFZGl0UG9zKGNtKTtcbiAgICAgIH1cblxuICAgICAgdmFyIG1hcmsgPSB2aW0ubWFya3NbbWFya05hbWVdO1xuICAgICAgcmV0dXJuIG1hcmsgJiYgbWFyay5maW5kKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TGFzdEVkaXRQb3MoY20pIHtcbiAgICAgIGlmIChjbS5nZXRMYXN0RWRpdEVuZCkge1xuICAgICAgICByZXR1cm4gY20uZ2V0TGFzdEVkaXRFbmQoKTtcbiAgICAgIH1cbiAgICAgIC8vIGZvciBvbGQgY21cbiAgICAgIHZhciBkb25lID0gY20uZG9jLmhpc3RvcnkuZG9uZTtcbiAgICAgIGZvciAodmFyIGkgPSBkb25lLmxlbmd0aDsgaS0tOykge1xuICAgICAgICBpZiAoZG9uZVtpXS5jaGFuZ2VzKSB7XG4gICAgICAgICAgcmV0dXJuIGNvcHlDdXJzb3IoZG9uZVtpXS5jaGFuZ2VzWzBdLnRvKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBFeENvbW1hbmREaXNwYXRjaGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmJ1aWxkQ29tbWFuZE1hcF8oKTtcbiAgICB9O1xuICAgIEV4Q29tbWFuZERpc3BhdGNoZXIucHJvdG90eXBlID0ge1xuICAgICAgcHJvY2Vzc0NvbW1hbmQ6IGZ1bmN0aW9uKGNtLCBpbnB1dCwgb3B0X3BhcmFtcykge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIGNtLm9wZXJhdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY20uY3VyT3AuaXNWaW1PcCA9IHRydWU7XG4gICAgICAgICAgdGhhdC5fcHJvY2Vzc0NvbW1hbmQoY20sIGlucHV0LCBvcHRfcGFyYW1zKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgX3Byb2Nlc3NDb21tYW5kOiBmdW5jdGlvbihjbSwgaW5wdXQsIG9wdF9wYXJhbXMpIHtcbiAgICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgICAgdmFyIGNvbW1hbmRIaXN0b3J5UmVnaXN0ZXIgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIuZ2V0UmVnaXN0ZXIoJzonKTtcbiAgICAgICAgdmFyIHByZXZpb3VzQ29tbWFuZCA9IGNvbW1hbmRIaXN0b3J5UmVnaXN0ZXIudG9TdHJpbmcoKTtcbiAgICAgICAgdmFyIGlucHV0U3RyZWFtID0gbmV3IENvZGVNaXJyb3IuU3RyaW5nU3RyZWFtKGlucHV0KTtcbiAgICAgICAgLy8gdXBkYXRlIFwiOiB3aXRoIHRoZSBsYXRlc3QgY29tbWFuZCB3aGV0aGVyIHZhbGlkIG9yIGludmFsaWRcbiAgICAgICAgY29tbWFuZEhpc3RvcnlSZWdpc3Rlci5zZXRUZXh0KGlucHV0KTtcbiAgICAgICAgdmFyIHBhcmFtcyA9IG9wdF9wYXJhbXMgfHwge307XG4gICAgICAgIHBhcmFtcy5pbnB1dCA9IGlucHV0O1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHRoaXMucGFyc2VJbnB1dF8oY20sIGlucHV0U3RyZWFtLCBwYXJhbXMpO1xuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICBzaG93Q29uZmlybShjbSwgZS50b1N0cmluZygpKTtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgZXhpdFZpc3VhbE1vZGUoY20pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGNvbW1hbmQ7XG4gICAgICAgIHZhciBjb21tYW5kTmFtZTtcbiAgICAgICAgaWYgKCFwYXJhbXMuY29tbWFuZE5hbWUpIHtcbiAgICAgICAgICAvLyBJZiBvbmx5IGEgbGluZSByYW5nZSBpcyBkZWZpbmVkLCBtb3ZlIHRvIHRoZSBsaW5lLlxuICAgICAgICAgIGlmIChwYXJhbXMubGluZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBjb21tYW5kTmFtZSA9ICdtb3ZlJztcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29tbWFuZCA9IHRoaXMubWF0Y2hDb21tYW5kXyhwYXJhbXMuY29tbWFuZE5hbWUpO1xuICAgICAgICAgIGlmIChjb21tYW5kKSB7XG4gICAgICAgICAgICBjb21tYW5kTmFtZSA9IGNvbW1hbmQubmFtZTtcbiAgICAgICAgICAgIGlmIChjb21tYW5kLmV4Y2x1ZGVGcm9tQ29tbWFuZEhpc3RvcnkpIHtcbiAgICAgICAgICAgICAgY29tbWFuZEhpc3RvcnlSZWdpc3Rlci5zZXRUZXh0KHByZXZpb3VzQ29tbWFuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnBhcnNlQ29tbWFuZEFyZ3NfKGlucHV0U3RyZWFtLCBwYXJhbXMsIGNvbW1hbmQpO1xuICAgICAgICAgICAgaWYgKGNvbW1hbmQudHlwZSA9PSAnZXhUb0tleScpIHtcbiAgICAgICAgICAgICAgLy8gSGFuZGxlIEV4IHRvIEtleSBtYXBwaW5nLlxuICAgICAgICAgICAgICBkb0tleVRvS2V5KGNtLCBjb21tYW5kLnRvS2V5cywgY29tbWFuZCk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29tbWFuZC50eXBlID09ICdleFRvRXgnKSB7XG4gICAgICAgICAgICAgIC8vIEhhbmRsZSBFeCB0byBFeCBtYXBwaW5nLlxuICAgICAgICAgICAgICB0aGlzLnByb2Nlc3NDb21tYW5kKGNtLCBjb21tYW5kLnRvSW5wdXQpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghY29tbWFuZE5hbWUpIHtcbiAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ05vdCBhbiBlZGl0b3IgY29tbWFuZCBcIjonICsgaW5wdXQgKyAnXCInKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBleENvbW1hbmRzW2NvbW1hbmROYW1lXShjbSwgcGFyYW1zKTtcbiAgICAgICAgICAvLyBQb3NzaWJseSBhc3luY2hyb25vdXMgY29tbWFuZHMgKGUuZy4gc3Vic3RpdHV0ZSwgd2hpY2ggbWlnaHQgaGF2ZSBhXG4gICAgICAgICAgLy8gdXNlciBjb25maXJtYXRpb24pLCBhcmUgcmVzcG9uc2libGUgZm9yIGNhbGxpbmcgdGhlIGNhbGxiYWNrIHdoZW5cbiAgICAgICAgICAvLyBkb25lLiBBbGwgb3RoZXJzIGhhdmUgaXQgdGFrZW4gY2FyZSBvZiBmb3IgdGhlbSBoZXJlLlxuICAgICAgICAgIGlmICgoIWNvbW1hbmQgfHwgIWNvbW1hbmQucG9zc2libHlBc3luYykgJiYgcGFyYW1zLmNhbGxiYWNrKSB7XG4gICAgICAgICAgICBwYXJhbXMuY2FsbGJhY2soKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgIHNob3dDb25maXJtKGNtLCBlLnRvU3RyaW5nKCkpO1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwYXJzZUlucHV0XzogZnVuY3Rpb24oY20sIGlucHV0U3RyZWFtLCByZXN1bHQpIHtcbiAgICAgICAgaW5wdXRTdHJlYW0uZWF0V2hpbGUoJzonKTtcbiAgICAgICAgLy8gUGFyc2UgcmFuZ2UuXG4gICAgICAgIGlmIChpbnB1dFN0cmVhbS5lYXQoJyUnKSkge1xuICAgICAgICAgIHJlc3VsdC5saW5lID0gY20uZmlyc3RMaW5lKCk7XG4gICAgICAgICAgcmVzdWx0LmxpbmVFbmQgPSBjbS5sYXN0TGluZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdC5saW5lID0gdGhpcy5wYXJzZUxpbmVTcGVjXyhjbSwgaW5wdXRTdHJlYW0pO1xuICAgICAgICAgIGlmIChyZXN1bHQubGluZSAhPT0gdW5kZWZpbmVkICYmIGlucHV0U3RyZWFtLmVhdCgnLCcpKSB7XG4gICAgICAgICAgICByZXN1bHQubGluZUVuZCA9IHRoaXMucGFyc2VMaW5lU3BlY18oY20sIGlucHV0U3RyZWFtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzdWx0LmxpbmUgPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgaWYgKGNtLnN0YXRlLnZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICB2YXIgcG9zID0gZ2V0TWFya1BvcyhjbSwgY20uc3RhdGUudmltLCAnPCcpO1xuICAgICAgICAgICAgcmVzdWx0LnNlbGVjdGlvbkxpbmUgPSBwb3MgJiYgcG9zLmxpbmU7XG4gICAgICAgICAgICBwb3MgPSBnZXRNYXJrUG9zKGNtLCBjbS5zdGF0ZS52aW0sICc+Jyk7XG4gICAgICAgICAgICByZXN1bHQuc2VsZWN0aW9uTGluZUVuZCA9IHBvcyAmJiBwb3MubGluZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0LnNlbGVjdGlvbkxpbmUgPSBjbS5nZXRDdXJzb3IoKS5saW5lO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHQuc2VsZWN0aW9uTGluZSA9IHJlc3VsdC5saW5lO1xuICAgICAgICAgIHJlc3VsdC5zZWxlY3Rpb25MaW5lRW5kID0gcmVzdWx0LmxpbmVFbmQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQYXJzZSBjb21tYW5kIG5hbWUuXG4gICAgICAgIHZhciBjb21tYW5kTWF0Y2ggPSBpbnB1dFN0cmVhbS5tYXRjaCgvXihcXHcrfCEhfEBAfFshIyYqPD0+QH5dKS8pO1xuICAgICAgICBpZiAoY29tbWFuZE1hdGNoKSB7XG4gICAgICAgICAgcmVzdWx0LmNvbW1hbmROYW1lID0gY29tbWFuZE1hdGNoWzFdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc3VsdC5jb21tYW5kTmFtZSA9IGlucHV0U3RyZWFtLm1hdGNoKC8uKi8pWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0sXG4gICAgICBwYXJzZUxpbmVTcGVjXzogZnVuY3Rpb24oY20sIGlucHV0U3RyZWFtKSB7XG4gICAgICAgIHZhciBudW1iZXJNYXRjaCA9IGlucHV0U3RyZWFtLm1hdGNoKC9eKFxcZCspLyk7XG4gICAgICAgIGlmIChudW1iZXJNYXRjaCkge1xuICAgICAgICAgIC8vIEFic29sdXRlIGxpbmUgbnVtYmVyIHBsdXMgb2Zmc2V0IChOK00gb3IgTi1NKSBpcyBwcm9iYWJseSBhIHR5cG8sXG4gICAgICAgICAgLy8gbm90IHNvbWV0aGluZyB0aGUgdXNlciBhY3R1YWxseSB3YW50ZWQuIChOQjogdmltIGRvZXMgYWxsb3cgdGhpcy4pXG4gICAgICAgICAgcmV0dXJuIHBhcnNlSW50KG51bWJlck1hdGNoWzFdLCAxMCkgLSAxO1xuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoaW5wdXRTdHJlYW0ubmV4dCgpKSB7XG4gICAgICAgICAgY2FzZSAnLic6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUxpbmVTcGVjT2Zmc2V0XyhpbnB1dFN0cmVhbSwgY20uZ2V0Q3Vyc29yKCkubGluZSk7XG4gICAgICAgICAgY2FzZSAnJCc6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUxpbmVTcGVjT2Zmc2V0XyhpbnB1dFN0cmVhbSwgY20ubGFzdExpbmUoKSk7XG4gICAgICAgICAgY2FzZSAnXFwnJzpcbiAgICAgICAgICAgIHZhciBtYXJrTmFtZSA9IGlucHV0U3RyZWFtLm5leHQoKTtcbiAgICAgICAgICAgIHZhciBtYXJrUG9zID0gZ2V0TWFya1BvcyhjbSwgY20uc3RhdGUudmltLCBtYXJrTmFtZSk7XG4gICAgICAgICAgICBpZiAoIW1hcmtQb3MpIHRocm93IG5ldyBFcnJvcignTWFyayBub3Qgc2V0Jyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUxpbmVTcGVjT2Zmc2V0XyhpbnB1dFN0cmVhbSwgbWFya1Bvcy5saW5lKTtcbiAgICAgICAgICBjYXNlICctJzpcbiAgICAgICAgICBjYXNlICcrJzpcbiAgICAgICAgICAgIGlucHV0U3RyZWFtLmJhY2tVcCgxKTtcbiAgICAgICAgICAgIC8vIE9mZnNldCBpcyByZWxhdGl2ZSB0byBjdXJyZW50IGxpbmUgaWYgbm90IG90aGVyd2lzZSBzcGVjaWZpZWQuXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wYXJzZUxpbmVTcGVjT2Zmc2V0XyhpbnB1dFN0cmVhbSwgY20uZ2V0Q3Vyc29yKCkubGluZSk7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGlucHV0U3RyZWFtLmJhY2tVcCgxKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwYXJzZUxpbmVTcGVjT2Zmc2V0XzogZnVuY3Rpb24oaW5wdXRTdHJlYW0sIGxpbmUpIHtcbiAgICAgICAgdmFyIG9mZnNldE1hdGNoID0gaW5wdXRTdHJlYW0ubWF0Y2goL14oWystXSk/KFxcZCspLyk7XG4gICAgICAgIGlmIChvZmZzZXRNYXRjaCkge1xuICAgICAgICAgIHZhciBvZmZzZXQgPSBwYXJzZUludChvZmZzZXRNYXRjaFsyXSwgMTApO1xuICAgICAgICAgIGlmIChvZmZzZXRNYXRjaFsxXSA9PSBcIi1cIikge1xuICAgICAgICAgICAgbGluZSAtPSBvZmZzZXQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpbmUgKz0gb2Zmc2V0O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGluZTtcbiAgICAgIH0sXG4gICAgICBwYXJzZUNvbW1hbmRBcmdzXzogZnVuY3Rpb24oaW5wdXRTdHJlYW0sIHBhcmFtcywgY29tbWFuZCkge1xuICAgICAgICBpZiAoaW5wdXRTdHJlYW0uZW9sKCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcGFyYW1zLmFyZ1N0cmluZyA9IGlucHV0U3RyZWFtLm1hdGNoKC8uKi8pWzBdO1xuICAgICAgICAvLyBQYXJzZSBjb21tYW5kLWxpbmUgYXJndW1lbnRzXG4gICAgICAgIHZhciBkZWxpbSA9IGNvbW1hbmQuYXJnRGVsaW1pdGVyIHx8IC9cXHMrLztcbiAgICAgICAgdmFyIGFyZ3MgPSB0cmltKHBhcmFtcy5hcmdTdHJpbmcpLnNwbGl0KGRlbGltKTtcbiAgICAgICAgaWYgKGFyZ3MubGVuZ3RoICYmIGFyZ3NbMF0pIHtcbiAgICAgICAgICBwYXJhbXMuYXJncyA9IGFyZ3M7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtYXRjaENvbW1hbmRfOiBmdW5jdGlvbihjb21tYW5kTmFtZSkge1xuICAgICAgICAvLyBSZXR1cm4gdGhlIGNvbW1hbmQgaW4gdGhlIGNvbW1hbmQgbWFwIHRoYXQgbWF0Y2hlcyB0aGUgc2hvcnRlc3RcbiAgICAgICAgLy8gcHJlZml4IG9mIHRoZSBwYXNzZWQgaW4gY29tbWFuZCBuYW1lLiBUaGUgbWF0Y2ggaXMgZ3VhcmFudGVlZCB0byBiZVxuICAgICAgICAvLyB1bmFtYmlndW91cyBpZiB0aGUgZGVmYXVsdEV4Q29tbWFuZE1hcCdzIHNob3J0TmFtZXMgYXJlIHNldCB1cFxuICAgICAgICAvLyBjb3JyZWN0bHkuIChzZWUgQGNvZGV7ZGVmYXVsdEV4Q29tbWFuZE1hcH0pLlxuICAgICAgICBmb3IgKHZhciBpID0gY29tbWFuZE5hbWUubGVuZ3RoOyBpID4gMDsgaS0tKSB7XG4gICAgICAgICAgdmFyIHByZWZpeCA9IGNvbW1hbmROYW1lLnN1YnN0cmluZygwLCBpKTtcbiAgICAgICAgICBpZiAodGhpcy5jb21tYW5kTWFwX1twcmVmaXhdKSB7XG4gICAgICAgICAgICB2YXIgY29tbWFuZCA9IHRoaXMuY29tbWFuZE1hcF9bcHJlZml4XTtcbiAgICAgICAgICAgIGlmIChjb21tYW5kLm5hbWUuaW5kZXhPZihjb21tYW5kTmFtZSkgPT09IDApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSxcbiAgICAgIGJ1aWxkQ29tbWFuZE1hcF86IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGlzLmNvbW1hbmRNYXBfID0ge307XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGVmYXVsdEV4Q29tbWFuZE1hcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHZhciBjb21tYW5kID0gZGVmYXVsdEV4Q29tbWFuZE1hcFtpXTtcbiAgICAgICAgICB2YXIga2V5ID0gY29tbWFuZC5zaG9ydE5hbWUgfHwgY29tbWFuZC5uYW1lO1xuICAgICAgICAgIHRoaXMuY29tbWFuZE1hcF9ba2V5XSA9IGNvbW1hbmQ7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtYXA6IGZ1bmN0aW9uKGxocywgcmhzLCBjdHgsIG5vcmVtYXApIHtcbiAgICAgICAgaWYgKGxocyAhPSAnOicgJiYgbGhzLmNoYXJBdCgwKSA9PSAnOicpIHtcbiAgICAgICAgICBpZiAoY3R4KSB7IHRocm93IEVycm9yKCdNb2RlIG5vdCBzdXBwb3J0ZWQgZm9yIGV4IG1hcHBpbmdzJyk7IH1cbiAgICAgICAgICB2YXIgY29tbWFuZE5hbWUgPSBsaHMuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgIGlmIChyaHMgIT0gJzonICYmIHJocy5jaGFyQXQoMCkgPT0gJzonKSB7XG4gICAgICAgICAgICAvLyBFeCB0byBFeCBtYXBwaW5nXG4gICAgICAgICAgICB0aGlzLmNvbW1hbmRNYXBfW2NvbW1hbmROYW1lXSA9IHtcbiAgICAgICAgICAgICAgbmFtZTogY29tbWFuZE5hbWUsXG4gICAgICAgICAgICAgIHR5cGU6ICdleFRvRXgnLFxuICAgICAgICAgICAgICB0b0lucHV0OiByaHMuc3Vic3RyaW5nKDEpLFxuICAgICAgICAgICAgICB1c2VyOiB0cnVlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBFeCB0byBrZXkgbWFwcGluZ1xuICAgICAgICAgICAgdGhpcy5jb21tYW5kTWFwX1tjb21tYW5kTmFtZV0gPSB7XG4gICAgICAgICAgICAgIG5hbWU6IGNvbW1hbmROYW1lLFxuICAgICAgICAgICAgICB0eXBlOiAnZXhUb0tleScsXG4gICAgICAgICAgICAgIHRvS2V5czogcmhzLFxuICAgICAgICAgICAgICB1c2VyOiB0cnVlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBLZXkgdG8ga2V5IG9yIGV4IG1hcHBpbmdcbiAgICAgICAgICB2YXIgbWFwcGluZyA9IHtcbiAgICAgICAgICAgIGtleXM6IGxocyxcbiAgICAgICAgICAgIHR5cGU6ICdrZXlUb0tleScsXG4gICAgICAgICAgICB0b0tleXM6IHJocyxcbiAgICAgICAgICAgIG5vcmVtYXA6ICEhbm9yZW1hcFxuICAgICAgICAgIH07XG4gICAgICAgICAgaWYgKGN0eCkgeyBtYXBwaW5nLmNvbnRleHQgPSBjdHg7IH1cbiAgICAgICAgICBkZWZhdWx0S2V5bWFwLnVuc2hpZnQobWFwcGluZyk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB1bm1hcDogZnVuY3Rpb24obGhzLCBjdHgpIHtcbiAgICAgICAgaWYgKGxocyAhPSAnOicgJiYgbGhzLmNoYXJBdCgwKSA9PSAnOicpIHtcbiAgICAgICAgICAvLyBFeCB0byBFeCBvciBFeCB0byBrZXkgbWFwcGluZ1xuICAgICAgICAgIGlmIChjdHgpIHsgdGhyb3cgRXJyb3IoJ01vZGUgbm90IHN1cHBvcnRlZCBmb3IgZXggbWFwcGluZ3MnKTsgfVxuICAgICAgICAgIHZhciBjb21tYW5kTmFtZSA9IGxocy5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgaWYgKHRoaXMuY29tbWFuZE1hcF9bY29tbWFuZE5hbWVdICYmIHRoaXMuY29tbWFuZE1hcF9bY29tbWFuZE5hbWVdLnVzZXIpIHtcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLmNvbW1hbmRNYXBfW2NvbW1hbmROYW1lXTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBLZXkgdG8gRXggb3Iga2V5IHRvIGtleSBtYXBwaW5nXG4gICAgICAgICAgdmFyIGtleXMgPSBsaHM7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkZWZhdWx0S2V5bWFwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoa2V5cyA9PSBkZWZhdWx0S2V5bWFwW2ldLmtleXNcbiAgICAgICAgICAgICAgICAmJiBkZWZhdWx0S2V5bWFwW2ldLmNvbnRleHQgPT09IGN0eCkge1xuICAgICAgICAgICAgICBkZWZhdWx0S2V5bWFwLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIHZhciBleENvbW1hbmRzID0ge1xuICAgICAgY29sb3JzY2hlbWU6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgaWYgKCFwYXJhbXMuYXJncyB8fCBwYXJhbXMuYXJncy5sZW5ndGggPCAxKSB7XG4gICAgICAgICAgc2hvd0NvbmZpcm0oY20sIGNtLmdldE9wdGlvbigndGhlbWUnKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNtLnNldE9wdGlvbigndGhlbWUnLCBwYXJhbXMuYXJnc1swXSk7XG4gICAgICB9LFxuICAgICAgbWFwOiBmdW5jdGlvbihjbSwgcGFyYW1zLCBjdHgsIGRlZmF1bHRPbmx5KSB7XG4gICAgICAgIHZhciBtYXBBcmdzID0gcGFyYW1zLmFyZ3M7XG4gICAgICAgIGlmICghbWFwQXJncyB8fCBtYXBBcmdzLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICBpZiAoY20pIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnSW52YWxpZCBtYXBwaW5nOiAnICsgcGFyYW1zLmlucHV0KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGV4Q29tbWFuZERpc3BhdGNoZXIubWFwKG1hcEFyZ3NbMF0sIG1hcEFyZ3NbMV0sIGN0eCwgZGVmYXVsdE9ubHkpO1xuICAgICAgfSxcbiAgICAgIGltYXA6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHsgdGhpcy5tYXAoY20sIHBhcmFtcywgJ2luc2VydCcpOyB9LFxuICAgICAgbm1hcDogZnVuY3Rpb24oY20sIHBhcmFtcykgeyB0aGlzLm1hcChjbSwgcGFyYW1zLCAnbm9ybWFsJyk7IH0sXG4gICAgICB2bWFwOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7IHRoaXMubWFwKGNtLCBwYXJhbXMsICd2aXN1YWwnKTsgfSxcbiAgICAgIG9tYXA6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHsgdGhpcy5tYXAoY20sIHBhcmFtcywgJ29wZXJhdG9yUGVuZGluZycpOyB9LFxuICAgICAgbm9yZW1hcDogZnVuY3Rpb24oY20sIHBhcmFtcykgeyB0aGlzLm1hcChjbSwgcGFyYW1zLCB1bmRlZmluZWQsIHRydWUpOyB9LFxuICAgICAgaW5vcmVtYXA6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHsgdGhpcy5tYXAoY20sIHBhcmFtcywgJ2luc2VydCcsIHRydWUpOyB9LFxuICAgICAgbm5vcmVtYXA6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHsgdGhpcy5tYXAoY20sIHBhcmFtcywgJ25vcm1hbCcsIHRydWUpOyB9LFxuICAgICAgdm5vcmVtYXA6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHsgdGhpcy5tYXAoY20sIHBhcmFtcywgJ3Zpc3VhbCcsIHRydWUpOyB9LFxuICAgICAgb25vcmVtYXA6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHsgdGhpcy5tYXAoY20sIHBhcmFtcywgJ29wZXJhdG9yUGVuZGluZycsIHRydWUpOyB9LFxuICAgICAgdW5tYXA6IGZ1bmN0aW9uKGNtLCBwYXJhbXMsIGN0eCkge1xuICAgICAgICB2YXIgbWFwQXJncyA9IHBhcmFtcy5hcmdzO1xuICAgICAgICBpZiAoIW1hcEFyZ3MgfHwgbWFwQXJncy5sZW5ndGggPCAxIHx8ICFleENvbW1hbmREaXNwYXRjaGVyLnVubWFwKG1hcEFyZ3NbMF0sIGN0eCkpIHtcbiAgICAgICAgICBpZiAoY20pIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnTm8gc3VjaCBtYXBwaW5nOiAnICsgcGFyYW1zLmlucHV0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtYXBjbGVhcjogZnVuY3Rpb24oY20sIHBhcmFtcykgeyB2aW1BcGkubWFwY2xlYXIoKTsgfSxcbiAgICAgIGltYXBjbGVhcjogZnVuY3Rpb24oY20sIHBhcmFtcykgeyB2aW1BcGkubWFwY2xlYXIoJ2luc2VydCcpOyB9LFxuICAgICAgbm1hcGNsZWFyOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7IHZpbUFwaS5tYXBjbGVhcignbm9ybWFsJyk7IH0sXG4gICAgICB2bWFwY2xlYXI6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHsgdmltQXBpLm1hcGNsZWFyKCd2aXN1YWwnKTsgfSxcbiAgICAgIG9tYXBjbGVhcjogZnVuY3Rpb24oY20sIHBhcmFtcykgeyB2aW1BcGkubWFwY2xlYXIoJ29wZXJhdG9yUGVuZGluZycpOyB9LFxuICAgICAgbW92ZTogZnVuY3Rpb24oY20sIHBhcmFtcykge1xuICAgICAgICBjb21tYW5kRGlzcGF0Y2hlci5wcm9jZXNzQ29tbWFuZChjbSwgY20uc3RhdGUudmltLCB7XG4gICAgICAgICAgICB0eXBlOiAnbW90aW9uJyxcbiAgICAgICAgICAgIG1vdGlvbjogJ21vdmVUb0xpbmVPckVkZ2VPZkRvY3VtZW50JyxcbiAgICAgICAgICAgIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIGV4cGxpY2l0UmVwZWF0OiB0cnVlLFxuICAgICAgICAgICAgICBsaW5ld2lzZTogdHJ1ZSB9LFxuICAgICAgICAgICAgcmVwZWF0T3ZlcnJpZGU6IHBhcmFtcy5saW5lKzF9KTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgdmFyIHNldEFyZ3MgPSBwYXJhbXMuYXJncztcbiAgICAgICAgLy8gT3B0aW9ucyBwYXNzZWQgdGhyb3VnaCB0byB0aGUgc2V0T3B0aW9uL2dldE9wdGlvbiBjYWxscy4gTWF5IGJlIHBhc3NlZCBpbiBieSB0aGVcbiAgICAgICAgLy8gbG9jYWwvZ2xvYmFsIHZlcnNpb25zIG9mIHRoZSBzZXQgY29tbWFuZFxuICAgICAgICB2YXIgc2V0Q2ZnID0gcGFyYW1zLnNldENmZyB8fCB7fTtcbiAgICAgICAgaWYgKCFzZXRBcmdzIHx8IHNldEFyZ3MubGVuZ3RoIDwgMSkge1xuICAgICAgICAgIGlmIChjbSkge1xuICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdJbnZhbGlkIG1hcHBpbmc6ICcgKyBwYXJhbXMuaW5wdXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGV4cHIgPSBzZXRBcmdzWzBdLnNwbGl0KCc9Jyk7XG4gICAgICAgIHZhciBvcHRpb25OYW1lID0gZXhwclswXTtcbiAgICAgICAgdmFyIHZhbHVlID0gZXhwclsxXTtcbiAgICAgICAgdmFyIGZvcmNlR2V0ID0gZmFsc2U7XG4gICAgICAgIHZhciBmb3JjZVRvZ2dsZSA9IGZhbHNlO1xuXG4gICAgICAgIGlmIChvcHRpb25OYW1lLmNoYXJBdChvcHRpb25OYW1lLmxlbmd0aCAtIDEpID09ICc/Jykge1xuICAgICAgICAgIC8vIElmIHBvc3QtZml4ZWQgd2l0aCA/LCB0aGVuIHRoZSBzZXQgaXMgYWN0dWFsbHkgYSBnZXQuXG4gICAgICAgICAgaWYgKHZhbHVlKSB7IHRocm93IEVycm9yKCdUcmFpbGluZyBjaGFyYWN0ZXJzOiAnICsgcGFyYW1zLmFyZ1N0cmluZyk7IH1cbiAgICAgICAgICBvcHRpb25OYW1lID0gb3B0aW9uTmFtZS5zdWJzdHJpbmcoMCwgb3B0aW9uTmFtZS5sZW5ndGggLSAxKTtcbiAgICAgICAgICBmb3JjZUdldCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9uTmFtZS5jaGFyQXQob3B0aW9uTmFtZS5sZW5ndGggLSAxKSA9PSAnIScpIHtcbiAgICAgICAgICBvcHRpb25OYW1lID0gb3B0aW9uTmFtZS5zdWJzdHJpbmcoMCwgb3B0aW9uTmFtZS5sZW5ndGggLSAxKTtcbiAgICAgICAgICBmb3JjZVRvZ2dsZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgb3B0aW9uTmFtZS5zdWJzdHJpbmcoMCwgMikgPT0gJ25vJykge1xuICAgICAgICAgIC8vIFRvIHNldCBib29sZWFuIG9wdGlvbnMgdG8gZmFsc2UsIHRoZSBvcHRpb24gbmFtZSBpcyBwcmVmaXhlZCB3aXRoXG4gICAgICAgICAgLy8gJ25vJy5cbiAgICAgICAgICBvcHRpb25OYW1lID0gb3B0aW9uTmFtZS5zdWJzdHJpbmcoMik7XG4gICAgICAgICAgdmFsdWUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBvcHRpb25Jc0Jvb2xlYW4gPSBvcHRpb25zW29wdGlvbk5hbWVdICYmIG9wdGlvbnNbb3B0aW9uTmFtZV0udHlwZSA9PSAnYm9vbGVhbic7XG4gICAgICAgIGlmIChvcHRpb25Jc0Jvb2xlYW4pIHtcbiAgICAgICAgICBpZiAoZm9yY2VUb2dnbGUpIHtcbiAgICAgICAgICAgIHZhbHVlID0gIWdldE9wdGlvbihvcHRpb25OYW1lLCBjbSwgc2V0Q2ZnKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gQ2FsbGluZyBzZXQgd2l0aCBhIGJvb2xlYW4gb3B0aW9uIHNldHMgaXQgdG8gdHJ1ZS5cbiAgICAgICAgICAgIHZhbHVlID0gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgbm8gdmFsdWUgaXMgcHJvdmlkZWQsIHRoZW4gd2UgYXNzdW1lIHRoaXMgaXMgYSBnZXQuXG4gICAgICAgIGlmICghb3B0aW9uSXNCb29sZWFuICYmIHZhbHVlID09PSB1bmRlZmluZWQgfHwgZm9yY2VHZXQpIHtcbiAgICAgICAgICB2YXIgb2xkVmFsdWUgPSBnZXRPcHRpb24ob3B0aW9uTmFtZSwgY20sIHNldENmZyk7XG4gICAgICAgICAgaWYgKG9sZFZhbHVlIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCBvbGRWYWx1ZS5tZXNzYWdlKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKG9sZFZhbHVlID09PSB0cnVlIHx8IG9sZFZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICcgJyArIChvbGRWYWx1ZSA/ICcnIDogJ25vJykgKyBvcHRpb25OYW1lKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICcgICcgKyBvcHRpb25OYW1lICsgJz0nICsgb2xkVmFsdWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgc2V0T3B0aW9uUmV0dXJuID0gc2V0T3B0aW9uKG9wdGlvbk5hbWUsIHZhbHVlLCBjbSwgc2V0Q2ZnKTtcbiAgICAgICAgICBpZiAoc2V0T3B0aW9uUmV0dXJuIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCBzZXRPcHRpb25SZXR1cm4ubWVzc2FnZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2V0bG9jYWw6IGZ1bmN0aW9uIChjbSwgcGFyYW1zKSB7XG4gICAgICAgIC8vIHNldENmZyBpcyBwYXNzZWQgdGhyb3VnaCB0byBzZXRPcHRpb25cbiAgICAgICAgcGFyYW1zLnNldENmZyA9IHtzY29wZTogJ2xvY2FsJ307XG4gICAgICAgIHRoaXMuc2V0KGNtLCBwYXJhbXMpO1xuICAgICAgfSxcbiAgICAgIHNldGdsb2JhbDogZnVuY3Rpb24gKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgLy8gc2V0Q2ZnIGlzIHBhc3NlZCB0aHJvdWdoIHRvIHNldE9wdGlvblxuICAgICAgICBwYXJhbXMuc2V0Q2ZnID0ge3Njb3BlOiAnZ2xvYmFsJ307XG4gICAgICAgIHRoaXMuc2V0KGNtLCBwYXJhbXMpO1xuICAgICAgfSxcbiAgICAgIHJlZ2lzdGVyczogZnVuY3Rpb24oY20sIHBhcmFtcykge1xuICAgICAgICB2YXIgcmVnQXJncyA9IHBhcmFtcy5hcmdzO1xuICAgICAgICB2YXIgcmVnaXN0ZXJzID0gdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLnJlZ2lzdGVycztcbiAgICAgICAgdmFyIHJlZ0luZm8gPSAnLS0tLS0tLS0tLVJlZ2lzdGVycy0tLS0tLS0tLS1cXG5cXG4nO1xuICAgICAgICBpZiAoIXJlZ0FyZ3MpIHtcbiAgICAgICAgICBmb3IgKHZhciByZWdpc3Rlck5hbWUgaW4gcmVnaXN0ZXJzKSB7XG4gICAgICAgICAgICB2YXIgdGV4dCA9IHJlZ2lzdGVyc1tyZWdpc3Rlck5hbWVdLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBpZiAodGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgcmVnSW5mbyArPSAnXCInICsgcmVnaXN0ZXJOYW1lICsgJyAgICAnICsgdGV4dCArICdcXG4nXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciByZWdpc3Rlck5hbWU7XG4gICAgICAgICAgcmVnQXJncyA9IHJlZ0FyZ3Muam9pbignJyk7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZWdBcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICByZWdpc3Rlck5hbWUgPSByZWdBcmdzLmNoYXJBdChpKTtcbiAgICAgICAgICAgIGlmICghdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmlzVmFsaWRSZWdpc3RlcihyZWdpc3Rlck5hbWUpKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJlZ2lzdGVyID0gcmVnaXN0ZXJzW3JlZ2lzdGVyTmFtZV0gfHwgbmV3IFJlZ2lzdGVyKCk7XG4gICAgICAgICAgICByZWdJbmZvICs9ICdcIicgKyByZWdpc3Rlck5hbWUgKyAnICAgICcgKyByZWdpc3Rlci50b1N0cmluZygpICsgJ1xcbidcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc2hvd0NvbmZpcm0oY20sIHJlZ0luZm8pO1xuICAgICAgfSxcbiAgICAgIHNvcnQ6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgdmFyIHJldmVyc2UsIGlnbm9yZUNhc2UsIHVuaXF1ZSwgbnVtYmVyLCBwYXR0ZXJuO1xuICAgICAgICBmdW5jdGlvbiBwYXJzZUFyZ3MoKSB7XG4gICAgICAgICAgaWYgKHBhcmFtcy5hcmdTdHJpbmcpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gbmV3IENvZGVNaXJyb3IuU3RyaW5nU3RyZWFtKHBhcmFtcy5hcmdTdHJpbmcpO1xuICAgICAgICAgICAgaWYgKGFyZ3MuZWF0KCchJykpIHsgcmV2ZXJzZSA9IHRydWU7IH1cbiAgICAgICAgICAgIGlmIChhcmdzLmVvbCgpKSB7IHJldHVybjsgfVxuICAgICAgICAgICAgaWYgKCFhcmdzLmVhdFNwYWNlKCkpIHsgcmV0dXJuICdJbnZhbGlkIGFyZ3VtZW50cyc7IH1cbiAgICAgICAgICAgIHZhciBvcHRzID0gYXJncy5tYXRjaCgvKFtkaW51b3hdKyk/XFxzKihcXC8uK1xcLyk/XFxzKi8pO1xuICAgICAgICAgICAgaWYgKCFvcHRzICYmICFhcmdzLmVvbCgpKSB7IHJldHVybiAnSW52YWxpZCBhcmd1bWVudHMnOyB9XG4gICAgICAgICAgICBpZiAob3B0c1sxXSkge1xuICAgICAgICAgICAgICBpZ25vcmVDYXNlID0gb3B0c1sxXS5pbmRleE9mKCdpJykgIT0gLTE7XG4gICAgICAgICAgICAgIHVuaXF1ZSA9IG9wdHNbMV0uaW5kZXhPZigndScpICE9IC0xO1xuICAgICAgICAgICAgICB2YXIgZGVjaW1hbCA9IG9wdHNbMV0uaW5kZXhPZignZCcpICE9IC0xIHx8IG9wdHNbMV0uaW5kZXhPZignbicpICE9IC0xICYmIDE7XG4gICAgICAgICAgICAgIHZhciBoZXggPSBvcHRzWzFdLmluZGV4T2YoJ3gnKSAhPSAtMSAmJiAxO1xuICAgICAgICAgICAgICB2YXIgb2N0YWwgPSBvcHRzWzFdLmluZGV4T2YoJ28nKSAhPSAtMSAmJiAxO1xuICAgICAgICAgICAgICBpZiAoZGVjaW1hbCArIGhleCArIG9jdGFsID4gMSkgeyByZXR1cm4gJ0ludmFsaWQgYXJndW1lbnRzJzsgfVxuICAgICAgICAgICAgICBudW1iZXIgPSBkZWNpbWFsICYmICdkZWNpbWFsJyB8fCBoZXggJiYgJ2hleCcgfHwgb2N0YWwgJiYgJ29jdGFsJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRzWzJdKSB7XG4gICAgICAgICAgICAgIHBhdHRlcm4gPSBuZXcgUmVnRXhwKG9wdHNbMl0uc3Vic3RyKDEsIG9wdHNbMl0ubGVuZ3RoIC0gMiksIGlnbm9yZUNhc2UgPyAnaScgOiAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciBlcnIgPSBwYXJzZUFyZ3MoKTtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIHNob3dDb25maXJtKGNtLCBlcnIgKyAnOiAnICsgcGFyYW1zLmFyZ1N0cmluZyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaW5lU3RhcnQgPSBwYXJhbXMubGluZSB8fCBjbS5maXJzdExpbmUoKTtcbiAgICAgICAgdmFyIGxpbmVFbmQgPSBwYXJhbXMubGluZUVuZCB8fCBwYXJhbXMubGluZSB8fCBjbS5sYXN0TGluZSgpO1xuICAgICAgICBpZiAobGluZVN0YXJ0ID09IGxpbmVFbmQpIHsgcmV0dXJuOyB9XG4gICAgICAgIHZhciBjdXJTdGFydCA9IG5ldyBQb3MobGluZVN0YXJ0LCAwKTtcbiAgICAgICAgdmFyIGN1ckVuZCA9IG5ldyBQb3MobGluZUVuZCwgbGluZUxlbmd0aChjbSwgbGluZUVuZCkpO1xuICAgICAgICB2YXIgdGV4dCA9IGNtLmdldFJhbmdlKGN1clN0YXJ0LCBjdXJFbmQpLnNwbGl0KCdcXG4nKTtcbiAgICAgICAgdmFyIG51bWJlclJlZ2V4ID0gcGF0dGVybiA/IHBhdHRlcm4gOlxuICAgICAgICAgICAobnVtYmVyID09ICdkZWNpbWFsJykgPyAvKC0/KShbXFxkXSspLyA6XG4gICAgICAgICAgIChudW1iZXIgPT0gJ2hleCcpID8gLygtPykoPzoweCk/KFswLTlhLWZdKykvaSA6XG4gICAgICAgICAgIChudW1iZXIgPT0gJ29jdGFsJykgPyAvKFswLTddKykvIDogbnVsbDtcbiAgICAgICAgdmFyIHJhZGl4ID0gKG51bWJlciA9PSAnZGVjaW1hbCcpID8gMTAgOiAobnVtYmVyID09ICdoZXgnKSA/IDE2IDogKG51bWJlciA9PSAnb2N0YWwnKSA/IDggOiBudWxsO1xuICAgICAgICB2YXIgbnVtUGFydCA9IFtdLCB0ZXh0UGFydCA9IFtdO1xuICAgICAgICBpZiAobnVtYmVyIHx8IHBhdHRlcm4pIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBtYXRjaFBhcnQgPSBwYXR0ZXJuID8gdGV4dFtpXS5tYXRjaChwYXR0ZXJuKSA6IG51bGw7XG4gICAgICAgICAgICBpZiAobWF0Y2hQYXJ0ICYmIG1hdGNoUGFydFswXSAhPSAnJykge1xuICAgICAgICAgICAgICBudW1QYXJ0LnB1c2gobWF0Y2hQYXJ0KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIXBhdHRlcm4gJiYgbnVtYmVyUmVnZXguZXhlYyh0ZXh0W2ldKSkge1xuICAgICAgICAgICAgICBudW1QYXJ0LnB1c2godGV4dFtpXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0ZXh0UGFydC5wdXNoKHRleHRbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0ZXh0UGFydCA9IHRleHQ7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY29tcGFyZUZuKGEsIGIpIHtcbiAgICAgICAgICBpZiAocmV2ZXJzZSkgeyB2YXIgdG1wOyB0bXAgPSBhOyBhID0gYjsgYiA9IHRtcDsgfVxuICAgICAgICAgIGlmIChpZ25vcmVDYXNlKSB7IGEgPSBhLnRvTG93ZXJDYXNlKCk7IGIgPSBiLnRvTG93ZXJDYXNlKCk7IH1cbiAgICAgICAgICB2YXIgYW51bSA9IG51bWJlciAmJiBudW1iZXJSZWdleC5leGVjKGEpO1xuICAgICAgICAgIHZhciBibnVtID0gbnVtYmVyICYmIG51bWJlclJlZ2V4LmV4ZWMoYik7XG4gICAgICAgICAgaWYgKCFhbnVtKSB7IHJldHVybiBhIDwgYiA/IC0xIDogMTsgfVxuICAgICAgICAgIGFudW0gPSBwYXJzZUludCgoYW51bVsxXSArIGFudW1bMl0pLnRvTG93ZXJDYXNlKCksIHJhZGl4KTtcbiAgICAgICAgICBibnVtID0gcGFyc2VJbnQoKGJudW1bMV0gKyBibnVtWzJdKS50b0xvd2VyQ2FzZSgpLCByYWRpeCk7XG4gICAgICAgICAgcmV0dXJuIGFudW0gLSBibnVtO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNvbXBhcmVQYXR0ZXJuRm4oYSwgYikge1xuICAgICAgICAgIGlmIChyZXZlcnNlKSB7IHZhciB0bXA7IHRtcCA9IGE7IGEgPSBiOyBiID0gdG1wOyB9XG4gICAgICAgICAgaWYgKGlnbm9yZUNhc2UpIHsgYVswXSA9IGFbMF0udG9Mb3dlckNhc2UoKTsgYlswXSA9IGJbMF0udG9Mb3dlckNhc2UoKTsgfVxuICAgICAgICAgIHJldHVybiAoYVswXSA8IGJbMF0pID8gLTEgOiAxO1xuICAgICAgICB9XG4gICAgICAgIG51bVBhcnQuc29ydChwYXR0ZXJuID8gY29tcGFyZVBhdHRlcm5GbiA6IGNvbXBhcmVGbik7XG4gICAgICAgIGlmIChwYXR0ZXJuKSB7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1QYXJ0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBudW1QYXJ0W2ldID0gbnVtUGFydFtpXS5pbnB1dDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoIW51bWJlcikgeyB0ZXh0UGFydC5zb3J0KGNvbXBhcmVGbik7IH1cbiAgICAgICAgdGV4dCA9ICghcmV2ZXJzZSkgPyB0ZXh0UGFydC5jb25jYXQobnVtUGFydCkgOiBudW1QYXJ0LmNvbmNhdCh0ZXh0UGFydCk7XG4gICAgICAgIGlmICh1bmlxdWUpIHsgLy8gUmVtb3ZlIGR1cGxpY2F0ZSBsaW5lc1xuICAgICAgICAgIHZhciB0ZXh0T2xkID0gdGV4dDtcbiAgICAgICAgICB2YXIgbGFzdExpbmU7XG4gICAgICAgICAgdGV4dCA9IFtdO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dE9sZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRleHRPbGRbaV0gIT0gbGFzdExpbmUpIHtcbiAgICAgICAgICAgICAgdGV4dC5wdXNoKHRleHRPbGRbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdExpbmUgPSB0ZXh0T2xkW2ldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjbS5yZXBsYWNlUmFuZ2UodGV4dC5qb2luKCdcXG4nKSwgY3VyU3RhcnQsIGN1ckVuZCk7XG4gICAgICB9LFxuICAgICAgdmdsb2JhbDogZnVuY3Rpb24oY20sIHBhcmFtcykge1xuICAgICAgICAvLyBnbG9iYWwgaW5zcGVjdHMgcGFyYW1zLmNvbW1hbmROYW1lXG4gICAgICAgIHRoaXMuZ2xvYmFsKGNtLCBwYXJhbXMpO1xuICAgICAgfSxcbiAgICAgIG5vcm1hbDogZnVuY3Rpb24oY20sIHBhcmFtcykge1xuICAgICAgICB2YXIgYXJnU3RyaW5nID0gcGFyYW1zLmFyZ1N0cmluZztcbiAgICAgICAgaWYgKGFyZ1N0cmluZyAmJiBhcmdTdHJpbmdbMF0gPT0gJyEnKSB7XG4gICAgICAgICAgICBhcmdTdHJpbmcgPSBhcmdTdHJpbmcuc2xpY2UoMSk7XG4gICAgICAgICAgICBub3JlbWFwID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBhcmdTdHJpbmcgPSBhcmdTdHJpbmcudHJpbVN0YXJ0KCk7XG4gICAgICAgIGlmICghYXJnU3RyaW5nKSB7XG4gICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdBcmd1bWVudCBpcyByZXF1aXJlZC4nKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpbmUgPSBwYXJhbXMubGluZTtcbiAgICAgICAgaWYgKHR5cGVvZiBsaW5lID09ICdudW1iZXInKSB7XG4gICAgICAgICAgdmFyIGxpbmVFbmQgPSBpc05hTihwYXJhbXMubGluZUVuZCkgPyBsaW5lIDogcGFyYW1zLmxpbmVFbmQ7XG4gICAgICAgICAgZm9yICh2YXIgaSA9IGxpbmU7IGkgPD0gbGluZUVuZDsgaSsrKSB7XG4gICAgICAgICAgICBjbS5zZXRDdXJzb3IoaSwgMCk7XG4gICAgICAgICAgICBkb0tleVRvS2V5KGNtLCBwYXJhbXMuYXJnU3RyaW5nLnRyaW1TdGFydCgpKTtcbiAgICAgICAgICAgIGlmIChjbS5zdGF0ZS52aW0uaW5zZXJ0TW9kZSkge1xuICAgICAgICAgICAgICBleGl0SW5zZXJ0TW9kZShjbSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRvS2V5VG9LZXkoY20sIHBhcmFtcy5hcmdTdHJpbmcudHJpbVN0YXJ0KCkpO1xuICAgICAgICAgIGlmIChjbS5zdGF0ZS52aW0uaW5zZXJ0TW9kZSkge1xuICAgICAgICAgICAgZXhpdEluc2VydE1vZGUoY20sIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGdsb2JhbDogZnVuY3Rpb24oY20sIHBhcmFtcykge1xuICAgICAgICAvLyBhIGdsb2JhbCBjb21tYW5kIGlzIG9mIHRoZSBmb3JtXG4gICAgICAgIC8vIDpbcmFuZ2VdZy9wYXR0ZXJuL1tjbWRdXG4gICAgICAgIC8vIGFyZ1N0cmluZyBob2xkcyB0aGUgc3RyaW5nIC9wYXR0ZXJuL1tjbWRdXG4gICAgICAgIHZhciBhcmdTdHJpbmcgPSBwYXJhbXMuYXJnU3RyaW5nO1xuICAgICAgICBpZiAoIWFyZ1N0cmluZykge1xuICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnUmVndWxhciBFeHByZXNzaW9uIG1pc3NpbmcgZnJvbSBnbG9iYWwnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGludmVydGVkID0gcGFyYW1zLmNvbW1hbmROYW1lWzBdID09PSAndic7XG4gICAgICAgIGlmIChhcmdTdHJpbmdbMF0gPT09ICchJyAmJiBwYXJhbXMuY29tbWFuZE5hbWVbMF0gPT09ICdnJykge1xuICAgICAgICAgIGludmVydGVkID0gdHJ1ZTtcbiAgICAgICAgICBhcmdTdHJpbmcgPSBhcmdTdHJpbmcuc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gcmFuZ2UgaXMgc3BlY2lmaWVkIGhlcmVcbiAgICAgICAgdmFyIGxpbmVTdGFydCA9IChwYXJhbXMubGluZSAhPT0gdW5kZWZpbmVkKSA/IHBhcmFtcy5saW5lIDogY20uZmlyc3RMaW5lKCk7XG4gICAgICAgIHZhciBsaW5lRW5kID0gcGFyYW1zLmxpbmVFbmQgfHwgcGFyYW1zLmxpbmUgfHwgY20ubGFzdExpbmUoKTtcbiAgICAgICAgLy8gZ2V0IHRoZSB0b2tlbnMgZnJvbSBhcmdTdHJpbmdcbiAgICAgICAgdmFyIHRva2VucyA9IHNwbGl0QnlTbGFzaChhcmdTdHJpbmcpO1xuICAgICAgICB2YXIgcmVnZXhQYXJ0ID0gYXJnU3RyaW5nLCBjbWQ7XG4gICAgICAgIGlmICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmVnZXhQYXJ0ID0gdG9rZW5zWzBdO1xuICAgICAgICAgIGNtZCA9IHRva2Vucy5zbGljZSgxLCB0b2tlbnMubGVuZ3RoKS5qb2luKCcvJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZ2V4UGFydCkge1xuICAgICAgICAgIC8vIElmIHJlZ2V4IHBhcnQgaXMgZW1wdHksIHRoZW4gdXNlIHRoZSBwcmV2aW91cyBxdWVyeS4gT3RoZXJ3aXNlXG4gICAgICAgICAgLy8gdXNlIHRoZSByZWdleCBwYXJ0IGFzIHRoZSBuZXcgcXVlcnkuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgdXBkYXRlU2VhcmNoUXVlcnkoY20sIHJlZ2V4UGFydCwgdHJ1ZSAvKiogaWdub3JlQ2FzZSAqLyxcbiAgICAgICAgICAgICB0cnVlIC8qKiBzbWFydENhc2UgKi8pO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdJbnZhbGlkIHJlZ2V4OiAnICsgcmVnZXhQYXJ0KTtcbiAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBub3cgdGhhdCB3ZSBoYXZlIHRoZSByZWdleFBhcnQsIHNlYXJjaCBmb3IgcmVnZXggbWF0Y2hlcyBpbiB0aGVcbiAgICAgICAgLy8gc3BlY2lmaWVkIHJhbmdlIG9mIGxpbmVzXG4gICAgICAgIHZhciBxdWVyeSA9IGdldFNlYXJjaFN0YXRlKGNtKS5nZXRRdWVyeSgpO1xuICAgICAgICB2YXIgbWF0Y2hlZExpbmVzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSBsaW5lU3RhcnQ7IGkgPD0gbGluZUVuZDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGxpbmUgPSBjbS5nZXRMaW5lKGkpO1xuICAgICAgICAgIHZhciBtYXRjaGVkID0gcXVlcnkudGVzdChsaW5lKTtcbiAgICAgICAgICBpZiAobWF0Y2hlZCAhPT0gaW52ZXJ0ZWQpIHtcbiAgICAgICAgICAgIG1hdGNoZWRMaW5lcy5wdXNoKGNtZCA/IGNtLmdldExpbmVIYW5kbGUoaSkgOiBsaW5lKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgdGhlcmUgaXMgbm8gW2NtZF0sIGp1c3QgZGlzcGxheSB0aGUgbGlzdCBvZiBtYXRjaGVkIGxpbmVzXG4gICAgICAgIGlmICghY21kKSB7XG4gICAgICAgICAgc2hvd0NvbmZpcm0oY20sIG1hdGNoZWRMaW5lcy5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgIHZhciBuZXh0Q29tbWFuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChpbmRleCA8IG1hdGNoZWRMaW5lcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBsaW5lSGFuZGxlID0gbWF0Y2hlZExpbmVzW2luZGV4KytdO1xuICAgICAgICAgICAgdmFyIGxpbmVOdW0gPSBjbS5nZXRMaW5lTnVtYmVyKGxpbmVIYW5kbGUpO1xuICAgICAgICAgICAgaWYgKGxpbmVOdW0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICBuZXh0Q29tbWFuZCgpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY29tbWFuZCA9IChsaW5lTnVtICsgMSkgKyBjbWQ7XG4gICAgICAgICAgICBleENvbW1hbmREaXNwYXRjaGVyLnByb2Nlc3NDb21tYW5kKGNtLCBjb21tYW5kLCB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrOiBuZXh0Q29tbWFuZFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChjbS5yZWxlYXNlTGluZUhhbmRsZXMpIHtcbiAgICAgICAgICAgIGNtLnJlbGVhc2VMaW5lSGFuZGxlcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbmV4dENvbW1hbmQoKTtcbiAgICAgIH0sXG4gICAgICBzdWJzdGl0dXRlOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7XG4gICAgICAgIGlmICghY20uZ2V0U2VhcmNoQ3Vyc29yKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZWFyY2ggZmVhdHVyZSBub3QgYXZhaWxhYmxlLiBSZXF1aXJlcyBzZWFyY2hjdXJzb3IuanMgb3IgJyArXG4gICAgICAgICAgICAgICdhbnkgb3RoZXIgZ2V0U2VhcmNoQ3Vyc29yIGltcGxlbWVudGF0aW9uLicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhcmdTdHJpbmcgPSBwYXJhbXMuYXJnU3RyaW5nO1xuICAgICAgICB2YXIgdG9rZW5zID0gYXJnU3RyaW5nID8gc3BsaXRCeVNlcGFyYXRvcihhcmdTdHJpbmcsIGFyZ1N0cmluZ1swXSkgOiBbXTtcbiAgICAgICAgdmFyIHJlZ2V4UGFydCwgcmVwbGFjZVBhcnQgPSAnJywgdHJhaWxpbmcsIGZsYWdzUGFydCwgY291bnQ7XG4gICAgICAgIHZhciBjb25maXJtID0gZmFsc2U7IC8vIFdoZXRoZXIgdG8gY29uZmlybSBlYWNoIHJlcGxhY2UuXG4gICAgICAgIHZhciBnbG9iYWwgPSBmYWxzZTsgLy8gVHJ1ZSB0byByZXBsYWNlIGFsbCBpbnN0YW5jZXMgb24gYSBsaW5lLCBmYWxzZSB0byByZXBsYWNlIG9ubHkgMS5cbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICByZWdleFBhcnQgPSB0b2tlbnNbMF07XG4gICAgICAgICAgaWYgKGdldE9wdGlvbigncGNyZScpICYmIHJlZ2V4UGFydCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgcmVnZXhQYXJ0ID0gbmV3IFJlZ0V4cChyZWdleFBhcnQpLnNvdXJjZTsgLy9ub3JtYWxpemUgbm90IGVzY2FwZWQgY2hhcmFjdGVyc1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXBsYWNlUGFydCA9IHRva2Vuc1sxXTtcbiAgICAgICAgICBpZiAocmVwbGFjZVBhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGdldE9wdGlvbigncGNyZScpKSB7XG4gICAgICAgICAgICAgIHJlcGxhY2VQYXJ0ID0gdW5lc2NhcGVSZWdleFJlcGxhY2UocmVwbGFjZVBhcnQucmVwbGFjZSgvKFteXFxcXF0pJi9nLFwiJDEkJCZcIikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVwbGFjZVBhcnQgPSB0cmFuc2xhdGVSZWdleFJlcGxhY2UocmVwbGFjZVBhcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUubGFzdFN1YnN0aXR1dGVSZXBsYWNlUGFydCA9IHJlcGxhY2VQYXJ0O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0cmFpbGluZyA9IHRva2Vuc1syXSA/IHRva2Vuc1syXS5zcGxpdCgnICcpIDogW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZWl0aGVyIHRoZSBhcmdTdHJpbmcgaXMgZW1wdHkgb3IgaXRzIG9mIHRoZSBmb3JtICcgaGVsbG8vd29ybGQnXG4gICAgICAgICAgLy8gYWN0dWFsbHkgc3BsaXRCeVNsYXNoIHJldHVybnMgYSBsaXN0IG9mIHRva2Vuc1xuICAgICAgICAgIC8vIG9ubHkgaWYgdGhlIHN0cmluZyBzdGFydHMgd2l0aCBhICcvJ1xuICAgICAgICAgIGlmIChhcmdTdHJpbmcgJiYgYXJnU3RyaW5nLmxlbmd0aCkge1xuICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdTdWJzdGl0dXRpb25zIHNob3VsZCBiZSBvZiB0aGUgZm9ybSAnICtcbiAgICAgICAgICAgICAgICAnOnMvcGF0dGVybi9yZXBsYWNlLycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBBZnRlciB0aGUgM3JkIHNsYXNoLCB3ZSBjYW4gaGF2ZSBmbGFncyBmb2xsb3dlZCBieSBhIHNwYWNlIGZvbGxvd2VkXG4gICAgICAgIC8vIGJ5IGNvdW50LlxuICAgICAgICBpZiAodHJhaWxpbmcpIHtcbiAgICAgICAgICBmbGFnc1BhcnQgPSB0cmFpbGluZ1swXTtcbiAgICAgICAgICBjb3VudCA9IHBhcnNlSW50KHRyYWlsaW5nWzFdKTtcbiAgICAgICAgICBpZiAoZmxhZ3NQYXJ0KSB7XG4gICAgICAgICAgICBpZiAoZmxhZ3NQYXJ0LmluZGV4T2YoJ2MnKSAhPSAtMSkge1xuICAgICAgICAgICAgICBjb25maXJtID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmbGFnc1BhcnQuaW5kZXhPZignZycpICE9IC0xKSB7XG4gICAgICAgICAgICAgIGdsb2JhbCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ2V0T3B0aW9uKCdwY3JlJykpIHtcbiAgICAgICAgICAgICAgIHJlZ2V4UGFydCA9IHJlZ2V4UGFydCArICcvJyArIGZsYWdzUGFydDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICByZWdleFBhcnQgPSByZWdleFBhcnQucmVwbGFjZSgvXFwvL2csIFwiXFxcXC9cIikgKyAnLycgKyBmbGFnc1BhcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZWdleFBhcnQpIHtcbiAgICAgICAgICAvLyBJZiByZWdleCBwYXJ0IGlzIGVtcHR5LCB0aGVuIHVzZSB0aGUgcHJldmlvdXMgcXVlcnkuIE90aGVyd2lzZSB1c2VcbiAgICAgICAgICAvLyB0aGUgcmVnZXggcGFydCBhcyB0aGUgbmV3IHF1ZXJ5LlxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB1cGRhdGVTZWFyY2hRdWVyeShjbSwgcmVnZXhQYXJ0LCB0cnVlIC8qKiBpZ25vcmVDYXNlICovLFxuICAgICAgICAgICAgICB0cnVlIC8qKiBzbWFydENhc2UgKi8pO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnSW52YWxpZCByZWdleDogJyArIHJlZ2V4UGFydCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlcGxhY2VQYXJ0ID0gcmVwbGFjZVBhcnQgfHwgdmltR2xvYmFsU3RhdGUubGFzdFN1YnN0aXR1dGVSZXBsYWNlUGFydDtcbiAgICAgICAgaWYgKHJlcGxhY2VQYXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ05vIHByZXZpb3VzIHN1YnN0aXR1dGUgcmVndWxhciBleHByZXNzaW9uJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdGF0ZSA9IGdldFNlYXJjaFN0YXRlKGNtKTtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gc3RhdGUuZ2V0UXVlcnkoKTtcbiAgICAgICAgdmFyIGxpbmVTdGFydCA9IChwYXJhbXMubGluZSAhPT0gdW5kZWZpbmVkKSA/IHBhcmFtcy5saW5lIDogY20uZ2V0Q3Vyc29yKCkubGluZTtcbiAgICAgICAgdmFyIGxpbmVFbmQgPSBwYXJhbXMubGluZUVuZCB8fCBsaW5lU3RhcnQ7XG4gICAgICAgIGlmIChsaW5lU3RhcnQgPT0gY20uZmlyc3RMaW5lKCkgJiYgbGluZUVuZCA9PSBjbS5sYXN0TGluZSgpKSB7XG4gICAgICAgICAgbGluZUVuZCA9IEluZmluaXR5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgIGxpbmVTdGFydCA9IGxpbmVFbmQ7XG4gICAgICAgICAgbGluZUVuZCA9IGxpbmVTdGFydCArIGNvdW50IC0gMTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RhcnRQb3MgPSBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBuZXcgUG9zKGxpbmVTdGFydCwgMCkpO1xuICAgICAgICB2YXIgY3Vyc29yID0gY20uZ2V0U2VhcmNoQ3Vyc29yKHF1ZXJ5LCBzdGFydFBvcyk7XG4gICAgICAgIGRvUmVwbGFjZShjbSwgY29uZmlybSwgZ2xvYmFsLCBsaW5lU3RhcnQsIGxpbmVFbmQsIGN1cnNvciwgcXVlcnksIHJlcGxhY2VQYXJ0LCBwYXJhbXMuY2FsbGJhY2spO1xuICAgICAgfSxcbiAgICAgIHN0YXJ0aW5zZXJ0OiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7XG4gICAgICAgIGRvS2V5VG9LZXkoY20sIHBhcmFtcy5hcmdTdHJpbmcgPT0gJyEnID8gJ0EnIDogJ2knLCB7fSk7XG4gICAgICB9LFxuICAgICAgcmVkbzogQ29kZU1pcnJvci5jb21tYW5kcy5yZWRvLFxuICAgICAgdW5kbzogQ29kZU1pcnJvci5jb21tYW5kcy51bmRvLFxuICAgICAgd3JpdGU6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgIGlmIChDb2RlTWlycm9yLmNvbW1hbmRzLnNhdmUpIHtcbiAgICAgICAgICAvLyBJZiBhIHNhdmUgY29tbWFuZCBpcyBkZWZpbmVkLCBjYWxsIGl0LlxuICAgICAgICAgIENvZGVNaXJyb3IuY29tbWFuZHMuc2F2ZShjbSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY20uc2F2ZSkge1xuICAgICAgICAgIC8vIFNhdmVzIHRvIHRleHQgYXJlYSBpZiBubyBzYXZlIGNvbW1hbmQgaXMgZGVmaW5lZCBhbmQgY20uc2F2ZSgpIGlzIGF2YWlsYWJsZS5cbiAgICAgICAgICBjbS5zYXZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBub2hsc2VhcmNoOiBmdW5jdGlvbihjbSkge1xuICAgICAgICBjbGVhclNlYXJjaEhpZ2hsaWdodChjbSk7XG4gICAgICB9LFxuICAgICAgeWFuazogZnVuY3Rpb24gKGNtKSB7XG4gICAgICAgIHZhciBjdXIgPSBjb3B5Q3Vyc29yKGNtLmdldEN1cnNvcigpKTtcbiAgICAgICAgdmFyIGxpbmUgPSBjdXIubGluZTtcbiAgICAgICAgdmFyIGxpbmVUZXh0ID0gY20uZ2V0TGluZShsaW5lKTtcbiAgICAgICAgdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLnB1c2hUZXh0KFxuICAgICAgICAgICcwJywgJ3lhbmsnLCBsaW5lVGV4dCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICB9LFxuICAgICAgZGVsZXRlOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7XG4gICAgICAgIHZhciBsaW5lID0gcGFyYW1zLnNlbGVjdGlvbkxpbmU7XG4gICAgICAgIHZhciBsaW5lRW5kID0gaXNOYU4ocGFyYW1zLnNlbGVjdGlvbkxpbmVFbmQpID8gbGluZSA6IHBhcmFtcy5zZWxlY3Rpb25MaW5lRW5kO1xuICAgICAgICBvcGVyYXRvcnMuZGVsZXRlKGNtLCB7bGluZXdpc2U6IHRydWV9LCBbXG4gICAgICAgICAgeyBhbmNob3I6IG5ldyBQb3MobGluZSwgMCksXG4gICAgICAgICAgICBoZWFkOiBuZXcgUG9zKGxpbmVFbmQgKyAxLCAwKSB9XG4gICAgICAgIF0pO1xuICAgICAgfSxcbiAgICAgIGpvaW46IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBwYXJhbXMuc2VsZWN0aW9uTGluZTtcbiAgICAgICAgdmFyIGxpbmVFbmQgPSBpc05hTihwYXJhbXMuc2VsZWN0aW9uTGluZUVuZCkgPyBsaW5lIDogcGFyYW1zLnNlbGVjdGlvbkxpbmVFbmQ7XG4gICAgICAgIGNtLnNldEN1cnNvcihuZXcgUG9zKGxpbmUsIDApKTtcbiAgICAgICAgYWN0aW9ucy5qb2luTGluZXMoY20sIHtyZXBlYXQ6IGxpbmVFbmQgLSBsaW5lfSwgY20uc3RhdGUudmltKTtcbiAgICAgIH0sXG4gICAgICBkZWxtYXJrczogZnVuY3Rpb24oY20sIHBhcmFtcykge1xuICAgICAgICBpZiAoIXBhcmFtcy5hcmdTdHJpbmcgfHwgIXRyaW0ocGFyYW1zLmFyZ1N0cmluZykpIHtcbiAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ0FyZ3VtZW50IHJlcXVpcmVkJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0YXRlID0gY20uc3RhdGUudmltO1xuICAgICAgICB2YXIgc3RyZWFtID0gbmV3IENvZGVNaXJyb3IuU3RyaW5nU3RyZWFtKHRyaW0ocGFyYW1zLmFyZ1N0cmluZykpO1xuICAgICAgICB3aGlsZSAoIXN0cmVhbS5lb2woKSkge1xuICAgICAgICAgIHN0cmVhbS5lYXRTcGFjZSgpO1xuXG4gICAgICAgICAgLy8gUmVjb3JkIHRoZSBzdHJlYW1zIHBvc2l0aW9uIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGxvb3AgZm9yIHVzZVxuICAgICAgICAgIC8vIGluIGVycm9yIG1lc3NhZ2VzLlxuICAgICAgICAgIHZhciBjb3VudCA9IHN0cmVhbS5wb3M7XG5cbiAgICAgICAgICBpZiAoIXN0cmVhbS5tYXRjaCgvW2EtekEtWl0vLCBmYWxzZSkpIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnSW52YWxpZCBhcmd1bWVudDogJyArIHBhcmFtcy5hcmdTdHJpbmcuc3Vic3RyaW5nKGNvdW50KSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHN5bSA9IHN0cmVhbS5uZXh0KCk7XG4gICAgICAgICAgLy8gQ2hlY2sgaWYgdGhpcyBzeW1ib2wgaXMgcGFydCBvZiBhIHJhbmdlXG4gICAgICAgICAgaWYgKHN0cmVhbS5tYXRjaCgnLScsIHRydWUpKSB7XG4gICAgICAgICAgICAvLyBUaGlzIHN5bWJvbCBpcyBwYXJ0IG9mIGEgcmFuZ2UuXG5cbiAgICAgICAgICAgIC8vIFRoZSByYW5nZSBtdXN0IHRlcm1pbmF0ZSBhdCBhbiBhbHBoYWJldGljIGNoYXJhY3Rlci5cbiAgICAgICAgICAgIGlmICghc3RyZWFtLm1hdGNoKC9bYS16QS1aXS8sIGZhbHNlKSkge1xuICAgICAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ0ludmFsaWQgYXJndW1lbnQ6ICcgKyBwYXJhbXMuYXJnU3RyaW5nLnN1YnN0cmluZyhjb3VudCkpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBzdGFydE1hcmsgPSBzeW07XG4gICAgICAgICAgICB2YXIgZmluaXNoTWFyayA9IHN0cmVhbS5uZXh0KCk7XG4gICAgICAgICAgICAvLyBUaGUgcmFuZ2UgbXVzdCB0ZXJtaW5hdGUgYXQgYW4gYWxwaGFiZXRpYyBjaGFyYWN0ZXIgd2hpY2hcbiAgICAgICAgICAgIC8vIHNoYXJlcyB0aGUgc2FtZSBjYXNlIGFzIHRoZSBzdGFydCBvZiB0aGUgcmFuZ2UuXG4gICAgICAgICAgICBpZiAoaXNMb3dlckNhc2Uoc3RhcnRNYXJrKSAmJiBpc0xvd2VyQ2FzZShmaW5pc2hNYXJrKSB8fFxuICAgICAgICAgICAgICAgIGlzVXBwZXJDYXNlKHN0YXJ0TWFyaykgJiYgaXNVcHBlckNhc2UoZmluaXNoTWFyaykpIHtcbiAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gc3RhcnRNYXJrLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgICAgICAgIHZhciBmaW5pc2ggPSBmaW5pc2hNYXJrLmNoYXJDb2RlQXQoMCk7XG4gICAgICAgICAgICAgIGlmIChzdGFydCA+PSBmaW5pc2gpIHtcbiAgICAgICAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ0ludmFsaWQgYXJndW1lbnQ6ICcgKyBwYXJhbXMuYXJnU3RyaW5nLnN1YnN0cmluZyhjb3VudCkpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIEJlY2F1c2UgbWFya3MgYXJlIGFsd2F5cyBBU0NJSSB2YWx1ZXMsIGFuZCB3ZSBoYXZlXG4gICAgICAgICAgICAgIC8vIGRldGVybWluZWQgdGhhdCB0aGV5IGFyZSB0aGUgc2FtZSBjYXNlLCB3ZSBjYW4gdXNlXG4gICAgICAgICAgICAgIC8vIHRoZWlyIGNoYXIgY29kZXMgdG8gaXRlcmF0ZSB0aHJvdWdoIHRoZSBkZWZpbmVkIHJhbmdlLlxuICAgICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8PSBmaW5pc2ggLSBzdGFydDsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hcmsgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHN0YXJ0ICsgaik7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHN0YXRlLm1hcmtzW21hcmtdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ0ludmFsaWQgYXJndW1lbnQ6ICcgKyBzdGFydE1hcmsgKyAnLScpO1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRoaXMgc3ltYm9sIGlzIGEgdmFsaWQgbWFyaywgYW5kIGlzIG5vdCBwYXJ0IG9mIGEgcmFuZ2UuXG4gICAgICAgICAgICBkZWxldGUgc3RhdGUubWFya3Nbc3ltXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGV4Q29tbWFuZERpc3BhdGNoZXIgPSBuZXcgRXhDb21tYW5kRGlzcGF0Y2hlcigpO1xuXG4gICAgLyoqXG4gICAgKiBAcGFyYW0ge0NvZGVNaXJyb3J9IGNtIENvZGVNaXJyb3IgaW5zdGFuY2Ugd2UgYXJlIGluLlxuICAgICogQHBhcmFtIHtib29sZWFufSBjb25maXJtIFdoZXRoZXIgdG8gY29uZmlybSBlYWNoIHJlcGxhY2UuXG4gICAgKiBAcGFyYW0ge0N1cnNvcn0gbGluZVN0YXJ0IExpbmUgdG8gc3RhcnQgcmVwbGFjaW5nIGZyb20uXG4gICAgKiBAcGFyYW0ge0N1cnNvcn0gbGluZUVuZCBMaW5lIHRvIHN0b3AgcmVwbGFjaW5nIGF0LlxuICAgICogQHBhcmFtIHtSZWdFeHB9IHF1ZXJ5IFF1ZXJ5IGZvciBwZXJmb3JtaW5nIG1hdGNoZXMgd2l0aC5cbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZXBsYWNlV2l0aCBUZXh0IHRvIHJlcGxhY2UgbWF0Y2hlcyB3aXRoLiBNYXkgY29udGFpbiAkMSxcbiAgICAqICAgICAkMiwgZXRjIGZvciByZXBsYWNpbmcgY2FwdHVyZWQgZ3JvdXBzIHVzaW5nIEphdmFTY3JpcHQgcmVwbGFjZS5cbiAgICAqIEBwYXJhbSB7ZnVuY3Rpb24oKX0gY2FsbGJhY2sgQSBjYWxsYmFjayBmb3Igd2hlbiB0aGUgcmVwbGFjZSBpcyBkb25lLlxuICAgICovXG4gICAgZnVuY3Rpb24gZG9SZXBsYWNlKGNtLCBjb25maXJtLCBnbG9iYWwsIGxpbmVTdGFydCwgbGluZUVuZCwgc2VhcmNoQ3Vyc29yLCBxdWVyeSxcbiAgICAgICAgcmVwbGFjZVdpdGgsIGNhbGxiYWNrKSB7XG4gICAgICAvLyBTZXQgdXAgYWxsIHRoZSBmdW5jdGlvbnMuXG4gICAgICBjbS5zdGF0ZS52aW0uZXhNb2RlID0gdHJ1ZTtcbiAgICAgIHZhciBkb25lID0gZmFsc2U7XG4gICAgICB2YXIgbGFzdFBvcywgbW9kaWZpZWRMaW5lTnVtYmVyLCBqb2luZWQ7XG4gICAgICBmdW5jdGlvbiByZXBsYWNlQWxsKCkge1xuICAgICAgICBjbS5vcGVyYXRpb24oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgd2hpbGUgKCFkb25lKSB7XG4gICAgICAgICAgICByZXBsYWNlKCk7XG4gICAgICAgICAgICBuZXh0KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0b3AoKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiByZXBsYWNlKCkge1xuICAgICAgICB2YXIgdGV4dCA9IGNtLmdldFJhbmdlKHNlYXJjaEN1cnNvci5mcm9tKCksIHNlYXJjaEN1cnNvci50bygpKTtcbiAgICAgICAgdmFyIG5ld1RleHQgPSB0ZXh0LnJlcGxhY2UocXVlcnksIHJlcGxhY2VXaXRoKTtcbiAgICAgICAgdmFyIHVubW9kaWZpZWRMaW5lTnVtYmVyID0gc2VhcmNoQ3Vyc29yLnRvKCkubGluZTtcbiAgICAgICAgc2VhcmNoQ3Vyc29yLnJlcGxhY2UobmV3VGV4dCk7XG4gICAgICAgIG1vZGlmaWVkTGluZU51bWJlciA9IHNlYXJjaEN1cnNvci50bygpLmxpbmU7XG4gICAgICAgIGxpbmVFbmQgKz0gbW9kaWZpZWRMaW5lTnVtYmVyIC0gdW5tb2RpZmllZExpbmVOdW1iZXI7XG4gICAgICAgIGpvaW5lZCA9IG1vZGlmaWVkTGluZU51bWJlciA8IHVubW9kaWZpZWRMaW5lTnVtYmVyO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gZmluZE5leHRWYWxpZE1hdGNoKCkge1xuICAgICAgICB2YXIgbGFzdE1hdGNoVG8gPSBsYXN0UG9zICYmIGNvcHlDdXJzb3Ioc2VhcmNoQ3Vyc29yLnRvKCkpO1xuICAgICAgICB2YXIgbWF0Y2ggPSBzZWFyY2hDdXJzb3IuZmluZE5leHQoKTtcbiAgICAgICAgaWYgKG1hdGNoICYmICFtYXRjaFswXSAmJiBsYXN0TWF0Y2hUbyAmJiBjdXJzb3JFcXVhbChzZWFyY2hDdXJzb3IuZnJvbSgpLCBsYXN0TWF0Y2hUbykpIHtcbiAgICAgICAgICBtYXRjaCA9IHNlYXJjaEN1cnNvci5maW5kTmV4dCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXRjaDtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIG5leHQoKSB7XG4gICAgICAgIC8vIFRoZSBiZWxvdyBvbmx5IGxvb3BzIHRvIHNraXAgb3ZlciBtdWx0aXBsZSBvY2N1cnJlbmNlcyBvbiB0aGUgc2FtZVxuICAgICAgICAvLyBsaW5lIHdoZW4gJ2dsb2JhbCcgaXMgbm90IHRydWUuXG4gICAgICAgIHdoaWxlKGZpbmROZXh0VmFsaWRNYXRjaCgpICYmXG4gICAgICAgICAgICAgIGlzSW5SYW5nZShzZWFyY2hDdXJzb3IuZnJvbSgpLCBsaW5lU3RhcnQsIGxpbmVFbmQpKSB7XG4gICAgICAgICAgaWYgKCFnbG9iYWwgJiYgc2VhcmNoQ3Vyc29yLmZyb20oKS5saW5lID09IG1vZGlmaWVkTGluZU51bWJlciAmJiAham9pbmVkKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY20uc2Nyb2xsSW50b1ZpZXcoc2VhcmNoQ3Vyc29yLmZyb20oKSwgMzApO1xuICAgICAgICAgIGNtLnNldFNlbGVjdGlvbihzZWFyY2hDdXJzb3IuZnJvbSgpLCBzZWFyY2hDdXJzb3IudG8oKSk7XG4gICAgICAgICAgbGFzdFBvcyA9IHNlYXJjaEN1cnNvci5mcm9tKCk7XG4gICAgICAgICAgZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBkb25lID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHN0b3AoY2xvc2UpIHtcbiAgICAgICAgaWYgKGNsb3NlKSB7IGNsb3NlKCk7IH1cbiAgICAgICAgY20uZm9jdXMoKTtcbiAgICAgICAgaWYgKGxhc3RQb3MpIHtcbiAgICAgICAgICBjbS5zZXRDdXJzb3IobGFzdFBvcyk7XG4gICAgICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgICAgICB2aW0uZXhNb2RlID0gZmFsc2U7XG4gICAgICAgICAgdmltLmxhc3RIUG9zID0gdmltLmxhc3RIU1BvcyA9IGxhc3RQb3MuY2g7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNhbGxiYWNrKSB7IGNhbGxiYWNrKCk7IH1cbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIG9uUHJvbXB0S2V5RG93bihlLCBfdmFsdWUsIGNsb3NlKSB7XG4gICAgICAgIC8vIFN3YWxsb3cgYWxsIGtleXMuXG4gICAgICAgIENvZGVNaXJyb3IuZV9zdG9wKGUpO1xuICAgICAgICB2YXIga2V5TmFtZSA9IHZpbUtleUZyb21FdmVudChlKTtcbiAgICAgICAgc3dpdGNoIChrZXlOYW1lKSB7XG4gICAgICAgICAgY2FzZSAneSc6XG4gICAgICAgICAgICByZXBsYWNlKCk7IG5leHQoKTsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbic6XG4gICAgICAgICAgICBuZXh0KCk7IGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ2EnOlxuICAgICAgICAgICAgLy8gcmVwbGFjZUFsbCBjb250YWlucyBhIGNhbGwgdG8gY2xvc2Ugb2YgaXRzIG93bi4gV2UgZG9uJ3Qgd2FudCBpdFxuICAgICAgICAgICAgLy8gdG8gZmlyZSB0b28gZWFybHkgb3IgbXVsdGlwbGUgdGltZXMuXG4gICAgICAgICAgICB2YXIgc2F2ZWRDYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgICAgICAgICAgY2FsbGJhY2sgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjbS5vcGVyYXRpb24ocmVwbGFjZUFsbCk7XG4gICAgICAgICAgICBjYWxsYmFjayA9IHNhdmVkQ2FsbGJhY2s7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdsJzpcbiAgICAgICAgICAgIHJlcGxhY2UoKTtcbiAgICAgICAgICAgIC8vIGZhbGwgdGhyb3VnaCBhbmQgZXhpdC5cbiAgICAgICAgICBjYXNlICdxJzpcbiAgICAgICAgICBjYXNlICc8RXNjPic6XG4gICAgICAgICAgY2FzZSAnPEMtYz4nOlxuICAgICAgICAgIGNhc2UgJzxDLVs+JzpcbiAgICAgICAgICAgIHN0b3AoY2xvc2UpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGRvbmUpIHsgc3RvcChjbG9zZSk7IH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIEFjdHVhbGx5IGRvIHJlcGxhY2UuXG4gICAgICBuZXh0KCk7XG4gICAgICBpZiAoZG9uZSkge1xuICAgICAgICBzaG93Q29uZmlybShjbSwgJ05vIG1hdGNoZXMgZm9yICcgKyBxdWVyeS5zb3VyY2UpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIWNvbmZpcm0pIHtcbiAgICAgICAgcmVwbGFjZUFsbCgpO1xuICAgICAgICBpZiAoY2FsbGJhY2spIHsgY2FsbGJhY2soKTsgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzaG93UHJvbXB0KGNtLCB7XG4gICAgICAgIHByZWZpeDogZG9tKCdzcGFuJywgJ3JlcGxhY2Ugd2l0aCAnLCBkb20oJ3N0cm9uZycsIHJlcGxhY2VXaXRoKSwgJyAoeS9uL2EvcS9sKScpLFxuICAgICAgICBvbktleURvd246IG9uUHJvbXB0S2V5RG93blxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXhpdEluc2VydE1vZGUoY20sIGtlZXBDdXJzb3IpIHtcbiAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgIHZhciBpbnNlcnRNb2RlQ2hhbmdlUmVnaXN0ZXIgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIuZ2V0UmVnaXN0ZXIoJy4nKTtcbiAgICAgIHZhciBpc1BsYXlpbmcgPSBtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmc7XG4gICAgICB2YXIgbGFzdENoYW5nZSA9IG1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcztcbiAgICAgIGlmICghaXNQbGF5aW5nKSB7XG4gICAgICAgIGNtLm9mZignY2hhbmdlJywgb25DaGFuZ2UpO1xuICAgICAgICBpZiAodmltLmluc2VydEVuZCkgdmltLmluc2VydEVuZC5jbGVhcigpO1xuICAgICAgICB2aW0uaW5zZXJ0RW5kID0gbnVsbDtcbiAgICAgICAgQ29kZU1pcnJvci5vZmYoY20uZ2V0SW5wdXRGaWVsZCgpLCAna2V5ZG93bicsIG9uS2V5RXZlbnRUYXJnZXRLZXlEb3duKTtcbiAgICAgIH1cbiAgICAgIGlmICghaXNQbGF5aW5nICYmIHZpbS5pbnNlcnRNb2RlUmVwZWF0ID4gMSkge1xuICAgICAgICAvLyBQZXJmb3JtIGluc2VydCBtb2RlIHJlcGVhdCBmb3IgY29tbWFuZHMgbGlrZSAzLGEgYW5kIDMsby5cbiAgICAgICAgcmVwZWF0TGFzdEVkaXQoY20sIHZpbSwgdmltLmluc2VydE1vZGVSZXBlYXQgLSAxLFxuICAgICAgICAgICAgdHJ1ZSAvKiogcmVwZWF0Rm9ySW5zZXJ0ICovKTtcbiAgICAgICAgdmltLmxhc3RFZGl0SW5wdXRTdGF0ZS5yZXBlYXRPdmVycmlkZSA9IHZpbS5pbnNlcnRNb2RlUmVwZWF0O1xuICAgICAgfVxuICAgICAgZGVsZXRlIHZpbS5pbnNlcnRNb2RlUmVwZWF0O1xuICAgICAgdmltLmluc2VydE1vZGUgPSBmYWxzZTtcbiAgICAgIGlmICgha2VlcEN1cnNvcikge1xuICAgICAgICBjbS5zZXRDdXJzb3IoY20uZ2V0Q3Vyc29yKCkubGluZSwgY20uZ2V0Q3Vyc29yKCkuY2gtMSk7XG4gICAgICB9XG4gICAgICBjbS5zZXRPcHRpb24oJ2tleU1hcCcsICd2aW0nKTtcbiAgICAgIGNtLnNldE9wdGlvbignZGlzYWJsZUlucHV0JywgdHJ1ZSk7XG4gICAgICBjbS50b2dnbGVPdmVyd3JpdGUoZmFsc2UpOyAvLyBleGl0IHJlcGxhY2UgbW9kZSBpZiB3ZSB3ZXJlIGluIGl0LlxuICAgICAgLy8gdXBkYXRlIHRoZSBcIi4gcmVnaXN0ZXIgYmVmb3JlIGV4aXRpbmcgaW5zZXJ0IG1vZGVcbiAgICAgIGluc2VydE1vZGVDaGFuZ2VSZWdpc3Rlci5zZXRUZXh0KGxhc3RDaGFuZ2UuY2hhbmdlcy5qb2luKCcnKSk7XG4gICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwge21vZGU6IFwibm9ybWFsXCJ9KTtcbiAgICAgIGlmIChtYWNyb01vZGVTdGF0ZS5pc1JlY29yZGluZykge1xuICAgICAgICBsb2dJbnNlcnRNb2RlQ2hhbmdlKG1hY3JvTW9kZVN0YXRlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBfbWFwQ29tbWFuZChjb21tYW5kKSB7XG4gICAgICBkZWZhdWx0S2V5bWFwLnVuc2hpZnQoY29tbWFuZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFwQ29tbWFuZChrZXlzLCB0eXBlLCBuYW1lLCBhcmdzLCBleHRyYSkge1xuICAgICAgdmFyIGNvbW1hbmQgPSB7a2V5czoga2V5cywgdHlwZTogdHlwZX07XG4gICAgICBjb21tYW5kW3R5cGVdID0gbmFtZTtcbiAgICAgIGNvbW1hbmRbdHlwZSArIFwiQXJnc1wiXSA9IGFyZ3M7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gZXh0cmEpXG4gICAgICAgIGNvbW1hbmRba2V5XSA9IGV4dHJhW2tleV07XG4gICAgICBfbWFwQ29tbWFuZChjb21tYW5kKTtcbiAgICB9XG5cbiAgICAvLyBUaGUgdGltZW91dCBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSB0d28tY2hhcmFjdGVyIEVTQyBrZXltYXAgc2hvdWxkIGJlXG4gICAgLy8gYWRqdXN0ZWQgYWNjb3JkaW5nIHRvIHlvdXIgdHlwaW5nIHNwZWVkIHRvIHByZXZlbnQgZmFsc2UgcG9zaXRpdmVzLlxuICAgIGRlZmluZU9wdGlvbignaW5zZXJ0TW9kZUVzY0tleXNUaW1lb3V0JywgMjAwLCAnbnVtYmVyJyk7XG5cblxuICAgIGZ1bmN0aW9uIGV4ZWN1dGVNYWNyb1JlZ2lzdGVyKGNtLCB2aW0sIG1hY3JvTW9kZVN0YXRlLCByZWdpc3Rlck5hbWUpIHtcbiAgICAgIHZhciByZWdpc3RlciA9IHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5nZXRSZWdpc3RlcihyZWdpc3Rlck5hbWUpO1xuICAgICAgaWYgKHJlZ2lzdGVyTmFtZSA9PSAnOicpIHtcbiAgICAgICAgLy8gUmVhZC1vbmx5IHJlZ2lzdGVyIGNvbnRhaW5pbmcgbGFzdCBFeCBjb21tYW5kLlxuICAgICAgICBpZiAocmVnaXN0ZXIua2V5QnVmZmVyWzBdKSB7XG4gICAgICAgICAgZXhDb21tYW5kRGlzcGF0Y2hlci5wcm9jZXNzQ29tbWFuZChjbSwgcmVnaXN0ZXIua2V5QnVmZmVyWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGtleUJ1ZmZlciA9IHJlZ2lzdGVyLmtleUJ1ZmZlcjtcbiAgICAgIHZhciBpbWMgPSAwO1xuICAgICAgbWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICAgIG1hY3JvTW9kZVN0YXRlLnJlcGxheVNlYXJjaFF1ZXJpZXMgPSByZWdpc3Rlci5zZWFyY2hRdWVyaWVzLnNsaWNlKDApO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlCdWZmZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRleHQgPSBrZXlCdWZmZXJbaV07XG4gICAgICAgIHZhciBtYXRjaCwga2V5O1xuICAgICAgICB3aGlsZSAodGV4dCkge1xuICAgICAgICAgIC8vIFB1bGwgb2ZmIG9uZSBjb21tYW5kIGtleSwgd2hpY2ggaXMgZWl0aGVyIGEgc2luZ2xlIGNoYXJhY3RlclxuICAgICAgICAgIC8vIG9yIGEgc3BlY2lhbCBzZXF1ZW5jZSB3cmFwcGVkIGluICc8JyBhbmQgJz4nLCBlLmcuICc8U3BhY2U+Jy5cbiAgICAgICAgICBtYXRjaCA9ICgvPFxcdystLis/Pnw8XFx3Kz58Li8pLmV4ZWModGV4dCk7XG4gICAgICAgICAga2V5ID0gbWF0Y2hbMF07XG4gICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKG1hdGNoLmluZGV4ICsga2V5Lmxlbmd0aCk7XG4gICAgICAgICAgdmltQXBpLmhhbmRsZUtleShjbSwga2V5LCAnbWFjcm8nKTtcbiAgICAgICAgICBpZiAodmltLmluc2VydE1vZGUpIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2VzID0gcmVnaXN0ZXIuaW5zZXJ0TW9kZUNoYW5nZXNbaW1jKytdLmNoYW5nZXM7XG4gICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXMuY2hhbmdlcyA9XG4gICAgICAgICAgICAgICAgY2hhbmdlcztcbiAgICAgICAgICAgIHJlcGVhdEluc2VydE1vZGVDaGFuZ2VzKGNtLCBjaGFuZ2VzLCAxKTtcbiAgICAgICAgICAgIGV4aXRJbnNlcnRNb2RlKGNtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ0tleShtYWNyb01vZGVTdGF0ZSwga2V5KSB7XG4gICAgICBpZiAobWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nKSB7IHJldHVybjsgfVxuICAgICAgdmFyIHJlZ2lzdGVyTmFtZSA9IG1hY3JvTW9kZVN0YXRlLmxhdGVzdFJlZ2lzdGVyO1xuICAgICAgdmFyIHJlZ2lzdGVyID0gdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmdldFJlZ2lzdGVyKHJlZ2lzdGVyTmFtZSk7XG4gICAgICBpZiAocmVnaXN0ZXIpIHtcbiAgICAgICAgcmVnaXN0ZXIucHVzaFRleHQoa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dJbnNlcnRNb2RlQ2hhbmdlKG1hY3JvTW9kZVN0YXRlKSB7XG4gICAgICBpZiAobWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nKSB7IHJldHVybjsgfVxuICAgICAgdmFyIHJlZ2lzdGVyTmFtZSA9IG1hY3JvTW9kZVN0YXRlLmxhdGVzdFJlZ2lzdGVyO1xuICAgICAgdmFyIHJlZ2lzdGVyID0gdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmdldFJlZ2lzdGVyKHJlZ2lzdGVyTmFtZSk7XG4gICAgICBpZiAocmVnaXN0ZXIgJiYgcmVnaXN0ZXIucHVzaEluc2VydE1vZGVDaGFuZ2VzKSB7XG4gICAgICAgIHJlZ2lzdGVyLnB1c2hJbnNlcnRNb2RlQ2hhbmdlcyhtYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ1NlYXJjaFF1ZXJ5KG1hY3JvTW9kZVN0YXRlLCBxdWVyeSkge1xuICAgICAgaWYgKG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZykgeyByZXR1cm47IH1cbiAgICAgIHZhciByZWdpc3Rlck5hbWUgPSBtYWNyb01vZGVTdGF0ZS5sYXRlc3RSZWdpc3RlcjtcbiAgICAgIHZhciByZWdpc3RlciA9IHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5nZXRSZWdpc3RlcihyZWdpc3Rlck5hbWUpO1xuICAgICAgaWYgKHJlZ2lzdGVyICYmIHJlZ2lzdGVyLnB1c2hTZWFyY2hRdWVyeSkge1xuICAgICAgICByZWdpc3Rlci5wdXNoU2VhcmNoUXVlcnkocXVlcnkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbnMgZm9yIGNoYW5nZXMgbWFkZSBpbiBpbnNlcnQgbW9kZS5cbiAgICAgKiBTaG91bGQgb25seSBiZSBhY3RpdmUgaW4gaW5zZXJ0IG1vZGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gb25DaGFuZ2UoY20sIGNoYW5nZU9iaikge1xuICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICB2YXIgbGFzdENoYW5nZSA9IG1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcztcbiAgICAgIGlmICghbWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nKSB7XG4gICAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICAgIHdoaWxlKGNoYW5nZU9iaikge1xuICAgICAgICAgIGxhc3RDaGFuZ2UuZXhwZWN0Q3Vyc29yQWN0aXZpdHlGb3JDaGFuZ2UgPSB0cnVlO1xuICAgICAgICAgIGlmIChsYXN0Q2hhbmdlLmlnbm9yZUNvdW50ID4gMSkge1xuICAgICAgICAgICAgbGFzdENoYW5nZS5pZ25vcmVDb3VudC0tO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2hhbmdlT2JqLm9yaWdpbiA9PSAnK2lucHV0JyB8fCBjaGFuZ2VPYmoub3JpZ2luID09ICdwYXN0ZSdcbiAgICAgICAgICAgICAgfHwgY2hhbmdlT2JqLm9yaWdpbiA9PT0gdW5kZWZpbmVkIC8qIG9ubHkgaW4gdGVzdGluZyAqLykge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbkNvdW50ID0gY20ubGlzdFNlbGVjdGlvbnMoKS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uQ291bnQgPiAxKVxuICAgICAgICAgICAgICBsYXN0Q2hhbmdlLmlnbm9yZUNvdW50ID0gc2VsZWN0aW9uQ291bnQ7XG4gICAgICAgICAgICB2YXIgdGV4dCA9IGNoYW5nZU9iai50ZXh0LmpvaW4oJ1xcbicpO1xuICAgICAgICAgICAgaWYgKGxhc3RDaGFuZ2UubWF5YmVSZXNldCkge1xuICAgICAgICAgICAgICBsYXN0Q2hhbmdlLmNoYW5nZXMgPSBbXTtcbiAgICAgICAgICAgICAgbGFzdENoYW5nZS5tYXliZVJlc2V0ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGV4dCkge1xuICAgICAgICAgICAgICBpZiAoY20uc3RhdGUub3ZlcndyaXRlICYmICEvXFxuLy50ZXN0KHRleHQpKSB7XG4gICAgICAgICAgICAgICAgbGFzdENoYW5nZS5jaGFuZ2VzLnB1c2goW3RleHRdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGV4dC5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgaW5zZXJ0RW5kID0gdmltICYmIHZpbS5pbnNlcnRFbmQgJiYgdmltLmluc2VydEVuZC5maW5kKClcbiAgICAgICAgICAgICAgICAgIHZhciBjdXJzb3IgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgICAgICAgICAgIGlmIChpbnNlcnRFbmQgJiYgaW5zZXJ0RW5kLmxpbmUgPT0gY3Vyc29yLmxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG9mZnNldCA9IGluc2VydEVuZC5jaCAtIGN1cnNvci5jaDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9mZnNldCA+IDAgJiYgb2Zmc2V0IDwgdGV4dC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICBsYXN0Q2hhbmdlLmNoYW5nZXMucHVzaChbdGV4dCwgb2Zmc2V0XSk7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0ZXh0KSBsYXN0Q2hhbmdlLmNoYW5nZXMucHVzaCh0ZXh0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBDaGFuZ2Ugb2JqZWN0cyBtYXkgYmUgY2hhaW5lZCB3aXRoIG5leHQuXG4gICAgICAgICAgY2hhbmdlT2JqID0gY2hhbmdlT2JqLm5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAqIExpc3RlbnMgZm9yIGFueSBraW5kIG9mIGN1cnNvciBhY3Rpdml0eSBvbiBDb2RlTWlycm9yLlxuICAgICovXG4gICAgZnVuY3Rpb24gb25DdXJzb3JBY3Rpdml0eShjbSkge1xuICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgIGlmICh2aW0uaW5zZXJ0TW9kZSkge1xuICAgICAgICAvLyBUcmFja2luZyBjdXJzb3IgYWN0aXZpdHkgaW4gaW5zZXJ0IG1vZGUgKGZvciBtYWNybyBzdXBwb3J0KS5cbiAgICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICAgIGlmIChtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmcpIHsgcmV0dXJuOyB9XG4gICAgICAgIHZhciBsYXN0Q2hhbmdlID0gbWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzO1xuICAgICAgICBpZiAobGFzdENoYW5nZS5leHBlY3RDdXJzb3JBY3Rpdml0eUZvckNoYW5nZSkge1xuICAgICAgICAgIGxhc3RDaGFuZ2UuZXhwZWN0Q3Vyc29yQWN0aXZpdHlGb3JDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBDdXJzb3IgbW92ZWQgb3V0c2lkZSB0aGUgY29udGV4dCBvZiBhbiBlZGl0LiBSZXNldCB0aGUgY2hhbmdlLlxuICAgICAgICAgIGxhc3RDaGFuZ2UubWF5YmVSZXNldCA9IHRydWU7XG4gICAgICAgICAgaWYgKHZpbS5pbnNlcnRFbmQpIHZpbS5pbnNlcnRFbmQuY2xlYXIoKTtcbiAgICAgICAgICB2aW0uaW5zZXJ0RW5kID0gY20uc2V0Qm9va21hcmsoY20uZ2V0Q3Vyc29yKCksIHtpbnNlcnRMZWZ0OiB0cnVlfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIWNtLmN1ck9wLmlzVmltT3ApIHtcbiAgICAgICAgaGFuZGxlRXh0ZXJuYWxTZWxlY3Rpb24oY20sIHZpbSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhhbmRsZUV4dGVybmFsU2VsZWN0aW9uKGNtLCB2aW0sIGtlZXBIUG9zKSB7XG4gICAgICB2YXIgYW5jaG9yID0gY20uZ2V0Q3Vyc29yKCdhbmNob3InKTtcbiAgICAgIHZhciBoZWFkID0gY20uZ2V0Q3Vyc29yKCdoZWFkJyk7XG4gICAgICAvLyBFbnRlciBvciBleGl0IHZpc3VhbCBtb2RlIHRvIG1hdGNoIG1vdXNlIHNlbGVjdGlvbi5cbiAgICAgIGlmICh2aW0udmlzdWFsTW9kZSAmJiAhY20uc29tZXRoaW5nU2VsZWN0ZWQoKSkge1xuICAgICAgICBleGl0VmlzdWFsTW9kZShjbSwgZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmICghdmltLnZpc3VhbE1vZGUgJiYgIXZpbS5pbnNlcnRNb2RlICYmIGNtLnNvbWV0aGluZ1NlbGVjdGVkKCkpIHtcbiAgICAgICAgdmltLnZpc3VhbE1vZGUgPSB0cnVlO1xuICAgICAgICB2aW0udmlzdWFsTGluZSA9IGZhbHNlO1xuICAgICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwge21vZGU6IFwidmlzdWFsXCJ9KTtcbiAgICAgIH1cbiAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAvLyBCaW5kIENvZGVNaXJyb3Igc2VsZWN0aW9uIG1vZGVsIHRvIHZpbSBzZWxlY3Rpb24gbW9kZWwuXG4gICAgICAgIC8vIE1vdXNlIHNlbGVjdGlvbnMgYXJlIGNvbnNpZGVyZWQgdmlzdWFsIGNoYXJhY3Rlcndpc2UuXG4gICAgICAgIHZhciBoZWFkT2Zmc2V0ID0gIWN1cnNvcklzQmVmb3JlKGhlYWQsIGFuY2hvcikgPyAtMSA6IDA7XG4gICAgICAgIHZhciBhbmNob3JPZmZzZXQgPSBjdXJzb3JJc0JlZm9yZShoZWFkLCBhbmNob3IpID8gLTEgOiAwO1xuICAgICAgICBoZWFkID0gb2Zmc2V0Q3Vyc29yKGhlYWQsIDAsIGhlYWRPZmZzZXQpO1xuICAgICAgICBhbmNob3IgPSBvZmZzZXRDdXJzb3IoYW5jaG9yLCAwLCBhbmNob3JPZmZzZXQpO1xuICAgICAgICB2aW0uc2VsID0ge1xuICAgICAgICAgIGFuY2hvcjogYW5jaG9yLFxuICAgICAgICAgIGhlYWQ6IGhlYWRcbiAgICAgICAgfTtcbiAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCAnPCcsIGN1cnNvck1pbihoZWFkLCBhbmNob3IpKTtcbiAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCAnPicsIGN1cnNvck1heChoZWFkLCBhbmNob3IpKTtcbiAgICAgIH0gZWxzZSBpZiAoIXZpbS5pbnNlcnRNb2RlICYmICFrZWVwSFBvcykge1xuICAgICAgICAvLyBSZXNldCBsYXN0SFBvcyBpZiBzZWxlY3Rpb24gd2FzIG1vZGlmaWVkIGJ5IHNvbWV0aGluZyBvdXRzaWRlIG9mIHZpbSBtb2RlIGUuZy4gYnkgbW91c2UuXG4gICAgICAgIHZpbS5sYXN0SFBvcyA9IGNtLmdldEN1cnNvcigpLmNoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBXcmFwcGVyIGZvciBzcGVjaWFsIGtleXMgcHJlc3NlZCBpbiBpbnNlcnQgbW9kZSAqL1xuICAgIGZ1bmN0aW9uIEluc2VydE1vZGVLZXkoa2V5TmFtZSwgZSkge1xuICAgICAgdGhpcy5rZXlOYW1lID0ga2V5TmFtZTtcbiAgICAgIHRoaXMua2V5ID0gZS5rZXk7XG4gICAgICB0aGlzLmN0cmxLZXkgPSBlLmN0cmxLZXk7XG4gICAgICB0aGlzLmFsdEtleSA9IGUuYWx0S2V5O1xuICAgICAgdGhpcy5tZXRhS2V5ID0gZS5tZXRhS2V5O1xuICAgICAgdGhpcy5zaGlmdEtleSA9IGUuc2hpZnRLZXk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgKiBIYW5kbGVzIHJhdyBrZXkgZG93biBldmVudHMgZnJvbSB0aGUgdGV4dCBhcmVhLlxuICAgICogLSBTaG91bGQgb25seSBiZSBhY3RpdmUgaW4gaW5zZXJ0IG1vZGUuXG4gICAgKiAtIEZvciByZWNvcmRpbmcgZGVsZXRlcyBpbiBpbnNlcnQgbW9kZS5cbiAgICAqL1xuICAgIGZ1bmN0aW9uIG9uS2V5RXZlbnRUYXJnZXRLZXlEb3duKGUpIHtcbiAgICAgIHZhciBtYWNyb01vZGVTdGF0ZSA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlO1xuICAgICAgdmFyIGxhc3RDaGFuZ2UgPSBtYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXM7XG4gICAgICB2YXIga2V5TmFtZSA9IENvZGVNaXJyb3Iua2V5TmFtZSA/IENvZGVNaXJyb3Iua2V5TmFtZShlKSA6IGUua2V5O1xuICAgICAgaWYgKCFrZXlOYW1lKSB7IHJldHVybjsgfVxuICAgICAgXG4gICAgICBpZiAoa2V5TmFtZS5pbmRleE9mKCdEZWxldGUnKSAhPSAtMSB8fCBrZXlOYW1lLmluZGV4T2YoJ0JhY2tzcGFjZScpICE9IC0xKSB7XG4gICAgICAgIGlmIChsYXN0Q2hhbmdlLm1heWJlUmVzZXQpIHtcbiAgICAgICAgICBsYXN0Q2hhbmdlLmNoYW5nZXMgPSBbXTtcbiAgICAgICAgICBsYXN0Q2hhbmdlLm1heWJlUmVzZXQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBsYXN0Q2hhbmdlLmNoYW5nZXMucHVzaChuZXcgSW5zZXJ0TW9kZUtleShrZXlOYW1lLCBlKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVwZWF0cyB0aGUgbGFzdCBlZGl0LCB3aGljaCBpbmNsdWRlcyBleGFjdGx5IDEgY29tbWFuZCBhbmQgYXQgbW9zdCAxXG4gICAgICogaW5zZXJ0LiBPcGVyYXRvciBhbmQgbW90aW9uIGNvbW1hbmRzIGFyZSByZWFkIGZyb20gbGFzdEVkaXRJbnB1dFN0YXRlLFxuICAgICAqIHdoaWxlIGFjdGlvbiBjb21tYW5kcyBhcmUgcmVhZCBmcm9tIGxhc3RFZGl0QWN0aW9uQ29tbWFuZC5cbiAgICAgKlxuICAgICAqIElmIHJlcGVhdEZvckluc2VydCBpcyB0cnVlLCB0aGVuIHRoZSBmdW5jdGlvbiB3YXMgY2FsbGVkIGJ5XG4gICAgICogZXhpdEluc2VydE1vZGUgdG8gcmVwZWF0IHRoZSBpbnNlcnQgbW9kZSBjaGFuZ2VzIHRoZSB1c2VyIGp1c3QgbWFkZS4gVGhlXG4gICAgICogY29ycmVzcG9uZGluZyBlbnRlckluc2VydE1vZGUgY2FsbCB3YXMgbWFkZSB3aXRoIGEgY291bnQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVwZWF0TGFzdEVkaXQoY20sIHZpbSwgcmVwZWF0LCByZXBlYXRGb3JJbnNlcnQpIHtcbiAgICAgIHZhciBtYWNyb01vZGVTdGF0ZSA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlO1xuICAgICAgbWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICAgIHZhciBpc0FjdGlvbiA9ICEhdmltLmxhc3RFZGl0QWN0aW9uQ29tbWFuZDtcbiAgICAgIHZhciBjYWNoZWRJbnB1dFN0YXRlID0gdmltLmlucHV0U3RhdGU7XG4gICAgICBmdW5jdGlvbiByZXBlYXRDb21tYW5kKCkge1xuICAgICAgICBpZiAoaXNBY3Rpb24pIHtcbiAgICAgICAgICBjb21tYW5kRGlzcGF0Y2hlci5wcm9jZXNzQWN0aW9uKGNtLCB2aW0sIHZpbS5sYXN0RWRpdEFjdGlvbkNvbW1hbmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbW1hbmREaXNwYXRjaGVyLmV2YWxJbnB1dChjbSwgdmltKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcmVwZWF0SW5zZXJ0KHJlcGVhdCkge1xuICAgICAgICBpZiAobWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzLmNoYW5nZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIC8vIEZvciBzb21lIHJlYXNvbiwgcmVwZWF0IGN3IGluIGRlc2t0b3AgVklNIGRvZXMgbm90IHJlcGVhdFxuICAgICAgICAgIC8vIGluc2VydCBtb2RlIGNoYW5nZXMuIFdpbGwgY29uZm9ybSB0byB0aGF0IGJlaGF2aW9yLlxuICAgICAgICAgIHJlcGVhdCA9ICF2aW0ubGFzdEVkaXRBY3Rpb25Db21tYW5kID8gMSA6IHJlcGVhdDtcbiAgICAgICAgICB2YXIgY2hhbmdlT2JqZWN0ID0gbWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzO1xuICAgICAgICAgIHJlcGVhdEluc2VydE1vZGVDaGFuZ2VzKGNtLCBjaGFuZ2VPYmplY3QuY2hhbmdlcywgcmVwZWF0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmltLmlucHV0U3RhdGUgPSB2aW0ubGFzdEVkaXRJbnB1dFN0YXRlO1xuICAgICAgaWYgKGlzQWN0aW9uICYmIHZpbS5sYXN0RWRpdEFjdGlvbkNvbW1hbmQuaW50ZXJsYWNlSW5zZXJ0UmVwZWF0KSB7XG4gICAgICAgIC8vIG8gYW5kIE8gcmVwZWF0IGhhdmUgdG8gYmUgaW50ZXJsYWNlZCB3aXRoIGluc2VydCByZXBlYXRzIHNvIHRoYXQgdGhlXG4gICAgICAgIC8vIGluc2VydGlvbnMgYXBwZWFyIG9uIHNlcGFyYXRlIGxpbmVzIGluc3RlYWQgb2YgdGhlIGxhc3QgbGluZS5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXBlYXQ7IGkrKykge1xuICAgICAgICAgIHJlcGVhdENvbW1hbmQoKTtcbiAgICAgICAgICByZXBlYXRJbnNlcnQoMSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghcmVwZWF0Rm9ySW5zZXJ0KSB7XG4gICAgICAgICAgLy8gSGFjayB0byBnZXQgdGhlIGN1cnNvciB0byBlbmQgdXAgYXQgdGhlIHJpZ2h0IHBsYWNlLiBJZiBJIGlzXG4gICAgICAgICAgLy8gcmVwZWF0ZWQgaW4gaW5zZXJ0IG1vZGUgcmVwZWF0LCBjdXJzb3Igd2lsbCBiZSAxIGluc2VydFxuICAgICAgICAgIC8vIGNoYW5nZSBzZXQgbGVmdCBvZiB3aGVyZSBpdCBzaG91bGQgYmUuXG4gICAgICAgICAgcmVwZWF0Q29tbWFuZCgpO1xuICAgICAgICB9XG4gICAgICAgIHJlcGVhdEluc2VydChyZXBlYXQpO1xuICAgICAgfVxuICAgICAgdmltLmlucHV0U3RhdGUgPSBjYWNoZWRJbnB1dFN0YXRlO1xuICAgICAgaWYgKHZpbS5pbnNlcnRNb2RlICYmICFyZXBlYXRGb3JJbnNlcnQpIHtcbiAgICAgICAgLy8gRG9uJ3QgZXhpdCBpbnNlcnQgbW9kZSB0d2ljZS4gSWYgcmVwZWF0Rm9ySW5zZXJ0IGlzIHNldCwgdGhlbiB3ZVxuICAgICAgICAvLyB3ZXJlIGNhbGxlZCBieSBhbiBleGl0SW5zZXJ0TW9kZSBjYWxsIGxvd2VyIG9uIHRoZSBzdGFjay5cbiAgICAgICAgZXhpdEluc2VydE1vZGUoY20pO1xuICAgICAgfVxuICAgICAgbWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2VuZENtS2V5KGNtLCBrZXkpIHtcbiAgICAgIENvZGVNaXJyb3IubG9va3VwS2V5KGtleSwgJ3ZpbS1pbnNlcnQnLCBmdW5jdGlvbiBrZXlIYW5kbGVyKGJpbmRpbmcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBiaW5kaW5nID09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgQ29kZU1pcnJvci5jb21tYW5kc1tiaW5kaW5nXShjbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYmluZGluZyhjbSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcmVwZWF0SW5zZXJ0TW9kZUNoYW5nZXMoY20sIGNoYW5nZXMsIHJlcGVhdCkge1xuICAgICAgdmFyIGhlYWQgPSBjbS5nZXRDdXJzb3IoJ2hlYWQnKTtcbiAgICAgIHZhciB2aXN1YWxCbG9jayA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcy52aXN1YWxCbG9jaztcbiAgICAgIGlmICh2aXN1YWxCbG9jaykge1xuICAgICAgICAvLyBTZXQgdXAgYmxvY2sgc2VsZWN0aW9uIGFnYWluIGZvciByZXBlYXRpbmcgdGhlIGNoYW5nZXMuXG4gICAgICAgIHNlbGVjdEZvckluc2VydChjbSwgaGVhZCwgdmlzdWFsQmxvY2sgKyAxKTtcbiAgICAgICAgcmVwZWF0ID0gY20ubGlzdFNlbGVjdGlvbnMoKS5sZW5ndGg7XG4gICAgICAgIGNtLnNldEN1cnNvcihoZWFkKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwZWF0OyBpKyspIHtcbiAgICAgICAgaWYgKHZpc3VhbEJsb2NrKSB7XG4gICAgICAgICAgY20uc2V0Q3Vyc29yKG9mZnNldEN1cnNvcihoZWFkLCBpLCAwKSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjaGFuZ2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgdmFyIGNoYW5nZSA9IGNoYW5nZXNbal07XG4gICAgICAgICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydE1vZGVLZXkpIHtcbiAgICAgICAgICAgIHNlbmRDbUtleShjbSwgY2hhbmdlLmtleU5hbWUsIGNoYW5nZSk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgY2hhbmdlID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VTZWxlY3Rpb24oY2hhbmdlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgICB2YXIgZW5kID0gb2Zmc2V0Q3Vyc29yKHN0YXJ0LCAwLCBjaGFuZ2VbMF0ubGVuZ3RoIC0gKGNoYW5nZVsxXSB8fCAwKSk7XG4gICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UoY2hhbmdlWzBdLCBzdGFydCwgY2hhbmdlWzFdID8gc3RhcnQ6IGVuZCk7XG4gICAgICAgICAgICBjbS5zZXRDdXJzb3IoZW5kKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh2aXN1YWxCbG9jaykge1xuICAgICAgICBjbS5zZXRDdXJzb3Iob2Zmc2V0Q3Vyc29yKGhlYWQsIDAsIDEpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBtdWx0aXNlbGVjdCBzdXBwb3J0XG4gIC8vIEluaXRpYWxpemUgVmltIGFuZCBtYWtlIGl0IGF2YWlsYWJsZSBhcyBhbiBBUEkuXG4gIENvZGVNaXJyb3IuVmltID0gdmltQXBpO1xuXG4gIHZhciBzcGVjaWFsS2V5QWNlID0geydyZXR1cm4nOidDUicsYmFja3NwYWNlOidCUycsJ2RlbGV0ZSc6J0RlbCcsZXNjOidFc2MnLFxuICAgIGxlZnQ6J0xlZnQnLHJpZ2h0OidSaWdodCcsdXA6J1VwJyxkb3duOidEb3duJyxzcGFjZTogJ1NwYWNlJyxpbnNlcnQ6ICdJbnMnLFxuICAgIGhvbWU6J0hvbWUnLGVuZDonRW5kJyxwYWdldXA6J1BhZ2VVcCcscGFnZWRvd246J1BhZ2VEb3duJywgZW50ZXI6ICdDUidcbiAgfTtcbiAgZnVuY3Rpb24gbG9va3VwS2V5KGhhc2hJZCwga2V5LCBlLCB2aW0pIHtcbiAgICBpZiAoa2V5Lmxlbmd0aCA+IDEgJiYga2V5WzBdID09IFwiblwiKSB7XG4gICAgICBrZXkgPSBrZXkucmVwbGFjZShcIm51bXBhZFwiLCBcIlwiKTtcbiAgICB9XG4gICAga2V5ID0gc3BlY2lhbEtleUFjZVtrZXldIHx8IGtleTtcbiAgICB2YXIgbmFtZSA9ICcnO1xuICAgIGlmIChlLmN0cmxLZXkpIHsgbmFtZSArPSAnQy0nOyB9XG4gICAgaWYgKGUuYWx0S2V5KSB7IG5hbWUgKz0gJ0EtJzsgfVxuICAgIGlmICgobmFtZSB8fCBrZXkubGVuZ3RoID4gMSkgJiYgZS5zaGlmdEtleSkgeyBuYW1lICs9ICdTLSc7IH1cblxuICAgIGlmICh2aW0gJiYgIXZpbS5leHBlY3RMaXRlcmFsTmV4dCAmJiBrZXkubGVuZ3RoID09IDEpIHtcbiAgICAgIGlmIChsYW5nbWFwLmtleW1hcCAmJiBrZXkgaW4gbGFuZ21hcC5rZXltYXApIHtcbiAgICAgICAgaWYgKGxhbmdtYXAucmVtYXBDdHJsICE9PSBmYWxzZSB8fCAhbmFtZSlcbiAgICAgICAgICBrZXkgPSBsYW5nbWFwLmtleW1hcFtrZXldO1xuICAgICAgfSBlbHNlIGlmIChrZXkuY2hhckNvZGVBdCgwKSA+IDI1NSkge1xuICAgICAgICB2YXIgY29kZSA9IGUuY29kZSAmJiBlLmNvZGUuc2xpY2UoLTEpIHx8IFwiXCI7XG4gICAgICAgIGlmICghZS5zaGlmdEtleSkgY29kZSA9IGNvZGUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKGNvZGUpIGtleSA9IGNvZGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbmFtZSArPSBrZXk7XG4gICAgaWYgKG5hbWUubGVuZ3RoID4gMSkgeyBuYW1lID0gJzwnICsgbmFtZSArICc+JzsgfVxuICAgIHJldHVybiBuYW1lO1xuICB9XG4gIHZhciBoYW5kbGVLZXkgPSB2aW1BcGkuaGFuZGxlS2V5LmJpbmQodmltQXBpKTtcbiAgdmltQXBpLmhhbmRsZUtleSA9IGZ1bmN0aW9uKGNtLCBrZXksIG9yaWdpbikge1xuICAgIHJldHVybiBjbS5vcGVyYXRpb24oZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gaGFuZGxlS2V5KGNtLCBrZXksIG9yaWdpbik7XG4gICAgfSwgdHJ1ZSk7XG4gIH1cbiAgICBmdW5jdGlvbiBjbG9uZVZpbVN0YXRlKHN0YXRlKSB7XG4gICAgICB2YXIgbiA9IG5ldyBzdGF0ZS5jb25zdHJ1Y3RvcigpO1xuICAgICAgT2JqZWN0LmtleXMoc3RhdGUpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIGlmIChrZXkgPT0gXCJpbnNlcnRFbmRcIikgcmV0dXJuO1xuICAgICAgICB2YXIgbyA9IHN0YXRlW2tleV07XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG8pKVxuICAgICAgICAgIG8gPSBvLnNsaWNlKCk7XG4gICAgICAgIGVsc2UgaWYgKG8gJiYgdHlwZW9mIG8gPT0gXCJvYmplY3RcIiAmJiBvLmNvbnN0cnVjdG9yICE9IE9iamVjdClcbiAgICAgICAgICBvID0gY2xvbmVWaW1TdGF0ZShvKTtcbiAgICAgICAgbltrZXldID0gbztcbiAgICAgIH0pO1xuICAgICAgaWYgKHN0YXRlLnNlbCkge1xuICAgICAgICBuLnNlbCA9IHtcbiAgICAgICAgICBoZWFkOiBzdGF0ZS5zZWwuaGVhZCAmJiBjb3B5Q3Vyc29yKHN0YXRlLnNlbC5oZWFkKSxcbiAgICAgICAgICBhbmNob3I6IHN0YXRlLnNlbC5hbmNob3IgJiYgY29weUN1cnNvcihzdGF0ZS5zZWwuYW5jaG9yKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG47XG4gICAgfVxuICAgIGZ1bmN0aW9uIG11bHRpU2VsZWN0SGFuZGxlS2V5KGNtLCBrZXksIG9yaWdpbikge1xuICAgICAgdmFyIGlzSGFuZGxlZCA9IGZhbHNlO1xuICAgICAgdmFyIHZpbSA9IHZpbUFwaS5tYXliZUluaXRWaW1TdGF0ZV8oY20pO1xuICAgICAgdmFyIHZpc3VhbEJsb2NrID0gdmltLnZpc3VhbEJsb2NrIHx8IHZpbS53YXNJblZpc3VhbEJsb2NrO1xuXG4gICAgICB2YXIgd2FzTXVsdGlzZWxlY3QgPSBjbS5hY2UuaW5NdWx0aVNlbGVjdE1vZGU7XG4gICAgICBpZiAodmltLndhc0luVmlzdWFsQmxvY2sgJiYgIXdhc011bHRpc2VsZWN0KSB7XG4gICAgICAgIHZpbS53YXNJblZpc3VhbEJsb2NrID0gZmFsc2U7XG4gICAgICB9IGVsc2UgaWYgKHdhc011bHRpc2VsZWN0ICYmIHZpbS52aXN1YWxCbG9jaykge1xuICAgICAgICAgdmltLndhc0luVmlzdWFsQmxvY2sgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgaWYgKGtleSA9PSAnPEVzYz4nICYmICF2aW0uaW5zZXJ0TW9kZSAmJiAhdmltLnZpc3VhbE1vZGUgJiYgd2FzTXVsdGlzZWxlY3QpIHtcbiAgICAgIGNtLmFjZS5leGl0TXVsdGlTZWxlY3RNb2RlKCk7XG4gICAgfSBlbHNlIGlmICh2aXN1YWxCbG9jayB8fCAhd2FzTXVsdGlzZWxlY3QgfHwgY20uYWNlLmluVmlydHVhbFNlbGVjdGlvbk1vZGUpIHtcbiAgICAgIGlzSGFuZGxlZCA9IHZpbUFwaS5oYW5kbGVLZXkoY20sIGtleSwgb3JpZ2luKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBvbGQgPSBjbG9uZVZpbVN0YXRlKHZpbSk7XG4gICAgICAgIHZhciBjaGFuZ2VRdWV1ZUxpc3QgPSB2aW0uaW5wdXRTdGF0ZS5jaGFuZ2VRdWV1ZUxpc3QgfHwgW107XG5cbiAgICAgICAgY20ub3BlcmF0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGNtLmN1ck9wLmlzVmltT3AgPSB0cnVlO1xuICAgICAgICAgIHZhciBpbmRleCA9IDA7XG4gICAgICAgICAgY20uYWNlLmZvckVhY2hTZWxlY3Rpb24oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgc2VsID0gY20uYWNlLnNlbGVjdGlvbjtcbiAgICAgICAgICAgIGNtLnN0YXRlLnZpbS5sYXN0SFBvcyA9IHNlbC4kZGVzaXJlZENvbHVtbiA9PSBudWxsID8gc2VsLmxlYWQuY29sdW1uIDogc2VsLiRkZXNpcmVkQ29sdW1uO1xuICAgICAgICAgICAgY20uc3RhdGUudmltLmlucHV0U3RhdGUuY2hhbmdlUXVldWUgPSBjaGFuZ2VRdWV1ZUxpc3RbaW5kZXhdO1xuICAgICAgICAgICAgdmFyIGhlYWQgPSBjbS5nZXRDdXJzb3IoXCJoZWFkXCIpO1xuICAgICAgICAgICAgdmFyIGFuY2hvciA9IGNtLmdldEN1cnNvcihcImFuY2hvclwiKTtcbiAgICAgICAgICAgIHZhciBoZWFkT2Zmc2V0ID0gIWN1cnNvcklzQmVmb3JlKGhlYWQsIGFuY2hvcikgPyAtMSA6IDA7XG4gICAgICAgICAgICB2YXIgYW5jaG9yT2Zmc2V0ID0gY3Vyc29ySXNCZWZvcmUoaGVhZCwgYW5jaG9yKSA/IC0xIDogMDtcbiAgICAgICAgICAgIGhlYWQgPSBvZmZzZXRDdXJzb3IoaGVhZCwgMCwgaGVhZE9mZnNldCk7XG4gICAgICAgICAgICBhbmNob3IgPSBvZmZzZXRDdXJzb3IoYW5jaG9yLCAwLCBhbmNob3JPZmZzZXQpO1xuICAgICAgICAgICAgY20uc3RhdGUudmltLnNlbC5oZWFkID0gaGVhZDtcbiAgICAgICAgICAgIGNtLnN0YXRlLnZpbS5zZWwuYW5jaG9yID0gYW5jaG9yO1xuXG4gICAgICAgICAgICBpc0hhbmRsZWQgPSBoYW5kbGVLZXkoY20sIGtleSwgb3JpZ2luKTtcbiAgICAgICAgICAgIHNlbC4kZGVzaXJlZENvbHVtbiA9IGNtLnN0YXRlLnZpbS5sYXN0SFBvcyA9PSAtMSA/IG51bGwgOiBjbS5zdGF0ZS52aW0ubGFzdEhQb3M7XG4gICAgICAgICAgICAvLyBUT0RPIHdoeSBkb2VzIGNtLnZpcnR1YWxTZWxlY3Rpb25Nb2RlIGNoZWNrIGluZGV4P1xuICAgICAgICAgICAgaWYgKGNtLmFjZS5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlKSB7XG4gICAgICAgICAgICAgIGNoYW5nZVF1ZXVlTGlzdFtpbmRleF0gPSBjbS5zdGF0ZS52aW0uaW5wdXRTdGF0ZS5jaGFuZ2VRdWV1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjbS52aXJ0dWFsU2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICAgIGNtLnN0YXRlLnZpbSA9IGNsb25lVmltU3RhdGUob2xkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluZGV4Kys7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKGNtLmN1ck9wLmN1cnNvckFjdGl2aXR5ICYmICFpc0hhbmRsZWQpXG4gICAgICAgICAgICBjbS5jdXJPcC5jdXJzb3JBY3Rpdml0eSA9IGZhbHNlO1xuICAgICAgICAgIHZpbS5zdGF0dXMgPSBjbS5zdGF0ZS52aW0uc3RhdHVzO1xuICAgICAgICAgIGNtLnN0YXRlLnZpbSA9IHZpbTtcbiAgICAgICAgICB2aW0uaW5wdXRTdGF0ZS5jaGFuZ2VRdWV1ZUxpc3QgPSBjaGFuZ2VRdWV1ZUxpc3Q7XG4gICAgICAgICAgdmltLmlucHV0U3RhdGUuY2hhbmdlUXVldWUgPSBudWxsO1xuICAgICAgICB9LCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIC8vIHNvbWUgY29tbWFuZHMgbWF5IGJyaW5nIHZpc3VhbE1vZGUgYW5kIHNlbGVjdGlvbiBvdXQgb2Ygc3luY1xuICAgICAgaWYgKGlzSGFuZGxlZCAmJiAhdmltLnZpc3VhbE1vZGUgJiYgIXZpbS5pbnNlcnQgJiYgdmltLnZpc3VhbE1vZGUgIT0gY20uc29tZXRoaW5nU2VsZWN0ZWQoKSkge1xuICAgICAgICBoYW5kbGVFeHRlcm5hbFNlbGVjdGlvbihjbSwgdmltLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpc0hhbmRsZWQ7XG4gICAgfVxuICAgIHJlc2V0VmltR2xvYmFsU3RhdGUoKTtcblxuXG4gIGV4cG9ydHMuQ29kZU1pcnJvciA9IENvZGVNaXJyb3I7XG4gIHZhciBnZXRWaW0gPSB2aW1BcGkubWF5YmVJbml0VmltU3RhdGVfO1xuICBleHBvcnRzLmhhbmRsZXIgPSB7XG4gICAgJGlkOiBcImFjZS9rZXlib2FyZC92aW1cIixcbiAgICBkcmF3Q3Vyc29yOiBmdW5jdGlvbihlbGVtZW50LCBwaXhlbFBvcywgY29uZmlnLCBzZWwsIHNlc3Npb24pIHtcbiAgICAgIHZhciB2aW0gPSB0aGlzLnN0YXRlLnZpbSB8fCB7fTtcbiAgICAgIHZhciB3ID0gY29uZmlnLmNoYXJhY3RlcldpZHRoO1xuICAgICAgdmFyIGggPSBjb25maWcubGluZUhlaWdodDtcbiAgICAgIHZhciB0b3AgPSBwaXhlbFBvcy50b3A7XG4gICAgICB2YXIgbGVmdCA9IHBpeGVsUG9zLmxlZnQ7XG4gICAgICBpZiAoIXZpbS5pbnNlcnRNb2RlKSB7XG4gICAgICAgIHZhciBpc2JhY2t3YXJkcyA9ICFzZWwuY3Vyc29yXG4gICAgICAgICAgICA/IHNlc3Npb24uc2VsZWN0aW9uLmlzQmFja3dhcmRzKCkgfHwgc2Vzc2lvbi5zZWxlY3Rpb24uaXNFbXB0eSgpXG4gICAgICAgICAgICA6IFJhbmdlLmNvbXBhcmVQb2ludHMoc2VsLmN1cnNvciwgc2VsLnN0YXJ0KSA8PSAwO1xuICAgICAgICBpZiAoIWlzYmFja3dhcmRzICYmIGxlZnQgPiB3KVxuICAgICAgICAgIGxlZnQgLT0gdztcbiAgICAgIH1cbiAgICAgIGlmICghdmltLmluc2VydE1vZGUgJiYgdmltLnN0YXR1cykge1xuICAgICAgICBoID0gaCAvIDI7XG4gICAgICAgIHRvcCArPSBoO1xuICAgICAgfVxuICAgICAgZG9tTGliLnRyYW5zbGF0ZShlbGVtZW50LCBsZWZ0LCB0b3ApO1xuICAgICAgZG9tTGliLnNldFN0eWxlKGVsZW1lbnQuc3R5bGUsIFwid2lkdGhcIiwgdyArIFwicHhcIik7XG4gICAgICBkb21MaWIuc2V0U3R5bGUoZWxlbWVudC5zdHlsZSwgXCJoZWlnaHRcIiwgaCArIFwicHhcIik7XG4gICAgfSxcbiAgICAkZ2V0RGlyZWN0aW9uRm9ySGlnaGxpZ2h0OiBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICB2YXIgY20gPSBlZGl0b3Iuc3RhdGUuY207XG4gICAgICB2YXIgdmltID0gZ2V0VmltKGNtKTtcbiAgICAgIGlmICghdmltLmluc2VydE1vZGUpIHtcbiAgICAgICAgcmV0dXJuIGVkaXRvci5zZXNzaW9uLnNlbGVjdGlvbi5pc0JhY2t3YXJkcygpIHx8IGVkaXRvci5zZXNzaW9uLnNlbGVjdGlvbi5pc0VtcHR5KCk7XG4gICAgICB9XG4gICAgfSxcbiAgICBoYW5kbGVLZXlib2FyZDogZnVuY3Rpb24oZGF0YSwgaGFzaElkLCBrZXksIGtleUNvZGUsIGUpIHtcbiAgICAgIHZhciBlZGl0b3IgPSBkYXRhLmVkaXRvcjtcbiAgICAgIHZhciBjbSA9IGVkaXRvci5zdGF0ZS5jbTtcbiAgICAgIHZhciB2aW0gPSBnZXRWaW0oY20pO1xuICAgICAgaWYgKGtleUNvZGUgPT0gLTEpIHJldHVybjtcblxuICAgICAgLy8gaW4gbm9uLWluc2VydCBtb2RlIHdlIHRyeSB0byBmaW5kIHRoZSBhc2NpaSBrZXkgY29ycmVzcG9uZGluZyB0byB0aGUgdGV4dCBpbiB0ZXh0YXJlYVxuICAgICAgLy8gdGhpcyBpcyBuZWVkZWQgYmVjYXVzZSBpbiBsYW5ndWFnZXMgdGhhdCB1c2UgbGF0aW4gYWxwaGFiZXQgd2Ugd2FudCB0byBnZXQgdGhlIGtleSB0aGF0IGJyb3dzZXIgc2VuZHMgdG8gdGhlIHRleHRhcmVhXG4gICAgICAvLyBhbmQgaW4gbm9uXG4gICAgICBpZiAoIXZpbS5pbnNlcnRNb2RlKSB7XG4gICAgICAgIGlmIChoYXNoSWQgPT0gLTEpIHtcbiAgICAgICAgICBpZiAoa2V5LmNoYXJDb2RlQXQoMCkgPiAweEZGKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5pbnB1dEtleSkge1xuICAgICAgICAgICAgICBrZXkgPSBkYXRhLmlucHV0S2V5O1xuICAgICAgICAgICAgICBpZiAoa2V5ICYmIGRhdGEuaW5wdXRIYXNoID09IDQpXG4gICAgICAgICAgICAgICAga2V5ID0ga2V5LnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGEuaW5wdXRDaGFyID0ga2V5O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGhhc2hJZCA9PSA0IHx8IGhhc2hJZCA9PSAwKSB7XG4gICAgICAgICAgaWYgKGRhdGEuaW5wdXRLZXkgPT0ga2V5ICYmIGRhdGEuaW5wdXRIYXNoID09IGhhc2hJZCAmJiBkYXRhLmlucHV0Q2hhcikge1xuICAgICAgICAgICAgLy8gb24gbWFjIHRleHQgaW5wdXQgZG9lc24ndCByZXBlYXRcbiAgICAgICAgICAgIGtleSA9IGRhdGEuaW5wdXRDaGFyO1xuICAgICAgICAgICAgaGFzaElkID0gLTFcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXRhLmlucHV0Q2hhciA9IG51bGw7XG4gICAgICAgICAgICBkYXRhLmlucHV0S2V5ID0ga2V5O1xuICAgICAgICAgICAgZGF0YS5pbnB1dEhhc2ggPSBoYXNoSWQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGRhdGEuaW5wdXRDaGFyID0gZGF0YS5pbnB1dEtleSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKGNtLnN0YXRlLm92ZXJ3cml0ZSAmJiB2aW0uaW5zZXJ0TW9kZSAmJiBrZXkgPT0gXCJiYWNrc3BhY2VcIiAmJiBoYXNoSWQgPT0gMCkge1xuICAgICAgICByZXR1cm4ge2NvbW1hbmQ6IFwiZ290b2xlZnRcIn1cbiAgICAgIH1cblxuICAgICAgLy8gY3RybC1jIGlzIHNwZWNpYWwgaXQgYm90aCBleGl0cyBtb2RlIGFuZCBjb3BpZXMgdGV4dFxuICAgICAgaWYgKGtleSA9PSBcImNcIiAmJiBoYXNoSWQgPT0gMSkgeyAvLyBrZXkgPT0gXCJjdHJsLWNcIlxuICAgICAgICBpZiAoIXVzZXJhZ2VudC5pc01hYyAmJiBlZGl0b3IuZ2V0Q29weVRleHQoKSkge1xuICAgICAgICAgIGVkaXRvci5vbmNlKFwiY29weVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh2aW0uaW5zZXJ0TW9kZSkgZWRpdG9yLnNlbGVjdGlvbi5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgZWxzZSBjbS5vcGVyYXRpb24oZnVuY3Rpb24oKSB7IGV4aXRWaXN1YWxNb2RlKGNtKTsgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIHtjb21tYW5kOiBcIm51bGxcIiwgcGFzc0V2ZW50OiB0cnVlfTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoa2V5ID09IFwiZXNjXCIgJiYgIXZpbS5pbnNlcnRNb2RlICYmICF2aW0udmlzdWFsTW9kZSAmJiAhY20uYWNlLmluTXVsdGlTZWxlY3RNb2RlKSB7XG4gICAgICAgIHZhciBzZWFyY2hTdGF0ZSA9IGdldFNlYXJjaFN0YXRlKGNtKTtcbiAgICAgICAgdmFyIG92ZXJsYXkgPSBzZWFyY2hTdGF0ZS5nZXRPdmVybGF5KCk7XG4gICAgICAgIGlmIChvdmVybGF5KSBjbS5yZW1vdmVPdmVybGF5KG92ZXJsYXkpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaGFzaElkID09IC0xIHx8IGhhc2hJZCAmIDEgfHwgaGFzaElkID09PSAwICYmIGtleS5sZW5ndGggPiAxKSB7XG4gICAgICAgIHZhciBpbnNlcnRNb2RlID0gdmltLmluc2VydE1vZGU7XG4gICAgICAgIHZhciBuYW1lID0gbG9va3VwS2V5KGhhc2hJZCwga2V5LCBlIHx8IHt9LCB2aW0pO1xuICAgICAgICBpZiAodmltLnN0YXR1cyA9PSBudWxsKVxuICAgICAgICAgIHZpbS5zdGF0dXMgPSBcIlwiO1xuICAgICAgICB2YXIgaXNIYW5kbGVkID0gbXVsdGlTZWxlY3RIYW5kbGVLZXkoY20sIG5hbWUsICd1c2VyJyk7XG4gICAgICAgIHZpbSA9IGdldFZpbShjbSk7IC8vIG1heSBiZSBjaGFuZ2VkIGJ5IG11bHRpU2VsZWN0SGFuZGxlS2V5XG4gICAgICAgIGlmIChpc0hhbmRsZWQgJiYgdmltLnN0YXR1cyAhPSBudWxsKVxuICAgICAgICAgIHZpbS5zdGF0dXMgKz0gbmFtZTtcbiAgICAgICAgZWxzZSBpZiAodmltLnN0YXR1cyA9PSBudWxsKVxuICAgICAgICAgIHZpbS5zdGF0dXMgPSBcIlwiO1xuICAgICAgICBjbS5fc2lnbmFsKFwiY2hhbmdlU3RhdHVzXCIpO1xuICAgICAgICBpZiAoIWlzSGFuZGxlZCAmJiAoaGFzaElkICE9IC0xIHx8IGluc2VydE1vZGUpKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgcmV0dXJuIHtjb21tYW5kOiBcIm51bGxcIiwgcGFzc0V2ZW50OiAhaXNIYW5kbGVkfTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGF0dGFjaDogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICBpZiAoIWVkaXRvci5zdGF0ZSkgZWRpdG9yLnN0YXRlID0ge307XG4gICAgICB2YXIgY20gPSBuZXcgQ29kZU1pcnJvcihlZGl0b3IpO1xuICAgICAgZWRpdG9yLnN0YXRlLmNtID0gY207XG4gICAgICBlZGl0b3IuJHZpbU1vZGVIYW5kbGVyID0gdGhpcztcbiAgICAgIGVudGVyVmltTW9kZShjbSk7XG4gICAgICBnZXRWaW0oY20pLnN0YXR1cyA9IG51bGw7XG4gICAgICBjbS5vbigndmltLWNvbW1hbmQtZG9uZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoY20udmlydHVhbFNlbGVjdGlvbk1vZGUoKSkgcmV0dXJuO1xuICAgICAgICBnZXRWaW0oY20pLnN0YXR1cyA9IG51bGw7XG4gICAgICAgIGNtLmFjZS5fc2lnbmFsKFwiY2hhbmdlU3RhdHVzXCIpO1xuICAgICAgICBjbS5hY2Uuc2Vzc2lvbi5tYXJrVW5kb0dyb3VwKCk7XG4gICAgICB9KTtcbiAgICAgIGNtLm9uKFwiY2hhbmdlU3RhdHVzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBjbS5hY2UucmVuZGVyZXIudXBkYXRlQ3Vyc29yKCk7XG4gICAgICAgIGNtLmFjZS5fc2lnbmFsKFwiY2hhbmdlU3RhdHVzXCIpO1xuICAgICAgfSk7XG4gICAgICBjbS5vbihcInZpbS1tb2RlLWNoYW5nZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGNtLnZpcnR1YWxTZWxlY3Rpb25Nb2RlKCkpIHJldHVybjtcbiAgICAgICAgdXBkYXRlSW5wdXRNb2RlKCk7XG4gICAgICAgIGNtLl9zaWduYWwoXCJjaGFuZ2VTdGF0dXNcIik7XG4gICAgICB9KTtcbiAgICAgIGZ1bmN0aW9uIHVwZGF0ZUlucHV0TW9kZSgpIHtcbiAgICAgICAgdmFyIGlzSW50c2VydCA9IGdldFZpbShjbSkuaW5zZXJ0TW9kZTtcbiAgICAgICAgY20uYWNlLnJlbmRlcmVyLnNldFN0eWxlKFwibm9ybWFsLW1vZGVcIiwgIWlzSW50c2VydCk7XG4gICAgICAgIGVkaXRvci50ZXh0SW5wdXQuc2V0Q29tbWFuZE1vZGUoIWlzSW50c2VydCk7XG4gICAgICAgIC8vIHdpdGhvdXQgdGhpcyBwcmVzcyBhbmQgaG9kbCBwb3B1cCBpbiBtYWMgaXMgc2hvd24gaW4gbm9ybWFsIG1vZGVcbiAgICAgICAgZWRpdG9yLnJlbmRlcmVyLiRrZWVwVGV4dEFyZWFBdEN1cnNvciA9IGlzSW50c2VydDtcbiAgICAgICAgZWRpdG9yLnJlbmRlcmVyLiRibG9ja0N1cnNvciA9ICFpc0ludHNlcnQ7XG4gICAgICB9XG4gICAgICB1cGRhdGVJbnB1dE1vZGUoKTtcbiAgICAgIGVkaXRvci5yZW5kZXJlci4kY3Vyc29yTGF5ZXIuZHJhd0N1cnNvciA9IHRoaXMuZHJhd0N1cnNvci5iaW5kKGNtKTtcbiAgICB9LFxuICAgIGRldGFjaDogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICB2YXIgY20gPSBlZGl0b3Iuc3RhdGUuY207XG4gICAgICBsZWF2ZVZpbU1vZGUoY20pO1xuICAgICAgY20uZGVzdHJveSgpO1xuICAgICAgZWRpdG9yLnN0YXRlLmNtID0gbnVsbDtcbiAgICAgIGVkaXRvci4kdmltTW9kZUhhbmRsZXIgPSBudWxsO1xuICAgICAgZWRpdG9yLnJlbmRlcmVyLiRjdXJzb3JMYXllci5kcmF3Q3Vyc29yID0gbnVsbDtcbiAgICAgIGVkaXRvci5yZW5kZXJlci5zZXRTdHlsZShcIm5vcm1hbC1tb2RlXCIsIGZhbHNlKTtcbiAgICAgIGVkaXRvci50ZXh0SW5wdXQuc2V0Q29tbWFuZE1vZGUoZmFsc2UpO1xuICAgICAgZWRpdG9yLnJlbmRlcmVyLiRrZWVwVGV4dEFyZWFBdEN1cnNvciA9IHRydWU7XG4gICAgfSxcbiAgICBnZXRTdGF0dXNUZXh0OiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgIHZhciBjbSA9IGVkaXRvci5zdGF0ZS5jbTtcbiAgICAgIHZhciB2aW0gPSBnZXRWaW0oY20pO1xuICAgICAgaWYgKHZpbS5pbnNlcnRNb2RlKVxuICAgICAgICByZXR1cm4gXCJJTlNFUlRcIjtcbiAgICAgIHZhciBzdGF0dXMgPSBcIlwiO1xuICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgIHN0YXR1cyArPSBcIlZJU1VBTFwiO1xuICAgICAgICBpZiAodmltLnZpc3VhbExpbmUpXG4gICAgICAgICAgc3RhdHVzICs9IFwiIExJTkVcIjtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxCbG9jaylcbiAgICAgICAgICBzdGF0dXMgKz0gXCIgQkxPQ0tcIjtcbiAgICAgIH1cbiAgICAgIGlmICh2aW0uc3RhdHVzKVxuICAgICAgICBzdGF0dXMgKz0gKHN0YXR1cyA/IFwiIFwiIDogXCJcIikgKyB2aW0uc3RhdHVzO1xuICAgICAgcmV0dXJuIHN0YXR1cztcbiAgICB9XG4gIH07XG4gIHZpbUFwaS5kZWZpbmVPcHRpb24oe1xuICAgIG5hbWU6IFwid3JhcFwiLFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUsIGNtKSB7XG4gICAgICBpZiAoY20pIHtjbS5hY2Uuc2V0T3B0aW9uKFwid3JhcFwiLCB2YWx1ZSl9XG4gICAgfSxcbiAgICB0eXBlOiBcImJvb2xlYW5cIlxuICB9LCBmYWxzZSk7XG4gIHZpbUFwaS5kZWZpbmVFeCgnd3JpdGUnLCAndycsIGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCc6d3JpdGUgaXMgbm90IGltcGxlbWVudGVkJylcbiAgfSk7XG4gIGRlZmF1bHRLZXltYXAucHVzaChcbiAgICB7IGtleXM6ICd6YycsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdmb2xkJywgYWN0aW9uQXJnczogeyBvcGVuOiBmYWxzZSB9IH0sXG4gICAgeyBrZXlzOiAnekMnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZm9sZCcsIGFjdGlvbkFyZ3M6IHsgb3BlbjogZmFsc2UsIGFsbDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnem8nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZm9sZCcsIGFjdGlvbkFyZ3M6IHsgb3BlbjogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnek8nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZm9sZCcsIGFjdGlvbkFyZ3M6IHsgb3BlbjogdHJ1ZSwgYWxsOiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICd6YScsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdmb2xkJywgYWN0aW9uQXJnczogeyB0b2dnbGU6IHRydWUgfSB9LFxuICAgIHsga2V5czogJ3pBJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2ZvbGQnLCBhY3Rpb25BcmdzOiB7IHRvZ2dsZTogdHJ1ZSwgYWxsOiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICd6ZicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdmb2xkJywgYWN0aW9uQXJnczogeyBvcGVuOiB0cnVlLCBhbGw6IHRydWUgfSB9LFxuICAgIHsga2V5czogJ3pkJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2ZvbGQnLCBhY3Rpb25BcmdzOiB7IG9wZW46IHRydWUsIGFsbDogdHJ1ZSB9IH0sXG5cbiAgICB7IGtleXM6ICc8Qy1BLWs+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2FjZUNvbW1hbmQnLCBhY3Rpb25BcmdzOiB7IG5hbWU6IFwiYWRkQ3Vyc29yQWJvdmVcIiB9IH0sXG4gICAgeyBrZXlzOiAnPEMtQS1qPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdhY2VDb21tYW5kJywgYWN0aW9uQXJnczogeyBuYW1lOiBcImFkZEN1cnNvckJlbG93XCIgfSB9LFxuICAgIHsga2V5czogJzxDLUEtUy1rPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdhY2VDb21tYW5kJywgYWN0aW9uQXJnczogeyBuYW1lOiBcImFkZEN1cnNvckFib3ZlU2tpcEN1cnJlbnRcIiB9IH0sXG4gICAgeyBrZXlzOiAnPEMtQS1TLWo+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2FjZUNvbW1hbmQnLCBhY3Rpb25BcmdzOiB7IG5hbWU6IFwiYWRkQ3Vyc29yQmVsb3dTa2lwQ3VycmVudFwiIH0gfSxcbiAgICB7IGtleXM6ICc8Qy1BLWg+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2FjZUNvbW1hbmQnLCBhY3Rpb25BcmdzOiB7IG5hbWU6IFwic2VsZWN0TW9yZUJlZm9yZVwiIH0gfSxcbiAgICB7IGtleXM6ICc8Qy1BLWw+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2FjZUNvbW1hbmQnLCBhY3Rpb25BcmdzOiB7IG5hbWU6IFwic2VsZWN0TW9yZUFmdGVyXCIgfSB9LFxuICAgIHsga2V5czogJzxDLUEtUy1oPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdhY2VDb21tYW5kJywgYWN0aW9uQXJnczogeyBuYW1lOiBcInNlbGVjdE5leHRCZWZvcmVcIiB9IH0sXG4gICAgeyBrZXlzOiAnPEMtQS1TLWw+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2FjZUNvbW1hbmQnLCBhY3Rpb25BcmdzOiB7IG5hbWU6IFwic2VsZWN0TmV4dEFmdGVyXCIgfSB9XG4gICk7XG4gIFxuICBkZWZhdWx0S2V5bWFwLnB1c2goe1xuICAgIGtleXM6ICdncScsXG4gICAgdHlwZTogJ29wZXJhdG9yJyxcbiAgICBvcGVyYXRvcjogJ2hhcmRXcmFwJ1xuICB9KTtcbiAgdmltQXBpLmRlZmluZU9wZXJhdG9yKFwiaGFyZFdyYXBcIiwgZnVuY3Rpb24oY20sIG9wZXJhdG9yQXJncywgcmFuZ2VzLCBvbGRBbmNob3IsIG5ld0hlYWQpIHtcbiAgICB2YXIgYW5jaG9yID0gcmFuZ2VzWzBdLmFuY2hvci5saW5lO1xuICAgIHZhciBoZWFkID0gcmFuZ2VzWzBdLmhlYWQubGluZTtcbiAgICBpZiAob3BlcmF0b3JBcmdzLmxpbmV3aXNlKSBoZWFkLS07XG4gICAgaGFyZFdyYXAoY20uYWNlLCB7c3RhcnRSb3c6IGFuY2hvciwgZW5kUm93OiBoZWFkfSk7XG4gICAgcmV0dXJuIFBvcyhoZWFkLCAwKTtcbiAgfSk7XG4gIGRlZmluZU9wdGlvbigndGV4dHdpZHRoJywgdW5kZWZpbmVkLCAnbnVtYmVyJywgWyd0dyddLCBmdW5jdGlvbih3aWR0aCwgY20pIHtcbiAgICAvLyBPcHRpb24gaXMgbG9jYWwuIERvIG5vdGhpbmcgZm9yIGdsb2JhbC5cbiAgICBpZiAoY20gPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBUaGUgJ2ZpbGV0eXBlJyBvcHRpb24gcHJveGllcyB0byB0aGUgQ29kZU1pcnJvciAnbW9kZScgb3B0aW9uLlxuICAgIGlmICh3aWR0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgdmFsdWUgPSBjbS5hY2UuZ2V0T3B0aW9uKCdwcmludE1hcmdpbkNvbHVtbicpO1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgY29sdW1uID0gTWF0aC5yb3VuZCh3aWR0aCk7XG4gICAgICBpZiAoY29sdW1uID4gMSkge1xuICAgICAgICBjbS5hY2Uuc2V0T3B0aW9uKCdwcmludE1hcmdpbkNvbHVtbicsIGNvbHVtbik7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbiAgICBcbiAgYWN0aW9ucy5hY2VDb21tYW5kID0gZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgIGNtLnZpbUNtZCA9IGFjdGlvbkFyZ3M7XG4gICAgaWYgKGNtLmFjZS5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlKVxuICAgICAgY20uYWNlLm9uKFwiYmVmb3JlRW5kT3BlcmF0aW9uXCIsIGRlbGF5ZWRFeGVjQWNlQ29tbWFuZCk7XG4gICAgZWxzZVxuICAgICAgZGVsYXllZEV4ZWNBY2VDb21tYW5kKG51bGwsIGNtLmFjZSk7XG4gIH07XG4gIGZ1bmN0aW9uIGRlbGF5ZWRFeGVjQWNlQ29tbWFuZChvcCwgYWNlKSB7XG4gICAgYWNlLm9mZihcImJlZm9yZUVuZE9wZXJhdGlvblwiLCBkZWxheWVkRXhlY0FjZUNvbW1hbmQpO1xuICAgIHZhciBjbWQgPSBhY2Uuc3RhdGUuY20udmltQ21kO1xuICAgIGlmIChjbWQpIHtcbiAgICAgIGFjZS5leGVjQ29tbWFuZChjbWQuZXhlYyA/IGNtZCA6IGNtZC5uYW1lLCBjbWQuYXJncyk7XG4gICAgfVxuICAgIGFjZS5jdXJPcCA9IGFjZS5wcmV2T3A7XG4gIH1cbiAgYWN0aW9ucy5mb2xkID0gZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgIGNtLmFjZS5leGVjQ29tbWFuZChbJ3RvZ2dsZUZvbGRXaWRnZXQnLCAndG9nZ2xlRm9sZFdpZGdldCcsICdmb2xkT3RoZXInLCAndW5mb2xkYWxsJ1xuICAgICAgXVsoYWN0aW9uQXJncy5hbGwgPyAyIDogMCkgKyAoYWN0aW9uQXJncy5vcGVuID8gMSA6IDApXSk7XG4gIH07XG5cbiAgZGVmYXVsdEtleW1hcExlbmd0aCA9IGRlZmF1bHRLZXltYXAubGVuZ3RoOyAvLyBhY2VfcGF0Y2hcblxuICBleHBvcnRzLmhhbmRsZXIuZGVmYXVsdEtleW1hcCA9IGRlZmF1bHRLZXltYXA7XG4gIGV4cG9ydHMuaGFuZGxlci5hY3Rpb25zID0gYWN0aW9ucztcbiAgZXhwb3J0cy5WaW0gPSB2aW1BcGk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=