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
var MixedFoldMode = (__webpack_require__(90610).FoldMode);
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

var FoldMode = exports.FoldMode = function(defaultMode, subModes) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjIyMzQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7QUFDYixVQUFVLG1CQUFPLENBQUMsSUFBZTtBQUNqQyxnQkFBZ0IsK0NBQWlDO0FBQ2pELHNCQUFzQixxREFBbUM7QUFDekQsb0JBQW9CLDBDQUE2Qzs7QUFFakUsVUFBVSxrRUFBa0U7QUFDNUU7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBLGdDQUFnQztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUJBQXVCLEVBQUU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBLFNBQW9COzs7Ozs7OztBQ3pGUDs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QixlQUFlLGlDQUFzQjtBQUNyQyx3QkFBd0IsOENBQWtEO0FBQzFFLDJCQUEyQixpREFBd0Q7QUFDbkYsbUJBQW1CLHlDQUErQztBQUNsRSxxQkFBcUIsb0RBQTJDO0FBQ2hFLG1CQUFtQixrREFBdUM7QUFDMUQscUJBQXFCLDhDQUFvQzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLHlCQUF5Qjs7QUFFekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQ3pFQzs7QUFFYjtBQUNBLG1CQUFtQixTQUFTO0FBQzVCLHlCQUF5Qix1Q0FBdUM7QUFDaEUseUJBQXlCLGdCQUFnQjtBQUN6QywwQkFBMEIsd0VBQXdFO0FBQ2xHLDRCQUE0QixrRUFBa0U7QUFDOUYsOEJBQThCLHdCQUF3QjtBQUN0RCx3QkFBd0IseUJBQXlCO0FBQ2pELHdCQUF3QixvREFBb0Q7QUFDNUUsMEJBQTBCLG9EQUFvRDtBQUM5RSxlQUFlLHdEQUF3RDtBQUN2RSxxQkFBcUIsU0FBUztBQUM5QixxQkFBcUIsZ0lBQWdJO0FBQ3JKLHdCQUF3Qiw2QkFBNkI7QUFDckQsZUFBZSx5QkFBeUI7QUFDeEMsY0FBYyw0Q0FBNEM7QUFDMUQsY0FBYyw2QkFBNkI7QUFDM0MsZUFBZSxrTkFBa047QUFDak8sZ0JBQWdCLHVFQUF1RTtBQUN2RixvQkFBb0IscUJBQXFCO0FBQ3pDLGNBQWMsaUNBQWlDO0FBQy9DLG9CQUFvQix5TEFBeUw7QUFDN00sa0JBQWtCLHlCQUF5QjtBQUMzQyxvQkFBb0IsdUJBQXVCO0FBQzNDLG1CQUFtQix5QkFBeUI7QUFDNUMscUJBQXFCLDZCQUE2QjtBQUNsRCxlQUFlLHlCQUF5QjtBQUN4QyxhQUFhLHlCQUF5QjtBQUN0Qyx1QkFBdUIsWUFBWTtBQUNuQyxvQkFBb0IsWUFBWTtBQUNoQyx3QkFBd0IscU9BQXFPO0FBQzdQLGVBQWUseUJBQXlCO0FBQ3hDLHFCQUFxQix5QkFBeUI7QUFDOUMsb0JBQW9CLHlCQUF5QjtBQUM3QyxtQkFBbUIseUJBQXlCO0FBQzVDLHNCQUFzQix5QkFBeUI7QUFDL0MsbUJBQW1CLHlCQUF5QjtBQUM1QyxrQkFBa0IseUJBQXlCO0FBQzNDLG1CQUFtQix5QkFBeUI7QUFDNUMsa0JBQWtCLHlCQUF5QjtBQUMzQyxpQkFBaUIsa0RBQWtEO0FBQ25FLG1CQUFtQixrREFBa0Q7QUFDckUsbUJBQW1CLGtEQUFrRDtBQUNyRSxnQkFBZ0IseUJBQXlCO0FBQ3pDLG9CQUFvQix5QkFBeUI7QUFDN0Msc0JBQXNCLHlCQUF5QjtBQUMvQyx1QkFBdUIseUJBQXlCO0FBQ2hELHFCQUFxQix5QkFBeUI7QUFDOUMseUJBQXlCLDBEQUEwRDtBQUNuRiwwQkFBMEIsMERBQTBEO0FBQ3BGLGlCQUFpQixzREFBc0Q7QUFDdkUsY0FBYyx5QkFBeUI7QUFDdkMscUJBQXFCLHNCQUFzQjtBQUMzQyx3QkFBd0IseURBQXlEO0FBQ2pGLG1CQUFtQixpREFBaUQ7QUFDcEUsdUJBQXVCLDJEQUEyRDtBQUNsRixZQUFZLHlCQUF5QjtBQUNyQyx1QkFBdUIsc0JBQXNCO0FBQzdDLG1CQUFtQiwwQkFBMEI7QUFDN0Msb0JBQW9CLGlFQUFpRTtBQUNyRixjQUFjLHlCQUF5QjtBQUN2QyxxQkFBcUIsWUFBWTs7QUFFakM7QUFDQSxlQUFlLDBCQUEwQjs7QUFFekMsb0JBQW9CLHdCQUF3QjtBQUM1QyxzQkFBc0IsNkNBQTZDOztBQUVuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQix1Q0FBdUM7QUFDekQsdUJBQXVCLHVDQUF1QztBQUM5RCwwQkFBMEI7QUFDMUI7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7O0FBRUE7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0EsMkRBQTJEOztBQUUzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQSxDQUFDOztBQUVELFNBQXNCOzs7Ozs7OztBQ3JMVDs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBZTtBQUNqQyxvQkFBb0IscUNBQTJCO0FBQy9DLGtCQUFrQiw4Q0FBeUI7QUFDM0MscUJBQXFCLDhDQUE0Qjs7QUFFakQsZUFBZSxnQkFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOzs7Ozs7OztBQ2RhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFlO0FBQ2pDLG1CQUFtQixxQ0FBK0I7O0FBRWxELGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7QUNqRFk7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsV0FBVyxtQkFBTyxDQUFDLEtBQWE7QUFDaEMsZUFBZSxpQ0FBc0I7QUFDckMscUJBQXFCLGlDQUE0QjtBQUNqRCxjQUFjLGlDQUFxQjtBQUNuQyx5QkFBeUIsK0NBQW9EO0FBQzdFLG1CQUFtQix5Q0FBdUM7QUFDMUQsbUJBQW1CLG9DQUFrQztBQUNyRCxzQkFBc0IsNENBQTZDO0FBQ25FLG1CQUFtQix5Q0FBK0M7O0FBRWxFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEseUJBQXlCOztBQUV6Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0NBQXdDLDhCQUE4Qjs7QUFFdEU7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRCxZQUFZOzs7Ozs7OztBQzFFQzs7QUFFYixvQkFBb0IsMENBQTBDOztBQUU5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFVBQVUsc0JBQXNCLHNCQUFzQixxQkFBcUIsZ0tBQWdLLHVDQUF1QztBQUNsUixjQUFjO0FBQ2QsaUJBQWlCO0FBQ2pCLGFBQWEscUhBQXFIO0FBQ2xJLGdCQUFnQixhQUFhO0FBQzdCLGVBQWU7QUFDZixjQUFjLHdDQUF3QyxjQUFjLFdBQVcsVUFBVSxlQUFlLGNBQWMsWUFBWSxXQUFXLGNBQWMsc0NBQXNDO0FBQ2pNLFdBQVc7QUFDWCxhQUFhLHVCQUF1QjtBQUNwQyxhQUFhO0FBQ2IsYUFBYTtBQUNiLG1CQUFtQixVQUFVO0FBQzdCLGFBQWEsdU1BQXVNO0FBQ3BOLFlBQVk7QUFDWixlQUFlLDZCQUE2QixjQUFjLHVJQUF1SSwwQkFBMEI7QUFDM04sZUFBZSx3QkFBd0I7QUFDdkMsaUJBQWlCO0FBQ2pCLGNBQWM7QUFDZCxjQUFjO0FBQ2QsWUFBWSxVQUFVO0FBQ3RCLGlCQUFpQixVQUFVO0FBQzNCLGdCQUFnQiw2RkFBNkY7QUFDN0csY0FBYztBQUNkLGtCQUFrQjtBQUNsQixZQUFZO0FBQ1osWUFBWSx5QkFBeUI7QUFDckMsZ0JBQWdCLFVBQVU7QUFDMUIsYUFBYTtBQUNiLGVBQWUsVUFBVTtBQUN6QixhQUFhO0FBQ2IsWUFBWTtBQUNaLFlBQVk7QUFDWixZQUFZO0FBQ1osY0FBYyw2Q0FBNkM7QUFDM0QsaUJBQWlCLG9DQUFvQztBQUNyRCxvQkFBb0I7QUFDcEIsZ0JBQWdCO0FBQ2hCLGdCQUFnQjtBQUNoQixhQUFhLGlFQUFpRSxpRUFBaUUsYUFBYSxvQkFBb0IseUNBQXlDLHVCQUF1QjtBQUNoUCxZQUFZO0FBQ1osWUFBWTtBQUNaLFlBQVk7QUFDWixZQUFZO0FBQ1osWUFBWTtBQUNaLFlBQVk7QUFDWixjQUFjO0FBQ2QsZ0JBQWdCO0FBQ2hCLFlBQVk7QUFDWixhQUFhLGNBQWM7QUFDM0IsV0FBVztBQUNYLGVBQWUsMERBQTBELHdGQUF3RixlQUFlLGVBQWU7QUFDL0wsWUFBWSxxRUFBcUU7QUFDakY7QUFDQSxpQkFBaUIsa1NBQWtTO0FBQ25ULGdEQUFnRCxrQkFBa0IsZ0JBQWdCLGVBQWUsY0FBYyxhQUFhLGVBQWUsY0FBYyw4Q0FBOEMsa0ZBQWtGLGlCQUFpQixvQkFBb0IscUJBQXFCLG9CQUFvQixpQkFBaUIsaURBQWlELDJFQUEyRSxjQUFjLDBEQUEwRCxjQUFjLGVBQWUsY0FBYyxxRUFBcUU7QUFDNXFCLFlBQVkseUJBQXlCO0FBQ3JDLGFBQWE7QUFDYixlQUFlLDhCQUE4QixlQUFlLGVBQWUsY0FBYyx5QkFBeUIsNEJBQTRCLFlBQVk7QUFDMUosY0FBYyxvQkFBb0I7QUFDbEMsZ0JBQWdCO0FBQ2hCLFdBQVcsV0FBVztBQUN0QixhQUFhLGtDQUFrQywyQkFBMkIsWUFBWSxrQ0FBa0MsV0FBVywrREFBK0QsYUFBYTtBQUMvTSxjQUFjO0FBQ2QsWUFBWSxVQUFVO0FBQ3RCLGNBQWM7QUFDZCxjQUFjO0FBQ2QsYUFBYSxzQkFBc0I7QUFDbkMsYUFBYSxlQUFlLGtCQUFrQixXQUFXLGdDQUFnQyxjQUFjLFlBQVksa0JBQWtCLGVBQWU7QUFDcEosY0FBYyxrRUFBa0U7QUFDaEYsYUFBYTtBQUNiLGlCQUFpQixVQUFVO0FBQzNCLGVBQWUsNEdBQTRHO0FBQzNILFdBQVcsMEJBQTBCO0FBQ3JDLGlCQUFpQiwwQkFBMEI7QUFDM0MsZUFBZSxxREFBcUQ7QUFDcEUsZUFBZSwrQkFBK0I7QUFDOUMsV0FBVztBQUNYLGNBQWMsc0JBQXNCO0FBQ3BDLGFBQWE7QUFDYixpQkFBaUIscUJBQXFCO0FBQ3RDLFVBQVUsVUFBVTtBQUNwQixZQUFZO0FBQ1osWUFBWTtBQUNaLGNBQWM7QUFDZCxXQUFXO0FBQ1gsY0FBYztBQUNkLGVBQWUsdUJBQXVCLHFCQUFxQixtQ0FBbUM7QUFDOUYsZUFBZSx1REFBdUQsY0FBYyxvQ0FBb0MsZUFBZTtBQUN2SSxlQUFlO0FBQ2YsZUFBZSxnQ0FBZ0M7QUFDL0MsY0FBYztBQUNkLGdCQUFnQjtBQUNoQixjQUFjLHFCQUFxQixrQ0FBa0MsY0FBYztBQUNuRixhQUFhO0FBQ2IsYUFBYTtBQUNiLGFBQWE7QUFDYixjQUFjLGFBQWE7QUFDM0IsZUFBZTtBQUNmLFdBQVcseUNBQXlDO0FBQ3BELGlCQUFpQixjQUFjLGVBQWUsZUFBZSxjQUFjLHVFQUF1RSxjQUFjLGVBQWUsY0FBYyxpQ0FBaUMseUNBQXlDO0FBQ3ZRLGVBQWU7QUFDZixXQUFXLHFEQUFxRDtBQUNoRSxlQUFlO0FBQ2YsYUFBYSxjQUFjO0FBQzNCLGVBQWU7QUFDZixZQUFZO0FBQ1osY0FBYyw0REFBNEQ7QUFDMUUsaUJBQWlCO0FBQ2pCLGlCQUFpQjtBQUNqQixXQUFXO0FBQ1gsWUFBWTtBQUNaLGFBQWE7QUFDYixjQUFjLHdDQUF3QyxjQUFjLFdBQVcsVUFBVSxlQUFlLGNBQWMsa0RBQWtELFdBQVcsY0FBYyxxQ0FBcUM7QUFDdE87QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0EsOEJBQThCLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxZQUFZLFVBQVUsVUFBVSxRQUFRLFFBQVEsUUFBUSxVQUFVLFVBQVUsVUFBVSxXQUFXLFdBQVcsU0FBUyxTQUFTLFVBQVUsU0FBUyxTQUFTLFdBQVcsU0FBUyxRQUFRLFdBQVcsV0FBVyxVQUFVLFNBQVMsUUFBUSxRQUFRLFNBQVMsVUFBVSxTQUFTLFNBQVMsVUFBVSxRQUFRLFdBQVcsV0FBVyxXQUFXLFNBQVMsU0FBUyxRQUFRLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsVUFBVSxTQUFTLFNBQVMsWUFBWSxZQUFZLFVBQVUsUUFBUSxRQUFRLFFBQVEsUUFBUSxTQUFTLFNBQVMsU0FBUyxVQUFVLFNBQVMsV0FBVyxXQUFXLFdBQVcsV0FBVyxVQUFVLFVBQVUsVUFBVSxPQUFPLE9BQU8sU0FBUyxTQUFTLFdBQVcsV0FBVyxXQUFXLFdBQVcsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxRQUFRLFNBQVMsU0FBUyxXQUFXLFNBQVMsU0FBUyxTQUFTLFVBQVUsVUFBVSxXQUFXLFdBQVcsU0FBUyxVQUFVLFNBQVMsU0FBUyxVQUFVLFVBQVUsT0FBTyxXQUFXLFdBQVcsUUFBUSxRQUFRLFdBQVcsVUFBVSxPQUFPLFNBQVMsVUFBVSxVQUFVLFdBQVcsVUFBVSxPQUFPLE9BQU8sVUFBVSxTQUFTLFVBQVUsT0FBTyxPQUFPLFFBQVEsVUFBVSxTQUFTLFdBQVcsV0FBVyxPQUFPLE9BQU8sV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFVBQVUsV0FBVyxXQUFXLFVBQVUsVUFBVSxVQUFVLFlBQVksWUFBWSxVQUFVLE9BQU8sU0FBUyxTQUFTLFdBQVcsV0FBVyxXQUFXLFdBQVcsV0FBVyxTQUFTLFNBQVMsU0FBUyxTQUFTLFdBQVcsU0FBUyxRQUFRLFFBQVEsT0FBTyxPQUFPLFFBQVEsV0FBVyxVQUFVLFVBQVUsVUFBVSxTQUFTLFNBQVMsUUFBUSxRQUFRLFNBQVMsVUFBVSxTQUFTLFVBQVUsU0FBUyxTQUFTLFVBQVUsVUFBVSxTQUFTLFFBQVEsV0FBVyxRQUFRLFFBQVEsUUFBUSxXQUFXLFVBQVUsVUFBVSxXQUFXLFdBQVcsU0FBUyxTQUFTLFFBQVEsVUFBVSxVQUFVLFdBQVcsUUFBUSxXQUFXLFFBQVEsU0FBUyxRQUFRLFFBQVEsU0FBUyxTQUFTLFNBQVMsU0FBUyxVQUFVLFFBQVEsUUFBUSxXQUFXLFVBQVUsVUFBVSxhQUFhLFdBQVcsVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLFdBQVcsV0FBVyxTQUFTLFNBQVMsVUFBVSxVQUFVLFdBQVcsV0FBVyxRQUFRLFVBQVUsWUFBWSxZQUFZLFNBQVMsU0FBUyxXQUFXLE9BQU8sT0FBTyxXQUFXLFdBQVcsUUFBUSxTQUFTLFNBQVMsU0FBUyxTQUFTLFFBQVEsU0FBUzs7QUFFMzRFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBLENBQUM7O0FBRUQsdUJBQXVCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9iZWhhdmlvdXIvY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvY3NzX2NvbXBsZXRpb25zLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9odG1sLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9taXhlZC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2h0bWwuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9odG1sX2NvbXBsZXRpb25zLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJlaGF2aW91ciA9IHJlcXVpcmUoXCIuLi9iZWhhdmlvdXJcIikuQmVoYXZpb3VyO1xudmFyIENzdHlsZUJlaGF2aW91ciA9IHJlcXVpcmUoXCIuL2NzdHlsZVwiKS5Dc3R5bGVCZWhhdmlvdXI7XG52YXIgVG9rZW5JdGVyYXRvciA9IHJlcXVpcmUoXCIuLi8uLi90b2tlbl9pdGVyYXRvclwiKS5Ub2tlbkl0ZXJhdG9yO1xuXG4vKipAdHlwZSB7KG5ldygpID0+IFBhcnRpYWw8aW1wb3J0KFwiLi4vLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5CZWhhdmlvdXI+KX0qL1xudmFyIENzc0JlaGF2aW91ciA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHRoaXMuaW5oZXJpdChDc3R5bGVCZWhhdmlvdXIpO1xuXG4gICAgdGhpcy5hZGQoXCJjb2xvblwiLCBcImluc2VydGlvblwiLCBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbiwgZWRpdG9yLCBzZXNzaW9uLCB0ZXh0KSB7XG4gICAgICAgIGlmICh0ZXh0ID09PSAnOicgJiYgZWRpdG9yLnNlbGVjdGlvbi5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IG5ldyBUb2tlbkl0ZXJhdG9yKHNlc3Npb24sIGN1cnNvci5yb3csIGN1cnNvci5jb2x1bW4pO1xuICAgICAgICAgICAgdmFyIHRva2VuID0gaXRlcmF0b3IuZ2V0Q3VycmVudFRva2VuKCk7XG4gICAgICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4udmFsdWUubWF0Y2goL1xccysvKSkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4udHlwZSA9PT0gJ3N1cHBvcnQudHlwZScpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZG9jLmdldExpbmUoY3Vyc29yLnJvdyk7XG4gICAgICAgICAgICAgICAgdmFyIHJpZ2h0Q2hhciA9IGxpbmUuc3Vic3RyaW5nKGN1cnNvci5jb2x1bW4sIGN1cnNvci5jb2x1bW4gKyAxKTtcbiAgICAgICAgICAgICAgICBpZiAocmlnaHRDaGFyID09PSAnOicpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJycsXG4gICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogWzEsIDFdXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgvXihcXHMrW147XXxcXHMqJCkvLnRlc3QobGluZS5zdWJzdHJpbmcoY3Vyc29yLmNvbHVtbikpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICc6OycsXG4gICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogWzEsIDFdXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZChcImNvbG9uXCIsIFwiZGVsZXRpb25cIiwgZnVuY3Rpb24gKHN0YXRlLCBhY3Rpb24sIGVkaXRvciwgc2Vzc2lvbiwgcmFuZ2UpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkID0gc2Vzc2lvbi5kb2MuZ2V0VGV4dFJhbmdlKHJhbmdlKTtcbiAgICAgICAgaWYgKCFyYW5nZS5pc011bHRpTGluZSgpICYmIHNlbGVjdGVkID09PSAnOicpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBpdGVyYXRvciA9IG5ldyBUb2tlbkl0ZXJhdG9yKHNlc3Npb24sIGN1cnNvci5yb3csIGN1cnNvci5jb2x1bW4pO1xuICAgICAgICAgICAgdmFyIHRva2VuID0gaXRlcmF0b3IuZ2V0Q3VycmVudFRva2VuKCk7XG4gICAgICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4udmFsdWUubWF0Y2goL1xccysvKSkge1xuICAgICAgICAgICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodG9rZW4gJiYgdG9rZW4udHlwZSA9PT0gJ3N1cHBvcnQudHlwZScpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZG9jLmdldExpbmUocmFuZ2Uuc3RhcnQucm93KTtcbiAgICAgICAgICAgICAgICB2YXIgcmlnaHRDaGFyID0gbGluZS5zdWJzdHJpbmcocmFuZ2UuZW5kLmNvbHVtbiwgcmFuZ2UuZW5kLmNvbHVtbiArIDEpO1xuICAgICAgICAgICAgICAgIGlmIChyaWdodENoYXIgPT09ICc7Jykge1xuICAgICAgICAgICAgICAgICAgICByYW5nZS5lbmQuY29sdW1uICsrO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZChcInNlbWljb2xvblwiLCBcImluc2VydGlvblwiLCBmdW5jdGlvbiAoc3RhdGUsIGFjdGlvbiwgZWRpdG9yLCBzZXNzaW9uLCB0ZXh0KSB7XG4gICAgICAgIGlmICh0ZXh0ID09PSAnOycgJiYgZWRpdG9yLnNlbGVjdGlvbi5pc0VtcHR5KCkpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5kb2MuZ2V0TGluZShjdXJzb3Iucm93KTtcbiAgICAgICAgICAgIHZhciByaWdodENoYXIgPSBsaW5lLnN1YnN0cmluZyhjdXJzb3IuY29sdW1uLCBjdXJzb3IuY29sdW1uICsgMSk7XG4gICAgICAgICAgICBpZiAocmlnaHRDaGFyID09PSAnOycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgIHRleHQ6ICcnLFxuICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogWzEsIDFdXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGQoXCIhaW1wb3J0YW50XCIsIFwiaW5zZXJ0aW9uXCIsIGZ1bmN0aW9uIChzdGF0ZSwgYWN0aW9uLCBlZGl0b3IsIHNlc3Npb24sIHRleHQpIHtcbiAgICAgICAgaWYgKHRleHQgPT09ICchJyAmJiBlZGl0b3Iuc2VsZWN0aW9uLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmRvYy5nZXRMaW5lKGN1cnNvci5yb3cpO1xuXG4gICAgICAgICAgICBpZiAoL15cXHMqKDt8fXwkKS8udGVzdChsaW5lLnN1YnN0cmluZyhjdXJzb3IuY29sdW1uKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnIWltcG9ydGFudCcsXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbjogWzEwLCAxMF1cbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbn07XG5vb3AuaW5oZXJpdHMoQ3NzQmVoYXZpb3VyLCBDc3R5bGVCZWhhdmlvdXIpO1xuXG5leHBvcnRzLkNzc0JlaGF2aW91ciA9IENzc0JlaGF2aW91cjtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgQ3NzSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9jc3NfaGlnaGxpZ2h0X3J1bGVzXCIpLkNzc0hpZ2hsaWdodFJ1bGVzO1xudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gcmVxdWlyZShcIi4vbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudFwiKS5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbnZhciBXb3JrZXJDbGllbnQgPSByZXF1aXJlKFwiLi4vd29ya2VyL3dvcmtlcl9jbGllbnRcIikuV29ya2VyQ2xpZW50O1xudmFyIENzc0NvbXBsZXRpb25zID0gcmVxdWlyZShcIi4vY3NzX2NvbXBsZXRpb25zXCIpLkNzc0NvbXBsZXRpb25zO1xudmFyIENzc0JlaGF2aW91ciA9IHJlcXVpcmUoXCIuL2JlaGF2aW91ci9jc3NcIikuQ3NzQmVoYXZpb3VyO1xudmFyIENTdHlsZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IENzc0hpZ2hsaWdodFJ1bGVzO1xuICAgIHRoaXMuJG91dGRlbnQgPSBuZXcgTWF0Y2hpbmdCcmFjZU91dGRlbnQoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSBuZXcgQ3NzQmVoYXZpb3VyKCk7XG4gICAgdGhpcy4kY29tcGxldGVyID0gbmV3IENzc0NvbXBsZXRpb25zKCk7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgQ1N0eWxlRm9sZE1vZGUoKTtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IFwiY1N0eWxlXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiLypcIiwgZW5kOiBcIiovXCJ9O1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgICAgICAvLyBpZ25vcmUgYnJhY2VzIGluIGNvbW1lbnRzXG4gICAgICAgIHZhciB0b2tlbnMgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpLnRva2VucztcbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKlxce1xccyokLyk7XG4gICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgaW5kZW50ICs9IHRhYjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRlbnQ7XG4gICAgfTtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIGlucHV0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRvdXRkZW50LmNoZWNrT3V0ZGVudChsaW5lLCBpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgZG9jLCByb3cpIHtcbiAgICAgICAgdGhpcy4kb3V0ZGVudC5hdXRvT3V0ZGVudChkb2MsIHJvdyk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Q29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGNvbXBsZXRlci5nZXRDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuICAgIH07XG5cbiAgICB0aGlzLmNyZWF0ZVdvcmtlciA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICAgICAgdmFyIHdvcmtlciA9IG5ldyBXb3JrZXJDbGllbnQoW1wiYWNlXCJdLCBcImFjZS9tb2RlL2Nzc193b3JrZXJcIiwgXCJXb3JrZXJcIik7XG4gICAgICAgIHdvcmtlci5hdHRhY2hUb0RvY3VtZW50KHNlc3Npb24uZ2V0RG9jdW1lbnQoKSk7XG5cbiAgICAgICAgd29ya2VyLm9uKFwiYW5ub3RhdGVcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgc2Vzc2lvbi5zZXRBbm5vdGF0aW9ucyhlLmRhdGEpO1xuICAgICAgICB9KTtcblxuICAgICAgICB3b3JrZXIub24oXCJ0ZXJtaW5hdGVcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBzZXNzaW9uLmNsZWFyQW5ub3RhdGlvbnMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHdvcmtlcjtcbiAgICB9O1xuXG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2Nzc1wiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL2Nzc1wiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHByb3BlcnR5TWFwID0ge1xuICAgIFwiYmFja2dyb3VuZFwiOiB7XCIjJDBcIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLWNvbG9yXCI6IHtcIiMkMFwiOiAxLCBcInRyYW5zcGFyZW50XCI6IDEsIFwiZml4ZWRcIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLWltYWdlXCI6IHtcInVybCgnLyQwJylcIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLXJlcGVhdFwiOiB7XCJyZXBlYXRcIjogMSwgXCJyZXBlYXQteFwiOiAxLCBcInJlcGVhdC15XCI6IDEsIFwibm8tcmVwZWF0XCI6IDEsIFwiaW5oZXJpdFwiOiAxfSxcbiAgICBcImJhY2tncm91bmQtcG9zaXRpb25cIjoge1wiYm90dG9tXCI6MiwgXCJjZW50ZXJcIjoyLCBcImxlZnRcIjoyLCBcInJpZ2h0XCI6MiwgXCJ0b3BcIjoyLCBcImluaGVyaXRcIjoyfSxcbiAgICBcImJhY2tncm91bmQtYXR0YWNobWVudFwiOiB7XCJzY3JvbGxcIjogMSwgXCJmaXhlZFwiOiAxfSxcbiAgICBcImJhY2tncm91bmQtc2l6ZVwiOiB7XCJjb3ZlclwiOiAxLCBcImNvbnRhaW5cIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLWNsaXBcIjoge1wiYm9yZGVyLWJveFwiOiAxLCBcInBhZGRpbmctYm94XCI6IDEsIFwiY29udGVudC1ib3hcIjogMX0sXG4gICAgXCJiYWNrZ3JvdW5kLW9yaWdpblwiOiB7XCJib3JkZXItYm94XCI6IDEsIFwicGFkZGluZy1ib3hcIjogMSwgXCJjb250ZW50LWJveFwiOiAxfSxcbiAgICBcImJvcmRlclwiOiB7XCJzb2xpZCAkMFwiOiAxLCBcImRhc2hlZCAkMFwiOiAxLCBcImRvdHRlZCAkMFwiOiAxLCBcIiMkMFwiOiAxfSxcbiAgICBcImJvcmRlci1jb2xvclwiOiB7XCIjJDBcIjogMX0sXG4gICAgXCJib3JkZXItc3R5bGVcIjoge1wic29saWRcIjoyLCBcImRhc2hlZFwiOjIsIFwiZG90dGVkXCI6MiwgXCJkb3VibGVcIjoyLCBcImdyb292ZVwiOjIsIFwiaGlkZGVuXCI6MiwgXCJpbmhlcml0XCI6MiwgXCJpbnNldFwiOjIsIFwibm9uZVwiOjIsIFwib3V0c2V0XCI6MiwgXCJyaWRnZWRcIjoyfSxcbiAgICBcImJvcmRlci1jb2xsYXBzZVwiOiB7XCJjb2xsYXBzZVwiOiAxLCBcInNlcGFyYXRlXCI6IDF9LFxuICAgIFwiYm90dG9tXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwiY2xlYXJcIjoge1wibGVmdFwiOiAxLCBcInJpZ2h0XCI6IDEsIFwiYm90aFwiOiAxLCBcIm5vbmVcIjogMX0sXG4gICAgXCJjb2xvclwiOiB7XCIjJDBcIjogMSwgXCJyZ2IoIyQwMCwwLDApXCI6IDF9LFxuICAgIFwiY3Vyc29yXCI6IHtcImRlZmF1bHRcIjogMSwgXCJwb2ludGVyXCI6IDEsIFwibW92ZVwiOiAxLCBcInRleHRcIjogMSwgXCJ3YWl0XCI6IDEsIFwiaGVscFwiOiAxLCBcInByb2dyZXNzXCI6IDEsIFwibi1yZXNpemVcIjogMSwgXCJuZS1yZXNpemVcIjogMSwgXCJlLXJlc2l6ZVwiOiAxLCBcInNlLXJlc2l6ZVwiOiAxLCBcInMtcmVzaXplXCI6IDEsIFwic3ctcmVzaXplXCI6IDEsIFwidy1yZXNpemVcIjogMSwgXCJudy1yZXNpemVcIjogMX0sXG4gICAgXCJkaXNwbGF5XCI6IHtcIm5vbmVcIjogMSwgXCJibG9ja1wiOiAxLCBcImlubGluZVwiOiAxLCBcImlubGluZS1ibG9ja1wiOiAxLCBcInRhYmxlLWNlbGxcIjogMX0sXG4gICAgXCJlbXB0eS1jZWxsc1wiOiB7XCJzaG93XCI6IDEsIFwiaGlkZVwiOiAxfSxcbiAgICBcImZsb2F0XCI6IHtcImxlZnRcIjogMSwgXCJyaWdodFwiOiAxLCBcIm5vbmVcIjogMX0sXG4gICAgXCJmb250LWZhbWlseVwiOiB7XCJBcmlhbFwiOjIsXCJDb21pYyBTYW5zIE1TXCI6MixcIkNvbnNvbGFzXCI6MixcIkNvdXJpZXIgTmV3XCI6MixcIkNvdXJpZXJcIjoyLFwiR2VvcmdpYVwiOjIsXCJNb25vc3BhY2VcIjoyLFwiU2Fucy1TZXJpZlwiOjIsIFwiU2Vnb2UgVUlcIjoyLFwiVGFob21hXCI6MixcIlRpbWVzIE5ldyBSb21hblwiOjIsXCJUcmVidWNoZXQgTVNcIjoyLFwiVmVyZGFuYVwiOiAxfSxcbiAgICBcImZvbnQtc2l6ZVwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcImZvbnQtd2VpZ2h0XCI6IHtcImJvbGRcIjogMSwgXCJub3JtYWxcIjogMX0sXG4gICAgXCJmb250LXN0eWxlXCI6IHtcIml0YWxpY1wiOiAxLCBcIm5vcm1hbFwiOiAxfSxcbiAgICBcImZvbnQtdmFyaWFudFwiOiB7XCJub3JtYWxcIjogMSwgXCJzbWFsbC1jYXBzXCI6IDF9LFxuICAgIFwiaGVpZ2h0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibGVmdFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcImxldHRlci1zcGFjaW5nXCI6IHtcIm5vcm1hbFwiOiAxfSxcbiAgICBcImxpbmUtaGVpZ2h0XCI6IHtcIm5vcm1hbFwiOiAxfSxcbiAgICBcImxpc3Qtc3R5bGUtdHlwZVwiOiB7XCJub25lXCI6IDEsIFwiZGlzY1wiOiAxLCBcImNpcmNsZVwiOiAxLCBcInNxdWFyZVwiOiAxLCBcImRlY2ltYWxcIjogMSwgXCJkZWNpbWFsLWxlYWRpbmctemVyb1wiOiAxLCBcImxvd2VyLXJvbWFuXCI6IDEsIFwidXBwZXItcm9tYW5cIjogMSwgXCJsb3dlci1ncmVla1wiOiAxLCBcImxvd2VyLWxhdGluXCI6IDEsIFwidXBwZXItbGF0aW5cIjogMSwgXCJnZW9yZ2lhblwiOiAxLCBcImxvd2VyLWFscGhhXCI6IDEsIFwidXBwZXItYWxwaGFcIjogMX0sXG4gICAgXCJtYXJnaW5cIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtYXJnaW4tcmlnaHRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtYXJnaW4tbGVmdFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1hcmdpbi10b3BcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtYXJnaW4tYm90dG9tXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwibWF4LWhlaWdodFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1heC13aWR0aFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcIm1pbi1oZWlnaHRcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJtaW4td2lkdGhcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJvdmVyZmxvd1wiOiB7XCJoaWRkZW5cIjogMSwgXCJ2aXNpYmxlXCI6IDEsIFwiYXV0b1wiOiAxLCBcInNjcm9sbFwiOiAxfSxcbiAgICBcIm92ZXJmbG93LXhcIjoge1wiaGlkZGVuXCI6IDEsIFwidmlzaWJsZVwiOiAxLCBcImF1dG9cIjogMSwgXCJzY3JvbGxcIjogMX0sXG4gICAgXCJvdmVyZmxvdy15XCI6IHtcImhpZGRlblwiOiAxLCBcInZpc2libGVcIjogMSwgXCJhdXRvXCI6IDEsIFwic2Nyb2xsXCI6IDF9LFxuICAgIFwicGFkZGluZ1wiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcInBhZGRpbmctdG9wXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwicGFkZGluZy1yaWdodFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcInBhZGRpbmctYm90dG9tXCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwicGFkZGluZy1sZWZ0XCI6IHtcInB4XCI6IDEsIFwiZW1cIjogMSwgXCIlXCI6IDF9LFxuICAgIFwicGFnZS1icmVhay1hZnRlclwiOiB7XCJhdXRvXCI6IDEsIFwiYWx3YXlzXCI6IDEsIFwiYXZvaWRcIjogMSwgXCJsZWZ0XCI6IDEsIFwicmlnaHRcIjogMX0sXG4gICAgXCJwYWdlLWJyZWFrLWJlZm9yZVwiOiB7XCJhdXRvXCI6IDEsIFwiYWx3YXlzXCI6IDEsIFwiYXZvaWRcIjogMSwgXCJsZWZ0XCI6IDEsIFwicmlnaHRcIjogMX0sXG4gICAgXCJwb3NpdGlvblwiOiB7XCJhYnNvbHV0ZVwiOiAxLCBcInJlbGF0aXZlXCI6IDEsIFwiZml4ZWRcIjogMSwgXCJzdGF0aWNcIjogMX0sXG4gICAgXCJyaWdodFwiOiB7XCJweFwiOiAxLCBcImVtXCI6IDEsIFwiJVwiOiAxfSxcbiAgICBcInRhYmxlLWxheW91dFwiOiB7XCJmaXhlZFwiOiAxLCBcImF1dG9cIjogMX0sXG4gICAgXCJ0ZXh0LWRlY29yYXRpb25cIjoge1wibm9uZVwiOiAxLCBcInVuZGVybGluZVwiOiAxLCBcImxpbmUtdGhyb3VnaFwiOiAxLCBcImJsaW5rXCI6IDF9LFxuICAgIFwidGV4dC1hbGlnblwiOiB7XCJsZWZ0XCI6IDEsIFwicmlnaHRcIjogMSwgXCJjZW50ZXJcIjogMSwgXCJqdXN0aWZ5XCI6IDF9LFxuICAgIFwidGV4dC10cmFuc2Zvcm1cIjoge1wiY2FwaXRhbGl6ZVwiOiAxLCBcInVwcGVyY2FzZVwiOiAxLCBcImxvd2VyY2FzZVwiOiAxLCBcIm5vbmVcIjogMX0sXG4gICAgXCJ0b3BcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJ2ZXJ0aWNhbC1hbGlnblwiOiB7XCJ0b3BcIjogMSwgXCJib3R0b21cIjogMX0sXG4gICAgXCJ2aXNpYmlsaXR5XCI6IHtcImhpZGRlblwiOiAxLCBcInZpc2libGVcIjogMX0sXG4gICAgXCJ3aGl0ZS1zcGFjZVwiOiB7XCJub3dyYXBcIjogMSwgXCJub3JtYWxcIjogMSwgXCJwcmVcIjogMSwgXCJwcmUtbGluZVwiOiAxLCBcInByZS13cmFwXCI6IDF9LFxuICAgIFwid2lkdGhcIjoge1wicHhcIjogMSwgXCJlbVwiOiAxLCBcIiVcIjogMX0sXG4gICAgXCJ3b3JkLXNwYWNpbmdcIjoge1wibm9ybWFsXCI6IDF9LFxuXG4gICAgLy8gb3BhY2l0eVxuICAgIFwiZmlsdGVyXCI6IHtcImFscGhhKG9wYWNpdHk9JDAxMDApXCI6IDF9LFxuXG4gICAgXCJ0ZXh0LXNoYWRvd1wiOiB7XCIkMDJweCAycHggMnB4ICM3NzdcIjogMX0sXG4gICAgXCJ0ZXh0LW92ZXJmbG93XCI6IHtcImVsbGlwc2lzLXdvcmRcIjogMSwgXCJjbGlwXCI6IDEsIFwiZWxsaXBzaXNcIjogMX0sXG5cbiAgICAvLyBib3JkZXIgcmFkaXVzXG4gICAgXCItbW96LWJvcmRlci1yYWRpdXNcIjogMSxcbiAgICBcIi1tb3otYm9yZGVyLXJhZGl1cy10b3ByaWdodFwiOiAxLFxuICAgIFwiLW1vei1ib3JkZXItcmFkaXVzLWJvdHRvbXJpZ2h0XCI6IDEsXG4gICAgXCItbW96LWJvcmRlci1yYWRpdXMtdG9wbGVmdFwiOiAxLFxuICAgIFwiLW1vei1ib3JkZXItcmFkaXVzLWJvdHRvbWxlZnRcIjogMSxcbiAgICBcIi13ZWJraXQtYm9yZGVyLXJhZGl1c1wiOiAxLFxuICAgIFwiLXdlYmtpdC1ib3JkZXItdG9wLXJpZ2h0LXJhZGl1c1wiOiAxLFxuICAgIFwiLXdlYmtpdC1ib3JkZXItdG9wLWxlZnQtcmFkaXVzXCI6IDEsXG4gICAgXCItd2Via2l0LWJvcmRlci1ib3R0b20tcmlnaHQtcmFkaXVzXCI6IDEsXG4gICAgXCItd2Via2l0LWJvcmRlci1ib3R0b20tbGVmdC1yYWRpdXNcIjogMSxcblxuICAgIC8vIGRyb3BzaGFkb3dzXG4gICAgXCItbW96LWJveC1zaGFkb3dcIjogMSxcbiAgICBcIi13ZWJraXQtYm94LXNoYWRvd1wiOiAxLFxuXG4gICAgLy8gdHJhbnNmb3JtYXRpb25zXG4gICAgXCJ0cmFuc2Zvcm1cIjoge1wicm90YXRlKCQwMGRlZylcIjogMSwgXCJza2V3KCQwMGRlZylcIjogMX0sXG4gICAgXCItbW96LXRyYW5zZm9ybVwiOiB7XCJyb3RhdGUoJDAwZGVnKVwiOiAxLCBcInNrZXcoJDAwZGVnKVwiOiAxfSxcbiAgICBcIi13ZWJraXQtdHJhbnNmb3JtXCI6IHtcInJvdGF0ZSgkMDBkZWcpXCI6IDEsIFwic2tldygkMDBkZWcpXCI6IDEgfVxufTtcblxudmFyIENzc0NvbXBsZXRpb25zID0gZnVuY3Rpb24oKSB7XG5cbn07XG5cbihmdW5jdGlvbigpIHtcblxuICAgIHRoaXMuY29tcGxldGlvbnNEZWZpbmVkID0gZmFsc2U7XG5cbiAgICB0aGlzLmRlZmluZUNvbXBsZXRpb25zID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vZmlsbCBpbiBtaXNzaW5nIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKGRvY3VtZW50KSB7XG4gICAgICAgICAgICB2YXIgc3R5bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjJykuc3R5bGU7XG5cbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gc3R5bGUpIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHN0eWxlW2ldICE9PSAnc3RyaW5nJylcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9IGkucmVwbGFjZSgvW0EtWl0vZywgZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJy0nICsgeC50b0xvd2VyQ2FzZSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFwcm9wZXJ0eU1hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgcHJvcGVydHlNYXBbbmFtZV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jb21wbGV0aW9uc0RlZmluZWQgPSB0cnVlO1xuICAgIH07XG5cbiAgICB0aGlzLmdldENvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIGlmICghdGhpcy5jb21wbGV0aW9uc0RlZmluZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGVmaW5lQ29tcGxldGlvbnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZT09PSdydWxlc2V0JyB8fCBzZXNzaW9uLiRtb2RlLiRpZCA9PSBcImFjZS9tb2RlL3Njc3NcIikge1xuICAgICAgICAgICAgLy9jc3MgYXR0cmlidXRlIHZhbHVlXG4gICAgICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShwb3Mucm93KS5zdWJzdHIoMCwgcG9zLmNvbHVtbik7XG4gICAgICAgICAgICB2YXIgaW5QYXJlbnMgPSAvXFwoW14pXSokLy50ZXN0KGxpbmUpO1xuICAgICAgICAgICAgaWYgKGluUGFyZW5zKSB7XG4gICAgICAgICAgICAgICAgbGluZSA9IGxpbmUuc3Vic3RyKGxpbmUubGFzdEluZGV4T2YoJygnKSArIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKC86W147XSskLy50ZXN0KGxpbmUpKSB7XG4gICAgICAgICAgICAgICAgLyhbXFx3XFwtXSspOlteOl0qJC8udGVzdChsaW5lKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFByb3BlcnR5VmFsdWVDb21wbGV0aW9ucyhzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRQcm9wZXJ0eUNvbXBsZXRpb25zKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCwgaW5QYXJlbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFtdO1xuICAgIH07XG5cbiAgICB0aGlzLmdldFByb3BlcnR5Q29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgsIHNraXBTZW1pY29sb24pIHtcbiAgICAgICAgc2tpcFNlbWljb2xvbiA9IHNraXBTZW1pY29sb24gfHwgZmFsc2U7XG4gICAgICAgIHZhciBwcm9wZXJ0aWVzID0gT2JqZWN0LmtleXMocHJvcGVydHlNYXApO1xuICAgICAgICByZXR1cm4gcHJvcGVydGllcy5tYXAoZnVuY3Rpb24ocHJvcGVydHkpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiBwcm9wZXJ0eSxcbiAgICAgICAgICAgICAgICBzbmlwcGV0OiBwcm9wZXJ0eSArICc6ICQwJyArIChza2lwU2VtaWNvbG9uID8gJycgOiAnOycpLFxuICAgICAgICAgICAgICAgIG1ldGE6IFwicHJvcGVydHlcIixcbiAgICAgICAgICAgICAgICBzY29yZTogMTAwMDAwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0UHJvcGVydHlWYWx1ZUNvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHBvcy5yb3cpLnN1YnN0cigwLCBwb3MuY29sdW1uKTtcbiAgICAgICAgdmFyIHByb3BlcnR5ID0gKC8oW1xcd1xcLV0rKTpbXjpdKiQvLmV4ZWMobGluZSkgfHwge30pWzFdO1xuXG4gICAgICAgIGlmICghcHJvcGVydHkpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICAgICAgaWYgKHByb3BlcnR5IGluIHByb3BlcnR5TWFwICYmIHR5cGVvZiBwcm9wZXJ0eU1hcFtwcm9wZXJ0eV0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IE9iamVjdC5rZXlzKHByb3BlcnR5TWFwW3Byb3BlcnR5XSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlcy5tYXAoZnVuY3Rpb24odmFsdWUpe1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBjYXB0aW9uOiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBzbmlwcGV0OiB2YWx1ZSxcbiAgICAgICAgICAgICAgICBtZXRhOiBcInByb3BlcnR5IHZhbHVlXCIsXG4gICAgICAgICAgICAgICAgc2NvcmU6IDEwMDAwMDBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG5cbn0pLmNhbGwoQ3NzQ29tcGxldGlvbnMucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Dc3NDb21wbGV0aW9ucyA9IENzc0NvbXBsZXRpb25zO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vLi4vbGliL29vcFwiKTtcbnZhciBNaXhlZEZvbGRNb2RlID0gcmVxdWlyZShcIi4vbWl4ZWRcIikuRm9sZE1vZGU7XG52YXIgWG1sRm9sZE1vZGUgPSByZXF1aXJlKFwiLi94bWxcIikuRm9sZE1vZGU7XG52YXIgQ1N0eWxlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9jc3R5bGVcIikuRm9sZE1vZGU7XG5cbnZhciBGb2xkTW9kZSA9IGV4cG9ydHMuRm9sZE1vZGUgPSBmdW5jdGlvbih2b2lkRWxlbWVudHMsIG9wdGlvbmFsVGFncykge1xuICAgIE1peGVkRm9sZE1vZGUuY2FsbCh0aGlzLCBuZXcgWG1sRm9sZE1vZGUodm9pZEVsZW1lbnRzLCBvcHRpb25hbFRhZ3MpLCB7XG4gICAgICAgIFwianMtXCI6IG5ldyBDU3R5bGVGb2xkTW9kZSgpLFxuICAgICAgICBcImNzcy1cIjogbmV3IENTdHlsZUZvbGRNb2RlKClcbiAgICB9KTtcbn07XG5cbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgTWl4ZWRGb2xkTW9kZSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKGRlZmF1bHRNb2RlLCBzdWJNb2Rlcykge1xuICAgIHRoaXMuZGVmYXVsdE1vZGUgPSBkZWZhdWx0TW9kZTtcbiAgICB0aGlzLnN1Yk1vZGVzID0gc3ViTW9kZXM7XG59O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cblxuICAgIHRoaXMuJGdldE1vZGUgPSBmdW5jdGlvbihzdGF0ZSkge1xuICAgICAgICBpZiAodHlwZW9mIHN0YXRlICE9IFwic3RyaW5nXCIpIFxuICAgICAgICAgICAgc3RhdGUgPSBzdGF0ZVswXTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuc3ViTW9kZXMpIHtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5pbmRleE9mKGtleSkgPT09IDApXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3ViTW9kZXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIFxuICAgIHRoaXMuJHRyeU1vZGUgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIG1vZGUgPSB0aGlzLiRnZXRNb2RlKHN0YXRlKTtcbiAgICAgICAgcmV0dXJuIChtb2RlID8gbW9kZS5nZXRGb2xkV2lkZ2V0KHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSA6IFwiXCIpO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdGhpcy4kdHJ5TW9kZShzZXNzaW9uLmdldFN0YXRlKHJvdy0xKSwgc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHx8XG4gICAgICAgICAgICB0aGlzLiR0cnlNb2RlKHNlc3Npb24uZ2V0U3RhdGUocm93KSwgc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHx8XG4gICAgICAgICAgICB0aGlzLmRlZmF1bHRNb2RlLmdldEZvbGRXaWRnZXQoc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0Rm9sZFdpZGdldFJhbmdlID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIG1vZGUgPSB0aGlzLiRnZXRNb2RlKHNlc3Npb24uZ2V0U3RhdGUocm93LTEpKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghbW9kZSB8fCAhbW9kZS5nZXRGb2xkV2lkZ2V0KHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSlcbiAgICAgICAgICAgIG1vZGUgPSB0aGlzLiRnZXRNb2RlKHNlc3Npb24uZ2V0U3RhdGUocm93KSk7XG4gICAgICAgIFxuICAgICAgICBpZiAoIW1vZGUgfHwgIW1vZGUuZ2V0Rm9sZFdpZGdldChzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykpXG4gICAgICAgICAgICBtb2RlID0gdGhpcy5kZWZhdWx0TW9kZTtcbiAgICAgICAgXG4gICAgICAgIHJldHVybiBtb2RlLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdyk7XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIFRleHRNb2RlID0gcmVxdWlyZShcIi4vdGV4dFwiKS5Nb2RlO1xudmFyIEphdmFTY3JpcHRNb2RlID0gcmVxdWlyZShcIi4vamF2YXNjcmlwdFwiKS5Nb2RlO1xudmFyIENzc01vZGUgPSByZXF1aXJlKFwiLi9jc3NcIikuTW9kZTtcbnZhciBIdG1sSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi9odG1sX2hpZ2hsaWdodF9ydWxlc1wiKS5IdG1sSGlnaGxpZ2h0UnVsZXM7XG52YXIgWG1sQmVoYXZpb3VyID0gcmVxdWlyZShcIi4vYmVoYXZpb3VyL3htbFwiKS5YbWxCZWhhdmlvdXI7XG52YXIgSHRtbEZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZGluZy9odG1sXCIpLkZvbGRNb2RlO1xudmFyIEh0bWxDb21wbGV0aW9ucyA9IHJlcXVpcmUoXCIuL2h0bWxfY29tcGxldGlvbnNcIikuSHRtbENvbXBsZXRpb25zO1xudmFyIFdvcmtlckNsaWVudCA9IHJlcXVpcmUoXCIuLi93b3JrZXIvd29ya2VyX2NsaWVudFwiKS5Xb3JrZXJDbGllbnQ7XG5cbi8vIGh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw1L3N5bnRheC5odG1sI3ZvaWQtZWxlbWVudHNcbnZhciB2b2lkRWxlbWVudHMgPSBbXCJhcmVhXCIsIFwiYmFzZVwiLCBcImJyXCIsIFwiY29sXCIsIFwiZW1iZWRcIiwgXCJoclwiLCBcImltZ1wiLCBcImlucHV0XCIsIFwia2V5Z2VuXCIsIFwibGlua1wiLCBcIm1ldGFcIiwgXCJtZW51aXRlbVwiLCBcInBhcmFtXCIsIFwic291cmNlXCIsIFwidHJhY2tcIiwgXCJ3YnJcIl07XG52YXIgb3B0aW9uYWxFbmRUYWdzID0gW1wibGlcIiwgXCJkdFwiLCBcImRkXCIsIFwicFwiLCBcInJ0XCIsIFwicnBcIiwgXCJvcHRncm91cFwiLCBcIm9wdGlvblwiLCBcImNvbGdyb3VwXCIsIFwidGRcIiwgXCJ0aFwiXTtcblxudmFyIE1vZGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdGhpcy5mcmFnbWVudENvbnRleHQgPSBvcHRpb25zICYmIG9wdGlvbnMuZnJhZ21lbnRDb250ZXh0O1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBIdG1sSGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gbmV3IFhtbEJlaGF2aW91cigpO1xuICAgIHRoaXMuJGNvbXBsZXRlciA9IG5ldyBIdG1sQ29tcGxldGlvbnMoKTtcbiAgICBcbiAgICB0aGlzLmNyZWF0ZU1vZGVEZWxlZ2F0ZXMoe1xuICAgICAgICBcImpzLVwiOiBKYXZhU2NyaXB0TW9kZSxcbiAgICAgICAgXCJjc3MtXCI6IENzc01vZGVcbiAgICB9KTtcbiAgICBcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBIdG1sRm9sZE1vZGUodGhpcy52b2lkRWxlbWVudHMsIGxhbmcuYXJyYXlUb01hcChvcHRpb25hbEVuZFRhZ3MpKTtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCI8IS0tXCIsIGVuZDogXCItLT5cIn07XG5cbiAgICB0aGlzLnZvaWRFbGVtZW50cyA9IGxhbmcuYXJyYXlUb01hcCh2b2lkRWxlbWVudHMpO1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGdldEluZGVudChsaW5lKTtcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICB0aGlzLmdldENvbXBsZXRpb25zID0gZnVuY3Rpb24oc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRjb21wbGV0ZXIuZ2V0Q29tcGxldGlvbnMoc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KTtcbiAgICB9O1xuXG4gICAgdGhpcy5jcmVhdGVXb3JrZXIgPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbnN0cnVjdG9yICE9IE1vZGUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciB3b3JrZXIgPSBuZXcgV29ya2VyQ2xpZW50KFtcImFjZVwiXSwgXCJhY2UvbW9kZS9odG1sX3dvcmtlclwiLCBcIldvcmtlclwiKTtcbiAgICAgICAgd29ya2VyLmF0dGFjaFRvRG9jdW1lbnQoc2Vzc2lvbi5nZXREb2N1bWVudCgpKTtcblxuICAgICAgICBpZiAodGhpcy5mcmFnbWVudENvbnRleHQpXG4gICAgICAgICAgICB3b3JrZXIuY2FsbChcInNldE9wdGlvbnNcIiwgW3tjb250ZXh0OiB0aGlzLmZyYWdtZW50Q29udGV4dH1dKTtcblxuICAgICAgICB3b3JrZXIub24oXCJlcnJvclwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZXNzaW9uLnNldEFubm90YXRpb25zKGUuZGF0YSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtlci5vbihcInRlcm1pbmF0ZVwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHNlc3Npb24uY2xlYXJBbm5vdGF0aW9ucygpO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gd29ya2VyO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvaHRtbFwiO1xuICAgIHRoaXMuc25pcHBldEZpbGVJZCA9IFwiYWNlL3NuaXBwZXRzL2h0bWxcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBUb2tlbkl0ZXJhdG9yID0gcmVxdWlyZShcIi4uL3Rva2VuX2l0ZXJhdG9yXCIpLlRva2VuSXRlcmF0b3I7XG5cbnZhciBjb21tb25BdHRyaWJ1dGVzID0gW1xuICAgIFwiYWNjZXNza2V5XCIsXG4gICAgXCJjbGFzc1wiLFxuICAgIFwiY29udGVudGVkaXRhYmxlXCIsXG4gICAgXCJjb250ZXh0bWVudVwiLFxuICAgIFwiZGlyXCIsXG4gICAgXCJkcmFnZ2FibGVcIixcbiAgICBcImRyb3B6b25lXCIsXG4gICAgXCJoaWRkZW5cIixcbiAgICBcImlkXCIsXG4gICAgXCJpbmVydFwiLFxuICAgIFwiaXRlbWlkXCIsXG4gICAgXCJpdGVtcHJvcFwiLFxuICAgIFwiaXRlbXJlZlwiLFxuICAgIFwiaXRlbXNjb3BlXCIsXG4gICAgXCJpdGVtdHlwZVwiLFxuICAgIFwibGFuZ1wiLFxuICAgIFwic3BlbGxjaGVja1wiLFxuICAgIFwic3R5bGVcIixcbiAgICBcInRhYmluZGV4XCIsXG4gICAgXCJ0aXRsZVwiLFxuICAgIFwidHJhbnNsYXRlXCJcbl07XG5cbnZhciBldmVudEF0dHJpYnV0ZXMgPSBbXG4gICAgXCJvbmFib3J0XCIsXG4gICAgXCJvbmJsdXJcIixcbiAgICBcIm9uY2FuY2VsXCIsXG4gICAgXCJvbmNhbnBsYXlcIixcbiAgICBcIm9uY2FucGxheXRocm91Z2hcIixcbiAgICBcIm9uY2hhbmdlXCIsXG4gICAgXCJvbmNsaWNrXCIsXG4gICAgXCJvbmNsb3NlXCIsXG4gICAgXCJvbmNvbnRleHRtZW51XCIsXG4gICAgXCJvbmN1ZWNoYW5nZVwiLFxuICAgIFwib25kYmxjbGlja1wiLFxuICAgIFwib25kcmFnXCIsXG4gICAgXCJvbmRyYWdlbmRcIixcbiAgICBcIm9uZHJhZ2VudGVyXCIsXG4gICAgXCJvbmRyYWdsZWF2ZVwiLFxuICAgIFwib25kcmFnb3ZlclwiLFxuICAgIFwib25kcmFnc3RhcnRcIixcbiAgICBcIm9uZHJvcFwiLFxuICAgIFwib25kdXJhdGlvbmNoYW5nZVwiLFxuICAgIFwib25lbXB0aWVkXCIsXG4gICAgXCJvbmVuZGVkXCIsXG4gICAgXCJvbmVycm9yXCIsXG4gICAgXCJvbmZvY3VzXCIsXG4gICAgXCJvbmlucHV0XCIsXG4gICAgXCJvbmludmFsaWRcIixcbiAgICBcIm9ua2V5ZG93blwiLFxuICAgIFwib25rZXlwcmVzc1wiLFxuICAgIFwib25rZXl1cFwiLFxuICAgIFwib25sb2FkXCIsXG4gICAgXCJvbmxvYWRlZGRhdGFcIixcbiAgICBcIm9ubG9hZGVkbWV0YWRhdGFcIixcbiAgICBcIm9ubG9hZHN0YXJ0XCIsXG4gICAgXCJvbm1vdXNlZG93blwiLFxuICAgIFwib25tb3VzZW1vdmVcIixcbiAgICBcIm9ubW91c2VvdXRcIixcbiAgICBcIm9ubW91c2VvdmVyXCIsXG4gICAgXCJvbm1vdXNldXBcIixcbiAgICBcIm9ubW91c2V3aGVlbFwiLFxuICAgIFwib25wYXVzZVwiLFxuICAgIFwib25wbGF5XCIsXG4gICAgXCJvbnBsYXlpbmdcIixcbiAgICBcIm9ucHJvZ3Jlc3NcIixcbiAgICBcIm9ucmF0ZWNoYW5nZVwiLFxuICAgIFwib25yZXNldFwiLFxuICAgIFwib25zY3JvbGxcIixcbiAgICBcIm9uc2Vla2VkXCIsXG4gICAgXCJvbnNlZWtpbmdcIixcbiAgICBcIm9uc2VsZWN0XCIsXG4gICAgXCJvbnNob3dcIixcbiAgICBcIm9uc3RhbGxlZFwiLFxuICAgIFwib25zdWJtaXRcIixcbiAgICBcIm9uc3VzcGVuZFwiLFxuICAgIFwib250aW1ldXBkYXRlXCIsXG4gICAgXCJvbnZvbHVtZWNoYW5nZVwiLFxuICAgIFwib253YWl0aW5nXCJcbl07XG5cbnZhciBnbG9iYWxBdHRyaWJ1dGVzID0gY29tbW9uQXR0cmlidXRlcy5jb25jYXQoZXZlbnRBdHRyaWJ1dGVzKTtcblxudmFyIGF0dHJpYnV0ZU1hcCA9IHtcbiAgICBcImFcIjoge1wiaHJlZlwiOiAxLCBcInRhcmdldFwiOiB7XCJfYmxhbmtcIjogMSwgXCJ0b3BcIjogMX0sIFwicGluZ1wiOiAxLCBcInJlbFwiOiB7XCJub2ZvbGxvd1wiOiAxLCBcImFsdGVybmF0ZVwiOiAxLCBcImF1dGhvclwiOiAxLCBcImJvb2ttYXJrXCI6IDEsIFwiaGVscFwiOiAxLCBcImxpY2Vuc2VcIjogMSwgXCJuZXh0XCI6IDEsIFwibm9yZWZlcnJlclwiOiAxLCBcInByZWZldGNoXCI6IDEsIFwicHJldlwiOiAxLCBcInNlYXJjaFwiOiAxLCBcInRhZ1wiOiAxfSwgXCJtZWRpYVwiOiAxLCBcImhyZWZsYW5nXCI6IDEsIFwidHlwZVwiOiAxfSxcbiAgICBcImFiYnJcIjoge30sXG4gICAgXCJhZGRyZXNzXCI6IHt9LFxuICAgIFwiYXJlYVwiOiB7XCJzaGFwZVwiOiAxLCBcImNvb3Jkc1wiOiAxLCBcImhyZWZcIjogMSwgXCJocmVmbGFuZ1wiOiAxLCBcImFsdFwiOiAxLCBcInRhcmdldFwiOiAxLCBcIm1lZGlhXCI6IDEsIFwicmVsXCI6IDEsIFwicGluZ1wiOiAxLCBcInR5cGVcIjogMX0sXG4gICAgXCJhcnRpY2xlXCI6IHtcInB1YmRhdGVcIjogMX0sXG4gICAgXCJhc2lkZVwiOiB7fSxcbiAgICBcImF1ZGlvXCI6IHtcInNyY1wiOiAxLCBcImF1dG9idWZmZXJcIjogMSwgXCJhdXRvcGxheVwiOiB7XCJhdXRvcGxheVwiOiAxfSwgXCJsb29wXCI6IHtcImxvb3BcIjogMX0sIFwiY29udHJvbHNcIjoge1wiY29udHJvbHNcIjogMX0sIFwibXV0ZWRcIjoge1wibXV0ZWRcIjogMX0sIFwicHJlbG9hZFwiOiB7XCJhdXRvXCI6IDEsIFwibWV0YWRhdGFcIjogMSwgXCJub25lXCI6IDEgfX0sXG4gICAgXCJiXCI6IHt9LFxuICAgIFwiYmFzZVwiOiB7XCJocmVmXCI6IDEsIFwidGFyZ2V0XCI6IDF9LFxuICAgIFwiYmRpXCI6IHt9LFxuICAgIFwiYmRvXCI6IHt9LFxuICAgIFwiYmxvY2txdW90ZVwiOiB7XCJjaXRlXCI6IDF9LFxuICAgIFwiYm9keVwiOiB7XCJvbmFmdGVycHJpbnRcIjogMSwgXCJvbmJlZm9yZXByaW50XCI6IDEsIFwib25iZWZvcmV1bmxvYWRcIjogMSwgXCJvbmhhc2hjaGFuZ2VcIjogMSwgXCJvbm1lc3NhZ2VcIjogMSwgXCJvbm9mZmxpbmVcIjogMSwgXCJvbnBvcHN0YXRlXCI6IDEsIFwib25yZWRvXCI6IDEsIFwib25yZXNpemVcIjogMSwgXCJvbnN0b3JhZ2VcIjogMSwgXCJvbnVuZG9cIjogMSwgXCJvbnVubG9hZFwiOiAxfSxcbiAgICBcImJyXCI6IHt9LFxuICAgIFwiYnV0dG9uXCI6IHtcImF1dG9mb2N1c1wiOiAxLCBcImRpc2FibGVkXCI6IHtcImRpc2FibGVkXCI6IDF9LCBcImZvcm1cIjogMSwgXCJmb3JtYWN0aW9uXCI6IDEsIFwiZm9ybWVuY3R5cGVcIjogMSwgXCJmb3JtbWV0aG9kXCI6IDEsIFwiZm9ybW5vdmFsaWRhdGVcIjogMSwgXCJmb3JtdGFyZ2V0XCI6IDEsIFwibmFtZVwiOiAxLCBcInZhbHVlXCI6IDEsIFwidHlwZVwiOiB7XCJidXR0b25cIjogMSwgXCJzdWJtaXRcIjogMX19LFxuICAgIFwiY2FudmFzXCI6IHtcIndpZHRoXCI6IDEsIFwiaGVpZ2h0XCI6IDF9LFxuICAgIFwiY2FwdGlvblwiOiB7fSxcbiAgICBcImNpdGVcIjoge30sXG4gICAgXCJjb2RlXCI6IHt9LFxuICAgIFwiY29sXCI6IHtcInNwYW5cIjogMX0sXG4gICAgXCJjb2xncm91cFwiOiB7XCJzcGFuXCI6IDF9LFxuICAgIFwiY29tbWFuZFwiOiB7XCJ0eXBlXCI6IDEsIFwibGFiZWxcIjogMSwgXCJpY29uXCI6IDEsIFwiZGlzYWJsZWRcIjogMSwgXCJjaGVja2VkXCI6IDEsIFwicmFkaW9ncm91cFwiOiAxLCBcImNvbW1hbmRcIjogMX0sXG4gICAgXCJkYXRhXCI6IHt9LFxuICAgIFwiZGF0YWxpc3RcIjoge30sXG4gICAgXCJkZFwiOiB7fSxcbiAgICBcImRlbFwiOiB7XCJjaXRlXCI6IDEsIFwiZGF0ZXRpbWVcIjogMX0sXG4gICAgXCJkZXRhaWxzXCI6IHtcIm9wZW5cIjogMX0sXG4gICAgXCJkZm5cIjoge30sXG4gICAgXCJkaWFsb2dcIjoge1wib3BlblwiOiAxfSxcbiAgICBcImRpdlwiOiB7fSxcbiAgICBcImRsXCI6IHt9LFxuICAgIFwiZHRcIjoge30sXG4gICAgXCJlbVwiOiB7fSxcbiAgICBcImVtYmVkXCI6IHtcInNyY1wiOiAxLCBcImhlaWdodFwiOiAxLCBcIndpZHRoXCI6IDEsIFwidHlwZVwiOiAxfSxcbiAgICBcImZpZWxkc2V0XCI6IHtcImRpc2FibGVkXCI6IDEsIFwiZm9ybVwiOiAxLCBcIm5hbWVcIjogMX0sXG4gICAgXCJmaWdjYXB0aW9uXCI6IHt9LFxuICAgIFwiZmlndXJlXCI6IHt9LFxuICAgIFwiZm9vdGVyXCI6IHt9LFxuICAgIFwiZm9ybVwiOiB7XCJhY2NlcHQtY2hhcnNldFwiOiAxLCBcImFjdGlvblwiOiAxLCBcImF1dG9jb21wbGV0ZVwiOiAxLCBcImVuY3R5cGVcIjoge1wibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiOiAxLCBcImFwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZFwiOiAxfSwgXCJtZXRob2RcIjoge1wiZ2V0XCI6IDEsIFwicG9zdFwiOiAxfSwgXCJuYW1lXCI6IDEsIFwibm92YWxpZGF0ZVwiOiAxLCBcInRhcmdldFwiOiB7XCJfYmxhbmtcIjogMSwgXCJ0b3BcIjogMX19LFxuICAgIFwiaDFcIjoge30sXG4gICAgXCJoMlwiOiB7fSxcbiAgICBcImgzXCI6IHt9LFxuICAgIFwiaDRcIjoge30sXG4gICAgXCJoNVwiOiB7fSxcbiAgICBcImg2XCI6IHt9LFxuICAgIFwiaGVhZFwiOiB7fSxcbiAgICBcImhlYWRlclwiOiB7fSxcbiAgICBcImhyXCI6IHt9LFxuICAgIFwiaHRtbFwiOiB7XCJtYW5pZmVzdFwiOiAxfSxcbiAgICBcImlcIjoge30sXG4gICAgXCJpZnJhbWVcIjoge1wibmFtZVwiOiAxLCBcInNyY1wiOiAxLCBcImhlaWdodFwiOiAxLCBcIndpZHRoXCI6IDEsIFwic2FuZGJveFwiOiB7XCJhbGxvdy1zYW1lLW9yaWdpblwiOiAxLCBcImFsbG93LXRvcC1uYXZpZ2F0aW9uXCI6IDEsIFwiYWxsb3ctZm9ybXNcIjogMSwgXCJhbGxvdy1zY3JpcHRzXCI6IDF9LCBcInNlYW1sZXNzXCI6IHtcInNlYW1sZXNzXCI6IDF9fSxcbiAgICBcImltZ1wiOiB7XCJhbHRcIjogMSwgXCJzcmNcIjogMSwgXCJoZWlnaHRcIjogMSwgXCJ3aWR0aFwiOiAxLCBcInVzZW1hcFwiOiAxLCBcImlzbWFwXCI6IDF9LFxuICAgIFwiaW5wdXRcIjoge1xuICAgICAgICBcInR5cGVcIjoge1widGV4dFwiOiAxLCBcInBhc3N3b3JkXCI6IDEsIFwiaGlkZGVuXCI6IDEsIFwiY2hlY2tib3hcIjogMSwgXCJzdWJtaXRcIjogMSwgXCJyYWRpb1wiOiAxLCBcImZpbGVcIjogMSwgXCJidXR0b25cIjogMSwgXCJyZXNldFwiOiAxLCBcImltYWdlXCI6IDMxLCBcImNvbG9yXCI6IDEsIFwiZGF0ZVwiOiAxLCBcImRhdGV0aW1lXCI6IDEsIFwiZGF0ZXRpbWUtbG9jYWxcIjogMSwgXCJlbWFpbFwiOiAxLCBcIm1vbnRoXCI6IDEsIFwibnVtYmVyXCI6IDEsIFwicmFuZ2VcIjogMSwgXCJzZWFyY2hcIjogMSwgXCJ0ZWxcIjogMSwgXCJ0aW1lXCI6IDEsIFwidXJsXCI6IDEsIFwid2Vla1wiOiAxfSxcbiAgICAgICAgXCJhY2NlcHRcIjogMSwgXCJhbHRcIjogMSwgXCJhdXRvY29tcGxldGVcIjoge1wib25cIjogMSwgXCJvZmZcIjogMX0sIFwiYXV0b2ZvY3VzXCI6IHtcImF1dG9mb2N1c1wiOiAxfSwgXCJjaGVja2VkXCI6IHtcImNoZWNrZWRcIjogMX0sIFwiZGlzYWJsZWRcIjoge1wiZGlzYWJsZWRcIjogMX0sIFwiZm9ybVwiOiAxLCBcImZvcm1hY3Rpb25cIjogMSwgXCJmb3JtZW5jdHlwZVwiOiB7XCJhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWRcIjogMSwgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCI6IDEsIFwidGV4dC9wbGFpblwiOiAxfSwgXCJmb3JtbWV0aG9kXCI6IHtcImdldFwiOiAxLCBcInBvc3RcIjogMX0sIFwiZm9ybW5vdmFsaWRhdGVcIjoge1wiZm9ybW5vdmFsaWRhdGVcIjogMX0sIFwiZm9ybXRhcmdldFwiOiB7XCJfYmxhbmtcIjogMSwgXCJfc2VsZlwiOiAxLCBcIl9wYXJlbnRcIjogMSwgXCJfdG9wXCI6IDF9LCBcImhlaWdodFwiOiAxLCBcImxpc3RcIjogMSwgXCJtYXhcIjogMSwgXCJtYXhsZW5ndGhcIjogMSwgXCJtaW5cIjogMSwgXCJtdWx0aXBsZVwiOiB7XCJtdWx0aXBsZVwiOiAxfSwgXCJuYW1lXCI6IDEsIFwicGF0dGVyblwiOiAxLCBcInBsYWNlaG9sZGVyXCI6IDEsIFwicmVhZG9ubHlcIjoge1wicmVhZG9ubHlcIjogMX0sIFwicmVxdWlyZWRcIjoge1wicmVxdWlyZWRcIjogMX0sIFwic2l6ZVwiOiAxLCBcInNyY1wiOiAxLCBcInN0ZXBcIjogMSwgXCJ3aWR0aFwiOiAxLCBcImZpbGVzXCI6IDEsIFwidmFsdWVcIjogMX0sXG4gICAgXCJpbnNcIjoge1wiY2l0ZVwiOiAxLCBcImRhdGV0aW1lXCI6IDF9LFxuICAgIFwia2JkXCI6IHt9LFxuICAgIFwia2V5Z2VuXCI6IHtcImF1dG9mb2N1c1wiOiAxLCBcImNoYWxsZW5nZVwiOiB7XCJjaGFsbGVuZ2VcIjogMX0sIFwiZGlzYWJsZWRcIjoge1wiZGlzYWJsZWRcIjogMX0sIFwiZm9ybVwiOiAxLCBcImtleXR5cGVcIjoge1wicnNhXCI6IDEsIFwiZHNhXCI6IDEsIFwiZWNcIjogMX0sIFwibmFtZVwiOiAxfSxcbiAgICBcImxhYmVsXCI6IHtcImZvcm1cIjogMSwgXCJmb3JcIjogMX0sXG4gICAgXCJsZWdlbmRcIjoge30sXG4gICAgXCJsaVwiOiB7XCJ2YWx1ZVwiOiAxfSxcbiAgICBcImxpbmtcIjoge1wiaHJlZlwiOiAxLCBcImhyZWZsYW5nXCI6IDEsIFwicmVsXCI6IHtcInN0eWxlc2hlZXRcIjogMSwgXCJpY29uXCI6IDF9LCBcIm1lZGlhXCI6IHtcImFsbFwiOiAxLCBcInNjcmVlblwiOiAxLCBcInByaW50XCI6IDF9LCBcInR5cGVcIjoge1widGV4dC9jc3NcIjogMSwgXCJpbWFnZS9wbmdcIjogMSwgXCJpbWFnZS9qcGVnXCI6IDEsIFwiaW1hZ2UvZ2lmXCI6IDF9LCBcInNpemVzXCI6IDF9LFxuICAgIFwibWFpblwiOiB7fSxcbiAgICBcIm1hcFwiOiB7XCJuYW1lXCI6IDF9LFxuICAgIFwibWFya1wiOiB7fSxcbiAgICBcIm1hdGhcIjoge30sXG4gICAgXCJtZW51XCI6IHtcInR5cGVcIjogMSwgXCJsYWJlbFwiOiAxfSxcbiAgICBcIm1ldGFcIjoge1wiaHR0cC1lcXVpdlwiOiB7XCJjb250ZW50LXR5cGVcIjogMX0sIFwibmFtZVwiOiB7XCJkZXNjcmlwdGlvblwiOiAxLCBcImtleXdvcmRzXCI6IDF9LCBcImNvbnRlbnRcIjoge1widGV4dC9odG1sOyBjaGFyc2V0PVVURi04XCI6IDF9LCBcImNoYXJzZXRcIjogMX0sXG4gICAgXCJtZXRlclwiOiB7XCJ2YWx1ZVwiOiAxLCBcIm1pblwiOiAxLCBcIm1heFwiOiAxLCBcImxvd1wiOiAxLCBcImhpZ2hcIjogMSwgXCJvcHRpbXVtXCI6IDF9LFxuICAgIFwibmF2XCI6IHt9LFxuICAgIFwibm9zY3JpcHRcIjoge1wiaHJlZlwiOiAxfSxcbiAgICBcIm9iamVjdFwiOiB7XCJwYXJhbVwiOiAxLCBcImRhdGFcIjogMSwgXCJ0eXBlXCI6IDEsIFwiaGVpZ2h0XCIgOiAxLCBcIndpZHRoXCI6IDEsIFwidXNlbWFwXCI6IDEsIFwibmFtZVwiOiAxLCBcImZvcm1cIjogMSwgXCJjbGFzc2lkXCI6IDF9LFxuICAgIFwib2xcIjoge1wic3RhcnRcIjogMSwgXCJyZXZlcnNlZFwiOiAxfSxcbiAgICBcIm9wdGdyb3VwXCI6IHtcImRpc2FibGVkXCI6IDEsIFwibGFiZWxcIjogMX0sXG4gICAgXCJvcHRpb25cIjoge1wiZGlzYWJsZWRcIjogMSwgXCJzZWxlY3RlZFwiOiAxLCBcImxhYmVsXCI6IDEsIFwidmFsdWVcIjogMX0sXG4gICAgXCJvdXRwdXRcIjoge1wiZm9yXCI6IDEsIFwiZm9ybVwiOiAxLCBcIm5hbWVcIjogMX0sXG4gICAgXCJwXCI6IHt9LFxuICAgIFwicGFyYW1cIjoge1wibmFtZVwiOiAxLCBcInZhbHVlXCI6IDF9LFxuICAgIFwicHJlXCI6IHt9LFxuICAgIFwicHJvZ3Jlc3NcIjoge1widmFsdWVcIjogMSwgXCJtYXhcIjogMX0sXG4gICAgXCJxXCI6IHtcImNpdGVcIjogMX0sXG4gICAgXCJycFwiOiB7fSxcbiAgICBcInJ0XCI6IHt9LFxuICAgIFwicnVieVwiOiB7fSxcbiAgICBcInNcIjoge30sXG4gICAgXCJzYW1wXCI6IHt9LFxuICAgIFwic2NyaXB0XCI6IHtcImNoYXJzZXRcIjogMSwgXCJ0eXBlXCI6IHtcInRleHQvamF2YXNjcmlwdFwiOiAxfSwgXCJzcmNcIjogMSwgXCJkZWZlclwiOiAxLCBcImFzeW5jXCI6IDF9LFxuICAgIFwic2VsZWN0XCI6IHtcImF1dG9mb2N1c1wiOiAxLCBcImRpc2FibGVkXCI6IDEsIFwiZm9ybVwiOiAxLCBcIm11bHRpcGxlXCI6IHtcIm11bHRpcGxlXCI6IDF9LCBcIm5hbWVcIjogMSwgXCJzaXplXCI6IDEsIFwicmVhZG9ubHlcIjp7XCJyZWFkb25seVwiOiAxfX0sXG4gICAgXCJzbWFsbFwiOiB7fSxcbiAgICBcInNvdXJjZVwiOiB7XCJzcmNcIjogMSwgXCJ0eXBlXCI6IDEsIFwibWVkaWFcIjogMX0sXG4gICAgXCJzcGFuXCI6IHt9LFxuICAgIFwic3Ryb25nXCI6IHt9LFxuICAgIFwic3R5bGVcIjoge1widHlwZVwiOiAxLCBcIm1lZGlhXCI6IHtcImFsbFwiOiAxLCBcInNjcmVlblwiOiAxLCBcInByaW50XCI6IDF9LCBcInNjb3BlZFwiOiAxfSxcbiAgICBcInN1YlwiOiB7fSxcbiAgICBcInN1cFwiOiB7fSxcbiAgICBcInN2Z1wiOiB7fSxcbiAgICBcInRhYmxlXCI6IHtcInN1bW1hcnlcIjogMX0sXG4gICAgXCJ0Ym9keVwiOiB7fSxcbiAgICBcInRkXCI6IHtcImhlYWRlcnNcIjogMSwgXCJyb3dzcGFuXCI6IDEsIFwiY29sc3BhblwiOiAxfSxcbiAgICBcInRleHRhcmVhXCI6IHtcImF1dG9mb2N1c1wiOiB7XCJhdXRvZm9jdXNcIjogMX0sIFwiZGlzYWJsZWRcIjoge1wiZGlzYWJsZWRcIjogMX0sIFwiZm9ybVwiOiAxLCBcIm1heGxlbmd0aFwiOiAxLCBcIm5hbWVcIjogMSwgXCJwbGFjZWhvbGRlclwiOiAxLCBcInJlYWRvbmx5XCI6IHtcInJlYWRvbmx5XCI6IDF9LCBcInJlcXVpcmVkXCI6IHtcInJlcXVpcmVkXCI6IDF9LCBcInJvd3NcIjogMSwgXCJjb2xzXCI6IDEsIFwid3JhcFwiOiB7XCJvblwiOiAxLCBcIm9mZlwiOiAxLCBcImhhcmRcIjogMSwgXCJzb2Z0XCI6IDF9fSxcbiAgICBcInRmb290XCI6IHt9LFxuICAgIFwidGhcIjoge1wiaGVhZGVyc1wiOiAxLCBcInJvd3NwYW5cIjogMSwgXCJjb2xzcGFuXCI6IDEsIFwic2NvcGVcIjogMX0sXG4gICAgXCJ0aGVhZFwiOiB7fSxcbiAgICBcInRpbWVcIjoge1wiZGF0ZXRpbWVcIjogMX0sXG4gICAgXCJ0aXRsZVwiOiB7fSxcbiAgICBcInRyXCI6IHt9LFxuICAgIFwidHJhY2tcIjoge1wia2luZFwiOiAxLCBcInNyY1wiOiAxLCBcInNyY2xhbmdcIjogMSwgXCJsYWJlbFwiOiAxLCBcImRlZmF1bHRcIjogMX0sXG4gICAgXCJzZWN0aW9uXCI6IHt9LFxuICAgIFwic3VtbWFyeVwiOiB7fSxcbiAgICBcInVcIjoge30sXG4gICAgXCJ1bFwiOiB7fSxcbiAgICBcInZhclwiOiB7fSxcbiAgICBcInZpZGVvXCI6IHtcInNyY1wiOiAxLCBcImF1dG9idWZmZXJcIjogMSwgXCJhdXRvcGxheVwiOiB7XCJhdXRvcGxheVwiOiAxfSwgXCJsb29wXCI6IHtcImxvb3BcIjogMX0sIFwiY29udHJvbHNcIjoge1wiY29udHJvbHNcIjogMX0sIFwid2lkdGhcIjogMSwgXCJoZWlnaHRcIjogMSwgXCJwb3N0ZXJcIjogMSwgXCJtdXRlZFwiOiB7XCJtdXRlZFwiOiAxfSwgXCJwcmVsb2FkXCI6IHtcImF1dG9cIjogMSwgXCJtZXRhZGF0YVwiOiAxLCBcIm5vbmVcIjogMX19LFxuICAgIFwid2JyXCI6IHt9XG59O1xuXG52YXIgZWxlbWVudHMgPSBPYmplY3Qua2V5cyhhdHRyaWJ1dGVNYXApO1xuXG5mdW5jdGlvbiBpcyh0b2tlbiwgdHlwZSkge1xuICAgIHJldHVybiB0b2tlbi50eXBlLmxhc3RJbmRleE9mKHR5cGUgKyBcIi54bWxcIikgPiAtMTtcbn1cblxuZnVuY3Rpb24gZmluZFRhZ05hbWUoc2Vzc2lvbiwgcG9zKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0gbmV3IFRva2VuSXRlcmF0b3Ioc2Vzc2lvbiwgcG9zLnJvdywgcG9zLmNvbHVtbik7XG4gICAgdmFyIHRva2VuID0gaXRlcmF0b3IuZ2V0Q3VycmVudFRva2VuKCk7XG4gICAgd2hpbGUgKHRva2VuICYmICFpcyh0b2tlbiwgXCJ0YWctbmFtZVwiKSl7XG4gICAgICAgIHRva2VuID0gaXRlcmF0b3Iuc3RlcEJhY2t3YXJkKCk7XG4gICAgfVxuICAgIGlmICh0b2tlbilcbiAgICAgICAgcmV0dXJuIHRva2VuLnZhbHVlO1xufVxuXG5mdW5jdGlvbiBmaW5kQXR0cmlidXRlTmFtZShzZXNzaW9uLCBwb3MpIHtcbiAgICB2YXIgaXRlcmF0b3IgPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCBwb3Mucm93LCBwb3MuY29sdW1uKTtcbiAgICB2YXIgdG9rZW4gPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW4oKTtcbiAgICB3aGlsZSAodG9rZW4gJiYgIWlzKHRva2VuLCBcImF0dHJpYnV0ZS1uYW1lXCIpKXtcbiAgICAgICAgdG9rZW4gPSBpdGVyYXRvci5zdGVwQmFja3dhcmQoKTtcbiAgICB9XG4gICAgaWYgKHRva2VuKVxuICAgICAgICByZXR1cm4gdG9rZW4udmFsdWU7XG59XG5cbnZhciBIdG1sQ29tcGxldGlvbnMgPSBmdW5jdGlvbigpIHtcblxufTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5nZXRDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICB2YXIgdG9rZW4gPSBzZXNzaW9uLmdldFRva2VuQXQocG9zLnJvdywgcG9zLmNvbHVtbik7XG5cbiAgICAgICAgaWYgKCF0b2tlbilcbiAgICAgICAgICAgIHJldHVybiBbXTtcblxuICAgICAgICAvLyB0YWcgbmFtZVxuICAgICAgICBpZiAoaXModG9rZW4sIFwidGFnLW5hbWVcIikgfHwgaXModG9rZW4sIFwidGFnLW9wZW5cIikgfHwgaXModG9rZW4sIFwiZW5kLXRhZy1vcGVuXCIpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGFnQ29tcGxldGlvbnMoc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KTtcblxuICAgICAgICAvLyB0YWcgYXR0cmlidXRlXG4gICAgICAgIGlmIChpcyh0b2tlbiwgXCJ0YWctd2hpdGVzcGFjZVwiKSB8fCBpcyh0b2tlbiwgXCJhdHRyaWJ1dGUtbmFtZVwiKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZUNvbXBsZXRpb25zKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCk7XG4gICAgICAgICAgICBcbiAgICAgICAgLy8gdGFnIGF0dHJpYnV0ZSB2YWx1ZXNcbiAgICAgICAgaWYgKGlzKHRva2VuLCBcImF0dHJpYnV0ZS12YWx1ZVwiKSlcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZVZhbHVlQ29tcGxldGlvbnMoc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KTtcbiAgICAgICAgICAgIFxuICAgICAgICAvLyBIVE1MIGVudGl0aWVzXG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHBvcy5yb3cpLnN1YnN0cigwLCBwb3MuY29sdW1uKTtcbiAgICAgICAgaWYgKC8mW2Etel0qJC9pLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRIVE1MRW50aXR5Q29tcGxldGlvbnMoc3RhdGUsIHNlc3Npb24sIHBvcywgcHJlZml4KTtcblxuICAgICAgICByZXR1cm4gW107XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0VGFnQ29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnRzLm1hcChmdW5jdGlvbihlbGVtZW50KXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IGVsZW1lbnQsXG4gICAgICAgICAgICAgICAgbWV0YTogXCJ0YWdcIixcbiAgICAgICAgICAgICAgICBzY29yZTogMTAwMDAwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0QXR0cmlidXRlQ29tcGxldGlvbnMgPSBmdW5jdGlvbihzdGF0ZSwgc2Vzc2lvbiwgcG9zLCBwcmVmaXgpIHtcbiAgICAgICAgdmFyIHRhZ05hbWUgPSBmaW5kVGFnTmFtZShzZXNzaW9uLCBwb3MpO1xuICAgICAgICBpZiAoIXRhZ05hbWUpXG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIHZhciBhdHRyaWJ1dGVzID0gZ2xvYmFsQXR0cmlidXRlcztcbiAgICAgICAgaWYgKHRhZ05hbWUgaW4gYXR0cmlidXRlTWFwKSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzID0gYXR0cmlidXRlcy5jb25jYXQoT2JqZWN0LmtleXMoYXR0cmlidXRlTWFwW3RhZ05hbWVdKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGF0dHJpYnV0ZXMubWFwKGZ1bmN0aW9uKGF0dHJpYnV0ZSl7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNhcHRpb246IGF0dHJpYnV0ZSxcbiAgICAgICAgICAgICAgICBzbmlwcGV0OiBhdHRyaWJ1dGUgKyAnPVwiJDBcIicsXG4gICAgICAgICAgICAgICAgbWV0YTogXCJhdHRyaWJ1dGVcIixcbiAgICAgICAgICAgICAgICBzY29yZTogMTAwMDAwMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHRoaXMuZ2V0QXR0cmlidXRlVmFsdWVDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICB2YXIgdGFnTmFtZSA9IGZpbmRUYWdOYW1lKHNlc3Npb24sIHBvcyk7XG4gICAgICAgIHZhciBhdHRyaWJ1dGVOYW1lID0gZmluZEF0dHJpYnV0ZU5hbWUoc2Vzc2lvbiwgcG9zKTtcbiAgICAgICAgXG4gICAgICAgIGlmICghdGFnTmFtZSlcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgdmFyIHZhbHVlcyA9IFtdO1xuICAgICAgICBpZiAodGFnTmFtZSBpbiBhdHRyaWJ1dGVNYXAgJiYgYXR0cmlidXRlTmFtZSBpbiBhdHRyaWJ1dGVNYXBbdGFnTmFtZV0gJiYgdHlwZW9mIGF0dHJpYnV0ZU1hcFt0YWdOYW1lXVthdHRyaWJ1dGVOYW1lXSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgdmFsdWVzID0gT2JqZWN0LmtleXMoYXR0cmlidXRlTWFwW3RhZ05hbWVdW2F0dHJpYnV0ZU5hbWVdKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWVzLm1hcChmdW5jdGlvbih2YWx1ZSl7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGNhcHRpb246IHZhbHVlLFxuICAgICAgICAgICAgICAgIHNuaXBwZXQ6IHZhbHVlLFxuICAgICAgICAgICAgICAgIG1ldGE6IFwiYXR0cmlidXRlIHZhbHVlXCIsXG4gICAgICAgICAgICAgICAgc2NvcmU6IDEwMDAwMDBcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLmdldEhUTUxFbnRpdHlDb21wbGV0aW9ucyA9IGZ1bmN0aW9uKHN0YXRlLCBzZXNzaW9uLCBwb3MsIHByZWZpeCkge1xuICAgICAgICB2YXIgdmFsdWVzID0gWydBYWN1dGU7JywgJ2FhY3V0ZTsnLCAnQWNpcmM7JywgJ2FjaXJjOycsICdhY3V0ZTsnLCAnQUVsaWc7JywgJ2FlbGlnOycsICdBZ3JhdmU7JywgJ2FncmF2ZTsnLCAnYWxlZnN5bTsnLCAnQWxwaGE7JywgJ2FscGhhOycsICdhbXA7JywgJ2FuZDsnLCAnYW5nOycsICdBcmluZzsnLCAnYXJpbmc7JywgJ2FzeW1wOycsICdBdGlsZGU7JywgJ2F0aWxkZTsnLCAnQXVtbDsnLCAnYXVtbDsnLCAnYmRxdW87JywgJ0JldGE7JywgJ2JldGE7JywgJ2JydmJhcjsnLCAnYnVsbDsnLCAnY2FwOycsICdDY2VkaWw7JywgJ2NjZWRpbDsnLCAnY2VkaWw7JywgJ2NlbnQ7JywgJ0NoaTsnLCAnY2hpOycsICdjaXJjOycsICdjbHViczsnLCAnY29uZzsnLCAnY29weTsnLCAnY3JhcnI7JywgJ2N1cDsnLCAnY3VycmVuOycsICdEYWdnZXI7JywgJ2RhZ2dlcjsnLCAnZEFycjsnLCAnZGFycjsnLCAnZGVnOycsICdEZWx0YTsnLCAnZGVsdGE7JywgJ2RpYW1zOycsICdkaXZpZGU7JywgJ0VhY3V0ZTsnLCAnZWFjdXRlOycsICdFY2lyYzsnLCAnZWNpcmM7JywgJ0VncmF2ZTsnLCAnZWdyYXZlOycsICdlbXB0eTsnLCAnZW1zcDsnLCAnZW5zcDsnLCAnRXBzaWxvbjsnLCAnZXBzaWxvbjsnLCAnZXF1aXY7JywgJ0V0YTsnLCAnZXRhOycsICdFVEg7JywgJ2V0aDsnLCAnRXVtbDsnLCAnZXVtbDsnLCAnZXVybzsnLCAnZXhpc3Q7JywgJ2Zub2Y7JywgJ2ZvcmFsbDsnLCAnZnJhYzEyOycsICdmcmFjMTQ7JywgJ2ZyYWMzNDsnLCAnZnJhc2w7JywgJ0dhbW1hOycsICdnYW1tYTsnLCAnZ2U7JywgJ2d0OycsICdoQXJyOycsICdoYXJyOycsICdoZWFydHM7JywgJ2hlbGxpcDsnLCAnSWFjdXRlOycsICdpYWN1dGU7JywgJ0ljaXJjOycsICdpY2lyYzsnLCAnaWV4Y2w7JywgJ0lncmF2ZTsnLCAnaWdyYXZlOycsICdpbWFnZTsnLCAnaW5maW47JywgJ2ludDsnLCAnSW90YTsnLCAnaW90YTsnLCAnaXF1ZXN0OycsICdpc2luOycsICdJdW1sOycsICdpdW1sOycsICdLYXBwYTsnLCAna2FwcGE7JywgJ0xhbWJkYTsnLCAnbGFtYmRhOycsICdsYW5nOycsICdsYXF1bzsnLCAnbEFycjsnLCAnbGFycjsnLCAnbGNlaWw7JywgJ2xkcXVvOycsICdsZTsnLCAnbGZsb29yOycsICdsb3dhc3Q7JywgJ2xvejsnLCAnbHJtOycsICdsc2FxdW87JywgJ2xzcXVvOycsICdsdDsnLCAnbWFjcjsnLCAnbWRhc2g7JywgJ21pY3JvOycsICdtaWRkb3Q7JywgJ21pbnVzOycsICdNdTsnLCAnbXU7JywgJ25hYmxhOycsICduYnNwOycsICduZGFzaDsnLCAnbmU7JywgJ25pOycsICdub3Q7JywgJ25vdGluOycsICduc3ViOycsICdOdGlsZGU7JywgJ250aWxkZTsnLCAnTnU7JywgJ251OycsICdPYWN1dGU7JywgJ29hY3V0ZTsnLCAnT2NpcmM7JywgJ29jaXJjOycsICdPRWxpZzsnLCAnb2VsaWc7JywgJ09ncmF2ZTsnLCAnb2dyYXZlOycsICdvbGluZTsnLCAnT21lZ2E7JywgJ29tZWdhOycsICdPbWljcm9uOycsICdvbWljcm9uOycsICdvcGx1czsnLCAnb3I7JywgJ29yZGY7JywgJ29yZG07JywgJ09zbGFzaDsnLCAnb3NsYXNoOycsICdPdGlsZGU7JywgJ290aWxkZTsnLCAnb3RpbWVzOycsICdPdW1sOycsICdvdW1sOycsICdwYXJhOycsICdwYXJ0OycsICdwZXJtaWw7JywgJ3BlcnA7JywgJ1BoaTsnLCAncGhpOycsICdQaTsnLCAncGk7JywgJ3BpdjsnLCAncGx1c21uOycsICdwb3VuZDsnLCAnUHJpbWU7JywgJ3ByaW1lOycsICdwcm9kOycsICdwcm9wOycsICdQc2k7JywgJ3BzaTsnLCAncXVvdDsnLCAncmFkaWM7JywgJ3Jhbmc7JywgJ3JhcXVvOycsICdyQXJyOycsICdyYXJyOycsICdyY2VpbDsnLCAncmRxdW87JywgJ3JlYWw7JywgJ3JlZzsnLCAncmZsb29yOycsICdSaG87JywgJ3JobzsnLCAncmxtOycsICdyc2FxdW87JywgJ3JzcXVvOycsICdzYnF1bzsnLCAnU2Nhcm9uOycsICdzY2Fyb247JywgJ3Nkb3Q7JywgJ3NlY3Q7JywgJ3NoeTsnLCAnU2lnbWE7JywgJ3NpZ21hOycsICdzaWdtYWY7JywgJ3NpbTsnLCAnc3BhZGVzOycsICdzdWI7JywgJ3N1YmU7JywgJ3N1bTsnLCAnc3VwOycsICdzdXAxOycsICdzdXAyOycsICdzdXAzOycsICdzdXBlOycsICdzemxpZzsnLCAnVGF1OycsICd0YXU7JywgJ3RoZXJlNDsnLCAnVGhldGE7JywgJ3RoZXRhOycsICd0aGV0YXN5bTsnLCAndGhpbnNwOycsICdUSE9STjsnLCAndGhvcm47JywgJ3RpbGRlOycsICd0aW1lczsnLCAndHJhZGU7JywgJ1VhY3V0ZTsnLCAndWFjdXRlOycsICd1QXJyOycsICd1YXJyOycsICdVY2lyYzsnLCAndWNpcmM7JywgJ1VncmF2ZTsnLCAndWdyYXZlOycsICd1bWw7JywgJ3Vwc2loOycsICdVcHNpbG9uOycsICd1cHNpbG9uOycsICdVdW1sOycsICd1dW1sOycsICd3ZWllcnA7JywgJ1hpOycsICd4aTsnLCAnWWFjdXRlOycsICd5YWN1dGU7JywgJ3llbjsnLCAnWXVtbDsnLCAneXVtbDsnLCAnWmV0YTsnLCAnemV0YTsnLCAnendqOycsICd6d25qOyddO1xuXG4gICAgICAgIHJldHVybiB2YWx1ZXMubWFwKGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgY2FwdGlvbjogdmFsdWUsXG4gICAgICAgICAgICAgICAgc25pcHBldDogdmFsdWUsXG4gICAgICAgICAgICAgICAgbWV0YTogXCJodG1sIGVudGl0eVwiLFxuICAgICAgICAgICAgICAgIHNjb3JlOiAxMDAwMDAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9O1xuXG59KS5jYWxsKEh0bWxDb21wbGV0aW9ucy5wcm90b3R5cGUpO1xuXG5leHBvcnRzLkh0bWxDb21wbGV0aW9ucyA9IEh0bWxDb21wbGV0aW9ucztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==