"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7076],{

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

/***/ 27076:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var ForthHighlightRules = (__webpack_require__(9255)/* .ForthHighlightRules */ .T);
var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

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

/***/ 9255:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* This file was autogenerated from https://raw.github.com/vze26m98/Forth.tmbundle/master/Syntaxes/Forth.tmLanguage (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

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

exports.T = ForthHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQSxpQ0FBaUM7QUFDakMsV0FBVztBQUNYO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0EsV0FBVztBQUNYO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0EsV0FBVztBQUNYO0FBQ0EsaUNBQWlDO0FBQ2pDLFdBQVc7QUFDWDtBQUNBLGlDQUFpQztBQUNqQyxXQUFXO0FBQ1g7QUFDQSxpQ0FBaUM7QUFDakMsV0FBVztBQUNYO0FBQ0EsaUNBQWlDO0FBQ2pDLFdBQVc7QUFDWDtBQUNBLGlDQUFpQztBQUNqQyxXQUFXO0FBQ1g7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIseUJBQXlCO0FBQ3pCO0FBQ0EsNkJBQTZCO0FBQzdCLGdCQUFnQixzQkFBc0I7QUFDdEMsZ0JBQWdCLHFCQUFxQjtBQUNyQyxnQkFBZ0Isb0JBQW9CO0FBQ3BDLGdCQUFnQixrQkFBa0I7QUFDbEMsZ0JBQWdCLHNCQUFzQjtBQUN0QyxnQkFBZ0IscUJBQXFCO0FBQ3JDLGdCQUFnQixtQ0FBbUMsSUFBSTtBQUN2RDtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDO0FBQ2pDLHNDQUFzQztBQUN0QywwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxTQUEyQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb3J0aC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvcnRoX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIi8qXG4gIFRISVMgRklMRSBXQVMgQVVUT0dFTkVSQVRFRCBCWSBtb2RlLnRtcGwuanNcbiovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgRm9ydGhIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2ZvcnRoX2hpZ2hsaWdodF9ydWxlc1wiKS5Gb3J0aEhpZ2hsaWdodFJ1bGVzO1xudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IEZvcnRoSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi0tXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSBudWxsO1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9mb3J0aFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCIvKiBUaGlzIGZpbGUgd2FzIGF1dG9nZW5lcmF0ZWQgZnJvbSBodHRwczovL3Jhdy5naXRodWIuY29tL3Z6ZTI2bTk4L0ZvcnRoLnRtYnVuZGxlL21hc3Rlci9TeW50YXhlcy9Gb3J0aC50bUxhbmd1YWdlICh1dWlkOiApICovXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogSVQgTUlHSFQgTk9UIEJFIFBFUkZFQ1QgLi4uQnV0IGl0J3MgYSBnb29kIHN0YXJ0IGZyb20gYW4gZXhpc3RpbmcgKi50bWxhbmd1YWdlIGZpbGUuICpcbiAqIGZpbGVUeXBlcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBGb3J0aEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0geyBzdGFydDogWyB7IGluY2x1ZGU6ICcjZm9ydGgnIH0gXSxcbiAgICAgICcjY29tbWVudCc6XG4gICAgICAgWyB7IHRva2VuOiAnY29tbWVudC5saW5lLmRvdWJsZS1kYXNoLmZvcnRoJyxcbiAgICAgICAgICAgcmVnZXg6ICcoPzpefFxcXFxzKS0tXFxcXHMuKiQnLFxuICAgICAgICAgICBjb21tZW50OiAnbGluZSBjb21tZW50cyBmb3IgaUZvcnRoJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2NvbW1lbnQubGluZS5iYWNrc2xhc2guZm9ydGgnLFxuICAgICAgICAgICByZWdleDogJyg/Ol58XFxcXHMpXFxcXFxcXFxbXFxcXHNcXFxcU10qJCcsXG4gICAgICAgICAgIGNvbW1lbnQ6ICdBTlNJIGxpbmUgY29tbWVudCcgfSxcbiAgICAgICAgIHsgdG9rZW46ICdjb21tZW50LmxpbmUuYmFja3NsYXNoLWcuZm9ydGgnLFxuICAgICAgICAgICByZWdleDogJyg/Ol58XFxcXHMpXFxcXFxcXFxbR2ddIC4qJCcsXG4gICAgICAgICAgIGNvbW1lbnQ6ICdnRm9ydGggbGluZSBjb21tZW50JyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2NvbW1lbnQuYmxvY2suZm9ydGgnLFxuICAgICAgICAgICByZWdleDogJyg/Ol58XFxcXHMpXFxcXChcXFxcKig/PVxcXFxzfCQpJyxcbiAgICAgICAgICAgcHVzaDpcbiAgICAgICAgICAgIFsgeyB0b2tlbjogJ2NvbW1lbnQuYmxvY2suZm9ydGgnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnKD86XnxcXFxccylcXFxcKlxcXFwpKD89XFxcXHN8JCknLFxuICAgICAgICAgICAgICAgIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnY29tbWVudC5ibG9jay5mb3J0aCcgfSBdLFxuICAgICAgICAgICBjb21tZW50OiAnbXVsdGlsaW5lIGNvbW1lbnRzIGZvciBpRm9ydGgnIH0sXG4gICAgICAgICB7IHRva2VuOiAnY29tbWVudC5ibG9jay5kb2N1bWVudGF0aW9uLmZvcnRoJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXFxcYkRPQ1xcXFxiJyxcbiAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlLFxuICAgICAgICAgICBwdXNoOlxuICAgICAgICAgICAgWyB7IHRva2VuOiAnY29tbWVudC5ibG9jay5kb2N1bWVudGF0aW9uLmZvcnRoJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFxiRU5ERE9DXFxcXGInLFxuICAgICAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ2NvbW1lbnQuYmxvY2suZG9jdW1lbnRhdGlvbi5mb3J0aCcgfSBdLFxuICAgICAgICAgICBjb21tZW50OiAnZG9jdW1lbnRhdGlvbiBjb21tZW50cyBmb3IgaUZvcnRoJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2NvbW1lbnQubGluZS5wYXJlbnRoZXNlcy5mb3J0aCcsXG4gICAgICAgICAgIHJlZ2V4OiAnKD86XnxcXFxccylcXFxcLj9cXFxcKCBbXildKlxcXFwpJyxcbiAgICAgICAgICAgY29tbWVudDogJ0FOU0kgbGluZSBjb21tZW50JyB9IF0sXG4gICAgICAnI2NvbnN0YW50JzpcbiAgICAgICBbIHsgdG9rZW46ICdjb25zdGFudC5sYW5ndWFnZS5mb3J0aCcsXG4gICAgICAgICAgIHJlZ2V4OiAnKD86XnxcXFxccykoPzpUUlVFfEZBTFNFfEJMfFBJfENFTEx8Qy9MfFIvT3xXL098Ui9XKSg/PVxcXFxzfCQpJyxcbiAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlfSxcbiAgICAgICAgIHsgdG9rZW46ICdjb25zdGFudC5udW1lcmljLmZvcnRoJyxcbiAgICAgICAgICAgcmVnZXg6ICcoPzpefFxcXFxzKVskIyVdP1stK10/WzAtOV0rKD86XFxcXC5bMC05XSplLT9bMC05XSt8XFxcXC4/WzAtOWEtZkEtRl0qKSg/PVxcXFxzfCQpJ30sXG4gICAgICAgICB7IHRva2VuOiAnY29uc3RhbnQuY2hhcmFjdGVyLmZvcnRoJyxcbiAgICAgICAgICAgcmVnZXg6ICcoPzpefFxcXFxzKSg/OlsmXl1cXFxcU3woPzpcInxcXCcpXFxcXFMoPzpcInxcXCcpKSg/PVxcXFxzfCQpJ31dLFxuICAgICAgJyNmb3J0aCc6XG4gICAgICAgWyB7IGluY2x1ZGU6ICcjY29uc3RhbnQnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjY29tbWVudCcgfSxcbiAgICAgICAgIHsgaW5jbHVkZTogJyNzdHJpbmcnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjd29yZCcgfSxcbiAgICAgICAgIHsgaW5jbHVkZTogJyN2YXJpYWJsZScgfSxcbiAgICAgICAgIHsgaW5jbHVkZTogJyNzdG9yYWdlJyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI3dvcmQtZGVmJyB9IF0sXG4gICAgICAnI3N0b3JhZ2UnOlxuICAgICAgIFsgeyB0b2tlbjogJ3N0b3JhZ2UudHlwZS5mb3J0aCcsXG4gICAgICAgICAgIHJlZ2V4OiAnKD86XnxcXFxccykoPzoyQ09OU1RBTlR8MlZBUklBQkxFfEFMSUFTfENPTlNUQU5UfENSRUFURS1JTlRFUlBSRVQvQ09NUElMRVs6XT98Q1JFQVRFfERFRkVSfEZDT05TVEFOVHxGSUVMRHxGVkFSSUFCTEV8VVNFUnxWQUxVRXxWQVJJQUJMRXxWT0NBQlVMQVJZKSg/PVxcXFxzfCQpJyxcbiAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlfV0sXG4gICAgICAnI3N0cmluZyc6XG4gICAgICAgWyB7IHRva2VuOiAnc3RyaW5nLnF1b3RlZC5kb3VibGUuZm9ydGgnLFxuICAgICAgICAgICByZWdleDogJyhBQk9SVFwiIHxCUkVBS1wiIHxcXFxcLlwiIHxDXCIgfDBcInxTXFxcXFxcXFw/XCIgKShbXlwiXStcIiknLFxuICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWV9LFxuICAgICAgICAgeyB0b2tlbjogJ3N0cmluZy51bnF1b3RlZC5mb3J0aCcsXG4gICAgICAgICAgIHJlZ2V4OiAnKD86SU5DTFVERXxORUVEU3xSRVFVSVJFfFVTRSlbIF1cXFxcUysoPz1cXFxcc3wkKScsXG4gICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZX1dLFxuICAgICAgJyN2YXJpYWJsZSc6XG4gICAgICAgWyB7IHRva2VuOiAndmFyaWFibGUubGFuZ3VhZ2UuZm9ydGgnLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiKD86SXxKKVxcXFxiJyxcbiAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlIH0gXSxcbiAgICAgICcjd29yZCc6XG4gICAgICAgWyB7IHRva2VuOiAna2V5d29yZC5jb250cm9sLmltbWVkaWF0ZS5mb3J0aCcsXG4gICAgICAgICAgIHJlZ2V4OiAnKD86XnxcXFxccylcXFxcWyg/OlxcXFw/RE98XFxcXCtMT09QfEFHQUlOfEJFR0lOfERFRklORUR8RE98RUxTRXxFTkRJRnxGT1J8SUZ8SUZERUZ8SUZVTkRFRnxMT09QfE5FWFR8UkVQRUFUfFRIRU58VU5USUx8V0hJTEUpXFxcXF0oPz1cXFxcc3wkKScsXG4gICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZX0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5vdGhlci5pbW1lZGlhdGUuZm9ydGgnLFxuICAgICAgICAgICByZWdleDogJyg/Ol58XFxcXHMpKD86Q09NUElMRS1PTkxZfElNTUVESUFURXxJU3xSRVNUUklDVHxUT3xXSEFUXFwnU3xdKSg/PVxcXFxzfCQpJyxcbiAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlfSxcbiAgICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLmNvbnRyb2wuY29tcGlsZS1vbmx5LmZvcnRoJyxcbiAgICAgICAgICAgcmVnZXg6ICcoPzpefFxcXFxzKSg/Oi1ET3xcXFxcLUxPT1B8XFxcXD9ET3xcXFxcP0xFQVZFfFxcXFwrRE98XFxcXCtMT09QfEFCT1JUXFxcXFwifEFHQUlOfEFIRUFEfEJFR0lOfENBU0V8RE98RUxTRXxFTkRDQVNFfEVORElGfEVORE9GfEVORFRSWVxcXFwtSUZFUlJPUnxFTkRUUll8Rk9SfElGfElGRVJST1J8TEVBVkV8TE9PUHxORVhUfFJFQ09WRVJ8UkVQRUFUfFJFU1RPUkV8VEhFTnxUUll8VVxcXFwtRE98VVxcXFwrRE98VU5USUx8V0hJTEUpKD89XFxcXHN8JCknLFxuICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWV9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQub3RoZXIuY29tcGlsZS1vbmx5LmZvcnRoJyxcbiAgICAgICAgICAgcmVnZXg6ICcoPzpefFxcXFxzKSg/OlxcXFw/RFVQLTA9LUlGfFxcXFw/RFVQLUlGfFxcXFwpfFxcXFxbfFxcXFxbXFwnXFxcXF18XFxcXFtDSEFSXFxcXF18XFxcXFtDT01QSUxFXFxcXF18XFxcXFtJU1xcXFxdfFxcXFxbVE9cXFxcXXw8Q09NUElMQVRJT058PElOVEVSUFJFVEFUSU9OfEFTU0VSVFxcXFwofEFTU0VSVDBcXFxcKHxBU1NFUlQxXFxcXCh8QVNTRVJUMlxcXFwofEFTU0VSVDNcXFxcKHxDT01QSUxBVElPTj58REVGRVJTfERPRVM+fElOVEVSUFJFVEFUSU9OPnxPRnxQT1NUUE9ORSkoPz1cXFxcc3wkKScsXG4gICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZX0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5vdGhlci5ub24taW1tZWRpYXRlLmZvcnRoJyxcbiAgICAgICAgICAgcmVnZXg6ICcoPzpefFxcXFxzKSg/OlxcJ3w8SVM+fDxUTz58Q0hBUnxFTkQtU1RSVUNUfElOQ0xVREVbRF0/fExPQUR8TkVFRFN8UkVRVUlSRVtEXT98UkVWSVNJT058U0VFfFNUUlVDVHxUSFJVfFVTRSkoPz1cXFxcc3wkKScsXG4gICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZX0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5vdGhlci53YXJuaW5nLmZvcnRoJyxcbiAgICAgICAgICAgcmVnZXg6ICcoPzpefFxcXFxzKSg/On5+fEJSRUFLOnxCUkVBS1wifERCRykoPz1cXFxcc3wkKScsXG4gICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZX1dLFxuICAgICAgJyN3b3JkLWRlZic6XG4gICAgICAgWyB7IHRva2VuOlxuICAgICAgICAgICAgWyAna2V5d29yZC5vdGhlci5jb21waWxlLW9ubHkuZm9ydGgnLFxuICAgICAgICAgICAgICAna2V5d29yZC5vdGhlci5jb21waWxlLW9ubHkuZm9ydGgnLFxuICAgICAgICAgICAgICAnbWV0YS5ibG9jay5mb3J0aCcsXG4gICAgICAgICAgICAgICdlbnRpdHkubmFtZS5mdW5jdGlvbi5mb3J0aCcgXSxcbiAgICAgICAgICAgcmVnZXg6ICcoOk5PTkFNRSl8KF46fFxcXFxzOikoXFxcXHMpKFxcXFxTKykoPz1cXFxcc3wkKScsXG4gICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgcHVzaDpcbiAgICAgICAgICAgIFsgeyB0b2tlbjogJ2tleXdvcmQub3RoZXIuY29tcGlsZS1vbmx5LmZvcnRoJyxcbiAgICAgICAgICAgICAgICByZWdleDogJzsoPzpDT0RFKT8nLFxuICAgICAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjY29uc3RhbnQnIH0sXG4gICAgICAgICAgICAgIHsgaW5jbHVkZTogJyNjb21tZW50JyB9LFxuICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjc3RyaW5nJyB9LFxuICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjd29yZCcgfSxcbiAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI3ZhcmlhYmxlJyB9LFxuICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjc3RvcmFnZScgfSxcbiAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdtZXRhLmJsb2NrLmZvcnRoJyB9IF0gfSBdIH07XG4gICAgXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxuRm9ydGhIaWdobGlnaHRSdWxlcy5tZXRhRGF0YSA9IHsgZmlsZVR5cGVzOiBbICdmcnQnLCAnZnMnLCAnbGRyJywgJ2Z0aCcsICc0dGgnIF0sXG4gICAgICBmb2xkaW5nU3RhcnRNYXJrZXI6ICcvXFxcXCpcXFxcKnxcXFxce1xcXFxzKiQnLFxuICAgICAgZm9sZGluZ1N0b3BNYXJrZXI6ICdcXFxcKlxcXFwqL3xeXFxcXHMqXFxcXH0nLFxuICAgICAga2V5RXF1aXZhbGVudDogJ15+RicsXG4gICAgICBuYW1lOiAnRm9ydGgnLFxuICAgICAgc2NvcGVOYW1lOiAnc291cmNlLmZvcnRoJyB9O1xuXG5cbm9vcC5pbmhlcml0cyhGb3J0aEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkZvcnRoSGlnaGxpZ2h0UnVsZXMgPSBGb3J0aEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9