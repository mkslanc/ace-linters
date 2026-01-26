"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[958],{

/***/ 10958:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * ## Elastic Tabstops Lite extension.
 *
 * Automatically adjusts tab spacing to align content in tabular format by calculating optimal column widths
 * and maintaining consistent vertical alignment across multiple lines. Tracks content changes and dynamically
 * reprocesses affected rows to ensure proper formatting without manual intervention.
 *
 * **Enable:** `editor.setOption("useElasticTabstops", true)`
 *  or configure it during editor initialization in the options object.
 * @module
 */


class ElasticTabstopsLite {
    /**
     * @param {Editor} editor
     */
    constructor(editor) {
        this.$editor = editor;
        var self = this;
        var changedRows = [];
        var recordChanges = false;
        this.onAfterExec = function() {
            recordChanges = false;
            self.processRows(changedRows);
            changedRows = [];
        };
        this.onExec = function() {
            recordChanges = true;
        };
        this.onChange = function(delta) {
            if (recordChanges) {
                if (changedRows.indexOf(delta.start.row) == -1)
                    changedRows.push(delta.start.row);
                if (delta.end.row != delta.start.row)
                    changedRows.push(delta.end.row);
            }
        };
    }

    /**
     * @param {number[]} rows
     */
    processRows(rows) {
        this.$inChange = true;
        var checkedRows = [];

        for (var r = 0, rowCount = rows.length; r < rowCount; r++) {
            var row = rows[r];

            if (checkedRows.indexOf(row) > -1)
                continue;

            var cellWidthObj = this.$findCellWidthsForBlock(row);
            var cellWidths = this.$setBlockCellWidthsToMax(cellWidthObj.cellWidths);
            var rowIndex = cellWidthObj.firstRow;

            for (var w = 0, l = cellWidths.length; w < l; w++) {
                var widths = cellWidths[w];
                checkedRows.push(rowIndex);
                this.$adjustRow(rowIndex, widths);
                rowIndex++;
            }
        }
        this.$inChange = false;
    }

    /**
     * @param {number} row
     */
    $findCellWidthsForBlock(row) {
        var cellWidths = [], widths;

        // starting row and backward
        var rowIter = row;
        while (rowIter >= 0) {
            widths = this.$cellWidthsForRow(rowIter);
            if (widths.length == 0)
                break;

            cellWidths.unshift(widths);
            rowIter--;
        }
        var firstRow = rowIter + 1;

        // forward (not including starting row)
        rowIter = row;
        var numRows = this.$editor.session.getLength();

        while (rowIter < numRows - 1) {
            rowIter++;

            widths = this.$cellWidthsForRow(rowIter);
            if (widths.length == 0)
                break;

            cellWidths.push(widths);
        }

        return { cellWidths: cellWidths, firstRow: firstRow };
    }

    /**
     * @param {number} row
     * @returns {number[]}
     */
    $cellWidthsForRow(row) {
        var selectionColumns = this.$selectionColumnsForRow(row);
        // todo: support multicursor

        var tabs = [-1].concat(this.$tabsForRow(row));
        var widths = tabs.map(function(el) { return 0; } ).slice(1);
        var line = this.$editor.session.getLine(row);

        for (var i = 0, len = tabs.length - 1; i < len; i++) {
            var leftEdge = tabs[i]+1;
            var rightEdge = tabs[i+1];

            var rightmostSelection = this.$rightmostSelectionInCell(selectionColumns, rightEdge);
            var cell = line.substring(leftEdge, rightEdge);
            widths[i] = Math.max(cell.replace(/\s+$/g,'').length, rightmostSelection - leftEdge);
        }

        return widths;
    }

    /**
     * @param {number} row
     * @returns {number[]}
     */
    $selectionColumnsForRow(row) {
        var selections = [], cursor = this.$editor.getCursorPosition();
        if (this.$editor.session.getSelection().isEmpty()) {
            // todo: support multicursor
            if (row == cursor.row)
                selections.push(cursor.column);
        }

        return selections;
    }

