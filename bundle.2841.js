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
    constructor(type) {
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
    createTextNode: function(textContent, element) {
        return escapeHTML(textContent);
    },
    createElement: function(type) {
        return new Element(type);
    },
    createFragment: function() {
        return new Element("fragment");
    }
};


var SimpleTextLayer = function() {
    this.config = {};
    this.dom = simpleDom;
};
SimpleTextLayer.prototype = TextLayer.prototype;

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
 * @param {string|mode} mode String specifying the mode to load such as
 *  `ace/mode/javascript` or, a mode loaded from `/ace/mode`
 *  (use 'ServerSideHiglighter.getMode').
 * @param {string|theme} theme String specifying the theme to load such as
 *  `ace/theme/twilight` or, a theme loaded from `/ace/theme`.
 * @param {number} lineStart A number indicating the first line number. Defaults
 *  to 1.
 * @param {boolean} disableGutter Specifies whether or not to disable the gutter.
 *  `true` disables the gutter, `false` enables the gutter. Defaults to `false`.
 * @param {function} callback When specifying the mode or theme as a string,
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
            if (!modeCache[mode] || modeOptions)
                modeCache[mode] = new m.Mode(modeOptions);
            mode = modeCache[mode];
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
 * @param {mode} mode Mode loaded from /ace/mode (use 'ServerSideHiglighter.getMode')
 * @param {string} r Code snippet
 * @returns {object} An object containing: html, css
 */
