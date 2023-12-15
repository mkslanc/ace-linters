"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7720],{

/***/ 37720:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


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

var Editor = (__webpack_require__(82880)/* .Editor */ .M);
(__webpack_require__(13188).defineOptions)(Editor.prototype, "editor", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QixrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L2VsYXN0aWNfdGFic3RvcHNfbGl0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbmNsYXNzIEVsYXN0aWNUYWJzdG9wc0xpdGUge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihlZGl0b3IpIHtcbiAgICAgICAgdGhpcy4kZWRpdG9yID0gZWRpdG9yO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHZhciBjaGFuZ2VkUm93cyA9IFtdO1xuICAgICAgICB2YXIgcmVjb3JkQ2hhbmdlcyA9IGZhbHNlO1xuICAgICAgICB0aGlzLm9uQWZ0ZXJFeGVjID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZWNvcmRDaGFuZ2VzID0gZmFsc2U7XG4gICAgICAgICAgICBzZWxmLnByb2Nlc3NSb3dzKGNoYW5nZWRSb3dzKTtcbiAgICAgICAgICAgIGNoYW5nZWRSb3dzID0gW107XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25FeGVjID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZWNvcmRDaGFuZ2VzID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vbkNoYW5nZSA9IGZ1bmN0aW9uKGRlbHRhKSB7XG4gICAgICAgICAgICBpZiAocmVjb3JkQ2hhbmdlcykge1xuICAgICAgICAgICAgICAgIGlmIChjaGFuZ2VkUm93cy5pbmRleE9mKGRlbHRhLnN0YXJ0LnJvdykgPT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWRSb3dzLnB1c2goZGVsdGEuc3RhcnQucm93KTtcbiAgICAgICAgICAgICAgICBpZiAoZGVsdGEuZW5kLnJvdyAhPSBkZWx0YS5zdGFydC5yb3cpXG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWRSb3dzLnB1c2goZGVsdGEuZW5kLnJvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gcm93c1xuICAgICAqL1xuICAgIHByb2Nlc3NSb3dzKHJvd3MpIHtcbiAgICAgICAgdGhpcy4kaW5DaGFuZ2UgPSB0cnVlO1xuICAgICAgICB2YXIgY2hlY2tlZFJvd3MgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciByID0gMCwgcm93Q291bnQgPSByb3dzLmxlbmd0aDsgciA8IHJvd0NvdW50OyByKyspIHtcbiAgICAgICAgICAgIHZhciByb3cgPSByb3dzW3JdO1xuXG4gICAgICAgICAgICBpZiAoY2hlY2tlZFJvd3MuaW5kZXhPZihyb3cpID4gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIHZhciBjZWxsV2lkdGhPYmogPSB0aGlzLiRmaW5kQ2VsbFdpZHRoc0ZvckJsb2NrKHJvdyk7XG4gICAgICAgICAgICB2YXIgY2VsbFdpZHRocyA9IHRoaXMuJHNldEJsb2NrQ2VsbFdpZHRoc1RvTWF4KGNlbGxXaWR0aE9iai5jZWxsV2lkdGhzKTtcbiAgICAgICAgICAgIHZhciByb3dJbmRleCA9IGNlbGxXaWR0aE9iai5maXJzdFJvdztcblxuICAgICAgICAgICAgZm9yICh2YXIgdyA9IDAsIGwgPSBjZWxsV2lkdGhzLmxlbmd0aDsgdyA8IGw7IHcrKykge1xuICAgICAgICAgICAgICAgIHZhciB3aWR0aHMgPSBjZWxsV2lkdGhzW3ddO1xuICAgICAgICAgICAgICAgIGNoZWNrZWRSb3dzLnB1c2gocm93SW5kZXgpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGFkanVzdFJvdyhyb3dJbmRleCwgd2lkdGhzKTtcbiAgICAgICAgICAgICAgICByb3dJbmRleCsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGluQ2hhbmdlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJvd1xuICAgICAqL1xuICAgICRmaW5kQ2VsbFdpZHRoc0ZvckJsb2NrKHJvdykge1xuICAgICAgICB2YXIgY2VsbFdpZHRocyA9IFtdLCB3aWR0aHM7XG5cbiAgICAgICAgLy8gc3RhcnRpbmcgcm93IGFuZCBiYWNrd2FyZFxuICAgICAgICB2YXIgcm93SXRlciA9IHJvdztcbiAgICAgICAgd2hpbGUgKHJvd0l0ZXIgPj0gMCkge1xuICAgICAgICAgICAgd2lkdGhzID0gdGhpcy4kY2VsbFdpZHRoc0ZvclJvdyhyb3dJdGVyKTtcbiAgICAgICAgICAgIGlmICh3aWR0aHMubGVuZ3RoID09IDApXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNlbGxXaWR0aHMudW5zaGlmdCh3aWR0aHMpO1xuICAgICAgICAgICAgcm93SXRlci0tO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmaXJzdFJvdyA9IHJvd0l0ZXIgKyAxO1xuXG4gICAgICAgIC8vIGZvcndhcmQgKG5vdCBpbmNsdWRpbmcgc3RhcnRpbmcgcm93KVxuICAgICAgICByb3dJdGVyID0gcm93O1xuICAgICAgICB2YXIgbnVtUm93cyA9IHRoaXMuJGVkaXRvci5zZXNzaW9uLmdldExlbmd0aCgpO1xuXG4gICAgICAgIHdoaWxlIChyb3dJdGVyIDwgbnVtUm93cyAtIDEpIHtcbiAgICAgICAgICAgIHJvd0l0ZXIrKztcblxuICAgICAgICAgICAgd2lkdGhzID0gdGhpcy4kY2VsbFdpZHRoc0ZvclJvdyhyb3dJdGVyKTtcbiAgICAgICAgICAgIGlmICh3aWR0aHMubGVuZ3RoID09IDApXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNlbGxXaWR0aHMucHVzaCh3aWR0aHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgY2VsbFdpZHRoczogY2VsbFdpZHRocywgZmlyc3RSb3c6IGZpcnN0Um93IH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJvd1xuICAgICAqIEByZXR1cm5zIHtudW1iZXJbXX1cbiAgICAgKi9cbiAgICAkY2VsbFdpZHRoc0ZvclJvdyhyb3cpIHtcbiAgICAgICAgdmFyIHNlbGVjdGlvbkNvbHVtbnMgPSB0aGlzLiRzZWxlY3Rpb25Db2x1bW5zRm9yUm93KHJvdyk7XG4gICAgICAgIC8vIHRvZG86IHN1cHBvcnQgbXVsdGljdXJzb3JcblxuICAgICAgICB2YXIgdGFicyA9IFstMV0uY29uY2F0KHRoaXMuJHRhYnNGb3JSb3cocm93KSk7XG4gICAgICAgIHZhciB3aWR0aHMgPSB0YWJzLm1hcChmdW5jdGlvbihlbCkgeyByZXR1cm4gMDsgfSApLnNsaWNlKDEpO1xuICAgICAgICB2YXIgbGluZSA9IHRoaXMuJGVkaXRvci5zZXNzaW9uLmdldExpbmUocm93KTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gdGFicy5sZW5ndGggLSAxOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBsZWZ0RWRnZSA9IHRhYnNbaV0rMTtcbiAgICAgICAgICAgIHZhciByaWdodEVkZ2UgPSB0YWJzW2krMV07XG5cbiAgICAgICAgICAgIHZhciByaWdodG1vc3RTZWxlY3Rpb24gPSB0aGlzLiRyaWdodG1vc3RTZWxlY3Rpb25JbkNlbGwoc2VsZWN0aW9uQ29sdW1ucywgcmlnaHRFZGdlKTtcbiAgICAgICAgICAgIHZhciBjZWxsID0gbGluZS5zdWJzdHJpbmcobGVmdEVkZ2UsIHJpZ2h0RWRnZSk7XG4gICAgICAgICAgICB3aWR0aHNbaV0gPSBNYXRoLm1heChjZWxsLnJlcGxhY2UoL1xccyskL2csJycpLmxlbmd0aCwgcmlnaHRtb3N0U2VsZWN0aW9uIC0gbGVmdEVkZ2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHdpZHRocztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcm93XG4gICAgICogQHJldHVybnMge251bWJlcltdfVxuICAgICAqL1xuICAgICRzZWxlY3Rpb25Db2x1bW5zRm9yUm93KHJvdykge1xuICAgICAgICB2YXIgc2VsZWN0aW9ucyA9IFtdLCBjdXJzb3IgPSB0aGlzLiRlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgaWYgKHRoaXMuJGVkaXRvci5zZXNzaW9uLmdldFNlbGVjdGlvbigpLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgLy8gdG9kbzogc3VwcG9ydCBtdWx0aWN1cnNvclxuICAgICAgICAgICAgaWYgKHJvdyA9PSBjdXJzb3Iucm93KVxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbnMucHVzaChjdXJzb3IuY29sdW1uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxlY3Rpb25zO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyW11bXX0gY2VsbFdpZHRoc1xuICAgICAqL1xuICAgICRzZXRCbG9ja0NlbGxXaWR0aHNUb01heChjZWxsV2lkdGhzKSB7XG4gICAgICAgIHZhciBzdGFydGluZ05ld0Jsb2NrID0gdHJ1ZSwgYmxvY2tTdGFydFJvdywgYmxvY2tFbmRSb3csIG1heFdpZHRoO1xuICAgICAgICB2YXIgY29sdW1uSW5mbyA9IHRoaXMuJGl6aXBfbG9uZ2VzdChjZWxsV2lkdGhzKTtcblxuICAgICAgICBmb3IgKHZhciBjID0gMCwgbCA9IGNvbHVtbkluZm8ubGVuZ3RoOyBjIDwgbDsgYysrKSB7XG4gICAgICAgICAgICB2YXIgY29sdW1uID0gY29sdW1uSW5mb1tjXTtcbiAgICAgICAgICAgIGlmICghY29sdW1uLnB1c2gpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGNvbHVtbik7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBhZGQgYW4gZXh0cmEgTm9uZSB0byB0aGUgZW5kIHNvIHRoYXQgdGhlIGVuZCBvZiB0aGUgY29sdW1uIGF1dG9tYXRpY2FsbHlcbiAgICAgICAgICAgIC8vIGZpbmlzaGVzIGEgYmxvY2tcbiAgICAgICAgICAgIGNvbHVtbi5wdXNoKE5hTik7XG5cbiAgICAgICAgICAgIGZvciAodmFyIHIgPSAwLCBzID0gY29sdW1uLmxlbmd0aDsgciA8IHM7IHIrKykge1xuICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IGNvbHVtbltyXTtcbiAgICAgICAgICAgICAgICBpZiAoc3RhcnRpbmdOZXdCbG9jaykge1xuICAgICAgICAgICAgICAgICAgICBibG9ja1N0YXJ0Um93ID0gcjtcbiAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGggPSAwO1xuICAgICAgICAgICAgICAgICAgICBzdGFydGluZ05ld0Jsb2NrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpc05hTih3aWR0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYmxvY2sgZW5kZWRcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tFbmRSb3cgPSByO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGogPSBibG9ja1N0YXJ0Um93OyBqIDwgYmxvY2tFbmRSb3c7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2VsbFdpZHRoc1tqXVtjXSA9IG1heFdpZHRoO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0aW5nTmV3QmxvY2sgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIG1heFdpZHRoID0gTWF0aC5tYXgobWF4V2lkdGgsIHdpZHRoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjZWxsV2lkdGhzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyW119IHNlbGVjdGlvbkNvbHVtbnNcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY2VsbFJpZ2h0RWRnZVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgJHJpZ2h0bW9zdFNlbGVjdGlvbkluQ2VsbChzZWxlY3Rpb25Db2x1bW5zLCBjZWxsUmlnaHRFZGdlKSB7XG4gICAgICAgIHZhciByaWdodG1vc3QgPSAwO1xuXG4gICAgICAgIGlmIChzZWxlY3Rpb25Db2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGxlbmd0aHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIHMgPSAwLCBsZW5ndGggPSBzZWxlY3Rpb25Db2x1bW5zLmxlbmd0aDsgcyA8IGxlbmd0aDsgcysrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbkNvbHVtbnNbc10gPD0gY2VsbFJpZ2h0RWRnZSlcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3Rocy5wdXNoKHMpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3Rocy5wdXNoKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmlnaHRtb3N0ID0gTWF0aC5tYXguYXBwbHkoTWF0aCwgbGVuZ3Rocyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmlnaHRtb3N0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByb3dcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyW119XG4gICAgICovXG4gICAgJHRhYnNGb3JSb3cocm93KSB7XG4gICAgICAgIHZhciByb3dUYWJzID0gW10sIGxpbmUgPSB0aGlzLiRlZGl0b3Iuc2Vzc2lvbi5nZXRMaW5lKHJvdyksXG4gICAgICAgICAgICByZSA9IC9cXHQvZywgbWF0Y2g7XG5cbiAgICAgICAgd2hpbGUgKChtYXRjaCA9IHJlLmV4ZWMobGluZSkpICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJvd1RhYnMucHVzaChtYXRjaC5pbmRleCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcm93VGFicztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcm93XG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gd2lkdGhzXG4gICAgICovXG4gICAgJGFkanVzdFJvdyhyb3csIHdpZHRocykge1xuICAgICAgICB2YXIgcm93VGFicyA9IHRoaXMuJHRhYnNGb3JSb3cocm93KTtcblxuICAgICAgICBpZiAocm93VGFicy5sZW5ndGggPT0gMClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgYmlhcyA9IDAsIGxvY2F0aW9uID0gLTE7XG5cbiAgICAgICAgLy8gdGhpcyBhbHdheXMgb25seSBjb250YWlucyB0d28gZWxlbWVudHMsIHNvIHdlJ3JlIHNhZmUgaW4gdGhlIGxvb3AgYmVsb3dcbiAgICAgICAgdmFyIGV4cGFuZGVkU2V0ID0gdGhpcy4kaXppcCh3aWR0aHMsIHJvd1RhYnMpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZXhwYW5kZWRTZXQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdyA9IGV4cGFuZGVkU2V0W2ldWzBdLCBpdCA9IGV4cGFuZGVkU2V0W2ldWzFdO1xuICAgICAgICAgICAgbG9jYXRpb24gKz0gMSArIHc7XG4gICAgICAgICAgICBpdCArPSBiaWFzO1xuICAgICAgICAgICAgdmFyIGRpZmZlcmVuY2UgPSBsb2NhdGlvbiAtIGl0O1xuXG4gICAgICAgICAgICBpZiAoZGlmZmVyZW5jZSA9PSAwKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICB2YXIgcGFydGlhbExpbmUgPSB0aGlzLiRlZGl0b3Iuc2Vzc2lvbi5nZXRMaW5lKHJvdykuc3Vic3RyKDAsIGl0ICk7XG4gICAgICAgICAgICB2YXIgc3RyaXBwZWRQYXJ0aWFsTGluZSA9IHBhcnRpYWxMaW5lLnJlcGxhY2UoL1xccyokL2csIFwiXCIpO1xuICAgICAgICAgICAgdmFyIGlzcGFjZXMgPSBwYXJ0aWFsTGluZS5sZW5ndGggLSBzdHJpcHBlZFBhcnRpYWxMaW5lLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKGRpZmZlcmVuY2UgPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gcHV0IHRoZSBzcGFjZXMgYWZ0ZXIgdGhlIHRhYiBhbmQgdGhlbiBkZWxldGUgdGhlIHRhYiwgc28gYW55IGluc2VydGlvblxuICAgICAgICAgICAgICAgIC8vIHBvaW50cyBiZWhhdmUgYXMgZXhwZWN0ZWRcbiAgICAgICAgICAgICAgICB0aGlzLiRlZGl0b3Iuc2Vzc2lvbi5nZXREb2N1bWVudCgpLmluc2VydEluTGluZSh7cm93OiByb3csIGNvbHVtbjogaXQgKyAxfSwgQXJyYXkoZGlmZmVyZW5jZSArIDEpLmpvaW4oXCIgXCIpICsgXCJcXHRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWRpdG9yLnNlc3Npb24uZ2V0RG9jdW1lbnQoKS5yZW1vdmVJbkxpbmUocm93LCBpdCwgaXQgKyAxKTtcblxuICAgICAgICAgICAgICAgIGJpYXMgKz0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRpZmZlcmVuY2UgPCAwICYmIGlzcGFjZXMgPj0gLWRpZmZlcmVuY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlZGl0b3Iuc2Vzc2lvbi5nZXREb2N1bWVudCgpLnJlbW92ZUluTGluZShyb3csIGl0ICsgZGlmZmVyZW5jZSwgaXQpO1xuICAgICAgICAgICAgICAgIGJpYXMgKz0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBpcyBhIChuYWl2ZSkgUHl0aG9uIHBvcnQtLWJ1dCB3b3JrcyBmb3IgdGhlc2UgcHVycG9zZXNcbiAgICAgKiBAcGFyYW0ge2FueVtdW119IGl0ZXJhYmxlc1xuICAgICAqL1xuICAgICRpemlwX2xvbmdlc3QoaXRlcmFibGVzKSB7XG4gICAgICAgIGlmICghaXRlcmFibGVzWzBdKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB2YXIgbG9uZ2VzdCA9IGl0ZXJhYmxlc1swXS5sZW5ndGg7XG4gICAgICAgIHZhciBpdGVyYWJsZXNMZW5ndGggPSBpdGVyYWJsZXMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgaXRlcmFibGVzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBpTGVuZ3RoID0gaXRlcmFibGVzW2ldLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChpTGVuZ3RoID4gbG9uZ2VzdClcbiAgICAgICAgICAgICAgICBsb25nZXN0ID0gaUxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBleHBhbmRlZFNldCA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIGwgPSAwOyBsIDwgbG9uZ2VzdDsgbCsrKSB7XG4gICAgICAgICAgICB2YXIgc2V0ID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZXJhYmxlc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGl0ZXJhYmxlc1tpXVtsXSA9PT0gXCJcIilcbiAgICAgICAgICAgICAgICAgICAgc2V0LnB1c2goTmFOKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHNldC5wdXNoKGl0ZXJhYmxlc1tpXVtsXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV4cGFuZGVkU2V0LnB1c2goc2V0KTtcbiAgICAgICAgfVxuXG5cbiAgICAgICAgcmV0dXJuIGV4cGFuZGVkU2V0O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGFuIGV2ZW4gbW9yZSAobmFpdmUpIFB5dGhvbiBwb3J0XG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBhbnlbXX0gd2lkdGhzXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBhbnlbXX0gdGFic1xuICAgICAqL1xuICAgICRpemlwKHdpZHRocywgdGFicykge1xuICAgICAgICAvLyBncmFiIHRoZSBzaG9ydGVyIHNpemVcbiAgICAgICAgdmFyIHNpemUgPSB3aWR0aHMubGVuZ3RoID49IHRhYnMubGVuZ3RoID8gdGFicy5sZW5ndGggOiB3aWR0aHMubGVuZ3RoO1xuXG4gICAgICAgIHZhciBleHBhbmRlZFNldCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNldCA9IFsgd2lkdGhzW2ldLCB0YWJzW2ldIF07XG4gICAgICAgICAgICBleHBhbmRlZFNldC5wdXNoKHNldCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4cGFuZGVkU2V0O1xuICAgIH1cblxufVxuXG5leHBvcnRzLkVsYXN0aWNUYWJzdG9wc0xpdGUgPSBFbGFzdGljVGFic3RvcHNMaXRlO1xuXG52YXIgRWRpdG9yID0gcmVxdWlyZShcIi4uL2VkaXRvclwiKS5FZGl0b3I7XG5yZXF1aXJlKFwiLi4vY29uZmlnXCIpLmRlZmluZU9wdGlvbnMoRWRpdG9yLnByb3RvdHlwZSwgXCJlZGl0b3JcIiwge1xuICAgIHVzZUVsYXN0aWNUYWJzdG9wczoge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHBhcmFtIHtib29sZWFufSB2YWxcbiAgICAgICAgICogQHRoaXMge0VkaXRvcn1cbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmVsYXN0aWNUYWJzdG9wcylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbGFzdGljVGFic3RvcHMgPSBuZXcgRWxhc3RpY1RhYnN0b3BzTGl0ZSh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLm9uKFwiYWZ0ZXJFeGVjXCIsIHRoaXMuZWxhc3RpY1RhYnN0b3BzLm9uQWZ0ZXJFeGVjKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLm9uKFwiZXhlY1wiLCB0aGlzLmVsYXN0aWNUYWJzdG9wcy5vbkV4ZWMpO1xuICAgICAgICAgICAgICAgIHRoaXMub24oXCJjaGFuZ2VcIiwgdGhpcy5lbGFzdGljVGFic3RvcHMub25DaGFuZ2UpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmVsYXN0aWNUYWJzdG9wcykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZHMucmVtb3ZlTGlzdGVuZXIoXCJhZnRlckV4ZWNcIiwgdGhpcy5lbGFzdGljVGFic3RvcHMub25BZnRlckV4ZWMpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZHMucmVtb3ZlTGlzdGVuZXIoXCJleGVjXCIsIHRoaXMuZWxhc3RpY1RhYnN0b3BzLm9uRXhlYyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcihcImNoYW5nZVwiLCB0aGlzLmVsYXN0aWNUYWJzdG9wcy5vbkNoYW5nZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==