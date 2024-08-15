"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3212],{

/***/ 33212:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



    var oop = __webpack_require__(2645);
    var PHPLaravelBladeHighlightRules = (__webpack_require__(66767)/* .PHPLaravelBladeHighlightRules */ .n);
    var PHPMode = (__webpack_require__(99883).Mode);
    var JavaScriptMode = (__webpack_require__(93388).Mode);
    var CssMode = (__webpack_require__(41080).Mode);
    var HtmlMode = (__webpack_require__(32234).Mode);

    var Mode = function() {
        PHPMode.call(this);

        this.HighlightRules = PHPLaravelBladeHighlightRules;
        this.createModeDelegates({
            "js-": JavaScriptMode,
            "css-": CssMode,
            "html-": HtmlMode
        });
    };
    oop.inherits(Mode, PHPMode);

    (function() {

        this.$id = "ace/mode/php_laravel_blade";
    }).call(Mode.prototype);

    exports.Mode = Mode;


/***/ }),

/***/ 66767:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var PhpHighlightRules = (__webpack_require__(40368)/* .PhpHighlightRules */ ._);

var PHPLaravelBladeHighlightRules = function() {
    PhpHighlightRules.call(this);

    var bladeRules = {
        start: [{
            include: "bladeComments"
        }, {
            include: "directives"
        }, {
            include: "parenthesis"
        }],
        comments: [{
            include: "bladeComments"
        }, {
            token: "punctuation.definition.comment.blade",
            regex: "(\\/\\/(.)*)|(\\#(.)*)"
        }, {
            token: "punctuation.definition.comment.begin.php",
            regex: "(?:\\/\\*)",
            push: [{
                token: "punctuation.definition.comment.end.php",
                regex: "(?:\\*\\/)",
                next: "pop"
            }, {
                defaultToken: "comment.block.blade"
            }]
        }], 
        bladeComments: [{
            token: "punctuation.definition.comment.begin.blade",
            regex: "(?:\\{\\{\\-\\-)",
            push: [{
                token: "punctuation.definition.comment.end.blade",
                regex: "(?:\\-\\-\\}\\})",
                next: "pop"
            }, {
                defaultToken: "comment.block.blade"
            }]
        }],
        parenthesis: [{
            token: "parenthesis.begin.blade",
            regex: "\\(",
            push: [{
                token: "parenthesis.end.blade",
                regex: "\\)",
                next: "pop"
            }, {
                include: "strings"
            }, {
                include: "variables"
            }, {
                include: "lang"
            }, {
                include: "parenthesis"
            }, {
                include: "comments"
            }, {
                defaultToken: "source.blade"
            }]
        }],
        directives: [{
                token: ["directive.declaration.blade", "keyword.directives.blade"],
                regex: "(@)(endunless|endisset|endempty|endauth|endguest|endcomponent|endslot|endalert|endverbatim|endsection|show|php|endphp|endpush|endprepend|endenv|endforelse|isset|empty|component|slot|alert|json|verbatim|section|auth|guest|hasSection|forelse|includeIf|includeWhen|includeFirst|each|push|stack|prepend|inject|env|elseenv|unless|yield|extends|parent|include|acfrepeater|block|can|cannot|choice|debug|elsecan|elsecannot|embed|hipchat|lang|layout|macro|macrodef|minify|partial|render|servers|set|slack|story|task|unset|wpposts|acfend|after|append|breakpoint|endafter|endcan|endcannot|endembed|endmacro|endmarkdown|endminify|endpartial|endsetup|endstory|endtask|endunless|markdown|overwrite|setup|stop|wpempty|wpend|wpquery)"

            }, {
                token: ["directive.declaration.blade", "keyword.control.blade"],
                regex: "(@)(if|else|elseif|endif|foreach|endforeach|switch|case|break|default|endswitch|for|endfor|while|endwhile|continue)"
            }, {
                token: ["directive.ignore.blade", "injections.begin.blade"],
                regex: "(@?)(\\{\\{)",
                push: [{
                    token: "injections.end.blade",
                    regex: "\\}\\}",
                    next: "pop"
                }, {
                    include: "strings"
                }, {
                    include: "variables"
                }, {
                    include: "comments"
                }, {
                    defaultToken: "source.blade"
                }]
            }, {
                token: "injections.unescaped.begin.blade",
                regex: "\\{\\!\\!",
                push: [{
                    token: "injections.unescaped.end.blade",
                    regex: "\\!\\!\\}",
                    next: "pop"
                }, {
                    include: "strings"
                }, {
                    include: "variables"
                }, {
                    defaultToken: "source.blade"
                }]
            }

        ],

        lang: [{
            token: "keyword.operator.blade",
            regex: "(?:!=|!|<=|>=|<|>|===|==|=|\\+\\+|\\;|\\,|%|&&|\\|\\|)|\\b(?:and|or|eq|neq|ne|gte|gt|ge|lte|lt|le|not|mod|as)\\b"
        }, {
            token: "constant.language.blade",
            regex: "\\b(?:TRUE|FALSE|true|false)\\b"
        }],
        strings: [{
            token: "punctuation.definition.string.begin.blade",
            regex: "\"",
            push: [{
                token: "punctuation.definition.string.end.blade",
                regex: "\"",
                next: "pop"
            }, {
                token: "string.character.escape.blade",
                regex: "\\\\."
            }, {
                defaultToken: "string.quoted.single.blade"
            }]
        }, {
            token: "punctuation.definition.string.begin.blade",
            regex: "'",
            push: [{
                token: "punctuation.definition.string.end.blade",
                regex: "'",
                next: "pop"
            }, {
                token: "string.character.escape.blade",
                regex: "\\\\."
            }, {
                defaultToken: "string.quoted.double.blade"
            }]
        }],
        variables: [{
            token: "variable.blade",
            regex: "\\$([a-zA-Z_][a-zA-Z0-9_]*)\\b"
        }, {
            token: ["keyword.operator.blade", "constant.other.property.blade"],
            regex: "(->)([a-zA-Z_][a-zA-Z0-9_]*)\\b"
        }, {
            token: ["keyword.operator.blade",
                "meta.function-call.object.blade",
                "punctuation.definition.variable.blade",
                "variable.blade",
                "punctuation.definition.variable.blade"
            ],
            regex: "(->)([a-zA-Z_][a-zA-Z0-9_]*)(\\()(.*?)(\\))"
        }]
    };

    var bladeStart = bladeRules.start;

    for (var rule in this.$rules) {
        this.$rules[rule].unshift.apply(this.$rules[rule], bladeStart);
    }

    Object.keys(bladeRules).forEach(function(x) {
        if (!this.$rules[x])
            this.$rules[x] = bladeRules[x];
    }, this);

    this.normalizeRules();
};


