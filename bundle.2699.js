"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2699],{

/***/ 37028:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var oop = __webpack_require__(2645);
var Behaviour = (__webpack_require__(75684)/* .Behaviour */ .Q);
var CstyleBehaviour = (__webpack_require__(32589)/* .CstyleBehaviour */ ._);
var TokenIterator = (__webpack_require__(99339).TokenIterator);

/**@type {(new() => Partial<import("../../../ace-internal").Ace.Behaviour>)}*/
var CssBehaviour = function () {

    this.inherit(CstyleBehaviour);

    this.add("colon", "insertion", function (state, action, editor, session, text) {
        if (text === ':' && editor.selection.isEmpty()) {
            var cursor = editor.getCursorPosition();
            var iterator = new TokenIterator(session, cursor.row, cursor.column);
            var token = iterator.getCurrentToken();
            if (token && token.value.match(/\s+/)) {
                token = iterator.stepBackward();
            }
            if (token && token.type === 'support.type') {
                var line = session.doc.getLine(cursor.row);
                var rightChar = line.substring(cursor.column, cursor.column + 1);
                if (rightChar === ':') {
                    return {
                       text: '',
                       selection: [1, 1]
                    };
                }
                if (/^(\s+[^;]|\s*$)/.test(line.substring(cursor.column))) {
                    return {
                       text: ':;',
                       selection: [1, 1]
                    };
                }
            }
        }
    });

    this.add("colon", "deletion", function (state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected === ':') {
            var cursor = editor.getCursorPosition();
            var iterator = new TokenIterator(session, cursor.row, cursor.column);
            var token = iterator.getCurrentToken();
            if (token && token.value.match(/\s+/)) {
                token = iterator.stepBackward();
            }
            if (token && token.type === 'support.type') {
                var line = session.doc.getLine(range.start.row);
                var rightChar = line.substring(range.end.column, range.end.column + 1);
                if (rightChar === ';') {
                    range.end.column ++;
                    return range;
                }
            }
        }
    });

    this.add("semicolon", "insertion", function (state, action, editor, session, text) {
        if (text === ';' && editor.selection.isEmpty()) {
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar === ';') {
                return {
                   text: '',
                   selection: [1, 1]
                };
            }
        }
    });

    this.add("!important", "insertion", function (state, action, editor, session, text) {
        if (text === '!' && editor.selection.isEmpty()) {
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);

            if (/^\s*(;|}|$)/.test(line.substring(cursor.column))) {
                return {
                    text: '!important',
                    selection: [10, 10]
                };
            }
        }
    });

};
oop.inherits(CssBehaviour, CstyleBehaviour);

exports.r = CssBehaviour;


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

/***/ 98137:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var modes = (__webpack_require__(76321).$modes);

var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);

var escaped = function(ch) {
    return "(?:[^" + lang.escapeRegExp(ch) + "\\\\]|\\\\.)*";
};

var MarkdownHighlightRules = function() {
    HtmlHighlightRules.call(this);
    // regexp must not have capturing parentheses
    // regexps are ordered -> the first match is used
    var codeBlockStartRule = {
        token : "support.function",
        regex : /^\s*(```+[^`]*|~~~+[^~]*)$/,
        onMatch: function(value, state, stack, line) {
            var m = value.match(/^(\s*)([`~]+)(.*)/);
            var language = /[\w-]+|$/.exec(m[3])[0];
            // TODO lazy-load modes
            if (!modes[language])
                language = "";
            stack.unshift("githubblock", [], [m[1], m[2], language], state);
            return this.token;
        },
        next  : "githubblock"
    };
    var codeBlockRules = [{
        token : "support.function",
        regex : ".*",
        onMatch: function(value, state, stack, line) {
            var embedState = stack[1];
            var indent = stack[2][0];
            var endMarker = stack[2][1];
            var language = stack[2][2];
            
            var m = /^(\s*)(`+|~+)\s*$/.exec(value);
            if (
                m && m[1].length < indent.length + 3
                && m[2].length >= endMarker.length && m[2][0] == endMarker[0]
            ) {
                stack.splice(0, 3);
                this.next = stack.shift();
                return this.token;
            }
            this.next = "";
            if (language && modes[language]) {
                var data = modes[language].getTokenizer().getLineTokens(value, embedState.slice(0));
                stack[1] = data.state;
                return data.tokens;
            }
            return this.token;
        }
    }];

    this.$rules["start"].unshift({
        token : "empty_line",
        regex : '^$',
        next: "allowBlock"
    }, { // h1
        token: "markup.heading.1",
        regex: "^=+(?=\\s*$)"
    }, { // h2
        token: "markup.heading.2",
        regex: "^\\-+(?=\\s*$)"
    }, {
        token : function(value) {
            return "markup.heading." + value.length;
        },
        regex : /^#{1,6}(?=\s|$)/,
        next : "header"
    },
    codeBlockStartRule,
    { // block quote
        token : "string.blockquote",
        regex : "^\\s*>\\s*(?:[*+-]|\\d+\\.)?\\s+",
        next  : "blockquote"
    }, { // HR * - _
        token : "constant",
        regex : "^ {0,3}(?:(?:\\* ?){3,}|(?:\\- ?){3,}|(?:\\_ ?){3,})\\s*$",
        next: "allowBlock"
    }, { // list
        token : "markup.list",
        regex : "^\\s{0,3}(?:[*+-]|\\d+\\.)\\s+",
        next  : "listblock-start"
    }, {
        include : "basic"
    });

    this.addRules({
        "basic" : [{
            token : "constant.language.escape",
            regex : /\\[\\`*_{}\[\]()#+\-.!]/
        }, { // code span `
            token : "support.function",
            regex : "(`+)(.*?[^`])(\\1)"
        }, { // reference
            token : ["text", "constant", "text", "url", "string", "text"],
            regex : "^([ ]{0,3}\\[)([^\\]]+)(\\]:\\s*)([^ ]+)(\\s*(?:[\"][^\"]+[\"])?(\\s*))$"
        }, { // link by reference
            token : ["text", "string", "text", "constant", "text"],
            regex : "(\\[)(" + escaped("]") + ")(\\]\\s*\\[)("+ escaped("]") + ")(\\])"
        }, { // link by url
            token : ["text", "string", "text", "markup.underline", "string", "text"],
            regex : "(\\!?\\[)(" +                                        // [
                    escaped("]") +                                    // link text or alt text
                    ")(\\]\\()"+                                      // ](
                    '((?:[^\\)\\s\\\\]|\\\\.|\\s(?=[^"]))*)' +        // href or image
                    '(\\s*"' +  escaped('"') + '"\\s*)?' +            // "title"
                    "(\\))"                                           // )
        }, { // strong ** __
            token : "string.strong",
            regex : "([*]{2}|[_]{2}(?=\\S))(.*?\\S[*_]*)(\\1)"
        }, { // emphasis * _
            token : "string.emphasis",
            regex : "([*]|[_](?=\\S))(.*?\\S[*_]*)(\\1)"
        }, { //
            token : ["text", "url", "text"],
            regex : "(<)("+
                      "(?:https?|ftp|dict):[^'\">\\s]+"+
                      "|"+
                      "(?:mailto:)?[-.\\w]+\\@[-a-z0-9]+(?:\\.[-a-z0-9]+)*\\.[a-z]+"+
                    ")(>)"
        }],

        // code block
        "allowBlock": [
            {token : "support.function", regex : "^ {4}.+", next : "allowBlock"},
            {token : "empty_line", regex : '^$', next: "allowBlock"},
            {token : "empty", regex : "", next : "start"}
        ],

        "header" : [{
            regex: "$",
            next : "start"
        }, {
            include: "basic"
        }, {
            defaultToken : "heading"
        } ],

        "listblock-start" : [{
            token : "support.variable",
            regex : /(?:\[[ x]\])?/,
            next  : "listblock"
        }],

        "listblock" : [ { // Lists only escape on completely blank lines.
            token : "empty_line",
            regex : "^$",
            next  : "start"
        }, { // list
            token : "markup.list",
            regex : "^\\s{0,3}(?:[*+-]|\\d+\\.)\\s+",
            next  : "listblock-start"
        }, {
            include : "basic", noEscape: true
        },
        codeBlockStartRule,
        {
            defaultToken : "list" //do not use markup.list to allow stling leading `*` differntly
        } ],

        "blockquote" : [ { // Blockquotes only escape on blank lines.
            token : "empty_line",
            regex : "^\\s*$",
            next  : "start"
        }, { // block quote
            token : "string.blockquote",
            regex : "^\\s*>\\s*(?:[*+-]|\\d+\\.)?\\s+",
            next  : "blockquote"
        }, {
            include : "basic", noEscape: true
        }, {
            defaultToken : "string.blockquote"
        } ],

        "githubblock" : codeBlockRules
    });

    this.normalizeRules();
};
oop.inherits(MarkdownHighlightRules, TextHighlightRules);

exports.R = MarkdownHighlightRules;


/***/ }),

