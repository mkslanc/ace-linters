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

/**@type {(new() => Partial<import("../../../ace-internal").Ace.Behaviour>)}*/
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
    return token && token.type && token.type.lastIndexOf(type + ".xml") > -1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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YnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2JlaGF2aW91ci94bWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL3htbC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3htbC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3htbF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi4vYmVoYXZpb3VyXCIpLkJlaGF2aW91cjtcbnZhciBUb2tlbkl0ZXJhdG9yID0gcmVxdWlyZShcIi4uLy4uL3Rva2VuX2l0ZXJhdG9yXCIpLlRva2VuSXRlcmF0b3I7XG5cbmZ1bmN0aW9uIGlzKHRva2VuLCB0eXBlKSB7XG4gICAgcmV0dXJuIHRva2VuICYmIHRva2VuLnR5cGUubGFzdEluZGV4T2YodHlwZSArIFwiLnhtbFwiKSA+IC0xO1xufVxuXG4vKipAdHlwZSB7KG5ldygpID0+IFBhcnRpYWw8aW1wb3J0KFwiLi4vLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5CZWhhdmlvdXI+KX0qL1xudmFyIFhtbEJlaGF2aW91ciA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuYWRkKFwic3RyaW5nX2RxdW90ZXNcIiwgXCJpbnNlcnRpb25cIiwgZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24sIGVkaXRvciwgc2Vzc2lvbiwgdGV4dCkge1xuICAgICAgICBpZiAodGV4dCA9PSAnXCInIHx8IHRleHQgPT0gXCInXCIpIHtcbiAgICAgICAgICAgIHZhciBxdW90ZSA9IHRleHQ7XG4gICAgICAgICAgICB2YXIgc2VsZWN0ZWQgPSBzZXNzaW9uLmRvYy5nZXRUZXh0UmFuZ2UoZWRpdG9yLmdldFNlbGVjdGlvblJhbmdlKCkpO1xuICAgICAgICAgICAgaWYgKHNlbGVjdGVkICE9PSBcIlwiICYmIHNlbGVjdGVkICE9PSBcIidcIiAmJiBzZWxlY3RlZCAhPSAnXCInICYmIGVkaXRvci5nZXRXcmFwQmVoYXZpb3Vyc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHF1b3RlICsgc2VsZWN0ZWQgKyBxdW90ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBmYWxzZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5kb2MuZ2V0TGluZShjdXJzb3Iucm93KTtcbiAgICAgICAgICAgIHZhciByaWdodENoYXIgPSBsaW5lLnN1YnN0cmluZyhjdXJzb3IuY29sdW1uLCBjdXJzb3IuY29sdW1uICsgMSk7XG4gICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCBjdXJzb3Iucm93LCBjdXJzb3IuY29sdW1uKTtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlbigpO1xuXG4gICAgICAgICAgICBpZiAocmlnaHRDaGFyID09IHF1b3RlICYmIChpcyh0b2tlbiwgXCJhdHRyaWJ1dGUtdmFsdWVcIikgfHwgaXModG9rZW4sIFwic3RyaW5nXCIpKSkge1xuICAgICAgICAgICAgICAgIC8vIElnbm9yZSBpbnB1dCBhbmQgbW92ZSByaWdodCBvbmUgaWYgd2UncmUgdHlwaW5nIG92ZXIgdGhlIGNsb3NpbmcgcXVvdGUuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcIixcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbMSwgMV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRva2VuKVxuICAgICAgICAgICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCk7XG5cbiAgICAgICAgICAgIGlmICghdG9rZW4pXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICB3aGlsZSAoaXModG9rZW4sIFwidGFnLXdoaXRlc3BhY2VcIikgfHwgaXModG9rZW4sIFwid2hpdGVzcGFjZVwiKSkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgcmlnaHRTcGFjZSA9ICFyaWdodENoYXIgfHwgcmlnaHRDaGFyLm1hdGNoKC9cXHMvKTtcbiAgICAgICAgICAgIGlmIChpcyh0b2tlbiwgXCJhdHRyaWJ1dGUtZXF1YWxzXCIpICYmIChyaWdodFNwYWNlIHx8IHJpZ2h0Q2hhciA9PSAnPicpIHx8IChpcyh0b2tlbiwgXCJkZWNsLWF0dHJpYnV0ZS1lcXVhbHNcIikgJiYgKHJpZ2h0U3BhY2UgfHwgcmlnaHRDaGFyID09ICc/JykpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogcXVvdGUgKyBxdW90ZSxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbMSwgMV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZChcInN0cmluZ19kcXVvdGVzXCIsIFwiZGVsZXRpb25cIiwgZnVuY3Rpb24oc3RhdGUsIGFjdGlvbiwgZWRpdG9yLCBzZXNzaW9uLCByYW5nZSkge1xuICAgICAgICB2YXIgc2VsZWN0ZWQgPSBzZXNzaW9uLmRvYy5nZXRUZXh0UmFuZ2UocmFuZ2UpO1xuICAgICAgICBpZiAoIXJhbmdlLmlzTXVsdGlMaW5lKCkgJiYgKHNlbGVjdGVkID09ICdcIicgfHwgc2VsZWN0ZWQgPT0gXCInXCIpKSB7XG4gICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZG9jLmdldExpbmUocmFuZ2Uuc3RhcnQucm93KTtcbiAgICAgICAgICAgIHZhciByaWdodENoYXIgPSBsaW5lLnN1YnN0cmluZyhyYW5nZS5zdGFydC5jb2x1bW4gKyAxLCByYW5nZS5zdGFydC5jb2x1bW4gKyAyKTtcbiAgICAgICAgICAgIGlmIChyaWdodENoYXIgPT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICByYW5nZS5lbmQuY29sdW1uKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZChcImF1dG9jbG9zaW5nXCIsIFwiaW5zZXJ0aW9uXCIsIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uLCBlZGl0b3IsIHNlc3Npb24sIHRleHQpIHtcbiAgICAgICAgaWYgKHRleHQgPT0gJz4nKSB7XG4gICAgICAgICAgICB2YXIgcG9zaXRpb24gPSBlZGl0b3IuZ2V0U2VsZWN0aW9uUmFuZ2UoKS5zdGFydDtcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IG5ldyBUb2tlbkl0ZXJhdG9yKHNlc3Npb24sIHBvc2l0aW9uLnJvdywgcG9zaXRpb24uY29sdW1uKTtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlbigpIHx8IGl0ZXJhdG9yLnN0ZXBCYWNrd2FyZCgpO1xuXG4gICAgICAgICAgICAvLyBleGl0IGlmIHdlJ3JlIG5vdCBpbiBhIHRhZ1xuICAgICAgICAgICAgaWYgKCF0b2tlbiB8fCAhKGlzKHRva2VuLCBcInRhZy1uYW1lXCIpIHx8IGlzKHRva2VuLCBcInRhZy13aGl0ZXNwYWNlXCIpIHx8IGlzKHRva2VuLCBcImF0dHJpYnV0ZS1uYW1lXCIpIHx8IGlzKHRva2VuLCBcImF0dHJpYnV0ZS1lcXVhbHNcIikgfHwgaXModG9rZW4sIFwiYXR0cmlidXRlLXZhbHVlXCIpKSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIC8vIGV4aXQgaWYgd2UncmUgaW5zaWRlIG9mIGEgcXVvdGVkIGF0dHJpYnV0ZSB2YWx1ZVxuICAgICAgICAgICAgaWYgKGlzKHRva2VuLCBcInJlZmVyZW5jZS5hdHRyaWJ1dGUtdmFsdWVcIikpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgaWYgKGlzKHRva2VuLCBcImF0dHJpYnV0ZS12YWx1ZVwiKSkge1xuICAgICAgICAgICAgICAgIHZhciB0b2tlbkVuZENvbHVtbiA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlbkNvbHVtbigpICsgdG9rZW4udmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5jb2x1bW4gPCB0b2tlbkVuZENvbHVtbilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChwb3NpdGlvbi5jb2x1bW4gPT0gdG9rZW5FbmRDb2x1bW4pIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRUb2tlbiA9IGl0ZXJhdG9yLnN0ZXBGb3J3YXJkKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRPRE8gYWxzbyBoYW5kbGUgbm9uLWNsb3NlZCBzdHJpbmcgYXQgdGhlIGVuZCBvZiB0aGUgbGluZVxuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFRva2VuICYmIGlzKG5leHRUb2tlbiwgXCJhdHRyaWJ1dGUtdmFsdWVcIikpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGl0ZXJhdG9yLnN0ZXBCYWNrd2FyZCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKC9eXFxzKj4vLnRlc3Qoc2Vzc2lvbi5nZXRMaW5lKHBvc2l0aW9uLnJvdykuc2xpY2UocG9zaXRpb24uY29sdW1uKSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBmaW5kIHRhZyBuYW1lXG4gICAgICAgICAgICB3aGlsZSAoIWlzKHRva2VuLCBcInRhZy1uYW1lXCIpKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBpdGVyYXRvci5zdGVwQmFja3dhcmQoKTtcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gXCI8XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSBpdGVyYXRvci5zdGVwRm9yd2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciB0b2tlblJvdyA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlblJvdygpO1xuICAgICAgICAgICAgdmFyIHRva2VuQ29sdW1uID0gaXRlcmF0b3IuZ2V0Q3VycmVudFRva2VuQ29sdW1uKCk7XG5cbiAgICAgICAgICAgIC8vIGV4aXQgaWYgdGhlIHRhZyBpcyBlbmRpbmdcbiAgICAgICAgICAgIGlmIChpcyhpdGVyYXRvci5zdGVwQmFja3dhcmQoKSwgXCJlbmQtdGFnLW9wZW5cIikpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IHRva2VuLnZhbHVlO1xuICAgICAgICAgICAgaWYgKHRva2VuUm93ID09IHBvc2l0aW9uLnJvdylcbiAgICAgICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5zdWJzdHJpbmcoMCwgcG9zaXRpb24uY29sdW1uIC0gdG9rZW5Db2x1bW4pO1xuXG4gICAgICAgICAgICBpZiAodGhpcy52b2lkRWxlbWVudHMgJiYgdGhpcy52b2lkRWxlbWVudHMuaGFzT3duUHJvcGVydHkoZWxlbWVudC50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgdGV4dDogXCI+XCIgKyBcIjwvXCIgKyBlbGVtZW50ICsgXCI+XCIsXG4gICAgICAgICAgICAgICBzZWxlY3Rpb246IFsxLCAxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGQoXCJhdXRvaW5kZW50XCIsIFwiaW5zZXJ0aW9uXCIsIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uLCBlZGl0b3IsIHNlc3Npb24sIHRleHQpIHtcbiAgICAgICAgaWYgKHRleHQgPT0gXCJcXG5cIikge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUoY3Vyc29yLnJvdyk7XG4gICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCBjdXJzb3Iucm93LCBjdXJzb3IuY29sdW1uKTtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlbigpO1xuXG4gICAgICAgICAgICBpZiAoaXModG9rZW4sIFwiXCIpICYmIHRva2VuLnR5cGUuaW5kZXhPZihcInRhZy1jbG9zZVwiKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT0gXCIvPlwiKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgLy9nZXQgdGFnIG5hbWVcbiAgICAgICAgICAgICAgICB3aGlsZSAodG9rZW4gJiYgdG9rZW4udHlwZS5pbmRleE9mKFwidGFnLW5hbWVcIikgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCF0b2tlbikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIHRhZyA9IHRva2VuLnZhbHVlO1xuICAgICAgICAgICAgICAgIHZhciByb3cgPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW5Sb3coKTtcblxuICAgICAgICAgICAgICAgIC8vZG9uJ3QgaW5kZW50IGFmdGVyIGNsb3NpbmcgdGFnXG4gICAgICAgICAgICAgICAgdG9rZW4gPSBpdGVyYXRvci5zdGVwQmFja3dhcmQoKTtcbiAgICAgICAgICAgICAgICBpZiAoIXRva2VuIHx8IHRva2VuLnR5cGUuaW5kZXhPZihcImVuZC10YWdcIikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy52b2lkRWxlbWVudHMgJiYgIXRoaXMudm9pZEVsZW1lbnRzW3RhZ10gfHwgIXRoaXMudm9pZEVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0VG9rZW4gPSBzZXNzaW9uLmdldFRva2VuQXQoY3Vyc29yLnJvdywgY3Vyc29yLmNvbHVtbisxKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5leHRJbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRlbnQgPSBuZXh0SW5kZW50ICsgc2Vzc2lvbi5nZXRUYWJTdHJpbmcoKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobmV4dFRva2VuICYmIG5leHRUb2tlbi52YWx1ZSA9PT0gXCI8L1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXFxuXCIgKyBpbmRlbnQgKyBcIlxcblwiICsgbmV4dEluZGVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IFsxLCBpbmRlbnQubGVuZ3RoLCAxLCBpbmRlbnQubGVuZ3RoXVxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogXCJcXG5cIiArIGluZGVudFxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG59O1xuXG5vb3AuaW5oZXJpdHMoWG1sQmVoYXZpb3VyLCBCZWhhdmlvdXIpO1xuXG5leHBvcnRzLlhtbEJlaGF2aW91ciA9IFhtbEJlaGF2aW91cjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24odm9pZEVsZW1lbnRzLCBvcHRpb25hbEVuZFRhZ3MpIHtcbiAgICBCYXNlRm9sZE1vZGUuY2FsbCh0aGlzKTtcbiAgICB0aGlzLnZvaWRFbGVtZW50cyA9IHZvaWRFbGVtZW50cyB8fCB7fTtcbiAgICB0aGlzLm9wdGlvbmFsRW5kVGFncyA9IG9vcC5taXhpbih7fSwgdGhpcy52b2lkRWxlbWVudHMpO1xuICAgIGlmIChvcHRpb25hbEVuZFRhZ3MpXG4gICAgICAgIG9vcC5taXhpbih0aGlzLm9wdGlvbmFsRW5kVGFncywgb3B0aW9uYWxFbmRUYWdzKTtcbiAgICBcbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbnZhciBUYWcgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnRhZ05hbWUgPSBcIlwiO1xuICAgIHRoaXMuY2xvc2luZyA9IGZhbHNlO1xuICAgIHRoaXMuc2VsZkNsb3NpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnN0YXJ0ID0ge3JvdzogMCwgY29sdW1uOiAwfTtcbiAgICB0aGlzLmVuZCA9IHtyb3c6IDAsIGNvbHVtbjogMH07XG59O1xuXG5mdW5jdGlvbiBpcyh0b2tlbiwgdHlwZSkge1xuICAgIHJldHVybiB0b2tlbiAmJiB0b2tlbi50eXBlICYmIHRva2VuLnR5cGUubGFzdEluZGV4T2YodHlwZSArIFwiLnhtbFwiKSA+IC0xO1xufVxuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgdGFnID0gdGhpcy5fZ2V0Rmlyc3RUYWdJbkxpbmUoc2Vzc2lvbiwgcm93KTtcblxuICAgICAgICBpZiAoIXRhZylcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRGb2xkV2lkZ2V0KHNlc3Npb24sIHJvdyk7XG5cbiAgICAgICAgaWYgKHRhZy5jbG9zaW5nIHx8ICghdGFnLnRhZ05hbWUgJiYgdGFnLnNlbGZDbG9zaW5nKSlcbiAgICAgICAgICAgIHJldHVybiBmb2xkU3R5bGUgPT09IFwibWFya2JlZ2luZW5kXCIgPyBcImVuZFwiIDogXCJcIjtcblxuICAgICAgICBpZiAoIXRhZy50YWdOYW1lIHx8IHRhZy5zZWxmQ2xvc2luZyB8fCB0aGlzLnZvaWRFbGVtZW50cy5oYXNPd25Qcm9wZXJ0eSh0YWcudGFnTmFtZS50b0xvd2VyQ2FzZSgpKSlcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuXG4gICAgICAgIGlmICh0aGlzLl9maW5kRW5kVGFnSW5MaW5lKHNlc3Npb24sIHJvdywgdGFnLnRhZ05hbWUsIHRhZy5lbmQuY29sdW1uKSlcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuXG4gICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldENvbW1lbnRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIGlmICgvY29tbWVudC8udGVzdChzZXNzaW9uLmdldFN0YXRlKHJvdykpICYmIC88IS0vLnRlc3Qoc2Vzc2lvbi5nZXRMaW5lKHJvdykpKVxuICAgICAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgfTtcblxuICAgIC8qXG4gICAgICogcmV0dXJucyBhIGZpcnN0IHRhZyAob3IgYSBmcmFnbWVudCkgaW4gYSBsaW5lXG4gICAgICovXG4gICAgdGhpcy5fZ2V0Rmlyc3RUYWdJbkxpbmUgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgdmFyIHRva2VucyA9IHNlc3Npb24uZ2V0VG9rZW5zKHJvdyk7XG4gICAgICAgIHZhciB0YWcgPSBuZXcgVGFnKCk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgIGlmIChpcyh0b2tlbiwgXCJ0YWctb3BlblwiKSkge1xuICAgICAgICAgICAgICAgIHRhZy5lbmQuY29sdW1uID0gdGFnLnN0YXJ0LmNvbHVtbiArIHRva2VuLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB0YWcuY2xvc2luZyA9IGlzKHRva2VuLCBcImVuZC10YWctb3BlblwiKTtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1srK2ldO1xuICAgICAgICAgICAgICAgIGlmICghdG9rZW4pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIHRhZy50YWdOYW1lID0gdG9rZW4udmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09PSBcIlwiKSB7IC8vc2tpcCBlbXB0eSB0YWcgbmFtZSB0b2tlbiBmb3IgZnJhZ21lbnRcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbKytpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0b2tlbikgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRhZy50YWdOYW1lID0gdG9rZW4udmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRhZy5lbmQuY29sdW1uICs9IHRva2VuLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBmb3IgKGkrKzsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgdGFnLmVuZC5jb2x1bW4gKz0gdG9rZW4udmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXModG9rZW4sIFwidGFnLWNsb3NlXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0YWcuc2VsZkNsb3NpbmcgPSB0b2tlbi52YWx1ZSA9PSAnLz4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRhZztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXModG9rZW4sIFwidGFnLWNsb3NlXCIpKSB7XG4gICAgICAgICAgICAgICAgdGFnLnNlbGZDbG9zaW5nID0gdG9rZW4udmFsdWUgPT0gJy8+JztcbiAgICAgICAgICAgICAgICByZXR1cm4gdGFnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGFnLnN0YXJ0LmNvbHVtbiArPSB0b2tlbi52YWx1ZS5sZW5ndGg7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuXG4gICAgdGhpcy5fZmluZEVuZFRhZ0luTGluZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdywgdGFnTmFtZSwgc3RhcnRDb2x1bW4pIHtcbiAgICAgICAgdmFyIHRva2VucyA9IHNlc3Npb24uZ2V0VG9rZW5zKHJvdyk7XG4gICAgICAgIHZhciBjb2x1bW4gPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICAgICAgY29sdW1uICs9IHRva2VuLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChjb2x1bW4gPCBzdGFydENvbHVtbiAtIDEpXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBpZiAoaXModG9rZW4sIFwiZW5kLXRhZy1vcGVuXCIpKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbaSArIDFdO1xuICAgICAgICAgICAgICAgIGlmIChpcyh0b2tlbiwgXCJ0YWctbmFtZVwiKSAmJiB0b2tlbi52YWx1ZSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1tpICsgMl07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi52YWx1ZSA9PSB0YWdOYW1lKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGZpcnN0VGFnID0gdGhpcy5fZ2V0Rmlyc3RUYWdJbkxpbmUoc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgaWYgKCFmaXJzdFRhZykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudEZvbGRXaWRnZXQoc2Vzc2lvbiwgcm93KSAmJiBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2UoXG4gICAgICAgICAgICAgICAgcm93LCBzZXNzaW9uLmdldExpbmUocm93KS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0YWdzID0gc2Vzc2lvbi5nZXRNYXRjaGluZ1RhZ3Moe3Jvdzogcm93LCBjb2x1bW46IDB9KTtcbiAgICAgICAgaWYgKHRhZ3MpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2UoXG4gICAgICAgICAgICAgICAgdGFncy5vcGVuVGFnLmVuZC5yb3csIHRhZ3Mub3BlblRhZy5lbmQuY29sdW1uLCB0YWdzLmNsb3NlVGFnLnN0YXJ0LnJvdywgdGFncy5jbG9zZVRhZy5zdGFydC5jb2x1bW4pO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFhtbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4veG1sX2hpZ2hsaWdodF9ydWxlc1wiKS5YbWxIaWdobGlnaHRSdWxlcztcbnZhciBYbWxCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi9iZWhhdmlvdXIveG1sXCIpLlhtbEJlaGF2aW91cjtcbnZhciBYbWxGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcveG1sXCIpLkZvbGRNb2RlO1xudmFyIFdvcmtlckNsaWVudCA9IHJlcXVpcmUoXCIuLi93b3JrZXIvd29ya2VyX2NsaWVudFwiKS5Xb3JrZXJDbGllbnQ7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gWG1sSGlnaGxpZ2h0UnVsZXM7XG4gICB0aGlzLiRiZWhhdmlvdXIgPSBuZXcgWG1sQmVoYXZpb3VyKCk7XG4gICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBYbWxGb2xkTW9kZSgpO1xufTtcblxub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy52b2lkRWxlbWVudHMgPSBsYW5nLmFycmF5VG9NYXAoW10pO1xuXG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiPCEtLVwiLCBlbmQ6IFwiLS0+XCJ9O1xuXG4gICAgdGhpcy5jcmVhdGVXb3JrZXIgPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgIHZhciB3b3JrZXIgPSBuZXcgV29ya2VyQ2xpZW50KFtcImFjZVwiXSwgXCJhY2UvbW9kZS94bWxfd29ya2VyXCIsIFwiV29ya2VyXCIpO1xuICAgICAgICB3b3JrZXIuYXR0YWNoVG9Eb2N1bWVudChzZXNzaW9uLmdldERvY3VtZW50KCkpO1xuXG4gICAgICAgIHdvcmtlci5vbihcImVycm9yXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHNlc3Npb24uc2V0QW5ub3RhdGlvbnMoZS5kYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya2VyLm9uKFwidGVybWluYXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2Vzc2lvbi5jbGVhckFubm90YXRpb25zKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB3b3JrZXI7XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUveG1sXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgWG1sSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbihub3JtYWxpemUpIHtcbiAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9SRUMteG1sLyNOVC1OYW1lQ2hhclxuICAgIC8vIE5hbWVTdGFydENoYXJcdCAgIDo6PSAgIFx0XCI6XCIgfCBbQS1aXSB8IFwiX1wiIHwgW2Etel0gfCBbI3hDMC0jeEQ2XSB8IFsjeEQ4LSN4RjZdIHwgWyN4RjgtI3gyRkZdIHwgWyN4MzcwLSN4MzdEXSB8IFsjeDM3Ri0jeDFGRkZdIHwgWyN4MjAwQy0jeDIwMERdIHwgWyN4MjA3MC0jeDIxOEZdIHwgWyN4MkMwMC0jeDJGRUZdIHwgWyN4MzAwMS0jeEQ3RkZdIHwgWyN4RjkwMC0jeEZEQ0ZdIHwgWyN4RkRGMC0jeEZGRkRdIHwgWyN4MTAwMDAtI3hFRkZGRl1cbiAgICAvLyBOYW1lQ2hhclx0ICAgOjo9ICAgXHROYW1lU3RhcnRDaGFyIHwgXCItXCIgfCBcIi5cIiB8IFswLTldIHwgI3hCNyB8IFsjeDAzMDAtI3gwMzZGXSB8IFsjeDIwM0YtI3gyMDQwXVxuICAgIHZhciB0YWdSZWdleCA9IFwiW186YS16QS1aXFx4YzAtXFx1ZmZmZl1bLV86LmEtekEtWjAtOVxceGMwLVxcdWZmZmZdKlwiO1xuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIHN0YXJ0IDogW1xuICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmcuY2RhdGEueG1sXCIsIHJlZ2V4IDogXCI8XFxcXCFcXFxcW0NEQVRBXFxcXFtcIiwgbmV4dCA6IFwiY2RhdGFcIn0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJwdW5jdHVhdGlvbi5pbnN0cnVjdGlvbi54bWxcIiwgXCJrZXl3b3JkLmluc3RydWN0aW9uLnhtbFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKDxcXFxcPykoXCIgKyB0YWdSZWdleCArIFwiKVwiLCBuZXh0IDogXCJwcm9jZXNzaW5nX2luc3RydWN0aW9uXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcImNvbW1lbnQuc3RhcnQueG1sXCIsIHJlZ2V4IDogXCI8XFxcXCEtLVwiLCBuZXh0IDogXCJjb21tZW50XCJ9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wieG1sLXBlLmRvY3R5cGUueG1sXCIsIFwieG1sLXBlLmRvY3R5cGUueG1sXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPFxcXFwhKShET0NUWVBFKSg/PVtcXFxcc10pXCIsIG5leHQgOiBcImRvY3R5cGVcIiwgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge2luY2x1ZGUgOiBcInRhZ1wifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwidGV4dC5lbmQtdGFnLW9wZW4ueG1sXCIsIHJlZ2V4OiBcIjwvXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ0ZXh0LnRhZy1vcGVuLnhtbFwiLCByZWdleDogXCI8XCJ9LFxuICAgICAgICAgICAge2luY2x1ZGUgOiBcInJlZmVyZW5jZVwifSxcbiAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcInRleHQueG1sXCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgcHJvY2Vzc2luZ19pbnN0cnVjdGlvbiA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiZW50aXR5Lm90aGVyLmF0dHJpYnV0ZS1uYW1lLmRlY2wtYXR0cmlidXRlLW5hbWUueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IHRhZ1JlZ2V4XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yLmRlY2wtYXR0cmlidXRlLWVxdWFscy54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCI9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJ3aGl0ZXNwYWNlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ueG1sLWRlY2wueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXD8+XCIsXG4gICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgIH1dLFxuXG4gICAgICAgIGRvY3R5cGUgOiBbXG4gICAgICAgICAgICB7aW5jbHVkZSA6IFwid2hpdGVzcGFjZVwifSxcbiAgICAgICAgICAgIHtpbmNsdWRlIDogXCJzdHJpbmdcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInhtbC1wZS5kb2N0eXBlLnhtbFwiLCByZWdleCA6IFwiPlwiLCBuZXh0IDogXCJzdGFydFwifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwieG1sLXBlLnhtbFwiLCByZWdleCA6IFwiWy1fYS16QS1aMC05Ol0rXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJwdW5jdHVhdGlvbi5pbnQtc3Vic2V0XCIsIHJlZ2V4IDogXCJcXFxcW1wiLCBwdXNoIDogXCJpbnRfc3Vic2V0XCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgaW50X3N1YnNldCA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwidGV4dC54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5pbnQtc3Vic2V0LnhtbFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXVwiLFxuICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInB1bmN0dWF0aW9uLm1hcmt1cC1kZWNsLnhtbFwiLCBcImtleXdvcmQubWFya3VwLWRlY2wueG1sXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIig8XFxcXCEpKFwiICsgdGFnUmVnZXggKyBcIilcIixcbiAgICAgICAgICAgIHB1c2ggOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5tYXJrdXAtZGVjbC54bWxcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiPlwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInBvcFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge2luY2x1ZGUgOiBcInN0cmluZ1wifV1cbiAgICAgICAgfV0sXG5cbiAgICAgICAgY2RhdGEgOiBbXG4gICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy5jZGF0YS54bWxcIiwgcmVnZXggOiBcIlxcXFxdXFxcXF0+XCIsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ0ZXh0LnhtbFwiLCByZWdleCA6IFwiXFxcXHMrXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ0ZXh0LnhtbFwiLCByZWdleCA6IFwiKD86W15cXFxcXV18XFxcXF0oPyFcXFxcXT4pKStcIn1cbiAgICAgICAgXSxcblxuICAgICAgICBjb21tZW50IDogW1xuICAgICAgICAgICAge3Rva2VuIDogXCJjb21tZW50LmVuZC54bWxcIiwgcmVnZXggOiBcIi0tPlwiLCBuZXh0IDogXCJzdGFydFwifSxcbiAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnQueG1sXCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgcmVmZXJlbmNlIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGUucmVmZXJlbmNlLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIig/OiYjWzAtOV0rOyl8KD86JiN4WzAtOWEtZkEtRl0rOyl8KD86JlthLXpBLVowLTlfOlxcXFwuLV0rOylcIlxuICAgICAgICB9XSxcblxuICAgICAgICBhdHRyX3JlZmVyZW5jZSA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlLnJlZmVyZW5jZS5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiKD86JiNbMC05XSs7KXwoPzomI3hbMC05YS1mQS1GXSs7KXwoPzomW2EtekEtWjAtOV86XFxcXC4tXSs7KVwiXG4gICAgICAgIH1dLFxuXG4gICAgICAgIHRhZyA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFtcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1vcGVuLnhtbFwiLCBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLmVuZC10YWctb3Blbi54bWxcIiwgXCJtZXRhLnRhZy50YWctbmFtZS54bWxcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKD86KDwpfCg8LykpKCg/OlwiICsgdGFnUmVnZXggKyBcIjopP1wiICsgdGFnUmVnZXggKyBcIilcIixcbiAgICAgICAgICAgIG5leHQ6IFtcbiAgICAgICAgICAgICAgICB7aW5jbHVkZSA6IFwiYXR0cmlidXRlc1wifSxcbiAgICAgICAgICAgICAgICB7dG9rZW4gOiBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1jbG9zZS54bWxcIiwgcmVnZXggOiBcIi8/PlwiLCBuZXh0IDogXCJzdGFydFwifVxuICAgICAgICAgICAgXVxuICAgICAgICB9XSxcblxuICAgICAgICB0YWdfd2hpdGVzcGFjZSA6IFtcbiAgICAgICAgICAgIHt0b2tlbiA6IFwidGV4dC50YWctd2hpdGVzcGFjZS54bWxcIiwgcmVnZXggOiBcIlxcXFxzK1wifVxuICAgICAgICBdLFxuICAgICAgICAvLyBmb3IgZG9jdHlwZSBhbmQgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbnNcbiAgICAgICAgd2hpdGVzcGFjZSA6IFtcbiAgICAgICAgICAgIHt0b2tlbiA6IFwidGV4dC53aGl0ZXNwYWNlLnhtbFwiLCByZWdleCA6IFwiXFxcXHMrXCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgLy8gZm9yIGRvY3R5cGUgYW5kIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb25zXG4gICAgICAgIHN0cmluZzogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiJ1wiLFxuICAgICAgICAgICAgcHVzaCA6IFtcbiAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy54bWxcIiwgcmVnZXg6IFwiJ1wiLCBuZXh0OiBcInBvcFwifSxcbiAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuIDogXCJzdHJpbmcueG1sXCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6ICdcIicsXG4gICAgICAgICAgICBwdXNoIDogW1xuICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLnhtbFwiLCByZWdleDogJ1wiJywgbmV4dDogXCJwb3BcIn0sXG4gICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwic3RyaW5nLnhtbFwifVxuICAgICAgICAgICAgXVxuICAgICAgICB9XSxcblxuICAgICAgICBhdHRyaWJ1dGVzOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImVudGl0eS5vdGhlci5hdHRyaWJ1dGUtbmFtZS54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogdGFnUmVnZXhcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3IuYXR0cmlidXRlLWVxdWFscy54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCI9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJ0YWdfd2hpdGVzcGFjZVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiYXR0cmlidXRlX3ZhbHVlXCJcbiAgICAgICAgfV0sXG5cbiAgICAgICAgYXR0cmlidXRlX3ZhbHVlOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiJ1wiLFxuICAgICAgICAgICAgcHVzaCA6IFtcbiAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsIHJlZ2V4OiBcIidcIiwgbmV4dDogXCJwb3BcIn0sXG4gICAgICAgICAgICAgICAge2luY2x1ZGUgOiBcImF0dHJfcmVmZXJlbmNlXCJ9LFxuICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgcHVzaCA6IFtcbiAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsIHJlZ2V4OiAnXCInLCBuZXh0OiBcInBvcFwifSxcbiAgICAgICAgICAgICAgICB7aW5jbHVkZSA6IFwiYXR0cl9yZWZlcmVuY2VcIn0sXG4gICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIn1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfV1cbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY29uc3RydWN0b3IgPT09IFhtbEhpZ2hsaWdodFJ1bGVzKVxuICAgICAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuZW1iZWRUYWdSdWxlcyA9IGZ1bmN0aW9uKEhpZ2hsaWdodFJ1bGVzLCBwcmVmaXgsIHRhZyl7XG4gICAgICAgIHRoaXMuJHJ1bGVzLnRhZy51bnNoaWZ0KHtcbiAgICAgICAgICAgIHRva2VuIDogW1wibWV0YS50YWcucHVuY3R1YXRpb24udGFnLW9wZW4ueG1sXCIsIFwibWV0YS50YWcuXCIgKyB0YWcgKyBcIi50YWctbmFtZS54bWxcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKDwpKFwiICsgdGFnICsgXCIoPz1cXFxcc3w+fCQpKVwiLFxuICAgICAgICAgICAgbmV4dDogW1xuICAgICAgICAgICAgICAgIHtpbmNsdWRlIDogXCJhdHRyaWJ1dGVzXCJ9LFxuICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLWNsb3NlLnhtbFwiLCByZWdleCA6IFwiLz8+XCIsIG5leHQgOiBwcmVmaXggKyBcInN0YXJ0XCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJHJ1bGVzW3RhZyArIFwiLWVuZFwiXSA9IFtcbiAgICAgICAgICAgIHtpbmNsdWRlIDogXCJhdHRyaWJ1dGVzXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctY2xvc2UueG1sXCIsIHJlZ2V4IDogXCIvPz5cIiwgIG5leHQ6IFwic3RhcnRcIixcbiAgICAgICAgICAgICAgICBvbk1hdGNoIDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suc3BsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgICAgIH19XG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5lbWJlZFJ1bGVzKEhpZ2hsaWdodFJ1bGVzLCBwcmVmaXgsIFt7XG4gICAgICAgICAgICB0b2tlbjogW1wibWV0YS50YWcucHVuY3R1YXRpb24uZW5kLXRhZy1vcGVuLnhtbFwiLCBcIm1ldGEudGFnLlwiICsgdGFnICsgXCIudGFnLW5hbWUueG1sXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIig8LykoXCIgKyB0YWcgKyBcIig/PVxcXFxzfD58JCkpXCIsXG4gICAgICAgICAgICBuZXh0OiB0YWcgKyBcIi1lbmRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuY2RhdGEueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiPFxcXFwhXFxcXFtDREFUQVxcXFxbXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmNkYXRhLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxdXFxcXF0+XCJcbiAgICAgICAgfV0pO1xuICAgIH07XG5cbn0pLmNhbGwoVGV4dEhpZ2hsaWdodFJ1bGVzLnByb3RvdHlwZSk7XG5cbm9vcC5pbmhlcml0cyhYbWxIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5YbWxIaWdobGlnaHRSdWxlcyA9IFhtbEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9