    /**
     * @param {number[][]} cellWidths
     */
    $setBlockCellWidthsToMax(cellWidths) {
        var startingNewBlock = true, blockStartRow, blockEndRow, maxWidth;
        var columnInfo = this.$izip_longest(cellWidths);

        for (var c = 0, l = columnInfo.length; c < l; c++) {
            var column = columnInfo[c];
            if (!column.push) {
                console.error(column);
                continue;
            }
            // add an extra None to the end so that the end of the column automatically
            // finishes a block
            column.push(NaN);

            for (var r = 0, s = column.length; r < s; r++) {
                var width = column[r];
                if (startingNewBlock) {
                    blockStartRow = r;
                    maxWidth = 0;
                    startingNewBlock = false;
                }
                if (isNaN(width)) {
                    // block ended
                    blockEndRow = r;

                    for (var j = blockStartRow; j < blockEndRow; j++) {
                        cellWidths[j][c] = maxWidth;
                    }
                    startingNewBlock = true;
                }

                maxWidth = Math.max(maxWidth, width);
            }
        }

        return cellWidths;
    }

    /**
     * @param {number[]} selectionColumns
     * @param {number} cellRightEdge
     * @returns {number}
     */
    $rightmostSelectionInCell(selectionColumns, cellRightEdge) {
        var rightmost = 0;

        if (selectionColumns.length) {
            var lengths = [];
            for (var s = 0, length = selectionColumns.length; s < length; s++) {
                if (selectionColumns[s] <= cellRightEdge)
                    lengths.push(s);
                else
                    lengths.push(0);
            }
            rightmost = Math.max.apply(Math, lengths);
        }

        return rightmost;
    }

    /**
     * @param {number} row
     * @returns {number[]}
     */
    $tabsForRow(row) {
        var rowTabs = [], line = this.$editor.session.getLine(row),
            re = /\t/g, match;

        while ((match = re.exec(line)) != null) {
            rowTabs.push(match.index);
        }

        return rowTabs;
    }

    /**
     * @param {number} row
     * @param {number[]} widths
     */
    $adjustRow(row, widths) {
        var rowTabs = this.$tabsForRow(row);

        if (rowTabs.length == 0)
            return;

        var bias = 0, location = -1;

        // this always only contains two elements, so we're safe in the loop below
        var expandedSet = this.$izip(widths, rowTabs);

        for (var i = 0, l = expandedSet.length; i < l; i++) {
            var w = expandedSet[i][0], it = expandedSet[i][1];
            location += 1 + w;
            it += bias;
            var difference = location - it;

            if (difference == 0)
                continue;

            var partialLine = this.$editor.session.getLine(row).substr(0, it );
            var strippedPartialLine = partialLine.replace(/\s*$/g, "");
            var ispaces = partialLine.length - strippedPartialLine.length;

            if (difference > 0) {
                // put the spaces after the tab and then delete the tab, so any insertion
                // points behave as expected
                this.$editor.session.getDocument().insertInLine({row: row, column: it + 1}, Array(difference + 1).join(" ") + "\t");
                this.$editor.session.getDocument().removeInLine(row, it, it + 1);

                bias += difference;
            }

            if (difference < 0 && ispaces >= -difference) {
                this.$editor.session.getDocument().removeInLine(row, it + difference, it);
                bias += difference;
            }
        }
    }

    /**
     * The is a (naive) Python port--but works for these purposes
     * @param {any[][]} iterables
     */
    $izip_longest(iterables) {
        if (!iterables[0])
            return [];
        var longest = iterables[0].length;
        var iterablesLength = iterables.length;

        for (var i = 1; i < iterablesLength; i++) {
            var iLength = iterables[i].length;
            if (iLength > longest)
                longest = iLength;
        }

        var expandedSet = [];

        for (var l = 0; l < longest; l++) {
            var set = [];
            for (var i = 0; i < iterablesLength; i++) {
                if (iterables[i][l] === "")
                    set.push(NaN);
                else
                    set.push(iterables[i][l]);
            }

            expandedSet.push(set);
        }


        return expandedSet;
    }

