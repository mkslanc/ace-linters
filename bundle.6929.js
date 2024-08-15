"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[6929],{

/***/ 93887:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);

var FoldMode = exports.l = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    
    this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
    
    //prevent naming conflict with any modes that inherit from cstyle and override this (like csharp)
    this._getFoldWidgetBase = this.getFoldWidget;
    
    /**
     * Gets fold widget with some non-standard extras:
     *
     * @example lineCommentRegionStart
     *      //#region [optional description]
     *
     * @example blockCommentRegionStart
     *      /*#region [optional description] *[/]
     *
     * @example tripleStarFoldingSection
     *      /*** this folds even though 1 line because it has 3 stars ***[/]
     * 
     * @note the pound symbol for region tags is optional
     */
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
    
        if (this.singleLineBlockCommentRe.test(line)) {
            // No widget for single line block comment unless region or triple star
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
    
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart
    
        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        
        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);
        
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };
    
    /**
     * gets comment region block with end region assumed to be start of comment in any cstyle mode or SQL mode (--) which inherits from this.
     * There may optionally be a pound symbol before the region/endregion statement
     */
    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        
        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 56929:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var HjsonHighlightRules = (__webpack_require__(21302)/* .HjsonHighlightRules */ .E);
var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = HjsonHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "//";
    this.blockComment = { start: "/*", end: "*/" };
    this.$id = "ace/mode/hjson";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 21302:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* This file was autogenerated from Hjson.tmLanguage (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var HjsonHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        start: [{
            include: "#comments"
        }, {
            include: "#rootObject"
        }, {
            include: "#value"
        }],
        "#array": [{
            token: "paren.lparen",
            regex: /\[/,
            push: [{
                token: "paren.rparen",
                regex: /\]/,
                next: "pop"
            }, {
                include: "#value"
            }, {
                include: "#comments"
            }, {
                token: "text",
                regex: /,|$/
            }, {
                token: "invalid.illegal",
                regex: /[^\s\]]/
            }, {
                defaultToken: "array"
            }]
        }],
        "#comments": [{
            token: [
                "comment.punctuation",
                "comment.line"
            ],
            regex: /(#)(.*$)/
        }, {
            token: "comment.punctuation",
            regex: /\/\*/,
            push: [{
                token: "comment.punctuation",
                regex: /\*\//,
                next: "pop"
            }, {
                defaultToken: "comment.block"
            }]
        }, {
            token: [
                "comment.punctuation",
                "comment.line"
            ],
            regex: /(\/\/)(.*$)/
        }],
        "#constant": [{
            token: "constant",
            regex: /\b(?:true|false|null)\b/
        }],
        "#keyname": [{
            token: "keyword",
            regex: /(?:[^,\{\[\}\]\s]+|"(?:[^"\\]|\\.)*")\s*(?=:)/
        }],
        "#mstring": [{
            token: "string",
            regex: /'''/,
            push: [{
                token: "string",
                regex: /'''/,
                next: "pop"
            }, {
                defaultToken: "string"
            }]
        }],
        "#number": [{
            token: "constant.numeric",
            regex: /-?(?:0|[1-9]\d*)(?:(?:\.\d+)?(?:[eE][+-]?\d+)?)?/,
            comment: "handles integer and decimal numbers"
        }],
        "#object": [{
            token: "paren.lparen",
            regex: /\{/,
            push: [{
                token: "paren.rparen",
                regex: /\}/,
                next: "pop"
            }, {
                include: "#keyname"
            }, {
                include: "#value"
            }, {
                token: "text",
                regex: /:/
            }, {
                token: "text",
                regex: /,/
            }, {
                defaultToken: "paren"
            }]
        }],
        "#rootObject": [{
            token: "paren",
            regex: /(?=\s*(?:[^,\{\[\}\]\s]+|"(?:[^"\\]|\\.)*")\s*:)/,
            push: [{
                token: "paren.rparen",
                regex: /---none---/,
                next: "pop"
            }, {
                include: "#keyname"
            }, {
                include: "#value"
            }, {
                token: "text",
                regex: /:/
            }, {
                token: "text",
                regex: /,/
            }, {
                defaultToken: "paren"
            }]
        }],
        "#string": [{
            token: "string",
            regex: /"/,
            push: [{
                token: "string",
                regex: /"/,
                next: "pop"
            }, {
                token: "constant.language.escape",
                regex: /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/
            }, {
                token: "invalid.illegal",
                regex: /\\./
            }, {
                defaultToken: "string"
            }]
        }],
        "#ustring": [{
            token: "string",
            regex: /\b[^:,0-9\-\{\[\}\]\s].*$/
        }],
        "#value": [{
            include: "#constant"
        }, {
            include: "#number"
        }, {
            include: "#string"
        }, {
            include: "#array"
        }, {
            include: "#object"
        }, {
            include: "#comments"
        }, {
            include: "#mstring"
        }, {
            include: "#ustring"
        }]
    };

    this.normalizeRules();
};

