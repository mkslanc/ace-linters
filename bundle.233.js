"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[233],{

/***/ 12764:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var Range = (__webpack_require__(59082)/* .Range */ .e);
var BaseFoldMode = (__webpack_require__(15369).FoldMode);

var FoldMode = exports.Z = function(commentRegex) {
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

/***/ 30233:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var ForthHighlightRules = (__webpack_require__(69344)/* .ForthHighlightRules */ .Z);
var FoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

var Mode = function() {
    this.HighlightRules = ForthHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "--";
    this.blockComment = null;
    this.$id = "ace/mode/forth";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 69344:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* This file was autogenerated from https://raw.github.com/vze26m98/Forth.tmbundle/master/Syntaxes/Forth.tmLanguage (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var ForthHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = { start: [ { include: '#forth' } ],
      '#comment':
       [ { token: 'comment.line.double-dash.forth',
           regex: '(?:^|\\s)--\\s.*$',
           comment: 'line comments for iForth' },
         { token: 'comment.line.backslash.forth',
           regex: '(?:^|\\s)\\\\[\\s\\S]*$',
           comment: 'ANSI line comment' },
         { token: 'comment.line.backslash-g.forth',
           regex: '(?:^|\\s)\\\\[Gg] .*$',
           comment: 'gForth line comment' },
         { token: 'comment.block.forth',
           regex: '(?:^|\\s)\\(\\*(?=\\s|$)',
           push:
            [ { token: 'comment.block.forth',
                regex: '(?:^|\\s)\\*\\)(?=\\s|$)',
                next: 'pop' },
              { defaultToken: 'comment.block.forth' } ],
           comment: 'multiline comments for iForth' },
         { token: 'comment.block.documentation.forth',
           regex: '\\bDOC\\b',
           caseInsensitive: true,
           push:
            [ { token: 'comment.block.documentation.forth',
                regex: '\\bENDDOC\\b',
                caseInsensitive: true,
                next: 'pop' },
              { defaultToken: 'comment.block.documentation.forth' } ],
           comment: 'documentation comments for iForth' },
         { token: 'comment.line.parentheses.forth',
           regex: '(?:^|\\s)\\.?\\( [^)]*\\)',
           comment: 'ANSI line comment' } ],
      '#constant':
       [ { token: 'constant.language.forth',
           regex: '(?:^|\\s)(?:TRUE|FALSE|BL|PI|CELL|C/L|R/O|W/O|R/W)(?=\\s|$)',
           caseInsensitive: true},
         { token: 'constant.numeric.forth',
           regex: '(?:^|\\s)[$#%]?[-+]?[0-9]+(?:\\.[0-9]*e-?[0-9]+|\\.?[0-9a-fA-F]*)(?=\\s|$)'},
         { token: 'constant.character.forth',
           regex: '(?:^|\\s)(?:[&^]\\S|(?:"|\')\\S(?:"|\'))(?=\\s|$)'}],
      '#forth':
       [ { include: '#constant' },
         { include: '#comment' },
         { include: '#string' },
         { include: '#word' },
         { include: '#variable' },
         { include: '#storage' },
         { include: '#word-def' } ],
      '#storage':
       [ { token: 'storage.type.forth',
           regex: '(?:^|\\s)(?:2CONSTANT|2VARIABLE|ALIAS|CONSTANT|CREATE-INTERPRET/COMPILE[:]?|CREATE|DEFER|FCONSTANT|FIELD|FVARIABLE|USER|VALUE|VARIABLE|VOCABULARY)(?=\\s|$)',
           caseInsensitive: true}],
      '#string':
       [ { token: 'string.quoted.double.forth',
           regex: '(ABORT" |BREAK" |\\." |C" |0"|S\\\\?" )([^"]+")',
           caseInsensitive: true},
         { token: 'string.unquoted.forth',
           regex: '(?:INCLUDE|NEEDS|REQUIRE|USE)[ ]\\S+(?=\\s|$)',
           caseInsensitive: true}],
      '#variable':
       [ { token: 'variable.language.forth',
           regex: '\\b(?:I|J)\\b',
           caseInsensitive: true } ],
      '#word':
       [ { token: 'keyword.control.immediate.forth',
           regex: '(?:^|\\s)\\[(?:\\?DO|\\+LOOP|AGAIN|BEGIN|DEFINED|DO|ELSE|ENDIF|FOR|IF|IFDEF|IFUNDEF|LOOP|NEXT|REPEAT|THEN|UNTIL|WHILE)\\](?=\\s|$)',
           caseInsensitive: true},
         { token: 'keyword.other.immediate.forth',
           regex: '(?:^|\\s)(?:COMPILE-ONLY|IMMEDIATE|IS|RESTRICT|TO|WHAT\'S|])(?=\\s|$)',
           caseInsensitive: true},
         { token: 'keyword.control.compile-only.forth',
           regex: '(?:^|\\s)(?:-DO|\\-LOOP|\\?DO|\\?LEAVE|\\+DO|\\+LOOP|ABORT\\"|AGAIN|AHEAD|BEGIN|CASE|DO|ELSE|ENDCASE|ENDIF|ENDOF|ENDTRY\\-IFERROR|ENDTRY|FOR|IF|IFERROR|LEAVE|LOOP|NEXT|RECOVER|REPEAT|RESTORE|THEN|TRY|U\\-DO|U\\+DO|UNTIL|WHILE)(?=\\s|$)',
           caseInsensitive: true},
         { token: 'keyword.other.compile-only.forth',
           regex: '(?:^|\\s)(?:\\?DUP-0=-IF|\\?DUP-IF|\\)|\\[|\\[\'\\]|\\[CHAR\\]|\\[COMPILE\\]|\\[IS\\]|\\[TO\\]|<COMPILATION|<INTERPRETATION|ASSERT\\(|ASSERT0\\(|ASSERT1\\(|ASSERT2\\(|ASSERT3\\(|COMPILATION>|DEFERS|DOES>|INTERPRETATION>|OF|POSTPONE)(?=\\s|$)',
           caseInsensitive: true},
         { token: 'keyword.other.non-immediate.forth',
           regex: '(?:^|\\s)(?:\'|<IS>|<TO>|CHAR|END-STRUCT|INCLUDE[D]?|LOAD|NEEDS|REQUIRE[D]?|REVISION|SEE|STRUCT|THRU|USE)(?=\\s|$)',
           caseInsensitive: true},
         { token: 'keyword.other.warning.forth',
           regex: '(?:^|\\s)(?:~~|BREAK:|BREAK"|DBG)(?=\\s|$)',
           caseInsensitive: true}],
      '#word-def':
       [ { token:
            [ 'keyword.other.compile-only.forth',
              'keyword.other.compile-only.forth',
              'meta.block.forth',
              'entity.name.function.forth' ],
           regex: '(:NONAME)|(^:|\\s:)(\\s)(\\S+)(?=\\s|$)',
           caseInsensitive: true,
           push:
            [ { token: 'keyword.other.compile-only.forth',
                regex: ';(?:CODE)?',
                caseInsensitive: true,
                next: 'pop' },
              { include: '#constant' },
              { include: '#comment' },
              { include: '#string' },
              { include: '#word' },
              { include: '#variable' },
              { include: '#storage' },
              { defaultToken: 'meta.block.forth' } ] } ] };
    
    this.normalizeRules();
};