highlight.renderSync = function(input, mode, theme, lineStart, disableGutter) {
    lineStart = parseInt(lineStart || 1, 10);

    var session = new EditSession("");
    session.setUseWorker(false);
    session.setMode(mode);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjI4NDEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQ0FBa0M7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN2Q2E7O0FBRWIsa0JBQWtCLGlEQUFzQztBQUN4RCxnQkFBZ0IsMENBQTZCO0FBQzdDLGlCQUFpQixtQkFBTyxDQUFDLEtBQWM7QUFDdkMsYUFBYSxtQkFBTyxDQUFDLEtBQVc7QUFDaEMsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsaUJBQWlCLHVDQUFpQzs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsMEJBQTBCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isa0JBQWtCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxhQUFhO0FBQ3hCO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekI7QUFDQSxXQUFXLFFBQVE7QUFDbkI7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQSxXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsTUFBTTtBQUNqQixXQUFXLFFBQVE7QUFDbkIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixhQUFhO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdCQUF3QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9zdGF0aWMtY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9zdGF0aWNfaGlnaGxpZ2h0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gYC5hY2Vfc3RhdGljX2hpZ2hsaWdodCB7XG4gICAgZm9udC1mYW1pbHk6ICdNb25hY28nLCAnTWVubG8nLCAnVWJ1bnR1IE1vbm8nLCAnQ29uc29sYXMnLCAnU291cmNlIENvZGUgUHJvJywgJ3NvdXJjZS1jb2RlLXBybycsICdEcm9pZCBTYW5zIE1vbm8nLCBtb25vc3BhY2U7XG4gICAgZm9udC1zaXplOiAxMnB4O1xuICAgIHdoaXRlLXNwYWNlOiBwcmUtd3JhcFxufVxuXG4uYWNlX3N0YXRpY19oaWdobGlnaHQgLmFjZV9ndXR0ZXIge1xuICAgIHdpZHRoOiAyZW07XG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XG4gICAgcGFkZGluZzogMCAzcHggMCAwO1xuICAgIG1hcmdpbi1yaWdodDogM3B4O1xuICAgIGNvbnRhaW46IG5vbmU7XG59XG5cbi5hY2Vfc3RhdGljX2hpZ2hsaWdodC5hY2Vfc2hvd19ndXR0ZXIgLmFjZV9saW5lIHtcbiAgICBwYWRkaW5nLWxlZnQ6IDIuNmVtO1xufVxuXG4uYWNlX3N0YXRpY19oaWdobGlnaHQgLmFjZV9saW5lIHsgcG9zaXRpb246IHJlbGF0aXZlOyB9XG5cbi5hY2Vfc3RhdGljX2hpZ2hsaWdodCAuYWNlX2d1dHRlci1jZWxsIHtcbiAgICAtbW96LXVzZXItc2VsZWN0OiAtbW96LW5vbmU7XG4gICAgLWtodG1sLXVzZXItc2VsZWN0OiBub25lO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdG9wOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICBsZWZ0OiAwO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cblxuXG4uYWNlX3N0YXRpY19oaWdobGlnaHQgLmFjZV9ndXR0ZXItY2VsbDpiZWZvcmUge1xuICAgIGNvbnRlbnQ6IGNvdW50ZXIoYWNlX2xpbmUsIGRlY2ltYWwpO1xuICAgIGNvdW50ZXItaW5jcmVtZW50OiBhY2VfbGluZTtcbn1cbi5hY2Vfc3RhdGljX2hpZ2hsaWdodCB7XG4gICAgY291bnRlci1yZXNldDogYWNlX2xpbmU7XG59XG5gO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBFZGl0U2Vzc2lvbiA9IHJlcXVpcmUoXCIuLi9lZGl0X3Nlc3Npb25cIikuRWRpdFNlc3Npb247XG52YXIgVGV4dExheWVyID0gcmVxdWlyZShcIi4uL2xheWVyL3RleHRcIikuVGV4dDtcbnZhciBiYXNlU3R5bGVzID0gcmVxdWlyZShcIi4vc3RhdGljLWNzc1wiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiLi4vY29uZmlnXCIpO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9saWIvZG9tXCIpO1xudmFyIGVzY2FwZUhUTUwgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIikuZXNjYXBlSFRNTDtcblxuY2xhc3MgRWxlbWVudCB7XG4gICAgY29uc3RydWN0b3IodHlwZSkge1xuICAgICAgICB0aGlzLnR5cGUgPSB0eXBlO1xuICAgICAgICB0aGlzLnN0eWxlID0ge307XG4gICAgICAgIHRoaXMudGV4dENvbnRlbnQgPSBcIlwiO1xuICAgIH1cblxuICAgIGNsb25lTm9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgYXBwZW5kQ2hpbGQoY2hpbGQpIHtcbiAgICAgICAgdGhpcy50ZXh0Q29udGVudCArPSBjaGlsZC50b1N0cmluZygpO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICB2YXIgc3RyaW5nQnVpbGRlciA9IFtdO1xuICAgICAgICBpZiAodGhpcy50eXBlICE9IFwiZnJhZ21lbnRcIikge1xuICAgICAgICAgICAgc3RyaW5nQnVpbGRlci5wdXNoKFwiPFwiLCB0aGlzLnR5cGUpO1xuICAgICAgICAgICAgaWYgKHRoaXMuY2xhc3NOYW1lKVxuICAgICAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIucHVzaChcIiBjbGFzcz0nXCIsIHRoaXMuY2xhc3NOYW1lLCBcIidcIik7XG4gICAgICAgICAgICB2YXIgc3R5bGVTdHIgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLnN0eWxlKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVTdHIucHVzaChrZXksIFwiOlwiLCB0aGlzLnN0eWxlW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0eWxlU3RyLmxlbmd0aClcbiAgICAgICAgICAgICAgICBzdHJpbmdCdWlsZGVyLnB1c2goXCIgc3R5bGU9J1wiLCBzdHlsZVN0ci5qb2luKFwiXCIpLCBcIidcIik7XG4gICAgICAgICAgICBzdHJpbmdCdWlsZGVyLnB1c2goXCI+XCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMudGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgIHN0cmluZ0J1aWxkZXIucHVzaCh0aGlzLnRleHRDb250ZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnR5cGUgIT0gXCJmcmFnbWVudFwiKSB7XG4gICAgICAgICAgICBzdHJpbmdCdWlsZGVyLnB1c2goXCI8L1wiLCB0aGlzLnR5cGUsIFwiPlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdHJpbmdCdWlsZGVyLmpvaW4oXCJcIik7XG4gICAgfVxufVxuXG5cbnZhciBzaW1wbGVEb20gPSB7XG4gICAgY3JlYXRlVGV4dE5vZGU6IGZ1bmN0aW9uKHRleHRDb250ZW50LCBlbGVtZW50KSB7XG4gICAgICAgIHJldHVybiBlc2NhcGVIVE1MKHRleHRDb250ZW50KTtcbiAgICB9LFxuICAgIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFbGVtZW50KHR5cGUpO1xuICAgIH0sXG4gICAgY3JlYXRlRnJhZ21lbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbmV3IEVsZW1lbnQoXCJmcmFnbWVudFwiKTtcbiAgICB9XG59O1xuXG5cbnZhciBTaW1wbGVUZXh0TGF5ZXIgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLmNvbmZpZyA9IHt9O1xuICAgIHRoaXMuZG9tID0gc2ltcGxlRG9tO1xufTtcblNpbXBsZVRleHRMYXllci5wcm90b3R5cGUgPSBUZXh0TGF5ZXIucHJvdG90eXBlO1xuXG52YXIgaGlnaGxpZ2h0ID0gZnVuY3Rpb24oZWwsIG9wdHMsIGNhbGxiYWNrKSB7XG4gICAgdmFyIG0gPSBlbC5jbGFzc05hbWUubWF0Y2goL2xhbmctKFxcdyspLyk7XG4gICAgdmFyIG1vZGUgPSBvcHRzLm1vZGUgfHwgbSAmJiAoXCJhY2UvbW9kZS9cIiArIG1bMV0pO1xuICAgIGlmICghbW9kZSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHZhciB0aGVtZSA9IG9wdHMudGhlbWUgfHwgXCJhY2UvdGhlbWUvdGV4dG1hdGVcIjtcbiAgICBcbiAgICB2YXIgZGF0YSA9IFwiXCI7XG4gICAgdmFyIG5vZGVzID0gW107XG5cbiAgICBpZiAoZWwuZmlyc3RFbGVtZW50Q2hpbGQpIHtcbiAgICAgICAgdmFyIHRleHRMZW4gPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVsLmNoaWxkTm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBjaCA9IGVsLmNoaWxkTm9kZXNbaV07XG4gICAgICAgICAgICBpZiAoY2gubm9kZVR5cGUgPT0gMykge1xuICAgICAgICAgICAgICAgIHRleHRMZW4gKz0gY2guZGF0YS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZGF0YSArPSBjaC5kYXRhO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBub2Rlcy5wdXNoKHRleHRMZW4sIGNoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGEgPSBlbC50ZXh0Q29udGVudDtcbiAgICAgICAgaWYgKG9wdHMudHJpbSlcbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLnRyaW0oKTtcbiAgICB9XG4gICAgXG4gICAgaGlnaGxpZ2h0LnJlbmRlcihkYXRhLCBtb2RlLCB0aGVtZSwgb3B0cy5maXJzdExpbmVOdW1iZXIsICFvcHRzLnNob3dHdXR0ZXIsIGZ1bmN0aW9uIChoaWdobGlnaHRlZCkge1xuICAgICAgICBkb20uaW1wb3J0Q3NzU3RyaW5nKGhpZ2hsaWdodGVkLmNzcywgXCJhY2VfaGlnaGxpZ2h0XCIsIHRydWUpO1xuICAgICAgICBlbC5pbm5lckhUTUwgPSBoaWdobGlnaHRlZC5odG1sO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gZWwuZmlyc3RDaGlsZC5maXJzdENoaWxkO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgICAgICAgICB2YXIgcG9zID0gaGlnaGxpZ2h0ZWQuc2Vzc2lvbi5kb2MuaW5kZXhUb1Bvc2l0aW9uKG5vZGVzW2ldKTtcbiAgICAgICAgICAgIHZhciBub2RlID0gbm9kZXNbaSArIDFdO1xuICAgICAgICAgICAgdmFyIGxpbmVFbCA9IGNvbnRhaW5lci5jaGlsZHJlbltwb3Mucm93XTtcbiAgICAgICAgICAgIGxpbmVFbCAmJiBsaW5lRWwuYXBwZW5kQ2hpbGQobm9kZSk7XG4gICAgICAgIH1cbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICB9KTtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyBhIGdpdmVuIGlucHV0IGNvZGUgc25pcHBldCBpbnRvIEhUTUwgdXNpbmcgdGhlIGdpdmVuIG1vZGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gaW5wdXQgQ29kZSBzbmlwcGV0XG4gKiBAcGFyYW0ge3N0cmluZ3xtb2RlfSBtb2RlIFN0cmluZyBzcGVjaWZ5aW5nIHRoZSBtb2RlIHRvIGxvYWQgc3VjaCBhc1xuICogIGBhY2UvbW9kZS9qYXZhc2NyaXB0YCBvciwgYSBtb2RlIGxvYWRlZCBmcm9tIGAvYWNlL21vZGVgXG4gKiAgKHVzZSAnU2VydmVyU2lkZUhpZ2xpZ2h0ZXIuZ2V0TW9kZScpLlxuICogQHBhcmFtIHtzdHJpbmd8dGhlbWV9IHRoZW1lIFN0cmluZyBzcGVjaWZ5aW5nIHRoZSB0aGVtZSB0byBsb2FkIHN1Y2ggYXNcbiAqICBgYWNlL3RoZW1lL3R3aWxpZ2h0YCBvciwgYSB0aGVtZSBsb2FkZWQgZnJvbSBgL2FjZS90aGVtZWAuXG4gKiBAcGFyYW0ge251bWJlcn0gbGluZVN0YXJ0IEEgbnVtYmVyIGluZGljYXRpbmcgdGhlIGZpcnN0IGxpbmUgbnVtYmVyLiBEZWZhdWx0c1xuICogIHRvIDEuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGRpc2FibGVHdXR0ZXIgU3BlY2lmaWVzIHdoZXRoZXIgb3Igbm90IHRvIGRpc2FibGUgdGhlIGd1dHRlci5cbiAqICBgdHJ1ZWAgZGlzYWJsZXMgdGhlIGd1dHRlciwgYGZhbHNlYCBlbmFibGVzIHRoZSBndXR0ZXIuIERlZmF1bHRzIHRvIGBmYWxzZWAuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBXaGVuIHNwZWNpZnlpbmcgdGhlIG1vZGUgb3IgdGhlbWUgYXMgYSBzdHJpbmcsXG4gKiAgdGhpcyBtZXRob2QgaGFzIG5vIHJldHVybiB2YWx1ZSBhbmQgeW91IG11c3Qgc3BlY2lmeSBhIGNhbGxiYWNrIGZ1bmN0aW9uLiBUaGVcbiAqICBjYWxsYmFjayB3aWxsIHJlY2VpdmUgdGhlIHJlbmRlcmVkIG9iamVjdCBjb250YWluaW5nIHRoZSBwcm9wZXJ0aWVzIGBodG1sYFxuICogIGFuZCBgY3NzYC5cbiAqIEByZXR1cm5zIHtvYmplY3R9IEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBwcm9wZXJ0aWVzIGBodG1sYCBhbmQgYGNzc2AuXG4gKi9cbmhpZ2hsaWdodC5yZW5kZXIgPSBmdW5jdGlvbihpbnB1dCwgbW9kZSwgdGhlbWUsIGxpbmVTdGFydCwgZGlzYWJsZUd1dHRlciwgY2FsbGJhY2spIHtcbiAgICB2YXIgd2FpdGluZyA9IDE7XG4gICAgdmFyIG1vZGVDYWNoZSA9IEVkaXRTZXNzaW9uLnByb3RvdHlwZS4kbW9kZXM7XG5cbiAgICAvLyBpZiBlaXRoZXIgdGhlIHRoZW1lIG9yIHRoZSBtb2RlIHdlcmUgc3BlY2lmaWVkIGFzIG9iamVjdHNcbiAgICAvLyB0aGVuIHdlIG5lZWQgdG8gbGF6aWx5IGxvYWQgdGhlbS5cbiAgICBpZiAodHlwZW9mIHRoZW1lID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgd2FpdGluZysrO1xuICAgICAgICBjb25maWcubG9hZE1vZHVsZShbJ3RoZW1lJywgdGhlbWVdLCBmdW5jdGlvbihtKSB7XG4gICAgICAgICAgICB0aGVtZSA9IG07XG4gICAgICAgICAgICAtLXdhaXRpbmcgfHwgZG9uZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLy8gYWxsb3cgc2V0dGluZyBtb2RlIG9wdGlvbnMgZS5oIHtwYXRoOiBcImFjZS9tb2RlL3BocFwiLCBpbmxpbmU6dHJ1ZX1cbiAgICB2YXIgbW9kZU9wdGlvbnM7XG4gICAgaWYgKG1vZGUgJiYgdHlwZW9mIG1vZGUgPT09IFwib2JqZWN0XCIgJiYgIW1vZGUuZ2V0VG9rZW5pemVyKSB7XG4gICAgICAgIG1vZGVPcHRpb25zID0gbW9kZTtcbiAgICAgICAgbW9kZSA9IG1vZGVPcHRpb25zLnBhdGg7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgbW9kZSA9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgIHdhaXRpbmcrKztcbiAgICAgICAgY29uZmlnLmxvYWRNb2R1bGUoWydtb2RlJywgbW9kZV0sIGZ1bmN0aW9uKG0pIHtcbiAgICAgICAgICAgIGlmICghbW9kZUNhY2hlW21vZGVdIHx8IG1vZGVPcHRpb25zKVxuICAgICAgICAgICAgICAgIG1vZGVDYWNoZVttb2RlXSA9IG5ldyBtLk1vZGUobW9kZU9wdGlvbnMpO1xuICAgICAgICAgICAgbW9kZSA9IG1vZGVDYWNoZVttb2RlXTtcbiAgICAgICAgICAgIC0td2FpdGluZyB8fCBkb25lKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGxvYWRzIG9yIHBhc3NlcyB0aGUgc3BlY2lmaWVkIG1vZGUgbW9kdWxlIHRoZW4gY2FsbHMgcmVuZGVyZXJcbiAgICBmdW5jdGlvbiBkb25lKCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gaGlnaGxpZ2h0LnJlbmRlclN5bmMoaW5wdXQsIG1vZGUsIHRoZW1lLCBsaW5lU3RhcnQsIGRpc2FibGVHdXR0ZXIpO1xuICAgICAgICByZXR1cm4gY2FsbGJhY2sgPyBjYWxsYmFjayhyZXN1bHQpIDogcmVzdWx0O1xuICAgIH1cbiAgICByZXR1cm4gLS13YWl0aW5nIHx8IGRvbmUoKTtcbn07XG5cbi8qKlxuICogVHJhbnNmb3JtcyBhIGdpdmVuIGlucHV0IGNvZGUgc25pcHBldCBpbnRvIEhUTUwgdXNpbmcgdGhlIGdpdmVuIG1vZGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbnB1dCBDb2RlIHNuaXBwZXRcbiAqIEBwYXJhbSB7bW9kZX0gbW9kZSBNb2RlIGxvYWRlZCBmcm9tIC9hY2UvbW9kZSAodXNlICdTZXJ2ZXJTaWRlSGlnbGlnaHRlci5nZXRNb2RlJylcbiAqIEBwYXJhbSB7c3RyaW5nfSByIENvZGUgc25pcHBldFxuICogQHJldHVybnMge29iamVjdH0gQW4gb2JqZWN0IGNvbnRhaW5pbmc6IGh0bWwsIGNzc1xuICovXG5oaWdobGlnaHQucmVuZGVyU3luYyA9IGZ1bmN0aW9uKGlucHV0LCBtb2RlLCB0aGVtZSwgbGluZVN0YXJ0LCBkaXNhYmxlR3V0dGVyKSB7XG4gICAgbGluZVN0YXJ0ID0gcGFyc2VJbnQobGluZVN0YXJ0IHx8IDEsIDEwKTtcblxuICAgIHZhciBzZXNzaW9uID0gbmV3IEVkaXRTZXNzaW9uKFwiXCIpO1xuICAgIHNlc3Npb24uc2V0VXNlV29ya2VyKGZhbHNlKTtcbiAgICBzZXNzaW9uLnNldE1vZGUobW9kZSk7XG5cbiAgICB2YXIgdGV4dExheWVyID0gbmV3IFNpbXBsZVRleHRMYXllcigpO1xuICAgIHRleHRMYXllci5zZXRTZXNzaW9uKHNlc3Npb24pO1xuICAgIE9iamVjdC5rZXlzKHRleHRMYXllci4kdGFiU3RyaW5ncykuZm9yRWFjaChmdW5jdGlvbihrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGV4dExheWVyLiR0YWJTdHJpbmdzW2tdID09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHZhciBlbCA9IHNpbXBsZURvbS5jcmVhdGVGcmFnbWVudCgpO1xuICAgICAgICAgICAgZWwudGV4dENvbnRlbnQgPSB0ZXh0TGF5ZXIuJHRhYlN0cmluZ3Nba107XG4gICAgICAgICAgICB0ZXh0TGF5ZXIuJHRhYlN0cmluZ3Nba10gPSBlbDtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgc2Vzc2lvbi5zZXRWYWx1ZShpbnB1dCk7XG4gICAgdmFyIGxlbmd0aCA9ICBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgIFxuICAgIHZhciBvdXRlckVsID0gc2ltcGxlRG9tLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgb3V0ZXJFbC5jbGFzc05hbWUgPSB0aGVtZS5jc3NDbGFzcztcbiAgICBcbiAgICB2YXIgaW5uZXJFbCA9IHNpbXBsZURvbS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGlubmVyRWwuY2xhc3NOYW1lID0gXCJhY2Vfc3RhdGljX2hpZ2hsaWdodFwiICsgKGRpc2FibGVHdXR0ZXIgPyBcIlwiIDogXCIgYWNlX3Nob3dfZ3V0dGVyXCIpO1xuICAgIGlubmVyRWwuc3R5bGVbXCJjb3VudGVyLXJlc2V0XCJdID0gXCJhY2VfbGluZSBcIiArIChsaW5lU3RhcnQgLSAxKTtcblxuICAgIGZvciAodmFyIGl4ID0gMDsgaXggPCBsZW5ndGg7IGl4KyspIHtcbiAgICAgICAgdmFyIGxpbmVFbCA9IHNpbXBsZURvbS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBsaW5lRWwuY2xhc3NOYW1lID0gXCJhY2VfbGluZVwiO1xuICAgICAgICBcbiAgICAgICAgaWYgKCFkaXNhYmxlR3V0dGVyKSB7XG4gICAgICAgICAgICB2YXIgZ3V0dGVyRWwgPSBzaW1wbGVEb20uY3JlYXRlRWxlbWVudChcInNwYW5cIik7XG4gICAgICAgICAgICBndXR0ZXJFbC5jbGFzc05hbWUgPVwiYWNlX2d1dHRlciBhY2VfZ3V0dGVyLWNlbGxcIjtcbiAgICAgICAgICAgIGd1dHRlckVsLnRleHRDb250ZW50ID0gXCJcIjsgLyooaXggKyBsaW5lU3RhcnQpICsgKi9cbiAgICAgICAgICAgIGxpbmVFbC5hcHBlbmRDaGlsZChndXR0ZXJFbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGV4dExheWVyLiRyZW5kZXJMaW5lKGxpbmVFbCwgaXgsIGZhbHNlKTtcbiAgICAgICAgbGluZUVsLnRleHRDb250ZW50ICs9IFwiXFxuXCI7XG4gICAgICAgIGlubmVyRWwuYXBwZW5kQ2hpbGQobGluZUVsKTtcbiAgICB9XG5cbiAgICAvL2NvbnNvbGUubG9nKEpTT04uc3RyaW5naWZ5KG91dGVyRWwsIG51bGwsIDIpKTtcbiAgICAvL2NvbnNvbGUubG9nKG91dGVyRWwudG9TdHJpbmcoKSk7XG4gICAgb3V0ZXJFbC5hcHBlbmRDaGlsZChpbm5lckVsKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGNzczogYmFzZVN0eWxlcyArIHRoZW1lLmNzc1RleHQsXG4gICAgICAgIGh0bWw6IG91dGVyRWwudG9TdHJpbmcoKSxcbiAgICAgICAgc2Vzc2lvbjogc2Vzc2lvblxuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGhpZ2hsaWdodDtcbm1vZHVsZS5leHBvcnRzLmhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==