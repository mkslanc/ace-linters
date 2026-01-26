"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4445],{

/***/ 90610:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);

var FoldMode = exports.FoldMode = function(defaultMode, subModes) {
    this.defaultMode = defaultMode;
    this.subModes = subModes;
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {


    this.$getMode = function(state) {
        if (typeof state != "string") 
            state = state[0];
        for (var key in this.subModes) {
            if (state.indexOf(key) === 0)
                return this.subModes[key];
        }
        return null;
    };
    
    this.$tryMode = function(state, session, foldStyle, row) {
        var mode = this.$getMode(state);
        return (mode ? mode.getFoldWidget(session, foldStyle, row) : "");
    };

    this.getFoldWidget = function(session, foldStyle, row) {
        return (
            this.$tryMode(session.getState(row-1), session, foldStyle, row) ||
            this.$tryMode(session.getState(row), session, foldStyle, row) ||
            this.defaultMode.getFoldWidget(session, foldStyle, row)
        );
    };

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var mode = this.$getMode(session.getState(row-1));
        
        if (!mode || !mode.getFoldWidget(session, foldStyle, row))
            mode = this.$getMode(session.getState(row));
        
        if (!mode || !mode.getFoldWidget(session, foldStyle, row))
            mode = this.defaultMode;
        
        return mode.getFoldWidgetRange(session, foldStyle, row);
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 14445:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var XmlMode = (__webpack_require__(49846).Mode);
var JavaScriptMode = (__webpack_require__(93388).Mode);
var SvgHighlightRules = (__webpack_require__(25498)/* .SvgHighlightRules */ .M);
var MixedFoldMode = (__webpack_require__(90610).FoldMode);
var XmlFoldMode = (__webpack_require__(79712)/* .FoldMode */ .l);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    XmlMode.call(this);
    
    this.HighlightRules = SvgHighlightRules;
    
    this.createModeDelegates({
        "js-": JavaScriptMode
    });
    
    this.foldingRules = new MixedFoldMode(new XmlFoldMode(), {
        "js-": new CStyleFoldMode()
    });
};

oop.inherits(Mode, XmlMode);

(function() {

    this.getNextLineIndent = function(state, line, tab) {
        return this.$getIndent(line);
    };
    

    this.$id = "ace/mode/svg";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 25498:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var JavaScriptHighlightRules = (__webpack_require__(15903).JavaScriptHighlightRules);
var XmlHighlightRules = (__webpack_require__(54849)/* .XmlHighlightRules */ .l);

var SvgHighlightRules = function() {
    XmlHighlightRules.call(this);

    this.embedTagRules(JavaScriptHighlightRules, "js-", "script");

    this.normalizeRules();
};

oop.inherits(SvgHighlightRules, XmlHighlightRules);

exports.M = SvgHighlightRules;


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Y29kZS9zcmMvbW9kZS9mb2xkaW5nL21peGVkLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc3ZnLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvc3ZnX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3htbC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3htbF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbihkZWZhdWx0TW9kZSwgc3ViTW9kZXMpIHtcbiAgICB0aGlzLmRlZmF1bHRNb2RlID0gZGVmYXVsdE1vZGU7XG4gICAgdGhpcy5zdWJNb2RlcyA9IHN1Yk1vZGVzO1xufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG5cbiAgICB0aGlzLiRnZXRNb2RlID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSAhPSBcInN0cmluZ1wiKSBcbiAgICAgICAgICAgIHN0YXRlID0gc3RhdGVbMF07XG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLnN1Yk1vZGVzKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUuaW5kZXhPZihrZXkpID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN1Yk1vZGVzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLiR0cnlNb2RlID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBtb2RlID0gdGhpcy4kZ2V0TW9kZShzdGF0ZSk7XG4gICAgICAgIHJldHVybiAobW9kZSA/IG1vZGUuZ2V0Rm9sZFdpZGdldChzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykgOiBcIlwiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuJHRyeU1vZGUoc2Vzc2lvbi5nZXRTdGF0ZShyb3ctMSksIHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB8fFxuICAgICAgICAgICAgdGhpcy4kdHJ5TW9kZShzZXNzaW9uLmdldFN0YXRlKHJvdyksIHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB8fFxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0TW9kZS5nZXRGb2xkV2lkZ2V0KHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBtb2RlID0gdGhpcy4kZ2V0TW9kZShzZXNzaW9uLmdldFN0YXRlKHJvdy0xKSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIW1vZGUgfHwgIW1vZGUuZ2V0Rm9sZFdpZGdldChzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykpXG4gICAgICAgICAgICBtb2RlID0gdGhpcy4kZ2V0TW9kZShzZXNzaW9uLmdldFN0YXRlKHJvdykpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFtb2RlIHx8ICFtb2RlLmdldEZvbGRXaWRnZXQoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpKVxuICAgICAgICAgICAgbW9kZSA9IHRoaXMuZGVmYXVsdE1vZGU7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbW9kZS5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpO1xuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgWG1sTW9kZSA9IHJlcXVpcmUoXCIuL3htbFwiKS5Nb2RlO1xudmFyIEphdmFTY3JpcHRNb2RlID0gcmVxdWlyZShcIi4vamF2YXNjcmlwdFwiKS5Nb2RlO1xudmFyIFN2Z0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vc3ZnX2hpZ2hsaWdodF9ydWxlc1wiKS5TdmdIaWdobGlnaHRSdWxlcztcbnZhciBNaXhlZEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9taXhlZFwiKS5Gb2xkTW9kZTtcbnZhciBYbWxGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcveG1sXCIpLkZvbGRNb2RlO1xudmFyIENTdHlsZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgWG1sTW9kZS5jYWxsKHRoaXMpO1xuICAgIFxuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBTdmdIaWdobGlnaHRSdWxlcztcbiAgICBcbiAgICB0aGlzLmNyZWF0ZU1vZGVEZWxlZ2F0ZXMoe1xuICAgICAgICBcImpzLVwiOiBKYXZhU2NyaXB0TW9kZVxuICAgIH0pO1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IE1peGVkRm9sZE1vZGUobmV3IFhtbEZvbGRNb2RlKCksIHtcbiAgICAgICAgXCJqcy1cIjogbmV3IENTdHlsZUZvbGRNb2RlKClcbiAgICB9KTtcbn07XG5cbm9vcC5pbmhlcml0cyhNb2RlLCBYbWxNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGdldEluZGVudChsaW5lKTtcbiAgICB9O1xuICAgIFxuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3N2Z1wiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIEphdmFTY3JpcHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2phdmFzY3JpcHRfaGlnaGxpZ2h0X3J1bGVzXCIpLkphdmFTY3JpcHRIaWdobGlnaHRSdWxlcztcbnZhciBYbWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3htbF9oaWdobGlnaHRfcnVsZXNcIikuWG1sSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBTdmdIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIFhtbEhpZ2hsaWdodFJ1bGVzLmNhbGwodGhpcyk7XG5cbiAgICB0aGlzLmVtYmVkVGFnUnVsZXMoSmF2YVNjcmlwdEhpZ2hsaWdodFJ1bGVzLCBcImpzLVwiLCBcInNjcmlwdFwiKTtcblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhTdmdIaWdobGlnaHRSdWxlcywgWG1sSGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlN2Z0hpZ2hsaWdodFJ1bGVzID0gU3ZnSGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgWG1sSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi94bWxfaGlnaGxpZ2h0X3J1bGVzXCIpLlhtbEhpZ2hsaWdodFJ1bGVzO1xudmFyIFhtbEJlaGF2aW91ciA9IHJlcXVpcmUoXCIuL2JlaGF2aW91ci94bWxcIikuWG1sQmVoYXZpb3VyO1xudmFyIFhtbEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy94bWxcIikuRm9sZE1vZGU7XG52YXIgV29ya2VyQ2xpZW50ID0gcmVxdWlyZShcIi4uL3dvcmtlci93b3JrZXJfY2xpZW50XCIpLldvcmtlckNsaWVudDtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBYbWxIaWdobGlnaHRSdWxlcztcbiAgIHRoaXMuJGJlaGF2aW91ciA9IG5ldyBYbWxCZWhhdmlvdXIoKTtcbiAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IFhtbEZvbGRNb2RlKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLnZvaWRFbGVtZW50cyA9IGxhbmcuYXJyYXlUb01hcChbXSk7XG5cbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCI8IS0tXCIsIGVuZDogXCItLT5cIn07XG5cbiAgICB0aGlzLmNyZWF0ZVdvcmtlciA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXJDbGllbnQoW1wiYWNlXCJdLCBcImFjZS9tb2RlL3htbF93b3JrZXJcIiwgXCJXb3JrZXJcIik7XG4gICAgICAgIHdvcmtlci5hdHRhY2hUb0RvY3VtZW50KHNlc3Npb24uZ2V0RG9jdW1lbnQoKSk7XG5cbiAgICAgICAgd29ya2VyLm9uKFwiZXJyb3JcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgc2Vzc2lvbi5zZXRBbm5vdGF0aW9ucyhlLmRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3b3JrZXIub24oXCJ0ZXJtaW5hdGVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXNzaW9uLmNsZWFyQW5ub3RhdGlvbnMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHdvcmtlcjtcbiAgICB9O1xuICAgIFxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS94bWxcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBYbWxIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKG5vcm1hbGl6ZSkge1xuICAgIC8vIGh0dHA6Ly93d3cudzMub3JnL1RSL1JFQy14bWwvI05ULU5hbWVDaGFyXG4gICAgLy8gTmFtZVN0YXJ0Q2hhclx0ICAgOjo9ICAgXHRcIjpcIiB8IFtBLVpdIHwgXCJfXCIgfCBbYS16XSB8IFsjeEMwLSN4RDZdIHwgWyN4RDgtI3hGNl0gfCBbI3hGOC0jeDJGRl0gfCBbI3gzNzAtI3gzN0RdIHwgWyN4MzdGLSN4MUZGRl0gfCBbI3gyMDBDLSN4MjAwRF0gfCBbI3gyMDcwLSN4MjE4Rl0gfCBbI3gyQzAwLSN4MkZFRl0gfCBbI3gzMDAxLSN4RDdGRl0gfCBbI3hGOTAwLSN4RkRDRl0gfCBbI3hGREYwLSN4RkZGRF0gfCBbI3gxMDAwMC0jeEVGRkZGXVxuICAgIC8vIE5hbWVDaGFyXHQgICA6Oj0gICBcdE5hbWVTdGFydENoYXIgfCBcIi1cIiB8IFwiLlwiIHwgWzAtOV0gfCAjeEI3IHwgWyN4MDMwMC0jeDAzNkZdIHwgWyN4MjAzRi0jeDIwNDBdXG4gICAgdmFyIHRhZ1JlZ2V4ID0gXCJbXzphLXpBLVpcXHhjMC1cXHVmZmZmXVstXzouYS16QS1aMC05XFx4YzAtXFx1ZmZmZl0qXCI7XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgc3RhcnQgOiBbXG4gICAgICAgICAgICB7dG9rZW4gOiBcInN0cmluZy5jZGF0YS54bWxcIiwgcmVnZXggOiBcIjxcXFxcIVxcXFxbQ0RBVEFcXFxcW1wiLCBuZXh0IDogXCJjZGF0YVwifSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcInB1bmN0dWF0aW9uLmluc3RydWN0aW9uLnhtbFwiLCBcImtleXdvcmQuaW5zdHJ1Y3Rpb24ueG1sXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPFxcXFw/KShcIiArIHRhZ1JlZ2V4ICsgXCIpXCIsIG5leHQgOiBcInByb2Nlc3NpbmdfaW5zdHJ1Y3Rpb25cIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwiY29tbWVudC5zdGFydC54bWxcIiwgcmVnZXggOiBcIjxcXFxcIS0tXCIsIG5leHQgOiBcImNvbW1lbnRcIn0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJ4bWwtcGUuZG9jdHlwZS54bWxcIiwgXCJ4bWwtcGUuZG9jdHlwZS54bWxcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIig8XFxcXCEpKERPQ1RZUEUpKD89W1xcXFxzXSlcIiwgbmV4dCA6IFwiZG9jdHlwZVwiLCBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7aW5jbHVkZSA6IFwidGFnXCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ0ZXh0LmVuZC10YWctb3Blbi54bWxcIiwgcmVnZXg6IFwiPC9cIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInRleHQudGFnLW9wZW4ueG1sXCIsIHJlZ2V4OiBcIjxcIn0sXG4gICAgICAgICAgICB7aW5jbHVkZSA6IFwicmVmZXJlbmNlXCJ9LFxuICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwidGV4dC54bWxcIn1cbiAgICAgICAgXSxcblxuICAgICAgICBwcm9jZXNzaW5nX2luc3RydWN0aW9uIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJlbnRpdHkub3RoZXIuYXR0cmlidXRlLW5hbWUuZGVjbC1hdHRyaWJ1dGUtbmFtZS54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogdGFnUmVnZXhcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3IuZGVjbC1hdHRyaWJ1dGUtZXF1YWxzLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIj1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIndoaXRlc3BhY2VcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcInN0cmluZ1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi54bWwtZGVjbC54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcPz5cIixcbiAgICAgICAgICAgIG5leHQgOiBcInN0YXJ0XCJcbiAgICAgICAgfV0sXG5cbiAgICAgICAgZG9jdHlwZSA6IFtcbiAgICAgICAgICAgIHtpbmNsdWRlIDogXCJ3aGl0ZXNwYWNlXCJ9LFxuICAgICAgICAgICAge2luY2x1ZGUgOiBcInN0cmluZ1wifSxcbiAgICAgICAgICAgIHt0b2tlbiA6IFwieG1sLXBlLmRvY3R5cGUueG1sXCIsIHJlZ2V4IDogXCI+XCIsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAge3Rva2VuIDogXCJ4bWwtcGUueG1sXCIsIHJlZ2V4IDogXCJbLV9hLXpBLVowLTk6XStcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInB1bmN0dWF0aW9uLmludC1zdWJzZXRcIiwgcmVnZXggOiBcIlxcXFxbXCIsIHB1c2ggOiBcImludF9zdWJzZXRcIn1cbiAgICAgICAgXSxcblxuICAgICAgICBpbnRfc3Vic2V0IDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJ0ZXh0LnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmludC1zdWJzZXQueG1sXCIsXG4gICAgICAgICAgICByZWdleDogXCJdXCIsXG4gICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogW1wicHVuY3R1YXRpb24ubWFya3VwLWRlY2wueG1sXCIsIFwia2V5d29yZC5tYXJrdXAtZGVjbC54bWxcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKDxcXFxcISkoXCIgKyB0YWdSZWdleCArIFwiKVwiLFxuICAgICAgICAgICAgcHVzaCA6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInRleHRcIixcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXHMrXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm1hcmt1cC1kZWNsLnhtbFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCI+XCIsXG4gICAgICAgICAgICAgICAgbmV4dCA6IFwicG9wXCJcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7aW5jbHVkZSA6IFwic3RyaW5nXCJ9XVxuICAgICAgICB9XSxcblxuICAgICAgICBjZGF0YSA6IFtcbiAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLmNkYXRhLnhtbFwiLCByZWdleCA6IFwiXFxcXF1cXFxcXT5cIiwgbmV4dCA6IFwic3RhcnRcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInRleHQueG1sXCIsIHJlZ2V4IDogXCJcXFxccytcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcInRleHQueG1sXCIsIHJlZ2V4IDogXCIoPzpbXlxcXFxdXXxcXFxcXSg/IVxcXFxdPikpK1wifVxuICAgICAgICBdLFxuXG4gICAgICAgIGNvbW1lbnQgOiBbXG4gICAgICAgICAgICB7dG9rZW4gOiBcImNvbW1lbnQuZW5kLnhtbFwiLCByZWdleCA6IFwiLS0+XCIsIG5leHQgOiBcInN0YXJ0XCJ9LFxuICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwiY29tbWVudC54bWxcIn1cbiAgICAgICAgXSxcblxuICAgICAgICByZWZlcmVuY2UgOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZS5yZWZlcmVuY2UueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiKD86JiNbMC05XSs7KXwoPzomI3hbMC05YS1mQS1GXSs7KXwoPzomW2EtekEtWjAtOV86XFxcXC4tXSs7KVwiXG4gICAgICAgIH1dLFxuXG4gICAgICAgIGF0dHJfcmVmZXJlbmNlIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5lc2NhcGUucmVmZXJlbmNlLmF0dHJpYnV0ZS12YWx1ZS54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPzomI1swLTldKzspfCg/OiYjeFswLTlhLWZBLUZdKzspfCg/OiZbYS16QS1aMC05XzpcXFxcLi1dKzspXCJcbiAgICAgICAgfV0sXG5cbiAgICAgICAgdGFnIDogW3tcbiAgICAgICAgICAgIHRva2VuIDogW1wibWV0YS50YWcucHVuY3R1YXRpb24udGFnLW9wZW4ueG1sXCIsIFwibWV0YS50YWcucHVuY3R1YXRpb24uZW5kLXRhZy1vcGVuLnhtbFwiLCBcIm1ldGEudGFnLnRhZy1uYW1lLnhtbFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPzooPCl8KDwvKSkoKD86XCIgKyB0YWdSZWdleCArIFwiOik/XCIgKyB0YWdSZWdleCArIFwiKVwiLFxuICAgICAgICAgICAgbmV4dDogW1xuICAgICAgICAgICAgICAgIHtpbmNsdWRlIDogXCJhdHRyaWJ1dGVzXCJ9LFxuICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLWNsb3NlLnhtbFwiLCByZWdleCA6IFwiLz8+XCIsIG5leHQgOiBcInN0YXJ0XCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1dLFxuXG4gICAgICAgIHRhZ193aGl0ZXNwYWNlIDogW1xuICAgICAgICAgICAge3Rva2VuIDogXCJ0ZXh0LnRhZy13aGl0ZXNwYWNlLnhtbFwiLCByZWdleCA6IFwiXFxcXHMrXCJ9XG4gICAgICAgIF0sXG4gICAgICAgIC8vIGZvciBkb2N0eXBlIGFuZCBwcm9jZXNzaW5nIGluc3RydWN0aW9uc1xuICAgICAgICB3aGl0ZXNwYWNlIDogW1xuICAgICAgICAgICAge3Rva2VuIDogXCJ0ZXh0LndoaXRlc3BhY2UueG1sXCIsIHJlZ2V4IDogXCJcXFxccytcIn1cbiAgICAgICAgXSxcblxuICAgICAgICAvLyBmb3IgZG9jdHlwZSBhbmQgcHJvY2Vzc2luZyBpbnN0cnVjdGlvbnNcbiAgICAgICAgc3RyaW5nOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCInXCIsXG4gICAgICAgICAgICBwdXNoIDogW1xuICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLnhtbFwiLCByZWdleDogXCInXCIsIG5leHQ6IFwicG9wXCJ9LFxuICAgICAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcInN0cmluZy54bWxcIn1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogJ1wiJyxcbiAgICAgICAgICAgIHB1c2ggOiBbXG4gICAgICAgICAgICAgICAge3Rva2VuIDogXCJzdHJpbmcueG1sXCIsIHJlZ2V4OiAnXCInLCBuZXh0OiBcInBvcFwifSxcbiAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuIDogXCJzdHJpbmcueG1sXCJ9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1dLFxuXG4gICAgICAgIGF0dHJpYnV0ZXM6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwiZW50aXR5Lm90aGVyLmF0dHJpYnV0ZS1uYW1lLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiB0YWdSZWdleFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvci5hdHRyaWJ1dGUtZXF1YWxzLnhtbFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIj1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcInRhZ193aGl0ZXNwYWNlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCJhdHRyaWJ1dGVfdmFsdWVcIlxuICAgICAgICB9XSxcblxuICAgICAgICBhdHRyaWJ1dGVfdmFsdWU6IFt7XG4gICAgICAgICAgICB0b2tlbiA6IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCInXCIsXG4gICAgICAgICAgICBwdXNoIDogW1xuICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIiwgcmVnZXg6IFwiJ1wiLCBuZXh0OiBcInBvcFwifSxcbiAgICAgICAgICAgICAgICB7aW5jbHVkZSA6IFwiYXR0cl9yZWZlcmVuY2VcIn0sXG4gICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIn1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInN0cmluZy5hdHRyaWJ1dGUtdmFsdWUueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6ICdcIicsXG4gICAgICAgICAgICBwdXNoIDogW1xuICAgICAgICAgICAgICAgIHt0b2tlbiA6IFwic3RyaW5nLmF0dHJpYnV0ZS12YWx1ZS54bWxcIiwgcmVnZXg6ICdcIicsIG5leHQ6IFwicG9wXCJ9LFxuICAgICAgICAgICAgICAgIHtpbmNsdWRlIDogXCJhdHRyX3JlZmVyZW5jZVwifSxcbiAgICAgICAgICAgICAgICB7ZGVmYXVsdFRva2VuIDogXCJzdHJpbmcuYXR0cmlidXRlLXZhbHVlLnhtbFwifVxuICAgICAgICAgICAgXVxuICAgICAgICB9XVxuICAgIH07XG5cbiAgICBpZiAodGhpcy5jb25zdHJ1Y3RvciA9PT0gWG1sSGlnaGxpZ2h0UnVsZXMpXG4gICAgICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5lbWJlZFRhZ1J1bGVzID0gZnVuY3Rpb24oSGlnaGxpZ2h0UnVsZXMsIHByZWZpeCwgdGFnKXtcbiAgICAgICAgdGhpcy4kcnVsZXMudGFnLnVuc2hpZnQoe1xuICAgICAgICAgICAgdG9rZW4gOiBbXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctb3Blbi54bWxcIiwgXCJtZXRhLnRhZy5cIiArIHRhZyArIFwiLnRhZy1uYW1lLnhtbFwiXSxcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPCkoXCIgKyB0YWcgKyBcIig/PVxcXFxzfD58JCkpXCIsXG4gICAgICAgICAgICBuZXh0OiBbXG4gICAgICAgICAgICAgICAge2luY2x1ZGUgOiBcImF0dHJpYnV0ZXNcIn0sXG4gICAgICAgICAgICAgICAge3Rva2VuIDogXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctY2xvc2UueG1sXCIsIHJlZ2V4IDogXCIvPz5cIiwgbmV4dCA6IHByZWZpeCArIFwic3RhcnRcIn1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy4kcnVsZXNbdGFnICsgXCItZW5kXCJdID0gW1xuICAgICAgICAgICAge2luY2x1ZGUgOiBcImF0dHJpYnV0ZXNcIn0sXG4gICAgICAgICAgICB7dG9rZW4gOiBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1jbG9zZS54bWxcIiwgcmVnZXggOiBcIi8/PlwiLCAgbmV4dDogXCJzdGFydFwiLFxuICAgICAgICAgICAgICAgIG9uTWF0Y2ggOiBmdW5jdGlvbih2YWx1ZSwgY3VycmVudFN0YXRlLCBzdGFjaykge1xuICAgICAgICAgICAgICAgICAgICBzdGFjay5zcGxpY2UoMCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRva2VuO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgXTtcblxuICAgICAgICB0aGlzLmVtYmVkUnVsZXMoSGlnaGxpZ2h0UnVsZXMsIHByZWZpeCwgW3tcbiAgICAgICAgICAgIHRva2VuOiBbXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi5lbmQtdGFnLW9wZW4ueG1sXCIsIFwibWV0YS50YWcuXCIgKyB0YWcgKyBcIi50YWctbmFtZS54bWxcIl0sXG4gICAgICAgICAgICByZWdleCA6IFwiKDwvKShcIiArIHRhZyArIFwiKD89XFxcXHN8PnwkKSlcIixcbiAgICAgICAgICAgIG5leHQ6IHRhZyArIFwiLWVuZFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5jZGF0YS54bWxcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCI8XFxcXCFcXFxcW0NEQVRBXFxcXFtcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuY2RhdGEueG1sXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiXFxcXF1cXFxcXT5cIlxuICAgICAgICB9XSk7XG4gICAgfTtcblxufSkuY2FsbChUZXh0SGlnaGxpZ2h0UnVsZXMucHJvdG90eXBlKTtcblxub29wLmluaGVyaXRzKFhtbEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlhtbEhpZ2hsaWdodFJ1bGVzID0gWG1sSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=