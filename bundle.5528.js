"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5528],{

/***/ 47853:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var Behaviour = (__webpack_require__(4708)/* .Behaviour */ .T);
var CstyleBehaviour = (__webpack_require__(19414)/* .CstyleBehaviour */ .B);
var TokenIterator = (__webpack_require__(39216)/* .TokenIterator */ .N);

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

exports.K = CssBehaviour;


/***/ }),

/***/ 98771:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var TextMode = (__webpack_require__(98030).Mode);
var CssHighlightRules = (__webpack_require__(99301).CssHighlightRules);
var MatchingBraceOutdent = (__webpack_require__(1164).MatchingBraceOutdent);
var WorkerClient = (__webpack_require__(91451).WorkerClient);
var CssCompletions = (__webpack_require__(37237)/* .CssCompletions */ .A);
var CssBehaviour = (__webpack_require__(47853)/* .CssBehaviour */ .K);
var CStyleFoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

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

/***/ 37237:
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

exports.A = CssCompletions;


/***/ }),

/***/ 74505:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var MixedFoldMode = (__webpack_require__(92974)/* .FoldMode */ .Z);
var XmlFoldMode = (__webpack_require__(64631)/* .FoldMode */ .Z);
var CStyleFoldMode = (__webpack_require__(12764)/* .FoldMode */ .Z);

var FoldMode = exports.Z = function(voidElements, optionalTags) {
    MixedFoldMode.call(this, new XmlFoldMode(voidElements, optionalTags), {
        "js-": new CStyleFoldMode(),
        "css-": new CStyleFoldMode()
    });
};

oop.inherits(FoldMode, MixedFoldMode);


/***/ }),

/***/ 75528:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(89359);
var lang = __webpack_require__(20124);
var TextMode = (__webpack_require__(98030).Mode);
var JavaScriptMode = (__webpack_require__(88057).Mode);
var CssMode = (__webpack_require__(98771).Mode);
var HtmlHighlightRules = (__webpack_require__(72843)/* .HtmlHighlightRules */ .V);
var XmlBehaviour = (__webpack_require__(67809)/* .XmlBehaviour */ .D);
var HtmlFoldMode = (__webpack_require__(74505)/* .FoldMode */ .Z);
var HtmlCompletions = (__webpack_require__(18439)/* .HtmlCompletions */ .A);
var WorkerClient = (__webpack_require__(91451).WorkerClient);

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

/***/ 18439:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var TokenIterator = (__webpack_require__(39216)/* .TokenIterator */ .N);

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

