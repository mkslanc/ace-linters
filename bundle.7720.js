"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7720],{

/***/ 37720:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



class ElasticTabstopsLite {
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

    $selectionColumnsForRow(row) {
        var selections = [], cursor = this.$editor.getCursorPosition();
        if (this.$editor.session.getSelection().isEmpty()) {
            // todo: support multicursor
            if (row == cursor.row)
                selections.push(cursor.column);
        }

        return selections;
    }

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

    $tabsForRow(row) {
        var rowTabs = [], line = this.$editor.session.getLine(row),
            re = /\t/g, match;

        while ((match = re.exec(line)) != null) {
            rowTabs.push(match.index);
        }

        return rowTabs;
    }

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

    // the is a (naive) Python port--but works for these purposes
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

    // an even more (naive) Python port
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjc3MjAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdEQUFnRCxjQUFjO0FBQzlEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLG1EQUFtRCxPQUFPO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZDQUE2QyxZQUFZO0FBQ3pEOztBQUVBLCtDQUErQyxTQUFTO0FBQ3hEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwrQ0FBK0MsT0FBTztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLCtDQUErQyxPQUFPO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnREFBZ0QsaUJBQWlCO0FBQ2pFO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDhEQUE4RCxZQUFZO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLGdEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSx5QkFBeUI7QUFDMUY7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHdCQUF3QixxQkFBcUI7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsd0JBQXdCLGFBQWE7QUFDckM7QUFDQSw0QkFBNEIscUJBQXFCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QixVQUFVO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsMkJBQTJCOztBQUUzQixhQUFhLDRDQUEyQjtBQUN4QywwQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L2VsYXN0aWNfdGFic3RvcHNfbGl0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuY2xhc3MgRWxhc3RpY1RhYnN0b3BzTGl0ZSB7XG4gICAgY29uc3RydWN0b3IoZWRpdG9yKSB7XG4gICAgICAgIHRoaXMuJGVkaXRvciA9IGVkaXRvcjtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB2YXIgY2hhbmdlZFJvd3MgPSBbXTtcbiAgICAgICAgdmFyIHJlY29yZENoYW5nZXMgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vbkFmdGVyRXhlYyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVjb3JkQ2hhbmdlcyA9IGZhbHNlO1xuICAgICAgICAgICAgc2VsZi5wcm9jZXNzUm93cyhjaGFuZ2VkUm93cyk7XG4gICAgICAgICAgICBjaGFuZ2VkUm93cyA9IFtdO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLm9uRXhlYyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmVjb3JkQ2hhbmdlcyA9IHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMub25DaGFuZ2UgPSBmdW5jdGlvbihkZWx0YSkge1xuICAgICAgICAgICAgaWYgKHJlY29yZENoYW5nZXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoY2hhbmdlZFJvd3MuaW5kZXhPZihkZWx0YS5zdGFydC5yb3cpID09IC0xKVxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkUm93cy5wdXNoKGRlbHRhLnN0YXJ0LnJvdyk7XG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhLmVuZC5yb3cgIT0gZGVsdGEuc3RhcnQucm93KVxuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkUm93cy5wdXNoKGRlbHRhLmVuZC5yb3cpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cbiAgICBcbiAgICBwcm9jZXNzUm93cyhyb3dzKSB7XG4gICAgICAgIHRoaXMuJGluQ2hhbmdlID0gdHJ1ZTtcbiAgICAgICAgdmFyIGNoZWNrZWRSb3dzID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgciA9IDAsIHJvd0NvdW50ID0gcm93cy5sZW5ndGg7IHIgPCByb3dDb3VudDsgcisrKSB7XG4gICAgICAgICAgICB2YXIgcm93ID0gcm93c1tyXTtcblxuICAgICAgICAgICAgaWYgKGNoZWNrZWRSb3dzLmluZGV4T2Yocm93KSA+IC0xKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICB2YXIgY2VsbFdpZHRoT2JqID0gdGhpcy4kZmluZENlbGxXaWR0aHNGb3JCbG9jayhyb3cpO1xuICAgICAgICAgICAgdmFyIGNlbGxXaWR0aHMgPSB0aGlzLiRzZXRCbG9ja0NlbGxXaWR0aHNUb01heChjZWxsV2lkdGhPYmouY2VsbFdpZHRocyk7XG4gICAgICAgICAgICB2YXIgcm93SW5kZXggPSBjZWxsV2lkdGhPYmouZmlyc3RSb3c7XG5cbiAgICAgICAgICAgIGZvciAodmFyIHcgPSAwLCBsID0gY2VsbFdpZHRocy5sZW5ndGg7IHcgPCBsOyB3KyspIHtcbiAgICAgICAgICAgICAgICB2YXIgd2lkdGhzID0gY2VsbFdpZHRoc1t3XTtcbiAgICAgICAgICAgICAgICBjaGVja2VkUm93cy5wdXNoKHJvd0luZGV4KTtcbiAgICAgICAgICAgICAgICB0aGlzLiRhZGp1c3RSb3cocm93SW5kZXgsIHdpZHRocyk7XG4gICAgICAgICAgICAgICAgcm93SW5kZXgrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRpbkNoYW5nZSA9IGZhbHNlO1xuICAgIH1cblxuICAgICRmaW5kQ2VsbFdpZHRoc0ZvckJsb2NrKHJvdykge1xuICAgICAgICB2YXIgY2VsbFdpZHRocyA9IFtdLCB3aWR0aHM7XG5cbiAgICAgICAgLy8gc3RhcnRpbmcgcm93IGFuZCBiYWNrd2FyZFxuICAgICAgICB2YXIgcm93SXRlciA9IHJvdztcbiAgICAgICAgd2hpbGUgKHJvd0l0ZXIgPj0gMCkge1xuICAgICAgICAgICAgd2lkdGhzID0gdGhpcy4kY2VsbFdpZHRoc0ZvclJvdyhyb3dJdGVyKTtcbiAgICAgICAgICAgIGlmICh3aWR0aHMubGVuZ3RoID09IDApXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNlbGxXaWR0aHMudW5zaGlmdCh3aWR0aHMpO1xuICAgICAgICAgICAgcm93SXRlci0tO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmaXJzdFJvdyA9IHJvd0l0ZXIgKyAxO1xuXG4gICAgICAgIC8vIGZvcndhcmQgKG5vdCBpbmNsdWRpbmcgc3RhcnRpbmcgcm93KVxuICAgICAgICByb3dJdGVyID0gcm93O1xuICAgICAgICB2YXIgbnVtUm93cyA9IHRoaXMuJGVkaXRvci5zZXNzaW9uLmdldExlbmd0aCgpO1xuXG4gICAgICAgIHdoaWxlIChyb3dJdGVyIDwgbnVtUm93cyAtIDEpIHtcbiAgICAgICAgICAgIHJvd0l0ZXIrKztcblxuICAgICAgICAgICAgd2lkdGhzID0gdGhpcy4kY2VsbFdpZHRoc0ZvclJvdyhyb3dJdGVyKTtcbiAgICAgICAgICAgIGlmICh3aWR0aHMubGVuZ3RoID09IDApXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNlbGxXaWR0aHMucHVzaCh3aWR0aHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgY2VsbFdpZHRoczogY2VsbFdpZHRocywgZmlyc3RSb3c6IGZpcnN0Um93IH07XG4gICAgfVxuXG4gICAgJGNlbGxXaWR0aHNGb3JSb3cocm93KSB7XG4gICAgICAgIHZhciBzZWxlY3Rpb25Db2x1bW5zID0gdGhpcy4kc2VsZWN0aW9uQ29sdW1uc0ZvclJvdyhyb3cpO1xuICAgICAgICAvLyB0b2RvOiBzdXBwb3J0IG11bHRpY3Vyc29yXG5cbiAgICAgICAgdmFyIHRhYnMgPSBbLTFdLmNvbmNhdCh0aGlzLiR0YWJzRm9yUm93KHJvdykpO1xuICAgICAgICB2YXIgd2lkdGhzID0gdGFicy5tYXAoZnVuY3Rpb24oZWwpIHsgcmV0dXJuIDA7IH0gKS5zbGljZSgxKTtcbiAgICAgICAgdmFyIGxpbmUgPSB0aGlzLiRlZGl0b3Iuc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IHRhYnMubGVuZ3RoIC0gMTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgbGVmdEVkZ2UgPSB0YWJzW2ldKzE7XG4gICAgICAgICAgICB2YXIgcmlnaHRFZGdlID0gdGFic1tpKzFdO1xuXG4gICAgICAgICAgICB2YXIgcmlnaHRtb3N0U2VsZWN0aW9uID0gdGhpcy4kcmlnaHRtb3N0U2VsZWN0aW9uSW5DZWxsKHNlbGVjdGlvbkNvbHVtbnMsIHJpZ2h0RWRnZSk7XG4gICAgICAgICAgICB2YXIgY2VsbCA9IGxpbmUuc3Vic3RyaW5nKGxlZnRFZGdlLCByaWdodEVkZ2UpO1xuICAgICAgICAgICAgd2lkdGhzW2ldID0gTWF0aC5tYXgoY2VsbC5yZXBsYWNlKC9cXHMrJC9nLCcnKS5sZW5ndGgsIHJpZ2h0bW9zdFNlbGVjdGlvbiAtIGxlZnRFZGdlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB3aWR0aHM7XG4gICAgfVxuXG4gICAgJHNlbGVjdGlvbkNvbHVtbnNGb3JSb3cocm93KSB7XG4gICAgICAgIHZhciBzZWxlY3Rpb25zID0gW10sIGN1cnNvciA9IHRoaXMuJGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICBpZiAodGhpcy4kZWRpdG9yLnNlc3Npb24uZ2V0U2VsZWN0aW9uKCkuaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICAvLyB0b2RvOiBzdXBwb3J0IG11bHRpY3Vyc29yXG4gICAgICAgICAgICBpZiAocm93ID09IGN1cnNvci5yb3cpXG4gICAgICAgICAgICAgICAgc2VsZWN0aW9ucy5wdXNoKGN1cnNvci5jb2x1bW4pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbnM7XG4gICAgfVxuXG4gICAgJHNldEJsb2NrQ2VsbFdpZHRoc1RvTWF4KGNlbGxXaWR0aHMpIHtcbiAgICAgICAgdmFyIHN0YXJ0aW5nTmV3QmxvY2sgPSB0cnVlLCBibG9ja1N0YXJ0Um93LCBibG9ja0VuZFJvdywgbWF4V2lkdGg7XG4gICAgICAgIHZhciBjb2x1bW5JbmZvID0gdGhpcy4kaXppcF9sb25nZXN0KGNlbGxXaWR0aHMpO1xuXG4gICAgICAgIGZvciAodmFyIGMgPSAwLCBsID0gY29sdW1uSW5mby5sZW5ndGg7IGMgPCBsOyBjKyspIHtcbiAgICAgICAgICAgIHZhciBjb2x1bW4gPSBjb2x1bW5JbmZvW2NdO1xuICAgICAgICAgICAgaWYgKCFjb2x1bW4ucHVzaCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoY29sdW1uKTtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGFkZCBhbiBleHRyYSBOb25lIHRvIHRoZSBlbmQgc28gdGhhdCB0aGUgZW5kIG9mIHRoZSBjb2x1bW4gYXV0b21hdGljYWxseVxuICAgICAgICAgICAgLy8gZmluaXNoZXMgYSBibG9ja1xuICAgICAgICAgICAgY29sdW1uLnB1c2goTmFOKTtcblxuICAgICAgICAgICAgZm9yICh2YXIgciA9IDAsIHMgPSBjb2x1bW4ubGVuZ3RoOyByIDwgczsgcisrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHdpZHRoID0gY29sdW1uW3JdO1xuICAgICAgICAgICAgICAgIGlmIChzdGFydGluZ05ld0Jsb2NrKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrU3RhcnRSb3cgPSByO1xuICAgICAgICAgICAgICAgICAgICBtYXhXaWR0aCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0aW5nTmV3QmxvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKHdpZHRoKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBibG9jayBlbmRlZFxuICAgICAgICAgICAgICAgICAgICBibG9ja0VuZFJvdyA9IHI7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaiA9IGJsb2NrU3RhcnRSb3c7IGogPCBibG9ja0VuZFJvdzsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZWxsV2lkdGhzW2pdW2NdID0gbWF4V2lkdGg7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc3RhcnRpbmdOZXdCbG9jayA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbWF4V2lkdGggPSBNYXRoLm1heChtYXhXaWR0aCwgd2lkdGgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNlbGxXaWR0aHM7XG4gICAgfVxuXG4gICAgJHJpZ2h0bW9zdFNlbGVjdGlvbkluQ2VsbChzZWxlY3Rpb25Db2x1bW5zLCBjZWxsUmlnaHRFZGdlKSB7XG4gICAgICAgIHZhciByaWdodG1vc3QgPSAwO1xuXG4gICAgICAgIGlmIChzZWxlY3Rpb25Db2x1bW5zLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIGxlbmd0aHMgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIHMgPSAwLCBsZW5ndGggPSBzZWxlY3Rpb25Db2x1bW5zLmxlbmd0aDsgcyA8IGxlbmd0aDsgcysrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGlvbkNvbHVtbnNbc10gPD0gY2VsbFJpZ2h0RWRnZSlcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3Rocy5wdXNoKHMpO1xuICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgbGVuZ3Rocy5wdXNoKDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmlnaHRtb3N0ID0gTWF0aC5tYXguYXBwbHkoTWF0aCwgbGVuZ3Rocyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmlnaHRtb3N0O1xuICAgIH1cblxuICAgICR0YWJzRm9yUm93KHJvdykge1xuICAgICAgICB2YXIgcm93VGFicyA9IFtdLCBsaW5lID0gdGhpcy4kZWRpdG9yLnNlc3Npb24uZ2V0TGluZShyb3cpLFxuICAgICAgICAgICAgcmUgPSAvXFx0L2csIG1hdGNoO1xuXG4gICAgICAgIHdoaWxlICgobWF0Y2ggPSByZS5leGVjKGxpbmUpKSAhPSBudWxsKSB7XG4gICAgICAgICAgICByb3dUYWJzLnB1c2gobWF0Y2guaW5kZXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJvd1RhYnM7XG4gICAgfVxuXG4gICAgJGFkanVzdFJvdyhyb3csIHdpZHRocykge1xuICAgICAgICB2YXIgcm93VGFicyA9IHRoaXMuJHRhYnNGb3JSb3cocm93KTtcblxuICAgICAgICBpZiAocm93VGFicy5sZW5ndGggPT0gMClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgYmlhcyA9IDAsIGxvY2F0aW9uID0gLTE7XG5cbiAgICAgICAgLy8gdGhpcyBhbHdheXMgb25seSBjb250YWlucyB0d28gZWxlbWVudHMsIHNvIHdlJ3JlIHNhZmUgaW4gdGhlIGxvb3AgYmVsb3dcbiAgICAgICAgdmFyIGV4cGFuZGVkU2V0ID0gdGhpcy4kaXppcCh3aWR0aHMsIHJvd1RhYnMpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsID0gZXhwYW5kZWRTZXQubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdyA9IGV4cGFuZGVkU2V0W2ldWzBdLCBpdCA9IGV4cGFuZGVkU2V0W2ldWzFdO1xuICAgICAgICAgICAgbG9jYXRpb24gKz0gMSArIHc7XG4gICAgICAgICAgICBpdCArPSBiaWFzO1xuICAgICAgICAgICAgdmFyIGRpZmZlcmVuY2UgPSBsb2NhdGlvbiAtIGl0O1xuXG4gICAgICAgICAgICBpZiAoZGlmZmVyZW5jZSA9PSAwKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICB2YXIgcGFydGlhbExpbmUgPSB0aGlzLiRlZGl0b3Iuc2Vzc2lvbi5nZXRMaW5lKHJvdykuc3Vic3RyKDAsIGl0ICk7XG4gICAgICAgICAgICB2YXIgc3RyaXBwZWRQYXJ0aWFsTGluZSA9IHBhcnRpYWxMaW5lLnJlcGxhY2UoL1xccyokL2csIFwiXCIpO1xuICAgICAgICAgICAgdmFyIGlzcGFjZXMgPSBwYXJ0aWFsTGluZS5sZW5ndGggLSBzdHJpcHBlZFBhcnRpYWxMaW5lLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKGRpZmZlcmVuY2UgPiAwKSB7XG4gICAgICAgICAgICAgICAgLy8gcHV0IHRoZSBzcGFjZXMgYWZ0ZXIgdGhlIHRhYiBhbmQgdGhlbiBkZWxldGUgdGhlIHRhYiwgc28gYW55IGluc2VydGlvblxuICAgICAgICAgICAgICAgIC8vIHBvaW50cyBiZWhhdmUgYXMgZXhwZWN0ZWRcbiAgICAgICAgICAgICAgICB0aGlzLiRlZGl0b3Iuc2Vzc2lvbi5nZXREb2N1bWVudCgpLmluc2VydEluTGluZSh7cm93OiByb3csIGNvbHVtbjogaXQgKyAxfSwgQXJyYXkoZGlmZmVyZW5jZSArIDEpLmpvaW4oXCIgXCIpICsgXCJcXHRcIik7XG4gICAgICAgICAgICAgICAgdGhpcy4kZWRpdG9yLnNlc3Npb24uZ2V0RG9jdW1lbnQoKS5yZW1vdmVJbkxpbmUocm93LCBpdCwgaXQgKyAxKTtcblxuICAgICAgICAgICAgICAgIGJpYXMgKz0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGRpZmZlcmVuY2UgPCAwICYmIGlzcGFjZXMgPj0gLWRpZmZlcmVuY2UpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlZGl0b3Iuc2Vzc2lvbi5nZXREb2N1bWVudCgpLnJlbW92ZUluTGluZShyb3csIGl0ICsgZGlmZmVyZW5jZSwgaXQpO1xuICAgICAgICAgICAgICAgIGJpYXMgKz0gZGlmZmVyZW5jZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHRoZSBpcyBhIChuYWl2ZSkgUHl0aG9uIHBvcnQtLWJ1dCB3b3JrcyBmb3IgdGhlc2UgcHVycG9zZXNcbiAgICAkaXppcF9sb25nZXN0KGl0ZXJhYmxlcykge1xuICAgICAgICBpZiAoIWl0ZXJhYmxlc1swXSlcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgdmFyIGxvbmdlc3QgPSBpdGVyYWJsZXNbMF0ubGVuZ3RoO1xuICAgICAgICB2YXIgaXRlcmFibGVzTGVuZ3RoID0gaXRlcmFibGVzLmxlbmd0aDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGl0ZXJhYmxlc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaUxlbmd0aCA9IGl0ZXJhYmxlc1tpXS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoaUxlbmd0aCA+IGxvbmdlc3QpXG4gICAgICAgICAgICAgICAgbG9uZ2VzdCA9IGlMZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZXhwYW5kZWRTZXQgPSBbXTtcblxuICAgICAgICBmb3IgKHZhciBsID0gMDsgbCA8IGxvbmdlc3Q7IGwrKykge1xuICAgICAgICAgICAgdmFyIHNldCA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVyYWJsZXNMZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChpdGVyYWJsZXNbaV1bbF0gPT09IFwiXCIpXG4gICAgICAgICAgICAgICAgICAgIHNldC5wdXNoKE5hTik7XG4gICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICBzZXQucHVzaChpdGVyYWJsZXNbaV1bbF0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBleHBhbmRlZFNldC5wdXNoKHNldCk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIHJldHVybiBleHBhbmRlZFNldDtcbiAgICB9XG5cbiAgICAvLyBhbiBldmVuIG1vcmUgKG5haXZlKSBQeXRob24gcG9ydFxuICAgICRpemlwKHdpZHRocywgdGFicykge1xuICAgICAgICAvLyBncmFiIHRoZSBzaG9ydGVyIHNpemVcbiAgICAgICAgdmFyIHNpemUgPSB3aWR0aHMubGVuZ3RoID49IHRhYnMubGVuZ3RoID8gdGFicy5sZW5ndGggOiB3aWR0aHMubGVuZ3RoO1xuXG4gICAgICAgIHZhciBleHBhbmRlZFNldCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7IGkrKykge1xuICAgICAgICAgICAgdmFyIHNldCA9IFsgd2lkdGhzW2ldLCB0YWJzW2ldIF07XG4gICAgICAgICAgICBleHBhbmRlZFNldC5wdXNoKHNldCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4cGFuZGVkU2V0O1xuICAgIH1cblxufVxuXG5leHBvcnRzLkVsYXN0aWNUYWJzdG9wc0xpdGUgPSBFbGFzdGljVGFic3RvcHNMaXRlO1xuXG52YXIgRWRpdG9yID0gcmVxdWlyZShcIi4uL2VkaXRvclwiKS5FZGl0b3I7XG5yZXF1aXJlKFwiLi4vY29uZmlnXCIpLmRlZmluZU9wdGlvbnMoRWRpdG9yLnByb3RvdHlwZSwgXCJlZGl0b3JcIiwge1xuICAgIHVzZUVsYXN0aWNUYWJzdG9wczoge1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5lbGFzdGljVGFic3RvcHMpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWxhc3RpY1RhYnN0b3BzID0gbmV3IEVsYXN0aWNUYWJzdG9wc0xpdGUodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kcy5vbihcImFmdGVyRXhlY1wiLCB0aGlzLmVsYXN0aWNUYWJzdG9wcy5vbkFmdGVyRXhlYyk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kcy5vbihcImV4ZWNcIiwgdGhpcy5lbGFzdGljVGFic3RvcHMub25FeGVjKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uKFwiY2hhbmdlXCIsIHRoaXMuZWxhc3RpY1RhYnN0b3BzLm9uQ2hhbmdlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5lbGFzdGljVGFic3RvcHMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLnJlbW92ZUxpc3RlbmVyKFwiYWZ0ZXJFeGVjXCIsIHRoaXMuZWxhc3RpY1RhYnN0b3BzLm9uQWZ0ZXJFeGVjKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLnJlbW92ZUxpc3RlbmVyKFwiZXhlY1wiLCB0aGlzLmVsYXN0aWNUYWJzdG9wcy5vbkV4ZWMpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoXCJjaGFuZ2VcIiwgdGhpcy5lbGFzdGljVGFic3RvcHMub25DaGFuZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=