(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[371,9700],{

/***/ 19700:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var Tooltip = (__webpack_require__(962)/* .Tooltip */ .u);
var EventEmitter = (__webpack_require__(23056)/* .EventEmitter */ .v);
var lang = __webpack_require__(20124);
var dom = __webpack_require__(6359);
var oop = __webpack_require__(89359);
var useragent = __webpack_require__(50618);

var BUTTON_CLASS_NAME = 'command_bar_tooltip_button';
var VALUE_CLASS_NAME = 'command_bar_button_value';
var CAPTION_CLASS_NAME = 'command_bar_button_caption';
var KEYBINDING_CLASS_NAME = 'command_bar_keybinding';
var TOOLTIP_CLASS_NAME = 'command_bar_tooltip';
var MORE_OPTIONS_BUTTON_ID = 'MoreOptionsButton';

var defaultDelay = 100;
var defaultMaxElements = 4;

var minPosition = function (posA, posB) {
    if (posB.row > posA.row) {
        return posA;
    } else if (posB.row === posA.row && posB.column > posA.column) {
        return posA;
    }
    return posB;
};

var keyDisplayMap = {
    "Ctrl": { mac: "^"},
    "Option": { mac: "⌥"},
    "Command": { mac: "⌘"},
    "Cmd": { mac: "⌘"},
    "Shift": "⇧",
    "Left": "←",
    "Right": "→",
    "Up": "↑",
    "Down": "↓"
};


/**
 * Displays a command tooltip above the currently active line selection, with clickable elements.
 *
 * Internally it is a composite of two tooltips, one for the main tooltip and one for the 
 * overflowing commands.
 * The commands are added sequentially in registration order.
 * When attached to an editor, it is either always shown or only when the active line is hovered
 * with mouse, depending on the alwaysShow property.
 */
class CommandBarTooltip {
    constructor(parentNode, options) {
        options = options || {};
        this.parentNode = parentNode;
        this.tooltip = new Tooltip(this.parentNode);
        this.moreOptions = new Tooltip(this.parentNode);
        this.maxElementsOnTooltip = options.maxElementsOnTooltip || defaultMaxElements;
        this.$alwaysShow = options.alwaysShow || false;
        this.eventListeners = {};
        this.elements = {};
        this.commands = {};

        this.tooltipEl = dom.buildDom(['div', { class: TOOLTIP_CLASS_NAME }], this.tooltip.getElement());
        this.moreOptionsEl = dom.buildDom(['div', { class: TOOLTIP_CLASS_NAME + " tooltip_more_options" }], this.moreOptions.getElement());

        this.$showTooltipTimer = lang.delayedCall(this.$showTooltip.bind(this), options.showDelay || defaultDelay);
        this.$hideTooltipTimer = lang.delayedCall(this.$hideTooltip.bind(this), options.hideDelay || defaultDelay);
        this.$tooltipEnter = this.$tooltipEnter.bind(this);
        this.$onMouseMove = this.$onMouseMove.bind(this);
        this.$onChangeScroll = this.$onChangeScroll.bind(this);
        this.$onEditorChangeSession = this.$onEditorChangeSession.bind(this);
        this.$scheduleTooltipForHide = this.$scheduleTooltipForHide.bind(this);
        this.$preventMouseEvent = this.$preventMouseEvent.bind(this);

        for (var event of ["mousedown", "mouseup", "click"]) {
            this.tooltip.getElement().addEventListener(event, this.$preventMouseEvent);
            this.moreOptions.getElement().addEventListener(event, this.$preventMouseEvent);
        }
    }

    /**
     * Registers a command on the command bar tooltip.
     * 
     * The commands are added in sequential order. If there is not enough space on the main
     * toolbar, the remaining elements are added to the overflow menu.
     * 
     * @param {string}            id      
     * @param {TooltipCommand} command
     */
    registerCommand(id, command) {
        var registerForMainTooltip = Object.keys(this.commands).length < this.maxElementsOnTooltip;
        if (!registerForMainTooltip && !this.elements[MORE_OPTIONS_BUTTON_ID]) {
            this.$createCommand(MORE_OPTIONS_BUTTON_ID, {
                name: "···",
                exec: function() {
                    this.$shouldHideMoreOptions = false;
                    this.$setMoreOptionsVisibility(!this.isMoreOptionsShown());
                }.bind(this),
                type: "checkbox",
                getValue: function() {
                    return this.isMoreOptionsShown();
                }.bind(this),
                enabled: true
            }, true);
        }
        this.$createCommand(id, command, registerForMainTooltip);
        if (this.isShown()) {
            this.updatePosition();
        }
    }

    isShown() {
        return !!this.tooltip && this.tooltip.isOpen;
    }

    isMoreOptionsShown() {
        return !!this.moreOptions && this.moreOptions.isOpen;
    }

    getAlwaysShow() {
        return this.$alwaysShow;
    }

    /**
     * Sets the display mode of the tooltip
     * 
     * When true, the tooltip is always displayed while it is attached to an editor.
     * When false, the tooltip is displayed only when the mouse hovers over the active editor line.
     * 
     * @param {Editor} editor
     */
    setAlwaysShow(alwaysShow) {
        this.$alwaysShow = alwaysShow;
        this.$updateOnHoverHandlers(!this.$alwaysShow);
        this._signal("alwaysShow", this.$alwaysShow);
    }

    /**
     * Attaches the clickable command bar tooltip to an editor
     * 
     * Depending on the alwaysShow parameter it either displays the tooltip immediately,
     * or subscribes to the necessary events to display the tooltip on hover.
     * 
     * @param {Editor} editor
     */
    attach(editor) {
        if (!editor || (this.isShown() && this.editor === editor)) {
            return;
        }

        this.detach();

        this.editor = editor;
        this.editor.on("changeSession", this.$onEditorChangeSession);
        if (this.editor.session) {
            this.editor.session.on("changeScrollLeft", this.$onChangeScroll);
            this.editor.session.on("changeScrollTop", this.$onChangeScroll);
        }

        if (this.getAlwaysShow()) {
            this.$showTooltip();
        } else {
            this.$updateOnHoverHandlers(true);
        }
    }

    /**
     * Updates the position of the command bar tooltip. It aligns itself above the active line in the editor.
     */
    updatePosition() {
        if (!this.editor) {
            return;
        }
        var renderer = this.editor.renderer;

        var ranges;
        if (this.editor.selection.getAllRanges) {
            ranges = this.editor.selection.getAllRanges();
        } else {
            ranges = [this.editor.getSelectionRange()];
        }
        if (!ranges.length) {
            return;
        }
        var minPos = minPosition(ranges[0].start, ranges[0].end);
        for (var i = 0, range; range = ranges[i]; i++) {
            minPos = minPosition(minPos, minPosition(range.start, range.end));
        }

        var pos = renderer.$cursorLayer.getPixelPosition(minPos, true);

        var tooltipEl = this.tooltip.getElement();
        var screenWidth = window.innerWidth;
        var screenHeight = window.innerHeight;
        var rect = this.editor.container.getBoundingClientRect();

        pos.top += rect.top - renderer.layerConfig.offset;
        pos.left += rect.left + renderer.gutterWidth - renderer.scrollLeft;

        var cursorVisible = pos.top >= rect.top && pos.top <= rect.bottom &&
            pos.left >= rect.left + renderer.gutterWidth && pos.left <= rect.right;

        if (!cursorVisible && this.isShown()) {
            this.$hideTooltip();
            return;
        } else if (cursorVisible && !this.isShown() && this.getAlwaysShow()) {
            this.$showTooltip();
            return;
        }

        var top = pos.top - tooltipEl.offsetHeight;
        var left = Math.min(screenWidth - tooltipEl.offsetWidth, pos.left);

        var tooltipFits = top >= 0 && top + tooltipEl.offsetHeight <= screenHeight &&
            left >= 0 && left + tooltipEl.offsetWidth <= screenWidth;

        if (!tooltipFits) {
            this.$hideTooltip();
            return;
        }

        this.tooltip.setPosition(left, top);

        if (this.isMoreOptionsShown()) {
            top = top + tooltipEl.offsetHeight;
            left = this.elements[MORE_OPTIONS_BUTTON_ID].getBoundingClientRect().left;
    
            var moreOptionsEl = this.moreOptions.getElement();
            var screenHeight = window.innerHeight;
            if (top + moreOptionsEl.offsetHeight > screenHeight) {
                top -= tooltipEl.offsetHeight + moreOptionsEl.offsetHeight;
            }
            if (left + moreOptionsEl.offsetWidth > screenWidth) {
                left = screenWidth - moreOptionsEl.offsetWidth;
            }
            
            this.moreOptions.setPosition(left, top);
        }
    }

    /**
     * Updates each command element in the tooltip. 
     * 
     * This is automatically called on certain events, but can be called manually as well.
     */
    update() {
        Object.keys(this.elements).forEach(this.$updateElement.bind(this));
    }

    /**
     * Detaches the tooltip from the editor.
     */
    detach() {
        this.tooltip.hide();
        this.moreOptions.hide();
        this.$updateOnHoverHandlers(false);
        if (this.editor) {
            this.editor.off("changeSession", this.$onEditorChangeSession);
            if (this.editor.session) {
                this.editor.session.off("changeScrollLeft", this.$onChangeScroll);
                this.editor.session.off("changeScrollTop", this.$onChangeScroll);
            }
        }
        this.$mouseInTooltip = false;
        this.editor = null;
    }

    destroy() {
        if (this.tooltip && this.moreOptions) {
            this.detach();
            this.tooltip.destroy();
            this.moreOptions.destroy();
        }
        this.eventListeners = {};
        this.commands = {};
        this.elements = {};
        this.tooltip = this.moreOptions = this.parentNode = null;
    }

    $createCommand(id, command, forMainTooltip) {
        var parentEl = forMainTooltip ? this.tooltipEl : this.moreOptionsEl;
        var keyParts = [];
        var bindKey = command.bindKey;
        if (bindKey) {
            if (typeof bindKey === 'object') {
                bindKey = useragent.isMac ? bindKey.mac : bindKey.win;
            }
            bindKey = bindKey.split("|")[0];
            keyParts = bindKey.split("-");
            
            keyParts = keyParts.map(function(key) {
                if (keyDisplayMap[key]) {
                    if (typeof keyDisplayMap[key] === 'string') {
                        return keyDisplayMap[key];
                    } else if (useragent.isMac && keyDisplayMap[key].mac) {
                        return keyDisplayMap[key].mac;
                    }
                }
                return key;
            });
        }

        var buttonNode;
        if (forMainTooltip && command.iconCssClass) {
            //Only support icon button for main tooltip, otherwise fall back to text button
            buttonNode = [
                'div',
                {
                     class: ["ace_icon_svg", command.iconCssClass].join(" "),
                     "aria-label": command.name + " (" + command.bindKey + ")"
                }
            ];
        } else {
            buttonNode = [
                ['div', { class: VALUE_CLASS_NAME }],
                ['div', { class: CAPTION_CLASS_NAME }, command.name]
            ];
            if (keyParts.length) {
                buttonNode.push(
                    [
                        'div',
                        { class: KEYBINDING_CLASS_NAME },
                        keyParts.map(function(keyPart) {
                            return ['div', keyPart];
                        }) 
                    ]
                );
            }
        }

        dom.buildDom(['div', { class: [BUTTON_CLASS_NAME, command.cssClass || ""].join(" "), ref: id }, buttonNode], parentEl, this.elements);
        this.commands[id] = command;

        var eventListener = function(e) {
            if (this.editor) {
                this.editor.focus();
            }
            // Internal variable to properly handle when the more options button is clicked
            this.$shouldHideMoreOptions = this.isMoreOptionsShown();
            if (!this.elements[id].disabled && command.exec) {
                command.exec(this.editor);
            }
            if (this.$shouldHideMoreOptions) {
                this.$setMoreOptionsVisibility(false);
            }
            this.update();
            e.preventDefault();
        }.bind(this);
        this.eventListeners[id] = eventListener;
        this.elements[id].addEventListener('click', eventListener.bind(this));
        this.$updateElement(id);
    }

    $setMoreOptionsVisibility(visible) {
        if (visible) {
            this.moreOptions.setTheme(this.editor.renderer.theme);
            this.moreOptions.setClassName(TOOLTIP_CLASS_NAME + "_wrapper");
            this.moreOptions.show();
            this.update();
            this.updatePosition();
        } else {
            this.moreOptions.hide();
        }
    }

    $onEditorChangeSession(e) {
        if (e.oldSession) {
            e.oldSession.off("changeScrollTop", this.$onChangeScroll);
            e.oldSession.off("changeScrollLeft", this.$onChangeScroll);
        }
        this.detach();
    }

    $onChangeScroll() {
        if (this.editor.renderer && (this.isShown() || this.getAlwaysShow())) {
            this.editor.renderer.once("afterRender", this.updatePosition.bind(this));
        }
    }

    $onMouseMove(e) {
        if (this.$mouseInTooltip) {
            return;
        }
        var cursorPosition = this.editor.getCursorPosition();
        var cursorScreenPosition = this.editor.renderer.textToScreenCoordinates(cursorPosition.row, cursorPosition.column);
        var lineHeight = this.editor.renderer.lineHeight;
        
        var isInCurrentLine = e.clientY >= cursorScreenPosition.pageY && e.clientY < cursorScreenPosition.pageY + lineHeight;

        if (isInCurrentLine) {
            if (!this.isShown() && !this.$showTooltipTimer.isPending()) {
                this.$showTooltipTimer.delay();
            }
            if (this.$hideTooltipTimer.isPending()) {
                this.$hideTooltipTimer.cancel();
            }
        } else {
            if (this.isShown() && !this.$hideTooltipTimer.isPending()) {
                this.$hideTooltipTimer.delay();
            }
            if (this.$showTooltipTimer.isPending()) {
                this.$showTooltipTimer.cancel();
            }
        }
    }

    $preventMouseEvent(e) {
        if (this.editor) {
            this.editor.focus();
        }
        e.preventDefault();
    }
    
    $scheduleTooltipForHide() {
        this.$mouseInTooltip = false;
        this.$showTooltipTimer.cancel();
        this.$hideTooltipTimer.delay();
    }

    $tooltipEnter() {
        this.$mouseInTooltip = true;
        if (this.$showTooltipTimer.isPending()) {
            this.$showTooltipTimer.cancel();
        }
        if (this.$hideTooltipTimer.isPending()) {
            this.$hideTooltipTimer.cancel();
        }
    }

    $updateOnHoverHandlers(enableHover) {
        var tooltipEl = this.tooltip.getElement();
        var moreOptionsEl = this.moreOptions.getElement();
        if (enableHover) {
            if (this.editor) {
                this.editor.on("mousemove", this.$onMouseMove);
                this.editor.renderer.getMouseEventTarget().addEventListener("mouseout", this.$scheduleTooltipForHide, true);
            }
            tooltipEl.addEventListener('mouseenter', this.$tooltipEnter);
            tooltipEl.addEventListener('mouseleave', this.$scheduleTooltipForHide);
            moreOptionsEl.addEventListener('mouseenter', this.$tooltipEnter);
            moreOptionsEl.addEventListener('mouseleave', this.$scheduleTooltipForHide);
        } else {
            if (this.editor) {
                this.editor.off("mousemove", this.$onMouseMove);
                this.editor.renderer.getMouseEventTarget().removeEventListener("mouseout", this.$scheduleTooltipForHide, true);
            }
            tooltipEl.removeEventListener('mouseenter', this.$tooltipEnter);
            tooltipEl.removeEventListener('mouseleave', this.$scheduleTooltipForHide);
            moreOptionsEl.removeEventListener('mouseenter', this.$tooltipEnter);
            moreOptionsEl.removeEventListener('mouseleave', this.$scheduleTooltipForHide);
        }
    }

    $showTooltip() {
        if (this.isShown()) {
            return;
        }
        this.tooltip.setTheme(this.editor.renderer.theme);
        this.tooltip.setClassName(TOOLTIP_CLASS_NAME + "_wrapper");
        this.tooltip.show();
        this.update();
        this.updatePosition();
        this._signal("show");
    }
    
    $hideTooltip() {
        this.$mouseInTooltip = false;
        if (!this.isShown()) {
            return;
        }
        this.moreOptions.hide();
        this.tooltip.hide();
        this._signal("hide");
    }

    $updateElement(id) {
        var command = this.commands[id];
        if (!command) {
            return;
        }
        var el = this.elements[id];
        var commandEnabled = command.enabled;
        
        if (typeof commandEnabled === 'function') {
            commandEnabled = commandEnabled(this.editor);
        }

        if (typeof command.getValue === 'function') {
            var value = command.getValue(this.editor);
            if (command.type === 'text') {
                el.textContent = value;
            } else if (command.type === 'checkbox') {
                var domCssFn = value ? dom.addCssClass : dom.removeCssClass;
                var isOnTooltip = el.parentElement === this.tooltipEl;
                el.ariaChecked = value;
                if (isOnTooltip) {
                    domCssFn(el, "ace_selected");
                } else {
                    el = el.querySelector("." + VALUE_CLASS_NAME);
                    domCssFn(el, "ace_checkmark");
                }
            }
        }

        if (commandEnabled && el.disabled) {
            dom.removeCssClass(el, "ace_disabled");
            el.ariaDisabled = el.disabled = false;
            el.removeAttribute("disabled");
        } else if (!commandEnabled && !el.disabled) {
            dom.addCssClass(el, "ace_disabled");
            el.ariaDisabled = el.disabled = true;
            el.setAttribute("disabled", "");
        }
    }
}

oop.implement(CommandBarTooltip.prototype, EventEmitter);

dom.importCssString(`
.ace_tooltip.${TOOLTIP_CLASS_NAME}_wrapper {
    padding: 0;
}

.ace_tooltip .${TOOLTIP_CLASS_NAME} {
    padding: 1px 5px;
    display: flex;
    pointer-events: auto;
}

.ace_tooltip .${TOOLTIP_CLASS_NAME}.tooltip_more_options {
    padding: 1px;
    flex-direction: column;
}

div.${BUTTON_CLASS_NAME} {
    display: inline-flex;
    cursor: pointer;
    margin: 1px;
    border-radius: 2px;
    padding: 2px 5px;
    align-items: center;
}

div.${BUTTON_CLASS_NAME}.ace_selected,
div.${BUTTON_CLASS_NAME}:hover:not(.ace_disabled) {
    background-color: rgba(0, 0, 0, 0.1);
}

div.${BUTTON_CLASS_NAME}.ace_disabled {
    color: #777;
    pointer-events: none;
}

div.${BUTTON_CLASS_NAME} .ace_icon_svg {
    height: 12px;
    background-color: #000;
}

div.${BUTTON_CLASS_NAME}.ace_disabled .ace_icon_svg {
    background-color: #777;
}

.${TOOLTIP_CLASS_NAME}.tooltip_more_options .${BUTTON_CLASS_NAME} {
    display: flex;
}

.${TOOLTIP_CLASS_NAME}.${VALUE_CLASS_NAME} {
    display: none;
}

.${TOOLTIP_CLASS_NAME}.tooltip_more_options .${VALUE_CLASS_NAME} {
    display: inline-block;
    width: 12px;
}

.${CAPTION_CLASS_NAME} {
    display: inline-block;
}

.${KEYBINDING_CLASS_NAME} {
    margin: 0 2px;
    display: inline-block;
    font-size: 8px;
}

.${TOOLTIP_CLASS_NAME}.tooltip_more_options .${KEYBINDING_CLASS_NAME} {
    margin-left: auto;
}

.${KEYBINDING_CLASS_NAME} div {
    display: inline-block;
    min-width: 8px;
    padding: 2px;
    margin: 0 1px;
    border-radius: 2px;
    background-color: #ccc;
    text-align: center;
}

.ace_dark.ace_tooltip .${TOOLTIP_CLASS_NAME} {
    background-color: #373737;
    color: #eee;
}

.ace_dark div.${BUTTON_CLASS_NAME}.ace_disabled {
    color: #979797;
}

.ace_dark div.${BUTTON_CLASS_NAME}.ace_selected,
.ace_dark div.${BUTTON_CLASS_NAME}:hover:not(.ace_disabled) {
    background-color: rgba(255, 255, 255, 0.1);
}

.ace_dark div.${BUTTON_CLASS_NAME} .ace_icon_svg {
    background-color: #eee;
}

.ace_dark div.${BUTTON_CLASS_NAME}.ace_disabled .ace_icon_svg {
    background-color: #979797;
}

.ace_dark .${BUTTON_CLASS_NAME}.ace_disabled {
    color: #979797;
}

.ace_dark .${KEYBINDING_CLASS_NAME} div {
    background-color: #575757;
}

.ace_checkmark::before {
    content: '✓';
}
`, "commandbar.css", false);

exports.CommandBarTooltip = CommandBarTooltip;
exports.TOOLTIP_CLASS_NAME = TOOLTIP_CLASS_NAME;
exports.BUTTON_CLASS_NAME = BUTTON_CLASS_NAME;


/***/ }),

