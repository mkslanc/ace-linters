import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import "./lang-DcNOSqFo.js";
import "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./tokenizer-C2b-GJMk.js";
import { a as require_text_highlight_rules, t as require_text } from "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./fold_mode-D1xG2KFM.js";
import { t as require_cstyle } from "./cstyle-C6ktp4d4.js";
import { t as require_matching_brace_outdent } from "./matching_brace_outdent-CSXbwYsT.js";
var require_praat_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var PraatHighlightRules$1 = function() {
		var keywords = "if|then|else|elsif|elif|endif|fi|endfor|endproc|while|endwhile|repeat|until|select|plus|minus|assert|asserterror";
		var predefinedVariables = "macintosh|windows|unix|praatVersion|praatVersion\\$pi|undefined|newline\\$|tab\\$|shellDirectory\\$|homeDirectory\\$|preferencesDirectory\\$|temporaryDirectory\\$|defaultDirectory\\$";
		var directives = "clearinfo|endSendPraat";
		var functions = "writeInfo|writeInfoLine|appendInfo|appendInfoLine|info\\$|writeFile|writeFileLine|appendFile|appendFileLine|abs|round|floor|ceiling|min|max|imin|imax|sqrt|sin|cos|tan|arcsin|arccos|arctan|arctan2|sinc|sincpi|exp|ln|lnBeta|lnGamma|log10|log2|sinh|cosh|tanh|arcsinh|arccosh|arctanh|sigmoid|invSigmoid|erf|erfc|random(?:Uniform|Integer|Gauss|Poisson|Binomial)|gaussP|gaussQ|invGaussQ|incompleteGammaP|incompleteBeta|chiSquareP|chiSquareQ|invChiSquareQ|studentP|studentQ|invStudentQ|fisherP|fisherQ|invFisherQ|binomialP|binomialQ|invBinomialP|invBinomialQ|hertzToBark|barkToHerz|hertzToMel|melToHertz|hertzToSemitones|semitonesToHerz|erb|hertzToErb|erbToHertz|phonToDifferenceLimens|differenceLimensToPhon|soundPressureToPhon|beta|beta2|besselI|besselK|numberOfColumns|numberOfRows|selected|selected\\$|numberOfSelected|variableExists|index|rindex|startsWith|endsWith|index_regex|rindex_regex|replace_regex\\$|length|extractWord\\$|extractLine\\$|extractNumber|left\\$|right\\$|mid\\$|replace\\$|date\\$|fixed\\$|percent\\$|zero#|linear#|randomUniform#|randomInteger#|randomGauss#|beginPause|endPause|demoShow|demoWindowTitle|demoInput|demoWaitForInput|demoClicked|demoClickedIn|demoX|demoY|demoKeyPressed|demoKey\\$|demoExtraControlKeyPressed|demoShiftKeyPressed|demoCommandKeyPressed|demoOptionKeyPressed|environment\\$|chooseReadFile\\$|chooseDirectory\\$|createDirectory|fileReadable|deleteFile|selectObject|removeObject|plusObject|minusObject|runScript|exitScript|beginSendPraat|endSendPraat|objectsAreIdentical";
		var objectTypes = "Activation|AffineTransform|AmplitudeTier|Art|Artword|Autosegment|BarkFilter|CCA|Categories|Cepstrum|Cepstrumc|ChebyshevSeries|ClassificationTable|Cochleagram|Collection|Configuration|Confusion|ContingencyTable|Corpus|Correlation|Covariance|CrossCorrelationTable|CrossCorrelationTables|DTW|Diagonalizer|Discriminant|Dissimilarity|Distance|Distributions|DurationTier|EEG|ERP|ERPTier|Eigen|Excitation|Excitations|ExperimentMFC|FFNet|FeatureWeights|Formant|FormantFilter|FormantGrid|FormantPoint|FormantTier|GaussianMixture|HMM|HMM_Observation|HMM_ObservationSequence|HMM_State|HMM_StateSequence|Harmonicity|ISpline|Index|Intensity|IntensityTier|IntervalTier|KNN|KlattGrid|KlattTable|LFCC|LPC|Label|LegendreSeries|LinearRegression|LogisticRegression|LongSound|Ltas|MFCC|MSpline|ManPages|Manipulation|Matrix|MelFilter|MixingMatrix|Movie|Network|OTGrammar|OTHistory|OTMulti|PCA|PairDistribution|ParamCurve|Pattern|Permutation|Pitch|PitchTier|PointProcess|Polygon|Polynomial|Procrustes|RealPoint|RealTier|ResultsMFC|Roots|SPINET|SSCP|SVD|Salience|ScalarProduct|Similarity|SimpleString|SortedSetOfString|Sound|Speaker|Spectrogram|Spectrum|SpectrumTier|SpeechSynthesizer|SpellingChecker|Strings|StringsIndex|Table|TableOfReal|TextGrid|TextInterval|TextPoint|TextTier|Tier|Transition|VocalTract|Weight|WordList";
		this.$rules = {
			"start": [
				{
					token: "string.interpolated",
					regex: /'((?:\.?[a-z][a-zA-Z0-9_.]*)(?:\$|#|:[0-9]+)?)'/
				},
				{
					token: [
						"text",
						"text",
						"keyword.operator",
						"text",
						"keyword"
					],
					regex: /(^\s*)(?:(\.?[a-z][a-zA-Z0-9_.]*\$?\s+)(=)(\s+))?(stopwatch)/
				},
				{
					token: [
						"text",
						"keyword",
						"text",
						"string"
					],
					regex: /(^\s*)(print(?:line|tab)?|echo|exit|pause|send(?:praat|socket)|include|execute|system(?:_nocheck)?)(\s+)(.*)/
				},
				{
					token: ["text", "keyword"],
					regex: "(^\\s*)(" + directives + ")$"
				},
				{
					token: [
						"text",
						"keyword.operator",
						"text"
					],
					regex: /(\s+)((?:\+|-|\/|\*|<|>)=?|==?|!=|%|\^|\||and|or|not)(\s+)/
				},
				{
					token: [
						"text",
						"text",
						"keyword.operator",
						"text",
						"keyword",
						"text",
						"keyword"
					],
					regex: /(^\s*)(?:(\.?[a-z][a-zA-Z0-9_.]*\$?\s+)(=)(\s+))?(?:((?:no)?warn|(?:unix_)?nocheck|noprogress)(\s+))?((?:[A-Z][^.:"]+)(?:$|(?:\.{3}|:)))/
				},
				{
					token: [
						"text",
						"keyword",
						"text",
						"keyword"
					],
					regex: /(^\s*)((?:no(?:warn|check))?)(\s*)(\b(?:editor(?::?)|endeditor)\b)/
				},
				{
					token: [
						"text",
						"keyword",
						"text",
						"keyword"
					],
					regex: /(^\s*)(?:(demo)?(\s+))((?:[A-Z][^.:"]+)(?:$|(?:\.{3}|:)))/
				},
				{
					token: [
						"text",
						"keyword",
						"text",
						"keyword"
					],
					regex: /^(\s*)(?:(demo)(\s+))?(10|12|14|16|24)$/
				},
				{
					token: [
						"text",
						"support.function",
						"text"
					],
					regex: /(\s*)(do\$?)(\s*:\s*|\s*\(\s*)/
				},
				{
					token: "entity.name.type",
					regex: "(" + objectTypes + ")"
				},
				{
					token: "variable.language",
					regex: "(" + predefinedVariables + ")"
				},
				{
					token: ["support.function", "text"],
					regex: "((?:" + functions + ")\\$?)(\\s*(?::|\\())"
				},
				{
					token: "keyword",
					regex: /(\bfor\b)/,
					next: "for"
				},
				{
					token: "keyword",
					regex: "(\\b(?:" + keywords + ")\\b)"
				},
				{
					token: "string",
					regex: /"[^"]*"/
				},
				{
					token: "string",
					regex: /"[^"]*$/,
					next: "brokenstring"
				},
				{
					token: [
						"text",
						"keyword",
						"text",
						"entity.name.section"
					],
					regex: /(^\s*)(\bform\b)(\s+)(.*)/,
					next: "form"
				},
				{
					token: "constant.numeric",
					regex: /\b[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
				},
				{
					token: [
						"keyword",
						"text",
						"entity.name.function"
					],
					regex: /(procedure)(\s+)([^:\s]+)/
				},
				{
					token: ["entity.name.function", "text"],
					regex: /(@\S+)(:|\s*\()/
				},
				{
					token: [
						"text",
						"keyword",
						"text",
						"entity.name.function"
					],
					regex: /(^\s*)(call)(\s+)(\S+)/
				},
				{
					token: "comment",
					regex: /(^\s*#|;).*$/
				},
				{
					token: "text",
					regex: /\s+/
				}
			],
			"form": [
				{
					token: [
						"keyword",
						"text",
						"constant.numeric"
					],
					regex: /((?:optionmenu|choice)\s+)(\S+:\s+)([0-9]+)/
				},
				{
					token: ["keyword", "constant.numeric"],
					regex: /((?:option|button)\s+)([+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b)/
				},
				{
					token: ["keyword", "string"],
					regex: /((?:option|button)\s+)(.*)/
				},
				{
					token: [
						"keyword",
						"text",
						"string"
					],
					regex: /((?:sentence|text)\s+)(\S+\s*)(.*)/
				},
				{
					token: [
						"keyword",
						"text",
						"string",
						"invalid.illegal"
					],
					regex: /(word\s+)(\S+\s*)(\S+)?(\s.*)?/
				},
				{
					token: [
						"keyword",
						"text",
						"constant.language"
					],
					regex: /(boolean\s+)(\S+\s*)(0|1|"?(?:yes|no)"?)/
				},
				{
					token: [
						"keyword",
						"text",
						"constant.numeric"
					],
					regex: /((?:real|natural|positive|integer)\s+)(\S+\s*)([+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b)/
				},
				{
					token: ["keyword", "string"],
					regex: /(comment\s+)(.*)/
				},
				{
					token: "keyword",
					regex: "endform",
					next: "start"
				}
			],
			"for": [
				{
					token: [
						"keyword",
						"text",
						"constant.numeric",
						"text"
					],
					regex: /(from|to)(\s+)([+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?)(\s*)/
				},
				{
					token: ["keyword", "text"],
					regex: /(from|to)(\s+\S+\s*)/
				},
				{
					token: "text",
					regex: /$/,
					next: "start"
				}
			],
			"brokenstring": [{
				token: ["text", "string"],
				regex: /(\s*\.{3})([^"]*)/
			}, {
				token: "string",
				regex: /"/,
				next: "start"
			}]
		};
	};
	oop$1.inherits(PraatHighlightRules$1, TextHighlightRules);
	exports.PraatHighlightRules = PraatHighlightRules$1;
}));
var require_praat = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var PraatHighlightRules = require_praat_highlight_rules().PraatHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CStyleFoldMode = require_cstyle().FoldMode;
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
			var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
			if (tokens.length && tokens[tokens.length - 1].type == "comment") return indent;
			if (state == "start") {
				if (line.match(/^.*[\{\(\[:]\s*$/)) indent += tab;
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
}));
export default require_praat();
