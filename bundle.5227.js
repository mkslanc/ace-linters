"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5227],{

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

/***/ 28670:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(91902)/* .Range */ .Q);

var MatchingBraceOutdent = function() {};

(function() {

    this.checkOutdent = function(line, input) {
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\}/.test(input);
    };

    this.autoOutdent = function(doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({row: row, column: column});

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
    };

    this.$getIndent = function(line) {
        return line.match(/^\s*/)[0];
    };

}).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;


/***/ }),

/***/ 35227:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var PraatHighlightRules = (__webpack_require__(62112)/* .PraatHighlightRules */ .s);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = PraatHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.foldingRules = new CStyleFoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "#";

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start") {
            var match = line.match(/^.*[\{\(\[:]\s*$/);
            if (match) {
                indent += tab;
            }
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };

    this.$id = "ace/mode/praat";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 62112:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var PraatHighlightRules = function() {

    var keywords = (
        "if|then|else|elsif|elif|endif|fi|" +
        "endfor|endproc|" + // related keywords specified below
        "while|endwhile|" +
        "repeat|until|" +
        "select|plus|minus|" +
        "assert|asserterror"
    );

    var predefinedVariables = (
        "macintosh|windows|unix|" +
        "praatVersion|praatVersion\\$" +
        "pi|undefined|" +
        "newline\\$|tab\\$|" +
        "shellDirectory\\$|homeDirectory\\$|preferencesDirectory\\$|" +
        "temporaryDirectory\\$|defaultDirectory\\$"
    );

    // What is "endSendPraat"? Function? Directive?
    var directives = (
        "clearinfo|endSendPraat"
    );

    var functions = (
//      Info functions
        "writeInfo|writeInfoLine|appendInfo|appendInfoLine|info\\$|" +
        "writeFile|writeFileLine|appendFile|appendFileLine|" +
//      Math functions
        "abs|round|floor|ceiling|min|max|imin|imax|" +
        "sqrt|sin|cos|tan|arcsin|arccos|arctan|arctan2|sinc|sincpi|" +
        "exp|ln|lnBeta|lnGamma|log10|log2|" +
        "sinh|cosh|tanh|arcsinh|arccosh|arctanh|" +
        "sigmoid|invSigmoid|erf|erfc|" +
        "random(?:Uniform|Integer|Gauss|Poisson|Binomial)|" +
        "gaussP|gaussQ|invGaussQ|incompleteGammaP|incompleteBeta|" +
        "chiSquareP|chiSquareQ|invChiSquareQ|studentP|studentQ|invStudentQ|" +
        "fisherP|fisherQ|invFisherQ|" +
        "binomialP|binomialQ|invBinomialP|invBinomialQ|" +
        "hertzToBark|barkToHerz|" +
        "hertzToMel|melToHertz|" +
        "hertzToSemitones|semitonesToHerz|" +
        "erb|hertzToErb|erbToHertz|" +
        "phonToDifferenceLimens|differenceLimensToPhon|" +
        "soundPressureToPhon|" +
        "beta|beta2|besselI|besselK|" +
        "numberOfColumns|numberOfRows|" +
//      String functions
        "selected|selected\\$|numberOfSelected|variableExists|"+
        "index|rindex|startsWith|endsWith|"+
        "index_regex|rindex_regex|replace_regex\\$|"+
        "length|extractWord\\$|extractLine\\$|extractNumber|" +
        "left\\$|right\\$|mid\\$|replace\\$|" +
        "date\\$|fixed\\$|percent\\$|" +
//      Array functions
        "zero#|linear#|randomUniform#|randomInteger#|randomGauss#|" +
//      Pause functions
        "beginPause|endPause|" +
//      Demo functions
        "demoShow|demoWindowTitle|demoInput|demoWaitForInput|" +
        "demoClicked|demoClickedIn|demoX|demoY|" +
        "demoKeyPressed|demoKey\\$|" +
        "demoExtraControlKeyPressed|demoShiftKeyPressed|"+
        "demoCommandKeyPressed|demoOptionKeyPressed|" +
//      File functions
        "environment\\$|chooseReadFile\\$|" +
        "chooseDirectory\\$|createDirectory|fileReadable|deleteFile|" +
        "selectObject|removeObject|plusObject|minusObject|" +
        "runScript|exitScript|" +
//      sendpraat functions
        "beginSendPraat|endSendPraat|" +
//      Other
        "objectsAreIdentical"
    );

    var objectTypes = (
        "Activation|AffineTransform|AmplitudeTier|Art|Artword|Autosegment|"  +
        "BarkFilter|CCA|Categories|Cepstrum|Cepstrumc|ChebyshevSeries|"      +
        "ClassificationTable|Cochleagram|Collection|Configuration|"          +
        "Confusion|ContingencyTable|Corpus|Correlation|Covariance|"          +
        "CrossCorrelationTable|CrossCorrelationTables|DTW|Diagonalizer|"     +
        "Discriminant|Dissimilarity|Distance|Distributions|DurationTier|"    +
        "EEG|ERP|ERPTier|Eigen|Excitation|Excitations|ExperimentMFC|FFNet|"  +
        "FeatureWeights|Formant|FormantFilter|FormantGrid|FormantPoint|"     +
        "FormantTier|GaussianMixture|HMM|HMM_Observation|"                   +
        "HMM_ObservationSequence|HMM_State|HMM_StateSequence|Harmonicity|"   +
        "ISpline|Index|Intensity|IntensityTier|IntervalTier|KNN|KlattGrid|"  +
        "KlattTable|LFCC|LPC|Label|LegendreSeries|LinearRegression|"         +
        "LogisticRegression|LongSound|Ltas|MFCC|MSpline|ManPages|"           +
        "Manipulation|Matrix|MelFilter|MixingMatrix|Movie|Network|"          +
        "OTGrammar|OTHistory|OTMulti|PCA|PairDistribution|ParamCurve|"       +
        "Pattern|Permutation|Pitch|PitchTier|PointProcess|Polygon|"          +
        "Polynomial|Procrustes|RealPoint|RealTier|ResultsMFC|Roots|SPINET|"  +
        "SSCP|SVD|Salience|ScalarProduct|Similarity|SimpleString|"           +
        "SortedSetOfString|Sound|Speaker|Spectrogram|Spectrum|SpectrumTier|" +
        "SpeechSynthesizer|SpellingChecker|Strings|StringsIndex|Table|"      +
        "TableOfReal|TextGrid|TextInterval|TextPoint|TextTier|Tier|"         +
        "Transition|VocalTract|Weight|WordList"
    );

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [
            {
            // Interpolated strings
                token : "string.interpolated",
                regex : /'((?:\.?[a-z][a-zA-Z0-9_.]*)(?:\$|#|:[0-9]+)?)'/
            }, {
            // stopwatch
                token : ["text", "text", "keyword.operator", "text", "keyword"],
                regex : /(^\s*)(?:(\.?[a-z][a-zA-Z0-9_.]*\$?\s+)(=)(\s+))?(stopwatch)/
            }, {
            // Directives which introduce unquoted strings
                token : ["text", "keyword", "text", "string"],
                regex : /(^\s*)(print(?:line|tab)?|echo|exit|pause|send(?:praat|socket)|include|execute|system(?:_nocheck)?)(\s+)(.*)/
            }, {
            // Directives with no arguments
                token : ["text", "keyword"],
                regex : "(^\\s*)(" + directives + ")$"
            }, {
            // Operators
                token : ["text", "keyword.operator", "text"],
                regex : /(\s+)((?:\+|-|\/|\*|<|>)=?|==?|!=|%|\^|\||and|or|not)(\s+)/
            }, {
            // Commands
                token : ["text", "text", "keyword.operator", "text", "keyword", "text", "keyword"],
                regex : /(^\s*)(?:(\.?[a-z][a-zA-Z0-9_.]*\$?\s+)(=)(\s+))?(?:((?:no)?warn|(?:unix_)?nocheck|noprogress)(\s+))?((?:[A-Z][^.:"]+)(?:$|(?:\.{3}|:)))/
            }, {
            // Editor mode
                token : ["text", "keyword", "text", "keyword"],
                regex : /(^\s*)((?:no(?:warn|check))?)(\s*)(\b(?:editor(?::?)|endeditor)\b)/
            }, {
            // Demo commands
                token : ["text", "keyword", "text", "keyword"],
                regex : /(^\s*)(?:(demo)?(\s+))((?:[A-Z][^.:"]+)(?:$|(?:\.{3}|:)))/
            }, {
            // Font-sizing commands
                token : ["text", "keyword", "text", "keyword"],
                regex : /^(\s*)(?:(demo)(\s+))?(10|12|14|16|24)$/
            }, {
            // do-style command calls
                token : ["text", "support.function", "text"],
                regex : /(\s*)(do\$?)(\s*:\s*|\s*\(\s*)/
            }, {
            // Object types
                token : "entity.name.type",
                regex : "(" + objectTypes + ")"
            }, {
            // Predefined variables
                token : "variable.language",
                regex : "(" + predefinedVariables + ")"
            }, {
            // Functions
                token : ["support.function", "text"],
                regex : "((?:" + functions + ")\\$?)(\\s*(?::|\\())"
            }, {
            // For-loop declarations
                token : "keyword",
                regex : /(\bfor\b)/,
                next : "for"
            }, {
            // Generic keywords
                token : "keyword",
                regex : "(\\b(?:" + keywords + ")\\b)"
            }, {
            // Generic strings
                token : "string",
                regex : /"[^"]*"/
            }, {
            // Multiline quoted strings
                token : "string",
                regex : /"[^"]*$/,
                next : "brokenstring"
            }, {
            // Form declarations
                token : ["text", "keyword", "text", "entity.name.section"],
                regex : /(^\s*)(\bform\b)(\s+)(.*)/,
                next : "form"
            }, {
            // Numeric constants
                token : "constant.numeric",
                regex : /\b[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
            }, {
            // Procedure declarations
                token : ["keyword", "text", "entity.name.function"],
                regex : /(procedure)(\s+)([^:\s]+)/
            }, {
            // New-style procedure calls
                token : ["entity.name.function", "text"],
                regex : /(@\S+)(:|\s*\()/
            }, {
            // Old-style procedure calls
                token : ["text", "keyword", "text", "entity.name.function"],
                regex : /(^\s*)(call)(\s+)(\S+)/
            }, {
            // Comments
                token : "comment",
                regex : /(^\s*#|;).*$/
            }, {
                token : "text",
                regex : /\s+/
            }
        ],
        "form" : [
            {
                token : ["keyword", "text", "constant.numeric"],
                regex : /((?:optionmenu|choice)\s+)(\S+:\s+)([0-9]+)/
            }, {
                token : ["keyword", "constant.numeric"],
                regex : /((?:option|button)\s+)([+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b)/
            }, {
                token : ["keyword", "string"],
                regex : /((?:option|button)\s+)(.*)/
            }, {
                token : ["keyword", "text", "string"],
                regex : /((?:sentence|text)\s+)(\S+\s*)(.*)/
            }, {
                token : ["keyword", "text", "string", "invalid.illegal"],
                regex : /(word\s+)(\S+\s*)(\S+)?(\s.*)?/
            }, {
                token : ["keyword", "text", "constant.language"],
                regex : /(boolean\s+)(\S+\s*)(0|1|"?(?:yes|no)"?)/
            }, {
                token : ["keyword", "text", "constant.numeric"],
                regex : /((?:real|natural|positive|integer)\s+)(\S+\s*)([+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b)/
            }, {
                token : ["keyword", "string"],
                regex : /(comment\s+)(.*)/
            }, {
                token : "keyword",
                regex : 'endform',
                next : "start"
            }
        ],
        "for" : [
            {
                token : ["keyword", "text", "constant.numeric", "text"],
                regex : /(from|to)(\s+)([+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?)(\s*)/
            }, {
                token : ["keyword", "text"],
                regex : /(from|to)(\s+\S+\s*)/
            }, {
                token : "text",
                regex : /$/,
                next : "start"
            }
        ],
        "brokenstring" : [
            {
                token : ["text", "string"],
                regex : /(\s*\.{3})([^"]*)/
            }, {
                token : "string",
                regex : /"/,
                next : "start"
            }
        ]
    };
};

oop.inherits(PraatHighlightRules, TextHighlightRules);

exports.s = PraatHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSwwSkFBMEosRUFBRTtBQUM1SixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSwyRUFBMkUsRUFBRTtBQUM3RSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxFQUFFO0FBQ2xDLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxTQUEyQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9tYXRjaGluZ19icmFjZV9vdXRkZW50LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcHJhYXQuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9wcmFhdF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbihjb21tZW50UmVnZXgpIHtcbiAgICBpZiAoY29tbWVudFJlZ2V4KSB7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguc3RhcnQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LmVuZClcbiAgICAgICAgKTtcbiAgICB9XG59O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSAvKFtcXHtcXFtcXChdKVteXFx9XFxdXFwpXSokfF5cXHMqKFxcL1xcKikvO1xuICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSAvXlteXFxbXFx7XFwoXSooW1xcfVxcXVxcKV0pfF5bXFxzXFwqXSooXFwqXFwvKS87XG4gICAgdGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmU9IC9eXFxzKihcXC9cXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUgPSAvXlxccyooXFwvXFwqXFwqXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMuc3RhcnRSZWdpb25SZSA9IC9eXFxzKihcXC9cXCp8XFwvXFwvKSM/cmVnaW9uXFxiLztcbiAgICBcbiAgICAvL3ByZXZlbnQgbmFtaW5nIGNvbmZsaWN0IHdpdGggYW55IG1vZGVzIHRoYXQgaW5oZXJpdCBmcm9tIGNzdHlsZSBhbmQgb3ZlcnJpZGUgdGhpcyAobGlrZSBjc2hhcnApXG4gICAgdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2UgPSB0aGlzLmdldEZvbGRXaWRnZXQ7XG4gICAgXG4gICAgLyoqXG4gICAgICogR2V0cyBmb2xkIHdpZGdldCB3aXRoIHNvbWUgbm9uLXN0YW5kYXJkIGV4dHJhczpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8vI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBibG9ja0NvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLyojcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl0gKlsvXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgdHJpcGxlU3RhckZvbGRpbmdTZWN0aW9uXG4gICAgICogICAgICAvKioqIHRoaXMgZm9sZHMgZXZlbiB0aG91Z2ggMSBsaW5lIGJlY2F1c2UgaXQgaGFzIDMgc3RhcnMgKioqWy9dXG4gICAgICogXG4gICAgICogQG5vdGUgdGhlIHBvdW5kIHN5bWJvbCBmb3IgcmVnaW9uIHRhZ3MgaXMgb3B0aW9uYWxcbiAgICAgKi9cbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgIFxuICAgICAgICBpZiAodGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSkge1xuICAgICAgICAgICAgLy8gTm8gd2lkZ2V0IGZvciBzaW5nbGUgbGluZSBibG9jayBjb21tZW50IHVubGVzcyByZWdpb24gb3IgdHJpcGxlIHN0YXJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkgJiYgIXRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdmFyIGZ3ID0gdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2Uoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpO1xuICAgIFxuICAgICAgICBpZiAoIWZ3ICYmIHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjsgLy8gbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgIFxuICAgICAgICByZXR1cm4gZnc7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3csIGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2soc2Vzc2lvbiwgbGluZSwgcm93KTtcbiAgICAgICAgXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVuaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJhbmdlID0gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSArIG1hdGNoWzBdLmxlbmd0aCwgMSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChyYW5nZSAmJiAhcmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgIGlmIChmb3JjZU11bHRpbGluZSkge1xuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IHRoaXMuZ2V0U2VjdGlvblJhbmdlKHNlc3Npb24sIHJvdyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb2xkU3R5bGUgIT0gXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9sZFN0eWxlID09PSBcIm1hcmtiZWdpblwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RvcE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb3NpbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpLCAtMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMuZ2V0U2VjdGlvblJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydEluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgcm93ID0gcm93ICsgMTtcbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgICAgIGlmIChpbmRlbnQgPT09IC0xKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgIChzdGFydEluZGVudCA+IGluZGVudClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIHZhciBzdWJSYW5nZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlKHNlc3Npb24sIFwiYWxsXCIsIHJvdyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzdWJSYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJSYW5nZS5zdGFydC5yb3cgPD0gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJSYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IHN1YlJhbmdlLmVuZC5yb3c7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydEluZGVudCA9PSBpbmRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGgpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogZ2V0cyBjb21tZW50IHJlZ2lvbiBibG9jayB3aXRoIGVuZCByZWdpb24gYXNzdW1lZCB0byBiZSBzdGFydCBvZiBjb21tZW50IGluIGFueSBjc3R5bGUgbW9kZSBvciBTUUwgbW9kZSAoLS0pIHdoaWNoIGluaGVyaXRzIGZyb20gdGhpcy5cbiAgICAgKiBUaGVyZSBtYXkgb3B0aW9uYWxseSBiZSBhIHBvdW5kIHN5bWJvbCBiZWZvcmUgdGhlIHJlZ2lvbi9lbmRyZWdpb24gc3RhdGVtZW50XG4gICAgICovXG4gICAgdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCBsaW5lLCByb3cpIHtcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5zZWFyY2goL1xccyokLyk7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIFxuICAgICAgICB2YXIgcmUgPSAvXlxccyooPzpcXC9cXCp8XFwvXFwvfC0tKSM/KGVuZCk/cmVnaW9uXFxiLztcbiAgICAgICAgdmFyIGRlcHRoID0gMTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbSA9IHJlLmV4ZWMobGluZSk7XG4gICAgICAgICAgICBpZiAoIW0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKG1bMV0pIGRlcHRoLS07XG4gICAgICAgICAgICBlbHNlIGRlcHRoKys7XG5cbiAgICAgICAgICAgIGlmICghZGVwdGgpIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBsaW5lLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBmdW5jdGlvbigpIHt9O1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKGxpbmUsIGlucHV0KSB7XG4gICAgICAgIGlmICghIC9eXFxzKyQvLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIC9eXFxzKlxcfS8udGVzdChpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihkb2MsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IGRvYy5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14oXFxzKlxcfSkvKTtcblxuICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgY29sdW1uID0gbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgb3BlbkJyYWNlUG9zID0gZG9jLmZpbmRNYXRjaGluZ0JyYWNrZXQoe3Jvdzogcm93LCBjb2x1bW46IGNvbHVtbn0pO1xuXG4gICAgICAgIGlmICghb3BlbkJyYWNlUG9zIHx8IG9wZW5CcmFjZVBvcy5yb3cgPT0gcm93KSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGRvYy5nZXRMaW5lKG9wZW5CcmFjZVBvcy5yb3cpKTtcbiAgICAgICAgZG9jLnJlcGxhY2UobmV3IFJhbmdlKHJvdywgMCwgcm93LCBjb2x1bW4tMSksIGluZGVudCk7XG4gICAgfTtcblxuICAgIHRoaXMuJGdldEluZGVudCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIGxpbmUubWF0Y2goL15cXHMqLylbMF07XG4gICAgfTtcblxufSkuY2FsbChNYXRjaGluZ0JyYWNlT3V0ZGVudC5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1hdGNoaW5nQnJhY2VPdXRkZW50ID0gTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFByYWF0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9wcmFhdF9oaWdobGlnaHRfcnVsZXNcIikuUHJhYXRIaWdobGlnaHRSdWxlcztcbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG52YXIgQ1N0eWxlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gUHJhYXRIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgQ1N0eWxlRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiI1wiO1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgICAgICB2YXIgdG9rZW5pemVkTGluZSA9IHRoaXMuZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLCBzdGF0ZSk7XG4gICAgICAgIHZhciB0b2tlbnMgPSB0b2tlbml6ZWRMaW5lLnRva2VucztcblxuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbdG9rZW5zLmxlbmd0aC0xXS50eXBlID09IFwiY29tbWVudFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlID09IFwic3RhcnRcIikge1xuICAgICAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXi4qW1xce1xcKFxcWzpdXFxzKiQvKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kb3V0ZGVudC5jaGVja091dGRlbnQobGluZSwgaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoZG9jLCByb3cpO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcHJhYXRcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBQcmFhdEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIga2V5d29yZHMgPSAoXG4gICAgICAgIFwiaWZ8dGhlbnxlbHNlfGVsc2lmfGVsaWZ8ZW5kaWZ8Zml8XCIgK1xuICAgICAgICBcImVuZGZvcnxlbmRwcm9jfFwiICsgLy8gcmVsYXRlZCBrZXl3b3JkcyBzcGVjaWZpZWQgYmVsb3dcbiAgICAgICAgXCJ3aGlsZXxlbmR3aGlsZXxcIiArXG4gICAgICAgIFwicmVwZWF0fHVudGlsfFwiICtcbiAgICAgICAgXCJzZWxlY3R8cGx1c3xtaW51c3xcIiArXG4gICAgICAgIFwiYXNzZXJ0fGFzc2VydGVycm9yXCJcbiAgICApO1xuXG4gICAgdmFyIHByZWRlZmluZWRWYXJpYWJsZXMgPSAoXG4gICAgICAgIFwibWFjaW50b3NofHdpbmRvd3N8dW5peHxcIiArXG4gICAgICAgIFwicHJhYXRWZXJzaW9ufHByYWF0VmVyc2lvblxcXFwkXCIgK1xuICAgICAgICBcInBpfHVuZGVmaW5lZHxcIiArXG4gICAgICAgIFwibmV3bGluZVxcXFwkfHRhYlxcXFwkfFwiICtcbiAgICAgICAgXCJzaGVsbERpcmVjdG9yeVxcXFwkfGhvbWVEaXJlY3RvcnlcXFxcJHxwcmVmZXJlbmNlc0RpcmVjdG9yeVxcXFwkfFwiICtcbiAgICAgICAgXCJ0ZW1wb3JhcnlEaXJlY3RvcnlcXFxcJHxkZWZhdWx0RGlyZWN0b3J5XFxcXCRcIlxuICAgICk7XG5cbiAgICAvLyBXaGF0IGlzIFwiZW5kU2VuZFByYWF0XCI/IEZ1bmN0aW9uPyBEaXJlY3RpdmU/XG4gICAgdmFyIGRpcmVjdGl2ZXMgPSAoXG4gICAgICAgIFwiY2xlYXJpbmZvfGVuZFNlbmRQcmFhdFwiXG4gICAgKTtcblxuICAgIHZhciBmdW5jdGlvbnMgPSAoXG4vLyAgICAgIEluZm8gZnVuY3Rpb25zXG4gICAgICAgIFwid3JpdGVJbmZvfHdyaXRlSW5mb0xpbmV8YXBwZW5kSW5mb3xhcHBlbmRJbmZvTGluZXxpbmZvXFxcXCR8XCIgK1xuICAgICAgICBcIndyaXRlRmlsZXx3cml0ZUZpbGVMaW5lfGFwcGVuZEZpbGV8YXBwZW5kRmlsZUxpbmV8XCIgK1xuLy8gICAgICBNYXRoIGZ1bmN0aW9uc1xuICAgICAgICBcImFic3xyb3VuZHxmbG9vcnxjZWlsaW5nfG1pbnxtYXh8aW1pbnxpbWF4fFwiICtcbiAgICAgICAgXCJzcXJ0fHNpbnxjb3N8dGFufGFyY3NpbnxhcmNjb3N8YXJjdGFufGFyY3RhbjJ8c2luY3xzaW5jcGl8XCIgK1xuICAgICAgICBcImV4cHxsbnxsbkJldGF8bG5HYW1tYXxsb2cxMHxsb2cyfFwiICtcbiAgICAgICAgXCJzaW5ofGNvc2h8dGFuaHxhcmNzaW5ofGFyY2Nvc2h8YXJjdGFuaHxcIiArXG4gICAgICAgIFwic2lnbW9pZHxpbnZTaWdtb2lkfGVyZnxlcmZjfFwiICtcbiAgICAgICAgXCJyYW5kb20oPzpVbmlmb3JtfEludGVnZXJ8R2F1c3N8UG9pc3NvbnxCaW5vbWlhbCl8XCIgK1xuICAgICAgICBcImdhdXNzUHxnYXVzc1F8aW52R2F1c3NRfGluY29tcGxldGVHYW1tYVB8aW5jb21wbGV0ZUJldGF8XCIgK1xuICAgICAgICBcImNoaVNxdWFyZVB8Y2hpU3F1YXJlUXxpbnZDaGlTcXVhcmVRfHN0dWRlbnRQfHN0dWRlbnRRfGludlN0dWRlbnRRfFwiICtcbiAgICAgICAgXCJmaXNoZXJQfGZpc2hlclF8aW52RmlzaGVyUXxcIiArXG4gICAgICAgIFwiYmlub21pYWxQfGJpbm9taWFsUXxpbnZCaW5vbWlhbFB8aW52Qmlub21pYWxRfFwiICtcbiAgICAgICAgXCJoZXJ0elRvQmFya3xiYXJrVG9IZXJ6fFwiICtcbiAgICAgICAgXCJoZXJ0elRvTWVsfG1lbFRvSGVydHp8XCIgK1xuICAgICAgICBcImhlcnR6VG9TZW1pdG9uZXN8c2VtaXRvbmVzVG9IZXJ6fFwiICtcbiAgICAgICAgXCJlcmJ8aGVydHpUb0VyYnxlcmJUb0hlcnR6fFwiICtcbiAgICAgICAgXCJwaG9uVG9EaWZmZXJlbmNlTGltZW5zfGRpZmZlcmVuY2VMaW1lbnNUb1Bob258XCIgK1xuICAgICAgICBcInNvdW5kUHJlc3N1cmVUb1Bob258XCIgK1xuICAgICAgICBcImJldGF8YmV0YTJ8YmVzc2VsSXxiZXNzZWxLfFwiICtcbiAgICAgICAgXCJudW1iZXJPZkNvbHVtbnN8bnVtYmVyT2ZSb3dzfFwiICtcbi8vICAgICAgU3RyaW5nIGZ1bmN0aW9uc1xuICAgICAgICBcInNlbGVjdGVkfHNlbGVjdGVkXFxcXCR8bnVtYmVyT2ZTZWxlY3RlZHx2YXJpYWJsZUV4aXN0c3xcIitcbiAgICAgICAgXCJpbmRleHxyaW5kZXh8c3RhcnRzV2l0aHxlbmRzV2l0aHxcIitcbiAgICAgICAgXCJpbmRleF9yZWdleHxyaW5kZXhfcmVnZXh8cmVwbGFjZV9yZWdleFxcXFwkfFwiK1xuICAgICAgICBcImxlbmd0aHxleHRyYWN0V29yZFxcXFwkfGV4dHJhY3RMaW5lXFxcXCR8ZXh0cmFjdE51bWJlcnxcIiArXG4gICAgICAgIFwibGVmdFxcXFwkfHJpZ2h0XFxcXCR8bWlkXFxcXCR8cmVwbGFjZVxcXFwkfFwiICtcbiAgICAgICAgXCJkYXRlXFxcXCR8Zml4ZWRcXFxcJHxwZXJjZW50XFxcXCR8XCIgK1xuLy8gICAgICBBcnJheSBmdW5jdGlvbnNcbiAgICAgICAgXCJ6ZXJvI3xsaW5lYXIjfHJhbmRvbVVuaWZvcm0jfHJhbmRvbUludGVnZXIjfHJhbmRvbUdhdXNzI3xcIiArXG4vLyAgICAgIFBhdXNlIGZ1bmN0aW9uc1xuICAgICAgICBcImJlZ2luUGF1c2V8ZW5kUGF1c2V8XCIgK1xuLy8gICAgICBEZW1vIGZ1bmN0aW9uc1xuICAgICAgICBcImRlbW9TaG93fGRlbW9XaW5kb3dUaXRsZXxkZW1vSW5wdXR8ZGVtb1dhaXRGb3JJbnB1dHxcIiArXG4gICAgICAgIFwiZGVtb0NsaWNrZWR8ZGVtb0NsaWNrZWRJbnxkZW1vWHxkZW1vWXxcIiArXG4gICAgICAgIFwiZGVtb0tleVByZXNzZWR8ZGVtb0tleVxcXFwkfFwiICtcbiAgICAgICAgXCJkZW1vRXh0cmFDb250cm9sS2V5UHJlc3NlZHxkZW1vU2hpZnRLZXlQcmVzc2VkfFwiK1xuICAgICAgICBcImRlbW9Db21tYW5kS2V5UHJlc3NlZHxkZW1vT3B0aW9uS2V5UHJlc3NlZHxcIiArXG4vLyAgICAgIEZpbGUgZnVuY3Rpb25zXG4gICAgICAgIFwiZW52aXJvbm1lbnRcXFxcJHxjaG9vc2VSZWFkRmlsZVxcXFwkfFwiICtcbiAgICAgICAgXCJjaG9vc2VEaXJlY3RvcnlcXFxcJHxjcmVhdGVEaXJlY3Rvcnl8ZmlsZVJlYWRhYmxlfGRlbGV0ZUZpbGV8XCIgK1xuICAgICAgICBcInNlbGVjdE9iamVjdHxyZW1vdmVPYmplY3R8cGx1c09iamVjdHxtaW51c09iamVjdHxcIiArXG4gICAgICAgIFwicnVuU2NyaXB0fGV4aXRTY3JpcHR8XCIgK1xuLy8gICAgICBzZW5kcHJhYXQgZnVuY3Rpb25zXG4gICAgICAgIFwiYmVnaW5TZW5kUHJhYXR8ZW5kU2VuZFByYWF0fFwiICtcbi8vICAgICAgT3RoZXJcbiAgICAgICAgXCJvYmplY3RzQXJlSWRlbnRpY2FsXCJcbiAgICApO1xuXG4gICAgdmFyIG9iamVjdFR5cGVzID0gKFxuICAgICAgICBcIkFjdGl2YXRpb258QWZmaW5lVHJhbnNmb3JtfEFtcGxpdHVkZVRpZXJ8QXJ0fEFydHdvcmR8QXV0b3NlZ21lbnR8XCIgICtcbiAgICAgICAgXCJCYXJrRmlsdGVyfENDQXxDYXRlZ29yaWVzfENlcHN0cnVtfENlcHN0cnVtY3xDaGVieXNoZXZTZXJpZXN8XCIgICAgICArXG4gICAgICAgIFwiQ2xhc3NpZmljYXRpb25UYWJsZXxDb2NobGVhZ3JhbXxDb2xsZWN0aW9ufENvbmZpZ3VyYXRpb258XCIgICAgICAgICAgK1xuICAgICAgICBcIkNvbmZ1c2lvbnxDb250aW5nZW5jeVRhYmxlfENvcnB1c3xDb3JyZWxhdGlvbnxDb3ZhcmlhbmNlfFwiICAgICAgICAgICtcbiAgICAgICAgXCJDcm9zc0NvcnJlbGF0aW9uVGFibGV8Q3Jvc3NDb3JyZWxhdGlvblRhYmxlc3xEVFd8RGlhZ29uYWxpemVyfFwiICAgICArXG4gICAgICAgIFwiRGlzY3JpbWluYW50fERpc3NpbWlsYXJpdHl8RGlzdGFuY2V8RGlzdHJpYnV0aW9uc3xEdXJhdGlvblRpZXJ8XCIgICAgK1xuICAgICAgICBcIkVFR3xFUlB8RVJQVGllcnxFaWdlbnxFeGNpdGF0aW9ufEV4Y2l0YXRpb25zfEV4cGVyaW1lbnRNRkN8RkZOZXR8XCIgICtcbiAgICAgICAgXCJGZWF0dXJlV2VpZ2h0c3xGb3JtYW50fEZvcm1hbnRGaWx0ZXJ8Rm9ybWFudEdyaWR8Rm9ybWFudFBvaW50fFwiICAgICArXG4gICAgICAgIFwiRm9ybWFudFRpZXJ8R2F1c3NpYW5NaXh0dXJlfEhNTXxITU1fT2JzZXJ2YXRpb258XCIgICAgICAgICAgICAgICAgICAgK1xuICAgICAgICBcIkhNTV9PYnNlcnZhdGlvblNlcXVlbmNlfEhNTV9TdGF0ZXxITU1fU3RhdGVTZXF1ZW5jZXxIYXJtb25pY2l0eXxcIiAgICtcbiAgICAgICAgXCJJU3BsaW5lfEluZGV4fEludGVuc2l0eXxJbnRlbnNpdHlUaWVyfEludGVydmFsVGllcnxLTk58S2xhdHRHcmlkfFwiICArXG4gICAgICAgIFwiS2xhdHRUYWJsZXxMRkNDfExQQ3xMYWJlbHxMZWdlbmRyZVNlcmllc3xMaW5lYXJSZWdyZXNzaW9ufFwiICAgICAgICAgK1xuICAgICAgICBcIkxvZ2lzdGljUmVncmVzc2lvbnxMb25nU291bmR8THRhc3xNRkNDfE1TcGxpbmV8TWFuUGFnZXN8XCIgICAgICAgICAgICtcbiAgICAgICAgXCJNYW5pcHVsYXRpb258TWF0cml4fE1lbEZpbHRlcnxNaXhpbmdNYXRyaXh8TW92aWV8TmV0d29ya3xcIiAgICAgICAgICArXG4gICAgICAgIFwiT1RHcmFtbWFyfE9USGlzdG9yeXxPVE11bHRpfFBDQXxQYWlyRGlzdHJpYnV0aW9ufFBhcmFtQ3VydmV8XCIgICAgICAgK1xuICAgICAgICBcIlBhdHRlcm58UGVybXV0YXRpb258UGl0Y2h8UGl0Y2hUaWVyfFBvaW50UHJvY2Vzc3xQb2x5Z29ufFwiICAgICAgICAgICtcbiAgICAgICAgXCJQb2x5bm9taWFsfFByb2NydXN0ZXN8UmVhbFBvaW50fFJlYWxUaWVyfFJlc3VsdHNNRkN8Um9vdHN8U1BJTkVUfFwiICArXG4gICAgICAgIFwiU1NDUHxTVkR8U2FsaWVuY2V8U2NhbGFyUHJvZHVjdHxTaW1pbGFyaXR5fFNpbXBsZVN0cmluZ3xcIiAgICAgICAgICAgK1xuICAgICAgICBcIlNvcnRlZFNldE9mU3RyaW5nfFNvdW5kfFNwZWFrZXJ8U3BlY3Ryb2dyYW18U3BlY3RydW18U3BlY3RydW1UaWVyfFwiICtcbiAgICAgICAgXCJTcGVlY2hTeW50aGVzaXplcnxTcGVsbGluZ0NoZWNrZXJ8U3RyaW5nc3xTdHJpbmdzSW5kZXh8VGFibGV8XCIgICAgICArXG4gICAgICAgIFwiVGFibGVPZlJlYWx8VGV4dEdyaWR8VGV4dEludGVydmFsfFRleHRQb2ludHxUZXh0VGllcnxUaWVyfFwiICAgICAgICAgK1xuICAgICAgICBcIlRyYW5zaXRpb258Vm9jYWxUcmFjdHxXZWlnaHR8V29yZExpc3RcIlxuICAgICk7XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vIEludGVycG9sYXRlZCBzdHJpbmdzXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5pbnRlcnBvbGF0ZWRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC8nKCg/OlxcLj9bYS16XVthLXpBLVowLTlfLl0qKSg/OlxcJHwjfDpbMC05XSspPyknL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gc3RvcHdhdGNoXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIFwidGV4dFwiLCBcImtleXdvcmQub3BlcmF0b3JcIiwgXCJ0ZXh0XCIsIFwia2V5d29yZFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IC8oXlxccyopKD86KFxcLj9bYS16XVthLXpBLVowLTlfLl0qXFwkP1xccyspKD0pKFxccyspKT8oc3RvcHdhdGNoKS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIC8vIERpcmVjdGl2ZXMgd2hpY2ggaW50cm9kdWNlIHVucXVvdGVkIHN0cmluZ3NcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgXCJrZXl3b3JkXCIsIFwidGV4dFwiLCBcInN0cmluZ1wiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IC8oXlxccyopKHByaW50KD86bGluZXx0YWIpP3xlY2hvfGV4aXR8cGF1c2V8c2VuZCg/OnByYWF0fHNvY2tldCl8aW5jbHVkZXxleGVjdXRlfHN5c3RlbSg/Ol9ub2NoZWNrKT8pKFxccyspKC4qKS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIC8vIERpcmVjdGl2ZXMgd2l0aCBubyBhcmd1bWVudHNcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgXCJrZXl3b3JkXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoXlxcXFxzKikoXCIgKyBkaXJlY3RpdmVzICsgXCIpJFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAvLyBPcGVyYXRvcnNcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgXCJrZXl3b3JkLm9wZXJhdG9yXCIsIFwidGV4dFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IC8oXFxzKykoKD86XFwrfC18XFwvfFxcKnw8fD4pPT98PT0/fCE9fCV8XFxefFxcfHxhbmR8b3J8bm90KShcXHMrKS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIC8vIENvbW1hbmRzXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIFwidGV4dFwiLCBcImtleXdvcmQub3BlcmF0b3JcIiwgXCJ0ZXh0XCIsIFwia2V5d29yZFwiLCBcInRleHRcIiwgXCJrZXl3b3JkXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyheXFxzKikoPzooXFwuP1thLXpdW2EtekEtWjAtOV8uXSpcXCQ/XFxzKykoPSkoXFxzKykpPyg/OigoPzpubyk/d2FybnwoPzp1bml4Xyk/bm9jaGVja3xub3Byb2dyZXNzKShcXHMrKSk/KCg/OltBLVpdW14uOlwiXSspKD86JHwoPzpcXC57M318OikpKS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIC8vIEVkaXRvciBtb2RlXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIFwia2V5d29yZFwiLCBcInRleHRcIiwgXCJrZXl3b3JkXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyheXFxzKikoKD86bm8oPzp3YXJufGNoZWNrKSk/KShcXHMqKShcXGIoPzplZGl0b3IoPzo6Pyl8ZW5kZWRpdG9yKVxcYikvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAvLyBEZW1vIGNvbW1hbmRzXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIFwia2V5d29yZFwiLCBcInRleHRcIiwgXCJrZXl3b3JkXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyheXFxzKikoPzooZGVtbyk/KFxccyspKSgoPzpbQS1aXVteLjpcIl0rKSg/OiR8KD86XFwuezN9fDopKSkvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAvLyBGb250LXNpemluZyBjb21tYW5kc1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1widGV4dFwiLCBcImtleXdvcmRcIiwgXCJ0ZXh0XCIsIFwia2V5d29yZFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IC9eKFxccyopKD86KGRlbW8pKFxccyspKT8oMTB8MTJ8MTR8MTZ8MjQpJC9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIC8vIGRvLXN0eWxlIGNvbW1hbmQgY2FsbHNcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgXCJzdXBwb3J0LmZ1bmN0aW9uXCIsIFwidGV4dFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IC8oXFxzKikoZG9cXCQ/KShcXHMqOlxccyp8XFxzKlxcKFxccyopL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gT2JqZWN0IHR5cGVzXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImVudGl0eS5uYW1lLnR5cGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKFwiICsgb2JqZWN0VHlwZXMgKyBcIilcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gUHJlZGVmaW5lZCB2YXJpYWJsZXNcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKFwiICsgcHJlZGVmaW5lZFZhcmlhYmxlcyArIFwiKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAvLyBGdW5jdGlvbnNcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcInN1cHBvcnQuZnVuY3Rpb25cIiwgXCJ0ZXh0XCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoKD86XCIgKyBmdW5jdGlvbnMgKyBcIilcXFxcJD8pKFxcXFxzKig/Ojp8XFxcXCgpKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAvLyBGb3ItbG9vcCBkZWNsYXJhdGlvbnNcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyhcXGJmb3JcXGIpLyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJmb3JcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gR2VuZXJpYyBrZXl3b3Jkc1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIihcXFxcYig/OlwiICsga2V5d29yZHMgKyBcIilcXFxcYilcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gR2VuZXJpYyBzdHJpbmdzXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1wiW15cIl0qXCIvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAvLyBNdWx0aWxpbmUgcXVvdGVkIHN0cmluZ3NcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXCJbXlwiXSokLyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJicm9rZW5zdHJpbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gRm9ybSBkZWNsYXJhdGlvbnNcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgXCJrZXl3b3JkXCIsIFwidGV4dFwiLCBcImVudGl0eS5uYW1lLnNlY3Rpb25cIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvKF5cXHMqKShcXGJmb3JtXFxiKShcXHMrKSguKikvLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcImZvcm1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gTnVtZXJpYyBjb25zdGFudHNcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcYlsrLV0/XFxkKyg/Oig/OlxcLlxcZCopPyg/OltlRV1bKy1dP1xcZCspPyk/XFxiL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gUHJvY2VkdXJlIGRlY2xhcmF0aW9uc1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLCBcInRleHRcIiwgXCJlbnRpdHkubmFtZS5mdW5jdGlvblwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IC8ocHJvY2VkdXJlKShcXHMrKShbXjpcXHNdKykvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAvLyBOZXctc3R5bGUgcHJvY2VkdXJlIGNhbGxzXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJlbnRpdHkubmFtZS5mdW5jdGlvblwiLCBcInRleHRcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvKEBcXFMrKSg6fFxccypcXCgpL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgLy8gT2xkLXN0eWxlIHByb2NlZHVyZSBjYWxsc1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1widGV4dFwiLCBcImtleXdvcmRcIiwgXCJ0ZXh0XCIsIFwiZW50aXR5Lm5hbWUuZnVuY3Rpb25cIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvKF5cXHMqKShjYWxsKShcXHMrKShcXFMrKS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgIC8vIENvbW1lbnRzXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC8oXlxccyojfDspLiokL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxzKy9cbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJmb3JtXCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJrZXl3b3JkXCIsIFwidGV4dFwiLCBcImNvbnN0YW50Lm51bWVyaWNcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvKCg/Om9wdGlvbm1lbnV8Y2hvaWNlKVxccyspKFxcUys6XFxzKykoWzAtOV0rKS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIiwgXCJjb25zdGFudC5udW1lcmljXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLygoPzpvcHRpb258YnV0dG9uKVxccyspKFsrLV0/XFxkKyg/Oig/OlxcLlxcZCopPyg/OltlRV1bKy1dP1xcZCspPyk/XFxiKS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIiwgXCJzdHJpbmdcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvKCg/Om9wdGlvbnxidXR0b24pXFxzKykoLiopL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLCBcInRleHRcIiwgXCJzdHJpbmdcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvKCg/OnNlbnRlbmNlfHRleHQpXFxzKykoXFxTK1xccyopKC4qKS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmRcIiwgXCJ0ZXh0XCIsIFwic3RyaW5nXCIsIFwiaW52YWxpZC5pbGxlZ2FsXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyh3b3JkXFxzKykoXFxTK1xccyopKFxcUyspPyhcXHMuKik/L1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLCBcInRleHRcIiwgXCJjb25zdGFudC5sYW5ndWFnZVwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IC8oYm9vbGVhblxccyspKFxcUytcXHMqKSgwfDF8XCI/KD86eWVzfG5vKVwiPykvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJrZXl3b3JkXCIsIFwidGV4dFwiLCBcImNvbnN0YW50Lm51bWVyaWNcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvKCg/OnJlYWx8bmF0dXJhbHxwb3NpdGl2ZXxpbnRlZ2VyKVxccyspKFxcUytcXHMqKShbKy1dP1xcZCsoPzooPzpcXC5cXGQqKT8oPzpbZUVdWystXT9cXGQrKT8pP1xcYikvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJrZXl3b3JkXCIsIFwic3RyaW5nXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyhjb21tZW50XFxzKykoLiopL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnZW5kZm9ybScsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImZvclwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLCBcInRleHRcIiwgXCJjb25zdGFudC5udW1lcmljXCIsIFwidGV4dFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IC8oZnJvbXx0bykoXFxzKykoWystXT9cXGQrKD86KD86XFwuXFxkKik/KD86W2VFXVsrLV0/XFxkKyk/KT8pKFxccyopL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wia2V5d29yZFwiLCBcInRleHRcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvKGZyb218dG8pKFxccytcXFMrXFxzKikvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC8kLyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwiYnJva2Vuc3RyaW5nXCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIFwic3RyaW5nXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyhcXHMqXFwuezN9KShbXlwiXSopL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cIi8sXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbn07XG5cbm9vcC5pbmhlcml0cyhQcmFhdEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlByYWF0SGlnaGxpZ2h0UnVsZXMgPSBQcmFhdEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9