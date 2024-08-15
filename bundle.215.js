"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[215],{

/***/ 40215:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var CsoundDocumentHighlightRules = (__webpack_require__(71908)/* .CsoundDocumentHighlightRules */ .b);

var Mode = function() {
    this.HighlightRules = CsoundDocumentHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/csound_document";
    this.snippetFileId = "ace/snippets/csound_document";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 71908:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);

var CsoundOrchestraHighlightRules = (__webpack_require__(13928)/* .CsoundOrchestraHighlightRules */ .f);
var CsoundScoreHighlightRules = (__webpack_require__(85189)/* .CsoundScoreHighlightRules */ .M);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var CsoundDocumentHighlightRules = function() {

    var orchestraHighlightRules = new CsoundOrchestraHighlightRules("csound-");
    var scoreHighlightRules = new CsoundScoreHighlightRules("csound-score-");

    this.$rules = {
        "start": [
            {
                token : ["meta.tag.punctuation.tag-open.csound-document", "entity.name.tag.begin.csound-document", "meta.tag.punctuation.tag-close.csound-document"],
                regex : /(<)(CsoundSynthesi[sz]er)(>)/,
                next  : "synthesizer"
            },
            {defaultToken : "text.csound-document"}
        ],

        "synthesizer": [
            {
                token : ["meta.tag.punctuation.end-tag-open.csound-document", "entity.name.tag.begin.csound-document", "meta.tag.punctuation.tag-close.csound-document"],
                regex : "(</)(CsoundSynthesi[sz]er)(>)",
                next  : "start"
            }, {
                token : ["meta.tag.punctuation.tag-open.csound-document", "entity.name.tag.begin.csound-document", "meta.tag.punctuation.tag-close.csound-document"],
                regex : "(<)(CsInstruments)(>)",
                next  : orchestraHighlightRules.embeddedRulePrefix + "start"
            }, {
                token : ["meta.tag.punctuation.tag-open.csound-document", "entity.name.tag.begin.csound-document", "meta.tag.punctuation.tag-close.csound-document"],
                regex : "(<)(CsScore)(>)",
                next  : scoreHighlightRules.embeddedRulePrefix + "start"
            }, {
                token : ["meta.tag.punctuation.tag-open.csound-document", "entity.name.tag.begin.csound-document", "meta.tag.punctuation.tag-close.csound-document"],
                regex : "(<)([Hh][Tt][Mm][Ll])(>)",
                next  : "html-start"
            }
        ]
    };

    this.embedRules(orchestraHighlightRules.getRules(), orchestraHighlightRules.embeddedRulePrefix, [{
        token : ["meta.tag.punctuation.end-tag-open.csound-document", "entity.name.tag.begin.csound-document", "meta.tag.punctuation.tag-close.csound-document"],
        regex : "(</)(CsInstruments)(>)",
        next  : "synthesizer"
    }]);
    this.embedRules(scoreHighlightRules.getRules(), scoreHighlightRules.embeddedRulePrefix, [{
        token : ["meta.tag.punctuation.end-tag-open.csound-document", "entity.name.tag.begin.csound-document", "meta.tag.punctuation.tag-close.csound-document"],
        regex : "(</)(CsScore)(>)",
        next  : "synthesizer"
    }]);
    this.embedRules(HtmlHighlightRules, "html-", [{
        token : ["meta.tag.punctuation.end-tag-open.csound-document", "entity.name.tag.begin.csound-document", "meta.tag.punctuation.tag-close.csound-document"],
        regex : "(</)([Hh][Tt][Mm][Ll])(>)",
        next  : "synthesizer"
    }]);

    this.normalizeRules();
};

oop.inherits(CsoundDocumentHighlightRules, TextHighlightRules);

