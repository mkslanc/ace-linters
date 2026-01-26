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
    HtmlHighlightRules.call(this);
    var startRules = [
        {
            token: "comment.line",
            regex: "\\{#.*?#\\}"
        }, {
            token: "comment.block",
            regex: "\\{\\%\\s*comment\\s*\\%\\}",
            push: [{
                token: "comment.block",
                regex: "\\{\\%\\s*endcomment\\s*\\%\\}",
                next: "pop"
            }, {
                defaultToken: "comment.block"
            }]
        }, {
            token: "constant.language",
            regex: "\\{\\{",
            push: "django-start"
        }, {
            token: "constant.language",
            regex: "\\{\\%",
            push: "django-tag"
        }
    ];
    var endRules = [
        {
            token: "constant.language",
            regex: "\\%\\}",
            next: "pop"
        }, {
            token: "constant.language",
            regex: "\\}\\}",
            next: "pop"
        }
    ];
    for (var key in this.$rules)
        this.$rules[key].unshift.apply(this.$rules[key], startRules);
    this.embedRules(DjangoHighlightRules, "django-", endRules, ["start"]);
    this.normalizeRules();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjMzMzIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QixlQUFlLGlDQUFzQjtBQUNyQyx5QkFBeUIsK0NBQW9EO0FBQzdFLHlCQUF5Qix3REFBb0Q7O0FBRTdFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFFBQVE7QUFDL0IsU0FBUztBQUNUO0FBQ0EsdUJBQXVCLHdCQUF3QjtBQUMvQztBQUNBO0FBQ0EsMkJBQTJCLDJCQUEyQjtBQUN0RDtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQSx1QkFBdUIsR0FBRztBQUMxQjtBQUNBLFNBQVM7QUFDVDtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQSxTQUFTO0FBQ1Q7QUFDQSx1QkFBdUIsR0FBRztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9kamFuZ28uanMiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIEh0bWxNb2RlID0gcmVxdWlyZShcIi4vaHRtbFwiKS5Nb2RlO1xudmFyIEh0bWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2h0bWxfaGlnaGxpZ2h0X3J1bGVzXCIpLkh0bWxIaWdobGlnaHRSdWxlcztcbnZhciBUZXh0SGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi90ZXh0X2hpZ2hsaWdodF9ydWxlc1wiKS5UZXh0SGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBEamFuZ29IaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgICdzdGFydCc6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIixcbiAgICAgICAgICAgIHJlZ2V4OiAnXCIuKj9cIidcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCIsXG4gICAgICAgICAgICByZWdleDogXCInLio/J1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50XCIsXG4gICAgICAgICAgICByZWdleDogJ1swLTldKydcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlstX2EtekEtWjAtOTpdK1wiXG4gICAgICAgIH1dLFxuICAgICAgICAndGFnJzogW3tcbiAgICAgICAgICAgIHRva2VuOiBcImVudGl0eS5uYW1lLmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICByZWdleDogXCJbYS16QS1aXVtfYS16QS1aMC05XSpcIixcbiAgICAgICAgICAgIG5leHQ6IFwic3RhcnRcIlxuICAgICAgICB9XVxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoRGphbmdvSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbnZhciBEamFuZ29IdG1sSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICBIdG1sSGlnaGxpZ2h0UnVsZXMuY2FsbCh0aGlzKTtcbiAgICB2YXIgc3RhcnRSdWxlcyA9IFtcbiAgICAgICAge1xuICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5saW5lXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxceyMuKj8jXFxcXH1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb21tZW50LmJsb2NrXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxce1xcXFwlXFxcXHMqY29tbWVudFxcXFxzKlxcXFwlXFxcXH1cIixcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwiY29tbWVudC5ibG9ja1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFx7XFxcXCVcXFxccyplbmRjb21tZW50XFxcXHMqXFxcXCVcXFxcfVwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudC5ibG9ja1wiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHtcXFxce1wiLFxuICAgICAgICAgICAgcHVzaDogXCJkamFuZ28tc3RhcnRcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHtcXFxcJVwiLFxuICAgICAgICAgICAgcHVzaDogXCJkamFuZ28tdGFnXCJcbiAgICAgICAgfVxuICAgIF07XG4gICAgdmFyIGVuZFJ1bGVzID0gW1xuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXCVcXFxcfVwiLFxuICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXH1cXFxcfVwiLFxuICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICB9XG4gICAgXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy4kcnVsZXMpXG4gICAgICAgIHRoaXMuJHJ1bGVzW2tleV0udW5zaGlmdC5hcHBseSh0aGlzLiRydWxlc1trZXldLCBzdGFydFJ1bGVzKTtcbiAgICB0aGlzLmVtYmVkUnVsZXMoRGphbmdvSGlnaGxpZ2h0UnVsZXMsIFwiZGphbmdvLVwiLCBlbmRSdWxlcywgW1wic3RhcnRcIl0pO1xuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbm9vcC5pbmhlcml0cyhEamFuZ29IdG1sSGlnaGxpZ2h0UnVsZXMsIEh0bWxIaWdobGlnaHRSdWxlcyk7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgSHRtbE1vZGUuY2FsbCh0aGlzKTtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gRGphbmdvSHRtbEhpZ2hsaWdodFJ1bGVzO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBIdG1sTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvZGphbmdvXCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvZGphbmdvXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==