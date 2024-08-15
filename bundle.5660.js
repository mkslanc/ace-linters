"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5660],{

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

/***/ 65660:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var JSSMHighlightRules = (__webpack_require__(68335)/* .JSSMHighlightRules */ .H);
// TODO: pick appropriate fold mode
var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

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

/***/ 68335:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* This file was autogenerated from ./jssm.tmLanguage (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

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

exports.H = JSSMHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBOztBQUVBLFNBQTBCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2NzdHlsZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2pzc20uanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9qc3NtX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIi8qXG4gIFRISVMgRklMRSBXQVMgQVVUT0dFTkVSQVRFRCBCWSBtb2RlLnRtcGwuanNcbiovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgSlNTTUhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vanNzbV9oaWdobGlnaHRfcnVsZXNcIikuSlNTTUhpZ2hsaWdodFJ1bGVzO1xuLy8gVE9ETzogcGljayBhcHByb3ByaWF0ZSBmb2xkIG1vZGVcbnZhciBGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBKU1NNSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIvL1wiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIi8qXCIsIGVuZDogXCIqL1wifTtcbiAgICAvLyBFeHRyYSBsb2dpYyBnb2VzIGhlcmUuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2pzc21cIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiLyogVGhpcyBmaWxlIHdhcyBhdXRvZ2VuZXJhdGVkIGZyb20gLi9qc3NtLnRtTGFuZ3VhZ2UgKHV1aWQ6ICkgKi9cbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gKiBJVCBNSUdIVCBOT1QgQkUgUEVSRkVDVCAuLi5CdXQgaXQncyBhIGdvb2Qgc3RhcnQgZnJvbSBhbiBleGlzdGluZyAqLnRtbGFuZ3VhZ2UgZmlsZS4gKlxuICogZmlsZVR5cGVzICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpcbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIEpTU01IaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgc3RhcnQ6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmNvbW1lbnQubW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFwvXFwqLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5jb21tZW50Lm1uXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXCpcXC8vLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudC5ibG9jay5qc3NtXCJcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgY29tbWVudDogXCJibG9jayBjb21tZW50XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5saW5lLmpzc21cIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFwvXFwvLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5saW5lLmpzc21cIixcbiAgICAgICAgICAgICAgICByZWdleDogLyQvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudC5saW5lLmpzc21cIlxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBjb21tZW50OiBcImJsb2NrIGNvbW1lbnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJlbnRpdHkubmFtZS5mdW5jdGlvblwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXCR7LyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiZW50aXR5Lm5hbWUuZnVuY3Rpb25cIixcbiAgICAgICAgICAgICAgICByZWdleDogL30vLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwia2V5d29yZC5vdGhlclwiXG4gICAgICAgICAgICB9XSxcbiAgICAgICAgICAgIGNvbW1lbnQ6IFwianMgb3V0Y2FsbHNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgICAgICAgICByZWdleDogL1swLTldKlxcLlswLTldKlxcLlswLTldKi8sXG4gICAgICAgICAgICBjb21tZW50OiBcInNlbXZlclwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmpzc21MYW5ndWFnZVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9ncmFwaF9sYXlvdXRcXHMqOi8sXG4gICAgICAgICAgICBjb21tZW50OiBcImpzc20gbGFuZ3VhZ2UgdG9rZW5zXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuanNzbUxhbmd1YWdlXCIsXG4gICAgICAgICAgICByZWdleDogL21hY2hpbmVfbmFtZVxccyo6LyxcbiAgICAgICAgICAgIGNvbW1lbnQ6IFwianNzbSBsYW5ndWFnZSB0b2tlbnNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5qc3NtTGFuZ3VhZ2VcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvbWFjaGluZV92ZXJzaW9uXFxzKjovLFxuICAgICAgICAgICAgY29tbWVudDogXCJqc3NtIGxhbmd1YWdlIHRva2Vuc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmpzc21MYW5ndWFnZVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9qc3NtX3ZlcnNpb25cXHMqOi8sXG4gICAgICAgICAgICBjb21tZW50OiBcImpzc20gbGFuZ3VhZ2UgdG9rZW5zXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb250cm9sLnRyYW5zaXRpb24uanNzbUFycm93LmxlZ2FsX2xlZ2FsXCIsXG4gICAgICAgICAgICByZWdleDogLzwtPi8sXG4gICAgICAgICAgICBjb21tZW50OiBcInRyYW5zaXRpb25zXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb250cm9sLnRyYW5zaXRpb24uanNzbUFycm93LmxlZ2FsX25vbmVcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvPC0vLFxuICAgICAgICAgICAgY29tbWVudDogXCJ0cmFuc2l0aW9uc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQuY29udHJvbC50cmFuc2l0aW9uLmpzc21BcnJvdy5ub25lX2xlZ2FsXCIsXG4gICAgICAgICAgICByZWdleDogLy0+LyxcbiAgICAgICAgICAgIGNvbW1lbnQ6IFwidHJhbnNpdGlvbnNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLmNvbnRyb2wudHJhbnNpdGlvbi5qc3NtQXJyb3cubWFpbl9tYWluXCIsXG4gICAgICAgICAgICByZWdleDogLzw9Pi8sXG4gICAgICAgICAgICBjb21tZW50OiBcInRyYW5zaXRpb25zXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb250cm9sLnRyYW5zaXRpb24uanNzbUFycm93Lm5vbmVfbWFpblwiLFxuICAgICAgICAgICAgcmVnZXg6IC89Pi8sXG4gICAgICAgICAgICBjb21tZW50OiBcInRyYW5zaXRpb25zXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb250cm9sLnRyYW5zaXRpb24uanNzbUFycm93Lm1haW5fbm9uZVwiLFxuICAgICAgICAgICAgcmVnZXg6IC88PS8sXG4gICAgICAgICAgICBjb21tZW50OiBcInRyYW5zaXRpb25zXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb250cm9sLnRyYW5zaXRpb24uanNzbUFycm93LmZvcmNlZF9mb3JjZWRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvPH4+LyxcbiAgICAgICAgICAgIGNvbW1lbnQ6IFwidHJhbnNpdGlvbnNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLmNvbnRyb2wudHJhbnNpdGlvbi5qc3NtQXJyb3cubm9uZV9mb3JjZWRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvfj4vLFxuICAgICAgICAgICAgY29tbWVudDogXCJ0cmFuc2l0aW9uc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQuY29udHJvbC50cmFuc2l0aW9uLmpzc21BcnJvdy5mb3JjZWRfbm9uZVwiLFxuICAgICAgICAgICAgcmVnZXg6IC88fi8sXG4gICAgICAgICAgICBjb21tZW50OiBcInRyYW5zaXRpb25zXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb250cm9sLnRyYW5zaXRpb24uanNzbUFycm93LmxlZ2FsX21haW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiAvPC09Pi8sXG4gICAgICAgICAgICBjb21tZW50OiBcInRyYW5zaXRpb25zXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb250cm9sLnRyYW5zaXRpb24uanNzbUFycm93Lm1haW5fbGVnYWxcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvPD0tPi8sXG4gICAgICAgICAgICBjb21tZW50OiBcInRyYW5zaXRpb25zXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5jb250cm9sLnRyYW5zaXRpb24uanNzbUFycm93LmxlZ2FsX2ZvcmNlZFwiLFxuICAgICAgICAgICAgcmVnZXg6IC88LX4+LyxcbiAgICAgICAgICAgIGNvbW1lbnQ6IFwidHJhbnNpdGlvbnNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLmNvbnRyb2wudHJhbnNpdGlvbi5qc3NtQXJyb3cuZm9yY2VkX2xlZ2FsXCIsXG4gICAgICAgICAgICByZWdleDogLzx+LT4vLFxuICAgICAgICAgICAgY29tbWVudDogXCJ0cmFuc2l0aW9uc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQuY29udHJvbC50cmFuc2l0aW9uLmpzc21BcnJvdy5tYWluX2ZvcmNlZFwiLFxuICAgICAgICAgICAgcmVnZXg6IC88PX4+LyxcbiAgICAgICAgICAgIGNvbW1lbnQ6IFwidHJhbnNpdGlvbnNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLmNvbnRyb2wudHJhbnNpdGlvbi5qc3NtQXJyb3cuZm9yY2VkX21haW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiAvPH49Pi8sXG4gICAgICAgICAgICBjb21tZW50OiBcInRyYW5zaXRpb25zXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpYy5qc3NtUHJvYmFiaWxpdHlcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvWzAtOV0rJS8sXG4gICAgICAgICAgICBjb21tZW50OiBcImVkZ2UgcHJvYmFiaWxpdHkgYW5ub3RhdGlvblwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50LmNoYXJhY3Rlci5qc3NtQWN0aW9uXCIsXG4gICAgICAgICAgICByZWdleDogL1xcJ1teJ10qXFwnLyxcbiAgICAgICAgICAgIGNvbW1lbnQ6IFwiYWN0aW9uIGFubm90YXRpb25cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJlbnRpdHkubmFtZS50YWcuanNzbUxhYmVsLmRvdWJsZXF1b3RlZFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXFwiW15cIl0qXFxcIi8sXG4gICAgICAgICAgICBjb21tZW50OiBcImpzc20gbGFiZWwgYW5ub3RhdGlvblwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImVudGl0eS5uYW1lLnRhZy5qc3NtTGFiZWwuYXRvbVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9bYS16QS1aMC05Xy4rJigpI0AhPyxdLyxcbiAgICAgICAgICAgIGNvbW1lbnQ6IFwianNzbSBsYWJlbCBhbm5vdGF0aW9uXCJcbiAgICAgICAgfV1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbkpTU01IaWdobGlnaHRSdWxlcy5tZXRhRGF0YSA9IHtcbiAgICBmaWxlVHlwZXM6IFtcImpzc21cIiwgXCJqc3NtX3N0YXRlXCJdLFxuICAgIG5hbWU6IFwiSlNTTVwiLFxuICAgIHNjb3BlTmFtZTogXCJzb3VyY2UuanNzbVwiXG59O1xuXG5cbm9vcC5pbmhlcml0cyhKU1NNSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuSlNTTUhpZ2hsaWdodFJ1bGVzID0gSlNTTUhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9