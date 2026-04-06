import { t as __commonJSMin } from "./chunk-Cu_MO8PN.js";
import { t as require_range } from "./range-BakcZ9jR.js";
import { t as require_lang } from "./lang-Chfjzp5y.js";
import { t as require_config } from "./config-7GJDZd_b.js";
import { t as require_editor } from "./editor-ImsyhaOB.js";
import { t as require_snippets } from "./snippets-BNjR0AXO.js";
import { n as require_util, t as require_autocomplete } from "./autocomplete-Yq6Wywy-.js";
//#region node_modules/ace-code/src/marker_group.js
var require_marker_group = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* @typedef {import("./edit_session").EditSession} EditSession
	* @typedef {{range: import("./range").Range, className: string}} MarkerGroupItem
	* @typedef {import("../ace-internal").Ace.LayerConfig} LayerConfig
	*/
	/**
	* @typedef {import("./layer/marker").Marker} Marker
	*/
	var MarkerGroup = class {
		/**
		* @param {EditSession} session
		* @param {{markerType: "fullLine" | "line" | undefined}} [options] Options controlling the behvaiour of the marker.
		* User `markerType` to control how the markers which are part of this group will be rendered:
		* - `undefined`: uses `text` type markers where only text characters within the range will be highlighted.
		* - `fullLine`: will fully highlight all the rows within the range, including the characters before and after the range on the respective rows.
		* - `line`: will fully highlight the lines within the range but will only cover the characters between the start and end of the range.
		*/
		constructor(session, options) {
			if (options) this.markerType = options.markerType;
			/**@type {import("../ace-internal").Ace.MarkerGroupItem[]}*/
			this.markers = [];
			/**@type {EditSession}*/
			this.session = session;
			session.addDynamicMarker(this);
		}
		/**
		* Finds the first marker containing pos
		* @param {import("../ace-internal").Ace.Point} pos
		* @returns {import("../ace-internal").Ace.MarkerGroupItem | undefined}
		*/
		getMarkerAtPosition(pos) {
			return this.markers.find(function(marker) {
				return marker.range.contains(pos.row, pos.column);
			});
		}
		/**
		* Comparator for Array.sort function, which sorts marker definitions by their positions
		*
		* @param {MarkerGroupItem} a first marker.
		* @param {MarkerGroupItem} b second marker.
		* @returns {number} negative number if a should be before b, positive number if b should be before a, 0 otherwise.
		*/
		markersComparator(a, b) {
			return a.range.start.row - b.range.start.row;
		}
		/**
		* Sets marker definitions to be rendered. Limits the number of markers at MAX_MARKERS.
		* @param {MarkerGroupItem[]} markers an array of marker definitions.
		*/
		setMarkers(markers) {
			this.markers = markers.sort(this.markersComparator).slice(0, this.MAX_MARKERS);
			this.session._signal("changeBackMarker");
		}
		/**
		* @param {any} html
		* @param {Marker} markerLayer
		* @param {EditSession} session
		* @param {LayerConfig} config
		*/
		update(html, markerLayer, session, config) {
			if (!this.markers || !this.markers.length) return;
			var visibleRangeStartRow = config.firstRow, visibleRangeEndRow = config.lastRow;
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
				if (this.markerType === "fullLine") markerLayer.drawFullLineMarker(html, screenRange, marker.className, config);
				else if (screenRange.isMultiLine()) if (this.markerType === "line") markerLayer.drawMultiLineMarker(html, screenRange, marker.className, config);
				else markerLayer.drawTextMarker(html, screenRange, marker.className, config);
				else markerLayer.drawSingleLineMarker(html, screenRange, marker.className + " ace_br15", config);
			}
		}
	};
	MarkerGroup.prototype.MAX_MARKERS = 1e4;
	exports.MarkerGroup = MarkerGroup;
}));
//#endregion
//#region node_modules/ace-code/src/autocomplete/text_completer.js
var require_text_completer = /* @__PURE__ */ __commonJSMin(((exports) => {
	var Range = require_range().Range;
	var splitRegex = /[^a-zA-Z_0-9\$\-\u00C0-\u1FFF\u2C00-\uD7FF\w]+/;
	function getWordIndex(doc, pos) {
		return doc.getTextRange(Range.fromPoints({
			row: 0,
			column: 0
		}, pos)).split(splitRegex).length - 1;
	}
	/**
	* Does a distance analysis of the word `prefix` at position `pos` in `doc`.
	* @return Map
	*/
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
//#endregion
//#region node_modules/ace-code/src/ext/language_tools.js
/**
* ## Language Tools extension for Ace Editor
*
* Provides autocompletion, snippets, and language intelligence features for the Ace code editor.
* This extension integrates multiple completion providers including keyword completion, snippet expansion,
* and text-based completion to enhance the coding experience with contextual suggestions and automated code generation.
*
* **Configuration Options:**
* - `enableBasicAutocompletion`: Enable/disable basic completion functionality
* - `enableLiveAutocompletion`: Enable/disable real-time completion suggestions
* - `enableSnippets`: Enable/disable snippet expansion with Tab key
* - `liveAutocompletionDelay`: Delay before showing live completion popup
* - `liveAutocompletionThreshold`: Minimum prefix length to trigger completion
*
* **Usage:**
* ```javascript
* editor.setOptions({
*   enableBasicAutocompletion: true,
*   enableLiveAutocompletion: true,
*   enableSnippets: true
* });
* ```
*
* @module
*/
var require_language_tools = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**@type{import("../snippets").snippetManager & {files?: {[key: string]: any}}}*/
	var snippetManager = require_snippets().snippetManager;
	var Autocomplete = require_autocomplete().Autocomplete;
	var config = require_config();
	var lang = require_lang();
	var util = require_util();
	var MarkerGroup = require_marker_group().MarkerGroup;
	var textCompleter = require_text_completer();
	/**@type {import("../../ace-internal").Ace.Completer}*/
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
	/**@type {import("../../ace-internal").Ace.Completer} */
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
	/**
	* Replaces the default list of completers with a new set of completers.
	*
	* @param {import("../../ace-internal").Ace.Completer[]} [val]
	*
	*/
	exports.setCompleters = function(val) {
		completers.length = 0;
		if (val) completers.push.apply(completers, val);
	};
	/**
	* Adds a new completer to the list of available completers.
	*
	* @param {import("../../ace-internal").Ace.Completer} completer - The completer object to be added to the completers array.
	*/
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
//#endregion
export { require_language_tools as t };
