"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9156],{

/***/ 9156:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var MixalHighlightRules = (__webpack_require__(95751)/* .MixalHighlightRules */ .D);

var Mode = function() {
    this.HighlightRules = MixalHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/mixal";
    this.lineCommentStart = "*";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 95751:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var MixalHighlightRules = function() {
    var isValidSymbol = function(string) {
        return string && string.search(/^[A-Z\u0394\u03a0\u03a30-9]{1,10}$/) > -1 && string.search(/[A-Z\u0394\u03a0\u03a3]/) > -1;
    };

    var isValidOp = function(op) {
        return op && [
            'NOP', 'ADD', 'FADD', 'SUB', 'FSUB', 'MUL', 'FMUL', 'DIV', 'FDIV', 'NUM', 'CHAR', 'HLT',
            'SLA', 'SRA', 'SLAX', 'SRAX', 'SLC', 'SRC', 'MOVE', 'LDA', 'LD1', 'LD2', 'LD3', 'LD4',
            'LD5', 'LD6', 'LDX', 'LDAN', 'LD1N', 'LD2N', 'LD3N', 'LD4N', 'LD5N', 'LD6N', 'LDXN',
            'STA', 'ST1', 'ST2', 'ST3', 'ST4', 'ST5', 'ST6', 'STX', 'STJ', 'STZ', 'JBUS', 'IOC',
            'IN', 'OUT', 'JRED', 'JMP', 'JSJ', 'JOV', 'JNOV', 'JL', 'JE', 'JG', 'JGE', 'JNE', 'JLE',
            'JAN', 'JAZ', 'JAP', 'JANN', 'JANZ', 'JANP', 'J1N', 'J1Z', 'J1P', 'J1NN', 'J1NZ',
            'J1NP', 'J2N', 'J2Z', 'J2P', 'J2NN', 'J2NZ', 'J2NP','J3N', 'J3Z', 'J3P', 'J3NN', 'J3NZ',
            'J3NP', 'J4N', 'J4Z', 'J4P', 'J4NN', 'J4NZ', 'J4NP', 'J5N', 'J5Z', 'J5P', 'J5NN',
            'J5NZ', 'J5NP','J6N', 'J6Z', 'J6P', 'J6NN', 'J6NZ', 'J6NP', 'JXN', 'JXZ', 'JXP',
            'JXNN', 'JXNZ', 'JXNP', 'INCA', 'DECA', 'ENTA', 'ENNA', 'INC1', 'DEC1', 'ENT1', 'ENN1',
            'INC2', 'DEC2', 'ENT2', 'ENN2', 'INC3', 'DEC3', 'ENT3', 'ENN3', 'INC4', 'DEC4', 'ENT4',
            'ENN4', 'INC5', 'DEC5', 'ENT5', 'ENN5', 'INC6', 'DEC6', 'ENT6', 'ENN6', 'INCX', 'DECX',
            'ENTX', 'ENNX', 'CMPA', 'FCMP', 'CMP1', 'CMP2', 'CMP3', 'CMP4', 'CMP5', 'CMP6', 'CMPX',
            'EQU', 'ORIG', 'CON', 'ALF', 'END'
        ].indexOf(op) > -1;
    };

    var containsOnlySupportedCharacters = function(string) {
        return string && string.search(/[^ A-Z\u0394\u03a0\u03a30-9.,()+*/=$<>@;:'-]/) == -1;
    };

    this.$rules = {
        "start" : [{
            token: "comment.line.character",
            regex: /^ *\*.*$/
        }, {
            token: function(label, space0, keyword, space1, literal, comment) {
                return [
                    isValidSymbol(label) ? "variable.other" : "invalid.illegal",
                    "text",
                    "keyword.control",
                    "text",
                    containsOnlySupportedCharacters(literal) ? "text" : "invalid.illegal",
                    "comment.line.character"
                ];
            },
            regex: /^(\S+)?( +)(ALF)(  )(.{5})(\s+.*)?$/
        }, {
            token: function(label, space0, keyword, space1, literal, comment) {
                return [
                    isValidSymbol(label) ? "variable.other" : "invalid.illegal",
                    "text",
                    "keyword.control",
                    "text",
                    containsOnlySupportedCharacters(literal) ? "text" : "invalid.illegal",
                    "comment.line.character"
                ];
            },
            regex: /^(\S+)?( +)(ALF)( )(\S.{4})(\s+.*)?$/
        }, {
            token: function(label, space0, op, comment) {
                return [
                    isValidSymbol(label) ? "variable.other" : "invalid.illegal",
                    "text",
                    isValidOp(op) ? "keyword.control" : "invalid.illegal",
                    "comment.line.character"
                ];
            },
            regex: /^(\S+)?( +)(\S+)(?:\s*)$/
        }, {
            token: function(label, space0, op, space1, address, comment) {
                return [
                    isValidSymbol(label) ? "variable.other" : "invalid.illegal",
                    "text",
                    isValidOp(op) ? "keyword.control" : "invalid.illegal",
                    "text",
                    containsOnlySupportedCharacters(address) ? "text" : "invalid.illegal",
                    "comment.line.character"
                ];
            },
            regex: /^(\S+)?( +)(\S+)( +)(\S+)(\s+.*)?$/
        }, {
            defaultToken: "text"
        }]
    };
};

oop.inherits(MixalHighlightRules, TextHighlightRules);

exports.D = MixalHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjkxNTYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsMEJBQTBCLHlEQUFzRDs7QUFFaEY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQ2hCQzs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5Qix5QkFBeUIsd0RBQW9EOztBQUU3RTtBQUNBO0FBQ0Esb0VBQW9FLEtBQUs7QUFDekU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZ0ZBQWdGO0FBQ2hGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYiwyQ0FBMkMsRUFBRTtBQUM3QyxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLDRDQUE0QyxFQUFFO0FBQzlDLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQSxTQUEyQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWl4YWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9taXhhbF9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBNaXhhbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vbWl4YWxfaGlnaGxpZ2h0X3J1bGVzXCIpLk1peGFsSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IE1peGFsSGlnaGxpZ2h0UnVsZXM7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9taXhhbFwiO1xuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiKlwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIE1peGFsSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXNWYWxpZFN5bWJvbCA9IGZ1bmN0aW9uKHN0cmluZykge1xuICAgICAgICByZXR1cm4gc3RyaW5nICYmIHN0cmluZy5zZWFyY2goL15bQS1aXFx1MDM5NFxcdTAzYTBcXHUwM2EzMC05XXsxLDEwfSQvKSA+IC0xICYmIHN0cmluZy5zZWFyY2goL1tBLVpcXHUwMzk0XFx1MDNhMFxcdTAzYTNdLykgPiAtMTtcbiAgICB9O1xuXG4gICAgdmFyIGlzVmFsaWRPcCA9IGZ1bmN0aW9uKG9wKSB7XG4gICAgICAgIHJldHVybiBvcCAmJiBbXG4gICAgICAgICAgICAnTk9QJywgJ0FERCcsICdGQUREJywgJ1NVQicsICdGU1VCJywgJ01VTCcsICdGTVVMJywgJ0RJVicsICdGRElWJywgJ05VTScsICdDSEFSJywgJ0hMVCcsXG4gICAgICAgICAgICAnU0xBJywgJ1NSQScsICdTTEFYJywgJ1NSQVgnLCAnU0xDJywgJ1NSQycsICdNT1ZFJywgJ0xEQScsICdMRDEnLCAnTEQyJywgJ0xEMycsICdMRDQnLFxuICAgICAgICAgICAgJ0xENScsICdMRDYnLCAnTERYJywgJ0xEQU4nLCAnTEQxTicsICdMRDJOJywgJ0xEM04nLCAnTEQ0TicsICdMRDVOJywgJ0xENk4nLCAnTERYTicsXG4gICAgICAgICAgICAnU1RBJywgJ1NUMScsICdTVDInLCAnU1QzJywgJ1NUNCcsICdTVDUnLCAnU1Q2JywgJ1NUWCcsICdTVEonLCAnU1RaJywgJ0pCVVMnLCAnSU9DJyxcbiAgICAgICAgICAgICdJTicsICdPVVQnLCAnSlJFRCcsICdKTVAnLCAnSlNKJywgJ0pPVicsICdKTk9WJywgJ0pMJywgJ0pFJywgJ0pHJywgJ0pHRScsICdKTkUnLCAnSkxFJyxcbiAgICAgICAgICAgICdKQU4nLCAnSkFaJywgJ0pBUCcsICdKQU5OJywgJ0pBTlonLCAnSkFOUCcsICdKMU4nLCAnSjFaJywgJ0oxUCcsICdKMU5OJywgJ0oxTlonLFxuICAgICAgICAgICAgJ0oxTlAnLCAnSjJOJywgJ0oyWicsICdKMlAnLCAnSjJOTicsICdKMk5aJywgJ0oyTlAnLCdKM04nLCAnSjNaJywgJ0ozUCcsICdKM05OJywgJ0ozTlonLFxuICAgICAgICAgICAgJ0ozTlAnLCAnSjROJywgJ0o0WicsICdKNFAnLCAnSjROTicsICdKNE5aJywgJ0o0TlAnLCAnSjVOJywgJ0o1WicsICdKNVAnLCAnSjVOTicsXG4gICAgICAgICAgICAnSjVOWicsICdKNU5QJywnSjZOJywgJ0o2WicsICdKNlAnLCAnSjZOTicsICdKNk5aJywgJ0o2TlAnLCAnSlhOJywgJ0pYWicsICdKWFAnLFxuICAgICAgICAgICAgJ0pYTk4nLCAnSlhOWicsICdKWE5QJywgJ0lOQ0EnLCAnREVDQScsICdFTlRBJywgJ0VOTkEnLCAnSU5DMScsICdERUMxJywgJ0VOVDEnLCAnRU5OMScsXG4gICAgICAgICAgICAnSU5DMicsICdERUMyJywgJ0VOVDInLCAnRU5OMicsICdJTkMzJywgJ0RFQzMnLCAnRU5UMycsICdFTk4zJywgJ0lOQzQnLCAnREVDNCcsICdFTlQ0JyxcbiAgICAgICAgICAgICdFTk40JywgJ0lOQzUnLCAnREVDNScsICdFTlQ1JywgJ0VOTjUnLCAnSU5DNicsICdERUM2JywgJ0VOVDYnLCAnRU5ONicsICdJTkNYJywgJ0RFQ1gnLFxuICAgICAgICAgICAgJ0VOVFgnLCAnRU5OWCcsICdDTVBBJywgJ0ZDTVAnLCAnQ01QMScsICdDTVAyJywgJ0NNUDMnLCAnQ01QNCcsICdDTVA1JywgJ0NNUDYnLCAnQ01QWCcsXG4gICAgICAgICAgICAnRVFVJywgJ09SSUcnLCAnQ09OJywgJ0FMRicsICdFTkQnXG4gICAgICAgIF0uaW5kZXhPZihvcCkgPiAtMTtcbiAgICB9O1xuXG4gICAgdmFyIGNvbnRhaW5zT25seVN1cHBvcnRlZENoYXJhY3RlcnMgPSBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZyAmJiBzdHJpbmcuc2VhcmNoKC9bXiBBLVpcXHUwMzk0XFx1MDNhMFxcdTAzYTMwLTkuLCgpKyovPSQ8PkA7OictXS8pID09IC0xO1xuICAgIH07XG5cbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgXCJzdGFydFwiIDogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQubGluZS5jaGFyYWN0ZXJcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXiAqXFwqLiokL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogZnVuY3Rpb24obGFiZWwsIHNwYWNlMCwga2V5d29yZCwgc3BhY2UxLCBsaXRlcmFsLCBjb21tZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICAgICAgaXNWYWxpZFN5bWJvbChsYWJlbCkgPyBcInZhcmlhYmxlLm90aGVyXCIgOiBcImludmFsaWQuaWxsZWdhbFwiLFxuICAgICAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgXCJrZXl3b3JkLmNvbnRyb2xcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5zT25seVN1cHBvcnRlZENoYXJhY3RlcnMobGl0ZXJhbCkgPyBcInRleHRcIiA6IFwiaW52YWxpZC5pbGxlZ2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29tbWVudC5saW5lLmNoYXJhY3RlclwiXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWdleDogL14oXFxTKyk/KCArKShBTEYpKCAgKSguezV9KShcXHMrLiopPyQvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBmdW5jdGlvbihsYWJlbCwgc3BhY2UwLCBrZXl3b3JkLCBzcGFjZTEsIGxpdGVyYWwsIGNvbW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkU3ltYm9sKGxhYmVsKSA/IFwidmFyaWFibGUub3RoZXJcIiA6IFwiaW52YWxpZC5pbGxlZ2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBcImtleXdvcmQuY29udHJvbFwiLFxuICAgICAgICAgICAgICAgICAgICBcInRleHRcIixcbiAgICAgICAgICAgICAgICAgICAgY29udGFpbnNPbmx5U3VwcG9ydGVkQ2hhcmFjdGVycyhsaXRlcmFsKSA/IFwidGV4dFwiIDogXCJpbnZhbGlkLmlsbGVnYWxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJjb21tZW50LmxpbmUuY2hhcmFjdGVyXCJcbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlZ2V4OiAvXihcXFMrKT8oICspKEFMRikoICkoXFxTLns0fSkoXFxzKy4qKT8kL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogZnVuY3Rpb24obGFiZWwsIHNwYWNlMCwgb3AsIGNvbW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkU3ltYm9sKGxhYmVsKSA/IFwidmFyaWFibGUub3RoZXJcIiA6IFwiaW52YWxpZC5pbGxlZ2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkT3Aob3ApID8gXCJrZXl3b3JkLmNvbnRyb2xcIiA6IFwiaW52YWxpZC5pbGxlZ2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiY29tbWVudC5saW5lLmNoYXJhY3RlclwiXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZWdleDogL14oXFxTKyk/KCArKShcXFMrKSg/OlxccyopJC9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IGZ1bmN0aW9uKGxhYmVsLCBzcGFjZTAsIG9wLCBzcGFjZTEsIGFkZHJlc3MsIGNvbW1lbnQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkU3ltYm9sKGxhYmVsKSA/IFwidmFyaWFibGUub3RoZXJcIiA6IFwiaW52YWxpZC5pbGxlZ2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBpc1ZhbGlkT3Aob3ApID8gXCJrZXl3b3JkLmNvbnRyb2xcIiA6IFwiaW52YWxpZC5pbGxlZ2FsXCIsXG4gICAgICAgICAgICAgICAgICAgIFwidGV4dFwiLFxuICAgICAgICAgICAgICAgICAgICBjb250YWluc09ubHlTdXBwb3J0ZWRDaGFyYWN0ZXJzKGFkZHJlc3MpID8gXCJ0ZXh0XCIgOiBcImludmFsaWQuaWxsZWdhbFwiLFxuICAgICAgICAgICAgICAgICAgICBcImNvbW1lbnQubGluZS5jaGFyYWN0ZXJcIlxuICAgICAgICAgICAgICAgIF07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVnZXg6IC9eKFxcUyspPyggKykoXFxTKykoICspKFxcUyspKFxccysuKik/JC9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInRleHRcIlxuICAgICAgICB9XVxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoTWl4YWxIaWdobGlnaHRSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5NaXhhbEhpZ2hsaWdodFJ1bGVzID0gTWl4YWxIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==