exports.b = CsoundDocumentHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjIxNS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QixlQUFlLGlDQUFzQjtBQUNyQyxtQ0FBbUMsa0VBQXlFOztBQUU1RztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELFlBQVk7Ozs7Ozs7O0FDaEJDOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZOztBQUU5QixvQ0FBb0MsbUVBQTJFO0FBQy9HLGdDQUFnQywrREFBbUU7QUFDbkcseUJBQXlCLCtDQUFvRDtBQUM3RSx5QkFBeUIsd0RBQW9EOztBQUU3RTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixhQUFhO0FBQ2I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQSxTQUFvQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3NvdW5kX2RvY3VtZW50LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3NvdW5kX2RvY3VtZW50X2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIENzb3VuZERvY3VtZW50SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9jc291bmRfZG9jdW1lbnRfaGlnaGxpZ2h0X3J1bGVzXCIpLkNzb3VuZERvY3VtZW50SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IENzb3VuZERvY3VtZW50SGlnaGxpZ2h0UnVsZXM7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9jc291bmRfZG9jdW1lbnRcIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9jc291bmRfZG9jdW1lbnRcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcblxudmFyIENzb3VuZE9yY2hlc3RyYUhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vY3NvdW5kX29yY2hlc3RyYV9oaWdobGlnaHRfcnVsZXNcIikuQ3NvdW5kT3JjaGVzdHJhSGlnaGxpZ2h0UnVsZXM7XG52YXIgQ3NvdW5kU2NvcmVIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2Nzb3VuZF9zY29yZV9oaWdobGlnaHRfcnVsZXNcIikuQ3NvdW5kU2NvcmVIaWdobGlnaHRSdWxlcztcbnZhciBIdG1sSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9odG1sX2hpZ2hsaWdodF9ydWxlc1wiKS5IdG1sSGlnaGxpZ2h0UnVsZXM7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgQ3NvdW5kRG9jdW1lbnRIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIG9yY2hlc3RyYUhpZ2hsaWdodFJ1bGVzID0gbmV3IENzb3VuZE9yY2hlc3RyYUhpZ2hsaWdodFJ1bGVzKFwiY3NvdW5kLVwiKTtcbiAgICB2YXIgc2NvcmVIaWdobGlnaHRSdWxlcyA9IG5ldyBDc291bmRTY29yZUhpZ2hsaWdodFJ1bGVzKFwiY3NvdW5kLXNjb3JlLVwiKTtcblxuICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICBcInN0YXJ0XCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1vcGVuLmNzb3VuZC1kb2N1bWVudFwiLCBcImVudGl0eS5uYW1lLnRhZy5iZWdpbi5jc291bmQtZG9jdW1lbnRcIiwgXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctY2xvc2UuY3NvdW5kLWRvY3VtZW50XCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogLyg8KShDc291bmRTeW50aGVzaVtzel1lcikoPikvLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJzeW50aGVzaXplclwiXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwidGV4dC5jc291bmQtZG9jdW1lbnRcIn1cbiAgICAgICAgXSxcblxuICAgICAgICBcInN5bnRoZXNpemVyXCI6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcIm1ldGEudGFnLnB1bmN0dWF0aW9uLmVuZC10YWctb3Blbi5jc291bmQtZG9jdW1lbnRcIiwgXCJlbnRpdHkubmFtZS50YWcuYmVnaW4uY3NvdW5kLWRvY3VtZW50XCIsIFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLWNsb3NlLmNzb3VuZC1kb2N1bWVudFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKDwvKShDc291bmRTeW50aGVzaVtzel1lcikoPilcIixcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wibWV0YS50YWcucHVuY3R1YXRpb24udGFnLW9wZW4uY3NvdW5kLWRvY3VtZW50XCIsIFwiZW50aXR5Lm5hbWUudGFnLmJlZ2luLmNzb3VuZC1kb2N1bWVudFwiLCBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1jbG9zZS5jc291bmQtZG9jdW1lbnRcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIig8KShDc0luc3RydW1lbnRzKSg+KVwiLFxuICAgICAgICAgICAgICAgIG5leHQgIDogb3JjaGVzdHJhSGlnaGxpZ2h0UnVsZXMuZW1iZWRkZWRSdWxlUHJlZml4ICsgXCJzdGFydFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctb3Blbi5jc291bmQtZG9jdW1lbnRcIiwgXCJlbnRpdHkubmFtZS50YWcuYmVnaW4uY3NvdW5kLWRvY3VtZW50XCIsIFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLWNsb3NlLmNzb3VuZC1kb2N1bWVudFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiKDwpKENzU2NvcmUpKD4pXCIsXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBzY29yZUhpZ2hsaWdodFJ1bGVzLmVtYmVkZGVkUnVsZVByZWZpeCArIFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wibWV0YS50YWcucHVuY3R1YXRpb24udGFnLW9wZW4uY3NvdW5kLWRvY3VtZW50XCIsIFwiZW50aXR5Lm5hbWUudGFnLmJlZ2luLmNzb3VuZC1kb2N1bWVudFwiLCBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1jbG9zZS5jc291bmQtZG9jdW1lbnRcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIig8KShbSGhdW1R0XVtNbV1bTGxdKSg+KVwiLFxuICAgICAgICAgICAgICAgIG5leHQgIDogXCJodG1sLXN0YXJ0XCJcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG5cbiAgICB0aGlzLmVtYmVkUnVsZXMob3JjaGVzdHJhSGlnaGxpZ2h0UnVsZXMuZ2V0UnVsZXMoKSwgb3JjaGVzdHJhSGlnaGxpZ2h0UnVsZXMuZW1iZWRkZWRSdWxlUHJlZml4LCBbe1xuICAgICAgICB0b2tlbiA6IFtcIm1ldGEudGFnLnB1bmN0dWF0aW9uLmVuZC10YWctb3Blbi5jc291bmQtZG9jdW1lbnRcIiwgXCJlbnRpdHkubmFtZS50YWcuYmVnaW4uY3NvdW5kLWRvY3VtZW50XCIsIFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLWNsb3NlLmNzb3VuZC1kb2N1bWVudFwiXSxcbiAgICAgICAgcmVnZXggOiBcIig8LykoQ3NJbnN0cnVtZW50cykoPilcIixcbiAgICAgICAgbmV4dCAgOiBcInN5bnRoZXNpemVyXCJcbiAgICB9XSk7XG4gICAgdGhpcy5lbWJlZFJ1bGVzKHNjb3JlSGlnaGxpZ2h0UnVsZXMuZ2V0UnVsZXMoKSwgc2NvcmVIaWdobGlnaHRSdWxlcy5lbWJlZGRlZFJ1bGVQcmVmaXgsIFt7XG4gICAgICAgIHRva2VuIDogW1wibWV0YS50YWcucHVuY3R1YXRpb24uZW5kLXRhZy1vcGVuLmNzb3VuZC1kb2N1bWVudFwiLCBcImVudGl0eS5uYW1lLnRhZy5iZWdpbi5jc291bmQtZG9jdW1lbnRcIiwgXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctY2xvc2UuY3NvdW5kLWRvY3VtZW50XCJdLFxuICAgICAgICByZWdleCA6IFwiKDwvKShDc1Njb3JlKSg+KVwiLFxuICAgICAgICBuZXh0ICA6IFwic3ludGhlc2l6ZXJcIlxuICAgIH1dKTtcbiAgICB0aGlzLmVtYmVkUnVsZXMoSHRtbEhpZ2hsaWdodFJ1bGVzLCBcImh0bWwtXCIsIFt7XG4gICAgICAgIHRva2VuIDogW1wibWV0YS50YWcucHVuY3R1YXRpb24uZW5kLXRhZy1vcGVuLmNzb3VuZC1kb2N1bWVudFwiLCBcImVudGl0eS5uYW1lLnRhZy5iZWdpbi5jc291bmQtZG9jdW1lbnRcIiwgXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctY2xvc2UuY3NvdW5kLWRvY3VtZW50XCJdLFxuICAgICAgICByZWdleCA6IFwiKDwvKShbSGhdW1R0XVtNbV1bTGxdKSg+KVwiLFxuICAgICAgICBuZXh0ICA6IFwic3ludGhlc2l6ZXJcIlxuICAgIH1dKTtcblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhDc291bmREb2N1bWVudEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkNzb3VuZERvY3VtZW50SGlnaGxpZ2h0UnVsZXMgPSBDc291bmREb2N1bWVudEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9