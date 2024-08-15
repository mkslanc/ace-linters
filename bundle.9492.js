"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9492],{

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

/***/ 29492:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var PrologHighlightRules = (__webpack_require__(82391)/* .PrologHighlightRules */ .V);
var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = PrologHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "%";
    this.blockComment = {start: "/*", end: "*/"};
    this.$id = "ace/mode/prolog";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 82391:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* This file was autogenerated from https://raw.github.com/stephenroller/prolog-tmbundle/master/Syntaxes/Prolog.tmLanguage (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var PrologHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = { start: 
       [ { include: '#comment' },
         { include: '#basic_fact' },
         { include: '#rule' },
         { include: '#directive' },
         { include: '#fact' } ],
      '#atom': 
       [ { token: 'constant.other.atom.prolog',
           regex: '\\b[a-z][a-zA-Z0-9_]*\\b' },
         { token: 'constant.numeric.prolog',
           regex: '-?\\d+(?:\\.\\d+)?' },
         { include: '#string' } ],
      '#basic_elem': 
       [ { include: '#comment' },
         { include: '#statement' },
         { include: '#constants' },
         { include: '#operators' },
         { include: '#builtins' },
         { include: '#list' },
         { include: '#atom' },
         { include: '#variable' } ],
      '#basic_fact': 
       [ { token: 
            [ 'entity.name.function.fact.basic.prolog',
              'punctuation.end.fact.basic.prolog' ],
           regex: '([a-z]\\w*)(\\.)' } ],
      '#builtins': 
       [ { token: 'support.function.builtin.prolog',
           regex: '\\b(?:abolish|abort|ancestors|arg|ascii|assert[az]|atom(?:ic)?|body|char|close|conc|concat|consult|define|definition|dynamic|dump|fail|file|free|free_proc|functor|getc|goal|halt|head|head|integer|length|listing|match_args|member|next_clause|nl|nonvar|nth|number|cvars|nvars|offset|op|print?|prompt|putc|quoted|ratom|read|redefine|rename|retract(?:all)?|see|seeing|seen|skip|spy|statistics|system|tab|tell|telling|term|time|told|univ|unlink_clause|unspy_predicate|var|write)\\b' } ],
      '#comment': 
       [ { token: 
            [ 'punctuation.definition.comment.prolog',
              'comment.line.percentage.prolog' ],
           regex: '(%)(.*$)' },
         { token: 'punctuation.definition.comment.prolog',
           regex: '/\\*',
           push: 
            [ { token: 'punctuation.definition.comment.prolog',
                regex: '\\*/',
                next: 'pop' },
              { defaultToken: 'comment.block.prolog' } ] } ],
      '#constants': 
       [ { token: 'constant.language.prolog',
           regex: '\\b(?:true|false|yes|no)\\b' } ],
      '#directive': 
       [ { token: 'keyword.operator.directive.prolog',
           regex: ':-',
           push: 
            [ { token: 'meta.directive.prolog', regex: '\\.', next: 'pop' },
              { include: '#comment' },
              { include: '#statement' },
              { defaultToken: 'meta.directive.prolog' } ] } ],
      '#expr': 
       [ { include: '#comments' },
         { token: 'meta.expression.prolog',
           regex: '\\(',
           push: 
            [ { token: 'meta.expression.prolog', regex: '\\)', next: 'pop' },
              { include: '#expr' },
              { defaultToken: 'meta.expression.prolog' } ] },
         { token: 'keyword.control.cutoff.prolog', regex: '!' },
         { token: 'punctuation.control.and.prolog', regex: ',' },
         { token: 'punctuation.control.or.prolog', regex: ';' },
         { include: '#basic_elem' } ],
      '#fact': 
       [ { token: 
            [ 'entity.name.function.fact.prolog',
              'punctuation.begin.fact.parameters.prolog' ],
           regex: '([a-z]\\w*)(\\()(?!.*:-)',
           push: 
            [ { token: 
                 [ 'punctuation.end.fact.parameters.prolog',
                   'punctuation.end.fact.prolog' ],
                regex: '(\\))(\\.?)',
                next: 'pop' },
              { include: '#parameter' },
              { defaultToken: 'meta.fact.prolog' } ] } ],
      '#list': 
       [ { token: 'punctuation.begin.list.prolog',
           regex: '\\[(?=.*\\])',
           push: 
            [ { token: 'punctuation.end.list.prolog',
                regex: '\\]',
                next: 'pop' },
              { include: '#comment' },
              { token: 'punctuation.separator.list.prolog', regex: ',' },
              { token: 'punctuation.concat.list.prolog',
                regex: '\\|',
                push: 
                 [ { token: 'meta.list.concat.prolog',
                     regex: '(?=\\s*\\])',
                     next: 'pop' },
                   { include: '#basic_elem' },
                   { defaultToken: 'meta.list.concat.prolog' } ] },
              { include: '#basic_elem' },
              { defaultToken: 'meta.list.prolog' } ] } ],
      '#operators': 
       [ { token: 'keyword.operator.prolog',
           regex: '\\\\\\+|\\bnot\\b|\\bis\\b|->|[><]|[><\\\\:=]?=|(?:=\\\\|\\\\=)=' } ],
      '#parameter': 
       [ { token: 'variable.language.anonymous.prolog',
           regex: '\\b_\\b' },
         { token: 'variable.parameter.prolog',
           regex: '\\b[A-Z_]\\w*\\b' },
         { token: 'punctuation.separator.parameters.prolog', regex: ',' },
         { include: '#basic_elem' },
         { token: 'text', regex: '[^\\s]' } ],
      '#rule': 
       [ { token: 'meta.rule.prolog',
           regex: '(?=[a-z]\\w*.*:-)',
           push: 
            [ { token: 'punctuation.rule.end.prolog',
                regex: '\\.',
                next: 'pop' },
              { token: 'meta.rule.signature.prolog',
                regex: '(?=[a-z]\\w*.*:-)',
                push: 
                 [ { token: 'meta.rule.signature.prolog',
                     regex: '(?=:-)',
                     next: 'pop' },
                   { token: 'entity.name.function.rule.prolog',
                     regex: '[a-z]\\w*(?=\\(|\\s*:-)' },
                   { token: 'punctuation.rule.parameters.begin.prolog',
                     regex: '\\(',
                     push: 
                      [ { token: 'punctuation.rule.parameters.end.prolog',
                          regex: '\\)',
                          next: 'pop' },
                        { include: '#parameter' },
                        { defaultToken: 'meta.rule.parameters.prolog' } ] },
                   { defaultToken: 'meta.rule.signature.prolog' } ] },
              { token: 'keyword.operator.definition.prolog',
                regex: ':-',
                push: 
                 [ { token: 'meta.rule.definition.prolog',
                     regex: '(?=\\.)',
                     next: 'pop' },
                   { include: '#comment' },
                   { include: '#expr' },
                   { defaultToken: 'meta.rule.definition.prolog' } ] },
              { defaultToken: 'meta.rule.prolog' } ] } ],
      '#statement': 
       [ { token: 'meta.statement.prolog',
           regex: '(?=[a-z]\\w*\\()',
           push: 
            [ { token: 'punctuation.end.statement.parameters.prolog',
                regex: '\\)',
                next: 'pop' },
              { include: '#builtins' },
              { include: '#atom' },
              { token: 'punctuation.begin.statement.parameters.prolog',
                regex: '\\(',
                push: 
                 [ { token: 'meta.statement.parameters.prolog',
                     regex: '(?=\\))',
                     next: 'pop' },
                   { token: 'punctuation.separator.statement.prolog', regex: ',' },
                   { include: '#basic_elem' },
                   { defaultToken: 'meta.statement.parameters.prolog' } ] },
              { defaultToken: 'meta.statement.prolog' } ] } ],
      '#string': 
       [ { token: 'punctuation.definition.string.begin.prolog',
           regex: '\'',
           push: 
            [ { token: 'punctuation.definition.string.end.prolog',
                regex: '\'',
                next: 'pop' },
              { token: 'constant.character.escape.prolog', regex: '\\\\.' },
              { token: 'constant.character.escape.quote.prolog',
                regex: '\'\'' },
              { defaultToken: 'string.quoted.single.prolog' } ] } ],
      '#variable': 
       [ { token: 'variable.language.anonymous.prolog',
           regex: '\\b_\\b' },
         { token: 'variable.other.prolog',
           regex: '\\b[A-Z_][a-zA-Z0-9_]*\\b' } ] };
    
    this.normalizeRules();
};

