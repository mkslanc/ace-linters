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
                defaultToken: "comment.doc",
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
        regex : "\\/\\*(?=\\*)",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjk2NDYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIseUJBQXlCLHdEQUFvRDs7QUFFN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLFNBQWdDOzs7Ozs7OztBQzdDbkI7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsNEJBQTRCLDJEQUEwRDs7QUFFdEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsWUFBWTs7Ozs7Ozs7QUNsQkM7QUFDYjtBQUNBLGNBQWMsbUJBQU8sQ0FBQyxLQUFZO0FBQ2xDLG1DQUFtQyw4REFBaUU7QUFDcEcsNkJBQTZCLHdEQUFvRDtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJLFNBQTZCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9kb2NfY29tbWVudF9oaWdobGlnaHRfcnVsZXMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9lZGlmYWN0LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZWRpZmFjdF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIjogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQuZG9jLnRhZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIkBcXFxcdysoPz1cXFxcc3wkKVwiXG4gICAgICAgICAgICB9LCBEb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0VGFnUnVsZSgpLCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnQuZG9jXCIsXG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xufTtcblxub29wLmluaGVyaXRzKERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldFRhZ1J1bGUgPSBmdW5jdGlvbihzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvYy50YWcuc3RvcmFnZS50eXBlXCIsXG4gICAgICAgIHJlZ2V4IDogXCJcXFxcYig/OlRPRE98RklYTUV8WFhYfEhBQ0spXFxcXGJcIlxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0U3RhcnRSdWxlID0gZnVuY3Rpb24oc3RhcnQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbiA6IFwiY29tbWVudC5kb2NcIiwgLy8gZG9jIGNvbW1lbnRcbiAgICAgICAgcmVnZXggOiBcIlxcXFwvXFxcXCooPz1cXFxcKilcIixcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXMuZ2V0RW5kUnVsZSA9IGZ1bmN0aW9uIChzdGFydCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHRva2VuIDogXCJjb21tZW50LmRvY1wiLCAvLyBjbG9zaW5nIGNvbW1lbnRcbiAgICAgICAgcmVnZXggOiBcIlxcXFwqXFxcXC9cIixcbiAgICAgICAgbmV4dCAgOiBzdGFydFxuICAgIH07XG59O1xuXG5cbmV4cG9ydHMuRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzID0gRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBFZGlmYWN0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9lZGlmYWN0X2hpZ2hsaWdodF9ydWxlc1wiKS5FZGlmYWN0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICBcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gRWRpZmFjdEhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IHRoaXMuJGRlZmF1bHRCZWhhdmlvdXI7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9lZGlmYWN0XCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvZWRpZmFjdFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcbiAgICBcbiAgICB2YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG4gICAgdmFyIERvY0NvbW1lbnRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2RvY19jb21tZW50X2hpZ2hsaWdodF9ydWxlc1wiKS5Eb2NDb21tZW50SGlnaGxpZ2h0UnVsZXM7XG4gICAgdmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcbiAgICBcbiAgICB2YXIgRWRpZmFjdEhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgXG4gICAgICAgIHZhciBoZWFkZXIgPSAoXG4gICAgICAgICAgICBcIlVOSFwiXG4gICAgICAgICk7XG4gICAgICAgIHZhciBzZWdtZW50ID0gKFxuICAgICAgICAgICAgXCJBRFJ8QUdSfEFKVHxBTEN8QUxJfEFQUHxBUFJ8QVJEfEFSUnxBU0l8QVRUfEFVVHxcIitcbiAgICAgICAgICAgIFwiQkFTfEJHTXxCSUl8QlVTfFwiK1xuICAgICAgICAgICAgXCJDQVZ8Q0NEfENDSXxDREl8Q0RTfENEVnxDRUR8Q0lOfENMQXxDTEl8Q01QfENOSXxDTlR8Q09EfENPTXxDT1R8Q1BJfENQU3xDUFR8Q1NUfENUQXxDVVh8XCIrXG4gICAgICAgICAgICBcIkRBTXxERk58REdTfERJSXxESU18RExJfERMTXxETVN8RE9DfERSRHxEU0d8RFNJfERUTXxcIitcbiAgICAgICAgICAgIFwiRURUfEVGSXxFTE18RUxVfEVMVnxFTVB8RVFBfEVRRHxFUU58RVJDfEVSUHxFVkV8RkNBfEZJSXxGTlN8Rk5UfEZPUnxGU1F8RlRYfFwiK1xuICAgICAgICAgICAgXCJHRFN8R0VJfEdJRHxHSU58R0lSfEdPUnxHUE98R1JVfEhBTnxIWU58SUNEfElERXxJRkR8SUhDfElNRHxJTkR8SU5QfElOVnxJUlF8XCIrXG4gICAgICAgICAgICBcIkxBTnxMSU58TE9DfE1FQXxNRU18TUtTfE1PQXxNU0d8TVREfE5BRHxOQVR8XCIrXG4gICAgICAgICAgICBcIlBBQ3xQQUl8UEFTfFBDQ3xQQ0R8UENJfFBESXxQRVJ8UEdJfFBJQXxQTkF8UE9DfFBSQ3xQUkl8UFJWfFBTRHxQVFl8UFlUfFwiK1xuICAgICAgICAgICAgXCJRUlN8UVRZfFFVQXxRVlJ8XCIrXG4gICAgICAgICAgICBcIlJDU3xSRUx8UkZGfFJKTHxSTkd8Uk9EfFJTTHxSVEV8XCIrXG4gICAgICAgICAgICBcIlNBTHxTQ0N8U0NEfFNFR3xTRUx8U0VRfFNGSXxTR1B8U0dVfFNQUnxTUFN8U1RBfFNUQ3xTVEd8U1RTfFwiK1xuICAgICAgICAgICAgXCJUQVh8VENDfFREVHxURU18VE1EfFRNUHxUT0R8VFBMfFRSVXxUU1J8XCIrXG4gICAgICAgICAgICBcIlVOQnxVTlp8VU5UfFVHSHxVR1R8VU5TfFwiK1xuICAgICAgICAgICAgXCJWTElcIlxuICAgICAgICApO1xuICAgIFxuICAgICAgICB2YXIgaGVhZGVyID0gKFxuICAgICAgICAgICAgXCJVTkhcIlxuICAgICAgICApO1xuICAgIFxuICAgICAgICB2YXIgYnVpbGRpbkNvbnN0YW50cyA9IChcIm51bGx8SW5maW5pdHl8TmFOfHVuZGVmaW5lZFwiKTtcbiAgICAgICAgdmFyIGxhbmdDbGFzc2VzID0gKFxuICAgICAgICAgICAgXCJcIlxuICAgICAgICApO1xuICAgIFxuICAgICAgICB2YXIga2V5d29yZHMgPSAoXG4gICAgICAgICAgICBcIkJZfFNFfE9OfElOVnxKUHxVTk9BXCJcbiAgICAgICAgKTtcbiAgICBcbiAgICAgICAgdmFyIGtleXdvcmRNYXBwZXIgPSB0aGlzLmNyZWF0ZUtleXdvcmRNYXBwZXIoe1xuICAgICAgICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZVwiOiBcInRoaXNcIixcbiAgICAgICAgICAgIFwia2V5d29yZFwiOiBrZXl3b3JkcyxcbiAgICAgICAgICAgIFwiZW50aXR5Lm5hbWUuc2VnbWVudFwiOnNlZ21lbnQsXG4gICAgICAgICAgICBcImVudGl0eS5uYW1lLmhlYWRlclwiOmhlYWRlcixcbiAgICAgICAgICAgIFwiY29uc3RhbnQubGFuZ3VhZ2VcIjogYnVpbGRpbkNvbnN0YW50cyxcbiAgICAgICAgICAgIFwic3VwcG9ydC5mdW5jdGlvblwiOiBsYW5nQ2xhc3Nlc1xuICAgICAgICB9LCBcImlkZW50aWZpZXJcIik7XG4gICAgXG4gICAgICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAgICAgLy8gcmVnZXhwcyBhcmUgb3JkZXJlZCAtPiB0aGUgZmlyc3QgbWF0Y2ggaXMgdXNlZFxuICAgIFxuICAgICAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXCsuXFxcXCtcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmJvb2xlYW5cIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIig/OnRydWV8ZmFsc2UpXFxcXGJcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiW2EtekEtWl8kXVthLXpBLVowLTlfJF0qXFxcXGJcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXggOiBcIlxcXFwrXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleCA6IFwiXFxcXDp8J1wiXG4gICAgICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuIDogXCJpZGVudGlmaWVyXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcOkRcXFxcOlwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIFxuICAgICAgICB0aGlzLmVtYmVkUnVsZXMoRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLCBcImRvYy1cIixcbiAgICAgICAgICAgIFsgRG9jQ29tbWVudEhpZ2hsaWdodFJ1bGVzLmdldEVuZFJ1bGUoXCJzdGFydFwiKSBdKTtcbiAgICB9O1xuICAgIFxuICAgIEVkaWZhY3RIaWdobGlnaHRSdWxlcy5tZXRhRGF0YSA9IHsgZmlsZVR5cGVzOiBbICdlZGknIF0sXG4gICAgICAgICAga2V5RXF1aXZhbGVudDogJ15+RScsXG4gICAgICAgICAgbmFtZTogJ0VkaWZhY3QnLFxuICAgICAgICAgIHNjb3BlTmFtZTogJ3NvdXJjZS5lZGlmYWN0JyB9O1xuICAgIFxuICAgIG9vcC5pbmhlcml0cyhFZGlmYWN0SGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG4gICAgXG4gICAgZXhwb3J0cy5FZGlmYWN0SGlnaGxpZ2h0UnVsZXMgPSBFZGlmYWN0SGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=