/***/ 92699:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var MaskHighlightRules = (__webpack_require__(42816)/* .MaskHighlightRules */ .g);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var CssBehaviour = (__webpack_require__(37028)/* .CssBehaviour */ .r);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = MaskHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CssBehaviour();
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
   
    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        // ignore braces in comments
        var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        var match = line.match(/^.*\{\s*$/);
        if (match) {
            indent += tab;
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };

    this.$id = "ace/mode/mask";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 42816:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.g = MaskHighlightRules;

var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var TextRules   = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
var JSRules     = (__webpack_require__(15903).JavaScriptHighlightRules);
var CssRules    = (__webpack_require__(74275).CssHighlightRules);
var MDRules     = (__webpack_require__(98137)/* .MarkdownHighlightRules */ .R);
var HTMLRules   = (__webpack_require__(10413).HtmlHighlightRules);

var token_TAG       = "keyword.support.constant.language",
    token_COMPO     = "support.function.markup.bold",
    token_KEYWORD   = "keyword",
    token_LANG      = "constant.language",
    token_UTIL      = "keyword.control.markup.italic",
    token_ATTR      = "support.variable.class",
    token_PUNKT     = "keyword.operator",
    token_ITALIC    = "markup.italic",
    token_BOLD      = "markup.bold",
    token_LPARE     = "paren.lparen",
    token_RPARE     = "paren.rparen";

var const_FUNCTIONS,
    const_KEYWORDS,
    const_CONST,
    const_TAGS;
(function(){
    const_FUNCTIONS = lang.arrayToMap(
        ("log").split("|")
    );
    const_CONST = lang.arrayToMap(
        (":dualbind|:bind|:import|slot|event|style|html|markdown|md").split("|")
    );
    const_KEYWORDS = lang.arrayToMap(
        ("debugger|define|var|if|each|for|of|else|switch|case|with|visible|+if|+each|+for|+switch|+with|+visible|include|import").split("|")
    );
    const_TAGS = lang.arrayToMap(
        ("a|abbr|acronym|address|applet|area|article|aside|audio|b|base|basefont|bdo|" + 
         "big|blockquote|body|br|button|canvas|caption|center|cite|code|col|colgroup|" + 
         "command|datalist|dd|del|details|dfn|dir|div|dl|dt|em|embed|fieldset|" + 
         "figcaption|figure|font|footer|form|frame|frameset|h1|h2|h3|h4|h5|h6|head|" + 
         "header|hgroup|hr|html|i|iframe|img|input|ins|keygen|kbd|label|legend|li|" + 
         "link|map|mark|menu|meta|meter|nav|noframes|noscript|object|ol|optgroup|" + 
         "option|output|p|param|pre|progress|q|rp|rt|ruby|s|samp|script|section|select|" + 
         "small|source|span|strike|strong|style|sub|summary|sup|table|tbody|td|" + 
         "textarea|tfoot|th|thead|time|title|tr|tt|u|ul|var|video|wbr|xmp").split("|")
    );
}());

function MaskHighlightRules () {

    this.$rules = {
        "start" : [
            Token("comment", "\\/\\/.*$"),
            Token("comment", "\\/\\*", [
                Token("comment", ".*?\\*\\/", "start"),
                Token("comment", ".+")
            ]),
            
            Blocks.string("'''"),
            Blocks.string('"""'),
            Blocks.string('"'),
            Blocks.string("'"),
            
            Blocks.syntax(/(markdown|md)\b/, "md-multiline", "multiline"),
            Blocks.syntax(/html\b/, "html-multiline", "multiline"),
            Blocks.syntax(/(slot|event)\b/, "js-block", "block"),
            Blocks.syntax(/style\b/, "css-block", "block"),
            Blocks.syntax(/var\b/, "js-statement", "attr"),
            
            Blocks.tag(),
            
            Token(token_LPARE, "[[({>]"),
            Token(token_RPARE, "[\\])};]", "start"),
            {
                caseInsensitive: true
            }
        ]
    };
    var rules = this;
    
    addJavaScript("interpolation", /\]/, token_RPARE + "." + token_ITALIC);
    addJavaScript("statement", /\)|}|;/);
    addJavaScript("block", /\}/);
    addCss();
    addMarkdown();
    addHtml();
    
    function addJavaScript(name, escape, closeType) {
        var prfx  =  "js-" + name + "-",
            rootTokens = name === "block" ? ["start"] : ["start", "no_regex"];
        add(
            JSRules
            , prfx
            , escape
            , rootTokens
            , closeType
        );
    }
    function addCss() {
        add(CssRules, "css-block-", /\}/);
    }
    function addMarkdown() {
        add(MDRules, "md-multiline-", /("""|''')/, []);
    }
    function addHtml() {
        add(HTMLRules, "html-multiline-", /("""|''')/);
    }
    function add(Rules, strPrfx, rgxEnd, rootTokens, closeType) {
        var next = "pop";
        var tokens = rootTokens || [ "start" ];
        if (tokens.length === 0) {
            tokens = null;
        }
        if (/block|multiline/.test(strPrfx)) {
            next = strPrfx + "end";
            rules.$rules[next] = [
                Token("empty", "", "start")
            ];
        }
        rules.embedRules(
            Rules
            , strPrfx
            , [ Token(closeType || token_RPARE, rgxEnd, next) ]
            , tokens
            , tokens == null ? true : false
        );
    }

    this.normalizeRules();
}
oop.inherits(MaskHighlightRules, TextRules);

var Blocks = {
    string: function(str, next){
        var token = Token(
            "string.start"
            , str
            , [
                Token(token_LPARE + "." + token_ITALIC, /~\[/, Blocks.interpolation()),
                Token("string.end", str, "pop"),
                {
                    defaultToken: "string"
                }
            ]
            , next
        );
        if (str.length === 1){
            var escaped = Token("string.escape", "\\\\" + str);
            token.push.unshift(escaped);
        }
        return token;
    },
    interpolation: function(){
        return [
            Token(token_UTIL, /\s*\w*\s*:/),
            "js-interpolation-start"
        ];
    },
    tagHead: function (rgx) {
      return Token(token_ATTR, rgx, [
            Token(token_ATTR, /[\w\-_]+/),
            Token(token_LPARE + "." + token_ITALIC, /~\[/, Blocks.interpolation()),
            Blocks.goUp()
        ]);
    },
    tag: function () {
        return {
            token: 'tag',
            onMatch :  function(value) {
                if (void 0 !== const_KEYWORDS[value])
                    return token_KEYWORD;
                if (void 0 !== const_CONST[value])
                    return token_LANG;
                if (void 0 !== const_FUNCTIONS[value])
                    return "support.function";
                if (void 0 !== const_TAGS[value.toLowerCase()])
                    return token_TAG;
                
                return token_COMPO;
            },
            regex : /([@\w\-_:+]+)|((^|\s)(?=\s*(\.|#)))/,
            push: [
                Blocks.tagHead(/\./) ,
                Blocks.tagHead(/#/) ,
                Blocks.expression(),
                Blocks.attribute(),
                
                Token(token_LPARE, /[;>{]/, "pop")
            ]
        };
    },
    syntax: function(rgx, next, type){
        return {
            token: token_LANG,
            regex : rgx,
            push: ({
                "attr": [
                    next + "-start",
                    Token(token_PUNKT, /;/, "start")
                ],
                "multiline": [
                    Blocks.tagHead(/\./) ,
                    Blocks.tagHead(/#/) ,
                    Blocks.attribute(),
                    Blocks.expression(),
                    Token(token_LPARE, /[>\{]/),
                    Token(token_PUNKT, /;/, "start"),
                    Token(token_LPARE, /'''|"""/, [ next + "-start" ])
                ],
                "block": [
                    Blocks.tagHead(/\./) ,
                    Blocks.tagHead(/#/) ,
                    Blocks.attribute(),
                    Blocks.expression(),
                    Token(token_LPARE, /\{/, [ next + "-start" ])
                ]
            })[type]
        };
    },
    attribute: function(){
        return Token(function(value){
            return  /^x\-/.test(value)
                ? token_ATTR + "." + token_BOLD
                : token_ATTR;
        }, /[\w_-]+/, [
            Token(token_PUNKT, /\s*=\s*/, [
                Blocks.string('"'),
                Blocks.string("'"),
                Blocks.word(),
                Blocks.goUp()
            ]),
            Blocks.goUp()
        ]);
    },
    expression: function(){
        return Token(token_LPARE, /\(/, [ "js-statement-start" ]);
    },
    word: function(){
        return Token("string", /[\w-_]+/);
    },
    goUp: function(){
        return Token("text", "", "pop");
    },
    goStart: function(){
        return Token("text", "", "start");
    }
};


function Token(token, rgx, mix) {
    var push, next, onMatch;
    if (arguments.length === 4) {
        push = mix;
        next = arguments[3];
    }
    else if (typeof mix === "string") {
        next = mix;
    }
    else {
        push = mix;
    }
    if (typeof token === "function") {
        onMatch = token;
        token   = "empty";
    }
    return {
        token: token,
        regex: rgx,
        push: push,
        next: next,
        onMatch: onMatch
    };
}


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTRDO0FBQzVDLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNuUmE7O0FBRWIsWUFBWSwyQ0FBeUI7O0FBRXJDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7O0FBRUE7QUFDQTtBQUNBLHVDQUF1Qzs7QUFFdkM7O0FBRUE7QUFDQSxvREFBb0QseUJBQXlCOztBQUU3RTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLENBQUM7O0FBRUQsNEJBQTRCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9iZWhhdmlvdXIvY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9tYXJrZG93bl9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9tYXNrLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWFza19oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9tYXRjaGluZ19icmFjZV9vdXRkZW50LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJlaGF2aW91ciA9IHJlcXVpcmUoXCIuLi9iZWhhdmlvdXJcIikuQmVoYXZpb3VyO1xudmFyIENzdHlsZUJlaGF2aW91ciA9IHJlcXVpcmUoXCIuL2NzdHlsZVwiKS5Dc3R5bGVCZWhhdmlvdXI7XG52YXIgVG9rZW5JdGVyYXRvciA9IHJlcXVpcmUoXCIuLi8uLi90b2tlbl9pdGVyYXRvclwiKS5Ub2tlbkl0ZXJhdG9yO1xuXG4vKipAdHlwZSB7KG5ldygpID0+IFBhcnRpYWw8aW1wb3J0KFwiLi4vLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5CZWhhdmlvdXI+KX0qL1xudmFyIENzc0JlaGF2aW91ciA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuaW5oZXJpdChDc3R5bGVCZWhhdmlvdXIpO1xuXG4gICAgdGhpcy5hZGQoXCJjb2xvblwiLCBcImluc2VydGlvblwiLCBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbiwgZWRpdG9yLCBzZXNzaW9uLCB0ZXh0KSB7XG4gICAgICAgIGlmICh0ZXh0ID09PSAnOicgJiYgZWRpdG9yLnNlbGVjdGlvbi5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IG5ldyBUb2tlbkl0ZXJhdG9yKHNlc3Npb24sIGN1cnNvci5yb3csIGN1cnNvci5jb2x1bW4pO1xuICAgICAgICAgICAgdmFyIHRva2VuID0gaXRlcmF0b3IuZ2V0Q3VycmVudFRva2VuKCk7XG4gICAgICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4udmFsdWUubWF0Y2goL1xccysvKSkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4udHlwZSA9PT0gJ3N1cHBvcnQudHlwZScpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZG9jLmdldExpbmUoY3Vyc29yLnJvdyk7XG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0Q2hhciA9IGxpbmUuc3Vic3RyaW5nKGN1cnNvci5jb2x1bW4sIGN1cnNvci5jb2x1bW4gKyAxKTtcbiAgICAgICAgICAgICAgICBpZiAocmlnaHRDaGFyID09PSAnOicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogWzEsIDFdXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgvXihcXHMrW147XXxcXHMqJCkvLnRlc3QobGluZS5zdWJzdHJpbmcoY3Vyc29yLmNvbHVtbikpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICc6OycsXG4gICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogWzEsIDFdXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZChcImNvbG9uXCIsIFwiZGVsZXRpb25cIiwgZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24sIGVkaXRvciwgc2Vzc2lvbiwgcmFuZ2UpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkID0gc2Vzc2lvbi5kb2MuZ2V0VGV4dFJhbmdlKHJhbmdlKTtcbiAgICAgICAgaWYgKCFyYW5nZS5pc011bHRpTGluZSgpICYmIHNlbGVjdGVkID09PSAnOicpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IG5ldyBUb2tlbkl0ZXJhdG9yKHNlc3Npb24sIGN1cnNvci5yb3csIGN1cnNvci5jb2x1bW4pO1xuICAgICAgICAgICAgdmFyIHRva2VuID0gaXRlcmF0b3IuZ2V0Q3VycmVudFRva2VuKCk7XG4gICAgICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4udmFsdWUubWF0Y2goL1xccysvKSkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4udHlwZSA9PT0gJ3N1cHBvcnQudHlwZScpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZG9jLmdldExpbmUocmFuZ2Uuc3RhcnQucm93KTtcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRDaGFyID0gbGluZS5zdWJzdHJpbmcocmFuZ2UuZW5kLmNvbHVtbiwgcmFuZ2UuZW5kLmNvbHVtbiArIDEpO1xuICAgICAgICAgICAgICAgIGlmIChyaWdodENoYXIgPT09ICc7Jykge1xuICAgICAgICAgICAgICAgICAgICByYW5nZS5lbmQuY29sdW1uICsrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZChcInNlbWljb2xvblwiLCBcImluc2VydGlvblwiLCBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbiwgZWRpdG9yLCBzZXNzaW9uLCB0ZXh0KSB7XG4gICAgICAgIGlmICh0ZXh0ID09PSAnOycgJiYgZWRpdG9yLnNlbGVjdGlvbi5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5kb2MuZ2V0TGluZShjdXJzb3Iucm93KTtcbiAgICAgICAgICAgIHZhciByaWdodENoYXIgPSBsaW5lLnN1YnN0cmluZyhjdXJzb3IuY29sdW1uLCBjdXJzb3IuY29sdW1uICsgMSk7XG4gICAgICAgICAgICBpZiAocmlnaHRDaGFyID09PSAnOycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgIHRleHQ6ICcnLFxuICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogWzEsIDFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGQoXCIhaW1wb3J0YW50XCIsIFwiaW5zZXJ0aW9uXCIsIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uLCBlZGl0b3IsIHNlc3Npb24sIHRleHQpIHtcbiAgICAgICAgaWYgKHRleHQgPT09ICchJyAmJiBlZGl0b3Iuc2VsZWN0aW9uLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmRvYy5nZXRMaW5lKGN1cnNvci5yb3cpO1xuXG4gICAgICAgICAgICBpZiAoL15cXHMqKDt8fXwkKS8udGVzdChsaW5lLnN1YnN0cmluZyhjdXJzb3IuY29sdW1uKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnIWltcG9ydGFudCcsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogWzEwLCAxMF1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbn07XG5vb3AuaW5oZXJpdHMoQ3NzQmVoYXZpb3VyLCBDc3R5bGVCZWhhdmlvdXIpO1xuXG5leHBvcnRzLkNzc0JlaGF2aW91ciA9IENzc0JlaGF2aW91cjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtb2RlcyA9IHJlcXVpcmUoXCIuLi9jb25maWdcIikuJG1vZGVzO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG52YXIgSHRtbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vaHRtbF9oaWdobGlnaHRfcnVsZXNcIikuSHRtbEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgZXNjYXBlZCA9IGZ1bmN0aW9uKGNoKSB7XG4gICAgcmV0dXJuIFwiKD86W15cIiArIGxhbmcuZXNjYXBlUmVnRXhwKGNoKSArIFwiXFxcXFxcXFxdfFxcXFxcXFxcLikqXCI7XG59O1xuXG52YXIgTWFya2Rvd25IaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIEh0bWxIaWdobGlnaHRSdWxlcy5jYWxsKHRoaXMpO1xuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlc1xuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcbiAgICB2YXIgY29kZUJsb2NrU3RhcnRSdWxlID0ge1xuICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLFxuICAgICAgICByZWdleCA6IC9eXFxzKihgYGArW15gXSp8fn5+K1tefl0qKSQvLFxuICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgc3RhdGUsIHN0YWNrLCBsaW5lKSB7XG4gICAgICAgICAgICB2YXIgbSA9IHZhbHVlLm1hdGNoKC9eKFxccyopKFtgfl0rKSguKikvKTtcbiAgICAgICAgICAgIHZhciBsYW5ndWFnZSA9IC9bXFx3LV0rfCQvLmV4ZWMobVszXSlbMF07XG4gICAgICAgICAgICAvLyBUT0RPIGxhenktbG9hZCBtb2Rlc1xuICAgICAgICAgICAgaWYgKCFtb2Rlc1tsYW5ndWFnZV0pXG4gICAgICAgICAgICAgICAgbGFuZ3VhZ2UgPSBcIlwiO1xuICAgICAgICAgICAgc3RhY2sudW5zaGlmdChcImdpdGh1YmJsb2NrXCIsIFtdLCBbbVsxXSwgbVsyXSwgbGFuZ3VhZ2VdLCBzdGF0ZSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgfSxcbiAgICAgICAgbmV4dCAgOiBcImdpdGh1YmJsb2NrXCJcbiAgICB9O1xuICAgIHZhciBjb2RlQmxvY2tSdWxlcyA9IFt7XG4gICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgIHJlZ2V4IDogXCIuKlwiLFxuICAgICAgICBvbk1hdGNoOiBmdW5jdGlvbih2YWx1ZSwgc3RhdGUsIHN0YWNrLCBsaW5lKSB7XG4gICAgICAgICAgICB2YXIgZW1iZWRTdGF0ZSA9IHN0YWNrWzFdO1xuICAgICAgICAgICAgdmFyIGluZGVudCA9IHN0YWNrWzJdWzBdO1xuICAgICAgICAgICAgdmFyIGVuZE1hcmtlciA9IHN0YWNrWzJdWzFdO1xuICAgICAgICAgICAgdmFyIGxhbmd1YWdlID0gc3RhY2tbMl1bMl07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBtID0gL14oXFxzKikoYCt8fispXFxzKiQvLmV4ZWModmFsdWUpO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIG0gJiYgbVsxXS5sZW5ndGggPCBpbmRlbnQubGVuZ3RoICsgM1xuICAgICAgICAgICAgICAgICYmIG1bMl0ubGVuZ3RoID49IGVuZE1hcmtlci5sZW5ndGggJiYgbVsyXVswXSA9PSBlbmRNYXJrZXJbMF1cbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHN0YWNrLnNwbGljZSgwLCAzKTtcbiAgICAgICAgICAgICAgICB0aGlzLm5leHQgPSBzdGFjay5zaGlmdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5uZXh0ID0gXCJcIjtcbiAgICAgICAgICAgIGlmIChsYW5ndWFnZSAmJiBtb2Rlc1tsYW5ndWFnZV0pIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YSA9IG1vZGVzW2xhbmd1YWdlXS5nZXRUb2tlbml6ZXIoKS5nZXRMaW5lVG9rZW5zKHZhbHVlLCBlbWJlZFN0YXRlLnNsaWNlKDApKTtcbiAgICAgICAgICAgICAgICBzdGFja1sxXSA9IGRhdGEuc3RhdGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEudG9rZW5zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgIH1cbiAgICB9XTtcblxuICAgIHRoaXMuJHJ1bGVzW1wic3RhcnRcIl0udW5zaGlmdCh7XG4gICAgICAgIHRva2VuIDogXCJlbXB0eV9saW5lXCIsXG4gICAgICAgIHJlZ2V4IDogJ14kJyxcbiAgICAgICAgbmV4dDogXCJhbGxvd0Jsb2NrXCJcbiAgICB9LCB7IC8vIGgxXG4gICAgICAgIHRva2VuOiBcIm1hcmt1cC5oZWFkaW5nLjFcIixcbiAgICAgICAgcmVnZXg6IFwiXj0rKD89XFxcXHMqJClcIlxuICAgIH0sIHsgLy8gaDJcbiAgICAgICAgdG9rZW46IFwibWFya3VwLmhlYWRpbmcuMlwiLFxuICAgICAgICByZWdleDogXCJeXFxcXC0rKD89XFxcXHMqJClcIlxuICAgIH0sIHtcbiAgICAgICAgdG9rZW4gOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIFwibWFya3VwLmhlYWRpbmcuXCIgKyB2YWx1ZS5sZW5ndGg7XG4gICAgICAgIH0sXG4gICAgICAgIHJlZ2V4IDogL14jezEsNn0oPz1cXHN8JCkvLFxuICAgICAgICBuZXh0IDogXCJoZWFkZXJcIlxuICAgIH0sXG4gICAgY29kZUJsb2NrU3RhcnRSdWxlLFxuICAgIHsgLy8gYmxvY2sgcXVvdGVcbiAgICAgICAgdG9rZW4gOiBcInN0cmluZy5ibG9ja3F1b3RlXCIsXG4gICAgICAgIHJlZ2V4IDogXCJeXFxcXHMqPlxcXFxzKig/OlsqKy1dfFxcXFxkK1xcXFwuKT9cXFxccytcIixcbiAgICAgICAgbmV4dCAgOiBcImJsb2NrcXVvdGVcIlxuICAgIH0sIHsgLy8gSFIgKiAtIF9cbiAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50XCIsXG4gICAgICAgIHJlZ2V4IDogXCJeIHswLDN9KD86KD86XFxcXCogPyl7Myx9fCg/OlxcXFwtID8pezMsfXwoPzpcXFxcXyA/KXszLH0pXFxcXHMqJFwiLFxuICAgICAgICBuZXh0OiBcImFsbG93QmxvY2tcIlxuICAgIH0sIHsgLy8gbGlzdFxuICAgICAgICB0b2tlbiA6IFwibWFya3VwLmxpc3RcIixcbiAgICAgICAgcmVnZXggOiBcIl5cXFxcc3swLDN9KD86WyorLV18XFxcXGQrXFxcXC4pXFxcXHMrXCIsXG4gICAgICAgIG5leHQgIDogXCJsaXN0YmxvY2stc3RhcnRcIlxuICAgIH0sIHtcbiAgICAgICAgaW5jbHVkZSA6IFwiYmFzaWNcIlxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRSdWxlcyh7XG4gICAgICAgIFwiYmFzaWNcIiA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlXCIsXG4gICAgICAgICAgICByZWdleCA6IC9cXFxcW1xcXFxgKl97fVxcW1xcXSgpIytcXC0uIV0vXG4gICAgICAgIH0sIHsgLy8gY29kZSBzcGFuIGBcbiAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiKGArKSguKj9bXmBdKShcXFxcMSlcIlxuICAgICAgICB9LCB7IC8vIHJlZmVyZW5jZVxuICAgICAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIFwiY29uc3RhbnRcIiwgXCJ0ZXh0XCIsIFwidXJsXCIsIFwic3RyaW5nXCIsIFwidGV4dFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCJeKFsgXXswLDN9XFxcXFspKFteXFxcXF1dKykoXFxcXF06XFxcXHMqKShbXiBdKykoXFxcXHMqKD86W1xcXCJdW15cXFwiXStbXFxcIl0pPyhcXFxccyopKSRcIlxuICAgICAgICB9LCB7IC8vIGxpbmsgYnkgcmVmZXJlbmNlXG4gICAgICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgXCJzdHJpbmdcIiwgXCJ0ZXh0XCIsIFwiY29uc3RhbnRcIiwgXCJ0ZXh0XCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIihcXFxcWykoXCIgKyBlc2NhcGVkKFwiXVwiKSArIFwiKShcXFxcXVxcXFxzKlxcXFxbKShcIisgZXNjYXBlZChcIl1cIikgKyBcIikoXFxcXF0pXCJcbiAgICAgICAgfSwgeyAvLyBsaW5rIGJ5IHVybFxuICAgICAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIFwic3RyaW5nXCIsIFwidGV4dFwiLCBcIm1hcmt1cC51bmRlcmxpbmVcIiwgXCJzdHJpbmdcIiwgXCJ0ZXh0XCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIihcXFxcIT9cXFxcWykoXCIgKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBbXG4gICAgICAgICAgICAgICAgICAgIGVzY2FwZWQoXCJdXCIpICsgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBsaW5rIHRleHQgb3IgYWx0IHRleHRcbiAgICAgICAgICAgICAgICAgICAgXCIpKFxcXFxdXFxcXCgpXCIrICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBdKFxuICAgICAgICAgICAgICAgICAgICAnKCg/OlteXFxcXClcXFxcc1xcXFxcXFxcXXxcXFxcXFxcXC58XFxcXHMoPz1bXlwiXSkpKiknICsgICAgICAgIC8vIGhyZWYgb3IgaW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgJyhcXFxccypcIicgKyAgZXNjYXBlZCgnXCInKSArICdcIlxcXFxzKik/JyArICAgICAgICAgICAgLy8gXCJ0aXRsZVwiXG4gICAgICAgICAgICAgICAgICAgIFwiKFxcXFwpKVwiICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIClcbiAgICAgICAgfSwgeyAvLyBzdHJvbmcgKiogX19cbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuc3Ryb25nXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiKFsqXXsyfXxbX117Mn0oPz1cXFxcUykpKC4qP1xcXFxTWypfXSopKFxcXFwxKVwiXG4gICAgICAgIH0sIHsgLy8gZW1waGFzaXMgKiBfXG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmVtcGhhc2lzXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiKFsqXXxbX10oPz1cXFxcUykpKC4qP1xcXFxTWypfXSopKFxcXFwxKVwiXG4gICAgICAgIH0sIHsgLy9cbiAgICAgICAgICAgIHRva2VuIDogW1widGV4dFwiLCBcInVybFwiLCBcInRleHRcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKDwpKFwiK1xuICAgICAgICAgICAgICAgICAgICAgIFwiKD86aHR0cHM/fGZ0cHxkaWN0KTpbXidcXFwiPlxcXFxzXStcIitcbiAgICAgICAgICAgICAgICAgICAgICBcInxcIitcbiAgICAgICAgICAgICAgICAgICAgICBcIig/Om1haWx0bzopP1stLlxcXFx3XStcXFxcQFstYS16MC05XSsoPzpcXFxcLlstYS16MC05XSspKlxcXFwuW2Etel0rXCIrXG4gICAgICAgICAgICAgICAgICAgIFwiKSg+KVwiXG4gICAgICAgIH1dLFxuXG4gICAgICAgIC8vIGNvZGUgYmxvY2tcbiAgICAgICAgXCJhbGxvd0Jsb2NrXCI6IFtcbiAgICAgICAgICAgIHt0b2tlbiA6IFwic3VwcG9ydC5mdW5jdGlvblwiLCByZWdleCA6IFwiXiB7NH0uK1wiLCBuZXh0IDogXCJhbGxvd0Jsb2NrXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJlbXB0eV9saW5lXCIsIHJlZ2V4IDogJ14kJywgbmV4dDogXCJhbGxvd0Jsb2NrXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJlbXB0eVwiLCByZWdleCA6IFwiXCIsIG5leHQgOiBcInN0YXJ0XCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJoZWFkZXJcIiA6IFt7XG4gICAgICAgICAgICByZWdleDogXCIkXCIsXG4gICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiYmFzaWNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImhlYWRpbmdcIlxuICAgICAgICB9IF0sXG5cbiAgICAgICAgXCJsaXN0YmxvY2stc3RhcnRcIiA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3VwcG9ydC52YXJpYWJsZVwiLFxuICAgICAgICAgICAgcmVnZXggOiAvKD86XFxbWyB4XVxcXSk/LyxcbiAgICAgICAgICAgIG5leHQgIDogXCJsaXN0YmxvY2tcIlxuICAgICAgICB9XSxcblxuICAgICAgICBcImxpc3RibG9ja1wiIDogWyB7IC8vIExpc3RzIG9ubHkgZXNjYXBlIG9uIGNvbXBsZXRlbHkgYmxhbmsgbGluZXMuXG4gICAgICAgICAgICB0b2tlbiA6IFwiZW1wdHlfbGluZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIl4kXCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7IC8vIGxpc3RcbiAgICAgICAgICAgIHRva2VuIDogXCJtYXJrdXAubGlzdFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIl5cXFxcc3swLDN9KD86WyorLV18XFxcXGQrXFxcXC4pXFxcXHMrXCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwibGlzdGJsb2NrLXN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZSA6IFwiYmFzaWNcIiwgbm9Fc2NhcGU6IHRydWVcbiAgICAgICAgfSxcbiAgICAgICAgY29kZUJsb2NrU3RhcnRSdWxlLFxuICAgICAgICB7XG4gICAgICAgICAgICBkZWZhdWx0VG9rZW4gOiBcImxpc3RcIiAvL2RvIG5vdCB1c2UgbWFya3VwLmxpc3QgdG8gYWxsb3cgc3RsaW5nIGxlYWRpbmcgYCpgIGRpZmZlcm50bHlcbiAgICAgICAgfSBdLFxuXG4gICAgICAgIFwiYmxvY2txdW90ZVwiIDogWyB7IC8vIEJsb2NrcXVvdGVzIG9ubHkgZXNjYXBlIG9uIGJsYW5rIGxpbmVzLlxuICAgICAgICAgICAgdG9rZW4gOiBcImVtcHR5X2xpbmVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJeXFxcXHMqJFwiLFxuICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgfSwgeyAvLyBibG9jayBxdW90ZVxuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5ibG9ja3F1b3RlXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXlxcXFxzKj5cXFxccyooPzpbKistXXxcXFxcZCtcXFxcLik/XFxcXHMrXCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwiYmxvY2txdW90ZVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGUgOiBcImJhc2ljXCIsIG5vRXNjYXBlOiB0cnVlXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwic3RyaW5nLmJsb2NrcXVvdGVcIlxuICAgICAgICB9IF0sXG5cbiAgICAgICAgXCJnaXRodWJibG9ja1wiIDogY29kZUJsb2NrUnVsZXNcbiAgICB9KTtcblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5vb3AuaW5oZXJpdHMoTWFya2Rvd25IaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5NYXJrZG93bkhpZ2hsaWdodFJ1bGVzID0gTWFya2Rvd25IaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgTWFza0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vbWFza19oaWdobGlnaHRfcnVsZXNcIikuTWFza0hpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBDc3NCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi9iZWhhdmlvdXIvY3NzXCIpLkNzc0JlaGF2aW91cjtcbnZhciBDU3R5bGVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBNYXNrSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy4kb3V0ZGVudCA9IG5ldyBNYXRjaGluZ0JyYWNlT3V0ZGVudCgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IG5ldyBDc3NCZWhhdmlvdXIoKTtcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBDU3R5bGVGb2xkTW9kZSgpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgIFxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiLy9cIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCIvKlwiLCBlbmQ6IFwiKi9cIn07XG5cbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuXG4gICAgICAgIC8vIGlnbm9yZSBicmFjZXMgaW4gY29tbWVudHNcbiAgICAgICAgdmFyIHRva2VucyA9IHRoaXMuZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLCBzdGF0ZSkudG9rZW5zO1xuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbdG9rZW5zLmxlbmd0aC0xXS50eXBlID09IFwiY29tbWVudFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXi4qXFx7XFxzKiQvKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG91dGRlbnQuY2hlY2tPdXRkZW50KGxpbmUsIGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBkb2MsIHJvdykge1xuICAgICAgICB0aGlzLiRvdXRkZW50LmF1dG9PdXRkZW50KGRvYywgcm93KTtcbiAgICB9O1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL21hc2tcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuTWFza0hpZ2hsaWdodFJ1bGVzID0gTWFza0hpZ2hsaWdodFJ1bGVzO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBUZXh0UnVsZXMgICA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbnZhciBKU1J1bGVzICAgICA9IHJlcXVpcmUoXCIuL2phdmFzY3JpcHRfaGlnaGxpZ2h0X3J1bGVzXCIpLkphdmFTY3JpcHRIaWdobGlnaHRSdWxlcztcbnZhciBDc3NSdWxlcyAgICA9IHJlcXVpcmUoXCIuL2Nzc19oaWdobGlnaHRfcnVsZXNcIikuQ3NzSGlnaGxpZ2h0UnVsZXM7XG52YXIgTURSdWxlcyAgICAgPSByZXF1aXJlKFwiLi9tYXJrZG93bl9oaWdobGlnaHRfcnVsZXNcIikuTWFya2Rvd25IaWdobGlnaHRSdWxlcztcbnZhciBIVE1MUnVsZXMgICA9IHJlcXVpcmUoXCIuL2h0bWxfaGlnaGxpZ2h0X3J1bGVzXCIpLkh0bWxIaWdobGlnaHRSdWxlcztcblxudmFyIHRva2VuX1RBRyAgICAgICA9IFwia2V5d29yZC5zdXBwb3J0LmNvbnN0YW50Lmxhbmd1YWdlXCIsXG4gICAgdG9rZW5fQ09NUE8gICAgID0gXCJzdXBwb3J0LmZ1bmN0aW9uLm1hcmt1cC5ib2xkXCIsXG4gICAgdG9rZW5fS0VZV09SRCAgID0gXCJrZXl3b3JkXCIsXG4gICAgdG9rZW5fTEFORyAgICAgID0gXCJjb25zdGFudC5sYW5ndWFnZVwiLFxuICAgIHRva2VuX1VUSUwgICAgICA9IFwia2V5d29yZC5jb250cm9sLm1hcmt1cC5pdGFsaWNcIixcbiAgICB0b2tlbl9BVFRSICAgICAgPSBcInN1cHBvcnQudmFyaWFibGUuY2xhc3NcIixcbiAgICB0b2tlbl9QVU5LVCAgICAgPSBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICB0b2tlbl9JVEFMSUMgICAgPSBcIm1hcmt1cC5pdGFsaWNcIixcbiAgICB0b2tlbl9CT0xEICAgICAgPSBcIm1hcmt1cC5ib2xkXCIsXG4gICAgdG9rZW5fTFBBUkUgICAgID0gXCJwYXJlbi5scGFyZW5cIixcbiAgICB0b2tlbl9SUEFSRSAgICAgPSBcInBhcmVuLnJwYXJlblwiO1xuXG52YXIgY29uc3RfRlVOQ1RJT05TLFxuICAgIGNvbnN0X0tFWVdPUkRTLFxuICAgIGNvbnN0X0NPTlNULFxuICAgIGNvbnN0X1RBR1M7XG4oZnVuY3Rpb24oKXtcbiAgICBjb25zdF9GVU5DVElPTlMgPSBsYW5nLmFycmF5VG9NYXAoXG4gICAgICAgIChcImxvZ1wiKS5zcGxpdChcInxcIilcbiAgICApO1xuICAgIGNvbnN0X0NPTlNUID0gbGFuZy5hcnJheVRvTWFwKFxuICAgICAgICAoXCI6ZHVhbGJpbmR8OmJpbmR8OmltcG9ydHxzbG90fGV2ZW50fHN0eWxlfGh0bWx8bWFya2Rvd258bWRcIikuc3BsaXQoXCJ8XCIpXG4gICAgKTtcbiAgICBjb25zdF9LRVlXT1JEUyA9IGxhbmcuYXJyYXlUb01hcChcbiAgICAgICAgKFwiZGVidWdnZXJ8ZGVmaW5lfHZhcnxpZnxlYWNofGZvcnxvZnxlbHNlfHN3aXRjaHxjYXNlfHdpdGh8dmlzaWJsZXwraWZ8K2VhY2h8K2Zvcnwrc3dpdGNofCt3aXRofCt2aXNpYmxlfGluY2x1ZGV8aW1wb3J0XCIpLnNwbGl0KFwifFwiKVxuICAgICk7XG4gICAgY29uc3RfVEFHUyA9IGxhbmcuYXJyYXlUb01hcChcbiAgICAgICAgKFwiYXxhYmJyfGFjcm9ueW18YWRkcmVzc3xhcHBsZXR8YXJlYXxhcnRpY2xlfGFzaWRlfGF1ZGlvfGJ8YmFzZXxiYXNlZm9udHxiZG98XCIgKyBcbiAgICAgICAgIFwiYmlnfGJsb2NrcXVvdGV8Ym9keXxicnxidXR0b258Y2FudmFzfGNhcHRpb258Y2VudGVyfGNpdGV8Y29kZXxjb2x8Y29sZ3JvdXB8XCIgKyBcbiAgICAgICAgIFwiY29tbWFuZHxkYXRhbGlzdHxkZHxkZWx8ZGV0YWlsc3xkZm58ZGlyfGRpdnxkbHxkdHxlbXxlbWJlZHxmaWVsZHNldHxcIiArIFxuICAgICAgICAgXCJmaWdjYXB0aW9ufGZpZ3VyZXxmb250fGZvb3Rlcnxmb3JtfGZyYW1lfGZyYW1lc2V0fGgxfGgyfGgzfGg0fGg1fGg2fGhlYWR8XCIgKyBcbiAgICAgICAgIFwiaGVhZGVyfGhncm91cHxocnxodG1sfGl8aWZyYW1lfGltZ3xpbnB1dHxpbnN8a2V5Z2VufGtiZHxsYWJlbHxsZWdlbmR8bGl8XCIgKyBcbiAgICAgICAgIFwibGlua3xtYXB8bWFya3xtZW51fG1ldGF8bWV0ZXJ8bmF2fG5vZnJhbWVzfG5vc2NyaXB0fG9iamVjdHxvbHxvcHRncm91cHxcIiArIFxuICAgICAgICAgXCJvcHRpb258b3V0cHV0fHB8cGFyYW18cHJlfHByb2dyZXNzfHF8cnB8cnR8cnVieXxzfHNhbXB8c2NyaXB0fHNlY3Rpb258c2VsZWN0fFwiICsgXG4gICAgICAgICBcInNtYWxsfHNvdXJjZXxzcGFufHN0cmlrZXxzdHJvbmd8c3R5bGV8c3VifHN1bW1hcnl8c3VwfHRhYmxlfHRib2R5fHRkfFwiICsgXG4gICAgICAgICBcInRleHRhcmVhfHRmb290fHRofHRoZWFkfHRpbWV8dGl0bGV8dHJ8dHR8dXx1bHx2YXJ8dmlkZW98d2JyfHhtcFwiKS5zcGxpdChcInxcIilcbiAgICApO1xufSgpKTtcblxuZnVuY3Rpb24gTWFza0hpZ2hsaWdodFJ1bGVzICgpIHtcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCIgOiBbXG4gICAgICAgICAgICBUb2tlbihcImNvbW1lbnRcIiwgXCJcXFxcL1xcXFwvLiokXCIpLFxuICAgICAgICAgICAgVG9rZW4oXCJjb21tZW50XCIsIFwiXFxcXC9cXFxcKlwiLCBbXG4gICAgICAgICAgICAgICAgVG9rZW4oXCJjb21tZW50XCIsIFwiLio/XFxcXCpcXFxcL1wiLCBcInN0YXJ0XCIpLFxuICAgICAgICAgICAgICAgIFRva2VuKFwiY29tbWVudFwiLCBcIi4rXCIpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQmxvY2tzLnN0cmluZyhcIicnJ1wiKSxcbiAgICAgICAgICAgIEJsb2Nrcy5zdHJpbmcoJ1wiXCJcIicpLFxuICAgICAgICAgICAgQmxvY2tzLnN0cmluZygnXCInKSxcbiAgICAgICAgICAgIEJsb2Nrcy5zdHJpbmcoXCInXCIpLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBCbG9ja3Muc3ludGF4KC8obWFya2Rvd258bWQpXFxiLywgXCJtZC1tdWx0aWxpbmVcIiwgXCJtdWx0aWxpbmVcIiksXG4gICAgICAgICAgICBCbG9ja3Muc3ludGF4KC9odG1sXFxiLywgXCJodG1sLW11bHRpbGluZVwiLCBcIm11bHRpbGluZVwiKSxcbiAgICAgICAgICAgIEJsb2Nrcy5zeW50YXgoLyhzbG90fGV2ZW50KVxcYi8sIFwianMtYmxvY2tcIiwgXCJibG9ja1wiKSxcbiAgICAgICAgICAgIEJsb2Nrcy5zeW50YXgoL3N0eWxlXFxiLywgXCJjc3MtYmxvY2tcIiwgXCJibG9ja1wiKSxcbiAgICAgICAgICAgIEJsb2Nrcy5zeW50YXgoL3ZhclxcYi8sIFwianMtc3RhdGVtZW50XCIsIFwiYXR0clwiKSxcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgQmxvY2tzLnRhZygpLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBUb2tlbih0b2tlbl9MUEFSRSwgXCJbWyh7Pl1cIiksXG4gICAgICAgICAgICBUb2tlbih0b2tlbl9SUEFSRSwgXCJbXFxcXF0pfTtdXCIsIFwic3RhcnRcIiksXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuICAgIHZhciBydWxlcyA9IHRoaXM7XG4gICAgXG4gICAgYWRkSmF2YVNjcmlwdChcImludGVycG9sYXRpb25cIiwgL1xcXS8sIHRva2VuX1JQQVJFICsgXCIuXCIgKyB0b2tlbl9JVEFMSUMpO1xuICAgIGFkZEphdmFTY3JpcHQoXCJzdGF0ZW1lbnRcIiwgL1xcKXx9fDsvKTtcbiAgICBhZGRKYXZhU2NyaXB0KFwiYmxvY2tcIiwgL1xcfS8pO1xuICAgIGFkZENzcygpO1xuICAgIGFkZE1hcmtkb3duKCk7XG4gICAgYWRkSHRtbCgpO1xuICAgIFxuICAgIGZ1bmN0aW9uIGFkZEphdmFTY3JpcHQobmFtZSwgZXNjYXBlLCBjbG9zZVR5cGUpIHtcbiAgICAgICAgdmFyIHByZnggID0gIFwianMtXCIgKyBuYW1lICsgXCItXCIsXG4gICAgICAgICAgICByb290VG9rZW5zID0gbmFtZSA9PT0gXCJibG9ja1wiID8gW1wic3RhcnRcIl0gOiBbXCJzdGFydFwiLCBcIm5vX3JlZ2V4XCJdO1xuICAgICAgICBhZGQoXG4gICAgICAgICAgICBKU1J1bGVzXG4gICAgICAgICAgICAsIHByZnhcbiAgICAgICAgICAgICwgZXNjYXBlXG4gICAgICAgICAgICAsIHJvb3RUb2tlbnNcbiAgICAgICAgICAgICwgY2xvc2VUeXBlXG4gICAgICAgICk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZENzcygpIHtcbiAgICAgICAgYWRkKENzc1J1bGVzLCBcImNzcy1ibG9jay1cIiwgL1xcfS8pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRNYXJrZG93bigpIHtcbiAgICAgICAgYWRkKE1EUnVsZXMsIFwibWQtbXVsdGlsaW5lLVwiLCAvKFwiXCJcInwnJycpLywgW10pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhZGRIdG1sKCkge1xuICAgICAgICBhZGQoSFRNTFJ1bGVzLCBcImh0bWwtbXVsdGlsaW5lLVwiLCAvKFwiXCJcInwnJycpLyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZChSdWxlcywgc3RyUHJmeCwgcmd4RW5kLCByb290VG9rZW5zLCBjbG9zZVR5cGUpIHtcbiAgICAgICAgdmFyIG5leHQgPSBcInBvcFwiO1xuICAgICAgICB2YXIgdG9rZW5zID0gcm9vdFRva2VucyB8fCBbIFwic3RhcnRcIiBdO1xuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdG9rZW5zID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoL2Jsb2NrfG11bHRpbGluZS8udGVzdChzdHJQcmZ4KSkge1xuICAgICAgICAgICAgbmV4dCA9IHN0clByZnggKyBcImVuZFwiO1xuICAgICAgICAgICAgcnVsZXMuJHJ1bGVzW25leHRdID0gW1xuICAgICAgICAgICAgICAgIFRva2VuKFwiZW1wdHlcIiwgXCJcIiwgXCJzdGFydFwiKVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICBydWxlcy5lbWJlZFJ1bGVzKFxuICAgICAgICAgICAgUnVsZXNcbiAgICAgICAgICAgICwgc3RyUHJmeFxuICAgICAgICAgICAgLCBbIFRva2VuKGNsb3NlVHlwZSB8fCB0b2tlbl9SUEFSRSwgcmd4RW5kLCBuZXh0KSBdXG4gICAgICAgICAgICAsIHRva2Vuc1xuICAgICAgICAgICAgLCB0b2tlbnMgPT0gbnVsbCA/IHRydWUgOiBmYWxzZVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn1cbm9vcC5pbmhlcml0cyhNYXNrSGlnaGxpZ2h0UnVsZXMsIFRleHRSdWxlcyk7XG5cbnZhciBCbG9ja3MgPSB7XG4gICAgc3RyaW5nOiBmdW5jdGlvbihzdHIsIG5leHQpe1xuICAgICAgICB2YXIgdG9rZW4gPSBUb2tlbihcbiAgICAgICAgICAgIFwic3RyaW5nLnN0YXJ0XCJcbiAgICAgICAgICAgICwgc3RyXG4gICAgICAgICAgICAsIFtcbiAgICAgICAgICAgICAgICBUb2tlbih0b2tlbl9MUEFSRSArIFwiLlwiICsgdG9rZW5fSVRBTElDLCAvflxcWy8sIEJsb2Nrcy5pbnRlcnBvbGF0aW9uKCkpLFxuICAgICAgICAgICAgICAgIFRva2VuKFwic3RyaW5nLmVuZFwiLCBzdHIsIFwicG9wXCIpLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICAgICAgLCBuZXh0XG4gICAgICAgICk7XG4gICAgICAgIGlmIChzdHIubGVuZ3RoID09PSAxKXtcbiAgICAgICAgICAgIHZhciBlc2NhcGVkID0gVG9rZW4oXCJzdHJpbmcuZXNjYXBlXCIsIFwiXFxcXFxcXFxcIiArIHN0cik7XG4gICAgICAgICAgICB0b2tlbi5wdXNoLnVuc2hpZnQoZXNjYXBlZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH0sXG4gICAgaW50ZXJwb2xhdGlvbjogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFRva2VuKHRva2VuX1VUSUwsIC9cXHMqXFx3Klxccyo6LyksXG4gICAgICAgICAgICBcImpzLWludGVycG9sYXRpb24tc3RhcnRcIlxuICAgICAgICBdO1xuICAgIH0sXG4gICAgdGFnSGVhZDogZnVuY3Rpb24gKHJneCkge1xuICAgICAgcmV0dXJuIFRva2VuKHRva2VuX0FUVFIsIHJneCwgW1xuICAgICAgICAgICAgVG9rZW4odG9rZW5fQVRUUiwgL1tcXHdcXC1fXSsvKSxcbiAgICAgICAgICAgIFRva2VuKHRva2VuX0xQQVJFICsgXCIuXCIgKyB0b2tlbl9JVEFMSUMsIC9+XFxbLywgQmxvY2tzLmludGVycG9sYXRpb24oKSksXG4gICAgICAgICAgICBCbG9ja3MuZ29VcCgpXG4gICAgICAgIF0pO1xuICAgIH0sXG4gICAgdGFnOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b2tlbjogJ3RhZycsXG4gICAgICAgICAgICBvbk1hdGNoIDogIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHZvaWQgMCAhPT0gY29uc3RfS0VZV09SRFNbdmFsdWVdKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5fS0VZV09SRDtcbiAgICAgICAgICAgICAgICBpZiAodm9pZCAwICE9PSBjb25zdF9DT05TVFt2YWx1ZV0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbl9MQU5HO1xuICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgIT09IGNvbnN0X0ZVTkNUSU9OU1t2YWx1ZV0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBcInN1cHBvcnQuZnVuY3Rpb25cIjtcbiAgICAgICAgICAgICAgICBpZiAodm9pZCAwICE9PSBjb25zdF9UQUdTW3ZhbHVlLnRvTG93ZXJDYXNlKCldKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdG9rZW5fVEFHO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbl9DT01QTztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWdleCA6IC8oW0BcXHdcXC1fOitdKyl8KChefFxccykoPz1cXHMqKFxcLnwjKSkpLyxcbiAgICAgICAgICAgIHB1c2g6IFtcbiAgICAgICAgICAgICAgICBCbG9ja3MudGFnSGVhZCgvXFwuLykgLFxuICAgICAgICAgICAgICAgIEJsb2Nrcy50YWdIZWFkKC8jLykgLFxuICAgICAgICAgICAgICAgIEJsb2Nrcy5leHByZXNzaW9uKCksXG4gICAgICAgICAgICAgICAgQmxvY2tzLmF0dHJpYnV0ZSgpLFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIFRva2VuKHRva2VuX0xQQVJFLCAvWzs+e10vLCBcInBvcFwiKVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH0sXG4gICAgc3ludGF4OiBmdW5jdGlvbihyZ3gsIG5leHQsIHR5cGUpe1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdG9rZW46IHRva2VuX0xBTkcsXG4gICAgICAgICAgICByZWdleCA6IHJneCxcbiAgICAgICAgICAgIHB1c2g6ICh7XG4gICAgICAgICAgICAgICAgXCJhdHRyXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCArIFwiLXN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgICAgIFRva2VuKHRva2VuX1BVTktULCAvOy8sIFwic3RhcnRcIilcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIFwibXVsdGlsaW5lXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgQmxvY2tzLnRhZ0hlYWQoL1xcLi8pICxcbiAgICAgICAgICAgICAgICAgICAgQmxvY2tzLnRhZ0hlYWQoLyMvKSAsXG4gICAgICAgICAgICAgICAgICAgIEJsb2Nrcy5hdHRyaWJ1dGUoKSxcbiAgICAgICAgICAgICAgICAgICAgQmxvY2tzLmV4cHJlc3Npb24oKSxcbiAgICAgICAgICAgICAgICAgICAgVG9rZW4odG9rZW5fTFBBUkUsIC9bPlxce10vKSxcbiAgICAgICAgICAgICAgICAgICAgVG9rZW4odG9rZW5fUFVOS1QsIC87LywgXCJzdGFydFwiKSxcbiAgICAgICAgICAgICAgICAgICAgVG9rZW4odG9rZW5fTFBBUkUsIC8nJyd8XCJcIlwiLywgWyBuZXh0ICsgXCItc3RhcnRcIiBdKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgXCJibG9ja1wiOiBbXG4gICAgICAgICAgICAgICAgICAgIEJsb2Nrcy50YWdIZWFkKC9cXC4vKSAsXG4gICAgICAgICAgICAgICAgICAgIEJsb2Nrcy50YWdIZWFkKC8jLykgLFxuICAgICAgICAgICAgICAgICAgICBCbG9ja3MuYXR0cmlidXRlKCksXG4gICAgICAgICAgICAgICAgICAgIEJsb2Nrcy5leHByZXNzaW9uKCksXG4gICAgICAgICAgICAgICAgICAgIFRva2VuKHRva2VuX0xQQVJFLCAvXFx7LywgWyBuZXh0ICsgXCItc3RhcnRcIiBdKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0pW3R5cGVdXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBhdHRyaWJ1dGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBUb2tlbihmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgICByZXR1cm4gIC9eeFxcLS8udGVzdCh2YWx1ZSlcbiAgICAgICAgICAgICAgICA/IHRva2VuX0FUVFIgKyBcIi5cIiArIHRva2VuX0JPTERcbiAgICAgICAgICAgICAgICA6IHRva2VuX0FUVFI7XG4gICAgICAgIH0sIC9bXFx3Xy1dKy8sIFtcbiAgICAgICAgICAgIFRva2VuKHRva2VuX1BVTktULCAvXFxzKj1cXHMqLywgW1xuICAgICAgICAgICAgICAgIEJsb2Nrcy5zdHJpbmcoJ1wiJyksXG4gICAgICAgICAgICAgICAgQmxvY2tzLnN0cmluZyhcIidcIiksXG4gICAgICAgICAgICAgICAgQmxvY2tzLndvcmQoKSxcbiAgICAgICAgICAgICAgICBCbG9ja3MuZ29VcCgpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIEJsb2Nrcy5nb1VwKClcbiAgICAgICAgXSk7XG4gICAgfSxcbiAgICBleHByZXNzaW9uOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gVG9rZW4odG9rZW5fTFBBUkUsIC9cXCgvLCBbIFwianMtc3RhdGVtZW50LXN0YXJ0XCIgXSk7XG4gICAgfSxcbiAgICB3b3JkOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gVG9rZW4oXCJzdHJpbmdcIiwgL1tcXHctX10rLyk7XG4gICAgfSxcbiAgICBnb1VwOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gVG9rZW4oXCJ0ZXh0XCIsIFwiXCIsIFwicG9wXCIpO1xuICAgIH0sXG4gICAgZ29TdGFydDogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIFRva2VuKFwidGV4dFwiLCBcIlwiLCBcInN0YXJ0XCIpO1xuICAgIH1cbn07XG5cblxuZnVuY3Rpb24gVG9rZW4odG9rZW4sIHJneCwgbWl4KSB7XG4gICAgdmFyIHB1c2gsIG5leHQsIG9uTWF0Y2g7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgcHVzaCA9IG1peDtcbiAgICAgICAgbmV4dCA9IGFyZ3VtZW50c1szXTtcbiAgICB9XG4gICAgZWxzZSBpZiAodHlwZW9mIG1peCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBuZXh0ID0gbWl4O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcHVzaCA9IG1peDtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0b2tlbiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIG9uTWF0Y2ggPSB0b2tlbjtcbiAgICAgICAgdG9rZW4gICA9IFwiZW1wdHlcIjtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW46IHRva2VuLFxuICAgICAgICByZWdleDogcmd4LFxuICAgICAgICBwdXNoOiBwdXNoLFxuICAgICAgICBuZXh0OiBuZXh0LFxuICAgICAgICBvbk1hdGNoOiBvbk1hdGNoXG4gICAgfTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG5cbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IGZ1bmN0aW9uKCkge307XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24obGluZSwgaW5wdXQpIHtcbiAgICAgICAgaWYgKCEgL15cXHMrJC8udGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gL15cXHMqXFx9Ly50ZXN0KGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKGRvYywgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gZG9jLmdldExpbmUocm93KTtcbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXihcXHMqXFx9KS8pO1xuXG4gICAgICAgIGlmICghbWF0Y2gpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBjb2x1bW4gPSBtYXRjaFsxXS5sZW5ndGg7XG4gICAgICAgIHZhciBvcGVuQnJhY2VQb3MgPSBkb2MuZmluZE1hdGNoaW5nQnJhY2tldCh7cm93OiByb3csIGNvbHVtbjogY29sdW1ufSk7XG5cbiAgICAgICAgaWYgKCFvcGVuQnJhY2VQb3MgfHwgb3BlbkJyYWNlUG9zLnJvdyA9PSByb3cpIHJldHVybiAwO1xuXG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQoZG9jLmdldExpbmUob3BlbkJyYWNlUG9zLnJvdykpO1xuICAgICAgICBkb2MucmVwbGFjZShuZXcgUmFuZ2Uocm93LCAwLCByb3csIGNvbHVtbi0xKSwgaW5kZW50KTtcbiAgICB9O1xuXG4gICAgdGhpcy4kZ2V0SW5kZW50ID0gZnVuY3Rpb24obGluZSkge1xuICAgICAgICByZXR1cm4gbGluZS5tYXRjaCgvXlxccyovKVswXTtcbiAgICB9O1xuXG59KS5jYWxsKE1hdGNoaW5nQnJhY2VPdXRkZW50LnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBNYXRjaGluZ0JyYWNlT3V0ZGVudDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==