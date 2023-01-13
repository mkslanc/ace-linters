"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[218],{

/***/ 7869:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(9359);
var EventEmitter = (__webpack_require__(3056)/* .EventEmitter */ .v);

/**
 *
 * Defines a floating pointer in the document. Whenever text is inserted or deleted before the cursor, the position of the anchor is updated.
 *
 * @class Anchor
 **/

/**
 * Creates a new `Anchor` and associates it with a document.
 *
 * @param {Document} doc The document to associate with the anchor
 * @param {Number} row The starting row position
 * @param {Number} column The starting column position
 *
 * @constructor
 **/

var Anchor = exports.e = function(doc, row, column) {
    this.$onChange = this.onChange.bind(this);
    this.attach(doc);
    
    if (typeof column == "undefined")
        this.setPosition(row.row, row.column);
    else
        this.setPosition(row, column);
};

(function() {

    oop.implement(this, EventEmitter);

    /**
     * Returns an object identifying the `row` and `column` position of the current anchor.
     * @returns {Ace.Point}
     **/
    this.getPosition = function() {
        return this.$clipPositionToDocument(this.row, this.column);
    };

    /**
     *
     * Returns the current document.
     * @returns {Document}
     **/
    this.getDocument = function() {
        return this.document;
    };

    /**
     * experimental: allows anchor to stick to the next on the left
     */
    this.$insertRight = false;
    /**
     * Fires whenever the anchor position changes.
     *
     * Both of these objects have a `row` and `column` property corresponding to the position.
     *
     * Events that can trigger this function include [[Anchor.setPosition `setPosition()`]].
     *
     * @event change
     * @param {Object} e  An object containing information about the anchor position. It has two properties:
     *  - `old`: An object describing the old Anchor position
     *  - `value`: An object describing the new Anchor position
     *
     **/
    /**
     * Internal function called when `"change"` event fired.
     * @param {Ace.Delta} delta
     */
    this.onChange = function(delta) {
        if (delta.start.row == delta.end.row && delta.start.row != this.row)
            return;

        if (delta.start.row > this.row)
            return;
            
        var point = $getTransformedPoint(delta, {row: this.row, column: this.column}, this.$insertRight);
        this.setPosition(point.row, point.column, true);
    };
    
    function $pointsInOrder(point1, point2, equalPointsInOrder) {
        var bColIsAfter = equalPointsInOrder ? point1.column <= point2.column : point1.column < point2.column;
        return (point1.row < point2.row) || (point1.row == point2.row && bColIsAfter);
    }
            
    function $getTransformedPoint(delta, point, moveIfEqual) {
        // Get delta info.
        var deltaIsInsert = delta.action == "insert";
        var deltaRowShift = (deltaIsInsert ? 1 : -1) * (delta.end.row    - delta.start.row);
        var deltaColShift = (deltaIsInsert ? 1 : -1) * (delta.end.column - delta.start.column);
        var deltaStart = delta.start;
        var deltaEnd = deltaIsInsert ? deltaStart : delta.end; // Collapse insert range.
        
        // DELTA AFTER POINT: No change needed.
        if ($pointsInOrder(point, deltaStart, moveIfEqual)) {
            return {
                row: point.row,
                column: point.column
            };
        }
        
        // DELTA BEFORE POINT: Move point by delta shift.
        if ($pointsInOrder(deltaEnd, point, !moveIfEqual)) {
            return {
                row: point.row + deltaRowShift,
                column: point.column + (point.row == deltaEnd.row ? deltaColShift : 0)
            };
        }
        
        // DELTA ENVELOPS POINT (delete only): Move point to delta start.
        // TODO warn if delta.action != "remove" ?
        
        return {
            row: deltaStart.row,
            column: deltaStart.column
        };
    }

    /**
     * Sets the anchor position to the specified row and column. If `noClip` is `true`, the position is not clipped.
     * @param {Number} row The row index to move the anchor to
     * @param {Number} column The column index to move the anchor to
     * @param {Boolean} noClip Identifies if you want the position to be clipped
     *
     **/
    this.setPosition = function(row, column, noClip) {
        var pos;
        if (noClip) {
            pos = {
                row: row,
                column: column
            };
        } else {
            pos = this.$clipPositionToDocument(row, column);
        }

        if (this.row == pos.row && this.column == pos.column)
            return;

        var old = {
            row: this.row,
            column: this.column
        };

        this.row = pos.row;
        this.column = pos.column;
        this._signal("change", {
            old: old,
            value: pos
        });
    };

    /**
     * When called, the `"change"` event listener is removed.
     *
     **/
    this.detach = function() {
        this.document.off("change", this.$onChange);
    };

    /**
     * When called, the `"change"` event listener is appended.
     * @param {Document} doc The document to associate with
     *
     **/
    this.attach = function(doc) {
        this.document = doc || this.document;
        this.document.on("change", this.$onChange);
    };

    /**
     * Clips the anchor position to the specified row and column.
     * @param {Number} row The row index to clip the anchor to
     * @param {Number} column The column index to clip the anchor to
     * @returns {Ace.Point}
     *
     **/
    this.$clipPositionToDocument = function(row, column) {
        var pos = {};

        if (row >= this.document.getLength()) {
            pos.row = Math.max(0, this.document.getLength() - 1);
            pos.column = this.document.getLine(pos.row).length;
        }
        else if (row < 0) {
            pos.row = 0;
            pos.column = 0;
        }
        else {
            pos.row = row;
            pos.column = Math.min(this.document.getLine(pos.row).length, Math.max(0, column));
        }

        if (column < 0)
            pos.column = 0;

        return pos;
    };

}).call(Anchor.prototype);


/***/ }),

