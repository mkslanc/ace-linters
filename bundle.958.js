"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[958],{

/***/ 10958:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvZWxhc3RpY190YWJzdG9wc19saXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuY2xhc3MgRWxhc3RpY1RhYnN0b3BzTGl0ZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGVkaXRvcikge1xuICAgICAgICB0aGlzLiRlZGl0b3IgPSBlZGl0b3I7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIGNoYW5nZWRSb3dzID0gW107XG4gICAgICAgIHZhciByZWNvcmRDaGFuZ2VzID0gZmFsc2U7XG4gICAgICAgIHRoaXMub25BZnRlckV4ZWMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlY29yZENoYW5nZXMgPSBmYWxzZTtcbiAgICAgICAgICAgIHNlbGYucHJvY2Vzc1Jvd3MoY2hhbmdlZFJvd3MpO1xuICAgICAgICAgICAgY2hhbmdlZFJvd3MgPSBbXTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5vbkV4ZWMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlY29yZENoYW5nZXMgPSB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9uQ2hhbmdlID0gZnVuY3Rpb24oZGVsdGEpIHtcbiAgICAgICAgICAgIGlmIChyZWNvcmRDaGFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNoYW5nZWRSb3dzLmluZGV4T2YoZGVsdGEuc3RhcnQucm93KSA9PSAtMSlcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZFJvd3MucHVzaChkZWx0YS5zdGFydC5yb3cpO1xuICAgICAgICAgICAgICAgIGlmIChkZWx0YS5lbmQucm93ICE9IGRlbHRhLnN0YXJ0LnJvdylcbiAgICAgICAgICAgICAgICAgICAgY2hhbmdlZFJvd3MucHVzaChkZWx0YS5lbmQucm93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSByb3dzXG4gICAgICovXG4gICAgcHJvY2Vzc1Jvd3Mocm93cykge1xuICAgICAgICB0aGlzLiRpbkNoYW5nZSA9IHRydWU7XG4gICAgICAgIHZhciBjaGVja2VkUm93cyA9IFtdO1xuXG4gICAgICAgIGZvciAodmFyIHIgPSAwLCByb3dDb3VudCA9IHJvd3MubGVuZ3RoOyByIDwgcm93Q291bnQ7IHIrKykge1xuICAgICAgICAgICAgdmFyIHJvdyA9IHJvd3Nbcl07XG5cbiAgICAgICAgICAgIGlmIChjaGVja2VkUm93cy5pbmRleE9mKHJvdykgPiAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgdmFyIGNlbGxXaWR0aE9iaiA9IHRoaXMuJGZpbmRDZWxsV2lkdGhzRm9yQmxvY2socm93KTtcbiAgICAgICAgICAgIHZhciBjZWxsV2lkdGhzID0gdGhpcy4kc2V0QmxvY2tDZWxsV2lkdGhzVG9NYXgoY2VsbFdpZHRoT2JqLmNlbGxXaWR0aHMpO1xuICAgICAgICAgICAgdmFyIHJvd0luZGV4ID0gY2VsbFdpZHRoT2JqLmZpcnN0Um93O1xuXG4gICAgICAgICAgICBmb3IgKHZhciB3ID0gMCwgbCA9IGNlbGxXaWR0aHMubGVuZ3RoOyB3IDwgbDsgdysrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdpZHRocyA9IGNlbGxXaWR0aHNbd107XG4gICAgICAgICAgICAgICAgY2hlY2tlZFJvd3MucHVzaChyb3dJbmRleCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kYWRqdXN0Um93KHJvd0luZGV4LCB3aWR0aHMpO1xuICAgICAgICAgICAgICAgIHJvd0luZGV4Kys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kaW5DaGFuZ2UgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcm93XG4gICAgICovXG4gICAgJGZpbmRDZWxsV2lkdGhzRm9yQmxvY2socm93KSB7XG4gICAgICAgIHZhciBjZWxsV2lkdGhzID0gW10sIHdpZHRocztcblxuICAgICAgICAvLyBzdGFydGluZyByb3cgYW5kIGJhY2t3YXJkXG4gICAgICAgIHZhciByb3dJdGVyID0gcm93O1xuICAgICAgICB3aGlsZSAocm93SXRlciA+PSAwKSB7XG4gICAgICAgICAgICB3aWR0aHMgPSB0aGlzLiRjZWxsV2lkdGhzRm9yUm93KHJvd0l0ZXIpO1xuICAgICAgICAgICAgaWYgKHdpZHRocy5sZW5ndGggPT0gMClcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2VsbFdpZHRocy51bnNoaWZ0KHdpZHRocyk7XG4gICAgICAgICAgICByb3dJdGVyLS07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZpcnN0Um93ID0gcm93SXRlciArIDE7XG5cbiAgICAgICAgLy8gZm9yd2FyZCAobm90IGluY2x1ZGluZyBzdGFydGluZyByb3cpXG4gICAgICAgIHJvd0l0ZXIgPSByb3c7XG4gICAgICAgIHZhciBudW1Sb3dzID0gdGhpcy4kZWRpdG9yLnNlc3Npb24uZ2V0TGVuZ3RoKCk7XG5cbiAgICAgICAgd2hpbGUgKHJvd0l0ZXIgPCBudW1Sb3dzIC0gMSkge1xuICAgICAgICAgICAgcm93SXRlcisrO1xuXG4gICAgICAgICAgICB3aWR0aHMgPSB0aGlzLiRjZWxsV2lkdGhzRm9yUm93KHJvd0l0ZXIpO1xuICAgICAgICAgICAgaWYgKHdpZHRocy5sZW5ndGggPT0gMClcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2VsbFdpZHRocy5wdXNoKHdpZHRocyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBjZWxsV2lkdGhzOiBjZWxsV2lkdGhzLCBmaXJzdFJvdzogZmlyc3RSb3cgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gcm93XG4gICAgICogQHJldHVybnMge251bWJlcltdfVxuICAgICAqL1xuICAgICRjZWxsV2lkdGhzRm9yUm93KHJvdykge1xuICAgICAgICB2YXIgc2VsZWN0aW9uQ29sdW1ucyA9IHRoaXMuJHNlbGVjdGlvbkNvbHVtbnNGb3JSb3cocm93KTtcbiAgICAgICAgLy8gdG9kbzogc3VwcG9ydCBtdWx0aWN1cnNvclxuXG4gICAgICAgIHZhciB0YWJzID0gWy0xXS5jb25jYXQodGhpcy4kdGFic0ZvclJvdyhyb3cpKTtcbiAgICAgICAgdmFyIHdpZHRocyA9IHRhYnMubWFwKGZ1bmN0aW9uKGVsKSB7IHJldHVybiAwOyB9ICkuc2xpY2UoMSk7XG4gICAgICAgIHZhciBsaW5lID0gdGhpcy4kZWRpdG9yLnNlc3Npb24uZ2V0TGluZShyb3cpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSB0YWJzLmxlbmd0aCAtIDE7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIGxlZnRFZGdlID0gdGFic1tpXSsxO1xuICAgICAgICAgICAgdmFyIHJpZ2h0RWRnZSA9IHRhYnNbaSsxXTtcblxuICAgICAgICAgICAgdmFyIHJpZ2h0bW9zdFNlbGVjdGlvbiA9IHRoaXMuJHJpZ2h0bW9zdFNlbGVjdGlvbkluQ2VsbChzZWxlY3Rpb25Db2x1bW5zLCByaWdodEVkZ2UpO1xuICAgICAgICAgICAgdmFyIGNlbGwgPSBsaW5lLnN1YnN0cmluZyhsZWZ0RWRnZSwgcmlnaHRFZGdlKTtcbiAgICAgICAgICAgIHdpZHRoc1tpXSA9IE1hdGgubWF4KGNlbGwucmVwbGFjZSgvXFxzKyQvZywnJykubGVuZ3RoLCByaWdodG1vc3RTZWxlY3Rpb24gLSBsZWZ0RWRnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gd2lkdGhzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByb3dcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyW119XG4gICAgICovXG4gICAgJHNlbGVjdGlvbkNvbHVtbnNGb3JSb3cocm93KSB7XG4gICAgICAgIHZhciBzZWxlY3Rpb25zID0gW10sIGN1cnNvciA9IHRoaXMuJGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICBpZiAodGhpcy4kZWRpdG9yLnNlc3Npb24uZ2V0U2VsZWN0aW9uKCkuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICAvLyB0b2RvOiBzdXBwb3J0IG11bHRpY3Vyc29yXG4gICAgICAgICAgICBpZiAocm93ID09IGN1cnNvci5yb3cpXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9ucy5wdXNoKGN1cnNvci5jb2x1bW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbnM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJbXVtdfSBjZWxsV2lkdGhzXG4gICAgICovXG4gICAgJHNldEJsb2NrQ2VsbFdpZHRoc1RvTWF4KGNlbGxXaWR0aHMpIHtcbiAgICAgICAgdmFyIHN0YXJ0aW5nTmV3QmxvY2sgPSB0cnVlLCBibG9ja1N0YXJ0Um93LCBibG9ja0VuZFJvdywgbWF4V2lkdGg7XG4gICAgICAgIHZhciBjb2x1bW5JbmZvID0gdGhpcy4kaXppcF9sb25nZXN0KGNlbGxXaWR0aHMpO1xuXG4gICAgICAgIGZvciAodmFyIGMgPSAwLCBsID0gY29sdW1uSW5mby5sZW5ndGg7IGMgPCBsOyBjKyspIHtcbiAgICAgICAgICAgIHZhciBjb2x1bW4gPSBjb2x1bW5JbmZvW2NdO1xuICAgICAgICAgICAgaWYgKCFjb2x1bW4ucHVzaCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoY29sdW1uKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGFkZCBhbiBleHRyYSBOb25lIHRvIHRoZSBlbmQgc28gdGhhdCB0aGUgZW5kIG9mIHRoZSBjb2x1bW4gYXV0b21hdGljYWxseVxuICAgICAgICAgICAgLy8gZmluaXNoZXMgYSBibG9ja1xuICAgICAgICAgICAgY29sdW1uLnB1c2goTmFOKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgciA9IDAsIHMgPSBjb2x1bW4ubGVuZ3RoOyByIDwgczsgcisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdpZHRoID0gY29sdW1uW3JdO1xuICAgICAgICAgICAgICAgIGlmIChzdGFydGluZ05ld0Jsb2NrKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrU3RhcnRSb3cgPSByO1xuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0aW5nTmV3QmxvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKHdpZHRoKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBibG9jayBlbmRlZFxuICAgICAgICAgICAgICAgICAgICBibG9ja0VuZFJvdyA9IHI7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IGJsb2NrU3RhcnRSb3c7IGogPCBibG9ja0VuZFJvdzsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsV2lkdGhzW2pdW2NdID0gbWF4V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3RhcnRpbmdOZXdCbG9jayA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbWF4V2lkdGggPSBNYXRoLm1heChtYXhXaWR0aCwgd2lkdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNlbGxXaWR0aHM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJbXX0gc2VsZWN0aW9uQ29sdW1uc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBjZWxsUmlnaHRFZGdlXG4gICAgICogQHJldHVybnMge251bWJlcn1cbiAgICAgKi9cbiAgICAkcmlnaHRtb3N0U2VsZWN0aW9uSW5DZWxsKHNlbGVjdGlvbkNvbHVtbnMsIGNlbGxSaWdodEVkZ2UpIHtcbiAgICAgICAgdmFyIHJpZ2h0bW9zdCA9IDA7XG5cbiAgICAgICAgaWYgKHNlbGVjdGlvbkNvbHVtbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIgbGVuZ3RocyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgcyA9IDAsIGxlbmd0aCA9IHNlbGVjdGlvbkNvbHVtbnMubGVuZ3RoOyBzIDwgbGVuZ3RoOyBzKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0aW9uQ29sdW1uc1tzXSA8PSBjZWxsUmlnaHRFZGdlKVxuICAgICAgICAgICAgICAgICAgICBsZW5ndGhzLnB1c2gocyk7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBsZW5ndGhzLnB1c2goMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByaWdodG1vc3QgPSBNYXRoLm1heC5hcHBseShNYXRoLCBsZW5ndGhzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByaWdodG1vc3Q7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHJvd1xuICAgICAqIEByZXR1cm5zIHtudW1iZXJbXX1cbiAgICAgKi9cbiAgICAkdGFic0ZvclJvdyhyb3cpIHtcbiAgICAgICAgdmFyIHJvd1RhYnMgPSBbXSwgbGluZSA9IHRoaXMuJGVkaXRvci5zZXNzaW9uLmdldExpbmUocm93KSxcbiAgICAgICAgICAgIHJlID0gL1xcdC9nLCBtYXRjaDtcblxuICAgICAgICB3aGlsZSAoKG1hdGNoID0gcmUuZXhlYyhsaW5lKSkgIT0gbnVsbCkge1xuICAgICAgICAgICAgcm93VGFicy5wdXNoKG1hdGNoLmluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByb3dUYWJzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSByb3dcbiAgICAgKiBAcGFyYW0ge251bWJlcltdfSB3aWR0aHNcbiAgICAgKi9cbiAgICAkYWRqdXN0Um93KHJvdywgd2lkdGhzKSB7XG4gICAgICAgIHZhciByb3dUYWJzID0gdGhpcy4kdGFic0ZvclJvdyhyb3cpO1xuXG4gICAgICAgIGlmIChyb3dUYWJzLmxlbmd0aCA9PSAwKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBiaWFzID0gMCwgbG9jYXRpb24gPSAtMTtcblxuICAgICAgICAvLyB0aGlzIGFsd2F5cyBvbmx5IGNvbnRhaW5zIHR3byBlbGVtZW50cywgc28gd2UncmUgc2FmZSBpbiB0aGUgbG9vcCBiZWxvd1xuICAgICAgICB2YXIgZXhwYW5kZWRTZXQgPSB0aGlzLiRpemlwKHdpZHRocywgcm93VGFicyk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBleHBhbmRlZFNldC5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB3ID0gZXhwYW5kZWRTZXRbaV1bMF0sIGl0ID0gZXhwYW5kZWRTZXRbaV1bMV07XG4gICAgICAgICAgICBsb2NhdGlvbiArPSAxICsgdztcbiAgICAgICAgICAgIGl0ICs9IGJpYXM7XG4gICAgICAgICAgICB2YXIgZGlmZmVyZW5jZSA9IGxvY2F0aW9uIC0gaXQ7XG5cbiAgICAgICAgICAgIGlmIChkaWZmZXJlbmNlID09IDApXG4gICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgIHZhciBwYXJ0aWFsTGluZSA9IHRoaXMuJGVkaXRvci5zZXNzaW9uLmdldExpbmUocm93KS5zdWJzdHIoMCwgaXQgKTtcbiAgICAgICAgICAgIHZhciBzdHJpcHBlZFBhcnRpYWxMaW5lID0gcGFydGlhbExpbmUucmVwbGFjZSgvXFxzKiQvZywgXCJcIik7XG4gICAgICAgICAgICB2YXIgaXNwYWNlcyA9IHBhcnRpYWxMaW5lLmxlbmd0aCAtIHN0cmlwcGVkUGFydGlhbExpbmUubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAoZGlmZmVyZW5jZSA+IDApIHtcbiAgICAgICAgICAgICAgICAvLyBwdXQgdGhlIHNwYWNlcyBhZnRlciB0aGUgdGFiIGFuZCB0aGVuIGRlbGV0ZSB0aGUgdGFiLCBzbyBhbnkgaW5zZXJ0aW9uXG4gICAgICAgICAgICAgICAgLy8gcG9pbnRzIGJlaGF2ZSBhcyBleHBlY3RlZFxuICAgICAgICAgICAgICAgIHRoaXMuJGVkaXRvci5zZXNzaW9uLmdldERvY3VtZW50KCkuaW5zZXJ0SW5MaW5lKHtyb3c6IHJvdywgY29sdW1uOiBpdCArIDF9LCBBcnJheShkaWZmZXJlbmNlICsgMSkuam9pbihcIiBcIikgKyBcIlxcdFwiKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRlZGl0b3Iuc2Vzc2lvbi5nZXREb2N1bWVudCgpLnJlbW92ZUluTGluZShyb3csIGl0LCBpdCArIDEpO1xuXG4gICAgICAgICAgICAgICAgYmlhcyArPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZGlmZmVyZW5jZSA8IDAgJiYgaXNwYWNlcyA+PSAtZGlmZmVyZW5jZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVkaXRvci5zZXNzaW9uLmdldERvY3VtZW50KCkucmVtb3ZlSW5MaW5lKHJvdywgaXQgKyBkaWZmZXJlbmNlLCBpdCk7XG4gICAgICAgICAgICAgICAgYmlhcyArPSBkaWZmZXJlbmNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIGlzIGEgKG5haXZlKSBQeXRob24gcG9ydC0tYnV0IHdvcmtzIGZvciB0aGVzZSBwdXJwb3Nlc1xuICAgICAqIEBwYXJhbSB7YW55W11bXX0gaXRlcmFibGVzXG4gICAgICovXG4gICAgJGl6aXBfbG9uZ2VzdChpdGVyYWJsZXMpIHtcbiAgICAgICAgaWYgKCFpdGVyYWJsZXNbMF0pXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIHZhciBsb25nZXN0ID0gaXRlcmFibGVzWzBdLmxlbmd0aDtcbiAgICAgICAgdmFyIGl0ZXJhYmxlc0xlbmd0aCA9IGl0ZXJhYmxlcy5sZW5ndGg7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBpdGVyYWJsZXNMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGlMZW5ndGggPSBpdGVyYWJsZXNbaV0ubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGlMZW5ndGggPiBsb25nZXN0KVxuICAgICAgICAgICAgICAgIGxvbmdlc3QgPSBpTGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGV4cGFuZGVkU2V0ID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgbCA9IDA7IGwgPCBsb25nZXN0OyBsKyspIHtcbiAgICAgICAgICAgIHZhciBzZXQgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlcmFibGVzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaXRlcmFibGVzW2ldW2xdID09PSBcIlwiKVxuICAgICAgICAgICAgICAgICAgICBzZXQucHVzaChOYU4pO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgc2V0LnB1c2goaXRlcmFibGVzW2ldW2xdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXhwYW5kZWRTZXQucHVzaChzZXQpO1xuICAgICAgICB9XG5cblxuICAgICAgICByZXR1cm4gZXhwYW5kZWRTZXQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogYW4gZXZlbiBtb3JlIChuYWl2ZSkgUHl0aG9uIHBvcnRcbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IGFueVtdfSB3aWR0aHNcbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IGFueVtdfSB0YWJzXG4gICAgICovXG4gICAgJGl6aXAod2lkdGhzLCB0YWJzKSB7XG4gICAgICAgIC8vIGdyYWIgdGhlIHNob3J0ZXIgc2l6ZVxuICAgICAgICB2YXIgc2l6ZSA9IHdpZHRocy5sZW5ndGggPj0gdGFicy5sZW5ndGggPyB0YWJzLmxlbmd0aCA6IHdpZHRocy5sZW5ndGg7XG5cbiAgICAgICAgdmFyIGV4cGFuZGVkU2V0ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgc2V0ID0gWyB3aWR0aHNbaV0sIHRhYnNbaV0gXTtcbiAgICAgICAgICAgIGV4cGFuZGVkU2V0LnB1c2goc2V0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXhwYW5kZWRTZXQ7XG4gICAgfVxuXG59XG5cbmV4cG9ydHMuRWxhc3RpY1RhYnN0b3BzTGl0ZSA9IEVsYXN0aWNUYWJzdG9wc0xpdGU7XG5cbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi4vZWRpdG9yXCIpLkVkaXRvcjtcbnJlcXVpcmUoXCIuLi9jb25maWdcIikuZGVmaW5lT3B0aW9ucyhFZGl0b3IucHJvdG90eXBlLCBcImVkaXRvclwiLCB7XG4gICAgdXNlRWxhc3RpY1RhYnN0b3BzOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZhbFxuICAgICAgICAgKiBAdGhpcyB7RWRpdG9yfVxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZWxhc3RpY1RhYnN0b3BzKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVsYXN0aWNUYWJzdG9wcyA9IG5ldyBFbGFzdGljVGFic3RvcHNMaXRlKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZHMub24oXCJhZnRlckV4ZWNcIiwgdGhpcy5lbGFzdGljVGFic3RvcHMub25BZnRlckV4ZWMpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZHMub24oXCJleGVjXCIsIHRoaXMuZWxhc3RpY1RhYnN0b3BzLm9uRXhlYyk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbihcImNoYW5nZVwiLCB0aGlzLmVsYXN0aWNUYWJzdG9wcy5vbkNoYW5nZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuZWxhc3RpY1RhYnN0b3BzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kcy5yZW1vdmVMaXN0ZW5lcihcImFmdGVyRXhlY1wiLCB0aGlzLmVsYXN0aWNUYWJzdG9wcy5vbkFmdGVyRXhlYyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kcy5yZW1vdmVMaXN0ZW5lcihcImV4ZWNcIiwgdGhpcy5lbGFzdGljVGFic3RvcHMub25FeGVjKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKFwiY2hhbmdlXCIsIHRoaXMuZWxhc3RpY1RhYnN0b3BzLm9uQ2hhbmdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9