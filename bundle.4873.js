"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4873],{

/***/ 84873:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var HtmlMode = (__webpack_require__(75528).Mode);
var ColdfusionHighlightRules = (__webpack_require__(20570)/* .ColdfusionHighlightRules */ .e);

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

/***/ 20570:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var JavaScriptHighlightRules = (__webpack_require__(33801)/* .JavaScriptHighlightRules */ ._);
var HtmlHighlightRules = (__webpack_require__(72843)/* .HtmlHighlightRules */ .V);

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

exports.e = ColdfusionHighlightRules;


/***/ })

}]);
//# sourceMappingURL=bundle.4873.js.map