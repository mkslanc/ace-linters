"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9646],{

/***/ 62718:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);

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


exports.c = DocCommentHighlightRules;


/***/ }),

/***/ 9646:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var EdifactHighlightRules = (__webpack_require__(12381)/* .EdifactHighlightRules */ .T);

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

/***/ 12381:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


    
    var oop = __webpack_require__(89359);
    var DocCommentHighlightRules = (__webpack_require__(62718)/* .DocCommentHighlightRules */ .c);
    var TextHighlightRules = (__webpack_require__(28053)/* .TextHighlightRules */ .K);
    
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
    
    exports.T = EdifactHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjk2NDYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLFNBQWdDOzs7Ozs7OztBQzdDbkI7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsNEJBQTRCLDJEQUEwRDs7QUFFdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsWUFBWTs7Ozs7Ozs7QUNsQkM7QUFDYjtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxLQUFZO0FBQ2xDLG1DQUFtQyw4REFBaUU7QUFDcEcsNkJBQTZCLHdEQUFvRDtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLFNBQTZCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9lZGlmYWN0LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZWRpZmFjdF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQuZG9jLnRhZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIkBcXFxcdysoPz1cXFxcc3wkKVwiXG4gICAgICAgICAgICB9LCBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSgpLCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnQuZG9jLmJvZHlcIixcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSA9IGZ1bmN0aW9uKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jLnRhZy5zdG9yYWdlLnR5cGVcIixcbiAgICAgICAgcmVnZXggOiBcIlxcXFxiKD86VE9ET3xGSVhNRXxYWFh8SEFDSylcXFxcYlwiXG4gICAgfTtcbn07XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRTdGFydFJ1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBkb2MgY29tbWVudFxuICAgICAgICByZWdleDogL1xcL1xcKlxcKig/IVxcLykvLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cbkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcy5nZXRFbmRSdWxlID0gZnVuY3Rpb24gKHN0YXJ0KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgdG9rZW4gOiBcImNvbW1lbnQuZG9jXCIsIC8vIGNsb3NpbmcgY29tbWVudFxuICAgICAgICByZWdleCA6IFwiXFxcXCpcXFxcL1wiLFxuICAgICAgICBuZXh0ICA6IHN0YXJ0XG4gICAgfTtcbn07XG5cblxuZXhwb3J0cy5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIEVkaWZhY3RIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2VkaWZhY3RfaGlnaGxpZ2h0X3J1bGVzXCIpLkVkaWZhY3RIaWdobGlnaHRSdWxlcztcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgIFxuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBFZGlmYWN0SGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2VkaWZhY3RcIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9lZGlmYWN0XCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuICAgIFxuICAgIHZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbiAgICB2YXIgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vZG9jX2NvbW1lbnRfaGlnaGxpZ2h0X3J1bGVzXCIpLkRvY0NvbW1lbnRIaWdobGlnaHRSdWxlcztcbiAgICB2YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuICAgIFxuICAgIHZhciBFZGlmYWN0SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBcbiAgICAgICAgdmFyIGhlYWRlciA9IChcbiAgICAgICAgICAgIFwiVU5IXCJcbiAgICAgICAgKTtcbiAgICAgICAgdmFyIHNlZ21lbnQgPSAoXG4gICAgICAgICAgICBcIkFEUnxBR1J8QUpUfEFMQ3xBTEl8QVBQfEFQUnxBUkR8QVJSfEFTSXxBVFR8QVVUfFwiK1xuICAgICAgICAgICAgXCJCQVN8QkdNfEJJSXxCVVN8XCIrXG4gICAgICAgICAgICBcIkNBVnxDQ0R8Q0NJfENESXxDRFN8Q0RWfENFRHxDSU58Q0xBfENMSXxDTVB8Q05JfENOVHxDT0R8Q09NfENPVHxDUEl8Q1BTfENQVHxDU1R8Q1RBfENVWHxcIitcbiAgICAgICAgICAgIFwiREFNfERGTnxER1N8RElJfERJTXxETEl8RExNfERNU3xET0N8RFJEfERTR3xEU0l8RFRNfFwiK1xuICAgICAgICAgICAgXCJFRFR8RUZJfEVMTXxFTFV8RUxWfEVNUHxFUUF8RVFEfEVRTnxFUkN8RVJQfEVWRXxGQ0F8RklJfEZOU3xGTlR8Rk9SfEZTUXxGVFh8XCIrXG4gICAgICAgICAgICBcIkdEU3xHRUl8R0lEfEdJTnxHSVJ8R09SfEdQT3xHUlV8SEFOfEhZTnxJQ0R8SURFfElGRHxJSEN8SU1EfElORHxJTlB8SU5WfElSUXxcIitcbiAgICAgICAgICAgIFwiTEFOfExJTnxMT0N8TUVBfE1FTXxNS1N8TU9BfE1TR3xNVER8TkFEfE5BVHxcIitcbiAgICAgICAgICAgIFwiUEFDfFBBSXxQQVN8UENDfFBDRHxQQ0l8UERJfFBFUnxQR0l8UElBfFBOQXxQT0N8UFJDfFBSSXxQUlZ8UFNEfFBUWXxQWVR8XCIrXG4gICAgICAgICAgICBcIlFSU3xRVFl8UVVBfFFWUnxcIitcbiAgICAgICAgICAgIFwiUkNTfFJFTHxSRkZ8UkpMfFJOR3xST0R8UlNMfFJURXxcIitcbiAgICAgICAgICAgIFwiU0FMfFNDQ3xTQ0R8U0VHfFNFTHxTRVF8U0ZJfFNHUHxTR1V8U1BSfFNQU3xTVEF8U1RDfFNUR3xTVFN8XCIrXG4gICAgICAgICAgICBcIlRBWHxUQ0N8VERUfFRFTXxUTUR8VE1QfFRPRHxUUEx8VFJVfFRTUnxcIitcbiAgICAgICAgICAgIFwiVU5CfFVOWnxVTlR8VUdIfFVHVHxVTlN8XCIrXG4gICAgICAgICAgICBcIlZMSVwiXG4gICAgICAgICk7XG4gICAgXG4gICAgICAgIHZhciBoZWFkZXIgPSAoXG4gICAgICAgICAgICBcIlVOSFwiXG4gICAgICAgICk7XG4gICAgXG4gICAgICAgIHZhciBidWlsZGluQ29uc3RhbnRzID0gKFwibnVsbHxJbmZpbml0eXxOYU58dW5kZWZpbmVkXCIpO1xuICAgICAgICB2YXIgbGFuZ0NsYXNzZXMgPSAoXG4gICAgICAgICAgICBcIlwiXG4gICAgICAgICk7XG4gICAgXG4gICAgICAgIHZhciBrZXl3b3JkcyA9IChcbiAgICAgICAgICAgIFwiQll8U0V8T058SU5WfEpQfFVOT0FcIlxuICAgICAgICApO1xuICAgIFxuICAgICAgICB2YXIga2V5d29yZE1hcHBlciA9IHRoaXMuY3JlYXRlS2V5d29yZE1hcHBlcih7XG4gICAgICAgICAgICBcInZhcmlhYmxlLmxhbmd1YWdlXCI6IFwidGhpc1wiLFxuICAgICAgICAgICAgXCJrZXl3b3JkXCI6IGtleXdvcmRzLFxuICAgICAgICAgICAgXCJlbnRpdHkubmFtZS5zZWdtZW50XCI6c2VnbWVudCxcbiAgICAgICAgICAgIFwiZW50aXR5Lm5hbWUuaGVhZGVyXCI6aGVhZGVyLFxuICAgICAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBidWlsZGluQ29uc3RhbnRzLFxuICAgICAgICAgICAgXCJzdXBwb3J0LmZ1bmN0aW9uXCI6IGxhbmdDbGFzc2VzXG4gICAgICAgIH0sIFwiaWRlbnRpZmllclwiKTtcbiAgICBcbiAgICAgICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgICAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG4gICAgXG4gICAgICAgIHRoaXMuJHJ1bGVzID0ge1xuICAgICAgICAgICAgXCJzdGFydFwiIDogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcKy5cXFxcK1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubGFuZ3VhZ2UuYm9vbGVhblwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiKD86dHJ1ZXxmYWxzZSlcXFxcYlwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IGtleXdvcmRNYXBwZXIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJbYS16QS1aXyRdW2EtekEtWjAtOV8kXSpcXFxcYlwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICB0b2tlbiA6IFwia2V5d29yZC5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCtcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcOnwnXCJcbiAgICAgICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImlkZW50aWZpZXJcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFw6RFxcXFw6XCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH07XG4gICAgXG4gICAgICAgIHRoaXMuZW1iZWRSdWxlcyhEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMsIFwiZG9jLVwiLFxuICAgICAgICAgICAgWyBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZShcInN0YXJ0XCIpIF0pO1xuICAgIH07XG4gICAgXG4gICAgRWRpZmFjdEhpZ2hsaWdodFJ1bGVzLm1ldGFEYXRhID0geyBmaWxlVHlwZXM6IFsgJ2VkaScgXSxcbiAgICAgICAgICBrZXlFcXVpdmFsZW50OiAnXn5FJyxcbiAgICAgICAgICBuYW1lOiAnRWRpZmFjdCcsXG4gICAgICAgICAgc2NvcGVOYW1lOiAnc291cmNlLmVkaWZhY3QnIH07XG4gICAgXG4gICAgb29wLmluaGVyaXRzKEVkaWZhY3RIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcbiAgICBcbiAgICBleHBvcnRzLkVkaWZhY3RIaWdobGlnaHRSdWxlcyA9IEVkaWZhY3RIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==