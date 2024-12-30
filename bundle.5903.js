"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5903],{

/***/ 15903:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var DocCommentHighlightRules = (__webpack_require__(4969)/* .JsDocCommentHighlightRules */ .U);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

// TODO: Unicode escape sequences
var identifierRe = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*";

var JavaScriptHighlightRules = function(options) {
    // see: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects
    
    var keywords = {
        "variable.language":
            "Array|Boolean|Date|Function|Iterator|Number|Object|RegExp|String|Proxy|Symbol|"  + // Constructors
            "Namespace|QName|XML|XMLList|"                                             + // E4X
            "ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|"   +
            "Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray|"                    +
            "Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|"   + // Errors
            "SyntaxError|TypeError|URIError|"                                          +
            "decodeURI|decodeURIComponent|encodeURI|encodeURIComponent|eval|isFinite|" + // Non-constructor functions
            "isNaN|parseFloat|parseInt|"                                               +
            "JSON|Math|"                                                               + // Other
            "this|arguments|prototype|window|document"                                 , // Pseudo
        "keyword":
            "const|yield|import|get|set|async|await|" +
            "break|case|catch|continue|default|delete|do|else|finally|for|" +
            "if|in|of|instanceof|new|return|switch|throw|try|typeof|let|var|while|with|debugger|" +
            // invalid or reserved
            "__parent__|__count__|escape|unescape|with|__proto__|" +
            "class|enum|extends|super|export|implements|private|public|interface|package|protected|static|constructor",
        "storage.type":
            "const|let|var|function",
        "constant.language":
            "null|Infinity|NaN|undefined",
        "support.function":
            "alert",
        "constant.language.boolean": "true|false"
    };
    
    var keywordMapper = this.createKeywordMapper(keywords, "identifier");

    // keywords which can be followed by regular expressions
    var kwBeforeRe = "case|do|else|finally|in|instanceof|return|throw|try|typeof|yield|void";

    var escapedRe = "\\\\(?:x[0-9a-fA-F]{2}|" + // hex
        "u[0-9a-fA-F]{4}|" + // unicode
        "u{[0-9a-fA-F]{1,6}}|" + // es6 unicode
        "[0-2][0-7]{0,2}|" + // oct
        "3[0-7][0-7]?|" + // oct
        "[4-7][0-7]?|" + //oct
        ".)";
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used
    
    var anonymousFunctionRe = "(function)(\\s*)(\\*?)";

    var functionCallStartRule = { //just simple function call
        token: ["identifier", "text", "paren.lparen"],
        regex: "(\\b(?!" + Object.values(keywords).join("|") + "\\b)" + identifierRe + ")(\\s*)(\\()"
    };

    this.$rules = {
        "no_regex" : [
            DocCommentHighlightRules.getStartRule("doc-start"),
            comments("no_regex"),
            functionCallStartRule,
            {
                token : "string",
                regex : "'(?=.)",
                next  : "qstring"
            }, {
                token : "string",
                regex : '"(?=.)',
                next  : "qqstring"
            }, {
                token : "constant.numeric", // hexadecimal, octal and binary
                regex : /0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/
            }, {
                token : "constant.numeric", // decimal integers and floats
                regex : /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/
            }, {
                // play = function() {  }
                token : [
                    "entity.name.function", "text", "keyword.operator", "text", "storage.type",
                    "text", "storage.type", "text", "paren.lparen"
                ],
                regex : "(" + identifierRe +")(\\s*)(=)(\\s*)" + anonymousFunctionRe + "(\\s*)(\\()",
                next: "function_arguments"
            }, {
                // function myFunc(arg) { }
                token : [
                    "storage.type", "text", "storage.type", "text", "text", "entity.name.function", "text", "paren.lparen"
                ],
                regex : "(function)(?:(?:(\\s*)(\\*)(\\s*))|(\\s+))(" + identifierRe + ")(\\s*)(\\()",
                next: "function_arguments"
            }, {
                // foobar: function() { }
                token : [
                    "entity.name.function", "text", "punctuation.operator",
                    "text", "storage.type", "text", "storage.type", "text", "paren.lparen"
                ],
                regex : "(" + identifierRe + ")(\\s*)(:)(\\s*)" + anonymousFunctionRe + "(\\s*)(\\()",
                next: "function_arguments"
            }, {
                // : function() { } (this is for issues with 'foo': function() { })
                token : [
                    "text", "text", "storage.type", "text", "storage.type", "text",  "paren.lparen"
                ],
                regex : "(:)(\\s*)" + anonymousFunctionRe + "(\\s*)(\\()",
                next: "function_arguments"
            }, {
                // from "module-path" (this is the only case where 'from' should be a keyword)
                token : "keyword",
                regex : "from(?=\\s*('|\"))"
            }, {
                token : "keyword",
                regex : "(?:" + kwBeforeRe + ")\\b",
                next : "start"
            }, {
                token : "support.constant",
                regex : /that\b/
            }, {
                token : ["storage.type", "punctuation.operator", "support.function.firebug"],
                regex : /(console)(\.)(warn|info|log|error|debug|time|trace|timeEnd|assert)\b/
            }, {
                token : keywordMapper,
                regex : identifierRe
            }, {
                token : "punctuation.operator",
                regex : /[.](?![.])/,
                next  : "property"
            }, {
                token : "storage.type",
                regex : /=>/,
                next  : "start"
            }, {
                token : "keyword.operator",
                regex : /--|\+\+|\.{3}|===|==|=|!=|!==|<+=?|>+=?|!|&&|\|\||\?:|[!$%&*+\-~\/^]=?/,
                next  : "start"
            }, {
                token : "punctuation.operator",
                regex : /[?:,;.]/,
                next  : "start"
            }, {
                token : "paren.lparen",
                regex : /[\[({]/,
                next  : "start"
            }, {
                token : "paren.rparen",
                regex : /[\])}]/
            }, {
                token: "comment",
                regex: /^#!.*$/
            }
        ],
        property: [{
                token : "text",
                regex : "\\s+"
            }, {
            token: "keyword.operator",
            regex: /=/
            }, {
                // Sound.play = function() {  }
                token : [
                    "storage.type", "text", "storage.type", "text", "paren.lparen"
                ],
                regex : anonymousFunctionRe + "(\\s*)(\\()",
                next: "function_arguments"
            }, {
                // Sound.play = function play() {  }
                token: [
                    "storage.type", "text", "storage.type", "text", "text", "entity.name.function", "text", "paren.lparen"
                ],
                regex: "(function)(?:(?:(\\s*)(\\*)(\\s*))|(\\s+))(\\w+)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : "punctuation.operator",
                regex : /[.](?![.])/
            }, {
                token : "support.function",
                regex: "prototype"
            }, {
                token : "support.function",
                regex : /(s(?:h(?:ift|ow(?:Mod(?:elessDialog|alDialog)|Help))|croll(?:X|By(?:Pages|Lines)?|Y|To)?|t(?:op|rike)|i(?:n|zeToContent|debar|gnText)|ort|u(?:p|b(?:str(?:ing)?)?)|pli(?:ce|t)|e(?:nd|t(?:Re(?:sizable|questHeader)|M(?:i(?:nutes|lliseconds)|onth)|Seconds|Ho(?:tKeys|urs)|Year|Cursor|Time(?:out)?|Interval|ZOptions|Date|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Date|FullYear)|FullYear|Active)|arch)|qrt|lice|avePreferences|mall)|h(?:ome|andleEvent)|navigate|c(?:har(?:CodeAt|At)|o(?:s|n(?:cat|textual|firm)|mpile)|eil|lear(?:Timeout|Interval)?|a(?:ptureEvents|ll)|reate(?:StyleSheet|Popup|EventObject))|t(?:o(?:GMTString|S(?:tring|ource)|U(?:TCString|pperCase)|Lo(?:caleString|werCase))|est|a(?:n|int(?:Enabled)?))|i(?:s(?:NaN|Finite)|ndexOf|talics)|d(?:isableExternalCapture|ump|etachEvent)|u(?:n(?:shift|taint|escape|watch)|pdateCommands)|j(?:oin|avaEnabled)|p(?:o(?:p|w)|ush|lugins.refresh|a(?:ddings|rse(?:Int|Float)?)|r(?:int|ompt|eference))|e(?:scape|nableExternalCapture|val|lementFromPoint|x(?:p|ec(?:Script|Command)?))|valueOf|UTC|queryCommand(?:State|Indeterm|Enabled|Value)|f(?:i(?:nd|lter|le(?:ModifiedDate|Size|CreatedDate|UpdatedDate)|xed)|o(?:nt(?:size|color)|rward|rEach)|loor|romCharCode)|watch|l(?:ink|o(?:ad|g)|astIndexOf)|a(?:sin|nchor|cos|t(?:tachEvent|ob|an(?:2)?)|pply|lert|b(?:s|ort))|r(?:ou(?:nd|teEvents)|e(?:size(?:By|To)|calc|turnValue|place|verse|l(?:oad|ease(?:Capture|Events)))|andom)|g(?:o|et(?:ResponseHeader|M(?:i(?:nutes|lliseconds)|onth)|Se(?:conds|lection)|Hours|Year|Time(?:zoneOffset)?|Da(?:y|te)|UTC(?:M(?:i(?:nutes|lliseconds)|onth)|Seconds|Hours|Da(?:y|te)|FullYear)|FullYear|A(?:ttention|llResponseHeaders)))|m(?:in|ove(?:B(?:y|elow)|To(?:Absolute)?|Above)|ergeAttributes|a(?:tch|rgins|x))|b(?:toa|ig|o(?:ld|rderWidths)|link|ack))\b(?=\()/
            }, {
                token : "support.function.dom",
                regex : /(s(?:ub(?:stringData|mit)|plitText|e(?:t(?:NamedItem|Attribute(?:Node)?)|lect))|has(?:ChildNodes|Feature)|namedItem|c(?:l(?:ick|o(?:se|neNode))|reate(?:C(?:omment|DATASection|aption)|T(?:Head|extNode|Foot)|DocumentFragment|ProcessingInstruction|E(?:ntityReference|lement)|Attribute))|tabIndex|i(?:nsert(?:Row|Before|Cell|Data)|tem)|open|delete(?:Row|C(?:ell|aption)|T(?:Head|Foot)|Data)|focus|write(?:ln)?|a(?:dd|ppend(?:Child|Data))|re(?:set|place(?:Child|Data)|move(?:NamedItem|Child|Attribute(?:Node)?)?)|get(?:NamedItem|Element(?:sBy(?:Name|TagName|ClassName)|ById)|Attribute(?:Node)?)|blur)\b(?=\()/
            }, {
                token :  "support.constant",
                regex : /(s(?:ystemLanguage|cr(?:ipts|ollbars|een(?:X|Y|Top|Left))|t(?:yle(?:Sheets)?|atus(?:Text|bar)?)|ibling(?:Below|Above)|ource|uffixes|e(?:curity(?:Policy)?|l(?:ection|f)))|h(?:istory|ost(?:name)?|as(?:h|Focus))|y|X(?:MLDocument|SLDocument)|n(?:ext|ame(?:space(?:s|URI)|Prop))|M(?:IN_VALUE|AX_VALUE)|c(?:haracterSet|o(?:n(?:structor|trollers)|okieEnabled|lorDepth|mp(?:onents|lete))|urrent|puClass|l(?:i(?:p(?:boardData)?|entInformation)|osed|asses)|alle(?:e|r)|rypto)|t(?:o(?:olbar|p)|ext(?:Transform|Indent|Decoration|Align)|ags)|SQRT(?:1_2|2)|i(?:n(?:ner(?:Height|Width)|put)|ds|gnoreCase)|zIndex|o(?:scpu|n(?:readystatechange|Line)|uter(?:Height|Width)|p(?:sProfile|ener)|ffscreenBuffering)|NEGATIVE_INFINITY|d(?:i(?:splay|alog(?:Height|Top|Width|Left|Arguments)|rectories)|e(?:scription|fault(?:Status|Ch(?:ecked|arset)|View)))|u(?:ser(?:Profile|Language|Agent)|n(?:iqueID|defined)|pdateInterval)|_content|p(?:ixelDepth|ort|ersonalbar|kcs11|l(?:ugins|atform)|a(?:thname|dding(?:Right|Bottom|Top|Left)|rent(?:Window|Layer)?|ge(?:X(?:Offset)?|Y(?:Offset)?))|r(?:o(?:to(?:col|type)|duct(?:Sub)?|mpter)|e(?:vious|fix)))|e(?:n(?:coding|abledPlugin)|x(?:ternal|pando)|mbeds)|v(?:isibility|endor(?:Sub)?|Linkcolor)|URLUnencoded|P(?:I|OSITIVE_INFINITY)|f(?:ilename|o(?:nt(?:Size|Family|Weight)|rmName)|rame(?:s|Element)|gColor)|E|whiteSpace|l(?:i(?:stStyleType|n(?:eHeight|kColor))|o(?:ca(?:tion(?:bar)?|lName)|wsrc)|e(?:ngth|ft(?:Context)?)|a(?:st(?:M(?:odified|atch)|Index|Paren)|yer(?:s|X)|nguage))|a(?:pp(?:MinorVersion|Name|Co(?:deName|re)|Version)|vail(?:Height|Top|Width|Left)|ll|r(?:ity|guments)|Linkcolor|bove)|r(?:ight(?:Context)?|e(?:sponse(?:XML|Text)|adyState))|global|x|m(?:imeTypes|ultiline|enubar|argin(?:Right|Bottom|Top|Left))|L(?:N(?:10|2)|OG(?:10E|2E))|b(?:o(?:ttom|rder(?:Width|RightWidth|BottomWidth|Style|Color|TopWidth|LeftWidth))|ufferDepth|elow|ackground(?:Color|Image)))\b/
            }, {
                token : "identifier",
                regex : identifierRe
            }, {
                regex: "",
                token: "empty",
                next: "no_regex"
            }
        ],
        // regular expressions are only allowed after certain tokens. This
        // makes sure we don't mix up regexps with the divison operator
        "start": [
            DocCommentHighlightRules.getStartRule("doc-start"),
            comments("start"),
            {
                token: "string.regexp",
                regex: "\\/",
                next: "regex"
            }, {
                token : "text",
                regex : "\\s+|^$",
                next : "start"
            }, {
                // immediately return to the start mode without matching
                // anything
                token: "empty",
                regex: "",
                next: "no_regex"
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
                regex: "/[sxngimy]*",
                next: "no_regex"
            }, {
                // invalid operators
                token : "invalid",
                regex: /\{\d+\b,?\d*\}[+*]|[+*$^?][+*]|[$^][?]|\?{3,}/
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
                token: "empty",
                regex: "$",
                next: "no_regex"
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
                token: "empty",
                regex: "$",
                next: "no_regex"
            }, {
                defaultToken: "string.regexp.charachterclass"
            }
        ],
        "default_parameter": [
            {
                token : "string",
                regex : "'(?=.)",
                push: [
                    {
                        token: "string",
                        regex: "'|$",
                        next: "pop"
                    }, {
                        include: "qstring"
                    }
                ]
            }, {
                token : "string",
                regex : '"(?=.)',
                push: [
                    {
                        token: "string",
                        regex: '"|$',
                        next: "pop"
                    }, {
                        include: "qqstring"
                    }
                ]
            }, {
                token : "constant.language",
                regex : "null|Infinity|NaN|undefined"
            }, {
                token : "constant.numeric", // hexadecimal, octal and binary
                regex : /0(?:[xX][0-9a-fA-F]+|[oO][0-7]+|[bB][01]+)\b/
            }, {
                token : "constant.numeric", // decimal integers and floats
                regex : /(?:\d\d*(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+\b)?/
            }, {
                token: "punctuation.operator",
                regex: ",",
                next: "function_arguments"
            }, {
                token: "text",
                regex: "\\s+"
            }, {
                token: "punctuation.operator",
                regex: "$"
            }, {
                token: "empty",
                regex: "",
                next: "no_regex"
            }
        ],
        "function_arguments": [
            comments("function_arguments"),
            {
                token: "variable.parameter",
                regex: identifierRe
            }, {
                token: "punctuation.operator",
                regex: ","
            }, {
                token: "text",
                regex: "\\s+"
            }, {
                token: "punctuation.operator",
                regex: "$"
            }, {
                token: "empty",
                regex: "",
                next: "no_regex"
            }
        ],
        "qqstring" : [
            {
                token : "constant.language.escape",
                regex : escapedRe
            }, {
                token : "string",
                regex : "\\\\$",
                consumeLineEnd  : true
            }, {
                token : "string",
                regex : '"|$',
                next  : "no_regex"
            }, {
                defaultToken: "string"
            }
        ],
        "qstring" : [
            {
                token : "constant.language.escape",
                regex : escapedRe
            }, {
                token : "string",
                regex : "\\\\$",
                consumeLineEnd  : true
            }, {
                token : "string",
                regex : "'|$",
                next  : "no_regex"
            }, {
                defaultToken: "string"
            }
        ]
    };


    if (!options || !options.noES6) {
        this.$rules.no_regex.unshift({
            regex: "[{}]", onMatch: function(val, state, stack) {
                this.next = val == "{" ? this.nextState : "";
                if (val == "{" && stack.length) {
                    stack.unshift("start", state);
                }
                else if (val == "}" && stack.length) {
                    stack.shift();
                    this.next = stack.shift();
                    if (this.next.indexOf("string") != -1 || this.next.indexOf("jsx") != -1)
                        return "paren.quasi.end";
                }
                return val == "{" ? "paren.lparen" : "paren.rparen";
            },
            nextState: "start"
        }, {
            token : "string.quasi.start",
            regex : /`/,
            push  : [{
                token : "constant.language.escape",
                regex : escapedRe
            }, {
                token : "paren.quasi.start",
                regex : /\${/,
                push  : "start"
            }, {
                token : "string.quasi.end",
                regex : /`/,
                next  : "pop"
            }, {
                defaultToken: "string.quasi"
            }]
        }, {
            token: ["variable.parameter", "text"],
            regex: "(" + identifierRe + ")(\\s*)(?=\\=>)"
        }, {
            token: "paren.lparen",
            regex: "(\\()(?=[^\\(]+\\s*=>)",
            next: "function_arguments"
        }, {
            token: "variable.language",
            regex: "(?:(?:(?:Weak)?(?:Set|Map))|Promise)\\b"
        });

        this.$rules["function_arguments"].unshift({
            token: "keyword.operator",
            regex: "=",
            next: "default_parameter"
        }, {
            token: "keyword.operator",
            regex: "\\.{3}"
        });

        this.$rules["property"].unshift({
            token: "support.function",
            regex: "(findIndex|repeat|startsWith|endsWith|includes|isSafeInteger|trunc|cbrt|log2|log10|sign|then|catch|"
                + "finally|resolve|reject|race|any|all|allSettled|keys|entries|isInteger)\\b(?=\\()"
        }, {
            token : "constant.language",
            regex : "(?:MAX_SAFE_INTEGER|MIN_SAFE_INTEGER|EPSILON)\\b"
        });

        if (!options || options.jsx != false)
            JSX.call(this);
    }

    this.embedRules(DocCommentHighlightRules, "doc-",
        [ DocCommentHighlightRules.getEndRule("no_regex") ]);

    this.normalizeRules();
};

