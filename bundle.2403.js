"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2403,2165],{

/***/ 52165:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(59082)/* .Range */ .e);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLDRCQUE0QixpQkFBaUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsWUFBWTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx3QkFBd0IsWUFBWTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBRUE7QUFDQSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0NBQXNDO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQSxrREFBa0QsZUFBZTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3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Y29kZS9zcmMvZXh0L2hhcmR3cmFwLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2tleWJvYXJkL3ZpbS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG5mdW5jdGlvbiBoYXJkV3JhcChlZGl0b3IsIG9wdGlvbnMpIHtcbiAgICB2YXIgbWF4ID0gb3B0aW9ucy5jb2x1bW4gfHwgZWRpdG9yLmdldE9wdGlvbihcInByaW50TWFyZ2luQ29sdW1uXCIpO1xuICAgIHZhciBhbGxvd01lcmdlID0gb3B0aW9ucy5hbGxvd01lcmdlICE9IGZhbHNlO1xuICAgICAgIFxuICAgIHZhciByb3cgPSBNYXRoLm1pbihvcHRpb25zLnN0YXJ0Um93LCBvcHRpb25zLmVuZFJvdyk7XG4gICAgdmFyIGVuZFJvdyA9IE1hdGgubWF4KG9wdGlvbnMuc3RhcnRSb3csIG9wdGlvbnMuZW5kUm93KTtcbiAgICBcbiAgICB2YXIgc2Vzc2lvbiA9IGVkaXRvci5zZXNzaW9uO1xuICAgIFxuICAgIHdoaWxlIChyb3cgPD0gZW5kUm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIGlmIChsaW5lLmxlbmd0aCA+IG1heCkge1xuICAgICAgICAgICAgdmFyIHNwYWNlID0gZmluZFNwYWNlKGxpbmUsIG1heCwgNSk7XG4gICAgICAgICAgICBpZiAoc3BhY2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW5kZW50YXRpb24gPSAvXlxccyovLmV4ZWMobGluZSlbMF07XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5yZXBsYWNlKG5ldyBSYW5nZShyb3csc3BhY2Uuc3RhcnQscm93LHNwYWNlLmVuZCksIFwiXFxuXCIgKyBpbmRlbnRhdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3crKztcbiAgICAgICAgfSBlbHNlIGlmIChhbGxvd01lcmdlICYmIC9cXFMvLnRlc3QobGluZSkgJiYgcm93ICE9IGVuZFJvdykge1xuICAgICAgICAgICAgdmFyIG5leHRMaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyArIDEpO1xuICAgICAgICAgICAgaWYgKG5leHRMaW5lICYmIC9cXFMvLnRlc3QobmV4dExpbmUpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyaW1tZWRMaW5lID0gbGluZS5yZXBsYWNlKC9cXHMrJC8sIFwiXCIpO1xuICAgICAgICAgICAgICAgIHZhciB0cmltbWVkTmV4dExpbmUgPSBuZXh0TGluZS5yZXBsYWNlKC9eXFxzKy8sIFwiXCIpO1xuICAgICAgICAgICAgICAgIHZhciBtZXJnZWRMaW5lID0gdHJpbW1lZExpbmUgKyBcIiBcIiArIHRyaW1tZWROZXh0TGluZTtcblxuICAgICAgICAgICAgICAgIHZhciBzcGFjZSA9IGZpbmRTcGFjZShtZXJnZWRMaW5lLCBtYXgsIDUpO1xuICAgICAgICAgICAgICAgIGlmIChzcGFjZSAmJiBzcGFjZS5zdGFydCA+IHRyaW1tZWRMaW5lLmxlbmd0aCB8fCBtZXJnZWRMaW5lLmxlbmd0aCA8IG1heCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZVJhbmdlID0gbmV3IFJhbmdlKHJvdyx0cmltbWVkTGluZS5sZW5ndGgscm93ICsgMSxuZXh0TGluZS5sZW5ndGggLSB0cmltbWVkTmV4dExpbmUubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgc2Vzc2lvbi5yZXBsYWNlKHJlcGxhY2VSYW5nZSwgXCIgXCIpO1xuICAgICAgICAgICAgICAgICAgICByb3ctLTtcbiAgICAgICAgICAgICAgICAgICAgZW5kUm93LS07XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0cmltbWVkTGluZS5sZW5ndGggPCBsaW5lLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBzZXNzaW9uLnJlbW92ZShuZXcgUmFuZ2Uocm93LCB0cmltbWVkTGluZS5sZW5ndGgsIHJvdywgbGluZS5sZW5ndGgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcm93Kys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluZFNwYWNlKGxpbmUsIG1heCwgbWluKSB7XG4gICAgICAgIGlmIChsaW5lLmxlbmd0aCA8IG1heClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIGJlZm9yZSA9IGxpbmUuc2xpY2UoMCwgbWF4KTtcbiAgICAgICAgdmFyIGFmdGVyID0gbGluZS5zbGljZShtYXgpO1xuICAgICAgICB2YXIgc3BhY2VBZnRlciA9IC9eKD86KFxccyspfChcXFMrKShcXHMrKSkvLmV4ZWMoYWZ0ZXIpO1xuICAgICAgICB2YXIgc3BhY2VCZWZvcmUgPSAvKD86KFxccyspfChcXHMrKShcXFMrKSkkLy5leGVjKGJlZm9yZSk7XG4gICAgICAgIHZhciBzdGFydCA9IDA7XG4gICAgICAgIHZhciBlbmQgPSAwO1xuICAgICAgICBpZiAoc3BhY2VCZWZvcmUgJiYgIXNwYWNlQmVmb3JlWzJdKSB7XG4gICAgICAgICAgICBzdGFydCA9IG1heCAtIHNwYWNlQmVmb3JlWzFdLmxlbmd0aDtcbiAgICAgICAgICAgIGVuZCA9IG1heDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3BhY2VBZnRlciAmJiAhc3BhY2VBZnRlclsyXSkge1xuICAgICAgICAgICAgaWYgKCFzdGFydClcbiAgICAgICAgICAgICAgICBzdGFydCA9IG1heDtcbiAgICAgICAgICAgIGVuZCA9IG1heCArIHNwYWNlQWZ0ZXJbMV0ubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICAgICAgZW5kOiBlbmRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNwYWNlQmVmb3JlICYmIHNwYWNlQmVmb3JlWzJdICYmIHNwYWNlQmVmb3JlLmluZGV4ID4gbWluKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHN0YXJ0OiBzcGFjZUJlZm9yZS5pbmRleCxcbiAgICAgICAgICAgICAgICBlbmQ6IHNwYWNlQmVmb3JlLmluZGV4ICsgc3BhY2VCZWZvcmVbMl0ubGVuZ3RoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChzcGFjZUFmdGVyICYmIHNwYWNlQWZ0ZXJbMl0pIHtcbiAgICAgICAgICAgIHN0YXJ0ID0gIG1heCArIHNwYWNlQWZ0ZXJbMl0ubGVuZ3RoO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBzdGFydDogc3RhcnQsXG4gICAgICAgICAgICAgICAgZW5kOiBzdGFydCArIHNwYWNlQWZ0ZXJbM10ubGVuZ3RoXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmZ1bmN0aW9uIHdyYXBBZnRlcklucHV0KGUpIHtcbiAgICBpZiAoZS5jb21tYW5kLm5hbWUgPT0gXCJpbnNlcnRzdHJpbmdcIiAmJiAvXFxTLy50ZXN0KGUuYXJncykpIHtcbiAgICAgICAgdmFyIGVkaXRvciA9IGUuZWRpdG9yO1xuICAgICAgICB2YXIgY3Vyc29yID0gZWRpdG9yLnNlbGVjdGlvbi5jdXJzb3I7XG4gICAgICAgIGlmIChjdXJzb3IuY29sdW1uIDw9IGVkaXRvci5yZW5kZXJlci4kcHJpbnRNYXJnaW5Db2x1bW4pIHJldHVybjtcbiAgICAgICAgdmFyIGxhc3REZWx0YSA9IGVkaXRvci5zZXNzaW9uLiR1bmRvTWFuYWdlci4kbGFzdERlbHRhO1xuXG4gICAgICAgIGhhcmRXcmFwKGVkaXRvciwge1xuICAgICAgICAgICAgc3RhcnRSb3c6IGN1cnNvci5yb3csIGVuZFJvdzogY3Vyc29yLnJvdyxcbiAgICAgICAgICAgIGFsbG93TWVyZ2U6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobGFzdERlbHRhICE9IGVkaXRvci5zZXNzaW9uLiR1bmRvTWFuYWdlci4kbGFzdERlbHRhKSBcbiAgICAgICAgICAgIGVkaXRvci5zZXNzaW9uLm1hcmtVbmRvR3JvdXAoKTtcbiAgICB9XG59XG5cbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi4vZWRpdG9yXCIpLkVkaXRvcjtcbnJlcXVpcmUoXCIuLi9jb25maWdcIikuZGVmaW5lT3B0aW9ucyhFZGl0b3IucHJvdG90eXBlLCBcImVkaXRvclwiLCB7XG4gICAgaGFyZFdyYXA6IHtcbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLm9uKFwiYWZ0ZXJFeGVjXCIsIHdyYXBBZnRlcklucHV0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kcy5vZmYoXCJhZnRlckV4ZWNcIiwgd3JhcEFmdGVySW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICB9XG59KTtcblxuZXhwb3J0cy5oYXJkV3JhcCA9IGhhcmRXcmFwO1xuIiwiLy8gQ29kZU1pcnJvciwgY29weXJpZ2h0IChjKSBieSBNYXJpam4gSGF2ZXJiZWtlIGFuZCBvdGhlcnNcbi8vIERpc3RyaWJ1dGVkIHVuZGVyIGFuIE1JVCBsaWNlbnNlOiBodHRwczovL2NvZGVtaXJyb3IubmV0LzUvTElDRU5TRVxuXG4vKipcbiAqIFN1cHBvcnRlZCBrZXliaW5kaW5nczpcbiAqICAgVG9vIG1hbnkgdG8gbGlzdC4gUmVmZXIgdG8gZGVmYXVsdEtleW1hcCBiZWxvdy5cbiAqXG4gKiBTdXBwb3J0ZWQgRXggY29tbWFuZHM6XG4gKiAgIFJlZmVyIHRvIGRlZmF1bHRFeENvbW1hbmRNYXAgYmVsb3cuXG4gKlxuICogUmVnaXN0ZXJzOiB1bm5hbWVkLCAtLCAuLCA6LCAvLCBfLCBhLXosIEEtWiwgMC05XG4gKiAgIChEb2VzIG5vdCByZXNwZWN0IHRoZSBzcGVjaWFsIGNhc2UgZm9yIG51bWJlciByZWdpc3RlcnMgd2hlbiBkZWxldGVcbiAqICAgIG9wZXJhdG9yIGlzIG1hZGUgd2l0aCB0aGVzZSBjb21tYW5kczogJSwgKCwgKSwgICwgLywgPywgbiwgTiwgeywgfSApXG4gKiAgIFRPRE86IEltcGxlbWVudCB0aGUgcmVtYWluaW5nIHJlZ2lzdGVycy5cbiAqXG4gKiBNYXJrczogYS16LCBBLVosIGFuZCAwLTlcbiAqICAgVE9ETzogSW1wbGVtZW50IHRoZSByZW1haW5pbmcgc3BlY2lhbCBtYXJrcy4gVGhleSBoYXZlIG1vcmUgY29tcGxleFxuICogICAgICAgYmVoYXZpb3IuXG4gKlxuICogRXZlbnRzOlxuICogICd2aW0tbW9kZS1jaGFuZ2UnIC0gcmFpc2VkIG9uIHRoZSBlZGl0b3IgYW55dGltZSB0aGUgY3VycmVudCBtb2RlIGNoYW5nZXMsXG4gKiAgICAgICAgICAgICAgICAgICAgICBFdmVudCBvYmplY3Q6IHttb2RlOiBcInZpc3VhbFwiLCBzdWJNb2RlOiBcImxpbmV3aXNlXCJ9XG4gKlxuICogQ29kZSBzdHJ1Y3R1cmU6XG4gKiAgMS4gRGVmYXVsdCBrZXltYXBcbiAqICAyLiBWYXJpYWJsZSBkZWNsYXJhdGlvbnMgYW5kIHNob3J0IGJhc2ljIGhlbHBlcnNcbiAqICAzLiBJbnN0YW5jZSAoRXh0ZXJuYWwgQVBJKSBpbXBsZW1lbnRhdGlvblxuICogIDQuIEludGVybmFsIHN0YXRlIHRyYWNraW5nIG9iamVjdHMgKGlucHV0IHN0YXRlLCBjb3VudGVyKSBpbXBsZW1lbnRhdGlvblxuICogICAgIGFuZCBpbnN0YW50aWF0aW9uXG4gKiAgNS4gS2V5IGhhbmRsZXIgKHRoZSBtYWluIGNvbW1hbmQgZGlzcGF0Y2hlcikgaW1wbGVtZW50YXRpb25cbiAqICA2LiBNb3Rpb24sIG9wZXJhdG9yLCBhbmQgYWN0aW9uIGltcGxlbWVudGF0aW9uc1xuICogIDcuIEhlbHBlciBmdW5jdGlvbnMgZm9yIHRoZSBrZXkgaGFuZGxlciwgbW90aW9ucywgb3BlcmF0b3JzLCBhbmQgYWN0aW9uc1xuICogIDguIFNldCB1cCBWaW0gdG8gd29yayBhcyBhIGtleW1hcCBmb3IgQ29kZU1pcnJvci5cbiAqICA5LiBFeCBjb21tYW5kIGltcGxlbWVudGF0aW9ucy5cbiAqL1xuXG4gICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBsb2coKSB7XG4gICAgdmFyIGQgPSBcIlwiO1xuICAgIGZ1bmN0aW9uIGZvcm1hdChwKSB7XG4gICAgICBpZiAodHlwZW9mIHAgIT0gXCJvYmplY3RcIilcbiAgICAgICAgcmV0dXJuIHAgKyBcIlwiO1xuICAgICAgaWYgKFwibGluZVwiIGluIHApIHtcbiAgICAgICAgcmV0dXJuIHAubGluZSArIFwiOlwiICsgcC5jaDtcbiAgICAgIH1cbiAgICAgIGlmIChcImFuY2hvclwiIGluIHApIHtcbiAgICAgICAgcmV0dXJuIGZvcm1hdChwLmFuY2hvcikgKyBcIi0+XCIgKyBmb3JtYXQocC5oZWFkKTtcbiAgICAgIH1cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHApKVxuICAgICAgICByZXR1cm4gXCJbXCIgKyBwLm1hcChmdW5jdGlvbih4KSB7XG4gICAgICAgICAgcmV0dXJuIGZvcm1hdCh4KTtcbiAgICAgICAgfSkgKyBcIl1cIjtcbiAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShwKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBwID0gYXJndW1lbnRzW2ldO1xuICAgICAgdmFyIGYgPSBmb3JtYXQocCk7XG4gICAgICBkICs9IGYgKyBcIiAgXCI7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKGQpO1xuICB9XG4gIHZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcbiAgdmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoXCIuLi9saWIvZXZlbnRfZW1pdHRlclwiKS5FdmVudEVtaXR0ZXI7XG4gIHZhciBkb21MaWIgPSByZXF1aXJlKFwiLi4vbGliL2RvbVwiKTtcbiAgdmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xuICB2YXIgS0VZUyA9IHJlcXVpcmUoXCIuLi9saWIva2V5c1wiKTtcbiAgdmFyIGV2ZW50ID0gcmVxdWlyZShcIi4uL2xpYi9ldmVudFwiKTtcbiAgdmFyIFNlYXJjaCA9IHJlcXVpcmUoXCIuLi9zZWFyY2hcIikuU2VhcmNoO1xuICB2YXIgdXNlcmFnZW50ID0gcmVxdWlyZShcIi4uL2xpYi91c2VyYWdlbnRcIik7XG4gIHZhciBTZWFyY2hIaWdobGlnaHQgPSByZXF1aXJlKFwiLi4vc2VhcmNoX2hpZ2hsaWdodFwiKS5TZWFyY2hIaWdobGlnaHQ7XG4gIHZhciBtdWx0aVNlbGVjdENvbW1hbmRzID0gcmVxdWlyZShcIi4uL2NvbW1hbmRzL211bHRpX3NlbGVjdF9jb21tYW5kc1wiKTtcbiAgdmFyIFRleHRNb2RlVG9rZW5SZSA9IHJlcXVpcmUoXCIuLi9tb2RlL3RleHRcIikuTW9kZS5wcm90b3R5cGUudG9rZW5SZTtcbiAgdmFyIGhhcmRXcmFwID0gcmVxdWlyZShcIi4uL2V4dC9oYXJkd3JhcFwiKS5oYXJkV3JhcDtcbiAgcmVxdWlyZShcIi4uL211bHRpX3NlbGVjdFwiKTtcblxuICB2YXIgQ29kZU1pcnJvciA9IGZ1bmN0aW9uKGFjZSkge1xuICAgIHRoaXMuYWNlID0gYWNlO1xuICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgICB0aGlzLm1hcmtzID0ge307XG4gICAgdGhpcy5vcHRpb25zID0ge307XG4gICAgdGhpcy4kdWlkID0gMDtcbiAgICB0aGlzLm9uQ2hhbmdlID0gdGhpcy5vbkNoYW5nZS5iaW5kKHRoaXMpO1xuICAgIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UgPSB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlLmJpbmQodGhpcyk7XG4gICAgdGhpcy5vbkJlZm9yZUVuZE9wZXJhdGlvbiA9IHRoaXMub25CZWZvcmVFbmRPcGVyYXRpb24uYmluZCh0aGlzKTtcbiAgICB0aGlzLmFjZS5vbignY2hhbmdlJywgdGhpcy5vbkNoYW5nZSk7XG4gICAgdGhpcy5hY2Uub24oJ2NoYW5nZVNlbGVjdGlvbicsIHRoaXMub25TZWxlY3Rpb25DaGFuZ2UpO1xuICAgIHRoaXMuYWNlLm9uKCdiZWZvcmVFbmRPcGVyYXRpb24nLCB0aGlzLm9uQmVmb3JlRW5kT3BlcmF0aW9uKTtcbiAgfTtcbiAgQ29kZU1pcnJvci5Qb3MgPSBmdW5jdGlvbihsaW5lLCBjaCkge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBQb3MpKSByZXR1cm4gbmV3IFBvcyhsaW5lLCBjaCk7XG4gICAgdGhpcy5saW5lID0gbGluZTsgdGhpcy5jaCA9IGNoO1xuICB9O1xuICBDb2RlTWlycm9yLmRlZmluZU9wdGlvbiA9IGZ1bmN0aW9uKG5hbWUsIHZhbCwgc2V0dGVyKSB7fTtcbiAgQ29kZU1pcnJvci5jb21tYW5kcyA9IHtcbiAgICByZWRvOiBmdW5jdGlvbihjbSkgeyBjbS5hY2UucmVkbygpOyB9LFxuICAgIHVuZG86IGZ1bmN0aW9uKGNtKSB7IGNtLmFjZS51bmRvKCk7IH0sXG4gICAgbmV3bGluZUFuZEluZGVudDogZnVuY3Rpb24oY20pIHsgY20uYWNlLmluc2VydChcIlxcblwiKTsgfSxcbiAgICBnb0xpbmVMZWZ0OiBmdW5jdGlvbihjbSkgeyBjbS5hY2Uuc2VsZWN0aW9uLm1vdmVDdXJzb3JMaW5lU3RhcnQoKTsgfSxcbiAgICBnb0xpbmVSaWdodDogZnVuY3Rpb24oY20pIHsgY20uYWNlLnNlbGVjdGlvbi5tb3ZlQ3Vyc29yTGluZUVuZCgpOyB9XG4gIH07XG4gIENvZGVNaXJyb3Iua2V5TWFwID0ge307XG4gIENvZGVNaXJyb3IuYWRkQ2xhc3MgPSBDb2RlTWlycm9yLnJtQ2xhc3MgPSBmdW5jdGlvbigpIHt9O1xuICBDb2RlTWlycm9yLmVfc3RvcCA9IENvZGVNaXJyb3IuZV9wcmV2ZW50RGVmYXVsdCA9IGV2ZW50LnN0b3BFdmVudDtcbiAgQ29kZU1pcnJvci5rZXlOYW1lID0gZnVuY3Rpb24oZSkge1xuICAgIHZhciBrZXkgPSAoS0VZU1tlLmtleUNvZGVdIHx8IGUua2V5IHx8IFwiXCIpO1xuICAgIGlmIChrZXkubGVuZ3RoID09IDEpIGtleSA9IGtleS50b1VwcGVyQ2FzZSgpO1xuICAgIGtleSA9IGV2ZW50LmdldE1vZGlmaWVyU3RyaW5nKGUpLnJlcGxhY2UoLyhefC0pXFx3L2csIGZ1bmN0aW9uKG0pIHtcbiAgICAgIHJldHVybiBtLnRvVXBwZXJDYXNlKCk7XG4gICAgfSkgKyBrZXk7XG4gICAgcmV0dXJuIGtleTtcbiAgfTtcbiAgQ29kZU1pcnJvci5rZXlNYXBbJ2RlZmF1bHQnXSA9IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBmdW5jdGlvbihjbSkge1xuICAgICAgdmFyIGNtZCA9IGNtLmFjZS5jb21tYW5kcy5jb21tYW5kS2V5QmluZGluZ1trZXkudG9Mb3dlckNhc2UoKV07XG4gICAgICByZXR1cm4gY21kICYmIGNtLmFjZS5leGVjQ29tbWFuZChjbWQpICE9PSBmYWxzZTtcbiAgICB9O1xuICB9O1xuICBDb2RlTWlycm9yLmxvb2t1cEtleSA9IGZ1bmN0aW9uIGxvb2t1cEtleShrZXksIG1hcCwgaGFuZGxlKSB7XG4gICAgaWYgKCFtYXApIG1hcCA9IFwiZGVmYXVsdFwiO1xuICAgIGlmICh0eXBlb2YgbWFwID09IFwic3RyaW5nXCIpXG4gICAgICBtYXAgPSBDb2RlTWlycm9yLmtleU1hcFttYXBdO1xuICAgIHZhciBmb3VuZCA9IHR5cGVvZiBtYXAgPT0gXCJmdW5jdGlvblwiID8gbWFwKGtleSkgOiBtYXBba2V5XTtcbiAgICBpZiAoZm91bmQgPT09IGZhbHNlKSByZXR1cm4gXCJub3RoaW5nXCI7XG4gICAgaWYgKGZvdW5kID09PSBcIi4uLlwiKSByZXR1cm4gXCJtdWx0aVwiO1xuICAgIGlmIChmb3VuZCAhPSBudWxsICYmIGhhbmRsZShmb3VuZCkpIHJldHVybiBcImhhbmRsZWRcIjtcblxuICAgIGlmIChtYXAuZmFsbHRocm91Z2gpIHtcbiAgICAgIGlmICghQXJyYXkuaXNBcnJheShtYXAuZmFsbHRocm91Z2gpKVxuICAgICAgICByZXR1cm4gbG9va3VwS2V5KGtleSwgbWFwLmZhbGx0aHJvdWdoLCBoYW5kbGUpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXAuZmFsbHRocm91Z2gubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGxvb2t1cEtleShrZXksIG1hcC5mYWxsdGhyb3VnaFtpXSwgaGFuZGxlKTtcbiAgICAgICAgaWYgKHJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cblxuICBDb2RlTWlycm9yLmZpbmRNYXRjaGluZ1RhZyA9IGZ1bmN0aW9uIChjbSwgaGVhZCkge1xuICAgIHJldHVybiBjbS5maW5kTWF0Y2hpbmdUYWcoaGVhZCk7XG4gIH1cblxuICBDb2RlTWlycm9yLmZpbmRFbmNsb3NpbmdUYWcgPSBmdW5jdGlvbiAoY20sIGhlYWQpIHtcblxuICB9O1xuXG4gIENvZGVNaXJyb3Iuc2lnbmFsID0gZnVuY3Rpb24obywgbmFtZSwgZSkgeyByZXR1cm4gby5fc2lnbmFsKG5hbWUsIGUpIH07XG4gIENvZGVNaXJyb3Iub24gPSBldmVudC5hZGRMaXN0ZW5lcjtcbiAgQ29kZU1pcnJvci5vZmYgPSBldmVudC5yZW1vdmVMaXN0ZW5lcjtcbiAgQ29kZU1pcnJvci5pc1dvcmRDaGFyID0gZnVuY3Rpb24oY2gpIHtcbiAgICBpZiAoY2ggPCBcIlxceDdmXCIpIHJldHVybiAvXlxcdyQvLnRlc3QoY2gpO1xuICAgIFRleHRNb2RlVG9rZW5SZS5sYXN0SW5kZXggPSAwO1xuICAgIHJldHVybiBUZXh0TW9kZVRva2VuUmUudGVzdChjaCk7XG4gIH07XG5cbihmdW5jdGlvbigpIHtcbiAgb29wLmltcGxlbWVudChDb2RlTWlycm9yLnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyKTtcblxuICB0aGlzLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmFjZS5vZmYoJ2NoYW5nZScsIHRoaXMub25DaGFuZ2UpO1xuICAgIHRoaXMuYWNlLm9mZignY2hhbmdlU2VsZWN0aW9uJywgdGhpcy5vblNlbGVjdGlvbkNoYW5nZSk7XG4gICAgdGhpcy5hY2Uub2ZmKCdiZWZvcmVFbmRPcGVyYXRpb24nLCB0aGlzLm9uQmVmb3JlRW5kT3BlcmF0aW9uKTtcbiAgICB0aGlzLnJlbW92ZU92ZXJsYXkoKTtcbiAgfTtcbiAgdGhpcy52aXJ0dWFsU2VsZWN0aW9uTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmFjZS5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlICYmIHRoaXMuYWNlLnNlbGVjdGlvbi5pbmRleDtcbiAgfTtcbiAgdGhpcy5vbkNoYW5nZSA9IGZ1bmN0aW9uKGRlbHRhKSB7XG4gICAgdmFyIGNoYW5nZSA9IHsgdGV4dDogZGVsdGEuYWN0aW9uWzBdID09ICdpJyA/IGRlbHRhLmxpbmVzIDogW10gfTtcbiAgICB2YXIgY3VyT3AgPSB0aGlzLmN1ck9wID0gdGhpcy5jdXJPcCB8fCB7fTtcbiAgICBpZiAoIWN1ck9wLmNoYW5nZUhhbmRsZXJzKVxuICAgICAgY3VyT3AuY2hhbmdlSGFuZGxlcnMgPSB0aGlzLl9ldmVudFJlZ2lzdHJ5W1wiY2hhbmdlXCJdICYmIHRoaXMuX2V2ZW50UmVnaXN0cnlbXCJjaGFuZ2VcIl0uc2xpY2UoKTtcbiAgICBpZiAoIWN1ck9wLmxhc3RDaGFuZ2UpIHtcbiAgICAgIGN1ck9wLmxhc3RDaGFuZ2UgPSBjdXJPcC5jaGFuZ2UgPSBjaGFuZ2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1ck9wLmxhc3RDaGFuZ2UubmV4dCA9IGN1ck9wLmxhc3RDaGFuZ2UgPSBjaGFuZ2U7XG4gICAgfVxuICAgIHRoaXMuJHVwZGF0ZU1hcmtlcnMoZGVsdGEpO1xuICB9O1xuICB0aGlzLm9uU2VsZWN0aW9uQ2hhbmdlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGN1ck9wID0gdGhpcy5jdXJPcCA9IHRoaXMuY3VyT3AgfHwge307XG4gICAgaWYgKCFjdXJPcC5jdXJzb3JBY3Rpdml0eUhhbmRsZXJzKVxuICAgICAgY3VyT3AuY3Vyc29yQWN0aXZpdHlIYW5kbGVycyA9IHRoaXMuX2V2ZW50UmVnaXN0cnlbXCJjdXJzb3JBY3Rpdml0eVwiXSAmJiB0aGlzLl9ldmVudFJlZ2lzdHJ5W1wiY3Vyc29yQWN0aXZpdHlcIl0uc2xpY2UoKTtcbiAgICB0aGlzLmN1ck9wLmN1cnNvckFjdGl2aXR5ID0gdHJ1ZTtcbiAgICBpZiAodGhpcy5hY2UuaW5NdWx0aVNlbGVjdE1vZGUpIHtcbiAgICAgIHRoaXMuYWNlLmtleUJpbmRpbmcucmVtb3ZlS2V5Ym9hcmRIYW5kbGVyKG11bHRpU2VsZWN0Q29tbWFuZHMua2V5Ym9hcmRIYW5kbGVyKTtcbiAgICB9XG4gIH07XG4gIHRoaXMub3BlcmF0aW9uID0gZnVuY3Rpb24oZm4sIGZvcmNlKSB7XG4gICAgaWYgKCFmb3JjZSAmJiB0aGlzLmN1ck9wIHx8IGZvcmNlICYmIHRoaXMuY3VyT3AgJiYgdGhpcy5jdXJPcC5mb3JjZSkge1xuICAgICAgcmV0dXJuIGZuKCk7XG4gICAgfVxuICAgIGlmIChmb3JjZSB8fCAhdGhpcy5hY2UuY3VyT3ApIHtcbiAgICAgIGlmICh0aGlzLmN1ck9wKVxuICAgICAgICB0aGlzLm9uQmVmb3JlRW5kT3BlcmF0aW9uKCk7XG4gICAgfVxuICAgIGlmICghdGhpcy5hY2UuY3VyT3ApIHtcbiAgICAgIHZhciBwcmV2T3AgPSB0aGlzLmFjZS5wcmV2T3A7XG4gICAgICB0aGlzLmFjZS5zdGFydE9wZXJhdGlvbih7XG4gICAgICAgIGNvbW1hbmQ6IHsgbmFtZTogXCJ2aW1cIiwgIHNjcm9sbEludG9WaWV3OiBcImN1cnNvclwiIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICB2YXIgY3VyT3AgPSB0aGlzLmN1ck9wID0gdGhpcy5jdXJPcCB8fCB7fTtcbiAgICB0aGlzLmN1ck9wLmZvcmNlID0gZm9yY2U7XG4gICAgdmFyIHJlc3VsdCA9IGZuKCk7XG4gICAgaWYgKHRoaXMuYWNlLmN1ck9wICYmIHRoaXMuYWNlLmN1ck9wLmNvbW1hbmQubmFtZSA9PSBcInZpbVwiKSB7XG4gICAgICBpZiAodGhpcy5zdGF0ZS5kaWFsb2cpXG4gICAgICAgIHRoaXMuYWNlLmN1ck9wLmNvbW1hbmQuc2Nyb2xsSW50b1ZpZXcgPSB0aGlzLmFjZS5jdXJPcC52aW1EaWFsb2dTY3JvbGw7XG4gICAgICB0aGlzLmFjZS5lbmRPcGVyYXRpb24oKTtcbiAgICAgIGlmICghY3VyT3AuY3Vyc29yQWN0aXZpdHkgJiYgIWN1ck9wLmxhc3RDaGFuZ2UgJiYgcHJldk9wKVxuICAgICAgICB0aGlzLmFjZS5wcmV2T3AgPSBwcmV2T3A7XG4gICAgfVxuICAgIGlmIChmb3JjZSB8fCAhdGhpcy5hY2UuY3VyT3ApIHtcbiAgICAgIGlmICh0aGlzLmN1ck9wKVxuICAgICAgICB0aGlzLm9uQmVmb3JlRW5kT3BlcmF0aW9uKCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG4gIHRoaXMub25CZWZvcmVFbmRPcGVyYXRpb24gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgb3AgPSB0aGlzLmN1ck9wO1xuICAgIGlmIChvcCkge1xuICAgICAgaWYgKG9wLmNoYW5nZSkgeyB0aGlzLnNpZ25hbChcImNoYW5nZVwiLCBvcC5jaGFuZ2UsIG9wKTsgfVxuICAgICAgaWYgKG9wICYmIG9wLmN1cnNvckFjdGl2aXR5KSB7IHRoaXMuc2lnbmFsKFwiY3Vyc29yQWN0aXZpdHlcIiwgbnVsbCwgb3ApOyB9XG4gICAgICB0aGlzLmN1ck9wID0gbnVsbDtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5zaWduYWwgPSBmdW5jdGlvbihldmVudE5hbWUsIGUsIGhhbmRsZXJzKSB7XG4gICAgdmFyIGxpc3RlbmVycyA9IGhhbmRsZXJzID8gaGFuZGxlcnNbZXZlbnROYW1lICsgXCJIYW5kbGVyc1wiXVxuICAgICAgICA6ICh0aGlzLl9ldmVudFJlZ2lzdHJ5IHx8IHt9KVtldmVudE5hbWVdO1xuICAgIGlmICghbGlzdGVuZXJzKVxuICAgICAgICByZXR1cm47XG4gICAgbGlzdGVuZXJzID0gbGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgZm9yICh2YXIgaT0wOyBpPGxpc3RlbmVycy5sZW5ndGg7IGkrKylcbiAgICAgICAgbGlzdGVuZXJzW2ldKHRoaXMsIGUpO1xuICB9O1xuICB0aGlzLmZpcnN0TGluZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiAgdGhpcy5sYXN0TGluZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gdGhpcy5hY2Uuc2Vzc2lvbi5nZXRMZW5ndGgoKSAtIDE7IH07XG4gIHRoaXMubGluZUNvdW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLmFjZS5zZXNzaW9uLmdldExlbmd0aCgpOyB9O1xuICB0aGlzLnNldEN1cnNvciA9IGZ1bmN0aW9uKGxpbmUsIGNoKSB7XG4gICAgaWYgKHR5cGVvZiBsaW5lID09PSAnb2JqZWN0Jykge1xuICAgICAgY2ggPSBsaW5lLmNoO1xuICAgICAgbGluZSA9IGxpbmUubGluZTtcbiAgICB9XG4gICAgdmFyIHNob3VsZFNjcm9sbCA9ICF0aGlzLmN1ck9wICYmICF0aGlzLmFjZS5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlO1xuICAgIGlmICghdGhpcy5hY2UuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSlcbiAgICAgIHRoaXMuYWNlLmV4aXRNdWx0aVNlbGVjdE1vZGUoKTtcbiAgICB0aGlzLmFjZS5zZXNzaW9uLnVuZm9sZCh7cm93OiBsaW5lLCBjb2x1bW46IGNofSk7XG4gICAgdGhpcy5hY2Uuc2VsZWN0aW9uLm1vdmVUbyhsaW5lLCBjaCk7XG4gICAgaWYgKHNob3VsZFNjcm9sbCkge1xuICAgICAgdGhpcy5hY2UucmVuZGVyZXIuc2Nyb2xsQ3Vyc29ySW50b1ZpZXcoKTtcbiAgICAgIHRoaXMuYWNlLmVuZE9wZXJhdGlvbigpO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5nZXRDdXJzb3IgPSBmdW5jdGlvbihwKSB7XG4gICAgdmFyIHNlbCA9IHRoaXMuYWNlLnNlbGVjdGlvbjtcbiAgICB2YXIgcG9zID0gcCA9PSAnYW5jaG9yJyA/IChzZWwuaXNFbXB0eSgpID8gc2VsLmxlYWQgOiBzZWwuYW5jaG9yKSA6XG4gICAgICAgIHAgPT0gJ2hlYWQnIHx8ICFwID8gc2VsLmxlYWQgOiBzZWwuZ2V0UmFuZ2UoKVtwXTtcbiAgICByZXR1cm4gdG9DbVBvcyhwb3MpO1xuICB9O1xuICB0aGlzLmxpc3RTZWxlY3Rpb25zID0gZnVuY3Rpb24ocCkge1xuICAgIHZhciByYW5nZXMgPSB0aGlzLmFjZS5tdWx0aVNlbGVjdC5yYW5nZUxpc3QucmFuZ2VzO1xuICAgIGlmICghcmFuZ2VzLmxlbmd0aCB8fCB0aGlzLmFjZS5pblZpcnR1YWxTZWxlY3Rpb25Nb2RlKVxuICAgICAgcmV0dXJuIFt7YW5jaG9yOiB0aGlzLmdldEN1cnNvcignYW5jaG9yJyksIGhlYWQ6IHRoaXMuZ2V0Q3Vyc29yKCdoZWFkJyl9XTtcbiAgICByZXR1cm4gcmFuZ2VzLm1hcChmdW5jdGlvbihyKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBhbmNob3I6IHRoaXMuY2xpcFBvcyh0b0NtUG9zKHIuY3Vyc29yID09IHIuZW5kID8gci5zdGFydCA6IHIuZW5kKSksXG4gICAgICAgIGhlYWQ6IHRoaXMuY2xpcFBvcyh0b0NtUG9zKHIuY3Vyc29yKSlcbiAgICAgIH07XG4gICAgfSwgdGhpcyk7XG4gIH07XG4gIHRoaXMuc2V0U2VsZWN0aW9ucyA9IGZ1bmN0aW9uKHAsIHByaW1JbmRleCkge1xuICAgIHZhciBzZWwgPSB0aGlzLmFjZS5tdWx0aVNlbGVjdDtcbiAgICB2YXIgcmFuZ2VzID0gcC5tYXAoZnVuY3Rpb24oeCkge1xuICAgICAgdmFyIGFuY2hvciA9IHRvQWNlUG9zKHguYW5jaG9yKTtcbiAgICAgIHZhciBoZWFkID0gdG9BY2VQb3MoeC5oZWFkKTtcbiAgICAgIHZhciByID0gUmFuZ2UuY29tcGFyZVBvaW50cyhhbmNob3IsIGhlYWQpIDwgMFxuICAgICAgICA/IG5ldyBSYW5nZS5mcm9tUG9pbnRzKGFuY2hvciwgaGVhZClcbiAgICAgICAgOiBuZXcgUmFuZ2UuZnJvbVBvaW50cyhoZWFkLCBhbmNob3IpO1xuICAgICAgci5jdXJzb3IgPSBSYW5nZS5jb21wYXJlUG9pbnRzKHIuc3RhcnQsIGhlYWQpID8gci5lbmQgOiByLnN0YXJ0O1xuICAgICAgcmV0dXJuIHI7XG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5hY2UuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSkge1xuICAgICAgdGhpcy5hY2Uuc2VsZWN0aW9uLmZyb21PcmllbnRlZFJhbmdlKHJhbmdlc1swXSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghcHJpbUluZGV4KSB7XG4gICAgICAgIHJhbmdlcyA9IHJhbmdlcy5yZXZlcnNlKCk7XG4gICAgfSBlbHNlIGlmIChyYW5nZXNbcHJpbUluZGV4XSkge1xuICAgICAgIHJhbmdlcy5wdXNoKHJhbmdlcy5zcGxpY2UocHJpbUluZGV4LCAxKVswXSk7XG4gICAgfVxuICAgIHNlbC50b1NpbmdsZVJhbmdlKHJhbmdlc1swXS5jbG9uZSgpKTtcbiAgICB2YXIgc2Vzc2lvbiA9IHRoaXMuYWNlLnNlc3Npb247XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCByYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uJGNsaXBSYW5nZVRvRG9jdW1lbnQocmFuZ2VzW2ldKTsgLy8gdG9kbyB3aHkgYWNlIGRvZXNuJ3QgZG8gdGhpcz9cbiAgICAgIHNlbC5hZGRSYW5nZShyYW5nZSk7XG4gICAgfVxuICB9O1xuICB0aGlzLnNldFNlbGVjdGlvbiA9IGZ1bmN0aW9uKGEsIGgsIG9wdGlvbnMpIHtcbiAgICB2YXIgc2VsID0gdGhpcy5hY2Uuc2VsZWN0aW9uO1xuICAgIHNlbC5tb3ZlVG8oYS5saW5lLCBhLmNoKTtcbiAgICBzZWwuc2VsZWN0VG8oaC5saW5lLCBoLmNoKTtcbiAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLm9yaWdpbiA9PSAnKm1vdXNlJykge1xuICAgICAgdGhpcy5vbkJlZm9yZUVuZE9wZXJhdGlvbigpO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5zb21ldGhpbmdTZWxlY3RlZCA9IGZ1bmN0aW9uKHApIHtcbiAgICByZXR1cm4gIXRoaXMuYWNlLnNlbGVjdGlvbi5pc0VtcHR5KCk7XG4gIH07XG4gIHRoaXMuY2xpcFBvcyA9IGZ1bmN0aW9uKHApIHtcbiAgICB2YXIgcG9zID0gdGhpcy5hY2Uuc2Vzc2lvbi4kY2xpcFBvc2l0aW9uVG9Eb2N1bWVudChwLmxpbmUsIHAuY2gpO1xuICAgIHJldHVybiB0b0NtUG9zKHBvcyk7XG4gIH07XG4gIHRoaXMuZm9sZENvZGUgPSBmdW5jdGlvbihwb3MpIHtcbiAgICB0aGlzLmFjZS5zZXNzaW9uLiR0b2dnbGVGb2xkV2lkZ2V0KHBvcy5saW5lLCB7fSk7XG4gIH07XG4gIHRoaXMubWFya1RleHQgPSBmdW5jdGlvbihjdXJzb3IpIHtcbiAgICAvLyBvbmx5IHVzZWQgZm9yIGZhdC1jdXJzb3IsIG5vdCBuZWVkZWRcbiAgICByZXR1cm4ge2NsZWFyOiBmdW5jdGlvbigpIHt9LCBmaW5kOiBmdW5jdGlvbigpIHt9fTtcbiAgfTtcbiAgdGhpcy4kdXBkYXRlTWFya2VycyA9IGZ1bmN0aW9uKGRlbHRhKSB7XG4gICAgdmFyIGlzSW5zZXJ0ID0gZGVsdGEuYWN0aW9uID09IFwiaW5zZXJ0XCI7XG4gICAgdmFyIHN0YXJ0ID0gZGVsdGEuc3RhcnQ7XG4gICAgdmFyIGVuZCA9IGRlbHRhLmVuZDtcbiAgICB2YXIgcm93U2hpZnQgPSAoZW5kLnJvdyAtIHN0YXJ0LnJvdykgKiAoaXNJbnNlcnQgPyAxIDogLTEpO1xuICAgIHZhciBjb2xTaGlmdCA9IChlbmQuY29sdW1uIC0gc3RhcnQuY29sdW1uKSAqIChpc0luc2VydCA/IDEgOiAtMSk7XG4gICAgaWYgKGlzSW5zZXJ0KSBlbmQgPSBzdGFydDtcblxuICAgIGZvciAodmFyIGkgaW4gdGhpcy5tYXJrcykge1xuICAgICAgdmFyIHBvaW50ID0gdGhpcy5tYXJrc1tpXTtcbiAgICAgIHZhciBjbXAgPSBSYW5nZS5jb21wYXJlUG9pbnRzKHBvaW50LCBzdGFydCk7XG4gICAgICBpZiAoY21wIDwgMCkge1xuICAgICAgICBjb250aW51ZTsgLy8gZGVsdGEgc3RhcnRzIGFmdGVyIHRoZSByYW5nZVxuICAgICAgfVxuICAgICAgaWYgKGNtcCA9PT0gMCkge1xuICAgICAgICBpZiAoaXNJbnNlcnQpIHtcbiAgICAgICAgICBpZiAocG9pbnQuYmlhcyA9PSAxKSB7XG4gICAgICAgICAgICBjbXAgPSAxO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwb2ludC5iaWFzID0gLTE7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBjbXAyID0gaXNJbnNlcnQgPyBjbXAgOiBSYW5nZS5jb21wYXJlUG9pbnRzKHBvaW50LCBlbmQpO1xuICAgICAgaWYgKGNtcDIgPiAwKSB7XG4gICAgICAgIHBvaW50LnJvdyArPSByb3dTaGlmdDtcbiAgICAgICAgcG9pbnQuY29sdW1uICs9IHBvaW50LnJvdyA9PSBlbmQucm93ID8gY29sU2hpZnQgOiAwO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICghaXNJbnNlcnQgJiYgY21wMiA8PSAwKSB7XG4gICAgICAgIHBvaW50LnJvdyA9IHN0YXJ0LnJvdztcbiAgICAgICAgcG9pbnQuY29sdW1uID0gc3RhcnQuY29sdW1uO1xuICAgICAgICBpZiAoY21wMiA9PT0gMClcbiAgICAgICAgICBwb2ludC5iaWFzID0gMTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG4gIHZhciBNYXJrZXIgPSBmdW5jdGlvbihjbSwgaWQsIHJvdywgY29sdW1uKSB7XG4gICAgdGhpcy5jbSA9IGNtO1xuICAgIHRoaXMuaWQgPSBpZDtcbiAgICB0aGlzLnJvdyA9IHJvdztcbiAgICB0aGlzLmNvbHVtbiA9IGNvbHVtbjtcbiAgICBjbS5tYXJrc1t0aGlzLmlkXSA9IHRoaXM7XG4gIH07XG4gIE1hcmtlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbigpIHsgZGVsZXRlIHRoaXMuY20ubWFya3NbdGhpcy5pZF0gfTtcbiAgTWFya2VyLnByb3RvdHlwZS5maW5kID0gZnVuY3Rpb24oKSB7IHJldHVybiB0b0NtUG9zKHRoaXMpIH07XG4gIHRoaXMuc2V0Qm9va21hcmsgPSBmdW5jdGlvbihjdXJzb3IsIG9wdGlvbnMpIHtcbiAgICB2YXIgYm0gPSBuZXcgTWFya2VyKHRoaXMsIHRoaXMuJHVpZCsrLCBjdXJzb3IubGluZSwgY3Vyc29yLmNoKTtcbiAgICBpZiAoIW9wdGlvbnMgfHwgIW9wdGlvbnMuaW5zZXJ0TGVmdClcbiAgICAgIGJtLiRpbnNlcnRSaWdodCA9IHRydWU7XG4gICAgdGhpcy5tYXJrc1tibS5pZF0gPSBibTtcbiAgICByZXR1cm4gYm07XG4gIH07XG4gIHRoaXMubW92ZUggPSBmdW5jdGlvbihpbmNyZW1lbnQsIHVuaXQpIHtcbiAgICBpZiAodW5pdCA9PSAnY2hhcicpIHtcbiAgICAgIHZhciBzZWwgPSB0aGlzLmFjZS5zZWxlY3Rpb247XG4gICAgICBzZWwuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICAgIHNlbC5tb3ZlQ3Vyc29yQnkoMCwgaW5jcmVtZW50KTtcbiAgICB9XG4gIH07XG4gIHRoaXMuZmluZFBvc1YgPSBmdW5jdGlvbihzdGFydCwgYW1vdW50LCB1bml0LCBnb2FsQ29sdW1uKSB7XG4gICAgaWYgKHVuaXQgPT0gJ3BhZ2UnKSB7XG4gICAgICB2YXIgcmVuZGVyZXIgPSB0aGlzLmFjZS5yZW5kZXJlcjtcbiAgICAgIHZhciBjb25maWcgPSByZW5kZXJlci5sYXllckNvbmZpZztcbiAgICAgIGFtb3VudCA9IGFtb3VudCAqIE1hdGguZmxvb3IoY29uZmlnLmhlaWdodCAvIGNvbmZpZy5saW5lSGVpZ2h0KTtcbiAgICAgIHVuaXQgPSAnbGluZSc7XG4gICAgfVxuICAgIGlmICh1bml0ID09ICdsaW5lJykge1xuICAgICAgdmFyIHNjcmVlblBvcyA9IHRoaXMuYWNlLnNlc3Npb24uZG9jdW1lbnRUb1NjcmVlblBvc2l0aW9uKHN0YXJ0LmxpbmUsIHN0YXJ0LmNoKTtcbiAgICAgIGlmIChnb2FsQ29sdW1uICE9IG51bGwpXG4gICAgICAgIHNjcmVlblBvcy5jb2x1bW4gPSBnb2FsQ29sdW1uO1xuICAgICAgc2NyZWVuUG9zLnJvdyArPSBhbW91bnQ7XG4gICAgICAvLyBub3Qgd2hhdCBjb2RlbWlycm9yIGRvZXMgYnV0IHZpbSBtb2RlIG5lZWRzIG9ubHkgdGhpc1xuICAgICAgc2NyZWVuUG9zLnJvdyA9IE1hdGgubWluKE1hdGgubWF4KDAsIHNjcmVlblBvcy5yb3cpLCB0aGlzLmFjZS5zZXNzaW9uLmdldFNjcmVlbkxlbmd0aCgpIC0gMSk7XG4gICAgICB2YXIgcG9zID0gdGhpcy5hY2Uuc2Vzc2lvbi5zY3JlZW5Ub0RvY3VtZW50UG9zaXRpb24oc2NyZWVuUG9zLnJvdywgc2NyZWVuUG9zLmNvbHVtbik7XG4gICAgICByZXR1cm4gdG9DbVBvcyhwb3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWJ1Z2dlcjtcbiAgICB9XG4gIH07XG4gIHRoaXMuY2hhckNvb3JkcyA9IGZ1bmN0aW9uKHBvcywgbW9kZSkge1xuICAgIGlmIChtb2RlID09ICdkaXYnIHx8ICFtb2RlKSB7XG4gICAgICB2YXIgc2MgPSB0aGlzLmFjZS5zZXNzaW9uLmRvY3VtZW50VG9TY3JlZW5Qb3NpdGlvbihwb3MubGluZSwgcG9zLmNoKTtcbiAgICAgIHJldHVybiB7bGVmdDogc2MuY29sdW1uLCB0b3A6IHNjLnJvd307XG4gICAgfWlmIChtb2RlID09ICdsb2NhbCcpIHtcbiAgICAgIHZhciByZW5kZXJlciA9IHRoaXMuYWNlLnJlbmRlcmVyO1xuICAgICAgdmFyIHNjID0gdGhpcy5hY2Uuc2Vzc2lvbi5kb2N1bWVudFRvU2NyZWVuUG9zaXRpb24ocG9zLmxpbmUsIHBvcy5jaCk7XG4gICAgICB2YXIgbGggPSByZW5kZXJlci5sYXllckNvbmZpZy5saW5lSGVpZ2h0O1xuICAgICAgdmFyIGN3ID0gcmVuZGVyZXIubGF5ZXJDb25maWcuY2hhcmFjdGVyV2lkdGg7XG4gICAgICB2YXIgdG9wID0gbGggKiBzYy5yb3c7XG4gICAgICByZXR1cm4ge2xlZnQ6IHNjLmNvbHVtbiAqIGN3LCB0b3A6IHRvcCwgYm90dG9tOiB0b3AgKyBsaH07XG4gICAgfVxuICB9O1xuICB0aGlzLmNvb3Jkc0NoYXIgPSBmdW5jdGlvbihwb3MsIG1vZGUpIHtcbiAgICB2YXIgcmVuZGVyZXIgPSB0aGlzLmFjZS5yZW5kZXJlcjtcbiAgICBpZiAobW9kZSA9PSAnbG9jYWwnKSB7XG4gICAgICB2YXIgcm93ID0gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihwb3MudG9wIC8gcmVuZGVyZXIubGluZUhlaWdodCkpO1xuICAgICAgdmFyIGNvbCA9IE1hdGgubWF4KDAsIE1hdGguZmxvb3IocG9zLmxlZnQgLyByZW5kZXJlci5jaGFyYWN0ZXJXaWR0aCkpO1xuICAgICAgdmFyIGNoID0gcmVuZGVyZXIuc2Vzc2lvbi5zY3JlZW5Ub0RvY3VtZW50UG9zaXRpb24ocm93LCBjb2wpO1xuICAgICAgcmV0dXJuIHRvQ21Qb3MoY2gpO1xuICAgIH0gZWxzZSBpZiAobW9kZSA9PSAnZGl2Jykge1xuICAgICAgdGhyb3cgXCJub3QgaW1wbGVtZW50ZWRcIjtcbiAgICB9XG4gIH07XG4gIHRoaXMuZ2V0U2VhcmNoQ3Vyc29yID0gZnVuY3Rpb24ocXVlcnksIHBvcywgY2FzZUZvbGQpIHtcbiAgICB2YXIgY2FzZVNlbnNpdGl2ZSA9IGZhbHNlO1xuICAgIHZhciBpc1JlZ2V4cCA9IGZhbHNlO1xuICAgIGlmIChxdWVyeSBpbnN0YW5jZW9mIFJlZ0V4cCAmJiAhcXVlcnkuZ2xvYmFsKSB7XG4gICAgICBjYXNlU2Vuc2l0aXZlID0gIXF1ZXJ5Lmlnbm9yZUNhc2U7XG4gICAgICBxdWVyeSA9IHF1ZXJ5LnNvdXJjZTtcbiAgICAgIGlzUmVnZXhwID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHF1ZXJ5ID09IFwiXFxcXG5cIikgeyBxdWVyeSA9IFwiXFxuXCI7IGlzUmVnZXhwID0gZmFsc2U7IH1cbiAgICB2YXIgc2VhcmNoID0gbmV3IFNlYXJjaCgpO1xuICAgIGlmIChwb3MuY2ggPT0gdW5kZWZpbmVkKSBwb3MuY2ggPSBOdW1iZXIuTUFYX1ZBTFVFO1xuICAgIHZhciBhY2VQb3MgPSB7cm93OiBwb3MubGluZSwgY29sdW1uOiBwb3MuY2h9O1xuICAgIHZhciBjbSA9IHRoaXM7XG4gICAgdmFyIGxhc3QgPSBudWxsO1xuICAgIHJldHVybiB7XG4gICAgICBmaW5kTmV4dDogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLmZpbmQoZmFsc2UpIH0sXG4gICAgICBmaW5kUHJldmlvdXM6IGZ1bmN0aW9uKCkge3JldHVybiB0aGlzLmZpbmQodHJ1ZSkgfSxcbiAgICAgIGZpbmQ6IGZ1bmN0aW9uKGJhY2spIHtcbiAgICAgICAgc2VhcmNoLnNldE9wdGlvbnMoe1xuICAgICAgICAgIG5lZWRsZTogcXVlcnksXG4gICAgICAgICAgY2FzZVNlbnNpdGl2ZTogY2FzZVNlbnNpdGl2ZSxcbiAgICAgICAgICB3cmFwOiBmYWxzZSxcbiAgICAgICAgICBiYWNrd2FyZHM6IGJhY2ssXG4gICAgICAgICAgcmVnRXhwOiBpc1JlZ2V4cCxcbiAgICAgICAgICBzdGFydDogbGFzdCB8fCBhY2VQb3NcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciByYW5nZSA9IHNlYXJjaC5maW5kKGNtLmFjZS5zZXNzaW9uKTtcbiAgICAgICAgbGFzdCA9IHJhbmdlO1xuICAgICAgICByZXR1cm4gbGFzdCAmJiBbIWxhc3QuaXNFbXB0eSgpXTtcbiAgICAgIH0sXG4gICAgICBmcm9tOiBmdW5jdGlvbigpIHsgcmV0dXJuIGxhc3QgJiYgdG9DbVBvcyhsYXN0LnN0YXJ0KSB9LFxuICAgICAgdG86IGZ1bmN0aW9uKCkgeyByZXR1cm4gbGFzdCAmJiB0b0NtUG9zKGxhc3QuZW5kKSB9LFxuICAgICAgcmVwbGFjZTogZnVuY3Rpb24odGV4dCkge1xuICAgICAgICBpZiAobGFzdCkge1xuICAgICAgICAgIGxhc3QuZW5kID0gY20uYWNlLnNlc3Npb24uZG9jLnJlcGxhY2UobGFzdCwgdGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9O1xuICB0aGlzLnNjcm9sbFRvID0gZnVuY3Rpb24oeCwgeSkge1xuICAgIHZhciByZW5kZXJlciA9IHRoaXMuYWNlLnJlbmRlcmVyO1xuICAgIHZhciBjb25maWcgPSByZW5kZXJlci5sYXllckNvbmZpZztcbiAgICB2YXIgbWF4SGVpZ2h0ID0gY29uZmlnLm1heEhlaWdodDtcbiAgICBtYXhIZWlnaHQgLT0gKHJlbmRlcmVyLiRzaXplLnNjcm9sbGVySGVpZ2h0IC0gcmVuZGVyZXIubGluZUhlaWdodCkgKiByZW5kZXJlci4kc2Nyb2xsUGFzdEVuZDtcbiAgICBpZiAoeSAhPSBudWxsKSB0aGlzLmFjZS5zZXNzaW9uLnNldFNjcm9sbFRvcChNYXRoLm1heCgwLCBNYXRoLm1pbih5LCBtYXhIZWlnaHQpKSk7XG4gICAgaWYgKHggIT0gbnVsbCkgdGhpcy5hY2Uuc2Vzc2lvbi5zZXRTY3JvbGxMZWZ0KE1hdGgubWF4KDAsIE1hdGgubWluKHgsIGNvbmZpZy53aWR0aCkpKTtcbiAgfTtcbiAgdGhpcy5zY3JvbGxJbmZvID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuICB0aGlzLnNjcm9sbEludG9WaWV3ID0gZnVuY3Rpb24ocG9zLCBtYXJnaW4pIHtcbiAgICBpZiAocG9zKSB7XG4gICAgICB2YXIgcmVuZGVyZXIgPSB0aGlzLmFjZS5yZW5kZXJlcjtcbiAgICAgIHZhciB2aWV3TWFyZ2luID0geyBcInRvcFwiOiAwLCBcImJvdHRvbVwiOiBtYXJnaW4gfTtcbiAgICAgIHJlbmRlcmVyLnNjcm9sbEN1cnNvckludG9WaWV3KHRvQWNlUG9zKHBvcyksXG4gICAgICAgIChyZW5kZXJlci5saW5lSGVpZ2h0ICogMikgLyByZW5kZXJlci4kc2l6ZS5zY3JvbGxlckhlaWdodCwgdmlld01hcmdpbik7XG4gICAgfVxuICB9O1xuICB0aGlzLmdldExpbmUgPSBmdW5jdGlvbihyb3cpIHsgcmV0dXJuIHRoaXMuYWNlLnNlc3Npb24uZ2V0TGluZShyb3cpIH07XG4gIHRoaXMuZ2V0UmFuZ2UgPSBmdW5jdGlvbihzLCBlKSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLnNlc3Npb24uZ2V0VGV4dFJhbmdlKG5ldyBSYW5nZShzLmxpbmUsIHMuY2gsIGUubGluZSwgZS5jaCkpO1xuICB9O1xuICB0aGlzLnJlcGxhY2VSYW5nZSA9IGZ1bmN0aW9uKHRleHQsIHMsIGUpIHtcbiAgICBpZiAoIWUpIGUgPSBzO1xuICAgIC8vIHdvcmthcm91bmQgZm9yIHNlc3Npb24ucmVwbGFjZSBub3QgaGFuZGxpbmcgbmVnYXRpdmUgcm93c1xuICAgIHZhciByYW5nZSA9IG5ldyBSYW5nZShzLmxpbmUsIHMuY2gsIGUubGluZSwgZS5jaCk7XG4gICAgdGhpcy5hY2Uuc2Vzc2lvbi4kY2xpcFJhbmdlVG9Eb2N1bWVudChyYW5nZSk7XG4gICAgcmV0dXJuIHRoaXMuYWNlLnNlc3Npb24ucmVwbGFjZShyYW5nZSwgdGV4dCk7XG4gIH07XG4gIHRoaXMucmVwbGFjZVNlbGVjdGlvbiA9XG4gIHRoaXMucmVwbGFjZVNlbGVjdGlvbnMgPSBmdW5jdGlvbihwKSB7XG4gICAgdmFyIHNlbCA9IHRoaXMuYWNlLnNlbGVjdGlvbjtcbiAgICBpZiAodGhpcy5hY2UuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSkge1xuICAgICAgdGhpcy5hY2Uuc2Vzc2lvbi5yZXBsYWNlKHNlbC5nZXRSYW5nZSgpLCBwWzBdIHx8IFwiXCIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZWwuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSA9IHRydWU7XG4gICAgdmFyIHJhbmdlcyA9IHNlbC5yYW5nZUxpc3QucmFuZ2VzO1xuICAgIGlmICghcmFuZ2VzLmxlbmd0aCkgcmFuZ2VzID0gW3RoaXMuYWNlLm11bHRpU2VsZWN0LmdldFJhbmdlKCldO1xuICAgIGZvciAodmFyIGkgPSByYW5nZXMubGVuZ3RoOyBpLS07KVxuICAgICAgIHRoaXMuYWNlLnNlc3Npb24ucmVwbGFjZShyYW5nZXNbaV0sIHBbaV0gfHwgXCJcIik7XG4gICAgc2VsLmluVmlydHVhbFNlbGVjdGlvbk1vZGUgPSBmYWxzZTtcbiAgfTtcbiAgdGhpcy5nZXRTZWxlY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5hY2UuZ2V0U2VsZWN0ZWRUZXh0KCk7XG4gIH07XG4gIHRoaXMuZ2V0U2VsZWN0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmxpc3RTZWxlY3Rpb25zKCkubWFwKGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiB0aGlzLmdldFJhbmdlKHguYW5jaG9yLCB4LmhlYWQpO1xuICAgIH0sIHRoaXMpO1xuICB9O1xuICB0aGlzLmdldElucHV0RmllbGQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5hY2UudGV4dElucHV0LmdldEVsZW1lbnQoKTtcbiAgfTtcbiAgdGhpcy5nZXRXcmFwcGVyRWxlbWVudCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmFjZS5jb250YWluZXI7XG4gIH07XG4gIHZhciBvcHRNYXAgPSB7XG4gICAgaW5kZW50V2l0aFRhYnM6IFwidXNlU29mdFRhYnNcIixcbiAgICBpbmRlbnRVbml0OiBcInRhYlNpemVcIixcbiAgICB0YWJTaXplOiBcInRhYlNpemVcIixcbiAgICBmaXJzdExpbmVOdW1iZXI6IFwiZmlyc3RMaW5lTnVtYmVyXCIsXG4gICAgcmVhZE9ubHk6IFwicmVhZE9ubHlcIlxuICB9O1xuICB0aGlzLnNldE9wdGlvbiA9IGZ1bmN0aW9uKG5hbWUsIHZhbCkge1xuICAgIHRoaXMuc3RhdGVbbmFtZV0gPSB2YWw7XG4gICAgc3dpdGNoIChuYW1lKSB7XG4gICAgICBjYXNlICdpbmRlbnRXaXRoVGFicyc6XG4gICAgICAgIG5hbWUgPSBvcHRNYXBbbmFtZV07XG4gICAgICAgIHZhbCA9ICF2YWw7XG4gICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2tleU1hcCc6XG4gICAgICAgIHRoaXMuc3RhdGUuJGtleU1hcCA9IHZhbDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBuYW1lID0gb3B0TWFwW25hbWVdO1xuICAgIH1cbiAgICBpZiAobmFtZSlcbiAgICAgIHRoaXMuYWNlLnNldE9wdGlvbihuYW1lLCB2YWwpO1xuICB9O1xuICB0aGlzLmdldE9wdGlvbiA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgdmFsO1xuICAgIHZhciBhY2VPcHQgPSBvcHRNYXBbbmFtZV07XG4gICAgaWYgKGFjZU9wdClcbiAgICAgIHZhbCA9IHRoaXMuYWNlLmdldE9wdGlvbihhY2VPcHQpO1xuICAgIHN3aXRjaCAobmFtZSkge1xuICAgICAgY2FzZSAnaW5kZW50V2l0aFRhYnMnOlxuICAgICAgICBuYW1lID0gb3B0TWFwW25hbWVdO1xuICAgICAgICByZXR1cm4gIXZhbDtcbiAgICAgIGNhc2UgJ2tleU1hcCc6XG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlLiRrZXlNYXAgfHwgJ3ZpbSc7XG4gICAgfVxuICAgIHJldHVybiBhY2VPcHQgPyB2YWwgOiB0aGlzLnN0YXRlW25hbWVdO1xuICB9O1xuICB0aGlzLnRvZ2dsZU92ZXJ3cml0ZSA9IGZ1bmN0aW9uKG9uKSB7XG4gICAgdGhpcy5zdGF0ZS5vdmVyd3JpdGUgPSBvbjtcbiAgICByZXR1cm4gdGhpcy5hY2Uuc2V0T3ZlcndyaXRlKG9uKTtcbiAgfTtcbiAgdGhpcy5hZGRPdmVybGF5ID0gZnVuY3Rpb24obykge1xuICAgIGlmICghdGhpcy4kc2VhcmNoSGlnaGxpZ2h0IHx8ICF0aGlzLiRzZWFyY2hIaWdobGlnaHQuc2Vzc2lvbikge1xuICAgICAgdmFyIGhpZ2hsaWdodCA9IG5ldyBTZWFyY2hIaWdobGlnaHQobnVsbCwgXCJhY2VfaGlnaGxpZ2h0LW1hcmtlclwiLCBcInRleHRcIik7XG4gICAgICB2YXIgbWFya2VyID0gdGhpcy5hY2Uuc2Vzc2lvbi5hZGREeW5hbWljTWFya2VyKGhpZ2hsaWdodCk7XG4gICAgICBoaWdobGlnaHQuaWQgPSBtYXJrZXIuaWQ7XG4gICAgICBoaWdobGlnaHQuc2Vzc2lvbiA9IHRoaXMuYWNlLnNlc3Npb247XG4gICAgICBoaWdobGlnaHQuZGVzdHJveSA9IGZ1bmN0aW9uKG8pIHtcbiAgICAgICAgaGlnaGxpZ2h0LnNlc3Npb24ub2ZmKFwiY2hhbmdlXCIsIGhpZ2hsaWdodC51cGRhdGVPbkNoYW5nZSk7XG4gICAgICAgIGhpZ2hsaWdodC5zZXNzaW9uLm9mZihcImNoYW5nZUVkaXRvclwiLCBoaWdobGlnaHQuZGVzdHJveSk7XG4gICAgICAgIGhpZ2hsaWdodC5zZXNzaW9uLnJlbW92ZU1hcmtlcihoaWdobGlnaHQuaWQpO1xuICAgICAgICBoaWdobGlnaHQuc2Vzc2lvbiA9IG51bGw7XG4gICAgICB9O1xuICAgICAgaGlnaGxpZ2h0LnVwZGF0ZU9uQ2hhbmdlID0gZnVuY3Rpb24oZGVsdGEpIHtcbiAgICAgICAgdmFyIHJvdyA9IGRlbHRhLnN0YXJ0LnJvdztcbiAgICAgICAgaWYgKHJvdyA9PSBkZWx0YS5lbmQucm93KSBoaWdobGlnaHQuY2FjaGVbcm93XSA9IHVuZGVmaW5lZDtcbiAgICAgICAgZWxzZSBoaWdobGlnaHQuY2FjaGUuc3BsaWNlKHJvdywgaGlnaGxpZ2h0LmNhY2hlLmxlbmd0aCk7XG4gICAgICB9O1xuICAgICAgaGlnaGxpZ2h0LnNlc3Npb24ub24oXCJjaGFuZ2VFZGl0b3JcIiwgaGlnaGxpZ2h0LmRlc3Ryb3kpO1xuICAgICAgaGlnaGxpZ2h0LnNlc3Npb24ub24oXCJjaGFuZ2VcIiwgaGlnaGxpZ2h0LnVwZGF0ZU9uQ2hhbmdlKTtcbiAgICB9XG4gICAgdmFyIHJlID0gbmV3IFJlZ0V4cChvLnF1ZXJ5LnNvdXJjZSwgXCJnbWlcIik7XG4gICAgdGhpcy4kc2VhcmNoSGlnaGxpZ2h0ID0gby5oaWdobGlnaHQgPSBoaWdobGlnaHQ7XG4gICAgdGhpcy4kc2VhcmNoSGlnaGxpZ2h0LnNldFJlZ2V4cChyZSk7XG4gICAgdGhpcy5hY2UucmVuZGVyZXIudXBkYXRlQmFja01hcmtlcnMoKTtcbiAgfTtcbiAgdGhpcy5yZW1vdmVPdmVybGF5ID0gZnVuY3Rpb24obykge1xuICAgIGlmICh0aGlzLiRzZWFyY2hIaWdobGlnaHQgJiYgdGhpcy4kc2VhcmNoSGlnaGxpZ2h0LnNlc3Npb24pIHtcbiAgICAgIHRoaXMuJHNlYXJjaEhpZ2hsaWdodC5kZXN0cm95KCk7XG4gICAgfVxuICB9O1xuICB0aGlzLmdldFNjcm9sbEluZm8gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVuZGVyZXIgPSB0aGlzLmFjZS5yZW5kZXJlcjtcbiAgICB2YXIgY29uZmlnID0gcmVuZGVyZXIubGF5ZXJDb25maWc7XG4gICAgcmV0dXJuIHtcbiAgICAgIGxlZnQ6IHJlbmRlcmVyLnNjcm9sbExlZnQsXG4gICAgICB0b3A6IHJlbmRlcmVyLnNjcm9sbFRvcCxcbiAgICAgIGhlaWdodDogY29uZmlnLm1heEhlaWdodCxcbiAgICAgIHdpZHRoOiBjb25maWcud2lkdGgsXG4gICAgICBjbGllbnRIZWlnaHQ6IGNvbmZpZy5oZWlnaHQsXG4gICAgICBjbGllbnRXaWR0aDogY29uZmlnLndpZHRoXG4gICAgfTtcbiAgfTtcbiAgdGhpcy5nZXRWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmFjZS5nZXRWYWx1ZSgpO1xuICB9O1xuICB0aGlzLnNldFZhbHVlID0gZnVuY3Rpb24odikge1xuICAgIHJldHVybiB0aGlzLmFjZS5zZXRWYWx1ZSh2LCAtMSk7XG4gIH07XG4gIHRoaXMuZ2V0VG9rZW5UeXBlQXQgPSBmdW5jdGlvbihwb3MpIHtcbiAgICB2YXIgdG9rZW4gPSB0aGlzLmFjZS5zZXNzaW9uLmdldFRva2VuQXQocG9zLmxpbmUsIHBvcy5jaCk7XG4gICAgcmV0dXJuIHRva2VuICYmIC9jb21tZW50fHN0cmluZy8udGVzdCh0b2tlbi50eXBlKSA/IFwic3RyaW5nXCIgOiBcIlwiO1xuICB9O1xuICB0aGlzLmZpbmRNYXRjaGluZ0JyYWNrZXQgPSBmdW5jdGlvbihwb3MpIHtcbiAgICB2YXIgbSA9IHRoaXMuYWNlLnNlc3Npb24uZmluZE1hdGNoaW5nQnJhY2tldCh0b0FjZVBvcyhwb3MpKTtcbiAgICByZXR1cm4ge3RvOiBtICYmIHRvQ21Qb3MobSl9O1xuICB9O1xuICB0aGlzLmZpbmRNYXRjaGluZ1RhZyA9IGZ1bmN0aW9uIChwb3MpIHtcbiAgICB2YXIgbSA9IHRoaXMuYWNlLnNlc3Npb24uZ2V0TWF0Y2hpbmdUYWdzKHRvQWNlUG9zKHBvcykpO1xuICAgIGlmICghbSkgcmV0dXJuO1xuICAgIHJldHVybiB7XG4gICAgICBvcGVuOiB7XG4gICAgICAgIGZyb206IHRvQ21Qb3MobS5vcGVuVGFnLnN0YXJ0KSxcbiAgICAgICAgdG86IHRvQ21Qb3MobS5vcGVuVGFnLmVuZClcbiAgICAgIH0sXG4gICAgICBjbG9zZToge1xuICAgICAgICBmcm9tOiB0b0NtUG9zKG0uY2xvc2VUYWcuc3RhcnQpLFxuICAgICAgICB0bzogdG9DbVBvcyhtLmNsb3NlVGFnLmVuZClcbiAgICAgIH1cbiAgICB9O1xuICB9O1xuICB0aGlzLmluZGVudExpbmUgPSBmdW5jdGlvbihsaW5lLCBtZXRob2QpIHtcbiAgICBpZiAobWV0aG9kID09PSB0cnVlKVxuICAgICAgICB0aGlzLmFjZS5zZXNzaW9uLmluZGVudFJvd3MobGluZSwgbGluZSwgXCJcXHRcIik7XG4gICAgZWxzZSBpZiAobWV0aG9kID09PSBmYWxzZSlcbiAgICAgICAgdGhpcy5hY2Uuc2Vzc2lvbi5vdXRkZW50Um93cyhuZXcgUmFuZ2UobGluZSwgMCwgbGluZSwgMCkpO1xuICB9O1xuICB0aGlzLmluZGV4RnJvbVBvcyA9IGZ1bmN0aW9uKHBvcykge1xuICAgIHJldHVybiB0aGlzLmFjZS5zZXNzaW9uLmRvYy5wb3NpdGlvblRvSW5kZXgodG9BY2VQb3MocG9zKSk7XG4gIH07XG4gIHRoaXMucG9zRnJvbUluZGV4ID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICByZXR1cm4gdG9DbVBvcyh0aGlzLmFjZS5zZXNzaW9uLmRvYy5pbmRleFRvUG9zaXRpb24oaW5kZXgpKTtcbiAgfTtcbiAgdGhpcy5mb2N1cyA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuYWNlLnRleHRJbnB1dC5mb2N1cygpO1xuICB9O1xuICB0aGlzLmJsdXIgPSBmdW5jdGlvbihpbmRleCkge1xuICAgIHJldHVybiB0aGlzLmFjZS5ibHVyKCk7XG4gIH07XG4gIHRoaXMuZGVmYXVsdFRleHRIZWlnaHQgPSBmdW5jdGlvbihpbmRleCkge1xuICAgIHJldHVybiB0aGlzLmFjZS5yZW5kZXJlci5sYXllckNvbmZpZy5saW5lSGVpZ2h0O1xuICB9O1xuICB0aGlzLnNjYW5Gb3JCcmFja2V0ID0gZnVuY3Rpb24ocG9zLCBkaXIsIF8sIG9wdGlvbnMpIHtcbiAgICB2YXIgcmUgPSBvcHRpb25zLmJyYWNrZXRSZWdleC5zb3VyY2U7XG4gICAgdmFyIHRva2VuUmUgPSAvcGFyZW58dGV4dHxvcGVyYXRvcnx0YWcvO1xuICAgIGlmIChkaXIgPT0gMSkge1xuICAgICAgdmFyIG0gPSB0aGlzLmFjZS5zZXNzaW9uLiRmaW5kQ2xvc2luZ0JyYWNrZXQocmUuc2xpY2UoMSwgMiksIHRvQWNlUG9zKHBvcyksIHRva2VuUmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbSA9IHRoaXMuYWNlLnNlc3Npb24uJGZpbmRPcGVuaW5nQnJhY2tldChyZS5zbGljZSgtMiwgLTEpLCB7cm93OiBwb3MubGluZSwgY29sdW1uOiBwb3MuY2ggKyAxfSwgdG9rZW5SZSk7XG4gICAgfVxuICAgIHJldHVybiBtICYmIHtwb3M6IHRvQ21Qb3MobSl9O1xuICB9O1xuICB0aGlzLnJlZnJlc2ggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5hY2UucmVzaXplKHRydWUpO1xuICB9O1xuICB0aGlzLmdldE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4geyBuYW1lIDogdGhpcy5nZXRPcHRpb24oXCJtb2RlXCIpIH07XG4gIH07XG4gIHRoaXMuZXhlY0NvbW1hbmQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgaWYgKENvZGVNaXJyb3IuY29tbWFuZHMuaGFzT3duUHJvcGVydHkobmFtZSkpIHJldHVybiBDb2RlTWlycm9yLmNvbW1hbmRzW25hbWVdKHRoaXMpO1xuICAgIGlmIChuYW1lID09IFwiaW5kZW50QXV0b1wiKSByZXR1cm4gdGhpcy5hY2UuZXhlY0NvbW1hbmQoXCJhdXRvaW5kZW50XCIpO1xuICAgIGNvbnNvbGUubG9nKG5hbWUgKyBcIiBpcyBub3QgaW1wbGVtZW50ZWRcIik7XG4gIH07XG4gIHRoaXMuZ2V0TGluZU51bWJlciA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgIHJldHVybiBoYW5kbGUucm93O1xuICB9XG4gIHRoaXMuZ2V0TGluZUhhbmRsZSA9IGZ1bmN0aW9uKHJvdykge1xuICAgIHJldHVybiB7dGV4dDogdGhpcy5hY2Uuc2Vzc2lvbi5nZXRMaW5lKHJvdyksIHJvdzogcm93fTtcbiAgfVxufSkuY2FsbChDb2RlTWlycm9yLnByb3RvdHlwZSk7XG4gIGZ1bmN0aW9uIHRvQWNlUG9zKGNtUG9zKSB7XG4gICAgcmV0dXJuIHtyb3c6IGNtUG9zLmxpbmUsIGNvbHVtbjogY21Qb3MuY2h9O1xuICB9XG4gIGZ1bmN0aW9uIHRvQ21Qb3MoYWNlUG9zKSB7XG4gICAgcmV0dXJuIG5ldyBQb3MoYWNlUG9zLnJvdywgYWNlUG9zLmNvbHVtbik7XG4gIH1cblxuICB2YXIgU3RyaW5nU3RyZWFtID0gQ29kZU1pcnJvci5TdHJpbmdTdHJlYW0gPSBmdW5jdGlvbihzdHJpbmcsIHRhYlNpemUpIHtcbiAgICB0aGlzLnBvcyA9IHRoaXMuc3RhcnQgPSAwO1xuICAgIHRoaXMuc3RyaW5nID0gc3RyaW5nO1xuICAgIHRoaXMudGFiU2l6ZSA9IHRhYlNpemUgfHwgODtcbiAgICB0aGlzLmxhc3RDb2x1bW5Qb3MgPSB0aGlzLmxhc3RDb2x1bW5WYWx1ZSA9IDA7XG4gICAgdGhpcy5saW5lU3RhcnQgPSAwO1xuICB9O1xuXG4gIFN0cmluZ1N0cmVhbS5wcm90b3R5cGUgPSB7XG4gICAgZW9sOiBmdW5jdGlvbigpIHtyZXR1cm4gdGhpcy5wb3MgPj0gdGhpcy5zdHJpbmcubGVuZ3RoO30sXG4gICAgc29sOiBmdW5jdGlvbigpIHtyZXR1cm4gdGhpcy5wb3MgPT0gdGhpcy5saW5lU3RhcnQ7fSxcbiAgICBwZWVrOiBmdW5jdGlvbigpIHtyZXR1cm4gdGhpcy5zdHJpbmcuY2hhckF0KHRoaXMucG9zKSB8fCB1bmRlZmluZWQ7fSxcbiAgICBuZXh0OiBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLnBvcyA8IHRoaXMuc3RyaW5nLmxlbmd0aClcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyaW5nLmNoYXJBdCh0aGlzLnBvcysrKTtcbiAgICB9LFxuICAgIGVhdDogZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgIHZhciBjaCA9IHRoaXMuc3RyaW5nLmNoYXJBdCh0aGlzLnBvcyk7XG4gICAgICBpZiAodHlwZW9mIG1hdGNoID09IFwic3RyaW5nXCIpIHZhciBvayA9IGNoID09IG1hdGNoO1xuICAgICAgZWxzZSB2YXIgb2sgPSBjaCAmJiAobWF0Y2gudGVzdCA/IG1hdGNoLnRlc3QoY2gpIDogbWF0Y2goY2gpKTtcbiAgICAgIGlmIChvaykgeysrdGhpcy5wb3M7IHJldHVybiBjaDt9XG4gICAgfSxcbiAgICBlYXRXaGlsZTogZnVuY3Rpb24obWF0Y2gpIHtcbiAgICAgIHZhciBzdGFydCA9IHRoaXMucG9zO1xuICAgICAgd2hpbGUgKHRoaXMuZWF0KG1hdGNoKSl7fVxuICAgICAgcmV0dXJuIHRoaXMucG9zID4gc3RhcnQ7XG4gICAgfSxcbiAgICBlYXRTcGFjZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc3RhcnQgPSB0aGlzLnBvcztcbiAgICAgIHdoaWxlICgvW1xcc1xcdTAwYTBdLy50ZXN0KHRoaXMuc3RyaW5nLmNoYXJBdCh0aGlzLnBvcykpKSArK3RoaXMucG9zO1xuICAgICAgcmV0dXJuIHRoaXMucG9zID4gc3RhcnQ7XG4gICAgfSxcbiAgICBza2lwVG9FbmQ6IGZ1bmN0aW9uKCkge3RoaXMucG9zID0gdGhpcy5zdHJpbmcubGVuZ3RoO30sXG4gICAgc2tpcFRvOiBmdW5jdGlvbihjaCkge1xuICAgICAgdmFyIGZvdW5kID0gdGhpcy5zdHJpbmcuaW5kZXhPZihjaCwgdGhpcy5wb3MpO1xuICAgICAgaWYgKGZvdW5kID4gLTEpIHt0aGlzLnBvcyA9IGZvdW5kOyByZXR1cm4gdHJ1ZTt9XG4gICAgfSxcbiAgICBiYWNrVXA6IGZ1bmN0aW9uKG4pIHt0aGlzLnBvcyAtPSBuO30sXG4gICAgY29sdW1uOiBmdW5jdGlvbigpIHtcbiAgICAgIHRocm93IFwibm90IGltcGxlbWVudGVkXCI7XG4gICAgfSxcbiAgICBpbmRlbnRhdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICB0aHJvdyBcIm5vdCBpbXBsZW1lbnRlZFwiO1xuICAgIH0sXG4gICAgbWF0Y2g6IGZ1bmN0aW9uKHBhdHRlcm4sIGNvbnN1bWUsIGNhc2VJbnNlbnNpdGl2ZSkge1xuICAgICAgaWYgKHR5cGVvZiBwYXR0ZXJuID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdmFyIGNhc2VkID0gZnVuY3Rpb24oc3RyKSB7cmV0dXJuIGNhc2VJbnNlbnNpdGl2ZSA/IHN0ci50b0xvd2VyQ2FzZSgpIDogc3RyO307XG4gICAgICAgIHZhciBzdWJzdHIgPSB0aGlzLnN0cmluZy5zdWJzdHIodGhpcy5wb3MsIHBhdHRlcm4ubGVuZ3RoKTtcbiAgICAgICAgaWYgKGNhc2VkKHN1YnN0cikgPT0gY2FzZWQocGF0dGVybikpIHtcbiAgICAgICAgICBpZiAoY29uc3VtZSAhPT0gZmFsc2UpIHRoaXMucG9zICs9IHBhdHRlcm4ubGVuZ3RoO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbWF0Y2ggPSB0aGlzLnN0cmluZy5zbGljZSh0aGlzLnBvcykubWF0Y2gocGF0dGVybik7XG4gICAgICAgIGlmIChtYXRjaCAmJiBtYXRjaC5pbmRleCA+IDApIHJldHVybiBudWxsO1xuICAgICAgICBpZiAobWF0Y2ggJiYgY29uc3VtZSAhPT0gZmFsc2UpIHRoaXMucG9zICs9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgfVxuICAgIH0sXG4gICAgY3VycmVudDogZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5zdHJpbmcuc2xpY2UodGhpcy5zdGFydCwgdGhpcy5wb3MpO30sXG4gICAgaGlkZUZpcnN0Q2hhcnM6IGZ1bmN0aW9uKG4sIGlubmVyKSB7XG4gICAgICB0aGlzLmxpbmVTdGFydCArPSBuO1xuICAgICAgdHJ5IHsgcmV0dXJuIGlubmVyKCk7IH1cbiAgICAgIGZpbmFsbHkgeyB0aGlzLmxpbmVTdGFydCAtPSBuOyB9XG4gICAgfVxuICB9O1xuXG4vLyB0b2RvIHJlcGxhY2Ugd2l0aCBzaG93Q29tbWFuZExpbmVcbkNvZGVNaXJyb3IuZGVmaW5lRXh0ZW5zaW9uID0gZnVuY3Rpb24obmFtZSwgZm4pIHtcbiAgQ29kZU1pcnJvci5wcm90b3R5cGVbbmFtZV0gPSBmbjtcbn07XG5kb21MaWIuaW1wb3J0Q3NzU3RyaW5nKGAubm9ybWFsLW1vZGUgLmFjZV9jdXJzb3J7XG4gICAgYm9yZGVyOiBub25lO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LDAsMCwwLjUpO1xufVxuLm5vcm1hbC1tb2RlIC5hY2VfaGlkZGVuLWN1cnNvcnMgLmFjZV9jdXJzb3J7XG4gIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICBib3JkZXI6IDFweCBzb2xpZCByZWQ7XG4gIG9wYWNpdHk6IDAuN1xufVxuLmFjZV9kaWFsb2cge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7IHJpZ2h0OiAwO1xuICBiYWNrZ3JvdW5kOiBpbmhlcml0O1xuICB6LWluZGV4OiAxNTtcbiAgcGFkZGluZzogLjFlbSAuOGVtO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBjb2xvcjogaW5oZXJpdDtcbn1cbi5hY2VfZGlhbG9nLXRvcCB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjNDQ0O1xuICB0b3A6IDA7XG59XG4uYWNlX2RpYWxvZy1ib3R0b20ge1xuICBib3JkZXItdG9wOiAxcHggc29saWQgIzQ0NDtcbiAgYm90dG9tOiAwO1xufVxuLmFjZV9kaWFsb2cgaW5wdXQge1xuICBib3JkZXI6IG5vbmU7XG4gIG91dGxpbmU6IG5vbmU7XG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50O1xuICB3aWR0aDogMjBlbTtcbiAgY29sb3I6IGluaGVyaXQ7XG4gIGZvbnQtZmFtaWx5OiBtb25vc3BhY2U7XG59YCwgXCJ2aW1Nb2RlXCIsIGZhbHNlKTtcbihmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gZGlhbG9nRGl2KGNtLCB0ZW1wbGF0ZSwgYm90dG9tKSB7XG4gICAgdmFyIHdyYXAgPSBjbS5hY2UuY29udGFpbmVyO1xuICAgIHZhciBkaWFsb2c7XG4gICAgZGlhbG9nID0gd3JhcC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpKTtcbiAgICBpZiAoYm90dG9tKVxuICAgICAgZGlhbG9nLmNsYXNzTmFtZSA9IFwiYWNlX2RpYWxvZyBhY2VfZGlhbG9nLWJvdHRvbVwiO1xuICAgIGVsc2VcbiAgICAgIGRpYWxvZy5jbGFzc05hbWUgPSBcImFjZV9kaWFsb2cgYWNlX2RpYWxvZy10b3BcIjtcblxuICAgIGlmICh0eXBlb2YgdGVtcGxhdGUgPT0gXCJzdHJpbmdcIikge1xuICAgICAgZGlhbG9nLmlubmVySFRNTCA9IHRlbXBsYXRlO1xuICAgIH0gZWxzZSB7IC8vIEFzc3VtaW5nIGl0J3MgYSBkZXRhY2hlZCBET00gZWxlbWVudC5cbiAgICAgIGRpYWxvZy5hcHBlbmRDaGlsZCh0ZW1wbGF0ZSk7XG4gICAgfVxuICAgIHJldHVybiBkaWFsb2c7XG4gIH1cblxuICBmdW5jdGlvbiBjbG9zZU5vdGlmaWNhdGlvbihjbSwgbmV3VmFsKSB7XG4gICAgaWYgKGNtLnN0YXRlLmN1cnJlbnROb3RpZmljYXRpb25DbG9zZSlcbiAgICAgIGNtLnN0YXRlLmN1cnJlbnROb3RpZmljYXRpb25DbG9zZSgpO1xuICAgIGNtLnN0YXRlLmN1cnJlbnROb3RpZmljYXRpb25DbG9zZSA9IG5ld1ZhbDtcbiAgfVxuXG4gIENvZGVNaXJyb3IuZGVmaW5lRXh0ZW5zaW9uKFwib3BlbkRpYWxvZ1wiLCBmdW5jdGlvbih0ZW1wbGF0ZSwgY2FsbGJhY2ssIG9wdGlvbnMpIHtcbiAgICBpZiAodGhpcy52aXJ0dWFsU2VsZWN0aW9uTW9kZSgpKSByZXR1cm47XG4gICAgaWYgKCFvcHRpb25zKSBvcHRpb25zID0ge307XG5cbiAgICBjbG9zZU5vdGlmaWNhdGlvbih0aGlzLCBudWxsKTtcblxuICAgIHZhciBkaWFsb2cgPSBkaWFsb2dEaXYodGhpcywgdGVtcGxhdGUsIG9wdGlvbnMuYm90dG9tKTtcbiAgICB2YXIgY2xvc2VkID0gZmFsc2UsIG1lID0gdGhpcztcbiAgICB0aGlzLnN0YXRlLmRpYWxvZyA9IGRpYWxvZztcbiAgICBmdW5jdGlvbiBjbG9zZShuZXdWYWwpIHtcbiAgICAgIGlmICh0eXBlb2YgbmV3VmFsID09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlucC52YWx1ZSA9IG5ld1ZhbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChjbG9zZWQpIHJldHVybjtcblxuICAgICAgICBpZiAobmV3VmFsICYmIG5ld1ZhbC50eXBlID09IFwiYmx1clwiKSB7XG4gICAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgPT09IGlucClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtZS5zdGF0ZS5kaWFsb2cgPT0gZGlhbG9nKSB7XG4gICAgICAgICAgbWUuc3RhdGUuZGlhbG9nID0gbnVsbDtcbiAgICAgICAgICBtZS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIGNsb3NlZCA9IHRydWU7XG4gICAgICAgIGRpYWxvZy5yZW1vdmUoKTtcblxuICAgICAgICBpZiAob3B0aW9ucy5vbkNsb3NlKSBvcHRpb25zLm9uQ2xvc2UoZGlhbG9nKTtcblxuICAgICAgICAvLyBhY2VfcGF0Y2h7XG4gICAgICAgIHZhciBjbSA9IG1lO1xuICAgICAgICBpZiAoY20uc3RhdGUudmltKSB7XG4gICAgICAgICAgY20uc3RhdGUudmltLnN0YXR1cyA9IG51bGw7XG4gICAgICAgICAgY20uYWNlLl9zaWduYWwoXCJjaGFuZ2VTdGF0dXNcIik7XG4gICAgICAgICAgY20uYWNlLnJlbmRlcmVyLiRsb29wLnNjaGVkdWxlKGNtLmFjZS5yZW5kZXJlci5DSEFOR0VfQ1VSU09SKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhY2VfcGF0Y2h9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGlucCA9IGRpYWxvZy5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpWzBdLCBidXR0b247XG4gICAgaWYgKGlucCkge1xuICAgICAgaWYgKG9wdGlvbnMudmFsdWUpIHtcbiAgICAgICAgaW5wLnZhbHVlID0gb3B0aW9ucy52YWx1ZTtcbiAgICAgICAgaWYgKG9wdGlvbnMuc2VsZWN0VmFsdWVPbk9wZW4gIT09IGZhbHNlKSBpbnAuc2VsZWN0KCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChvcHRpb25zLm9uSW5wdXQpXG4gICAgICAgIENvZGVNaXJyb3Iub24oaW5wLCBcImlucHV0XCIsIGZ1bmN0aW9uKGUpIHsgb3B0aW9ucy5vbklucHV0KGUsIGlucC52YWx1ZSwgY2xvc2UpO30pO1xuICAgICAgaWYgKG9wdGlvbnMub25LZXlVcClcbiAgICAgICAgQ29kZU1pcnJvci5vbihpbnAsIFwia2V5dXBcIiwgZnVuY3Rpb24oZSkge29wdGlvbnMub25LZXlVcChlLCBpbnAudmFsdWUsIGNsb3NlKTt9KTtcblxuICAgICAgQ29kZU1pcnJvci5vbihpbnAsIFwia2V5ZG93blwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMub25LZXlEb3duICYmIG9wdGlvbnMub25LZXlEb3duKGUsIGlucC52YWx1ZSwgY2xvc2UpKSB7IHJldHVybjsgfVxuICAgICAgICBpZiAoZS5rZXlDb2RlID09IDEzKSBjYWxsYmFjayhpbnAudmFsdWUpO1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09IDI3IHx8IChvcHRpb25zLmNsb3NlT25FbnRlciAhPT0gZmFsc2UgJiYgZS5rZXlDb2RlID09IDEzKSkge1xuICAgICAgICAgIENvZGVNaXJyb3IuZV9zdG9wKGUpO1xuICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAob3B0aW9ucy5jbG9zZU9uQmx1ciAhPT0gZmFsc2UpIENvZGVNaXJyb3Iub24oaW5wLCBcImJsdXJcIiwgY2xvc2UpO1xuXG4gICAgICBpbnAuZm9jdXMoKTtcbiAgICB9IGVsc2UgaWYgKGJ1dHRvbiA9IGRpYWxvZy5nZXRFbGVtZW50c0J5VGFnTmFtZShcImJ1dHRvblwiKVswXSkge1xuICAgICAgQ29kZU1pcnJvci5vbihidXR0b24sIFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGNsb3NlKCk7XG4gICAgICAgIG1lLmZvY3VzKCk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKG9wdGlvbnMuY2xvc2VPbkJsdXIgIT09IGZhbHNlKSBDb2RlTWlycm9yLm9uKGJ1dHRvbiwgXCJibHVyXCIsIGNsb3NlKTtcblxuICAgICAgYnV0dG9uLmZvY3VzKCk7XG4gICAgfVxuICAgIHJldHVybiBjbG9zZTtcbiAgfSk7XG5cbiAgQ29kZU1pcnJvci5kZWZpbmVFeHRlbnNpb24oXCJvcGVuTm90aWZpY2F0aW9uXCIsIGZ1bmN0aW9uKHRlbXBsYXRlLCBvcHRpb25zKSB7XG4gICAgaWYgKHRoaXMudmlydHVhbFNlbGVjdGlvbk1vZGUoKSkgcmV0dXJuO1xuICAgIGNsb3NlTm90aWZpY2F0aW9uKHRoaXMsIGNsb3NlKTtcbiAgICB2YXIgZGlhbG9nID0gZGlhbG9nRGl2KHRoaXMsIHRlbXBsYXRlLCBvcHRpb25zICYmIG9wdGlvbnMuYm90dG9tKTtcbiAgICB2YXIgY2xvc2VkID0gZmFsc2UsIGRvbmVUaW1lcjtcbiAgICB2YXIgZHVyYXRpb24gPSBvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLmR1cmF0aW9uICE9PSBcInVuZGVmaW5lZFwiID8gb3B0aW9ucy5kdXJhdGlvbiA6IDUwMDA7XG5cbiAgICBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgIGlmIChjbG9zZWQpIHJldHVybjtcbiAgICAgIGNsb3NlZCA9IHRydWU7XG4gICAgICBjbGVhclRpbWVvdXQoZG9uZVRpbWVyKTtcbiAgICAgIGRpYWxvZy5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBDb2RlTWlycm9yLm9uKGRpYWxvZywgJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgQ29kZU1pcnJvci5lX3ByZXZlbnREZWZhdWx0KGUpO1xuICAgICAgY2xvc2UoKTtcbiAgICB9KTtcblxuICAgIGlmIChkdXJhdGlvbilcbiAgICAgIGRvbmVUaW1lciA9IHNldFRpbWVvdXQoY2xvc2UsIGR1cmF0aW9uKTtcblxuICAgIHJldHVybiBjbG9zZTtcbiAgfSk7XG59KSgpO1xuXG5cbiAgdmFyIFBvcyA9IENvZGVNaXJyb3IuUG9zO1xuXG4gIGZ1bmN0aW9uIHRyYW5zZm9ybUN1cnNvcihjbSwgcmFuZ2UpIHtcbiAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgIGlmICghdmltIHx8IHZpbS5pbnNlcnRNb2RlKSByZXR1cm4gcmFuZ2UuaGVhZDtcbiAgICB2YXIgaGVhZCA9IHZpbS5zZWwuaGVhZDtcbiAgICBpZiAoIWhlYWQpICByZXR1cm4gcmFuZ2UuaGVhZDtcblxuICAgIGlmICh2aW0udmlzdWFsQmxvY2spIHtcbiAgICAgIGlmIChyYW5nZS5oZWFkLmxpbmUgIT0gaGVhZC5saW5lKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHJhbmdlLmZyb20oKSA9PSByYW5nZS5hbmNob3IgJiYgIXJhbmdlLmVtcHR5KCkpIHtcbiAgICAgIGlmIChyYW5nZS5oZWFkLmxpbmUgPT0gaGVhZC5saW5lICYmIHJhbmdlLmhlYWQuY2ggIT0gaGVhZC5jaClcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MocmFuZ2UuaGVhZC5saW5lLCByYW5nZS5oZWFkLmNoIC0gMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJhbmdlLmhlYWQ7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVTZWxlY3Rpb25Gb3JTdXJyb2dhdGVDaGFyYWN0ZXJzKGNtLCBjdXJTdGFydCwgY3VyRW5kKSB7XG4gICAgLy8gc3RhcnQgYW5kIGNoYXJhY3RlciBwb3NpdGlvbiB3aGVuIG5vIHNlbGVjdGlvbiBcbiAgICAvLyBpcyB0aGUgc2FtZSBpbiB2aXN1YWwgbW9kZSwgYW5kIGRpZmZlcnMgaW4gMSBjaGFyYWN0ZXIgaW4gbm9ybWFsIG1vZGVcbiAgICBpZiAoY3VyU3RhcnQubGluZSA9PT0gY3VyRW5kLmxpbmUgJiYgY3VyU3RhcnQuY2ggPj0gY3VyRW5kLmNoIC0gMSkge1xuICAgICAgdmFyIHRleHQgPSBjbS5nZXRMaW5lKGN1clN0YXJ0LmxpbmUpO1xuICAgICAgdmFyIGNoYXJDb2RlID0gdGV4dC5jaGFyQ29kZUF0KGN1clN0YXJ0LmNoKTtcbiAgICAgIGlmICgweEQ4MDAgPD0gY2hhckNvZGUgJiYgY2hhckNvZGUgPD0gMHhEOEZGKSB7XG4gICAgICAgIGN1ckVuZC5jaCArPSAxO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7c3RhcnQ6IGN1clN0YXJ0LCBlbmQ6IGN1ckVuZH07XG4gIH1cblxuICB2YXIgZGVmYXVsdEtleW1hcCA9IFtcbiAgICAvLyBLZXkgdG8ga2V5IG1hcHBpbmcuIFRoaXMgZ29lcyBmaXJzdCB0byBtYWtlIGl0IHBvc3NpYmxlIHRvIG92ZXJyaWRlXG4gICAgLy8gZXhpc3RpbmcgbWFwcGluZ3MuXG4gICAgeyBrZXlzOiAnPExlZnQ+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnaCcgfSxcbiAgICB7IGtleXM6ICc8UmlnaHQ+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnbCcgfSxcbiAgICB7IGtleXM6ICc8VXA+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnaycgfSxcbiAgICB7IGtleXM6ICc8RG93bj4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdqJyB9LFxuICAgIHsga2V5czogJ2c8VXA+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnZ2snIH0sXG4gICAgeyBrZXlzOiAnZzxEb3duPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2dqJyB9LFxuICAgIHsga2V5czogJzxTcGFjZT4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdsJyB9LFxuICAgIHsga2V5czogJzxCUz4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdoJywgY29udGV4dDogJ25vcm1hbCd9LFxuICAgIHsga2V5czogJzxEZWw+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAneCcsIGNvbnRleHQ6ICdub3JtYWwnfSxcbiAgICB7IGtleXM6ICc8Qy1TcGFjZT4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdXJyB9LFxuICAgIHsga2V5czogJzxDLUJTPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ0InLCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJzxTLVNwYWNlPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ3cnIH0sXG4gICAgeyBrZXlzOiAnPFMtQlM+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnYicsIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnPEMtbj4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdqJyB9LFxuICAgIHsga2V5czogJzxDLXA+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnaycgfSxcbiAgICB7IGtleXM6ICc8Qy1bPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJzxFc2M+JyB9LFxuICAgIHsga2V5czogJzxDLWM+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnPEVzYz4nIH0sXG4gICAgeyBrZXlzOiAnPEMtWz4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICc8RXNjPicsIGNvbnRleHQ6ICdpbnNlcnQnIH0sXG4gICAgeyBrZXlzOiAnPEMtYz4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICc8RXNjPicsIGNvbnRleHQ6ICdpbnNlcnQnIH0sXG4gICAgeyBrZXlzOiAnPEMtRXNjPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJzxFc2M+JyB9LCAvLyBpcGFkIGtleWJvYXJkIHNlbmRzIEMtRXNjIGluc3RlYWQgb2YgQy1bXG4gICAgeyBrZXlzOiAnPEMtRXNjPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJzxFc2M+JywgY29udGV4dDogJ2luc2VydCcgfSxcbiAgICB7IGtleXM6ICdzJywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnY2wnLCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ3MnLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdjJywgY29udGV4dDogJ3Zpc3VhbCd9LFxuICAgIHsga2V5czogJ1MnLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICdjYycsIGNvbnRleHQ6ICdub3JtYWwnIH0sXG4gICAgeyBrZXlzOiAnUycsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ1ZkTycsIGNvbnRleHQ6ICd2aXN1YWwnIH0sXG4gICAgeyBrZXlzOiAnPEhvbWU+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnMCcgfSxcbiAgICB7IGtleXM6ICc8RW5kPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJyQnIH0sXG4gICAgeyBrZXlzOiAnPFBhZ2VVcD4nLCB0eXBlOiAna2V5VG9LZXknLCB0b0tleXM6ICc8Qy1iPicgfSxcbiAgICB7IGtleXM6ICc8UGFnZURvd24+JywgdHlwZTogJ2tleVRvS2V5JywgdG9LZXlzOiAnPEMtZj4nIH0sXG4gICAgeyBrZXlzOiAnPENSPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2peJywgY29udGV4dDogJ25vcm1hbCcgfSxcbiAgICB7IGtleXM6ICc8SW5zPicsIHR5cGU6ICdrZXlUb0tleScsIHRvS2V5czogJ2knLCBjb250ZXh0OiAnbm9ybWFsJ30sXG4gICAgeyBrZXlzOiAnPElucz4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAndG9nZ2xlT3ZlcndyaXRlJywgY29udGV4dDogJ2luc2VydCcgfSxcbiAgICAvLyBNb3Rpb25zXG4gICAgeyBrZXlzOiAnSCcsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9Ub3BMaW5lJywgbW90aW9uQXJnczogeyBsaW5ld2lzZTogdHJ1ZSwgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdNJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb01pZGRsZUxpbmUnLCBtb3Rpb25BcmdzOiB7IGxpbmV3aXNlOiB0cnVlLCB0b0p1bXBsaXN0OiB0cnVlIH19LFxuICAgIHsga2V5czogJ0wnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvQm90dG9tTGluZScsIG1vdGlvbkFyZ3M6IHsgbGluZXdpc2U6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnaCcsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlDaGFyYWN0ZXJzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSB9fSxcbiAgICB7IGtleXM6ICdsJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeUNoYXJhY3RlcnMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnaicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlMaW5lcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgbGluZXdpc2U6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnaycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlMaW5lcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIGxpbmV3aXNlOiB0cnVlIH19LFxuICAgIHsga2V5czogJ2dqJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeURpc3BsYXlMaW5lcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdnaycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlEaXNwbGF5TGluZXMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJ3cnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5V29yZHMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHdvcmRFbmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJ1cnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5V29yZHMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHdvcmRFbmQ6IGZhbHNlLCBiaWdXb3JkOiB0cnVlIH19LFxuICAgIHsga2V5czogJ2UnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5V29yZHMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHdvcmRFbmQ6IHRydWUsIGluY2x1c2l2ZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdFJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVdvcmRzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlLCB3b3JkRW5kOiB0cnVlLCBiaWdXb3JkOiB0cnVlLCBpbmNsdXNpdmU6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnYicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHdvcmRFbmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJ0InLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5V29yZHMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCB3b3JkRW5kOiBmYWxzZSwgYmlnV29yZDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdnZScsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHdvcmRFbmQ6IHRydWUsIGluY2x1c2l2ZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdnRScsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlXb3JkcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHdvcmRFbmQ6IHRydWUsIGJpZ1dvcmQ6IHRydWUsIGluY2x1c2l2ZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICd7JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVBhcmFncmFwaCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnfScsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlQYXJhZ3JhcGgnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnKCcsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlTZW50ZW5jZScsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UgfX0sXG4gICAgeyBrZXlzOiAnKScsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlTZW50ZW5jZScsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICc8Qy1mPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlQYWdlJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlIH19LFxuICAgIHsga2V5czogJzxDLWI+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVBhZ2UnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJzxDLWQ+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVCeVNjcm9sbCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgZXhwbGljaXRSZXBlYXQ6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnPEMtdT4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5U2Nyb2xsJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgZXhwbGljaXRSZXBlYXQ6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnZ2cnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvTGluZU9yRWRnZU9mRG9jdW1lbnQnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCBleHBsaWNpdFJlcGVhdDogdHJ1ZSwgbGluZXdpc2U6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnRycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9MaW5lT3JFZGdlT2ZEb2N1bWVudCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgZXhwbGljaXRSZXBlYXQ6IHRydWUsIGxpbmV3aXNlOiB0cnVlLCB0b0p1bXBsaXN0OiB0cnVlIH19LFxuICAgIHtrZXlzOiBcImckXCIsIHR5cGU6IFwibW90aW9uXCIsIG1vdGlvbjogXCJtb3ZlVG9FbmRPZkRpc3BsYXlMaW5lXCJ9LFxuICAgIHtrZXlzOiBcImdeXCIsIHR5cGU6IFwibW90aW9uXCIsIG1vdGlvbjogXCJtb3ZlVG9TdGFydE9mRGlzcGxheUxpbmVcIn0sXG4gICAge2tleXM6IFwiZzBcIiwgdHlwZTogXCJtb3Rpb25cIiwgbW90aW9uOiBcIm1vdmVUb1N0YXJ0T2ZEaXNwbGF5TGluZVwifSxcbiAgICB7IGtleXM6ICcwJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb1N0YXJ0T2ZMaW5lJyB9LFxuICAgIHsga2V5czogJ14nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyJyB9LFxuICAgIHsga2V5czogJysnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZUJ5TGluZXMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHRvRmlyc3RDaGFyOnRydWUgfX0sXG4gICAgeyBrZXlzOiAnLScsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlMaW5lcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHRvRmlyc3RDaGFyOnRydWUgfX0sXG4gICAgeyBrZXlzOiAnXycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlQnlMaW5lcycsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgdG9GaXJzdENoYXI6dHJ1ZSwgcmVwZWF0T2Zmc2V0Oi0xIH19LFxuICAgIHsga2V5czogJyQnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvRW9sJywgbW90aW9uQXJnczogeyBpbmNsdXNpdmU6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnJScsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9NYXRjaGVkU3ltYm9sJywgbW90aW9uQXJnczogeyBpbmNsdXNpdmU6IHRydWUsIHRvSnVtcGxpc3Q6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnZjxjaGFyYWN0ZXI+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb0NoYXJhY3RlcicsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSAsIGluY2x1c2l2ZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdGPGNoYXJhY3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRvQ2hhcmFjdGVyJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSB9fSxcbiAgICB7IGtleXM6ICd0PGNoYXJhY3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRpbGxDaGFyYWN0ZXInLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIGluY2x1c2l2ZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdUPGNoYXJhY3Rlcj4nLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAnbW92ZVRpbGxDaGFyYWN0ZXInLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJzsnLCB0eXBlOiAnbW90aW9uJywgbW90aW9uOiAncmVwZWF0TGFzdENoYXJhY3RlclNlYXJjaCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICcsJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ3JlcGVhdExhc3RDaGFyYWN0ZXJTZWFyY2gnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlIH19LFxuICAgIHsga2V5czogJ1xcJzxjaGFyYWN0ZXI+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ2dvVG9NYXJrJywgbW90aW9uQXJnczoge3RvSnVtcGxpc3Q6IHRydWUsIGxpbmV3aXNlOiB0cnVlfX0sXG4gICAgeyBrZXlzOiAnYDxjaGFyYWN0ZXI+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ2dvVG9NYXJrJywgbW90aW9uQXJnczoge3RvSnVtcGxpc3Q6IHRydWV9fSxcbiAgICB7IGtleXM6ICddYCcsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdqdW1wVG9NYXJrJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICdbYCcsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdqdW1wVG9NYXJrJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSB9IH0sXG4gICAgeyBrZXlzOiAnXVxcJycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdqdW1wVG9NYXJrJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlLCBsaW5ld2lzZTogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnW1xcJycsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdqdW1wVG9NYXJrJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgbGluZXdpc2U6IHRydWUgfSB9LFxuICAgIC8vIHRoZSBuZXh0IHR3byBhcmVuJ3QgbW90aW9ucyBidXQgbXVzdCBjb21lIGJlZm9yZSBtb3JlIGdlbmVyYWwgbW90aW9uIGRlY2xhcmF0aW9uc1xuICAgIHsga2V5czogJ11wJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Bhc3RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGFmdGVyOiB0cnVlLCBpc0VkaXQ6IHRydWUsIG1hdGNoSW5kZW50OiB0cnVlfX0sXG4gICAgeyBrZXlzOiAnW3AnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncGFzdGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgYWZ0ZXI6IGZhbHNlLCBpc0VkaXQ6IHRydWUsIG1hdGNoSW5kZW50OiB0cnVlfX0sXG4gICAgeyBrZXlzOiAnXTxjaGFyYWN0ZXI+JywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb1N5bWJvbCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgdG9KdW1wbGlzdDogdHJ1ZX19LFxuICAgIHsga2V5czogJ1s8Y2hhcmFjdGVyPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9TeW1ib2wnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCB0b0p1bXBsaXN0OiB0cnVlfX0sXG4gICAgeyBrZXlzOiAnfCcsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdtb3ZlVG9Db2x1bW4nfSxcbiAgICB7IGtleXM6ICdvJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb090aGVySGlnaGxpZ2h0ZWRFbmQnLCBjb250ZXh0Oid2aXN1YWwnfSxcbiAgICB7IGtleXM6ICdPJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ21vdmVUb090aGVySGlnaGxpZ2h0ZWRFbmQnLCBtb3Rpb25BcmdzOiB7c2FtZUxpbmU6IHRydWV9LCBjb250ZXh0Oid2aXN1YWwnfSxcbiAgICAvLyBPcGVyYXRvcnNcbiAgICB7IGtleXM6ICdkJywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdkZWxldGUnIH0sXG4gICAgeyBrZXlzOiAneScsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAneWFuaycgfSxcbiAgICB7IGtleXM6ICdjJywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdjaGFuZ2UnIH0sXG4gICAgeyBrZXlzOiAnPScsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnaW5kZW50QXV0bycgfSxcbiAgICB7IGtleXM6ICc+JywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdpbmRlbnQnLCBvcGVyYXRvckFyZ3M6IHsgaW5kZW50UmlnaHQ6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnPCcsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnaW5kZW50Jywgb3BlcmF0b3JBcmdzOiB7IGluZGVudFJpZ2h0OiBmYWxzZSB9fSxcbiAgICB7IGtleXM6ICdnficsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnY2hhbmdlQ2FzZScgfSxcbiAgICB7IGtleXM6ICdndScsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnY2hhbmdlQ2FzZScsIG9wZXJhdG9yQXJnczoge3RvTG93ZXI6IHRydWV9LCBpc0VkaXQ6IHRydWUgfSxcbiAgICB7IGtleXM6ICdnVScsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnY2hhbmdlQ2FzZScsIG9wZXJhdG9yQXJnczoge3RvTG93ZXI6IGZhbHNlfSwgaXNFZGl0OiB0cnVlIH0sXG4gICAgeyBrZXlzOiAnbicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdmaW5kTmV4dCcsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdOJywgdHlwZTogJ21vdGlvbicsIG1vdGlvbjogJ2ZpbmROZXh0JywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdnbicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdmaW5kQW5kU2VsZWN0TmV4dEluY2x1c2l2ZScsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdnTicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICdmaW5kQW5kU2VsZWN0TmV4dEluY2x1c2l2ZScsIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UgfX0sXG4gICAgLy8gT3BlcmF0b3ItTW90aW9uIGR1YWwgY29tbWFuZHNcbiAgICB7IGtleXM6ICd4JywgdHlwZTogJ29wZXJhdG9yTW90aW9uJywgb3BlcmF0b3I6ICdkZWxldGUnLCBtb3Rpb246ICdtb3ZlQnlDaGFyYWN0ZXJzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiB0cnVlIH0sIG9wZXJhdG9yTW90aW9uQXJnczogeyB2aXN1YWxMaW5lOiBmYWxzZSB9fSxcbiAgICB7IGtleXM6ICdYJywgdHlwZTogJ29wZXJhdG9yTW90aW9uJywgb3BlcmF0b3I6ICdkZWxldGUnLCBtb3Rpb246ICdtb3ZlQnlDaGFyYWN0ZXJzJywgbW90aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSB9LCBvcGVyYXRvck1vdGlvbkFyZ3M6IHsgdmlzdWFsTGluZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdEJywgdHlwZTogJ29wZXJhdG9yTW90aW9uJywgb3BlcmF0b3I6ICdkZWxldGUnLCBtb3Rpb246ICdtb3ZlVG9Fb2wnLCBtb3Rpb25BcmdzOiB7IGluY2x1c2l2ZTogdHJ1ZSB9LCBjb250ZXh0OiAnbm9ybWFsJ30sXG4gICAgeyBrZXlzOiAnRCcsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAnZGVsZXRlJywgb3BlcmF0b3JBcmdzOiB7IGxpbmV3aXNlOiB0cnVlIH0sIGNvbnRleHQ6ICd2aXN1YWwnfSxcbiAgICB7IGtleXM6ICdZJywgdHlwZTogJ29wZXJhdG9yTW90aW9uJywgb3BlcmF0b3I6ICd5YW5rJywgbW90aW9uOiAnZXhwYW5kVG9MaW5lJywgbW90aW9uQXJnczogeyBsaW5ld2lzZTogdHJ1ZSB9LCBjb250ZXh0OiAnbm9ybWFsJ30sXG4gICAgeyBrZXlzOiAnWScsIHR5cGU6ICdvcGVyYXRvcicsIG9wZXJhdG9yOiAneWFuaycsIG9wZXJhdG9yQXJnczogeyBsaW5ld2lzZTogdHJ1ZSB9LCBjb250ZXh0OiAndmlzdWFsJ30sXG4gICAgeyBrZXlzOiAnQycsIHR5cGU6ICdvcGVyYXRvck1vdGlvbicsIG9wZXJhdG9yOiAnY2hhbmdlJywgbW90aW9uOiAnbW92ZVRvRW9sJywgbW90aW9uQXJnczogeyBpbmNsdXNpdmU6IHRydWUgfSwgY29udGV4dDogJ25vcm1hbCd9LFxuICAgIHsga2V5czogJ0MnLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2NoYW5nZScsIG9wZXJhdG9yQXJnczogeyBsaW5ld2lzZTogdHJ1ZSB9LCBjb250ZXh0OiAndmlzdWFsJ30sXG4gICAgeyBrZXlzOiAnficsIHR5cGU6ICdvcGVyYXRvck1vdGlvbicsIG9wZXJhdG9yOiAnY2hhbmdlQ2FzZScsIG1vdGlvbjogJ21vdmVCeUNoYXJhY3RlcnMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUgfSwgb3BlcmF0b3JBcmdzOiB7IHNob3VsZE1vdmVDdXJzb3I6IHRydWUgfSwgY29udGV4dDogJ25vcm1hbCd9LFxuICAgIHsga2V5czogJ34nLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2NoYW5nZUNhc2UnLCBjb250ZXh0OiAndmlzdWFsJ30sXG4gICAgeyBrZXlzOiAnPEMtdT4nLCB0eXBlOiAnb3BlcmF0b3JNb3Rpb24nLCBvcGVyYXRvcjogJ2RlbGV0ZScsIG1vdGlvbjogJ21vdmVUb1N0YXJ0T2ZMaW5lJywgY29udGV4dDogJ2luc2VydCcgfSxcbiAgICB7IGtleXM6ICc8Qy13PicsIHR5cGU6ICdvcGVyYXRvck1vdGlvbicsIG9wZXJhdG9yOiAnZGVsZXRlJywgbW90aW9uOiAnbW92ZUJ5V29yZHMnLCBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IGZhbHNlLCB3b3JkRW5kOiBmYWxzZSB9LCBjb250ZXh0OiAnaW5zZXJ0JyB9LFxuICAgIC8vaWdub3JlIEMtdyBpbiBub3JtYWwgbW9kZVxuICAgIHsga2V5czogJzxDLXc+JywgdHlwZTogJ2lkbGUnLCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIC8vIEFjdGlvbnNcbiAgICB7IGtleXM6ICc8Qy1pPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdqdW1wTGlzdFdhbGsnLCBhY3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnPEMtbz4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnanVtcExpc3RXYWxrJywgYWN0aW9uQXJnczogeyBmb3J3YXJkOiBmYWxzZSB9fSxcbiAgICB7IGtleXM6ICc8Qy1lPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdzY3JvbGwnLCBhY3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIGxpbmV3aXNlOiB0cnVlIH19LFxuICAgIHsga2V5czogJzxDLXk+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbCcsIGFjdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIGxpbmV3aXNlOiB0cnVlIH19LFxuICAgIHsga2V5czogJ2EnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGluc2VydEF0OiAnY2hhckFmdGVyJyB9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ0EnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGluc2VydEF0OiAnZW9sJyB9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ0EnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGluc2VydEF0OiAnZW5kT2ZTZWxlY3RlZEFyZWEnIH0sIGNvbnRleHQ6ICd2aXN1YWwnIH0sXG4gICAgeyBrZXlzOiAnaScsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdlbnRlckluc2VydE1vZGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgaW5zZXJ0QXQ6ICdpbnBsYWNlJyB9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ2dpJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2VudGVySW5zZXJ0TW9kZScsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBpbnNlcnRBdDogJ2xhc3RFZGl0JyB9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ0knLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGluc2VydEF0OiAnZmlyc3ROb25CbGFuayd9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ2dJJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2VudGVySW5zZXJ0TW9kZScsIGlzRWRpdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBpbnNlcnRBdDogJ2JvbCd9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ0knLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGluc2VydEF0OiAnc3RhcnRPZlNlbGVjdGVkQXJlYScgfSwgY29udGV4dDogJ3Zpc3VhbCcgfSxcbiAgICB7IGtleXM6ICdvJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ25ld0xpbmVBbmRFbnRlckluc2VydE1vZGUnLCBpc0VkaXQ6IHRydWUsIGludGVybGFjZUluc2VydFJlcGVhdDogdHJ1ZSwgYWN0aW9uQXJnczogeyBhZnRlcjogdHJ1ZSB9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ08nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnbmV3TGluZUFuZEVudGVySW5zZXJ0TW9kZScsIGlzRWRpdDogdHJ1ZSwgaW50ZXJsYWNlSW5zZXJ0UmVwZWF0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGFmdGVyOiBmYWxzZSB9LCBjb250ZXh0OiAnbm9ybWFsJyB9LFxuICAgIHsga2V5czogJ3YnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAndG9nZ2xlVmlzdWFsTW9kZScgfSxcbiAgICB7IGtleXM6ICdWJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3RvZ2dsZVZpc3VhbE1vZGUnLCBhY3Rpb25BcmdzOiB7IGxpbmV3aXNlOiB0cnVlIH19LFxuICAgIHsga2V5czogJzxDLXY+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3RvZ2dsZVZpc3VhbE1vZGUnLCBhY3Rpb25BcmdzOiB7IGJsb2Nrd2lzZTogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICc8Qy1xPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICd0b2dnbGVWaXN1YWxNb2RlJywgYWN0aW9uQXJnczogeyBibG9ja3dpc2U6IHRydWUgfX0sXG4gICAgeyBrZXlzOiAnZ3YnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncmVzZWxlY3RMYXN0U2VsZWN0aW9uJyB9LFxuICAgIHsga2V5czogJ0onLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnam9pbkxpbmVzJywgaXNFZGl0OiB0cnVlIH0sXG4gICAgeyBrZXlzOiAnZ0onLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnam9pbkxpbmVzJywgYWN0aW9uQXJnczogeyBrZWVwU3BhY2VzOiB0cnVlIH0sIGlzRWRpdDogdHJ1ZSB9LFxuICAgIHsga2V5czogJ3AnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncGFzdGUnLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHsgYWZ0ZXI6IHRydWUsIGlzRWRpdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICdQJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Bhc3RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IGFmdGVyOiBmYWxzZSwgaXNFZGl0OiB0cnVlIH19LFxuICAgIHsga2V5czogJ3I8Y2hhcmFjdGVyPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdyZXBsYWNlJywgaXNFZGl0OiB0cnVlIH0sXG4gICAgeyBrZXlzOiAnQDxjaGFyYWN0ZXI+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3JlcGxheU1hY3JvJyB9LFxuICAgIHsga2V5czogJ3E8Y2hhcmFjdGVyPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdlbnRlck1hY3JvUmVjb3JkTW9kZScgfSxcbiAgICAvLyBIYW5kbGUgUmVwbGFjZS1tb2RlIGFzIGEgc3BlY2lhbCBjYXNlIG9mIGluc2VydCBtb2RlLlxuICAgIHsga2V5czogJ1InLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZW50ZXJJbnNlcnRNb2RlJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7IHJlcGxhY2U6IHRydWUgfSwgY29udGV4dDogJ25vcm1hbCd9LFxuICAgIHsga2V5czogJ1InLCB0eXBlOiAnb3BlcmF0b3InLCBvcGVyYXRvcjogJ2NoYW5nZScsIG9wZXJhdG9yQXJnczogeyBsaW5ld2lzZTogdHJ1ZSwgZnVsbExpbmU6IHRydWUgfSwgY29udGV4dDogJ3Zpc3VhbCcsIGV4aXRWaXN1YWxCbG9jazogdHJ1ZX0sXG4gICAgeyBrZXlzOiAndScsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICd1bmRvJywgY29udGV4dDogJ25vcm1hbCcgfSxcbiAgICB7IGtleXM6ICd1JywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdjaGFuZ2VDYXNlJywgb3BlcmF0b3JBcmdzOiB7dG9Mb3dlcjogdHJ1ZX0sIGNvbnRleHQ6ICd2aXN1YWwnLCBpc0VkaXQ6IHRydWUgfSxcbiAgICB7IGtleXM6ICdVJywgdHlwZTogJ29wZXJhdG9yJywgb3BlcmF0b3I6ICdjaGFuZ2VDYXNlJywgb3BlcmF0b3JBcmdzOiB7dG9Mb3dlcjogZmFsc2V9LCBjb250ZXh0OiAndmlzdWFsJywgaXNFZGl0OiB0cnVlIH0sXG4gICAgeyBrZXlzOiAnPEMtcj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncmVkbycgfSxcbiAgICB7IGtleXM6ICdtPGNoYXJhY3Rlcj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnc2V0TWFyaycgfSxcbiAgICB7IGtleXM6ICdcIjxjaGFyYWN0ZXI+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3NldFJlZ2lzdGVyJyB9LFxuICAgIHsga2V5czogJ3p6JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbFRvQ3Vyc29yJywgYWN0aW9uQXJnczogeyBwb3NpdGlvbjogJ2NlbnRlcicgfX0sXG4gICAgeyBrZXlzOiAnei4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnc2Nyb2xsVG9DdXJzb3InLCBhY3Rpb25BcmdzOiB7IHBvc2l0aW9uOiAnY2VudGVyJyB9LCBtb3Rpb246ICdtb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXInIH0sXG4gICAgeyBrZXlzOiAnenQnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnc2Nyb2xsVG9DdXJzb3InLCBhY3Rpb25BcmdzOiB7IHBvc2l0aW9uOiAndG9wJyB9fSxcbiAgICB7IGtleXM6ICd6PENSPicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdzY3JvbGxUb0N1cnNvcicsIGFjdGlvbkFyZ3M6IHsgcG9zaXRpb246ICd0b3AnIH0sIG1vdGlvbjogJ21vdmVUb0ZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcicgfSxcbiAgICB7IGtleXM6ICd6YicsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdzY3JvbGxUb0N1cnNvcicsIGFjdGlvbkFyZ3M6IHsgcG9zaXRpb246ICdib3R0b20nIH19LFxuICAgIHsga2V5czogJ3otJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ3Njcm9sbFRvQ3Vyc29yJywgYWN0aW9uQXJnczogeyBwb3NpdGlvbjogJ2JvdHRvbScgfSwgbW90aW9uOiAnbW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyJyB9LFxuICAgIHsga2V5czogJy4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAncmVwZWF0TGFzdEVkaXQnIH0sXG4gICAgeyBrZXlzOiAnPEMtYT4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnaW5jcmVtZW50TnVtYmVyVG9rZW4nLCBpc0VkaXQ6IHRydWUsIGFjdGlvbkFyZ3M6IHtpbmNyZWFzZTogdHJ1ZSwgYmFja3RyYWNrOiBmYWxzZX19LFxuICAgIHsga2V5czogJzxDLXg+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2luY3JlbWVudE51bWJlclRva2VuJywgaXNFZGl0OiB0cnVlLCBhY3Rpb25BcmdzOiB7aW5jcmVhc2U6IGZhbHNlLCBiYWNrdHJhY2s6IGZhbHNlfX0sXG4gICAgeyBrZXlzOiAnPEMtdD4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnaW5kZW50JywgYWN0aW9uQXJnczogeyBpbmRlbnRSaWdodDogdHJ1ZSB9LCBjb250ZXh0OiAnaW5zZXJ0JyB9LFxuICAgIHsga2V5czogJzxDLWQ+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2luZGVudCcsIGFjdGlvbkFyZ3M6IHsgaW5kZW50UmlnaHQ6IGZhbHNlIH0sIGNvbnRleHQ6ICdpbnNlcnQnIH0sXG4gICAgLy8gVGV4dCBvYmplY3QgbW90aW9uc1xuICAgIHsga2V5czogJ2E8Y2hhcmFjdGVyPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICd0ZXh0T2JqZWN0TWFuaXB1bGF0aW9uJyB9LFxuICAgIHsga2V5czogJ2k8Y2hhcmFjdGVyPicsIHR5cGU6ICdtb3Rpb24nLCBtb3Rpb246ICd0ZXh0T2JqZWN0TWFuaXB1bGF0aW9uJywgbW90aW9uQXJnczogeyB0ZXh0T2JqZWN0SW5uZXI6IHRydWUgfX0sXG4gICAgLy8gU2VhcmNoXG4gICAgeyBrZXlzOiAnLycsIHR5cGU6ICdzZWFyY2gnLCBzZWFyY2hBcmdzOiB7IGZvcndhcmQ6IHRydWUsIHF1ZXJ5U3JjOiAncHJvbXB0JywgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICc/JywgdHlwZTogJ3NlYXJjaCcsIHNlYXJjaEFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHF1ZXJ5U3JjOiAncHJvbXB0JywgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICB7IGtleXM6ICcqJywgdHlwZTogJ3NlYXJjaCcsIHNlYXJjaEFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgcXVlcnlTcmM6ICd3b3JkVW5kZXJDdXJzb3InLCB3aG9sZVdvcmRPbmx5OiB0cnVlLCB0b0p1bXBsaXN0OiB0cnVlIH19LFxuICAgIHsga2V5czogJyMnLCB0eXBlOiAnc2VhcmNoJywgc2VhcmNoQXJnczogeyBmb3J3YXJkOiBmYWxzZSwgcXVlcnlTcmM6ICd3b3JkVW5kZXJDdXJzb3InLCB3aG9sZVdvcmRPbmx5OiB0cnVlLCB0b0p1bXBsaXN0OiB0cnVlIH19LFxuICAgIHsga2V5czogJ2cqJywgdHlwZTogJ3NlYXJjaCcsIHNlYXJjaEFyZ3M6IHsgZm9yd2FyZDogdHJ1ZSwgcXVlcnlTcmM6ICd3b3JkVW5kZXJDdXJzb3InLCB0b0p1bXBsaXN0OiB0cnVlIH19LFxuICAgIHsga2V5czogJ2cjJywgdHlwZTogJ3NlYXJjaCcsIHNlYXJjaEFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIHF1ZXJ5U3JjOiAnd29yZFVuZGVyQ3Vyc29yJywgdG9KdW1wbGlzdDogdHJ1ZSB9fSxcbiAgICAvLyBFeCBjb21tYW5kXG4gICAgeyBrZXlzOiAnOicsIHR5cGU6ICdleCcgfVxuICBdO1xuICB2YXIgZGVmYXVsdEtleW1hcExlbmd0aCA9IGRlZmF1bHRLZXltYXAubGVuZ3RoO1xuXG4gIC8qKlxuICAgKiBFeCBjb21tYW5kc1xuICAgKiBDYXJlIG11c3QgYmUgdGFrZW4gd2hlbiBhZGRpbmcgdG8gdGhlIGRlZmF1bHQgRXggY29tbWFuZCBtYXAuIEZvciBhbnlcbiAgICogcGFpciBvZiBjb21tYW5kcyB0aGF0IGhhdmUgYSBzaGFyZWQgcHJlZml4LCBhdCBsZWFzdCBvbmUgb2YgdGhlaXJcbiAgICogc2hvcnROYW1lcyBtdXN0IG5vdCBtYXRjaCB0aGUgcHJlZml4IG9mIHRoZSBvdGhlciBjb21tYW5kLlxuICAgKi9cbiAgdmFyIGRlZmF1bHRFeENvbW1hbmRNYXAgPSBbXG4gICAgeyBuYW1lOiAnY29sb3JzY2hlbWUnLCBzaG9ydE5hbWU6ICdjb2xvJyB9LFxuICAgIHsgbmFtZTogJ21hcCcgfSxcbiAgICB7IG5hbWU6ICdpbWFwJywgc2hvcnROYW1lOiAnaW0nIH0sXG4gICAgeyBuYW1lOiAnbm1hcCcsIHNob3J0TmFtZTogJ25tJyB9LFxuICAgIHsgbmFtZTogJ3ZtYXAnLCBzaG9ydE5hbWU6ICd2bScgfSxcbiAgICB7IG5hbWU6ICd1bm1hcCcgfSxcbiAgICB7IG5hbWU6ICd3cml0ZScsIHNob3J0TmFtZTogJ3cnIH0sXG4gICAgeyBuYW1lOiAndW5kbycsIHNob3J0TmFtZTogJ3UnIH0sXG4gICAgeyBuYW1lOiAncmVkbycsIHNob3J0TmFtZTogJ3JlZCcgfSxcbiAgICB7IG5hbWU6ICdzZXQnLCBzaG9ydE5hbWU6ICdzZScgfSxcbiAgICB7IG5hbWU6ICdzZXRsb2NhbCcsIHNob3J0TmFtZTogJ3NldGwnIH0sXG4gICAgeyBuYW1lOiAnc2V0Z2xvYmFsJywgc2hvcnROYW1lOiAnc2V0ZycgfSxcbiAgICB7IG5hbWU6ICdzb3J0Jywgc2hvcnROYW1lOiAnc29yJyB9LFxuICAgIHsgbmFtZTogJ3N1YnN0aXR1dGUnLCBzaG9ydE5hbWU6ICdzJywgcG9zc2libHlBc3luYzogdHJ1ZSB9LFxuICAgIHsgbmFtZTogJ25vaGxzZWFyY2gnLCBzaG9ydE5hbWU6ICdub2gnIH0sXG4gICAgeyBuYW1lOiAneWFuaycsIHNob3J0TmFtZTogJ3knIH0sXG4gICAgeyBuYW1lOiAnZGVsbWFya3MnLCBzaG9ydE5hbWU6ICdkZWxtJyB9LFxuICAgIHsgbmFtZTogJ3JlZ2lzdGVycycsIHNob3J0TmFtZTogJ3JlZycsIGV4Y2x1ZGVGcm9tQ29tbWFuZEhpc3Rvcnk6IHRydWUgfSxcbiAgICB7IG5hbWU6ICd2Z2xvYmFsJywgc2hvcnROYW1lOiAndicgfSxcbiAgICB7IG5hbWU6ICdnbG9iYWwnLCBzaG9ydE5hbWU6ICdnJyB9XG4gIF07XG5cbiAgICBmdW5jdGlvbiBlbnRlclZpbU1vZGUoY20pIHtcbiAgICAgIGNtLnNldE9wdGlvbignZGlzYWJsZUlucHV0JywgdHJ1ZSk7XG4gICAgICBjbS5zZXRPcHRpb24oJ3Nob3dDdXJzb3JXaGVuU2VsZWN0aW5nJywgZmFsc2UpO1xuICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sIFwidmltLW1vZGUtY2hhbmdlXCIsIHttb2RlOiBcIm5vcm1hbFwifSk7XG4gICAgICBjbS5vbignY3Vyc29yQWN0aXZpdHknLCBvbkN1cnNvckFjdGl2aXR5KTtcbiAgICAgIG1heWJlSW5pdFZpbVN0YXRlKGNtKTtcbiAgICAgIENvZGVNaXJyb3Iub24oY20uZ2V0SW5wdXRGaWVsZCgpLCAncGFzdGUnLCBnZXRPblBhc3RlRm4oY20pKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsZWF2ZVZpbU1vZGUoY20pIHtcbiAgICAgIGNtLnNldE9wdGlvbignZGlzYWJsZUlucHV0JywgZmFsc2UpO1xuICAgICAgY20ub2ZmKCdjdXJzb3JBY3Rpdml0eScsIG9uQ3Vyc29yQWN0aXZpdHkpO1xuICAgICAgQ29kZU1pcnJvci5vZmYoY20uZ2V0SW5wdXRGaWVsZCgpLCAncGFzdGUnLCBnZXRPblBhc3RlRm4oY20pKTtcbiAgICAgIGNtLnN0YXRlLnZpbSA9IG51bGw7XG4gICAgICBpZiAoaGlnaGxpZ2h0VGltZW91dCkgY2xlYXJUaW1lb3V0KGhpZ2hsaWdodFRpbWVvdXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRldGFjaFZpbU1hcChjbSwgbmV4dCkge1xuICAgICAgaWYgKHRoaXMgPT0gQ29kZU1pcnJvci5rZXlNYXAudmltKSB7XG4gICAgICAgIGNtLm9wdGlvbnMuJGN1c3RvbUN1cnNvciA9IG51bGw7XG4gICAgICAgIENvZGVNaXJyb3Iucm1DbGFzcyhjbS5nZXRXcmFwcGVyRWxlbWVudCgpLCBcImNtLWZhdC1jdXJzb3JcIik7XG4gICAgICB9XG5cbiAgICAgIGlmICghbmV4dCB8fCBuZXh0LmF0dGFjaCAhPSBhdHRhY2hWaW1NYXApXG4gICAgICAgIGxlYXZlVmltTW9kZShjbSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGF0dGFjaFZpbU1hcChjbSwgcHJldikge1xuICAgICAgaWYgKHRoaXMgPT0gQ29kZU1pcnJvci5rZXlNYXAudmltKSB7XG4gICAgICAgIGlmIChjbS5jdXJPcCkgY20uY3VyT3Auc2VsZWN0aW9uQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIGNtLm9wdGlvbnMuJGN1c3RvbUN1cnNvciA9IHRyYW5zZm9ybUN1cnNvcjtcbiAgICAgICAgQ29kZU1pcnJvci5hZGRDbGFzcyhjbS5nZXRXcmFwcGVyRWxlbWVudCgpLCBcImNtLWZhdC1jdXJzb3JcIik7XG4gICAgICB9XG5cbiAgICAgIGlmICghcHJldiB8fCBwcmV2LmF0dGFjaCAhPSBhdHRhY2hWaW1NYXApXG4gICAgICAgIGVudGVyVmltTW9kZShjbSk7XG4gICAgfVxuXG4gICAgLy8gRGVwcmVjYXRlZCwgc2ltcGx5IHNldHRpbmcgdGhlIGtleW1hcCB3b3JrcyBhZ2Fpbi5cbiAgICBDb2RlTWlycm9yLmRlZmluZU9wdGlvbigndmltTW9kZScsIGZhbHNlLCBmdW5jdGlvbihjbSwgdmFsLCBwcmV2KSB7XG4gICAgICBpZiAodmFsICYmIGNtLmdldE9wdGlvbihcImtleU1hcFwiKSAhPSBcInZpbVwiKVxuICAgICAgICBjbS5zZXRPcHRpb24oXCJrZXlNYXBcIiwgXCJ2aW1cIik7XG4gICAgICBlbHNlIGlmICghdmFsICYmIHByZXYgIT0gQ29kZU1pcnJvci5Jbml0ICYmIC9edmltLy50ZXN0KGNtLmdldE9wdGlvbihcImtleU1hcFwiKSkpXG4gICAgICAgIGNtLnNldE9wdGlvbihcImtleU1hcFwiLCBcImRlZmF1bHRcIik7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBjbUtleShrZXksIGNtKSB7XG4gICAgICBpZiAoIWNtKSB7IHJldHVybiB1bmRlZmluZWQ7IH1cbiAgICAgIGlmICh0aGlzW2tleV0pIHsgcmV0dXJuIHRoaXNba2V5XTsgfVxuICAgICAgdmFyIHZpbUtleSA9IGNtS2V5VG9WaW1LZXkoa2V5KTtcbiAgICAgIGlmICghdmltS2V5KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHZhciBjbWQgPSB2aW1BcGkuZmluZEtleShjbSwgdmltS2V5KTtcbiAgICAgIGlmICh0eXBlb2YgY21kID09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sICd2aW0ta2V5cHJlc3MnLCB2aW1LZXkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNtZDtcbiAgICB9XG5cbiAgICB2YXIgbW9kaWZpZXJzID0ge1NoaWZ0OidTJyxDdHJsOidDJyxBbHQ6J0EnLENtZDonRCcsTW9kOidBJyxDYXBzTG9jazonJ307XG4gICAgdmFyIHNwZWNpYWxLZXlzID0ge0VudGVyOidDUicsQmFja3NwYWNlOidCUycsRGVsZXRlOidEZWwnLEluc2VydDonSW5zJ307XG4gICAgZnVuY3Rpb24gY21LZXlUb1ZpbUtleShrZXkpIHtcbiAgICAgIGlmIChrZXkuY2hhckF0KDApID09ICdcXCcnKSB7XG4gICAgICAgIC8vIEtleXByZXNzIGNoYXJhY3RlciBiaW5kaW5nIG9mIGZvcm1hdCBcIidhJ1wiXG4gICAgICAgIHJldHVybiBrZXkuY2hhckF0KDEpO1xuICAgICAgfVxuICAgICAgdmFyIHBpZWNlcyA9IGtleS5zcGxpdCgvLSg/ISQpLyk7XG4gICAgICB2YXIgbGFzdFBpZWNlID0gcGllY2VzW3BpZWNlcy5sZW5ndGggLSAxXTtcbiAgICAgIGlmIChwaWVjZXMubGVuZ3RoID09IDEgJiYgcGllY2VzWzBdLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIC8vIE5vLW1vZGlmaWVyIGJpbmRpbmdzIHVzZSBsaXRlcmFsIGNoYXJhY3RlciBiaW5kaW5ncyBhYm92ZS4gU2tpcC5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSBlbHNlIGlmIChwaWVjZXMubGVuZ3RoID09IDIgJiYgcGllY2VzWzBdID09ICdTaGlmdCcgJiYgbGFzdFBpZWNlLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgIC8vIElnbm9yZSBTaGlmdCtjaGFyIGJpbmRpbmdzIGFzIHRoZXkgc2hvdWxkIGJlIGhhbmRsZWQgYnkgbGl0ZXJhbCBjaGFyYWN0ZXIuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHZhciBoYXNDaGFyYWN0ZXIgPSBmYWxzZTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGllY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBwaWVjZSA9IHBpZWNlc1tpXTtcbiAgICAgICAgaWYgKHBpZWNlIGluIG1vZGlmaWVycykgeyBwaWVjZXNbaV0gPSBtb2RpZmllcnNbcGllY2VdOyB9XG4gICAgICAgIGVsc2UgeyBoYXNDaGFyYWN0ZXIgPSB0cnVlOyB9XG4gICAgICAgIGlmIChwaWVjZSBpbiBzcGVjaWFsS2V5cykgeyBwaWVjZXNbaV0gPSBzcGVjaWFsS2V5c1twaWVjZV07IH1cbiAgICAgIH1cbiAgICAgIGlmICghaGFzQ2hhcmFjdGVyKSB7XG4gICAgICAgIC8vIFZpbSBkb2VzIG5vdCBzdXBwb3J0IG1vZGlmaWVyIG9ubHkga2V5cy5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgLy8gVE9ETzogQ3VycmVudCBiaW5kaW5ncyBleHBlY3QgdGhlIGNoYXJhY3RlciB0byBiZSBsb3dlciBjYXNlLCBidXRcbiAgICAgIC8vIGl0IGxvb2tzIGxpa2UgdmltIGtleSBub3RhdGlvbiB1c2VzIHVwcGVyIGNhc2UuXG4gICAgICBpZiAoaXNVcHBlckNhc2UobGFzdFBpZWNlKSkge1xuICAgICAgICBwaWVjZXNbcGllY2VzLmxlbmd0aCAtIDFdID0gbGFzdFBpZWNlLnRvTG93ZXJDYXNlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gJzwnICsgcGllY2VzLmpvaW4oJy0nKSArICc+JztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRPblBhc3RlRm4oY20pIHtcbiAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICBpZiAoIXZpbS5vblBhc3RlRm4pIHtcbiAgICAgICAgdmltLm9uUGFzdGVGbiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICghdmltLmluc2VydE1vZGUpIHtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihvZmZzZXRDdXJzb3IoY20uZ2V0Q3Vyc29yKCksIDAsIDEpKTtcbiAgICAgICAgICAgIGFjdGlvbnMuZW50ZXJJbnNlcnRNb2RlKGNtLCB7fSwgdmltKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4gdmltLm9uUGFzdGVGbjtcbiAgICB9XG5cbiAgICB2YXIgbnVtYmVyUmVnZXggPSAvW1xcZF0vO1xuICAgIHZhciB3b3JkQ2hhclRlc3QgPSBbQ29kZU1pcnJvci5pc1dvcmRDaGFyLCBmdW5jdGlvbihjaCkge1xuICAgICAgcmV0dXJuIGNoICYmICFDb2RlTWlycm9yLmlzV29yZENoYXIoY2gpICYmICEvXFxzLy50ZXN0KGNoKTtcbiAgICB9XSwgYmlnV29yZENoYXJUZXN0ID0gW2Z1bmN0aW9uKGNoKSB7XG4gICAgICByZXR1cm4gL1xcUy8udGVzdChjaCk7XG4gICAgfV07XG4gICAgZnVuY3Rpb24gbWFrZUtleVJhbmdlKHN0YXJ0LCBzaXplKSB7XG4gICAgICB2YXIga2V5cyA9IFtdO1xuICAgICAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgc3RhcnQgKyBzaXplOyBpKyspIHtcbiAgICAgICAga2V5cy5wdXNoKFN0cmluZy5mcm9tQ2hhckNvZGUoaSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGtleXM7XG4gICAgfVxuICAgIHZhciB1cHBlckNhc2VBbHBoYWJldCA9IG1ha2VLZXlSYW5nZSg2NSwgMjYpO1xuICAgIHZhciBsb3dlckNhc2VBbHBoYWJldCA9IG1ha2VLZXlSYW5nZSg5NywgMjYpO1xuICAgIHZhciBudW1iZXJzID0gbWFrZUtleVJhbmdlKDQ4LCAxMCk7XG4gICAgdmFyIHZhbGlkTWFya3MgPSBbXS5jb25jYXQodXBwZXJDYXNlQWxwaGFiZXQsIGxvd2VyQ2FzZUFscGhhYmV0LCBudW1iZXJzLCBbJzwnLCAnPiddKTtcbiAgICB2YXIgdmFsaWRSZWdpc3RlcnMgPSBbXS5jb25jYXQodXBwZXJDYXNlQWxwaGFiZXQsIGxvd2VyQ2FzZUFscGhhYmV0LCBudW1iZXJzLCBbJy0nLCAnXCInLCAnLicsICc6JywgJ18nLCAnLycsICcrJ10pO1xuICAgIHZhciB1cHBlckNhc2VDaGFycztcbiAgICB0cnkgeyB1cHBlckNhc2VDaGFycyA9IG5ldyBSZWdFeHAoXCJeW1xcXFxwe0x1fV0kXCIsIFwidVwiKTsgfVxuICAgIGNhdGNoIChfKSB7IHVwcGVyQ2FzZUNoYXJzID0gL15bQS1aXSQvOyB9XG5cbiAgICBmdW5jdGlvbiBpc0xpbmUoY20sIGxpbmUpIHtcbiAgICAgIHJldHVybiBsaW5lID49IGNtLmZpcnN0TGluZSgpICYmIGxpbmUgPD0gY20ubGFzdExpbmUoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNMb3dlckNhc2Uoaykge1xuICAgICAgcmV0dXJuICgvXlthLXpdJC8pLnRlc3Qoayk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzTWF0Y2hhYmxlU3ltYm9sKGspIHtcbiAgICAgIHJldHVybiAnKClbXXt9Jy5pbmRleE9mKGspICE9IC0xO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc051bWJlcihrKSB7XG4gICAgICByZXR1cm4gbnVtYmVyUmVnZXgudGVzdChrKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaXNVcHBlckNhc2Uoaykge1xuICAgICAgcmV0dXJuIHVwcGVyQ2FzZUNoYXJzLnRlc3Qoayk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGlzV2hpdGVTcGFjZVN0cmluZyhrKSB7XG4gICAgICByZXR1cm4gKC9eXFxzKiQvKS50ZXN0KGspO1xuICAgIH1cbiAgICBmdW5jdGlvbiBpc0VuZE9mU2VudGVuY2VTeW1ib2woaykge1xuICAgICAgcmV0dXJuICcuPyEnLmluZGV4T2YoaykgIT0gLTE7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGluQXJyYXkodmFsLCBhcnIpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChhcnJbaV0gPT0gdmFsKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgb3B0aW9ucyA9IHt9O1xuICAgIGZ1bmN0aW9uIGRlZmluZU9wdGlvbihuYW1lLCBkZWZhdWx0VmFsdWUsIHR5cGUsIGFsaWFzZXMsIGNhbGxiYWNrKSB7XG4gICAgICBpZiAoZGVmYXVsdFZhbHVlID09PSB1bmRlZmluZWQgJiYgIWNhbGxiYWNrKSB7XG4gICAgICAgIHRocm93IEVycm9yKCdkZWZhdWx0VmFsdWUgaXMgcmVxdWlyZWQgdW5sZXNzIGNhbGxiYWNrIGlzIHByb3ZpZGVkJyk7XG4gICAgICB9XG4gICAgICBpZiAoIXR5cGUpIHsgdHlwZSA9ICdzdHJpbmcnOyB9XG4gICAgICBvcHRpb25zW25hbWVdID0ge1xuICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICBkZWZhdWx0VmFsdWU6IGRlZmF1bHRWYWx1ZSxcbiAgICAgICAgY2FsbGJhY2s6IGNhbGxiYWNrXG4gICAgICB9O1xuICAgICAgaWYgKGFsaWFzZXMpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbGlhc2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgb3B0aW9uc1thbGlhc2VzW2ldXSA9IG9wdGlvbnNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgc2V0T3B0aW9uKG5hbWUsIGRlZmF1bHRWYWx1ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0T3B0aW9uKG5hbWUsIHZhbHVlLCBjbSwgY2ZnKSB7XG4gICAgICB2YXIgb3B0aW9uID0gb3B0aW9uc1tuYW1lXTtcbiAgICAgIGNmZyA9IGNmZyB8fCB7fTtcbiAgICAgIHZhciBzY29wZSA9IGNmZy5zY29wZTtcbiAgICAgIGlmICghb3B0aW9uKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1Vua25vd24gb3B0aW9uOiAnICsgbmFtZSk7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9uLnR5cGUgPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSAhPT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ0ludmFsaWQgYXJndW1lbnQ6ICcgKyBuYW1lICsgJz0nICsgdmFsdWUpO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbHVlICE9PSBmYWxzZSkge1xuICAgICAgICAgIC8vIEJvb2xlYW4gb3B0aW9ucyBhcmUgc2V0IHRvIHRydWUgaWYgdmFsdWUgaXMgbm90IGRlZmluZWQuXG4gICAgICAgICAgdmFsdWUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9uLmNhbGxiYWNrKSB7XG4gICAgICAgIGlmIChzY29wZSAhPT0gJ2xvY2FsJykge1xuICAgICAgICAgIG9wdGlvbi5jYWxsYmFjayh2YWx1ZSwgdW5kZWZpbmVkKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUgIT09ICdnbG9iYWwnICYmIGNtKSB7XG4gICAgICAgICAgb3B0aW9uLmNhbGxiYWNrKHZhbHVlLCBjbSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzY29wZSAhPT0gJ2xvY2FsJykge1xuICAgICAgICAgIG9wdGlvbi52YWx1ZSA9IG9wdGlvbi50eXBlID09ICdib29sZWFuJyA/ICEhdmFsdWUgOiB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcGUgIT09ICdnbG9iYWwnICYmIGNtKSB7XG4gICAgICAgICAgY20uc3RhdGUudmltLm9wdGlvbnNbbmFtZV0gPSB7dmFsdWU6IHZhbHVlfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE9wdGlvbihuYW1lLCBjbSwgY2ZnKSB7XG4gICAgICB2YXIgb3B0aW9uID0gb3B0aW9uc1tuYW1lXTtcbiAgICAgIGNmZyA9IGNmZyB8fCB7fTtcbiAgICAgIHZhciBzY29wZSA9IGNmZy5zY29wZTtcbiAgICAgIGlmICghb3B0aW9uKSB7XG4gICAgICAgIHJldHVybiBuZXcgRXJyb3IoJ1Vua25vd24gb3B0aW9uOiAnICsgbmFtZSk7XG4gICAgICB9XG4gICAgICBpZiAob3B0aW9uLmNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBsb2NhbCA9IGNtICYmIG9wdGlvbi5jYWxsYmFjayh1bmRlZmluZWQsIGNtKTtcbiAgICAgICAgaWYgKHNjb3BlICE9PSAnZ2xvYmFsJyAmJiBsb2NhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIGxvY2FsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzY29wZSAhPT0gJ2xvY2FsJykge1xuICAgICAgICAgIHJldHVybiBvcHRpb24uY2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbG9jYWwgPSAoc2NvcGUgIT09ICdnbG9iYWwnKSAmJiAoY20gJiYgY20uc3RhdGUudmltLm9wdGlvbnNbbmFtZV0pO1xuICAgICAgICByZXR1cm4gKGxvY2FsIHx8IChzY29wZSAhPT0gJ2xvY2FsJykgJiYgb3B0aW9uIHx8IHt9KS52YWx1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBkZWZpbmVPcHRpb24oJ2ZpbGV0eXBlJywgdW5kZWZpbmVkLCAnc3RyaW5nJywgWydmdCddLCBmdW5jdGlvbihuYW1lLCBjbSkge1xuICAgICAgLy8gT3B0aW9uIGlzIGxvY2FsLiBEbyBub3RoaW5nIGZvciBnbG9iYWwuXG4gICAgICBpZiAoY20gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBUaGUgJ2ZpbGV0eXBlJyBvcHRpb24gcHJveGllcyB0byB0aGUgQ29kZU1pcnJvciAnbW9kZScgb3B0aW9uLlxuICAgICAgaWYgKG5hbWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgbW9kZSA9IGNtLmdldE9wdGlvbignbW9kZScpO1xuICAgICAgICByZXR1cm4gbW9kZSA9PSAnbnVsbCcgPyAnJyA6IG1vZGU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgbW9kZSA9IG5hbWUgPT0gJycgPyAnbnVsbCcgOiBuYW1lO1xuICAgICAgICBjbS5zZXRPcHRpb24oJ21vZGUnLCBtb2RlKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBjcmVhdGVDaXJjdWxhckp1bXBMaXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2l6ZSA9IDEwMDtcbiAgICAgIHZhciBwb2ludGVyID0gLTE7XG4gICAgICB2YXIgaGVhZCA9IDA7XG4gICAgICB2YXIgdGFpbCA9IDA7XG4gICAgICB2YXIgYnVmZmVyID0gbmV3IEFycmF5KHNpemUpO1xuICAgICAgZnVuY3Rpb24gYWRkKGNtLCBvbGRDdXIsIG5ld0N1cikge1xuICAgICAgICB2YXIgY3VycmVudCA9IHBvaW50ZXIgJSBzaXplO1xuICAgICAgICB2YXIgY3VyTWFyayA9IGJ1ZmZlcltjdXJyZW50XTtcbiAgICAgICAgZnVuY3Rpb24gdXNlTmV4dFNsb3QoY3Vyc29yKSB7XG4gICAgICAgICAgdmFyIG5leHQgPSArK3BvaW50ZXIgJSBzaXplO1xuICAgICAgICAgIHZhciB0cmFzaE1hcmsgPSBidWZmZXJbbmV4dF07XG4gICAgICAgICAgaWYgKHRyYXNoTWFyaykge1xuICAgICAgICAgICAgdHJhc2hNYXJrLmNsZWFyKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJ1ZmZlcltuZXh0XSA9IGNtLnNldEJvb2ttYXJrKGN1cnNvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN1ck1hcmspIHtcbiAgICAgICAgICB2YXIgbWFya1BvcyA9IGN1ck1hcmsuZmluZCgpO1xuICAgICAgICAgIC8vIGF2b2lkIHJlY29yZGluZyByZWR1bmRhbnQgY3Vyc29yIHBvc2l0aW9uXG4gICAgICAgICAgaWYgKG1hcmtQb3MgJiYgIWN1cnNvckVxdWFsKG1hcmtQb3MsIG9sZEN1cikpIHtcbiAgICAgICAgICAgIHVzZU5leHRTbG90KG9sZEN1cik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHVzZU5leHRTbG90KG9sZEN1cik7XG4gICAgICAgIH1cbiAgICAgICAgdXNlTmV4dFNsb3QobmV3Q3VyKTtcbiAgICAgICAgaGVhZCA9IHBvaW50ZXI7XG4gICAgICAgIHRhaWwgPSBwb2ludGVyIC0gc2l6ZSArIDE7XG4gICAgICAgIGlmICh0YWlsIDwgMCkge1xuICAgICAgICAgIHRhaWwgPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBtb3ZlKGNtLCBvZmZzZXQpIHtcbiAgICAgICAgcG9pbnRlciArPSBvZmZzZXQ7XG4gICAgICAgIGlmIChwb2ludGVyID4gaGVhZCkge1xuICAgICAgICAgIHBvaW50ZXIgPSBoZWFkO1xuICAgICAgICB9IGVsc2UgaWYgKHBvaW50ZXIgPCB0YWlsKSB7XG4gICAgICAgICAgcG9pbnRlciA9IHRhaWw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1hcmsgPSBidWZmZXJbKHNpemUgKyBwb2ludGVyKSAlIHNpemVdO1xuICAgICAgICAvLyBza2lwIG1hcmtzIHRoYXQgYXJlIHRlbXBvcmFyaWx5IHJlbW92ZWQgZnJvbSB0ZXh0IGJ1ZmZlclxuICAgICAgICBpZiAobWFyayAmJiAhbWFyay5maW5kKCkpIHtcbiAgICAgICAgICB2YXIgaW5jID0gb2Zmc2V0ID4gMCA/IDEgOiAtMTtcbiAgICAgICAgICB2YXIgbmV3Q3VyO1xuICAgICAgICAgIHZhciBvbGRDdXIgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgICBkbyB7XG4gICAgICAgICAgICBwb2ludGVyICs9IGluYztcbiAgICAgICAgICAgIG1hcmsgPSBidWZmZXJbKHNpemUgKyBwb2ludGVyKSAlIHNpemVdO1xuICAgICAgICAgICAgLy8gc2tpcCBtYXJrcyB0aGF0IGFyZSB0aGUgc2FtZSBhcyBjdXJyZW50IHBvc2l0aW9uXG4gICAgICAgICAgICBpZiAobWFyayAmJlxuICAgICAgICAgICAgICAgIChuZXdDdXIgPSBtYXJrLmZpbmQoKSkgJiZcbiAgICAgICAgICAgICAgICAhY3Vyc29yRXF1YWwob2xkQ3VyLCBuZXdDdXIpKSB7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gd2hpbGUgKHBvaW50ZXIgPCBoZWFkICYmIHBvaW50ZXIgPiB0YWlsKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWFyaztcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIGZpbmQoY20sIG9mZnNldCkge1xuICAgICAgICB2YXIgb2xkUG9pbnRlciA9IHBvaW50ZXI7XG4gICAgICAgIHZhciBtYXJrID0gbW92ZShjbSwgb2Zmc2V0KTtcbiAgICAgICAgcG9pbnRlciA9IG9sZFBvaW50ZXI7XG4gICAgICAgIHJldHVybiBtYXJrICYmIG1hcmsuZmluZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2FjaGVkQ3Vyc29yOiB1bmRlZmluZWQsIC8vdXNlZCBmb3IgIyBhbmQgKiBqdW1wc1xuICAgICAgICBhZGQ6IGFkZCxcbiAgICAgICAgZmluZDogZmluZCxcbiAgICAgICAgbW92ZTogbW92ZVxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgLy8gUmV0dXJucyBhbiBvYmplY3QgdG8gdHJhY2sgdGhlIGNoYW5nZXMgYXNzb2NpYXRlZCBpbnNlcnQgbW9kZS4gIEl0XG4gICAgLy8gY2xvbmVzIHRoZSBvYmplY3QgdGhhdCBpcyBwYXNzZWQgaW4sIG9yIGNyZWF0ZXMgYW4gZW1wdHkgb2JqZWN0IG9uZSBpZlxuICAgIC8vIG5vbmUgaXMgcHJvdmlkZWQuXG4gICAgdmFyIGNyZWF0ZUluc2VydE1vZGVDaGFuZ2VzID0gZnVuY3Rpb24oYykge1xuICAgICAgaWYgKGMpIHtcbiAgICAgICAgLy8gQ29weSBjb25zdHJ1Y3Rpb25cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjaGFuZ2VzOiBjLmNoYW5nZXMsXG4gICAgICAgICAgZXhwZWN0Q3Vyc29yQWN0aXZpdHlGb3JDaGFuZ2U6IGMuZXhwZWN0Q3Vyc29yQWN0aXZpdHlGb3JDaGFuZ2VcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC8vIENoYW5nZSBsaXN0XG4gICAgICAgIGNoYW5nZXM6IFtdLFxuICAgICAgICAvLyBTZXQgdG8gdHJ1ZSBvbiBjaGFuZ2UsIGZhbHNlIG9uIGN1cnNvckFjdGl2aXR5LlxuICAgICAgICBleHBlY3RDdXJzb3JBY3Rpdml0eUZvckNoYW5nZTogZmFsc2VcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIE1hY3JvTW9kZVN0YXRlKCkge1xuICAgICAgdGhpcy5sYXRlc3RSZWdpc3RlciA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLmlzUmVjb3JkaW5nID0gZmFsc2U7XG4gICAgICB0aGlzLnJlcGxheVNlYXJjaFF1ZXJpZXMgPSBbXTtcbiAgICAgIHRoaXMub25SZWNvcmRpbmdEb25lID0gdW5kZWZpbmVkO1xuICAgICAgdGhpcy5sYXN0SW5zZXJ0TW9kZUNoYW5nZXMgPSBjcmVhdGVJbnNlcnRNb2RlQ2hhbmdlcygpO1xuICAgIH1cbiAgICBNYWNyb01vZGVTdGF0ZS5wcm90b3R5cGUgPSB7XG4gICAgICBleGl0TWFjcm9SZWNvcmRNb2RlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICAgIGlmIChtYWNyb01vZGVTdGF0ZS5vblJlY29yZGluZ0RvbmUpIHtcbiAgICAgICAgICBtYWNyb01vZGVTdGF0ZS5vblJlY29yZGluZ0RvbmUoKTsgLy8gY2xvc2UgZGlhbG9nXG4gICAgICAgIH1cbiAgICAgICAgbWFjcm9Nb2RlU3RhdGUub25SZWNvcmRpbmdEb25lID0gdW5kZWZpbmVkO1xuICAgICAgICBtYWNyb01vZGVTdGF0ZS5pc1JlY29yZGluZyA9IGZhbHNlO1xuICAgICAgfSxcbiAgICAgIGVudGVyTWFjcm9SZWNvcmRNb2RlOiBmdW5jdGlvbihjbSwgcmVnaXN0ZXJOYW1lKSB7XG4gICAgICAgIHZhciByZWdpc3RlciA9XG4gICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIuZ2V0UmVnaXN0ZXIocmVnaXN0ZXJOYW1lKTtcbiAgICAgICAgaWYgKHJlZ2lzdGVyKSB7XG4gICAgICAgICAgcmVnaXN0ZXIuY2xlYXIoKTtcbiAgICAgICAgICB0aGlzLmxhdGVzdFJlZ2lzdGVyID0gcmVnaXN0ZXJOYW1lO1xuICAgICAgICAgIGlmIChjbS5vcGVuRGlhbG9nKSB7XG4gICAgICAgICAgICB2YXIgdGVtcGxhdGUgPSBkb20oJ3NwYW4nLCB7Y2xhc3M6ICdjbS12aW0tbWVzc2FnZSd9LCAncmVjb3JkaW5nIEAnICsgcmVnaXN0ZXJOYW1lKTtcbiAgICAgICAgICAgIHRoaXMub25SZWNvcmRpbmdEb25lID0gY20ub3BlbkRpYWxvZyh0ZW1wbGF0ZSwgbnVsbCwge2JvdHRvbTp0cnVlfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuaXNSZWNvcmRpbmcgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1heWJlSW5pdFZpbVN0YXRlKGNtKSB7XG4gICAgICBpZiAoIWNtLnN0YXRlLnZpbSkge1xuICAgICAgICAvLyBTdG9yZSBpbnN0YW5jZSBzdGF0ZSBpbiB0aGUgQ29kZU1pcnJvciBvYmplY3QuXG4gICAgICAgIGNtLnN0YXRlLnZpbSA9IHtcbiAgICAgICAgICBpbnB1dFN0YXRlOiBuZXcgSW5wdXRTdGF0ZSgpLFxuICAgICAgICAgIC8vIFZpbSdzIGlucHV0IHN0YXRlIHRoYXQgdHJpZ2dlcmVkIHRoZSBsYXN0IGVkaXQsIHVzZWQgdG8gcmVwZWF0XG4gICAgICAgICAgLy8gbW90aW9ucyBhbmQgb3BlcmF0b3JzIHdpdGggJy4nLlxuICAgICAgICAgIGxhc3RFZGl0SW5wdXRTdGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICAgIC8vIFZpbSdzIGFjdGlvbiBjb21tYW5kIGJlZm9yZSB0aGUgbGFzdCBlZGl0LCB1c2VkIHRvIHJlcGVhdCBhY3Rpb25zXG4gICAgICAgICAgLy8gd2l0aCAnLicgYW5kIGluc2VydCBtb2RlIHJlcGVhdC5cbiAgICAgICAgICBsYXN0RWRpdEFjdGlvbkNvbW1hbmQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAvLyBXaGVuIHVzaW5nIGprIGZvciBuYXZpZ2F0aW9uLCBpZiB5b3UgbW92ZSBmcm9tIGEgbG9uZ2VyIGxpbmUgdG8gYVxuICAgICAgICAgIC8vIHNob3J0ZXIgbGluZSwgdGhlIGN1cnNvciBtYXkgY2xpcCB0byB0aGUgZW5kIG9mIHRoZSBzaG9ydGVyIGxpbmUuXG4gICAgICAgICAgLy8gSWYgaiBpcyBwcmVzc2VkIGFnYWluIGFuZCBjdXJzb3IgZ29lcyB0byB0aGUgbmV4dCBsaW5lLCB0aGVcbiAgICAgICAgICAvLyBjdXJzb3Igc2hvdWxkIGdvIGJhY2sgdG8gaXRzIGhvcml6b250YWwgcG9zaXRpb24gb24gdGhlIGxvbmdlclxuICAgICAgICAgIC8vIGxpbmUgaWYgaXQgY2FuLiBUaGlzIGlzIHRvIGtlZXAgdHJhY2sgb2YgdGhlIGhvcml6b250YWwgcG9zaXRpb24uXG4gICAgICAgICAgbGFzdEhQb3M6IC0xLFxuICAgICAgICAgIC8vIERvaW5nIHRoZSBzYW1lIHdpdGggc2NyZWVuLXBvc2l0aW9uIGZvciBnai9na1xuICAgICAgICAgIGxhc3RIU1BvczogLTEsXG4gICAgICAgICAgLy8gVGhlIGxhc3QgbW90aW9uIGNvbW1hbmQgcnVuLiBDbGVhcmVkIGlmIGEgbm9uLW1vdGlvbiBjb21tYW5kIGdldHNcbiAgICAgICAgICAvLyBleGVjdXRlZCBpbiBiZXR3ZWVuLlxuICAgICAgICAgIGxhc3RNb3Rpb246IG51bGwsXG4gICAgICAgICAgbWFya3M6IHt9LFxuICAgICAgICAgIGluc2VydE1vZGU6IGZhbHNlLFxuICAgICAgICAgIC8vIFJlcGVhdCBjb3VudCBmb3IgY2hhbmdlcyBtYWRlIGluIGluc2VydCBtb2RlLCB0cmlnZ2VyZWQgYnkga2V5XG4gICAgICAgICAgLy8gc2VxdWVuY2VzIGxpa2UgMyxpLiBPbmx5IGV4aXN0cyB3aGVuIGluc2VydE1vZGUgaXMgdHJ1ZS5cbiAgICAgICAgICBpbnNlcnRNb2RlUmVwZWF0OiB1bmRlZmluZWQsXG4gICAgICAgICAgdmlzdWFsTW9kZTogZmFsc2UsXG4gICAgICAgICAgLy8gSWYgd2UgYXJlIGluIHZpc3VhbCBsaW5lIG1vZGUuIE5vIGVmZmVjdCBpZiB2aXN1YWxNb2RlIGlzIGZhbHNlLlxuICAgICAgICAgIHZpc3VhbExpbmU6IGZhbHNlLFxuICAgICAgICAgIHZpc3VhbEJsb2NrOiBmYWxzZSxcbiAgICAgICAgICBsYXN0U2VsZWN0aW9uOiBudWxsLFxuICAgICAgICAgIGxhc3RQYXN0ZWRUZXh0OiBudWxsLFxuICAgICAgICAgIHNlbDoge30sXG4gICAgICAgICAgLy8gQnVmZmVyLWxvY2FsL3dpbmRvdy1sb2NhbCB2YWx1ZXMgb2YgdmltIG9wdGlvbnMuXG4gICAgICAgICAgb3B0aW9uczoge31cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjbS5zdGF0ZS52aW07XG4gICAgfVxuICAgIHZhciB2aW1HbG9iYWxTdGF0ZTtcbiAgICBmdW5jdGlvbiByZXNldFZpbUdsb2JhbFN0YXRlKCkge1xuICAgICAgdmltR2xvYmFsU3RhdGUgPSB7XG4gICAgICAgIC8vIFRoZSBjdXJyZW50IHNlYXJjaCBxdWVyeS5cbiAgICAgICAgc2VhcmNoUXVlcnk6IG51bGwsXG4gICAgICAgIC8vIFdoZXRoZXIgd2UgYXJlIHNlYXJjaGluZyBiYWNrd2FyZHMuXG4gICAgICAgIHNlYXJjaElzUmV2ZXJzZWQ6IGZhbHNlLFxuICAgICAgICAvLyBSZXBsYWNlIHBhcnQgb2YgdGhlIGxhc3Qgc3Vic3RpdHV0ZWQgcGF0dGVyblxuICAgICAgICBsYXN0U3Vic3RpdHV0ZVJlcGxhY2VQYXJ0OiB1bmRlZmluZWQsXG4gICAgICAgIGp1bXBMaXN0OiBjcmVhdGVDaXJjdWxhckp1bXBMaXN0KCksXG4gICAgICAgIG1hY3JvTW9kZVN0YXRlOiBuZXcgTWFjcm9Nb2RlU3RhdGUsXG4gICAgICAgIC8vIFJlY29yZGluZyBsYXRlc3QgZiwgdCwgRiBvciBUIG1vdGlvbiBjb21tYW5kLlxuICAgICAgICBsYXN0Q2hhcmFjdGVyU2VhcmNoOiB7aW5jcmVtZW50OjAsIGZvcndhcmQ6dHJ1ZSwgc2VsZWN0ZWRDaGFyYWN0ZXI6Jyd9LFxuICAgICAgICByZWdpc3RlckNvbnRyb2xsZXI6IG5ldyBSZWdpc3RlckNvbnRyb2xsZXIoe30pLFxuICAgICAgICAvLyBzZWFyY2ggaGlzdG9yeSBidWZmZXJcbiAgICAgICAgc2VhcmNoSGlzdG9yeUNvbnRyb2xsZXI6IG5ldyBIaXN0b3J5Q29udHJvbGxlcigpLFxuICAgICAgICAvLyBleCBDb21tYW5kIGhpc3RvcnkgYnVmZmVyXG4gICAgICAgIGV4Q29tbWFuZEhpc3RvcnlDb250cm9sbGVyIDogbmV3IEhpc3RvcnlDb250cm9sbGVyKClcbiAgICAgIH07XG4gICAgICBmb3IgKHZhciBvcHRpb25OYW1lIGluIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIG9wdGlvbiA9IG9wdGlvbnNbb3B0aW9uTmFtZV07XG4gICAgICAgIG9wdGlvbi52YWx1ZSA9IG9wdGlvbi5kZWZhdWx0VmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGxhc3RJbnNlcnRNb2RlS2V5VGltZXI7XG4gICAgdmFyIHZpbUFwaSA9IHtcbiAgICAgIGVudGVyVmltTW9kZTogZW50ZXJWaW1Nb2RlLFxuICAgICAgbGVhdmVWaW1Nb2RlOiBsZWF2ZVZpbU1vZGUsXG4gICAgICBidWlsZEtleU1hcDogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIFRPRE86IENvbnZlcnQga2V5bWFwIGludG8gZGljdGlvbmFyeSBmb3JtYXQgZm9yIGZhc3QgbG9va3VwLlxuICAgICAgfSxcbiAgICAgIC8vIFRlc3RpbmcgaG9vaywgdGhvdWdoIGl0IG1pZ2h0IGJlIHVzZWZ1bCB0byBleHBvc2UgdGhlIHJlZ2lzdGVyXG4gICAgICAvLyBjb250cm9sbGVyIGFueXdheS5cbiAgICAgIGdldFJlZ2lzdGVyQ29udHJvbGxlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXI7XG4gICAgICB9LFxuICAgICAgLy8gVGVzdGluZyBob29rLlxuICAgICAgcmVzZXRWaW1HbG9iYWxTdGF0ZV86IHJlc2V0VmltR2xvYmFsU3RhdGUsXG5cbiAgICAgIC8vIFRlc3RpbmcgaG9vay5cbiAgICAgIGdldFZpbUdsb2JhbFN0YXRlXzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB2aW1HbG9iYWxTdGF0ZTtcbiAgICAgIH0sXG5cbiAgICAgIC8vIFRlc3RpbmcgaG9vay5cbiAgICAgIG1heWJlSW5pdFZpbVN0YXRlXzogbWF5YmVJbml0VmltU3RhdGUsXG5cbiAgICAgIHN1cHByZXNzRXJyb3JMb2dnaW5nOiBmYWxzZSxcblxuICAgICAgSW5zZXJ0TW9kZUtleTogSW5zZXJ0TW9kZUtleSxcbiAgICAgIG1hcDogZnVuY3Rpb24obGhzLCByaHMsIGN0eCkge1xuICAgICAgICAvLyBBZGQgdXNlciBkZWZpbmVkIGtleSBiaW5kaW5ncy5cbiAgICAgICAgZXhDb21tYW5kRGlzcGF0Y2hlci5tYXAobGhzLCByaHMsIGN0eCk7XG4gICAgICB9LFxuICAgICAgdW5tYXA6IGZ1bmN0aW9uKGxocywgY3R4KSB7XG4gICAgICAgIHJldHVybiBleENvbW1hbmREaXNwYXRjaGVyLnVubWFwKGxocywgY3R4KTtcbiAgICAgIH0sXG4gICAgICAvLyBOb24tcmVjdXJzaXZlIG1hcCBmdW5jdGlvbi5cbiAgICAgIC8vIE5PVEU6IFRoaXMgd2lsbCBub3QgY3JlYXRlIG1hcHBpbmdzIHRvIGtleSBtYXBzIHRoYXQgYXJlbid0IHByZXNlbnRcbiAgICAgIC8vIGluIHRoZSBkZWZhdWx0IGtleSBtYXAuIFNlZSBUT0RPIGF0IGJvdHRvbSBvZiBmdW5jdGlvbi5cbiAgICAgIG5vcmVtYXA6IGZ1bmN0aW9uKGxocywgcmhzLCBjdHgpIHtcbiAgICAgICAgZnVuY3Rpb24gdG9DdHhBcnJheShjdHgpIHtcbiAgICAgICAgICByZXR1cm4gY3R4ID8gW2N0eF0gOiBbJ25vcm1hbCcsICdpbnNlcnQnLCAndmlzdWFsJ107XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGN0eHNUb01hcCA9IHRvQ3R4QXJyYXkoY3R4KTtcbiAgICAgICAgLy8gTG9vayB0aHJvdWdoIGFsbCBhY3R1YWwgZGVmYXVsdHMgdG8gZmluZCBhIG1hcCBjYW5kaWRhdGUuXG4gICAgICAgIHZhciBhY3R1YWxMZW5ndGggPSBkZWZhdWx0S2V5bWFwLmxlbmd0aCwgb3JpZ0xlbmd0aCA9IGRlZmF1bHRLZXltYXBMZW5ndGg7XG4gICAgICAgIGZvciAodmFyIGkgPSBhY3R1YWxMZW5ndGggLSBvcmlnTGVuZ3RoO1xuICAgICAgICAgICAgIGkgPCBhY3R1YWxMZW5ndGggJiYgY3R4c1RvTWFwLmxlbmd0aDtcbiAgICAgICAgICAgICBpKyspIHtcbiAgICAgICAgICB2YXIgbWFwcGluZyA9IGRlZmF1bHRLZXltYXBbaV07XG4gICAgICAgICAgLy8gT21pdCBtYXBwaW5ncyB0aGF0IG9wZXJhdGUgaW4gdGhlIHdyb25nIGNvbnRleHQocykgYW5kIHRob3NlIG9mIGludmFsaWQgdHlwZS5cbiAgICAgICAgICBpZiAobWFwcGluZy5rZXlzID09IHJocyAmJlxuICAgICAgICAgICAgICAoIWN0eCB8fCAhbWFwcGluZy5jb250ZXh0IHx8IG1hcHBpbmcuY29udGV4dCA9PT0gY3R4KSAmJlxuICAgICAgICAgICAgICBtYXBwaW5nLnR5cGUuc3Vic3RyKDAsIDIpICE9PSAnZXgnICYmXG4gICAgICAgICAgICAgIG1hcHBpbmcudHlwZS5zdWJzdHIoMCwgMykgIT09ICdrZXknKSB7XG4gICAgICAgICAgICAvLyBNYWtlIGEgc2hhbGxvdyBjb3B5IG9mIHRoZSBvcmlnaW5hbCBrZXltYXAgZW50cnkuXG4gICAgICAgICAgICB2YXIgbmV3TWFwcGluZyA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG1hcHBpbmcpIHtcbiAgICAgICAgICAgICAgbmV3TWFwcGluZ1trZXldID0gbWFwcGluZ1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTW9kaWZ5IGl0IHBvaW50IHRvIHRoZSBuZXcgbWFwcGluZyB3aXRoIHRoZSBwcm9wZXIgY29udGV4dC5cbiAgICAgICAgICAgIG5ld01hcHBpbmcua2V5cyA9IGxocztcbiAgICAgICAgICAgIGlmIChjdHggJiYgIW5ld01hcHBpbmcuY29udGV4dCkge1xuICAgICAgICAgICAgICBuZXdNYXBwaW5nLmNvbnRleHQgPSBjdHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBBZGQgaXQgdG8gdGhlIGtleW1hcCB3aXRoIGEgaGlnaGVyIHByaW9yaXR5IHRoYW4gdGhlIG9yaWdpbmFsLlxuICAgICAgICAgICAgdGhpcy5fbWFwQ29tbWFuZChuZXdNYXBwaW5nKTtcbiAgICAgICAgICAgIC8vIFJlY29yZCB0aGUgbWFwcGVkIGNvbnRleHRzIGFzIGNvbXBsZXRlLlxuICAgICAgICAgICAgdmFyIG1hcHBlZEN0eHMgPSB0b0N0eEFycmF5KG1hcHBpbmcuY29udGV4dCk7XG4gICAgICAgICAgICBjdHhzVG9NYXAgPSBjdHhzVG9NYXAuZmlsdGVyKGZ1bmN0aW9uKGVsKSB7IHJldHVybiBtYXBwZWRDdHhzLmluZGV4T2YoZWwpID09PSAtMTsgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFRPRE86IENyZWF0ZSBub24tcmVjdXJzaXZlIGtleVRvS2V5IG1hcHBpbmdzIGZvciB0aGUgdW5tYXBwZWQgY29udGV4dHMgb25jZSB0aG9zZSBleGlzdC5cbiAgICAgIH0sXG4gICAgICAvLyBSZW1vdmUgYWxsIHVzZXItZGVmaW5lZCBtYXBwaW5ncyBmb3IgdGhlIHByb3ZpZGVkIGNvbnRleHQuXG4gICAgICBtYXBjbGVhcjogZnVuY3Rpb24oY3R4KSB7XG4gICAgICAgIC8vIFBhcnRpdGlvbiB0aGUgZXhpc3Rpbmcga2V5bWFwIGludG8gdXNlci1kZWZpbmVkIGFuZCB0cnVlIGRlZmF1bHRzLlxuICAgICAgICB2YXIgYWN0dWFsTGVuZ3RoID0gZGVmYXVsdEtleW1hcC5sZW5ndGgsXG4gICAgICAgICAgICBvcmlnTGVuZ3RoID0gZGVmYXVsdEtleW1hcExlbmd0aDtcbiAgICAgICAgdmFyIHVzZXJLZXltYXAgPSBkZWZhdWx0S2V5bWFwLnNsaWNlKDAsIGFjdHVhbExlbmd0aCAtIG9yaWdMZW5ndGgpO1xuICAgICAgICBkZWZhdWx0S2V5bWFwID0gZGVmYXVsdEtleW1hcC5zbGljZShhY3R1YWxMZW5ndGggLSBvcmlnTGVuZ3RoKTtcbiAgICAgICAgaWYgKGN0eCkge1xuICAgICAgICAgIC8vIElmIGEgc3BlY2lmaWMgY29udGV4dCBpcyBiZWluZyBjbGVhcmVkLCB3ZSBuZWVkIHRvIGtlZXAgbWFwcGluZ3NcbiAgICAgICAgICAvLyBmcm9tIGFsbCBvdGhlciBjb250ZXh0cy5cbiAgICAgICAgICBmb3IgKHZhciBpID0gdXNlcktleW1hcC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgdmFyIG1hcHBpbmcgPSB1c2VyS2V5bWFwW2ldO1xuICAgICAgICAgICAgaWYgKGN0eCAhPT0gbWFwcGluZy5jb250ZXh0KSB7XG4gICAgICAgICAgICAgIGlmIChtYXBwaW5nLmNvbnRleHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9tYXBDb21tYW5kKG1hcHBpbmcpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIGBtYXBwaW5nYCBhcHBsaWVzIHRvIGFsbCBjb250ZXh0cyBzbyBjcmVhdGUga2V5bWFwIGNvcGllc1xuICAgICAgICAgICAgICAgIC8vIGZvciBlYWNoIGNvbnRleHQgZXhjZXB0IHRoZSBvbmUgYmVpbmcgY2xlYXJlZC5cbiAgICAgICAgICAgICAgICB2YXIgY29udGV4dHMgPSBbJ25vcm1hbCcsICdpbnNlcnQnLCAndmlzdWFsJ107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaiBpbiBjb250ZXh0cykge1xuICAgICAgICAgICAgICAgICAgaWYgKGNvbnRleHRzW2pdICE9PSBjdHgpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld01hcHBpbmcgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG1hcHBpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICBuZXdNYXBwaW5nW2tleV0gPSBtYXBwaW5nW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbmV3TWFwcGluZy5jb250ZXh0ID0gY29udGV4dHNbal07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21hcENvbW1hbmQobmV3TWFwcGluZyk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gVE9ETzogRXhwb3NlIHNldE9wdGlvbiBhbmQgZ2V0T3B0aW9uIGFzIGluc3RhbmNlIG1ldGhvZHMuIE5lZWQgdG8gZGVjaWRlIGhvdyB0byBuYW1lc3BhY2VcbiAgICAgIC8vIHRoZW0sIG9yIHNvbWVob3cgbWFrZSB0aGVtIHdvcmsgd2l0aCB0aGUgZXhpc3RpbmcgQ29kZU1pcnJvciBzZXRPcHRpb24vZ2V0T3B0aW9uIEFQSS5cbiAgICAgIHNldE9wdGlvbjogc2V0T3B0aW9uLFxuICAgICAgZ2V0T3B0aW9uOiBnZXRPcHRpb24sXG4gICAgICBkZWZpbmVPcHRpb246IGRlZmluZU9wdGlvbixcbiAgICAgIGRlZmluZUV4OiBmdW5jdGlvbihuYW1lLCBwcmVmaXgsIGZ1bmMpe1xuICAgICAgICBpZiAoIXByZWZpeCkge1xuICAgICAgICAgIHByZWZpeCA9IG5hbWU7XG4gICAgICAgIH0gZWxzZSBpZiAobmFtZS5pbmRleE9mKHByZWZpeCkgIT09IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJyhWaW0uZGVmaW5lRXgpIFwiJytwcmVmaXgrJ1wiIGlzIG5vdCBhIHByZWZpeCBvZiBcIicrbmFtZSsnXCIsIGNvbW1hbmQgbm90IHJlZ2lzdGVyZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBleENvbW1hbmRzW25hbWVdPWZ1bmM7XG4gICAgICAgIGV4Q29tbWFuZERpc3BhdGNoZXIuY29tbWFuZE1hcF9bcHJlZml4XT17bmFtZTpuYW1lLCBzaG9ydE5hbWU6cHJlZml4LCB0eXBlOidhcGknfTtcbiAgICAgIH0sXG4gICAgICBoYW5kbGVLZXk6IGZ1bmN0aW9uIChjbSwga2V5LCBvcmlnaW4pIHtcbiAgICAgICAgdmFyIGNvbW1hbmQgPSB0aGlzLmZpbmRLZXkoY20sIGtleSwgb3JpZ2luKTtcbiAgICAgICAgaWYgKHR5cGVvZiBjb21tYW5kID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgcmV0dXJuIGNvbW1hbmQoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG11bHRpU2VsZWN0SGFuZGxlS2V5OiBtdWx0aVNlbGVjdEhhbmRsZUtleSxcblxuICAgICAgLyoqXG4gICAgICAgKiBUaGlzIGlzIHRoZSBvdXRlcm1vc3QgZnVuY3Rpb24gY2FsbGVkIGJ5IENvZGVNaXJyb3IsIGFmdGVyIGtleXMgaGF2ZVxuICAgICAgICogYmVlbiBtYXBwZWQgdG8gdGhlaXIgVmltIGVxdWl2YWxlbnRzLlxuICAgICAgICpcbiAgICAgICAqIEZpbmRzIGEgY29tbWFuZCBiYXNlZCBvbiB0aGUga2V5IChhbmQgY2FjaGVkIGtleXMgaWYgdGhlcmUgaXMgYVxuICAgICAgICogbXVsdGkta2V5IHNlcXVlbmNlKS4gUmV0dXJucyBgdW5kZWZpbmVkYCBpZiBubyBrZXkgaXMgbWF0Y2hlZCwgYSBub29wXG4gICAgICAgKiBmdW5jdGlvbiBpZiBhIHBhcnRpYWwgbWF0Y2ggaXMgZm91bmQgKG11bHRpLWtleSksIGFuZCBhIGZ1bmN0aW9uIHRvXG4gICAgICAgKiBleGVjdXRlIHRoZSBib3VuZCBjb21tYW5kIGlmIGEgYSBrZXkgaXMgbWF0Y2hlZC4gVGhlIGZ1bmN0aW9uIGFsd2F5c1xuICAgICAgICogcmV0dXJucyB0cnVlLlxuICAgICAgICovXG4gICAgICBmaW5kS2V5OiBmdW5jdGlvbihjbSwga2V5LCBvcmlnaW4pIHtcbiAgICAgICAgdmFyIHZpbSA9IG1heWJlSW5pdFZpbVN0YXRlKGNtKTtcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlTWFjcm9SZWNvcmRpbmcoKSB7XG4gICAgICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICAgICAgaWYgKG1hY3JvTW9kZVN0YXRlLmlzUmVjb3JkaW5nKSB7XG4gICAgICAgICAgICBpZiAoa2V5ID09ICdxJykge1xuICAgICAgICAgICAgICBtYWNyb01vZGVTdGF0ZS5leGl0TWFjcm9SZWNvcmRNb2RlKCk7XG4gICAgICAgICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9yaWdpbiAhPSAnbWFwcGluZycpIHtcbiAgICAgICAgICAgICAgbG9nS2V5KG1hY3JvTW9kZVN0YXRlLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBoYW5kbGVFc2MoKSB7XG4gICAgICAgICAgaWYgKGtleSA9PSAnPEVzYz4nKSB7XG4gICAgICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgICAgLy8gR2V0IGJhY2sgdG8gbm9ybWFsIG1vZGUuXG4gICAgICAgICAgICAgIGV4aXRWaXN1YWxNb2RlKGNtKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodmltLmluc2VydE1vZGUpIHtcbiAgICAgICAgICAgICAgLy8gR2V0IGJhY2sgdG8gbm9ybWFsIG1vZGUuXG4gICAgICAgICAgICAgIGV4aXRJbnNlcnRNb2RlKGNtKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIC8vIFdlJ3JlIGFscmVhZHkgaW4gbm9ybWFsIG1vZGUuIExldCAnPEVzYz4nIGJlIGhhbmRsZWQgbm9ybWFsbHkuXG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gZG9LZXlUb0tleShrZXlzKSB7XG4gICAgICAgICAgLy8gVE9ETzogcHJldmVudCBpbmZpbml0ZSByZWN1cnNpb24uXG4gICAgICAgICAgdmFyIG1hdGNoO1xuICAgICAgICAgIHdoaWxlIChrZXlzKSB7XG4gICAgICAgICAgICAvLyBQdWxsIG9mZiBvbmUgY29tbWFuZCBrZXksIHdoaWNoIGlzIGVpdGhlciBhIHNpbmdsZSBjaGFyYWN0ZXJcbiAgICAgICAgICAgIC8vIG9yIGEgc3BlY2lhbCBzZXF1ZW5jZSB3cmFwcGVkIGluICc8JyBhbmQgJz4nLCBlLmcuICc8U3BhY2U+Jy5cbiAgICAgICAgICAgIG1hdGNoID0gKC88XFx3Ky0uKz8+fDxcXHcrPnwuLykuZXhlYyhrZXlzKTtcbiAgICAgICAgICAgIGtleSA9IG1hdGNoWzBdO1xuICAgICAgICAgICAga2V5cyA9IGtleXMuc3Vic3RyaW5nKG1hdGNoLmluZGV4ICsga2V5Lmxlbmd0aCk7XG4gICAgICAgICAgICB2aW1BcGkuaGFuZGxlS2V5KGNtLCBrZXksICdtYXBwaW5nJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlS2V5SW5zZXJ0TW9kZSgpIHtcbiAgICAgICAgICBpZiAoaGFuZGxlRXNjKCkpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgICAgICB2YXIga2V5cyA9IHZpbS5pbnB1dFN0YXRlLmtleUJ1ZmZlciA9IHZpbS5pbnB1dFN0YXRlLmtleUJ1ZmZlciArIGtleTtcbiAgICAgICAgICB2YXIga2V5c0FyZUNoYXJzID0ga2V5Lmxlbmd0aCA9PSAxO1xuICAgICAgICAgIHZhciBtYXRjaCA9IGNvbW1hbmREaXNwYXRjaGVyLm1hdGNoQ29tbWFuZChrZXlzLCBkZWZhdWx0S2V5bWFwLCB2aW0uaW5wdXRTdGF0ZSwgJ2luc2VydCcpO1xuICAgICAgICAgIC8vIE5lZWQgdG8gY2hlY2sgYWxsIGtleSBzdWJzdHJpbmdzIGluIGluc2VydCBtb2RlLlxuICAgICAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCA+IDEgJiYgbWF0Y2gudHlwZSAhPSAnZnVsbCcpIHtcbiAgICAgICAgICAgIHZhciBrZXlzID0gdmltLmlucHV0U3RhdGUua2V5QnVmZmVyID0ga2V5cy5zbGljZSgxKTtcbiAgICAgICAgICAgIHZhciB0aGlzTWF0Y2ggPSBjb21tYW5kRGlzcGF0Y2hlci5tYXRjaENvbW1hbmQoa2V5cywgZGVmYXVsdEtleW1hcCwgdmltLmlucHV0U3RhdGUsICdpbnNlcnQnKTtcbiAgICAgICAgICAgIGlmICh0aGlzTWF0Y2gudHlwZSAhPSAnbm9uZScpIHsgbWF0Y2ggPSB0aGlzTWF0Y2g7IH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1hdGNoLnR5cGUgPT0gJ25vbmUnKSB7IGNsZWFySW5wdXRTdGF0ZShjbSk7IHJldHVybiBmYWxzZTsgfVxuICAgICAgICAgIGVsc2UgaWYgKG1hdGNoLnR5cGUgPT0gJ3BhcnRpYWwnKSB7XG4gICAgICAgICAgICBpZiAobGFzdEluc2VydE1vZGVLZXlUaW1lcikgeyB3aW5kb3cuY2xlYXJUaW1lb3V0KGxhc3RJbnNlcnRNb2RlS2V5VGltZXIpOyB9XG4gICAgICAgICAgICBsYXN0SW5zZXJ0TW9kZUtleVRpbWVyID0gd2luZG93LnNldFRpbWVvdXQoXG4gICAgICAgICAgICAgIGZ1bmN0aW9uKCkgeyBpZiAodmltLmluc2VydE1vZGUgJiYgdmltLmlucHV0U3RhdGUua2V5QnVmZmVyKSB7IGNsZWFySW5wdXRTdGF0ZShjbSk7IH0gfSxcbiAgICAgICAgICAgICAgZ2V0T3B0aW9uKCdpbnNlcnRNb2RlRXNjS2V5c1RpbWVvdXQnKSk7XG4gICAgICAgICAgICByZXR1cm4gIWtleXNBcmVDaGFycztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAobGFzdEluc2VydE1vZGVLZXlUaW1lcikgeyB3aW5kb3cuY2xlYXJUaW1lb3V0KGxhc3RJbnNlcnRNb2RlS2V5VGltZXIpOyB9XG4gICAgICAgICAgaWYgKGtleXNBcmVDaGFycykge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbnMgPSBjbS5saXN0U2VsZWN0aW9ucygpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxlY3Rpb25zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBoZXJlID0gc2VsZWN0aW9uc1tpXS5oZWFkO1xuICAgICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UoJycsIG9mZnNldEN1cnNvcihoZXJlLCAwLCAtKGtleXMubGVuZ3RoIC0gMSkpLCBoZXJlLCAnK2lucHV0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXMuY2hhbmdlcy5wb3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgICByZXR1cm4gbWF0Y2guY29tbWFuZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGhhbmRsZUtleU5vbkluc2VydE1vZGUoKSB7XG4gICAgICAgICAgaWYgKGhhbmRsZU1hY3JvUmVjb3JkaW5nKCkgfHwgaGFuZGxlRXNjKCkpIHsgcmV0dXJuIHRydWU7IH1cblxuICAgICAgICAgIHZhciBrZXlzID0gdmltLmlucHV0U3RhdGUua2V5QnVmZmVyID0gdmltLmlucHV0U3RhdGUua2V5QnVmZmVyICsga2V5O1xuICAgICAgICAgIGlmICgvXlsxLTldXFxkKiQvLnRlc3Qoa2V5cykpIHsgcmV0dXJuIHRydWU7IH1cblxuICAgICAgICAgIHZhciBrZXlzTWF0Y2hlciA9IC9eKFxcZCopKC4qKSQvLmV4ZWMoa2V5cyk7XG4gICAgICAgICAgaWYgKCFrZXlzTWF0Y2hlcikgeyBjbGVhcklucHV0U3RhdGUoY20pOyByZXR1cm4gZmFsc2U7IH1cbiAgICAgICAgICB2YXIgY29udGV4dCA9IHZpbS52aXN1YWxNb2RlID8gJ3Zpc3VhbCcgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnbm9ybWFsJztcbiAgICAgICAgICB2YXIgbWFpbktleSA9IGtleXNNYXRjaGVyWzJdIHx8IGtleXNNYXRjaGVyWzFdO1xuICAgICAgICAgIGlmICh2aW0uaW5wdXRTdGF0ZS5vcGVyYXRvclNob3J0Y3V0ICYmIHZpbS5pbnB1dFN0YXRlLm9wZXJhdG9yU2hvcnRjdXQuc2xpY2UoLTEpID09IG1haW5LZXkpIHtcbiAgICAgICAgICAgIC8vIG11bHRpa2V5IG9wZXJhdG9ycyBhY3QgbGluZXdpc2UgYnkgcmVwZWF0aW5nIG9ubHkgdGhlIGxhc3QgY2hhcmFjdGVyXG4gICAgICAgICAgICBtYWluS2V5ID0gdmltLmlucHV0U3RhdGUub3BlcmF0b3JTaG9ydGN1dDtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIG1hdGNoID0gY29tbWFuZERpc3BhdGNoZXIubWF0Y2hDb21tYW5kKG1haW5LZXksIGRlZmF1bHRLZXltYXAsIHZpbS5pbnB1dFN0YXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAobWF0Y2gudHlwZSA9PSAnbm9uZScpIHsgY2xlYXJJbnB1dFN0YXRlKGNtKTsgcmV0dXJuIGZhbHNlOyB9XG4gICAgICAgICAgZWxzZSBpZiAobWF0Y2gudHlwZSA9PSAncGFydGlhbCcpIHsgcmV0dXJuIHRydWU7IH1cbiAgICAgICAgICBlbHNlIGlmIChtYXRjaC50eXBlID09ICdjbGVhcicpIHsgY2xlYXJJbnB1dFN0YXRlKGNtKTsgcmV0dXJuIHRydWU7IH1cblxuICAgICAgICAgIHZpbS5pbnB1dFN0YXRlLmtleUJ1ZmZlciA9ICcnO1xuICAgICAgICAgIGtleXNNYXRjaGVyID0gL14oXFxkKikoLiopJC8uZXhlYyhrZXlzKTtcbiAgICAgICAgICBpZiAoa2V5c01hdGNoZXJbMV0gJiYga2V5c01hdGNoZXJbMV0gIT0gJzAnKSB7XG4gICAgICAgICAgICB2aW0uaW5wdXRTdGF0ZS5wdXNoUmVwZWF0RGlnaXQoa2V5c01hdGNoZXJbMV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWF0Y2guY29tbWFuZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb21tYW5kO1xuICAgICAgICBpZiAodmltLmluc2VydE1vZGUpIHsgY29tbWFuZCA9IGhhbmRsZUtleUluc2VydE1vZGUoKTsgfVxuICAgICAgICBlbHNlIHsgY29tbWFuZCA9IGhhbmRsZUtleU5vbkluc2VydE1vZGUoKTsgfVxuICAgICAgICBpZiAoY29tbWFuZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkOyAvL2FjZV9wYXRjaFxuICAgICAgICB9IGVsc2UgaWYgKGNvbW1hbmQgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyBUT0RPOiBMb29rIGludG8gdXNpbmcgQ29kZU1pcnJvcidzIG11bHRpLWtleSBoYW5kbGluZy5cbiAgICAgICAgICAvLyBSZXR1cm4gbm8tb3Agc2luY2Ugd2UgYXJlIGNhY2hpbmcgdGhlIGtleS4gQ291bnRzIGFzIGhhbmRsZWQsIGJ1dFxuICAgICAgICAgIC8vIGRvbid0IHdhbnQgYWN0IG9uIGl0IGp1c3QgeWV0LlxuICAgICAgICAgIHJldHVybiBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKChjb21tYW5kLm9wZXJhdG9yIHx8IGNvbW1hbmQuaXNFZGl0KSAmJiBjbS5nZXRPcHRpb24oJ3JlYWRPbmx5JykpXG4gICAgICAgICAgICAgIHJldHVybjsgLy8gYWNlX3BhdGNoXG4gICAgICAgICAgICByZXR1cm4gY20ub3BlcmF0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBjbS5jdXJPcC5pc1ZpbU9wID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpZiAoY29tbWFuZC50eXBlID09ICdrZXlUb0tleScpIHtcbiAgICAgICAgICAgICAgICAgIGRvS2V5VG9LZXkoY29tbWFuZC50b0tleXMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjb21tYW5kRGlzcGF0Y2hlci5wcm9jZXNzQ29tbWFuZChjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAvLyBjbGVhciBWSU0gc3RhdGUgaW4gY2FzZSBpdCdzIGluIGEgYmFkIHN0YXRlLlxuICAgICAgICAgICAgICAgIGNtLnN0YXRlLnZpbSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBtYXliZUluaXRWaW1TdGF0ZShjbSk7XG4gICAgICAgICAgICAgICAgaWYgKCF2aW1BcGkuc3VwcHJlc3NFcnJvckxvZ2dpbmcpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnNvbGVbJ2xvZyddKGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGhhbmRsZUV4OiBmdW5jdGlvbihjbSwgaW5wdXQpIHtcbiAgICAgICAgZXhDb21tYW5kRGlzcGF0Y2hlci5wcm9jZXNzQ29tbWFuZChjbSwgaW5wdXQpO1xuICAgICAgfSxcblxuICAgICAgZGVmaW5lTW90aW9uOiBkZWZpbmVNb3Rpb24sXG4gICAgICBkZWZpbmVBY3Rpb246IGRlZmluZUFjdGlvbixcbiAgICAgIGRlZmluZU9wZXJhdG9yOiBkZWZpbmVPcGVyYXRvcixcbiAgICAgIG1hcENvbW1hbmQ6IG1hcENvbW1hbmQsXG4gICAgICBfbWFwQ29tbWFuZDogX21hcENvbW1hbmQsXG5cbiAgICAgIGRlZmluZVJlZ2lzdGVyOiBkZWZpbmVSZWdpc3RlcixcblxuICAgICAgZXhpdFZpc3VhbE1vZGU6IGV4aXRWaXN1YWxNb2RlLFxuICAgICAgZXhpdEluc2VydE1vZGU6IGV4aXRJbnNlcnRNb2RlXG4gICAgfTtcblxuICAgIC8vIFJlcHJlc2VudHMgdGhlIGN1cnJlbnQgaW5wdXQgc3RhdGUuXG4gICAgZnVuY3Rpb24gSW5wdXRTdGF0ZSgpIHtcbiAgICAgIHRoaXMucHJlZml4UmVwZWF0ID0gW107XG4gICAgICB0aGlzLm1vdGlvblJlcGVhdCA9IFtdO1xuXG4gICAgICB0aGlzLm9wZXJhdG9yID0gbnVsbDtcbiAgICAgIHRoaXMub3BlcmF0b3JBcmdzID0gbnVsbDtcbiAgICAgIHRoaXMubW90aW9uID0gbnVsbDtcbiAgICAgIHRoaXMubW90aW9uQXJncyA9IG51bGw7XG4gICAgICB0aGlzLmtleUJ1ZmZlciA9IFtdOyAvLyBGb3IgbWF0Y2hpbmcgbXVsdGkta2V5IGNvbW1hbmRzLlxuICAgICAgdGhpcy5yZWdpc3Rlck5hbWUgPSBudWxsOyAvLyBEZWZhdWx0cyB0byB0aGUgdW5uYW1lZCByZWdpc3Rlci5cbiAgICB9XG4gICAgSW5wdXRTdGF0ZS5wcm90b3R5cGUucHVzaFJlcGVhdERpZ2l0ID0gZnVuY3Rpb24obikge1xuICAgICAgaWYgKCF0aGlzLm9wZXJhdG9yKSB7XG4gICAgICAgIHRoaXMucHJlZml4UmVwZWF0ID0gdGhpcy5wcmVmaXhSZXBlYXQuY29uY2F0KG4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5tb3Rpb25SZXBlYXQgPSB0aGlzLm1vdGlvblJlcGVhdC5jb25jYXQobik7XG4gICAgICB9XG4gICAgfTtcbiAgICBJbnB1dFN0YXRlLnByb3RvdHlwZS5nZXRSZXBlYXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZXBlYXQgPSAwO1xuICAgICAgaWYgKHRoaXMucHJlZml4UmVwZWF0Lmxlbmd0aCA+IDAgfHwgdGhpcy5tb3Rpb25SZXBlYXQubGVuZ3RoID4gMCkge1xuICAgICAgICByZXBlYXQgPSAxO1xuICAgICAgICBpZiAodGhpcy5wcmVmaXhSZXBlYXQubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJlcGVhdCAqPSBwYXJzZUludCh0aGlzLnByZWZpeFJlcGVhdC5qb2luKCcnKSwgMTApO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLm1vdGlvblJlcGVhdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcmVwZWF0ICo9IHBhcnNlSW50KHRoaXMubW90aW9uUmVwZWF0LmpvaW4oJycpLCAxMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXBlYXQ7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNsZWFySW5wdXRTdGF0ZShjbSwgcmVhc29uKSB7XG4gICAgICBjbS5zdGF0ZS52aW0uaW5wdXRTdGF0ZSA9IG5ldyBJbnB1dFN0YXRlKCk7XG4gICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgJ3ZpbS1jb21tYW5kLWRvbmUnLCByZWFzb24pO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogUmVnaXN0ZXIgc3RvcmVzIGluZm9ybWF0aW9uIGFib3V0IGNvcHkgYW5kIHBhc3RlIHJlZ2lzdGVycy4gIEJlc2lkZXNcbiAgICAgKiB0ZXh0LCBhIHJlZ2lzdGVyIG11c3Qgc3RvcmUgd2hldGhlciBpdCBpcyBsaW5ld2lzZSAoaS5lLiwgd2hlbiBpdCBpc1xuICAgICAqIHBhc3RlZCwgc2hvdWxkIGl0IGluc2VydCBpdHNlbGYgaW50byBhIG5ldyBsaW5lLCBvciBzaG91bGQgdGhlIHRleHQgYmVcbiAgICAgKiBpbnNlcnRlZCBhdCB0aGUgY3Vyc29yIHBvc2l0aW9uLilcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBSZWdpc3Rlcih0ZXh0LCBsaW5ld2lzZSwgYmxvY2t3aXNlKSB7XG4gICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICB0aGlzLmtleUJ1ZmZlciA9IFt0ZXh0IHx8ICcnXTtcbiAgICAgIHRoaXMuaW5zZXJ0TW9kZUNoYW5nZXMgPSBbXTtcbiAgICAgIHRoaXMuc2VhcmNoUXVlcmllcyA9IFtdO1xuICAgICAgdGhpcy5saW5ld2lzZSA9ICEhbGluZXdpc2U7XG4gICAgICB0aGlzLmJsb2Nrd2lzZSA9ICEhYmxvY2t3aXNlO1xuICAgIH1cbiAgICBSZWdpc3Rlci5wcm90b3R5cGUgPSB7XG4gICAgICBzZXRUZXh0OiBmdW5jdGlvbih0ZXh0LCBsaW5ld2lzZSwgYmxvY2t3aXNlKSB7XG4gICAgICAgIHRoaXMua2V5QnVmZmVyID0gW3RleHQgfHwgJyddO1xuICAgICAgICB0aGlzLmxpbmV3aXNlID0gISFsaW5ld2lzZTtcbiAgICAgICAgdGhpcy5ibG9ja3dpc2UgPSAhIWJsb2Nrd2lzZTtcbiAgICAgIH0sXG4gICAgICBwdXNoVGV4dDogZnVuY3Rpb24odGV4dCwgbGluZXdpc2UpIHtcbiAgICAgICAgLy8gaWYgdGhpcyByZWdpc3RlciBoYXMgZXZlciBiZWVuIHNldCB0byBsaW5ld2lzZSwgdXNlIGxpbmV3aXNlLlxuICAgICAgICBpZiAobGluZXdpc2UpIHtcbiAgICAgICAgICBpZiAoIXRoaXMubGluZXdpc2UpIHtcbiAgICAgICAgICAgIHRoaXMua2V5QnVmZmVyLnB1c2goJ1xcbicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLmxpbmV3aXNlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmtleUJ1ZmZlci5wdXNoKHRleHQpO1xuICAgICAgfSxcbiAgICAgIHB1c2hJbnNlcnRNb2RlQ2hhbmdlczogZnVuY3Rpb24oY2hhbmdlcykge1xuICAgICAgICB0aGlzLmluc2VydE1vZGVDaGFuZ2VzLnB1c2goY3JlYXRlSW5zZXJ0TW9kZUNoYW5nZXMoY2hhbmdlcykpO1xuICAgICAgfSxcbiAgICAgIHB1c2hTZWFyY2hRdWVyeTogZnVuY3Rpb24ocXVlcnkpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hRdWVyaWVzLnB1c2gocXVlcnkpO1xuICAgICAgfSxcbiAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5rZXlCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5pbnNlcnRNb2RlQ2hhbmdlcyA9IFtdO1xuICAgICAgICB0aGlzLnNlYXJjaFF1ZXJpZXMgPSBbXTtcbiAgICAgICAgdGhpcy5saW5ld2lzZSA9IGZhbHNlO1xuICAgICAgfSxcbiAgICAgIHRvU3RyaW5nOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMua2V5QnVmZmVyLmpvaW4oJycpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGFuIGV4dGVybmFsIHJlZ2lzdGVyLlxuICAgICAqXG4gICAgICogVGhlIG5hbWUgc2hvdWxkIGJlIGEgc2luZ2xlIGNoYXJhY3RlciB0aGF0IHdpbGwgYmUgdXNlZCB0byByZWZlcmVuY2UgdGhlIHJlZ2lzdGVyLlxuICAgICAqIFRoZSByZWdpc3RlciBzaG91bGQgc3VwcG9ydCBzZXRUZXh0LCBwdXNoVGV4dCwgY2xlYXIsIGFuZCB0b1N0cmluZygpLiBTZWUgUmVnaXN0ZXJcbiAgICAgKiBmb3IgYSByZWZlcmVuY2UgaW1wbGVtZW50YXRpb24uXG4gICAgICovXG4gICAgZnVuY3Rpb24gZGVmaW5lUmVnaXN0ZXIobmFtZSwgcmVnaXN0ZXIpIHtcbiAgICAgIHZhciByZWdpc3RlcnMgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIucmVnaXN0ZXJzO1xuICAgICAgaWYgKCFuYW1lIHx8IG5hbWUubGVuZ3RoICE9IDEpIHtcbiAgICAgICAgdGhyb3cgRXJyb3IoJ1JlZ2lzdGVyIG5hbWUgbXVzdCBiZSAxIGNoYXJhY3RlcicpO1xuICAgICAgfVxuICAgICAgLy8gYWNlX3BhdGNoXG4gICAgICByZWdpc3RlcnNbbmFtZV0gPSByZWdpc3RlcjtcbiAgICAgIHZhbGlkUmVnaXN0ZXJzLnB1c2gobmFtZSk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiB2aW0gcmVnaXN0ZXJzIGFsbG93IHlvdSB0byBrZWVwIG1hbnkgaW5kZXBlbmRlbnQgY29weSBhbmQgcGFzdGUgYnVmZmVycy5cbiAgICAgKiBTZWUgaHR0cDovL3VzZXZpbS5jb20vMjAxMi8wNC8xMy9yZWdpc3RlcnMvIGZvciBhbiBpbnRyb2R1Y3Rpb24uXG4gICAgICpcbiAgICAgKiBSZWdpc3RlckNvbnRyb2xsZXIga2VlcHMgdGhlIHN0YXRlIG9mIGFsbCB0aGUgcmVnaXN0ZXJzLiAgQW4gaW5pdGlhbFxuICAgICAqIHN0YXRlIG1heSBiZSBwYXNzZWQgaW4uICBUaGUgdW5uYW1lZCByZWdpc3RlciAnXCInIHdpbGwgYWx3YXlzIGJlXG4gICAgICogb3ZlcnJpZGRlbi5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBSZWdpc3RlckNvbnRyb2xsZXIocmVnaXN0ZXJzKSB7XG4gICAgICB0aGlzLnJlZ2lzdGVycyA9IHJlZ2lzdGVycztcbiAgICAgIHRoaXMudW5uYW1lZFJlZ2lzdGVyID0gcmVnaXN0ZXJzWydcIiddID0gbmV3IFJlZ2lzdGVyKCk7XG4gICAgICByZWdpc3RlcnNbJy4nXSA9IG5ldyBSZWdpc3RlcigpO1xuICAgICAgcmVnaXN0ZXJzWyc6J10gPSBuZXcgUmVnaXN0ZXIoKTtcbiAgICAgIHJlZ2lzdGVyc1snLyddID0gbmV3IFJlZ2lzdGVyKCk7XG4gICAgICByZWdpc3RlcnNbJysnXSA9IG5ldyBSZWdpc3RlcigpO1xuICAgIH1cbiAgICBSZWdpc3RlckNvbnRyb2xsZXIucHJvdG90eXBlID0ge1xuICAgICAgcHVzaFRleHQ6IGZ1bmN0aW9uKHJlZ2lzdGVyTmFtZSwgb3BlcmF0b3IsIHRleHQsIGxpbmV3aXNlLCBibG9ja3dpc2UpIHtcbiAgICAgICAgLy8gVGhlIGJsYWNrIGhvbGUgcmVnaXN0ZXIsIFwiXywgbWVhbnMgZGVsZXRlL3lhbmsgdG8gbm93aGVyZS5cbiAgICAgICAgaWYgKHJlZ2lzdGVyTmFtZSA9PT0gJ18nKSByZXR1cm47XG4gICAgICAgIGlmIChsaW5ld2lzZSAmJiB0ZXh0LmNoYXJBdCh0ZXh0Lmxlbmd0aCAtIDEpICE9PSAnXFxuJyl7XG4gICAgICAgICAgdGV4dCArPSAnXFxuJztcbiAgICAgICAgfVxuICAgICAgICAvLyBMb3dlcmNhc2UgYW5kIHVwcGVyY2FzZSByZWdpc3RlcnMgcmVmZXIgdG8gdGhlIHNhbWUgcmVnaXN0ZXIuXG4gICAgICAgIC8vIFVwcGVyY2FzZSBqdXN0IG1lYW5zIGFwcGVuZC5cbiAgICAgICAgdmFyIHJlZ2lzdGVyID0gdGhpcy5pc1ZhbGlkUmVnaXN0ZXIocmVnaXN0ZXJOYW1lKSA/XG4gICAgICAgICAgICB0aGlzLmdldFJlZ2lzdGVyKHJlZ2lzdGVyTmFtZSkgOiBudWxsO1xuICAgICAgICAvLyBpZiBubyByZWdpc3Rlci9hbiBpbnZhbGlkIHJlZ2lzdGVyIHdhcyBzcGVjaWZpZWQsIHRoaW5ncyBnbyB0byB0aGVcbiAgICAgICAgLy8gZGVmYXVsdCByZWdpc3RlcnNcbiAgICAgICAgaWYgKCFyZWdpc3Rlcikge1xuICAgICAgICAgIHN3aXRjaCAob3BlcmF0b3IpIHtcbiAgICAgICAgICAgIGNhc2UgJ3lhbmsnOlxuICAgICAgICAgICAgICAvLyBUaGUgMCByZWdpc3RlciBjb250YWlucyB0aGUgdGV4dCBmcm9tIHRoZSBtb3N0IHJlY2VudCB5YW5rLlxuICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyc1snMCddID0gbmV3IFJlZ2lzdGVyKHRleHQsIGxpbmV3aXNlLCBibG9ja3dpc2UpO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2RlbGV0ZSc6XG4gICAgICAgICAgICBjYXNlICdjaGFuZ2UnOlxuICAgICAgICAgICAgICBpZiAodGV4dC5pbmRleE9mKCdcXG4nKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vIERlbGV0ZSBsZXNzIHRoYW4gMSBsaW5lLiBVcGRhdGUgdGhlIHNtYWxsIGRlbGV0ZSByZWdpc3Rlci5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyc1snLSddID0gbmV3IFJlZ2lzdGVyKHRleHQsIGxpbmV3aXNlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBTaGlmdCBkb3duIHRoZSBjb250ZW50cyBvZiB0aGUgbnVtYmVyZWQgcmVnaXN0ZXJzIGFuZCBwdXQgdGhlXG4gICAgICAgICAgICAgICAgLy8gZGVsZXRlZCB0ZXh0IGludG8gcmVnaXN0ZXIgMS5cbiAgICAgICAgICAgICAgICB0aGlzLnNoaWZ0TnVtZXJpY1JlZ2lzdGVyc18oKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZ2lzdGVyc1snMSddID0gbmV3IFJlZ2lzdGVyKHRleHQsIGxpbmV3aXNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gTWFrZSBzdXJlIHRoZSB1bm5hbWVkIHJlZ2lzdGVyIGlzIHNldCB0byB3aGF0IGp1c3QgaGFwcGVuZWRcbiAgICAgICAgICB0aGlzLnVubmFtZWRSZWdpc3Rlci5zZXRUZXh0KHRleHQsIGxpbmV3aXNlLCBibG9ja3dpc2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHdlJ3ZlIGdvdHRlbiB0byB0aGlzIHBvaW50LCB3ZSd2ZSBhY3R1YWxseSBzcGVjaWZpZWQgYSByZWdpc3RlclxuICAgICAgICB2YXIgYXBwZW5kID0gaXNVcHBlckNhc2UocmVnaXN0ZXJOYW1lKTtcbiAgICAgICAgaWYgKGFwcGVuZCkge1xuICAgICAgICAgIHJlZ2lzdGVyLnB1c2hUZXh0KHRleHQsIGxpbmV3aXNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWdpc3Rlci5zZXRUZXh0KHRleHQsIGxpbmV3aXNlLCBibG9ja3dpc2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZWdpc3Rlck5hbWUgPT09ICcrJyAmJiB0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgIHR5cGVvZiBuYXZpZ2F0b3IuY2xpcGJvYXJkICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgIHR5cGVvZiBuYXZpZ2F0b3IuY2xpcGJvYXJkLnJlYWRUZXh0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIHVubmFtZWQgcmVnaXN0ZXIgYWx3YXlzIGhhcyB0aGUgc2FtZSB2YWx1ZSBhcyB0aGUgbGFzdCB1c2VkXG4gICAgICAgIC8vIHJlZ2lzdGVyLlxuICAgICAgICB0aGlzLnVubmFtZWRSZWdpc3Rlci5zZXRUZXh0KHJlZ2lzdGVyLnRvU3RyaW5nKCksIGxpbmV3aXNlKTtcbiAgICAgIH0sXG4gICAgICAvLyBHZXRzIHRoZSByZWdpc3RlciBuYW1lZCBAbmFtZS4gIElmIG9uZSBvZiBAbmFtZSBkb2Vzbid0IGFscmVhZHkgZXhpc3QsXG4gICAgICAvLyBjcmVhdGUgaXQuICBJZiBAbmFtZSBpcyBpbnZhbGlkLCByZXR1cm4gdGhlIHVubmFtZWRSZWdpc3Rlci5cbiAgICAgIGdldFJlZ2lzdGVyOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkUmVnaXN0ZXIobmFtZSkpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy51bm5hbWVkUmVnaXN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgaWYgKCF0aGlzLnJlZ2lzdGVyc1tuYW1lXSkge1xuICAgICAgICAgIHRoaXMucmVnaXN0ZXJzW25hbWVdID0gbmV3IFJlZ2lzdGVyKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMucmVnaXN0ZXJzW25hbWVdO1xuICAgICAgfSxcbiAgICAgIGlzVmFsaWRSZWdpc3RlcjogZnVuY3Rpb24obmFtZSkge1xuICAgICAgICByZXR1cm4gbmFtZSAmJiBpbkFycmF5KG5hbWUsIHZhbGlkUmVnaXN0ZXJzKTtcbiAgICAgIH0sXG4gICAgICBzaGlmdE51bWVyaWNSZWdpc3RlcnNfOiBmdW5jdGlvbigpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDk7IGkgPj0gMjsgaS0tKSB7XG4gICAgICAgICAgdGhpcy5yZWdpc3RlcnNbaV0gPSB0aGlzLmdldFJlZ2lzdGVyKCcnICsgKGkgLSAxKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIGZ1bmN0aW9uIEhpc3RvcnlDb250cm9sbGVyKCkge1xuICAgICAgICB0aGlzLmhpc3RvcnlCdWZmZXIgPSBbXTtcbiAgICAgICAgdGhpcy5pdGVyYXRvciA9IDA7XG4gICAgICAgIHRoaXMuaW5pdGlhbFByZWZpeCA9IG51bGw7XG4gICAgfVxuICAgIEhpc3RvcnlDb250cm9sbGVyLnByb3RvdHlwZSA9IHtcbiAgICAgIC8vIHRoZSBpbnB1dCBhcmd1bWVudCBoZXJlIGFjdHMgYSB1c2VyIGVudGVyZWQgcHJlZml4IGZvciBhIHNtYWxsIHRpbWVcbiAgICAgIC8vIHVudGlsIHdlIHN0YXJ0IGF1dG9jb21wbGV0aW9uIGluIHdoaWNoIGNhc2UgaXQgaXMgdGhlIGF1dG9jb21wbGV0ZWQuXG4gICAgICBuZXh0TWF0Y2g6IGZ1bmN0aW9uIChpbnB1dCwgdXApIHtcbiAgICAgICAgdmFyIGhpc3RvcnlCdWZmZXIgPSB0aGlzLmhpc3RvcnlCdWZmZXI7XG4gICAgICAgIHZhciBkaXIgPSB1cCA/IC0xIDogMTtcbiAgICAgICAgaWYgKHRoaXMuaW5pdGlhbFByZWZpeCA9PT0gbnVsbCkgdGhpcy5pbml0aWFsUHJlZml4ID0gaW5wdXQ7XG4gICAgICAgIGZvciAodmFyIGkgPSB0aGlzLml0ZXJhdG9yICsgZGlyOyB1cCA/IGkgPj0gMCA6IGkgPCBoaXN0b3J5QnVmZmVyLmxlbmd0aDsgaSs9IGRpcikge1xuICAgICAgICAgIHZhciBlbGVtZW50ID0gaGlzdG9yeUJ1ZmZlcltpXTtcbiAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8PSBlbGVtZW50Lmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pbml0aWFsUHJlZml4ID09IGVsZW1lbnQuc3Vic3RyaW5nKDAsIGopKSB7XG4gICAgICAgICAgICAgIHRoaXMuaXRlcmF0b3IgPSBpO1xuICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2hvdWxkIHJldHVybiB0aGUgdXNlciBpbnB1dCBpbiBjYXNlIHdlIHJlYWNoIHRoZSBlbmQgb2YgYnVmZmVyLlxuICAgICAgICBpZiAoaSA+PSBoaXN0b3J5QnVmZmVyLmxlbmd0aCkge1xuICAgICAgICAgIHRoaXMuaXRlcmF0b3IgPSBoaXN0b3J5QnVmZmVyLmxlbmd0aDtcbiAgICAgICAgICByZXR1cm4gdGhpcy5pbml0aWFsUHJlZml4O1xuICAgICAgICB9XG4gICAgICAgIC8vIHJldHVybiB0aGUgbGFzdCBhdXRvY29tcGxldGVkIHF1ZXJ5IG9yIGV4Q29tbWFuZCBhcyBpdCBpcy5cbiAgICAgICAgaWYgKGkgPCAwICkgcmV0dXJuIGlucHV0O1xuICAgICAgfSxcbiAgICAgIHB1c2hJbnB1dDogZnVuY3Rpb24oaW5wdXQpIHtcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5oaXN0b3J5QnVmZmVyLmluZGV4T2YoaW5wdXQpO1xuICAgICAgICBpZiAoaW5kZXggPiAtMSkgdGhpcy5oaXN0b3J5QnVmZmVyLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIGlmIChpbnB1dC5sZW5ndGgpIHRoaXMuaGlzdG9yeUJ1ZmZlci5wdXNoKGlucHV0KTtcbiAgICAgIH0sXG4gICAgICByZXNldDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMuaW5pdGlhbFByZWZpeCA9IG51bGw7XG4gICAgICAgIHRoaXMuaXRlcmF0b3IgPSB0aGlzLmhpc3RvcnlCdWZmZXIubGVuZ3RoO1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIGNvbW1hbmREaXNwYXRjaGVyID0ge1xuICAgICAgbWF0Y2hDb21tYW5kOiBmdW5jdGlvbihrZXlzLCBrZXlNYXAsIGlucHV0U3RhdGUsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIG1hdGNoZXMgPSBjb21tYW5kTWF0Y2hlcyhrZXlzLCBrZXlNYXAsIGNvbnRleHQsIGlucHV0U3RhdGUpO1xuICAgICAgICBpZiAoIW1hdGNoZXMuZnVsbCAmJiAhbWF0Y2hlcy5wYXJ0aWFsKSB7XG4gICAgICAgICAgcmV0dXJuIHt0eXBlOiAnbm9uZSd9O1xuICAgICAgICB9IGVsc2UgaWYgKCFtYXRjaGVzLmZ1bGwgJiYgbWF0Y2hlcy5wYXJ0aWFsKSB7XG4gICAgICAgICAgcmV0dXJuIHt0eXBlOiAncGFydGlhbCd9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGJlc3RNYXRjaDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtYXRjaGVzLmZ1bGwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgbWF0Y2ggPSBtYXRjaGVzLmZ1bGxbaV07XG4gICAgICAgICAgaWYgKCFiZXN0TWF0Y2gpIHtcbiAgICAgICAgICAgIGJlc3RNYXRjaCA9IG1hdGNoO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYmVzdE1hdGNoLmtleXMuc2xpY2UoLTExKSA9PSAnPGNoYXJhY3Rlcj4nKSB7XG4gICAgICAgICAgdmFyIGNoYXJhY3RlciA9IGxhc3RDaGFyKGtleXMpO1xuICAgICAgICAgIGlmICghY2hhcmFjdGVyIHx8IGNoYXJhY3Rlci5sZW5ndGggPiAxKSByZXR1cm4ge3R5cGU6ICdjbGVhcid9O1xuICAgICAgICAgIGlucHV0U3RhdGUuc2VsZWN0ZWRDaGFyYWN0ZXIgPSBjaGFyYWN0ZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHt0eXBlOiAnZnVsbCcsIGNvbW1hbmQ6IGJlc3RNYXRjaH07XG4gICAgICB9LFxuICAgICAgcHJvY2Vzc0NvbW1hbmQ6IGZ1bmN0aW9uKGNtLCB2aW0sIGNvbW1hbmQpIHtcbiAgICAgICAgdmltLmlucHV0U3RhdGUucmVwZWF0T3ZlcnJpZGUgPSBjb21tYW5kLnJlcGVhdE92ZXJyaWRlO1xuICAgICAgICBzd2l0Y2ggKGNvbW1hbmQudHlwZSkge1xuICAgICAgICAgIGNhc2UgJ21vdGlvbic6XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NNb3Rpb24oY20sIHZpbSwgY29tbWFuZCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdvcGVyYXRvcic6XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NPcGVyYXRvcihjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ29wZXJhdG9yTW90aW9uJzpcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc09wZXJhdG9yTW90aW9uKGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYWN0aW9uJzpcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc0FjdGlvbihjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3NlYXJjaCc6XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NTZWFyY2goY20sIHZpbSwgY29tbWFuZCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdleCc6XG4gICAgICAgICAgY2FzZSAna2V5VG9FeCc6XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NFeChjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHByb2Nlc3NNb3Rpb246IGZ1bmN0aW9uKGNtLCB2aW0sIGNvbW1hbmQpIHtcbiAgICAgICAgdmltLmlucHV0U3RhdGUubW90aW9uID0gY29tbWFuZC5tb3Rpb247XG4gICAgICAgIHZpbS5pbnB1dFN0YXRlLm1vdGlvbkFyZ3MgPSBjb3B5QXJncyhjb21tYW5kLm1vdGlvbkFyZ3MpO1xuICAgICAgICB0aGlzLmV2YWxJbnB1dChjbSwgdmltKTtcbiAgICAgIH0sXG4gICAgICBwcm9jZXNzT3BlcmF0b3I6IGZ1bmN0aW9uKGNtLCB2aW0sIGNvbW1hbmQpIHtcbiAgICAgICAgdmFyIGlucHV0U3RhdGUgPSB2aW0uaW5wdXRTdGF0ZTtcbiAgICAgICAgaWYgKGlucHV0U3RhdGUub3BlcmF0b3IpIHtcbiAgICAgICAgICBpZiAoaW5wdXRTdGF0ZS5vcGVyYXRvciA9PSBjb21tYW5kLm9wZXJhdG9yKSB7XG4gICAgICAgICAgICAvLyBUeXBpbmcgYW4gb3BlcmF0b3IgdHdpY2UgbGlrZSAnZGQnIG1ha2VzIHRoZSBvcGVyYXRvciBvcGVyYXRlXG4gICAgICAgICAgICAvLyBsaW5ld2lzZVxuICAgICAgICAgICAgaW5wdXRTdGF0ZS5tb3Rpb24gPSAnZXhwYW5kVG9MaW5lJztcbiAgICAgICAgICAgIGlucHV0U3RhdGUubW90aW9uQXJncyA9IHsgbGluZXdpc2U6IHRydWUgfTtcbiAgICAgICAgICAgIHRoaXMuZXZhbElucHV0KGNtLCB2aW0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyAyIGRpZmZlcmVudCBvcGVyYXRvcnMgaW4gYSByb3cgZG9lc24ndCBtYWtlIHNlbnNlLlxuICAgICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaW5wdXRTdGF0ZS5vcGVyYXRvciA9IGNvbW1hbmQub3BlcmF0b3I7XG4gICAgICAgIGlucHV0U3RhdGUub3BlcmF0b3JBcmdzID0gY29weUFyZ3MoY29tbWFuZC5vcGVyYXRvckFyZ3MpO1xuICAgICAgICBpZiAoY29tbWFuZC5rZXlzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICBpbnB1dFN0YXRlLm9wZXJhdG9yU2hvcnRjdXQgPSBjb21tYW5kLmtleXM7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbW1hbmQuZXhpdFZpc3VhbEJsb2NrKSB7XG4gICAgICAgICAgICB2aW0udmlzdWFsQmxvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIHVwZGF0ZUNtU2VsZWN0aW9uKGNtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAvLyBPcGVyYXRpbmcgb24gYSBzZWxlY3Rpb24gaW4gdmlzdWFsIG1vZGUuIFdlIGRvbid0IG5lZWQgYSBtb3Rpb24uXG4gICAgICAgICAgdGhpcy5ldmFsSW5wdXQoY20sIHZpbSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwcm9jZXNzT3BlcmF0b3JNb3Rpb246IGZ1bmN0aW9uKGNtLCB2aW0sIGNvbW1hbmQpIHtcbiAgICAgICAgdmFyIHZpc3VhbE1vZGUgPSB2aW0udmlzdWFsTW9kZTtcbiAgICAgICAgdmFyIG9wZXJhdG9yTW90aW9uQXJncyA9IGNvcHlBcmdzKGNvbW1hbmQub3BlcmF0b3JNb3Rpb25BcmdzKTtcbiAgICAgICAgaWYgKG9wZXJhdG9yTW90aW9uQXJncykge1xuICAgICAgICAgIC8vIE9wZXJhdG9yIG1vdGlvbnMgbWF5IGhhdmUgc3BlY2lhbCBiZWhhdmlvciBpbiB2aXN1YWwgbW9kZS5cbiAgICAgICAgICBpZiAodmlzdWFsTW9kZSAmJiBvcGVyYXRvck1vdGlvbkFyZ3MudmlzdWFsTGluZSkge1xuICAgICAgICAgICAgdmltLnZpc3VhbExpbmUgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb2Nlc3NPcGVyYXRvcihjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgaWYgKCF2aXN1YWxNb2RlKSB7XG4gICAgICAgICAgdGhpcy5wcm9jZXNzTW90aW9uKGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvY2Vzc0FjdGlvbjogZnVuY3Rpb24oY20sIHZpbSwgY29tbWFuZCkge1xuICAgICAgICB2YXIgaW5wdXRTdGF0ZSA9IHZpbS5pbnB1dFN0YXRlO1xuICAgICAgICB2YXIgcmVwZWF0ID0gaW5wdXRTdGF0ZS5nZXRSZXBlYXQoKTtcbiAgICAgICAgdmFyIHJlcGVhdElzRXhwbGljaXQgPSAhIXJlcGVhdDtcbiAgICAgICAgdmFyIGFjdGlvbkFyZ3MgPSBjb3B5QXJncyhjb21tYW5kLmFjdGlvbkFyZ3MpIHx8IHt9O1xuICAgICAgICBpZiAoaW5wdXRTdGF0ZS5zZWxlY3RlZENoYXJhY3Rlcikge1xuICAgICAgICAgIGFjdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXIgPSBpbnB1dFN0YXRlLnNlbGVjdGVkQ2hhcmFjdGVyO1xuICAgICAgICB9XG4gICAgICAgIC8vIEFjdGlvbnMgbWF5IG9yIG1heSBub3QgaGF2ZSBtb3Rpb25zIGFuZCBvcGVyYXRvcnMuIERvIHRoZXNlIGZpcnN0LlxuICAgICAgICBpZiAoY29tbWFuZC5vcGVyYXRvcikge1xuICAgICAgICAgIHRoaXMucHJvY2Vzc09wZXJhdG9yKGNtLCB2aW0sIGNvbW1hbmQpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb21tYW5kLm1vdGlvbikge1xuICAgICAgICAgIHRoaXMucHJvY2Vzc01vdGlvbihjbSwgdmltLCBjb21tYW5kKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tbWFuZC5tb3Rpb24gfHwgY29tbWFuZC5vcGVyYXRvcikge1xuICAgICAgICAgIHRoaXMuZXZhbElucHV0KGNtLCB2aW0pO1xuICAgICAgICB9XG4gICAgICAgIGFjdGlvbkFyZ3MucmVwZWF0ID0gcmVwZWF0IHx8IDE7XG4gICAgICAgIGFjdGlvbkFyZ3MucmVwZWF0SXNFeHBsaWNpdCA9IHJlcGVhdElzRXhwbGljaXQ7XG4gICAgICAgIGFjdGlvbkFyZ3MucmVnaXN0ZXJOYW1lID0gaW5wdXRTdGF0ZS5yZWdpc3Rlck5hbWU7XG4gICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgIHZpbS5sYXN0TW90aW9uID0gbnVsbDtcbiAgICAgICAgaWYgKGNvbW1hbmQuaXNFZGl0KSB7XG4gICAgICAgICAgdGhpcy5yZWNvcmRMYXN0RWRpdCh2aW0sIGlucHV0U3RhdGUsIGNvbW1hbmQpO1xuICAgICAgICB9XG4gICAgICAgIGFjdGlvbnNbY29tbWFuZC5hY3Rpb25dKGNtLCBhY3Rpb25BcmdzLCB2aW0pO1xuICAgICAgfSxcbiAgICAgIHByb2Nlc3NTZWFyY2g6IGZ1bmN0aW9uKGNtLCB2aW0sIGNvbW1hbmQpIHtcbiAgICAgICAgaWYgKCFjbS5nZXRTZWFyY2hDdXJzb3IpIHtcbiAgICAgICAgICAvLyBTZWFyY2ggZGVwZW5kcyBvbiBTZWFyY2hDdXJzb3IuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmb3J3YXJkID0gY29tbWFuZC5zZWFyY2hBcmdzLmZvcndhcmQ7XG4gICAgICAgIHZhciB3aG9sZVdvcmRPbmx5ID0gY29tbWFuZC5zZWFyY2hBcmdzLndob2xlV29yZE9ubHk7XG4gICAgICAgIGdldFNlYXJjaFN0YXRlKGNtKS5zZXRSZXZlcnNlZCghZm9yd2FyZCk7XG4gICAgICAgIHZhciBwcm9tcHRQcmVmaXggPSAoZm9yd2FyZCkgPyAnLycgOiAnPyc7XG4gICAgICAgIHZhciBvcmlnaW5hbFF1ZXJ5ID0gZ2V0U2VhcmNoU3RhdGUoY20pLmdldFF1ZXJ5KCk7XG4gICAgICAgIHZhciBvcmlnaW5hbFNjcm9sbFBvcyA9IGNtLmdldFNjcm9sbEluZm8oKTtcbiAgICAgICAgZnVuY3Rpb24gaGFuZGxlUXVlcnkocXVlcnksIGlnbm9yZUNhc2UsIHNtYXJ0Q2FzZSkge1xuICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLnNlYXJjaEhpc3RvcnlDb250cm9sbGVyLnB1c2hJbnB1dChxdWVyeSk7XG4gICAgICAgICAgdmltR2xvYmFsU3RhdGUuc2VhcmNoSGlzdG9yeUNvbnRyb2xsZXIucmVzZXQoKTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgdXBkYXRlU2VhcmNoUXVlcnkoY20sIHF1ZXJ5LCBpZ25vcmVDYXNlLCBzbWFydENhc2UpO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnSW52YWxpZCByZWdleDogJyArIHF1ZXJ5KTtcbiAgICAgICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbW1hbmREaXNwYXRjaGVyLnByb2Nlc3NNb3Rpb24oY20sIHZpbSwge1xuICAgICAgICAgICAgdHlwZTogJ21vdGlvbicsXG4gICAgICAgICAgICBtb3Rpb246ICdmaW5kTmV4dCcsXG4gICAgICAgICAgICBtb3Rpb25BcmdzOiB7IGZvcndhcmQ6IHRydWUsIHRvSnVtcGxpc3Q6IGNvbW1hbmQuc2VhcmNoQXJncy50b0p1bXBsaXN0IH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBvblByb21wdENsb3NlKHF1ZXJ5KSB7XG4gICAgICAgICAgLy9hY2VfcGF0Y2ggY20uc2Nyb2xsVG8ob3JpZ2luYWxTY3JvbGxQb3MubGVmdCwgb3JpZ2luYWxTY3JvbGxQb3MudG9wKTtcbiAgICAgICAgICBoYW5kbGVRdWVyeShxdWVyeSwgdHJ1ZSAvKiogaWdub3JlQ2FzZSAqLywgdHJ1ZSAvKiogc21hcnRDYXNlICovKTtcbiAgICAgICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgICAgICBpZiAobWFjcm9Nb2RlU3RhdGUuaXNSZWNvcmRpbmcpIHtcbiAgICAgICAgICAgIGxvZ1NlYXJjaFF1ZXJ5KG1hY3JvTW9kZVN0YXRlLCBxdWVyeSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uUHJvbXB0S2V5VXAoZSwgcXVlcnksIGNsb3NlKSB7XG4gICAgICAgICAgdmFyIGtleU5hbWUgPSBDb2RlTWlycm9yLmtleU5hbWUoZSksIHVwLCBvZmZzZXQ7XG4gICAgICAgICAgaWYgKGtleU5hbWUgPT0gJ1VwJyB8fCBrZXlOYW1lID09ICdEb3duJykge1xuICAgICAgICAgICAgdXAgPSBrZXlOYW1lID09ICdVcCcgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgICAgICBvZmZzZXQgPSBlLnRhcmdldCA/IGUudGFyZ2V0LnNlbGVjdGlvbkVuZCA6IDA7XG4gICAgICAgICAgICBxdWVyeSA9IHZpbUdsb2JhbFN0YXRlLnNlYXJjaEhpc3RvcnlDb250cm9sbGVyLm5leHRNYXRjaChxdWVyeSwgdXApIHx8ICcnO1xuICAgICAgICAgICAgY2xvc2UocXVlcnkpO1xuICAgICAgICAgICAgaWYgKG9mZnNldCAmJiBlLnRhcmdldCkgZS50YXJnZXQuc2VsZWN0aW9uRW5kID0gZS50YXJnZXQuc2VsZWN0aW9uU3RhcnQgPSBNYXRoLm1pbihvZmZzZXQsIGUudGFyZ2V0LnZhbHVlLmxlbmd0aCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICgga2V5TmFtZSAhPSAnTGVmdCcgJiYga2V5TmFtZSAhPSAnUmlnaHQnICYmIGtleU5hbWUgIT0gJ0N0cmwnICYmIGtleU5hbWUgIT0gJ0FsdCcgJiYga2V5TmFtZSAhPSAnU2hpZnQnKVxuICAgICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5zZWFyY2hIaXN0b3J5Q29udHJvbGxlci5yZXNldCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgcGFyc2VkUXVlcnk7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHBhcnNlZFF1ZXJ5ID0gdXBkYXRlU2VhcmNoUXVlcnkoY20sIHF1ZXJ5LFxuICAgICAgICAgICAgICAgIHRydWUgLyoqIGlnbm9yZUNhc2UgKi8sIHRydWUgLyoqIHNtYXJ0Q2FzZSAqLyk7XG4gICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgLy8gU3dhbGxvdyBiYWQgcmVnZXhlcyBmb3IgaW5jcmVtZW50YWwgc2VhcmNoLlxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGFyc2VkUXVlcnkpIHtcbiAgICAgICAgICAgIGNtLnNjcm9sbEludG9WaWV3KGZpbmROZXh0KGNtLCAhZm9yd2FyZCwgcGFyc2VkUXVlcnkpLCAzMCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNsZWFyU2VhcmNoSGlnaGxpZ2h0KGNtKTtcbiAgICAgICAgICAgIGNtLnNjcm9sbFRvKG9yaWdpbmFsU2Nyb2xsUG9zLmxlZnQsIG9yaWdpbmFsU2Nyb2xsUG9zLnRvcCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uUHJvbXB0S2V5RG93bihlLCBxdWVyeSwgY2xvc2UpIHtcbiAgICAgICAgICB2YXIga2V5TmFtZSA9IENvZGVNaXJyb3Iua2V5TmFtZShlKTtcbiAgICAgICAgICBpZiAoa2V5TmFtZSA9PSAnRXNjJyB8fCBrZXlOYW1lID09ICdDdHJsLUMnIHx8IGtleU5hbWUgPT0gJ0N0cmwtWycgfHxcbiAgICAgICAgICAgICAgKGtleU5hbWUgPT0gJ0JhY2tzcGFjZScgJiYgcXVlcnkgPT0gJycpKSB7XG4gICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5zZWFyY2hIaXN0b3J5Q29udHJvbGxlci5wdXNoSW5wdXQocXVlcnkpO1xuICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUuc2VhcmNoSGlzdG9yeUNvbnRyb2xsZXIucmVzZXQoKTtcbiAgICAgICAgICAgIHVwZGF0ZVNlYXJjaFF1ZXJ5KGNtLCBvcmlnaW5hbFF1ZXJ5KTtcbiAgICAgICAgICAgIGNsZWFyU2VhcmNoSGlnaGxpZ2h0KGNtKTtcbiAgICAgICAgICAgIGNtLnNjcm9sbFRvKG9yaWdpbmFsU2Nyb2xsUG9zLmxlZnQsIG9yaWdpbmFsU2Nyb2xsUG9zLnRvcCk7XG4gICAgICAgICAgICBDb2RlTWlycm9yLmVfc3RvcChlKTtcbiAgICAgICAgICAgIGNsZWFySW5wdXRTdGF0ZShjbSk7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgICAgY20uZm9jdXMoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGtleU5hbWUgPT0gJ1VwJyB8fCBrZXlOYW1lID09ICdEb3duJykge1xuICAgICAgICAgICAgQ29kZU1pcnJvci5lX3N0b3AoZSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChrZXlOYW1lID09ICdDdHJsLVUnKSB7XG4gICAgICAgICAgICAvLyBDdHJsLVUgY2xlYXJzIGlucHV0LlxuICAgICAgICAgICAgQ29kZU1pcnJvci5lX3N0b3AoZSk7XG4gICAgICAgICAgICBjbG9zZSgnJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN3aXRjaCAoY29tbWFuZC5zZWFyY2hBcmdzLnF1ZXJ5U3JjKSB7XG4gICAgICAgICAgY2FzZSAncHJvbXB0JzpcbiAgICAgICAgICAgIHZhciBtYWNyb01vZGVTdGF0ZSA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlO1xuICAgICAgICAgICAgaWYgKG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZykge1xuICAgICAgICAgICAgICB2YXIgcXVlcnkgPSBtYWNyb01vZGVTdGF0ZS5yZXBsYXlTZWFyY2hRdWVyaWVzLnNoaWZ0KCk7XG4gICAgICAgICAgICAgIGhhbmRsZVF1ZXJ5KHF1ZXJ5LCB0cnVlIC8qKiBpZ25vcmVDYXNlICovLCBmYWxzZSAvKiogc21hcnRDYXNlICovKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNob3dQcm9tcHQoY20sIHtcbiAgICAgICAgICAgICAgICAgIG9uQ2xvc2U6IG9uUHJvbXB0Q2xvc2UsXG4gICAgICAgICAgICAgICAgICBwcmVmaXg6IHByb21wdFByZWZpeCxcbiAgICAgICAgICAgICAgICAgIGRlc2M6ICcoSmF2YVNjcmlwdCByZWdleHApJyxcbiAgICAgICAgICAgICAgICAgIG9uS2V5VXA6IG9uUHJvbXB0S2V5VXAsXG4gICAgICAgICAgICAgICAgICBvbktleURvd246IG9uUHJvbXB0S2V5RG93blxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3dvcmRVbmRlckN1cnNvcic6XG4gICAgICAgICAgICB2YXIgd29yZCA9IGV4cGFuZFdvcmRVbmRlckN1cnNvcihjbSwgZmFsc2UgLyoqIGluY2x1c2l2ZSAqLyxcbiAgICAgICAgICAgICAgICB0cnVlIC8qKiBmb3J3YXJkICovLCBmYWxzZSAvKiogYmlnV29yZCAqLyxcbiAgICAgICAgICAgICAgICB0cnVlIC8qKiBub1N5bWJvbCAqLyk7XG4gICAgICAgICAgICB2YXIgaXNLZXl3b3JkID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICghd29yZCkge1xuICAgICAgICAgICAgICB3b3JkID0gZXhwYW5kV29yZFVuZGVyQ3Vyc29yKGNtLCBmYWxzZSAvKiogaW5jbHVzaXZlICovLFxuICAgICAgICAgICAgICAgICAgdHJ1ZSAvKiogZm9yd2FyZCAqLywgZmFsc2UgLyoqIGJpZ1dvcmQgKi8sXG4gICAgICAgICAgICAgICAgICBmYWxzZSAvKiogbm9TeW1ib2wgKi8pO1xuICAgICAgICAgICAgICBpc0tleXdvcmQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghd29yZCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcXVlcnkgPSBjbS5nZXRMaW5lKHdvcmQuc3RhcnQubGluZSkuc3Vic3RyaW5nKHdvcmQuc3RhcnQuY2gsXG4gICAgICAgICAgICAgICAgd29yZC5lbmQuY2gpO1xuICAgICAgICAgICAgaWYgKGlzS2V5d29yZCAmJiB3aG9sZVdvcmRPbmx5KSB7XG4gICAgICAgICAgICAgICAgcXVlcnkgPSAnXFxcXGInICsgcXVlcnkgKyAnXFxcXGInO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcXVlcnkgPSBlc2NhcGVSZWdleChxdWVyeSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGNhY2hlZEN1cnNvciBpcyB1c2VkIHRvIHNhdmUgdGhlIG9sZCBwb3NpdGlvbiBvZiB0aGUgY3Vyc29yXG4gICAgICAgICAgICAvLyB3aGVuICogb3IgIyBjYXVzZXMgdmltIHRvIHNlZWsgZm9yIHRoZSBuZWFyZXN0IHdvcmQgYW5kIHNoaWZ0XG4gICAgICAgICAgICAvLyB0aGUgY3Vyc29yIGJlZm9yZSBlbnRlcmluZyB0aGUgbW90aW9uLlxuICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUuanVtcExpc3QuY2FjaGVkQ3Vyc29yID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgICAgICBjbS5zZXRDdXJzb3Iod29yZC5zdGFydCk7XG5cbiAgICAgICAgICAgIGhhbmRsZVF1ZXJ5KHF1ZXJ5LCB0cnVlIC8qKiBpZ25vcmVDYXNlICovLCBmYWxzZSAvKiogc21hcnRDYXNlICovKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJvY2Vzc0V4OiBmdW5jdGlvbihjbSwgdmltLCBjb21tYW5kKSB7XG4gICAgICAgIGZ1bmN0aW9uIG9uUHJvbXB0Q2xvc2UoaW5wdXQpIHtcbiAgICAgICAgICAvLyBHaXZlIHRoZSBwcm9tcHQgc29tZSB0aW1lIHRvIGNsb3NlIHNvIHRoYXQgaWYgcHJvY2Vzc0NvbW1hbmQgc2hvd3NcbiAgICAgICAgICAvLyBhbiBlcnJvciwgdGhlIGVsZW1lbnRzIGRvbid0IG92ZXJsYXAuXG4gICAgICAgICAgdmltR2xvYmFsU3RhdGUuZXhDb21tYW5kSGlzdG9yeUNvbnRyb2xsZXIucHVzaElucHV0KGlucHV0KTtcbiAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5leENvbW1hbmRIaXN0b3J5Q29udHJvbGxlci5yZXNldCgpO1xuICAgICAgICAgIGV4Q29tbWFuZERpc3BhdGNoZXIucHJvY2Vzc0NvbW1hbmQoY20sIGlucHV0KTtcbiAgICAgICAgICBpZiAoY20uc3RhdGUudmltKSBjbGVhcklucHV0U3RhdGUoY20pO1xuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIG9uUHJvbXB0S2V5RG93bihlLCBpbnB1dCwgY2xvc2UpIHtcbiAgICAgICAgICB2YXIga2V5TmFtZSA9IENvZGVNaXJyb3Iua2V5TmFtZShlKSwgdXAsIG9mZnNldDtcbiAgICAgICAgICBpZiAoa2V5TmFtZSA9PSAnRXNjJyB8fCBrZXlOYW1lID09ICdDdHJsLUMnIHx8IGtleU5hbWUgPT0gJ0N0cmwtWycgfHxcbiAgICAgICAgICAgICAgKGtleU5hbWUgPT0gJ0JhY2tzcGFjZScgJiYgaW5wdXQgPT0gJycpKSB7XG4gICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5leENvbW1hbmRIaXN0b3J5Q29udHJvbGxlci5wdXNoSW5wdXQoaW5wdXQpO1xuICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUuZXhDb21tYW5kSGlzdG9yeUNvbnRyb2xsZXIucmVzZXQoKTtcbiAgICAgICAgICAgIENvZGVNaXJyb3IuZV9zdG9wKGUpO1xuICAgICAgICAgICAgY2xlYXJJbnB1dFN0YXRlKGNtKTtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgICAgICBjbS5mb2N1cygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoa2V5TmFtZSA9PSAnVXAnIHx8IGtleU5hbWUgPT0gJ0Rvd24nKSB7XG4gICAgICAgICAgICBDb2RlTWlycm9yLmVfc3RvcChlKTtcbiAgICAgICAgICAgIHVwID0ga2V5TmFtZSA9PSAnVXAnID8gdHJ1ZSA6IGZhbHNlO1xuICAgICAgICAgICAgb2Zmc2V0ID0gZS50YXJnZXQgPyBlLnRhcmdldC5zZWxlY3Rpb25FbmQgOiAwO1xuICAgICAgICAgICAgaW5wdXQgPSB2aW1HbG9iYWxTdGF0ZS5leENvbW1hbmRIaXN0b3J5Q29udHJvbGxlci5uZXh0TWF0Y2goaW5wdXQsIHVwKSB8fCAnJztcbiAgICAgICAgICAgIGNsb3NlKGlucHV0KTtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgJiYgZS50YXJnZXQpIGUudGFyZ2V0LnNlbGVjdGlvbkVuZCA9IGUudGFyZ2V0LnNlbGVjdGlvblN0YXJ0ID0gTWF0aC5taW4ob2Zmc2V0LCBlLnRhcmdldC52YWx1ZS5sZW5ndGgpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoa2V5TmFtZSA9PSAnQ3RybC1VJykge1xuICAgICAgICAgICAgLy8gQ3RybC1VIGNsZWFycyBpbnB1dC5cbiAgICAgICAgICAgIENvZGVNaXJyb3IuZV9zdG9wKGUpO1xuICAgICAgICAgICAgY2xvc2UoJycpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIGtleU5hbWUgIT0gJ0xlZnQnICYmIGtleU5hbWUgIT0gJ1JpZ2h0JyAmJiBrZXlOYW1lICE9ICdDdHJsJyAmJiBrZXlOYW1lICE9ICdBbHQnICYmIGtleU5hbWUgIT0gJ1NoaWZ0JylcbiAgICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUuZXhDb21tYW5kSGlzdG9yeUNvbnRyb2xsZXIucmVzZXQoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbW1hbmQudHlwZSA9PSAna2V5VG9FeCcpIHtcbiAgICAgICAgICAvLyBIYW5kbGUgdXNlciBkZWZpbmVkIEV4IHRvIEV4IG1hcHBpbmdzXG4gICAgICAgICAgZXhDb21tYW5kRGlzcGF0Y2hlci5wcm9jZXNzQ29tbWFuZChjbSwgY29tbWFuZC5leEFyZ3MuaW5wdXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgc2hvd1Byb21wdChjbSwgeyBvbkNsb3NlOiBvblByb21wdENsb3NlLCBwcmVmaXg6ICc6JywgdmFsdWU6ICdcXCc8LFxcJz4nLFxuICAgICAgICAgICAgICAgIG9uS2V5RG93bjogb25Qcm9tcHRLZXlEb3duLCBzZWxlY3RWYWx1ZU9uT3BlbjogZmFsc2V9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2hvd1Byb21wdChjbSwgeyBvbkNsb3NlOiBvblByb21wdENsb3NlLCBwcmVmaXg6ICc6JyxcbiAgICAgICAgICAgICAgICBvbktleURvd246IG9uUHJvbXB0S2V5RG93bn0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGV2YWxJbnB1dDogZnVuY3Rpb24oY20sIHZpbSkge1xuICAgICAgICAvLyBJZiB0aGUgbW90aW9uIGNvbW1hbmQgaXMgc2V0LCBleGVjdXRlIGJvdGggdGhlIG9wZXJhdG9yIGFuZCBtb3Rpb24uXG4gICAgICAgIC8vIE90aGVyd2lzZSByZXR1cm4uXG4gICAgICAgIHZhciBpbnB1dFN0YXRlID0gdmltLmlucHV0U3RhdGU7XG4gICAgICAgIHZhciBtb3Rpb24gPSBpbnB1dFN0YXRlLm1vdGlvbjtcbiAgICAgICAgdmFyIG1vdGlvbkFyZ3MgPSBpbnB1dFN0YXRlLm1vdGlvbkFyZ3MgfHwge307XG4gICAgICAgIHZhciBvcGVyYXRvciA9IGlucHV0U3RhdGUub3BlcmF0b3I7XG4gICAgICAgIHZhciBvcGVyYXRvckFyZ3MgPSBpbnB1dFN0YXRlLm9wZXJhdG9yQXJncyB8fCB7fTtcbiAgICAgICAgdmFyIHJlZ2lzdGVyTmFtZSA9IGlucHV0U3RhdGUucmVnaXN0ZXJOYW1lO1xuICAgICAgICB2YXIgc2VsID0gdmltLnNlbDtcbiAgICAgICAgLy8gVE9ETzogTWFrZSBzdXJlIGNtIGFuZCB2aW0gc2VsZWN0aW9ucyBhcmUgaWRlbnRpY2FsIG91dHNpZGUgdmlzdWFsIG1vZGUuXG4gICAgICAgIHZhciBvcmlnSGVhZCA9IGNvcHlDdXJzb3IodmltLnZpc3VhbE1vZGUgPyBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBzZWwuaGVhZCk6IGNtLmdldEN1cnNvcignaGVhZCcpKTtcbiAgICAgICAgdmFyIG9yaWdBbmNob3IgPSBjb3B5Q3Vyc29yKHZpbS52aXN1YWxNb2RlID8gY2xpcEN1cnNvclRvQ29udGVudChjbSwgc2VsLmFuY2hvcikgOiBjbS5nZXRDdXJzb3IoJ2FuY2hvcicpKTtcbiAgICAgICAgdmFyIG9sZEhlYWQgPSBjb3B5Q3Vyc29yKG9yaWdIZWFkKTtcbiAgICAgICAgdmFyIG9sZEFuY2hvciA9IGNvcHlDdXJzb3Iob3JpZ0FuY2hvcik7XG4gICAgICAgIHZhciBuZXdIZWFkLCBuZXdBbmNob3I7XG4gICAgICAgIHZhciByZXBlYXQ7XG4gICAgICAgIGlmIChvcGVyYXRvcikge1xuICAgICAgICAgIHRoaXMucmVjb3JkTGFzdEVkaXQodmltLCBpbnB1dFN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5wdXRTdGF0ZS5yZXBlYXRPdmVycmlkZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgLy8gSWYgcmVwZWF0T3ZlcnJpZGUgaXMgc3BlY2lmaWVkLCB0aGF0IHRha2VzIHByZWNlZGVuY2Ugb3ZlciB0aGVcbiAgICAgICAgICAvLyBpbnB1dCBzdGF0ZSdzIHJlcGVhdC4gVXNlZCBieSBFeCBtb2RlIGFuZCBjYW4gYmUgdXNlciBkZWZpbmVkLlxuICAgICAgICAgIHJlcGVhdCA9IGlucHV0U3RhdGUucmVwZWF0T3ZlcnJpZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwZWF0ID0gaW5wdXRTdGF0ZS5nZXRSZXBlYXQoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVwZWF0ID4gMCAmJiBtb3Rpb25BcmdzLmV4cGxpY2l0UmVwZWF0KSB7XG4gICAgICAgICAgbW90aW9uQXJncy5yZXBlYXRJc0V4cGxpY2l0ID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmIChtb3Rpb25BcmdzLm5vUmVwZWF0IHx8XG4gICAgICAgICAgICAoIW1vdGlvbkFyZ3MuZXhwbGljaXRSZXBlYXQgJiYgcmVwZWF0ID09PSAwKSkge1xuICAgICAgICAgIHJlcGVhdCA9IDE7XG4gICAgICAgICAgbW90aW9uQXJncy5yZXBlYXRJc0V4cGxpY2l0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlucHV0U3RhdGUuc2VsZWN0ZWRDaGFyYWN0ZXIpIHtcbiAgICAgICAgICAvLyBJZiB0aGVyZSBpcyBhIGNoYXJhY3RlciBpbnB1dCwgc3RpY2sgaXQgaW4gYWxsIG9mIHRoZSBhcmcgYXJyYXlzLlxuICAgICAgICAgIG1vdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXIgPSBvcGVyYXRvckFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXIgPVxuICAgICAgICAgICAgICBpbnB1dFN0YXRlLnNlbGVjdGVkQ2hhcmFjdGVyO1xuICAgICAgICB9XG4gICAgICAgIG1vdGlvbkFyZ3MucmVwZWF0ID0gcmVwZWF0O1xuICAgICAgICBjbGVhcklucHV0U3RhdGUoY20pO1xuICAgICAgICBpZiAobW90aW9uKSB7XG4gICAgICAgICAgdmFyIG1vdGlvblJlc3VsdCA9IG1vdGlvbnNbbW90aW9uXShjbSwgb3JpZ0hlYWQsIG1vdGlvbkFyZ3MsIHZpbSwgaW5wdXRTdGF0ZSk7XG4gICAgICAgICAgdmltLmxhc3RNb3Rpb24gPSBtb3Rpb25zW21vdGlvbl07XG4gICAgICAgICAgaWYgKCFtb3Rpb25SZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1vdGlvbkFyZ3MudG9KdW1wbGlzdCkge1xuICAgICAgICAgICAgaWYgKCFvcGVyYXRvciAmJiBjbS5hY2UuY3VyT3AgIT0gbnVsbClcbiAgICAgICAgICAgICAgY20uYWNlLmN1ck9wLmNvbW1hbmQuc2Nyb2xsSW50b1ZpZXcgPSBcImNlbnRlci1hbmltYXRlXCI7IC8vIGFjZV9wYXRjaFxuICAgICAgICAgICAgdmFyIGp1bXBMaXN0ID0gdmltR2xvYmFsU3RhdGUuanVtcExpc3Q7XG4gICAgICAgICAgICAvLyBpZiB0aGUgY3VycmVudCBtb3Rpb24gaXMgIyBvciAqLCB1c2UgY2FjaGVkQ3Vyc29yXG4gICAgICAgICAgICB2YXIgY2FjaGVkQ3Vyc29yID0ganVtcExpc3QuY2FjaGVkQ3Vyc29yO1xuICAgICAgICAgICAgaWYgKGNhY2hlZEN1cnNvcikge1xuICAgICAgICAgICAgICByZWNvcmRKdW1wUG9zaXRpb24oY20sIGNhY2hlZEN1cnNvciwgbW90aW9uUmVzdWx0KTtcbiAgICAgICAgICAgICAgZGVsZXRlIGp1bXBMaXN0LmNhY2hlZEN1cnNvcjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlY29yZEp1bXBQb3NpdGlvbihjbSwgb3JpZ0hlYWQsIG1vdGlvblJlc3VsdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChtb3Rpb25SZXN1bHQgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgbmV3QW5jaG9yID0gbW90aW9uUmVzdWx0WzBdO1xuICAgICAgICAgICAgbmV3SGVhZCA9IG1vdGlvblJlc3VsdFsxXTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbmV3SGVhZCA9IG1vdGlvblJlc3VsdDtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gVE9ETzogSGFuZGxlIG51bGwgcmV0dXJucyBmcm9tIG1vdGlvbiBjb21tYW5kcyBiZXR0ZXIuXG4gICAgICAgICAgaWYgKCFuZXdIZWFkKSB7XG4gICAgICAgICAgICBuZXdIZWFkID0gY29weUN1cnNvcihvcmlnSGVhZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgaWYgKCEodmltLnZpc3VhbEJsb2NrICYmIG5ld0hlYWQuY2ggPT09IEluZmluaXR5KSkge1xuICAgICAgICAgICAgICBuZXdIZWFkID0gY2xpcEN1cnNvclRvQ29udGVudChjbSwgbmV3SGVhZCwgb2xkSGVhZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobmV3QW5jaG9yKSB7XG4gICAgICAgICAgICAgIG5ld0FuY2hvciA9IGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIG5ld0FuY2hvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBuZXdBbmNob3IgPSBuZXdBbmNob3IgfHwgb2xkQW5jaG9yO1xuICAgICAgICAgICAgc2VsLmFuY2hvciA9IG5ld0FuY2hvcjtcbiAgICAgICAgICAgIHNlbC5oZWFkID0gbmV3SGVhZDtcbiAgICAgICAgICAgIHVwZGF0ZUNtU2VsZWN0aW9uKGNtKTtcbiAgICAgICAgICAgIHVwZGF0ZU1hcmsoY20sIHZpbSwgJzwnLFxuICAgICAgICAgICAgICAgIGN1cnNvcklzQmVmb3JlKG5ld0FuY2hvciwgbmV3SGVhZCkgPyBuZXdBbmNob3JcbiAgICAgICAgICAgICAgICAgICAgOiBuZXdIZWFkKTtcbiAgICAgICAgICAgIHVwZGF0ZU1hcmsoY20sIHZpbSwgJz4nLFxuICAgICAgICAgICAgICAgIGN1cnNvcklzQmVmb3JlKG5ld0FuY2hvciwgbmV3SGVhZCkgPyBuZXdIZWFkXG4gICAgICAgICAgICAgICAgICAgIDogbmV3QW5jaG9yKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCFvcGVyYXRvcikge1xuICAgICAgICAgICAgaWYgKGNtLmFjZS5jdXJPcClcbiAgICAgICAgICAgICAgY20uYWNlLmN1ck9wLnZpbURpYWxvZ1Njcm9sbCA9IFwiY2VudGVyLWFuaW1hdGVcIjsgLy8gYWNlX3BhdGNoXG4gICAgICAgICAgICBuZXdIZWFkID0gY2xpcEN1cnNvclRvQ29udGVudChjbSwgbmV3SGVhZCwgb2xkSGVhZCk7XG4gICAgICAgICAgICBjbS5zZXRDdXJzb3IobmV3SGVhZC5saW5lLCBuZXdIZWFkLmNoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wZXJhdG9yKSB7XG4gICAgICAgICAgaWYgKG9wZXJhdG9yQXJncy5sYXN0U2VsKSB7XG4gICAgICAgICAgICAvLyBSZXBsYXlpbmcgYSB2aXN1YWwgbW9kZSBvcGVyYXRpb25cbiAgICAgICAgICAgIG5ld0FuY2hvciA9IG9sZEFuY2hvcjtcbiAgICAgICAgICAgIHZhciBsYXN0U2VsID0gb3BlcmF0b3JBcmdzLmxhc3RTZWw7XG4gICAgICAgICAgICB2YXIgbGluZU9mZnNldCA9IE1hdGguYWJzKGxhc3RTZWwuaGVhZC5saW5lIC0gbGFzdFNlbC5hbmNob3IubGluZSk7XG4gICAgICAgICAgICB2YXIgY2hPZmZzZXQgPSBNYXRoLmFicyhsYXN0U2VsLmhlYWQuY2ggLSBsYXN0U2VsLmFuY2hvci5jaCk7XG4gICAgICAgICAgICBpZiAobGFzdFNlbC52aXN1YWxMaW5lKSB7XG4gICAgICAgICAgICAgIC8vIExpbmV3aXNlIFZpc3VhbCBtb2RlOiBUaGUgc2FtZSBudW1iZXIgb2YgbGluZXMuXG4gICAgICAgICAgICAgIG5ld0hlYWQgPSBuZXcgUG9zKG9sZEFuY2hvci5saW5lICsgbGluZU9mZnNldCwgb2xkQW5jaG9yLmNoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobGFzdFNlbC52aXN1YWxCbG9jaykge1xuICAgICAgICAgICAgICAvLyBCbG9ja3dpc2UgVmlzdWFsIG1vZGU6IFRoZSBzYW1lIG51bWJlciBvZiBsaW5lcyBhbmQgY29sdW1ucy5cbiAgICAgICAgICAgICAgbmV3SGVhZCA9IG5ldyBQb3Mob2xkQW5jaG9yLmxpbmUgKyBsaW5lT2Zmc2V0LCBvbGRBbmNob3IuY2ggKyBjaE9mZnNldCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxhc3RTZWwuaGVhZC5saW5lID09IGxhc3RTZWwuYW5jaG9yLmxpbmUpIHtcbiAgICAgICAgICAgICAgLy8gTm9ybWFsIFZpc3VhbCBtb2RlIHdpdGhpbiBvbmUgbGluZTogVGhlIHNhbWUgbnVtYmVyIG9mIGNoYXJhY3RlcnMuXG4gICAgICAgICAgICAgIG5ld0hlYWQgPSBuZXcgUG9zKG9sZEFuY2hvci5saW5lLCBvbGRBbmNob3IuY2ggKyBjaE9mZnNldCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAvLyBOb3JtYWwgVmlzdWFsIG1vZGUgd2l0aCBzZXZlcmFsIGxpbmVzOiBUaGUgc2FtZSBudW1iZXIgb2YgbGluZXMsIGluIHRoZVxuICAgICAgICAgICAgICAvLyBsYXN0IGxpbmUgdGhlIHNhbWUgbnVtYmVyIG9mIGNoYXJhY3RlcnMgYXMgaW4gdGhlIGxhc3QgbGluZSB0aGUgbGFzdCB0aW1lLlxuICAgICAgICAgICAgICBuZXdIZWFkID0gbmV3IFBvcyhvbGRBbmNob3IubGluZSArIGxpbmVPZmZzZXQsIG9sZEFuY2hvci5jaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2aW0udmlzdWFsTW9kZSA9IHRydWU7XG4gICAgICAgICAgICB2aW0udmlzdWFsTGluZSA9IGxhc3RTZWwudmlzdWFsTGluZTtcbiAgICAgICAgICAgIHZpbS52aXN1YWxCbG9jayA9IGxhc3RTZWwudmlzdWFsQmxvY2s7XG4gICAgICAgICAgICBzZWwgPSB2aW0uc2VsID0ge1xuICAgICAgICAgICAgICBhbmNob3I6IG5ld0FuY2hvcixcbiAgICAgICAgICAgICAgaGVhZDogbmV3SGVhZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHVwZGF0ZUNtU2VsZWN0aW9uKGNtKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICBvcGVyYXRvckFyZ3MubGFzdFNlbCA9IHtcbiAgICAgICAgICAgICAgYW5jaG9yOiBjb3B5Q3Vyc29yKHNlbC5hbmNob3IpLFxuICAgICAgICAgICAgICBoZWFkOiBjb3B5Q3Vyc29yKHNlbC5oZWFkKSxcbiAgICAgICAgICAgICAgdmlzdWFsQmxvY2s6IHZpbS52aXN1YWxCbG9jayxcbiAgICAgICAgICAgICAgdmlzdWFsTGluZTogdmltLnZpc3VhbExpbmVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBjdXJTdGFydCwgY3VyRW5kLCBsaW5ld2lzZSwgbW9kZTtcbiAgICAgICAgICB2YXIgY21TZWw7XG4gICAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgICAvLyBJbml0IHZpc3VhbCBvcFxuICAgICAgICAgICAgY3VyU3RhcnQgPSBjdXJzb3JNaW4oc2VsLmhlYWQsIHNlbC5hbmNob3IpO1xuICAgICAgICAgICAgY3VyRW5kID0gY3Vyc29yTWF4KHNlbC5oZWFkLCBzZWwuYW5jaG9yKTtcbiAgICAgICAgICAgIGxpbmV3aXNlID0gdmltLnZpc3VhbExpbmUgfHwgb3BlcmF0b3JBcmdzLmxpbmV3aXNlO1xuICAgICAgICAgICAgbW9kZSA9IHZpbS52aXN1YWxCbG9jayA/ICdibG9jaycgOlxuICAgICAgICAgICAgICAgICAgIGxpbmV3aXNlID8gJ2xpbmUnIDpcbiAgICAgICAgICAgICAgICAgICAnY2hhcic7XG4gICAgICAgICAgICB2YXIgbmV3UG9zaXRpb25zID0gdXBkYXRlU2VsZWN0aW9uRm9yU3Vycm9nYXRlQ2hhcmFjdGVycyhjbSwgY3VyU3RhcnQsIGN1ckVuZCk7XG4gICAgICAgICAgICBjbVNlbCA9IG1ha2VDbVNlbGVjdGlvbihjbSwge1xuICAgICAgICAgICAgICBhbmNob3I6IG5ld1Bvc2l0aW9ucy5zdGFydCxcbiAgICAgICAgICAgICAgaGVhZDogbmV3UG9zaXRpb25zLmVuZFxuICAgICAgICAgICAgfSwgbW9kZSk7XG4gICAgICAgICAgICBpZiAobGluZXdpc2UpIHtcbiAgICAgICAgICAgICAgdmFyIHJhbmdlcyA9IGNtU2VsLnJhbmdlcztcbiAgICAgICAgICAgICAgaWYgKG1vZGUgPT0gJ2Jsb2NrJykge1xuICAgICAgICAgICAgICAgIC8vIExpbmV3aXNlIG9wZXJhdG9ycyBpbiB2aXN1YWwgYmxvY2sgbW9kZSBleHRlbmQgdG8gZW5kIG9mIGxpbmVcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgcmFuZ2VzW2ldLmhlYWQuY2ggPSBsaW5lTGVuZ3RoKGNtLCByYW5nZXNbaV0uaGVhZC5saW5lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAobW9kZSA9PSAnbGluZScpIHtcbiAgICAgICAgICAgICAgICByYW5nZXNbMF0uaGVhZCA9IG5ldyBQb3MocmFuZ2VzWzBdLmhlYWQubGluZSArIDEsIDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEluaXQgbW90aW9uIG9wXG4gICAgICAgICAgICBjdXJTdGFydCA9IGNvcHlDdXJzb3IobmV3QW5jaG9yIHx8IG9sZEFuY2hvcik7XG4gICAgICAgICAgICBjdXJFbmQgPSBjb3B5Q3Vyc29yKG5ld0hlYWQgfHwgb2xkSGVhZCk7XG4gICAgICAgICAgICBpZiAoY3Vyc29ySXNCZWZvcmUoY3VyRW5kLCBjdXJTdGFydCkpIHtcbiAgICAgICAgICAgICAgdmFyIHRtcCA9IGN1clN0YXJ0O1xuICAgICAgICAgICAgICBjdXJTdGFydCA9IGN1ckVuZDtcbiAgICAgICAgICAgICAgY3VyRW5kID0gdG1wO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGluZXdpc2UgPSBtb3Rpb25BcmdzLmxpbmV3aXNlIHx8IG9wZXJhdG9yQXJncy5saW5ld2lzZTtcbiAgICAgICAgICAgIGlmIChsaW5ld2lzZSkge1xuICAgICAgICAgICAgICAvLyBFeHBhbmQgc2VsZWN0aW9uIHRvIGVudGlyZSBsaW5lLlxuICAgICAgICAgICAgICBleHBhbmRTZWxlY3Rpb25Ub0xpbmUoY20sIGN1clN0YXJ0LCBjdXJFbmQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChtb3Rpb25BcmdzLmZvcndhcmQpIHtcbiAgICAgICAgICAgICAgLy8gQ2xpcCB0byB0cmFpbGluZyBuZXdsaW5lcyBvbmx5IGlmIHRoZSBtb3Rpb24gZ29lcyBmb3J3YXJkLlxuICAgICAgICAgICAgICBjbGlwVG9MaW5lKGNtLCBjdXJTdGFydCwgY3VyRW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG1vZGUgPSAnY2hhcic7XG4gICAgICAgICAgICB2YXIgZXhjbHVzaXZlID0gIW1vdGlvbkFyZ3MuaW5jbHVzaXZlIHx8IGxpbmV3aXNlO1xuICAgICAgICAgICAgdmFyIG5ld1Bvc2l0aW9ucyA9IHVwZGF0ZVNlbGVjdGlvbkZvclN1cnJvZ2F0ZUNoYXJhY3RlcnMoY20sIGN1clN0YXJ0LCBjdXJFbmQpO1xuICAgICAgICAgICAgY21TZWwgPSBtYWtlQ21TZWxlY3Rpb24oY20sIHtcbiAgICAgICAgICAgICAgYW5jaG9yOiBuZXdQb3NpdGlvbnMuc3RhcnQsXG4gICAgICAgICAgICAgIGhlYWQ6IG5ld1Bvc2l0aW9ucy5lbmRcbiAgICAgICAgICAgIH0sIG1vZGUsIGV4Y2x1c2l2ZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNtLnNldFNlbGVjdGlvbnMoY21TZWwucmFuZ2VzLCBjbVNlbC5wcmltYXJ5KTtcbiAgICAgICAgICB2aW0ubGFzdE1vdGlvbiA9IG51bGw7XG4gICAgICAgICAgb3BlcmF0b3JBcmdzLnJlcGVhdCA9IHJlcGVhdDsgLy8gRm9yIGluZGVudCBpbiB2aXN1YWwgbW9kZS5cbiAgICAgICAgICBvcGVyYXRvckFyZ3MucmVnaXN0ZXJOYW1lID0gcmVnaXN0ZXJOYW1lO1xuICAgICAgICAgIC8vIEtlZXAgdHJhY2sgb2YgbGluZXdpc2UgYXMgaXQgYWZmZWN0cyBob3cgcGFzdGUgYW5kIGNoYW5nZSBiZWhhdmUuXG4gICAgICAgICAgb3BlcmF0b3JBcmdzLmxpbmV3aXNlID0gbGluZXdpc2U7XG4gICAgICAgICAgdmFyIG9wZXJhdG9yTW92ZVRvID0gb3BlcmF0b3JzW29wZXJhdG9yXShcbiAgICAgICAgICAgIGNtLCBvcGVyYXRvckFyZ3MsIGNtU2VsLnJhbmdlcywgb2xkQW5jaG9yLCBuZXdIZWFkKTtcbiAgICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIGV4aXRWaXN1YWxNb2RlKGNtLCBvcGVyYXRvck1vdmVUbyAhPSBudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG9wZXJhdG9yTW92ZVRvKSB7XG4gICAgICAgICAgICBjbS5zZXRDdXJzb3Iob3BlcmF0b3JNb3ZlVG8pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHJlY29yZExhc3RFZGl0OiBmdW5jdGlvbih2aW0sIGlucHV0U3RhdGUsIGFjdGlvbkNvbW1hbmQpIHtcbiAgICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICAgIGlmIChtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmcpIHsgcmV0dXJuOyB9XG4gICAgICAgIHZpbS5sYXN0RWRpdElucHV0U3RhdGUgPSBpbnB1dFN0YXRlO1xuICAgICAgICB2aW0ubGFzdEVkaXRBY3Rpb25Db21tYW5kID0gYWN0aW9uQ29tbWFuZDtcbiAgICAgICAgbWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzLmNoYW5nZXMgPSBbXTtcbiAgICAgICAgbWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzLmV4cGVjdEN1cnNvckFjdGl2aXR5Rm9yQ2hhbmdlID0gZmFsc2U7XG4gICAgICAgIG1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcy52aXN1YWxCbG9jayA9IHZpbS52aXN1YWxCbG9jayA/IHZpbS5zZWwuaGVhZC5saW5lIC0gdmltLnNlbC5hbmNob3IubGluZSA6IDA7XG4gICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIHR5cGVkZWYge09iamVjdHtsaW5lOm51bWJlcixjaDpudW1iZXJ9fSBDdXJzb3IgQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlXG4gICAgICogICAgIHBvc2l0aW9uIG9mIHRoZSBjdXJzb3IuXG4gICAgICovXG4gICAgLy8gQWxsIG9mIHRoZSBmdW5jdGlvbnMgYmVsb3cgcmV0dXJuIEN1cnNvciBvYmplY3RzLlxuICAgIHZhciBtb3Rpb25zID0ge1xuICAgICAgbW92ZVRvVG9wTGluZTogZnVuY3Rpb24oY20sIF9oZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciBsaW5lID0gZ2V0VXNlclZpc2libGVMaW5lcyhjbSkudG9wICsgbW90aW9uQXJncy5yZXBlYXQgLTE7XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGxpbmUsIGZpbmRGaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20uZ2V0TGluZShsaW5lKSkpO1xuICAgICAgfSxcbiAgICAgIG1vdmVUb01pZGRsZUxpbmU6IGZ1bmN0aW9uKGNtKSB7XG4gICAgICAgIHZhciByYW5nZSA9IGdldFVzZXJWaXNpYmxlTGluZXMoY20pO1xuICAgICAgICB2YXIgbGluZSA9IE1hdGguZmxvb3IoKHJhbmdlLnRvcCArIHJhbmdlLmJvdHRvbSkgKiAwLjUpO1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhsaW5lLCBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUobGluZSkpKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlVG9Cb3R0b21MaW5lOiBmdW5jdGlvbihjbSwgX2hlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBnZXRVc2VyVmlzaWJsZUxpbmVzKGNtKS5ib3R0b20gLSBtb3Rpb25BcmdzLnJlcGVhdCArMTtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MobGluZSwgZmluZEZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbS5nZXRMaW5lKGxpbmUpKSk7XG4gICAgICB9LFxuICAgICAgZXhwYW5kVG9MaW5lOiBmdW5jdGlvbihfY20sIGhlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgLy8gRXhwYW5kcyBmb3J3YXJkIHRvIGVuZCBvZiBsaW5lLCBhbmQgdGhlbiB0byBuZXh0IGxpbmUgaWYgcmVwZWF0IGlzXG4gICAgICAgIC8vID4xLiBEb2VzIG5vdCBoYW5kbGUgYmFja3dhcmQgbW90aW9uIVxuICAgICAgICB2YXIgY3VyID0gaGVhZDtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MoY3VyLmxpbmUgKyBtb3Rpb25BcmdzLnJlcGVhdCAtIDEsIEluZmluaXR5KTtcbiAgICAgIH0sXG4gICAgICBmaW5kTmV4dDogZnVuY3Rpb24oY20sIF9oZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IGdldFNlYXJjaFN0YXRlKGNtKTtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gc3RhdGUuZ2V0UXVlcnkoKTtcbiAgICAgICAgaWYgKCFxdWVyeSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJldiA9ICFtb3Rpb25BcmdzLmZvcndhcmQ7XG4gICAgICAgIC8vIElmIHNlYXJjaCBpcyBpbml0aWF0ZWQgd2l0aCA/IGluc3RlYWQgb2YgLywgbmVnYXRlIGRpcmVjdGlvbi5cbiAgICAgICAgcHJldiA9IChzdGF0ZS5pc1JldmVyc2VkKCkpID8gIXByZXYgOiBwcmV2O1xuICAgICAgICBoaWdobGlnaHRTZWFyY2hNYXRjaGVzKGNtLCBxdWVyeSk7XG4gICAgICAgIHJldHVybiBmaW5kTmV4dChjbSwgcHJldi8qKiBwcmV2ICovLCBxdWVyeSwgbW90aW9uQXJncy5yZXBlYXQpO1xuICAgICAgfSxcbiAgICAgIC8qKlxuICAgICAgICogRmluZCBhbmQgc2VsZWN0IHRoZSBuZXh0IG9jY3VycmVuY2Ugb2YgdGhlIHNlYXJjaCBxdWVyeS4gSWYgdGhlIGN1cnNvciBpcyBjdXJyZW50bHlcbiAgICAgICAqIHdpdGhpbiBhIG1hdGNoLCB0aGVuIGZpbmQgYW5kIHNlbGVjdCB0aGUgY3VycmVudCBtYXRjaC4gT3RoZXJ3aXNlLCBmaW5kIHRoZSBuZXh0IG9jY3VycmVuY2UgaW4gdGhlXG4gICAgICAgKiBhcHByb3ByaWF0ZSBkaXJlY3Rpb24uXG4gICAgICAgKlxuICAgICAgICogVGhpcyBkaWZmZXJzIGZyb20gYGZpbmROZXh0YCBpbiB0aGUgZm9sbG93aW5nIHdheXM6XG4gICAgICAgKlxuICAgICAgICogMS4gSW5zdGVhZCBvZiBvbmx5IHJldHVybmluZyB0aGUgXCJmcm9tXCIsIHRoaXMgcmV0dXJucyBhIFwiZnJvbVwiLCBcInRvXCIgcmFuZ2UuXG4gICAgICAgKiAyLiBJZiB0aGUgY3Vyc29yIGlzIGN1cnJlbnRseSBpbnNpZGUgYSBzZWFyY2ggbWF0Y2gsIHRoaXMgc2VsZWN0cyB0aGUgY3VycmVudCBtYXRjaFxuICAgICAgICogICAgaW5zdGVhZCBvZiB0aGUgbmV4dCBtYXRjaC5cbiAgICAgICAqIDMuIElmIHRoZXJlIGlzIG5vIGFzc29jaWF0ZWQgb3BlcmF0b3IsIHRoaXMgd2lsbCB0dXJuIG9uIHZpc3VhbCBtb2RlLlxuICAgICAgICovXG4gICAgICBmaW5kQW5kU2VsZWN0TmV4dEluY2x1c2l2ZTogZnVuY3Rpb24oY20sIF9oZWFkLCBtb3Rpb25BcmdzLCB2aW0sIHByZXZJbnB1dFN0YXRlKSB7XG4gICAgICAgIHZhciBzdGF0ZSA9IGdldFNlYXJjaFN0YXRlKGNtKTtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gc3RhdGUuZ2V0UXVlcnkoKTtcblxuICAgICAgICBpZiAoIXF1ZXJ5KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHByZXYgPSAhbW90aW9uQXJncy5mb3J3YXJkO1xuICAgICAgICBwcmV2ID0gKHN0YXRlLmlzUmV2ZXJzZWQoKSkgPyAhcHJldiA6IHByZXY7XG5cbiAgICAgICAgLy8gbmV4dDogW2Zyb20sIHRvXSB8IG51bGxcbiAgICAgICAgdmFyIG5leHQgPSBmaW5kTmV4dEZyb21BbmRUb0luY2x1c2l2ZShjbSwgcHJldiwgcXVlcnksIG1vdGlvbkFyZ3MucmVwZWF0LCB2aW0pO1xuXG4gICAgICAgIC8vIE5vIG1hdGNoZXMuXG4gICAgICAgIGlmICghbmV4dCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZXJlJ3MgYW4gb3BlcmF0b3IgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkLCByZXR1cm4gdGhlIHNlbGVjdGlvbi5cbiAgICAgICAgaWYgKHByZXZJbnB1dFN0YXRlLm9wZXJhdG9yKSB7XG4gICAgICAgICAgcmV0dXJuIG5leHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBBdCB0aGlzIHBvaW50LCB3ZSBrbm93IHRoYXQgdGhlcmUgaXMgbm8gYWNjb21wYW55aW5nIG9wZXJhdG9yIC0tIGxldCdzXG4gICAgICAgIC8vIGRlYWwgd2l0aCB2aXN1YWwgbW9kZSBpbiBvcmRlciB0byBzZWxlY3QgYW4gYXBwcm9wcmlhdGUgbWF0Y2guXG5cbiAgICAgICAgdmFyIGZyb20gPSBuZXh0WzBdO1xuICAgICAgICAvLyBGb3Igd2hhdGV2ZXIgcmVhc29uLCB3aGVuIHdlIHVzZSB0aGUgXCJ0b1wiIGFzIHJldHVybmVkIGJ5IHNlYXJjaGN1cnNvci5qcyBkaXJlY3RseSxcbiAgICAgICAgLy8gdGhlIHJlc3VsdGluZyBzZWxlY3Rpb24gaXMgZXh0ZW5kZWQgYnkgMSBjaGFyLiBMZXQncyBzaHJpbmsgaXQgc28gdGhhdCBvbmx5IHRoZVxuICAgICAgICAvLyBtYXRjaCBpcyBzZWxlY3RlZC5cbiAgICAgICAgdmFyIHRvID0gbmV3IFBvcyhuZXh0WzFdLmxpbmUsIG5leHRbMV0uY2ggLSAxKTtcblxuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAvLyBJZiB3ZSB3ZXJlIGluIHZpc3VhbExpbmUgb3IgdmlzdWFsQmxvY2sgbW9kZSwgZ2V0IG91dCBvZiBpdC5cbiAgICAgICAgICBpZiAodmltLnZpc3VhbExpbmUgfHwgdmltLnZpc3VhbEJsb2NrKSB7XG4gICAgICAgICAgICB2aW0udmlzdWFsTGluZSA9IGZhbHNlO1xuICAgICAgICAgICAgdmltLnZpc3VhbEJsb2NrID0gZmFsc2U7XG4gICAgICAgICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwge21vZGU6IFwidmlzdWFsXCIsIHN1Yk1vZGU6IFwiXCJ9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBJZiB3ZSdyZSBjdXJyZW50bHkgaW4gdmlzdWFsIG1vZGUsIHdlIHNob3VsZCBleHRlbmQgdGhlIHNlbGVjdGlvbiB0byBpbmNsdWRlXG4gICAgICAgICAgLy8gdGhlIHNlYXJjaCByZXN1bHQuXG4gICAgICAgICAgdmFyIGFuY2hvciA9IHZpbS5zZWwuYW5jaG9yO1xuICAgICAgICAgIGlmIChhbmNob3IpIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5pc1JldmVyc2VkKCkpIHtcbiAgICAgICAgICAgICAgaWYgKG1vdGlvbkFyZ3MuZm9yd2FyZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbYW5jaG9yLCBmcm9tXTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBbYW5jaG9yLCB0b107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAobW90aW9uQXJncy5mb3J3YXJkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFthbmNob3IsIHRvXTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIHJldHVybiBbYW5jaG9yLCBmcm9tXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gTGV0J3MgdHVybiB2aXN1YWwgbW9kZSBvbi5cbiAgICAgICAgICB2aW0udmlzdWFsTW9kZSA9IHRydWU7XG4gICAgICAgICAgdmltLnZpc3VhbExpbmUgPSBmYWxzZTtcbiAgICAgICAgICB2aW0udmlzdWFsQmxvY2sgPSBmYWxzZTtcbiAgICAgICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwge21vZGU6IFwidmlzdWFsXCIsIHN1Yk1vZGU6IFwiXCJ9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwcmV2ID8gW3RvLCBmcm9tXSA6IFtmcm9tLCB0b107XG4gICAgICB9LFxuICAgICAgZ29Ub01hcms6IGZ1bmN0aW9uKGNtLCBfaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciBwb3MgPSBnZXRNYXJrUG9zKGNtLCB2aW0sIG1vdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXIpO1xuICAgICAgICBpZiAocG9zKSB7XG4gICAgICAgICAgcmV0dXJuIG1vdGlvbkFyZ3MubGluZXdpc2UgPyB7IGxpbmU6IHBvcy5saW5lLCBjaDogZmluZEZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbS5nZXRMaW5lKHBvcy5saW5lKSkgfSA6IHBvcztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0sXG4gICAgICBtb3ZlVG9PdGhlckhpZ2hsaWdodGVkRW5kOiBmdW5jdGlvbihjbSwgX2hlYWQsIG1vdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICBpZiAodmltLnZpc3VhbEJsb2NrICYmIG1vdGlvbkFyZ3Muc2FtZUxpbmUpIHtcbiAgICAgICAgICB2YXIgc2VsID0gdmltLnNlbDtcbiAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgY2xpcEN1cnNvclRvQ29udGVudChjbSwgbmV3IFBvcyhzZWwuYW5jaG9yLmxpbmUsIHNlbC5oZWFkLmNoKSksXG4gICAgICAgICAgICBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBuZXcgUG9zKHNlbC5oZWFkLmxpbmUsIHNlbC5hbmNob3IuY2gpKVxuICAgICAgICAgIF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIChbdmltLnNlbC5oZWFkLCB2aW0uc2VsLmFuY2hvcl0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAganVtcFRvTWFyazogZnVuY3Rpb24oY20sIGhlYWQsIG1vdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgYmVzdCA9IGhlYWQ7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW90aW9uQXJncy5yZXBlYXQ7IGkrKykge1xuICAgICAgICAgIHZhciBjdXJzb3IgPSBiZXN0O1xuICAgICAgICAgIGZvciAodmFyIGtleSBpbiB2aW0ubWFya3MpIHtcbiAgICAgICAgICAgIGlmICghaXNMb3dlckNhc2Uoa2V5KSkge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBtYXJrID0gdmltLm1hcmtzW2tleV0uZmluZCgpO1xuICAgICAgICAgICAgdmFyIGlzV3JvbmdEaXJlY3Rpb24gPSAobW90aW9uQXJncy5mb3J3YXJkKSA/XG4gICAgICAgICAgICAgIGN1cnNvcklzQmVmb3JlKG1hcmssIGN1cnNvcikgOiBjdXJzb3JJc0JlZm9yZShjdXJzb3IsIG1hcmspO1xuXG4gICAgICAgICAgICBpZiAoaXNXcm9uZ0RpcmVjdGlvbikge1xuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChtb3Rpb25BcmdzLmxpbmV3aXNlICYmIChtYXJrLmxpbmUgPT0gY3Vyc29yLmxpbmUpKSB7XG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZXF1YWwgPSBjdXJzb3JFcXVhbChjdXJzb3IsIGJlc3QpO1xuICAgICAgICAgICAgdmFyIGJldHdlZW4gPSAobW90aW9uQXJncy5mb3J3YXJkKSA/XG4gICAgICAgICAgICAgIGN1cnNvcklzQmV0d2VlbihjdXJzb3IsIG1hcmssIGJlc3QpIDpcbiAgICAgICAgICAgICAgY3Vyc29ySXNCZXR3ZWVuKGJlc3QsIG1hcmssIGN1cnNvcik7XG5cbiAgICAgICAgICAgIGlmIChlcXVhbCB8fCBiZXR3ZWVuKSB7XG4gICAgICAgICAgICAgIGJlc3QgPSBtYXJrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb3Rpb25BcmdzLmxpbmV3aXNlKSB7XG4gICAgICAgICAgLy8gVmltIHBsYWNlcyB0aGUgY3Vyc29yIG9uIHRoZSBmaXJzdCBub24td2hpdGVzcGFjZSBjaGFyYWN0ZXIgb2ZcbiAgICAgICAgICAvLyB0aGUgbGluZSBpZiB0aGVyZSBpcyBvbmUsIGVsc2UgaXQgcGxhY2VzIHRoZSBjdXJzb3IgYXQgdGhlIGVuZFxuICAgICAgICAgIC8vIG9mIHRoZSBsaW5lLCByZWdhcmRsZXNzIG9mIHdoZXRoZXIgYSBtYXJrIHdhcyBmb3VuZC5cbiAgICAgICAgICBiZXN0ID0gbmV3IFBvcyhiZXN0LmxpbmUsIGZpbmRGaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20uZ2V0TGluZShiZXN0LmxpbmUpKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGJlc3Q7XG4gICAgICB9LFxuICAgICAgbW92ZUJ5Q2hhcmFjdGVyczogZnVuY3Rpb24oX2NtLCBoZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciBjdXIgPSBoZWFkO1xuICAgICAgICB2YXIgcmVwZWF0ID0gbW90aW9uQXJncy5yZXBlYXQ7XG4gICAgICAgIHZhciBjaCA9IG1vdGlvbkFyZ3MuZm9yd2FyZCA/IGN1ci5jaCArIHJlcGVhdCA6IGN1ci5jaCAtIHJlcGVhdDtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MoY3VyLmxpbmUsIGNoKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlQnlMaW5lczogZnVuY3Rpb24oY20sIGhlYWQsIG1vdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgY3VyID0gaGVhZDtcbiAgICAgICAgdmFyIGVuZENoID0gY3VyLmNoO1xuICAgICAgICAvLyBEZXBlbmRpbmcgd2hhdCBvdXIgbGFzdCBtb3Rpb24gd2FzLCB3ZSBtYXkgd2FudCB0byBkbyBkaWZmZXJlbnRcbiAgICAgICAgLy8gdGhpbmdzLiBJZiBvdXIgbGFzdCBtb3Rpb24gd2FzIG1vdmluZyB2ZXJ0aWNhbGx5LCB3ZSB3YW50IHRvXG4gICAgICAgIC8vIHByZXNlcnZlIHRoZSBIUG9zIGZyb20gb3VyIGxhc3QgaG9yaXpvbnRhbCBtb3ZlLiAgSWYgb3VyIGxhc3QgbW90aW9uXG4gICAgICAgIC8vIHdhcyBnb2luZyB0byB0aGUgZW5kIG9mIGEgbGluZSwgbW92aW5nIHZlcnRpY2FsbHkgd2Ugc2hvdWxkIGdvIHRvXG4gICAgICAgIC8vIHRoZSBlbmQgb2YgdGhlIGxpbmUsIGV0Yy5cbiAgICAgICAgc3dpdGNoICh2aW0ubGFzdE1vdGlvbikge1xuICAgICAgICAgIGNhc2UgdGhpcy5tb3ZlQnlMaW5lczpcbiAgICAgICAgICBjYXNlIHRoaXMubW92ZUJ5RGlzcGxheUxpbmVzOlxuICAgICAgICAgIGNhc2UgdGhpcy5tb3ZlQnlTY3JvbGw6XG4gICAgICAgICAgY2FzZSB0aGlzLm1vdmVUb0NvbHVtbjpcbiAgICAgICAgICBjYXNlIHRoaXMubW92ZVRvRW9sOlxuICAgICAgICAgICAgZW5kQ2ggPSB2aW0ubGFzdEhQb3M7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdmltLmxhc3RIUG9zID0gZW5kQ2g7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlcGVhdCA9IG1vdGlvbkFyZ3MucmVwZWF0Kyhtb3Rpb25BcmdzLnJlcGVhdE9mZnNldHx8MCk7XG4gICAgICAgIHZhciBsaW5lID0gbW90aW9uQXJncy5mb3J3YXJkID8gY3VyLmxpbmUgKyByZXBlYXQgOiBjdXIubGluZSAtIHJlcGVhdDtcbiAgICAgICAgdmFyIGZpcnN0ID0gY20uZmlyc3RMaW5lKCk7XG4gICAgICAgIHZhciBsYXN0ID0gY20ubGFzdExpbmUoKTtcbiAgICAgICAgLy8gVmltIGdvIHRvIGxpbmUgYmVnaW4gb3IgbGluZSBlbmQgd2hlbiBjdXJzb3IgYXQgZmlyc3QvbGFzdCBsaW5lIGFuZFxuICAgICAgICAvLyBtb3ZlIHRvIHByZXZpb3VzL25leHQgbGluZSBpcyB0cmlnZ2VyZWQuXG4gICAgICAgIGlmIChsaW5lIDwgZmlyc3QgJiYgY3VyLmxpbmUgPT0gZmlyc3Qpe1xuICAgICAgICAgIHJldHVybiB0aGlzLm1vdmVUb1N0YXJ0T2ZMaW5lKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0pO1xuICAgICAgICB9IGVsc2UgaWYgKGxpbmUgPiBsYXN0ICYmIGN1ci5saW5lID09IGxhc3Qpe1xuICAgICAgICAgICAgcmV0dXJuIG1vdmVUb0VvbChjbSwgaGVhZCwgbW90aW9uQXJncywgdmltLCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBhY2VfcGF0Y2h7XG4gICAgICAgIHZhciBmb2xkID0gY20uYWNlLnNlc3Npb24uZ2V0Rm9sZExpbmUobGluZSk7XG4gICAgICAgIGlmIChmb2xkKSB7XG4gICAgICAgICAgaWYgKG1vdGlvbkFyZ3MuZm9yd2FyZCkge1xuICAgICAgICAgICAgaWYgKGxpbmUgPiBmb2xkLnN0YXJ0LnJvdylcbiAgICAgICAgICAgICAgbGluZSA9IGZvbGQuZW5kLnJvdyArIDE7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxpbmUgPSBmb2xkLnN0YXJ0LnJvdztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gYWNlX3BhdGNofVxuICAgICAgICBpZiAobW90aW9uQXJncy50b0ZpcnN0Q2hhcil7XG4gICAgICAgICAgZW5kQ2g9ZmluZEZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbS5nZXRMaW5lKGxpbmUpKTtcbiAgICAgICAgICB2aW0ubGFzdEhQb3MgPSBlbmRDaDtcbiAgICAgICAgfVxuICAgICAgICB2aW0ubGFzdEhTUG9zID0gY20uY2hhckNvb3JkcyhuZXcgUG9zKGxpbmUsIGVuZENoKSwnZGl2JykubGVmdDtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MobGluZSwgZW5kQ2gpO1xuICAgICAgfSxcbiAgICAgIG1vdmVCeURpc3BsYXlMaW5lczogZnVuY3Rpb24oY20sIGhlYWQsIG1vdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgY3VyID0gaGVhZDtcbiAgICAgICAgc3dpdGNoICh2aW0ubGFzdE1vdGlvbikge1xuICAgICAgICAgIGNhc2UgdGhpcy5tb3ZlQnlEaXNwbGF5TGluZXM6XG4gICAgICAgICAgY2FzZSB0aGlzLm1vdmVCeVNjcm9sbDpcbiAgICAgICAgICBjYXNlIHRoaXMubW92ZUJ5TGluZXM6XG4gICAgICAgICAgY2FzZSB0aGlzLm1vdmVUb0NvbHVtbjpcbiAgICAgICAgICBjYXNlIHRoaXMubW92ZVRvRW9sOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZpbS5sYXN0SFNQb3MgPSBjbS5jaGFyQ29vcmRzKGN1ciwnZGl2JykubGVmdDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVwZWF0ID0gbW90aW9uQXJncy5yZXBlYXQ7XG4gICAgICAgIHZhciByZXM9Y20uZmluZFBvc1YoY3VyLChtb3Rpb25BcmdzLmZvcndhcmQgPyByZXBlYXQgOiAtcmVwZWF0KSwnbGluZScsdmltLmxhc3RIU1Bvcyk7XG4gICAgICAgIGlmIChyZXMuaGl0U2lkZSkge1xuICAgICAgICAgIGlmIChtb3Rpb25BcmdzLmZvcndhcmQpIHtcbiAgICAgICAgICAgIHZhciBsYXN0Q2hhckNvb3JkcyA9IGNtLmNoYXJDb29yZHMocmVzLCAnZGl2Jyk7XG4gICAgICAgICAgICB2YXIgZ29hbENvb3JkcyA9IHsgdG9wOiBsYXN0Q2hhckNvb3Jkcy50b3AgKyA4LCBsZWZ0OiB2aW0ubGFzdEhTUG9zIH07XG4gICAgICAgICAgICB2YXIgcmVzID0gY20uY29vcmRzQ2hhcihnb2FsQ29vcmRzLCAnZGl2Jyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciByZXNDb29yZHMgPSBjbS5jaGFyQ29vcmRzKG5ldyBQb3MoY20uZmlyc3RMaW5lKCksIDApLCAnZGl2Jyk7XG4gICAgICAgICAgICByZXNDb29yZHMubGVmdCA9IHZpbS5sYXN0SFNQb3M7XG4gICAgICAgICAgICByZXMgPSBjbS5jb29yZHNDaGFyKHJlc0Nvb3JkcywgJ2RpdicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2aW0ubGFzdEhQb3MgPSByZXMuY2g7XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9LFxuICAgICAgbW92ZUJ5UGFnZTogZnVuY3Rpb24oY20sIGhlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgLy8gQ29kZU1pcnJvciBvbmx5IGV4cG9zZXMgZnVuY3Rpb25zIHRoYXQgbW92ZSB0aGUgY3Vyc29yIHBhZ2UgZG93biwgc29cbiAgICAgICAgLy8gZG9pbmcgdGhpcyBiYWQgaGFjayB0byBtb3ZlIHRoZSBjdXJzb3IgYW5kIG1vdmUgaXQgYmFjay4gZXZhbElucHV0XG4gICAgICAgIC8vIHdpbGwgbW92ZSB0aGUgY3Vyc29yIHRvIHdoZXJlIGl0IHNob3VsZCBiZSBpbiB0aGUgZW5kLlxuICAgICAgICB2YXIgY3VyU3RhcnQgPSBoZWFkO1xuICAgICAgICB2YXIgcmVwZWF0ID0gbW90aW9uQXJncy5yZXBlYXQ7XG4gICAgICAgIHJldHVybiBjbS5maW5kUG9zVihjdXJTdGFydCwgKG1vdGlvbkFyZ3MuZm9yd2FyZCA/IHJlcGVhdCA6IC1yZXBlYXQpLCAncGFnZScpO1xuICAgICAgfSxcbiAgICAgIG1vdmVCeVBhcmFncmFwaDogZnVuY3Rpb24oY20sIGhlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIGRpciA9IG1vdGlvbkFyZ3MuZm9yd2FyZCA/IDEgOiAtMTtcbiAgICAgICAgcmV0dXJuIGZpbmRQYXJhZ3JhcGgoY20sIGhlYWQsIG1vdGlvbkFyZ3MucmVwZWF0LCBkaXIpO1xuICAgICAgfSxcbiAgICAgIG1vdmVCeVNlbnRlbmNlOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgZGlyID0gbW90aW9uQXJncy5mb3J3YXJkID8gMSA6IC0xO1xuICAgICAgICByZXR1cm4gZmluZFNlbnRlbmNlKGNtLCBoZWFkLCBtb3Rpb25BcmdzLnJlcGVhdCwgZGlyKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlQnlTY3JvbGw6IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIHNjcm9sbGJveCA9IGNtLmdldFNjcm9sbEluZm8oKTtcbiAgICAgICAgdmFyIGN1ckVuZCA9IG51bGw7XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgaWYgKCFyZXBlYXQpIHtcbiAgICAgICAgICByZXBlYXQgPSBzY3JvbGxib3guY2xpZW50SGVpZ2h0IC8gKDIgKiBjbS5kZWZhdWx0VGV4dEhlaWdodCgpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3JpZyA9IGNtLmNoYXJDb29yZHMoaGVhZCwgJ2xvY2FsJyk7XG4gICAgICAgIG1vdGlvbkFyZ3MucmVwZWF0ID0gcmVwZWF0O1xuICAgICAgICBjdXJFbmQgPSBtb3Rpb25zLm1vdmVCeURpc3BsYXlMaW5lcyhjbSwgaGVhZCwgbW90aW9uQXJncywgdmltKTtcbiAgICAgICAgaWYgKCFjdXJFbmQpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGVzdCA9IGNtLmNoYXJDb29yZHMoY3VyRW5kLCAnbG9jYWwnKTtcbiAgICAgICAgY20uc2Nyb2xsVG8obnVsbCwgc2Nyb2xsYm94LnRvcCArIGRlc3QudG9wIC0gb3JpZy50b3ApO1xuICAgICAgICByZXR1cm4gY3VyRW5kO1xuICAgICAgfSxcbiAgICAgIG1vdmVCeVdvcmRzOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICByZXR1cm4gbW92ZVRvV29yZChjbSwgaGVhZCwgbW90aW9uQXJncy5yZXBlYXQsICEhbW90aW9uQXJncy5mb3J3YXJkLFxuICAgICAgICAgICAgISFtb3Rpb25BcmdzLndvcmRFbmQsICEhbW90aW9uQXJncy5iaWdXb3JkKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlVGlsbENoYXJhY3RlcjogZnVuY3Rpb24oY20sIF9oZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgdmFyIGN1ckVuZCA9IG1vdmVUb0NoYXJhY3RlcihjbSwgcmVwZWF0LCBtb3Rpb25BcmdzLmZvcndhcmQsXG4gICAgICAgICAgICBtb3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyKTtcbiAgICAgICAgdmFyIGluY3JlbWVudCA9IG1vdGlvbkFyZ3MuZm9yd2FyZCA/IC0xIDogMTtcbiAgICAgICAgcmVjb3JkTGFzdENoYXJhY3RlclNlYXJjaChpbmNyZW1lbnQsIG1vdGlvbkFyZ3MpO1xuICAgICAgICBpZiAoIWN1ckVuZCkgcmV0dXJuIG51bGw7XG4gICAgICAgIGN1ckVuZC5jaCArPSBpbmNyZW1lbnQ7XG4gICAgICAgIHJldHVybiBjdXJFbmQ7XG4gICAgICB9LFxuICAgICAgbW92ZVRvQ2hhcmFjdGVyOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncykge1xuICAgICAgICB2YXIgcmVwZWF0ID0gbW90aW9uQXJncy5yZXBlYXQ7XG4gICAgICAgIHJlY29yZExhc3RDaGFyYWN0ZXJTZWFyY2goMCwgbW90aW9uQXJncyk7XG4gICAgICAgIHJldHVybiBtb3ZlVG9DaGFyYWN0ZXIoY20sIHJlcGVhdCwgbW90aW9uQXJncy5mb3J3YXJkLFxuICAgICAgICAgICAgbW90aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlcikgfHwgaGVhZDtcbiAgICAgIH0sXG4gICAgICBtb3ZlVG9TeW1ib2w6IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciByZXBlYXQgPSBtb3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgcmV0dXJuIGZpbmRTeW1ib2woY20sIHJlcGVhdCwgbW90aW9uQXJncy5mb3J3YXJkLFxuICAgICAgICAgICAgbW90aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlcikgfHwgaGVhZDtcbiAgICAgIH0sXG4gICAgICBtb3ZlVG9Db2x1bW46IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIHJlcGVhdCA9IG1vdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICAvLyByZXBlYXQgaXMgZXF1aXZhbGVudCB0byB3aGljaCBjb2x1bW4gd2Ugd2FudCB0byBtb3ZlIHRvIVxuICAgICAgICB2aW0ubGFzdEhQb3MgPSByZXBlYXQgLSAxO1xuICAgICAgICB2aW0ubGFzdEhTUG9zID0gY20uY2hhckNvb3JkcyhoZWFkLCdkaXYnKS5sZWZ0O1xuICAgICAgICByZXR1cm4gbW92ZVRvQ29sdW1uKGNtLCByZXBlYXQpO1xuICAgICAgfSxcbiAgICAgIG1vdmVUb0VvbDogZnVuY3Rpb24oY20sIGhlYWQsIG1vdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICByZXR1cm4gbW92ZVRvRW9sKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0sIGZhbHNlKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXI6IGZ1bmN0aW9uKGNtLCBoZWFkKSB7XG4gICAgICAgIC8vIEdvIHRvIHRoZSBzdGFydCBvZiB0aGUgbGluZSB3aGVyZSB0aGUgdGV4dCBiZWdpbnMsIG9yIHRoZSBlbmQgZm9yXG4gICAgICAgIC8vIHdoaXRlc3BhY2Utb25seSBsaW5lc1xuICAgICAgICB2YXIgY3Vyc29yID0gaGVhZDtcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MoY3Vyc29yLmxpbmUsXG4gICAgICAgICAgICAgICAgICAgZmluZEZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbS5nZXRMaW5lKGN1cnNvci5saW5lKSkpO1xuICAgICAgfSxcbiAgICAgIG1vdmVUb01hdGNoZWRTeW1ib2w6IGZ1bmN0aW9uKGNtLCBoZWFkKSB7XG4gICAgICAgIHZhciBjdXJzb3IgPSBoZWFkO1xuICAgICAgICB2YXIgbGluZSA9IGN1cnNvci5saW5lO1xuICAgICAgICB2YXIgY2ggPSBjdXJzb3IuY2g7XG4gICAgICAgIHZhciBsaW5lVGV4dCA9IGNtLmdldExpbmUobGluZSk7XG4gICAgICAgIHZhciBzeW1ib2w7XG4gICAgICAgIGZvciAoOyBjaCA8IGxpbmVUZXh0Lmxlbmd0aDsgY2grKykge1xuICAgICAgICAgIHN5bWJvbCA9IGxpbmVUZXh0LmNoYXJBdChjaCk7XG4gICAgICAgICAgaWYgKHN5bWJvbCAmJiBpc01hdGNoYWJsZVN5bWJvbChzeW1ib2wpKSB7XG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBjbS5nZXRUb2tlblR5cGVBdChuZXcgUG9zKGxpbmUsIGNoICsgMSkpO1xuICAgICAgICAgICAgaWYgKHN0eWxlICE9PSBcInN0cmluZ1wiICYmIHN0eWxlICE9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoIDwgbGluZVRleHQubGVuZ3RoKSB7XG4gICAgICAgICAgLy8gT25seSBpbmNsdWRlIGFuZ2xlIGJyYWNrZXRzIGluIGFuYWx5c2lzIGlmIHRoZXkgYXJlIGJlaW5nIG1hdGNoZWQuXG4gICAgICAgICAgdmFyIHJlID0gL1s8Pl0vLnRlc3QobGluZVRleHRbY2hdKSA/IC9bKCl7fVtcXF08Pl0vIDogL1soKXt9W1xcXV0vOyAvL2FjZV9wYXRjaD9cbiAgICAgICAgICB2YXIgbWF0Y2hlZCA9IGNtLmZpbmRNYXRjaGluZ0JyYWNrZXQobmV3IFBvcyhsaW5lLCBjaCsxKSwge2JyYWNrZXRSZWdleDogcmV9KTtcbiAgICAgICAgICByZXR1cm4gbWF0Y2hlZC50bztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gY3Vyc29yO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbW92ZVRvU3RhcnRPZkxpbmU6IGZ1bmN0aW9uKF9jbSwgaGVhZCkge1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhoZWFkLmxpbmUsIDApO1xuICAgICAgfSxcbiAgICAgIG1vdmVUb0xpbmVPckVkZ2VPZkRvY3VtZW50OiBmdW5jdGlvbihjbSwgX2hlYWQsIG1vdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIGxpbmVOdW0gPSBtb3Rpb25BcmdzLmZvcndhcmQgPyBjbS5sYXN0TGluZSgpIDogY20uZmlyc3RMaW5lKCk7XG4gICAgICAgIGlmIChtb3Rpb25BcmdzLnJlcGVhdElzRXhwbGljaXQpIHtcbiAgICAgICAgICBsaW5lTnVtID0gbW90aW9uQXJncy5yZXBlYXQgLSBjbS5nZXRPcHRpb24oJ2ZpcnN0TGluZU51bWJlcicpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGxpbmVOdW0sXG4gICAgICAgICAgICAgICAgICAgZmluZEZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbS5nZXRMaW5lKGxpbmVOdW0pKSk7XG4gICAgICB9LFxuICAgICAgbW92ZVRvU3RhcnRPZkRpc3BsYXlMaW5lOiBmdW5jdGlvbihjbSkge1xuICAgICAgICBjbS5leGVjQ29tbWFuZChcImdvTGluZUxlZnRcIik7XG4gICAgICAgIHJldHVybiBjbS5nZXRDdXJzb3IoKTtcbiAgICAgIH0sXG4gICAgICBtb3ZlVG9FbmRPZkRpc3BsYXlMaW5lOiBmdW5jdGlvbihjbSkge1xuICAgICAgICBjbS5leGVjQ29tbWFuZChcImdvTGluZVJpZ2h0XCIpO1xuICAgICAgICB2YXIgaGVhZCA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICBpZiAoaGVhZC5zdGlja3kgPT0gXCJiZWZvcmVcIikgaGVhZC5jaC0tO1xuICAgICAgICByZXR1cm4gaGVhZDtcbiAgICAgIH0sXG4gICAgICB0ZXh0T2JqZWN0TWFuaXB1bGF0aW9uOiBmdW5jdGlvbihjbSwgaGVhZCwgbW90aW9uQXJncywgdmltKSB7XG4gICAgICAgIC8vIFRPRE86IGxvdHMgb2YgcG9zc2libGUgZXhjZXB0aW9ucyB0aGF0IGNhbiBiZSB0aHJvd24gaGVyZS4gVHJ5IGRhKFxuICAgICAgICAvLyAgICAgb3V0c2lkZSBvZiBhICgpIGJsb2NrLlxuICAgICAgICB2YXIgbWlycm9yZWRQYWlycyA9IHsnKCc6ICcpJywgJyknOiAnKCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICd7JzogJ30nLCAnfSc6ICd7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1snOiAnXScsICddJzogJ1snLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnPCc6ICc+JywgJz4nOiAnPCd9O1xuICAgICAgICB2YXIgc2VsZlBhaXJlZCA9IHsnXFwnJzogdHJ1ZSwgJ1wiJzogdHJ1ZSwgJ2AnOiB0cnVlfTtcblxuICAgICAgICB2YXIgY2hhcmFjdGVyID0gbW90aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlcjtcbiAgICAgICAgLy8gJ2InIHJlZmVycyB0byAgJygpJyBibG9jay5cbiAgICAgICAgLy8gJ0InIHJlZmVycyB0byAgJ3t9JyBibG9jay5cbiAgICAgICAgaWYgKGNoYXJhY3RlciA9PSAnYicpIHtcbiAgICAgICAgICBjaGFyYWN0ZXIgPSAnKCc7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyID09ICdCJykge1xuICAgICAgICAgIGNoYXJhY3RlciA9ICd7JztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEluY2x1c2l2ZSBpcyB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIGEgYW5kIGlcbiAgICAgICAgLy8gVE9ETzogSW5zdGVhZCBvZiB1c2luZyB0aGUgYWRkaXRpb25hbCB0ZXh0IG9iamVjdCBtYXAgdG8gcGVyZm9ybSB0ZXh0XG4gICAgICAgIC8vICAgICBvYmplY3Qgb3BlcmF0aW9ucywgbWVyZ2UgdGhlIG1hcCBpbnRvIHRoZSBkZWZhdWx0S2V5TWFwIGFuZCB1c2VcbiAgICAgICAgLy8gICAgIG1vdGlvbkFyZ3MgdG8gZGVmaW5lIGJlaGF2aW9yLiBEZWZpbmUgc2VwYXJhdGUgZW50cmllcyBmb3IgJ2F3JyxcbiAgICAgICAgLy8gICAgICdpdycsICdhWycsICdpWycsIGV0Yy5cbiAgICAgICAgdmFyIGluY2x1c2l2ZSA9ICFtb3Rpb25BcmdzLnRleHRPYmplY3RJbm5lcjtcblxuICAgICAgICB2YXIgdG1wO1xuICAgICAgICBpZiAobWlycm9yZWRQYWlyc1tjaGFyYWN0ZXJdKSB7XG4gICAgICAgICAgdG1wID0gc2VsZWN0Q29tcGFuaW9uT2JqZWN0KGNtLCBoZWFkLCBjaGFyYWN0ZXIsIGluY2x1c2l2ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2VsZlBhaXJlZFtjaGFyYWN0ZXJdKSB7XG4gICAgICAgICAgdG1wID0gZmluZEJlZ2lubmluZ0FuZEVuZChjbSwgaGVhZCwgY2hhcmFjdGVyLCBpbmNsdXNpdmUpO1xuICAgICAgICB9IGVsc2UgaWYgKGNoYXJhY3RlciA9PT0gJ1cnKSB7XG4gICAgICAgICAgdG1wID0gZXhwYW5kV29yZFVuZGVyQ3Vyc29yKGNtLCBpbmNsdXNpdmUsIHRydWUgLyoqIGZvcndhcmQgKi8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWUgLyoqIGJpZ1dvcmQgKi8pO1xuICAgICAgICB9IGVsc2UgaWYgKGNoYXJhY3RlciA9PT0gJ3cnKSB7XG4gICAgICAgICAgdG1wID0gZXhwYW5kV29yZFVuZGVyQ3Vyc29yKGNtLCBpbmNsdXNpdmUsIHRydWUgLyoqIGZvcndhcmQgKi8sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlIC8qKiBiaWdXb3JkICovKTtcbiAgICAgICAgfSBlbHNlIGlmIChjaGFyYWN0ZXIgPT09ICdwJykge1xuICAgICAgICAgIHRtcCA9IGZpbmRQYXJhZ3JhcGgoY20sIGhlYWQsIG1vdGlvbkFyZ3MucmVwZWF0LCAwLCBpbmNsdXNpdmUpO1xuICAgICAgICAgIG1vdGlvbkFyZ3MubGluZXdpc2UgPSB0cnVlO1xuICAgICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgaWYgKCF2aW0udmlzdWFsTGluZSkgeyB2aW0udmlzdWFsTGluZSA9IHRydWU7IH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIG9wZXJhdG9yQXJncyA9IHZpbS5pbnB1dFN0YXRlLm9wZXJhdG9yQXJncztcbiAgICAgICAgICAgIGlmIChvcGVyYXRvckFyZ3MpIHsgb3BlcmF0b3JBcmdzLmxpbmV3aXNlID0gdHJ1ZTsgfVxuICAgICAgICAgICAgdG1wLmVuZC5saW5lLS07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGNoYXJhY3RlciA9PT0gJ3QnKSB7XG4gICAgICAgICAgdG1wID0gZXhwYW5kVGFnVW5kZXJDdXJzb3IoY20sIGhlYWQsIGluY2x1c2l2ZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoY2hhcmFjdGVyID09PSAncycpIHtcbiAgICAgICAgICAvLyBhY2NvdW50IGZvciBjdXJzb3Igb24gZW5kIG9mIHNlbnRlbmNlIHN5bWJvbFxuICAgICAgICAgIHZhciBjb250ZW50ID0gY20uZ2V0TGluZShoZWFkLmxpbmUpO1xuICAgICAgICAgIGlmIChoZWFkLmNoID4gMCAmJiBpc0VuZE9mU2VudGVuY2VTeW1ib2woY29udGVudFtoZWFkLmNoXSkpIHtcbiAgICAgICAgICAgIGhlYWQuY2ggLT0gMTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIGVuZCA9IGdldFNlbnRlbmNlKGNtLCBoZWFkLCBtb3Rpb25BcmdzLnJlcGVhdCwgMSwgaW5jbHVzaXZlKVxuICAgICAgICAgIHZhciBzdGFydCA9IGdldFNlbnRlbmNlKGNtLCBoZWFkLCBtb3Rpb25BcmdzLnJlcGVhdCwgLTEsIGluY2x1c2l2ZSlcbiAgICAgICAgICAvLyBjbG9zZXIgdmltIGJlaGF2aW91ciwgJ2EnIG9ubHkgdGFrZXMgdGhlIHNwYWNlIGFmdGVyIHRoZSBzZW50ZW5jZSBpZiB0aGVyZSBpcyBvbmUgYmVmb3JlIGFuZCBhZnRlclxuICAgICAgICAgIGlmIChpc1doaXRlU3BhY2VTdHJpbmcoY20uZ2V0TGluZShzdGFydC5saW5lKVtzdGFydC5jaF0pXG4gICAgICAgICAgICAgICYmIGlzV2hpdGVTcGFjZVN0cmluZyhjbS5nZXRMaW5lKGVuZC5saW5lKVtlbmQuY2ggLTFdKSkge1xuICAgICAgICAgICAgc3RhcnQgPSB7bGluZTogc3RhcnQubGluZSwgY2g6IHN0YXJ0LmNoICsgMX1cbiAgICAgICAgICB9XG4gICAgICAgICAgdG1wID0ge3N0YXJ0OiBzdGFydCwgZW5kOiBlbmR9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE5vIHRleHQgb2JqZWN0IGRlZmluZWQgZm9yIHRoaXMsIGRvbid0IG1vdmUuXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNtLnN0YXRlLnZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgcmV0dXJuIFt0bXAuc3RhcnQsIHRtcC5lbmRdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBleHBhbmRTZWxlY3Rpb24oY20sIHRtcC5zdGFydCwgdG1wLmVuZCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG5cbiAgICAgIHJlcGVhdExhc3RDaGFyYWN0ZXJTZWFyY2g6IGZ1bmN0aW9uKGNtLCBoZWFkLCBtb3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciBsYXN0U2VhcmNoID0gdmltR2xvYmFsU3RhdGUubGFzdENoYXJhY3RlclNlYXJjaDtcbiAgICAgICAgdmFyIHJlcGVhdCA9IG1vdGlvbkFyZ3MucmVwZWF0O1xuICAgICAgICB2YXIgZm9yd2FyZCA9IG1vdGlvbkFyZ3MuZm9yd2FyZCA9PT0gbGFzdFNlYXJjaC5mb3J3YXJkO1xuICAgICAgICB2YXIgaW5jcmVtZW50ID0gKGxhc3RTZWFyY2guaW5jcmVtZW50ID8gMSA6IDApICogKGZvcndhcmQgPyAtMSA6IDEpO1xuICAgICAgICBjbS5tb3ZlSCgtaW5jcmVtZW50LCAnY2hhcicpO1xuICAgICAgICBtb3Rpb25BcmdzLmluY2x1c2l2ZSA9IGZvcndhcmQgPyB0cnVlIDogZmFsc2U7XG4gICAgICAgIHZhciBjdXJFbmQgPSBtb3ZlVG9DaGFyYWN0ZXIoY20sIHJlcGVhdCwgZm9yd2FyZCwgbGFzdFNlYXJjaC5zZWxlY3RlZENoYXJhY3Rlcik7XG4gICAgICAgIGlmICghY3VyRW5kKSB7XG4gICAgICAgICAgY20ubW92ZUgoaW5jcmVtZW50LCAnY2hhcicpO1xuICAgICAgICAgIHJldHVybiBoZWFkO1xuICAgICAgICB9XG4gICAgICAgIGN1ckVuZC5jaCArPSBpbmNyZW1lbnQ7XG4gICAgICAgIHJldHVybiBjdXJFbmQ7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGRlZmluZU1vdGlvbihuYW1lLCBmbikge1xuICAgICAgbW90aW9uc1tuYW1lXSA9IGZuO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbGxBcnJheSh2YWwsIHRpbWVzKSB7XG4gICAgICB2YXIgYXJyID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRpbWVzOyBpKyspIHtcbiAgICAgICAgYXJyLnB1c2godmFsKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBhcnI7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFuIG9wZXJhdG9yIGFjdHMgb24gYSB0ZXh0IHNlbGVjdGlvbi4gSXQgcmVjZWl2ZXMgdGhlIGxpc3Qgb2Ygc2VsZWN0aW9uc1xuICAgICAqIGFzIGlucHV0LiBUaGUgY29ycmVzcG9uZGluZyBDb2RlTWlycm9yIHNlbGVjdGlvbiBpcyBndWFyYW50ZWVkIHRvXG4gICAgKiBtYXRjaCB0aGUgaW5wdXQgc2VsZWN0aW9uLlxuICAgICAqL1xuICAgIHZhciBvcGVyYXRvcnMgPSB7XG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKGNtLCBhcmdzLCByYW5nZXMpIHtcbiAgICAgICAgdmFyIGZpbmFsSGVhZCwgdGV4dDtcbiAgICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgICAgdmFyIGFuY2hvciA9IHJhbmdlc1swXS5hbmNob3IsXG4gICAgICAgICAgICBoZWFkID0gcmFuZ2VzWzBdLmhlYWQ7XG4gICAgICAgIGlmICghdmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICB0ZXh0ID0gY20uZ2V0UmFuZ2UoYW5jaG9yLCBoZWFkKTtcbiAgICAgICAgICB2YXIgbGFzdFN0YXRlID0gdmltLmxhc3RFZGl0SW5wdXRTdGF0ZSB8fCB7fTtcbiAgICAgICAgICBpZiAobGFzdFN0YXRlLm1vdGlvbiA9PSBcIm1vdmVCeVdvcmRzXCIgJiYgIWlzV2hpdGVTcGFjZVN0cmluZyh0ZXh0KSkge1xuICAgICAgICAgICAgLy8gRXhjbHVkZSB0cmFpbGluZyB3aGl0ZXNwYWNlIGlmIHRoZSByYW5nZSBpcyBub3QgYWxsIHdoaXRlc3BhY2UuXG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSAoL1xccyskLykuZXhlYyh0ZXh0KTtcbiAgICAgICAgICAgIGlmIChtYXRjaCAmJiBsYXN0U3RhdGUubW90aW9uQXJncyAmJiBsYXN0U3RhdGUubW90aW9uQXJncy5mb3J3YXJkKSB7XG4gICAgICAgICAgICAgIGhlYWQgPSBvZmZzZXRDdXJzb3IoaGVhZCwgMCwgLSBtYXRjaFswXS5sZW5ndGgpO1xuICAgICAgICAgICAgICB0ZXh0ID0gdGV4dC5zbGljZSgwLCAtIG1hdGNoWzBdLmxlbmd0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBwcmV2TGluZUVuZCA9IG5ldyBQb3MoYW5jaG9yLmxpbmUgLSAxLCBOdW1iZXIuTUFYX1ZBTFVFKTtcbiAgICAgICAgICB2YXIgd2FzTGFzdExpbmUgPSBjbS5maXJzdExpbmUoKSA9PSBjbS5sYXN0TGluZSgpO1xuICAgICAgICAgIGlmIChoZWFkLmxpbmUgPiBjbS5sYXN0TGluZSgpICYmIGFyZ3MubGluZXdpc2UgJiYgIXdhc0xhc3RMaW5lKSB7XG4gICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UoJycsIHByZXZMaW5lRW5kLCBoZWFkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY20ucmVwbGFjZVJhbmdlKCcnLCBhbmNob3IsIGhlYWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYXJncy5saW5ld2lzZSkge1xuICAgICAgICAgICAgLy8gUHVzaCB0aGUgbmV4dCBsaW5lIGJhY2sgZG93biwgaWYgdGhlcmUgaXMgYSBuZXh0IGxpbmUuXG4gICAgICAgICAgICBpZiAoIXdhc0xhc3RMaW5lKSB7XG4gICAgICAgICAgICAgIGNtLnNldEN1cnNvcihwcmV2TGluZUVuZCk7XG4gICAgICAgICAgICAgIENvZGVNaXJyb3IuY29tbWFuZHMubmV3bGluZUFuZEluZGVudChjbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBtYWtlIHN1cmUgY3Vyc29yIGVuZHMgdXAgYXQgdGhlIGVuZCBvZiB0aGUgbGluZS5cbiAgICAgICAgICAgIGFuY2hvci5jaCA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZpbmFsSGVhZCA9IGFuY2hvcjtcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzLmZ1bGxMaW5lKSB7XG4gICAgICAgICAgICBoZWFkLmNoID0gTnVtYmVyLk1BWF9WQUxVRTtcbiAgICAgICAgICAgIGhlYWQubGluZS0tO1xuICAgICAgICAgICAgY20uc2V0U2VsZWN0aW9uKGFuY2hvciwgaGVhZClcbiAgICAgICAgICAgIHRleHQgPSBjbS5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VTZWxlY3Rpb24oXCJcIik7XG4gICAgICAgICAgICBmaW5hbEhlYWQgPSBhbmNob3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGV4dCA9IGNtLmdldFNlbGVjdGlvbigpO1xuICAgICAgICAgIHZhciByZXBsYWNlbWVudCA9IGZpbGxBcnJheSgnJywgcmFuZ2VzLmxlbmd0aCk7XG4gICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbnMocmVwbGFjZW1lbnQpO1xuICAgICAgICAgIGZpbmFsSGVhZCA9IGN1cnNvck1pbihyYW5nZXNbMF0uaGVhZCwgcmFuZ2VzWzBdLmFuY2hvcik7XG4gICAgICAgIH1cbiAgICAgICAgdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLnB1c2hUZXh0KFxuICAgICAgICAgICAgYXJncy5yZWdpc3Rlck5hbWUsICdjaGFuZ2UnLCB0ZXh0LFxuICAgICAgICAgICAgYXJncy5saW5ld2lzZSwgcmFuZ2VzLmxlbmd0aCA+IDEpO1xuICAgICAgICBhY3Rpb25zLmVudGVySW5zZXJ0TW9kZShjbSwge2hlYWQ6IGZpbmFsSGVhZH0sIGNtLnN0YXRlLnZpbSk7XG4gICAgICB9LFxuICAgICAgLy8gZGVsZXRlIGlzIGEgamF2YXNjcmlwdCBrZXl3b3JkLlxuICAgICAgJ2RlbGV0ZSc6IGZ1bmN0aW9uKGNtLCBhcmdzLCByYW5nZXMpIHtcbiAgICAgICAgdmFyIGZpbmFsSGVhZCwgdGV4dDtcbiAgICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgICAgaWYgKCF2aW0udmlzdWFsQmxvY2spIHtcbiAgICAgICAgICB2YXIgYW5jaG9yID0gcmFuZ2VzWzBdLmFuY2hvcixcbiAgICAgICAgICAgICAgaGVhZCA9IHJhbmdlc1swXS5oZWFkO1xuICAgICAgICAgIGlmIChhcmdzLmxpbmV3aXNlICYmXG4gICAgICAgICAgICAgIGhlYWQubGluZSAhPSBjbS5maXJzdExpbmUoKSAmJlxuICAgICAgICAgICAgICBhbmNob3IubGluZSA9PSBjbS5sYXN0TGluZSgpICYmXG4gICAgICAgICAgICAgIGFuY2hvci5saW5lID09IGhlYWQubGluZSAtIDEpIHtcbiAgICAgICAgICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgZGQgb24gbGFzdCBsaW5lIChhbmQgZmlyc3QgbGluZSkuXG4gICAgICAgICAgICBpZiAoYW5jaG9yLmxpbmUgPT0gY20uZmlyc3RMaW5lKCkpIHtcbiAgICAgICAgICAgICAgYW5jaG9yLmNoID0gMDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGFuY2hvciA9IG5ldyBQb3MoYW5jaG9yLmxpbmUgLSAxLCBsaW5lTGVuZ3RoKGNtLCBhbmNob3IubGluZSAtIDEpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgdGV4dCA9IGNtLmdldFJhbmdlKGFuY2hvciwgaGVhZCk7XG4gICAgICAgICAgY20ucmVwbGFjZVJhbmdlKCcnLCBhbmNob3IsIGhlYWQpO1xuICAgICAgICAgIGZpbmFsSGVhZCA9IGFuY2hvcjtcbiAgICAgICAgICBpZiAoYXJncy5saW5ld2lzZSkge1xuICAgICAgICAgICAgZmluYWxIZWFkID0gbW90aW9ucy5tb3ZlVG9GaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20sIGFuY2hvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRleHQgPSBjbS5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICB2YXIgcmVwbGFjZW1lbnQgPSBmaWxsQXJyYXkoJycsIHJhbmdlcy5sZW5ndGgpO1xuICAgICAgICAgIGNtLnJlcGxhY2VTZWxlY3Rpb25zKHJlcGxhY2VtZW50KTtcbiAgICAgICAgICBmaW5hbEhlYWQgPSBjdXJzb3JNaW4ocmFuZ2VzWzBdLmhlYWQsIHJhbmdlc1swXS5hbmNob3IpO1xuICAgICAgICB9XG4gICAgICAgIHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5wdXNoVGV4dChcbiAgICAgICAgICAgIGFyZ3MucmVnaXN0ZXJOYW1lLCAnZGVsZXRlJywgdGV4dCxcbiAgICAgICAgICAgIGFyZ3MubGluZXdpc2UsIHZpbS52aXN1YWxCbG9jayk7XG4gICAgICAgIHJldHVybiBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBmaW5hbEhlYWQpO1xuICAgICAgfSxcbiAgICAgIGluZGVudDogZnVuY3Rpb24oY20sIGFyZ3MsIHJhbmdlcykge1xuICAgICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgICBpZiAoY20uaW5kZW50TW9yZSkge1xuICAgICAgICAgIHZhciByZXBlYXQgPSAodmltLnZpc3VhbE1vZGUpID8gYXJncy5yZXBlYXQgOiAxO1xuICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgcmVwZWF0OyBqKyspIHtcbiAgICAgICAgICAgIGlmIChhcmdzLmluZGVudFJpZ2h0KSBjbS5pbmRlbnRNb3JlKCk7XG4gICAgICAgICAgICBlbHNlIGNtLmluZGVudExlc3MoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHN0YXJ0TGluZSA9IHJhbmdlc1swXS5hbmNob3IubGluZTtcbiAgICAgICAgICB2YXIgZW5kTGluZSA9IHZpbS52aXN1YWxCbG9jayA/XG4gICAgICAgICAgICByYW5nZXNbcmFuZ2VzLmxlbmd0aCAtIDFdLmFuY2hvci5saW5lIDpcbiAgICAgICAgICAgIHJhbmdlc1swXS5oZWFkLmxpbmU7XG4gICAgICAgICAgLy8gSW4gdmlzdWFsIG1vZGUsIG4+IHNoaWZ0cyB0aGUgc2VsZWN0aW9uIHJpZ2h0IG4gdGltZXMsIGluc3RlYWQgb2ZcbiAgICAgICAgICAvLyBzaGlmdGluZyBuIGxpbmVzIHJpZ2h0IG9uY2UuXG4gICAgICAgICAgdmFyIHJlcGVhdCA9ICh2aW0udmlzdWFsTW9kZSkgPyBhcmdzLnJlcGVhdCA6IDE7XG4gICAgICAgICAgaWYgKGFyZ3MubGluZXdpc2UpIHtcbiAgICAgICAgICAgIC8vIFRoZSBvbmx5IHdheSB0byBkZWxldGUgYSBuZXdsaW5lIGlzIHRvIGRlbGV0ZSB1bnRpbCB0aGUgc3RhcnQgb2ZcbiAgICAgICAgICAgIC8vIHRoZSBuZXh0IGxpbmUsIHNvIGluIGxpbmV3aXNlIG1vZGUgZXZhbElucHV0IHdpbGwgaW5jbHVkZSB0aGUgbmV4dFxuICAgICAgICAgICAgLy8gbGluZS4gV2UgZG9uJ3Qgd2FudCB0aGlzIGluIGluZGVudCwgc28gd2UgZ28gYmFjayBhIGxpbmUuXG4gICAgICAgICAgICBlbmRMaW5lLS07XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvciAodmFyIGkgPSBzdGFydExpbmU7IGkgPD0gZW5kTGluZTsgaSsrKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHJlcGVhdDsgaisrKSB7XG4gICAgICAgICAgICAgIGNtLmluZGVudExpbmUoaSwgYXJncy5pbmRlbnRSaWdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtb3Rpb25zLm1vdmVUb0ZpcnN0Tm9uV2hpdGVTcGFjZUNoYXJhY3RlcihjbSwgcmFuZ2VzWzBdLmFuY2hvcik7XG4gICAgICB9LFxuICAgICAgaW5kZW50QXV0bzogZnVuY3Rpb24oY20sIF9hcmdzLCByYW5nZXMpIHtcbiAgICAgICAgaWYgKHJhbmdlcy5sZW5ndGggPiAxKSB7IC8vIGFjZV9wYXRjaFxuICAgICAgICAgIGNtLnNldFNlbGVjdGlvbihyYW5nZXNbMF0uYW5jaG9yLCByYW5nZXNbcmFuZ2VzLmxlbmd0aCAtIDFdLmhlYWQpO1xuICAgICAgICB9XG4gICAgICAgIGNtLmV4ZWNDb21tYW5kKFwiaW5kZW50QXV0b1wiKTtcbiAgICAgICAgcmV0dXJuIG1vdGlvbnMubW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLCByYW5nZXNbMF0uYW5jaG9yKTtcbiAgICAgIH0sXG4gICAgICBjaGFuZ2VDYXNlOiBmdW5jdGlvbihjbSwgYXJncywgcmFuZ2VzLCBvbGRBbmNob3IsIG5ld0hlYWQpIHtcbiAgICAgICAgdmFyIHNlbGVjdGlvbnMgPSBjbS5nZXRTZWxlY3Rpb25zKCk7XG4gICAgICAgIHZhciBzd2FwcGVkID0gW107XG4gICAgICAgIHZhciB0b0xvd2VyID0gYXJncy50b0xvd2VyO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHNlbGVjdGlvbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICB2YXIgdG9Td2FwID0gc2VsZWN0aW9uc1tqXTtcbiAgICAgICAgICB2YXIgdGV4dCA9ICcnO1xuICAgICAgICAgIGlmICh0b0xvd2VyID09PSB0cnVlKSB7XG4gICAgICAgICAgICB0ZXh0ID0gdG9Td2FwLnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh0b0xvd2VyID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGV4dCA9IHRvU3dhcC50b1VwcGVyQ2FzZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvU3dhcC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICB2YXIgY2hhcmFjdGVyID0gdG9Td2FwLmNoYXJBdChpKTtcbiAgICAgICAgICAgICAgdGV4dCArPSBpc1VwcGVyQ2FzZShjaGFyYWN0ZXIpID8gY2hhcmFjdGVyLnRvTG93ZXJDYXNlKCkgOlxuICAgICAgICAgICAgICAgICAgY2hhcmFjdGVyLnRvVXBwZXJDYXNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHN3YXBwZWQucHVzaCh0ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9ucyhzd2FwcGVkKTtcbiAgICAgICAgaWYgKGFyZ3Muc2hvdWxkTW92ZUN1cnNvcil7XG4gICAgICAgICAgcmV0dXJuIG5ld0hlYWQ7XG4gICAgICAgIH0gZWxzZSBpZiAoIWNtLnN0YXRlLnZpbS52aXN1YWxNb2RlICYmIGFyZ3MubGluZXdpc2UgJiYgcmFuZ2VzWzBdLmFuY2hvci5saW5lICsgMSA9PSByYW5nZXNbMF0uaGVhZC5saW5lKSB7XG4gICAgICAgICAgcmV0dXJuIG1vdGlvbnMubW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLCBvbGRBbmNob3IpO1xuICAgICAgICB9IGVsc2UgaWYgKGFyZ3MubGluZXdpc2Upe1xuICAgICAgICAgIHJldHVybiBvbGRBbmNob3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGN1cnNvck1pbihyYW5nZXNbMF0uYW5jaG9yLCByYW5nZXNbMF0uaGVhZCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB5YW5rOiBmdW5jdGlvbihjbSwgYXJncywgcmFuZ2VzLCBvbGRBbmNob3IpIHtcbiAgICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgICAgdmFyIHRleHQgPSBjbS5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgdmFyIGVuZFBvcyA9IHZpbS52aXN1YWxNb2RlXG4gICAgICAgICAgPyBjdXJzb3JNaW4odmltLnNlbC5hbmNob3IsIHZpbS5zZWwuaGVhZCwgcmFuZ2VzWzBdLmhlYWQsIHJhbmdlc1swXS5hbmNob3IpXG4gICAgICAgICAgOiBvbGRBbmNob3I7XG4gICAgICAgIHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5wdXNoVGV4dChcbiAgICAgICAgICAgIGFyZ3MucmVnaXN0ZXJOYW1lLCAneWFuaycsXG4gICAgICAgICAgICB0ZXh0LCBhcmdzLmxpbmV3aXNlLCB2aW0udmlzdWFsQmxvY2spO1xuICAgICAgICByZXR1cm4gZW5kUG9zO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVPcGVyYXRvcihuYW1lLCBmbikge1xuICAgICAgb3BlcmF0b3JzW25hbWVdID0gZm47XG4gICAgfVxuXG4gICAgdmFyIGFjdGlvbnMgPSB7XG4gICAgICBqdW1wTGlzdFdhbGs6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZXBlYXQgPSBhY3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgdmFyIGZvcndhcmQgPSBhY3Rpb25BcmdzLmZvcndhcmQ7XG4gICAgICAgIHZhciBqdW1wTGlzdCA9IHZpbUdsb2JhbFN0YXRlLmp1bXBMaXN0O1xuXG4gICAgICAgIHZhciBtYXJrID0ganVtcExpc3QubW92ZShjbSwgZm9yd2FyZCA/IHJlcGVhdCA6IC1yZXBlYXQpO1xuICAgICAgICB2YXIgbWFya1BvcyA9IG1hcmsgPyBtYXJrLmZpbmQoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgbWFya1BvcyA9IG1hcmtQb3MgPyBtYXJrUG9zIDogY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgIGNtLnNldEN1cnNvcihtYXJrUG9zKTtcbiAgICAgICAgY20uYWNlLmN1ck9wLmNvbW1hbmQuc2Nyb2xsSW50b1ZpZXcgPSBcImNlbnRlci1hbmltYXRlXCI7IC8vIGFjZV9wYXRjaFxuICAgICAgfSxcbiAgICAgIHNjcm9sbDogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlcGVhdCA9IGFjdGlvbkFyZ3MucmVwZWF0IHx8IDE7XG4gICAgICAgIHZhciBsaW5lSGVpZ2h0ID0gY20uZGVmYXVsdFRleHRIZWlnaHQoKTtcbiAgICAgICAgdmFyIHRvcCA9IGNtLmdldFNjcm9sbEluZm8oKS50b3A7XG4gICAgICAgIHZhciBkZWx0YSA9IGxpbmVIZWlnaHQgKiByZXBlYXQ7XG4gICAgICAgIHZhciBuZXdQb3MgPSBhY3Rpb25BcmdzLmZvcndhcmQgPyB0b3AgKyBkZWx0YSA6IHRvcCAtIGRlbHRhO1xuICAgICAgICB2YXIgY3Vyc29yID0gY29weUN1cnNvcihjbS5nZXRDdXJzb3IoKSk7XG4gICAgICAgIHZhciBjdXJzb3JDb29yZHMgPSBjbS5jaGFyQ29vcmRzKGN1cnNvciwgJ2xvY2FsJyk7XG4gICAgICAgIGlmIChhY3Rpb25BcmdzLmZvcndhcmQpIHtcbiAgICAgICAgICBpZiAobmV3UG9zID4gY3Vyc29yQ29vcmRzLnRvcCkge1xuICAgICAgICAgICAgIGN1cnNvci5saW5lICs9IChuZXdQb3MgLSBjdXJzb3JDb29yZHMudG9wKSAvIGxpbmVIZWlnaHQ7XG4gICAgICAgICAgICAgY3Vyc29yLmxpbmUgPSBNYXRoLmNlaWwoY3Vyc29yLmxpbmUpO1xuICAgICAgICAgICAgIGNtLnNldEN1cnNvcihjdXJzb3IpO1xuICAgICAgICAgICAgIGN1cnNvckNvb3JkcyA9IGNtLmNoYXJDb29yZHMoY3Vyc29yLCAnbG9jYWwnKTtcbiAgICAgICAgICAgICBjbS5zY3JvbGxUbyhudWxsLCBjdXJzb3JDb29yZHMudG9wKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgIC8vIEN1cnNvciBzdGF5cyB3aXRoaW4gYm91bmRzLiAgSnVzdCByZXBvc2l0aW9uIHRoZSBzY3JvbGwgd2luZG93LlxuICAgICAgICAgICAgIGNtLnNjcm9sbFRvKG51bGwsIG5ld1Bvcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBuZXdCb3R0b20gPSBuZXdQb3MgKyBjbS5nZXRTY3JvbGxJbmZvKCkuY2xpZW50SGVpZ2h0O1xuICAgICAgICAgIGlmIChuZXdCb3R0b20gPCBjdXJzb3JDb29yZHMuYm90dG9tKSB7XG4gICAgICAgICAgICAgY3Vyc29yLmxpbmUgLT0gKGN1cnNvckNvb3Jkcy5ib3R0b20gLSBuZXdCb3R0b20pIC8gbGluZUhlaWdodDtcbiAgICAgICAgICAgICBjdXJzb3IubGluZSA9IE1hdGguZmxvb3IoY3Vyc29yLmxpbmUpO1xuICAgICAgICAgICAgIGNtLnNldEN1cnNvcihjdXJzb3IpO1xuICAgICAgICAgICAgIGN1cnNvckNvb3JkcyA9IGNtLmNoYXJDb29yZHMoY3Vyc29yLCAnbG9jYWwnKTtcbiAgICAgICAgICAgICBjbS5zY3JvbGxUbyhcbiAgICAgICAgICAgICAgICAgbnVsbCwgY3Vyc29yQ29vcmRzLmJvdHRvbSAtIGNtLmdldFNjcm9sbEluZm8oKS5jbGllbnRIZWlnaHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgLy8gQ3Vyc29yIHN0YXlzIHdpdGhpbiBib3VuZHMuICBKdXN0IHJlcG9zaXRpb24gdGhlIHNjcm9sbCB3aW5kb3cuXG4gICAgICAgICAgICAgY20uc2Nyb2xsVG8obnVsbCwgbmV3UG9zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzY3JvbGxUb0N1cnNvcjogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MpIHtcbiAgICAgICAgdmFyIGxpbmVOdW0gPSBjbS5nZXRDdXJzb3IoKS5saW5lO1xuICAgICAgICB2YXIgY2hhckNvb3JkcyA9IGNtLmNoYXJDb29yZHMobmV3IFBvcyhsaW5lTnVtLCAwKSwgJ2xvY2FsJyk7XG4gICAgICAgIHZhciBoZWlnaHQgPSBjbS5nZXRTY3JvbGxJbmZvKCkuY2xpZW50SGVpZ2h0O1xuICAgICAgICB2YXIgeSA9IGNoYXJDb29yZHMudG9wO1xuICAgICAgICBzd2l0Y2ggKGFjdGlvbkFyZ3MucG9zaXRpb24pIHtcbiAgICAgICAgICBjYXNlICdjZW50ZXInOiB5ID0gY2hhckNvb3Jkcy5ib3R0b20gLSBoZWlnaHQgLyAyO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgIHZhciBsaW5lTGFzdENoYXJQb3MgPSBuZXcgUG9zKGxpbmVOdW0sIGNtLmdldExpbmUobGluZU51bSkubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICB2YXIgbGluZUxhc3RDaGFyQ29vcmRzID0gY20uY2hhckNvb3JkcyhsaW5lTGFzdENoYXJQb3MsICdsb2NhbCcpO1xuICAgICAgICAgICAgdmFyIGxpbmVIZWlnaHQgPSBsaW5lTGFzdENoYXJDb29yZHMuYm90dG9tIC0geTtcbiAgICAgICAgICAgIHkgPSB5IC0gaGVpZ2h0ICsgbGluZUhlaWdodFxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY20uc2Nyb2xsVG8obnVsbCwgeSk7XG4gICAgICB9LFxuICAgICAgcmVwbGF5TWFjcm86IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIHJlZ2lzdGVyTmFtZSA9IGFjdGlvbkFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXI7XG4gICAgICAgIHZhciByZXBlYXQgPSBhY3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICAgIGlmIChyZWdpc3Rlck5hbWUgPT0gJ0AnKSB7XG4gICAgICAgICAgcmVnaXN0ZXJOYW1lID0gbWFjcm9Nb2RlU3RhdGUubGF0ZXN0UmVnaXN0ZXI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbWFjcm9Nb2RlU3RhdGUubGF0ZXN0UmVnaXN0ZXIgPSByZWdpc3Rlck5hbWU7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUocmVwZWF0LS0pe1xuICAgICAgICAgIGV4ZWN1dGVNYWNyb1JlZ2lzdGVyKGNtLCB2aW0sIG1hY3JvTW9kZVN0YXRlLCByZWdpc3Rlck5hbWUpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZW50ZXJNYWNyb1JlY29yZE1vZGU6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzKSB7XG4gICAgICAgIHZhciBtYWNyb01vZGVTdGF0ZSA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlO1xuICAgICAgICB2YXIgcmVnaXN0ZXJOYW1lID0gYWN0aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlcjtcbiAgICAgICAgaWYgKHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5pc1ZhbGlkUmVnaXN0ZXIocmVnaXN0ZXJOYW1lKSkge1xuICAgICAgICAgIG1hY3JvTW9kZVN0YXRlLmVudGVyTWFjcm9SZWNvcmRNb2RlKGNtLCByZWdpc3Rlck5hbWUpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgdG9nZ2xlT3ZlcndyaXRlOiBmdW5jdGlvbihjbSkge1xuICAgICAgICBpZiAoIWNtLnN0YXRlLm92ZXJ3cml0ZSkge1xuICAgICAgICAgIGNtLnRvZ2dsZU92ZXJ3cml0ZSh0cnVlKTtcbiAgICAgICAgICBjbS5zZXRPcHRpb24oJ2tleU1hcCcsICd2aW0tcmVwbGFjZScpO1xuICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJyZXBsYWNlXCJ9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbS50b2dnbGVPdmVyd3JpdGUoZmFsc2UpO1xuICAgICAgICAgIGNtLnNldE9wdGlvbigna2V5TWFwJywgJ3ZpbS1pbnNlcnQnKTtcbiAgICAgICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwge21vZGU6IFwiaW5zZXJ0XCJ9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGVudGVySW5zZXJ0TW9kZTogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICBpZiAoY20uZ2V0T3B0aW9uKCdyZWFkT25seScpKSB7IHJldHVybjsgfVxuICAgICAgICB2aW0uaW5zZXJ0TW9kZSA9IHRydWU7XG4gICAgICAgIHZpbS5pbnNlcnRNb2RlUmVwZWF0ID0gYWN0aW9uQXJncyAmJiBhY3Rpb25BcmdzLnJlcGVhdCB8fCAxO1xuICAgICAgICB2YXIgaW5zZXJ0QXQgPSAoYWN0aW9uQXJncykgPyBhY3Rpb25BcmdzLmluc2VydEF0IDogbnVsbDtcbiAgICAgICAgdmFyIHNlbCA9IHZpbS5zZWw7XG4gICAgICAgIHZhciBoZWFkID0gYWN0aW9uQXJncy5oZWFkIHx8IGNtLmdldEN1cnNvcignaGVhZCcpO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gY20ubGlzdFNlbGVjdGlvbnMoKS5sZW5ndGg7XG4gICAgICAgIGlmIChpbnNlcnRBdCA9PSAnZW9sJykge1xuICAgICAgICAgIGhlYWQgPSBuZXcgUG9zKGhlYWQubGluZSwgbGluZUxlbmd0aChjbSwgaGVhZC5saW5lKSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaW5zZXJ0QXQgPT0gJ2JvbCcpIHtcbiAgICAgICAgICBoZWFkID0gbmV3IFBvcyhoZWFkLmxpbmUsIDApO1xuICAgICAgICB9IGVsc2UgaWYgKGluc2VydEF0ID09ICdjaGFyQWZ0ZXInKSB7XG4gICAgICAgICAgdmFyIG5ld1Bvc2l0aW9uID0gdXBkYXRlU2VsZWN0aW9uRm9yU3Vycm9nYXRlQ2hhcmFjdGVycyhjbSwgaGVhZCwgb2Zmc2V0Q3Vyc29yKGhlYWQsIDAsIDEpKTtcbiAgICAgICAgICBoZWFkID0gbmV3UG9zaXRpb24uZW5kO1xuICAgICAgICB9IGVsc2UgaWYgKGluc2VydEF0ID09ICdmaXJzdE5vbkJsYW5rJykge1xuICAgICAgICAgIHZhciBuZXdQb3NpdGlvbiA9IHVwZGF0ZVNlbGVjdGlvbkZvclN1cnJvZ2F0ZUNoYXJhY3RlcnMoY20sIGhlYWQsIG1vdGlvbnMubW92ZVRvRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLCBoZWFkKSk7XG4gICAgICAgICAgaGVhZCA9IG5ld1Bvc2l0aW9uLmVuZDtcbiAgICAgICAgfSBlbHNlIGlmIChpbnNlcnRBdCA9PSAnc3RhcnRPZlNlbGVjdGVkQXJlYScpIHtcbiAgICAgICAgICBpZiAoIXZpbS52aXN1YWxNb2RlKVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgaWYgKCF2aW0udmlzdWFsQmxvY2spIHtcbiAgICAgICAgICAgIGlmIChzZWwuaGVhZC5saW5lIDwgc2VsLmFuY2hvci5saW5lKSB7XG4gICAgICAgICAgICAgIGhlYWQgPSBzZWwuaGVhZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGhlYWQgPSBuZXcgUG9zKHNlbC5hbmNob3IubGluZSwgMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGhlYWQgPSBuZXcgUG9zKFxuICAgICAgICAgICAgICAgIE1hdGgubWluKHNlbC5oZWFkLmxpbmUsIHNlbC5hbmNob3IubGluZSksXG4gICAgICAgICAgICAgICAgTWF0aC5taW4oc2VsLmhlYWQuY2gsIHNlbC5hbmNob3IuY2gpKTtcbiAgICAgICAgICAgIGhlaWdodCA9IE1hdGguYWJzKHNlbC5oZWFkLmxpbmUgLSBzZWwuYW5jaG9yLmxpbmUpICsgMTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoaW5zZXJ0QXQgPT0gJ2VuZE9mU2VsZWN0ZWRBcmVhJykge1xuICAgICAgICAgICAgaWYgKCF2aW0udmlzdWFsTW9kZSlcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIGlmICghdmltLnZpc3VhbEJsb2NrKSB7XG4gICAgICAgICAgICBpZiAoc2VsLmhlYWQubGluZSA+PSBzZWwuYW5jaG9yLmxpbmUpIHtcbiAgICAgICAgICAgICAgaGVhZCA9IG9mZnNldEN1cnNvcihzZWwuaGVhZCwgMCwgMSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBoZWFkID0gbmV3IFBvcyhzZWwuYW5jaG9yLmxpbmUsIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoZWFkID0gbmV3IFBvcyhcbiAgICAgICAgICAgICAgICBNYXRoLm1pbihzZWwuaGVhZC5saW5lLCBzZWwuYW5jaG9yLmxpbmUpLFxuICAgICAgICAgICAgICAgIE1hdGgubWF4KHNlbC5oZWFkLmNoLCBzZWwuYW5jaG9yLmNoKSArIDEpO1xuICAgICAgICAgICAgaGVpZ2h0ID0gTWF0aC5hYnMoc2VsLmhlYWQubGluZSAtIHNlbC5hbmNob3IubGluZSkgKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpbnNlcnRBdCA9PSAnaW5wbGFjZScpIHtcbiAgICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpe1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChpbnNlcnRBdCA9PSAnbGFzdEVkaXQnKSB7XG4gICAgICAgICAgaGVhZCA9IGdldExhc3RFZGl0UG9zKGNtKSB8fCBoZWFkO1xuICAgICAgICB9XG4gICAgICAgIGNtLnNldE9wdGlvbignZGlzYWJsZUlucHV0JywgZmFsc2UpO1xuICAgICAgICBpZiAoYWN0aW9uQXJncyAmJiBhY3Rpb25BcmdzLnJlcGxhY2UpIHtcbiAgICAgICAgICAvLyBIYW5kbGUgUmVwbGFjZS1tb2RlIGFzIGEgc3BlY2lhbCBjYXNlIG9mIGluc2VydCBtb2RlLlxuICAgICAgICAgIGNtLnRvZ2dsZU92ZXJ3cml0ZSh0cnVlKTtcbiAgICAgICAgICBjbS5zZXRPcHRpb24oJ2tleU1hcCcsICd2aW0tcmVwbGFjZScpO1xuICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCBcInZpbS1tb2RlLWNoYW5nZVwiLCB7bW9kZTogXCJyZXBsYWNlXCJ9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjbS50b2dnbGVPdmVyd3JpdGUoZmFsc2UpO1xuICAgICAgICAgIGNtLnNldE9wdGlvbigna2V5TWFwJywgJ3ZpbS1pbnNlcnQnKTtcbiAgICAgICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwge21vZGU6IFwiaW5zZXJ0XCJ9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlLmlzUGxheWluZykge1xuICAgICAgICAgIC8vIE9ubHkgcmVjb3JkIGlmIG5vdCByZXBsYXlpbmcuXG4gICAgICAgICAgY20ub24oJ2NoYW5nZScsIG9uQ2hhbmdlKTtcbiAgICAgICAgICBDb2RlTWlycm9yLm9uKGNtLmdldElucHV0RmllbGQoKSwgJ2tleWRvd24nLCBvbktleUV2ZW50VGFyZ2V0S2V5RG93bik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgZXhpdFZpc3VhbE1vZGUoY20pO1xuICAgICAgICB9XG4gICAgICAgIHNlbGVjdEZvckluc2VydChjbSwgaGVhZCwgaGVpZ2h0KTtcbiAgICAgIH0sXG4gICAgICB0b2dnbGVWaXN1YWxNb2RlOiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciByZXBlYXQgPSBhY3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgdmFyIGFuY2hvciA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICB2YXIgaGVhZDtcbiAgICAgICAgLy8gVE9ETzogVGhlIHJlcGVhdCBzaG91bGQgYWN0dWFsbHkgc2VsZWN0IG51bWJlciBvZiBjaGFyYWN0ZXJzL2xpbmVzXG4gICAgICAgIC8vICAgICBlcXVhbCB0byB0aGUgcmVwZWF0IHRpbWVzIHRoZSBzaXplIG9mIHRoZSBwcmV2aW91cyB2aXN1YWxcbiAgICAgICAgLy8gICAgIG9wZXJhdGlvbi5cbiAgICAgICAgaWYgKCF2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgIC8vIEVudGVyaW5nIHZpc3VhbCBtb2RlXG4gICAgICAgICAgdmltLnZpc3VhbE1vZGUgPSB0cnVlO1xuICAgICAgICAgIHZpbS52aXN1YWxMaW5lID0gISFhY3Rpb25BcmdzLmxpbmV3aXNlO1xuICAgICAgICAgIHZpbS52aXN1YWxCbG9jayA9ICEhYWN0aW9uQXJncy5ibG9ja3dpc2U7XG4gICAgICAgICAgaGVhZCA9IGNsaXBDdXJzb3JUb0NvbnRlbnQoXG4gICAgICAgICAgICAgIGNtLCBuZXcgUG9zKGFuY2hvci5saW5lLCBhbmNob3IuY2ggKyByZXBlYXQgLSAxKSk7XG4gICAgICAgICAgdmFyIG5ld1Bvc2l0aW9uID0gdXBkYXRlU2VsZWN0aW9uRm9yU3Vycm9nYXRlQ2hhcmFjdGVycyhjbSwgYW5jaG9yLCBoZWFkKVxuICAgICAgICAgIHZpbS5zZWwgPSB7XG4gICAgICAgICAgICBhbmNob3I6IG5ld1Bvc2l0aW9uLnN0YXJ0LFxuICAgICAgICAgICAgaGVhZDogbmV3UG9zaXRpb24uZW5kXG4gICAgICAgICAgfTtcbiAgICAgICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwge21vZGU6IFwidmlzdWFsXCIsIHN1Yk1vZGU6IHZpbS52aXN1YWxMaW5lID8gXCJsaW5ld2lzZVwiIDogdmltLnZpc3VhbEJsb2NrID8gXCJibG9ja3dpc2VcIiA6IFwiXCJ9KTtcbiAgICAgICAgICB1cGRhdGVDbVNlbGVjdGlvbihjbSk7XG4gICAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCAnPCcsIGN1cnNvck1pbihhbmNob3IsIGhlYWQpKTtcbiAgICAgICAgICB1cGRhdGVNYXJrKGNtLCB2aW0sICc+JywgY3Vyc29yTWF4KGFuY2hvciwgaGVhZCkpO1xuICAgICAgICB9IGVsc2UgaWYgKHZpbS52aXN1YWxMaW5lIF4gYWN0aW9uQXJncy5saW5ld2lzZSB8fFxuICAgICAgICAgICAgdmltLnZpc3VhbEJsb2NrIF4gYWN0aW9uQXJncy5ibG9ja3dpc2UpIHtcbiAgICAgICAgICAvLyBUb2dnbGluZyBiZXR3ZWVuIG1vZGVzXG4gICAgICAgICAgdmltLnZpc3VhbExpbmUgPSAhIWFjdGlvbkFyZ3MubGluZXdpc2U7XG4gICAgICAgICAgdmltLnZpc3VhbEJsb2NrID0gISFhY3Rpb25BcmdzLmJsb2Nrd2lzZTtcbiAgICAgICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwge21vZGU6IFwidmlzdWFsXCIsIHN1Yk1vZGU6IHZpbS52aXN1YWxMaW5lID8gXCJsaW5ld2lzZVwiIDogdmltLnZpc3VhbEJsb2NrID8gXCJibG9ja3dpc2VcIiA6IFwiXCJ9KTtcbiAgICAgICAgICB1cGRhdGVDbVNlbGVjdGlvbihjbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhpdFZpc3VhbE1vZGUoY20pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVzZWxlY3RMYXN0U2VsZWN0aW9uOiBmdW5jdGlvbihjbSwgX2FjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgbGFzdFNlbGVjdGlvbiA9IHZpbS5sYXN0U2VsZWN0aW9uO1xuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICB1cGRhdGVMYXN0U2VsZWN0aW9uKGNtLCB2aW0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsYXN0U2VsZWN0aW9uKSB7XG4gICAgICAgICAgdmFyIGFuY2hvciA9IGxhc3RTZWxlY3Rpb24uYW5jaG9yTWFyay5maW5kKCk7XG4gICAgICAgICAgdmFyIGhlYWQgPSBsYXN0U2VsZWN0aW9uLmhlYWRNYXJrLmZpbmQoKTtcbiAgICAgICAgICBpZiAoIWFuY2hvciB8fCAhaGVhZCkge1xuICAgICAgICAgICAgLy8gSWYgdGhlIG1hcmtzIGhhdmUgYmVlbiBkZXN0cm95ZWQgZHVlIHRvIGVkaXRzLCBkbyBub3RoaW5nLlxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2aW0uc2VsID0ge1xuICAgICAgICAgICAgYW5jaG9yOiBhbmNob3IsXG4gICAgICAgICAgICBoZWFkOiBoZWFkXG4gICAgICAgICAgfTtcbiAgICAgICAgICB2aW0udmlzdWFsTW9kZSA9IHRydWU7XG4gICAgICAgICAgdmltLnZpc3VhbExpbmUgPSBsYXN0U2VsZWN0aW9uLnZpc3VhbExpbmU7XG4gICAgICAgICAgdmltLnZpc3VhbEJsb2NrID0gbGFzdFNlbGVjdGlvbi52aXN1YWxCbG9jaztcbiAgICAgICAgICB1cGRhdGVDbVNlbGVjdGlvbihjbSk7XG4gICAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCAnPCcsIGN1cnNvck1pbihhbmNob3IsIGhlYWQpKTtcbiAgICAgICAgICB1cGRhdGVNYXJrKGNtLCB2aW0sICc+JywgY3Vyc29yTWF4KGFuY2hvciwgaGVhZCkpO1xuICAgICAgICAgIENvZGVNaXJyb3Iuc2lnbmFsKGNtLCAndmltLW1vZGUtY2hhbmdlJywge1xuICAgICAgICAgICAgbW9kZTogJ3Zpc3VhbCcsXG4gICAgICAgICAgICBzdWJNb2RlOiB2aW0udmlzdWFsTGluZSA/ICdsaW5ld2lzZScgOlxuICAgICAgICAgICAgICAgICAgICAgdmltLnZpc3VhbEJsb2NrID8gJ2Jsb2Nrd2lzZScgOiAnJ30pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgam9pbkxpbmVzOiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZhciBjdXJTdGFydCwgY3VyRW5kO1xuICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICBjdXJTdGFydCA9IGNtLmdldEN1cnNvcignYW5jaG9yJyk7XG4gICAgICAgICAgY3VyRW5kID0gY20uZ2V0Q3Vyc29yKCdoZWFkJyk7XG4gICAgICAgICAgaWYgKGN1cnNvcklzQmVmb3JlKGN1ckVuZCwgY3VyU3RhcnQpKSB7XG4gICAgICAgICAgICB2YXIgdG1wID0gY3VyRW5kO1xuICAgICAgICAgICAgY3VyRW5kID0gY3VyU3RhcnQ7XG4gICAgICAgICAgICBjdXJTdGFydCA9IHRtcDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VyRW5kLmNoID0gbGluZUxlbmd0aChjbSwgY3VyRW5kLmxpbmUpIC0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBSZXBlYXQgaXMgdGhlIG51bWJlciBvZiBsaW5lcyB0byBqb2luLiBNaW5pbXVtIDIgbGluZXMuXG4gICAgICAgICAgdmFyIHJlcGVhdCA9IE1hdGgubWF4KGFjdGlvbkFyZ3MucmVwZWF0LCAyKTtcbiAgICAgICAgICBjdXJTdGFydCA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICAgIGN1ckVuZCA9IGNsaXBDdXJzb3JUb0NvbnRlbnQoY20sIG5ldyBQb3MoY3VyU3RhcnQubGluZSArIHJlcGVhdCAtIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEluZmluaXR5KSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZpbmFsQ2ggPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gY3VyU3RhcnQubGluZTsgaSA8IGN1ckVuZC5saW5lOyBpKyspIHtcbiAgICAgICAgICBmaW5hbENoID0gbGluZUxlbmd0aChjbSwgY3VyU3RhcnQubGluZSk7XG4gICAgICAgICAgdmFyIHRleHQgPSAnJztcbiAgICAgICAgICB2YXIgbmV4dFN0YXJ0Q2ggPSAwO1xuICAgICAgICAgIGlmICghYWN0aW9uQXJncy5rZWVwU3BhY2VzKSB7XG4gICAgICAgICAgICB2YXIgbmV4dExpbmUgPSBjbS5nZXRMaW5lKGN1clN0YXJ0LmxpbmUgKyAxKTtcbiAgICAgICAgICAgIG5leHRTdGFydENoID0gbmV4dExpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgICAgIGlmIChuZXh0U3RhcnRDaCA9PSAtMSkge1xuICAgICAgICAgICAgICBuZXh0U3RhcnRDaCA9IG5leHRMaW5lLmxlbmd0aDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRleHQgPSBcIiBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgY20ucmVwbGFjZVJhbmdlKHRleHQsIFxuICAgICAgICAgICAgbmV3IFBvcyhjdXJTdGFydC5saW5lLCBmaW5hbENoKSxcbiAgICAgICAgICAgIG5ldyBQb3MoY3VyU3RhcnQubGluZSArIDEsIG5leHRTdGFydENoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGN1ckZpbmFsUG9zID0gY2xpcEN1cnNvclRvQ29udGVudChjbSwgbmV3IFBvcyhjdXJTdGFydC5saW5lLCBmaW5hbENoKSk7XG4gICAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgIGV4aXRWaXN1YWxNb2RlKGNtLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICAgICAgY20uc2V0Q3Vyc29yKGN1ckZpbmFsUG9zKTtcbiAgICAgIH0sXG4gICAgICBuZXdMaW5lQW5kRW50ZXJJbnNlcnRNb2RlOiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncywgdmltKSB7XG4gICAgICAgIHZpbS5pbnNlcnRNb2RlID0gdHJ1ZTtcbiAgICAgICAgdmFyIGluc2VydEF0ID0gY29weUN1cnNvcihjbS5nZXRDdXJzb3IoKSk7XG4gICAgICAgIGlmIChpbnNlcnRBdC5saW5lID09PSBjbS5maXJzdExpbmUoKSAmJiAhYWN0aW9uQXJncy5hZnRlcikge1xuICAgICAgICAgIC8vIFNwZWNpYWwgY2FzZSBmb3IgaW5zZXJ0aW5nIG5ld2xpbmUgYmVmb3JlIHN0YXJ0IG9mIGRvY3VtZW50LlxuICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZSgnXFxuJywgbmV3IFBvcyhjbS5maXJzdExpbmUoKSwgMCkpO1xuICAgICAgICAgIGNtLnNldEN1cnNvcihjbS5maXJzdExpbmUoKSwgMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5zZXJ0QXQubGluZSA9IChhY3Rpb25BcmdzLmFmdGVyKSA/IGluc2VydEF0LmxpbmUgOlxuICAgICAgICAgICAgICBpbnNlcnRBdC5saW5lIC0gMTtcbiAgICAgICAgICBpbnNlcnRBdC5jaCA9IGxpbmVMZW5ndGgoY20sIGluc2VydEF0LmxpbmUpO1xuICAgICAgICAgIGNtLnNldEN1cnNvcihpbnNlcnRBdCk7XG4gICAgICAgICAgdmFyIG5ld2xpbmVGbiA9IENvZGVNaXJyb3IuY29tbWFuZHMubmV3bGluZUFuZEluZGVudENvbnRpbnVlQ29tbWVudCB8fFxuICAgICAgICAgICAgICBDb2RlTWlycm9yLmNvbW1hbmRzLm5ld2xpbmVBbmRJbmRlbnQ7XG4gICAgICAgICAgbmV3bGluZUZuKGNtKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmVudGVySW5zZXJ0TW9kZShjbSwgeyByZXBlYXQ6IGFjdGlvbkFyZ3MucmVwZWF0IH0sIHZpbSk7XG4gICAgICB9LFxuICAgICAgcGFzdGU6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIHJlZ2lzdGVyID0gdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmdldFJlZ2lzdGVyKFxuICAgICAgICAgIGFjdGlvbkFyZ3MucmVnaXN0ZXJOYW1lKTtcbiAgICAgICAgdmFyIGZhbGxiYWNrID0gKCkgPT4ge1xuICAgICAgICAgIHZhciB0ZXh0ID0gcmVnaXN0ZXIudG9TdHJpbmcoKTtcbiAgICAgICAgICB0aGlzLmNvbnRpbnVlUGFzdGUoY20sIGFjdGlvbkFyZ3MsIHZpbSwgdGV4dCwgcmVnaXN0ZXIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhY3Rpb25BcmdzLnJlZ2lzdGVyTmFtZSA9PT0gJysnICYmXG4gICAgICAgICAgICAgIHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICAgICAgIHR5cGVvZiBuYXZpZ2F0b3IuY2xpcGJvYXJkICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgICAgICB0eXBlb2YgbmF2aWdhdG9yLmNsaXBib2FyZC5yZWFkVGV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIG5hdmlnYXRvci5jbGlwYm9hcmQucmVhZFRleHQoKS50aGVuKCh2YWx1ZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jb250aW51ZVBhc3RlKGNtLCBhY3Rpb25BcmdzLCB2aW0sIHZhbHVlLCByZWdpc3Rlcik7XG4gICAgICAgICAgfSwgKCkgPT4geyBmYWxsYmFjaygpIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmFsbGJhY2soKVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgY29udGludWVQYXN0ZTogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSwgdGV4dCwgcmVnaXN0ZXIpIHtcbiAgICAgICAgdmFyIGN1ciA9IGNvcHlDdXJzb3IoY20uZ2V0Q3Vyc29yKCkpO1xuICAgICAgICBpZiAoIXRleHQpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvbkFyZ3MubWF0Y2hJbmRlbnQpIHtcbiAgICAgICAgICB2YXIgdGFiU2l6ZSA9IGNtLmdldE9wdGlvbihcInRhYlNpemVcIik7XG4gICAgICAgICAgLy8gbGVuZ3RoIHRoYXQgY29uc2lkZXJzIHRhYnMgYW5kIHRhYlNpemVcbiAgICAgICAgICB2YXIgd2hpdGVzcGFjZUxlbmd0aCA9IGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgdmFyIHRhYnMgPSAoc3RyLnNwbGl0KFwiXFx0XCIpLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgdmFyIHNwYWNlcyA9IChzdHIuc3BsaXQoXCIgXCIpLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgcmV0dXJuIHRhYnMgKiB0YWJTaXplICsgc3BhY2VzICogMTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHZhciBjdXJyZW50TGluZSA9IGNtLmdldExpbmUoY20uZ2V0Q3Vyc29yKCkubGluZSk7XG4gICAgICAgICAgdmFyIGluZGVudCA9IHdoaXRlc3BhY2VMZW5ndGgoY3VycmVudExpbmUubWF0Y2goL15cXHMqLylbMF0pO1xuICAgICAgICAgIC8vIGNob21wIGxhc3QgbmV3bGluZSBiL2MgZG9uJ3Qgd2FudCBpdCB0byBtYXRjaCAvXlxccyovZ21cbiAgICAgICAgICB2YXIgY2hvbXBlZFRleHQgPSB0ZXh0LnJlcGxhY2UoL1xcbiQvLCAnJyk7XG4gICAgICAgICAgdmFyIHdhc0Nob21wZWQgPSB0ZXh0ICE9PSBjaG9tcGVkVGV4dDtcbiAgICAgICAgICB2YXIgZmlyc3RJbmRlbnQgPSB3aGl0ZXNwYWNlTGVuZ3RoKHRleHQubWF0Y2goL15cXHMqLylbMF0pO1xuICAgICAgICAgIHZhciB0ZXh0ID0gY2hvbXBlZFRleHQucmVwbGFjZSgvXlxccyovZ20sIGZ1bmN0aW9uKHdzcGFjZSkge1xuICAgICAgICAgICAgdmFyIG5ld0luZGVudCA9IGluZGVudCArICh3aGl0ZXNwYWNlTGVuZ3RoKHdzcGFjZSkgLSBmaXJzdEluZGVudCk7XG4gICAgICAgICAgICBpZiAobmV3SW5kZW50IDwgMCkge1xuICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKGNtLmdldE9wdGlvbihcImluZGVudFdpdGhUYWJzXCIpKSB7XG4gICAgICAgICAgICAgIHZhciBxdW90aWVudCA9IE1hdGguZmxvb3IobmV3SW5kZW50IC8gdGFiU2l6ZSk7XG4gICAgICAgICAgICAgIHJldHVybiBBcnJheShxdW90aWVudCArIDEpLmpvaW4oJ1xcdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBBcnJheShuZXdJbmRlbnQgKyAxKS5qb2luKCcgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGV4dCArPSB3YXNDaG9tcGVkID8gXCJcXG5cIiA6IFwiXCI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFjdGlvbkFyZ3MucmVwZWF0ID4gMSkge1xuICAgICAgICAgIHZhciB0ZXh0ID0gQXJyYXkoYWN0aW9uQXJncy5yZXBlYXQgKyAxKS5qb2luKHRleHQpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsaW5ld2lzZSA9IHJlZ2lzdGVyLmxpbmV3aXNlO1xuICAgICAgICB2YXIgYmxvY2t3aXNlID0gcmVnaXN0ZXIuYmxvY2t3aXNlO1xuICAgICAgICBpZiAoYmxvY2t3aXNlKSB7XG4gICAgICAgICAgdGV4dCA9IHRleHQuc3BsaXQoJ1xcbicpO1xuICAgICAgICAgIGlmIChsaW5ld2lzZSkge1xuICAgICAgICAgICAgdGV4dC5wb3AoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0ZXh0W2ldID0gKHRleHRbaV0gPT0gJycpID8gJyAnIDogdGV4dFtpXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VyLmNoICs9IGFjdGlvbkFyZ3MuYWZ0ZXIgPyAxIDogMDtcbiAgICAgICAgICBjdXIuY2ggPSBNYXRoLm1pbihsaW5lTGVuZ3RoKGNtLCBjdXIubGluZSksIGN1ci5jaCk7XG4gICAgICAgIH0gZWxzZSBpZiAobGluZXdpc2UpIHtcbiAgICAgICAgICBpZih2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAgICAgdGV4dCA9IHZpbS52aXN1YWxMaW5lID8gdGV4dC5zbGljZSgwLCAtMSkgOiAnXFxuJyArIHRleHQuc2xpY2UoMCwgdGV4dC5sZW5ndGggLSAxKSArICdcXG4nO1xuICAgICAgICAgIH0gZWxzZSBpZiAoYWN0aW9uQXJncy5hZnRlcikge1xuICAgICAgICAgICAgLy8gTW92ZSB0aGUgbmV3bGluZSBhdCB0aGUgZW5kIHRvIHRoZSBzdGFydCBpbnN0ZWFkLCBhbmQgcGFzdGUganVzdFxuICAgICAgICAgICAgLy8gYmVmb3JlIHRoZSBuZXdsaW5lIGNoYXJhY3RlciBvZiB0aGUgbGluZSB3ZSBhcmUgb24gcmlnaHQgbm93LlxuICAgICAgICAgICAgdGV4dCA9ICdcXG4nICsgdGV4dC5zbGljZSgwLCB0ZXh0Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgY3VyLmNoID0gbGluZUxlbmd0aChjbSwgY3VyLmxpbmUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXIuY2ggPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdXIuY2ggKz0gYWN0aW9uQXJncy5hZnRlciA/IDEgOiAwO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJQb3NGaW5hbDtcbiAgICAgICAgdmFyIGlkeDtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgLy8gIHNhdmUgdGhlIHBhc3RlZCB0ZXh0IGZvciByZXNlbGVjdGlvbiBpZiB0aGUgbmVlZCBhcmlzZXNcbiAgICAgICAgICB2aW0ubGFzdFBhc3RlZFRleHQgPSB0ZXh0O1xuICAgICAgICAgIHZhciBsYXN0U2VsZWN0aW9uQ3VyRW5kO1xuICAgICAgICAgIHZhciBzZWxlY3RlZEFyZWEgPSBnZXRTZWxlY3RlZEFyZWFSYW5nZShjbSwgdmltKTtcbiAgICAgICAgICB2YXIgc2VsZWN0aW9uU3RhcnQgPSBzZWxlY3RlZEFyZWFbMF07XG4gICAgICAgICAgdmFyIHNlbGVjdGlvbkVuZCA9IHNlbGVjdGVkQXJlYVsxXTtcbiAgICAgICAgICB2YXIgc2VsZWN0ZWRUZXh0ID0gY20uZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgICAgdmFyIHNlbGVjdGlvbnMgPSBjbS5saXN0U2VsZWN0aW9ucygpO1xuICAgICAgICAgIHZhciBlbXB0eVN0cmluZ3MgPSBuZXcgQXJyYXkoc2VsZWN0aW9ucy5sZW5ndGgpLmpvaW4oJzEnKS5zcGxpdCgnMScpO1xuICAgICAgICAgIC8vIHNhdmUgdGhlIGN1ckVuZCBtYXJrZXIgYmVmb3JlIGl0IGdldCBjbGVhcmVkIGR1ZSB0byBjbS5yZXBsYWNlUmFuZ2UuXG4gICAgICAgICAgaWYgKHZpbS5sYXN0U2VsZWN0aW9uKSB7XG4gICAgICAgICAgICBsYXN0U2VsZWN0aW9uQ3VyRW5kID0gdmltLmxhc3RTZWxlY3Rpb24uaGVhZE1hcmsuZmluZCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBwdXNoIHRoZSBwcmV2aW91c2x5IHNlbGVjdGVkIHRleHQgdG8gdW5uYW1lZCByZWdpc3RlclxuICAgICAgICAgIHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci51bm5hbWVkUmVnaXN0ZXIuc2V0VGV4dChzZWxlY3RlZFRleHQpO1xuICAgICAgICAgIGlmIChibG9ja3dpc2UpIHtcbiAgICAgICAgICAgIC8vIGZpcnN0IGRlbGV0ZSB0aGUgc2VsZWN0ZWQgdGV4dFxuICAgICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbnMoZW1wdHlTdHJpbmdzKTtcbiAgICAgICAgICAgIC8vIFNldCBuZXcgc2VsZWN0aW9ucyBhcyBwZXIgdGhlIGJsb2NrIGxlbmd0aCBvZiB0aGUgeWFua2VkIHRleHRcbiAgICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IG5ldyBQb3Moc2VsZWN0aW9uU3RhcnQubGluZSArIHRleHQubGVuZ3RoLTEsIHNlbGVjdGlvblN0YXJ0LmNoKTtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihzZWxlY3Rpb25TdGFydCk7XG4gICAgICAgICAgICBzZWxlY3RCbG9jayhjbSwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VTZWxlY3Rpb25zKHRleHQpO1xuICAgICAgICAgICAgY3VyUG9zRmluYWwgPSBzZWxlY3Rpb25TdGFydDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZpbS52aXN1YWxCbG9jaykge1xuICAgICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbnMoZW1wdHlTdHJpbmdzKTtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihzZWxlY3Rpb25TdGFydCk7XG4gICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UodGV4dCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvblN0YXJ0KTtcbiAgICAgICAgICAgIGN1clBvc0ZpbmFsID0gc2VsZWN0aW9uU3RhcnQ7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZSh0ZXh0LCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKTtcbiAgICAgICAgICAgIGN1clBvc0ZpbmFsID0gY20ucG9zRnJvbUluZGV4KGNtLmluZGV4RnJvbVBvcyhzZWxlY3Rpb25TdGFydCkgKyB0ZXh0Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyByZXN0b3JlIHRoZSB0aGUgY3VyRW5kIG1hcmtlclxuICAgICAgICAgIGlmKGxhc3RTZWxlY3Rpb25DdXJFbmQpIHtcbiAgICAgICAgICAgIHZpbS5sYXN0U2VsZWN0aW9uLmhlYWRNYXJrID0gY20uc2V0Qm9va21hcmsobGFzdFNlbGVjdGlvbkN1ckVuZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChsaW5ld2lzZSkge1xuICAgICAgICAgICAgY3VyUG9zRmluYWwuY2g9MDtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGJsb2Nrd2lzZSkge1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGN1cik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRleHQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIGxpbmUgPSBjdXIubGluZStpO1xuICAgICAgICAgICAgICBpZiAobGluZSA+IGNtLmxhc3RMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UoJ1xcbicsICBuZXcgUG9zKGxpbmUsIDApKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXIgbGFzdENoID0gbGluZUxlbmd0aChjbSwgbGluZSk7XG4gICAgICAgICAgICAgIGlmIChsYXN0Q2ggPCBjdXIuY2gpIHtcbiAgICAgICAgICAgICAgICBleHRlbmRMaW5lVG9Db2x1bW4oY20sIGxpbmUsIGN1ci5jaCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihjdXIpO1xuICAgICAgICAgICAgc2VsZWN0QmxvY2soY20sIG5ldyBQb3MoY3VyLmxpbmUgKyB0ZXh0Lmxlbmd0aC0xLCBjdXIuY2gpKTtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VTZWxlY3Rpb25zKHRleHQpO1xuICAgICAgICAgICAgY3VyUG9zRmluYWwgPSBjdXI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZSh0ZXh0LCBjdXIpO1xuICAgICAgICAgICAgLy8gTm93IGZpbmUgdHVuZSB0aGUgY3Vyc29yIHRvIHdoZXJlIHdlIHdhbnQgaXQuXG4gICAgICAgICAgICBpZiAobGluZXdpc2UgJiYgYWN0aW9uQXJncy5hZnRlcikge1xuICAgICAgICAgICAgICBjdXJQb3NGaW5hbCA9IG5ldyBQb3MoXG4gICAgICAgICAgICAgICAgY3VyLmxpbmUgKyAxLFxuICAgICAgICAgICAgICAgIGZpbmRGaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIoY20uZ2V0TGluZShjdXIubGluZSArIDEpKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGxpbmV3aXNlICYmICFhY3Rpb25BcmdzLmFmdGVyKSB7XG4gICAgICAgICAgICAgIGN1clBvc0ZpbmFsID0gbmV3IFBvcyhcbiAgICAgICAgICAgICAgICBjdXIubGluZSxcbiAgICAgICAgICAgICAgICBmaW5kRmlyc3ROb25XaGl0ZVNwYWNlQ2hhcmFjdGVyKGNtLmdldExpbmUoY3VyLmxpbmUpKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFsaW5ld2lzZSAmJiBhY3Rpb25BcmdzLmFmdGVyKSB7XG4gICAgICAgICAgICAgIGlkeCA9IGNtLmluZGV4RnJvbVBvcyhjdXIpO1xuICAgICAgICAgICAgICBjdXJQb3NGaW5hbCA9IGNtLnBvc0Zyb21JbmRleChpZHggKyB0ZXh0Lmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWR4ID0gY20uaW5kZXhGcm9tUG9zKGN1cik7XG4gICAgICAgICAgICAgIGN1clBvc0ZpbmFsID0gY20ucG9zRnJvbUluZGV4KGlkeCArIHRleHQubGVuZ3RoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgZXhpdFZpc3VhbE1vZGUoY20sIGZhbHNlKTtcbiAgICAgICAgfVxuICAgICAgICBjbS5zZXRDdXJzb3IoY3VyUG9zRmluYWwpO1xuICAgICAgfSxcbiAgICAgIHVuZG86IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzKSB7XG4gICAgICAgIGNtLm9wZXJhdGlvbihmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXBlYXRGbihjbSwgQ29kZU1pcnJvci5jb21tYW5kcy51bmRvLCBhY3Rpb25BcmdzLnJlcGVhdCkoKTtcbiAgICAgICAgICBjbS5zZXRDdXJzb3IoY2xpcEN1cnNvclRvQ29udGVudChjbSwgY20uZ2V0Q3Vyc29yKCdzdGFydCcpKSk7XG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHJlZG86IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzKSB7XG4gICAgICAgIHJlcGVhdEZuKGNtLCBDb2RlTWlycm9yLmNvbW1hbmRzLnJlZG8sIGFjdGlvbkFyZ3MucmVwZWF0KSgpO1xuICAgICAgfSxcbiAgICAgIHNldFJlZ2lzdGVyOiBmdW5jdGlvbihfY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2aW0uaW5wdXRTdGF0ZS5yZWdpc3Rlck5hbWUgPSBhY3Rpb25BcmdzLnNlbGVjdGVkQ2hhcmFjdGVyO1xuICAgICAgfSxcbiAgICAgIHNldE1hcms6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIG1hcmtOYW1lID0gYWN0aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlcjtcbiAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCBtYXJrTmFtZSwgY20uZ2V0Q3Vyc29yKCkpO1xuICAgICAgfSxcbiAgICAgIHJlcGxhY2U6IGZ1bmN0aW9uKGNtLCBhY3Rpb25BcmdzLCB2aW0pIHtcbiAgICAgICAgdmFyIHJlcGxhY2VXaXRoID0gYWN0aW9uQXJncy5zZWxlY3RlZENoYXJhY3RlcjtcbiAgICAgICAgdmFyIGN1clN0YXJ0ID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgIHZhciByZXBsYWNlVG87XG4gICAgICAgIHZhciBjdXJFbmQ7XG4gICAgICAgIHZhciBzZWxlY3Rpb25zID0gY20ubGlzdFNlbGVjdGlvbnMoKTtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgY3VyU3RhcnQgPSBjbS5nZXRDdXJzb3IoJ3N0YXJ0Jyk7XG4gICAgICAgICAgY3VyRW5kID0gY20uZ2V0Q3Vyc29yKCdlbmQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUoY3VyU3RhcnQubGluZSk7XG4gICAgICAgICAgcmVwbGFjZVRvID0gY3VyU3RhcnQuY2ggKyBhY3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgICBpZiAocmVwbGFjZVRvID4gbGluZS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlcGxhY2VUbz1saW5lLmxlbmd0aDtcbiAgICAgICAgICB9XG4gICAgICAgICAgY3VyRW5kID0gbmV3IFBvcyhjdXJTdGFydC5saW5lLCByZXBsYWNlVG8pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5ld1Bvc2l0aW9ucyA9IHVwZGF0ZVNlbGVjdGlvbkZvclN1cnJvZ2F0ZUNoYXJhY3RlcnMoY20sIGN1clN0YXJ0LCBjdXJFbmQpO1xuICAgICAgICBjdXJTdGFydCA9IG5ld1Bvc2l0aW9ucy5zdGFydDtcbiAgICAgICAgY3VyRW5kID0gbmV3UG9zaXRpb25zLmVuZDtcbiAgICAgICAgaWYgKHJlcGxhY2VXaXRoPT0nXFxuJykge1xuICAgICAgICAgIGlmICghdmltLnZpc3VhbE1vZGUpIGNtLnJlcGxhY2VSYW5nZSgnJywgY3VyU3RhcnQsIGN1ckVuZCk7XG4gICAgICAgICAgLy8gc3BlY2lhbCBjYXNlLCB3aGVyZSB2aW0gaGVscCBzYXlzIHRvIHJlcGxhY2UgYnkganVzdCBvbmUgbGluZS1icmVha1xuICAgICAgICAgIChDb2RlTWlycm9yLmNvbW1hbmRzLm5ld2xpbmVBbmRJbmRlbnRDb250aW51ZUNvbW1lbnQgfHwgQ29kZU1pcnJvci5jb21tYW5kcy5uZXdsaW5lQW5kSW5kZW50KShjbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHJlcGxhY2VXaXRoU3RyID0gY20uZ2V0UmFuZ2UoY3VyU3RhcnQsIGN1ckVuZCk7XG4gICAgICAgICAgLy8gcmVwbGFjZSBhbGwgc3Vycm9nYXRlIGNoYXJhY3RlcnMgd2l0aCBzZWxlY3RlZCBjaGFyYWN0ZXJcbiAgICAgICAgICByZXBsYWNlV2l0aFN0ciA9IHJlcGxhY2VXaXRoU3RyLnJlcGxhY2UoL1tcXHVEODAwLVxcdURCRkZdW1xcdURDMDAtXFx1REZGRl0vZywgcmVwbGFjZVdpdGgpO1xuICAgICAgICAgIC8vcmVwbGFjZSBhbGwgY2hhcmFjdGVycyBpbiByYW5nZSBieSBzZWxlY3RlZCwgYnV0IGtlZXAgbGluZWJyZWFrc1xuICAgICAgICAgIHJlcGxhY2VXaXRoU3RyID0gcmVwbGFjZVdpdGhTdHIucmVwbGFjZSgvW15cXG5dL2csIHJlcGxhY2VXaXRoKTtcbiAgICAgICAgICBpZiAodmltLnZpc3VhbEJsb2NrKSB7XG4gICAgICAgICAgICAvLyBUYWJzIGFyZSBzcGxpdCBpbiB2aXN1YSBibG9jayBiZWZvcmUgcmVwbGFjaW5nXG4gICAgICAgICAgICB2YXIgc3BhY2VzID0gbmV3IEFycmF5KGNtLmdldE9wdGlvbihcInRhYlNpemVcIikrMSkuam9pbignICcpO1xuICAgICAgICAgICAgcmVwbGFjZVdpdGhTdHIgPSBjbS5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgICAgIHJlcGxhY2VXaXRoU3RyID0gcmVwbGFjZVdpdGhTdHIucmVwbGFjZSgvW1xcdUQ4MDAtXFx1REJGRl1bXFx1REMwMC1cXHVERkZGXS9nLCByZXBsYWNlV2l0aCk7XG4gICAgICAgICAgICByZXBsYWNlV2l0aFN0ciA9IHJlcGxhY2VXaXRoU3RyLnJlcGxhY2UoL1xcdC9nLCBzcGFjZXMpLnJlcGxhY2UoL1teXFxuXS9nLCByZXBsYWNlV2l0aCkuc3BsaXQoJ1xcbicpO1xuICAgICAgICAgICAgY20ucmVwbGFjZVNlbGVjdGlvbnMocmVwbGFjZVdpdGhTdHIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UocmVwbGFjZVdpdGhTdHIsIGN1clN0YXJ0LCBjdXJFbmQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgICAgIGN1clN0YXJ0ID0gY3Vyc29ySXNCZWZvcmUoc2VsZWN0aW9uc1swXS5hbmNob3IsIHNlbGVjdGlvbnNbMF0uaGVhZCkgP1xuICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbnNbMF0uYW5jaG9yIDogc2VsZWN0aW9uc1swXS5oZWFkO1xuICAgICAgICAgICAgY20uc2V0Q3Vyc29yKGN1clN0YXJ0KTtcbiAgICAgICAgICAgIGV4aXRWaXN1YWxNb2RlKGNtLCBmYWxzZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihvZmZzZXRDdXJzb3IoY3VyRW5kLCAwLCAtMSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGluY3JlbWVudE51bWJlclRva2VuOiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncykge1xuICAgICAgICB2YXIgY3VyID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgIHZhciBsaW5lU3RyID0gY20uZ2V0TGluZShjdXIubGluZSk7XG4gICAgICAgIHZhciByZSA9IC8oLT8pKD86KDB4KShbXFxkYS1mXSspfCgwYnwwfCkoXFxkKykpL2dpO1xuICAgICAgICB2YXIgbWF0Y2g7XG4gICAgICAgIHZhciBzdGFydDtcbiAgICAgICAgdmFyIGVuZDtcbiAgICAgICAgdmFyIG51bWJlclN0cjtcbiAgICAgICAgd2hpbGUgKChtYXRjaCA9IHJlLmV4ZWMobGluZVN0cikpICE9PSBudWxsKSB7XG4gICAgICAgICAgc3RhcnQgPSBtYXRjaC5pbmRleDtcbiAgICAgICAgICBlbmQgPSBzdGFydCArIG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgICAgICBpZiAoY3VyLmNoIDwgZW5kKWJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYWN0aW9uQXJncy5iYWNrdHJhY2sgJiYgKGVuZCA8PSBjdXIuY2gpKXJldHVybjtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgdmFyIGJhc2VTdHIgPSBtYXRjaFsyXSB8fCBtYXRjaFs0XVxuICAgICAgICAgIHZhciBkaWdpdHMgPSBtYXRjaFszXSB8fCBtYXRjaFs1XVxuICAgICAgICAgIHZhciBpbmNyZW1lbnQgPSBhY3Rpb25BcmdzLmluY3JlYXNlID8gMSA6IC0xO1xuICAgICAgICAgIHZhciBiYXNlID0geycwYic6IDIsICcwJzogOCwgJyc6IDEwLCAnMHgnOiAxNn1bYmFzZVN0ci50b0xvd2VyQ2FzZSgpXTtcbiAgICAgICAgICB2YXIgbnVtYmVyID0gcGFyc2VJbnQobWF0Y2hbMV0gKyBkaWdpdHMsIGJhc2UpICsgKGluY3JlbWVudCAqIGFjdGlvbkFyZ3MucmVwZWF0KTtcbiAgICAgICAgICBudW1iZXJTdHIgPSBudW1iZXIudG9TdHJpbmcoYmFzZSk7XG4gICAgICAgICAgdmFyIHplcm9QYWRkaW5nID0gYmFzZVN0ciA/IG5ldyBBcnJheShkaWdpdHMubGVuZ3RoIC0gbnVtYmVyU3RyLmxlbmd0aCArIDEgKyBtYXRjaFsxXS5sZW5ndGgpLmpvaW4oJzAnKSA6ICcnXG4gICAgICAgICAgaWYgKG51bWJlclN0ci5jaGFyQXQoMCkgPT09ICctJykge1xuICAgICAgICAgICAgbnVtYmVyU3RyID0gJy0nICsgYmFzZVN0ciArIHplcm9QYWRkaW5nICsgbnVtYmVyU3RyLnN1YnN0cigxKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbnVtYmVyU3RyID0gYmFzZVN0ciArIHplcm9QYWRkaW5nICsgbnVtYmVyU3RyO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgZnJvbSA9IG5ldyBQb3MoY3VyLmxpbmUsIHN0YXJ0KTtcbiAgICAgICAgICB2YXIgdG8gPSBuZXcgUG9zKGN1ci5saW5lLCBlbmQpO1xuICAgICAgICAgIGNtLnJlcGxhY2VSYW5nZShudW1iZXJTdHIsIGZyb20sIHRvKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY20uc2V0Q3Vyc29yKG5ldyBQb3MoY3VyLmxpbmUsIHN0YXJ0ICsgbnVtYmVyU3RyLmxlbmd0aCAtIDEpKTtcbiAgICAgIH0sXG4gICAgICByZXBlYXRMYXN0RWRpdDogZnVuY3Rpb24oY20sIGFjdGlvbkFyZ3MsIHZpbSkge1xuICAgICAgICB2YXIgbGFzdEVkaXRJbnB1dFN0YXRlID0gdmltLmxhc3RFZGl0SW5wdXRTdGF0ZTtcbiAgICAgICAgaWYgKCFsYXN0RWRpdElucHV0U3RhdGUpIHsgcmV0dXJuOyB9XG4gICAgICAgIHZhciByZXBlYXQgPSBhY3Rpb25BcmdzLnJlcGVhdDtcbiAgICAgICAgaWYgKHJlcGVhdCAmJiBhY3Rpb25BcmdzLnJlcGVhdElzRXhwbGljaXQpIHtcbiAgICAgICAgICB2aW0ubGFzdEVkaXRJbnB1dFN0YXRlLnJlcGVhdE92ZXJyaWRlID0gcmVwZWF0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlcGVhdCA9IHZpbS5sYXN0RWRpdElucHV0U3RhdGUucmVwZWF0T3ZlcnJpZGUgfHwgcmVwZWF0O1xuICAgICAgICB9XG4gICAgICAgIHJlcGVhdExhc3RFZGl0KGNtLCB2aW0sIHJlcGVhdCwgZmFsc2UgLyoqIHJlcGVhdEZvckluc2VydCAqLyk7XG4gICAgICB9LFxuICAgICAgaW5kZW50OiBmdW5jdGlvbihjbSwgYWN0aW9uQXJncykge1xuICAgICAgICBjbS5pbmRlbnRMaW5lKGNtLmdldEN1cnNvcigpLmxpbmUsIGFjdGlvbkFyZ3MuaW5kZW50UmlnaHQpO1xuICAgICAgfSxcbiAgICAgIGV4aXRJbnNlcnRNb2RlOiBleGl0SW5zZXJ0TW9kZVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBkZWZpbmVBY3Rpb24obmFtZSwgZm4pIHtcbiAgICAgIGFjdGlvbnNbbmFtZV0gPSBmbjtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIEJlbG93IGFyZSBtaXNjZWxsYW5lb3VzIHV0aWxpdHkgZnVuY3Rpb25zIHVzZWQgYnkgdmltLmpzXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBDbGlwcyBjdXJzb3IgdG8gZW5zdXJlIHRoYXQgbGluZSBpcyB3aXRoaW4gdGhlIGJ1ZmZlcidzIHJhbmdlXG4gICAgICogYW5kIGlzIG5vdCBpbnNpZGUgc3Vycm9nYXRlIHBhaXJcbiAgICAgKiBJZiBpbmNsdWRlTGluZUJyZWFrIGlzIHRydWUsIHRoZW4gYWxsb3cgY3VyLmNoID09IGxpbmVMZW5ndGguXG4gICAgICovXG4gICAgZnVuY3Rpb24gY2xpcEN1cnNvclRvQ29udGVudChjbSwgY3VyLCBvbGRDdXIpIHtcbiAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICB2YXIgaW5jbHVkZUxpbmVCcmVhayA9IHZpbS5pbnNlcnRNb2RlIHx8IHZpbS52aXN1YWxNb2RlO1xuICAgICAgdmFyIGxpbmUgPSBNYXRoLm1pbihNYXRoLm1heChjbS5maXJzdExpbmUoKSwgY3VyLmxpbmUpLCBjbS5sYXN0TGluZSgpICk7XG4gICAgICB2YXIgdGV4dCA9IGNtLmdldExpbmUobGluZSk7XG4gICAgICB2YXIgbWF4Q2ggPSB0ZXh0Lmxlbmd0aCAtIDEgKyAhIWluY2x1ZGVMaW5lQnJlYWs7XG4gICAgICB2YXIgY2ggPSBNYXRoLm1pbihNYXRoLm1heCgwLCBjdXIuY2gpLCBtYXhDaCk7XG4gICAgICAvLyBwcmV2ZW50IGN1cnNvciBmcm9tIGVudGVyaW5nIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICB2YXIgY2hhckNvZGUgPSB0ZXh0LmNoYXJDb2RlQXQoY2gpO1xuICAgICAgaWYgKDB4REMwMCA8IGNoYXJDb2RlICYmIGNoYXJDb2RlIDwweERGRkYpIHtcbiAgICAgICAgdmFyIGRpcmVjdGlvbiA9IDE7XG4gICAgICAgIGlmIChvbGRDdXIgJiYgb2xkQ3VyLmxpbmUgPT0gbGluZSkge1xuICAgICAgICAgIGlmIChvbGRDdXIuY2ggPiBjaCkge1xuICAgICAgICAgICAgZGlyZWN0aW9uID0gLTE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNoICs9ZGlyZWN0aW9uO1xuICAgICAgICBpZiAoY2ggPiBtYXhDaCkgY2ggLT0yO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBQb3MobGluZSwgY2gpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb3B5QXJncyhhcmdzKSB7XG4gICAgICB2YXIgcmV0ID0ge307XG4gICAgICBmb3IgKHZhciBwcm9wIGluIGFyZ3MpIHtcbiAgICAgICAgaWYgKGFyZ3MuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICByZXRbcHJvcF0gPSBhcmdzW3Byb3BdO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBvZmZzZXRDdXJzb3IoY3VyLCBvZmZzZXRMaW5lLCBvZmZzZXRDaCkge1xuICAgICAgaWYgKHR5cGVvZiBvZmZzZXRMaW5lID09PSAnb2JqZWN0Jykge1xuICAgICAgICBvZmZzZXRDaCA9IG9mZnNldExpbmUuY2g7XG4gICAgICAgIG9mZnNldExpbmUgPSBvZmZzZXRMaW5lLmxpbmU7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFBvcyhjdXIubGluZSArIG9mZnNldExpbmUsIGN1ci5jaCArIG9mZnNldENoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY29tbWFuZE1hdGNoZXMoa2V5cywga2V5TWFwLCBjb250ZXh0LCBpbnB1dFN0YXRlKSB7XG4gICAgICAvLyBQYXJ0aWFsIG1hdGNoZXMgYXJlIG5vdCBhcHBsaWVkLiBUaGV5IGluZm9ybSB0aGUga2V5IGhhbmRsZXJcbiAgICAgIC8vIHRoYXQgdGhlIGN1cnJlbnQga2V5IHNlcXVlbmNlIGlzIGEgc3Vic2VxdWVuY2Ugb2YgYSB2YWxpZCBrZXlcbiAgICAgIC8vIHNlcXVlbmNlLCBzbyB0aGF0IHRoZSBrZXkgYnVmZmVyIGlzIG5vdCBjbGVhcmVkLlxuICAgICAgdmFyIG1hdGNoLCBwYXJ0aWFsID0gW10sIGZ1bGwgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5TWFwLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjb21tYW5kID0ga2V5TWFwW2ldO1xuICAgICAgICBpZiAoY29udGV4dCA9PSAnaW5zZXJ0JyAmJiBjb21tYW5kLmNvbnRleHQgIT0gJ2luc2VydCcgfHxcbiAgICAgICAgICAgIGNvbW1hbmQuY29udGV4dCAmJiBjb21tYW5kLmNvbnRleHQgIT0gY29udGV4dCB8fFxuICAgICAgICAgICAgaW5wdXRTdGF0ZS5vcGVyYXRvciAmJiBjb21tYW5kLnR5cGUgPT0gJ2FjdGlvbicgfHxcbiAgICAgICAgICAgICEobWF0Y2ggPSBjb21tYW5kTWF0Y2goa2V5cywgY29tbWFuZC5rZXlzKSkpIHsgY29udGludWU7IH1cbiAgICAgICAgaWYgKG1hdGNoID09ICdwYXJ0aWFsJykgeyBwYXJ0aWFsLnB1c2goY29tbWFuZCk7IH1cbiAgICAgICAgaWYgKG1hdGNoID09ICdmdWxsJykgeyBmdWxsLnB1c2goY29tbWFuZCk7IH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBhcnRpYWw6IHBhcnRpYWwubGVuZ3RoICYmIHBhcnRpYWwsXG4gICAgICAgIGZ1bGw6IGZ1bGwubGVuZ3RoICYmIGZ1bGxcbiAgICAgIH07XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNvbW1hbmRNYXRjaChwcmVzc2VkLCBtYXBwZWQpIHtcbiAgICAgIGlmIChtYXBwZWQuc2xpY2UoLTExKSA9PSAnPGNoYXJhY3Rlcj4nKSB7XG4gICAgICAgIC8vIExhc3QgY2hhcmFjdGVyIG1hdGNoZXMgYW55dGhpbmcuXG4gICAgICAgIHZhciBwcmVmaXhMZW4gPSBtYXBwZWQubGVuZ3RoIC0gMTE7XG4gICAgICAgIHZhciBwcmVzc2VkUHJlZml4ID0gcHJlc3NlZC5zbGljZSgwLCBwcmVmaXhMZW4pO1xuICAgICAgICB2YXIgbWFwcGVkUHJlZml4ID0gbWFwcGVkLnNsaWNlKDAsIHByZWZpeExlbik7XG4gICAgICAgIHJldHVybiBwcmVzc2VkUHJlZml4ID09IG1hcHBlZFByZWZpeCAmJiBwcmVzc2VkLmxlbmd0aCA+IHByZWZpeExlbiA/ICdmdWxsJyA6XG4gICAgICAgICAgICAgICBtYXBwZWRQcmVmaXguaW5kZXhPZihwcmVzc2VkUHJlZml4KSA9PSAwID8gJ3BhcnRpYWwnIDogZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcHJlc3NlZCA9PSBtYXBwZWQgPyAnZnVsbCcgOlxuICAgICAgICAgICAgICAgbWFwcGVkLmluZGV4T2YocHJlc3NlZCkgPT0gMCA/ICdwYXJ0aWFsJyA6IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBmdW5jdGlvbiBsYXN0Q2hhcihrZXlzKSB7XG4gICAgICB2YXIgbWF0Y2ggPSAvXi4qKDxbXj5dKz4pJC8uZXhlYyhrZXlzKTtcbiAgICAgIHZhciBzZWxlY3RlZENoYXJhY3RlciA9IG1hdGNoID8gbWF0Y2hbMV0gOiBrZXlzLnNsaWNlKC0xKTtcbiAgICAgIGlmIChzZWxlY3RlZENoYXJhY3Rlci5sZW5ndGggPiAxKXtcbiAgICAgICAgc3dpdGNoKHNlbGVjdGVkQ2hhcmFjdGVyKXtcbiAgICAgICAgICBjYXNlICc8Q1I+JzpcbiAgICAgICAgICAgIHNlbGVjdGVkQ2hhcmFjdGVyPSdcXG4nO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnPFNwYWNlPic6XG4gICAgICAgICAgICBzZWxlY3RlZENoYXJhY3Rlcj0nICc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgc2VsZWN0ZWRDaGFyYWN0ZXI9Jyc7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGVjdGVkQ2hhcmFjdGVyO1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXBlYXRGbihjbSwgZm4sIHJlcGVhdCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcGVhdDsgaSsrKSB7XG4gICAgICAgICAgZm4oY20pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBjb3B5Q3Vyc29yKGN1cikge1xuICAgICAgcmV0dXJuIG5ldyBQb3MoY3VyLmxpbmUsIGN1ci5jaCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGN1cnNvckVxdWFsKGN1cjEsIGN1cjIpIHtcbiAgICAgIHJldHVybiBjdXIxLmNoID09IGN1cjIuY2ggJiYgY3VyMS5saW5lID09IGN1cjIubGluZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3Vyc29ySXNCZWZvcmUoY3VyMSwgY3VyMikge1xuICAgICAgaWYgKGN1cjEubGluZSA8IGN1cjIubGluZSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXIxLmxpbmUgPT0gY3VyMi5saW5lICYmIGN1cjEuY2ggPCBjdXIyLmNoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjdXJzb3JNaW4oY3VyMSwgY3VyMikge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKSB7XG4gICAgICAgIGN1cjIgPSBjdXJzb3JNaW4uYXBwbHkodW5kZWZpbmVkLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXJzb3JJc0JlZm9yZShjdXIxLCBjdXIyKSA/IGN1cjEgOiBjdXIyO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjdXJzb3JNYXgoY3VyMSwgY3VyMikge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAyKSB7XG4gICAgICAgIGN1cjIgPSBjdXJzb3JNYXguYXBwbHkodW5kZWZpbmVkLCBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjdXJzb3JJc0JlZm9yZShjdXIxLCBjdXIyKSA/IGN1cjIgOiBjdXIxO1xuICAgIH1cbiAgICBmdW5jdGlvbiBjdXJzb3JJc0JldHdlZW4oY3VyMSwgY3VyMiwgY3VyMykge1xuICAgICAgLy8gcmV0dXJucyB0cnVlIGlmIGN1cjIgaXMgYmV0d2VlbiBjdXIxIGFuZCBjdXIzLlxuICAgICAgdmFyIGN1cjFiZWZvcmUyID0gY3Vyc29ySXNCZWZvcmUoY3VyMSwgY3VyMik7XG4gICAgICB2YXIgY3VyMmJlZm9yZTMgPSBjdXJzb3JJc0JlZm9yZShjdXIyLCBjdXIzKTtcbiAgICAgIHJldHVybiBjdXIxYmVmb3JlMiAmJiBjdXIyYmVmb3JlMztcbiAgICB9XG4gICAgZnVuY3Rpb24gbGluZUxlbmd0aChjbSwgbGluZU51bSkge1xuICAgICAgcmV0dXJuIGNtLmdldExpbmUobGluZU51bSkubGVuZ3RoO1xuICAgIH1cbiAgICBmdW5jdGlvbiB0cmltKHMpIHtcbiAgICAgIGlmIChzLnRyaW0pIHtcbiAgICAgICAgcmV0dXJuIHMudHJpbSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHMucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBlc2NhcGVSZWdleChzKSB7XG4gICAgICByZXR1cm4gcy5yZXBsYWNlKC8oWy4/KiskXFxbXFxdXFwvXFxcXCgpe318XFwtXSkvZywgJ1xcXFwkMScpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBleHRlbmRMaW5lVG9Db2x1bW4oY20sIGxpbmVOdW0sIGNvbHVtbikge1xuICAgICAgdmFyIGVuZENoID0gbGluZUxlbmd0aChjbSwgbGluZU51bSk7XG4gICAgICB2YXIgc3BhY2VzID0gbmV3IEFycmF5KGNvbHVtbi1lbmRDaCsxKS5qb2luKCcgJyk7XG4gICAgICBjbS5zZXRDdXJzb3IobmV3IFBvcyhsaW5lTnVtLCBlbmRDaCkpO1xuICAgICAgY20ucmVwbGFjZVJhbmdlKHNwYWNlcywgY20uZ2V0Q3Vyc29yKCkpO1xuICAgIH1cbiAgICAvLyBUaGlzIGZ1bmN0aW9ucyBzZWxlY3RzIGEgcmVjdGFuZ3VsYXIgYmxvY2tcbiAgICAvLyBvZiB0ZXh0IHdpdGggc2VsZWN0aW9uRW5kIGFzIGFueSBvZiBpdHMgY29ybmVyXG4gICAgLy8gSGVpZ2h0IG9mIGJsb2NrOlxuICAgIC8vIERpZmZlcmVuY2UgaW4gc2VsZWN0aW9uRW5kLmxpbmUgYW5kIGZpcnN0L2xhc3Qgc2VsZWN0aW9uLmxpbmVcbiAgICAvLyBXaWR0aCBvZiB0aGUgYmxvY2s6XG4gICAgLy8gRGlzdGFuY2UgYmV0d2VlbiBzZWxlY3Rpb25FbmQuY2ggYW5kIGFueShmaXJzdCBjb25zaWRlcmVkIGhlcmUpIHNlbGVjdGlvbi5jaFxuICAgIGZ1bmN0aW9uIHNlbGVjdEJsb2NrKGNtLCBzZWxlY3Rpb25FbmQpIHtcbiAgICAgIHZhciBzZWxlY3Rpb25zID0gW10sIHJhbmdlcyA9IGNtLmxpc3RTZWxlY3Rpb25zKCk7XG4gICAgICB2YXIgaGVhZCA9IGNvcHlDdXJzb3IoY20uY2xpcFBvcyhzZWxlY3Rpb25FbmQpKTtcbiAgICAgIHZhciBpc0NsaXBwZWQgPSAhY3Vyc29yRXF1YWwoc2VsZWN0aW9uRW5kLCBoZWFkKTtcbiAgICAgIHZhciBjdXJIZWFkID0gY20uZ2V0Q3Vyc29yKCdoZWFkJyk7XG4gICAgICB2YXIgcHJpbUluZGV4ID0gZ2V0SW5kZXgocmFuZ2VzLCBjdXJIZWFkKTtcbiAgICAgIHZhciB3YXNDbGlwcGVkID0gY3Vyc29yRXF1YWwocmFuZ2VzW3ByaW1JbmRleF0uaGVhZCwgcmFuZ2VzW3ByaW1JbmRleF0uYW5jaG9yKTtcbiAgICAgIHZhciBtYXggPSByYW5nZXMubGVuZ3RoIC0gMTtcbiAgICAgIHZhciBpbmRleCA9IG1heCAtIHByaW1JbmRleCA+IHByaW1JbmRleCA/IG1heCA6IDA7XG4gICAgICB2YXIgYmFzZSA9IHJhbmdlc1tpbmRleF0uYW5jaG9yO1xuXG4gICAgICB2YXIgZmlyc3RMaW5lID0gTWF0aC5taW4oYmFzZS5saW5lLCBoZWFkLmxpbmUpO1xuICAgICAgdmFyIGxhc3RMaW5lID0gTWF0aC5tYXgoYmFzZS5saW5lLCBoZWFkLmxpbmUpO1xuICAgICAgdmFyIGJhc2VDaCA9IGJhc2UuY2gsIGhlYWRDaCA9IGhlYWQuY2g7XG5cbiAgICAgIHZhciBkaXIgPSByYW5nZXNbaW5kZXhdLmhlYWQuY2ggLSBiYXNlQ2g7XG4gICAgICB2YXIgbmV3RGlyID0gaGVhZENoIC0gYmFzZUNoO1xuICAgICAgaWYgKGRpciA+IDAgJiYgbmV3RGlyIDw9IDApIHtcbiAgICAgICAgYmFzZUNoKys7XG4gICAgICAgIGlmICghaXNDbGlwcGVkKSB7IGhlYWRDaC0tOyB9XG4gICAgICB9IGVsc2UgaWYgKGRpciA8IDAgJiYgbmV3RGlyID49IDApIHtcbiAgICAgICAgYmFzZUNoLS07XG4gICAgICAgIGlmICghd2FzQ2xpcHBlZCkgeyBoZWFkQ2grKzsgfVxuICAgICAgfSBlbHNlIGlmIChkaXIgPCAwICYmIG5ld0RpciA9PSAtMSkge1xuICAgICAgICBiYXNlQ2gtLTtcbiAgICAgICAgaGVhZENoKys7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBsaW5lID0gZmlyc3RMaW5lOyBsaW5lIDw9IGxhc3RMaW5lOyBsaW5lKyspIHtcbiAgICAgICAgdmFyIHJhbmdlID0ge2FuY2hvcjogbmV3IFBvcyhsaW5lLCBiYXNlQ2gpLCBoZWFkOiBuZXcgUG9zKGxpbmUsIGhlYWRDaCl9O1xuICAgICAgICBzZWxlY3Rpb25zLnB1c2gocmFuZ2UpO1xuICAgICAgfVxuICAgICAgY20uc2V0U2VsZWN0aW9ucyhzZWxlY3Rpb25zKTtcbiAgICAgIHNlbGVjdGlvbkVuZC5jaCA9IGhlYWRDaDtcbiAgICAgIGJhc2UuY2ggPSBiYXNlQ2g7XG4gICAgICByZXR1cm4gYmFzZTtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2VsZWN0Rm9ySW5zZXJ0KGNtLCBoZWFkLCBoZWlnaHQpIHtcbiAgICAgIHZhciBzZWwgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaGVpZ2h0OyBpKyspIHtcbiAgICAgICAgdmFyIGxpbmVIZWFkID0gb2Zmc2V0Q3Vyc29yKGhlYWQsIGksIDApO1xuICAgICAgICBzZWwucHVzaCh7YW5jaG9yOiBsaW5lSGVhZCwgaGVhZDogbGluZUhlYWR9KTtcbiAgICAgIH1cbiAgICAgIGNtLnNldFNlbGVjdGlvbnMoc2VsLCAwKTtcbiAgICB9XG4gICAgLy8gZ2V0SW5kZXggcmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGN1cnNvciBpbiB0aGUgc2VsZWN0aW9ucy5cbiAgICBmdW5jdGlvbiBnZXRJbmRleChyYW5nZXMsIGN1cnNvciwgZW5kKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhbmdlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYXRBbmNob3IgPSBlbmQgIT0gJ2hlYWQnICYmIGN1cnNvckVxdWFsKHJhbmdlc1tpXS5hbmNob3IsIGN1cnNvcik7XG4gICAgICAgIHZhciBhdEhlYWQgPSBlbmQgIT0gJ2FuY2hvcicgJiYgY3Vyc29yRXF1YWwocmFuZ2VzW2ldLmhlYWQsIGN1cnNvcik7XG4gICAgICAgIGlmIChhdEFuY2hvciB8fCBhdEhlYWQpIHtcbiAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRTZWxlY3RlZEFyZWFSYW5nZShjbSwgdmltKSB7XG4gICAgICB2YXIgbGFzdFNlbGVjdGlvbiA9IHZpbS5sYXN0U2VsZWN0aW9uO1xuICAgICAgdmFyIGdldEN1cnJlbnRTZWxlY3RlZEFyZWFSYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZWN0aW9ucyA9IGNtLmxpc3RTZWxlY3Rpb25zKCk7XG4gICAgICAgIHZhciBzdGFydCA9ICBzZWxlY3Rpb25zWzBdO1xuICAgICAgICB2YXIgZW5kID0gc2VsZWN0aW9uc1tzZWxlY3Rpb25zLmxlbmd0aC0xXTtcbiAgICAgICAgdmFyIHNlbGVjdGlvblN0YXJ0ID0gY3Vyc29ySXNCZWZvcmUoc3RhcnQuYW5jaG9yLCBzdGFydC5oZWFkKSA/IHN0YXJ0LmFuY2hvciA6IHN0YXJ0LmhlYWQ7XG4gICAgICAgIHZhciBzZWxlY3Rpb25FbmQgPSBjdXJzb3JJc0JlZm9yZShlbmQuYW5jaG9yLCBlbmQuaGVhZCkgPyBlbmQuaGVhZCA6IGVuZC5hbmNob3I7XG4gICAgICAgIHJldHVybiBbc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZF07XG4gICAgICB9O1xuICAgICAgdmFyIGdldExhc3RTZWxlY3RlZEFyZWFSYW5nZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZWN0aW9uU3RhcnQgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgICAgdmFyIHNlbGVjdGlvbkVuZCA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICB2YXIgYmxvY2sgPSBsYXN0U2VsZWN0aW9uLnZpc3VhbEJsb2NrO1xuICAgICAgICBpZiAoYmxvY2spIHtcbiAgICAgICAgICB2YXIgd2lkdGggPSBibG9jay53aWR0aDtcbiAgICAgICAgICB2YXIgaGVpZ2h0ID0gYmxvY2suaGVpZ2h0O1xuICAgICAgICAgIHNlbGVjdGlvbkVuZCA9IG5ldyBQb3Moc2VsZWN0aW9uU3RhcnQubGluZSArIGhlaWdodCwgc2VsZWN0aW9uU3RhcnQuY2ggKyB3aWR0aCk7XG4gICAgICAgICAgdmFyIHNlbGVjdGlvbnMgPSBbXTtcbiAgICAgICAgICAvLyBzZWxlY3RCbG9jayBjcmVhdGVzIGEgJ3Byb3BlcicgcmVjdGFuZ3VsYXIgYmxvY2suXG4gICAgICAgICAgLy8gV2UgZG8gbm90IHdhbnQgdGhhdCBpbiBhbGwgY2FzZXMsIHNvIHdlIG1hbnVhbGx5IHNldCBzZWxlY3Rpb25zLlxuICAgICAgICAgIGZvciAodmFyIGkgPSBzZWxlY3Rpb25TdGFydC5saW5lOyBpIDwgc2VsZWN0aW9uRW5kLmxpbmU7IGkrKykge1xuICAgICAgICAgICAgdmFyIGFuY2hvciA9IG5ldyBQb3MoaSwgc2VsZWN0aW9uU3RhcnQuY2gpO1xuICAgICAgICAgICAgdmFyIGhlYWQgPSBuZXcgUG9zKGksIHNlbGVjdGlvbkVuZC5jaCk7XG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSB7YW5jaG9yOiBhbmNob3IsIGhlYWQ6IGhlYWR9O1xuICAgICAgICAgICAgc2VsZWN0aW9ucy5wdXNoKHJhbmdlKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY20uc2V0U2VsZWN0aW9ucyhzZWxlY3Rpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgc3RhcnQgPSBsYXN0U2VsZWN0aW9uLmFuY2hvck1hcmsuZmluZCgpO1xuICAgICAgICAgIHZhciBlbmQgPSBsYXN0U2VsZWN0aW9uLmhlYWRNYXJrLmZpbmQoKTtcbiAgICAgICAgICB2YXIgbGluZSA9IGVuZC5saW5lIC0gc3RhcnQubGluZTtcbiAgICAgICAgICB2YXIgY2ggPSBlbmQuY2ggLSBzdGFydC5jaDtcbiAgICAgICAgICBzZWxlY3Rpb25FbmQgPSB7bGluZTogc2VsZWN0aW9uRW5kLmxpbmUgKyBsaW5lLCBjaDogbGluZSA/IHNlbGVjdGlvbkVuZC5jaCA6IGNoICsgc2VsZWN0aW9uRW5kLmNofTtcbiAgICAgICAgICBpZiAobGFzdFNlbGVjdGlvbi52aXN1YWxMaW5lKSB7XG4gICAgICAgICAgICBzZWxlY3Rpb25TdGFydCA9IG5ldyBQb3Moc2VsZWN0aW9uU3RhcnQubGluZSwgMCk7XG4gICAgICAgICAgICBzZWxlY3Rpb25FbmQgPSBuZXcgUG9zKHNlbGVjdGlvbkVuZC5saW5lLCBsaW5lTGVuZ3RoKGNtLCBzZWxlY3Rpb25FbmQubGluZSkpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjbS5zZXRTZWxlY3Rpb24oc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kXTtcbiAgICAgIH07XG4gICAgICBpZiAoIXZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAvLyBJbiBjYXNlIG9mIHJlcGxheWluZyB0aGUgYWN0aW9uLlxuICAgICAgICByZXR1cm4gZ2V0TGFzdFNlbGVjdGVkQXJlYVJhbmdlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZ2V0Q3VycmVudFNlbGVjdGVkQXJlYVJhbmdlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIFVwZGF0ZXMgdGhlIHByZXZpb3VzIHNlbGVjdGlvbiB3aXRoIHRoZSBjdXJyZW50IHNlbGVjdGlvbidzIHZhbHVlcy4gVGhpc1xuICAgIC8vIHNob3VsZCBvbmx5IGJlIGNhbGxlZCBpbiB2aXN1YWwgbW9kZS5cbiAgICBmdW5jdGlvbiB1cGRhdGVMYXN0U2VsZWN0aW9uKGNtLCB2aW0pIHtcbiAgICAgIHZhciBhbmNob3IgPSB2aW0uc2VsLmFuY2hvcjtcbiAgICAgIHZhciBoZWFkID0gdmltLnNlbC5oZWFkO1xuICAgICAgLy8gVG8gYWNjb21tb2RhdGUgdGhlIGVmZmVjdCBvZiBsYXN0UGFzdGVkVGV4dCBpbiB0aGUgbGFzdCBzZWxlY3Rpb25cbiAgICAgIGlmICh2aW0ubGFzdFBhc3RlZFRleHQpIHtcbiAgICAgICAgaGVhZCA9IGNtLnBvc0Zyb21JbmRleChjbS5pbmRleEZyb21Qb3MoYW5jaG9yKSArIHZpbS5sYXN0UGFzdGVkVGV4dC5sZW5ndGgpO1xuICAgICAgICB2aW0ubGFzdFBhc3RlZFRleHQgPSBudWxsO1xuICAgICAgfVxuICAgICAgdmltLmxhc3RTZWxlY3Rpb24gPSB7J2FuY2hvck1hcmsnOiBjbS5zZXRCb29rbWFyayhhbmNob3IpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2hlYWRNYXJrJzogY20uc2V0Qm9va21hcmsoaGVhZCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnYW5jaG9yJzogY29weUN1cnNvcihhbmNob3IpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2hlYWQnOiBjb3B5Q3Vyc29yKGhlYWQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3Zpc3VhbE1vZGUnOiB2aW0udmlzdWFsTW9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICd2aXN1YWxMaW5lJzogdmltLnZpc3VhbExpbmUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAndmlzdWFsQmxvY2snOiB2aW0udmlzdWFsQmxvY2t9O1xuICAgIH1cbiAgICBmdW5jdGlvbiBleHBhbmRTZWxlY3Rpb24oY20sIHN0YXJ0LCBlbmQpIHtcbiAgICAgIHZhciBzZWwgPSBjbS5zdGF0ZS52aW0uc2VsO1xuICAgICAgdmFyIGhlYWQgPSBzZWwuaGVhZDtcbiAgICAgIHZhciBhbmNob3IgPSBzZWwuYW5jaG9yO1xuICAgICAgdmFyIHRtcDtcbiAgICAgIGlmIChjdXJzb3JJc0JlZm9yZShlbmQsIHN0YXJ0KSkge1xuICAgICAgICB0bXAgPSBlbmQ7XG4gICAgICAgIGVuZCA9IHN0YXJ0O1xuICAgICAgICBzdGFydCA9IHRtcDtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJzb3JJc0JlZm9yZShoZWFkLCBhbmNob3IpKSB7XG4gICAgICAgIGhlYWQgPSBjdXJzb3JNaW4oc3RhcnQsIGhlYWQpO1xuICAgICAgICBhbmNob3IgPSBjdXJzb3JNYXgoYW5jaG9yLCBlbmQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYW5jaG9yID0gY3Vyc29yTWluKHN0YXJ0LCBhbmNob3IpO1xuICAgICAgICBoZWFkID0gY3Vyc29yTWF4KGhlYWQsIGVuZCk7XG4gICAgICAgIGhlYWQgPSBvZmZzZXRDdXJzb3IoaGVhZCwgMCwgLTEpO1xuICAgICAgICBpZiAoaGVhZC5jaCA9PSAtMSAmJiBoZWFkLmxpbmUgIT0gY20uZmlyc3RMaW5lKCkpIHtcbiAgICAgICAgICBoZWFkID0gbmV3IFBvcyhoZWFkLmxpbmUgLSAxLCBsaW5lTGVuZ3RoKGNtLCBoZWFkLmxpbmUgLSAxKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBbYW5jaG9yLCBoZWFkXTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgQ29kZU1pcnJvciBzZWxlY3Rpb24gdG8gbWF0Y2ggdGhlIHByb3ZpZGVkIHZpbSBzZWxlY3Rpb24uXG4gICAgICogSWYgbm8gYXJndW1lbnRzIGFyZSBnaXZlbiwgaXQgdXNlcyB0aGUgY3VycmVudCB2aW0gc2VsZWN0aW9uIHN0YXRlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHVwZGF0ZUNtU2VsZWN0aW9uKGNtLCBzZWwsIG1vZGUpIHtcbiAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICBzZWwgPSBzZWwgfHwgdmltLnNlbDtcbiAgICAgIHZhciBtb2RlID0gbW9kZSB8fFxuICAgICAgICB2aW0udmlzdWFsTGluZSA/ICdsaW5lJyA6IHZpbS52aXN1YWxCbG9jayA/ICdibG9jaycgOiAnY2hhcic7XG4gICAgICB2YXIgY21TZWwgPSBtYWtlQ21TZWxlY3Rpb24oY20sIHNlbCwgbW9kZSk7XG4gICAgICBjbS5zZXRTZWxlY3Rpb25zKGNtU2VsLnJhbmdlcywgY21TZWwucHJpbWFyeSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIG1ha2VDbVNlbGVjdGlvbihjbSwgc2VsLCBtb2RlLCBleGNsdXNpdmUpIHtcbiAgICAgIHZhciBoZWFkID0gY29weUN1cnNvcihzZWwuaGVhZCk7XG4gICAgICB2YXIgYW5jaG9yID0gY29weUN1cnNvcihzZWwuYW5jaG9yKTtcbiAgICAgIGlmIChtb2RlID09ICdjaGFyJykge1xuICAgICAgICB2YXIgaGVhZE9mZnNldCA9ICFleGNsdXNpdmUgJiYgIWN1cnNvcklzQmVmb3JlKHNlbC5oZWFkLCBzZWwuYW5jaG9yKSA/IDEgOiAwO1xuICAgICAgICB2YXIgYW5jaG9yT2Zmc2V0ID0gY3Vyc29ySXNCZWZvcmUoc2VsLmhlYWQsIHNlbC5hbmNob3IpID8gMSA6IDA7XG4gICAgICAgIGhlYWQgPSBvZmZzZXRDdXJzb3Ioc2VsLmhlYWQsIDAsIGhlYWRPZmZzZXQpO1xuICAgICAgICBhbmNob3IgPSBvZmZzZXRDdXJzb3Ioc2VsLmFuY2hvciwgMCwgYW5jaG9yT2Zmc2V0KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByYW5nZXM6IFt7YW5jaG9yOiBhbmNob3IsIGhlYWQ6IGhlYWR9XSxcbiAgICAgICAgICBwcmltYXJ5OiAwXG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKG1vZGUgPT0gJ2xpbmUnKSB7XG4gICAgICAgIGlmICghY3Vyc29ySXNCZWZvcmUoc2VsLmhlYWQsIHNlbC5hbmNob3IpKSB7XG4gICAgICAgICAgYW5jaG9yLmNoID0gMDtcblxuICAgICAgICAgIHZhciBsYXN0TGluZSA9IGNtLmxhc3RMaW5lKCk7XG4gICAgICAgICAgaWYgKGhlYWQubGluZSA+IGxhc3RMaW5lKSB7XG4gICAgICAgICAgICBoZWFkLmxpbmUgPSBsYXN0TGluZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaGVhZC5jaCA9IGxpbmVMZW5ndGgoY20sIGhlYWQubGluZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaGVhZC5jaCA9IDA7XG4gICAgICAgICAgYW5jaG9yLmNoID0gbGluZUxlbmd0aChjbSwgYW5jaG9yLmxpbmUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcmFuZ2VzOiBbe2FuY2hvcjogYW5jaG9yLCBoZWFkOiBoZWFkfV0sXG4gICAgICAgICAgcHJpbWFyeTogMFxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChtb2RlID09ICdibG9jaycpIHtcbiAgICAgICAgdmFyIHRvcCA9IE1hdGgubWluKGFuY2hvci5saW5lLCBoZWFkLmxpbmUpLFxuICAgICAgICAgICAgZnJvbUNoID0gYW5jaG9yLmNoLFxuICAgICAgICAgICAgYm90dG9tID0gTWF0aC5tYXgoYW5jaG9yLmxpbmUsIGhlYWQubGluZSksXG4gICAgICAgICAgICB0b0NoID0gaGVhZC5jaDtcbiAgICAgICAgaWYgKGZyb21DaCA8IHRvQ2gpIHsgdG9DaCArPSAxIH1cbiAgICAgICAgZWxzZSB7IGZyb21DaCArPSAxIH07XG4gICAgICAgIHZhciBoZWlnaHQgPSBib3R0b20gLSB0b3AgKyAxO1xuICAgICAgICB2YXIgcHJpbWFyeSA9IGhlYWQubGluZSA9PSB0b3AgPyAwIDogaGVpZ2h0IC0gMTtcbiAgICAgICAgdmFyIHJhbmdlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGhlaWdodDsgaSsrKSB7XG4gICAgICAgICAgcmFuZ2VzLnB1c2goe1xuICAgICAgICAgICAgYW5jaG9yOiBuZXcgUG9zKHRvcCArIGksIGZyb21DaCksXG4gICAgICAgICAgICBoZWFkOiBuZXcgUG9zKHRvcCArIGksIHRvQ2gpXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICByYW5nZXM6IHJhbmdlcyxcbiAgICAgICAgICBwcmltYXJ5OiBwcmltYXJ5XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEhlYWQoY20pIHtcbiAgICAgIHZhciBjdXIgPSBjbS5nZXRDdXJzb3IoJ2hlYWQnKTtcbiAgICAgIGlmIChjbS5nZXRTZWxlY3Rpb24oKS5sZW5ndGggPT0gMSkge1xuICAgICAgICAvLyBTbWFsbCBjb3JuZXIgY2FzZSB3aGVuIG9ubHkgMSBjaGFyYWN0ZXIgaXMgc2VsZWN0ZWQuIFRoZSBcInJlYWxcIlxuICAgICAgICAvLyBoZWFkIGlzIHRoZSBsZWZ0IG9mIGhlYWQgYW5kIGFuY2hvci5cbiAgICAgICAgY3VyID0gY3Vyc29yTWluKGN1ciwgY20uZ2V0Q3Vyc29yKCdhbmNob3InKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY3VyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIG1vdmVIZWFkIGlzIHNldCB0byBmYWxzZSwgdGhlIENvZGVNaXJyb3Igc2VsZWN0aW9uIHdpbGwgbm90IGJlXG4gICAgICogdG91Y2hlZC4gVGhlIGNhbGxlciBhc3N1bWVzIHRoZSByZXNwb25zaWJpbGl0eSBvZiBwdXR0aW5nIHRoZSBjdXJzb3JcbiAgICAqIGluIHRoZSByaWdodCBwbGFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBleGl0VmlzdWFsTW9kZShjbSwgbW92ZUhlYWQpIHtcbiAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICBpZiAobW92ZUhlYWQgIT09IGZhbHNlKSB7XG4gICAgICAgIGNtLnNldEN1cnNvcihjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCB2aW0uc2VsLmhlYWQpKTtcbiAgICAgIH1cbiAgICAgIHVwZGF0ZUxhc3RTZWxlY3Rpb24oY20sIHZpbSk7XG4gICAgICB2aW0udmlzdWFsTW9kZSA9IGZhbHNlO1xuICAgICAgdmltLnZpc3VhbExpbmUgPSBmYWxzZTtcbiAgICAgIHZpbS52aXN1YWxCbG9jayA9IGZhbHNlO1xuICAgICAgaWYgKCF2aW0uaW5zZXJ0TW9kZSkgQ29kZU1pcnJvci5zaWduYWwoY20sIFwidmltLW1vZGUtY2hhbmdlXCIsIHttb2RlOiBcIm5vcm1hbFwifSk7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFueSB0cmFpbGluZyBuZXdsaW5lcyBmcm9tIHRoZSBzZWxlY3Rpb24uIEZvclxuICAgIC8vIGV4YW1wbGUsIHdpdGggdGhlIGNhcmV0IGF0IHRoZSBzdGFydCBvZiB0aGUgbGFzdCB3b3JkIG9uIHRoZSBsaW5lLFxuICAgIC8vICdkdycgc2hvdWxkIHdvcmQsIGJ1dCBub3QgdGhlIG5ld2xpbmUsIHdoaWxlICd3JyBzaG91bGQgYWR2YW5jZSB0aGVcbiAgICAvLyBjYXJldCB0byB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIHRoZSBuZXh0IGxpbmUuXG4gICAgZnVuY3Rpb24gY2xpcFRvTGluZShjbSwgY3VyU3RhcnQsIGN1ckVuZCkge1xuICAgICAgdmFyIHNlbGVjdGlvbiA9IGNtLmdldFJhbmdlKGN1clN0YXJ0LCBjdXJFbmQpO1xuICAgICAgLy8gT25seSBjbGlwIGlmIHRoZSBzZWxlY3Rpb24gZW5kcyB3aXRoIHRyYWlsaW5nIG5ld2xpbmUgKyB3aGl0ZXNwYWNlXG4gICAgICBpZiAoL1xcblxccyokLy50ZXN0KHNlbGVjdGlvbikpIHtcbiAgICAgICAgdmFyIGxpbmVzID0gc2VsZWN0aW9uLnNwbGl0KCdcXG4nKTtcbiAgICAgICAgLy8gV2Uga25vdyB0aGlzIGlzIGFsbCB3aGl0ZXNwYWNlLlxuICAgICAgICBsaW5lcy5wb3AoKTtcblxuICAgICAgICAvLyBDYXNlczpcbiAgICAgICAgLy8gMS4gTGFzdCB3b3JkIGlzIGFuIGVtcHR5IGxpbmUgLSBkbyBub3QgY2xpcCB0aGUgdHJhaWxpbmcgJ1xcbidcbiAgICAgICAgLy8gMi4gTGFzdCB3b3JkIGlzIG5vdCBhbiBlbXB0eSBsaW5lIC0gY2xpcCB0aGUgdHJhaWxpbmcgJ1xcbidcbiAgICAgICAgdmFyIGxpbmU7XG4gICAgICAgIC8vIEZpbmQgdGhlIGxpbmUgY29udGFpbmluZyB0aGUgbGFzdCB3b3JkLCBhbmQgY2xpcCBhbGwgd2hpdGVzcGFjZSB1cFxuICAgICAgICAvLyB0byBpdC5cbiAgICAgICAgZm9yICh2YXIgbGluZSA9IGxpbmVzLnBvcCgpOyBsaW5lcy5sZW5ndGggPiAwICYmIGxpbmUgJiYgaXNXaGl0ZVNwYWNlU3RyaW5nKGxpbmUpOyBsaW5lID0gbGluZXMucG9wKCkpIHtcbiAgICAgICAgICBjdXJFbmQubGluZS0tO1xuICAgICAgICAgIGN1ckVuZC5jaCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIGxhc3Qgd29yZCBpcyBub3QgYW4gZW1wdHkgbGluZSwgY2xpcCBhbiBhZGRpdGlvbmFsIG5ld2xpbmVcbiAgICAgICAgaWYgKGxpbmUpIHtcbiAgICAgICAgICBjdXJFbmQubGluZS0tO1xuICAgICAgICAgIGN1ckVuZC5jaCA9IGxpbmVMZW5ndGgoY20sIGN1ckVuZC5saW5lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjdXJFbmQuY2ggPSAwO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRXhwYW5kIHRoZSBzZWxlY3Rpb24gdG8gbGluZSBlbmRzLlxuICAgIGZ1bmN0aW9uIGV4cGFuZFNlbGVjdGlvblRvTGluZShfY20sIGN1clN0YXJ0LCBjdXJFbmQpIHtcbiAgICAgIGN1clN0YXJ0LmNoID0gMDtcbiAgICAgIGN1ckVuZC5jaCA9IDA7XG4gICAgICBjdXJFbmQubGluZSsrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmRGaXJzdE5vbldoaXRlU3BhY2VDaGFyYWN0ZXIodGV4dCkge1xuICAgICAgaWYgKCF0ZXh0KSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuICAgICAgdmFyIGZpcnN0Tm9uV1MgPSB0ZXh0LnNlYXJjaCgvXFxTLyk7XG4gICAgICByZXR1cm4gZmlyc3ROb25XUyA9PSAtMSA/IHRleHQubGVuZ3RoIDogZmlyc3ROb25XUztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHBhbmRXb3JkVW5kZXJDdXJzb3IoY20sIGluY2x1c2l2ZSwgX2ZvcndhcmQsIGJpZ1dvcmQsIG5vU3ltYm9sKSB7XG4gICAgICB2YXIgY3VyID0gZ2V0SGVhZChjbSk7XG4gICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUoY3VyLmxpbmUpO1xuICAgICAgdmFyIGlkeCA9IGN1ci5jaDtcblxuICAgICAgLy8gU2VlayB0byBmaXJzdCB3b3JkIG9yIG5vbi13aGl0ZXNwYWNlIGNoYXJhY3RlciwgZGVwZW5kaW5nIG9uIGlmXG4gICAgICAvLyBub1N5bWJvbCBpcyB0cnVlLlxuICAgICAgdmFyIHRlc3QgPSBub1N5bWJvbCA/IHdvcmRDaGFyVGVzdFswXSA6IGJpZ1dvcmRDaGFyVGVzdCBbMF07XG4gICAgICB3aGlsZSAoIXRlc3QobGluZS5jaGFyQXQoaWR4KSkpIHtcbiAgICAgICAgaWR4Kys7XG4gICAgICAgIGlmIChpZHggPj0gbGluZS5sZW5ndGgpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgIH1cblxuICAgICAgaWYgKGJpZ1dvcmQpIHtcbiAgICAgICAgdGVzdCA9IGJpZ1dvcmRDaGFyVGVzdFswXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRlc3QgPSB3b3JkQ2hhclRlc3RbMF07XG4gICAgICAgIGlmICghdGVzdChsaW5lLmNoYXJBdChpZHgpKSkge1xuICAgICAgICAgIHRlc3QgPSB3b3JkQ2hhclRlc3RbMV07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGVuZCA9IGlkeCwgc3RhcnQgPSBpZHg7XG4gICAgICB3aGlsZSAodGVzdChsaW5lLmNoYXJBdChlbmQpKSAmJiBlbmQgPCBsaW5lLmxlbmd0aCkgeyBlbmQrKzsgfVxuICAgICAgd2hpbGUgKHRlc3QobGluZS5jaGFyQXQoc3RhcnQpKSAmJiBzdGFydCA+PSAwKSB7IHN0YXJ0LS07IH1cbiAgICAgIHN0YXJ0Kys7XG5cbiAgICAgIGlmIChpbmNsdXNpdmUpIHtcbiAgICAgICAgLy8gSWYgcHJlc2VudCwgaW5jbHVkZSBhbGwgd2hpdGVzcGFjZSBhZnRlciB3b3JkLlxuICAgICAgICAvLyBPdGhlcndpc2UsIGluY2x1ZGUgYWxsIHdoaXRlc3BhY2UgYmVmb3JlIHdvcmQsIGV4Y2VwdCBpbmRlbnRhdGlvbi5cbiAgICAgICAgdmFyIHdvcmRFbmQgPSBlbmQ7XG4gICAgICAgIHdoaWxlICgvXFxzLy50ZXN0KGxpbmUuY2hhckF0KGVuZCkpICYmIGVuZCA8IGxpbmUubGVuZ3RoKSB7IGVuZCsrOyB9XG4gICAgICAgIGlmICh3b3JkRW5kID09IGVuZCkge1xuICAgICAgICAgIHZhciB3b3JkU3RhcnQgPSBzdGFydDtcbiAgICAgICAgICB3aGlsZSAoL1xccy8udGVzdChsaW5lLmNoYXJBdChzdGFydCAtIDEpKSAmJiBzdGFydCA+IDApIHsgc3RhcnQtLTsgfVxuICAgICAgICAgIGlmICghc3RhcnQpIHsgc3RhcnQgPSB3b3JkU3RhcnQ7IH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHsgc3RhcnQ6IG5ldyBQb3MoY3VyLmxpbmUsIHN0YXJ0KSwgZW5kOiBuZXcgUG9zKGN1ci5saW5lLCBlbmQpIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVwZW5kcyBvbiB0aGUgZm9sbG93aW5nOlxuICAgICAqXG4gICAgICogLSBlZGl0b3IgbW9kZSBzaG91bGQgYmUgaHRtbG1peGVkbW9kZSAvIHhtbFxuICAgICAqIC0gbW9kZS94bWwveG1sLmpzIHNob3VsZCBiZSBsb2FkZWRcbiAgICAgKiAtIGFkZG9uL2ZvbGQveG1sLWZvbGQuanMgc2hvdWxkIGJlIGxvYWRlZFxuICAgICAqXG4gICAgICogSWYgYW55IG9mIHRoZSBhYm92ZSByZXF1aXJlbWVudHMgYXJlIG5vdCB0cnVlLCB0aGlzIGZ1bmN0aW9uIG5vb3BzLlxuICAgICAqXG4gICAgICogVGhpcyBpcyBfTk9UXyBhIDEwMCUgYWNjdXJhdGUgaW1wbGVtZW50YXRpb24gb2YgdmltIHRhZyB0ZXh0IG9iamVjdHMuXG4gICAgICogVGhlIGZvbGxvd2luZyBjYXZlYXRzIGFwcGx5IChiYXNlZCBvZmYgY3Vyc29yeSB0ZXN0aW5nLCBJJ20gc3VyZSB0aGVyZVxuICAgICAqIGFyZSBvdGhlciBkaXNjcmVwYW5jaWVzKTpcbiAgICAgKlxuICAgICAqIC0gRG9lcyBub3Qgd29yayBpbnNpZGUgY29tbWVudHM6XG4gICAgICogICBgYGBcbiAgICAgKiAgIDwhLS0gPGRpdj5icm9rZW48L2Rpdj4gLS0+XG4gICAgICogICBgYGBcbiAgICAgKiAtIERvZXMgbm90IHdvcmsgd2hlbiB0YWdzIGhhdmUgZGlmZmVyZW50IGNhc2VzOlxuICAgICAqICAgYGBgXG4gICAgICogICA8ZGl2PmJyb2tlbjwvRElWPlxuICAgICAqICAgYGBgXG4gICAgICogLSBEb2VzIG5vdCB3b3JrIHdoZW4gY3Vyc29yIGlzIGluc2lkZSBhIGJyb2tlbiB0YWc6XG4gICAgICogICBgYGBcbiAgICAgKiAgIDxkaXY+PGJyb2s+PGVuPjwvZGl2PlxuICAgICAqICAgYGBgXG4gICAgICovXG4gICAgZnVuY3Rpb24gZXhwYW5kVGFnVW5kZXJDdXJzb3IoY20sIGhlYWQsIGluY2x1c2l2ZSkge1xuICAgICAgdmFyIGN1ciA9IGhlYWQ7XG4gICAgICBpZiAoIUNvZGVNaXJyb3IuZmluZE1hdGNoaW5nVGFnIHx8ICFDb2RlTWlycm9yLmZpbmRFbmNsb3NpbmdUYWcpIHtcbiAgICAgICAgcmV0dXJuIHsgc3RhcnQ6IGN1ciwgZW5kOiBjdXIgfTtcbiAgICAgIH1cblxuICAgICAgdmFyIHRhZ3MgPSBDb2RlTWlycm9yLmZpbmRNYXRjaGluZ1RhZyhjbSwgaGVhZCkgfHwgQ29kZU1pcnJvci5maW5kRW5jbG9zaW5nVGFnKGNtLCBoZWFkKTtcbiAgICAgIGlmICghdGFncyB8fCAhdGFncy5vcGVuIHx8ICF0YWdzLmNsb3NlKSB7XG4gICAgICAgIHJldHVybiB7IHN0YXJ0OiBjdXIsIGVuZDogY3VyIH07XG4gICAgICB9XG5cbiAgICAgIGlmIChpbmNsdXNpdmUpIHtcbiAgICAgICAgcmV0dXJuIHsgc3RhcnQ6IHRhZ3Mub3Blbi5mcm9tLCBlbmQ6IHRhZ3MuY2xvc2UudG8gfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IHN0YXJ0OiB0YWdzLm9wZW4udG8sIGVuZDogdGFncy5jbG9zZS5mcm9tIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVjb3JkSnVtcFBvc2l0aW9uKGNtLCBvbGRDdXIsIG5ld0N1cikge1xuICAgICAgaWYgKCFjdXJzb3JFcXVhbChvbGRDdXIsIG5ld0N1cikpIHtcbiAgICAgICAgdmltR2xvYmFsU3RhdGUuanVtcExpc3QuYWRkKGNtLCBvbGRDdXIsIG5ld0N1cik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVjb3JkTGFzdENoYXJhY3RlclNlYXJjaChpbmNyZW1lbnQsIGFyZ3MpIHtcbiAgICAgICAgdmltR2xvYmFsU3RhdGUubGFzdENoYXJhY3RlclNlYXJjaC5pbmNyZW1lbnQgPSBpbmNyZW1lbnQ7XG4gICAgICAgIHZpbUdsb2JhbFN0YXRlLmxhc3RDaGFyYWN0ZXJTZWFyY2guZm9yd2FyZCA9IGFyZ3MuZm9yd2FyZDtcbiAgICAgICAgdmltR2xvYmFsU3RhdGUubGFzdENoYXJhY3RlclNlYXJjaC5zZWxlY3RlZENoYXJhY3RlciA9IGFyZ3Muc2VsZWN0ZWRDaGFyYWN0ZXI7XG4gICAgfVxuXG4gICAgdmFyIHN5bWJvbFRvTW9kZSA9IHtcbiAgICAgICAgJygnOiAnYnJhY2tldCcsICcpJzogJ2JyYWNrZXQnLCAneyc6ICdicmFja2V0JywgJ30nOiAnYnJhY2tldCcsXG4gICAgICAgICdbJzogJ3NlY3Rpb24nLCAnXSc6ICdzZWN0aW9uJyxcbiAgICAgICAgJyonOiAnY29tbWVudCcsICcvJzogJ2NvbW1lbnQnLFxuICAgICAgICAnbSc6ICdtZXRob2QnLCAnTSc6ICdtZXRob2QnLFxuICAgICAgICAnIyc6ICdwcmVwcm9jZXNzJ1xuICAgIH07XG4gICAgdmFyIGZpbmRTeW1ib2xNb2RlcyA9IHtcbiAgICAgIGJyYWNrZXQ6IHtcbiAgICAgICAgaXNDb21wbGV0ZTogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgICBpZiAoc3RhdGUubmV4dENoID09PSBzdGF0ZS5zeW1iKSB7XG4gICAgICAgICAgICBzdGF0ZS5kZXB0aCsrO1xuICAgICAgICAgICAgaWYgKHN0YXRlLmRlcHRoID49IDEpcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIGlmIChzdGF0ZS5uZXh0Q2ggPT09IHN0YXRlLnJldmVyc2VTeW1iKSB7XG4gICAgICAgICAgICBzdGF0ZS5kZXB0aC0tO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZWN0aW9uOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgc3RhdGUuY3VyTW92ZVRocm91Z2ggPSB0cnVlO1xuICAgICAgICAgIHN0YXRlLnN5bWIgPSAoc3RhdGUuZm9yd2FyZCA/ICddJyA6ICdbJykgPT09IHN0YXRlLnN5bWIgPyAneycgOiAnfSc7XG4gICAgICAgIH0sXG4gICAgICAgIGlzQ29tcGxldGU6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgcmV0dXJuIHN0YXRlLmluZGV4ID09PSAwICYmIHN0YXRlLm5leHRDaCA9PT0gc3RhdGUuc3ltYjtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGNvbW1lbnQ6IHtcbiAgICAgICAgaXNDb21wbGV0ZTogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgICB2YXIgZm91bmQgPSBzdGF0ZS5sYXN0Q2ggPT09ICcqJyAmJiBzdGF0ZS5uZXh0Q2ggPT09ICcvJztcbiAgICAgICAgICBzdGF0ZS5sYXN0Q2ggPSBzdGF0ZS5uZXh0Q2g7XG4gICAgICAgICAgcmV0dXJuIGZvdW5kO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgLy8gVE9ETzogVGhlIG9yaWdpbmFsIFZpbSBpbXBsZW1lbnRhdGlvbiBvbmx5IG9wZXJhdGVzIG9uIGxldmVsIDEgYW5kIDIuXG4gICAgICAvLyBUaGUgY3VycmVudCBpbXBsZW1lbnRhdGlvbiBkb2Vzbid0IGNoZWNrIGZvciBjb2RlIGJsb2NrIGxldmVsIGFuZFxuICAgICAgLy8gdGhlcmVmb3JlIGl0IG9wZXJhdGVzIG9uIGFueSBsZXZlbHMuXG4gICAgICBtZXRob2Q6IHtcbiAgICAgICAgaW5pdDogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgICBzdGF0ZS5zeW1iID0gKHN0YXRlLnN5bWIgPT09ICdtJyA/ICd7JyA6ICd9Jyk7XG4gICAgICAgICAgc3RhdGUucmV2ZXJzZVN5bWIgPSBzdGF0ZS5zeW1iID09PSAneycgPyAnfScgOiAneyc7XG4gICAgICAgIH0sXG4gICAgICAgIGlzQ29tcGxldGU6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgaWYgKHN0YXRlLm5leHRDaCA9PT0gc3RhdGUuc3ltYilyZXR1cm4gdHJ1ZTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBwcmVwcm9jZXNzOiB7XG4gICAgICAgIGluaXQ6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgc3RhdGUuaW5kZXggPSAwO1xuICAgICAgICB9LFxuICAgICAgICBpc0NvbXBsZXRlOiBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgICAgIGlmIChzdGF0ZS5uZXh0Q2ggPT09ICcjJykge1xuICAgICAgICAgICAgdmFyIHRva2VuID0gc3RhdGUubGluZVRleHQubWF0Y2goL14jKFxcdyspLylbMV07XG4gICAgICAgICAgICBpZiAodG9rZW4gPT09ICdlbmRpZicpIHtcbiAgICAgICAgICAgICAgaWYgKHN0YXRlLmZvcndhcmQgJiYgc3RhdGUuZGVwdGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzdGF0ZS5kZXB0aCsrO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbiA9PT0gJ2lmJykge1xuICAgICAgICAgICAgICBpZiAoIXN0YXRlLmZvcndhcmQgJiYgc3RhdGUuZGVwdGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBzdGF0ZS5kZXB0aC0tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRva2VuID09PSAnZWxzZScgJiYgc3RhdGUuZGVwdGggPT09IDApcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gICAgZnVuY3Rpb24gZmluZFN5bWJvbChjbSwgcmVwZWF0LCBmb3J3YXJkLCBzeW1iKSB7XG4gICAgICB2YXIgY3VyID0gY29weUN1cnNvcihjbS5nZXRDdXJzb3IoKSk7XG4gICAgICB2YXIgaW5jcmVtZW50ID0gZm9yd2FyZCA/IDEgOiAtMTtcbiAgICAgIHZhciBlbmRMaW5lID0gZm9yd2FyZCA/IGNtLmxpbmVDb3VudCgpIDogLTE7XG4gICAgICB2YXIgY3VyQ2ggPSBjdXIuY2g7XG4gICAgICB2YXIgbGluZSA9IGN1ci5saW5lO1xuICAgICAgdmFyIGxpbmVUZXh0ID0gY20uZ2V0TGluZShsaW5lKTtcbiAgICAgIHZhciBzdGF0ZSA9IHtcbiAgICAgICAgbGluZVRleHQ6IGxpbmVUZXh0LFxuICAgICAgICBuZXh0Q2g6IGxpbmVUZXh0LmNoYXJBdChjdXJDaCksXG4gICAgICAgIGxhc3RDaDogbnVsbCxcbiAgICAgICAgaW5kZXg6IGN1ckNoLFxuICAgICAgICBzeW1iOiBzeW1iLFxuICAgICAgICByZXZlcnNlU3ltYjogKGZvcndhcmQgPyAgeyAnKSc6ICcoJywgJ30nOiAneycgfSA6IHsgJygnOiAnKScsICd7JzogJ30nIH0pW3N5bWJdLFxuICAgICAgICBmb3J3YXJkOiBmb3J3YXJkLFxuICAgICAgICBkZXB0aDogMCxcbiAgICAgICAgY3VyTW92ZVRocm91Z2g6IGZhbHNlXG4gICAgICB9O1xuICAgICAgdmFyIG1vZGUgPSBzeW1ib2xUb01vZGVbc3ltYl07XG4gICAgICBpZiAoIW1vZGUpcmV0dXJuIGN1cjtcbiAgICAgIHZhciBpbml0ID0gZmluZFN5bWJvbE1vZGVzW21vZGVdLmluaXQ7XG4gICAgICB2YXIgaXNDb21wbGV0ZSA9IGZpbmRTeW1ib2xNb2Rlc1ttb2RlXS5pc0NvbXBsZXRlO1xuICAgICAgaWYgKGluaXQpIHsgaW5pdChzdGF0ZSk7IH1cbiAgICAgIHdoaWxlIChsaW5lICE9PSBlbmRMaW5lICYmIHJlcGVhdCkge1xuICAgICAgICBzdGF0ZS5pbmRleCArPSBpbmNyZW1lbnQ7XG4gICAgICAgIHN0YXRlLm5leHRDaCA9IHN0YXRlLmxpbmVUZXh0LmNoYXJBdChzdGF0ZS5pbmRleCk7XG4gICAgICAgIGlmICghc3RhdGUubmV4dENoKSB7XG4gICAgICAgICAgbGluZSArPSBpbmNyZW1lbnQ7XG4gICAgICAgICAgc3RhdGUubGluZVRleHQgPSBjbS5nZXRMaW5lKGxpbmUpIHx8ICcnO1xuICAgICAgICAgIGlmIChpbmNyZW1lbnQgPiAwKSB7XG4gICAgICAgICAgICBzdGF0ZS5pbmRleCA9IDA7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBsaW5lTGVuID0gc3RhdGUubGluZVRleHQubGVuZ3RoO1xuICAgICAgICAgICAgc3RhdGUuaW5kZXggPSAobGluZUxlbiA+IDApID8gKGxpbmVMZW4tMSkgOiAwO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzdGF0ZS5uZXh0Q2ggPSBzdGF0ZS5saW5lVGV4dC5jaGFyQXQoc3RhdGUuaW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0NvbXBsZXRlKHN0YXRlKSkge1xuICAgICAgICAgIGN1ci5saW5lID0gbGluZTtcbiAgICAgICAgICBjdXIuY2ggPSBzdGF0ZS5pbmRleDtcbiAgICAgICAgICByZXBlYXQtLTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN0YXRlLm5leHRDaCB8fCBzdGF0ZS5jdXJNb3ZlVGhyb3VnaCkge1xuICAgICAgICByZXR1cm4gbmV3IFBvcyhsaW5lLCBzdGF0ZS5pbmRleCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gY3VyO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogUmV0dXJucyB0aGUgYm91bmRhcmllcyBvZiB0aGUgbmV4dCB3b3JkLiBJZiB0aGUgY3Vyc29yIGluIHRoZSBtaWRkbGUgb2ZcbiAgICAgKiB0aGUgd29yZCwgdGhlbiByZXR1cm5zIHRoZSBib3VuZGFyaWVzIG9mIHRoZSBjdXJyZW50IHdvcmQsIHN0YXJ0aW5nIGF0XG4gICAgICogdGhlIGN1cnNvci4gSWYgdGhlIGN1cnNvciBpcyBhdCB0aGUgc3RhcnQvZW5kIG9mIGEgd29yZCwgYW5kIHdlIGFyZSBnb2luZ1xuICAgICAqIGZvcndhcmQvYmFja3dhcmQsIHJlc3BlY3RpdmVseSwgZmluZCB0aGUgYm91bmRhcmllcyBvZiB0aGUgbmV4dCB3b3JkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtDb2RlTWlycm9yfSBjbSBDb2RlTWlycm9yIG9iamVjdC5cbiAgICAgKiBAcGFyYW0ge0N1cnNvcn0gY3VyIFRoZSBjdXJzb3IgcG9zaXRpb24uXG4gICAgICogQHBhcmFtIHtib29sZWFufSBmb3J3YXJkIFRydWUgdG8gc2VhcmNoIGZvcndhcmQuIEZhbHNlIHRvIHNlYXJjaFxuICAgICAqICAgICBiYWNrd2FyZC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGJpZ1dvcmQgVHJ1ZSBpZiBwdW5jdHVhdGlvbiBjb3VudCBhcyBwYXJ0IG9mIHRoZSB3b3JkLlxuICAgICAqICAgICBGYWxzZSBpZiBvbmx5IFthLXpBLVowLTldIGNoYXJhY3RlcnMgY291bnQgYXMgcGFydCBvZiB0aGUgd29yZC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGVtcHR5TGluZUlzV29yZCBUcnVlIGlmIGVtcHR5IGxpbmVzIHNob3VsZCBiZSB0cmVhdGVkXG4gICAgICogICAgIGFzIHdvcmRzLlxuICAgICAqIEByZXR1cm4ge09iamVjdHtmcm9tOm51bWJlciwgdG86bnVtYmVyLCBsaW5lOiBudW1iZXJ9fSBUaGUgYm91bmRhcmllcyBvZlxuICAgICAqICAgICB0aGUgd29yZCwgb3IgbnVsbCBpZiB0aGVyZSBhcmUgbm8gbW9yZSB3b3Jkcy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBmaW5kV29yZChjbSwgY3VyLCBmb3J3YXJkLCBiaWdXb3JkLCBlbXB0eUxpbmVJc1dvcmQpIHtcbiAgICAgIHZhciBsaW5lTnVtID0gY3VyLmxpbmU7XG4gICAgICB2YXIgcG9zID0gY3VyLmNoO1xuICAgICAgdmFyIGxpbmUgPSBjbS5nZXRMaW5lKGxpbmVOdW0pO1xuICAgICAgdmFyIGRpciA9IGZvcndhcmQgPyAxIDogLTE7XG4gICAgICB2YXIgY2hhclRlc3RzID0gYmlnV29yZCA/IGJpZ1dvcmRDaGFyVGVzdDogd29yZENoYXJUZXN0O1xuXG4gICAgICBpZiAoZW1wdHlMaW5lSXNXb3JkICYmIGxpbmUgPT0gJycpIHtcbiAgICAgICAgbGluZU51bSArPSBkaXI7XG4gICAgICAgIGxpbmUgPSBjbS5nZXRMaW5lKGxpbmVOdW0pO1xuICAgICAgICBpZiAoIWlzTGluZShjbSwgbGluZU51bSkpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBwb3MgPSAoZm9yd2FyZCkgPyAwIDogbGluZS5sZW5ndGg7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgIGlmIChlbXB0eUxpbmVJc1dvcmQgJiYgbGluZSA9PSAnJykge1xuICAgICAgICAgIHJldHVybiB7IGZyb206IDAsIHRvOiAwLCBsaW5lOiBsaW5lTnVtIH07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0b3AgPSAoZGlyID4gMCkgPyBsaW5lLmxlbmd0aCA6IC0xO1xuICAgICAgICB2YXIgd29yZFN0YXJ0ID0gc3RvcCwgd29yZEVuZCA9IHN0b3A7XG4gICAgICAgIC8vIEZpbmQgYm91bmRzIG9mIG5leHQgd29yZC5cbiAgICAgICAgd2hpbGUgKHBvcyAhPSBzdG9wKSB7XG4gICAgICAgICAgdmFyIGZvdW5kV29yZCA9IGZhbHNlO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hhclRlc3RzLmxlbmd0aCAmJiAhZm91bmRXb3JkOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChjaGFyVGVzdHNbaV0obGluZS5jaGFyQXQocG9zKSkpIHtcbiAgICAgICAgICAgICAgd29yZFN0YXJ0ID0gcG9zO1xuICAgICAgICAgICAgICAvLyBBZHZhbmNlIHRvIGVuZCBvZiB3b3JkLlxuICAgICAgICAgICAgICB3aGlsZSAocG9zICE9IHN0b3AgJiYgY2hhclRlc3RzW2ldKGxpbmUuY2hhckF0KHBvcykpKSB7XG4gICAgICAgICAgICAgICAgcG9zICs9IGRpcjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB3b3JkRW5kID0gcG9zO1xuICAgICAgICAgICAgICBmb3VuZFdvcmQgPSB3b3JkU3RhcnQgIT0gd29yZEVuZDtcbiAgICAgICAgICAgICAgaWYgKHdvcmRTdGFydCA9PSBjdXIuY2ggJiYgbGluZU51bSA9PSBjdXIubGluZSAmJlxuICAgICAgICAgICAgICAgICAgd29yZEVuZCA9PSB3b3JkU3RhcnQgKyBkaXIpIHtcbiAgICAgICAgICAgICAgICAvLyBXZSBzdGFydGVkIGF0IHRoZSBlbmQgb2YgYSB3b3JkLiBGaW5kIHRoZSBuZXh0IG9uZS5cbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgZnJvbTogTWF0aC5taW4od29yZFN0YXJ0LCB3b3JkRW5kICsgMSksXG4gICAgICAgICAgICAgICAgICB0bzogTWF0aC5tYXgod29yZFN0YXJ0LCB3b3JkRW5kKSxcbiAgICAgICAgICAgICAgICAgIGxpbmU6IGxpbmVOdW0gfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWZvdW5kV29yZCkge1xuICAgICAgICAgICAgcG9zICs9IGRpcjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQWR2YW5jZSB0byBuZXh0L3ByZXYgbGluZS5cbiAgICAgICAgbGluZU51bSArPSBkaXI7XG4gICAgICAgIGlmICghaXNMaW5lKGNtLCBsaW5lTnVtKSkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxpbmUgPSBjbS5nZXRMaW5lKGxpbmVOdW0pO1xuICAgICAgICBwb3MgPSAoZGlyID4gMCkgPyAwIDogbGluZS5sZW5ndGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtDb2RlTWlycm9yfSBjbSBDb2RlTWlycm9yIG9iamVjdC5cbiAgICAgKiBAcGFyYW0ge1Bvc30gY3VyIFRoZSBwb3NpdGlvbiB0byBzdGFydCBmcm9tLlxuICAgICAqIEBwYXJhbSB7aW50fSByZXBlYXQgTnVtYmVyIG9mIHdvcmRzIHRvIG1vdmUgcGFzdC5cbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZvcndhcmQgVHJ1ZSB0byBzZWFyY2ggZm9yd2FyZC4gRmFsc2UgdG8gc2VhcmNoXG4gICAgICogICAgIGJhY2t3YXJkLlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gd29yZEVuZCBUcnVlIHRvIG1vdmUgdG8gZW5kIG9mIHdvcmQuIEZhbHNlIHRvIG1vdmUgdG9cbiAgICAgKiAgICAgYmVnaW5uaW5nIG9mIHdvcmQuXG4gICAgICogQHBhcmFtIHtib29sZWFufSBiaWdXb3JkIFRydWUgaWYgcHVuY3R1YXRpb24gY291bnQgYXMgcGFydCBvZiB0aGUgd29yZC5cbiAgICAgKiAgICAgRmFsc2UgaWYgb25seSBhbHBoYWJldCBjaGFyYWN0ZXJzIGNvdW50IGFzIHBhcnQgb2YgdGhlIHdvcmQuXG4gICAgICogQHJldHVybiB7Q3Vyc29yfSBUaGUgcG9zaXRpb24gdGhlIGN1cnNvciBzaG91bGQgbW92ZSB0by5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBtb3ZlVG9Xb3JkKGNtLCBjdXIsIHJlcGVhdCwgZm9yd2FyZCwgd29yZEVuZCwgYmlnV29yZCkge1xuICAgICAgdmFyIGN1clN0YXJ0ID0gY29weUN1cnNvcihjdXIpO1xuICAgICAgdmFyIHdvcmRzID0gW107XG4gICAgICBpZiAoZm9yd2FyZCAmJiAhd29yZEVuZCB8fCAhZm9yd2FyZCAmJiB3b3JkRW5kKSB7XG4gICAgICAgIHJlcGVhdCsrO1xuICAgICAgfVxuICAgICAgLy8gRm9yICdlJywgZW1wdHkgbGluZXMgYXJlIG5vdCBjb25zaWRlcmVkIHdvcmRzLCBnbyBmaWd1cmUuXG4gICAgICB2YXIgZW1wdHlMaW5lSXNXb3JkID0gIShmb3J3YXJkICYmIHdvcmRFbmQpO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXBlYXQ7IGkrKykge1xuICAgICAgICB2YXIgd29yZCA9IGZpbmRXb3JkKGNtLCBjdXIsIGZvcndhcmQsIGJpZ1dvcmQsIGVtcHR5TGluZUlzV29yZCk7XG4gICAgICAgIGlmICghd29yZCkge1xuICAgICAgICAgIHZhciBlb2RDaCA9IGxpbmVMZW5ndGgoY20sIGNtLmxhc3RMaW5lKCkpO1xuICAgICAgICAgIHdvcmRzLnB1c2goZm9yd2FyZFxuICAgICAgICAgICAgICA/IHtsaW5lOiBjbS5sYXN0TGluZSgpLCBmcm9tOiBlb2RDaCwgdG86IGVvZENofVxuICAgICAgICAgICAgICA6IHtsaW5lOiAwLCBmcm9tOiAwLCB0bzogMH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHdvcmRzLnB1c2god29yZCk7XG4gICAgICAgIGN1ciA9IG5ldyBQb3Mod29yZC5saW5lLCBmb3J3YXJkID8gKHdvcmQudG8gLSAxKSA6IHdvcmQuZnJvbSk7XG4gICAgICB9XG4gICAgICB2YXIgc2hvcnRDaXJjdWl0ID0gd29yZHMubGVuZ3RoICE9IHJlcGVhdDtcbiAgICAgIHZhciBmaXJzdFdvcmQgPSB3b3Jkc1swXTtcbiAgICAgIHZhciBsYXN0V29yZCA9IHdvcmRzLnBvcCgpO1xuICAgICAgaWYgKGZvcndhcmQgJiYgIXdvcmRFbmQpIHtcbiAgICAgICAgLy8gd1xuICAgICAgICBpZiAoIXNob3J0Q2lyY3VpdCAmJiAoZmlyc3RXb3JkLmZyb20gIT0gY3VyU3RhcnQuY2ggfHwgZmlyc3RXb3JkLmxpbmUgIT0gY3VyU3RhcnQubGluZSkpIHtcbiAgICAgICAgICAvLyBXZSBkaWQgbm90IHN0YXJ0IGluIHRoZSBtaWRkbGUgb2YgYSB3b3JkLiBEaXNjYXJkIHRoZSBleHRyYSB3b3JkIGF0IHRoZSBlbmQuXG4gICAgICAgICAgbGFzdFdvcmQgPSB3b3Jkcy5wb3AoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFBvcyhsYXN0V29yZC5saW5lLCBsYXN0V29yZC5mcm9tKTtcbiAgICAgIH0gZWxzZSBpZiAoZm9yd2FyZCAmJiB3b3JkRW5kKSB7XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGxhc3RXb3JkLmxpbmUsIGxhc3RXb3JkLnRvIC0gMSk7XG4gICAgICB9IGVsc2UgaWYgKCFmb3J3YXJkICYmIHdvcmRFbmQpIHtcbiAgICAgICAgLy8gZ2VcbiAgICAgICAgaWYgKCFzaG9ydENpcmN1aXQgJiYgKGZpcnN0V29yZC50byAhPSBjdXJTdGFydC5jaCB8fCBmaXJzdFdvcmQubGluZSAhPSBjdXJTdGFydC5saW5lKSkge1xuICAgICAgICAgIC8vIFdlIGRpZCBub3Qgc3RhcnQgaW4gdGhlIG1pZGRsZSBvZiBhIHdvcmQuIERpc2NhcmQgdGhlIGV4dHJhIHdvcmQgYXQgdGhlIGVuZC5cbiAgICAgICAgICBsYXN0V29yZCA9IHdvcmRzLnBvcCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGxhc3RXb3JkLmxpbmUsIGxhc3RXb3JkLnRvKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGJcbiAgICAgICAgcmV0dXJuIG5ldyBQb3MobGFzdFdvcmQubGluZSwgbGFzdFdvcmQuZnJvbSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbW92ZVRvRW9sKGNtLCBoZWFkLCBtb3Rpb25BcmdzLCB2aW0sIGtlZXBIUG9zKSB7XG4gICAgICB2YXIgY3VyID0gaGVhZDtcbiAgICAgIHZhciByZXR2YWw9IG5ldyBQb3MoY3VyLmxpbmUgKyBtb3Rpb25BcmdzLnJlcGVhdCAtIDEsIEluZmluaXR5KTtcbiAgICAgIHZhciBlbmQ9Y20uY2xpcFBvcyhyZXR2YWwpO1xuICAgICAgZW5kLmNoLS07XG4gICAgICBpZiAoIWtlZXBIUG9zKSB7XG4gICAgICAgIHZpbS5sYXN0SFBvcyA9IEluZmluaXR5O1xuICAgICAgICB2aW0ubGFzdEhTUG9zID0gY20uY2hhckNvb3JkcyhlbmQsJ2RpdicpLmxlZnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmV0dmFsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmVUb0NoYXJhY3RlcihjbSwgcmVwZWF0LCBmb3J3YXJkLCBjaGFyYWN0ZXIpIHtcbiAgICAgIHZhciBjdXIgPSBjbS5nZXRDdXJzb3IoKTtcbiAgICAgIHZhciBzdGFydCA9IGN1ci5jaDtcbiAgICAgIHZhciBpZHg7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcGVhdDsgaSArKykge1xuICAgICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUoY3VyLmxpbmUpO1xuICAgICAgICBpZHggPSBjaGFySWR4SW5MaW5lKHN0YXJ0LCBsaW5lLCBjaGFyYWN0ZXIsIGZvcndhcmQsIHRydWUpO1xuICAgICAgICBpZiAoaWR4ID09IC0xKSB7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgc3RhcnQgPSBpZHg7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFBvcyhjbS5nZXRDdXJzb3IoKS5saW5lLCBpZHgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1vdmVUb0NvbHVtbihjbSwgcmVwZWF0KSB7XG4gICAgICAvLyByZXBlYXQgaXMgYWx3YXlzID49IDEsIHNvIHJlcGVhdCAtIDEgYWx3YXlzIGNvcnJlc3BvbmRzXG4gICAgICAvLyB0byB0aGUgY29sdW1uIHdlIHdhbnQgdG8gZ28gdG8uXG4gICAgICB2YXIgbGluZSA9IGNtLmdldEN1cnNvcigpLmxpbmU7XG4gICAgICByZXR1cm4gY2xpcEN1cnNvclRvQ29udGVudChjbSwgbmV3IFBvcyhsaW5lLCByZXBlYXQgLSAxKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlTWFyayhjbSwgdmltLCBtYXJrTmFtZSwgcG9zKSB7XG4gICAgICBpZiAoIWluQXJyYXkobWFya05hbWUsIHZhbGlkTWFya3MpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICh2aW0ubWFya3NbbWFya05hbWVdKSB7XG4gICAgICAgIHZpbS5tYXJrc1ttYXJrTmFtZV0uY2xlYXIoKTtcbiAgICAgIH1cbiAgICAgIHZpbS5tYXJrc1ttYXJrTmFtZV0gPSBjbS5zZXRCb29rbWFyayhwb3MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoYXJJZHhJbkxpbmUoc3RhcnQsIGxpbmUsIGNoYXJhY3RlciwgZm9yd2FyZCwgaW5jbHVkZUNoYXIpIHtcbiAgICAgIC8vIFNlYXJjaCBmb3IgY2hhciBpbiBsaW5lLlxuICAgICAgLy8gbW90aW9uX29wdGlvbnM6IHtmb3J3YXJkLCBpbmNsdWRlQ2hhcn1cbiAgICAgIC8vIElmIGluY2x1ZGVDaGFyID0gdHJ1ZSwgaW5jbHVkZSBpdCB0b28uXG4gICAgICAvLyBJZiBmb3J3YXJkID0gdHJ1ZSwgc2VhcmNoIGZvcndhcmQsIGVsc2Ugc2VhcmNoIGJhY2t3YXJkcy5cbiAgICAgIC8vIElmIGNoYXIgaXMgbm90IGZvdW5kIG9uIHRoaXMgbGluZSwgZG8gbm90aGluZ1xuICAgICAgdmFyIGlkeDtcbiAgICAgIGlmIChmb3J3YXJkKSB7XG4gICAgICAgIGlkeCA9IGxpbmUuaW5kZXhPZihjaGFyYWN0ZXIsIHN0YXJ0ICsgMSk7XG4gICAgICAgIGlmIChpZHggIT0gLTEgJiYgIWluY2x1ZGVDaGFyKSB7XG4gICAgICAgICAgaWR4IC09IDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlkeCA9IGxpbmUubGFzdEluZGV4T2YoY2hhcmFjdGVyLCBzdGFydCAtIDEpO1xuICAgICAgICBpZiAoaWR4ICE9IC0xICYmICFpbmNsdWRlQ2hhcikge1xuICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gaWR4O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmRQYXJhZ3JhcGgoY20sIGhlYWQsIHJlcGVhdCwgZGlyLCBpbmNsdXNpdmUpIHtcbiAgICAgIHZhciBsaW5lID0gaGVhZC5saW5lO1xuICAgICAgdmFyIG1pbiA9IGNtLmZpcnN0TGluZSgpO1xuICAgICAgdmFyIG1heCA9IGNtLmxhc3RMaW5lKCk7XG4gICAgICB2YXIgc3RhcnQsIGVuZCwgaSA9IGxpbmU7XG4gICAgICBmdW5jdGlvbiBpc0VtcHR5KGkpIHsgcmV0dXJuICEvXFxTLy50ZXN0KGNtLmdldExpbmUoaSkpOyB9IC8vIGFjZV9wYXRjaFxuICAgICAgZnVuY3Rpb24gaXNCb3VuZGFyeShpLCBkaXIsIGFueSkge1xuICAgICAgICBpZiAoYW55KSB7IHJldHVybiBpc0VtcHR5KGkpICE9IGlzRW1wdHkoaSArIGRpcik7IH1cbiAgICAgICAgcmV0dXJuICFpc0VtcHR5KGkpICYmIGlzRW1wdHkoaSArIGRpcik7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBza2lwRm9sZChpKSB7XG4gICAgICAgICAgZGlyID0gZGlyID4gMCA/IDEgOiAtMTtcbiAgICAgICAgICB2YXIgZm9sZExpbmUgPSBjbS5hY2Uuc2Vzc2lvbi5nZXRGb2xkTGluZShpKTtcbiAgICAgICAgICBpZiAoZm9sZExpbmUpIHtcbiAgICAgICAgICAgICAgaWYgKGkgKyBkaXIgPiBmb2xkTGluZS5zdGFydC5yb3cgJiYgaSArIGRpciA8IGZvbGRMaW5lLmVuZC5yb3cpXG4gICAgICAgICAgICAgICAgICBkaXIgPSAoZGlyID4gMCA/IGZvbGRMaW5lLmVuZC5yb3cgOiBmb2xkTGluZS5zdGFydC5yb3cpIC0gaTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHdoaWxlIChtaW4gPD0gaSAmJiBpIDw9IG1heCAmJiByZXBlYXQgPiAwKSB7XG4gICAgICAgICAgc2tpcEZvbGQoaSk7XG4gICAgICAgICAgaWYgKGlzQm91bmRhcnkoaSwgZGlyKSkgeyByZXBlYXQtLTsgfVxuICAgICAgICAgIGkgKz0gZGlyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUG9zKGksIDApO1xuICAgICAgfVxuXG4gICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgaWYgKHZpbS52aXN1YWxMaW5lICYmIGlzQm91bmRhcnkobGluZSwgMSwgdHJ1ZSkpIHtcbiAgICAgICAgdmFyIGFuY2hvciA9IHZpbS5zZWwuYW5jaG9yO1xuICAgICAgICBpZiAoaXNCb3VuZGFyeShhbmNob3IubGluZSwgLTEsIHRydWUpKSB7XG4gICAgICAgICAgaWYgKCFpbmNsdXNpdmUgfHwgYW5jaG9yLmxpbmUgIT0gbGluZSkge1xuICAgICAgICAgICAgbGluZSArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIHN0YXJ0U3RhdGUgPSBpc0VtcHR5KGxpbmUpO1xuICAgICAgZm9yIChpID0gbGluZTsgaSA8PSBtYXggJiYgcmVwZWF0OyBpKyspIHtcbiAgICAgICAgaWYgKGlzQm91bmRhcnkoaSwgMSwgdHJ1ZSkpIHtcbiAgICAgICAgICBpZiAoIWluY2x1c2l2ZSB8fCBpc0VtcHR5KGkpICE9IHN0YXJ0U3RhdGUpIHtcbiAgICAgICAgICAgIHJlcGVhdC0tO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZW5kID0gbmV3IFBvcyhpLCAwKTtcbiAgICAgIC8vIHNlbGVjdCBib3VuZGFyeSBiZWZvcmUgcGFyYWdyYXBoIGZvciB0aGUgbGFzdCBvbmVcbiAgICAgIGlmIChpID4gbWF4ICYmICFzdGFydFN0YXRlKSB7IHN0YXJ0U3RhdGUgPSB0cnVlOyB9XG4gICAgICBlbHNlIHsgaW5jbHVzaXZlID0gZmFsc2U7IH1cbiAgICAgIGZvciAoaSA9IGxpbmU7IGkgPiBtaW47IGktLSkge1xuICAgICAgICBpZiAoIWluY2x1c2l2ZSB8fCBpc0VtcHR5KGkpID09IHN0YXJ0U3RhdGUgfHwgaSA9PSBsaW5lKSB7XG4gICAgICAgICAgaWYgKGlzQm91bmRhcnkoaSwgLTEsIHRydWUpKSB7IGJyZWFrOyB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHN0YXJ0ID0gbmV3IFBvcyhpLCAwKTtcbiAgICAgIHJldHVybiB7IHN0YXJ0OiBzdGFydCwgZW5kOiBlbmQgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBCYXNlZCBvbiB7QGxpbmsgZmluZFNlbnRlbmNlfS4gVGhlIGludGVybmFsIGZ1bmN0aW9ucyBoYXZlIHRoZSBzYW1lIG5hbWVzLFxuICAgICAqIGJ1dCB0aGVpciBiZWhhdmlvdXIgaXMgZGlmZmVyZW50LiBmaW5kU2VudGVuY2UoKSBjcm9zc2VzIGxpbmUgYnJlYWtzIGFuZCBcbiAgICAgKiBpcyB1c2VkIGZvciBqdW1waW5nIHRvIHNlbnRlbmNlIGJlZ2lubmluZ3MgYmVmb3JlIG9yIGFmdGVyIHRoZSBjdXJyZW50IGN1cnNvciBwb3NpdGlvbiwgXG4gICAgICogd2hlcmVhcyBnZXRTZW50ZW5jZSgpIGlzIGZvciBnZXR0aW5nIHRoZSBiZWdpbm5pbmcgb3IgZW5kIG9mIHRoZSBzZW50ZW5jZSBcbiAgICAgKiBhdCB0aGUgY3VycmVudCBjdXJzb3IgcG9zaXRpb24sIGVpdGhlciBpbmNsdWRpbmcgKGEpIG9yIGV4Y2x1ZGluZyAoaSkgd2hpdGVzcGFjZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBnZXRTZW50ZW5jZShjbSwgY3VyLCByZXBlYXQsIGRpciwgaW5jbHVzaXZlIC8qaW5jbHVkZXMgd2hpdGVzcGFjZSovKSB7XG5cbiAgICAgIC8qXG4gICAgICAgIFRha2VzIGFuIGluZGV4IG9iamVjdFxuICAgICAgICB7XG4gICAgICAgICAgbGluZTogdGhlIGxpbmUgc3RyaW5nLFxuICAgICAgICAgIGxuOiBsaW5lIG51bWJlcixcbiAgICAgICAgICBwb3M6IGluZGV4IGluIGxpbmUsXG4gICAgICAgICAgZGlyOiBkaXJlY3Rpb24gb2YgdHJhdmVyc2FsICgtMSBvciAxKVxuICAgICAgICB9XG4gICAgICAgIGFuZCBtb2RpZmllcyB0aGUgcG9zIG1lbWJlciB0byByZXByZXNlbnQgdGhlXG4gICAgICAgIG5leHQgdmFsaWQgcG9zaXRpb24gb3Igc2V0cyB0aGUgbGluZSB0byBudWxsIGlmIHRoZXJlIGFyZVxuICAgICAgICBubyBtb3JlIHZhbGlkIHBvc2l0aW9ucy5cbiAgICAgICAqL1xuICAgICAgZnVuY3Rpb24gbmV4dENoYXIoY3Vycikge1xuICAgICAgICBpZiAoY3Vyci5wb3MgKyBjdXJyLmRpciA8IDAgfHwgY3Vyci5wb3MgKyBjdXJyLmRpciA+PSBjdXJyLmxpbmUubGVuZ3RoKSB7XG4gICAgICAgICAgY3Vyci5saW5lID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBjdXJyLnBvcyArPSBjdXJyLmRpcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLypcbiAgICAgICAgUGVyZm9ybXMgb25lIGl0ZXJhdGlvbiBvZiB0cmF2ZXJzYWwgaW4gZm9yd2FyZCBkaXJlY3Rpb25cbiAgICAgICAgUmV0dXJucyBhbiBpbmRleCBvYmplY3Qgb2YgdGhlIHNlbnRlbmNlIGVuZFxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiBmb3J3YXJkKGNtLCBsbiwgcG9zLCBkaXIpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBjbS5nZXRMaW5lKGxuKTtcblxuICAgICAgICB2YXIgY3VyciA9IHtcbiAgICAgICAgICBsaW5lOiBsaW5lLFxuICAgICAgICAgIGxuOiBsbixcbiAgICAgICAgICBwb3M6IHBvcyxcbiAgICAgICAgICBkaXI6IGRpcixcbiAgICAgICAgfTtcblxuICAgICAgICBpZiAoY3Vyci5saW5lID09PSBcIlwiKSB7XG4gICAgICAgICAgcmV0dXJuIHsgbG46IGN1cnIubG4sIHBvczogY3Vyci5wb3MgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsYXN0U2VudGVuY2VQb3MgPSBjdXJyLnBvcztcblxuICAgICAgICAvLyBNb3ZlIG9uZSBzdGVwIHRvIHNraXAgY2hhcmFjdGVyIHdlIHN0YXJ0IG9uXG4gICAgICAgIG5leHRDaGFyKGN1cnIpO1xuXG4gICAgICAgIHdoaWxlIChjdXJyLmxpbmUgIT09IG51bGwpIHtcbiAgICAgICAgICBsYXN0U2VudGVuY2VQb3MgPSBjdXJyLnBvcztcbiAgICAgICAgICBpZiAoaXNFbmRPZlNlbnRlbmNlU3ltYm9sKGN1cnIubGluZVtjdXJyLnBvc10pKSB7XG4gICAgICAgICAgICBpZiAoIWluY2x1c2l2ZSkge1xuICAgICAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBjdXJyLnBvcyArIDEgfTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgbmV4dENoYXIoY3Vycik7XG4gICAgICAgICAgICAgIHdoaWxlIChjdXJyLmxpbmUgIT09IG51bGwgKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzV2hpdGVTcGFjZVN0cmluZyhjdXJyLmxpbmVbY3Vyci5wb3NdKSkge1xuICAgICAgICAgICAgICAgICAgbGFzdFNlbnRlbmNlUG9zID0gY3Vyci5wb3M7XG4gICAgICAgICAgICAgICAgICBuZXh0Q2hhcihjdXJyKVxuICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHsgbG46IGN1cnIubG4sIHBvczogbGFzdFNlbnRlbmNlUG9zICsgMSB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBuZXh0Q2hhcihjdXJyKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBsYXN0U2VudGVuY2VQb3MgKyAxIH07XG4gICAgICB9XG5cbiAgICAgIC8qXG4gICAgICAgIFBlcmZvcm1zIG9uZSBpdGVyYXRpb24gb2YgdHJhdmVyc2FsIGluIHJldmVyc2UgZGlyZWN0aW9uXG4gICAgICAgIFJldHVybnMgYW4gaW5kZXggb2JqZWN0IG9mIHRoZSBzZW50ZW5jZSBzdGFydFxuICAgICAgICovXG4gICAgICBmdW5jdGlvbiByZXZlcnNlKGNtLCBsbiwgcG9zLCBkaXIpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBjbS5nZXRMaW5lKGxuKTtcblxuICAgICAgICB2YXIgY3VyciA9IHtcbiAgICAgICAgICBsaW5lOiBsaW5lLFxuICAgICAgICAgIGxuOiBsbixcbiAgICAgICAgICBwb3M6IHBvcyxcbiAgICAgICAgICBkaXI6IGRpcixcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjdXJyLmxpbmUgPT09IFwiXCIpIHtcbiAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBjdXJyLnBvcyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxhc3RTZW50ZW5jZVBvcyA9IGN1cnIucG9zO1xuXG4gICAgICAgIC8vIE1vdmUgb25lIHN0ZXAgdG8gc2tpcCBjaGFyYWN0ZXIgd2Ugc3RhcnQgb25cbiAgICAgICAgbmV4dENoYXIoY3Vycik7XG5cbiAgICAgICAgd2hpbGUgKGN1cnIubGluZSAhPT0gbnVsbCkge1xuICAgICAgICAgIGlmICghaXNXaGl0ZVNwYWNlU3RyaW5nKGN1cnIubGluZVtjdXJyLnBvc10pICYmICFpc0VuZE9mU2VudGVuY2VTeW1ib2woY3Vyci5saW5lW2N1cnIucG9zXSkpIHtcbiAgICAgICAgICAgIGxhc3RTZW50ZW5jZVBvcyA9IGN1cnIucG9zO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGVsc2UgaWYgKGlzRW5kT2ZTZW50ZW5jZVN5bWJvbChjdXJyLmxpbmVbY3Vyci5wb3NdKSApIHtcbiAgICAgICAgICAgIGlmICghaW5jbHVzaXZlKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGxhc3RTZW50ZW5jZVBvcyB9O1xuICAgICAgICAgICAgfSBcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoaXNXaGl0ZVNwYWNlU3RyaW5nKGN1cnIubGluZVtjdXJyLnBvcyArIDFdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGN1cnIucG9zICsgMSB9O1xuICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBsYXN0U2VudGVuY2VQb3MgfTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHRDaGFyKGN1cnIpO1xuICAgICAgICB9XG4gICAgICAgIGN1cnIubGluZSA9IGxpbmVcbiAgICAgICAgaWYgKGluY2x1c2l2ZSAmJiBpc1doaXRlU3BhY2VTdHJpbmcoY3Vyci5saW5lW2N1cnIucG9zXSkpIHtcbiAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBjdXJyLnBvcyB9O1xuICAgICAgICB9IFxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICByZXR1cm4geyBsbjogY3Vyci5sbiwgcG9zOiBsYXN0U2VudGVuY2VQb3MgfTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICAgIHZhciBjdXJyX2luZGV4ID0ge1xuICAgICAgICBsbjogY3VyLmxpbmUsXG4gICAgICAgIHBvczogY3VyLmNoLFxuICAgICAgfTtcblxuICAgICAgd2hpbGUgKHJlcGVhdCA+IDApIHtcbiAgICAgICAgaWYgKGRpciA8IDApIHtcbiAgICAgICAgICBjdXJyX2luZGV4ID0gcmV2ZXJzZShjbSwgY3Vycl9pbmRleC5sbiwgY3Vycl9pbmRleC5wb3MsIGRpcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgY3Vycl9pbmRleCA9IGZvcndhcmQoY20sIGN1cnJfaW5kZXgubG4sIGN1cnJfaW5kZXgucG9zLCBkaXIpO1xuICAgICAgICB9XG4gICAgICAgIHJlcGVhdC0tO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbmV3IFBvcyhjdXJyX2luZGV4LmxuLCBjdXJyX2luZGV4LnBvcyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluZFNlbnRlbmNlKGNtLCBjdXIsIHJlcGVhdCwgZGlyKSB7XG5cbiAgICAgICAvKlxuICAgICAgICAgVGFrZXMgYW4gaW5kZXggb2JqZWN0XG4gICAgICAgICB7XG4gICAgICAgICAgIGxpbmU6IHRoZSBsaW5lIHN0cmluZyxcbiAgICAgICAgICAgbG46IGxpbmUgbnVtYmVyLFxuICAgICAgICAgICBwb3M6IGluZGV4IGluIGxpbmUsXG4gICAgICAgICAgIGRpcjogZGlyZWN0aW9uIG9mIHRyYXZlcnNhbCAoLTEgb3IgMSlcbiAgICAgICAgIH1cbiAgICAgICAgIGFuZCBtb2RpZmllcyB0aGUgbGluZSwgbG4sIGFuZCBwb3MgbWVtYmVycyB0byByZXByZXNlbnQgdGhlXG4gICAgICAgICBuZXh0IHZhbGlkIHBvc2l0aW9uIG9yIHNldHMgdGhlbSB0byBudWxsIGlmIHRoZXJlIGFyZVxuICAgICAgICAgbm8gbW9yZSB2YWxpZCBwb3NpdGlvbnMuXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIG5leHRDaGFyKGNtLCBpZHgpIHtcbiAgICAgICAgaWYgKGlkeC5wb3MgKyBpZHguZGlyIDwgMCB8fCBpZHgucG9zICsgaWR4LmRpciA+PSBpZHgubGluZS5sZW5ndGgpIHtcbiAgICAgICAgICBpZHgubG4gKz0gaWR4LmRpcjtcbiAgICAgICAgICBpZiAoIWlzTGluZShjbSwgaWR4LmxuKSkge1xuICAgICAgICAgICAgaWR4LmxpbmUgPSBudWxsO1xuICAgICAgICAgICAgaWR4LmxuID0gbnVsbDtcbiAgICAgICAgICAgIGlkeC5wb3MgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZHgubGluZSA9IGNtLmdldExpbmUoaWR4LmxuKTtcbiAgICAgICAgICBpZHgucG9zID0gKGlkeC5kaXIgPiAwKSA/IDAgOiBpZHgubGluZS5sZW5ndGggLSAxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlkeC5wb3MgKz0gaWR4LmRpcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvKlxuICAgICAgICBQZXJmb3JtcyBvbmUgaXRlcmF0aW9uIG9mIHRyYXZlcnNhbCBpbiBmb3J3YXJkIGRpcmVjdGlvblxuICAgICAgICBSZXR1cm5zIGFuIGluZGV4IG9iamVjdCBvZiB0aGUgbmV3IGxvY2F0aW9uXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIGZvcndhcmQoY20sIGxuLCBwb3MsIGRpcikge1xuICAgICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUobG4pO1xuICAgICAgICB2YXIgc3RvcCA9IChsaW5lID09PSBcIlwiKTtcblxuICAgICAgICB2YXIgY3VyciA9IHtcbiAgICAgICAgICBsaW5lOiBsaW5lLFxuICAgICAgICAgIGxuOiBsbixcbiAgICAgICAgICBwb3M6IHBvcyxcbiAgICAgICAgICBkaXI6IGRpcixcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsYXN0X3ZhbGlkID0ge1xuICAgICAgICAgIGxuOiBjdXJyLmxuLFxuICAgICAgICAgIHBvczogY3Vyci5wb3MsXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2tpcF9lbXB0eV9saW5lcyA9IChjdXJyLmxpbmUgPT09IFwiXCIpO1xuXG4gICAgICAgIC8vIE1vdmUgb25lIHN0ZXAgdG8gc2tpcCBjaGFyYWN0ZXIgd2Ugc3RhcnQgb25cbiAgICAgICAgbmV4dENoYXIoY20sIGN1cnIpO1xuXG4gICAgICAgIHdoaWxlIChjdXJyLmxpbmUgIT09IG51bGwpIHtcbiAgICAgICAgICBsYXN0X3ZhbGlkLmxuID0gY3Vyci5sbjtcbiAgICAgICAgICBsYXN0X3ZhbGlkLnBvcyA9IGN1cnIucG9zO1xuXG4gICAgICAgICAgaWYgKGN1cnIubGluZSA9PT0gXCJcIiAmJiAhc2tpcF9lbXB0eV9saW5lcykge1xuICAgICAgICAgICAgcmV0dXJuIHsgbG46IGN1cnIubG4sIHBvczogY3Vyci5wb3MsIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHN0b3AgJiYgY3Vyci5saW5lICE9PSBcIlwiICYmICFpc1doaXRlU3BhY2VTdHJpbmcoY3Vyci5saW5lW2N1cnIucG9zXSkpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGN1cnIucG9zLCB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChpc0VuZE9mU2VudGVuY2VTeW1ib2woY3Vyci5saW5lW2N1cnIucG9zXSlcbiAgICAgICAgICAgICYmICFzdG9wXG4gICAgICAgICAgICAmJiAoY3Vyci5wb3MgPT09IGN1cnIubGluZS5sZW5ndGggLSAxXG4gICAgICAgICAgICAgIHx8IGlzV2hpdGVTcGFjZVN0cmluZyhjdXJyLmxpbmVbY3Vyci5wb3MgKyAxXSkpKSB7XG4gICAgICAgICAgICBzdG9wID0gdHJ1ZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBuZXh0Q2hhcihjbSwgY3Vycik7XG4gICAgICAgIH1cblxuICAgICAgICAvKlxuICAgICAgICAgIFNldCB0aGUgcG9zaXRpb24gdG8gdGhlIGxhc3Qgbm9uIHdoaXRlc3BhY2UgY2hhcmFjdGVyIG9uIHRoZSBsYXN0XG4gICAgICAgICAgdmFsaWQgbGluZSBpbiB0aGUgY2FzZSB0aGF0IHdlIHJlYWNoIHRoZSBlbmQgb2YgdGhlIGRvY3VtZW50LlxuICAgICAgICAqL1xuICAgICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUobGFzdF92YWxpZC5sbik7XG4gICAgICAgIGxhc3RfdmFsaWQucG9zID0gMDtcbiAgICAgICAgZm9yKHZhciBpID0gbGluZS5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICAgIGlmICghaXNXaGl0ZVNwYWNlU3RyaW5nKGxpbmVbaV0pKSB7XG4gICAgICAgICAgICBsYXN0X3ZhbGlkLnBvcyA9IGk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbGFzdF92YWxpZDtcblxuICAgICAgfVxuXG4gICAgICAvKlxuICAgICAgICBQZXJmb3JtcyBvbmUgaXRlcmF0aW9uIG9mIHRyYXZlcnNhbCBpbiByZXZlcnNlIGRpcmVjdGlvblxuICAgICAgICBSZXR1cm5zIGFuIGluZGV4IG9iamVjdCBvZiB0aGUgbmV3IGxvY2F0aW9uXG4gICAgICAgKi9cbiAgICAgIGZ1bmN0aW9uIHJldmVyc2UoY20sIGxuLCBwb3MsIGRpcikge1xuICAgICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUobG4pO1xuXG4gICAgICAgIHZhciBjdXJyID0ge1xuICAgICAgICAgIGxpbmU6IGxpbmUsXG4gICAgICAgICAgbG46IGxuLFxuICAgICAgICAgIHBvczogcG9zLFxuICAgICAgICAgIGRpcjogZGlyLFxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxhc3RfdmFsaWQgPSB7XG4gICAgICAgICAgbG46IGN1cnIubG4sXG4gICAgICAgICAgcG9zOiBudWxsLFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBza2lwX2VtcHR5X2xpbmVzID0gKGN1cnIubGluZSA9PT0gXCJcIik7XG5cbiAgICAgICAgLy8gTW92ZSBvbmUgc3RlcCB0byBza2lwIGNoYXJhY3RlciB3ZSBzdGFydCBvblxuICAgICAgICBuZXh0Q2hhcihjbSwgY3Vycik7XG5cbiAgICAgICAgd2hpbGUgKGN1cnIubGluZSAhPT0gbnVsbCkge1xuXG4gICAgICAgICAgaWYgKGN1cnIubGluZSA9PT0gXCJcIiAmJiAhc2tpcF9lbXB0eV9saW5lcykge1xuICAgICAgICAgICAgaWYgKGxhc3RfdmFsaWQucG9zICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybiBsYXN0X3ZhbGlkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IGxuOiBjdXJyLmxuLCBwb3M6IGN1cnIucG9zIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKGlzRW5kT2ZTZW50ZW5jZVN5bWJvbChjdXJyLmxpbmVbY3Vyci5wb3NdKVxuICAgICAgICAgICAgICAmJiBsYXN0X3ZhbGlkLnBvcyAhPT0gbnVsbFxuICAgICAgICAgICAgICAmJiAhKGN1cnIubG4gPT09IGxhc3RfdmFsaWQubG4gJiYgY3Vyci5wb3MgKyAxID09PSBsYXN0X3ZhbGlkLnBvcykpIHtcbiAgICAgICAgICAgIHJldHVybiBsYXN0X3ZhbGlkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChjdXJyLmxpbmUgIT09IFwiXCIgJiYgIWlzV2hpdGVTcGFjZVN0cmluZyhjdXJyLmxpbmVbY3Vyci5wb3NdKSkge1xuICAgICAgICAgICAgc2tpcF9lbXB0eV9saW5lcyA9IGZhbHNlO1xuICAgICAgICAgICAgbGFzdF92YWxpZCA9IHsgbG46IGN1cnIubG4sIHBvczogY3Vyci5wb3MgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHRDaGFyKGNtLCBjdXJyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qXG4gICAgICAgICAgU2V0IHRoZSBwb3NpdGlvbiB0byB0aGUgZmlyc3Qgbm9uIHdoaXRlc3BhY2UgY2hhcmFjdGVyIG9uIHRoZSBsYXN0XG4gICAgICAgICAgdmFsaWQgbGluZSBpbiB0aGUgY2FzZSB0aGF0IHdlIHJlYWNoIHRoZSBiZWdpbm5pbmcgb2YgdGhlIGRvY3VtZW50LlxuICAgICAgICAqL1xuICAgICAgICB2YXIgbGluZSA9IGNtLmdldExpbmUobGFzdF92YWxpZC5sbik7XG4gICAgICAgIGxhc3RfdmFsaWQucG9zID0gMDtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGxpbmUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICBpZiAoIWlzV2hpdGVTcGFjZVN0cmluZyhsaW5lW2ldKSkge1xuICAgICAgICAgICAgbGFzdF92YWxpZC5wb3MgPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsYXN0X3ZhbGlkO1xuICAgICAgfVxuXG4gICAgICB2YXIgY3Vycl9pbmRleCA9IHtcbiAgICAgICAgbG46IGN1ci5saW5lLFxuICAgICAgICBwb3M6IGN1ci5jaCxcbiAgICAgIH07XG5cbiAgICAgIHdoaWxlIChyZXBlYXQgPiAwKSB7XG4gICAgICAgIGlmIChkaXIgPCAwKSB7XG4gICAgICAgICAgY3Vycl9pbmRleCA9IHJldmVyc2UoY20sIGN1cnJfaW5kZXgubG4sIGN1cnJfaW5kZXgucG9zLCBkaXIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGN1cnJfaW5kZXggPSBmb3J3YXJkKGNtLCBjdXJyX2luZGV4LmxuLCBjdXJyX2luZGV4LnBvcywgZGlyKTtcbiAgICAgICAgfVxuICAgICAgICByZXBlYXQtLTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG5ldyBQb3MoY3Vycl9pbmRleC5sbiwgY3Vycl9pbmRleC5wb3MpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IHBlcmhhcHMgdGhpcyBmaW5hZ2xpbmcgb2Ygc3RhcnQgYW5kIGVuZCBwb3NpdGlvbnMgYmVsb25nc1xuICAgIC8vIGluIGNvZGVtaXJyb3IvcmVwbGFjZVJhbmdlP1xuICAgIGZ1bmN0aW9uIHNlbGVjdENvbXBhbmlvbk9iamVjdChjbSwgaGVhZCwgc3ltYiwgaW5jbHVzaXZlKSB7XG4gICAgICB2YXIgY3VyID0gaGVhZCwgc3RhcnQsIGVuZDtcblxuICAgICAgdmFyIGJyYWNrZXRSZWdleHAgPSAoe1xuICAgICAgICAnKCc6IC9bKCldLywgJyknOiAvWygpXS8sXG4gICAgICAgICdbJzogL1tbXFxdXS8sICddJzogL1tbXFxdXS8sXG4gICAgICAgICd7JzogL1t7fV0vLCAnfSc6IC9be31dLyxcbiAgICAgICAgJzwnOiAvWzw+XS8sICc+JzogL1s8Pl0vfSlbc3ltYl07XG4gICAgICB2YXIgb3BlblN5bSA9ICh7XG4gICAgICAgICcoJzogJygnLCAnKSc6ICcoJyxcbiAgICAgICAgJ1snOiAnWycsICddJzogJ1snLFxuICAgICAgICAneyc6ICd7JywgJ30nOiAneycsXG4gICAgICAgICc8JzogJzwnLCAnPic6ICc8J30pW3N5bWJdO1xuICAgICAgdmFyIGN1ckNoYXIgPSBjbS5nZXRMaW5lKGN1ci5saW5lKS5jaGFyQXQoY3VyLmNoKTtcbiAgICAgIC8vIER1ZSB0byB0aGUgYmVoYXZpb3Igb2Ygc2NhbkZvckJyYWNrZXQsIHdlIG5lZWQgdG8gYWRkIGFuIG9mZnNldCBpZiB0aGVcbiAgICAgIC8vIGN1cnNvciBpcyBvbiBhIG1hdGNoaW5nIG9wZW4gYnJhY2tldC5cbiAgICAgIHZhciBvZmZzZXQgPSBjdXJDaGFyID09PSBvcGVuU3ltID8gMSA6IDA7XG5cbiAgICAgIHN0YXJ0ID0gY20uc2NhbkZvckJyYWNrZXQobmV3IFBvcyhjdXIubGluZSwgY3VyLmNoICsgb2Zmc2V0KSwgLTEsIHVuZGVmaW5lZCwgeydicmFja2V0UmVnZXgnOiBicmFja2V0UmVnZXhwfSk7XG4gICAgICBlbmQgPSBjbS5zY2FuRm9yQnJhY2tldChuZXcgUG9zKGN1ci5saW5lLCBjdXIuY2ggKyBvZmZzZXQpLCAxLCB1bmRlZmluZWQsIHsnYnJhY2tldFJlZ2V4JzogYnJhY2tldFJlZ2V4cH0pO1xuXG4gICAgICBpZiAoIXN0YXJ0IHx8ICFlbmQpIHtcbiAgICAgICAgcmV0dXJuIHsgc3RhcnQ6IGN1ciwgZW5kOiBjdXIgfTtcbiAgICAgIH1cblxuICAgICAgc3RhcnQgPSBzdGFydC5wb3M7XG4gICAgICBlbmQgPSBlbmQucG9zO1xuXG4gICAgICBpZiAoKHN0YXJ0LmxpbmUgPT0gZW5kLmxpbmUgJiYgc3RhcnQuY2ggPiBlbmQuY2gpXG4gICAgICAgICAgfHwgKHN0YXJ0LmxpbmUgPiBlbmQubGluZSkpIHtcbiAgICAgICAgdmFyIHRtcCA9IHN0YXJ0O1xuICAgICAgICBzdGFydCA9IGVuZDtcbiAgICAgICAgZW5kID0gdG1wO1xuICAgICAgfVxuXG4gICAgICBpZiAoaW5jbHVzaXZlKSB7XG4gICAgICAgIGVuZC5jaCArPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3RhcnQuY2ggKz0gMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHsgc3RhcnQ6IHN0YXJ0LCBlbmQ6IGVuZCB9O1xuICAgIH1cblxuICAgIC8vIFRha2VzIGluIGEgc3ltYm9sIGFuZCBhIGN1cnNvciBhbmQgdHJpZXMgdG8gc2ltdWxhdGUgdGV4dCBvYmplY3RzIHRoYXRcbiAgICAvLyBoYXZlIGlkZW50aWNhbCBvcGVuaW5nIGFuZCBjbG9zaW5nIHN5bWJvbHNcbiAgICAvLyBUT0RPIHN1cHBvcnQgYWNyb3NzIG11bHRpcGxlIGxpbmVzXG4gICAgZnVuY3Rpb24gZmluZEJlZ2lubmluZ0FuZEVuZChjbSwgaGVhZCwgc3ltYiwgaW5jbHVzaXZlKSB7XG4gICAgICB2YXIgY3VyID0gY29weUN1cnNvcihoZWFkKTtcbiAgICAgIHZhciBsaW5lID0gY20uZ2V0TGluZShjdXIubGluZSk7XG4gICAgICB2YXIgY2hhcnMgPSBsaW5lLnNwbGl0KCcnKTtcbiAgICAgIHZhciBzdGFydCwgZW5kLCBpLCBsZW47XG4gICAgICB2YXIgZmlyc3RJbmRleCA9IGNoYXJzLmluZGV4T2Yoc3ltYik7XG5cbiAgICAgIC8vIHRoZSBkZWNpc2lvbiB0cmVlIGlzIHRvIGFsd2F5cyBsb29rIGJhY2t3YXJkcyBmb3IgdGhlIGJlZ2lubmluZyBmaXJzdCxcbiAgICAgIC8vIGJ1dCBpZiB0aGUgY3Vyc29yIGlzIGluIGZyb250IG9mIHRoZSBmaXJzdCBpbnN0YW5jZSBvZiB0aGUgc3ltYixcbiAgICAgIC8vIHRoZW4gbW92ZSB0aGUgY3Vyc29yIGZvcndhcmRcbiAgICAgIGlmIChjdXIuY2ggPCBmaXJzdEluZGV4KSB7XG4gICAgICAgIGN1ci5jaCA9IGZpcnN0SW5kZXg7XG4gICAgICAgIC8vIFdoeSBpcyB0aGlzIGxpbmUgZXZlbiBoZXJlPz8/XG4gICAgICAgIC8vIGNtLnNldEN1cnNvcihjdXIubGluZSwgZmlyc3RJbmRleCsxKTtcbiAgICAgIH1cbiAgICAgIC8vIG90aGVyd2lzZSBpZiB0aGUgY3Vyc29yIGlzIGN1cnJlbnRseSBvbiB0aGUgY2xvc2luZyBzeW1ib2xcbiAgICAgIGVsc2UgaWYgKGZpcnN0SW5kZXggPCBjdXIuY2ggJiYgY2hhcnNbY3VyLmNoXSA9PSBzeW1iKSB7XG4gICAgICAgIGVuZCA9IGN1ci5jaDsgLy8gYXNzaWduIGVuZCB0byB0aGUgY3VycmVudCBjdXJzb3JcbiAgICAgICAgLS1jdXIuY2g7IC8vIG1ha2Ugc3VyZSB0byBsb29rIGJhY2t3YXJkc1xuICAgICAgfVxuXG4gICAgICAvLyBpZiB3ZSdyZSBjdXJyZW50bHkgb24gdGhlIHN5bWJvbCwgd2UndmUgZ290IGEgc3RhcnRcbiAgICAgIGlmIChjaGFyc1tjdXIuY2hdID09IHN5bWIgJiYgIWVuZCkge1xuICAgICAgICBzdGFydCA9IGN1ci5jaCArIDE7IC8vIGFzc2lnbiBzdGFydCB0byBhaGVhZCBvZiB0aGUgY3Vyc29yXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBnbyBiYWNrd2FyZHMgdG8gZmluZCB0aGUgc3RhcnRcbiAgICAgICAgZm9yIChpID0gY3VyLmNoOyBpID4gLTEgJiYgIXN0YXJ0OyBpLS0pIHtcbiAgICAgICAgICBpZiAoY2hhcnNbaV0gPT0gc3ltYikge1xuICAgICAgICAgICAgc3RhcnQgPSBpICsgMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gbG9vayBmb3J3YXJkcyBmb3IgdGhlIGVuZCBzeW1ib2xcbiAgICAgIGlmIChzdGFydCAmJiAhZW5kKSB7XG4gICAgICAgIGZvciAoaSA9IHN0YXJ0LCBsZW4gPSBjaGFycy5sZW5ndGg7IGkgPCBsZW4gJiYgIWVuZDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGNoYXJzW2ldID09IHN5bWIpIHtcbiAgICAgICAgICAgIGVuZCA9IGk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIG5vdGhpbmcgZm91bmRcbiAgICAgIGlmICghc3RhcnQgfHwgIWVuZCkge1xuICAgICAgICByZXR1cm4geyBzdGFydDogY3VyLCBlbmQ6IGN1ciB9O1xuICAgICAgfVxuXG4gICAgICAvLyBpbmNsdWRlIHRoZSBzeW1ib2xzXG4gICAgICBpZiAoaW5jbHVzaXZlKSB7XG4gICAgICAgIC0tc3RhcnQ7ICsrZW5kO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogbmV3IFBvcyhjdXIubGluZSwgc3RhcnQpLFxuICAgICAgICBlbmQ6IG5ldyBQb3MoY3VyLmxpbmUsIGVuZClcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gU2VhcmNoIGZ1bmN0aW9uc1xuICAgIGRlZmluZU9wdGlvbigncGNyZScsIHRydWUsICdib29sZWFuJyk7XG4gICAgZnVuY3Rpb24gU2VhcmNoU3RhdGUoKSB7fVxuICAgIFNlYXJjaFN0YXRlLnByb3RvdHlwZSA9IHtcbiAgICAgIGdldFF1ZXJ5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZpbUdsb2JhbFN0YXRlLnF1ZXJ5O1xuICAgICAgfSxcbiAgICAgIHNldFF1ZXJ5OiBmdW5jdGlvbihxdWVyeSkge1xuICAgICAgICB2aW1HbG9iYWxTdGF0ZS5xdWVyeSA9IHF1ZXJ5O1xuICAgICAgfSxcbiAgICAgIGdldE92ZXJsYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZWFyY2hPdmVybGF5O1xuICAgICAgfSxcbiAgICAgIHNldE92ZXJsYXk6IGZ1bmN0aW9uKG92ZXJsYXkpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hPdmVybGF5ID0gb3ZlcmxheTtcbiAgICAgIH0sXG4gICAgICBpc1JldmVyc2VkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHZpbUdsb2JhbFN0YXRlLmlzUmV2ZXJzZWQ7XG4gICAgICB9LFxuICAgICAgc2V0UmV2ZXJzZWQ6IGZ1bmN0aW9uKHJldmVyc2VkKSB7XG4gICAgICAgIHZpbUdsb2JhbFN0YXRlLmlzUmV2ZXJzZWQgPSByZXZlcnNlZDtcbiAgICAgIH0sXG4gICAgICBnZXRTY3JvbGxiYXJBbm5vdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFubm90YXRlO1xuICAgICAgfSxcbiAgICAgIHNldFNjcm9sbGJhckFubm90YXRlOiBmdW5jdGlvbihhbm5vdGF0ZSkge1xuICAgICAgICB0aGlzLmFubm90YXRlID0gYW5ub3RhdGU7XG4gICAgICB9XG4gICAgfTtcbiAgICBmdW5jdGlvbiBnZXRTZWFyY2hTdGF0ZShjbSkge1xuICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgIHJldHVybiB2aW0uc2VhcmNoU3RhdGVfIHx8ICh2aW0uc2VhcmNoU3RhdGVfID0gbmV3IFNlYXJjaFN0YXRlKCkpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBzcGxpdEJ5U2xhc2goYXJnU3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3BsaXRCeVNlcGFyYXRvcihhcmdTdHJpbmcsICcvJyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluZFVuZXNjYXBlZFNsYXNoZXMoYXJnU3RyaW5nKSB7XG4gICAgICByZXR1cm4gZmluZFVuZXNjYXBlZFNlcGFyYXRvcnMoYXJnU3RyaW5nLCAnLycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNwbGl0QnlTZXBhcmF0b3IoYXJnU3RyaW5nLCBzZXBhcmF0b3IpIHtcbiAgICAgIHZhciBzbGFzaGVzID0gZmluZFVuZXNjYXBlZFNlcGFyYXRvcnMoYXJnU3RyaW5nLCBzZXBhcmF0b3IpIHx8IFtdO1xuICAgICAgaWYgKCFzbGFzaGVzLmxlbmd0aCkgcmV0dXJuIFtdO1xuICAgICAgdmFyIHRva2VucyA9IFtdO1xuICAgICAgLy8gaW4gY2FzZSBvZiBzdHJpbmdzIGxpa2UgZm9vL2JhclxuICAgICAgaWYgKHNsYXNoZXNbMF0gIT09IDApIHJldHVybjtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xhc2hlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodHlwZW9mIHNsYXNoZXNbaV0gPT0gJ251bWJlcicpXG4gICAgICAgICAgdG9rZW5zLnB1c2goYXJnU3RyaW5nLnN1YnN0cmluZyhzbGFzaGVzW2ldICsgMSwgc2xhc2hlc1tpKzFdKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW5zO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmRVbmVzY2FwZWRTZXBhcmF0b3JzKHN0ciwgc2VwYXJhdG9yKSB7XG4gICAgICBpZiAoIXNlcGFyYXRvcilcbiAgICAgICAgc2VwYXJhdG9yID0gJy8nO1xuXG4gICAgICB2YXIgZXNjYXBlTmV4dENoYXIgPSBmYWxzZTtcbiAgICAgIHZhciBzbGFzaGVzID0gW107XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYyA9IHN0ci5jaGFyQXQoaSk7XG4gICAgICAgIGlmICghZXNjYXBlTmV4dENoYXIgJiYgYyA9PSBzZXBhcmF0b3IpIHtcbiAgICAgICAgICBzbGFzaGVzLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgZXNjYXBlTmV4dENoYXIgPSAhZXNjYXBlTmV4dENoYXIgJiYgKGMgPT0gJ1xcXFwnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzbGFzaGVzO1xuICAgIH1cblxuICAgIC8vIFRyYW5zbGF0ZXMgYSBzZWFyY2ggc3RyaW5nIGZyb20gZXggKHZpbSkgc3ludGF4IGludG8gamF2YXNjcmlwdCBmb3JtLlxuICAgIGZ1bmN0aW9uIHRyYW5zbGF0ZVJlZ2V4KHN0cikge1xuICAgICAgLy8gV2hlbiB0aGVzZSBtYXRjaCwgYWRkIGEgJ1xcJyBpZiB1bmVzY2FwZWQgb3IgcmVtb3ZlIG9uZSBpZiBlc2NhcGVkLlxuICAgICAgdmFyIHNwZWNpYWxzID0gJ3woKXsnO1xuICAgICAgLy8gUmVtb3ZlLCBidXQgbmV2ZXIgYWRkLCBhICdcXCcgZm9yIHRoZXNlLlxuICAgICAgdmFyIHVuZXNjYXBlID0gJ30nO1xuICAgICAgdmFyIGVzY2FwZU5leHRDaGFyID0gZmFsc2U7XG4gICAgICB2YXIgb3V0ID0gW107XG4gICAgICBmb3IgKHZhciBpID0gLTE7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckF0KGkpIHx8ICcnO1xuICAgICAgICB2YXIgbiA9IHN0ci5jaGFyQXQoaSsxKSB8fCAnJztcbiAgICAgICAgdmFyIHNwZWNpYWxDb21lc05leHQgPSAobiAmJiBzcGVjaWFscy5pbmRleE9mKG4pICE9IC0xKTtcbiAgICAgICAgaWYgKGVzY2FwZU5leHRDaGFyKSB7XG4gICAgICAgICAgaWYgKGMgIT09ICdcXFxcJyB8fCAhc3BlY2lhbENvbWVzTmV4dCkge1xuICAgICAgICAgICAgb3V0LnB1c2goYyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVzY2FwZU5leHRDaGFyID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGMgPT09ICdcXFxcJykge1xuICAgICAgICAgICAgZXNjYXBlTmV4dENoYXIgPSB0cnVlO1xuICAgICAgICAgICAgLy8gVHJlYXQgdGhlIHVuZXNjYXBlIGxpc3QgYXMgc3BlY2lhbCBmb3IgcmVtb3ZpbmcsIGJ1dCBub3QgYWRkaW5nICdcXCcuXG4gICAgICAgICAgICBpZiAobiAmJiB1bmVzY2FwZS5pbmRleE9mKG4pICE9IC0xKSB7XG4gICAgICAgICAgICAgIHNwZWNpYWxDb21lc05leHQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gTm90IHBhc3NpbmcgdGhpcyB0ZXN0IG1lYW5zIHJlbW92aW5nIGEgJ1xcJy5cbiAgICAgICAgICAgIGlmICghc3BlY2lhbENvbWVzTmV4dCB8fCBuID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgICAgb3V0LnB1c2goYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG91dC5wdXNoKGMpO1xuICAgICAgICAgICAgaWYgKHNwZWNpYWxDb21lc05leHQgJiYgbiAhPT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgIG91dC5wdXNoKCdcXFxcJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gb3V0LmpvaW4oJycpO1xuICAgIH1cblxuICAgIC8vIFRyYW5zbGF0ZXMgdGhlIHJlcGxhY2UgcGFydCBvZiBhIHNlYXJjaCBhbmQgcmVwbGFjZSBmcm9tIGV4ICh2aW0pIHN5bnRheCBpbnRvXG4gICAgLy8gamF2YXNjcmlwdCBmb3JtLiAgU2ltaWxhciB0byB0cmFuc2xhdGVSZWdleCwgYnV0IGFkZGl0aW9uYWxseSBmaXhlcyBiYWNrIHJlZmVyZW5jZXNcbiAgICAvLyAodHJhbnNsYXRlcyAnXFxbMC4uOV0nIHRvICckWzAuLjldJykgYW5kIGZvbGxvd3MgZGlmZmVyZW50IHJ1bGVzIGZvciBlc2NhcGluZyAnJCcuXG4gICAgdmFyIGNoYXJVbmVzY2FwZXMgPSB7J1xcXFxuJzogJ1xcbicsICdcXFxccic6ICdcXHInLCAnXFxcXHQnOiAnXFx0J307XG4gICAgZnVuY3Rpb24gdHJhbnNsYXRlUmVnZXhSZXBsYWNlKHN0cikge1xuICAgICAgdmFyIGVzY2FwZU5leHRDaGFyID0gZmFsc2U7XG4gICAgICB2YXIgb3V0ID0gW107XG4gICAgICBmb3IgKHZhciBpID0gLTE7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGMgPSBzdHIuY2hhckF0KGkpIHx8ICcnO1xuICAgICAgICB2YXIgbiA9IHN0ci5jaGFyQXQoaSsxKSB8fCAnJztcbiAgICAgICAgaWYgKGNoYXJVbmVzY2FwZXNbYyArIG5dKSB7XG4gICAgICAgICAgb3V0LnB1c2goY2hhclVuZXNjYXBlc1tjK25dKTtcbiAgICAgICAgICBpKys7XG4gICAgICAgIH0gZWxzZSBpZiAoZXNjYXBlTmV4dENoYXIpIHtcbiAgICAgICAgICAvLyBBdCBhbnkgcG9pbnQgaW4gdGhlIGxvb3AsIGVzY2FwZU5leHRDaGFyIGlzIHRydWUgaWYgdGhlIHByZXZpb3VzXG4gICAgICAgICAgLy8gY2hhcmFjdGVyIHdhcyBhICdcXCcgYW5kIHdhcyBub3QgZXNjYXBlZC5cbiAgICAgICAgICBvdXQucHVzaChjKTtcbiAgICAgICAgICBlc2NhcGVOZXh0Q2hhciA9IGZhbHNlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChjID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgIGVzY2FwZU5leHRDaGFyID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmICgoaXNOdW1iZXIobikgfHwgbiA9PT0gJyQnKSkge1xuICAgICAgICAgICAgICBvdXQucHVzaCgnJCcpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuICE9PSAnLycgJiYgbiAhPT0gJ1xcXFwnKSB7XG4gICAgICAgICAgICAgIG91dC5wdXNoKCdcXFxcJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChjID09PSAnJCcpIHtcbiAgICAgICAgICAgICAgb3V0LnB1c2goJyQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG91dC5wdXNoKGMpO1xuICAgICAgICAgICAgaWYgKG4gPT09ICcvJykge1xuICAgICAgICAgICAgICBvdXQucHVzaCgnXFxcXCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG91dC5qb2luKCcnKTtcbiAgICB9XG5cbiAgICAvLyBVbmVzY2FwZSBcXCBhbmQgLyBpbiB0aGUgcmVwbGFjZSBwYXJ0LCBmb3IgUENSRSBtb2RlLlxuICAgIHZhciB1bmVzY2FwZXMgPSB7J1xcXFwvJzogJy8nLCAnXFxcXFxcXFwnOiAnXFxcXCcsICdcXFxcbic6ICdcXG4nLCAnXFxcXHInOiAnXFxyJywgJ1xcXFx0JzogJ1xcdCcsICdcXFxcJic6JyYnfTtcbiAgICBmdW5jdGlvbiB1bmVzY2FwZVJlZ2V4UmVwbGFjZShzdHIpIHtcbiAgICAgIHZhciBzdHJlYW0gPSBuZXcgQ29kZU1pcnJvci5TdHJpbmdTdHJlYW0oc3RyKTtcbiAgICAgIHZhciBvdXRwdXQgPSBbXTtcbiAgICAgIHdoaWxlICghc3RyZWFtLmVvbCgpKSB7XG4gICAgICAgIC8vIFNlYXJjaCBmb3IgXFwuXG4gICAgICAgIHdoaWxlIChzdHJlYW0ucGVlaygpICYmIHN0cmVhbS5wZWVrKCkgIT0gJ1xcXFwnKSB7XG4gICAgICAgICAgb3V0cHV0LnB1c2goc3RyZWFtLm5leHQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1hdGNoZWQgPSBmYWxzZTtcbiAgICAgICAgZm9yICh2YXIgbWF0Y2hlciBpbiB1bmVzY2FwZXMpIHtcbiAgICAgICAgICBpZiAoc3RyZWFtLm1hdGNoKG1hdGNoZXIsIHRydWUpKSB7XG4gICAgICAgICAgICBtYXRjaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIG91dHB1dC5wdXNoKHVuZXNjYXBlc1ttYXRjaGVyXSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFtYXRjaGVkKSB7XG4gICAgICAgICAgLy8gRG9uJ3QgY2hhbmdlIGFueXRoaW5nXG4gICAgICAgICAgb3V0cHV0LnB1c2goc3RyZWFtLm5leHQoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBvdXRwdXQuam9pbignJyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRXh0cmFjdCB0aGUgcmVndWxhciBleHByZXNzaW9uIGZyb20gdGhlIHF1ZXJ5IGFuZCByZXR1cm4gYSBSZWdleHAgb2JqZWN0LlxuICAgICAqIFJldHVybnMgbnVsbCBpZiB0aGUgcXVlcnkgaXMgYmxhbmsuXG4gICAgICogSWYgaWdub3JlQ2FzZSBpcyBwYXNzZWQgaW4sIHRoZSBSZWdleHAgb2JqZWN0IHdpbGwgaGF2ZSB0aGUgJ2knIGZsYWcgc2V0LlxuICAgICAqIElmIHNtYXJ0Q2FzZSBpcyBwYXNzZWQgaW4sIGFuZCB0aGUgcXVlcnkgY29udGFpbnMgdXBwZXIgY2FzZSBsZXR0ZXJzLFxuICAgICAqICAgdGhlbiBpZ25vcmVDYXNlIGlzIG92ZXJyaWRkZW4sIGFuZCB0aGUgJ2knIGZsYWcgd2lsbCBub3QgYmUgc2V0LlxuICAgICAqIElmIHRoZSBxdWVyeSBjb250YWlucyB0aGUgL2kgaW4gdGhlIGZsYWcgcGFydCBvZiB0aGUgcmVndWxhciBleHByZXNzaW9uLFxuICAgICAqICAgdGhlbiBib3RoIGlnbm9yZUNhc2UgYW5kIHNtYXJ0Q2FzZSBhcmUgaWdub3JlZCwgYW5kICdpJyB3aWxsIGJlIHBhc3NlZFxuICAgICAqICAgdGhyb3VnaCB0byB0aGUgUmVnZXggb2JqZWN0LlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHBhcnNlUXVlcnkocXVlcnksIGlnbm9yZUNhc2UsIHNtYXJ0Q2FzZSkge1xuICAgICAgLy8gRmlyc3QgdXBkYXRlIHRoZSBsYXN0IHNlYXJjaCByZWdpc3RlclxuICAgICAgdmFyIGxhc3RTZWFyY2hSZWdpc3RlciA9IHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5nZXRSZWdpc3RlcignLycpO1xuICAgICAgbGFzdFNlYXJjaFJlZ2lzdGVyLnNldFRleHQocXVlcnkpO1xuICAgICAgLy8gQ2hlY2sgaWYgdGhlIHF1ZXJ5IGlzIGFscmVhZHkgYSByZWdleC5cbiAgICAgIGlmIChxdWVyeSBpbnN0YW5jZW9mIFJlZ0V4cCkgeyByZXR1cm4gcXVlcnk7IH1cbiAgICAgIC8vIEZpcnN0IHRyeSB0byBleHRyYWN0IHJlZ2V4ICsgZmxhZ3MgZnJvbSB0aGUgaW5wdXQuIElmIG5vIGZsYWdzIGZvdW5kLFxuICAgICAgLy8gZXh0cmFjdCBqdXN0IHRoZSByZWdleC4gSUUgZG9lcyBub3QgYWNjZXB0IGZsYWdzIGRpcmVjdGx5IGRlZmluZWQgaW5cbiAgICAgIC8vIHRoZSByZWdleCBzdHJpbmcgaW4gdGhlIGZvcm0gL3JlZ2V4L2ZsYWdzXG4gICAgICB2YXIgc2xhc2hlcyA9IGZpbmRVbmVzY2FwZWRTbGFzaGVzKHF1ZXJ5KTtcbiAgICAgIHZhciByZWdleFBhcnQ7XG4gICAgICB2YXIgZm9yY2VJZ25vcmVDYXNlO1xuICAgICAgaWYgKCFzbGFzaGVzLmxlbmd0aCkge1xuICAgICAgICAvLyBRdWVyeSBsb29rcyBsaWtlICdyZWdleHAnXG4gICAgICAgIHJlZ2V4UGFydCA9IHF1ZXJ5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUXVlcnkgbG9va3MgbGlrZSAncmVnZXhwLy4uLidcbiAgICAgICAgcmVnZXhQYXJ0ID0gcXVlcnkuc3Vic3RyaW5nKDAsIHNsYXNoZXNbMF0pO1xuICAgICAgICB2YXIgZmxhZ3NQYXJ0ID0gcXVlcnkuc3Vic3RyaW5nKHNsYXNoZXNbMF0pO1xuICAgICAgICBmb3JjZUlnbm9yZUNhc2UgPSAoZmxhZ3NQYXJ0LmluZGV4T2YoJ2knKSAhPSAtMSk7XG4gICAgICB9XG4gICAgICBpZiAoIXJlZ2V4UGFydCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIGlmICghZ2V0T3B0aW9uKCdwY3JlJykpIHtcbiAgICAgICAgcmVnZXhQYXJ0ID0gdHJhbnNsYXRlUmVnZXgocmVnZXhQYXJ0KTtcbiAgICAgIH1cbiAgICAgIGlmIChzbWFydENhc2UpIHtcbiAgICAgICAgaWdub3JlQ2FzZSA9ICgvXlteQS1aXSokLykudGVzdChyZWdleFBhcnQpO1xuICAgICAgfVxuICAgICAgdmFyIHJlZ2V4cCA9IG5ldyBSZWdFeHAocmVnZXhQYXJ0LFxuICAgICAgICAgIChpZ25vcmVDYXNlIHx8IGZvcmNlSWdub3JlQ2FzZSkgPyAnaW0nIDogJ20nKTtcbiAgICAgIHJldHVybiByZWdleHA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZG9tIC0gRG9jdW1lbnQgT2JqZWN0IE1hbmlwdWxhdG9yXG4gICAgICogVXNhZ2U6XG4gICAgICogICBkb20oJzx0YWc+J3w8bm9kZT5bLCAuLi57PGF0dHJpYnV0ZXM+fDwkc3R5bGVzPn18PGNoaWxkLW5vZGU+fCc8dGV4dD4nXSlcbiAgICAgKiBFeGFtcGxlczpcbiAgICAgKiAgIGRvbSgnZGl2Jywge2lkOid4eXonfSwgZG9tKCdwJywgJ0NNIHJvY2tzIScsIHskY29sb3I6J3JlZCd9KSlcbiAgICAgKiAgIGRvbShkb2N1bWVudC5oZWFkLCBkb20oJ3NjcmlwdCcsICdhbGVydChcImhlbGxvIVwiKScpKVxuICAgICAqIE5vdCBzdXBwb3J0ZWQ6XG4gICAgICogICBkb20oJ3AnLCBbJ2FycmF5cyBhcmUgb2JqZWN0cyddLCBFcnJvcignb2JqZWN0cyBzcGVjaWZ5IGF0dHJpYnV0ZXMnKSlcbiAgICAgKi9cbiAgICBmdW5jdGlvbiBkb20obikge1xuICAgICAgaWYgKHR5cGVvZiBuID09PSAnc3RyaW5nJykgbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobik7XG4gICAgICBmb3IgKHZhciBhLCBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIShhID0gYXJndW1lbnRzW2ldKSkgY29udGludWU7XG4gICAgICAgIGlmICh0eXBlb2YgYSAhPT0gJ29iamVjdCcpIGEgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShhKTtcbiAgICAgICAgaWYgKGEubm9kZVR5cGUpIG4uYXBwZW5kQ2hpbGQoYSk7XG4gICAgICAgIGVsc2UgZm9yICh2YXIga2V5IGluIGEpIHtcbiAgICAgICAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChhLCBrZXkpKSBjb250aW51ZTtcbiAgICAgICAgICBpZiAoa2V5WzBdID09PSAnJCcpIG4uc3R5bGVba2V5LnNsaWNlKDEpXSA9IGFba2V5XTtcbiAgICAgICAgICBlbHNlIG4uc2V0QXR0cmlidXRlKGtleSwgYVtrZXldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIG47XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd0NvbmZpcm0oY20sIHRlbXBsYXRlKSB7XG4gICAgICB2YXIgcHJlID0gZG9tKCdkaXYnLCB7JGNvbG9yOiAncmVkJywgJHdoaXRlU3BhY2U6ICdwcmUnLCBjbGFzczogJ2NtLXZpbS1tZXNzYWdlJ30sIHRlbXBsYXRlKTtcbiAgICAgIGlmIChjbS5vcGVuTm90aWZpY2F0aW9uKSB7XG4gICAgICAgIGNtLm9wZW5Ob3RpZmljYXRpb24ocHJlLCB7Ym90dG9tOiB0cnVlLCBkdXJhdGlvbjogNTAwMH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWxlcnQocHJlLmlubmVyVGV4dCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFrZVByb21wdChwcmVmaXgsIGRlc2MpIHtcbiAgICAgIHJldHVybiBkb20oZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpLFxuICAgICAgICAgICAgICAgZG9tKCdzcGFuJywgeyRmb250RmFtaWx5OiAnbW9ub3NwYWNlJywgJHdoaXRlU3BhY2U6ICdwcmUnfSxcbiAgICAgICAgICAgICAgICAgcHJlZml4LFxuICAgICAgICAgICAgICAgICBkb20oJ2lucHV0Jywge3R5cGU6ICd0ZXh0JywgYXV0b2NvcnJlY3Q6ICdvZmYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9jYXBpdGFsaXplOiAnb2ZmJywgc3BlbGxjaGVjazogJ2ZhbHNlJ30pKSxcbiAgICAgICAgICAgICAgIGRlc2MgJiYgZG9tKCdzcGFuJywgeyRjb2xvcjogJyM4ODgnfSwgZGVzYykpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3dQcm9tcHQoY20sIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0ZW1wbGF0ZSA9IG1ha2VQcm9tcHQob3B0aW9ucy5wcmVmaXgsIG9wdGlvbnMuZGVzYyk7XG4gICAgICBpZiAoY20ub3BlbkRpYWxvZykge1xuICAgICAgICBjbS5vcGVuRGlhbG9nKHRlbXBsYXRlLCBvcHRpb25zLm9uQ2xvc2UsIHtcbiAgICAgICAgICBvbktleURvd246IG9wdGlvbnMub25LZXlEb3duLCBvbktleVVwOiBvcHRpb25zLm9uS2V5VXAsXG4gICAgICAgICAgYm90dG9tOiB0cnVlLCBzZWxlY3RWYWx1ZU9uT3BlbjogZmFsc2UsIHZhbHVlOiBvcHRpb25zLnZhbHVlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHZhciBzaG9ydFRleHQgPSAnJztcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnByZWZpeCAhPSBcInN0cmluZ1wiICYmIG9wdGlvbnMucHJlZml4KSBzaG9ydFRleHQgKz0gb3B0aW9ucy5wcmVmaXgudGV4dENvbnRlbnQ7XG4gICAgICAgIGlmIChvcHRpb25zLmRlc2MpIHNob3J0VGV4dCArPSBcIiBcIiArIG9wdGlvbnMuZGVzYztcbiAgICAgICAgb3B0aW9ucy5vbkNsb3NlKHByb21wdChzaG9ydFRleHQsICcnKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVnZXhFcXVhbChyMSwgcjIpIHtcbiAgICAgIGlmIChyMSBpbnN0YW5jZW9mIFJlZ0V4cCAmJiByMiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgICAgIHZhciBwcm9wcyA9IFsnZ2xvYmFsJywgJ211bHRpbGluZScsICdpZ25vcmVDYXNlJywgJ3NvdXJjZSddO1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIHByb3AgPSBwcm9wc1tpXTtcbiAgICAgICAgICAgICAgaWYgKHIxW3Byb3BdICE9PSByMltwcm9wXSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAvLyBSZXR1cm5zIHRydWUgaWYgdGhlIHF1ZXJ5IGlzIHZhbGlkLlxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNlYXJjaFF1ZXJ5KGNtLCByYXdRdWVyeSwgaWdub3JlQ2FzZSwgc21hcnRDYXNlKSB7XG4gICAgICBpZiAoIXJhd1F1ZXJ5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBzdGF0ZSA9IGdldFNlYXJjaFN0YXRlKGNtKTtcbiAgICAgIHZhciBxdWVyeSA9IHBhcnNlUXVlcnkocmF3UXVlcnksICEhaWdub3JlQ2FzZSwgISFzbWFydENhc2UpO1xuICAgICAgaWYgKCFxdWVyeSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBoaWdobGlnaHRTZWFyY2hNYXRjaGVzKGNtLCBxdWVyeSk7XG4gICAgICBpZiAocmVnZXhFcXVhbChxdWVyeSwgc3RhdGUuZ2V0UXVlcnkoKSkpIHtcbiAgICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgICAgfVxuICAgICAgc3RhdGUuc2V0UXVlcnkocXVlcnkpO1xuICAgICAgcmV0dXJuIHF1ZXJ5O1xuICAgIH1cbiAgICBmdW5jdGlvbiBzZWFyY2hPdmVybGF5KHF1ZXJ5KSB7XG4gICAgICBpZiAocXVlcnkuc291cmNlLmNoYXJBdCgwKSA9PSAnXicpIHtcbiAgICAgICAgdmFyIG1hdGNoU29sID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuOiBmdW5jdGlvbihzdHJlYW0pIHtcbiAgICAgICAgICBpZiAobWF0Y2hTb2wgJiYgIXN0cmVhbS5zb2woKSkge1xuICAgICAgICAgICAgc3RyZWFtLnNraXBUb0VuZCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgbWF0Y2ggPSBzdHJlYW0ubWF0Y2gocXVlcnksIGZhbHNlKTtcbiAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaFswXS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAvLyBNYXRjaGVkIGVtcHR5IHN0cmluZywgc2tpcCB0byBuZXh0LlxuICAgICAgICAgICAgICBzdHJlYW0ubmV4dCgpO1xuICAgICAgICAgICAgICByZXR1cm4gJ3NlYXJjaGluZyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXN0cmVhbS5zb2woKSkge1xuICAgICAgICAgICAgICAvLyBCYWNrdHJhY2sgMSB0byBtYXRjaCBcXGJcbiAgICAgICAgICAgICAgc3RyZWFtLmJhY2tVcCgxKTtcbiAgICAgICAgICAgICAgaWYgKCFxdWVyeS5leGVjKHN0cmVhbS5uZXh0KCkgKyBtYXRjaFswXSkpIHtcbiAgICAgICAgICAgICAgICBzdHJlYW0ubmV4dCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdHJlYW0ubWF0Y2gocXVlcnkpO1xuICAgICAgICAgICAgcmV0dXJuICdzZWFyY2hpbmcnO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3aGlsZSAoIXN0cmVhbS5lb2woKSkge1xuICAgICAgICAgICAgc3RyZWFtLm5leHQoKTtcbiAgICAgICAgICAgIGlmIChzdHJlYW0ubWF0Y2gocXVlcnksIGZhbHNlKSkgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBxdWVyeTogcXVlcnlcbiAgICAgIH07XG4gICAgfVxuICAgIHZhciBoaWdobGlnaHRUaW1lb3V0ID0gMDtcbiAgICBmdW5jdGlvbiBoaWdobGlnaHRTZWFyY2hNYXRjaGVzKGNtLCBxdWVyeSkge1xuICAgICAgY2xlYXJUaW1lb3V0KGhpZ2hsaWdodFRpbWVvdXQpO1xuICAgICAgaGlnaGxpZ2h0VGltZW91dCA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICghY20uc3RhdGUudmltKSByZXR1cm47XG4gICAgICAgIHZhciBzZWFyY2hTdGF0ZSA9IGdldFNlYXJjaFN0YXRlKGNtKTtcbiAgICAgICAgdmFyIG92ZXJsYXkgPSBzZWFyY2hTdGF0ZS5nZXRPdmVybGF5KCk7XG4gICAgICAgIGlmICghb3ZlcmxheSB8fCBxdWVyeSAhPSBvdmVybGF5LnF1ZXJ5KSB7XG4gICAgICAgICAgaWYgKG92ZXJsYXkpIHtcbiAgICAgICAgICAgIGNtLnJlbW92ZU92ZXJsYXkob3ZlcmxheSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIG92ZXJsYXkgPSBzZWFyY2hPdmVybGF5KHF1ZXJ5KTtcbiAgICAgICAgICBjbS5hZGRPdmVybGF5KG92ZXJsYXkpO1xuICAgICAgICAgIGlmIChjbS5zaG93TWF0Y2hlc09uU2Nyb2xsYmFyKSB7XG4gICAgICAgICAgICBpZiAoc2VhcmNoU3RhdGUuZ2V0U2Nyb2xsYmFyQW5ub3RhdGUoKSkge1xuICAgICAgICAgICAgICBzZWFyY2hTdGF0ZS5nZXRTY3JvbGxiYXJBbm5vdGF0ZSgpLmNsZWFyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWFyY2hTdGF0ZS5zZXRTY3JvbGxiYXJBbm5vdGF0ZShjbS5zaG93TWF0Y2hlc09uU2Nyb2xsYmFyKHF1ZXJ5KSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHNlYXJjaFN0YXRlLnNldE92ZXJsYXkob3ZlcmxheSk7XG4gICAgICAgIH1cbiAgICAgIH0sIDUwKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZmluZE5leHQoY20sIHByZXYsIHF1ZXJ5LCByZXBlYXQpIHtcbiAgICAgIGlmIChyZXBlYXQgPT09IHVuZGVmaW5lZCkgeyByZXBlYXQgPSAxOyB9XG4gICAgICByZXR1cm4gY20ub3BlcmF0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcG9zID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgIHZhciBjdXJzb3IgPSBjbS5nZXRTZWFyY2hDdXJzb3IocXVlcnksIHBvcyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwZWF0OyBpKyspIHtcbiAgICAgICAgICB2YXIgZm91bmQgPSBjdXJzb3IuZmluZChwcmV2KTtcbiAgICAgICAgICBpZiAoaSA9PSAwICYmIGZvdW5kICYmIGN1cnNvckVxdWFsKGN1cnNvci5mcm9tKCksIHBvcykpIHtcbiAgICAgICAgICAgIHZhciBsYXN0RW5kUG9zID0gcHJldiA/IGN1cnNvci5mcm9tKCkgOiBjdXJzb3IudG8oKTtcbiAgICAgICAgICAgIGZvdW5kID0gY3Vyc29yLmZpbmQocHJldik7XG4gICAgICAgICAgICBpZiAoZm91bmQgJiYgIWZvdW5kWzBdICYmIGN1cnNvckVxdWFsKGN1cnNvci5mcm9tKCksIGxhc3RFbmRQb3MpKSB7XG4gICAgICAgICAgICAgIGlmIChjbS5nZXRMaW5lKGxhc3RFbmRQb3MubGluZSkubGVuZ3RoID09IGxhc3RFbmRQb3MuY2gpXG4gICAgICAgICAgICAgICAgZm91bmQgPSBjdXJzb3IuZmluZChwcmV2KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgLy8gU2VhcmNoQ3Vyc29yIG1heSBoYXZlIHJldHVybmVkIG51bGwgYmVjYXVzZSBpdCBoaXQgRU9GLCB3cmFwXG4gICAgICAgICAgICAvLyBhcm91bmQgYW5kIHRyeSBhZ2Fpbi5cbiAgICAgICAgICAgIGN1cnNvciA9IGNtLmdldFNlYXJjaEN1cnNvcihxdWVyeSxcbiAgICAgICAgICAgICAgICAocHJldikgPyBuZXcgUG9zKGNtLmxhc3RMaW5lKCkpIDogbmV3IFBvcyhjbS5maXJzdExpbmUoKSwgMCkgKTtcbiAgICAgICAgICAgIGlmICghY3Vyc29yLmZpbmQocHJldikpIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY3Vyc29yLmZyb20oKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcmV0dHkgbXVjaCB0aGUgc2FtZSBhcyBgZmluZE5leHRgLCBleGNlcHQgZm9yIHRoZSBmb2xsb3dpbmcgZGlmZmVyZW5jZXM6XG4gICAgICpcbiAgICAgKiAxLiBCZWZvcmUgc3RhcnRpbmcgdGhlIHNlYXJjaCwgbW92ZSB0byB0aGUgcHJldmlvdXMgc2VhcmNoLiBUaGlzIHdheSBpZiBvdXIgY3Vyc29yIGlzXG4gICAgICogYWxyZWFkeSBpbnNpZGUgYSBtYXRjaCwgd2Ugc2hvdWxkIHJldHVybiB0aGUgY3VycmVudCBtYXRjaC5cbiAgICAgKiAyLiBSYXRoZXIgdGhhbiBvbmx5IHJldHVybmluZyB0aGUgY3Vyc29yJ3MgZnJvbSwgd2UgcmV0dXJuIHRoZSBjdXJzb3IncyBmcm9tIGFuZCB0byBhcyBhIHR1cGxlLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIGZpbmROZXh0RnJvbUFuZFRvSW5jbHVzaXZlKGNtLCBwcmV2LCBxdWVyeSwgcmVwZWF0LCB2aW0pIHtcbiAgICAgIGlmIChyZXBlYXQgPT09IHVuZGVmaW5lZCkgeyByZXBlYXQgPSAxOyB9XG4gICAgICByZXR1cm4gY20ub3BlcmF0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcG9zID0gY20uZ2V0Q3Vyc29yKCk7XG4gICAgICAgIHZhciBjdXJzb3IgPSBjbS5nZXRTZWFyY2hDdXJzb3IocXVlcnksIHBvcyk7XG5cbiAgICAgICAgLy8gR28gYmFjayBvbmUgcmVzdWx0IHRvIGVuc3VyZSB0aGF0IGlmIHRoZSBjdXJzb3IgaXMgY3VycmVudGx5IGEgbWF0Y2gsIHdlIGtlZXAgaXQuXG4gICAgICAgIHZhciBmb3VuZCA9IGN1cnNvci5maW5kKCFwcmV2KTtcblxuICAgICAgICAvLyBJZiB3ZSBoYXZlbid0IG1vdmVkLCBnbyBiYWNrIG9uZSBtb3JlIChzaW1pbGFyIHRvIGlmIGk9PTAgbG9naWMgaW4gZmluZE5leHQpLlxuICAgICAgICBpZiAoIXZpbS52aXN1YWxNb2RlICYmIGZvdW5kICYmIGN1cnNvckVxdWFsKGN1cnNvci5mcm9tKCksIHBvcykpIHtcbiAgICAgICAgICBjdXJzb3IuZmluZCghcHJldik7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcGVhdDsgaSsrKSB7XG4gICAgICAgICAgZm91bmQgPSBjdXJzb3IuZmluZChwcmV2KTtcbiAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAvLyBTZWFyY2hDdXJzb3IgbWF5IGhhdmUgcmV0dXJuZWQgbnVsbCBiZWNhdXNlIGl0IGhpdCBFT0YsIHdyYXBcbiAgICAgICAgICAgIC8vIGFyb3VuZCBhbmQgdHJ5IGFnYWluLlxuICAgICAgICAgICAgY3Vyc29yID0gY20uZ2V0U2VhcmNoQ3Vyc29yKHF1ZXJ5LFxuICAgICAgICAgICAgICAgIChwcmV2KSA/IG5ldyBQb3MoY20ubGFzdExpbmUoKSkgOiBuZXcgUG9zKGNtLmZpcnN0TGluZSgpLCAwKSApO1xuICAgICAgICAgICAgaWYgKCFjdXJzb3IuZmluZChwcmV2KSkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbY3Vyc29yLmZyb20oKSwgY3Vyc29yLnRvKCldO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNsZWFyU2VhcmNoSGlnaGxpZ2h0KGNtKSB7XG4gICAgICB2YXIgc3RhdGUgPSBnZXRTZWFyY2hTdGF0ZShjbSk7XG4gICAgICBjbS5yZW1vdmVPdmVybGF5KGdldFNlYXJjaFN0YXRlKGNtKS5nZXRPdmVybGF5KCkpO1xuICAgICAgc3RhdGUuc2V0T3ZlcmxheShudWxsKTtcbiAgICAgIGlmIChzdGF0ZS5nZXRTY3JvbGxiYXJBbm5vdGF0ZSgpKSB7XG4gICAgICAgIHN0YXRlLmdldFNjcm9sbGJhckFubm90YXRlKCkuY2xlYXIoKTtcbiAgICAgICAgc3RhdGUuc2V0U2Nyb2xsYmFyQW5ub3RhdGUobnVsbCk7XG4gICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHBvcyBpcyBpbiB0aGUgc3BlY2lmaWVkIHJhbmdlLCBJTkNMVVNJVkUuXG4gICAgICogUmFuZ2UgY2FuIGJlIHNwZWNpZmllZCB3aXRoIDEgb3IgMiBhcmd1bWVudHMuXG4gICAgICogSWYgdGhlIGZpcnN0IHJhbmdlIGFyZ3VtZW50IGlzIGFuIGFycmF5LCB0cmVhdCBpdCBhcyBhbiBhcnJheSBvZiBsaW5lXG4gICAgICogbnVtYmVycy4gTWF0Y2ggcG9zIGFnYWluc3QgYW55IG9mIHRoZSBsaW5lcy5cbiAgICAgKiBJZiB0aGUgZmlyc3QgcmFuZ2UgYXJndW1lbnQgaXMgYSBudW1iZXIsXG4gICAgICogICBpZiB0aGVyZSBpcyBvbmx5IDEgcmFuZ2UgYXJndW1lbnQsIGNoZWNrIGlmIHBvcyBoYXMgdGhlIHNhbWUgbGluZVxuICAgICAqICAgICAgIG51bWJlclxuICAgICAqICAgaWYgdGhlcmUgYXJlIDIgcmFuZ2UgYXJndW1lbnRzLCB0aGVuIGNoZWNrIGlmIHBvcyBpcyBpbiBiZXR3ZWVuIHRoZSB0d29cbiAgICAgKiAgICAgICByYW5nZSBhcmd1bWVudHMuXG4gICAgICovXG4gICAgZnVuY3Rpb24gaXNJblJhbmdlKHBvcywgc3RhcnQsIGVuZCkge1xuICAgICAgaWYgKHR5cGVvZiBwb3MgIT0gJ251bWJlcicpIHtcbiAgICAgICAgLy8gQXNzdW1lIGl0IGlzIGEgY3Vyc29yIHBvc2l0aW9uLiBHZXQgdGhlIGxpbmUgbnVtYmVyLlxuICAgICAgICBwb3MgPSBwb3MubGluZTtcbiAgICAgIH1cbiAgICAgIGlmIChzdGFydCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHJldHVybiBpbkFycmF5KHBvcywgc3RhcnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHR5cGVvZiBlbmQgPT0gJ251bWJlcicpIHtcbiAgICAgICAgICByZXR1cm4gKHBvcyA+PSBzdGFydCAmJiBwb3MgPD0gZW5kKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcG9zID09IHN0YXJ0O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldFVzZXJWaXNpYmxlTGluZXMoY20pIHtcbiAgICAgIC8vIGFjZV9wYXRjaHtcbiAgICAgIHZhciByZW5kZXJlciA9IGNtLmFjZS5yZW5kZXJlcjtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRvcDogcmVuZGVyZXIuZ2V0Rmlyc3RGdWxseVZpc2libGVSb3coKSxcbiAgICAgICAgYm90dG9tOiByZW5kZXJlci5nZXRMYXN0RnVsbHlWaXNpYmxlUm93KClcbiAgICAgIH1cbiAgICAgIC8vIGFjZV9wYXRjaH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRNYXJrUG9zKGNtLCB2aW0sIG1hcmtOYW1lKSB7XG4gICAgICBpZiAobWFya05hbWUgPT0gJ1xcJycgfHwgbWFya05hbWUgPT0gJ2AnKSB7XG4gICAgICAgIHJldHVybiB2aW1HbG9iYWxTdGF0ZS5qdW1wTGlzdC5maW5kKGNtLCAtMSkgfHwgbmV3IFBvcygwLCAwKTtcbiAgICAgIH0gZWxzZSBpZiAobWFya05hbWUgPT0gJy4nKSB7XG4gICAgICAgIHJldHVybiBnZXRMYXN0RWRpdFBvcyhjbSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBtYXJrID0gdmltLm1hcmtzW21hcmtOYW1lXTtcbiAgICAgIHJldHVybiBtYXJrICYmIG1hcmsuZmluZCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldExhc3RFZGl0UG9zKGNtKSB7XG4gICAgICAvLyBhY2VfcGF0Y2h7XG4gICAgICB2YXIgdW5kb01hbmFnZXIgPSBjbS5hY2Uuc2Vzc2lvbi4kdW5kb01hbmFnZXI7XG4gICAgICBpZiAodW5kb01hbmFnZXIgJiYgdW5kb01hbmFnZXIuJGxhc3REZWx0YSlcbiAgICAgICAgcmV0dXJuIHRvQ21Qb3ModW5kb01hbmFnZXIuJGxhc3REZWx0YS5lbmQpO1xuICAgICAgLy8gYWNlX3BhdGNofVxuICAgIH1cblxuICAgIHZhciBFeENvbW1hbmREaXNwYXRjaGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmJ1aWxkQ29tbWFuZE1hcF8oKTtcbiAgICB9O1xuICAgIEV4Q29tbWFuZERpc3BhdGNoZXIucHJvdG90eXBlID0ge1xuICAgICAgcHJvY2Vzc0NvbW1hbmQ6IGZ1bmN0aW9uKGNtLCBpbnB1dCwgb3B0X3BhcmFtcykge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIGNtLm9wZXJhdGlvbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgY20uY3VyT3AuaXNWaW1PcCA9IHRydWU7XG4gICAgICAgICAgdGhhdC5fcHJvY2Vzc0NvbW1hbmQoY20sIGlucHV0LCBvcHRfcGFyYW1zKTtcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgX3Byb2Nlc3NDb21tYW5kOiBmdW5jdGlvbihjbSwgaW5wdXQsIG9wdF9wYXJhbXMpIHtcbiAgICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgICAgdmFyIGNvbW1hbmRIaXN0b3J5UmVnaXN0ZXIgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIuZ2V0UmVnaXN0ZXIoJzonKTtcbiAgICAgICAgdmFyIHByZXZpb3VzQ29tbWFuZCA9IGNvbW1hbmRIaXN0b3J5UmVnaXN0ZXIudG9TdHJpbmcoKTtcbiAgICAgICAgaWYgKHZpbS52aXN1YWxNb2RlKSB7XG4gICAgICAgICAgZXhpdFZpc3VhbE1vZGUoY20pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBpbnB1dFN0cmVhbSA9IG5ldyBDb2RlTWlycm9yLlN0cmluZ1N0cmVhbShpbnB1dCk7XG4gICAgICAgIC8vIHVwZGF0ZSBcIjogd2l0aCB0aGUgbGF0ZXN0IGNvbW1hbmQgd2hldGhlciB2YWxpZCBvciBpbnZhbGlkXG4gICAgICAgIGNvbW1hbmRIaXN0b3J5UmVnaXN0ZXIuc2V0VGV4dChpbnB1dCk7XG4gICAgICAgIHZhciBwYXJhbXMgPSBvcHRfcGFyYW1zIHx8IHt9O1xuICAgICAgICBwYXJhbXMuaW5wdXQgPSBpbnB1dDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB0aGlzLnBhcnNlSW5wdXRfKGNtLCBpbnB1dFN0cmVhbSwgcGFyYW1zKTtcbiAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgc2hvd0NvbmZpcm0oY20sIGUudG9TdHJpbmcoKSk7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29tbWFuZDtcbiAgICAgICAgdmFyIGNvbW1hbmROYW1lO1xuICAgICAgICBpZiAoIXBhcmFtcy5jb21tYW5kTmFtZSkge1xuICAgICAgICAgIC8vIElmIG9ubHkgYSBsaW5lIHJhbmdlIGlzIGRlZmluZWQsIG1vdmUgdG8gdGhlIGxpbmUuXG4gICAgICAgICAgaWYgKHBhcmFtcy5saW5lICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGNvbW1hbmROYW1lID0gJ21vdmUnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb21tYW5kID0gdGhpcy5tYXRjaENvbW1hbmRfKHBhcmFtcy5jb21tYW5kTmFtZSk7XG4gICAgICAgICAgaWYgKGNvbW1hbmQpIHtcbiAgICAgICAgICAgIGNvbW1hbmROYW1lID0gY29tbWFuZC5uYW1lO1xuICAgICAgICAgICAgaWYgKGNvbW1hbmQuZXhjbHVkZUZyb21Db21tYW5kSGlzdG9yeSkge1xuICAgICAgICAgICAgICBjb21tYW5kSGlzdG9yeVJlZ2lzdGVyLnNldFRleHQocHJldmlvdXNDb21tYW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucGFyc2VDb21tYW5kQXJnc18oaW5wdXRTdHJlYW0sIHBhcmFtcywgY29tbWFuZCk7XG4gICAgICAgICAgICBpZiAoY29tbWFuZC50eXBlID09ICdleFRvS2V5Jykge1xuICAgICAgICAgICAgICAvLyBIYW5kbGUgRXggdG8gS2V5IG1hcHBpbmcuXG4gICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29tbWFuZC50b0tleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2aW1BcGkuaGFuZGxlS2V5KGNtLCBjb21tYW5kLnRvS2V5c1tpXSwgJ21hcHBpbmcnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbW1hbmQudHlwZSA9PSAnZXhUb0V4Jykge1xuICAgICAgICAgICAgICAvLyBIYW5kbGUgRXggdG8gRXggbWFwcGluZy5cbiAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzQ29tbWFuZChjbSwgY29tbWFuZC50b0lucHV0KTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIWNvbW1hbmROYW1lKSB7XG4gICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdOb3QgYW4gZWRpdG9yIGNvbW1hbmQgXCI6JyArIGlucHV0ICsgJ1wiJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZXhDb21tYW5kc1tjb21tYW5kTmFtZV0oY20sIHBhcmFtcyk7XG4gICAgICAgICAgLy8gUG9zc2libHkgYXN5bmNocm9ub3VzIGNvbW1hbmRzIChlLmcuIHN1YnN0aXR1dGUsIHdoaWNoIG1pZ2h0IGhhdmUgYVxuICAgICAgICAgIC8vIHVzZXIgY29uZmlybWF0aW9uKSwgYXJlIHJlc3BvbnNpYmxlIGZvciBjYWxsaW5nIHRoZSBjYWxsYmFjayB3aGVuXG4gICAgICAgICAgLy8gZG9uZS4gQWxsIG90aGVycyBoYXZlIGl0IHRha2VuIGNhcmUgb2YgZm9yIHRoZW0gaGVyZS5cbiAgICAgICAgICBpZiAoKCFjb21tYW5kIHx8ICFjb21tYW5kLnBvc3NpYmx5QXN5bmMpICYmIHBhcmFtcy5jYWxsYmFjaykge1xuICAgICAgICAgICAgcGFyYW1zLmNhbGxiYWNrKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICBzaG93Q29uZmlybShjbSwgZS50b1N0cmluZygpKTtcbiAgICAgICAgICB0aHJvdyBlO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcGFyc2VJbnB1dF86IGZ1bmN0aW9uKGNtLCBpbnB1dFN0cmVhbSwgcmVzdWx0KSB7XG4gICAgICAgIGlucHV0U3RyZWFtLmVhdFdoaWxlKCc6Jyk7XG4gICAgICAgIC8vIFBhcnNlIHJhbmdlLlxuICAgICAgICBpZiAoaW5wdXRTdHJlYW0uZWF0KCclJykpIHtcbiAgICAgICAgICByZXN1bHQubGluZSA9IGNtLmZpcnN0TGluZSgpO1xuICAgICAgICAgIHJlc3VsdC5saW5lRW5kID0gY20ubGFzdExpbmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHQubGluZSA9IHRoaXMucGFyc2VMaW5lU3BlY18oY20sIGlucHV0U3RyZWFtKTtcbiAgICAgICAgICBpZiAocmVzdWx0LmxpbmUgIT09IHVuZGVmaW5lZCAmJiBpbnB1dFN0cmVhbS5lYXQoJywnKSkge1xuICAgICAgICAgICAgcmVzdWx0LmxpbmVFbmQgPSB0aGlzLnBhcnNlTGluZVNwZWNfKGNtLCBpbnB1dFN0cmVhbSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUGFyc2UgY29tbWFuZCBuYW1lLlxuICAgICAgICB2YXIgY29tbWFuZE1hdGNoID0gaW5wdXRTdHJlYW0ubWF0Y2goL14oXFx3K3whIXxAQHxbISMmKjw9PkB+XSkvKTtcbiAgICAgICAgaWYgKGNvbW1hbmRNYXRjaCkge1xuICAgICAgICAgIHJlc3VsdC5jb21tYW5kTmFtZSA9IGNvbW1hbmRNYXRjaFsxXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXN1bHQuY29tbWFuZE5hbWUgPSBpbnB1dFN0cmVhbS5tYXRjaCgvLiovKVswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICB9LFxuICAgICAgcGFyc2VMaW5lU3BlY186IGZ1bmN0aW9uKGNtLCBpbnB1dFN0cmVhbSkge1xuICAgICAgICB2YXIgbnVtYmVyTWF0Y2ggPSBpbnB1dFN0cmVhbS5tYXRjaCgvXihcXGQrKS8pO1xuICAgICAgICBpZiAobnVtYmVyTWF0Y2gpIHtcbiAgICAgICAgICAvLyBBYnNvbHV0ZSBsaW5lIG51bWJlciBwbHVzIG9mZnNldCAoTitNIG9yIE4tTSkgaXMgcHJvYmFibHkgYSB0eXBvLFxuICAgICAgICAgIC8vIG5vdCBzb21ldGhpbmcgdGhlIHVzZXIgYWN0dWFsbHkgd2FudGVkLiAoTkI6IHZpbSBkb2VzIGFsbG93IHRoaXMuKVxuICAgICAgICAgIHJldHVybiBwYXJzZUludChudW1iZXJNYXRjaFsxXSwgMTApIC0gMTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGlucHV0U3RyZWFtLm5leHQoKSkge1xuICAgICAgICAgIGNhc2UgJy4nOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VMaW5lU3BlY09mZnNldF8oaW5wdXRTdHJlYW0sIGNtLmdldEN1cnNvcigpLmxpbmUpO1xuICAgICAgICAgIGNhc2UgJyQnOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VMaW5lU3BlY09mZnNldF8oaW5wdXRTdHJlYW0sIGNtLmxhc3RMaW5lKCkpO1xuICAgICAgICAgIGNhc2UgJ1xcJyc6XG4gICAgICAgICAgICB2YXIgbWFya05hbWUgPSBpbnB1dFN0cmVhbS5uZXh0KCk7XG4gICAgICAgICAgICB2YXIgbWFya1BvcyA9IGdldE1hcmtQb3MoY20sIGNtLnN0YXRlLnZpbSwgbWFya05hbWUpO1xuICAgICAgICAgICAgaWYgKCFtYXJrUG9zKSB0aHJvdyBuZXcgRXJyb3IoJ01hcmsgbm90IHNldCcpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VMaW5lU3BlY09mZnNldF8oaW5wdXRTdHJlYW0sIG1hcmtQb3MubGluZSk7XG4gICAgICAgICAgY2FzZSAnLSc6XG4gICAgICAgICAgY2FzZSAnKyc6XG4gICAgICAgICAgICBpbnB1dFN0cmVhbS5iYWNrVXAoMSk7XG4gICAgICAgICAgICAvLyBPZmZzZXQgaXMgcmVsYXRpdmUgdG8gY3VycmVudCBsaW5lIGlmIG5vdCBvdGhlcndpc2Ugc3BlY2lmaWVkLlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGFyc2VMaW5lU3BlY09mZnNldF8oaW5wdXRTdHJlYW0sIGNtLmdldEN1cnNvcigpLmxpbmUpO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpbnB1dFN0cmVhbS5iYWNrVXAoMSk7XG4gICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcGFyc2VMaW5lU3BlY09mZnNldF86IGZ1bmN0aW9uKGlucHV0U3RyZWFtLCBsaW5lKSB7XG4gICAgICAgIHZhciBvZmZzZXRNYXRjaCA9IGlucHV0U3RyZWFtLm1hdGNoKC9eKFsrLV0pPyhcXGQrKS8pO1xuICAgICAgICBpZiAob2Zmc2V0TWF0Y2gpIHtcbiAgICAgICAgICB2YXIgb2Zmc2V0ID0gcGFyc2VJbnQob2Zmc2V0TWF0Y2hbMl0sIDEwKTtcbiAgICAgICAgICBpZiAob2Zmc2V0TWF0Y2hbMV0gPT0gXCItXCIpIHtcbiAgICAgICAgICAgIGxpbmUgLT0gb2Zmc2V0O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaW5lICs9IG9mZnNldDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpbmU7XG4gICAgICB9LFxuICAgICAgcGFyc2VDb21tYW5kQXJnc186IGZ1bmN0aW9uKGlucHV0U3RyZWFtLCBwYXJhbXMsIGNvbW1hbmQpIHtcbiAgICAgICAgaWYgKGlucHV0U3RyZWFtLmVvbCgpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHBhcmFtcy5hcmdTdHJpbmcgPSBpbnB1dFN0cmVhbS5tYXRjaCgvLiovKVswXTtcbiAgICAgICAgLy8gUGFyc2UgY29tbWFuZC1saW5lIGFyZ3VtZW50c1xuICAgICAgICB2YXIgZGVsaW0gPSBjb21tYW5kLmFyZ0RlbGltaXRlciB8fCAvXFxzKy87XG4gICAgICAgIHZhciBhcmdzID0gdHJpbShwYXJhbXMuYXJnU3RyaW5nKS5zcGxpdChkZWxpbSk7XG4gICAgICAgIGlmIChhcmdzLmxlbmd0aCAmJiBhcmdzWzBdKSB7XG4gICAgICAgICAgcGFyYW1zLmFyZ3MgPSBhcmdzO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWF0Y2hDb21tYW5kXzogZnVuY3Rpb24oY29tbWFuZE5hbWUpIHtcbiAgICAgICAgLy8gUmV0dXJuIHRoZSBjb21tYW5kIGluIHRoZSBjb21tYW5kIG1hcCB0aGF0IG1hdGNoZXMgdGhlIHNob3J0ZXN0XG4gICAgICAgIC8vIHByZWZpeCBvZiB0aGUgcGFzc2VkIGluIGNvbW1hbmQgbmFtZS4gVGhlIG1hdGNoIGlzIGd1YXJhbnRlZWQgdG8gYmVcbiAgICAgICAgLy8gdW5hbWJpZ3VvdXMgaWYgdGhlIGRlZmF1bHRFeENvbW1hbmRNYXAncyBzaG9ydE5hbWVzIGFyZSBzZXQgdXBcbiAgICAgICAgLy8gY29ycmVjdGx5LiAoc2VlIEBjb2Rle2RlZmF1bHRFeENvbW1hbmRNYXB9KS5cbiAgICAgICAgZm9yICh2YXIgaSA9IGNvbW1hbmROYW1lLmxlbmd0aDsgaSA+IDA7IGktLSkge1xuICAgICAgICAgIHZhciBwcmVmaXggPSBjb21tYW5kTmFtZS5zdWJzdHJpbmcoMCwgaSk7XG4gICAgICAgICAgaWYgKHRoaXMuY29tbWFuZE1hcF9bcHJlZml4XSkge1xuICAgICAgICAgICAgdmFyIGNvbW1hbmQgPSB0aGlzLmNvbW1hbmRNYXBfW3ByZWZpeF07XG4gICAgICAgICAgICBpZiAoY29tbWFuZC5uYW1lLmluZGV4T2YoY29tbWFuZE5hbWUpID09PSAwKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjb21tYW5kO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH0sXG4gICAgICBidWlsZENvbW1hbmRNYXBfOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jb21tYW5kTWFwXyA9IHt9O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlZmF1bHRFeENvbW1hbmRNYXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICB2YXIgY29tbWFuZCA9IGRlZmF1bHRFeENvbW1hbmRNYXBbaV07XG4gICAgICAgICAgdmFyIGtleSA9IGNvbW1hbmQuc2hvcnROYW1lIHx8IGNvbW1hbmQubmFtZTtcbiAgICAgICAgICB0aGlzLmNvbW1hbmRNYXBfW2tleV0gPSBjb21tYW5kO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbWFwOiBmdW5jdGlvbihsaHMsIHJocywgY3R4KSB7XG4gICAgICAgIGlmIChsaHMgIT0gJzonICYmIGxocy5jaGFyQXQoMCkgPT0gJzonKSB7XG4gICAgICAgICAgaWYgKGN0eCkgeyB0aHJvdyBFcnJvcignTW9kZSBub3Qgc3VwcG9ydGVkIGZvciBleCBtYXBwaW5ncycpOyB9XG4gICAgICAgICAgdmFyIGNvbW1hbmROYW1lID0gbGhzLnN1YnN0cmluZygxKTtcbiAgICAgICAgICBpZiAocmhzICE9ICc6JyAmJiByaHMuY2hhckF0KDApID09ICc6Jykge1xuICAgICAgICAgICAgLy8gRXggdG8gRXggbWFwcGluZ1xuICAgICAgICAgICAgdGhpcy5jb21tYW5kTWFwX1tjb21tYW5kTmFtZV0gPSB7XG4gICAgICAgICAgICAgIG5hbWU6IGNvbW1hbmROYW1lLFxuICAgICAgICAgICAgICB0eXBlOiAnZXhUb0V4JyxcbiAgICAgICAgICAgICAgdG9JbnB1dDogcmhzLnN1YnN0cmluZygxKSxcbiAgICAgICAgICAgICAgdXNlcjogdHJ1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gRXggdG8ga2V5IG1hcHBpbmdcbiAgICAgICAgICAgIHRoaXMuY29tbWFuZE1hcF9bY29tbWFuZE5hbWVdID0ge1xuICAgICAgICAgICAgICBuYW1lOiBjb21tYW5kTmFtZSxcbiAgICAgICAgICAgICAgdHlwZTogJ2V4VG9LZXknLFxuICAgICAgICAgICAgICB0b0tleXM6IHJocyxcbiAgICAgICAgICAgICAgdXNlcjogdHJ1ZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKHJocyAhPSAnOicgJiYgcmhzLmNoYXJBdCgwKSA9PSAnOicpIHtcbiAgICAgICAgICAgIC8vIEtleSB0byBFeCBtYXBwaW5nLlxuICAgICAgICAgICAgdmFyIG1hcHBpbmcgPSB7XG4gICAgICAgICAgICAgIGtleXM6IGxocyxcbiAgICAgICAgICAgICAgdHlwZTogJ2tleVRvRXgnLFxuICAgICAgICAgICAgICBleEFyZ3M6IHsgaW5wdXQ6IHJocy5zdWJzdHJpbmcoMSkgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChjdHgpIHsgbWFwcGluZy5jb250ZXh0ID0gY3R4OyB9XG4gICAgICAgICAgICBkZWZhdWx0S2V5bWFwLnVuc2hpZnQobWFwcGluZyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIEtleSB0byBrZXkgbWFwcGluZ1xuICAgICAgICAgICAgdmFyIG1hcHBpbmcgPSB7XG4gICAgICAgICAgICAgIGtleXM6IGxocyxcbiAgICAgICAgICAgICAgdHlwZTogJ2tleVRvS2V5JyxcbiAgICAgICAgICAgICAgdG9LZXlzOiByaHNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoY3R4KSB7IG1hcHBpbmcuY29udGV4dCA9IGN0eDsgfVxuICAgICAgICAgICAgZGVmYXVsdEtleW1hcC51bnNoaWZ0KG1hcHBpbmcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHVubWFwOiBmdW5jdGlvbihsaHMsIGN0eCkge1xuICAgICAgICBpZiAobGhzICE9ICc6JyAmJiBsaHMuY2hhckF0KDApID09ICc6Jykge1xuICAgICAgICAgIC8vIEV4IHRvIEV4IG9yIEV4IHRvIGtleSBtYXBwaW5nXG4gICAgICAgICAgaWYgKGN0eCkgeyB0aHJvdyBFcnJvcignTW9kZSBub3Qgc3VwcG9ydGVkIGZvciBleCBtYXBwaW5ncycpOyB9XG4gICAgICAgICAgdmFyIGNvbW1hbmROYW1lID0gbGhzLnN1YnN0cmluZygxKTtcbiAgICAgICAgICBpZiAodGhpcy5jb21tYW5kTWFwX1tjb21tYW5kTmFtZV0gJiYgdGhpcy5jb21tYW5kTWFwX1tjb21tYW5kTmFtZV0udXNlcikge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY29tbWFuZE1hcF9bY29tbWFuZE5hbWVdO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEtleSB0byBFeCBvciBrZXkgdG8ga2V5IG1hcHBpbmdcbiAgICAgICAgICB2YXIga2V5cyA9IGxocztcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRlZmF1bHRLZXltYXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChrZXlzID09IGRlZmF1bHRLZXltYXBbaV0ua2V5c1xuICAgICAgICAgICAgICAgICYmIGRlZmF1bHRLZXltYXBbaV0uY29udGV4dCA9PT0gY3R4KSB7XG4gICAgICAgICAgICAgIGRlZmF1bHRLZXltYXAuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIGV4Q29tbWFuZHMgPSB7XG4gICAgICBjb2xvcnNjaGVtZTogZnVuY3Rpb24oY20sIHBhcmFtcykge1xuICAgICAgICBpZiAoIXBhcmFtcy5hcmdzIHx8IHBhcmFtcy5hcmdzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICBzaG93Q29uZmlybShjbSwgY20uZ2V0T3B0aW9uKCd0aGVtZScpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY20uc2V0T3B0aW9uKCd0aGVtZScsIHBhcmFtcy5hcmdzWzBdKTtcbiAgICAgIH0sXG4gICAgICBtYXA6IGZ1bmN0aW9uKGNtLCBwYXJhbXMsIGN0eCkge1xuICAgICAgICB2YXIgbWFwQXJncyA9IHBhcmFtcy5hcmdzO1xuICAgICAgICBpZiAoIW1hcEFyZ3MgfHwgbWFwQXJncy5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgaWYgKGNtKSB7XG4gICAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ0ludmFsaWQgbWFwcGluZzogJyArIHBhcmFtcy5pbnB1dCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBleENvbW1hbmREaXNwYXRjaGVyLm1hcChtYXBBcmdzWzBdLCBtYXBBcmdzWzFdLCBjdHgpO1xuICAgICAgfSxcbiAgICAgIGltYXA6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHsgdGhpcy5tYXAoY20sIHBhcmFtcywgJ2luc2VydCcpOyB9LFxuICAgICAgbm1hcDogZnVuY3Rpb24oY20sIHBhcmFtcykgeyB0aGlzLm1hcChjbSwgcGFyYW1zLCAnbm9ybWFsJyk7IH0sXG4gICAgICB2bWFwOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7IHRoaXMubWFwKGNtLCBwYXJhbXMsICd2aXN1YWwnKTsgfSxcbiAgICAgIHVubWFwOiBmdW5jdGlvbihjbSwgcGFyYW1zLCBjdHgpIHtcbiAgICAgICAgdmFyIG1hcEFyZ3MgPSBwYXJhbXMuYXJncztcbiAgICAgICAgaWYgKCFtYXBBcmdzIHx8IG1hcEFyZ3MubGVuZ3RoIDwgMSB8fCAhZXhDb21tYW5kRGlzcGF0Y2hlci51bm1hcChtYXBBcmdzWzBdLCBjdHgpKSB7XG4gICAgICAgICAgaWYgKGNtKSB7XG4gICAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ05vIHN1Y2ggbWFwcGluZzogJyArIHBhcmFtcy5pbnB1dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbW92ZTogZnVuY3Rpb24oY20sIHBhcmFtcykge1xuICAgICAgICBjb21tYW5kRGlzcGF0Y2hlci5wcm9jZXNzQ29tbWFuZChjbSwgY20uc3RhdGUudmltLCB7XG4gICAgICAgICAgICB0eXBlOiAnbW90aW9uJyxcbiAgICAgICAgICAgIG1vdGlvbjogJ21vdmVUb0xpbmVPckVkZ2VPZkRvY3VtZW50JyxcbiAgICAgICAgICAgIG1vdGlvbkFyZ3M6IHsgZm9yd2FyZDogZmFsc2UsIGV4cGxpY2l0UmVwZWF0OiB0cnVlLFxuICAgICAgICAgICAgICBsaW5ld2lzZTogdHJ1ZSB9LFxuICAgICAgICAgICAgcmVwZWF0T3ZlcnJpZGU6IHBhcmFtcy5saW5lKzF9KTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgdmFyIHNldEFyZ3MgPSBwYXJhbXMuYXJncztcbiAgICAgICAgLy8gT3B0aW9ucyBwYXNzZWQgdGhyb3VnaCB0byB0aGUgc2V0T3B0aW9uL2dldE9wdGlvbiBjYWxscy4gTWF5IGJlIHBhc3NlZCBpbiBieSB0aGVcbiAgICAgICAgLy8gbG9jYWwvZ2xvYmFsIHZlcnNpb25zIG9mIHRoZSBzZXQgY29tbWFuZFxuICAgICAgICB2YXIgc2V0Q2ZnID0gcGFyYW1zLnNldENmZyB8fCB7fTtcbiAgICAgICAgaWYgKCFzZXRBcmdzIHx8IHNldEFyZ3MubGVuZ3RoIDwgMSkge1xuICAgICAgICAgIGlmIChjbSkge1xuICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdJbnZhbGlkIG1hcHBpbmc6ICcgKyBwYXJhbXMuaW5wdXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGV4cHIgPSBzZXRBcmdzWzBdLnNwbGl0KCc9Jyk7XG4gICAgICAgIHZhciBvcHRpb25OYW1lID0gZXhwclswXTtcbiAgICAgICAgdmFyIHZhbHVlID0gZXhwclsxXTtcbiAgICAgICAgdmFyIGZvcmNlR2V0ID0gZmFsc2U7XG5cbiAgICAgICAgaWYgKG9wdGlvbk5hbWUuY2hhckF0KG9wdGlvbk5hbWUubGVuZ3RoIC0gMSkgPT0gJz8nKSB7XG4gICAgICAgICAgLy8gSWYgcG9zdC1maXhlZCB3aXRoID8sIHRoZW4gdGhlIHNldCBpcyBhY3R1YWxseSBhIGdldC5cbiAgICAgICAgICBpZiAodmFsdWUpIHsgdGhyb3cgRXJyb3IoJ1RyYWlsaW5nIGNoYXJhY3RlcnM6ICcgKyBwYXJhbXMuYXJnU3RyaW5nKTsgfVxuICAgICAgICAgIG9wdGlvbk5hbWUgPSBvcHRpb25OYW1lLnN1YnN0cmluZygwLCBvcHRpb25OYW1lLmxlbmd0aCAtIDEpO1xuICAgICAgICAgIGZvcmNlR2V0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCAmJiBvcHRpb25OYW1lLnN1YnN0cmluZygwLCAyKSA9PSAnbm8nKSB7XG4gICAgICAgICAgLy8gVG8gc2V0IGJvb2xlYW4gb3B0aW9ucyB0byBmYWxzZSwgdGhlIG9wdGlvbiBuYW1lIGlzIHByZWZpeGVkIHdpdGhcbiAgICAgICAgICAvLyAnbm8nLlxuICAgICAgICAgIG9wdGlvbk5hbWUgPSBvcHRpb25OYW1lLnN1YnN0cmluZygyKTtcbiAgICAgICAgICB2YWx1ZSA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9wdGlvbklzQm9vbGVhbiA9IG9wdGlvbnNbb3B0aW9uTmFtZV0gJiYgb3B0aW9uc1tvcHRpb25OYW1lXS50eXBlID09ICdib29sZWFuJztcbiAgICAgICAgaWYgKG9wdGlvbklzQm9vbGVhbiAmJiB2YWx1ZSA9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBDYWxsaW5nIHNldCB3aXRoIGEgYm9vbGVhbiBvcHRpb24gc2V0cyBpdCB0byB0cnVlLlxuICAgICAgICAgIHZhbHVlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBubyB2YWx1ZSBpcyBwcm92aWRlZCwgdGhlbiB3ZSBhc3N1bWUgdGhpcyBpcyBhIGdldC5cbiAgICAgICAgaWYgKCFvcHRpb25Jc0Jvb2xlYW4gJiYgdmFsdWUgPT09IHVuZGVmaW5lZCB8fCBmb3JjZUdldCkge1xuICAgICAgICAgIHZhciBvbGRWYWx1ZSA9IGdldE9wdGlvbihvcHRpb25OYW1lLCBjbSwgc2V0Q2ZnKTtcbiAgICAgICAgICBpZiAob2xkVmFsdWUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sIG9sZFZhbHVlLm1lc3NhZ2UpO1xuICAgICAgICAgIH0gZWxzZSBpZiAob2xkVmFsdWUgPT09IHRydWUgfHwgb2xkVmFsdWUgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBzaG93Q29uZmlybShjbSwgJyAnICsgKG9sZFZhbHVlID8gJycgOiAnbm8nKSArIG9wdGlvbk5hbWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzaG93Q29uZmlybShjbSwgJyAgJyArIG9wdGlvbk5hbWUgKyAnPScgKyBvbGRWYWx1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBzZXRPcHRpb25SZXR1cm4gPSBzZXRPcHRpb24ob3B0aW9uTmFtZSwgdmFsdWUsIGNtLCBzZXRDZmcpO1xuICAgICAgICAgIGlmIChzZXRPcHRpb25SZXR1cm4gaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sIHNldE9wdGlvblJldHVybi5tZXNzYWdlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzZXRsb2NhbDogZnVuY3Rpb24gKGNtLCBwYXJhbXMpIHtcbiAgICAgICAgLy8gc2V0Q2ZnIGlzIHBhc3NlZCB0aHJvdWdoIHRvIHNldE9wdGlvblxuICAgICAgICBwYXJhbXMuc2V0Q2ZnID0ge3Njb3BlOiAnbG9jYWwnfTtcbiAgICAgICAgdGhpcy5zZXQoY20sIHBhcmFtcyk7XG4gICAgICB9LFxuICAgICAgc2V0Z2xvYmFsOiBmdW5jdGlvbiAoY20sIHBhcmFtcykge1xuICAgICAgICAvLyBzZXRDZmcgaXMgcGFzc2VkIHRocm91Z2ggdG8gc2V0T3B0aW9uXG4gICAgICAgIHBhcmFtcy5zZXRDZmcgPSB7c2NvcGU6ICdnbG9iYWwnfTtcbiAgICAgICAgdGhpcy5zZXQoY20sIHBhcmFtcyk7XG4gICAgICB9LFxuICAgICAgcmVnaXN0ZXJzOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7XG4gICAgICAgIHZhciByZWdBcmdzID0gcGFyYW1zLmFyZ3M7XG4gICAgICAgIHZhciByZWdpc3RlcnMgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIucmVnaXN0ZXJzO1xuICAgICAgICB2YXIgcmVnSW5mbyA9ICctLS0tLS0tLS0tUmVnaXN0ZXJzLS0tLS0tLS0tLVxcblxcbic7XG4gICAgICAgIGlmICghcmVnQXJncykge1xuICAgICAgICAgIGZvciAodmFyIHJlZ2lzdGVyTmFtZSBpbiByZWdpc3RlcnMpIHtcbiAgICAgICAgICAgIHZhciB0ZXh0ID0gcmVnaXN0ZXJzW3JlZ2lzdGVyTmFtZV0udG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGlmICh0ZXh0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICByZWdJbmZvICs9ICdcIicgKyByZWdpc3Rlck5hbWUgKyAnICAgICcgKyB0ZXh0ICsgJ1xcbidcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHJlZ2lzdGVyTmFtZTtcbiAgICAgICAgICByZWdBcmdzID0gcmVnQXJncy5qb2luKCcnKTtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZ0FyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHJlZ2lzdGVyTmFtZSA9IHJlZ0FyZ3MuY2hhckF0KGkpO1xuICAgICAgICAgICAgaWYgKCF2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIuaXNWYWxpZFJlZ2lzdGVyKHJlZ2lzdGVyTmFtZSkpIHtcbiAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmVnaXN0ZXIgPSByZWdpc3RlcnNbcmVnaXN0ZXJOYW1lXSB8fCBuZXcgUmVnaXN0ZXIoKTtcbiAgICAgICAgICAgIHJlZ0luZm8gKz0gJ1wiJyArIHJlZ2lzdGVyTmFtZSArICcgICAgJyArIHJlZ2lzdGVyLnRvU3RyaW5nKCkgKyAnXFxuJ1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzaG93Q29uZmlybShjbSwgcmVnSW5mbyk7XG4gICAgICB9LFxuICAgICAgc29ydDogZnVuY3Rpb24oY20sIHBhcmFtcykge1xuICAgICAgICB2YXIgcmV2ZXJzZSwgaWdub3JlQ2FzZSwgdW5pcXVlLCBudW1iZXIsIHBhdHRlcm47XG4gICAgICAgIGZ1bmN0aW9uIHBhcnNlQXJncygpIHtcbiAgICAgICAgICBpZiAocGFyYW1zLmFyZ1N0cmluZykge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBuZXcgQ29kZU1pcnJvci5TdHJpbmdTdHJlYW0ocGFyYW1zLmFyZ1N0cmluZyk7XG4gICAgICAgICAgICBpZiAoYXJncy5lYXQoJyEnKSkgeyByZXZlcnNlID0gdHJ1ZTsgfVxuICAgICAgICAgICAgaWYgKGFyZ3MuZW9sKCkpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgICBpZiAoIWFyZ3MuZWF0U3BhY2UoKSkgeyByZXR1cm4gJ0ludmFsaWQgYXJndW1lbnRzJzsgfVxuICAgICAgICAgICAgdmFyIG9wdHMgPSBhcmdzLm1hdGNoKC8oW2RpbnVveF0rKT9cXHMqKFxcLy4rXFwvKT9cXHMqLyk7XG4gICAgICAgICAgICBpZiAoIW9wdHMgJiYgIWFyZ3MuZW9sKCkpIHsgcmV0dXJuICdJbnZhbGlkIGFyZ3VtZW50cyc7IH1cbiAgICAgICAgICAgIGlmIChvcHRzWzFdKSB7XG4gICAgICAgICAgICAgIGlnbm9yZUNhc2UgPSBvcHRzWzFdLmluZGV4T2YoJ2knKSAhPSAtMTtcbiAgICAgICAgICAgICAgdW5pcXVlID0gb3B0c1sxXS5pbmRleE9mKCd1JykgIT0gLTE7XG4gICAgICAgICAgICAgIHZhciBkZWNpbWFsID0gb3B0c1sxXS5pbmRleE9mKCdkJykgIT0gLTEgfHwgb3B0c1sxXS5pbmRleE9mKCduJykgIT0gLTEgJiYgMTtcbiAgICAgICAgICAgICAgdmFyIGhleCA9IG9wdHNbMV0uaW5kZXhPZigneCcpICE9IC0xICYmIDE7XG4gICAgICAgICAgICAgIHZhciBvY3RhbCA9IG9wdHNbMV0uaW5kZXhPZignbycpICE9IC0xICYmIDE7XG4gICAgICAgICAgICAgIGlmIChkZWNpbWFsICsgaGV4ICsgb2N0YWwgPiAxKSB7IHJldHVybiAnSW52YWxpZCBhcmd1bWVudHMnOyB9XG4gICAgICAgICAgICAgIG51bWJlciA9IGRlY2ltYWwgJiYgJ2RlY2ltYWwnIHx8IGhleCAmJiAnaGV4JyB8fCBvY3RhbCAmJiAnb2N0YWwnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdHNbMl0pIHtcbiAgICAgICAgICAgICAgcGF0dGVybiA9IG5ldyBSZWdFeHAob3B0c1syXS5zdWJzdHIoMSwgb3B0c1syXS5sZW5ndGggLSAyKSwgaWdub3JlQ2FzZSA/ICdpJyA6ICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVyciA9IHBhcnNlQXJncygpO1xuICAgICAgICBpZiAoZXJyKSB7XG4gICAgICAgICAgc2hvd0NvbmZpcm0oY20sIGVyciArICc6ICcgKyBwYXJhbXMuYXJnU3RyaW5nKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxpbmVTdGFydCA9IHBhcmFtcy5saW5lIHx8IGNtLmZpcnN0TGluZSgpO1xuICAgICAgICB2YXIgbGluZUVuZCA9IHBhcmFtcy5saW5lRW5kIHx8IHBhcmFtcy5saW5lIHx8IGNtLmxhc3RMaW5lKCk7XG4gICAgICAgIGlmIChsaW5lU3RhcnQgPT0gbGluZUVuZCkgeyByZXR1cm47IH1cbiAgICAgICAgdmFyIGN1clN0YXJ0ID0gbmV3IFBvcyhsaW5lU3RhcnQsIDApO1xuICAgICAgICB2YXIgY3VyRW5kID0gbmV3IFBvcyhsaW5lRW5kLCBsaW5lTGVuZ3RoKGNtLCBsaW5lRW5kKSk7XG4gICAgICAgIHZhciB0ZXh0ID0gY20uZ2V0UmFuZ2UoY3VyU3RhcnQsIGN1ckVuZCkuc3BsaXQoJ1xcbicpO1xuICAgICAgICB2YXIgbnVtYmVyUmVnZXggPSBwYXR0ZXJuID8gcGF0dGVybiA6XG4gICAgICAgICAgIChudW1iZXIgPT0gJ2RlY2ltYWwnKSA/IC8oLT8pKFtcXGRdKykvIDpcbiAgICAgICAgICAgKG51bWJlciA9PSAnaGV4JykgPyAvKC0/KSg/OjB4KT8oWzAtOWEtZl0rKS9pIDpcbiAgICAgICAgICAgKG51bWJlciA9PSAnb2N0YWwnKSA/IC8oWzAtN10rKS8gOiBudWxsO1xuICAgICAgICB2YXIgcmFkaXggPSAobnVtYmVyID09ICdkZWNpbWFsJykgPyAxMCA6IChudW1iZXIgPT0gJ2hleCcpID8gMTYgOiAobnVtYmVyID09ICdvY3RhbCcpID8gOCA6IG51bGw7XG4gICAgICAgIHZhciBudW1QYXJ0ID0gW10sIHRleHRQYXJ0ID0gW107XG4gICAgICAgIGlmIChudW1iZXIgfHwgcGF0dGVybikge1xuICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGV4dC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIG1hdGNoUGFydCA9IHBhdHRlcm4gPyB0ZXh0W2ldLm1hdGNoKHBhdHRlcm4pIDogbnVsbDtcbiAgICAgICAgICAgIGlmIChtYXRjaFBhcnQgJiYgbWF0Y2hQYXJ0WzBdICE9ICcnKSB7XG4gICAgICAgICAgICAgIG51bVBhcnQucHVzaChtYXRjaFBhcnQpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICghcGF0dGVybiAmJiBudW1iZXJSZWdleC5leGVjKHRleHRbaV0pKSB7XG4gICAgICAgICAgICAgIG51bVBhcnQucHVzaCh0ZXh0W2ldKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRleHRQYXJ0LnB1c2godGV4dFtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRleHRQYXJ0ID0gdGV4dDtcbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBjb21wYXJlRm4oYSwgYikge1xuICAgICAgICAgIGlmIChyZXZlcnNlKSB7IHZhciB0bXA7IHRtcCA9IGE7IGEgPSBiOyBiID0gdG1wOyB9XG4gICAgICAgICAgaWYgKGlnbm9yZUNhc2UpIHsgYSA9IGEudG9Mb3dlckNhc2UoKTsgYiA9IGIudG9Mb3dlckNhc2UoKTsgfVxuICAgICAgICAgIHZhciBhbnVtID0gbnVtYmVyICYmIG51bWJlclJlZ2V4LmV4ZWMoYSk7XG4gICAgICAgICAgdmFyIGJudW0gPSBudW1iZXIgJiYgbnVtYmVyUmVnZXguZXhlYyhiKTtcbiAgICAgICAgICBpZiAoIWFudW0pIHsgcmV0dXJuIGEgPCBiID8gLTEgOiAxOyB9XG4gICAgICAgICAgYW51bSA9IHBhcnNlSW50KChhbnVtWzFdICsgYW51bVsyXSkudG9Mb3dlckNhc2UoKSwgcmFkaXgpO1xuICAgICAgICAgIGJudW0gPSBwYXJzZUludCgoYm51bVsxXSArIGJudW1bMl0pLnRvTG93ZXJDYXNlKCksIHJhZGl4KTtcbiAgICAgICAgICByZXR1cm4gYW51bSAtIGJudW07XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gY29tcGFyZVBhdHRlcm5GbihhLCBiKSB7XG4gICAgICAgICAgaWYgKHJldmVyc2UpIHsgdmFyIHRtcDsgdG1wID0gYTsgYSA9IGI7IGIgPSB0bXA7IH1cbiAgICAgICAgICBpZiAoaWdub3JlQ2FzZSkgeyBhWzBdID0gYVswXS50b0xvd2VyQ2FzZSgpOyBiWzBdID0gYlswXS50b0xvd2VyQ2FzZSgpOyB9XG4gICAgICAgICAgcmV0dXJuIChhWzBdIDwgYlswXSkgPyAtMSA6IDE7XG4gICAgICAgIH1cbiAgICAgICAgbnVtUGFydC5zb3J0KHBhdHRlcm4gPyBjb21wYXJlUGF0dGVybkZuIDogY29tcGFyZUZuKTtcbiAgICAgICAgaWYgKHBhdHRlcm4pIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVBhcnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG51bVBhcnRbaV0gPSBudW1QYXJ0W2ldLmlucHV0O1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICghbnVtYmVyKSB7IHRleHRQYXJ0LnNvcnQoY29tcGFyZUZuKTsgfVxuICAgICAgICB0ZXh0ID0gKCFyZXZlcnNlKSA/IHRleHRQYXJ0LmNvbmNhdChudW1QYXJ0KSA6IG51bVBhcnQuY29uY2F0KHRleHRQYXJ0KTtcbiAgICAgICAgaWYgKHVuaXF1ZSkgeyAvLyBSZW1vdmUgZHVwbGljYXRlIGxpbmVzXG4gICAgICAgICAgdmFyIHRleHRPbGQgPSB0ZXh0O1xuICAgICAgICAgIHZhciBsYXN0TGluZTtcbiAgICAgICAgICB0ZXh0ID0gW107XG4gICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0T2xkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGV4dE9sZFtpXSAhPSBsYXN0TGluZSkge1xuICAgICAgICAgICAgICB0ZXh0LnB1c2godGV4dE9sZFtpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0TGluZSA9IHRleHRPbGRbaV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNtLnJlcGxhY2VSYW5nZSh0ZXh0LmpvaW4oJ1xcbicpLCBjdXJTdGFydCwgY3VyRW5kKTtcbiAgICAgIH0sXG4gICAgICB2Z2xvYmFsOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7XG4gICAgICAgIC8vIGdsb2JhbCBpbnNwZWN0cyBwYXJhbXMuY29tbWFuZE5hbWVcbiAgICAgICAgdGhpcy5nbG9iYWwoY20sIHBhcmFtcyk7XG4gICAgICB9LFxuICAgICAgZ2xvYmFsOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7XG4gICAgICAgIC8vIGEgZ2xvYmFsIGNvbW1hbmQgaXMgb2YgdGhlIGZvcm1cbiAgICAgICAgLy8gOltyYW5nZV1nL3BhdHRlcm4vW2NtZF1cbiAgICAgICAgLy8gYXJnU3RyaW5nIGhvbGRzIHRoZSBzdHJpbmcgL3BhdHRlcm4vW2NtZF1cbiAgICAgICAgdmFyIGFyZ1N0cmluZyA9IHBhcmFtcy5hcmdTdHJpbmc7XG4gICAgICAgIGlmICghYXJnU3RyaW5nKSB7XG4gICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdSZWd1bGFyIEV4cHJlc3Npb24gbWlzc2luZyBmcm9tIGdsb2JhbCcpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW52ZXJ0ZWQgPSBwYXJhbXMuY29tbWFuZE5hbWVbMF0gPT09ICd2JztcbiAgICAgICAgLy8gcmFuZ2UgaXMgc3BlY2lmaWVkIGhlcmVcbiAgICAgICAgdmFyIGxpbmVTdGFydCA9IChwYXJhbXMubGluZSAhPT0gdW5kZWZpbmVkKSA/IHBhcmFtcy5saW5lIDogY20uZmlyc3RMaW5lKCk7XG4gICAgICAgIHZhciBsaW5lRW5kID0gcGFyYW1zLmxpbmVFbmQgfHwgcGFyYW1zLmxpbmUgfHwgY20ubGFzdExpbmUoKTtcbiAgICAgICAgLy8gZ2V0IHRoZSB0b2tlbnMgZnJvbSBhcmdTdHJpbmdcbiAgICAgICAgdmFyIHRva2VucyA9IHNwbGl0QnlTbGFzaChhcmdTdHJpbmcpO1xuICAgICAgICB2YXIgcmVnZXhQYXJ0ID0gYXJnU3RyaW5nLCBjbWQ7XG4gICAgICAgIGlmICh0b2tlbnMubGVuZ3RoKSB7XG4gICAgICAgICAgcmVnZXhQYXJ0ID0gdG9rZW5zWzBdO1xuICAgICAgICAgIGNtZCA9IHRva2Vucy5zbGljZSgxLCB0b2tlbnMubGVuZ3RoKS5qb2luKCcvJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZ2V4UGFydCkge1xuICAgICAgICAgIC8vIElmIHJlZ2V4IHBhcnQgaXMgZW1wdHksIHRoZW4gdXNlIHRoZSBwcmV2aW91cyBxdWVyeS4gT3RoZXJ3aXNlXG4gICAgICAgICAgLy8gdXNlIHRoZSByZWdleCBwYXJ0IGFzIHRoZSBuZXcgcXVlcnkuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgdXBkYXRlU2VhcmNoUXVlcnkoY20sIHJlZ2V4UGFydCwgdHJ1ZSAvKiogaWdub3JlQ2FzZSAqLyxcbiAgICAgICAgICAgICB0cnVlIC8qKiBzbWFydENhc2UgKi8pO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdJbnZhbGlkIHJlZ2V4OiAnICsgcmVnZXhQYXJ0KTtcbiAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBub3cgdGhhdCB3ZSBoYXZlIHRoZSByZWdleFBhcnQsIHNlYXJjaCBmb3IgcmVnZXggbWF0Y2hlcyBpbiB0aGVcbiAgICAgICAgLy8gc3BlY2lmaWVkIHJhbmdlIG9mIGxpbmVzXG4gICAgICAgIHZhciBxdWVyeSA9IGdldFNlYXJjaFN0YXRlKGNtKS5nZXRRdWVyeSgpO1xuICAgICAgICB2YXIgbWF0Y2hlZExpbmVzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSBsaW5lU3RhcnQ7IGkgPD0gbGluZUVuZDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGxpbmUgPSBjbS5nZXRMaW5lSGFuZGxlKGkpO1xuICAgICAgICAgIHZhciBtYXRjaGVkID0gcXVlcnkudGVzdChsaW5lLnRleHQpO1xuICAgICAgICAgIGlmIChtYXRjaGVkICE9PSBpbnZlcnRlZCkge1xuICAgICAgICAgICAgbWF0Y2hlZExpbmVzLnB1c2goY21kID8gbGluZSA6IGxpbmUudGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHRoZXJlIGlzIG5vIFtjbWRdLCBqdXN0IGRpc3BsYXkgdGhlIGxpc3Qgb2YgbWF0Y2hlZCBsaW5lc1xuICAgICAgICBpZiAoIWNtZCkge1xuICAgICAgICAgIHNob3dDb25maXJtKGNtLCBtYXRjaGVkTGluZXMuam9pbignXFxuJykpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW5kZXggPSAwO1xuICAgICAgICB2YXIgbmV4dENvbW1hbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoaW5kZXggPCBtYXRjaGVkTGluZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgbGluZSA9IG1hdGNoZWRMaW5lc1tpbmRleCsrXTtcbiAgICAgICAgICAgIHZhciBsaW5lTnVtID0gY20uZ2V0TGluZU51bWJlcihsaW5lKTtcbiAgICAgICAgICAgIGlmIChsaW5lTnVtID09IG51bGwpIHtcbiAgICAgICAgICAgICAgbmV4dENvbW1hbmQoKTtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNvbW1hbmQgPSAobGluZU51bSArIDEpICsgY21kO1xuICAgICAgICAgICAgZXhDb21tYW5kRGlzcGF0Y2hlci5wcm9jZXNzQ29tbWFuZChjbSwgY29tbWFuZCwge1xuICAgICAgICAgICAgICBjYWxsYmFjazogbmV4dENvbW1hbmRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgbmV4dENvbW1hbmQoKTtcbiAgICAgIH0sXG4gICAgICBzdWJzdGl0dXRlOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7XG4gICAgICAgIGlmICghY20uZ2V0U2VhcmNoQ3Vyc29yKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZWFyY2ggZmVhdHVyZSBub3QgYXZhaWxhYmxlLiBSZXF1aXJlcyBzZWFyY2hjdXJzb3IuanMgb3IgJyArXG4gICAgICAgICAgICAgICdhbnkgb3RoZXIgZ2V0U2VhcmNoQ3Vyc29yIGltcGxlbWVudGF0aW9uLicpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhcmdTdHJpbmcgPSBwYXJhbXMuYXJnU3RyaW5nO1xuICAgICAgICB2YXIgdG9rZW5zID0gYXJnU3RyaW5nID8gc3BsaXRCeVNlcGFyYXRvcihhcmdTdHJpbmcsIGFyZ1N0cmluZ1swXSkgOiBbXTtcbiAgICAgICAgdmFyIHJlZ2V4UGFydCwgcmVwbGFjZVBhcnQgPSAnJywgdHJhaWxpbmcsIGZsYWdzUGFydCwgY291bnQ7XG4gICAgICAgIHZhciBjb25maXJtID0gZmFsc2U7IC8vIFdoZXRoZXIgdG8gY29uZmlybSBlYWNoIHJlcGxhY2UuXG4gICAgICAgIHZhciBnbG9iYWwgPSBmYWxzZTsgLy8gVHJ1ZSB0byByZXBsYWNlIGFsbCBpbnN0YW5jZXMgb24gYSBsaW5lLCBmYWxzZSB0byByZXBsYWNlIG9ubHkgMS5cbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGgpIHtcbiAgICAgICAgICByZWdleFBhcnQgPSB0b2tlbnNbMF07XG4gICAgICAgICAgaWYgKGdldE9wdGlvbigncGNyZScpICYmIHJlZ2V4UGFydCAhPT0gJycpIHtcbiAgICAgICAgICAgICAgcmVnZXhQYXJ0ID0gbmV3IFJlZ0V4cChyZWdleFBhcnQpLnNvdXJjZTsgLy9ub3JtYWxpemUgbm90IGVzY2FwZWQgY2hhcmFjdGVyc1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXBsYWNlUGFydCA9IHRva2Vuc1sxXTtcbiAgICAgICAgICBpZiAocmVwbGFjZVBhcnQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGdldE9wdGlvbigncGNyZScpKSB7XG4gICAgICAgICAgICAgIHJlcGxhY2VQYXJ0ID0gdW5lc2NhcGVSZWdleFJlcGxhY2UocmVwbGFjZVBhcnQucmVwbGFjZSgvKFteXFxcXF0pJi9nLFwiJDEkJCZcIikpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmVwbGFjZVBhcnQgPSB0cmFuc2xhdGVSZWdleFJlcGxhY2UocmVwbGFjZVBhcnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmltR2xvYmFsU3RhdGUubGFzdFN1YnN0aXR1dGVSZXBsYWNlUGFydCA9IHJlcGxhY2VQYXJ0O1xuICAgICAgICAgIH1cbiAgICAgICAgICB0cmFpbGluZyA9IHRva2Vuc1syXSA/IHRva2Vuc1syXS5zcGxpdCgnICcpIDogW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZWl0aGVyIHRoZSBhcmdTdHJpbmcgaXMgZW1wdHkgb3IgaXRzIG9mIHRoZSBmb3JtICcgaGVsbG8vd29ybGQnXG4gICAgICAgICAgLy8gYWN0dWFsbHkgc3BsaXRCeVNsYXNoIHJldHVybnMgYSBsaXN0IG9mIHRva2Vuc1xuICAgICAgICAgIC8vIG9ubHkgaWYgdGhlIHN0cmluZyBzdGFydHMgd2l0aCBhICcvJ1xuICAgICAgICAgIGlmIChhcmdTdHJpbmcgJiYgYXJnU3RyaW5nLmxlbmd0aCkge1xuICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdTdWJzdGl0dXRpb25zIHNob3VsZCBiZSBvZiB0aGUgZm9ybSAnICtcbiAgICAgICAgICAgICAgICAnOnMvcGF0dGVybi9yZXBsYWNlLycpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBBZnRlciB0aGUgM3JkIHNsYXNoLCB3ZSBjYW4gaGF2ZSBmbGFncyBmb2xsb3dlZCBieSBhIHNwYWNlIGZvbGxvd2VkXG4gICAgICAgIC8vIGJ5IGNvdW50LlxuICAgICAgICBpZiAodHJhaWxpbmcpIHtcbiAgICAgICAgICBmbGFnc1BhcnQgPSB0cmFpbGluZ1swXTtcbiAgICAgICAgICBjb3VudCA9IHBhcnNlSW50KHRyYWlsaW5nWzFdKTtcbiAgICAgICAgICBpZiAoZmxhZ3NQYXJ0KSB7XG4gICAgICAgICAgICBpZiAoZmxhZ3NQYXJ0LmluZGV4T2YoJ2MnKSAhPSAtMSkge1xuICAgICAgICAgICAgICBjb25maXJtID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChmbGFnc1BhcnQuaW5kZXhPZignZycpICE9IC0xKSB7XG4gICAgICAgICAgICAgIGdsb2JhbCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZ2V0T3B0aW9uKCdwY3JlJykpIHtcbiAgICAgICAgICAgICAgIHJlZ2V4UGFydCA9IHJlZ2V4UGFydCArICcvJyArIGZsYWdzUGFydDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICByZWdleFBhcnQgPSByZWdleFBhcnQucmVwbGFjZSgvXFwvL2csIFwiXFxcXC9cIikgKyAnLycgKyBmbGFnc1BhcnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChyZWdleFBhcnQpIHtcbiAgICAgICAgICAvLyBJZiByZWdleCBwYXJ0IGlzIGVtcHR5LCB0aGVuIHVzZSB0aGUgcHJldmlvdXMgcXVlcnkuIE90aGVyd2lzZSB1c2VcbiAgICAgICAgICAvLyB0aGUgcmVnZXggcGFydCBhcyB0aGUgbmV3IHF1ZXJ5LlxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICB1cGRhdGVTZWFyY2hRdWVyeShjbSwgcmVnZXhQYXJ0LCB0cnVlIC8qKiBpZ25vcmVDYXNlICovLFxuICAgICAgICAgICAgICB0cnVlIC8qKiBzbWFydENhc2UgKi8pO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnSW52YWxpZCByZWdleDogJyArIHJlZ2V4UGFydCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJlcGxhY2VQYXJ0ID0gcmVwbGFjZVBhcnQgfHwgdmltR2xvYmFsU3RhdGUubGFzdFN1YnN0aXR1dGVSZXBsYWNlUGFydDtcbiAgICAgICAgaWYgKHJlcGxhY2VQYXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBzaG93Q29uZmlybShjbSwgJ05vIHByZXZpb3VzIHN1YnN0aXR1dGUgcmVndWxhciBleHByZXNzaW9uJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBzdGF0ZSA9IGdldFNlYXJjaFN0YXRlKGNtKTtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gc3RhdGUuZ2V0UXVlcnkoKTtcbiAgICAgICAgdmFyIGxpbmVTdGFydCA9IChwYXJhbXMubGluZSAhPT0gdW5kZWZpbmVkKSA/IHBhcmFtcy5saW5lIDogY20uZ2V0Q3Vyc29yKCkubGluZTtcbiAgICAgICAgdmFyIGxpbmVFbmQgPSBwYXJhbXMubGluZUVuZCB8fCBsaW5lU3RhcnQ7XG4gICAgICAgIGlmIChsaW5lU3RhcnQgPT0gY20uZmlyc3RMaW5lKCkgJiYgbGluZUVuZCA9PSBjbS5sYXN0TGluZSgpKSB7XG4gICAgICAgICAgbGluZUVuZCA9IEluZmluaXR5O1xuICAgICAgICB9XG4gICAgICAgIGlmIChjb3VudCkge1xuICAgICAgICAgIGxpbmVTdGFydCA9IGxpbmVFbmQ7XG4gICAgICAgICAgbGluZUVuZCA9IGxpbmVTdGFydCArIGNvdW50IC0gMTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3RhcnRQb3MgPSBjbGlwQ3Vyc29yVG9Db250ZW50KGNtLCBuZXcgUG9zKGxpbmVTdGFydCwgMCkpO1xuICAgICAgICB2YXIgY3Vyc29yID0gY20uZ2V0U2VhcmNoQ3Vyc29yKHF1ZXJ5LCBzdGFydFBvcyk7XG4gICAgICAgIGRvUmVwbGFjZShjbSwgY29uZmlybSwgZ2xvYmFsLCBsaW5lU3RhcnQsIGxpbmVFbmQsIGN1cnNvciwgcXVlcnksIHJlcGxhY2VQYXJ0LCBwYXJhbXMuY2FsbGJhY2spO1xuICAgICAgfSxcbiAgICAgIHJlZG86IENvZGVNaXJyb3IuY29tbWFuZHMucmVkbyxcbiAgICAgIHVuZG86IENvZGVNaXJyb3IuY29tbWFuZHMudW5kbyxcbiAgICAgIHdyaXRlOiBmdW5jdGlvbihjbSkge1xuICAgICAgICBpZiAoQ29kZU1pcnJvci5jb21tYW5kcy5zYXZlKSB7XG4gICAgICAgICAgLy8gSWYgYSBzYXZlIGNvbW1hbmQgaXMgZGVmaW5lZCwgY2FsbCBpdC5cbiAgICAgICAgICBDb2RlTWlycm9yLmNvbW1hbmRzLnNhdmUoY20pO1xuICAgICAgICB9IGVsc2UgaWYgKGNtLnNhdmUpIHtcbiAgICAgICAgICAvLyBTYXZlcyB0byB0ZXh0IGFyZWEgaWYgbm8gc2F2ZSBjb21tYW5kIGlzIGRlZmluZWQgYW5kIGNtLnNhdmUoKSBpcyBhdmFpbGFibGUuXG4gICAgICAgICAgY20uc2F2ZSgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbm9obHNlYXJjaDogZnVuY3Rpb24oY20pIHtcbiAgICAgICAgY2xlYXJTZWFyY2hIaWdobGlnaHQoY20pO1xuICAgICAgfSxcbiAgICAgIHlhbms6IGZ1bmN0aW9uIChjbSkge1xuICAgICAgICB2YXIgY3VyID0gY29weUN1cnNvcihjbS5nZXRDdXJzb3IoKSk7XG4gICAgICAgIHZhciBsaW5lID0gY3VyLmxpbmU7XG4gICAgICAgIHZhciBsaW5lVGV4dCA9IGNtLmdldExpbmUobGluZSk7XG4gICAgICAgIHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5wdXNoVGV4dChcbiAgICAgICAgICAnMCcsICd5YW5rJywgbGluZVRleHQsIHRydWUsIHRydWUpO1xuICAgICAgfSxcbiAgICAgIGRlbG1hcmtzOiBmdW5jdGlvbihjbSwgcGFyYW1zKSB7XG4gICAgICAgIGlmICghcGFyYW1zLmFyZ1N0cmluZyB8fCAhdHJpbShwYXJhbXMuYXJnU3RyaW5nKSkge1xuICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnQXJndW1lbnQgcmVxdWlyZWQnKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RhdGUgPSBjbS5zdGF0ZS52aW07XG4gICAgICAgIHZhciBzdHJlYW0gPSBuZXcgQ29kZU1pcnJvci5TdHJpbmdTdHJlYW0odHJpbShwYXJhbXMuYXJnU3RyaW5nKSk7XG4gICAgICAgIHdoaWxlICghc3RyZWFtLmVvbCgpKSB7XG4gICAgICAgICAgc3RyZWFtLmVhdFNwYWNlKCk7XG5cbiAgICAgICAgICAvLyBSZWNvcmQgdGhlIHN0cmVhbXMgcG9zaXRpb24gYXQgdGhlIGJlZ2lubmluZyBvZiB0aGUgbG9vcCBmb3IgdXNlXG4gICAgICAgICAgLy8gaW4gZXJyb3IgbWVzc2FnZXMuXG4gICAgICAgICAgdmFyIGNvdW50ID0gc3RyZWFtLnBvcztcblxuICAgICAgICAgIGlmICghc3RyZWFtLm1hdGNoKC9bYS16QS1aXS8sIGZhbHNlKSkge1xuICAgICAgICAgICAgc2hvd0NvbmZpcm0oY20sICdJbnZhbGlkIGFyZ3VtZW50OiAnICsgcGFyYW1zLmFyZ1N0cmluZy5zdWJzdHJpbmcoY291bnQpKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc3ltID0gc3RyZWFtLm5leHQoKTtcbiAgICAgICAgICAvLyBDaGVjayBpZiB0aGlzIHN5bWJvbCBpcyBwYXJ0IG9mIGEgcmFuZ2VcbiAgICAgICAgICBpZiAoc3RyZWFtLm1hdGNoKCctJywgdHJ1ZSkpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgc3ltYm9sIGlzIHBhcnQgb2YgYSByYW5nZS5cblxuICAgICAgICAgICAgLy8gVGhlIHJhbmdlIG11c3QgdGVybWluYXRlIGF0IGFuIGFscGhhYmV0aWMgY2hhcmFjdGVyLlxuICAgICAgICAgICAgaWYgKCFzdHJlYW0ubWF0Y2goL1thLXpBLVpdLywgZmFsc2UpKSB7XG4gICAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnSW52YWxpZCBhcmd1bWVudDogJyArIHBhcmFtcy5hcmdTdHJpbmcuc3Vic3RyaW5nKGNvdW50KSk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHN0YXJ0TWFyayA9IHN5bTtcbiAgICAgICAgICAgIHZhciBmaW5pc2hNYXJrID0gc3RyZWFtLm5leHQoKTtcbiAgICAgICAgICAgIC8vIFRoZSByYW5nZSBtdXN0IHRlcm1pbmF0ZSBhdCBhbiBhbHBoYWJldGljIGNoYXJhY3RlciB3aGljaFxuICAgICAgICAgICAgLy8gc2hhcmVzIHRoZSBzYW1lIGNhc2UgYXMgdGhlIHN0YXJ0IG9mIHRoZSByYW5nZS5cbiAgICAgICAgICAgIGlmIChpc0xvd2VyQ2FzZShzdGFydE1hcmspICYmIGlzTG93ZXJDYXNlKGZpbmlzaE1hcmspIHx8XG4gICAgICAgICAgICAgICAgaXNVcHBlckNhc2Uoc3RhcnRNYXJrKSAmJiBpc1VwcGVyQ2FzZShmaW5pc2hNYXJrKSkge1xuICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBzdGFydE1hcmsuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgICAgICAgdmFyIGZpbmlzaCA9IGZpbmlzaE1hcmsuY2hhckNvZGVBdCgwKTtcbiAgICAgICAgICAgICAgaWYgKHN0YXJ0ID49IGZpbmlzaCkge1xuICAgICAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnSW52YWxpZCBhcmd1bWVudDogJyArIHBhcmFtcy5hcmdTdHJpbmcuc3Vic3RyaW5nKGNvdW50KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gQmVjYXVzZSBtYXJrcyBhcmUgYWx3YXlzIEFTQ0lJIHZhbHVlcywgYW5kIHdlIGhhdmVcbiAgICAgICAgICAgICAgLy8gZGV0ZXJtaW5lZCB0aGF0IHRoZXkgYXJlIHRoZSBzYW1lIGNhc2UsIHdlIGNhbiB1c2VcbiAgICAgICAgICAgICAgLy8gdGhlaXIgY2hhciBjb2RlcyB0byBpdGVyYXRlIHRocm91Z2ggdGhlIGRlZmluZWQgcmFuZ2UuXG4gICAgICAgICAgICAgIGZvciAodmFyIGogPSAwOyBqIDw9IGZpbmlzaCAtIHN0YXJ0OyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgbWFyayA9IFN0cmluZy5mcm9tQ2hhckNvZGUoc3RhcnQgKyBqKTtcbiAgICAgICAgICAgICAgICBkZWxldGUgc3RhdGUubWFya3NbbWFya107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNob3dDb25maXJtKGNtLCAnSW52YWxpZCBhcmd1bWVudDogJyArIHN0YXJ0TWFyayArICctJyk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhpcyBzeW1ib2wgaXMgYSB2YWxpZCBtYXJrLCBhbmQgaXMgbm90IHBhcnQgb2YgYSByYW5nZS5cbiAgICAgICAgICAgIGRlbGV0ZSBzdGF0ZS5tYXJrc1tzeW1dO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgZXhDb21tYW5kRGlzcGF0Y2hlciA9IG5ldyBFeENvbW1hbmREaXNwYXRjaGVyKCk7XG5cbiAgICAvKipcbiAgICAqIEBwYXJhbSB7Q29kZU1pcnJvcn0gY20gQ29kZU1pcnJvciBpbnN0YW5jZSB3ZSBhcmUgaW4uXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNvbmZpcm0gV2hldGhlciB0byBjb25maXJtIGVhY2ggcmVwbGFjZS5cbiAgICAqIEBwYXJhbSB7Q3Vyc29yfSBsaW5lU3RhcnQgTGluZSB0byBzdGFydCByZXBsYWNpbmcgZnJvbS5cbiAgICAqIEBwYXJhbSB7Q3Vyc29yfSBsaW5lRW5kIExpbmUgdG8gc3RvcCByZXBsYWNpbmcgYXQuXG4gICAgKiBAcGFyYW0ge1JlZ0V4cH0gcXVlcnkgUXVlcnkgZm9yIHBlcmZvcm1pbmcgbWF0Y2hlcyB3aXRoLlxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlcGxhY2VXaXRoIFRleHQgdG8gcmVwbGFjZSBtYXRjaGVzIHdpdGguIE1heSBjb250YWluICQxLFxuICAgICogICAgICQyLCBldGMgZm9yIHJlcGxhY2luZyBjYXB0dXJlZCBncm91cHMgdXNpbmcgSmF2YVNjcmlwdCByZXBsYWNlLlxuICAgICogQHBhcmFtIHtmdW5jdGlvbigpfSBjYWxsYmFjayBBIGNhbGxiYWNrIGZvciB3aGVuIHRoZSByZXBsYWNlIGlzIGRvbmUuXG4gICAgKi9cbiAgICBmdW5jdGlvbiBkb1JlcGxhY2UoY20sIGNvbmZpcm0sIGdsb2JhbCwgbGluZVN0YXJ0LCBsaW5lRW5kLCBzZWFyY2hDdXJzb3IsIHF1ZXJ5LFxuICAgICAgICByZXBsYWNlV2l0aCwgY2FsbGJhY2spIHtcbiAgICAgIC8vIFNldCB1cCBhbGwgdGhlIGZ1bmN0aW9ucy5cbiAgICAgIGNtLnN0YXRlLnZpbS5leE1vZGUgPSB0cnVlO1xuICAgICAgdmFyIGRvbmUgPSBmYWxzZTtcbiAgICAgIHZhciBsYXN0UG9zLCBtb2RpZmllZExpbmVOdW1iZXIsIGpvaW5lZDtcbiAgICAgIGZ1bmN0aW9uIHJlcGxhY2VBbGwoKSB7XG4gICAgICAgIGNtLm9wZXJhdGlvbihmdW5jdGlvbigpIHtcbiAgICAgICAgICB3aGlsZSAoIWRvbmUpIHtcbiAgICAgICAgICAgIHJlcGxhY2UoKTtcbiAgICAgICAgICAgIG5leHQoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgc3RvcCgpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGZ1bmN0aW9uIHJlcGxhY2UoKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gY20uZ2V0UmFuZ2Uoc2VhcmNoQ3Vyc29yLmZyb20oKSwgc2VhcmNoQ3Vyc29yLnRvKCkpO1xuICAgICAgICB2YXIgbmV3VGV4dCA9IHRleHQucmVwbGFjZShxdWVyeSwgcmVwbGFjZVdpdGgpO1xuICAgICAgICB2YXIgdW5tb2RpZmllZExpbmVOdW1iZXIgPSBzZWFyY2hDdXJzb3IudG8oKS5saW5lO1xuICAgICAgICBzZWFyY2hDdXJzb3IucmVwbGFjZShuZXdUZXh0KTtcbiAgICAgICAgbW9kaWZpZWRMaW5lTnVtYmVyID0gc2VhcmNoQ3Vyc29yLnRvKCkubGluZTtcbiAgICAgICAgbGluZUVuZCArPSBtb2RpZmllZExpbmVOdW1iZXIgLSB1bm1vZGlmaWVkTGluZU51bWJlcjtcbiAgICAgICAgam9pbmVkID0gbW9kaWZpZWRMaW5lTnVtYmVyIDwgdW5tb2RpZmllZExpbmVOdW1iZXI7XG4gICAgICB9XG4gICAgICBmdW5jdGlvbiBmaW5kTmV4dFZhbGlkTWF0Y2goKSB7XG4gICAgICAgIHZhciBsYXN0TWF0Y2hUbyA9IGxhc3RQb3MgJiYgY29weUN1cnNvcihzZWFyY2hDdXJzb3IudG8oKSk7XG4gICAgICAgIHZhciBtYXRjaCA9IHNlYXJjaEN1cnNvci5maW5kTmV4dCgpO1xuICAgICAgICBpZiAobWF0Y2ggJiYgIW1hdGNoWzBdICYmIGxhc3RNYXRjaFRvICYmIGN1cnNvckVxdWFsKHNlYXJjaEN1cnNvci5mcm9tKCksIGxhc3RNYXRjaFRvKSkge1xuICAgICAgICAgIG1hdGNoID0gc2VhcmNoQ3Vyc29yLmZpbmROZXh0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1hdGNoO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgLy8gVGhlIGJlbG93IG9ubHkgbG9vcHMgdG8gc2tpcCBvdmVyIG11bHRpcGxlIG9jY3VycmVuY2VzIG9uIHRoZSBzYW1lXG4gICAgICAgIC8vIGxpbmUgd2hlbiAnZ2xvYmFsJyBpcyBub3QgdHJ1ZS5cbiAgICAgICAgd2hpbGUoZmluZE5leHRWYWxpZE1hdGNoKCkgJiZcbiAgICAgICAgICAgICAgaXNJblJhbmdlKHNlYXJjaEN1cnNvci5mcm9tKCksIGxpbmVTdGFydCwgbGluZUVuZCkpIHtcbiAgICAgICAgICBpZiAoIWdsb2JhbCAmJiBzZWFyY2hDdXJzb3IuZnJvbSgpLmxpbmUgPT0gbW9kaWZpZWRMaW5lTnVtYmVyICYmICFqb2luZWQpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjbS5zY3JvbGxJbnRvVmlldyhzZWFyY2hDdXJzb3IuZnJvbSgpLCAzMCk7XG4gICAgICAgICAgY20uc2V0U2VsZWN0aW9uKHNlYXJjaEN1cnNvci5mcm9tKCksIHNlYXJjaEN1cnNvci50bygpKTtcbiAgICAgICAgICBsYXN0UG9zID0gc2VhcmNoQ3Vyc29yLmZyb20oKTtcbiAgICAgICAgICBkb25lID0gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGRvbmUgPSB0cnVlO1xuICAgICAgfVxuICAgICAgZnVuY3Rpb24gc3RvcChjbG9zZSkge1xuICAgICAgICBpZiAoY2xvc2UpIHsgY2xvc2UoKTsgfVxuICAgICAgICBjbS5mb2N1cygpO1xuICAgICAgICBpZiAobGFzdFBvcykge1xuICAgICAgICAgIGNtLnNldEN1cnNvcihsYXN0UG9zKTtcbiAgICAgICAgICB2YXIgdmltID0gY20uc3RhdGUudmltO1xuICAgICAgICAgIHZpbS5leE1vZGUgPSBmYWxzZTtcbiAgICAgICAgICB2aW0ubGFzdEhQb3MgPSB2aW0ubGFzdEhTUG9zID0gbGFzdFBvcy5jaDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY2FsbGJhY2spIHsgY2FsbGJhY2soKTsgfVxuICAgICAgfVxuICAgICAgZnVuY3Rpb24gb25Qcm9tcHRLZXlEb3duKGUsIF92YWx1ZSwgY2xvc2UpIHtcbiAgICAgICAgLy8gU3dhbGxvdyBhbGwga2V5cy5cbiAgICAgICAgQ29kZU1pcnJvci5lX3N0b3AoZSk7XG4gICAgICAgIHZhciBrZXlOYW1lID0gQ29kZU1pcnJvci5rZXlOYW1lKGUpO1xuICAgICAgICBzd2l0Y2ggKGtleU5hbWUpIHtcbiAgICAgICAgICBjYXNlICdZJzpcbiAgICAgICAgICAgIHJlcGxhY2UoKTsgbmV4dCgpOyBicmVhaztcbiAgICAgICAgICBjYXNlICdOJzpcbiAgICAgICAgICAgIG5leHQoKTsgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgICAvLyByZXBsYWNlQWxsIGNvbnRhaW5zIGEgY2FsbCB0byBjbG9zZSBvZiBpdHMgb3duLiBXZSBkb24ndCB3YW50IGl0XG4gICAgICAgICAgICAvLyB0byBmaXJlIHRvbyBlYXJseSBvciBtdWx0aXBsZSB0aW1lcy5cbiAgICAgICAgICAgIHZhciBzYXZlZENhbGxiYWNrID0gY2FsbGJhY2s7XG4gICAgICAgICAgICBjYWxsYmFjayA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNtLm9wZXJhdGlvbihyZXBsYWNlQWxsKTtcbiAgICAgICAgICAgIGNhbGxiYWNrID0gc2F2ZWRDYWxsYmFjaztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ0wnOlxuICAgICAgICAgICAgcmVwbGFjZSgpO1xuICAgICAgICAgICAgLy8gZmFsbCB0aHJvdWdoIGFuZCBleGl0LlxuICAgICAgICAgIGNhc2UgJ1EnOlxuICAgICAgICAgIGNhc2UgJ0VzYyc6XG4gICAgICAgICAgY2FzZSAnQ3RybC1DJzpcbiAgICAgICAgICBjYXNlICdDdHJsLVsnOlxuICAgICAgICAgICAgc3RvcChjbG9zZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoZG9uZSkgeyBzdG9wKGNsb3NlKTsgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgLy8gQWN0dWFsbHkgZG8gcmVwbGFjZS5cbiAgICAgIG5leHQoKTtcbiAgICAgIGlmIChkb25lKSB7XG4gICAgICAgIHNob3dDb25maXJtKGNtLCAnTm8gbWF0Y2hlcyBmb3IgJyArIHF1ZXJ5LnNvdXJjZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghY29uZmlybSkge1xuICAgICAgICByZXBsYWNlQWxsKCk7XG4gICAgICAgIGlmIChjYWxsYmFjaykgeyBjYWxsYmFjaygpOyB9XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHNob3dQcm9tcHQoY20sIHtcbiAgICAgICAgcHJlZml4OiBkb20oJ3NwYW4nLCAncmVwbGFjZSB3aXRoICcsIGRvbSgnc3Ryb25nJywgcmVwbGFjZVdpdGgpLCAnICh5L24vYS9xL2wpJyksXG4gICAgICAgIG9uS2V5RG93bjogb25Qcm9tcHRLZXlEb3duXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBDb2RlTWlycm9yLmtleU1hcC52aW0gPSB7XG4gICAgICBhdHRhY2g6IGF0dGFjaFZpbU1hcCxcbiAgICAgIGRldGFjaDogZGV0YWNoVmltTWFwLFxuICAgICAgY2FsbDogY21LZXlcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZXhpdEluc2VydE1vZGUoY20pIHtcbiAgICAgIHZhciB2aW0gPSBjbS5zdGF0ZS52aW07XG4gICAgICB2YXIgbWFjcm9Nb2RlU3RhdGUgPSB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZTtcbiAgICAgIHZhciBpbnNlcnRNb2RlQ2hhbmdlUmVnaXN0ZXIgPSB2aW1HbG9iYWxTdGF0ZS5yZWdpc3RlckNvbnRyb2xsZXIuZ2V0UmVnaXN0ZXIoJy4nKTtcbiAgICAgIHZhciBpc1BsYXlpbmcgPSBtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmc7XG4gICAgICB2YXIgbGFzdENoYW5nZSA9IG1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcztcbiAgICAgIGlmICghaXNQbGF5aW5nKSB7XG4gICAgICAgIGNtLm9mZignY2hhbmdlJywgb25DaGFuZ2UpO1xuICAgICAgICBDb2RlTWlycm9yLm9mZihjbS5nZXRJbnB1dEZpZWxkKCksICdrZXlkb3duJywgb25LZXlFdmVudFRhcmdldEtleURvd24pO1xuICAgICAgfVxuICAgICAgaWYgKCFpc1BsYXlpbmcgJiYgdmltLmluc2VydE1vZGVSZXBlYXQgPiAxKSB7XG4gICAgICAgIC8vIFBlcmZvcm0gaW5zZXJ0IG1vZGUgcmVwZWF0IGZvciBjb21tYW5kcyBsaWtlIDMsYSBhbmQgMyxvLlxuICAgICAgICByZXBlYXRMYXN0RWRpdChjbSwgdmltLCB2aW0uaW5zZXJ0TW9kZVJlcGVhdCAtIDEsXG4gICAgICAgICAgICB0cnVlIC8qKiByZXBlYXRGb3JJbnNlcnQgKi8pO1xuICAgICAgICB2aW0ubGFzdEVkaXRJbnB1dFN0YXRlLnJlcGVhdE92ZXJyaWRlID0gdmltLmluc2VydE1vZGVSZXBlYXQ7XG4gICAgICB9XG4gICAgICBkZWxldGUgdmltLmluc2VydE1vZGVSZXBlYXQ7XG4gICAgICB2aW0uaW5zZXJ0TW9kZSA9IGZhbHNlO1xuICAgICAgY20uc2V0Q3Vyc29yKGNtLmdldEN1cnNvcigpLmxpbmUsIGNtLmdldEN1cnNvcigpLmNoLTEpO1xuICAgICAgY20uc2V0T3B0aW9uKCdrZXlNYXAnLCAndmltJyk7XG4gICAgICBjbS5zZXRPcHRpb24oJ2Rpc2FibGVJbnB1dCcsIHRydWUpO1xuICAgICAgY20udG9nZ2xlT3ZlcndyaXRlKGZhbHNlKTsgLy8gZXhpdCByZXBsYWNlIG1vZGUgaWYgd2Ugd2VyZSBpbiBpdC5cbiAgICAgIC8vIHVwZGF0ZSB0aGUgXCIuIHJlZ2lzdGVyIGJlZm9yZSBleGl0aW5nIGluc2VydCBtb2RlXG4gICAgICBpbnNlcnRNb2RlQ2hhbmdlUmVnaXN0ZXIuc2V0VGV4dChsYXN0Q2hhbmdlLmNoYW5nZXMuam9pbignJykpO1xuICAgICAgQ29kZU1pcnJvci5zaWduYWwoY20sIFwidmltLW1vZGUtY2hhbmdlXCIsIHttb2RlOiBcIm5vcm1hbFwifSk7XG4gICAgICBpZiAobWFjcm9Nb2RlU3RhdGUuaXNSZWNvcmRpbmcpIHtcbiAgICAgICAgbG9nSW5zZXJ0TW9kZUNoYW5nZShtYWNyb01vZGVTdGF0ZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gX21hcENvbW1hbmQoY29tbWFuZCkge1xuICAgICAgZGVmYXVsdEtleW1hcC51bnNoaWZ0KGNvbW1hbmQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hcENvbW1hbmQoa2V5cywgdHlwZSwgbmFtZSwgYXJncywgZXh0cmEpIHtcbiAgICAgIHZhciBjb21tYW5kID0ge2tleXM6IGtleXMsIHR5cGU6IHR5cGV9O1xuICAgICAgY29tbWFuZFt0eXBlXSA9IG5hbWU7XG4gICAgICBjb21tYW5kW3R5cGUgKyBcIkFyZ3NcIl0gPSBhcmdzO1xuICAgICAgZm9yICh2YXIga2V5IGluIGV4dHJhKVxuICAgICAgICBjb21tYW5kW2tleV0gPSBleHRyYVtrZXldO1xuICAgICAgX21hcENvbW1hbmQoY29tbWFuZCk7XG4gICAgfVxuXG4gICAgLy8gVGhlIHRpbWVvdXQgaW4gbWlsbGlzZWNvbmRzIGZvciB0aGUgdHdvLWNoYXJhY3RlciBFU0Mga2V5bWFwIHNob3VsZCBiZVxuICAgIC8vIGFkanVzdGVkIGFjY29yZGluZyB0byB5b3VyIHR5cGluZyBzcGVlZCB0byBwcmV2ZW50IGZhbHNlIHBvc2l0aXZlcy5cbiAgICBkZWZpbmVPcHRpb24oJ2luc2VydE1vZGVFc2NLZXlzVGltZW91dCcsIDIwMCwgJ251bWJlcicpO1xuXG4gICAgQ29kZU1pcnJvci5rZXlNYXBbJ3ZpbS1pbnNlcnQnXSA9IHtcbiAgICAgIC8vIFRPRE86IG92ZXJyaWRlIG5hdmlnYXRpb24ga2V5cyBzbyB0aGF0IEVzYyB3aWxsIGNhbmNlbCBhdXRvbWF0aWNcbiAgICAgIC8vIGluZGVudGF0aW9uIGZyb20gbywgTywgaV88Q1I+XG4gICAgICBmYWxsdGhyb3VnaDogWydkZWZhdWx0J10sXG4gICAgICBhdHRhY2g6IGF0dGFjaFZpbU1hcCxcbiAgICAgIGRldGFjaDogZGV0YWNoVmltTWFwLFxuICAgICAgY2FsbDogY21LZXlcbiAgICB9O1xuXG4gICAgQ29kZU1pcnJvci5rZXlNYXBbJ3ZpbS1yZXBsYWNlJ10gPSB7XG4gICAgICAnQmFja3NwYWNlJzogJ2dvQ2hhckxlZnQnLFxuICAgICAgZmFsbHRocm91Z2g6IFsndmltLWluc2VydCddLFxuICAgICAgYXR0YWNoOiBhdHRhY2hWaW1NYXAsXG4gICAgICBkZXRhY2g6IGRldGFjaFZpbU1hcCxcbiAgICAgIGNhbGw6IGNtS2V5XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGV4ZWN1dGVNYWNyb1JlZ2lzdGVyKGNtLCB2aW0sIG1hY3JvTW9kZVN0YXRlLCByZWdpc3Rlck5hbWUpIHtcbiAgICAgIHZhciByZWdpc3RlciA9IHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5nZXRSZWdpc3RlcihyZWdpc3Rlck5hbWUpO1xuICAgICAgaWYgKHJlZ2lzdGVyTmFtZSA9PSAnOicpIHtcbiAgICAgICAgLy8gUmVhZC1vbmx5IHJlZ2lzdGVyIGNvbnRhaW5pbmcgbGFzdCBFeCBjb21tYW5kLlxuICAgICAgICBpZiAocmVnaXN0ZXIua2V5QnVmZmVyWzBdKSB7XG4gICAgICAgICAgZXhDb21tYW5kRGlzcGF0Y2hlci5wcm9jZXNzQ29tbWFuZChjbSwgcmVnaXN0ZXIua2V5QnVmZmVyWzBdKTtcbiAgICAgICAgfVxuICAgICAgICBtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmcgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGtleUJ1ZmZlciA9IHJlZ2lzdGVyLmtleUJ1ZmZlcjtcbiAgICAgIHZhciBpbWMgPSAwO1xuICAgICAgbWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICAgIG1hY3JvTW9kZVN0YXRlLnJlcGxheVNlYXJjaFF1ZXJpZXMgPSByZWdpc3Rlci5zZWFyY2hRdWVyaWVzLnNsaWNlKDApO1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlCdWZmZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRleHQgPSBrZXlCdWZmZXJbaV07XG4gICAgICAgIHZhciBtYXRjaCwga2V5O1xuICAgICAgICB3aGlsZSAodGV4dCkge1xuICAgICAgICAgIC8vIFB1bGwgb2ZmIG9uZSBjb21tYW5kIGtleSwgd2hpY2ggaXMgZWl0aGVyIGEgc2luZ2xlIGNoYXJhY3RlclxuICAgICAgICAgIC8vIG9yIGEgc3BlY2lhbCBzZXF1ZW5jZSB3cmFwcGVkIGluICc8JyBhbmQgJz4nLCBlLmcuICc8U3BhY2U+Jy5cbiAgICAgICAgICBtYXRjaCA9ICgvPFxcdystLis/Pnw8XFx3Kz58Li8pLmV4ZWModGV4dCk7XG4gICAgICAgICAga2V5ID0gbWF0Y2hbMF07XG4gICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyaW5nKG1hdGNoLmluZGV4ICsga2V5Lmxlbmd0aCk7XG4gICAgICAgICAgdmltQXBpLmhhbmRsZUtleShjbSwga2V5LCAnbWFjcm8nKTtcbiAgICAgICAgICBpZiAodmltLmluc2VydE1vZGUpIHtcbiAgICAgICAgICAgIHZhciBjaGFuZ2VzID0gcmVnaXN0ZXIuaW5zZXJ0TW9kZUNoYW5nZXNbaW1jKytdLmNoYW5nZXM7XG4gICAgICAgICAgICB2aW1HbG9iYWxTdGF0ZS5tYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXMuY2hhbmdlcyA9XG4gICAgICAgICAgICAgICAgY2hhbmdlcztcbiAgICAgICAgICAgIHJlcGVhdEluc2VydE1vZGVDaGFuZ2VzKGNtLCBjaGFuZ2VzLCAxKTtcbiAgICAgICAgICAgIGV4aXRJbnNlcnRNb2RlKGNtKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ0tleShtYWNyb01vZGVTdGF0ZSwga2V5KSB7XG4gICAgICBpZiAobWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nKSB7IHJldHVybjsgfVxuICAgICAgdmFyIHJlZ2lzdGVyTmFtZSA9IG1hY3JvTW9kZVN0YXRlLmxhdGVzdFJlZ2lzdGVyO1xuICAgICAgdmFyIHJlZ2lzdGVyID0gdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmdldFJlZ2lzdGVyKHJlZ2lzdGVyTmFtZSk7XG4gICAgICBpZiAocmVnaXN0ZXIpIHtcbiAgICAgICAgcmVnaXN0ZXIucHVzaFRleHQoa2V5KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dJbnNlcnRNb2RlQ2hhbmdlKG1hY3JvTW9kZVN0YXRlKSB7XG4gICAgICBpZiAobWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nKSB7IHJldHVybjsgfVxuICAgICAgdmFyIHJlZ2lzdGVyTmFtZSA9IG1hY3JvTW9kZVN0YXRlLmxhdGVzdFJlZ2lzdGVyO1xuICAgICAgdmFyIHJlZ2lzdGVyID0gdmltR2xvYmFsU3RhdGUucmVnaXN0ZXJDb250cm9sbGVyLmdldFJlZ2lzdGVyKHJlZ2lzdGVyTmFtZSk7XG4gICAgICBpZiAocmVnaXN0ZXIgJiYgcmVnaXN0ZXIucHVzaEluc2VydE1vZGVDaGFuZ2VzKSB7XG4gICAgICAgIHJlZ2lzdGVyLnB1c2hJbnNlcnRNb2RlQ2hhbmdlcyhtYWNyb01vZGVTdGF0ZS5sYXN0SW5zZXJ0TW9kZUNoYW5nZXMpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ1NlYXJjaFF1ZXJ5KG1hY3JvTW9kZVN0YXRlLCBxdWVyeSkge1xuICAgICAgaWYgKG1hY3JvTW9kZVN0YXRlLmlzUGxheWluZykgeyByZXR1cm47IH1cbiAgICAgIHZhciByZWdpc3Rlck5hbWUgPSBtYWNyb01vZGVTdGF0ZS5sYXRlc3RSZWdpc3RlcjtcbiAgICAgIHZhciByZWdpc3RlciA9IHZpbUdsb2JhbFN0YXRlLnJlZ2lzdGVyQ29udHJvbGxlci5nZXRSZWdpc3RlcihyZWdpc3Rlck5hbWUpO1xuICAgICAgaWYgKHJlZ2lzdGVyICYmIHJlZ2lzdGVyLnB1c2hTZWFyY2hRdWVyeSkge1xuICAgICAgICByZWdpc3Rlci5wdXNoU2VhcmNoUXVlcnkocXVlcnkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIExpc3RlbnMgZm9yIGNoYW5nZXMgbWFkZSBpbiBpbnNlcnQgbW9kZS5cbiAgICAgKiBTaG91bGQgb25seSBiZSBhY3RpdmUgaW4gaW5zZXJ0IG1vZGUuXG4gICAgICovXG4gICAgZnVuY3Rpb24gb25DaGFuZ2UoY20sIGNoYW5nZU9iaikge1xuICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICB2YXIgbGFzdENoYW5nZSA9IG1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcztcbiAgICAgIGlmICghbWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nKSB7XG4gICAgICAgIHdoaWxlKGNoYW5nZU9iaikge1xuICAgICAgICAgIGxhc3RDaGFuZ2UuZXhwZWN0Q3Vyc29yQWN0aXZpdHlGb3JDaGFuZ2UgPSB0cnVlO1xuICAgICAgICAgIGlmIChsYXN0Q2hhbmdlLmlnbm9yZUNvdW50ID4gMSkge1xuICAgICAgICAgICAgbGFzdENoYW5nZS5pZ25vcmVDb3VudC0tO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2hhbmdlT2JqLm9yaWdpbiA9PSAnK2lucHV0JyB8fCBjaGFuZ2VPYmoub3JpZ2luID09ICdwYXN0ZSdcbiAgICAgICAgICAgICAgfHwgY2hhbmdlT2JqLm9yaWdpbiA9PT0gdW5kZWZpbmVkIC8qIG9ubHkgaW4gdGVzdGluZyAqLykge1xuICAgICAgICAgICAgdmFyIHNlbGVjdGlvbkNvdW50ID0gY20ubGlzdFNlbGVjdGlvbnMoKS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoc2VsZWN0aW9uQ291bnQgPiAxKVxuICAgICAgICAgICAgICBsYXN0Q2hhbmdlLmlnbm9yZUNvdW50ID0gc2VsZWN0aW9uQ291bnQ7XG4gICAgICAgICAgICB2YXIgdGV4dCA9IGNoYW5nZU9iai50ZXh0LmpvaW4oJ1xcbicpO1xuICAgICAgICAgICAgaWYgKGxhc3RDaGFuZ2UubWF5YmVSZXNldCkge1xuICAgICAgICAgICAgICBsYXN0Q2hhbmdlLmNoYW5nZXMgPSBbXTtcbiAgICAgICAgICAgICAgbGFzdENoYW5nZS5tYXliZVJlc2V0ID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGV4dCkge1xuICAgICAgICAgICAgICBpZiAoY20uc3RhdGUub3ZlcndyaXRlICYmICEvXFxuLy50ZXN0KHRleHQpKSB7XG4gICAgICAgICAgICAgICAgbGFzdENoYW5nZS5jaGFuZ2VzLnB1c2goW3RleHRdKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsYXN0Q2hhbmdlLmNoYW5nZXMucHVzaCh0ZXh0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBDaGFuZ2Ugb2JqZWN0cyBtYXkgYmUgY2hhaW5lZCB3aXRoIG5leHQuXG4gICAgICAgICAgY2hhbmdlT2JqID0gY2hhbmdlT2JqLm5leHQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAqIExpc3RlbnMgZm9yIGFueSBraW5kIG9mIGN1cnNvciBhY3Rpdml0eSBvbiBDb2RlTWlycm9yLlxuICAgICovXG4gICAgZnVuY3Rpb24gb25DdXJzb3JBY3Rpdml0eShjbSkge1xuICAgICAgdmFyIHZpbSA9IGNtLnN0YXRlLnZpbTtcbiAgICAgIGlmICh2aW0uaW5zZXJ0TW9kZSkge1xuICAgICAgICAvLyBUcmFja2luZyBjdXJzb3IgYWN0aXZpdHkgaW4gaW5zZXJ0IG1vZGUgKGZvciBtYWNybyBzdXBwb3J0KS5cbiAgICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICAgIGlmIChtYWNyb01vZGVTdGF0ZS5pc1BsYXlpbmcpIHsgcmV0dXJuOyB9XG4gICAgICAgIHZhciBsYXN0Q2hhbmdlID0gbWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzO1xuICAgICAgICBpZiAobGFzdENoYW5nZS5leHBlY3RDdXJzb3JBY3Rpdml0eUZvckNoYW5nZSkge1xuICAgICAgICAgIGxhc3RDaGFuZ2UuZXhwZWN0Q3Vyc29yQWN0aXZpdHlGb3JDaGFuZ2UgPSBmYWxzZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBDdXJzb3IgbW92ZWQgb3V0c2lkZSB0aGUgY29udGV4dCBvZiBhbiBlZGl0LiBSZXNldCB0aGUgY2hhbmdlLlxuICAgICAgICAgIGxhc3RDaGFuZ2UubWF5YmVSZXNldCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIWNtLmN1ck9wLmlzVmltT3ApIHtcbiAgICAgICAgaGFuZGxlRXh0ZXJuYWxTZWxlY3Rpb24oY20sIHZpbSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZ1bmN0aW9uIGhhbmRsZUV4dGVybmFsU2VsZWN0aW9uKGNtLCB2aW0sIGtlZXBIUG9zKSB7XG4gICAgICB2YXIgYW5jaG9yID0gY20uZ2V0Q3Vyc29yKCdhbmNob3InKTtcbiAgICAgIHZhciBoZWFkID0gY20uZ2V0Q3Vyc29yKCdoZWFkJyk7XG4gICAgICAvLyBFbnRlciBvciBleGl0IHZpc3VhbCBtb2RlIHRvIG1hdGNoIG1vdXNlIHNlbGVjdGlvbi5cbiAgICAgIGlmICh2aW0udmlzdWFsTW9kZSAmJiAhY20uc29tZXRoaW5nU2VsZWN0ZWQoKSkge1xuICAgICAgICBleGl0VmlzdWFsTW9kZShjbSwgZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmICghdmltLnZpc3VhbE1vZGUgJiYgIXZpbS5pbnNlcnRNb2RlICYmIGNtLnNvbWV0aGluZ1NlbGVjdGVkKCkpIHtcbiAgICAgICAgdmltLnZpc3VhbE1vZGUgPSB0cnVlO1xuICAgICAgICB2aW0udmlzdWFsTGluZSA9IGZhbHNlO1xuICAgICAgICBDb2RlTWlycm9yLnNpZ25hbChjbSwgXCJ2aW0tbW9kZS1jaGFuZ2VcIiwge21vZGU6IFwidmlzdWFsXCJ9KTtcbiAgICAgIH1cbiAgICAgIGlmICh2aW0udmlzdWFsTW9kZSkge1xuICAgICAgICAvLyBCaW5kIENvZGVNaXJyb3Igc2VsZWN0aW9uIG1vZGVsIHRvIHZpbSBzZWxlY3Rpb24gbW9kZWwuXG4gICAgICAgIC8vIE1vdXNlIHNlbGVjdGlvbnMgYXJlIGNvbnNpZGVyZWQgdmlzdWFsIGNoYXJhY3Rlcndpc2UuXG4gICAgICAgIHZhciBoZWFkT2Zmc2V0ID0gIWN1cnNvcklzQmVmb3JlKGhlYWQsIGFuY2hvcikgPyAtMSA6IDA7XG4gICAgICAgIHZhciBhbmNob3JPZmZzZXQgPSBjdXJzb3JJc0JlZm9yZShoZWFkLCBhbmNob3IpID8gLTEgOiAwO1xuICAgICAgICBoZWFkID0gb2Zmc2V0Q3Vyc29yKGhlYWQsIDAsIGhlYWRPZmZzZXQpO1xuICAgICAgICBhbmNob3IgPSBvZmZzZXRDdXJzb3IoYW5jaG9yLCAwLCBhbmNob3JPZmZzZXQpO1xuICAgICAgICB2aW0uc2VsID0ge1xuICAgICAgICAgIGFuY2hvcjogYW5jaG9yLFxuICAgICAgICAgIGhlYWQ6IGhlYWRcbiAgICAgICAgfTtcbiAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCAnPCcsIGN1cnNvck1pbihoZWFkLCBhbmNob3IpKTtcbiAgICAgICAgdXBkYXRlTWFyayhjbSwgdmltLCAnPicsIGN1cnNvck1heChoZWFkLCBhbmNob3IpKTtcbiAgICAgIH0gZWxzZSBpZiAoIXZpbS5pbnNlcnRNb2RlICYmICFrZWVwSFBvcykge1xuICAgICAgICAvLyBSZXNldCBsYXN0SFBvcyBpZiBzZWxlY3Rpb24gd2FzIG1vZGlmaWVkIGJ5IHNvbWV0aGluZyBvdXRzaWRlIG9mIHZpbSBtb2RlIGUuZy4gYnkgbW91c2UuXG4gICAgICAgIHZpbS5sYXN0SFBvcyA9IGNtLmdldEN1cnNvcigpLmNoO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBXcmFwcGVyIGZvciBzcGVjaWFsIGtleXMgcHJlc3NlZCBpbiBpbnNlcnQgbW9kZSAqL1xuICAgIGZ1bmN0aW9uIEluc2VydE1vZGVLZXkoa2V5TmFtZSkge1xuICAgICAgdGhpcy5rZXlOYW1lID0ga2V5TmFtZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAqIEhhbmRsZXMgcmF3IGtleSBkb3duIGV2ZW50cyBmcm9tIHRoZSB0ZXh0IGFyZWEuXG4gICAgKiAtIFNob3VsZCBvbmx5IGJlIGFjdGl2ZSBpbiBpbnNlcnQgbW9kZS5cbiAgICAqIC0gRm9yIHJlY29yZGluZyBkZWxldGVzIGluIGluc2VydCBtb2RlLlxuICAgICovXG4gICAgZnVuY3Rpb24gb25LZXlFdmVudFRhcmdldEtleURvd24oZSkge1xuICAgICAgdmFyIG1hY3JvTW9kZVN0YXRlID0gdmltR2xvYmFsU3RhdGUubWFjcm9Nb2RlU3RhdGU7XG4gICAgICB2YXIgbGFzdENoYW5nZSA9IG1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcztcbiAgICAgIHZhciBrZXlOYW1lID0gQ29kZU1pcnJvci5rZXlOYW1lKGUpO1xuICAgICAgaWYgKCFrZXlOYW1lKSB7IHJldHVybjsgfVxuICAgICAgZnVuY3Rpb24gb25LZXlGb3VuZCgpIHtcbiAgICAgICAgaWYgKGxhc3RDaGFuZ2UubWF5YmVSZXNldCkge1xuICAgICAgICAgIGxhc3RDaGFuZ2UuY2hhbmdlcyA9IFtdO1xuICAgICAgICAgIGxhc3RDaGFuZ2UubWF5YmVSZXNldCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGxhc3RDaGFuZ2UuY2hhbmdlcy5wdXNoKG5ldyBJbnNlcnRNb2RlS2V5KGtleU5hbWUpKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoa2V5TmFtZS5pbmRleE9mKCdEZWxldGUnKSAhPSAtMSB8fCBrZXlOYW1lLmluZGV4T2YoJ0JhY2tzcGFjZScpICE9IC0xKSB7XG4gICAgICAgIENvZGVNaXJyb3IubG9va3VwS2V5KGtleU5hbWUsICd2aW0taW5zZXJ0Jywgb25LZXlGb3VuZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVwZWF0cyB0aGUgbGFzdCBlZGl0LCB3aGljaCBpbmNsdWRlcyBleGFjdGx5IDEgY29tbWFuZCBhbmQgYXQgbW9zdCAxXG4gICAgICogaW5zZXJ0LiBPcGVyYXRvciBhbmQgbW90aW9uIGNvbW1hbmRzIGFyZSByZWFkIGZyb20gbGFzdEVkaXRJbnB1dFN0YXRlLFxuICAgICAqIHdoaWxlIGFjdGlvbiBjb21tYW5kcyBhcmUgcmVhZCBmcm9tIGxhc3RFZGl0QWN0aW9uQ29tbWFuZC5cbiAgICAgKlxuICAgICAqIElmIHJlcGVhdEZvckluc2VydCBpcyB0cnVlLCB0aGVuIHRoZSBmdW5jdGlvbiB3YXMgY2FsbGVkIGJ5XG4gICAgICogZXhpdEluc2VydE1vZGUgdG8gcmVwZWF0IHRoZSBpbnNlcnQgbW9kZSBjaGFuZ2VzIHRoZSB1c2VyIGp1c3QgbWFkZS4gVGhlXG4gICAgICogY29ycmVzcG9uZGluZyBlbnRlckluc2VydE1vZGUgY2FsbCB3YXMgbWFkZSB3aXRoIGEgY291bnQuXG4gICAgICovXG4gICAgZnVuY3Rpb24gcmVwZWF0TGFzdEVkaXQoY20sIHZpbSwgcmVwZWF0LCByZXBlYXRGb3JJbnNlcnQpIHtcbiAgICAgIHZhciBtYWNyb01vZGVTdGF0ZSA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlO1xuICAgICAgbWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nID0gdHJ1ZTtcbiAgICAgIHZhciBpc0FjdGlvbiA9ICEhdmltLmxhc3RFZGl0QWN0aW9uQ29tbWFuZDtcbiAgICAgIHZhciBjYWNoZWRJbnB1dFN0YXRlID0gdmltLmlucHV0U3RhdGU7XG4gICAgICBmdW5jdGlvbiByZXBlYXRDb21tYW5kKCkge1xuICAgICAgICBpZiAoaXNBY3Rpb24pIHtcbiAgICAgICAgICBjb21tYW5kRGlzcGF0Y2hlci5wcm9jZXNzQWN0aW9uKGNtLCB2aW0sIHZpbS5sYXN0RWRpdEFjdGlvbkNvbW1hbmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbW1hbmREaXNwYXRjaGVyLmV2YWxJbnB1dChjbSwgdmltKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZnVuY3Rpb24gcmVwZWF0SW5zZXJ0KHJlcGVhdCkge1xuICAgICAgICBpZiAobWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzLmNoYW5nZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIC8vIEZvciBzb21lIHJlYXNvbiwgcmVwZWF0IGN3IGluIGRlc2t0b3AgVklNIGRvZXMgbm90IHJlcGVhdFxuICAgICAgICAgIC8vIGluc2VydCBtb2RlIGNoYW5nZXMuIFdpbGwgY29uZm9ybSB0byB0aGF0IGJlaGF2aW9yLlxuICAgICAgICAgIHJlcGVhdCA9ICF2aW0ubGFzdEVkaXRBY3Rpb25Db21tYW5kID8gMSA6IHJlcGVhdDtcbiAgICAgICAgICB2YXIgY2hhbmdlT2JqZWN0ID0gbWFjcm9Nb2RlU3RhdGUubGFzdEluc2VydE1vZGVDaGFuZ2VzO1xuICAgICAgICAgIHJlcGVhdEluc2VydE1vZGVDaGFuZ2VzKGNtLCBjaGFuZ2VPYmplY3QuY2hhbmdlcywgcmVwZWF0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmltLmlucHV0U3RhdGUgPSB2aW0ubGFzdEVkaXRJbnB1dFN0YXRlO1xuICAgICAgaWYgKGlzQWN0aW9uICYmIHZpbS5sYXN0RWRpdEFjdGlvbkNvbW1hbmQuaW50ZXJsYWNlSW5zZXJ0UmVwZWF0KSB7XG4gICAgICAgIC8vIG8gYW5kIE8gcmVwZWF0IGhhdmUgdG8gYmUgaW50ZXJsYWNlZCB3aXRoIGluc2VydCByZXBlYXRzIHNvIHRoYXQgdGhlXG4gICAgICAgIC8vIGluc2VydGlvbnMgYXBwZWFyIG9uIHNlcGFyYXRlIGxpbmVzIGluc3RlYWQgb2YgdGhlIGxhc3QgbGluZS5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXBlYXQ7IGkrKykge1xuICAgICAgICAgIHJlcGVhdENvbW1hbmQoKTtcbiAgICAgICAgICByZXBlYXRJbnNlcnQoMSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghcmVwZWF0Rm9ySW5zZXJ0KSB7XG4gICAgICAgICAgLy8gSGFjayB0byBnZXQgdGhlIGN1cnNvciB0byBlbmQgdXAgYXQgdGhlIHJpZ2h0IHBsYWNlLiBJZiBJIGlzXG4gICAgICAgICAgLy8gcmVwZWF0ZWQgaW4gaW5zZXJ0IG1vZGUgcmVwZWF0LCBjdXJzb3Igd2lsbCBiZSAxIGluc2VydFxuICAgICAgICAgIC8vIGNoYW5nZSBzZXQgbGVmdCBvZiB3aGVyZSBpdCBzaG91bGQgYmUuXG4gICAgICAgICAgcmVwZWF0Q29tbWFuZCgpO1xuICAgICAgICB9XG4gICAgICAgIHJlcGVhdEluc2VydChyZXBlYXQpO1xuICAgICAgfVxuICAgICAgdmltLmlucHV0U3RhdGUgPSBjYWNoZWRJbnB1dFN0YXRlO1xuICAgICAgaWYgKHZpbS5pbnNlcnRNb2RlICYmICFyZXBlYXRGb3JJbnNlcnQpIHtcbiAgICAgICAgLy8gRG9uJ3QgZXhpdCBpbnNlcnQgbW9kZSB0d2ljZS4gSWYgcmVwZWF0Rm9ySW5zZXJ0IGlzIHNldCwgdGhlbiB3ZVxuICAgICAgICAvLyB3ZXJlIGNhbGxlZCBieSBhbiBleGl0SW5zZXJ0TW9kZSBjYWxsIGxvd2VyIG9uIHRoZSBzdGFjay5cbiAgICAgICAgZXhpdEluc2VydE1vZGUoY20pO1xuICAgICAgfVxuICAgICAgbWFjcm9Nb2RlU3RhdGUuaXNQbGF5aW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVwZWF0SW5zZXJ0TW9kZUNoYW5nZXMoY20sIGNoYW5nZXMsIHJlcGVhdCkge1xuICAgICAgZnVuY3Rpb24ga2V5SGFuZGxlcihiaW5kaW5nKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYmluZGluZyA9PSAnc3RyaW5nJykge1xuICAgICAgICAgIENvZGVNaXJyb3IuY29tbWFuZHNbYmluZGluZ10oY20pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJpbmRpbmcoY20pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgdmFyIGhlYWQgPSBjbS5nZXRDdXJzb3IoJ2hlYWQnKTtcbiAgICAgIHZhciB2aXN1YWxCbG9jayA9IHZpbUdsb2JhbFN0YXRlLm1hY3JvTW9kZVN0YXRlLmxhc3RJbnNlcnRNb2RlQ2hhbmdlcy52aXN1YWxCbG9jaztcbiAgICAgIGlmICh2aXN1YWxCbG9jaykge1xuICAgICAgICAvLyBTZXQgdXAgYmxvY2sgc2VsZWN0aW9uIGFnYWluIGZvciByZXBlYXRpbmcgdGhlIGNoYW5nZXMuXG4gICAgICAgIHNlbGVjdEZvckluc2VydChjbSwgaGVhZCwgdmlzdWFsQmxvY2sgKyAxKTtcbiAgICAgICAgcmVwZWF0ID0gY20ubGlzdFNlbGVjdGlvbnMoKS5sZW5ndGg7XG4gICAgICAgIGNtLnNldEN1cnNvcihoZWFkKTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwZWF0OyBpKyspIHtcbiAgICAgICAgaWYgKHZpc3VhbEJsb2NrKSB7XG4gICAgICAgICAgY20uc2V0Q3Vyc29yKG9mZnNldEN1cnNvcihoZWFkLCBpLCAwKSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBjaGFuZ2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgdmFyIGNoYW5nZSA9IGNoYW5nZXNbal07XG4gICAgICAgICAgaWYgKGNoYW5nZSBpbnN0YW5jZW9mIEluc2VydE1vZGVLZXkpIHtcbiAgICAgICAgICAgIENvZGVNaXJyb3IubG9va3VwS2V5KGNoYW5nZS5rZXlOYW1lLCAndmltLWluc2VydCcsIGtleUhhbmRsZXIpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGNoYW5nZSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBjbS5yZXBsYWNlU2VsZWN0aW9uKGNoYW5nZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBzdGFydCA9IGNtLmdldEN1cnNvcigpO1xuICAgICAgICAgICAgdmFyIGVuZCA9IG9mZnNldEN1cnNvcihzdGFydCwgMCwgY2hhbmdlWzBdLmxlbmd0aCk7XG4gICAgICAgICAgICBjbS5yZXBsYWNlUmFuZ2UoY2hhbmdlWzBdLCBzdGFydCwgZW5kKTtcbiAgICAgICAgICAgIGNtLnNldEN1cnNvcihlbmQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHZpc3VhbEJsb2NrKSB7XG4gICAgICAgIGNtLnNldEN1cnNvcihvZmZzZXRDdXJzb3IoaGVhZCwgMCwgMSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlc2V0VmltR2xvYmFsU3RhdGUoKTtcbiAgXG4gIC8vIEluaXRpYWxpemUgVmltIGFuZCBtYWtlIGl0IGF2YWlsYWJsZSBhcyBhbiBBUEkuXG4gIENvZGVNaXJyb3IuVmltID0gdmltQXBpO1xuXG4gIHZhciBzcGVjaWFsS2V5ID0geydyZXR1cm4nOidDUicsYmFja3NwYWNlOidCUycsJ2RlbGV0ZSc6J0RlbCcsZXNjOidFc2MnLFxuICAgIGxlZnQ6J0xlZnQnLHJpZ2h0OidSaWdodCcsdXA6J1VwJyxkb3duOidEb3duJyxzcGFjZTogJ1NwYWNlJyxpbnNlcnQ6ICdJbnMnLFxuICAgIGhvbWU6J0hvbWUnLGVuZDonRW5kJyxwYWdldXA6J1BhZ2VVcCcscGFnZWRvd246J1BhZ2VEb3duJywgZW50ZXI6ICdDUidcbiAgfTtcbiAgZnVuY3Rpb24gbG9va3VwS2V5KGhhc2hJZCwga2V5LCBlKSB7XG4gICAgaWYgKGtleS5sZW5ndGggPiAxICYmIGtleVswXSA9PSBcIm5cIikge1xuICAgICAga2V5ID0ga2V5LnJlcGxhY2UoXCJudW1wYWRcIiwgXCJcIik7XG4gICAgfVxuICAgIGtleSA9IHNwZWNpYWxLZXlba2V5XSB8fCBrZXk7XG4gICAgdmFyIG5hbWUgPSAnJztcbiAgICBpZiAoZS5jdHJsS2V5KSB7IG5hbWUgKz0gJ0MtJzsgfVxuICAgIGlmIChlLmFsdEtleSkgeyBuYW1lICs9ICdBLSc7IH1cbiAgICBpZiAoKG5hbWUgfHwga2V5Lmxlbmd0aCA+IDEpICYmIGUuc2hpZnRLZXkpIHsgbmFtZSArPSAnUy0nOyB9XG5cbiAgICBuYW1lICs9IGtleTtcbiAgICBpZiAobmFtZS5sZW5ndGggPiAxKSB7IG5hbWUgPSAnPCcgKyBuYW1lICsgJz4nOyB9XG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cbiAgdmFyIGhhbmRsZUtleSA9IHZpbUFwaS5oYW5kbGVLZXkuYmluZCh2aW1BcGkpO1xuICB2aW1BcGkuaGFuZGxlS2V5ID0gZnVuY3Rpb24oY20sIGtleSwgb3JpZ2luKSB7XG4gICAgcmV0dXJuIGNtLm9wZXJhdGlvbihmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBoYW5kbGVLZXkoY20sIGtleSwgb3JpZ2luKTtcbiAgICB9LCB0cnVlKTtcbiAgfVxuICBmdW5jdGlvbiBjbG9uZVZpbVN0YXRlKHN0YXRlKSB7XG4gICAgdmFyIG4gPSBuZXcgc3RhdGUuY29uc3RydWN0b3IoKTtcbiAgICBPYmplY3Qua2V5cyhzdGF0ZSkuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcbiAgICAgIHZhciBvID0gc3RhdGVba2V5XTtcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KG8pKVxuICAgICAgICBvID0gby5zbGljZSgpO1xuICAgICAgZWxzZSBpZiAobyAmJiB0eXBlb2YgbyA9PSBcIm9iamVjdFwiICYmIG8uY29uc3RydWN0b3IgIT0gT2JqZWN0KVxuICAgICAgICBvID0gY2xvbmVWaW1TdGF0ZShvKTtcbiAgICAgIG5ba2V5XSA9IG87XG4gICAgfSk7XG4gICAgaWYgKHN0YXRlLnNlbCkge1xuICAgICAgbi5zZWwgPSB7XG4gICAgICAgIGhlYWQ6IHN0YXRlLnNlbC5oZWFkICYmIGNvcHlDdXJzb3Ioc3RhdGUuc2VsLmhlYWQpLFxuICAgICAgICBhbmNob3I6IHN0YXRlLnNlbC5hbmNob3IgJiYgY29weUN1cnNvcihzdGF0ZS5zZWwuYW5jaG9yKVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIG47XG4gIH1cbiAgZnVuY3Rpb24gbXVsdGlTZWxlY3RIYW5kbGVLZXkoY20sIGtleSwgb3JpZ2luKSB7XG4gICAgdmFyIGlzSGFuZGxlZCA9IGZhbHNlO1xuICAgIHZhciB2aW0gPSB2aW1BcGkubWF5YmVJbml0VmltU3RhdGVfKGNtKTtcbiAgICB2YXIgdmlzdWFsQmxvY2sgPSB2aW0udmlzdWFsQmxvY2sgfHwgdmltLndhc0luVmlzdWFsQmxvY2s7XG5cbiAgICB2YXIgd2FzTXVsdGlzZWxlY3QgPSBjbS5hY2UuaW5NdWx0aVNlbGVjdE1vZGU7XG4gICAgaWYgKHZpbS53YXNJblZpc3VhbEJsb2NrICYmICF3YXNNdWx0aXNlbGVjdCkge1xuICAgICAgdmltLndhc0luVmlzdWFsQmxvY2sgPSBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKHdhc011bHRpc2VsZWN0ICYmIHZpbS52aXN1YWxCbG9jaykge1xuICAgICAgIHZpbS53YXNJblZpc3VhbEJsb2NrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoa2V5ID09ICc8RXNjPicgJiYgIXZpbS5pbnNlcnRNb2RlICYmICF2aW0udmlzdWFsTW9kZSAmJiB3YXNNdWx0aXNlbGVjdCkge1xuICAgICAgY20uYWNlLmV4aXRNdWx0aVNlbGVjdE1vZGUoKTtcbiAgICB9IGVsc2UgaWYgKHZpc3VhbEJsb2NrIHx8ICF3YXNNdWx0aXNlbGVjdCB8fCBjbS5hY2UuaW5WaXJ0dWFsU2VsZWN0aW9uTW9kZSkge1xuICAgICAgaXNIYW5kbGVkID0gdmltQXBpLmhhbmRsZUtleShjbSwga2V5LCBvcmlnaW4pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgb2xkID0gY2xvbmVWaW1TdGF0ZSh2aW0pO1xuICAgICAgY20ub3BlcmF0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgICBjbS5hY2UuZm9yRWFjaFNlbGVjdGlvbihmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgc2VsID0gY20uYWNlLnNlbGVjdGlvbjtcbiAgICAgICAgICBjbS5zdGF0ZS52aW0ubGFzdEhQb3MgPSBzZWwuJGRlc2lyZWRDb2x1bW4gPT0gbnVsbCA/IHNlbC5sZWFkLmNvbHVtbiA6IHNlbC4kZGVzaXJlZENvbHVtbjtcbiAgICAgICAgICB2YXIgaGVhZCA9IGNtLmdldEN1cnNvcihcImhlYWRcIik7XG4gICAgICAgICAgdmFyIGFuY2hvciA9IGNtLmdldEN1cnNvcihcImFuY2hvclwiKTtcbiAgICAgICAgICB2YXIgaGVhZE9mZnNldCA9ICFjdXJzb3JJc0JlZm9yZShoZWFkLCBhbmNob3IpID8gLTEgOiAwO1xuICAgICAgICAgIHZhciBhbmNob3JPZmZzZXQgPSBjdXJzb3JJc0JlZm9yZShoZWFkLCBhbmNob3IpID8gLTEgOiAwO1xuICAgICAgICAgIGhlYWQgPSBvZmZzZXRDdXJzb3IoaGVhZCwgMCwgaGVhZE9mZnNldCk7XG4gICAgICAgICAgYW5jaG9yID0gb2Zmc2V0Q3Vyc29yKGFuY2hvciwgMCwgYW5jaG9yT2Zmc2V0KTtcbiAgICAgICAgICBjbS5zdGF0ZS52aW0uc2VsLmhlYWQgPSBoZWFkO1xuICAgICAgICAgIGNtLnN0YXRlLnZpbS5zZWwuYW5jaG9yID0gYW5jaG9yO1xuXG4gICAgICAgICAgaXNIYW5kbGVkID0gaGFuZGxlS2V5KGNtLCBrZXksIG9yaWdpbik7XG4gICAgICAgICAgc2VsLiRkZXNpcmVkQ29sdW1uID0gY20uc3RhdGUudmltLmxhc3RIUG9zID09IC0xID8gbnVsbCA6IGNtLnN0YXRlLnZpbS5sYXN0SFBvcztcbiAgICAgICAgICBpZiAoY20udmlydHVhbFNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgY20uc3RhdGUudmltID0gY2xvbmVWaW1TdGF0ZShvbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChjbS5jdXJPcC5jdXJzb3JBY3Rpdml0eSAmJiAhaXNIYW5kbGVkKVxuICAgICAgICAgIGNtLmN1ck9wLmN1cnNvckFjdGl2aXR5ID0gZmFsc2U7XG4gICAgICB9LCB0cnVlKTtcbiAgICB9XG4gICAgLy8gYWNlIGNvbW1hbmRzIGxpa2UgY3RybC1hbHQtbCBtYXkgYnJpbmcgdmlzdWFsTW9kZSBhbmQgc2VsZWN0aW9uIG91dCBvZiBzeW5jXG4gICAgaWYgKGlzSGFuZGxlZCAmJiAhdmltLnZpc3VhbE1vZGUgJiYgIXZpbS5pbnNlcnQgJiYgdmltLnZpc3VhbE1vZGUgIT0gY20uc29tZXRoaW5nU2VsZWN0ZWQoKSkge1xuICAgICAgaGFuZGxlRXh0ZXJuYWxTZWxlY3Rpb24oY20sIHZpbSwgdHJ1ZSk7XG4gICAgfVxuICAgIHJldHVybiBpc0hhbmRsZWQ7XG4gIH1cbiAgZXhwb3J0cy5Db2RlTWlycm9yID0gQ29kZU1pcnJvcjtcbiAgdmFyIGdldFZpbSA9IHZpbUFwaS5tYXliZUluaXRWaW1TdGF0ZV87XG4gIGV4cG9ydHMuaGFuZGxlciA9IHtcbiAgICAkaWQ6IFwiYWNlL2tleWJvYXJkL3ZpbVwiLFxuICAgIGRyYXdDdXJzb3I6IGZ1bmN0aW9uKGVsZW1lbnQsIHBpeGVsUG9zLCBjb25maWcsIHNlbCwgc2Vzc2lvbikge1xuICAgICAgdmFyIHZpbSA9IHRoaXMuc3RhdGUudmltIHx8IHt9O1xuICAgICAgdmFyIHcgPSBjb25maWcuY2hhcmFjdGVyV2lkdGg7XG4gICAgICB2YXIgaCA9IGNvbmZpZy5saW5lSGVpZ2h0O1xuICAgICAgdmFyIHRvcCA9IHBpeGVsUG9zLnRvcDtcbiAgICAgIHZhciBsZWZ0ID0gcGl4ZWxQb3MubGVmdDtcbiAgICAgIGlmICghdmltLmluc2VydE1vZGUpIHtcbiAgICAgICAgdmFyIGlzYmFja3dhcmRzID0gIXNlbC5jdXJzb3JcbiAgICAgICAgICAgID8gc2Vzc2lvbi5zZWxlY3Rpb24uaXNCYWNrd2FyZHMoKSB8fCBzZXNzaW9uLnNlbGVjdGlvbi5pc0VtcHR5KClcbiAgICAgICAgICAgIDogUmFuZ2UuY29tcGFyZVBvaW50cyhzZWwuY3Vyc29yLCBzZWwuc3RhcnQpIDw9IDA7XG4gICAgICAgIGlmICghaXNiYWNrd2FyZHMgJiYgbGVmdCA+IHcpXG4gICAgICAgICAgbGVmdCAtPSB3O1xuICAgICAgfVxuICAgICAgaWYgKCF2aW0uaW5zZXJ0TW9kZSAmJiB2aW0uc3RhdHVzKSB7XG4gICAgICAgIGggPSBoIC8gMjtcbiAgICAgICAgdG9wICs9IGg7XG4gICAgICB9XG4gICAgICBkb21MaWIudHJhbnNsYXRlKGVsZW1lbnQsIGxlZnQsIHRvcCk7XG4gICAgICBkb21MaWIuc2V0U3R5bGUoZWxlbWVudC5zdHlsZSwgXCJ3aWR0aFwiLCB3ICsgXCJweFwiKTtcbiAgICAgIGRvbUxpYi5zZXRTdHlsZShlbGVtZW50LnN0eWxlLCBcImhlaWdodFwiLCBoICsgXCJweFwiKTtcbiAgICB9LFxuICAgICRnZXREaXJlY3Rpb25Gb3JIaWdobGlnaHQ6IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgIHZhciBjbSA9IGVkaXRvci5zdGF0ZS5jbTtcbiAgICAgIHZhciB2aW0gPSBnZXRWaW0oY20pO1xuICAgICAgaWYgKCF2aW0uaW5zZXJ0TW9kZSkge1xuICAgICAgICByZXR1cm4gZWRpdG9yLnNlc3Npb24uc2VsZWN0aW9uLmlzQmFja3dhcmRzKCkgfHwgZWRpdG9yLnNlc3Npb24uc2VsZWN0aW9uLmlzRW1wdHkoKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGhhbmRsZUtleWJvYXJkOiBmdW5jdGlvbihkYXRhLCBoYXNoSWQsIGtleSwga2V5Q29kZSwgZSkge1xuICAgICAgdmFyIGVkaXRvciA9IGRhdGEuZWRpdG9yO1xuICAgICAgdmFyIGNtID0gZWRpdG9yLnN0YXRlLmNtO1xuICAgICAgdmFyIHZpbSA9IGdldFZpbShjbSk7XG4gICAgICBpZiAoa2V5Q29kZSA9PSAtMSkgcmV0dXJuO1xuXG4gICAgICAvLyBpbiBub24taW5zZXJ0IG1vZGUgd2UgdHJ5IHRvIGZpbmQgdGhlIGFzY2lpIGtleSBjb3JyZXNwb25kaW5nIHRvIHRoZSB0ZXh0IGluIHRleHRhcmVhXG4gICAgICAvLyB0aGlzIGlzIG5lZWRlZCBiZWNhdXNlIGluIGxhbmd1YWdlcyB0aGF0IHVzZSBsYXRpbiBhbHBoYWJldCB3ZSB3YW50IHRvIGdldCB0aGUga2V5IHRoYXQgYnJvd3NlciBzZW5kcyB0byB0aGUgdGV4dGFyZWFcbiAgICAgIC8vIGFuZCBpbiBub25cbiAgICAgIGlmICghdmltLmluc2VydE1vZGUpIHtcbiAgICAgICAgaWYgKGhhc2hJZCA9PSAtMSkge1xuICAgICAgICAgIGlmIChrZXkuY2hhckNvZGVBdCgwKSA+IDB4RkYpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmlucHV0S2V5KSB7XG4gICAgICAgICAgICAgIGtleSA9IGRhdGEuaW5wdXRLZXk7XG4gICAgICAgICAgICAgIGlmIChrZXkgJiYgZGF0YS5pbnB1dEhhc2ggPT0gNClcbiAgICAgICAgICAgICAgICBrZXkgPSBrZXkudG9VcHBlckNhc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YS5pbnB1dENoYXIgPSBrZXk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaGFzaElkID09IDQgfHwgaGFzaElkID09IDApIHtcbiAgICAgICAgICBpZiAoZGF0YS5pbnB1dEtleSA9PSBrZXkgJiYgZGF0YS5pbnB1dEhhc2ggPT0gaGFzaElkICYmIGRhdGEuaW5wdXRDaGFyKSB7XG4gICAgICAgICAgICAvLyBvbiBtYWMgdGV4dCBpbnB1dCBkb2Vzbid0IHJlcGVhdFxuICAgICAgICAgICAga2V5ID0gZGF0YS5pbnB1dENoYXI7XG4gICAgICAgICAgICBoYXNoSWQgPSAtMVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRhdGEuaW5wdXRDaGFyID0gbnVsbDtcbiAgICAgICAgICAgIGRhdGEuaW5wdXRLZXkgPSBrZXk7XG4gICAgICAgICAgICBkYXRhLmlucHV0SGFzaCA9IGhhc2hJZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgZGF0YS5pbnB1dENoYXIgPSBkYXRhLmlucHV0S2V5ID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoY20uc3RhdGUub3ZlcndyaXRlICYmIHZpbS5pbnNlcnRNb2RlICYmIGtleSA9PSBcImJhY2tzcGFjZVwiICYmIGhhc2hJZCA9PSAwKSB7XG4gICAgICAgIHJldHVybiB7Y29tbWFuZDogXCJnb3RvbGVmdFwifVxuICAgICAgfVxuXG4gICAgICAvLyBjdHJsLWMgaXMgc3BlY2lhbCBpdCBib3RoIGV4aXRzIG1vZGUgYW5kIGNvcGllcyB0ZXh0XG4gICAgICBpZiAoa2V5ID09IFwiY1wiICYmIGhhc2hJZCA9PSAxKSB7IC8vIGtleSA9PSBcImN0cmwtY1wiXG4gICAgICAgIGlmICghdXNlcmFnZW50LmlzTWFjICYmIGVkaXRvci5nZXRDb3B5VGV4dCgpKSB7XG4gICAgICAgICAgZWRpdG9yLm9uY2UoXCJjb3B5XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHZpbS5pbnNlcnRNb2RlKSBlZGl0b3Iuc2VsZWN0aW9uLmNsZWFyU2VsZWN0aW9uKCk7XG4gICAgICAgICAgICBlbHNlIGNtLm9wZXJhdGlvbihmdW5jdGlvbigpIHsgZXhpdFZpc3VhbE1vZGUoY20pOyB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4ge2NvbW1hbmQ6IFwibnVsbFwiLCBwYXNzRXZlbnQ6IHRydWV9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChrZXkgPT0gXCJlc2NcIiAmJiAhdmltLmluc2VydE1vZGUgJiYgIXZpbS52aXN1YWxNb2RlICYmICFjbS5hY2UuaW5NdWx0aVNlbGVjdE1vZGUpIHtcbiAgICAgICAgdmFyIHNlYXJjaFN0YXRlID0gZ2V0U2VhcmNoU3RhdGUoY20pO1xuICAgICAgICB2YXIgb3ZlcmxheSA9IHNlYXJjaFN0YXRlLmdldE92ZXJsYXkoKTtcbiAgICAgICAgaWYgKG92ZXJsYXkpIGNtLnJlbW92ZU92ZXJsYXkob3ZlcmxheSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNoSWQgPT0gLTEgfHwgaGFzaElkICYgMSB8fCBoYXNoSWQgPT09IDAgJiYga2V5Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdmFyIGluc2VydE1vZGUgPSB2aW0uaW5zZXJ0TW9kZTtcbiAgICAgICAgdmFyIG5hbWUgPSBsb29rdXBLZXkoaGFzaElkLCBrZXksIGUgfHwge30pO1xuICAgICAgICBpZiAodmltLnN0YXR1cyA9PSBudWxsKVxuICAgICAgICAgIHZpbS5zdGF0dXMgPSBcIlwiO1xuICAgICAgICB2YXIgaXNIYW5kbGVkID0gbXVsdGlTZWxlY3RIYW5kbGVLZXkoY20sIG5hbWUsICd1c2VyJyk7XG4gICAgICAgIHZpbSA9IGdldFZpbShjbSk7IC8vIG1heSBiZSBjaGFuZ2VkIGJ5IG11bHRpU2VsZWN0SGFuZGxlS2V5XG4gICAgICAgIGlmIChpc0hhbmRsZWQgJiYgdmltLnN0YXR1cyAhPSBudWxsKVxuICAgICAgICAgIHZpbS5zdGF0dXMgKz0gbmFtZTtcbiAgICAgICAgZWxzZSBpZiAodmltLnN0YXR1cyA9PSBudWxsKVxuICAgICAgICAgIHZpbS5zdGF0dXMgPSBcIlwiO1xuICAgICAgICBjbS5fc2lnbmFsKFwiY2hhbmdlU3RhdHVzXCIpO1xuICAgICAgICBpZiAoIWlzSGFuZGxlZCAmJiAoaGFzaElkICE9IC0xIHx8IGluc2VydE1vZGUpKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgcmV0dXJuIHtjb21tYW5kOiBcIm51bGxcIiwgcGFzc0V2ZW50OiAhaXNIYW5kbGVkfTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGF0dGFjaDogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICBpZiAoIWVkaXRvci5zdGF0ZSkgZWRpdG9yLnN0YXRlID0ge307XG4gICAgICB2YXIgY20gPSBuZXcgQ29kZU1pcnJvcihlZGl0b3IpO1xuICAgICAgZWRpdG9yLnN0YXRlLmNtID0gY207XG4gICAgICBlZGl0b3IuJHZpbU1vZGVIYW5kbGVyID0gdGhpcztcbiAgICAgIENvZGVNaXJyb3Iua2V5TWFwLnZpbS5hdHRhY2goY20pO1xuICAgICAgZ2V0VmltKGNtKS5zdGF0dXMgPSBudWxsO1xuICAgICAgY20ub24oJ3ZpbS1jb21tYW5kLWRvbmUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKGNtLnZpcnR1YWxTZWxlY3Rpb25Nb2RlKCkpIHJldHVybjtcbiAgICAgICAgZ2V0VmltKGNtKS5zdGF0dXMgPSBudWxsO1xuICAgICAgICBjbS5hY2UuX3NpZ25hbChcImNoYW5nZVN0YXR1c1wiKTtcbiAgICAgICAgY20uYWNlLnNlc3Npb24ubWFya1VuZG9Hcm91cCgpO1xuICAgICAgfSk7XG4gICAgICBjbS5vbihcImNoYW5nZVN0YXR1c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY20uYWNlLnJlbmRlcmVyLnVwZGF0ZUN1cnNvcigpO1xuICAgICAgICBjbS5hY2UuX3NpZ25hbChcImNoYW5nZVN0YXR1c1wiKTtcbiAgICAgIH0pO1xuICAgICAgY20ub24oXCJ2aW0tbW9kZS1jaGFuZ2VcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChjbS52aXJ0dWFsU2VsZWN0aW9uTW9kZSgpKSByZXR1cm47XG4gICAgICAgIHVwZGF0ZUlucHV0TW9kZSgpO1xuICAgICAgICBjbS5fc2lnbmFsKFwiY2hhbmdlU3RhdHVzXCIpO1xuICAgICAgfSk7XG4gICAgICBmdW5jdGlvbiB1cGRhdGVJbnB1dE1vZGUoKSB7XG4gICAgICAgIHZhciBpc0ludHNlcnQgPSBnZXRWaW0oY20pLmluc2VydE1vZGU7XG4gICAgICAgIGNtLmFjZS5yZW5kZXJlci5zZXRTdHlsZShcIm5vcm1hbC1tb2RlXCIsICFpc0ludHNlcnQpO1xuICAgICAgICBlZGl0b3IudGV4dElucHV0LnNldENvbW1hbmRNb2RlKCFpc0ludHNlcnQpO1xuICAgICAgICAvLyB3aXRob3V0IHRoaXMgcHJlc3MgYW5kIGhvZGwgcG9wdXAgaW4gbWFjIGlzIHNob3duIGluIG5vcm1hbCBtb2RlXG4gICAgICAgIGVkaXRvci5yZW5kZXJlci4ka2VlcFRleHRBcmVhQXRDdXJzb3IgPSBpc0ludHNlcnQ7XG4gICAgICAgIGVkaXRvci5yZW5kZXJlci4kYmxvY2tDdXJzb3IgPSAhaXNJbnRzZXJ0O1xuICAgICAgfVxuICAgICAgdXBkYXRlSW5wdXRNb2RlKCk7XG4gICAgICBlZGl0b3IucmVuZGVyZXIuJGN1cnNvckxheWVyLmRyYXdDdXJzb3IgPSB0aGlzLmRyYXdDdXJzb3IuYmluZChjbSk7XG4gICAgfSxcbiAgICBkZXRhY2g6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgdmFyIGNtID0gZWRpdG9yLnN0YXRlLmNtO1xuICAgICAgQ29kZU1pcnJvci5rZXlNYXAudmltLmRldGFjaChjbSk7XG4gICAgICBjbS5kZXN0cm95KCk7XG4gICAgICBlZGl0b3Iuc3RhdGUuY20gPSBudWxsO1xuICAgICAgZWRpdG9yLiR2aW1Nb2RlSGFuZGxlciA9IG51bGw7XG4gICAgICBlZGl0b3IucmVuZGVyZXIuJGN1cnNvckxheWVyLmRyYXdDdXJzb3IgPSBudWxsO1xuICAgICAgZWRpdG9yLnJlbmRlcmVyLnNldFN0eWxlKFwibm9ybWFsLW1vZGVcIiwgZmFsc2UpO1xuICAgICAgZWRpdG9yLnRleHRJbnB1dC5zZXRDb21tYW5kTW9kZShmYWxzZSk7XG4gICAgICBlZGl0b3IucmVuZGVyZXIuJGtlZXBUZXh0QXJlYUF0Q3Vyc29yID0gdHJ1ZTtcbiAgICB9LFxuICAgIGdldFN0YXR1c1RleHQ6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgdmFyIGNtID0gZWRpdG9yLnN0YXRlLmNtO1xuICAgICAgdmFyIHZpbSA9IGdldFZpbShjbSk7XG4gICAgICBpZiAodmltLmluc2VydE1vZGUpXG4gICAgICAgIHJldHVybiBcIklOU0VSVFwiO1xuICAgICAgdmFyIHN0YXR1cyA9IFwiXCI7XG4gICAgICBpZiAodmltLnZpc3VhbE1vZGUpIHtcbiAgICAgICAgc3RhdHVzICs9IFwiVklTVUFMXCI7XG4gICAgICAgIGlmICh2aW0udmlzdWFsTGluZSlcbiAgICAgICAgICBzdGF0dXMgKz0gXCIgTElORVwiO1xuICAgICAgICBpZiAodmltLnZpc3VhbEJsb2NrKVxuICAgICAgICAgIHN0YXR1cyArPSBcIiBCTE9DS1wiO1xuICAgICAgfVxuICAgICAgaWYgKHZpbS5zdGF0dXMpXG4gICAgICAgIHN0YXR1cyArPSAoc3RhdHVzID8gXCIgXCIgOiBcIlwiKSArIHZpbS5zdGF0dXM7XG4gICAgICByZXR1cm4gc3RhdHVzO1xuICAgIH1cbiAgfTtcbiAgdmltQXBpLmRlZmluZU9wdGlvbih7XG4gICAgbmFtZTogXCJ3cmFwXCIsXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSwgY20pIHtcbiAgICAgIGlmIChjbSkge2NtLmFjZS5zZXRPcHRpb24oXCJ3cmFwXCIsIHZhbHVlKX1cbiAgICB9LFxuICAgIHR5cGU6IFwiYm9vbGVhblwiXG4gIH0sIGZhbHNlKTtcbiAgdmltQXBpLmRlZmluZUV4KCd3cml0ZScsICd3JywgZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJzp3cml0ZSBpcyBub3QgaW1wbGVtZW50ZWQnKVxuICB9KTtcbiAgZGVmYXVsdEtleW1hcC5wdXNoKFxuICAgIHsga2V5czogJ3pjJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2ZvbGQnLCBhY3Rpb25BcmdzOiB7IG9wZW46IGZhbHNlIH0gfSxcbiAgICB7IGtleXM6ICd6QycsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdmb2xkJywgYWN0aW9uQXJnczogeyBvcGVuOiBmYWxzZSwgYWxsOiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICd6bycsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdmb2xkJywgYWN0aW9uQXJnczogeyBvcGVuOiB0cnVlIH0gfSxcbiAgICB7IGtleXM6ICd6TycsIHR5cGU6ICdhY3Rpb24nLCBhY3Rpb246ICdmb2xkJywgYWN0aW9uQXJnczogeyBvcGVuOiB0cnVlLCBhbGw6IHRydWUgfSB9LFxuICAgIHsga2V5czogJ3phJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2ZvbGQnLCBhY3Rpb25BcmdzOiB7IHRvZ2dsZTogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnekEnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZm9sZCcsIGFjdGlvbkFyZ3M6IHsgdG9nZ2xlOiB0cnVlLCBhbGw6IHRydWUgfSB9LFxuICAgIHsga2V5czogJ3pmJywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2ZvbGQnLCBhY3Rpb25BcmdzOiB7IG9wZW46IHRydWUsIGFsbDogdHJ1ZSB9IH0sXG4gICAgeyBrZXlzOiAnemQnLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnZm9sZCcsIGFjdGlvbkFyZ3M6IHsgb3BlbjogdHJ1ZSwgYWxsOiB0cnVlIH0gfSxcblxuICAgIHsga2V5czogJzxDLUEtaz4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnYWNlQ29tbWFuZCcsIGFjdGlvbkFyZ3M6IHsgbmFtZTogXCJhZGRDdXJzb3JBYm92ZVwiIH0gfSxcbiAgICB7IGtleXM6ICc8Qy1BLWo+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2FjZUNvbW1hbmQnLCBhY3Rpb25BcmdzOiB7IG5hbWU6IFwiYWRkQ3Vyc29yQmVsb3dcIiB9IH0sXG4gICAgeyBrZXlzOiAnPEMtQS1TLWs+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2FjZUNvbW1hbmQnLCBhY3Rpb25BcmdzOiB7IG5hbWU6IFwiYWRkQ3Vyc29yQWJvdmVTa2lwQ3VycmVudFwiIH0gfSxcbiAgICB7IGtleXM6ICc8Qy1BLVMtaj4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnYWNlQ29tbWFuZCcsIGFjdGlvbkFyZ3M6IHsgbmFtZTogXCJhZGRDdXJzb3JCZWxvd1NraXBDdXJyZW50XCIgfSB9LFxuICAgIHsga2V5czogJzxDLUEtaD4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnYWNlQ29tbWFuZCcsIGFjdGlvbkFyZ3M6IHsgbmFtZTogXCJzZWxlY3RNb3JlQmVmb3JlXCIgfSB9LFxuICAgIHsga2V5czogJzxDLUEtbD4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnYWNlQ29tbWFuZCcsIGFjdGlvbkFyZ3M6IHsgbmFtZTogXCJzZWxlY3RNb3JlQWZ0ZXJcIiB9IH0sXG4gICAgeyBrZXlzOiAnPEMtQS1TLWg+JywgdHlwZTogJ2FjdGlvbicsIGFjdGlvbjogJ2FjZUNvbW1hbmQnLCBhY3Rpb25BcmdzOiB7IG5hbWU6IFwic2VsZWN0TmV4dEJlZm9yZVwiIH0gfSxcbiAgICB7IGtleXM6ICc8Qy1BLVMtbD4nLCB0eXBlOiAnYWN0aW9uJywgYWN0aW9uOiAnYWNlQ29tbWFuZCcsIGFjdGlvbkFyZ3M6IHsgbmFtZTogXCJzZWxlY3ROZXh0QWZ0ZXJcIiB9IH1cbiAgKTtcbiAgXG4gIGRlZmF1bHRLZXltYXAucHVzaCh7XG4gICAga2V5czogJ2dxJyxcbiAgICB0eXBlOiAnb3BlcmF0b3InLFxuICAgIG9wZXJhdG9yOiAnaGFyZFdyYXAnXG4gIH0pO1xuICB2aW1BcGkuZGVmaW5lT3BlcmF0b3IoXCJoYXJkV3JhcFwiLCBmdW5jdGlvbihjbSwgb3BlcmF0b3JBcmdzLCByYW5nZXMsIG9sZEFuY2hvciwgbmV3SGVhZCkge1xuICAgIHZhciBhbmNob3IgPSByYW5nZXNbMF0uYW5jaG9yLmxpbmU7XG4gICAgdmFyIGhlYWQgPSByYW5nZXNbMF0uaGVhZC5saW5lO1xuICAgIGlmIChvcGVyYXRvckFyZ3MubGluZXdpc2UpIGhlYWQtLTtcbiAgICBoYXJkV3JhcChjbS5hY2UsIHtzdGFydFJvdzogYW5jaG9yLCBlbmRSb3c6IGhlYWR9KTtcbiAgICByZXR1cm4gUG9zKGhlYWQsIDApO1xuICB9KTtcbiAgZGVmaW5lT3B0aW9uKCd0ZXh0d2lkdGgnLCB1bmRlZmluZWQsICdudW1iZXInLCBbJ3R3J10sIGZ1bmN0aW9uKHdpZHRoLCBjbSkge1xuICAgIC8vIE9wdGlvbiBpcyBsb2NhbC4gRG8gbm90aGluZyBmb3IgZ2xvYmFsLlxuICAgIGlmIChjbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIFRoZSAnZmlsZXR5cGUnIG9wdGlvbiBwcm94aWVzIHRvIHRoZSBDb2RlTWlycm9yICdtb2RlJyBvcHRpb24uXG4gICAgaWYgKHdpZHRoID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHZhciB2YWx1ZSA9IGNtLmFjZS5nZXRPcHRpb24oJ3ByaW50TWFyZ2luQ29sdW1uJyk7XG4gICAgICByZXR1cm4gdmFsdWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBjb2x1bW4gPSBNYXRoLnJvdW5kKHdpZHRoKTtcbiAgICAgIGlmIChjb2x1bW4gPiAxKSB7XG4gICAgICAgIGNtLmFjZS5zZXRPcHRpb24oJ3ByaW50TWFyZ2luQ29sdW1uJywgY29sdW1uKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICAgIFxuICBhY3Rpb25zLmFjZUNvbW1hbmQgPSBmdW5jdGlvbihjbSwgYWN0aW9uQXJncywgdmltKSB7XG4gICAgY20udmltQ21kID0gYWN0aW9uQXJncztcbiAgICBpZiAoY20uYWNlLmluVmlydHVhbFNlbGVjdGlvbk1vZGUpXG4gICAgICBjbS5hY2Uub24oXCJiZWZvcmVFbmRPcGVyYXRpb25cIiwgZGVsYXllZEV4ZWNBY2VDb21tYW5kKTtcbiAgICBlbHNlXG4gICAgICBkZWxheWVkRXhlY0FjZUNvbW1hbmQobnVsbCwgY20uYWNlKTtcbiAgfTtcbiAgZnVuY3Rpb24gZGVsYXllZEV4ZWNBY2VDb21tYW5kKG9wLCBhY2UpIHtcbiAgICBhY2Uub2ZmKFwiYmVmb3JlRW5kT3BlcmF0aW9uXCIsIGRlbGF5ZWRFeGVjQWNlQ29tbWFuZCk7XG4gICAgdmFyIGNtZCA9IGFjZS5zdGF0ZS5jbS52aW1DbWQ7XG4gICAgaWYgKGNtZCkge1xuICAgICAgYWNlLmV4ZWNDb21tYW5kKGNtZC5leGVjID8gY21kIDogY21kLm5hbWUsIGNtZC5hcmdzKTtcbiAgICB9XG4gICAgYWNlLmN1ck9wID0gYWNlLnByZXZPcDtcbiAgfVxuICBhY3Rpb25zLmZvbGQgPSBmdW5jdGlvbihjbSwgYWN0aW9uQXJncywgdmltKSB7XG4gICAgY20uYWNlLmV4ZWNDb21tYW5kKFsndG9nZ2xlRm9sZFdpZGdldCcsICd0b2dnbGVGb2xkV2lkZ2V0JywgJ2ZvbGRPdGhlcicsICd1bmZvbGRhbGwnXG4gICAgICBdWyhhY3Rpb25BcmdzLmFsbCA/IDIgOiAwKSArIChhY3Rpb25BcmdzLm9wZW4gPyAxIDogMCldKTtcbiAgfTtcblxuICBleHBvcnRzLmhhbmRsZXIuZGVmYXVsdEtleW1hcCA9IGRlZmF1bHRLZXltYXA7XG4gIGV4cG9ydHMuaGFuZGxlci5hY3Rpb25zID0gYWN0aW9ucztcbiAgZXhwb3J0cy5WaW0gPSB2aW1BcGk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=