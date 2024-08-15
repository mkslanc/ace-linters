"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2234],{

/***/ 37028:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var Behaviour = (__webpack_require__(75684)/* .Behaviour */ .Q);
var CstyleBehaviour = (__webpack_require__(32589)/* .CstyleBehaviour */ ._);
var TokenIterator = (__webpack_require__(99339).TokenIterator);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxTQUFTLFNBQVMsWUFBWSxZQUFZLFVBQVUsUUFBUSxRQUFRLFFBQVEsUUFBUSxTQUFTLFNBQVMsU0FBUyxVQUFVLFNBQVMsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxPQUFPLE9BQU8sU0FBUyxTQUFTLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxRQUFRLFNBQVMsU0FBUyxXQUFXLFNBQVMsU0FBUyxTQUFTLFVBQVUsVUFBVSxXQUFXLFdBQVcsU0FBUyxVQUFVLFNBQVMsU0FBUyxVQUFVLFVBQVUsT0FBTyxXQUFXLFdBQVcsUUFBUSxRQUFRLFdBQVcsVUFBVSxPQUFPLFNBQVMsVUFBVSxVQUFVLFdBQVcsVUFBVSxPQUFPLE9BQU8sVUFBVSxTQUFTLFVBQVUsT0FBTyxPQUFPLFFBQVEsVUFBVSxTQUFTLFdBQVcsV0FBVyxPQUFPLE9BQU8sV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksWUFBWSxVQUFVLE9BQU8sU0FBUyxTQUFTLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxTQUFTLFNBQVMsU0FBUyxTQUFTLFdBQVcsU0FBUyxRQUFRLFFBQVEsT0FBTyxPQUFPLFFBQVEsV0FBVyxVQUFVLFVBQVUsVUFBVSxTQUFTLFNBQVMsUUFBUSxRQUFRLFNBQVMsVUFBVSxTQUFTLFVBQVUsU0FBUyxTQUFTLFVBQVUsVUFBVSxTQUFTLFFBQVEsV0FBVyxRQUFRLFFBQVEsUUFBUSxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsU0FBUyxTQUFTLFFBQVEsVUFBVSxVQUFVLFdBQVcsUUFBUSxXQUFXLFFBQVEsU0FBUyxRQUFRLFFBQVEsU0FBUyxTQUFTLFNBQVMsU0FBUyxVQUFVLFFBQVEsUUFBUSxXQUFXLFVBQVUsVUFBVSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxTQUFTLFNBQVMsVUFBVSxVQUFVLFdBQVcsV0FBVyxRQUFRLFVBQVUsWUFBWSxZQUFZLFNBQVMsU0FBUyxXQUFXLE9BQU8sT0FBTyxXQUFXLFdBQVcsUUFBUSxTQUFTLFNBQVMsU0FBUyxTQUFTLFFBQVEsU0FBUzs7QUFFMzRFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBLENBQUM7O0FBRUQsdUJBQXVCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9iZWhhdmlvdXIvY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3NzX2NvbXBsZXRpb25zLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9odG1sLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9taXhlZC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2h0bWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9odG1sX2NvbXBsZXRpb25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmVoYXZpb3VyID0gcmVxdWlyZShcIi4uL2JlaGF2aW91clwiKS5CZWhhdmlvdXI7XG52YXIgQ3N0eWxlQmVoYXZpb3VyID0gcmVxdWlyZShcIi4vY3N0eWxlXCIpLkNzdHlsZUJlaGF2aW91cjtcbnZhciBUb2tlbkl0ZXJhdG9yID0gcmVxdWlyZShcIi4uLy4uL3Rva2VuX2l0ZXJhdG9yXCIpLlRva2VuSXRlcmF0b3I7XG5cbnZhciBDc3NCZWhhdmlvdXIgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB0aGlzLmluaGVyaXQoQ3N0eWxlQmVoYXZpb3VyKTtcblxuICAgIHRoaXMuYWRkKFwiY29sb25cIiwgXCJpbnNlcnRpb25cIiwgZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24sIGVkaXRvciwgc2Vzc2lvbiwgdGV4dCkge1xuICAgICAgICBpZiAodGV4dCA9PT0gJzonICYmIGVkaXRvci5zZWxlY3Rpb24uaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICB2YXIgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCBjdXJzb3Iucm93LCBjdXJzb3IuY29sdW1uKTtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlbigpO1xuICAgICAgICAgICAgaWYgKHRva2VuICYmIHRva2VuLnZhbHVlLm1hdGNoKC9cXHMrLykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IGl0ZXJhdG9yLnN0ZXBCYWNrd2FyZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRva2VuICYmIHRva2VuLnR5cGUgPT09ICdzdXBwb3J0LnR5cGUnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmRvYy5nZXRMaW5lKGN1cnNvci5yb3cpO1xuICAgICAgICAgICAgICAgIHZhciByaWdodENoYXIgPSBsaW5lLnN1YnN0cmluZyhjdXJzb3IuY29sdW1uLCBjdXJzb3IuY29sdW1uICsgMSk7XG4gICAgICAgICAgICAgICAgaWYgKHJpZ2h0Q2hhciA9PT0gJzonKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IFsxLCAxXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoL14oXFxzK1teO118XFxzKiQpLy50ZXN0KGxpbmUuc3Vic3RyaW5nKGN1cnNvci5jb2x1bW4pKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnOjsnLFxuICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IFsxLCAxXVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGQoXCJjb2xvblwiLCBcImRlbGV0aW9uXCIsIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uLCBlZGl0b3IsIHNlc3Npb24sIHJhbmdlKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZCA9IHNlc3Npb24uZG9jLmdldFRleHRSYW5nZShyYW5nZSk7XG4gICAgICAgIGlmICghcmFuZ2UuaXNNdWx0aUxpbmUoKSAmJiBzZWxlY3RlZCA9PT0gJzonKSB7XG4gICAgICAgICAgICB2YXIgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgICAgICB2YXIgaXRlcmF0b3IgPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCBjdXJzb3Iucm93LCBjdXJzb3IuY29sdW1uKTtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlbigpO1xuICAgICAgICAgICAgaWYgKHRva2VuICYmIHRva2VuLnZhbHVlLm1hdGNoKC9cXHMrLykpIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IGl0ZXJhdG9yLnN0ZXBCYWNrd2FyZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRva2VuICYmIHRva2VuLnR5cGUgPT09ICdzdXBwb3J0LnR5cGUnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmRvYy5nZXRMaW5lKHJhbmdlLnN0YXJ0LnJvdyk7XG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0Q2hhciA9IGxpbmUuc3Vic3RyaW5nKHJhbmdlLmVuZC5jb2x1bW4sIHJhbmdlLmVuZC5jb2x1bW4gKyAxKTtcbiAgICAgICAgICAgICAgICBpZiAocmlnaHRDaGFyID09PSAnOycpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UuZW5kLmNvbHVtbiArKztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGQoXCJzZW1pY29sb25cIiwgXCJpbnNlcnRpb25cIiwgZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24sIGVkaXRvciwgc2Vzc2lvbiwgdGV4dCkge1xuICAgICAgICBpZiAodGV4dCA9PT0gJzsnICYmIGVkaXRvci5zZWxlY3Rpb24uaXNFbXB0eSgpKSB7XG4gICAgICAgICAgICB2YXIgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZG9jLmdldExpbmUoY3Vyc29yLnJvdyk7XG4gICAgICAgICAgICB2YXIgcmlnaHRDaGFyID0gbGluZS5zdWJzdHJpbmcoY3Vyc29yLmNvbHVtbiwgY3Vyc29yLmNvbHVtbiArIDEpO1xuICAgICAgICAgICAgaWYgKHJpZ2h0Q2hhciA9PT0gJzsnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IFsxLCAxXVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuYWRkKFwiIWltcG9ydGFudFwiLCBcImluc2VydGlvblwiLCBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbiwgZWRpdG9yLCBzZXNzaW9uLCB0ZXh0KSB7XG4gICAgICAgIGlmICh0ZXh0ID09PSAnIScgJiYgZWRpdG9yLnNlbGVjdGlvbi5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5kb2MuZ2V0TGluZShjdXJzb3Iucm93KTtcblxuICAgICAgICAgICAgaWYgKC9eXFxzKig7fH18JCkvLnRlc3QobGluZS5zdWJzdHJpbmcoY3Vyc29yLmNvbHVtbikpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJyFpbXBvcnRhbnQnLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3Rpb246IFsxMCwgMTBdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG59O1xub29wLmluaGVyaXRzKENzc0JlaGF2aW91ciwgQ3N0eWxlQmVoYXZpb3VyKTtcblxuZXhwb3J0cy5Dc3NCZWhhdmlvdXIgPSBDc3NCZWhhdmlvdXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIENzc0hpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vY3NzX2hpZ2hsaWdodF9ydWxlc1wiKS5Dc3NIaWdobGlnaHRSdWxlcztcbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG52YXIgV29ya2VyQ2xpZW50ID0gcmVxdWlyZShcIi4uL3dvcmtlci93b3JrZXJfY2xpZW50XCIpLldvcmtlckNsaWVudDtcbnZhciBDc3NDb21wbGV0aW9ucyA9IHJlcXVpcmUoXCIuL2Nzc19jb21wbGV0aW9uc1wiKS5Dc3NDb21wbGV0aW9ucztcbnZhciBDc3NCZWhhdmlvdXIgPSByZXF1aXJlKFwiLi9iZWhhdmlvdXIvY3NzXCIpLkNzc0JlaGF2aW91cjtcbnZhciBDU3R5bGVGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBDc3NIaWdobGlnaHRSdWxlcztcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gbmV3IENzc0JlaGF2aW91cigpO1xuICAgIHRoaXMuJGNvbXBsZXRlciA9IG5ldyBDc3NDb21wbGV0aW9ucygpO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IENTdHlsZUZvbGRNb2RlKCk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBcImNTdHlsZVwiO1xuICAgIHRoaXMuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIi8qXCIsIGVuZDogXCIqL1wifTtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgLy8gaWdub3JlIGJyYWNlcyBpbiBjb21tZW50c1xuICAgICAgICB2YXIgdG9rZW5zID0gdGhpcy5nZXRUb2tlbml6ZXIoKS5nZXRMaW5lVG9rZW5zKGxpbmUsIHN0YXRlKS50b2tlbnM7XG4gICAgICAgIGlmICh0b2tlbnMubGVuZ3RoICYmIHRva2Vuc1t0b2tlbnMubGVuZ3RoLTFdLnR5cGUgPT0gXCJjb21tZW50XCIpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eLipcXHtcXHMqJC8pO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCBpbnB1dCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kb3V0ZGVudC5jaGVja091dGRlbnQobGluZSwgaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KSB7XG4gICAgICAgIHRoaXMuJG91dGRlbnQuYXV0b091dGRlbnQoZG9jLCByb3cpO1xuICAgIH07XG5cbiAgICB0aGlzLmdldENvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRjb21wbGV0ZXIuZ2V0Q29tcGxldGlvbnMoc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KTtcbiAgICB9O1xuXG4gICAgdGhpcy5jcmVhdGVXb3JrZXIgPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgIHZhciB3b3JrZXIgPSBuZXcgV29ya2VyQ2xpZW50KFtcImFjZVwiXSwgXCJhY2UvbW9kZS9jc3Nfd29ya2VyXCIsIFwiV29ya2VyXCIpO1xuICAgICAgICB3b3JrZXIuYXR0YWNoVG9Eb2N1bWVudChzZXNzaW9uLmdldERvY3VtZW50KCkpO1xuXG4gICAgICAgIHdvcmtlci5vbihcImFubm90YXRlXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHNlc3Npb24uc2V0QW5ub3RhdGlvbnMoZS5kYXRhKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya2VyLm9uKFwidGVybWluYXRlXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgc2Vzc2lvbi5jbGVhckFubm90YXRpb25zKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB3b3JrZXI7XG4gICAgfTtcblxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9jc3NcIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9jc3NcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBwcm9wZXJ0eU1hcCA9IHtcbiAgICBcImJhY2tncm91bmRcIjoge1wiIyQwXCI6IDF9LFxuICAgIFwiYmFja2dyb3VuZC1jb2xvclwiOiB7XCIjJDBcIjogMSwgXCJ0cmFuc3BhcmVudFwiOiAxLCBcImZpeGVkXCI6IDF9LFxuICAgIFwiYmFja2dyb3VuZC1pbWFnZVwiOiB7XCJ1cmwoJy8kMCcpXCI6IDF9LFxuICAgIFwiYmFja2dyb3VuZC1yZXBlYXRcIjoge1wicmVwZWF0XCI6IDEsIFwicmVwZWF0LXhcIjogMSwgXCJyZXBlYXQteVwiOiAxLCBcIm5vLXJlcGVhdFwiOiAxLCBcImluaGVyaXRcIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLXBvc2l0aW9uXCI6IHtcImJvdHRvbVwiOjIsIFwiY2VudGVyXCI6MiwgXCJsZWZ0XCI6MiwgXCJyaWdodFwiOjIsIFwidG9wXCI6MiwgXCJpbmhlcml0XCI6Mn0sXG4gICAgXCJiYWNrZ3JvdW5kLWF0dGFjaG1lbnRcIjoge1wic2Nyb2xsXCI6IDEsIFwiZml4ZWRcIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLXNpemVcIjoge1wiY292ZXJcIjogMSwgXCJjb250YWluXCI6IDF9LFxuICAgIFwiYmFja2dyb3VuZC1jbGlwXCI6IHtcImJvcmRlci1ib3hcIjogMSwgXCJwYWRkaW5nLWJveFwiOiAxLCBcImNvbnRlbnQtYm94XCI6IDF9LFxuICAgIFwiYmFja2dyb3VuZC1vcmlnaW5cIjoge1wiYm9yZGVyLWJveFwiOiAxLCBcInBhZGRpbmctYm94XCI6IDEsIFwiY29udGVudC1ib3hcIjogMX0sXG4gICAgXCJib3JkZXJcIjoge1wic29saWQgJDBcIjogMSwgXCJkYXNoZWQgJDBcIjogMSwgXCJkb3R0ZWQgJDBcIjogMSwgXCIjJDBcIjogMX0sXG4gICAgXCJib3JkZXItY29sb3JcIjoge1wiIyQwXCI6IDF9LFxuICAgIFwiYm9yZGVyLXN0eWxlXCI6IHtcInNvbGlkXCI6MiwgXCJkYXNoZWRcIjoyLCBcImRvdHRlZFwiOjIsIFwiZG91YmxlXCI6MiwgXCJncm9vdmVcIjoyLCBcImhpZGRlblwiOjIsIFwiaW5oZXJpdFwiOjIsIFwiaW5zZXRcIjoyLCBcIm5vbmVcIjoyLCBcIm91dHNldFwiOjIsIFwicmlkZ2VkXCI6Mn0sXG4gICAgXCJib3JkZXItY29sbGFwc2VcIjoge1wiY29sbGFwc2VcIjogMSwgXCJzZXBhcmF0ZVwiOiAxfSxcbiAgICBcImJvdHRvbVwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcImNsZWFyXCI6IHtcImxlZnRcIjogMSwgXCJyaWdodFwiOiAxLCBcImJvdGhcIjogMSwgXCJub25lXCI6IDF9LFxuICAgIFwiY29sb3JcIjoge1wiIyQwXCI6IDEsIFwicmdiKCMkMDAsMCwwKVwiOiAxfSxcbiAgICBcImN1cnNvclwiOiB7XCJkZWZhdWx0XCI6IDEsIFwicG9pbnRlclwiOiAxLCBcIm1vdmVcIjogMSwgXCJ0ZXh0XCI6IDEsIFwid2FpdFwiOiAxLCBcImhlbHBcIjogMSwgXCJwcm9ncmVzc1wiOiAxLCBcIm4tcmVzaXplXCI6IDEsIFwibmUtcmVzaXplXCI6IDEsIFwiZS1yZXNpemVcIjogMSwgXCJzZS1yZXNpemVcIjogMSwgXCJzLXJlc2l6ZVwiOiAxLCBcInN3LXJlc2l6ZVwiOiAxLCBcInctcmVzaXplXCI6IDEsIFwibnctcmVzaXplXCI6IDF9LFxuICAgIFwiZGlzcGxheVwiOiB7XCJub25lXCI6IDEsIFwiYmxvY2tcIjogMSwgXCJpbmxpbmVcIjogMSwgXCJpbmxpbmUtYmxvY2tcIjogMSwgXCJ0YWJsZS1jZWxsXCI6IDF9LFxuICAgIFwiZW1wdHktY2VsbHNcIjoge1wic2hvd1wiOiAxLCBcImhpZGVcIjogMX0sXG4gICAgXCJmbG9hdFwiOiB7XCJsZWZ0XCI6IDEsIFwicmlnaHRcIjogMSwgXCJub25lXCI6IDF9LFxuICAgIFwiZm9udC1mYW1pbHlcIjoge1wiQXJpYWxcIjoyLFwiQ29taWMgU2FucyBNU1wiOjIsXCJDb25zb2xhc1wiOjIsXCJDb3VyaWVyIE5ld1wiOjIsXCJDb3VyaWVyXCI6MixcIkdlb3JnaWFcIjoyLFwiTW9ub3NwYWNlXCI6MixcIlNhbnMtU2VyaWZcIjoyLCBcIlNlZ29lIFVJXCI6MixcIlRhaG9tYVwiOjIsXCJUaW1lcyBOZXcgUm9tYW5cIjoyLFwiVHJlYnVjaGV0IE1TXCI6MixcIlZlcmRhbmFcIjogMX0sXG4gICAgXCJmb250LXNpemVcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJmb250LXdlaWdodFwiOiB7XCJib2xkXCI6IDEsIFwibm9ybWFsXCI6IDF9LFxuICAgIFwiZm9udC1zdHlsZVwiOiB7XCJpdGFsaWNcIjogMSwgXCJub3JtYWxcIjogMX0sXG4gICAgXCJmb250LXZhcmlhbnRcIjoge1wibm9ybWFsXCI6IDEsIFwic21hbGwtY2Fwc1wiOiAxfSxcbiAgICBcImhlaWdodFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcImxlZnRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJsZXR0ZXItc3BhY2luZ1wiOiB7XCJub3JtYWxcIjogMX0sXG4gICAgXCJsaW5lLWhlaWdodFwiOiB7XCJub3JtYWxcIjogMX0sXG4gICAgXCJsaXN0LXN0eWxlLXR5cGVcIjoge1wibm9uZVwiOiAxLCBcImRpc2NcIjogMSwgXCJjaXJjbGVcIjogMSwgXCJzcXVhcmVcIjogMSwgXCJkZWNpbWFsXCI6IDEsIFwiZGVjaW1hbC1sZWFkaW5nLXplcm9cIjogMSwgXCJsb3dlci1yb21hblwiOiAxLCBcInVwcGVyLXJvbWFuXCI6IDEsIFwibG93ZXItZ3JlZWtcIjogMSwgXCJsb3dlci1sYXRpblwiOiAxLCBcInVwcGVyLWxhdGluXCI6IDEsIFwiZ2VvcmdpYW5cIjogMSwgXCJsb3dlci1hbHBoYVwiOiAxLCBcInVwcGVyLWFscGhhXCI6IDF9LFxuICAgIFwibWFyZ2luXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibWFyZ2luLXJpZ2h0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibWFyZ2luLWxlZnRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtYXJnaW4tdG9wXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibWFyZ2luLWJvdHRvbVwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1heC1oZWlnaHRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtYXgtd2lkdGhcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtaW4taGVpZ2h0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibWluLXdpZHRoXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwib3ZlcmZsb3dcIjoge1wiaGlkZGVuXCI6IDEsIFwidmlzaWJsZVwiOiAxLCBcImF1dG9cIjogMSwgXCJzY3JvbGxcIjogMX0sXG4gICAgXCJvdmVyZmxvdy14XCI6IHtcImhpZGRlblwiOiAxLCBcInZpc2libGVcIjogMSwgXCJhdXRvXCI6IDEsIFwic2Nyb2xsXCI6IDF9LFxuICAgIFwib3ZlcmZsb3cteVwiOiB7XCJoaWRkZW5cIjogMSwgXCJ2aXNpYmxlXCI6IDEsIFwiYXV0b1wiOiAxLCBcInNjcm9sbFwiOiAxfSxcbiAgICBcInBhZGRpbmdcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJwYWRkaW5nLXRvcFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcInBhZGRpbmctcmlnaHRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJwYWRkaW5nLWJvdHRvbVwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcInBhZGRpbmctbGVmdFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcInBhZ2UtYnJlYWstYWZ0ZXJcIjoge1wiYXV0b1wiOiAxLCBcImFsd2F5c1wiOiAxLCBcImF2b2lkXCI6IDEsIFwibGVmdFwiOiAxLCBcInJpZ2h0XCI6IDF9LFxuICAgIFwicGFnZS1icmVhay1iZWZvcmVcIjoge1wiYXV0b1wiOiAxLCBcImFsd2F5c1wiOiAxLCBcImF2b2lkXCI6IDEsIFwibGVmdFwiOiAxLCBcInJpZ2h0XCI6IDF9LFxuICAgIFwicG9zaXRpb25cIjoge1wiYWJzb2x1dGVcIjogMSwgXCJyZWxhdGl2ZVwiOiAxLCBcImZpeGVkXCI6IDEsIFwic3RhdGljXCI6IDF9LFxuICAgIFwicmlnaHRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJ0YWJsZS1sYXlvdXRcIjoge1wiZml4ZWRcIjogMSwgXCJhdXRvXCI6IDF9LFxuICAgIFwidGV4dC1kZWNvcmF0aW9uXCI6IHtcIm5vbmVcIjogMSwgXCJ1bmRlcmxpbmVcIjogMSwgXCJsaW5lLXRocm91Z2hcIjogMSwgXCJibGlua1wiOiAxfSxcbiAgICBcInRleHQtYWxpZ25cIjoge1wibGVmdFwiOiAxLCBcInJpZ2h0XCI6IDEsIFwiY2VudGVyXCI6IDEsIFwianVzdGlmeVwiOiAxfSxcbiAgICBcInRleHQtdHJhbnNmb3JtXCI6IHtcImNhcGl0YWxpemVcIjogMSwgXCJ1cHBlcmNhc2VcIjogMSwgXCJsb3dlcmNhc2VcIjogMSwgXCJub25lXCI6IDF9LFxuICAgIFwidG9wXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwidmVydGljYWwtYWxpZ25cIjoge1widG9wXCI6IDEsIFwiYm90dG9tXCI6IDF9LFxuICAgIFwidmlzaWJpbGl0eVwiOiB7XCJoaWRkZW5cIjogMSwgXCJ2aXNpYmxlXCI6IDF9LFxuICAgIFwid2hpdGUtc3BhY2VcIjoge1wibm93cmFwXCI6IDEsIFwibm9ybWFsXCI6IDEsIFwicHJlXCI6IDEsIFwicHJlLWxpbmVcIjogMSwgXCJwcmUtd3JhcFwiOiAxfSxcbiAgICBcIndpZHRoXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwid29yZC1zcGFjaW5nXCI6IHtcIm5vcm1hbFwiOiAxfSxcblxuICAgIC8vIG9wYWNpdHlcbiAgICBcImZpbHRlclwiOiB7XCJhbHBoYShvcGFjaXR5PSQwMTAwKVwiOiAxfSxcblxuICAgIFwidGV4dC1zaGFkb3dcIjoge1wiJDAycHggMnB4IDJweCAjNzc3XCI6IDF9LFxuICAgIFwidGV4dC1vdmVyZmxvd1wiOiB7XCJlbGxpcHNpcy13b3JkXCI6IDEsIFwiY2xpcFwiOiAxLCBcImVsbGlwc2lzXCI6IDF9LFxuXG4gICAgLy8gYm9yZGVyIHJhZGl1c1xuICAgIFwiLW1vei1ib3JkZXItcmFkaXVzXCI6IDEsXG4gICAgXCItbW96LWJvcmRlci1yYWRpdXMtdG9wcmlnaHRcIjogMSxcbiAgICBcIi1tb3otYm9yZGVyLXJhZGl1cy1ib3R0b21yaWdodFwiOiAxLFxuICAgIFwiLW1vei1ib3JkZXItcmFkaXVzLXRvcGxlZnRcIjogMSxcbiAgICBcIi1tb3otYm9yZGVyLXJhZGl1cy1ib3R0b21sZWZ0XCI6IDEsXG4gICAgXCItd2Via2l0LWJvcmRlci1yYWRpdXNcIjogMSxcbiAgICBcIi13ZWJraXQtYm9yZGVyLXRvcC1yaWdodC1yYWRpdXNcIjogMSxcbiAgICBcIi13ZWJraXQtYm9yZGVyLXRvcC1sZWZ0LXJhZGl1c1wiOiAxLFxuICAgIFwiLXdlYmtpdC1ib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1c1wiOiAxLFxuICAgIFwiLXdlYmtpdC1ib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzXCI6IDEsXG5cbiAgICAvLyBkcm9wc2hhZG93c1xuICAgIFwiLW1vei1ib3gtc2hhZG93XCI6IDEsXG4gICAgXCItd2Via2l0LWJveC1zaGFkb3dcIjogMSxcblxuICAgIC8vIHRyYW5zZm9ybWF0aW9uc1xuICAgIFwidHJhbnNmb3JtXCI6IHtcInJvdGF0ZSgkMDBkZWcpXCI6IDEsIFwic2tldygkMDBkZWcpXCI6IDF9LFxuICAgIFwiLW1vei10cmFuc2Zvcm1cIjoge1wicm90YXRlKCQwMGRlZylcIjogMSwgXCJza2V3KCQwMGRlZylcIjogMX0sXG4gICAgXCItd2Via2l0LXRyYW5zZm9ybVwiOiB7XCJyb3RhdGUoJDAwZGVnKVwiOiAxLCBcInNrZXcoJDAwZGVnKVwiOiAxIH1cbn07XG5cbnZhciBDc3NDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKCkge1xuXG59O1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmNvbXBsZXRpb25zRGVmaW5lZCA9IGZhbHNlO1xuXG4gICAgdGhpcy5kZWZpbmVDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAvL2ZpbGwgaW4gbWlzc2luZyBwcm9wZXJ0aWVzXG4gICAgICAgIGlmIChkb2N1bWVudCkge1xuICAgICAgICAgICAgdmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYycpLnN0eWxlO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIHN0eWxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzdHlsZVtpXSAhPT0gJ3N0cmluZycpXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBpLnJlcGxhY2UoL1tBLVpdL2csIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICctJyArIHgudG9Mb3dlckNhc2UoKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGlmICghcHJvcGVydHlNYXAuaGFzT3duUHJvcGVydHkobmFtZSkpXG4gICAgICAgICAgICAgICAgICAgIHByb3BlcnR5TWFwW25hbWVdID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuY29tcGxldGlvbnNEZWZpbmVkID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICBpZiAoIXRoaXMuY29tcGxldGlvbnNEZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLmRlZmluZUNvbXBsZXRpb25zKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc3RhdGU9PT0ncnVsZXNldCcgfHwgc2Vzc2lvbi4kbW9kZS4kaWQgPT0gXCJhY2UvbW9kZS9zY3NzXCIpIHtcbiAgICAgICAgICAgIC8vY3NzIGF0dHJpYnV0ZSB2YWx1ZVxuICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocG9zLnJvdykuc3Vic3RyKDAsIHBvcy5jb2x1bW4pO1xuICAgICAgICAgICAgdmFyIGluUGFyZW5zID0gL1xcKFteKV0qJC8udGVzdChsaW5lKTtcbiAgICAgICAgICAgIGlmIChpblBhcmVucykge1xuICAgICAgICAgICAgICAgIGxpbmUgPSBsaW5lLnN1YnN0cihsaW5lLmxhc3RJbmRleE9mKCcoJykgKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgvOlteO10rJC8udGVzdChsaW5lKSkge1xuICAgICAgICAgICAgICAgIC8oW1xcd1xcLV0rKTpbXjpdKiQvLnRlc3QobGluZSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eVZhbHVlQ29tcGxldGlvbnMoc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJvcGVydHlDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgsIGluUGFyZW5zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRQcm9wZXJ0eUNvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4LCBza2lwU2VtaWNvbG9uKSB7XG4gICAgICAgIHNraXBTZW1pY29sb24gPSBza2lwU2VtaWNvbG9uIHx8IGZhbHNlO1xuICAgICAgICB2YXIgcHJvcGVydGllcyA9IE9iamVjdC5rZXlzKHByb3BlcnR5TWFwKTtcbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXMubWFwKGZ1bmN0aW9uKHByb3BlcnR5KXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2FwdGlvbjogcHJvcGVydHksXG4gICAgICAgICAgICAgICAgc25pcHBldDogcHJvcGVydHkgKyAnOiAkMCcgKyAoc2tpcFNlbWljb2xvbiA/ICcnIDogJzsnKSxcbiAgICAgICAgICAgICAgICBtZXRhOiBcInByb3BlcnR5XCIsXG4gICAgICAgICAgICAgICAgc2NvcmU6IDEwMDAwMDBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmdldFByb3BlcnR5VmFsdWVDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShwb3Mucm93KS5zdWJzdHIoMCwgcG9zLmNvbHVtbik7XG4gICAgICAgIHZhciBwcm9wZXJ0eSA9ICgvKFtcXHdcXC1dKyk6W146XSokLy5leGVjKGxpbmUpIHx8IHt9KVsxXTtcblxuICAgICAgICBpZiAoIXByb3BlcnR5KVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB2YXIgdmFsdWVzID0gW107XG4gICAgICAgIGlmIChwcm9wZXJ0eSBpbiBwcm9wZXJ0eU1hcCAmJiB0eXBlb2YgcHJvcGVydHlNYXBbcHJvcGVydHldID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICB2YWx1ZXMgPSBPYmplY3Qua2V5cyhwcm9wZXJ0eU1hcFtwcm9wZXJ0eV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWx1ZXMubWFwKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdmFsdWUsXG4gICAgICAgICAgICAgICAgc25pcHBldDogdmFsdWUsXG4gICAgICAgICAgICAgICAgbWV0YTogXCJwcm9wZXJ0eSB2YWx1ZVwiLFxuICAgICAgICAgICAgICAgIHNjb3JlOiAxMDAwMDAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG59KS5jYWxsKENzc0NvbXBsZXRpb25zLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuQ3NzQ29tcGxldGlvbnMgPSBDc3NDb21wbGV0aW9ucztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgTWl4ZWRGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL21peGVkXCIpLkZvbGRNb2RlO1xudmFyIFhtbEZvbGRNb2RlID0gcmVxdWlyZShcIi4veG1sXCIpLkZvbGRNb2RlO1xudmFyIENTdHlsZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vY3N0eWxlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24odm9pZEVsZW1lbnRzLCBvcHRpb25hbFRhZ3MpIHtcbiAgICBNaXhlZEZvbGRNb2RlLmNhbGwodGhpcywgbmV3IFhtbEZvbGRNb2RlKHZvaWRFbGVtZW50cywgb3B0aW9uYWxUYWdzKSwge1xuICAgICAgICBcImpzLVwiOiBuZXcgQ1N0eWxlRm9sZE1vZGUoKSxcbiAgICAgICAgXCJjc3MtXCI6IG5ldyBDU3R5bGVGb2xkTW9kZSgpXG4gICAgfSk7XG59O1xuXG5vb3AuaW5oZXJpdHMoRm9sZE1vZGUsIE1peGVkRm9sZE1vZGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBCYXNlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkX21vZGVcIikuRm9sZE1vZGU7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbihkZWZhdWx0TW9kZSwgc3ViTW9kZXMpIHtcbiAgICB0aGlzLmRlZmF1bHRNb2RlID0gZGVmYXVsdE1vZGU7XG4gICAgdGhpcy5zdWJNb2RlcyA9IHN1Yk1vZGVzO1xufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG5cbiAgICB0aGlzLiRnZXRNb2RlID0gZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzdGF0ZSAhPSBcInN0cmluZ1wiKSBcbiAgICAgICAgICAgIHN0YXRlID0gc3RhdGVbMF07XG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLnN1Yk1vZGVzKSB7XG4gICAgICAgICAgICBpZiAoc3RhdGUuaW5kZXhPZihrZXkpID09PSAwKVxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN1Yk1vZGVzW2tleV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLiR0cnlNb2RlID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBtb2RlID0gdGhpcy4kZ2V0TW9kZShzdGF0ZSk7XG4gICAgICAgIHJldHVybiAobW9kZSA/IG1vZGUuZ2V0Rm9sZFdpZGdldChzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykgOiBcIlwiKTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHRoaXMuJHRyeU1vZGUoc2Vzc2lvbi5nZXRTdGF0ZShyb3ctMSksIHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB8fFxuICAgICAgICAgICAgdGhpcy4kdHJ5TW9kZShzZXNzaW9uLmdldFN0YXRlKHJvdyksIHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB8fFxuICAgICAgICAgICAgdGhpcy5kZWZhdWx0TW9kZS5nZXRGb2xkV2lkZ2V0KHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBtb2RlID0gdGhpcy4kZ2V0TW9kZShzZXNzaW9uLmdldFN0YXRlKHJvdy0xKSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIW1vZGUgfHwgIW1vZGUuZ2V0Rm9sZFdpZGdldChzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykpXG4gICAgICAgICAgICBtb2RlID0gdGhpcy4kZ2V0TW9kZShzZXNzaW9uLmdldFN0YXRlKHJvdykpO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFtb2RlIHx8ICFtb2RlLmdldEZvbGRXaWRnZXQoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpKVxuICAgICAgICAgICAgbW9kZSA9IHRoaXMuZGVmYXVsdE1vZGU7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4gbW9kZS5nZXRGb2xkV2lkZ2V0UmFuZ2Uoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpO1xuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBKYXZhU2NyaXB0TW9kZSA9IHJlcXVpcmUoXCIuL2phdmFzY3JpcHRcIikuTW9kZTtcbnZhciBDc3NNb2RlID0gcmVxdWlyZShcIi4vY3NzXCIpLk1vZGU7XG52YXIgSHRtbEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vaHRtbF9oaWdobGlnaHRfcnVsZXNcIikuSHRtbEhpZ2hsaWdodFJ1bGVzO1xudmFyIFhtbEJlaGF2aW91ciA9IHJlcXVpcmUoXCIuL2JlaGF2aW91ci94bWxcIikuWG1sQmVoYXZpb3VyO1xudmFyIEh0bWxGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvaHRtbFwiKS5Gb2xkTW9kZTtcbnZhciBIdG1sQ29tcGxldGlvbnMgPSByZXF1aXJlKFwiLi9odG1sX2NvbXBsZXRpb25zXCIpLkh0bWxDb21wbGV0aW9ucztcbnZhciBXb3JrZXJDbGllbnQgPSByZXF1aXJlKFwiLi4vd29ya2VyL3dvcmtlcl9jbGllbnRcIikuV29ya2VyQ2xpZW50O1xuXG4vLyBodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNS9zeW50YXguaHRtbCN2b2lkLWVsZW1lbnRzXG52YXIgdm9pZEVsZW1lbnRzID0gW1wiYXJlYVwiLCBcImJhc2VcIiwgXCJiclwiLCBcImNvbFwiLCBcImVtYmVkXCIsIFwiaHJcIiwgXCJpbWdcIiwgXCJpbnB1dFwiLCBcImtleWdlblwiLCBcImxpbmtcIiwgXCJtZXRhXCIsIFwibWVudWl0ZW1cIiwgXCJwYXJhbVwiLCBcInNvdXJjZVwiLCBcInRyYWNrXCIsIFwid2JyXCJdO1xudmFyIG9wdGlvbmFsRW5kVGFncyA9IFtcImxpXCIsIFwiZHRcIiwgXCJkZFwiLCBcInBcIiwgXCJydFwiLCBcInJwXCIsIFwib3B0Z3JvdXBcIiwgXCJvcHRpb25cIiwgXCJjb2xncm91cFwiLCBcInRkXCIsIFwidGhcIl07XG5cbnZhciBNb2RlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHRoaXMuZnJhZ21lbnRDb250ZXh0ID0gb3B0aW9ucyAmJiBvcHRpb25zLmZyYWdtZW50Q29udGV4dDtcbiAgICB0aGlzLkhpZ2hsaWdodFJ1bGVzID0gSHRtbEhpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuJGJlaGF2aW91ciA9IG5ldyBYbWxCZWhhdmlvdXIoKTtcbiAgICB0aGlzLiRjb21wbGV0ZXIgPSBuZXcgSHRtbENvbXBsZXRpb25zKCk7XG4gICAgXG4gICAgdGhpcy5jcmVhdGVNb2RlRGVsZWdhdGVzKHtcbiAgICAgICAgXCJqcy1cIjogSmF2YVNjcmlwdE1vZGUsXG4gICAgICAgIFwiY3NzLVwiOiBDc3NNb2RlXG4gICAgfSk7XG4gICAgXG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgSHRtbEZvbGRNb2RlKHRoaXMudm9pZEVsZW1lbnRzLCBsYW5nLmFycmF5VG9NYXAob3B0aW9uYWxFbmRUYWdzKSk7XG59O1xub29wLmluaGVyaXRzKE1vZGUsIFRleHRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiPCEtLVwiLCBlbmQ6IFwiLS0+XCJ9O1xuXG4gICAgdGhpcy52b2lkRWxlbWVudHMgPSBsYW5nLmFycmF5VG9NYXAodm9pZEVsZW1lbnRzKTtcblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG4gICAgfTtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIGlucHV0KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kY29tcGxldGVyLmdldENvbXBsZXRpb25zKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCk7XG4gICAgfTtcblxuICAgIHRoaXMuY3JlYXRlV29ya2VyID0gZnVuY3Rpb24oc2Vzc2lvbikge1xuICAgICAgICBpZiAodGhpcy5jb25zdHJ1Y3RvciAhPSBNb2RlKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgd29ya2VyID0gbmV3IFdvcmtlckNsaWVudChbXCJhY2VcIl0sIFwiYWNlL21vZGUvaHRtbF93b3JrZXJcIiwgXCJXb3JrZXJcIik7XG4gICAgICAgIHdvcmtlci5hdHRhY2hUb0RvY3VtZW50KHNlc3Npb24uZ2V0RG9jdW1lbnQoKSk7XG5cbiAgICAgICAgaWYgKHRoaXMuZnJhZ21lbnRDb250ZXh0KVxuICAgICAgICAgICAgd29ya2VyLmNhbGwoXCJzZXRPcHRpb25zXCIsIFt7Y29udGV4dDogdGhpcy5mcmFnbWVudENvbnRleHR9XSk7XG5cbiAgICAgICAgd29ya2VyLm9uKFwiZXJyb3JcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgc2Vzc2lvbi5zZXRBbm5vdGF0aW9ucyhlLmRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3b3JrZXIub24oXCJ0ZXJtaW5hdGVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXNzaW9uLmNsZWFyQW5ub3RhdGlvbnMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHdvcmtlcjtcbiAgICB9O1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2h0bWxcIjtcbiAgICB0aGlzLnNuaXBwZXRGaWxlSWQgPSBcImFjZS9zbmlwcGV0cy9odG1sXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgVG9rZW5JdGVyYXRvciA9IHJlcXVpcmUoXCIuLi90b2tlbl9pdGVyYXRvclwiKS5Ub2tlbkl0ZXJhdG9yO1xuXG52YXIgY29tbW9uQXR0cmlidXRlcyA9IFtcbiAgICBcImFjY2Vzc2tleVwiLFxuICAgIFwiY2xhc3NcIixcbiAgICBcImNvbnRlbnRlZGl0YWJsZVwiLFxuICAgIFwiY29udGV4dG1lbnVcIixcbiAgICBcImRpclwiLFxuICAgIFwiZHJhZ2dhYmxlXCIsXG4gICAgXCJkcm9wem9uZVwiLFxuICAgIFwiaGlkZGVuXCIsXG4gICAgXCJpZFwiLFxuICAgIFwiaW5lcnRcIixcbiAgICBcIml0ZW1pZFwiLFxuICAgIFwiaXRlbXByb3BcIixcbiAgICBcIml0ZW1yZWZcIixcbiAgICBcIml0ZW1zY29wZVwiLFxuICAgIFwiaXRlbXR5cGVcIixcbiAgICBcImxhbmdcIixcbiAgICBcInNwZWxsY2hlY2tcIixcbiAgICBcInN0eWxlXCIsXG4gICAgXCJ0YWJpbmRleFwiLFxuICAgIFwidGl0bGVcIixcbiAgICBcInRyYW5zbGF0ZVwiXG5dO1xuXG52YXIgZXZlbnRBdHRyaWJ1dGVzID0gW1xuICAgIFwib25hYm9ydFwiLFxuICAgIFwib25ibHVyXCIsXG4gICAgXCJvbmNhbmNlbFwiLFxuICAgIFwib25jYW5wbGF5XCIsXG4gICAgXCJvbmNhbnBsYXl0aHJvdWdoXCIsXG4gICAgXCJvbmNoYW5nZVwiLFxuICAgIFwib25jbGlja1wiLFxuICAgIFwib25jbG9zZVwiLFxuICAgIFwib25jb250ZXh0bWVudVwiLFxuICAgIFwib25jdWVjaGFuZ2VcIixcbiAgICBcIm9uZGJsY2xpY2tcIixcbiAgICBcIm9uZHJhZ1wiLFxuICAgIFwib25kcmFnZW5kXCIsXG4gICAgXCJvbmRyYWdlbnRlclwiLFxuICAgIFwib25kcmFnbGVhdmVcIixcbiAgICBcIm9uZHJhZ292ZXJcIixcbiAgICBcIm9uZHJhZ3N0YXJ0XCIsXG4gICAgXCJvbmRyb3BcIixcbiAgICBcIm9uZHVyYXRpb25jaGFuZ2VcIixcbiAgICBcIm9uZW1wdGllZFwiLFxuICAgIFwib25lbmRlZFwiLFxuICAgIFwib25lcnJvclwiLFxuICAgIFwib25mb2N1c1wiLFxuICAgIFwib25pbnB1dFwiLFxuICAgIFwib25pbnZhbGlkXCIsXG4gICAgXCJvbmtleWRvd25cIixcbiAgICBcIm9ua2V5cHJlc3NcIixcbiAgICBcIm9ua2V5dXBcIixcbiAgICBcIm9ubG9hZFwiLFxuICAgIFwib25sb2FkZWRkYXRhXCIsXG4gICAgXCJvbmxvYWRlZG1ldGFkYXRhXCIsXG4gICAgXCJvbmxvYWRzdGFydFwiLFxuICAgIFwib25tb3VzZWRvd25cIixcbiAgICBcIm9ubW91c2Vtb3ZlXCIsXG4gICAgXCJvbm1vdXNlb3V0XCIsXG4gICAgXCJvbm1vdXNlb3ZlclwiLFxuICAgIFwib25tb3VzZXVwXCIsXG4gICAgXCJvbm1vdXNld2hlZWxcIixcbiAgICBcIm9ucGF1c2VcIixcbiAgICBcIm9ucGxheVwiLFxuICAgIFwib25wbGF5aW5nXCIsXG4gICAgXCJvbnByb2dyZXNzXCIsXG4gICAgXCJvbnJhdGVjaGFuZ2VcIixcbiAgICBcIm9ucmVzZXRcIixcbiAgICBcIm9uc2Nyb2xsXCIsXG4gICAgXCJvbnNlZWtlZFwiLFxuICAgIFwib25zZWVraW5nXCIsXG4gICAgXCJvbnNlbGVjdFwiLFxuICAgIFwib25zaG93XCIsXG4gICAgXCJvbnN0YWxsZWRcIixcbiAgICBcIm9uc3VibWl0XCIsXG4gICAgXCJvbnN1c3BlbmRcIixcbiAgICBcIm9udGltZXVwZGF0ZVwiLFxuICAgIFwib252b2x1bWVjaGFuZ2VcIixcbiAgICBcIm9ud2FpdGluZ1wiXG5dO1xuXG52YXIgZ2xvYmFsQXR0cmlidXRlcyA9IGNvbW1vbkF0dHJpYnV0ZXMuY29uY2F0KGV2ZW50QXR0cmlidXRlcyk7XG5cbnZhciBhdHRyaWJ1dGVNYXAgPSB7XG4gICAgXCJhXCI6IHtcImhyZWZcIjogMSwgXCJ0YXJnZXRcIjoge1wiX2JsYW5rXCI6IDEsIFwidG9wXCI6IDF9LCBcInBpbmdcIjogMSwgXCJyZWxcIjoge1wibm9mb2xsb3dcIjogMSwgXCJhbHRlcm5hdGVcIjogMSwgXCJhdXRob3JcIjogMSwgXCJib29rbWFya1wiOiAxLCBcImhlbHBcIjogMSwgXCJsaWNlbnNlXCI6IDEsIFwibmV4dFwiOiAxLCBcIm5vcmVmZXJyZXJcIjogMSwgXCJwcmVmZXRjaFwiOiAxLCBcInByZXZcIjogMSwgXCJzZWFyY2hcIjogMSwgXCJ0YWdcIjogMX0sIFwibWVkaWFcIjogMSwgXCJocmVmbGFuZ1wiOiAxLCBcInR5cGVcIjogMX0sXG4gICAgXCJhYmJyXCI6IHt9LFxuICAgIFwiYWRkcmVzc1wiOiB7fSxcbiAgICBcImFyZWFcIjoge1wic2hhcGVcIjogMSwgXCJjb29yZHNcIjogMSwgXCJocmVmXCI6IDEsIFwiaHJlZmxhbmdcIjogMSwgXCJhbHRcIjogMSwgXCJ0YXJnZXRcIjogMSwgXCJtZWRpYVwiOiAxLCBcInJlbFwiOiAxLCBcInBpbmdcIjogMSwgXCJ0eXBlXCI6IDF9LFxuICAgIFwiYXJ0aWNsZVwiOiB7XCJwdWJkYXRlXCI6IDF9LFxuICAgIFwiYXNpZGVcIjoge30sXG4gICAgXCJhdWRpb1wiOiB7XCJzcmNcIjogMSwgXCJhdXRvYnVmZmVyXCI6IDEsIFwiYXV0b3BsYXlcIjoge1wiYXV0b3BsYXlcIjogMX0sIFwibG9vcFwiOiB7XCJsb29wXCI6IDF9LCBcImNvbnRyb2xzXCI6IHtcImNvbnRyb2xzXCI6IDF9LCBcIm11dGVkXCI6IHtcIm11dGVkXCI6IDF9LCBcInByZWxvYWRcIjoge1wiYXV0b1wiOiAxLCBcIm1ldGFkYXRhXCI6IDEsIFwibm9uZVwiOiAxIH19LFxuICAgIFwiYlwiOiB7fSxcbiAgICBcImJhc2VcIjoge1wiaHJlZlwiOiAxLCBcInRhcmdldFwiOiAxfSxcbiAgICBcImJkaVwiOiB7fSxcbiAgICBcImJkb1wiOiB7fSxcbiAgICBcImJsb2NrcXVvdGVcIjoge1wiY2l0ZVwiOiAxfSxcbiAgICBcImJvZHlcIjoge1wib25hZnRlcnByaW50XCI6IDEsIFwib25iZWZvcmVwcmludFwiOiAxLCBcIm9uYmVmb3JldW5sb2FkXCI6IDEsIFwib25oYXNoY2hhbmdlXCI6IDEsIFwib25tZXNzYWdlXCI6IDEsIFwib25vZmZsaW5lXCI6IDEsIFwib25wb3BzdGF0ZVwiOiAxLCBcIm9ucmVkb1wiOiAxLCBcIm9ucmVzaXplXCI6IDEsIFwib25zdG9yYWdlXCI6IDEsIFwib251bmRvXCI6IDEsIFwib251bmxvYWRcIjogMX0sXG4gICAgXCJiclwiOiB7fSxcbiAgICBcImJ1dHRvblwiOiB7XCJhdXRvZm9jdXNcIjogMSwgXCJkaXNhYmxlZFwiOiB7XCJkaXNhYmxlZFwiOiAxfSwgXCJmb3JtXCI6IDEsIFwiZm9ybWFjdGlvblwiOiAxLCBcImZvcm1lbmN0eXBlXCI6IDEsIFwiZm9ybW1ldGhvZFwiOiAxLCBcImZvcm1ub3ZhbGlkYXRlXCI6IDEsIFwiZm9ybXRhcmdldFwiOiAxLCBcIm5hbWVcIjogMSwgXCJ2YWx1ZVwiOiAxLCBcInR5cGVcIjoge1wiYnV0dG9uXCI6IDEsIFwic3VibWl0XCI6IDF9fSxcbiAgICBcImNhbnZhc1wiOiB7XCJ3aWR0aFwiOiAxLCBcImhlaWdodFwiOiAxfSxcbiAgICBcImNhcHRpb25cIjoge30sXG4gICAgXCJjaXRlXCI6IHt9LFxuICAgIFwiY29kZVwiOiB7fSxcbiAgICBcImNvbFwiOiB7XCJzcGFuXCI6IDF9LFxuICAgIFwiY29sZ3JvdXBcIjoge1wic3BhblwiOiAxfSxcbiAgICBcImNvbW1hbmRcIjoge1widHlwZVwiOiAxLCBcImxhYmVsXCI6IDEsIFwiaWNvblwiOiAxLCBcImRpc2FibGVkXCI6IDEsIFwiY2hlY2tlZFwiOiAxLCBcInJhZGlvZ3JvdXBcIjogMSwgXCJjb21tYW5kXCI6IDF9LFxuICAgIFwiZGF0YVwiOiB7fSxcbiAgICBcImRhdGFsaXN0XCI6IHt9LFxuICAgIFwiZGRcIjoge30sXG4gICAgXCJkZWxcIjoge1wiY2l0ZVwiOiAxLCBcImRhdGV0aW1lXCI6IDF9LFxuICAgIFwiZGV0YWlsc1wiOiB7XCJvcGVuXCI6IDF9LFxuICAgIFwiZGZuXCI6IHt9LFxuICAgIFwiZGlhbG9nXCI6IHtcIm9wZW5cIjogMX0sXG4gICAgXCJkaXZcIjoge30sXG4gICAgXCJkbFwiOiB7fSxcbiAgICBcImR0XCI6IHt9LFxuICAgIFwiZW1cIjoge30sXG4gICAgXCJlbWJlZFwiOiB7XCJzcmNcIjogMSwgXCJoZWlnaHRcIjogMSwgXCJ3aWR0aFwiOiAxLCBcInR5cGVcIjogMX0sXG4gICAgXCJmaWVsZHNldFwiOiB7XCJkaXNhYmxlZFwiOiAxLCBcImZvcm1cIjogMSwgXCJuYW1lXCI6IDF9LFxuICAgIFwiZmlnY2FwdGlvblwiOiB7fSxcbiAgICBcImZpZ3VyZVwiOiB7fSxcbiAgICBcImZvb3RlclwiOiB7fSxcbiAgICBcImZvcm1cIjoge1wiYWNjZXB0LWNoYXJzZXRcIjogMSwgXCJhY3Rpb25cIjogMSwgXCJhdXRvY29tcGxldGVcIjogMSwgXCJlbmN0eXBlXCI6IHtcIm11bHRpcGFydC9mb3JtLWRhdGFcIjogMSwgXCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIjogMX0sIFwibWV0aG9kXCI6IHtcImdldFwiOiAxLCBcInBvc3RcIjogMX0sIFwibmFtZVwiOiAxLCBcIm5vdmFsaWRhdGVcIjogMSwgXCJ0YXJnZXRcIjoge1wiX2JsYW5rXCI6IDEsIFwidG9wXCI6IDF9fSxcbiAgICBcImgxXCI6IHt9LFxuICAgIFwiaDJcIjoge30sXG4gICAgXCJoM1wiOiB7fSxcbiAgICBcImg0XCI6IHt9LFxuICAgIFwiaDVcIjoge30sXG4gICAgXCJoNlwiOiB7fSxcbiAgICBcImhlYWRcIjoge30sXG4gICAgXCJoZWFkZXJcIjoge30sXG4gICAgXCJoclwiOiB7fSxcbiAgICBcImh0bWxcIjoge1wibWFuaWZlc3RcIjogMX0sXG4gICAgXCJpXCI6IHt9LFxuICAgIFwiaWZyYW1lXCI6IHtcIm5hbWVcIjogMSwgXCJzcmNcIjogMSwgXCJoZWlnaHRcIjogMSwgXCJ3aWR0aFwiOiAxLCBcInNhbmRib3hcIjoge1wiYWxsb3ctc2FtZS1vcmlnaW5cIjogMSwgXCJhbGxvdy10b3AtbmF2aWdhdGlvblwiOiAxLCBcImFsbG93LWZvcm1zXCI6IDEsIFwiYWxsb3ctc2NyaXB0c1wiOiAxfSwgXCJzZWFtbGVzc1wiOiB7XCJzZWFtbGVzc1wiOiAxfX0sXG4gICAgXCJpbWdcIjoge1wiYWx0XCI6IDEsIFwic3JjXCI6IDEsIFwiaGVpZ2h0XCI6IDEsIFwid2lkdGhcIjogMSwgXCJ1c2VtYXBcIjogMSwgXCJpc21hcFwiOiAxfSxcbiAgICBcImlucHV0XCI6IHtcbiAgICAgICAgXCJ0eXBlXCI6IHtcInRleHRcIjogMSwgXCJwYXNzd29yZFwiOiAxLCBcImhpZGRlblwiOiAxLCBcImNoZWNrYm94XCI6IDEsIFwic3VibWl0XCI6IDEsIFwicmFkaW9cIjogMSwgXCJmaWxlXCI6IDEsIFwiYnV0dG9uXCI6IDEsIFwicmVzZXRcIjogMSwgXCJpbWFnZVwiOiAzMSwgXCJjb2xvclwiOiAxLCBcImRhdGVcIjogMSwgXCJkYXRldGltZVwiOiAxLCBcImRhdGV0aW1lLWxvY2FsXCI6IDEsIFwiZW1haWxcIjogMSwgXCJtb250aFwiOiAxLCBcIm51bWJlclwiOiAxLCBcInJhbmdlXCI6IDEsIFwic2VhcmNoXCI6IDEsIFwidGVsXCI6IDEsIFwidGltZVwiOiAxLCBcInVybFwiOiAxLCBcIndlZWtcIjogMX0sXG4gICAgICAgIFwiYWNjZXB0XCI6IDEsIFwiYWx0XCI6IDEsIFwiYXV0b2NvbXBsZXRlXCI6IHtcIm9uXCI6IDEsIFwib2ZmXCI6IDF9LCBcImF1dG9mb2N1c1wiOiB7XCJhdXRvZm9jdXNcIjogMX0sIFwiY2hlY2tlZFwiOiB7XCJjaGVja2VkXCI6IDF9LCBcImRpc2FibGVkXCI6IHtcImRpc2FibGVkXCI6IDF9LCBcImZvcm1cIjogMSwgXCJmb3JtYWN0aW9uXCI6IDEsIFwiZm9ybWVuY3R5cGVcIjoge1wiYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkXCI6IDEsIFwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiOiAxLCBcInRleHQvcGxhaW5cIjogMX0sIFwiZm9ybW1ldGhvZFwiOiB7XCJnZXRcIjogMSwgXCJwb3N0XCI6IDF9LCBcImZvcm1ub3ZhbGlkYXRlXCI6IHtcImZvcm1ub3ZhbGlkYXRlXCI6IDF9LCBcImZvcm10YXJnZXRcIjoge1wiX2JsYW5rXCI6IDEsIFwiX3NlbGZcIjogMSwgXCJfcGFyZW50XCI6IDEsIFwiX3RvcFwiOiAxfSwgXCJoZWlnaHRcIjogMSwgXCJsaXN0XCI6IDEsIFwibWF4XCI6IDEsIFwibWF4bGVuZ3RoXCI6IDEsIFwibWluXCI6IDEsIFwibXVsdGlwbGVcIjoge1wibXVsdGlwbGVcIjogMX0sIFwibmFtZVwiOiAxLCBcInBhdHRlcm5cIjogMSwgXCJwbGFjZWhvbGRlclwiOiAxLCBcInJlYWRvbmx5XCI6IHtcInJlYWRvbmx5XCI6IDF9LCBcInJlcXVpcmVkXCI6IHtcInJlcXVpcmVkXCI6IDF9LCBcInNpemVcIjogMSwgXCJzcmNcIjogMSwgXCJzdGVwXCI6IDEsIFwid2lkdGhcIjogMSwgXCJmaWxlc1wiOiAxLCBcInZhbHVlXCI6IDF9LFxuICAgIFwiaW5zXCI6IHtcImNpdGVcIjogMSwgXCJkYXRldGltZVwiOiAxfSxcbiAgICBcImtiZFwiOiB7fSxcbiAgICBcImtleWdlblwiOiB7XCJhdXRvZm9jdXNcIjogMSwgXCJjaGFsbGVuZ2VcIjoge1wiY2hhbGxlbmdlXCI6IDF9LCBcImRpc2FibGVkXCI6IHtcImRpc2FibGVkXCI6IDF9LCBcImZvcm1cIjogMSwgXCJrZXl0eXBlXCI6IHtcInJzYVwiOiAxLCBcImRzYVwiOiAxLCBcImVjXCI6IDF9LCBcIm5hbWVcIjogMX0sXG4gICAgXCJsYWJlbFwiOiB7XCJmb3JtXCI6IDEsIFwiZm9yXCI6IDF9LFxuICAgIFwibGVnZW5kXCI6IHt9LFxuICAgIFwibGlcIjoge1widmFsdWVcIjogMX0sXG4gICAgXCJsaW5rXCI6IHtcImhyZWZcIjogMSwgXCJocmVmbGFuZ1wiOiAxLCBcInJlbFwiOiB7XCJzdHlsZXNoZWV0XCI6IDEsIFwiaWNvblwiOiAxfSwgXCJtZWRpYVwiOiB7XCJhbGxcIjogMSwgXCJzY3JlZW5cIjogMSwgXCJwcmludFwiOiAxfSwgXCJ0eXBlXCI6IHtcInRleHQvY3NzXCI6IDEsIFwiaW1hZ2UvcG5nXCI6IDEsIFwiaW1hZ2UvanBlZ1wiOiAxLCBcImltYWdlL2dpZlwiOiAxfSwgXCJzaXplc1wiOiAxfSxcbiAgICBcIm1haW5cIjoge30sXG4gICAgXCJtYXBcIjoge1wibmFtZVwiOiAxfSxcbiAgICBcIm1hcmtcIjoge30sXG4gICAgXCJtYXRoXCI6IHt9LFxuICAgIFwibWVudVwiOiB7XCJ0eXBlXCI6IDEsIFwibGFiZWxcIjogMX0sXG4gICAgXCJtZXRhXCI6IHtcImh0dHAtZXF1aXZcIjoge1wiY29udGVudC10eXBlXCI6IDF9LCBcIm5hbWVcIjoge1wiZGVzY3JpcHRpb25cIjogMSwgXCJrZXl3b3Jkc1wiOiAxfSwgXCJjb250ZW50XCI6IHtcInRleHQvaHRtbDsgY2hhcnNldD1VVEYtOFwiOiAxfSwgXCJjaGFyc2V0XCI6IDF9LFxuICAgIFwibWV0ZXJcIjoge1widmFsdWVcIjogMSwgXCJtaW5cIjogMSwgXCJtYXhcIjogMSwgXCJsb3dcIjogMSwgXCJoaWdoXCI6IDEsIFwib3B0aW11bVwiOiAxfSxcbiAgICBcIm5hdlwiOiB7fSxcbiAgICBcIm5vc2NyaXB0XCI6IHtcImhyZWZcIjogMX0sXG4gICAgXCJvYmplY3RcIjoge1wicGFyYW1cIjogMSwgXCJkYXRhXCI6IDEsIFwidHlwZVwiOiAxLCBcImhlaWdodFwiIDogMSwgXCJ3aWR0aFwiOiAxLCBcInVzZW1hcFwiOiAxLCBcIm5hbWVcIjogMSwgXCJmb3JtXCI6IDEsIFwiY2xhc3NpZFwiOiAxfSxcbiAgICBcIm9sXCI6IHtcInN0YXJ0XCI6IDEsIFwicmV2ZXJzZWRcIjogMX0sXG4gICAgXCJvcHRncm91cFwiOiB7XCJkaXNhYmxlZFwiOiAxLCBcImxhYmVsXCI6IDF9LFxuICAgIFwib3B0aW9uXCI6IHtcImRpc2FibGVkXCI6IDEsIFwic2VsZWN0ZWRcIjogMSwgXCJsYWJlbFwiOiAxLCBcInZhbHVlXCI6IDF9LFxuICAgIFwib3V0cHV0XCI6IHtcImZvclwiOiAxLCBcImZvcm1cIjogMSwgXCJuYW1lXCI6IDF9LFxuICAgIFwicFwiOiB7fSxcbiAgICBcInBhcmFtXCI6IHtcIm5hbWVcIjogMSwgXCJ2YWx1ZVwiOiAxfSxcbiAgICBcInByZVwiOiB7fSxcbiAgICBcInByb2dyZXNzXCI6IHtcInZhbHVlXCI6IDEsIFwibWF4XCI6IDF9LFxuICAgIFwicVwiOiB7XCJjaXRlXCI6IDF9LFxuICAgIFwicnBcIjoge30sXG4gICAgXCJydFwiOiB7fSxcbiAgICBcInJ1YnlcIjoge30sXG4gICAgXCJzXCI6IHt9LFxuICAgIFwic2FtcFwiOiB7fSxcbiAgICBcInNjcmlwdFwiOiB7XCJjaGFyc2V0XCI6IDEsIFwidHlwZVwiOiB7XCJ0ZXh0L2phdmFzY3JpcHRcIjogMX0sIFwic3JjXCI6IDEsIFwiZGVmZXJcIjogMSwgXCJhc3luY1wiOiAxfSxcbiAgICBcInNlbGVjdFwiOiB7XCJhdXRvZm9jdXNcIjogMSwgXCJkaXNhYmxlZFwiOiAxLCBcImZvcm1cIjogMSwgXCJtdWx0aXBsZVwiOiB7XCJtdWx0aXBsZVwiOiAxfSwgXCJuYW1lXCI6IDEsIFwic2l6ZVwiOiAxLCBcInJlYWRvbmx5XCI6e1wicmVhZG9ubHlcIjogMX19LFxuICAgIFwic21hbGxcIjoge30sXG4gICAgXCJzb3VyY2VcIjoge1wic3JjXCI6IDEsIFwidHlwZVwiOiAxLCBcIm1lZGlhXCI6IDF9LFxuICAgIFwic3BhblwiOiB7fSxcbiAgICBcInN0cm9uZ1wiOiB7fSxcbiAgICBcInN0eWxlXCI6IHtcInR5cGVcIjogMSwgXCJtZWRpYVwiOiB7XCJhbGxcIjogMSwgXCJzY3JlZW5cIjogMSwgXCJwcmludFwiOiAxfSwgXCJzY29wZWRcIjogMX0sXG4gICAgXCJzdWJcIjoge30sXG4gICAgXCJzdXBcIjoge30sXG4gICAgXCJzdmdcIjoge30sXG4gICAgXCJ0YWJsZVwiOiB7XCJzdW1tYXJ5XCI6IDF9LFxuICAgIFwidGJvZHlcIjoge30sXG4gICAgXCJ0ZFwiOiB7XCJoZWFkZXJzXCI6IDEsIFwicm93c3BhblwiOiAxLCBcImNvbHNwYW5cIjogMX0sXG4gICAgXCJ0ZXh0YXJlYVwiOiB7XCJhdXRvZm9jdXNcIjoge1wiYXV0b2ZvY3VzXCI6IDF9LCBcImRpc2FibGVkXCI6IHtcImRpc2FibGVkXCI6IDF9LCBcImZvcm1cIjogMSwgXCJtYXhsZW5ndGhcIjogMSwgXCJuYW1lXCI6IDEsIFwicGxhY2Vob2xkZXJcIjogMSwgXCJyZWFkb25seVwiOiB7XCJyZWFkb25seVwiOiAxfSwgXCJyZXF1aXJlZFwiOiB7XCJyZXF1aXJlZFwiOiAxfSwgXCJyb3dzXCI6IDEsIFwiY29sc1wiOiAxLCBcIndyYXBcIjoge1wib25cIjogMSwgXCJvZmZcIjogMSwgXCJoYXJkXCI6IDEsIFwic29mdFwiOiAxfX0sXG4gICAgXCJ0Zm9vdFwiOiB7fSxcbiAgICBcInRoXCI6IHtcImhlYWRlcnNcIjogMSwgXCJyb3dzcGFuXCI6IDEsIFwiY29sc3BhblwiOiAxLCBcInNjb3BlXCI6IDF9LFxuICAgIFwidGhlYWRcIjoge30sXG4gICAgXCJ0aW1lXCI6IHtcImRhdGV0aW1lXCI6IDF9LFxuICAgIFwidGl0bGVcIjoge30sXG4gICAgXCJ0clwiOiB7fSxcbiAgICBcInRyYWNrXCI6IHtcImtpbmRcIjogMSwgXCJzcmNcIjogMSwgXCJzcmNsYW5nXCI6IDEsIFwibGFiZWxcIjogMSwgXCJkZWZhdWx0XCI6IDF9LFxuICAgIFwic2VjdGlvblwiOiB7fSxcbiAgICBcInN1bW1hcnlcIjoge30sXG4gICAgXCJ1XCI6IHt9LFxuICAgIFwidWxcIjoge30sXG4gICAgXCJ2YXJcIjoge30sXG4gICAgXCJ2aWRlb1wiOiB7XCJzcmNcIjogMSwgXCJhdXRvYnVmZmVyXCI6IDEsIFwiYXV0b3BsYXlcIjoge1wiYXV0b3BsYXlcIjogMX0sIFwibG9vcFwiOiB7XCJsb29wXCI6IDF9LCBcImNvbnRyb2xzXCI6IHtcImNvbnRyb2xzXCI6IDF9LCBcIndpZHRoXCI6IDEsIFwiaGVpZ2h0XCI6IDEsIFwicG9zdGVyXCI6IDEsIFwibXV0ZWRcIjoge1wibXV0ZWRcIjogMX0sIFwicHJlbG9hZFwiOiB7XCJhdXRvXCI6IDEsIFwibWV0YWRhdGFcIjogMSwgXCJub25lXCI6IDF9fSxcbiAgICBcIndiclwiOiB7fVxufTtcblxudmFyIGVsZW1lbnRzID0gT2JqZWN0LmtleXMoYXR0cmlidXRlTWFwKTtcblxuZnVuY3Rpb24gaXModG9rZW4sIHR5cGUpIHtcbiAgICByZXR1cm4gdG9rZW4udHlwZS5sYXN0SW5kZXhPZih0eXBlICsgXCIueG1sXCIpID4gLTE7XG59XG5cbmZ1bmN0aW9uIGZpbmRUYWdOYW1lKHNlc3Npb24sIHBvcykge1xuICAgIHZhciBpdGVyYXRvciA9IG5ldyBUb2tlbkl0ZXJhdG9yKHNlc3Npb24sIHBvcy5yb3csIHBvcy5jb2x1bW4pO1xuICAgIHZhciB0b2tlbiA9IGl0ZXJhdG9yLmdldEN1cnJlbnRUb2tlbigpO1xuICAgIHdoaWxlICh0b2tlbiAmJiAhaXModG9rZW4sIFwidGFnLW5hbWVcIikpe1xuICAgICAgICB0b2tlbiA9IGl0ZXJhdG9yLnN0ZXBCYWNrd2FyZCgpO1xuICAgIH1cbiAgICBpZiAodG9rZW4pXG4gICAgICAgIHJldHVybiB0b2tlbi52YWx1ZTtcbn1cblxuZnVuY3Rpb24gZmluZEF0dHJpYnV0ZU5hbWUoc2Vzc2lvbiwgcG9zKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0gbmV3IFRva2VuSXRlcmF0b3Ioc2Vzc2lvbiwgcG9zLnJvdywgcG9zLmNvbHVtbik7XG4gICAgdmFyIHRva2VuID0gaXRlcmF0b3IuZ2V0Q3VycmVudFRva2VuKCk7XG4gICAgd2hpbGUgKHRva2VuICYmICFpcyh0b2tlbiwgXCJhdHRyaWJ1dGUtbmFtZVwiKSl7XG4gICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCk7XG4gICAgfVxuICAgIGlmICh0b2tlbilcbiAgICAgICAgcmV0dXJuIHRva2VuLnZhbHVlO1xufVxuXG52YXIgSHRtbENvbXBsZXRpb25zID0gZnVuY3Rpb24oKSB7XG5cbn07XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuZ2V0Q29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgdmFyIHRva2VuID0gc2Vzc2lvbi5nZXRUb2tlbkF0KHBvcy5yb3csIHBvcy5jb2x1bW4pO1xuXG4gICAgICAgIGlmICghdG9rZW4pXG4gICAgICAgICAgICByZXR1cm4gW107XG5cbiAgICAgICAgLy8gdGFnIG5hbWVcbiAgICAgICAgaWYgKGlzKHRva2VuLCBcInRhZy1uYW1lXCIpIHx8IGlzKHRva2VuLCBcInRhZy1vcGVuXCIpIHx8IGlzKHRva2VuLCBcImVuZC10YWctb3BlblwiKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFRhZ0NvbXBsZXRpb25zKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCk7XG5cbiAgICAgICAgLy8gdGFnIGF0dHJpYnV0ZVxuICAgICAgICBpZiAoaXModG9rZW4sIFwidGFnLXdoaXRlc3BhY2VcIikgfHwgaXModG9rZW4sIFwiYXR0cmlidXRlLW5hbWVcIikpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGVDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuICAgICAgICAgICAgXG4gICAgICAgIC8vIHRhZyBhdHRyaWJ1dGUgdmFsdWVzXG4gICAgICAgIGlmIChpcyh0b2tlbiwgXCJhdHRyaWJ1dGUtdmFsdWVcIikpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRBdHRyaWJ1dGVWYWx1ZUNvbXBsZXRpb25zKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCk7XG4gICAgICAgICAgICBcbiAgICAgICAgLy8gSFRNTCBlbnRpdGllc1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShwb3Mucm93KS5zdWJzdHIoMCwgcG9zLmNvbHVtbik7XG4gICAgICAgIGlmICgvJlthLXpdKiQvaS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SFRNTEVudGl0eUNvbXBsZXRpb25zKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCk7XG5cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH07XG5cbiAgICB0aGlzLmdldFRhZ0NvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHJldHVybiBlbGVtZW50cy5tYXAoZnVuY3Rpb24oZWxlbWVudCl7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiBlbGVtZW50LFxuICAgICAgICAgICAgICAgIG1ldGE6IFwidGFnXCIsXG4gICAgICAgICAgICAgICAgc2NvcmU6IDEwMDAwMDBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEF0dHJpYnV0ZUNvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHZhciB0YWdOYW1lID0gZmluZFRhZ05hbWUoc2Vzc2lvbiwgcG9zKTtcbiAgICAgICAgaWYgKCF0YWdOYW1lKVxuICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICB2YXIgYXR0cmlidXRlcyA9IGdsb2JhbEF0dHJpYnV0ZXM7XG4gICAgICAgIGlmICh0YWdOYW1lIGluIGF0dHJpYnV0ZU1hcCkge1xuICAgICAgICAgICAgYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMuY29uY2F0KE9iamVjdC5rZXlzKGF0dHJpYnV0ZU1hcFt0YWdOYW1lXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhdHRyaWJ1dGVzLm1hcChmdW5jdGlvbihhdHRyaWJ1dGUpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBhdHRyaWJ1dGUsXG4gICAgICAgICAgICAgICAgc25pcHBldDogYXR0cmlidXRlICsgJz1cIiQwXCInLFxuICAgICAgICAgICAgICAgIG1ldGE6IFwiYXR0cmlidXRlXCIsXG4gICAgICAgICAgICAgICAgc2NvcmU6IDEwMDAwMDBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEF0dHJpYnV0ZVZhbHVlQ29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgdmFyIHRhZ05hbWUgPSBmaW5kVGFnTmFtZShzZXNzaW9uLCBwb3MpO1xuICAgICAgICB2YXIgYXR0cmlidXRlTmFtZSA9IGZpbmRBdHRyaWJ1dGVOYW1lKHNlc3Npb24sIHBvcyk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIXRhZ05hbWUpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgICAgaWYgKHRhZ05hbWUgaW4gYXR0cmlidXRlTWFwICYmIGF0dHJpYnV0ZU5hbWUgaW4gYXR0cmlidXRlTWFwW3RhZ05hbWVdICYmIHR5cGVvZiBhdHRyaWJ1dGVNYXBbdGFnTmFtZV1bYXR0cmlidXRlTmFtZV0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IE9iamVjdC5rZXlzKGF0dHJpYnV0ZU1hcFt0YWdOYW1lXVthdHRyaWJ1dGVOYW1lXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlcy5tYXAoZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBzbmlwcGV0OiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBtZXRhOiBcImF0dHJpYnV0ZSB2YWx1ZVwiLFxuICAgICAgICAgICAgICAgIHNjb3JlOiAxMDAwMDAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5nZXRIVE1MRW50aXR5Q29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgdmFyIHZhbHVlcyA9IFsnQWFjdXRlOycsICdhYWN1dGU7JywgJ0FjaXJjOycsICdhY2lyYzsnLCAnYWN1dGU7JywgJ0FFbGlnOycsICdhZWxpZzsnLCAnQWdyYXZlOycsICdhZ3JhdmU7JywgJ2FsZWZzeW07JywgJ0FscGhhOycsICdhbHBoYTsnLCAnYW1wOycsICdhbmQ7JywgJ2FuZzsnLCAnQXJpbmc7JywgJ2FyaW5nOycsICdhc3ltcDsnLCAnQXRpbGRlOycsICdhdGlsZGU7JywgJ0F1bWw7JywgJ2F1bWw7JywgJ2JkcXVvOycsICdCZXRhOycsICdiZXRhOycsICdicnZiYXI7JywgJ2J1bGw7JywgJ2NhcDsnLCAnQ2NlZGlsOycsICdjY2VkaWw7JywgJ2NlZGlsOycsICdjZW50OycsICdDaGk7JywgJ2NoaTsnLCAnY2lyYzsnLCAnY2x1YnM7JywgJ2Nvbmc7JywgJ2NvcHk7JywgJ2NyYXJyOycsICdjdXA7JywgJ2N1cnJlbjsnLCAnRGFnZ2VyOycsICdkYWdnZXI7JywgJ2RBcnI7JywgJ2RhcnI7JywgJ2RlZzsnLCAnRGVsdGE7JywgJ2RlbHRhOycsICdkaWFtczsnLCAnZGl2aWRlOycsICdFYWN1dGU7JywgJ2VhY3V0ZTsnLCAnRWNpcmM7JywgJ2VjaXJjOycsICdFZ3JhdmU7JywgJ2VncmF2ZTsnLCAnZW1wdHk7JywgJ2Vtc3A7JywgJ2Vuc3A7JywgJ0Vwc2lsb247JywgJ2Vwc2lsb247JywgJ2VxdWl2OycsICdFdGE7JywgJ2V0YTsnLCAnRVRIOycsICdldGg7JywgJ0V1bWw7JywgJ2V1bWw7JywgJ2V1cm87JywgJ2V4aXN0OycsICdmbm9mOycsICdmb3JhbGw7JywgJ2ZyYWMxMjsnLCAnZnJhYzE0OycsICdmcmFjMzQ7JywgJ2ZyYXNsOycsICdHYW1tYTsnLCAnZ2FtbWE7JywgJ2dlOycsICdndDsnLCAnaEFycjsnLCAnaGFycjsnLCAnaGVhcnRzOycsICdoZWxsaXA7JywgJ0lhY3V0ZTsnLCAnaWFjdXRlOycsICdJY2lyYzsnLCAnaWNpcmM7JywgJ2lleGNsOycsICdJZ3JhdmU7JywgJ2lncmF2ZTsnLCAnaW1hZ2U7JywgJ2luZmluOycsICdpbnQ7JywgJ0lvdGE7JywgJ2lvdGE7JywgJ2lxdWVzdDsnLCAnaXNpbjsnLCAnSXVtbDsnLCAnaXVtbDsnLCAnS2FwcGE7JywgJ2thcHBhOycsICdMYW1iZGE7JywgJ2xhbWJkYTsnLCAnbGFuZzsnLCAnbGFxdW87JywgJ2xBcnI7JywgJ2xhcnI7JywgJ2xjZWlsOycsICdsZHF1bzsnLCAnbGU7JywgJ2xmbG9vcjsnLCAnbG93YXN0OycsICdsb3o7JywgJ2xybTsnLCAnbHNhcXVvOycsICdsc3F1bzsnLCAnbHQ7JywgJ21hY3I7JywgJ21kYXNoOycsICdtaWNybzsnLCAnbWlkZG90OycsICdtaW51czsnLCAnTXU7JywgJ211OycsICduYWJsYTsnLCAnbmJzcDsnLCAnbmRhc2g7JywgJ25lOycsICduaTsnLCAnbm90OycsICdub3RpbjsnLCAnbnN1YjsnLCAnTnRpbGRlOycsICdudGlsZGU7JywgJ051OycsICdudTsnLCAnT2FjdXRlOycsICdvYWN1dGU7JywgJ09jaXJjOycsICdvY2lyYzsnLCAnT0VsaWc7JywgJ29lbGlnOycsICdPZ3JhdmU7JywgJ29ncmF2ZTsnLCAnb2xpbmU7JywgJ09tZWdhOycsICdvbWVnYTsnLCAnT21pY3JvbjsnLCAnb21pY3JvbjsnLCAnb3BsdXM7JywgJ29yOycsICdvcmRmOycsICdvcmRtOycsICdPc2xhc2g7JywgJ29zbGFzaDsnLCAnT3RpbGRlOycsICdvdGlsZGU7JywgJ290aW1lczsnLCAnT3VtbDsnLCAnb3VtbDsnLCAncGFyYTsnLCAncGFydDsnLCAncGVybWlsOycsICdwZXJwOycsICdQaGk7JywgJ3BoaTsnLCAnUGk7JywgJ3BpOycsICdwaXY7JywgJ3BsdXNtbjsnLCAncG91bmQ7JywgJ1ByaW1lOycsICdwcmltZTsnLCAncHJvZDsnLCAncHJvcDsnLCAnUHNpOycsICdwc2k7JywgJ3F1b3Q7JywgJ3JhZGljOycsICdyYW5nOycsICdyYXF1bzsnLCAnckFycjsnLCAncmFycjsnLCAncmNlaWw7JywgJ3JkcXVvOycsICdyZWFsOycsICdyZWc7JywgJ3JmbG9vcjsnLCAnUmhvOycsICdyaG87JywgJ3JsbTsnLCAncnNhcXVvOycsICdyc3F1bzsnLCAnc2JxdW87JywgJ1NjYXJvbjsnLCAnc2Nhcm9uOycsICdzZG90OycsICdzZWN0OycsICdzaHk7JywgJ1NpZ21hOycsICdzaWdtYTsnLCAnc2lnbWFmOycsICdzaW07JywgJ3NwYWRlczsnLCAnc3ViOycsICdzdWJlOycsICdzdW07JywgJ3N1cDsnLCAnc3VwMTsnLCAnc3VwMjsnLCAnc3VwMzsnLCAnc3VwZTsnLCAnc3psaWc7JywgJ1RhdTsnLCAndGF1OycsICd0aGVyZTQ7JywgJ1RoZXRhOycsICd0aGV0YTsnLCAndGhldGFzeW07JywgJ3RoaW5zcDsnLCAnVEhPUk47JywgJ3Rob3JuOycsICd0aWxkZTsnLCAndGltZXM7JywgJ3RyYWRlOycsICdVYWN1dGU7JywgJ3VhY3V0ZTsnLCAndUFycjsnLCAndWFycjsnLCAnVWNpcmM7JywgJ3VjaXJjOycsICdVZ3JhdmU7JywgJ3VncmF2ZTsnLCAndW1sOycsICd1cHNpaDsnLCAnVXBzaWxvbjsnLCAndXBzaWxvbjsnLCAnVXVtbDsnLCAndXVtbDsnLCAnd2VpZXJwOycsICdYaTsnLCAneGk7JywgJ1lhY3V0ZTsnLCAneWFjdXRlOycsICd5ZW47JywgJ1l1bWw7JywgJ3l1bWw7JywgJ1pldGE7JywgJ3pldGE7JywgJ3p3ajsnLCAnenduajsnXTtcblxuICAgICAgICByZXR1cm4gdmFsdWVzLm1hcChmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNhcHRpb246IHZhbHVlLFxuICAgICAgICAgICAgICAgIHNuaXBwZXQ6IHZhbHVlLFxuICAgICAgICAgICAgICAgIG1ldGE6IFwiaHRtbCBlbnRpdHlcIixcbiAgICAgICAgICAgICAgICBzY29yZTogMTAwMDAwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxufSkuY2FsbChIdG1sQ29tcGxldGlvbnMucHJvdG90eXBlKTtcblxuZXhwb3J0cy5IdG1sQ29tcGxldGlvbnMgPSBIdG1sQ29tcGxldGlvbnM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=