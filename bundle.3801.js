"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3801],{

/***/ 33801:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var DocCommentHighlightRules = (__webpack_require__(78004)/* .JsDocCommentHighlightRules */ .p);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

// TODO: Unicode escape sequences
var identifierRe = "[a-zA-Z\\$_\u00a1-\uffff][a-zA-Z\\d\\$_\u00a1-\uffff]*";

var JavaScriptHighlightRules = function(options) {
    // see: https://developer.mozilla.org/en/JavaScript/Reference/Global_Objects
    var keywordMapper = this.createKeywordMapper({
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
            "break|case|catch|continue|default|delete|do|else|finally|for|function|" +
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
    }, "identifier");

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

    this.$rules = {
        "no_regex" : [
            DocCommentHighlightRules.getStartRule("doc-start"),
            comments("no_regex"),
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
                // Sound.prototype.play =
                token : [
                    "storage.type", "punctuation.operator", "support.function",
                    "punctuation.operator", "entity.name.function", "text","keyword.operator"
                ],
                regex : "(" + identifierRe + ")(\\.)(prototype)(\\.)(" + identifierRe +")(\\s*)(=)",
                next: "function_arguments"
            }, {
                // Sound.play = function() {  }
                token : [
                    "storage.type", "punctuation.operator", "entity.name.function", "text",
                    "keyword.operator", "text", "storage.type", "text", "paren.lparen"
                ],
                regex : "(" + identifierRe + ")(\\.)(" + identifierRe +")(\\s*)(=)(\\s*)(function\\*?)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                // play = function() {  }
                token : [
                    "entity.name.function", "text", "keyword.operator", "text", "storage.type",
                    "text", "paren.lparen"
                ],
                regex : "(" + identifierRe +")(\\s*)(=)(\\s*)(function\\*?)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                // Sound.play = function play() {  }
                token : [
                    "storage.type", "punctuation.operator", "entity.name.function", "text",
                    "keyword.operator", "text",
                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
                ],
                regex : "(" + identifierRe + ")(\\.)(" + identifierRe +")(\\s*)(=)(\\s*)(function\\*?)(\\s+)(\\w+)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                // function myFunc(arg) { }
                token : [
                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
                ],
                regex : "(function\\*?)(\\s+)(" + identifierRe + ")(\\s*)(\\()",
                next: "function_arguments"
            }, {
                // foobar: function() { }
                token : [
                    "entity.name.function", "text", "punctuation.operator",
                    "text", "storage.type", "text", "paren.lparen"
                ],
                regex : "(" + identifierRe + ")(\\s*)(:)(\\s*)(function\\*?)(\\s*)(\\()",
                next: "function_arguments"
            }, {
                // : function() { } (this is for issues with 'foo': function() { })
                token : [
                    "text", "text", "storage.type", "text", "paren.lparen"
                ],
                regex : "(:)(\\s*)(function\\*?)(\\s*)(\\()",
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
                regex : /(console)(\.)(warn|info|log|error|time|trace|timeEnd|assert)\b/
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
                // Sound.play = function play() {  }
                token : [
                    "storage.type", "punctuation.operator", "entity.name.function", "text",
                    "keyword.operator", "text",
                    "storage.type", "text", "entity.name.function", "text", "paren.lparen"
                ],
                regex : "(" + identifierRe + ")(\\.)(" + identifierRe +")(\\s*)(=)(\\s*)(function\\*?)(?:(\\s+)(\\w+))?(\\s*)(\\()",
                next: "function_arguments"
            }, {
                token : "punctuation.operator",
                regex : /[.](?![.])/
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
            regex: "(\\()(?=.+\\s*=>)",
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
        regex : "</?" + tagRegex + "",
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
        {include : "reference"},
        {defaultToken: "string"}
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
exports._ = JavaScriptHighlightRules;


/***/ }),

/***/ 78004:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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
                        regex: /(})(\s*)(?:([\w=:\/\.]+)|(?:(\[)([\w=:\/\.]+)(\])))/,
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
            defaultToken : "comment.doc",
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
        regex : "\\/\\*(?=\\*)",
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


