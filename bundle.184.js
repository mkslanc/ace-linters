"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[184],{

/***/ 70184:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



    var oop = __webpack_require__(89359);
    var PHPLaravelBladeHighlightRules = (__webpack_require__(15426)/* .PHPLaravelBladeHighlightRules */ ._);
    var PHPMode = (__webpack_require__(48681).Mode);
    var JavaScriptMode = (__webpack_require__(88057).Mode);
    var CssMode = (__webpack_require__(98771).Mode);
    var HtmlMode = (__webpack_require__(75528).Mode);

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

/***/ 15426:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var PhpHighlightRules = (__webpack_require__(63857)/* .PhpHighlightRules */ .l);

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

exports._ = PHPLaravelBladeHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjE4NC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYixjQUFjLG1CQUFPLENBQUMsS0FBWTtBQUNsQyx3Q0FBd0MsbUVBQTRFO0FBQ3BILGtCQUFrQixpQ0FBcUI7QUFDdkMseUJBQXlCLGlDQUE0QjtBQUNyRCxrQkFBa0IsaUNBQXFCO0FBQ3ZDLG1CQUFtQixpQ0FBc0I7O0FBRXpDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTCxJQUFJLFlBQVk7Ozs7Ozs7O0FDMUJIOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxLQUFZO0FBQzlCLHdCQUF3Qix1REFBa0Q7O0FBRTFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSwwQkFBMEIsR0FBRztBQUM3QjtBQUNBO0FBQ0Esb0NBQW9DLEdBQUc7QUFDdkM7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxnQ0FBZ0MsR0FBRztBQUNuQztBQUNBO0FBQ0EsK0JBQStCLEdBQUc7QUFDbEM7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0EsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHlEQUF5RDtBQUN6RCxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7O0FBR0E7O0FBRUEsU0FBcUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3BocF9sYXJhdmVsX2JsYWRlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvcGhwX2xhcmF2ZWxfYmxhZGVfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xuICAgIHZhciBQSFBMYXJhdmVsQmxhZGVIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3BocF9sYXJhdmVsX2JsYWRlX2hpZ2hsaWdodF9ydWxlc1wiKS5QSFBMYXJhdmVsQmxhZGVIaWdobGlnaHRSdWxlcztcbiAgICB2YXIgUEhQTW9kZSA9IHJlcXVpcmUoXCIuL3BocFwiKS5Nb2RlO1xuICAgIHZhciBKYXZhU2NyaXB0TW9kZSA9IHJlcXVpcmUoXCIuL2phdmFzY3JpcHRcIikuTW9kZTtcbiAgICB2YXIgQ3NzTW9kZSA9IHJlcXVpcmUoXCIuL2Nzc1wiKS5Nb2RlO1xuICAgIHZhciBIdG1sTW9kZSA9IHJlcXVpcmUoXCIuL2h0bWxcIikuTW9kZTtcblxuICAgIHZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIFBIUE1vZGUuY2FsbCh0aGlzKTtcblxuICAgICAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gUEhQTGFyYXZlbEJsYWRlSGlnaGxpZ2h0UnVsZXM7XG4gICAgICAgIHRoaXMuY3JlYXRlTW9kZURlbGVnYXRlcyh7XG4gICAgICAgICAgICBcImpzLVwiOiBKYXZhU2NyaXB0TW9kZSxcbiAgICAgICAgICAgIFwiY3NzLVwiOiBDc3NNb2RlLFxuICAgICAgICAgICAgXCJodG1sLVwiOiBIdG1sTW9kZVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIG9vcC5pbmhlcml0cyhNb2RlLCBQSFBNb2RlKTtcblxuICAgIChmdW5jdGlvbigpIHtcblxuICAgICAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvcGhwX2xhcmF2ZWxfYmxhZGVcIjtcbiAgICB9KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuICAgIGV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFBocEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vcGhwX2hpZ2hsaWdodF9ydWxlc1wiKS5QaHBIaWdobGlnaHRSdWxlcztcblxudmFyIFBIUExhcmF2ZWxCbGFkZUhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgUGhwSGlnaGxpZ2h0UnVsZXMuY2FsbCh0aGlzKTtcblxuICAgIHZhciBibGFkZVJ1bGVzID0ge1xuICAgICAgICBzdGFydDogW3tcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiYmxhZGVDb21tZW50c1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiZGlyZWN0aXZlc1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwicGFyZW50aGVzaXNcIlxuICAgICAgICB9XSxcbiAgICAgICAgY29tbWVudHM6IFt7XG4gICAgICAgICAgICBpbmNsdWRlOiBcImJsYWRlQ29tbWVudHNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmNvbW1lbnQuYmxhZGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIihcXFxcL1xcXFwvKC4pKil8KFxcXFwjKC4pKilcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmNvbW1lbnQuYmVnaW4ucGhwXCIsXG4gICAgICAgICAgICByZWdleDogXCIoPzpcXFxcL1xcXFwqKVwiLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmNvbW1lbnQuZW5kLnBocFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIig/OlxcXFwqXFxcXC8pXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJjb21tZW50LmJsb2NrLmJsYWRlXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLCBcbiAgICAgICAgYmxhZGVDb21tZW50czogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uY29tbWVudC5iZWdpbi5ibGFkZVwiLFxuICAgICAgICAgICAgcmVnZXg6IFwiKD86XFxcXHtcXFxce1xcXFwtXFxcXC0pXCIsXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uY29tbWVudC5lbmQuYmxhZGVcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCIoPzpcXFxcLVxcXFwtXFxcXH1cXFxcfSlcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnQuYmxvY2suYmxhZGVcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIHBhcmVudGhlc2lzOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwicGFyZW50aGVzaXMuYmVnaW4uYmxhZGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwoXCIsXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInBhcmVudGhlc2lzLmVuZC5ibGFkZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwpXCIsXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwic3RyaW5nc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCJ2YXJpYWJsZXNcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwibGFuZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCJwYXJlbnRoZXNpc1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCJjb21tZW50c1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInNvdXJjZS5ibGFkZVwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgZGlyZWN0aXZlczogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogW1wiZGlyZWN0aXZlLmRlY2xhcmF0aW9uLmJsYWRlXCIsIFwia2V5d29yZC5kaXJlY3RpdmVzLmJsYWRlXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIihAKShlbmR1bmxlc3N8ZW5kaXNzZXR8ZW5kZW1wdHl8ZW5kYXV0aHxlbmRndWVzdHxlbmRjb21wb25lbnR8ZW5kc2xvdHxlbmRhbGVydHxlbmR2ZXJiYXRpbXxlbmRzZWN0aW9ufHNob3d8cGhwfGVuZHBocHxlbmRwdXNofGVuZHByZXBlbmR8ZW5kZW52fGVuZGZvcmVsc2V8aXNzZXR8ZW1wdHl8Y29tcG9uZW50fHNsb3R8YWxlcnR8anNvbnx2ZXJiYXRpbXxzZWN0aW9ufGF1dGh8Z3Vlc3R8aGFzU2VjdGlvbnxmb3JlbHNlfGluY2x1ZGVJZnxpbmNsdWRlV2hlbnxpbmNsdWRlRmlyc3R8ZWFjaHxwdXNofHN0YWNrfHByZXBlbmR8aW5qZWN0fGVudnxlbHNlZW52fHVubGVzc3x5aWVsZHxleHRlbmRzfHBhcmVudHxpbmNsdWRlfGFjZnJlcGVhdGVyfGJsb2NrfGNhbnxjYW5ub3R8Y2hvaWNlfGRlYnVnfGVsc2VjYW58ZWxzZWNhbm5vdHxlbWJlZHxoaXBjaGF0fGxhbmd8bGF5b3V0fG1hY3JvfG1hY3JvZGVmfG1pbmlmeXxwYXJ0aWFsfHJlbmRlcnxzZXJ2ZXJzfHNldHxzbGFja3xzdG9yeXx0YXNrfHVuc2V0fHdwcG9zdHN8YWNmZW5kfGFmdGVyfGFwcGVuZHxicmVha3BvaW50fGVuZGFmdGVyfGVuZGNhbnxlbmRjYW5ub3R8ZW5kZW1iZWR8ZW5kbWFjcm98ZW5kbWFya2Rvd258ZW5kbWluaWZ5fGVuZHBhcnRpYWx8ZW5kc2V0dXB8ZW5kc3Rvcnl8ZW5kdGFza3xlbmR1bmxlc3N8bWFya2Rvd258b3ZlcndyaXRlfHNldHVwfHN0b3B8d3BlbXB0eXx3cGVuZHx3cHF1ZXJ5KVwiXG5cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogW1wiZGlyZWN0aXZlLmRlY2xhcmF0aW9uLmJsYWRlXCIsIFwia2V5d29yZC5jb250cm9sLmJsYWRlXCJdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIihAKShpZnxlbHNlfGVsc2VpZnxlbmRpZnxmb3JlYWNofGVuZGZvcmVhY2h8c3dpdGNofGNhc2V8YnJlYWt8ZGVmYXVsdHxlbmRzd2l0Y2h8Zm9yfGVuZGZvcnx3aGlsZXxlbmR3aGlsZXxjb250aW51ZSlcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXCJkaXJlY3RpdmUuaWdub3JlLmJsYWRlXCIsIFwiaW5qZWN0aW9ucy5iZWdpbi5ibGFkZVwiXSxcbiAgICAgICAgICAgICAgICByZWdleDogXCIoQD8pKFxcXFx7XFxcXHspXCIsXG4gICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiaW5qZWN0aW9ucy5lbmQuYmxhZGVcIixcbiAgICAgICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXH1cXFxcfVwiLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcInN0cmluZ3NcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCJ2YXJpYWJsZXNcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCJjb21tZW50c1wiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic291cmNlLmJsYWRlXCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBcImluamVjdGlvbnMudW5lc2NhcGVkLmJlZ2luLmJsYWRlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcXHtcXFxcIVxcXFwhXCIsXG4gICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwiaW5qZWN0aW9ucy51bmVzY2FwZWQuZW5kLmJsYWRlXCIsXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwhXFxcXCFcXFxcfVwiLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcInN0cmluZ3NcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCJ2YXJpYWJsZXNcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInNvdXJjZS5ibGFkZVwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdLFxuXG4gICAgICAgIGxhbmc6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkLm9wZXJhdG9yLmJsYWRlXCIsXG4gICAgICAgICAgICByZWdleDogXCIoPzohPXwhfDw9fD49fDx8Pnw9PT18PT18PXxcXFxcK1xcXFwrfFxcXFw7fFxcXFwsfCV8JiZ8XFxcXHxcXFxcfCl8XFxcXGIoPzphbmR8b3J8ZXF8bmVxfG5lfGd0ZXxndHxnZXxsdGV8bHR8bGV8bm90fG1vZHxhcylcXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImNvbnN0YW50Lmxhbmd1YWdlLmJsYWRlXCIsXG4gICAgICAgICAgICByZWdleDogXCJcXFxcYig/OlRSVUV8RkFMU0V8dHJ1ZXxmYWxzZSlcXFxcYlwiXG4gICAgICAgIH1dLFxuICAgICAgICBzdHJpbmdzOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuYmVnaW4uYmxhZGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXCJcIixcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuZW5kLmJsYWRlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IFwiXFxcIlwiLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmcuY2hhcmFjdGVyLmVzY2FwZS5ibGFkZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFxcXFxcLlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZy5xdW90ZWQuc2luZ2xlLmJsYWRlXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmJlZ2luLmJsYWRlXCIsXG4gICAgICAgICAgICByZWdleDogXCInXCIsXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmVuZC5ibGFkZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIidcIixcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLmNoYXJhY3Rlci5lc2NhcGUuYmxhZGVcIixcbiAgICAgICAgICAgICAgICByZWdleDogXCJcXFxcXFxcXC5cIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJzdHJpbmcucXVvdGVkLmRvdWJsZS5ibGFkZVwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgdmFyaWFibGVzOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwidmFyaWFibGUuYmxhZGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiBcIlxcXFwkKFthLXpBLVpfXVthLXpBLVowLTlfXSopXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogW1wia2V5d29yZC5vcGVyYXRvci5ibGFkZVwiLCBcImNvbnN0YW50Lm90aGVyLnByb3BlcnR5LmJsYWRlXCJdLFxuICAgICAgICAgICAgcmVnZXg6IFwiKC0+KShbYS16QS1aX11bYS16QS1aMC05X10qKVxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcImtleXdvcmQub3BlcmF0b3IuYmxhZGVcIixcbiAgICAgICAgICAgICAgICBcIm1ldGEuZnVuY3Rpb24tY2FsbC5vYmplY3QuYmxhZGVcIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udmFyaWFibGUuYmxhZGVcIixcbiAgICAgICAgICAgICAgICBcInZhcmlhYmxlLmJsYWRlXCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnZhcmlhYmxlLmJsYWRlXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogXCIoLT4pKFthLXpBLVpfXVthLXpBLVowLTlfXSopKFxcXFwoKSguKj8pKFxcXFwpKVwiXG4gICAgICAgIH1dXG4gICAgfTtcblxuICAgIHZhciBibGFkZVN0YXJ0ID0gYmxhZGVSdWxlcy5zdGFydDtcblxuICAgIGZvciAodmFyIHJ1bGUgaW4gdGhpcy4kcnVsZXMpIHtcbiAgICAgICAgdGhpcy4kcnVsZXNbcnVsZV0udW5zaGlmdC5hcHBseSh0aGlzLiRydWxlc1tydWxlXSwgYmxhZGVTdGFydCk7XG4gICAgfVxuXG4gICAgT2JqZWN0LmtleXMoYmxhZGVSdWxlcykuZm9yRWFjaChmdW5jdGlvbih4KSB7XG4gICAgICAgIGlmICghdGhpcy4kcnVsZXNbeF0pXG4gICAgICAgICAgICB0aGlzLiRydWxlc1t4XSA9IGJsYWRlUnVsZXNbeF07XG4gICAgfSwgdGhpcyk7XG5cbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5cbm9vcC5pbmhlcml0cyhQSFBMYXJhdmVsQmxhZGVIaWdobGlnaHRSdWxlcywgUGhwSGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLlBIUExhcmF2ZWxCbGFkZUhpZ2hsaWdodFJ1bGVzID0gUEhQTGFyYXZlbEJsYWRlSGlnaGxpZ2h0UnVsZXM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=