/***/ 8934:
/***/ ((__unused_webpack_module, exports) => {



function throwDeltaError(delta, errorText){
    console.log("Invalid Delta:", delta);
    throw "Invalid Delta: " + errorText;
}

function positionInDocument(docLines, position) {
    return position.row    >= 0 && position.row    <  docLines.length &&
           position.column >= 0 && position.column <= docLines[position.row].length;
}

function validateDelta(docLines, delta) {
    // Validate action string.
    if (delta.action != "insert" && delta.action != "remove")
        throwDeltaError(delta, "delta.action must be 'insert' or 'remove'");
    
    // Validate lines type.
    if (!(delta.lines instanceof Array))
        throwDeltaError(delta, "delta.lines must be an Array");

    // Validate range type.
    if (!delta.start || !delta.end)
       throwDeltaError(delta, "delta.start/end must be an present");

    // Validate that the start point is contained in the document.
    var start = delta.start;
    if (!positionInDocument(docLines, delta.start))
        throwDeltaError(delta, "delta.start must be contained in document");
    
    // Validate that the end point is contained in the document (remove deltas only).
    var end = delta.end;
    if (delta.action == "remove" && !positionInDocument(docLines, end))
        throwDeltaError(delta, "delta.end must contained in document for 'remove' actions");
    
    // Validate that the .range size matches the .lines size.
    var numRangeRows = end.row - start.row;
    var numRangeLastLineChars = (end.column - (numRangeRows == 0 ? start.column : 0));
    if (numRangeRows != delta.lines.length - 1 || delta.lines[numRangeRows].length != numRangeLastLineChars)
        throwDeltaError(delta, "delta.range must match delta lines");
}

exports.B = function(docLines, delta, doNotValidate) {
    // disabled validation since it breaks autocompletion popup
    // if (!doNotValidate)
    //    validateDelta(docLines, delta);
    
    var row = delta.start.row;
    var startColumn = delta.start.column;
    var line = docLines[row] || "";
    switch (delta.action) {
        case "insert":
            var lines = delta.lines;
            if (lines.length === 1) {
                docLines[row] = line.substring(0, startColumn) + delta.lines[0] + line.substring(startColumn);
            } else {
                var args = [row, 1].concat(delta.lines);
                docLines.splice.apply(docLines, args);
                docLines[row] = line.substring(0, startColumn) + docLines[row];
                docLines[row + delta.lines.length - 1] += line.substring(startColumn);
            }
            break;
        case "remove":
            var endColumn = delta.end.column;
            var endRow = delta.end.row;
            if (row === endRow) {
                docLines[row] = line.substring(0, startColumn) + line.substring(endColumn);
            } else {
                docLines.splice(
                    row, endRow - row + 1,
                    line.substring(0, startColumn) + docLines[endRow].substring(endColumn)
                );
            }
            break;
    }
};


/***/ }),

/***/ 1218:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(9359);
var applyDelta = (__webpack_require__(8934)/* .applyDelta */ .B);
var EventEmitter = (__webpack_require__(3056)/* .EventEmitter */ .v);
var Range = (__webpack_require__(9082)/* .Range */ .e);
var Anchor = (__webpack_require__(7869)/* .Anchor */ .e);

/**
 * Contains the text of the document. Document can be attached to several [[EditSession `EditSession`]]s. 
 * At its core, `Document`s are just an array of strings, with each row in the document matching up to the array index.
 *
 * @class Document
 **/

/**
 *
 * Creates a new `Document`. If `text` is included, the `Document` contains those strings; otherwise, it's empty.
 * @param {String | String[]} textOrLines text The starting text
 * @constructor
 **/

var Document = function(textOrLines) {
    this.$lines = [""];

    // There has to be one line at least in the document. If you pass an empty
    // string to the insert function, nothing will happen. Workaround.
    if (textOrLines.length === 0) {
        this.$lines = [""];
    } else if (Array.isArray(textOrLines)) {
        this.insertMergedLines({row: 0, column: 0}, textOrLines);
    } else {
        this.insert({row: 0, column:0}, textOrLines);
    }
};

