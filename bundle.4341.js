"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4341],{

/***/ 54341:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var HtmlMode = (__webpack_require__(32234).Mode);
var ColdfusionHighlightRules = (__webpack_require__(18178)/* .ColdfusionHighlightRules */ .E);

var voidElements = "cfabort|cfapplication|cfargument|cfassociate|cfbreak|cfcache|cfcollection|cfcookie|cfdbinfo|cfdirectory|cfdump|cfelse|cfelseif|cferror|cfexchangecalendar|cfexchangeconnection|cfexchangecontact|cfexchangefilter|cfexchangetask|cfexit|cffeed|cffile|cfflush|cfftp|cfheader|cfhtmlhead|cfhttpparam|cfimage|cfimport|cfinclude|cfindex|cfinsert|cfinvokeargument|cflocation|cflog|cfmailparam|cfNTauthenticate|cfobject|cfobjectcache|cfparam|cfpdfformparam|cfprint|cfprocparam|cfprocresult|cfproperty|cfqueryparam|cfregistry|cfreportparam|cfrethrow|cfreturn|cfschedule|cfsearch|cfset|cfsetting|cfthrow|cfzipparam)".split("|");

var Mode = function() {
    HtmlMode.call(this);
    
    this.HighlightRules = ColdfusionHighlightRules;
};
oop.inherits(Mode, HtmlMode);

