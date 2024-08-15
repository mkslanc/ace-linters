"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1763],{

/***/ 11763:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var CsoundOrchestraHighlightRules = (__webpack_require__(13928)/* .CsoundOrchestraHighlightRules */ .f);

var Mode = function() {
    this.HighlightRules = CsoundOrchestraHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {

    this.lineCommentStart = ";";
    this.blockComment = {start: "/*", end: "*/"};

    this.$id = "ace/mode/csound_orchestra";
    this.snippetFileId = "ace/snippets/csound_orchestra";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjE3NjMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsb0NBQW9DLG1FQUEyRTs7QUFFL0c7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsOEJBQThCO0FBQzlCLHlCQUF5Qjs7QUFFekI7QUFDQTtBQUNBLENBQUM7O0FBRUQsWUFBWSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3NvdW5kX29yY2hlc3RyYS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIENzb3VuZE9yY2hlc3RyYUhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vY3NvdW5kX29yY2hlc3RyYV9oaWdobGlnaHRfcnVsZXNcIikuQ3NvdW5kT3JjaGVzdHJhSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IENzb3VuZE9yY2hlc3RyYUhpZ2hsaWdodFJ1bGVzO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMubGluZUNvbW1lbnRTdGFydCA9IFwiO1wiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIi8qXCIsIGVuZDogXCIqL1wifTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9jc291bmRfb3JjaGVzdHJhXCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvY3NvdW5kX29yY2hlc3RyYVwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=