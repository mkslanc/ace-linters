import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import "./useragent-BODERP_7.js";
import { t as require_dom } from "./dom-BBjJ92-n.js";
import { t as require_range } from "./range-BUVqNbwc.js";
import "./lang-DcNOSqFo.js";
import "./keys-B8CLTATX.js";
import "./event-BcX-N72I.js";
import { t as require_config } from "./config-DPm1ug3B.js";
import "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import "./editor-BiOsjB7l.js";
import { r as require_undomanager } from "./edit_session-CDHRvoey.js";
import "./tooltip-DAauyLxM.js";
import { t as require_tokenizer } from "./tokenizer-C2b-GJMk.js";
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import "./hash_handler-G_6vQiwI.js";
import "./text-DOzSnOss.js";
import "./virtual_renderer-xL5PfPPr.js";
import "./snippets-Ct-Wi_HP.js";
import { i as require_popup, t as require_autocomplete } from "./autocomplete-CHTKiwQ7.js";
import { t as require_modelist } from "./file-api-websockets-DsCjH-N2.js";
import { t as require_overlay_page } from "./overlay_page-CbLUm6_m.js";
var require_prompt = /* @__PURE__ */ __commonJSMin(((exports) => {
	var nls = require_config().nls;
	var Range = require_range().Range;
	var dom = require_dom();
	var FilteredList = require_autocomplete().FilteredList;
	var AcePopup = require_popup().AcePopup;
	var $singleLineEditor = require_popup().$singleLineEditor;
	var UndoManager = require_undomanager().UndoManager;
	var Tokenizer = require_tokenizer().Tokenizer;
	var overlayPage = require_overlay_page().overlayPage;
	var modelist = require_modelist();
	var openPrompt;
	function prompt(editor, message, options, callback) {
		if (typeof message == "object") return prompt(editor, "", message, options);
		if (openPrompt) {
			var lastPrompt = openPrompt;
			editor = lastPrompt.editor;
			lastPrompt.close();
			if (lastPrompt.name && lastPrompt.name == options.name) return;
		}
		if (options.$type) return prompt[options.$type](editor, callback);
		var cmdLine = $singleLineEditor();
		cmdLine.session.setUndoManager(new UndoManager());
		var el = dom.buildDom(["div", { class: "ace_prompt_container" + (options.hasDescription ? " input-box-with-description" : "") }]);
		var overlay = overlayPage(editor, el, done);
		el.appendChild(cmdLine.container);
		if (editor) {
			editor.cmdLine = cmdLine;
			cmdLine.setOption("fontSize", editor.getOption("fontSize"));
		}
		if (message) cmdLine.setValue(message, 1);
		if (options.selection) cmdLine.selection.setRange({
			start: cmdLine.session.doc.indexToPosition(options.selection[0]),
			end: cmdLine.session.doc.indexToPosition(options.selection[1])
		});
		if (options.getCompletions) {
			var popup = new AcePopup();
			popup.renderer.setStyle("ace_autocomplete_inline");
			popup.container.style.display = "block";
			popup.container.style.maxWidth = "600px";
			popup.container.style.width = "100%";
			popup.container.style.marginTop = "3px";
			popup.renderer.setScrollMargin(2, 2, 0, 0);
			popup.autoSelect = false;
			popup.renderer.$maxLines = 15;
			popup.setRow(-1);
			popup.on("click", function(e) {
				var data = popup.getData(popup.getRow());
				if (!data["error"]) {
					cmdLine.setValue(data.value || data["name"] || data);
					accept();
					e.stop();
				}
			});
			el.appendChild(popup.container);
			updateCompletions();
		}
		if (options.$rules) {
			var tokenizer = new Tokenizer(options.$rules);
			cmdLine.session.bgTokenizer.setTokenizer(tokenizer);
		}
		if (options.placeholder) cmdLine.setOption("placeholder", options.placeholder);
		if (options.hasDescription) {
			var promptTextContainer = dom.buildDom(["div", { class: "ace_prompt_text_container" }]);
			dom.buildDom(options.prompt || "Press 'Enter' to confirm or 'Escape' to cancel", promptTextContainer);
			el.appendChild(promptTextContainer);
		}
		overlay.setIgnoreFocusOut(options.ignoreFocusOut);
		function accept() {
			var val;
			if (popup && popup.getCursorPosition().row > 0) val = valueFromRecentList();
			else val = cmdLine.getValue();
			var curData = popup ? popup.getData(popup.getRow()) : val;
			if (curData && !curData["error"]) {
				done();
				options.onAccept && options.onAccept({
					value: val,
					item: curData
				}, cmdLine);
			}
		}
		var keys = {
			"Enter": accept,
			"Esc|Shift-Esc": function() {
				options.onCancel && options.onCancel(cmdLine.getValue(), cmdLine);
				done();
			}
		};
		if (popup) Object.assign(keys, {
			"Up": function(editor$1) {
				popup.goTo("up");
				valueFromRecentList();
			},
			"Down": function(editor$1) {
				popup.goTo("down");
				valueFromRecentList();
			},
			"Ctrl-Up|Ctrl-Home": function(editor$1) {
				popup.goTo("start");
				valueFromRecentList();
			},
			"Ctrl-Down|Ctrl-End": function(editor$1) {
				popup.goTo("end");
				valueFromRecentList();
			},
			"Tab": function(editor$1) {
				popup.goTo("down");
				valueFromRecentList();
			},
			"PageUp": function(editor$1) {
				popup.gotoPageUp();
				valueFromRecentList();
			},
			"PageDown": function(editor$1) {
				popup.gotoPageDown();
				valueFromRecentList();
			}
		});
		cmdLine.commands.bindKeys(keys);
		function done() {
			overlay.close();
			callback && callback();
			openPrompt = null;
		}
		cmdLine.on("input", function() {
			options.onInput && options.onInput();
			updateCompletions();
		});
		function updateCompletions() {
			if (options.getCompletions) {
				var prefix;
				if (options.getPrefix) prefix = options.getPrefix(cmdLine);
				var completions = options.getCompletions(cmdLine);
				popup.setData(completions, prefix);
				popup.resize(true);
			}
		}
		function valueFromRecentList() {
			var current = popup.getData(popup.getRow());
			if (current && !current["error"]) return current.value || current.caption || current;
		}
		cmdLine.resize(true);
		if (popup) popup.resize(true);
		cmdLine.focus();
		openPrompt = {
			close: done,
			name: options.name,
			editor
		};
	}
	prompt.gotoLine = function(editor, callback) {
		function stringifySelection(selection) {
			if (!Array.isArray(selection)) selection = [selection];
			return selection.map(function(r) {
				var cursor = r.isBackwards ? r.start : r.end;
				var anchor = r.isBackwards ? r.end : r.start;
				var s = anchor.row + 1 + ":" + anchor.column;
				if (anchor.row == cursor.row) {
					if (anchor.column != cursor.column) s += ">:" + cursor.column;
				} else s += ">" + (cursor.row + 1) + ":" + cursor.column;
				return s;
			}).reverse().join(", ");
		}
		prompt(editor, ":" + stringifySelection(editor.selection.toJSON()), {
			name: "gotoLine",
			selection: [1, Number.MAX_VALUE],
			onAccept: function(data) {
				var value = data.value;
				var _history = prompt.gotoLine["_history"];
				if (!_history) prompt.gotoLine["_history"] = _history = [];
				if (_history.indexOf(value) != -1) _history.splice(_history.indexOf(value), 1);
				_history.unshift(value);
				if (_history.length > 20) _history.length = 20;
				var pos = editor.getCursorPosition();
				var ranges = [];
				value.replace(/^:/, "").split(/,/).map(function(str) {
					var parts = str.split(/([<>:+-]|c?\d+)|[^c\d<>:+-]+/).filter(Boolean);
					var i = 0;
					function readPosition() {
						var c = parts[i++];
						if (!c) return;
						if (c[0] == "c") {
							var index = parseInt(c.slice(1)) || 0;
							return editor.session.doc.indexToPosition(index);
						}
						var row = pos.row;
						var column = 0;
						if (/\d/.test(c)) {
							row = parseInt(c) - 1;
							c = parts[i++];
						}
						if (c == ":") {
							c = parts[i++];
							if (/\d/.test(c)) column = parseInt(c) || 0;
						}
						return {
							row,
							column
						};
					}
					pos = readPosition();
					var range = Range.fromPoints(pos, pos);
					if (parts[i] == ">") {
						i++;
						range.end = readPosition();
					} else if (parts[i] == "<") {
						i++;
						range.start = readPosition();
					}
					ranges.unshift(range);
				});
				editor.selection.fromJSON(ranges);
				var scrollTop = editor.renderer.scrollTop;
				editor.renderer.scrollSelectionIntoView(editor.selection.anchor, editor.selection.cursor, .5);
				editor.renderer.animateScrolling(scrollTop);
			},
			history: function() {
				if (!prompt.gotoLine["_history"]) return [];
				return prompt.gotoLine["_history"];
			},
			getCompletions: function(cmdLine) {
				var value = cmdLine.getValue();
				var m = value.replace(/^:/, "").split(":");
				var row = Math.min(parseInt(m[0]) || 1, editor.session.getLength()) - 1;
				var line = editor.session.getLine(row);
				return [value + "  " + line].concat(this.history());
			},
			$rules: { start: [{
				regex: /\d+/,
				token: "string"
			}, {
				regex: /[:,><+\-c]/,
				token: "keyword"
			}] }
		});
	};
	prompt.commands = function(editor, callback) {
		function normalizeName(name) {
			return (name || "").replace(/^./, function(x) {
				return x.toUpperCase(x);
			}).replace(/[a-z][A-Z]/g, function(x) {
				return x[0] + " " + x[1].toLowerCase(x);
			});
		}
		function getEditorCommandsByName(excludeCommands) {
			var commandsByName = [];
			var commandMap = {};
			editor.keyBinding.$handlers.forEach(function(handler) {
				var platform = handler["platform"];
				var cbn = handler["byName"];
				for (var i in cbn) {
					var key = cbn[i].bindKey;
					if (typeof key !== "string") key = key && key[platform] || "";
					var commands = cbn[i];
					var description = commands.description || normalizeName(commands.name);
					if (!Array.isArray(commands)) commands = [commands];
					commands.forEach(function(command) {
						if (typeof command != "string") command = command.name;
						if (!excludeCommands.find(function(el) {
							return el === command;
						})) if (commandMap[command]) commandMap[command].key += "|" + key;
						else {
							commandMap[command] = {
								key,
								command,
								description
							};
							commandsByName.push(commandMap[command]);
						}
					});
				}
			});
			return commandsByName;
		}
		var shortcutsArray = getEditorCommandsByName([
			"insertstring",
			"inserttext",
			"setIndentation",
			"paste"
		]);
		shortcutsArray = shortcutsArray.map(function(item) {
			return {
				value: item.description,
				meta: item.key,
				command: item.command
			};
		});
		prompt(editor, "", {
			name: "commands",
			selection: [0, Number.MAX_VALUE],
			maxHistoryCount: 5,
			onAccept: function(data) {
				if (data.item) {
					var commandName = data.item.command;
					this.addToHistory(data.item);
					editor.execCommand(commandName);
				}
			},
			addToHistory: function(item) {
				var history = this.history();
				history.unshift(item);
				delete item.message;
				for (var i = 1; i < history.length; i++) if (history[i]["command"] == item.command) {
					history.splice(i, 1);
					break;
				}
				if (this.maxHistoryCount > 0 && history.length > this.maxHistoryCount) history.splice(history.length - 1, 1);
				prompt.commands["history"] = history;
			},
			history: function() {
				return prompt.commands["history"] || [];
			},
			getPrefix: function(cmdLine) {
				var currentPos = cmdLine.getCursorPosition();
				return cmdLine.getValue().substring(0, currentPos.column);
			},
			getCompletions: function(cmdLine) {
				function getFilteredCompletions(commands, prefix$1) {
					var resultCommands = JSON.parse(JSON.stringify(commands));
					return new FilteredList(resultCommands).filterCompletions(resultCommands, prefix$1);
				}
				function getUniqueCommandList(commands, usedCommands) {
					if (!usedCommands || !usedCommands.length) return commands;
					var excludeCommands = [];
					usedCommands.forEach(function(item) {
						excludeCommands.push(item.command);
					});
					var resultCommands = [];
					commands.forEach(function(item) {
						if (excludeCommands.indexOf(item.command) === -1) resultCommands.push(item);
					});
					return resultCommands;
				}
				var prefix = this.getPrefix(cmdLine);
				var recentlyUsedCommands = getFilteredCompletions(this.history(), prefix);
				var otherCommands = getUniqueCommandList(shortcutsArray, recentlyUsedCommands);
				otherCommands = getFilteredCompletions(otherCommands, prefix);
				if (recentlyUsedCommands.length && otherCommands.length) {
					recentlyUsedCommands[0].message = nls("prompt.recently-used", "Recently used");
					otherCommands[0].message = nls("prompt.other-commands", "Other commands");
				}
				var completions = recentlyUsedCommands.concat(otherCommands);
				return completions.length > 0 ? completions : [{
					value: nls("prompt.no-matching-commands", "No matching commands"),
					error: 1
				}];
			}
		});
	};
	prompt.modes = function(editor, callback) {
		var modesArray = modelist.modes;
		modesArray = modesArray.map(function(item) {
			return {
				value: item.caption,
				mode: item.name
			};
		});
		prompt(editor, "", {
			name: "modes",
			selection: [0, Number.MAX_VALUE],
			onAccept: function(data) {
				if (data.item) {
					var modeName = "ace/mode/" + data.item.mode;
					editor.session.setMode(modeName);
				}
			},
			getPrefix: function(cmdLine) {
				var currentPos = cmdLine.getCursorPosition();
				return cmdLine.getValue().substring(0, currentPos.column);
			},
			getCompletions: function(cmdLine) {
				function getFilteredCompletions(modes, prefix$1) {
					var resultCommands = JSON.parse(JSON.stringify(modes));
					return new FilteredList(resultCommands).filterCompletions(resultCommands, prefix$1);
				}
				var prefix = this.getPrefix(cmdLine);
				var completions = getFilteredCompletions(modesArray, prefix);
				return completions.length > 0 ? completions : [{
					"caption": "No mode matching",
					"value": "No mode matching",
					"error": 1
				}];
			}
		});
	};
	dom.importCssString(`.ace_prompt_container {
    max-width: 603px;
    width: 100%;
    margin: 20px auto;
    padding: 3px;
    background: white;
    border-radius: 2px;
    box-shadow: 0px 2px 3px 0px #555;
}`, "promtp.css", false);
	exports.prompt = prompt;
}));
export default require_prompt();
