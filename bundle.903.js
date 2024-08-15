"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[903,7668],{

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

/***/ 80903:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var CMode = (__webpack_require__(97668).Mode);
var glslHighlightRules = (__webpack_require__(55508)/* .glslHighlightRules */ .G);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = glslHighlightRules;
    
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, CMode);

(function() {
    this.$id = "ace/mode/glsl";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 55508:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var c_cppHighlightRules = (__webpack_require__(99047)/* .c_cppHighlightRules */ .N);

var glslHighlightRules = function() {

    var keywords = (
        "attribute|const|uniform|varying|break|continue|do|for|while|" +
        "if|else|in|out|inout|float|int|void|bool|true|false|" +
        "lowp|mediump|highp|precision|invariant|discard|return|mat2|mat3|" +
        "mat4|vec2|vec3|vec4|ivec2|ivec3|ivec4|bvec2|bvec3|bvec4|sampler2D|" +
        "samplerCube|struct"
    );

    var buildinConstants = (
        "radians|degrees|sin|cos|tan|asin|acos|atan|pow|" +
        "exp|log|exp2|log2|sqrt|inversesqrt|abs|sign|floor|ceil|fract|mod|" +
        "min|max|clamp|mix|step|smoothstep|length|distance|dot|cross|" +
        "normalize|faceforward|reflect|refract|matrixCompMult|lessThan|" +
        "lessThanEqual|greaterThan|greaterThanEqual|equal|notEqual|any|all|" +
        "not|dFdx|dFdy|fwidth|texture2D|texture2DProj|texture2DLod|" +
        "texture2DProjLod|textureCube|textureCubeLod|" +
        "gl_MaxVertexAttribs|gl_MaxVertexUniformVectors|gl_MaxVaryingVectors|" +
        "gl_MaxVertexTextureImageUnits|gl_MaxCombinedTextureImageUnits|" +
        "gl_MaxTextureImageUnits|gl_MaxFragmentUniformVectors|gl_MaxDrawBuffers|" +
        "gl_DepthRangeParameters|gl_DepthRange|" +
        // The following two are only for MIME x-shader/x-vertex.
        "gl_Position|gl_PointSize|" +
        // The following five are only for MIME x-shader/x-fragment.
        "gl_FragCoord|gl_FrontFacing|gl_PointCoord|gl_FragColor|gl_FragData"
    );

    var keywordMapper = this.createKeywordMapper({
        "variable.language": "this",
        "keyword": keywords,
        "constant.language": buildinConstants
    }, "identifier");

    this.$rules = new c_cppHighlightRules().$rules;
    this.$rules.start.forEach(function(rule) {
        if (typeof rule.token == "function")
            rule.token = keywordMapper;
    });
};

oop.inherits(glslHighlightRules, c_cppHighlightRules);

exports.G = glslHighlightRules;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LWNvZGUvc3JjL21vZGUvY19jcHAuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jX2NwcF9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2NzdHlsZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2dsc2wuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9nbHNsX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL21hdGNoaW5nX2JyYWNlX291dGRlbnQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBjX2NwcEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vY19jcHBfaGlnaGxpZ2h0X3J1bGVzXCIpLmNfY3BwSGlnaGxpZ2h0UnVsZXM7XG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSByZXF1aXJlKFwiLi9tYXRjaGluZ19icmFjZV9vdXRkZW50XCIpLk1hdGNoaW5nQnJhY2VPdXRkZW50O1xudmFyIENTdHlsZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IGNfY3BwSGlnaGxpZ2h0UnVsZXM7XG5cbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcblxuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IENTdHlsZUZvbGRNb2RlKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIvL1wiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIi8qXCIsIGVuZDogXCIqL1wifTtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgdmFyIHRva2VuaXplZExpbmUgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpO1xuICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemVkTGluZS50b2tlbnM7XG4gICAgICAgIHZhciBlbmRTdGF0ZSA9IHRva2VuaXplZExpbmUuc3RhdGU7XG5cbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKltcXHtcXChcXFtdXFxzKiQvKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT0gXCJkb2Mtc3RhcnRcIikge1xuICAgICAgICAgICAgaWYgKGVuZFN0YXRlID09IFwic3RhcnRcIikge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXlxccyooXFwvPylcXCovKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaFsxXSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRlbnQgKz0gXCIgXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGluZGVudCArPSBcIiogXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kb3V0ZGVudC5jaGVja091dGRlbnQobGluZSwgaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoZG9jLCByb3cpO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvY19jcHBcIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9jX2NwcFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlc1wiKS5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG4vLyB1c2VkIGJ5IG9iamVjdGl2ZS1jXG52YXIgY0Z1bmN0aW9ucyA9IGV4cG9ydHMuY0Z1bmN0aW9ucyA9IFwiaHlwb3R8aHlwb3RmfGh5cG90bHxzc2NhbmZ8c3lzdGVtfHNucHJpbnRmfHNjYW5mfHNjYWxibnxzY2FsYm5mfHNjYWxibmx8c2NhbGJsbnxzY2FsYmxuZnxzY2FsYmxubHxzaW58c2luaHxzaW5oZnxzaW5obHxzaW5mfHNpbmx8c2lnbmFsfHNpZ25iaXR8c3Ryc3RyfHN0cnNwbnxzdHJuY3B5fHN0cm5jYXR8c3RybmNtcHxzdHJjc3BufHN0cmNocnxzdHJjb2xsfHN0cmNweXxzdHJjYXR8c3RyY21wfHN0cnRvaW1heHxzdHJ0b2R8c3RydG91bHxzdHJ0b3VsbHxzdHJ0b3VtYXh8c3RydG9rfHN0cnRvZnxzdHJ0b2x8c3RydG9sZHxzdHJ0b2xsfHN0cmVycm9yfHN0cnBicmt8c3RyZnRpbWV8c3RybGVufHN0cnJjaHJ8c3RyeGZybXxzcHJpbnRmfHNldGptcHxzZXR2YnVmfHNldGxvY2FsZXxzZXRidWZ8c3FydHxzcXJ0ZnxzcXJ0bHxzd3NjYW5mfHN3cHJpbnRmfHNyYW5kfG5lYXJieWludHxuZWFyYnlpbnRmfG5lYXJieWludGx8bmV4dHRvd2FyZHxuZXh0dG93YXJkZnxuZXh0dG93YXJkbHxuZXh0YWZ0ZXJ8bmV4dGFmdGVyZnxuZXh0YWZ0ZXJsfG5hbnxuYW5mfG5hbmx8Y3Npbnxjc2luaHxjc2luaGZ8Y3NpbmhsfGNzaW5mfGNzaW5sfGNzcXJ0fGNzcXJ0Znxjc3FydGx8Y2Nvc3xjY29zaHxjY29zaGZ8Y2Nvc2Z8Y2Nvc2x8Y2ltYWd8Y2ltYWdmfGNpbWFnbHxjdGltZXxjdGFufGN0YW5ofGN0YW5oZnxjdGFuaGx8Y3RhbmZ8Y3Rhbmx8Y29zfGNvc2h8Y29zaGZ8Y29zaGx8Y29zZnxjb3NsfGNvbmp8Y29uamZ8Y29uamx8Y29weXNpZ258Y29weXNpZ25mfGNvcHlzaWdubHxjcG93fGNwb3dmfGNwb3dsfGNwcm9qfGNwcm9qZnxjcHJvamx8Y2VpbHxjZWlsZnxjZWlsbHxjZXhwfGNleHBmfGNleHBsfGNsb2NrfGNsb2d8Y2xvZ2Z8Y2xvZ2x8Y2xlYXJlcnJ8Y2FzaW58Y2FzaW5ofGNhc2luaGZ8Y2FzaW5obHxjYXNpbmZ8Y2FzaW5sfGNhY29zfGNhY29zaHxjYWNvc2hmfGNhY29zaGx8Y2Fjb3NmfGNhY29zbHxjYXRhbnxjYXRhbmh8Y2F0YW5oZnxjYXRhbmhsfGNhdGFuZnxjYXRhbmx8Y2FsbG9jfGNhcmd8Y2FyZ2Z8Y2FyZ2x8Y2Fic3xjYWJzZnxjYWJzbHxjcmVhbHxjcmVhbGZ8Y3JlYWxsfGNicnR8Y2JydGZ8Y2JydGx8dGltZXx0b3VwcGVyfHRvbG93ZXJ8dGFufHRhbmh8dGFuaGZ8dGFuaGx8dGFuZnx0YW5sfHRydW5jfHRydW5jZnx0cnVuY2x8dGdhbW1hfHRnYW1tYWZ8dGdhbW1hbHx0bXBuYW18dG1wZmlsZXxpc3NwYWNlfGlzbm9ybWFsfGlzbmFufGlzY250cmx8aXNpbmZ8aXNkaWdpdHxpc3Vub3JkZXJlZHxpc3VwcGVyfGlzcHVuY3R8aXNwcmludHxpc2Zpbml0ZXxpc3dzcGFjZXxpc3djbnRybHxpc3djdHlwZXxpc3dkaWdpdHxpc3d1cHBlcnxpc3dwdW5jdHxpc3dwcmludHxpc3dsb3dlcnxpc3dhbG51bXxpc3dhbHBoYXxpc3dncmFwaHxpc3d4ZGlnaXR8aXN3Ymxhbmt8aXNsb3dlcnxpc2xlc3N8aXNsZXNzZXF1YWx8aXNsZXNzZ3JlYXRlcnxpc2FsbnVtfGlzYWxwaGF8aXNncmVhdGVyfGlzZ3JlYXRlcmVxdWFsfGlzZ3JhcGh8aXN4ZGlnaXR8aXNibGFua3xpbG9nYnxpbG9nYmZ8aWxvZ2JsfGltYXhkaXZ8aW1heGFic3xkaXZ8ZGlmZnRpbWV8X0V4aXR8dW5nZXRjfHVuZ2V0d2N8cG93fHBvd2Z8cG93bHxwdXRzfHB1dGN8cHV0Y2hhcnxwdXR3Y3xwdXR3Y2hhcnxwZXJyb3J8cHJpbnRmfGVyZnxlcmZjfGVyZmNmfGVyZmNsfGVyZmZ8ZXJmbHxleGl0fGV4cHxleHAyfGV4cDJmfGV4cDJsfGV4cGZ8ZXhwbHxleHBtMXxleHBtMWZ8ZXhwbTFsfHZzc2NhbmZ8dnNucHJpbnRmfHZzY2FuZnx2c3ByaW50Znx2c3dzY2FuZnx2c3dwcmludGZ8dnByaW50Znx2ZnNjYW5mfHZmcHJpbnRmfHZmd3NjYW5mfHZmd3ByaW50Znx2d3NjYW5mfHZ3cHJpbnRmfHZhX3N0YXJ0fHZhX2NvcHl8dmFfZW5kfHZhX2FyZ3xxc29ydHxmc2NhbmZ8ZnNldHBvc3xmc2Vla3xmY2xvc2V8ZnRlbGx8Zm9wZW58ZmRpbXxmZGltZnxmZGltbHxmcGNsYXNzaWZ5fGZwdXRzfGZwdXRjfGZwdXR3c3xmcHV0d2N8ZnByaW50ZnxmZWhvbGRleGNlcHR8ZmVzZXRlbnZ8ZmVzZXRleGNlcHRmbGFnfGZlc2V0cm91bmR8ZmVjbGVhcmV4Y2VwdHxmZXRlc3RleGNlcHR8ZmVvZnxmZXVwZGF0ZWVudnxmZXJhaXNlZXhjZXB0fGZlcnJvcnxmZWdldGVudnxmZWdldGV4Y2VwdGZsYWd8ZmVnZXRyb3VuZHxmZmx1c2h8ZndzY2FuZnxmd2lkZXxmd3ByaW50Znxmd3JpdGV8Zmxvb3J8Zmxvb3JmfGZsb29ybHxmYWJzfGZhYnNmfGZhYnNsfGZnZXRzfGZnZXRjfGZnZXRwb3N8ZmdldHdzfGZnZXR3Y3xmcmVvcGVufGZyZWV8ZnJlYWR8ZnJleHB8ZnJleHBmfGZyZXhwbHxmbWlufGZtaW5mfGZtaW5sfGZtb2R8Zm1vZGZ8Zm1vZGx8Zm1hfGZtYWZ8Zm1hbHxmbWF4fGZtYXhmfGZtYXhsfGxkaXZ8bGRleHB8bGRleHBmfGxkZXhwbHxsb25nam1wfGxvY2FsdGltZXxsb2NhbGVjb252fGxvZ3xsb2cxcHxsb2cxcGZ8bG9nMXBsfGxvZzEwfGxvZzEwZnxsb2cxMGx8bG9nMnxsb2cyZnxsb2cybHxsb2dmfGxvZ2x8bG9nYnxsb2diZnxsb2dibHxsYWJzfGxsZGl2fGxsYWJzfGxscmludHxsbHJpbnRmfGxscmludGx8bGxyb3VuZHxsbHJvdW5kZnxsbHJvdW5kbHxscmludHxscmludGZ8bHJpbnRsfGxyb3VuZHxscm91bmRmfGxyb3VuZGx8bGdhbW1hfGxnYW1tYWZ8bGdhbW1hbHx3c2NhbmZ8d2Nzc3RyfHdjc3Nwbnx3Y3NuY3B5fHdjc25jYXR8d2NzbmNtcHx3Y3Njc3BufHdjc2Nocnx3Y3Njb2xsfHdjc2NweXx3Y3NjYXR8d2NzY21wfHdjc3RvaW1heHx3Y3N0b2R8d2NzdG91bHx3Y3N0b3VsbHx3Y3N0b3VtYXh8d2NzdG9rfHdjc3RvZnx3Y3N0b2x8d2NzdG9sZHx3Y3N0b2xsfHdjc3RvbWJzfHdjc3Bicmt8d2NzZnRpbWV8d2NzbGVufHdjc3JjaHJ8d2NzcnRvbWJzfHdjc3hmcm18d2N0b2J8d2N0b21ifHdjcnRvbWJ8d3ByaW50Znx3bWVtc2V0fHdtZW1jaHJ8d21lbWNweXx3bWVtY21wfHdtZW1tb3ZlfGFzc2VydHxhc2N0aW1lfGFzaW58YXNpbmh8YXNpbmhmfGFzaW5obHxhc2luZnxhc2lubHxhY29zfGFjb3NofGFjb3NoZnxhY29zaGx8YWNvc2Z8YWNvc2x8YXRvaXxhdG9mfGF0b2x8YXRvbGx8YXRleGl0fGF0YW58YXRhbmh8YXRhbmhmfGF0YW5obHxhdGFuMnxhdGFuMmZ8YXRhbjJsfGF0YW5mfGF0YW5sfGFic3xhYm9ydHxnZXRzfGdldGN8Z2V0Y2hhcnxnZXRlbnZ8Z2V0d2N8Z2V0d2NoYXJ8Z210aW1lfHJpbnR8cmludGZ8cmludGx8cm91bmR8cm91bmRmfHJvdW5kbHxyZW5hbWV8cmVhbGxvY3xyZXdpbmR8cmVtb3ZlfHJlbXF1b3xyZW1xdW9mfHJlbXF1b2x8cmVtYWluZGVyfHJlbWFpbmRlcmZ8cmVtYWluZGVybHxyYW5kfHJhaXNlfGJzZWFyY2h8YnRvd2N8bW9kZnxtb2RmZnxtb2RmbHxtZW1zZXR8bWVtY2hyfG1lbWNweXxtZW1jbXB8bWVtbW92ZXxta3RpbWV8bWFsbG9jfG1ic2luaXR8bWJzdG93Y3N8bWJzcnRvd2NzfG1idG93Y3xtYmxlbnxtYnJ0b3djfG1icmxlblwiO1xuXG52YXIgY19jcHBIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKGV4dHJhS2V5d29yZHMpIHtcblxuICAgIHZhciBrZXl3b3JkQ29udHJvbHMgPSAoXG4gICAgICAgIFwiYnJlYWt8Y2FzZXxjb250aW51ZXxkZWZhdWx0fGRvfGVsc2V8Zm9yfGdvdG98aWZ8X1ByYWdtYXxcIiArXG4gICAgICAgIFwicmV0dXJufHN3aXRjaHx3aGlsZXxjYXRjaHxvcGVyYXRvcnx0cnl8dGhyb3d8dXNpbmdcIlxuICAgICk7XG4gICAgXG4gICAgdmFyIHN0b3JhZ2VUeXBlID0gKFxuICAgICAgICBcImFzbXxfX2FzbV9ffGF1dG98Ym9vbHxfQm9vbHxjaGFyfF9Db21wbGV4fGRvdWJsZXxlbnVtfGZsb2F0fFwiICtcbiAgICAgICAgXCJfSW1hZ2luYXJ5fGludHxpbnQ4X3R8aW50MTZfdHxpbnQzMl90fGludDY0X3R8bG9uZ3xzaG9ydHxzaWduZWR8c2l6ZV90fHN0cnVjdHx0eXBlZGVmfHVpbnQ4X3R8dWludDE2X3R8dWludDMyX3R8dWludDY0X3R8dW5pb258dW5zaWduZWR8dm9pZHxcIiArXG4gICAgICAgIFwiY2xhc3N8d2NoYXJfdHx0ZW1wbGF0ZXxjaGFyMTZfdHxjaGFyMzJfdFwiXG4gICAgKTtcblxuICAgIHZhciBzdG9yYWdlTW9kaWZpZXJzID0gKFxuICAgICAgICBcImNvbnN0fGV4dGVybnxyZWdpc3RlcnxyZXN0cmljdHxzdGF0aWN8dm9sYXRpbGV8aW5saW5lfHByaXZhdGV8XCIgK1xuICAgICAgICBcInByb3RlY3RlZHxwdWJsaWN8ZnJpZW5kfGV4cGxpY2l0fHZpcnR1YWx8ZXhwb3J0fG11dGFibGV8dHlwZW5hbWV8XCIgK1xuICAgICAgICBcImNvbnN0ZXhwcnxuZXd8ZGVsZXRlfGFsaWduYXN8YWxpZ25vZnxkZWNsdHlwZXxub2V4Y2VwdHx0aHJlYWRfbG9jYWxcIlxuICAgICk7XG5cbiAgICB2YXIga2V5d29yZE9wZXJhdG9ycyA9IChcbiAgICAgICAgXCJhbmR8YW5kX2VxfGJpdGFuZHxiaXRvcnxjb21wbHxub3R8bm90X2VxfG9yfG9yX2VxfHR5cGVpZHx4b3J8eG9yX2VxfFwiICtcbiAgICAgICAgXCJjb25zdF9jYXN0fGR5bmFtaWNfY2FzdHxyZWludGVycHJldF9jYXN0fHN0YXRpY19jYXN0fHNpemVvZnxuYW1lc3BhY2VcIlxuICAgICk7XG5cbiAgICB2YXIgYnVpbHRpbkNvbnN0YW50cyA9IChcbiAgICAgICAgXCJOVUxMfHRydWV8ZmFsc2V8VFJVRXxGQUxTRXxudWxscHRyXCJcbiAgICApO1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLiRrZXl3b3JkcyA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcihPYmplY3QuYXNzaWduKHtcbiAgICAgICAgXCJrZXl3b3JkLmNvbnRyb2xcIiA6IGtleXdvcmRDb250cm9scyxcbiAgICAgICAgXCJzdG9yYWdlLnR5cGVcIiA6IHN0b3JhZ2VUeXBlLFxuICAgICAgICBcInN0b3JhZ2UubW9kaWZpZXJcIiA6IHN0b3JhZ2VNb2RpZmllcnMsXG4gICAgICAgIFwia2V5d29yZC5vcGVyYXRvclwiIDoga2V5d29yZE9wZXJhdG9ycyxcbiAgICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZVwiOiBcInRoaXNcIixcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBidWlsdGluQ29uc3RhbnRzLFxuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb24uQzk5LmNcIjogY0Z1bmN0aW9uc1xuICAgIH0sIGV4dHJhS2V5d29yZHMpLCBcImlkZW50aWZpZXJcIik7XG5cbiAgICB2YXIgaWRlbnRpZmllclJlID0gXCJbYS16QS1aXFxcXCRfXFx1MDBhMS1cXHVmZmZmXVthLXpBLVpcXFxcZFxcXFwkX1xcdTAwYTEtXFx1ZmZmZl0qXFxcXGJcIjtcbiAgICB2YXIgZXNjYXBlUmUgPSAvXFxcXCg/OlsnXCI/XFxcXGFiZm5ydHZdfFswLTddezEsM318eFthLWZBLUZcXGRdezJ9fHVbYS1mQS1GXFxkXXs0fVVbYS1mQS1GXFxkXXs4fXwuKS8uc291cmNlO1xuICAgIHZhciBmb3JtYXRSZSA9IFwiJVwiXG4gICAgICAgICAgKyAvKFxcZCtcXCQpPy8uc291cmNlIC8vIGZpZWxkIChhcmd1bWVudCAjKVxuICAgICAgICAgICsgL1sjMFxcLSArJ10qLy5zb3VyY2UgLy8gZmxhZ3NcbiAgICAgICAgICArIC9bLDs6X10/Ly5zb3VyY2UgLy8gc2VwYXJhdG9yIGNoYXJhY3RlciAoQWx0aVZlYylcbiAgICAgICAgICArIC8oKC0/XFxkKyl8XFwqKC0/XFxkK1xcJCk/KT8vLnNvdXJjZSAvLyBtaW5pbXVtIGZpZWxkIHdpZHRoXG4gICAgICAgICAgKyAvKFxcLigoLT9cXGQrKXxcXCooLT9cXGQrXFwkKT8pPyk/Ly5zb3VyY2UgLy8gcHJlY2lzaW9uXG4gICAgICAgICAgKyAvKGhofGh8bGx8bHxqfHR8enxxfEx8dmh8dmx8dnxodnxobCk/Ly5zb3VyY2UgLy8gbGVuZ3RoIG1vZGlmaWVyXG4gICAgICAgICAgKyAvKFxcW1teXCJcXF1dK1xcXXxbZGlvdXhYRE9VZUVmRmdHYUFDY1NzcG4lXSkvLnNvdXJjZTsgLy8gY29udmVyc2lvbiB0eXBlXG4gICAgICAgICAgXG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0geyBcbiAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIi8vJFwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIvL1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInNpbmdsZUxpbmVDb21tZW50XCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlKFwiZG9jLXN0YXJ0XCIpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIG11bHRpIGxpbmUgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwqXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwiY29tbWVudFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBjaGFyYWN0ZXJcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiJyg/OlwiICsgZXNjYXBlUmUgKyBcInwuKT8nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXCInLCBcbiAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwicXFzdHJpbmdcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdG9rZW46IFwic3RyaW5nXCIsIHJlZ2V4OiAvXFxcXFxccyokLywgbmV4dDogXCJxcXN0cmluZ1wiIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsIHJlZ2V4OiBlc2NhcGVSZSB9LFxuICAgICAgICAgICAgICAgICAgICB7IHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCByZWdleDogZm9ybWF0UmUgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0b2tlbjogXCJzdHJpbmcuZW5kXCIsIHJlZ2V4OiAnXCJ8JCcsIG5leHQ6IFwic3RhcnRcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5zdGFydFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1JcIlxcXFwoJywgXG4gICAgICAgICAgICAgICAgc3RhdGVOYW1lOiBcInJhd1N0cmluZ1wiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB0b2tlbjogXCJzdHJpbmcuZW5kXCIsIHJlZ2V4OiAnXFxcXClcIicsIG5leHQ6IFwic3RhcnRcIiB9LFxuICAgICAgICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIn1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4XG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIjBbeFhdWzAtOWEtZkEtRl0rKEx8bHxVTHx1bHx1fFV8RnxmfGxsfExMfHVsbHxVTEwpP1xcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBmbG9hdFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbKy1dP1xcXFxkKyg/Oig/OlxcXFwuXFxcXGQqKT8oPzpbZUVdWystXT9cXFxcZCspPyk/KEx8bHxVTHx1bHx1fFV8RnxmfGxsfExMfHVsbHxVTEwpP1xcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLCAvLyBwcmUtY29tcGlsZXIgZGlyZWN0aXZlc1xuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIjXFxcXHMqKD86aW5jbHVkZXxpbXBvcnR8cHJhZ21hfGxpbmV8ZGVmaW5lfHVuZGVmKVxcXFxiXCIsXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcImRpcmVjdGl2ZVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmRcIiwgLy8gc3BlY2lhbCBjYXNlIHByZS1jb21waWxlciBkaXJlY3RpdmVcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiI1xcXFxzKig/OmVuZGlmfGlmfGlmZGVmfGVsc2V8ZWxpZnxpZm5kZWYpXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLy0tfFxcK1xcK3w8PD18Pj49fD4+Pj18PD58JiZ8XFx8XFx8fFxcPzp8WyolXFwvK1xcLSZcXF58fiE8Pj1dPT8vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXD98XFxcXDp8XFxcXCx8XFxcXDt8XFxcXC5cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1soe11cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdKX1dXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImNvbW1lbnRcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInNpbmdsZUxpbmVDb21tZW50XCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9cXFxcJC8sXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic2luZ2xlTGluZUNvbW1lbnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvJC8sXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJkaXJlY3RpdmVcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQub3RoZXIubXVsdGlsaW5lXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFxcXC9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm90aGVyLm11bHRpbGluZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLy4qXFxcXC9cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm90aGVyXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzKjwuKz8+XCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQub3RoZXJcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICAgICAgICAgICAgICByZWdleCA6ICdcXFxccypbXCJdKD86KD86XFxcXFxcXFwuKXwoPzpbXlwiXFxcXFxcXFxdKSkqP1tcIl0nLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5vdGhlclwiLCAvLyBzaW5nbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccypbJ10oPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj9bJ11cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgLy8gXCJcXFwiIGltcGxpZXMgbXVsdGlsaW5lLCB3aGlsZSBcIi9cIiBpbXBsaWVzIGNvbW1lbnRcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQub3RoZXJcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bXlxcXFxcXC9dKy8sXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIHRoaXMuZW1iZWRSdWxlcyhEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMsIFwiZG9jLVwiLFxuICAgICAgICBbIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlKFwic3RhcnRcIikgXSk7XG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKGNfY3BwSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuY19jcHBIaWdobGlnaHRSdWxlcyA9IGNfY3BwSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5kb2MudGFnXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiQFxcXFx3Kyg/PVxcXFxzfCQpXCJcbiAgICAgICAgICAgIH0sIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRUYWdSdWxlKCksIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudC5kb2MuYm9keVwiLFxuICAgICAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbn07XG5cbm9vcC5pbmhlcml0cyhEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRUYWdSdWxlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2MudGFnLnN0b3JhZ2UudHlwZVwiLFxuICAgICAgICByZWdleCA6IFwiXFxcXGIoPzpUT0RPfEZJWE1FfFhYWHxIQUNLKVxcXFxiXCJcbiAgICB9O1xufTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFN0YXJ0UnVsZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jXCIsIC8vIGRvYyBjb21tZW50XG4gICAgICAgIHJlZ2V4OiAvXFwvXFwqXFwqKD8hXFwvKS8sXG4gICAgICAgIG5leHQgIDogc3RhcnRcbiAgICB9O1xufTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldEVuZFJ1bGUgPSBmdW5jdGlvbiAoc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgIG5leHQgIDogc3RhcnRcbiAgICB9O1xufTtcblxuXG5leHBvcnRzLkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBDTW9kZSA9IHJlcXVpcmUoXCIuL2NfY3BwXCIpLk1vZGU7XG52YXIgZ2xzbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZ2xzbF9oaWdobGlnaHRfcnVsZXNcIikuZ2xzbEhpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBDU3R5bGVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBnbHNsSGlnaGxpZ2h0UnVsZXM7XG4gICAgXG4gICAgdGhpcy4kb3V0ZGVudCA9IG5ldyBNYXRjaGluZ0JyYWNlT3V0ZGVudCgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgQ1N0eWxlRm9sZE1vZGUoKTtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgQ01vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2dsc2xcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBjX2NwcEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vY19jcHBfaGlnaGxpZ2h0X3J1bGVzXCIpLmNfY3BwSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBnbHNsSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBrZXl3b3JkcyA9IChcbiAgICAgICAgXCJhdHRyaWJ1dGV8Y29uc3R8dW5pZm9ybXx2YXJ5aW5nfGJyZWFrfGNvbnRpbnVlfGRvfGZvcnx3aGlsZXxcIiArXG4gICAgICAgIFwiaWZ8ZWxzZXxpbnxvdXR8aW5vdXR8ZmxvYXR8aW50fHZvaWR8Ym9vbHx0cnVlfGZhbHNlfFwiICtcbiAgICAgICAgXCJsb3dwfG1lZGl1bXB8aGlnaHB8cHJlY2lzaW9ufGludmFyaWFudHxkaXNjYXJkfHJldHVybnxtYXQyfG1hdDN8XCIgK1xuICAgICAgICBcIm1hdDR8dmVjMnx2ZWMzfHZlYzR8aXZlYzJ8aXZlYzN8aXZlYzR8YnZlYzJ8YnZlYzN8YnZlYzR8c2FtcGxlcjJEfFwiICtcbiAgICAgICAgXCJzYW1wbGVyQ3ViZXxzdHJ1Y3RcIlxuICAgICk7XG5cbiAgICB2YXIgYnVpbGRpbkNvbnN0YW50cyA9IChcbiAgICAgICAgXCJyYWRpYW5zfGRlZ3JlZXN8c2lufGNvc3x0YW58YXNpbnxhY29zfGF0YW58cG93fFwiICtcbiAgICAgICAgXCJleHB8bG9nfGV4cDJ8bG9nMnxzcXJ0fGludmVyc2VzcXJ0fGFic3xzaWdufGZsb29yfGNlaWx8ZnJhY3R8bW9kfFwiICtcbiAgICAgICAgXCJtaW58bWF4fGNsYW1wfG1peHxzdGVwfHNtb290aHN0ZXB8bGVuZ3RofGRpc3RhbmNlfGRvdHxjcm9zc3xcIiArXG4gICAgICAgIFwibm9ybWFsaXplfGZhY2Vmb3J3YXJkfHJlZmxlY3R8cmVmcmFjdHxtYXRyaXhDb21wTXVsdHxsZXNzVGhhbnxcIiArXG4gICAgICAgIFwibGVzc1RoYW5FcXVhbHxncmVhdGVyVGhhbnxncmVhdGVyVGhhbkVxdWFsfGVxdWFsfG5vdEVxdWFsfGFueXxhbGx8XCIgK1xuICAgICAgICBcIm5vdHxkRmR4fGRGZHl8ZndpZHRofHRleHR1cmUyRHx0ZXh0dXJlMkRQcm9qfHRleHR1cmUyRExvZHxcIiArXG4gICAgICAgIFwidGV4dHVyZTJEUHJvakxvZHx0ZXh0dXJlQ3ViZXx0ZXh0dXJlQ3ViZUxvZHxcIiArXG4gICAgICAgIFwiZ2xfTWF4VmVydGV4QXR0cmlic3xnbF9NYXhWZXJ0ZXhVbmlmb3JtVmVjdG9yc3xnbF9NYXhWYXJ5aW5nVmVjdG9yc3xcIiArXG4gICAgICAgIFwiZ2xfTWF4VmVydGV4VGV4dHVyZUltYWdlVW5pdHN8Z2xfTWF4Q29tYmluZWRUZXh0dXJlSW1hZ2VVbml0c3xcIiArXG4gICAgICAgIFwiZ2xfTWF4VGV4dHVyZUltYWdlVW5pdHN8Z2xfTWF4RnJhZ21lbnRVbmlmb3JtVmVjdG9yc3xnbF9NYXhEcmF3QnVmZmVyc3xcIiArXG4gICAgICAgIFwiZ2xfRGVwdGhSYW5nZVBhcmFtZXRlcnN8Z2xfRGVwdGhSYW5nZXxcIiArXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgdHdvIGFyZSBvbmx5IGZvciBNSU1FIHgtc2hhZGVyL3gtdmVydGV4LlxuICAgICAgICBcImdsX1Bvc2l0aW9ufGdsX1BvaW50U2l6ZXxcIiArXG4gICAgICAgIC8vIFRoZSBmb2xsb3dpbmcgZml2ZSBhcmUgb25seSBmb3IgTUlNRSB4LXNoYWRlci94LWZyYWdtZW50LlxuICAgICAgICBcImdsX0ZyYWdDb29yZHxnbF9Gcm9udEZhY2luZ3xnbF9Qb2ludENvb3JkfGdsX0ZyYWdDb2xvcnxnbF9GcmFnRGF0YVwiXG4gICAgKTtcblxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZVwiOiBcInRoaXNcIixcbiAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRzLFxuICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IGJ1aWxkaW5Db25zdGFudHNcbiAgICB9LCBcImlkZW50aWZpZXJcIik7XG5cbiAgICB0aGlzLiRydWxlcyA9IG5ldyBjX2NwcEhpZ2hsaWdodFJ1bGVzKCkuJHJ1bGVzO1xuICAgIHRoaXMuJHJ1bGVzLnN0YXJ0LmZvckVhY2goZnVuY3Rpb24ocnVsZSkge1xuICAgICAgICBpZiAodHlwZW9mIHJ1bGUudG9rZW4gPT0gXCJmdW5jdGlvblwiKVxuICAgICAgICAgICAgcnVsZS50b2tlbiA9IGtleXdvcmRNYXBwZXI7XG4gICAgfSk7XG59O1xuXG5vb3AuaW5oZXJpdHMoZ2xzbEhpZ2hsaWdodFJ1bGVzLCBjX2NwcEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5nbHNsSGlnaGxpZ2h0UnVsZXMgPSBnbHNsSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBmdW5jdGlvbigpIHt9O1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKGxpbmUsIGlucHV0KSB7XG4gICAgICAgIGlmICghIC9eXFxzKyQvLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIC9eXFxzKlxcfS8udGVzdChpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihkb2MsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IGRvYy5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14oXFxzKlxcfSkvKTtcblxuICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgY29sdW1uID0gbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgb3BlbkJyYWNlUG9zID0gZG9jLmZpbmRNYXRjaGluZ0JyYWNrZXQoe3Jvdzogcm93LCBjb2x1bW46IGNvbHVtbn0pO1xuXG4gICAgICAgIGlmICghb3BlbkJyYWNlUG9zIHx8IG9wZW5CcmFjZVBvcy5yb3cgPT0gcm93KSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGRvYy5nZXRMaW5lKG9wZW5CcmFjZVBvcy5yb3cpKTtcbiAgICAgICAgZG9jLnJlcGxhY2UobmV3IFJhbmdlKHJvdywgMCwgcm93LCBjb2x1bW4tMSksIGluZGVudCk7XG4gICAgfTtcblxuICAgIHRoaXMuJGdldEluZGVudCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIGxpbmUubWF0Y2goL15cXHMqLylbMF07XG4gICAgfTtcblxufSkuY2FsbChNYXRjaGluZ0JyYWNlT3V0ZGVudC5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1hdGNoaW5nQnJhY2VPdXRkZW50ID0gTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=