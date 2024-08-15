"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8855],{

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

/***/ 71236:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var NasalHighlightRules = (__webpack_require__(11463)/* .NasalHighlightRules */ .d);
// TODO: pick appropriate fold mode
var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = NasalHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    // this.lineCommentStart = ""//"";
    // this.blockComment = {start: ""/*"", end: ""*/""};
    // Extra logic goes here.
    this.$id = "ace/mode/nasal";
}).call(Mode.prototype);

exports.Mode = Mode;

/***/ }),

/***/ 11463:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

/* This file was autogenerated from https://github.com/BobDotCom/Nasal.tmbundle/blob/95113f60db7cb7ac7b6c3d854683773879407a48/Syntaxes/Nasal.tmLanguage (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var NasalHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        start: [{
            token: "constant.other.allcaps.nasal",
            regex: /\b[[:upper:]_][[:upper:][:digit:]_]*\b(?![\.\(\'\"])/,
            comment: "Match identifiers in ALL_CAPS as constants, except when followed by `.`, `(`, `'`, or `\"`."
        }, {
            todo: {
                token: [
                    "support.class.nasal",
                    "meta.function.nasal",
                    "entity.name.function.nasal",
                    "meta.function.nasal",
                    "keyword.operator.nasal",
                    "meta.function.nasal",
                    "storage.type.function.nasal",
                    "meta.function.nasal",
                    "punctuation.definition.parameters.begin.nasal"
                ],
                regex: /([a-zA-Z_?.$][\w?.$]*)(\.)([a-zA-Z_?.$][\w?.$]*)(\s*)(=)(\s*)(func)(\s*)(\()/,
                push: [{
                    token: "punctuation.definition.parameters.end.nasal",
                    regex: /\)/,
                    next: "pop"
                }, {
                    include: "$self"
                }, {
                    token: "variable.parameter.nasal",
                    regex: /\w/
                }, {
                    defaultToken: "meta.function.nasal"
                }]
            },
            comment: "match stuff like: Sound.play = func() { … }"
        }, {
            todo: {
                token: [
                    "entity.name.function.nasal",
                    "meta.function.nasal",
                    "keyword.operator.nasal",
                    "meta.function.nasal",
                    "storage.type.function.nasal",
                    "meta.function.nasal",
                    "punctuation.definition.parameters.begin.nasal"
                ],
                regex: /([a-zA-Z_?$][\w?$]*)(\s*)(=)(\s*)(func)(\s*)(\()/,
                push: [{
                    token: "punctuation.definition.parameters.end.nasal",
                    regex: /\)/,
                    next: "pop"
                }, {
                    include: "$self"
                }, {
                    token: "variable.parameter.nasal",
                    regex: /\w/
                }, {
                    defaultToken: "meta.function.nasal"
                }]
            },
            comment: "match stuff like: play = func() { … }"
        }, {
            todo: {
                token: [
                    "entity.name.function.nasal",
                    "meta.function.nasal",
                    "keyword.operator.nasal",
                    "meta.function.nasal",
                    "storage.type.function.nasal",
                    "meta.function.nasal",
                    "punctuation.definition.parameters.begin.nasal"
                ],
                regex: /([a-zA-Z_?$][\w?$]*)(\s*)(=)(\s*\(\s*)(func)(\s*)(\()/,
                push: [{
                    token: "punctuation.definition.parameters.end.nasal",
                    regex: /\)/,
                    next: "pop"
                }, {
                    include: "$self"
                }, {
                    token: "variable.parameter.nasal",
                    regex: /\w/
                }, {
                    defaultToken: "meta.function.nasal"
                }]
            },
            comment: "match stuff like: play = (func() { … }"
        }, {
            todo: {
                token: [
                    "entity.name.function.nasal",
                    "meta.function.hash.nasal",
                    "storage.type.function.nasal",
                    "meta.function.hash.nasal",
                    "punctuation.definition.parameters.begin.nasal"
                ],
                regex: /\b([a-zA-Z_?.$][\w?.$]*)(\s*:\s*\b)(func)(\s*)(\()/,
                push: [{
                    token: "punctuation.definition.parameters.end.nasal",
                    regex: /\)/,
                    next: "pop"
                }, {
                    include: "$self"
                }, {
                    token: "variable.parameter.nasal",
                    regex: /\w/
                }, {
                    defaultToken: "meta.function.hash.nasal"
                }]
            },
            comment: "match stuff like: foobar: func() { … }"
        }, {
            todo: {
                token: [
                    "storage.type.function.nasal",
                    "meta.function.nasal",
                    "punctuation.definition.parameters.begin.nasal"
                ],
                regex: /\b(func)(\s*)(\()/,
                push: [{
                    token: "punctuation.definition.parameters.end.nasal",
                    regex: /\)/,
                    next: "pop"
                }, {
                    include: "$self"
                }, {
                    token: "variable.parameter.nasal",
                    regex: /\w/
                }, {
                    defaultToken: "meta.function.nasal"
                }]
            },
            comment: "match stuff like: func() { … }"
        }, {
            token: [
                "keyword.operator.new.nasal",
                "meta.class.instance.constructor",
                "entity.name.type.instance.nasal"
            ],
            regex: /(new)(\s+)(\w+(?:\.\w*)?)/
        }, {
            token: "keyword.control.nasal",
            regex: /\b(?:if|else|elsif|while|for|foreach|forindex)\b/
        }, {
            token: "keyword.control.nasal",
            regex: /\b(?:break(?:\s+[A-Z]{2,16})?(?=\s*(?:;|\}))|continue(?:\s+[A-Z]{2,16})?(?=\s*(?:;|\}))|[A-Z]{2,16}(?=\s*;(?:[^\)#;]*?;){0,2}[^\)#;]*?\)))\b/
        }, {
            token: "keyword.operator.nasal",
            regex: /!|\*|\-|\+|~|\/|==|=|!=|<=|>=|<|>|!|\?|\:|\*=|\/=|\+=|\-=|~=|\.\.\.|\b(?:and|or)\b/
        }, {
            token: "variable.language.nasal",
            regex: /\b(?:me|arg|parents|obj)\b/
        }, {
            token: "storage.type.nasal",
            regex: /\b(?:return|var)\b/
        }, {
            token: "constant.language.nil.nasal",
            regex: /\bnil\b/
        }, {
            token: "punctuation.definition.string.begin.nasal",
            regex: /'/,
            push: [{
                token: "punctuation.definition.string.end.nasal",
                regex: /'/,
                next: "pop"
            }, {
                token: "constant.character.escape.nasal",
                regex: /\\'/
            }, {
                defaultToken: "string.quoted.single.nasal"
            }],
            comment: "Single quoted strings"
        }, {
            token: "punctuation.definition.string.begin.nasal",
            regex: /"/,
            push: [{
                token: "punctuation.definition.string.end.nasal",
                regex: /"/,
                next: "pop"
            }, {
                token: "constant.character.escape.nasal",
                regex: /\\(?:x[\da-fA-F]{2}|[0-2][0-7]{,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|r|n|t|\\|")/
            }, {
                token: "constant.character.escape.nasal",
                regex: /%(?:%|(?:\d+\$)?[+-]?(?:[ 0]|'.{1})?-?\d*(?:\.\d+)?[bcdeEufFgGosxX])/
            }, {
                defaultToken: "string.quoted.double.nasal"
            }],
            comment: "Double quoted strings"
        }, {
            token: [
                "punctuation.definition.string.begin.nasal",
                "string.other",
                "punctuation.definition.string.end.nasal"
            ],
            regex: /(`)(.)(`)/,
            comment: "Single-byte ASCII character constants"
        }, {
            token: [
                "punctuation.definition.comment.nasal",
                "comment.line.hash.nasal"
            ],
            regex: /(#)(.*$)/,
            comment: "Comments"
        }, {
            token: "constant.numeric.nasal",
            regex: /(?:(?:\b[0-9]+)?\.)?\b[0-9]+(?:[eE][-+]?[0-9]+)?\b/,
            comment: "Integers, floats, and scientific format"
        }, {
            token: "constant.numeric.nasal",
            regex: /0[x|X][0-9a-fA-F]+/,
            comment: "Hex codes"
        }, {
            token: "punctuation.terminator.statement.nasal",
            regex: /\;/
        }, {
            token: [
                "punctuation.section.scope.begin.nasal",
                "punctuation.section.scope.end.nasal"
            ],
            regex: /(\[)(\])/
        }, {
            todo: {
                token: "punctuation.section.scope.begin.nasal",
                regex: /\{/,
                push: [{
                    token: "punctuation.section.scope.end.nasal",
                    regex: /\}/,
                    next: "pop"
                }, {
                    include: "$self"
                }]
            }
        }, {
            todo: {
                token: "punctuation.section.scope.begin.nasal",
                regex: /\(/,
                push: [{
                    token: "punctuation.section.scope.end.nasal",
                    regex: /\)/,
                    next: "pop"
                }, {
                    include: "$self"
                }]
            }
        }, {
            token: "invalid.illegal",
            regex: /%|\$|@|&|\^|\||\\|`/,
            comment: "Illegal characters"
        }, {
            todo: {
                comment: "TODO: Symbols in hash keys"
            },
            comment: "TODO: Symbols in hash keys"
        }, {
            token: "variable.language.nasal",
            regex: /\b(?:append|bind|call|caller|chr|closure|cmp|compile|contains|delete|die|find|ghosttype|id|int|keys|left|num|pop|right|setsize|size|sort|split|sprintf|streq|substr|subvec|typeof|readline)\b/,
            comment: "Core functions"
        }, {
            token: "variable.language.nasal",
            regex: /\b(?:abort|abs|aircraftToCart|addcommand|airportinfo|airwaysRoute|assert|carttogeod|cmdarg|courseAndDistance|createDiscontinuity|createViaTo|createWP|createWPFrom|defined|directory|fgcommand|findAirportsByICAO|findAirportsWithinRange|findFixesByID|findNavaidByFrequency|findNavaidsByFrequency|findNavaidsByID|findNavaidsWithinRange|finddata|flightplan|geodinfo|geodtocart|get_cart_ground_intersection|getprop|greatCircleMove|interpolate|isa|logprint|magvar|maketimer|start|stop|restart|maketimestamp|md5|navinfo|parse_markdown|parsexml|print|printf|printlog|rand|registerFlightPlanDelegate|removecommand|removelistener|resolvepath|setlistener|_setlistener|setprop|srand|systime|thisfunc|tileIndex|tilePath|values)\b/,
            comment: "FG ext core functions"
        }, {
            token: "variable.language.nasal",
            regex: /\b(?:singleShot|isRunning|simulatedTime)\b/,
            comment: "FG ext core functions"
        }, {
            token: "constant.language.nasal",
            regex: /\b(?:D2R|FPS2KT|FT2M|GAL2L|IN2M|KG2LB|KT2FPS|KT2MPS|LG2GAL|LB2KG|M2FT|M2IN|M2NM|MPS2KT|NM2M|R2D)\b/,
            comment: "FG ext core constants"
        }, {
            token: "support.function.nasal",
            regex: /\b(?:addChild|addChildren|alias|clearValue|equals|getAliasTarget|getAttribute|getBoolValue|getChild|getChildren|getIndex|getName|getNode|getParent|getPath|getType|getValue|getValues|initNode|remove|removeAllChildren|removeChild|removeChildren|setAttribute|setBoolValue|setDoubleValue|setIntValue|setValue|setValues|unalias|compileCondition|condition|copy|dump|getNode|nodeList|runBinding|setAll|wrap|wrapNode)\b/,
            comment: "FG func props"
        }, {
            token: "support.class.nasal",
            regex: /\bNode\b/,
            comment: "FG node class"
        }, {
            token: "variable.language.nasal",
            regex: /\b(?:props|globals)\b/,
            comment: "FG func props variables"
        }, {
            todo: {
                token: [
                    "support.function.nasal",
                    "punctuation.definition.arguments.begin.nasal"
                ],
                regex: /\b([a-zA-Z_?$][\w?$]*)(\()/,
                push: [{
                    token: "punctuation.definition.arguments.end.nasal",
                    regex: /\)/,
                    next: "pop"
                }, {
                    include: "$self"
                }, {
                    defaultToken: "meta.function-call.nasal"
                }]
            },
            comment: "function call"
        }]
    };
    
    this.normalizeRules();
};

NasalHighlightRules.metaData = {
    fileTypes: ["nas"],
    name: "Nasal",
    scopeName: "source.nasal"
};


oop.inherits(NasalHighlightRules, TextHighlightRules);

exports.d = NasalHighlightRules;

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxTQUEyQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9uYXNhbC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL25hc2FsX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIi8qICoqKioqIEJFR0lOIExJQ0VOU0UgQkxPQ0sgKioqKipcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgbGljZW5zZTpcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTIsIEFqYXgub3JnIEIuVi5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqICAgICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0XG4gKiAgICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAgICAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodFxuICogICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZVxuICogICAgICAgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqICAgICAqIE5laXRoZXIgdGhlIG5hbWUgb2YgQWpheC5vcmcgQi5WLiBub3IgdGhlXG4gKiAgICAgICBuYW1lcyBvZiBpdHMgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0c1xuICogICAgICAgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG4gKiBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuICogV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxuICogRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgQUpBWC5PUkcgQi5WLiBCRSBMSUFCTEUgRk9SIEFOWVxuICogRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbiAqIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbiAqIExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORFxuICogT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbiAqIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG4gKiBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKiAqKioqKiBFTkQgTElDRU5TRSBCTE9DSyAqKioqKiAqL1xuXG4vKlxuICBUSElTIEZJTEUgV0FTIEFVVE9HRU5FUkFURUQgQlkgbW9kZS50bXBsLmpzXG4qL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIE5hc2FsSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9uYXNhbF9oaWdobGlnaHRfcnVsZXNcIikuTmFzYWxIaWdobGlnaHRSdWxlcztcbi8vIFRPRE86IHBpY2sgYXBwcm9wcmlhdGUgZm9sZCBtb2RlXG52YXIgRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gTmFzYWxIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBGb2xkTW9kZSgpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICAvLyB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIlwiLy9cIlwiO1xuICAgIC8vIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIlwiLypcIlwiLCBlbmQ6IFwiXCIqL1wiXCJ9O1xuICAgIC8vIEV4dHJhIGxvZ2ljIGdvZXMgaGVyZS5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvbmFzYWxcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlOyIsIi8qICoqKioqIEJFR0lOIExJQ0VOU0UgQkxPQ0sgKioqKipcbiAqIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBCU0QgbGljZW5zZTpcbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTIsIEFqYXgub3JnIEIuVi5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogUmVkaXN0cmlidXRpb24gYW5kIHVzZSBpbiBzb3VyY2UgYW5kIGJpbmFyeSBmb3Jtcywgd2l0aCBvciB3aXRob3V0XG4gKiBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcbiAqICAgICAqIFJlZGlzdHJpYnV0aW9ucyBvZiBzb3VyY2UgY29kZSBtdXN0IHJldGFpbiB0aGUgYWJvdmUgY29weXJpZ2h0XG4gKiAgICAgICBub3RpY2UsIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG4gKiAgICAgKiBSZWRpc3RyaWJ1dGlvbnMgaW4gYmluYXJ5IGZvcm0gbXVzdCByZXByb2R1Y2UgdGhlIGFib3ZlIGNvcHlyaWdodFxuICogICAgICAgbm90aWNlLCB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZVxuICogICAgICAgZG9jdW1lbnRhdGlvbiBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqICAgICAqIE5laXRoZXIgdGhlIG5hbWUgb2YgQWpheC5vcmcgQi5WLiBub3IgdGhlXG4gKiAgICAgICBuYW1lcyBvZiBpdHMgY29udHJpYnV0b3JzIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0c1xuICogICAgICAgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dCBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG4gKlxuICogVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG4gKiBBTlkgRVhQUkVTUyBPUiBJTVBMSUVEIFdBUlJBTlRJRVMsIElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBUSEUgSU1QTElFRFxuICogV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxuICogRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgQUpBWC5PUkcgQi5WLiBCRSBMSUFCTEUgRk9SIEFOWVxuICogRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMIERBTUFHRVNcbiAqIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUiBTRVJWSUNFUztcbiAqIExPU1MgT0YgVVNFLCBEQVRBLCBPUiBQUk9GSVRTOyBPUiBCVVNJTkVTUyBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORFxuICogT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksIE9SIFRPUlRcbiAqIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRSBPRiBUSElTXG4gKiBTT0ZUV0FSRSwgRVZFTiBJRiBBRFZJU0VEIE9GIFRIRSBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqXG4gKiAqKioqKiBFTkQgTElDRU5TRSBCTE9DSyAqKioqKiAqL1xuXG4vKiBUaGlzIGZpbGUgd2FzIGF1dG9nZW5lcmF0ZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vQm9iRG90Q29tL05hc2FsLnRtYnVuZGxlL2Jsb2IvOTUxMTNmNjBkYjdjYjdhYzdiNmMzZDg1NDY4Mzc3Mzg3OTQwN2E0OC9TeW50YXhlcy9OYXNhbC50bUxhbmd1YWdlICh1dWlkOiApICovXG4vKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKlxuICogSVQgTUlHSFQgTk9UIEJFIFBFUkZFQ1QgLi4uQnV0IGl0J3MgYSBnb29kIHN0YXJ0IGZyb20gYW4gZXhpc3RpbmcgKi50bWxhbmd1YWdlIGZpbGUuICpcbiAqIGZpbGVUeXBlcyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4gKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBOYXNhbEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBzdGFydDogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm90aGVyLmFsbGNhcHMubmFzYWxcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiW1s6dXBwZXI6XV9dW1s6dXBwZXI6XVs6ZGlnaXQ6XV9dKlxcYig/IVtcXC5cXChcXCdcXFwiXSkvLFxuICAgICAgICAgICAgY29tbWVudDogXCJNYXRjaCBpZGVudGlmaWVycyBpbiBBTExfQ0FQUyBhcyBjb25zdGFudHMsIGV4Y2VwdCB3aGVuIGZvbGxvd2VkIGJ5IGAuYCwgYChgLCBgJ2AsIG9yIGBcXFwiYC5cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2RvOiB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICAgICAgXCJzdXBwb3J0LmNsYXNzLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWV0YS5mdW5jdGlvbi5uYXNhbFwiLFxuICAgICAgICAgICAgICAgICAgICBcImVudGl0eS5uYW1lLmZ1bmN0aW9uLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWV0YS5mdW5jdGlvbi5uYXNhbFwiLFxuICAgICAgICAgICAgICAgICAgICBcImtleXdvcmQub3BlcmF0b3IubmFzYWxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtZXRhLmZ1bmN0aW9uLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlLmZ1bmN0aW9uLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWV0YS5mdW5jdGlvbi5uYXNhbFwiLFxuICAgICAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24ucGFyYW1ldGVycy5iZWdpbi5uYXNhbFwiXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZWdleDogLyhbYS16QS1aXz8uJF1bXFx3Py4kXSopKFxcLikoW2EtekEtWl8/LiRdW1xcdz8uJF0qKShcXHMqKSg9KShcXHMqKShmdW5jKShcXHMqKShcXCgpLyxcbiAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnBhcmFtZXRlcnMuZW5kLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFwpLyxcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCIkc2VsZlwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5wYXJhbWV0ZXIubmFzYWxcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cXHcvXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwibWV0YS5mdW5jdGlvbi5uYXNhbFwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21tZW50OiBcIm1hdGNoIHN0dWZmIGxpa2U6IFNvdW5kLnBsYXkgPSBmdW5jKCkgeyDigKYgfVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRvZG86IHtcbiAgICAgICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgICAgICBcImVudGl0eS5uYW1lLmZ1bmN0aW9uLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWV0YS5mdW5jdGlvbi5uYXNhbFwiLFxuICAgICAgICAgICAgICAgICAgICBcImtleXdvcmQub3BlcmF0b3IubmFzYWxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtZXRhLmZ1bmN0aW9uLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlLmZ1bmN0aW9uLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWV0YS5mdW5jdGlvbi5uYXNhbFwiLFxuICAgICAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24ucGFyYW1ldGVycy5iZWdpbi5uYXNhbFwiXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZWdleDogLyhbYS16QS1aXz8kXVtcXHc/JF0qKShcXHMqKSg9KShcXHMqKShmdW5jKShcXHMqKShcXCgpLyxcbiAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnBhcmFtZXRlcnMuZW5kLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFwpLyxcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCIkc2VsZlwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5wYXJhbWV0ZXIubmFzYWxcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cXHcvXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwibWV0YS5mdW5jdGlvbi5uYXNhbFwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21tZW50OiBcIm1hdGNoIHN0dWZmIGxpa2U6IHBsYXkgPSBmdW5jKCkgeyDigKYgfVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRvZG86IHtcbiAgICAgICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgICAgICBcImVudGl0eS5uYW1lLmZ1bmN0aW9uLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWV0YS5mdW5jdGlvbi5uYXNhbFwiLFxuICAgICAgICAgICAgICAgICAgICBcImtleXdvcmQub3BlcmF0b3IubmFzYWxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtZXRhLmZ1bmN0aW9uLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlLmZ1bmN0aW9uLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWV0YS5mdW5jdGlvbi5uYXNhbFwiLFxuICAgICAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24ucGFyYW1ldGVycy5iZWdpbi5uYXNhbFwiXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZWdleDogLyhbYS16QS1aXz8kXVtcXHc/JF0qKShcXHMqKSg9KShcXHMqXFwoXFxzKikoZnVuYykoXFxzKikoXFwoKS8sXG4gICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5wYXJhbWV0ZXJzLmVuZC5uYXNhbFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogL1xcKS8sXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiJHNlbGZcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUucGFyYW1ldGVyLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFx3L1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcIm1ldGEuZnVuY3Rpb24ubmFzYWxcIlxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tbWVudDogXCJtYXRjaCBzdHVmZiBsaWtlOiBwbGF5ID0gKGZ1bmMoKSB7IOKApiB9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9kbzoge1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZW50aXR5Lm5hbWUuZnVuY3Rpb24ubmFzYWxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtZXRhLmZ1bmN0aW9uLmhhc2gubmFzYWxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzdG9yYWdlLnR5cGUuZnVuY3Rpb24ubmFzYWxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtZXRhLmZ1bmN0aW9uLmhhc2gubmFzYWxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnBhcmFtZXRlcnMuYmVnaW4ubmFzYWxcIlxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXGIoW2EtekEtWl8/LiRdW1xcdz8uJF0qKShcXHMqOlxccypcXGIpKGZ1bmMpKFxccyopKFxcKCkvLFxuICAgICAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24ucGFyYW1ldGVycy5lbmQubmFzYWxcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cXCkvLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiRzZWxmXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlLnBhcmFtZXRlci5uYXNhbFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogL1xcdy9cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJtZXRhLmZ1bmN0aW9uLmhhc2gubmFzYWxcIlxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tbWVudDogXCJtYXRjaCBzdHVmZiBsaWtlOiBmb29iYXI6IGZ1bmMoKSB7IOKApiB9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9kbzoge1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlLmZ1bmN0aW9uLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWV0YS5mdW5jdGlvbi5uYXNhbFwiLFxuICAgICAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24ucGFyYW1ldGVycy5iZWdpbi5uYXNhbFwiXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZWdleDogL1xcYihmdW5jKShcXHMqKShcXCgpLyxcbiAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnBhcmFtZXRlcnMuZW5kLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFwpLyxcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCIkc2VsZlwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5wYXJhbWV0ZXIubmFzYWxcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cXHcvXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwibWV0YS5mdW5jdGlvbi5uYXNhbFwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21tZW50OiBcIm1hdGNoIHN0dWZmIGxpa2U6IGZ1bmMoKSB7IOKApiB9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcImtleXdvcmQub3BlcmF0b3IubmV3Lm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgXCJtZXRhLmNsYXNzLmluc3RhbmNlLmNvbnN0cnVjdG9yXCIsXG4gICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS50eXBlLmluc3RhbmNlLm5hc2FsXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogLyhuZXcpKFxccyspKFxcdysoPzpcXC5cXHcqKT8pL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLmNvbnRyb2wubmFzYWxcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86aWZ8ZWxzZXxlbHNpZnx3aGlsZXxmb3J8Zm9yZWFjaHxmb3JpbmRleClcXGIvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQuY29udHJvbC5uYXNhbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzpicmVhayg/OlxccytbQS1aXXsyLDE2fSk/KD89XFxzKig/Ojt8XFx9KSl8Y29udGludWUoPzpcXHMrW0EtWl17MiwxNn0pPyg/PVxccyooPzo7fFxcfSkpfFtBLVpdezIsMTZ9KD89XFxzKjsoPzpbXlxcKSM7XSo/Oyl7MCwyfVteXFwpIztdKj9cXCkpKVxcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvci5uYXNhbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC8hfFxcKnxcXC18XFwrfH58XFwvfD09fD18IT18PD18Pj18PHw+fCF8XFw/fFxcOnxcXCo9fFxcLz18XFwrPXxcXC09fH49fFxcLlxcLlxcLnxcXGIoPzphbmR8b3IpXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZS5uYXNhbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzptZXxhcmd8cGFyZW50c3xvYmopXFxiL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdG9yYWdlLnR5cGUubmFzYWxcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86cmV0dXJufHZhcilcXGIvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLm5pbC5uYXNhbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGJuaWxcXGIvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmJlZ2luLm5hc2FsXCIsXG4gICAgICAgICAgICByZWdleDogLycvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5lbmQubmFzYWxcIixcbiAgICAgICAgICAgICAgICByZWdleDogLycvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXFxcJy9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nLnF1b3RlZC5zaW5nbGUubmFzYWxcIlxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBjb21tZW50OiBcIlNpbmdsZSBxdW90ZWQgc3RyaW5nc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmJlZ2luLm5hc2FsXCIsXG4gICAgICAgICAgICByZWdleDogL1wiLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuZW5kLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cIi8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUubmFzYWxcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcXFwoPzp4W1xcZGEtZkEtRl17Mn18WzAtMl1bMC03XXssMn18M1swLTZdWzAtN10/fDM3WzAtN10/fFs0LTddWzAtN10/fHJ8bnx0fFxcXFx8XCIpL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUubmFzYWxcIixcbiAgICAgICAgICAgICAgICByZWdleDogLyUoPzolfCg/OlxcZCtcXCQpP1srLV0/KD86WyAwXXwnLnsxfSk/LT9cXGQqKD86XFwuXFxkKyk/W2JjZGVFdWZGZ0dvc3hYXSkvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZy5xdW90ZWQuZG91YmxlLm5hc2FsXCJcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgY29tbWVudDogXCJEb3VibGUgcXVvdGVkIHN0cmluZ3NcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuYmVnaW4ubmFzYWxcIixcbiAgICAgICAgICAgICAgICBcInN0cmluZy5vdGhlclwiLFxuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuZW5kLm5hc2FsXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogLyhgKSguKShgKS8sXG4gICAgICAgICAgICBjb21tZW50OiBcIlNpbmdsZS1ieXRlIEFTQ0lJIGNoYXJhY3RlciBjb25zdGFudHNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5jb21tZW50Lm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgXCJjb21tZW50LmxpbmUuaGFzaC5uYXNhbFwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC8oIykoLiokKS8sXG4gICAgICAgICAgICBjb21tZW50OiBcIkNvbW1lbnRzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpYy5uYXNhbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC8oPzooPzpcXGJbMC05XSspP1xcLik/XFxiWzAtOV0rKD86W2VFXVstK10/WzAtOV0rKT9cXGIvLFxuICAgICAgICAgICAgY29tbWVudDogXCJJbnRlZ2VycywgZmxvYXRzLCBhbmQgc2NpZW50aWZpYyBmb3JtYXRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljLm5hc2FsXCIsXG4gICAgICAgICAgICByZWdleDogLzBbeHxYXVswLTlhLWZBLUZdKy8sXG4gICAgICAgICAgICBjb21tZW50OiBcIkhleCBjb2Rlc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLnRlcm1pbmF0b3Iuc3RhdGVtZW50Lm5hc2FsXCIsXG4gICAgICAgICAgICByZWdleDogL1xcOy9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLnNlY3Rpb24uc2NvcGUuYmVnaW4ubmFzYWxcIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLnNlY3Rpb24uc2NvcGUuZW5kLm5hc2FsXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogLyhcXFspKFxcXSkvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRvZG86IHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5zZWN0aW9uLnNjb3BlLmJlZ2luLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXHsvLFxuICAgICAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLnNlY3Rpb24uc2NvcGUuZW5kLm5hc2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFx9LyxcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCIkc2VsZlwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9kbzoge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLnNlY3Rpb24uc2NvcGUuYmVnaW4ubmFzYWxcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcKC8sXG4gICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uc2VjdGlvbi5zY29wZS5lbmQubmFzYWxcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cXCkvLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiRzZWxmXCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJpbnZhbGlkLmlsbGVnYWxcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvJXxcXCR8QHwmfFxcXnxcXHx8XFxcXHxgLyxcbiAgICAgICAgICAgIGNvbW1lbnQ6IFwiSWxsZWdhbCBjaGFyYWN0ZXJzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9kbzoge1xuICAgICAgICAgICAgICAgIGNvbW1lbnQ6IFwiVE9ETzogU3ltYm9scyBpbiBoYXNoIGtleXNcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbW1lbnQ6IFwiVE9ETzogU3ltYm9scyBpbiBoYXNoIGtleXNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZS5uYXNhbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzphcHBlbmR8YmluZHxjYWxsfGNhbGxlcnxjaHJ8Y2xvc3VyZXxjbXB8Y29tcGlsZXxjb250YWluc3xkZWxldGV8ZGllfGZpbmR8Z2hvc3R0eXBlfGlkfGludHxrZXlzfGxlZnR8bnVtfHBvcHxyaWdodHxzZXRzaXplfHNpemV8c29ydHxzcGxpdHxzcHJpbnRmfHN0cmVxfHN1YnN0cnxzdWJ2ZWN8dHlwZW9mfHJlYWRsaW5lKVxcYi8sXG4gICAgICAgICAgICBjb21tZW50OiBcIkNvcmUgZnVuY3Rpb25zXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2UubmFzYWxcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86YWJvcnR8YWJzfGFpcmNyYWZ0VG9DYXJ0fGFkZGNvbW1hbmR8YWlycG9ydGluZm98YWlyd2F5c1JvdXRlfGFzc2VydHxjYXJ0dG9nZW9kfGNtZGFyZ3xjb3Vyc2VBbmREaXN0YW5jZXxjcmVhdGVEaXNjb250aW51aXR5fGNyZWF0ZVZpYVRvfGNyZWF0ZVdQfGNyZWF0ZVdQRnJvbXxkZWZpbmVkfGRpcmVjdG9yeXxmZ2NvbW1hbmR8ZmluZEFpcnBvcnRzQnlJQ0FPfGZpbmRBaXJwb3J0c1dpdGhpblJhbmdlfGZpbmRGaXhlc0J5SUR8ZmluZE5hdmFpZEJ5RnJlcXVlbmN5fGZpbmROYXZhaWRzQnlGcmVxdWVuY3l8ZmluZE5hdmFpZHNCeUlEfGZpbmROYXZhaWRzV2l0aGluUmFuZ2V8ZmluZGRhdGF8ZmxpZ2h0cGxhbnxnZW9kaW5mb3xnZW9kdG9jYXJ0fGdldF9jYXJ0X2dyb3VuZF9pbnRlcnNlY3Rpb258Z2V0cHJvcHxncmVhdENpcmNsZU1vdmV8aW50ZXJwb2xhdGV8aXNhfGxvZ3ByaW50fG1hZ3ZhcnxtYWtldGltZXJ8c3RhcnR8c3RvcHxyZXN0YXJ0fG1ha2V0aW1lc3RhbXB8bWQ1fG5hdmluZm98cGFyc2VfbWFya2Rvd258cGFyc2V4bWx8cHJpbnR8cHJpbnRmfHByaW50bG9nfHJhbmR8cmVnaXN0ZXJGbGlnaHRQbGFuRGVsZWdhdGV8cmVtb3ZlY29tbWFuZHxyZW1vdmVsaXN0ZW5lcnxyZXNvbHZlcGF0aHxzZXRsaXN0ZW5lcnxfc2V0bGlzdGVuZXJ8c2V0cHJvcHxzcmFuZHxzeXN0aW1lfHRoaXNmdW5jfHRpbGVJbmRleHx0aWxlUGF0aHx2YWx1ZXMpXFxiLyxcbiAgICAgICAgICAgIGNvbW1lbnQ6IFwiRkcgZXh0IGNvcmUgZnVuY3Rpb25zXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2UubmFzYWxcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86c2luZ2xlU2hvdHxpc1J1bm5pbmd8c2ltdWxhdGVkVGltZSlcXGIvLFxuICAgICAgICAgICAgY29tbWVudDogXCJGRyBleHQgY29yZSBmdW5jdGlvbnNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5uYXNhbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzpEMlJ8RlBTMktUfEZUMk18R0FMMkx8SU4yTXxLRzJMQnxLVDJGUFN8S1QyTVBTfExHMkdBTHxMQjJLR3xNMkZUfE0ySU58TTJOTXxNUFMyS1R8Tk0yTXxSMkQpXFxiLyxcbiAgICAgICAgICAgIGNvbW1lbnQ6IFwiRkcgZXh0IGNvcmUgY29uc3RhbnRzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3VwcG9ydC5mdW5jdGlvbi5uYXNhbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXGIoPzphZGRDaGlsZHxhZGRDaGlsZHJlbnxhbGlhc3xjbGVhclZhbHVlfGVxdWFsc3xnZXRBbGlhc1RhcmdldHxnZXRBdHRyaWJ1dGV8Z2V0Qm9vbFZhbHVlfGdldENoaWxkfGdldENoaWxkcmVufGdldEluZGV4fGdldE5hbWV8Z2V0Tm9kZXxnZXRQYXJlbnR8Z2V0UGF0aHxnZXRUeXBlfGdldFZhbHVlfGdldFZhbHVlc3xpbml0Tm9kZXxyZW1vdmV8cmVtb3ZlQWxsQ2hpbGRyZW58cmVtb3ZlQ2hpbGR8cmVtb3ZlQ2hpbGRyZW58c2V0QXR0cmlidXRlfHNldEJvb2xWYWx1ZXxzZXREb3VibGVWYWx1ZXxzZXRJbnRWYWx1ZXxzZXRWYWx1ZXxzZXRWYWx1ZXN8dW5hbGlhc3xjb21waWxlQ29uZGl0aW9ufGNvbmRpdGlvbnxjb3B5fGR1bXB8Z2V0Tm9kZXxub2RlTGlzdHxydW5CaW5kaW5nfHNldEFsbHx3cmFwfHdyYXBOb2RlKVxcYi8sXG4gICAgICAgICAgICBjb21tZW50OiBcIkZHIGZ1bmMgcHJvcHNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdXBwb3J0LmNsYXNzLm5hc2FsXCIsXG4gICAgICAgICAgICByZWdleDogL1xcYk5vZGVcXGIvLFxuICAgICAgICAgICAgY29tbWVudDogXCJGRyBub2RlIGNsYXNzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2UubmFzYWxcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxiKD86cHJvcHN8Z2xvYmFscylcXGIvLFxuICAgICAgICAgICAgY29tbWVudDogXCJGRyBmdW5jIHByb3BzIHZhcmlhYmxlc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRvZG86IHtcbiAgICAgICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb24ubmFzYWxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmFyZ3VtZW50cy5iZWdpbi5uYXNhbFwiXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZWdleDogL1xcYihbYS16QS1aXz8kXVtcXHc/JF0qKShcXCgpLyxcbiAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmFyZ3VtZW50cy5lbmQubmFzYWxcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cXCkvLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiRzZWxmXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJtZXRhLmZ1bmN0aW9uLWNhbGwubmFzYWxcIlxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tbWVudDogXCJmdW5jdGlvbiBjYWxsXCJcbiAgICAgICAgfV1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbk5hc2FsSGlnaGxpZ2h0UnVsZXMubWV0YURhdGEgPSB7XG4gICAgZmlsZVR5cGVzOiBbXCJuYXNcIl0sXG4gICAgbmFtZTogXCJOYXNhbFwiLFxuICAgIHNjb3BlTmFtZTogXCJzb3VyY2UubmFzYWxcIlxufTtcblxuXG5vb3AuaW5oZXJpdHMoTmFzYWxIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5OYXNhbEhpZ2hsaWdodFJ1bGVzID0gTmFzYWxIaWdobGlnaHRSdWxlczsiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=