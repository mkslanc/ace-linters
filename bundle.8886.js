"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8886],{

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

/***/ 38886:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var SPARQLHighlightRules = (__webpack_require__(5489)/* .SPARQLHighlightRules */ .r);
// TODO: pick appropriate fold mode
var FoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = SPARQLHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    // this.lineCommentStart = ""#"";
    // Extra logic goes here.
    this.$id = "ace/mode/sparql";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 5489:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* This file was autogenerated from sparql.tmLanguage (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var SPARQLHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        start: [{
            include: "#comments"
        }, {
            include: "#strings"
        }, {
            include: "#string-language-suffixes"
        }, {
            include: "#string-datatype-suffixes"
        }, {
            include: "#logic-operators"
        }, {
            include: "#relative-urls"
        }, {
            include: "#xml-schema-types"
        }, {
            include: "#rdf-schema-types"
        }, {
            include: "#owl-types"
        }, {
            include: "#qnames"
        }, {
            include: "#keywords"
        }, {
            include: "#built-in-functions"
        }, {
            include: "#variables"
        }, {
            include: "#boolean-literal"
        }, {
            include: "#punctuation-operators"
        }],
        "#boolean-literal": [{
            token: "constant.language.boolean.sparql",
            regex: /true|false/
        }],
        "#built-in-functions": [{
            token: "support.function.sparql",
            regex: /[Aa][Bb][Ss]|[Aa][Vv][Gg]|[Bb][Nn][Oo][Dd][Ee]|[Bb][Oo][Uu][Nn][Dd]|[Cc][Ee][Ii][Ll]|[Cc][Oo][Aa][Ll][Ee][Ss][Cc][Ee]|[Cc][Oo][Nn][Cc][Aa][Tt]|[Cc][Oo][Nn][Tt][Aa][Ii][Nn][Ss]|[Cc][Oo][Uu][Nn][Tt]|[Dd][Aa][Tt][Aa][Tt][Yy][Pp][Ee]|[Dd][Aa][Yy]|[Ee][Nn][Cc][Oo][Dd][Ee]_[Ff][Oo][Rr]_[Uu][Rr][Ii]|[Ee][Xx][Ii][Ss][Tt][Ss]|[Ff][Ll][Oo][Oo][Rr]|[Gg][Rr][Oo][Uu][Pp]_[Cc][Oo][Nn][Cc][Aa][Tt]|[Hh][Oo][Uu][Rr][Ss]|[Ii][Ff]|[Ii][Rr][Ii]|[Ii][Ss][Bb][Ll][Aa][Nn][Kk]|[Ii][Ss][Ii][Rr][Ii]|[Ii][Ss][Ll][Ii][Tt][Ee][Rr][Aa][Ll]|[Ii][Ss][Nn][Uu][Mm][Ee][Rr][Ii][Cc]|[Ii][Ss][Uu][Rr][Ii]|[Ll][Aa][Nn][Gg]|[Ll][Aa][Nn][Gg][Mm][Aa][Tt][Cc][Hh][Ee][Ss]|[Ll][Cc][Aa][Ss][Ee]|[Mm][Aa][Xx]|[Mm][Dd]5|[Mm][Ii][Nn]|[Mm][Ii][Nn][Uu][Tt][Ee][Ss]|[Mm][Oo][Nn][Tt][Hh]|[Nn][Oo][Ww]|[Rr][Aa][Nn][Dd]|[Rr][Ee][Gg][Ee][Xx]|[Rr][Ee][Pp][Ll][Aa][Cc][Ee]|[Rr][Oo][Uu][Nn][Dd]|[Ss][Aa][Mm][Ee][Tt][Ee][Rr][Mm]|[Ss][Aa][Mm][Pp][Ll][Ee]|[Ss][Ee][Cc][Oo][Nn][Dd][Ss]|[Ss][Ee][Pp][Aa][Rr][Aa][Tt][Oo][Rr]|[Ss][Hh][Aa](?:1|256|384|512)|[Ss][Tt][Rr]|[Ss][Tt][Rr][Aa][Ff][Tt][Ee][Rr]|[Ss][Tt][Rr][Bb][Ee][Ff][Oo][Rr][Ee]|[Ss][Tt][Rr][Dd][Tt]|[Ss][Tt][Rr][Ee][Nn][Dd][Ss]|[Ss][Tt][Rr][Ll][Aa][Nn][Gg]|[Ss][Tt][Rr][Ll][Ee][Nn]|[Ss][Tt][Rr][Ss][Tt][Aa][Rr][Tt][Ss]|[Ss][Tt][Rr][Uu][Uu][Ii][Dd]|[Ss][Uu][Bb][Ss][Tt][Rr]|[Ss][Uu][Mm]|[Tt][Ii][Mm][Ee][Zz][Oo][Nn][Ee]|[Tt][Zz]|[Uu][Cc][Aa][Ss][Ee]|[Uu][Rr][Ii]|[Uu][Uu][Ii][Dd]|[Yy][Ee][Aa][Rr]/
        }],
        "#comments": [{
            token: [
                "punctuation.definition.comment.sparql",
                "comment.line.hash.sparql"
            ],
            regex: /(#)(.*$)/
        }],
        "#keywords": [{
            token: "keyword.other.sparql",
            regex: /[Aa][Dd][Dd]|[Aa][Ll][Ll]|[Aa][Ss]|[As][Ss][Cc]|[Aa][Ss][Kk]|[Bb][Aa][Ss][Ee]|[Bb][Ii][Nn][Dd]|[Bb][Yy]|[Cc][Ll][Ee][Aa][Rr]|[Cc][Oo][Nn][Ss][Tt][Rr][Uu][Cc][Tt]|[Cc][Oo][Pp][Yy]|[Cc][Rr][Ee][Aa][Tt][Ee]|[Dd][Aa][Tt][Aa]|[Dd][Ee][Ff][Aa][Uu][Ll][Tt]|[Dd][Ee][Ll][Ee][Tt][Ee]|[Dd][Ee][Sc][Cc]|[Dd][Ee][Ss][Cc][Rr][Ii][Bb][Ee]|[Dd][Ii][Ss][Tt][Ii][Nn][Cc][Tt]|[Dd][Rr][Oo][Pp]|[Ff][Ii][Ll][Tt][Ee][Rr]|[Ff][Rr][Oo][Mm]|[Gg][Rr][Aa][Pp][Hh]|[Gg][Rr][Oo][Uu][Pp]|[Hh][Aa][Vv][Ii][Nn][Gg]|[Ii][Nn][Ss][Ee][Rr][Tt]|[Ll][Ii][Mm][Ii][Tt]|[Ll][Oo][Aa][Dd]|[Mm][Ii][Nn][Uu][Ss]|[Mm][Oo][Vv][Ee]|[Nn][Aa][Mm][Ee][Dd]|[Oo][Ff][Ff][Ss][Ee][Tt]|[Oo][Pp][Tt][Ii][Oo][Nn][Aa][Ll]|[Oo][Rr][Dd][Ee][Rr]|[Pp][Rr][Ee][Ff][Ii][Xx]|[Rr][Ee][Dd][Uu][Cc][Ee][Dd]|[Ss][Ee][Ll][Ee][Cc][Tt]|[Ss][Ee][Pp][Aa][Rr][Aa][Tt][Oo][Rr]|[Ss][Ee][Rr][Vv][Ii][Cc][Ee]|[Ss][Ii][Ll][Ee][Nn][Tt]|[Tt][Oo]|[Uu][Nn][Dd][Ee][Ff]|[Uu][Nn][Ii][Oo][Nn]|[Uu][Ss][Ii][Nn][Gg]|[Vv][Aa][Ll][Uu][Ee][Ss]|[Ww][He][Ee][Rr][Ee]|[Ww][Ii][Tt][Hh]/
        }],
        "#logic-operators": [{
            token: "keyword.operator.logical.sparql",
            regex: /\|\||&&|=|!=|<|>|<=|>=|(?:^|!?\s)IN(?:!?\s|$)|(?:^|!?\s)NOT(?:!?\s|$)|-|\+|\*|\/|\!/
        }],
        "#owl-types": [{
            token: "support.type.datatype.owl.sparql",
            regex: /owl:[a-zA-Z]+/
        }],
        "#punctuation-operators": [{
            token: "keyword.operator.punctuation.sparql",
            regex: /;|,|\.|\(|\)|\{|\}|\|/
        }],
        "#qnames": [{
            token: "entity.name.other.qname.sparql",
            regex: /(?:[a-zA-Z][-_a-zA-Z0-9]*)?:(?:[_a-zA-Z][-_a-zA-Z0-9]*)?/
        }],
        "#rdf-schema-types": [{
            token: "support.type.datatype.rdf.schema.sparql",
            regex: /rdfs?:[a-zA-Z]+|(?:^|\s)a(?:\s|$)/
        }],
        "#relative-urls": [{
            token: "string.quoted.other.relative.url.sparql",
            regex: /</,
            push: [{
                token: "string.quoted.other.relative.url.sparql",
                regex: />/,
                next: "pop"
            }, {
                defaultToken: "string.quoted.other.relative.url.sparql"
            }]
        }],
        "#string-datatype-suffixes": [{
            token: "keyword.operator.datatype.suffix.sparql",
            regex: /\^\^/
        }],
        "#string-language-suffixes": [{
            token: [
                "keyword.operator.language.suffix.sparql",
                "constant.language.suffix.sparql"
            ],
            regex: /(?!")(@)([a-z]+(?:\-[a-z0-9]+)*)/
        }],
        "#strings": [{
            token: "string.quoted.triple.sparql",
            regex: /"""/,
            push: [{
                token: "string.quoted.triple.sparql",
                regex: /"""/,
                next: "pop"
            }, {
                defaultToken: "string.quoted.triple.sparql"
            }]
        }, {
            token: "string.quoted.double.sparql",
            regex: /"/,
            push: [{
                token: "string.quoted.double.sparql",
                regex: /"/,
                next: "pop"
            }, {
                token: "invalid.string.newline",
                regex: /$/
            }, {
                token: "constant.character.escape.sparql",
                regex: /\\./
            }, {
                defaultToken: "string.quoted.double.sparql"
            }]
        }],
        "#variables": [{
            token: "variable.other.sparql",
            regex: /(?:\?|\$)[-_a-zA-Z0-9]+/
        }],
        "#xml-schema-types": [{
            token: "support.type.datatype.schema.sparql",
            regex: /xsd?:[a-z][a-zA-Z]+/
        }]
    };
    
    this.normalizeRules();
};