oop.inherits(JavaScriptHighlightRules, TextHighlightRules);

function JSX() {
    var tagRegex = identifierRe.replace("\\d", "\\d\\-");
    var jsxTag = {
        onMatch : function(val, state, stack) {
            var offset = val.charAt(1) == "/" ? 2 : 1;
            if (offset == 1) {
                if (state != this.nextState)
                    stack.unshift(this.next, this.nextState, 0);
                else
                    stack.unshift(this.next);
                stack[2]++;
            } else if (offset == 2) {
                if (state == this.nextState) {
                    stack[1]--;
                    if (!stack[1] || stack[1] < 0) {
                        stack.shift();
                        stack.shift();
                    }
                }
            }
            return [{
                type: "meta.tag.punctuation." + (offset == 1 ? "" : "end-") + "tag-open.xml",
                value: val.slice(0, offset)
            }, {
                type: "meta.tag.tag-name.xml",
                value: val.substr(offset)
            }];
        },
        regex : "</?(?:" + tagRegex + "|(?=>))",
        next: "jsxAttributes",
        nextState: "jsx"
    };
    this.$rules.start.unshift(jsxTag);
    var jsxJsRule = {
        regex: "{",
        token: "paren.quasi.start",
        push: "start"
    };
    this.$rules.jsx = [
        jsxJsRule,
        jsxTag,
        {include : "reference"}, {defaultToken: "string.xml"}
    ];
    this.$rules.jsxAttributes = [{
        token : "meta.tag.punctuation.tag-close.xml",
        regex : "/?>",
        onMatch : function(value, currentState, stack) {
            if (currentState == stack[0])
                stack.shift();
            if (value.length == 2) {
                if (stack[0] == this.nextState)
                    stack[1]--;
                if (!stack[1] || stack[1] < 0) {
                    stack.splice(0, 2);
                }
            }
            this.next = stack[0] || "start";
            return [{type: this.token, value: value}];
        },
        nextState: "jsx"
    },
    jsxJsRule,
    comments("jsxAttributes"),
    {
        token : "entity.other.attribute-name.xml",
        regex : tagRegex
    }, {
        token : "keyword.operator.attribute-equals.xml",
        regex : "="
    }, {
        token : "text.tag-whitespace.xml",
        regex : "\\s+"
    }, {
        token : "string.attribute-value.xml",
        regex : "'",
        stateName : "jsx_attr_q",
        push : [
            {token : "string.attribute-value.xml", regex: "'", next: "pop"},
            {include : "reference"},
            {defaultToken : "string.attribute-value.xml"}
        ]
    }, {
        token : "string.attribute-value.xml",
        regex : '"',
        stateName : "jsx_attr_qq",
        push : [
            {token : "string.attribute-value.xml", regex: '"', next: "pop"},
            {include : "reference"},
            {defaultToken : "string.attribute-value.xml"}
        ]
    },
    jsxTag
    ];
    this.$rules.reference = [{
        token : "constant.language.escape.reference.xml",
        regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
    }];
}

