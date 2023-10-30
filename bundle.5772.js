"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5772],{

/***/ 35772:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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

var constantNumericOctal = exports.constantNumericDecimal = {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q1Q7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBLFNBQVM7QUFDVDtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxhQUFhLGlCQUFpQjtBQUM5QjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsNkJBQTZCLG8wQkFBbzBCO0FBQ2oyQixhQUFhO0FBQ2I7QUFDQSw2QkFBNkIsYUFBYTtBQUMxQyxhQUFhLEdBQUc7QUFDaEI7QUFDQSw0Q0FBNEMsRUFBRSxjQUFjLEVBQUU7QUFDOUQsYUFBYSxHQUFHO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLGFBQWEsR0FBRztBQUNoQjtBQUNBLDBCQUEwQixZQUFZLDRCQUE0QixHQUFHO0FBQ3JFLGFBQWEsR0FBRztBQUNoQjtBQUNBLGtFQUFrRSxZQUFZO0FBQzlFLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSw0Q0FBNEMsRUFBRSxjQUFjLEVBQUU7QUFDOUQsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBLDBCQUEwQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcnVieV9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbi8vIGV4cG9ydHMgaXMgZm9yIEhhbWxcbnZhciBjb25zdGFudE90aGVyU3ltYm9sID0gZXhwb3J0cy5jb25zdGFudE90aGVyU3ltYm9sID0ge1xuICAgIHRva2VuIDogXCJjb25zdGFudC5vdGhlci5zeW1ib2wucnVieVwiLCAvLyBzeW1ib2xcbiAgICByZWdleCA6IFwiWzpdKD86W0EtWmEtel9dfFtAJF0oPz1bYS16QS1aMC05X10pKVthLXpBLVowLTlfXSpbIT0/XT9cIlxufTtcblxuZXhwb3J0cy5xU3RyaW5nID0ge1xuICAgIHRva2VuIDogXCJzdHJpbmdcIiwgLy8gc2luZ2xlIGxpbmVcbiAgICByZWdleCA6IFwiWyddKD86KD86XFxcXFxcXFwuKXwoPzpbXidcXFxcXFxcXF0pKSo/WyddXCJcbn07XG5cbmV4cG9ydHMucXFTdHJpbmcgPSB7XG4gICAgdG9rZW4gOiBcInN0cmluZ1wiLCAvLyBzaW5nbGUgbGluZVxuICAgIHJlZ2V4IDogJ1tcIl0oPzooPzpcXFxcXFxcXC4pfCg/OlteXCJcXFxcXFxcXF0pKSo/W1wiXSdcbn07XG5cbmV4cG9ydHMudFN0cmluZyA9IHtcbiAgICB0b2tlbiA6IFwic3RyaW5nXCIsIC8vIGJhY2t0aWNrIHN0cmluZ1xuICAgIHJlZ2V4IDogXCJbYF0oPzooPzpcXFxcXFxcXC4pfCg/OlteJ1xcXFxcXFxcXSkpKj9bYF1cIlxufTtcblxudmFyIGNvbnN0YW50TnVtZXJpY0hleCA9IGV4cG9ydHMuY29uc3RhbnROdW1lcmljSGV4ID0ge1xuICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleFxuICAgIHJlZ2V4IDogXCIwW3hYXVswLTlhLWZBLUZdKD86WzAtOWEtZkEtRl18Xyg/PVswLTlhLWZBLUZdKSkqXFxcXGJcIlxufTtcblxudmFyIGNvbnN0YW50TnVtZXJpY0JpbmFyeSA9IGV4cG9ydHMuY29uc3RhbnROdW1lcmljQmluYXJ5ID0ge1xuICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICByZWdleDogL1xcYigwW2JCXVswMV0oPzpbMDFdfF8oPz1bMDFdKSkqKVxcYi9cbn07XG5cbnZhciBjb25zdGFudE51bWVyaWNEZWNpbWFsID0gZXhwb3J0cy5jb25zdGFudE51bWVyaWNEZWNpbWFsID0ge1xuICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWNcIixcbiAgICByZWdleDogL1xcYigwW2REXSg/OlsxLTldKD86W1xcZF18Xyg/PVtcXGRdKSkqfDApKVxcYi9cbn07XG5cbnZhciBjb25zdGFudE51bWVyaWNPY3RhbCA9IGV4cG9ydHMuY29uc3RhbnROdW1lcmljRGVjaW1hbCA9IHtcbiAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljXCIsXG4gICAgcmVnZXg6IC9cXGIoMFtvT10/KD86WzEtN10oPzpbMC03XXxfKD89WzAtN10pKSp8MCkpXFxiL1xufTtcblxudmFyIGNvbnN0YW50TnVtZXJpY1JhdGlvbmFsID0gZXhwb3J0cy5jb25zdGFudE51bWVyaWNSYXRpb25hbCA9IHtcbiAgICB0b2tlbjogXCJjb25zdGFudC5udW1lcmljXCIsIC8vcmF0aW9uYWwgKyBjb21wbGV4XG4gICAgcmVnZXg6IC9cXGIoW1xcZF0rKD86Wy4vXVtcXGRdKyk/cmk/KVxcYi9cbn07XG5cbnZhciBjb25zdGFudE51bWVyaWNDb21wbGV4ID0gZXhwb3J0cy5jb25zdGFudE51bWVyaWNDb21wbGV4ID0ge1xuICAgIHRva2VuOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy9zaW1wbGUgY29tcGxleCBudW1iZXJzXG4gICAgcmVnZXg6IC9cXGIoW1xcZF1pKVxcYi9cbn07XG5cbnZhciBjb25zdGFudE51bWVyaWNGbG9hdCA9IGV4cG9ydHMuY29uc3RhbnROdW1lcmljRmxvYXQgPSB7XG4gICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZmxvYXQgKyBjb21wbGV4XG4gICAgcmVnZXggOiBcIlsrLV0/XFxcXGQoPzpcXFxcZHxfKD89XFxcXGQpKSooPzooPzpcXFxcLlxcXFxkKD86XFxcXGR8Xyg/PVxcXFxkKSkqKT8oPzpbZUVdWystXT9cXFxcZCspPyk/aT9cXFxcYlwiXG59O1xuXG52YXIgaW5zdGFuY2VWYXJpYWJsZSA9IGV4cG9ydHMuaW5zdGFuY2VWYXJpYWJsZSA9IHtcbiAgICB0b2tlbiA6IFwidmFyaWFibGUuaW5zdGFuY2VcIiwgLy8gaW5zdGFuY2UgdmFyaWFibGVcbiAgICByZWdleCA6IFwiQHsxLDJ9W2EtekEtWl9cXFxcZF0rXCJcbn07XG5cbnZhciBSdWJ5SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBidWlsdGluRnVuY3Rpb25zID0gKFxuICAgICAgICBcImFib3J0fEFycmF5fGFzc2VydHxhc3NlcnRfZXF1YWx8YXNzZXJ0X25vdF9lcXVhbHxhc3NlcnRfc2FtZXxhc3NlcnRfbm90X3NhbWV8XCIgK1xuICAgICAgICBcImFzc2VydF9uaWx8YXNzZXJ0X25vdF9uaWx8YXNzZXJ0X21hdGNofGFzc2VydF9ub19tYXRjaHxhc3NlcnRfaW5fZGVsdGF8YXNzZXJ0X3Rocm93c3xcIiArXG4gICAgICAgIFwiYXNzZXJ0X3JhaXNlfGFzc2VydF9ub3RoaW5nX3JhaXNlZHxhc3NlcnRfaW5zdGFuY2Vfb2Z8YXNzZXJ0X2tpbmRfb2Z8YXNzZXJ0X3Jlc3BvbmRfdG98XCIgK1xuICAgICAgICBcImFzc2VydF9vcGVyYXRvcnxhc3NlcnRfc2VuZHxhc3NlcnRfZGlmZmVyZW5jZXxhc3NlcnRfbm9fZGlmZmVyZW5jZXxhc3NlcnRfcmVjb2duaXplc3xcIiArXG4gICAgICAgIFwiYXNzZXJ0X2dlbmVyYXRlc3xhc3NlcnRfcmVzcG9uc2V8YXNzZXJ0X3JlZGlyZWN0ZWRfdG98YXNzZXJ0X3RlbXBsYXRlfGFzc2VydF9zZWxlY3R8XCIgK1xuICAgICAgICBcImFzc2VydF9zZWxlY3RfZW1haWx8YXNzZXJ0X3NlbGVjdF9yanN8YXNzZXJ0X3NlbGVjdF9lbmNvZGVkfGNzc19zZWxlY3R8YXRfZXhpdHxcIiArXG4gICAgICAgIFwiYXR0cnxhdHRyX3dyaXRlcnxhdHRyX3JlYWRlcnxhdHRyX2FjY2Vzc29yfGF0dHJfYWNjZXNzaWJsZXxhdXRvbG9hZHxiaW5kaW5nfGJsb2NrX2dpdmVuP3xjYWxsY2N8XCIgK1xuICAgICAgICBcImNhbGxlcnxjYXRjaHxjaG9tcHxjaG9tcCF8Y2hvcHxjaG9wIXxkZWZpbmVkP3xkZWxldGVfdmlhX3JlZGlyZWN0fGV2YWx8ZXhlY3xleGl0fFwiICtcbiAgICAgICAgXCJleGl0IXxmYWlsfEZsb2F0fGZsdW5rfGZvbGxvd19yZWRpcmVjdCF8Zm9ya3xmb3JtX2Zvcnxmb3JtX3RhZ3xmb3JtYXR8Z2V0c3xnbG9iYWxfdmFyaWFibGVzfGdzdWJ8XCIgK1xuICAgICAgICBcImdzdWIhfGdldF92aWFfcmVkaXJlY3R8aG9zdCF8aHR0cHM/fGh0dHBzIXxpbmNsdWRlfEludGVnZXJ8bGFtYmRhfGxpbmtfdG98XCIgK1xuICAgICAgICBcImxpbmtfdG9fdW5sZXNzX2N1cnJlbnR8bGlua190b19mdW5jdGlvbnxsaW5rX3RvX3JlbW90ZXxsb2FkfGxvY2FsX3ZhcmlhYmxlc3xsb29wfG9wZW58b3Blbl9zZXNzaW9ufFwiICtcbiAgICAgICAgXCJwfHByaW50fHByaW50Znxwcm9jfHB1dGN8cHV0c3xwb3N0X3ZpYV9yZWRpcmVjdHxwdXRfdmlhX3JlZGlyZWN0fHJhaXNlfHJhbmR8XCIgK1xuICAgICAgICBcInJhd3xyZWFkbGluZXxyZWFkbGluZXN8cmVkaXJlY3Q/fHJlcXVlc3RfdmlhX3JlZGlyZWN0fHJlcXVpcmV8c2NhbnxzZWxlY3R8XCIgK1xuICAgICAgICBcInNldF90cmFjZV9mdW5jfHNsZWVwfHNwbGl0fHNwcmludGZ8c3JhbmR8U3RyaW5nfHN0eWxlc2hlZXRfbGlua190YWd8c3lzY2FsbHxzeXN0ZW18c3VifHN1YiF8dGVzdHxcIiArXG4gICAgICAgIFwidGhyb3d8dHJhY2VfdmFyfHRyYXB8dW50cmFjZV92YXJ8YXRhbjJ8Y29zfGV4cHxmcmV4cHxsZGV4cHxsb2d8bG9nMTB8c2lufHNxcnR8dGFufFwiICtcbiAgICAgICAgXCJyZW5kZXJ8amF2YXNjcmlwdF9pbmNsdWRlX3RhZ3xjc3JmX21ldGFfdGFnfGxhYmVsX3RhZ3x0ZXh0X2ZpZWxkX3RhZ3xzdWJtaXRfdGFnfGNoZWNrX2JveF90YWd8XCIgK1xuICAgICAgICBcImNvbnRlbnRfdGFnfHJhZGlvX2J1dHRvbl90YWd8dGV4dF9hcmVhX3RhZ3xwYXNzd29yZF9maWVsZF90YWd8aGlkZGVuX2ZpZWxkX3RhZ3xcIiArXG4gICAgICAgIFwiZmllbGRzX2ZvcnxzZWxlY3RfdGFnfG9wdGlvbnNfZm9yX3NlbGVjdHxvcHRpb25zX2Zyb21fY29sbGVjdGlvbl9mb3Jfc2VsZWN0fGNvbGxlY3Rpb25fc2VsZWN0fFwiICtcbiAgICAgICAgXCJ0aW1lX3pvbmVfc2VsZWN0fHNlbGVjdF9kYXRlfHNlbGVjdF90aW1lfHNlbGVjdF9kYXRldGltZXxkYXRlX3NlbGVjdHx0aW1lX3NlbGVjdHxkYXRldGltZV9zZWxlY3R8XCIgK1xuICAgICAgICBcInNlbGVjdF95ZWFyfHNlbGVjdF9tb250aHxzZWxlY3RfZGF5fHNlbGVjdF9ob3VyfHNlbGVjdF9taW51dGV8c2VsZWN0X3NlY29uZHxmaWxlX2ZpZWxkX3RhZ3xcIiArXG4gICAgICAgIFwiZmlsZV9maWVsZHxyZXNwb25kX3RvfHNraXBfYmVmb3JlX2ZpbHRlcnxhcm91bmRfZmlsdGVyfGFmdGVyX2ZpbHRlcnx2ZXJpZnl8XCIgK1xuICAgICAgICBcInByb3RlY3RfZnJvbV9mb3JnZXJ5fHJlc2N1ZV9mcm9tfGhlbHBlcl9tZXRob2R8cmVkaXJlY3RfdG98YmVmb3JlX2ZpbHRlcnxcIiArXG4gICAgICAgIFwic2VuZF9kYXRhfHNlbmRfZmlsZXx2YWxpZGF0ZXNfcHJlc2VuY2Vfb2Z8dmFsaWRhdGVzX3VuaXF1ZW5lc3Nfb2Z8dmFsaWRhdGVzX2xlbmd0aF9vZnxcIiArXG4gICAgICAgIFwidmFsaWRhdGVzX2Zvcm1hdF9vZnx2YWxpZGF0ZXNfYWNjZXB0YW5jZV9vZnx2YWxpZGF0ZXNfYXNzb2NpYXRlZHx2YWxpZGF0ZXNfZXhjbHVzaW9uX29mfFwiICtcbiAgICAgICAgXCJ2YWxpZGF0ZXNfaW5jbHVzaW9uX29mfHZhbGlkYXRlc19udW1lcmljYWxpdHlfb2Z8dmFsaWRhdGVzX3dpdGh8dmFsaWRhdGVzX2VhY2h8XCIgK1xuICAgICAgICBcImF1dGhlbnRpY2F0ZV9vcl9yZXF1ZXN0X3dpdGhfaHR0cF9iYXNpY3xhdXRoZW50aWNhdGVfb3JfcmVxdWVzdF93aXRoX2h0dHBfZGlnZXN0fFwiICtcbiAgICAgICAgXCJmaWx0ZXJfcGFyYW1ldGVyX2xvZ2dpbmd8bWF0Y2h8Z2V0fHBvc3R8cmVzb3VyY2VzfHJlZGlyZWN0fHNjb3BlfGFzc2VydF9yb3V0aW5nfFwiICtcbiAgICAgICAgXCJ0cmFuc2xhdGV8bG9jYWxpemV8ZXh0cmFjdF9sb2NhbGVfZnJvbV90bGR8Y2FjaGVzX3BhZ2V8ZXhwaXJlX3BhZ2V8Y2FjaGVzX2FjdGlvbnxleHBpcmVfYWN0aW9ufFwiICtcbiAgICAgICAgXCJjYWNoZXxleHBpcmVfZnJhZ21lbnR8ZXhwaXJlX2NhY2hlX2ZvcnxvYnNlcnZlfGNhY2hlX3N3ZWVwZXJ8XCIgK1xuICAgICAgICBcImhhc19tYW55fGhhc19vbmV8YmVsb25nc190b3xoYXNfYW5kX2JlbG9uZ3NfdG9fbWFueXxwfHdhcm58cmVmaW5lfHVzaW5nfG1vZHVsZV9mdW5jdGlvbnxleHRlbmR8YWxpYXNfbWV0aG9kfFwiICtcbiAgICAgICAgXCJwcml2YXRlX2NsYXNzX21ldGhvZHxyZW1vdmVfbWV0aG9kfHVuZGVmX21ldGhvZFwiXG4gICAgKTtcblxuICAgIHZhciBrZXl3b3JkcyA9IChcbiAgICAgICAgXCJhbGlhc3xhbmR8QkVHSU58YmVnaW58YnJlYWt8Y2FzZXxjbGFzc3xkZWZ8ZGVmaW5lZHxkb3xlbHNlfGVsc2lmfEVORHxlbmR8ZW5zdXJlfFwiICtcbiAgICAgICAgXCJfX0ZJTEVfX3xmaW5hbGx5fGZvcnxnZW18aWZ8aW58X19MSU5FX198bW9kdWxlfG5leHR8bm90fG9yfHByaXZhdGV8cHJvdGVjdGVkfHB1YmxpY3xcIiArXG4gICAgICAgIFwicmVkb3xyZXNjdWV8cmV0cnl8cmV0dXJufHN1cGVyfHRoZW58dW5kZWZ8dW5sZXNzfHVudGlsfHdoZW58d2hpbGV8eWllbGR8X19FTkNPRElOR19ffHByZXBlbmRcIlxuICAgICk7XG5cbiAgICB2YXIgYnVpbGRpbkNvbnN0YW50cyA9IChcbiAgICAgICAgXCJ0cnVlfFRSVUV8ZmFsc2V8RkFMU0V8bmlsfE5JTHxBUkdGfEFSR1Z8REFUQXxFTlZ8UlVCWV9QTEFURk9STXxSVUJZX1JFTEVBU0VfREFURXxcIiArXG4gICAgICAgIFwiUlVCWV9WRVJTSU9OfFNUREVSUnxTVERJTnxTVERPVVR8VE9QTEVWRUxfQklORElOR3xSVUJZX1BBVENITEVWRUx8UlVCWV9SRVZJU0lPTnxSVUJZX0NPUFlSSUdIVHxSVUJZX0VOR0lORXxSVUJZX0VOR0lORV9WRVJTSU9OfFJVQllfREVTQ1JJUFRJT05cIlxuICAgICk7XG5cbiAgICB2YXIgYnVpbHRpblZhcmlhYmxlcyA9IChcbiAgICAgICAgXCIkREVCVUd8JGRlZm91dHwkRklMRU5BTUV8JExPQURfUEFUSHwkU0FGRXwkc3RkaW58JHN0ZG91dHwkc3RkZXJyfCRWRVJCT1NFfFwiICtcbiAgICAgICAgXCIkIXxyb290X3VybHxmbGFzaHxzZXNzaW9ufGNvb2tpZXN8cGFyYW1zfHJlcXVlc3R8cmVzcG9uc2V8bG9nZ2VyfHNlbGZcIlxuICAgICk7XG5cbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuJGtleXdvcmRzID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRzLFxuICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IGJ1aWxkaW5Db25zdGFudHMsXG4gICAgICAgIFwidmFyaWFibGUubGFuZ3VhZ2VcIjogYnVpbHRpblZhcmlhYmxlcyxcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6IGJ1aWx0aW5GdW5jdGlvbnMsXG4gICAgICAgIFwiaW52YWxpZC5kZXByZWNhdGVkXCI6IFwiZGVidWdnZXJcIiAvLyBUT0RPIGlzIHRoaXMgYSByZW1uYW50IGZyb20ganMgbW9kZT9cbiAgICB9LCBcImlkZW50aWZpZXJcIik7XG5cbiAgICB2YXIgZXNjYXBlZENoYXJzID0gXCJcXFxcXFxcXCg/Om4oPzpbMS03XVswLTddezAsMn18MCl8W25zcnR2ZmJhZSdcXFwiXFxcXFxcXFxdfGMoPzpcXFxcXFxcXE0tKT8ufE0tKD86XFxcXFxcXFxDLXxcXFxcXFxcXGMpPy58Qy0oPzpcXFxcXFxcXE0tKT8ufFswLTddezN9fHhbXFxcXGRhLWZBLUZdezJ9fHVbXFxcXGRhLWZBLUZdezR9fHV7W1xcXFxkYS1mQS1GXXsxLDZ9KD86XFxcXHNbXFxcXGRhLWZBLUZdezEsNn0pKn0pXCI7XG5cbiAgICB2YXIgY2xvc2VQYXJlbiA9IHtcbiAgICAgICAgXCIoXCI6IFwiKVwiLFxuICAgICAgICBcIltcIjogXCJdXCIsXG4gICAgICAgIFwie1wiOiBcIn1cIixcbiAgICAgICAgXCI8XCI6IFwiPlwiLFxuICAgICAgICBcIl5cIjogXCJeXCIsXG4gICAgICAgIFwifFwiOiBcInxcIixcbiAgICAgICAgXCIlXCI6IFwiJVwiXG4gICAgfTtcbiAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIjLiokXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50Lm11bHRpbGluZVwiLCAvLyBtdWx0aSBsaW5lIGNvbW1lbnRcbiAgICAgICAgICAgICAgICByZWdleDogXCJePWJlZ2luKD89JHxcXFxccy4qJClcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcImNvbW1lbnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5yZWdleHBcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1svXSg/PS4qXFwvKS8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJyZWdleFwiXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXCJjb25zdGFudC5vdGhlci5zeW1ib2wucnVieVwiLCBcInN0cmluZy5zdGFydFwiXSxcbiAgICAgICAgICAgICAgICByZWdleDogLyg6KT8oXCIpLyxcbiAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IGVzY2FwZWRDaGFyc1xuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicGFyZW4uc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8jey8sXG4gICAgICAgICAgICAgICAgICAgIHB1c2g6IFwic3RhcnRcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogL1wiLyxcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIixcbiAgICAgICAgICAgICAgICByZWdleDogL2AvLFxuICAgICAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogZXNjYXBlZENoYXJzXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogLyN7LyxcbiAgICAgICAgICAgICAgICAgICAgcHVzaDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvYC8sXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcImNvbnN0YW50Lm90aGVyLnN5bWJvbC5ydWJ5XCIsIFwic3RyaW5nLnN0YXJ0XCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvKDopPygnKS8sXG4gICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxcXFsnXFxcXF0vXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuZW5kXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvJy8sXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnN0YXJ0XCIsLy9kb2Vzbid0IHNlZSBhbnkgZGlmZmVyZW5jZXMgYmV0d2VlbiBzdHJpbmdzIGFuZCBhcnJheSBvZiBzdHJpbmdzIGluIGhpZ2hsaWdodGluZ1xuICAgICAgICAgICAgICAgIHJlZ2V4OiAvJVtxd3hdKFsoXFxbPHtefCVdKS8sIG9uTWF0Y2g6IGZ1bmN0aW9uICh2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVuID0gdmFsW3ZhbC5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdChwYXJlbiwgc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcInFTdGF0ZVdpdGhvdXRJbnRlcnBvbGF0aW9uXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIiwgLy9kb2Vzbid0IHNlZSBhbnkgZGlmZmVyZW5jZXMgYmV0d2VlbiBzdHJpbmdzIGFuZCBhcnJheSBvZiBzdHJpbmdzIGluIGhpZ2hsaWdodGluZ1xuICAgICAgICAgICAgICAgIHJlZ2V4OiAvJVtRV1hdPyhbKFxcWzx7XnwlXSkvLCBvbk1hdGNoOiBmdW5jdGlvbiAodmFsLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWNrLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrID0gW107XG4gICAgICAgICAgICAgICAgICAgIHZhciBwYXJlbiA9IHZhbFt2YWwubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQocGFyZW4sIHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJxU3RhdGVXaXRoSW50ZXJwb2xhdGlvblwiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQub3RoZXIuc3ltYm9sLnJ1YnlcIiwgLy9kb2Vzbid0IHNlZSBhbnkgZGlmZmVyZW5jZXMgYmV0d2VlbiBzeW1ib2xzIGFuZCBhcnJheSBvZiBzeW1ib2xzIGluIGhpZ2hsaWdodGluZ1xuICAgICAgICAgICAgICAgIHJlZ2V4OiAvJVtzaV0oWyhcXFs8e158JV0pLywgb25NYXRjaDogZnVuY3Rpb24gKHZhbCwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFjayA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW4gPSB2YWxbdmFsLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHBhcmVuLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IFwic1N0YXRlV2l0aG91dEludGVycG9sYXRpb25cIjtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm90aGVyLnN5bWJvbC5ydWJ5XCIsIC8vZG9lc24ndCBzZWUgYW55IGRpZmZlcmVuY2VzIGJldHdlZW4gc3ltYm9scyBhbmQgYXJyYXkgb2Ygc3ltYm9scyBpbiBoaWdobGlnaHRpbmdcbiAgICAgICAgICAgICAgICByZWdleDogLyVbU0ldKFsoXFxbPHtefCVdKS8sIG9uTWF0Y2g6IGZ1bmN0aW9uICh2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVuID0gdmFsW3ZhbC5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdChwYXJlbiwgc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcInNTdGF0ZVdpdGhJbnRlcnBvbGF0aW9uXCI7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucmVnZXhwXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8lW3JdKFsoXFxbPHtefCVdKS8sIG9uTWF0Y2g6IGZ1bmN0aW9uICh2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2sgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVuID0gdmFsW3ZhbC5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdChwYXJlbiwgc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcInJTdGF0ZVwiO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XSxcblxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uXCIsIC8vIG5hbWVzcGFjZXMgYXJlbid0IHN5bWJvbHNcbiAgICAgICAgICAgICAgICByZWdleDogXCI6OlwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaW5zdGFuY2VWYXJpYWJsZSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5nbG9iYWxcIiwgLy8gZ2xvYmFsIHZhcmlhYmxlXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiWyRdW2EtekEtWl9cXFxcZF0rXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdXBwb3J0LmNsYXNzXCIsIC8vIGNsYXNzIG5hbWVcbiAgICAgICAgICAgICAgICByZWdleDogXCJbQS1aXVthLXpBLVpfXFxcXGRdKlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsIFwic3VwcG9ydC5mdW5jdGlvblwiXSxcbiAgICAgICAgICAgICAgICByZWdleDogLyhcXC4pKFthLXpBLVpfXFxkXSspKD89XFwoKS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogW1wicHVuY3R1YXRpb24ub3BlcmF0b3JcIiwgXCJpZGVudGlmaWVyXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvKFxcLikoW2EtekEtWl9dW2EtekEtWl9cXGRdKikvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmNoYXJhY3RlclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxCXFxcXD8oPzpcIiArIGVzY2FwZWRDaGFycyArIFwifFxcXFxTKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcPyg/PS4rOikvXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBjb25zdGFudE51bWVyaWNSYXRpb25hbCxcbiAgICAgICAgICAgIGNvbnN0YW50TnVtZXJpY0NvbXBsZXgsXG4gICAgICAgICAgICBjb25zdGFudE90aGVyU3ltYm9sLFxuICAgICAgICAgICAgY29uc3RhbnROdW1lcmljSGV4LFxuICAgICAgICAgICAgY29uc3RhbnROdW1lcmljRmxvYXQsXG4gICAgICAgICAgICBjb25zdGFudE51bWVyaWNCaW5hcnksXG4gICAgICAgICAgICBjb25zdGFudE51bWVyaWNEZWNpbWFsLFxuICAgICAgICAgICAgY29uc3RhbnROdW1lcmljT2N0YWwsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuYm9vbGVhblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIig/OnRydWV8ZmFsc2UpXFxcXGJcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlthLXpBLVpfJF1bYS16QS1aMC05XyRdKlxcXFxiXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5zZXBhcmF0b3Iua2V5LXZhbHVlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiPT5cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHN0YXRlTmFtZTogXCJoZXJlZG9jXCIsXG4gICAgICAgICAgICAgICAgb25NYXRjaDogZnVuY3Rpb24gKHZhbHVlLCBjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0ID0gKHZhbHVlWzJdID09ICctJyB8fCB2YWx1ZVsyXSA9PSAnficpID8gXCJpbmRlbnRlZEhlcmVkb2NcIiA6IFwiaGVyZWRvY1wiO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdG9rZW5zID0gdmFsdWUuc3BsaXQodGhpcy5zcGxpdFJlZ2V4KTtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sucHVzaChuZXh0LCB0b2tlbnNbM10pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICAgICAge3R5cGU6IFwiY29uc3RhbnRcIiwgdmFsdWU6IHRva2Vuc1sxXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHlwZTogXCJzdHJpbmdcIiwgdmFsdWU6IHRva2Vuc1syXX0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7dHlwZTogXCJzdXBwb3J0LmNsYXNzXCIsIHZhbHVlOiB0b2tlbnNbM119LFxuICAgICAgICAgICAgICAgICAgICAgICAge3R5cGU6IFwic3RyaW5nXCIsIHZhbHVlOiB0b2tlbnNbNF19XG4gICAgICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICByZWdleDogXCIoPDxbLX5dPykoWydcXFwiYF0/KShbXFxcXHddKykoWydcXFwiYF0/KVwiLFxuICAgICAgICAgICAgICAgIHJ1bGVzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlcmVkb2M6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gc3RhY2tbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2tbMF0gfHwgXCJzdGFydFwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJzdXBwb3J0LmNsYXNzXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiLiokXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICAgICAgICAgIGluZGVudGVkSGVyZWRvYzogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiXiArXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgb25NYXRjaDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IHN0YWNrWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrWzBdIHx8IFwic3RhcnRcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3VwcG9ydC5jbGFzc1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIi4qJFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJzdGFydFwiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIiRcIixcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJlbXB0eVwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IGZ1bmN0aW9uKGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YWNrWzBdID09PSBcImhlcmVkb2NcIiB8fCBzdGFja1swXSA9PT0gXCJpbmRlbnRlZEhlcmVkb2NcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGFja1swXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRTdGF0ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIhfFxcXFwkfCV8JnxcXFxcKnwvfFxcXFwtXFxcXC18XFxcXC18XFxcXCtcXFxcK3xcXFxcK3x+fD09PXw9PXw9fCE9fCE9PXw8PXw+PXw8PD18Pj49fD4+Pj18PD58PHw+fCF8JiZ8XFxcXHxcXFxcfHxcXFxcP1xcXFw6fFxcXFwqPXwlPXxcXFxcKz18XFxcXC09fCY9fFxcXFxePXxcXFxcfHxcXFxcYig/OmlufGluc3RhbmNlb2Z8bmV3fGRlbGV0ZXx0eXBlb2Z8dm9pZClcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIltbKHtdXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5ycGFyZW5cIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJbXFxcXF0pfV1cIixcbiAgICAgICAgICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlID09IFwifVwiICYmIHN0YWNrLmxlbmd0aCA+IDEgJiYgc3RhY2tbMV0gIT0gXCJzdGFydFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1s/Oiw7Ll0vXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwiY29tbWVudFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5tdWx0aWxpbmVcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXj1lbmQoPz0kfFxcXFxzLiokKVwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnRcIiwgLy8gY29tbWVudCBzcGFubmluZyB3aG9sZSBsaW5lXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiLitcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInFTdGF0ZVdpdGhJbnRlcnBvbGF0aW9uXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuc3RhcnRcIiwvLyBleGNsdWRlZCBuZXN0ZWQgfF4lIGR1ZSB0byBkaWZmaWN1bHR5IGluIHJlYWxpemF0aW9uXG4gICAgICAgICAgICByZWdleDogL1soXFxbPHtdLywgb25NYXRjaDogZnVuY3Rpb24gKHZhbCwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCAmJiB2YWwgPT09IHN0YWNrWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodmFsLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdHJpbmdcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleDogZXNjYXBlZENoYXJzXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXFxcLi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4uc3RhcnRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvI3svLFxuICAgICAgICAgICAgcHVzaDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5lbmRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvWylcXF0+fV58JV0vLCBvbk1hdGNoOiBmdW5jdGlvbiAodmFsLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoICYmIHZhbCA9PT0gY2xvc2VQYXJlbltzdGFja1swXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9ICcnO1xuICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwicVN0YXRlV2l0aG91dEludGVycG9sYXRpb25cIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5zdGFydFwiLC8vIGV4Y2x1ZGVkIG5lc3RlZCB8XiUgZHVlIHRvIGRpZmZpY3VsdHkgaW4gcmVhbGl6YXRpb25cbiAgICAgICAgICAgIHJlZ2V4OiAvWyhcXFs8e10vLCBvbk1hdGNoOiBmdW5jdGlvbiAodmFsLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoICYmIHZhbCA9PT0gc3RhY2tbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh2YWwsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBcInN0cmluZ1wiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxcXFsnXFxcXF0vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXFxcLi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmVuZFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9bKVxcXT59XnwlXS8sIG9uTWF0Y2g6IGZ1bmN0aW9uICh2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGggJiYgdmFsID09PSBjbG9zZVBhcmVuW3N0YWNrWzBdXSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gJyc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwic3RyaW5nXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJzU3RhdGVXaXRob3V0SW50ZXJwb2xhdGlvblwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQub3RoZXIuc3ltYm9sLnJ1YnlcIiwvLyBleGNsdWRlZCBuZXN0ZWQgfF4lIGR1ZSB0byBkaWZmaWN1bHR5IGluIHJlYWxpemF0aW9uXG4gICAgICAgICAgICByZWdleDogL1soXFxbPHtdLywgb25NYXRjaDogZnVuY3Rpb24gKHZhbCwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCAmJiB2YWwgPT09IHN0YWNrWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodmFsLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjb25zdGFudC5vdGhlci5zeW1ib2wucnVieVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5vdGhlci5zeW1ib2wucnVieVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9bKVxcXT59XnwlXS8sIG9uTWF0Y2g6IGZ1bmN0aW9uICh2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGggJiYgdmFsID09PSBjbG9zZVBhcmVuW3N0YWNrWzBdXSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gJyc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY29uc3RhbnQub3RoZXIuc3ltYm9sLnJ1YnlcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbnN0YW50Lm90aGVyLnN5bWJvbC5ydWJ5XCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwic1N0YXRlV2l0aEludGVycG9sYXRpb25cIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm90aGVyLnN5bWJvbC5ydWJ5XCIsLy8gZXhjbHVkZWQgbmVzdGVkIHxeJSBkdWUgdG8gZGlmZmljdWx0eSBpbiByZWFsaXphdGlvblxuICAgICAgICAgICAgcmVnZXg6IC9bKFxcWzx7XS8sIG9uTWF0Y2g6IGZ1bmN0aW9uICh2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIGlmIChzdGFjay5sZW5ndGggJiYgdmFsID09PSBzdGFja1swXSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KHZhbCwgc3RhdGUpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiY29uc3RhbnQub3RoZXIuc3ltYm9sLnJ1YnlcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleDogZXNjYXBlZENoYXJzXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXg6IC9cXFxcLi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4uc3RhcnRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvI3svLFxuICAgICAgICAgICAgcHVzaDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lm90aGVyLnN5bWJvbC5ydWJ5XCIsXG4gICAgICAgICAgICByZWdleDogL1spXFxdPn1efCVdLywgb25NYXRjaDogZnVuY3Rpb24gKHZhbCwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCAmJiB2YWwgPT09IGNsb3NlUGFyZW5bc3RhY2tbMF1dKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSAnJztcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjb25zdGFudC5vdGhlci5zeW1ib2wucnVieVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29uc3RhbnQub3RoZXIuc3ltYm9sLnJ1YnlcIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJyU3RhdGVcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5yZWdleHBcIiwvLyBleGNsdWRlZCBuZXN0ZWQgfF4lIGR1ZSB0byBkaWZmaWN1bHR5IGluIHJlYWxpemF0aW9uXG4gICAgICAgICAgICByZWdleDogL1soXFxbPHtdLywgb25NYXRjaDogZnVuY3Rpb24gKHZhbCwgc3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YWNrLmxlbmd0aCAmJiB2YWwgPT09IHN0YWNrWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodmFsLCBzdGF0ZSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4uc3RhcnRcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvI3svLFxuICAgICAgICAgICAgcHVzaDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5yZWdleHBcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFwvL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcucmVnZXhwXCIsXG4gICAgICAgICAgICByZWdleDogL1spXFxdPn1efCVdW2lteG91ZXNuXSovLCBvbk1hdGNoOiBmdW5jdGlvbiAodmFsLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICBpZiAoc3RhY2subGVuZ3RoICYmIHZhbFswXSA9PT0gY2xvc2VQYXJlbltzdGFja1swXV0pIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9ICcnO1xuICAgICAgICAgICAgICAgIHJldHVybiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAgICAge2luY2x1ZGU6IFwicmVnZXhcIn0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZy5yZWdleHBcIlxuICAgICAgICAgICAgfV0sXG4gICAgICAgIFwicmVnZXhcIjogW1xuICAgICAgICAgICAgey8vIGNoYXJhY3RlciBjbGFzc2VzXG4gICAgICAgICAgICAgICAgdG9rZW46IFwicmVnZXhwLmtleXdvcmRcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcXFxbd1dkRGhIc1NdL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxcXFtBR2JCelpdL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxcXGc8W2EtekEtWjAtOV0qPi9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogW1wiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsIFwicmVnZXhwLmtleXdvcmRcIiwgXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8oXFxcXHB7XFxePykoQWxudW18QWxwaGF8Qmxhbmt8Q250cmx8RGlnaXR8R3JhcGh8TG93ZXJ8UHJpbnR8UHVuY3R8U3BhY2V8VXBwZXJ8WERpZ2l0fFdvcmR8QVNDSUl8QW55fEFzc2lnbmVkfEFyYWJpY3xBcm1lbmlhbnxCYWxpbmVzZXxCZW5nYWxpfEJvcG9tb2ZvfEJyYWlsbGV8QnVnaW5lc2V8QnVoaWR8Q2FuYWRpYW5fQWJvcmlnaW5hbHxDYXJpYW58Q2hhbXxDaGVyb2tlZXxDb21tb258Q29wdGljfEN1bmVpZm9ybXxDeXByaW90fEN5cmlsbGljfERlc2VyZXR8RGV2YW5hZ2FyaXxFdGhpb3BpY3xHZW9yZ2lhbnxHbGFnb2xpdGljfEdvdGhpY3xHcmVla3xHdWphcmF0aXxHdXJtdWtoaXxIYW58SGFuZ3VsfEhhbnVub298SGVicmV3fEhpcmFnYW5hfEluaGVyaXRlZHxLYW5uYWRhfEthdGFrYW5hfEtheWFoX0xpfEtoYXJvc2h0aGl8S2htZXJ8TGFvfExhdGlufExlcGNoYXxMaW1idXxMaW5lYXJfQnxMeWNpYW58THlkaWFufE1hbGF5YWxhbXxNb25nb2xpYW58TXlhbm1hcnxOZXdfVGFpX0x1ZXxOa298T2doYW18T2xfQ2hpa2l8T2xkX0l0YWxpY3xPbGRfUGVyc2lhbnxPcml5YXxPc21hbnlhfFBoYWdzX1BhfFBob2VuaWNpYW58UmVqYW5nfFJ1bmljfFNhdXJhc2h0cmF8U2hhdmlhbnxTaW5oYWxhfFN1bmRhbmVzZXxTeWxvdGlfTmFncml8U3lyaWFjfFRhZ2Fsb2d8VGFnYmFud2F8VGFpX0xlfFRhbWlsfFRlbHVndXxUaGFhbmF8VGhhaXxUaWJldGFufFRpZmluYWdofFVnYXJpdGljfFZhaXxZaXxMbHxMbXxMdHxMdXxMb3xNbnxNY3xNZXxOZHxObHxQY3xQZHxQc3xQZXxQaXxQZnxQb3xOb3xTbXxTY3xTa3xTb3xac3xabHxacHxDY3xDZnxDbnxDb3xDc3xOfEx8TXxQfFN8WnxDKSh9KS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogW1wiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsIFwiaW52YWxpZFwiLCBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiXSxcbiAgICAgICAgICAgICAgICByZWdleDogLyhcXFxccHtcXF4/KShbXi9dKikofSkvXG4gICAgICAgICAgICB9LCB7Ly8gZXNjYXBlc1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInJlZ2V4cC5rZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXFxcXFwoPzp1W1xcXFxkYS1mQS1GXXs0fXx4W1xcXFxkYS1mQS1GXXsyfXwuKVwiXG4gICAgICAgICAgICB9LCB7Ly8gZmxhZ1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5yZWdleHBcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1svXVtpbXhvdWVzbl0qLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHsvLyBpbnZhbGlkIG9wZXJhdG9yc1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImludmFsaWRcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xce1xcZCtcXGIsP1xcZCpcXH1bKypdfFsrKiReP11bKypdfFskXl1bP118XFw/ezMsfS9cbiAgICAgICAgICAgIH0sIHsvLyBvcGVyYXRvcnNcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcKFxcPyg/Ols6PSE+XXw8Jz9bYS16QS1aXSonPz58PFs9IV0pfFxcKXxcXHtcXGQrXFxiLD9cXGQqXFx9fFsrKl1cXD98WygpJF4rKj8uXS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5kZWxpbWl0ZXJcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcfC9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJyZWdleHAua2V5d29yZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxbXFxbOig/OmFsbnVtfGFscGhhfGJsYW5rfGNudHJsfGRpZ2l0fGdyYXBofGxvd2VyfHByaW50fHB1bmN0fHNwYWNlfHVwcGVyfHhkaWdpdHx3b3JkfGFzY2lpKTpcXF1cXF0vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXFtcXF4/LyxcbiAgICAgICAgICAgICAgICBwdXNoOiBcInJlZ2V4X2NoYXJhY3Rlcl9jbGFzc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZy5yZWdleHBcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInJlZ2V4X2NoYXJhY3Rlcl9jbGFzc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gY2hhcmFjdGVyIGNsYXNzZXNcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJyZWdleHAua2V5d29yZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxcXFt3V2REaEhzU10vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicmVnZXhwLmNoYXJjbGFzcy5rZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXFxcXFwoPzp1W1xcXFxkYS1mQS1GXXs0fXx4W1xcXFxkYS1mQS1GXXsyfXwuKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8mPyY/XFxbXFxePy8sXG4gICAgICAgICAgICAgICAgcHVzaDogXCJyZWdleF9jaGFyYWN0ZXJfY2xhc3NcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIl1cIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiLVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZy5yZWdleHAuY2hhcmFjdGVyY2xhc3NcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhSdWJ5SGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuUnVieUhpZ2hsaWdodFJ1bGVzID0gUnVieUhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9