(function() {

    oop.implement(this, EventEmitter);

    /**
     * Replaces all the lines in the current `Document` with the value of `text`.
     *
     * @param {String} text The text to use
     **/
    this.setValue = function(text) {
        var len = this.getLength() - 1;
        this.remove(new Range(0, 0, len, this.getLine(len).length));
        this.insert({row: 0, column: 0}, text || "");
    };

    /**
     * Returns all the lines in the document as a single string, joined by the new line character.
     **/
    this.getValue = function() {
        return this.getAllLines().join(this.getNewLineCharacter());
    };

    /** 
     * Creates a new `Anchor` to define a floating point in the document.
     * @param {Number} row The row number to use
     * @param {Number} column The column number to use
     *
     **/
    this.createAnchor = function(row, column) {
        return new Anchor(this, row, column);
    };

    /** 
     * Splits a string of text on any newline (`\n`) or carriage-return (`\r`) characters.
     *
     * @method $split
     * @param {String} text The text to work with
     * @returns {String} A String array, with each index containing a piece of the original `text` string.
     *
     **/

    // check for IE split bug
    if ("aaa".split(/a/).length === 0) {
        this.$split = function(text) {
            return text.replace(/\r\n|\r/g, "\n").split("\n");
        };
    } else {
        this.$split = function(text) {
            return text.split(/\r\n|\r|\n/);
        };
    }


    this.$detectNewLine = function(text) {
        var match = text.match(/^.*?(\r\n|\r|\n)/m);
        this.$autoNewLine = match ? match[1] : "\n";
        this._signal("changeNewLineMode");
    };

    /**
     * Returns the newline character that's being used, depending on the value of `newLineMode`. 
     * @returns {String} If `newLineMode == windows`, `\r\n` is returned.  
     *  If `newLineMode == unix`, `\n` is returned.  
     *  If `newLineMode == auto`, the value of `autoNewLine` is returned.
     *
     **/
    this.getNewLineCharacter = function() {
        switch (this.$newLineMode) {
          case "windows":
            return "\r\n";
          case "unix":
            return "\n";
          default:
            return this.$autoNewLine || "\n";
        }
    };

    this.$autoNewLine = "";
    this.$newLineMode = "auto";
    /**
     * [Sets the new line mode.]{: #Document.setNewLineMode.desc}
     * @param {String} newLineMode [The newline mode to use; can be either `windows`, `unix`, or `auto`]{: #Document.setNewLineMode.param}
     *
     **/
    this.setNewLineMode = function(newLineMode) {
        if (this.$newLineMode === newLineMode)
            return;

        this.$newLineMode = newLineMode;
        this._signal("changeNewLineMode");
    };

    /**
     * [Returns the type of newlines being used; either `windows`, `unix`, or `auto`]{: #Document.getNewLineMode}
     * @returns {String}
     **/
    this.getNewLineMode = function() {
        return this.$newLineMode;
    };

    /**
     * Returns `true` if `text` is a newline character (either `\r\n`, `\r`, or `\n`).
     * @param {String} text The text to check
     *
     **/
    this.isNewLine = function(text) {
        return (text == "\r\n" || text == "\r" || text == "\n");
    };

    /**
     * Returns a verbatim copy of the given line as it is in the document
     * @param {Number} row The row index to retrieve
     *
     **/
    this.getLine = function(row) {
        return this.$lines[row] || "";
    };

    /**
     * Returns an array of strings of the rows between `firstRow` and `lastRow`. This function is inclusive of `lastRow`.
     * @param {Number} firstRow The first row index to retrieve
     * @param {Number} lastRow The final row index to retrieve
     *
     **/
    this.getLines = function(firstRow, lastRow) {
        return this.$lines.slice(firstRow, lastRow + 1);
    };

    /**
     * Returns all lines in the document as string array.
     **/
    this.getAllLines = function() {
        return this.getLines(0, this.getLength());
    };

    /**
     * Returns the number of rows in the document.
     **/
    this.getLength = function() {
        return this.$lines.length;
    };

    /**
     * Returns all the text within `range` as a single string.
     * @param {Range} range The range to work with.
     * 
     * @returns {String}
     **/
    this.getTextRange = function(range) {
        return this.getLinesForRange(range).join(this.getNewLineCharacter());
    };
    
    /**
     * Returns all the text within `range` as an array of lines.
     * @param {Range} range The range to work with.
     * 
     * @returns {string[]}
     **/
    this.getLinesForRange = function(range) {
        var lines;
        if (range.start.row === range.end.row) {
            // Handle a single-line range.
            lines = [this.getLine(range.start.row).substring(range.start.column, range.end.column)];
        } else {
            // Handle a multi-line range.
            lines = this.getLines(range.start.row, range.end.row);
            lines[0] = (lines[0] || "").substring(range.start.column);
            var l = lines.length - 1;
            if (range.end.row - range.start.row == l)
                lines[l] = lines[l].substring(0, range.end.column);
        }
        return lines;
    };

    // Deprecated methods retained for backwards compatibility.
    this.insertLines = function(row, lines) {
        console.warn("Use of document.insertLines is deprecated. Use the insertFullLines method instead.");
        return this.insertFullLines(row, lines);
    };
    this.removeLines = function(firstRow, lastRow) {
        console.warn("Use of document.removeLines is deprecated. Use the removeFullLines method instead.");
        return this.removeFullLines(firstRow, lastRow);
    };
    this.insertNewLine = function(position) {
        console.warn("Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead.");
        return this.insertMergedLines(position, ["", ""]);
    };

    /**
     * Inserts a block of `text` at the indicated `position`.
     * @param {Object} position The position to start inserting at; it's an object that looks like `{ row: row, column: column}`
     * @param {String} text A chunk of text to insert
     * @returns {Object} The position ({row, column}) of the last line of `text`. If the length of `text` is 0, this function simply returns `position`. 
     *
     **/
    this.insert = function(position, text) {
        // Only detect new lines if the document has no line break yet.
        if (this.getLength() <= 1)
            this.$detectNewLine(text);
        
        return this.insertMergedLines(position, this.$split(text));
    };
    
    /**
     * Inserts `text` into the `position` at the current row. This method also triggers the `"change"` event.
     * 
     * This differs from the `insert` method in two ways:
     *   1. This does NOT handle newline characters (single-line text only).
     *   2. This is faster than the `insert` method for single-line text insertions.
     * 
     * @param {Object} position The position to insert at; it's an object that looks like `{ row: row, column: column}`
     * @param {String} text A chunk of text
     * @returns {Object} Returns an object containing the final row and column, like this:  
     *     ```
     *     {row: endRow, column: 0}
     *     ```
     **/
    this.insertInLine = function(position, text) {
        var start = this.clippedPos(position.row, position.column);
        var end = this.pos(position.row, position.column + text.length);
        
        this.applyDelta({
            start: start,
            end: end,
            action: "insert",
            lines: [text]
        }, true);
        
        return this.clonePos(end);
    };
    
    this.clippedPos = function(row, column) {
        var length = this.getLength();
        if (row === undefined) {
            row = length;
        } else if (row < 0) {
            row = 0;
        } else if (row >= length) {
            row = length - 1;
            column = undefined;
        }
        var line = this.getLine(row);
        if (column == undefined)
            column = line.length;
        column = Math.min(Math.max(column, 0), line.length);
        return {row: row, column: column};
    };
    
    this.clonePos = function(pos) {
        return {row: pos.row, column: pos.column};
    };
    
    this.pos = function(row, column) {
        return {row: row, column: column};
    };
    
    this.$clipPosition = function(position) {
        var length = this.getLength();
        if (position.row >= length) {
            position.row = Math.max(0, length - 1);
            position.column = this.getLine(length - 1).length;
        } else {
            position.row = Math.max(0, position.row);
            position.column = Math.min(Math.max(position.column, 0), this.getLine(position.row).length);
        }
        return position;
    };

    /**
     * Fires whenever the document changes.
     *
     * Several methods trigger different `"change"` events. Below is a list of each action type, followed by each property that's also available:
     *
     *  * `"insert"`
     *    * `range`: the [[Range]] of the change within the document
     *    * `lines`: the lines being added
     *  * `"remove"`
     *    * `range`: the [[Range]] of the change within the document
     *    * `lines`: the lines being removed
     *
     * @event change
     * @param {Object} e Contains at least one property called `"action"`. `"action"` indicates the action that triggered the change. Each action also has a set of additional properties.
     *
     **/
    
    /**
     * Inserts the elements in `lines` into the document as full lines (does not merge with existing line), starting at the row index given by `row`. This method also triggers the `"change"` event.
     * @param {Number} row The index of the row to insert at
     * @param {string[]} lines An array of strings
     * @returns {Object} Contains the final row and column, like this:  
     *   ```
     *   {row: endRow, column: 0}
     *   ```  
     *   If `lines` is empty, this function returns an object containing the current row, and column, like this:  
     *   ``` 
     *   {row: row, column: 0}
     *   ```
     *
     **/
    this.insertFullLines = function(row, lines) {
        // Clip to document.
        // Allow one past the document end.
        row = Math.min(Math.max(row, 0), this.getLength());
        
        // Calculate insertion point.
        var column = 0;
        if (row < this.getLength()) {
            // Insert before the specified row.
            lines = lines.concat([""]);
            column = 0;
        } else {
            // Insert after the last row in the document.
            lines = [""].concat(lines);
            row--;
            column = this.$lines[row].length;
        }
        
        // Insert.
        this.insertMergedLines({row: row, column: column}, lines);
    };

    /**
     * Inserts the elements in `lines` into the document, starting at the position index given by `row`. This method also triggers the `"change"` event.
     * @param {Number} row The index of the row to insert at
     * @param {string[]} lines An array of strings
     * @returns {Object} Contains the final row and column, like this:  
     *   ```
     *   {row: endRow, column: 0}
     *   ```  
     *   If `lines` is empty, this function returns an object containing the current row, and column, like this:  
     *   ``` 
     *   {row: row, column: 0}
     *   ```
     *
     **/    
    this.insertMergedLines = function(position, lines) {
        var start = this.clippedPos(position.row, position.column);
        var end = {
            row: start.row + lines.length - 1,
            column: (lines.length == 1 ? start.column : 0) + lines[lines.length - 1].length
        };
        
        this.applyDelta({
            start: start,
            end: end,
            action: "insert",
            lines: lines
        });
        
        return this.clonePos(end);
    };

    /**
     * Removes the `range` from the document.
     * @param {Range} range A specified Range to remove
     * @returns {Object} Returns the new `start` property of the range, which contains `startRow` and `startColumn`. If `range` is empty, this function returns the unmodified value of `range.start`.
     *
     **/
    this.remove = function(range) {
        var start = this.clippedPos(range.start.row, range.start.column);
        var end = this.clippedPos(range.end.row, range.end.column);
        this.applyDelta({
            start: start,
            end: end,
            action: "remove",
            lines: this.getLinesForRange({start: start, end: end})
        });
        return this.clonePos(start);
    };

    /**
     * Removes the specified columns from the `row`. This method also triggers a `"change"` event.
     * @param {Number} row The row to remove from
     * @param {Number} startColumn The column to start removing at 
     * @param {Number} endColumn The column to stop removing at
     * @returns {Object} Returns an object containing `startRow` and `startColumn`, indicating the new row and column values.<br/>If `startColumn` is equal to `endColumn`, this function returns nothing.
     *
     **/
    this.removeInLine = function(row, startColumn, endColumn) {
        var start = this.clippedPos(row, startColumn);
        var end = this.clippedPos(row, endColumn);
        
        this.applyDelta({
            start: start,
            end: end,
            action: "remove",
            lines: this.getLinesForRange({start: start, end: end})
        }, true);
        
        return this.clonePos(start);
    };

    /**
     * Removes a range of full lines. This method also triggers the `"change"` event.
     * @param {Number} firstRow The first row to be removed
     * @param {Number} lastRow The last row to be removed
     * @returns {[String]} Returns all the removed lines.
     *
     **/
    this.removeFullLines = function(firstRow, lastRow) {
        // Clip to document.
        firstRow = Math.min(Math.max(0, firstRow), this.getLength() - 1);
        lastRow  = Math.min(Math.max(0, lastRow ), this.getLength() - 1);
        
        // Calculate deletion range.
        // Delete the ending new line unless we're at the end of the document.
        // If we're at the end of the document, delete the starting new line.
        var deleteFirstNewLine = lastRow == this.getLength() - 1 && firstRow > 0;
        var deleteLastNewLine  = lastRow  < this.getLength() - 1;
        var startRow = ( deleteFirstNewLine ? firstRow - 1                  : firstRow                    );
        var startCol = ( deleteFirstNewLine ? this.getLine(startRow).length : 0                           );
        var endRow   = ( deleteLastNewLine  ? lastRow + 1                   : lastRow                     );
        var endCol   = ( deleteLastNewLine  ? 0                             : this.getLine(endRow).length ); 
        var range = new Range(startRow, startCol, endRow, endCol);
        
        // Store delelted lines with bounding newlines ommitted (maintains previous behavior).
        var deletedLines = this.$lines.slice(firstRow, lastRow + 1);
        
        this.applyDelta({
            start: range.start,
            end: range.end,
            action: "remove",
            lines: this.getLinesForRange(range)
        });
        
        // Return the deleted lines.
        return deletedLines;
    };

    /**
     * Removes the new line between `row` and the row immediately following it. This method also triggers the `"change"` event.
     * @param {Number} row The row to check
     *
     **/
    this.removeNewLine = function(row) {
        if (row < this.getLength() - 1 && row >= 0) {
            this.applyDelta({
                start: this.pos(row, this.getLine(row).length),
                end: this.pos(row + 1, 0),
                action: "remove",
                lines: ["", ""]
            });
        }
    };

    /**
     * Replaces a range in the document with the new `text`.
     * @param {Range} range A specified Range to replace
     * @param {String} text The new text to use as a replacement
     * @returns {Object} Returns an object containing the final row and column, like this:
     *     {row: endRow, column: 0}
     * If the text and range are empty, this function returns an object containing the current `range.start` value.
     * If the text is the exact same as what currently exists, this function returns an object containing the current `range.end` value.
     *
     **/
    this.replace = function(range, text) {
        if (!(range instanceof Range))
            range = Range.fromPoints(range.start, range.end);
        if (text.length === 0 && range.isEmpty())
            return range.start;

        // Shortcut: If the text we want to insert is the same as it is already
        // in the document, we don't have to replace anything.
        if (text == this.getTextRange(range))
            return range.end;

        this.remove(range);
        var end;
        if (text) {
            end = this.insert(range.start, text);
        }
        else {
            end = range.start;
        }
        
        return end;
    };

    /**
     * Applies all changes in `deltas` to the document.
     * @param {Delta[]} deltas An array of delta objects (can include "insert" and "remove" actions)
     **/
    this.applyDeltas = function(deltas) {
        for (var i=0; i<deltas.length; i++) {
            this.applyDelta(deltas[i]);
        }
    };
    
    /**
     * Reverts all changes in `deltas` from the document.
     * @param {Delta[]} deltas An array of delta objects (can include "insert" and "remove" actions)
     **/
    this.revertDeltas = function(deltas) {
        for (var i=deltas.length-1; i>=0; i--) {
            this.revertDelta(deltas[i]);
        }
    };
    
    /**
     * Applies `delta` to the document.
     * @param {Object} delta A delta object (can include "insert" and "remove" actions)
     **/
    this.applyDelta = function(delta, doNotValidate) {
        var isInsert = delta.action == "insert";
        // An empty range is a NOOP.
        if (isInsert ? delta.lines.length <= 1 && !delta.lines[0]
            : !Range.comparePoints(delta.start, delta.end)) {
            return;
        }
        
        if (isInsert && delta.lines.length > 20000) {
            this.$splitAndapplyLargeDelta(delta, 20000);
        }
        else {
            applyDelta(this.$lines, delta, doNotValidate);
            this._signal("change", delta);
        }
    };
    
    this.$safeApplyDelta = function(delta) {
        var docLength = this.$lines.length;
        // verify that delta is in the document to prevent applyDelta from corrupting lines array 
        if (
            delta.action == "remove" && delta.start.row < docLength && delta.end.row < docLength
            || delta.action == "insert" && delta.start.row <= docLength
        ) {
            this.applyDelta(delta);
        }
    };
    
    this.$splitAndapplyLargeDelta = function(delta, MAX) {
        // Split large insert deltas. This is necessary because:
        //    1. We need to support splicing delta lines into the document via $lines.splice.apply(...)
        //    2. fn.apply() doesn't work for a large number of params. The smallest threshold is on chrome 40 ~42000.
        // we use 20000 to leave some space for actual stack
        // 
        // To Do: Ideally we'd be consistent and also split 'delete' deltas. We don't do this now, because delete
        //        delta handling is too slow. If we make delete delta handling faster we can split all large deltas
        //        as shown in https://gist.github.com/aldendaniels/8367109#file-document-snippet-js
        //        If we do this, update validateDelta() to limit the number of lines in a delete delta.
        var lines = delta.lines;
        var l = lines.length - MAX + 1;
        var row = delta.start.row; 
        var column = delta.start.column;
        for (var from = 0, to = 0; from < l; from = to) {
            to += MAX - 1;
            var chunk = lines.slice(from, to);
            chunk.push("");
            this.applyDelta({
                start: this.pos(row + from, column),
                end: this.pos(row + to, column = 0),
                action: delta.action,
                lines: chunk
            }, true);
        }
        // Update remaining delta.
        delta.lines = lines.slice(from);
        delta.start.row = row + from;
        delta.start.column = column;
        this.applyDelta(delta, true);
    };
    
    /**
     * Reverts `delta` from the document.
     * @param {Object} delta A delta object (can include "insert" and "remove" actions)
     **/
    this.revertDelta = function(delta) {
        this.$safeApplyDelta({
            start: this.clonePos(delta.start),
            end: this.clonePos(delta.end),
            action: (delta.action == "insert" ? "remove" : "insert"),
            lines: delta.lines.slice()
        });
    };
    
    /**
     * Converts an index position in a document to a `{row, column}` object.
     *
     * Index refers to the "absolute position" of a character in the document. For example:
     *
     * ```javascript
     * var x = 0; // 10 characters, plus one for newline
     * var y = -1;
     * ```
     * 
     * Here, `y` is an index 15: 11 characters for the first row, and 5 characters until `y` in the second.
     *
     * @param {Number} index An index to convert
     * @param {Number} startRow=0 The row from which to start the conversion
     * @returns {Object} A `{row, column}` object of the `index` position
     */
    this.indexToPosition = function(index, startRow) {
        var lines = this.$lines || this.getAllLines();
        var newlineLength = this.getNewLineCharacter().length;
        for (var i = startRow || 0, l = lines.length; i < l; i++) {
            index -= lines[i].length + newlineLength;
            if (index < 0)
                return {row: i, column: index + lines[i].length + newlineLength};
        }
        return {row: l-1, column: index + lines[l-1].length + newlineLength};
    };

    /**
     * Converts the `{row, column}` position in a document to the character's index.
     *
     * Index refers to the "absolute position" of a character in the document. For example:
     *
     * ```javascript
     * var x = 0; // 10 characters, plus one for newline
     * var y = -1;
     * ```
     * 
     * Here, `y` is an index 15: 11 characters for the first row, and 5 characters until `y` in the second.
     *
     * @param {Object} pos The `{row, column}` to convert
     * @param {Number} startRow=0 The row from which to start the conversion
     * @returns {Number} The index position in the document
     */
    this.positionToIndex = function(pos, startRow) {
        var lines = this.$lines || this.getAllLines();
        var newlineLength = this.getNewLineCharacter().length;
        var index = 0;
        var row = Math.min(pos.row, lines.length);
        for (var i = startRow || 0; i < row; ++i)
            index += lines[i].length + newlineLength;

        return index + pos.column;
    };

}).call(Document.prototype);

