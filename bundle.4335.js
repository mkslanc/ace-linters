"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4335],{

/***/ 4335:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var ClojureHighlightRules = (__webpack_require__(88748)/* .ClojureHighlightRules */ .K);
var MatchingParensOutdent = (__webpack_require__(8240)/* .MatchingParensOutdent */ .K);

var Mode = function() {
    this.HighlightRules = ClojureHighlightRules;
    this.$outdent = new MatchingParensOutdent();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = ";";
    this.minorIndentFunctions = ["defn", "defn-", "defmacro", "def", "deftest", "testing"];

    this.$toIndent = function(str) {
        return str.split('').map(function(ch) {
            if (/\s/.exec(ch)) {
                return ch;
            } else {
                return ' ';
            }
        }).join('');
    };

    this.$calculateIndent = function(line, tab) {
        var baseIndent = this.$getIndent(line);
        var delta = 0;
        var isParen, ch;
        // Walk back from end of line, find matching braces
        for (var i = line.length - 1; i >= 0; i--) {
            ch = line[i];
            if (ch === '(') {
                delta--;
                isParen = true;
            } else if (ch === '(' || ch === '[' || ch === '{') {
                delta--;
                isParen = false;
            } else if (ch === ')' || ch === ']' || ch === '}') {
                delta++;
            }
            if (delta < 0) {
                break;
            }
        }
        if (delta < 0 && isParen) {
            // Were more brackets opened than closed and was a ( left open?
            i += 1;
            var iBefore = i;
            var fn = '';
            while (true) {
                ch = line[i];
                if (ch === ' ' || ch === '\t') {
                    if(this.minorIndentFunctions.indexOf(fn) !== -1) {
                        return this.$toIndent(line.substring(0, iBefore - 1) + tab);
                    } else {
                        return this.$toIndent(line.substring(0, i + 1));
                    }
                } else if (ch === undefined) {
                    return this.$toIndent(line.substring(0, iBefore - 1) + tab);
                }
                fn += line[i];
                i++;
            }
        } else if(delta < 0 && !isParen) {
            // Were more brackets openend than closed and was it not a (?
            return this.$toIndent(line.substring(0, i+1));
        } else if(delta > 0) {
            // Mere more brackets closed than opened? Outdent.
            baseIndent = baseIndent.substring(0, baseIndent.length - tab.length);
            return baseIndent;
        } else {
            // Were they nicely matched? Just indent like line before.
            return baseIndent;
        }
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


/***/ }),

/***/ 88748:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);



