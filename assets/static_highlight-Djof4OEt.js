import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import { t as require_dom } from "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import { t as require_lang } from "./lang-DcNOSqFo.js";
import "./keys-B8CLTATX.js";
import "./event-BcX-N72I.js";
import { t as require_config } from "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import { t as require_edit_session } from "./edit_session-CDHRvoey.js";
import "./tokenizer-C2b-GJMk.js";
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import { t as require_text } from "./text-DOzSnOss.js";
var require_static_css = /* @__PURE__ */ __commonJSMin(((exports, module) => {
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
}));
var require_static_highlight = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var EditSession = require_edit_session().EditSession;
	var TextLayer = require_text().Text;
	var baseStyles = require_static_css();
	var config = require_config();
	var dom = require_dom();
	var escapeHTML = require_lang().escapeHTML;
	var Element = class {
		constructor(type) {
			this.className;
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
				if (this.className) stringBuilder.push(" class='", this.className, "'");
				var styleStr = [];
				for (var key in this.style) styleStr.push(key, ":", this.style[key]);
				if (styleStr.length) stringBuilder.push(" style='", styleStr.join(""), "'");
				stringBuilder.push(">");
			}
			if (this.textContent) stringBuilder.push(this.textContent);
			if (this.type != "fragment") stringBuilder.push("</", this.type, ">");
			return stringBuilder.join("");
		}
	};
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
		var mode = opts.mode || m && "ace/mode/" + m[1];
		if (!mode) return false;
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
				} else nodes.push(textLen, ch);
			}
		} else {
			data = el.textContent;
			if (opts.trim) data = data.trim();
		}
		highlight.render(data, mode, theme, opts.firstLineNumber, !opts.showGutter, function(highlighted) {
			dom.importCssString(highlighted.css, "ace_highlight", true);
			el.innerHTML = highlighted.html;
			var container = el.firstChild.firstChild;
			for (var i$1 = 0; i$1 < nodes.length; i$1 += 2) {
				var pos = highlighted.session.doc.indexToPosition(nodes[i$1]);
				var node = nodes[i$1 + 1];
				var lineEl = container.children[pos.row];
				lineEl && lineEl.appendChild(node);
			}
			callback && callback();
		});
	};
	highlight.render = function(input, mode, theme, lineStart, disableGutter, callback) {
		var waiting = 1;
		var modeCache = EditSession.prototype.$modes;
		if (typeof theme == "string") {
			waiting++;
			config.loadModule(["theme", theme], function(m) {
				theme = m;
				--waiting || done();
			});
		}
		var modeOptions;
		if (mode && typeof mode === "object" && !mode.getTokenizer) {
			modeOptions = mode;
			mode = modeOptions.path;
		}
		if (typeof mode == "string") {
			waiting++;
			config.loadModule(["mode", mode], function(m) {
				if (!modeCache[mode] || modeOptions) modeCache[mode] = new m.Mode(modeOptions);
				mode = modeCache[mode];
				--waiting || done();
			});
		}
		function done() {
			var result = highlight.renderSync(input, mode, theme, lineStart, disableGutter);
			return callback ? callback(result) : result;
		}
		return --waiting || done();
	};
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
		var length = session.getLength();
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
				gutterEl.className = "ace_gutter ace_gutter-cell";
				gutterEl.textContent = "";
				lineEl.appendChild(gutterEl);
			}
			textLayer.$renderLine(lineEl, ix, false);
			lineEl.textContent += "\n";
			innerEl.appendChild(lineEl);
		}
		outerEl.appendChild(innerEl);
		return {
			css: baseStyles + theme.cssText,
			html: outerEl.toString(),
			session
		};
	};
	module.exports = highlight;
	module.exports.highlight = highlight;
}));
export default require_static_highlight();
