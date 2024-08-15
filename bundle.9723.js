"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9723],{

/***/ 59723:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var MediaWikiHighlightRules = (__webpack_require__(55696)/* .MediaWikiHighlightRules */ .o);

var Mode = function() {
    this.HighlightRules = MediaWikiHighlightRules;
};
oop.inherits(Mode, TextMode);

(function() {
    this.type = "text";
    this.blockComment = {start: "<!--", end: "-->"};
    this.$id = "ace/mode/mediawiki";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 55696:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var MediaWikiHighlightRules = function() {
    this.$rules = {
        start: [{
            include: "#switch"
        }, {
            include: "#redirect"
        }, {
            include: "#variable"
        }, {
            include: "#comment"
        }, {
            include: "#entity"
        }, {
            include: "#emphasis"
        }, {
            include: "#tag"
        }, {
            include: "#table"
        }, {
            include: "#hr"
        }, {
            include: "#heading"
        }, {
            include: "#link"
        }, {
            include: "#list"
        }, {
            include: "#template"
        }],
        "#hr": [{
            token: "markup.bold",
            regex: /^[-]{4,}/
        }],
        "#switch": [{
            token: "constant.language",
            regex: /(__NOTOC__|__FORCETOC__|__TOC__|__NOEDITSECTION__|__NEWSECTIONLINK__|__NONEWSECTIONLINK__|__NOWYSIWYG__|__NOGALLERY__|__HIDDENCAT__|__EXPECTUNUSEDCATEGORY__|__NOCONTENTCONVERT__|__NOCC__|__NOTITLECONVERT__|__NOTC__|__START__|__END__|__INDEX__|__NOINDEX__|__STATICREDIRECT__|__NOGLOBAL__|__DISAMBIG__)/
        }],
        "#redirect": [{
            token: [
                "keyword.control.redirect",
                "meta.keyword.control"
            ],
            regex: /(^#REDIRECT|^#redirect|^#Redirect)(\s+)/
        }],
        "#variable": [{
            token: "storage.type.variable",
            regex: /{{{/,
            push: [{
                token: "storage.type.variable",
                regex: /}}}/,
                next: "pop"
            }, {
                token: [
                    "text",
                    "variable.other",
                    "text",
                    "keyword.operator"
                ],
                regex: /(\s*)(\w+)(\s*)((?:\|)?)/
            }, {
                defaultToken: "storage.type.variable"
            }]
        }],
        "#entity": [{
            token: "constant.character.entity",
            regex: /&\w+;/
        }],
        "#list": [{
            token: "markup.bold",
            regex: /^[#*;:]+/,
            push: [{
                token: "markup.list",
                regex: /$/,
                next: "pop"
            }, {
                include: "$self"
            }, {
                defaultToken: "markup.list"
            }]
        }],
        "#template": [{
            token: [
                "storage.type.function",
                "meta.template",
                "entity.name.function",
                "meta.template"
            ],
            regex: /({{)(\s*)([#\w: ]+)(\s*)/,
            push: [{
                token: "storage.type.function",
                regex: /}}/,
                next: "pop"
            }, {
                token: [
                    "storage",
                    "meta.structure.dictionary",
                    "support.type.property-name",
                    "meta.structure.dictionary",
                    "punctuation.separator.dictionary.key-value",
                    "meta.structure.dictionary",
                    "meta.structure.dictionary.value"
                ],
                regex: /(\|)(\s*)([a-zA-Z-]*)(\s*)(=)(\s*)([^|}]*)/,
                push: [{
                    token: "meta.structure.dictionary",
                    regex: /(?=}}|[|])/,
                    next: "pop"
                }, {
                    defaultToken: "meta.structure.dictionary"
                }]
            }, {
                token: ["storage", "meta.template.value"],
                regex: /(\|)(.*?)/,
                push: [{
                    token: [],
                    regex: /(?=}}|[|])/,
                    next: "pop"
                }, {
                    include: "$self"
                }, {
                    defaultToken: "meta.template.value"
                }]
            }, {
                defaultToken: "meta.template"
            }]
        }],
        "#link": [{
            token: [
                "punctuation.definition.tag.begin",
                "meta.tag.link.internal",
                "entity.name.tag",
                "meta.tag.link.internal",
                "string.other.link.title",
                "meta.tag.link.internal",
                "punctuation.definition.tag"
            ],
            regex: /(\[\[)(\s*)((?:Category|Wikipedia)?)(:?)([^\]\]\|]+)(\s*)((?:\|)*)/,
            push: [{
                token: "punctuation.definition.tag.end",
                regex: /\]\]/,
                next: "pop"
            }, {
                include: "$self"
            }, {
                defaultToken: "meta.tag.link.internal"
            }]
        }, {
            token: [
                "punctuation.definition.tag.begin",
                "meta.tag.link.external",
                "meta.tag.link.external",
                "string.unquoted",
                "punctuation.definition.tag.end"
            ],
            regex: /(\[)(.*?)([\s]+)(.*?)(\])/
        }],
        "#comment": [{
            token: "punctuation.definition.comment.html",
            regex: /<!--/,
            push: [{
                token: "punctuation.definition.comment.html",
                regex: /-->/,
                next: "pop"
            }, {
                defaultToken: "comment.block.html"
            }]
        }],
        "#emphasis": [{
            token: [
                "punctuation.definition.tag.begin",
                "markup.italic.bold",
                "punctuation.definition.tag.end"
            ],
            regex: /(''''')(?!')(.*?)('''''|$)/
        }, {
            token: [
                "punctuation.definition.tag.begin",
                "markup.bold",
                "punctuation.definition.tag.end"
            ],
            regex: /(''')(?!')(.*?)('''|$)/
        }, {
            token: [
                "punctuation.definition.tag.begin",
                "markup.italic",
                "punctuation.definition.tag.end"
            ],
            regex: /('')(?!')(.*?)(''|$)/
        }],
        "#heading": [{
            token: [
                "punctuation.definition.heading",
                "entity.name.section",
                "punctuation.definition.heading"
            ],
            regex: /(={1,6})(.+?)(\1)(?!=)/
        }],
        "#tag": [{
            token: [
                "punctuation.definition.tag.begin",
                "entity.name.tag",
                "meta.tag.block.ref",
                "punctuation.definition.tag.end"
            ],
            regex: /(<)(ref)((?:\s+.*?)?)(>)/,
            caseInsensitive: true,
            push: [{
                token: [
                    "punctuation.definition.tag.begin",
                    "entity.name.tag",
                    "meta.tag.block.ref",
                    "punctuation.definition.tag.end"
                ],
                regex: /(<\/)(ref)(\s*)(>)/,
                caseInsensitive: true,
                next: "pop"
            }, {
                include: "$self"
            }, {
                defaultToken: "meta.tag.block.ref"
            }]
        },
        {
            token: [
                "punctuation.definition.tag.begin",
                "entity.name.tag",
                "meta.tag.block.nowiki",
                "punctuation.definition.tag.end"
            ],
            regex: /(<)(nowiki)((?:\s+.*?)?)(>)/,
            caseInsensitive: true,
            push: [{
                token: [
                    "punctuation.definition.tag.begin",
                    "entity.name.tag",
                    "meta.tag.block.nowiki",
                    "punctuation.definition.tag.end"
                ],
                regex: /(<\/)(nowiki)(\s*)(>)/,
                caseInsensitive: true,
                next: "pop"
            }, {
                defaultToken: "meta.tag.block.nowiki"
            }]
        }, {
            token: [
                "punctuation.definition.tag.begin",
                "entity.name.tag"
            ],
            regex: /(<\/?)(noinclude|includeonly|onlyinclude)(?=\W)/,
            caseInsensitive: true,
            push: [{
                token: [
                    "invalid.illegal",
                    "punctuation.definition.tag.end"
                ],
                regex: /((?:\/)?)(>)/,
                next: "pop"
            }, {
                include: "#attribute"
            }, {
                defaultToken: "meta.tag.block.any"
            }]
        }, {
            token: [
                "punctuation.definition.tag.begin",
                "entity.name.tag"
            ],
            regex: /(<)(br|wbr|hr|meta|link)(?=\W)/,
            caseInsensitive: true,
            push: [{
                token: "punctuation.definition.tag.end",
                regex: /\/?>/,
                next: "pop"
            }, {
                include: "#attribute"
            }, {
                defaultToken: "meta.tag.other"
            }]
        }, {
            token: [
                "punctuation.definition.tag.begin",
                "entity.name.tag"
            ],
            regex: /(<\/?)(div|center|span|h1|h2|h3|h4|h5|h6|bdo|em|strong|cite|dfn|code|samp|kbd|var|abbr|blockquote|q|sub|sup|p|pre|ins|del|ul|ol|li|dl|dd|dt|table|caption|thead|tfoot|tbody|colgroup|col|tr|td|th|a|img|video|source|track|tt|b|i|big|small|strike|s|u|font|ruby|rb|rp|rt|rtc|math|figure|figcaption|bdi|data|time|mark|html)(?=\W)/,
            caseInsensitive: true,
            push: [{
                token: [
                    "invalid.illegal",
                    "punctuation.definition.tag.end"
                ],
                regex: /((?:\/)?)(>)/,
                next: "pop"
            }, {
                include: "#attribute"
            }, {
                defaultToken: "meta.tag.block"
            }]
        }, {
            token: [
                "punctuation.definition.tag.begin",
                "invalid.illegal"
            ],
            regex: /(<\/)(br|wbr|hr|meta|link)(?=\W)/,
            caseInsensitive: true,
            push: [{
                token: "punctuation.definition.tag.end",
                regex: /\/?>/,
                next: "pop"
            }, {
                include: "#attribute"
            }, {
                defaultToken: "meta.tag.other"
            }]
        }],
        "#caption": [{
            token: [
                "meta.tag.block.table-caption",
                "punctuation.definition.tag.begin"
            ],
            regex: /^(\s*)(\|\+)/,
            push: [{
                token: "meta.tag.block.table-caption",
                regex: /$/,
                next: "pop"
            }, {
                defaultToken: "meta.tag.block.table-caption"
            }]
        }],
        "#tr": [{
            token: [
                "meta.tag.block.tr",
                "punctuation.definition.tag.begin",
                "meta.tag.block.tr",
                "invalid.illegal"
            ],
            regex: /^(\s*)(\|\-)([\s]*)(.*)/
        }],
        "#th": [{
            token: [
                "meta.tag.block.th.heading",
                "punctuation.definition.tag.begin",
                "meta.tag.block.th.heading",
                "punctuation.definition.tag",
                "markup.bold"
            ],
            regex: /^(\s*)(!)(?:(.*?)(\|))?(.*?)(?=!!|$)/,
            push: [{
                token: "meta.tag.block.th.heading",
                regex: /$/,
                next: "pop"
            }, {
                token: [
                    "punctuation.definition.tag.begin",
                    "meta.tag.block.th.inline",
                    "punctuation.definition.tag",
                    "markup.bold"
                ],
                regex: /(!!)(?:(.*?)(\|))?(.*?)(?=!!|$)/
            }, {
                include: "$self"
            }, {
                defaultToken: "meta.tag.block.th.heading"
            }]
        }],
        "#td": [{
            token: [
                "meta.tag.block.td",
                "punctuation.definition.tag.begin"
            ],
            regex: /^(\s*)(\|)/,
            push: [{
                token: "meta.tag.block.td",
                regex: /$/,
                next: "pop"
            }, {
                include: "$self"
            }, {
                defaultToken: "meta.tag.block.td"
            }]
        }],
        "#table": [{
            patterns: [{
                name: "meta.tag.block.table",
                begin: "^\\s*({\\|)(.*?)$",
                end: "^\\s*\\|}",
                beginCaptures: {
                    1: {
                        name: "punctuation.definition.tag.begin"
                    },
                    2: {
                        patterns: [{
                            include: "#attribute"
                        }]
                    },
                    3: {
                        name: "invalid.illegal"
                    }
                },
                endCaptures: {
                    0: {
                        name: "punctuation.definition.tag.end"
                    }
                },
                patterns: [{
                    include: "#comment"
                }, {
                    include: "#template"
                }, {
                    include: "#caption"
                }, {
                    include: "#tr"
                }, {
                    include: "#th"
                }, {
                    include: "#td"
                }]
            }],
            repository: {
                caption: {
                    name: "meta.tag.block.table-caption",
                    begin: "^\\s*(\\|\\+)",
                    end: "$",
                    beginCaptures: {
                        1: {
                            name: "punctuation.definition.tag.begin"
                        }
                    }
                },
                tr: {
                    name: "meta.tag.block.tr",
                    match: "^\\s*(\\|\\-)[\\s]*(.*)",
                    captures: {
                        1: {
                            name: "punctuation.definition.tag.begin"
                        },
                        2: {
                            name: "invalid.illegal"
                        }
                    }
                },
                th: {
                    name: "meta.tag.block.th.heading",
                    begin: "^\\s*(!)((.*?)(\\|))?(.*?)(?=(!!)|$)",
                    end: "$",
                    beginCaptures: {
                        1: {
                            name: "punctuation.definition.tag.begin"
                        },
                        3: {
                            patterns: [{
                                include: "#attribute"
                            }]
                        },
                        4: {
                            name: "punctuation.definition.tag"
                        },
                        5: {
                            name: "markup.bold"
                        }
                    },
                    patterns: [{
                        name: "meta.tag.block.th.inline",
                        match: "(!!)((.*?)(\\|))?(.*?)(?=(!!)|$)",
                        captures: {
                            1: {
                                name: "punctuation.definition.tag.begin"
                            },
                            3: {
                                patterns: [{
                                    include: "#attribute"
                                }]
                            },
                            4: {
                                name: "punctuation.definition.tag"
                            },
                            5: {
                                name: "markup.bold"
                            }
                        }
                    }, {
                        include: "$self"
                    }]
                },
                td: {
                    name: "meta.tag.block.td",
                    begin: "^\\s*(\\|)",
                    end: "$",
                    beginCaptures: {
                        1: {
                            name: "punctuation.definition.tag.begin"
                        },
                        2: {
                            patterns: [{
                                include: "#attribute"
                            }]
                        },
                        3: {
                            name: "punctuation.definition.tag"
                        }
                    },
                    patterns: [{
                        include: "$self"
                    }]
                }
            }
        }],
        "#attribute": [{
            include: "#string"
        }, {
            token: "entity.other.attribute-name",
            regex: /\w+/
        }],
        "#string": [{
            token: "string.quoted.double",
            regex: /\"/,
            push: [{
                token: "string.quoted.double",
                regex: /\"/,
                next: "pop"
            }, {
                defaultToken: "string.quoted.double"
            }]
        }, {
            token: "string.quoted.single",
            regex: /\'/,
            push: [{
                token: "string.quoted.single",
                regex: /\'/,
                next: "pop"
            }, {
                defaultToken: "string.quoted.single"
            }]
        }],
        "#url": [{
            token: "markup.underline.link",
            regex: /(?:http(?:s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#\[\]@!\$&'\(\)\*\+,;=.]+/
        }, {
            token: "invalid.illegal",
            regex: /.*/
        }]
    };
    

    this.normalizeRules();
};

MediaWikiHighlightRules.metaData = {
    name: "MediaWiki",
    scopeName: "text.html.mediawiki",
    fileTypes: ["mediawiki", "wiki"]
};


oop.inherits(MediaWikiHighlightRules, TextHighlightRules);

exports.o = MediaWikiHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CLCtCQUErQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFDekI7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQyw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLHFCQUFxQjtBQUNyQixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EsZ0dBQWdHO0FBQ2hHLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTs7QUFFQSxTQUErQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWVkaWF3aWtpLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWVkaWF3aWtpX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIE1lZGlhV2lraUhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vbWVkaWF3aWtpX2hpZ2hsaWdodF9ydWxlc1wiKS5NZWRpYVdpa2lIaWdobGlnaHRSdWxlcztcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gTWVkaWFXaWtpSGlnaGxpZ2h0UnVsZXM7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudHlwZSA9IFwidGV4dFwiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIjwhLS1cIiwgZW5kOiBcIi0tPlwifTtcbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvbWVkaWF3aWtpXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTWVkaWFXaWtpSGlnaGxpZ2h0UnVsZXMgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLiRydWxlcyA9IHtcbiAgICAgICAgc3RhcnQ6IFt7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNzd2l0Y2hcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNyZWRpcmVjdFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI3ZhcmlhYmxlXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjY29tbWVudFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2VudGl0eVwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2VtcGhhc2lzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjdGFnXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjdGFibGVcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNoclwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI2hlYWRpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNsaW5rXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgaW5jbHVkZTogXCIjbGlzdFwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGluY2x1ZGU6IFwiI3RlbXBsYXRlXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2hyXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJtYXJrdXAuYm9sZFwiLFxuICAgICAgICAgICAgcmVnZXg6IC9eWy1dezQsfS9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI3N3aXRjaFwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwiY29uc3RhbnQubGFuZ3VhZ2VcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvKF9fTk9UT0NfX3xfX0ZPUkNFVE9DX198X19UT0NfX3xfX05PRURJVFNFQ1RJT05fX3xfX05FV1NFQ1RJT05MSU5LX198X19OT05FV1NFQ1RJT05MSU5LX198X19OT1dZU0lXWUdfX3xfX05PR0FMTEVSWV9ffF9fSElEREVOQ0FUX198X19FWFBFQ1RVTlVTRURDQVRFR09SWV9ffF9fTk9DT05URU5UQ09OVkVSVF9ffF9fTk9DQ19ffF9fTk9USVRMRUNPTlZFUlRfX3xfX05PVENfX3xfX1NUQVJUX198X19FTkRfX3xfX0lOREVYX198X19OT0lOREVYX198X19TVEFUSUNSRURJUkVDVF9ffF9fTk9HTE9CQUxfX3xfX0RJU0FNQklHX18pL1xuICAgICAgICB9XSxcbiAgICAgICAgXCIjcmVkaXJlY3RcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJrZXl3b3JkLmNvbnRyb2wucmVkaXJlY3RcIixcbiAgICAgICAgICAgICAgICBcIm1ldGEua2V5d29yZC5jb250cm9sXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogLyheI1JFRElSRUNUfF4jcmVkaXJlY3R8XiNSZWRpcmVjdCkoXFxzKykvXG4gICAgICAgIH1dLFxuICAgICAgICBcIiN2YXJpYWJsZVwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic3RvcmFnZS50eXBlLnZhcmlhYmxlXCIsXG4gICAgICAgICAgICByZWdleDogL3t7ey8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0b3JhZ2UudHlwZS52YXJpYWJsZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvfX19LyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwidmFyaWFibGUub3RoZXJcIixcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZXh0XCIsXG4gICAgICAgICAgICAgICAgICAgIFwia2V5d29yZC5vcGVyYXRvclwiXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZWdleDogLyhcXHMqKShcXHcrKShcXHMqKSgoPzpcXHwpPykvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0b3JhZ2UudHlwZS52YXJpYWJsZVwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgXCIjZW50aXR5XCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogXCJjb25zdGFudC5jaGFyYWN0ZXIuZW50aXR5XCIsXG4gICAgICAgICAgICByZWdleDogLyZcXHcrOy9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2xpc3RcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcIm1hcmt1cC5ib2xkXCIsXG4gICAgICAgICAgICByZWdleDogL15bIyo7Ol0rLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwibWFya3VwLmxpc3RcIixcbiAgICAgICAgICAgICAgICByZWdleDogLyQvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiRzZWxmXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwibWFya3VwLmxpc3RcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI3RlbXBsYXRlXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwic3RvcmFnZS50eXBlLmZ1bmN0aW9uXCIsXG4gICAgICAgICAgICAgICAgXCJtZXRhLnRlbXBsYXRlXCIsXG4gICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS5mdW5jdGlvblwiLFxuICAgICAgICAgICAgICAgIFwibWV0YS50ZW1wbGF0ZVwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC8oe3spKFxccyopKFsjXFx3OiBdKykoXFxzKikvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdG9yYWdlLnR5cGUuZnVuY3Rpb25cIixcbiAgICAgICAgICAgICAgICByZWdleDogL319LyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICAgICAgXCJzdG9yYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWV0YS5zdHJ1Y3R1cmUuZGljdGlvbmFyeVwiLFxuICAgICAgICAgICAgICAgICAgICBcInN1cHBvcnQudHlwZS5wcm9wZXJ0eS1uYW1lXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWV0YS5zdHJ1Y3R1cmUuZGljdGlvbmFyeVwiLFxuICAgICAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLnNlcGFyYXRvci5kaWN0aW9uYXJ5LmtleS12YWx1ZVwiLFxuICAgICAgICAgICAgICAgICAgICBcIm1ldGEuc3RydWN0dXJlLmRpY3Rpb25hcnlcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtZXRhLnN0cnVjdHVyZS5kaWN0aW9uYXJ5LnZhbHVlXCJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvKFxcfCkoXFxzKikoW2EtekEtWi1dKikoXFxzKikoPSkoXFxzKikoW158fV0qKS8sXG4gICAgICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICAgICAgdG9rZW46IFwibWV0YS5zdHJ1Y3R1cmUuZGljdGlvbmFyeVwiLFxuICAgICAgICAgICAgICAgICAgICByZWdleDogLyg/PX19fFt8XSkvLFxuICAgICAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwibWV0YS5zdHJ1Y3R1cmUuZGljdGlvbmFyeVwiXG4gICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogW1wic3RvcmFnZVwiLCBcIm1ldGEudGVtcGxhdGUudmFsdWVcIl0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8oXFx8KSguKj8pLyxcbiAgICAgICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgICAgICB0b2tlbjogW10sXG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAvKD89fX18W3xdKS8sXG4gICAgICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiJHNlbGZcIlxuICAgICAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcIm1ldGEudGVtcGxhdGUudmFsdWVcIlxuICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcIm1ldGEudGVtcGxhdGVcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2xpbmtcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5iZWdpblwiLFxuICAgICAgICAgICAgICAgIFwibWV0YS50YWcubGluay5pbnRlcm5hbFwiLFxuICAgICAgICAgICAgICAgIFwiZW50aXR5Lm5hbWUudGFnXCIsXG4gICAgICAgICAgICAgICAgXCJtZXRhLnRhZy5saW5rLmludGVybmFsXCIsXG4gICAgICAgICAgICAgICAgXCJzdHJpbmcub3RoZXIubGluay50aXRsZVwiLFxuICAgICAgICAgICAgICAgIFwibWV0YS50YWcubGluay5pbnRlcm5hbFwiLFxuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi50YWdcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKFxcW1xcWykoXFxzKikoKD86Q2F0ZWdvcnl8V2lraXBlZGlhKT8pKDo/KShbXlxcXVxcXVxcfF0rKShcXHMqKSgoPzpcXHwpKikvLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5lbmRcIixcbiAgICAgICAgICAgICAgICByZWdleDogL1xcXVxcXS8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiJHNlbGZcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJtZXRhLnRhZy5saW5rLmludGVybmFsXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5iZWdpblwiLFxuICAgICAgICAgICAgICAgIFwibWV0YS50YWcubGluay5leHRlcm5hbFwiLFxuICAgICAgICAgICAgICAgIFwibWV0YS50YWcubGluay5leHRlcm5hbFwiLFxuICAgICAgICAgICAgICAgIFwic3RyaW5nLnVucXVvdGVkXCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5lbmRcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKFxcWykoLio/KShbXFxzXSspKC4qPykoXFxdKS9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2NvbW1lbnRcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uY29tbWVudC5odG1sXCIsXG4gICAgICAgICAgICByZWdleDogLzwhLS0vLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmNvbW1lbnQuaHRtbFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvLS0+LyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcImNvbW1lbnQuYmxvY2suaHRtbFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgXCIjZW1waGFzaXNcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5iZWdpblwiLFxuICAgICAgICAgICAgICAgIFwibWFya3VwLml0YWxpYy5ib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5lbmRcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKCcnJycnKSg/IScpKC4qPykoJycnJyd8JCkvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5iZWdpblwiLFxuICAgICAgICAgICAgICAgIFwibWFya3VwLmJvbGRcIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLmVuZFwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC8oJycnKSg/IScpKC4qPykoJycnfCQpL1xuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi50YWcuYmVnaW5cIixcbiAgICAgICAgICAgICAgICBcIm1hcmt1cC5pdGFsaWNcIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLmVuZFwiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC8oJycpKD8hJykoLio/KSgnJ3wkKS9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI2hlYWRpbmdcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmhlYWRpbmdcIixcbiAgICAgICAgICAgICAgICBcImVudGl0eS5uYW1lLnNlY3Rpb25cIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24uaGVhZGluZ1wiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC8oPXsxLDZ9KSguKz8pKFxcMSkoPyE9KS9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI3RhZ1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLmJlZ2luXCIsXG4gICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS50YWdcIixcbiAgICAgICAgICAgICAgICBcIm1ldGEudGFnLmJsb2NrLnJlZlwiLFxuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi50YWcuZW5kXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogLyg8KShyZWYpKCg/OlxccysuKj8pPykoPikvLFxuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLmJlZ2luXCIsXG4gICAgICAgICAgICAgICAgICAgIFwiZW50aXR5Lm5hbWUudGFnXCIsXG4gICAgICAgICAgICAgICAgICAgIFwibWV0YS50YWcuYmxvY2sucmVmXCIsXG4gICAgICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi50YWcuZW5kXCJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvKDxcXC8pKHJlZikoXFxzKikoPikvLFxuICAgICAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIkc2VsZlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcIm1ldGEudGFnLmJsb2NrLnJlZlwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi50YWcuYmVnaW5cIixcbiAgICAgICAgICAgICAgICBcImVudGl0eS5uYW1lLnRhZ1wiLFxuICAgICAgICAgICAgICAgIFwibWV0YS50YWcuYmxvY2subm93aWtpXCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5lbmRcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKDwpKG5vd2lraSkoKD86XFxzKy4qPyk/KSg+KS8sXG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWUsXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi50YWcuYmVnaW5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS50YWdcIixcbiAgICAgICAgICAgICAgICAgICAgXCJtZXRhLnRhZy5ibG9jay5ub3dpa2lcIixcbiAgICAgICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5lbmRcIlxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8oPFxcLykobm93aWtpKShcXHMqKSg+KS8sXG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwibWV0YS50YWcuYmxvY2subm93aWtpXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5iZWdpblwiLFxuICAgICAgICAgICAgICAgIFwiZW50aXR5Lm5hbWUudGFnXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogLyg8XFwvPykobm9pbmNsdWRlfGluY2x1ZGVvbmx5fG9ubHlpbmNsdWRlKSg/PVxcVykvLFxuICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlLFxuICAgICAgICAgICAgcHVzaDogW3tcbiAgICAgICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgICAgICBcImludmFsaWQuaWxsZWdhbFwiLFxuICAgICAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLmVuZFwiXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICByZWdleDogLygoPzpcXC8pPykoPikvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiNhdHRyaWJ1dGVcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJtZXRhLnRhZy5ibG9jay5hbnlcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLmJlZ2luXCIsXG4gICAgICAgICAgICAgICAgXCJlbnRpdHkubmFtZS50YWdcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKDwpKGJyfHdicnxocnxtZXRhfGxpbmspKD89XFxXKS8sXG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWUsXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLmVuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFwvPz4vLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiNhdHRyaWJ1dGVcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJtZXRhLnRhZy5vdGhlclwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi50YWcuYmVnaW5cIixcbiAgICAgICAgICAgICAgICBcImVudGl0eS5uYW1lLnRhZ1wiXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgcmVnZXg6IC8oPFxcLz8pKGRpdnxjZW50ZXJ8c3BhbnxoMXxoMnxoM3xoNHxoNXxoNnxiZG98ZW18c3Ryb25nfGNpdGV8ZGZufGNvZGV8c2FtcHxrYmR8dmFyfGFiYnJ8YmxvY2txdW90ZXxxfHN1YnxzdXB8cHxwcmV8aW5zfGRlbHx1bHxvbHxsaXxkbHxkZHxkdHx0YWJsZXxjYXB0aW9ufHRoZWFkfHRmb290fHRib2R5fGNvbGdyb3VwfGNvbHx0cnx0ZHx0aHxhfGltZ3x2aWRlb3xzb3VyY2V8dHJhY2t8dHR8YnxpfGJpZ3xzbWFsbHxzdHJpa2V8c3x1fGZvbnR8cnVieXxyYnxycHxydHxydGN8bWF0aHxmaWd1cmV8ZmlnY2FwdGlvbnxiZGl8ZGF0YXx0aW1lfG1hcmt8aHRtbCkoPz1cXFcpLyxcbiAgICAgICAgICAgIGNhc2VJbnNlbnNpdGl2ZTogdHJ1ZSxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICAgICAgXCJpbnZhbGlkLmlsbGVnYWxcIixcbiAgICAgICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5lbmRcIlxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8oKD86XFwvKT8pKD4pLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjYXR0cmlidXRlXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwibWV0YS50YWcuYmxvY2tcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLmJlZ2luXCIsXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkLmlsbGVnYWxcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvKDxcXC8pKGJyfHdicnxocnxtZXRhfGxpbmspKD89XFxXKS8sXG4gICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWUsXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLmVuZFwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFwvPz4vLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiNhdHRyaWJ1dGVcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRUb2tlbjogXCJtZXRhLnRhZy5vdGhlclwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgXCIjY2FwdGlvblwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFtcbiAgICAgICAgICAgICAgICBcIm1ldGEudGFnLmJsb2NrLnRhYmxlLWNhcHRpb25cIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLmJlZ2luXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogL14oXFxzKikoXFx8XFwrKS8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcIm1ldGEudGFnLmJsb2NrLnRhYmxlLWNhcHRpb25cIixcbiAgICAgICAgICAgICAgICByZWdleDogLyQvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwibWV0YS50YWcuYmxvY2sudGFibGUtY2FwdGlvblwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XSxcbiAgICAgICAgXCIjdHJcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJtZXRhLnRhZy5ibG9jay50clwiLFxuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi50YWcuYmVnaW5cIixcbiAgICAgICAgICAgICAgICBcIm1ldGEudGFnLmJsb2NrLnRyXCIsXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkLmlsbGVnYWxcIlxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHJlZ2V4OiAvXihcXHMqKShcXHxcXC0pKFtcXHNdKikoLiopL1xuICAgICAgICB9XSxcbiAgICAgICAgXCIjdGhcIjogW3tcbiAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgXCJtZXRhLnRhZy5ibG9jay50aC5oZWFkaW5nXCIsXG4gICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5iZWdpblwiLFxuICAgICAgICAgICAgICAgIFwibWV0YS50YWcuYmxvY2sudGguaGVhZGluZ1wiLFxuICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi50YWdcIixcbiAgICAgICAgICAgICAgICBcIm1hcmt1cC5ib2xkXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogL14oXFxzKikoISkoPzooLio/KShcXHwpKT8oLio/KSg/PSEhfCQpLyxcbiAgICAgICAgICAgIHB1c2g6IFt7XG4gICAgICAgICAgICAgICAgdG9rZW46IFwibWV0YS50YWcuYmxvY2sudGguaGVhZGluZ1wiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvJC8sXG4gICAgICAgICAgICAgICAgbmV4dDogXCJwb3BcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHRva2VuOiBbXG4gICAgICAgICAgICAgICAgICAgIFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi50YWcuYmVnaW5cIixcbiAgICAgICAgICAgICAgICAgICAgXCJtZXRhLnRhZy5ibG9jay50aC5pbmxpbmVcIixcbiAgICAgICAgICAgICAgICAgICAgXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZ1wiLFxuICAgICAgICAgICAgICAgICAgICBcIm1hcmt1cC5ib2xkXCJcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAvKCEhKSg/OiguKj8pKFxcfCkpPyguKj8pKD89ISF8JCkvXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIkc2VsZlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcIm1ldGEudGFnLmJsb2NrLnRoLmhlYWRpbmdcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI3RkXCI6IFt7XG4gICAgICAgICAgICB0b2tlbjogW1xuICAgICAgICAgICAgICAgIFwibWV0YS50YWcuYmxvY2sudGRcIixcbiAgICAgICAgICAgICAgICBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLmJlZ2luXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICByZWdleDogL14oXFxzKikoXFx8KS8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcIm1ldGEudGFnLmJsb2NrLnRkXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC8kLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgaW5jbHVkZTogXCIkc2VsZlwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcIm1ldGEudGFnLmJsb2NrLnRkXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1dLFxuICAgICAgICBcIiN0YWJsZVwiOiBbe1xuICAgICAgICAgICAgcGF0dGVybnM6IFt7XG4gICAgICAgICAgICAgICAgbmFtZTogXCJtZXRhLnRhZy5ibG9jay50YWJsZVwiLFxuICAgICAgICAgICAgICAgIGJlZ2luOiBcIl5cXFxccyooe1xcXFx8KSguKj8pJFwiLFxuICAgICAgICAgICAgICAgIGVuZDogXCJeXFxcXHMqXFxcXHx9XCIsXG4gICAgICAgICAgICAgICAgYmVnaW5DYXB0dXJlczoge1xuICAgICAgICAgICAgICAgICAgICAxOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLmJlZ2luXCJcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgMjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybnM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjYXR0cmlidXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIDM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwiaW52YWxpZC5pbGxlZ2FsXCJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZW5kQ2FwdHVyZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgMDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5lbmRcIlxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwYXR0ZXJuczogW3tcbiAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjY29tbWVudFwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiN0ZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICBpbmNsdWRlOiBcIiNjYXB0aW9uXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI3RyXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI3RoXCJcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI3RkXCJcbiAgICAgICAgICAgICAgICB9XVxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICByZXBvc2l0b3J5OiB7XG4gICAgICAgICAgICAgICAgY2FwdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1ldGEudGFnLmJsb2NrLnRhYmxlLWNhcHRpb25cIixcbiAgICAgICAgICAgICAgICAgICAgYmVnaW46IFwiXlxcXFxzKihcXFxcfFxcXFwrKVwiLFxuICAgICAgICAgICAgICAgICAgICBlbmQ6IFwiJFwiLFxuICAgICAgICAgICAgICAgICAgICBiZWdpbkNhcHR1cmVzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAxOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5iZWdpblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRyOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWV0YS50YWcuYmxvY2sudHJcIixcbiAgICAgICAgICAgICAgICAgICAgbWF0Y2g6IFwiXlxcXFxzKihcXFxcfFxcXFwtKVtcXFxcc10qKC4qKVwiLFxuICAgICAgICAgICAgICAgICAgICBjYXB0dXJlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgMToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwicHVuY3R1YXRpb24uZGVmaW5pdGlvbi50YWcuYmVnaW5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImludmFsaWQuaWxsZWdhbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRoOiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWV0YS50YWcuYmxvY2sudGguaGVhZGluZ1wiLFxuICAgICAgICAgICAgICAgICAgICBiZWdpbjogXCJeXFxcXHMqKCEpKCguKj8pKFxcXFx8KSk/KC4qPykoPz0oISEpfCQpXCIsXG4gICAgICAgICAgICAgICAgICAgIGVuZDogXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgIGJlZ2luQ2FwdHVyZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIDE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLmJlZ2luXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybnM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI2F0dHJpYnV0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICA0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgNToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWFya3VwLmJvbGRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuczogW3tcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWV0YS50YWcuYmxvY2sudGguaW5saW5lXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaDogXCIoISEpKCguKj8pKFxcXFx8KSk/KC4qPykoPz0oISEpfCQpXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXB0dXJlczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZy5iZWdpblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm5zOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCIjYXR0cmlidXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA1OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFwibWFya3VwLmJvbGRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCIkc2VsZlwiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB0ZDoge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcIm1ldGEudGFnLmJsb2NrLnRkXCIsXG4gICAgICAgICAgICAgICAgICAgIGJlZ2luOiBcIl5cXFxccyooXFxcXHwpXCIsXG4gICAgICAgICAgICAgICAgICAgIGVuZDogXCIkXCIsXG4gICAgICAgICAgICAgICAgICAgIGJlZ2luQ2FwdHVyZXM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIDE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiBcInB1bmN0dWF0aW9uLmRlZmluaXRpb24udGFnLmJlZ2luXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybnM6IFt7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluY2x1ZGU6IFwiI2F0dHJpYnV0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnRhZ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm5zOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5jbHVkZTogXCIkc2VsZlwiXG4gICAgICAgICAgICAgICAgICAgIH1dXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XSxcbiAgICAgICAgXCIjYXR0cmlidXRlXCI6IFt7XG4gICAgICAgICAgICBpbmNsdWRlOiBcIiNzdHJpbmdcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbjogXCJlbnRpdHkub3RoZXIuYXR0cmlidXRlLW5hbWVcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFx3Ky9cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI3N0cmluZ1wiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nLnF1b3RlZC5kb3VibGVcIixcbiAgICAgICAgICAgIHJlZ2V4OiAvXFxcIi8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5xdW90ZWQuZG91YmxlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXFwiLyxcbiAgICAgICAgICAgICAgICBuZXh0OiBcInBvcFwiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFRva2VuOiBcInN0cmluZy5xdW90ZWQuZG91YmxlXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5xdW90ZWQuc2luZ2xlXCIsXG4gICAgICAgICAgICByZWdleDogL1xcJy8sXG4gICAgICAgICAgICBwdXNoOiBbe1xuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZy5xdW90ZWQuc2luZ2xlXCIsXG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXCcvLFxuICAgICAgICAgICAgICAgIG5leHQ6IFwicG9wXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46IFwic3RyaW5nLnF1b3RlZC5zaW5nbGVcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfV0sXG4gICAgICAgIFwiI3VybFwiOiBbe1xuICAgICAgICAgICAgdG9rZW46IFwibWFya3VwLnVuZGVybGluZS5saW5rXCIsXG4gICAgICAgICAgICByZWdleDogLyg/Omh0dHAoPzpzKT86XFwvXFwvKT9bXFx3Li1dKyg/OlxcLltcXHdcXC4tXSspK1tcXHdcXC1cXC5ffjpcXC8/I1xcW1xcXUAhXFwkJidcXChcXClcXCpcXCssOz0uXSsvXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuOiBcImludmFsaWQuaWxsZWdhbFwiLFxuICAgICAgICAgICAgcmVnZXg6IC8uKi9cbiAgICAgICAgfV1cbiAgICB9O1xuICAgIFxuXG4gICAgdGhpcy5ub3JtYWxpemVSdWxlcygpO1xufTtcblxuTWVkaWFXaWtpSGlnaGxpZ2h0UnVsZXMubWV0YURhdGEgPSB7XG4gICAgbmFtZTogXCJNZWRpYVdpa2lcIixcbiAgICBzY29wZU5hbWU6IFwidGV4dC5odG1sLm1lZGlhd2lraVwiLFxuICAgIGZpbGVUeXBlczogW1wibWVkaWF3aWtpXCIsIFwid2lraVwiXVxufTtcblxuXG5vb3AuaW5oZXJpdHMoTWVkaWFXaWtpSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuTWVkaWFXaWtpSGlnaGxpZ2h0UnVsZXMgPSBNZWRpYVdpa2lIaWdobGlnaHRSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==