(function() {

    // mix with html void elements
    this.voidElements = oop.mixin(lang.arrayToMap(voidElements), this.voidElements);

    this.getNextLineIndent = function(state, line, tab) {
        return this.$getIndent(line);
    };

    this.$id = "ace/mode/coldfusion";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 18178:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var JavaScriptHighlightRules = (__webpack_require__(15903).JavaScriptHighlightRules);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);

var ColdfusionHighlightRules = function() {
    HtmlHighlightRules.call(this);
    this.$rules.tag[2].token = function (start, tag) {
        var group = tag.slice(0,2) == "cf" ? "keyword" : "meta.tag";
        return ["meta.tag.punctuation." + (start == "<" ? "" : "end-") + "tag-open.xml",
            group + ".tag-name.xml"];
    };

    var jsAndCss = Object.keys(this.$rules).filter(function(x) {
        return /^(js|css)-/.test(x);
    });
    this.embedRules({
        cfmlComment: [
            { regex: "<!---", token: "comment.start", push: "cfmlComment"}, 
            { regex: "--->", token: "comment.end", next: "pop"},
            { defaultToken: "comment"}
        ]
    }, "", [
        { regex: "<!---", token: "comment.start", push: "cfmlComment"}
    ], [
        "comment", "start", "tag_whitespace", "cdata"
    ].concat(jsAndCss));
    
    
    this.$rules.cfTag = [
        {include : "attributes"},
        {token : "meta.tag.punctuation.tag-close.xml", regex : "/?>", next : "pop"}
    ];
    var cfTag = {
        token : function(start, tag) {
            return ["meta.tag.punctuation." + (start == "<" ? "" : "end-") + "tag-open.xml",
                "keyword.tag-name.xml"];
        },
        regex : "(</?)(cf[-_a-zA-Z0-9:.]+)",
        push: "cfTag"
    };
    jsAndCss.forEach(function(s) {
        this.$rules[s].unshift(cfTag);
    }, this);
    
    this.embedTagRules(new JavaScriptHighlightRules({jsx: false}).getRules(), "cfjs-", "cfscript");

    this.normalizeRules();
};

oop.inherits(ColdfusionHighlightRules, HtmlHighlightRules);

exports.E = ColdfusionHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQzNDEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsV0FBVyxtQkFBTyxDQUFDLEtBQWE7QUFDaEMsZUFBZSxpQ0FBc0I7QUFDckMsK0JBQStCLDhEQUFnRTs7QUFFL0Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQzVCQzs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QiwrQkFBK0IscURBQWdFO0FBQy9GLHlCQUF5QiwrQ0FBb0Q7O0FBRTdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGNBQWMsNERBQTREO0FBQzFFLGNBQWMsaURBQWlEO0FBQy9ELGNBQWM7QUFDZDtBQUNBLEtBQUs7QUFDTCxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyx1QkFBdUI7QUFDaEMsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHFEQUFxRCxXQUFXOztBQUVoRTtBQUNBOztBQUVBOztBQUVBLFNBQWdDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jb2xkZnVzaW9uLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY29sZGZ1c2lvbl9oaWdobGlnaHRfcnVsZXMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIEh0bWxNb2RlID0gcmVxdWlyZShcIi4vaHRtbFwiKS5Nb2RlO1xudmFyIENvbGRmdXNpb25IaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2NvbGRmdXNpb25faGlnaGxpZ2h0X3J1bGVzXCIpLkNvbGRmdXNpb25IaWdobGlnaHRSdWxlcztcblxudmFyIHZvaWRFbGVtZW50cyA9IFwiY2ZhYm9ydHxjZmFwcGxpY2F0aW9ufGNmYXJndW1lbnR8Y2Zhc3NvY2lhdGV8Y2ZicmVha3xjZmNhY2hlfGNmY29sbGVjdGlvbnxjZmNvb2tpZXxjZmRiaW5mb3xjZmRpcmVjdG9yeXxjZmR1bXB8Y2ZlbHNlfGNmZWxzZWlmfGNmZXJyb3J8Y2ZleGNoYW5nZWNhbGVuZGFyfGNmZXhjaGFuZ2Vjb25uZWN0aW9ufGNmZXhjaGFuZ2Vjb250YWN0fGNmZXhjaGFuZ2VmaWx0ZXJ8Y2ZleGNoYW5nZXRhc2t8Y2ZleGl0fGNmZmVlZHxjZmZpbGV8Y2ZmbHVzaHxjZmZ0cHxjZmhlYWRlcnxjZmh0bWxoZWFkfGNmaHR0cHBhcmFtfGNmaW1hZ2V8Y2ZpbXBvcnR8Y2ZpbmNsdWRlfGNmaW5kZXh8Y2ZpbnNlcnR8Y2ZpbnZva2Vhcmd1bWVudHxjZmxvY2F0aW9ufGNmbG9nfGNmbWFpbHBhcmFtfGNmTlRhdXRoZW50aWNhdGV8Y2ZvYmplY3R8Y2ZvYmplY3RjYWNoZXxjZnBhcmFtfGNmcGRmZm9ybXBhcmFtfGNmcHJpbnR8Y2Zwcm9jcGFyYW18Y2Zwcm9jcmVzdWx0fGNmcHJvcGVydHl8Y2ZxdWVyeXBhcmFtfGNmcmVnaXN0cnl8Y2ZyZXBvcnRwYXJhbXxjZnJldGhyb3d8Y2ZyZXR1cm58Y2ZzY2hlZHVsZXxjZnNlYXJjaHxjZnNldHxjZnNldHRpbmd8Y2Z0aHJvd3xjZnppcHBhcmFtKVwiLnNwbGl0KFwifFwiKTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICBIdG1sTW9kZS5jYWxsKHRoaXMpO1xuICAgIFxuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBDb2xkZnVzaW9uSGlnaGxpZ2h0UnVsZXM7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIEh0bWxNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgLy8gbWl4IHdpdGggaHRtbCB2b2lkIGVsZW1lbnRzXG4gICAgdGhpcy52b2lkRWxlbWVudHMgPSBvb3AubWl4aW4obGFuZy5hcnJheVRvTWFwKHZvaWRFbGVtZW50cyksIHRoaXMudm9pZEVsZW1lbnRzKTtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9jb2xkZnVzaW9uXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgSmF2YVNjcmlwdEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vamF2YXNjcmlwdF9oaWdobGlnaHRfcnVsZXNcIikuSmF2YVNjcmlwdEhpZ2hsaWdodFJ1bGVzO1xudmFyIEh0bWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2h0bWxfaGlnaGxpZ2h0X3J1bGVzXCIpLkh0bWxIaWdobGlnaHRSdWxlcztcblxudmFyIENvbGRmdXNpb25IaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIEh0bWxIaWdobGlnaHRSdWxlcy5jYWxsKHRoaXMpO1xuICAgIHRoaXMuJHJ1bGVzLnRhZ1syXS50b2tlbiA9IGZ1bmN0aW9uIChzdGFydCwgdGFnKSB7XG4gICAgICAgIHZhciBncm91cCA9IHRhZy5zbGljZSgwLDIpID09IFwiY2ZcIiA/IFwia2V5d29yZFwiIDogXCJtZXRhLnRhZ1wiO1xuICAgICAgICByZXR1cm4gW1wibWV0YS50YWcucHVuY3R1YXRpb24uXCIgKyAoc3RhcnQgPT0gXCI8XCIgPyBcIlwiIDogXCJlbmQtXCIpICsgXCJ0YWctb3Blbi54bWxcIixcbiAgICAgICAgICAgIGdyb3VwICsgXCIudGFnLW5hbWUueG1sXCJdO1xuICAgIH07XG5cbiAgICB2YXIganNBbmRDc3MgPSBPYmplY3Qua2V5cyh0aGlzLiRydWxlcykuZmlsdGVyKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgcmV0dXJuIC9eKGpzfGNzcyktLy50ZXN0KHgpO1xuICAgIH0pO1xuICAgIHRoaXMuZW1iZWRSdWxlcyh7XG4gICAgICAgIGNmbWxDb21tZW50OiBbXG4gICAgICAgICAgICB7IHJlZ2V4OiBcIjwhLS0tXCIsIHRva2VuOiBcImNvbW1lbnQuc3RhcnRcIiwgcHVzaDogXCJjZm1sQ29tbWVudFwifSwgXG4gICAgICAgICAgICB7IHJlZ2V4OiBcIi0tLT5cIiwgdG9rZW46IFwiY29tbWVudC5lbmRcIiwgbmV4dDogXCJwb3BcIn0sXG4gICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogXCJjb21tZW50XCJ9XG4gICAgICAgIF1cbiAgICB9LCBcIlwiLCBbXG4gICAgICAgIHsgcmVnZXg6IFwiPCEtLS1cIiwgdG9rZW46IFwiY29tbWVudC5zdGFydFwiLCBwdXNoOiBcImNmbWxDb21tZW50XCJ9XG4gICAgXSwgW1xuICAgICAgICBcImNvbW1lbnRcIiwgXCJzdGFydFwiLCBcInRhZ193aGl0ZXNwYWNlXCIsIFwiY2RhdGFcIlxuICAgIF0uY29uY2F0KGpzQW5kQ3NzKSk7XG4gICAgXG4gICAgXG4gICAgdGhpcy4kcnVsZXMuY2ZUYWcgPSBbXG4gICAgICAgIHtpbmNsdWRlIDogXCJhdHRyaWJ1dGVzXCJ9LFxuICAgICAgICB7dG9rZW4gOiBcIm1ldGEudGFnLnB1bmN0dWF0aW9uLnRhZy1jbG9zZS54bWxcIiwgcmVnZXggOiBcIi8/PlwiLCBuZXh0IDogXCJwb3BcIn1cbiAgICBdO1xuICAgIHZhciBjZlRhZyA9IHtcbiAgICAgICAgdG9rZW4gOiBmdW5jdGlvbihzdGFydCwgdGFnKSB7XG4gICAgICAgICAgICByZXR1cm4gW1wibWV0YS50YWcucHVuY3R1YXRpb24uXCIgKyAoc3RhcnQgPT0gXCI8XCIgPyBcIlwiIDogXCJlbmQtXCIpICsgXCJ0YWctb3Blbi54bWxcIixcbiAgICAgICAgICAgICAgICBcImtleXdvcmQudGFnLW5hbWUueG1sXCJdO1xuICAgICAgICB9LFxuICAgICAgICByZWdleCA6IFwiKDwvPykoY2ZbLV9hLXpBLVowLTk6Ll0rKVwiLFxuICAgICAgICBwdXNoOiBcImNmVGFnXCJcbiAgICB9O1xuICAgIGpzQW5kQ3NzLmZvckVhY2goZnVuY3Rpb24ocykge1xuICAgICAgICB0aGlzLiRydWxlc1tzXS51bnNoaWZ0KGNmVGFnKTtcbiAgICB9LCB0aGlzKTtcbiAgICBcbiAgICB0aGlzLmVtYmVkVGFnUnVsZXMobmV3IEphdmFTY3JpcHRIaWdobGlnaHRSdWxlcyh7anN4OiBmYWxzZX0pLmdldFJ1bGVzKCksIFwiY2Zqcy1cIiwgXCJjZnNjcmlwdFwiKTtcblxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhDb2xkZnVzaW9uSGlnaGxpZ2h0UnVsZXMsIEh0bWxIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuQ29sZGZ1c2lvbkhpZ2hsaWdodFJ1bGVzID0gQ29sZGZ1c2lvbkhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9