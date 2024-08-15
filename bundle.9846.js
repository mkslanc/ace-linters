"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9846],{

/***/ 63458:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var Behaviour = (__webpack_require__(75684)/* .Behaviour */ .Q);
var TokenIterator = (__webpack_require__(99339).TokenIterator);

function is(token, type) {
    return token && token.type.lastIndexOf(type + ".xml") > -1;
}

var XmlBehaviour = function () {

    this.add("string_dquotes", "insertion", function (state, action, editor, session, text) {
        if (text == '"' || text == "'") {
            var quote = text;
            var selected = session.doc.getTextRange(editor.getSelectionRange());
            if (selected !== "" && selected !== "'" && selected != '"' && editor.getWrapBehavioursEnabled()) {
                return {
                    text: quote + selected + quote,
                    selection: false
                };
            }

            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            var iterator = new TokenIterator(session, cursor.row, cursor.column);
            var token = iterator.getCurrentToken();

            if (rightChar == quote && (is(token, "attribute-value") || is(token, "string"))) {
                // Ignore input and move right one if we're typing over the closing quote.
                return {
                    text: "",
                    selection: [1, 1]
                };
            }

            if (!token)
                token = iterator.stepBackward();

            if (!token)
                return;

            while (is(token, "tag-whitespace") || is(token, "whitespace")) {
                token = iterator.stepBackward();
            }
            var rightSpace = !rightChar || rightChar.match(/\s/);
            if (is(token, "attribute-equals") && (rightSpace || rightChar == '>') || (is(token, "decl-attribute-equals") && (rightSpace || rightChar == '?'))) {
                return {
                    text: quote + quote,
                    selection: [1, 1]
                };
            }
        }
    });

    this.add("string_dquotes", "deletion", function(state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && (selected == '"' || selected == "'")) {
            var line = session.doc.getLine(range.start.row);
            var rightChar = line.substring(range.start.column + 1, range.start.column + 2);
            if (rightChar == selected) {
                range.end.column++;
                return range;
            }
        }
    });

    this.add("autoclosing", "insertion", function (state, action, editor, session, text) {
        if (text == '>') {
            var position = editor.getSelectionRange().start;
            var iterator = new TokenIterator(session, position.row, position.column);
            var token = iterator.getCurrentToken() || iterator.stepBackward();

            // exit if we're not in a tag
            if (!token || !(is(token, "tag-name") || is(token, "tag-whitespace") || is(token, "attribute-name") || is(token, "attribute-equals") || is(token, "attribute-value")))
                return;

            // exit if we're inside of a quoted attribute value
            if (is(token, "reference.attribute-value"))
                return;
            if (is(token, "attribute-value")) {
                var tokenEndColumn = iterator.getCurrentTokenColumn() + token.value.length;
                if (position.column < tokenEndColumn)
                    return;
                if (position.column == tokenEndColumn) {
                    var nextToken = iterator.stepForward();
                    // TODO also handle non-closed string at the end of the line
                    if (nextToken && is(nextToken, "attribute-value"))
                        return;
                    iterator.stepBackward();
                }
            }
            
            if (/^\s*>/.test(session.getLine(position.row).slice(position.column)))
                return;

            // find tag name
            while (!is(token, "tag-name")) {
                token = iterator.stepBackward();
                if (token.value == "<") {
                    token = iterator.stepForward();
                    break;
                }
            }

            var tokenRow = iterator.getCurrentTokenRow();
            var tokenColumn = iterator.getCurrentTokenColumn();

            // exit if the tag is ending
            if (is(iterator.stepBackward(), "end-tag-open"))
                return;

            var element = token.value;
            if (tokenRow == position.row)
                element = element.substring(0, position.column - tokenColumn);

            if (this.voidElements && this.voidElements.hasOwnProperty(element.toLowerCase()))
                 return;

            return {
               text: ">" + "</" + element + ">",
               selection: [1, 1]
            };
        }
    });

    this.add("autoindent", "insertion", function (state, action, editor, session, text) {
        if (text == "\n") {
            var cursor = editor.getCursorPosition();
            var line = session.getLine(cursor.row);
            var iterator = new TokenIterator(session, cursor.row, cursor.column);
            var token = iterator.getCurrentToken();

            if (is(token, "") && token.type.indexOf("tag-close") !== -1) {
                if (token.value == "/>")
                    return;
                //get tag name
                while (token && token.type.indexOf("tag-name") === -1) {
                    token = iterator.stepBackward();
                }

                if (!token) {
                    return;
                }

                var tag = token.value;
                var row = iterator.getCurrentTokenRow();

                //don't indent after closing tag
                token = iterator.stepBackward();
                if (!token || token.type.indexOf("end-tag") !== -1) {
                    return;
                }

                if (this.voidElements && !this.voidElements[tag] || !this.voidElements) {
                    var nextToken = session.getTokenAt(cursor.row, cursor.column+1);
                    var line = session.getLine(row);
                    var nextIndent = this.$getIndent(line);
                    var indent = nextIndent + session.getTabString();

                    if (nextToken && nextToken.value === "</") {
                        return {
                            text: "\n" + indent + "\n" + nextIndent,
                            selection: [1, indent.length, 1, indent.length]
                        };
                    } else {
                        return {
                            text: "\n" + indent
                        };
                    }
                }
            }
        }
    });

};

oop.inherits(XmlBehaviour, Behaviour);

exports.XmlBehaviour = XmlBehaviour;


/***/ }),

/***/ 79712:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);

var FoldMode = exports.l = function(voidElements, optionalEndTags) {
    BaseFoldMode.call(this);
    this.voidElements = voidElements || {};
    this.optionalEndTags = oop.mixin({}, this.voidElements);
    if (optionalEndTags)
        oop.mixin(this.optionalEndTags, optionalEndTags);
    
};
oop.inherits(FoldMode, BaseFoldMode);

var Tag = function() {
    this.tagName = "";
    this.closing = false;
    this.selfClosing = false;
    this.start = {row: 0, column: 0};
    this.end = {row: 0, column: 0};
};

function is(token, type) {
    return token.type.lastIndexOf(type + ".xml") > -1;
}

