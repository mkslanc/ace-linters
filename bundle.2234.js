"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2234],{

/***/ 37028:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var oop = __webpack_require__(2645);
var Behaviour = (__webpack_require__(75684)/* .Behaviour */ .Q);
var CstyleBehaviour = (__webpack_require__(32589)/* .CstyleBehaviour */ ._);
var TokenIterator = (__webpack_require__(99339).TokenIterator);

/**@type {(new() => Partial<import("../../../ace-internal").Ace.Behaviour>)}*/
var CssBehaviour = function () {

    this.inherit(CstyleBehaviour);

    this.add("colon", "insertion", function (state, action, editor, session, text) {
        if (text === ':' && editor.selection.isEmpty()) {
            var cursor = editor.getCursorPosition();
            var iterator = new TokenIterator(session, cursor.row, cursor.column);
            var token = iterator.getCurrentToken();
            if (token && token.value.match(/\s+/)) {
                token = iterator.stepBackward();
            }
            if (token && token.type === 'support.type') {
                var line = session.doc.getLine(cursor.row);
                var rightChar = line.substring(cursor.column, cursor.column + 1);
                if (rightChar === ':') {
                    return {
                       text: '',
                       selection: [1, 1]
                    };
                }
                if (/^(\s+[^;]|\s*$)/.test(line.substring(cursor.column))) {
                    return {
                       text: ':;',
                       selection: [1, 1]
                    };
                }
            }
        }
    });

    this.add("colon", "deletion", function (state, action, editor, session, range) {
        var selected = session.doc.getTextRange(range);
        if (!range.isMultiLine() && selected === ':') {
            var cursor = editor.getCursorPosition();
            var iterator = new TokenIterator(session, cursor.row, cursor.column);
            var token = iterator.getCurrentToken();
            if (token && token.value.match(/\s+/)) {
                token = iterator.stepBackward();
            }
            if (token && token.type === 'support.type') {
                var line = session.doc.getLine(range.start.row);
                var rightChar = line.substring(range.end.column, range.end.column + 1);
                if (rightChar === ';') {
                    range.end.column ++;
                    return range;
                }
            }
        }
    });

    this.add("semicolon", "insertion", function (state, action, editor, session, text) {
        if (text === ';' && editor.selection.isEmpty()) {
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);
            var rightChar = line.substring(cursor.column, cursor.column + 1);
            if (rightChar === ';') {
                return {
                   text: '',
                   selection: [1, 1]
                };
            }
        }
    });

    this.add("!important", "insertion", function (state, action, editor, session, text) {
        if (text === '!' && editor.selection.isEmpty()) {
            var cursor = editor.getCursorPosition();
            var line = session.doc.getLine(cursor.row);

            if (/^\s*(;|}|$)/.test(line.substring(cursor.column))) {
                return {
                    text: '!important',
                    selection: [10, 10]
                };
            }
        }
    });

};
oop.inherits(CssBehaviour, CstyleBehaviour);

exports.r = CssBehaviour;


/***/ }),

/***/ 41080:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var CssHighlightRules = (__webpack_require__(74275).CssHighlightRules);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);
var WorkerClient = (__webpack_require__(28402).WorkerClient);
var CssCompletions = (__webpack_require__(61952)/* .CssCompletions */ .d);
var CssBehaviour = (__webpack_require__(37028)/* .CssBehaviour */ .r);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = CssHighlightRules;
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = new CssBehaviour();
    this.$completer = new CssCompletions();
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {

    this.foldingRules = "cStyle";
    this.blockComment = {start: "/*", end: "*/"};

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        // ignore braces in comments
        var tokens = this.getTokenizer().getLineTokens(line, state).tokens;
        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        var match = line.match(/^.*\{\s*$/);
        if (match) {
            indent += tab;
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };

    this.getCompletions = function(state, session, pos, prefix) {
        return this.$completer.getCompletions(state, session, pos, prefix);
    };

    this.createWorker = function(session) {
        var worker = new WorkerClient(["ace"], "ace/mode/css_worker", "Worker");
        worker.attachToDocument(session.getDocument());

        worker.on("annotate", function(e) {
            session.setAnnotations(e.data);
        });

        worker.on("terminate", function() {
            session.clearAnnotations();
        });

        return worker;
    };

    this.$id = "ace/mode/css";
    this.snippetFileId = "ace/snippets/css";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 61952:
/***/ ((__unused_webpack_module, exports) => {



var propertyMap = {
    "background": {"#$0": 1},
    "background-color": {"#$0": 1, "transparent": 1, "fixed": 1},
    "background-image": {"url('/$0')": 1},
    "background-repeat": {"repeat": 1, "repeat-x": 1, "repeat-y": 1, "no-repeat": 1, "inherit": 1},
    "background-position": {"bottom":2, "center":2, "left":2, "right":2, "top":2, "inherit":2},
    "background-attachment": {"scroll": 1, "fixed": 1},
    "background-size": {"cover": 1, "contain": 1},
    "background-clip": {"border-box": 1, "padding-box": 1, "content-box": 1},
    "background-origin": {"border-box": 1, "padding-box": 1, "content-box": 1},
    "border": {"solid $0": 1, "dashed $0": 1, "dotted $0": 1, "#$0": 1},
    "border-color": {"#$0": 1},
    "border-style": {"solid":2, "dashed":2, "dotted":2, "double":2, "groove":2, "hidden":2, "inherit":2, "inset":2, "none":2, "outset":2, "ridged":2},
    "border-collapse": {"collapse": 1, "separate": 1},
    "bottom": {"px": 1, "em": 1, "%": 1},
    "clear": {"left": 1, "right": 1, "both": 1, "none": 1},
    "color": {"#$0": 1, "rgb(#$00,0,0)": 1},
    "cursor": {"default": 1, "pointer": 1, "move": 1, "text": 1, "wait": 1, "help": 1, "progress": 1, "n-resize": 1, "ne-resize": 1, "e-resize": 1, "se-resize": 1, "s-resize": 1, "sw-resize": 1, "w-resize": 1, "nw-resize": 1},
    "display": {"none": 1, "block": 1, "inline": 1, "inline-block": 1, "table-cell": 1},
    "empty-cells": {"show": 1, "hide": 1},
    "float": {"left": 1, "right": 1, "none": 1},
    "font-family": {"Arial":2,"Comic Sans MS":2,"Consolas":2,"Courier New":2,"Courier":2,"Georgia":2,"Monospace":2,"Sans-Serif":2, "Segoe UI":2,"Tahoma":2,"Times New Roman":2,"Trebuchet MS":2,"Verdana": 1},
    "font-size": {"px": 1, "em": 1, "%": 1},
    "font-weight": {"bold": 1, "normal": 1},
    "font-style": {"italic": 1, "normal": 1},
    "font-variant": {"normal": 1, "small-caps": 1},
    "height": {"px": 1, "em": 1, "%": 1},
    "left": {"px": 1, "em": 1, "%": 1},
    "letter-spacing": {"normal": 1},
    "line-height": {"normal": 1},
    "list-style-type": {"none": 1, "disc": 1, "circle": 1, "square": 1, "decimal": 1, "decimal-leading-zero": 1, "lower-roman": 1, "upper-roman": 1, "lower-greek": 1, "lower-latin": 1, "upper-latin": 1, "georgian": 1, "lower-alpha": 1, "upper-alpha": 1},
    "margin": {"px": 1, "em": 1, "%": 1},
    "margin-right": {"px": 1, "em": 1, "%": 1},
    "margin-left": {"px": 1, "em": 1, "%": 1},
    "margin-top": {"px": 1, "em": 1, "%": 1},
    "margin-bottom": {"px": 1, "em": 1, "%": 1},
    "max-height": {"px": 1, "em": 1, "%": 1},
    "max-width": {"px": 1, "em": 1, "%": 1},
    "min-height": {"px": 1, "em": 1, "%": 1},
    "min-width": {"px": 1, "em": 1, "%": 1},
    "overflow": {"hidden": 1, "visible": 1, "auto": 1, "scroll": 1},
    "overflow-x": {"hidden": 1, "visible": 1, "auto": 1, "scroll": 1},
    "overflow-y": {"hidden": 1, "visible": 1, "auto": 1, "scroll": 1},
    "padding": {"px": 1, "em": 1, "%": 1},
    "padding-top": {"px": 1, "em": 1, "%": 1},
    "padding-right": {"px": 1, "em": 1, "%": 1},
    "padding-bottom": {"px": 1, "em": 1, "%": 1},
    "padding-left": {"px": 1, "em": 1, "%": 1},
    "page-break-after": {"auto": 1, "always": 1, "avoid": 1, "left": 1, "right": 1},
    "page-break-before": {"auto": 1, "always": 1, "avoid": 1, "left": 1, "right": 1},
    "position": {"absolute": 1, "relative": 1, "fixed": 1, "static": 1},
    "right": {"px": 1, "em": 1, "%": 1},
    "table-layout": {"fixed": 1, "auto": 1},
    "text-decoration": {"none": 1, "underline": 1, "line-through": 1, "blink": 1},
    "text-align": {"left": 1, "right": 1, "center": 1, "justify": 1},
    "text-transform": {"capitalize": 1, "uppercase": 1, "lowercase": 1, "none": 1},
    "top": {"px": 1, "em": 1, "%": 1},
    "vertical-align": {"top": 1, "bottom": 1},
    "visibility": {"hidden": 1, "visible": 1},
    "white-space": {"nowrap": 1, "normal": 1, "pre": 1, "pre-line": 1, "pre-wrap": 1},
    "width": {"px": 1, "em": 1, "%": 1},
    "word-spacing": {"normal": 1},

    // opacity
    "filter": {"alpha(opacity=$0100)": 1},

    "text-shadow": {"$02px 2px 2px #777": 1},
    "text-overflow": {"ellipsis-word": 1, "clip": 1, "ellipsis": 1},

    // border radius
    "-moz-border-radius": 1,
    "-moz-border-radius-topright": 1,
    "-moz-border-radius-bottomright": 1,
    "-moz-border-radius-topleft": 1,
    "-moz-border-radius-bottomleft": 1,
    "-webkit-border-radius": 1,
    "-webkit-border-top-right-radius": 1,
    "-webkit-border-top-left-radius": 1,
    "-webkit-border-bottom-right-radius": 1,
    "-webkit-border-bottom-left-radius": 1,

    // dropshadows
    "-moz-box-shadow": 1,
    "-webkit-box-shadow": 1,

    // transformations
    "transform": {"rotate($00deg)": 1, "skew($00deg)": 1},
    "-moz-transform": {"rotate($00deg)": 1, "skew($00deg)": 1},
    "-webkit-transform": {"rotate($00deg)": 1, "skew($00deg)": 1 }
};

var CssCompletions = function() {

};

(function() {

    this.completionsDefined = false;

    this.defineCompletions = function() {
        //fill in missing properties
        if (document) {
            var style = document.createElement('c').style;

            for (var i in style) {
                if (typeof style[i] !== 'string')
                    continue;

                var name = i.replace(/[A-Z]/g, function(x) {
                    return '-' + x.toLowerCase();
                });

                if (!propertyMap.hasOwnProperty(name))
                    propertyMap[name] = 1;
            }
        }

        this.completionsDefined = true;
    };

    this.getCompletions = function(state, session, pos, prefix) {
        if (!this.completionsDefined) {
            this.defineCompletions();
        }

        if (state==='ruleset' || session.$mode.$id == "ace/mode/scss") {
            //css attribute value
            var line = session.getLine(pos.row).substr(0, pos.column);
            var inParens = /\([^)]*$/.test(line);
            if (inParens) {
                line = line.substr(line.lastIndexOf('(') + 1);
            }
            if (/:[^;]+$/.test(line)) {
                /([\w\-]+):[^:]*$/.test(line);

                return this.getPropertyValueCompletions(state, session, pos, prefix);
            } else {
                return this.getPropertyCompletions(state, session, pos, prefix, inParens);
            }
        }

        return [];
    };

    this.getPropertyCompletions = function(state, session, pos, prefix, skipSemicolon) {
        skipSemicolon = skipSemicolon || false;
        var properties = Object.keys(propertyMap);
        return properties.map(function(property){
            return {
                caption: property,
                snippet: property + ': $0' + (skipSemicolon ? '' : ';'),
                meta: "property",
                score: 1000000
            };
        });
    };

    this.getPropertyValueCompletions = function(state, session, pos, prefix) {
        var line = session.getLine(pos.row).substr(0, pos.column);
        var property = (/([\w\-]+):[^:]*$/.exec(line) || {})[1];

        if (!property)
            return [];
        var values = [];
        if (property in propertyMap && typeof propertyMap[property] === "object") {
            values = Object.keys(propertyMap[property]);
        }
        return values.map(function(value){
            return {
                caption: value,
                snippet: value,
                meta: "property value",
                score: 1000000
            };
        });
    };

}).call(CssCompletions.prototype);

exports.d = CssCompletions;


/***/ }),

/***/ 6944:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var MixedFoldMode = (__webpack_require__(90610)/* .FoldMode */ .l);
var XmlFoldMode = (__webpack_require__(79712)/* .FoldMode */ .l);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);

var FoldMode = exports.FoldMode = function(voidElements, optionalTags) {
    MixedFoldMode.call(this, new XmlFoldMode(voidElements, optionalTags), {
        "js-": new CStyleFoldMode(),
        "css-": new CStyleFoldMode()
    });
};

oop.inherits(FoldMode, MixedFoldMode);


/***/ }),

/***/ 90610:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);

