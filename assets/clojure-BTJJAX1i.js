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
import { t as require_matching_parens_outdent } from "./matching_parens_outdent-CFLr8-4w.js";
var require_clojure_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var ClojureHighlightRules$1 = function() {
		var builtinFunctions = "* *1 *2 *3 *agent* *allow-unresolved-vars* *assert* *clojure-version* *command-line-args* *compile-files* *compile-path* *e *err* *file* *flush-on-newline* *in* *macro-meta* *math-context* *ns* *out* *print-dup* *print-length* *print-level* *print-meta* *print-readably* *read-eval* *source-path* *use-context-classloader* *warn-on-reflection* + - -> ->> .. / < <= = == > &gt; >= &gt;= accessor aclone add-classpath add-watch agent agent-errors aget alength alias all-ns alter alter-meta! alter-var-root amap ancestors and apply areduce array-map aset aset-boolean aset-byte aset-char aset-double aset-float aset-int aset-long aset-short assert assoc assoc! assoc-in associative? atom await await-for await1 bases bean bigdec bigint binding bit-and bit-and-not bit-clear bit-flip bit-not bit-or bit-set bit-shift-left bit-shift-right bit-test bit-xor boolean boolean-array booleans bound-fn bound-fn* butlast byte byte-array bytes cast char char-array char-escape-string char-name-string char? chars chunk chunk-append chunk-buffer chunk-cons chunk-first chunk-next chunk-rest chunked-seq? class class? clear-agent-errors clojure-version coll? comment commute comp comparator compare compare-and-set! compile complement concat cond condp conj conj! cons constantly construct-proxy contains? count counted? create-ns create-struct cycle dec decimal? declare definline defmacro defmethod defmulti defn defn- defonce defstruct delay delay? deliver deref derive descendants destructure disj disj! dissoc dissoc! distinct distinct? doall doc dorun doseq dosync dotimes doto double double-array doubles drop drop-last drop-while empty empty? ensure enumeration-seq eval even? every? false? ffirst file-seq filter find find-doc find-ns find-var first float float-array float? floats flush fn fn? fnext for force format future future-call future-cancel future-cancelled? future-done? future? gen-class gen-interface gensym get get-in get-method get-proxy-class get-thread-bindings get-validator hash hash-map hash-set identical? identity if-let if-not ifn? import in-ns inc init-proxy instance? int int-array integer? interleave intern interpose into into-array ints io! isa? iterate iterator-seq juxt key keys keyword keyword? last lazy-cat lazy-seq let letfn line-seq list list* list? load load-file load-reader load-string loaded-libs locking long long-array longs loop macroexpand macroexpand-1 make-array make-hierarchy map map? mapcat max max-key memfn memoize merge merge-with meta method-sig methods min min-key mod name namespace neg? newline next nfirst nil? nnext not not-any? not-empty not-every? not= ns ns-aliases ns-imports ns-interns ns-map ns-name ns-publics ns-refers ns-resolve ns-unalias ns-unmap nth nthnext num number? odd? or parents partial partition pcalls peek persistent! pmap pop pop! pop-thread-bindings pos? pr pr-str prefer-method prefers primitives-classnames print print-ctor print-doc print-dup print-method print-namespace-doc print-simple print-special-doc print-str printf println println-str prn prn-str promise proxy proxy-call-with-super proxy-mappings proxy-name proxy-super push-thread-bindings pvalues quot rand rand-int range ratio? rational? rationalize re-find re-groups re-matcher re-matches re-pattern re-seq read read-line read-string reduce ref ref-history-count ref-max-history ref-min-history ref-set refer refer-clojure release-pending-sends rem remove remove-method remove-ns remove-watch repeat repeatedly replace replicate require reset! reset-meta! resolve rest resultset-seq reverse reversible? rseq rsubseq second select-keys send send-off seq seq? seque sequence sequential? set set-validator! set? short short-array shorts shutdown-agents slurp some sort sort-by sorted-map sorted-map-by sorted-set sorted-set-by sorted? special-form-anchor special-symbol? split-at split-with str stream? string? struct struct-map subs subseq subvec supers swap! symbol symbol? sync syntax-symbol-anchor take take-last take-nth take-while test the-ns time to-array to-array-2d trampoline transient tree-seq true? type unchecked-add unchecked-dec unchecked-divide unchecked-inc unchecked-multiply unchecked-negate unchecked-remainder unchecked-subtract underive unquote unquote-splicing update-in update-proxy use val vals var-get var-set var? vary-meta vec vector vector? when when-first when-let when-not while with-bindings with-bindings* with-in-str with-loading-context with-local-vars with-meta with-open with-out-str with-precision xml-seq zero? zipmap";
		var keywords = "throw try var def do fn if let loop monitor-enter monitor-exit new quote recur set!";
		var buildinConstants = "true false nil";
		var keywordMapper = this.createKeywordMapper({
			"keyword": keywords,
			"constant.language": buildinConstants,
			"support.function": builtinFunctions
		}, "identifier", false, " ");
		this.$rules = {
			"start": [
				{
					token: "comment",
					regex: ";.*$"
				},
				{
					token: "keyword",
					regex: "[\\(|\\)]"
				},
				{
					token: "keyword",
					regex: "[\\'\\(]"
				},
				{
					token: "keyword",
					regex: "[\\[|\\]]"
				},
				{
					token: "string.regexp",
					regex: "#\"",
					next: "regex"
				},
				{
					token: "keyword",
					regex: "[\\{|\\}|\\#\\{|\\#\\}]"
				},
				{
					token: "keyword",
					regex: "[\\&]"
				},
				{
					token: "keyword",
					regex: "[\\#\\^\\{]"
				},
				{
					token: "keyword",
					regex: "[\\%]"
				},
				{
					token: "keyword",
					regex: "[@]"
				},
				{
					token: "constant.numeric",
					regex: "0[xX][0-9a-fA-F]+\\b"
				},
				{
					token: "constant.numeric",
					regex: "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
				},
				{
					token: "constant.language",
					regex: "[!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+||=|!=|<=|>=|<>|<|>|!|&&]"
				},
				{
					token: keywordMapper,
					regex: "[a-zA-Z_$][a-zA-Z0-9_$\\-]*\\b"
				},
				{
					token: "string",
					regex: "\"",
					next: "string"
				},
				{
					token: "constant",
					regex: /:[^()\[\]{}'"\^%`,;\s]+/
				}
			],
			"string": [
				{
					token: "constant.language.escape",
					regex: "\\\\.|\\\\$"
				},
				{
					token: "string",
					regex: "\"",
					next: "start"
				},
				{ defaultToken: "string" }
			],
			"regex": [
				{
					token: "regexp.keyword.operator",
					regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
				},
				{
					token: "string.regexp",
					regex: "\"",
					next: "start"
				},
				{
					token: "constant.language.escape",
					regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/
				},
				{
					token: "constant.language.delimiter",
					regex: /\|/
				},
				{
					token: "constant.language.escape",
					regex: /\[\^?/,
					next: "regex_character_class"
				},
				{ defaultToken: "string.regexp" }
			],
			"regex_character_class": [
				{
					token: "regexp.charclass.keyword.operator",
					regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
				},
				{
					token: "constant.language.escape",
					regex: "]",
					next: "regex"
				},
				{
					token: "constant.language.escape",
					regex: "-"
				},
				{ defaultToken: "string.regexp.charachterclass" }
			]
		};
	};
	oop$1.inherits(ClojureHighlightRules$1, TextHighlightRules);
	exports.ClojureHighlightRules = ClojureHighlightRules$1;
}));
var require_clojure = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var ClojureHighlightRules = require_clojure_highlight_rules().ClojureHighlightRules;
	var MatchingParensOutdent = require_matching_parens_outdent().MatchingParensOutdent;
	var Mode = function() {
		this.HighlightRules = ClojureHighlightRules;
		this.$outdent = new MatchingParensOutdent();
		this.$behaviour = this.$defaultBehaviour;
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = ";";
		this.minorIndentFunctions = [
			"defn",
			"defn-",
			"defmacro",
			"def",
			"deftest",
			"testing"
		];
		this.$toIndent = function(str) {
			return str.split("").map(function(ch) {
				if (/\s/.exec(ch)) return ch;
				else return " ";
			}).join("");
		};
		this.$calculateIndent = function(line, tab) {
			var baseIndent = this.$getIndent(line);
			var delta = 0;
			var isParen, ch;
			for (var i = line.length - 1; i >= 0; i--) {
				ch = line[i];
				if (ch === "(") {
					delta--;
					isParen = true;
				} else if (ch === "(" || ch === "[" || ch === "{") {
					delta--;
					isParen = false;
				} else if (ch === ")" || ch === "]" || ch === "}") delta++;
				if (delta < 0) break;
			}
			if (delta < 0 && isParen) {
				i += 1;
				var iBefore = i;
				var fn = "";
				while (true) {
					ch = line[i];
					if (ch === " " || ch === "	") if (this.minorIndentFunctions.indexOf(fn) !== -1) return this.$toIndent(line.substring(0, iBefore - 1) + tab);
					else return this.$toIndent(line.substring(0, i + 1));
					else if (ch === void 0) return this.$toIndent(line.substring(0, iBefore - 1) + tab);
					fn += line[i];
					i++;
				}
			} else if (delta < 0 && !isParen) return this.$toIndent(line.substring(0, i + 1));
			else if (delta > 0) {
				baseIndent = baseIndent.substring(0, baseIndent.length - tab.length);
				return baseIndent;
			} else return baseIndent;
		};
		this.getNextLineIndent = function(state, line, tab) {
			return this.$calculateIndent(line, tab);
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.$id = "ace/mode/clojure";
		this.snippetFileId = "ace/snippets/clojure";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_clojure();
