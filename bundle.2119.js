"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2119],{

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

/***/ 82119:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var HaskellHighlightRules = (__webpack_require__(32916)/* .HaskellHighlightRules */ .m);
// TODO: pick appropriate fold mode
var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = HaskellHighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "--";
    this.blockComment = null;
    this.$id = "ace/mode/haskell";
    this.snippetFileId = "ace/snippets/haskell";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 32916:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* This file was autogenerated from tm bundles\haskell.tmbundle\Syntaxes\Haskell.plist (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var HaskellHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = { start:
       [ { token:
            [ 'punctuation.definition.entity.haskell',
              'keyword.operator.function.infix.haskell',
              'punctuation.definition.entity.haskell' ],
           regex: '(`)([a-zA-Z_\']*?)(`)',
           comment: 'In case this regex seems unusual for an infix operator, note that Haskell allows any ordinary function application (elem 4 [1..10]) to be rewritten as an infix expression (4 `elem` [1..10]).' },
         { token: 'constant.language.unit.haskell', regex: '\\(\\)' },
         { token: 'constant.language.empty-list.haskell',
           regex: '\\[\\]' },
         { token: 'keyword.other.haskell',
           regex: '\\b(module|signature)\\b',
           push:
            [ { token: 'keyword.other.haskell', regex: '\\bwhere\\b', next: 'pop' },
              { include: '#module_name' },
              { include: '#module_exports' },
              { token: 'invalid', regex: '[a-z]+' },
              { defaultToken: 'meta.declaration.module.haskell' } ] },
         { token: 'keyword.other.haskell',
           regex: '\\bclass\\b',
           push:
            [ { token: 'keyword.other.haskell',
                regex: '\\bwhere\\b',
                next: 'pop' },
              { token: 'support.class.prelude.haskell',
                regex: '\\b(?:Monad|Functor|Eq|Ord|Read|Show|Num|(?:Frac|Ra)tional|Enum|Bounded|Real(?:Frac|Float)?|Integral|Floating)\\b' },
              { token: 'entity.other.inherited-class.haskell',
                regex: '[A-Z][A-Za-z_\']*' },
              { token: 'variable.other.generic-type.haskell',
                regex: '\\b[a-z][a-zA-Z0-9_\']*\\b' },
              { defaultToken: 'meta.declaration.class.haskell' } ] },
         { token: 'keyword.other.haskell',
           regex: '\\binstance\\b',
           push:
            [ { token: 'keyword.other.haskell',
                regex: '\\bwhere\\b|$',
                next: 'pop' },
              { include: '#type_signature' },
              { defaultToken: 'meta.declaration.instance.haskell' } ] },
         { token: 'keyword.other.haskell',
           regex: 'import',
           push:
            [ { token: 'meta.import.haskell', regex: '$|;|^', next: 'pop' },
              { token: 'keyword.other.haskell', regex: 'qualified|as|hiding' },
              { include: '#module_name' },
              { include: '#module_exports' },
              { defaultToken: 'meta.import.haskell' } ] },
         { token: [ 'keyword.other.haskell', 'meta.deriving.haskell' ],
           regex: '(deriving)(\\s*\\()',
           push:
            [ { token: 'meta.deriving.haskell', regex: '\\)', next: 'pop' },
              { token: 'entity.other.inherited-class.haskell',
                regex: '\\b[A-Z][a-zA-Z_\']*' },
              { defaultToken: 'meta.deriving.haskell' } ] },
         { token: 'keyword.other.haskell',
           regex: '\\b(?:deriving|where|data|type|case|of|let|in|newtype|default)\\b' },
         { token: 'keyword.operator.haskell', regex: '\\binfix[lr]?\\b' },
         { token: 'keyword.control.haskell',
           regex: '\\b(?:do|if|then|else)\\b' },
         { token: 'constant.numeric.float.haskell',
           regex: '\\b(?:[0-9]+\\.[0-9]+(?:[eE][+-]?[0-9]+)?|[0-9]+[eE][+-]?[0-9]+)\\b',
           comment: 'Floats are always decimal' },
         { token: 'constant.numeric.haskell',
           regex: '\\b(?:[0-9]+|0(?:[xX][0-9a-fA-F]+|[oO][0-7]+))\\b' },
         { token:
            [ 'meta.preprocessor.c',
              'punctuation.definition.preprocessor.c',
              'meta.preprocessor.c' ],
           regex: '^(\\s*)(#)(\\s*\\w+)',
           comment: 'In addition to Haskell\'s "native" syntax, GHC permits the C preprocessor to be run on a source file.' },
         { include: '#pragma' },
         { token: 'punctuation.definition.string.begin.haskell',
           regex: '"',
           push:
            [ { token: 'punctuation.definition.string.end.haskell',
                regex: '"',
                next: 'pop' },
              { token: 'constant.character.escape.haskell',
                regex: '\\\\(?:NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|[abfnrtv\\\\\\"\'\\&])' },
              { token: 'constant.character.escape.octal.haskell',
                regex: '\\\\o[0-7]+|\\\\x[0-9A-Fa-f]+|\\\\[0-9]+' },
              { token: 'constant.character.escape.control.haskell',
                regex: '\\^[A-Z@\\[\\]\\\\\\^_]' },
              { defaultToken: 'string.quoted.double.haskell' } ] },
         { token:
            [ 'punctuation.definition.string.begin.haskell',
              'string.quoted.single.haskell',
              'constant.character.escape.haskell',
              'constant.character.escape.octal.haskell',
              'constant.character.escape.hexadecimal.haskell',
              'constant.character.escape.control.haskell',
              'punctuation.definition.string.end.haskell' ],
           regex: '(\')(?:([\\ -\\[\\]-~])|(\\\\(?:NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|[abfnrtv\\\\\\"\'\\&]))|(\\\\o[0-7]+)|(\\\\x[0-9A-Fa-f]+)|(\\^[A-Z@\\[\\]\\\\\\^_]))(\')' },
         { token:
            [ 'meta.function.type-declaration.haskell',
              'entity.name.function.haskell',
              'meta.function.type-declaration.haskell',
              'keyword.other.double-colon.haskell' ],
           regex: '^(\\s*)([a-z_][a-zA-Z0-9_\']*|\\([|!%$+\\-.,=</>]+\\))(\\s*)(::)',
           push:
            [ { token: 'meta.function.type-declaration.haskell',
                regex: '$',
                next: 'pop' },
              { include: '#type_signature' },
              { defaultToken: 'meta.function.type-declaration.haskell' } ] },
         { token: 'support.constant.haskell',
           regex: '\\b(?:Just|Nothing|Left|Right|True|False|LT|EQ|GT|\\(\\)|\\[\\])\\b' },
         { token: 'constant.other.haskell', regex: '\\b[A-Z]\\w*\\b' },
         { include: '#comments' },
         { token: 'support.function.prelude.haskell',
           regex: '\\b(?:abs|acos|acosh|all|and|any|appendFile|applyM|asTypeOf|asin|asinh|atan|atan2|atanh|break|catch|ceiling|compare|concat|concatMap|const|cos|cosh|curry|cycle|decodeFloat|div|divMod|drop|dropWhile|elem|encodeFloat|enumFrom|enumFromThen|enumFromThenTo|enumFromTo|error|even|exp|exponent|fail|filter|flip|floatDigits|floatRadix|floatRange|floor|fmap|foldl|foldl1|foldr|foldr1|fromEnum|fromInteger|fromIntegral|fromRational|fst|gcd|getChar|getContents|getLine|head|id|init|interact|ioError|isDenormalized|isIEEE|isInfinite|isNaN|isNegativeZero|iterate|last|lcm|length|lex|lines|log|logBase|lookup|map|mapM|mapM_|max|maxBound|maximum|maybe|min|minBound|minimum|mod|negate|not|notElem|null|odd|or|otherwise|pi|pred|print|product|properFraction|putChar|putStr|putStrLn|quot|quotRem|read|readFile|readIO|readList|readLn|readParen|reads|readsPrec|realToFrac|recip|rem|repeat|replicate|return|reverse|round|scaleFloat|scanl|scanl1|scanr|scanr1|seq|sequence|sequence_|show|showChar|showList|showParen|showString|shows|showsPrec|significand|signum|sin|sinh|snd|span|splitAt|sqrt|subtract|succ|sum|tail|take|takeWhile|tan|tanh|toEnum|toInteger|toRational|truncate|uncurry|undefined|unlines|until|unwords|unzip|unzip3|userError|words|writeFile|zip|zip3|zipWith|zipWith3)\\b' },
         { include: '#infix_op' },
         { token: 'keyword.operator.haskell',
           regex: '[|!%$?~+:\\-.=</>\\\\]+',
           comment: 'In case this regex seems overly general, note that Haskell permits the definition of new operators which can be nearly any string of punctuation characters, such as $%^&*.' },
         { token: 'punctuation.separator.comma.haskell', regex: ',' } ],
      '#block_comment':
       [ { token: 'punctuation.definition.comment.haskell',
           regex: '\\{-(?!#)',
           push:
            [ { include: '#block_comment' },
              { token: 'punctuation.definition.comment.haskell',
                regex: '-\\}',
                next: 'pop' },
              { defaultToken: 'comment.block.haskell' } ] } ],
      '#comments':
       [ { token: 'punctuation.definition.comment.haskell',
           regex: '--.*',
           push_:
            [ { token: 'comment.line.double-dash.haskell',
                regex: '$',
                next: 'pop' },
              { defaultToken: 'comment.line.double-dash.haskell' } ] },
         { include: '#block_comment' } ],
      '#infix_op':
       [ { token: 'entity.name.function.infix.haskell',
           regex: '\\([|!%$+:\\-.=</>]+\\)|\\(,+\\)' } ],
      '#module_exports':
       [ { token: 'meta.declaration.exports.haskell',
           regex: '\\(',
           push:
            [ { token: 'meta.declaration.exports.haskell.end',
                regex: '\\)',
                next: 'pop' },
              { token: 'entity.name.function.haskell',
                regex: '\\b[a-z][a-zA-Z_\']*' },
              { token: 'storage.type.haskell', regex: '\\b[A-Z][A-Za-z_\']*' },
              { token: 'punctuation.separator.comma.haskell', regex: ',' },
              { include: '#infix_op' },
              { token: 'meta.other.unknown.haskell',
                regex: '\\(.*?\\)',
                comment: 'So named because I don\'t know what to call this.' },
              { defaultToken: 'meta.declaration.exports.haskell.end' } ] } ],
      '#module_name':
       [ { token: 'support.other.module.haskell',
           regex: '[A-Z][A-Za-z._\']*' } ],
      '#pragma':
       [ { token: 'meta.preprocessor.haskell',
           regex: '\\{-#',
           push:
            [ { token: 'meta.preprocessor.haskell',
                regex: '#-\\}',
                next: 'pop' },
              { token: 'keyword.other.preprocessor.haskell',
                regex: '\\b(?:LANGUAGE|UNPACK|INLINE)\\b' },
              { defaultToken: 'meta.preprocessor.haskell' } ] } ],
      '#type_signature':
       [ { token:
            [ 'meta.class-constraint.haskell',
              'entity.other.inherited-class.haskell',
              'meta.class-constraint.haskell',
              'variable.other.generic-type.haskell',
              'meta.class-constraint.haskell',
              'keyword.other.big-arrow.haskell' ],
           regex: '(\\(\\s*)([A-Z][A-Za-z]*)(\\s+)([a-z][A-Za-z_\']*)(\\)\\s*)(=>)' },
         { include: '#pragma' },
         { token: 'keyword.other.arrow.haskell', regex: '->' },
         { token: 'keyword.other.big-arrow.haskell', regex: '=>' },
         { token: 'support.type.prelude.haskell',
           regex: '\\b(?:Int(?:eger)?|Maybe|Either|Bool|Float|Double|Char|String|Ordering|ShowS|ReadS|FilePath|IO(?:Error)?)\\b' },
         { token: 'variable.other.generic-type.haskell',
           regex: '\\b[a-z][a-zA-Z0-9_\']*\\b' },
         { token: 'storage.type.haskell',
           regex: '\\b[A-Z][a-zA-Z0-9_\']*\\b' },
         { token: 'support.constant.unit.haskell', regex: '\\(\\)' },
         { include: '#comments' } ] };

    this.normalizeRules();
};