(function() {

    this.getFoldWidget = function(session, foldStyle, row) {
        var tag = this._getFirstTagInLine(session, row);

        if (!tag)
            return this.getCommentFoldWidget(session, row);

        if (tag.closing || (!tag.tagName && tag.selfClosing))
            return foldStyle === "markbeginend" ? "end" : "";

        if (!tag.tagName || tag.selfClosing || this.voidElements.hasOwnProperty(tag.tagName.toLowerCase()))
            return "";

        if (this._findEndTagInLine(session, row, tag.tagName, tag.end.column))
            return "";

        return "start";
    };
    
    this.getCommentFoldWidget = function(session, row) {
        if (/comment/.test(session.getState(row)) && /<!-/.test(session.getLine(row)))
            return "start";
        return "";
    };

    /*
     * returns a first tag (or a fragment) in a line
     */
    this._getFirstTagInLine = function(session, row) {
        var tokens = session.getTokens(row);
        var tag = new Tag();

        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            if (is(token, "tag-open")) {
                tag.end.column = tag.start.column + token.value.length;
                tag.closing = is(token, "end-tag-open");
                token = tokens[++i];
                if (!token)
                    return null;
                tag.tagName = token.value;
                if (token.value === "") { //skip empty tag name token for fragment
                    token = tokens[++i];
                    if (!token) return null;
                    tag.tagName = token.value;
                }
                tag.end.column += token.value.length;
                for (i++; i < tokens.length; i++) {
                    token = tokens[i];
                    tag.end.column += token.value.length;
                    if (is(token, "tag-close")) {
                        tag.selfClosing = token.value == '/>';
                        break;
                    }
                }
                return tag;
            } else if (is(token, "tag-close")) {
                tag.selfClosing = token.value == '/>';
                return tag;
            }
            tag.start.column += token.value.length;
        }

        return null;
    };

    this._findEndTagInLine = function(session, row, tagName, startColumn) {
        var tokens = session.getTokens(row);
        var column = 0;
        for (var i = 0; i < tokens.length; i++) {
            var token = tokens[i];
            column += token.value.length;
            if (column < startColumn - 1)
                continue;
            if (is(token, "end-tag-open")) {
                token = tokens[i + 1];
                if (is(token, "tag-name") && token.value === "") {
                    token = tokens[i + 2];
                }
                if (token && token.value == tagName)
                    return true;
            }
        }
        return false;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var firstTag = this._getFirstTagInLine(session, row);
        if (!firstTag) {
            return this.getCommentFoldWidget(session, row) && session.getCommentFoldRange(
                row, session.getLine(row).length);
        }
        var tags = session.getMatchingTags({row: row, column: 0});
        if (tags) {
            return new Range(
                tags.openTag.end.row, tags.openTag.end.column, tags.closeTag.start.row, tags.closeTag.start.column);
        }
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 49846:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var TextMode = (__webpack_require__(49432).Mode);
var XmlHighlightRules = (__webpack_require__(54849)/* .XmlHighlightRules */ .l);
var XmlBehaviour = (__webpack_require__(63458).XmlBehaviour);
var XmlFoldMode = (__webpack_require__(79712)/* .FoldMode */ .l);
var WorkerClient = (__webpack_require__(28402).WorkerClient);

var Mode = function() {
   this.HighlightRules = XmlHighlightRules;
   this.$behaviour = new XmlBehaviour();
   this.foldingRules = new XmlFoldMode();
};

oop.inherits(Mode, TextMode);

(function() {

    this.voidElements = lang.arrayToMap([]);

    this.blockComment = {start: "<!--", end: "-->"};

    this.createWorker = function(session) {
        var worker = new WorkerClient(["ace"], "ace/mode/xml_worker", "Worker");
        worker.attachToDocument(session.getDocument());

        worker.on("error", function(e) {
            session.setAnnotations(e.data);
        });

        worker.on("terminate", function() {
            session.clearAnnotations();
        });

        return worker;
    };
    
    this.$id = "ace/mode/xml";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 54849:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var XmlHighlightRules = function(normalize) {
    // http://www.w3.org/TR/REC-xml/#NT-NameChar
    // NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
    // NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
    var tagRegex = "[_:a-zA-Z\xc0-\uffff][-_:.a-zA-Z0-9\xc0-\uffff]*";

    this.$rules = {
        start : [
            {token : "string.cdata.xml", regex : "<\\!\\[CDATA\\[", next : "cdata"},
            {
                token : ["punctuation.instruction.xml", "keyword.instruction.xml"],
                regex : "(<\\?)(" + tagRegex + ")", next : "processing_instruction"
            },
            {token : "comment.start.xml", regex : "<\\!--", next : "comment"},
            {
                token : ["xml-pe.doctype.xml", "xml-pe.doctype.xml"],
                regex : "(<\\!)(DOCTYPE)(?=[\\s])", next : "doctype", caseInsensitive: true
            },
            {include : "tag"},
            {token : "text.end-tag-open.xml", regex: "</"},
            {token : "text.tag-open.xml", regex: "<"},
            {include : "reference"},
            {defaultToken : "text.xml"}
        ],

        processing_instruction : [{
            token : "entity.other.attribute-name.decl-attribute-name.xml",
            regex : tagRegex
        }, {
            token : "keyword.operator.decl-attribute-equals.xml",
            regex : "="
        }, {
            include: "whitespace"
        }, {
            include: "string"
        }, {
            token : "punctuation.xml-decl.xml",
            regex : "\\?>",
            next : "start"
        }],

        doctype : [
            {include : "whitespace"},
            {include : "string"},
            {token : "xml-pe.doctype.xml", regex : ">", next : "start"},
            {token : "xml-pe.xml", regex : "[-_a-zA-Z0-9:]+"},
            {token : "punctuation.int-subset", regex : "\\[", push : "int_subset"}
        ],

        int_subset : [{
            token : "text.xml",
            regex : "\\s+"
        }, {
            token: "punctuation.int-subset.xml",
            regex: "]",
            next: "pop"
        }, {
            token : ["punctuation.markup-decl.xml", "keyword.markup-decl.xml"],
            regex : "(<\\!)(" + tagRegex + ")",
            push : [{
                token : "text",
                regex : "\\s+"
            },
            {
                token : "punctuation.markup-decl.xml",
                regex : ">",
                next : "pop"
            },
            {include : "string"}]
        }],

        cdata : [
            {token : "string.cdata.xml", regex : "\\]\\]>", next : "start"},
            {token : "text.xml", regex : "\\s+"},
            {token : "text.xml", regex : "(?:[^\\]]|\\](?!\\]>))+"}
        ],

        comment : [
            {token : "comment.end.xml", regex : "-->", next : "start"},
            {defaultToken : "comment.xml"}
        ],

        reference : [{
            token : "constant.language.escape.reference.xml",
            regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
        }],

        attr_reference : [{
            token : "constant.language.escape.reference.attribute-value.xml",
            regex : "(?:&#[0-9]+;)|(?:&#x[0-9a-fA-F]+;)|(?:&[a-zA-Z0-9_:\\.-]+;)"
        }],

        tag : [{
            token : ["meta.tag.punctuation.tag-open.xml", "meta.tag.punctuation.end-tag-open.xml", "meta.tag.tag-name.xml"],
            regex : "(?:(<)|(</))((?:" + tagRegex + ":)?" + tagRegex + ")",
            next: [
                {include : "attributes"},
                {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>", next : "start"}
            ]
        }],

        tag_whitespace : [
            {token : "text.tag-whitespace.xml", regex : "\\s+"}
        ],
        // for doctype and processing instructions
        whitespace : [
            {token : "text.whitespace.xml", regex : "\\s+"}
        ],

        // for doctype and processing instructions
        string: [{
            token : "string.xml",
            regex : "'",
            push : [
                {token : "string.xml", regex: "'", next: "pop"},
                {defaultToken : "string.xml"}
            ]
        }, {
            token : "string.xml",
            regex : '"',
            push : [
                {token : "string.xml", regex: '"', next: "pop"},
                {defaultToken : "string.xml"}
            ]
        }],

        attributes: [{
            token : "entity.other.attribute-name.xml",
            regex : tagRegex
        }, {
            token : "keyword.operator.attribute-equals.xml",
            regex : "="
        }, {
            include: "tag_whitespace"
        }, {
            include: "attribute_value"
        }],

        attribute_value: [{
            token : "string.attribute-value.xml",
            regex : "'",
            push : [
                {token : "string.attribute-value.xml", regex: "'", next: "pop"},
                {include : "attr_reference"},
                {defaultToken : "string.attribute-value.xml"}
            ]
        }, {
            token : "string.attribute-value.xml",
            regex : '"',
            push : [
                {token : "string.attribute-value.xml", regex: '"', next: "pop"},
                {include : "attr_reference"},
                {defaultToken : "string.attribute-value.xml"}
            ]
        }]
    };

    if (this.constructor === XmlHighlightRules)
        this.normalizeRules();
};


(function() {

    this.embedTagRules = function(HighlightRules, prefix, tag){
        this.$rules.tag.unshift({
            token : ["meta.tag.punctuation.tag-open.xml", "meta.tag." + tag + ".tag-name.xml"],
            regex : "(<)(" + tag + "(?=\\s|>|$))",
            next: [
                {include : "attributes"},
                {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>", next : prefix + "start"}
            ]
        });

        this.$rules[tag + "-end"] = [
            {include : "attributes"},
            {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>",  next: "start",
                onMatch : function(value, currentState, stack) {
                    stack.splice(0);
                    return this.token;
            }}
        ];

        this.embedRules(HighlightRules, prefix, [{
            token: ["meta.tag.punctuation.end-tag-open.xml", "meta.tag." + tag + ".tag-name.xml"],
            regex : "(</)(" + tag + "(?=\\s|>|$))",
            next: tag + "-end"
        }, {
            token: "string.cdata.xml",
            regex : "<\\!\\[CDATA\\["
        }, {
            token: "string.cdata.xml",
            regex : "\\]\\]>"
        }]);
    };

}).call(TextHighlightRules.prototype);

oop.inherits(XmlHighlightRules, TextHighlightRules);

exports.l = XmlHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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bnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9iZWhhdmlvdXIveG1sLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy94bWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS94bWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS94bWxfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmVoYXZpb3VyID0gcmVxdWlyZShcIi4uL2JlaGF2aW91clwiKS5CZWhhdmlvdXI7XG52YXIgVG9rZW5JdGVyYXRvciA9IHJlcXVpcmUoXCIuLi8uLi90b2tlbl9pdGVyYXRvclwiKS5Ub2tlbkl0ZXJhdG9yO1xuXG5mdW5jdGlvbiBpcyh0b2tlbiwgdHlwZSkge1xuICAgIHJldHVybiB0b2tlbiAmJiB0b2tlbi50eXBlLmxhc3RJbmRleE9mKHR5cGUgKyBcIi54bWxcIikgPiAtMTtcbn1cblxudmFyIFhtbEJlaGF2aW91ciA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuYWRkKFwic3RyaW5nX2RxdW90ZXNcIiwgXCJpbnNlcnRpb25cIiwgZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24sIGVkaXRvciwgc2Vzc2lvbiwgdGV4dCkge1xuICAgICAgICBpZiAodGV4dCA9PSAnXCInIHx8IHRleHQgPT0gXCInXCIpIHtcbiAgICAgICAgICAgIHZhciBxdW90ZSA9IHRleHQ7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWQgPSBzZXNzaW9uLmRvYy5nZXRUZXh0UmFuZ2UoZWRpdG9yLmdldFNlbGVjdGlvblJhbmdlKCkpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkICE9PSBcIlwiICYmIHNlbGVjdGVkICE9PSBcIidcIiAmJiBzZWxlY3RlZCAhPSAnXCInICYmIGVkaXRvci5nZXRXcmFwQmVoYXZpb3Vyc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHF1b3RlICsgc2VsZWN0ZWQgKyBxdW90ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmYWxzZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5kb2MuZ2V0TGluZShjdXJzb3Iucm93KTtcbiAgICAgICAgICAgIHZhciByaWdodENoYXIgPSBsaW5lLnN1YnN0cmluZyhjdXJzb3IuY29sdW1uLCBjdXJzb3IuY29sdW1uICsgMSk7XG4gICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCBjdXJzb3Iucm93LCBjdXJzb3IuY29sdW1uKTtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlbigpO1xuXG4gICAgICAgICAgICBpZiAocmlnaHRDaGFyID09IHF1b3RlICYmIChpcyh0b2tlbiwgXCJhdHRyaWJ1dGUtdmFsdWVcIikgfHwgaXModG9rZW4sIFwic3RyaW5nXCIpKSkge1xuICAgICAgICAgICAgICAgIC8vIElnbm9yZSBpbnB1dCBhbmQgbW92ZSByaWdodCBvbmUgaWYgd2UncmUgdHlwaW5nIG92ZXIgdGhlIGNsb3NpbmcgcXVvdGUuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbMSwgMV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRva2VuKVxuICAgICAgICAgICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCk7XG5cbiAgICAgICAgICAgIGlmICghdG9rZW4pXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICB3aGlsZSAoaXModG9rZW4sIFwidGFnLXdoaXRlc3BhY2VcIikgfHwgaXModG9rZW4sIFwid2hpdGVzcGFjZVwiKSkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmlnaHRTcGFjZSA9ICFyaWdodENoYXIgfHwgcmlnaHRDaGFyLm1hdGNoKC9cXHMvKTtcbiAgICAgICAgICAgIGlmIChpcyh0b2tlbiwgXCJhdHRyaWJ1dGUtZXF1YWxzXCIpICYmIChyaWdodFNwYWNlIHx8IHJpZ2h0Q2hhciA9PSAnPicpIHx8IChpcyh0b2tlbiwgXCJkZWNsLWF0dHJpYnV0ZS1lcXVhbHNcIikgJiYgKHJpZ2h0U3BhY2UgfHwgcmlnaHRDaGFyID09ICc/JykpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcXVvdGUgKyBxdW90ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbMSwgMV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZChcInN0cmluZ19kcXVvdGVzXCIsIFwiZGVsZXRpb25cIiwgZnVuY3Rpb24oc3RhdGUsIGFjdGlvbiwgZWRpdG9yLCBzZXNzaW9uLCByYW5nZSkge1xuICAgICAgICB2YXIgc2VsZWN0ZWQgPSBzZXNzaW9uLmRvYy5nZXRUZXh0UmFuZ2UocmFuZ2UpO1xuICAgICAgICBpZiAoIXJhbmdlLmlzTXVsdGlMaW5lKCkgJiYgKHNlbGVjdGVkID09ICdcIicgfHwgc2VsZWN0ZWQgPT0gXCInXCIpKSB7XG4gICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZG9jLmdldExpbmUocmFuZ2Uuc3RhcnQucm93KTtcbiAgICAgICAgICAgIHZhciByaWdodENoYXIgPSBsaW5lLnN1YnN0cmluZyhyYW5nZS5zdGFydC5jb2x1bW4gKyAxLCByYW5nZS5zdGFydC5jb2x1bW4gKyAyKTtcbiAgICAgICAgICAgIGlmIChyaWdodENoYXIgPT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICByYW5nZS5lbmQuY29sdW1uKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZChcImF1dG9jbG9zaW5nXCIsIFwiaW5zZXJ0aW9uXCIsIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uLCBlZGl0b3IsIHNlc3Npb24sIHRleHQpIHtcbiAgICAgICAgaWYgKHRleHQgPT0gJz4nKSB7XG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBlZGl0b3IuZ2V0U2VsZWN0aW9uUmFuZ2UoKS5zdGFydDtcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IG5ldyBUb2tlbkl0ZXJhdG9yKHNlc3Npb24sIHBvc2l0aW9uLnJvdywgcG9zaXRpb24uY29sdW1uKTtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlbigpIHx8IGl0ZXJhdG9yLnN0ZXBCYWNrd2FyZCgpO1xuXG4gICAgICAgICAgICAvLyBleGl0IGlmIHdlJ3JlIG5vdCBpbiBhIHRhZ1xuICAgICAgICAgICAgaWYgKCF0b2tlbiB8fCAhKGlzKHRva2VuLCBcInRhZy1uYW1lXCIpIHx8IGlzKHRva2VuLCBcInRhZy13aGl0ZXNwYWNlXCIpIHx8IGlzKHRva2VuLCBcImF0dHJpYnV0ZS1uYW1lXCIpIHx8IGlzKHRva2VuLCBcImF0dHJpYnV0ZS1lcXVhbHNcIikgfHwgaXModG9rZW4sIFwiYXR0cmlidXRlLXZhbHVlXCIpKSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIGV4aXQgaWYgd2UncmUgaW5zaWRlIG9mIGEgcXVvdGVkIGF0dHJpYnV0ZSB2YWx1ZVxuICAgICAgICAgICAgaWYgKGlzKHRva2VuLCBcInJlZmVyZW5jZS5hdHRyaWJ1dGUtdmFsdWVcIikpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGlzKHRva2VuLCBcImF0dHJpYnV0ZS12YWx1ZVwiKSkge1xuICAgICAgICAgICAgICAgIHZhciB0b2tlbkVuZENvbHVtbiA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlbkNvbHVtbigpICsgdG9rZW4udmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5jb2x1bW4gPCB0b2tlbkVuZENvbHVtbilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5jb2x1bW4gPT0gdG9rZW5FbmRDb2x1bW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRUb2tlbiA9IGl0ZXJhdG9yLnN0ZXBGb3J3YXJkKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gYWxzbyBoYW5kbGUgbm9uLWNsb3NlZCBzdHJpbmcgYXQgdGhlIGVuZCBvZiB0aGUgbGluZVxuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFRva2VuICYmIGlzKG5leHRUb2tlbiwgXCJhdHRyaWJ1dGUtdmFsdWVcIikpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdG9yLnN0ZXBCYWNrd2FyZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKC9eXFxzKj4vLnRlc3Qoc2Vzc2lvbi5nZXRMaW5lKHBvc2l0aW9uLnJvdykuc2xpY2UocG9zaXRpb24uY29sdW1uKSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBmaW5kIHRhZyBuYW1lXG4gICAgICAgICAgICB3aGlsZSAoIWlzKHRva2VuLCBcInRhZy1uYW1lXCIpKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBpdGVyYXRvci5zdGVwQmFja3dhcmQoKTtcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gXCI8XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBpdGVyYXRvci5zdGVwRm9yd2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0b2tlblJvdyA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlblJvdygpO1xuICAgICAgICAgICAgdmFyIHRva2VuQ29sdW1uID0gaXRlcmF0b3IuZ2V0Q3VycmVudFRva2VuQ29sdW1uKCk7XG5cbiAgICAgICAgICAgIC8vIGV4aXQgaWYgdGhlIHRhZyBpcyBlbmRpbmdcbiAgICAgICAgICAgIGlmIChpcyhpdGVyYXRvci5zdGVwQmFja3dhcmQoKSwgXCJlbmQtdGFnLW9wZW5cIikpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IHRva2VuLnZhbHVlO1xuICAgICAgICAgICAgaWYgKHRva2VuUm93ID09IHBvc2l0aW9uLnJvdylcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5zdWJzdHJpbmcoMCwgcG9zaXRpb24uY29sdW1uIC0gdG9rZW5Db2x1bW4pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy52b2lkRWxlbWVudHMgJiYgdGhpcy52b2lkRWxlbWVudHMuaGFzT3duUHJvcGVydHkoZWxlbWVudC50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgdGV4dDogXCI+XCIgKyBcIjwvXCIgKyBlbGVtZW50ICsgXCI+XCIsXG4gICAgICAgICAgICAgICBzZWxlY3Rpb246IFsxLCAxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGQoXCJhdXRvaW5kZW50XCIsIFwiaW5zZXJ0aW9uXCIsIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uLCBlZGl0b3IsIHNlc3Npb24sIHRleHQpIHtcbiAgICAgICAgaWYgKHRleHQgPT0gXCJcXG5cIikge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUoY3Vyc29yLnJvdyk7XG4gICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCBjdXJzb3Iucm93LCBjdXJzb3IuY29sdW1uKTtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlbigpO1xuXG4gICAgICAgICAgICBpZiAoaXModG9rZW4sIFwiXCIpICYmIHRva2VuLnR5cGUuaW5kZXhPZihcInRhZy1jbG9zZVwiKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gXCIvPlwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy9nZXQgdGFnIG5hbWVcbiAgICAgICAgICAgICAgICB3aGlsZSAodG9rZW4gJiYgdG9rZW4udHlwZS5pbmRleE9mKFwidGFnLW5hbWVcIikgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHRhZyA9IHRva2VuLnZhbHVlO1xuICAgICAgICAgICAgICAgIHZhciByb3cgPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW5Sb3coKTtcblxuICAgICAgICAgICAgICAgIC8vZG9uJ3QgaW5kZW50IGFmdGVyIGNsb3NpbmcgdGFnXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBpdGVyYXRvci5zdGVwQmFja3dhcmQoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRva2VuIHx8IHRva2VuLnR5cGUuaW5kZXhPZihcImVuZC10YWdcIikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy52b2lkRWxlbWVudHMgJiYgIXRoaXMudm9pZEVsZW1lbnRzW3RhZ10gfHwgIXRoaXMudm9pZEVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0VG9rZW4gPSBzZXNzaW9uLmdldFRva2VuQXQoY3Vyc29yLnJvdywgY3Vyc29yLmNvbHVtbisxKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRJbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRlbnQgPSBuZXh0SW5kZW50ICsgc2Vzc2lvbi5nZXRUYWJTdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFRva2VuICYmIG5leHRUb2tlbi52YWx1ZSA9PT0gXCI8L1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXFxuXCIgKyBpbmRlbnQgKyBcIlxcblwiICsgbmV4dEluZGVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IFsxLCBpbmRlbnQubGVuZ3RoLCAxLCBpbmRlbnQubGVuZ3RoXVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcXG5cIiArIGluZGVudFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG59O1xuXG5vb3AuaW5oZXJpdHMoWG1sQmVoYXZpb3VyLCBCZWhhdmlvdXIpO1xuXG5leHBvcnRzLlhtbEJlaGF2aW91ciA9IFhtbEJlaGF2aW91cjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24odm9pZEVsZW1lbnRzLCBvcHRpb25hbEVuZFRhZ3MpIHtcbiAgICBCYXNlRm9sZE1vZGUuY2FsbCh0aGlzKTtcbiAgICB0aGlzLnZvaWRFbGVtZW50cyA9IHZvaWRFbGVtZW50cyB8fCB7fTtcbiAgICB0aGlzLm9wdGlvbmFsRW5kVGFncyA9IG9vcC5taXhpbih7fSwgdGhpcy52b2lkRWxlbWVudHMpO1xuICAgIGlmIChvcHRpb25hbEVuZFRhZ3MpXG4gICAgICAgIG9vcC5taXhpbih0aGlzLm9wdGlvbmFsRW5kVGFncywgb3B0aW9uYWxFbmRUYWdzKTtcbiAgICBcbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbnZhciBUYWcgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnRhZ05hbWUgPSBcIlwiO1xuICAgIHRoaXMuY2xvc2luZyA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZkNsb3NpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnN0YXJ0ID0ge3JvdzogMCwgY29sdW1uOiAwfTtcbiAgICB0aGlzLmVuZCA9IHtyb3c6IDAsIGNvbHVtbjogMH07XG59O1xuXG5mdW5jdGlvbiBpcyh0b2tlbiwgdHlwZSkge1xuICAgIHJldHVybiB0b2tlbi50eXBlLmxhc3RJbmRleE9mKHR5cGUgKyBcIi54bWxcIikgPiAtMTtcbn1cblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIHRhZyA9IHRoaXMuX2dldEZpcnN0VGFnSW5MaW5lKHNlc3Npb24sIHJvdyk7XG5cbiAgICAgICAgaWYgKCF0YWcpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRDb21tZW50Rm9sZFdpZGdldChzZXNzaW9uLCByb3cpO1xuXG4gICAgICAgIGlmICh0YWcuY2xvc2luZyB8fCAoIXRhZy50YWdOYW1lICYmIHRhZy5zZWxmQ2xvc2luZykpXG4gICAgICAgICAgICByZXR1cm4gZm9sZFN0eWxlID09PSBcIm1hcmtiZWdpbmVuZFwiID8gXCJlbmRcIiA6IFwiXCI7XG5cbiAgICAgICAgaWYgKCF0YWcudGFnTmFtZSB8fCB0YWcuc2VsZkNsb3NpbmcgfHwgdGhpcy52b2lkRWxlbWVudHMuaGFzT3duUHJvcGVydHkodGFnLnRhZ05hbWUudG9Mb3dlckNhc2UoKSkpXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcblxuICAgICAgICBpZiAodGhpcy5fZmluZEVuZFRhZ0luTGluZShzZXNzaW9uLCByb3csIHRhZy50YWdOYW1lLCB0YWcuZW5kLmNvbHVtbikpXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcblxuICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgIH07XG4gICAgXG4gICAgdGhpcy5nZXRDb21tZW50Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICBpZiAoL2NvbW1lbnQvLnRlc3Qoc2Vzc2lvbi5nZXRTdGF0ZShyb3cpKSAmJiAvPCEtLy50ZXN0KHNlc3Npb24uZ2V0TGluZShyb3cpKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgIH07XG5cbiAgICAvKlxuICAgICAqIHJldHVybnMgYSBmaXJzdCB0YWcgKG9yIGEgZnJhZ21lbnQpIGluIGEgbGluZVxuICAgICAqL1xuICAgIHRoaXMuX2dldEZpcnN0VGFnSW5MaW5lID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciB0b2tlbnMgPSBzZXNzaW9uLmdldFRva2Vucyhyb3cpO1xuICAgICAgICB2YXIgdGFnID0gbmV3IFRhZygpO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICBpZiAoaXModG9rZW4sIFwidGFnLW9wZW5cIikpIHtcbiAgICAgICAgICAgICAgICB0YWcuZW5kLmNvbHVtbiA9IHRhZy5zdGFydC5jb2x1bW4gKyB0b2tlbi52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdGFnLmNsb3NpbmcgPSBpcyh0b2tlbiwgXCJlbmQtdGFnLW9wZW5cIik7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbKytpXTtcbiAgICAgICAgICAgICAgICBpZiAoIXRva2VuKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICB0YWcudGFnTmFtZSA9IHRva2VuLnZhbHVlO1xuICAgICAgICAgICAgICAgIGlmICh0b2tlbi52YWx1ZSA9PT0gXCJcIikgeyAvL3NraXAgZW1wdHkgdGFnIG5hbWUgdG9rZW4gZm9yIGZyYWdtZW50XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gdG9rZW5zWysraV07XG4gICAgICAgICAgICAgICAgICAgIGlmICghdG9rZW4pIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgICB0YWcudGFnTmFtZSA9IHRva2VuLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0YWcuZW5kLmNvbHVtbiArPSB0b2tlbi52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yIChpKys7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICAgICAgICAgIHRhZy5lbmQuY29sdW1uICs9IHRva2VuLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzKHRva2VuLCBcInRhZy1jbG9zZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFnLnNlbGZDbG9zaW5nID0gdG9rZW4udmFsdWUgPT0gJy8+JztcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiB0YWc7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzKHRva2VuLCBcInRhZy1jbG9zZVwiKSkge1xuICAgICAgICAgICAgICAgIHRhZy5zZWxmQ2xvc2luZyA9IHRva2VuLnZhbHVlID09ICcvPic7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhZztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRhZy5zdGFydC5jb2x1bW4gKz0gdG9rZW4udmFsdWUubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcblxuICAgIHRoaXMuX2ZpbmRFbmRUYWdJbkxpbmUgPSBmdW5jdGlvbihzZXNzaW9uLCByb3csIHRhZ05hbWUsIHN0YXJ0Q29sdW1uKSB7XG4gICAgICAgIHZhciB0b2tlbnMgPSBzZXNzaW9uLmdldFRva2Vucyhyb3cpO1xuICAgICAgICB2YXIgY29sdW1uID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgIGNvbHVtbiArPSB0b2tlbi52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoY29sdW1uIDwgc3RhcnRDb2x1bW4gLSAxKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKGlzKHRva2VuLCBcImVuZC10YWctb3BlblwiKSkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gdG9rZW5zW2kgKyAxXTtcbiAgICAgICAgICAgICAgICBpZiAoaXModG9rZW4sIFwidGFnLW5hbWVcIikgJiYgdG9rZW4udmFsdWUgPT09IFwiXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbaSArIDJdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4udmFsdWUgPT0gdGFnTmFtZSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBmaXJzdFRhZyA9IHRoaXMuX2dldEZpcnN0VGFnSW5MaW5lKHNlc3Npb24sIHJvdyk7XG4gICAgICAgIGlmICghZmlyc3RUYWcpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRGb2xkV2lkZ2V0KHNlc3Npb24sIHJvdykgJiYgc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKFxuICAgICAgICAgICAgICAgIHJvdywgc2Vzc2lvbi5nZXRMaW5lKHJvdykubGVuZ3RoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGFncyA9IHNlc3Npb24uZ2V0TWF0Y2hpbmdUYWdzKHtyb3c6IHJvdywgY29sdW1uOiAwfSk7XG4gICAgICAgIGlmICh0YWdzKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKFxuICAgICAgICAgICAgICAgIHRhZ3Mub3BlblRhZy5lbmQucm93LCB0YWdzLm9wZW5UYWcuZW5kLmNvbHVtbiwgdGFncy5jbG9zZVRhZy5zdGFydC5yb3csIHRhZ3MuY2xvc2VUYWcuc3RhcnQuY29sdW1uKTtcbiAgICAgICAgfVxuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBYbWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3htbF9oaWdobGlnaHRfcnVsZXNcIikuWG1sSGlnaGxpZ2h0UnVsZXM7XG52YXIgWG1sQmVoYXZpb3VyID0gcmVxdWlyZShcIi4vYmVoYXZpb3VyL3htbFwiKS5YbWxCZWhhdmlvdXI7XG52YXIgWG1sRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL3htbFwiKS5Gb2xkTW9kZTtcbnZhciBXb3JrZXJDbGllbnQgPSByZXF1aXJlKFwiLi4vd29ya2VyL3dvcmtlcl9jbGllbnRcIikuV29ya2VyQ2xpZW50O1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFhtbEhpZ2hsaWdodFJ1bGVzO1xuICAgdGhpcy4kYmVoYXZpb3VyID0gbmV3IFhtbEJlaGF2aW91cigpO1xuICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgWG1sRm9sZE1vZGUoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMudm9pZEVsZW1lbnRzID0gbGFuZy5hcnJheVRvTWFwKFtdKTtcblxuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIjwhLS1cIiwgZW5kOiBcIi0tPlwifTtcblxuICAgIHRoaXMuY3JlYXRlV29ya2VyID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgICAgICB2YXIgd29ya2VyID0gbmV3IFdvcmtlckNsaWVudChbXCJhY2VcIl0sIFwiYWNlL21vZGUveG1sX3dvcmtlclwiLCBcIldvcmtlclwiKTtcbiAgICAgICAgd29ya2VyLmF0dGFjaFRvRG9jdW1lbnQoc2Vzc2lvbi5nZXREb2N1bWVudCgpKTtcblxuICAgICAgICB3b3JrZXIub24oXCJlcnJvclwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZXNzaW9uLnNldEFubm90YXRpb25zKGUuZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtlci5vbihcInRlcm1pbmF0ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlc3Npb24uY2xlYXJBbm5vdGF0aW9ucygpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gd29ya2VyO1xuICAgIH07XG4gICAgXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3htbFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIFhtbEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24obm9ybWFsaXplKSB7XG4gICAgLy8gaHR0cDovL3d3dy53My5vcmcvVFIvUkVDLXhtbC8jTlQtTmFtZUNoYXJcbiAgICAvLyBOYW1lU3RhcnRDaGFyXHQgICA6Oj0gICBcdFwiOlwiIHwgW0EtWl0gfCBcIl9cIiB8IFthLXpdIHwgWyN4QzAtI3hENl0gfCBbI3hEOC0jeEY2XSB8IFsjeEY4LSN4MkZGXSB8IFsjeDM3MC0jeDM3RF0gfCBbI3gzN0YtI3gxRkZGXSB8IFsjeDIwMEMtI3gyMDBEXSB8IFsjeDIwNzAtI3gyMThGXSB8IFsjeDJDMDAtI3gyRkVGXSB8IFsjeDMwMDEtI3hEN0ZGXSB8IFsjeEY5MDAtI3hGRENGXSB8IFsjeEZERjAtI3hGRkZEXSB8IFsjeDEwMDAwLSN4RUZGRkZdXG4gICAgLy8gTmFtZUNoYXJcdCAgIDo6PSAgIFx0TmFtZVN0YXJ0Q2hhciB8IFwiLVwiIHwgXCIuXCIgfCBbMC05XSB8ICN4QjcgfCBbI3gwMzAwLSN4MDM2Rl0gfCBbI3gyMDNGLSN4MjA0MF1cbiAgICB2YXIgdGFnUmVnZXggPSBcIltfOmEtekEtWlxceGMwLVxcdWZmZmZdWy1fOi5hLXpBLVowLTlcXHhjMC1cXHVmZmZmXSpcIjtcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBzdGFydCA6IFtcbiAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLmNkYXRhLnhtbFwiLCByZWdleCA6IFwiPFxcXFwhXFxcXFtDREFUQVxcXFxbXCIsIG5leHQgOiBcImNkYXRhXCJ9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wicHVuY3R1YXRpb24uaW5zdHJ1Y3Rpb24ueG1sXCIsIFwia2V5d29yZC5pbnN0cnVjdGlvbi54bWxcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIig8XFxcXD8pKFwiICsgdGFnUmVnZXggKyBcIilcIiwgbmV4dCA6IFwicHJvY2Vzc2luZ19pbnN0cnVjdGlvblwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJjb21tZW50LnN0YXJ0LnhtbFwiLCByZWdleCA6IFwiPFxcXFwhLS1cIiwgbmV4dCA6IFwiY29tbWVudFwifSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcInhtbC1wZS5kb2N0eXBlLnhtbFwiLCBcInhtbC1wZS5kb2N0eXBlLnhtbFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKDxcXFxcISkoRE9DVFlQRSkoPz1bXFxcXHNdKVwiLCBuZXh0IDogXCJkb2N0eXBlXCIsIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtpbmNsdWRlIDogXCJ0YWdcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInRleHQuZW5kLXRhZy1vcGVuLnhtbFwiLCByZWdleDogXCI8L1wifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwidGV4dC50YWctb3Blbi54bWxcIiwgcmVnZXg6IFwiPFwifSxcbiAgICAgICAgICAgIHtpbmNsdWRlIDogXCJyZWZlcmVuY2VcIn0sXG4gICAgICAgICAgICB7ZGVmYXVsdFRva2VuIDogXCJ0ZXh0LnhtbFwifVxuICAgICAgICBdLFxuXG4gICAgICAgIHByb2Nlc3NpbmdfaW5zdHJ1Y3Rpb24gOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImVudGl0eS5vdGhlci5hdHRyaWJ1dGUtbmFtZS5kZWNsLWF0dHJpYnV0ZS1uYW1lLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiB0YWdSZWdleFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvci5kZWNsLWF0dHJpYnV0ZS1lcXVhbHMueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiPVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwid2hpdGVzcGFjZVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwic3RyaW5nXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLnhtbC1kZWNsLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFw/PlwiLFxuICAgICAgICAgICAgbmV4dCA6IFwic3RhcnRcIlxuICAgICAgICB9XSxcblxuICAgICAgICBkb2N0eXBlIDogW1xuICAgICAgICAgICAge2luY2x1ZGUgOiBcIndoaXRlc3BhY2VcIn0sXG4gICAgICAgICAgICB7aW5jbHVkZSA6IFwic3RyaW5nXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ4bWwtcGUuZG9jdHlwZS54bWxcIiwgcmVnZXggOiBcIj5cIiwgbmV4dCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInhtbC1wZS54bWxcIiwgcmVnZXggOiBcIlstX2EtekEtWjAtOTpdK1wifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwicHVuY3R1YXRpb24uaW50LXN1YnNldFwiLCByZWdleCA6IFwiXFxcXFtcIiwgcHVzaCA6IFwiaW50X3N1YnNldFwifVxuICAgICAgICBdLFxuXG4gICAgICAgIGludF9zdWJzZXQgOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInRleHQueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uaW50LXN1YnNldC54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIl1cIixcbiAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJwdW5jdHVhdGlvbi5tYXJrdXAtZGVjbC54bWxcIiwgXCJrZXl3b3JkLm1hcmt1cC1kZWNsLnhtbFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPFxcXFwhKShcIiArIHRhZ1JlZ2V4ICsgXCIpXCIsXG4gICAgICAgICAgICBwdXNoIDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ubWFya3VwLWRlY2wueG1sXCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIj5cIixcbiAgICAgICAgICAgICAgICBuZXh0IDogXCJwb3BcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtpbmNsdWRlIDogXCJzdHJpbmdcIn1dXG4gICAgICAgIH1dLFxuXG4gICAgICAgIGNkYXRhIDogW1xuICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmcuY2RhdGEueG1sXCIsIHJlZ2V4IDogXCJcXFxcXVxcXFxdPlwiLCBuZXh0IDogXCJzdGFydFwifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwidGV4dC54bWxcIiwgcmVnZXggOiBcIlxcXFxzK1wifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwidGV4dC54bWxcIiwgcmVnZXggOiBcIig/OlteXFxcXF1dfFxcXFxdKD8hXFxcXF0+KSkrXCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgY29tbWVudCA6IFtcbiAgICAgICAgICAgIHt0b2tlbiA6IFwiY29tbWVudC5lbmQueG1sXCIsIHJlZ2V4IDogXCItLT5cIiwgbmV4dCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICB7ZGVmYXVsdFRva2VuIDogXCJjb21tZW50LnhtbFwifVxuICAgICAgICBdLFxuXG4gICAgICAgIHJlZmVyZW5jZSA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlLnJlZmVyZW5jZS54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPzomI1swLTldKzspfCg/OiYjeFswLTlhLWZBLUZdKzspfCg/OiZbYS16QS1aMC05XzpcXFxcLi1dKzspXCJcbiAgICAgICAgfV0sXG5cbiAgICAgICAgYXR0cl9yZWZlcmVuY2UgOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZS5yZWZlcmVuY2UuYXR0cmlidXRlLXZhbHVlLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIig/OiYjWzAtOV0rOyl8KD86JiN4WzAtOWEtZkEtRl0rOyl8KD86JlthLXpBLVowLTlfOlxcXFwuLV0rOylcIlxuICAgICAgICB9XSxcblxuICAgICAgICB0YWcgOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctb3Blbi54bWxcIiwgXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi5lbmQtdGFnLW9wZW4ueG1sXCIsIFwibWV0YS50YWcudGFnLW5hbWUueG1sXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIig/Oig8KXwoPC8pKSgoPzpcIiArIHRhZ1JlZ2V4ICsgXCI6KT9cIiArIHRhZ1JlZ2V4ICsgXCIpXCIsXG4gICAgICAgICAgICBuZXh0OiBbXG4gICAgICAgICAgICAgICAge2luY2x1ZGUgOiBcImF0dHJpYnV0ZXNcIn0sXG4gICAgICAgICAgICAgICAge3Rva2VuIDogXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctY2xvc2UueG1sXCIsIHJlZ2V4IDogXCIvPz5cIiwgbmV4dCA6IFwic3RhcnRcIn1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfV0sXG5cbiAgICAgICAgdGFnX3doaXRlc3BhY2UgOiBbXG4gICAgICAgICAgICB7dG9rZW4gOiBcInRleHQudGFnLXdoaXRlc3BhY2UueG1sXCIsIHJlZ2V4IDogXCJcXFxccytcIn1cbiAgICAgICAgXSxcbiAgICAgICAgLy8gZm9yIGRvY3R5cGUgYW5kIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb25zXG4gICAgICAgIHdoaXRlc3BhY2UgOiBbXG4gICAgICAgICAgICB7dG9rZW4gOiBcInRleHQud2hpdGVzcGFjZS54bWxcIiwgcmVnZXggOiBcIlxcXFxzK1wifVxuICAgICAgICBdLFxuXG4gICAgICAgIC8vIGZvciBkb2N0eXBlIGFuZCBwcm9jZXNzaW5nIGluc3RydWN0aW9uc1xuICAgICAgICBzdHJpbmc6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIidcIixcbiAgICAgICAgICAgIHB1c2ggOiBbXG4gICAgICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmcueG1sXCIsIHJlZ2V4OiBcIidcIiwgbmV4dDogXCJwb3BcIn0sXG4gICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwic3RyaW5nLnhtbFwifVxuICAgICAgICAgICAgXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgcHVzaCA6IFtcbiAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy54bWxcIiwgcmVnZXg6ICdcIicsIG5leHQ6IFwicG9wXCJ9LFxuICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcInN0cmluZy54bWxcIn1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfV0sXG5cbiAgICAgICAgYXR0cmlidXRlczogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJlbnRpdHkub3RoZXIuYXR0cmlidXRlLW5hbWUueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IHRhZ1JlZ2V4XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yLmF0dHJpYnV0ZS1lcXVhbHMueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiPVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwidGFnX3doaXRlc3BhY2VcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcImF0dHJpYnV0ZV92YWx1ZVwiXG4gICAgICAgIH1dLFxuXG4gICAgICAgIGF0dHJpYnV0ZV92YWx1ZTogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIidcIixcbiAgICAgICAgICAgIHB1c2ggOiBbXG4gICAgICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwiLCByZWdleDogXCInXCIsIG5leHQ6IFwicG9wXCJ9LFxuICAgICAgICAgICAgICAgIHtpbmNsdWRlIDogXCJhdHRyX3JlZmVyZW5jZVwifSxcbiAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuIDogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwifVxuICAgICAgICAgICAgXVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogJ1wiJyxcbiAgICAgICAgICAgIHB1c2ggOiBbXG4gICAgICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwiLCByZWdleDogJ1wiJywgbmV4dDogXCJwb3BcIn0sXG4gICAgICAgICAgICAgICAge2luY2x1ZGUgOiBcImF0dHJfcmVmZXJlbmNlXCJ9LFxuICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1dXG4gICAgfTtcblxuICAgIGlmICh0aGlzLmNvbnN0cnVjdG9yID09PSBYbWxIaWdobGlnaHRSdWxlcylcbiAgICAgICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmVtYmVkVGFnUnVsZXMgPSBmdW5jdGlvbihIaWdobGlnaHRSdWxlcywgcHJlZml4LCB0YWcpe1xuICAgICAgICB0aGlzLiRydWxlcy50YWcudW5zaGlmdCh7XG4gICAgICAgICAgICB0b2tlbiA6IFtcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1vcGVuLnhtbFwiLCBcIm1ldGEudGFnLlwiICsgdGFnICsgXCIudGFnLW5hbWUueG1sXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIig8KShcIiArIHRhZyArIFwiKD89XFxcXHN8PnwkKSlcIixcbiAgICAgICAgICAgIG5leHQ6IFtcbiAgICAgICAgICAgICAgICB7aW5jbHVkZSA6IFwiYXR0cmlidXRlc1wifSxcbiAgICAgICAgICAgICAgICB7dG9rZW4gOiBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1jbG9zZS54bWxcIiwgcmVnZXggOiBcIi8/PlwiLCBuZXh0IDogcHJlZml4ICsgXCJzdGFydFwifVxuICAgICAgICAgICAgXVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRydWxlc1t0YWcgKyBcIi1lbmRcIl0gPSBbXG4gICAgICAgICAgICB7aW5jbHVkZSA6IFwiYXR0cmlidXRlc1wifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLWNsb3NlLnhtbFwiLCByZWdleCA6IFwiLz8+XCIsICBuZXh0OiBcInN0YXJ0XCIsXG4gICAgICAgICAgICAgICAgb25NYXRjaCA6IGZ1bmN0aW9uKHZhbHVlLCBjdXJyZW50U3RhdGUsIHN0YWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrLnNwbGljZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9rZW47XG4gICAgICAgICAgICB9fVxuICAgICAgICBdO1xuXG4gICAgICAgIHRoaXMuZW1iZWRSdWxlcyhIaWdobGlnaHRSdWxlcywgcHJlZml4LCBbe1xuICAgICAgICAgICAgdG9rZW46IFtcIm1ldGEudGFnLnB1bmN0dWF0aW9uLmVuZC10YWctb3Blbi54bWxcIiwgXCJtZXRhLnRhZy5cIiArIHRhZyArIFwiLnRhZy1uYW1lLnhtbFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPC8pKFwiICsgdGFnICsgXCIoPz1cXFxcc3w+fCQpKVwiLFxuICAgICAgICAgICAgbmV4dDogdGFnICsgXCItZW5kXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmNkYXRhLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIjxcXFxcIVxcXFxbQ0RBVEFcXFxcW1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5jZGF0YS54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcXVxcXFxdPlwiXG4gICAgICAgIH1dKTtcbiAgICB9O1xuXG59KS5jYWxsKFRleHRIaWdobGlnaHRSdWxlcy5wcm90b3R5cGUpO1xuXG5vb3AuaW5oZXJpdHMoWG1sSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuWG1sSGlnaGxpZ2h0UnVsZXMgPSBYbWxIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==