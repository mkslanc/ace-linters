(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9885,7700],{

/***/ 47700:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * @typedef {import("../editor").Editor} Editor
 * @typedef {import("../../ace-internal").Ace.TooltipCommand} TooltipCommand
 */
var Tooltip = (__webpack_require__(59864)/* .Tooltip */ .m_);
var EventEmitter = (__webpack_require__(87366).EventEmitter);
var lang = __webpack_require__(39955);
var dom = __webpack_require__(71435);
var oop = __webpack_require__(2645);
var useragent = __webpack_require__(74943);

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

/***/ 29885:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var HashHandler = (__webpack_require__(93050).HashHandler);
var AceInline = (__webpack_require__(76703)/* .AceInline */ .V);
var FilteredList = (__webpack_require__(26347)/* .FilteredList */ .C3);
var CompletionProvider = (__webpack_require__(26347)/* .CompletionProvider */ .o2);
var Editor = (__webpack_require__(27258).Editor);
var util = __webpack_require__(28630);
var dom = __webpack_require__(71435);
var lang = __webpack_require__(39955);
var CommandBarTooltip = (__webpack_require__(47700).CommandBarTooltip);
var BUTTON_CLASS_NAME = (__webpack_require__(47700).BUTTON_CLASS_NAME);

var snippetCompleter = (__webpack_require__(61893).snippetCompleter);
var textCompleter = (__webpack_require__(61893).textCompleter);
var keyWordCompleter = (__webpack_require__(61893).keyWordCompleter);

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

(__webpack_require__(76321).defineOptions)(Editor.prototype, "editor", {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjk4ODUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBLGFBQWEsNEJBQTRCO0FBQ3pDLGFBQWEsaURBQWlEO0FBQzlEO0FBQ0EsY0FBYyw4Q0FBNkI7QUFDM0MsbUJBQW1CLHlDQUE0QztBQUMvRCxXQUFXLG1CQUFPLENBQUMsS0FBYTtBQUNoQyxVQUFVLG1CQUFPLENBQUMsS0FBWTtBQUM5QixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QixnQkFBZ0IsbUJBQU8sQ0FBQyxLQUFrQjs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyxTQUFTO0FBQ3ZCLGdCQUFnQixTQUFTO0FBQ3pCLGlCQUFpQixTQUFTO0FBQzFCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGFBQWE7QUFDNUIsZUFBZSw2REFBNkQ7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnREFBZ0QsMkJBQTJCO0FBQzNFLG9EQUFvRCxxREFBcUQ7O0FBRXpHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxnQkFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtQkFBbUI7QUFDbEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxnQkFBZ0I7QUFDL0IsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsYUFBYSxxQkFBcUI7QUFDbEM7QUFDQTtBQUNBLGNBQWMsa0JBQWtCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsbUJBQW1CO0FBQ3pELDREQUE0RCxtQkFBbUI7QUFDL0U7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7O0FBRUE7QUFDQTtBQUNBOztBQUVBLE1BQU0sa0JBQWtCO0FBQ3hCO0FBQ0E7QUFDQTs7QUFFQSwwQkFBMEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvY29tbWFuZF9iYXIuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L2lubGluZV9hdXRvY29tcGxldGUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vZWRpdG9yXCIpLkVkaXRvcn0gRWRpdG9yXG4gKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5Ub29sdGlwQ29tbWFuZH0gVG9vbHRpcENvbW1hbmRcbiAqL1xudmFyIFRvb2x0aXAgPSByZXF1aXJlKFwiLi4vdG9vbHRpcFwiKS5Ub29sdGlwO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoXCIuLi9saWIvZXZlbnRfZW1pdHRlclwiKS5FdmVudEVtaXR0ZXI7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBkb20gPSByZXF1aXJlKFwiLi4vbGliL2RvbVwiKTtcbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciB1c2VyYWdlbnQgPSByZXF1aXJlKFwiLi4vbGliL3VzZXJhZ2VudFwiKTtcblxudmFyIEJVVFRPTl9DTEFTU19OQU1FID0gJ2NvbW1hbmRfYmFyX3Rvb2x0aXBfYnV0dG9uJztcbnZhciBWQUxVRV9DTEFTU19OQU1FID0gJ2NvbW1hbmRfYmFyX2J1dHRvbl92YWx1ZSc7XG52YXIgQ0FQVElPTl9DTEFTU19OQU1FID0gJ2NvbW1hbmRfYmFyX2J1dHRvbl9jYXB0aW9uJztcbnZhciBLRVlCSU5ESU5HX0NMQVNTX05BTUUgPSAnY29tbWFuZF9iYXJfa2V5YmluZGluZyc7XG52YXIgVE9PTFRJUF9DTEFTU19OQU1FID0gJ2NvbW1hbmRfYmFyX3Rvb2x0aXAnO1xudmFyIE1PUkVfT1BUSU9OU19CVVRUT05fSUQgPSAnTW9yZU9wdGlvbnNCdXR0b24nO1xuXG52YXIgZGVmYXVsdERlbGF5ID0gMTAwO1xudmFyIGRlZmF1bHRNYXhFbGVtZW50cyA9IDQ7XG5cbnZhciBtaW5Qb3NpdGlvbiA9IGZ1bmN0aW9uIChwb3NBLCBwb3NCKSB7XG4gICAgaWYgKHBvc0Iucm93ID4gcG9zQS5yb3cpIHtcbiAgICAgICAgcmV0dXJuIHBvc0E7XG4gICAgfSBlbHNlIGlmIChwb3NCLnJvdyA9PT0gcG9zQS5yb3cgJiYgcG9zQi5jb2x1bW4gPiBwb3NBLmNvbHVtbikge1xuICAgICAgICByZXR1cm4gcG9zQTtcbiAgICB9XG4gICAgcmV0dXJuIHBvc0I7XG59O1xuXG52YXIga2V5RGlzcGxheU1hcCA9IHtcbiAgICBcIkN0cmxcIjogeyBtYWM6IFwiXlwifSxcbiAgICBcIk9wdGlvblwiOiB7IG1hYzogXCLijKVcIn0sXG4gICAgXCJDb21tYW5kXCI6IHsgbWFjOiBcIuKMmFwifSxcbiAgICBcIkNtZFwiOiB7IG1hYzogXCLijJhcIn0sXG4gICAgXCJTaGlmdFwiOiBcIuKHp1wiLFxuICAgIFwiTGVmdFwiOiBcIuKGkFwiLFxuICAgIFwiUmlnaHRcIjogXCLihpJcIixcbiAgICBcIlVwXCI6IFwi4oaRXCIsXG4gICAgXCJEb3duXCI6IFwi4oaTXCJcbn07XG5cblxuLyoqXG4gKiBEaXNwbGF5cyBhIGNvbW1hbmQgdG9vbHRpcCBhYm92ZSB0aGUgY3VycmVudGx5IGFjdGl2ZSBsaW5lIHNlbGVjdGlvbiwgd2l0aCBjbGlja2FibGUgZWxlbWVudHMuXG4gKlxuICogSW50ZXJuYWxseSBpdCBpcyBhIGNvbXBvc2l0ZSBvZiB0d28gdG9vbHRpcHMsIG9uZSBmb3IgdGhlIG1haW4gdG9vbHRpcCBhbmQgb25lIGZvciB0aGUgXG4gKiBvdmVyZmxvd2luZyBjb21tYW5kcy5cbiAqIFRoZSBjb21tYW5kcyBhcmUgYWRkZWQgc2VxdWVudGlhbGx5IGluIHJlZ2lzdHJhdGlvbiBvcmRlci5cbiAqIFdoZW4gYXR0YWNoZWQgdG8gYW4gZWRpdG9yLCBpdCBpcyBlaXRoZXIgYWx3YXlzIHNob3duIG9yIG9ubHkgd2hlbiB0aGUgYWN0aXZlIGxpbmUgaXMgaG92ZXJlZFxuICogd2l0aCBtb3VzZSwgZGVwZW5kaW5nIG9uIHRoZSBhbHdheXNTaG93IHByb3BlcnR5LlxuICovXG5jbGFzcyBDb21tYW5kQmFyVG9vbHRpcCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50Tm9kZVxuICAgICAqIEBwYXJhbSB7UGFydGlhbDxpbXBvcnQoXCIuLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLkNvbW1hbmRCYXJPcHRpb25zPn0gW29wdGlvbnNdXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocGFyZW50Tm9kZSwgb3B0aW9ucykge1xuICAgICAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdGhpcy5wYXJlbnROb2RlID0gcGFyZW50Tm9kZTtcbiAgICAgICAgdGhpcy50b29sdGlwID0gbmV3IFRvb2x0aXAodGhpcy5wYXJlbnROb2RlKTtcbiAgICAgICAgdGhpcy5tb3JlT3B0aW9ucyA9IG5ldyBUb29sdGlwKHRoaXMucGFyZW50Tm9kZSk7XG4gICAgICAgIHRoaXMubWF4RWxlbWVudHNPblRvb2x0aXAgPSBvcHRpb25zLm1heEVsZW1lbnRzT25Ub29sdGlwIHx8IGRlZmF1bHRNYXhFbGVtZW50cztcbiAgICAgICAgdGhpcy4kYWx3YXlzU2hvdyA9IG9wdGlvbnMuYWx3YXlzU2hvdyB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycyA9IHt9O1xuICAgICAgICB0aGlzLmVsZW1lbnRzID0ge307XG4gICAgICAgIHRoaXMuY29tbWFuZHMgPSB7fTtcblxuICAgICAgICB0aGlzLnRvb2x0aXBFbCA9IGRvbS5idWlsZERvbShbJ2RpdicsIHsgY2xhc3M6IFRPT0xUSVBfQ0xBU1NfTkFNRSB9XSwgdGhpcy50b29sdGlwLmdldEVsZW1lbnQoKSk7XG4gICAgICAgIHRoaXMubW9yZU9wdGlvbnNFbCA9IGRvbS5idWlsZERvbShbJ2RpdicsIHsgY2xhc3M6IFRPT0xUSVBfQ0xBU1NfTkFNRSArIFwiIHRvb2x0aXBfbW9yZV9vcHRpb25zXCIgfV0sIHRoaXMubW9yZU9wdGlvbnMuZ2V0RWxlbWVudCgpKTtcblxuICAgICAgICB0aGlzLiRzaG93VG9vbHRpcFRpbWVyID0gbGFuZy5kZWxheWVkQ2FsbCh0aGlzLiRzaG93VG9vbHRpcC5iaW5kKHRoaXMpLCBvcHRpb25zLnNob3dEZWxheSB8fCBkZWZhdWx0RGVsYXkpO1xuICAgICAgICB0aGlzLiRoaWRlVG9vbHRpcFRpbWVyID0gbGFuZy5kZWxheWVkQ2FsbCh0aGlzLiRoaWRlVG9vbHRpcC5iaW5kKHRoaXMpLCBvcHRpb25zLmhpZGVEZWxheSB8fCBkZWZhdWx0RGVsYXkpO1xuICAgICAgICB0aGlzLiR0b29sdGlwRW50ZXIgPSB0aGlzLiR0b29sdGlwRW50ZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy4kb25Nb3VzZU1vdmUgPSB0aGlzLiRvbk1vdXNlTW92ZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLiRvbkNoYW5nZVNjcm9sbCA9IHRoaXMuJG9uQ2hhbmdlU2Nyb2xsLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuJG9uRWRpdG9yQ2hhbmdlU2Vzc2lvbiA9IHRoaXMuJG9uRWRpdG9yQ2hhbmdlU2Vzc2lvbi5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLiRzY2hlZHVsZVRvb2x0aXBGb3JIaWRlID0gdGhpcy4kc2NoZWR1bGVUb29sdGlwRm9ySGlkZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLiRwcmV2ZW50TW91c2VFdmVudCA9IHRoaXMuJHByZXZlbnRNb3VzZUV2ZW50LmJpbmQodGhpcyk7XG5cbiAgICAgICAgZm9yICh2YXIgZXZlbnQgb2YgW1wibW91c2Vkb3duXCIsIFwibW91c2V1cFwiLCBcImNsaWNrXCJdKSB7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAuZ2V0RWxlbWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuJHByZXZlbnRNb3VzZUV2ZW50KTtcbiAgICAgICAgICAgIHRoaXMubW9yZU9wdGlvbnMuZ2V0RWxlbWVudCgpLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIHRoaXMuJHByZXZlbnRNb3VzZUV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVycyBhIGNvbW1hbmQgb24gdGhlIGNvbW1hbmQgYmFyIHRvb2x0aXAuXG4gICAgICogXG4gICAgICogVGhlIGNvbW1hbmRzIGFyZSBhZGRlZCBpbiBzZXF1ZW50aWFsIG9yZGVyLiBJZiB0aGVyZSBpcyBub3QgZW5vdWdoIHNwYWNlIG9uIHRoZSBtYWluXG4gICAgICogdG9vbGJhciwgdGhlIHJlbWFpbmluZyBlbGVtZW50cyBhcmUgYWRkZWQgdG8gdGhlIG92ZXJmbG93IG1lbnUuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkICAgICAgXG4gICAgICogQHBhcmFtIHtUb29sdGlwQ29tbWFuZH0gY29tbWFuZFxuICAgICAqL1xuICAgIHJlZ2lzdGVyQ29tbWFuZChpZCwgY29tbWFuZCkge1xuICAgICAgICB2YXIgcmVnaXN0ZXJGb3JNYWluVG9vbHRpcCA9IE9iamVjdC5rZXlzKHRoaXMuY29tbWFuZHMpLmxlbmd0aCA8IHRoaXMubWF4RWxlbWVudHNPblRvb2x0aXA7XG4gICAgICAgIGlmICghcmVnaXN0ZXJGb3JNYWluVG9vbHRpcCAmJiAhdGhpcy5lbGVtZW50c1tNT1JFX09QVElPTlNfQlVUVE9OX0lEXSkge1xuICAgICAgICAgICAgdGhpcy4kY3JlYXRlQ29tbWFuZChNT1JFX09QVElPTlNfQlVUVE9OX0lELCB7XG4gICAgICAgICAgICAgICAgbmFtZTogXCLCt8K3wrdcIixcbiAgICAgICAgICAgICAgICBleGVjOiBcbiAgICAgICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAgICAgKiBAdGhpcyB7Q29tbWFuZEJhclRvb2x0aXB9XG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHNob3VsZEhpZGVNb3JlT3B0aW9ucyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzZXRNb3JlT3B0aW9uc1Zpc2liaWxpdHkoIXRoaXMuaXNNb3JlT3B0aW9uc1Nob3duKCkpO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcImNoZWNrYm94XCIsXG4gICAgICAgICAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc01vcmVPcHRpb25zU2hvd24oKTtcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kY3JlYXRlQ29tbWFuZChpZCwgY29tbWFuZCwgcmVnaXN0ZXJGb3JNYWluVG9vbHRpcCk7XG4gICAgICAgIGlmICh0aGlzLmlzU2hvd24oKSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNTaG93bigpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy50b29sdGlwICYmIHRoaXMudG9vbHRpcC5pc09wZW47XG4gICAgfVxuXG4gICAgaXNNb3JlT3B0aW9uc1Nob3duKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLm1vcmVPcHRpb25zICYmIHRoaXMubW9yZU9wdGlvbnMuaXNPcGVuO1xuICAgIH1cblxuICAgIGdldEFsd2F5c1Nob3coKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRhbHdheXNTaG93O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGRpc3BsYXkgbW9kZSBvZiB0aGUgdG9vbHRpcFxuICAgICAqIFxuICAgICAqIFdoZW4gdHJ1ZSwgdGhlIHRvb2x0aXAgaXMgYWx3YXlzIGRpc3BsYXllZCB3aGlsZSBpdCBpcyBhdHRhY2hlZCB0byBhbiBlZGl0b3IuXG4gICAgICogV2hlbiBmYWxzZSwgdGhlIHRvb2x0aXAgaXMgZGlzcGxheWVkIG9ubHkgd2hlbiB0aGUgbW91c2UgaG92ZXJzIG92ZXIgdGhlIGFjdGl2ZSBlZGl0b3IgbGluZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGFsd2F5c1Nob3dcbiAgICAgKi9cbiAgICBzZXRBbHdheXNTaG93KGFsd2F5c1Nob3cpIHtcbiAgICAgICAgdGhpcy4kYWx3YXlzU2hvdyA9IGFsd2F5c1Nob3c7XG4gICAgICAgIHRoaXMuJHVwZGF0ZU9uSG92ZXJIYW5kbGVycyghdGhpcy4kYWx3YXlzU2hvdyk7XG4gICAgICAgIHRoaXMuX3NpZ25hbChcImFsd2F5c1Nob3dcIiwgdGhpcy4kYWx3YXlzU2hvdyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQXR0YWNoZXMgdGhlIGNsaWNrYWJsZSBjb21tYW5kIGJhciB0b29sdGlwIHRvIGFuIGVkaXRvclxuICAgICAqIFxuICAgICAqIERlcGVuZGluZyBvbiB0aGUgYWx3YXlzU2hvdyBwYXJhbWV0ZXIgaXQgZWl0aGVyIGRpc3BsYXlzIHRoZSB0b29sdGlwIGltbWVkaWF0ZWx5LFxuICAgICAqIG9yIHN1YnNjcmliZXMgdG8gdGhlIG5lY2Vzc2FyeSBldmVudHMgdG8gZGlzcGxheSB0aGUgdG9vbHRpcCBvbiBob3Zlci5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICovXG4gICAgYXR0YWNoKGVkaXRvcikge1xuICAgICAgICBpZiAoIWVkaXRvciB8fCAodGhpcy5pc1Nob3duKCkgJiYgdGhpcy5lZGl0b3IgPT09IGVkaXRvcikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZGV0YWNoKCk7XG5cbiAgICAgICAgdGhpcy5lZGl0b3IgPSBlZGl0b3I7XG4gICAgICAgIHRoaXMuZWRpdG9yLm9uKFwiY2hhbmdlU2Vzc2lvblwiLCB0aGlzLiRvbkVkaXRvckNoYW5nZVNlc3Npb24pO1xuICAgICAgICBpZiAodGhpcy5lZGl0b3Iuc2Vzc2lvbikge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2Vzc2lvbi5vbihcImNoYW5nZVNjcm9sbExlZnRcIiwgdGhpcy4kb25DaGFuZ2VTY3JvbGwpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2Vzc2lvbi5vbihcImNoYW5nZVNjcm9sbFRvcFwiLCB0aGlzLiRvbkNoYW5nZVNjcm9sbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5nZXRBbHdheXNTaG93KCkpIHtcbiAgICAgICAgICAgIHRoaXMuJHNob3dUb29sdGlwKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiR1cGRhdGVPbkhvdmVySGFuZGxlcnModHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGVzIHRoZSBwb3NpdGlvbiBvZiB0aGUgY29tbWFuZCBiYXIgdG9vbHRpcC4gSXQgYWxpZ25zIGl0c2VsZiBhYm92ZSB0aGUgYWN0aXZlIGxpbmUgaW4gdGhlIGVkaXRvci5cbiAgICAgKi9cbiAgICB1cGRhdGVQb3NpdGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciByZW5kZXJlciA9IHRoaXMuZWRpdG9yLnJlbmRlcmVyO1xuXG4gICAgICAgIHZhciByYW5nZXM7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvci5zZWxlY3Rpb24uZ2V0QWxsUmFuZ2VzKSB7XG4gICAgICAgICAgICByYW5nZXMgPSB0aGlzLmVkaXRvci5zZWxlY3Rpb24uZ2V0QWxsUmFuZ2VzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByYW5nZXMgPSBbdGhpcy5lZGl0b3IuZ2V0U2VsZWN0aW9uUmFuZ2UoKV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyYW5nZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1pblBvcyA9IG1pblBvc2l0aW9uKHJhbmdlc1swXS5zdGFydCwgcmFuZ2VzWzBdLmVuZCk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCByYW5nZTsgcmFuZ2UgPSByYW5nZXNbaV07IGkrKykge1xuICAgICAgICAgICAgbWluUG9zID0gbWluUG9zaXRpb24obWluUG9zLCBtaW5Qb3NpdGlvbihyYW5nZS5zdGFydCwgcmFuZ2UuZW5kKSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcG9zID0gcmVuZGVyZXIuJGN1cnNvckxheWVyLmdldFBpeGVsUG9zaXRpb24obWluUG9zLCB0cnVlKTtcblxuICAgICAgICB2YXIgdG9vbHRpcEVsID0gdGhpcy50b29sdGlwLmdldEVsZW1lbnQoKTtcbiAgICAgICAgdmFyIHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHZhciBzY3JlZW5IZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIHZhciByZWN0ID0gdGhpcy5lZGl0b3IuY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIHBvcy50b3AgKz0gcmVjdC50b3AgLSByZW5kZXJlci5sYXllckNvbmZpZy5vZmZzZXQ7XG4gICAgICAgIHBvcy5sZWZ0ICs9IHJlY3QubGVmdCArIHJlbmRlcmVyLmd1dHRlcldpZHRoIC0gcmVuZGVyZXIuc2Nyb2xsTGVmdDtcblxuICAgICAgICB2YXIgY3Vyc29yVmlzaWJsZSA9IHBvcy50b3AgPj0gcmVjdC50b3AgJiYgcG9zLnRvcCA8PSByZWN0LmJvdHRvbSAmJlxuICAgICAgICAgICAgcG9zLmxlZnQgPj0gcmVjdC5sZWZ0ICsgcmVuZGVyZXIuZ3V0dGVyV2lkdGggJiYgcG9zLmxlZnQgPD0gcmVjdC5yaWdodDtcblxuICAgICAgICBpZiAoIWN1cnNvclZpc2libGUgJiYgdGhpcy5pc1Nob3duKCkpIHtcbiAgICAgICAgICAgIHRoaXMuJGhpZGVUb29sdGlwKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH0gZWxzZSBpZiAoY3Vyc29yVmlzaWJsZSAmJiAhdGhpcy5pc1Nob3duKCkgJiYgdGhpcy5nZXRBbHdheXNTaG93KCkpIHtcbiAgICAgICAgICAgIHRoaXMuJHNob3dUb29sdGlwKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdG9wID0gcG9zLnRvcCAtIHRvb2x0aXBFbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgIHZhciBsZWZ0ID0gTWF0aC5taW4oc2NyZWVuV2lkdGggLSB0b29sdGlwRWwub2Zmc2V0V2lkdGgsIHBvcy5sZWZ0KTtcblxuICAgICAgICB2YXIgdG9vbHRpcEZpdHMgPSB0b3AgPj0gMCAmJiB0b3AgKyB0b29sdGlwRWwub2Zmc2V0SGVpZ2h0IDw9IHNjcmVlbkhlaWdodCAmJlxuICAgICAgICAgICAgbGVmdCA+PSAwICYmIGxlZnQgKyB0b29sdGlwRWwub2Zmc2V0V2lkdGggPD0gc2NyZWVuV2lkdGg7XG5cbiAgICAgICAgaWYgKCF0b29sdGlwRml0cykge1xuICAgICAgICAgICAgdGhpcy4kaGlkZVRvb2x0aXAoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9vbHRpcC5zZXRQb3NpdGlvbihsZWZ0LCB0b3ApO1xuXG4gICAgICAgIGlmICh0aGlzLmlzTW9yZU9wdGlvbnNTaG93bigpKSB7XG4gICAgICAgICAgICB0b3AgPSB0b3AgKyB0b29sdGlwRWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgbGVmdCA9IHRoaXMuZWxlbWVudHNbTU9SRV9PUFRJT05TX0JVVFRPTl9JRF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdDtcbiAgICBcbiAgICAgICAgICAgIHZhciBtb3JlT3B0aW9uc0VsID0gdGhpcy5tb3JlT3B0aW9ucy5nZXRFbGVtZW50KCk7XG4gICAgICAgICAgICB2YXIgc2NyZWVuSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICAgICAgaWYgKHRvcCArIG1vcmVPcHRpb25zRWwub2Zmc2V0SGVpZ2h0ID4gc2NyZWVuSGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdG9wIC09IHRvb2x0aXBFbC5vZmZzZXRIZWlnaHQgKyBtb3JlT3B0aW9uc0VsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsZWZ0ICsgbW9yZU9wdGlvbnNFbC5vZmZzZXRXaWR0aCA+IHNjcmVlbldpZHRoKSB7XG4gICAgICAgICAgICAgICAgbGVmdCA9IHNjcmVlbldpZHRoIC0gbW9yZU9wdGlvbnNFbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGhpcy5tb3JlT3B0aW9ucy5zZXRQb3NpdGlvbihsZWZ0LCB0b3ApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyBlYWNoIGNvbW1hbmQgZWxlbWVudCBpbiB0aGUgdG9vbHRpcC4gXG4gICAgICogXG4gICAgICogVGhpcyBpcyBhdXRvbWF0aWNhbGx5IGNhbGxlZCBvbiBjZXJ0YWluIGV2ZW50cywgYnV0IGNhbiBiZSBjYWxsZWQgbWFudWFsbHkgYXMgd2VsbC5cbiAgICAgKi9cbiAgICB1cGRhdGUoKSB7XG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZWxlbWVudHMpLmZvckVhY2godGhpcy4kdXBkYXRlRWxlbWVudC5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRhY2hlcyB0aGUgdG9vbHRpcCBmcm9tIHRoZSBlZGl0b3IuXG4gICAgICovXG4gICAgZGV0YWNoKCkge1xuICAgICAgICB0aGlzLnRvb2x0aXAuaGlkZSgpO1xuICAgICAgICB0aGlzLm1vcmVPcHRpb25zLmhpZGUoKTtcbiAgICAgICAgdGhpcy4kdXBkYXRlT25Ib3ZlckhhbmRsZXJzKGZhbHNlKTtcbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5vZmYoXCJjaGFuZ2VTZXNzaW9uXCIsIHRoaXMuJG9uRWRpdG9yQ2hhbmdlU2Vzc2lvbik7XG4gICAgICAgICAgICBpZiAodGhpcy5lZGl0b3Iuc2Vzc2lvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNlc3Npb24ub2ZmKFwiY2hhbmdlU2Nyb2xsTGVmdFwiLCB0aGlzLiRvbkNoYW5nZVNjcm9sbCk7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2Vzc2lvbi5vZmYoXCJjaGFuZ2VTY3JvbGxUb3BcIiwgdGhpcy4kb25DaGFuZ2VTY3JvbGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuJG1vdXNlSW5Ub29sdGlwID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gbnVsbDtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy50b29sdGlwICYmIHRoaXMubW9yZU9wdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgICAgICB0aGlzLnRvb2x0aXAuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5tb3JlT3B0aW9ucy5kZXN0cm95KCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVycyA9IHt9O1xuICAgICAgICB0aGlzLmNvbW1hbmRzID0ge307XG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSB7fTtcbiAgICAgICAgdGhpcy50b29sdGlwID0gdGhpcy5tb3JlT3B0aW9ucyA9IHRoaXMucGFyZW50Tm9kZSA9IG51bGw7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGlkXG4gICAgICogQHBhcmFtIHtUb29sdGlwQ29tbWFuZH0gY29tbWFuZFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gZm9yTWFpblRvb2x0aXBcbiAgICAgKi9cbiAgICAkY3JlYXRlQ29tbWFuZChpZCwgY29tbWFuZCwgZm9yTWFpblRvb2x0aXApIHtcbiAgICAgICAgdmFyIHBhcmVudEVsID0gZm9yTWFpblRvb2x0aXAgPyB0aGlzLnRvb2x0aXBFbCA6IHRoaXMubW9yZU9wdGlvbnNFbDtcbiAgICAgICAgdmFyIGtleVBhcnRzID0gW107XG4gICAgICAgIHZhciBiaW5kS2V5ID0gY29tbWFuZC5iaW5kS2V5O1xuICAgICAgICBpZiAoYmluZEtleSkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBiaW5kS2V5ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgIGJpbmRLZXkgPSB1c2VyYWdlbnQuaXNNYWMgPyBiaW5kS2V5Lm1hYyA6IGJpbmRLZXkud2luO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmluZEtleSA9IGJpbmRLZXkuc3BsaXQoXCJ8XCIpWzBdO1xuICAgICAgICAgICAga2V5UGFydHMgPSBiaW5kS2V5LnNwbGl0KFwiLVwiKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAga2V5UGFydHMgPSBrZXlQYXJ0cy5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleURpc3BsYXlNYXBba2V5XSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGtleURpc3BsYXlNYXBba2V5XSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXlEaXNwbGF5TWFwW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodXNlcmFnZW50LmlzTWFjICYmIGtleURpc3BsYXlNYXBba2V5XS5tYWMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBrZXlEaXNwbGF5TWFwW2tleV0ubWFjO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBrZXk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKkB0eXBlIHthbnlbXX0gKi9cbiAgICAgICAgdmFyIGJ1dHRvbk5vZGU7XG4gICAgICAgIGlmIChmb3JNYWluVG9vbHRpcCAmJiBjb21tYW5kLmljb25Dc3NDbGFzcykge1xuICAgICAgICAgICAgLy9Pbmx5IHN1cHBvcnQgaWNvbiBidXR0b24gZm9yIG1haW4gdG9vbHRpcCwgb3RoZXJ3aXNlIGZhbGwgYmFjayB0byB0ZXh0IGJ1dHRvblxuICAgICAgICAgICAgYnV0dG9uTm9kZSA9IFtcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICBjbGFzczogW1wiYWNlX2ljb25fc3ZnXCIsIGNvbW1hbmQuaWNvbkNzc0NsYXNzXS5qb2luKFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiBjb21tYW5kLm5hbWUgKyBcIiAoXCIgKyBjb21tYW5kLmJpbmRLZXkgKyBcIilcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBidXR0b25Ob2RlID0gW1xuICAgICAgICAgICAgICAgIFsnZGl2JywgeyBjbGFzczogVkFMVUVfQ0xBU1NfTkFNRSB9XSxcbiAgICAgICAgICAgICAgICBbJ2RpdicsIHsgY2xhc3M6IENBUFRJT05fQ0xBU1NfTkFNRSB9LCBjb21tYW5kLm5hbWVdXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWYgKGtleVBhcnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGJ1dHRvbk5vZGUucHVzaChcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzOiBLRVlCSU5ESU5HX0NMQVNTX05BTUUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleVBhcnRzLm1hcChmdW5jdGlvbihrZXlQYXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsnZGl2Jywga2V5UGFydF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGRvbS5idWlsZERvbShbJ2RpdicsIHsgY2xhc3M6IFtCVVRUT05fQ0xBU1NfTkFNRSwgY29tbWFuZC5jc3NDbGFzcyB8fCBcIlwiXS5qb2luKFwiIFwiKSwgcmVmOiBpZCB9LCBidXR0b25Ob2RlXSwgcGFyZW50RWwsIHRoaXMuZWxlbWVudHMpO1xuICAgICAgICB0aGlzLmNvbW1hbmRzW2lkXSA9IGNvbW1hbmQ7XG4gICAgICAgIFxuICAgICAgICB2YXIgZXZlbnRMaXN0ZW5lciA9XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEB0aGlzIHtDb21tYW5kQmFyVG9vbHRpcH1cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEludGVybmFsIHZhcmlhYmxlIHRvIHByb3Blcmx5IGhhbmRsZSB3aGVuIHRoZSBtb3JlIG9wdGlvbnMgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgICAgICAgIHRoaXMuJHNob3VsZEhpZGVNb3JlT3B0aW9ucyA9IHRoaXMuaXNNb3JlT3B0aW9uc1Nob3duKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZWxlbWVudHNbaWRdLmRpc2FibGVkICYmIGNvbW1hbmQuZXhlYykge1xuICAgICAgICAgICAgICAgIGNvbW1hbmQuZXhlYyh0aGlzLmVkaXRvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy4kc2hvdWxkSGlkZU1vcmVPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc2V0TW9yZU9wdGlvbnNWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyc1tpZF0gPSBldmVudExpc3RlbmVyO1xuICAgICAgICB0aGlzLmVsZW1lbnRzW2lkXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50TGlzdGVuZXIuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuJHVwZGF0ZUVsZW1lbnQoaWQpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gdmlzaWJsZVxuICAgICAqL1xuICAgICRzZXRNb3JlT3B0aW9uc1Zpc2liaWxpdHkodmlzaWJsZSkge1xuICAgICAgICBpZiAodmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5tb3JlT3B0aW9ucy5zZXRUaGVtZSh0aGlzLmVkaXRvci5yZW5kZXJlci50aGVtZSk7XG4gICAgICAgICAgICB0aGlzLm1vcmVPcHRpb25zLnNldENsYXNzTmFtZShUT09MVElQX0NMQVNTX05BTUUgKyBcIl93cmFwcGVyXCIpO1xuICAgICAgICAgICAgdGhpcy5tb3JlT3B0aW9ucy5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb3JlT3B0aW9ucy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkb25FZGl0b3JDaGFuZ2VTZXNzaW9uKGUpIHtcbiAgICAgICAgaWYgKGUub2xkU2Vzc2lvbikge1xuICAgICAgICAgICAgZS5vbGRTZXNzaW9uLm9mZihcImNoYW5nZVNjcm9sbFRvcFwiLCB0aGlzLiRvbkNoYW5nZVNjcm9sbCk7XG4gICAgICAgICAgICBlLm9sZFNlc3Npb24ub2ZmKFwiY2hhbmdlU2Nyb2xsTGVmdFwiLCB0aGlzLiRvbkNoYW5nZVNjcm9sbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICB9XG5cbiAgICAkb25DaGFuZ2VTY3JvbGwoKSB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvci5yZW5kZXJlciAmJiAodGhpcy5pc1Nob3duKCkgfHwgdGhpcy5nZXRBbHdheXNTaG93KCkpKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5yZW5kZXJlci5vbmNlKFwiYWZ0ZXJSZW5kZXJcIiwgdGhpcy51cGRhdGVQb3NpdGlvbi5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICRvbk1vdXNlTW92ZShlKSB7XG4gICAgICAgIGlmICh0aGlzLiRtb3VzZUluVG9vbHRpcCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJzb3JQb3NpdGlvbiA9IHRoaXMuZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHZhciBjdXJzb3JTY3JlZW5Qb3NpdGlvbiA9IHRoaXMuZWRpdG9yLnJlbmRlcmVyLnRleHRUb1NjcmVlbkNvb3JkaW5hdGVzKGN1cnNvclBvc2l0aW9uLnJvdywgY3Vyc29yUG9zaXRpb24uY29sdW1uKTtcbiAgICAgICAgdmFyIGxpbmVIZWlnaHQgPSB0aGlzLmVkaXRvci5yZW5kZXJlci5saW5lSGVpZ2h0O1xuICAgICAgICBcbiAgICAgICAgdmFyIGlzSW5DdXJyZW50TGluZSA9IGUuY2xpZW50WSA+PSBjdXJzb3JTY3JlZW5Qb3NpdGlvbi5wYWdlWSAmJiBlLmNsaWVudFkgPCBjdXJzb3JTY3JlZW5Qb3NpdGlvbi5wYWdlWSArIGxpbmVIZWlnaHQ7XG5cbiAgICAgICAgaWYgKGlzSW5DdXJyZW50TGluZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2hvd24oKSAmJiAhdGhpcy4kc2hvd1Rvb2x0aXBUaW1lci5pc1BlbmRpbmcoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHNob3dUb29sdGlwVGltZXIuZGVsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLiRoaWRlVG9vbHRpcFRpbWVyLmlzUGVuZGluZygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaGlkZVRvb2x0aXBUaW1lci5jYW5jZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2hvd24oKSAmJiAhdGhpcy4kaGlkZVRvb2x0aXBUaW1lci5pc1BlbmRpbmcoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGhpZGVUb29sdGlwVGltZXIuZGVsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLiRzaG93VG9vbHRpcFRpbWVyLmlzUGVuZGluZygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc2hvd1Rvb2x0aXBUaW1lci5jYW5jZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgICRwcmV2ZW50TW91c2VFdmVudChlKSB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIFxuICAgICRzY2hlZHVsZVRvb2x0aXBGb3JIaWRlKCkge1xuICAgICAgICB0aGlzLiRtb3VzZUluVG9vbHRpcCA9IGZhbHNlO1xuICAgICAgICB0aGlzLiRzaG93VG9vbHRpcFRpbWVyLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLiRoaWRlVG9vbHRpcFRpbWVyLmRlbGF5KCk7XG4gICAgfVxuXG4gICAgJHRvb2x0aXBFbnRlcigpIHtcbiAgICAgICAgdGhpcy4kbW91c2VJblRvb2x0aXAgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy4kc2hvd1Rvb2x0aXBUaW1lci5pc1BlbmRpbmcoKSkge1xuICAgICAgICAgICAgdGhpcy4kc2hvd1Rvb2x0aXBUaW1lci5jYW5jZWwoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy4kaGlkZVRvb2x0aXBUaW1lci5pc1BlbmRpbmcoKSkge1xuICAgICAgICAgICAgdGhpcy4kaGlkZVRvb2x0aXBUaW1lci5jYW5jZWwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2VuYWJsZUhvdmVyXVxuICAgICAqL1xuICAgICR1cGRhdGVPbkhvdmVySGFuZGxlcnMoZW5hYmxlSG92ZXIpIHtcbiAgICAgICAgdmFyIHRvb2x0aXBFbCA9IHRoaXMudG9vbHRpcC5nZXRFbGVtZW50KCk7XG4gICAgICAgIHZhciBtb3JlT3B0aW9uc0VsID0gdGhpcy5tb3JlT3B0aW9ucy5nZXRFbGVtZW50KCk7XG4gICAgICAgIGlmIChlbmFibGVIb3Zlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3Iub24oXCJtb3VzZW1vdmVcIiwgdGhpcy4kb25Nb3VzZU1vdmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLnJlbmRlcmVyLmdldE1vdXNlRXZlbnRUYXJnZXQoKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgdGhpcy4kc2NoZWR1bGVUb29sdGlwRm9ySGlkZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b29sdGlwRWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuJHRvb2x0aXBFbnRlcik7XG4gICAgICAgICAgICB0b29sdGlwRWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuJHNjaGVkdWxlVG9vbHRpcEZvckhpZGUpO1xuICAgICAgICAgICAgbW9yZU9wdGlvbnNFbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy4kdG9vbHRpcEVudGVyKTtcbiAgICAgICAgICAgIG1vcmVPcHRpb25zRWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuJHNjaGVkdWxlVG9vbHRpcEZvckhpZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3Iub2ZmKFwibW91c2Vtb3ZlXCIsIHRoaXMuJG9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5yZW5kZXJlci5nZXRNb3VzZUV2ZW50VGFyZ2V0KCkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIHRoaXMuJHNjaGVkdWxlVG9vbHRpcEZvckhpZGUsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9vbHRpcEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLiR0b29sdGlwRW50ZXIpO1xuICAgICAgICAgICAgdG9vbHRpcEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLiRzY2hlZHVsZVRvb2x0aXBGb3JIaWRlKTtcbiAgICAgICAgICAgIG1vcmVPcHRpb25zRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuJHRvb2x0aXBFbnRlcik7XG4gICAgICAgICAgICBtb3JlT3B0aW9uc0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLiRzY2hlZHVsZVRvb2x0aXBGb3JIaWRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICRzaG93VG9vbHRpcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTaG93bigpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50b29sdGlwLnNldFRoZW1lKHRoaXMuZWRpdG9yLnJlbmRlcmVyLnRoZW1lKTtcbiAgICAgICAgdGhpcy50b29sdGlwLnNldENsYXNzTmFtZShUT09MVElQX0NMQVNTX05BTUUgKyBcIl93cmFwcGVyXCIpO1xuICAgICAgICB0aGlzLnRvb2x0aXAuc2hvdygpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuX3NpZ25hbChcInNob3dcIik7XG4gICAgfVxuICAgICRoaWRlVG9vbHRpcCgpIHtcbiAgICAgICAgdGhpcy4kbW91c2VJblRvb2x0aXAgPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLmlzU2hvd24oKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9yZU9wdGlvbnMuaGlkZSgpO1xuICAgICAgICB0aGlzLnRvb2x0aXAuaGlkZSgpO1xuICAgICAgICB0aGlzLl9zaWduYWwoXCJoaWRlXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAqL1xuICAgICR1cGRhdGVFbGVtZW50KGlkKSB7XG4gICAgICAgIHZhciBjb21tYW5kID0gdGhpcy5jb21tYW5kc1tpZF07XG4gICAgICAgIGlmICghY29tbWFuZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbCA9IHRoaXMuZWxlbWVudHNbaWRdO1xuICAgICAgICB2YXIgY29tbWFuZEVuYWJsZWQgPSBjb21tYW5kLmVuYWJsZWQ7XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGNvbW1hbmRFbmFibGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjb21tYW5kRW5hYmxlZCA9IGNvbW1hbmRFbmFibGVkKHRoaXMuZWRpdG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29tbWFuZC5nZXRWYWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gY29tbWFuZC5nZXRWYWx1ZSh0aGlzLmVkaXRvcik7XG4gICAgICAgICAgICBpZiAoY29tbWFuZC50eXBlID09PSAndGV4dCcpIHtcbiAgICAgICAgICAgICAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb21tYW5kLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICB2YXIgZG9tQ3NzRm4gPSB2YWx1ZSA/IGRvbS5hZGRDc3NDbGFzcyA6IGRvbS5yZW1vdmVDc3NDbGFzcztcbiAgICAgICAgICAgICAgICB2YXIgaXNPblRvb2x0aXAgPSBlbC5wYXJlbnRFbGVtZW50ID09PSB0aGlzLnRvb2x0aXBFbDtcbiAgICAgICAgICAgICAgICBlbC5hcmlhQ2hlY2tlZCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChpc09uVG9vbHRpcCkge1xuICAgICAgICAgICAgICAgICAgICBkb21Dc3NGbihlbCwgXCJhY2Vfc2VsZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWwgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLlwiICsgVkFMVUVfQ0xBU1NfTkFNRSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbUNzc0ZuKGVsLCBcImFjZV9jaGVja21hcmtcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1hbmRFbmFibGVkICYmIGVsLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBkb20ucmVtb3ZlQ3NzQ2xhc3MoZWwsIFwiYWNlX2Rpc2FibGVkXCIpO1xuICAgICAgICAgICAgZWwuYXJpYURpc2FibGVkID0gZWwuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKCFjb21tYW5kRW5hYmxlZCAmJiAhZWwuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGRvbS5hZGRDc3NDbGFzcyhlbCwgXCJhY2VfZGlzYWJsZWRcIik7XG4gICAgICAgICAgICBlbC5hcmlhRGlzYWJsZWQgPSBlbC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcIlwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxub29wLmltcGxlbWVudChDb21tYW5kQmFyVG9vbHRpcC5wcm90b3R5cGUsIEV2ZW50RW1pdHRlcik7XG5cbmRvbS5pbXBvcnRDc3NTdHJpbmcoYFxuLmFjZV90b29sdGlwLiR7VE9PTFRJUF9DTEFTU19OQU1FfV93cmFwcGVyIHtcbiAgICBwYWRkaW5nOiAwO1xufVxuXG4uYWNlX3Rvb2x0aXAgLiR7VE9PTFRJUF9DTEFTU19OQU1FfSB7XG4gICAgcGFkZGluZzogMXB4IDVweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xufVxuXG4uYWNlX3Rvb2x0aXAgLiR7VE9PTFRJUF9DTEFTU19OQU1FfS50b29sdGlwX21vcmVfb3B0aW9ucyB7XG4gICAgcGFkZGluZzogMXB4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbmRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfSB7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIG1hcmdpbjogMXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBwYWRkaW5nOiAycHggNXB4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbmRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfS5hY2Vfc2VsZWN0ZWQsXG5kaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX06aG92ZXI6bm90KC5hY2VfZGlzYWJsZWQpIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbmRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfS5hY2VfZGlzYWJsZWQge1xuICAgIGNvbG9yOiAjNzc3O1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuXG5kaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX0gLmFjZV9pY29uX3N2ZyB7XG4gICAgaGVpZ2h0OiAxMnB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XG59XG5cbmRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfS5hY2VfZGlzYWJsZWQgLmFjZV9pY29uX3N2ZyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzc3Nztcbn1cblxuLiR7VE9PTFRJUF9DTEFTU19OQU1FfS50b29sdGlwX21vcmVfb3B0aW9ucyAuJHtCVVRUT05fQ0xBU1NfTkFNRX0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG59XG5cbi4ke1RPT0xUSVBfQ0xBU1NfTkFNRX0uJHtWQUxVRV9DTEFTU19OQU1FfSB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1cblxuLiR7VE9PTFRJUF9DTEFTU19OQU1FfS50b29sdGlwX21vcmVfb3B0aW9ucyAuJHtWQUxVRV9DTEFTU19OQU1FfSB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHdpZHRoOiAxMnB4O1xufVxuXG4uJHtDQVBUSU9OX0NMQVNTX05BTUV9IHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi4ke0tFWUJJTkRJTkdfQ0xBU1NfTkFNRX0ge1xuICAgIG1hcmdpbjogMCAycHg7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGZvbnQtc2l6ZTogOHB4O1xufVxuXG4uJHtUT09MVElQX0NMQVNTX05BTUV9LnRvb2x0aXBfbW9yZV9vcHRpb25zIC4ke0tFWUJJTkRJTkdfQ0xBU1NfTkFNRX0ge1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xufVxuXG4uJHtLRVlCSU5ESU5HX0NMQVNTX05BTUV9IGRpdiB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIG1pbi13aWR0aDogOHB4O1xuICAgIHBhZGRpbmc6IDJweDtcbiAgICBtYXJnaW46IDAgMXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmFjZV9kYXJrLmFjZV90b29sdGlwIC4ke1RPT0xUSVBfQ0xBU1NfTkFNRX0ge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMzNzM3Mzc7XG4gICAgY29sb3I6ICNlZWU7XG59XG5cbi5hY2VfZGFyayBkaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX0uYWNlX2Rpc2FibGVkIHtcbiAgICBjb2xvcjogIzk3OTc5Nztcbn1cblxuLmFjZV9kYXJrIGRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfS5hY2Vfc2VsZWN0ZWQsXG4uYWNlX2RhcmsgZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9OmhvdmVyOm5vdCguYWNlX2Rpc2FibGVkKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xufVxuXG4uYWNlX2RhcmsgZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9IC5hY2VfaWNvbl9zdmcge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG59XG5cbi5hY2VfZGFyayBkaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX0uYWNlX2Rpc2FibGVkIC5hY2VfaWNvbl9zdmcge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM5Nzk3OTc7XG59XG5cbi5hY2VfZGFyayAuJHtCVVRUT05fQ0xBU1NfTkFNRX0uYWNlX2Rpc2FibGVkIHtcbiAgICBjb2xvcjogIzk3OTc5Nztcbn1cblxuLmFjZV9kYXJrIC4ke0tFWUJJTkRJTkdfQ0xBU1NfTkFNRX0gZGl2IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTc1NzU3O1xufVxuXG4uYWNlX2NoZWNrbWFyazo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAn4pyTJztcbn1cbmAsIFwiY29tbWFuZGJhci5jc3NcIiwgZmFsc2UpO1xuXG5leHBvcnRzLkNvbW1hbmRCYXJUb29sdGlwID0gQ29tbWFuZEJhclRvb2x0aXA7XG5leHBvcnRzLlRPT0xUSVBfQ0xBU1NfTkFNRSA9IFRPT0xUSVBfQ0xBU1NfTkFNRTtcbmV4cG9ydHMuQlVUVE9OX0NMQVNTX05BTUUgPSBCVVRUT05fQ0xBU1NfTkFNRTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgSGFzaEhhbmRsZXIgPSByZXF1aXJlKFwiLi4va2V5Ym9hcmQvaGFzaF9oYW5kbGVyXCIpLkhhc2hIYW5kbGVyO1xudmFyIEFjZUlubGluZSA9IHJlcXVpcmUoXCIuLi9hdXRvY29tcGxldGUvaW5saW5lXCIpLkFjZUlubGluZTtcbnZhciBGaWx0ZXJlZExpc3QgPSByZXF1aXJlKFwiLi4vYXV0b2NvbXBsZXRlXCIpLkZpbHRlcmVkTGlzdDtcbnZhciBDb21wbGV0aW9uUHJvdmlkZXIgPSByZXF1aXJlKFwiLi4vYXV0b2NvbXBsZXRlXCIpLkNvbXBsZXRpb25Qcm92aWRlcjtcbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi4vZWRpdG9yXCIpLkVkaXRvcjtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4uL2F1dG9jb21wbGV0ZS91dGlsXCIpO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9saWIvZG9tXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgQ29tbWFuZEJhclRvb2x0aXAgPSByZXF1aXJlKFwiLi9jb21tYW5kX2JhclwiKS5Db21tYW5kQmFyVG9vbHRpcDtcbnZhciBCVVRUT05fQ0xBU1NfTkFNRSA9IHJlcXVpcmUoXCIuL2NvbW1hbmRfYmFyXCIpLkJVVFRPTl9DTEFTU19OQU1FO1xuXG52YXIgc25pcHBldENvbXBsZXRlciA9IHJlcXVpcmUoXCIuL2xhbmd1YWdlX3Rvb2xzXCIpLnNuaXBwZXRDb21wbGV0ZXI7XG52YXIgdGV4dENvbXBsZXRlciA9IHJlcXVpcmUoXCIuL2xhbmd1YWdlX3Rvb2xzXCIpLnRleHRDb21wbGV0ZXI7XG52YXIga2V5V29yZENvbXBsZXRlciA9IHJlcXVpcmUoXCIuL2xhbmd1YWdlX3Rvb2xzXCIpLmtleVdvcmRDb21wbGV0ZXI7XG5cbnZhciBkZXN0cm95Q29tcGxldGVyID0gZnVuY3Rpb24oZSwgZWRpdG9yKSB7XG4gICAgZWRpdG9yLmNvbXBsZXRlciAmJiBlZGl0b3IuY29tcGxldGVyLmRlc3Ryb3koKTtcbn07XG5cbi8qKlxuICogVGhpcyBjbGFzcyBjb250cm9scyB0aGUgaW5saW5lLW9ubHkgYXV0b2NvbXBsZXRpb24gY29tcG9uZW50cyBhbmQgdGhlaXIgbGlmZWN5Y2xlLlxuICogVGhpcyBpcyBtb3JlIGxpZ2h0d2VpZ2h0IHRoYW4gdGhlIHBvcHVwLWJhc2VkIGF1dG9jb21wbGV0aW9uLCBhcyBpdCBjYW4gb25seSB3b3JrIHdpdGggZXhhY3QgcHJlZml4IG1hdGNoZXMuXG4gKiBUaGVyZSBpcyBhbiBpbmxpbmUgZ2hvc3QgdGV4dCByZW5kZXJlciBhbmQgYW4gb3B0aW9uYWwgY29tbWFuZCBiYXIgdG9vbHRpcCBpbnNpZGUuXG4gKi9cbmNsYXNzIElubGluZUF1dG9jb21wbGV0ZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGVkaXRvcikge1xuICAgICAgICB0aGlzLmVkaXRvciA9IGVkaXRvcjtcbiAgICAgICAgdGhpcy5rZXlib2FyZEhhbmRsZXIgPSBuZXcgSGFzaEhhbmRsZXIodGhpcy5jb21tYW5kcyk7XG4gICAgICAgIHRoaXMuJGluZGV4ID0gLTE7XG5cbiAgICAgICAgdGhpcy5ibHVyTGlzdGVuZXIgPSB0aGlzLmJsdXJMaXN0ZW5lci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNoYW5nZUxpc3RlbmVyID0gdGhpcy5jaGFuZ2VMaXN0ZW5lci5iaW5kKHRoaXMpO1xuXG5cbiAgICAgICAgdGhpcy5jaGFuZ2VUaW1lciA9IGxhbmcuZGVsYXllZENhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNvbXBsZXRpb25zKCk7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHJldHVybiB7QWNlSW5saW5lfVxuICAgICAqL1xuICAgIGdldElubGluZVJlbmRlcmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5saW5lUmVuZGVyZXIpXG4gICAgICAgICAgICB0aGlzLmlubGluZVJlbmRlcmVyID0gbmV3IEFjZUlubGluZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5pbmxpbmVSZW5kZXJlcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtDb21tYW5kQmFyVG9vbHRpcH1cbiAgICAgKi9cbiAgICBnZXRJbmxpbmVUb29sdGlwKCkge1xuICAgICAgICBpZiAoIXRoaXMuaW5saW5lVG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy5pbmxpbmVUb29sdGlwID0gSW5saW5lQXV0b2NvbXBsZXRlLmNyZWF0ZUlubGluZVRvb2x0aXAoZG9jdW1lbnQuYm9keSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmlubGluZVRvb2x0aXA7XG4gICAgfVxuXG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIGlzIHRoZSBlbnRyeSBwb2ludCB0byB0aGUgY2xhc3MuIFRoaXMgdHJpZ2dlcnMgdGhlIGdhdGhlcmluZyBvZiB0aGUgYXV0b2NvbXBsZXRpb24gYW5kIGRpc3BsYXlpbmcgdGhlIHJlc3VsdHM7XG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCIuLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLkNvbXBsZXRpb25PcHRpb25zfSBvcHRpb25zXG4gICAgICovXG4gICAgc2hvdyhvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy5lZGl0b3IuY29tcGxldGVyICE9PSB0aGlzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lZGl0b3IuY29tcGxldGVyKVxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLmNvbXBsZXRlci5kZXRhY2goKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLmNvbXBsZXRlciA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVkaXRvci5vbihcImNoYW5nZVNlbGVjdGlvblwiLCB0aGlzLmNoYW5nZUxpc3RlbmVyKTtcbiAgICAgICAgdGhpcy5lZGl0b3Iub24oXCJibHVyXCIsIHRoaXMuYmx1ckxpc3RlbmVyKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBsZXRpb25zKG9wdGlvbnMpO1xuICAgIH1cblxuICAgICRvcGVuKCkge1xuICAgICAgICBpZiAodGhpcy5lZGl0b3IudGV4dElucHV0LnNldEFyaWFPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci50ZXh0SW5wdXQuc2V0QXJpYU9wdGlvbnMoe30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lZGl0b3Iua2V5QmluZGluZy5hZGRLZXlib2FyZEhhbmRsZXIodGhpcy5rZXlib2FyZEhhbmRsZXIpO1xuICAgICAgICB0aGlzLmdldElubGluZVRvb2x0aXAoKS5hdHRhY2godGhpcy5lZGl0b3IpO1xuXG4gICAgICAgIGlmICh0aGlzLiRpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXgoMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRzaG93Q29tcGxldGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNoYW5nZVRpbWVyLmNhbmNlbCgpO1xuICAgIH1cbiAgICBcbiAgICBpbnNlcnRNYXRjaCgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuZ2V0Q29tcGxldGlvblByb3ZpZGVyKCkuaW5zZXJ0QnlJbmRleCh0aGlzLmVkaXRvciwgdGhpcy4kaW5kZXgpO1xuICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGNoYW5nZUxpc3RlbmVyKGUpIHtcbiAgICAgICAgdmFyIGN1cnNvciA9IHRoaXMuZWRpdG9yLnNlbGVjdGlvbi5sZWFkO1xuICAgICAgICBpZiAoY3Vyc29yLnJvdyAhPSB0aGlzLmJhc2Uucm93IHx8IGN1cnNvci5jb2x1bW4gPCB0aGlzLmJhc2UuY29sdW1uKSB7XG4gICAgICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmFjdGl2YXRlZClcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZXIuc2NoZWR1bGUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICB9XG5cbiAgICBibHVyTGlzdGVuZXIoZSkge1xuICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5JbmxpbmVBdXRvY29tcGxldGVBY3Rpb259IHdoZXJlXG4gICAgICovXG4gICAgZ29Ubyh3aGVyZSkge1xuICAgICAgICBpZiAoIXRoaXMuY29tcGxldGlvbnMgfHwgIXRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29tcGxldGlvbkxlbmd0aCA9IHRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWQubGVuZ3RoO1xuICAgICAgICBzd2l0Y2god2hlcmUudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgY2FzZSBcInByZXZcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnNldEluZGV4KCh0aGlzLiRpbmRleCAtIDEgKyBjb21wbGV0aW9uTGVuZ3RoKSAlIGNvbXBsZXRpb25MZW5ndGgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIm5leHRcIjpcbiAgICAgICAgICAgICAgICB0aGlzLnNldEluZGV4KCh0aGlzLiRpbmRleCArIDEgKyBjb21wbGV0aW9uTGVuZ3RoKSAlIGNvbXBsZXRpb25MZW5ndGgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImZpcnN0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbmRleCgwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJsYXN0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbmRleCh0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkLmxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TGVuZ3RoKCkge1xuICAgICAgICBpZiAoIXRoaXMuY29tcGxldGlvbnMgfHwgIXRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkLmxlbmd0aDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gW2luZGV4XVxuICAgICAqIEByZXR1cm5zIHtpbXBvcnQoXCIuLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLkNvbXBsZXRpb24gfCB1bmRlZmluZWR9XG4gICAgICovXG4gICAgZ2V0RGF0YShpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPT0gdW5kZWZpbmVkIHx8IGluZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZFt0aGlzLiRpbmRleF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZFtpbmRleF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRJbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGluZGV4O1xuICAgIH1cblxuICAgIGlzT3BlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGluZGV4ID49IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHZhbHVlXG4gICAgICovXG4gICAgc2V0SW5kZXgodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBsZXRpb25zIHx8ICF0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld0luZGV4ID0gTWF0aC5tYXgoLTEsIE1hdGgubWluKHRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWQubGVuZ3RoIC0gMSwgdmFsdWUpKTtcbiAgICAgICAgaWYgKG5ld0luZGV4ICE9PSB0aGlzLiRpbmRleCkge1xuICAgICAgICAgICAgdGhpcy4kaW5kZXggPSBuZXdJbmRleDtcbiAgICAgICAgICAgIHRoaXMuJHNob3dDb21wbGV0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHtDb21wbGV0aW9uUHJvdmlkZXJ9XG4gICAgICovXG4gICAgZ2V0Q29tcGxldGlvblByb3ZpZGVyKGluaXRpYWxQb3NpdGlvbikge1xuICAgICAgICBpZiAoIXRoaXMuY29tcGxldGlvblByb3ZpZGVyKVxuICAgICAgICAgICAgdGhpcy5jb21wbGV0aW9uUHJvdmlkZXIgPSBuZXcgQ29tcGxldGlvblByb3ZpZGVyKGluaXRpYWxQb3NpdGlvbik7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbXBsZXRpb25Qcm92aWRlcjtcbiAgICB9XG5cbiAgICAkc2hvd0NvbXBsZXRpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5nZXRJbmxpbmVSZW5kZXJlcigpLnNob3codGhpcy5lZGl0b3IsIHRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWRbdGhpcy4kaW5kZXhdLCB0aGlzLmNvbXBsZXRpb25zLmZpbHRlclRleHQpKSB7XG4gICAgICAgICAgICAvLyBOb3QgYWJsZSB0byBzaG93IHRoZSBjb21wbGV0aW9uLCBoaWRlIHRoZSBwcmV2aW91cyBvbmVcbiAgICAgICAgICAgIHRoaXMuZ2V0SW5saW5lUmVuZGVyZXIoKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuaW5saW5lVG9vbHRpcCAmJiB0aGlzLmlubGluZVRvb2x0aXAuaXNTaG93bigpKSB7XG4gICAgICAgICAgICB0aGlzLmlubGluZVRvb2x0aXAudXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcmV0dXJuIHthbnl9XG4gICAgICovXG4gICAgJHVwZGF0ZVByZWZpeCgpIHtcbiAgICAgICAgdmFyIHBvcyA9IHRoaXMuZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHZhciBwcmVmaXggPSB0aGlzLmVkaXRvci5zZXNzaW9uLmdldFRleHRSYW5nZSh7c3RhcnQ6IHRoaXMuYmFzZSwgZW5kOiBwb3N9KTtcbiAgICAgICAgdGhpcy5jb21wbGV0aW9ucy5zZXRGaWx0ZXIocHJlZml4KTtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldGFjaCgpO1xuICAgICAgICBpZiAodGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZC5sZW5ndGggPT0gMVxuICAgICAgICAmJiB0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkWzBdLnZhbHVlID09IHByZWZpeFxuICAgICAgICAmJiAhdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZFswXS5zbmlwcGV0KVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgIC8vQHRzLWV4cGVjdC1lcnJvciBUT0RPOiBwb3RlbnRpYWwgd3JvbmcgYXJndW1lbnRzXG4gICAgICAgIHRoaXMuJG9wZW4odGhpcy5lZGl0b3IsIHByZWZpeCk7XG4gICAgICAgIHJldHVybiBwcmVmaXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtpbXBvcnQoXCIuLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLkNvbXBsZXRpb25PcHRpb25zfSBbb3B0aW9uc11cbiAgICAgKi9cbiAgICB1cGRhdGVDb21wbGV0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIHZhciBwcmVmaXggPSBcIlwiO1xuICAgICAgICBcbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5tYXRjaGVzKSB7XG4gICAgICAgICAgICB2YXIgcG9zID0gdGhpcy5lZGl0b3IuZ2V0U2VsZWN0aW9uUmFuZ2UoKS5zdGFydDtcbiAgICAgICAgICAgIHRoaXMuYmFzZSA9IHRoaXMuZWRpdG9yLnNlc3Npb24uZG9jLmNyZWF0ZUFuY2hvcihwb3Mucm93LCBwb3MuY29sdW1uKTtcbiAgICAgICAgICAgIHRoaXMuYmFzZS4kaW5zZXJ0UmlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5jb21wbGV0aW9ucyA9IG5ldyBGaWx0ZXJlZExpc3Qob3B0aW9ucy5tYXRjaGVzKTtcbiAgICAgICAgICAgIC8vQHRzLWV4cGVjdC1lcnJvciBUT0RPOiBwb3RlbnRpYWwgd3JvbmcgYXJndW1lbnRzXG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kb3Blbih0aGlzLmVkaXRvciwgXCJcIik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5iYXNlICYmIHRoaXMuY29tcGxldGlvbnMpIHtcbiAgICAgICAgICAgIHByZWZpeCA9IHRoaXMuJHVwZGF0ZVByZWZpeCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNlc3Npb24gPSB0aGlzLmVkaXRvci5nZXRTZXNzaW9uKCk7XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLmVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICB2YXIgcHJlZml4ID0gdXRpbC5nZXRDb21wbGV0aW9uUHJlZml4KHRoaXMuZWRpdG9yKTtcbiAgICAgICAgdGhpcy5iYXNlID0gc2Vzc2lvbi5kb2MuY3JlYXRlQW5jaG9yKHBvcy5yb3csIHBvcy5jb2x1bW4gLSBwcmVmaXgubGVuZ3RoKTtcbiAgICAgICAgdGhpcy5iYXNlLiRpbnNlcnRSaWdodCA9IHRydWU7XG5cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGV4YWN0TWF0Y2g6IHRydWUsXG4gICAgICAgICAgICBpZ25vcmVDYXB0aW9uOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0Q29tcGxldGlvblByb3ZpZGVyKHtcbiAgICAgICAgICAgIHByZWZpeCxcbiAgICAgICAgICAgIGJhc2U6IHRoaXMuYmFzZSxcbiAgICAgICAgICAgIHBvc1xuICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB9KS5wcm92aWRlQ29tcGxldGlvbnModGhpcy5lZGl0b3IsIG9wdGlvbnMsXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEB0aGlzIHtJbmxpbmVBdXRvY29tcGxldGV9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uKGVyciwgY29tcGxldGlvbnMsIGZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbHRlcmVkID0gY29tcGxldGlvbnMuZmlsdGVyZWQ7XG4gICAgICAgICAgICAgICAgdmFyIHByZWZpeCA9IHV0aWwuZ2V0Q29tcGxldGlvblByZWZpeCh0aGlzLmVkaXRvcik7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTm8gcmVzdWx0c1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWZpbHRlcmVkLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRldGFjaCgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIE9uZSByZXN1bHQgZXF1YWxzIHRvIHRoZSBwcmVmaXhcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCA9PSAxICYmIGZpbHRlcmVkWzBdLnZhbHVlID09IHByZWZpeCAmJiAhZmlsdGVyZWRbMF0uc25pcHBldClcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRldGFjaCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRpb25zID0gY29tcGxldGlvbnM7XG4gICAgICAgICAgICAgICAgLy9AdHMtZXhwZWN0LWVycm9yIFRPRE86IHBvdGVudGlhbCB3cm9uZyBhcmd1bWVudHNcbiAgICAgICAgICAgICAgICB0aGlzLiRvcGVuKHRoaXMuZWRpdG9yLCBwcmVmaXgpO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBkZXRhY2goKSB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iua2V5QmluZGluZy5yZW1vdmVLZXlib2FyZEhhbmRsZXIodGhpcy5rZXlib2FyZEhhbmRsZXIpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iub2ZmKFwiY2hhbmdlU2VsZWN0aW9uXCIsIHRoaXMuY2hhbmdlTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iub2ZmKFwiYmx1clwiLCB0aGlzLmJsdXJMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGFuZ2VUaW1lci5jYW5jZWwoKTtcbiAgICAgICAgaWYgKHRoaXMuaW5saW5lVG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy5pbmxpbmVUb29sdGlwLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNldEluZGV4KC0xKTtcblxuICAgICAgICBpZiAodGhpcy5jb21wbGV0aW9uUHJvdmlkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGlvblByb3ZpZGVyLmRldGFjaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaW5saW5lUmVuZGVyZXIgJiYgdGhpcy5pbmxpbmVSZW5kZXJlci5pc09wZW4oKSkge1xuICAgICAgICAgICAgdGhpcy5pbmxpbmVSZW5kZXJlci5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5iYXNlKVxuICAgICAgICAgICAgdGhpcy5iYXNlLmRldGFjaCgpO1xuICAgICAgICB0aGlzLmFjdGl2YXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbXBsZXRpb25Qcm92aWRlciA9IHRoaXMuY29tcGxldGlvbnMgPSB0aGlzLmJhc2UgPSBudWxsO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgIGlmICh0aGlzLmlubGluZVJlbmRlcmVyKVxuICAgICAgICAgICAgdGhpcy5pbmxpbmVSZW5kZXJlci5kZXN0cm95KCk7XG4gICAgICAgIGlmICh0aGlzLmlubGluZVRvb2x0aXApXG4gICAgICAgICAgICB0aGlzLmlubGluZVRvb2x0aXAuZGVzdHJveSgpO1xuICAgICAgICBpZiAodGhpcy5lZGl0b3IgJiYgdGhpcy5lZGl0b3IuY29tcGxldGVyID09IHRoaXMpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLm9mZihcImRlc3Ryb3lcIiwgZGVzdHJveUNvbXBsZXRlcik7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5jb21wbGV0ZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5saW5lVG9vbHRpcCA9IHRoaXMuZWRpdG9yID0gdGhpcy5pbmxpbmVSZW5kZXJlciA9IG51bGw7XG4gICAgfVxuXG4gICAgdXBkYXRlRG9jVG9vbHRpcCgpe1xuICAgIH1cblxufVxuXG4vKipcbiAqIFxuICogQHR5cGUge3tba2V5OiBzdHJpbmddOiBpbXBvcnQoXCIuLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLkNvbW1hbmR9fVxuICovXG5JbmxpbmVBdXRvY29tcGxldGUucHJvdG90eXBlLmNvbW1hbmRzID0ge1xuICAgIFwiUHJldmlvdXNcIjoge1xuICAgICAgICBiaW5kS2V5OiBcIkFsdC1bXCIsXG4gICAgICAgIG5hbWU6IFwiUHJldmlvdXNcIixcbiAgICAgICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgICBlZGl0b3IuY29tcGxldGVyLmdvVG8oXCJwcmV2XCIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcIk5leHRcIjoge1xuICAgICAgICBiaW5kS2V5OiBcIkFsdC1dXCIsXG4gICAgICAgIG5hbWU6IFwiTmV4dFwiLFxuICAgICAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgICAgIGVkaXRvci5jb21wbGV0ZXIuZ29UbyhcIm5leHRcIik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiQWNjZXB0XCI6IHtcbiAgICAgICAgYmluZEtleTogeyB3aW46IFwiVGFifEN0cmwtUmlnaHRcIiwgbWFjOiBcIlRhYnxDbWQtUmlnaHRcIiB9LFxuICAgICAgICBuYW1lOiBcIkFjY2VwdFwiLFxuICAgICAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgICAgIHJldHVybiAvKipAdHlwZXtJbmxpbmVBdXRvY29tcGxldGV9Ki8oZWRpdG9yLmNvbXBsZXRlcikuaW5zZXJ0TWF0Y2goKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJDbG9zZVwiOiB7XG4gICAgICAgIGJpbmRLZXk6IFwiRXNjXCIsXG4gICAgICAgIG5hbWU6IFwiQ2xvc2VcIixcbiAgICAgICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgICBlZGl0b3IuY29tcGxldGVyLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuSW5saW5lQXV0b2NvbXBsZXRlLmZvciA9IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgIGlmIChlZGl0b3IuY29tcGxldGVyIGluc3RhbmNlb2YgSW5saW5lQXV0b2NvbXBsZXRlKSB7XG4gICAgICAgIHJldHVybiBlZGl0b3IuY29tcGxldGVyO1xuICAgIH1cbiAgICBpZiAoZWRpdG9yLmNvbXBsZXRlcikge1xuICAgICAgICBlZGl0b3IuY29tcGxldGVyLmRlc3Ryb3koKTtcbiAgICAgICAgZWRpdG9yLmNvbXBsZXRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgZWRpdG9yLmNvbXBsZXRlciA9IG5ldyBJbmxpbmVBdXRvY29tcGxldGUoZWRpdG9yKTtcbiAgICBlZGl0b3Iub25jZShcImRlc3Ryb3lcIiwgZGVzdHJveUNvbXBsZXRlcik7XG4gICAgcmV0dXJuIGVkaXRvci5jb21wbGV0ZXI7XG59O1xuXG5JbmxpbmVBdXRvY29tcGxldGUuc3RhcnRDb21tYW5kID0ge1xuICAgIG5hbWU6IFwic3RhcnRJbmxpbmVBdXRvY29tcGxldGVcIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGNvbXBsZXRlciA9IElubGluZUF1dG9jb21wbGV0ZS5mb3IoZWRpdG9yKTtcbiAgICAgICAgY29tcGxldGVyLnNob3cob3B0aW9ucyk7XG4gICAgfSxcbiAgICBiaW5kS2V5OiB7IHdpbjogXCJBbHQtQ1wiLCBtYWM6IFwiT3B0aW9uLUNcIiB9XG59O1xuXG5cbnZhciBjb21wbGV0ZXJzID0gW3NuaXBwZXRDb21wbGV0ZXIsIHRleHRDb21wbGV0ZXIsIGtleVdvcmRDb21wbGV0ZXJdO1xuXG5yZXF1aXJlKFwiLi4vY29uZmlnXCIpLmRlZmluZU9wdGlvbnMoRWRpdG9yLnByb3RvdHlwZSwgXCJlZGl0b3JcIiwge1xuICAgIGVuYWJsZUlubGluZUF1dG9jb21wbGV0aW9uOiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdGhpc3tFZGl0b3J9XG4gICAgICAgICAqIEBwYXJhbSB2YWxcbiAgICAgICAgICovXG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbXBsZXRlcnMpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVycyA9IEFycmF5LmlzQXJyYXkodmFsKT8gdmFsIDogY29tcGxldGVycztcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLmFkZENvbW1hbmQoSW5saW5lQXV0b2NvbXBsZXRlLnN0YXJ0Q29tbWFuZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZHMucmVtb3ZlQ29tbWFuZChJbmxpbmVBdXRvY29tcGxldGUuc3RhcnRDb21tYW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgfVxufSk7XG5cbi8qKlxuICogRmFjdG9yeSBtZXRob2QgdG8gY3JlYXRlIGEgY29tbWFuZCBiYXIgdG9vbHRpcCBmb3IgaW5saW5lIGF1dG9jb21wbGV0ZS5cbiAqIFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50RWwgIFRoZSBwYXJlbnQgZWxlbWVudCB3aGVyZSB0aGUgdG9vbHRpcCBIVE1MIGVsZW1lbnRzIHdpbGwgYmUgYWRkZWQuXG4gKiBAcmV0dXJucyB7Q29tbWFuZEJhclRvb2x0aXB9ICAgVGhlIGNvbW1hbmQgYmFyIHRvb2x0aXAgZm9yIGlubGluZSBhdXRvY29tcGxldGVcbiAqL1xuSW5saW5lQXV0b2NvbXBsZXRlLmNyZWF0ZUlubGluZVRvb2x0aXAgPSBmdW5jdGlvbihwYXJlbnRFbCkge1xuICAgIC8qKkB0eXBlIHtDb21tYW5kQmFyVG9vbHRpcH0qL1xuICAgIHZhciBpbmxpbmVUb29sdGlwID0gbmV3IENvbW1hbmRCYXJUb29sdGlwKHBhcmVudEVsKTtcbiAgICBpbmxpbmVUb29sdGlwLnJlZ2lzdGVyQ29tbWFuZChcIlByZXZpb3VzXCIsXG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgSW5saW5lQXV0b2NvbXBsZXRlLnByb3RvdHlwZS5jb21tYW5kc1tcIlByZXZpb3VzXCJdLCB7XG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgIGljb25Dc3NDbGFzczogXCJhY2VfYXJyb3dfcm90YXRlZFwiXG4gICAgICAgIH0pXG4gICAgKTtcbiAgICBpbmxpbmVUb29sdGlwLnJlZ2lzdGVyQ29tbWFuZChcIlBvc2l0aW9uXCIsIHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbiAoZWRpdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gZWRpdG9yID8gWy8qKkB0eXBle0lubGluZUF1dG9jb21wbGV0ZX0qL1xuICAgICAgICAgICAgICAgIChlZGl0b3IuY29tcGxldGVyKS5nZXRJbmRleCgpICsgMSwgLyoqQHR5cGV7SW5saW5lQXV0b2NvbXBsZXRlfSovKGVkaXRvci5jb21wbGV0ZXIpLmdldExlbmd0aCgpXG4gICAgICAgICAgICBdLmpvaW4oXCIvXCIpIDogXCJcIjtcbiAgICAgICAgfSxcbiAgICAgICAgdHlwZTogXCJ0ZXh0XCIsXG4gICAgICAgIGNzc0NsYXNzOiBcImNvbXBsZXRpb25fcG9zaXRpb25cIlxuICAgIH0pO1xuICAgIGlubGluZVRvb2x0aXAucmVnaXN0ZXJDb21tYW5kKFwiTmV4dFwiLFxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgICAgIE9iamVjdC5hc3NpZ24oe30sIElubGluZUF1dG9jb21wbGV0ZS5wcm90b3R5cGUuY29tbWFuZHNbXCJOZXh0XCJdLCB7XG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgIGljb25Dc3NDbGFzczogXCJhY2VfYXJyb3dcIlxuICAgICAgICB9KVxuICAgICk7XG4gICAgaW5saW5lVG9vbHRpcC5yZWdpc3RlckNvbW1hbmQoXCJBY2NlcHRcIixcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBJbmxpbmVBdXRvY29tcGxldGUucHJvdG90eXBlLmNvbW1hbmRzW1wiQWNjZXB0XCJdLCB7XG4gICAgICAgICAgICBlbmFibGVkOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gISFlZGl0b3IgJiYgZWRpdG9yLmNvbXBsZXRlci5nZXRJbmRleCgpID49IDA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIlxuICAgICAgICB9KVxuICAgICk7XG4gICAgaW5saW5lVG9vbHRpcC5yZWdpc3RlckNvbW1hbmQoXCJTaG93VG9vbHRpcFwiLCB7XG4gICAgICAgIG5hbWU6IFwiQWx3YXlzIFNob3cgVG9vbHRpcFwiLFxuICAgICAgICBleGVjOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlubGluZVRvb2x0aXAuc2V0QWx3YXlzU2hvdyghaW5saW5lVG9vbHRpcC5nZXRBbHdheXNTaG93KCkpO1xuICAgICAgICB9LFxuICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5saW5lVG9vbHRpcC5nZXRBbHdheXNTaG93KCk7XG4gICAgICAgIH0sXG4gICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIlxuICAgIH0pO1xuICAgIHJldHVybiBpbmxpbmVUb29sdGlwO1xufTtcblxuZG9tLmltcG9ydENzc1N0cmluZyhgXG5cbi5hY2VfaWNvbl9zdmcuYWNlX2Fycm93LFxuLmFjZV9pY29uX3N2Zy5hY2VfYXJyb3dfcm90YXRlZCB7XG4gICAgLXdlYmtpdC1tYXNrLWltYWdlOiB1cmwoXCJkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUIzYVdSMGFEMGlNVFlpSUdobGFXZG9kRDBpTVRZaUlIWnBaWGRDYjNnOUlqQWdNQ0F4TmlBeE5pSWdabWxzYkQwaWJtOXVaU0lnZUcxc2JuTTlJbWgwZEhBNkx5OTNkM2N1ZHpNdWIzSm5Mekl3TURBdmMzWm5JajQ4Y0dGMGFDQm1hV3hzTFhKMWJHVTlJbVYyWlc1dlpHUWlJR05zYVhBdGNuVnNaVDBpWlhabGJtOWtaQ0lnWkQwaVRUVXVPRE0zTURFZ01UVk1OQzQxT0RjMU1TQXhNeTQzTVRVMVRERXdMakUwTmpnZ09FdzBMalU0TnpVeElESXVNamcwTkRaTU5TNDRNemN3TVNBeFRERXlMalkwTmpVZ09FdzFMamd6TnpBeElERTFXaUlnWm1sc2JEMGlZbXhoWTJzaUx6NDhMM04yWno0PVwiKTtcbn1cblxuLmFjZV9pY29uX3N2Zy5hY2VfYXJyb3dfcm90YXRlZCB7XG4gICAgdHJhbnNmb3JtOiByb3RhdGUoMTgwZGVnKTtcbn1cblxuZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9LmNvbXBsZXRpb25fcG9zaXRpb24ge1xuICAgIHBhZGRpbmc6IDA7XG59XG5gLCBcImlubGluZWF1dG9jb21wbGV0ZS5jc3NcIiwgZmFsc2UpO1xuXG5leHBvcnRzLklubGluZUF1dG9jb21wbGV0ZSA9IElubGluZUF1dG9jb21wbGV0ZTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==