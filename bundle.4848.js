"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4848],{

/***/ 54848:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

// exports is for Haml
var constantOtherSymbol = exports.constantOtherSymbol = {
    token : "constant.other.symbol.ruby", // symbol
    regex : "[:](?:[A-Za-z_]|[@$](?=[a-zA-Z0-9_]))[a-zA-Z0-9_]*[!=?]?"
};

exports.qString = {
    token : "string", // single line
    regex : "['](?:(?:\\\\.)|(?:[^'\\\\]))*?[']"
};

exports.qqString = {
    token : "string", // single line
    regex : '["](?:(?:\\\\.)|(?:[^"\\\\]))*?["]'
};

exports.tString = {
    token : "string", // backtick string
    regex : "[`](?:(?:\\\\.)|(?:[^'\\\\]))*?[`]"
};

var constantNumericHex = exports.constantNumericHex = {
    token : "constant.numeric", // hex
    regex : "0[xX][0-9a-fA-F](?:[0-9a-fA-F]|_(?=[0-9a-fA-F]))*\\b"
};

var constantNumericBinary = exports.constantNumericBinary = {
    token: "constant.numeric",
    regex: /\b(0[bB][01](?:[01]|_(?=[01]))*)\b/
};

var constantNumericDecimal = exports.constantNumericDecimal = {
    token: "constant.numeric",
    regex: /\b(0[dD](?:[1-9](?:[\d]|_(?=[\d]))*|0))\b/
};

var constantNumericOctal = exports.constantNumericOctal = {
    token: "constant.numeric",
    regex: /\b(0[oO]?(?:[1-7](?:[0-7]|_(?=[0-7]))*|0))\b/
};

var constantNumericRational = exports.constantNumericRational = {
    token: "constant.numeric", //rational + complex
    regex: /\b([\d]+(?:[./][\d]+)?ri?)\b/
};

var constantNumericComplex = exports.constantNumericComplex = {
    token: "constant.numeric", //simple complex numbers
    regex: /\b([\d]i)\b/
};

var constantNumericFloat = exports.constantNumericFloat = {
    token : "constant.numeric", // float + complex
    regex : "[+-]?\\d(?:\\d|_(?=\\d))*(?:(?:\\.\\d(?:\\d|_(?=\\d))*)?(?:[eE][+-]?\\d+)?)?i?\\b"
};

var instanceVariable = exports.instanceVariable = {
    token : "variable.instance", // instance variable
    regex : "@{1,2}[a-zA-Z_\\d]+"
};