    /**
     * an even more (naive) Python port
     * @param {string | any[]} widths
     * @param {string | any[]} tabs
     */
    $izip(widths, tabs) {
        // grab the shorter size
        var size = widths.length >= tabs.length ? tabs.length : widths.length;

        var expandedSet = [];
        for (var i = 0; i < size; i++) {
            var set = [ widths[i], tabs[i] ];
            expandedSet.push(set);
        }
        return expandedSet;
    }

}

exports.ElasticTabstopsLite = ElasticTabstopsLite;

var Editor = (__webpack_require__(27258).Editor);
(__webpack_require__(76321).defineOptions)(Editor.prototype, "editor", {
    useElasticTabstops: {
        /**
         * @param {boolean} val
         * @this {Editor}
         */
        set: function(val) {
            if (val) {
                if (!this.elasticTabstops)
                    this.elasticTabstops = new ElasticTabstopsLite(this);
                this.commands.on("afterExec", this.elasticTabstops.onAfterExec);
                this.commands.on("exec", this.elasticTabstops.onExec);
                this.on("change", this.elasticTabstops.onChange);
            } else if (this.elasticTabstops) {
                this.commands.removeListener("afterExec", this.elasticTabstops.onAfterExec);
                this.commands.removeListener("exec", this.elasticTabstops.onExec);
                this.removeListener("change", this.elasticTabstops.onChange);
            }
        }
    }
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFFQTs7QUFFQSwyQkFBMkI7O0FBRTNCLGFBQWEsbUNBQTJCO0FBQ3hDLDBDQUFrQztBQUNsQztBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUIsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9lbGFzdGljX3RhYnN0b3BzX2xpdGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIyBFbGFzdGljIFRhYnN0b3BzIExpdGUgZXh0ZW5zaW9uLlxuICpcbiAqIEF1dG9tYXRpY2FsbHkgYWRqdXN0cyB0YWIgc3BhY2luZyB0byBhbGlnbiBjb250ZW50IGluIHRhYnVsYXIgZm9ybWF0IGJ5IGNhbGN1bGF0aW5nIG9wdGltYWwgY29sdW1uIHdpZHRoc1xuICogYW5kIG1haW50YWluaW5nIGNvbnNpc3RlbnQgdmVydGljYWwgYWxpZ25tZW50IGFjcm9zcyBtdWx0aXBsZSBsaW5lcy4gVHJhY2tzIGNvbnRlbnQgY2hhbmdlcyBhbmQgZHluYW1pY2FsbHlcbiAqIHJlcHJvY2Vzc2VzIGFmZmVjdGVkIHJvd3MgdG8gZW5zdXJlIHByb3BlciBmb3JtYXR0aW5nIHdpdGhvdXQgbWFudWFsIGludGVydmVudGlvbi5cbiAqXG4gKiAqKkVuYWJsZToqKiBgZWRpdG9yLnNldE9wdGlvbihcInVzZUVsYXN0aWNUYWJzdG9wc1wiLCB0cnVlKWBcbiAqICBvciBjb25maWd1cmUgaXQgZHVyaW5nIGVkaXRvciBpbml0aWFsaXphdGlvbiBpbiB0aGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAbW9kdWxlXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5jbGFzcyBFbGFzdGljVGFic3RvcHNMaXRlIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZWRpdG9yKSB7XG4gICAgICAgIHRoaXMuJGVkaXRvciA9IGVkaXRvcjtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY2hhbmdlZFJvd3MgPSBbXTtcbiAgICAgICAgdmFyIHJlY29yZENoYW5nZXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkFmdGVyRXhlYyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVjb3JkQ2hhbmdlcyA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5wcm9jZXNzUm93cyhjaGFuZ2VkUm93cyk7XG4gICAgICAgICAgICBjaGFuZ2VkUm93cyA9IFtdO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9uRXhlYyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVjb3JkQ2hhbmdlcyA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmdW5jdGlvbihkZWx0YSkge1xuICAgICAgICAgICAgaWYgKHJlY29yZENoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZFJvd3MuaW5kZXhPZihkZWx0YS5zdGFydC5yb3cpID09IC0xKVxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkUm93cy5wdXNoKGRlbHRhLnN0YXJ0LnJvdyk7XG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhLmVuZC5yb3cgIT0gZGVsdGEuc3RhcnQucm93KVxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkUm93cy5wdXNoKGRlbHRhLmVuZC5yb3cpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IHJvd3NcbiAgICAgKi9cbiAgICBwcm9jZXNzUm93cyhyb3dzKSB7XG4gICAgICAgIHRoaXMuJGluQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgdmFyIGNoZWNrZWRSb3dzID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgciA9IDAsIHJvd0NvdW50ID0gcm93cy5sZW5ndGg7IHIgPCByb3dDb3VudDsgcisrKSB7XG4gICAgICAgICAgICB2YXIgcm93ID0gcm93c1tyXTtcblxuICAgICAgICAgICAgaWYgKGNoZWNrZWRSb3dzLmluZGV4T2Yocm93KSA+IC0xKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICB2YXIgY2VsbFdpZHRoT2JqID0gdGhpcy4kZmluZENlbGxXaWR0aHNGb3JCbG9jayhyb3cpO1xuICAgICAgICAgICAgdmFyIGNlbGxXaWR0aHMgPSB0aGlzLiRzZXRCbG9ja0NlbGxXaWR0aHNUb01heChjZWxsV2lkdGhPYmouY2VsbFdpZHRocyk7XG4gICAgICAgICAgICB2YXIgcm93SW5kZXggPSBjZWxsV2lkdGhPYmouZmlyc3RSb3c7XG5cbiAgICAgICAgICAgIGZvciAodmFyIHcgPSAwLCBsID0gY2VsbFdpZHRocy5sZW5ndGg7IHcgPCBsOyB3KyspIHtcbiAgICAgICAgICAgICAgICB2YXIgd2lkdGhzID0gY2VsbFdpZHRoc1t3XTtcbiAgICAgICAgICAgICAgICBjaGVja2VkUm93cy5wdXNoKHJvd0luZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLiRhZGp1c3RSb3cocm93SW5kZXgsIHdpZHRocyk7XG4gICAgICAgICAgICAgICAgcm93SW5kZXgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRpbkNoYW5nZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByb3dcbiAgICAgKi9cbiAgICAkZmluZENlbGxXaWR0aHNGb3JCbG9jayhyb3cpIHtcbiAgICAgICAgdmFyIGNlbGxXaWR0aHMgPSBbXSwgd2lkdGhzO1xuXG4gICAgICAgIC8vIHN0YXJ0aW5nIHJvdyBhbmQgYmFja3dhcmRcbiAgICAgICAgdmFyIHJvd0l0ZXIgPSByb3c7XG4gICAgICAgIHdoaWxlIChyb3dJdGVyID49IDApIHtcbiAgICAgICAgICAgIHdpZHRocyA9IHRoaXMuJGNlbGxXaWR0aHNGb3JSb3cocm93SXRlcik7XG4gICAgICAgICAgICBpZiAod2lkdGhzLmxlbmd0aCA9PSAwKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjZWxsV2lkdGhzLnVuc2hpZnQod2lkdGhzKTtcbiAgICAgICAgICAgIHJvd0l0ZXItLTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZmlyc3RSb3cgPSByb3dJdGVyICsgMTtcblxuICAgICAgICAvLyBmb3J3YXJkIChub3QgaW5jbHVkaW5nIHN0YXJ0aW5nIHJvdylcbiAgICAgICAgcm93SXRlciA9IHJvdztcbiAgICAgICAgdmFyIG51bVJvd3MgPSB0aGlzLiRlZGl0b3Iuc2Vzc2lvbi5nZXRMZW5ndGgoKTtcblxuICAgICAgICB3aGlsZSAocm93SXRlciA8IG51bVJvd3MgLSAxKSB7XG4gICAgICAgICAgICByb3dJdGVyKys7XG5cbiAgICAgICAgICAgIHdpZHRocyA9IHRoaXMuJGNlbGxXaWR0aHNGb3JSb3cocm93SXRlcik7XG4gICAgICAgICAgICBpZiAod2lkdGhzLmxlbmd0aCA9PSAwKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjZWxsV2lkdGhzLnB1c2god2lkdGhzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IGNlbGxXaWR0aHM6IGNlbGxXaWR0aHMsIGZpcnN0Um93OiBmaXJzdFJvdyB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByb3dcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyW119XG4gICAgICovXG4gICAgJGNlbGxXaWR0aHNGb3JSb3cocm93KSB7XG4gICAgICAgIHZhciBzZWxlY3Rpb25Db2x1bW5zID0gdGhpcy4kc2VsZWN0aW9uQ29sdW1uc0ZvclJvdyhyb3cpO1xuICAgICAgICAvLyB0b2RvOiBzdXBwb3J0IG11bHRpY3Vyc29yXG5cbiAgICAgICAgdmFyIHRhYnMgPSBbLTFdLmNvbmNhdCh0aGlzLiR0YWJzRm9yUm93KHJvdykpO1xuICAgICAgICB2YXIgd2lkdGhzID0gdGFicy5tYXAoZnVuY3Rpb24oZWwpIHsgcmV0dXJuIDA7IH0gKS5zbGljZSgxKTtcbiAgICAgICAgdmFyIGxpbmUgPSB0aGlzLiRlZGl0b3Iuc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRhYnMubGVuZ3RoIC0gMTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbGVmdEVkZ2UgPSB0YWJzW2ldKzE7XG4gICAgICAgICAgICB2YXIgcmlnaHRFZGdlID0gdGFic1tpKzFdO1xuXG4gICAgICAgICAgICB2YXIgcmlnaHRtb3N0U2VsZWN0aW9uID0gdGhpcy4kcmlnaHRtb3N0U2VsZWN0aW9uSW5DZWxsKHNlbGVjdGlvbkNvbHVtbnMsIHJpZ2h0RWRnZSk7XG4gICAgICAgICAgICB2YXIgY2VsbCA9IGxpbmUuc3Vic3RyaW5nKGxlZnRFZGdlLCByaWdodEVkZ2UpO1xuICAgICAgICAgICAgd2lkdGhzW2ldID0gTWF0aC5tYXgoY2VsbC5yZXBsYWNlKC9cXHMrJC9nLCcnKS5sZW5ndGgsIHJpZ2h0bW9zdFNlbGVjdGlvbiAtIGxlZnRFZGdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB3aWR0aHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJvd1xuICAgICAqIEByZXR1cm5zIHtudW1iZXJbXX1cbiAgICAgKi9cbiAgICAkc2VsZWN0aW9uQ29sdW1uc0ZvclJvdyhyb3cpIHtcbiAgICAgICAgdmFyIHNlbGVjdGlvbnMgPSBbXSwgY3Vyc29yID0gdGhpcy4kZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIGlmICh0aGlzLiRlZGl0b3Iuc2Vzc2lvbi5nZXRTZWxlY3Rpb24oKS5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIC8vIHRvZG86IHN1cHBvcnQgbXVsdGljdXJzb3JcbiAgICAgICAgICAgIGlmIChyb3cgPT0gY3Vyc29yLnJvdylcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb25zLnB1c2goY3Vyc29yLmNvbHVtbik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZWN0aW9ucztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcltdW119IGNlbGxXaWR0aHNcbiAgICAgKi9cbiAgICAkc2V0QmxvY2tDZWxsV2lkdGhzVG9NYXgoY2VsbFdpZHRocykge1xuICAgICAgICB2YXIgc3RhcnRpbmdOZXdCbG9jayA9IHRydWUsIGJsb2NrU3RhcnRSb3csIGJsb2NrRW5kUm93LCBtYXhXaWR0aDtcbiAgICAgICAgdmFyIGNvbHVtbkluZm8gPSB0aGlzLiRpemlwX2xvbmdlc3QoY2VsbFdpZHRocyk7XG5cbiAgICAgICAgZm9yICh2YXIgYyA9IDAsIGwgPSBjb2x1bW5JbmZvLmxlbmd0aDsgYyA8IGw7IGMrKykge1xuICAgICAgICAgICAgdmFyIGNvbHVtbiA9IGNvbHVtbkluZm9bY107XG4gICAgICAgICAgICBpZiAoIWNvbHVtbi5wdXNoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihjb2x1bW4pO1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gYWRkIGFuIGV4dHJhIE5vbmUgdG8gdGhlIGVuZCBzbyB0aGF0IHRoZSBlbmQgb2YgdGhlIGNvbHVtbiBhdXRvbWF0aWNhbGx5XG4gICAgICAgICAgICAvLyBmaW5pc2hlcyBhIGJsb2NrXG4gICAgICAgICAgICBjb2x1bW4ucHVzaChOYU4pO1xuXG4gICAgICAgICAgICBmb3IgKHZhciByID0gMCwgcyA9IGNvbHVtbi5sZW5ndGg7IHIgPCBzOyByKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSBjb2x1bW5bcl07XG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0aW5nTmV3QmxvY2spIHtcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tTdGFydFJvdyA9IHI7XG4gICAgICAgICAgICAgICAgICAgIG1heFdpZHRoID0gMDtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRpbmdOZXdCbG9jayA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4od2lkdGgpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGJsb2NrIGVuZGVkXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrRW5kUm93ID0gcjtcblxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gYmxvY2tTdGFydFJvdzsgaiA8IGJsb2NrRW5kUm93OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNlbGxXaWR0aHNbal1bY10gPSBtYXhXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdGFydGluZ05ld0Jsb2NrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBtYXhXaWR0aCA9IE1hdGgubWF4KG1heFdpZHRoLCB3aWR0aCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY2VsbFdpZHRocztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSBzZWxlY3Rpb25Db2x1bW5zXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGNlbGxSaWdodEVkZ2VcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgICRyaWdodG1vc3RTZWxlY3Rpb25JbkNlbGwoc2VsZWN0aW9uQ29sdW1ucywgY2VsbFJpZ2h0RWRnZSkge1xuICAgICAgICB2YXIgcmlnaHRtb3N0ID0gMDtcblxuICAgICAgICBpZiAoc2VsZWN0aW9uQ29sdW1ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciBsZW5ndGhzID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBzID0gMCwgbGVuZ3RoID0gc2VsZWN0aW9uQ29sdW1ucy5sZW5ndGg7IHMgPCBsZW5ndGg7IHMrKykge1xuICAgICAgICAgICAgICAgIGlmIChzZWxlY3Rpb25Db2x1bW5zW3NdIDw9IGNlbGxSaWdodEVkZ2UpXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aHMucHVzaChzKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIGxlbmd0aHMucHVzaCgwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJpZ2h0bW9zdCA9IE1hdGgubWF4LmFwcGx5KE1hdGgsIGxlbmd0aHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJpZ2h0bW9zdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcm93XG4gICAgICogQHJldHVybnMge251bWJlcltdfVxuICAgICAqL1xuICAgICR0YWJzRm9yUm93KHJvdykge1xuICAgICAgICB2YXIgcm93VGFicyA9IFtdLCBsaW5lID0gdGhpcy4kZWRpdG9yLnNlc3Npb24uZ2V0TGluZShyb3cpLFxuICAgICAgICAgICAgcmUgPSAvXFx0L2csIG1hdGNoO1xuXG4gICAgICAgIHdoaWxlICgobWF0Y2ggPSByZS5leGVjKGxpbmUpKSAhPSBudWxsKSB7XG4gICAgICAgICAgICByb3dUYWJzLnB1c2gobWF0Y2guaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJvd1RhYnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJvd1xuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IHdpZHRoc1xuICAgICAqL1xuICAgICRhZGp1c3RSb3cocm93LCB3aWR0aHMpIHtcbiAgICAgICAgdmFyIHJvd1RhYnMgPSB0aGlzLiR0YWJzRm9yUm93KHJvdyk7XG5cbiAgICAgICAgaWYgKHJvd1RhYnMubGVuZ3RoID09IDApXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIGJpYXMgPSAwLCBsb2NhdGlvbiA9IC0xO1xuXG4gICAgICAgIC8vIHRoaXMgYWx3YXlzIG9ubHkgY29udGFpbnMgdHdvIGVsZW1lbnRzLCBzbyB3ZSdyZSBzYWZlIGluIHRoZSBsb29wIGJlbG93XG4gICAgICAgIHZhciBleHBhbmRlZFNldCA9IHRoaXMuJGl6aXAod2lkdGhzLCByb3dUYWJzKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbCA9IGV4cGFuZGVkU2V0Lmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgdmFyIHcgPSBleHBhbmRlZFNldFtpXVswXSwgaXQgPSBleHBhbmRlZFNldFtpXVsxXTtcbiAgICAgICAgICAgIGxvY2F0aW9uICs9IDEgKyB3O1xuICAgICAgICAgICAgaXQgKz0gYmlhcztcbiAgICAgICAgICAgIHZhciBkaWZmZXJlbmNlID0gbG9jYXRpb24gLSBpdDtcblxuICAgICAgICAgICAgaWYgKGRpZmZlcmVuY2UgPT0gMClcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgdmFyIHBhcnRpYWxMaW5lID0gdGhpcy4kZWRpdG9yLnNlc3Npb24uZ2V0TGluZShyb3cpLnN1YnN0cigwLCBpdCApO1xuICAgICAgICAgICAgdmFyIHN0cmlwcGVkUGFydGlhbExpbmUgPSBwYXJ0aWFsTGluZS5yZXBsYWNlKC9cXHMqJC9nLCBcIlwiKTtcbiAgICAgICAgICAgIHZhciBpc3BhY2VzID0gcGFydGlhbExpbmUubGVuZ3RoIC0gc3RyaXBwZWRQYXJ0aWFsTGluZS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChkaWZmZXJlbmNlID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIHB1dCB0aGUgc3BhY2VzIGFmdGVyIHRoZSB0YWIgYW5kIHRoZW4gZGVsZXRlIHRoZSB0YWIsIHNvIGFueSBpbnNlcnRpb25cbiAgICAgICAgICAgICAgICAvLyBwb2ludHMgYmVoYXZlIGFzIGV4cGVjdGVkXG4gICAgICAgICAgICAgICAgdGhpcy4kZWRpdG9yLnNlc3Npb24uZ2V0RG9jdW1lbnQoKS5pbnNlcnRJbkxpbmUoe3Jvdzogcm93LCBjb2x1bW46IGl0ICsgMX0sIEFycmF5KGRpZmZlcmVuY2UgKyAxKS5qb2luKFwiIFwiKSArIFwiXFx0XCIpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVkaXRvci5zZXNzaW9uLmdldERvY3VtZW50KCkucmVtb3ZlSW5MaW5lKHJvdywgaXQsIGl0ICsgMSk7XG5cbiAgICAgICAgICAgICAgICBiaWFzICs9IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChkaWZmZXJlbmNlIDwgMCAmJiBpc3BhY2VzID49IC1kaWZmZXJlbmNlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWRpdG9yLnNlc3Npb24uZ2V0RG9jdW1lbnQoKS5yZW1vdmVJbkxpbmUocm93LCBpdCArIGRpZmZlcmVuY2UsIGl0KTtcbiAgICAgICAgICAgICAgICBiaWFzICs9IGRpZmZlcmVuY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgaXMgYSAobmFpdmUpIFB5dGhvbiBwb3J0LS1idXQgd29ya3MgZm9yIHRoZXNlIHB1cnBvc2VzXG4gICAgICogQHBhcmFtIHthbnlbXVtdfSBpdGVyYWJsZXNcbiAgICAgKi9cbiAgICAkaXppcF9sb25nZXN0KGl0ZXJhYmxlcykge1xuICAgICAgICBpZiAoIWl0ZXJhYmxlc1swXSlcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgdmFyIGxvbmdlc3QgPSBpdGVyYWJsZXNbMF0ubGVuZ3RoO1xuICAgICAgICB2YXIgaXRlcmFibGVzTGVuZ3RoID0gaXRlcmFibGVzLmxlbmd0aDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGl0ZXJhYmxlc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaUxlbmd0aCA9IGl0ZXJhYmxlc1tpXS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoaUxlbmd0aCA+IGxvbmdlc3QpXG4gICAgICAgICAgICAgICAgbG9uZ2VzdCA9IGlMZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZXhwYW5kZWRTZXQgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IGxvbmdlc3Q7IGwrKykge1xuICAgICAgICAgICAgdmFyIHNldCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVyYWJsZXNMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpdGVyYWJsZXNbaV1bbF0gPT09IFwiXCIpXG4gICAgICAgICAgICAgICAgICAgIHNldC5wdXNoKE5hTik7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBzZXQucHVzaChpdGVyYWJsZXNbaV1bbF0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBleHBhbmRlZFNldC5wdXNoKHNldCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiBleHBhbmRlZFNldDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBhbiBldmVuIG1vcmUgKG5haXZlKSBQeXRob24gcG9ydFxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgYW55W119IHdpZHRoc1xuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgYW55W119IHRhYnNcbiAgICAgKi9cbiAgICAkaXppcCh3aWR0aHMsIHRhYnMpIHtcbiAgICAgICAgLy8gZ3JhYiB0aGUgc2hvcnRlciBzaXplXG4gICAgICAgIHZhciBzaXplID0gd2lkdGhzLmxlbmd0aCA+PSB0YWJzLmxlbmd0aCA/IHRhYnMubGVuZ3RoIDogd2lkdGhzLmxlbmd0aDtcblxuICAgICAgICB2YXIgZXhwYW5kZWRTZXQgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzZXQgPSBbIHdpZHRoc1tpXSwgdGFic1tpXSBdO1xuICAgICAgICAgICAgZXhwYW5kZWRTZXQucHVzaChzZXQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleHBhbmRlZFNldDtcbiAgICB9XG5cbn1cblxuZXhwb3J0cy5FbGFzdGljVGFic3RvcHNMaXRlID0gRWxhc3RpY1RhYnN0b3BzTGl0ZTtcblxudmFyIEVkaXRvciA9IHJlcXVpcmUoXCIuLi9lZGl0b3JcIikuRWRpdG9yO1xucmVxdWlyZShcIi4uL2NvbmZpZ1wiKS5kZWZpbmVPcHRpb25zKEVkaXRvci5wcm90b3R5cGUsIFwiZWRpdG9yXCIsIHtcbiAgICB1c2VFbGFzdGljVGFic3RvcHM6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmFsXG4gICAgICAgICAqIEB0aGlzIHtFZGl0b3J9XG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lbGFzdGljVGFic3RvcHMpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxhc3RpY1RhYnN0b3BzID0gbmV3IEVsYXN0aWNUYWJzdG9wc0xpdGUodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kcy5vbihcImFmdGVyRXhlY1wiLCB0aGlzLmVsYXN0aWNUYWJzdG9wcy5vbkFmdGVyRXhlYyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kcy5vbihcImV4ZWNcIiwgdGhpcy5lbGFzdGljVGFic3RvcHMub25FeGVjKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwiY2hhbmdlXCIsIHRoaXMuZWxhc3RpY1RhYnN0b3BzLm9uQ2hhbmdlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5lbGFzdGljVGFic3RvcHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLnJlbW92ZUxpc3RlbmVyKFwiYWZ0ZXJFeGVjXCIsIHRoaXMuZWxhc3RpY1RhYnN0b3BzLm9uQWZ0ZXJFeGVjKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLnJlbW92ZUxpc3RlbmVyKFwiZXhlY1wiLCB0aGlzLmVsYXN0aWNUYWJzdG9wcy5vbkV4ZWMpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoXCJjaGFuZ2VcIiwgdGhpcy5lbGFzdGljVGFic3RvcHMub25DaGFuZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=