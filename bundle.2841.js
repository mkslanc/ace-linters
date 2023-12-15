(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2841],{

/***/ 11828:
/***/ ((module) => {

module.exports = `.ace_static_highlight {
    font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'Source Code Pro', 'source-code-pro', 'Droid Sans Mono', monospace;
    font-size: 12px;
    white-space: pre-wrap
}

.ace_static_highlight .ace_gutter {
    width: 2em;
    text-align: right;
    padding: 0 3px 0 0;
    margin-right: 3px;
    contain: none;
}

.ace_static_highlight.ace_show_gutter .ace_line {
    padding-left: 2.6em;
}

.ace_static_highlight .ace_line { position: relative; }

.ace_static_highlight .ace_gutter-cell {
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    top: 0;
    bottom: 0;
    left: 0;
    position: absolute;
}


.ace_static_highlight .ace_gutter-cell:before {
    content: counter(ace_line, decimal);
    counter-increment: ace_line;
}
.ace_static_highlight {
    counter-reset: ace_line;
}
`;


/***/ }),

/***/ 82841:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var EditSession = (__webpack_require__(66480)/* .EditSession */ .m);
var TextLayer = (__webpack_require__(73572)/* .Text */ .x);
var baseStyles = __webpack_require__(11828);
var config = __webpack_require__(13188);
var dom = __webpack_require__(6359);
var escapeHTML = (__webpack_require__(20124).escapeHTML);

class Element {
    /**
     * @param {string} type
     */
    constructor(type) {
        /** @type{string} */this.className;
        this.type = type;
        this.style = {};
        this.textContent = "";
    }

    cloneNode() {
        return this;
    }

    appendChild(child) {
        this.textContent += child.toString();
    }

    toString() {
        var stringBuilder = [];
        if (this.type != "fragment") {
            stringBuilder.push("<", this.type);
            if (this.className)
                stringBuilder.push(" class='", this.className, "'");
            var styleStr = [];
            for (var key in this.style) {
                styleStr.push(key, ":", this.style[key]);
            }
            if (styleStr.length)
                stringBuilder.push(" style='", styleStr.join(""), "'");
            stringBuilder.push(">");
        }

        if (this.textContent) {
            stringBuilder.push(this.textContent);
        }

        if (this.type != "fragment") {
            stringBuilder.push("</", this.type, ">");
        }

        return stringBuilder.join("");
    }
}


var simpleDom = {
    createTextNode: function(/** @type {string} */ textContent, /** @type {any} */ element) {
        return escapeHTML(textContent);
    },
    createElement: function(/** @type {string} */ type) {
        return new Element(type);
    },
    createFragment: function() {
        return new Element("fragment");
    }
};


/**@type {any}*/
var SimpleTextLayer = function() {
    this.config = {};
    this.dom = simpleDom;
};
SimpleTextLayer.prototype = TextLayer.prototype;

/**
 * 
 * @param {HTMLElement} el
 * @param opts
 * @param [callback]
 * @returns {boolean}
 */
var highlight = function(el, opts, callback) {
    var m = el.className.match(/lang-(\w+)/);
    var mode = opts.mode || m && ("ace/mode/" + m[1]);
    if (!mode)
        return false;
    var theme = opts.theme || "ace/theme/textmate";
    
    var data = "";
    var nodes = [];

    if (el.firstElementChild) {
        var textLen = 0;
        for (var i = 0; i < el.childNodes.length; i++) {
            /**@type {any}*/
            var ch = el.childNodes[i];
            if (ch.nodeType == 3) {
                textLen += ch.data.length;
                data += ch.data;
            } else {
                nodes.push(textLen, ch);
            }
        }
    } else {
        data = el.textContent;
        if (opts.trim)
            data = data.trim();
    }
    
    highlight.render(data, mode, theme, opts.firstLineNumber, !opts.showGutter, function (highlighted) {
        dom.importCssString(highlighted.css, "ace_highlight", true);
        el.innerHTML = highlighted.html;
        /** 
         * TODO: check if child exists
         * @type {any} 
         */
        var container = el.firstChild.firstChild;
        for (var i = 0; i < nodes.length; i += 2) {
            var pos = highlighted.session.doc.indexToPosition(nodes[i]);
            var node = nodes[i + 1];
            var lineEl = container.children[pos.row];
            lineEl && lineEl.appendChild(node);
        }
        callback && callback();
    });
};

/**
 * Transforms a given input code snippet into HTML using the given mode
 *
 * @param {string} input Code snippet
 * @param {string|import("../../ace-internal").Ace.SyntaxMode} mode String specifying the mode to load such as
 *  `ace/mode/javascript` or, a mode loaded from `/ace/mode`
 *  (use 'ServerSideHiglighter.getMode').
 * @param {string} theme String specifying the theme to load such as
 *  `ace/theme/twilight` or, a theme loaded from `/ace/theme`.
 * @param {number} lineStart A number indicating the first line number. Defaults
 *  to 1.
 * @param {boolean} disableGutter Specifies whether or not to disable the gutter.
 *  `true` disables the gutter, `false` enables the gutter. Defaults to `false`.
 * @param {function} [callback] When specifying the mode or theme as a string,
 *  this method has no return value and you must specify a callback function. The
 *  callback will receive the rendered object containing the properties `html`
 *  and `css`.
 * @returns {object} An object containing the properties `html` and `css`.
 */
highlight.render = function(input, mode, theme, lineStart, disableGutter, callback) {
    var waiting = 1;
    var modeCache = EditSession.prototype.$modes;

    // if either the theme or the mode were specified as objects
    // then we need to lazily load them.
    if (typeof theme == "string") {
        waiting++;
        config.loadModule(['theme', theme], function(m) {
            theme = m;
            --waiting || done();
        });
    }
    // allow setting mode options e.h {path: "ace/mode/php", inline:true}
    var modeOptions;
    if (mode && typeof mode === "object" && !mode.getTokenizer) {
        modeOptions = mode;
        mode = modeOptions.path;
    }
    if (typeof mode == "string") {
        waiting++;
        config.loadModule(['mode', mode], function(m) {
            if (!modeCache[/**@type{string}*/(mode)] || modeOptions)
                modeCache[/**@type{string}*/(mode)] = new m.Mode(modeOptions);
            mode = modeCache[/**@type{string}*/(mode)];
            --waiting || done();
        });
    }

    // loads or passes the specified mode module then calls renderer
    function done() {
        var result = highlight.renderSync(input, mode, theme, lineStart, disableGutter);
        return callback ? callback(result) : result;
    }
    return --waiting || done();
};

/**
 * Transforms a given input code snippet into HTML using the given mode
 * @param {string} input Code snippet
 * @param {import("../../ace-internal").Ace.SyntaxMode|string} mode Mode loaded from /ace/mode (use 'ServerSideHiglighter.getMode')
 * @param {any} theme
 * @param {any} lineStart
 * @param {boolean} disableGutter
 * @returns {object} An object containing: html, css
 */
highlight.renderSync = function(input, mode, theme, lineStart, disableGutter) {
    lineStart = parseInt(lineStart || 1, 10);

    var session = new EditSession("");
    session.setUseWorker(false);
    session.setMode(mode);

    /**@type {TextLayer}*/
    var textLayer = new SimpleTextLayer();
    textLayer.setSession(session);
    Object.keys(textLayer.$tabStrings).forEach(function(k) {
        if (typeof textLayer.$tabStrings[k] == "string") {
            var el = simpleDom.createFragment();
            el.textContent = textLayer.$tabStrings[k];
            textLayer.$tabStrings[k] = el;
        }
    });

    session.setValue(input);
    var length =  session.getLength();
    
    var outerEl = simpleDom.createElement("div");
    outerEl.className = theme.cssClass;
    
    var innerEl = simpleDom.createElement("div");
    innerEl.className = "ace_static_highlight" + (disableGutter ? "" : " ace_show_gutter");
    innerEl.style["counter-reset"] = "ace_line " + (lineStart - 1);

    for (var ix = 0; ix < length; ix++) {
        var lineEl = simpleDom.createElement("div");
        lineEl.className = "ace_line";
        
        if (!disableGutter) {
            var gutterEl = simpleDom.createElement("span");
            gutterEl.className ="ace_gutter ace_gutter-cell";
            gutterEl.textContent = ""; /*(ix + lineStart) + */
            lineEl.appendChild(gutterEl);
        }
        textLayer.$renderLine(lineEl, ix, false);
        lineEl.textContent += "\n";
        innerEl.appendChild(lineEl);
    }

    //console.log(JSON.stringify(outerEl, null, 2));
    //console.log(outerEl.toString());
    outerEl.appendChild(innerEl);

    return {
        css: baseStyles + theme.cssText,
        html: outerEl.toString(),
        session: session
    };
};

module.exports = highlight;
module.exports.highlight = highlight;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9zdGF0aWMtY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9zdGF0aWNfaGlnaGxpZ2h0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gYC5hY2Vfc3RhdGljX2hpZ2hsaWdodCB7XG4gICAgZm9udC1mYW1pbHk6ICdNb25hY28nLCAnTWVubG8nLCAnVWJ1bnR1IE1vbm8nLCAnQ29uc29sYXMnLCAnU291cmNlIENvZGUgUHJvJywgJ3NvdXJjZS1jb2RlLXBybycsICdEcm9pZCBTYW5zIE1vbm8nLCBtb25vc3BhY2U7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcFxufVxuXG4uYWNlX3N0YXRpY19oaWdobGlnaHQgLmFjZV9ndXR0ZXIge1xuICAgIHdpZHRoOiAyZW07XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgcGFkZGluZzogMCAzcHggMCAwO1xuICAgIG1hcmdpbi1yaWdodDogM3B4O1xuICAgIGNvbnRhaW46IG5vbmU7XG59XG5cbi5hY2Vfc3RhdGljX2hpZ2hsaWdodC5hY2Vfc2hvd19ndXR0ZXIgLmFjZV9saW5lIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDIuNmVtO1xufVxuXG4uYWNlX3N0YXRpY19oaWdobGlnaHQgLmFjZV9saW5lIHsgcG9zaXRpb246IHJlbGF0aXZlOyB9XG5cbi5hY2Vfc3RhdGljX2hpZ2hsaWdodCAuYWNlX2d1dHRlci1jZWxsIHtcbiAgICAtbW96LXVzZXItc2VsZWN0OiAtbW96LW5vbmU7XG4gICAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cblxuXG4uYWNlX3N0YXRpY19oaWdobGlnaHQgLmFjZV9ndXR0ZXItY2VsbDpiZWZvcmUge1xuICAgIGNvbnRlbnQ6IGNvdW50ZXIoYWNlX2xpbmUsIGRlY2ltYWwpO1xuICAgIGNvdW50ZXItaW5jcmVtZW50OiBhY2VfbGluZTtcbn1cbi5hY2Vfc3RhdGljX2hpZ2hsaWdodCB7XG4gICAgY291bnRlci1yZXNldDogYWNlX2xpbmU7XG59XG5gO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBFZGl0U2Vzc2lvbiA9IHJlcXVpcmUoXCIuLi9lZGl0X3Nlc3Npb25cIikuRWRpdFNlc3Npb247XG52YXIgVGV4dExheWVyID0gcmVxdWlyZShcIi4uL2xheWVyL3RleHRcIikuVGV4dDtcbnZhciBiYXNlU3R5bGVzID0gcmVxdWlyZShcIi4vc3RhdGljLWNzc1wiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiLi4vY29uZmlnXCIpO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9saWIvZG9tXCIpO1xudmFyIGVzY2FwZUhUTUwgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIikuZXNjYXBlSFRNTDtcblxuY2xhc3MgRWxlbWVudCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgICAgIC8qKiBAdHlwZXtzdHJpbmd9ICovdGhpcy5jbGFzc05hbWU7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuc3R5bGUgPSB7fTtcbiAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgfVxuXG4gICAgY2xvbmVOb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBhcHBlbmRDaGlsZChjaGlsZCkge1xuICAgICAgICB0aGlzLnRleHRDb250ZW50ICs9IGNoaWxkLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHZhciBzdHJpbmdCdWlsZGVyID0gW107XG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT0gXCJmcmFnbWVudFwiKSB7XG4gICAgICAgICAgICBzdHJpbmdCdWlsZGVyLnB1c2goXCI8XCIsIHRoaXMudHlwZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5jbGFzc05hbWUpXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5wdXNoKFwiIGNsYXNzPSdcIiwgdGhpcy5jbGFzc05hbWUsIFwiJ1wiKTtcbiAgICAgICAgICAgIHZhciBzdHlsZVN0ciA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuc3R5bGUpIHtcbiAgICAgICAgICAgICAgICBzdHlsZVN0ci5wdXNoKGtleSwgXCI6XCIsIHRoaXMuc3R5bGVba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3R5bGVTdHIubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIucHVzaChcIiBzdHlsZT0nXCIsIHN0eWxlU3RyLmpvaW4oXCJcIiksIFwiJ1wiKTtcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIucHVzaChcIj5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5wdXNoKHRoaXMudGV4dENvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPSBcImZyYWdtZW50XCIpIHtcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIucHVzaChcIjwvXCIsIHRoaXMudHlwZSwgXCI+XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0cmluZ0J1aWxkZXIuam9pbihcIlwiKTtcbiAgICB9XG59XG5cblxudmFyIHNpbXBsZURvbSA9IHtcbiAgICBjcmVhdGVUZXh0Tm9kZTogZnVuY3Rpb24oLyoqIEB0eXBlIHtzdHJpbmd9ICovIHRleHRDb250ZW50LCAvKiogQHR5cGUge2FueX0gKi8gZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZXNjYXBlSFRNTCh0ZXh0Q29udGVudCk7XG4gICAgfSxcbiAgICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbigvKiogQHR5cGUge3N0cmluZ30gKi8gdHlwZSkge1xuICAgICAgICByZXR1cm4gbmV3IEVsZW1lbnQodHlwZSk7XG4gICAgfSxcbiAgICBjcmVhdGVGcmFnbWVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgRWxlbWVudChcImZyYWdtZW50XCIpO1xuICAgIH1cbn07XG5cblxuLyoqQHR5cGUge2FueX0qL1xudmFyIFNpbXBsZVRleHRMYXllciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuY29uZmlnID0ge307XG4gICAgdGhpcy5kb20gPSBzaW1wbGVEb207XG59O1xuU2ltcGxlVGV4dExheWVyLnByb3RvdHlwZSA9IFRleHRMYXllci5wcm90b3R5cGU7XG5cbi8qKlxuICogXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbFxuICogQHBhcmFtIG9wdHNcbiAqIEBwYXJhbSBbY2FsbGJhY2tdXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqL1xudmFyIGhpZ2hsaWdodCA9IGZ1bmN0aW9uKGVsLCBvcHRzLCBjYWxsYmFjaykge1xuICAgIHZhciBtID0gZWwuY2xhc3NOYW1lLm1hdGNoKC9sYW5nLShcXHcrKS8pO1xuICAgIHZhciBtb2RlID0gb3B0cy5tb2RlIHx8IG0gJiYgKFwiYWNlL21vZGUvXCIgKyBtWzFdKTtcbiAgICBpZiAoIW1vZGUpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB2YXIgdGhlbWUgPSBvcHRzLnRoZW1lIHx8IFwiYWNlL3RoZW1lL3RleHRtYXRlXCI7XG4gICAgXG4gICAgdmFyIGRhdGEgPSBcIlwiO1xuICAgIHZhciBub2RlcyA9IFtdO1xuXG4gICAgaWYgKGVsLmZpcnN0RWxlbWVudENoaWxkKSB7XG4gICAgICAgIHZhciB0ZXh0TGVuID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5jaGlsZE5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAvKipAdHlwZSB7YW55fSovXG4gICAgICAgICAgICB2YXIgY2ggPSBlbC5jaGlsZE5vZGVzW2ldO1xuICAgICAgICAgICAgaWYgKGNoLm5vZGVUeXBlID09IDMpIHtcbiAgICAgICAgICAgICAgICB0ZXh0TGVuICs9IGNoLmRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGRhdGEgKz0gY2guZGF0YTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZXMucHVzaCh0ZXh0TGVuLCBjaCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhID0gZWwudGV4dENvbnRlbnQ7XG4gICAgICAgIGlmIChvcHRzLnRyaW0pXG4gICAgICAgICAgICBkYXRhID0gZGF0YS50cmltKCk7XG4gICAgfVxuICAgIFxuICAgIGhpZ2hsaWdodC5yZW5kZXIoZGF0YSwgbW9kZSwgdGhlbWUsIG9wdHMuZmlyc3RMaW5lTnVtYmVyLCAhb3B0cy5zaG93R3V0dGVyLCBmdW5jdGlvbiAoaGlnaGxpZ2h0ZWQpIHtcbiAgICAgICAgZG9tLmltcG9ydENzc1N0cmluZyhoaWdobGlnaHRlZC5jc3MsIFwiYWNlX2hpZ2hsaWdodFwiLCB0cnVlKTtcbiAgICAgICAgZWwuaW5uZXJIVE1MID0gaGlnaGxpZ2h0ZWQuaHRtbDtcbiAgICAgICAgLyoqIFxuICAgICAgICAgKiBUT0RPOiBjaGVjayBpZiBjaGlsZCBleGlzdHNcbiAgICAgICAgICogQHR5cGUge2FueX0gXG4gICAgICAgICAqL1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZWwuZmlyc3RDaGlsZC5maXJzdENoaWxkO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICB2YXIgcG9zID0gaGlnaGxpZ2h0ZWQuc2Vzc2lvbi5kb2MuaW5kZXhUb1Bvc2l0aW9uKG5vZGVzW2ldKTtcbiAgICAgICAgICAgIHZhciBub2RlID0gbm9kZXNbaSArIDFdO1xuICAgICAgICAgICAgdmFyIGxpbmVFbCA9IGNvbnRhaW5lci5jaGlsZHJlbltwb3Mucm93XTtcbiAgICAgICAgICAgIGxpbmVFbCAmJiBsaW5lRWwuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyBhIGdpdmVuIGlucHV0IGNvZGUgc25pcHBldCBpbnRvIEhUTUwgdXNpbmcgdGhlIGdpdmVuIG1vZGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5wdXQgQ29kZSBzbmlwcGV0XG4gKiBAcGFyYW0ge3N0cmluZ3xpbXBvcnQoXCIuLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLlN5bnRheE1vZGV9IG1vZGUgU3RyaW5nIHNwZWNpZnlpbmcgdGhlIG1vZGUgdG8gbG9hZCBzdWNoIGFzXG4gKiAgYGFjZS9tb2RlL2phdmFzY3JpcHRgIG9yLCBhIG1vZGUgbG9hZGVkIGZyb20gYC9hY2UvbW9kZWBcbiAqICAodXNlICdTZXJ2ZXJTaWRlSGlnbGlnaHRlci5nZXRNb2RlJykuXG4gKiBAcGFyYW0ge3N0cmluZ30gdGhlbWUgU3RyaW5nIHNwZWNpZnlpbmcgdGhlIHRoZW1lIHRvIGxvYWQgc3VjaCBhc1xuICogIGBhY2UvdGhlbWUvdHdpbGlnaHRgIG9yLCBhIHRoZW1lIGxvYWRlZCBmcm9tIGAvYWNlL3RoZW1lYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lU3RhcnQgQSBudW1iZXIgaW5kaWNhdGluZyB0aGUgZmlyc3QgbGluZSBudW1iZXIuIERlZmF1bHRzXG4gKiAgdG8gMS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZUd1dHRlciBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gZGlzYWJsZSB0aGUgZ3V0dGVyLlxuICogIGB0cnVlYCBkaXNhYmxlcyB0aGUgZ3V0dGVyLCBgZmFsc2VgIGVuYWJsZXMgdGhlIGd1dHRlci4gRGVmYXVsdHMgdG8gYGZhbHNlYC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjYWxsYmFja10gV2hlbiBzcGVjaWZ5aW5nIHRoZSBtb2RlIG9yIHRoZW1lIGFzIGEgc3RyaW5nLFxuICogIHRoaXMgbWV0aG9kIGhhcyBubyByZXR1cm4gdmFsdWUgYW5kIHlvdSBtdXN0IHNwZWNpZnkgYSBjYWxsYmFjayBmdW5jdGlvbi4gVGhlXG4gKiAgY2FsbGJhY2sgd2lsbCByZWNlaXZlIHRoZSByZW5kZXJlZCBvYmplY3QgY29udGFpbmluZyB0aGUgcHJvcGVydGllcyBgaHRtbGBcbiAqICBhbmQgYGNzc2AuXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgcHJvcGVydGllcyBgaHRtbGAgYW5kIGBjc3NgLlxuICovXG5oaWdobGlnaHQucmVuZGVyID0gZnVuY3Rpb24oaW5wdXQsIG1vZGUsIHRoZW1lLCBsaW5lU3RhcnQsIGRpc2FibGVHdXR0ZXIsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHdhaXRpbmcgPSAxO1xuICAgIHZhciBtb2RlQ2FjaGUgPSBFZGl0U2Vzc2lvbi5wcm90b3R5cGUuJG1vZGVzO1xuXG4gICAgLy8gaWYgZWl0aGVyIHRoZSB0aGVtZSBvciB0aGUgbW9kZSB3ZXJlIHNwZWNpZmllZCBhcyBvYmplY3RzXG4gICAgLy8gdGhlbiB3ZSBuZWVkIHRvIGxhemlseSBsb2FkIHRoZW0uXG4gICAgaWYgKHR5cGVvZiB0aGVtZSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHdhaXRpbmcrKztcbiAgICAgICAgY29uZmlnLmxvYWRNb2R1bGUoWyd0aGVtZScsIHRoZW1lXSwgZnVuY3Rpb24obSkge1xuICAgICAgICAgICAgdGhlbWUgPSBtO1xuICAgICAgICAgICAgLS13YWl0aW5nIHx8IGRvbmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIGFsbG93IHNldHRpbmcgbW9kZSBvcHRpb25zIGUuaCB7cGF0aDogXCJhY2UvbW9kZS9waHBcIiwgaW5saW5lOnRydWV9XG4gICAgdmFyIG1vZGVPcHRpb25zO1xuICAgIGlmIChtb2RlICYmIHR5cGVvZiBtb2RlID09PSBcIm9iamVjdFwiICYmICFtb2RlLmdldFRva2VuaXplcikge1xuICAgICAgICBtb2RlT3B0aW9ucyA9IG1vZGU7XG4gICAgICAgIG1vZGUgPSBtb2RlT3B0aW9ucy5wYXRoO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG1vZGUgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICB3YWl0aW5nKys7XG4gICAgICAgIGNvbmZpZy5sb2FkTW9kdWxlKFsnbW9kZScsIG1vZGVdLCBmdW5jdGlvbihtKSB7XG4gICAgICAgICAgICBpZiAoIW1vZGVDYWNoZVsvKipAdHlwZXtzdHJpbmd9Ki8obW9kZSldIHx8IG1vZGVPcHRpb25zKVxuICAgICAgICAgICAgICAgIG1vZGVDYWNoZVsvKipAdHlwZXtzdHJpbmd9Ki8obW9kZSldID0gbmV3IG0uTW9kZShtb2RlT3B0aW9ucyk7XG4gICAgICAgICAgICBtb2RlID0gbW9kZUNhY2hlWy8qKkB0eXBle3N0cmluZ30qLyhtb2RlKV07XG4gICAgICAgICAgICAtLXdhaXRpbmcgfHwgZG9uZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBsb2FkcyBvciBwYXNzZXMgdGhlIHNwZWNpZmllZCBtb2RlIG1vZHVsZSB0aGVuIGNhbGxzIHJlbmRlcmVyXG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGhpZ2hsaWdodC5yZW5kZXJTeW5jKGlucHV0LCBtb2RlLCB0aGVtZSwgbGluZVN0YXJ0LCBkaXNhYmxlR3V0dGVyKTtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrID8gY2FsbGJhY2socmVzdWx0KSA6IHJlc3VsdDtcbiAgICB9XG4gICAgcmV0dXJuIC0td2FpdGluZyB8fCBkb25lKCk7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgYSBnaXZlbiBpbnB1dCBjb2RlIHNuaXBwZXQgaW50byBIVE1MIHVzaW5nIHRoZSBnaXZlbiBtb2RlXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5wdXQgQ29kZSBzbmlwcGV0XG4gKiBAcGFyYW0ge2ltcG9ydChcIi4uLy4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuU3ludGF4TW9kZXxzdHJpbmd9IG1vZGUgTW9kZSBsb2FkZWQgZnJvbSAvYWNlL21vZGUgKHVzZSAnU2VydmVyU2lkZUhpZ2xpZ2h0ZXIuZ2V0TW9kZScpXG4gKiBAcGFyYW0ge2FueX0gdGhlbWVcbiAqIEBwYXJhbSB7YW55fSBsaW5lU3RhcnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZUd1dHRlclxuICogQHJldHVybnMge29iamVjdH0gQW4gb2JqZWN0IGNvbnRhaW5pbmc6IGh0bWwsIGNzc1xuICovXG5oaWdobGlnaHQucmVuZGVyU3luYyA9IGZ1bmN0aW9uKGlucHV0LCBtb2RlLCB0aGVtZSwgbGluZVN0YXJ0LCBkaXNhYmxlR3V0dGVyKSB7XG4gICAgbGluZVN0YXJ0ID0gcGFyc2VJbnQobGluZVN0YXJ0IHx8IDEsIDEwKTtcblxuICAgIHZhciBzZXNzaW9uID0gbmV3IEVkaXRTZXNzaW9uKFwiXCIpO1xuICAgIHNlc3Npb24uc2V0VXNlV29ya2VyKGZhbHNlKTtcbiAgICBzZXNzaW9uLnNldE1vZGUobW9kZSk7XG5cbiAgICAvKipAdHlwZSB7VGV4dExheWVyfSovXG4gICAgdmFyIHRleHRMYXllciA9IG5ldyBTaW1wbGVUZXh0TGF5ZXIoKTtcbiAgICB0ZXh0TGF5ZXIuc2V0U2Vzc2lvbihzZXNzaW9uKTtcbiAgICBPYmplY3Qua2V5cyh0ZXh0TGF5ZXIuJHRhYlN0cmluZ3MpLmZvckVhY2goZnVuY3Rpb24oaykge1xuICAgICAgICBpZiAodHlwZW9mIHRleHRMYXllci4kdGFiU3RyaW5nc1trXSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSBzaW1wbGVEb20uY3JlYXRlRnJhZ21lbnQoKTtcbiAgICAgICAgICAgIGVsLnRleHRDb250ZW50ID0gdGV4dExheWVyLiR0YWJTdHJpbmdzW2tdO1xuICAgICAgICAgICAgdGV4dExheWVyLiR0YWJTdHJpbmdzW2tdID0gZWw7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHNlc3Npb24uc2V0VmFsdWUoaW5wdXQpO1xuICAgIHZhciBsZW5ndGggPSAgc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICBcbiAgICB2YXIgb3V0ZXJFbCA9IHNpbXBsZURvbS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIG91dGVyRWwuY2xhc3NOYW1lID0gdGhlbWUuY3NzQ2xhc3M7XG4gICAgXG4gICAgdmFyIGlubmVyRWwgPSBzaW1wbGVEb20uY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBpbm5lckVsLmNsYXNzTmFtZSA9IFwiYWNlX3N0YXRpY19oaWdobGlnaHRcIiArIChkaXNhYmxlR3V0dGVyID8gXCJcIiA6IFwiIGFjZV9zaG93X2d1dHRlclwiKTtcbiAgICBpbm5lckVsLnN0eWxlW1wiY291bnRlci1yZXNldFwiXSA9IFwiYWNlX2xpbmUgXCIgKyAobGluZVN0YXJ0IC0gMSk7XG5cbiAgICBmb3IgKHZhciBpeCA9IDA7IGl4IDwgbGVuZ3RoOyBpeCsrKSB7XG4gICAgICAgIHZhciBsaW5lRWwgPSBzaW1wbGVEb20uY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgbGluZUVsLmNsYXNzTmFtZSA9IFwiYWNlX2xpbmVcIjtcbiAgICAgICAgXG4gICAgICAgIGlmICghZGlzYWJsZUd1dHRlcikge1xuICAgICAgICAgICAgdmFyIGd1dHRlckVsID0gc2ltcGxlRG9tLmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICAgICAgZ3V0dGVyRWwuY2xhc3NOYW1lID1cImFjZV9ndXR0ZXIgYWNlX2d1dHRlci1jZWxsXCI7XG4gICAgICAgICAgICBndXR0ZXJFbC50ZXh0Q29udGVudCA9IFwiXCI7IC8qKGl4ICsgbGluZVN0YXJ0KSArICovXG4gICAgICAgICAgICBsaW5lRWwuYXBwZW5kQ2hpbGQoZ3V0dGVyRWwpO1xuICAgICAgICB9XG4gICAgICAgIHRleHRMYXllci4kcmVuZGVyTGluZShsaW5lRWwsIGl4LCBmYWxzZSk7XG4gICAgICAgIGxpbmVFbC50ZXh0Q29udGVudCArPSBcIlxcblwiO1xuICAgICAgICBpbm5lckVsLmFwcGVuZENoaWxkKGxpbmVFbCk7XG4gICAgfVxuXG4gICAgLy9jb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShvdXRlckVsLCBudWxsLCAyKSk7XG4gICAgLy9jb25zb2xlLmxvZyhvdXRlckVsLnRvU3RyaW5nKCkpO1xuICAgIG91dGVyRWwuYXBwZW5kQ2hpbGQoaW5uZXJFbCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjc3M6IGJhc2VTdHlsZXMgKyB0aGVtZS5jc3NUZXh0LFxuICAgICAgICBodG1sOiBvdXRlckVsLnRvU3RyaW5nKCksXG4gICAgICAgIHNlc3Npb246IHNlc3Npb25cbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBoaWdobGlnaHQ7XG5tb2R1bGUuZXhwb3J0cy5oaWdobGlnaHQgPSBoaWdobGlnaHQ7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=