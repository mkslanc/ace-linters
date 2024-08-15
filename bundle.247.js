"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[247],{

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

/***/ 70247:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var IoHighlightRules = (__webpack_require__(18260)/* .IoHighlightRules */ .a);
var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = IoHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};
    // Extra logic goes here.
    this.$id = "ace/mode/io";
    this.snippetFileId = "ace/snippets/io";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 18260:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* This file was autogenerated from tm bundles\io.tmbundle/Syntaxes/io.plist (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var IoHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = { start: 
       [ { token: 'keyword.control.io',
           regex: '\\b(?:if|ifTrue|ifFalse|ifTrueIfFalse|for|loop|reverseForeach|foreach|map|continue|break|while|do|return)\\b' },
         { token: 'punctuation.definition.comment.io',
           regex: '/\\*',
           push: 
            [ { token: 'punctuation.definition.comment.io',
                regex: '\\*/',
                next: 'pop' },
              { defaultToken: 'comment.block.io' } ] },
         { token: 'punctuation.definition.comment.io',
           regex: '//',
           push: 
            [ { token: 'comment.line.double-slash.io',
                regex: '$',
                next: 'pop' },
              { defaultToken: 'comment.line.double-slash.io' } ] },
         { token: 'punctuation.definition.comment.io',
           regex: '#',
           push: 
            [ { token: 'comment.line.number-sign.io', regex: '$', next: 'pop' },
              { defaultToken: 'comment.line.number-sign.io' } ] },
         { token: 'variable.language.io',
           regex: '\\b(?:self|sender|target|proto|protos|parent)\\b',
           comment: 'I wonder if some of this isn\'t variable.other.language? --Allan; scoping this as variable.language to match Objective-C\'s handling of \'self\', which is inconsistent with C++\'s handling of \'this\' but perhaps intentionally so -- Rob' },
         { token: 'keyword.operator.io',
           regex: '<=|>=|=|:=|\\*|\\||\\|\\||\\+|-|/|&|&&|>|<|\\?|@|@@|\\b(?:and|or)\\b' },
         { token: 'constant.other.io', regex: '\\bGL[\\w_]+\\b' },
         { token: 'support.class.io', regex: '\\b[A-Z](?:\\w+)?\\b' },
         { token: 'support.function.io',
           regex: '\\b(?:clone|call|init|method|list|vector|block|\\w+(?=\\s*\\())\\b' },
         { token: 'support.function.open-gl.io',
           regex: '\\bgl(?:u|ut)?[A-Z]\\w+\\b' },
         { token: 'punctuation.definition.string.begin.io',
           regex: '"""',
           push: 
            [ { token: 'punctuation.definition.string.end.io',
                regex: '"""',
                next: 'pop' },
              { token: 'constant.character.escape.io', regex: '\\\\.' },
              { defaultToken: 'string.quoted.triple.io' } ] },
         { token: 'punctuation.definition.string.begin.io',
           regex: '"',
           push: 
            [ { token: 'punctuation.definition.string.end.io',
                regex: '"',
                next: 'pop' },
              { token: 'constant.character.escape.io', regex: '\\\\.' },
              { defaultToken: 'string.quoted.double.io' } ] },
         { token: 'constant.numeric.io',
           regex: '\\b(?:0(?:x|X)[0-9a-fA-F]*|(?:[0-9]+\\.?[0-9]*|\\.[0-9]+)(?:(?:e|E)(?:\\+|-)?[0-9]+)?)(?:L|l|UL|ul|u|U|F|f)?\\b' },
         { token: 'variable.other.global.io', regex: 'Lobby\\b' },
         { token: 'constant.language.io',
           regex: '\\b(?:TRUE|true|FALSE|false|NULL|null|Null|Nil|nil|YES|NO)\\b' } ] };
    
    this.normalizeRules();
};

IoHighlightRules.metaData = { fileTypes: [ 'io' ],
      keyEquivalent: '^~I',
      name: 'Io',
      scopeName: 'source.io' };


oop.inherits(IoHighlightRules, TextHighlightRules);