exports.B = Document;


/***/ }),

/***/ 3056:
/***/ ((__unused_webpack_module, exports) => {



var EventEmitter = {};
var stopPropagation = function() { this.propagationStopped = true; };
var preventDefault = function() { this.defaultPrevented = true; };

EventEmitter._emit =
EventEmitter._dispatchEvent = function(eventName, e) {
    this._eventRegistry || (this._eventRegistry = {});
    this._defaultHandlers || (this._defaultHandlers = {});

    var listeners = this._eventRegistry[eventName] || [];
    var defaultHandler = this._defaultHandlers[eventName];
    if (!listeners.length && !defaultHandler)
        return;

    if (typeof e != "object" || !e)
        e = {};

    if (!e.type)
        e.type = eventName;
    if (!e.stopPropagation)
        e.stopPropagation = stopPropagation;
    if (!e.preventDefault)
        e.preventDefault = preventDefault;

    listeners = listeners.slice();
    for (var i=0; i<listeners.length; i++) {
        listeners[i](e, this);
        if (e.propagationStopped)
            break;
    }
    
    if (defaultHandler && !e.defaultPrevented)
        return defaultHandler(e, this);
};


EventEmitter._signal = function(eventName, e) {
    var listeners = (this._eventRegistry || {})[eventName];
    if (!listeners)
        return;
    listeners = listeners.slice();
    for (var i=0; i<listeners.length; i++)
        listeners[i](e, this);
};

EventEmitter.once = function(eventName, callback) {
    var _self = this;
    this.on(eventName, function newCallback() {
        _self.off(eventName, newCallback);
        callback.apply(null, arguments);
    });
    if (!callback) {
        /*global Promise*/
        return new Promise(function(resolve) {
            callback = resolve;
        });
    }
};


EventEmitter.setDefaultHandler = function(eventName, callback) {
    var handlers = this._defaultHandlers;
    if (!handlers)
        handlers = this._defaultHandlers = {_disabled_: {}};
    
    if (handlers[eventName]) {
        var old = handlers[eventName];
        var disabled = handlers._disabled_[eventName];
        if (!disabled)
            handlers._disabled_[eventName] = disabled = [];
        disabled.push(old);
        var i = disabled.indexOf(callback);
        if (i != -1) 
            disabled.splice(i, 1);
    }
    handlers[eventName] = callback;
};
EventEmitter.removeDefaultHandler = function(eventName, callback) {
    var handlers = this._defaultHandlers;
    if (!handlers)
        return;
    var disabled = handlers._disabled_[eventName];
    
    if (handlers[eventName] == callback) {
        if (disabled)
            this.setDefaultHandler(eventName, disabled.pop());
    } else if (disabled) {
        var i = disabled.indexOf(callback);
        if (i != -1)
            disabled.splice(i, 1);
    }
};

EventEmitter.on =
EventEmitter.addEventListener = function(eventName, callback, capturing) {
    this._eventRegistry = this._eventRegistry || {};

    var listeners = this._eventRegistry[eventName];
    if (!listeners)
        listeners = this._eventRegistry[eventName] = [];

    if (listeners.indexOf(callback) == -1)
        listeners[capturing ? "unshift" : "push"](callback);
    return callback;
};

EventEmitter.off =
EventEmitter.removeListener =
EventEmitter.removeEventListener = function(eventName, callback) {
    this._eventRegistry = this._eventRegistry || {};

    var listeners = this._eventRegistry[eventName];
    if (!listeners)
        return;

    var index = listeners.indexOf(callback);
    if (index !== -1)
        listeners.splice(index, 1);
};

EventEmitter.removeAllListeners = function(eventName) {
    if (!eventName) this._eventRegistry = this._defaultHandlers = undefined;
    if (this._eventRegistry) this._eventRegistry[eventName] = undefined;
    if (this._defaultHandlers) this._defaultHandlers[eventName] = undefined;
};

exports.v = EventEmitter;


/***/ }),

