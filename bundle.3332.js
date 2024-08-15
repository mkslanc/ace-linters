(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3332],{

/***/ 43332:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var oop = __webpack_require__(2645);
var HtmlMode = (__webpack_require__(32234).Mode);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var DjangoHighlightRules = function(){
    this.$rules = {
        'start': [{
            token: "string",
            regex: '".*?"'
        }, {
            token: "string",
            regex: "'.*?'"
        }, {
            token: "constant",
            regex: '[0-9]+'
        }, {
            token: "variable",
            regex: "[-_a-zA-Z0-9:]+"
        }],
        'tag': [{
            token: "entity.name.function",
            regex: "[a-zA-Z][_a-zA-Z0-9]*",
            next: "start"
        }]
    };
};

oop.inherits(DjangoHighlightRules, TextHighlightRules);

var DjangoHtmlHighlightRules = function() {
    this.$rules = new HtmlHighlightRules().getRules();

    for (var i in this.$rules) {
        this.$rules[i].unshift({
            token: "comment.line",
            regex: "\\{#.*?#\\}"
        }, {
            token: "comment.block",
            regex: "\\{\\%\\s*comment\\s*\\%\\}",
            merge: true,
            next: "django-comment"
        }, {
            token: "constant.language",
            regex: "\\{\\{",
            next: "django-start"
        }, {
            token: "constant.language",
            regex: "\\{\\%",
            next: "django-tag"
        });
        this.embedRules(DjangoHighlightRules, "django-", [{
                token: "comment.block",
                regex: "\\{\\%\\s*endcomment\\s*\\%\\}",
                merge: true,
                next: "start"
            }, {
                token: "constant.language",
                regex: "\\%\\}",
                next: "start"
            }, {
                token: "constant.language",
                regex: "\\}\\}",
                next: "start"
        }]);
    }
};

oop.inherits(DjangoHtmlHighlightRules, HtmlHighlightRules);

var Mode = function() {
    HtmlMode.call(this);
    this.HighlightRules = DjangoHtmlHighlightRules;
};
oop.inherits(Mode, HtmlMode);

(function() {
    this.$id = "ace/mode/django";
    this.snippetFileId = "ace/snippets/django";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjMzMzIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QixlQUFlLGlDQUFzQjtBQUNyQyx5QkFBeUIsK0NBQW9EO0FBQzdFLHlCQUF5Qix3REFBb0Q7O0FBRTdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixRQUFRO0FBQy9CLFNBQVM7QUFDVDtBQUNBLHVCQUF1Qix3QkFBd0I7QUFDL0M7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLHVCQUF1QixHQUFHO0FBQzFCO0FBQ0EsU0FBUztBQUNUO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSwyQkFBMkIsMkJBQTJCO0FBQ3REO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSw4QkFBOEI7QUFDOUI7QUFDQSxhQUFhO0FBQ2I7QUFDQSwyQkFBMkIsR0FBRztBQUM5QjtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9kamFuZ28uanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIEh0bWxNb2RlID0gcmVxdWlyZShcIi4vaHRtbFwiKS5Nb2RlO1xudmFyIEh0bWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2h0bWxfaGlnaGxpZ2h0X3J1bGVzXCIpLkh0bWxIaWdobGlnaHRSdWxlcztcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBEamFuZ29IaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgICdzdGFydCc6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAnXCIuKj9cIidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCInLio/J1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50XCIsXG4gICAgICAgICAgICByZWdleDogJ1swLTldKydcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlstX2EtekEtWjAtOTpdK1wiXG4gICAgICAgIH1dLFxuICAgICAgICAndGFnJzogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImVudGl0eS5uYW1lLmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICByZWdleDogXCJbYS16QS1aXVtfYS16QS1aMC05XSpcIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9XVxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoRGphbmdvSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbnZhciBEamFuZ29IdG1sSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRydWxlcyA9IG5ldyBIdG1sSGlnaGxpZ2h0UnVsZXMoKS5nZXRSdWxlcygpO1xuXG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLiRydWxlcykge1xuICAgICAgICB0aGlzLiRydWxlc1tpXS51bnNoaWZ0KHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbW1lbnQubGluZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHsjLio/I1xcXFx9XCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5ibG9ja1wiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHtcXFxcJVxcXFxzKmNvbW1lbnRcXFxccypcXFxcJVxcXFx9XCIsXG4gICAgICAgICAgICBtZXJnZTogdHJ1ZSxcbiAgICAgICAgICAgIG5leHQ6IFwiZGphbmdvLWNvbW1lbnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHtcXFxce1wiLFxuICAgICAgICAgICAgbmV4dDogXCJkamFuZ28tc3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHtcXFxcJVwiLFxuICAgICAgICAgICAgbmV4dDogXCJkamFuZ28tdGFnXCJcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZW1iZWRSdWxlcyhEamFuZ29IaWdobGlnaHRSdWxlcywgXCJkamFuZ28tXCIsIFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5ibG9ja1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFx7XFxcXCVcXFxccyplbmRjb21tZW50XFxcXHMqXFxcXCVcXFxcfVwiLFxuICAgICAgICAgICAgICAgIG1lcmdlOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXCVcXFxcfVwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXH1cXFxcfVwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9XSk7XG4gICAgfVxufTtcblxub29wLmluaGVyaXRzKERqYW5nb0h0bWxIaWdobGlnaHRSdWxlcywgSHRtbEhpZ2hsaWdodFJ1bGVzKTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICBIdG1sTW9kZS5jYWxsKHRoaXMpO1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBEamFuZ29IdG1sSGlnaGxpZ2h0UnVsZXM7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIEh0bWxNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9kamFuZ29cIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9kamFuZ29cIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9