exports.a = IoHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QkFBZ0IsMENBQTBDLEdBQUc7QUFDN0QsV0FBVztBQUNYLHFJQUFxSTtBQUNySSxXQUFXLHNEQUFzRDtBQUNqRSxXQUFXO0FBQ1gsb0ZBQW9GO0FBQ3BGO0FBQ0E7QUFDQTs7QUFFQSw4QkFBOEI7QUFDOUI7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxTQUF3QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9pby5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2lvX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIi8qXG4gIFRISVMgRklMRSBXQVMgQVVUT0dFTkVSQVRFRCBCWSBtb2RlLnRtcGwuanNcbiovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgSW9IaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2lvX2hpZ2hsaWdodF9ydWxlc1wiKS5Jb0hpZ2hsaWdodFJ1bGVzO1xudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IElvSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi8vXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiLypcIiwgZW5kOiBcIiovXCJ9O1xuICAgIC8vIEV4dHJhIGxvZ2ljIGdvZXMgaGVyZS5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvaW9cIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9pb1wiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCIvKiBUaGlzIGZpbGUgd2FzIGF1dG9nZW5lcmF0ZWQgZnJvbSB0bSBidW5kbGVzXFxpby50bWJ1bmRsZS9TeW50YXhlcy9pby5wbGlzdCAodXVpZDogKSAqL1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIElUIE1JR0hUIE5PVCBCRSBQRVJGRUNUIC4uLkJ1dCBpdCdzIGEgZ29vZCBzdGFydCBmcm9tIGFuIGV4aXN0aW5nICoudG1sYW5ndWFnZSBmaWxlLiAqXG4gKiBmaWxlVHlwZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgSW9IaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHsgc3RhcnQ6IFxuICAgICAgIFsgeyB0b2tlbjogJ2tleXdvcmQuY29udHJvbC5pbycsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGIoPzppZnxpZlRydWV8aWZGYWxzZXxpZlRydWVJZkZhbHNlfGZvcnxsb29wfHJldmVyc2VGb3JlYWNofGZvcmVhY2h8bWFwfGNvbnRpbnVlfGJyZWFrfHdoaWxlfGRvfHJldHVybilcXFxcYicgfSxcbiAgICAgICAgIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmNvbW1lbnQuaW8nLFxuICAgICAgICAgICByZWdleDogJy9cXFxcKicsXG4gICAgICAgICAgIHB1c2g6IFxuICAgICAgICAgICAgWyB7IHRva2VuOiAncHVuY3R1YXRpb24uZGVmaW5pdGlvbi5jb21tZW50LmlvJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFwqLycsXG4gICAgICAgICAgICAgICAgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdjb21tZW50LmJsb2NrLmlvJyB9IF0gfSxcbiAgICAgICAgIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmNvbW1lbnQuaW8nLFxuICAgICAgICAgICByZWdleDogJy8vJyxcbiAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICBbIHsgdG9rZW46ICdjb21tZW50LmxpbmUuZG91YmxlLXNsYXNoLmlvJyxcbiAgICAgICAgICAgICAgICByZWdleDogJyQnLFxuICAgICAgICAgICAgICAgIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnY29tbWVudC5saW5lLmRvdWJsZS1zbGFzaC5pbycgfSBdIH0sXG4gICAgICAgICB7IHRva2VuOiAncHVuY3R1YXRpb24uZGVmaW5pdGlvbi5jb21tZW50LmlvJyxcbiAgICAgICAgICAgcmVnZXg6ICcjJyxcbiAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICBbIHsgdG9rZW46ICdjb21tZW50LmxpbmUubnVtYmVyLXNpZ24uaW8nLCByZWdleDogJyQnLCBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ2NvbW1lbnQubGluZS5udW1iZXItc2lnbi5pbycgfSBdIH0sXG4gICAgICAgICB7IHRva2VuOiAndmFyaWFibGUubGFuZ3VhZ2UuaW8nLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiKD86c2VsZnxzZW5kZXJ8dGFyZ2V0fHByb3RvfHByb3Rvc3xwYXJlbnQpXFxcXGInLFxuICAgICAgICAgICBjb21tZW50OiAnSSB3b25kZXIgaWYgc29tZSBvZiB0aGlzIGlzblxcJ3QgdmFyaWFibGUub3RoZXIubGFuZ3VhZ2U/IC0tQWxsYW47IHNjb3BpbmcgdGhpcyBhcyB2YXJpYWJsZS5sYW5ndWFnZSB0byBtYXRjaCBPYmplY3RpdmUtQ1xcJ3MgaGFuZGxpbmcgb2YgXFwnc2VsZlxcJywgd2hpY2ggaXMgaW5jb25zaXN0ZW50IHdpdGggQysrXFwncyBoYW5kbGluZyBvZiBcXCd0aGlzXFwnIGJ1dCBwZXJoYXBzIGludGVudGlvbmFsbHkgc28gLS0gUm9iJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQub3BlcmF0b3IuaW8nLFxuICAgICAgICAgICByZWdleDogJzw9fD49fD18Oj18XFxcXCp8XFxcXHx8XFxcXHxcXFxcfHxcXFxcK3wtfC98JnwmJnw+fDx8XFxcXD98QHxAQHxcXFxcYig/OmFuZHxvcilcXFxcYicgfSxcbiAgICAgICAgIHsgdG9rZW46ICdjb25zdGFudC5vdGhlci5pbycsIHJlZ2V4OiAnXFxcXGJHTFtcXFxcd19dK1xcXFxiJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ3N1cHBvcnQuY2xhc3MuaW8nLCByZWdleDogJ1xcXFxiW0EtWl0oPzpcXFxcdyspP1xcXFxiJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ3N1cHBvcnQuZnVuY3Rpb24uaW8nLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiKD86Y2xvbmV8Y2FsbHxpbml0fG1ldGhvZHxsaXN0fHZlY3RvcnxibG9ja3xcXFxcdysoPz1cXFxccypcXFxcKCkpXFxcXGInIH0sXG4gICAgICAgICB7IHRva2VuOiAnc3VwcG9ydC5mdW5jdGlvbi5vcGVuLWdsLmlvJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXFxcYmdsKD86dXx1dCk/W0EtWl1cXFxcdytcXFxcYicgfSxcbiAgICAgICAgIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5iZWdpbi5pbycsXG4gICAgICAgICAgIHJlZ2V4OiAnXCJcIlwiJyxcbiAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICBbIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5lbmQuaW8nLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXCJcIlwiJyxcbiAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICB7IHRva2VuOiAnY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZS5pbycsIHJlZ2V4OiAnXFxcXFxcXFwuJyB9LFxuICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ3N0cmluZy5xdW90ZWQudHJpcGxlLmlvJyB9IF0gfSxcbiAgICAgICAgIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5iZWdpbi5pbycsXG4gICAgICAgICAgIHJlZ2V4OiAnXCInLFxuICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgIFsgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmVuZC5pbycsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcIicsXG4gICAgICAgICAgICAgICAgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ2NvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUuaW8nLCByZWdleDogJ1xcXFxcXFxcLicgfSxcbiAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdzdHJpbmcucXVvdGVkLmRvdWJsZS5pbycgfSBdIH0sXG4gICAgICAgICB7IHRva2VuOiAnY29uc3RhbnQubnVtZXJpYy5pbycsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGIoPzowKD86eHxYKVswLTlhLWZBLUZdKnwoPzpbMC05XStcXFxcLj9bMC05XSp8XFxcXC5bMC05XSspKD86KD86ZXxFKSg/OlxcXFwrfC0pP1swLTldKyk/KSg/Okx8bHxVTHx1bHx1fFV8RnxmKT9cXFxcYicgfSxcbiAgICAgICAgIHsgdG9rZW46ICd2YXJpYWJsZS5vdGhlci5nbG9iYWwuaW8nLCByZWdleDogJ0xvYmJ5XFxcXGInIH0sXG4gICAgICAgICB7IHRva2VuOiAnY29uc3RhbnQubGFuZ3VhZ2UuaW8nLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiKD86VFJVRXx0cnVlfEZBTFNFfGZhbHNlfE5VTEx8bnVsbHxOdWxsfE5pbHxuaWx8WUVTfE5PKVxcXFxiJyB9IF0gfTtcbiAgICBcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5Jb0hpZ2hsaWdodFJ1bGVzLm1ldGFEYXRhID0geyBmaWxlVHlwZXM6IFsgJ2lvJyBdLFxuICAgICAga2V5RXF1aXZhbGVudDogJ15+SScsXG4gICAgICBuYW1lOiAnSW8nLFxuICAgICAgc2NvcGVOYW1lOiAnc291cmNlLmlvJyB9O1xuXG5cbm9vcC5pbmhlcml0cyhJb0hpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLklvSGlnaGxpZ2h0UnVsZXMgPSBJb0hpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9