exports.p = JsDocCommentHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkIscUNBQXFDO0FBQ3JDLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7QUFDaEMsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQSxhQUFhO0FBQ2I7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O0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsU0FBa0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2phdmFzY3JpcHRfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvanNkb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9qc2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlc1wiKS5Kc0RvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbi8vIFRPRE86IFVuaWNvZGUgZXNjYXBlIHNlcXVlbmNlc1xudmFyIGlkZW50aWZpZXJSZSA9IFwiW2EtekEtWlxcXFwkX1xcdTAwYTEtXFx1ZmZmZl1bYS16QS1aXFxcXGRcXFxcJF9cXHUwMGExLVxcdWZmZmZdKlwiO1xuXG52YXIgSmF2YVNjcmlwdEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIC8vIHNlZTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHNcbiAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgIFwidmFyaWFibGUubGFuZ3VhZ2VcIjpcbiAgICAgICAgICAgIFwiQXJyYXl8Qm9vbGVhbnxEYXRlfEZ1bmN0aW9ufEl0ZXJhdG9yfE51bWJlcnxPYmplY3R8UmVnRXhwfFN0cmluZ3xQcm94eXxTeW1ib2x8XCIgICsgLy8gQ29uc3RydWN0b3JzXG4gICAgICAgICAgICBcIk5hbWVzcGFjZXxRTmFtZXxYTUx8WE1MTGlzdHxcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgLy8gRTRYXG4gICAgICAgICAgICBcIkFycmF5QnVmZmVyfEZsb2F0MzJBcnJheXxGbG9hdDY0QXJyYXl8SW50MTZBcnJheXxJbnQzMkFycmF5fEludDhBcnJheXxcIiAgICtcbiAgICAgICAgICAgIFwiVWludDE2QXJyYXl8VWludDMyQXJyYXl8VWludDhBcnJheXxVaW50OENsYW1wZWRBcnJheXxcIiAgICAgICAgICAgICAgICAgICAgK1xuICAgICAgICAgICAgXCJFcnJvcnxFdmFsRXJyb3J8SW50ZXJuYWxFcnJvcnxSYW5nZUVycm9yfFJlZmVyZW5jZUVycm9yfFN0b3BJdGVyYXRpb258XCIgICArIC8vIEVycm9yc1xuICAgICAgICAgICAgXCJTeW50YXhFcnJvcnxUeXBlRXJyb3J8VVJJRXJyb3J8XCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArXG4gICAgICAgICAgICBcImRlY29kZVVSSXxkZWNvZGVVUklDb21wb25lbnR8ZW5jb2RlVVJJfGVuY29kZVVSSUNvbXBvbmVudHxldmFsfGlzRmluaXRlfFwiICsgLy8gTm9uLWNvbnN0cnVjdG9yIGZ1bmN0aW9uc1xuICAgICAgICAgICAgXCJpc05hTnxwYXJzZUZsb2F0fHBhcnNlSW50fFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICArXG4gICAgICAgICAgICBcIkpTT058TWF0aHxcIiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICsgLy8gT3RoZXJcbiAgICAgICAgICAgIFwidGhpc3xhcmd1bWVudHN8cHJvdG90eXBlfHdpbmRvd3xkb2N1bWVudFwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLCAvLyBQc2V1ZG9cbiAgICAgICAgXCJrZXl3b3JkXCI6XG4gICAgICAgICAgICBcImNvbnN0fHlpZWxkfGltcG9ydHxnZXR8c2V0fGFzeW5jfGF3YWl0fFwiICtcbiAgICAgICAgICAgIFwiYnJlYWt8Y2FzZXxjYXRjaHxjb250aW51ZXxkZWZhdWx0fGRlbGV0ZXxkb3xlbHNlfGZpbmFsbHl8Zm9yfGZ1bmN0aW9ufFwiICtcbiAgICAgICAgICAgIFwiaWZ8aW58b2Z8aW5zdGFuY2VvZnxuZXd8cmV0dXJufHN3aXRjaHx0aHJvd3x0cnl8dHlwZW9mfGxldHx2YXJ8d2hpbGV8d2l0aHxkZWJ1Z2dlcnxcIiArXG4gICAgICAgICAgICAvLyBpbnZhbGlkIG9yIHJlc2VydmVkXG4gICAgICAgICAgICBcIl9fcGFyZW50X198X19jb3VudF9ffGVzY2FwZXx1bmVzY2FwZXx3aXRofF9fcHJvdG9fX3xcIiArXG4gICAgICAgICAgICBcImNsYXNzfGVudW18ZXh0ZW5kc3xzdXBlcnxleHBvcnR8aW1wbGVtZW50c3xwcml2YXRlfHB1YmxpY3xpbnRlcmZhY2V8cGFja2FnZXxwcm90ZWN0ZWR8c3RhdGljfGNvbnN0cnVjdG9yXCIsXG4gICAgICAgIFwic3RvcmFnZS50eXBlXCI6XG4gICAgICAgICAgICBcImNvbnN0fGxldHx2YXJ8ZnVuY3Rpb25cIixcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOlxuICAgICAgICAgICAgXCJudWxsfEluZmluaXR5fE5hTnx1bmRlZmluZWRcIixcbiAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6XG4gICAgICAgICAgICBcImFsZXJ0XCIsXG4gICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2UuYm9vbGVhblwiOiBcInRydWV8ZmFsc2VcIlxuICAgIH0sIFwiaWRlbnRpZmllclwiKTtcblxuICAgIC8vIGtleXdvcmRzIHdoaWNoIGNhbiBiZSBmb2xsb3dlZCBieSByZWd1bGFyIGV4cHJlc3Npb25zXG4gICAgdmFyIGt3QmVmb3JlUmUgPSBcImNhc2V8ZG98ZWxzZXxmaW5hbGx5fGlufGluc3RhbmNlb2Z8cmV0dXJufHRocm93fHRyeXx0eXBlb2Z8eWllbGR8dm9pZFwiO1xuXG4gICAgdmFyIGVzY2FwZWRSZSA9IFwiXFxcXFxcXFwoPzp4WzAtOWEtZkEtRl17Mn18XCIgKyAvLyBoZXhcbiAgICAgICAgXCJ1WzAtOWEtZkEtRl17NH18XCIgKyAvLyB1bmljb2RlXG4gICAgICAgIFwidXtbMC05YS1mQS1GXXsxLDZ9fXxcIiArIC8vIGVzNiB1bmljb2RlXG4gICAgICAgIFwiWzAtMl1bMC03XXswLDJ9fFwiICsgLy8gb2N0XG4gICAgICAgIFwiM1swLTddWzAtN10/fFwiICsgLy8gb2N0XG4gICAgICAgIFwiWzQtN11bMC03XT98XCIgKyAvL29jdFxuICAgICAgICBcIi4pXCI7XG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcIm5vX3JlZ2V4XCIgOiBbXG4gICAgICAgICAgICBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlKFwiZG9jLXN0YXJ0XCIpLFxuICAgICAgICAgICAgY29tbWVudHMoXCJub19yZWdleFwiKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIicoPz0uKVwiLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJxc3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXCIoPz0uKScsXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInFxc3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBoZXhhZGVjaW1hbCwgb2N0YWwgYW5kIGJpbmFyeVxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLzAoPzpbeFhdWzAtOWEtZkEtRl0rfFtvT11bMC03XSt8W2JCXVswMV0rKVxcYi9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBkZWNpbWFsIGludGVnZXJzIGFuZCBmbG9hdHNcbiAgICAgICAgICAgICAgICByZWdleCA6IC8oPzpcXGRcXGQqKD86XFwuXFxkKik/fFxcLlxcZCspKD86W2VFXVsrLV0/XFxkK1xcYik/L1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIFNvdW5kLnByb3RvdHlwZS5wbGF5ID1cbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJzdG9yYWdlLnR5cGVcIiwgXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLCBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLCBcImVudGl0eS5uYW1lLmZ1bmN0aW9uXCIsIFwidGV4dFwiLFwia2V5d29yZC5vcGVyYXRvclwiXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKFwiICsgaWRlbnRpZmllclJlICsgXCIpKFxcXFwuKShwcm90b3R5cGUpKFxcXFwuKShcIiArIGlkZW50aWZpZXJSZSArXCIpKFxcXFxzKikoPSlcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcImZ1bmN0aW9uX2FyZ3VtZW50c1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgLy8gU291bmQucGxheSA9IGZ1bmN0aW9uKCkgeyAgfVxuICAgICAgICAgICAgICAgIHRva2VuIDogW1xuICAgICAgICAgICAgICAgICAgICBcInN0b3JhZ2UudHlwZVwiLCBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsIFwiZW50aXR5Lm5hbWUuZnVuY3Rpb25cIiwgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwia2V5d29yZC5vcGVyYXRvclwiLCBcInRleHRcIiwgXCJzdG9yYWdlLnR5cGVcIiwgXCJ0ZXh0XCIsIFwicGFyZW4ubHBhcmVuXCJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoXCIgKyBpZGVudGlmaWVyUmUgKyBcIikoXFxcXC4pKFwiICsgaWRlbnRpZmllclJlICtcIikoXFxcXHMqKSg9KShcXFxccyopKGZ1bmN0aW9uXFxcXCo/KShcXFxccyopKFxcXFwoKVwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwiZnVuY3Rpb25fYXJndW1lbnRzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyBwbGF5ID0gZnVuY3Rpb24oKSB7ICB9XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXG4gICAgICAgICAgICAgICAgICAgIFwiZW50aXR5Lm5hbWUuZnVuY3Rpb25cIiwgXCJ0ZXh0XCIsIFwia2V5d29yZC5vcGVyYXRvclwiLCBcInRleHRcIiwgXCJzdG9yYWdlLnR5cGVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIsIFwicGFyZW4ubHBhcmVuXCJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoXCIgKyBpZGVudGlmaWVyUmUgK1wiKShcXFxccyopKD0pKFxcXFxzKikoZnVuY3Rpb25cXFxcKj8pKFxcXFxzKikoXFxcXCgpXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJmdW5jdGlvbl9hcmd1bWVudHNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIFNvdW5kLnBsYXkgPSBmdW5jdGlvbiBwbGF5KCkgeyAgfVxuICAgICAgICAgICAgICAgIHRva2VuIDogW1xuICAgICAgICAgICAgICAgICAgICBcInN0b3JhZ2UudHlwZVwiLCBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsIFwiZW50aXR5Lm5hbWUuZnVuY3Rpb25cIiwgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwia2V5d29yZC5vcGVyYXRvclwiLCBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzdG9yYWdlLnR5cGVcIiwgXCJ0ZXh0XCIsIFwiZW50aXR5Lm5hbWUuZnVuY3Rpb25cIiwgXCJ0ZXh0XCIsIFwicGFyZW4ubHBhcmVuXCJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoXCIgKyBpZGVudGlmaWVyUmUgKyBcIikoXFxcXC4pKFwiICsgaWRlbnRpZmllclJlICtcIikoXFxcXHMqKSg9KShcXFxccyopKGZ1bmN0aW9uXFxcXCo/KShcXFxccyspKFxcXFx3KykoXFxcXHMqKShcXFxcKClcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcImZ1bmN0aW9uX2FyZ3VtZW50c1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gbXlGdW5jKGFyZykgeyB9XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXG4gICAgICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlXCIsIFwidGV4dFwiLCBcImVudGl0eS5uYW1lLmZ1bmN0aW9uXCIsIFwidGV4dFwiLCBcInBhcmVuLmxwYXJlblwiXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKGZ1bmN0aW9uXFxcXCo/KShcXFxccyspKFwiICsgaWRlbnRpZmllclJlICsgXCIpKFxcXFxzKikoXFxcXCgpXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJmdW5jdGlvbl9hcmd1bWVudHNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIGZvb2JhcjogZnVuY3Rpb24oKSB7IH1cbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcbiAgICAgICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS5mdW5jdGlvblwiLCBcInRleHRcIiwgXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICBcInRleHRcIiwgXCJzdG9yYWdlLnR5cGVcIiwgXCJ0ZXh0XCIsIFwicGFyZW4ubHBhcmVuXCJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoXCIgKyBpZGVudGlmaWVyUmUgKyBcIikoXFxcXHMqKSg6KShcXFxccyopKGZ1bmN0aW9uXFxcXCo/KShcXFxccyopKFxcXFwoKVwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwiZnVuY3Rpb25fYXJndW1lbnRzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyA6IGZ1bmN0aW9uKCkgeyB9ICh0aGlzIGlzIGZvciBpc3N1ZXMgd2l0aCAnZm9vJzogZnVuY3Rpb24oKSB7IH0pXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiLCBcInRleHRcIiwgXCJzdG9yYWdlLnR5cGVcIiwgXCJ0ZXh0XCIsIFwicGFyZW4ubHBhcmVuXCJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoOikoXFxcXHMqKShmdW5jdGlvblxcXFwqPykoXFxcXHMqKShcXFxcKClcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcImZ1bmN0aW9uX2FyZ3VtZW50c1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgLy8gZnJvbSBcIm1vZHVsZS1wYXRoXCIgKHRoaXMgaXMgdGhlIG9ubHkgY2FzZSB3aGVyZSAnZnJvbScgc2hvdWxkIGJlIGEga2V5d29yZClcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJmcm9tKD89XFxcXHMqKCd8XFxcIikpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPzpcIiArIGt3QmVmb3JlUmUgKyBcIilcXFxcYlwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5jb25zdGFudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL3RoYXRcXGIvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJzdG9yYWdlLnR5cGVcIiwgXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLCBcInN1cHBvcnQuZnVuY3Rpb24uZmlyZWJ1Z1wiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IC8oY29uc29sZSkoXFwuKSh3YXJufGluZm98bG9nfGVycm9yfHRpbWV8dHJhY2V8dGltZUVuZHxhc3NlcnQpXFxiL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgICAgICByZWdleCA6IGlkZW50aWZpZXJSZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1suXSg/IVsuXSkvLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJwcm9wZXJ0eVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0b3JhZ2UudHlwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLz0+LyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvLS18XFwrXFwrfFxcLnszfXw9PT18PT18PXwhPXwhPT18PCs9P3w+Kz0/fCF8JiZ8XFx8XFx8fFxcPzp8WyEkJSYqK1xcLX5cXC9eXT0/LyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1s/Oiw7Ll0vLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1tcXFsoe10vLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1tcXF0pfV0vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXiMhLiokL1xuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBwcm9wZXJ0eTogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIFNvdW5kLnBsYXkgPSBmdW5jdGlvbiBwbGF5KCkgeyAgfVxuICAgICAgICAgICAgICAgIHRva2VuIDogW1xuICAgICAgICAgICAgICAgICAgICBcInN0b3JhZ2UudHlwZVwiLCBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsIFwiZW50aXR5Lm5hbWUuZnVuY3Rpb25cIiwgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwia2V5d29yZC5vcGVyYXRvclwiLCBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJzdG9yYWdlLnR5cGVcIiwgXCJ0ZXh0XCIsIFwiZW50aXR5Lm5hbWUuZnVuY3Rpb25cIiwgXCJ0ZXh0XCIsIFwicGFyZW4ubHBhcmVuXCJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoXCIgKyBpZGVudGlmaWVyUmUgKyBcIikoXFxcXC4pKFwiICsgaWRlbnRpZmllclJlICtcIikoXFxcXHMqKSg9KShcXFxccyopKGZ1bmN0aW9uXFxcXCo/KSg/OihcXFxccyspKFxcXFx3KykpPyhcXFxccyopKFxcXFwoKVwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwiZnVuY3Rpb25fYXJndW1lbnRzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9bLl0oPyFbLl0pL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvKHMoPzpoKD86aWZ0fG93KD86TW9kKD86ZWxlc3NEaWFsb2d8YWxEaWFsb2cpfEhlbHApKXxjcm9sbCg/Olh8QnkoPzpQYWdlc3xMaW5lcyk/fFl8VG8pP3x0KD86b3B8cmlrZSl8aSg/Om58emVUb0NvbnRlbnR8ZGViYXJ8Z25UZXh0KXxvcnR8dSg/OnB8Yig/OnN0cig/OmluZyk/KT8pfHBsaSg/OmNlfHQpfGUoPzpuZHx0KD86UmUoPzpzaXphYmxlfHF1ZXN0SGVhZGVyKXxNKD86aSg/Om51dGVzfGxsaXNlY29uZHMpfG9udGgpfFNlY29uZHN8SG8oPzp0S2V5c3x1cnMpfFllYXJ8Q3Vyc29yfFRpbWUoPzpvdXQpP3xJbnRlcnZhbHxaT3B0aW9uc3xEYXRlfFVUQyg/Ok0oPzppKD86bnV0ZXN8bGxpc2Vjb25kcyl8b250aCl8U2Vjb25kc3xIb3Vyc3xEYXRlfEZ1bGxZZWFyKXxGdWxsWWVhcnxBY3RpdmUpfGFyY2gpfHFydHxsaWNlfGF2ZVByZWZlcmVuY2VzfG1hbGwpfGgoPzpvbWV8YW5kbGVFdmVudCl8bmF2aWdhdGV8Yyg/Omhhcig/OkNvZGVBdHxBdCl8byg/OnN8big/OmNhdHx0ZXh0dWFsfGZpcm0pfG1waWxlKXxlaWx8bGVhcig/OlRpbWVvdXR8SW50ZXJ2YWwpP3xhKD86cHR1cmVFdmVudHN8bGwpfHJlYXRlKD86U3R5bGVTaGVldHxQb3B1cHxFdmVudE9iamVjdCkpfHQoPzpvKD86R01UU3RyaW5nfFMoPzp0cmluZ3xvdXJjZSl8VSg/OlRDU3RyaW5nfHBwZXJDYXNlKXxMbyg/OmNhbGVTdHJpbmd8d2VyQ2FzZSkpfGVzdHxhKD86bnxpbnQoPzpFbmFibGVkKT8pKXxpKD86cyg/Ok5hTnxGaW5pdGUpfG5kZXhPZnx0YWxpY3MpfGQoPzppc2FibGVFeHRlcm5hbENhcHR1cmV8dW1wfGV0YWNoRXZlbnQpfHUoPzpuKD86c2hpZnR8dGFpbnR8ZXNjYXBlfHdhdGNoKXxwZGF0ZUNvbW1hbmRzKXxqKD86b2lufGF2YUVuYWJsZWQpfHAoPzpvKD86cHx3KXx1c2h8bHVnaW5zLnJlZnJlc2h8YSg/OmRkaW5nc3xyc2UoPzpJbnR8RmxvYXQpPyl8cig/OmludHxvbXB0fGVmZXJlbmNlKSl8ZSg/OnNjYXBlfG5hYmxlRXh0ZXJuYWxDYXB0dXJlfHZhbHxsZW1lbnRGcm9tUG9pbnR8eCg/OnB8ZWMoPzpTY3JpcHR8Q29tbWFuZCk/KSl8dmFsdWVPZnxVVEN8cXVlcnlDb21tYW5kKD86U3RhdGV8SW5kZXRlcm18RW5hYmxlZHxWYWx1ZSl8Zig/OmkoPzpuZHxsdGVyfGxlKD86TW9kaWZpZWREYXRlfFNpemV8Q3JlYXRlZERhdGV8VXBkYXRlZERhdGUpfHhlZCl8byg/Om50KD86c2l6ZXxjb2xvcil8cndhcmR8ckVhY2gpfGxvb3J8cm9tQ2hhckNvZGUpfHdhdGNofGwoPzppbmt8byg/OmFkfGcpfGFzdEluZGV4T2YpfGEoPzpzaW58bmNob3J8Y29zfHQoPzp0YWNoRXZlbnR8b2J8YW4oPzoyKT8pfHBwbHl8bGVydHxiKD86c3xvcnQpKXxyKD86b3UoPzpuZHx0ZUV2ZW50cyl8ZSg/OnNpemUoPzpCeXxUbyl8Y2FsY3x0dXJuVmFsdWV8cGxhY2V8dmVyc2V8bCg/Om9hZHxlYXNlKD86Q2FwdHVyZXxFdmVudHMpKSl8YW5kb20pfGcoPzpvfGV0KD86UmVzcG9uc2VIZWFkZXJ8TSg/OmkoPzpudXRlc3xsbGlzZWNvbmRzKXxvbnRoKXxTZSg/OmNvbmRzfGxlY3Rpb24pfEhvdXJzfFllYXJ8VGltZSg/OnpvbmVPZmZzZXQpP3xEYSg/Onl8dGUpfFVUQyg/Ok0oPzppKD86bnV0ZXN8bGxpc2Vjb25kcyl8b250aCl8U2Vjb25kc3xIb3Vyc3xEYSg/Onl8dGUpfEZ1bGxZZWFyKXxGdWxsWWVhcnxBKD86dHRlbnRpb258bGxSZXNwb25zZUhlYWRlcnMpKSl8bSg/OmlufG92ZSg/OkIoPzp5fGVsb3cpfFRvKD86QWJzb2x1dGUpP3xBYm92ZSl8ZXJnZUF0dHJpYnV0ZXN8YSg/OnRjaHxyZ2luc3x4KSl8Yig/OnRvYXxpZ3xvKD86bGR8cmRlcldpZHRocyl8bGlua3xhY2spKVxcYig/PVxcKCkvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb24uZG9tXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvKHMoPzp1Yig/OnN0cmluZ0RhdGF8bWl0KXxwbGl0VGV4dHxlKD86dCg/Ok5hbWVkSXRlbXxBdHRyaWJ1dGUoPzpOb2RlKT8pfGxlY3QpKXxoYXMoPzpDaGlsZE5vZGVzfEZlYXR1cmUpfG5hbWVkSXRlbXxjKD86bCg/Omlja3xvKD86c2V8bmVOb2RlKSl8cmVhdGUoPzpDKD86b21tZW50fERBVEFTZWN0aW9ufGFwdGlvbil8VCg/OkhlYWR8ZXh0Tm9kZXxGb290KXxEb2N1bWVudEZyYWdtZW50fFByb2Nlc3NpbmdJbnN0cnVjdGlvbnxFKD86bnRpdHlSZWZlcmVuY2V8bGVtZW50KXxBdHRyaWJ1dGUpKXx0YWJJbmRleHxpKD86bnNlcnQoPzpSb3d8QmVmb3JlfENlbGx8RGF0YSl8dGVtKXxvcGVufGRlbGV0ZSg/OlJvd3xDKD86ZWxsfGFwdGlvbil8VCg/OkhlYWR8Rm9vdCl8RGF0YSl8Zm9jdXN8d3JpdGUoPzpsbik/fGEoPzpkZHxwcGVuZCg/OkNoaWxkfERhdGEpKXxyZSg/OnNldHxwbGFjZSg/OkNoaWxkfERhdGEpfG1vdmUoPzpOYW1lZEl0ZW18Q2hpbGR8QXR0cmlidXRlKD86Tm9kZSk/KT8pfGdldCg/Ok5hbWVkSXRlbXxFbGVtZW50KD86c0J5KD86TmFtZXxUYWdOYW1lfENsYXNzTmFtZSl8QnlJZCl8QXR0cmlidXRlKD86Tm9kZSk/KXxibHVyKVxcYig/PVxcKCkvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiAgXCJzdXBwb3J0LmNvbnN0YW50XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAvKHMoPzp5c3RlbUxhbmd1YWdlfGNyKD86aXB0c3xvbGxiYXJzfGVlbig/Olh8WXxUb3B8TGVmdCkpfHQoPzp5bGUoPzpTaGVldHMpP3xhdHVzKD86VGV4dHxiYXIpPyl8aWJsaW5nKD86QmVsb3d8QWJvdmUpfG91cmNlfHVmZml4ZXN8ZSg/OmN1cml0eSg/OlBvbGljeSk/fGwoPzplY3Rpb258ZikpKXxoKD86aXN0b3J5fG9zdCg/Om5hbWUpP3xhcyg/Omh8Rm9jdXMpKXx5fFgoPzpNTERvY3VtZW50fFNMRG9jdW1lbnQpfG4oPzpleHR8YW1lKD86c3BhY2UoPzpzfFVSSSl8UHJvcCkpfE0oPzpJTl9WQUxVRXxBWF9WQUxVRSl8Yyg/OmhhcmFjdGVyU2V0fG8oPzpuKD86c3RydWN0b3J8dHJvbGxlcnMpfG9raWVFbmFibGVkfGxvckRlcHRofG1wKD86b25lbnRzfGxldGUpKXx1cnJlbnR8cHVDbGFzc3xsKD86aSg/OnAoPzpib2FyZERhdGEpP3xlbnRJbmZvcm1hdGlvbil8b3NlZHxhc3Nlcyl8YWxsZSg/OmV8cil8cnlwdG8pfHQoPzpvKD86b2xiYXJ8cCl8ZXh0KD86VHJhbnNmb3JtfEluZGVudHxEZWNvcmF0aW9ufEFsaWduKXxhZ3MpfFNRUlQoPzoxXzJ8Mil8aSg/Om4oPzpuZXIoPzpIZWlnaHR8V2lkdGgpfHB1dCl8ZHN8Z25vcmVDYXNlKXx6SW5kZXh8byg/OnNjcHV8big/OnJlYWR5c3RhdGVjaGFuZ2V8TGluZSl8dXRlcig/OkhlaWdodHxXaWR0aCl8cCg/OnNQcm9maWxlfGVuZXIpfGZmc2NyZWVuQnVmZmVyaW5nKXxORUdBVElWRV9JTkZJTklUWXxkKD86aSg/OnNwbGF5fGFsb2coPzpIZWlnaHR8VG9wfFdpZHRofExlZnR8QXJndW1lbnRzKXxyZWN0b3JpZXMpfGUoPzpzY3JpcHRpb258ZmF1bHQoPzpTdGF0dXN8Q2goPzplY2tlZHxhcnNldCl8VmlldykpKXx1KD86c2VyKD86UHJvZmlsZXxMYW5ndWFnZXxBZ2VudCl8big/OmlxdWVJRHxkZWZpbmVkKXxwZGF0ZUludGVydmFsKXxfY29udGVudHxwKD86aXhlbERlcHRofG9ydHxlcnNvbmFsYmFyfGtjczExfGwoPzp1Z2luc3xhdGZvcm0pfGEoPzp0aG5hbWV8ZGRpbmcoPzpSaWdodHxCb3R0b218VG9wfExlZnQpfHJlbnQoPzpXaW5kb3d8TGF5ZXIpP3xnZSg/OlgoPzpPZmZzZXQpP3xZKD86T2Zmc2V0KT8pKXxyKD86byg/OnRvKD86Y29sfHR5cGUpfGR1Y3QoPzpTdWIpP3xtcHRlcil8ZSg/OnZpb3VzfGZpeCkpKXxlKD86big/OmNvZGluZ3xhYmxlZFBsdWdpbil8eCg/OnRlcm5hbHxwYW5kbyl8bWJlZHMpfHYoPzppc2liaWxpdHl8ZW5kb3IoPzpTdWIpP3xMaW5rY29sb3IpfFVSTFVuZW5jb2RlZHxQKD86SXxPU0lUSVZFX0lORklOSVRZKXxmKD86aWxlbmFtZXxvKD86bnQoPzpTaXplfEZhbWlseXxXZWlnaHQpfHJtTmFtZSl8cmFtZSg/OnN8RWxlbWVudCl8Z0NvbG9yKXxFfHdoaXRlU3BhY2V8bCg/OmkoPzpzdFN0eWxlVHlwZXxuKD86ZUhlaWdodHxrQ29sb3IpKXxvKD86Y2EoPzp0aW9uKD86YmFyKT98bE5hbWUpfHdzcmMpfGUoPzpuZ3RofGZ0KD86Q29udGV4dCk/KXxhKD86c3QoPzpNKD86b2RpZmllZHxhdGNoKXxJbmRleHxQYXJlbil8eWVyKD86c3xYKXxuZ3VhZ2UpKXxhKD86cHAoPzpNaW5vclZlcnNpb258TmFtZXxDbyg/OmRlTmFtZXxyZSl8VmVyc2lvbil8dmFpbCg/OkhlaWdodHxUb3B8V2lkdGh8TGVmdCl8bGx8cig/Oml0eXxndW1lbnRzKXxMaW5rY29sb3J8Ym92ZSl8cig/OmlnaHQoPzpDb250ZXh0KT98ZSg/OnNwb25zZSg/OlhNTHxUZXh0KXxhZHlTdGF0ZSkpfGdsb2JhbHx4fG0oPzppbWVUeXBlc3x1bHRpbGluZXxlbnViYXJ8YXJnaW4oPzpSaWdodHxCb3R0b218VG9wfExlZnQpKXxMKD86Tig/OjEwfDIpfE9HKD86MTBFfDJFKSl8Yig/Om8oPzp0dG9tfHJkZXIoPzpXaWR0aHxSaWdodFdpZHRofEJvdHRvbVdpZHRofFN0eWxlfENvbG9yfFRvcFdpZHRofExlZnRXaWR0aCkpfHVmZmVyRGVwdGh8ZWxvd3xhY2tncm91bmQoPzpDb2xvcnxJbWFnZSkpKVxcYi9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiaWRlbnRpZmllclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogaWRlbnRpZmllclJlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXCIsXG4gICAgICAgICAgICAgICAgdG9rZW46IFwiZW1wdHlcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcIm5vX3JlZ2V4XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gcmVndWxhciBleHByZXNzaW9ucyBhcmUgb25seSBhbGxvd2VkIGFmdGVyIGNlcnRhaW4gdG9rZW5zLiBUaGlzXG4gICAgICAgIC8vIG1ha2VzIHN1cmUgd2UgZG9uJ3QgbWl4IHVwIHJlZ2V4cHMgd2l0aCB0aGUgZGl2aXNvbiBvcGVyYXRvclxuICAgICAgICBcInN0YXJ0XCI6IFtcbiAgICAgICAgICAgIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUoXCJkb2Mtc3RhcnRcIiksXG4gICAgICAgICAgICBjb21tZW50cyhcInN0YXJ0XCIpLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5yZWdleHBcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcL1wiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicmVnZXhcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK3xeJFwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyBpbW1lZGlhdGVseSByZXR1cm4gdG8gdGhlIHN0YXJ0IG1vZGUgd2l0aG91dCBtYXRjaGluZ1xuICAgICAgICAgICAgICAgIC8vIGFueXRoaW5nXG4gICAgICAgICAgICAgICAgdG9rZW46IFwiZW1wdHlcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcIm5vX3JlZ2V4XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJyZWdleFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLy8gZXNjYXBlc1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInJlZ2V4cC5rZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXFxcXFwoPzp1W1xcXFxkYS1mQS1GXXs0fXx4W1xcXFxkYS1mQS1GXXsyfXwuKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgLy8gZmxhZ1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5yZWdleHBcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIvW3N4bmdpbXldKlwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwibm9fcmVnZXhcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIC8vIGludmFsaWQgb3BlcmF0b3JzXG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImludmFsaWRcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xce1xcZCtcXGIsP1xcZCpcXH1bKypdfFsrKiReP11bKypdfFskXl1bP118XFw/ezMsfS9cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAvLyBvcGVyYXRvcnNcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXChcXD9bOj0hXXxcXCl8XFx7XFxkK1xcYiw/XFxkKlxcfXxbKypdXFw/fFsoKSReKyo/Ll0vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmRlbGltaXRlclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFx8L1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxbXFxePy8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJyZWdleF9jaGFyYWN0ZXJfY2xhc3NcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImVtcHR5XCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiJFwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwibm9fcmVnZXhcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucmVnZXhwXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJyZWdleF9jaGFyYWN0ZXJfY2xhc3NcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInJlZ2V4cC5jaGFyY2xhc3Mua2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxcXFxcKD86dVtcXFxcZGEtZkEtRl17NH18eFtcXFxcZGEtZkEtRl17Mn18LilcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIl1cIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcInJlZ2V4XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCItXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJlbXB0eVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIiRcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcIm5vX3JlZ2V4XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nLnJlZ2V4cC5jaGFyYWNodGVyY2xhc3NcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcImRlZmF1bHRfcGFyYW1ldGVyXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIicoPz0uKVwiLFxuICAgICAgICAgICAgICAgIHB1c2g6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogXCInfCRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCJxc3RyaW5nXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiAnXCIoPz0uKScsXG4gICAgICAgICAgICAgICAgcHVzaDogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXCJ8JCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwicXFzdHJpbmdcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJudWxsfEluZmluaXR5fE5hTnx1bmRlZmluZWRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGhleGFkZWNpbWFsLCBvY3RhbCBhbmQgYmluYXJ5XG4gICAgICAgICAgICAgICAgcmVnZXggOiAvMCg/Olt4WF1bMC05YS1mQS1GXSt8W29PXVswLTddK3xbYkJdWzAxXSspXFxiL1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGRlY2ltYWwgaW50ZWdlcnMgYW5kIGZsb2F0c1xuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyg/OlxcZFxcZCooPzpcXC5cXGQqKT98XFwuXFxkKykoPzpbZUVdWystXT9cXGQrXFxiKT8vXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIsXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJmdW5jdGlvbl9hcmd1bWVudHNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxccytcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiJFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiZW1wdHlcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcIm5vX3JlZ2V4XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXSxcbiAgICAgICAgXCJmdW5jdGlvbl9hcmd1bWVudHNcIjogW1xuICAgICAgICAgICAgY29tbWVudHMoXCJmdW5jdGlvbl9hcmd1bWVudHNcIiksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUucGFyYW1ldGVyXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IGlkZW50aWZpZXJSZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiLFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIkXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJlbXB0eVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwibm9fcmVnZXhcIlxuICAgICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICBcInFxc3RyaW5nXCIgOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogZXNjYXBlZFJlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcXFxcXCRcIixcbiAgICAgICAgICAgICAgICBjb25zdW1lTGluZUVuZCAgOiB0cnVlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogJ1wifCQnLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJub19yZWdleFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwicXN0cmluZ1wiIDogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IGVzY2FwZWRSZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXFxcXFwkXCIsXG4gICAgICAgICAgICAgICAgY29uc3VtZUxpbmVFbmQgIDogdHJ1ZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmdcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiJ3wkXCIsXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcIm5vX3JlZ2V4XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG5cblxuICAgIGlmICghb3B0aW9ucyB8fCAhb3B0aW9ucy5ub0VTNikge1xuICAgICAgICB0aGlzLiRydWxlcy5ub19yZWdleC51bnNoaWZ0KHtcbiAgICAgICAgICAgIHJlZ2V4OiBcIlt7fV1cIiwgb25NYXRjaDogZnVuY3Rpb24odmFsLCBzdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSB2YWwgPT0gXCJ7XCIgPyB0aGlzLm5leHRTdGF0ZSA6IFwiXCI7XG4gICAgICAgICAgICAgICAgaWYgKHZhbCA9PSBcIntcIiAmJiBzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdChcInN0YXJ0XCIsIHN0YXRlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsID09IFwifVwiICYmIHN0YWNrLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5uZXh0LmluZGV4T2YoXCJzdHJpbmdcIikgIT0gLTEgfHwgdGhpcy5uZXh0LmluZGV4T2YoXCJqc3hcIikgIT0gLTEpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJwYXJlbi5xdWFzaS5lbmRcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbCA9PSBcIntcIiA/IFwicGFyZW4ubHBhcmVuXCIgOiBcInBhcmVuLnJwYXJlblwiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG5leHRTdGF0ZTogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcucXVhc2kuc3RhcnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL2AvLFxuICAgICAgICAgICAgcHVzaCAgOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IGVzY2FwZWRSZVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwYXJlbi5xdWFzaS5zdGFydFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogL1xcJHsvLFxuICAgICAgICAgICAgICAgIHB1c2ggIDogXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5xdWFzaS5lbmRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IC9gLyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nLnF1YXNpXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBbXCJ2YXJpYWJsZS5wYXJhbWV0ZXJcIiwgXCJ0ZXh0XCJdLFxuICAgICAgICAgICAgcmVnZXg6IFwiKFwiICsgaWRlbnRpZmllclJlICsgXCIpKFxcXFxzKikoPz1cXFxcPT4pXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleDogXCIoXFxcXCgpKD89LitcXFxccyo9PilcIixcbiAgICAgICAgICAgIG5leHQ6IFwiZnVuY3Rpb25fYXJndW1lbnRzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIig/Oig/Oig/OldlYWspPyg/OlNldHxNYXApKXxQcm9taXNlKVxcXFxiXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy4kcnVsZXNbXCJmdW5jdGlvbl9hcmd1bWVudHNcIl0udW5zaGlmdCh7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICByZWdleDogXCI9XCIsXG4gICAgICAgICAgICBuZXh0OiBcImRlZmF1bHRfcGFyYW1ldGVyXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXC57M31cIlxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRydWxlc1tcInByb3BlcnR5XCJdLnVuc2hpZnQoe1xuICAgICAgICAgICAgdG9rZW46IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKGZpbmRJbmRleHxyZXBlYXR8c3RhcnRzV2l0aHxlbmRzV2l0aHxpbmNsdWRlc3xpc1NhZmVJbnRlZ2VyfHRydW5jfGNicnR8bG9nMnxsb2cxMHxzaWdufHRoZW58Y2F0Y2h8XCJcbiAgICAgICAgICAgICAgICArIFwiZmluYWxseXxyZXNvbHZlfHJlamVjdHxyYWNlfGFueXxhbGx8YWxsU2V0dGxlZHxrZXlzfGVudHJpZXN8aXNJbnRlZ2VyKVxcXFxiKD89XFxcXCgpXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiKD86TUFYX1NBRkVfSU5URUdFUnxNSU5fU0FGRV9JTlRFR0VSfEVQU0lMT04pXFxcXGJcIlxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIW9wdGlvbnMgfHwgb3B0aW9ucy5qc3ggIT0gZmFsc2UpXG4gICAgICAgICAgICBKU1guY2FsbCh0aGlzKTtcbiAgICB9XG5cbiAgICB0aGlzLmVtYmVkUnVsZXMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBcImRvYy1cIixcbiAgICAgICAgWyBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZShcIm5vX3JlZ2V4XCIpIF0pO1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxub29wLmluaGVyaXRzKEphdmFTY3JpcHRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZnVuY3Rpb24gSlNYKCkge1xuICAgIHZhciB0YWdSZWdleCA9IGlkZW50aWZpZXJSZS5yZXBsYWNlKFwiXFxcXGRcIiwgXCJcXFxcZFxcXFwtXCIpO1xuICAgIHZhciBqc3hUYWcgPSB7XG4gICAgICAgIG9uTWF0Y2ggOiBmdW5jdGlvbih2YWwsIHN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgdmFyIG9mZnNldCA9IHZhbC5jaGFyQXQoMSkgPT0gXCIvXCIgPyAyIDogMTtcbiAgICAgICAgICAgIGlmIChvZmZzZXQgPT0gMSkge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSAhPSB0aGlzLm5leHRTdGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgc3RhY2sudW5zaGlmdCh0aGlzLm5leHQsIHRoaXMubmV4dFN0YXRlLCAwKTtcbiAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnVuc2hpZnQodGhpcy5uZXh0KTtcbiAgICAgICAgICAgICAgICBzdGFja1syXSsrO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChvZmZzZXQgPT0gMikge1xuICAgICAgICAgICAgICAgIGlmIChzdGF0ZSA9PSB0aGlzLm5leHRTdGF0ZSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFja1sxXS0tO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YWNrWzFdIHx8IHN0YWNrWzFdIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgICAgICB0eXBlOiBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLlwiICsgKG9mZnNldCA9PSAxID8gXCJcIiA6IFwiZW5kLVwiKSArIFwidGFnLW9wZW4ueG1sXCIsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbC5zbGljZSgwLCBvZmZzZXQpXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJtZXRhLnRhZy50YWctbmFtZS54bWxcIixcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsLnN1YnN0cihvZmZzZXQpXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgfSxcbiAgICAgICAgcmVnZXggOiBcIjwvP1wiICsgdGFnUmVnZXggKyBcIlwiLFxuICAgICAgICBuZXh0OiBcImpzeEF0dHJpYnV0ZXNcIixcbiAgICAgICAgbmV4dFN0YXRlOiBcImpzeFwiXG4gICAgfTtcbiAgICB0aGlzLiRydWxlcy5zdGFydC51bnNoaWZ0KGpzeFRhZyk7XG4gICAgdmFyIGpzeEpzUnVsZSA9IHtcbiAgICAgICAgcmVnZXg6IFwie1wiLFxuICAgICAgICB0b2tlbjogXCJwYXJlbi5xdWFzaS5zdGFydFwiLFxuICAgICAgICBwdXNoOiBcInN0YXJ0XCJcbiAgICB9O1xuICAgIHRoaXMuJHJ1bGVzLmpzeCA9IFtcbiAgICAgICAganN4SnNSdWxlLFxuICAgICAgICBqc3hUYWcsXG4gICAgICAgIHtpbmNsdWRlIDogXCJyZWZlcmVuY2VcIn0sXG4gICAgICAgIHtkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJ9XG4gICAgXTtcbiAgICB0aGlzLiRydWxlcy5qc3hBdHRyaWJ1dGVzID0gW3tcbiAgICAgICAgdG9rZW4gOiBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1jbG9zZS54bWxcIixcbiAgICAgICAgcmVnZXggOiBcIi8/PlwiLFxuICAgICAgICBvbk1hdGNoIDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50U3RhdGUgPT0gc3RhY2tbMF0pXG4gICAgICAgICAgICAgICAgc3RhY2suc2hpZnQoKTtcbiAgICAgICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT0gMikge1xuICAgICAgICAgICAgICAgIGlmIChzdGFja1swXSA9PSB0aGlzLm5leHRTdGF0ZSlcbiAgICAgICAgICAgICAgICAgICAgc3RhY2tbMV0tLTtcbiAgICAgICAgICAgICAgICBpZiAoIXN0YWNrWzFdIHx8IHN0YWNrWzFdIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay5zcGxpY2UoMCwgMik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5uZXh0ID0gc3RhY2tbMF0gfHwgXCJzdGFydFwiO1xuICAgICAgICAgICAgcmV0dXJuIFt7dHlwZTogdGhpcy50b2tlbiwgdmFsdWU6IHZhbHVlfV07XG4gICAgICAgIH0sXG4gICAgICAgIG5leHRTdGF0ZTogXCJqc3hcIlxuICAgIH0sXG4gICAganN4SnNSdWxlLFxuICAgIGNvbW1lbnRzKFwianN4QXR0cmlidXRlc1wiKSxcbiAgICB7XG4gICAgICAgIHRva2VuIDogXCJlbnRpdHkub3RoZXIuYXR0cmlidXRlLW5hbWUueG1sXCIsXG4gICAgICAgIHJlZ2V4IDogdGFnUmVnZXhcbiAgICB9LCB7XG4gICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yLmF0dHJpYnV0ZS1lcXVhbHMueG1sXCIsXG4gICAgICAgIHJlZ2V4IDogXCI9XCJcbiAgICB9LCB7XG4gICAgICAgIHRva2VuIDogXCJ0ZXh0LnRhZy13aGl0ZXNwYWNlLnhtbFwiLFxuICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICB9LCB7XG4gICAgICAgIHRva2VuIDogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwiLFxuICAgICAgICByZWdleCA6IFwiJ1wiLFxuICAgICAgICBzdGF0ZU5hbWUgOiBcImpzeF9hdHRyX3FcIixcbiAgICAgICAgcHVzaCA6IFtcbiAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIiwgcmVnZXg6IFwiJ1wiLCBuZXh0OiBcInBvcFwifSxcbiAgICAgICAgICAgIHtpbmNsdWRlIDogXCJyZWZlcmVuY2VcIn0sXG4gICAgICAgICAgICB7ZGVmYXVsdFRva2VuIDogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwifVxuICAgICAgICBdXG4gICAgfSwge1xuICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIixcbiAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICBzdGF0ZU5hbWUgOiBcImpzeF9hdHRyX3FxXCIsXG4gICAgICAgIHB1c2ggOiBbXG4gICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsIHJlZ2V4OiAnXCInLCBuZXh0OiBcInBvcFwifSxcbiAgICAgICAgICAgIHtpbmNsdWRlIDogXCJyZWZlcmVuY2VcIn0sXG4gICAgICAgICAgICB7ZGVmYXVsdFRva2VuIDogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwifVxuICAgICAgICBdXG4gICAgfSxcbiAgICBqc3hUYWdcbiAgICBdO1xuICAgIHRoaXMuJHJ1bGVzLnJlZmVyZW5jZSA9IFt7XG4gICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGUucmVmZXJlbmNlLnhtbFwiLFxuICAgICAgICByZWdleCA6IFwiKD86JiNbMC05XSs7KXwoPzomI3hbMC05YS1mQS1GXSs7KXwoPzomW2EtekEtWjAtOV86XFxcXC4tXSs7KVwiXG4gICAgfV07XG59XG5cbmZ1bmN0aW9uIGNvbW1lbnRzKG5leHQpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29tbWVudFwiLCAvLyBtdWx0aSBsaW5lIGNvbW1lbnRcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcL1xcKi8sXG4gICAgICAgICAgICBuZXh0OiBbXG4gICAgICAgICAgICAgICAgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUoKSxcbiAgICAgICAgICAgICAgICB7dG9rZW4gOiBcImNvbW1lbnRcIiwgcmVnZXggOiBcIlxcXFwqXFxcXC9cIiwgbmV4dCA6IG5leHQgfHwgXCJwb3BcIn0sXG4gICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiLCBjYXNlSW5zZW5zaXRpdmU6IHRydWV9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb21tZW50XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcL1wiLFxuICAgICAgICAgICAgbmV4dDogW1xuICAgICAgICAgICAgICAgIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRUYWdSdWxlKCksXG4gICAgICAgICAgICAgICAge3Rva2VuIDogXCJjb21tZW50XCIsIHJlZ2V4IDogXCIkfF5cIiwgbmV4dCA6IG5leHQgfHwgXCJwb3BcIn0sXG4gICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiLCBjYXNlSW5zZW5zaXRpdmU6IHRydWV9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICBdO1xufVxuZXhwb3J0cy5KYXZhU2NyaXB0SGlnaGxpZ2h0UnVsZXMgPSBKYXZhU2NyaXB0SGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIEpzRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXCJjb21tZW50LmRvYy50YWdcIiwgXCJjb21tZW50LmRvYy50ZXh0XCIsIFwibHBhcmVuLmRvY1wiXSxcbiAgICAgICAgICAgICAgICByZWdleDogXCIoQCg/OnBhcmFtfG1lbWJlcnx0eXBlZGVmfHByb3BlcnR5fG5hbWVzcGFjZXx2YXJ8Y29uc3R8Y2FsbGJhY2spKShcXFxccyopKHspXCIsXG4gICAgICAgICAgICAgICAgcHVzaDogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJscGFyZW4uZG9jXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogXCJ7XCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBwdXNoOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcImRvYy1zeW50YXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicnBhcmVuLmRvY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWdleDogXCJ9fCg/PSQpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBbXCJycGFyZW4uZG9jXCIsIFwidGV4dC5kb2NcIiwgXCJ2YXJpYWJsZS5wYXJhbWV0ZXIuZG9jXCIsIFwibHBhcmVuLmRvY1wiLCBcInZhcmlhYmxlLnBhcmFtZXRlci5kb2NcIiwgXCJycGFyZW4uZG9jXCJdLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IC8ofSkoXFxzKikoPzooW1xcdz06XFwvXFwuXSspfCg/OihcXFspKFtcXHc9OlxcL1xcLl0rKShcXF0pKSkvLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJycGFyZW4uZG9jXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICByZWdleDogXCJ9fCg/PSQpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiZG9jLXN5bnRheFwiXG4gICAgICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJ0ZXh0LmRvY1wiXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcImNvbW1lbnQuZG9jLnRhZ1wiLCBcInRleHQuZG9jXCIsIFwibHBhcmVuLmRvY1wiXSxcbiAgICAgICAgICAgICAgICByZWdleDogXCIoQCg/OnJldHVybnM/fHlpZWxkc3x0eXBlfHRoaXN8c3VwcHJlc3N8cHVibGljfHByb3RlY3RlZHxwcml2YXRlfHBhY2thZ2V8bW9kaWZpZXN8XCIgXG4gICAgICAgICAgICAgICAgICAgICsgXCJpbXBsZW1lbnRzfGV4dGVybmFsfGV4Y2VwdGlvbnx0aHJvd3N8ZW51bXxkZWZpbmV8ZXh0ZW5kcykpKFxcXFxzKikoeylcIixcbiAgICAgICAgICAgICAgICBwdXNoOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImxwYXJlbi5kb2NcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIntcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2g6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiZG9jLXN5bnRheFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b2tlbjogXCJycGFyZW4uZG9jXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIn18KD89JClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwicnBhcmVuLmRvY1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwifXwoPz0kKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcImRvYy1zeW50YXhcIlxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwidGV4dC5kb2NcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogW1wiY29tbWVudC5kb2MudGFnXCIsIFwidGV4dC5kb2NcIiwgXCJ2YXJpYWJsZS5wYXJhbWV0ZXIuZG9jXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIihAKD86YWxpYXN8bWVtYmVyb2Z8aW5zdGFuY2V8bW9kdWxlfG5hbWV8bGVuZHN8bmFtZXNwYWNlfGV4dGVybmFsfHRoaXN8dGVtcGxhdGV8XCIgXG4gICAgICAgICAgICAgICAgICAgICsgXCJyZXF1aXJlc3xwYXJhbXxpbXBsZW1lbnRzfGZ1bmN0aW9ufGV4dGVuZHN8dHlwZWRlZnxtaXhlc3xjb25zdHJ1Y3Rvcnx2YXJ8XCIgXG4gICAgICAgICAgICAgICAgICAgICsgXCJtZW1iZXJvZlxcXFwhfGV2ZW50fGxpc3RlbnN8ZXhwb3J0c3xjbGFzc3xjb25zdHJ1Y3RzfGludGVyZmFjZXxlbWl0c3xmaXJlc3xcIiBcbiAgICAgICAgICAgICAgICAgICAgKyBcInRocm93c3xjb25zdHxjYWxsYmFja3xib3Jyb3dzfGF1Z21lbnRzKSkoXFxcXHMrKShcXFxcd1tcXFxcdyNcXC46XFwvflxcXCJcXFxcLV0qKT9cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXCJjb21tZW50LmRvYy50YWdcIiwgXCJ0ZXh0LmRvY1wiLCBcInZhcmlhYmxlLnBhcmFtZXRlci5kb2NcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiKEBtZXRob2QpKFxcXFxzKykoXFxcXHdbXFxcXHdcXC5cXFxcKFxcXFwpXSopXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmRvYy50YWdcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJAYWNjZXNzXFxcXHMrKD86cHJpdmF0ZXxwdWJsaWN8cHJvdGVjdGVkKVwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5kb2MudGFnXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiQGtpbmRcXFxccysoPzpjbGFzc3xjb25zdGFudHxldmVudHxleHRlcm5hbHxmaWxlfGZ1bmN0aW9ufG1lbWJlcnxtaXhpbnxtb2R1bGV8bmFtZXNwYWNlfHR5cGVkZWYpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmRvYy50YWdcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJAXFxcXHcrKD89XFxcXHN8JClcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIEpzRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUoKSxcbiAgICAgICAge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJjb21tZW50LmRvY1wiLFxuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgIH1dLFxuICAgICAgICBcImRvYy1zeW50YXhcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcIm9wZXJhdG9yLmRvY1wiLFxuICAgICAgICAgICAgcmVnZXg6IC9bfDpdL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwYXJlbi5kb2NcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvW1xcW1xcXV0vXG4gICAgICAgIH1dXG4gICAgfTtcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoSnNEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbkpzRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvYy50YWcuc3RvcmFnZS50eXBlXCIsXG4gICAgICAgIHJlZ2V4IDogXCJcXFxcYig/OlRPRE98RklYTUV8WFhYfEhBQ0spXFxcXGJcIlxuICAgIH07XG59O1xuXG5Kc0RvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBkb2MgY29tbWVudFxuICAgICAgICByZWdleCA6IFwiXFxcXC9cXFxcKig/PVxcXFwqKVwiLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cbkpzRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldEVuZFJ1bGUgPSBmdW5jdGlvbiAoc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgIG5leHQgIDogc3RhcnRcbiAgICB9O1xufTtcblxuXG5leHBvcnRzLkpzRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gSnNEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=