/***/ 90371:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var HashHandler = (__webpack_require__(7116).HashHandler);
var AceInline = (__webpack_require__(44525)/* .AceInline */ .r);
var FilteredList = (__webpack_require__(39528)/* .FilteredList */ .Xy);
var CompletionProvider = (__webpack_require__(39528)/* .CompletionProvider */ .N1);
var Editor = (__webpack_require__(82880)/* .Editor */ .M);
var util = __webpack_require__(83860);
var dom = __webpack_require__(6359);
var lang = __webpack_require__(20124);
var CommandBarTooltip = (__webpack_require__(19700).CommandBarTooltip);
var BUTTON_CLASS_NAME = (__webpack_require__(19700).BUTTON_CLASS_NAME);

var snippetCompleter = (__webpack_require__(11105).snippetCompleter);
var textCompleter = (__webpack_require__(11105).textCompleter);
var keyWordCompleter = (__webpack_require__(11105).keyWordCompleter);

var destroyCompleter = function(e, editor) {
    editor.completer && editor.completer.destroy();
};

/**
 * This class controls the inline-only autocompletion components and their lifecycle.
 * This is more lightweight than the popup-based autocompletion, as it can only work with exact prefix matches.
 * There is an inline ghost text renderer and an optional command bar tooltip inside.
 */
class InlineAutocomplete {
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
        if (!this.inlineRenderer)
            this.inlineRenderer = new AceInline();
        return this.inlineRenderer;
    }

    getInlineTooltip() {
        if (!this.inlineTooltip) {
            this.inlineTooltip = InlineAutocomplete.createInlineTooltip(document.body || document.documentElement);
        }
        return this.inlineTooltip;
    }


    /**
     * This function is the entry point to the class. This triggers the gathering of the autocompletion and displaying the results;
     * @param {CompletionOptions} options
     */
    show(options) {
        this.activated = true;

        if (this.editor.completer !== this) {
            if (this.editor.completer)
                this.editor.completer.detach();
            this.editor.completer = this;
        }

        this.editor.on("changeSelection", this.changeListener);
        this.editor.on("blur", this.blurListener);

        this.updateCompletions(options);
    }

    $open() {
        if (this.editor.textInput.setAriaOptions) {
            this.editor.textInput.setAriaOptions({});
        }

        this.editor.keyBinding.addKeyboardHandler(this.keyboardHandler);
        this.getInlineTooltip().attach(this.editor);

        if (this.$index === -1) {
            this.setIndex(0);
        } else {
            this.$showCompletion();
        }
        
        this.changeTimer.cancel();
    }
    
    insertMatch() {
        var result = this.getCompletionProvider().insertByIndex(this.editor, this.$index);
        this.detach();
        return result;
    }

    changeListener(e) {
        var cursor = this.editor.selection.lead;
        if (cursor.row != this.base.row || cursor.column < this.base.column) {
            this.detach();
        }
        if (this.activated)
            this.changeTimer.schedule();
        else
            this.detach();
    }

    blurListener(e) {
        this.detach();
    }

    goTo(where) {
        if (!this.completions || !this.completions.filtered) {
            return;
        }
        var completionLength = this.completions.filtered.length;
        switch(where.toLowerCase()) {
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
        if (!this.completions || !this.completions.filtered) {
            return 0;
        }
        return this.completions.filtered.length;
    }

    getData(index) {
        if (index == undefined || index === null) {
            return this.completions.filtered[this.$index];
        } else {
            return this.completions.filtered[index];
        }
    }

    getIndex() {
        return this.$index;
    }

    isOpen() {
        return this.$index >= 0;
    }

    setIndex(value) {
        if (!this.completions || !this.completions.filtered) {
            return;
        }
        var newIndex = Math.max(-1, Math.min(this.completions.filtered.length - 1, value));
        if (newIndex !== this.$index) {
            this.$index = newIndex;
            this.$showCompletion();
        }
    }

    getCompletionProvider() {
        if (!this.completionProvider)
            this.completionProvider = new CompletionProvider();
        return this.completionProvider;
    }

    $showCompletion() {
        if (!this.getInlineRenderer().show(this.editor, this.completions.filtered[this.$index], this.completions.filterText)) {
            // Not able to show the completion, hide the previous one
            this.getInlineRenderer().hide();
        }
        if (this.inlineTooltip && this.inlineTooltip.isShown()) {
            this.inlineTooltip.update();
        }
    }

    $updatePrefix() {
        var pos = this.editor.getCursorPosition();
        var prefix = this.editor.session.getTextRange({start: this.base, end: pos});
        this.completions.setFilter(prefix);
        if (!this.completions.filtered.length)
            return this.detach();
        if (this.completions.filtered.length == 1
        && this.completions.filtered[0].value == prefix
        && !this.completions.filtered[0].snippet)
            return this.detach();
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

        if (this.base && this.completions) {
            prefix = this.$updatePrefix();
        }

        var session = this.editor.getSession();
        var pos = this.editor.getCursorPosition();
        var prefix = util.getCompletionPrefix(this.editor);
        this.base = session.doc.createAnchor(pos.row, pos.column - prefix.length);
        this.base.$insertRight = true;
        var options = {
            exactMatch: true,
            ignoreCaption: true
        };
        this.getCompletionProvider().provideCompletions(this.editor, options, function(err, completions, finished) {
            var filtered = completions.filtered;
            var prefix = util.getCompletionPrefix(this.editor);

            if (finished) {
                // No results
                if (!filtered.length)
                    return this.detach();

                // One result equals to the prefix
                if (filtered.length == 1 && filtered[0].value == prefix && !filtered[0].snippet)
                    return this.detach();
            }
            this.completions = completions;
            this.$open(this.editor, prefix);
        }.bind(this));
    }

    detach() {
        if (this.editor) {
            this.editor.keyBinding.removeKeyboardHandler(this.keyboardHandler);
            this.editor.off("changeSelection", this.changeListener);
            this.editor.off("blur", this.blurListener);
        }
        this.changeTimer.cancel();
        if (this.inlineTooltip) {
            this.inlineTooltip.detach();
        }
        
        this.setIndex(-1);

        if (this.completionProvider) {
            this.completionProvider.detach();
        }

        if (this.inlineRenderer && this.inlineRenderer.isOpen()) {
            this.inlineRenderer.hide();
        }

        if (this.base)
            this.base.detach();
        this.activated = false;
        this.completionProvider = this.completions = this.base = null;
    }

    destroy() {
        this.detach();
        if (this.inlineRenderer)
            this.inlineRenderer.destroy();
        if (this.inlineTooltip)
            this.inlineTooltip.destroy();
        if (this.editor && this.editor.completer == this) {
            this.editor.off("destroy", destroyCompleter);
            this.editor.completer = null;
        }
        this.inlineTooltip = this.editor = this.inlineRenderer = null;
    }

}

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
        bindKey: { win: "Tab|Ctrl-Right", mac: "Tab|Cmd-Right" },
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
    if (editor.completer instanceof InlineAutocomplete) {
        return editor.completer;
    }
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
        var completer = InlineAutocomplete.for(editor);
        completer.show(options);
    },
    bindKey: { win: "Alt-C", mac: "Option-C" }
};