SPARQLHighlightRules.metaData = {
    fileTypes: ["rq", "sparql"],
    name: "SPARQL",
    scopeName: "source.sparql"
};


oop.inherits(SPARQLHighlightRules, TextHighlightRules);

exports.r = SPARQLHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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U0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxTQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9zcGFycWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9zcGFycWxfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiLypcbiAgVEhJUyBGSUxFIFdBUyBBVVRPR0VORVJBVEVEIEJZIG1vZGUudG1wbC5qc1xuKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBTUEFSUUxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3NwYXJxbF9oaWdobGlnaHRfcnVsZXNcIikuU1BBUlFMSGlnaGxpZ2h0UnVsZXM7XG4vLyBUT0RPOiBwaWNrIGFwcHJvcHJpYXRlIGZvbGQgbW9kZVxudmFyIEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFNQQVJRTEhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEZvbGRNb2RlKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIC8vIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiXCIjXCJcIjtcbiAgICAvLyBFeHRyYSBsb2dpYyBnb2VzIGhlcmUuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3NwYXJxbFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCIvKiBUaGlzIGZpbGUgd2FzIGF1dG9nZW5lcmF0ZWQgZnJvbSBzcGFycWwudG1MYW5ndWFnZSAodXVpZDogKSAqL1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIElUIE1JR0hUIE5PVCBCRSBQRVJGRUNUIC4uLkJ1dCBpdCdzIGEgZ29vZCBzdGFydCBmcm9tIGFuIGV4aXN0aW5nICoudG1sYW5ndWFnZSBmaWxlLiAqXG4gKiBmaWxlVHlwZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgU1BBUlFMSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIHN0YXJ0OiBbe1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjY29tbWVudHNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNzdHJpbmdzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjc3RyaW5nLWxhbmd1YWdlLXN1ZmZpeGVzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjc3RyaW5nLWRhdGF0eXBlLXN1ZmZpeGVzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjbG9naWMtb3BlcmF0b3JzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjcmVsYXRpdmUtdXJsc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI3htbC1zY2hlbWEtdHlwZXNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNyZGYtc2NoZW1hLXR5cGVzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjb3dsLXR5cGVzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjcW5hbWVzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIja2V5d29yZHNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNidWlsdC1pbi1mdW5jdGlvbnNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiN2YXJpYWJsZXNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNib29sZWFuLWxpdGVyYWxcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNwdW5jdHVhdGlvbi1vcGVyYXRvcnNcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCIjYm9vbGVhbi1saXRlcmFsXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5ib29sZWFuLnNwYXJxbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC90cnVlfGZhbHNlL1xuICAgICAgICB9XSxcbiAgICAgICAgXCIjYnVpbHQtaW4tZnVuY3Rpb25zXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdXBwb3J0LmZ1bmN0aW9uLnNwYXJxbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9bQWFdW0JiXVtTc118W0FhXVtWdl1bR2ddfFtCYl1bTm5dW09vXVtEZF1bRWVdfFtCYl1bT29dW1V1XVtObl1bRGRdfFtDY11bRWVdW0lpXVtMbF18W0NjXVtPb11bQWFdW0xsXVtFZV1bU3NdW0NjXVtFZV18W0NjXVtPb11bTm5dW0NjXVtBYV1bVHRdfFtDY11bT29dW05uXVtUdF1bQWFdW0lpXVtObl1bU3NdfFtDY11bT29dW1V1XVtObl1bVHRdfFtEZF1bQWFdW1R0XVtBYV1bVHRdW1l5XVtQcF1bRWVdfFtEZF1bQWFdW1l5XXxbRWVdW05uXVtDY11bT29dW0RkXVtFZV1fW0ZmXVtPb11bUnJdX1tVdV1bUnJdW0lpXXxbRWVdW1h4XVtJaV1bU3NdW1R0XVtTc118W0ZmXVtMbF1bT29dW09vXVtScl18W0dnXVtScl1bT29dW1V1XVtQcF1fW0NjXVtPb11bTm5dW0NjXVtBYV1bVHRdfFtIaF1bT29dW1V1XVtScl1bU3NdfFtJaV1bRmZdfFtJaV1bUnJdW0lpXXxbSWldW1NzXVtCYl1bTGxdW0FhXVtObl1bS2tdfFtJaV1bU3NdW0lpXVtScl1bSWldfFtJaV1bU3NdW0xsXVtJaV1bVHRdW0VlXVtScl1bQWFdW0xsXXxbSWldW1NzXVtObl1bVXVdW01tXVtFZV1bUnJdW0lpXVtDY118W0lpXVtTc11bVXVdW1JyXVtJaV18W0xsXVtBYV1bTm5dW0dnXXxbTGxdW0FhXVtObl1bR2ddW01tXVtBYV1bVHRdW0NjXVtIaF1bRWVdW1NzXXxbTGxdW0NjXVtBYV1bU3NdW0VlXXxbTW1dW0FhXVtYeF18W01tXVtEZF01fFtNbV1bSWldW05uXXxbTW1dW0lpXVtObl1bVXVdW1R0XVtFZV1bU3NdfFtNbV1bT29dW05uXVtUdF1bSGhdfFtObl1bT29dW1d3XXxbUnJdW0FhXVtObl1bRGRdfFtScl1bRWVdW0dnXVtFZV1bWHhdfFtScl1bRWVdW1BwXVtMbF1bQWFdW0NjXVtFZV18W1JyXVtPb11bVXVdW05uXVtEZF18W1NzXVtBYV1bTW1dW0VlXVtUdF1bRWVdW1JyXVtNbV18W1NzXVtBYV1bTW1dW1BwXVtMbF1bRWVdfFtTc11bRWVdW0NjXVtPb11bTm5dW0RkXVtTc118W1NzXVtFZV1bUHBdW0FhXVtScl1bQWFdW1R0XVtPb11bUnJdfFtTc11bSGhdW0FhXSg/OjF8MjU2fDM4NHw1MTIpfFtTc11bVHRdW1JyXXxbU3NdW1R0XVtScl1bQWFdW0ZmXVtUdF1bRWVdW1JyXXxbU3NdW1R0XVtScl1bQmJdW0VlXVtGZl1bT29dW1JyXVtFZV18W1NzXVtUdF1bUnJdW0RkXVtUdF18W1NzXVtUdF1bUnJdW0VlXVtObl1bRGRdW1NzXXxbU3NdW1R0XVtScl1bTGxdW0FhXVtObl1bR2ddfFtTc11bVHRdW1JyXVtMbF1bRWVdW05uXXxbU3NdW1R0XVtScl1bU3NdW1R0XVtBYV1bUnJdW1R0XVtTc118W1NzXVtUdF1bUnJdW1V1XVtVdV1bSWldW0RkXXxbU3NdW1V1XVtCYl1bU3NdW1R0XVtScl18W1NzXVtVdV1bTW1dfFtUdF1bSWldW01tXVtFZV1bWnpdW09vXVtObl1bRWVdfFtUdF1bWnpdfFtVdV1bQ2NdW0FhXVtTc11bRWVdfFtVdV1bUnJdW0lpXXxbVXVdW1V1XVtJaV1bRGRdfFtZeV1bRWVdW0FhXVtScl0vXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNjb21tZW50c1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uY29tbWVudC5zcGFycWxcIixcbiAgICAgICAgICAgICAgICBcImNvbW1lbnQubGluZS5oYXNoLnNwYXJxbFwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC8oIykoLiokKS9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2tleXdvcmRzXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm90aGVyLnNwYXJxbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9bQWFdW0RkXVtEZF18W0FhXVtMbF1bTGxdfFtBYV1bU3NdfFtBc11bU3NdW0NjXXxbQWFdW1NzXVtLa118W0JiXVtBYV1bU3NdW0VlXXxbQmJdW0lpXVtObl1bRGRdfFtCYl1bWXldfFtDY11bTGxdW0VlXVtBYV1bUnJdfFtDY11bT29dW05uXVtTc11bVHRdW1JyXVtVdV1bQ2NdW1R0XXxbQ2NdW09vXVtQcF1bWXldfFtDY11bUnJdW0VlXVtBYV1bVHRdW0VlXXxbRGRdW0FhXVtUdF1bQWFdfFtEZF1bRWVdW0ZmXVtBYV1bVXVdW0xsXVtUdF18W0RkXVtFZV1bTGxdW0VlXVtUdF1bRWVdfFtEZF1bRWVdW1NjXVtDY118W0RkXVtFZV1bU3NdW0NjXVtScl1bSWldW0JiXVtFZV18W0RkXVtJaV1bU3NdW1R0XVtJaV1bTm5dW0NjXVtUdF18W0RkXVtScl1bT29dW1BwXXxbRmZdW0lpXVtMbF1bVHRdW0VlXVtScl18W0ZmXVtScl1bT29dW01tXXxbR2ddW1JyXVtBYV1bUHBdW0hoXXxbR2ddW1JyXVtPb11bVXVdW1BwXXxbSGhdW0FhXVtWdl1bSWldW05uXVtHZ118W0lpXVtObl1bU3NdW0VlXVtScl1bVHRdfFtMbF1bSWldW01tXVtJaV1bVHRdfFtMbF1bT29dW0FhXVtEZF18W01tXVtJaV1bTm5dW1V1XVtTc118W01tXVtPb11bVnZdW0VlXXxbTm5dW0FhXVtNbV1bRWVdW0RkXXxbT29dW0ZmXVtGZl1bU3NdW0VlXVtUdF18W09vXVtQcF1bVHRdW0lpXVtPb11bTm5dW0FhXVtMbF18W09vXVtScl1bRGRdW0VlXVtScl18W1BwXVtScl1bRWVdW0ZmXVtJaV1bWHhdfFtScl1bRWVdW0RkXVtVdV1bQ2NdW0VlXVtEZF18W1NzXVtFZV1bTGxdW0VlXVtDY11bVHRdfFtTc11bRWVdW1BwXVtBYV1bUnJdW0FhXVtUdF1bT29dW1JyXXxbU3NdW0VlXVtScl1bVnZdW0lpXVtDY11bRWVdfFtTc11bSWldW0xsXVtFZV1bTm5dW1R0XXxbVHRdW09vXXxbVXVdW05uXVtEZF1bRWVdW0ZmXXxbVXVdW05uXVtJaV1bT29dW05uXXxbVXVdW1NzXVtJaV1bTm5dW0dnXXxbVnZdW0FhXVtMbF1bVXVdW0VlXVtTc118W1d3XVtIZV1bRWVdW1JyXVtFZV18W1d3XVtJaV1bVHRdW0hoXS9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2xvZ2ljLW9wZXJhdG9yc1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvci5sb2dpY2FsLnNwYXJxbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXHxcXHx8JiZ8PXwhPXw8fD58PD18Pj18KD86XnwhP1xccylJTig/OiE/XFxzfCQpfCg/Ol58IT9cXHMpTk9UKD86IT9cXHN8JCl8LXxcXCt8XFwqfFxcL3xcXCEvXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNvd2wtdHlwZXNcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInN1cHBvcnQudHlwZS5kYXRhdHlwZS5vd2wuc3BhcnFsXCIsXG4gICAgICAgICAgICByZWdleDogL293bDpbYS16QS1aXSsvXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNwdW5jdHVhdGlvbi1vcGVyYXRvcnNcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3IucHVuY3R1YXRpb24uc3BhcnFsXCIsXG4gICAgICAgICAgICByZWdleDogLzt8LHxcXC58XFwofFxcKXxcXHt8XFx9fFxcfC9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI3FuYW1lc1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiZW50aXR5Lm5hbWUub3RoZXIucW5hbWUuc3BhcnFsXCIsXG4gICAgICAgICAgICByZWdleDogLyg/OlthLXpBLVpdWy1fYS16QS1aMC05XSopPzooPzpbX2EtekEtWl1bLV9hLXpBLVowLTldKik/L1xuICAgICAgICB9XSxcbiAgICAgICAgXCIjcmRmLXNjaGVtYS10eXBlc1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic3VwcG9ydC50eXBlLmRhdGF0eXBlLnJkZi5zY2hlbWEuc3BhcnFsXCIsXG4gICAgICAgICAgICByZWdleDogL3JkZnM/OlthLXpBLVpdK3woPzpefFxccylhKD86XFxzfCQpL1xuICAgICAgICB9XSxcbiAgICAgICAgXCIjcmVsYXRpdmUtdXJsc1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnF1b3RlZC5vdGhlci5yZWxhdGl2ZS51cmwuc3BhcnFsXCIsXG4gICAgICAgICAgICByZWdleDogLzwvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucXVvdGVkLm90aGVyLnJlbGF0aXZlLnVybC5zcGFycWxcIixcbiAgICAgICAgICAgICAgICByZWdleDogLz4vLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nLnF1b3RlZC5vdGhlci5yZWxhdGl2ZS51cmwuc3BhcnFsXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNzdHJpbmctZGF0YXR5cGUtc3VmZml4ZXNcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3IuZGF0YXR5cGUuc3VmZml4LnNwYXJxbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXF5cXF4vXG4gICAgICAgIH1dLFxuICAgICAgICBcIiNzdHJpbmctbGFuZ3VhZ2Utc3VmZml4ZXNcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJrZXl3b3JkLm9wZXJhdG9yLmxhbmd1YWdlLnN1ZmZpeC5zcGFycWxcIixcbiAgICAgICAgICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlLnN1ZmZpeC5zcGFycWxcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKD8hXCIpKEApKFthLXpdKyg/OlxcLVthLXowLTldKykqKS9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI3N0cmluZ3NcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5xdW90ZWQudHJpcGxlLnNwYXJxbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cIlwiXCIvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucXVvdGVkLnRyaXBsZS5zcGFycWxcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1wiXCJcIi8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucXVvdGVkLnRyaXBsZS5zcGFycWxcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnF1b3RlZC5kb3VibGUuc3BhcnFsXCIsXG4gICAgICAgICAgICByZWdleDogL1wiLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnF1b3RlZC5kb3VibGUuc3BhcnFsXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cIi8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImludmFsaWQuc3RyaW5nLm5ld2xpbmVcIixcbiAgICAgICAgICAgICAgICByZWdleDogLyQvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZS5zcGFycWxcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcXFwuL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucXVvdGVkLmRvdWJsZS5zcGFycWxcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI3ZhcmlhYmxlc1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUub3RoZXIuc3BhcnFsXCIsXG4gICAgICAgICAgICByZWdleDogLyg/OlxcP3xcXCQpWy1fYS16QS1aMC05XSsvXG4gICAgICAgIH1dLFxuICAgICAgICBcIiN4bWwtc2NoZW1hLXR5cGVzXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdXBwb3J0LnR5cGUuZGF0YXR5cGUuc2NoZW1hLnNwYXJxbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC94c2Q/OlthLXpdW2EtekEtWl0rL1xuICAgICAgICB9XVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxuU1BBUlFMSGlnaGxpZ2h0UnVsZXMubWV0YURhdGEgPSB7XG4gICAgZmlsZVR5cGVzOiBbXCJycVwiLCBcInNwYXJxbFwiXSxcbiAgICBuYW1lOiBcIlNQQVJRTFwiLFxuICAgIHNjb3BlTmFtZTogXCJzb3VyY2Uuc3BhcnFsXCJcbn07XG5cblxub29wLmluaGVyaXRzKFNQQVJRTEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlNQQVJRTEhpZ2hsaWdodFJ1bGVzID0gU1BBUlFMSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=