(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7254],{

/***/ 16247:
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

/***/ 47254:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";

/**
 * @typedef {import("../../ace-internal").Ace.SyntaxMode} SyntaxMode
 * @typedef {import("../../ace-internal").Ace.Theme} Theme
 */


var EditSession = (__webpack_require__(33464)/* .EditSession */ .f);
var TextLayer = (__webpack_require__(10694)/* .Text */ .E);
var baseStyles = __webpack_require__(16247);
var config = __webpack_require__(76321);
var dom = __webpack_require__(71435);
var escapeHTML = (__webpack_require__(39955).escapeHTML);

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
 * @param {import("../../ace-internal").Ace.StaticHighlightOptions} opts
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
 * @param {string | SyntaxMode} mode String specifying the mode to load such as
 *  `ace/mode/javascript` or, a mode loaded from `/ace/mode`
 *  (use 'ServerSideHiglighter.getMode').
 * @param {string | Theme} theme String specifying the theme to load such as
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
        var result = highlight.renderSync(input, mode, /**@type{Theme}*/(theme), lineStart, disableGutter);
        return callback ? callback(result) : result;
    }
    return --waiting || done();
};

/**
 * Transforms a given input code snippet into HTML using the given mode
 * @param {string} input Code snippet
 * @param {SyntaxMode | string} mode Mode loaded from /ace/mode (use 'ServerSideHiglighter.getMode')
 * @param {Theme} theme
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLGFBQWE7QUFDbEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3QkFBd0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvc3RhdGljLWNzcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvc3RhdGljX2hpZ2hsaWdodC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGAuYWNlX3N0YXRpY19oaWdobGlnaHQge1xuICAgIGZvbnQtZmFtaWx5OiAnTW9uYWNvJywgJ01lbmxvJywgJ1VidW50dSBNb25vJywgJ0NvbnNvbGFzJywgJ1NvdXJjZSBDb2RlIFBybycsICdzb3VyY2UtY29kZS1wcm8nLCAnRHJvaWQgU2FucyBNb25vJywgbW9ub3NwYWNlO1xuICAgIGZvbnQtc2l6ZTogMTJweDtcbiAgICB3aGl0ZS1zcGFjZTogcHJlLXdyYXBcbn1cblxuLmFjZV9zdGF0aWNfaGlnaGxpZ2h0IC5hY2VfZ3V0dGVyIHtcbiAgICB3aWR0aDogMmVtO1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgIHBhZGRpbmc6IDAgM3B4IDAgMDtcbiAgICBtYXJnaW4tcmlnaHQ6IDNweDtcbiAgICBjb250YWluOiBub25lO1xufVxuXG4uYWNlX3N0YXRpY19oaWdobGlnaHQuYWNlX3Nob3dfZ3V0dGVyIC5hY2VfbGluZSB7XG4gICAgcGFkZGluZy1sZWZ0OiAyLjZlbTtcbn1cblxuLmFjZV9zdGF0aWNfaGlnaGxpZ2h0IC5hY2VfbGluZSB7IHBvc2l0aW9uOiByZWxhdGl2ZTsgfVxuXG4uYWNlX3N0YXRpY19oaWdobGlnaHQgLmFjZV9ndXR0ZXItY2VsbCB7XG4gICAgLW1vei11c2VyLXNlbGVjdDogLW1vei1ub25lO1xuICAgIC1raHRtbC11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIHRvcDogMDtcbiAgICBib3R0b206IDA7XG4gICAgbGVmdDogMDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG5cblxuLmFjZV9zdGF0aWNfaGlnaGxpZ2h0IC5hY2VfZ3V0dGVyLWNlbGw6YmVmb3JlIHtcbiAgICBjb250ZW50OiBjb3VudGVyKGFjZV9saW5lLCBkZWNpbWFsKTtcbiAgICBjb3VudGVyLWluY3JlbWVudDogYWNlX2xpbmU7XG59XG4uYWNlX3N0YXRpY19oaWdobGlnaHQge1xuICAgIGNvdW50ZXItcmVzZXQ6IGFjZV9saW5lO1xufVxuYDtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5TeW50YXhNb2RlfSBTeW50YXhNb2RlXG4gKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5UaGVtZX0gVGhlbWVcbiAqL1xuXG5cbnZhciBFZGl0U2Vzc2lvbiA9IHJlcXVpcmUoXCIuLi9lZGl0X3Nlc3Npb25cIikuRWRpdFNlc3Npb247XG52YXIgVGV4dExheWVyID0gcmVxdWlyZShcIi4uL2xheWVyL3RleHRcIikuVGV4dDtcbnZhciBiYXNlU3R5bGVzID0gcmVxdWlyZShcIi4vc3RhdGljLWNzc1wiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiLi4vY29uZmlnXCIpO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9saWIvZG9tXCIpO1xudmFyIGVzY2FwZUhUTUwgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIikuZXNjYXBlSFRNTDtcblxuY2xhc3MgRWxlbWVudCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHR5cGVcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0eXBlKSB7XG4gICAgICAgIC8qKiBAdHlwZXtzdHJpbmd9ICovdGhpcy5jbGFzc05hbWU7XG4gICAgICAgIHRoaXMudHlwZSA9IHR5cGU7XG4gICAgICAgIHRoaXMuc3R5bGUgPSB7fTtcbiAgICAgICAgdGhpcy50ZXh0Q29udGVudCA9IFwiXCI7XG4gICAgfVxuXG4gICAgY2xvbmVOb2RlKCkge1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBhcHBlbmRDaGlsZChjaGlsZCkge1xuICAgICAgICB0aGlzLnRleHRDb250ZW50ICs9IGNoaWxkLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7XG4gICAgICAgIHZhciBzdHJpbmdCdWlsZGVyID0gW107XG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT0gXCJmcmFnbWVudFwiKSB7XG4gICAgICAgICAgICBzdHJpbmdCdWlsZGVyLnB1c2goXCI8XCIsIHRoaXMudHlwZSk7XG4gICAgICAgICAgICBpZiAodGhpcy5jbGFzc05hbWUpXG4gICAgICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5wdXNoKFwiIGNsYXNzPSdcIiwgdGhpcy5jbGFzc05hbWUsIFwiJ1wiKTtcbiAgICAgICAgICAgIHZhciBzdHlsZVN0ciA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuc3R5bGUpIHtcbiAgICAgICAgICAgICAgICBzdHlsZVN0ci5wdXNoKGtleSwgXCI6XCIsIHRoaXMuc3R5bGVba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3R5bGVTdHIubGVuZ3RoKVxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIucHVzaChcIiBzdHlsZT0nXCIsIHN0eWxlU3RyLmpvaW4oXCJcIiksIFwiJ1wiKTtcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIucHVzaChcIj5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5wdXNoKHRoaXMudGV4dENvbnRlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSAhPSBcImZyYWdtZW50XCIpIHtcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIucHVzaChcIjwvXCIsIHRoaXMudHlwZSwgXCI+XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN0cmluZ0J1aWxkZXIuam9pbihcIlwiKTtcbiAgICB9XG59XG5cblxudmFyIHNpbXBsZURvbSA9IHtcbiAgICBjcmVhdGVUZXh0Tm9kZTogZnVuY3Rpb24oLyoqIEB0eXBlIHtzdHJpbmd9ICovIHRleHRDb250ZW50LCAvKiogQHR5cGUge2FueX0gKi8gZWxlbWVudCkge1xuICAgICAgICByZXR1cm4gZXNjYXBlSFRNTCh0ZXh0Q29udGVudCk7XG4gICAgfSxcbiAgICBjcmVhdGVFbGVtZW50OiBmdW5jdGlvbigvKiogQHR5cGUge3N0cmluZ30gKi8gdHlwZSkge1xuICAgICAgICByZXR1cm4gbmV3IEVsZW1lbnQodHlwZSk7XG4gICAgfSxcbiAgICBjcmVhdGVGcmFnbWVudDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXcgRWxlbWVudChcImZyYWdtZW50XCIpO1xuICAgIH1cbn07XG5cblxuLyoqQHR5cGUge2FueX0qL1xudmFyIFNpbXBsZVRleHRMYXllciA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuY29uZmlnID0ge307XG4gICAgdGhpcy5kb20gPSBzaW1wbGVEb207XG59O1xuU2ltcGxlVGV4dExheWVyLnByb3RvdHlwZSA9IFRleHRMYXllci5wcm90b3R5cGU7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGVsXG4gKiBAcGFyYW0ge2ltcG9ydChcIi4uLy4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuU3RhdGljSGlnaGxpZ2h0T3B0aW9uc30gb3B0c1xuICogQHBhcmFtIFtjYWxsYmFja11cbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG52YXIgaGlnaGxpZ2h0ID0gZnVuY3Rpb24oZWwsIG9wdHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIG0gPSBlbC5jbGFzc05hbWUubWF0Y2goL2xhbmctKFxcdyspLyk7XG4gICAgdmFyIG1vZGUgPSBvcHRzLm1vZGUgfHwgbSAmJiAoXCJhY2UvbW9kZS9cIiArIG1bMV0pO1xuICAgIGlmICghbW9kZSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHZhciB0aGVtZSA9IG9wdHMudGhlbWUgfHwgXCJhY2UvdGhlbWUvdGV4dG1hdGVcIjtcblxuICAgIHZhciBkYXRhID0gXCJcIjtcbiAgICB2YXIgbm9kZXMgPSBbXTtcblxuICAgIGlmIChlbC5maXJzdEVsZW1lbnRDaGlsZCkge1xuICAgICAgICB2YXIgdGV4dExlbiA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZWwuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgLyoqQHR5cGUge2FueX0qL1xuICAgICAgICAgICAgdmFyIGNoID0gZWwuY2hpbGROb2Rlc1tpXTtcbiAgICAgICAgICAgIGlmIChjaC5ub2RlVHlwZSA9PSAzKSB7XG4gICAgICAgICAgICAgICAgdGV4dExlbiArPSBjaC5kYXRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgICBkYXRhICs9IGNoLmRhdGE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5vZGVzLnB1c2godGV4dExlbiwgY2gpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YSA9IGVsLnRleHRDb250ZW50O1xuICAgICAgICBpZiAob3B0cy50cmltKVxuICAgICAgICAgICAgZGF0YSA9IGRhdGEudHJpbSgpO1xuICAgIH1cblxuICAgIGhpZ2hsaWdodC5yZW5kZXIoZGF0YSwgbW9kZSwgdGhlbWUsIG9wdHMuZmlyc3RMaW5lTnVtYmVyLCAhb3B0cy5zaG93R3V0dGVyLCBmdW5jdGlvbiAoaGlnaGxpZ2h0ZWQpIHtcbiAgICAgICAgZG9tLmltcG9ydENzc1N0cmluZyhoaWdobGlnaHRlZC5jc3MsIFwiYWNlX2hpZ2hsaWdodFwiLCB0cnVlKTtcbiAgICAgICAgZWwuaW5uZXJIVE1MID0gaGlnaGxpZ2h0ZWQuaHRtbDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRPRE86IGNoZWNrIGlmIGNoaWxkIGV4aXN0c1xuICAgICAgICAgKiBAdHlwZSB7YW55fVxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGVsLmZpcnN0Q2hpbGQuZmlyc3RDaGlsZDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgICAgICAgICAgdmFyIHBvcyA9IGhpZ2hsaWdodGVkLnNlc3Npb24uZG9jLmluZGV4VG9Qb3NpdGlvbihub2Rlc1tpXSk7XG4gICAgICAgICAgICB2YXIgbm9kZSA9IG5vZGVzW2kgKyAxXTtcbiAgICAgICAgICAgIHZhciBsaW5lRWwgPSBjb250YWluZXIuY2hpbGRyZW5bcG9zLnJvd107XG4gICAgICAgICAgICBsaW5lRWwgJiYgbGluZUVsLmFwcGVuZENoaWxkKG5vZGUpO1xuICAgICAgICB9XG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFRyYW5zZm9ybXMgYSBnaXZlbiBpbnB1dCBjb2RlIHNuaXBwZXQgaW50byBIVE1MIHVzaW5nIHRoZSBnaXZlbiBtb2RlXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IGlucHV0IENvZGUgc25pcHBldFxuICogQHBhcmFtIHtzdHJpbmcgfCBTeW50YXhNb2RlfSBtb2RlIFN0cmluZyBzcGVjaWZ5aW5nIHRoZSBtb2RlIHRvIGxvYWQgc3VjaCBhc1xuICogIGBhY2UvbW9kZS9qYXZhc2NyaXB0YCBvciwgYSBtb2RlIGxvYWRlZCBmcm9tIGAvYWNlL21vZGVgXG4gKiAgKHVzZSAnU2VydmVyU2lkZUhpZ2xpZ2h0ZXIuZ2V0TW9kZScpLlxuICogQHBhcmFtIHtzdHJpbmcgfCBUaGVtZX0gdGhlbWUgU3RyaW5nIHNwZWNpZnlpbmcgdGhlIHRoZW1lIHRvIGxvYWQgc3VjaCBhc1xuICogIGBhY2UvdGhlbWUvdHdpbGlnaHRgIG9yLCBhIHRoZW1lIGxvYWRlZCBmcm9tIGAvYWNlL3RoZW1lYC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBsaW5lU3RhcnQgQSBudW1iZXIgaW5kaWNhdGluZyB0aGUgZmlyc3QgbGluZSBudW1iZXIuIERlZmF1bHRzXG4gKiAgdG8gMS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZUd1dHRlciBTcGVjaWZpZXMgd2hldGhlciBvciBub3QgdG8gZGlzYWJsZSB0aGUgZ3V0dGVyLlxuICogIGB0cnVlYCBkaXNhYmxlcyB0aGUgZ3V0dGVyLCBgZmFsc2VgIGVuYWJsZXMgdGhlIGd1dHRlci4gRGVmYXVsdHMgdG8gYGZhbHNlYC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IFtjYWxsYmFja10gV2hlbiBzcGVjaWZ5aW5nIHRoZSBtb2RlIG9yIHRoZW1lIGFzIGEgc3RyaW5nLFxuICogIHRoaXMgbWV0aG9kIGhhcyBubyByZXR1cm4gdmFsdWUgYW5kIHlvdSBtdXN0IHNwZWNpZnkgYSBjYWxsYmFjayBmdW5jdGlvbi4gVGhlXG4gKiAgY2FsbGJhY2sgd2lsbCByZWNlaXZlIHRoZSByZW5kZXJlZCBvYmplY3QgY29udGFpbmluZyB0aGUgcHJvcGVydGllcyBgaHRtbGBcbiAqICBhbmQgYGNzc2AuXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgcHJvcGVydGllcyBgaHRtbGAgYW5kIGBjc3NgLlxuICovXG5oaWdobGlnaHQucmVuZGVyID0gZnVuY3Rpb24oaW5wdXQsIG1vZGUsIHRoZW1lLCBsaW5lU3RhcnQsIGRpc2FibGVHdXR0ZXIsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHdhaXRpbmcgPSAxO1xuICAgIHZhciBtb2RlQ2FjaGUgPSBFZGl0U2Vzc2lvbi5wcm90b3R5cGUuJG1vZGVzO1xuXG4gICAgLy8gaWYgZWl0aGVyIHRoZSB0aGVtZSBvciB0aGUgbW9kZSB3ZXJlIHNwZWNpZmllZCBhcyBvYmplY3RzXG4gICAgLy8gdGhlbiB3ZSBuZWVkIHRvIGxhemlseSBsb2FkIHRoZW0uXG4gICAgaWYgKHR5cGVvZiB0aGVtZSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHdhaXRpbmcrKztcbiAgICAgICAgY29uZmlnLmxvYWRNb2R1bGUoWyd0aGVtZScsIHRoZW1lXSwgZnVuY3Rpb24obSkge1xuICAgICAgICAgICAgdGhlbWUgPSBtO1xuICAgICAgICAgICAgLS13YWl0aW5nIHx8IGRvbmUoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8vIGFsbG93IHNldHRpbmcgbW9kZSBvcHRpb25zIGUuaCB7cGF0aDogXCJhY2UvbW9kZS9waHBcIiwgaW5saW5lOnRydWV9XG4gICAgdmFyIG1vZGVPcHRpb25zO1xuICAgIGlmIChtb2RlICYmIHR5cGVvZiBtb2RlID09PSBcIm9iamVjdFwiICYmICFtb2RlLmdldFRva2VuaXplcikge1xuICAgICAgICBtb2RlT3B0aW9ucyA9IG1vZGU7XG4gICAgICAgIG1vZGUgPSBtb2RlT3B0aW9ucy5wYXRoO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIG1vZGUgPT0gXCJzdHJpbmdcIikge1xuICAgICAgICB3YWl0aW5nKys7XG4gICAgICAgIGNvbmZpZy5sb2FkTW9kdWxlKFsnbW9kZScsIG1vZGVdLCBmdW5jdGlvbihtKSB7XG4gICAgICAgICAgICBpZiAoIW1vZGVDYWNoZVsvKipAdHlwZXtzdHJpbmd9Ki8obW9kZSldIHx8IG1vZGVPcHRpb25zKVxuICAgICAgICAgICAgICAgIG1vZGVDYWNoZVsvKipAdHlwZXtzdHJpbmd9Ki8obW9kZSldID0gbmV3IG0uTW9kZShtb2RlT3B0aW9ucyk7XG4gICAgICAgICAgICBtb2RlID0gbW9kZUNhY2hlWy8qKkB0eXBle3N0cmluZ30qLyhtb2RlKV07XG4gICAgICAgICAgICAtLXdhaXRpbmcgfHwgZG9uZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBsb2FkcyBvciBwYXNzZXMgdGhlIHNwZWNpZmllZCBtb2RlIG1vZHVsZSB0aGVuIGNhbGxzIHJlbmRlcmVyXG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGhpZ2hsaWdodC5yZW5kZXJTeW5jKGlucHV0LCBtb2RlLCAvKipAdHlwZXtUaGVtZX0qLyh0aGVtZSksIGxpbmVTdGFydCwgZGlzYWJsZUd1dHRlcik7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayA/IGNhbGxiYWNrKHJlc3VsdCkgOiByZXN1bHQ7XG4gICAgfVxuICAgIHJldHVybiAtLXdhaXRpbmcgfHwgZG9uZSgpO1xufTtcblxuLyoqXG4gKiBUcmFuc2Zvcm1zIGEgZ2l2ZW4gaW5wdXQgY29kZSBzbmlwcGV0IGludG8gSFRNTCB1c2luZyB0aGUgZ2l2ZW4gbW9kZVxuICogQHBhcmFtIHtzdHJpbmd9IGlucHV0IENvZGUgc25pcHBldFxuICogQHBhcmFtIHtTeW50YXhNb2RlIHwgc3RyaW5nfSBtb2RlIE1vZGUgbG9hZGVkIGZyb20gL2FjZS9tb2RlICh1c2UgJ1NlcnZlclNpZGVIaWdsaWdodGVyLmdldE1vZGUnKVxuICogQHBhcmFtIHtUaGVtZX0gdGhlbWVcbiAqIEBwYXJhbSB7YW55fSBsaW5lU3RhcnRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZGlzYWJsZUd1dHRlclxuICogQHJldHVybnMge29iamVjdH0gQW4gb2JqZWN0IGNvbnRhaW5pbmc6IGh0bWwsIGNzc1xuICovXG5oaWdobGlnaHQucmVuZGVyU3luYyA9IGZ1bmN0aW9uKGlucHV0LCBtb2RlLCB0aGVtZSwgbGluZVN0YXJ0LCBkaXNhYmxlR3V0dGVyKSB7XG4gICAgbGluZVN0YXJ0ID0gcGFyc2VJbnQobGluZVN0YXJ0IHx8IDEsIDEwKTtcblxuICAgIHZhciBzZXNzaW9uID0gbmV3IEVkaXRTZXNzaW9uKFwiXCIpO1xuICAgIHNlc3Npb24uc2V0VXNlV29ya2VyKGZhbHNlKTtcbiAgICBzZXNzaW9uLnNldE1vZGUobW9kZSk7XG5cbiAgICAvKipAdHlwZSB7VGV4dExheWVyfSovXG4gICAgdmFyIHRleHRMYXllciA9IG5ldyBTaW1wbGVUZXh0TGF5ZXIoKTtcbiAgICB0ZXh0TGF5ZXIuc2V0U2Vzc2lvbihzZXNzaW9uKTtcbiAgICBPYmplY3Qua2V5cyh0ZXh0TGF5ZXIuJHRhYlN0cmluZ3MpLmZvckVhY2goZnVuY3Rpb24oaykge1xuICAgICAgICBpZiAodHlwZW9mIHRleHRMYXllci4kdGFiU3RyaW5nc1trXSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSBzaW1wbGVEb20uY3JlYXRlRnJhZ21lbnQoKTtcbiAgICAgICAgICAgIGVsLnRleHRDb250ZW50ID0gdGV4dExheWVyLiR0YWJTdHJpbmdzW2tdO1xuICAgICAgICAgICAgdGV4dExheWVyLiR0YWJTdHJpbmdzW2tdID0gZWw7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHNlc3Npb24uc2V0VmFsdWUoaW5wdXQpO1xuICAgIHZhciBsZW5ndGggPSAgc2Vzc2lvbi5nZXRMZW5ndGgoKTtcblxuICAgIHZhciBvdXRlckVsID0gc2ltcGxlRG9tLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgb3V0ZXJFbC5jbGFzc05hbWUgPSB0aGVtZS5jc3NDbGFzcztcblxuICAgIHZhciBpbm5lckVsID0gc2ltcGxlRG9tLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgaW5uZXJFbC5jbGFzc05hbWUgPSBcImFjZV9zdGF0aWNfaGlnaGxpZ2h0XCIgKyAoZGlzYWJsZUd1dHRlciA/IFwiXCIgOiBcIiBhY2Vfc2hvd19ndXR0ZXJcIik7XG4gICAgaW5uZXJFbC5zdHlsZVtcImNvdW50ZXItcmVzZXRcIl0gPSBcImFjZV9saW5lIFwiICsgKGxpbmVTdGFydCAtIDEpO1xuXG4gICAgZm9yICh2YXIgaXggPSAwOyBpeCA8IGxlbmd0aDsgaXgrKykge1xuICAgICAgICB2YXIgbGluZUVsID0gc2ltcGxlRG9tLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGxpbmVFbC5jbGFzc05hbWUgPSBcImFjZV9saW5lXCI7XG5cbiAgICAgICAgaWYgKCFkaXNhYmxlR3V0dGVyKSB7XG4gICAgICAgICAgICB2YXIgZ3V0dGVyRWwgPSBzaW1wbGVEb20uY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBndXR0ZXJFbC5jbGFzc05hbWUgPVwiYWNlX2d1dHRlciBhY2VfZ3V0dGVyLWNlbGxcIjtcbiAgICAgICAgICAgIGd1dHRlckVsLnRleHRDb250ZW50ID0gXCJcIjsgLyooaXggKyBsaW5lU3RhcnQpICsgKi9cbiAgICAgICAgICAgIGxpbmVFbC5hcHBlbmRDaGlsZChndXR0ZXJFbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGV4dExheWVyLiRyZW5kZXJMaW5lKGxpbmVFbCwgaXgsIGZhbHNlKTtcbiAgICAgICAgbGluZUVsLnRleHRDb250ZW50ICs9IFwiXFxuXCI7XG4gICAgICAgIGlubmVyRWwuYXBwZW5kQ2hpbGQobGluZUVsKTtcbiAgICB9XG5cbiAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG91dGVyRWwsIG51bGwsIDIpKTtcbiAgICAvL2NvbnNvbGUubG9nKG91dGVyRWwudG9TdHJpbmcoKSk7XG4gICAgb3V0ZXJFbC5hcHBlbmRDaGlsZChpbm5lckVsKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGNzczogYmFzZVN0eWxlcyArIHRoZW1lLmNzc1RleHQsXG4gICAgICAgIGh0bWw6IG91dGVyRWwudG9TdHJpbmcoKSxcbiAgICAgICAgc2Vzc2lvbjogc2Vzc2lvblxuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhpZ2hsaWdodDtcbm1vZHVsZS5leHBvcnRzLmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==