import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import { t as require_lang } from "./lang-DcNOSqFo.js";
import { t as require_config } from "./config-DPm1ug3B.js";
import { t as require_editor } from "./editor-BiOsjB7l.js";
import { t as require_snippets } from "./snippets-Ct-Wi_HP.js";
import { n as require_util, t as require_autocomplete } from "./autocomplete-CHTKiwQ7.js";
var require_marker_group = /* @__PURE__ */ __commonJSMin(((exports) => {
	var MarkerGroup$1 = class {
		constructor(session, options) {
			if (options) this.markerType = options.markerType;
			this.markers = [];
			this.session = session;
			session.addDynamicMarker(this);
		}
		getMarkerAtPosition(pos) {
			return this.markers.find(function(marker) {
				return marker.range.contains(pos.row, pos.column);
			});
		}
		markersComparator(a, b) {
			return a.range.start.row - b.range.start.row;
		}
		setMarkers(markers) {
			this.markers = markers.sort(this.markersComparator).slice(0, this.MAX_MARKERS);
			this.session._signal("changeBackMarker");
		}
		update(html, markerLayer, session, config$1) {
			if (!this.markers || !this.markers.length) return;
			var visibleRangeStartRow = config$1.firstRow, visibleRangeEndRow = config$1.lastRow;
			var foldLine;
			var markersOnOneLine = 0;
			var lastRow = 0;
			for (var i = 0; i < this.markers.length; i++) {
				var marker = this.markers[i];
				if (marker.range.end.row < visibleRangeStartRow) continue;
				if (marker.range.start.row > visibleRangeEndRow) continue;
				if (marker.range.start.row === lastRow) markersOnOneLine++;
				else {
					lastRow = marker.range.start.row;
					markersOnOneLine = 0;
				}
				if (markersOnOneLine > 200) continue;
				var markerVisibleRange = marker.range.clipRows(visibleRangeStartRow, visibleRangeEndRow);
				if (markerVisibleRange.start.row === markerVisibleRange.end.row && markerVisibleRange.start.column === markerVisibleRange.end.column) continue;
				var screenRange = markerVisibleRange.toScreenRange(session);
				if (screenRange.isEmpty()) {
					foldLine = session.getNextFoldLine(markerVisibleRange.end.row, foldLine);
					if (foldLine && foldLine.end.row > markerVisibleRange.end.row) visibleRangeStartRow = foldLine.end.row;
					continue;
				}
				if (this.markerType === "fullLine") markerLayer.drawFullLineMarker(html, screenRange, marker.className, config$1);
				else if (screenRange.isMultiLine()) if (this.markerType === "line") markerLayer.drawMultiLineMarker(html, screenRange, marker.className, config$1);
				else markerLayer.drawTextMarker(html, screenRange, marker.className, config$1);
				else markerLayer.drawSingleLineMarker(html, screenRange, marker.className + " ace_br15", config$1);
			}
		}
	};
	MarkerGroup$1.prototype.MAX_MARKERS = 1e4;
	exports.MarkerGroup = MarkerGroup$1;
}));
var require_text_completer = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Range = require_range().Range;
	var splitRegex = /[^a-zA-Z_0-9\$\-\u00C0-\u1FFF\u2C00-\uD7FF\w]+/;
	function getWordIndex(doc, pos) {
		return doc.getTextRange(Range.fromPoints({
			row: 0,
			column: 0
		}, pos)).split(splitRegex).length - 1;
	}
	function wordDistance(doc, pos) {
		var prefixPos = getWordIndex(doc, pos);
		var words = doc.getValue().split(splitRegex);
		var wordScores = Object.create(null);
		var currentWord = words[prefixPos];
		words.forEach(function(word, idx) {
			if (!word || word === currentWord) return;
			var distance = Math.abs(prefixPos - idx);
			var score = words.length - distance;
			if (wordScores[word]) wordScores[word] = Math.max(score, wordScores[word]);
			else wordScores[word] = score;
		});
		return wordScores;
	}
	exports.id = "textCompleter";
	exports.getCompletions = function(editor, session, pos, prefix, callback) {
		var wordScore = wordDistance(session, pos);
		callback(null, Object.keys(wordScore).map(function(word) {
			return {
				caption: word,
				value: word,
				score: wordScore[word],
				meta: "local"
			};
		}));
	};
}));
var require_language_tools = /* @__PURE__ */ __commonJSMin(((exports) => {
	var snippetManager = require_snippets().snippetManager;
	var Autocomplete = require_autocomplete().Autocomplete;
	var config = require_config();
	var lang = require_lang();
	var util = require_util();
	var MarkerGroup = require_marker_group().MarkerGroup;
	var textCompleter = require_text_completer();
	var keyWordCompleter = {
		getCompletions: function(editor, session, pos, prefix, callback) {
			if (session.$mode.completer) return session.$mode.completer.getCompletions(editor, session, pos, prefix, callback);
			var state = editor.session.getState(pos.row);
			var completions = session.$mode.getCompletions(state, session, pos, prefix);
			completions = completions.map((el) => {
				el.completerId = keyWordCompleter.id;
				return el;
			});
			callback(null, completions);
		},
		id: "keywordCompleter"
	};
	var transformSnippetTooltip = function(str) {
		var record = {};
		return str.replace(/\${(\d+)(:(.*?))?}/g, function(_, p1, p2, p3) {
			return record[p1] = p3 || "";
		}).replace(/\$(\d+?)/g, function(_, p1) {
			return record[p1];
		});
	};
	var snippetCompleter = {
		getCompletions: function(editor, session, pos, prefix, callback) {
			var scopes = [];
			var token = session.getTokenAt(pos.row, pos.column);
			if (token && token.type.match(/(tag-name|tag-open|tag-whitespace|attribute-name|attribute-value)\.xml$/)) scopes.push("html-tag");
			else scopes = snippetManager.getActiveScopes(editor);
			var snippetMap = snippetManager.snippetMap;
			var completions = [];
			scopes.forEach(function(scope) {
				var snippets = snippetMap[scope] || [];
				for (var i = snippets.length; i--;) {
					var s = snippets[i];
					var caption = s.name || s.tabTrigger;
					if (!caption) continue;
					completions.push({
						caption,
						snippet: s.content,
						meta: s.tabTrigger && !s.name ? s.tabTrigger + "⇥ " : "snippet",
						completerId: snippetCompleter.id
					});
				}
			}, this);
			callback(null, completions);
		},
		getDocTooltip: function(item) {
			if (item.snippet && !item.docHTML) item.docHTML = [
				"<b>",
				lang.escapeHTML(item.caption),
				"</b>",
				"<hr></hr>",
				lang.escapeHTML(transformSnippetTooltip(item.snippet))
			].join("");
		},
		id: "snippetCompleter"
	};
	var completers = [
		snippetCompleter,
		textCompleter,
		keyWordCompleter
	];
	exports.setCompleters = function(val) {
		completers.length = 0;
		if (val) completers.push.apply(completers, val);
	};
	exports.addCompleter = function(completer) {
		completers.push(completer);
	};
	exports.textCompleter = textCompleter;
	exports.keyWordCompleter = keyWordCompleter;
	exports.snippetCompleter = snippetCompleter;
	var expandSnippet = {
		name: "expandSnippet",
		exec: function(editor) {
			return snippetManager.expandWithTab(editor);
		},
		bindKey: "Tab"
	};
	var onChangeMode = function(e, editor) {
		loadSnippetsForMode(editor.session.$mode);
	};
	var loadSnippetsForMode = function(mode) {
		if (typeof mode == "string") mode = config.$modes[mode];
		if (!mode) return;
		if (!snippetManager.files) snippetManager.files = {};
		loadSnippetFile(mode.$id, mode.snippetFileId);
		if (mode.modes) mode.modes.forEach(loadSnippetsForMode);
	};
	var loadSnippetFile = function(id, snippetFilePath) {
		if (!snippetFilePath || !id || snippetManager.files[id]) return;
		snippetManager.files[id] = {};
		config.loadModule(snippetFilePath, function(m) {
			if (!m) return;
			snippetManager.files[id] = m;
			if (!m.snippets && m.snippetText) m.snippets = snippetManager.parseSnippetFile(m.snippetText);
			snippetManager.register(m.snippets || [], m.scope);
			if (m.includeScopes) {
				snippetManager.snippetMap[m.scope].includeScopes = m.includeScopes;
				m.includeScopes.forEach(function(x) {
					loadSnippetsForMode("ace/mode/" + x);
				});
			}
		});
	};
	var doLiveAutocomplete = function(e) {
		var editor = e.editor;
		var hasCompleter = editor.completer && editor.completer.activated;
		if (e.command.name === "backspace") {
			if (hasCompleter && !util.getCompletionPrefix(editor)) editor.completer.detach();
		} else if (e.command.name === "insertstring" && !hasCompleter) {
			lastExecEvent = e;
			var delay = e.editor.$liveAutocompletionDelay;
			if (delay) liveAutocompleteTimer.delay(delay);
			else showLiveAutocomplete(e);
		}
	};
	var lastExecEvent;
	var liveAutocompleteTimer = lang.delayedCall(function() {
		showLiveAutocomplete(lastExecEvent);
	}, 0);
	var showLiveAutocomplete = function(e) {
		var editor = e.editor;
		var prefix = util.getCompletionPrefix(editor);
		var previousChar = e.args;
		var triggerAutocomplete = util.triggerAutocomplete(editor, previousChar);
		if (prefix && prefix.length >= editor.$liveAutocompletionThreshold || triggerAutocomplete) {
			var completer = Autocomplete.for(editor);
			completer.autoShown = true;
			completer.showPopup(editor);
		}
	};
	var Editor = require_editor().Editor;
	require_config().defineOptions(Editor.prototype, "editor", {
		enableBasicAutocompletion: {
			set: function(val) {
				if (val) {
					Autocomplete.for(this);
					if (!this.completers) this.completers = Array.isArray(val) ? val : completers;
					this.commands.addCommand(Autocomplete.startCommand);
				} else this.commands.removeCommand(Autocomplete.startCommand);
			},
			value: false
		},
		enableLiveAutocompletion: {
			set: function(val) {
				if (val) {
					if (!this.completers) this.completers = Array.isArray(val) ? val : completers;
					this.commands.on("afterExec", doLiveAutocomplete);
				} else this.commands.off("afterExec", doLiveAutocomplete);
			},
			value: false
		},
		liveAutocompletionDelay: { initialValue: 0 },
		liveAutocompletionThreshold: { initialValue: 0 },
		enableSnippets: {
			set: function(val) {
				if (val) {
					this.commands.addCommand(expandSnippet);
					this.on("changeMode", onChangeMode);
					onChangeMode(null, this);
				} else {
					this.commands.removeCommand(expandSnippet);
					this.off("changeMode", onChangeMode);
				}
			},
			value: false
		}
	});
	exports.MarkerGroup = MarkerGroup;
}));
export { require_language_tools as t };
