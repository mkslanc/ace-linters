"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5392],{

/***/ 95392:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* caption: Visualforce; extensions: component,page,vfp */



var oop = __webpack_require__(2645);
var HtmlMode = (__webpack_require__(32234).Mode);
var VisualforceHighlightRules = (__webpack_require__(7355)/* .VisualforceHighlightRules */ .j);
var XmlBehaviour = (__webpack_require__(63458).XmlBehaviour);
var HtmlFoldMode = (__webpack_require__(6944).FoldMode);

function VisualforceMode() {
    HtmlMode.call(this);

    this.HighlightRules = VisualforceHighlightRules;
    this.foldingRules = new HtmlFoldMode();
    this.$behaviour = new XmlBehaviour();
}

oop.inherits(VisualforceMode, HtmlMode);

VisualforceMode.prototype.emmetConfig = {
    profile: "xhtml"
};

exports.Mode = VisualforceMode;


/***/ }),

/***/ 7355:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* global define */



var oop = __webpack_require__(2645);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);

function string(options) {
    return {
        token: options.token + ".start",
        regex: options.start,
        push: [{
            token : "constant.language.escape",
            regex : options.escape
        }, {
            token: options.token + ".end",
            regex: options.start,
            next: "pop"
        }, {
            defaultToken: options.token
        }]
    };
}
var VisualforceHighlightRules = function() {
    var keywordMapper = this.createKeywordMapper({
        "variable.language":
            "$Action|$Api|$Component|$ComponentLabel|$CurrentPage|$FieldSet|$Label|$Label|" +
            "$ObjectType|$Organization|$Page|$Permission|$Profile|$Resource|$SControl|" +
            "$Setup|$Site|$System.OriginDateTime|$User|$UserRole|" +
            "Site|UITheme|UIThemeDisplayed",
        "keyword":
            "",
        "storage.type":
            "",
        "constant.language":
            "true|false|null|TRUE|FALSE|NULL",
        "support.function":
            "DATE|DATEVALUE|DATETIMEVALUE|DAY|MONTH|NOW|TODAY|YEAR|BLANKVALUE|ISBLANK|" +
            "NULLVALUE|PRIORVALUE|AND|CASE|IF|ISCHANGED|ISNEW|ISNUMBER|NOT|OR|ABS|" +
            "CEILING|EXP|FLOOR|LN|LOG|MAX|MIN|MOD|ROUND|SQRT|BEGINS|BR|CASESAFEID|" +
            "CONTAINS|FIND|GETSESSIONID|HTMLENCODE|ISPICKVAL|JSENCODE|JSINHTMLENCODE|" +
            "LEFT|LEN|LOWER|LPAD|MID|RIGHT|RPAD|SUBSTITUTE|TEXT|TRIM|UPPER|URLENCODE|VALUE|" +
            "GETRECORDIDS|INCLUDE|LINKTO|REGEX|REQUIRESCRIPT|URLFOR|VLOOKUP|HTMLENCODE|JSENCODE|" +
            "JSINHTMLENCODE|URLENCODE"
    }, "identifier");

    HtmlHighlightRules.call(this);
    var hbs = {
        token : "keyword.start",
        regex : "{!",
        push : "Visualforce"
    };
    for (var key in this.$rules) {
        this.$rules[key].unshift(hbs);
    }
    this.$rules.Visualforce = [
        string({
            start: '"',
            escape: /\\[btnfr"'\\]/,
            token: "string",
            multiline: true
        }),
        string({
            start: "'",
            escape: /\\[btnfr"'\\]/,
            token: "string",
            multiline: true
        }),
        {
            token: "comment.start",
            regex : "\\/\\*",
            push: [
                {token : "comment.end", regex : "\\*\\/|(?=})", next : "pop"},
                {defaultToken : "comment", caseInsensitive: true}
            ]
        }, {
            token : "keyword.end",
            regex : "}",
            next : "pop"
        }, {
            token : keywordMapper,
            regex : /[a-zA-Z$_\u00a1-\uffff][a-zA-Z\d$_\u00a1-\uffff]*\b/
        }, {
            token : "keyword.operator",
            regex : /==|<>|!=|<=|>=|&&|\|\||[+\-*/^()=<>&]/
        }, {
            token : "punctuation.operator",
            regex : /[?:,;.]/
        }, {
            token : "paren.lparen",
            regex : /[\[({]/
        }, {
            token : "paren.rparen",
            regex : /[\])}]/
        }
    ];

    this.normalizeRules();
};

oop.inherits(VisualforceHighlightRules, HtmlHighlightRules);

exports.j = VisualforceHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjUzOTIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEseUJBQXlCOztBQUVaOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLGVBQWUsaUNBQXNCO0FBQ3JDLGdDQUFnQyw4REFBa0U7QUFDbEcsbUJBQW1CLHlDQUF1QztBQUMxRCxtQkFBbUIsb0NBQWtDOztBQUVyRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxZQUFZOzs7Ozs7OztBQ3hCWjs7QUFFYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5Qix5QkFBeUIsK0NBQTBEOztBQUVuRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwyQ0FBMkMsaUJBQWlCO0FBQzdFLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSwwQkFBMEI7QUFDMUIsU0FBUztBQUNUO0FBQ0EsMEJBQTBCO0FBQzFCLFNBQVM7QUFDVDtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUEsU0FBaUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3Zpc3VhbGZvcmNlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvdmlzdWFsZm9yY2VfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGNhcHRpb246IFZpc3VhbGZvcmNlOyBleHRlbnNpb25zOiBjb21wb25lbnQscGFnZSx2ZnAgKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBIdG1sTW9kZSA9IHJlcXVpcmUoXCIuL2h0bWxcIikuTW9kZTtcbnZhciBWaXN1YWxmb3JjZUhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdmlzdWFsZm9yY2VfaGlnaGxpZ2h0X3J1bGVzXCIpLlZpc3VhbGZvcmNlSGlnaGxpZ2h0UnVsZXM7XG52YXIgWG1sQmVoYXZpb3VyID0gcmVxdWlyZShcIi4vYmVoYXZpb3VyL3htbFwiKS5YbWxCZWhhdmlvdXI7XG52YXIgSHRtbEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9odG1sXCIpLkZvbGRNb2RlO1xuXG5mdW5jdGlvbiBWaXN1YWxmb3JjZU1vZGUoKSB7XG4gICAgSHRtbE1vZGUuY2FsbCh0aGlzKTtcblxuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBWaXN1YWxmb3JjZUhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEh0bWxGb2xkTW9kZSgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IG5ldyBYbWxCZWhhdmlvdXIoKTtcbn1cblxub29wLmluaGVyaXRzKFZpc3VhbGZvcmNlTW9kZSwgSHRtbE1vZGUpO1xuXG5WaXN1YWxmb3JjZU1vZGUucHJvdG90eXBlLmVtbWV0Q29uZmlnID0ge1xuICAgIHByb2ZpbGU6IFwieGh0bWxcIlxufTtcblxuZXhwb3J0cy5Nb2RlID0gVmlzdWFsZm9yY2VNb2RlO1xuIiwiLyogZ2xvYmFsIGRlZmluZSAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIEh0bWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuLi9tb2RlL2h0bWxfaGlnaGxpZ2h0X3J1bGVzXCIpLkh0bWxIaWdobGlnaHRSdWxlcztcblxuZnVuY3Rpb24gc3RyaW5nKG9wdGlvbnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0b2tlbjogb3B0aW9ucy50b2tlbiArIFwiLnN0YXJ0XCIsXG4gICAgICAgIHJlZ2V4OiBvcHRpb25zLnN0YXJ0LFxuICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgdG9rZW4gOiBcImNvbnN0YW50Lmxhbmd1YWdlLmVzY2FwZVwiLFxuICAgICAgICAgICAgcmVnZXggOiBvcHRpb25zLmVzY2FwZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogb3B0aW9ucy50b2tlbiArIFwiLmVuZFwiLFxuICAgICAgICAgICAgcmVnZXg6IG9wdGlvbnMuc3RhcnQsXG4gICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogb3B0aW9ucy50b2tlblxuICAgICAgICB9XVxuICAgIH07XG59XG52YXIgVmlzdWFsZm9yY2VIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJ2YXJpYWJsZS5sYW5ndWFnZVwiOlxuICAgICAgICAgICAgXCIkQWN0aW9ufCRBcGl8JENvbXBvbmVudHwkQ29tcG9uZW50TGFiZWx8JEN1cnJlbnRQYWdlfCRGaWVsZFNldHwkTGFiZWx8JExhYmVsfFwiICtcbiAgICAgICAgICAgIFwiJE9iamVjdFR5cGV8JE9yZ2FuaXphdGlvbnwkUGFnZXwkUGVybWlzc2lvbnwkUHJvZmlsZXwkUmVzb3VyY2V8JFNDb250cm9sfFwiICtcbiAgICAgICAgICAgIFwiJFNldHVwfCRTaXRlfCRTeXN0ZW0uT3JpZ2luRGF0ZVRpbWV8JFVzZXJ8JFVzZXJSb2xlfFwiICtcbiAgICAgICAgICAgIFwiU2l0ZXxVSVRoZW1lfFVJVGhlbWVEaXNwbGF5ZWRcIixcbiAgICAgICAgXCJrZXl3b3JkXCI6XG4gICAgICAgICAgICBcIlwiLFxuICAgICAgICBcInN0b3JhZ2UudHlwZVwiOlxuICAgICAgICAgICAgXCJcIixcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOlxuICAgICAgICAgICAgXCJ0cnVlfGZhbHNlfG51bGx8VFJVRXxGQUxTRXxOVUxMXCIsXG4gICAgICAgIFwic3VwcG9ydC5mdW5jdGlvblwiOlxuICAgICAgICAgICAgXCJEQVRFfERBVEVWQUxVRXxEQVRFVElNRVZBTFVFfERBWXxNT05USHxOT1d8VE9EQVl8WUVBUnxCTEFOS1ZBTFVFfElTQkxBTkt8XCIgK1xuICAgICAgICAgICAgXCJOVUxMVkFMVUV8UFJJT1JWQUxVRXxBTkR8Q0FTRXxJRnxJU0NIQU5HRUR8SVNORVd8SVNOVU1CRVJ8Tk9UfE9SfEFCU3xcIiArXG4gICAgICAgICAgICBcIkNFSUxJTkd8RVhQfEZMT09SfExOfExPR3xNQVh8TUlOfE1PRHxST1VORHxTUVJUfEJFR0lOU3xCUnxDQVNFU0FGRUlEfFwiICtcbiAgICAgICAgICAgIFwiQ09OVEFJTlN8RklORHxHRVRTRVNTSU9OSUR8SFRNTEVOQ09ERXxJU1BJQ0tWQUx8SlNFTkNPREV8SlNJTkhUTUxFTkNPREV8XCIgK1xuICAgICAgICAgICAgXCJMRUZUfExFTnxMT1dFUnxMUEFEfE1JRHxSSUdIVHxSUEFEfFNVQlNUSVRVVEV8VEVYVHxUUklNfFVQUEVSfFVSTEVOQ09ERXxWQUxVRXxcIiArXG4gICAgICAgICAgICBcIkdFVFJFQ09SRElEU3xJTkNMVURFfExJTktUT3xSRUdFWHxSRVFVSVJFU0NSSVBUfFVSTEZPUnxWTE9PS1VQfEhUTUxFTkNPREV8SlNFTkNPREV8XCIgK1xuICAgICAgICAgICAgXCJKU0lOSFRNTEVOQ09ERXxVUkxFTkNPREVcIlxuICAgIH0sIFwiaWRlbnRpZmllclwiKTtcblxuICAgIEh0bWxIaWdobGlnaHRSdWxlcy5jYWxsKHRoaXMpO1xuICAgIHZhciBoYnMgPSB7XG4gICAgICAgIHRva2VuIDogXCJrZXl3b3JkLnN0YXJ0XCIsXG4gICAgICAgIHJlZ2V4IDogXCJ7IVwiLFxuICAgICAgICBwdXNoIDogXCJWaXN1YWxmb3JjZVwiXG4gICAgfTtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy4kcnVsZXMpIHtcbiAgICAgICAgdGhpcy4kcnVsZXNba2V5XS51bnNoaWZ0KGhicyk7XG4gICAgfVxuICAgIHRoaXMuJHJ1bGVzLlZpc3VhbGZvcmNlID0gW1xuICAgICAgICBzdHJpbmcoe1xuICAgICAgICAgICAgc3RhcnQ6ICdcIicsXG4gICAgICAgICAgICBlc2NhcGU6IC9cXFxcW2J0bmZyXCInXFxcXF0vLFxuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBtdWx0aWxpbmU6IHRydWVcbiAgICAgICAgfSksXG4gICAgICAgIHN0cmluZyh7XG4gICAgICAgICAgICBzdGFydDogXCInXCIsXG4gICAgICAgICAgICBlc2NhcGU6IC9cXFxcW2J0bmZyXCInXFxcXF0vLFxuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICBtdWx0aWxpbmU6IHRydWVcbiAgICAgICAgfSksXG4gICAgICAgIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQuc3RhcnRcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcL1xcXFwqXCIsXG4gICAgICAgICAgICBwdXNoOiBbXG4gICAgICAgICAgICAgICAge3Rva2VuIDogXCJjb21tZW50LmVuZFwiLCByZWdleCA6IFwiXFxcXCpcXFxcL3woPz19KVwiLCBuZXh0IDogXCJwb3BcIn0sXG4gICAgICAgICAgICAgICAge2RlZmF1bHRUb2tlbiA6IFwiY29tbWVudFwiLCBjYXNlSW5zZW5zaXRpdmU6IHRydWV9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJrZXl3b3JkLmVuZFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIn1cIixcbiAgICAgICAgICAgIG5leHQgOiBcInBvcFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDoga2V5d29yZE1hcHBlcixcbiAgICAgICAgICAgIHJlZ2V4IDogL1thLXpBLVokX1xcdTAwYTEtXFx1ZmZmZl1bYS16QS1aXFxkJF9cXHUwMGExLVxcdWZmZmZdKlxcYi9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4IDogLz09fDw+fCE9fDw9fD49fCYmfFxcfFxcfHxbK1xcLSovXigpPTw+Jl0vXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiLFxuICAgICAgICAgICAgcmVnZXggOiAvWz86LDsuXS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLmxwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiAvW1xcWyh7XS9cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcInBhcmVuLnJwYXJlblwiLFxuICAgICAgICAgICAgcmVnZXggOiAvW1xcXSl9XS9cbiAgICAgICAgfVxuICAgIF07XG5cbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5vb3AuaW5oZXJpdHMoVmlzdWFsZm9yY2VIaWdobGlnaHRSdWxlcywgSHRtbEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5WaXN1YWxmb3JjZUhpZ2hsaWdodFJ1bGVzID0gVmlzdWFsZm9yY2VIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==