function comments(next) {
    return [
        {
            token : "comment", // multi line comment
            regex : /\/\*/,
            next: [
                DocCommentHighlightRules.getTagRule(),
                {token : "comment", regex : "\\*\\/", next : next || "pop"},
                {defaultToken : "comment", caseInsensitive: true}
            ]
        }, {
            token : "comment",
            regex : "\\/\\/",
            next: [
                DocCommentHighlightRules.getTagRule(),
                {token : "comment", regex : "$|^", next : next || "pop"},
                {defaultToken : "comment", caseInsensitive: true}
            ]
        }
    ];
}
exports.JavaScriptHighlightRules = JavaScriptHighlightRules;


/***/ }),

/***/ 4969:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var JsDocCommentHighlightRules = function() {
    this.$rules = {
        "start": [
            {
                token: ["comment.doc.tag", "comment.doc.text", "lparen.doc"],
                regex: "(@(?:param|member|typedef|property|namespace|var|const|callback))(\\s*)({)",
                push: [
                    {
                        token: "lparen.doc",
                        regex: "{",
                        push: [
                            {
                                include: "doc-syntax"
                            }, {
                                token: "rparen.doc",
                                regex: "}|(?=$)",
                                next: "pop"
                            }
                        ]
                    }, {
                        token: ["rparen.doc", "text.doc", "variable.parameter.doc", "lparen.doc", "variable.parameter.doc", "rparen.doc"],
                        regex: /(})(\s*)(?:([\w=:\/\.]+)|(?:(\[)([\w=:\/\.\-\'\" ]+)(\])))/,
                        next: "pop"
                    }, {
                        token: "rparen.doc",
                        regex: "}|(?=$)",
                        next: "pop"
                    }, {
                        include: "doc-syntax"
                    }, {
                        defaultToken: "text.doc"
                    }
                ]
            }, {
                token: ["comment.doc.tag", "text.doc", "lparen.doc"],
                regex: "(@(?:returns?|yields|type|this|suppress|public|protected|private|package|modifies|" 
                    + "implements|external|exception|throws|enum|define|extends))(\\s*)({)",
                push: [
                    {
                        token: "lparen.doc",
                        regex: "{",
                        push: [
                            {
                                include: "doc-syntax"
                            }, {
                                token: "rparen.doc",
                                regex: "}|(?=$)",
                                next: "pop"
                            }
                        ]
                    }, {
                        token: "rparen.doc",
                        regex: "}|(?=$)",
                        next: "pop"
                    }, {
                        include: "doc-syntax"
                    }, {
                        defaultToken: "text.doc"
                    }
                    ]
            }, {
                token: ["comment.doc.tag", "text.doc", "variable.parameter.doc"],
                regex: "(@(?:alias|memberof|instance|module|name|lends|namespace|external|this|template|" 
                    + "requires|param|implements|function|extends|typedef|mixes|constructor|var|" 
                    + "memberof\\!|event|listens|exports|class|constructs|interface|emits|fires|" 
                    + "throws|const|callback|borrows|augments))(\\s+)(\\w[\\w#\.:\/~\"\\-]*)?"
            }, {
                token: ["comment.doc.tag", "text.doc", "variable.parameter.doc"],
                regex: "(@method)(\\s+)(\\w[\\w\.\\(\\)]*)"
            }, {
                token: "comment.doc.tag",
                regex: "@access\\s+(?:private|public|protected)"
            }, {
                token: "comment.doc.tag",
                regex: "@kind\\s+(?:class|constant|event|external|file|function|member|mixin|module|namespace|typedef)"
            }, {
                token: "comment.doc.tag",
                regex: "@\\w+(?=\\s|$)"
            },
            JsDocCommentHighlightRules.getTagRule(),
        {
            defaultToken: "comment.doc.body",
            caseInsensitive: true
        }],
        "doc-syntax": [{
            token: "operator.doc",
            regex: /[|:]/
        }, {
            token: "paren.doc",
            regex: /[\[\]]/
        }]
    };
    this.normalizeRules();
};

oop.inherits(JsDocCommentHighlightRules, TextHighlightRules);

JsDocCommentHighlightRules.getTagRule = function(start) {
    return {
        token : "comment.doc.tag.storage.type",
        regex : "\\b(?:TODO|FIXME|XXX|HACK)\\b"
    };
};

JsDocCommentHighlightRules.getStartRule = function(start) {
    return {
        token : "comment.doc", // doc comment
        regex: /\/\*\*(?!\/)/,
        next  : start
    };
};

JsDocCommentHighlightRules.getEndRule = function (start) {
    return {
        token : "comment.doc", // closing comment
        regex : "\\*\\/",
        next  : start
    };
};


exports.U = JsDocCommentHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLFNBQWtDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9qYXZhc2NyaXB0X2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2pzZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vanNkb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXNcIikuSnNEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG4vLyBUT0RPOiBVbmljb2RlIGVzY2FwZSBzZXF1ZW5jZXNcbnZhciBpZGVudGlmaWVyUmUgPSBcIlthLXpBLVpcXFxcJF9cXHUwMGExLVxcdWZmZmZdW2EtekEtWlxcXFxkXFxcXCRfXFx1MDBhMS1cXHVmZmZmXSpcIjtcblxudmFyIEphdmFTY3JpcHRIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAvLyBzZWU6IGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzXG4gICAgXG4gICAgdmFyIGtleXdvcmRzID0ge1xuICAgICAgICBcInZhcmlhYmxlLmxhbmd1YWdlXCI6XG4gICAgICAgICAgICBcIkFycmF5fEJvb2xlYW58RGF0ZXxGdW5jdGlvbnxJdGVyYXRvcnxOdW1iZXJ8T2JqZWN0fFJlZ0V4cHxTdHJpbmd8UHJveHl8U3ltYm9sfFwiICArIC8vIENvbnN0cnVjdG9yc1xuICAgICAgICAgICAgXCJOYW1lc3BhY2V8UU5hbWV8WE1MfFhNTExpc3R8XCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIC8vIEU0WFxuICAgICAgICAgICAgXCJBcnJheUJ1ZmZlcnxGbG9hdDMyQXJyYXl8RmxvYXQ2NEFycmF5fEludDE2QXJyYXl8SW50MzJBcnJheXxJbnQ4QXJyYXl8XCIgICArXG4gICAgICAgICAgICBcIlVpbnQxNkFycmF5fFVpbnQzMkFycmF5fFVpbnQ4QXJyYXl8VWludDhDbGFtcGVkQXJyYXl8XCIgICAgICAgICAgICAgICAgICAgICtcbiAgICAgICAgICAgIFwiRXJyb3J8RXZhbEVycm9yfEludGVybmFsRXJyb3J8UmFuZ2VFcnJvcnxSZWZlcmVuY2VFcnJvcnxTdG9wSXRlcmF0aW9ufFwiICAgKyAvLyBFcnJvcnNcbiAgICAgICAgICAgIFwiU3ludGF4RXJyb3J8VHlwZUVycm9yfFVSSUVycm9yfFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgK1xuICAgICAgICAgICAgXCJkZWNvZGVVUkl8ZGVjb2RlVVJJQ29tcG9uZW50fGVuY29kZVVSSXxlbmNvZGVVUklDb21wb25lbnR8ZXZhbHxpc0Zpbml0ZXxcIiArIC8vIE5vbi1jb25zdHJ1Y3RvciBmdW5jdGlvbnNcbiAgICAgICAgICAgIFwiaXNOYU58cGFyc2VGbG9hdHxwYXJzZUludHxcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgK1xuICAgICAgICAgICAgXCJKU09OfE1hdGh8XCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArIC8vIE90aGVyXG4gICAgICAgICAgICBcInRoaXN8YXJndW1lbnRzfHByb3RvdHlwZXx3aW5kb3d8ZG9jdW1lbnRcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICwgLy8gUHNldWRvXG4gICAgICAgIFwia2V5d29yZFwiOlxuICAgICAgICAgICAgXCJjb25zdHx5aWVsZHxpbXBvcnR8Z2V0fHNldHxhc3luY3xhd2FpdHxcIiArXG4gICAgICAgICAgICBcImJyZWFrfGNhc2V8Y2F0Y2h8Y29udGludWV8ZGVmYXVsdHxkZWxldGV8ZG98ZWxzZXxmaW5hbGx5fGZvcnxcIiArXG4gICAgICAgICAgICBcImlmfGlufG9mfGluc3RhbmNlb2Z8bmV3fHJldHVybnxzd2l0Y2h8dGhyb3d8dHJ5fHR5cGVvZnxsZXR8dmFyfHdoaWxlfHdpdGh8ZGVidWdnZXJ8XCIgK1xuICAgICAgICAgICAgLy8gaW52YWxpZCBvciByZXNlcnZlZFxuICAgICAgICAgICAgXCJfX3BhcmVudF9ffF9fY291bnRfX3xlc2NhcGV8dW5lc2NhcGV8d2l0aHxfX3Byb3RvX198XCIgK1xuICAgICAgICAgICAgXCJjbGFzc3xlbnVtfGV4dGVuZHN8c3VwZXJ8ZXhwb3J0fGltcGxlbWVudHN8cHJpdmF0ZXxwdWJsaWN8aW50ZXJmYWNlfHBhY2thZ2V8cHJvdGVjdGVkfHN0YXRpY3xjb25zdHJ1Y3RvclwiLFxuICAgICAgICBcInN0b3JhZ2UudHlwZVwiOlxuICAgICAgICAgICAgXCJjb25zdHxsZXR8dmFyfGZ1bmN0aW9uXCIsXG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjpcbiAgICAgICAgICAgIFwibnVsbHxJbmZpbml0eXxOYU58dW5kZWZpbmVkXCIsXG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvblwiOlxuICAgICAgICAgICAgXCJhbGVydFwiLFxuICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW5cIjogXCJ0cnVlfGZhbHNlXCJcbiAgICB9O1xuICAgIFxuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKGtleXdvcmRzLCBcImlkZW50aWZpZXJcIik7XG5cbiAgICAvLyBrZXl3b3JkcyB3aGljaCBjYW4gYmUgZm9sbG93ZWQgYnkgcmVndWxhciBleHByZXNzaW9uc1xuICAgIHZhciBrd0JlZm9yZVJlID0gXCJjYXNlfGRvfGVsc2V8ZmluYWxseXxpbnxpbnN0YW5jZW9mfHJldHVybnx0aHJvd3x0cnl8dHlwZW9mfHlpZWxkfHZvaWRcIjtcblxuICAgIHZhciBlc2NhcGVkUmUgPSBcIlxcXFxcXFxcKD86eFswLTlhLWZBLUZdezJ9fFwiICsgLy8gaGV4XG4gICAgICAgIFwidVswLTlhLWZBLUZdezR9fFwiICsgLy8gdW5pY29kZVxuICAgICAgICBcInV7WzAtOWEtZkEtRl17MSw2fX18XCIgKyAvLyBlczYgdW5pY29kZVxuICAgICAgICBcIlswLTJdWzAtN117MCwyfXxcIiArIC8vIG9jdFxuICAgICAgICBcIjNbMC03XVswLTddP3xcIiArIC8vIG9jdFxuICAgICAgICBcIls0LTddWzAtN10/fFwiICsgLy9vY3RcbiAgICAgICAgXCIuKVwiO1xuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG4gICAgXG4gICAgdmFyIGFub255bW91c0Z1bmN0aW9uUmUgPSBcIihmdW5jdGlvbikoXFxcXHMqKShcXFxcKj8pXCI7XG5cbiAgICB2YXIgZnVuY3Rpb25DYWxsU3RhcnRSdWxlID0geyAvL2p1c3Qgc2ltcGxlIGZ1bmN0aW9uIGNhbGxcbiAgICAgICAgdG9rZW46IFtcImlkZW50aWZpZXJcIiwgXCJ0ZXh0XCIsIFwicGFyZW4ubHBhcmVuXCJdLFxuICAgICAgICByZWdleDogXCIoXFxcXGIoPyFcIiArIE9iamVjdC52YWx1ZXMoa2V5d29yZHMpLmpvaW4oXCJ8XCIpICsgXCJcXFxcYilcIiArIGlkZW50aWZpZXJSZSArIFwiKShcXFxccyopKFxcXFwoKVwiXG4gICAgfTtcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcIm5vX3JlZ2V4XCIgOiBbXG4gICAgICAgICAgICBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlKFwiZG9jLXN0YXJ0XCIpLFxuICAgICAgICAgICAgY29tbWVudHMoXCJub19yZWdleFwiKSxcbiAgICAgICAgICAgIGZ1bmN0aW9uQ2FsbFN0YXJ0UnVsZSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIicoPz0uKVwiLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJxc3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXCIoPz0uKScsXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInFxc3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXhhZGVjaW1hbCwgb2N0YWwgYW5kIGJpbmFyeVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLzAoPzpbeFhdWzAtOWEtZkEtRl0rfFtvT11bMC03XSt8W2JCXVswMV0rKVxcYi9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBkZWNpbWFsIGludGVnZXJzIGFuZCBmbG9hdHNcbiAgICAgICAgICAgICAgICByZWdleCA6IC8oPzpcXGRcXGQqKD86XFwuXFxkKik/fFxcLlxcZCspKD86W2VFXVsrLV0/XFxkK1xcYik/L1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIHBsYXkgPSBmdW5jdGlvbigpIHsgIH1cbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS5mdW5jdGlvblwiLCBcInRleHRcIiwgXCJrZXl3b3JkLm9wZXJhdG9yXCIsIFwidGV4dFwiLCBcInN0b3JhZ2UudHlwZVwiLFxuICAgICAgICAgICAgICAgICAgICBcInRleHRcIiwgXCJzdG9yYWdlLnR5cGVcIiwgXCJ0ZXh0XCIsIFwicGFyZW4ubHBhcmVuXCJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoXCIgKyBpZGVudGlmaWVyUmUgK1wiKShcXFxccyopKD0pKFxcXFxzKilcIiArIGFub255bW91c0Z1bmN0aW9uUmUgKyBcIihcXFxccyopKFxcXFwoKVwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwiZnVuY3Rpb25fYXJndW1lbnRzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyBmdW5jdGlvbiBteUZ1bmMoYXJnKSB7IH1cbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJzdG9yYWdlLnR5cGVcIiwgXCJ0ZXh0XCIsIFwic3RvcmFnZS50eXBlXCIsIFwidGV4dFwiLCBcInRleHRcIiwgXCJlbnRpdHkubmFtZS5mdW5jdGlvblwiLCBcInRleHRcIiwgXCJwYXJlbi5scGFyZW5cIlxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIihmdW5jdGlvbikoPzooPzooXFxcXHMqKShcXFxcKikoXFxcXHMqKSl8KFxcXFxzKykpKFwiICsgaWRlbnRpZmllclJlICsgXCIpKFxcXFxzKikoXFxcXCgpXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJmdW5jdGlvbl9hcmd1bWVudHNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIGZvb2JhcjogZnVuY3Rpb24oKSB7IH1cbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS5mdW5jdGlvblwiLCBcInRleHRcIiwgXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICBcInRleHRcIiwgXCJzdG9yYWdlLnR5cGVcIiwgXCJ0ZXh0XCIsIFwic3RvcmFnZS50eXBlXCIsIFwidGV4dFwiLCBcInBhcmVuLmxwYXJlblwiXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKFwiICsgaWRlbnRpZmllclJlICsgXCIpKFxcXFxzKikoOikoXFxcXHMqKVwiICsgYW5vbnltb3VzRnVuY3Rpb25SZSArIFwiKFxcXFxzKikoXFxcXCgpXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJmdW5jdGlvbl9hcmd1bWVudHNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIDogZnVuY3Rpb24oKSB7IH0gKHRoaXMgaXMgZm9yIGlzc3VlcyB3aXRoICdmb28nOiBmdW5jdGlvbigpIHsgfSlcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIsIFwidGV4dFwiLCBcInN0b3JhZ2UudHlwZVwiLCBcInRleHRcIiwgXCJzdG9yYWdlLnR5cGVcIiwgXCJ0ZXh0XCIsICBcInBhcmVuLmxwYXJlblwiXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKDopKFxcXFxzKilcIiArIGFub255bW91c0Z1bmN0aW9uUmUgKyBcIihcXFxccyopKFxcXFwoKVwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwiZnVuY3Rpb25fYXJndW1lbnRzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyBmcm9tIFwibW9kdWxlLXBhdGhcIiAodGhpcyBpcyB0aGUgb25seSBjYXNlIHdoZXJlICdmcm9tJyBzaG91bGQgYmUgYSBrZXl3b3JkKVxuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcImZyb20oPz1cXFxccyooJ3xcXFwiKSlcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIig/OlwiICsga3dCZWZvcmVSZSArIFwiKVxcXFxiXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmNvbnN0YW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvdGhhdFxcYi9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcInN0b3JhZ2UudHlwZVwiLCBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsIFwic3VwcG9ydC5mdW5jdGlvbi5maXJlYnVnXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyhjb25zb2xlKShcXC4pKHdhcm58aW5mb3xsb2d8ZXJyb3J8ZGVidWd8dGltZXx0cmFjZXx0aW1lRW5kfGFzc2VydClcXGIvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogaWRlbnRpZmllclJlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvWy5dKD8hWy5dKS8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInByb3BlcnR5XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RvcmFnZS50eXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvPT4vLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC8tLXxcXCtcXCt8XFwuezN9fD09PXw9PXw9fCE9fCE9PXw8Kz0/fD4rPT98IXwmJnxcXHxcXHx8XFw/OnxbISQlJiorXFwtflxcL15dPT8vLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvWz86LDsuXS8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvW1xcWyh7XS8sXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvW1xcXSl9XS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9eIyEuKiQvXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIHByb3BlcnR5OiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleDogLz0vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgLy8gU291bmQucGxheSA9IGZ1bmN0aW9uKCkgeyAgfVxuICAgICAgICAgICAgICAgIHRva2VuIDogW1xuICAgICAgICAgICAgICAgICAgICBcInN0b3JhZ2UudHlwZVwiLCBcInRleHRcIiwgXCJzdG9yYWdlLnR5cGVcIiwgXCJ0ZXh0XCIsIFwicGFyZW4ubHBhcmVuXCJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogYW5vbnltb3VzRnVuY3Rpb25SZSArIFwiKFxcXFxzKikoXFxcXCgpXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJmdW5jdGlvbl9hcmd1bWVudHNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIFNvdW5kLnBsYXkgPSBmdW5jdGlvbiBwbGF5KCkgeyAgfVxuICAgICAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlXCIsIFwidGV4dFwiLCBcInN0b3JhZ2UudHlwZVwiLCBcInRleHRcIiwgXCJ0ZXh0XCIsIFwiZW50aXR5Lm5hbWUuZnVuY3Rpb25cIiwgXCJ0ZXh0XCIsIFwicGFyZW4ubHBhcmVuXCJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIihmdW5jdGlvbikoPzooPzooXFxcXHMqKShcXFxcKikoXFxcXHMqKSl8KFxcXFxzKykpKFxcXFx3KykoXFxcXHMqKShcXFxcKClcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcImZ1bmN0aW9uX2FyZ3VtZW50c1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvWy5dKD8hWy5dKS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcInByb3RvdHlwZVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC8ocyg/OmgoPzppZnR8b3coPzpNb2QoPzplbGVzc0RpYWxvZ3xhbERpYWxvZyl8SGVscCkpfGNyb2xsKD86WHxCeSg/OlBhZ2VzfExpbmVzKT98WXxUbyk/fHQoPzpvcHxyaWtlKXxpKD86bnx6ZVRvQ29udGVudHxkZWJhcnxnblRleHQpfG9ydHx1KD86cHxiKD86c3RyKD86aW5nKT8pPyl8cGxpKD86Y2V8dCl8ZSg/Om5kfHQoPzpSZSg/OnNpemFibGV8cXVlc3RIZWFkZXIpfE0oPzppKD86bnV0ZXN8bGxpc2Vjb25kcyl8b250aCl8U2Vjb25kc3xIbyg/OnRLZXlzfHVycyl8WWVhcnxDdXJzb3J8VGltZSg/Om91dCk/fEludGVydmFsfFpPcHRpb25zfERhdGV8VVRDKD86TSg/OmkoPzpudXRlc3xsbGlzZWNvbmRzKXxvbnRoKXxTZWNvbmRzfEhvdXJzfERhdGV8RnVsbFllYXIpfEZ1bGxZZWFyfEFjdGl2ZSl8YXJjaCl8cXJ0fGxpY2V8YXZlUHJlZmVyZW5jZXN8bWFsbCl8aCg/Om9tZXxhbmRsZUV2ZW50KXxuYXZpZ2F0ZXxjKD86aGFyKD86Q29kZUF0fEF0KXxvKD86c3xuKD86Y2F0fHRleHR1YWx8ZmlybSl8bXBpbGUpfGVpbHxsZWFyKD86VGltZW91dHxJbnRlcnZhbCk/fGEoPzpwdHVyZUV2ZW50c3xsbCl8cmVhdGUoPzpTdHlsZVNoZWV0fFBvcHVwfEV2ZW50T2JqZWN0KSl8dCg/Om8oPzpHTVRTdHJpbmd8Uyg/OnRyaW5nfG91cmNlKXxVKD86VENTdHJpbmd8cHBlckNhc2UpfExvKD86Y2FsZVN0cmluZ3x3ZXJDYXNlKSl8ZXN0fGEoPzpufGludCg/OkVuYWJsZWQpPykpfGkoPzpzKD86TmFOfEZpbml0ZSl8bmRleE9mfHRhbGljcyl8ZCg/OmlzYWJsZUV4dGVybmFsQ2FwdHVyZXx1bXB8ZXRhY2hFdmVudCl8dSg/Om4oPzpzaGlmdHx0YWludHxlc2NhcGV8d2F0Y2gpfHBkYXRlQ29tbWFuZHMpfGooPzpvaW58YXZhRW5hYmxlZCl8cCg/Om8oPzpwfHcpfHVzaHxsdWdpbnMucmVmcmVzaHxhKD86ZGRpbmdzfHJzZSg/OkludHxGbG9hdCk/KXxyKD86aW50fG9tcHR8ZWZlcmVuY2UpKXxlKD86c2NhcGV8bmFibGVFeHRlcm5hbENhcHR1cmV8dmFsfGxlbWVudEZyb21Qb2ludHx4KD86cHxlYyg/OlNjcmlwdHxDb21tYW5kKT8pKXx2YWx1ZU9mfFVUQ3xxdWVyeUNvbW1hbmQoPzpTdGF0ZXxJbmRldGVybXxFbmFibGVkfFZhbHVlKXxmKD86aSg/Om5kfGx0ZXJ8bGUoPzpNb2RpZmllZERhdGV8U2l6ZXxDcmVhdGVkRGF0ZXxVcGRhdGVkRGF0ZSl8eGVkKXxvKD86bnQoPzpzaXplfGNvbG9yKXxyd2FyZHxyRWFjaCl8bG9vcnxyb21DaGFyQ29kZSl8d2F0Y2h8bCg/Omlua3xvKD86YWR8Zyl8YXN0SW5kZXhPZil8YSg/OnNpbnxuY2hvcnxjb3N8dCg/OnRhY2hFdmVudHxvYnxhbig/OjIpPyl8cHBseXxsZXJ0fGIoPzpzfG9ydCkpfHIoPzpvdSg/Om5kfHRlRXZlbnRzKXxlKD86c2l6ZSg/OkJ5fFRvKXxjYWxjfHR1cm5WYWx1ZXxwbGFjZXx2ZXJzZXxsKD86b2FkfGVhc2UoPzpDYXB0dXJlfEV2ZW50cykpKXxhbmRvbSl8Zyg/Om98ZXQoPzpSZXNwb25zZUhlYWRlcnxNKD86aSg/Om51dGVzfGxsaXNlY29uZHMpfG9udGgpfFNlKD86Y29uZHN8bGVjdGlvbil8SG91cnN8WWVhcnxUaW1lKD86em9uZU9mZnNldCk/fERhKD86eXx0ZSl8VVRDKD86TSg/OmkoPzpudXRlc3xsbGlzZWNvbmRzKXxvbnRoKXxTZWNvbmRzfEhvdXJzfERhKD86eXx0ZSl8RnVsbFllYXIpfEZ1bGxZZWFyfEEoPzp0dGVudGlvbnxsbFJlc3BvbnNlSGVhZGVycykpKXxtKD86aW58b3ZlKD86Qig/Onl8ZWxvdyl8VG8oPzpBYnNvbHV0ZSk/fEFib3ZlKXxlcmdlQXR0cmlidXRlc3xhKD86dGNofHJnaW5zfHgpKXxiKD86dG9hfGlnfG8oPzpsZHxyZGVyV2lkdGhzKXxsaW5rfGFjaykpXFxiKD89XFwoKS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvbi5kb21cIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC8ocyg/OnViKD86c3RyaW5nRGF0YXxtaXQpfHBsaXRUZXh0fGUoPzp0KD86TmFtZWRJdGVtfEF0dHJpYnV0ZSg/Ok5vZGUpPyl8bGVjdCkpfGhhcyg/OkNoaWxkTm9kZXN8RmVhdHVyZSl8bmFtZWRJdGVtfGMoPzpsKD86aWNrfG8oPzpzZXxuZU5vZGUpKXxyZWF0ZSg/OkMoPzpvbW1lbnR8REFUQVNlY3Rpb258YXB0aW9uKXxUKD86SGVhZHxleHROb2RlfEZvb3QpfERvY3VtZW50RnJhZ21lbnR8UHJvY2Vzc2luZ0luc3RydWN0aW9ufEUoPzpudGl0eVJlZmVyZW5jZXxsZW1lbnQpfEF0dHJpYnV0ZSkpfHRhYkluZGV4fGkoPzpuc2VydCg/OlJvd3xCZWZvcmV8Q2VsbHxEYXRhKXx0ZW0pfG9wZW58ZGVsZXRlKD86Um93fEMoPzplbGx8YXB0aW9uKXxUKD86SGVhZHxGb290KXxEYXRhKXxmb2N1c3x3cml0ZSg/OmxuKT98YSg/OmRkfHBwZW5kKD86Q2hpbGR8RGF0YSkpfHJlKD86c2V0fHBsYWNlKD86Q2hpbGR8RGF0YSl8bW92ZSg/Ok5hbWVkSXRlbXxDaGlsZHxBdHRyaWJ1dGUoPzpOb2RlKT8pPyl8Z2V0KD86TmFtZWRJdGVtfEVsZW1lbnQoPzpzQnkoPzpOYW1lfFRhZ05hbWV8Q2xhc3NOYW1lKXxCeUlkKXxBdHRyaWJ1dGUoPzpOb2RlKT8pfGJsdXIpXFxiKD89XFwoKS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6ICBcInN1cHBvcnQuY29uc3RhbnRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC8ocyg/OnlzdGVtTGFuZ3VhZ2V8Y3IoPzppcHRzfG9sbGJhcnN8ZWVuKD86WHxZfFRvcHxMZWZ0KSl8dCg/OnlsZSg/OlNoZWV0cyk/fGF0dXMoPzpUZXh0fGJhcik/KXxpYmxpbmcoPzpCZWxvd3xBYm92ZSl8b3VyY2V8dWZmaXhlc3xlKD86Y3VyaXR5KD86UG9saWN5KT98bCg/OmVjdGlvbnxmKSkpfGgoPzppc3Rvcnl8b3N0KD86bmFtZSk/fGFzKD86aHxGb2N1cykpfHl8WCg/Ok1MRG9jdW1lbnR8U0xEb2N1bWVudCl8big/OmV4dHxhbWUoPzpzcGFjZSg/OnN8VVJJKXxQcm9wKSl8TSg/OklOX1ZBTFVFfEFYX1ZBTFVFKXxjKD86aGFyYWN0ZXJTZXR8byg/Om4oPzpzdHJ1Y3Rvcnx0cm9sbGVycyl8b2tpZUVuYWJsZWR8bG9yRGVwdGh8bXAoPzpvbmVudHN8bGV0ZSkpfHVycmVudHxwdUNsYXNzfGwoPzppKD86cCg/OmJvYXJkRGF0YSk/fGVudEluZm9ybWF0aW9uKXxvc2VkfGFzc2VzKXxhbGxlKD86ZXxyKXxyeXB0byl8dCg/Om8oPzpvbGJhcnxwKXxleHQoPzpUcmFuc2Zvcm18SW5kZW50fERlY29yYXRpb258QWxpZ24pfGFncyl8U1FSVCg/OjFfMnwyKXxpKD86big/Om5lcig/OkhlaWdodHxXaWR0aCl8cHV0KXxkc3xnbm9yZUNhc2UpfHpJbmRleHxvKD86c2NwdXxuKD86cmVhZHlzdGF0ZWNoYW5nZXxMaW5lKXx1dGVyKD86SGVpZ2h0fFdpZHRoKXxwKD86c1Byb2ZpbGV8ZW5lcil8ZmZzY3JlZW5CdWZmZXJpbmcpfE5FR0FUSVZFX0lORklOSVRZfGQoPzppKD86c3BsYXl8YWxvZyg/OkhlaWdodHxUb3B8V2lkdGh8TGVmdHxBcmd1bWVudHMpfHJlY3Rvcmllcyl8ZSg/OnNjcmlwdGlvbnxmYXVsdCg/OlN0YXR1c3xDaCg/OmVja2VkfGFyc2V0KXxWaWV3KSkpfHUoPzpzZXIoPzpQcm9maWxlfExhbmd1YWdlfEFnZW50KXxuKD86aXF1ZUlEfGRlZmluZWQpfHBkYXRlSW50ZXJ2YWwpfF9jb250ZW50fHAoPzppeGVsRGVwdGh8b3J0fGVyc29uYWxiYXJ8a2NzMTF8bCg/OnVnaW5zfGF0Zm9ybSl8YSg/OnRobmFtZXxkZGluZyg/OlJpZ2h0fEJvdHRvbXxUb3B8TGVmdCl8cmVudCg/OldpbmRvd3xMYXllcik/fGdlKD86WCg/Ok9mZnNldCk/fFkoPzpPZmZzZXQpPykpfHIoPzpvKD86dG8oPzpjb2x8dHlwZSl8ZHVjdCg/OlN1Yik/fG1wdGVyKXxlKD86dmlvdXN8Zml4KSkpfGUoPzpuKD86Y29kaW5nfGFibGVkUGx1Z2luKXx4KD86dGVybmFsfHBhbmRvKXxtYmVkcyl8dig/OmlzaWJpbGl0eXxlbmRvcig/OlN1Yik/fExpbmtjb2xvcil8VVJMVW5lbmNvZGVkfFAoPzpJfE9TSVRJVkVfSU5GSU5JVFkpfGYoPzppbGVuYW1lfG8oPzpudCg/OlNpemV8RmFtaWx5fFdlaWdodCl8cm1OYW1lKXxyYW1lKD86c3xFbGVtZW50KXxnQ29sb3IpfEV8d2hpdGVTcGFjZXxsKD86aSg/OnN0U3R5bGVUeXBlfG4oPzplSGVpZ2h0fGtDb2xvcikpfG8oPzpjYSg/OnRpb24oPzpiYXIpP3xsTmFtZSl8d3NyYyl8ZSg/Om5ndGh8ZnQoPzpDb250ZXh0KT8pfGEoPzpzdCg/Ok0oPzpvZGlmaWVkfGF0Y2gpfEluZGV4fFBhcmVuKXx5ZXIoPzpzfFgpfG5ndWFnZSkpfGEoPzpwcCg/Ok1pbm9yVmVyc2lvbnxOYW1lfENvKD86ZGVOYW1lfHJlKXxWZXJzaW9uKXx2YWlsKD86SGVpZ2h0fFRvcHxXaWR0aHxMZWZ0KXxsbHxyKD86aXR5fGd1bWVudHMpfExpbmtjb2xvcnxib3ZlKXxyKD86aWdodCg/OkNvbnRleHQpP3xlKD86c3BvbnNlKD86WE1MfFRleHQpfGFkeVN0YXRlKSl8Z2xvYmFsfHh8bSg/OmltZVR5cGVzfHVsdGlsaW5lfGVudWJhcnxhcmdpbig/OlJpZ2h0fEJvdHRvbXxUb3B8TGVmdCkpfEwoPzpOKD86MTB8Mil8T0coPzoxMEV8MkUpKXxiKD86byg/OnR0b218cmRlcig/OldpZHRofFJpZ2h0V2lkdGh8Qm90dG9tV2lkdGh8U3R5bGV8Q29sb3J8VG9wV2lkdGh8TGVmdFdpZHRoKSl8dWZmZXJEZXB0aHxlbG93fGFja2dyb3VuZCg/OkNvbG9yfEltYWdlKSkpXFxiL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJpZGVudGlmaWVyXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBpZGVudGlmaWVyUmVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByZWdleDogXCJcIixcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJlbXB0eVwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwibm9fcmVnZXhcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICAvLyByZWd1bGFyIGV4cHJlc3Npb25zIGFyZSBvbmx5IGFsbG93ZWQgYWZ0ZXIgY2VydGFpbiB0b2tlbnMuIFRoaXNcbiAgICAgICAgLy8gbWFrZXMgc3VyZSB3ZSBkb24ndCBtaXggdXAgcmVnZXhwcyB3aXRoIHRoZSBkaXZpc29uIG9wZXJhdG9yXG4gICAgICAgIFwic3RhcnRcIjogW1xuICAgICAgICAgICAgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFN0YXJ0UnVsZShcImRvYy1zdGFydFwiKSxcbiAgICAgICAgICAgIGNvbW1lbnRzKFwic3RhcnRcIiksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnJlZ2V4cFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwvXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJyZWdleFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrfF4kXCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIGltbWVkaWF0ZWx5IHJldHVybiB0byB0aGUgc3RhcnQgbW9kZSB3aXRob3V0IG1hdGNoaW5nXG4gICAgICAgICAgICAgICAgLy8gYW55dGhpbmdcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJlbXB0eVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwibm9fcmVnZXhcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInJlZ2V4XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAvLyBlc2NhcGVzXG4gICAgICAgICAgICAgICAgdG9rZW46IFwicmVnZXhwLmtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcXFxcXCg/OnVbXFxcXGRhLWZBLUZdezR9fHhbXFxcXGRhLWZBLUZdezJ9fC4pXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyBmbGFnXG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnJlZ2V4cFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIi9bc3huZ2lteV0qXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJub19yZWdleFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgLy8gaW52YWxpZCBvcGVyYXRvcnNcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiaW52YWxpZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFx7XFxkK1xcYiw/XFxkKlxcfVsrKl18WysqJF4/XVsrKl18WyReXVs/XXxcXD97Myx9L1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIG9wZXJhdG9yc1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcKFxcP1s6PSFdfFxcKXxcXHtcXGQrXFxiLD9cXGQqXFx9fFsrKl1cXD98WygpJF4rKj8uXS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZGVsaW1pdGVyXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXHwvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXFtcXF4/LyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInJlZ2V4X2NoYXJhY3Rlcl9jbGFzc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiZW1wdHlcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIkXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJub19yZWdleFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZy5yZWdleHBcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInJlZ2V4X2NoYXJhY3Rlcl9jbGFzc1wiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicmVnZXhwLmNoYXJjbGFzcy5rZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXFxcXFwoPzp1W1xcXFxkYS1mQS1GXXs0fXx4W1xcXFxkYS1mQS1GXXsyfXwuKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXVwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicmVnZXhcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIi1cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImVtcHR5XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiJFwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwibm9fcmVnZXhcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucmVnZXhwLmNoYXJhY2h0ZXJjbGFzc1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwiZGVmYXVsdF9wYXJhbWV0ZXJcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiJyg/PS4pXCIsXG4gICAgICAgICAgICAgICAgcHVzaDogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIid8JFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcInFzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6ICdcIig/PS4pJyxcbiAgICAgICAgICAgICAgICBwdXNoOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICdcInwkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCJxcXN0cmluZ1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIm51bGx8SW5maW5pdHl8TmFOfHVuZGVmaW5lZFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gaGV4YWRlY2ltYWwsIG9jdGFsIGFuZCBiaW5hcnlcbiAgICAgICAgICAgICAgICByZWdleCA6IC8wKD86W3hYXVswLTlhLWZBLUZdK3xbb09dWzAtN10rfFtiQl1bMDFdKylcXGIvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lm51bWVyaWNcIiwgLy8gZGVjaW1hbCBpbnRlZ2VycyBhbmQgZmxvYXRzXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvKD86XFxkXFxkKig/OlxcLlxcZCopP3xcXC5cXGQrKSg/OltlRV1bKy1dP1xcZCtcXGIpPy9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIixcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcImZ1bmN0aW9uX2FyZ3VtZW50c1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIkXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJlbXB0eVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwibm9fcmVnZXhcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImZ1bmN0aW9uX2FyZ3VtZW50c1wiOiBbXG4gICAgICAgICAgICBjb21tZW50cyhcImZ1bmN0aW9uX2FyZ3VtZW50c1wiKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5wYXJhbWV0ZXJcIixcbiAgICAgICAgICAgICAgICByZWdleDogaWRlbnRpZmllclJlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIsXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIiRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImVtcHR5XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJub19yZWdleFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwicXFzdHJpbmdcIiA6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBlc2NhcGVkUmVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxcXFxcJFwiLFxuICAgICAgICAgICAgICAgIGNvbnN1bWVMaW5lRW5kICA6IHRydWVcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXCJ8JCcsXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcIm5vX3JlZ2V4XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJxc3RyaW5nXCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogZXNjYXBlZFJlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcXFxcXCRcIixcbiAgICAgICAgICAgICAgICBjb25zdW1lTGluZUVuZCAgOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCInfCRcIixcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwibm9fcmVnZXhcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcblxuXG4gICAgaWYgKCFvcHRpb25zIHx8ICFvcHRpb25zLm5vRVM2KSB7XG4gICAgICAgIHRoaXMuJHJ1bGVzLm5vX3JlZ2V4LnVuc2hpZnQoe1xuICAgICAgICAgICAgcmVnZXg6IFwiW3t9XVwiLCBvbk1hdGNoOiBmdW5jdGlvbih2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHZhbCA9PSBcIntcIiA/IHRoaXMubmV4dFN0YXRlIDogXCJcIjtcbiAgICAgICAgICAgICAgICBpZiAodmFsID09IFwie1wiICYmIHN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay51bnNoaWZ0KFwic3RhcnRcIiwgc3RhdGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh2YWwgPT0gXCJ9XCIgJiYgc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm5leHQuaW5kZXhPZihcInN0cmluZ1wiKSAhPSAtMSB8fCB0aGlzLm5leHQuaW5kZXhPZihcImpzeFwiKSAhPSAtMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInBhcmVuLnF1YXNpLmVuZFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsID09IFwie1wiID8gXCJwYXJlbi5scGFyZW5cIiA6IFwicGFyZW4ucnBhcmVuXCI7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmV4dFN0YXRlOiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5xdWFzaS5zdGFydFwiLFxuICAgICAgICAgICAgcmVnZXggOiAvYC8sXG4gICAgICAgICAgICBwdXNoICA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogZXNjYXBlZFJlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnF1YXNpLnN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvXFwkey8sXG4gICAgICAgICAgICAgICAgcHVzaCAgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnF1YXNpLmVuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL2AvLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucXVhc2lcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcInZhcmlhYmxlLnBhcmFtZXRlclwiLCBcInRleHRcIl0sXG4gICAgICAgICAgICByZWdleDogXCIoXCIgKyBpZGVudGlmaWVyUmUgKyBcIikoXFxcXHMqKSg/PVxcXFw9PilcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5scGFyZW5cIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIihcXFxcKCkoPz1bXlxcXFwoXStcXFxccyo9PilcIixcbiAgICAgICAgICAgIG5leHQ6IFwiZnVuY3Rpb25fYXJndW1lbnRzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIig/Oig/Oig/OldlYWspPyg/OlNldHxNYXApKXxQcm9taXNlKVxcXFxiXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy4kcnVsZXNbXCJmdW5jdGlvbl9hcmd1bWVudHNcIl0udW5zaGlmdCh7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleDogXCI9XCIsXG4gICAgICAgICAgICBuZXh0OiBcImRlZmF1bHRfcGFyYW1ldGVyXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXC57M31cIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRydWxlc1tcInByb3BlcnR5XCJdLnVuc2hpZnQoe1xuICAgICAgICAgICAgdG9rZW46IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKGZpbmRJbmRleHxyZXBlYXR8c3RhcnRzV2l0aHxlbmRzV2l0aHxpbmNsdWRlc3xpc1NhZmVJbnRlZ2VyfHRydW5jfGNicnR8bG9nMnxsb2cxMHxzaWdufHRoZW58Y2F0Y2h8XCJcbiAgICAgICAgICAgICAgICArIFwiZmluYWxseXxyZXNvbHZlfHJlamVjdHxyYWNlfGFueXxhbGx8YWxsU2V0dGxlZHxrZXlzfGVudHJpZXN8aXNJbnRlZ2VyKVxcXFxiKD89XFxcXCgpXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiKD86TUFYX1NBRkVfSU5URUdFUnxNSU5fU0FGRV9JTlRFR0VSfEVQU0lMT04pXFxcXGJcIlxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIW9wdGlvbnMgfHwgb3B0aW9ucy5qc3ggIT0gZmFsc2UpXG4gICAgICAgICAgICBKU1guY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLmVtYmVkUnVsZXMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBcImRvYy1cIixcbiAgICAgICAgWyBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZShcIm5vX3JlZ2V4XCIpIF0pO1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKEphdmFTY3JpcHRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZnVuY3Rpb24gSlNYKCkge1xuICAgIHZhciB0YWdSZWdleCA9IGlkZW50aWZpZXJSZS5yZXBsYWNlKFwiXFxcXGRcIiwgXCJcXFxcZFxcXFwtXCIpO1xuICAgIHZhciBqc3hUYWcgPSB7XG4gICAgICAgIG9uTWF0Y2ggOiBmdW5jdGlvbih2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgdmFyIG9mZnNldCA9IHZhbC5jaGFyQXQoMSkgPT0gXCIvXCIgPyAyIDogMTtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPT0gMSkge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSAhPSB0aGlzLm5leHRTdGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh0aGlzLm5leHQsIHRoaXMubmV4dFN0YXRlLCAwKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodGhpcy5uZXh0KTtcbiAgICAgICAgICAgICAgICBzdGFja1syXSsrO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvZmZzZXQgPT0gMikge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PSB0aGlzLm5leHRTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFja1sxXS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YWNrWzFdIHx8IHN0YWNrWzFdIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLlwiICsgKG9mZnNldCA9PSAxID8gXCJcIiA6IFwiZW5kLVwiKSArIFwidGFnLW9wZW4ueG1sXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbC5zbGljZSgwLCBvZmZzZXQpXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJtZXRhLnRhZy50YWctbmFtZS54bWxcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsLnN1YnN0cihvZmZzZXQpXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVnZXggOiBcIjwvPyg/OlwiICsgdGFnUmVnZXggKyBcInwoPz0+KSlcIixcbiAgICAgICAgbmV4dDogXCJqc3hBdHRyaWJ1dGVzXCIsXG4gICAgICAgIG5leHRTdGF0ZTogXCJqc3hcIlxuICAgIH07XG4gICAgdGhpcy4kcnVsZXMuc3RhcnQudW5zaGlmdChqc3hUYWcpO1xuICAgIHZhciBqc3hKc1J1bGUgPSB7XG4gICAgICAgIHJlZ2V4OiBcIntcIixcbiAgICAgICAgdG9rZW46IFwicGFyZW4ucXVhc2kuc3RhcnRcIixcbiAgICAgICAgcHVzaDogXCJzdGFydFwiXG4gICAgfTtcbiAgICB0aGlzLiRydWxlcy5qc3ggPSBbXG4gICAgICAgIGpzeEpzUnVsZSxcbiAgICAgICAganN4VGFnLFxuICAgICAgICB7aW5jbHVkZSA6IFwicmVmZXJlbmNlXCJ9LCB7ZGVmYXVsdFRva2VuOiBcInN0cmluZy54bWxcIn1cbiAgICBdO1xuICAgIHRoaXMuJHJ1bGVzLmpzeEF0dHJpYnV0ZXMgPSBbe1xuICAgICAgICB0b2tlbiA6IFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLWNsb3NlLnhtbFwiLFxuICAgICAgICByZWdleCA6IFwiLz8+XCIsXG4gICAgICAgIG9uTWF0Y2ggOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRTdGF0ZSA9PSBzdGFja1swXSlcbiAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PSAyKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0YWNrWzBdID09IHRoaXMubmV4dFN0YXRlKVxuICAgICAgICAgICAgICAgICAgICBzdGFja1sxXS0tO1xuICAgICAgICAgICAgICAgIGlmICghc3RhY2tbMV0gfHwgc3RhY2tbMV0gPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnNwbGljZSgwLCAyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFja1swXSB8fCBcInN0YXJ0XCI7XG4gICAgICAgICAgICByZXR1cm4gW3t0eXBlOiB0aGlzLnRva2VuLCB2YWx1ZTogdmFsdWV9XTtcbiAgICAgICAgfSxcbiAgICAgICAgbmV4dFN0YXRlOiBcImpzeFwiXG4gICAgfSxcbiAgICBqc3hKc1J1bGUsXG4gICAgY29tbWVudHMoXCJqc3hBdHRyaWJ1dGVzXCIpLFxuICAgIHtcbiAgICAgICAgdG9rZW4gOiBcImVudGl0eS5vdGhlci5hdHRyaWJ1dGUtbmFtZS54bWxcIixcbiAgICAgICAgcmVnZXggOiB0YWdSZWdleFxuICAgIH0sIHtcbiAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3IuYXR0cmlidXRlLWVxdWFscy54bWxcIixcbiAgICAgICAgcmVnZXggOiBcIj1cIlxuICAgIH0sIHtcbiAgICAgICAgdG9rZW4gOiBcInRleHQudGFnLXdoaXRlc3BhY2UueG1sXCIsXG4gICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgIH0sIHtcbiAgICAgICAgdG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsXG4gICAgICAgIHJlZ2V4IDogXCInXCIsXG4gICAgICAgIHN0YXRlTmFtZSA6IFwianN4X2F0dHJfcVwiLFxuICAgICAgICBwdXNoIDogW1xuICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwiLCByZWdleDogXCInXCIsIG5leHQ6IFwicG9wXCJ9LFxuICAgICAgICAgICAge2luY2x1ZGUgOiBcInJlZmVyZW5jZVwifSxcbiAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCJ9XG4gICAgICAgIF1cbiAgICB9LCB7XG4gICAgICAgIHRva2VuIDogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwiLFxuICAgICAgICByZWdleCA6ICdcIicsXG4gICAgICAgIHN0YXRlTmFtZSA6IFwianN4X2F0dHJfcXFcIixcbiAgICAgICAgcHVzaCA6IFtcbiAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIiwgcmVnZXg6ICdcIicsIG5leHQ6IFwicG9wXCJ9LFxuICAgICAgICAgICAge2luY2x1ZGUgOiBcInJlZmVyZW5jZVwifSxcbiAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCJ9XG4gICAgICAgIF1cbiAgICB9LFxuICAgIGpzeFRhZ1xuICAgIF07XG4gICAgdGhpcy4kcnVsZXMucmVmZXJlbmNlID0gW3tcbiAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZS5yZWZlcmVuY2UueG1sXCIsXG4gICAgICAgIHJlZ2V4IDogXCIoPzomI1swLTldKzspfCg/OiYjeFswLTlhLWZBLUZdKzspfCg/OiZbYS16QS1aMC05XzpcXFxcLi1dKzspXCJcbiAgICB9XTtcbn1cblxuZnVuY3Rpb24gY29tbWVudHMobmV4dCkge1xuICAgIHJldHVybiBbXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsIC8vIG11bHRpIGxpbmUgY29tbWVudFxuICAgICAgICAgICAgcmVnZXggOiAvXFwvXFwqLyxcbiAgICAgICAgICAgIG5leHQ6IFtcbiAgICAgICAgICAgICAgICBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSgpLFxuICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwiY29tbWVudFwiLCByZWdleCA6IFwiXFxcXCpcXFxcL1wiLCBuZXh0IDogbmV4dCB8fCBcInBvcFwifSxcbiAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCIsIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZX1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbW1lbnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwvXCIsXG4gICAgICAgICAgICBuZXh0OiBbXG4gICAgICAgICAgICAgICAgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUoKSxcbiAgICAgICAgICAgICAgICB7dG9rZW4gOiBcImNvbW1lbnRcIiwgcmVnZXggOiBcIiR8XlwiLCBuZXh0IDogbmV4dCB8fCBcInBvcFwifSxcbiAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuIDogXCJjb21tZW50XCIsIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZX1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIF07XG59XG5leHBvcnRzLkphdmFTY3JpcHRIaWdobGlnaHRSdWxlcyA9IEphdmFTY3JpcHRIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgSnNEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcImNvbW1lbnQuZG9jLnRhZ1wiLCBcImNvbW1lbnQuZG9jLnRleHRcIiwgXCJscGFyZW4uZG9jXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIihAKD86cGFyYW18bWVtYmVyfHR5cGVkZWZ8cHJvcGVydHl8bmFtZXNwYWNlfHZhcnxjb25zdHxjYWxsYmFjaykpKFxcXFxzKikoeylcIixcbiAgICAgICAgICAgICAgICBwdXNoOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImxwYXJlbi5kb2NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIntcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2g6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiZG9jLXN5bnRheFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJycGFyZW4uZG9jXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIn18KD89JClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFtcInJwYXJlbi5kb2NcIiwgXCJ0ZXh0LmRvY1wiLCBcInZhcmlhYmxlLnBhcmFtZXRlci5kb2NcIiwgXCJscGFyZW4uZG9jXCIsIFwidmFyaWFibGUucGFyYW1ldGVyLmRvY1wiLCBcInJwYXJlbi5kb2NcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogLyh9KShcXHMqKSg/OihbXFx3PTpcXC9cXC5dKyl8KD86KFxcWykoW1xcdz06XFwvXFwuXFwtXFwnXFxcIiBdKykoXFxdKSkpLyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicnBhcmVuLmRvY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwifXwoPz0kKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcImRvYy1zeW50YXhcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwidGV4dC5kb2NcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXCJjb21tZW50LmRvYy50YWdcIiwgXCJ0ZXh0LmRvY1wiLCBcImxwYXJlbi5kb2NcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiKEAoPzpyZXR1cm5zP3x5aWVsZHN8dHlwZXx0aGlzfHN1cHByZXNzfHB1YmxpY3xwcm90ZWN0ZWR8cHJpdmF0ZXxwYWNrYWdlfG1vZGlmaWVzfFwiIFxuICAgICAgICAgICAgICAgICAgICArIFwiaW1wbGVtZW50c3xleHRlcm5hbHxleGNlcHRpb258dGhyb3dzfGVudW18ZGVmaW5lfGV4dGVuZHMpKShcXFxccyopKHspXCIsXG4gICAgICAgICAgICAgICAgcHVzaDogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJscGFyZW4uZG9jXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogXCJ7XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcImRvYy1zeW50YXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicnBhcmVuLmRvY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdleDogXCJ9fCg/PSQpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcInJwYXJlbi5kb2NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIn18KD89JClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCJkb2Mtc3ludGF4XCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInRleHQuZG9jXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcImNvbW1lbnQuZG9jLnRhZ1wiLCBcInRleHQuZG9jXCIsIFwidmFyaWFibGUucGFyYW1ldGVyLmRvY1wiXSxcbiAgICAgICAgICAgICAgICByZWdleDogXCIoQCg/OmFsaWFzfG1lbWJlcm9mfGluc3RhbmNlfG1vZHVsZXxuYW1lfGxlbmRzfG5hbWVzcGFjZXxleHRlcm5hbHx0aGlzfHRlbXBsYXRlfFwiIFxuICAgICAgICAgICAgICAgICAgICArIFwicmVxdWlyZXN8cGFyYW18aW1wbGVtZW50c3xmdW5jdGlvbnxleHRlbmRzfHR5cGVkZWZ8bWl4ZXN8Y29uc3RydWN0b3J8dmFyfFwiIFxuICAgICAgICAgICAgICAgICAgICArIFwibWVtYmVyb2ZcXFxcIXxldmVudHxsaXN0ZW5zfGV4cG9ydHN8Y2xhc3N8Y29uc3RydWN0c3xpbnRlcmZhY2V8ZW1pdHN8ZmlyZXN8XCIgXG4gICAgICAgICAgICAgICAgICAgICsgXCJ0aHJvd3N8Y29uc3R8Y2FsbGJhY2t8Ym9ycm93c3xhdWdtZW50cykpKFxcXFxzKykoXFxcXHdbXFxcXHcjXFwuOlxcL35cXFwiXFxcXC1dKik/XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogW1wiY29tbWVudC5kb2MudGFnXCIsIFwidGV4dC5kb2NcIiwgXCJ2YXJpYWJsZS5wYXJhbWV0ZXIuZG9jXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIihAbWV0aG9kKShcXFxccyspKFxcXFx3W1xcXFx3XFwuXFxcXChcXFxcKV0qKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5kb2MudGFnXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiQGFjY2Vzc1xcXFxzKyg/OnByaXZhdGV8cHVibGljfHByb3RlY3RlZClcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQuZG9jLnRhZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIkBraW5kXFxcXHMrKD86Y2xhc3N8Y29uc3RhbnR8ZXZlbnR8ZXh0ZXJuYWx8ZmlsZXxmdW5jdGlvbnxtZW1iZXJ8bWl4aW58bW9kdWxlfG5hbWVzcGFjZXx0eXBlZGVmKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5kb2MudGFnXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiQFxcXFx3Kyg/PVxcXFxzfCQpXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBKc0RvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRUYWdSdWxlKCksXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50LmRvYy5ib2R5XCIsXG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgfV0sXG4gICAgICAgIFwiZG9jLXN5bnRheFwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwib3BlcmF0b3IuZG9jXCIsXG4gICAgICAgICAgICByZWdleDogL1t8Ol0vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVuLmRvY1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9bXFxbXFxdXS9cbiAgICAgICAgfV1cbiAgICB9O1xuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhKc0RvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuSnNEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jLnRhZy5zdG9yYWdlLnR5cGVcIixcbiAgICAgICAgcmVnZXggOiBcIlxcXFxiKD86VE9ET3xGSVhNRXxYWFh8SEFDSylcXFxcYlwiXG4gICAgfTtcbn07XG5cbkpzRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFN0YXJ0UnVsZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jXCIsIC8vIGRvYyBjb21tZW50XG4gICAgICAgIHJlZ2V4OiAvXFwvXFwqXFwqKD8hXFwvKS8sXG4gICAgICAgIG5leHQgIDogc3RhcnRcbiAgICB9O1xufTtcblxuSnNEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZSA9IGZ1bmN0aW9uIChzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5cbmV4cG9ydHMuSnNEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBKc0RvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==