ForthHighlightRules.metaData = { fileTypes: [ 'frt', 'fs', 'ldr', 'fth', '4th' ],
      foldingStartMarker: '/\\*\\*|\\{\\s*$',
      foldingStopMarker: '\\*\\*/|^\\s*\\}',
      keyEquivalent: '^~F',
      name: 'Forth',
      scopeName: 'source.forth' };


oop.inherits(ForthHighlightRules, TextHighlightRules);

exports.Z = ForthHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLGlDQUFpQztBQUNqQyxXQUFXO0FBQ1g7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQSxXQUFXO0FBQ1g7QUFDQSxtQ0FBbUM7QUFDbkM7QUFDQSxXQUFXO0FBQ1g7QUFDQSxpQ0FBaUM7QUFDakMsV0FBVztBQUNYO0FBQ0EsaUNBQWlDO0FBQ2pDLFdBQVc7QUFDWDtBQUNBLGlDQUFpQztBQUNqQyxXQUFXO0FBQ1g7QUFDQSxpQ0FBaUM7QUFDakMsV0FBVztBQUNYO0FBQ0EsaUNBQWlDO0FBQ2pDLFdBQVc7QUFDWDtBQUNBLGlDQUFpQztBQUNqQztBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQix5QkFBeUI7QUFDekI7QUFDQSw2QkFBNkI7QUFDN0IsZ0JBQWdCLHNCQUFzQjtBQUN0QyxnQkFBZ0IscUJBQXFCO0FBQ3JDLGdCQUFnQixvQkFBb0I7QUFDcEMsZ0JBQWdCLGtCQUFrQjtBQUNsQyxnQkFBZ0Isc0JBQXNCO0FBQ3RDLGdCQUFnQixxQkFBcUI7QUFDckMsZ0JBQWdCLG1DQUFtQyxJQUFJO0FBQ3ZEO0FBQ0E7QUFDQTs7QUFFQSxpQ0FBaUM7QUFDakMsc0NBQXNDO0FBQ3RDLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7OztBQUdBOztBQUVBLFNBQTJCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2NzdHlsZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvcnRoLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9ydGhfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiLypcbiAgVEhJUyBGSUxFIFdBUyBBVVRPR0VORVJBVEVEIEJZIG1vZGUudG1wbC5qc1xuKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBGb3J0aEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZm9ydGhfaGlnaGxpZ2h0X3J1bGVzXCIpLkZvcnRoSGlnaGxpZ2h0UnVsZXM7XG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gRm9ydGhIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBGb2xkTW9kZSgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLS1cIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IG51bGw7XG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2ZvcnRoXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIi8qIFRoaXMgZmlsZSB3YXMgYXV0b2dlbmVyYXRlZCBmcm9tIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20vdnplMjZtOTgvRm9ydGgudG1idW5kbGUvbWFzdGVyL1N5bnRheGVzL0ZvcnRoLnRtTGFuZ3VhZ2UgKHV1aWQ6ICkgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBJVCBNSUdIVCBOT1QgQkUgUEVSRkVDVCAuLi5CdXQgaXQncyBhIGdvb2Qgc3RhcnQgZnJvbSBhbiBleGlzdGluZyAqLnRtbGFuZ3VhZ2UgZmlsZS4gKlxuICogZmlsZVR5cGVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIEZvcnRoSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7IHN0YXJ0OiBbIHsgaW5jbHVkZTogJyNmb3J0aCcgfSBdLFxuICAgICAgJyNjb21tZW50JzpcbiAgICAgICBbIHsgdG9rZW46ICdjb21tZW50LmxpbmUuZG91YmxlLWRhc2guZm9ydGgnLFxuICAgICAgICAgICByZWdleDogJyg/Ol58XFxcXHMpLS1cXFxccy4qJCcsXG4gICAgICAgICAgIGNvbW1lbnQ6ICdsaW5lIGNvbW1lbnRzIGZvciBpRm9ydGgnIH0sXG4gICAgICAgICB7IHRva2VuOiAnY29tbWVudC5saW5lLmJhY2tzbGFzaC5mb3J0aCcsXG4gICAgICAgICAgIHJlZ2V4OiAnKD86XnxcXFxccylcXFxcXFxcXFtcXFxcc1xcXFxTXSokJyxcbiAgICAgICAgICAgY29tbWVudDogJ0FOU0kgbGluZSBjb21tZW50JyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2NvbW1lbnQubGluZS5iYWNrc2xhc2gtZy5mb3J0aCcsXG4gICAgICAgICAgIHJlZ2V4OiAnKD86XnxcXFxccylcXFxcXFxcXFtHZ10gLiokJyxcbiAgICAgICAgICAgY29tbWVudDogJ2dGb3J0aCBsaW5lIGNvbW1lbnQnIH0sXG4gICAgICAgICB7IHRva2VuOiAnY29tbWVudC5ibG9jay5mb3J0aCcsXG4gICAgICAgICAgIHJlZ2V4OiAnKD86XnxcXFxccylcXFxcKFxcXFwqKD89XFxcXHN8JCknLFxuICAgICAgICAgICBwdXNoOlxuICAgICAgICAgICAgWyB7IHRva2VuOiAnY29tbWVudC5ibG9jay5mb3J0aCcsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICcoPzpefFxcXFxzKVxcXFwqXFxcXCkoPz1cXFxcc3wkKScsXG4gICAgICAgICAgICAgICAgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdjb21tZW50LmJsb2NrLmZvcnRoJyB9IF0sXG4gICAgICAgICAgIGNvbW1lbnQ6ICdtdWx0aWxpbmUgY29tbWVudHMgZm9yIGlGb3J0aCcgfSxcbiAgICAgICAgIHsgdG9rZW46ICdjb21tZW50LmJsb2NrLmRvY3VtZW50YXRpb24uZm9ydGgnLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiRE9DXFxcXGInLFxuICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWUsXG4gICAgICAgICAgIHB1c2g6XG4gICAgICAgICAgICBbIHsgdG9rZW46ICdjb21tZW50LmJsb2NrLmRvY3VtZW50YXRpb24uZm9ydGgnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFxcXGJFTkRET0NcXFxcYicsXG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnY29tbWVudC5ibG9jay5kb2N1bWVudGF0aW9uLmZvcnRoJyB9IF0sXG4gICAgICAgICAgIGNvbW1lbnQ6ICdkb2N1bWVudGF0aW9uIGNvbW1lbnRzIGZvciBpRm9ydGgnIH0sXG4gICAgICAgICB7IHRva2VuOiAnY29tbWVudC5saW5lLnBhcmVudGhlc2VzLmZvcnRoJyxcbiAgICAgICAgICAgcmVnZXg6ICcoPzpefFxcXFxzKVxcXFwuP1xcXFwoIFteKV0qXFxcXCknLFxuICAgICAgICAgICBjb21tZW50OiAnQU5TSSBsaW5lIGNvbW1lbnQnIH0gXSxcbiAgICAgICcjY29uc3RhbnQnOlxuICAgICAgIFsgeyB0b2tlbjogJ2NvbnN0YW50Lmxhbmd1YWdlLmZvcnRoJyxcbiAgICAgICAgICAgcmVnZXg6ICcoPzpefFxcXFxzKSg/OlRSVUV8RkFMU0V8Qkx8UEl8Q0VMTHxDL0x8Ui9PfFcvT3xSL1cpKD89XFxcXHN8JCknLFxuICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWV9LFxuICAgICAgICAgeyB0b2tlbjogJ2NvbnN0YW50Lm51bWVyaWMuZm9ydGgnLFxuICAgICAgICAgICByZWdleDogJyg/Ol58XFxcXHMpWyQjJV0/Wy0rXT9bMC05XSsoPzpcXFxcLlswLTldKmUtP1swLTldK3xcXFxcLj9bMC05YS1mQS1GXSopKD89XFxcXHN8JCknfSxcbiAgICAgICAgIHsgdG9rZW46ICdjb25zdGFudC5jaGFyYWN0ZXIuZm9ydGgnLFxuICAgICAgICAgICByZWdleDogJyg/Ol58XFxcXHMpKD86WyZeXVxcXFxTfCg/OlwifFxcJylcXFxcUyg/OlwifFxcJykpKD89XFxcXHN8JCknfV0sXG4gICAgICAnI2ZvcnRoJzpcbiAgICAgICBbIHsgaW5jbHVkZTogJyNjb25zdGFudCcgfSxcbiAgICAgICAgIHsgaW5jbHVkZTogJyNjb21tZW50JyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI3N0cmluZycgfSxcbiAgICAgICAgIHsgaW5jbHVkZTogJyN3b3JkJyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI3ZhcmlhYmxlJyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI3N0b3JhZ2UnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjd29yZC1kZWYnIH0gXSxcbiAgICAgICcjc3RvcmFnZSc6XG4gICAgICAgWyB7IHRva2VuOiAnc3RvcmFnZS50eXBlLmZvcnRoJyxcbiAgICAgICAgICAgcmVnZXg6ICcoPzpefFxcXFxzKSg/OjJDT05TVEFOVHwyVkFSSUFCTEV8QUxJQVN8Q09OU1RBTlR8Q1JFQVRFLUlOVEVSUFJFVC9DT01QSUxFWzpdP3xDUkVBVEV8REVGRVJ8RkNPTlNUQU5UfEZJRUxEfEZWQVJJQUJMRXxVU0VSfFZBTFVFfFZBUklBQkxFfFZPQ0FCVUxBUlkpKD89XFxcXHN8JCknLFxuICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWV9XSxcbiAgICAgICcjc3RyaW5nJzpcbiAgICAgICBbIHsgdG9rZW46ICdzdHJpbmcucXVvdGVkLmRvdWJsZS5mb3J0aCcsXG4gICAgICAgICAgIHJlZ2V4OiAnKEFCT1JUXCIgfEJSRUFLXCIgfFxcXFwuXCIgfENcIiB8MFwifFNcXFxcXFxcXD9cIiApKFteXCJdK1wiKScsXG4gICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZX0sXG4gICAgICAgICB7IHRva2VuOiAnc3RyaW5nLnVucXVvdGVkLmZvcnRoJyxcbiAgICAgICAgICAgcmVnZXg6ICcoPzpJTkNMVURFfE5FRURTfFJFUVVJUkV8VVNFKVsgXVxcXFxTKyg/PVxcXFxzfCQpJyxcbiAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlfV0sXG4gICAgICAnI3ZhcmlhYmxlJzpcbiAgICAgICBbIHsgdG9rZW46ICd2YXJpYWJsZS5sYW5ndWFnZS5mb3J0aCcsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGIoPzpJfEopXFxcXGInLFxuICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWUgfSBdLFxuICAgICAgJyN3b3JkJzpcbiAgICAgICBbIHsgdG9rZW46ICdrZXl3b3JkLmNvbnRyb2wuaW1tZWRpYXRlLmZvcnRoJyxcbiAgICAgICAgICAgcmVnZXg6ICcoPzpefFxcXFxzKVxcXFxbKD86XFxcXD9ET3xcXFxcK0xPT1B8QUdBSU58QkVHSU58REVGSU5FRHxET3xFTFNFfEVORElGfEZPUnxJRnxJRkRFRnxJRlVOREVGfExPT1B8TkVYVHxSRVBFQVR8VEhFTnxVTlRJTHxXSElMRSlcXFxcXSg/PVxcXFxzfCQpJyxcbiAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlfSxcbiAgICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLm90aGVyLmltbWVkaWF0ZS5mb3J0aCcsXG4gICAgICAgICAgIHJlZ2V4OiAnKD86XnxcXFxccykoPzpDT01QSUxFLU9OTFl8SU1NRURJQVRFfElTfFJFU1RSSUNUfFRPfFdIQVRcXCdTfF0pKD89XFxcXHN8JCknLFxuICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWV9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQuY29udHJvbC5jb21waWxlLW9ubHkuZm9ydGgnLFxuICAgICAgICAgICByZWdleDogJyg/Ol58XFxcXHMpKD86LURPfFxcXFwtTE9PUHxcXFxcP0RPfFxcXFw/TEVBVkV8XFxcXCtET3xcXFxcK0xPT1B8QUJPUlRcXFxcXCJ8QUdBSU58QUhFQUR8QkVHSU58Q0FTRXxET3xFTFNFfEVORENBU0V8RU5ESUZ8RU5ET0Z8RU5EVFJZXFxcXC1JRkVSUk9SfEVORFRSWXxGT1J8SUZ8SUZFUlJPUnxMRUFWRXxMT09QfE5FWFR8UkVDT1ZFUnxSRVBFQVR8UkVTVE9SRXxUSEVOfFRSWXxVXFxcXC1ET3xVXFxcXCtET3xVTlRJTHxXSElMRSkoPz1cXFxcc3wkKScsXG4gICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZX0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5vdGhlci5jb21waWxlLW9ubHkuZm9ydGgnLFxuICAgICAgICAgICByZWdleDogJyg/Ol58XFxcXHMpKD86XFxcXD9EVVAtMD0tSUZ8XFxcXD9EVVAtSUZ8XFxcXCl8XFxcXFt8XFxcXFtcXCdcXFxcXXxcXFxcW0NIQVJcXFxcXXxcXFxcW0NPTVBJTEVcXFxcXXxcXFxcW0lTXFxcXF18XFxcXFtUT1xcXFxdfDxDT01QSUxBVElPTnw8SU5URVJQUkVUQVRJT058QVNTRVJUXFxcXCh8QVNTRVJUMFxcXFwofEFTU0VSVDFcXFxcKHxBU1NFUlQyXFxcXCh8QVNTRVJUM1xcXFwofENPTVBJTEFUSU9OPnxERUZFUlN8RE9FUz58SU5URVJQUkVUQVRJT04+fE9GfFBPU1RQT05FKSg/PVxcXFxzfCQpJyxcbiAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlfSxcbiAgICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLm90aGVyLm5vbi1pbW1lZGlhdGUuZm9ydGgnLFxuICAgICAgICAgICByZWdleDogJyg/Ol58XFxcXHMpKD86XFwnfDxJUz58PFRPPnxDSEFSfEVORC1TVFJVQ1R8SU5DTFVERVtEXT98TE9BRHxORUVEU3xSRVFVSVJFW0RdP3xSRVZJU0lPTnxTRUV8U1RSVUNUfFRIUlV8VVNFKSg/PVxcXFxzfCQpJyxcbiAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlfSxcbiAgICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLm90aGVyLndhcm5pbmcuZm9ydGgnLFxuICAgICAgICAgICByZWdleDogJyg/Ol58XFxcXHMpKD86fn58QlJFQUs6fEJSRUFLXCJ8REJHKSg/PVxcXFxzfCQpJyxcbiAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlfV0sXG4gICAgICAnI3dvcmQtZGVmJzpcbiAgICAgICBbIHsgdG9rZW46XG4gICAgICAgICAgICBbICdrZXl3b3JkLm90aGVyLmNvbXBpbGUtb25seS5mb3J0aCcsXG4gICAgICAgICAgICAgICdrZXl3b3JkLm90aGVyLmNvbXBpbGUtb25seS5mb3J0aCcsXG4gICAgICAgICAgICAgICdtZXRhLmJsb2NrLmZvcnRoJyxcbiAgICAgICAgICAgICAgJ2VudGl0eS5uYW1lLmZ1bmN0aW9uLmZvcnRoJyBdLFxuICAgICAgICAgICByZWdleDogJyg6Tk9OQU1FKXwoXjp8XFxcXHM6KShcXFxccykoXFxcXFMrKSg/PVxcXFxzfCQpJyxcbiAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlLFxuICAgICAgICAgICBwdXNoOlxuICAgICAgICAgICAgWyB7IHRva2VuOiAna2V5d29yZC5vdGhlci5jb21waWxlLW9ubHkuZm9ydGgnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnOyg/OkNPREUpPycsXG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgIHsgaW5jbHVkZTogJyNjb25zdGFudCcgfSxcbiAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI2NvbW1lbnQnIH0sXG4gICAgICAgICAgICAgIHsgaW5jbHVkZTogJyNzdHJpbmcnIH0sXG4gICAgICAgICAgICAgIHsgaW5jbHVkZTogJyN3b3JkJyB9LFxuICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjdmFyaWFibGUnIH0sXG4gICAgICAgICAgICAgIHsgaW5jbHVkZTogJyNzdG9yYWdlJyB9LFxuICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ21ldGEuYmxvY2suZm9ydGgnIH0gXSB9IF0gfTtcbiAgICBcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5Gb3J0aEhpZ2hsaWdodFJ1bGVzLm1ldGFEYXRhID0geyBmaWxlVHlwZXM6IFsgJ2ZydCcsICdmcycsICdsZHInLCAnZnRoJywgJzR0aCcgXSxcbiAgICAgIGZvbGRpbmdTdGFydE1hcmtlcjogJy9cXFxcKlxcXFwqfFxcXFx7XFxcXHMqJCcsXG4gICAgICBmb2xkaW5nU3RvcE1hcmtlcjogJ1xcXFwqXFxcXCovfF5cXFxccypcXFxcfScsXG4gICAgICBrZXlFcXVpdmFsZW50OiAnXn5GJyxcbiAgICAgIG5hbWU6ICdGb3J0aCcsXG4gICAgICBzY29wZU5hbWU6ICdzb3VyY2UuZm9ydGgnIH07XG5cblxub29wLmluaGVyaXRzKEZvcnRoSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuRm9ydGhIaWdobGlnaHRSdWxlcyA9IEZvcnRoSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=