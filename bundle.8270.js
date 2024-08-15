"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8270],{

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

/***/ 18270:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var JuliaHighlightRules = (__webpack_require__(96377)/* .JuliaHighlightRules */ .H);
// TODO: pick appropriate fold mode
var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = JuliaHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "#";
    this.blockComment = "";
    this.$id = "ace/mode/julia";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 96377:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* This file was autogenerated from https://raw.github.com/JuliaLang/julia/master/contrib/Julia.tmbundle/Syntaxes/Julia.tmLanguage (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var JuliaHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = { start: 
       [ { include: '#function_decl' },
         { include: '#function_call' },
         { include: '#type_decl' },
         { include: '#keyword' },
         { include: '#operator' },
         { include: '#number' },
         { include: '#string' },
         { include: '#comment' } ],
      '#bracket': 
       [ { token: 'keyword.bracket.julia',
           regex: '\\(|\\)|\\[|\\]|\\{|\\}|,' } ],
      '#comment': 
       [ { token: 
            [ 'punctuation.definition.comment.julia',
              'comment.line.number-sign.julia' ],
           regex: '(#)(?!\\{)(.*$)'} ],
      '#function_call': 
       [ { token: [ 'support.function.julia', 'text' ],
           regex: '([a-zA-Z0-9_]+!?)([\\w\\xff-\\u218e\\u2455-\\uffff]*\\()'} ],
      '#function_decl': 
       [ { token: [ 'keyword.other.julia', 'meta.function.julia',
               'entity.name.function.julia', 'meta.function.julia','text' ],
           regex: '(function|macro)(\\s*)([a-zA-Z0-9_\\{]+!?)([\\w\\xff-\\u218e\\u2455-\\uffff]*)([(\\\\{])'} ],
      '#keyword':
       [ { token: 'keyword.other.julia',
           regex: '\\b(?:function|type|immutable|macro|quote|abstract|bitstype|typealias|module|baremodule|new)\\b' },
         { token: 'keyword.control.julia',
           regex: '\\b(?:if|else|elseif|while|for|in|begin|let|end|do|try|catch|finally|return|break|continue)\\b' },
         { token: 'storage.modifier.variable.julia',
           regex: '\\b(?:global|local|const|export|import|importall|using)\\b' },
         { token: 'variable.macro.julia', regex: '@[\\w\\xff-\\u218e\\u2455-\\uffff]+\\b' } ],
      '#number': 
       [ { token: 'constant.numeric.julia',
           regex: '\\b0(?:x|X)[0-9a-fA-F]*|(?:\\b[0-9]+\\.?[0-9]*|\\.[0-9]+)(?:(?:e|E)(?:\\+|-)?[0-9]*)?(?:im)?|\\bInf(?:32)?\\b|\\bNaN(?:32)?\\b|\\btrue\\b|\\bfalse\\b' } ],
      '#operator': 
       [ { token: 'keyword.operator.update.julia',
           regex: '=|:=|\\+=|-=|\\*=|/=|//=|\\.//=|\\.\\*=|\\\\=|\\.\\\\=|^=|\\.^=|%=|\\|=|&=|\\$=|<<=|>>=' },
         { token: 'keyword.operator.ternary.julia', regex: '\\?|:' },
         { token: 'keyword.operator.boolean.julia',
           regex: '\\|\\||&&|!' },
         { token: 'keyword.operator.arrow.julia', regex: '->|<-|-->' },
         { token: 'keyword.operator.relation.julia',
           regex: '>|<|>=|<=|==|!=|\\.>|\\.<|\\.>=|\\.>=|\\.==|\\.!=|\\.=|\\.!|<:|:>' },
         { token: 'keyword.operator.range.julia', regex: ':' },
         { token: 'keyword.operator.shift.julia', regex: '<<|>>' },
         { token: 'keyword.operator.bitwise.julia', regex: '\\||\\&|~' },
         { token: 'keyword.operator.arithmetic.julia',
           regex: '\\+|-|\\*|\\.\\*|/|\\./|//|\\.//|%|\\.%|\\\\|\\.\\\\|\\^|\\.\\^' },
         { token: 'keyword.operator.isa.julia', regex: '::' },
         { token: 'keyword.operator.dots.julia',
           regex: '\\.(?=[a-zA-Z])|\\.\\.+' },
         { token: 'keyword.operator.interpolation.julia',
           regex: '\\$#?(?=.)' },
         { token: [ 'variable', 'keyword.operator.transposed-variable.julia' ],
           regex: '([\\w\\xff-\\u218e\\u2455-\\uffff]+)((?:\'|\\.\')*\\.?\')' },
         { token: 'text',
           regex: '\\[|\\('},
         { token: [ 'text', 'keyword.operator.transposed-matrix.julia' ],
            regex: "([\\]\\)])((?:'|\\.')*\\.?')"} ],
      '#string': 
       [ { token: 'punctuation.definition.string.begin.julia',
           regex: '\'',
           push: 
            [ { token: 'punctuation.definition.string.end.julia',
                regex: '\'',
                next: 'pop' },
              { include: '#string_escaped_char' },
              { defaultToken: 'string.quoted.single.julia' } ] },
         { token: 'punctuation.definition.string.begin.julia',
           regex: '"',
           push: 
            [ { token: 'punctuation.definition.string.end.julia',
                regex: '"',
                next: 'pop' },
              { include: '#string_escaped_char' },
              { defaultToken: 'string.quoted.double.julia' } ] },
         { token: 'punctuation.definition.string.begin.julia',
           regex: '\\b[\\w\\xff-\\u218e\\u2455-\\uffff]+"',
           push: 
            [ { token: 'punctuation.definition.string.end.julia',
                regex: '"[\\w\\xff-\\u218e\\u2455-\\uffff]*',
                next: 'pop' },
              { include: '#string_custom_escaped_char' },
              { defaultToken: 'string.quoted.custom-double.julia' } ] },
         { token: 'punctuation.definition.string.begin.julia',
           regex: '`',
           push: 
            [ { token: 'punctuation.definition.string.end.julia',
                regex: '`',
                next: 'pop' },
              { include: '#string_escaped_char' },
              { defaultToken: 'string.quoted.backtick.julia' } ] } ],
      '#string_custom_escaped_char': [ { token: 'constant.character.escape.julia', regex: '\\\\"' } ],
      '#string_escaped_char': 
       [ { token: 'constant.character.escape.julia',
           regex: '\\\\(?:\\\\|[0-3]\\d{,2}|[4-7]\\d?|x[a-fA-F0-9]{,2}|u[a-fA-F0-9]{,4}|U[a-fA-F0-9]{,8}|.)' } ],
      '#type_decl': 
       [ { token: 
            [ 'keyword.control.type.julia',
              'meta.type.julia',
              'entity.name.type.julia',
              'entity.other.inherited-class.julia',
              'punctuation.separator.inheritance.julia',
              'entity.other.inherited-class.julia' ],
           regex: '(type|immutable)(\\s+)([a-zA-Z0-9_]+)(?:(\\s*)(<:)(\\s*[.a-zA-Z0-9_:]+))?' },
         { token: [ 'other.typed-variable.julia', 'support.type.julia' ],
           regex: '([a-zA-Z0-9_]+)(::[a-zA-Z0-9_{}]+)' } ] };
    
    this.normalizeRules();
};