PrologHighlightRules.metaData = { fileTypes: [ 'plg', 'prolog' ],
      foldingStartMarker: '(%\\s*region \\w*)|([a-z]\\w*.*:- ?)',
      foldingStopMarker: '(%\\s*end(\\s*region)?)|(?=\\.)',
      keyEquivalent: '^~P',
      name: 'Prolog',
      scopeName: 'source.prolog' };


oop.inherits(PrologHighlightRules, TextHighlightRules);

exports.V = PrologHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBLHVDQUF1QztBQUN2QywwQkFBMEIsdUJBQXVCO0FBQ2pELDBCQUEwQiw4Q0FBOEMsR0FBRztBQUMzRSxxQkFBcUIsNkNBQTZDLEdBQUc7QUFDckUsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxrQ0FBa0M7QUFDbEMscUJBQXFCLHFCQUFxQjtBQUMxQyxxQkFBcUIsa0JBQWtCO0FBQ3ZDLHFCQUFxQiw4Q0FBOEMsR0FBRztBQUN0RSxnQkFBZ0IsbUNBQW1DLElBQUk7QUFDdkQ7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBLDZCQUE2QjtBQUM3QixnQkFBZ0Isc0JBQXNCO0FBQ3RDLGdCQUFnQixrQkFBa0I7QUFDbEMsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxrQ0FBa0M7QUFDbEMscUJBQXFCLDZEQUE2RDtBQUNsRixxQkFBcUIsd0JBQXdCO0FBQzdDLHFCQUFxQixtREFBbUQsR0FBRztBQUMzRSxnQkFBZ0Isd0NBQXdDLElBQUk7QUFDNUQ7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBLDZCQUE2QjtBQUM3QixnQkFBZ0IsMkRBQTJEO0FBQzNFLGdCQUFnQjtBQUNoQiwrQkFBK0I7QUFDL0IsZ0JBQWdCLDhDQUE4QyxJQUFJO0FBQ2xFO0FBQ0EsV0FBVztBQUNYLDZCQUE2QjtBQUM3QixXQUFXO0FBQ1gsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQSxrQ0FBa0M7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsU0FBNEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcHJvbG9nLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcHJvbG9nX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIi8qXG4gIFRISVMgRklMRSBXQVMgQVVUT0dFTkVSQVRFRCBCWSBtb2RlLnRtcGwuanNcbiovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgUHJvbG9nSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9wcm9sb2dfaGlnaGxpZ2h0X3J1bGVzXCIpLlByb2xvZ0hpZ2hsaWdodFJ1bGVzO1xudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFByb2xvZ0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIlXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiLypcIiwgZW5kOiBcIiovXCJ9O1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9wcm9sb2dcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiLyogVGhpcyBmaWxlIHdhcyBhdXRvZ2VuZXJhdGVkIGZyb20gaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS9zdGVwaGVucm9sbGVyL3Byb2xvZy10bWJ1bmRsZS9tYXN0ZXIvU3ludGF4ZXMvUHJvbG9nLnRtTGFuZ3VhZ2UgKHV1aWQ6ICkgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBJVCBNSUdIVCBOT1QgQkUgUEVSRkVDVCAuLi5CdXQgaXQncyBhIGdvb2Qgc3RhcnQgZnJvbSBhbiBleGlzdGluZyAqLnRtbGFuZ3VhZ2UgZmlsZS4gKlxuICogZmlsZVR5cGVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIFByb2xvZ0hpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0geyBzdGFydDogXG4gICAgICAgWyB7IGluY2x1ZGU6ICcjY29tbWVudCcgfSxcbiAgICAgICAgIHsgaW5jbHVkZTogJyNiYXNpY19mYWN0JyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI3J1bGUnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjZGlyZWN0aXZlJyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI2ZhY3QnIH0gXSxcbiAgICAgICcjYXRvbSc6IFxuICAgICAgIFsgeyB0b2tlbjogJ2NvbnN0YW50Lm90aGVyLmF0b20ucHJvbG9nJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXFxcYlthLXpdW2EtekEtWjAtOV9dKlxcXFxiJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2NvbnN0YW50Lm51bWVyaWMucHJvbG9nJyxcbiAgICAgICAgICAgcmVnZXg6ICctP1xcXFxkKyg/OlxcXFwuXFxcXGQrKT8nIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjc3RyaW5nJyB9IF0sXG4gICAgICAnI2Jhc2ljX2VsZW0nOiBcbiAgICAgICBbIHsgaW5jbHVkZTogJyNjb21tZW50JyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI3N0YXRlbWVudCcgfSxcbiAgICAgICAgIHsgaW5jbHVkZTogJyNjb25zdGFudHMnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjb3BlcmF0b3JzJyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI2J1aWx0aW5zJyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI2xpc3QnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjYXRvbScgfSxcbiAgICAgICAgIHsgaW5jbHVkZTogJyN2YXJpYWJsZScgfSBdLFxuICAgICAgJyNiYXNpY19mYWN0JzogXG4gICAgICAgWyB7IHRva2VuOiBcbiAgICAgICAgICAgIFsgJ2VudGl0eS5uYW1lLmZ1bmN0aW9uLmZhY3QuYmFzaWMucHJvbG9nJyxcbiAgICAgICAgICAgICAgJ3B1bmN0dWF0aW9uLmVuZC5mYWN0LmJhc2ljLnByb2xvZycgXSxcbiAgICAgICAgICAgcmVnZXg6ICcoW2Etel1cXFxcdyopKFxcXFwuKScgfSBdLFxuICAgICAgJyNidWlsdGlucyc6IFxuICAgICAgIFsgeyB0b2tlbjogJ3N1cHBvcnQuZnVuY3Rpb24uYnVpbHRpbi5wcm9sb2cnLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiKD86YWJvbGlzaHxhYm9ydHxhbmNlc3RvcnN8YXJnfGFzY2lpfGFzc2VydFthel18YXRvbSg/OmljKT98Ym9keXxjaGFyfGNsb3NlfGNvbmN8Y29uY2F0fGNvbnN1bHR8ZGVmaW5lfGRlZmluaXRpb258ZHluYW1pY3xkdW1wfGZhaWx8ZmlsZXxmcmVlfGZyZWVfcHJvY3xmdW5jdG9yfGdldGN8Z29hbHxoYWx0fGhlYWR8aGVhZHxpbnRlZ2VyfGxlbmd0aHxsaXN0aW5nfG1hdGNoX2FyZ3N8bWVtYmVyfG5leHRfY2xhdXNlfG5sfG5vbnZhcnxudGh8bnVtYmVyfGN2YXJzfG52YXJzfG9mZnNldHxvcHxwcmludD98cHJvbXB0fHB1dGN8cXVvdGVkfHJhdG9tfHJlYWR8cmVkZWZpbmV8cmVuYW1lfHJldHJhY3QoPzphbGwpP3xzZWV8c2VlaW5nfHNlZW58c2tpcHxzcHl8c3RhdGlzdGljc3xzeXN0ZW18dGFifHRlbGx8dGVsbGluZ3x0ZXJtfHRpbWV8dG9sZHx1bml2fHVubGlua19jbGF1c2V8dW5zcHlfcHJlZGljYXRlfHZhcnx3cml0ZSlcXFxcYicgfSBdLFxuICAgICAgJyNjb21tZW50JzogXG4gICAgICAgWyB7IHRva2VuOiBcbiAgICAgICAgICAgIFsgJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24uY29tbWVudC5wcm9sb2cnLFxuICAgICAgICAgICAgICAnY29tbWVudC5saW5lLnBlcmNlbnRhZ2UucHJvbG9nJyBdLFxuICAgICAgICAgICByZWdleDogJyglKSguKiQpJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24uY29tbWVudC5wcm9sb2cnLFxuICAgICAgICAgICByZWdleDogJy9cXFxcKicsXG4gICAgICAgICAgIHB1c2g6IFxuICAgICAgICAgICAgWyB7IHRva2VuOiAncHVuY3R1YXRpb24uZGVmaW5pdGlvbi5jb21tZW50LnByb2xvZycsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcKi8nLFxuICAgICAgICAgICAgICAgIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnY29tbWVudC5ibG9jay5wcm9sb2cnIH0gXSB9IF0sXG4gICAgICAnI2NvbnN0YW50cyc6IFxuICAgICAgIFsgeyB0b2tlbjogJ2NvbnN0YW50Lmxhbmd1YWdlLnByb2xvZycsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGIoPzp0cnVlfGZhbHNlfHllc3xubylcXFxcYicgfSBdLFxuICAgICAgJyNkaXJlY3RpdmUnOiBcbiAgICAgICBbIHsgdG9rZW46ICdrZXl3b3JkLm9wZXJhdG9yLmRpcmVjdGl2ZS5wcm9sb2cnLFxuICAgICAgICAgICByZWdleDogJzotJyxcbiAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICBbIHsgdG9rZW46ICdtZXRhLmRpcmVjdGl2ZS5wcm9sb2cnLCByZWdleDogJ1xcXFwuJywgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI2NvbW1lbnQnIH0sXG4gICAgICAgICAgICAgIHsgaW5jbHVkZTogJyNzdGF0ZW1lbnQnIH0sXG4gICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnbWV0YS5kaXJlY3RpdmUucHJvbG9nJyB9IF0gfSBdLFxuICAgICAgJyNleHByJzogXG4gICAgICAgWyB7IGluY2x1ZGU6ICcjY29tbWVudHMnIH0sXG4gICAgICAgICB7IHRva2VuOiAnbWV0YS5leHByZXNzaW9uLnByb2xvZycsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXCgnLFxuICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgIFsgeyB0b2tlbjogJ21ldGEuZXhwcmVzc2lvbi5wcm9sb2cnLCByZWdleDogJ1xcXFwpJywgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI2V4cHInIH0sXG4gICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnbWV0YS5leHByZXNzaW9uLnByb2xvZycgfSBdIH0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5jb250cm9sLmN1dG9mZi5wcm9sb2cnLCByZWdleDogJyEnIH0sXG4gICAgICAgICB7IHRva2VuOiAncHVuY3R1YXRpb24uY29udHJvbC5hbmQucHJvbG9nJywgcmVnZXg6ICcsJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLmNvbnRyb2wub3IucHJvbG9nJywgcmVnZXg6ICc7JyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI2Jhc2ljX2VsZW0nIH0gXSxcbiAgICAgICcjZmFjdCc6IFxuICAgICAgIFsgeyB0b2tlbjogXG4gICAgICAgICAgICBbICdlbnRpdHkubmFtZS5mdW5jdGlvbi5mYWN0LnByb2xvZycsXG4gICAgICAgICAgICAgICdwdW5jdHVhdGlvbi5iZWdpbi5mYWN0LnBhcmFtZXRlcnMucHJvbG9nJyBdLFxuICAgICAgICAgICByZWdleDogJyhbYS16XVxcXFx3KikoXFxcXCgpKD8hLio6LSknLFxuICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgIFsgeyB0b2tlbjogXG4gICAgICAgICAgICAgICAgIFsgJ3B1bmN0dWF0aW9uLmVuZC5mYWN0LnBhcmFtZXRlcnMucHJvbG9nJyxcbiAgICAgICAgICAgICAgICAgICAncHVuY3R1YXRpb24uZW5kLmZhY3QucHJvbG9nJyBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnKFxcXFwpKShcXFxcLj8pJyxcbiAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjcGFyYW1ldGVyJyB9LFxuICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ21ldGEuZmFjdC5wcm9sb2cnIH0gXSB9IF0sXG4gICAgICAnI2xpc3QnOiBcbiAgICAgICBbIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5iZWdpbi5saXN0LnByb2xvZycsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXFsoPz0uKlxcXFxdKScsXG4gICAgICAgICAgIHB1c2g6IFxuICAgICAgICAgICAgWyB7IHRva2VuOiAncHVuY3R1YXRpb24uZW5kLmxpc3QucHJvbG9nJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFxdJyxcbiAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjY29tbWVudCcgfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLnNlcGFyYXRvci5saXN0LnByb2xvZycsIHJlZ2V4OiAnLCcgfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLmNvbmNhdC5saXN0LnByb2xvZycsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcfCcsXG4gICAgICAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICAgICAgIFsgeyB0b2tlbjogJ21ldGEubGlzdC5jb25jYXQucHJvbG9nJyxcbiAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnKD89XFxcXHMqXFxcXF0pJyxcbiAgICAgICAgICAgICAgICAgICAgIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI2Jhc2ljX2VsZW0nIH0sXG4gICAgICAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdtZXRhLmxpc3QuY29uY2F0LnByb2xvZycgfSBdIH0sXG4gICAgICAgICAgICAgIHsgaW5jbHVkZTogJyNiYXNpY19lbGVtJyB9LFxuICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ21ldGEubGlzdC5wcm9sb2cnIH0gXSB9IF0sXG4gICAgICAnI29wZXJhdG9ycyc6IFxuICAgICAgIFsgeyB0b2tlbjogJ2tleXdvcmQub3BlcmF0b3IucHJvbG9nJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXFxcXFxcXFxcXFwrfFxcXFxibm90XFxcXGJ8XFxcXGJpc1xcXFxifC0+fFs+PF18Wz48XFxcXFxcXFw6PV0/PXwoPzo9XFxcXFxcXFx8XFxcXFxcXFw9KT0nIH0gXSxcbiAgICAgICcjcGFyYW1ldGVyJzogXG4gICAgICAgWyB7IHRva2VuOiAndmFyaWFibGUubGFuZ3VhZ2UuYW5vbnltb3VzLnByb2xvZycsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGJfXFxcXGInIH0sXG4gICAgICAgICB7IHRva2VuOiAndmFyaWFibGUucGFyYW1ldGVyLnByb2xvZycsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGJbQS1aX11cXFxcdypcXFxcYicgfSxcbiAgICAgICAgIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5zZXBhcmF0b3IucGFyYW1ldGVycy5wcm9sb2cnLCByZWdleDogJywnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjYmFzaWNfZWxlbScgfSxcbiAgICAgICAgIHsgdG9rZW46ICd0ZXh0JywgcmVnZXg6ICdbXlxcXFxzXScgfSBdLFxuICAgICAgJyNydWxlJzogXG4gICAgICAgWyB7IHRva2VuOiAnbWV0YS5ydWxlLnByb2xvZycsXG4gICAgICAgICAgIHJlZ2V4OiAnKD89W2Etel1cXFxcdyouKjotKScsXG4gICAgICAgICAgIHB1c2g6IFxuICAgICAgICAgICAgWyB7IHRva2VuOiAncHVuY3R1YXRpb24ucnVsZS5lbmQucHJvbG9nJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFwuJyxcbiAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICB7IHRva2VuOiAnbWV0YS5ydWxlLnNpZ25hdHVyZS5wcm9sb2cnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnKD89W2Etel1cXFxcdyouKjotKScsXG4gICAgICAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICAgICAgIFsgeyB0b2tlbjogJ21ldGEucnVsZS5zaWduYXR1cmUucHJvbG9nJyxcbiAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnKD89Oi0pJyxcbiAgICAgICAgICAgICAgICAgICAgIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgICAgICAgeyB0b2tlbjogJ2VudGl0eS5uYW1lLmZ1bmN0aW9uLnJ1bGUucHJvbG9nJyxcbiAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnW2Etel1cXFxcdyooPz1cXFxcKHxcXFxccyo6LSknIH0sXG4gICAgICAgICAgICAgICAgICAgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLnJ1bGUucGFyYW1ldGVycy5iZWdpbi5wcm9sb2cnLFxuICAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcKCcsXG4gICAgICAgICAgICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgICAgICAgICAgICBbIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5ydWxlLnBhcmFtZXRlcnMuZW5kLnByb2xvZycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFxcXCknLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI3BhcmFtZXRlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnbWV0YS5ydWxlLnBhcmFtZXRlcnMucHJvbG9nJyB9IF0gfSxcbiAgICAgICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ21ldGEucnVsZS5zaWduYXR1cmUucHJvbG9nJyB9IF0gfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQub3BlcmF0b3IuZGVmaW5pdGlvbi5wcm9sb2cnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnOi0nLFxuICAgICAgICAgICAgICAgIHB1c2g6IFxuICAgICAgICAgICAgICAgICBbIHsgdG9rZW46ICdtZXRhLnJ1bGUuZGVmaW5pdGlvbi5wcm9sb2cnLFxuICAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICcoPz1cXFxcLiknLFxuICAgICAgICAgICAgICAgICAgICAgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjY29tbWVudCcgfSxcbiAgICAgICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjZXhwcicgfSxcbiAgICAgICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ21ldGEucnVsZS5kZWZpbml0aW9uLnByb2xvZycgfSBdIH0sXG4gICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnbWV0YS5ydWxlLnByb2xvZycgfSBdIH0gXSxcbiAgICAgICcjc3RhdGVtZW50JzogXG4gICAgICAgWyB7IHRva2VuOiAnbWV0YS5zdGF0ZW1lbnQucHJvbG9nJyxcbiAgICAgICAgICAgcmVnZXg6ICcoPz1bYS16XVxcXFx3KlxcXFwoKScsXG4gICAgICAgICAgIHB1c2g6IFxuICAgICAgICAgICAgWyB7IHRva2VuOiAncHVuY3R1YXRpb24uZW5kLnN0YXRlbWVudC5wYXJhbWV0ZXJzLnByb2xvZycsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcKScsXG4gICAgICAgICAgICAgICAgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI2J1aWx0aW5zJyB9LFxuICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjYXRvbScgfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLmJlZ2luLnN0YXRlbWVudC5wYXJhbWV0ZXJzLnByb2xvZycsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcKCcsXG4gICAgICAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICAgICAgIFsgeyB0b2tlbjogJ21ldGEuc3RhdGVtZW50LnBhcmFtZXRlcnMucHJvbG9nJyxcbiAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnKD89XFxcXCkpJyxcbiAgICAgICAgICAgICAgICAgICAgIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgICAgICAgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLnNlcGFyYXRvci5zdGF0ZW1lbnQucHJvbG9nJywgcmVnZXg6ICcsJyB9LFxuICAgICAgICAgICAgICAgICAgIHsgaW5jbHVkZTogJyNiYXNpY19lbGVtJyB9LFxuICAgICAgICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnbWV0YS5zdGF0ZW1lbnQucGFyYW1ldGVycy5wcm9sb2cnIH0gXSB9LFxuICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ21ldGEuc3RhdGVtZW50LnByb2xvZycgfSBdIH0gXSxcbiAgICAgICcjc3RyaW5nJzogXG4gICAgICAgWyB7IHRva2VuOiAncHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuYmVnaW4ucHJvbG9nJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXCcnLFxuICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgIFsgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmVuZC5wcm9sb2cnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFwnJyxcbiAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICB7IHRva2VuOiAnY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZS5wcm9sb2cnLCByZWdleDogJ1xcXFxcXFxcLicgfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ2NvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUucXVvdGUucHJvbG9nJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcJ1xcJycgfSxcbiAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdzdHJpbmcucXVvdGVkLnNpbmdsZS5wcm9sb2cnIH0gXSB9IF0sXG4gICAgICAnI3ZhcmlhYmxlJzogXG4gICAgICAgWyB7IHRva2VuOiAndmFyaWFibGUubGFuZ3VhZ2UuYW5vbnltb3VzLnByb2xvZycsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGJfXFxcXGInIH0sXG4gICAgICAgICB7IHRva2VuOiAndmFyaWFibGUub3RoZXIucHJvbG9nJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXFxcYltBLVpfXVthLXpBLVowLTlfXSpcXFxcYicgfSBdIH07XG4gICAgXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxuUHJvbG9nSGlnaGxpZ2h0UnVsZXMubWV0YURhdGEgPSB7IGZpbGVUeXBlczogWyAncGxnJywgJ3Byb2xvZycgXSxcbiAgICAgIGZvbGRpbmdTdGFydE1hcmtlcjogJyglXFxcXHMqcmVnaW9uIFxcXFx3Kil8KFthLXpdXFxcXHcqLio6LSA/KScsXG4gICAgICBmb2xkaW5nU3RvcE1hcmtlcjogJyglXFxcXHMqZW5kKFxcXFxzKnJlZ2lvbik/KXwoPz1cXFxcLiknLFxuICAgICAga2V5RXF1aXZhbGVudDogJ15+UCcsXG4gICAgICBuYW1lOiAnUHJvbG9nJyxcbiAgICAgIHNjb3BlTmFtZTogJ3NvdXJjZS5wcm9sb2cnIH07XG5cblxub29wLmluaGVyaXRzKFByb2xvZ0hpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlByb2xvZ0hpZ2hsaWdodFJ1bGVzID0gUHJvbG9nSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=