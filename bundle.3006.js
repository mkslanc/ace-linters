"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3006,7668],{

/***/ 97668:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var c_cppHighlightRules = (__webpack_require__(99047)/* .c_cppHighlightRules */ .N);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = c_cppHighlightRules;

    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;

    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start") {
            var match = line.match(/^.*[\{\(\[]\s*$/);
            if (match) {
                indent += tab;
            }
        } else if (state == "doc-start") {
            if (endState == "start") {
                return "";
            }
            var match = line.match(/^\s*(\/?)\*/);
            if (match) {
                if (match[1]) {
                    indent += " ";
                }
                indent += "* ";
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

    this.$id = "ace/mode/c_cpp";
    this.snippetFileId = "ace/snippets/c_cpp";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 99047:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var __webpack_unused_export__;


var oop = __webpack_require__(2645);
var DocCommentHighlightRules = (__webpack_require__(42124)/* .DocCommentHighlightRules */ .l);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

// used by objective-c
var cFunctions = __webpack_unused_export__ = "hypot|hypotf|hypotl|sscanf|system|snprintf|scanf|scalbn|scalbnf|scalbnl|scalbln|scalblnf|scalblnl|sin|sinh|sinhf|sinhl|sinf|sinl|signal|signbit|strstr|strspn|strncpy|strncat|strncmp|strcspn|strchr|strcoll|strcpy|strcat|strcmp|strtoimax|strtod|strtoul|strtoull|strtoumax|strtok|strtof|strtol|strtold|strtoll|strerror|strpbrk|strftime|strlen|strrchr|strxfrm|sprintf|setjmp|setvbuf|setlocale|setbuf|sqrt|sqrtf|sqrtl|swscanf|swprintf|srand|nearbyint|nearbyintf|nearbyintl|nexttoward|nexttowardf|nexttowardl|nextafter|nextafterf|nextafterl|nan|nanf|nanl|csin|csinh|csinhf|csinhl|csinf|csinl|csqrt|csqrtf|csqrtl|ccos|ccosh|ccoshf|ccosf|ccosl|cimag|cimagf|cimagl|ctime|ctan|ctanh|ctanhf|ctanhl|ctanf|ctanl|cos|cosh|coshf|coshl|cosf|cosl|conj|conjf|conjl|copysign|copysignf|copysignl|cpow|cpowf|cpowl|cproj|cprojf|cprojl|ceil|ceilf|ceill|cexp|cexpf|cexpl|clock|clog|clogf|clogl|clearerr|casin|casinh|casinhf|casinhl|casinf|casinl|cacos|cacosh|cacoshf|cacoshl|cacosf|cacosl|catan|catanh|catanhf|catanhl|catanf|catanl|calloc|carg|cargf|cargl|cabs|cabsf|cabsl|creal|crealf|creall|cbrt|cbrtf|cbrtl|time|toupper|tolower|tan|tanh|tanhf|tanhl|tanf|tanl|trunc|truncf|truncl|tgamma|tgammaf|tgammal|tmpnam|tmpfile|isspace|isnormal|isnan|iscntrl|isinf|isdigit|isunordered|isupper|ispunct|isprint|isfinite|iswspace|iswcntrl|iswctype|iswdigit|iswupper|iswpunct|iswprint|iswlower|iswalnum|iswalpha|iswgraph|iswxdigit|iswblank|islower|isless|islessequal|islessgreater|isalnum|isalpha|isgreater|isgreaterequal|isgraph|isxdigit|isblank|ilogb|ilogbf|ilogbl|imaxdiv|imaxabs|div|difftime|_Exit|ungetc|ungetwc|pow|powf|powl|puts|putc|putchar|putwc|putwchar|perror|printf|erf|erfc|erfcf|erfcl|erff|erfl|exit|exp|exp2|exp2f|exp2l|expf|expl|expm1|expm1f|expm1l|vsscanf|vsnprintf|vscanf|vsprintf|vswscanf|vswprintf|vprintf|vfscanf|vfprintf|vfwscanf|vfwprintf|vwscanf|vwprintf|va_start|va_copy|va_end|va_arg|qsort|fscanf|fsetpos|fseek|fclose|ftell|fopen|fdim|fdimf|fdiml|fpclassify|fputs|fputc|fputws|fputwc|fprintf|feholdexcept|fesetenv|fesetexceptflag|fesetround|feclearexcept|fetestexcept|feof|feupdateenv|feraiseexcept|ferror|fegetenv|fegetexceptflag|fegetround|fflush|fwscanf|fwide|fwprintf|fwrite|floor|floorf|floorl|fabs|fabsf|fabsl|fgets|fgetc|fgetpos|fgetws|fgetwc|freopen|free|fread|frexp|frexpf|frexpl|fmin|fminf|fminl|fmod|fmodf|fmodl|fma|fmaf|fmal|fmax|fmaxf|fmaxl|ldiv|ldexp|ldexpf|ldexpl|longjmp|localtime|localeconv|log|log1p|log1pf|log1pl|log10|log10f|log10l|log2|log2f|log2l|logf|logl|logb|logbf|logbl|labs|lldiv|llabs|llrint|llrintf|llrintl|llround|llroundf|llroundl|lrint|lrintf|lrintl|lround|lroundf|lroundl|lgamma|lgammaf|lgammal|wscanf|wcsstr|wcsspn|wcsncpy|wcsncat|wcsncmp|wcscspn|wcschr|wcscoll|wcscpy|wcscat|wcscmp|wcstoimax|wcstod|wcstoul|wcstoull|wcstoumax|wcstok|wcstof|wcstol|wcstold|wcstoll|wcstombs|wcspbrk|wcsftime|wcslen|wcsrchr|wcsrtombs|wcsxfrm|wctob|wctomb|wcrtomb|wprintf|wmemset|wmemchr|wmemcpy|wmemcmp|wmemmove|assert|asctime|asin|asinh|asinhf|asinhl|asinf|asinl|acos|acosh|acoshf|acoshl|acosf|acosl|atoi|atof|atol|atoll|atexit|atan|atanh|atanhf|atanhl|atan2|atan2f|atan2l|atanf|atanl|abs|abort|gets|getc|getchar|getenv|getwc|getwchar|gmtime|rint|rintf|rintl|round|roundf|roundl|rename|realloc|rewind|remove|remquo|remquof|remquol|remainder|remainderf|remainderl|rand|raise|bsearch|btowc|modf|modff|modfl|memset|memchr|memcpy|memcmp|memmove|mktime|malloc|mbsinit|mbstowcs|mbsrtowcs|mbtowc|mblen|mbrtowc|mbrlen";

var c_cppHighlightRules = function(extraKeywords) {

    var keywordControls = (
        "break|case|continue|default|do|else|for|goto|if|_Pragma|" +
        "return|switch|while|catch|operator|try|throw|using"
    );
    
    var storageType = (
        "asm|__asm__|auto|bool|_Bool|char|_Complex|double|enum|float|" +
        "_Imaginary|int|int8_t|int16_t|int32_t|int64_t|long|short|signed|size_t|struct|typedef|uint8_t|uint16_t|uint32_t|uint64_t|union|unsigned|void|" +
        "class|wchar_t|template|char16_t|char32_t"
    );

    var storageModifiers = (
        "const|extern|register|restrict|static|volatile|inline|private|" +
        "protected|public|friend|explicit|virtual|export|mutable|typename|" +
        "constexpr|new|delete|alignas|alignof|decltype|noexcept|thread_local"
    );

    var keywordOperators = (
        "and|and_eq|bitand|bitor|compl|not|not_eq|or|or_eq|typeid|xor|xor_eq|" +
        "const_cast|dynamic_cast|reinterpret_cast|static_cast|sizeof|namespace"
    );

    var builtinConstants = (
        "NULL|true|false|TRUE|FALSE|nullptr"
    );

    var keywordMapper = this.$keywords = this.createKeywordMapper(Object.assign({
        "keyword.control" : keywordControls,
        "storage.type" : storageType,
        "storage.modifier" : storageModifiers,
        "keyword.operator" : keywordOperators,
        "variable.language": "this",
        "constant.language": builtinConstants,
        "support.function.C99.c": cFunctions
    }, extraKeywords), "identifier");

    var identifierRe = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*\\b";
    var escapeRe = /\\(?:['"?\\abfnrtv]|[0-7]{1,3}|x[a-fA-F\d]{2}|u[a-fA-F\d]{4}U[a-fA-F\d]{8}|.)/.source;
    var formatRe = "%"
          + /(\d+\$)?/.source // field (argument #)
          + /[#0\- +']*/.source // flags
          + /[,;:_]?/.source // separator character (AltiVec)
          + /((-?\d+)|\*(-?\d+\$)?)?/.source // minimum field width
          + /(\.((-?\d+)|\*(-?\d+\$)?)?)?/.source // precision
          + /(hh|h|ll|l|j|t|z|q|L|vh|vl|v|hv|hl)?/.source // length modifier
          + /(\[[^"\]]+\]|[diouxXDOUeEfFgGaACcSspn%])/.source; // conversion type
          
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = { 
        "start" : [
            {
                token : "comment",
                regex : "//$",
                next : "start"
            }, {
                token : "comment",
                regex : "//",
                next : "singleLineComment"
            },
            DocCommentHighlightRules.getStartRule("doc-start"),
            {
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "comment"
            }, {
                token : "string", // character
                regex : "'(?:" + escapeRe + "|.)?'"
            }, {
                token : "string.start",
                regex : '"', 
                stateName: "qqstring",
                next: [
                    { token: "string", regex: /\\\s*$/, next: "qqstring" },
                    { token: "constant.language.escape", regex: escapeRe },
                    { token: "constant.language.escape", regex: formatRe },
                    { token: "string.end", regex: '"|$', next: "start" },
                    { defaultToken: "string"}
                ]
            }, {
                token : "string.start",
                regex : 'R"\\(', 
                stateName: "rawString",
                next: [
                    { token: "string.end", regex: '\\)"', next: "start" },
                    { defaultToken: "string"}
                ]
            }, {
                token : "constant.numeric", // hex
                regex : "0[xX][0-9a-fA-F]+(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
            }, {
                token : "constant.numeric", // float
                regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"
            }, {
                token : "keyword", // pre-compiler directives
                regex : "#\\s*(?:include|import|pragma|line|define|undef)\\b",
                next  : "directive"
            }, {
                token : "keyword", // special case pre-compiler directive
                regex : "#\\s*(?:endif|if|ifdef|else|elif|ifndef)\\b"
            }, {
                token : keywordMapper,
                regex : "[a-zA-Z_$][a-zA-Z0-9_$]*"
            }, {
                token : "keyword.operator",
                regex : /--|\+\+|<<=|>>=|>>>=|<>|&&|\|\||\?:|[*%\/+\-&\^|~!<>=]=?/
            }, {
              token : "punctuation.operator",
              regex : "\\?|\\:|\\,|\\;|\\."
            }, {
                token : "paren.lparen",
                regex : "[[({]"
            }, {
                token : "paren.rparen",
                regex : "[\\])}]"
            }, {
                token : "text",
                regex : "\\s+"
            }
        ],
        "comment" : [
            {
                token : "comment", // closing comment
                regex : "\\*\\/",
                next : "start"
            }, {
                defaultToken : "comment"
            }
        ],
        "singleLineComment" : [
            {
                token : "comment",
                regex : /\\$/,
                next : "singleLineComment"
            }, {
                token : "comment",
                regex : /$/,
                next : "start"
            }, {
                defaultToken: "comment"
            }
        ],
        "directive" : [
            {
                token : "constant.other.multiline",
                regex : /\\/
            },
            {
                token : "constant.other.multiline",
                regex : /.*\\/
            },
            {
                token : "constant.other",
                regex : "\\s*<.+?>",
                next : "start"
            },
            {
                token : "constant.other", // single line
                regex : '\\s*["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]',
                next : "start"
            }, 
            {
                token : "constant.other", // single line
                regex : "\\s*['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']",
                next : "start"
            },
            // "\" implies multiline, while "/" implies comment
            {
                token : "constant.other",
                regex : /[^\\\/]+/,
                next : "start"
            }
        ]
    };

    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
    this.normalizeRules();
};

oop.inherits(c_cppHighlightRules, TextHighlightRules);

exports.N = c_cppHighlightRules;


/***/ }),

/***/ 83006:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var CMode = (__webpack_require__(97668).Mode);
var DartHighlightRules = (__webpack_require__(53049)/* .DartHighlightRules */ .H);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    CMode.call(this);
    this.HighlightRules = DartHighlightRules;
    this.foldingRules = new CStyleFoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, CMode);

(function() { 
    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};
    this.$id = "ace/mode/dart";
    this.snippetFileId = "ace/snippets/dart";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 53049:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode_highlight_rules.tmpl.js (UUID: 958518BC-799F-477A-99F9-5B28EBF230F6) */



var oop = __webpack_require__(2645);
var DocCommentHighlightRules = (__webpack_require__(42124)/* .DocCommentHighlightRules */ .l);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var DartHighlightRules = function() {

    var constantLanguage = "true|false|null";
    var variableLanguage = "this|super";
    var keywordControl = "try|catch|finally|throw|rethrow|assert|break|case|continue|default|do|else|for|if|in|return|switch|while|new|deferred|async|await";
    var keywordDeclaration = "abstract|class|extends|external|factory|implements|get|native|operator|set|typedef|with|enum";
    var storageModifier = "static|final|const";
    var storageType = "void|bool|num|int|double|dynamic|var|String";

    var keywordMapper = this.createKeywordMapper({
        "constant.language.dart": constantLanguage,
        "variable.language.dart": variableLanguage,
        "keyword.control.dart": keywordControl,
        "keyword.declaration.dart": keywordDeclaration,
        "storage.modifier.dart": storageModifier,
        "storage.type.primitive.dart": storageType
    }, "identifier");

    var stringfill = [{
        token : "constant.language.escape",
        regex : /\\./
    }, {
        token : "text",
        regex : /\$(?:\w+|{[^"'}]+})?/
    }, {
        defaultToken : "string"
    }];

    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
    "start": [
        {
            token : "comment",
            regex : /\/\/.*$/
        },
        DocCommentHighlightRules.getStartRule("doc-start"),
        {
            token : "comment", // multi line comment
            regex : /\/\*/,
            next : "comment"
        },
        {
            token: ["meta.preprocessor.script.dart"],
            regex: "^(#!.*)$"
        },
        {
            token: "keyword.other.import.dart",
            regex: "(?:\\b)(?:library|import|export|part|of|show|hide)(?:\\b)"
        },
        {
            token : ["keyword.other.import.dart", "text"],
            regex : "(?:\\b)(prefix)(\\s*:)"
        },
        {
            regex: "\\bas\\b",
            token: "keyword.cast.dart"
        },
        {
            regex: "\\?|:",
            token: "keyword.control.ternary.dart"
        },
        {
            regex: "(?:\\b)(is\\!?)(?:\\b)",
            token: ["keyword.operator.dart"]
        },
        {
            regex: "(<<|>>>?|~|\\^|\\||&)",
            token: ["keyword.operator.bitwise.dart"]
        },
        {
            regex: "((?:&|\\^|\\||<<|>>>?)=)",
            token: ["keyword.operator.assignment.bitwise.dart"]
        },
        {
            regex: "(===?|!==?|<=?|>=?)",
            token: ["keyword.operator.comparison.dart"]
        },
        {
            regex: "((?:[+*/%-]|\\~)=)",
            token: ["keyword.operator.assignment.arithmetic.dart"]
        },
        {
            regex: "=",
            token: "keyword.operator.assignment.dart"
        },
        {
            token : "string",
            regex : "'''",
            next : "qdoc"
        }, 
        {
            token : "string",
            regex : '"""',
            next : "qqdoc"
        }, 
        {
            token : "string",
            regex : "'",
            next : "qstring"
        }, 
        {
            token : "string",
            regex : '"',
            next : "qqstring"
        }, 
        {
            regex: "(\\-\\-|\\+\\+)",
            token: ["keyword.operator.increment-decrement.dart"]
        },
        {
            regex: "(\\-|\\+|\\*|\\/|\\~\\/|%)",
            token: ["keyword.operator.arithmetic.dart"]
        },
        {
            regex: "(!|&&|\\|\\|)",
            token: ["keyword.operator.logical.dart"]
        },
        {
            token : "constant.numeric", // hex
            regex : "0[xX][0-9a-fA-F]+\\b"
        }, 
        {
            token : "constant.numeric", // float
            regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
        }, 
        {
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }
    ],
    "comment" : [
        {
            token : "comment", // closing comment
            regex : "\\*\\/",
            next : "start"
        }, {
            defaultToken : "comment"
        }
    ],
    "qdoc" : [
        {
            token : "string",
            regex : "'''",
            next : "start"
        }
    ].concat(stringfill),

    "qqdoc" : [
        {
            token : "string",
            regex : '"""',
            next : "start"
        }
    ].concat(stringfill),

    "qstring" : [
        {
            token : "string",
            regex : "'|$",
            next : "start"
        }
    ].concat(stringfill),

    "qqstring" : [
        {
            token : "string",
            regex : '"|$',
            next : "start"
        }
    ].concat(stringfill)
    // TODO add support for interpolation and raw strings
};

    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("start") ]);
};

oop.inherits(DartHighlightRules, TextHighlightRules);

exports.H = DartHighlightRules;


/***/ }),

/***/ 42124:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var DocCommentHighlightRules = function () {
    this.$rules = {
        "start": [
            {
                token: "comment.doc.tag",
                regex: "@\\w+(?=\\s|$)"
            }, DocCommentHighlightRules.getTagRule(), {
                defaultToken: "comment.doc.body",
                caseInsensitive: true
            }
        ]
    };
};

oop.inherits(DocCommentHighlightRules, TextHighlightRules);

DocCommentHighlightRules.getTagRule = function(start) {
    return {
        token : "comment.doc.tag.storage.type",
        regex : "\\b(?:TODO|FIXME|XXX|HACK)\\b"
    };
};

DocCommentHighlightRules.getStartRule = function(start) {
    return {
        token : "comment.doc", // doc comment
        regex: /\/\*\*(?!\/)/,
        next  : start
    };
};

DocCommentHighlightRules.getEndRule = function (start) {
    return {
        token : "comment.doc", // closing comment
        regex : "\\*\\/",
        next  : start
    };
};


exports.l = DocCommentHighlightRules;


/***/ }),

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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7QUM5Slk7O0FBRWIsWUFBWSwyQ0FBeUI7O0FBRXJDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7O0FBRUE7QUFDQTtBQUNBLHVDQUF1Qzs7QUFFdkM7O0FBRUE7QUFDQSxvREFBb0QseUJBQXlCOztBQUU3RTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQsNEJBQTRCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jX2NwcC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2NfY3BwX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2RhcnQuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9kYXJ0X2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIGNfY3BwSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9jX2NwcF9oaWdobGlnaHRfcnVsZXNcIikuY19jcHBIaWdobGlnaHRSdWxlcztcbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG52YXIgQ1N0eWxlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gY19jcHBIaWdobGlnaHRSdWxlcztcblxuICAgIHRoaXMuJG91dGRlbnQgPSBuZXcgTWF0Y2hpbmdCcmFjZU91dGRlbnQoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xuXG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgQ1N0eWxlRm9sZE1vZGUoKTtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi8vXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiLypcIiwgZW5kOiBcIiovXCJ9O1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgICAgICB2YXIgdG9rZW5pemVkTGluZSA9IHRoaXMuZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLCBzdGF0ZSk7XG4gICAgICAgIHZhciB0b2tlbnMgPSB0b2tlbml6ZWRMaW5lLnRva2VucztcbiAgICAgICAgdmFyIGVuZFN0YXRlID0gdG9rZW5pemVkTGluZS5zdGF0ZTtcblxuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbdG9rZW5zLmxlbmd0aC0xXS50eXBlID09IFwiY29tbWVudFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlID09IFwic3RhcnRcIikge1xuICAgICAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXi4qW1xce1xcKFxcW11cXHMqJC8pO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgaW5kZW50ICs9IHRhYjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChzdGF0ZSA9PSBcImRvYy1zdGFydFwiKSB7XG4gICAgICAgICAgICBpZiAoZW5kU3RhdGUgPT0gXCJzdGFydFwiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eXFxzKihcXC8/KVxcKi8pO1xuICAgICAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGVudCArPSBcIiBcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaW5kZW50ICs9IFwiKiBcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgfTtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRvdXRkZW50LmNoZWNrT3V0ZGVudChsaW5lLCBpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgZG9jLCByb3cpIHtcbiAgICAgICAgdGhpcy4kb3V0ZGVudC5hdXRvT3V0ZGVudChkb2MsIHJvdyk7XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9jX2NwcFwiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL2NfY3BwXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzXCIpLkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbi8vIHVzZWQgYnkgb2JqZWN0aXZlLWNcbnZhciBjRnVuY3Rpb25zID0gZXhwb3J0cy5jRnVuY3Rpb25zID0gXCJoeXBvdHxoeXBvdGZ8aHlwb3RsfHNzY2FuZnxzeXN0ZW18c25wcmludGZ8c2NhbmZ8c2NhbGJufHNjYWxibmZ8c2NhbGJubHxzY2FsYmxufHNjYWxibG5mfHNjYWxibG5sfHNpbnxzaW5ofHNpbmhmfHNpbmhsfHNpbmZ8c2lubHxzaWduYWx8c2lnbmJpdHxzdHJzdHJ8c3Ryc3BufHN0cm5jcHl8c3RybmNhdHxzdHJuY21wfHN0cmNzcG58c3RyY2hyfHN0cmNvbGx8c3RyY3B5fHN0cmNhdHxzdHJjbXB8c3RydG9pbWF4fHN0cnRvZHxzdHJ0b3VsfHN0cnRvdWxsfHN0cnRvdW1heHxzdHJ0b2t8c3RydG9mfHN0cnRvbHxzdHJ0b2xkfHN0cnRvbGx8c3RyZXJyb3J8c3RycGJya3xzdHJmdGltZXxzdHJsZW58c3RycmNocnxzdHJ4ZnJtfHNwcmludGZ8c2V0am1wfHNldHZidWZ8c2V0bG9jYWxlfHNldGJ1ZnxzcXJ0fHNxcnRmfHNxcnRsfHN3c2NhbmZ8c3dwcmludGZ8c3JhbmR8bmVhcmJ5aW50fG5lYXJieWludGZ8bmVhcmJ5aW50bHxuZXh0dG93YXJkfG5leHR0b3dhcmRmfG5leHR0b3dhcmRsfG5leHRhZnRlcnxuZXh0YWZ0ZXJmfG5leHRhZnRlcmx8bmFufG5hbmZ8bmFubHxjc2lufGNzaW5ofGNzaW5oZnxjc2luaGx8Y3NpbmZ8Y3Npbmx8Y3NxcnR8Y3NxcnRmfGNzcXJ0bHxjY29zfGNjb3NofGNjb3NoZnxjY29zZnxjY29zbHxjaW1hZ3xjaW1hZ2Z8Y2ltYWdsfGN0aW1lfGN0YW58Y3Rhbmh8Y3RhbmhmfGN0YW5obHxjdGFuZnxjdGFubHxjb3N8Y29zaHxjb3NoZnxjb3NobHxjb3NmfGNvc2x8Y29uanxjb25qZnxjb25qbHxjb3B5c2lnbnxjb3B5c2lnbmZ8Y29weXNpZ25sfGNwb3d8Y3Bvd2Z8Y3Bvd2x8Y3Byb2p8Y3Byb2pmfGNwcm9qbHxjZWlsfGNlaWxmfGNlaWxsfGNleHB8Y2V4cGZ8Y2V4cGx8Y2xvY2t8Y2xvZ3xjbG9nZnxjbG9nbHxjbGVhcmVycnxjYXNpbnxjYXNpbmh8Y2FzaW5oZnxjYXNpbmhsfGNhc2luZnxjYXNpbmx8Y2Fjb3N8Y2Fjb3NofGNhY29zaGZ8Y2Fjb3NobHxjYWNvc2Z8Y2Fjb3NsfGNhdGFufGNhdGFuaHxjYXRhbmhmfGNhdGFuaGx8Y2F0YW5mfGNhdGFubHxjYWxsb2N8Y2FyZ3xjYXJnZnxjYXJnbHxjYWJzfGNhYnNmfGNhYnNsfGNyZWFsfGNyZWFsZnxjcmVhbGx8Y2JydHxjYnJ0ZnxjYnJ0bHx0aW1lfHRvdXBwZXJ8dG9sb3dlcnx0YW58dGFuaHx0YW5oZnx0YW5obHx0YW5mfHRhbmx8dHJ1bmN8dHJ1bmNmfHRydW5jbHx0Z2FtbWF8dGdhbW1hZnx0Z2FtbWFsfHRtcG5hbXx0bXBmaWxlfGlzc3BhY2V8aXNub3JtYWx8aXNuYW58aXNjbnRybHxpc2luZnxpc2RpZ2l0fGlzdW5vcmRlcmVkfGlzdXBwZXJ8aXNwdW5jdHxpc3ByaW50fGlzZmluaXRlfGlzd3NwYWNlfGlzd2NudHJsfGlzd2N0eXBlfGlzd2RpZ2l0fGlzd3VwcGVyfGlzd3B1bmN0fGlzd3ByaW50fGlzd2xvd2VyfGlzd2FsbnVtfGlzd2FscGhhfGlzd2dyYXBofGlzd3hkaWdpdHxpc3dibGFua3xpc2xvd2VyfGlzbGVzc3xpc2xlc3NlcXVhbHxpc2xlc3NncmVhdGVyfGlzYWxudW18aXNhbHBoYXxpc2dyZWF0ZXJ8aXNncmVhdGVyZXF1YWx8aXNncmFwaHxpc3hkaWdpdHxpc2JsYW5rfGlsb2difGlsb2diZnxpbG9nYmx8aW1heGRpdnxpbWF4YWJzfGRpdnxkaWZmdGltZXxfRXhpdHx1bmdldGN8dW5nZXR3Y3xwb3d8cG93Znxwb3dsfHB1dHN8cHV0Y3xwdXRjaGFyfHB1dHdjfHB1dHdjaGFyfHBlcnJvcnxwcmludGZ8ZXJmfGVyZmN8ZXJmY2Z8ZXJmY2x8ZXJmZnxlcmZsfGV4aXR8ZXhwfGV4cDJ8ZXhwMmZ8ZXhwMmx8ZXhwZnxleHBsfGV4cG0xfGV4cG0xZnxleHBtMWx8dnNzY2FuZnx2c25wcmludGZ8dnNjYW5mfHZzcHJpbnRmfHZzd3NjYW5mfHZzd3ByaW50Znx2cHJpbnRmfHZmc2NhbmZ8dmZwcmludGZ8dmZ3c2NhbmZ8dmZ3cHJpbnRmfHZ3c2NhbmZ8dndwcmludGZ8dmFfc3RhcnR8dmFfY29weXx2YV9lbmR8dmFfYXJnfHFzb3J0fGZzY2FuZnxmc2V0cG9zfGZzZWVrfGZjbG9zZXxmdGVsbHxmb3BlbnxmZGltfGZkaW1mfGZkaW1sfGZwY2xhc3NpZnl8ZnB1dHN8ZnB1dGN8ZnB1dHdzfGZwdXR3Y3xmcHJpbnRmfGZlaG9sZGV4Y2VwdHxmZXNldGVudnxmZXNldGV4Y2VwdGZsYWd8ZmVzZXRyb3VuZHxmZWNsZWFyZXhjZXB0fGZldGVzdGV4Y2VwdHxmZW9mfGZldXBkYXRlZW52fGZlcmFpc2VleGNlcHR8ZmVycm9yfGZlZ2V0ZW52fGZlZ2V0ZXhjZXB0ZmxhZ3xmZWdldHJvdW5kfGZmbHVzaHxmd3NjYW5mfGZ3aWRlfGZ3cHJpbnRmfGZ3cml0ZXxmbG9vcnxmbG9vcmZ8Zmxvb3JsfGZhYnN8ZmFic2Z8ZmFic2x8ZmdldHN8ZmdldGN8ZmdldHBvc3xmZ2V0d3N8ZmdldHdjfGZyZW9wZW58ZnJlZXxmcmVhZHxmcmV4cHxmcmV4cGZ8ZnJleHBsfGZtaW58Zm1pbmZ8Zm1pbmx8Zm1vZHxmbW9kZnxmbW9kbHxmbWF8Zm1hZnxmbWFsfGZtYXh8Zm1heGZ8Zm1heGx8bGRpdnxsZGV4cHxsZGV4cGZ8bGRleHBsfGxvbmdqbXB8bG9jYWx0aW1lfGxvY2FsZWNvbnZ8bG9nfGxvZzFwfGxvZzFwZnxsb2cxcGx8bG9nMTB8bG9nMTBmfGxvZzEwbHxsb2cyfGxvZzJmfGxvZzJsfGxvZ2Z8bG9nbHxsb2difGxvZ2JmfGxvZ2JsfGxhYnN8bGxkaXZ8bGxhYnN8bGxyaW50fGxscmludGZ8bGxyaW50bHxsbHJvdW5kfGxscm91bmRmfGxscm91bmRsfGxyaW50fGxyaW50ZnxscmludGx8bHJvdW5kfGxyb3VuZGZ8bHJvdW5kbHxsZ2FtbWF8bGdhbW1hZnxsZ2FtbWFsfHdzY2FuZnx3Y3NzdHJ8d2Nzc3BufHdjc25jcHl8d2NzbmNhdHx3Y3NuY21wfHdjc2NzcG58d2NzY2hyfHdjc2NvbGx8d2NzY3B5fHdjc2NhdHx3Y3NjbXB8d2NzdG9pbWF4fHdjc3RvZHx3Y3N0b3VsfHdjc3RvdWxsfHdjc3RvdW1heHx3Y3N0b2t8d2NzdG9mfHdjc3RvbHx3Y3N0b2xkfHdjc3RvbGx8d2NzdG9tYnN8d2NzcGJya3x3Y3NmdGltZXx3Y3NsZW58d2NzcmNocnx3Y3NydG9tYnN8d2NzeGZybXx3Y3RvYnx3Y3RvbWJ8d2NydG9tYnx3cHJpbnRmfHdtZW1zZXR8d21lbWNocnx3bWVtY3B5fHdtZW1jbXB8d21lbW1vdmV8YXNzZXJ0fGFzY3RpbWV8YXNpbnxhc2luaHxhc2luaGZ8YXNpbmhsfGFzaW5mfGFzaW5sfGFjb3N8YWNvc2h8YWNvc2hmfGFjb3NobHxhY29zZnxhY29zbHxhdG9pfGF0b2Z8YXRvbHxhdG9sbHxhdGV4aXR8YXRhbnxhdGFuaHxhdGFuaGZ8YXRhbmhsfGF0YW4yfGF0YW4yZnxhdGFuMmx8YXRhbmZ8YXRhbmx8YWJzfGFib3J0fGdldHN8Z2V0Y3xnZXRjaGFyfGdldGVudnxnZXR3Y3xnZXR3Y2hhcnxnbXRpbWV8cmludHxyaW50ZnxyaW50bHxyb3VuZHxyb3VuZGZ8cm91bmRsfHJlbmFtZXxyZWFsbG9jfHJld2luZHxyZW1vdmV8cmVtcXVvfHJlbXF1b2Z8cmVtcXVvbHxyZW1haW5kZXJ8cmVtYWluZGVyZnxyZW1haW5kZXJsfHJhbmR8cmFpc2V8YnNlYXJjaHxidG93Y3xtb2RmfG1vZGZmfG1vZGZsfG1lbXNldHxtZW1jaHJ8bWVtY3B5fG1lbWNtcHxtZW1tb3ZlfG1rdGltZXxtYWxsb2N8bWJzaW5pdHxtYnN0b3djc3xtYnNydG93Y3N8bWJ0b3djfG1ibGVufG1icnRvd2N8bWJybGVuXCI7XG5cbnZhciBjX2NwcEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oZXh0cmFLZXl3b3Jkcykge1xuXG4gICAgdmFyIGtleXdvcmRDb250cm9scyA9IChcbiAgICAgICAgXCJicmVha3xjYXNlfGNvbnRpbnVlfGRlZmF1bHR8ZG98ZWxzZXxmb3J8Z290b3xpZnxfUHJhZ21hfFwiICtcbiAgICAgICAgXCJyZXR1cm58c3dpdGNofHdoaWxlfGNhdGNofG9wZXJhdG9yfHRyeXx0aHJvd3x1c2luZ1wiXG4gICAgKTtcbiAgICBcbiAgICB2YXIgc3RvcmFnZVR5cGUgPSAoXG4gICAgICAgIFwiYXNtfF9fYXNtX198YXV0b3xib29sfF9Cb29sfGNoYXJ8X0NvbXBsZXh8ZG91YmxlfGVudW18ZmxvYXR8XCIgK1xuICAgICAgICBcIl9JbWFnaW5hcnl8aW50fGludDhfdHxpbnQxNl90fGludDMyX3R8aW50NjRfdHxsb25nfHNob3J0fHNpZ25lZHxzaXplX3R8c3RydWN0fHR5cGVkZWZ8dWludDhfdHx1aW50MTZfdHx1aW50MzJfdHx1aW50NjRfdHx1bmlvbnx1bnNpZ25lZHx2b2lkfFwiICtcbiAgICAgICAgXCJjbGFzc3x3Y2hhcl90fHRlbXBsYXRlfGNoYXIxNl90fGNoYXIzMl90XCJcbiAgICApO1xuXG4gICAgdmFyIHN0b3JhZ2VNb2RpZmllcnMgPSAoXG4gICAgICAgIFwiY29uc3R8ZXh0ZXJufHJlZ2lzdGVyfHJlc3RyaWN0fHN0YXRpY3x2b2xhdGlsZXxpbmxpbmV8cHJpdmF0ZXxcIiArXG4gICAgICAgIFwicHJvdGVjdGVkfHB1YmxpY3xmcmllbmR8ZXhwbGljaXR8dmlydHVhbHxleHBvcnR8bXV0YWJsZXx0eXBlbmFtZXxcIiArXG4gICAgICAgIFwiY29uc3RleHByfG5ld3xkZWxldGV8YWxpZ25hc3xhbGlnbm9mfGRlY2x0eXBlfG5vZXhjZXB0fHRocmVhZF9sb2NhbFwiXG4gICAgKTtcblxuICAgIHZhciBrZXl3b3JkT3BlcmF0b3JzID0gKFxuICAgICAgICBcImFuZHxhbmRfZXF8Yml0YW5kfGJpdG9yfGNvbXBsfG5vdHxub3RfZXF8b3J8b3JfZXF8dHlwZWlkfHhvcnx4b3JfZXF8XCIgK1xuICAgICAgICBcImNvbnN0X2Nhc3R8ZHluYW1pY19jYXN0fHJlaW50ZXJwcmV0X2Nhc3R8c3RhdGljX2Nhc3R8c2l6ZW9mfG5hbWVzcGFjZVwiXG4gICAgKTtcblxuICAgIHZhciBidWlsdGluQ29uc3RhbnRzID0gKFxuICAgICAgICBcIk5VTEx8dHJ1ZXxmYWxzZXxUUlVFfEZBTFNFfG51bGxwdHJcIlxuICAgICk7XG5cbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuJGtleXdvcmRzID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKE9iamVjdC5hc3NpZ24oe1xuICAgICAgICBcImtleXdvcmQuY29udHJvbFwiIDoga2V5d29yZENvbnRyb2xzLFxuICAgICAgICBcInN0b3JhZ2UudHlwZVwiIDogc3RvcmFnZVR5cGUsXG4gICAgICAgIFwic3RvcmFnZS5tb2RpZmllclwiIDogc3RvcmFnZU1vZGlmaWVycyxcbiAgICAgICAgXCJrZXl3b3JkLm9wZXJhdG9yXCIgOiBrZXl3b3JkT3BlcmF0b3JzLFxuICAgICAgICBcInZhcmlhYmxlLmxhbmd1YWdlXCI6IFwidGhpc1wiLFxuICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IGJ1aWx0aW5Db25zdGFudHMsXG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvbi5DOTkuY1wiOiBjRnVuY3Rpb25zXG4gICAgfSwgZXh0cmFLZXl3b3JkcyksIFwiaWRlbnRpZmllclwiKTtcblxuICAgIHZhciBpZGVudGlmaWVyUmUgPSBcIlthLXpBLVpcXFxcJF9cXHUwMGExLVxcdWZmZmZdW2EtekEtWlxcXFxkXFxcXCRfXFx1MDBhMS1cXHVmZmZmXSpcXFxcYlwiO1xuICAgIHZhciBlc2NhcGVSZSA9IC9cXFxcKD86WydcIj9cXFxcYWJmbnJ0dl18WzAtN117MSwzfXx4W2EtZkEtRlxcZF17Mn18dVthLWZBLUZcXGRdezR9VVthLWZBLUZcXGRdezh9fC4pLy5zb3VyY2U7XG4gICAgdmFyIGZvcm1hdFJlID0gXCIlXCJcbiAgICAgICAgICArIC8oXFxkK1xcJCk/Ly5zb3VyY2UgLy8gZmllbGQgKGFyZ3VtZW50ICMpXG4gICAgICAgICAgKyAvWyMwXFwtICsnXSovLnNvdXJjZSAvLyBmbGFnc1xuICAgICAgICAgICsgL1ssOzpfXT8vLnNvdXJjZSAvLyBzZXBhcmF0b3IgY2hhcmFjdGVyIChBbHRpVmVjKVxuICAgICAgICAgICsgLygoLT9cXGQrKXxcXCooLT9cXGQrXFwkKT8pPy8uc291cmNlIC8vIG1pbmltdW0gZmllbGQgd2lkdGhcbiAgICAgICAgICArIC8oXFwuKCgtP1xcZCspfFxcKigtP1xcZCtcXCQpPyk/KT8vLnNvdXJjZSAvLyBwcmVjaXNpb25cbiAgICAgICAgICArIC8oaGh8aHxsbHxsfGp8dHx6fHF8THx2aHx2bHx2fGh2fGhsKT8vLnNvdXJjZSAvLyBsZW5ndGggbW9kaWZpZXJcbiAgICAgICAgICArIC8oXFxbW15cIlxcXV0rXFxdfFtkaW91eFhET1VlRWZGZ0dhQUNjU3NwbiVdKS8uc291cmNlOyAvLyBjb252ZXJzaW9uIHR5cGVcbiAgICAgICAgICBcbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7IFxuICAgICAgICBcInN0YXJ0XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiLy8kXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIi8vXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic2luZ2xlTGluZUNvbW1lbnRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUoXCJkb2Mtc3RhcnRcIiksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gbXVsdGkgbGluZSBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCpcIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIGNoYXJhY3RlclxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCInKD86XCIgKyBlc2NhcGVSZSArIFwifC4pPydcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICdcIicsIFxuICAgICAgICAgICAgICAgIHN0YXRlTmFtZTogXCJxcXN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB0b2tlbjogXCJzdHJpbmdcIiwgcmVnZXg6IC9cXFxcXFxzKiQvLCBuZXh0OiBcInFxc3RyaW5nXCIgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIiwgcmVnZXg6IGVzY2FwZVJlIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsIHJlZ2V4OiBmb3JtYXRSZSB9LFxuICAgICAgICAgICAgICAgICAgICB7IHRva2VuOiBcInN0cmluZy5lbmRcIiwgcmVnZXg6ICdcInwkJywgbmV4dDogXCJzdGFydFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wifVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnUlwiXFxcXCgnLCBcbiAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwicmF3U3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogW1xuICAgICAgICAgICAgICAgICAgICB7IHRva2VuOiBcInN0cmluZy5lbmRcIiwgcmVnZXg6ICdcXFxcKVwiJywgbmV4dDogXCJzdGFydFwiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wifVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXhcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiMFt4WF1bMC05YS1mQS1GXSsoTHxsfFVMfHVsfHV8VXxGfGZ8bGx8TEx8dWxsfFVMTCk/XFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlsrLV0/XFxcXGQrKD86KD86XFxcXC5cXFxcZCopPyg/OltlRV1bKy1dP1xcXFxkKyk/KT8oTHxsfFVMfHVsfHV8VXxGfGZ8bGx8TEx8dWxsfFVMTCk/XFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsIC8vIHByZS1jb21waWxlciBkaXJlY3RpdmVzXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiNcXFxccyooPzppbmNsdWRlfGltcG9ydHxwcmFnbWF8bGluZXxkZWZpbmV8dW5kZWYpXFxcXGJcIixcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwiZGlyZWN0aXZlXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLCAvLyBzcGVjaWFsIGNhc2UgcHJlLWNvbXBpbGVyIGRpcmVjdGl2ZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjXFxcXHMqKD86ZW5kaWZ8aWZ8aWZkZWZ8ZWxzZXxlbGlmfGlmbmRlZilcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvLS18XFwrXFwrfDw8PXw+Pj18Pj4+PXw8PnwmJnxcXHxcXHx8XFw/OnxbKiVcXC8rXFwtJlxcXnx+ITw+PV09Py9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcP3xcXFxcOnxcXFxcLHxcXFxcO3xcXFxcLlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbWyh7XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbXFxcXF0pfV1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwiY29tbWVudFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwic2luZ2xlTGluZUNvbW1lbnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcXFwkLyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzaW5nbGVMaW5lQ29tbWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC8kLyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImRpcmVjdGl2ZVwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5vdGhlci5tdWx0aWxpbmVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXFxcL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQub3RoZXIubXVsdGlsaW5lXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvLipcXFxcL1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQub3RoZXJcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMqPC4rPz5cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5vdGhlclwiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1xcXFxzKltcIl0oPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/W1wiXScsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm90aGVyXCIsIC8vIHNpbmdsZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzKlsnXSg/Oig/OlxcXFxcXFxcLil8KD86W14nXFxcXFxcXFxdKSkqP1snXVwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvLyBcIlxcXCIgaW1wbGllcyBtdWx0aWxpbmUsIHdoaWxlIFwiL1wiIGltcGxpZXMgY29tbWVudFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5vdGhlclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1teXFxcXFxcL10rLyxcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuXG4gICAgdGhpcy5lbWJlZFJ1bGVzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgXCJkb2MtXCIsXG4gICAgICAgIFsgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldEVuZFJ1bGUoXCJzdGFydFwiKSBdKTtcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoY19jcHBIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5jX2NwcEhpZ2hsaWdodFJ1bGVzID0gY19jcHBIaWdobGlnaHRSdWxlcztcbiIsIi8qXG4gIFRISVMgRklMRSBXQVMgQVVUT0dFTkVSQVRFRCBCWSBtb2RlLnRtcGwuanNcbiovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgQ01vZGUgPSByZXF1aXJlKFwiLi9jX2NwcFwiKS5Nb2RlO1xudmFyIERhcnRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2RhcnRfaGlnaGxpZ2h0X3J1bGVzXCIpLkRhcnRIaWdobGlnaHRSdWxlcztcbnZhciBDU3R5bGVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIENNb2RlLmNhbGwodGhpcyk7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IERhcnRIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBDU3R5bGVGb2xkTW9kZSgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIENNb2RlKTtcblxuKGZ1bmN0aW9uKCkgeyBcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi8vXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiLypcIiwgZW5kOiBcIiovXCJ9O1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9kYXJ0XCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvZGFydFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCIvKlxuICBUSElTIEZJTEUgV0FTIEFVVE9HRU5FUkFURUQgQlkgbW9kZV9oaWdobGlnaHRfcnVsZXMudG1wbC5qcyAoVVVJRDogOTU4NTE4QkMtNzk5Ri00NzdBLTk5RjktNUIyOEVCRjIzMEY2KSAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlc1wiKS5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgRGFydEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgY29uc3RhbnRMYW5ndWFnZSA9IFwidHJ1ZXxmYWxzZXxudWxsXCI7XG4gICAgdmFyIHZhcmlhYmxlTGFuZ3VhZ2UgPSBcInRoaXN8c3VwZXJcIjtcbiAgICB2YXIga2V5d29yZENvbnRyb2wgPSBcInRyeXxjYXRjaHxmaW5hbGx5fHRocm93fHJldGhyb3d8YXNzZXJ0fGJyZWFrfGNhc2V8Y29udGludWV8ZGVmYXVsdHxkb3xlbHNlfGZvcnxpZnxpbnxyZXR1cm58c3dpdGNofHdoaWxlfG5ld3xkZWZlcnJlZHxhc3luY3xhd2FpdFwiO1xuICAgIHZhciBrZXl3b3JkRGVjbGFyYXRpb24gPSBcImFic3RyYWN0fGNsYXNzfGV4dGVuZHN8ZXh0ZXJuYWx8ZmFjdG9yeXxpbXBsZW1lbnRzfGdldHxuYXRpdmV8b3BlcmF0b3J8c2V0fHR5cGVkZWZ8d2l0aHxlbnVtXCI7XG4gICAgdmFyIHN0b3JhZ2VNb2RpZmllciA9IFwic3RhdGljfGZpbmFsfGNvbnN0XCI7XG4gICAgdmFyIHN0b3JhZ2VUeXBlID0gXCJ2b2lkfGJvb2x8bnVtfGludHxkb3VibGV8ZHluYW1pY3x2YXJ8U3RyaW5nXCI7XG5cbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2UuZGFydFwiOiBjb25zdGFudExhbmd1YWdlLFxuICAgICAgICBcInZhcmlhYmxlLmxhbmd1YWdlLmRhcnRcIjogdmFyaWFibGVMYW5ndWFnZSxcbiAgICAgICAgXCJrZXl3b3JkLmNvbnRyb2wuZGFydFwiOiBrZXl3b3JkQ29udHJvbCxcbiAgICAgICAgXCJrZXl3b3JkLmRlY2xhcmF0aW9uLmRhcnRcIjoga2V5d29yZERlY2xhcmF0aW9uLFxuICAgICAgICBcInN0b3JhZ2UubW9kaWZpZXIuZGFydFwiOiBzdG9yYWdlTW9kaWZpZXIsXG4gICAgICAgIFwic3RvcmFnZS50eXBlLnByaW1pdGl2ZS5kYXJ0XCI6IHN0b3JhZ2VUeXBlXG4gICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgdmFyIHN0cmluZ2ZpbGwgPSBbe1xuICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgIHJlZ2V4IDogL1xcXFwuL1xuICAgIH0sIHtcbiAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgcmVnZXggOiAvXFwkKD86XFx3K3x7W15cIid9XSt9KT8vXG4gICAgfSwge1xuICAgICAgICBkZWZhdWx0VG9rZW4gOiBcInN0cmluZ1wiXG4gICAgfV07XG5cbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgXCJzdGFydFwiOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICByZWdleCA6IC9cXC9cXC8uKiQvXG4gICAgICAgIH0sXG4gICAgICAgIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUoXCJkb2Mtc3RhcnRcIiksXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIG11bHRpIGxpbmUgY29tbWVudFxuICAgICAgICAgICAgcmVnZXggOiAvXFwvXFwqLyxcbiAgICAgICAgICAgIG5leHQgOiBcImNvbW1lbnRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1wibWV0YS5wcmVwcm9jZXNzb3Iuc2NyaXB0LmRhcnRcIl0sXG4gICAgICAgICAgICByZWdleDogXCJeKCMhLiopJFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3RoZXIuaW1wb3J0LmRhcnRcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIig/OlxcXFxiKSg/OmxpYnJhcnl8aW1wb3J0fGV4cG9ydHxwYXJ0fG9mfHNob3d8aGlkZSkoPzpcXFxcYilcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcImtleXdvcmQub3RoZXIuaW1wb3J0LmRhcnRcIiwgXCJ0ZXh0XCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIig/OlxcXFxiKShwcmVmaXgpKFxcXFxzKjopXCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXGJhc1xcXFxiXCIsXG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLmNhc3QuZGFydFwiXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFw/fDpcIixcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQuY29udHJvbC50ZXJuYXJ5LmRhcnRcIlxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICByZWdleDogXCIoPzpcXFxcYikoaXNcXFxcIT8pKD86XFxcXGIpXCIsXG4gICAgICAgICAgICB0b2tlbjogW1wia2V5d29yZC5vcGVyYXRvci5kYXJ0XCJdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJlZ2V4OiBcIig8PHw+Pj4/fH58XFxcXF58XFxcXHx8JilcIixcbiAgICAgICAgICAgIHRva2VuOiBbXCJrZXl3b3JkLm9wZXJhdG9yLmJpdHdpc2UuZGFydFwiXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICByZWdleDogXCIoKD86JnxcXFxcXnxcXFxcfHw8PHw+Pj4/KT0pXCIsXG4gICAgICAgICAgICB0b2tlbjogW1wia2V5d29yZC5vcGVyYXRvci5hc3NpZ25tZW50LmJpdHdpc2UuZGFydFwiXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICByZWdleDogXCIoPT09P3whPT0/fDw9P3w+PT8pXCIsXG4gICAgICAgICAgICB0b2tlbjogW1wia2V5d29yZC5vcGVyYXRvci5jb21wYXJpc29uLmRhcnRcIl1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgcmVnZXg6IFwiKCg/OlsrKi8lLV18XFxcXH4pPSlcIixcbiAgICAgICAgICAgIHRva2VuOiBbXCJrZXl3b3JkLm9wZXJhdG9yLmFzc2lnbm1lbnQuYXJpdGhtZXRpYy5kYXJ0XCJdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJlZ2V4OiBcIj1cIixcbiAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3IuYXNzaWdubWVudC5kYXJ0XCJcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIicnJ1wiLFxuICAgICAgICAgICAgbmV4dCA6IFwicWRvY1wiXG4gICAgICAgIH0sIFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6ICdcIlwiXCInLFxuICAgICAgICAgICAgbmV4dCA6IFwicXFkb2NcIlxuICAgICAgICB9LCBcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIidcIixcbiAgICAgICAgICAgIG5leHQgOiBcInFzdHJpbmdcIlxuICAgICAgICB9LCBcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgbmV4dCA6IFwicXFzdHJpbmdcIlxuICAgICAgICB9LCBcbiAgICAgICAge1xuICAgICAgICAgICAgcmVnZXg6IFwiKFxcXFwtXFxcXC18XFxcXCtcXFxcKylcIixcbiAgICAgICAgICAgIHRva2VuOiBbXCJrZXl3b3JkLm9wZXJhdG9yLmluY3JlbWVudC1kZWNyZW1lbnQuZGFydFwiXVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICByZWdleDogXCIoXFxcXC18XFxcXCt8XFxcXCp8XFxcXC98XFxcXH5cXFxcL3wlKVwiLFxuICAgICAgICAgICAgdG9rZW46IFtcImtleXdvcmQub3BlcmF0b3IuYXJpdGhtZXRpYy5kYXJ0XCJdXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICAgIHJlZ2V4OiBcIighfCYmfFxcXFx8XFxcXHwpXCIsXG4gICAgICAgICAgICB0b2tlbjogW1wia2V5d29yZC5vcGVyYXRvci5sb2dpY2FsLmRhcnRcIl1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4XG4gICAgICAgICAgICByZWdleCA6IFwiMFt4WF1bMC05YS1mQS1GXStcXFxcYlwiXG4gICAgICAgIH0sIFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgcmVnZXggOiBcIlsrLV0/XFxcXGQrKD86KD86XFxcXC5cXFxcZCopPyg/OltlRV1bKy1dP1xcXFxkKyk/KT9cXFxcYlwiXG4gICAgICAgIH0sIFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxcXGJcIlxuICAgICAgICB9XG4gICAgXSxcbiAgICBcImNvbW1lbnRcIiA6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIlxuICAgICAgICB9XG4gICAgXSxcbiAgICBcInFkb2NcIiA6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiBcIicnJ1wiLFxuICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICB9XG4gICAgXS5jb25jYXQoc3RyaW5nZmlsbCksXG5cbiAgICBcInFxZG9jXCIgOiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogJ1wiXCJcIicsXG4gICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgIH1cbiAgICBdLmNvbmNhdChzdHJpbmdmaWxsKSxcblxuICAgIFwicXN0cmluZ1wiIDogW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiJ3wkXCIsXG4gICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgIH1cbiAgICBdLmNvbmNhdChzdHJpbmdmaWxsKSxcblxuICAgIFwicXFzdHJpbmdcIiA6IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgcmVnZXggOiAnXCJ8JCcsXG4gICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgIH1cbiAgICBdLmNvbmNhdChzdHJpbmdmaWxsKVxuICAgIC8vIFRPRE8gYWRkIHN1cHBvcnQgZm9yIGludGVycG9sYXRpb24gYW5kIHJhdyBzdHJpbmdzXG59O1xuXG4gICAgdGhpcy5lbWJlZFJ1bGVzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgXCJkb2MtXCIsXG4gICAgICAgIFsgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldEVuZFJ1bGUoXCJzdGFydFwiKSBdKTtcbn07XG5cbm9vcC5pbmhlcml0cyhEYXJ0SGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuRGFydEhpZ2hsaWdodFJ1bGVzID0gRGFydEhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQuZG9jLnRhZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIkBcXFxcdysoPz1cXFxcc3wkKVwiXG4gICAgICAgICAgICB9LCBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSgpLCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnQuZG9jLmJvZHlcIixcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jLnRhZy5zdG9yYWdlLnR5cGVcIixcbiAgICAgICAgcmVnZXggOiBcIlxcXFxiKD86VE9ET3xGSVhNRXxYWFh8SEFDSylcXFxcYlwiXG4gICAgfTtcbn07XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBkb2MgY29tbWVudFxuICAgICAgICByZWdleDogL1xcL1xcKlxcKig/IVxcLykvLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlID0gZnVuY3Rpb24gKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jXCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cblxuZXhwb3J0cy5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGNvbW1lbnRSZWdleCkge1xuICAgIGlmIChjb21tZW50UmVnZXgpIHtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5zdGFydClcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguZW5kKVxuICAgICAgICApO1xuICAgIH1cbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IC8oW1xce1xcW1xcKF0pW15cXH1cXF1cXCldKiR8XlxccyooXFwvXFwqKS87XG4gICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlciA9IC9eW15cXFtcXHtcXChdKihbXFx9XFxdXFwpXSl8XltcXHNcXCpdKihcXCpcXC8pLztcbiAgICB0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZT0gL15cXHMqKFxcL1xcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZSA9IC9eXFxzKihcXC9cXCpcXCpcXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy5zdGFydFJlZ2lvblJlID0gL15cXHMqKFxcL1xcKnxcXC9cXC8pIz9yZWdpb25cXGIvO1xuICAgIFxuICAgIC8vcHJldmVudCBuYW1pbmcgY29uZmxpY3Qgd2l0aCBhbnkgbW9kZXMgdGhhdCBpbmhlcml0IGZyb20gY3N0eWxlIGFuZCBvdmVycmlkZSB0aGlzIChsaWtlIGNzaGFycClcbiAgICB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldDtcbiAgICBcbiAgICAvKipcbiAgICAgKiBHZXRzIGZvbGQgd2lkZ2V0IHdpdGggc29tZSBub24tc3RhbmRhcmQgZXh0cmFzOlxuICAgICAqXG4gICAgICogQGV4YW1wbGUgbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLy8jcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGJsb2NrQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvKiNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXSAqWy9dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSB0cmlwbGVTdGFyRm9sZGluZ1NlY3Rpb25cbiAgICAgKiAgICAgIC8qKiogdGhpcyBmb2xkcyBldmVuIHRob3VnaCAxIGxpbmUgYmVjYXVzZSBpdCBoYXMgMyBzdGFycyAqKipbL11cbiAgICAgKiBcbiAgICAgKiBAbm90ZSB0aGUgcG91bmQgc3ltYm9sIGZvciByZWdpb24gdGFncyBpcyBvcHRpb25hbFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgXG4gICAgICAgIGlmICh0aGlzLnNpbmdsZUxpbmVCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAvLyBObyB3aWRnZXQgZm9yIHNpbmdsZSBsaW5lIGJsb2NrIGNvbW1lbnQgdW5sZXNzIHJlZ2lvbiBvciB0cmlwbGUgc3RhclxuICAgICAgICAgICAgaWYgKCF0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSAmJiAhdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgfVxuICAgIFxuICAgICAgICB2YXIgZncgPSB0aGlzLl9nZXRGb2xkV2lkZ2V0QmFzZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgXG4gICAgICAgIGlmICghZncgJiYgdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiOyAvLyBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgXG4gICAgICAgIHJldHVybiBmdztcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdywgZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgXG4gICAgICAgIGlmICh0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayhzZXNzaW9uLCBsaW5lLCByb3cpO1xuICAgICAgICBcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdGFydE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm9wZW5pbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcmFuZ2UgPSBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpICsgbWF0Y2hbMF0ubGVuZ3RoLCAxKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHJhbmdlICYmICFyYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gdGhpcy5nZXRTZWN0aW9uUmFuZ2Uoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZvbGRTdHlsZSAhPSBcImFsbFwiKVxuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luXCIpXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCh0aGlzLmZvbGRpbmdTdG9wTWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2xvc2luZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcblxuICAgICAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGksIC0xKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRTZWN0aW9uUmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIHN0YXJ0SW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUubGVuZ3RoO1xuICAgICAgICByb3cgPSByb3cgKyAxO1xuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PT0gLTEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAgKHN0YXJ0SW5kZW50ID4gaW5kZW50KVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgdmFyIHN1YlJhbmdlID0gdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgXCJhbGxcIiwgcm93KTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKHN1YlJhbmdlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN1YlJhbmdlLnN0YXJ0LnJvdyA8PSBzdGFydFJvdykge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN1YlJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm93ID0gc3ViUmFuZ2UuZW5kLnJvdztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHN0YXJ0SW5kZW50ID09IGluZGVudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbmRSb3cgPSByb3c7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aCk7XG4gICAgfTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBnZXRzIGNvbW1lbnQgcmVnaW9uIGJsb2NrIHdpdGggZW5kIHJlZ2lvbiBhc3N1bWVkIHRvIGJlIHN0YXJ0IG9mIGNvbW1lbnQgaW4gYW55IGNzdHlsZSBtb2RlIG9yIFNRTCBtb2RlICgtLSkgd2hpY2ggaW5oZXJpdHMgZnJvbSB0aGlzLlxuICAgICAqIFRoZXJlIG1heSBvcHRpb25hbGx5IGJlIGEgcG91bmQgc3ltYm9sIGJlZm9yZSB0aGUgcmVnaW9uL2VuZHJlZ2lvbiBzdGF0ZW1lbnRcbiAgICAgKi9cbiAgICB0aGlzLmdldENvbW1lbnRSZWdpb25CbG9jayA9IGZ1bmN0aW9uKHNlc3Npb24sIGxpbmUsIHJvdykge1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLnNlYXJjaCgvXFxzKiQvKTtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgXG4gICAgICAgIHZhciByZSA9IC9eXFxzKig/OlxcL1xcKnxcXC9cXC98LS0pIz8oZW5kKT9yZWdpb25cXGIvO1xuICAgICAgICB2YXIgZGVwdGggPSAxO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBtID0gcmUuZXhlYyhsaW5lKTtcbiAgICAgICAgICAgIGlmICghbSkgY29udGludWU7XG4gICAgICAgICAgICBpZiAobVsxXSkgZGVwdGgtLTtcbiAgICAgICAgICAgIGVsc2UgZGVwdGgrKztcblxuICAgICAgICAgICAgaWYgKCFkZXB0aCkgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZW5kUm93ID0gcm93O1xuICAgICAgICBpZiAoZW5kUm93ID4gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGxpbmUubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IGZ1bmN0aW9uKCkge307XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24obGluZSwgaW5wdXQpIHtcbiAgICAgICAgaWYgKCEgL15cXHMrJC8udGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gL15cXHMqXFx9Ly50ZXN0KGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKGRvYywgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gZG9jLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXihcXHMqXFx9KS8pO1xuXG4gICAgICAgIGlmICghbWF0Y2gpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBjb2x1bW4gPSBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciBvcGVuQnJhY2VQb3MgPSBkb2MuZmluZE1hdGNoaW5nQnJhY2tldCh7cm93OiByb3csIGNvbHVtbjogY29sdW1ufSk7XG5cbiAgICAgICAgaWYgKCFvcGVuQnJhY2VQb3MgfHwgb3BlbkJyYWNlUG9zLnJvdyA9PSByb3cpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQoZG9jLmdldExpbmUob3BlbkJyYWNlUG9zLnJvdykpO1xuICAgICAgICBkb2MucmVwbGFjZShuZXcgUmFuZ2Uocm93LCAwLCByb3csIGNvbHVtbi0xKSwgaW5kZW50KTtcbiAgICB9O1xuXG4gICAgdGhpcy4kZ2V0SW5kZW50ID0gZnVuY3Rpb24obGluZSkge1xuICAgICAgICByZXR1cm4gbGluZS5tYXRjaCgvXlxccyovKVswXTtcbiAgICB9O1xuXG59KS5jYWxsKE1hdGNoaW5nQnJhY2VPdXRkZW50LnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBNYXRjaGluZ0JyYWNlT3V0ZGVudDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==