"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8394],{

/***/ 47853:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var Behaviour = (__webpack_require__(4708)/* .Behaviour */ .T);
var CstyleBehaviour = (__webpack_require__(19414)/* .CstyleBehaviour */ .B);
var TokenIterator = (__webpack_require__(39216)/* .TokenIterator */ .N);

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

exports.K = CssBehaviour;


/***/ }),

/***/ 12764:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var Range = (__webpack_require__(59082)/* .Range */ .e);
var BaseFoldMode = (__webpack_require__(15369).FoldMode);

var FoldMode = exports.Z = function(commentRegex) {
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

/***/ 92884:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var modes = (__webpack_require__(13188).$modes);

var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);
var HtmlHighlightRules = (__webpack_require__(72843)/* .HtmlHighlightRules */ .V);

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

exports.B = MarkdownHighlightRules;


/***/ }),

/***/ 18394:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var MaskHighlightRules = (__webpack_require__(91901)/* .MaskHighlightRules */ .r);
var MatchingBraceOutdent = (__webpack_require__(1164).MatchingBraceOutdent);
var CssBehaviour = (__webpack_require__(47853)/* .CssBehaviour */ .K);
var CStyleFoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

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

/***/ 91901:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



exports.r = MaskHighlightRules;

var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var TextRules   = (__webpack_require__(28053)/* .TextHighlightRules */ .K);
var JSRules     = (__webpack_require__(33801)/* .JavaScriptHighlightRules */ ._);
var CssRules    = (__webpack_require__(99301).CssHighlightRules);
var MDRules     = (__webpack_require__(92884)/* .MarkdownHighlightRules */ .B);
var HTMLRules   = (__webpack_require__(72843)/* .HtmlHighlightRules */ .V);

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

