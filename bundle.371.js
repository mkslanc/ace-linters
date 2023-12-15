(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[371,9700],{

/***/ 19700:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * @typedef {import("../editor").Editor} Editor
 * @typedef {import("../../ace-internal").Ace.TooltipCommand} TooltipCommand
 */
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
    /**
     * @param {HTMLElement} parentNode
     * @param {Partial<import("../../ace-internal").Ace.CommandBarOptions>} [options]
     */
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
     * @param {string} id      
     * @param {TooltipCommand} command
     */
    registerCommand(id, command) {
        var registerForMainTooltip = Object.keys(this.commands).length < this.maxElementsOnTooltip;
        if (!registerForMainTooltip && !this.elements[MORE_OPTIONS_BUTTON_ID]) {
            this.$createCommand(MORE_OPTIONS_BUTTON_ID, {
                name: "···",
                exec: 
                /**
                 * @this {CommandBarTooltip}
                 */
                function() {
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
     * @param {boolean} alwaysShow
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

    /**
     * @param {string} id
     * @param {TooltipCommand} command
     * @param {boolean} forMainTooltip
     */
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

        /**@type {any[]} */
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

        // @ts-ignore
        dom.buildDom(['div', { class: [BUTTON_CLASS_NAME, command.cssClass || ""].join(" "), ref: id }, buttonNode], parentEl, this.elements);
        this.commands[id] = command;
        
        var eventListener =
            /**
             * @this {CommandBarTooltip}
             */
            function(e) {
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

    /**
     * @param {boolean} visible
     */
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

    /**
     * @param {boolean} [enableHover]
     */
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

    /**
     * @param {string} id
     */
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
    /**
     * @param {Editor} editor
     */
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

    /**
     * 
     * @return {AceInline}
     */
    getInlineRenderer() {
        if (!this.inlineRenderer)
            this.inlineRenderer = new AceInline();
        return this.inlineRenderer;
    }

    /**
     * @return {CommandBarTooltip}
     */
    getInlineTooltip() {
        if (!this.inlineTooltip) {
            this.inlineTooltip = InlineAutocomplete.createInlineTooltip(document.body || document.documentElement);
        }
        return this.inlineTooltip;
    }


    /**
     * This function is the entry point to the class. This triggers the gathering of the autocompletion and displaying the results;
     * @param {import("../../ace-internal").Ace.CompletionOptions} options
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

    /**
     * @param {import("../../ace-internal").Ace.InlineAutocompleteAction} where
     */
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

    /**
     * @param {number} [index]
     * @returns {import("../../ace-internal").Ace.Completion | undefined}
     */
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

    /**
     * @param {number} value
     */
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

    /**
     * @return {CompletionProvider}
     */
    getCompletionProvider(initialPosition) {
        if (!this.completionProvider)
            this.completionProvider = new CompletionProvider(initialPosition);
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

    /**
     * @return {any}
     */
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
        //@ts-expect-error TODO: potential wrong arguments
        this.$open(this.editor, prefix);
        return prefix;
    }

    /**
     * @param {import("../../ace-internal").Ace.CompletionOptions} [options]
     */
    updateCompletions(options) {
        var prefix = "";
        
        if (options && options.matches) {
            var pos = this.editor.getSelectionRange().start;
            this.base = this.editor.session.doc.createAnchor(pos.row, pos.column);
            this.base.$insertRight = true;
            this.completions = new FilteredList(options.matches);
            //@ts-expect-error TODO: potential wrong arguments
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

        // @ts-ignore
        var options = {
            exactMatch: true,
            ignoreCaption: true
        };
        this.getCompletionProvider({
            prefix,
            base: this.base,
            pos
            // @ts-ignore
        }).provideCompletions(this.editor, options,
            /**
             * @this {InlineAutocomplete}
             */
            function(err, completions, finished) {
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
                //@ts-expect-error TODO: potential wrong arguments
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

    updateDocTooltip(){
    }

}

/**
 * 
 * @type {{[key: string]: import("../../ace-internal").Ace.Command}}
 */
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
            return /**@type{InlineAutocomplete}*/(editor.completer).insertMatch();
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
        /**
         * @this{Editor}
         * @param val
         */
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
    /**@type {CommandBarTooltip}*/
    var inlineTooltip = new CommandBarTooltip(parentEl);
    inlineTooltip.registerCommand("Previous",
        // @ts-expect-error
        Object.assign({}, InlineAutocomplete.prototype.commands["Previous"], {
            enabled: true,
            type: "button",
            iconCssClass: "ace_arrow_rotated"
        })
    );
    inlineTooltip.registerCommand("Position", {
        enabled: false,
        getValue: function (editor) {
            return editor ? [/**@type{InlineAutocomplete}*/
                (editor.completer).getIndex() + 1, /**@type{InlineAutocomplete}*/(editor.completer).getLength()
            ].join("/") : "";
        },
        type: "text",
        cssClass: "completion_position"
    });
    inlineTooltip.registerCommand("Next",
        // @ts-expect-error
        Object.assign({}, InlineAutocomplete.prototype.commands["Next"], {
            enabled: true,
            type: "button",
            iconCssClass: "ace_arrow"
        })
    );
    inlineTooltip.registerCommand("Accept",
        // @ts-expect-error
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UztBQUNUO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixhQUFhLHFCQUFxQjtBQUNsQztBQUNBO0FBQ0EsY0FBYyxrQkFBa0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxtQkFBbUI7QUFDekQsNERBQTRELG1CQUFtQjtBQUMvRTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxrQkFBa0I7QUFDeEI7QUFDQTtBQUNBOztBQUVBLDBCQUEwQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9jb21tYW5kX2Jhci5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvaW5saW5lX2F1dG9jb21wbGV0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9lZGl0b3JcIikuRWRpdG9yfSBFZGl0b3JcbiAqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLlRvb2x0aXBDb21tYW5kfSBUb29sdGlwQ29tbWFuZFxuICovXG52YXIgVG9vbHRpcCA9IHJlcXVpcmUoXCIuLi90b29sdGlwXCIpLlRvb2x0aXA7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcIi4uL2xpYi9ldmVudF9lbWl0dGVyXCIpLkV2ZW50RW1pdHRlcjtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9saWIvZG9tXCIpO1xudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIHVzZXJhZ2VudCA9IHJlcXVpcmUoXCIuLi9saWIvdXNlcmFnZW50XCIpO1xuXG52YXIgQlVUVE9OX0NMQVNTX05BTUUgPSAnY29tbWFuZF9iYXJfdG9vbHRpcF9idXR0b24nO1xudmFyIFZBTFVFX0NMQVNTX05BTUUgPSAnY29tbWFuZF9iYXJfYnV0dG9uX3ZhbHVlJztcbnZhciBDQVBUSU9OX0NMQVNTX05BTUUgPSAnY29tbWFuZF9iYXJfYnV0dG9uX2NhcHRpb24nO1xudmFyIEtFWUJJTkRJTkdfQ0xBU1NfTkFNRSA9ICdjb21tYW5kX2Jhcl9rZXliaW5kaW5nJztcbnZhciBUT09MVElQX0NMQVNTX05BTUUgPSAnY29tbWFuZF9iYXJfdG9vbHRpcCc7XG52YXIgTU9SRV9PUFRJT05TX0JVVFRPTl9JRCA9ICdNb3JlT3B0aW9uc0J1dHRvbic7XG5cbnZhciBkZWZhdWx0RGVsYXkgPSAxMDA7XG52YXIgZGVmYXVsdE1heEVsZW1lbnRzID0gNDtcblxudmFyIG1pblBvc2l0aW9uID0gZnVuY3Rpb24gKHBvc0EsIHBvc0IpIHtcbiAgICBpZiAocG9zQi5yb3cgPiBwb3NBLnJvdykge1xuICAgICAgICByZXR1cm4gcG9zQTtcbiAgICB9IGVsc2UgaWYgKHBvc0Iucm93ID09PSBwb3NBLnJvdyAmJiBwb3NCLmNvbHVtbiA+IHBvc0EuY29sdW1uKSB7XG4gICAgICAgIHJldHVybiBwb3NBO1xuICAgIH1cbiAgICByZXR1cm4gcG9zQjtcbn07XG5cbnZhciBrZXlEaXNwbGF5TWFwID0ge1xuICAgIFwiQ3RybFwiOiB7IG1hYzogXCJeXCJ9LFxuICAgIFwiT3B0aW9uXCI6IHsgbWFjOiBcIuKMpVwifSxcbiAgICBcIkNvbW1hbmRcIjogeyBtYWM6IFwi4oyYXCJ9LFxuICAgIFwiQ21kXCI6IHsgbWFjOiBcIuKMmFwifSxcbiAgICBcIlNoaWZ0XCI6IFwi4oenXCIsXG4gICAgXCJMZWZ0XCI6IFwi4oaQXCIsXG4gICAgXCJSaWdodFwiOiBcIuKGklwiLFxuICAgIFwiVXBcIjogXCLihpFcIixcbiAgICBcIkRvd25cIjogXCLihpNcIlxufTtcblxuXG4vKipcbiAqIERpc3BsYXlzIGEgY29tbWFuZCB0b29sdGlwIGFib3ZlIHRoZSBjdXJyZW50bHkgYWN0aXZlIGxpbmUgc2VsZWN0aW9uLCB3aXRoIGNsaWNrYWJsZSBlbGVtZW50cy5cbiAqXG4gKiBJbnRlcm5hbGx5IGl0IGlzIGEgY29tcG9zaXRlIG9mIHR3byB0b29sdGlwcywgb25lIGZvciB0aGUgbWFpbiB0b29sdGlwIGFuZCBvbmUgZm9yIHRoZSBcbiAqIG92ZXJmbG93aW5nIGNvbW1hbmRzLlxuICogVGhlIGNvbW1hbmRzIGFyZSBhZGRlZCBzZXF1ZW50aWFsbHkgaW4gcmVnaXN0cmF0aW9uIG9yZGVyLlxuICogV2hlbiBhdHRhY2hlZCB0byBhbiBlZGl0b3IsIGl0IGlzIGVpdGhlciBhbHdheXMgc2hvd24gb3Igb25seSB3aGVuIHRoZSBhY3RpdmUgbGluZSBpcyBob3ZlcmVkXG4gKiB3aXRoIG1vdXNlLCBkZXBlbmRpbmcgb24gdGhlIGFsd2F5c1Nob3cgcHJvcGVydHkuXG4gKi9cbmNsYXNzIENvbW1hbmRCYXJUb29sdGlwIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYXJlbnROb2RlXG4gICAgICogQHBhcmFtIHtQYXJ0aWFsPGltcG9ydChcIi4uLy4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuQ29tbWFuZEJhck9wdGlvbnM+fSBbb3B0aW9uc11cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihwYXJlbnROb2RlLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLnBhcmVudE5vZGUgPSBwYXJlbnROb2RlO1xuICAgICAgICB0aGlzLnRvb2x0aXAgPSBuZXcgVG9vbHRpcCh0aGlzLnBhcmVudE5vZGUpO1xuICAgICAgICB0aGlzLm1vcmVPcHRpb25zID0gbmV3IFRvb2x0aXAodGhpcy5wYXJlbnROb2RlKTtcbiAgICAgICAgdGhpcy5tYXhFbGVtZW50c09uVG9vbHRpcCA9IG9wdGlvbnMubWF4RWxlbWVudHNPblRvb2x0aXAgfHwgZGVmYXVsdE1heEVsZW1lbnRzO1xuICAgICAgICB0aGlzLiRhbHdheXNTaG93ID0gb3B0aW9ucy5hbHdheXNTaG93IHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzID0ge307XG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSB7fTtcbiAgICAgICAgdGhpcy5jb21tYW5kcyA9IHt9O1xuXG4gICAgICAgIHRoaXMudG9vbHRpcEVsID0gZG9tLmJ1aWxkRG9tKFsnZGl2JywgeyBjbGFzczogVE9PTFRJUF9DTEFTU19OQU1FIH1dLCB0aGlzLnRvb2x0aXAuZ2V0RWxlbWVudCgpKTtcbiAgICAgICAgdGhpcy5tb3JlT3B0aW9uc0VsID0gZG9tLmJ1aWxkRG9tKFsnZGl2JywgeyBjbGFzczogVE9PTFRJUF9DTEFTU19OQU1FICsgXCIgdG9vbHRpcF9tb3JlX29wdGlvbnNcIiB9XSwgdGhpcy5tb3JlT3B0aW9ucy5nZXRFbGVtZW50KCkpO1xuXG4gICAgICAgIHRoaXMuJHNob3dUb29sdGlwVGltZXIgPSBsYW5nLmRlbGF5ZWRDYWxsKHRoaXMuJHNob3dUb29sdGlwLmJpbmQodGhpcyksIG9wdGlvbnMuc2hvd0RlbGF5IHx8IGRlZmF1bHREZWxheSk7XG4gICAgICAgIHRoaXMuJGhpZGVUb29sdGlwVGltZXIgPSBsYW5nLmRlbGF5ZWRDYWxsKHRoaXMuJGhpZGVUb29sdGlwLmJpbmQodGhpcyksIG9wdGlvbnMuaGlkZURlbGF5IHx8IGRlZmF1bHREZWxheSk7XG4gICAgICAgIHRoaXMuJHRvb2x0aXBFbnRlciA9IHRoaXMuJHRvb2x0aXBFbnRlci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLiRvbk1vdXNlTW92ZSA9IHRoaXMuJG9uTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuJG9uQ2hhbmdlU2Nyb2xsID0gdGhpcy4kb25DaGFuZ2VTY3JvbGwuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy4kb25FZGl0b3JDaGFuZ2VTZXNzaW9uID0gdGhpcy4kb25FZGl0b3JDaGFuZ2VTZXNzaW9uLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuJHNjaGVkdWxlVG9vbHRpcEZvckhpZGUgPSB0aGlzLiRzY2hlZHVsZVRvb2x0aXBGb3JIaWRlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuJHByZXZlbnRNb3VzZUV2ZW50ID0gdGhpcy4kcHJldmVudE1vdXNlRXZlbnQuYmluZCh0aGlzKTtcblxuICAgICAgICBmb3IgKHZhciBldmVudCBvZiBbXCJtb3VzZWRvd25cIiwgXCJtb3VzZXVwXCIsIFwiY2xpY2tcIl0pIHtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcC5nZXRFbGVtZW50KCkuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy4kcHJldmVudE1vdXNlRXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5tb3JlT3B0aW9ucy5nZXRFbGVtZW50KCkuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy4kcHJldmVudE1vdXNlRXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGEgY29tbWFuZCBvbiB0aGUgY29tbWFuZCBiYXIgdG9vbHRpcC5cbiAgICAgKiBcbiAgICAgKiBUaGUgY29tbWFuZHMgYXJlIGFkZGVkIGluIHNlcXVlbnRpYWwgb3JkZXIuIElmIHRoZXJlIGlzIG5vdCBlbm91Z2ggc3BhY2Ugb24gdGhlIG1haW5cbiAgICAgKiB0b29sYmFyLCB0aGUgcmVtYWluaW5nIGVsZW1lbnRzIGFyZSBhZGRlZCB0byB0aGUgb3ZlcmZsb3cgbWVudS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWQgICAgICBcbiAgICAgKiBAcGFyYW0ge1Rvb2x0aXBDb21tYW5kfSBjb21tYW5kXG4gICAgICovXG4gICAgcmVnaXN0ZXJDb21tYW5kKGlkLCBjb21tYW5kKSB7XG4gICAgICAgIHZhciByZWdpc3RlckZvck1haW5Ub29sdGlwID0gT2JqZWN0LmtleXModGhpcy5jb21tYW5kcykubGVuZ3RoIDwgdGhpcy5tYXhFbGVtZW50c09uVG9vbHRpcDtcbiAgICAgICAgaWYgKCFyZWdpc3RlckZvck1haW5Ub29sdGlwICYmICF0aGlzLmVsZW1lbnRzW01PUkVfT1BUSU9OU19CVVRUT05fSURdKSB7XG4gICAgICAgICAgICB0aGlzLiRjcmVhdGVDb21tYW5kKE1PUkVfT1BUSU9OU19CVVRUT05fSUQsIHtcbiAgICAgICAgICAgICAgICBuYW1lOiBcIsK3wrfCt1wiLFxuICAgICAgICAgICAgICAgIGV4ZWM6IFxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIEB0aGlzIHtDb21tYW5kQmFyVG9vbHRpcH1cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2hvdWxkSGlkZU1vcmVPcHRpb25zID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHNldE1vcmVPcHRpb25zVmlzaWJpbGl0eSghdGhpcy5pc01vcmVPcHRpb25zU2hvd24oKSk7XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIixcbiAgICAgICAgICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmlzTW9yZU9wdGlvbnNTaG93bigpO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICBlbmFibGVkOiB0cnVlXG4gICAgICAgICAgICB9LCB0cnVlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRjcmVhdGVDb21tYW5kKGlkLCBjb21tYW5kLCByZWdpc3RlckZvck1haW5Ub29sdGlwKTtcbiAgICAgICAgaWYgKHRoaXMuaXNTaG93bigpKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1Nob3duKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLnRvb2x0aXAgJiYgdGhpcy50b29sdGlwLmlzT3BlbjtcbiAgICB9XG5cbiAgICBpc01vcmVPcHRpb25zU2hvd24oKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMubW9yZU9wdGlvbnMgJiYgdGhpcy5tb3JlT3B0aW9ucy5pc09wZW47XG4gICAgfVxuXG4gICAgZ2V0QWx3YXlzU2hvdygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGFsd2F5c1Nob3c7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU2V0cyB0aGUgZGlzcGxheSBtb2RlIG9mIHRoZSB0b29sdGlwXG4gICAgICogXG4gICAgICogV2hlbiB0cnVlLCB0aGUgdG9vbHRpcCBpcyBhbHdheXMgZGlzcGxheWVkIHdoaWxlIGl0IGlzIGF0dGFjaGVkIHRvIGFuIGVkaXRvci5cbiAgICAgKiBXaGVuIGZhbHNlLCB0aGUgdG9vbHRpcCBpcyBkaXNwbGF5ZWQgb25seSB3aGVuIHRoZSBtb3VzZSBob3ZlcnMgb3ZlciB0aGUgYWN0aXZlIGVkaXRvciBsaW5lLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYWx3YXlzU2hvd1xuICAgICAqL1xuICAgIHNldEFsd2F5c1Nob3coYWx3YXlzU2hvdykge1xuICAgICAgICB0aGlzLiRhbHdheXNTaG93ID0gYWx3YXlzU2hvdztcbiAgICAgICAgdGhpcy4kdXBkYXRlT25Ib3ZlckhhbmRsZXJzKCF0aGlzLiRhbHdheXNTaG93KTtcbiAgICAgICAgdGhpcy5fc2lnbmFsKFwiYWx3YXlzU2hvd1wiLCB0aGlzLiRhbHdheXNTaG93KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2hlcyB0aGUgY2xpY2thYmxlIGNvbW1hbmQgYmFyIHRvb2x0aXAgdG8gYW4gZWRpdG9yXG4gICAgICogXG4gICAgICogRGVwZW5kaW5nIG9uIHRoZSBhbHdheXNTaG93IHBhcmFtZXRlciBpdCBlaXRoZXIgZGlzcGxheXMgdGhlIHRvb2x0aXAgaW1tZWRpYXRlbHksXG4gICAgICogb3Igc3Vic2NyaWJlcyB0byB0aGUgbmVjZXNzYXJ5IGV2ZW50cyB0byBkaXNwbGF5IHRoZSB0b29sdGlwIG9uIGhvdmVyLlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAgICAgKi9cbiAgICBhdHRhY2goZWRpdG9yKSB7XG4gICAgICAgIGlmICghZWRpdG9yIHx8ICh0aGlzLmlzU2hvd24oKSAmJiB0aGlzLmVkaXRvciA9PT0gZWRpdG9yKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5kZXRhY2goKTtcblxuICAgICAgICB0aGlzLmVkaXRvciA9IGVkaXRvcjtcbiAgICAgICAgdGhpcy5lZGl0b3Iub24oXCJjaGFuZ2VTZXNzaW9uXCIsIHRoaXMuJG9uRWRpdG9yQ2hhbmdlU2Vzc2lvbik7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvci5zZXNzaW9uKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5zZXNzaW9uLm9uKFwiY2hhbmdlU2Nyb2xsTGVmdFwiLCB0aGlzLiRvbkNoYW5nZVNjcm9sbCk7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5zZXNzaW9uLm9uKFwiY2hhbmdlU2Nyb2xsVG9wXCIsIHRoaXMuJG9uQ2hhbmdlU2Nyb2xsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmdldEFsd2F5c1Nob3coKSkge1xuICAgICAgICAgICAgdGhpcy4kc2hvd1Rvb2x0aXAoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHVwZGF0ZU9uSG92ZXJIYW5kbGVycyh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgdGhlIHBvc2l0aW9uIG9mIHRoZSBjb21tYW5kIGJhciB0b29sdGlwLiBJdCBhbGlnbnMgaXRzZWxmIGFib3ZlIHRoZSBhY3RpdmUgbGluZSBpbiB0aGUgZWRpdG9yLlxuICAgICAqL1xuICAgIHVwZGF0ZVBvc2l0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuZWRpdG9yKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlbmRlcmVyID0gdGhpcy5lZGl0b3IucmVuZGVyZXI7XG5cbiAgICAgICAgdmFyIHJhbmdlcztcbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yLnNlbGVjdGlvbi5nZXRBbGxSYW5nZXMpIHtcbiAgICAgICAgICAgIHJhbmdlcyA9IHRoaXMuZWRpdG9yLnNlbGVjdGlvbi5nZXRBbGxSYW5nZXMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJhbmdlcyA9IFt0aGlzLmVkaXRvci5nZXRTZWxlY3Rpb25SYW5nZSgpXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJhbmdlcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbWluUG9zID0gbWluUG9zaXRpb24ocmFuZ2VzWzBdLnN0YXJ0LCByYW5nZXNbMF0uZW5kKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHJhbmdlOyByYW5nZSA9IHJhbmdlc1tpXTsgaSsrKSB7XG4gICAgICAgICAgICBtaW5Qb3MgPSBtaW5Qb3NpdGlvbihtaW5Qb3MsIG1pblBvc2l0aW9uKHJhbmdlLnN0YXJ0LCByYW5nZS5lbmQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwb3MgPSByZW5kZXJlci4kY3Vyc29yTGF5ZXIuZ2V0UGl4ZWxQb3NpdGlvbihtaW5Qb3MsIHRydWUpO1xuXG4gICAgICAgIHZhciB0b29sdGlwRWwgPSB0aGlzLnRvb2x0aXAuZ2V0RWxlbWVudCgpO1xuICAgICAgICB2YXIgc2NyZWVuV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdmFyIHNjcmVlbkhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLmVkaXRvci5jb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgcG9zLnRvcCArPSByZWN0LnRvcCAtIHJlbmRlcmVyLmxheWVyQ29uZmlnLm9mZnNldDtcbiAgICAgICAgcG9zLmxlZnQgKz0gcmVjdC5sZWZ0ICsgcmVuZGVyZXIuZ3V0dGVyV2lkdGggLSByZW5kZXJlci5zY3JvbGxMZWZ0O1xuXG4gICAgICAgIHZhciBjdXJzb3JWaXNpYmxlID0gcG9zLnRvcCA+PSByZWN0LnRvcCAmJiBwb3MudG9wIDw9IHJlY3QuYm90dG9tICYmXG4gICAgICAgICAgICBwb3MubGVmdCA+PSByZWN0LmxlZnQgKyByZW5kZXJlci5ndXR0ZXJXaWR0aCAmJiBwb3MubGVmdCA8PSByZWN0LnJpZ2h0O1xuXG4gICAgICAgIGlmICghY3Vyc29yVmlzaWJsZSAmJiB0aGlzLmlzU2hvd24oKSkge1xuICAgICAgICAgICAgdGhpcy4kaGlkZVRvb2x0aXAoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJzb3JWaXNpYmxlICYmICF0aGlzLmlzU2hvd24oKSAmJiB0aGlzLmdldEFsd2F5c1Nob3coKSkge1xuICAgICAgICAgICAgdGhpcy4kc2hvd1Rvb2x0aXAoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciB0b3AgPSBwb3MudG9wIC0gdG9vbHRpcEVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgdmFyIGxlZnQgPSBNYXRoLm1pbihzY3JlZW5XaWR0aCAtIHRvb2x0aXBFbC5vZmZzZXRXaWR0aCwgcG9zLmxlZnQpO1xuXG4gICAgICAgIHZhciB0b29sdGlwRml0cyA9IHRvcCA+PSAwICYmIHRvcCArIHRvb2x0aXBFbC5vZmZzZXRIZWlnaHQgPD0gc2NyZWVuSGVpZ2h0ICYmXG4gICAgICAgICAgICBsZWZ0ID49IDAgJiYgbGVmdCArIHRvb2x0aXBFbC5vZmZzZXRXaWR0aCA8PSBzY3JlZW5XaWR0aDtcblxuICAgICAgICBpZiAoIXRvb2x0aXBGaXRzKSB7XG4gICAgICAgICAgICB0aGlzLiRoaWRlVG9vbHRpcCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b29sdGlwLnNldFBvc2l0aW9uKGxlZnQsIHRvcCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNNb3JlT3B0aW9uc1Nob3duKCkpIHtcbiAgICAgICAgICAgIHRvcCA9IHRvcCArIHRvb2x0aXBFbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICBsZWZ0ID0gdGhpcy5lbGVtZW50c1tNT1JFX09QVElPTlNfQlVUVE9OX0lEXS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0O1xuICAgIFxuICAgICAgICAgICAgdmFyIG1vcmVPcHRpb25zRWwgPSB0aGlzLm1vcmVPcHRpb25zLmdldEVsZW1lbnQoKTtcbiAgICAgICAgICAgIHZhciBzY3JlZW5IZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgICAgICBpZiAodG9wICsgbW9yZU9wdGlvbnNFbC5vZmZzZXRIZWlnaHQgPiBzY3JlZW5IZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB0b3AgLT0gdG9vbHRpcEVsLm9mZnNldEhlaWdodCArIG1vcmVPcHRpb25zRWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxlZnQgKyBtb3JlT3B0aW9uc0VsLm9mZnNldFdpZHRoID4gc2NyZWVuV2lkdGgpIHtcbiAgICAgICAgICAgICAgICBsZWZ0ID0gc2NyZWVuV2lkdGggLSBtb3JlT3B0aW9uc0VsLm9mZnNldFdpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgICAgICB0aGlzLm1vcmVPcHRpb25zLnNldFBvc2l0aW9uKGxlZnQsIHRvcCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIGVhY2ggY29tbWFuZCBlbGVtZW50IGluIHRoZSB0b29sdGlwLiBcbiAgICAgKiBcbiAgICAgKiBUaGlzIGlzIGF1dG9tYXRpY2FsbHkgY2FsbGVkIG9uIGNlcnRhaW4gZXZlbnRzLCBidXQgY2FuIGJlIGNhbGxlZCBtYW51YWxseSBhcyB3ZWxsLlxuICAgICAqL1xuICAgIHVwZGF0ZSgpIHtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5lbGVtZW50cykuZm9yRWFjaCh0aGlzLiR1cGRhdGVFbGVtZW50LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGFjaGVzIHRoZSB0b29sdGlwIGZyb20gdGhlIGVkaXRvci5cbiAgICAgKi9cbiAgICBkZXRhY2goKSB7XG4gICAgICAgIHRoaXMudG9vbHRpcC5oaWRlKCk7XG4gICAgICAgIHRoaXMubW9yZU9wdGlvbnMuaGlkZSgpO1xuICAgICAgICB0aGlzLiR1cGRhdGVPbkhvdmVySGFuZGxlcnMoZmFsc2UpO1xuICAgICAgICBpZiAodGhpcy5lZGl0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLm9mZihcImNoYW5nZVNlc3Npb25cIiwgdGhpcy4kb25FZGl0b3JDaGFuZ2VTZXNzaW9uKTtcbiAgICAgICAgICAgIGlmICh0aGlzLmVkaXRvci5zZXNzaW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2Vzc2lvbi5vZmYoXCJjaGFuZ2VTY3JvbGxMZWZ0XCIsIHRoaXMuJG9uQ2hhbmdlU2Nyb2xsKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5zZXNzaW9uLm9mZihcImNoYW5nZVNjcm9sbFRvcFwiLCB0aGlzLiRvbkNoYW5nZVNjcm9sbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kbW91c2VJblRvb2x0aXAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBudWxsO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnRvb2x0aXAgJiYgdGhpcy5tb3JlT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcC5kZXN0cm95KCk7XG4gICAgICAgICAgICB0aGlzLm1vcmVPcHRpb25zLmRlc3Ryb3koKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzID0ge307XG4gICAgICAgIHRoaXMuY29tbWFuZHMgPSB7fTtcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IHt9O1xuICAgICAgICB0aGlzLnRvb2x0aXAgPSB0aGlzLm1vcmVPcHRpb25zID0gdGhpcy5wYXJlbnROb2RlID0gbnVsbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgKiBAcGFyYW0ge1Rvb2x0aXBDb21tYW5kfSBjb21tYW5kXG4gICAgICogQHBhcmFtIHtib29sZWFufSBmb3JNYWluVG9vbHRpcFxuICAgICAqL1xuICAgICRjcmVhdGVDb21tYW5kKGlkLCBjb21tYW5kLCBmb3JNYWluVG9vbHRpcCkge1xuICAgICAgICB2YXIgcGFyZW50RWwgPSBmb3JNYWluVG9vbHRpcCA/IHRoaXMudG9vbHRpcEVsIDogdGhpcy5tb3JlT3B0aW9uc0VsO1xuICAgICAgICB2YXIga2V5UGFydHMgPSBbXTtcbiAgICAgICAgdmFyIGJpbmRLZXkgPSBjb21tYW5kLmJpbmRLZXk7XG4gICAgICAgIGlmIChiaW5kS2V5KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGJpbmRLZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgYmluZEtleSA9IHVzZXJhZ2VudC5pc01hYyA/IGJpbmRLZXkubWFjIDogYmluZEtleS53aW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiaW5kS2V5ID0gYmluZEtleS5zcGxpdChcInxcIilbMF07XG4gICAgICAgICAgICBrZXlQYXJ0cyA9IGJpbmRLZXkuc3BsaXQoXCItXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBrZXlQYXJ0cyA9IGtleVBhcnRzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5RGlzcGxheU1hcFtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5RGlzcGxheU1hcFtrZXldID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleURpc3BsYXlNYXBba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1c2VyYWdlbnQuaXNNYWMgJiYga2V5RGlzcGxheU1hcFtrZXldLm1hYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleURpc3BsYXlNYXBba2V5XS5tYWM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqQHR5cGUge2FueVtdfSAqL1xuICAgICAgICB2YXIgYnV0dG9uTm9kZTtcbiAgICAgICAgaWYgKGZvck1haW5Ub29sdGlwICYmIGNvbW1hbmQuaWNvbkNzc0NsYXNzKSB7XG4gICAgICAgICAgICAvL09ubHkgc3VwcG9ydCBpY29uIGJ1dHRvbiBmb3IgbWFpbiB0b29sdGlwLCBvdGhlcndpc2UgZmFsbCBiYWNrIHRvIHRleHQgYnV0dG9uXG4gICAgICAgICAgICBidXR0b25Ob2RlID0gW1xuICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgIGNsYXNzOiBbXCJhY2VfaWNvbl9zdmdcIiwgY29tbWFuZC5pY29uQ3NzQ2xhc3NdLmpvaW4oXCIgXCIpLFxuICAgICAgICAgICAgICAgICAgICAgXCJhcmlhLWxhYmVsXCI6IGNvbW1hbmQubmFtZSArIFwiIChcIiArIGNvbW1hbmQuYmluZEtleSArIFwiKVwiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ1dHRvbk5vZGUgPSBbXG4gICAgICAgICAgICAgICAgWydkaXYnLCB7IGNsYXNzOiBWQUxVRV9DTEFTU19OQU1FIH1dLFxuICAgICAgICAgICAgICAgIFsnZGl2JywgeyBjbGFzczogQ0FQVElPTl9DTEFTU19OQU1FIH0sIGNvbW1hbmQubmFtZV1cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICBpZiAoa2V5UGFydHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgYnV0dG9uTm9kZS5wdXNoKFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgY2xhc3M6IEtFWUJJTkRJTkdfQ0xBU1NfTkFNRSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAga2V5UGFydHMubWFwKGZ1bmN0aW9uKGtleVBhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWydkaXYnLCBrZXlQYXJ0XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxuICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgZG9tLmJ1aWxkRG9tKFsnZGl2JywgeyBjbGFzczogW0JVVFRPTl9DTEFTU19OQU1FLCBjb21tYW5kLmNzc0NsYXNzIHx8IFwiXCJdLmpvaW4oXCIgXCIpLCByZWY6IGlkIH0sIGJ1dHRvbk5vZGVdLCBwYXJlbnRFbCwgdGhpcy5lbGVtZW50cyk7XG4gICAgICAgIHRoaXMuY29tbWFuZHNbaWRdID0gY29tbWFuZDtcbiAgICAgICAgXG4gICAgICAgIHZhciBldmVudExpc3RlbmVyID1cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHRoaXMge0NvbW1hbmRCYXJUb29sdGlwfVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lZGl0b3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gSW50ZXJuYWwgdmFyaWFibGUgdG8gcHJvcGVybHkgaGFuZGxlIHdoZW4gdGhlIG1vcmUgb3B0aW9ucyBidXR0b24gaXMgY2xpY2tlZFxuICAgICAgICAgICAgdGhpcy4kc2hvdWxkSGlkZU1vcmVPcHRpb25zID0gdGhpcy5pc01vcmVPcHRpb25zU2hvd24oKTtcbiAgICAgICAgICAgIGlmICghdGhpcy5lbGVtZW50c1tpZF0uZGlzYWJsZWQgJiYgY29tbWFuZC5leGVjKSB7XG4gICAgICAgICAgICAgICAgY29tbWFuZC5leGVjKHRoaXMuZWRpdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLiRzaG91bGRIaWRlTW9yZU9wdGlvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzZXRNb3JlT3B0aW9uc1Zpc2liaWxpdHkoZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzW2lkXSA9IGV2ZW50TGlzdGVuZXI7XG4gICAgICAgIHRoaXMuZWxlbWVudHNbaWRdLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXZlbnRMaXN0ZW5lci5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy4kdXBkYXRlRWxlbWVudChpZCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtib29sZWFufSB2aXNpYmxlXG4gICAgICovXG4gICAgJHNldE1vcmVPcHRpb25zVmlzaWJpbGl0eSh2aXNpYmxlKSB7XG4gICAgICAgIGlmICh2aXNpYmxlKSB7XG4gICAgICAgICAgICB0aGlzLm1vcmVPcHRpb25zLnNldFRoZW1lKHRoaXMuZWRpdG9yLnJlbmRlcmVyLnRoZW1lKTtcbiAgICAgICAgICAgIHRoaXMubW9yZU9wdGlvbnMuc2V0Q2xhc3NOYW1lKFRPT0xUSVBfQ0xBU1NfTkFNRSArIFwiX3dyYXBwZXJcIik7XG4gICAgICAgICAgICB0aGlzLm1vcmVPcHRpb25zLnNob3coKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1vcmVPcHRpb25zLmhpZGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICRvbkVkaXRvckNoYW5nZVNlc3Npb24oZSkge1xuICAgICAgICBpZiAoZS5vbGRTZXNzaW9uKSB7XG4gICAgICAgICAgICBlLm9sZFNlc3Npb24ub2ZmKFwiY2hhbmdlU2Nyb2xsVG9wXCIsIHRoaXMuJG9uQ2hhbmdlU2Nyb2xsKTtcbiAgICAgICAgICAgIGUub2xkU2Vzc2lvbi5vZmYoXCJjaGFuZ2VTY3JvbGxMZWZ0XCIsIHRoaXMuJG9uQ2hhbmdlU2Nyb2xsKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgIH1cblxuICAgICRvbkNoYW5nZVNjcm9sbCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yLnJlbmRlcmVyICYmICh0aGlzLmlzU2hvd24oKSB8fCB0aGlzLmdldEFsd2F5c1Nob3coKSkpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnJlbmRlcmVyLm9uY2UoXCJhZnRlclJlbmRlclwiLCB0aGlzLnVwZGF0ZVBvc2l0aW9uLmJpbmQodGhpcykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJG9uTW91c2VNb3ZlKGUpIHtcbiAgICAgICAgaWYgKHRoaXMuJG1vdXNlSW5Ub29sdGlwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGN1cnNvclBvc2l0aW9uID0gdGhpcy5lZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIGN1cnNvclNjcmVlblBvc2l0aW9uID0gdGhpcy5lZGl0b3IucmVuZGVyZXIudGV4dFRvU2NyZWVuQ29vcmRpbmF0ZXMoY3Vyc29yUG9zaXRpb24ucm93LCBjdXJzb3JQb3NpdGlvbi5jb2x1bW4pO1xuICAgICAgICB2YXIgbGluZUhlaWdodCA9IHRoaXMuZWRpdG9yLnJlbmRlcmVyLmxpbmVIZWlnaHQ7XG4gICAgICAgIFxuICAgICAgICB2YXIgaXNJbkN1cnJlbnRMaW5lID0gZS5jbGllbnRZID49IGN1cnNvclNjcmVlblBvc2l0aW9uLnBhZ2VZICYmIGUuY2xpZW50WSA8IGN1cnNvclNjcmVlblBvc2l0aW9uLnBhZ2VZICsgbGluZUhlaWdodDtcblxuICAgICAgICBpZiAoaXNJbkN1cnJlbnRMaW5lKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNTaG93bigpICYmICF0aGlzLiRzaG93VG9vbHRpcFRpbWVyLmlzUGVuZGluZygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc2hvd1Rvb2x0aXBUaW1lci5kZWxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuJGhpZGVUb29sdGlwVGltZXIuaXNQZW5kaW5nKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRoaWRlVG9vbHRpcFRpbWVyLmNhbmNlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTaG93bigpICYmICF0aGlzLiRoaWRlVG9vbHRpcFRpbWVyLmlzUGVuZGluZygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaGlkZVRvb2x0aXBUaW1lci5kZWxheSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuJHNob3dUb29sdGlwVGltZXIuaXNQZW5kaW5nKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzaG93VG9vbHRpcFRpbWVyLmNhbmNlbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgJHByZXZlbnRNb3VzZUV2ZW50KGUpIHtcbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgXG4gICAgJHNjaGVkdWxlVG9vbHRpcEZvckhpZGUoKSB7XG4gICAgICAgIHRoaXMuJG1vdXNlSW5Ub29sdGlwID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJHNob3dUb29sdGlwVGltZXIuY2FuY2VsKCk7XG4gICAgICAgIHRoaXMuJGhpZGVUb29sdGlwVGltZXIuZGVsYXkoKTtcbiAgICB9XG5cbiAgICAkdG9vbHRpcEVudGVyKCkge1xuICAgICAgICB0aGlzLiRtb3VzZUluVG9vbHRpcCA9IHRydWU7XG4gICAgICAgIGlmICh0aGlzLiRzaG93VG9vbHRpcFRpbWVyLmlzUGVuZGluZygpKSB7XG4gICAgICAgICAgICB0aGlzLiRzaG93VG9vbHRpcFRpbWVyLmNhbmNlbCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLiRoaWRlVG9vbHRpcFRpbWVyLmlzUGVuZGluZygpKSB7XG4gICAgICAgICAgICB0aGlzLiRoaWRlVG9vbHRpcFRpbWVyLmNhbmNlbCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbZW5hYmxlSG92ZXJdXG4gICAgICovXG4gICAgJHVwZGF0ZU9uSG92ZXJIYW5kbGVycyhlbmFibGVIb3Zlcikge1xuICAgICAgICB2YXIgdG9vbHRpcEVsID0gdGhpcy50b29sdGlwLmdldEVsZW1lbnQoKTtcbiAgICAgICAgdmFyIG1vcmVPcHRpb25zRWwgPSB0aGlzLm1vcmVPcHRpb25zLmdldEVsZW1lbnQoKTtcbiAgICAgICAgaWYgKGVuYWJsZUhvdmVyKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lZGl0b3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5vbihcIm1vdXNlbW92ZVwiLCB0aGlzLiRvbk1vdXNlTW92ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3IucmVuZGVyZXIuZ2V0TW91c2VFdmVudFRhcmdldCgpLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCB0aGlzLiRzY2hlZHVsZVRvb2x0aXBGb3JIaWRlLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvb2x0aXBFbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy4kdG9vbHRpcEVudGVyKTtcbiAgICAgICAgICAgIHRvb2x0aXBFbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy4kc2NoZWR1bGVUb29sdGlwRm9ySGlkZSk7XG4gICAgICAgICAgICBtb3JlT3B0aW9uc0VsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLiR0b29sdGlwRW50ZXIpO1xuICAgICAgICAgICAgbW9yZU9wdGlvbnNFbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy4kc2NoZWR1bGVUb29sdGlwRm9ySGlkZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lZGl0b3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5vZmYoXCJtb3VzZW1vdmVcIiwgdGhpcy4kb25Nb3VzZU1vdmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLnJlbmRlcmVyLmdldE1vdXNlRXZlbnRUYXJnZXQoKS5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgdGhpcy4kc2NoZWR1bGVUb29sdGlwRm9ySGlkZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b29sdGlwRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuJHRvb2x0aXBFbnRlcik7XG4gICAgICAgICAgICB0b29sdGlwRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuJHNjaGVkdWxlVG9vbHRpcEZvckhpZGUpO1xuICAgICAgICAgICAgbW9yZU9wdGlvbnNFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy4kdG9vbHRpcEVudGVyKTtcbiAgICAgICAgICAgIG1vcmVPcHRpb25zRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuJHNjaGVkdWxlVG9vbHRpcEZvckhpZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJHNob3dUb29sdGlwKCkge1xuICAgICAgICBpZiAodGhpcy5pc1Nob3duKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRvb2x0aXAuc2V0VGhlbWUodGhpcy5lZGl0b3IucmVuZGVyZXIudGhlbWUpO1xuICAgICAgICB0aGlzLnRvb2x0aXAuc2V0Q2xhc3NOYW1lKFRPT0xUSVBfQ0xBU1NfTkFNRSArIFwiX3dyYXBwZXJcIik7XG4gICAgICAgIHRoaXMudG9vbHRpcC5zaG93KCk7XG4gICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgICAgdGhpcy5fc2lnbmFsKFwic2hvd1wiKTtcbiAgICB9XG4gICAgJGhpZGVUb29sdGlwKCkge1xuICAgICAgICB0aGlzLiRtb3VzZUluVG9vbHRpcCA9IGZhbHNlO1xuICAgICAgICBpZiAoIXRoaXMuaXNTaG93bigpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tb3JlT3B0aW9ucy5oaWRlKCk7XG4gICAgICAgIHRoaXMudG9vbHRpcC5oaWRlKCk7XG4gICAgICAgIHRoaXMuX3NpZ25hbChcImhpZGVcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICovXG4gICAgJHVwZGF0ZUVsZW1lbnQoaWQpIHtcbiAgICAgICAgdmFyIGNvbW1hbmQgPSB0aGlzLmNvbW1hbmRzW2lkXTtcbiAgICAgICAgaWYgKCFjb21tYW5kKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGVsID0gdGhpcy5lbGVtZW50c1tpZF07XG4gICAgICAgIHZhciBjb21tYW5kRW5hYmxlZCA9IGNvbW1hbmQuZW5hYmxlZDtcbiAgICAgICAgXG4gICAgICAgIGlmICh0eXBlb2YgY29tbWFuZEVuYWJsZWQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbW1hbmRFbmFibGVkID0gY29tbWFuZEVuYWJsZWQodGhpcy5lZGl0b3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiBjb21tYW5kLmdldFZhbHVlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBjb21tYW5kLmdldFZhbHVlKHRoaXMuZWRpdG9yKTtcbiAgICAgICAgICAgIGlmIChjb21tYW5kLnR5cGUgPT09ICd0ZXh0Jykge1xuICAgICAgICAgICAgICAgIGVsLnRleHRDb250ZW50ID0gdmFsdWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGNvbW1hbmQudHlwZSA9PT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgICAgICAgIHZhciBkb21Dc3NGbiA9IHZhbHVlID8gZG9tLmFkZENzc0NsYXNzIDogZG9tLnJlbW92ZUNzc0NsYXNzO1xuICAgICAgICAgICAgICAgIHZhciBpc09uVG9vbHRpcCA9IGVsLnBhcmVudEVsZW1lbnQgPT09IHRoaXMudG9vbHRpcEVsO1xuICAgICAgICAgICAgICAgIGVsLmFyaWFDaGVja2VkID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKGlzT25Ub29sdGlwKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbUNzc0ZuKGVsLCBcImFjZV9zZWxlY3RlZFwiKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbCA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIuXCIgKyBWQUxVRV9DTEFTU19OQU1FKTtcbiAgICAgICAgICAgICAgICAgICAgZG9tQ3NzRm4oZWwsIFwiYWNlX2NoZWNrbWFya1wiKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29tbWFuZEVuYWJsZWQgJiYgZWwuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGRvbS5yZW1vdmVDc3NDbGFzcyhlbCwgXCJhY2VfZGlzYWJsZWRcIik7XG4gICAgICAgICAgICBlbC5hcmlhRGlzYWJsZWQgPSBlbC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKFwiZGlzYWJsZWRcIik7XG4gICAgICAgIH0gZWxzZSBpZiAoIWNvbW1hbmRFbmFibGVkICYmICFlbC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZG9tLmFkZENzc0NsYXNzKGVsLCBcImFjZV9kaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIGVsLmFyaWFEaXNhYmxlZCA9IGVsLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZShcImRpc2FibGVkXCIsIFwiXCIpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5vb3AuaW1wbGVtZW50KENvbW1hbmRCYXJUb29sdGlwLnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyKTtcblxuZG9tLmltcG9ydENzc1N0cmluZyhgXG4uYWNlX3Rvb2x0aXAuJHtUT09MVElQX0NMQVNTX05BTUV9X3dyYXBwZXIge1xuICAgIHBhZGRpbmc6IDA7XG59XG5cbi5hY2VfdG9vbHRpcCAuJHtUT09MVElQX0NMQVNTX05BTUV9IHtcbiAgICBwYWRkaW5nOiAxcHggNXB4O1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgcG9pbnRlci1ldmVudHM6IGF1dG87XG59XG5cbi5hY2VfdG9vbHRpcCAuJHtUT09MVElQX0NMQVNTX05BTUV9LnRvb2x0aXBfbW9yZV9vcHRpb25zIHtcbiAgICBwYWRkaW5nOiAxcHg7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9IHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBjdXJzb3I6IHBvaW50ZXI7XG4gICAgbWFyZ2luOiAxcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIHBhZGRpbmc6IDJweCA1cHg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9LmFjZV9zZWxlY3RlZCxcbmRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfTpob3Zlcjpub3QoLmFjZV9kaXNhYmxlZCkge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4xKTtcbn1cblxuZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9LmFjZV9kaXNhYmxlZCB7XG4gICAgY29sb3I6ICM3Nzc7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbmRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfSAuYWNlX2ljb25fc3ZnIHtcbiAgICBoZWlnaHQ6IDEycHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzAwMDtcbn1cblxuZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9LmFjZV9kaXNhYmxlZCAuYWNlX2ljb25fc3ZnIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNzc3O1xufVxuXG4uJHtUT09MVElQX0NMQVNTX05BTUV9LnRvb2x0aXBfbW9yZV9vcHRpb25zIC4ke0JVVFRPTl9DTEFTU19OQU1FfSB7XG4gICAgZGlzcGxheTogZmxleDtcbn1cblxuLiR7VE9PTFRJUF9DTEFTU19OQU1FfS4ke1ZBTFVFX0NMQVNTX05BTUV9IHtcbiAgICBkaXNwbGF5OiBub25lO1xufVxuXG4uJHtUT09MVElQX0NMQVNTX05BTUV9LnRvb2x0aXBfbW9yZV9vcHRpb25zIC4ke1ZBTFVFX0NMQVNTX05BTUV9IHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgd2lkdGg6IDEycHg7XG59XG5cbi4ke0NBUFRJT05fQ0xBU1NfTkFNRX0ge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuLiR7S0VZQklORElOR19DTEFTU19OQU1FfSB7XG4gICAgbWFyZ2luOiAwIDJweDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgZm9udC1zaXplOiA4cHg7XG59XG5cbi4ke1RPT0xUSVBfQ0xBU1NfTkFNRX0udG9vbHRpcF9tb3JlX29wdGlvbnMgLiR7S0VZQklORElOR19DTEFTU19OQU1FfSB7XG4gICAgbWFyZ2luLWxlZnQ6IGF1dG87XG59XG5cbi4ke0tFWUJJTkRJTkdfQ0xBU1NfTkFNRX0gZGl2IHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgbWluLXdpZHRoOiA4cHg7XG4gICAgcGFkZGluZzogMnB4O1xuICAgIG1hcmdpbjogMCAxcHg7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNjY2M7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uYWNlX2RhcmsuYWNlX3Rvb2x0aXAgLiR7VE9PTFRJUF9DTEFTU19OQU1FfSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzM3MzczNztcbiAgICBjb2xvcjogI2VlZTtcbn1cblxuLmFjZV9kYXJrIGRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfS5hY2VfZGlzYWJsZWQge1xuICAgIGNvbG9yOiAjOTc5Nzk3O1xufVxuXG4uYWNlX2RhcmsgZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9LmFjZV9zZWxlY3RlZCxcbi5hY2VfZGFyayBkaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX06aG92ZXI6bm90KC5hY2VfZGlzYWJsZWQpIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMSk7XG59XG5cbi5hY2VfZGFyayBkaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX0gLmFjZV9pY29uX3N2ZyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbn1cblxuLmFjZV9kYXJrIGRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfS5hY2VfZGlzYWJsZWQgLmFjZV9pY29uX3N2ZyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzk3OTc5Nztcbn1cblxuLmFjZV9kYXJrIC4ke0JVVFRPTl9DTEFTU19OQU1FfS5hY2VfZGlzYWJsZWQge1xuICAgIGNvbG9yOiAjOTc5Nzk3O1xufVxuXG4uYWNlX2RhcmsgLiR7S0VZQklORElOR19DTEFTU19OQU1FfSBkaXYge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM1NzU3NTc7XG59XG5cbi5hY2VfY2hlY2ttYXJrOjpiZWZvcmUge1xuICAgIGNvbnRlbnQ6ICfinJMnO1xufVxuYCwgXCJjb21tYW5kYmFyLmNzc1wiLCBmYWxzZSk7XG5cbmV4cG9ydHMuQ29tbWFuZEJhclRvb2x0aXAgPSBDb21tYW5kQmFyVG9vbHRpcDtcbmV4cG9ydHMuVE9PTFRJUF9DTEFTU19OQU1FID0gVE9PTFRJUF9DTEFTU19OQU1FO1xuZXhwb3J0cy5CVVRUT05fQ0xBU1NfTkFNRSA9IEJVVFRPTl9DTEFTU19OQU1FO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBIYXNoSGFuZGxlciA9IHJlcXVpcmUoXCIuLi9rZXlib2FyZC9oYXNoX2hhbmRsZXJcIikuSGFzaEhhbmRsZXI7XG52YXIgQWNlSW5saW5lID0gcmVxdWlyZShcIi4uL2F1dG9jb21wbGV0ZS9pbmxpbmVcIikuQWNlSW5saW5lO1xudmFyIEZpbHRlcmVkTGlzdCA9IHJlcXVpcmUoXCIuLi9hdXRvY29tcGxldGVcIikuRmlsdGVyZWRMaXN0O1xudmFyIENvbXBsZXRpb25Qcm92aWRlciA9IHJlcXVpcmUoXCIuLi9hdXRvY29tcGxldGVcIikuQ29tcGxldGlvblByb3ZpZGVyO1xudmFyIEVkaXRvciA9IHJlcXVpcmUoXCIuLi9lZGl0b3JcIikuRWRpdG9yO1xudmFyIHV0aWwgPSByZXF1aXJlKFwiLi4vYXV0b2NvbXBsZXRlL3V0aWxcIik7XG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2xpYi9kb21cIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBDb21tYW5kQmFyVG9vbHRpcCA9IHJlcXVpcmUoXCIuL2NvbW1hbmRfYmFyXCIpLkNvbW1hbmRCYXJUb29sdGlwO1xudmFyIEJVVFRPTl9DTEFTU19OQU1FID0gcmVxdWlyZShcIi4vY29tbWFuZF9iYXJcIikuQlVUVE9OX0NMQVNTX05BTUU7XG5cbnZhciBzbmlwcGV0Q29tcGxldGVyID0gcmVxdWlyZShcIi4vbGFuZ3VhZ2VfdG9vbHNcIikuc25pcHBldENvbXBsZXRlcjtcbnZhciB0ZXh0Q29tcGxldGVyID0gcmVxdWlyZShcIi4vbGFuZ3VhZ2VfdG9vbHNcIikudGV4dENvbXBsZXRlcjtcbnZhciBrZXlXb3JkQ29tcGxldGVyID0gcmVxdWlyZShcIi4vbGFuZ3VhZ2VfdG9vbHNcIikua2V5V29yZENvbXBsZXRlcjtcblxudmFyIGRlc3Ryb3lDb21wbGV0ZXIgPSBmdW5jdGlvbihlLCBlZGl0b3IpIHtcbiAgICBlZGl0b3IuY29tcGxldGVyICYmIGVkaXRvci5jb21wbGV0ZXIuZGVzdHJveSgpO1xufTtcblxuLyoqXG4gKiBUaGlzIGNsYXNzIGNvbnRyb2xzIHRoZSBpbmxpbmUtb25seSBhdXRvY29tcGxldGlvbiBjb21wb25lbnRzIGFuZCB0aGVpciBsaWZlY3ljbGUuXG4gKiBUaGlzIGlzIG1vcmUgbGlnaHR3ZWlnaHQgdGhhbiB0aGUgcG9wdXAtYmFzZWQgYXV0b2NvbXBsZXRpb24sIGFzIGl0IGNhbiBvbmx5IHdvcmsgd2l0aCBleGFjdCBwcmVmaXggbWF0Y2hlcy5cbiAqIFRoZXJlIGlzIGFuIGlubGluZSBnaG9zdCB0ZXh0IHJlbmRlcmVyIGFuZCBhbiBvcHRpb25hbCBjb21tYW5kIGJhciB0b29sdGlwIGluc2lkZS5cbiAqL1xuY2xhc3MgSW5saW5lQXV0b2NvbXBsZXRlIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZWRpdG9yKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yO1xuICAgICAgICB0aGlzLmtleWJvYXJkSGFuZGxlciA9IG5ldyBIYXNoSGFuZGxlcih0aGlzLmNvbW1hbmRzKTtcbiAgICAgICAgdGhpcy4kaW5kZXggPSAtMTtcblxuICAgICAgICB0aGlzLmJsdXJMaXN0ZW5lciA9IHRoaXMuYmx1ckxpc3RlbmVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY2hhbmdlTGlzdGVuZXIgPSB0aGlzLmNoYW5nZUxpc3RlbmVyLmJpbmQodGhpcyk7XG5cblxuICAgICAgICB0aGlzLmNoYW5nZVRpbWVyID0gbGFuZy5kZWxheWVkQ2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcGxldGlvbnMoKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcmV0dXJuIHtBY2VJbmxpbmV9XG4gICAgICovXG4gICAgZ2V0SW5saW5lUmVuZGVyZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbmxpbmVSZW5kZXJlcilcbiAgICAgICAgICAgIHRoaXMuaW5saW5lUmVuZGVyZXIgPSBuZXcgQWNlSW5saW5lKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmlubGluZVJlbmRlcmVyO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0NvbW1hbmRCYXJUb29sdGlwfVxuICAgICAqL1xuICAgIGdldElubGluZVRvb2x0aXAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbmxpbmVUb29sdGlwKSB7XG4gICAgICAgICAgICB0aGlzLmlubGluZVRvb2x0aXAgPSBJbmxpbmVBdXRvY29tcGxldGUuY3JlYXRlSW5saW5lVG9vbHRpcChkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5saW5lVG9vbHRpcDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgdGhlIGVudHJ5IHBvaW50IHRvIHRoZSBjbGFzcy4gVGhpcyB0cmlnZ2VycyB0aGUgZ2F0aGVyaW5nIG9mIHRoZSBhdXRvY29tcGxldGlvbiBhbmQgZGlzcGxheWluZyB0aGUgcmVzdWx0cztcbiAgICAgKiBAcGFyYW0ge2ltcG9ydChcIi4uLy4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuQ29tcGxldGlvbk9wdGlvbnN9IG9wdGlvbnNcbiAgICAgKi9cbiAgICBzaG93KG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmICh0aGlzLmVkaXRvci5jb21wbGV0ZXIgIT09IHRoaXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVkaXRvci5jb21wbGV0ZXIpXG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3IuY29tcGxldGVyLmRldGFjaCgpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuY29tcGxldGVyID0gdGhpcztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZWRpdG9yLm9uKFwiY2hhbmdlU2VsZWN0aW9uXCIsIHRoaXMuY2hhbmdlTGlzdGVuZXIpO1xuICAgICAgICB0aGlzLmVkaXRvci5vbihcImJsdXJcIiwgdGhpcy5ibHVyTGlzdGVuZXIpO1xuXG4gICAgICAgIHRoaXMudXBkYXRlQ29tcGxldGlvbnMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgJG9wZW4oKSB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvci50ZXh0SW5wdXQuc2V0QXJpYU9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnRleHRJbnB1dC5zZXRBcmlhT3B0aW9ucyh7fSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVkaXRvci5rZXlCaW5kaW5nLmFkZEtleWJvYXJkSGFuZGxlcih0aGlzLmtleWJvYXJkSGFuZGxlcik7XG4gICAgICAgIHRoaXMuZ2V0SW5saW5lVG9vbHRpcCgpLmF0dGFjaCh0aGlzLmVkaXRvcik7XG5cbiAgICAgICAgaWYgKHRoaXMuJGluZGV4ID09PSAtMSkge1xuICAgICAgICAgICAgdGhpcy5zZXRJbmRleCgwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuJHNob3dDb21wbGV0aW9uKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuY2hhbmdlVGltZXIuY2FuY2VsKCk7XG4gICAgfVxuICAgIFxuICAgIGluc2VydE1hdGNoKCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5nZXRDb21wbGV0aW9uUHJvdmlkZXIoKS5pbnNlcnRCeUluZGV4KHRoaXMuZWRpdG9yLCB0aGlzLiRpbmRleCk7XG4gICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgY2hhbmdlTGlzdGVuZXIoZSkge1xuICAgICAgICB2YXIgY3Vyc29yID0gdGhpcy5lZGl0b3Iuc2VsZWN0aW9uLmxlYWQ7XG4gICAgICAgIGlmIChjdXJzb3Iucm93ICE9IHRoaXMuYmFzZS5yb3cgfHwgY3Vyc29yLmNvbHVtbiA8IHRoaXMuYmFzZS5jb2x1bW4pIHtcbiAgICAgICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuYWN0aXZhdGVkKVxuICAgICAgICAgICAgdGhpcy5jaGFuZ2VUaW1lci5zY2hlZHVsZSgpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgIH1cblxuICAgIGJsdXJMaXN0ZW5lcihlKSB7XG4gICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCIuLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLklubGluZUF1dG9jb21wbGV0ZUFjdGlvbn0gd2hlcmVcbiAgICAgKi9cbiAgICBnb1RvKHdoZXJlKSB7XG4gICAgICAgIGlmICghdGhpcy5jb21wbGV0aW9ucyB8fCAhdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb21wbGV0aW9uTGVuZ3RoID0gdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZC5sZW5ndGg7XG4gICAgICAgIHN3aXRjaCh3aGVyZS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgICAgICAgICBjYXNlIFwicHJldlwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SW5kZXgoKHRoaXMuJGluZGV4IC0gMSArIGNvbXBsZXRpb25MZW5ndGgpICUgY29tcGxldGlvbkxlbmd0aCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibmV4dFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SW5kZXgoKHRoaXMuJGluZGV4ICsgMSArIGNvbXBsZXRpb25MZW5ndGgpICUgY29tcGxldGlvbkxlbmd0aCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwiZmlyc3RcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnNldEluZGV4KDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImxhc3RcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnNldEluZGV4KHRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWQubGVuZ3RoIC0gMSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRMZW5ndGgoKSB7XG4gICAgICAgIGlmICghdGhpcy5jb21wbGV0aW9ucyB8fCAhdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWQubGVuZ3RoO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbaW5kZXhdXG4gICAgICogQHJldHVybnMge2ltcG9ydChcIi4uLy4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuQ29tcGxldGlvbiB8IHVuZGVmaW5lZH1cbiAgICAgKi9cbiAgICBnZXREYXRhKGluZGV4KSB7XG4gICAgICAgIGlmIChpbmRleCA9PSB1bmRlZmluZWQgfHwgaW5kZXggPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkW3RoaXMuJGluZGV4XTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkW2luZGV4XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldEluZGV4KCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kaW5kZXg7XG4gICAgfVxuXG4gICAgaXNPcGVuKCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kaW5kZXggPj0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXRJbmRleCh2YWx1ZSkge1xuICAgICAgICBpZiAoIXRoaXMuY29tcGxldGlvbnMgfHwgIXRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbmV3SW5kZXggPSBNYXRoLm1heCgtMSwgTWF0aC5taW4odGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZC5sZW5ndGggLSAxLCB2YWx1ZSkpO1xuICAgICAgICBpZiAobmV3SW5kZXggIT09IHRoaXMuJGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLiRpbmRleCA9IG5ld0luZGV4O1xuICAgICAgICAgICAgdGhpcy4kc2hvd0NvbXBsZXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge0NvbXBsZXRpb25Qcm92aWRlcn1cbiAgICAgKi9cbiAgICBnZXRDb21wbGV0aW9uUHJvdmlkZXIoaW5pdGlhbFBvc2l0aW9uKSB7XG4gICAgICAgIGlmICghdGhpcy5jb21wbGV0aW9uUHJvdmlkZXIpXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRpb25Qcm92aWRlciA9IG5ldyBDb21wbGV0aW9uUHJvdmlkZXIoaW5pdGlhbFBvc2l0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGlvblByb3ZpZGVyO1xuICAgIH1cblxuICAgICRzaG93Q29tcGxldGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmdldElubGluZVJlbmRlcmVyKCkuc2hvdyh0aGlzLmVkaXRvciwgdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZFt0aGlzLiRpbmRleF0sIHRoaXMuY29tcGxldGlvbnMuZmlsdGVyVGV4dCkpIHtcbiAgICAgICAgICAgIC8vIE5vdCBhYmxlIHRvIHNob3cgdGhlIGNvbXBsZXRpb24sIGhpZGUgdGhlIHByZXZpb3VzIG9uZVxuICAgICAgICAgICAgdGhpcy5nZXRJbmxpbmVSZW5kZXJlcigpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pbmxpbmVUb29sdGlwICYmIHRoaXMuaW5saW5lVG9vbHRpcC5pc1Nob3duKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5saW5lVG9vbHRpcC51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEByZXR1cm4ge2FueX1cbiAgICAgKi9cbiAgICAkdXBkYXRlUHJlZml4KCkge1xuICAgICAgICB2YXIgcG9zID0gdGhpcy5lZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHByZWZpeCA9IHRoaXMuZWRpdG9yLnNlc3Npb24uZ2V0VGV4dFJhbmdlKHtzdGFydDogdGhpcy5iYXNlLCBlbmQ6IHBvc30pO1xuICAgICAgICB0aGlzLmNvbXBsZXRpb25zLnNldEZpbHRlcihwcmVmaXgpO1xuICAgICAgICBpZiAoIXRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWQubGVuZ3RoKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgIGlmICh0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkLmxlbmd0aCA9PSAxXG4gICAgICAgICYmIHRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWRbMF0udmFsdWUgPT0gcHJlZml4XG4gICAgICAgICYmICF0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkWzBdLnNuaXBwZXQpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXRhY2goKTtcbiAgICAgICAgLy9AdHMtZXhwZWN0LWVycm9yIFRPRE86IHBvdGVudGlhbCB3cm9uZyBhcmd1bWVudHNcbiAgICAgICAgdGhpcy4kb3Blbih0aGlzLmVkaXRvciwgcHJlZml4KTtcbiAgICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ltcG9ydChcIi4uLy4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuQ29tcGxldGlvbk9wdGlvbnN9IFtvcHRpb25zXVxuICAgICAqL1xuICAgIHVwZGF0ZUNvbXBsZXRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHByZWZpeCA9IFwiXCI7XG4gICAgICAgIFxuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIHZhciBwb3MgPSB0aGlzLmVkaXRvci5nZXRTZWxlY3Rpb25SYW5nZSgpLnN0YXJ0O1xuICAgICAgICAgICAgdGhpcy5iYXNlID0gdGhpcy5lZGl0b3Iuc2Vzc2lvbi5kb2MuY3JlYXRlQW5jaG9yKHBvcy5yb3csIHBvcy5jb2x1bW4pO1xuICAgICAgICAgICAgdGhpcy5iYXNlLiRpbnNlcnRSaWdodCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRpb25zID0gbmV3IEZpbHRlcmVkTGlzdChvcHRpb25zLm1hdGNoZXMpO1xuICAgICAgICAgICAgLy9AdHMtZXhwZWN0LWVycm9yIFRPRE86IHBvdGVudGlhbCB3cm9uZyBhcmd1bWVudHNcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRvcGVuKHRoaXMuZWRpdG9yLCBcIlwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJhc2UgJiYgdGhpcy5jb21wbGV0aW9ucykge1xuICAgICAgICAgICAgcHJlZml4ID0gdGhpcy4kdXBkYXRlUHJlZml4KCk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2Vzc2lvbiA9IHRoaXMuZWRpdG9yLmdldFNlc3Npb24oKTtcbiAgICAgICAgdmFyIHBvcyA9IHRoaXMuZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHZhciBwcmVmaXggPSB1dGlsLmdldENvbXBsZXRpb25QcmVmaXgodGhpcy5lZGl0b3IpO1xuICAgICAgICB0aGlzLmJhc2UgPSBzZXNzaW9uLmRvYy5jcmVhdGVBbmNob3IocG9zLnJvdywgcG9zLmNvbHVtbiAtIHByZWZpeC5sZW5ndGgpO1xuICAgICAgICB0aGlzLmJhc2UuJGluc2VydFJpZ2h0ID0gdHJ1ZTtcblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHZhciBvcHRpb25zID0ge1xuICAgICAgICAgICAgZXhhY3RNYXRjaDogdHJ1ZSxcbiAgICAgICAgICAgIGlnbm9yZUNhcHRpb246IHRydWVcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5nZXRDb21wbGV0aW9uUHJvdmlkZXIoe1xuICAgICAgICAgICAgcHJlZml4LFxuICAgICAgICAgICAgYmFzZTogdGhpcy5iYXNlLFxuICAgICAgICAgICAgcG9zXG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIH0pLnByb3ZpZGVDb21wbGV0aW9ucyh0aGlzLmVkaXRvciwgb3B0aW9ucyxcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQHRoaXMge0lubGluZUF1dG9jb21wbGV0ZX1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24oZXJyLCBjb21wbGV0aW9ucywgZmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgZmlsdGVyZWQgPSBjb21wbGV0aW9ucy5maWx0ZXJlZDtcbiAgICAgICAgICAgICAgICB2YXIgcHJlZml4ID0gdXRpbC5nZXRDb21wbGV0aW9uUHJlZml4KHRoaXMuZWRpdG9yKTtcblxuICAgICAgICAgICAgICAgIGlmIChmaW5pc2hlZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBObyByZXN1bHRzXG4gICAgICAgICAgICAgICAgICAgIGlmICghZmlsdGVyZWQubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV0YWNoKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gT25lIHJlc3VsdCBlcXVhbHMgdG8gdGhlIHByZWZpeFxuICAgICAgICAgICAgICAgICAgICBpZiAoZmlsdGVyZWQubGVuZ3RoID09IDEgJiYgZmlsdGVyZWRbMF0udmFsdWUgPT0gcHJlZml4ICYmICFmaWx0ZXJlZFswXS5zbmlwcGV0KVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGlvbnMgPSBjb21wbGV0aW9ucztcbiAgICAgICAgICAgICAgICAvL0B0cy1leHBlY3QtZXJyb3IgVE9ETzogcG90ZW50aWFsIHdyb25nIGFyZ3VtZW50c1xuICAgICAgICAgICAgICAgIHRoaXMuJG9wZW4odGhpcy5lZGl0b3IsIHByZWZpeCk7XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGRldGFjaCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5rZXlCaW5kaW5nLnJlbW92ZUtleWJvYXJkSGFuZGxlcih0aGlzLmtleWJvYXJkSGFuZGxlcik7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5vZmYoXCJjaGFuZ2VTZWxlY3Rpb25cIiwgdGhpcy5jaGFuZ2VMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5vZmYoXCJibHVyXCIsIHRoaXMuYmx1ckxpc3RlbmVyKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNoYW5nZVRpbWVyLmNhbmNlbCgpO1xuICAgICAgICBpZiAodGhpcy5pbmxpbmVUb29sdGlwKSB7XG4gICAgICAgICAgICB0aGlzLmlubGluZVRvb2x0aXAuZGV0YWNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2V0SW5kZXgoLTEpO1xuXG4gICAgICAgIGlmICh0aGlzLmNvbXBsZXRpb25Qcm92aWRlcikge1xuICAgICAgICAgICAgdGhpcy5jb21wbGV0aW9uUHJvdmlkZXIuZGV0YWNoKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pbmxpbmVSZW5kZXJlciAmJiB0aGlzLmlubGluZVJlbmRlcmVyLmlzT3BlbigpKSB7XG4gICAgICAgICAgICB0aGlzLmlubGluZVJlbmRlcmVyLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJhc2UpXG4gICAgICAgICAgICB0aGlzLmJhc2UuZGV0YWNoKCk7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY29tcGxldGlvblByb3ZpZGVyID0gdGhpcy5jb21wbGV0aW9ucyA9IHRoaXMuYmFzZSA9IG51bGw7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgICAgaWYgKHRoaXMuaW5saW5lUmVuZGVyZXIpXG4gICAgICAgICAgICB0aGlzLmlubGluZVJlbmRlcmVyLmRlc3Ryb3koKTtcbiAgICAgICAgaWYgKHRoaXMuaW5saW5lVG9vbHRpcClcbiAgICAgICAgICAgIHRoaXMuaW5saW5lVG9vbHRpcC5kZXN0cm95KCk7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvciAmJiB0aGlzLmVkaXRvci5jb21wbGV0ZXIgPT0gdGhpcykge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iub2ZmKFwiZGVzdHJveVwiLCBkZXN0cm95Q29tcGxldGVyKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLmNvbXBsZXRlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbmxpbmVUb29sdGlwID0gdGhpcy5lZGl0b3IgPSB0aGlzLmlubGluZVJlbmRlcmVyID0gbnVsbDtcbiAgICB9XG5cbiAgICB1cGRhdGVEb2NUb29sdGlwKCl7XG4gICAgfVxuXG59XG5cbi8qKlxuICogXG4gKiBAdHlwZSB7e1trZXk6IHN0cmluZ106IGltcG9ydChcIi4uLy4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuQ29tbWFuZH19XG4gKi9cbklubGluZUF1dG9jb21wbGV0ZS5wcm90b3R5cGUuY29tbWFuZHMgPSB7XG4gICAgXCJQcmV2aW91c1wiOiB7XG4gICAgICAgIGJpbmRLZXk6IFwiQWx0LVtcIixcbiAgICAgICAgbmFtZTogXCJQcmV2aW91c1wiLFxuICAgICAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgICAgIGVkaXRvci5jb21wbGV0ZXIuZ29UbyhcInByZXZcIik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiTmV4dFwiOiB7XG4gICAgICAgIGJpbmRLZXk6IFwiQWx0LV1cIixcbiAgICAgICAgbmFtZTogXCJOZXh0XCIsXG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgZWRpdG9yLmNvbXBsZXRlci5nb1RvKFwibmV4dFwiKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJBY2NlcHRcIjoge1xuICAgICAgICBiaW5kS2V5OiB7IHdpbjogXCJUYWJ8Q3RybC1SaWdodFwiLCBtYWM6IFwiVGFifENtZC1SaWdodFwiIH0sXG4gICAgICAgIG5hbWU6IFwiQWNjZXB0XCIsXG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgcmV0dXJuIC8qKkB0eXBle0lubGluZUF1dG9jb21wbGV0ZX0qLyhlZGl0b3IuY29tcGxldGVyKS5pbnNlcnRNYXRjaCgpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcIkNsb3NlXCI6IHtcbiAgICAgICAgYmluZEtleTogXCJFc2NcIixcbiAgICAgICAgbmFtZTogXCJDbG9zZVwiLFxuICAgICAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgICAgIGVkaXRvci5jb21wbGV0ZXIuZGV0YWNoKCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5JbmxpbmVBdXRvY29tcGxldGUuZm9yID0gZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgaWYgKGVkaXRvci5jb21wbGV0ZXIgaW5zdGFuY2VvZiBJbmxpbmVBdXRvY29tcGxldGUpIHtcbiAgICAgICAgcmV0dXJuIGVkaXRvci5jb21wbGV0ZXI7XG4gICAgfVxuICAgIGlmIChlZGl0b3IuY29tcGxldGVyKSB7XG4gICAgICAgIGVkaXRvci5jb21wbGV0ZXIuZGVzdHJveSgpO1xuICAgICAgICBlZGl0b3IuY29tcGxldGVyID0gbnVsbDtcbiAgICB9XG5cbiAgICBlZGl0b3IuY29tcGxldGVyID0gbmV3IElubGluZUF1dG9jb21wbGV0ZShlZGl0b3IpO1xuICAgIGVkaXRvci5vbmNlKFwiZGVzdHJveVwiLCBkZXN0cm95Q29tcGxldGVyKTtcbiAgICByZXR1cm4gZWRpdG9yLmNvbXBsZXRlcjtcbn07XG5cbklubGluZUF1dG9jb21wbGV0ZS5zdGFydENvbW1hbmQgPSB7XG4gICAgbmFtZTogXCJzdGFydElubGluZUF1dG9jb21wbGV0ZVwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvciwgb3B0aW9ucykge1xuICAgICAgICB2YXIgY29tcGxldGVyID0gSW5saW5lQXV0b2NvbXBsZXRlLmZvcihlZGl0b3IpO1xuICAgICAgICBjb21wbGV0ZXIuc2hvdyhvcHRpb25zKTtcbiAgICB9LFxuICAgIGJpbmRLZXk6IHsgd2luOiBcIkFsdC1DXCIsIG1hYzogXCJPcHRpb24tQ1wiIH1cbn07XG5cblxudmFyIGNvbXBsZXRlcnMgPSBbc25pcHBldENvbXBsZXRlciwgdGV4dENvbXBsZXRlciwga2V5V29yZENvbXBsZXRlcl07XG5cbnJlcXVpcmUoXCIuLi9jb25maWdcIikuZGVmaW5lT3B0aW9ucyhFZGl0b3IucHJvdG90eXBlLCBcImVkaXRvclwiLCB7XG4gICAgZW5hYmxlSW5saW5lQXV0b2NvbXBsZXRpb246IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0aGlze0VkaXRvcn1cbiAgICAgICAgICogQHBhcmFtIHZhbFxuICAgICAgICAgKi9cbiAgICAgICAgc2V0OiBmdW5jdGlvbih2YWwpIHtcbiAgICAgICAgICAgIGlmICh2YWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuY29tcGxldGVycylcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0ZXJzID0gQXJyYXkuaXNBcnJheSh2YWwpPyB2YWwgOiBjb21wbGV0ZXJzO1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZHMuYWRkQ29tbWFuZChJbmxpbmVBdXRvY29tcGxldGUuc3RhcnRDb21tYW5kKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kcy5yZW1vdmVDb21tYW5kKElubGluZUF1dG9jb21wbGV0ZS5zdGFydENvbW1hbmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICB9XG59KTtcblxuLyoqXG4gKiBGYWN0b3J5IG1ldGhvZCB0byBjcmVhdGUgYSBjb21tYW5kIGJhciB0b29sdGlwIGZvciBpbmxpbmUgYXV0b2NvbXBsZXRlLlxuICogXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBwYXJlbnRFbCAgVGhlIHBhcmVudCBlbGVtZW50IHdoZXJlIHRoZSB0b29sdGlwIEhUTUwgZWxlbWVudHMgd2lsbCBiZSBhZGRlZC5cbiAqIEByZXR1cm5zIHtDb21tYW5kQmFyVG9vbHRpcH0gICBUaGUgY29tbWFuZCBiYXIgdG9vbHRpcCBmb3IgaW5saW5lIGF1dG9jb21wbGV0ZVxuICovXG5JbmxpbmVBdXRvY29tcGxldGUuY3JlYXRlSW5saW5lVG9vbHRpcCA9IGZ1bmN0aW9uKHBhcmVudEVsKSB7XG4gICAgLyoqQHR5cGUge0NvbW1hbmRCYXJUb29sdGlwfSovXG4gICAgdmFyIGlubGluZVRvb2x0aXAgPSBuZXcgQ29tbWFuZEJhclRvb2x0aXAocGFyZW50RWwpO1xuICAgIGlubGluZVRvb2x0aXAucmVnaXN0ZXJDb21tYW5kKFwiUHJldmlvdXNcIixcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBJbmxpbmVBdXRvY29tcGxldGUucHJvdG90eXBlLmNvbW1hbmRzW1wiUHJldmlvdXNcIl0sIHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiBcImFjZV9hcnJvd19yb3RhdGVkXCJcbiAgICAgICAgfSlcbiAgICApO1xuICAgIGlubGluZVRvb2x0aXAucmVnaXN0ZXJDb21tYW5kKFwiUG9zaXRpb25cIiwge1xuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uIChlZGl0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiBlZGl0b3IgPyBbLyoqQHR5cGV7SW5saW5lQXV0b2NvbXBsZXRlfSovXG4gICAgICAgICAgICAgICAgKGVkaXRvci5jb21wbGV0ZXIpLmdldEluZGV4KCkgKyAxLCAvKipAdHlwZXtJbmxpbmVBdXRvY29tcGxldGV9Ki8oZWRpdG9yLmNvbXBsZXRlcikuZ2V0TGVuZ3RoKClcbiAgICAgICAgICAgIF0uam9pbihcIi9cIikgOiBcIlwiO1xuICAgICAgICB9LFxuICAgICAgICB0eXBlOiBcInRleHRcIixcbiAgICAgICAgY3NzQ2xhc3M6IFwiY29tcGxldGlvbl9wb3NpdGlvblwiXG4gICAgfSk7XG4gICAgaW5saW5lVG9vbHRpcC5yZWdpc3RlckNvbW1hbmQoXCJOZXh0XCIsXG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgSW5saW5lQXV0b2NvbXBsZXRlLnByb3RvdHlwZS5jb21tYW5kc1tcIk5leHRcIl0sIHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiBcImFjZV9hcnJvd1wiXG4gICAgICAgIH0pXG4gICAgKTtcbiAgICBpbmxpbmVUb29sdGlwLnJlZ2lzdGVyQ29tbWFuZChcIkFjY2VwdFwiLFxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgICAgIE9iamVjdC5hc3NpZ24oe30sIElubGluZUF1dG9jb21wbGV0ZS5wcm90b3R5cGUuY29tbWFuZHNbXCJBY2NlcHRcIl0sIHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIWVkaXRvciAmJiBlZGl0b3IuY29tcGxldGVyLmdldEluZGV4KCkgPj0gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiXG4gICAgICAgIH0pXG4gICAgKTtcbiAgICBpbmxpbmVUb29sdGlwLnJlZ2lzdGVyQ29tbWFuZChcIlNob3dUb29sdGlwXCIsIHtcbiAgICAgICAgbmFtZTogXCJBbHdheXMgU2hvdyBUb29sdGlwXCIsXG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaW5saW5lVG9vbHRpcC5zZXRBbHdheXNTaG93KCFpbmxpbmVUb29sdGlwLmdldEFsd2F5c1Nob3coKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmxpbmVUb29sdGlwLmdldEFsd2F5c1Nob3coKTtcbiAgICAgICAgfSxcbiAgICAgICAgdHlwZTogXCJjaGVja2JveFwiXG4gICAgfSk7XG4gICAgcmV0dXJuIGlubGluZVRvb2x0aXA7XG59O1xuXG5kb20uaW1wb3J0Q3NzU3RyaW5nKGBcblxuLmFjZV9pY29uX3N2Zy5hY2VfYXJyb3csXG4uYWNlX2ljb25fc3ZnLmFjZV9hcnJvd19yb3RhdGVkIHtcbiAgICAtd2Via2l0LW1hc2staW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjNhV1IwYUQwaU1UWWlJR2hsYVdkb2REMGlNVFlpSUhacFpYZENiM2c5SWpBZ01DQXhOaUF4TmlJZ1ptbHNiRDBpYm05dVpTSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhjR0YwYUNCbWFXeHNMWEoxYkdVOUltVjJaVzV2WkdRaUlHTnNhWEF0Y25Wc1pUMGlaWFpsYm05a1pDSWdaRDBpVFRVdU9ETTNNREVnTVRWTU5DNDFPRGMxTVNBeE15NDNNVFUxVERFd0xqRTBOamdnT0V3MExqVTROelV4SURJdU1qZzBORFpNTlM0NE16Y3dNU0F4VERFeUxqWTBOalVnT0V3MUxqZ3pOekF4SURFMVdpSWdabWxzYkQwaVlteGhZMnNpTHo0OEwzTjJaejQ9XCIpO1xufVxuXG4uYWNlX2ljb25fc3ZnLmFjZV9hcnJvd19yb3RhdGVkIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xufVxuXG5kaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX0uY29tcGxldGlvbl9wb3NpdGlvbiB7XG4gICAgcGFkZGluZzogMDtcbn1cbmAsIFwiaW5saW5lYXV0b2NvbXBsZXRlLmNzc1wiLCBmYWxzZSk7XG5cbmV4cG9ydHMuSW5saW5lQXV0b2NvbXBsZXRlID0gSW5saW5lQXV0b2NvbXBsZXRlO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9