var FoldMode = exports.l = function(defaultMode, subModes) {
    this.defaultMode = defaultMode;
    this.subModes = subModes;
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {


    this.$getMode = function(state) {
        if (typeof state != "string") 
            state = state[0];
        for (var key in this.subModes) {
            if (state.indexOf(key) === 0)
                return this.subModes[key];
        }
        return null;
    };
    
    this.$tryMode = function(state, session, foldStyle, row) {
        var mode = this.$getMode(state);
        return (mode ? mode.getFoldWidget(session, foldStyle, row) : "");
    };

    this.getFoldWidget = function(session, foldStyle, row) {
        return (
            this.$tryMode(session.getState(row-1), session, foldStyle, row) ||
            this.$tryMode(session.getState(row), session, foldStyle, row) ||
            this.defaultMode.getFoldWidget(session, foldStyle, row)
        );
    };

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var mode = this.$getMode(session.getState(row-1));
        
        if (!mode || !mode.getFoldWidget(session, foldStyle, row))
            mode = this.$getMode(session.getState(row));
        
        if (!mode || !mode.getFoldWidget(session, foldStyle, row))
            mode = this.defaultMode;
        
        return mode.getFoldWidgetRange(session, foldStyle, row);
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 32234:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var lang = __webpack_require__(39955);
var TextMode = (__webpack_require__(49432).Mode);
var JavaScriptMode = (__webpack_require__(93388).Mode);
var CssMode = (__webpack_require__(41080).Mode);
var HtmlHighlightRules = (__webpack_require__(10413).HtmlHighlightRules);
var XmlBehaviour = (__webpack_require__(63458).XmlBehaviour);
var HtmlFoldMode = (__webpack_require__(6944).FoldMode);
var HtmlCompletions = (__webpack_require__(14402).HtmlCompletions);
var WorkerClient = (__webpack_require__(28402).WorkerClient);

// http://www.w3.org/TR/html5/syntax.html#void-elements
var voidElements = ["area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "meta", "menuitem", "param", "source", "track", "wbr"];
var optionalEndTags = ["li", "dt", "dd", "p", "rt", "rp", "optgroup", "option", "colgroup", "td", "th"];

var Mode = function(options) {
    this.fragmentContext = options && options.fragmentContext;
    this.HighlightRules = HtmlHighlightRules;
    this.$behaviour = new XmlBehaviour();
    this.$completer = new HtmlCompletions();
    
    this.createModeDelegates({
        "js-": JavaScriptMode,
        "css-": CssMode
    });
    
    this.foldingRules = new HtmlFoldMode(this.voidElements, lang.arrayToMap(optionalEndTags));
};
oop.inherits(Mode, TextMode);

(function() {

    this.blockComment = {start: "<!--", end: "-->"};

    this.voidElements = lang.arrayToMap(voidElements);

    this.getNextLineIndent = function(state, line, tab) {
        return this.$getIndent(line);
    };

    this.checkOutdent = function(state, line, input) {
        return false;
    };

    this.getCompletions = function(state, session, pos, prefix) {
        return this.$completer.getCompletions(state, session, pos, prefix);
    };

    this.createWorker = function(session) {
        if (this.constructor != Mode)
            return;
        var worker = new WorkerClient(["ace"], "ace/mode/html_worker", "Worker");
        worker.attachToDocument(session.getDocument());

        if (this.fragmentContext)
            worker.call("setOptions", [{context: this.fragmentContext}]);

        worker.on("error", function(e) {
            session.setAnnotations(e.data);
        });

        worker.on("terminate", function() {
            session.clearAnnotations();
        });

        return worker;
    };

    this.$id = "ace/mode/html";
    this.snippetFileId = "ace/snippets/html";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 14402:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var TokenIterator = (__webpack_require__(99339).TokenIterator);

var commonAttributes = [
    "accesskey",
    "class",
    "contenteditable",
    "contextmenu",
    "dir",
    "draggable",
    "dropzone",
    "hidden",
    "id",
    "inert",
    "itemid",
    "itemprop",
    "itemref",
    "itemscope",
    "itemtype",
    "lang",
    "spellcheck",
    "style",
    "tabindex",
    "title",
    "translate"
];

var eventAttributes = [
    "onabort",
    "onblur",
    "oncancel",
    "oncanplay",
    "oncanplaythrough",
    "onchange",
    "onclick",
    "onclose",
    "oncontextmenu",
    "oncuechange",
    "ondblclick",
    "ondrag",
    "ondragend",
    "ondragenter",
    "ondragleave",
    "ondragover",
    "ondragstart",
    "ondrop",
    "ondurationchange",
    "onemptied",
    "onended",
    "onerror",
    "onfocus",
    "oninput",
    "oninvalid",
    "onkeydown",
    "onkeypress",
    "onkeyup",
    "onload",
    "onloadeddata",
    "onloadedmetadata",
    "onloadstart",
    "onmousedown",
    "onmousemove",
    "onmouseout",
    "onmouseover",
    "onmouseup",
    "onmousewheel",
    "onpause",
    "onplay",
    "onplaying",
    "onprogress",
    "onratechange",
    "onreset",
    "onscroll",
    "onseeked",
    "onseeking",
    "onselect",
    "onshow",
    "onstalled",
    "onsubmit",
    "onsuspend",
    "ontimeupdate",
    "onvolumechange",
    "onwaiting"
];

var globalAttributes = commonAttributes.concat(eventAttributes);

var attributeMap = {
    "a": {"href": 1, "target": {"_blank": 1, "top": 1}, "ping": 1, "rel": {"nofollow": 1, "alternate": 1, "author": 1, "bookmark": 1, "help": 1, "license": 1, "next": 1, "noreferrer": 1, "prefetch": 1, "prev": 1, "search": 1, "tag": 1}, "media": 1, "hreflang": 1, "type": 1},
    "abbr": {},
    "address": {},
    "area": {"shape": 1, "coords": 1, "href": 1, "hreflang": 1, "alt": 1, "target": 1, "media": 1, "rel": 1, "ping": 1, "type": 1},
    "article": {"pubdate": 1},
    "aside": {},
    "audio": {"src": 1, "autobuffer": 1, "autoplay": {"autoplay": 1}, "loop": {"loop": 1}, "controls": {"controls": 1}, "muted": {"muted": 1}, "preload": {"auto": 1, "metadata": 1, "none": 1 }},
    "b": {},
    "base": {"href": 1, "target": 1},
    "bdi": {},
    "bdo": {},
    "blockquote": {"cite": 1},
    "body": {"onafterprint": 1, "onbeforeprint": 1, "onbeforeunload": 1, "onhashchange": 1, "onmessage": 1, "onoffline": 1, "onpopstate": 1, "onredo": 1, "onresize": 1, "onstorage": 1, "onundo": 1, "onunload": 1},
    "br": {},
    "button": {"autofocus": 1, "disabled": {"disabled": 1}, "form": 1, "formaction": 1, "formenctype": 1, "formmethod": 1, "formnovalidate": 1, "formtarget": 1, "name": 1, "value": 1, "type": {"button": 1, "submit": 1}},
    "canvas": {"width": 1, "height": 1},
    "caption": {},
    "cite": {},
    "code": {},
    "col": {"span": 1},
    "colgroup": {"span": 1},
    "command": {"type": 1, "label": 1, "icon": 1, "disabled": 1, "checked": 1, "radiogroup": 1, "command": 1},
    "data": {},
    "datalist": {},
    "dd": {},
    "del": {"cite": 1, "datetime": 1},
    "details": {"open": 1},
    "dfn": {},
    "dialog": {"open": 1},
    "div": {},
    "dl": {},
    "dt": {},
    "em": {},
    "embed": {"src": 1, "height": 1, "width": 1, "type": 1},
    "fieldset": {"disabled": 1, "form": 1, "name": 1},
    "figcaption": {},
    "figure": {},
    "footer": {},
    "form": {"accept-charset": 1, "action": 1, "autocomplete": 1, "enctype": {"multipart/form-data": 1, "application/x-www-form-urlencoded": 1}, "method": {"get": 1, "post": 1}, "name": 1, "novalidate": 1, "target": {"_blank": 1, "top": 1}},
    "h1": {},
    "h2": {},
    "h3": {},
    "h4": {},
    "h5": {},
    "h6": {},
    "head": {},
    "header": {},
    "hr": {},
    "html": {"manifest": 1},
    "i": {},
    "iframe": {"name": 1, "src": 1, "height": 1, "width": 1, "sandbox": {"allow-same-origin": 1, "allow-top-navigation": 1, "allow-forms": 1, "allow-scripts": 1}, "seamless": {"seamless": 1}},
    "img": {"alt": 1, "src": 1, "height": 1, "width": 1, "usemap": 1, "ismap": 1},
    "input": {
        "type": {"text": 1, "password": 1, "hidden": 1, "checkbox": 1, "submit": 1, "radio": 1, "file": 1, "button": 1, "reset": 1, "image": 31, "color": 1, "date": 1, "datetime": 1, "datetime-local": 1, "email": 1, "month": 1, "number": 1, "range": 1, "search": 1, "tel": 1, "time": 1, "url": 1, "week": 1},
        "accept": 1, "alt": 1, "autocomplete": {"on": 1, "off": 1}, "autofocus": {"autofocus": 1}, "checked": {"checked": 1}, "disabled": {"disabled": 1}, "form": 1, "formaction": 1, "formenctype": {"application/x-www-form-urlencoded": 1, "multipart/form-data": 1, "text/plain": 1}, "formmethod": {"get": 1, "post": 1}, "formnovalidate": {"formnovalidate": 1}, "formtarget": {"_blank": 1, "_self": 1, "_parent": 1, "_top": 1}, "height": 1, "list": 1, "max": 1, "maxlength": 1, "min": 1, "multiple": {"multiple": 1}, "name": 1, "pattern": 1, "placeholder": 1, "readonly": {"readonly": 1}, "required": {"required": 1}, "size": 1, "src": 1, "step": 1, "width": 1, "files": 1, "value": 1},
    "ins": {"cite": 1, "datetime": 1},
    "kbd": {},
    "keygen": {"autofocus": 1, "challenge": {"challenge": 1}, "disabled": {"disabled": 1}, "form": 1, "keytype": {"rsa": 1, "dsa": 1, "ec": 1}, "name": 1},
    "label": {"form": 1, "for": 1},
    "legend": {},
    "li": {"value": 1},
    "link": {"href": 1, "hreflang": 1, "rel": {"stylesheet": 1, "icon": 1}, "media": {"all": 1, "screen": 1, "print": 1}, "type": {"text/css": 1, "image/png": 1, "image/jpeg": 1, "image/gif": 1}, "sizes": 1},
    "main": {},
    "map": {"name": 1},
    "mark": {},
    "math": {},
    "menu": {"type": 1, "label": 1},
    "meta": {"http-equiv": {"content-type": 1}, "name": {"description": 1, "keywords": 1}, "content": {"text/html; charset=UTF-8": 1}, "charset": 1},
    "meter": {"value": 1, "min": 1, "max": 1, "low": 1, "high": 1, "optimum": 1},
    "nav": {},
    "noscript": {"href": 1},
    "object": {"param": 1, "data": 1, "type": 1, "height" : 1, "width": 1, "usemap": 1, "name": 1, "form": 1, "classid": 1},
    "ol": {"start": 1, "reversed": 1},
    "optgroup": {"disabled": 1, "label": 1},
    "option": {"disabled": 1, "selected": 1, "label": 1, "value": 1},
    "output": {"for": 1, "form": 1, "name": 1},
    "p": {},
    "param": {"name": 1, "value": 1},
    "pre": {},
    "progress": {"value": 1, "max": 1},
    "q": {"cite": 1},
    "rp": {},
    "rt": {},
    "ruby": {},
    "s": {},
    "samp": {},
    "script": {"charset": 1, "type": {"text/javascript": 1}, "src": 1, "defer": 1, "async": 1},
    "select": {"autofocus": 1, "disabled": 1, "form": 1, "multiple": {"multiple": 1}, "name": 1, "size": 1, "readonly":{"readonly": 1}},
    "small": {},
    "source": {"src": 1, "type": 1, "media": 1},
    "span": {},
    "strong": {},
    "style": {"type": 1, "media": {"all": 1, "screen": 1, "print": 1}, "scoped": 1},
    "sub": {},
    "sup": {},
    "svg": {},
    "table": {"summary": 1},
    "tbody": {},
    "td": {"headers": 1, "rowspan": 1, "colspan": 1},
    "textarea": {"autofocus": {"autofocus": 1}, "disabled": {"disabled": 1}, "form": 1, "maxlength": 1, "name": 1, "placeholder": 1, "readonly": {"readonly": 1}, "required": {"required": 1}, "rows": 1, "cols": 1, "wrap": {"on": 1, "off": 1, "hard": 1, "soft": 1}},
    "tfoot": {},
    "th": {"headers": 1, "rowspan": 1, "colspan": 1, "scope": 1},
    "thead": {},
    "time": {"datetime": 1},
    "title": {},
    "tr": {},
    "track": {"kind": 1, "src": 1, "srclang": 1, "label": 1, "default": 1},
    "section": {},
    "summary": {},
    "u": {},
    "ul": {},
    "var": {},
    "video": {"src": 1, "autobuffer": 1, "autoplay": {"autoplay": 1}, "loop": {"loop": 1}, "controls": {"controls": 1}, "width": 1, "height": 1, "poster": 1, "muted": {"muted": 1}, "preload": {"auto": 1, "metadata": 1, "none": 1}},
    "wbr": {}
};

var elements = Object.keys(attributeMap);

function is(token, type) {
    return token.type.lastIndexOf(type + ".xml") > -1;
}

function findTagName(session, pos) {
    var iterator = new TokenIterator(session, pos.row, pos.column);
    var token = iterator.getCurrentToken();
    while (token && !is(token, "tag-name")){
        token = iterator.stepBackward();
    }
    if (token)
        return token.value;
}

function findAttributeName(session, pos) {
    var iterator = new TokenIterator(session, pos.row, pos.column);
    var token = iterator.getCurrentToken();
    while (token && !is(token, "attribute-name")){
        token = iterator.stepBackward();
    }
    if (token)
        return token.value;
}

var HtmlCompletions = function() {

};

(function() {

    this.getCompletions = function(state, session, pos, prefix) {
        var token = session.getTokenAt(pos.row, pos.column);

        if (!token)
            return [];

        // tag name
        if (is(token, "tag-name") || is(token, "tag-open") || is(token, "end-tag-open"))
            return this.getTagCompletions(state, session, pos, prefix);

        // tag attribute
        if (is(token, "tag-whitespace") || is(token, "attribute-name"))
            return this.getAttributeCompletions(state, session, pos, prefix);
            
        // tag attribute values
        if (is(token, "attribute-value"))
            return this.getAttributeValueCompletions(state, session, pos, prefix);
            
        // HTML entities
        var line = session.getLine(pos.row).substr(0, pos.column);
        if (/&[a-z]*$/i.test(line))
            return this.getHTMLEntityCompletions(state, session, pos, prefix);

        return [];
    };

    this.getTagCompletions = function(state, session, pos, prefix) {
        return elements.map(function(element){
            return {
                value: element,
                meta: "tag",
                score: 1000000
            };
        });
    };

    this.getAttributeCompletions = function(state, session, pos, prefix) {
        var tagName = findTagName(session, pos);
        if (!tagName)
            return [];
        var attributes = globalAttributes;
        if (tagName in attributeMap) {
            attributes = attributes.concat(Object.keys(attributeMap[tagName]));
        }
        return attributes.map(function(attribute){
            return {
                caption: attribute,
                snippet: attribute + '="$0"',
                meta: "attribute",
                score: 1000000
            };
        });
    };

    this.getAttributeValueCompletions = function(state, session, pos, prefix) {
        var tagName = findTagName(session, pos);
        var attributeName = findAttributeName(session, pos);
        
        if (!tagName)
            return [];
        var values = [];
        if (tagName in attributeMap && attributeName in attributeMap[tagName] && typeof attributeMap[tagName][attributeName] === "object") {
            values = Object.keys(attributeMap[tagName][attributeName]);
        }
        return values.map(function(value){
            return {
                caption: value,
                snippet: value,
                meta: "attribute value",
                score: 1000000
            };
        });
    };

    this.getHTMLEntityCompletions = function(state, session, pos, prefix) {
        var values = ['Aacute;', 'aacute;', 'Acirc;', 'acirc;', 'acute;', 'AElig;', 'aelig;', 'Agrave;', 'agrave;', 'alefsym;', 'Alpha;', 'alpha;', 'amp;', 'and;', 'ang;', 'Aring;', 'aring;', 'asymp;', 'Atilde;', 'atilde;', 'Auml;', 'auml;', 'bdquo;', 'Beta;', 'beta;', 'brvbar;', 'bull;', 'cap;', 'Ccedil;', 'ccedil;', 'cedil;', 'cent;', 'Chi;', 'chi;', 'circ;', 'clubs;', 'cong;', 'copy;', 'crarr;', 'cup;', 'curren;', 'Dagger;', 'dagger;', 'dArr;', 'darr;', 'deg;', 'Delta;', 'delta;', 'diams;', 'divide;', 'Eacute;', 'eacute;', 'Ecirc;', 'ecirc;', 'Egrave;', 'egrave;', 'empty;', 'emsp;', 'ensp;', 'Epsilon;', 'epsilon;', 'equiv;', 'Eta;', 'eta;', 'ETH;', 'eth;', 'Euml;', 'euml;', 'euro;', 'exist;', 'fnof;', 'forall;', 'frac12;', 'frac14;', 'frac34;', 'frasl;', 'Gamma;', 'gamma;', 'ge;', 'gt;', 'hArr;', 'harr;', 'hearts;', 'hellip;', 'Iacute;', 'iacute;', 'Icirc;', 'icirc;', 'iexcl;', 'Igrave;', 'igrave;', 'image;', 'infin;', 'int;', 'Iota;', 'iota;', 'iquest;', 'isin;', 'Iuml;', 'iuml;', 'Kappa;', 'kappa;', 'Lambda;', 'lambda;', 'lang;', 'laquo;', 'lArr;', 'larr;', 'lceil;', 'ldquo;', 'le;', 'lfloor;', 'lowast;', 'loz;', 'lrm;', 'lsaquo;', 'lsquo;', 'lt;', 'macr;', 'mdash;', 'micro;', 'middot;', 'minus;', 'Mu;', 'mu;', 'nabla;', 'nbsp;', 'ndash;', 'ne;', 'ni;', 'not;', 'notin;', 'nsub;', 'Ntilde;', 'ntilde;', 'Nu;', 'nu;', 'Oacute;', 'oacute;', 'Ocirc;', 'ocirc;', 'OElig;', 'oelig;', 'Ograve;', 'ograve;', 'oline;', 'Omega;', 'omega;', 'Omicron;', 'omicron;', 'oplus;', 'or;', 'ordf;', 'ordm;', 'Oslash;', 'oslash;', 'Otilde;', 'otilde;', 'otimes;', 'Ouml;', 'ouml;', 'para;', 'part;', 'permil;', 'perp;', 'Phi;', 'phi;', 'Pi;', 'pi;', 'piv;', 'plusmn;', 'pound;', 'Prime;', 'prime;', 'prod;', 'prop;', 'Psi;', 'psi;', 'quot;', 'radic;', 'rang;', 'raquo;', 'rArr;', 'rarr;', 'rceil;', 'rdquo;', 'real;', 'reg;', 'rfloor;', 'Rho;', 'rho;', 'rlm;', 'rsaquo;', 'rsquo;', 'sbquo;', 'Scaron;', 'scaron;', 'sdot;', 'sect;', 'shy;', 'Sigma;', 'sigma;', 'sigmaf;', 'sim;', 'spades;', 'sub;', 'sube;', 'sum;', 'sup;', 'sup1;', 'sup2;', 'sup3;', 'supe;', 'szlig;', 'Tau;', 'tau;', 'there4;', 'Theta;', 'theta;', 'thetasym;', 'thinsp;', 'THORN;', 'thorn;', 'tilde;', 'times;', 'trade;', 'Uacute;', 'uacute;', 'uArr;', 'uarr;', 'Ucirc;', 'ucirc;', 'Ugrave;', 'ugrave;', 'uml;', 'upsih;', 'Upsilon;', 'upsilon;', 'Uuml;', 'uuml;', 'weierp;', 'Xi;', 'xi;', 'Yacute;', 'yacute;', 'yen;', 'Yuml;', 'yuml;', 'Zeta;', 'zeta;', 'zwj;', 'zwnj;'];

        return values.map(function(value){
            return {
                caption: value,
                snippet: value,
                meta: "html entity",
                score: 1000000
            };
        });
    };

}).call(HtmlCompletions.prototype);

exports.HtmlCompletions = HtmlCompletions;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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V0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxVQUFVLFNBQVMsU0FBUyxZQUFZLFlBQVksVUFBVSxRQUFRLFFBQVEsUUFBUSxRQUFRLFNBQVMsU0FBUyxTQUFTLFVBQVUsU0FBUyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLE9BQU8sT0FBTyxTQUFTLFNBQVMsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxVQUFVLFFBQVEsU0FBUyxTQUFTLFdBQVcsU0FBUyxTQUFTLFNBQVMsVUFBVSxVQUFVLFdBQVcsV0FBVyxTQUFTLFVBQVUsU0FBUyxTQUFTLFVBQVUsVUFBVSxPQUFPLFdBQVcsV0FBVyxRQUFRLFFBQVEsV0FBVyxVQUFVLE9BQU8sU0FBUyxVQUFVLFVBQVUsV0FBVyxVQUFVLE9BQU8sT0FBTyxVQUFVLFNBQVMsVUFBVSxPQUFPLE9BQU8sUUFBUSxVQUFVLFNBQVMsV0FBVyxXQUFXLE9BQU8sT0FBTyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsWUFBWSxZQUFZLFVBQVUsT0FBTyxTQUFTLFNBQVMsV0FBVyxXQUFXLFdBQVcsV0FBVyxXQUFXLFNBQVMsU0FBUyxTQUFTLFNBQVMsV0FBVyxTQUFTLFFBQVEsUUFBUSxPQUFPLE9BQU8sUUFBUSxXQUFXLFVBQVUsVUFBVSxVQUFVLFNBQVMsU0FBUyxRQUFRLFFBQVEsU0FBUyxVQUFVLFNBQVMsVUFBVSxTQUFTLFNBQVMsVUFBVSxVQUFVLFNBQVMsUUFBUSxXQUFXLFFBQVEsUUFBUSxRQUFRLFdBQVcsVUFBVSxVQUFVLFdBQVcsV0FBVyxTQUFTLFNBQVMsUUFBUSxVQUFVLFVBQVUsV0FBVyxRQUFRLFdBQVcsUUFBUSxTQUFTLFFBQVEsUUFBUSxTQUFTLFNBQVMsU0FBUyxTQUFTLFVBQVUsUUFBUSxRQUFRLFdBQVcsVUFBVSxVQUFVLGFBQWEsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFNBQVMsU0FBUyxVQUFVLFVBQVUsV0FBVyxXQUFXLFFBQVEsVUFBVSxZQUFZLFlBQVksU0FBUyxTQUFTLFdBQVcsT0FBTyxPQUFPLFdBQVcsV0FBVyxRQUFRLFNBQVMsU0FBUyxTQUFTLFNBQVMsUUFBUSxTQUFTOztBQUUzNEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUEsQ0FBQzs7QUFFRCx1QkFBdUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2JlaGF2aW91ci9jc3MuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jc3MuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9jc3NfY29tcGxldGlvbnMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL2h0bWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9mb2xkaW5nL21peGVkLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvaHRtbC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2h0bWxfY29tcGxldGlvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmVoYXZpb3VyID0gcmVxdWlyZShcIi4uL2JlaGF2aW91clwiKS5CZWhhdmlvdXI7XG52YXIgQ3N0eWxlQmVoYXZpb3VyID0gcmVxdWlyZShcIi4vY3N0eWxlXCIpLkNzdHlsZUJlaGF2aW91cjtcbnZhciBUb2tlbkl0ZXJhdG9yID0gcmVxdWlyZShcIi4uLy4uL3Rva2VuX2l0ZXJhdG9yXCIpLlRva2VuSXRlcmF0b3I7XG5cbi8qKkB0eXBlIHsobmV3KCkgPT4gUGFydGlhbDxpbXBvcnQoXCIuLi8uLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLkJlaGF2aW91cj4pfSovXG52YXIgQ3NzQmVoYXZpb3VyID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdGhpcy5pbmhlcml0KENzdHlsZUJlaGF2aW91cik7XG5cbiAgICB0aGlzLmFkZChcImNvbG9uXCIsIFwiaW5zZXJ0aW9uXCIsIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uLCBlZGl0b3IsIHNlc3Npb24sIHRleHQpIHtcbiAgICAgICAgaWYgKHRleHQgPT09ICc6JyAmJiBlZGl0b3Iuc2VsZWN0aW9uLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gbmV3IFRva2VuSXRlcmF0b3Ioc2Vzc2lvbiwgY3Vyc29yLnJvdywgY3Vyc29yLmNvbHVtbik7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW4oKTtcbiAgICAgICAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi52YWx1ZS5tYXRjaCgvXFxzKy8pKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBpdGVyYXRvci5zdGVwQmFja3dhcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi50eXBlID09PSAnc3VwcG9ydC50eXBlJykge1xuICAgICAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5kb2MuZ2V0TGluZShjdXJzb3Iucm93KTtcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRDaGFyID0gbGluZS5zdWJzdHJpbmcoY3Vyc29yLmNvbHVtbiwgY3Vyc29yLmNvbHVtbiArIDEpO1xuICAgICAgICAgICAgICAgIGlmIChyaWdodENoYXIgPT09ICc6Jykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbMSwgMV1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKC9eKFxccytbXjtdfFxccyokKS8udGVzdChsaW5lLnN1YnN0cmluZyhjdXJzb3IuY29sdW1uKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJzo7JyxcbiAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbMSwgMV1cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWRkKFwiY29sb25cIiwgXCJkZWxldGlvblwiLCBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbiwgZWRpdG9yLCBzZXNzaW9uLCByYW5nZSkge1xuICAgICAgICB2YXIgc2VsZWN0ZWQgPSBzZXNzaW9uLmRvYy5nZXRUZXh0UmFuZ2UocmFuZ2UpO1xuICAgICAgICBpZiAoIXJhbmdlLmlzTXVsdGlMaW5lKCkgJiYgc2VsZWN0ZWQgPT09ICc6Jykge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGl0ZXJhdG9yID0gbmV3IFRva2VuSXRlcmF0b3Ioc2Vzc2lvbiwgY3Vyc29yLnJvdywgY3Vyc29yLmNvbHVtbik7XG4gICAgICAgICAgICB2YXIgdG9rZW4gPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW4oKTtcbiAgICAgICAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi52YWx1ZS5tYXRjaCgvXFxzKy8pKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSBpdGVyYXRvci5zdGVwQmFja3dhcmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0b2tlbiAmJiB0b2tlbi50eXBlID09PSAnc3VwcG9ydC50eXBlJykge1xuICAgICAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5kb2MuZ2V0TGluZShyYW5nZS5zdGFydC5yb3cpO1xuICAgICAgICAgICAgICAgIHZhciByaWdodENoYXIgPSBsaW5lLnN1YnN0cmluZyhyYW5nZS5lbmQuY29sdW1uLCByYW5nZS5lbmQuY29sdW1uICsgMSk7XG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0Q2hhciA9PT0gJzsnKSB7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLmVuZC5jb2x1bW4gKys7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByYW5nZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWRkKFwic2VtaWNvbG9uXCIsIFwiaW5zZXJ0aW9uXCIsIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uLCBlZGl0b3IsIHNlc3Npb24sIHRleHQpIHtcbiAgICAgICAgaWYgKHRleHQgPT09ICc7JyAmJiBlZGl0b3Iuc2VsZWN0aW9uLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmRvYy5nZXRMaW5lKGN1cnNvci5yb3cpO1xuICAgICAgICAgICAgdmFyIHJpZ2h0Q2hhciA9IGxpbmUuc3Vic3RyaW5nKGN1cnNvci5jb2x1bW4sIGN1cnNvci5jb2x1bW4gKyAxKTtcbiAgICAgICAgICAgIGlmIChyaWdodENoYXIgPT09ICc7Jykge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgdGV4dDogJycsXG4gICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbMSwgMV1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZChcIiFpbXBvcnRhbnRcIiwgXCJpbnNlcnRpb25cIiwgZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24sIGVkaXRvciwgc2Vzc2lvbiwgdGV4dCkge1xuICAgICAgICBpZiAodGV4dCA9PT0gJyEnICYmIGVkaXRvci5zZWxlY3Rpb24uaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICB2YXIgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZG9jLmdldExpbmUoY3Vyc29yLnJvdyk7XG5cbiAgICAgICAgICAgIGlmICgvXlxccyooO3x9fCQpLy50ZXN0KGxpbmUuc3Vic3RyaW5nKGN1cnNvci5jb2x1bW4pKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICchaW1wb3J0YW50JyxcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uOiBbMTAsIDEwXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxufTtcbm9vcC5pbmhlcml0cyhDc3NCZWhhdmlvdXIsIENzdHlsZUJlaGF2aW91cik7XG5cbmV4cG9ydHMuQ3NzQmVoYXZpb3VyID0gQ3NzQmVoYXZpb3VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBDc3NIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2Nzc19oaWdobGlnaHRfcnVsZXNcIikuQ3NzSGlnaGxpZ2h0UnVsZXM7XG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSByZXF1aXJlKFwiLi9tYXRjaGluZ19icmFjZV9vdXRkZW50XCIpLk1hdGNoaW5nQnJhY2VPdXRkZW50O1xudmFyIFdvcmtlckNsaWVudCA9IHJlcXVpcmUoXCIuLi93b3JrZXIvd29ya2VyX2NsaWVudFwiKS5Xb3JrZXJDbGllbnQ7XG52YXIgQ3NzQ29tcGxldGlvbnMgPSByZXF1aXJlKFwiLi9jc3NfY29tcGxldGlvbnNcIikuQ3NzQ29tcGxldGlvbnM7XG52YXIgQ3NzQmVoYXZpb3VyID0gcmVxdWlyZShcIi4vYmVoYXZpb3VyL2Nzc1wiKS5Dc3NCZWhhdmlvdXI7XG52YXIgQ1N0eWxlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gQ3NzSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy4kb3V0ZGVudCA9IG5ldyBNYXRjaGluZ0JyYWNlT3V0ZGVudCgpO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IG5ldyBDc3NCZWhhdmlvdXIoKTtcbiAgICB0aGlzLiRjb21wbGV0ZXIgPSBuZXcgQ3NzQ29tcGxldGlvbnMoKTtcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBDU3R5bGVGb2xkTW9kZSgpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gXCJjU3R5bGVcIjtcbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCIvKlwiLCBlbmQ6IFwiKi9cIn07XG5cbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuXG4gICAgICAgIC8vIGlnbm9yZSBicmFjZXMgaW4gY29tbWVudHNcbiAgICAgICAgdmFyIHRva2VucyA9IHRoaXMuZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLCBzdGF0ZSkudG9rZW5zO1xuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbdG9rZW5zLmxlbmd0aC0xXS50eXBlID09IFwiY29tbWVudFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG1hdGNoID0gbGluZS5tYXRjaCgvXi4qXFx7XFxzKiQvKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG91dGRlbnQuY2hlY2tPdXRkZW50KGxpbmUsIGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBkb2MsIHJvdykge1xuICAgICAgICB0aGlzLiRvdXRkZW50LmF1dG9PdXRkZW50KGRvYywgcm93KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kY29tcGxldGVyLmdldENvbXBsZXRpb25zKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCk7XG4gICAgfTtcblxuICAgIHRoaXMuY3JlYXRlV29ya2VyID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgICAgICB2YXIgd29ya2VyID0gbmV3IFdvcmtlckNsaWVudChbXCJhY2VcIl0sIFwiYWNlL21vZGUvY3NzX3dvcmtlclwiLCBcIldvcmtlclwiKTtcbiAgICAgICAgd29ya2VyLmF0dGFjaFRvRG9jdW1lbnQoc2Vzc2lvbi5nZXREb2N1bWVudCgpKTtcblxuICAgICAgICB3b3JrZXIub24oXCJhbm5vdGF0ZVwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZXNzaW9uLnNldEFubm90YXRpb25zKGUuZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtlci5vbihcInRlcm1pbmF0ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlc3Npb24uY2xlYXJBbm5vdGF0aW9ucygpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gd29ya2VyO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvY3NzXCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvY3NzXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgcHJvcGVydHlNYXAgPSB7XG4gICAgXCJiYWNrZ3JvdW5kXCI6IHtcIiMkMFwiOiAxfSxcbiAgICBcImJhY2tncm91bmQtY29sb3JcIjoge1wiIyQwXCI6IDEsIFwidHJhbnNwYXJlbnRcIjogMSwgXCJmaXhlZFwiOiAxfSxcbiAgICBcImJhY2tncm91bmQtaW1hZ2VcIjoge1widXJsKCcvJDAnKVwiOiAxfSxcbiAgICBcImJhY2tncm91bmQtcmVwZWF0XCI6IHtcInJlcGVhdFwiOiAxLCBcInJlcGVhdC14XCI6IDEsIFwicmVwZWF0LXlcIjogMSwgXCJuby1yZXBlYXRcIjogMSwgXCJpbmhlcml0XCI6IDF9LFxuICAgIFwiYmFja2dyb3VuZC1wb3NpdGlvblwiOiB7XCJib3R0b21cIjoyLCBcImNlbnRlclwiOjIsIFwibGVmdFwiOjIsIFwicmlnaHRcIjoyLCBcInRvcFwiOjIsIFwiaW5oZXJpdFwiOjJ9LFxuICAgIFwiYmFja2dyb3VuZC1hdHRhY2htZW50XCI6IHtcInNjcm9sbFwiOiAxLCBcImZpeGVkXCI6IDF9LFxuICAgIFwiYmFja2dyb3VuZC1zaXplXCI6IHtcImNvdmVyXCI6IDEsIFwiY29udGFpblwiOiAxfSxcbiAgICBcImJhY2tncm91bmQtY2xpcFwiOiB7XCJib3JkZXItYm94XCI6IDEsIFwicGFkZGluZy1ib3hcIjogMSwgXCJjb250ZW50LWJveFwiOiAxfSxcbiAgICBcImJhY2tncm91bmQtb3JpZ2luXCI6IHtcImJvcmRlci1ib3hcIjogMSwgXCJwYWRkaW5nLWJveFwiOiAxLCBcImNvbnRlbnQtYm94XCI6IDF9LFxuICAgIFwiYm9yZGVyXCI6IHtcInNvbGlkICQwXCI6IDEsIFwiZGFzaGVkICQwXCI6IDEsIFwiZG90dGVkICQwXCI6IDEsIFwiIyQwXCI6IDF9LFxuICAgIFwiYm9yZGVyLWNvbG9yXCI6IHtcIiMkMFwiOiAxfSxcbiAgICBcImJvcmRlci1zdHlsZVwiOiB7XCJzb2xpZFwiOjIsIFwiZGFzaGVkXCI6MiwgXCJkb3R0ZWRcIjoyLCBcImRvdWJsZVwiOjIsIFwiZ3Jvb3ZlXCI6MiwgXCJoaWRkZW5cIjoyLCBcImluaGVyaXRcIjoyLCBcImluc2V0XCI6MiwgXCJub25lXCI6MiwgXCJvdXRzZXRcIjoyLCBcInJpZGdlZFwiOjJ9LFxuICAgIFwiYm9yZGVyLWNvbGxhcHNlXCI6IHtcImNvbGxhcHNlXCI6IDEsIFwic2VwYXJhdGVcIjogMX0sXG4gICAgXCJib3R0b21cIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJjbGVhclwiOiB7XCJsZWZ0XCI6IDEsIFwicmlnaHRcIjogMSwgXCJib3RoXCI6IDEsIFwibm9uZVwiOiAxfSxcbiAgICBcImNvbG9yXCI6IHtcIiMkMFwiOiAxLCBcInJnYigjJDAwLDAsMClcIjogMX0sXG4gICAgXCJjdXJzb3JcIjoge1wiZGVmYXVsdFwiOiAxLCBcInBvaW50ZXJcIjogMSwgXCJtb3ZlXCI6IDEsIFwidGV4dFwiOiAxLCBcIndhaXRcIjogMSwgXCJoZWxwXCI6IDEsIFwicHJvZ3Jlc3NcIjogMSwgXCJuLXJlc2l6ZVwiOiAxLCBcIm5lLXJlc2l6ZVwiOiAxLCBcImUtcmVzaXplXCI6IDEsIFwic2UtcmVzaXplXCI6IDEsIFwicy1yZXNpemVcIjogMSwgXCJzdy1yZXNpemVcIjogMSwgXCJ3LXJlc2l6ZVwiOiAxLCBcIm53LXJlc2l6ZVwiOiAxfSxcbiAgICBcImRpc3BsYXlcIjoge1wibm9uZVwiOiAxLCBcImJsb2NrXCI6IDEsIFwiaW5saW5lXCI6IDEsIFwiaW5saW5lLWJsb2NrXCI6IDEsIFwidGFibGUtY2VsbFwiOiAxfSxcbiAgICBcImVtcHR5LWNlbGxzXCI6IHtcInNob3dcIjogMSwgXCJoaWRlXCI6IDF9LFxuICAgIFwiZmxvYXRcIjoge1wibGVmdFwiOiAxLCBcInJpZ2h0XCI6IDEsIFwibm9uZVwiOiAxfSxcbiAgICBcImZvbnQtZmFtaWx5XCI6IHtcIkFyaWFsXCI6MixcIkNvbWljIFNhbnMgTVNcIjoyLFwiQ29uc29sYXNcIjoyLFwiQ291cmllciBOZXdcIjoyLFwiQ291cmllclwiOjIsXCJHZW9yZ2lhXCI6MixcIk1vbm9zcGFjZVwiOjIsXCJTYW5zLVNlcmlmXCI6MiwgXCJTZWdvZSBVSVwiOjIsXCJUYWhvbWFcIjoyLFwiVGltZXMgTmV3IFJvbWFuXCI6MixcIlRyZWJ1Y2hldCBNU1wiOjIsXCJWZXJkYW5hXCI6IDF9LFxuICAgIFwiZm9udC1zaXplXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwiZm9udC13ZWlnaHRcIjoge1wiYm9sZFwiOiAxLCBcIm5vcm1hbFwiOiAxfSxcbiAgICBcImZvbnQtc3R5bGVcIjoge1wiaXRhbGljXCI6IDEsIFwibm9ybWFsXCI6IDF9LFxuICAgIFwiZm9udC12YXJpYW50XCI6IHtcIm5vcm1hbFwiOiAxLCBcInNtYWxsLWNhcHNcIjogMX0sXG4gICAgXCJoZWlnaHRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJsZWZ0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibGV0dGVyLXNwYWNpbmdcIjoge1wibm9ybWFsXCI6IDF9LFxuICAgIFwibGluZS1oZWlnaHRcIjoge1wibm9ybWFsXCI6IDF9LFxuICAgIFwibGlzdC1zdHlsZS10eXBlXCI6IHtcIm5vbmVcIjogMSwgXCJkaXNjXCI6IDEsIFwiY2lyY2xlXCI6IDEsIFwic3F1YXJlXCI6IDEsIFwiZGVjaW1hbFwiOiAxLCBcImRlY2ltYWwtbGVhZGluZy16ZXJvXCI6IDEsIFwibG93ZXItcm9tYW5cIjogMSwgXCJ1cHBlci1yb21hblwiOiAxLCBcImxvd2VyLWdyZWVrXCI6IDEsIFwibG93ZXItbGF0aW5cIjogMSwgXCJ1cHBlci1sYXRpblwiOiAxLCBcImdlb3JnaWFuXCI6IDEsIFwibG93ZXItYWxwaGFcIjogMSwgXCJ1cHBlci1hbHBoYVwiOiAxfSxcbiAgICBcIm1hcmdpblwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1hcmdpbi1yaWdodFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1hcmdpbi1sZWZ0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibWFyZ2luLXRvcFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1hcmdpbi1ib3R0b21cIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtYXgtaGVpZ2h0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibWF4LXdpZHRoXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibWluLWhlaWdodFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1pbi13aWR0aFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm92ZXJmbG93XCI6IHtcImhpZGRlblwiOiAxLCBcInZpc2libGVcIjogMSwgXCJhdXRvXCI6IDEsIFwic2Nyb2xsXCI6IDF9LFxuICAgIFwib3ZlcmZsb3cteFwiOiB7XCJoaWRkZW5cIjogMSwgXCJ2aXNpYmxlXCI6IDEsIFwiYXV0b1wiOiAxLCBcInNjcm9sbFwiOiAxfSxcbiAgICBcIm92ZXJmbG93LXlcIjoge1wiaGlkZGVuXCI6IDEsIFwidmlzaWJsZVwiOiAxLCBcImF1dG9cIjogMSwgXCJzY3JvbGxcIjogMX0sXG4gICAgXCJwYWRkaW5nXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwicGFkZGluZy10b3BcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJwYWRkaW5nLXJpZ2h0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwicGFkZGluZy1ib3R0b21cIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJwYWRkaW5nLWxlZnRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJwYWdlLWJyZWFrLWFmdGVyXCI6IHtcImF1dG9cIjogMSwgXCJhbHdheXNcIjogMSwgXCJhdm9pZFwiOiAxLCBcImxlZnRcIjogMSwgXCJyaWdodFwiOiAxfSxcbiAgICBcInBhZ2UtYnJlYWstYmVmb3JlXCI6IHtcImF1dG9cIjogMSwgXCJhbHdheXNcIjogMSwgXCJhdm9pZFwiOiAxLCBcImxlZnRcIjogMSwgXCJyaWdodFwiOiAxfSxcbiAgICBcInBvc2l0aW9uXCI6IHtcImFic29sdXRlXCI6IDEsIFwicmVsYXRpdmVcIjogMSwgXCJmaXhlZFwiOiAxLCBcInN0YXRpY1wiOiAxfSxcbiAgICBcInJpZ2h0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwidGFibGUtbGF5b3V0XCI6IHtcImZpeGVkXCI6IDEsIFwiYXV0b1wiOiAxfSxcbiAgICBcInRleHQtZGVjb3JhdGlvblwiOiB7XCJub25lXCI6IDEsIFwidW5kZXJsaW5lXCI6IDEsIFwibGluZS10aHJvdWdoXCI6IDEsIFwiYmxpbmtcIjogMX0sXG4gICAgXCJ0ZXh0LWFsaWduXCI6IHtcImxlZnRcIjogMSwgXCJyaWdodFwiOiAxLCBcImNlbnRlclwiOiAxLCBcImp1c3RpZnlcIjogMX0sXG4gICAgXCJ0ZXh0LXRyYW5zZm9ybVwiOiB7XCJjYXBpdGFsaXplXCI6IDEsIFwidXBwZXJjYXNlXCI6IDEsIFwibG93ZXJjYXNlXCI6IDEsIFwibm9uZVwiOiAxfSxcbiAgICBcInRvcFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcInZlcnRpY2FsLWFsaWduXCI6IHtcInRvcFwiOiAxLCBcImJvdHRvbVwiOiAxfSxcbiAgICBcInZpc2liaWxpdHlcIjoge1wiaGlkZGVuXCI6IDEsIFwidmlzaWJsZVwiOiAxfSxcbiAgICBcIndoaXRlLXNwYWNlXCI6IHtcIm5vd3JhcFwiOiAxLCBcIm5vcm1hbFwiOiAxLCBcInByZVwiOiAxLCBcInByZS1saW5lXCI6IDEsIFwicHJlLXdyYXBcIjogMX0sXG4gICAgXCJ3aWR0aFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIndvcmQtc3BhY2luZ1wiOiB7XCJub3JtYWxcIjogMX0sXG5cbiAgICAvLyBvcGFjaXR5XG4gICAgXCJmaWx0ZXJcIjoge1wiYWxwaGEob3BhY2l0eT0kMDEwMClcIjogMX0sXG5cbiAgICBcInRleHQtc2hhZG93XCI6IHtcIiQwMnB4IDJweCAycHggIzc3N1wiOiAxfSxcbiAgICBcInRleHQtb3ZlcmZsb3dcIjoge1wiZWxsaXBzaXMtd29yZFwiOiAxLCBcImNsaXBcIjogMSwgXCJlbGxpcHNpc1wiOiAxfSxcblxuICAgIC8vIGJvcmRlciByYWRpdXNcbiAgICBcIi1tb3otYm9yZGVyLXJhZGl1c1wiOiAxLFxuICAgIFwiLW1vei1ib3JkZXItcmFkaXVzLXRvcHJpZ2h0XCI6IDEsXG4gICAgXCItbW96LWJvcmRlci1yYWRpdXMtYm90dG9tcmlnaHRcIjogMSxcbiAgICBcIi1tb3otYm9yZGVyLXJhZGl1cy10b3BsZWZ0XCI6IDEsXG4gICAgXCItbW96LWJvcmRlci1yYWRpdXMtYm90dG9tbGVmdFwiOiAxLFxuICAgIFwiLXdlYmtpdC1ib3JkZXItcmFkaXVzXCI6IDEsXG4gICAgXCItd2Via2l0LWJvcmRlci10b3AtcmlnaHQtcmFkaXVzXCI6IDEsXG4gICAgXCItd2Via2l0LWJvcmRlci10b3AtbGVmdC1yYWRpdXNcIjogMSxcbiAgICBcIi13ZWJraXQtYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXNcIjogMSxcbiAgICBcIi13ZWJraXQtYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1c1wiOiAxLFxuXG4gICAgLy8gZHJvcHNoYWRvd3NcbiAgICBcIi1tb3otYm94LXNoYWRvd1wiOiAxLFxuICAgIFwiLXdlYmtpdC1ib3gtc2hhZG93XCI6IDEsXG5cbiAgICAvLyB0cmFuc2Zvcm1hdGlvbnNcbiAgICBcInRyYW5zZm9ybVwiOiB7XCJyb3RhdGUoJDAwZGVnKVwiOiAxLCBcInNrZXcoJDAwZGVnKVwiOiAxfSxcbiAgICBcIi1tb3otdHJhbnNmb3JtXCI6IHtcInJvdGF0ZSgkMDBkZWcpXCI6IDEsIFwic2tldygkMDBkZWcpXCI6IDF9LFxuICAgIFwiLXdlYmtpdC10cmFuc2Zvcm1cIjoge1wicm90YXRlKCQwMGRlZylcIjogMSwgXCJza2V3KCQwMGRlZylcIjogMSB9XG59O1xuXG52YXIgQ3NzQ29tcGxldGlvbnMgPSBmdW5jdGlvbigpIHtcblxufTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5jb21wbGV0aW9uc0RlZmluZWQgPSBmYWxzZTtcblxuICAgIHRoaXMuZGVmaW5lQ29tcGxldGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgLy9maWxsIGluIG1pc3NpbmcgcHJvcGVydGllc1xuICAgICAgICBpZiAoZG9jdW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2MnKS5zdHlsZTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBzdHlsZSkge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3R5bGVbaV0gIT09ICdzdHJpbmcnKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gaS5yZXBsYWNlKC9bQS1aXS9nLCBmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnLScgKyB4LnRvTG93ZXJDYXNlKCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXByb3BlcnR5TWFwLmhhc093blByb3BlcnR5KG5hbWUpKVxuICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eU1hcFtuYW1lXSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNvbXBsZXRpb25zRGVmaW5lZCA9IHRydWU7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Q29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBsZXRpb25zRGVmaW5lZCkge1xuICAgICAgICAgICAgdGhpcy5kZWZpbmVDb21wbGV0aW9ucygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlPT09J3J1bGVzZXQnIHx8IHNlc3Npb24uJG1vZGUuJGlkID09IFwiYWNlL21vZGUvc2Nzc1wiKSB7XG4gICAgICAgICAgICAvL2NzcyBhdHRyaWJ1dGUgdmFsdWVcbiAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHBvcy5yb3cpLnN1YnN0cigwLCBwb3MuY29sdW1uKTtcbiAgICAgICAgICAgIHZhciBpblBhcmVucyA9IC9cXChbXildKiQvLnRlc3QobGluZSk7XG4gICAgICAgICAgICBpZiAoaW5QYXJlbnMpIHtcbiAgICAgICAgICAgICAgICBsaW5lID0gbGluZS5zdWJzdHIobGluZS5sYXN0SW5kZXhPZignKCcpICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoLzpbXjtdKyQvLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgICAgICAvKFtcXHdcXC1dKyk6W146XSokLy50ZXN0KGxpbmUpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlWYWx1ZUNvbXBsZXRpb25zKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5Q29tcGxldGlvbnMoc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4LCBpblBhcmVucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gW107XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0UHJvcGVydHlDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCwgc2tpcFNlbWljb2xvbikge1xuICAgICAgICBza2lwU2VtaWNvbG9uID0gc2tpcFNlbWljb2xvbiB8fCBmYWxzZTtcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0eU1hcCk7XG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzLm1hcChmdW5jdGlvbihwcm9wZXJ0eSl7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNhcHRpb246IHByb3BlcnR5LFxuICAgICAgICAgICAgICAgIHNuaXBwZXQ6IHByb3BlcnR5ICsgJzogJDAnICsgKHNraXBTZW1pY29sb24gPyAnJyA6ICc7JyksXG4gICAgICAgICAgICAgICAgbWV0YTogXCJwcm9wZXJ0eVwiLFxuICAgICAgICAgICAgICAgIHNjb3JlOiAxMDAwMDAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRQcm9wZXJ0eVZhbHVlQ29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocG9zLnJvdykuc3Vic3RyKDAsIHBvcy5jb2x1bW4pO1xuICAgICAgICB2YXIgcHJvcGVydHkgPSAoLyhbXFx3XFwtXSspOlteOl0qJC8uZXhlYyhsaW5lKSB8fCB7fSlbMV07XG5cbiAgICAgICAgaWYgKCFwcm9wZXJ0eSlcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgICBpZiAocHJvcGVydHkgaW4gcHJvcGVydHlNYXAgJiYgdHlwZW9mIHByb3BlcnR5TWFwW3Byb3BlcnR5XSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdmFsdWVzID0gT2JqZWN0LmtleXMocHJvcGVydHlNYXBbcHJvcGVydHldKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWVzLm1hcChmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNhcHRpb246IHZhbHVlLFxuICAgICAgICAgICAgICAgIHNuaXBwZXQ6IHZhbHVlLFxuICAgICAgICAgICAgICAgIG1ldGE6IFwicHJvcGVydHkgdmFsdWVcIixcbiAgICAgICAgICAgICAgICBzY29yZTogMTAwMDAwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxufSkuY2FsbChDc3NDb21wbGV0aW9ucy5wcm90b3R5cGUpO1xuXG5leHBvcnRzLkNzc0NvbXBsZXRpb25zID0gQ3NzQ29tcGxldGlvbnM7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIE1peGVkRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9taXhlZFwiKS5Gb2xkTW9kZTtcbnZhciBYbWxGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL3htbFwiKS5Gb2xkTW9kZTtcbnZhciBDU3R5bGVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2NzdHlsZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKHZvaWRFbGVtZW50cywgb3B0aW9uYWxUYWdzKSB7XG4gICAgTWl4ZWRGb2xkTW9kZS5jYWxsKHRoaXMsIG5ldyBYbWxGb2xkTW9kZSh2b2lkRWxlbWVudHMsIG9wdGlvbmFsVGFncyksIHtcbiAgICAgICAgXCJqcy1cIjogbmV3IENTdHlsZUZvbGRNb2RlKCksXG4gICAgICAgIFwiY3NzLVwiOiBuZXcgQ1N0eWxlRm9sZE1vZGUoKVxuICAgIH0pO1xufTtcblxub29wLmluaGVyaXRzKEZvbGRNb2RlLCBNaXhlZEZvbGRNb2RlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oZGVmYXVsdE1vZGUsIHN1Yk1vZGVzKSB7XG4gICAgdGhpcy5kZWZhdWx0TW9kZSA9IGRlZmF1bHRNb2RlO1xuICAgIHRoaXMuc3ViTW9kZXMgPSBzdWJNb2Rlcztcbn07XG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIEJhc2VGb2xkTW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuXG4gICAgdGhpcy4kZ2V0TW9kZSA9IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc3RhdGUgIT0gXCJzdHJpbmdcIikgXG4gICAgICAgICAgICBzdGF0ZSA9IHN0YXRlWzBdO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5zdWJNb2Rlcykge1xuICAgICAgICAgICAgaWYgKHN0YXRlLmluZGV4T2Yoa2V5KSA9PT0gMClcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdWJNb2Rlc1trZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgXG4gICAgdGhpcy4kdHJ5TW9kZSA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbW9kZSA9IHRoaXMuJGdldE1vZGUoc3RhdGUpO1xuICAgICAgICByZXR1cm4gKG1vZGUgPyBtb2RlLmdldEZvbGRXaWRnZXQoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIDogXCJcIik7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldCA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0aGlzLiR0cnlNb2RlKHNlc3Npb24uZ2V0U3RhdGUocm93LTEpLCBzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykgfHxcbiAgICAgICAgICAgIHRoaXMuJHRyeU1vZGUoc2Vzc2lvbi5nZXRTdGF0ZShyb3cpLCBzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykgfHxcbiAgICAgICAgICAgIHRoaXMuZGVmYXVsdE1vZGUuZ2V0Rm9sZFdpZGdldChzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdylcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbW9kZSA9IHRoaXMuJGdldE1vZGUoc2Vzc2lvbi5nZXRTdGF0ZShyb3ctMSkpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFtb2RlIHx8ICFtb2RlLmdldEZvbGRXaWRnZXQoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpKVxuICAgICAgICAgICAgbW9kZSA9IHRoaXMuJGdldE1vZGUoc2Vzc2lvbi5nZXRTdGF0ZShyb3cpKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghbW9kZSB8fCAhbW9kZS5nZXRGb2xkV2lkZ2V0KHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSlcbiAgICAgICAgICAgIG1vZGUgPSB0aGlzLmRlZmF1bHRNb2RlO1xuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG1vZGUuZ2V0Rm9sZFdpZGdldFJhbmdlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICB9O1xuXG59KS5jYWxsKEZvbGRNb2RlLnByb3RvdHlwZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgSmF2YVNjcmlwdE1vZGUgPSByZXF1aXJlKFwiLi9qYXZhc2NyaXB0XCIpLk1vZGU7XG52YXIgQ3NzTW9kZSA9IHJlcXVpcmUoXCIuL2Nzc1wiKS5Nb2RlO1xudmFyIEh0bWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2h0bWxfaGlnaGxpZ2h0X3J1bGVzXCIpLkh0bWxIaWdobGlnaHRSdWxlcztcbnZhciBYbWxCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi9iZWhhdmlvdXIveG1sXCIpLlhtbEJlaGF2aW91cjtcbnZhciBIdG1sRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2h0bWxcIikuRm9sZE1vZGU7XG52YXIgSHRtbENvbXBsZXRpb25zID0gcmVxdWlyZShcIi4vaHRtbF9jb21wbGV0aW9uc1wiKS5IdG1sQ29tcGxldGlvbnM7XG52YXIgV29ya2VyQ2xpZW50ID0gcmVxdWlyZShcIi4uL3dvcmtlci93b3JrZXJfY2xpZW50XCIpLldvcmtlckNsaWVudDtcblxuLy8gaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjdm9pZC1lbGVtZW50c1xudmFyIHZvaWRFbGVtZW50cyA9IFtcImFyZWFcIiwgXCJiYXNlXCIsIFwiYnJcIiwgXCJjb2xcIiwgXCJlbWJlZFwiLCBcImhyXCIsIFwiaW1nXCIsIFwiaW5wdXRcIiwgXCJrZXlnZW5cIiwgXCJsaW5rXCIsIFwibWV0YVwiLCBcIm1lbnVpdGVtXCIsIFwicGFyYW1cIiwgXCJzb3VyY2VcIiwgXCJ0cmFja1wiLCBcIndiclwiXTtcbnZhciBvcHRpb25hbEVuZFRhZ3MgPSBbXCJsaVwiLCBcImR0XCIsIFwiZGRcIiwgXCJwXCIsIFwicnRcIiwgXCJycFwiLCBcIm9wdGdyb3VwXCIsIFwib3B0aW9uXCIsIFwiY29sZ3JvdXBcIiwgXCJ0ZFwiLCBcInRoXCJdO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB0aGlzLmZyYWdtZW50Q29udGV4dCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5mcmFnbWVudENvbnRleHQ7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IEh0bWxIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSBuZXcgWG1sQmVoYXZpb3VyKCk7XG4gICAgdGhpcy4kY29tcGxldGVyID0gbmV3IEh0bWxDb21wbGV0aW9ucygpO1xuICAgIFxuICAgIHRoaXMuY3JlYXRlTW9kZURlbGVnYXRlcyh7XG4gICAgICAgIFwianMtXCI6IEphdmFTY3JpcHRNb2RlLFxuICAgICAgICBcImNzcy1cIjogQ3NzTW9kZVxuICAgIH0pO1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEh0bWxGb2xkTW9kZSh0aGlzLnZvaWRFbGVtZW50cywgbGFuZy5hcnJheVRvTWFwKG9wdGlvbmFsRW5kVGFncykpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIjwhLS1cIiwgZW5kOiBcIi0tPlwifTtcblxuICAgIHRoaXMudm9pZEVsZW1lbnRzID0gbGFuZy5hcnJheVRvTWFwKHZvaWRFbGVtZW50cyk7XG5cbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgICByZXR1cm4gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Q29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNvbXBsZXRlci5nZXRDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuICAgIH07XG5cbiAgICB0aGlzLmNyZWF0ZVdvcmtlciA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgaWYgKHRoaXMuY29uc3RydWN0b3IgIT0gTW9kZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXJDbGllbnQoW1wiYWNlXCJdLCBcImFjZS9tb2RlL2h0bWxfd29ya2VyXCIsIFwiV29ya2VyXCIpO1xuICAgICAgICB3b3JrZXIuYXR0YWNoVG9Eb2N1bWVudChzZXNzaW9uLmdldERvY3VtZW50KCkpO1xuXG4gICAgICAgIGlmICh0aGlzLmZyYWdtZW50Q29udGV4dClcbiAgICAgICAgICAgIHdvcmtlci5jYWxsKFwic2V0T3B0aW9uc1wiLCBbe2NvbnRleHQ6IHRoaXMuZnJhZ21lbnRDb250ZXh0fV0pO1xuXG4gICAgICAgIHdvcmtlci5vbihcImVycm9yXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHNlc3Npb24uc2V0QW5ub3RhdGlvbnMoZS5kYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya2VyLm9uKFwidGVybWluYXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2Vzc2lvbi5jbGVhckFubm90YXRpb25zKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB3b3JrZXI7XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9odG1sXCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvaHRtbFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFRva2VuSXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vdG9rZW5faXRlcmF0b3JcIikuVG9rZW5JdGVyYXRvcjtcblxudmFyIGNvbW1vbkF0dHJpYnV0ZXMgPSBbXG4gICAgXCJhY2Nlc3NrZXlcIixcbiAgICBcImNsYXNzXCIsXG4gICAgXCJjb250ZW50ZWRpdGFibGVcIixcbiAgICBcImNvbnRleHRtZW51XCIsXG4gICAgXCJkaXJcIixcbiAgICBcImRyYWdnYWJsZVwiLFxuICAgIFwiZHJvcHpvbmVcIixcbiAgICBcImhpZGRlblwiLFxuICAgIFwiaWRcIixcbiAgICBcImluZXJ0XCIsXG4gICAgXCJpdGVtaWRcIixcbiAgICBcIml0ZW1wcm9wXCIsXG4gICAgXCJpdGVtcmVmXCIsXG4gICAgXCJpdGVtc2NvcGVcIixcbiAgICBcIml0ZW10eXBlXCIsXG4gICAgXCJsYW5nXCIsXG4gICAgXCJzcGVsbGNoZWNrXCIsXG4gICAgXCJzdHlsZVwiLFxuICAgIFwidGFiaW5kZXhcIixcbiAgICBcInRpdGxlXCIsXG4gICAgXCJ0cmFuc2xhdGVcIlxuXTtcblxudmFyIGV2ZW50QXR0cmlidXRlcyA9IFtcbiAgICBcIm9uYWJvcnRcIixcbiAgICBcIm9uYmx1clwiLFxuICAgIFwib25jYW5jZWxcIixcbiAgICBcIm9uY2FucGxheVwiLFxuICAgIFwib25jYW5wbGF5dGhyb3VnaFwiLFxuICAgIFwib25jaGFuZ2VcIixcbiAgICBcIm9uY2xpY2tcIixcbiAgICBcIm9uY2xvc2VcIixcbiAgICBcIm9uY29udGV4dG1lbnVcIixcbiAgICBcIm9uY3VlY2hhbmdlXCIsXG4gICAgXCJvbmRibGNsaWNrXCIsXG4gICAgXCJvbmRyYWdcIixcbiAgICBcIm9uZHJhZ2VuZFwiLFxuICAgIFwib25kcmFnZW50ZXJcIixcbiAgICBcIm9uZHJhZ2xlYXZlXCIsXG4gICAgXCJvbmRyYWdvdmVyXCIsXG4gICAgXCJvbmRyYWdzdGFydFwiLFxuICAgIFwib25kcm9wXCIsXG4gICAgXCJvbmR1cmF0aW9uY2hhbmdlXCIsXG4gICAgXCJvbmVtcHRpZWRcIixcbiAgICBcIm9uZW5kZWRcIixcbiAgICBcIm9uZXJyb3JcIixcbiAgICBcIm9uZm9jdXNcIixcbiAgICBcIm9uaW5wdXRcIixcbiAgICBcIm9uaW52YWxpZFwiLFxuICAgIFwib25rZXlkb3duXCIsXG4gICAgXCJvbmtleXByZXNzXCIsXG4gICAgXCJvbmtleXVwXCIsXG4gICAgXCJvbmxvYWRcIixcbiAgICBcIm9ubG9hZGVkZGF0YVwiLFxuICAgIFwib25sb2FkZWRtZXRhZGF0YVwiLFxuICAgIFwib25sb2Fkc3RhcnRcIixcbiAgICBcIm9ubW91c2Vkb3duXCIsXG4gICAgXCJvbm1vdXNlbW92ZVwiLFxuICAgIFwib25tb3VzZW91dFwiLFxuICAgIFwib25tb3VzZW92ZXJcIixcbiAgICBcIm9ubW91c2V1cFwiLFxuICAgIFwib25tb3VzZXdoZWVsXCIsXG4gICAgXCJvbnBhdXNlXCIsXG4gICAgXCJvbnBsYXlcIixcbiAgICBcIm9ucGxheWluZ1wiLFxuICAgIFwib25wcm9ncmVzc1wiLFxuICAgIFwib25yYXRlY2hhbmdlXCIsXG4gICAgXCJvbnJlc2V0XCIsXG4gICAgXCJvbnNjcm9sbFwiLFxuICAgIFwib25zZWVrZWRcIixcbiAgICBcIm9uc2Vla2luZ1wiLFxuICAgIFwib25zZWxlY3RcIixcbiAgICBcIm9uc2hvd1wiLFxuICAgIFwib25zdGFsbGVkXCIsXG4gICAgXCJvbnN1Ym1pdFwiLFxuICAgIFwib25zdXNwZW5kXCIsXG4gICAgXCJvbnRpbWV1cGRhdGVcIixcbiAgICBcIm9udm9sdW1lY2hhbmdlXCIsXG4gICAgXCJvbndhaXRpbmdcIlxuXTtcblxudmFyIGdsb2JhbEF0dHJpYnV0ZXMgPSBjb21tb25BdHRyaWJ1dGVzLmNvbmNhdChldmVudEF0dHJpYnV0ZXMpO1xuXG52YXIgYXR0cmlidXRlTWFwID0ge1xuICAgIFwiYVwiOiB7XCJocmVmXCI6IDEsIFwidGFyZ2V0XCI6IHtcIl9ibGFua1wiOiAxLCBcInRvcFwiOiAxfSwgXCJwaW5nXCI6IDEsIFwicmVsXCI6IHtcIm5vZm9sbG93XCI6IDEsIFwiYWx0ZXJuYXRlXCI6IDEsIFwiYXV0aG9yXCI6IDEsIFwiYm9va21hcmtcIjogMSwgXCJoZWxwXCI6IDEsIFwibGljZW5zZVwiOiAxLCBcIm5leHRcIjogMSwgXCJub3JlZmVycmVyXCI6IDEsIFwicHJlZmV0Y2hcIjogMSwgXCJwcmV2XCI6IDEsIFwic2VhcmNoXCI6IDEsIFwidGFnXCI6IDF9LCBcIm1lZGlhXCI6IDEsIFwiaHJlZmxhbmdcIjogMSwgXCJ0eXBlXCI6IDF9LFxuICAgIFwiYWJiclwiOiB7fSxcbiAgICBcImFkZHJlc3NcIjoge30sXG4gICAgXCJhcmVhXCI6IHtcInNoYXBlXCI6IDEsIFwiY29vcmRzXCI6IDEsIFwiaHJlZlwiOiAxLCBcImhyZWZsYW5nXCI6IDEsIFwiYWx0XCI6IDEsIFwidGFyZ2V0XCI6IDEsIFwibWVkaWFcIjogMSwgXCJyZWxcIjogMSwgXCJwaW5nXCI6IDEsIFwidHlwZVwiOiAxfSxcbiAgICBcImFydGljbGVcIjoge1wicHViZGF0ZVwiOiAxfSxcbiAgICBcImFzaWRlXCI6IHt9LFxuICAgIFwiYXVkaW9cIjoge1wic3JjXCI6IDEsIFwiYXV0b2J1ZmZlclwiOiAxLCBcImF1dG9wbGF5XCI6IHtcImF1dG9wbGF5XCI6IDF9LCBcImxvb3BcIjoge1wibG9vcFwiOiAxfSwgXCJjb250cm9sc1wiOiB7XCJjb250cm9sc1wiOiAxfSwgXCJtdXRlZFwiOiB7XCJtdXRlZFwiOiAxfSwgXCJwcmVsb2FkXCI6IHtcImF1dG9cIjogMSwgXCJtZXRhZGF0YVwiOiAxLCBcIm5vbmVcIjogMSB9fSxcbiAgICBcImJcIjoge30sXG4gICAgXCJiYXNlXCI6IHtcImhyZWZcIjogMSwgXCJ0YXJnZXRcIjogMX0sXG4gICAgXCJiZGlcIjoge30sXG4gICAgXCJiZG9cIjoge30sXG4gICAgXCJibG9ja3F1b3RlXCI6IHtcImNpdGVcIjogMX0sXG4gICAgXCJib2R5XCI6IHtcIm9uYWZ0ZXJwcmludFwiOiAxLCBcIm9uYmVmb3JlcHJpbnRcIjogMSwgXCJvbmJlZm9yZXVubG9hZFwiOiAxLCBcIm9uaGFzaGNoYW5nZVwiOiAxLCBcIm9ubWVzc2FnZVwiOiAxLCBcIm9ub2ZmbGluZVwiOiAxLCBcIm9ucG9wc3RhdGVcIjogMSwgXCJvbnJlZG9cIjogMSwgXCJvbnJlc2l6ZVwiOiAxLCBcIm9uc3RvcmFnZVwiOiAxLCBcIm9udW5kb1wiOiAxLCBcIm9udW5sb2FkXCI6IDF9LFxuICAgIFwiYnJcIjoge30sXG4gICAgXCJidXR0b25cIjoge1wiYXV0b2ZvY3VzXCI6IDEsIFwiZGlzYWJsZWRcIjoge1wiZGlzYWJsZWRcIjogMX0sIFwiZm9ybVwiOiAxLCBcImZvcm1hY3Rpb25cIjogMSwgXCJmb3JtZW5jdHlwZVwiOiAxLCBcImZvcm1tZXRob2RcIjogMSwgXCJmb3Jtbm92YWxpZGF0ZVwiOiAxLCBcImZvcm10YXJnZXRcIjogMSwgXCJuYW1lXCI6IDEsIFwidmFsdWVcIjogMSwgXCJ0eXBlXCI6IHtcImJ1dHRvblwiOiAxLCBcInN1Ym1pdFwiOiAxfX0sXG4gICAgXCJjYW52YXNcIjoge1wid2lkdGhcIjogMSwgXCJoZWlnaHRcIjogMX0sXG4gICAgXCJjYXB0aW9uXCI6IHt9LFxuICAgIFwiY2l0ZVwiOiB7fSxcbiAgICBcImNvZGVcIjoge30sXG4gICAgXCJjb2xcIjoge1wic3BhblwiOiAxfSxcbiAgICBcImNvbGdyb3VwXCI6IHtcInNwYW5cIjogMX0sXG4gICAgXCJjb21tYW5kXCI6IHtcInR5cGVcIjogMSwgXCJsYWJlbFwiOiAxLCBcImljb25cIjogMSwgXCJkaXNhYmxlZFwiOiAxLCBcImNoZWNrZWRcIjogMSwgXCJyYWRpb2dyb3VwXCI6IDEsIFwiY29tbWFuZFwiOiAxfSxcbiAgICBcImRhdGFcIjoge30sXG4gICAgXCJkYXRhbGlzdFwiOiB7fSxcbiAgICBcImRkXCI6IHt9LFxuICAgIFwiZGVsXCI6IHtcImNpdGVcIjogMSwgXCJkYXRldGltZVwiOiAxfSxcbiAgICBcImRldGFpbHNcIjoge1wib3BlblwiOiAxfSxcbiAgICBcImRmblwiOiB7fSxcbiAgICBcImRpYWxvZ1wiOiB7XCJvcGVuXCI6IDF9LFxuICAgIFwiZGl2XCI6IHt9LFxuICAgIFwiZGxcIjoge30sXG4gICAgXCJkdFwiOiB7fSxcbiAgICBcImVtXCI6IHt9LFxuICAgIFwiZW1iZWRcIjoge1wic3JjXCI6IDEsIFwiaGVpZ2h0XCI6IDEsIFwid2lkdGhcIjogMSwgXCJ0eXBlXCI6IDF9LFxuICAgIFwiZmllbGRzZXRcIjoge1wiZGlzYWJsZWRcIjogMSwgXCJmb3JtXCI6IDEsIFwibmFtZVwiOiAxfSxcbiAgICBcImZpZ2NhcHRpb25cIjoge30sXG4gICAgXCJmaWd1cmVcIjoge30sXG4gICAgXCJmb290ZXJcIjoge30sXG4gICAgXCJmb3JtXCI6IHtcImFjY2VwdC1jaGFyc2V0XCI6IDEsIFwiYWN0aW9uXCI6IDEsIFwiYXV0b2NvbXBsZXRlXCI6IDEsIFwiZW5jdHlwZVwiOiB7XCJtdWx0aXBhcnQvZm9ybS1kYXRhXCI6IDEsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCI6IDF9LCBcIm1ldGhvZFwiOiB7XCJnZXRcIjogMSwgXCJwb3N0XCI6IDF9LCBcIm5hbWVcIjogMSwgXCJub3ZhbGlkYXRlXCI6IDEsIFwidGFyZ2V0XCI6IHtcIl9ibGFua1wiOiAxLCBcInRvcFwiOiAxfX0sXG4gICAgXCJoMVwiOiB7fSxcbiAgICBcImgyXCI6IHt9LFxuICAgIFwiaDNcIjoge30sXG4gICAgXCJoNFwiOiB7fSxcbiAgICBcImg1XCI6IHt9LFxuICAgIFwiaDZcIjoge30sXG4gICAgXCJoZWFkXCI6IHt9LFxuICAgIFwiaGVhZGVyXCI6IHt9LFxuICAgIFwiaHJcIjoge30sXG4gICAgXCJodG1sXCI6IHtcIm1hbmlmZXN0XCI6IDF9LFxuICAgIFwiaVwiOiB7fSxcbiAgICBcImlmcmFtZVwiOiB7XCJuYW1lXCI6IDEsIFwic3JjXCI6IDEsIFwiaGVpZ2h0XCI6IDEsIFwid2lkdGhcIjogMSwgXCJzYW5kYm94XCI6IHtcImFsbG93LXNhbWUtb3JpZ2luXCI6IDEsIFwiYWxsb3ctdG9wLW5hdmlnYXRpb25cIjogMSwgXCJhbGxvdy1mb3Jtc1wiOiAxLCBcImFsbG93LXNjcmlwdHNcIjogMX0sIFwic2VhbWxlc3NcIjoge1wic2VhbWxlc3NcIjogMX19LFxuICAgIFwiaW1nXCI6IHtcImFsdFwiOiAxLCBcInNyY1wiOiAxLCBcImhlaWdodFwiOiAxLCBcIndpZHRoXCI6IDEsIFwidXNlbWFwXCI6IDEsIFwiaXNtYXBcIjogMX0sXG4gICAgXCJpbnB1dFwiOiB7XG4gICAgICAgIFwidHlwZVwiOiB7XCJ0ZXh0XCI6IDEsIFwicGFzc3dvcmRcIjogMSwgXCJoaWRkZW5cIjogMSwgXCJjaGVja2JveFwiOiAxLCBcInN1Ym1pdFwiOiAxLCBcInJhZGlvXCI6IDEsIFwiZmlsZVwiOiAxLCBcImJ1dHRvblwiOiAxLCBcInJlc2V0XCI6IDEsIFwiaW1hZ2VcIjogMzEsIFwiY29sb3JcIjogMSwgXCJkYXRlXCI6IDEsIFwiZGF0ZXRpbWVcIjogMSwgXCJkYXRldGltZS1sb2NhbFwiOiAxLCBcImVtYWlsXCI6IDEsIFwibW9udGhcIjogMSwgXCJudW1iZXJcIjogMSwgXCJyYW5nZVwiOiAxLCBcInNlYXJjaFwiOiAxLCBcInRlbFwiOiAxLCBcInRpbWVcIjogMSwgXCJ1cmxcIjogMSwgXCJ3ZWVrXCI6IDF9LFxuICAgICAgICBcImFjY2VwdFwiOiAxLCBcImFsdFwiOiAxLCBcImF1dG9jb21wbGV0ZVwiOiB7XCJvblwiOiAxLCBcIm9mZlwiOiAxfSwgXCJhdXRvZm9jdXNcIjoge1wiYXV0b2ZvY3VzXCI6IDF9LCBcImNoZWNrZWRcIjoge1wiY2hlY2tlZFwiOiAxfSwgXCJkaXNhYmxlZFwiOiB7XCJkaXNhYmxlZFwiOiAxfSwgXCJmb3JtXCI6IDEsIFwiZm9ybWFjdGlvblwiOiAxLCBcImZvcm1lbmN0eXBlXCI6IHtcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiOiAxLCBcIm11bHRpcGFydC9mb3JtLWRhdGFcIjogMSwgXCJ0ZXh0L3BsYWluXCI6IDF9LCBcImZvcm1tZXRob2RcIjoge1wiZ2V0XCI6IDEsIFwicG9zdFwiOiAxfSwgXCJmb3Jtbm92YWxpZGF0ZVwiOiB7XCJmb3Jtbm92YWxpZGF0ZVwiOiAxfSwgXCJmb3JtdGFyZ2V0XCI6IHtcIl9ibGFua1wiOiAxLCBcIl9zZWxmXCI6IDEsIFwiX3BhcmVudFwiOiAxLCBcIl90b3BcIjogMX0sIFwiaGVpZ2h0XCI6IDEsIFwibGlzdFwiOiAxLCBcIm1heFwiOiAxLCBcIm1heGxlbmd0aFwiOiAxLCBcIm1pblwiOiAxLCBcIm11bHRpcGxlXCI6IHtcIm11bHRpcGxlXCI6IDF9LCBcIm5hbWVcIjogMSwgXCJwYXR0ZXJuXCI6IDEsIFwicGxhY2Vob2xkZXJcIjogMSwgXCJyZWFkb25seVwiOiB7XCJyZWFkb25seVwiOiAxfSwgXCJyZXF1aXJlZFwiOiB7XCJyZXF1aXJlZFwiOiAxfSwgXCJzaXplXCI6IDEsIFwic3JjXCI6IDEsIFwic3RlcFwiOiAxLCBcIndpZHRoXCI6IDEsIFwiZmlsZXNcIjogMSwgXCJ2YWx1ZVwiOiAxfSxcbiAgICBcImluc1wiOiB7XCJjaXRlXCI6IDEsIFwiZGF0ZXRpbWVcIjogMX0sXG4gICAgXCJrYmRcIjoge30sXG4gICAgXCJrZXlnZW5cIjoge1wiYXV0b2ZvY3VzXCI6IDEsIFwiY2hhbGxlbmdlXCI6IHtcImNoYWxsZW5nZVwiOiAxfSwgXCJkaXNhYmxlZFwiOiB7XCJkaXNhYmxlZFwiOiAxfSwgXCJmb3JtXCI6IDEsIFwia2V5dHlwZVwiOiB7XCJyc2FcIjogMSwgXCJkc2FcIjogMSwgXCJlY1wiOiAxfSwgXCJuYW1lXCI6IDF9LFxuICAgIFwibGFiZWxcIjoge1wiZm9ybVwiOiAxLCBcImZvclwiOiAxfSxcbiAgICBcImxlZ2VuZFwiOiB7fSxcbiAgICBcImxpXCI6IHtcInZhbHVlXCI6IDF9LFxuICAgIFwibGlua1wiOiB7XCJocmVmXCI6IDEsIFwiaHJlZmxhbmdcIjogMSwgXCJyZWxcIjoge1wic3R5bGVzaGVldFwiOiAxLCBcImljb25cIjogMX0sIFwibWVkaWFcIjoge1wiYWxsXCI6IDEsIFwic2NyZWVuXCI6IDEsIFwicHJpbnRcIjogMX0sIFwidHlwZVwiOiB7XCJ0ZXh0L2Nzc1wiOiAxLCBcImltYWdlL3BuZ1wiOiAxLCBcImltYWdlL2pwZWdcIjogMSwgXCJpbWFnZS9naWZcIjogMX0sIFwic2l6ZXNcIjogMX0sXG4gICAgXCJtYWluXCI6IHt9LFxuICAgIFwibWFwXCI6IHtcIm5hbWVcIjogMX0sXG4gICAgXCJtYXJrXCI6IHt9LFxuICAgIFwibWF0aFwiOiB7fSxcbiAgICBcIm1lbnVcIjoge1widHlwZVwiOiAxLCBcImxhYmVsXCI6IDF9LFxuICAgIFwibWV0YVwiOiB7XCJodHRwLWVxdWl2XCI6IHtcImNvbnRlbnQtdHlwZVwiOiAxfSwgXCJuYW1lXCI6IHtcImRlc2NyaXB0aW9uXCI6IDEsIFwia2V5d29yZHNcIjogMX0sIFwiY29udGVudFwiOiB7XCJ0ZXh0L2h0bWw7IGNoYXJzZXQ9VVRGLThcIjogMX0sIFwiY2hhcnNldFwiOiAxfSxcbiAgICBcIm1ldGVyXCI6IHtcInZhbHVlXCI6IDEsIFwibWluXCI6IDEsIFwibWF4XCI6IDEsIFwibG93XCI6IDEsIFwiaGlnaFwiOiAxLCBcIm9wdGltdW1cIjogMX0sXG4gICAgXCJuYXZcIjoge30sXG4gICAgXCJub3NjcmlwdFwiOiB7XCJocmVmXCI6IDF9LFxuICAgIFwib2JqZWN0XCI6IHtcInBhcmFtXCI6IDEsIFwiZGF0YVwiOiAxLCBcInR5cGVcIjogMSwgXCJoZWlnaHRcIiA6IDEsIFwid2lkdGhcIjogMSwgXCJ1c2VtYXBcIjogMSwgXCJuYW1lXCI6IDEsIFwiZm9ybVwiOiAxLCBcImNsYXNzaWRcIjogMX0sXG4gICAgXCJvbFwiOiB7XCJzdGFydFwiOiAxLCBcInJldmVyc2VkXCI6IDF9LFxuICAgIFwib3B0Z3JvdXBcIjoge1wiZGlzYWJsZWRcIjogMSwgXCJsYWJlbFwiOiAxfSxcbiAgICBcIm9wdGlvblwiOiB7XCJkaXNhYmxlZFwiOiAxLCBcInNlbGVjdGVkXCI6IDEsIFwibGFiZWxcIjogMSwgXCJ2YWx1ZVwiOiAxfSxcbiAgICBcIm91dHB1dFwiOiB7XCJmb3JcIjogMSwgXCJmb3JtXCI6IDEsIFwibmFtZVwiOiAxfSxcbiAgICBcInBcIjoge30sXG4gICAgXCJwYXJhbVwiOiB7XCJuYW1lXCI6IDEsIFwidmFsdWVcIjogMX0sXG4gICAgXCJwcmVcIjoge30sXG4gICAgXCJwcm9ncmVzc1wiOiB7XCJ2YWx1ZVwiOiAxLCBcIm1heFwiOiAxfSxcbiAgICBcInFcIjoge1wiY2l0ZVwiOiAxfSxcbiAgICBcInJwXCI6IHt9LFxuICAgIFwicnRcIjoge30sXG4gICAgXCJydWJ5XCI6IHt9LFxuICAgIFwic1wiOiB7fSxcbiAgICBcInNhbXBcIjoge30sXG4gICAgXCJzY3JpcHRcIjoge1wiY2hhcnNldFwiOiAxLCBcInR5cGVcIjoge1widGV4dC9qYXZhc2NyaXB0XCI6IDF9LCBcInNyY1wiOiAxLCBcImRlZmVyXCI6IDEsIFwiYXN5bmNcIjogMX0sXG4gICAgXCJzZWxlY3RcIjoge1wiYXV0b2ZvY3VzXCI6IDEsIFwiZGlzYWJsZWRcIjogMSwgXCJmb3JtXCI6IDEsIFwibXVsdGlwbGVcIjoge1wibXVsdGlwbGVcIjogMX0sIFwibmFtZVwiOiAxLCBcInNpemVcIjogMSwgXCJyZWFkb25seVwiOntcInJlYWRvbmx5XCI6IDF9fSxcbiAgICBcInNtYWxsXCI6IHt9LFxuICAgIFwic291cmNlXCI6IHtcInNyY1wiOiAxLCBcInR5cGVcIjogMSwgXCJtZWRpYVwiOiAxfSxcbiAgICBcInNwYW5cIjoge30sXG4gICAgXCJzdHJvbmdcIjoge30sXG4gICAgXCJzdHlsZVwiOiB7XCJ0eXBlXCI6IDEsIFwibWVkaWFcIjoge1wiYWxsXCI6IDEsIFwic2NyZWVuXCI6IDEsIFwicHJpbnRcIjogMX0sIFwic2NvcGVkXCI6IDF9LFxuICAgIFwic3ViXCI6IHt9LFxuICAgIFwic3VwXCI6IHt9LFxuICAgIFwic3ZnXCI6IHt9LFxuICAgIFwidGFibGVcIjoge1wic3VtbWFyeVwiOiAxfSxcbiAgICBcInRib2R5XCI6IHt9LFxuICAgIFwidGRcIjoge1wiaGVhZGVyc1wiOiAxLCBcInJvd3NwYW5cIjogMSwgXCJjb2xzcGFuXCI6IDF9LFxuICAgIFwidGV4dGFyZWFcIjoge1wiYXV0b2ZvY3VzXCI6IHtcImF1dG9mb2N1c1wiOiAxfSwgXCJkaXNhYmxlZFwiOiB7XCJkaXNhYmxlZFwiOiAxfSwgXCJmb3JtXCI6IDEsIFwibWF4bGVuZ3RoXCI6IDEsIFwibmFtZVwiOiAxLCBcInBsYWNlaG9sZGVyXCI6IDEsIFwicmVhZG9ubHlcIjoge1wicmVhZG9ubHlcIjogMX0sIFwicmVxdWlyZWRcIjoge1wicmVxdWlyZWRcIjogMX0sIFwicm93c1wiOiAxLCBcImNvbHNcIjogMSwgXCJ3cmFwXCI6IHtcIm9uXCI6IDEsIFwib2ZmXCI6IDEsIFwiaGFyZFwiOiAxLCBcInNvZnRcIjogMX19LFxuICAgIFwidGZvb3RcIjoge30sXG4gICAgXCJ0aFwiOiB7XCJoZWFkZXJzXCI6IDEsIFwicm93c3BhblwiOiAxLCBcImNvbHNwYW5cIjogMSwgXCJzY29wZVwiOiAxfSxcbiAgICBcInRoZWFkXCI6IHt9LFxuICAgIFwidGltZVwiOiB7XCJkYXRldGltZVwiOiAxfSxcbiAgICBcInRpdGxlXCI6IHt9LFxuICAgIFwidHJcIjoge30sXG4gICAgXCJ0cmFja1wiOiB7XCJraW5kXCI6IDEsIFwic3JjXCI6IDEsIFwic3JjbGFuZ1wiOiAxLCBcImxhYmVsXCI6IDEsIFwiZGVmYXVsdFwiOiAxfSxcbiAgICBcInNlY3Rpb25cIjoge30sXG4gICAgXCJzdW1tYXJ5XCI6IHt9LFxuICAgIFwidVwiOiB7fSxcbiAgICBcInVsXCI6IHt9LFxuICAgIFwidmFyXCI6IHt9LFxuICAgIFwidmlkZW9cIjoge1wic3JjXCI6IDEsIFwiYXV0b2J1ZmZlclwiOiAxLCBcImF1dG9wbGF5XCI6IHtcImF1dG9wbGF5XCI6IDF9LCBcImxvb3BcIjoge1wibG9vcFwiOiAxfSwgXCJjb250cm9sc1wiOiB7XCJjb250cm9sc1wiOiAxfSwgXCJ3aWR0aFwiOiAxLCBcImhlaWdodFwiOiAxLCBcInBvc3RlclwiOiAxLCBcIm11dGVkXCI6IHtcIm11dGVkXCI6IDF9LCBcInByZWxvYWRcIjoge1wiYXV0b1wiOiAxLCBcIm1ldGFkYXRhXCI6IDEsIFwibm9uZVwiOiAxfX0sXG4gICAgXCJ3YnJcIjoge31cbn07XG5cbnZhciBlbGVtZW50cyA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZU1hcCk7XG5cbmZ1bmN0aW9uIGlzKHRva2VuLCB0eXBlKSB7XG4gICAgcmV0dXJuIHRva2VuLnR5cGUubGFzdEluZGV4T2YodHlwZSArIFwiLnhtbFwiKSA+IC0xO1xufVxuXG5mdW5jdGlvbiBmaW5kVGFnTmFtZShzZXNzaW9uLCBwb3MpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCBwb3Mucm93LCBwb3MuY29sdW1uKTtcbiAgICB2YXIgdG9rZW4gPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW4oKTtcbiAgICB3aGlsZSAodG9rZW4gJiYgIWlzKHRva2VuLCBcInRhZy1uYW1lXCIpKXtcbiAgICAgICAgdG9rZW4gPSBpdGVyYXRvci5zdGVwQmFja3dhcmQoKTtcbiAgICB9XG4gICAgaWYgKHRva2VuKVxuICAgICAgICByZXR1cm4gdG9rZW4udmFsdWU7XG59XG5cbmZ1bmN0aW9uIGZpbmRBdHRyaWJ1dGVOYW1lKHNlc3Npb24sIHBvcykge1xuICAgIHZhciBpdGVyYXRvciA9IG5ldyBUb2tlbkl0ZXJhdG9yKHNlc3Npb24sIHBvcy5yb3csIHBvcy5jb2x1bW4pO1xuICAgIHZhciB0b2tlbiA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlbigpO1xuICAgIHdoaWxlICh0b2tlbiAmJiAhaXModG9rZW4sIFwiYXR0cmlidXRlLW5hbWVcIikpe1xuICAgICAgICB0b2tlbiA9IGl0ZXJhdG9yLnN0ZXBCYWNrd2FyZCgpO1xuICAgIH1cbiAgICBpZiAodG9rZW4pXG4gICAgICAgIHJldHVybiB0b2tlbi52YWx1ZTtcbn1cblxudmFyIEh0bWxDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKCkge1xuXG59O1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmdldENvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHZhciB0b2tlbiA9IHNlc3Npb24uZ2V0VG9rZW5BdChwb3Mucm93LCBwb3MuY29sdW1uKTtcblxuICAgICAgICBpZiAoIXRva2VuKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuXG4gICAgICAgIC8vIHRhZyBuYW1lXG4gICAgICAgIGlmIChpcyh0b2tlbiwgXCJ0YWctbmFtZVwiKSB8fCBpcyh0b2tlbiwgXCJ0YWctb3BlblwiKSB8fCBpcyh0b2tlbiwgXCJlbmQtdGFnLW9wZW5cIikpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUYWdDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuXG4gICAgICAgIC8vIHRhZyBhdHRyaWJ1dGVcbiAgICAgICAgaWYgKGlzKHRva2VuLCBcInRhZy13aGl0ZXNwYWNlXCIpIHx8IGlzKHRva2VuLCBcImF0dHJpYnV0ZS1uYW1lXCIpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlQ29tcGxldGlvbnMoc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KTtcbiAgICAgICAgICAgIFxuICAgICAgICAvLyB0YWcgYXR0cmlidXRlIHZhbHVlc1xuICAgICAgICBpZiAoaXModG9rZW4sIFwiYXR0cmlidXRlLXZhbHVlXCIpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlVmFsdWVDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuICAgICAgICAgICAgXG4gICAgICAgIC8vIEhUTUwgZW50aXRpZXNcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocG9zLnJvdykuc3Vic3RyKDAsIHBvcy5jb2x1bW4pO1xuICAgICAgICBpZiAoLyZbYS16XSokL2kudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEhUTUxFbnRpdHlDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuXG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRUYWdDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudHMubWFwKGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZWxlbWVudCxcbiAgICAgICAgICAgICAgICBtZXRhOiBcInRhZ1wiLFxuICAgICAgICAgICAgICAgIHNjb3JlOiAxMDAwMDAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRBdHRyaWJ1dGVDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICB2YXIgdGFnTmFtZSA9IGZpbmRUYWdOYW1lKHNlc3Npb24sIHBvcyk7XG4gICAgICAgIGlmICghdGFnTmFtZSlcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBnbG9iYWxBdHRyaWJ1dGVzO1xuICAgICAgICBpZiAodGFnTmFtZSBpbiBhdHRyaWJ1dGVNYXApIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzLmNvbmNhdChPYmplY3Qua2V5cyhhdHRyaWJ1dGVNYXBbdGFnTmFtZV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXR0cmlidXRlcy5tYXAoZnVuY3Rpb24oYXR0cmlidXRlKXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2FwdGlvbjogYXR0cmlidXRlLFxuICAgICAgICAgICAgICAgIHNuaXBwZXQ6IGF0dHJpYnV0ZSArICc9XCIkMFwiJyxcbiAgICAgICAgICAgICAgICBtZXRhOiBcImF0dHJpYnV0ZVwiLFxuICAgICAgICAgICAgICAgIHNjb3JlOiAxMDAwMDAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRBdHRyaWJ1dGVWYWx1ZUNvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHZhciB0YWdOYW1lID0gZmluZFRhZ05hbWUoc2Vzc2lvbiwgcG9zKTtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZU5hbWUgPSBmaW5kQXR0cmlidXRlTmFtZShzZXNzaW9uLCBwb3MpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCF0YWdOYW1lKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICAgIGlmICh0YWdOYW1lIGluIGF0dHJpYnV0ZU1hcCAmJiBhdHRyaWJ1dGVOYW1lIGluIGF0dHJpYnV0ZU1hcFt0YWdOYW1lXSAmJiB0eXBlb2YgYXR0cmlidXRlTWFwW3RhZ05hbWVdW2F0dHJpYnV0ZU5hbWVdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVNYXBbdGFnTmFtZV1bYXR0cmlidXRlTmFtZV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZXMubWFwKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdmFsdWUsXG4gICAgICAgICAgICAgICAgc25pcHBldDogdmFsdWUsXG4gICAgICAgICAgICAgICAgbWV0YTogXCJhdHRyaWJ1dGUgdmFsdWVcIixcbiAgICAgICAgICAgICAgICBzY29yZTogMTAwMDAwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0SFRNTEVudGl0eUNvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHZhciB2YWx1ZXMgPSBbJ0FhY3V0ZTsnLCAnYWFjdXRlOycsICdBY2lyYzsnLCAnYWNpcmM7JywgJ2FjdXRlOycsICdBRWxpZzsnLCAnYWVsaWc7JywgJ0FncmF2ZTsnLCAnYWdyYXZlOycsICdhbGVmc3ltOycsICdBbHBoYTsnLCAnYWxwaGE7JywgJ2FtcDsnLCAnYW5kOycsICdhbmc7JywgJ0FyaW5nOycsICdhcmluZzsnLCAnYXN5bXA7JywgJ0F0aWxkZTsnLCAnYXRpbGRlOycsICdBdW1sOycsICdhdW1sOycsICdiZHF1bzsnLCAnQmV0YTsnLCAnYmV0YTsnLCAnYnJ2YmFyOycsICdidWxsOycsICdjYXA7JywgJ0NjZWRpbDsnLCAnY2NlZGlsOycsICdjZWRpbDsnLCAnY2VudDsnLCAnQ2hpOycsICdjaGk7JywgJ2NpcmM7JywgJ2NsdWJzOycsICdjb25nOycsICdjb3B5OycsICdjcmFycjsnLCAnY3VwOycsICdjdXJyZW47JywgJ0RhZ2dlcjsnLCAnZGFnZ2VyOycsICdkQXJyOycsICdkYXJyOycsICdkZWc7JywgJ0RlbHRhOycsICdkZWx0YTsnLCAnZGlhbXM7JywgJ2RpdmlkZTsnLCAnRWFjdXRlOycsICdlYWN1dGU7JywgJ0VjaXJjOycsICdlY2lyYzsnLCAnRWdyYXZlOycsICdlZ3JhdmU7JywgJ2VtcHR5OycsICdlbXNwOycsICdlbnNwOycsICdFcHNpbG9uOycsICdlcHNpbG9uOycsICdlcXVpdjsnLCAnRXRhOycsICdldGE7JywgJ0VUSDsnLCAnZXRoOycsICdFdW1sOycsICdldW1sOycsICdldXJvOycsICdleGlzdDsnLCAnZm5vZjsnLCAnZm9yYWxsOycsICdmcmFjMTI7JywgJ2ZyYWMxNDsnLCAnZnJhYzM0OycsICdmcmFzbDsnLCAnR2FtbWE7JywgJ2dhbW1hOycsICdnZTsnLCAnZ3Q7JywgJ2hBcnI7JywgJ2hhcnI7JywgJ2hlYXJ0czsnLCAnaGVsbGlwOycsICdJYWN1dGU7JywgJ2lhY3V0ZTsnLCAnSWNpcmM7JywgJ2ljaXJjOycsICdpZXhjbDsnLCAnSWdyYXZlOycsICdpZ3JhdmU7JywgJ2ltYWdlOycsICdpbmZpbjsnLCAnaW50OycsICdJb3RhOycsICdpb3RhOycsICdpcXVlc3Q7JywgJ2lzaW47JywgJ0l1bWw7JywgJ2l1bWw7JywgJ0thcHBhOycsICdrYXBwYTsnLCAnTGFtYmRhOycsICdsYW1iZGE7JywgJ2xhbmc7JywgJ2xhcXVvOycsICdsQXJyOycsICdsYXJyOycsICdsY2VpbDsnLCAnbGRxdW87JywgJ2xlOycsICdsZmxvb3I7JywgJ2xvd2FzdDsnLCAnbG96OycsICdscm07JywgJ2xzYXF1bzsnLCAnbHNxdW87JywgJ2x0OycsICdtYWNyOycsICdtZGFzaDsnLCAnbWljcm87JywgJ21pZGRvdDsnLCAnbWludXM7JywgJ011OycsICdtdTsnLCAnbmFibGE7JywgJ25ic3A7JywgJ25kYXNoOycsICduZTsnLCAnbmk7JywgJ25vdDsnLCAnbm90aW47JywgJ25zdWI7JywgJ050aWxkZTsnLCAnbnRpbGRlOycsICdOdTsnLCAnbnU7JywgJ09hY3V0ZTsnLCAnb2FjdXRlOycsICdPY2lyYzsnLCAnb2NpcmM7JywgJ09FbGlnOycsICdvZWxpZzsnLCAnT2dyYXZlOycsICdvZ3JhdmU7JywgJ29saW5lOycsICdPbWVnYTsnLCAnb21lZ2E7JywgJ09taWNyb247JywgJ29taWNyb247JywgJ29wbHVzOycsICdvcjsnLCAnb3JkZjsnLCAnb3JkbTsnLCAnT3NsYXNoOycsICdvc2xhc2g7JywgJ090aWxkZTsnLCAnb3RpbGRlOycsICdvdGltZXM7JywgJ091bWw7JywgJ291bWw7JywgJ3BhcmE7JywgJ3BhcnQ7JywgJ3Blcm1pbDsnLCAncGVycDsnLCAnUGhpOycsICdwaGk7JywgJ1BpOycsICdwaTsnLCAncGl2OycsICdwbHVzbW47JywgJ3BvdW5kOycsICdQcmltZTsnLCAncHJpbWU7JywgJ3Byb2Q7JywgJ3Byb3A7JywgJ1BzaTsnLCAncHNpOycsICdxdW90OycsICdyYWRpYzsnLCAncmFuZzsnLCAncmFxdW87JywgJ3JBcnI7JywgJ3JhcnI7JywgJ3JjZWlsOycsICdyZHF1bzsnLCAncmVhbDsnLCAncmVnOycsICdyZmxvb3I7JywgJ1JobzsnLCAncmhvOycsICdybG07JywgJ3JzYXF1bzsnLCAncnNxdW87JywgJ3NicXVvOycsICdTY2Fyb247JywgJ3NjYXJvbjsnLCAnc2RvdDsnLCAnc2VjdDsnLCAnc2h5OycsICdTaWdtYTsnLCAnc2lnbWE7JywgJ3NpZ21hZjsnLCAnc2ltOycsICdzcGFkZXM7JywgJ3N1YjsnLCAnc3ViZTsnLCAnc3VtOycsICdzdXA7JywgJ3N1cDE7JywgJ3N1cDI7JywgJ3N1cDM7JywgJ3N1cGU7JywgJ3N6bGlnOycsICdUYXU7JywgJ3RhdTsnLCAndGhlcmU0OycsICdUaGV0YTsnLCAndGhldGE7JywgJ3RoZXRhc3ltOycsICd0aGluc3A7JywgJ1RIT1JOOycsICd0aG9ybjsnLCAndGlsZGU7JywgJ3RpbWVzOycsICd0cmFkZTsnLCAnVWFjdXRlOycsICd1YWN1dGU7JywgJ3VBcnI7JywgJ3VhcnI7JywgJ1VjaXJjOycsICd1Y2lyYzsnLCAnVWdyYXZlOycsICd1Z3JhdmU7JywgJ3VtbDsnLCAndXBzaWg7JywgJ1Vwc2lsb247JywgJ3Vwc2lsb247JywgJ1V1bWw7JywgJ3V1bWw7JywgJ3dlaWVycDsnLCAnWGk7JywgJ3hpOycsICdZYWN1dGU7JywgJ3lhY3V0ZTsnLCAneWVuOycsICdZdW1sOycsICd5dW1sOycsICdaZXRhOycsICd6ZXRhOycsICd6d2o7JywgJ3p3bmo7J107XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlcy5tYXAoZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBzbmlwcGV0OiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBtZXRhOiBcImh0bWwgZW50aXR5XCIsXG4gICAgICAgICAgICAgICAgc2NvcmU6IDEwMDAwMDBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG5cbn0pLmNhbGwoSHRtbENvbXBsZXRpb25zLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuSHRtbENvbXBsZXRpb25zID0gSHRtbENvbXBsZXRpb25zO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9