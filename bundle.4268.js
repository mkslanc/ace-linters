"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4268],{

/***/ 67809:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var Behaviour = (__webpack_require__(4708)/* .Behaviour */ .T);
var TokenIterator = (__webpack_require__(39216).TokenIterator);

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

/***/ 64631:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var Range = (__webpack_require__(59082)/* .Range */ .e);
var BaseFoldMode = (__webpack_require__(15369).FoldMode);

var FoldMode = exports.Z = function(voidElements, optionalEndTags) {
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
        var tags = session.getMatchingTags({row: row, column: 0});
        if (tags) {
            return new Range(
                tags.openTag.end.row, tags.openTag.end.column, tags.closeTag.start.row, tags.closeTag.start.column);
        } else {
            return this.getCommentFoldWidget(session, row)
                && session.getCommentFoldRange(row, session.getLine(row).length);
        }
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 94268:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var TextMode = (__webpack_require__(98030).Mode);
var XmlHighlightRules = (__webpack_require__(75239)/* .XmlHighlightRules */ .U);
var XmlBehaviour = (__webpack_require__(67809).XmlBehaviour);
var XmlFoldMode = (__webpack_require__(64631)/* .FoldMode */ .Z);
var WorkerClient = (__webpack_require__(91451).WorkerClient);

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

/***/ 75239:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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

exports.U = XmlHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvYmVoYXZpb3VyL3htbC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcveG1sLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUveG1sLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUveG1sX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJlaGF2aW91ciA9IHJlcXVpcmUoXCIuLi9iZWhhdmlvdXJcIikuQmVoYXZpb3VyO1xudmFyIFRva2VuSXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vLi4vdG9rZW5faXRlcmF0b3JcIikuVG9rZW5JdGVyYXRvcjtcblxuZnVuY3Rpb24gaXModG9rZW4sIHR5cGUpIHtcbiAgICByZXR1cm4gdG9rZW4gJiYgdG9rZW4udHlwZS5sYXN0SW5kZXhPZih0eXBlICsgXCIueG1sXCIpID4gLTE7XG59XG5cbnZhciBYbWxCZWhhdmlvdXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLmFkZChcInN0cmluZ19kcXVvdGVzXCIsIFwiaW5zZXJ0aW9uXCIsIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uLCBlZGl0b3IsIHNlc3Npb24sIHRleHQpIHtcbiAgICAgICAgaWYgKHRleHQgPT0gJ1wiJyB8fCB0ZXh0ID09IFwiJ1wiKSB7XG4gICAgICAgICAgICB2YXIgcXVvdGUgPSB0ZXh0O1xuICAgICAgICAgICAgdmFyIHNlbGVjdGVkID0gc2Vzc2lvbi5kb2MuZ2V0VGV4dFJhbmdlKGVkaXRvci5nZXRTZWxlY3Rpb25SYW5nZSgpKTtcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZCAhPT0gXCJcIiAmJiBzZWxlY3RlZCAhPT0gXCInXCIgJiYgc2VsZWN0ZWQgIT0gJ1wiJyAmJiBlZGl0b3IuZ2V0V3JhcEJlaGF2aW91cnNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBxdW90ZSArIHNlbGVjdGVkICsgcXVvdGUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogZmFsc2VcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZG9jLmdldExpbmUoY3Vyc29yLnJvdyk7XG4gICAgICAgICAgICB2YXIgcmlnaHRDaGFyID0gbGluZS5zdWJzdHJpbmcoY3Vyc29yLmNvbHVtbiwgY3Vyc29yLmNvbHVtbiArIDEpO1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gbmV3IFRva2VuSXRlcmF0b3Ioc2Vzc2lvbiwgY3Vyc29yLnJvdywgY3Vyc29yLmNvbHVtbik7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW4oKTtcblxuICAgICAgICAgICAgaWYgKHJpZ2h0Q2hhciA9PSBxdW90ZSAmJiAoaXModG9rZW4sIFwiYXR0cmlidXRlLXZhbHVlXCIpIHx8IGlzKHRva2VuLCBcInN0cmluZ1wiKSkpIHtcbiAgICAgICAgICAgICAgICAvLyBJZ25vcmUgaW5wdXQgYW5kIG1vdmUgcmlnaHQgb25lIGlmIHdlJ3JlIHR5cGluZyBvdmVyIHRoZSBjbG9zaW5nIHF1b3RlLlxuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXCIsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogWzEsIDFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCF0b2tlbilcbiAgICAgICAgICAgICAgICB0b2tlbiA9IGl0ZXJhdG9yLnN0ZXBCYWNrd2FyZCgpO1xuXG4gICAgICAgICAgICBpZiAoIXRva2VuKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgd2hpbGUgKGlzKHRva2VuLCBcInRhZy13aGl0ZXNwYWNlXCIpIHx8IGlzKHRva2VuLCBcIndoaXRlc3BhY2VcIikpIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IGl0ZXJhdG9yLnN0ZXBCYWNrd2FyZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHJpZ2h0U3BhY2UgPSAhcmlnaHRDaGFyIHx8IHJpZ2h0Q2hhci5tYXRjaCgvXFxzLyk7XG4gICAgICAgICAgICBpZiAoaXModG9rZW4sIFwiYXR0cmlidXRlLWVxdWFsc1wiKSAmJiAocmlnaHRTcGFjZSB8fCByaWdodENoYXIgPT0gJz4nKSB8fCAoaXModG9rZW4sIFwiZGVjbC1hdHRyaWJ1dGUtZXF1YWxzXCIpICYmIChyaWdodFNwYWNlIHx8IHJpZ2h0Q2hhciA9PSAnPycpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6IHF1b3RlICsgcXVvdGUsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogWzEsIDFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGQoXCJzdHJpbmdfZHF1b3Rlc1wiLCBcImRlbGV0aW9uXCIsIGZ1bmN0aW9uKHN0YXRlLCBhY3Rpb24sIGVkaXRvciwgc2Vzc2lvbiwgcmFuZ2UpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkID0gc2Vzc2lvbi5kb2MuZ2V0VGV4dFJhbmdlKHJhbmdlKTtcbiAgICAgICAgaWYgKCFyYW5nZS5pc011bHRpTGluZSgpICYmIChzZWxlY3RlZCA9PSAnXCInIHx8IHNlbGVjdGVkID09IFwiJ1wiKSkge1xuICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmRvYy5nZXRMaW5lKHJhbmdlLnN0YXJ0LnJvdyk7XG4gICAgICAgICAgICB2YXIgcmlnaHRDaGFyID0gbGluZS5zdWJzdHJpbmcocmFuZ2Uuc3RhcnQuY29sdW1uICsgMSwgcmFuZ2Uuc3RhcnQuY29sdW1uICsgMik7XG4gICAgICAgICAgICBpZiAocmlnaHRDaGFyID09IHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgcmFuZ2UuZW5kLmNvbHVtbisrO1xuICAgICAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGQoXCJhdXRvY2xvc2luZ1wiLCBcImluc2VydGlvblwiLCBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbiwgZWRpdG9yLCBzZXNzaW9uLCB0ZXh0KSB7XG4gICAgICAgIGlmICh0ZXh0ID09ICc+Jykge1xuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gZWRpdG9yLmdldFNlbGVjdGlvblJhbmdlKCkuc3RhcnQ7XG4gICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCBwb3NpdGlvbi5yb3csIHBvc2l0aW9uLmNvbHVtbik7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW4oKSB8fCBpdGVyYXRvci5zdGVwQmFja3dhcmQoKTtcblxuICAgICAgICAgICAgLy8gZXhpdCBpZiB3ZSdyZSBub3QgaW4gYSB0YWdcbiAgICAgICAgICAgIGlmICghdG9rZW4gfHwgIShpcyh0b2tlbiwgXCJ0YWctbmFtZVwiKSB8fCBpcyh0b2tlbiwgXCJ0YWctd2hpdGVzcGFjZVwiKSB8fCBpcyh0b2tlbiwgXCJhdHRyaWJ1dGUtbmFtZVwiKSB8fCBpcyh0b2tlbiwgXCJhdHRyaWJ1dGUtZXF1YWxzXCIpIHx8IGlzKHRva2VuLCBcImF0dHJpYnV0ZS12YWx1ZVwiKSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAvLyBleGl0IGlmIHdlJ3JlIGluc2lkZSBvZiBhIHF1b3RlZCBhdHRyaWJ1dGUgdmFsdWVcbiAgICAgICAgICAgIGlmIChpcyh0b2tlbiwgXCJyZWZlcmVuY2UuYXR0cmlidXRlLXZhbHVlXCIpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGlmIChpcyh0b2tlbiwgXCJhdHRyaWJ1dGUtdmFsdWVcIikpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9rZW5FbmRDb2x1bW4gPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW5Db2x1bW4oKSArIHRva2VuLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24uY29sdW1uIDwgdG9rZW5FbmRDb2x1bW4pXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAocG9zaXRpb24uY29sdW1uID09IHRva2VuRW5kQ29sdW1uKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0VG9rZW4gPSBpdGVyYXRvci5zdGVwRm9yd2FyZCgpO1xuICAgICAgICAgICAgICAgICAgICAvLyBUT0RPIGFsc28gaGFuZGxlIG5vbi1jbG9zZWQgc3RyaW5nIGF0IHRoZSBlbmQgb2YgdGhlIGxpbmVcbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRUb2tlbiAmJiBpcyhuZXh0VG9rZW4sIFwiYXR0cmlidXRlLXZhbHVlXCIpKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBpdGVyYXRvci5zdGVwQmFja3dhcmQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmICgvXlxccyo+Ly50ZXN0KHNlc3Npb24uZ2V0TGluZShwb3NpdGlvbi5yb3cpLnNsaWNlKHBvc2l0aW9uLmNvbHVtbikpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgLy8gZmluZCB0YWcgbmFtZVxuICAgICAgICAgICAgd2hpbGUgKCFpcyh0b2tlbiwgXCJ0YWctbmFtZVwiKSkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IFwiPFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEZvcndhcmQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgdG9rZW5Sb3cgPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW5Sb3coKTtcbiAgICAgICAgICAgIHZhciB0b2tlbkNvbHVtbiA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlbkNvbHVtbigpO1xuXG4gICAgICAgICAgICAvLyBleGl0IGlmIHRoZSB0YWcgaXMgZW5kaW5nXG4gICAgICAgICAgICBpZiAoaXMoaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCksIFwiZW5kLXRhZy1vcGVuXCIpKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIGVsZW1lbnQgPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgICAgIGlmICh0b2tlblJvdyA9PSBwb3NpdGlvbi5yb3cpXG4gICAgICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQuc3Vic3RyaW5nKDAsIHBvc2l0aW9uLmNvbHVtbiAtIHRva2VuQ29sdW1uKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMudm9pZEVsZW1lbnRzICYmIHRoaXMudm9pZEVsZW1lbnRzLmhhc093blByb3BlcnR5KGVsZW1lbnQudG9Mb3dlckNhc2UoKSkpXG4gICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgIHRleHQ6IFwiPlwiICsgXCI8L1wiICsgZWxlbWVudCArIFwiPlwiLFxuICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbMSwgMV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWRkKFwiYXV0b2luZGVudFwiLCBcImluc2VydGlvblwiLCBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbiwgZWRpdG9yLCBzZXNzaW9uLCB0ZXh0KSB7XG4gICAgICAgIGlmICh0ZXh0ID09IFwiXFxuXCIpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKGN1cnNvci5yb3cpO1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gbmV3IFRva2VuSXRlcmF0b3Ioc2Vzc2lvbiwgY3Vyc29yLnJvdywgY3Vyc29yLmNvbHVtbik7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW4oKTtcblxuICAgICAgICAgICAgaWYgKGlzKHRva2VuLCBcIlwiKSAmJiB0b2tlbi50eXBlLmluZGV4T2YoXCJ0YWctY2xvc2VcIikgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnZhbHVlID09IFwiLz5cIilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIC8vZ2V0IHRhZyBuYW1lXG4gICAgICAgICAgICAgICAgd2hpbGUgKHRva2VuICYmIHRva2VuLnR5cGUuaW5kZXhPZihcInRhZy1uYW1lXCIpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IGl0ZXJhdG9yLnN0ZXBCYWNrd2FyZCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciB0YWcgPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gaXRlcmF0b3IuZ2V0Q3VycmVudFRva2VuUm93KCk7XG5cbiAgICAgICAgICAgICAgICAvL2Rvbid0IGluZGVudCBhZnRlciBjbG9zaW5nIHRhZ1xuICAgICAgICAgICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCk7XG4gICAgICAgICAgICAgICAgaWYgKCF0b2tlbiB8fCB0b2tlbi50eXBlLmluZGV4T2YoXCJlbmQtdGFnXCIpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudm9pZEVsZW1lbnRzICYmICF0aGlzLnZvaWRFbGVtZW50c1t0YWddIHx8ICF0aGlzLnZvaWRFbGVtZW50cykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmV4dFRva2VuID0gc2Vzc2lvbi5nZXRUb2tlbkF0KGN1cnNvci5yb3csIGN1cnNvci5jb2x1bW4rMSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZXh0SW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZW50ID0gbmV4dEluZGVudCArIHNlc3Npb24uZ2V0VGFiU3RyaW5nKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG5leHRUb2tlbiAmJiBuZXh0VG9rZW4udmFsdWUgPT09IFwiPC9cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiBcIlxcblwiICsgaW5kZW50ICsgXCJcXG5cIiArIG5leHRJbmRlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbMSwgaW5kZW50Lmxlbmd0aCwgMSwgaW5kZW50Lmxlbmd0aF1cbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IFwiXFxuXCIgKyBpbmRlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxufTtcblxub29wLmluaGVyaXRzKFhtbEJlaGF2aW91ciwgQmVoYXZpb3VyKTtcblxuZXhwb3J0cy5YbWxCZWhhdmlvdXIgPSBYbWxCZWhhdmlvdXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKHZvaWRFbGVtZW50cywgb3B0aW9uYWxFbmRUYWdzKSB7XG4gICAgQmFzZUZvbGRNb2RlLmNhbGwodGhpcyk7XG4gICAgdGhpcy52b2lkRWxlbWVudHMgPSB2b2lkRWxlbWVudHMgfHwge307XG4gICAgdGhpcy5vcHRpb25hbEVuZFRhZ3MgPSBvb3AubWl4aW4oe30sIHRoaXMudm9pZEVsZW1lbnRzKTtcbiAgICBpZiAob3B0aW9uYWxFbmRUYWdzKVxuICAgICAgICBvb3AubWl4aW4odGhpcy5vcHRpb25hbEVuZFRhZ3MsIG9wdGlvbmFsRW5kVGFncyk7XG4gICAgXG59O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG52YXIgVGFnID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy50YWdOYW1lID0gXCJcIjtcbiAgICB0aGlzLmNsb3NpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNlbGZDbG9zaW5nID0gZmFsc2U7XG4gICAgdGhpcy5zdGFydCA9IHtyb3c6IDAsIGNvbHVtbjogMH07XG4gICAgdGhpcy5lbmQgPSB7cm93OiAwLCBjb2x1bW46IDB9O1xufTtcblxuZnVuY3Rpb24gaXModG9rZW4sIHR5cGUpIHtcbiAgICByZXR1cm4gdG9rZW4udHlwZS5sYXN0SW5kZXhPZih0eXBlICsgXCIueG1sXCIpID4gLTE7XG59XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciB0YWcgPSB0aGlzLl9nZXRGaXJzdFRhZ0luTGluZShzZXNzaW9uLCByb3cpO1xuXG4gICAgICAgIGlmICghdGFnKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudEZvbGRXaWRnZXQoc2Vzc2lvbiwgcm93KTtcblxuICAgICAgICBpZiAodGFnLmNsb3NpbmcgfHwgKCF0YWcudGFnTmFtZSAmJiB0YWcuc2VsZkNsb3NpbmcpKVxuICAgICAgICAgICAgcmV0dXJuIGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5lbmRcIiA/IFwiZW5kXCIgOiBcIlwiO1xuXG4gICAgICAgIGlmICghdGFnLnRhZ05hbWUgfHwgdGFnLnNlbGZDbG9zaW5nIHx8IHRoaXMudm9pZEVsZW1lbnRzLmhhc093blByb3BlcnR5KHRhZy50YWdOYW1lLnRvTG93ZXJDYXNlKCkpKVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG5cbiAgICAgICAgaWYgKHRoaXMuX2ZpbmRFbmRUYWdJbkxpbmUoc2Vzc2lvbiwgcm93LCB0YWcudGFnTmFtZSwgdGFnLmVuZC5jb2x1bW4pKVxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG5cbiAgICAgICAgcmV0dXJuIFwic3RhcnRcIjtcbiAgICB9O1xuICAgIFxuICAgIHRoaXMuZ2V0Q29tbWVudEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCByb3cpIHtcbiAgICAgICAgaWYgKC9jb21tZW50Ly50ZXN0KHNlc3Npb24uZ2V0U3RhdGUocm93KSkgJiYgLzwhLS8udGVzdChzZXNzaW9uLmdldExpbmUocm93KSkpXG4gICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICB9O1xuXG4gICAgLypcbiAgICAgKiByZXR1cm5zIGEgZmlyc3QgdGFnIChvciBhIGZyYWdtZW50KSBpbiBhIGxpbmVcbiAgICAgKi9cbiAgICB0aGlzLl9nZXRGaXJzdFRhZ0luTGluZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgdG9rZW5zID0gc2Vzc2lvbi5nZXRUb2tlbnMocm93KTtcbiAgICAgICAgdmFyIHRhZyA9IG5ldyBUYWcoKTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICAgICAgaWYgKGlzKHRva2VuLCBcInRhZy1vcGVuXCIpKSB7XG4gICAgICAgICAgICAgICAgdGFnLmVuZC5jb2x1bW4gPSB0YWcuc3RhcnQuY29sdW1uICsgdG9rZW4udmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHRhZy5jbG9zaW5nID0gaXModG9rZW4sIFwiZW5kLXRhZy1vcGVuXCIpO1xuICAgICAgICAgICAgICAgIHRva2VuID0gdG9rZW5zWysraV07XG4gICAgICAgICAgICAgICAgaWYgKCF0b2tlbilcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgICAgICAgdGFnLnRhZ05hbWUgPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udmFsdWUgPT09IFwiXCIpIHsgLy9za2lwIGVtcHR5IHRhZyBuYW1lIHRva2VuIGZvciBmcmFnbWVudFxuICAgICAgICAgICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1srK2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRva2VuKSByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGFnLnRhZ05hbWUgPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGFnLmVuZC5jb2x1bW4gKz0gdG9rZW4udmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvciAoaSsrOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICAgICAgICAgICAgICB0YWcuZW5kLmNvbHVtbiArPSB0b2tlbi52YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpcyh0b2tlbiwgXCJ0YWctY2xvc2VcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhZy5zZWxmQ2xvc2luZyA9IHRva2VuLnZhbHVlID09ICcvPic7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdGFnO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpcyh0b2tlbiwgXCJ0YWctY2xvc2VcIikpIHtcbiAgICAgICAgICAgICAgICB0YWcuc2VsZkNsb3NpbmcgPSB0b2tlbi52YWx1ZSA9PSAnLz4nO1xuICAgICAgICAgICAgICAgIHJldHVybiB0YWc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YWcuc3RhcnQuY29sdW1uICs9IHRva2VuLnZhbHVlLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG5cbiAgICB0aGlzLl9maW5kRW5kVGFnSW5MaW5lID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93LCB0YWdOYW1lLCBzdGFydENvbHVtbikge1xuICAgICAgICB2YXIgdG9rZW5zID0gc2Vzc2lvbi5nZXRUb2tlbnMocm93KTtcbiAgICAgICAgdmFyIGNvbHVtbiA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICBjb2x1bW4gKz0gdG9rZW4udmFsdWUubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGNvbHVtbiA8IHN0YXJ0Q29sdW1uIC0gMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChpcyh0b2tlbiwgXCJlbmQtdGFnLW9wZW5cIikpIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1tpICsgMV07XG4gICAgICAgICAgICAgICAgaWYgKGlzKHRva2VuLCBcInRhZy1uYW1lXCIpICYmIHRva2VuLnZhbHVlID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuID0gdG9rZW5zW2kgKyAyXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRva2VuICYmIHRva2VuLnZhbHVlID09IHRhZ05hbWUpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgdGFncyA9IHNlc3Npb24uZ2V0TWF0Y2hpbmdUYWdzKHtyb3c6IHJvdywgY29sdW1uOiAwfSk7XG4gICAgICAgIGlmICh0YWdzKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFJhbmdlKFxuICAgICAgICAgICAgICAgIHRhZ3Mub3BlblRhZy5lbmQucm93LCB0YWdzLm9wZW5UYWcuZW5kLmNvbHVtbiwgdGFncy5jbG9zZVRhZy5zdGFydC5yb3csIHRhZ3MuY2xvc2VUYWcuc3RhcnQuY29sdW1uKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbW1lbnRGb2xkV2lkZ2V0KHNlc3Npb24sIHJvdylcbiAgICAgICAgICAgICAgICAmJiBzZXNzaW9uLmdldENvbW1lbnRGb2xkUmFuZ2Uocm93LCBzZXNzaW9uLmdldExpbmUocm93KS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIFhtbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4veG1sX2hpZ2hsaWdodF9ydWxlc1wiKS5YbWxIaWdobGlnaHRSdWxlcztcbnZhciBYbWxCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi9iZWhhdmlvdXIveG1sXCIpLlhtbEJlaGF2aW91cjtcbnZhciBYbWxGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcveG1sXCIpLkZvbGRNb2RlO1xudmFyIFdvcmtlckNsaWVudCA9IHJlcXVpcmUoXCIuLi93b3JrZXIvd29ya2VyX2NsaWVudFwiKS5Xb3JrZXJDbGllbnQ7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gWG1sSGlnaGxpZ2h0UnVsZXM7XG4gICB0aGlzLiRiZWhhdmlvdXIgPSBuZXcgWG1sQmVoYXZpb3VyKCk7XG4gICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBYbWxGb2xkTW9kZSgpO1xufTtcblxub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy52b2lkRWxlbWVudHMgPSBsYW5nLmFycmF5VG9NYXAoW10pO1xuXG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiPCEtLVwiLCBlbmQ6IFwiLS0+XCJ9O1xuXG4gICAgdGhpcy5jcmVhdGVXb3JrZXIgPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgIHZhciB3b3JrZXIgPSBuZXcgV29ya2VyQ2xpZW50KFtcImFjZVwiXSwgXCJhY2UvbW9kZS94bWxfd29ya2VyXCIsIFwiV29ya2VyXCIpO1xuICAgICAgICB3b3JrZXIuYXR0YWNoVG9Eb2N1bWVudChzZXNzaW9uLmdldERvY3VtZW50KCkpO1xuXG4gICAgICAgIHdvcmtlci5vbihcImVycm9yXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHNlc3Npb24uc2V0QW5ub3RhdGlvbnMoZS5kYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya2VyLm9uKFwidGVybWluYXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2Vzc2lvbi5jbGVhckFubm90YXRpb25zKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB3b3JrZXI7XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUveG1sXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgWG1sSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbihub3JtYWxpemUpIHtcbiAgICAvLyBodHRwOi8vd3d3LnczLm9yZy9UUi9SRUMteG1sLyNOVC1OYW1lQ2hhclxuICAgIC8vIE5hbWVTdGFydENoYXJcdCAgIDo6PSAgIFx0XCI6XCIgfCBbQS1aXSB8IFwiX1wiIHwgW2Etel0gfCBbI3hDMC0jeEQ2XSB8IFsjeEQ4LSN4RjZdIHwgWyN4RjgtI3gyRkZdIHwgWyN4MzcwLSN4MzdEXSB8IFsjeDM3Ri0jeDFGRkZdIHwgWyN4MjAwQy0jeDIwMERdIHwgWyN4MjA3MC0jeDIxOEZdIHwgWyN4MkMwMC0jeDJGRUZdIHwgWyN4MzAwMS0jeEQ3RkZdIHwgWyN4RjkwMC0jeEZEQ0ZdIHwgWyN4RkRGMC0jeEZGRkRdIHwgWyN4MTAwMDAtI3hFRkZGRl1cbiAgICAvLyBOYW1lQ2hhclx0ICAgOjo9ICAgXHROYW1lU3RhcnRDaGFyIHwgXCItXCIgfCBcIi5cIiB8IFswLTldIHwgI3hCNyB8IFsjeDAzMDAtI3gwMzZGXSB8IFsjeDIwM0YtI3gyMDQwXVxuICAgIHZhciB0YWdSZWdleCA9IFwiW186YS16QS1aXFx4YzAtXFx1ZmZmZl1bLV86LmEtekEtWjAtOVxceGMwLVxcdWZmZmZdKlwiO1xuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIHN0YXJ0IDogW1xuICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmcuY2RhdGEueG1sXCIsIHJlZ2V4IDogXCI8XFxcXCFcXFxcW0NEQVRBXFxcXFtcIiwgbmV4dCA6IFwiY2RhdGFcIn0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJwdW5jdHVhdGlvbi5pbnN0cnVjdGlvbi54bWxcIiwgXCJrZXl3b3JkLmluc3RydWN0aW9uLnhtbFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKDxcXFxcPykoXCIgKyB0YWdSZWdleCArIFwiKVwiLCBuZXh0IDogXCJwcm9jZXNzaW5nX2luc3RydWN0aW9uXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcImNvbW1lbnQuc3RhcnQueG1sXCIsIHJlZ2V4IDogXCI8XFxcXCEtLVwiLCBuZXh0IDogXCJjb21tZW50XCJ9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wieG1sLXBlLmRvY3R5cGUueG1sXCIsIFwieG1sLXBlLmRvY3R5cGUueG1sXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPFxcXFwhKShET0NUWVBFKSg/PVtcXFxcc10pXCIsIG5leHQgOiBcImRvY3R5cGVcIiwgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge2luY2x1ZGUgOiBcInRhZ1wifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwidGV4dC5lbmQtdGFnLW9wZW4ueG1sXCIsIHJlZ2V4OiBcIjwvXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ0ZXh0LnRhZy1vcGVuLnhtbFwiLCByZWdleDogXCI8XCJ9LFxuICAgICAgICAgICAge2luY2x1ZGUgOiBcInJlZmVyZW5jZVwifSxcbiAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcInRleHQueG1sXCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgcHJvY2Vzc2luZ19pbnN0cnVjdGlvbiA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiZW50aXR5Lm90aGVyLmF0dHJpYnV0ZS1uYW1lLmRlY2wtYXR0cmlidXRlLW5hbWUueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IHRhZ1JlZ2V4XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yLmRlY2wtYXR0cmlidXRlLWVxdWFscy54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCI9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJ3aGl0ZXNwYWNlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ueG1sLWRlY2wueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXD8+XCIsXG4gICAgICAgICAgICBuZXh0IDogXCJzdGFydFwiXG4gICAgICAgIH1dLFxuXG4gICAgICAgIGRvY3R5cGUgOiBbXG4gICAgICAgICAgICB7aW5jbHVkZSA6IFwid2hpdGVzcGFjZVwifSxcbiAgICAgICAgICAgIHtpbmNsdWRlIDogXCJzdHJpbmdcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInhtbC1wZS5kb2N0eXBlLnhtbFwiLCByZWdleCA6IFwiPlwiLCBuZXh0IDogXCJzdGFydFwifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwieG1sLXBlLnhtbFwiLCByZWdleCA6IFwiWy1fYS16QS1aMC05Ol0rXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJwdW5jdHVhdGlvbi5pbnQtc3Vic2V0XCIsIHJlZ2V4IDogXCJcXFxcW1wiLCBwdXNoIDogXCJpbnRfc3Vic2V0XCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgaW50X3N1YnNldCA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwidGV4dC54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxccytcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5pbnQtc3Vic2V0LnhtbFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXVwiLFxuICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFtcInB1bmN0dWF0aW9uLm1hcmt1cC1kZWNsLnhtbFwiLCBcImtleXdvcmQubWFya3VwLWRlY2wueG1sXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIig8XFxcXCEpKFwiICsgdGFnUmVnZXggKyBcIilcIixcbiAgICAgICAgICAgIHB1c2ggOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5tYXJrdXAtZGVjbC54bWxcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiPlwiLFxuICAgICAgICAgICAgICAgIG5leHQgOiBcInBvcFwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge2luY2x1ZGUgOiBcInN0cmluZ1wifV1cbiAgICAgICAgfV0sXG5cbiAgICAgICAgY2RhdGEgOiBbXG4gICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy5jZGF0YS54bWxcIiwgcmVnZXggOiBcIlxcXFxdXFxcXF0+XCIsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ0ZXh0LnhtbFwiLCByZWdleCA6IFwiXFxcXHMrXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ0ZXh0LnhtbFwiLCByZWdleCA6IFwiKD86W15cXFxcXV18XFxcXF0oPyFcXFxcXT4pKStcIn1cbiAgICAgICAgXSxcblxuICAgICAgICBjb21tZW50IDogW1xuICAgICAgICAgICAge3Rva2VuIDogXCJjb21tZW50LmVuZC54bWxcIiwgcmVnZXggOiBcIi0tPlwiLCBuZXh0IDogXCJzdGFydFwifSxcbiAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcImNvbW1lbnQueG1sXCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgcmVmZXJlbmNlIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGUucmVmZXJlbmNlLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIig/OiYjWzAtOV0rOyl8KD86JiN4WzAtOWEtZkEtRl0rOyl8KD86JlthLXpBLVowLTlfOlxcXFwuLV0rOylcIlxuICAgICAgICB9XSxcblxuICAgICAgICBhdHRyX3JlZmVyZW5jZSA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuZXNjYXBlLnJlZmVyZW5jZS5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiKD86JiNbMC05XSs7KXwoPzomI3hbMC05YS1mQS1GXSs7KXwoPzomW2EtekEtWjAtOV86XFxcXC4tXSs7KVwiXG4gICAgICAgIH1dLFxuXG4gICAgICAgIHRhZyA6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFtcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1vcGVuLnhtbFwiLCBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLmVuZC10YWctb3Blbi54bWxcIiwgXCJtZXRhLnRhZy50YWctbmFtZS54bWxcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKD86KDwpfCg8LykpKCg/OlwiICsgdGFnUmVnZXggKyBcIjopP1wiICsgdGFnUmVnZXggKyBcIilcIixcbiAgICAgICAgICAgIG5leHQ6IFtcbiAgICAgICAgICAgICAgICB7aW5jbHVkZSA6IFwiYXR0cmlidXRlc1wifSxcbiAgICAgICAgICAgICAgICB7dG9rZW4gOiBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1jbG9zZS54bWxcIiwgcmVnZXggOiBcIi8/PlwiLCBuZXh0IDogXCJzdGFydFwifVxuICAgICAgICAgICAgXVxuICAgICAgICB9XSxcblxuICAgICAgICB0YWdfd2hpdGVzcGFjZSA6IFtcbiAgICAgICAgICAgIHt0b2tlbiA6IFwidGV4dC50YWctd2hpdGVzcGFjZS54bWxcIiwgcmVnZXggOiBcIlxcXFxzK1wifVxuICAgICAgICBdLFxuICAgICAgICAvLyBmb3IgZG9jdHlwZSBhbmQgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbnNcbiAgICAgICAgd2hpdGVzcGFjZSA6IFtcbiAgICAgICAgICAgIHt0b2tlbiA6IFwidGV4dC53aGl0ZXNwYWNlLnhtbFwiLCByZWdleCA6IFwiXFxcXHMrXCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgLy8gZm9yIGRvY3R5cGUgYW5kIHByb2Nlc3NpbmcgaW5zdHJ1Y3Rpb25zXG4gICAgICAgIHN0cmluZzogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiJ1wiLFxuICAgICAgICAgICAgcHVzaCA6IFtcbiAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy54bWxcIiwgcmVnZXg6IFwiJ1wiLCBuZXh0OiBcInBvcFwifSxcbiAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuIDogXCJzdHJpbmcueG1sXCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6ICdcIicsXG4gICAgICAgICAgICBwdXNoIDogW1xuICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLnhtbFwiLCByZWdleDogJ1wiJywgbmV4dDogXCJwb3BcIn0sXG4gICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwic3RyaW5nLnhtbFwifVxuICAgICAgICAgICAgXVxuICAgICAgICB9XSxcblxuICAgICAgICBhdHRyaWJ1dGVzOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImVudGl0eS5vdGhlci5hdHRyaWJ1dGUtbmFtZS54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogdGFnUmVnZXhcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3IuYXR0cmlidXRlLWVxdWFscy54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCI9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJ0YWdfd2hpdGVzcGFjZVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiYXR0cmlidXRlX3ZhbHVlXCJcbiAgICAgICAgfV0sXG5cbiAgICAgICAgYXR0cmlidXRlX3ZhbHVlOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiJ1wiLFxuICAgICAgICAgICAgcHVzaCA6IFtcbiAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsIHJlZ2V4OiBcIidcIiwgbmV4dDogXCJwb3BcIn0sXG4gICAgICAgICAgICAgICAge2luY2x1ZGUgOiBcImF0dHJfcmVmZXJlbmNlXCJ9LFxuICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiAnXCInLFxuICAgICAgICAgICAgcHVzaCA6IFtcbiAgICAgICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsIHJlZ2V4OiAnXCInLCBuZXh0OiBcInBvcFwifSxcbiAgICAgICAgICAgICAgICB7aW5jbHVkZSA6IFwiYXR0cl9yZWZlcmVuY2VcIn0sXG4gICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIn1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfV1cbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuY29uc3RydWN0b3IgPT09IFhtbEhpZ2hsaWdodFJ1bGVzKVxuICAgICAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuZW1iZWRUYWdSdWxlcyA9IGZ1bmN0aW9uKEhpZ2hsaWdodFJ1bGVzLCBwcmVmaXgsIHRhZyl7XG4gICAgICAgIHRoaXMuJHJ1bGVzLnRhZy51bnNoaWZ0KHtcbiAgICAgICAgICAgIHRva2VuIDogW1wibWV0YS50YWcucHVuY3R1YXRpb24udGFnLW9wZW4ueG1sXCIsIFwibWV0YS50YWcuXCIgKyB0YWcgKyBcIi50YWctbmFtZS54bWxcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKDwpKFwiICsgdGFnICsgXCIoPz1cXFxcc3w+fCQpKVwiLFxuICAgICAgICAgICAgbmV4dDogW1xuICAgICAgICAgICAgICAgIHtpbmNsdWRlIDogXCJhdHRyaWJ1dGVzXCJ9LFxuICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLWNsb3NlLnhtbFwiLCByZWdleCA6IFwiLz8+XCIsIG5leHQgOiBwcmVmaXggKyBcInN0YXJ0XCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuJHJ1bGVzW3RhZyArIFwiLWVuZFwiXSA9IFtcbiAgICAgICAgICAgIHtpbmNsdWRlIDogXCJhdHRyaWJ1dGVzXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctY2xvc2UueG1sXCIsIHJlZ2V4IDogXCIvPz5cIiwgIG5leHQ6IFwic3RhcnRcIixcbiAgICAgICAgICAgICAgICBvbk1hdGNoIDogZnVuY3Rpb24odmFsdWUsIGN1cnJlbnRTdGF0ZSwgc3RhY2spIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2suc3BsaWNlKDApO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy50b2tlbjtcbiAgICAgICAgICAgIH19XG4gICAgICAgIF07XG5cbiAgICAgICAgdGhpcy5lbWJlZFJ1bGVzKEhpZ2hsaWdodFJ1bGVzLCBwcmVmaXgsIFt7XG4gICAgICAgICAgICB0b2tlbjogW1wibWV0YS50YWcucHVuY3R1YXRpb24uZW5kLXRhZy1vcGVuLnhtbFwiLCBcIm1ldGEudGFnLlwiICsgdGFnICsgXCIudGFnLW5hbWUueG1sXCJdLFxuICAgICAgICAgICAgcmVnZXggOiBcIig8LykoXCIgKyB0YWcgKyBcIig/PVxcXFxzfD58JCkpXCIsXG4gICAgICAgICAgICBuZXh0OiB0YWcgKyBcIi1lbmRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuY2RhdGEueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiPFxcXFwhXFxcXFtDREFUQVxcXFxbXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmNkYXRhLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxdXFxcXF0+XCJcbiAgICAgICAgfV0pO1xuICAgIH07XG5cbn0pLmNhbGwoVGV4dEhpZ2hsaWdodFJ1bGVzLnByb3RvdHlwZSk7XG5cbm9vcC5pbmhlcml0cyhYbWxIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5YbWxIaWdobGlnaHRSdWxlcyA9IFhtbEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9