exports.A = HtmlCompletions;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBLDhCQUE4QixXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsWUFBWSxVQUFVLFVBQVUsUUFBUSxRQUFRLFFBQVEsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFNBQVMsU0FBUyxVQUFVLFNBQVMsU0FBUyxXQUFXLFNBQVMsUUFBUSxXQUFXLFdBQVcsVUFBVSxTQUFTLFFBQVEsUUFBUSxTQUFTLFVBQVUsU0FBUyxTQUFTLFVBQVUsUUFBUSxXQUFXLFdBQVcsV0FBVyxTQUFTLFNBQVMsUUFBUSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsU0FBUyxTQUFTLFlBQVksWUFBWSxVQUFVLFFBQVEsUUFBUSxRQUFRLFFBQVEsU0FBUyxTQUFTLFNBQVMsVUFBVSxTQUFTLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsT0FBTyxPQUFPLFNBQVMsU0FBUyxXQUFXLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxVQUFVLFVBQVUsUUFBUSxTQUFTLFNBQVMsV0FBVyxTQUFTLFNBQVMsU0FBUyxVQUFVLFVBQVUsV0FBVyxXQUFXLFNBQVMsVUFBVSxTQUFTLFNBQVMsVUFBVSxVQUFVLE9BQU8sV0FBVyxXQUFXLFFBQVEsUUFBUSxXQUFXLFVBQVUsT0FBTyxTQUFTLFVBQVUsVUFBVSxXQUFXLFVBQVUsT0FBTyxPQUFPLFVBQVUsU0FBUyxVQUFVLE9BQU8sT0FBTyxRQUFRLFVBQVUsU0FBUyxXQUFXLFdBQVcsT0FBTyxPQUFPLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxZQUFZLFlBQVksVUFBVSxPQUFPLFNBQVMsU0FBUyxXQUFXLFdBQVcsV0FBVyxXQUFXLFdBQVcsU0FBUyxTQUFTLFNBQVMsU0FBUyxXQUFXLFNBQVMsUUFBUSxRQUFRLE9BQU8sT0FBTyxRQUFRLFdBQVcsVUFBVSxVQUFVLFVBQVUsU0FBUyxTQUFTLFFBQVEsUUFBUSxTQUFTLFVBQVUsU0FBUyxVQUFVLFNBQVMsU0FBUyxVQUFVLFVBQVUsU0FBUyxRQUFRLFdBQVcsUUFBUSxRQUFRLFFBQVEsV0FBVyxVQUFVLFVBQVUsV0FBVyxXQUFXLFNBQVMsU0FBUyxRQUFRLFVBQVUsVUFBVSxXQUFXLFFBQVEsV0FBVyxRQUFRLFNBQVMsUUFBUSxRQUFRLFNBQVMsU0FBUyxTQUFTLFNBQVMsVUFBVSxRQUFRLFFBQVEsV0FBVyxVQUFVLFVBQVUsYUFBYSxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsU0FBUyxTQUFTLFVBQVUsVUFBVSxXQUFXLFdBQVcsUUFBUSxVQUFVLFlBQVksWUFBWSxTQUFTLFNBQVMsV0FBVyxPQUFPLE9BQU8sV0FBVyxXQUFXLFFBQVEsU0FBUyxTQUFTLFNBQVMsU0FBUyxRQUFRLFNBQVM7O0FBRTM0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQSxDQUFDOztBQUVELFNBQXVCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9iZWhhdmlvdXIvY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3NzX2NvbXBsZXRpb25zLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9odG1sLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvaHRtbC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2h0bWxfY29tcGxldGlvbnMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi4vYmVoYXZpb3VyXCIpLkJlaGF2aW91cjtcbnZhciBDc3R5bGVCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi9jc3R5bGVcIikuQ3N0eWxlQmVoYXZpb3VyO1xudmFyIFRva2VuSXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vLi4vdG9rZW5faXRlcmF0b3JcIikuVG9rZW5JdGVyYXRvcjtcblxudmFyIENzc0JlaGF2aW91ciA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuaW5oZXJpdChDc3R5bGVCZWhhdmlvdXIpO1xuXG4gICAgdGhpcy5hZGQoXCJjb2xvblwiLCBcImluc2VydGlvblwiLCBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbiwgZWRpdG9yLCBzZXNzaW9uLCB0ZXh0KSB7XG4gICAgICAgIGlmICh0ZXh0ID09PSAnOicgJiYgZWRpdG9yLnNlbGVjdGlvbi5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IG5ldyBUb2tlbkl0ZXJhdG9yKHNlc3Npb24sIGN1cnNvci5yb3csIGN1cnNvci5jb2x1bW4pO1xuICAgICAgICAgICAgdmFyIHRva2VuID0gaXRlcmF0b3IuZ2V0Q3VycmVudFRva2VuKCk7XG4gICAgICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4udmFsdWUubWF0Y2goL1xccysvKSkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4udHlwZSA9PT0gJ3N1cHBvcnQudHlwZScpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZG9jLmdldExpbmUoY3Vyc29yLnJvdyk7XG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0Q2hhciA9IGxpbmUuc3Vic3RyaW5nKGN1cnNvci5jb2x1bW4sIGN1cnNvci5jb2x1bW4gKyAxKTtcbiAgICAgICAgICAgICAgICBpZiAocmlnaHRDaGFyID09PSAnOicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogWzEsIDFdXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgvXihcXHMrW147XXxcXHMqJCkvLnRlc3QobGluZS5zdWJzdHJpbmcoY3Vyc29yLmNvbHVtbikpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICc6OycsXG4gICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogWzEsIDFdXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZChcImNvbG9uXCIsIFwiZGVsZXRpb25cIiwgZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24sIGVkaXRvciwgc2Vzc2lvbiwgcmFuZ2UpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkID0gc2Vzc2lvbi5kb2MuZ2V0VGV4dFJhbmdlKHJhbmdlKTtcbiAgICAgICAgaWYgKCFyYW5nZS5pc011bHRpTGluZSgpICYmIHNlbGVjdGVkID09PSAnOicpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IG5ldyBUb2tlbkl0ZXJhdG9yKHNlc3Npb24sIGN1cnNvci5yb3csIGN1cnNvci5jb2x1bW4pO1xuICAgICAgICAgICAgdmFyIHRva2VuID0gaXRlcmF0b3IuZ2V0Q3VycmVudFRva2VuKCk7XG4gICAgICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4udmFsdWUubWF0Y2goL1xccysvKSkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4udHlwZSA9PT0gJ3N1cHBvcnQudHlwZScpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZG9jLmdldExpbmUocmFuZ2Uuc3RhcnQucm93KTtcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRDaGFyID0gbGluZS5zdWJzdHJpbmcocmFuZ2UuZW5kLmNvbHVtbiwgcmFuZ2UuZW5kLmNvbHVtbiArIDEpO1xuICAgICAgICAgICAgICAgIGlmIChyaWdodENoYXIgPT09ICc7Jykge1xuICAgICAgICAgICAgICAgICAgICByYW5nZS5lbmQuY29sdW1uICsrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZChcInNlbWljb2xvblwiLCBcImluc2VydGlvblwiLCBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbiwgZWRpdG9yLCBzZXNzaW9uLCB0ZXh0KSB7XG4gICAgICAgIGlmICh0ZXh0ID09PSAnOycgJiYgZWRpdG9yLnNlbGVjdGlvbi5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5kb2MuZ2V0TGluZShjdXJzb3Iucm93KTtcbiAgICAgICAgICAgIHZhciByaWdodENoYXIgPSBsaW5lLnN1YnN0cmluZyhjdXJzb3IuY29sdW1uLCBjdXJzb3IuY29sdW1uICsgMSk7XG4gICAgICAgICAgICBpZiAocmlnaHRDaGFyID09PSAnOycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgIHRleHQ6ICcnLFxuICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogWzEsIDFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGQoXCIhaW1wb3J0YW50XCIsIFwiaW5zZXJ0aW9uXCIsIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uLCBlZGl0b3IsIHNlc3Npb24sIHRleHQpIHtcbiAgICAgICAgaWYgKHRleHQgPT09ICchJyAmJiBlZGl0b3Iuc2VsZWN0aW9uLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmRvYy5nZXRMaW5lKGN1cnNvci5yb3cpO1xuXG4gICAgICAgICAgICBpZiAoL15cXHMqKDt8fXwkKS8udGVzdChsaW5lLnN1YnN0cmluZyhjdXJzb3IuY29sdW1uKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnIWltcG9ydGFudCcsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogWzEwLCAxMF1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbn07XG5vb3AuaW5oZXJpdHMoQ3NzQmVoYXZpb3VyLCBDc3R5bGVCZWhhdmlvdXIpO1xuXG5leHBvcnRzLkNzc0JlaGF2aW91ciA9IENzc0JlaGF2aW91cjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgQ3NzSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9jc3NfaGlnaGxpZ2h0X3J1bGVzXCIpLkNzc0hpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBXb3JrZXJDbGllbnQgPSByZXF1aXJlKFwiLi4vd29ya2VyL3dvcmtlcl9jbGllbnRcIikuV29ya2VyQ2xpZW50O1xudmFyIENzc0NvbXBsZXRpb25zID0gcmVxdWlyZShcIi4vY3NzX2NvbXBsZXRpb25zXCIpLkNzc0NvbXBsZXRpb25zO1xudmFyIENzc0JlaGF2aW91ciA9IHJlcXVpcmUoXCIuL2JlaGF2aW91ci9jc3NcIikuQ3NzQmVoYXZpb3VyO1xudmFyIENTdHlsZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IENzc0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuJG91dGRlbnQgPSBuZXcgTWF0Y2hpbmdCcmFjZU91dGRlbnQoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSBuZXcgQ3NzQmVoYXZpb3VyKCk7XG4gICAgdGhpcy4kY29tcGxldGVyID0gbmV3IENzc0NvbXBsZXRpb25zKCk7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgQ1N0eWxlRm9sZE1vZGUoKTtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IFwiY1N0eWxlXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiLypcIiwgZW5kOiBcIiovXCJ9O1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgICAgICAvLyBpZ25vcmUgYnJhY2VzIGluIGNvbW1lbnRzXG4gICAgICAgIHZhciB0b2tlbnMgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpLnRva2VucztcbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKlxce1xccyokLyk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgaW5kZW50ICs9IHRhYjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgfTtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRvdXRkZW50LmNoZWNrT3V0ZGVudChsaW5lLCBpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgZG9jLCByb3cpIHtcbiAgICAgICAgdGhpcy4kb3V0ZGVudC5hdXRvT3V0ZGVudChkb2MsIHJvdyk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Q29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNvbXBsZXRlci5nZXRDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuICAgIH07XG5cbiAgICB0aGlzLmNyZWF0ZVdvcmtlciA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXJDbGllbnQoW1wiYWNlXCJdLCBcImFjZS9tb2RlL2Nzc193b3JrZXJcIiwgXCJXb3JrZXJcIik7XG4gICAgICAgIHdvcmtlci5hdHRhY2hUb0RvY3VtZW50KHNlc3Npb24uZ2V0RG9jdW1lbnQoKSk7XG5cbiAgICAgICAgd29ya2VyLm9uKFwiYW5ub3RhdGVcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgc2Vzc2lvbi5zZXRBbm5vdGF0aW9ucyhlLmRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3b3JrZXIub24oXCJ0ZXJtaW5hdGVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXNzaW9uLmNsZWFyQW5ub3RhdGlvbnMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHdvcmtlcjtcbiAgICB9O1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2Nzc1wiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL2Nzc1wiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHByb3BlcnR5TWFwID0ge1xuICAgIFwiYmFja2dyb3VuZFwiOiB7XCIjJDBcIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IHtcIiMkMFwiOiAxLCBcInRyYW5zcGFyZW50XCI6IDEsIFwiZml4ZWRcIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLWltYWdlXCI6IHtcInVybCgnLyQwJylcIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLXJlcGVhdFwiOiB7XCJyZXBlYXRcIjogMSwgXCJyZXBlYXQteFwiOiAxLCBcInJlcGVhdC15XCI6IDEsIFwibm8tcmVwZWF0XCI6IDEsIFwiaW5oZXJpdFwiOiAxfSxcbiAgICBcImJhY2tncm91bmQtcG9zaXRpb25cIjoge1wiYm90dG9tXCI6MiwgXCJjZW50ZXJcIjoyLCBcImxlZnRcIjoyLCBcInJpZ2h0XCI6MiwgXCJ0b3BcIjoyLCBcImluaGVyaXRcIjoyfSxcbiAgICBcImJhY2tncm91bmQtYXR0YWNobWVudFwiOiB7XCJzY3JvbGxcIjogMSwgXCJmaXhlZFwiOiAxfSxcbiAgICBcImJhY2tncm91bmQtc2l6ZVwiOiB7XCJjb3ZlclwiOiAxLCBcImNvbnRhaW5cIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLWNsaXBcIjoge1wiYm9yZGVyLWJveFwiOiAxLCBcInBhZGRpbmctYm94XCI6IDEsIFwiY29udGVudC1ib3hcIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLW9yaWdpblwiOiB7XCJib3JkZXItYm94XCI6IDEsIFwicGFkZGluZy1ib3hcIjogMSwgXCJjb250ZW50LWJveFwiOiAxfSxcbiAgICBcImJvcmRlclwiOiB7XCJzb2xpZCAkMFwiOiAxLCBcImRhc2hlZCAkMFwiOiAxLCBcImRvdHRlZCAkMFwiOiAxLCBcIiMkMFwiOiAxfSxcbiAgICBcImJvcmRlci1jb2xvclwiOiB7XCIjJDBcIjogMX0sXG4gICAgXCJib3JkZXItc3R5bGVcIjoge1wic29saWRcIjoyLCBcImRhc2hlZFwiOjIsIFwiZG90dGVkXCI6MiwgXCJkb3VibGVcIjoyLCBcImdyb292ZVwiOjIsIFwiaGlkZGVuXCI6MiwgXCJpbmhlcml0XCI6MiwgXCJpbnNldFwiOjIsIFwibm9uZVwiOjIsIFwib3V0c2V0XCI6MiwgXCJyaWRnZWRcIjoyfSxcbiAgICBcImJvcmRlci1jb2xsYXBzZVwiOiB7XCJjb2xsYXBzZVwiOiAxLCBcInNlcGFyYXRlXCI6IDF9LFxuICAgIFwiYm90dG9tXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwiY2xlYXJcIjoge1wibGVmdFwiOiAxLCBcInJpZ2h0XCI6IDEsIFwiYm90aFwiOiAxLCBcIm5vbmVcIjogMX0sXG4gICAgXCJjb2xvclwiOiB7XCIjJDBcIjogMSwgXCJyZ2IoIyQwMCwwLDApXCI6IDF9LFxuICAgIFwiY3Vyc29yXCI6IHtcImRlZmF1bHRcIjogMSwgXCJwb2ludGVyXCI6IDEsIFwibW92ZVwiOiAxLCBcInRleHRcIjogMSwgXCJ3YWl0XCI6IDEsIFwiaGVscFwiOiAxLCBcInByb2dyZXNzXCI6IDEsIFwibi1yZXNpemVcIjogMSwgXCJuZS1yZXNpemVcIjogMSwgXCJlLXJlc2l6ZVwiOiAxLCBcInNlLXJlc2l6ZVwiOiAxLCBcInMtcmVzaXplXCI6IDEsIFwic3ctcmVzaXplXCI6IDEsIFwidy1yZXNpemVcIjogMSwgXCJudy1yZXNpemVcIjogMX0sXG4gICAgXCJkaXNwbGF5XCI6IHtcIm5vbmVcIjogMSwgXCJibG9ja1wiOiAxLCBcImlubGluZVwiOiAxLCBcImlubGluZS1ibG9ja1wiOiAxLCBcInRhYmxlLWNlbGxcIjogMX0sXG4gICAgXCJlbXB0eS1jZWxsc1wiOiB7XCJzaG93XCI6IDEsIFwiaGlkZVwiOiAxfSxcbiAgICBcImZsb2F0XCI6IHtcImxlZnRcIjogMSwgXCJyaWdodFwiOiAxLCBcIm5vbmVcIjogMX0sXG4gICAgXCJmb250LWZhbWlseVwiOiB7XCJBcmlhbFwiOjIsXCJDb21pYyBTYW5zIE1TXCI6MixcIkNvbnNvbGFzXCI6MixcIkNvdXJpZXIgTmV3XCI6MixcIkNvdXJpZXJcIjoyLFwiR2VvcmdpYVwiOjIsXCJNb25vc3BhY2VcIjoyLFwiU2Fucy1TZXJpZlwiOjIsIFwiU2Vnb2UgVUlcIjoyLFwiVGFob21hXCI6MixcIlRpbWVzIE5ldyBSb21hblwiOjIsXCJUcmVidWNoZXQgTVNcIjoyLFwiVmVyZGFuYVwiOiAxfSxcbiAgICBcImZvbnQtc2l6ZVwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcImZvbnQtd2VpZ2h0XCI6IHtcImJvbGRcIjogMSwgXCJub3JtYWxcIjogMX0sXG4gICAgXCJmb250LXN0eWxlXCI6IHtcIml0YWxpY1wiOiAxLCBcIm5vcm1hbFwiOiAxfSxcbiAgICBcImZvbnQtdmFyaWFudFwiOiB7XCJub3JtYWxcIjogMSwgXCJzbWFsbC1jYXBzXCI6IDF9LFxuICAgIFwiaGVpZ2h0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibGVmdFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcImxldHRlci1zcGFjaW5nXCI6IHtcIm5vcm1hbFwiOiAxfSxcbiAgICBcImxpbmUtaGVpZ2h0XCI6IHtcIm5vcm1hbFwiOiAxfSxcbiAgICBcImxpc3Qtc3R5bGUtdHlwZVwiOiB7XCJub25lXCI6IDEsIFwiZGlzY1wiOiAxLCBcImNpcmNsZVwiOiAxLCBcInNxdWFyZVwiOiAxLCBcImRlY2ltYWxcIjogMSwgXCJkZWNpbWFsLWxlYWRpbmctemVyb1wiOiAxLCBcImxvd2VyLXJvbWFuXCI6IDEsIFwidXBwZXItcm9tYW5cIjogMSwgXCJsb3dlci1ncmVla1wiOiAxLCBcImxvd2VyLWxhdGluXCI6IDEsIFwidXBwZXItbGF0aW5cIjogMSwgXCJnZW9yZ2lhblwiOiAxLCBcImxvd2VyLWFscGhhXCI6IDEsIFwidXBwZXItYWxwaGFcIjogMX0sXG4gICAgXCJtYXJnaW5cIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtYXJnaW4tcmlnaHRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtYXJnaW4tbGVmdFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1hcmdpbi10b3BcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtYXJnaW4tYm90dG9tXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibWF4LWhlaWdodFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1heC13aWR0aFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1pbi1oZWlnaHRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtaW4td2lkdGhcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJvdmVyZmxvd1wiOiB7XCJoaWRkZW5cIjogMSwgXCJ2aXNpYmxlXCI6IDEsIFwiYXV0b1wiOiAxLCBcInNjcm9sbFwiOiAxfSxcbiAgICBcIm92ZXJmbG93LXhcIjoge1wiaGlkZGVuXCI6IDEsIFwidmlzaWJsZVwiOiAxLCBcImF1dG9cIjogMSwgXCJzY3JvbGxcIjogMX0sXG4gICAgXCJvdmVyZmxvdy15XCI6IHtcImhpZGRlblwiOiAxLCBcInZpc2libGVcIjogMSwgXCJhdXRvXCI6IDEsIFwic2Nyb2xsXCI6IDF9LFxuICAgIFwicGFkZGluZ1wiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcInBhZGRpbmctdG9wXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwicGFkZGluZy1yaWdodFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcInBhZGRpbmctYm90dG9tXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwicGFkZGluZy1sZWZ0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwicGFnZS1icmVhay1hZnRlclwiOiB7XCJhdXRvXCI6IDEsIFwiYWx3YXlzXCI6IDEsIFwiYXZvaWRcIjogMSwgXCJsZWZ0XCI6IDEsIFwicmlnaHRcIjogMX0sXG4gICAgXCJwYWdlLWJyZWFrLWJlZm9yZVwiOiB7XCJhdXRvXCI6IDEsIFwiYWx3YXlzXCI6IDEsIFwiYXZvaWRcIjogMSwgXCJsZWZ0XCI6IDEsIFwicmlnaHRcIjogMX0sXG4gICAgXCJwb3NpdGlvblwiOiB7XCJhYnNvbHV0ZVwiOiAxLCBcInJlbGF0aXZlXCI6IDEsIFwiZml4ZWRcIjogMSwgXCJzdGF0aWNcIjogMX0sXG4gICAgXCJyaWdodFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcInRhYmxlLWxheW91dFwiOiB7XCJmaXhlZFwiOiAxLCBcImF1dG9cIjogMX0sXG4gICAgXCJ0ZXh0LWRlY29yYXRpb25cIjoge1wibm9uZVwiOiAxLCBcInVuZGVybGluZVwiOiAxLCBcImxpbmUtdGhyb3VnaFwiOiAxLCBcImJsaW5rXCI6IDF9LFxuICAgIFwidGV4dC1hbGlnblwiOiB7XCJsZWZ0XCI6IDEsIFwicmlnaHRcIjogMSwgXCJjZW50ZXJcIjogMSwgXCJqdXN0aWZ5XCI6IDF9LFxuICAgIFwidGV4dC10cmFuc2Zvcm1cIjoge1wiY2FwaXRhbGl6ZVwiOiAxLCBcInVwcGVyY2FzZVwiOiAxLCBcImxvd2VyY2FzZVwiOiAxLCBcIm5vbmVcIjogMX0sXG4gICAgXCJ0b3BcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJ2ZXJ0aWNhbC1hbGlnblwiOiB7XCJ0b3BcIjogMSwgXCJib3R0b21cIjogMX0sXG4gICAgXCJ2aXNpYmlsaXR5XCI6IHtcImhpZGRlblwiOiAxLCBcInZpc2libGVcIjogMX0sXG4gICAgXCJ3aGl0ZS1zcGFjZVwiOiB7XCJub3dyYXBcIjogMSwgXCJub3JtYWxcIjogMSwgXCJwcmVcIjogMSwgXCJwcmUtbGluZVwiOiAxLCBcInByZS13cmFwXCI6IDF9LFxuICAgIFwid2lkdGhcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJ3b3JkLXNwYWNpbmdcIjoge1wibm9ybWFsXCI6IDF9LFxuXG4gICAgLy8gb3BhY2l0eVxuICAgIFwiZmlsdGVyXCI6IHtcImFscGhhKG9wYWNpdHk9JDAxMDApXCI6IDF9LFxuXG4gICAgXCJ0ZXh0LXNoYWRvd1wiOiB7XCIkMDJweCAycHggMnB4ICM3NzdcIjogMX0sXG4gICAgXCJ0ZXh0LW92ZXJmbG93XCI6IHtcImVsbGlwc2lzLXdvcmRcIjogMSwgXCJjbGlwXCI6IDEsIFwiZWxsaXBzaXNcIjogMX0sXG5cbiAgICAvLyBib3JkZXIgcmFkaXVzXG4gICAgXCItbW96LWJvcmRlci1yYWRpdXNcIjogMSxcbiAgICBcIi1tb3otYm9yZGVyLXJhZGl1cy10b3ByaWdodFwiOiAxLFxuICAgIFwiLW1vei1ib3JkZXItcmFkaXVzLWJvdHRvbXJpZ2h0XCI6IDEsXG4gICAgXCItbW96LWJvcmRlci1yYWRpdXMtdG9wbGVmdFwiOiAxLFxuICAgIFwiLW1vei1ib3JkZXItcmFkaXVzLWJvdHRvbWxlZnRcIjogMSxcbiAgICBcIi13ZWJraXQtYm9yZGVyLXJhZGl1c1wiOiAxLFxuICAgIFwiLXdlYmtpdC1ib3JkZXItdG9wLXJpZ2h0LXJhZGl1c1wiOiAxLFxuICAgIFwiLXdlYmtpdC1ib3JkZXItdG9wLWxlZnQtcmFkaXVzXCI6IDEsXG4gICAgXCItd2Via2l0LWJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzXCI6IDEsXG4gICAgXCItd2Via2l0LWJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXNcIjogMSxcblxuICAgIC8vIGRyb3BzaGFkb3dzXG4gICAgXCItbW96LWJveC1zaGFkb3dcIjogMSxcbiAgICBcIi13ZWJraXQtYm94LXNoYWRvd1wiOiAxLFxuXG4gICAgLy8gdHJhbnNmb3JtYXRpb25zXG4gICAgXCJ0cmFuc2Zvcm1cIjoge1wicm90YXRlKCQwMGRlZylcIjogMSwgXCJza2V3KCQwMGRlZylcIjogMX0sXG4gICAgXCItbW96LXRyYW5zZm9ybVwiOiB7XCJyb3RhdGUoJDAwZGVnKVwiOiAxLCBcInNrZXcoJDAwZGVnKVwiOiAxfSxcbiAgICBcIi13ZWJraXQtdHJhbnNmb3JtXCI6IHtcInJvdGF0ZSgkMDBkZWcpXCI6IDEsIFwic2tldygkMDBkZWcpXCI6IDEgfVxufTtcblxudmFyIENzc0NvbXBsZXRpb25zID0gZnVuY3Rpb24oKSB7XG5cbn07XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY29tcGxldGlvbnNEZWZpbmVkID0gZmFsc2U7XG5cbiAgICB0aGlzLmRlZmluZUNvbXBsZXRpb25zID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vZmlsbCBpbiBtaXNzaW5nIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKGRvY3VtZW50KSB7XG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjJykuc3R5bGU7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gc3R5bGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0eWxlW2ldICE9PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGkucmVwbGFjZSgvW0EtWl0vZywgZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJy0nICsgeC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wZXJ0eU1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlNYXBbbmFtZV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21wbGV0aW9uc0RlZmluZWQgPSB0cnVlO1xuICAgIH07XG5cbiAgICB0aGlzLmdldENvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIGlmICghdGhpcy5jb21wbGV0aW9uc0RlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lQ29tcGxldGlvbnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZT09PSdydWxlc2V0JyB8fCBzZXNzaW9uLiRtb2RlLiRpZCA9PSBcImFjZS9tb2RlL3Njc3NcIikge1xuICAgICAgICAgICAgLy9jc3MgYXR0cmlidXRlIHZhbHVlXG4gICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShwb3Mucm93KS5zdWJzdHIoMCwgcG9zLmNvbHVtbik7XG4gICAgICAgICAgICB2YXIgaW5QYXJlbnMgPSAvXFwoW14pXSokLy50ZXN0KGxpbmUpO1xuICAgICAgICAgICAgaWYgKGluUGFyZW5zKSB7XG4gICAgICAgICAgICAgICAgbGluZSA9IGxpbmUuc3Vic3RyKGxpbmUubGFzdEluZGV4T2YoJygnKSArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKC86W147XSskLy50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAgICAgLyhbXFx3XFwtXSspOlteOl0qJC8udGVzdChsaW5lKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5VmFsdWVDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eUNvbXBsZXRpb25zKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCwgaW5QYXJlbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH07XG5cbiAgICB0aGlzLmdldFByb3BlcnR5Q29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgsIHNraXBTZW1pY29sb24pIHtcbiAgICAgICAgc2tpcFNlbWljb2xvbiA9IHNraXBTZW1pY29sb24gfHwgZmFsc2U7XG4gICAgICAgIHZhciBwcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMocHJvcGVydHlNYXApO1xuICAgICAgICByZXR1cm4gcHJvcGVydGllcy5tYXAoZnVuY3Rpb24ocHJvcGVydHkpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICBzbmlwcGV0OiBwcm9wZXJ0eSArICc6ICQwJyArIChza2lwU2VtaWNvbG9uID8gJycgOiAnOycpLFxuICAgICAgICAgICAgICAgIG1ldGE6IFwicHJvcGVydHlcIixcbiAgICAgICAgICAgICAgICBzY29yZTogMTAwMDAwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0UHJvcGVydHlWYWx1ZUNvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHBvcy5yb3cpLnN1YnN0cigwLCBwb3MuY29sdW1uKTtcbiAgICAgICAgdmFyIHByb3BlcnR5ID0gKC8oW1xcd1xcLV0rKTpbXjpdKiQvLmV4ZWMobGluZSkgfHwge30pWzFdO1xuXG4gICAgICAgIGlmICghcHJvcGVydHkpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgICAgaWYgKHByb3BlcnR5IGluIHByb3BlcnR5TWFwICYmIHR5cGVvZiBwcm9wZXJ0eU1hcFtwcm9wZXJ0eV0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IE9iamVjdC5rZXlzKHByb3BlcnR5TWFwW3Byb3BlcnR5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlcy5tYXAoZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBzbmlwcGV0OiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBtZXRhOiBcInByb3BlcnR5IHZhbHVlXCIsXG4gICAgICAgICAgICAgICAgc2NvcmU6IDEwMDAwMDBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG5cbn0pLmNhbGwoQ3NzQ29tcGxldGlvbnMucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Dc3NDb21wbGV0aW9ucyA9IENzc0NvbXBsZXRpb25zO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBNaXhlZEZvbGRNb2RlID0gcmVxdWlyZShcIi4vbWl4ZWRcIikuRm9sZE1vZGU7XG52YXIgWG1sRm9sZE1vZGUgPSByZXF1aXJlKFwiLi94bWxcIikuRm9sZE1vZGU7XG52YXIgQ1N0eWxlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbih2b2lkRWxlbWVudHMsIG9wdGlvbmFsVGFncykge1xuICAgIE1peGVkRm9sZE1vZGUuY2FsbCh0aGlzLCBuZXcgWG1sRm9sZE1vZGUodm9pZEVsZW1lbnRzLCBvcHRpb25hbFRhZ3MpLCB7XG4gICAgICAgIFwianMtXCI6IG5ldyBDU3R5bGVGb2xkTW9kZSgpLFxuICAgICAgICBcImNzcy1cIjogbmV3IENTdHlsZUZvbGRNb2RlKClcbiAgICB9KTtcbn07XG5cbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgTWl4ZWRGb2xkTW9kZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgSmF2YVNjcmlwdE1vZGUgPSByZXF1aXJlKFwiLi9qYXZhc2NyaXB0XCIpLk1vZGU7XG52YXIgQ3NzTW9kZSA9IHJlcXVpcmUoXCIuL2Nzc1wiKS5Nb2RlO1xudmFyIEh0bWxIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL2h0bWxfaGlnaGxpZ2h0X3J1bGVzXCIpLkh0bWxIaWdobGlnaHRSdWxlcztcbnZhciBYbWxCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi9iZWhhdmlvdXIveG1sXCIpLlhtbEJlaGF2aW91cjtcbnZhciBIdG1sRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2h0bWxcIikuRm9sZE1vZGU7XG52YXIgSHRtbENvbXBsZXRpb25zID0gcmVxdWlyZShcIi4vaHRtbF9jb21wbGV0aW9uc1wiKS5IdG1sQ29tcGxldGlvbnM7XG52YXIgV29ya2VyQ2xpZW50ID0gcmVxdWlyZShcIi4uL3dvcmtlci93b3JrZXJfY2xpZW50XCIpLldvcmtlckNsaWVudDtcblxuLy8gaHR0cDovL3d3dy53My5vcmcvVFIvaHRtbDUvc3ludGF4Lmh0bWwjdm9pZC1lbGVtZW50c1xudmFyIHZvaWRFbGVtZW50cyA9IFtcImFyZWFcIiwgXCJiYXNlXCIsIFwiYnJcIiwgXCJjb2xcIiwgXCJlbWJlZFwiLCBcImhyXCIsIFwiaW1nXCIsIFwiaW5wdXRcIiwgXCJrZXlnZW5cIiwgXCJsaW5rXCIsIFwibWV0YVwiLCBcIm1lbnVpdGVtXCIsIFwicGFyYW1cIiwgXCJzb3VyY2VcIiwgXCJ0cmFja1wiLCBcIndiclwiXTtcbnZhciBvcHRpb25hbEVuZFRhZ3MgPSBbXCJsaVwiLCBcImR0XCIsIFwiZGRcIiwgXCJwXCIsIFwicnRcIiwgXCJycFwiLCBcIm9wdGdyb3VwXCIsIFwib3B0aW9uXCIsIFwiY29sZ3JvdXBcIiwgXCJ0ZFwiLCBcInRoXCJdO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB0aGlzLmZyYWdtZW50Q29udGV4dCA9IG9wdGlvbnMgJiYgb3B0aW9ucy5mcmFnbWVudENvbnRleHQ7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IEh0bWxIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSBuZXcgWG1sQmVoYXZpb3VyKCk7XG4gICAgdGhpcy4kY29tcGxldGVyID0gbmV3IEh0bWxDb21wbGV0aW9ucygpO1xuICAgIFxuICAgIHRoaXMuY3JlYXRlTW9kZURlbGVnYXRlcyh7XG4gICAgICAgIFwianMtXCI6IEphdmFTY3JpcHRNb2RlLFxuICAgICAgICBcImNzcy1cIjogQ3NzTW9kZVxuICAgIH0pO1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IEh0bWxGb2xkTW9kZSh0aGlzLnZvaWRFbGVtZW50cywgbGFuZy5hcnJheVRvTWFwKG9wdGlvbmFsRW5kVGFncykpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIjwhLS1cIiwgZW5kOiBcIi0tPlwifTtcblxuICAgIHRoaXMudm9pZEVsZW1lbnRzID0gbGFuZy5hcnJheVRvTWFwKHZvaWRFbGVtZW50cyk7XG5cbiAgICB0aGlzLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYikge1xuICAgICAgICByZXR1cm4gdGhpcy4kZ2V0SW5kZW50KGxpbmUpO1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Q29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNvbXBsZXRlci5nZXRDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuICAgIH07XG5cbiAgICB0aGlzLmNyZWF0ZVdvcmtlciA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgaWYgKHRoaXMuY29uc3RydWN0b3IgIT0gTW9kZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXJDbGllbnQoW1wiYWNlXCJdLCBcImFjZS9tb2RlL2h0bWxfd29ya2VyXCIsIFwiV29ya2VyXCIpO1xuICAgICAgICB3b3JrZXIuYXR0YWNoVG9Eb2N1bWVudChzZXNzaW9uLmdldERvY3VtZW50KCkpO1xuXG4gICAgICAgIGlmICh0aGlzLmZyYWdtZW50Q29udGV4dClcbiAgICAgICAgICAgIHdvcmtlci5jYWxsKFwic2V0T3B0aW9uc1wiLCBbe2NvbnRleHQ6IHRoaXMuZnJhZ21lbnRDb250ZXh0fV0pO1xuXG4gICAgICAgIHdvcmtlci5vbihcImVycm9yXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHNlc3Npb24uc2V0QW5ub3RhdGlvbnMoZS5kYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya2VyLm9uKFwidGVybWluYXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2Vzc2lvbi5jbGVhckFubm90YXRpb25zKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB3b3JrZXI7XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9odG1sXCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvaHRtbFwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFRva2VuSXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vdG9rZW5faXRlcmF0b3JcIikuVG9rZW5JdGVyYXRvcjtcblxudmFyIGNvbW1vbkF0dHJpYnV0ZXMgPSBbXG4gICAgXCJhY2Nlc3NrZXlcIixcbiAgICBcImNsYXNzXCIsXG4gICAgXCJjb250ZW50ZWRpdGFibGVcIixcbiAgICBcImNvbnRleHRtZW51XCIsXG4gICAgXCJkaXJcIixcbiAgICBcImRyYWdnYWJsZVwiLFxuICAgIFwiZHJvcHpvbmVcIixcbiAgICBcImhpZGRlblwiLFxuICAgIFwiaWRcIixcbiAgICBcImluZXJ0XCIsXG4gICAgXCJpdGVtaWRcIixcbiAgICBcIml0ZW1wcm9wXCIsXG4gICAgXCJpdGVtcmVmXCIsXG4gICAgXCJpdGVtc2NvcGVcIixcbiAgICBcIml0ZW10eXBlXCIsXG4gICAgXCJsYW5nXCIsXG4gICAgXCJzcGVsbGNoZWNrXCIsXG4gICAgXCJzdHlsZVwiLFxuICAgIFwidGFiaW5kZXhcIixcbiAgICBcInRpdGxlXCIsXG4gICAgXCJ0cmFuc2xhdGVcIlxuXTtcblxudmFyIGV2ZW50QXR0cmlidXRlcyA9IFtcbiAgICBcIm9uYWJvcnRcIixcbiAgICBcIm9uYmx1clwiLFxuICAgIFwib25jYW5jZWxcIixcbiAgICBcIm9uY2FucGxheVwiLFxuICAgIFwib25jYW5wbGF5dGhyb3VnaFwiLFxuICAgIFwib25jaGFuZ2VcIixcbiAgICBcIm9uY2xpY2tcIixcbiAgICBcIm9uY2xvc2VcIixcbiAgICBcIm9uY29udGV4dG1lbnVcIixcbiAgICBcIm9uY3VlY2hhbmdlXCIsXG4gICAgXCJvbmRibGNsaWNrXCIsXG4gICAgXCJvbmRyYWdcIixcbiAgICBcIm9uZHJhZ2VuZFwiLFxuICAgIFwib25kcmFnZW50ZXJcIixcbiAgICBcIm9uZHJhZ2xlYXZlXCIsXG4gICAgXCJvbmRyYWdvdmVyXCIsXG4gICAgXCJvbmRyYWdzdGFydFwiLFxuICAgIFwib25kcm9wXCIsXG4gICAgXCJvbmR1cmF0aW9uY2hhbmdlXCIsXG4gICAgXCJvbmVtcHRpZWRcIixcbiAgICBcIm9uZW5kZWRcIixcbiAgICBcIm9uZXJyb3JcIixcbiAgICBcIm9uZm9jdXNcIixcbiAgICBcIm9uaW5wdXRcIixcbiAgICBcIm9uaW52YWxpZFwiLFxuICAgIFwib25rZXlkb3duXCIsXG4gICAgXCJvbmtleXByZXNzXCIsXG4gICAgXCJvbmtleXVwXCIsXG4gICAgXCJvbmxvYWRcIixcbiAgICBcIm9ubG9hZGVkZGF0YVwiLFxuICAgIFwib25sb2FkZWRtZXRhZGF0YVwiLFxuICAgIFwib25sb2Fkc3RhcnRcIixcbiAgICBcIm9ubW91c2Vkb3duXCIsXG4gICAgXCJvbm1vdXNlbW92ZVwiLFxuICAgIFwib25tb3VzZW91dFwiLFxuICAgIFwib25tb3VzZW92ZXJcIixcbiAgICBcIm9ubW91c2V1cFwiLFxuICAgIFwib25tb3VzZXdoZWVsXCIsXG4gICAgXCJvbnBhdXNlXCIsXG4gICAgXCJvbnBsYXlcIixcbiAgICBcIm9ucGxheWluZ1wiLFxuICAgIFwib25wcm9ncmVzc1wiLFxuICAgIFwib25yYXRlY2hhbmdlXCIsXG4gICAgXCJvbnJlc2V0XCIsXG4gICAgXCJvbnNjcm9sbFwiLFxuICAgIFwib25zZWVrZWRcIixcbiAgICBcIm9uc2Vla2luZ1wiLFxuICAgIFwib25zZWxlY3RcIixcbiAgICBcIm9uc2hvd1wiLFxuICAgIFwib25zdGFsbGVkXCIsXG4gICAgXCJvbnN1Ym1pdFwiLFxuICAgIFwib25zdXNwZW5kXCIsXG4gICAgXCJvbnRpbWV1cGRhdGVcIixcbiAgICBcIm9udm9sdW1lY2hhbmdlXCIsXG4gICAgXCJvbndhaXRpbmdcIlxuXTtcblxudmFyIGdsb2JhbEF0dHJpYnV0ZXMgPSBjb21tb25BdHRyaWJ1dGVzLmNvbmNhdChldmVudEF0dHJpYnV0ZXMpO1xuXG52YXIgYXR0cmlidXRlTWFwID0ge1xuICAgIFwiYVwiOiB7XCJocmVmXCI6IDEsIFwidGFyZ2V0XCI6IHtcIl9ibGFua1wiOiAxLCBcInRvcFwiOiAxfSwgXCJwaW5nXCI6IDEsIFwicmVsXCI6IHtcIm5vZm9sbG93XCI6IDEsIFwiYWx0ZXJuYXRlXCI6IDEsIFwiYXV0aG9yXCI6IDEsIFwiYm9va21hcmtcIjogMSwgXCJoZWxwXCI6IDEsIFwibGljZW5zZVwiOiAxLCBcIm5leHRcIjogMSwgXCJub3JlZmVycmVyXCI6IDEsIFwicHJlZmV0Y2hcIjogMSwgXCJwcmV2XCI6IDEsIFwic2VhcmNoXCI6IDEsIFwidGFnXCI6IDF9LCBcIm1lZGlhXCI6IDEsIFwiaHJlZmxhbmdcIjogMSwgXCJ0eXBlXCI6IDF9LFxuICAgIFwiYWJiclwiOiB7fSxcbiAgICBcImFkZHJlc3NcIjoge30sXG4gICAgXCJhcmVhXCI6IHtcInNoYXBlXCI6IDEsIFwiY29vcmRzXCI6IDEsIFwiaHJlZlwiOiAxLCBcImhyZWZsYW5nXCI6IDEsIFwiYWx0XCI6IDEsIFwidGFyZ2V0XCI6IDEsIFwibWVkaWFcIjogMSwgXCJyZWxcIjogMSwgXCJwaW5nXCI6IDEsIFwidHlwZVwiOiAxfSxcbiAgICBcImFydGljbGVcIjoge1wicHViZGF0ZVwiOiAxfSxcbiAgICBcImFzaWRlXCI6IHt9LFxuICAgIFwiYXVkaW9cIjoge1wic3JjXCI6IDEsIFwiYXV0b2J1ZmZlclwiOiAxLCBcImF1dG9wbGF5XCI6IHtcImF1dG9wbGF5XCI6IDF9LCBcImxvb3BcIjoge1wibG9vcFwiOiAxfSwgXCJjb250cm9sc1wiOiB7XCJjb250cm9sc1wiOiAxfSwgXCJtdXRlZFwiOiB7XCJtdXRlZFwiOiAxfSwgXCJwcmVsb2FkXCI6IHtcImF1dG9cIjogMSwgXCJtZXRhZGF0YVwiOiAxLCBcIm5vbmVcIjogMSB9fSxcbiAgICBcImJcIjoge30sXG4gICAgXCJiYXNlXCI6IHtcImhyZWZcIjogMSwgXCJ0YXJnZXRcIjogMX0sXG4gICAgXCJiZGlcIjoge30sXG4gICAgXCJiZG9cIjoge30sXG4gICAgXCJibG9ja3F1b3RlXCI6IHtcImNpdGVcIjogMX0sXG4gICAgXCJib2R5XCI6IHtcIm9uYWZ0ZXJwcmludFwiOiAxLCBcIm9uYmVmb3JlcHJpbnRcIjogMSwgXCJvbmJlZm9yZXVubG9hZFwiOiAxLCBcIm9uaGFzaGNoYW5nZVwiOiAxLCBcIm9ubWVzc2FnZVwiOiAxLCBcIm9ub2ZmbGluZVwiOiAxLCBcIm9ucG9wc3RhdGVcIjogMSwgXCJvbnJlZG9cIjogMSwgXCJvbnJlc2l6ZVwiOiAxLCBcIm9uc3RvcmFnZVwiOiAxLCBcIm9udW5kb1wiOiAxLCBcIm9udW5sb2FkXCI6IDF9LFxuICAgIFwiYnJcIjoge30sXG4gICAgXCJidXR0b25cIjoge1wiYXV0b2ZvY3VzXCI6IDEsIFwiZGlzYWJsZWRcIjoge1wiZGlzYWJsZWRcIjogMX0sIFwiZm9ybVwiOiAxLCBcImZvcm1hY3Rpb25cIjogMSwgXCJmb3JtZW5jdHlwZVwiOiAxLCBcImZvcm1tZXRob2RcIjogMSwgXCJmb3Jtbm92YWxpZGF0ZVwiOiAxLCBcImZvcm10YXJnZXRcIjogMSwgXCJuYW1lXCI6IDEsIFwidmFsdWVcIjogMSwgXCJ0eXBlXCI6IHtcImJ1dHRvblwiOiAxLCBcInN1Ym1pdFwiOiAxfX0sXG4gICAgXCJjYW52YXNcIjoge1wid2lkdGhcIjogMSwgXCJoZWlnaHRcIjogMX0sXG4gICAgXCJjYXB0aW9uXCI6IHt9LFxuICAgIFwiY2l0ZVwiOiB7fSxcbiAgICBcImNvZGVcIjoge30sXG4gICAgXCJjb2xcIjoge1wic3BhblwiOiAxfSxcbiAgICBcImNvbGdyb3VwXCI6IHtcInNwYW5cIjogMX0sXG4gICAgXCJjb21tYW5kXCI6IHtcInR5cGVcIjogMSwgXCJsYWJlbFwiOiAxLCBcImljb25cIjogMSwgXCJkaXNhYmxlZFwiOiAxLCBcImNoZWNrZWRcIjogMSwgXCJyYWRpb2dyb3VwXCI6IDEsIFwiY29tbWFuZFwiOiAxfSxcbiAgICBcImRhdGFcIjoge30sXG4gICAgXCJkYXRhbGlzdFwiOiB7fSxcbiAgICBcImRkXCI6IHt9LFxuICAgIFwiZGVsXCI6IHtcImNpdGVcIjogMSwgXCJkYXRldGltZVwiOiAxfSxcbiAgICBcImRldGFpbHNcIjoge1wib3BlblwiOiAxfSxcbiAgICBcImRmblwiOiB7fSxcbiAgICBcImRpYWxvZ1wiOiB7XCJvcGVuXCI6IDF9LFxuICAgIFwiZGl2XCI6IHt9LFxuICAgIFwiZGxcIjoge30sXG4gICAgXCJkdFwiOiB7fSxcbiAgICBcImVtXCI6IHt9LFxuICAgIFwiZW1iZWRcIjoge1wic3JjXCI6IDEsIFwiaGVpZ2h0XCI6IDEsIFwid2lkdGhcIjogMSwgXCJ0eXBlXCI6IDF9LFxuICAgIFwiZmllbGRzZXRcIjoge1wiZGlzYWJsZWRcIjogMSwgXCJmb3JtXCI6IDEsIFwibmFtZVwiOiAxfSxcbiAgICBcImZpZ2NhcHRpb25cIjoge30sXG4gICAgXCJmaWd1cmVcIjoge30sXG4gICAgXCJmb290ZXJcIjoge30sXG4gICAgXCJmb3JtXCI6IHtcImFjY2VwdC1jaGFyc2V0XCI6IDEsIFwiYWN0aW9uXCI6IDEsIFwiYXV0b2NvbXBsZXRlXCI6IDEsIFwiZW5jdHlwZVwiOiB7XCJtdWx0aXBhcnQvZm9ybS1kYXRhXCI6IDEsIFwiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCI6IDF9LCBcIm1ldGhvZFwiOiB7XCJnZXRcIjogMSwgXCJwb3N0XCI6IDF9LCBcIm5hbWVcIjogMSwgXCJub3ZhbGlkYXRlXCI6IDEsIFwidGFyZ2V0XCI6IHtcIl9ibGFua1wiOiAxLCBcInRvcFwiOiAxfX0sXG4gICAgXCJoMVwiOiB7fSxcbiAgICBcImgyXCI6IHt9LFxuICAgIFwiaDNcIjoge30sXG4gICAgXCJoNFwiOiB7fSxcbiAgICBcImg1XCI6IHt9LFxuICAgIFwiaDZcIjoge30sXG4gICAgXCJoZWFkXCI6IHt9LFxuICAgIFwiaGVhZGVyXCI6IHt9LFxuICAgIFwiaHJcIjoge30sXG4gICAgXCJodG1sXCI6IHtcIm1hbmlmZXN0XCI6IDF9LFxuICAgIFwiaVwiOiB7fSxcbiAgICBcImlmcmFtZVwiOiB7XCJuYW1lXCI6IDEsIFwic3JjXCI6IDEsIFwiaGVpZ2h0XCI6IDEsIFwid2lkdGhcIjogMSwgXCJzYW5kYm94XCI6IHtcImFsbG93LXNhbWUtb3JpZ2luXCI6IDEsIFwiYWxsb3ctdG9wLW5hdmlnYXRpb25cIjogMSwgXCJhbGxvdy1mb3Jtc1wiOiAxLCBcImFsbG93LXNjcmlwdHNcIjogMX0sIFwic2VhbWxlc3NcIjoge1wic2VhbWxlc3NcIjogMX19LFxuICAgIFwiaW1nXCI6IHtcImFsdFwiOiAxLCBcInNyY1wiOiAxLCBcImhlaWdodFwiOiAxLCBcIndpZHRoXCI6IDEsIFwidXNlbWFwXCI6IDEsIFwiaXNtYXBcIjogMX0sXG4gICAgXCJpbnB1dFwiOiB7XG4gICAgICAgIFwidHlwZVwiOiB7XCJ0ZXh0XCI6IDEsIFwicGFzc3dvcmRcIjogMSwgXCJoaWRkZW5cIjogMSwgXCJjaGVja2JveFwiOiAxLCBcInN1Ym1pdFwiOiAxLCBcInJhZGlvXCI6IDEsIFwiZmlsZVwiOiAxLCBcImJ1dHRvblwiOiAxLCBcInJlc2V0XCI6IDEsIFwiaW1hZ2VcIjogMzEsIFwiY29sb3JcIjogMSwgXCJkYXRlXCI6IDEsIFwiZGF0ZXRpbWVcIjogMSwgXCJkYXRldGltZS1sb2NhbFwiOiAxLCBcImVtYWlsXCI6IDEsIFwibW9udGhcIjogMSwgXCJudW1iZXJcIjogMSwgXCJyYW5nZVwiOiAxLCBcInNlYXJjaFwiOiAxLCBcInRlbFwiOiAxLCBcInRpbWVcIjogMSwgXCJ1cmxcIjogMSwgXCJ3ZWVrXCI6IDF9LFxuICAgICAgICBcImFjY2VwdFwiOiAxLCBcImFsdFwiOiAxLCBcImF1dG9jb21wbGV0ZVwiOiB7XCJvblwiOiAxLCBcIm9mZlwiOiAxfSwgXCJhdXRvZm9jdXNcIjoge1wiYXV0b2ZvY3VzXCI6IDF9LCBcImNoZWNrZWRcIjoge1wiY2hlY2tlZFwiOiAxfSwgXCJkaXNhYmxlZFwiOiB7XCJkaXNhYmxlZFwiOiAxfSwgXCJmb3JtXCI6IDEsIFwiZm9ybWFjdGlvblwiOiAxLCBcImZvcm1lbmN0eXBlXCI6IHtcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiOiAxLCBcIm11bHRpcGFydC9mb3JtLWRhdGFcIjogMSwgXCJ0ZXh0L3BsYWluXCI6IDF9LCBcImZvcm1tZXRob2RcIjoge1wiZ2V0XCI6IDEsIFwicG9zdFwiOiAxfSwgXCJmb3Jtbm92YWxpZGF0ZVwiOiB7XCJmb3Jtbm92YWxpZGF0ZVwiOiAxfSwgXCJmb3JtdGFyZ2V0XCI6IHtcIl9ibGFua1wiOiAxLCBcIl9zZWxmXCI6IDEsIFwiX3BhcmVudFwiOiAxLCBcIl90b3BcIjogMX0sIFwiaGVpZ2h0XCI6IDEsIFwibGlzdFwiOiAxLCBcIm1heFwiOiAxLCBcIm1heGxlbmd0aFwiOiAxLCBcIm1pblwiOiAxLCBcIm11bHRpcGxlXCI6IHtcIm11bHRpcGxlXCI6IDF9LCBcIm5hbWVcIjogMSwgXCJwYXR0ZXJuXCI6IDEsIFwicGxhY2Vob2xkZXJcIjogMSwgXCJyZWFkb25seVwiOiB7XCJyZWFkb25seVwiOiAxfSwgXCJyZXF1aXJlZFwiOiB7XCJyZXF1aXJlZFwiOiAxfSwgXCJzaXplXCI6IDEsIFwic3JjXCI6IDEsIFwic3RlcFwiOiAxLCBcIndpZHRoXCI6IDEsIFwiZmlsZXNcIjogMSwgXCJ2YWx1ZVwiOiAxfSxcbiAgICBcImluc1wiOiB7XCJjaXRlXCI6IDEsIFwiZGF0ZXRpbWVcIjogMX0sXG4gICAgXCJrYmRcIjoge30sXG4gICAgXCJrZXlnZW5cIjoge1wiYXV0b2ZvY3VzXCI6IDEsIFwiY2hhbGxlbmdlXCI6IHtcImNoYWxsZW5nZVwiOiAxfSwgXCJkaXNhYmxlZFwiOiB7XCJkaXNhYmxlZFwiOiAxfSwgXCJmb3JtXCI6IDEsIFwia2V5dHlwZVwiOiB7XCJyc2FcIjogMSwgXCJkc2FcIjogMSwgXCJlY1wiOiAxfSwgXCJuYW1lXCI6IDF9LFxuICAgIFwibGFiZWxcIjoge1wiZm9ybVwiOiAxLCBcImZvclwiOiAxfSxcbiAgICBcImxlZ2VuZFwiOiB7fSxcbiAgICBcImxpXCI6IHtcInZhbHVlXCI6IDF9LFxuICAgIFwibGlua1wiOiB7XCJocmVmXCI6IDEsIFwiaHJlZmxhbmdcIjogMSwgXCJyZWxcIjoge1wic3R5bGVzaGVldFwiOiAxLCBcImljb25cIjogMX0sIFwibWVkaWFcIjoge1wiYWxsXCI6IDEsIFwic2NyZWVuXCI6IDEsIFwicHJpbnRcIjogMX0sIFwidHlwZVwiOiB7XCJ0ZXh0L2Nzc1wiOiAxLCBcImltYWdlL3BuZ1wiOiAxLCBcImltYWdlL2pwZWdcIjogMSwgXCJpbWFnZS9naWZcIjogMX0sIFwic2l6ZXNcIjogMX0sXG4gICAgXCJtYWluXCI6IHt9LFxuICAgIFwibWFwXCI6IHtcIm5hbWVcIjogMX0sXG4gICAgXCJtYXJrXCI6IHt9LFxuICAgIFwibWF0aFwiOiB7fSxcbiAgICBcIm1lbnVcIjoge1widHlwZVwiOiAxLCBcImxhYmVsXCI6IDF9LFxuICAgIFwibWV0YVwiOiB7XCJodHRwLWVxdWl2XCI6IHtcImNvbnRlbnQtdHlwZVwiOiAxfSwgXCJuYW1lXCI6IHtcImRlc2NyaXB0aW9uXCI6IDEsIFwia2V5d29yZHNcIjogMX0sIFwiY29udGVudFwiOiB7XCJ0ZXh0L2h0bWw7IGNoYXJzZXQ9VVRGLThcIjogMX0sIFwiY2hhcnNldFwiOiAxfSxcbiAgICBcIm1ldGVyXCI6IHtcInZhbHVlXCI6IDEsIFwibWluXCI6IDEsIFwibWF4XCI6IDEsIFwibG93XCI6IDEsIFwiaGlnaFwiOiAxLCBcIm9wdGltdW1cIjogMX0sXG4gICAgXCJuYXZcIjoge30sXG4gICAgXCJub3NjcmlwdFwiOiB7XCJocmVmXCI6IDF9LFxuICAgIFwib2JqZWN0XCI6IHtcInBhcmFtXCI6IDEsIFwiZGF0YVwiOiAxLCBcInR5cGVcIjogMSwgXCJoZWlnaHRcIiA6IDEsIFwid2lkdGhcIjogMSwgXCJ1c2VtYXBcIjogMSwgXCJuYW1lXCI6IDEsIFwiZm9ybVwiOiAxLCBcImNsYXNzaWRcIjogMX0sXG4gICAgXCJvbFwiOiB7XCJzdGFydFwiOiAxLCBcInJldmVyc2VkXCI6IDF9LFxuICAgIFwib3B0Z3JvdXBcIjoge1wiZGlzYWJsZWRcIjogMSwgXCJsYWJlbFwiOiAxfSxcbiAgICBcIm9wdGlvblwiOiB7XCJkaXNhYmxlZFwiOiAxLCBcInNlbGVjdGVkXCI6IDEsIFwibGFiZWxcIjogMSwgXCJ2YWx1ZVwiOiAxfSxcbiAgICBcIm91dHB1dFwiOiB7XCJmb3JcIjogMSwgXCJmb3JtXCI6IDEsIFwibmFtZVwiOiAxfSxcbiAgICBcInBcIjoge30sXG4gICAgXCJwYXJhbVwiOiB7XCJuYW1lXCI6IDEsIFwidmFsdWVcIjogMX0sXG4gICAgXCJwcmVcIjoge30sXG4gICAgXCJwcm9ncmVzc1wiOiB7XCJ2YWx1ZVwiOiAxLCBcIm1heFwiOiAxfSxcbiAgICBcInFcIjoge1wiY2l0ZVwiOiAxfSxcbiAgICBcInJwXCI6IHt9LFxuICAgIFwicnRcIjoge30sXG4gICAgXCJydWJ5XCI6IHt9LFxuICAgIFwic1wiOiB7fSxcbiAgICBcInNhbXBcIjoge30sXG4gICAgXCJzY3JpcHRcIjoge1wiY2hhcnNldFwiOiAxLCBcInR5cGVcIjoge1widGV4dC9qYXZhc2NyaXB0XCI6IDF9LCBcInNyY1wiOiAxLCBcImRlZmVyXCI6IDEsIFwiYXN5bmNcIjogMX0sXG4gICAgXCJzZWxlY3RcIjoge1wiYXV0b2ZvY3VzXCI6IDEsIFwiZGlzYWJsZWRcIjogMSwgXCJmb3JtXCI6IDEsIFwibXVsdGlwbGVcIjoge1wibXVsdGlwbGVcIjogMX0sIFwibmFtZVwiOiAxLCBcInNpemVcIjogMSwgXCJyZWFkb25seVwiOntcInJlYWRvbmx5XCI6IDF9fSxcbiAgICBcInNtYWxsXCI6IHt9LFxuICAgIFwic291cmNlXCI6IHtcInNyY1wiOiAxLCBcInR5cGVcIjogMSwgXCJtZWRpYVwiOiAxfSxcbiAgICBcInNwYW5cIjoge30sXG4gICAgXCJzdHJvbmdcIjoge30sXG4gICAgXCJzdHlsZVwiOiB7XCJ0eXBlXCI6IDEsIFwibWVkaWFcIjoge1wiYWxsXCI6IDEsIFwic2NyZWVuXCI6IDEsIFwicHJpbnRcIjogMX0sIFwic2NvcGVkXCI6IDF9LFxuICAgIFwic3ViXCI6IHt9LFxuICAgIFwic3VwXCI6IHt9LFxuICAgIFwic3ZnXCI6IHt9LFxuICAgIFwidGFibGVcIjoge1wic3VtbWFyeVwiOiAxfSxcbiAgICBcInRib2R5XCI6IHt9LFxuICAgIFwidGRcIjoge1wiaGVhZGVyc1wiOiAxLCBcInJvd3NwYW5cIjogMSwgXCJjb2xzcGFuXCI6IDF9LFxuICAgIFwidGV4dGFyZWFcIjoge1wiYXV0b2ZvY3VzXCI6IHtcImF1dG9mb2N1c1wiOiAxfSwgXCJkaXNhYmxlZFwiOiB7XCJkaXNhYmxlZFwiOiAxfSwgXCJmb3JtXCI6IDEsIFwibWF4bGVuZ3RoXCI6IDEsIFwibmFtZVwiOiAxLCBcInBsYWNlaG9sZGVyXCI6IDEsIFwicmVhZG9ubHlcIjoge1wicmVhZG9ubHlcIjogMX0sIFwicmVxdWlyZWRcIjoge1wicmVxdWlyZWRcIjogMX0sIFwicm93c1wiOiAxLCBcImNvbHNcIjogMSwgXCJ3cmFwXCI6IHtcIm9uXCI6IDEsIFwib2ZmXCI6IDEsIFwiaGFyZFwiOiAxLCBcInNvZnRcIjogMX19LFxuICAgIFwidGZvb3RcIjoge30sXG4gICAgXCJ0aFwiOiB7XCJoZWFkZXJzXCI6IDEsIFwicm93c3BhblwiOiAxLCBcImNvbHNwYW5cIjogMSwgXCJzY29wZVwiOiAxfSxcbiAgICBcInRoZWFkXCI6IHt9LFxuICAgIFwidGltZVwiOiB7XCJkYXRldGltZVwiOiAxfSxcbiAgICBcInRpdGxlXCI6IHt9LFxuICAgIFwidHJcIjoge30sXG4gICAgXCJ0cmFja1wiOiB7XCJraW5kXCI6IDEsIFwic3JjXCI6IDEsIFwic3JjbGFuZ1wiOiAxLCBcImxhYmVsXCI6IDEsIFwiZGVmYXVsdFwiOiAxfSxcbiAgICBcInNlY3Rpb25cIjoge30sXG4gICAgXCJzdW1tYXJ5XCI6IHt9LFxuICAgIFwidVwiOiB7fSxcbiAgICBcInVsXCI6IHt9LFxuICAgIFwidmFyXCI6IHt9LFxuICAgIFwidmlkZW9cIjoge1wic3JjXCI6IDEsIFwiYXV0b2J1ZmZlclwiOiAxLCBcImF1dG9wbGF5XCI6IHtcImF1dG9wbGF5XCI6IDF9LCBcImxvb3BcIjoge1wibG9vcFwiOiAxfSwgXCJjb250cm9sc1wiOiB7XCJjb250cm9sc1wiOiAxfSwgXCJ3aWR0aFwiOiAxLCBcImhlaWdodFwiOiAxLCBcInBvc3RlclwiOiAxLCBcIm11dGVkXCI6IHtcIm11dGVkXCI6IDF9LCBcInByZWxvYWRcIjoge1wiYXV0b1wiOiAxLCBcIm1ldGFkYXRhXCI6IDEsIFwibm9uZVwiOiAxfX0sXG4gICAgXCJ3YnJcIjoge31cbn07XG5cbnZhciBlbGVtZW50cyA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZU1hcCk7XG5cbmZ1bmN0aW9uIGlzKHRva2VuLCB0eXBlKSB7XG4gICAgcmV0dXJuIHRva2VuLnR5cGUubGFzdEluZGV4T2YodHlwZSArIFwiLnhtbFwiKSA+IC0xO1xufVxuXG5mdW5jdGlvbiBmaW5kVGFnTmFtZShzZXNzaW9uLCBwb3MpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCBwb3Mucm93LCBwb3MuY29sdW1uKTtcbiAgICB2YXIgdG9rZW4gPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW4oKTtcbiAgICB3aGlsZSAodG9rZW4gJiYgIWlzKHRva2VuLCBcInRhZy1uYW1lXCIpKXtcbiAgICAgICAgdG9rZW4gPSBpdGVyYXRvci5zdGVwQmFja3dhcmQoKTtcbiAgICB9XG4gICAgaWYgKHRva2VuKVxuICAgICAgICByZXR1cm4gdG9rZW4udmFsdWU7XG59XG5cbmZ1bmN0aW9uIGZpbmRBdHRyaWJ1dGVOYW1lKHNlc3Npb24sIHBvcykge1xuICAgIHZhciBpdGVyYXRvciA9IG5ldyBUb2tlbkl0ZXJhdG9yKHNlc3Npb24sIHBvcy5yb3csIHBvcy5jb2x1bW4pO1xuICAgIHZhciB0b2tlbiA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlbigpO1xuICAgIHdoaWxlICh0b2tlbiAmJiAhaXModG9rZW4sIFwiYXR0cmlidXRlLW5hbWVcIikpe1xuICAgICAgICB0b2tlbiA9IGl0ZXJhdG9yLnN0ZXBCYWNrd2FyZCgpO1xuICAgIH1cbiAgICBpZiAodG9rZW4pXG4gICAgICAgIHJldHVybiB0b2tlbi52YWx1ZTtcbn1cblxudmFyIEh0bWxDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKCkge1xuXG59O1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmdldENvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHZhciB0b2tlbiA9IHNlc3Npb24uZ2V0VG9rZW5BdChwb3Mucm93LCBwb3MuY29sdW1uKTtcblxuICAgICAgICBpZiAoIXRva2VuKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuXG4gICAgICAgIC8vIHRhZyBuYW1lXG4gICAgICAgIGlmIChpcyh0b2tlbiwgXCJ0YWctbmFtZVwiKSB8fCBpcyh0b2tlbiwgXCJ0YWctb3BlblwiKSB8fCBpcyh0b2tlbiwgXCJlbmQtdGFnLW9wZW5cIikpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRUYWdDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuXG4gICAgICAgIC8vIHRhZyBhdHRyaWJ1dGVcbiAgICAgICAgaWYgKGlzKHRva2VuLCBcInRhZy13aGl0ZXNwYWNlXCIpIHx8IGlzKHRva2VuLCBcImF0dHJpYnV0ZS1uYW1lXCIpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlQ29tcGxldGlvbnMoc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KTtcbiAgICAgICAgICAgIFxuICAgICAgICAvLyB0YWcgYXR0cmlidXRlIHZhbHVlc1xuICAgICAgICBpZiAoaXModG9rZW4sIFwiYXR0cmlidXRlLXZhbHVlXCIpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0QXR0cmlidXRlVmFsdWVDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuICAgICAgICAgICAgXG4gICAgICAgIC8vIEhUTUwgZW50aXRpZXNcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocG9zLnJvdykuc3Vic3RyKDAsIHBvcy5jb2x1bW4pO1xuICAgICAgICBpZiAoLyZbYS16XSokL2kudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEhUTUxFbnRpdHlDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuXG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRUYWdDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICByZXR1cm4gZWxlbWVudHMubWFwKGZ1bmN0aW9uKGVsZW1lbnQpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogZWxlbWVudCxcbiAgICAgICAgICAgICAgICBtZXRhOiBcInRhZ1wiLFxuICAgICAgICAgICAgICAgIHNjb3JlOiAxMDAwMDAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRBdHRyaWJ1dGVDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICB2YXIgdGFnTmFtZSA9IGZpbmRUYWdOYW1lKHNlc3Npb24sIHBvcyk7XG4gICAgICAgIGlmICghdGFnTmFtZSlcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBnbG9iYWxBdHRyaWJ1dGVzO1xuICAgICAgICBpZiAodGFnTmFtZSBpbiBhdHRyaWJ1dGVNYXApIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzLmNvbmNhdChPYmplY3Qua2V5cyhhdHRyaWJ1dGVNYXBbdGFnTmFtZV0pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYXR0cmlidXRlcy5tYXAoZnVuY3Rpb24oYXR0cmlidXRlKXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2FwdGlvbjogYXR0cmlidXRlLFxuICAgICAgICAgICAgICAgIHNuaXBwZXQ6IGF0dHJpYnV0ZSArICc9XCIkMFwiJyxcbiAgICAgICAgICAgICAgICBtZXRhOiBcImF0dHJpYnV0ZVwiLFxuICAgICAgICAgICAgICAgIHNjb3JlOiAxMDAwMDAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRBdHRyaWJ1dGVWYWx1ZUNvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHZhciB0YWdOYW1lID0gZmluZFRhZ05hbWUoc2Vzc2lvbiwgcG9zKTtcbiAgICAgICAgdmFyIGF0dHJpYnV0ZU5hbWUgPSBmaW5kQXR0cmlidXRlTmFtZShzZXNzaW9uLCBwb3MpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCF0YWdOYW1lKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICAgIGlmICh0YWdOYW1lIGluIGF0dHJpYnV0ZU1hcCAmJiBhdHRyaWJ1dGVOYW1lIGluIGF0dHJpYnV0ZU1hcFt0YWdOYW1lXSAmJiB0eXBlb2YgYXR0cmlidXRlTWFwW3RhZ05hbWVdW2F0dHJpYnV0ZU5hbWVdID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVNYXBbdGFnTmFtZV1bYXR0cmlidXRlTmFtZV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZXMubWFwKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdmFsdWUsXG4gICAgICAgICAgICAgICAgc25pcHBldDogdmFsdWUsXG4gICAgICAgICAgICAgICAgbWV0YTogXCJhdHRyaWJ1dGUgdmFsdWVcIixcbiAgICAgICAgICAgICAgICBzY29yZTogMTAwMDAwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0SFRNTEVudGl0eUNvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHZhciB2YWx1ZXMgPSBbJ0FhY3V0ZTsnLCAnYWFjdXRlOycsICdBY2lyYzsnLCAnYWNpcmM7JywgJ2FjdXRlOycsICdBRWxpZzsnLCAnYWVsaWc7JywgJ0FncmF2ZTsnLCAnYWdyYXZlOycsICdhbGVmc3ltOycsICdBbHBoYTsnLCAnYWxwaGE7JywgJ2FtcDsnLCAnYW5kOycsICdhbmc7JywgJ0FyaW5nOycsICdhcmluZzsnLCAnYXN5bXA7JywgJ0F0aWxkZTsnLCAnYXRpbGRlOycsICdBdW1sOycsICdhdW1sOycsICdiZHF1bzsnLCAnQmV0YTsnLCAnYmV0YTsnLCAnYnJ2YmFyOycsICdidWxsOycsICdjYXA7JywgJ0NjZWRpbDsnLCAnY2NlZGlsOycsICdjZWRpbDsnLCAnY2VudDsnLCAnQ2hpOycsICdjaGk7JywgJ2NpcmM7JywgJ2NsdWJzOycsICdjb25nOycsICdjb3B5OycsICdjcmFycjsnLCAnY3VwOycsICdjdXJyZW47JywgJ0RhZ2dlcjsnLCAnZGFnZ2VyOycsICdkQXJyOycsICdkYXJyOycsICdkZWc7JywgJ0RlbHRhOycsICdkZWx0YTsnLCAnZGlhbXM7JywgJ2RpdmlkZTsnLCAnRWFjdXRlOycsICdlYWN1dGU7JywgJ0VjaXJjOycsICdlY2lyYzsnLCAnRWdyYXZlOycsICdlZ3JhdmU7JywgJ2VtcHR5OycsICdlbXNwOycsICdlbnNwOycsICdFcHNpbG9uOycsICdlcHNpbG9uOycsICdlcXVpdjsnLCAnRXRhOycsICdldGE7JywgJ0VUSDsnLCAnZXRoOycsICdFdW1sOycsICdldW1sOycsICdldXJvOycsICdleGlzdDsnLCAnZm5vZjsnLCAnZm9yYWxsOycsICdmcmFjMTI7JywgJ2ZyYWMxNDsnLCAnZnJhYzM0OycsICdmcmFzbDsnLCAnR2FtbWE7JywgJ2dhbW1hOycsICdnZTsnLCAnZ3Q7JywgJ2hBcnI7JywgJ2hhcnI7JywgJ2hlYXJ0czsnLCAnaGVsbGlwOycsICdJYWN1dGU7JywgJ2lhY3V0ZTsnLCAnSWNpcmM7JywgJ2ljaXJjOycsICdpZXhjbDsnLCAnSWdyYXZlOycsICdpZ3JhdmU7JywgJ2ltYWdlOycsICdpbmZpbjsnLCAnaW50OycsICdJb3RhOycsICdpb3RhOycsICdpcXVlc3Q7JywgJ2lzaW47JywgJ0l1bWw7JywgJ2l1bWw7JywgJ0thcHBhOycsICdrYXBwYTsnLCAnTGFtYmRhOycsICdsYW1iZGE7JywgJ2xhbmc7JywgJ2xhcXVvOycsICdsQXJyOycsICdsYXJyOycsICdsY2VpbDsnLCAnbGRxdW87JywgJ2xlOycsICdsZmxvb3I7JywgJ2xvd2FzdDsnLCAnbG96OycsICdscm07JywgJ2xzYXF1bzsnLCAnbHNxdW87JywgJ2x0OycsICdtYWNyOycsICdtZGFzaDsnLCAnbWljcm87JywgJ21pZGRvdDsnLCAnbWludXM7JywgJ011OycsICdtdTsnLCAnbmFibGE7JywgJ25ic3A7JywgJ25kYXNoOycsICduZTsnLCAnbmk7JywgJ25vdDsnLCAnbm90aW47JywgJ25zdWI7JywgJ050aWxkZTsnLCAnbnRpbGRlOycsICdOdTsnLCAnbnU7JywgJ09hY3V0ZTsnLCAnb2FjdXRlOycsICdPY2lyYzsnLCAnb2NpcmM7JywgJ09FbGlnOycsICdvZWxpZzsnLCAnT2dyYXZlOycsICdvZ3JhdmU7JywgJ29saW5lOycsICdPbWVnYTsnLCAnb21lZ2E7JywgJ09taWNyb247JywgJ29taWNyb247JywgJ29wbHVzOycsICdvcjsnLCAnb3JkZjsnLCAnb3JkbTsnLCAnT3NsYXNoOycsICdvc2xhc2g7JywgJ090aWxkZTsnLCAnb3RpbGRlOycsICdvdGltZXM7JywgJ091bWw7JywgJ291bWw7JywgJ3BhcmE7JywgJ3BhcnQ7JywgJ3Blcm1pbDsnLCAncGVycDsnLCAnUGhpOycsICdwaGk7JywgJ1BpOycsICdwaTsnLCAncGl2OycsICdwbHVzbW47JywgJ3BvdW5kOycsICdQcmltZTsnLCAncHJpbWU7JywgJ3Byb2Q7JywgJ3Byb3A7JywgJ1BzaTsnLCAncHNpOycsICdxdW90OycsICdyYWRpYzsnLCAncmFuZzsnLCAncmFxdW87JywgJ3JBcnI7JywgJ3JhcnI7JywgJ3JjZWlsOycsICdyZHF1bzsnLCAncmVhbDsnLCAncmVnOycsICdyZmxvb3I7JywgJ1JobzsnLCAncmhvOycsICdybG07JywgJ3JzYXF1bzsnLCAncnNxdW87JywgJ3NicXVvOycsICdTY2Fyb247JywgJ3NjYXJvbjsnLCAnc2RvdDsnLCAnc2VjdDsnLCAnc2h5OycsICdTaWdtYTsnLCAnc2lnbWE7JywgJ3NpZ21hZjsnLCAnc2ltOycsICdzcGFkZXM7JywgJ3N1YjsnLCAnc3ViZTsnLCAnc3VtOycsICdzdXA7JywgJ3N1cDE7JywgJ3N1cDI7JywgJ3N1cDM7JywgJ3N1cGU7JywgJ3N6bGlnOycsICdUYXU7JywgJ3RhdTsnLCAndGhlcmU0OycsICdUaGV0YTsnLCAndGhldGE7JywgJ3RoZXRhc3ltOycsICd0aGluc3A7JywgJ1RIT1JOOycsICd0aG9ybjsnLCAndGlsZGU7JywgJ3RpbWVzOycsICd0cmFkZTsnLCAnVWFjdXRlOycsICd1YWN1dGU7JywgJ3VBcnI7JywgJ3VhcnI7JywgJ1VjaXJjOycsICd1Y2lyYzsnLCAnVWdyYXZlOycsICd1Z3JhdmU7JywgJ3VtbDsnLCAndXBzaWg7JywgJ1Vwc2lsb247JywgJ3Vwc2lsb247JywgJ1V1bWw7JywgJ3V1bWw7JywgJ3dlaWVycDsnLCAnWGk7JywgJ3hpOycsICdZYWN1dGU7JywgJ3lhY3V0ZTsnLCAneWVuOycsICdZdW1sOycsICd5dW1sOycsICdaZXRhOycsICd6ZXRhOycsICd6d2o7JywgJ3p3bmo7J107XG5cbiAgICAgICAgcmV0dXJuIHZhbHVlcy5tYXAoZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBzbmlwcGV0OiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBtZXRhOiBcImh0bWwgZW50aXR5XCIsXG4gICAgICAgICAgICAgICAgc2NvcmU6IDEwMDAwMDBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG5cbn0pLmNhbGwoSHRtbENvbXBsZXRpb25zLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuSHRtbENvbXBsZXRpb25zID0gSHRtbENvbXBsZXRpb25zO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9