var RubyHighlightRules = function() {

    var builtinFunctions = (
        "abort|Array|assert|assert_equal|assert_not_equal|assert_same|assert_not_same|" +
        "assert_nil|assert_not_nil|assert_match|assert_no_match|assert_in_delta|assert_throws|" +
        "assert_raise|assert_nothing_raised|assert_instance_of|assert_kind_of|assert_respond_to|" +
        "assert_operator|assert_send|assert_difference|assert_no_difference|assert_recognizes|" +
        "assert_generates|assert_response|assert_redirected_to|assert_template|assert_select|" +
        "assert_select_email|assert_select_rjs|assert_select_encoded|css_select|at_exit|" +
        "attr|attr_writer|attr_reader|attr_accessor|attr_accessible|autoload|binding|block_given?|callcc|" +
        "caller|catch|chomp|chomp!|chop|chop!|defined?|delete_via_redirect|eval|exec|exit|" +
        "exit!|fail|Float|flunk|follow_redirect!|fork|form_for|form_tag|format|gets|global_variables|gsub|" +
        "gsub!|get_via_redirect|host!|https?|https!|include|Integer|lambda|link_to|" +
        "link_to_unless_current|link_to_function|link_to_remote|load|local_variables|loop|open|open_session|" +
        "p|print|printf|proc|putc|puts|post_via_redirect|put_via_redirect|raise|rand|" +
        "raw|readline|readlines|redirect?|request_via_redirect|require|scan|select|" +
        "set_trace_func|sleep|split|sprintf|srand|String|stylesheet_link_tag|syscall|system|sub|sub!|test|" +
        "throw|trace_var|trap|untrace_var|atan2|cos|exp|frexp|ldexp|log|log10|sin|sqrt|tan|" +
        "render|javascript_include_tag|csrf_meta_tag|label_tag|text_field_tag|submit_tag|check_box_tag|" +
        "content_tag|radio_button_tag|text_area_tag|password_field_tag|hidden_field_tag|" +
        "fields_for|select_tag|options_for_select|options_from_collection_for_select|collection_select|" +
        "time_zone_select|select_date|select_time|select_datetime|date_select|time_select|datetime_select|" +
        "select_year|select_month|select_day|select_hour|select_minute|select_second|file_field_tag|" +
        "file_field|respond_to|skip_before_filter|around_filter|after_filter|verify|" +
        "protect_from_forgery|rescue_from|helper_method|redirect_to|before_filter|" +
        "send_data|send_file|validates_presence_of|validates_uniqueness_of|validates_length_of|" +
        "validates_format_of|validates_acceptance_of|validates_associated|validates_exclusion_of|" +
        "validates_inclusion_of|validates_numericality_of|validates_with|validates_each|" +
        "authenticate_or_request_with_http_basic|authenticate_or_request_with_http_digest|" +
        "filter_parameter_logging|match|get|post|resources|redirect|scope|assert_routing|" +
        "translate|localize|extract_locale_from_tld|caches_page|expire_page|caches_action|expire_action|" +
        "cache|expire_fragment|expire_cache_for|observe|cache_sweeper|" +
        "has_many|has_one|belongs_to|has_and_belongs_to_many|p|warn|refine|using|module_function|extend|alias_method|" +
        "private_class_method|remove_method|undef_method"
    );

    var keywords = (
        "alias|and|BEGIN|begin|break|case|class|def|defined|do|else|elsif|END|end|ensure|" +
        "__FILE__|finally|for|gem|if|in|__LINE__|module|next|not|or|private|protected|public|" +
        "redo|rescue|retry|return|super|then|undef|unless|until|when|while|yield|__ENCODING__|prepend"
    );

    var buildinConstants = (
        "true|TRUE|false|FALSE|nil|NIL|ARGF|ARGV|DATA|ENV|RUBY_PLATFORM|RUBY_RELEASE_DATE|" +
        "RUBY_VERSION|STDERR|STDIN|STDOUT|TOPLEVEL_BINDING|RUBY_PATCHLEVEL|RUBY_REVISION|RUBY_COPYRIGHT|RUBY_ENGINE|RUBY_ENGINE_VERSION|RUBY_DESCRIPTION"
    );

    var builtinVariables = (
        "$DEBUG|$defout|$FILENAME|$LOAD_PATH|$SAFE|$stdin|$stdout|$stderr|$VERBOSE|" +
        "$!|root_url|flash|session|cookies|params|request|response|logger|self"
    );

    var keywordMapper = this.$keywords = this.createKeywordMapper({
        "keyword": keywords,
        "constant.language": buildinConstants,
        "variable.language": builtinVariables,
        "support.function": builtinFunctions,
        "invalid.deprecated": "debugger" // TODO is this a remnant from js mode?
    }, "identifier");

    var escapedChars = "\\\\(?:n(?:[1-7][0-7]{0,2}|0)|[nsrtvfbae'\"\\\\]|c(?:\\\\M-)?.|M-(?:\\\\C-|\\\\c)?.|C-(?:\\\\M-)?.|[0-7]{3}|x[\\da-fA-F]{2}|u[\\da-fA-F]{4}|u{[\\da-fA-F]{1,6}(?:\\s[\\da-fA-F]{1,6})*})";

    var closeParen = {
        "(": ")",
        "[": "]",
        "{": "}",
        "<": ">",
        "^": "^",
        "|": "|",
        "%": "%"
    };
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = {
        "start": [
            {
                token: "comment",
                regex: "#.*$"
            }, {
                token: "comment.multiline", // multi line comment
                regex: "^=begin(?=$|\\s.*$)",
                next: "comment"
            }, {
                token: "string.regexp",
                regex: /[/](?=.*\/)/,
                next: "regex"
            },

            [{
                token: ["constant.other.symbol.ruby", "string.start"],
                regex: /(:)?(")/,
                push: [{
                    token: "constant.language.escape",
                    regex: escapedChars
                }, {
                    token: "paren.start",
                    regex: /#{/,
                    push: "start"
                }, {
                    token: "string.end",
                    regex: /"/,
                    next: "pop"
                }, {
                    defaultToken: "string"
                }]
            }, {
                token: "string.start",
                regex: /`/,
                push: [{
                    token: "constant.language.escape",
                    regex: escapedChars
                }, {
                    token: "paren.start",
                    regex: /#{/,
                    push: "start"
                }, {
                    token: "string.end",
                    regex: /`/,
                    next: "pop"
                }, {
                    defaultToken: "string"
                }]
            }, {
                token: ["constant.other.symbol.ruby", "string.start"],
                regex: /(:)?(')/,
                push: [{
                    token: "constant.language.escape",
                    regex: /\\['\\]/
                }, {
                    token: "string.end",
                    regex: /'/,
                    next: "pop"
                }, {
                    defaultToken: "string"
                }]
            }, {
                token: "string.start",//doesn't see any differences between strings and array of strings in highlighting
                regex: /%[qwx]([(\[<{^|%])/, onMatch: function (val, state, stack) {
                    if (stack.length)
                        stack = [];
                    var paren = val[val.length - 1];
                    stack.unshift(paren, state);
                    this.next = "qStateWithoutInterpolation";
                    return this.token;
                }
            }, {
                token: "string.start", //doesn't see any differences between strings and array of strings in highlighting
                regex: /%[QWX]?([(\[<{^|%])/, onMatch: function (val, state, stack) {
                    if (stack.length)
                        stack = [];
                    var paren = val[val.length - 1];
                    stack.unshift(paren, state);
                    this.next = "qStateWithInterpolation";
                    return this.token;
                }
            }, {
                token: "constant.other.symbol.ruby", //doesn't see any differences between symbols and array of symbols in highlighting
                regex: /%[si]([(\[<{^|%])/, onMatch: function (val, state, stack) {
                    if (stack.length)
                        stack = [];
                    var paren = val[val.length - 1];
                    stack.unshift(paren, state);
                    this.next = "sStateWithoutInterpolation";
                    return this.token;
                }
            }, {
                token: "constant.other.symbol.ruby", //doesn't see any differences between symbols and array of symbols in highlighting
                regex: /%[SI]([(\[<{^|%])/, onMatch: function (val, state, stack) {
                    if (stack.length)
                        stack = [];
                    var paren = val[val.length - 1];
                    stack.unshift(paren, state);
                    this.next = "sStateWithInterpolation";
                    return this.token;
                }
            }, {
                token: "string.regexp",
                regex: /%[r]([(\[<{^|%])/, onMatch: function (val, state, stack) {
                    if (stack.length)
                        stack = [];
                    var paren = val[val.length - 1];
                    stack.unshift(paren, state);
                    this.next = "rState";
                    return this.token;
                }
            }],

            {
                token: "punctuation", // namespaces aren't symbols
                regex: "::"
            },
            instanceVariable,
            {
                token: "variable.global", // global variable
                regex: "[$][a-zA-Z_\\d]+"
            }, {
                token: "support.class", // class name
                regex: "[A-Z][a-zA-Z_\\d]*"
            }, {
                token: ["punctuation.operator", "support.function"],
                regex: /(\.)([a-zA-Z_\d]+)(?=\()/
            }, {
                token: ["punctuation.operator", "identifier"],
                regex: /(\.)([a-zA-Z_][a-zA-Z_\d]*)/
            }, {
                token: "string.character",
                regex: "\\B\\?(?:" + escapedChars + "|\\S)"
            }, {
                token: "punctuation.operator",
                regex: /\?(?=.+:)/
            },

            constantNumericRational,
            constantNumericComplex,
            constantOtherSymbol,
            constantNumericHex,
            constantNumericFloat,
            constantNumericBinary,
            constantNumericDecimal,
            constantNumericOctal,
            {
                token: "constant.language.boolean",
                regex: "(?:true|false)\\b"
            }, {
                token: keywordMapper,
                regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            }, {
                token: "punctuation.separator.key-value",
                regex: "=>"
            }, {
                stateName: "heredoc",
                onMatch: function (value, currentState, stack) {
                    var next = (value[2] == '-' || value[2] == '~') ? "indentedHeredoc" : "heredoc";
                    var tokens = value.split(this.splitRegex);
                    stack.push(next, tokens[3]);
                    return [
                        {type: "constant", value: tokens[1]},
                        {type: "string", value: tokens[2]},
                        {type: "support.class", value: tokens[3]},
                        {type: "string", value: tokens[4]}
                    ];
                },
                regex: "(<<[-~]?)(['\"`]?)([\\w]+)(['\"`]?)",
                rules: {
                    heredoc: [{
                        onMatch: function(value, currentState, stack) {
                            if (value === stack[1]) {
                                stack.shift();
                                stack.shift();
                                this.next = stack[0] || "start";
                                return "support.class";
                            }
                            this.next = "";
                            return "string";
                        },
                        regex: ".*$",
                        next: "start"
                    }],
                    indentedHeredoc: [{
                        token: "string",
                        regex: "^ +"
                    }, {
                        onMatch: function(value, currentState, stack) {
                            if (value === stack[1]) {
                                stack.shift();
                                stack.shift();
                                this.next = stack[0] || "start";
                                return "support.class";
                            }
                            this.next = "";
                            return "string";
                        },
                        regex: ".*$",
                        next: "start"
                    }]
                }
            }, {
                regex: "$",
                token: "empty",
                next: function(currentState, stack) {
                    if (stack[0] === "heredoc" || stack[0] === "indentedHeredoc")
                        return stack[0];
                    return currentState;
                }
            },  {
                token: "keyword.operator",
                regex: "!|\\$|%|&|\\*|/|\\-\\-|\\-|\\+\\+|\\+|~|===|==|=|!=|!==|<=|>=|<<=|>>=|>>>=|<>|<|>|!|&&|\\|\\||\\?\\:|\\*=|%=|\\+=|\\-=|&=|\\^=|\\||\\b(?:in|instanceof|new|delete|typeof|void)"
            }, {
                token: "paren.lparen",
                regex: "[[({]"
            }, {
                token: "paren.rparen",
                regex: "[\\])}]",
                onMatch: function(value, currentState, stack) {
                    this.next = '';
                    if (value == "}" && stack.length > 1 && stack[1] != "start") {
                        stack.shift();
                        this.next = stack.shift();
                    }
                    return this.token;
                }
            }, {
                token: "text",
                regex: "\\s+"
            }, {
                token: "punctuation.operator",
                regex: /[?:,;.]/
            }
        ],
        "comment": [
            {
                token: "comment.multiline", // closing comment
                regex: "^=end(?=$|\\s.*$)",
                next: "start"
            }, {
                token: "comment", // comment spanning whole line
                regex: ".+"
            }
        ],
        "qStateWithInterpolation": [{
            token: "string.start",// excluded nested |^% due to difficulty in realization
            regex: /[(\[<{]/, onMatch: function (val, state, stack) {
                if (stack.length && val === stack[0]) {
                    stack.unshift(val, state);
                    return this.token;
                }
                return "string";
            }
        }, {
            token: "constant.language.escape",
            regex: escapedChars
        }, {
            token: "constant.language.escape",
            regex: /\\./
        }, {
            token: "paren.start",
            regex: /#{/,
            push: "start"
        }, {
            token: "string.end",
            regex: /[)\]>}^|%]/, onMatch: function (val, state, stack) {
                if (stack.length && val === closeParen[stack[0]]) {
                    stack.shift();
                    this.next = stack.shift();
                    return this.token;
                }
                this.next = '';
                return "string";
            }
        }, {
            defaultToken: "string"
        }],
        "qStateWithoutInterpolation": [{
            token: "string.start",// excluded nested |^% due to difficulty in realization
            regex: /[(\[<{]/, onMatch: function (val, state, stack) {
                if (stack.length && val === stack[0]) {
                    stack.unshift(val, state);
                    return this.token;
                }
                return "string";
            }
        }, {
            token: "constant.language.escape",
            regex: /\\['\\]/
        }, {
            token: "constant.language.escape",
            regex: /\\./
        }, {
            token: "string.end",
            regex: /[)\]>}^|%]/, onMatch: function (val, state, stack) {
                if (stack.length && val === closeParen[stack[0]]) {
                    stack.shift();
                    this.next = stack.shift();
                    return this.token;
                }
                this.next = '';
                return "string";
            }
        }, {
            defaultToken: "string"
        }],
        "sStateWithoutInterpolation": [{
            token: "constant.other.symbol.ruby",// excluded nested |^% due to difficulty in realization
            regex: /[(\[<{]/, onMatch: function (val, state, stack) {
                if (stack.length && val === stack[0]) {
                    stack.unshift(val, state);
                    return this.token;
                }
                return "constant.other.symbol.ruby";
            }
        }, {
            token: "constant.other.symbol.ruby",
            regex: /[)\]>}^|%]/, onMatch: function (val, state, stack) {
                if (stack.length && val === closeParen[stack[0]]) {
                    stack.shift();
                    this.next = stack.shift();
                    return this.token;
                }
                this.next = '';
                return "constant.other.symbol.ruby";
            }
        }, {
            defaultToken: "constant.other.symbol.ruby"
        }],
        "sStateWithInterpolation": [{
            token: "constant.other.symbol.ruby",// excluded nested |^% due to difficulty in realization
            regex: /[(\[<{]/, onMatch: function (val, state, stack) {
                if (stack.length && val === stack[0]) {
                    stack.unshift(val, state);
                    return this.token;
                }
                return "constant.other.symbol.ruby";
            }
        }, {
            token: "constant.language.escape",
            regex: escapedChars
        }, {
            token: "constant.language.escape",
            regex: /\\./
        }, {
            token: "paren.start",
            regex: /#{/,
            push: "start"
        }, {
            token: "constant.other.symbol.ruby",
            regex: /[)\]>}^|%]/, onMatch: function (val, state, stack) {
                if (stack.length && val === closeParen[stack[0]]) {
                    stack.shift();
                    this.next = stack.shift();
                    return this.token;
                }
                this.next = '';
                return "constant.other.symbol.ruby";
            }
        }, {
            defaultToken: "constant.other.symbol.ruby"
        }],
        "rState": [{
            token: "string.regexp",// excluded nested |^% due to difficulty in realization
            regex: /[(\[<{]/, onMatch: function (val, state, stack) {
                if (stack.length && val === stack[0]) {
                    stack.unshift(val, state);
                    return this.token;
                }
                return "constant.language.escape";
            }
        }, {
            token: "paren.start",
            regex: /#{/,
            push: "start"
        }, {
            token: "string.regexp",
            regex: /\//
        }, {
            token: "string.regexp",
            regex: /[)\]>}^|%][imxouesn]*/, onMatch: function (val, state, stack) {
                if (stack.length && val[0] === closeParen[stack[0]]) {
                    stack.shift();
                    this.next = stack.shift();
                    return this.token;
                }
                this.next = '';
                return "constant.language.escape";
            }
        },
            {include: "regex"},
            {
                defaultToken: "string.regexp"
            }],
        "regex": [
            {// character classes
                token: "regexp.keyword",
                regex: /\\[wWdDhHsS]/
            }, {
                token: "constant.language.escape",
                regex: /\\[AGbBzZ]/
            }, {
                token: "constant.language.escape",
                regex: /\\g<[a-zA-Z0-9]*>/
            }, {
                token: ["constant.language.escape", "regexp.keyword", "constant.language.escape"],
                regex: /(\\p{\^?)(Alnum|Alpha|Blank|Cntrl|Digit|Graph|Lower|Print|Punct|Space|Upper|XDigit|Word|ASCII|Any|Assigned|Arabic|Armenian|Balinese|Bengali|Bopomofo|Braille|Buginese|Buhid|Canadian_Aboriginal|Carian|Cham|Cherokee|Common|Coptic|Cuneiform|Cypriot|Cyrillic|Deseret|Devanagari|Ethiopic|Georgian|Glagolitic|Gothic|Greek|Gujarati|Gurmukhi|Han|Hangul|Hanunoo|Hebrew|Hiragana|Inherited|Kannada|Katakana|Kayah_Li|Kharoshthi|Khmer|Lao|Latin|Lepcha|Limbu|Linear_B|Lycian|Lydian|Malayalam|Mongolian|Myanmar|New_Tai_Lue|Nko|Ogham|Ol_Chiki|Old_Italic|Old_Persian|Oriya|Osmanya|Phags_Pa|Phoenician|Rejang|Runic|Saurashtra|Shavian|Sinhala|Sundanese|Syloti_Nagri|Syriac|Tagalog|Tagbanwa|Tai_Le|Tamil|Telugu|Thaana|Thai|Tibetan|Tifinagh|Ugaritic|Vai|Yi|Ll|Lm|Lt|Lu|Lo|Mn|Mc|Me|Nd|Nl|Pc|Pd|Ps|Pe|Pi|Pf|Po|No|Sm|Sc|Sk|So|Zs|Zl|Zp|Cc|Cf|Cn|Co|Cs|N|L|M|P|S|Z|C)(})/
            }, {
                token: ["constant.language.escape", "invalid", "constant.language.escape"],
                regex: /(\\p{\^?)([^/]*)(})/
            }, {// escapes
                token: "regexp.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
            }, {// flag
                token: "string.regexp",
                regex: /[/][imxouesn]*/,
                next: "start"
            }, {// invalid operators
                token: "invalid",
                regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/
            }, {// operators
                token: "constant.language.escape",
                regex: /\(\?(?:[:=!>]|<'?[a-zA-Z]*'?>|<[=!])|\)|\{\d+\b,?\d*\}|[+*]\?|[()$^+*?.]/
            }, {
                token: "constant.language.delimiter",
                regex: /\|/
            }, {
                token: "regexp.keyword",
                regex: /\[\[:(?:alnum|alpha|blank|cntrl|digit|graph|lower|print|punct|space|upper|xdigit|word|ascii):\]\]/
            }, {
                token: "constant.language.escape",
                regex: /\[\^?/,
                push: "regex_character_class"
            }, {
                defaultToken: "string.regexp"
            }
        ],
        "regex_character_class": [
            {
                // character classes
                token: "regexp.keyword",
                regex: /\\[wWdDhHsS]/
            }, {
                token: "regexp.charclass.keyword.operator",
                regex: "\\\\(?:u[\\da-fA-F]{4}|x[\\da-fA-F]{2}|.)"
            }, {
                token: "constant.language.escape",
                regex: /&?&?\[\^?/,
                push: "regex_character_class"
            }, {
                token: "constant.language.escape",
                regex: "]",
                next: "pop"
            }, {
                token: "constant.language.escape",
                regex: "-"
            }, {
                defaultToken: "string.regexp.characterclass"
            }
        ]
    };

    this.normalizeRules();
};

oop.inherits(RubyHighlightRules, TextHighlightRules);

exports.RubyHighlightRules = RubyHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q1Q7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBLFNBQVM7QUFDVDtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxhQUFhLGlCQUFpQjtBQUM5QjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsNkJBQTZCLG8wQkFBbzBCO0FBQ2oyQixhQUFhO0FBQ2I7QUFDQSw2QkFBNkIsYUFBYTtBQUMxQyxhQUFhLEdBQUc7QUFDaEI7QUFDQSw0Q0FBNEMsRUFBRSxjQUFjLEVBQUU7QUFDOUQsYUFBYSxHQUFHO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsR0FBRztBQUNoQjtBQUNBLDBCQUEwQixZQUFZLDRCQUE0QixHQUFHO0FBQ3JFLGFBQWEsR0FBRztBQUNoQjtBQUNBLGtFQUFrRSxZQUFZO0FBQzlFLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSw0Q0FBNEMsRUFBRSxjQUFjLEVBQUU7QUFDOUQsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLDBCQUEwQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcnVieV9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbi8vIGV4cG9ydHMgaXMgZm9yIEhhbWxcbnZhciBjb25zdGFudE90aGVyU3ltYm9sID0gZXhwb3J0cy5jb25zdGFudE90aGVyU3ltYm9sID0ge1xuICAgIHRva2VuIDogXCJjb25zdGFudC5vdGhlci5zeW1ib2wucnVieVwiLCAvLyBzeW1ib2xcbiAgICByZWdleCA6IFwiWzpdKD86W0EtWmEtel9dfFtAJF0oPz1bYS16QS1aMC05X10pKVthLXpBLVowLTlfXSpbIT0/XT9cIlxufTtcblxuZXhwb3J0cy5xU3RyaW5nID0ge1xuICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICByZWdleCA6IFwiWyddKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/WyddXCJcbn07XG5cbmV4cG9ydHMucXFTdHJpbmcgPSB7XG4gICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgIHJlZ2V4IDogJ1tcIl0oPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/W1wiXSdcbn07XG5cbmV4cG9ydHMudFN0cmluZyA9IHtcbiAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIGJhY2t0aWNrIHN0cmluZ1xuICAgIHJlZ2V4IDogXCJbYF0oPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj9bYF1cIlxufTtcblxudmFyIGNvbnN0YW50TnVtZXJpY0hleCA9IGV4cG9ydHMuY29uc3RhbnROdW1lcmljSGV4ID0ge1xuICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleFxuICAgIHJlZ2V4IDogXCIwW3hYXVswLTlhLWZBLUZdKD86WzAtOWEtZkEtRl18Xyg/PVswLTlhLWZBLUZdKSkqXFxcXGJcIlxufTtcblxudmFyIGNvbnN0YW50TnVtZXJpY0JpbmFyeSA9IGV4cG9ydHMuY29uc3RhbnROdW1lcmljQmluYXJ5ID0ge1xuICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICByZWdleDogL1xcYigwW2JCXVswMV0oPzpbMDFdfF8oPz1bMDFdKSkqKVxcYi9cbn07XG5cbnZhciBjb25zdGFudE51bWVyaWNEZWNpbWFsID0gZXhwb3J0cy5jb25zdGFudE51bWVyaWNEZWNpbWFsID0ge1xuICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICByZWdleDogL1xcYigwW2REXSg/OlsxLTldKD86W1xcZF18Xyg/PVtcXGRdKSkqfDApKVxcYi9cbn07XG5cbnZhciBjb25zdGFudE51bWVyaWNPY3RhbCA9IGV4cG9ydHMuY29uc3RhbnROdW1lcmljT2N0YWwgPSB7XG4gICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLFxuICAgIHJlZ2V4OiAvXFxiKDBbb09dPyg/OlsxLTddKD86WzAtN118Xyg/PVswLTddKSkqfDApKVxcYi9cbn07XG5cbnZhciBjb25zdGFudE51bWVyaWNSYXRpb25hbCA9IGV4cG9ydHMuY29uc3RhbnROdW1lcmljUmF0aW9uYWwgPSB7XG4gICAgdG9rZW46IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvL3JhdGlvbmFsICsgY29tcGxleFxuICAgIHJlZ2V4OiAvXFxiKFtcXGRdKyg/OlsuL11bXFxkXSspP3JpPylcXGIvXG59O1xuXG52YXIgY29uc3RhbnROdW1lcmljQ29tcGxleCA9IGV4cG9ydHMuY29uc3RhbnROdW1lcmljQ29tcGxleCA9IHtcbiAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljXCIsIC8vc2ltcGxlIGNvbXBsZXggbnVtYmVyc1xuICAgIHJlZ2V4OiAvXFxiKFtcXGRdaSlcXGIvXG59O1xuXG52YXIgY29uc3RhbnROdW1lcmljRmxvYXQgPSBleHBvcnRzLmNvbnN0YW50TnVtZXJpY0Zsb2F0ID0ge1xuICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0ICsgY29tcGxleFxuICAgIHJlZ2V4IDogXCJbKy1dP1xcXFxkKD86XFxcXGR8Xyg/PVxcXFxkKSkqKD86KD86XFxcXC5cXFxcZCg/OlxcXFxkfF8oPz1cXFxcZCkpKik/KD86W2VFXVsrLV0/XFxcXGQrKT8pP2k/XFxcXGJcIlxufTtcblxudmFyIGluc3RhbmNlVmFyaWFibGUgPSBleHBvcnRzLmluc3RhbmNlVmFyaWFibGUgPSB7XG4gICAgdG9rZW4gOiBcInZhcmlhYmxlLmluc3RhbmNlXCIsIC8vIGluc3RhbmNlIHZhcmlhYmxlXG4gICAgcmVnZXggOiBcIkB7MSwyfVthLXpBLVpfXFxcXGRdK1wiXG59O1xuXG52YXIgUnVieUhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgYnVpbHRpbkZ1bmN0aW9ucyA9IChcbiAgICAgICAgXCJhYm9ydHxBcnJheXxhc3NlcnR8YXNzZXJ0X2VxdWFsfGFzc2VydF9ub3RfZXF1YWx8YXNzZXJ0X3NhbWV8YXNzZXJ0X25vdF9zYW1lfFwiICtcbiAgICAgICAgXCJhc3NlcnRfbmlsfGFzc2VydF9ub3RfbmlsfGFzc2VydF9tYXRjaHxhc3NlcnRfbm9fbWF0Y2h8YXNzZXJ0X2luX2RlbHRhfGFzc2VydF90aHJvd3N8XCIgK1xuICAgICAgICBcImFzc2VydF9yYWlzZXxhc3NlcnRfbm90aGluZ19yYWlzZWR8YXNzZXJ0X2luc3RhbmNlX29mfGFzc2VydF9raW5kX29mfGFzc2VydF9yZXNwb25kX3RvfFwiICtcbiAgICAgICAgXCJhc3NlcnRfb3BlcmF0b3J8YXNzZXJ0X3NlbmR8YXNzZXJ0X2RpZmZlcmVuY2V8YXNzZXJ0X25vX2RpZmZlcmVuY2V8YXNzZXJ0X3JlY29nbml6ZXN8XCIgK1xuICAgICAgICBcImFzc2VydF9nZW5lcmF0ZXN8YXNzZXJ0X3Jlc3BvbnNlfGFzc2VydF9yZWRpcmVjdGVkX3RvfGFzc2VydF90ZW1wbGF0ZXxhc3NlcnRfc2VsZWN0fFwiICtcbiAgICAgICAgXCJhc3NlcnRfc2VsZWN0X2VtYWlsfGFzc2VydF9zZWxlY3RfcmpzfGFzc2VydF9zZWxlY3RfZW5jb2RlZHxjc3Nfc2VsZWN0fGF0X2V4aXR8XCIgK1xuICAgICAgICBcImF0dHJ8YXR0cl93cml0ZXJ8YXR0cl9yZWFkZXJ8YXR0cl9hY2Nlc3NvcnxhdHRyX2FjY2Vzc2libGV8YXV0b2xvYWR8YmluZGluZ3xibG9ja19naXZlbj98Y2FsbGNjfFwiICtcbiAgICAgICAgXCJjYWxsZXJ8Y2F0Y2h8Y2hvbXB8Y2hvbXAhfGNob3B8Y2hvcCF8ZGVmaW5lZD98ZGVsZXRlX3ZpYV9yZWRpcmVjdHxldmFsfGV4ZWN8ZXhpdHxcIiArXG4gICAgICAgIFwiZXhpdCF8ZmFpbHxGbG9hdHxmbHVua3xmb2xsb3dfcmVkaXJlY3QhfGZvcmt8Zm9ybV9mb3J8Zm9ybV90YWd8Zm9ybWF0fGdldHN8Z2xvYmFsX3ZhcmlhYmxlc3xnc3VifFwiICtcbiAgICAgICAgXCJnc3ViIXxnZXRfdmlhX3JlZGlyZWN0fGhvc3QhfGh0dHBzP3xodHRwcyF8aW5jbHVkZXxJbnRlZ2VyfGxhbWJkYXxsaW5rX3RvfFwiICtcbiAgICAgICAgXCJsaW5rX3RvX3VubGVzc19jdXJyZW50fGxpbmtfdG9fZnVuY3Rpb258bGlua190b19yZW1vdGV8bG9hZHxsb2NhbF92YXJpYWJsZXN8bG9vcHxvcGVufG9wZW5fc2Vzc2lvbnxcIiArXG4gICAgICAgIFwicHxwcmludHxwcmludGZ8cHJvY3xwdXRjfHB1dHN8cG9zdF92aWFfcmVkaXJlY3R8cHV0X3ZpYV9yZWRpcmVjdHxyYWlzZXxyYW5kfFwiICtcbiAgICAgICAgXCJyYXd8cmVhZGxpbmV8cmVhZGxpbmVzfHJlZGlyZWN0P3xyZXF1ZXN0X3ZpYV9yZWRpcmVjdHxyZXF1aXJlfHNjYW58c2VsZWN0fFwiICtcbiAgICAgICAgXCJzZXRfdHJhY2VfZnVuY3xzbGVlcHxzcGxpdHxzcHJpbnRmfHNyYW5kfFN0cmluZ3xzdHlsZXNoZWV0X2xpbmtfdGFnfHN5c2NhbGx8c3lzdGVtfHN1YnxzdWIhfHRlc3R8XCIgK1xuICAgICAgICBcInRocm93fHRyYWNlX3Zhcnx0cmFwfHVudHJhY2VfdmFyfGF0YW4yfGNvc3xleHB8ZnJleHB8bGRleHB8bG9nfGxvZzEwfHNpbnxzcXJ0fHRhbnxcIiArXG4gICAgICAgIFwicmVuZGVyfGphdmFzY3JpcHRfaW5jbHVkZV90YWd8Y3NyZl9tZXRhX3RhZ3xsYWJlbF90YWd8dGV4dF9maWVsZF90YWd8c3VibWl0X3RhZ3xjaGVja19ib3hfdGFnfFwiICtcbiAgICAgICAgXCJjb250ZW50X3RhZ3xyYWRpb19idXR0b25fdGFnfHRleHRfYXJlYV90YWd8cGFzc3dvcmRfZmllbGRfdGFnfGhpZGRlbl9maWVsZF90YWd8XCIgK1xuICAgICAgICBcImZpZWxkc19mb3J8c2VsZWN0X3RhZ3xvcHRpb25zX2Zvcl9zZWxlY3R8b3B0aW9uc19mcm9tX2NvbGxlY3Rpb25fZm9yX3NlbGVjdHxjb2xsZWN0aW9uX3NlbGVjdHxcIiArXG4gICAgICAgIFwidGltZV96b25lX3NlbGVjdHxzZWxlY3RfZGF0ZXxzZWxlY3RfdGltZXxzZWxlY3RfZGF0ZXRpbWV8ZGF0ZV9zZWxlY3R8dGltZV9zZWxlY3R8ZGF0ZXRpbWVfc2VsZWN0fFwiICtcbiAgICAgICAgXCJzZWxlY3RfeWVhcnxzZWxlY3RfbW9udGh8c2VsZWN0X2RheXxzZWxlY3RfaG91cnxzZWxlY3RfbWludXRlfHNlbGVjdF9zZWNvbmR8ZmlsZV9maWVsZF90YWd8XCIgK1xuICAgICAgICBcImZpbGVfZmllbGR8cmVzcG9uZF90b3xza2lwX2JlZm9yZV9maWx0ZXJ8YXJvdW5kX2ZpbHRlcnxhZnRlcl9maWx0ZXJ8dmVyaWZ5fFwiICtcbiAgICAgICAgXCJwcm90ZWN0X2Zyb21fZm9yZ2VyeXxyZXNjdWVfZnJvbXxoZWxwZXJfbWV0aG9kfHJlZGlyZWN0X3RvfGJlZm9yZV9maWx0ZXJ8XCIgK1xuICAgICAgICBcInNlbmRfZGF0YXxzZW5kX2ZpbGV8dmFsaWRhdGVzX3ByZXNlbmNlX29mfHZhbGlkYXRlc191bmlxdWVuZXNzX29mfHZhbGlkYXRlc19sZW5ndGhfb2Z8XCIgK1xuICAgICAgICBcInZhbGlkYXRlc19mb3JtYXRfb2Z8dmFsaWRhdGVzX2FjY2VwdGFuY2Vfb2Z8dmFsaWRhdGVzX2Fzc29jaWF0ZWR8dmFsaWRhdGVzX2V4Y2x1c2lvbl9vZnxcIiArXG4gICAgICAgIFwidmFsaWRhdGVzX2luY2x1c2lvbl9vZnx2YWxpZGF0ZXNfbnVtZXJpY2FsaXR5X29mfHZhbGlkYXRlc193aXRofHZhbGlkYXRlc19lYWNofFwiICtcbiAgICAgICAgXCJhdXRoZW50aWNhdGVfb3JfcmVxdWVzdF93aXRoX2h0dHBfYmFzaWN8YXV0aGVudGljYXRlX29yX3JlcXVlc3Rfd2l0aF9odHRwX2RpZ2VzdHxcIiArXG4gICAgICAgIFwiZmlsdGVyX3BhcmFtZXRlcl9sb2dnaW5nfG1hdGNofGdldHxwb3N0fHJlc291cmNlc3xyZWRpcmVjdHxzY29wZXxhc3NlcnRfcm91dGluZ3xcIiArXG4gICAgICAgIFwidHJhbnNsYXRlfGxvY2FsaXplfGV4dHJhY3RfbG9jYWxlX2Zyb21fdGxkfGNhY2hlc19wYWdlfGV4cGlyZV9wYWdlfGNhY2hlc19hY3Rpb258ZXhwaXJlX2FjdGlvbnxcIiArXG4gICAgICAgIFwiY2FjaGV8ZXhwaXJlX2ZyYWdtZW50fGV4cGlyZV9jYWNoZV9mb3J8b2JzZXJ2ZXxjYWNoZV9zd2VlcGVyfFwiICtcbiAgICAgICAgXCJoYXNfbWFueXxoYXNfb25lfGJlbG9uZ3NfdG98aGFzX2FuZF9iZWxvbmdzX3RvX21hbnl8cHx3YXJufHJlZmluZXx1c2luZ3xtb2R1bGVfZnVuY3Rpb258ZXh0ZW5kfGFsaWFzX21ldGhvZHxcIiArXG4gICAgICAgIFwicHJpdmF0ZV9jbGFzc19tZXRob2R8cmVtb3ZlX21ldGhvZHx1bmRlZl9tZXRob2RcIlxuICAgICk7XG5cbiAgICB2YXIga2V5d29yZHMgPSAoXG4gICAgICAgIFwiYWxpYXN8YW5kfEJFR0lOfGJlZ2lufGJyZWFrfGNhc2V8Y2xhc3N8ZGVmfGRlZmluZWR8ZG98ZWxzZXxlbHNpZnxFTkR8ZW5kfGVuc3VyZXxcIiArXG4gICAgICAgIFwiX19GSUxFX198ZmluYWxseXxmb3J8Z2VtfGlmfGlufF9fTElORV9ffG1vZHVsZXxuZXh0fG5vdHxvcnxwcml2YXRlfHByb3RlY3RlZHxwdWJsaWN8XCIgK1xuICAgICAgICBcInJlZG98cmVzY3VlfHJldHJ5fHJldHVybnxzdXBlcnx0aGVufHVuZGVmfHVubGVzc3x1bnRpbHx3aGVufHdoaWxlfHlpZWxkfF9fRU5DT0RJTkdfX3xwcmVwZW5kXCJcbiAgICApO1xuXG4gICAgdmFyIGJ1aWxkaW5Db25zdGFudHMgPSAoXG4gICAgICAgIFwidHJ1ZXxUUlVFfGZhbHNlfEZBTFNFfG5pbHxOSUx8QVJHRnxBUkdWfERBVEF8RU5WfFJVQllfUExBVEZPUk18UlVCWV9SRUxFQVNFX0RBVEV8XCIgK1xuICAgICAgICBcIlJVQllfVkVSU0lPTnxTVERFUlJ8U1RESU58U1RET1VUfFRPUExFVkVMX0JJTkRJTkd8UlVCWV9QQVRDSExFVkVMfFJVQllfUkVWSVNJT058UlVCWV9DT1BZUklHSFR8UlVCWV9FTkdJTkV8UlVCWV9FTkdJTkVfVkVSU0lPTnxSVUJZX0RFU0NSSVBUSU9OXCJcbiAgICApO1xuXG4gICAgdmFyIGJ1aWx0aW5WYXJpYWJsZXMgPSAoXG4gICAgICAgIFwiJERFQlVHfCRkZWZvdXR8JEZJTEVOQU1FfCRMT0FEX1BBVEh8JFNBRkV8JHN0ZGlufCRzdGRvdXR8JHN0ZGVycnwkVkVSQk9TRXxcIiArXG4gICAgICAgIFwiJCF8cm9vdF91cmx8Zmxhc2h8c2Vzc2lvbnxjb29raWVzfHBhcmFtc3xyZXF1ZXN0fHJlc3BvbnNlfGxvZ2dlcnxzZWxmXCJcbiAgICApO1xuXG4gICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLiRrZXl3b3JkcyA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwia2V5d29yZFwiOiBrZXl3b3JkcyxcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBidWlsZGluQ29uc3RhbnRzLFxuICAgICAgICBcInZhcmlhYmxlLmxhbmd1YWdlXCI6IGJ1aWx0aW5WYXJpYWJsZXMsXG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvblwiOiBidWlsdGluRnVuY3Rpb25zLFxuICAgICAgICBcImludmFsaWQuZGVwcmVjYXRlZFwiOiBcImRlYnVnZ2VyXCIgLy8gVE9ETyBpcyB0aGlzIGEgcmVtbmFudCBmcm9tIGpzIG1vZGU/XG4gICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuXG4gICAgdmFyIGVzY2FwZWRDaGFycyA9IFwiXFxcXFxcXFwoPzpuKD86WzEtN11bMC03XXswLDJ9fDApfFtuc3J0dmZiYWUnXFxcIlxcXFxcXFxcXXxjKD86XFxcXFxcXFxNLSk/LnxNLSg/OlxcXFxcXFxcQy18XFxcXFxcXFxjKT8ufEMtKD86XFxcXFxcXFxNLSk/LnxbMC03XXszfXx4W1xcXFxkYS1mQS1GXXsyfXx1W1xcXFxkYS1mQS1GXXs0fXx1e1tcXFxcZGEtZkEtRl17MSw2fSg/OlxcXFxzW1xcXFxkYS1mQS1GXXsxLDZ9KSp9KVwiO1xuXG4gICAgdmFyIGNsb3NlUGFyZW4gPSB7XG4gICAgICAgIFwiKFwiOiBcIilcIixcbiAgICAgICAgXCJbXCI6IFwiXVwiLFxuICAgICAgICBcIntcIjogXCJ9XCIsXG4gICAgICAgIFwiPFwiOiBcIj5cIixcbiAgICAgICAgXCJeXCI6IFwiXlwiLFxuICAgICAgICBcInxcIjogXCJ8XCIsXG4gICAgICAgIFwiJVwiOiBcIiVcIlxuICAgIH07XG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiIy4qJFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5tdWx0aWxpbmVcIiwgLy8gbXVsdGkgbGluZSBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXj1iZWdpbig/PSR8XFxcXHMuKiQpXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJjb21tZW50XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucmVnZXhwXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9bL10oPz0uKlxcLykvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicmVnZXhcIlxuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogW1wiY29uc3RhbnQub3RoZXIuc3ltYm9sLnJ1YnlcIiwgXCJzdHJpbmcuc3RhcnRcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8oOik/KFwiKS8sXG4gICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBlc2NhcGVkQ2hhcnNcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvI3svLFxuICAgICAgICAgICAgICAgICAgICBwdXNoOiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5lbmRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC9cIi8sXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9gLyxcbiAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IGVzY2FwZWRDaGFyc1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicGFyZW4uc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8jey8sXG4gICAgICAgICAgICAgICAgICAgIHB1c2g6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogL2AvLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXCJjb25zdGFudC5vdGhlci5zeW1ib2wucnVieVwiLCBcInN0cmluZy5zdGFydFwiXSxcbiAgICAgICAgICAgICAgICByZWdleDogLyg6KT8oJykvLFxuICAgICAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogL1xcXFxbJ1xcXFxdL1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogLycvLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5zdGFydFwiLC8vZG9lc24ndCBzZWUgYW55IGRpZmZlcmVuY2VzIGJldHdlZW4gc3RyaW5ncyBhbmQgYXJyYXkgb2Ygc3RyaW5ncyBpbiBoaWdobGlnaHRpbmdcbiAgICAgICAgICAgICAgICByZWdleDogLyVbcXd4XShbKFxcWzx7XnwlXSkvLCBvbk1hdGNoOiBmdW5jdGlvbiAodmFsLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWNrLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrID0gW107XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbiA9IHZhbFt2YWwubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQocGFyZW4sIHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJxU3RhdGVXaXRob3V0SW50ZXJwb2xhdGlvblwiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsIC8vZG9lc24ndCBzZWUgYW55IGRpZmZlcmVuY2VzIGJldHdlZW4gc3RyaW5ncyBhbmQgYXJyYXkgb2Ygc3RyaW5ncyBpbiBoaWdobGlnaHRpbmdcbiAgICAgICAgICAgICAgICByZWdleDogLyVbUVdYXT8oWyhcXFs8e158JV0pLywgb25NYXRjaDogZnVuY3Rpb24gKHZhbCwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFjayA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW4gPSB2YWxbdmFsLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHBhcmVuLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IFwicVN0YXRlV2l0aEludGVycG9sYXRpb25cIjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm90aGVyLnN5bWJvbC5ydWJ5XCIsIC8vZG9lc24ndCBzZWUgYW55IGRpZmZlcmVuY2VzIGJldHdlZW4gc3ltYm9scyBhbmQgYXJyYXkgb2Ygc3ltYm9scyBpbiBoaWdobGlnaHRpbmdcbiAgICAgICAgICAgICAgICByZWdleDogLyVbc2ldKFsoXFxbPHtefCVdKS8sIG9uTWF0Y2g6IGZ1bmN0aW9uICh2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVuID0gdmFsW3ZhbC5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdChwYXJlbiwgc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcInNTdGF0ZVdpdGhvdXRJbnRlcnBvbGF0aW9uXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5vdGhlci5zeW1ib2wucnVieVwiLCAvL2RvZXNuJ3Qgc2VlIGFueSBkaWZmZXJlbmNlcyBiZXR3ZWVuIHN5bWJvbHMgYW5kIGFycmF5IG9mIHN5bWJvbHMgaW4gaGlnaGxpZ2h0aW5nXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8lW1NJXShbKFxcWzx7XnwlXSkvLCBvbk1hdGNoOiBmdW5jdGlvbiAodmFsLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWNrLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrID0gW107XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbiA9IHZhbFt2YWwubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQocGFyZW4sIHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJzU3RhdGVXaXRoSW50ZXJwb2xhdGlvblwiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnJlZ2V4cFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvJVtyXShbKFxcWzx7XnwlXSkvLCBvbk1hdGNoOiBmdW5jdGlvbiAodmFsLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWNrLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrID0gW107XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbiA9IHZhbFt2YWwubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQocGFyZW4sIHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJyU3RhdGVcIjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfV0sXG5cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvblwiLCAvLyBuYW1lc3BhY2VzIGFyZW4ndCBzeW1ib2xzXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiOjpcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGluc3RhbmNlVmFyaWFibGUsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUuZ2xvYmFsXCIsIC8vIGdsb2JhbCB2YXJpYWJsZVxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlskXVthLXpBLVpfXFxcXGRdK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3VwcG9ydC5jbGFzc1wiLCAvLyBjbGFzcyBuYW1lXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiW0EtWl1bYS16QS1aX1xcXFxkXSpcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLCBcInN1cHBvcnQuZnVuY3Rpb25cIl0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8oXFwuKShbYS16QS1aX1xcZF0rKSg/PVxcKCkvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsIFwiaWRlbnRpZmllclwiXSxcbiAgICAgICAgICAgICAgICByZWdleDogLyhcXC4pKFthLXpBLVpfXVthLXpBLVpfXFxkXSopL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5jaGFyYWN0ZXJcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcQlxcXFw/KD86XCIgKyBlc2NhcGVkQ2hhcnMgKyBcInxcXFxcUylcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXD8oPz0uKzopL1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY29uc3RhbnROdW1lcmljUmF0aW9uYWwsXG4gICAgICAgICAgICBjb25zdGFudE51bWVyaWNDb21wbGV4LFxuICAgICAgICAgICAgY29uc3RhbnRPdGhlclN5bWJvbCxcbiAgICAgICAgICAgIGNvbnN0YW50TnVtZXJpY0hleCxcbiAgICAgICAgICAgIGNvbnN0YW50TnVtZXJpY0Zsb2F0LFxuICAgICAgICAgICAgY29uc3RhbnROdW1lcmljQmluYXJ5LFxuICAgICAgICAgICAgY29uc3RhbnROdW1lcmljRGVjaW1hbCxcbiAgICAgICAgICAgIGNvbnN0YW50TnVtZXJpY09jdGFsLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW5cIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIoPzp0cnVlfGZhbHNlKVxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgICAgICByZWdleDogXCJbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXFxcYlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uc2VwYXJhdG9yLmtleS12YWx1ZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIj0+XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBzdGF0ZU5hbWU6IFwiaGVyZWRvY1wiLFxuICAgICAgICAgICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uICh2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dCA9ICh2YWx1ZVsyXSA9PSAnLScgfHwgdmFsdWVbMl0gPT0gJ34nKSA/IFwiaW5kZW50ZWRIZXJlZG9jXCIgOiBcImhlcmVkb2NcIjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRva2VucyA9IHZhbHVlLnNwbGl0KHRoaXMuc3BsaXRSZWdleCk7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnB1c2gobmV4dCwgdG9rZW5zWzNdKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0eXBlOiBcImNvbnN0YW50XCIsIHZhbHVlOiB0b2tlbnNbMV19LFxuICAgICAgICAgICAgICAgICAgICAgICAge3R5cGU6IFwic3RyaW5nXCIsIHZhbHVlOiB0b2tlbnNbMl19LFxuICAgICAgICAgICAgICAgICAgICAgICAge3R5cGU6IFwic3VwcG9ydC5jbGFzc1wiLCB2YWx1ZTogdG9rZW5zWzNdfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHt0eXBlOiBcInN0cmluZ1wiLCB2YWx1ZTogdG9rZW5zWzRdfVxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiKDw8Wy1+XT8pKFsnXFxcImBdPykoW1xcXFx3XSspKFsnXFxcImBdPylcIixcbiAgICAgICAgICAgICAgICBydWxlczoge1xuICAgICAgICAgICAgICAgICAgICBoZXJlZG9jOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgb25NYXRjaDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHN0YWNrWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrWzBdIHx8IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3VwcG9ydC5jbGFzc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIi4qJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgICAgICAgICBpbmRlbnRlZEhlcmVkb2M6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIl4gK1wiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBzdGFja1sxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFja1swXSB8fCBcInN0YXJ0XCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1cHBvcnQuY2xhc3NcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogXCIuKiRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByZWdleDogXCIkXCIsXG4gICAgICAgICAgICAgICAgdG9rZW46IFwiZW1wdHlcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBmdW5jdGlvbihjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFja1swXSA9PT0gXCJoZXJlZG9jXCIgfHwgc3RhY2tbMF0gPT09IFwiaW5kZW50ZWRIZXJlZG9jXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc3RhY2tbMF07XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiIXxcXFxcJHwlfCZ8XFxcXCp8L3xcXFxcLVxcXFwtfFxcXFwtfFxcXFwrXFxcXCt8XFxcXCt8fnw9PT18PT18PXwhPXwhPT18PD18Pj18PDw9fD4+PXw+Pj49fDw+fDx8PnwhfCYmfFxcXFx8XFxcXHx8XFxcXD9cXFxcOnxcXFxcKj18JT18XFxcXCs9fFxcXFwtPXwmPXxcXFxcXj18XFxcXHx8XFxcXGIoPzppbnxpbnN0YW5jZW9mfG5ld3xkZWxldGV8dHlwZW9mfHZvaWQpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJbWyh7XVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiW1xcXFxdKX1dXCIsXG4gICAgICAgICAgICAgICAgb25NYXRjaDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gJyc7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBcIn1cIiAmJiBzdGFjay5sZW5ndGggPiAxICYmIHN0YWNrWzFdICE9IFwic3RhcnRcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxccytcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9bPzosOy5dL1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImNvbW1lbnRcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQubXVsdGlsaW5lXCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIl49ZW5kKD89JHxcXFxccy4qJClcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50XCIsIC8vIGNvbW1lbnQgc3Bhbm5pbmcgd2hvbGUgbGluZVxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIi4rXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJxU3RhdGVXaXRoSW50ZXJwb2xhdGlvblwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsLy8gZXhjbHVkZWQgbmVzdGVkIHxeJSBkdWUgdG8gZGlmZmljdWx0eSBpbiByZWFsaXphdGlvblxuICAgICAgICAgICAgcmVnZXg6IC9bKFxcWzx7XS8sIG9uTWF0Y2g6IGZ1bmN0aW9uICh2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGggJiYgdmFsID09PSBzdGFja1swXSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHZhbCwgc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXg6IGVzY2FwZWRDaGFyc1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxcXC4vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnN0YXJ0XCIsXG4gICAgICAgICAgICByZWdleDogLyN7LyxcbiAgICAgICAgICAgIHB1c2g6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICByZWdleDogL1spXFxdPn1efCVdLywgb25NYXRjaDogZnVuY3Rpb24gKHZhbCwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCAmJiB2YWwgPT09IGNsb3NlUGFyZW5bc3RhY2tbMF1dKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSAnJztcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgIH1dLFxuICAgICAgICBcInFTdGF0ZVdpdGhvdXRJbnRlcnBvbGF0aW9uXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIiwvLyBleGNsdWRlZCBuZXN0ZWQgfF4lIGR1ZSB0byBkaWZmaWN1bHR5IGluIHJlYWxpemF0aW9uXG4gICAgICAgICAgICByZWdleDogL1soXFxbPHtdLywgb25NYXRjaDogZnVuY3Rpb24gKHZhbCwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCAmJiB2YWwgPT09IHN0YWNrWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodmFsLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleDogL1xcXFxbJ1xcXFxdL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxcXC4vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5lbmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvWylcXF0+fV58JV0vLCBvbk1hdGNoOiBmdW5jdGlvbiAodmFsLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoICYmIHZhbCA9PT0gY2xvc2VQYXJlbltzdGFja1swXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9ICcnO1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwic1N0YXRlV2l0aG91dEludGVycG9sYXRpb25cIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm90aGVyLnN5bWJvbC5ydWJ5XCIsLy8gZXhjbHVkZWQgbmVzdGVkIHxeJSBkdWUgdG8gZGlmZmljdWx0eSBpbiByZWFsaXphdGlvblxuICAgICAgICAgICAgcmVnZXg6IC9bKFxcWzx7XS8sIG9uTWF0Y2g6IGZ1bmN0aW9uICh2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGggJiYgdmFsID09PSBzdGFja1swXSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHZhbCwgc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY29uc3RhbnQub3RoZXIuc3ltYm9sLnJ1YnlcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQub3RoZXIuc3ltYm9sLnJ1YnlcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvWylcXF0+fV58JV0vLCBvbk1hdGNoOiBmdW5jdGlvbiAodmFsLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoICYmIHZhbCA9PT0gY2xvc2VQYXJlbltzdGFja1swXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9ICcnO1xuICAgICAgICAgICAgICAgIHJldHVybiBcImNvbnN0YW50Lm90aGVyLnN5bWJvbC5ydWJ5XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb25zdGFudC5vdGhlci5zeW1ib2wucnVieVwiXG4gICAgICAgIH1dLFxuICAgICAgICBcInNTdGF0ZVdpdGhJbnRlcnBvbGF0aW9uXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5vdGhlci5zeW1ib2wucnVieVwiLC8vIGV4Y2x1ZGVkIG5lc3RlZCB8XiUgZHVlIHRvIGRpZmZpY3VsdHkgaW4gcmVhbGl6YXRpb25cbiAgICAgICAgICAgIHJlZ2V4OiAvWyhcXFs8e10vLCBvbk1hdGNoOiBmdW5jdGlvbiAodmFsLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoICYmIHZhbCA9PT0gc3RhY2tbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh2YWwsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBcImNvbnN0YW50Lm90aGVyLnN5bWJvbC5ydWJ5XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXg6IGVzY2FwZWRDaGFyc1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxcXC4vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnN0YXJ0XCIsXG4gICAgICAgICAgICByZWdleDogLyN7LyxcbiAgICAgICAgICAgIHB1c2g6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5vdGhlci5zeW1ib2wucnVieVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9bKVxcXT59XnwlXS8sIG9uTWF0Y2g6IGZ1bmN0aW9uICh2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGggJiYgdmFsID09PSBjbG9zZVBhcmVuW3N0YWNrWzBdXSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gJyc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY29uc3RhbnQub3RoZXIuc3ltYm9sLnJ1YnlcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbnN0YW50Lm90aGVyLnN5bWJvbC5ydWJ5XCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwiclN0YXRlXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucmVnZXhwXCIsLy8gZXhjbHVkZWQgbmVzdGVkIHxeJSBkdWUgdG8gZGlmZmljdWx0eSBpbiByZWFsaXphdGlvblxuICAgICAgICAgICAgcmVnZXg6IC9bKFxcWzx7XS8sIG9uTWF0Y2g6IGZ1bmN0aW9uICh2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGggJiYgdmFsID09PSBzdGFja1swXSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHZhbCwgc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLnN0YXJ0XCIsXG4gICAgICAgICAgICByZWdleDogLyN7LyxcbiAgICAgICAgICAgIHB1c2g6IFwic3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucmVnZXhwXCIsXG4gICAgICAgICAgICByZWdleDogL1xcLy9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnJlZ2V4cFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9bKVxcXT59XnwlXVtpbXhvdWVzbl0qLywgb25NYXRjaDogZnVuY3Rpb24gKHZhbCwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCAmJiB2YWxbMF0gPT09IGNsb3NlUGFyZW5bc3RhY2tbMF1dKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSAnJztcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgICAgIHtpbmNsdWRlOiBcInJlZ2V4XCJ9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucmVnZXhwXCJcbiAgICAgICAgICAgIH1dLFxuICAgICAgICBcInJlZ2V4XCI6IFtcbiAgICAgICAgICAgIHsvLyBjaGFyYWN0ZXIgY2xhc3Nlc1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInJlZ2V4cC5rZXl3b3JkXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXFxcW3dXZERoSHNTXS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcXFxbQUdiQnpaXS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcXFxnPFthLXpBLVowLTldKj4vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCBcInJlZ2V4cC5rZXl3b3JkXCIsIFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvKFxcXFxwe1xcXj8pKEFsbnVtfEFscGhhfEJsYW5rfENudHJsfERpZ2l0fEdyYXBofExvd2VyfFByaW50fFB1bmN0fFNwYWNlfFVwcGVyfFhEaWdpdHxXb3JkfEFTQ0lJfEFueXxBc3NpZ25lZHxBcmFiaWN8QXJtZW5pYW58QmFsaW5lc2V8QmVuZ2FsaXxCb3BvbW9mb3xCcmFpbGxlfEJ1Z2luZXNlfEJ1aGlkfENhbmFkaWFuX0Fib3JpZ2luYWx8Q2FyaWFufENoYW18Q2hlcm9rZWV8Q29tbW9ufENvcHRpY3xDdW5laWZvcm18Q3lwcmlvdHxDeXJpbGxpY3xEZXNlcmV0fERldmFuYWdhcml8RXRoaW9waWN8R2VvcmdpYW58R2xhZ29saXRpY3xHb3RoaWN8R3JlZWt8R3VqYXJhdGl8R3VybXVraGl8SGFufEhhbmd1bHxIYW51bm9vfEhlYnJld3xIaXJhZ2FuYXxJbmhlcml0ZWR8S2FubmFkYXxLYXRha2FuYXxLYXlhaF9MaXxLaGFyb3NodGhpfEtobWVyfExhb3xMYXRpbnxMZXBjaGF8TGltYnV8TGluZWFyX0J8THljaWFufEx5ZGlhbnxNYWxheWFsYW18TW9uZ29saWFufE15YW5tYXJ8TmV3X1RhaV9MdWV8TmtvfE9naGFtfE9sX0NoaWtpfE9sZF9JdGFsaWN8T2xkX1BlcnNpYW58T3JpeWF8T3NtYW55YXxQaGFnc19QYXxQaG9lbmljaWFufFJlamFuZ3xSdW5pY3xTYXVyYXNodHJhfFNoYXZpYW58U2luaGFsYXxTdW5kYW5lc2V8U3lsb3RpX05hZ3JpfFN5cmlhY3xUYWdhbG9nfFRhZ2JhbndhfFRhaV9MZXxUYW1pbHxUZWx1Z3V8VGhhYW5hfFRoYWl8VGliZXRhbnxUaWZpbmFnaHxVZ2FyaXRpY3xWYWl8WWl8TGx8TG18THR8THV8TG98TW58TWN8TWV8TmR8Tmx8UGN8UGR8UHN8UGV8UGl8UGZ8UG98Tm98U218U2N8U2t8U298WnN8Wmx8WnB8Q2N8Q2Z8Q258Q298Q3N8TnxMfE18UHxTfFp8QykofSkvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLCBcImludmFsaWRcIiwgXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8oXFxcXHB7XFxePykoW14vXSopKH0pL1xuICAgICAgICAgICAgfSwgey8vIGVzY2FwZXNcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJyZWdleHAua2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxcXFxcKD86dVtcXFxcZGEtZkEtRl17NH18eFtcXFxcZGEtZkEtRl17Mn18LilcIlxuICAgICAgICAgICAgfSwgey8vIGZsYWdcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucmVnZXhwXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9bL11baW14b3Vlc25dKi8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7Ly8gaW52YWxpZCBvcGVyYXRvcnNcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJpbnZhbGlkXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXHtcXGQrXFxiLD9cXGQqXFx9WysqXXxbKyokXj9dWysqXXxbJF5dWz9dfFxcP3szLH0vXG4gICAgICAgICAgICB9LCB7Ly8gb3BlcmF0b3JzXG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXChcXD8oPzpbOj0hPl18PCc/W2EtekEtWl0qJz8+fDxbPSFdKXxcXCl8XFx7XFxkK1xcYiw/XFxkKlxcfXxbKypdXFw/fFsoKSReKyo/Ll0vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZGVsaW1pdGVyXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXHwvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicmVnZXhwLmtleXdvcmRcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcW1xcWzooPzphbG51bXxhbHBoYXxibGFua3xjbnRybHxkaWdpdHxncmFwaHxsb3dlcnxwcmludHxwdW5jdHxzcGFjZXx1cHBlcnx4ZGlnaXR8d29yZHxhc2NpaSk6XFxdXFxdL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxbXFxePy8sXG4gICAgICAgICAgICAgICAgcHVzaDogXCJyZWdleF9jaGFyYWN0ZXJfY2xhc3NcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucmVnZXhwXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJyZWdleF9jaGFyYWN0ZXJfY2xhc3NcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC8vIGNoYXJhY3RlciBjbGFzc2VzXG4gICAgICAgICAgICAgICAgdG9rZW46IFwicmVnZXhwLmtleXdvcmRcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcXFxbd1dkRGhIc1NdL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInJlZ2V4cC5jaGFyY2xhc3Mua2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxcXFxcKD86dVtcXFxcZGEtZkEtRl17NH18eFtcXFxcZGEtZkEtRl17Mn18LilcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvJj8mP1xcW1xcXj8vLFxuICAgICAgICAgICAgICAgIHB1c2g6IFwicmVnZXhfY2hhcmFjdGVyX2NsYXNzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJdXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIi1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucmVnZXhwLmNoYXJhY3RlcmNsYXNzXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG5cbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoUnVieUhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlJ1YnlIaWdobGlnaHRSdWxlcyA9IFJ1YnlIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==