/***/ 1164:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var Range = (__webpack_require__(59082)/* .Range */ .e);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDblJhOztBQUViLFlBQVksMkNBQXlCOztBQUVyQzs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUM7O0FBRXZDOztBQUVBO0FBQ0Esb0RBQW9ELHlCQUF5Qjs7QUFFN0U7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOztBQUVELDRCQUE0QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvYmVoYXZpb3VyL2Nzcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY3N0eWxlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWFya2Rvd25faGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWFzay5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL21hc2tfaGlnaGxpZ2h0X3J1bGVzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJlaGF2aW91ciA9IHJlcXVpcmUoXCIuLi9iZWhhdmlvdXJcIikuQmVoYXZpb3VyO1xudmFyIENzdHlsZUJlaGF2aW91ciA9IHJlcXVpcmUoXCIuL2NzdHlsZVwiKS5Dc3R5bGVCZWhhdmlvdXI7XG52YXIgVG9rZW5JdGVyYXRvciA9IHJlcXVpcmUoXCIuLi8uLi90b2tlbl9pdGVyYXRvclwiKS5Ub2tlbkl0ZXJhdG9yO1xuXG52YXIgQ3NzQmVoYXZpb3VyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdGhpcy5pbmhlcml0KENzdHlsZUJlaGF2aW91cik7XG5cbiAgICB0aGlzLmFkZChcImNvbG9uXCIsIFwiaW5zZXJ0aW9uXCIsIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uLCBlZGl0b3IsIHNlc3Npb24sIHRleHQpIHtcbiAgICAgICAgaWYgKHRleHQgPT09ICc6JyAmJiBlZGl0b3Iuc2VsZWN0aW9uLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gbmV3IFRva2VuSXRlcmF0b3Ioc2Vzc2lvbiwgY3Vyc29yLnJvdywgY3Vyc29yLmNvbHVtbik7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW4oKTtcbiAgICAgICAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi52YWx1ZS5tYXRjaCgvXFxzKy8pKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBpdGVyYXRvci5zdGVwQmFja3dhcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi50eXBlID09PSAnc3VwcG9ydC50eXBlJykge1xuICAgICAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5kb2MuZ2V0TGluZShjdXJzb3Iucm93KTtcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRDaGFyID0gbGluZS5zdWJzdHJpbmcoY3Vyc29yLmNvbHVtbiwgY3Vyc29yLmNvbHVtbiArIDEpO1xuICAgICAgICAgICAgICAgIGlmIChyaWdodENoYXIgPT09ICc6Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbMSwgMV1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKC9eKFxccytbXjtdfFxccyokKS8udGVzdChsaW5lLnN1YnN0cmluZyhjdXJzb3IuY29sdW1uKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJzo7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbMSwgMV1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWRkKFwiY29sb25cIiwgXCJkZWxldGlvblwiLCBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbiwgZWRpdG9yLCBzZXNzaW9uLCByYW5nZSkge1xuICAgICAgICB2YXIgc2VsZWN0ZWQgPSBzZXNzaW9uLmRvYy5nZXRUZXh0UmFuZ2UocmFuZ2UpO1xuICAgICAgICBpZiAoIXJhbmdlLmlzTXVsdGlMaW5lKCkgJiYgc2VsZWN0ZWQgPT09ICc6Jykge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gbmV3IFRva2VuSXRlcmF0b3Ioc2Vzc2lvbiwgY3Vyc29yLnJvdywgY3Vyc29yLmNvbHVtbik7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW4oKTtcbiAgICAgICAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi52YWx1ZS5tYXRjaCgvXFxzKy8pKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBpdGVyYXRvci5zdGVwQmFja3dhcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi50eXBlID09PSAnc3VwcG9ydC50eXBlJykge1xuICAgICAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5kb2MuZ2V0TGluZShyYW5nZS5zdGFydC5yb3cpO1xuICAgICAgICAgICAgICAgIHZhciByaWdodENoYXIgPSBsaW5lLnN1YnN0cmluZyhyYW5nZS5lbmQuY29sdW1uLCByYW5nZS5lbmQuY29sdW1uICsgMSk7XG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0Q2hhciA9PT0gJzsnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLmVuZC5jb2x1bW4gKys7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWRkKFwic2VtaWNvbG9uXCIsIFwiaW5zZXJ0aW9uXCIsIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uLCBlZGl0b3IsIHNlc3Npb24sIHRleHQpIHtcbiAgICAgICAgaWYgKHRleHQgPT09ICc7JyAmJiBlZGl0b3Iuc2VsZWN0aW9uLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmRvYy5nZXRMaW5lKGN1cnNvci5yb3cpO1xuICAgICAgICAgICAgdmFyIHJpZ2h0Q2hhciA9IGxpbmUuc3Vic3RyaW5nKGN1cnNvci5jb2x1bW4sIGN1cnNvci5jb2x1bW4gKyAxKTtcbiAgICAgICAgICAgIGlmIChyaWdodENoYXIgPT09ICc7Jykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgdGV4dDogJycsXG4gICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbMSwgMV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZChcIiFpbXBvcnRhbnRcIiwgXCJpbnNlcnRpb25cIiwgZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24sIGVkaXRvciwgc2Vzc2lvbiwgdGV4dCkge1xuICAgICAgICBpZiAodGV4dCA9PT0gJyEnICYmIGVkaXRvci5zZWxlY3Rpb24uaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICB2YXIgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZG9jLmdldExpbmUoY3Vyc29yLnJvdyk7XG5cbiAgICAgICAgICAgIGlmICgvXlxccyooO3x9fCQpLy50ZXN0KGxpbmUuc3Vic3RyaW5nKGN1cnNvci5jb2x1bW4pKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICchaW1wb3J0YW50JyxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbMTAsIDEwXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxufTtcbm9vcC5pbmhlcml0cyhDc3NCZWhhdmlvdXIsIENzdHlsZUJlaGF2aW91cik7XG5cbmV4cG9ydHMuQ3NzQmVoYXZpb3VyID0gQ3NzQmVoYXZpb3VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi8uLi9yYW5nZVwiKS5SYW5nZTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbihjb21tZW50UmVnZXgpIHtcbiAgICBpZiAoY29tbWVudFJlZ2V4KSB7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyLnNvdXJjZS5yZXBsYWNlKC9cXHxbXnxdKj8kLywgXCJ8XCIgKyBjb21tZW50UmVnZXguc3RhcnQpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSBuZXcgUmVnRXhwKFxuICAgICAgICAgICAgdGhpcy5mb2xkaW5nU3RvcE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LmVuZClcbiAgICAgICAgKTtcbiAgICB9XG59O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgdGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIgPSAvKFtcXHtcXFtcXChdKVteXFx9XFxdXFwpXSokfF5cXHMqKFxcL1xcKikvO1xuICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIgPSAvXlteXFxbXFx7XFwoXSooW1xcfVxcXVxcKV0pfF5bXFxzXFwqXSooXFwqXFwvKS87XG4gICAgdGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmU9IC9eXFxzKihcXC9cXCopLipcXCpcXC9cXHMqJC87XG4gICAgdGhpcy50cmlwbGVTdGFyQmxvY2tDb21tZW50UmUgPSAvXlxccyooXFwvXFwqXFwqXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMuc3RhcnRSZWdpb25SZSA9IC9eXFxzKihcXC9cXCp8XFwvXFwvKSM/cmVnaW9uXFxiLztcbiAgICBcbiAgICAvL3ByZXZlbnQgbmFtaW5nIGNvbmZsaWN0IHdpdGggYW55IG1vZGVzIHRoYXQgaW5oZXJpdCBmcm9tIGNzdHlsZSBhbmQgb3ZlcnJpZGUgdGhpcyAobGlrZSBjc2hhcnApXG4gICAgdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2UgPSB0aGlzLmdldEZvbGRXaWRnZXQ7XG4gICAgXG4gICAgLyoqXG4gICAgICogR2V0cyBmb2xkIHdpZGdldCB3aXRoIHNvbWUgbm9uLXN0YW5kYXJkIGV4dHJhczpcbiAgICAgKlxuICAgICAqIEBleGFtcGxlIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8vI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBibG9ja0NvbW1lbnRSZWdpb25TdGFydFxuICAgICAqICAgICAgLyojcmVnaW9uIFtvcHRpb25hbCBkZXNjcmlwdGlvbl0gKlsvXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgdHJpcGxlU3RhckZvbGRpbmdTZWN0aW9uXG4gICAgICogICAgICAvKioqIHRoaXMgZm9sZHMgZXZlbiB0aG91Z2ggMSBsaW5lIGJlY2F1c2UgaXQgaGFzIDMgc3RhcnMgKioqWy9dXG4gICAgICogXG4gICAgICogQG5vdGUgdGhlIHBvdW5kIHN5bWJvbCBmb3IgcmVnaW9uIHRhZ3MgaXMgb3B0aW9uYWxcbiAgICAgKi9cbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgIFxuICAgICAgICBpZiAodGhpcy5zaW5nbGVMaW5lQmxvY2tDb21tZW50UmUudGVzdChsaW5lKSkge1xuICAgICAgICAgICAgLy8gTm8gd2lkZ2V0IGZvciBzaW5nbGUgbGluZSBibG9jayBjb21tZW50IHVubGVzcyByZWdpb24gb3IgdHJpcGxlIHN0YXJcbiAgICAgICAgICAgIGlmICghdGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkgJiYgIXRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgIH1cbiAgICBcbiAgICAgICAgdmFyIGZ3ID0gdGhpcy5fZ2V0Rm9sZFdpZGdldEJhc2Uoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpO1xuICAgIFxuICAgICAgICBpZiAoIWZ3ICYmIHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjsgLy8gbGluZUNvbW1lbnRSZWdpb25TdGFydFxuICAgIFxuICAgICAgICByZXR1cm4gZnc7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3csIGZvcmNlTXVsdGlsaW5lKSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIFxuICAgICAgICBpZiAodGhpcy5zdGFydFJlZ2lvblJlLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2soc2Vzc2lvbiwgbGluZSwgcm93KTtcbiAgICAgICAgXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVuaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHJhbmdlID0gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSArIG1hdGNoWzBdLmxlbmd0aCwgMSk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChyYW5nZSAmJiAhcmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgIGlmIChmb3JjZU11bHRpbGluZSkge1xuICAgICAgICAgICAgICAgICAgICByYW5nZSA9IHRoaXMuZ2V0U2VjdGlvblJhbmdlKHNlc3Npb24sIHJvdyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmb2xkU3R5bGUgIT0gXCJhbGxcIilcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZm9sZFN0eWxlID09PSBcIm1hcmtiZWdpblwiKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RvcE1hcmtlcik7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgdmFyIGkgPSBtYXRjaC5pbmRleCArIG1hdGNoWzBdLmxlbmd0aDtcblxuICAgICAgICAgICAgaWYgKG1hdGNoWzFdKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNsb3NpbmdCcmFja2V0QmxvY2soc2Vzc2lvbiwgbWF0Y2hbMV0sIHJvdywgaSk7XG5cbiAgICAgICAgICAgIHJldHVybiBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBpLCAtMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMuZ2V0U2VjdGlvblJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBzdGFydEluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgcm93ID0gcm93ICsgMTtcbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGluZGVudCA9IGxpbmUuc2VhcmNoKC9cXFMvKTtcbiAgICAgICAgICAgIGlmIChpbmRlbnQgPT09IC0xKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgIChzdGFydEluZGVudCA+IGluZGVudClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIHZhciBzdWJSYW5nZSA9IHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlKHNlc3Npb24sIFwiYWxsXCIsIHJvdyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChzdWJSYW5nZSkge1xuICAgICAgICAgICAgICAgIGlmIChzdWJSYW5nZS5zdGFydC5yb3cgPD0gc3RhcnRSb3cpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdWJSYW5nZS5pc011bHRpTGluZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IHN1YlJhbmdlLmVuZC5yb3c7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzdGFydEluZGVudCA9PSBpbmRlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kUm93ID0gcm93O1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBzZXNzaW9uLmdldExpbmUoZW5kUm93KS5sZW5ndGgpO1xuICAgIH07XG4gICAgXG4gICAgLyoqXG4gICAgICogZ2V0cyBjb21tZW50IHJlZ2lvbiBibG9jayB3aXRoIGVuZCByZWdpb24gYXNzdW1lZCB0byBiZSBzdGFydCBvZiBjb21tZW50IGluIGFueSBjc3R5bGUgbW9kZSBvciBTUUwgbW9kZSAoLS0pIHdoaWNoIGluaGVyaXRzIGZyb20gdGhpcy5cbiAgICAgKiBUaGVyZSBtYXkgb3B0aW9uYWxseSBiZSBhIHBvdW5kIHN5bWJvbCBiZWZvcmUgdGhlIHJlZ2lvbi9lbmRyZWdpb24gc3RhdGVtZW50XG4gICAgICovXG4gICAgdGhpcy5nZXRDb21tZW50UmVnaW9uQmxvY2sgPSBmdW5jdGlvbihzZXNzaW9uLCBsaW5lLCByb3cpIHtcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5zZWFyY2goL1xccyokLyk7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB2YXIgc3RhcnRSb3cgPSByb3c7XG4gICAgICAgIFxuICAgICAgICB2YXIgcmUgPSAvXlxccyooPzpcXC9cXCp8XFwvXFwvfC0tKSM/KGVuZCk/cmVnaW9uXFxiLztcbiAgICAgICAgdmFyIGRlcHRoID0gMTtcbiAgICAgICAgd2hpbGUgKCsrcm93IDwgbWF4Um93KSB7XG4gICAgICAgICAgICBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgbSA9IHJlLmV4ZWMobGluZSk7XG4gICAgICAgICAgICBpZiAoIW0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKG1bMV0pIGRlcHRoLS07XG4gICAgICAgICAgICBlbHNlIGRlcHRoKys7XG5cbiAgICAgICAgICAgIGlmICghZGVwdGgpIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcbiAgICAgICAgaWYgKGVuZFJvdyA+IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKHN0YXJ0Um93LCBzdGFydENvbHVtbiwgZW5kUm93LCBsaW5lLmxlbmd0aCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1vZGVzID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKS4kbW9kZXM7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbnZhciBIdG1sSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9odG1sX2hpZ2hsaWdodF9ydWxlc1wiKS5IdG1sSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBlc2NhcGVkID0gZnVuY3Rpb24oY2gpIHtcbiAgICByZXR1cm4gXCIoPzpbXlwiICsgbGFuZy5lc2NhcGVSZWdFeHAoY2gpICsgXCJcXFxcXFxcXF18XFxcXFxcXFwuKSpcIjtcbn07XG5cbnZhciBNYXJrZG93bkhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgSHRtbEhpZ2hsaWdodFJ1bGVzLmNhbGwodGhpcyk7XG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzXG4gICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuICAgIHZhciBjb2RlQmxvY2tTdGFydFJ1bGUgPSB7XG4gICAgICAgIHRva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsXG4gICAgICAgIHJlZ2V4IDogL15cXHMqKGBgYCtbXmBdKnx+fn4rW15+XSopJC8sXG4gICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2ssIGxpbmUpIHtcbiAgICAgICAgICAgIHZhciBtID0gdmFsdWUubWF0Y2goL14oXFxzKikoW2B+XSspKC4qKS8pO1xuICAgICAgICAgICAgdmFyIGxhbmd1YWdlID0gL1tcXHctXSt8JC8uZXhlYyhtWzNdKVswXTtcbiAgICAgICAgICAgIC8vIFRPRE8gbGF6eS1sb2FkIG1vZGVzXG4gICAgICAgICAgICBpZiAoIW1vZGVzW2xhbmd1YWdlXSlcbiAgICAgICAgICAgICAgICBsYW5ndWFnZSA9IFwiXCI7XG4gICAgICAgICAgICBzdGFjay51bnNoaWZ0KFwiZ2l0aHViYmxvY2tcIiwgW10sIFttWzFdLCBtWzJdLCBsYW5ndWFnZV0sIHN0YXRlKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICB9LFxuICAgICAgICBuZXh0ICA6IFwiZ2l0aHViYmxvY2tcIlxuICAgIH07XG4gICAgdmFyIGNvZGVCbG9ja1J1bGVzID0gW3tcbiAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgcmVnZXggOiBcIi4qXCIsXG4gICAgICAgIG9uTWF0Y2g6IGZ1bmN0aW9uKHZhbHVlLCBzdGF0ZSwgc3RhY2ssIGxpbmUpIHtcbiAgICAgICAgICAgIHZhciBlbWJlZFN0YXRlID0gc3RhY2tbMV07XG4gICAgICAgICAgICB2YXIgaW5kZW50ID0gc3RhY2tbMl1bMF07XG4gICAgICAgICAgICB2YXIgZW5kTWFya2VyID0gc3RhY2tbMl1bMV07XG4gICAgICAgICAgICB2YXIgbGFuZ3VhZ2UgPSBzdGFja1syXVsyXTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIG0gPSAvXihcXHMqKShgK3x+KylcXHMqJC8uZXhlYyh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgbSAmJiBtWzFdLmxlbmd0aCA8IGluZGVudC5sZW5ndGggKyAzXG4gICAgICAgICAgICAgICAgJiYgbVsyXS5sZW5ndGggPj0gZW5kTWFya2VyLmxlbmd0aCAmJiBtWzJdWzBdID09IGVuZE1hcmtlclswXVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgc3RhY2suc3BsaWNlKDAsIDMpO1xuICAgICAgICAgICAgICAgIHRoaXMubmV4dCA9IHN0YWNrLnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLm5leHQgPSBcIlwiO1xuICAgICAgICAgICAgaWYgKGxhbmd1YWdlICYmIG1vZGVzW2xhbmd1YWdlXSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gbW9kZXNbbGFuZ3VhZ2VdLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnModmFsdWUsIGVtYmVkU3RhdGUuc2xpY2UoMCkpO1xuICAgICAgICAgICAgICAgIHN0YWNrWzFdID0gZGF0YS5zdGF0ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS50b2tlbnM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgfVxuICAgIH1dO1xuXG4gICAgdGhpcy4kcnVsZXNbXCJzdGFydFwiXS51bnNoaWZ0KHtcbiAgICAgICAgdG9rZW4gOiBcImVtcHR5X2xpbmVcIixcbiAgICAgICAgcmVnZXggOiAnXiQnLFxuICAgICAgICBuZXh0OiBcImFsbG93QmxvY2tcIlxuICAgIH0sIHsgLy8gaDFcbiAgICAgICAgdG9rZW46IFwibWFya3VwLmhlYWRpbmcuMVwiLFxuICAgICAgICByZWdleDogXCJePSsoPz1cXFxccyokKVwiXG4gICAgfSwgeyAvLyBoMlxuICAgICAgICB0b2tlbjogXCJtYXJrdXAuaGVhZGluZy4yXCIsXG4gICAgICAgIHJlZ2V4OiBcIl5cXFxcLSsoPz1cXFxccyokKVwiXG4gICAgfSwge1xuICAgICAgICB0b2tlbiA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJtYXJrdXAuaGVhZGluZy5cIiArIHZhbHVlLmxlbmd0aDtcbiAgICAgICAgfSxcbiAgICAgICAgcmVnZXggOiAvXiN7MSw2fSg/PVxcc3wkKS8sXG4gICAgICAgIG5leHQgOiBcImhlYWRlclwiXG4gICAgfSxcbiAgICBjb2RlQmxvY2tTdGFydFJ1bGUsXG4gICAgeyAvLyBibG9jayBxdW90ZVxuICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmJsb2NrcXVvdGVcIixcbiAgICAgICAgcmVnZXggOiBcIl5cXFxccyo+XFxcXHMqKD86WyorLV18XFxcXGQrXFxcXC4pP1xcXFxzK1wiLFxuICAgICAgICBuZXh0ICA6IFwiYmxvY2txdW90ZVwiXG4gICAgfSwgeyAvLyBIUiAqIC0gX1xuICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnRcIixcbiAgICAgICAgcmVnZXggOiBcIl4gezAsM30oPzooPzpcXFxcKiA/KXszLH18KD86XFxcXC0gPyl7Myx9fCg/OlxcXFxfID8pezMsfSlcXFxccyokXCIsXG4gICAgICAgIG5leHQ6IFwiYWxsb3dCbG9ja1wiXG4gICAgfSwgeyAvLyBsaXN0XG4gICAgICAgIHRva2VuIDogXCJtYXJrdXAubGlzdFwiLFxuICAgICAgICByZWdleCA6IFwiXlxcXFxzezAsM30oPzpbKistXXxcXFxcZCtcXFxcLilcXFxccytcIixcbiAgICAgICAgbmV4dCAgOiBcImxpc3RibG9jay1zdGFydFwiXG4gICAgfSwge1xuICAgICAgICBpbmNsdWRlIDogXCJiYXNpY1wiXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZFJ1bGVzKHtcbiAgICAgICAgXCJiYXNpY1wiIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogL1xcXFxbXFxcXGAqX3t9XFxbXFxdKCkjK1xcLS4hXS9cbiAgICAgICAgfSwgeyAvLyBjb2RlIHNwYW4gYFxuICAgICAgICAgICAgdG9rZW4gOiBcInN1cHBvcnQuZnVuY3Rpb25cIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoYCspKC4qP1teYF0pKFxcXFwxKVwiXG4gICAgICAgIH0sIHsgLy8gcmVmZXJlbmNlXG4gICAgICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgXCJjb25zdGFudFwiLCBcInRleHRcIiwgXCJ1cmxcIiwgXCJzdHJpbmdcIiwgXCJ0ZXh0XCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIl4oWyBdezAsM31cXFxcWykoW15cXFxcXV0rKShcXFxcXTpcXFxccyopKFteIF0rKShcXFxccyooPzpbXFxcIl1bXlxcXCJdK1tcXFwiXSk/KFxcXFxzKikpJFwiXG4gICAgICAgIH0sIHsgLy8gbGluayBieSByZWZlcmVuY2VcbiAgICAgICAgICAgIHRva2VuIDogW1widGV4dFwiLCBcInN0cmluZ1wiLCBcInRleHRcIiwgXCJjb25zdGFudFwiLCBcInRleHRcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKFxcXFxbKShcIiArIGVzY2FwZWQoXCJdXCIpICsgXCIpKFxcXFxdXFxcXHMqXFxcXFspKFwiKyBlc2NhcGVkKFwiXVwiKSArIFwiKShcXFxcXSlcIlxuICAgICAgICB9LCB7IC8vIGxpbmsgYnkgdXJsXG4gICAgICAgICAgICB0b2tlbiA6IFtcInRleHRcIiwgXCJzdHJpbmdcIiwgXCJ0ZXh0XCIsIFwibWFya3VwLnVuZGVybGluZVwiLCBcInN0cmluZ1wiLCBcInRleHRcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKFxcXFwhP1xcXFxbKShcIiArICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFtcbiAgICAgICAgICAgICAgICAgICAgZXNjYXBlZChcIl1cIikgKyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGxpbmsgdGV4dCBvciBhbHQgdGV4dFxuICAgICAgICAgICAgICAgICAgICBcIikoXFxcXF1cXFxcKClcIisgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIF0oXG4gICAgICAgICAgICAgICAgICAgICcoKD86W15cXFxcKVxcXFxzXFxcXFxcXFxdfFxcXFxcXFxcLnxcXFxccyg/PVteXCJdKSkqKScgKyAgICAgICAgLy8gaHJlZiBvciBpbWFnZVxuICAgICAgICAgICAgICAgICAgICAnKFxcXFxzKlwiJyArICBlc2NhcGVkKCdcIicpICsgJ1wiXFxcXHMqKT8nICsgICAgICAgICAgICAvLyBcInRpdGxlXCJcbiAgICAgICAgICAgICAgICAgICAgXCIoXFxcXCkpXCIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gKVxuICAgICAgICB9LCB7IC8vIHN0cm9uZyAqKiBfX1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5zdHJvbmdcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoWypdezJ9fFtfXXsyfSg/PVxcXFxTKSkoLio/XFxcXFNbKl9dKikoXFxcXDEpXCJcbiAgICAgICAgfSwgeyAvLyBlbXBoYXNpcyAqIF9cbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuZW1waGFzaXNcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoWypdfFtfXSg/PVxcXFxTKSkoLio/XFxcXFNbKl9dKikoXFxcXDEpXCJcbiAgICAgICAgfSwgeyAvL1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJ0ZXh0XCIsIFwidXJsXCIsIFwidGV4dFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPCkoXCIrXG4gICAgICAgICAgICAgICAgICAgICAgXCIoPzpodHRwcz98ZnRwfGRpY3QpOlteJ1xcXCI+XFxcXHNdK1wiK1xuICAgICAgICAgICAgICAgICAgICAgIFwifFwiK1xuICAgICAgICAgICAgICAgICAgICAgIFwiKD86bWFpbHRvOik/Wy0uXFxcXHddK1xcXFxAWy1hLXowLTldKyg/OlxcXFwuWy1hLXowLTldKykqXFxcXC5bYS16XStcIitcbiAgICAgICAgICAgICAgICAgICAgXCIpKD4pXCJcbiAgICAgICAgfV0sXG5cbiAgICAgICAgLy8gY29kZSBibG9ja1xuICAgICAgICBcImFsbG93QmxvY2tcIjogW1xuICAgICAgICAgICAge3Rva2VuIDogXCJzdXBwb3J0LmZ1bmN0aW9uXCIsIHJlZ2V4IDogXCJeIHs0fS4rXCIsIG5leHQgOiBcImFsbG93QmxvY2tcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcImVtcHR5X2xpbmVcIiwgcmVnZXggOiAnXiQnLCBuZXh0OiBcImFsbG93QmxvY2tcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcImVtcHR5XCIsIHJlZ2V4IDogXCJcIiwgbmV4dCA6IFwic3RhcnRcIn1cbiAgICAgICAgXSxcblxuICAgICAgICBcImhlYWRlclwiIDogW3tcbiAgICAgICAgICAgIHJlZ2V4OiBcIiRcIixcbiAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJiYXNpY1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwiaGVhZGluZ1wiXG4gICAgICAgIH0gXSxcblxuICAgICAgICBcImxpc3RibG9jay1zdGFydFwiIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJzdXBwb3J0LnZhcmlhYmxlXCIsXG4gICAgICAgICAgICByZWdleCA6IC8oPzpcXFtbIHhdXFxdKT8vLFxuICAgICAgICAgICAgbmV4dCAgOiBcImxpc3RibG9ja1wiXG4gICAgICAgIH1dLFxuXG4gICAgICAgIFwibGlzdGJsb2NrXCIgOiBbIHsgLy8gTGlzdHMgb25seSBlc2NhcGUgb24gY29tcGxldGVseSBibGFuayBsaW5lcy5cbiAgICAgICAgICAgIHRva2VuIDogXCJlbXB0eV9saW5lXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXiRcIixcbiAgICAgICAgICAgIG5leHQgIDogXCJzdGFydFwiXG4gICAgICAgIH0sIHsgLy8gbGlzdFxuICAgICAgICAgICAgdG9rZW4gOiBcIm1hcmt1cC5saXN0XCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXlxcXFxzezAsM30oPzpbKistXXxcXFxcZCtcXFxcLilcXFxccytcIixcbiAgICAgICAgICAgIG5leHQgIDogXCJsaXN0YmxvY2stc3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlIDogXCJiYXNpY1wiLCBub0VzY2FwZTogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBjb2RlQmxvY2tTdGFydFJ1bGUsXG4gICAgICAgIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbiA6IFwibGlzdFwiIC8vZG8gbm90IHVzZSBtYXJrdXAubGlzdCB0byBhbGxvdyBzdGxpbmcgbGVhZGluZyBgKmAgZGlmZmVybnRseVxuICAgICAgICB9IF0sXG5cbiAgICAgICAgXCJibG9ja3F1b3RlXCIgOiBbIHsgLy8gQmxvY2txdW90ZXMgb25seSBlc2NhcGUgb24gYmxhbmsgbGluZXMuXG4gICAgICAgICAgICB0b2tlbiA6IFwiZW1wdHlfbGluZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIl5cXFxccyokXCIsXG4gICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICB9LCB7IC8vIGJsb2NrIHF1b3RlXG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmJsb2NrcXVvdGVcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJeXFxcXHMqPlxcXFxzKig/OlsqKy1dfFxcXFxkK1xcXFwuKT9cXFxccytcIixcbiAgICAgICAgICAgIG5leHQgIDogXCJibG9ja3F1b3RlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZSA6IFwiYmFzaWNcIiwgbm9Fc2NhcGU6IHRydWVcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuIDogXCJzdHJpbmcuYmxvY2txdW90ZVwiXG4gICAgICAgIH0gXSxcblxuICAgICAgICBcImdpdGh1YmJsb2NrXCIgOiBjb2RlQmxvY2tSdWxlc1xuICAgIH0pO1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcbm9vcC5pbmhlcml0cyhNYXJrZG93bkhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLk1hcmtkb3duSGlnaGxpZ2h0UnVsZXMgPSBNYXJrZG93bkhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBNYXNrSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9tYXNrX2hpZ2hsaWdodF9ydWxlc1wiKS5NYXNrSGlnaGxpZ2h0UnVsZXM7XG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSByZXF1aXJlKFwiLi9tYXRjaGluZ19icmFjZV9vdXRkZW50XCIpLk1hdGNoaW5nQnJhY2VPdXRkZW50O1xudmFyIENzc0JlaGF2aW91ciA9IHJlcXVpcmUoXCIuL2JlaGF2aW91ci9jc3NcIikuQ3NzQmVoYXZpb3VyO1xudmFyIENTdHlsZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IE1hc2tIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gbmV3IENzc0JlaGF2aW91cigpO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IENTdHlsZUZvbGRNb2RlKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgXG4gICAgdGhpcy5saW5lQ29tbWVudFN0YXJ0ID0gXCIvL1wiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIi8qXCIsIGVuZDogXCIqL1wifTtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgLy8gaWdub3JlIGJyYWNlcyBpbiBjb21tZW50c1xuICAgICAgICB2YXIgdG9rZW5zID0gdGhpcy5nZXRUb2tlbml6ZXIoKS5nZXRMaW5lVG9rZW5zKGxpbmUsIHN0YXRlKS50b2tlbnM7XG4gICAgICAgIGlmICh0b2tlbnMubGVuZ3RoICYmIHRva2Vuc1t0b2tlbnMubGVuZ3RoLTFdLnR5cGUgPT0gXCJjb21tZW50XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eLipcXHtcXHMqJC8pO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kb3V0ZGVudC5jaGVja091dGRlbnQobGluZSwgaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoZG9jLCByb3cpO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvbWFza1wiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5NYXNrSGlnaGxpZ2h0UnVsZXMgPSBNYXNrSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRSdWxlcyAgID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xudmFyIEpTUnVsZXMgICAgID0gcmVxdWlyZShcIi4vamF2YXNjcmlwdF9oaWdobGlnaHRfcnVsZXNcIikuSmF2YVNjcmlwdEhpZ2hsaWdodFJ1bGVzO1xudmFyIENzc1J1bGVzICAgID0gcmVxdWlyZShcIi4vY3NzX2hpZ2hsaWdodF9ydWxlc1wiKS5Dc3NIaWdobGlnaHRSdWxlcztcbnZhciBNRFJ1bGVzICAgICA9IHJlcXVpcmUoXCIuL21hcmtkb3duX2hpZ2hsaWdodF9ydWxlc1wiKS5NYXJrZG93bkhpZ2hsaWdodFJ1bGVzO1xudmFyIEhUTUxSdWxlcyAgID0gcmVxdWlyZShcIi4vaHRtbF9oaWdobGlnaHRfcnVsZXNcIikuSHRtbEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgdG9rZW5fVEFHICAgICAgID0gXCJrZXl3b3JkLnN1cHBvcnQuY29uc3RhbnQubGFuZ3VhZ2VcIixcbiAgICB0b2tlbl9DT01QTyAgICAgPSBcInN1cHBvcnQuZnVuY3Rpb24ubWFya3VwLmJvbGRcIixcbiAgICB0b2tlbl9LRVlXT1JEICAgPSBcImtleXdvcmRcIixcbiAgICB0b2tlbl9MQU5HICAgICAgPSBcImNvbnN0YW50Lmxhbmd1YWdlXCIsXG4gICAgdG9rZW5fVVRJTCAgICAgID0gXCJrZXl3b3JkLmNvbnRyb2wubWFya3VwLml0YWxpY1wiLFxuICAgIHRva2VuX0FUVFIgICAgICA9IFwic3VwcG9ydC52YXJpYWJsZS5jbGFzc1wiLFxuICAgIHRva2VuX1BVTktUICAgICA9IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgIHRva2VuX0lUQUxJQyAgICA9IFwibWFya3VwLml0YWxpY1wiLFxuICAgIHRva2VuX0JPTEQgICAgICA9IFwibWFya3VwLmJvbGRcIixcbiAgICB0b2tlbl9MUEFSRSAgICAgPSBcInBhcmVuLmxwYXJlblwiLFxuICAgIHRva2VuX1JQQVJFICAgICA9IFwicGFyZW4ucnBhcmVuXCI7XG5cbnZhciBjb25zdF9GVU5DVElPTlMsXG4gICAgY29uc3RfS0VZV09SRFMsXG4gICAgY29uc3RfQ09OU1QsXG4gICAgY29uc3RfVEFHUztcbihmdW5jdGlvbigpe1xuICAgIGNvbnN0X0ZVTkNUSU9OUyA9IGxhbmcuYXJyYXlUb01hcChcbiAgICAgICAgKFwibG9nXCIpLnNwbGl0KFwifFwiKVxuICAgICk7XG4gICAgY29uc3RfQ09OU1QgPSBsYW5nLmFycmF5VG9NYXAoXG4gICAgICAgIChcIjpkdWFsYmluZHw6YmluZHw6aW1wb3J0fHNsb3R8ZXZlbnR8c3R5bGV8aHRtbHxtYXJrZG93bnxtZFwiKS5zcGxpdChcInxcIilcbiAgICApO1xuICAgIGNvbnN0X0tFWVdPUkRTID0gbGFuZy5hcnJheVRvTWFwKFxuICAgICAgICAoXCJkZWJ1Z2dlcnxkZWZpbmV8dmFyfGlmfGVhY2h8Zm9yfG9mfGVsc2V8c3dpdGNofGNhc2V8d2l0aHx2aXNpYmxlfCtpZnwrZWFjaHwrZm9yfCtzd2l0Y2h8K3dpdGh8K3Zpc2libGV8aW5jbHVkZXxpbXBvcnRcIikuc3BsaXQoXCJ8XCIpXG4gICAgKTtcbiAgICBjb25zdF9UQUdTID0gbGFuZy5hcnJheVRvTWFwKFxuICAgICAgICAoXCJhfGFiYnJ8YWNyb255bXxhZGRyZXNzfGFwcGxldHxhcmVhfGFydGljbGV8YXNpZGV8YXVkaW98YnxiYXNlfGJhc2Vmb250fGJkb3xcIiArIFxuICAgICAgICAgXCJiaWd8YmxvY2txdW90ZXxib2R5fGJyfGJ1dHRvbnxjYW52YXN8Y2FwdGlvbnxjZW50ZXJ8Y2l0ZXxjb2RlfGNvbHxjb2xncm91cHxcIiArIFxuICAgICAgICAgXCJjb21tYW5kfGRhdGFsaXN0fGRkfGRlbHxkZXRhaWxzfGRmbnxkaXJ8ZGl2fGRsfGR0fGVtfGVtYmVkfGZpZWxkc2V0fFwiICsgXG4gICAgICAgICBcImZpZ2NhcHRpb258ZmlndXJlfGZvbnR8Zm9vdGVyfGZvcm18ZnJhbWV8ZnJhbWVzZXR8aDF8aDJ8aDN8aDR8aDV8aDZ8aGVhZHxcIiArIFxuICAgICAgICAgXCJoZWFkZXJ8aGdyb3VwfGhyfGh0bWx8aXxpZnJhbWV8aW1nfGlucHV0fGluc3xrZXlnZW58a2JkfGxhYmVsfGxlZ2VuZHxsaXxcIiArIFxuICAgICAgICAgXCJsaW5rfG1hcHxtYXJrfG1lbnV8bWV0YXxtZXRlcnxuYXZ8bm9mcmFtZXN8bm9zY3JpcHR8b2JqZWN0fG9sfG9wdGdyb3VwfFwiICsgXG4gICAgICAgICBcIm9wdGlvbnxvdXRwdXR8cHxwYXJhbXxwcmV8cHJvZ3Jlc3N8cXxycHxydHxydWJ5fHN8c2FtcHxzY3JpcHR8c2VjdGlvbnxzZWxlY3R8XCIgKyBcbiAgICAgICAgIFwic21hbGx8c291cmNlfHNwYW58c3RyaWtlfHN0cm9uZ3xzdHlsZXxzdWJ8c3VtbWFyeXxzdXB8dGFibGV8dGJvZHl8dGR8XCIgKyBcbiAgICAgICAgIFwidGV4dGFyZWF8dGZvb3R8dGh8dGhlYWR8dGltZXx0aXRsZXx0cnx0dHx1fHVsfHZhcnx2aWRlb3x3YnJ8eG1wXCIpLnNwbGl0KFwifFwiKVxuICAgICk7XG59KCkpO1xuXG5mdW5jdGlvbiBNYXNrSGlnaGxpZ2h0UnVsZXMgKCkge1xuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgIFRva2VuKFwiY29tbWVudFwiLCBcIlxcXFwvXFxcXC8uKiRcIiksXG4gICAgICAgICAgICBUb2tlbihcImNvbW1lbnRcIiwgXCJcXFxcL1xcXFwqXCIsIFtcbiAgICAgICAgICAgICAgICBUb2tlbihcImNvbW1lbnRcIiwgXCIuKj9cXFxcKlxcXFwvXCIsIFwic3RhcnRcIiksXG4gICAgICAgICAgICAgICAgVG9rZW4oXCJjb21tZW50XCIsIFwiLitcIilcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBCbG9ja3Muc3RyaW5nKFwiJycnXCIpLFxuICAgICAgICAgICAgQmxvY2tzLnN0cmluZygnXCJcIlwiJyksXG4gICAgICAgICAgICBCbG9ja3Muc3RyaW5nKCdcIicpLFxuICAgICAgICAgICAgQmxvY2tzLnN0cmluZyhcIidcIiksXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIEJsb2Nrcy5zeW50YXgoLyhtYXJrZG93bnxtZClcXGIvLCBcIm1kLW11bHRpbGluZVwiLCBcIm11bHRpbGluZVwiKSxcbiAgICAgICAgICAgIEJsb2Nrcy5zeW50YXgoL2h0bWxcXGIvLCBcImh0bWwtbXVsdGlsaW5lXCIsIFwibXVsdGlsaW5lXCIpLFxuICAgICAgICAgICAgQmxvY2tzLnN5bnRheCgvKHNsb3R8ZXZlbnQpXFxiLywgXCJqcy1ibG9ja1wiLCBcImJsb2NrXCIpLFxuICAgICAgICAgICAgQmxvY2tzLnN5bnRheCgvc3R5bGVcXGIvLCBcImNzcy1ibG9ja1wiLCBcImJsb2NrXCIpLFxuICAgICAgICAgICAgQmxvY2tzLnN5bnRheCgvdmFyXFxiLywgXCJqcy1zdGF0ZW1lbnRcIiwgXCJhdHRyXCIpLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICBCbG9ja3MudGFnKCksXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFRva2VuKHRva2VuX0xQQVJFLCBcIltbKHs+XVwiKSxcbiAgICAgICAgICAgIFRva2VuKHRva2VuX1JQQVJFLCBcIltcXFxcXSl9O11cIiwgXCJzdGFydFwiKSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG4gICAgdmFyIHJ1bGVzID0gdGhpcztcbiAgICBcbiAgICBhZGRKYXZhU2NyaXB0KFwiaW50ZXJwb2xhdGlvblwiLCAvXFxdLywgdG9rZW5fUlBBUkUgKyBcIi5cIiArIHRva2VuX0lUQUxJQyk7XG4gICAgYWRkSmF2YVNjcmlwdChcInN0YXRlbWVudFwiLCAvXFwpfH18Oy8pO1xuICAgIGFkZEphdmFTY3JpcHQoXCJibG9ja1wiLCAvXFx9Lyk7XG4gICAgYWRkQ3NzKCk7XG4gICAgYWRkTWFya2Rvd24oKTtcbiAgICBhZGRIdG1sKCk7XG4gICAgXG4gICAgZnVuY3Rpb24gYWRkSmF2YVNjcmlwdChuYW1lLCBlc2NhcGUsIGNsb3NlVHlwZSkge1xuICAgICAgICB2YXIgcHJmeCAgPSAgXCJqcy1cIiArIG5hbWUgKyBcIi1cIixcbiAgICAgICAgICAgIHJvb3RUb2tlbnMgPSBuYW1lID09PSBcImJsb2NrXCIgPyBbXCJzdGFydFwiXSA6IFtcInN0YXJ0XCIsIFwibm9fcmVnZXhcIl07XG4gICAgICAgIGFkZChcbiAgICAgICAgICAgIEpTUnVsZXNcbiAgICAgICAgICAgICwgcHJmeFxuICAgICAgICAgICAgLCBlc2NhcGVcbiAgICAgICAgICAgICwgcm9vdFRva2Vuc1xuICAgICAgICAgICAgLCBjbG9zZVR5cGVcbiAgICAgICAgKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkQ3NzKCkge1xuICAgICAgICBhZGQoQ3NzUnVsZXMsIFwiY3NzLWJsb2NrLVwiLCAvXFx9Lyk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZE1hcmtkb3duKCkge1xuICAgICAgICBhZGQoTURSdWxlcywgXCJtZC1tdWx0aWxpbmUtXCIsIC8oXCJcIlwifCcnJykvLCBbXSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGFkZEh0bWwoKSB7XG4gICAgICAgIGFkZChIVE1MUnVsZXMsIFwiaHRtbC1tdWx0aWxpbmUtXCIsIC8oXCJcIlwifCcnJykvKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gYWRkKFJ1bGVzLCBzdHJQcmZ4LCByZ3hFbmQsIHJvb3RUb2tlbnMsIGNsb3NlVHlwZSkge1xuICAgICAgICB2YXIgbmV4dCA9IFwicG9wXCI7XG4gICAgICAgIHZhciB0b2tlbnMgPSByb290VG9rZW5zIHx8IFsgXCJzdGFydFwiIF07XG4gICAgICAgIGlmICh0b2tlbnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0b2tlbnMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICgvYmxvY2t8bXVsdGlsaW5lLy50ZXN0KHN0clByZngpKSB7XG4gICAgICAgICAgICBuZXh0ID0gc3RyUHJmeCArIFwiZW5kXCI7XG4gICAgICAgICAgICBydWxlcy4kcnVsZXNbbmV4dF0gPSBbXG4gICAgICAgICAgICAgICAgVG9rZW4oXCJlbXB0eVwiLCBcIlwiLCBcInN0YXJ0XCIpXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIHJ1bGVzLmVtYmVkUnVsZXMoXG4gICAgICAgICAgICBSdWxlc1xuICAgICAgICAgICAgLCBzdHJQcmZ4XG4gICAgICAgICAgICAsIFsgVG9rZW4oY2xvc2VUeXBlIHx8IHRva2VuX1JQQVJFLCByZ3hFbmQsIG5leHQpIF1cbiAgICAgICAgICAgICwgdG9rZW5zXG4gICAgICAgICAgICAsIHRva2VucyA9PSBudWxsID8gdHJ1ZSA6IGZhbHNlXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufVxub29wLmluaGVyaXRzKE1hc2tIaWdobGlnaHRSdWxlcywgVGV4dFJ1bGVzKTtcblxudmFyIEJsb2NrcyA9IHtcbiAgICBzdHJpbmc6IGZ1bmN0aW9uKHN0ciwgbmV4dCl7XG4gICAgICAgIHZhciB0b2tlbiA9IFRva2VuKFxuICAgICAgICAgICAgXCJzdHJpbmcuc3RhcnRcIlxuICAgICAgICAgICAgLCBzdHJcbiAgICAgICAgICAgICwgW1xuICAgICAgICAgICAgICAgIFRva2VuKHRva2VuX0xQQVJFICsgXCIuXCIgKyB0b2tlbl9JVEFMSUMsIC9+XFxbLywgQmxvY2tzLmludGVycG9sYXRpb24oKSksXG4gICAgICAgICAgICAgICAgVG9rZW4oXCJzdHJpbmcuZW5kXCIsIHN0ciwgXCJwb3BcIiksXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgICAgICAsIG5leHRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHN0ci5sZW5ndGggPT09IDEpe1xuICAgICAgICAgICAgdmFyIGVzY2FwZWQgPSBUb2tlbihcInN0cmluZy5lc2NhcGVcIiwgXCJcXFxcXFxcXFwiICsgc3RyKTtcbiAgICAgICAgICAgIHRva2VuLnB1c2gudW5zaGlmdChlc2NhcGVkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdG9rZW47XG4gICAgfSxcbiAgICBpbnRlcnBvbGF0aW9uOiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgVG9rZW4odG9rZW5fVVRJTCwgL1xccypcXHcqXFxzKjovKSxcbiAgICAgICAgICAgIFwianMtaW50ZXJwb2xhdGlvbi1zdGFydFwiXG4gICAgICAgIF07XG4gICAgfSxcbiAgICB0YWdIZWFkOiBmdW5jdGlvbiAocmd4KSB7XG4gICAgICByZXR1cm4gVG9rZW4odG9rZW5fQVRUUiwgcmd4LCBbXG4gICAgICAgICAgICBUb2tlbih0b2tlbl9BVFRSLCAvW1xcd1xcLV9dKy8pLFxuICAgICAgICAgICAgVG9rZW4odG9rZW5fTFBBUkUgKyBcIi5cIiArIHRva2VuX0lUQUxJQywgL35cXFsvLCBCbG9ja3MuaW50ZXJwb2xhdGlvbigpKSxcbiAgICAgICAgICAgIEJsb2Nrcy5nb1VwKClcbiAgICAgICAgXSk7XG4gICAgfSxcbiAgICB0YWc6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHRva2VuOiAndGFnJyxcbiAgICAgICAgICAgIG9uTWF0Y2ggOiAgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodm9pZCAwICE9PSBjb25zdF9LRVlXT1JEU1t2YWx1ZV0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbl9LRVlXT1JEO1xuICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgIT09IGNvbnN0X0NPTlNUW3ZhbHVlXSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuX0xBTkc7XG4gICAgICAgICAgICAgICAgaWYgKHZvaWQgMCAhPT0gY29uc3RfRlVOQ1RJT05TW3ZhbHVlXSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwic3VwcG9ydC5mdW5jdGlvblwiO1xuICAgICAgICAgICAgICAgIGlmICh2b2lkIDAgIT09IGNvbnN0X1RBR1NbdmFsdWUudG9Mb3dlckNhc2UoKV0pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0b2tlbl9UQUc7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRva2VuX0NPTVBPO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlZ2V4IDogLyhbQFxcd1xcLV86K10rKXwoKF58XFxzKSg/PVxccyooXFwufCMpKSkvLFxuICAgICAgICAgICAgcHVzaDogW1xuICAgICAgICAgICAgICAgIEJsb2Nrcy50YWdIZWFkKC9cXC4vKSAsXG4gICAgICAgICAgICAgICAgQmxvY2tzLnRhZ0hlYWQoLyMvKSAsXG4gICAgICAgICAgICAgICAgQmxvY2tzLmV4cHJlc3Npb24oKSxcbiAgICAgICAgICAgICAgICBCbG9ja3MuYXR0cmlidXRlKCksXG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgVG9rZW4odG9rZW5fTFBBUkUsIC9bOz57XS8sIFwicG9wXCIpXG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgfSxcbiAgICBzeW50YXg6IGZ1bmN0aW9uKHJneCwgbmV4dCwgdHlwZSl7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0b2tlbjogdG9rZW5fTEFORyxcbiAgICAgICAgICAgIHJlZ2V4IDogcmd4LFxuICAgICAgICAgICAgcHVzaDogKHtcbiAgICAgICAgICAgICAgICBcImF0dHJcIjogW1xuICAgICAgICAgICAgICAgICAgICBuZXh0ICsgXCItc3RhcnRcIixcbiAgICAgICAgICAgICAgICAgICAgVG9rZW4odG9rZW5fUFVOS1QsIC87LywgXCJzdGFydFwiKVxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgXCJtdWx0aWxpbmVcIjogW1xuICAgICAgICAgICAgICAgICAgICBCbG9ja3MudGFnSGVhZCgvXFwuLykgLFxuICAgICAgICAgICAgICAgICAgICBCbG9ja3MudGFnSGVhZCgvIy8pICxcbiAgICAgICAgICAgICAgICAgICAgQmxvY2tzLmF0dHJpYnV0ZSgpLFxuICAgICAgICAgICAgICAgICAgICBCbG9ja3MuZXhwcmVzc2lvbigpLFxuICAgICAgICAgICAgICAgICAgICBUb2tlbih0b2tlbl9MUEFSRSwgL1s+XFx7XS8pLFxuICAgICAgICAgICAgICAgICAgICBUb2tlbih0b2tlbl9QVU5LVCwgLzsvLCBcInN0YXJ0XCIpLFxuICAgICAgICAgICAgICAgICAgICBUb2tlbih0b2tlbl9MUEFSRSwgLycnJ3xcIlwiXCIvLCBbIG5leHQgKyBcIi1zdGFydFwiIF0pXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBcImJsb2NrXCI6IFtcbiAgICAgICAgICAgICAgICAgICAgQmxvY2tzLnRhZ0hlYWQoL1xcLi8pICxcbiAgICAgICAgICAgICAgICAgICAgQmxvY2tzLnRhZ0hlYWQoLyMvKSAsXG4gICAgICAgICAgICAgICAgICAgIEJsb2Nrcy5hdHRyaWJ1dGUoKSxcbiAgICAgICAgICAgICAgICAgICAgQmxvY2tzLmV4cHJlc3Npb24oKSxcbiAgICAgICAgICAgICAgICAgICAgVG9rZW4odG9rZW5fTFBBUkUsIC9cXHsvLCBbIG5leHQgKyBcIi1zdGFydFwiIF0pXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSlbdHlwZV1cbiAgICAgICAgfTtcbiAgICB9LFxuICAgIGF0dHJpYnV0ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgcmV0dXJuIFRva2VuKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICAgIHJldHVybiAgL154XFwtLy50ZXN0KHZhbHVlKVxuICAgICAgICAgICAgICAgID8gdG9rZW5fQVRUUiArIFwiLlwiICsgdG9rZW5fQk9MRFxuICAgICAgICAgICAgICAgIDogdG9rZW5fQVRUUjtcbiAgICAgICAgfSwgL1tcXHdfLV0rLywgW1xuICAgICAgICAgICAgVG9rZW4odG9rZW5fUFVOS1QsIC9cXHMqPVxccyovLCBbXG4gICAgICAgICAgICAgICAgQmxvY2tzLnN0cmluZygnXCInKSxcbiAgICAgICAgICAgICAgICBCbG9ja3Muc3RyaW5nKFwiJ1wiKSxcbiAgICAgICAgICAgICAgICBCbG9ja3Mud29yZCgpLFxuICAgICAgICAgICAgICAgIEJsb2Nrcy5nb1VwKClcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgQmxvY2tzLmdvVXAoKVxuICAgICAgICBdKTtcbiAgICB9LFxuICAgIGV4cHJlc3Npb246IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBUb2tlbih0b2tlbl9MUEFSRSwgL1xcKC8sIFsgXCJqcy1zdGF0ZW1lbnQtc3RhcnRcIiBdKTtcbiAgICB9LFxuICAgIHdvcmQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBUb2tlbihcInN0cmluZ1wiLCAvW1xcdy1fXSsvKTtcbiAgICB9LFxuICAgIGdvVXA6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHJldHVybiBUb2tlbihcInRleHRcIiwgXCJcIiwgXCJwb3BcIik7XG4gICAgfSxcbiAgICBnb1N0YXJ0OiBmdW5jdGlvbigpe1xuICAgICAgICByZXR1cm4gVG9rZW4oXCJ0ZXh0XCIsIFwiXCIsIFwic3RhcnRcIik7XG4gICAgfVxufTtcblxuXG5mdW5jdGlvbiBUb2tlbih0b2tlbiwgcmd4LCBtaXgpIHtcbiAgICB2YXIgcHVzaCwgbmV4dCwgb25NYXRjaDtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICBwdXNoID0gbWl4O1xuICAgICAgICBuZXh0ID0gYXJndW1lbnRzWzNdO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgbWl4ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIG5leHQgPSBtaXg7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBwdXNoID0gbWl4O1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRva2VuID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgb25NYXRjaCA9IHRva2VuO1xuICAgICAgICB0b2tlbiAgID0gXCJlbXB0eVwiO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbjogdG9rZW4sXG4gICAgICAgIHJlZ2V4OiByZ3gsXG4gICAgICAgIHB1c2g6IHB1c2gsXG4gICAgICAgIG5leHQ6IG5leHQsXG4gICAgICAgIG9uTWF0Y2g6IG9uTWF0Y2hcbiAgICB9O1xufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gZnVuY3Rpb24oKSB7fTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihsaW5lLCBpbnB1dCkge1xuICAgICAgICBpZiAoISAvXlxccyskLy50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiAvXlxccypcXH0vLnRlc3QoaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oZG9jLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBkb2MuZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eKFxccypcXH0pLyk7XG5cbiAgICAgICAgaWYgKCFtYXRjaCkgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGNvbHVtbiA9IG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIG9wZW5CcmFjZVBvcyA9IGRvYy5maW5kTWF0Y2hpbmdCcmFja2V0KHtyb3c6IHJvdywgY29sdW1uOiBjb2x1bW59KTtcblxuICAgICAgICBpZiAoIW9wZW5CcmFjZVBvcyB8fCBvcGVuQnJhY2VQb3Mucm93ID09IHJvdykgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChkb2MuZ2V0TGluZShvcGVuQnJhY2VQb3Mucm93KSk7XG4gICAgICAgIGRvYy5yZXBsYWNlKG5ldyBSYW5nZShyb3csIDAsIHJvdywgY29sdW1uLTEpLCBpbmRlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLiRnZXRJbmRlbnQgPSBmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgIHJldHVybiBsaW5lLm1hdGNoKC9eXFxzKi8pWzBdO1xuICAgIH07XG5cbn0pLmNhbGwoTWF0Y2hpbmdCcmFjZU91dGRlbnQucHJvdG90eXBlKTtcblxuZXhwb3J0cy5NYXRjaGluZ0JyYWNlT3V0ZGVudCA9IE1hdGNoaW5nQnJhY2VPdXRkZW50O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9