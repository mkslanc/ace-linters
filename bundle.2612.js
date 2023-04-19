"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2612],{

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

/***/ 62612:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var JSSMHighlightRules = (__webpack_require__(36051)/* .JSSMHighlightRules */ .K);
// TODO: pick appropriate fold mode
var FoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

var Mode = function() {
    this.HighlightRules = JSSMHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};
    // Extra logic goes here.
    this.$id = "ace/mode/jssm";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 36051:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* This file was autogenerated from ./jssm.tmLanguage (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

var JSSMHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        start: [{
            token: "punctuation.definition.comment.mn",
            regex: /\/\*/,
            push: [{
                token: "punctuation.definition.comment.mn",
                regex: /\*\//,
                next: "pop"
            }, {
                defaultToken: "comment.block.jssm"
            }],
            comment: "block comment"
        }, {
            token: "comment.line.jssm",
            regex: /\/\//,
            push: [{
                token: "comment.line.jssm",
                regex: /$/,
                next: "pop"
            }, {
                defaultToken: "comment.line.jssm"
            }],
            comment: "block comment"
        }, {
            token: "entity.name.function",
            regex: /\${/,
            push: [{
                token: "entity.name.function",
                regex: /}/,
                next: "pop"
            }, {
                defaultToken: "keyword.other"
            }],
            comment: "js outcalls"
        }, {
            token: "constant.numeric",
            regex: /[0-9]*\.[0-9]*\.[0-9]*/,
            comment: "semver"
        }, {
            token: "constant.language.jssmLanguage",
            regex: /graph_layout\s*:/,
            comment: "jssm language tokens"
        }, {
            token: "constant.language.jssmLanguage",
            regex: /machine_name\s*:/,
            comment: "jssm language tokens"
        }, {
            token: "constant.language.jssmLanguage",
            regex: /machine_version\s*:/,
            comment: "jssm language tokens"
        }, {
            token: "constant.language.jssmLanguage",
            regex: /jssm_version\s*:/,
            comment: "jssm language tokens"
        }, {
            token: "keyword.control.transition.jssmArrow.legal_legal",
            regex: /<->/,
            comment: "transitions"
        }, {
            token: "keyword.control.transition.jssmArrow.legal_none",
            regex: /<-/,
            comment: "transitions"
        }, {
            token: "keyword.control.transition.jssmArrow.none_legal",
            regex: /->/,
            comment: "transitions"
        }, {
            token: "keyword.control.transition.jssmArrow.main_main",
            regex: /<=>/,
            comment: "transitions"
        }, {
            token: "keyword.control.transition.jssmArrow.none_main",
            regex: /=>/,
            comment: "transitions"
        }, {
            token: "keyword.control.transition.jssmArrow.main_none",
            regex: /<=/,
            comment: "transitions"
        }, {
            token: "keyword.control.transition.jssmArrow.forced_forced",
            regex: /<~>/,
            comment: "transitions"
        }, {
            token: "keyword.control.transition.jssmArrow.none_forced",
            regex: /~>/,
            comment: "transitions"
        }, {
            token: "keyword.control.transition.jssmArrow.forced_none",
            regex: /<~/,
            comment: "transitions"
        }, {
            token: "keyword.control.transition.jssmArrow.legal_main",
            regex: /<-=>/,
            comment: "transitions"
        }, {
            token: "keyword.control.transition.jssmArrow.main_legal",
            regex: /<=->/,
            comment: "transitions"
        }, {
            token: "keyword.control.transition.jssmArrow.legal_forced",
            regex: /<-~>/,
            comment: "transitions"
        }, {
            token: "keyword.control.transition.jssmArrow.forced_legal",
            regex: /<~->/,
            comment: "transitions"
        }, {
            token: "keyword.control.transition.jssmArrow.main_forced",
            regex: /<=~>/,
            comment: "transitions"
        }, {
            token: "keyword.control.transition.jssmArrow.forced_main",
            regex: /<~=>/,
            comment: "transitions"
        }, {
            token: "constant.numeric.jssmProbability",
            regex: /[0-9]+%/,
            comment: "edge probability annotation"
        }, {
            token: "constant.character.jssmAction",
            regex: /\'[^']*\'/,
            comment: "action annotation"
        }, {
            token: "entity.name.tag.jssmLabel.doublequoted",
            regex: /\"[^"]*\"/,
            comment: "jssm label annotation"
        }, {
            token: "entity.name.tag.jssmLabel.atom",
            regex: /[a-zA-Z0-9_.+&()#@!?,]/,
            comment: "jssm label annotation"
        }]
    };
    
    this.normalizeRules();
};

JSSMHighlightRules.metaData = {
    fileTypes: ["jssm", "jssm_state"],
    name: "JSSM",
    scopeName: "source.jssm"
};


oop.inherits(JSSMHighlightRules, TextHighlightRules);

exports.K = JSSMHighlightRules;


/***/ })

}]);
//# sourceMappingURL=bundle.2612.js.map