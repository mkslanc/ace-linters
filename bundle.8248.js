"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8248],{

/***/ 18248:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var CsoundDocumentHighlightRules = (__webpack_require__(62118)/* .CsoundDocumentHighlightRules */ .o);

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

/***/ 62118:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);

var CsoundOrchestraHighlightRules = (__webpack_require__(70163)/* .CsoundOrchestraHighlightRules */ .e);
var CsoundScoreHighlightRules = (__webpack_require__(53112)/* .CsoundScoreHighlightRules */ .U);
var HtmlHighlightRules = (__webpack_require__(72843)/* .HtmlHighlightRules */ .V);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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

exports.o = CsoundDocumentHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjgyNDguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsbUNBQW1DLGtFQUF5RTs7QUFFNUc7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQ2hCQzs7QUFFYixVQUFVLG1CQUFPLENBQUMsS0FBWTs7QUFFOUIsb0NBQW9DLG1FQUEyRTtBQUMvRyxnQ0FBZ0MsK0RBQW1FO0FBQ25HLHlCQUF5Qix3REFBb0Q7QUFDN0UseUJBQXlCLHdEQUFvRDs7QUFFN0U7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7O0FBRUEsU0FBb0MiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2Nzb3VuZF9kb2N1bWVudC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2Nzb3VuZF9kb2N1bWVudF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBDc291bmREb2N1bWVudEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vY3NvdW5kX2RvY3VtZW50X2hpZ2hsaWdodF9ydWxlc1wiKS5Dc291bmREb2N1bWVudEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBDc291bmREb2N1bWVudEhpZ2hsaWdodFJ1bGVzO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvY3NvdW5kX2RvY3VtZW50XCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvY3NvdW5kX2RvY3VtZW50XCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG5cbnZhciBDc291bmRPcmNoZXN0cmFIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2Nzb3VuZF9vcmNoZXN0cmFfaGlnaGxpZ2h0X3J1bGVzXCIpLkNzb3VuZE9yY2hlc3RyYUhpZ2hsaWdodFJ1bGVzO1xudmFyIENzb3VuZFNjb3JlSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9jc291bmRfc2NvcmVfaGlnaGxpZ2h0X3J1bGVzXCIpLkNzb3VuZFNjb3JlSGlnaGxpZ2h0UnVsZXM7XG52YXIgSHRtbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vaHRtbF9oaWdobGlnaHRfcnVsZXNcIikuSHRtbEhpZ2hsaWdodFJ1bGVzO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIENzb3VuZERvY3VtZW50SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcblxuICAgIHZhciBvcmNoZXN0cmFIaWdobGlnaHRSdWxlcyA9IG5ldyBDc291bmRPcmNoZXN0cmFIaWdobGlnaHRSdWxlcyhcImNzb3VuZC1cIik7XG4gICAgdmFyIHNjb3JlSGlnaGxpZ2h0UnVsZXMgPSBuZXcgQ3NvdW5kU2NvcmVIaWdobGlnaHRSdWxlcyhcImNzb3VuZC1zY29yZS1cIik7XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctb3Blbi5jc291bmQtZG9jdW1lbnRcIiwgXCJlbnRpdHkubmFtZS50YWcuYmVnaW4uY3NvdW5kLWRvY3VtZW50XCIsIFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLWNsb3NlLmNzb3VuZC1kb2N1bWVudFwiXSxcbiAgICAgICAgICAgICAgICByZWdleCA6IC8oPCkoQ3NvdW5kU3ludGhlc2lbc3pdZXIpKD4pLyxcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwic3ludGhlc2l6ZXJcIlxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtkZWZhdWx0VG9rZW4gOiBcInRleHQuY3NvdW5kLWRvY3VtZW50XCJ9XG4gICAgICAgIF0sXG5cbiAgICAgICAgXCJzeW50aGVzaXplclwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBbXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi5lbmQtdGFnLW9wZW4uY3NvdW5kLWRvY3VtZW50XCIsIFwiZW50aXR5Lm5hbWUudGFnLmJlZ2luLmNzb3VuZC1kb2N1bWVudFwiLCBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1jbG9zZS5jc291bmQtZG9jdW1lbnRcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIig8LykoQ3NvdW5kU3ludGhlc2lbc3pdZXIpKD4pXCIsXG4gICAgICAgICAgICAgICAgbmV4dCAgOiBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1vcGVuLmNzb3VuZC1kb2N1bWVudFwiLCBcImVudGl0eS5uYW1lLnRhZy5iZWdpbi5jc291bmQtZG9jdW1lbnRcIiwgXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctY2xvc2UuY3NvdW5kLWRvY3VtZW50XCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPCkoQ3NJbnN0cnVtZW50cykoPilcIixcbiAgICAgICAgICAgICAgICBuZXh0ICA6IG9yY2hlc3RyYUhpZ2hsaWdodFJ1bGVzLmVtYmVkZGVkUnVsZVByZWZpeCArIFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuIDogW1wibWV0YS50YWcucHVuY3R1YXRpb24udGFnLW9wZW4uY3NvdW5kLWRvY3VtZW50XCIsIFwiZW50aXR5Lm5hbWUudGFnLmJlZ2luLmNzb3VuZC1kb2N1bWVudFwiLCBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1jbG9zZS5jc291bmQtZG9jdW1lbnRcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIig8KShDc1Njb3JlKSg+KVwiLFxuICAgICAgICAgICAgICAgIG5leHQgIDogc2NvcmVIaWdobGlnaHRSdWxlcy5lbWJlZGRlZFJ1bGVQcmVmaXggKyBcInN0YXJ0XCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFtcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1vcGVuLmNzb3VuZC1kb2N1bWVudFwiLCBcImVudGl0eS5uYW1lLnRhZy5iZWdpbi5jc291bmQtZG9jdW1lbnRcIiwgXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi50YWctY2xvc2UuY3NvdW5kLWRvY3VtZW50XCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPCkoW0hoXVtUdF1bTW1dW0xsXSkoPilcIixcbiAgICAgICAgICAgICAgICBuZXh0ICA6IFwiaHRtbC1zdGFydFwiXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuXG4gICAgdGhpcy5lbWJlZFJ1bGVzKG9yY2hlc3RyYUhpZ2hsaWdodFJ1bGVzLmdldFJ1bGVzKCksIG9yY2hlc3RyYUhpZ2hsaWdodFJ1bGVzLmVtYmVkZGVkUnVsZVByZWZpeCwgW3tcbiAgICAgICAgdG9rZW4gOiBbXCJtZXRhLnRhZy5wdW5jdHVhdGlvbi5lbmQtdGFnLW9wZW4uY3NvdW5kLWRvY3VtZW50XCIsIFwiZW50aXR5Lm5hbWUudGFnLmJlZ2luLmNzb3VuZC1kb2N1bWVudFwiLCBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1jbG9zZS5jc291bmQtZG9jdW1lbnRcIl0sXG4gICAgICAgIHJlZ2V4IDogXCIoPC8pKENzSW5zdHJ1bWVudHMpKD4pXCIsXG4gICAgICAgIG5leHQgIDogXCJzeW50aGVzaXplclwiXG4gICAgfV0pO1xuICAgIHRoaXMuZW1iZWRSdWxlcyhzY29yZUhpZ2hsaWdodFJ1bGVzLmdldFJ1bGVzKCksIHNjb3JlSGlnaGxpZ2h0UnVsZXMuZW1iZWRkZWRSdWxlUHJlZml4LCBbe1xuICAgICAgICB0b2tlbiA6IFtcIm1ldGEudGFnLnB1bmN0dWF0aW9uLmVuZC10YWctb3Blbi5jc291bmQtZG9jdW1lbnRcIiwgXCJlbnRpdHkubmFtZS50YWcuYmVnaW4uY3NvdW5kLWRvY3VtZW50XCIsIFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLWNsb3NlLmNzb3VuZC1kb2N1bWVudFwiXSxcbiAgICAgICAgcmVnZXggOiBcIig8LykoQ3NTY29yZSkoPilcIixcbiAgICAgICAgbmV4dCAgOiBcInN5bnRoZXNpemVyXCJcbiAgICB9XSk7XG4gICAgdGhpcy5lbWJlZFJ1bGVzKEh0bWxIaWdobGlnaHRSdWxlcywgXCJodG1sLVwiLCBbe1xuICAgICAgICB0b2tlbiA6IFtcIm1ldGEudGFnLnB1bmN0dWF0aW9uLmVuZC10YWctb3Blbi5jc291bmQtZG9jdW1lbnRcIiwgXCJlbnRpdHkubmFtZS50YWcuYmVnaW4uY3NvdW5kLWRvY3VtZW50XCIsIFwibWV0YS50YWcucHVuY3R1YXRpb24udGFnLWNsb3NlLmNzb3VuZC1kb2N1bWVudFwiXSxcbiAgICAgICAgcmVnZXggOiBcIig8LykoW0hoXVtUdF1bTW1dW0xsXSkoPilcIixcbiAgICAgICAgbmV4dCAgOiBcInN5bnRoZXNpemVyXCJcbiAgICB9XSk7XG5cbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoQ3NvdW5kRG9jdW1lbnRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5Dc291bmREb2N1bWVudEhpZ2hsaWdodFJ1bGVzID0gQ3NvdW5kRG9jdW1lbnRIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==