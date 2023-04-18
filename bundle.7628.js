"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7628],{

/***/ 12764:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var Range = (__webpack_require__(59082).Range);
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

/***/ 17628:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var IoHighlightRules = (__webpack_require__(8020)/* .IoHighlightRules */ .w);
var FoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

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

/***/ 8020:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* This file was autogenerated from tm bundles\io.tmbundle/Syntaxes/io.plist (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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

exports.w = IoHighlightRules;


/***/ })

}]);
//# sourceMappingURL=bundle.7628.js.map