oop.inherits(PHPLaravelBladeHighlightRules, PhpHighlightRules);

exports.n = PHPLaravelBladeHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjMyMTIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsY0FBYyxtQkFBTyxDQUFDLElBQVk7QUFDbEMsd0NBQXdDLG1FQUE0RTtBQUNwSCxrQkFBa0IsaUNBQXFCO0FBQ3ZDLHlCQUF5QixpQ0FBNEI7QUFDckQsa0JBQWtCLGlDQUFxQjtBQUN2QyxtQkFBbUIsaUNBQXNCOztBQUV6QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUwsSUFBSSxZQUFZOzs7Ozs7OztBQzFCSDs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5Qix3QkFBd0IsdURBQWtEOztBQUUxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsMEJBQTBCLEdBQUc7QUFDN0I7QUFDQTtBQUNBLG9DQUFvQyxHQUFHO0FBQ3ZDO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsZ0NBQWdDLEdBQUc7QUFDbkM7QUFDQTtBQUNBLCtCQUErQixHQUFHO0FBQ2xDO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0EscUNBQXFDO0FBQ3JDO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBOztBQUVBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7OztBQUdBOztBQUVBLFNBQXFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9waHBfbGFyYXZlbF9ibGFkZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3BocF9sYXJhdmVsX2JsYWRlX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbiAgICB2YXIgUEhQTGFyYXZlbEJsYWRlSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9waHBfbGFyYXZlbF9ibGFkZV9oaWdobGlnaHRfcnVsZXNcIikuUEhQTGFyYXZlbEJsYWRlSGlnaGxpZ2h0UnVsZXM7XG4gICAgdmFyIFBIUE1vZGUgPSByZXF1aXJlKFwiLi9waHBcIikuTW9kZTtcbiAgICB2YXIgSmF2YVNjcmlwdE1vZGUgPSByZXF1aXJlKFwiLi9qYXZhc2NyaXB0XCIpLk1vZGU7XG4gICAgdmFyIENzc01vZGUgPSByZXF1aXJlKFwiLi9jc3NcIikuTW9kZTtcbiAgICB2YXIgSHRtbE1vZGUgPSByZXF1aXJlKFwiLi9odG1sXCIpLk1vZGU7XG5cbiAgICB2YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBQSFBNb2RlLmNhbGwodGhpcyk7XG5cbiAgICAgICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFBIUExhcmF2ZWxCbGFkZUhpZ2hsaWdodFJ1bGVzO1xuICAgICAgICB0aGlzLmNyZWF0ZU1vZGVEZWxlZ2F0ZXMoe1xuICAgICAgICAgICAgXCJqcy1cIjogSmF2YVNjcmlwdE1vZGUsXG4gICAgICAgICAgICBcImNzcy1cIjogQ3NzTW9kZSxcbiAgICAgICAgICAgIFwiaHRtbC1cIjogSHRtbE1vZGVcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBvb3AuaW5oZXJpdHMoTW9kZSwgUEhQTW9kZSk7XG5cbiAgICAoZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL3BocF9sYXJhdmVsX2JsYWRlXCI7XG4gICAgfSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbiAgICBleHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBQaHBIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3BocF9oaWdobGlnaHRfcnVsZXNcIikuUGhwSGlnaGxpZ2h0UnVsZXM7XG5cbnZhciBQSFBMYXJhdmVsQmxhZGVIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIFBocEhpZ2hsaWdodFJ1bGVzLmNhbGwodGhpcyk7XG5cbiAgICB2YXIgYmxhZGVSdWxlcyA9IHtcbiAgICAgICAgc3RhcnQ6IFt7XG4gICAgICAgICAgICBpbmNsdWRlOiBcImJsYWRlQ29tbWVudHNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcImRpcmVjdGl2ZXNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcInBhcmVudGhlc2lzXCJcbiAgICAgICAgfV0sXG4gICAgICAgIGNvbW1lbnRzOiBbe1xuICAgICAgICAgICAgaW5jbHVkZTogXCJibGFkZUNvbW1lbnRzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5jb21tZW50LmJsYWRlXCIsXG4gICAgICAgICAgICByZWdleDogXCIoXFxcXC9cXFxcLyguKSopfChcXFxcIyguKSopXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5jb21tZW50LmJlZ2luLnBocFwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKD86XFxcXC9cXFxcKilcIixcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5jb21tZW50LmVuZC5waHBcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIoPzpcXFxcKlxcXFwvKVwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwiY29tbWVudC5ibG9jay5ibGFkZVwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSwgXG4gICAgICAgIGJsYWRlQ29tbWVudHM6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmNvbW1lbnQuYmVnaW4uYmxhZGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIig/OlxcXFx7XFxcXHtcXFxcLVxcXFwtKVwiLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmNvbW1lbnQuZW5kLmJsYWRlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiKD86XFxcXC1cXFxcLVxcXFx9XFxcXH0pXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50LmJsb2NrLmJsYWRlXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuICAgICAgICBwYXJlbnRoZXNpczogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInBhcmVudGhlc2lzLmJlZ2luLmJsYWRlXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcKFwiLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwYXJlbnRoZXNpcy5lbmQuYmxhZGVcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcKVwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcInN0cmluZ3NcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwidmFyaWFibGVzXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcImxhbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwicGFyZW50aGVzaXNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiY29tbWVudHNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzb3VyY2UuYmxhZGVcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIGRpcmVjdGl2ZXM6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcImRpcmVjdGl2ZS5kZWNsYXJhdGlvbi5ibGFkZVwiLCBcImtleXdvcmQuZGlyZWN0aXZlcy5ibGFkZVwiXSxcbiAgICAgICAgICAgICAgICByZWdleDogXCIoQCkoZW5kdW5sZXNzfGVuZGlzc2V0fGVuZGVtcHR5fGVuZGF1dGh8ZW5kZ3Vlc3R8ZW5kY29tcG9uZW50fGVuZHNsb3R8ZW5kYWxlcnR8ZW5kdmVyYmF0aW18ZW5kc2VjdGlvbnxzaG93fHBocHxlbmRwaHB8ZW5kcHVzaHxlbmRwcmVwZW5kfGVuZGVudnxlbmRmb3JlbHNlfGlzc2V0fGVtcHR5fGNvbXBvbmVudHxzbG90fGFsZXJ0fGpzb258dmVyYmF0aW18c2VjdGlvbnxhdXRofGd1ZXN0fGhhc1NlY3Rpb258Zm9yZWxzZXxpbmNsdWRlSWZ8aW5jbHVkZVdoZW58aW5jbHVkZUZpcnN0fGVhY2h8cHVzaHxzdGFja3xwcmVwZW5kfGluamVjdHxlbnZ8ZWxzZWVudnx1bmxlc3N8eWllbGR8ZXh0ZW5kc3xwYXJlbnR8aW5jbHVkZXxhY2ZyZXBlYXRlcnxibG9ja3xjYW58Y2Fubm90fGNob2ljZXxkZWJ1Z3xlbHNlY2FufGVsc2VjYW5ub3R8ZW1iZWR8aGlwY2hhdHxsYW5nfGxheW91dHxtYWNyb3xtYWNyb2RlZnxtaW5pZnl8cGFydGlhbHxyZW5kZXJ8c2VydmVyc3xzZXR8c2xhY2t8c3Rvcnl8dGFza3x1bnNldHx3cHBvc3RzfGFjZmVuZHxhZnRlcnxhcHBlbmR8YnJlYWtwb2ludHxlbmRhZnRlcnxlbmRjYW58ZW5kY2Fubm90fGVuZGVtYmVkfGVuZG1hY3JvfGVuZG1hcmtkb3dufGVuZG1pbmlmeXxlbmRwYXJ0aWFsfGVuZHNldHVwfGVuZHN0b3J5fGVuZHRhc2t8ZW5kdW5sZXNzfG1hcmtkb3dufG92ZXJ3cml0ZXxzZXR1cHxzdG9wfHdwZW1wdHl8d3BlbmR8d3BxdWVyeSlcIlxuXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcImRpcmVjdGl2ZS5kZWNsYXJhdGlvbi5ibGFkZVwiLCBcImtleXdvcmQuY29udHJvbC5ibGFkZVwiXSxcbiAgICAgICAgICAgICAgICByZWdleDogXCIoQCkoaWZ8ZWxzZXxlbHNlaWZ8ZW5kaWZ8Zm9yZWFjaHxlbmRmb3JlYWNofHN3aXRjaHxjYXNlfGJyZWFrfGRlZmF1bHR8ZW5kc3dpdGNofGZvcnxlbmRmb3J8d2hpbGV8ZW5kd2hpbGV8Y29udGludWUpXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogW1wiZGlyZWN0aXZlLmlnbm9yZS5ibGFkZVwiLCBcImluamVjdGlvbnMuYmVnaW4uYmxhZGVcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiKEA/KShcXFxce1xcXFx7KVwiLFxuICAgICAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImluamVjdGlvbnMuZW5kLmJsYWRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFx9XFxcXH1cIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCJzdHJpbmdzXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwidmFyaWFibGVzXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiY29tbWVudHNcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInNvdXJjZS5ibGFkZVwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJpbmplY3Rpb25zLnVuZXNjYXBlZC5iZWdpbi5ibGFkZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFx7XFxcXCFcXFxcIVwiLFxuICAgICAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgICAgIHRva2VuOiBcImluamVjdGlvbnMudW5lc2NhcGVkLmVuZC5ibGFkZVwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcIVxcXFwhXFxcXH1cIixcbiAgICAgICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCJzdHJpbmdzXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwidmFyaWFibGVzXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzb3VyY2UuYmxhZGVcIlxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXSxcblxuICAgICAgICBsYW5nOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZC5vcGVyYXRvci5ibGFkZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKD86IT18IXw8PXw+PXw8fD58PT09fD09fD18XFxcXCtcXFxcK3xcXFxcO3xcXFxcLHwlfCYmfFxcXFx8XFxcXHwpfFxcXFxiKD86YW5kfG9yfGVxfG5lcXxuZXxndGV8Z3R8Z2V8bHRlfGx0fGxlfG5vdHxtb2R8YXMpXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5sYW5ndWFnZS5ibGFkZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiXFxcXGIoPzpUUlVFfEZBTFNFfHRydWV8ZmFsc2UpXFxcXGJcIlxuICAgICAgICB9XSxcbiAgICAgICAgc3RyaW5nczogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmJlZ2luLmJsYWRlXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFwiXCIsXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmVuZC5ibGFkZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXCJcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmNoYXJhY3Rlci5lc2NhcGUuYmxhZGVcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcXFxcXC5cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucXVvdGVkLnNpbmdsZS5ibGFkZVwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5iZWdpbi5ibGFkZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiJ1wiLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5lbmQuYmxhZGVcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCInXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5jaGFyYWN0ZXIuZXNjYXBlLmJsYWRlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXFxcXFwuXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nLnF1b3RlZC5kb3VibGUuYmxhZGVcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIHZhcmlhYmxlczogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInZhcmlhYmxlLmJsYWRlXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcJChbYS16QS1aX11bYS16QS1aMC05X10qKVxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcImtleXdvcmQub3BlcmF0b3IuYmxhZGVcIiwgXCJjb25zdGFudC5vdGhlci5wcm9wZXJ0eS5ibGFkZVwiXSxcbiAgICAgICAgICAgIHJlZ2V4OiBcIigtPikoW2EtekEtWl9dW2EtekEtWjAtOV9dKilcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBbXCJrZXl3b3JkLm9wZXJhdG9yLmJsYWRlXCIsXG4gICAgICAgICAgICAgICAgXCJtZXRhLmZ1bmN0aW9uLWNhbGwub2JqZWN0LmJsYWRlXCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnZhcmlhYmxlLmJsYWRlXCIsXG4gICAgICAgICAgICAgICAgXCJ2YXJpYWJsZS5ibGFkZVwiLFxuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi52YXJpYWJsZS5ibGFkZVwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IFwiKC0+KShbYS16QS1aX11bYS16QS1aMC05X10qKShcXFxcKCkoLio/KShcXFxcKSlcIlxuICAgICAgICB9XVxuICAgIH07XG5cbiAgICB2YXIgYmxhZGVTdGFydCA9IGJsYWRlUnVsZXMuc3RhcnQ7XG5cbiAgICBmb3IgKHZhciBydWxlIGluIHRoaXMuJHJ1bGVzKSB7XG4gICAgICAgIHRoaXMuJHJ1bGVzW3J1bGVdLnVuc2hpZnQuYXBwbHkodGhpcy4kcnVsZXNbcnVsZV0sIGJsYWRlU3RhcnQpO1xuICAgIH1cblxuICAgIE9iamVjdC5rZXlzKGJsYWRlUnVsZXMpLmZvckVhY2goZnVuY3Rpb24oeCkge1xuICAgICAgICBpZiAoIXRoaXMuJHJ1bGVzW3hdKVxuICAgICAgICAgICAgdGhpcy4kcnVsZXNbeF0gPSBibGFkZVJ1bGVzW3hdO1xuICAgIH0sIHRoaXMpO1xuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxuXG5vb3AuaW5oZXJpdHMoUEhQTGFyYXZlbEJsYWRlSGlnaGxpZ2h0UnVsZXMsIFBocEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5QSFBMYXJhdmVsQmxhZGVIaWdobGlnaHRSdWxlcyA9IFBIUExhcmF2ZWxCbGFkZUhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9