var completers = [snippetCompleter, textCompleter, keyWordCompleter];

(__webpack_require__(13188).defineOptions)(Editor.prototype, "editor", {
    enableInlineAutocompletion: {
        set: function(val) {
            if (val) {
                if (!this.completers)
                    this.completers = Array.isArray(val)? val : completers;
                this.commands.addCommand(InlineAutocomplete.startCommand);
            } else {
                this.commands.removeCommand(InlineAutocomplete.startCommand);
            }
        },
        value: false
    }
});

/**
 * Factory method to create a command bar tooltip for inline autocomplete.
 * 
 * @param {HTMLElement} parentEl  The parent element where the tooltip HTML elements will be added.
 * @returns {CommandBarTooltip}   The command bar tooltip for inline autocomplete
 */
InlineAutocomplete.createInlineTooltip = function(parentEl) {
    var inlineTooltip = new CommandBarTooltip(parentEl);
    inlineTooltip.registerCommand("Previous", 
        Object.assign({}, InlineAutocomplete.prototype.commands["Previous"], {
            enabled: true,
            type: "button",
            iconCssClass: "ace_arrow_rotated"
        })
    );
    inlineTooltip.registerCommand("Position", {
        enabled: false,
        getValue: function(editor) {
            return editor ? [editor.completer.getIndex() + 1, editor.completer.getLength()].join("/") : "";
        },
        type: "text",
        cssClass: "completion_position"
    });
    inlineTooltip.registerCommand("Next", 
        Object.assign({}, InlineAutocomplete.prototype.commands["Next"], {
            enabled: true,
            type: "button",
            iconCssClass: "ace_arrow"
        })
    );
    inlineTooltip.registerCommand("Accept", 
        Object.assign({}, InlineAutocomplete.prototype.commands["Accept"], {
            enabled: function(editor) {
                return !!editor && editor.completer.getIndex() >= 0;
            },
            type: "button"
        })
    );
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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjM3MS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLGNBQWMsMkNBQTZCO0FBQzNDLG1CQUFtQixrREFBNEM7QUFDL0QsV0FBVyxtQkFBTyxDQUFDLEtBQWE7QUFDaEMsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIsZ0JBQWdCLG1CQUFPLENBQUMsS0FBa0I7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsU0FBUztBQUN2QixnQkFBZ0IsU0FBUztBQUN6QixpQkFBaUIsU0FBUztBQUMxQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdEQUFnRCwyQkFBMkI7QUFDM0Usb0RBQW9ELHFEQUFxRDs7QUFFekc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsbUJBQW1CO0FBQ2xDLGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtQkFBbUI7QUFDbEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsMEJBQTBCLHlCQUF5QjtBQUNuRCwwQkFBMEIsMkJBQTJCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsOEJBQThCO0FBQ3hEO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLHVFQUF1RTtBQUN0Rzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxlQUFlLG1CQUFtQjtBQUNsQztBQUNBOztBQUVBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsbUJBQW1CO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxrQkFBa0I7QUFDeEIsTUFBTSxrQkFBa0I7QUFDeEI7QUFDQTs7QUFFQSxNQUFNLGtCQUFrQjtBQUN4QjtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxtQkFBbUI7QUFDekI7QUFDQTtBQUNBOztBQUVBLE1BQU0sa0JBQWtCO0FBQ3hCO0FBQ0E7O0FBRUEsR0FBRyxtQkFBbUIseUJBQXlCO0FBQy9DO0FBQ0E7O0FBRUEsR0FBRyxtQkFBbUIsR0FBRztBQUN6QjtBQUNBOztBQUVBLEdBQUcsbUJBQW1CLHlCQUF5QjtBQUMvQztBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUcsbUJBQW1CLHlCQUF5QjtBQUMvQztBQUNBOztBQUVBLEdBQUcsdUJBQXVCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7O0FBRUEsZ0JBQWdCLGtCQUFrQjtBQUNsQyxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7O0FBRUEsZ0JBQWdCLG1CQUFtQjtBQUNuQztBQUNBOztBQUVBLGdCQUFnQixrQkFBa0I7QUFDbEM7QUFDQTs7QUFFQSxhQUFhLGtCQUFrQjtBQUMvQjtBQUNBOztBQUVBLGFBQWEsdUJBQXVCO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCO0FBQ3pCLDBCQUEwQjtBQUMxQix5QkFBeUI7Ozs7Ozs7OztBQzFuQlo7O0FBRWIsa0JBQWtCLHVDQUErQztBQUNqRSxnQkFBZ0IsK0NBQTJDO0FBQzNELG1CQUFtQixtREFBdUM7QUFDMUQseUJBQXlCLHlEQUE2QztBQUN0RSxhQUFhLDRDQUEyQjtBQUN4QyxXQUFXLG1CQUFPLENBQUMsS0FBc0I7QUFDekMsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsV0FBVyxtQkFBTyxDQUFDLEtBQWE7QUFDaEMsd0JBQXdCLDhDQUEwQztBQUNsRSx3QkFBd0IsOENBQTBDOztBQUVsRSx1QkFBdUIsNkNBQTRDO0FBQ25FLG9CQUFvQiwwQ0FBeUM7QUFDN0QsdUJBQXVCLDZDQUE0Qzs7QUFFbkU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsZUFBZSxtQkFBbUI7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELDJCQUEyQjtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxtQkFBbUIsNkNBQTZDO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGVBQWU7QUFDZjs7O0FBR0E7O0FBRUEsMENBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixhQUFhLHFCQUFxQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNLGtCQUFrQjtBQUN4QjtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L2NvbW1hbmRfYmFyLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9pbmxpbmVfYXV0b2NvbXBsZXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBUb29sdGlwID0gcmVxdWlyZShcIi4uL3Rvb2x0aXBcIikuVG9vbHRpcDtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKFwiLi4vbGliL2V2ZW50X2VtaXR0ZXJcIikuRXZlbnRFbWl0dGVyO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2xpYi9kb21cIik7XG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgdXNlcmFnZW50ID0gcmVxdWlyZShcIi4uL2xpYi91c2VyYWdlbnRcIik7XG5cbnZhciBCVVRUT05fQ0xBU1NfTkFNRSA9ICdjb21tYW5kX2Jhcl90b29sdGlwX2J1dHRvbic7XG52YXIgVkFMVUVfQ0xBU1NfTkFNRSA9ICdjb21tYW5kX2Jhcl9idXR0b25fdmFsdWUnO1xudmFyIENBUFRJT05fQ0xBU1NfTkFNRSA9ICdjb21tYW5kX2Jhcl9idXR0b25fY2FwdGlvbic7XG52YXIgS0VZQklORElOR19DTEFTU19OQU1FID0gJ2NvbW1hbmRfYmFyX2tleWJpbmRpbmcnO1xudmFyIFRPT0xUSVBfQ0xBU1NfTkFNRSA9ICdjb21tYW5kX2Jhcl90b29sdGlwJztcbnZhciBNT1JFX09QVElPTlNfQlVUVE9OX0lEID0gJ01vcmVPcHRpb25zQnV0dG9uJztcblxudmFyIGRlZmF1bHREZWxheSA9IDEwMDtcbnZhciBkZWZhdWx0TWF4RWxlbWVudHMgPSA0O1xuXG52YXIgbWluUG9zaXRpb24gPSBmdW5jdGlvbiAocG9zQSwgcG9zQikge1xuICAgIGlmIChwb3NCLnJvdyA+IHBvc0Eucm93KSB7XG4gICAgICAgIHJldHVybiBwb3NBO1xuICAgIH0gZWxzZSBpZiAocG9zQi5yb3cgPT09IHBvc0Eucm93ICYmIHBvc0IuY29sdW1uID4gcG9zQS5jb2x1bW4pIHtcbiAgICAgICAgcmV0dXJuIHBvc0E7XG4gICAgfVxuICAgIHJldHVybiBwb3NCO1xufTtcblxudmFyIGtleURpc3BsYXlNYXAgPSB7XG4gICAgXCJDdHJsXCI6IHsgbWFjOiBcIl5cIn0sXG4gICAgXCJPcHRpb25cIjogeyBtYWM6IFwi4oylXCJ9LFxuICAgIFwiQ29tbWFuZFwiOiB7IG1hYzogXCLijJhcIn0sXG4gICAgXCJDbWRcIjogeyBtYWM6IFwi4oyYXCJ9LFxuICAgIFwiU2hpZnRcIjogXCLih6dcIixcbiAgICBcIkxlZnRcIjogXCLihpBcIixcbiAgICBcIlJpZ2h0XCI6IFwi4oaSXCIsXG4gICAgXCJVcFwiOiBcIuKGkVwiLFxuICAgIFwiRG93blwiOiBcIuKGk1wiXG59O1xuXG5cbi8qKlxuICogRGlzcGxheXMgYSBjb21tYW5kIHRvb2x0aXAgYWJvdmUgdGhlIGN1cnJlbnRseSBhY3RpdmUgbGluZSBzZWxlY3Rpb24sIHdpdGggY2xpY2thYmxlIGVsZW1lbnRzLlxuICpcbiAqIEludGVybmFsbHkgaXQgaXMgYSBjb21wb3NpdGUgb2YgdHdvIHRvb2x0aXBzLCBvbmUgZm9yIHRoZSBtYWluIHRvb2x0aXAgYW5kIG9uZSBmb3IgdGhlIFxuICogb3ZlcmZsb3dpbmcgY29tbWFuZHMuXG4gKiBUaGUgY29tbWFuZHMgYXJlIGFkZGVkIHNlcXVlbnRpYWxseSBpbiByZWdpc3RyYXRpb24gb3JkZXIuXG4gKiBXaGVuIGF0dGFjaGVkIHRvIGFuIGVkaXRvciwgaXQgaXMgZWl0aGVyIGFsd2F5cyBzaG93biBvciBvbmx5IHdoZW4gdGhlIGFjdGl2ZSBsaW5lIGlzIGhvdmVyZWRcbiAqIHdpdGggbW91c2UsIGRlcGVuZGluZyBvbiB0aGUgYWx3YXlzU2hvdyBwcm9wZXJ0eS5cbiAqL1xuY2xhc3MgQ29tbWFuZEJhclRvb2x0aXAge1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudE5vZGUsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHRoaXMucGFyZW50Tm9kZSA9IHBhcmVudE5vZGU7XG4gICAgICAgIHRoaXMudG9vbHRpcCA9IG5ldyBUb29sdGlwKHRoaXMucGFyZW50Tm9kZSk7XG4gICAgICAgIHRoaXMubW9yZU9wdGlvbnMgPSBuZXcgVG9vbHRpcCh0aGlzLnBhcmVudE5vZGUpO1xuICAgICAgICB0aGlzLm1heEVsZW1lbnRzT25Ub29sdGlwID0gb3B0aW9ucy5tYXhFbGVtZW50c09uVG9vbHRpcCB8fCBkZWZhdWx0TWF4RWxlbWVudHM7XG4gICAgICAgIHRoaXMuJGFsd2F5c1Nob3cgPSBvcHRpb25zLmFsd2F5c1Nob3cgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSB7fTtcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IHt9O1xuICAgICAgICB0aGlzLmNvbW1hbmRzID0ge307XG5cbiAgICAgICAgdGhpcy50b29sdGlwRWwgPSBkb20uYnVpbGREb20oWydkaXYnLCB7IGNsYXNzOiBUT09MVElQX0NMQVNTX05BTUUgfV0sIHRoaXMudG9vbHRpcC5nZXRFbGVtZW50KCkpO1xuICAgICAgICB0aGlzLm1vcmVPcHRpb25zRWwgPSBkb20uYnVpbGREb20oWydkaXYnLCB7IGNsYXNzOiBUT09MVElQX0NMQVNTX05BTUUgKyBcIiB0b29sdGlwX21vcmVfb3B0aW9uc1wiIH1dLCB0aGlzLm1vcmVPcHRpb25zLmdldEVsZW1lbnQoKSk7XG5cbiAgICAgICAgdGhpcy4kc2hvd1Rvb2x0aXBUaW1lciA9IGxhbmcuZGVsYXllZENhbGwodGhpcy4kc2hvd1Rvb2x0aXAuYmluZCh0aGlzKSwgb3B0aW9ucy5zaG93RGVsYXkgfHwgZGVmYXVsdERlbGF5KTtcbiAgICAgICAgdGhpcy4kaGlkZVRvb2x0aXBUaW1lciA9IGxhbmcuZGVsYXllZENhbGwodGhpcy4kaGlkZVRvb2x0aXAuYmluZCh0aGlzKSwgb3B0aW9ucy5oaWRlRGVsYXkgfHwgZGVmYXVsdERlbGF5KTtcbiAgICAgICAgdGhpcy4kdG9vbHRpcEVudGVyID0gdGhpcy4kdG9vbHRpcEVudGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuJG9uTW91c2VNb3ZlID0gdGhpcy4kb25Nb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy4kb25DaGFuZ2VTY3JvbGwgPSB0aGlzLiRvbkNoYW5nZVNjcm9sbC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLiRvbkVkaXRvckNoYW5nZVNlc3Npb24gPSB0aGlzLiRvbkVkaXRvckNoYW5nZVNlc3Npb24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy4kc2NoZWR1bGVUb29sdGlwRm9ySGlkZSA9IHRoaXMuJHNjaGVkdWxlVG9vbHRpcEZvckhpZGUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy4kcHJldmVudE1vdXNlRXZlbnQgPSB0aGlzLiRwcmV2ZW50TW91c2VFdmVudC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIGZvciAodmFyIGV2ZW50IG9mIFtcIm1vdXNlZG93blwiLCBcIm1vdXNldXBcIiwgXCJjbGlja1wiXSkge1xuICAgICAgICAgICAgdGhpcy50b29sdGlwLmdldEVsZW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLiRwcmV2ZW50TW91c2VFdmVudCk7XG4gICAgICAgICAgICB0aGlzLm1vcmVPcHRpb25zLmdldEVsZW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLiRwcmV2ZW50TW91c2VFdmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYSBjb21tYW5kIG9uIHRoZSBjb21tYW5kIGJhciB0b29sdGlwLlxuICAgICAqIFxuICAgICAqIFRoZSBjb21tYW5kcyBhcmUgYWRkZWQgaW4gc2VxdWVudGlhbCBvcmRlci4gSWYgdGhlcmUgaXMgbm90IGVub3VnaCBzcGFjZSBvbiB0aGUgbWFpblxuICAgICAqIHRvb2xiYXIsIHRoZSByZW1haW5pbmcgZWxlbWVudHMgYXJlIGFkZGVkIHRvIHRoZSBvdmVyZmxvdyBtZW51LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSAgICAgICAgICAgIGlkICAgICAgXG4gICAgICogQHBhcmFtIHtUb29sdGlwQ29tbWFuZH0gY29tbWFuZFxuICAgICAqL1xuICAgIHJlZ2lzdGVyQ29tbWFuZChpZCwgY29tbWFuZCkge1xuICAgICAgICB2YXIgcmVnaXN0ZXJGb3JNYWluVG9vbHRpcCA9IE9iamVjdC5rZXlzKHRoaXMuY29tbWFuZHMpLmxlbmd0aCA8IHRoaXMubWF4RWxlbWVudHNPblRvb2x0aXA7XG4gICAgICAgIGlmICghcmVnaXN0ZXJGb3JNYWluVG9vbHRpcCAmJiAhdGhpcy5lbGVtZW50c1tNT1JFX09QVElPTlNfQlVUVE9OX0lEXSkge1xuICAgICAgICAgICAgdGhpcy4kY3JlYXRlQ29tbWFuZChNT1JFX09QVElPTlNfQlVUVE9OX0lELCB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCLCt8K3wrdcIixcbiAgICAgICAgICAgICAgICBleGVjOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2hvdWxkSGlkZU1vcmVPcHRpb25zID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHNldE1vcmVPcHRpb25zVmlzaWJpbGl0eSghdGhpcy5pc01vcmVPcHRpb25zU2hvd24oKSk7XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIixcbiAgICAgICAgICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzTW9yZU9wdGlvbnNTaG93bigpO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRjcmVhdGVDb21tYW5kKGlkLCBjb21tYW5kLCByZWdpc3RlckZvck1haW5Ub29sdGlwKTtcbiAgICAgICAgaWYgKHRoaXMuaXNTaG93bigpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1Nob3duKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLnRvb2x0aXAgJiYgdGhpcy50b29sdGlwLmlzT3BlbjtcbiAgICB9XG5cbiAgICBpc01vcmVPcHRpb25zU2hvd24oKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMubW9yZU9wdGlvbnMgJiYgdGhpcy5tb3JlT3B0aW9ucy5pc09wZW47XG4gICAgfVxuXG4gICAgZ2V0QWx3YXlzU2hvdygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGFsd2F5c1Nob3c7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZGlzcGxheSBtb2RlIG9mIHRoZSB0b29sdGlwXG4gICAgICogXG4gICAgICogV2hlbiB0cnVlLCB0aGUgdG9vbHRpcCBpcyBhbHdheXMgZGlzcGxheWVkIHdoaWxlIGl0IGlzIGF0dGFjaGVkIHRvIGFuIGVkaXRvci5cbiAgICAgKiBXaGVuIGZhbHNlLCB0aGUgdG9vbHRpcCBpcyBkaXNwbGF5ZWQgb25seSB3aGVuIHRoZSBtb3VzZSBob3ZlcnMgb3ZlciB0aGUgYWN0aXZlIGVkaXRvciBsaW5lLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAgICAgKi9cbiAgICBzZXRBbHdheXNTaG93KGFsd2F5c1Nob3cpIHtcbiAgICAgICAgdGhpcy4kYWx3YXlzU2hvdyA9IGFsd2F5c1Nob3c7XG4gICAgICAgIHRoaXMuJHVwZGF0ZU9uSG92ZXJIYW5kbGVycyghdGhpcy4kYWx3YXlzU2hvdyk7XG4gICAgICAgIHRoaXMuX3NpZ25hbChcImFsd2F5c1Nob3dcIiwgdGhpcy4kYWx3YXlzU2hvdyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgdGhlIGNsaWNrYWJsZSBjb21tYW5kIGJhciB0b29sdGlwIHRvIGFuIGVkaXRvclxuICAgICAqIFxuICAgICAqIERlcGVuZGluZyBvbiB0aGUgYWx3YXlzU2hvdyBwYXJhbWV0ZXIgaXQgZWl0aGVyIGRpc3BsYXlzIHRoZSB0b29sdGlwIGltbWVkaWF0ZWx5LFxuICAgICAqIG9yIHN1YnNjcmliZXMgdG8gdGhlIG5lY2Vzc2FyeSBldmVudHMgdG8gZGlzcGxheSB0aGUgdG9vbHRpcCBvbiBob3Zlci5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICovXG4gICAgYXR0YWNoKGVkaXRvcikge1xuICAgICAgICBpZiAoIWVkaXRvciB8fCAodGhpcy5pc1Nob3duKCkgJiYgdGhpcy5lZGl0b3IgPT09IGVkaXRvcikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGV0YWNoKCk7XG5cbiAgICAgICAgdGhpcy5lZGl0b3IgPSBlZGl0b3I7XG4gICAgICAgIHRoaXMuZWRpdG9yLm9uKFwiY2hhbmdlU2Vzc2lvblwiLCB0aGlzLiRvbkVkaXRvckNoYW5nZVNlc3Npb24pO1xuICAgICAgICBpZiAodGhpcy5lZGl0b3Iuc2Vzc2lvbikge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2Vzc2lvbi5vbihcImNoYW5nZVNjcm9sbExlZnRcIiwgdGhpcy4kb25DaGFuZ2VTY3JvbGwpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2Vzc2lvbi5vbihcImNoYW5nZVNjcm9sbFRvcFwiLCB0aGlzLiRvbkNoYW5nZVNjcm9sbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5nZXRBbHdheXNTaG93KCkpIHtcbiAgICAgICAgICAgIHRoaXMuJHNob3dUb29sdGlwKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiR1cGRhdGVPbkhvdmVySGFuZGxlcnModHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgY29tbWFuZCBiYXIgdG9vbHRpcC4gSXQgYWxpZ25zIGl0c2VsZiBhYm92ZSB0aGUgYWN0aXZlIGxpbmUgaW4gdGhlIGVkaXRvci5cbiAgICAgKi9cbiAgICB1cGRhdGVQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZW5kZXJlciA9IHRoaXMuZWRpdG9yLnJlbmRlcmVyO1xuXG4gICAgICAgIHZhciByYW5nZXM7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvci5zZWxlY3Rpb24uZ2V0QWxsUmFuZ2VzKSB7XG4gICAgICAgICAgICByYW5nZXMgPSB0aGlzLmVkaXRvci5zZWxlY3Rpb24uZ2V0QWxsUmFuZ2VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByYW5nZXMgPSBbdGhpcy5lZGl0b3IuZ2V0U2VsZWN0aW9uUmFuZ2UoKV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyYW5nZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1pblBvcyA9IG1pblBvc2l0aW9uKHJhbmdlc1swXS5zdGFydCwgcmFuZ2VzWzBdLmVuZCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCByYW5nZTsgcmFuZ2UgPSByYW5nZXNbaV07IGkrKykge1xuICAgICAgICAgICAgbWluUG9zID0gbWluUG9zaXRpb24obWluUG9zLCBtaW5Qb3NpdGlvbihyYW5nZS5zdGFydCwgcmFuZ2UuZW5kKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcG9zID0gcmVuZGVyZXIuJGN1cnNvckxheWVyLmdldFBpeGVsUG9zaXRpb24obWluUG9zLCB0cnVlKTtcblxuICAgICAgICB2YXIgdG9vbHRpcEVsID0gdGhpcy50b29sdGlwLmdldEVsZW1lbnQoKTtcbiAgICAgICAgdmFyIHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHZhciBzY3JlZW5IZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIHZhciByZWN0ID0gdGhpcy5lZGl0b3IuY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHBvcy50b3AgKz0gcmVjdC50b3AgLSByZW5kZXJlci5sYXllckNvbmZpZy5vZmZzZXQ7XG4gICAgICAgIHBvcy5sZWZ0ICs9IHJlY3QubGVmdCArIHJlbmRlcmVyLmd1dHRlcldpZHRoIC0gcmVuZGVyZXIuc2Nyb2xsTGVmdDtcblxuICAgICAgICB2YXIgY3Vyc29yVmlzaWJsZSA9IHBvcy50b3AgPj0gcmVjdC50b3AgJiYgcG9zLnRvcCA8PSByZWN0LmJvdHRvbSAmJlxuICAgICAgICAgICAgcG9zLmxlZnQgPj0gcmVjdC5sZWZ0ICsgcmVuZGVyZXIuZ3V0dGVyV2lkdGggJiYgcG9zLmxlZnQgPD0gcmVjdC5yaWdodDtcblxuICAgICAgICBpZiAoIWN1cnNvclZpc2libGUgJiYgdGhpcy5pc1Nob3duKCkpIHtcbiAgICAgICAgICAgIHRoaXMuJGhpZGVUb29sdGlwKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoY3Vyc29yVmlzaWJsZSAmJiAhdGhpcy5pc1Nob3duKCkgJiYgdGhpcy5nZXRBbHdheXNTaG93KCkpIHtcbiAgICAgICAgICAgIHRoaXMuJHNob3dUb29sdGlwKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG9wID0gcG9zLnRvcCAtIHRvb2x0aXBFbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIHZhciBsZWZ0ID0gTWF0aC5taW4oc2NyZWVuV2lkdGggLSB0b29sdGlwRWwub2Zmc2V0V2lkdGgsIHBvcy5sZWZ0KTtcblxuICAgICAgICB2YXIgdG9vbHRpcEZpdHMgPSB0b3AgPj0gMCAmJiB0b3AgKyB0b29sdGlwRWwub2Zmc2V0SGVpZ2h0IDw9IHNjcmVlbkhlaWdodCAmJlxuICAgICAgICAgICAgbGVmdCA+PSAwICYmIGxlZnQgKyB0b29sdGlwRWwub2Zmc2V0V2lkdGggPD0gc2NyZWVuV2lkdGg7XG5cbiAgICAgICAgaWYgKCF0b29sdGlwRml0cykge1xuICAgICAgICAgICAgdGhpcy4kaGlkZVRvb2x0aXAoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9vbHRpcC5zZXRQb3NpdGlvbihsZWZ0LCB0b3ApO1xuXG4gICAgICAgIGlmICh0aGlzLmlzTW9yZU9wdGlvbnNTaG93bigpKSB7XG4gICAgICAgICAgICB0b3AgPSB0b3AgKyB0b29sdGlwRWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgbGVmdCA9IHRoaXMuZWxlbWVudHNbTU9SRV9PUFRJT05TX0JVVFRPTl9JRF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICBcbiAgICAgICAgICAgIHZhciBtb3JlT3B0aW9uc0VsID0gdGhpcy5tb3JlT3B0aW9ucy5nZXRFbGVtZW50KCk7XG4gICAgICAgICAgICB2YXIgc2NyZWVuSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICAgICAgaWYgKHRvcCArIG1vcmVPcHRpb25zRWwub2Zmc2V0SGVpZ2h0ID4gc2NyZWVuSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdG9wIC09IHRvb2x0aXBFbC5vZmZzZXRIZWlnaHQgKyBtb3JlT3B0aW9uc0VsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsZWZ0ICsgbW9yZU9wdGlvbnNFbC5vZmZzZXRXaWR0aCA+IHNjcmVlbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgbGVmdCA9IHNjcmVlbldpZHRoIC0gbW9yZU9wdGlvbnNFbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5tb3JlT3B0aW9ucy5zZXRQb3NpdGlvbihsZWZ0LCB0b3ApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBlYWNoIGNvbW1hbmQgZWxlbWVudCBpbiB0aGUgdG9vbHRpcC4gXG4gICAgICogXG4gICAgICogVGhpcyBpcyBhdXRvbWF0aWNhbGx5IGNhbGxlZCBvbiBjZXJ0YWluIGV2ZW50cywgYnV0IGNhbiBiZSBjYWxsZWQgbWFudWFsbHkgYXMgd2VsbC5cbiAgICAgKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZWxlbWVudHMpLmZvckVhY2godGhpcy4kdXBkYXRlRWxlbWVudC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyB0aGUgdG9vbHRpcCBmcm9tIHRoZSBlZGl0b3IuXG4gICAgICovXG4gICAgZGV0YWNoKCkge1xuICAgICAgICB0aGlzLnRvb2x0aXAuaGlkZSgpO1xuICAgICAgICB0aGlzLm1vcmVPcHRpb25zLmhpZGUoKTtcbiAgICAgICAgdGhpcy4kdXBkYXRlT25Ib3ZlckhhbmRsZXJzKGZhbHNlKTtcbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5vZmYoXCJjaGFuZ2VTZXNzaW9uXCIsIHRoaXMuJG9uRWRpdG9yQ2hhbmdlU2Vzc2lvbik7XG4gICAgICAgICAgICBpZiAodGhpcy5lZGl0b3Iuc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNlc3Npb24ub2ZmKFwiY2hhbmdlU2Nyb2xsTGVmdFwiLCB0aGlzLiRvbkNoYW5nZVNjcm9sbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2Vzc2lvbi5vZmYoXCJjaGFuZ2VTY3JvbGxUb3BcIiwgdGhpcy4kb25DaGFuZ2VTY3JvbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJG1vdXNlSW5Ub29sdGlwID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gbnVsbDtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy50b29sdGlwICYmIHRoaXMubW9yZU9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5tb3JlT3B0aW9ucy5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycyA9IHt9O1xuICAgICAgICB0aGlzLmNvbW1hbmRzID0ge307XG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSB7fTtcbiAgICAgICAgdGhpcy50b29sdGlwID0gdGhpcy5tb3JlT3B0aW9ucyA9IHRoaXMucGFyZW50Tm9kZSA9IG51bGw7XG4gICAgfVxuXG4gICAgJGNyZWF0ZUNvbW1hbmQoaWQsIGNvbW1hbmQsIGZvck1haW5Ub29sdGlwKSB7XG4gICAgICAgIHZhciBwYXJlbnRFbCA9IGZvck1haW5Ub29sdGlwID8gdGhpcy50b29sdGlwRWwgOiB0aGlzLm1vcmVPcHRpb25zRWw7XG4gICAgICAgIHZhciBrZXlQYXJ0cyA9IFtdO1xuICAgICAgICB2YXIgYmluZEtleSA9IGNvbW1hbmQuYmluZEtleTtcbiAgICAgICAgaWYgKGJpbmRLZXkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYmluZEtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBiaW5kS2V5ID0gdXNlcmFnZW50LmlzTWFjID8gYmluZEtleS5tYWMgOiBiaW5kS2V5LndpbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJpbmRLZXkgPSBiaW5kS2V5LnNwbGl0KFwifFwiKVswXTtcbiAgICAgICAgICAgIGtleVBhcnRzID0gYmluZEtleS5zcGxpdChcIi1cIik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGtleVBhcnRzID0ga2V5UGFydHMubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIGlmIChrZXlEaXNwbGF5TWFwW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXlEaXNwbGF5TWFwW2tleV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5RGlzcGxheU1hcFtrZXldO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHVzZXJhZ2VudC5pc01hYyAmJiBrZXlEaXNwbGF5TWFwW2tleV0ubWFjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5RGlzcGxheU1hcFtrZXldLm1hYztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYnV0dG9uTm9kZTtcbiAgICAgICAgaWYgKGZvck1haW5Ub29sdGlwICYmIGNvbW1hbmQuaWNvbkNzc0NsYXNzKSB7XG4gICAgICAgICAgICAvL09ubHkgc3VwcG9ydCBpY29uIGJ1dHRvbiBmb3IgbWFpbiB0b29sdGlwLCBvdGhlcndpc2UgZmFsbCBiYWNrIHRvIHRleHQgYnV0dG9uXG4gICAgICAgICAgICBidXR0b25Ob2RlID0gW1xuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBbXCJhY2VfaWNvbl9zdmdcIiwgY29tbWFuZC5pY29uQ3NzQ2xhc3NdLmpvaW4oXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IGNvbW1hbmQubmFtZSArIFwiIChcIiArIGNvbW1hbmQuYmluZEtleSArIFwiKVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ1dHRvbk5vZGUgPSBbXG4gICAgICAgICAgICAgICAgWydkaXYnLCB7IGNsYXNzOiBWQUxVRV9DTEFTU19OQU1FIH1dLFxuICAgICAgICAgICAgICAgIFsnZGl2JywgeyBjbGFzczogQ0FQVElPTl9DTEFTU19OQU1FIH0sIGNvbW1hbmQubmFtZV1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAoa2V5UGFydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgYnV0dG9uTm9kZS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3M6IEtFWUJJTkRJTkdfQ0xBU1NfTkFNRSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5UGFydHMubWFwKGZ1bmN0aW9uKGtleVBhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWydkaXYnLCBrZXlQYXJ0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGRvbS5idWlsZERvbShbJ2RpdicsIHsgY2xhc3M6IFtCVVRUT05fQ0xBU1NfTkFNRSwgY29tbWFuZC5jc3NDbGFzcyB8fCBcIlwiXS5qb2luKFwiIFwiKSwgcmVmOiBpZCB9LCBidXR0b25Ob2RlXSwgcGFyZW50RWwsIHRoaXMuZWxlbWVudHMpO1xuICAgICAgICB0aGlzLmNvbW1hbmRzW2lkXSA9IGNvbW1hbmQ7XG5cbiAgICAgICAgdmFyIGV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lZGl0b3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSW50ZXJuYWwgdmFyaWFibGUgdG8gcHJvcGVybHkgaGFuZGxlIHdoZW4gdGhlIG1vcmUgb3B0aW9ucyBidXR0b24gaXMgY2xpY2tlZFxuICAgICAgICAgICAgdGhpcy4kc2hvdWxkSGlkZU1vcmVPcHRpb25zID0gdGhpcy5pc01vcmVPcHRpb25zU2hvd24oKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5lbGVtZW50c1tpZF0uZGlzYWJsZWQgJiYgY29tbWFuZC5leGVjKSB7XG4gICAgICAgICAgICAgICAgY29tbWFuZC5leGVjKHRoaXMuZWRpdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLiRzaG91bGRIaWRlTW9yZU9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzZXRNb3JlT3B0aW9uc1Zpc2liaWxpdHkoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzW2lkXSA9IGV2ZW50TGlzdGVuZXI7XG4gICAgICAgIHRoaXMuZWxlbWVudHNbaWRdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRMaXN0ZW5lci5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy4kdXBkYXRlRWxlbWVudChpZCk7XG4gICAgfVxuXG4gICAgJHNldE1vcmVPcHRpb25zVmlzaWJpbGl0eSh2aXNpYmxlKSB7XG4gICAgICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm1vcmVPcHRpb25zLnNldFRoZW1lKHRoaXMuZWRpdG9yLnJlbmRlcmVyLnRoZW1lKTtcbiAgICAgICAgICAgIHRoaXMubW9yZU9wdGlvbnMuc2V0Q2xhc3NOYW1lKFRPT0xUSVBfQ0xBU1NfTkFNRSArIFwiX3dyYXBwZXJcIik7XG4gICAgICAgICAgICB0aGlzLm1vcmVPcHRpb25zLnNob3coKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vcmVPcHRpb25zLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICRvbkVkaXRvckNoYW5nZVNlc3Npb24oZSkge1xuICAgICAgICBpZiAoZS5vbGRTZXNzaW9uKSB7XG4gICAgICAgICAgICBlLm9sZFNlc3Npb24ub2ZmKFwiY2hhbmdlU2Nyb2xsVG9wXCIsIHRoaXMuJG9uQ2hhbmdlU2Nyb2xsKTtcbiAgICAgICAgICAgIGUub2xkU2Vzc2lvbi5vZmYoXCJjaGFuZ2VTY3JvbGxMZWZ0XCIsIHRoaXMuJG9uQ2hhbmdlU2Nyb2xsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgIH1cblxuICAgICRvbkNoYW5nZVNjcm9sbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yLnJlbmRlcmVyICYmICh0aGlzLmlzU2hvd24oKSB8fCB0aGlzLmdldEFsd2F5c1Nob3coKSkpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnJlbmRlcmVyLm9uY2UoXCJhZnRlclJlbmRlclwiLCB0aGlzLnVwZGF0ZVBvc2l0aW9uLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJG9uTW91c2VNb3ZlKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuJG1vdXNlSW5Ub29sdGlwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGN1cnNvclBvc2l0aW9uID0gdGhpcy5lZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIGN1cnNvclNjcmVlblBvc2l0aW9uID0gdGhpcy5lZGl0b3IucmVuZGVyZXIudGV4dFRvU2NyZWVuQ29vcmRpbmF0ZXMoY3Vyc29yUG9zaXRpb24ucm93LCBjdXJzb3JQb3NpdGlvbi5jb2x1bW4pO1xuICAgICAgICB2YXIgbGluZUhlaWdodCA9IHRoaXMuZWRpdG9yLnJlbmRlcmVyLmxpbmVIZWlnaHQ7XG4gICAgICAgIFxuICAgICAgICB2YXIgaXNJbkN1cnJlbnRMaW5lID0gZS5jbGllbnRZID49IGN1cnNvclNjcmVlblBvc2l0aW9uLnBhZ2VZICYmIGUuY2xpZW50WSA8IGN1cnNvclNjcmVlblBvc2l0aW9uLnBhZ2VZICsgbGluZUhlaWdodDtcblxuICAgICAgICBpZiAoaXNJbkN1cnJlbnRMaW5lKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNTaG93bigpICYmICF0aGlzLiRzaG93VG9vbHRpcFRpbWVyLmlzUGVuZGluZygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc2hvd1Rvb2x0aXBUaW1lci5kZWxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuJGhpZGVUb29sdGlwVGltZXIuaXNQZW5kaW5nKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRoaWRlVG9vbHRpcFRpbWVyLmNhbmNlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaG93bigpICYmICF0aGlzLiRoaWRlVG9vbHRpcFRpbWVyLmlzUGVuZGluZygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaGlkZVRvb2x0aXBUaW1lci5kZWxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuJHNob3dUb29sdGlwVGltZXIuaXNQZW5kaW5nKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzaG93VG9vbHRpcFRpbWVyLmNhbmNlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgJHByZXZlbnRNb3VzZUV2ZW50KGUpIHtcbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgXG4gICAgJHNjaGVkdWxlVG9vbHRpcEZvckhpZGUoKSB7XG4gICAgICAgIHRoaXMuJG1vdXNlSW5Ub29sdGlwID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJHNob3dUb29sdGlwVGltZXIuY2FuY2VsKCk7XG4gICAgICAgIHRoaXMuJGhpZGVUb29sdGlwVGltZXIuZGVsYXkoKTtcbiAgICB9XG5cbiAgICAkdG9vbHRpcEVudGVyKCkge1xuICAgICAgICB0aGlzLiRtb3VzZUluVG9vbHRpcCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLiRzaG93VG9vbHRpcFRpbWVyLmlzUGVuZGluZygpKSB7XG4gICAgICAgICAgICB0aGlzLiRzaG93VG9vbHRpcFRpbWVyLmNhbmNlbCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLiRoaWRlVG9vbHRpcFRpbWVyLmlzUGVuZGluZygpKSB7XG4gICAgICAgICAgICB0aGlzLiRoaWRlVG9vbHRpcFRpbWVyLmNhbmNlbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJHVwZGF0ZU9uSG92ZXJIYW5kbGVycyhlbmFibGVIb3Zlcikge1xuICAgICAgICB2YXIgdG9vbHRpcEVsID0gdGhpcy50b29sdGlwLmdldEVsZW1lbnQoKTtcbiAgICAgICAgdmFyIG1vcmVPcHRpb25zRWwgPSB0aGlzLm1vcmVPcHRpb25zLmdldEVsZW1lbnQoKTtcbiAgICAgICAgaWYgKGVuYWJsZUhvdmVyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lZGl0b3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5vbihcIm1vdXNlbW92ZVwiLCB0aGlzLiRvbk1vdXNlTW92ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3IucmVuZGVyZXIuZ2V0TW91c2VFdmVudFRhcmdldCgpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCB0aGlzLiRzY2hlZHVsZVRvb2x0aXBGb3JIaWRlLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvb2x0aXBFbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy4kdG9vbHRpcEVudGVyKTtcbiAgICAgICAgICAgIHRvb2x0aXBFbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy4kc2NoZWR1bGVUb29sdGlwRm9ySGlkZSk7XG4gICAgICAgICAgICBtb3JlT3B0aW9uc0VsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLiR0b29sdGlwRW50ZXIpO1xuICAgICAgICAgICAgbW9yZU9wdGlvbnNFbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy4kc2NoZWR1bGVUb29sdGlwRm9ySGlkZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lZGl0b3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5vZmYoXCJtb3VzZW1vdmVcIiwgdGhpcy4kb25Nb3VzZU1vdmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLnJlbmRlcmVyLmdldE1vdXNlRXZlbnRUYXJnZXQoKS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgdGhpcy4kc2NoZWR1bGVUb29sdGlwRm9ySGlkZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b29sdGlwRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuJHRvb2x0aXBFbnRlcik7XG4gICAgICAgICAgICB0b29sdGlwRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuJHNjaGVkdWxlVG9vbHRpcEZvckhpZGUpO1xuICAgICAgICAgICAgbW9yZU9wdGlvbnNFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy4kdG9vbHRpcEVudGVyKTtcbiAgICAgICAgICAgIG1vcmVPcHRpb25zRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuJHNjaGVkdWxlVG9vbHRpcEZvckhpZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJHNob3dUb29sdGlwKCkge1xuICAgICAgICBpZiAodGhpcy5pc1Nob3duKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvb2x0aXAuc2V0VGhlbWUodGhpcy5lZGl0b3IucmVuZGVyZXIudGhlbWUpO1xuICAgICAgICB0aGlzLnRvb2x0aXAuc2V0Q2xhc3NOYW1lKFRPT0xUSVBfQ0xBU1NfTkFNRSArIFwiX3dyYXBwZXJcIik7XG4gICAgICAgIHRoaXMudG9vbHRpcC5zaG93KCk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5fc2lnbmFsKFwic2hvd1wiKTtcbiAgICB9XG4gICAgXG4gICAgJGhpZGVUb29sdGlwKCkge1xuICAgICAgICB0aGlzLiRtb3VzZUluVG9vbHRpcCA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMuaXNTaG93bigpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb3JlT3B0aW9ucy5oaWRlKCk7XG4gICAgICAgIHRoaXMudG9vbHRpcC5oaWRlKCk7XG4gICAgICAgIHRoaXMuX3NpZ25hbChcImhpZGVcIik7XG4gICAgfVxuXG4gICAgJHVwZGF0ZUVsZW1lbnQoaWQpIHtcbiAgICAgICAgdmFyIGNvbW1hbmQgPSB0aGlzLmNvbW1hbmRzW2lkXTtcbiAgICAgICAgaWYgKCFjb21tYW5kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsID0gdGhpcy5lbGVtZW50c1tpZF07XG4gICAgICAgIHZhciBjb21tYW5kRW5hYmxlZCA9IGNvbW1hbmQuZW5hYmxlZDtcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgY29tbWFuZEVuYWJsZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbW1hbmRFbmFibGVkID0gY29tbWFuZEVuYWJsZWQodGhpcy5lZGl0b3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb21tYW5kLmdldFZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBjb21tYW5kLmdldFZhbHVlKHRoaXMuZWRpdG9yKTtcbiAgICAgICAgICAgIGlmIChjb21tYW5kLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgICAgIGVsLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbW1hbmQudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgICAgIHZhciBkb21Dc3NGbiA9IHZhbHVlID8gZG9tLmFkZENzc0NsYXNzIDogZG9tLnJlbW92ZUNzc0NsYXNzO1xuICAgICAgICAgICAgICAgIHZhciBpc09uVG9vbHRpcCA9IGVsLnBhcmVudEVsZW1lbnQgPT09IHRoaXMudG9vbHRpcEVsO1xuICAgICAgICAgICAgICAgIGVsLmFyaWFDaGVja2VkID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKGlzT25Ub29sdGlwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbUNzc0ZuKGVsLCBcImFjZV9zZWxlY3RlZFwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbCA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIuXCIgKyBWQUxVRV9DTEFTU19OQU1FKTtcbiAgICAgICAgICAgICAgICAgICAgZG9tQ3NzRm4oZWwsIFwiYWNlX2NoZWNrbWFya1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tbWFuZEVuYWJsZWQgJiYgZWwuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGRvbS5yZW1vdmVDc3NDbGFzcyhlbCwgXCJhY2VfZGlzYWJsZWRcIik7XG4gICAgICAgICAgICBlbC5hcmlhRGlzYWJsZWQgPSBlbC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoIWNvbW1hbmRFbmFibGVkICYmICFlbC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZG9tLmFkZENzc0NsYXNzKGVsLCBcImFjZV9kaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIGVsLmFyaWFEaXNhYmxlZCA9IGVsLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5vb3AuaW1wbGVtZW50KENvbW1hbmRCYXJUb29sdGlwLnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyKTtcblxuZG9tLmltcG9ydENzc1N0cmluZyhgXG4uYWNlX3Rvb2x0aXAuJHtUT09MVElQX0NMQVNTX05BTUV9X3dyYXBwZXIge1xuICAgIHBhZGRpbmc6IDA7XG59XG5cbi5hY2VfdG9vbHRpcCAuJHtUT09MVElQX0NMQVNTX05BTUV9IHtcbiAgICBwYWRkaW5nOiAxcHggNXB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgcG9pbnRlci1ldmVudHM6IGF1dG87XG59XG5cbi5hY2VfdG9vbHRpcCAuJHtUT09MVElQX0NMQVNTX05BTUV9LnRvb2x0aXBfbW9yZV9vcHRpb25zIHtcbiAgICBwYWRkaW5nOiAxcHg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9IHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgbWFyZ2luOiAxcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIHBhZGRpbmc6IDJweCA1cHg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9LmFjZV9zZWxlY3RlZCxcbmRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfTpob3Zlcjpub3QoLmFjZV9kaXNhYmxlZCkge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9LmFjZV9kaXNhYmxlZCB7XG4gICAgY29sb3I6ICM3Nzc7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbmRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfSAuYWNlX2ljb25fc3ZnIHtcbiAgICBoZWlnaHQ6IDEycHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbn1cblxuZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9LmFjZV9kaXNhYmxlZCAuYWNlX2ljb25fc3ZnIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzc3O1xufVxuXG4uJHtUT09MVElQX0NMQVNTX05BTUV9LnRvb2x0aXBfbW9yZV9vcHRpb25zIC4ke0JVVFRPTl9DTEFTU19OQU1FfSB7XG4gICAgZGlzcGxheTogZmxleDtcbn1cblxuLiR7VE9PTFRJUF9DTEFTU19OQU1FfS4ke1ZBTFVFX0NMQVNTX05BTUV9IHtcbiAgICBkaXNwbGF5OiBub25lO1xufVxuXG4uJHtUT09MVElQX0NMQVNTX05BTUV9LnRvb2x0aXBfbW9yZV9vcHRpb25zIC4ke1ZBTFVFX0NMQVNTX05BTUV9IHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgd2lkdGg6IDEycHg7XG59XG5cbi4ke0NBUFRJT05fQ0xBU1NfTkFNRX0ge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuLiR7S0VZQklORElOR19DTEFTU19OQU1FfSB7XG4gICAgbWFyZ2luOiAwIDJweDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgZm9udC1zaXplOiA4cHg7XG59XG5cbi4ke1RPT0xUSVBfQ0xBU1NfTkFNRX0udG9vbHRpcF9tb3JlX29wdGlvbnMgLiR7S0VZQklORElOR19DTEFTU19OQU1FfSB7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG59XG5cbi4ke0tFWUJJTkRJTkdfQ0xBU1NfTkFNRX0gZGl2IHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgbWluLXdpZHRoOiA4cHg7XG4gICAgcGFkZGluZzogMnB4O1xuICAgIG1hcmdpbjogMCAxcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uYWNlX2RhcmsuYWNlX3Rvb2x0aXAgLiR7VE9PTFRJUF9DTEFTU19OQU1FfSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzM3MzczNztcbiAgICBjb2xvcjogI2VlZTtcbn1cblxuLmFjZV9kYXJrIGRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfS5hY2VfZGlzYWJsZWQge1xuICAgIGNvbG9yOiAjOTc5Nzk3O1xufVxuXG4uYWNlX2RhcmsgZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9LmFjZV9zZWxlY3RlZCxcbi5hY2VfZGFyayBkaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX06aG92ZXI6bm90KC5hY2VfZGlzYWJsZWQpIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG59XG5cbi5hY2VfZGFyayBkaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX0gLmFjZV9pY29uX3N2ZyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbn1cblxuLmFjZV9kYXJrIGRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfS5hY2VfZGlzYWJsZWQgLmFjZV9pY29uX3N2ZyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk3OTc5Nztcbn1cblxuLmFjZV9kYXJrIC4ke0JVVFRPTl9DTEFTU19OQU1FfS5hY2VfZGlzYWJsZWQge1xuICAgIGNvbG9yOiAjOTc5Nzk3O1xufVxuXG4uYWNlX2RhcmsgLiR7S0VZQklORElOR19DTEFTU19OQU1FfSBkaXYge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM1NzU3NTc7XG59XG5cbi5hY2VfY2hlY2ttYXJrOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICfinJMnO1xufVxuYCwgXCJjb21tYW5kYmFyLmNzc1wiLCBmYWxzZSk7XG5cbmV4cG9ydHMuQ29tbWFuZEJhclRvb2x0aXAgPSBDb21tYW5kQmFyVG9vbHRpcDtcbmV4cG9ydHMuVE9PTFRJUF9DTEFTU19OQU1FID0gVE9PTFRJUF9DTEFTU19OQU1FO1xuZXhwb3J0cy5CVVRUT05fQ0xBU1NfTkFNRSA9IEJVVFRPTl9DTEFTU19OQU1FO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBIYXNoSGFuZGxlciA9IHJlcXVpcmUoXCIuLi9rZXlib2FyZC9oYXNoX2hhbmRsZXJcIikuSGFzaEhhbmRsZXI7XG52YXIgQWNlSW5saW5lID0gcmVxdWlyZShcIi4uL2F1dG9jb21wbGV0ZS9pbmxpbmVcIikuQWNlSW5saW5lO1xudmFyIEZpbHRlcmVkTGlzdCA9IHJlcXVpcmUoXCIuLi9hdXRvY29tcGxldGVcIikuRmlsdGVyZWRMaXN0O1xudmFyIENvbXBsZXRpb25Qcm92aWRlciA9IHJlcXVpcmUoXCIuLi9hdXRvY29tcGxldGVcIikuQ29tcGxldGlvblByb3ZpZGVyO1xudmFyIEVkaXRvciA9IHJlcXVpcmUoXCIuLi9lZGl0b3JcIikuRWRpdG9yO1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi4vYXV0b2NvbXBsZXRlL3V0aWxcIik7XG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2xpYi9kb21cIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBDb21tYW5kQmFyVG9vbHRpcCA9IHJlcXVpcmUoXCIuL2NvbW1hbmRfYmFyXCIpLkNvbW1hbmRCYXJUb29sdGlwO1xudmFyIEJVVFRPTl9DTEFTU19OQU1FID0gcmVxdWlyZShcIi4vY29tbWFuZF9iYXJcIikuQlVUVE9OX0NMQVNTX05BTUU7XG5cbnZhciBzbmlwcGV0Q29tcGxldGVyID0gcmVxdWlyZShcIi4vbGFuZ3VhZ2VfdG9vbHNcIikuc25pcHBldENvbXBsZXRlcjtcbnZhciB0ZXh0Q29tcGxldGVyID0gcmVxdWlyZShcIi4vbGFuZ3VhZ2VfdG9vbHNcIikudGV4dENvbXBsZXRlcjtcbnZhciBrZXlXb3JkQ29tcGxldGVyID0gcmVxdWlyZShcIi4vbGFuZ3VhZ2VfdG9vbHNcIikua2V5V29yZENvbXBsZXRlcjtcblxudmFyIGRlc3Ryb3lDb21wbGV0ZXIgPSBmdW5jdGlvbihlLCBlZGl0b3IpIHtcbiAgICBlZGl0b3IuY29tcGxldGVyICYmIGVkaXRvci5jb21wbGV0ZXIuZGVzdHJveSgpO1xufTtcblxuLyoqXG4gKiBUaGlzIGNsYXNzIGNvbnRyb2xzIHRoZSBpbmxpbmUtb25seSBhdXRvY29tcGxldGlvbiBjb21wb25lbnRzIGFuZCB0aGVpciBsaWZlY3ljbGUuXG4gKiBUaGlzIGlzIG1vcmUgbGlnaHR3ZWlnaHQgdGhhbiB0aGUgcG9wdXAtYmFzZWQgYXV0b2NvbXBsZXRpb24sIGFzIGl0IGNhbiBvbmx5IHdvcmsgd2l0aCBleGFjdCBwcmVmaXggbWF0Y2hlcy5cbiAqIFRoZXJlIGlzIGFuIGlubGluZSBnaG9zdCB0ZXh0IHJlbmRlcmVyIGFuZCBhbiBvcHRpb25hbCBjb21tYW5kIGJhciB0b29sdGlwIGluc2lkZS5cbiAqL1xuY2xhc3MgSW5saW5lQXV0b2NvbXBsZXRlIHtcbiAgICBjb25zdHJ1Y3RvcihlZGl0b3IpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBlZGl0b3I7XG4gICAgICAgIHRoaXMua2V5Ym9hcmRIYW5kbGVyID0gbmV3IEhhc2hIYW5kbGVyKHRoaXMuY29tbWFuZHMpO1xuICAgICAgICB0aGlzLiRpbmRleCA9IC0xO1xuXG4gICAgICAgIHRoaXMuYmx1ckxpc3RlbmVyID0gdGhpcy5ibHVyTGlzdGVuZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VMaXN0ZW5lciA9IHRoaXMuY2hhbmdlTGlzdGVuZXIuYmluZCh0aGlzKTtcblxuXG4gICAgICAgIHRoaXMuY2hhbmdlVGltZXIgPSBsYW5nLmRlbGF5ZWRDYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wbGV0aW9ucygpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBcbiAgICBnZXRJbmxpbmVSZW5kZXJlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlubGluZVJlbmRlcmVyKVxuICAgICAgICAgICAgdGhpcy5pbmxpbmVSZW5kZXJlciA9IG5ldyBBY2VJbmxpbmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5saW5lUmVuZGVyZXI7XG4gICAgfVxuXG4gICAgZ2V0SW5saW5lVG9vbHRpcCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlubGluZVRvb2x0aXApIHtcbiAgICAgICAgICAgIHRoaXMuaW5saW5lVG9vbHRpcCA9IElubGluZUF1dG9jb21wbGV0ZS5jcmVhdGVJbmxpbmVUb29sdGlwKGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pbmxpbmVUb29sdGlwO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyB0aGUgZW50cnkgcG9pbnQgdG8gdGhlIGNsYXNzLiBUaGlzIHRyaWdnZXJzIHRoZSBnYXRoZXJpbmcgb2YgdGhlIGF1dG9jb21wbGV0aW9uIGFuZCBkaXNwbGF5aW5nIHRoZSByZXN1bHRzO1xuICAgICAqIEBwYXJhbSB7Q29tcGxldGlvbk9wdGlvbnN9IG9wdGlvbnNcbiAgICAgKi9cbiAgICBzaG93KG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmICh0aGlzLmVkaXRvci5jb21wbGV0ZXIgIT09IHRoaXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVkaXRvci5jb21wbGV0ZXIpXG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3IuY29tcGxldGVyLmRldGFjaCgpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuY29tcGxldGVyID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZWRpdG9yLm9uKFwiY2hhbmdlU2VsZWN0aW9uXCIsIHRoaXMuY2hhbmdlTGlzdGVuZXIpO1xuICAgICAgICB0aGlzLmVkaXRvci5vbihcImJsdXJcIiwgdGhpcy5ibHVyTGlzdGVuZXIpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ29tcGxldGlvbnMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgJG9wZW4oKSB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvci50ZXh0SW5wdXQuc2V0QXJpYU9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnRleHRJbnB1dC5zZXRBcmlhT3B0aW9ucyh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVkaXRvci5rZXlCaW5kaW5nLmFkZEtleWJvYXJkSGFuZGxlcih0aGlzLmtleWJvYXJkSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZ2V0SW5saW5lVG9vbHRpcCgpLmF0dGFjaCh0aGlzLmVkaXRvcik7XG5cbiAgICAgICAgaWYgKHRoaXMuJGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRleCgwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHNob3dDb21wbGV0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2hhbmdlVGltZXIuY2FuY2VsKCk7XG4gICAgfVxuICAgIFxuICAgIGluc2VydE1hdGNoKCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5nZXRDb21wbGV0aW9uUHJvdmlkZXIoKS5pbnNlcnRCeUluZGV4KHRoaXMuZWRpdG9yLCB0aGlzLiRpbmRleCk7XG4gICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgY2hhbmdlTGlzdGVuZXIoZSkge1xuICAgICAgICB2YXIgY3Vyc29yID0gdGhpcy5lZGl0b3Iuc2VsZWN0aW9uLmxlYWQ7XG4gICAgICAgIGlmIChjdXJzb3Iucm93ICE9IHRoaXMuYmFzZS5yb3cgfHwgY3Vyc29yLmNvbHVtbiA8IHRoaXMuYmFzZS5jb2x1bW4pIHtcbiAgICAgICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYWN0aXZhdGVkKVxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUaW1lci5zY2hlZHVsZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgIH1cblxuICAgIGJsdXJMaXN0ZW5lcihlKSB7XG4gICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgfVxuXG4gICAgZ29Ubyh3aGVyZSkge1xuICAgICAgICBpZiAoIXRoaXMuY29tcGxldGlvbnMgfHwgIXRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29tcGxldGlvbkxlbmd0aCA9IHRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWQubGVuZ3RoO1xuICAgICAgICBzd2l0Y2god2hlcmUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgY2FzZSBcInByZXZcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnNldEluZGV4KCh0aGlzLiRpbmRleCAtIDEgKyBjb21wbGV0aW9uTGVuZ3RoKSAlIGNvbXBsZXRpb25MZW5ndGgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5leHRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnNldEluZGV4KCh0aGlzLiRpbmRleCArIDEgKyBjb21wbGV0aW9uTGVuZ3RoKSAlIGNvbXBsZXRpb25MZW5ndGgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImZpcnN0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbmRleCgwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsYXN0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbmRleCh0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TGVuZ3RoKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29tcGxldGlvbnMgfHwgIXRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkLmxlbmd0aDtcbiAgICB9XG5cbiAgICBnZXREYXRhKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA9PSB1bmRlZmluZWQgfHwgaW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkW3RoaXMuJGluZGV4XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkW2luZGV4XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kaW5kZXg7XG4gICAgfVxuXG4gICAgaXNPcGVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kaW5kZXggPj0gMDtcbiAgICB9XG5cbiAgICBzZXRJbmRleCh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuY29tcGxldGlvbnMgfHwgIXRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3SW5kZXggPSBNYXRoLm1heCgtMSwgTWF0aC5taW4odGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZC5sZW5ndGggLSAxLCB2YWx1ZSkpO1xuICAgICAgICBpZiAobmV3SW5kZXggIT09IHRoaXMuJGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLiRpbmRleCA9IG5ld0luZGV4O1xuICAgICAgICAgICAgdGhpcy4kc2hvd0NvbXBsZXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldENvbXBsZXRpb25Qcm92aWRlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBsZXRpb25Qcm92aWRlcilcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGlvblByb3ZpZGVyID0gbmV3IENvbXBsZXRpb25Qcm92aWRlcigpO1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wbGV0aW9uUHJvdmlkZXI7XG4gICAgfVxuXG4gICAgJHNob3dDb21wbGV0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuZ2V0SW5saW5lUmVuZGVyZXIoKS5zaG93KHRoaXMuZWRpdG9yLCB0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkW3RoaXMuJGluZGV4XSwgdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJUZXh0KSkge1xuICAgICAgICAgICAgLy8gTm90IGFibGUgdG8gc2hvdyB0aGUgY29tcGxldGlvbiwgaGlkZSB0aGUgcHJldmlvdXMgb25lXG4gICAgICAgICAgICB0aGlzLmdldElubGluZVJlbmRlcmVyKCkuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlubGluZVRvb2x0aXAgJiYgdGhpcy5pbmxpbmVUb29sdGlwLmlzU2hvd24oKSkge1xuICAgICAgICAgICAgdGhpcy5pbmxpbmVUb29sdGlwLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJHVwZGF0ZVByZWZpeCgpIHtcbiAgICAgICAgdmFyIHBvcyA9IHRoaXMuZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHZhciBwcmVmaXggPSB0aGlzLmVkaXRvci5zZXNzaW9uLmdldFRleHRSYW5nZSh7c3RhcnQ6IHRoaXMuYmFzZSwgZW5kOiBwb3N9KTtcbiAgICAgICAgdGhpcy5jb21wbGV0aW9ucy5zZXRGaWx0ZXIocHJlZml4KTtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldGFjaCgpO1xuICAgICAgICBpZiAodGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZC5sZW5ndGggPT0gMVxuICAgICAgICAmJiB0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkWzBdLnZhbHVlID09IHByZWZpeFxuICAgICAgICAmJiAhdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZFswXS5zbmlwcGV0KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgIHRoaXMuJG9wZW4odGhpcy5lZGl0b3IsIHByZWZpeCk7XG4gICAgICAgIHJldHVybiBwcmVmaXg7XG4gICAgfVxuXG4gICAgdXBkYXRlQ29tcGxldGlvbnMob3B0aW9ucykge1xuICAgICAgICB2YXIgcHJlZml4ID0gXCJcIjtcbiAgICAgICAgXG4gICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMubWF0Y2hlcykge1xuICAgICAgICAgICAgdmFyIHBvcyA9IHRoaXMuZWRpdG9yLmdldFNlbGVjdGlvblJhbmdlKCkuc3RhcnQ7XG4gICAgICAgICAgICB0aGlzLmJhc2UgPSB0aGlzLmVkaXRvci5zZXNzaW9uLmRvYy5jcmVhdGVBbmNob3IocG9zLnJvdywgcG9zLmNvbHVtbik7XG4gICAgICAgICAgICB0aGlzLmJhc2UuJGluc2VydFJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGlvbnMgPSBuZXcgRmlsdGVyZWRMaXN0KG9wdGlvbnMubWF0Y2hlcyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kb3Blbih0aGlzLmVkaXRvciwgXCJcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5iYXNlICYmIHRoaXMuY29tcGxldGlvbnMpIHtcbiAgICAgICAgICAgIHByZWZpeCA9IHRoaXMuJHVwZGF0ZVByZWZpeCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNlc3Npb24gPSB0aGlzLmVkaXRvci5nZXRTZXNzaW9uKCk7XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLmVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICB2YXIgcHJlZml4ID0gdXRpbC5nZXRDb21wbGV0aW9uUHJlZml4KHRoaXMuZWRpdG9yKTtcbiAgICAgICAgdGhpcy5iYXNlID0gc2Vzc2lvbi5kb2MuY3JlYXRlQW5jaG9yKHBvcy5yb3csIHBvcy5jb2x1bW4gLSBwcmVmaXgubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5iYXNlLiRpbnNlcnRSaWdodCA9IHRydWU7XG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgICAgZXhhY3RNYXRjaDogdHJ1ZSxcbiAgICAgICAgICAgIGlnbm9yZUNhcHRpb246IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRDb21wbGV0aW9uUHJvdmlkZXIoKS5wcm92aWRlQ29tcGxldGlvbnModGhpcy5lZGl0b3IsIG9wdGlvbnMsIGZ1bmN0aW9uKGVyciwgY29tcGxldGlvbnMsIGZpbmlzaGVkKSB7XG4gICAgICAgICAgICB2YXIgZmlsdGVyZWQgPSBjb21wbGV0aW9ucy5maWx0ZXJlZDtcbiAgICAgICAgICAgIHZhciBwcmVmaXggPSB1dGlsLmdldENvbXBsZXRpb25QcmVmaXgodGhpcy5lZGl0b3IpO1xuXG4gICAgICAgICAgICBpZiAoZmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBObyByZXN1bHRzXG4gICAgICAgICAgICAgICAgaWYgKCFmaWx0ZXJlZC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRldGFjaCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gT25lIHJlc3VsdCBlcXVhbHMgdG8gdGhlIHByZWZpeFxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGggPT0gMSAmJiBmaWx0ZXJlZFswXS52YWx1ZSA9PSBwcmVmaXggJiYgIWZpbHRlcmVkWzBdLnNuaXBwZXQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRldGFjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb21wbGV0aW9ucyA9IGNvbXBsZXRpb25zO1xuICAgICAgICAgICAgdGhpcy4kb3Blbih0aGlzLmVkaXRvciwgcHJlZml4KTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBkZXRhY2goKSB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iua2V5QmluZGluZy5yZW1vdmVLZXlib2FyZEhhbmRsZXIodGhpcy5rZXlib2FyZEhhbmRsZXIpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iub2ZmKFwiY2hhbmdlU2VsZWN0aW9uXCIsIHRoaXMuY2hhbmdlTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iub2ZmKFwiYmx1clwiLCB0aGlzLmJsdXJMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGFuZ2VUaW1lci5jYW5jZWwoKTtcbiAgICAgICAgaWYgKHRoaXMuaW5saW5lVG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy5pbmxpbmVUb29sdGlwLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNldEluZGV4KC0xKTtcblxuICAgICAgICBpZiAodGhpcy5jb21wbGV0aW9uUHJvdmlkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGlvblByb3ZpZGVyLmRldGFjaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaW5saW5lUmVuZGVyZXIgJiYgdGhpcy5pbmxpbmVSZW5kZXJlci5pc09wZW4oKSkge1xuICAgICAgICAgICAgdGhpcy5pbmxpbmVSZW5kZXJlci5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5iYXNlKVxuICAgICAgICAgICAgdGhpcy5iYXNlLmRldGFjaCgpO1xuICAgICAgICB0aGlzLmFjdGl2YXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbXBsZXRpb25Qcm92aWRlciA9IHRoaXMuY29tcGxldGlvbnMgPSB0aGlzLmJhc2UgPSBudWxsO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgIGlmICh0aGlzLmlubGluZVJlbmRlcmVyKVxuICAgICAgICAgICAgdGhpcy5pbmxpbmVSZW5kZXJlci5kZXN0cm95KCk7XG4gICAgICAgIGlmICh0aGlzLmlubGluZVRvb2x0aXApXG4gICAgICAgICAgICB0aGlzLmlubGluZVRvb2x0aXAuZGVzdHJveSgpO1xuICAgICAgICBpZiAodGhpcy5lZGl0b3IgJiYgdGhpcy5lZGl0b3IuY29tcGxldGVyID09IHRoaXMpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLm9mZihcImRlc3Ryb3lcIiwgZGVzdHJveUNvbXBsZXRlcik7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5jb21wbGV0ZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5saW5lVG9vbHRpcCA9IHRoaXMuZWRpdG9yID0gdGhpcy5pbmxpbmVSZW5kZXJlciA9IG51bGw7XG4gICAgfVxuXG59XG5cbklubGluZUF1dG9jb21wbGV0ZS5wcm90b3R5cGUuY29tbWFuZHMgPSB7XG4gICAgXCJQcmV2aW91c1wiOiB7XG4gICAgICAgIGJpbmRLZXk6IFwiQWx0LVtcIixcbiAgICAgICAgbmFtZTogXCJQcmV2aW91c1wiLFxuICAgICAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgICAgIGVkaXRvci5jb21wbGV0ZXIuZ29UbyhcInByZXZcIik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiTmV4dFwiOiB7XG4gICAgICAgIGJpbmRLZXk6IFwiQWx0LV1cIixcbiAgICAgICAgbmFtZTogXCJOZXh0XCIsXG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgZWRpdG9yLmNvbXBsZXRlci5nb1RvKFwibmV4dFwiKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJBY2NlcHRcIjoge1xuICAgICAgICBiaW5kS2V5OiB7IHdpbjogXCJUYWJ8Q3RybC1SaWdodFwiLCBtYWM6IFwiVGFifENtZC1SaWdodFwiIH0sXG4gICAgICAgIG5hbWU6IFwiQWNjZXB0XCIsXG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVkaXRvci5jb21wbGV0ZXIuaW5zZXJ0TWF0Y2goKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJDbG9zZVwiOiB7XG4gICAgICAgIGJpbmRLZXk6IFwiRXNjXCIsXG4gICAgICAgIG5hbWU6IFwiQ2xvc2VcIixcbiAgICAgICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgICBlZGl0b3IuY29tcGxldGVyLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuSW5saW5lQXV0b2NvbXBsZXRlLmZvciA9IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgIGlmIChlZGl0b3IuY29tcGxldGVyIGluc3RhbmNlb2YgSW5saW5lQXV0b2NvbXBsZXRlKSB7XG4gICAgICAgIHJldHVybiBlZGl0b3IuY29tcGxldGVyO1xuICAgIH1cbiAgICBpZiAoZWRpdG9yLmNvbXBsZXRlcikge1xuICAgICAgICBlZGl0b3IuY29tcGxldGVyLmRlc3Ryb3koKTtcbiAgICAgICAgZWRpdG9yLmNvbXBsZXRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgZWRpdG9yLmNvbXBsZXRlciA9IG5ldyBJbmxpbmVBdXRvY29tcGxldGUoZWRpdG9yKTtcbiAgICBlZGl0b3Iub25jZShcImRlc3Ryb3lcIiwgZGVzdHJveUNvbXBsZXRlcik7XG4gICAgcmV0dXJuIGVkaXRvci5jb21wbGV0ZXI7XG59O1xuXG5JbmxpbmVBdXRvY29tcGxldGUuc3RhcnRDb21tYW5kID0ge1xuICAgIG5hbWU6IFwic3RhcnRJbmxpbmVBdXRvY29tcGxldGVcIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGNvbXBsZXRlciA9IElubGluZUF1dG9jb21wbGV0ZS5mb3IoZWRpdG9yKTtcbiAgICAgICAgY29tcGxldGVyLnNob3cob3B0aW9ucyk7XG4gICAgfSxcbiAgICBiaW5kS2V5OiB7IHdpbjogXCJBbHQtQ1wiLCBtYWM6IFwiT3B0aW9uLUNcIiB9XG59O1xuXG5cbnZhciBjb21wbGV0ZXJzID0gW3NuaXBwZXRDb21wbGV0ZXIsIHRleHRDb21wbGV0ZXIsIGtleVdvcmRDb21wbGV0ZXJdO1xuXG5yZXF1aXJlKFwiLi4vY29uZmlnXCIpLmRlZmluZU9wdGlvbnMoRWRpdG9yLnByb3RvdHlwZSwgXCJlZGl0b3JcIiwge1xuICAgIGVuYWJsZUlubGluZUF1dG9jb21wbGV0aW9uOiB7XG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbXBsZXRlcnMpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVycyA9IEFycmF5LmlzQXJyYXkodmFsKT8gdmFsIDogY29tcGxldGVycztcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLmFkZENvbW1hbmQoSW5saW5lQXV0b2NvbXBsZXRlLnN0YXJ0Q29tbWFuZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZHMucmVtb3ZlQ29tbWFuZChJbmxpbmVBdXRvY29tcGxldGUuc3RhcnRDb21tYW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgfVxufSk7XG5cbi8qKlxuICogRmFjdG9yeSBtZXRob2QgdG8gY3JlYXRlIGEgY29tbWFuZCBiYXIgdG9vbHRpcCBmb3IgaW5saW5lIGF1dG9jb21wbGV0ZS5cbiAqIFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50RWwgIFRoZSBwYXJlbnQgZWxlbWVudCB3aGVyZSB0aGUgdG9vbHRpcCBIVE1MIGVsZW1lbnRzIHdpbGwgYmUgYWRkZWQuXG4gKiBAcmV0dXJucyB7Q29tbWFuZEJhclRvb2x0aXB9ICAgVGhlIGNvbW1hbmQgYmFyIHRvb2x0aXAgZm9yIGlubGluZSBhdXRvY29tcGxldGVcbiAqL1xuSW5saW5lQXV0b2NvbXBsZXRlLmNyZWF0ZUlubGluZVRvb2x0aXAgPSBmdW5jdGlvbihwYXJlbnRFbCkge1xuICAgIHZhciBpbmxpbmVUb29sdGlwID0gbmV3IENvbW1hbmRCYXJUb29sdGlwKHBhcmVudEVsKTtcbiAgICBpbmxpbmVUb29sdGlwLnJlZ2lzdGVyQ29tbWFuZChcIlByZXZpb3VzXCIsIFxuICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBJbmxpbmVBdXRvY29tcGxldGUucHJvdG90eXBlLmNvbW1hbmRzW1wiUHJldmlvdXNcIl0sIHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiBcImFjZV9hcnJvd19yb3RhdGVkXCJcbiAgICAgICAgfSlcbiAgICApO1xuICAgIGlubGluZVRvb2x0aXAucmVnaXN0ZXJDb21tYW5kKFwiUG9zaXRpb25cIiwge1xuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVkaXRvciA/IFtlZGl0b3IuY29tcGxldGVyLmdldEluZGV4KCkgKyAxLCBlZGl0b3IuY29tcGxldGVyLmdldExlbmd0aCgpXS5qb2luKFwiL1wiKSA6IFwiXCI7XG4gICAgICAgIH0sXG4gICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICBjc3NDbGFzczogXCJjb21wbGV0aW9uX3Bvc2l0aW9uXCJcbiAgICB9KTtcbiAgICBpbmxpbmVUb29sdGlwLnJlZ2lzdGVyQ29tbWFuZChcIk5leHRcIiwgXG4gICAgICAgIE9iamVjdC5hc3NpZ24oe30sIElubGluZUF1dG9jb21wbGV0ZS5wcm90b3R5cGUuY29tbWFuZHNbXCJOZXh0XCJdLCB7XG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgIGljb25Dc3NDbGFzczogXCJhY2VfYXJyb3dcIlxuICAgICAgICB9KVxuICAgICk7XG4gICAgaW5saW5lVG9vbHRpcC5yZWdpc3RlckNvbW1hbmQoXCJBY2NlcHRcIiwgXG4gICAgICAgIE9iamVjdC5hc3NpZ24oe30sIElubGluZUF1dG9jb21wbGV0ZS5wcm90b3R5cGUuY29tbWFuZHNbXCJBY2NlcHRcIl0sIHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIWVkaXRvciAmJiBlZGl0b3IuY29tcGxldGVyLmdldEluZGV4KCkgPj0gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiXG4gICAgICAgIH0pXG4gICAgKTtcbiAgICBpbmxpbmVUb29sdGlwLnJlZ2lzdGVyQ29tbWFuZChcIlNob3dUb29sdGlwXCIsIHtcbiAgICAgICAgbmFtZTogXCJBbHdheXMgU2hvdyBUb29sdGlwXCIsXG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaW5saW5lVG9vbHRpcC5zZXRBbHdheXNTaG93KCFpbmxpbmVUb29sdGlwLmdldEFsd2F5c1Nob3coKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmxpbmVUb29sdGlwLmdldEFsd2F5c1Nob3coKTtcbiAgICAgICAgfSxcbiAgICAgICAgdHlwZTogXCJjaGVja2JveFwiXG4gICAgfSk7XG4gICAgcmV0dXJuIGlubGluZVRvb2x0aXA7XG59O1xuXG5kb20uaW1wb3J0Q3NzU3RyaW5nKGBcblxuLmFjZV9pY29uX3N2Zy5hY2VfYXJyb3csXG4uYWNlX2ljb25fc3ZnLmFjZV9hcnJvd19yb3RhdGVkIHtcbiAgICAtd2Via2l0LW1hc2staW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjNhV1IwYUQwaU1UWWlJR2hsYVdkb2REMGlNVFlpSUhacFpYZENiM2c5SWpBZ01DQXhOaUF4TmlJZ1ptbHNiRDBpYm05dVpTSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhjR0YwYUNCbWFXeHNMWEoxYkdVOUltVjJaVzV2WkdRaUlHTnNhWEF0Y25Wc1pUMGlaWFpsYm05a1pDSWdaRDBpVFRVdU9ETTNNREVnTVRWTU5DNDFPRGMxTVNBeE15NDNNVFUxVERFd0xqRTBOamdnT0V3MExqVTROelV4SURJdU1qZzBORFpNTlM0NE16Y3dNU0F4VERFeUxqWTBOalVnT0V3MUxqZ3pOekF4SURFMVdpSWdabWxzYkQwaVlteGhZMnNpTHo0OEwzTjJaejQ9XCIpO1xufVxuXG4uYWNlX2ljb25fc3ZnLmFjZV9hcnJvd19yb3RhdGVkIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xufVxuXG5kaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX0uY29tcGxldGlvbl9wb3NpdGlvbiB7XG4gICAgcGFkZGluZzogMDtcbn1cbmAsIFwiaW5saW5lYXV0b2NvbXBsZXRlLmNzc1wiLCBmYWxzZSk7XG5cbmV4cG9ydHMuSW5saW5lQXV0b2NvbXBsZXRlID0gSW5saW5lQXV0b2NvbXBsZXRlO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9