var ClojureHighlightRules = function() {

    var builtinFunctions = (
        '* *1 *2 *3 *agent* *allow-unresolved-vars* *assert* *clojure-version* ' +
        '*command-line-args* *compile-files* *compile-path* *e *err* *file* ' +
        '*flush-on-newline* *in* *macro-meta* *math-context* *ns* *out* ' +
        '*print-dup* *print-length* *print-level* *print-meta* *print-readably* ' +
        '*read-eval* *source-path* *use-context-classloader* ' +
        '*warn-on-reflection* + - -> ->> .. / < <= = ' +
        '== > &gt; >= &gt;= accessor aclone ' +
        'add-classpath add-watch agent agent-errors aget alength alias all-ns ' +
        'alter alter-meta! alter-var-root amap ancestors and apply areduce ' +
        'array-map aset aset-boolean aset-byte aset-char aset-double aset-float ' +
        'aset-int aset-long aset-short assert assoc assoc! assoc-in associative? ' +
        'atom await await-for await1 bases bean bigdec bigint binding bit-and ' +
        'bit-and-not bit-clear bit-flip bit-not bit-or bit-set bit-shift-left ' +
        'bit-shift-right bit-test bit-xor boolean boolean-array booleans ' +
        'bound-fn bound-fn* butlast byte byte-array bytes cast char char-array ' +
        'char-escape-string char-name-string char? chars chunk chunk-append ' +
        'chunk-buffer chunk-cons chunk-first chunk-next chunk-rest chunked-seq? ' +
        'class class? clear-agent-errors clojure-version coll? comment commute ' +
        'comp comparator compare compare-and-set! compile complement concat cond ' +
        'condp conj conj! cons constantly construct-proxy contains? count ' +
        'counted? create-ns create-struct cycle dec decimal? declare definline ' +
        'defmacro defmethod defmulti defn defn- defonce defstruct delay delay? ' +
        'deliver deref derive descendants destructure disj disj! dissoc dissoc! ' +
        'distinct distinct? doall doc dorun doseq dosync dotimes doto double ' +
        'double-array doubles drop drop-last drop-while empty empty? ensure ' +
        'enumeration-seq eval even? every? false? ffirst file-seq filter find ' +
        'find-doc find-ns find-var first float float-array float? floats flush ' +
        'fn fn? fnext for force format future future-call future-cancel ' +
        'future-cancelled? future-done? future? gen-class gen-interface gensym ' +
        'get get-in get-method get-proxy-class get-thread-bindings get-validator ' +
        'hash hash-map hash-set identical? identity if-let if-not ifn? import ' +
        'in-ns inc init-proxy instance? int int-array integer? interleave intern ' +
        'interpose into into-array ints io! isa? iterate iterator-seq juxt key ' +
        'keys keyword keyword? last lazy-cat lazy-seq let letfn line-seq list ' +
        'list* list? load load-file load-reader load-string loaded-libs locking ' +
        'long long-array longs loop macroexpand macroexpand-1 make-array ' +
        'make-hierarchy map map? mapcat max max-key memfn memoize merge ' +
        'merge-with meta method-sig methods min min-key mod name namespace neg? ' +
        'newline next nfirst nil? nnext not not-any? not-empty not-every? not= ' +
        'ns ns-aliases ns-imports ns-interns ns-map ns-name ns-publics ' +
        'ns-refers ns-resolve ns-unalias ns-unmap nth nthnext num number? odd? ' +
        'or parents partial partition pcalls peek persistent! pmap pop pop! ' +
        'pop-thread-bindings pos? pr pr-str prefer-method prefers ' +
        'primitives-classnames print print-ctor print-doc print-dup print-method ' +
        'print-namespace-doc print-simple print-special-doc print-str printf ' +
        'println println-str prn prn-str promise proxy proxy-call-with-super ' +
        'proxy-mappings proxy-name proxy-super push-thread-bindings pvalues quot ' +
        'rand rand-int range ratio? rational? rationalize re-find re-groups ' +
        're-matcher re-matches re-pattern re-seq read read-line read-string ' +
        'reduce ref ref-history-count ref-max-history ref-min-history ref-set ' +
        'refer refer-clojure release-pending-sends rem remove remove-method ' +
        'remove-ns remove-watch repeat repeatedly replace replicate require ' +
        'reset! reset-meta! resolve rest resultset-seq reverse reversible? rseq ' +
        'rsubseq second select-keys send send-off seq seq? seque sequence ' +
        'sequential? set set-validator! set? short short-array shorts ' +
        'shutdown-agents slurp some sort sort-by sorted-map sorted-map-by ' +
        'sorted-set sorted-set-by sorted? special-form-anchor special-symbol? ' +
        'split-at split-with str stream? string? struct struct-map subs subseq ' +
        'subvec supers swap! symbol symbol? sync syntax-symbol-anchor take ' +
        'take-last take-nth take-while test the-ns time to-array to-array-2d ' +
        'trampoline transient tree-seq true? type unchecked-add unchecked-dec ' +
        'unchecked-divide unchecked-inc unchecked-multiply unchecked-negate ' +
        'unchecked-remainder unchecked-subtract underive unquote ' +
        'unquote-splicing update-in update-proxy use val vals var-get var-set ' +
        'var? vary-meta vec vector vector? when when-first when-let when-not ' +
        'while with-bindings with-bindings* with-in-str with-loading-context ' +
        'with-local-vars with-meta with-open with-out-str with-precision xml-seq ' +
        'zero? zipmap'
    );

    var keywords = ('throw try var ' +
        'def do fn if let loop monitor-enter monitor-exit new quote recur set!'
    );

    var buildinConstants = ("true false nil");

    var keywordMapper = this.createKeywordMapper({
        "keyword": keywords,
        "constant.language": buildinConstants,
        "support.function": builtinFunctions
    }, "identifier", false, " ");

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start" : [
            {
                token : "comment",
                regex : ";.*$"
            }, {
                token : "keyword", //parens
                regex : "[\\(|\\)]"
            }, {
                token : "keyword", //lists
                regex : "[\\'\\(]"
            }, {
                token : "keyword", //vectors
                regex : "[\\[|\\]]"
            }, {
                token : "string.regexp", //Regular Expressions
                regex : '#"',
                next: "regex"
            }, {
                token : "keyword", //sets and maps
                regex : "[\\{|\\}|\\#\\{|\\#\\}]"
            }, {
                    token : "keyword", // ampersands
                    regex : '[\\&]'
            }, {
                    token : "keyword", // metadata
                    regex : '[\\#\\^\\{]'
            }, {
                    token : "keyword", // anonymous fn syntactic sugar
                    regex : '[\\%]'
            }, {
                    token : "keyword", // deref reader macro
                    regex : '[@]'
            }, {
                token : "constant.numeric", // hex
                regex : "0[xX][0-9a-fA-F]+\\b"
            }, {
                token : "constant.numeric", // float
                regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token : "constant.language",
                regex : '[!|\\$|%|&|\\*|\\-\\-|\\-|\\+\\+|\\+||=|!=|<=|>=|<>|<|>|!|&&]'
            }, {
                token : keywordMapper,
                regex : "[a-zA-Z_$][a-zA-Z0-9_$\\-]*\\b"
            }, {
                token : "string", // single line
                regex : '"',
                next: "string"
            }, {
                token : "constant", // symbol
                regex : /:[^()\[\]{}'"\^%`,;\s]+/
            }

        ],
        "string" : [
            {
                token : "constant.language.escape",
                regex : "\\\\.|\\\\$"
            }, {
                token : "string",
                regex : '"',
                next : "start"
            }, {
                defaultToken: "string"
            }
        ],
         "regex": [
            {
                // escapes
                token: "regexp.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
            }, {
                // flag
                token: "string.regexp",
                regex: '"',
                next: "start"
            }, {
                // operators
                token : "constant.language.escape",
                regex: /\(\?[:=!]|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/
            }, {
                token : "constant.language.delimiter",
                regex: /\|/
            }, {
                token: "constant.language.escape",
                regex: /\[\^?/,
                next: "regex_character_class"
            }, {
                defaultToken: "string.regexp"
            }
        ],
        "regex_character_class": [
            {
                token: "regexp.charclass.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
            }, {
                token: "constant.language.escape",
                regex: "]",
                next: "regex"
            }, {
                token: "constant.language.escape",
                regex: "-"
            }, {
                defaultToken: "string.regexp.charachterclass"
            }
        ]
    };
};

oop.inherits(ClojureHighlightRules, TextHighlightRules);

exports.K = ClojureHighlightRules;


/***/ }),