HjsonHighlightRules.metaData = {
    fileTypes: ["hjson"],
    foldingStartMarker: "(?x:     # turn on extended mode\n              ^    # a line beginning with\n              \\s*    # some optional space\n              [{\\[]  # the start of an object or array\n              (?!    # but not followed by\n              .*   # whatever\n              [}\\]]  # and the close of an object or array\n              ,?   # an optional comma\n              \\s*  # some optional space\n              $    # at the end of the line\n              )\n              |    # ...or...\n              [{\\[]  # the start of an object or array\n              \\s*    # some optional space\n              $    # at the end of the line\n            )",
    foldingStopMarker: "(?x:   # turn on extended mode\n             ^    # a line beginning with\n             \\s*  # some optional space\n             [}\\]]  # and the close of an object or array\n             )",
    keyEquivalent: "^~J",
    name: "Hjson",
    scopeName: "source.hjson"
};


oop.inherits(HjsonHighlightRules, TextHighlightRules);

exports.E = HjsonHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLGtDQUFrQyxJQUFJO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSx1REFBdUQsRUFBRTtBQUN6RCxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLGlDQUFpQyxJQUFJO0FBQ3JDLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG9LQUFvSyxvSUFBb0ksNk9BQTZPO0FBQ3JoQiw0SkFBNEo7QUFDNUo7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLFNBQTJCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2NzdHlsZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2hqc29uLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvaGpzb25faGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBIanNvbkhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vaGpzb25faGlnaGxpZ2h0X3J1bGVzXCIpLkhqc29uSGlnaGxpZ2h0UnVsZXM7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gSGpzb25IaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBGb2xkTW9kZSgpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi8vXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7IHN0YXJ0OiBcIi8qXCIsIGVuZDogXCIqL1wiIH07XG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2hqc29uXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIi8qIFRoaXMgZmlsZSB3YXMgYXV0b2dlbmVyYXRlZCBmcm9tIEhqc29uLnRtTGFuZ3VhZ2UgKHV1aWQ6ICkgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBJVCBNSUdIVCBOT1QgQkUgUEVSRkVDVCAuLi5CdXQgaXQncyBhIGdvb2Qgc3RhcnQgZnJvbSBhbiBleGlzdGluZyAqLnRtbGFuZ3VhZ2UgZmlsZS4gKlxuICogZmlsZVR5cGVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIEhqc29uSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIHN0YXJ0OiBbe1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjY29tbWVudHNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNyb290T2JqZWN0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjdmFsdWVcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCIjYXJyYXlcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXFsvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcXS8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI3ZhbHVlXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiNjb21tZW50c1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvLHwkL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImludmFsaWQuaWxsZWdhbFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvW15cXHNcXF1dL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJhcnJheVwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgXCIjY29tbWVudHNcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJjb21tZW50LnB1bmN0dWF0aW9uXCIsXG4gICAgICAgICAgICAgICAgXCJjb21tZW50LmxpbmVcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKCMpKC4qJCkvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQucHVuY3R1YXRpb25cIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFwvXFwqLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5wdW5jdHVhdGlvblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFwqXFwvLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnQuYmxvY2tcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcImNvbW1lbnQucHVuY3R1YXRpb25cIixcbiAgICAgICAgICAgICAgICBcImNvbW1lbnQubGluZVwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC8oXFwvXFwvKSguKiQpL1xuICAgICAgICB9XSxcbiAgICAgICAgXCIjY29uc3RhbnRcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50XCIsXG4gICAgICAgICAgICByZWdleDogL1xcYig/OnRydWV8ZmFsc2V8bnVsbClcXGIvXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNrZXluYW1lXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICByZWdleDogLyg/OlteLFxce1xcW1xcfVxcXVxcc10rfFwiKD86W15cIlxcXFxdfFxcXFwuKSpcIilcXHMqKD89OikvXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNtc3RyaW5nXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvJycnLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8nJycvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNudW1iZXJcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvLT8oPzowfFsxLTldXFxkKikoPzooPzpcXC5cXGQrKT8oPzpbZUVdWystXT9cXGQrKT8pPy8sXG4gICAgICAgICAgICBjb21tZW50OiBcImhhbmRsZXMgaW50ZWdlciBhbmQgZGVjaW1hbCBudW1iZXJzXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwiI29iamVjdFwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogL1xcey8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFx9LyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIja2V5bmFtZVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjdmFsdWVcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleDogLzovXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvLC9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwicGFyZW5cIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI3Jvb3RPYmplY3RcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogLyg/PVxccyooPzpbXixcXHtcXFtcXH1cXF1cXHNdK3xcIig/OlteXCJcXFxcXXxcXFxcLikqXCIpXFxzKjopLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8tLS1ub25lLS0tLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIja2V5bmFtZVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjdmFsdWVcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleDogLzovXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvLC9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwicGFyZW5cIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI3N0cmluZ1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogL1wiLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cIi8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxcXCg/OltcIlxcXFxcXC9iZm5ydF18dVswLTlhLWZBLUZdezR9KS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJpbnZhbGlkLmlsbGVnYWxcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcXFwuL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI3VzdHJpbmdcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGJbXjosMC05XFwtXFx7XFxbXFx9XFxdXFxzXS4qJC9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI3ZhbHVlXCI6IFt7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNjb25zdGFudFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI251bWJlclwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI3N0cmluZ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2FycmF5XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjb2JqZWN0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjY29tbWVudHNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNtc3RyaW5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjdXN0cmluZ1wiXG4gICAgICAgIH1dXG4gICAgfTtcblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbkhqc29uSGlnaGxpZ2h0UnVsZXMubWV0YURhdGEgPSB7XG4gICAgZmlsZVR5cGVzOiBbXCJoanNvblwiXSxcbiAgICBmb2xkaW5nU3RhcnRNYXJrZXI6IFwiKD94OiAgICAgIyB0dXJuIG9uIGV4dGVuZGVkIG1vZGVcXG4gICAgICAgICAgICAgIF4gICAgIyBhIGxpbmUgYmVnaW5uaW5nIHdpdGhcXG4gICAgICAgICAgICAgIFxcXFxzKiAgICAjIHNvbWUgb3B0aW9uYWwgc3BhY2VcXG4gICAgICAgICAgICAgIFt7XFxcXFtdICAjIHRoZSBzdGFydCBvZiBhbiBvYmplY3Qgb3IgYXJyYXlcXG4gICAgICAgICAgICAgICg/ISAgICAjIGJ1dCBub3QgZm9sbG93ZWQgYnlcXG4gICAgICAgICAgICAgIC4qICAgIyB3aGF0ZXZlclxcbiAgICAgICAgICAgICAgW31cXFxcXV0gICMgYW5kIHRoZSBjbG9zZSBvZiBhbiBvYmplY3Qgb3IgYXJyYXlcXG4gICAgICAgICAgICAgICw/ICAgIyBhbiBvcHRpb25hbCBjb21tYVxcbiAgICAgICAgICAgICAgXFxcXHMqICAjIHNvbWUgb3B0aW9uYWwgc3BhY2VcXG4gICAgICAgICAgICAgICQgICAgIyBhdCB0aGUgZW5kIG9mIHRoZSBsaW5lXFxuICAgICAgICAgICAgICApXFxuICAgICAgICAgICAgICB8ICAgICMgLi4ub3IuLi5cXG4gICAgICAgICAgICAgIFt7XFxcXFtdICAjIHRoZSBzdGFydCBvZiBhbiBvYmplY3Qgb3IgYXJyYXlcXG4gICAgICAgICAgICAgIFxcXFxzKiAgICAjIHNvbWUgb3B0aW9uYWwgc3BhY2VcXG4gICAgICAgICAgICAgICQgICAgIyBhdCB0aGUgZW5kIG9mIHRoZSBsaW5lXFxuICAgICAgICAgICAgKVwiLFxuICAgIGZvbGRpbmdTdG9wTWFya2VyOiBcIig/eDogICAjIHR1cm4gb24gZXh0ZW5kZWQgbW9kZVxcbiAgICAgICAgICAgICBeICAgICMgYSBsaW5lIGJlZ2lubmluZyB3aXRoXFxuICAgICAgICAgICAgIFxcXFxzKiAgIyBzb21lIG9wdGlvbmFsIHNwYWNlXFxuICAgICAgICAgICAgIFt9XFxcXF1dICAjIGFuZCB0aGUgY2xvc2Ugb2YgYW4gb2JqZWN0IG9yIGFycmF5XFxuICAgICAgICAgICAgIClcIixcbiAgICBrZXlFcXVpdmFsZW50OiBcIl5+SlwiLFxuICAgIG5hbWU6IFwiSGpzb25cIixcbiAgICBzY29wZU5hbWU6IFwic291cmNlLmhqc29uXCJcbn07XG5cblxub29wLmluaGVyaXRzKEhqc29uSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuSGpzb25IaWdobGlnaHRSdWxlcyA9IEhqc29uSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=