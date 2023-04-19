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
//# sourceMappingURL=bundle.8394.js.map