import { t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { t as require_dom } from "./dom-BBjJ92-n.js";
import { t as require_lang } from "./lang-DcNOSqFo.js";
import { t as require_config } from "./config-DPm1ug3B.js";
import { t as require_editor } from "./editor-BiOsjB7l.js";
import { t as require_hash_handler } from "./hash_handler-G_6vQiwI.js";
import { n as require_util, r as require_inline, t as require_autocomplete } from "./autocomplete-CHTKiwQ7.js";
import { t as require_language_tools } from "./language_tools-BNL-ks-K.js";
import { t as require_command_bar } from "./command_bar-WHY-TVZq.js";
var require_inline_autocomplete = /* @__PURE__ */ __commonJSMin(((exports) => {
	var HashHandler = require_hash_handler().HashHandler;
	var AceInline = require_inline().AceInline;
	var FilteredList = require_autocomplete().FilteredList;
	var CompletionProvider = require_autocomplete().CompletionProvider;
	var Editor = require_editor().Editor;
	var util = require_util();
	var dom = require_dom();
	var lang = require_lang();
	var CommandBarTooltip = require_command_bar().CommandBarTooltip;
	var BUTTON_CLASS_NAME = require_command_bar().BUTTON_CLASS_NAME;
	var snippetCompleter = require_language_tools().snippetCompleter;
	var textCompleter = require_language_tools().textCompleter;
	var keyWordCompleter = require_language_tools().keyWordCompleter;
	var destroyCompleter = function(e, editor) {
		editor.completer && editor.completer.destroy();
	};
	var InlineAutocomplete = class InlineAutocomplete {
		constructor(editor) {
			this.editor = editor;
			this.keyboardHandler = new HashHandler(this.commands);
			this.$index = -1;
			this.blurListener = this.blurListener.bind(this);
			this.changeListener = this.changeListener.bind(this);
			this.changeTimer = lang.delayedCall(function() {
				this.updateCompletions();
			}.bind(this));
		}
		getInlineRenderer() {
			if (!this.inlineRenderer) this.inlineRenderer = new AceInline();
			return this.inlineRenderer;
		}
		getInlineTooltip() {
			if (!this.inlineTooltip) this.inlineTooltip = InlineAutocomplete.createInlineTooltip(document.body || document.documentElement);
			return this.inlineTooltip;
		}
		show(options) {
			this.activated = true;
			if (this.editor.completer !== this) {
				if (this.editor.completer) this.editor.completer.detach();
				this.editor.completer = this;
			}
			this.editor.on("changeSelection", this.changeListener);
			this.editor.on("blur", this.blurListener);
			this.updateCompletions(options);
		}
		$open() {
			if (this.editor.textInput.setAriaOptions) this.editor.textInput.setAriaOptions({});
			this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler);
			this.getInlineTooltip().attach(this.editor);
			if (this.$index === -1) this.setIndex(0);
			else this.$showCompletion();
			this.changeTimer.cancel();
		}
		insertMatch() {
			var result = this.getCompletionProvider().insertByIndex(this.editor, this.$index);
			this.detach();
			return result;
		}
		changeListener(e) {
			var cursor = this.editor.selection.lead;
			if (cursor.row != this.base.row || cursor.column < this.base.column) this.detach();
			if (this.activated) this.changeTimer.schedule();
			else this.detach();
		}
		blurListener(e) {
			this.detach();
		}
		goTo(where) {
			if (!this.completions || !this.completions.filtered) return;
			var completionLength = this.completions.filtered.length;
			switch (where.toLowerCase()) {
				case "prev":
					this.setIndex((this.$index - 1 + completionLength) % completionLength);
					break;
				case "next":
					this.setIndex((this.$index + 1 + completionLength) % completionLength);
					break;
				case "first":
					this.setIndex(0);
					break;
				case "last":
					this.setIndex(this.completions.filtered.length - 1);
					break;
			}
		}
		getLength() {
			if (!this.completions || !this.completions.filtered) return 0;
			return this.completions.filtered.length;
		}
		getData(index) {
			if (index == void 0 || index === null) return this.completions.filtered[this.$index];
			else return this.completions.filtered[index];
		}
		getIndex() {
			return this.$index;
		}
		isOpen() {
			return this.$index >= 0;
		}
		setIndex(value) {
			if (!this.completions || !this.completions.filtered) return;
			var newIndex = Math.max(-1, Math.min(this.completions.filtered.length - 1, value));
			if (newIndex !== this.$index) {
				this.$index = newIndex;
				this.$showCompletion();
			}
		}
		getCompletionProvider(initialPosition) {
			if (!this.completionProvider) this.completionProvider = new CompletionProvider(initialPosition);
			return this.completionProvider;
		}
		$showCompletion() {
			if (!this.getInlineRenderer().show(this.editor, this.completions.filtered[this.$index], this.completions.filterText)) this.getInlineRenderer().hide();
			if (this.inlineTooltip && this.inlineTooltip.isShown()) this.inlineTooltip.update();
		}
		$updatePrefix() {
			var pos = this.editor.getCursorPosition();
			var prefix = this.editor.session.getTextRange({
				start: this.base,
				end: pos
			});
			this.completions.setFilter(prefix);
			if (!this.completions.filtered.length) return this.detach();
			if (this.completions.filtered.length == 1 && this.completions.filtered[0].value == prefix && !this.completions.filtered[0].snippet) return this.detach();
			this.$open(this.editor, prefix);
			return prefix;
		}
		updateCompletions(options) {
			var prefix = "";
			if (options && options.matches) {
				var pos = this.editor.getSelectionRange().start;
				this.base = this.editor.session.doc.createAnchor(pos.row, pos.column);
				this.base.$insertRight = true;
				this.completions = new FilteredList(options.matches);
				return this.$open(this.editor, "");
			}
			if (this.base && this.completions) prefix = this.$updatePrefix();
			var session = this.editor.getSession();
			var pos = this.editor.getCursorPosition();
			var prefix = util.getCompletionPrefix(this.editor);
			this.base = session.doc.createAnchor(pos.row, pos.column - prefix.length);
			this.base.$insertRight = true;
			var options = {
				exactMatch: true,
				ignoreCaption: true
			};
			this.getCompletionProvider({
				prefix,
				base: this.base,
				pos
			}).provideCompletions(this.editor, options, function(err, completions, finished) {
				var filtered = completions.filtered;
				var prefix$1 = util.getCompletionPrefix(this.editor);
				if (finished) {
					if (!filtered.length) return this.detach();
					if (filtered.length == 1 && filtered[0].value == prefix$1 && !filtered[0].snippet) return this.detach();
				}
				this.completions = completions;
				this.$open(this.editor, prefix$1);
			}.bind(this));
		}
		detach() {
			if (this.editor) {
				this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler);
				this.editor.off("changeSelection", this.changeListener);
				this.editor.off("blur", this.blurListener);
			}
			this.changeTimer.cancel();
			if (this.inlineTooltip) this.inlineTooltip.detach();
			this.setIndex(-1);
			if (this.completionProvider) this.completionProvider.detach();
			if (this.inlineRenderer && this.inlineRenderer.isOpen()) this.inlineRenderer.hide();
			if (this.base) this.base.detach();
			this.activated = false;
			this.completionProvider = this.completions = this.base = null;
		}
		destroy() {
			this.detach();
			if (this.inlineRenderer) this.inlineRenderer.destroy();
			if (this.inlineTooltip) this.inlineTooltip.destroy();
			if (this.editor && this.editor.completer == this) {
				this.editor.off("destroy", destroyCompleter);
				this.editor.completer = null;
			}
			this.inlineTooltip = this.editor = this.inlineRenderer = null;
		}
		updateDocTooltip() {}
	};
	InlineAutocomplete.prototype.commands = {
		"Previous": {
			bindKey: "Alt-[",
			name: "Previous",
			exec: function(editor) {
				editor.completer.goTo("prev");
			}
		},
		"Next": {
			bindKey: "Alt-]",
			name: "Next",
			exec: function(editor) {
				editor.completer.goTo("next");
			}
		},
		"Accept": {
			bindKey: {
				win: "Tab|Ctrl-Right",
				mac: "Tab|Cmd-Right"
			},
			name: "Accept",
			exec: function(editor) {
				return editor.completer.insertMatch();
			}
		},
		"Close": {
			bindKey: "Esc",
			name: "Close",
			exec: function(editor) {
				editor.completer.detach();
			}
		}
	};
	InlineAutocomplete.for = function(editor) {
		if (editor.completer instanceof InlineAutocomplete) return editor.completer;
		if (editor.completer) {
			editor.completer.destroy();
			editor.completer = null;
		}
		editor.completer = new InlineAutocomplete(editor);
		editor.once("destroy", destroyCompleter);
		return editor.completer;
	};
	InlineAutocomplete.startCommand = {
		name: "startInlineAutocomplete",
		exec: function(editor, options) {
			InlineAutocomplete.for(editor).show(options);
		},
		bindKey: {
			win: "Alt-C",
			mac: "Option-C"
		}
	};
	var completers = [
		snippetCompleter,
		textCompleter,
		keyWordCompleter
	];
	require_config().defineOptions(Editor.prototype, "editor", { enableInlineAutocompletion: {
		set: function(val) {
			if (val) {
				if (!this.completers) this.completers = Array.isArray(val) ? val : completers;
				this.commands.addCommand(InlineAutocomplete.startCommand);
			} else this.commands.removeCommand(InlineAutocomplete.startCommand);
		},
		value: false
	} });
	InlineAutocomplete.createInlineTooltip = function(parentEl) {
		var inlineTooltip = new CommandBarTooltip(parentEl);
		inlineTooltip.registerCommand("Previous", Object.assign({}, InlineAutocomplete.prototype.commands["Previous"], {
			enabled: true,
			type: "button",
			iconCssClass: "ace_arrow_rotated"
		}));
		inlineTooltip.registerCommand("Position", {
			enabled: false,
			getValue: function(editor) {
				return editor ? [editor.completer.getIndex() + 1, editor.completer.getLength()].join("/") : "";
			},
			type: "text",
			cssClass: "completion_position"
		});
		inlineTooltip.registerCommand("Next", Object.assign({}, InlineAutocomplete.prototype.commands["Next"], {
			enabled: true,
			type: "button",
			iconCssClass: "ace_arrow"
		}));
		inlineTooltip.registerCommand("Accept", Object.assign({}, InlineAutocomplete.prototype.commands["Accept"], {
			enabled: function(editor) {
				return !!editor && editor.completer.getIndex() >= 0;
			},
			type: "button"
		}));
		inlineTooltip.registerCommand("ShowTooltip", {
			name: "Always Show Tooltip",
			exec: function() {
				inlineTooltip.setAlwaysShow(!inlineTooltip.getAlwaysShow());
			},
			enabled: true,
			getValue: function() {
				return inlineTooltip.getAlwaysShow();
			},
			type: "checkbox"
		});
		return inlineTooltip;
	};
	dom.importCssString(`

.ace_icon_svg.ace_arrow,
.ace_icon_svg.ace_arrow_rotated {
    -webkit-mask-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTUuODM3MDEgMTVMNC41ODc1MSAxMy43MTU1TDEwLjE0NjggOEw0LjU4NzUxIDIuMjg0NDZMNS44MzcwMSAxTDEyLjY0NjUgOEw1LjgzNzAxIDE1WiIgZmlsbD0iYmxhY2siLz48L3N2Zz4=");
}

.ace_icon_svg.ace_arrow_rotated {
    transform: rotate(180deg);
}

div.${BUTTON_CLASS_NAME}.completion_position {
    padding: 0;
}
`, "inlineautocomplete.css", false);
	exports.InlineAutocomplete = InlineAutocomplete;
}));
export { require_inline_autocomplete as t };
