"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[261],{

/***/ 42124:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var DocCommentHighlightRules = function () {
    this.$rules = {
        "start": [
            {
                token: "comment.doc.tag",
                regex: "@\\w+(?=\\s|$)"
            }, DocCommentHighlightRules.getTagRule(), {
                defaultToken: "comment.doc.body",
                caseInsensitive: true
            }
        ]
    };
};

oop.inherits(DocCommentHighlightRules, TextHighlightRules);

DocCommentHighlightRules.getTagRule = function(start) {
    return {
        token : "comment.doc.tag.storage.type",
        regex : "\\b(?:TODO|FIXME|XXX|HACK)\\b"
    };
};

DocCommentHighlightRules.getStartRule = function(start) {
    return {
        token : "comment.doc", // doc comment
        regex: /\/\*\*(?!\/)/,
        next  : start
    };
};

DocCommentHighlightRules.getEndRule = function (start) {
    return {
        token : "comment.doc", // closing comment
        regex : "\\*\\/",
        next  : start
    };
};


exports.l = DocCommentHighlightRules;


/***/ }),

/***/ 50261:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var EdifactHighlightRules = (__webpack_require__(74002)/* .EdifactHighlightRules */ .m);

var Mode = function() {
   
    this.HighlightRules = EdifactHighlightRules;
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/edifact";
    this.snippetFileId = "ace/snippets/edifact";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 74002:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


    
    var oop = __webpack_require__(2645);
    var DocCommentHighlightRules = (__webpack_require__(42124)/* .DocCommentHighlightRules */ .l);
    var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);
    
    var EdifactHighlightRules = function() {
    
        var header = (
            "UNH"
        );
        var segment = (
            "ADR|AGR|AJT|ALC|ALI|APP|APR|ARD|ARR|ASI|ATT|AUT|"+
            "BAS|BGM|BII|BUS|"+
            "CAV|CCD|CCI|CDI|CDS|CDV|CED|CIN|CLA|CLI|CMP|CNI|CNT|COD|COM|COT|CPI|CPS|CPT|CST|CTA|CUX|"+
            "DAM|DFN|DGS|DII|DIM|DLI|DLM|DMS|DOC|DRD|DSG|DSI|DTM|"+
            "EDT|EFI|ELM|ELU|ELV|EMP|EQA|EQD|EQN|ERC|ERP|EVE|FCA|FII|FNS|FNT|FOR|FSQ|FTX|"+
            "GDS|GEI|GID|GIN|GIR|GOR|GPO|GRU|HAN|HYN|ICD|IDE|IFD|IHC|IMD|IND|INP|INV|IRQ|"+
            "LAN|LIN|LOC|MEA|MEM|MKS|MOA|MSG|MTD|NAD|NAT|"+
            "PAC|PAI|PAS|PCC|PCD|PCI|PDI|PER|PGI|PIA|PNA|POC|PRC|PRI|PRV|PSD|PTY|PYT|"+
            "QRS|QTY|QUA|QVR|"+
            "RCS|REL|RFF|RJL|RNG|ROD|RSL|RTE|"+
            "SAL|SCC|SCD|SEG|SEL|SEQ|SFI|SGP|SGU|SPR|SPS|STA|STC|STG|STS|"+
            "TAX|TCC|TDT|TEM|TMD|TMP|TOD|TPL|TRU|TSR|"+
            "UNB|UNZ|UNT|UGH|UGT|UNS|"+
            "VLI"
        );
    
        var header = (
            "UNH"
        );
    
        var buildinConstants = ("null|Infinity|NaN|undefined");
        var langClasses = (
            ""
        );
    
        var keywords = (
            "BY|SE|ON|INV|JP|UNOA"
        );
    
        var keywordMapper = this.createKeywordMapper({
            "variable.language": "this",
            "keyword": keywords,
            "entity.name.segment":segment,
            "entity.name.header":header,
            "constant.language": buildinConstants,
            "support.function": langClasses
        }, "identifier");
    
        // regexp must not have capturing parentheses. Use (?:) instead.
        // regexps are ordered -> the first match is used
    
        this.$rules = {
            "start" : [
                {
                    token : "punctuation.operator",
                    regex : "\\+.\\+"
                }, {
                    token : "constant.language.boolean",
                    regex : "(?:true|false)\\b"
                }, {
                    token : keywordMapper,
                    regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
                }, {
                    token : "keyword.operator",
                    regex : "\\+"
                }, {
                    token : "punctuation.operator",
                    regex : "\\:|'"
                },{
                    token : "identifier",
                    regex : "\\:D\\:"
                }
            ]
        };
    
        this.embedRules(DocCommentHighlightRules, "doc-",
            [ DocCommentHighlightRules.getEndRule("start") ]);
    };
    
    EdifactHighlightRules.metaData = { fileTypes: [ 'edi' ],
          keyEquivalent: '^~E',
          name: 'Edifact',
          scopeName: 'source.edifact' };
    
    oop.inherits(EdifactHighlightRules, TextHighlightRules);
    
    exports.m = EdifactHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjI2MS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5Qix5QkFBeUIsd0RBQW9EOztBQUU3RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0EsU0FBZ0M7Ozs7Ozs7O0FDN0NuQjs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QixlQUFlLGlDQUFzQjtBQUNyQyw0QkFBNEIsMkRBQTBEOztBQUV0RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQ2xCQztBQUNiO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLElBQVk7QUFDbEMsbUNBQW1DLDhEQUFpRTtBQUNwRyw2QkFBNkIsd0RBQW9EO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksU0FBNkIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2VkaWZhY3QuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9lZGlmYWN0X2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5kb2MudGFnXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiQFxcXFx3Kyg/PVxcXFxzfCQpXCJcbiAgICAgICAgICAgIH0sIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRUYWdSdWxlKCksIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudC5kb2MuYm9keVwiLFxuICAgICAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICBdXG4gICAgfTtcbn07XG5cbm9vcC5pbmhlcml0cyhEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRUYWdSdWxlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2MudGFnLnN0b3JhZ2UudHlwZVwiLFxuICAgICAgICByZWdleCA6IFwiXFxcXGIoPzpUT0RPfEZJWE1FfFhYWHxIQUNLKVxcXFxiXCJcbiAgICB9O1xufTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFN0YXJ0UnVsZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jXCIsIC8vIGRvYyBjb21tZW50XG4gICAgICAgIHJlZ2V4OiAvXFwvXFwqXFwqKD8hXFwvKS8sXG4gICAgICAgIG5leHQgIDogc3RhcnRcbiAgICB9O1xufTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldEVuZFJ1bGUgPSBmdW5jdGlvbiAoc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gY2xvc2luZyBjb21tZW50XG4gICAgICAgIHJlZ2V4IDogXCJcXFxcKlxcXFwvXCIsXG4gICAgICAgIG5leHQgIDogc3RhcnRcbiAgICB9O1xufTtcblxuXG5leHBvcnRzLkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgRWRpZmFjdEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZWRpZmFjdF9oaWdobGlnaHRfcnVsZXNcIikuRWRpZmFjdEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgXG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IEVkaWZhY3RIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvZWRpZmFjdFwiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL2VkaWZhY3RcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4gICAgXG4gICAgdmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xuICAgIHZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXNcIikuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xuICAgIHZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG4gICAgXG4gICAgdmFyIEVkaWZhY3RIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIFxuICAgICAgICB2YXIgaGVhZGVyID0gKFxuICAgICAgICAgICAgXCJVTkhcIlxuICAgICAgICApO1xuICAgICAgICB2YXIgc2VnbWVudCA9IChcbiAgICAgICAgICAgIFwiQURSfEFHUnxBSlR8QUxDfEFMSXxBUFB8QVBSfEFSRHxBUlJ8QVNJfEFUVHxBVVR8XCIrXG4gICAgICAgICAgICBcIkJBU3xCR018QklJfEJVU3xcIitcbiAgICAgICAgICAgIFwiQ0FWfENDRHxDQ0l8Q0RJfENEU3xDRFZ8Q0VEfENJTnxDTEF8Q0xJfENNUHxDTkl8Q05UfENPRHxDT018Q09UfENQSXxDUFN8Q1BUfENTVHxDVEF8Q1VYfFwiK1xuICAgICAgICAgICAgXCJEQU18REZOfERHU3xESUl8RElNfERMSXxETE18RE1TfERPQ3xEUkR8RFNHfERTSXxEVE18XCIrXG4gICAgICAgICAgICBcIkVEVHxFRkl8RUxNfEVMVXxFTFZ8RU1QfEVRQXxFUUR8RVFOfEVSQ3xFUlB8RVZFfEZDQXxGSUl8Rk5TfEZOVHxGT1J8RlNRfEZUWHxcIitcbiAgICAgICAgICAgIFwiR0RTfEdFSXxHSUR8R0lOfEdJUnxHT1J8R1BPfEdSVXxIQU58SFlOfElDRHxJREV8SUZEfElIQ3xJTUR8SU5EfElOUHxJTlZ8SVJRfFwiK1xuICAgICAgICAgICAgXCJMQU58TElOfExPQ3xNRUF8TUVNfE1LU3xNT0F8TVNHfE1URHxOQUR8TkFUfFwiK1xuICAgICAgICAgICAgXCJQQUN8UEFJfFBBU3xQQ0N8UENEfFBDSXxQREl8UEVSfFBHSXxQSUF8UE5BfFBPQ3xQUkN8UFJJfFBSVnxQU0R8UFRZfFBZVHxcIitcbiAgICAgICAgICAgIFwiUVJTfFFUWXxRVUF8UVZSfFwiK1xuICAgICAgICAgICAgXCJSQ1N8UkVMfFJGRnxSSkx8Uk5HfFJPRHxSU0x8UlRFfFwiK1xuICAgICAgICAgICAgXCJTQUx8U0NDfFNDRHxTRUd8U0VMfFNFUXxTRkl8U0dQfFNHVXxTUFJ8U1BTfFNUQXxTVEN8U1RHfFNUU3xcIitcbiAgICAgICAgICAgIFwiVEFYfFRDQ3xURFR8VEVNfFRNRHxUTVB8VE9EfFRQTHxUUlV8VFNSfFwiK1xuICAgICAgICAgICAgXCJVTkJ8VU5afFVOVHxVR0h8VUdUfFVOU3xcIitcbiAgICAgICAgICAgIFwiVkxJXCJcbiAgICAgICAgKTtcbiAgICBcbiAgICAgICAgdmFyIGhlYWRlciA9IChcbiAgICAgICAgICAgIFwiVU5IXCJcbiAgICAgICAgKTtcbiAgICBcbiAgICAgICAgdmFyIGJ1aWxkaW5Db25zdGFudHMgPSAoXCJudWxsfEluZmluaXR5fE5hTnx1bmRlZmluZWRcIik7XG4gICAgICAgIHZhciBsYW5nQ2xhc3NlcyA9IChcbiAgICAgICAgICAgIFwiXCJcbiAgICAgICAgKTtcbiAgICBcbiAgICAgICAgdmFyIGtleXdvcmRzID0gKFxuICAgICAgICAgICAgXCJCWXxTRXxPTnxJTlZ8SlB8VU5PQVwiXG4gICAgICAgICk7XG4gICAgXG4gICAgICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgICAgIFwidmFyaWFibGUubGFuZ3VhZ2VcIjogXCJ0aGlzXCIsXG4gICAgICAgICAgICBcImtleXdvcmRcIjoga2V5d29yZHMsXG4gICAgICAgICAgICBcImVudGl0eS5uYW1lLnNlZ21lbnRcIjpzZWdtZW50LFxuICAgICAgICAgICAgXCJlbnRpdHkubmFtZS5oZWFkZXJcIjpoZWFkZXIsXG4gICAgICAgICAgICBcImNvbnN0YW50Lmxhbmd1YWdlXCI6IGJ1aWxkaW5Db25zdGFudHMsXG4gICAgICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogbGFuZ0NsYXNzZXNcbiAgICAgICAgfSwgXCJpZGVudGlmaWVyXCIpO1xuICAgIFxuICAgICAgICAvLyByZWdleHAgbXVzdCBub3QgaGF2ZSBjYXB0dXJpbmcgcGFyZW50aGVzZXMuIFVzZSAoPzopIGluc3RlYWQuXG4gICAgICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcbiAgICBcbiAgICAgICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgICAgICBcInN0YXJ0XCIgOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwrLlxcXFwrXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5sYW5ndWFnZS5ib29sZWFuXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIoPzp0cnVlfGZhbHNlKVxcXFxiXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlthLXpBLVpfJF1bYS16QS1aMC05XyRdKlxcXFxiXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcK1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFw6fCdcIlxuICAgICAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwiaWRlbnRpZmllclwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXDpEXFxcXDpcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfTtcbiAgICBcbiAgICAgICAgdGhpcy5lbWJlZFJ1bGVzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgXCJkb2MtXCIsXG4gICAgICAgICAgICBbIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlKFwic3RhcnRcIikgXSk7XG4gICAgfTtcbiAgICBcbiAgICBFZGlmYWN0SGlnaGxpZ2h0UnVsZXMubWV0YURhdGEgPSB7IGZpbGVUeXBlczogWyAnZWRpJyBdLFxuICAgICAgICAgIGtleUVxdWl2YWxlbnQ6ICdefkUnLFxuICAgICAgICAgIG5hbWU6ICdFZGlmYWN0JyxcbiAgICAgICAgICBzY29wZU5hbWU6ICdzb3VyY2UuZWRpZmFjdCcgfTtcbiAgICBcbiAgICBvb3AuaW5oZXJpdHMoRWRpZmFjdEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuICAgIFxuICAgIGV4cG9ydHMuRWRpZmFjdEhpZ2hsaWdodFJ1bGVzID0gRWRpZmFjdEhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9