HaskellHighlightRules.metaData = { fileTypes: [ 'hs' ],
      keyEquivalent: '^~H',
      name: 'Haskell',
      scopeName: 'source.haskell' };


oop.inherits(HaskellHighlightRules, TextHighlightRules);

exports.m = HaskellHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxXQUFXO0FBQ1g7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBLDZCQUE2QjtBQUM3QixnQkFBZ0IsbURBQW1ELEdBQUc7QUFDdEUsV0FBVyw0QkFBNEI7QUFDdkM7QUFDQSxXQUFXO0FBQ1gsdURBQXVEO0FBQ3ZEO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQSw2QkFBNkI7QUFDN0IsZ0JBQWdCO0FBQ2hCLCtDQUErQztBQUMvQyxnQkFBZ0IsOERBQThEO0FBQzlFLGdCQUFnQiwwREFBMEQ7QUFDMUUsZ0JBQWdCLHNCQUFzQjtBQUN0QyxnQkFBZ0I7QUFDaEI7QUFDQSw4RUFBOEU7QUFDOUUsZ0JBQWdCLHVEQUF1RCxJQUFJO0FBQzNFO0FBQ0EsV0FBVztBQUNYLHlDQUF5QztBQUN6QztBQUNBLFdBQVc7QUFDWCxzQkFBc0I7QUFDdEI7QUFDQSxnQkFBZ0I7QUFDaEIsNkJBQTZCO0FBQzdCLDZCQUE2QjtBQUM3QixnQkFBZ0I7QUFDaEIsMkRBQTJEO0FBQzNELGdCQUFnQiw0Q0FBNEMsSUFBSTtBQUNoRTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRkFBcUY7QUFDckYsV0FBVyxvQkFBb0I7QUFDL0IsV0FBVyxtREFBbUQ7QUFDOUQsV0FBVyx1REFBdUQ7QUFDbEUsV0FBVztBQUNYLGtJQUFrSTtBQUNsSSxXQUFXO0FBQ1gsZ0RBQWdEO0FBQ2hELFdBQVc7QUFDWCxnREFBZ0Q7QUFDaEQsV0FBVyx5REFBeUQ7QUFDcEUsV0FBVyx1QkFBdUI7O0FBRWxDO0FBQ0E7O0FBRUEsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTs7O0FBR0E7O0FBRUEsU0FBNkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvaGFza2VsbC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2hhc2tlbGxfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiLypcbiAgVEhJUyBGSUxFIFdBUyBBVVRPR0VORVJBVEVEIEJZIG1vZGUudG1wbC5qc1xuKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBIYXNrZWxsSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9oYXNrZWxsX2hpZ2hsaWdodF9ydWxlc1wiKS5IYXNrZWxsSGlnaGxpZ2h0UnVsZXM7XG4vLyBUT0RPOiBwaWNrIGFwcHJvcHJpYXRlIGZvbGQgbW9kZVxudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IEhhc2tlbGxIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBGb2xkTW9kZSgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLS1cIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IG51bGw7XG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2hhc2tlbGxcIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9oYXNrZWxsXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIi8qIFRoaXMgZmlsZSB3YXMgYXV0b2dlbmVyYXRlZCBmcm9tIHRtIGJ1bmRsZXNcXGhhc2tlbGwudG1idW5kbGVcXFN5bnRheGVzXFxIYXNrZWxsLnBsaXN0ICh1dWlkOiApICovXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogSVQgTUlHSFQgTk9UIEJFIFBFUkZFQ1QgLi4uQnV0IGl0J3MgYSBnb29kIHN0YXJ0IGZyb20gYW4gZXhpc3RpbmcgKi50bWxhbmd1YWdlIGZpbGUuICpcbiAqIGZpbGVUeXBlcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBIYXNrZWxsSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7IHN0YXJ0OlxuICAgICAgIFsgeyB0b2tlbjpcbiAgICAgICAgICAgIFsgJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24uZW50aXR5Lmhhc2tlbGwnLFxuICAgICAgICAgICAgICAna2V5d29yZC5vcGVyYXRvci5mdW5jdGlvbi5pbmZpeC5oYXNrZWxsJyxcbiAgICAgICAgICAgICAgJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24uZW50aXR5Lmhhc2tlbGwnIF0sXG4gICAgICAgICAgIHJlZ2V4OiAnKGApKFthLXpBLVpfXFwnXSo/KShgKScsXG4gICAgICAgICAgIGNvbW1lbnQ6ICdJbiBjYXNlIHRoaXMgcmVnZXggc2VlbXMgdW51c3VhbCBmb3IgYW4gaW5maXggb3BlcmF0b3IsIG5vdGUgdGhhdCBIYXNrZWxsIGFsbG93cyBhbnkgb3JkaW5hcnkgZnVuY3Rpb24gYXBwbGljYXRpb24gKGVsZW0gNCBbMS4uMTBdKSB0byBiZSByZXdyaXR0ZW4gYXMgYW4gaW5maXggZXhwcmVzc2lvbiAoNCBgZWxlbWAgWzEuLjEwXSkuJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2NvbnN0YW50Lmxhbmd1YWdlLnVuaXQuaGFza2VsbCcsIHJlZ2V4OiAnXFxcXChcXFxcKScgfSxcbiAgICAgICAgIHsgdG9rZW46ICdjb25zdGFudC5sYW5ndWFnZS5lbXB0eS1saXN0Lmhhc2tlbGwnLFxuICAgICAgICAgICByZWdleDogJ1xcXFxbXFxcXF0nIH0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5vdGhlci5oYXNrZWxsJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXFxcYihtb2R1bGV8c2lnbmF0dXJlKVxcXFxiJyxcbiAgICAgICAgICAgcHVzaDpcbiAgICAgICAgICAgIFsgeyB0b2tlbjogJ2tleXdvcmQub3RoZXIuaGFza2VsbCcsIHJlZ2V4OiAnXFxcXGJ3aGVyZVxcXFxiJywgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI21vZHVsZV9uYW1lJyB9LFxuICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjbW9kdWxlX2V4cG9ydHMnIH0sXG4gICAgICAgICAgICAgIHsgdG9rZW46ICdpbnZhbGlkJywgcmVnZXg6ICdbYS16XSsnIH0sXG4gICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnbWV0YS5kZWNsYXJhdGlvbi5tb2R1bGUuaGFza2VsbCcgfSBdIH0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5vdGhlci5oYXNrZWxsJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXFxcYmNsYXNzXFxcXGInLFxuICAgICAgICAgICBwdXNoOlxuICAgICAgICAgICAgWyB7IHRva2VuOiAna2V5d29yZC5vdGhlci5oYXNrZWxsJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFxid2hlcmVcXFxcYicsXG4gICAgICAgICAgICAgICAgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ3N1cHBvcnQuY2xhc3MucHJlbHVkZS5oYXNrZWxsJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFxiKD86TW9uYWR8RnVuY3RvcnxFcXxPcmR8UmVhZHxTaG93fE51bXwoPzpGcmFjfFJhKXRpb25hbHxFbnVtfEJvdW5kZWR8UmVhbCg/OkZyYWN8RmxvYXQpP3xJbnRlZ3JhbHxGbG9hdGluZylcXFxcYicgfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ2VudGl0eS5vdGhlci5pbmhlcml0ZWQtY2xhc3MuaGFza2VsbCcsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdbQS1aXVtBLVphLXpfXFwnXSonIH0sXG4gICAgICAgICAgICAgIHsgdG9rZW46ICd2YXJpYWJsZS5vdGhlci5nZW5lcmljLXR5cGUuaGFza2VsbCcsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcYlthLXpdW2EtekEtWjAtOV9cXCddKlxcXFxiJyB9LFxuICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ21ldGEuZGVjbGFyYXRpb24uY2xhc3MuaGFza2VsbCcgfSBdIH0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5vdGhlci5oYXNrZWxsJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXFxcYmluc3RhbmNlXFxcXGInLFxuICAgICAgICAgICBwdXNoOlxuICAgICAgICAgICAgWyB7IHRva2VuOiAna2V5d29yZC5vdGhlci5oYXNrZWxsJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFxid2hlcmVcXFxcYnwkJyxcbiAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjdHlwZV9zaWduYXR1cmUnIH0sXG4gICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnbWV0YS5kZWNsYXJhdGlvbi5pbnN0YW5jZS5oYXNrZWxsJyB9IF0gfSxcbiAgICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLm90aGVyLmhhc2tlbGwnLFxuICAgICAgICAgICByZWdleDogJ2ltcG9ydCcsXG4gICAgICAgICAgIHB1c2g6XG4gICAgICAgICAgICBbIHsgdG9rZW46ICdtZXRhLmltcG9ydC5oYXNrZWxsJywgcmVnZXg6ICckfDt8XicsIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLm90aGVyLmhhc2tlbGwnLCByZWdleDogJ3F1YWxpZmllZHxhc3xoaWRpbmcnIH0sXG4gICAgICAgICAgICAgIHsgaW5jbHVkZTogJyNtb2R1bGVfbmFtZScgfSxcbiAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI21vZHVsZV9leHBvcnRzJyB9LFxuICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ21ldGEuaW1wb3J0Lmhhc2tlbGwnIH0gXSB9LFxuICAgICAgICAgeyB0b2tlbjogWyAna2V5d29yZC5vdGhlci5oYXNrZWxsJywgJ21ldGEuZGVyaXZpbmcuaGFza2VsbCcgXSxcbiAgICAgICAgICAgcmVnZXg6ICcoZGVyaXZpbmcpKFxcXFxzKlxcXFwoKScsXG4gICAgICAgICAgIHB1c2g6XG4gICAgICAgICAgICBbIHsgdG9rZW46ICdtZXRhLmRlcml2aW5nLmhhc2tlbGwnLCByZWdleDogJ1xcXFwpJywgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ2VudGl0eS5vdGhlci5pbmhlcml0ZWQtY2xhc3MuaGFza2VsbCcsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcYltBLVpdW2EtekEtWl9cXCddKicgfSxcbiAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdtZXRhLmRlcml2aW5nLmhhc2tlbGwnIH0gXSB9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQub3RoZXIuaGFza2VsbCcsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGIoPzpkZXJpdmluZ3x3aGVyZXxkYXRhfHR5cGV8Y2FzZXxvZnxsZXR8aW58bmV3dHlwZXxkZWZhdWx0KVxcXFxiJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQub3BlcmF0b3IuaGFza2VsbCcsIHJlZ2V4OiAnXFxcXGJpbmZpeFtscl0/XFxcXGInIH0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5jb250cm9sLmhhc2tlbGwnLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiKD86ZG98aWZ8dGhlbnxlbHNlKVxcXFxiJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2NvbnN0YW50Lm51bWVyaWMuZmxvYXQuaGFza2VsbCcsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGIoPzpbMC05XStcXFxcLlswLTldKyg/OltlRV1bKy1dP1swLTldKyk/fFswLTldK1tlRV1bKy1dP1swLTldKylcXFxcYicsXG4gICAgICAgICAgIGNvbW1lbnQ6ICdGbG9hdHMgYXJlIGFsd2F5cyBkZWNpbWFsJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2NvbnN0YW50Lm51bWVyaWMuaGFza2VsbCcsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGIoPzpbMC05XSt8MCg/Olt4WF1bMC05YS1mQS1GXSt8W29PXVswLTddKykpXFxcXGInIH0sXG4gICAgICAgICB7IHRva2VuOlxuICAgICAgICAgICAgWyAnbWV0YS5wcmVwcm9jZXNzb3IuYycsXG4gICAgICAgICAgICAgICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnByZXByb2Nlc3Nvci5jJyxcbiAgICAgICAgICAgICAgJ21ldGEucHJlcHJvY2Vzc29yLmMnIF0sXG4gICAgICAgICAgIHJlZ2V4OiAnXihcXFxccyopKCMpKFxcXFxzKlxcXFx3KyknLFxuICAgICAgICAgICBjb21tZW50OiAnSW4gYWRkaXRpb24gdG8gSGFza2VsbFxcJ3MgXCJuYXRpdmVcIiBzeW50YXgsIEdIQyBwZXJtaXRzIHRoZSBDIHByZXByb2Nlc3NvciB0byBiZSBydW4gb24gYSBzb3VyY2UgZmlsZS4nIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjcHJhZ21hJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmJlZ2luLmhhc2tlbGwnLFxuICAgICAgICAgICByZWdleDogJ1wiJyxcbiAgICAgICAgICAgcHVzaDpcbiAgICAgICAgICAgIFsgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmVuZC5oYXNrZWxsJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1wiJyxcbiAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICB7IHRva2VuOiAnY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZS5oYXNrZWxsJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFxcXFxcKD86TlVMfFNPSHxTVFh8RVRYfEVPVHxFTlF8QUNLfEJFTHxCU3xIVHxMRnxWVHxGRnxDUnxTT3xTSXxETEV8REMxfERDMnxEQzN8REM0fE5BS3xTWU58RVRCfENBTnxFTXxTVUJ8RVNDfEZTfEdTfFJTfFVTfFNQfERFTHxbYWJmbnJ0dlxcXFxcXFxcXFxcXFwiXFwnXFxcXCZdKScgfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ2NvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUub2N0YWwuaGFza2VsbCcsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcXFxcXG9bMC03XSt8XFxcXFxcXFx4WzAtOUEtRmEtZl0rfFxcXFxcXFxcWzAtOV0rJyB9LFxuICAgICAgICAgICAgICB7IHRva2VuOiAnY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZS5jb250cm9sLmhhc2tlbGwnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFxcXF5bQS1aQFxcXFxbXFxcXF1cXFxcXFxcXFxcXFxeX10nIH0sXG4gICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnc3RyaW5nLnF1b3RlZC5kb3VibGUuaGFza2VsbCcgfSBdIH0sXG4gICAgICAgICB7IHRva2VuOlxuICAgICAgICAgICAgWyAncHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuYmVnaW4uaGFza2VsbCcsXG4gICAgICAgICAgICAgICdzdHJpbmcucXVvdGVkLnNpbmdsZS5oYXNrZWxsJyxcbiAgICAgICAgICAgICAgJ2NvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUuaGFza2VsbCcsXG4gICAgICAgICAgICAgICdjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLm9jdGFsLmhhc2tlbGwnLFxuICAgICAgICAgICAgICAnY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZS5oZXhhZGVjaW1hbC5oYXNrZWxsJyxcbiAgICAgICAgICAgICAgJ2NvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUuY29udHJvbC5oYXNrZWxsJyxcbiAgICAgICAgICAgICAgJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmVuZC5oYXNrZWxsJyBdLFxuICAgICAgICAgICByZWdleDogJyhcXCcpKD86KFtcXFxcIC1cXFxcW1xcXFxdLX5dKXwoXFxcXFxcXFwoPzpOVUx8U09IfFNUWHxFVFh8RU9UfEVOUXxBQ0t8QkVMfEJTfEhUfExGfFZUfEZGfENSfFNPfFNJfERMRXxEQzF8REMyfERDM3xEQzR8TkFLfFNZTnxFVEJ8Q0FOfEVNfFNVQnxFU0N8RlN8R1N8UlN8VVN8U1B8REVMfFthYmZucnR2XFxcXFxcXFxcXFxcXCJcXCdcXFxcJl0pKXwoXFxcXFxcXFxvWzAtN10rKXwoXFxcXFxcXFx4WzAtOUEtRmEtZl0rKXwoXFxcXF5bQS1aQFxcXFxbXFxcXF1cXFxcXFxcXFxcXFxeX10pKShcXCcpJyB9LFxuICAgICAgICAgeyB0b2tlbjpcbiAgICAgICAgICAgIFsgJ21ldGEuZnVuY3Rpb24udHlwZS1kZWNsYXJhdGlvbi5oYXNrZWxsJyxcbiAgICAgICAgICAgICAgJ2VudGl0eS5uYW1lLmZ1bmN0aW9uLmhhc2tlbGwnLFxuICAgICAgICAgICAgICAnbWV0YS5mdW5jdGlvbi50eXBlLWRlY2xhcmF0aW9uLmhhc2tlbGwnLFxuICAgICAgICAgICAgICAna2V5d29yZC5vdGhlci5kb3VibGUtY29sb24uaGFza2VsbCcgXSxcbiAgICAgICAgICAgcmVnZXg6ICdeKFxcXFxzKikoW2Etel9dW2EtekEtWjAtOV9cXCddKnxcXFxcKFt8ISUkK1xcXFwtLiw9PC8+XStcXFxcKSkoXFxcXHMqKSg6OiknLFxuICAgICAgICAgICBwdXNoOlxuICAgICAgICAgICAgWyB7IHRva2VuOiAnbWV0YS5mdW5jdGlvbi50eXBlLWRlY2xhcmF0aW9uLmhhc2tlbGwnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnJCcsXG4gICAgICAgICAgICAgICAgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI3R5cGVfc2lnbmF0dXJlJyB9LFxuICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ21ldGEuZnVuY3Rpb24udHlwZS1kZWNsYXJhdGlvbi5oYXNrZWxsJyB9IF0gfSxcbiAgICAgICAgIHsgdG9rZW46ICdzdXBwb3J0LmNvbnN0YW50Lmhhc2tlbGwnLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiKD86SnVzdHxOb3RoaW5nfExlZnR8UmlnaHR8VHJ1ZXxGYWxzZXxMVHxFUXxHVHxcXFxcKFxcXFwpfFxcXFxbXFxcXF0pXFxcXGInIH0sXG4gICAgICAgICB7IHRva2VuOiAnY29uc3RhbnQub3RoZXIuaGFza2VsbCcsIHJlZ2V4OiAnXFxcXGJbQS1aXVxcXFx3KlxcXFxiJyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI2NvbW1lbnRzJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ3N1cHBvcnQuZnVuY3Rpb24ucHJlbHVkZS5oYXNrZWxsJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXFxcYig/OmFic3xhY29zfGFjb3NofGFsbHxhbmR8YW55fGFwcGVuZEZpbGV8YXBwbHlNfGFzVHlwZU9mfGFzaW58YXNpbmh8YXRhbnxhdGFuMnxhdGFuaHxicmVha3xjYXRjaHxjZWlsaW5nfGNvbXBhcmV8Y29uY2F0fGNvbmNhdE1hcHxjb25zdHxjb3N8Y29zaHxjdXJyeXxjeWNsZXxkZWNvZGVGbG9hdHxkaXZ8ZGl2TW9kfGRyb3B8ZHJvcFdoaWxlfGVsZW18ZW5jb2RlRmxvYXR8ZW51bUZyb218ZW51bUZyb21UaGVufGVudW1Gcm9tVGhlblRvfGVudW1Gcm9tVG98ZXJyb3J8ZXZlbnxleHB8ZXhwb25lbnR8ZmFpbHxmaWx0ZXJ8ZmxpcHxmbG9hdERpZ2l0c3xmbG9hdFJhZGl4fGZsb2F0UmFuZ2V8Zmxvb3J8Zm1hcHxmb2xkbHxmb2xkbDF8Zm9sZHJ8Zm9sZHIxfGZyb21FbnVtfGZyb21JbnRlZ2VyfGZyb21JbnRlZ3JhbHxmcm9tUmF0aW9uYWx8ZnN0fGdjZHxnZXRDaGFyfGdldENvbnRlbnRzfGdldExpbmV8aGVhZHxpZHxpbml0fGludGVyYWN0fGlvRXJyb3J8aXNEZW5vcm1hbGl6ZWR8aXNJRUVFfGlzSW5maW5pdGV8aXNOYU58aXNOZWdhdGl2ZVplcm98aXRlcmF0ZXxsYXN0fGxjbXxsZW5ndGh8bGV4fGxpbmVzfGxvZ3xsb2dCYXNlfGxvb2t1cHxtYXB8bWFwTXxtYXBNX3xtYXh8bWF4Qm91bmR8bWF4aW11bXxtYXliZXxtaW58bWluQm91bmR8bWluaW11bXxtb2R8bmVnYXRlfG5vdHxub3RFbGVtfG51bGx8b2RkfG9yfG90aGVyd2lzZXxwaXxwcmVkfHByaW50fHByb2R1Y3R8cHJvcGVyRnJhY3Rpb258cHV0Q2hhcnxwdXRTdHJ8cHV0U3RyTG58cXVvdHxxdW90UmVtfHJlYWR8cmVhZEZpbGV8cmVhZElPfHJlYWRMaXN0fHJlYWRMbnxyZWFkUGFyZW58cmVhZHN8cmVhZHNQcmVjfHJlYWxUb0ZyYWN8cmVjaXB8cmVtfHJlcGVhdHxyZXBsaWNhdGV8cmV0dXJufHJldmVyc2V8cm91bmR8c2NhbGVGbG9hdHxzY2FubHxzY2FubDF8c2NhbnJ8c2NhbnIxfHNlcXxzZXF1ZW5jZXxzZXF1ZW5jZV98c2hvd3xzaG93Q2hhcnxzaG93TGlzdHxzaG93UGFyZW58c2hvd1N0cmluZ3xzaG93c3xzaG93c1ByZWN8c2lnbmlmaWNhbmR8c2lnbnVtfHNpbnxzaW5ofHNuZHxzcGFufHNwbGl0QXR8c3FydHxzdWJ0cmFjdHxzdWNjfHN1bXx0YWlsfHRha2V8dGFrZVdoaWxlfHRhbnx0YW5ofHRvRW51bXx0b0ludGVnZXJ8dG9SYXRpb25hbHx0cnVuY2F0ZXx1bmN1cnJ5fHVuZGVmaW5lZHx1bmxpbmVzfHVudGlsfHVud29yZHN8dW56aXB8dW56aXAzfHVzZXJFcnJvcnx3b3Jkc3x3cml0ZUZpbGV8emlwfHppcDN8emlwV2l0aHx6aXBXaXRoMylcXFxcYicgfSxcbiAgICAgICAgIHsgaW5jbHVkZTogJyNpbmZpeF9vcCcgfSxcbiAgICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLm9wZXJhdG9yLmhhc2tlbGwnLFxuICAgICAgICAgICByZWdleDogJ1t8ISUkP34rOlxcXFwtLj08Lz5cXFxcXFxcXF0rJyxcbiAgICAgICAgICAgY29tbWVudDogJ0luIGNhc2UgdGhpcyByZWdleCBzZWVtcyBvdmVybHkgZ2VuZXJhbCwgbm90ZSB0aGF0IEhhc2tlbGwgcGVybWl0cyB0aGUgZGVmaW5pdGlvbiBvZiBuZXcgb3BlcmF0b3JzIHdoaWNoIGNhbiBiZSBuZWFybHkgYW55IHN0cmluZyBvZiBwdW5jdHVhdGlvbiBjaGFyYWN0ZXJzLCBzdWNoIGFzICQlXiYqLicgfSxcbiAgICAgICAgIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5zZXBhcmF0b3IuY29tbWEuaGFza2VsbCcsIHJlZ2V4OiAnLCcgfSBdLFxuICAgICAgJyNibG9ja19jb21tZW50JzpcbiAgICAgICBbIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmNvbW1lbnQuaGFza2VsbCcsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXHstKD8hIyknLFxuICAgICAgICAgICBwdXNoOlxuICAgICAgICAgICAgWyB7IGluY2x1ZGU6ICcjYmxvY2tfY29tbWVudCcgfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24uY29tbWVudC5oYXNrZWxsJyxcbiAgICAgICAgICAgICAgICByZWdleDogJy1cXFxcfScsXG4gICAgICAgICAgICAgICAgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdjb21tZW50LmJsb2NrLmhhc2tlbGwnIH0gXSB9IF0sXG4gICAgICAnI2NvbW1lbnRzJzpcbiAgICAgICBbIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmNvbW1lbnQuaGFza2VsbCcsXG4gICAgICAgICAgIHJlZ2V4OiAnLS0uKicsXG4gICAgICAgICAgIHB1c2hfOlxuICAgICAgICAgICAgWyB7IHRva2VuOiAnY29tbWVudC5saW5lLmRvdWJsZS1kYXNoLmhhc2tlbGwnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnJCcsXG4gICAgICAgICAgICAgICAgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdjb21tZW50LmxpbmUuZG91YmxlLWRhc2guaGFza2VsbCcgfSBdIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjYmxvY2tfY29tbWVudCcgfSBdLFxuICAgICAgJyNpbmZpeF9vcCc6XG4gICAgICAgWyB7IHRva2VuOiAnZW50aXR5Lm5hbWUuZnVuY3Rpb24uaW5maXguaGFza2VsbCcsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXChbfCElJCs6XFxcXC0uPTwvPl0rXFxcXCl8XFxcXCgsK1xcXFwpJyB9IF0sXG4gICAgICAnI21vZHVsZV9leHBvcnRzJzpcbiAgICAgICBbIHsgdG9rZW46ICdtZXRhLmRlY2xhcmF0aW9uLmV4cG9ydHMuaGFza2VsbCcsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXCgnLFxuICAgICAgICAgICBwdXNoOlxuICAgICAgICAgICAgWyB7IHRva2VuOiAnbWV0YS5kZWNsYXJhdGlvbi5leHBvcnRzLmhhc2tlbGwuZW5kJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFwpJyxcbiAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICB7IHRva2VuOiAnZW50aXR5Lm5hbWUuZnVuY3Rpb24uaGFza2VsbCcsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcYlthLXpdW2EtekEtWl9cXCddKicgfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ3N0b3JhZ2UudHlwZS5oYXNrZWxsJywgcmVnZXg6ICdcXFxcYltBLVpdW0EtWmEtel9cXCddKicgfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLnNlcGFyYXRvci5jb21tYS5oYXNrZWxsJywgcmVnZXg6ICcsJyB9LFxuICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjaW5maXhfb3AnIH0sXG4gICAgICAgICAgICAgIHsgdG9rZW46ICdtZXRhLm90aGVyLnVua25vd24uaGFza2VsbCcsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcKC4qP1xcXFwpJyxcbiAgICAgICAgICAgICAgICBjb21tZW50OiAnU28gbmFtZWQgYmVjYXVzZSBJIGRvblxcJ3Qga25vdyB3aGF0IHRvIGNhbGwgdGhpcy4nIH0sXG4gICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnbWV0YS5kZWNsYXJhdGlvbi5leHBvcnRzLmhhc2tlbGwuZW5kJyB9IF0gfSBdLFxuICAgICAgJyNtb2R1bGVfbmFtZSc6XG4gICAgICAgWyB7IHRva2VuOiAnc3VwcG9ydC5vdGhlci5tb2R1bGUuaGFza2VsbCcsXG4gICAgICAgICAgIHJlZ2V4OiAnW0EtWl1bQS1aYS16Ll9cXCddKicgfSBdLFxuICAgICAgJyNwcmFnbWEnOlxuICAgICAgIFsgeyB0b2tlbjogJ21ldGEucHJlcHJvY2Vzc29yLmhhc2tlbGwnLFxuICAgICAgICAgICByZWdleDogJ1xcXFx7LSMnLFxuICAgICAgICAgICBwdXNoOlxuICAgICAgICAgICAgWyB7IHRva2VuOiAnbWV0YS5wcmVwcm9jZXNzb3IuaGFza2VsbCcsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICcjLVxcXFx9JyxcbiAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICB7IHRva2VuOiAna2V5d29yZC5vdGhlci5wcmVwcm9jZXNzb3IuaGFza2VsbCcsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcYig/OkxBTkdVQUdFfFVOUEFDS3xJTkxJTkUpXFxcXGInIH0sXG4gICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnbWV0YS5wcmVwcm9jZXNzb3IuaGFza2VsbCcgfSBdIH0gXSxcbiAgICAgICcjdHlwZV9zaWduYXR1cmUnOlxuICAgICAgIFsgeyB0b2tlbjpcbiAgICAgICAgICAgIFsgJ21ldGEuY2xhc3MtY29uc3RyYWludC5oYXNrZWxsJyxcbiAgICAgICAgICAgICAgJ2VudGl0eS5vdGhlci5pbmhlcml0ZWQtY2xhc3MuaGFza2VsbCcsXG4gICAgICAgICAgICAgICdtZXRhLmNsYXNzLWNvbnN0cmFpbnQuaGFza2VsbCcsXG4gICAgICAgICAgICAgICd2YXJpYWJsZS5vdGhlci5nZW5lcmljLXR5cGUuaGFza2VsbCcsXG4gICAgICAgICAgICAgICdtZXRhLmNsYXNzLWNvbnN0cmFpbnQuaGFza2VsbCcsXG4gICAgICAgICAgICAgICdrZXl3b3JkLm90aGVyLmJpZy1hcnJvdy5oYXNrZWxsJyBdLFxuICAgICAgICAgICByZWdleDogJyhcXFxcKFxcXFxzKikoW0EtWl1bQS1aYS16XSopKFxcXFxzKykoW2Etel1bQS1aYS16X1xcJ10qKShcXFxcKVxcXFxzKikoPT4pJyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI3ByYWdtYScgfSxcbiAgICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLm90aGVyLmFycm93Lmhhc2tlbGwnLCByZWdleDogJy0+JyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQub3RoZXIuYmlnLWFycm93Lmhhc2tlbGwnLCByZWdleDogJz0+JyB9LFxuICAgICAgICAgeyB0b2tlbjogJ3N1cHBvcnQudHlwZS5wcmVsdWRlLmhhc2tlbGwnLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiKD86SW50KD86ZWdlcik/fE1heWJlfEVpdGhlcnxCb29sfEZsb2F0fERvdWJsZXxDaGFyfFN0cmluZ3xPcmRlcmluZ3xTaG93U3xSZWFkU3xGaWxlUGF0aHxJTyg/OkVycm9yKT8pXFxcXGInIH0sXG4gICAgICAgICB7IHRva2VuOiAndmFyaWFibGUub3RoZXIuZ2VuZXJpYy10eXBlLmhhc2tlbGwnLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiW2Etel1bYS16QS1aMC05X1xcJ10qXFxcXGInIH0sXG4gICAgICAgICB7IHRva2VuOiAnc3RvcmFnZS50eXBlLmhhc2tlbGwnLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiW0EtWl1bYS16QS1aMC05X1xcJ10qXFxcXGInIH0sXG4gICAgICAgICB7IHRva2VuOiAnc3VwcG9ydC5jb25zdGFudC51bml0Lmhhc2tlbGwnLCByZWdleDogJ1xcXFwoXFxcXCknIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjY29tbWVudHMnIH0gXSB9O1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxuSGFza2VsbEhpZ2hsaWdodFJ1bGVzLm1ldGFEYXRhID0geyBmaWxlVHlwZXM6IFsgJ2hzJyBdLFxuICAgICAga2V5RXF1aXZhbGVudDogJ15+SCcsXG4gICAgICBuYW1lOiAnSGFza2VsbCcsXG4gICAgICBzY29wZU5hbWU6ICdzb3VyY2UuaGFza2VsbCcgfTtcblxuXG5vb3AuaW5oZXJpdHMoSGFza2VsbEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkhhc2tlbGxIaWdobGlnaHRSdWxlcyA9IEhhc2tlbGxIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==