/***/ 8240:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(91902)/* .Range */ .Q);

var MatchingParensOutdent = function() {};

(function() {

    this.checkOutdent = function(line, input) {
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\)/.test(input);
    };

    this.autoOutdent = function(doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\))/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({row: row, column: column});

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
    };

    this.$getIndent = function(line) {
        var match = line.match(/^(\s+)/);
        if (match) {
            return match[1];
        }

        return "";
    };

}).call(MatchingParensOutdent.prototype);

exports.K = MatchingParensOutdent;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLEVBQUUsY0FBYyxFQUFFO0FBQzlELGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQTZCOzs7Ozs7OztBQy9NaEI7O0FBRWIsWUFBWSwyQ0FBeUI7O0FBRXJDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG9EQUFvRCx5QkFBeUI7O0FBRTdFOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsQ0FBQzs7QUFFRCxTQUE2QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY2xvanVyZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2Nsb2p1cmVfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWF0Y2hpbmdfcGFyZW5zX291dGRlbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBDbG9qdXJlSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9jbG9qdXJlX2hpZ2hsaWdodF9ydWxlc1wiKS5DbG9qdXJlSGlnaGxpZ2h0UnVsZXM7XG52YXIgTWF0Y2hpbmdQYXJlbnNPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfcGFyZW5zX291dGRlbnRcIikuTWF0Y2hpbmdQYXJlbnNPdXRkZW50O1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBDbG9qdXJlSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy4kb3V0ZGVudCA9IG5ldyBNYXRjaGluZ1BhcmVuc091dGRlbnQoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiO1wiO1xuICAgIHRoaXMubWlub3JJbmRlbnRGdW5jdGlvbnMgPSBbXCJkZWZuXCIsIFwiZGVmbi1cIiwgXCJkZWZtYWNyb1wiLCBcImRlZlwiLCBcImRlZnRlc3RcIiwgXCJ0ZXN0aW5nXCJdO1xuXG4gICAgdGhpcy4kdG9JbmRlbnQgPSBmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5zcGxpdCgnJykubWFwKGZ1bmN0aW9uKGNoKSB7XG4gICAgICAgICAgICBpZiAoL1xccy8uZXhlYyhjaCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2g7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiAnICc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmpvaW4oJycpO1xuICAgIH07XG5cbiAgICB0aGlzLiRjYWxjdWxhdGVJbmRlbnQgPSBmdW5jdGlvbihsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGJhc2VJbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG4gICAgICAgIHZhciBkZWx0YSA9IDA7XG4gICAgICAgIHZhciBpc1BhcmVuLCBjaDtcbiAgICAgICAgLy8gV2FsayBiYWNrIGZyb20gZW5kIG9mIGxpbmUsIGZpbmQgbWF0Y2hpbmcgYnJhY2VzXG4gICAgICAgIGZvciAodmFyIGkgPSBsaW5lLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgICBjaCA9IGxpbmVbaV07XG4gICAgICAgICAgICBpZiAoY2ggPT09ICcoJykge1xuICAgICAgICAgICAgICAgIGRlbHRhLS07XG4gICAgICAgICAgICAgICAgaXNQYXJlbiA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoID09PSAnKCcgfHwgY2ggPT09ICdbJyB8fCBjaCA9PT0gJ3snKSB7XG4gICAgICAgICAgICAgICAgZGVsdGEtLTtcbiAgICAgICAgICAgICAgICBpc1BhcmVuID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNoID09PSAnKScgfHwgY2ggPT09ICddJyB8fCBjaCA9PT0gJ30nKSB7XG4gICAgICAgICAgICAgICAgZGVsdGErKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChkZWx0YSA8IDApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoZGVsdGEgPCAwICYmIGlzUGFyZW4pIHtcbiAgICAgICAgICAgIC8vIFdlcmUgbW9yZSBicmFja2V0cyBvcGVuZWQgdGhhbiBjbG9zZWQgYW5kIHdhcyBhICggbGVmdCBvcGVuP1xuICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICAgICAgdmFyIGlCZWZvcmUgPSBpO1xuICAgICAgICAgICAgdmFyIGZuID0gJyc7XG4gICAgICAgICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNoID0gbGluZVtpXTtcbiAgICAgICAgICAgICAgICBpZiAoY2ggPT09ICcgJyB8fCBjaCA9PT0gJ1xcdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYodGhpcy5taW5vckluZGVudEZ1bmN0aW9ucy5pbmRleE9mKGZuKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiR0b0luZGVudChsaW5lLnN1YnN0cmluZygwLCBpQmVmb3JlIC0gMSkgKyB0YWIpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHRvSW5kZW50KGxpbmUuc3Vic3RyaW5nKDAsIGkgKyAxKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNoID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHRvSW5kZW50KGxpbmUuc3Vic3RyaW5nKDAsIGlCZWZvcmUgLSAxKSArIHRhYik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGZuICs9IGxpbmVbaV07XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYoZGVsdGEgPCAwICYmICFpc1BhcmVuKSB7XG4gICAgICAgICAgICAvLyBXZXJlIG1vcmUgYnJhY2tldHMgb3BlbmVuZCB0aGFuIGNsb3NlZCBhbmQgd2FzIGl0IG5vdCBhICg/XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kdG9JbmRlbnQobGluZS5zdWJzdHJpbmcoMCwgaSsxKSk7XG4gICAgICAgIH0gZWxzZSBpZihkZWx0YSA+IDApIHtcbiAgICAgICAgICAgIC8vIE1lcmUgbW9yZSBicmFja2V0cyBjbG9zZWQgdGhhbiBvcGVuZWQ/IE91dGRlbnQuXG4gICAgICAgICAgICBiYXNlSW5kZW50ID0gYmFzZUluZGVudC5zdWJzdHJpbmcoMCwgYmFzZUluZGVudC5sZW5ndGggLSB0YWIubGVuZ3RoKTtcbiAgICAgICAgICAgIHJldHVybiBiYXNlSW5kZW50O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gV2VyZSB0aGV5IG5pY2VseSBtYXRjaGVkPyBKdXN0IGluZGVudCBsaWtlIGxpbmUgYmVmb3JlLlxuICAgICAgICAgICAgcmV0dXJuIGJhc2VJbmRlbnQ7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNhbGN1bGF0ZUluZGVudChsaW5lLCB0YWIpO1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kb3V0ZGVudC5jaGVja091dGRlbnQobGluZSwgaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoZG9jLCByb3cpO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvY2xvanVyZVwiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL2Nsb2p1cmVcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cblxuXG52YXIgQ2xvanVyZUhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgYnVpbHRpbkZ1bmN0aW9ucyA9IChcbiAgICAgICAgJyogKjEgKjIgKjMgKmFnZW50KiAqYWxsb3ctdW5yZXNvbHZlZC12YXJzKiAqYXNzZXJ0KiAqY2xvanVyZS12ZXJzaW9uKiAnICtcbiAgICAgICAgJypjb21tYW5kLWxpbmUtYXJncyogKmNvbXBpbGUtZmlsZXMqICpjb21waWxlLXBhdGgqICplICplcnIqICpmaWxlKiAnICtcbiAgICAgICAgJypmbHVzaC1vbi1uZXdsaW5lKiAqaW4qICptYWNyby1tZXRhKiAqbWF0aC1jb250ZXh0KiAqbnMqICpvdXQqICcgK1xuICAgICAgICAnKnByaW50LWR1cCogKnByaW50LWxlbmd0aCogKnByaW50LWxldmVsKiAqcHJpbnQtbWV0YSogKnByaW50LXJlYWRhYmx5KiAnICtcbiAgICAgICAgJypyZWFkLWV2YWwqICpzb3VyY2UtcGF0aCogKnVzZS1jb250ZXh0LWNsYXNzbG9hZGVyKiAnICtcbiAgICAgICAgJyp3YXJuLW9uLXJlZmxlY3Rpb24qICsgLSAtPiAtPj4gLi4gLyA8IDw9ID0gJyArXG4gICAgICAgICc9PSA+ICZndDsgPj0gJmd0Oz0gYWNjZXNzb3IgYWNsb25lICcgK1xuICAgICAgICAnYWRkLWNsYXNzcGF0aCBhZGQtd2F0Y2ggYWdlbnQgYWdlbnQtZXJyb3JzIGFnZXQgYWxlbmd0aCBhbGlhcyBhbGwtbnMgJyArXG4gICAgICAgICdhbHRlciBhbHRlci1tZXRhISBhbHRlci12YXItcm9vdCBhbWFwIGFuY2VzdG9ycyBhbmQgYXBwbHkgYXJlZHVjZSAnICtcbiAgICAgICAgJ2FycmF5LW1hcCBhc2V0IGFzZXQtYm9vbGVhbiBhc2V0LWJ5dGUgYXNldC1jaGFyIGFzZXQtZG91YmxlIGFzZXQtZmxvYXQgJyArXG4gICAgICAgICdhc2V0LWludCBhc2V0LWxvbmcgYXNldC1zaG9ydCBhc3NlcnQgYXNzb2MgYXNzb2MhIGFzc29jLWluIGFzc29jaWF0aXZlPyAnICtcbiAgICAgICAgJ2F0b20gYXdhaXQgYXdhaXQtZm9yIGF3YWl0MSBiYXNlcyBiZWFuIGJpZ2RlYyBiaWdpbnQgYmluZGluZyBiaXQtYW5kICcgK1xuICAgICAgICAnYml0LWFuZC1ub3QgYml0LWNsZWFyIGJpdC1mbGlwIGJpdC1ub3QgYml0LW9yIGJpdC1zZXQgYml0LXNoaWZ0LWxlZnQgJyArXG4gICAgICAgICdiaXQtc2hpZnQtcmlnaHQgYml0LXRlc3QgYml0LXhvciBib29sZWFuIGJvb2xlYW4tYXJyYXkgYm9vbGVhbnMgJyArXG4gICAgICAgICdib3VuZC1mbiBib3VuZC1mbiogYnV0bGFzdCBieXRlIGJ5dGUtYXJyYXkgYnl0ZXMgY2FzdCBjaGFyIGNoYXItYXJyYXkgJyArXG4gICAgICAgICdjaGFyLWVzY2FwZS1zdHJpbmcgY2hhci1uYW1lLXN0cmluZyBjaGFyPyBjaGFycyBjaHVuayBjaHVuay1hcHBlbmQgJyArXG4gICAgICAgICdjaHVuay1idWZmZXIgY2h1bmstY29ucyBjaHVuay1maXJzdCBjaHVuay1uZXh0IGNodW5rLXJlc3QgY2h1bmtlZC1zZXE/ICcgK1xuICAgICAgICAnY2xhc3MgY2xhc3M/IGNsZWFyLWFnZW50LWVycm9ycyBjbG9qdXJlLXZlcnNpb24gY29sbD8gY29tbWVudCBjb21tdXRlICcgK1xuICAgICAgICAnY29tcCBjb21wYXJhdG9yIGNvbXBhcmUgY29tcGFyZS1hbmQtc2V0ISBjb21waWxlIGNvbXBsZW1lbnQgY29uY2F0IGNvbmQgJyArXG4gICAgICAgICdjb25kcCBjb25qIGNvbmohIGNvbnMgY29uc3RhbnRseSBjb25zdHJ1Y3QtcHJveHkgY29udGFpbnM/IGNvdW50ICcgK1xuICAgICAgICAnY291bnRlZD8gY3JlYXRlLW5zIGNyZWF0ZS1zdHJ1Y3QgY3ljbGUgZGVjIGRlY2ltYWw/IGRlY2xhcmUgZGVmaW5saW5lICcgK1xuICAgICAgICAnZGVmbWFjcm8gZGVmbWV0aG9kIGRlZm11bHRpIGRlZm4gZGVmbi0gZGVmb25jZSBkZWZzdHJ1Y3QgZGVsYXkgZGVsYXk/ICcgK1xuICAgICAgICAnZGVsaXZlciBkZXJlZiBkZXJpdmUgZGVzY2VuZGFudHMgZGVzdHJ1Y3R1cmUgZGlzaiBkaXNqISBkaXNzb2MgZGlzc29jISAnICtcbiAgICAgICAgJ2Rpc3RpbmN0IGRpc3RpbmN0PyBkb2FsbCBkb2MgZG9ydW4gZG9zZXEgZG9zeW5jIGRvdGltZXMgZG90byBkb3VibGUgJyArXG4gICAgICAgICdkb3VibGUtYXJyYXkgZG91YmxlcyBkcm9wIGRyb3AtbGFzdCBkcm9wLXdoaWxlIGVtcHR5IGVtcHR5PyBlbnN1cmUgJyArXG4gICAgICAgICdlbnVtZXJhdGlvbi1zZXEgZXZhbCBldmVuPyBldmVyeT8gZmFsc2U/IGZmaXJzdCBmaWxlLXNlcSBmaWx0ZXIgZmluZCAnICtcbiAgICAgICAgJ2ZpbmQtZG9jIGZpbmQtbnMgZmluZC12YXIgZmlyc3QgZmxvYXQgZmxvYXQtYXJyYXkgZmxvYXQ/IGZsb2F0cyBmbHVzaCAnICtcbiAgICAgICAgJ2ZuIGZuPyBmbmV4dCBmb3IgZm9yY2UgZm9ybWF0IGZ1dHVyZSBmdXR1cmUtY2FsbCBmdXR1cmUtY2FuY2VsICcgK1xuICAgICAgICAnZnV0dXJlLWNhbmNlbGxlZD8gZnV0dXJlLWRvbmU/IGZ1dHVyZT8gZ2VuLWNsYXNzIGdlbi1pbnRlcmZhY2UgZ2Vuc3ltICcgK1xuICAgICAgICAnZ2V0IGdldC1pbiBnZXQtbWV0aG9kIGdldC1wcm94eS1jbGFzcyBnZXQtdGhyZWFkLWJpbmRpbmdzIGdldC12YWxpZGF0b3IgJyArXG4gICAgICAgICdoYXNoIGhhc2gtbWFwIGhhc2gtc2V0IGlkZW50aWNhbD8gaWRlbnRpdHkgaWYtbGV0IGlmLW5vdCBpZm4/IGltcG9ydCAnICtcbiAgICAgICAgJ2luLW5zIGluYyBpbml0LXByb3h5IGluc3RhbmNlPyBpbnQgaW50LWFycmF5IGludGVnZXI/IGludGVybGVhdmUgaW50ZXJuICcgK1xuICAgICAgICAnaW50ZXJwb3NlIGludG8gaW50by1hcnJheSBpbnRzIGlvISBpc2E/IGl0ZXJhdGUgaXRlcmF0b3Itc2VxIGp1eHQga2V5ICcgK1xuICAgICAgICAna2V5cyBrZXl3b3JkIGtleXdvcmQ/IGxhc3QgbGF6eS1jYXQgbGF6eS1zZXEgbGV0IGxldGZuIGxpbmUtc2VxIGxpc3QgJyArXG4gICAgICAgICdsaXN0KiBsaXN0PyBsb2FkIGxvYWQtZmlsZSBsb2FkLXJlYWRlciBsb2FkLXN0cmluZyBsb2FkZWQtbGlicyBsb2NraW5nICcgK1xuICAgICAgICAnbG9uZyBsb25nLWFycmF5IGxvbmdzIGxvb3AgbWFjcm9leHBhbmQgbWFjcm9leHBhbmQtMSBtYWtlLWFycmF5ICcgK1xuICAgICAgICAnbWFrZS1oaWVyYXJjaHkgbWFwIG1hcD8gbWFwY2F0IG1heCBtYXgta2V5IG1lbWZuIG1lbW9pemUgbWVyZ2UgJyArXG4gICAgICAgICdtZXJnZS13aXRoIG1ldGEgbWV0aG9kLXNpZyBtZXRob2RzIG1pbiBtaW4ta2V5IG1vZCBuYW1lIG5hbWVzcGFjZSBuZWc/ICcgK1xuICAgICAgICAnbmV3bGluZSBuZXh0IG5maXJzdCBuaWw/IG5uZXh0IG5vdCBub3QtYW55PyBub3QtZW1wdHkgbm90LWV2ZXJ5PyBub3Q9ICcgK1xuICAgICAgICAnbnMgbnMtYWxpYXNlcyBucy1pbXBvcnRzIG5zLWludGVybnMgbnMtbWFwIG5zLW5hbWUgbnMtcHVibGljcyAnICtcbiAgICAgICAgJ25zLXJlZmVycyBucy1yZXNvbHZlIG5zLXVuYWxpYXMgbnMtdW5tYXAgbnRoIG50aG5leHQgbnVtIG51bWJlcj8gb2RkPyAnICtcbiAgICAgICAgJ29yIHBhcmVudHMgcGFydGlhbCBwYXJ0aXRpb24gcGNhbGxzIHBlZWsgcGVyc2lzdGVudCEgcG1hcCBwb3AgcG9wISAnICtcbiAgICAgICAgJ3BvcC10aHJlYWQtYmluZGluZ3MgcG9zPyBwciBwci1zdHIgcHJlZmVyLW1ldGhvZCBwcmVmZXJzICcgK1xuICAgICAgICAncHJpbWl0aXZlcy1jbGFzc25hbWVzIHByaW50IHByaW50LWN0b3IgcHJpbnQtZG9jIHByaW50LWR1cCBwcmludC1tZXRob2QgJyArXG4gICAgICAgICdwcmludC1uYW1lc3BhY2UtZG9jIHByaW50LXNpbXBsZSBwcmludC1zcGVjaWFsLWRvYyBwcmludC1zdHIgcHJpbnRmICcgK1xuICAgICAgICAncHJpbnRsbiBwcmludGxuLXN0ciBwcm4gcHJuLXN0ciBwcm9taXNlIHByb3h5IHByb3h5LWNhbGwtd2l0aC1zdXBlciAnICtcbiAgICAgICAgJ3Byb3h5LW1hcHBpbmdzIHByb3h5LW5hbWUgcHJveHktc3VwZXIgcHVzaC10aHJlYWQtYmluZGluZ3MgcHZhbHVlcyBxdW90ICcgK1xuICAgICAgICAncmFuZCByYW5kLWludCByYW5nZSByYXRpbz8gcmF0aW9uYWw/IHJhdGlvbmFsaXplIHJlLWZpbmQgcmUtZ3JvdXBzICcgK1xuICAgICAgICAncmUtbWF0Y2hlciByZS1tYXRjaGVzIHJlLXBhdHRlcm4gcmUtc2VxIHJlYWQgcmVhZC1saW5lIHJlYWQtc3RyaW5nICcgK1xuICAgICAgICAncmVkdWNlIHJlZiByZWYtaGlzdG9yeS1jb3VudCByZWYtbWF4LWhpc3RvcnkgcmVmLW1pbi1oaXN0b3J5IHJlZi1zZXQgJyArXG4gICAgICAgICdyZWZlciByZWZlci1jbG9qdXJlIHJlbGVhc2UtcGVuZGluZy1zZW5kcyByZW0gcmVtb3ZlIHJlbW92ZS1tZXRob2QgJyArXG4gICAgICAgICdyZW1vdmUtbnMgcmVtb3ZlLXdhdGNoIHJlcGVhdCByZXBlYXRlZGx5IHJlcGxhY2UgcmVwbGljYXRlIHJlcXVpcmUgJyArXG4gICAgICAgICdyZXNldCEgcmVzZXQtbWV0YSEgcmVzb2x2ZSByZXN0IHJlc3VsdHNldC1zZXEgcmV2ZXJzZSByZXZlcnNpYmxlPyByc2VxICcgK1xuICAgICAgICAncnN1YnNlcSBzZWNvbmQgc2VsZWN0LWtleXMgc2VuZCBzZW5kLW9mZiBzZXEgc2VxPyBzZXF1ZSBzZXF1ZW5jZSAnICtcbiAgICAgICAgJ3NlcXVlbnRpYWw/IHNldCBzZXQtdmFsaWRhdG9yISBzZXQ/IHNob3J0IHNob3J0LWFycmF5IHNob3J0cyAnICtcbiAgICAgICAgJ3NodXRkb3duLWFnZW50cyBzbHVycCBzb21lIHNvcnQgc29ydC1ieSBzb3J0ZWQtbWFwIHNvcnRlZC1tYXAtYnkgJyArXG4gICAgICAgICdzb3J0ZWQtc2V0IHNvcnRlZC1zZXQtYnkgc29ydGVkPyBzcGVjaWFsLWZvcm0tYW5jaG9yIHNwZWNpYWwtc3ltYm9sPyAnICtcbiAgICAgICAgJ3NwbGl0LWF0IHNwbGl0LXdpdGggc3RyIHN0cmVhbT8gc3RyaW5nPyBzdHJ1Y3Qgc3RydWN0LW1hcCBzdWJzIHN1YnNlcSAnICtcbiAgICAgICAgJ3N1YnZlYyBzdXBlcnMgc3dhcCEgc3ltYm9sIHN5bWJvbD8gc3luYyBzeW50YXgtc3ltYm9sLWFuY2hvciB0YWtlICcgK1xuICAgICAgICAndGFrZS1sYXN0IHRha2UtbnRoIHRha2Utd2hpbGUgdGVzdCB0aGUtbnMgdGltZSB0by1hcnJheSB0by1hcnJheS0yZCAnICtcbiAgICAgICAgJ3RyYW1wb2xpbmUgdHJhbnNpZW50IHRyZWUtc2VxIHRydWU/IHR5cGUgdW5jaGVja2VkLWFkZCB1bmNoZWNrZWQtZGVjICcgK1xuICAgICAgICAndW5jaGVja2VkLWRpdmlkZSB1bmNoZWNrZWQtaW5jIHVuY2hlY2tlZC1tdWx0aXBseSB1bmNoZWNrZWQtbmVnYXRlICcgK1xuICAgICAgICAndW5jaGVja2VkLXJlbWFpbmRlciB1bmNoZWNrZWQtc3VidHJhY3QgdW5kZXJpdmUgdW5xdW90ZSAnICtcbiAgICAgICAgJ3VucXVvdGUtc3BsaWNpbmcgdXBkYXRlLWluIHVwZGF0ZS1wcm94eSB1c2UgdmFsIHZhbHMgdmFyLWdldCB2YXItc2V0ICcgK1xuICAgICAgICAndmFyPyB2YXJ5LW1ldGEgdmVjIHZlY3RvciB2ZWN0b3I/IHdoZW4gd2hlbi1maXJzdCB3aGVuLWxldCB3aGVuLW5vdCAnICtcbiAgICAgICAgJ3doaWxlIHdpdGgtYmluZGluZ3Mgd2l0aC1iaW5kaW5ncyogd2l0aC1pbi1zdHIgd2l0aC1sb2FkaW5nLWNvbnRleHQgJyArXG4gICAgICAgICd3aXRoLWxvY2FsLXZhcnMgd2l0aC1tZXRhIHdpdGgtb3BlbiB3aXRoLW91dC1zdHIgd2l0aC1wcmVjaXNpb24geG1sLXNlcSAnICtcbiAgICAgICAgJ3plcm8/IHppcG1hcCdcbiAgICApO1xuXG4gICAgdmFyIGtleXdvcmRzID0gKCd0aHJvdyB0cnkgdmFyICcgK1xuICAgICAgICAnZGVmIGRvIGZuIGlmIGxldCBsb29wIG1vbml0b3ItZW50ZXIgbW9uaXRvci1leGl0IG5ldyBxdW90ZSByZWN1ciBzZXQhJ1xuICAgICk7XG5cbiAgICB2YXIgYnVpbGRpbkNvbnN0YW50cyA9IChcInRydWUgZmFsc2UgbmlsXCIpO1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICBcImtleXdvcmRcIjoga2V5d29yZHMsXG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjogYnVpbGRpbkNvbnN0YW50cyxcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6IGJ1aWx0aW5GdW5jdGlvbnNcbiAgICB9LCBcImlkZW50aWZpZXJcIiwgZmFsc2UsIFwiIFwiKTtcblxuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIjsuKiRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsIC8vcGFyZW5zXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIltcXFxcKHxcXFxcKV1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsIC8vbGlzdHNcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFwnXFxcXChdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLCAvL3ZlY3RvcnNcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFxbfFxcXFxdXVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5yZWdleHBcIiwgLy9SZWd1bGFyIEV4cHJlc3Npb25zXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnI1wiJyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInJlZ2V4XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLCAvL3NldHMgYW5kIG1hcHNcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFx7fFxcXFx9fFxcXFwjXFxcXHt8XFxcXCNcXFxcfV1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLCAvLyBhbXBlcnNhbmRzXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcXFxcJl0nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsIC8vIG1ldGFkYXRhXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcXFxcI1xcXFxeXFxcXHtdJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLCAvLyBhbm9ueW1vdXMgZm4gc3ludGFjdGljIHN1Z2FyXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1tcXFxcJV0nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsIC8vIGRlcmVmIHJlYWRlciBtYWNyb1xuICAgICAgICAgICAgICAgICAgICByZWdleCA6ICdbQF0nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIjBbeFhdWzAtOWEtZkEtRl0rXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsrLV0/XFxcXGQrKD86KD86XFxcXC5cXFxcZCopPyg/OltlRV1bKy1dP1xcXFxkKyk/KT9cXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnWyF8XFxcXCR8JXwmfFxcXFwqfFxcXFwtXFxcXC18XFxcXC18XFxcXCtcXFxcK3xcXFxcK3x8PXwhPXw8PXw+PXw8Pnw8fD58IXwmJl0nXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbYS16QS1aXyRdW2EtekEtWjAtOV8kXFxcXC1dKlxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnRcIiwgLy8gc3ltYm9sXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvOlteKClcXFtcXF17fSdcIlxcXiVgLDtcXHNdKy9cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuICAgICAgICBcInN0cmluZ1wiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFwufFxcXFxcXFxcJFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1wiJyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgICBcInJlZ2V4XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBlc2NhcGVzXG4gICAgICAgICAgICAgICAgdG9rZW46IFwicmVnZXhwLmtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcXFxcXCg/OnVbXFxcXGRhLWZBLUZdezR9fHhbXFxcXGRhLWZBLUZdezJ9fC4pXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyBmbGFnXG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnJlZ2V4cFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXCInLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIG9wZXJhdG9yc1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcKFxcP1s6PSFdfFxcKXxcXHtcXGQrXFxiLD9cXGQqXFx9fFsrKl1cXD98WygpJF4rKj8uXS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZGVsaW1pdGVyXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXHwvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXFtcXF4/LyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInJlZ2V4X2NoYXJhY3Rlcl9jbGFzc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZy5yZWdleHBcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInJlZ2V4X2NoYXJhY3Rlcl9jbGFzc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicmVnZXhwLmNoYXJjbGFzcy5rZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXFxcXFwoPzp1W1xcXFxkYS1mQS1GXXs0fXx4W1xcXFxkYS1mQS1GXXsyfXwuKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXVwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicmVnZXhcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIi1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucmVnZXhwLmNoYXJhY2h0ZXJjbGFzc1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKENsb2p1cmVIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5DbG9qdXJlSGlnaGxpZ2h0UnVsZXMgPSBDbG9qdXJlSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgTWF0Y2hpbmdQYXJlbnNPdXRkZW50ID0gZnVuY3Rpb24oKSB7fTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihsaW5lLCBpbnB1dCkge1xuICAgICAgICBpZiAoISAvXlxccyskLy50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiAvXlxccypcXCkvLnRlc3QoaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oZG9jLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBkb2MuZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eKFxccypcXCkpLyk7XG5cbiAgICAgICAgaWYgKCFtYXRjaCkgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGNvbHVtbiA9IG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIG9wZW5CcmFjZVBvcyA9IGRvYy5maW5kTWF0Y2hpbmdCcmFja2V0KHtyb3c6IHJvdywgY29sdW1uOiBjb2x1bW59KTtcblxuICAgICAgICBpZiAoIW9wZW5CcmFjZVBvcyB8fCBvcGVuQnJhY2VQb3Mucm93ID09IHJvdykgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChkb2MuZ2V0TGluZShvcGVuQnJhY2VQb3Mucm93KSk7XG4gICAgICAgIGRvYy5yZXBsYWNlKG5ldyBSYW5nZShyb3csIDAsIHJvdywgY29sdW1uLTEpLCBpbmRlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLiRnZXRJbmRlbnQgPSBmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14oXFxzKykvKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICByZXR1cm4gbWF0Y2hbMV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9O1xuXG59KS5jYWxsKE1hdGNoaW5nUGFyZW5zT3V0ZGVudC5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1hdGNoaW5nUGFyZW5zT3V0ZGVudCA9IE1hdGNoaW5nUGFyZW5zT3V0ZGVudDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==