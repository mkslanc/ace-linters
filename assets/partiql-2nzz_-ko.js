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
import { t as require_ion_highlight_rules } from "./ion_highlight_rules-l5mB_TUG.js";
var require_partiql_highlight_rules = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop$1 = require_oop();
	var TextHighlightRules = require_text_highlight_rules().TextHighlightRules;
	var IonHighlightRules = require_ion_highlight_rules().IonHighlightRules;
	var PartiqlHighlightRules = function() {
		var k_constant = "MISSING|FALSE|NULL|TRUE";
		var k_keyword = "PIVOT|UNPIVOT|LIMIT|TUPLE|REMOVE|INDEX|CONFLICT|DO|NOTHING|RETURNING|MODIFIED|NEW|OLD|LET|ABSOLUTE|ACTION|ADD|ALL|ALLOCATE|ALTER|AND|ANY|ARE|AS|ASC|ASSERTION|AT|AUTHORIZATION|BEGIN|BETWEEN|BIT_LENGTH|BY|CASCADE|CASCADED|CASE|CATALOG|CHAR|CHARACTER_LENGTH|CHAR_LENGTH|CHECK|CLOSE|COLLATE|COLLATION|COLUMN|COMMIT|CONNECT|CONNECTION|CONSTRAINT|CONSTRAINTS|CONTINUE|CONVERT|CORRESPONDING|CREATE|CROSS|CURRENT|CURSOR|DEALLOCATE|DEC|DECLARE|DEFAULT|DEFERRABLE|DEFERRED|DELETE|DESC|DESCRIBE|DESCRIPTOR|DIAGNOSTICS|DISCONNECT|DISTINCT|DOMAIN|DROP|ELSE|END|END-EXEC|ESCAPE|EXCEPT|EXCEPTION|EXEC|EXECUTE|EXTERNAL|EXTRACT|FETCH|FIRST|FOR|FOREIGN|FOUND|FROM|FULL|GET|GLOBAL|GO|GOTO|GRANT|GROUP|HAVING|IDENTITY|IMMEDIATE|IN|INDICATOR|INITIALLY|INNER|INPUT|INSENSITIVE|INSERT|INTERSECT|INTERVAL|INTO|IS|ISOLATION|JOIN|KEY|LANGUAGE|LAST|LEFT|LEVEL|LIKE|LOCAL|LOWER|MATCH|MODULE|NAMES|NATIONAL|NATURAL|NCHAR|NEXT|NO|NOT|OCTET_LENGTH|OF|ON|ONLY|OPEN|OPTION|OR|ORDER|OUTER|OUTPUT|OVERLAPS|PAD|PARTIAL|POSITION|PRECISION|PREPARE|PRESERVE|PRIMARY|PRIOR|PRIVILEGES|PROCEDURE|PUBLIC|READ|REAL|REFERENCES|RELATIVE|RESTRICT|REVOKE|RIGHT|ROLLBACK|ROWS|SCHEMA|SCROLL|SECTION|SELECT|SESSION|SET|SIZE|SOME|SPACE|SQL|SQLCODE|SQLERROR|SQLSTATE|TABLE|TEMPORARY|THEN|TIME|TO|TRANSACTION|TRANSLATE|TRANSLATION|UNION|UNIQUE|UNKNOWN|UPDATE|UPPER|USAGE|USER|USING|VALUE|VALUES|VIEW|WHEN|WHENEVER|WHERE|WITH|WORK|WRITE|ZONE";
		var k_type = "BOOL|BOOLEAN|STRING|SYMBOL|CLOB|BLOB|STRUCT|LIST|SEXP|BAG|CHARACTER|DATE|DECIMAL|DOUBLE|FLOAT|INT|INTEGER|NUMERIC|SMALLINT|TIMESTAMP|VARCHAR|VARYING";
		var k_aggfn = "AVG|COUNT|MAX|MIN|SUM";
		var k_fn = "CAST|COALESCE|CURRENT_DATE|CURRENT_TIME|CURRENT_TIMESTAMP|CURRENT_USER|EXISTS|DATE_ADD|DATE_DIFF|NULLIF|SESSION_USER|SUBSTRING|SYSTEM_USER|TRIM";
		var keywordMapperRule = {
			token: this.createKeywordMapper({
				"constant.language.partiql": k_constant,
				"keyword.other.partiql": k_keyword,
				"storage.type.partiql": k_type,
				"support.function.aggregation.partiql": k_aggfn,
				"support.function.partiql": k_fn
			}, "variable.language.identifier.partiql", true),
			regex: "\\b\\w+\\b"
		};
		this.$rules = {
			"start": [
				{ "include": "whitespace" },
				{ "include": "comment" },
				{ "include": "value" }
			],
			"value": [
				{ "include": "whitespace" },
				{ "include": "comment" },
				{ "include": "tuple_value" },
				{ "include": "collection_value" },
				{ "include": "scalar_value" }
			],
			"scalar_value": [
				{ "include": "string" },
				{ "include": "number" },
				{ "include": "keywords" },
				{ "include": "identifier" },
				{ "include": "embed-ion" },
				{ "include": "operator" },
				{ "include": "punctuation" }
			],
			"punctuation": [{
				"token": "punctuation.partiql",
				"regex": "[;:()\\[\\]\\{\\},.]"
			}],
			"operator": [{
				"token": "keyword.operator.partiql",
				"regex": "[+*/<>=~!@#%&|?^-]+"
			}],
			"identifier": [
				{
					"token": "variable.language.identifier.quoted.partiql",
					"regex": "([\"])((?:(?:\\\\.)|(?:[^\"\\\\]))*?)([\"])"
				},
				{
					"token": "variable.language.identifier.at.partiql",
					"regex": "@\\w+"
				},
				{
					"token": "variable.language.identifier.partiql",
					"regex": "\\b\\w+(?:\\.\\w+)?\\b"
				}
			],
			"number": [{
				"token": "constant.numeric.partiql",
				"regex": "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
			}],
			"string": [{
				"token": [
					"punctuation.definition.string.begin.partiql",
					"string.quoted.single.partiql",
					"punctuation.definition.string.end.partiql"
				],
				"regex": "(['])((?:(?:\\\\.)|(?:[^'\\\\]))*?)(['])"
			}],
			"collection_value": [{ "include": "array_value" }, { "include": "bag_value" }],
			"bag_value": [{
				"token": "punctuation.definition.bag.begin.partiql",
				"regex": "<<",
				"push": [
					{
						"token": "punctuation.definition.bag.end.partiql",
						"regex": ">>",
						"next": "pop"
					},
					{ "include": "comment" },
					{
						"token": "punctuation.definition.bag.separator.partiql",
						"regex": ","
					},
					{ "include": "value" }
				]
			}],
			"comment": [{
				"token": "comment.line.partiql",
				"regex": "--.*"
			}, {
				"token": "comment.block.partiql",
				"regex": "/\\*",
				"push": "comment__1"
			}],
			"comment__1": [
				{
					"token": "comment.block.partiql",
					"regex": "[*]/",
					"next": "pop"
				},
				{
					"token": "comment.block.partiql",
					"regex": "[^*/]+"
				},
				{
					"token": "comment.block.partiql",
					"regex": "/\\*",
					"push": "comment__1"
				},
				{
					"token": "comment.block.partiql",
					"regex": "[*/]+"
				}
			],
			"array_value": [{
				"token": "punctuation.definition.array.begin.partiql",
				"regex": "\\[",
				"push": [
					{
						"token": "punctuation.definition.array.end.partiql",
						"regex": "\\]",
						"next": "pop"
					},
					{ "include": "comment" },
					{
						"token": "punctuation.definition.array.separator.partiql",
						"regex": ","
					},
					{ "include": "value" }
				]
			}],
			"tuple_value": [{
				"token": "punctuation.definition.tuple.begin.partiql",
				"regex": "\\{",
				"push": [
					{
						"token": "punctuation.definition.tuple.end.partiql",
						"regex": "\\}",
						"next": "pop"
					},
					{ "include": "comment" },
					{
						"token": "punctuation.definition.tuple.separator.partiql",
						"regex": ",|:"
					},
					{ "include": "value" }
				]
			}],
			"whitespace": [{
				"token": "text.partiql",
				"regex": "\\s+"
			}]
		};
		this.$rules["keywords"] = [keywordMapperRule];
		this.$rules["embed-ion"] = [{
			token: "punctuation.definition.ion.begin.partiql",
			regex: "`",
			next: "ion-start"
		}];
		this.embedRules(IonHighlightRules, "ion-", [{
			token: "punctuation.definition.ion.end.partiql",
			regex: "`",
			next: "start"
		}]);
		this.normalizeRules();
	};
	oop$1.inherits(PartiqlHighlightRules, TextHighlightRules);
	exports.PartiqlHighlightRules = PartiqlHighlightRules;
}));
var require_partiql = /* @__PURE__ */ __commonJSMin(((exports) => {
	var oop = require_oop();
	var TextMode = require_text().Mode;
	var HighlightRules = require_partiql_highlight_rules().PartiqlHighlightRules;
	var MatchingBraceOutdent = require_matching_brace_outdent().MatchingBraceOutdent;
	var CStyleFoldMode = require_cstyle().FoldMode;
	var Mode = function() {
		this.HighlightRules = HighlightRules;
		this.$outdent = new MatchingBraceOutdent();
		this.$behaviour = this.$defaultBehaviour;
		this.foldingRules = new CStyleFoldMode();
	};
	oop.inherits(Mode, TextMode);
	(function() {
		this.lineCommentStart = "--";
		this.blockComment = {
			start: "/*",
			end: "*/",
			nestable: true
		};
		this.getNextLineIndent = function(state, line, tab) {
			var indent = this.$getIndent(line);
			if (state == "start") {
				if (line.match(/^.*[\{\(\[]\s*$/)) indent += tab;
			}
			return indent;
		};
		this.checkOutdent = function(state, line, input) {
			return this.$outdent.checkOutdent(line, input);
		};
		this.autoOutdent = function(state, doc, row) {
			this.$outdent.autoOutdent(doc, row);
		};
		this.$id = "ace/mode/partiql";
	}).call(Mode.prototype);
	exports.Mode = Mode;
}));
export default require_partiql();
