"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8142],{

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

/***/ 1164:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(59082).Range);

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

/***/ 58142:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var PraatHighlightRules = (__webpack_require__(92719)/* .PraatHighlightRules */ .P);
var MatchingBraceOutdent = (__webpack_require__(1164).MatchingBraceOutdent);
var CStyleFoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

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

/***/ 92719:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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

exports.P = PraatHighlightRules;


/***/ })

}]);
//# sourceMappingURL=bundle.8142.js.map