/***/ 9359:
/***/ ((__unused_webpack_module, exports) => {



exports.inherits = function(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
        constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
};

exports.mixin = function(obj, mixin) {
    for (var key in mixin) {
        obj[key] = mixin[key];
    }
    return obj;
};

exports.implement = function(proto, mixin) {
    exports.mixin(proto, mixin);
};


/***/ }),

/***/ 9082:
/***/ ((__unused_webpack_module, exports) => {


var comparePoints = function(p1, p2) {
    return p1.row - p2.row || p1.column - p2.column;
};
/**
 * This object is used in various places to indicate a region within the editor. To better visualize how this works, imagine a rectangle. Each quadrant of the rectangle is analogous to a range, as ranges contain a starting row and starting column, and an ending row, and ending column.
 * @class Range
 **/

/**
 * Creates a new `Range` object with the given starting and ending rows and columns.
 * @param {Number} startRow The starting row
 * @param {Number} startColumn The starting column
 * @param {Number} endRow The ending row
 * @param {Number} endColumn The ending column
 * @constructor
 **/
var Range = function(startRow, startColumn, endRow, endColumn) {
    this.start = {
        row: startRow,
        column: startColumn
    };

    this.end = {
        row: endRow,
        column: endColumn
    };
};

(function() {
    /**
     * Returns `true` if and only if the starting row and column, and ending row and column, are equivalent to those given by `range`.
     * @param {Range} range A range to check against
     * @return {Boolean}
     **/
    this.isEqual = function(range) {
        return this.start.row === range.start.row &&
            this.end.row === range.end.row &&
            this.start.column === range.start.column &&
            this.end.column === range.end.column;
    };

    /**
     * Returns a string containing the range's row and column information, given like this:
     * ```
     *    [start.row/start.column] -> [end.row/end.column]
     * ```
     * @return {String}
     **/
    this.toString = function() {
        return ("Range: [" + this.start.row + "/" + this.start.column +
            "] -> [" + this.end.row + "/" + this.end.column + "]");
    };

    /**
     * Returns `true` if the `row` and `column` provided are within the given range. This can better be expressed as returning `true` if:
     * ```javascript
     *    this.start.row <= row <= this.end.row &&
     *    this.start.column <= column <= this.end.column
     * ```
     * @param {Number} row A row to check for
     * @param {Number} column A column to check for
     * @returns {Boolean}
     * @related [[Range.compare]]
     **/

    this.contains = function(row, column) {
        return this.compare(row, column) == 0;
    };

    /**
     * Compares `this` range (A) with another range (B).
     * @param {Range} range A range to compare with
     * @related [[Range.compare]]
     * @returns {Number} This method returns one of the following numbers:
     * * `-2`: (B) is in front of (A), and doesn't intersect with (A)
     * * `-1`: (B) begins before (A) but ends inside of (A)
     * * `0`: (B) is completely inside of (A) OR (A) is completely inside of (B)
     * * `+1`: (B) begins inside of (A) but ends outside of (A)
     * * `+2`: (B) is after (A) and doesn't intersect with (A)
     * * `42`: FTW state: (B) ends in (A) but starts outside of (A)
     **/
    this.compareRange = function(range) {
        var cmp,
            end = range.end,
            start = range.start;

        cmp = this.compare(end.row, end.column);
        if (cmp == 1) {
            cmp = this.compare(start.row, start.column);
            if (cmp == 1) {
                return 2;
            } else if (cmp == 0) {
                return 1;
            } else {
                return 0;
            }
        } else if (cmp == -1) {
            return -2;
        } else {
            cmp = this.compare(start.row, start.column);
            if (cmp == -1) {
                return -1;
            } else if (cmp == 1) {
                return 42;
            } else {
                return 0;
            }
        }
    };

    /**
     * Compares the row and column of `p` with the starting and ending [[Point]]'s of the calling range (by calling [[Range.compare]]).
     * @param {Ace.Point} p A point to compare with
     * @related [[Range.compare]]
     * @returns {Number}
     **/
    this.comparePoint = function(p) {
        return this.compare(p.row, p.column);
    };

    /**
     * Checks the start and end [[Point]]'s of `range` and compares them to the calling range. Returns `true` if the `range` is contained within the caller's range.
     * @param {Range} range A range to compare with
     * @returns {Boolean}
     * @related [[Range.comparePoint]]
     **/
    this.containsRange = function(range) {
        return this.comparePoint(range.start) == 0 && this.comparePoint(range.end) == 0;
    };

    /**
     * Returns `true` if passed in `range` intersects with the one calling this method.
     * @param {Range} range A range to compare with
     * @returns {Boolean}
     **/
    this.intersects = function(range) {
        var cmp = this.compareRange(range);
        return (cmp == -1 || cmp == 0 || cmp == 1);
    };

    /**
     * Returns `true` if the caller's ending row is the same as `row`, and if the caller's ending column is the same as `column`.
     * @param {Number} row A row to compare with
     * @param {Number} column A column to compare with
     * @returns {Boolean}
     **/
    this.isEnd = function(row, column) {
        return this.end.row == row && this.end.column == column;
    };

    /**
     * Returns `true` if the caller's starting row is the same as `row`, and if the caller's starting column is the same as `column`.
     * @param {Number} row A row to compare with
     * @param {Number} column A column to compare with
     * @returns {Boolean}
     **/
    this.isStart = function(row, column) {
        return this.start.row == row && this.start.column == column;
    };

    /**
     * Sets the starting row and column for the range.
     * @param {Number|Ace.Point} row A row to set
     * @param {Number} column A column to set
     *
     **/
    this.setStart = function(row, column) {
        if (typeof row == "object") {
            this.start.column = row.column;
            this.start.row = row.row;
        } else {
            this.start.row = row;
            this.start.column = column;
        }
    };

    /**
     * Sets the starting row and column for the range.
     * @param {Number|Ace.Point} row A row to set
     * @param {Number} column A column to set
     *
     **/
    this.setEnd = function(row, column) {
        if (typeof row == "object") {
            this.end.column = row.column;
            this.end.row = row.row;
        } else {
            this.end.row = row;
            this.end.column = column;
        }
    };

    /**
     * Returns `true` if the `row` and `column` are within the given range.
     * @param {Number} row A row to compare with
     * @param {Number} column A column to compare with
     * @returns {Boolean}
     * @related [[Range.compare]]
     **/
    this.inside = function(row, column) {
        if (this.compare(row, column) == 0) {
            if (this.isEnd(row, column) || this.isStart(row, column)) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    };

    /**
     * Returns `true` if the `row` and `column` are within the given range's starting [[Point]].
     * @param {Number} row A row to compare with
     * @param {Number} column A column to compare with
     * @returns {Boolean}
     * @related [[Range.compare]]
     **/
    this.insideStart = function(row, column) {
        if (this.compare(row, column) == 0) {
            if (this.isEnd(row, column)) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    };

    /**
     * Returns `true` if the `row` and `column` are within the given range's ending [[Point]].
     * @param {Number} row A row to compare with
     * @param {Number} column A column to compare with
     * @returns {Boolean}
     * @related [[Range.compare]]
     *
     **/
    this.insideEnd = function(row, column) {
        if (this.compare(row, column) == 0) {
            if (this.isStart(row, column)) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    };

    /**
     * Compares the `row` and `column` with the starting and ending [[Point]]'s of the calling range.
     * @param {Number} row A row to compare with
     * @param {Number} column A column to compare with
     * @returns {Number} This method returns one of the following numbers:
     * * `1` if `row` is greater than the calling range
     * * `-1` if `row` is less then the calling range
     * * `0` otherwise
     *
     * If the starting row of the calling range is equal to `row`, and:
     * * `column` is greater than or equal to the calling range's starting column, this returns `0`
     * * Otherwise, it returns -1
     *
     * If the ending row of the calling range is equal to `row`, and:
     * * `column` is less than or equal to the calling range's ending column, this returns `0`
     * * Otherwise, it returns 1
     **/
    this.compare = function(row, column) {
        if (!this.isMultiLine()) {
            if (row === this.start.row) {
                return column < this.start.column ? -1 : (column > this.end.column ? 1 : 0);
            }
        }

        if (row < this.start.row)
            return -1;

        if (row > this.end.row)
            return 1;

        if (this.start.row === row)
            return column >= this.start.column ? 0 : -1;

        if (this.end.row === row)
            return column <= this.end.column ? 0 : 1;

        return 0;
    };

    /**
     * Compares the `row` and `column` with the starting and ending [[Point]]'s of the calling range.
     * @param {Number} row A row to compare with
     * @param {Number} column A column to compare with
     * @returns {Number} This method returns one of the following numbers:
     * * `-1` if calling range's starting column and calling range's starting row are equal `row` and `column`
     * * Otherwise, it returns the value after calling [[Range.compare `compare()`]].
     **/
    this.compareStart = function(row, column) {
        if (this.start.row == row && this.start.column == column) {
            return -1;
        } else {
            return this.compare(row, column);
        }
    };

    /**
     * Compares the `row` and `column` with the starting and ending [[Point]]'s of the calling range.
     * @param {Number} row A row to compare with
     * @param {Number} column A column to compare with
     * @returns {Number} This method returns one of the following numbers:
     * * `1` if calling range's ending column and calling range's ending row are equal `row` and `column`.
     * * Otherwise, it returns the value after calling [[Range.compare `compare()`]].
     */
    this.compareEnd = function(row, column) {
        if (this.end.row == row && this.end.column == column) {
            return 1;
        } else {
            return this.compare(row, column);
        }
    };

    /**
     * Compares the `row` and `column` with the start and end [[Point]]'s of the calling range.
     * @param {Number} row A row to compare with
     * @param {Number} column A column to compare with
     * @returns {Number} This method returns one of the following numbers:
     * * `1` if the ending row of the calling range is equal to `row`, and the ending column of the calling range is equal to `column`
     * * `-1` if the starting row of the calling range is equal to `row`, and the starting column of the calling range is equal to `column`
     * * Otherwise, it returns the value after calling [[Range.compare `compare()`]].
     **/
    this.compareInside = function(row, column) {
        if (this.end.row == row && this.end.column == column) {
            return 1;
        } else if (this.start.row == row && this.start.column == column) {
            return -1;
        } else {
            return this.compare(row, column);
        }
    };

    /**
     * Returns the part of the current `Range` that occurs within the boundaries of `firstRow` and `lastRow` as a new `Range` object.
     * @param {Number} firstRow The starting row
     * @param {Number} lastRow The ending row
     * @returns {Range}
    **/
    this.clipRows = function(firstRow, lastRow) {
        if (this.end.row > lastRow)
            var end = {row: lastRow + 1, column: 0};
        else if (this.end.row < firstRow)
            var end = {row: firstRow, column: 0};

        if (this.start.row > lastRow)
            var start = {row: lastRow + 1, column: 0};
        else if (this.start.row < firstRow)
            var start = {row: firstRow, column: 0};

        return Range.fromPoints(start || this.start, end || this.end);
    };

    /**
     * Changes the `row` and `column` for the calling range for both the starting and ending [[Point]]'s.
     * @param {Number} row A new row to extend to
     * @param {Number} column A new column to extend to
     * @returns {Range} The original range with the new row
    **/
    this.extend = function(row, column) {
        var cmp = this.compare(row, column);

        if (cmp == 0)
            return this;
        else if (cmp == -1)
            var start = {row: row, column: column};
        else
            var end = {row: row, column: column};

        return Range.fromPoints(start || this.start, end || this.end);
    };

    /**
     * Returns `true` if the calling range is empty (starting [[Point]] == ending [[Point]]).
     * @returns {Boolean}
     **/
    this.isEmpty = function() {
        return (this.start.row === this.end.row && this.start.column === this.end.column);
    };

    /**
     * Returns `true` if the range spans across multiple lines.
     * @returns {Boolean}
    **/
    this.isMultiLine = function() {
        return (this.start.row !== this.end.row);
    };

    /**
     * Returns a duplicate of the calling range.
     * @returns {Range}
    **/
    this.clone = function() {
        return Range.fromPoints(this.start, this.end);
    };

    /**
     * Returns a range containing the starting and ending rows of the original range, but with a column value of `0`.
     * @returns {Range}
    **/
    this.collapseRows = function() {
        if (this.end.column == 0)
            return new Range(this.start.row, 0, Math.max(this.start.row, this.end.row-1), 0);
        else
            return new Range(this.start.row, 0, this.end.row, 0);
    };

    /**
     * Given the current `Range`, this function converts those starting and ending [[Point]]'s into screen positions, and then returns a new `Range` object.
     * @param {EditSession} session The `EditSession` to retrieve coordinates from
     * @returns {Range}
    **/
    this.toScreenRange = function(session) {
        var screenPosStart = session.documentToScreenPosition(this.start);
        var screenPosEnd = session.documentToScreenPosition(this.end);

        return new Range(
            screenPosStart.row, screenPosStart.column,
            screenPosEnd.row, screenPosEnd.column
        );
    };

    /**
     * Shift the calling range by `row` and `column` values.
     * @param {Number} row
     * @param {Number} column
     * @experimental
     */
    this.moveBy = function(row, column) {
        this.start.row += row;
        this.start.column += column;
        this.end.row += row;
        this.end.column += column;
    };

}).call(Range.prototype);

/**
 * Creates and returns a new `Range` based on the `start` [[Point]] and `end` [[Point]] of the given parameters.
 * @param {Point} start A starting point to use
 * @param {Point} end An ending point to use
 * @returns {Range}
**/
Range.fromPoints = function(start, end) {
    return new Range(start.row, start.column, end.row, end.column);
};
Range.comparePoints = comparePoints;

/**
 * Compares `p1` and `p2` [[Point]]'s, useful for sorting
 * @param {Ace.Point} p1
 * @param {Ace.Point} p2
 * @returns {Number}
 */
Range.comparePoints = function(p1, p2) {
    return p1.row - p2.row || p1.column - p2.column;
};


exports.e = Range;


/***/ })

}]);
//# sourceMappingURL=bundle.218.js.map