JuliaHighlightRules.metaData = { fileTypes: [ 'jl' ],
      firstLineMatch: '^#!.*\\bjulia\\s*$',
      foldingStartMarker: '^\\s*(?:if|while|for|begin|function|macro|module|baremodule|type|immutable|let)\\b(?!.*\\bend\\b).*$',
      foldingStopMarker: '^\\s*(?:end)\\b.*$',
      name: 'Julia',
      scopeName: 'source.julia' };


oop.inherits(JuliaHighlightRules, TextHighlightRules);

exports.H = JuliaHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q2xFLFdBQVcsNkRBQTZEO0FBQ3hFLFdBQVc7QUFDWCxxRkFBcUY7QUFDckYsV0FBVyxrREFBa0Q7QUFDN0QsV0FBVztBQUNYLDZDQUE2QztBQUM3QyxXQUFXO0FBQ1gsZ0NBQWdDO0FBQ2hDLFdBQVc7QUFDWCwrRUFBK0U7QUFDL0UsV0FBVztBQUNYLDRCQUE0QjtBQUM1QixXQUFXO0FBQ1gsbURBQW1EO0FBQ25EO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQSw2QkFBNkI7QUFDN0IsZ0JBQWdCLGlDQUFpQztBQUNqRCxnQkFBZ0IsNkNBQTZDLEdBQUc7QUFDaEUsV0FBVztBQUNYO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQSw2QkFBNkI7QUFDN0IsZ0JBQWdCLGlDQUFpQztBQUNqRCxnQkFBZ0IsNkNBQTZDLEdBQUc7QUFDaEUsV0FBVztBQUNYO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQSw2QkFBNkI7QUFDN0IsZ0JBQWdCLHdDQUF3QztBQUN4RCxnQkFBZ0Isb0RBQW9ELEdBQUc7QUFDdkUsV0FBVztBQUNYO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQSw2QkFBNkI7QUFDN0IsZ0JBQWdCLGlDQUFpQztBQUNqRCxnQkFBZ0IsK0NBQStDLElBQUk7QUFDbkUseUNBQXlDLDJEQUEyRDtBQUNwRztBQUNBLFdBQVc7QUFDWCx3Q0FBd0MsR0FBRyx3QkFBd0IsR0FBRyxjQUFjLEdBQUcsY0FBYyxHQUFHLE9BQU87QUFDL0c7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0ZBQStGO0FBQy9GLFdBQVc7QUFDWCxrREFBa0QsT0FBTztBQUN6RDtBQUNBO0FBQ0E7O0FBRUEsaUNBQWlDO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLFNBQTJCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2NzdHlsZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2p1bGlhLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvanVsaWFfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiLypcbiAgVEhJUyBGSUxFIFdBUyBBVVRPR0VORVJBVEVEIEJZIG1vZGUudG1wbC5qc1xuKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBKdWxpYUhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vanVsaWFfaGlnaGxpZ2h0X3J1bGVzXCIpLkp1bGlhSGlnaGxpZ2h0UnVsZXM7XG4vLyBUT0RPOiBwaWNrIGFwcHJvcHJpYXRlIGZvbGQgbW9kZVxudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IEp1bGlhSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIiNcIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IFwiXCI7XG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2p1bGlhXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIi8qIFRoaXMgZmlsZSB3YXMgYXV0b2dlbmVyYXRlZCBmcm9tIGh0dHBzOi8vcmF3LmdpdGh1Yi5jb20vSnVsaWFMYW5nL2p1bGlhL21hc3Rlci9jb250cmliL0p1bGlhLnRtYnVuZGxlL1N5bnRheGVzL0p1bGlhLnRtTGFuZ3VhZ2UgKHV1aWQ6ICkgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBJVCBNSUdIVCBOT1QgQkUgUEVSRkVDVCAuLi5CdXQgaXQncyBhIGdvb2Qgc3RhcnQgZnJvbSBhbiBleGlzdGluZyAqLnRtbGFuZ3VhZ2UgZmlsZS4gKlxuICogZmlsZVR5cGVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIEp1bGlhSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7IHN0YXJ0OiBcbiAgICAgICBbIHsgaW5jbHVkZTogJyNmdW5jdGlvbl9kZWNsJyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI2Z1bmN0aW9uX2NhbGwnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjdHlwZV9kZWNsJyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI2tleXdvcmQnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjb3BlcmF0b3InIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjbnVtYmVyJyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI3N0cmluZycgfSxcbiAgICAgICAgIHsgaW5jbHVkZTogJyNjb21tZW50JyB9IF0sXG4gICAgICAnI2JyYWNrZXQnOiBcbiAgICAgICBbIHsgdG9rZW46ICdrZXl3b3JkLmJyYWNrZXQuanVsaWEnLFxuICAgICAgICAgICByZWdleDogJ1xcXFwofFxcXFwpfFxcXFxbfFxcXFxdfFxcXFx7fFxcXFx9fCwnIH0gXSxcbiAgICAgICcjY29tbWVudCc6IFxuICAgICAgIFsgeyB0b2tlbjogXG4gICAgICAgICAgICBbICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmNvbW1lbnQuanVsaWEnLFxuICAgICAgICAgICAgICAnY29tbWVudC5saW5lLm51bWJlci1zaWduLmp1bGlhJyBdLFxuICAgICAgICAgICByZWdleDogJygjKSg/IVxcXFx7KSguKiQpJ30gXSxcbiAgICAgICcjZnVuY3Rpb25fY2FsbCc6IFxuICAgICAgIFsgeyB0b2tlbjogWyAnc3VwcG9ydC5mdW5jdGlvbi5qdWxpYScsICd0ZXh0JyBdLFxuICAgICAgICAgICByZWdleDogJyhbYS16QS1aMC05X10rIT8pKFtcXFxcd1xcXFx4ZmYtXFxcXHUyMThlXFxcXHUyNDU1LVxcXFx1ZmZmZl0qXFxcXCgpJ30gXSxcbiAgICAgICcjZnVuY3Rpb25fZGVjbCc6IFxuICAgICAgIFsgeyB0b2tlbjogWyAna2V5d29yZC5vdGhlci5qdWxpYScsICdtZXRhLmZ1bmN0aW9uLmp1bGlhJyxcbiAgICAgICAgICAgICAgICdlbnRpdHkubmFtZS5mdW5jdGlvbi5qdWxpYScsICdtZXRhLmZ1bmN0aW9uLmp1bGlhJywndGV4dCcgXSxcbiAgICAgICAgICAgcmVnZXg6ICcoZnVuY3Rpb258bWFjcm8pKFxcXFxzKikoW2EtekEtWjAtOV9cXFxce10rIT8pKFtcXFxcd1xcXFx4ZmYtXFxcXHUyMThlXFxcXHUyNDU1LVxcXFx1ZmZmZl0qKShbKFxcXFxcXFxce10pJ30gXSxcbiAgICAgICcja2V5d29yZCc6XG4gICAgICAgWyB7IHRva2VuOiAna2V5d29yZC5vdGhlci5qdWxpYScsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGIoPzpmdW5jdGlvbnx0eXBlfGltbXV0YWJsZXxtYWNyb3xxdW90ZXxhYnN0cmFjdHxiaXRzdHlwZXx0eXBlYWxpYXN8bW9kdWxlfGJhcmVtb2R1bGV8bmV3KVxcXFxiJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQuY29udHJvbC5qdWxpYScsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGIoPzppZnxlbHNlfGVsc2VpZnx3aGlsZXxmb3J8aW58YmVnaW58bGV0fGVuZHxkb3x0cnl8Y2F0Y2h8ZmluYWxseXxyZXR1cm58YnJlYWt8Y29udGludWUpXFxcXGInIH0sXG4gICAgICAgICB7IHRva2VuOiAnc3RvcmFnZS5tb2RpZmllci52YXJpYWJsZS5qdWxpYScsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGIoPzpnbG9iYWx8bG9jYWx8Y29uc3R8ZXhwb3J0fGltcG9ydHxpbXBvcnRhbGx8dXNpbmcpXFxcXGInIH0sXG4gICAgICAgICB7IHRva2VuOiAndmFyaWFibGUubWFjcm8uanVsaWEnLCByZWdleDogJ0BbXFxcXHdcXFxceGZmLVxcXFx1MjE4ZVxcXFx1MjQ1NS1cXFxcdWZmZmZdK1xcXFxiJyB9IF0sXG4gICAgICAnI251bWJlcic6IFxuICAgICAgIFsgeyB0b2tlbjogJ2NvbnN0YW50Lm51bWVyaWMuanVsaWEnLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiMCg/Onh8WClbMC05YS1mQS1GXSp8KD86XFxcXGJbMC05XStcXFxcLj9bMC05XSp8XFxcXC5bMC05XSspKD86KD86ZXxFKSg/OlxcXFwrfC0pP1swLTldKik/KD86aW0pP3xcXFxcYkluZig/OjMyKT9cXFxcYnxcXFxcYk5hTig/OjMyKT9cXFxcYnxcXFxcYnRydWVcXFxcYnxcXFxcYmZhbHNlXFxcXGInIH0gXSxcbiAgICAgICcjb3BlcmF0b3InOiBcbiAgICAgICBbIHsgdG9rZW46ICdrZXl3b3JkLm9wZXJhdG9yLnVwZGF0ZS5qdWxpYScsXG4gICAgICAgICAgIHJlZ2V4OiAnPXw6PXxcXFxcKz18LT18XFxcXCo9fC89fC8vPXxcXFxcLi8vPXxcXFxcLlxcXFwqPXxcXFxcXFxcXD18XFxcXC5cXFxcXFxcXD18Xj18XFxcXC5ePXwlPXxcXFxcfD18Jj18XFxcXCQ9fDw8PXw+Pj0nIH0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5vcGVyYXRvci50ZXJuYXJ5Lmp1bGlhJywgcmVnZXg6ICdcXFxcP3w6JyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQub3BlcmF0b3IuYm9vbGVhbi5qdWxpYScsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXHxcXFxcfHwmJnwhJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQub3BlcmF0b3IuYXJyb3cuanVsaWEnLCByZWdleDogJy0+fDwtfC0tPicgfSxcbiAgICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLm9wZXJhdG9yLnJlbGF0aW9uLmp1bGlhJyxcbiAgICAgICAgICAgcmVnZXg6ICc+fDx8Pj18PD18PT18IT18XFxcXC4+fFxcXFwuPHxcXFxcLj49fFxcXFwuPj18XFxcXC49PXxcXFxcLiE9fFxcXFwuPXxcXFxcLiF8PDp8Oj4nIH0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5vcGVyYXRvci5yYW5nZS5qdWxpYScsIHJlZ2V4OiAnOicgfSxcbiAgICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLm9wZXJhdG9yLnNoaWZ0Lmp1bGlhJywgcmVnZXg6ICc8PHw+PicgfSxcbiAgICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLm9wZXJhdG9yLmJpdHdpc2UuanVsaWEnLCByZWdleDogJ1xcXFx8fFxcXFwmfH4nIH0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5vcGVyYXRvci5hcml0aG1ldGljLmp1bGlhJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXFxcK3wtfFxcXFwqfFxcXFwuXFxcXCp8L3xcXFxcLi98Ly98XFxcXC4vL3wlfFxcXFwuJXxcXFxcXFxcXHxcXFxcLlxcXFxcXFxcfFxcXFxefFxcXFwuXFxcXF4nIH0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5vcGVyYXRvci5pc2EuanVsaWEnLCByZWdleDogJzo6JyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQub3BlcmF0b3IuZG90cy5qdWxpYScsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXC4oPz1bYS16QS1aXSl8XFxcXC5cXFxcLisnIH0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5vcGVyYXRvci5pbnRlcnBvbGF0aW9uLmp1bGlhJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXFxcJCM/KD89LiknIH0sXG4gICAgICAgICB7IHRva2VuOiBbICd2YXJpYWJsZScsICdrZXl3b3JkLm9wZXJhdG9yLnRyYW5zcG9zZWQtdmFyaWFibGUuanVsaWEnIF0sXG4gICAgICAgICAgIHJlZ2V4OiAnKFtcXFxcd1xcXFx4ZmYtXFxcXHUyMThlXFxcXHUyNDU1LVxcXFx1ZmZmZl0rKSgoPzpcXCd8XFxcXC5cXCcpKlxcXFwuP1xcJyknIH0sXG4gICAgICAgICB7IHRva2VuOiAndGV4dCcsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXFt8XFxcXCgnfSxcbiAgICAgICAgIHsgdG9rZW46IFsgJ3RleHQnLCAna2V5d29yZC5vcGVyYXRvci50cmFuc3Bvc2VkLW1hdHJpeC5qdWxpYScgXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIihbXFxcXF1cXFxcKV0pKCg/Oid8XFxcXC4nKSpcXFxcLj8nKVwifSBdLFxuICAgICAgJyNzdHJpbmcnOiBcbiAgICAgICBbIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5iZWdpbi5qdWxpYScsXG4gICAgICAgICAgIHJlZ2V4OiAnXFwnJyxcbiAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICBbIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5lbmQuanVsaWEnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFwnJyxcbiAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjc3RyaW5nX2VzY2FwZWRfY2hhcicgfSxcbiAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdzdHJpbmcucXVvdGVkLnNpbmdsZS5qdWxpYScgfSBdIH0sXG4gICAgICAgICB7IHRva2VuOiAncHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuYmVnaW4uanVsaWEnLFxuICAgICAgICAgICByZWdleDogJ1wiJyxcbiAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICBbIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5lbmQuanVsaWEnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXCInLFxuICAgICAgICAgICAgICAgIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgIHsgaW5jbHVkZTogJyNzdHJpbmdfZXNjYXBlZF9jaGFyJyB9LFxuICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ3N0cmluZy5xdW90ZWQuZG91YmxlLmp1bGlhJyB9IF0gfSxcbiAgICAgICAgIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5iZWdpbi5qdWxpYScsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGJbXFxcXHdcXFxceGZmLVxcXFx1MjE4ZVxcXFx1MjQ1NS1cXFxcdWZmZmZdK1wiJyxcbiAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICBbIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5lbmQuanVsaWEnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXCJbXFxcXHdcXFxceGZmLVxcXFx1MjE4ZVxcXFx1MjQ1NS1cXFxcdWZmZmZdKicsXG4gICAgICAgICAgICAgICAgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI3N0cmluZ19jdXN0b21fZXNjYXBlZF9jaGFyJyB9LFxuICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ3N0cmluZy5xdW90ZWQuY3VzdG9tLWRvdWJsZS5qdWxpYScgfSBdIH0sXG4gICAgICAgICB7IHRva2VuOiAncHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuYmVnaW4uanVsaWEnLFxuICAgICAgICAgICByZWdleDogJ2AnLFxuICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgIFsgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmVuZC5qdWxpYScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdgJyxcbiAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjc3RyaW5nX2VzY2FwZWRfY2hhcicgfSxcbiAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdzdHJpbmcucXVvdGVkLmJhY2t0aWNrLmp1bGlhJyB9IF0gfSBdLFxuICAgICAgJyNzdHJpbmdfY3VzdG9tX2VzY2FwZWRfY2hhcic6IFsgeyB0b2tlbjogJ2NvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUuanVsaWEnLCByZWdleDogJ1xcXFxcXFxcXCInIH0gXSxcbiAgICAgICcjc3RyaW5nX2VzY2FwZWRfY2hhcic6IFxuICAgICAgIFsgeyB0b2tlbjogJ2NvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUuanVsaWEnLFxuICAgICAgICAgICByZWdleDogJ1xcXFxcXFxcKD86XFxcXFxcXFx8WzAtM11cXFxcZHssMn18WzQtN11cXFxcZD98eFthLWZBLUYwLTldeywyfXx1W2EtZkEtRjAtOV17LDR9fFVbYS1mQS1GMC05XXssOH18LiknIH0gXSxcbiAgICAgICcjdHlwZV9kZWNsJzogXG4gICAgICAgWyB7IHRva2VuOiBcbiAgICAgICAgICAgIFsgJ2tleXdvcmQuY29udHJvbC50eXBlLmp1bGlhJyxcbiAgICAgICAgICAgICAgJ21ldGEudHlwZS5qdWxpYScsXG4gICAgICAgICAgICAgICdlbnRpdHkubmFtZS50eXBlLmp1bGlhJyxcbiAgICAgICAgICAgICAgJ2VudGl0eS5vdGhlci5pbmhlcml0ZWQtY2xhc3MuanVsaWEnLFxuICAgICAgICAgICAgICAncHVuY3R1YXRpb24uc2VwYXJhdG9yLmluaGVyaXRhbmNlLmp1bGlhJyxcbiAgICAgICAgICAgICAgJ2VudGl0eS5vdGhlci5pbmhlcml0ZWQtY2xhc3MuanVsaWEnIF0sXG4gICAgICAgICAgIHJlZ2V4OiAnKHR5cGV8aW1tdXRhYmxlKShcXFxccyspKFthLXpBLVowLTlfXSspKD86KFxcXFxzKikoPDopKFxcXFxzKlsuYS16QS1aMC05XzpdKykpPycgfSxcbiAgICAgICAgIHsgdG9rZW46IFsgJ290aGVyLnR5cGVkLXZhcmlhYmxlLmp1bGlhJywgJ3N1cHBvcnQudHlwZS5qdWxpYScgXSxcbiAgICAgICAgICAgcmVnZXg6ICcoW2EtekEtWjAtOV9dKykoOjpbYS16QS1aMC05X3t9XSspJyB9IF0gfTtcbiAgICBcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5KdWxpYUhpZ2hsaWdodFJ1bGVzLm1ldGFEYXRhID0geyBmaWxlVHlwZXM6IFsgJ2psJyBdLFxuICAgICAgZmlyc3RMaW5lTWF0Y2g6ICdeIyEuKlxcXFxianVsaWFcXFxccyokJyxcbiAgICAgIGZvbGRpbmdTdGFydE1hcmtlcjogJ15cXFxccyooPzppZnx3aGlsZXxmb3J8YmVnaW58ZnVuY3Rpb258bWFjcm98bW9kdWxlfGJhcmVtb2R1bGV8dHlwZXxpbW11dGFibGV8bGV0KVxcXFxiKD8hLipcXFxcYmVuZFxcXFxiKS4qJCcsXG4gICAgICBmb2xkaW5nU3RvcE1hcmtlcjogJ15cXFxccyooPzplbmQpXFxcXGIuKiQnLFxuICAgICAgbmFtZTogJ0p1bGlhJyxcbiAgICAgIHNjb3BlTmFtZTogJ3NvdXJjZS5qdWxpYScgfTtcblxuXG5vb3AuaW5oZXJpdHMoSnVsaWFIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5KdWxpYUhpZ2hsaWdodFJ1bGVzID0gSnVsaWFIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==