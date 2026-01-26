(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9885,7700],{

/***/ 47700:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * ## Command Bar extension.
 *
 * Provides an interactive command bar tooltip that displays above the editor's active line. The extension enables
 * clickable commands with keyboard shortcuts, icons, and various button types including standard buttons, checkboxes,
 * and text elements. Supports overflow handling with a secondary tooltip for additional commands when space is limited.
 * The tooltip can be configured to always show or display only on mouse hover over the active line.
 *
 * @module
 */

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
/**
 * ## Inline Autocomplete extension
 *
 * Provides lightweight, prefix-based autocompletion with inline ghost text rendering and an optional command bar tooltip.
 * Displays completion suggestions as ghost text directly in the editor with keyboard navigation and interactive controls.
 *
 * **Enable:** `editor.setOption("enableInlineAutocompletion", true)`
 * or configure it during editor initialization in the options object.
 * @module
 */



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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjk4ODUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGFBQWEsNEJBQTRCO0FBQ3pDLGFBQWEsaURBQWlEO0FBQzlEO0FBQ0EsY0FBYyw4Q0FBNkI7QUFDM0MsbUJBQW1CLHlDQUE0QztBQUMvRCxXQUFXLG1CQUFPLENBQUMsS0FBYTtBQUNoQyxVQUFVLG1CQUFPLENBQUMsS0FBWTtBQUM5QixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QixnQkFBZ0IsbUJBQU8sQ0FBQyxLQUFrQjs7QUFFMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyxTQUFTO0FBQ3ZCLGdCQUFnQixTQUFTO0FBQ3pCLGlCQUFpQixTQUFTO0FBQzFCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGFBQWE7QUFDNUIsZUFBZSw2REFBNkQ7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnREFBZ0QsMkJBQTJCO0FBQzNFLG9EQUFvRCxxREFBcUQ7O0FBRXpHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxnQkFBZ0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtQkFBbUI7QUFDbEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFB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QUdBOztBQUVBLDBDQUFrQztBQUNsQztBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLGFBQWEscUJBQXFCO0FBQ2xDO0FBQ0E7QUFDQSxjQUFjLGtCQUFrQjtBQUNoQztBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLG1CQUFtQjtBQUN6RCw0REFBNEQsbUJBQW1CO0FBQy9FO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxNQUFNLGtCQUFrQjtBQUN4QjtBQUNBO0FBQ0E7O0FBRUEsMEJBQTBCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L2NvbW1hbmRfYmFyLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9pbmxpbmVfYXV0b2NvbXBsZXRlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogIyMgQ29tbWFuZCBCYXIgZXh0ZW5zaW9uLlxuICpcbiAqIFByb3ZpZGVzIGFuIGludGVyYWN0aXZlIGNvbW1hbmQgYmFyIHRvb2x0aXAgdGhhdCBkaXNwbGF5cyBhYm92ZSB0aGUgZWRpdG9yJ3MgYWN0aXZlIGxpbmUuIFRoZSBleHRlbnNpb24gZW5hYmxlc1xuICogY2xpY2thYmxlIGNvbW1hbmRzIHdpdGgga2V5Ym9hcmQgc2hvcnRjdXRzLCBpY29ucywgYW5kIHZhcmlvdXMgYnV0dG9uIHR5cGVzIGluY2x1ZGluZyBzdGFuZGFyZCBidXR0b25zLCBjaGVja2JveGVzLFxuICogYW5kIHRleHQgZWxlbWVudHMuIFN1cHBvcnRzIG92ZXJmbG93IGhhbmRsaW5nIHdpdGggYSBzZWNvbmRhcnkgdG9vbHRpcCBmb3IgYWRkaXRpb25hbCBjb21tYW5kcyB3aGVuIHNwYWNlIGlzIGxpbWl0ZWQuXG4gKiBUaGUgdG9vbHRpcCBjYW4gYmUgY29uZmlndXJlZCB0byBhbHdheXMgc2hvdyBvciBkaXNwbGF5IG9ubHkgb24gbW91c2UgaG92ZXIgb3ZlciB0aGUgYWN0aXZlIGxpbmUuXG4gKlxuICogQG1vZHVsZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydChcIi4uL2VkaXRvclwiKS5FZGl0b3J9IEVkaXRvclxuICogQHR5cGVkZWYge2ltcG9ydChcIi4uLy4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuVG9vbHRpcENvbW1hbmR9IFRvb2x0aXBDb21tYW5kXG4gKi9cbnZhciBUb29sdGlwID0gcmVxdWlyZShcIi4uL3Rvb2x0aXBcIikuVG9vbHRpcDtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKFwiLi4vbGliL2V2ZW50X2VtaXR0ZXJcIikuRXZlbnRFbWl0dGVyO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2xpYi9kb21cIik7XG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgdXNlcmFnZW50ID0gcmVxdWlyZShcIi4uL2xpYi91c2VyYWdlbnRcIik7XG5cbnZhciBCVVRUT05fQ0xBU1NfTkFNRSA9ICdjb21tYW5kX2Jhcl90b29sdGlwX2J1dHRvbic7XG52YXIgVkFMVUVfQ0xBU1NfTkFNRSA9ICdjb21tYW5kX2Jhcl9idXR0b25fdmFsdWUnO1xudmFyIENBUFRJT05fQ0xBU1NfTkFNRSA9ICdjb21tYW5kX2Jhcl9idXR0b25fY2FwdGlvbic7XG52YXIgS0VZQklORElOR19DTEFTU19OQU1FID0gJ2NvbW1hbmRfYmFyX2tleWJpbmRpbmcnO1xudmFyIFRPT0xUSVBfQ0xBU1NfTkFNRSA9ICdjb21tYW5kX2Jhcl90b29sdGlwJztcbnZhciBNT1JFX09QVElPTlNfQlVUVE9OX0lEID0gJ01vcmVPcHRpb25zQnV0dG9uJztcblxudmFyIGRlZmF1bHREZWxheSA9IDEwMDtcbnZhciBkZWZhdWx0TWF4RWxlbWVudHMgPSA0O1xuXG52YXIgbWluUG9zaXRpb24gPSBmdW5jdGlvbiAocG9zQSwgcG9zQikge1xuICAgIGlmIChwb3NCLnJvdyA+IHBvc0Eucm93KSB7XG4gICAgICAgIHJldHVybiBwb3NBO1xuICAgIH0gZWxzZSBpZiAocG9zQi5yb3cgPT09IHBvc0Eucm93ICYmIHBvc0IuY29sdW1uID4gcG9zQS5jb2x1bW4pIHtcbiAgICAgICAgcmV0dXJuIHBvc0E7XG4gICAgfVxuICAgIHJldHVybiBwb3NCO1xufTtcblxudmFyIGtleURpc3BsYXlNYXAgPSB7XG4gICAgXCJDdHJsXCI6IHsgbWFjOiBcIl5cIn0sXG4gICAgXCJPcHRpb25cIjogeyBtYWM6IFwi4oylXCJ9LFxuICAgIFwiQ29tbWFuZFwiOiB7IG1hYzogXCLijJhcIn0sXG4gICAgXCJDbWRcIjogeyBtYWM6IFwi4oyYXCJ9LFxuICAgIFwiU2hpZnRcIjogXCLih6dcIixcbiAgICBcIkxlZnRcIjogXCLihpBcIixcbiAgICBcIlJpZ2h0XCI6IFwi4oaSXCIsXG4gICAgXCJVcFwiOiBcIuKGkVwiLFxuICAgIFwiRG93blwiOiBcIuKGk1wiXG59O1xuXG5cbi8qKlxuICogRGlzcGxheXMgYSBjb21tYW5kIHRvb2x0aXAgYWJvdmUgdGhlIGN1cnJlbnRseSBhY3RpdmUgbGluZSBzZWxlY3Rpb24sIHdpdGggY2xpY2thYmxlIGVsZW1lbnRzLlxuICpcbiAqIEludGVybmFsbHkgaXQgaXMgYSBjb21wb3NpdGUgb2YgdHdvIHRvb2x0aXBzLCBvbmUgZm9yIHRoZSBtYWluIHRvb2x0aXAgYW5kIG9uZSBmb3IgdGhlIFxuICogb3ZlcmZsb3dpbmcgY29tbWFuZHMuXG4gKiBUaGUgY29tbWFuZHMgYXJlIGFkZGVkIHNlcXVlbnRpYWxseSBpbiByZWdpc3RyYXRpb24gb3JkZXIuXG4gKiBXaGVuIGF0dGFjaGVkIHRvIGFuIGVkaXRvciwgaXQgaXMgZWl0aGVyIGFsd2F5cyBzaG93biBvciBvbmx5IHdoZW4gdGhlIGFjdGl2ZSBsaW5lIGlzIGhvdmVyZWRcbiAqIHdpdGggbW91c2UsIGRlcGVuZGluZyBvbiB0aGUgYWx3YXlzU2hvdyBwcm9wZXJ0eS5cbiAqL1xuY2xhc3MgQ29tbWFuZEJhclRvb2x0aXAge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudE5vZGVcbiAgICAgKiBAcGFyYW0ge1BhcnRpYWw8aW1wb3J0KFwiLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5Db21tYW5kQmFyT3B0aW9ucz59IFtvcHRpb25zXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHBhcmVudE5vZGUsIG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gICAgICAgIHRoaXMucGFyZW50Tm9kZSA9IHBhcmVudE5vZGU7XG4gICAgICAgIHRoaXMudG9vbHRpcCA9IG5ldyBUb29sdGlwKHRoaXMucGFyZW50Tm9kZSk7XG4gICAgICAgIHRoaXMubW9yZU9wdGlvbnMgPSBuZXcgVG9vbHRpcCh0aGlzLnBhcmVudE5vZGUpO1xuICAgICAgICB0aGlzLm1heEVsZW1lbnRzT25Ub29sdGlwID0gb3B0aW9ucy5tYXhFbGVtZW50c09uVG9vbHRpcCB8fCBkZWZhdWx0TWF4RWxlbWVudHM7XG4gICAgICAgIHRoaXMuJGFsd2F5c1Nob3cgPSBvcHRpb25zLmFsd2F5c1Nob3cgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSB7fTtcbiAgICAgICAgdGhpcy5lbGVtZW50cyA9IHt9O1xuICAgICAgICB0aGlzLmNvbW1hbmRzID0ge307XG5cbiAgICAgICAgdGhpcy50b29sdGlwRWwgPSBkb20uYnVpbGREb20oWydkaXYnLCB7IGNsYXNzOiBUT09MVElQX0NMQVNTX05BTUUgfV0sIHRoaXMudG9vbHRpcC5nZXRFbGVtZW50KCkpO1xuICAgICAgICB0aGlzLm1vcmVPcHRpb25zRWwgPSBkb20uYnVpbGREb20oWydkaXYnLCB7IGNsYXNzOiBUT09MVElQX0NMQVNTX05BTUUgKyBcIiB0b29sdGlwX21vcmVfb3B0aW9uc1wiIH1dLCB0aGlzLm1vcmVPcHRpb25zLmdldEVsZW1lbnQoKSk7XG5cbiAgICAgICAgdGhpcy4kc2hvd1Rvb2x0aXBUaW1lciA9IGxhbmcuZGVsYXllZENhbGwodGhpcy4kc2hvd1Rvb2x0aXAuYmluZCh0aGlzKSwgb3B0aW9ucy5zaG93RGVsYXkgfHwgZGVmYXVsdERlbGF5KTtcbiAgICAgICAgdGhpcy4kaGlkZVRvb2x0aXBUaW1lciA9IGxhbmcuZGVsYXllZENhbGwodGhpcy4kaGlkZVRvb2x0aXAuYmluZCh0aGlzKSwgb3B0aW9ucy5oaWRlRGVsYXkgfHwgZGVmYXVsdERlbGF5KTtcbiAgICAgICAgdGhpcy4kdG9vbHRpcEVudGVyID0gdGhpcy4kdG9vbHRpcEVudGVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuJG9uTW91c2VNb3ZlID0gdGhpcy4kb25Nb3VzZU1vdmUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy4kb25DaGFuZ2VTY3JvbGwgPSB0aGlzLiRvbkNoYW5nZVNjcm9sbC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLiRvbkVkaXRvckNoYW5nZVNlc3Npb24gPSB0aGlzLiRvbkVkaXRvckNoYW5nZVNlc3Npb24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy4kc2NoZWR1bGVUb29sdGlwRm9ySGlkZSA9IHRoaXMuJHNjaGVkdWxlVG9vbHRpcEZvckhpZGUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy4kcHJldmVudE1vdXNlRXZlbnQgPSB0aGlzLiRwcmV2ZW50TW91c2VFdmVudC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIGZvciAodmFyIGV2ZW50IG9mIFtcIm1vdXNlZG93blwiLCBcIm1vdXNldXBcIiwgXCJjbGlja1wiXSkge1xuICAgICAgICAgICAgdGhpcy50b29sdGlwLmdldEVsZW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLiRwcmV2ZW50TW91c2VFdmVudCk7XG4gICAgICAgICAgICB0aGlzLm1vcmVPcHRpb25zLmdldEVsZW1lbnQoKS5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCB0aGlzLiRwcmV2ZW50TW91c2VFdmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlcnMgYSBjb21tYW5kIG9uIHRoZSBjb21tYW5kIGJhciB0b29sdGlwLlxuICAgICAqIFxuICAgICAqIFRoZSBjb21tYW5kcyBhcmUgYWRkZWQgaW4gc2VxdWVudGlhbCBvcmRlci4gSWYgdGhlcmUgaXMgbm90IGVub3VnaCBzcGFjZSBvbiB0aGUgbWFpblxuICAgICAqIHRvb2xiYXIsIHRoZSByZW1haW5pbmcgZWxlbWVudHMgYXJlIGFkZGVkIHRvIHRoZSBvdmVyZmxvdyBtZW51LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZCAgICAgIFxuICAgICAqIEBwYXJhbSB7VG9vbHRpcENvbW1hbmR9IGNvbW1hbmRcbiAgICAgKi9cbiAgICByZWdpc3RlckNvbW1hbmQoaWQsIGNvbW1hbmQpIHtcbiAgICAgICAgdmFyIHJlZ2lzdGVyRm9yTWFpblRvb2x0aXAgPSBPYmplY3Qua2V5cyh0aGlzLmNvbW1hbmRzKS5sZW5ndGggPCB0aGlzLm1heEVsZW1lbnRzT25Ub29sdGlwO1xuICAgICAgICBpZiAoIXJlZ2lzdGVyRm9yTWFpblRvb2x0aXAgJiYgIXRoaXMuZWxlbWVudHNbTU9SRV9PUFRJT05TX0JVVFRPTl9JRF0pIHtcbiAgICAgICAgICAgIHRoaXMuJGNyZWF0ZUNvbW1hbmQoTU9SRV9PUFRJT05TX0JVVFRPTl9JRCwge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiwrfCt8K3XCIsXG4gICAgICAgICAgICAgICAgZXhlYzogXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQHRoaXMge0NvbW1hbmRCYXJUb29sdGlwfVxuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzaG91bGRIaWRlTW9yZU9wdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy4kc2V0TW9yZU9wdGlvbnNWaXNpYmlsaXR5KCF0aGlzLmlzTW9yZU9wdGlvbnNTaG93bigpKTtcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgdHlwZTogXCJjaGVja2JveFwiLFxuICAgICAgICAgICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNNb3JlT3B0aW9uc1Nob3duKCk7XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICAgICAgICAgIH0sIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuJGNyZWF0ZUNvbW1hbmQoaWQsIGNvbW1hbmQsIHJlZ2lzdGVyRm9yTWFpblRvb2x0aXApO1xuICAgICAgICBpZiAodGhpcy5pc1Nob3duKCkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzU2hvd24oKSB7XG4gICAgICAgIHJldHVybiAhIXRoaXMudG9vbHRpcCAmJiB0aGlzLnRvb2x0aXAuaXNPcGVuO1xuICAgIH1cblxuICAgIGlzTW9yZU9wdGlvbnNTaG93bigpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5tb3JlT3B0aW9ucyAmJiB0aGlzLm1vcmVPcHRpb25zLmlzT3BlbjtcbiAgICB9XG5cbiAgICBnZXRBbHdheXNTaG93KCkge1xuICAgICAgICByZXR1cm4gdGhpcy4kYWx3YXlzU2hvdztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHRoZSBkaXNwbGF5IG1vZGUgb2YgdGhlIHRvb2x0aXBcbiAgICAgKiBcbiAgICAgKiBXaGVuIHRydWUsIHRoZSB0b29sdGlwIGlzIGFsd2F5cyBkaXNwbGF5ZWQgd2hpbGUgaXQgaXMgYXR0YWNoZWQgdG8gYW4gZWRpdG9yLlxuICAgICAqIFdoZW4gZmFsc2UsIHRoZSB0b29sdGlwIGlzIGRpc3BsYXllZCBvbmx5IHdoZW4gdGhlIG1vdXNlIGhvdmVycyBvdmVyIHRoZSBhY3RpdmUgZWRpdG9yIGxpbmUuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtib29sZWFufSBhbHdheXNTaG93XG4gICAgICovXG4gICAgc2V0QWx3YXlzU2hvdyhhbHdheXNTaG93KSB7XG4gICAgICAgIHRoaXMuJGFsd2F5c1Nob3cgPSBhbHdheXNTaG93O1xuICAgICAgICB0aGlzLiR1cGRhdGVPbkhvdmVySGFuZGxlcnMoIXRoaXMuJGFsd2F5c1Nob3cpO1xuICAgICAgICB0aGlzLl9zaWduYWwoXCJhbHdheXNTaG93XCIsIHRoaXMuJGFsd2F5c1Nob3cpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEF0dGFjaGVzIHRoZSBjbGlja2FibGUgY29tbWFuZCBiYXIgdG9vbHRpcCB0byBhbiBlZGl0b3JcbiAgICAgKiBcbiAgICAgKiBEZXBlbmRpbmcgb24gdGhlIGFsd2F5c1Nob3cgcGFyYW1ldGVyIGl0IGVpdGhlciBkaXNwbGF5cyB0aGUgdG9vbHRpcCBpbW1lZGlhdGVseSxcbiAgICAgKiBvciBzdWJzY3JpYmVzIHRvIHRoZSBuZWNlc3NhcnkgZXZlbnRzIHRvIGRpc3BsYXkgdGhlIHRvb2x0aXAgb24gaG92ZXIuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICAgICAqL1xuICAgIGF0dGFjaChlZGl0b3IpIHtcbiAgICAgICAgaWYgKCFlZGl0b3IgfHwgKHRoaXMuaXNTaG93bigpICYmIHRoaXMuZWRpdG9yID09PSBlZGl0b3IpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRldGFjaCgpO1xuXG4gICAgICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yO1xuICAgICAgICB0aGlzLmVkaXRvci5vbihcImNoYW5nZVNlc3Npb25cIiwgdGhpcy4kb25FZGl0b3JDaGFuZ2VTZXNzaW9uKTtcbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yLnNlc3Npb24pIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNlc3Npb24ub24oXCJjaGFuZ2VTY3JvbGxMZWZ0XCIsIHRoaXMuJG9uQ2hhbmdlU2Nyb2xsKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNlc3Npb24ub24oXCJjaGFuZ2VTY3JvbGxUb3BcIiwgdGhpcy4kb25DaGFuZ2VTY3JvbGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0QWx3YXlzU2hvdygpKSB7XG4gICAgICAgICAgICB0aGlzLiRzaG93VG9vbHRpcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kdXBkYXRlT25Ib3ZlckhhbmRsZXJzKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbW1hbmQgYmFyIHRvb2x0aXAuIEl0IGFsaWducyBpdHNlbGYgYWJvdmUgdGhlIGFjdGl2ZSBsaW5lIGluIHRoZSBlZGl0b3IuXG4gICAgICovXG4gICAgdXBkYXRlUG9zaXRpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5lZGl0b3IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVuZGVyZXIgPSB0aGlzLmVkaXRvci5yZW5kZXJlcjtcblxuICAgICAgICB2YXIgcmFuZ2VzO1xuICAgICAgICBpZiAodGhpcy5lZGl0b3Iuc2VsZWN0aW9uLmdldEFsbFJhbmdlcykge1xuICAgICAgICAgICAgcmFuZ2VzID0gdGhpcy5lZGl0b3Iuc2VsZWN0aW9uLmdldEFsbFJhbmdlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmFuZ2VzID0gW3RoaXMuZWRpdG9yLmdldFNlbGVjdGlvblJhbmdlKCldO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmFuZ2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtaW5Qb3MgPSBtaW5Qb3NpdGlvbihyYW5nZXNbMF0uc3RhcnQsIHJhbmdlc1swXS5lbmQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgcmFuZ2U7IHJhbmdlID0gcmFuZ2VzW2ldOyBpKyspIHtcbiAgICAgICAgICAgIG1pblBvcyA9IG1pblBvc2l0aW9uKG1pblBvcywgbWluUG9zaXRpb24ocmFuZ2Uuc3RhcnQsIHJhbmdlLmVuZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBvcyA9IHJlbmRlcmVyLiRjdXJzb3JMYXllci5nZXRQaXhlbFBvc2l0aW9uKG1pblBvcywgdHJ1ZSk7XG5cbiAgICAgICAgdmFyIHRvb2x0aXBFbCA9IHRoaXMudG9vbHRpcC5nZXRFbGVtZW50KCk7XG4gICAgICAgIHZhciBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB2YXIgc2NyZWVuSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICB2YXIgcmVjdCA9IHRoaXMuZWRpdG9yLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBwb3MudG9wICs9IHJlY3QudG9wIC0gcmVuZGVyZXIubGF5ZXJDb25maWcub2Zmc2V0O1xuICAgICAgICBwb3MubGVmdCArPSByZWN0LmxlZnQgKyByZW5kZXJlci5ndXR0ZXJXaWR0aCAtIHJlbmRlcmVyLnNjcm9sbExlZnQ7XG5cbiAgICAgICAgdmFyIGN1cnNvclZpc2libGUgPSBwb3MudG9wID49IHJlY3QudG9wICYmIHBvcy50b3AgPD0gcmVjdC5ib3R0b20gJiZcbiAgICAgICAgICAgIHBvcy5sZWZ0ID49IHJlY3QubGVmdCArIHJlbmRlcmVyLmd1dHRlcldpZHRoICYmIHBvcy5sZWZ0IDw9IHJlY3QucmlnaHQ7XG5cbiAgICAgICAgaWYgKCFjdXJzb3JWaXNpYmxlICYmIHRoaXMuaXNTaG93bigpKSB7XG4gICAgICAgICAgICB0aGlzLiRoaWRlVG9vbHRpcCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnNvclZpc2libGUgJiYgIXRoaXMuaXNTaG93bigpICYmIHRoaXMuZ2V0QWx3YXlzU2hvdygpKSB7XG4gICAgICAgICAgICB0aGlzLiRzaG93VG9vbHRpcCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRvcCA9IHBvcy50b3AgLSB0b29sdGlwRWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB2YXIgbGVmdCA9IE1hdGgubWluKHNjcmVlbldpZHRoIC0gdG9vbHRpcEVsLm9mZnNldFdpZHRoLCBwb3MubGVmdCk7XG5cbiAgICAgICAgdmFyIHRvb2x0aXBGaXRzID0gdG9wID49IDAgJiYgdG9wICsgdG9vbHRpcEVsLm9mZnNldEhlaWdodCA8PSBzY3JlZW5IZWlnaHQgJiZcbiAgICAgICAgICAgIGxlZnQgPj0gMCAmJiBsZWZ0ICsgdG9vbHRpcEVsLm9mZnNldFdpZHRoIDw9IHNjcmVlbldpZHRoO1xuXG4gICAgICAgIGlmICghdG9vbHRpcEZpdHMpIHtcbiAgICAgICAgICAgIHRoaXMuJGhpZGVUb29sdGlwKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRvb2x0aXAuc2V0UG9zaXRpb24obGVmdCwgdG9wKTtcblxuICAgICAgICBpZiAodGhpcy5pc01vcmVPcHRpb25zU2hvd24oKSkge1xuICAgICAgICAgICAgdG9wID0gdG9wICsgdG9vbHRpcEVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIGxlZnQgPSB0aGlzLmVsZW1lbnRzW01PUkVfT1BUSU9OU19CVVRUT05fSURdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgXG4gICAgICAgICAgICB2YXIgbW9yZU9wdGlvbnNFbCA9IHRoaXMubW9yZU9wdGlvbnMuZ2V0RWxlbWVudCgpO1xuICAgICAgICAgICAgdmFyIHNjcmVlbkhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgICAgIGlmICh0b3AgKyBtb3JlT3B0aW9uc0VsLm9mZnNldEhlaWdodCA+IHNjcmVlbkhlaWdodCkge1xuICAgICAgICAgICAgICAgIHRvcCAtPSB0b29sdGlwRWwub2Zmc2V0SGVpZ2h0ICsgbW9yZU9wdGlvbnNFbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGVmdCArIG1vcmVPcHRpb25zRWwub2Zmc2V0V2lkdGggPiBzY3JlZW5XaWR0aCkge1xuICAgICAgICAgICAgICAgIGxlZnQgPSBzY3JlZW5XaWR0aCAtIG1vcmVPcHRpb25zRWwub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMubW9yZU9wdGlvbnMuc2V0UG9zaXRpb24obGVmdCwgdG9wKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgZWFjaCBjb21tYW5kIGVsZW1lbnQgaW4gdGhlIHRvb2x0aXAuIFxuICAgICAqIFxuICAgICAqIFRoaXMgaXMgYXV0b21hdGljYWxseSBjYWxsZWQgb24gY2VydGFpbiBldmVudHMsIGJ1dCBjYW4gYmUgY2FsbGVkIG1hbnVhbGx5IGFzIHdlbGwuXG4gICAgICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmVsZW1lbnRzKS5mb3JFYWNoKHRoaXMuJHVwZGF0ZUVsZW1lbnQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgdGhlIHRvb2x0aXAgZnJvbSB0aGUgZWRpdG9yLlxuICAgICAqL1xuICAgIGRldGFjaCgpIHtcbiAgICAgICAgdGhpcy50b29sdGlwLmhpZGUoKTtcbiAgICAgICAgdGhpcy5tb3JlT3B0aW9ucy5oaWRlKCk7XG4gICAgICAgIHRoaXMuJHVwZGF0ZU9uSG92ZXJIYW5kbGVycyhmYWxzZSk7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iub2ZmKFwiY2hhbmdlU2Vzc2lvblwiLCB0aGlzLiRvbkVkaXRvckNoYW5nZVNlc3Npb24pO1xuICAgICAgICAgICAgaWYgKHRoaXMuZWRpdG9yLnNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5zZXNzaW9uLm9mZihcImNoYW5nZVNjcm9sbExlZnRcIiwgdGhpcy4kb25DaGFuZ2VTY3JvbGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNlc3Npb24ub2ZmKFwiY2hhbmdlU2Nyb2xsVG9wXCIsIHRoaXMuJG9uQ2hhbmdlU2Nyb2xsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRtb3VzZUluVG9vbHRpcCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVkaXRvciA9IG51bGw7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMudG9vbHRpcCAmJiB0aGlzLm1vcmVPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgICAgICAgICAgdGhpcy50b29sdGlwLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMubW9yZU9wdGlvbnMuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSB7fTtcbiAgICAgICAgdGhpcy5jb21tYW5kcyA9IHt9O1xuICAgICAgICB0aGlzLmVsZW1lbnRzID0ge307XG4gICAgICAgIHRoaXMudG9vbHRpcCA9IHRoaXMubW9yZU9wdGlvbnMgPSB0aGlzLnBhcmVudE5vZGUgPSBudWxsO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpZFxuICAgICAqIEBwYXJhbSB7VG9vbHRpcENvbW1hbmR9IGNvbW1hbmRcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGZvck1haW5Ub29sdGlwXG4gICAgICovXG4gICAgJGNyZWF0ZUNvbW1hbmQoaWQsIGNvbW1hbmQsIGZvck1haW5Ub29sdGlwKSB7XG4gICAgICAgIHZhciBwYXJlbnRFbCA9IGZvck1haW5Ub29sdGlwID8gdGhpcy50b29sdGlwRWwgOiB0aGlzLm1vcmVPcHRpb25zRWw7XG4gICAgICAgIHZhciBrZXlQYXJ0cyA9IFtdO1xuICAgICAgICB2YXIgYmluZEtleSA9IGNvbW1hbmQuYmluZEtleTtcbiAgICAgICAgaWYgKGJpbmRLZXkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgYmluZEtleSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgICAgICBiaW5kS2V5ID0gdXNlcmFnZW50LmlzTWFjID8gYmluZEtleS5tYWMgOiBiaW5kS2V5LndpbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJpbmRLZXkgPSBiaW5kS2V5LnNwbGl0KFwifFwiKVswXTtcbiAgICAgICAgICAgIGtleVBhcnRzID0gYmluZEtleS5zcGxpdChcIi1cIik7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGtleVBhcnRzID0ga2V5UGFydHMubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgIGlmIChrZXlEaXNwbGF5TWFwW2tleV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXlEaXNwbGF5TWFwW2tleV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5RGlzcGxheU1hcFtrZXldO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHVzZXJhZ2VudC5pc01hYyAmJiBrZXlEaXNwbGF5TWFwW2tleV0ubWFjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ga2V5RGlzcGxheU1hcFtrZXldLm1hYztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4ga2V5O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipAdHlwZSB7YW55W119ICovXG4gICAgICAgIHZhciBidXR0b25Ob2RlO1xuICAgICAgICBpZiAoZm9yTWFpblRvb2x0aXAgJiYgY29tbWFuZC5pY29uQ3NzQ2xhc3MpIHtcbiAgICAgICAgICAgIC8vT25seSBzdXBwb3J0IGljb24gYnV0dG9uIGZvciBtYWluIHRvb2x0aXAsIG90aGVyd2lzZSBmYWxsIGJhY2sgdG8gdGV4dCBidXR0b25cbiAgICAgICAgICAgIGJ1dHRvbk5vZGUgPSBbXG4gICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgY2xhc3M6IFtcImFjZV9pY29uX3N2Z1wiLCBjb21tYW5kLmljb25Dc3NDbGFzc10uam9pbihcIiBcIiksXG4gICAgICAgICAgICAgICAgICAgICBcImFyaWEtbGFiZWxcIjogY29tbWFuZC5uYW1lICsgXCIgKFwiICsgY29tbWFuZC5iaW5kS2V5ICsgXCIpXCJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnV0dG9uTm9kZSA9IFtcbiAgICAgICAgICAgICAgICBbJ2RpdicsIHsgY2xhc3M6IFZBTFVFX0NMQVNTX05BTUUgfV0sXG4gICAgICAgICAgICAgICAgWydkaXYnLCB7IGNsYXNzOiBDQVBUSU9OX0NMQVNTX05BTUUgfSwgY29tbWFuZC5uYW1lXVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmIChrZXlQYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBidXR0b25Ob2RlLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICdkaXYnLFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBjbGFzczogS0VZQklORElOR19DTEFTU19OQU1FIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBrZXlQYXJ0cy5tYXAoZnVuY3Rpb24oa2V5UGFydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbJ2RpdicsIGtleVBhcnRdO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSkgXG4gICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBkb20uYnVpbGREb20oWydkaXYnLCB7IGNsYXNzOiBbQlVUVE9OX0NMQVNTX05BTUUsIGNvbW1hbmQuY3NzQ2xhc3MgfHwgXCJcIl0uam9pbihcIiBcIiksIHJlZjogaWQgfSwgYnV0dG9uTm9kZV0sIHBhcmVudEVsLCB0aGlzLmVsZW1lbnRzKTtcbiAgICAgICAgdGhpcy5jb21tYW5kc1tpZF0gPSBjb21tYW5kO1xuICAgICAgICBcbiAgICAgICAgdmFyIGV2ZW50TGlzdGVuZXIgPVxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAdGhpcyB7Q29tbWFuZEJhclRvb2x0aXB9XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBJbnRlcm5hbCB2YXJpYWJsZSB0byBwcm9wZXJseSBoYW5kbGUgd2hlbiB0aGUgbW9yZSBvcHRpb25zIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgICAgICAgICB0aGlzLiRzaG91bGRIaWRlTW9yZU9wdGlvbnMgPSB0aGlzLmlzTW9yZU9wdGlvbnNTaG93bigpO1xuICAgICAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnRzW2lkXS5kaXNhYmxlZCAmJiBjb21tYW5kLmV4ZWMpIHtcbiAgICAgICAgICAgICAgICBjb21tYW5kLmV4ZWModGhpcy5lZGl0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuJHNob3VsZEhpZGVNb3JlT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIHRoaXMuJHNldE1vcmVPcHRpb25zVmlzaWJpbGl0eShmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnNbaWRdID0gZXZlbnRMaXN0ZW5lcjtcbiAgICAgICAgdGhpcy5lbGVtZW50c1tpZF0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBldmVudExpc3RlbmVyLmJpbmQodGhpcykpO1xuICAgICAgICB0aGlzLiR1cGRhdGVFbGVtZW50KGlkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHZpc2libGVcbiAgICAgKi9cbiAgICAkc2V0TW9yZU9wdGlvbnNWaXNpYmlsaXR5KHZpc2libGUpIHtcbiAgICAgICAgaWYgKHZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMubW9yZU9wdGlvbnMuc2V0VGhlbWUodGhpcy5lZGl0b3IucmVuZGVyZXIudGhlbWUpO1xuICAgICAgICAgICAgdGhpcy5tb3JlT3B0aW9ucy5zZXRDbGFzc05hbWUoVE9PTFRJUF9DTEFTU19OQU1FICsgXCJfd3JhcHBlclwiKTtcbiAgICAgICAgICAgIHRoaXMubW9yZU9wdGlvbnMuc2hvdygpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUG9zaXRpb24oKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubW9yZU9wdGlvbnMuaGlkZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJG9uRWRpdG9yQ2hhbmdlU2Vzc2lvbihlKSB7XG4gICAgICAgIGlmIChlLm9sZFNlc3Npb24pIHtcbiAgICAgICAgICAgIGUub2xkU2Vzc2lvbi5vZmYoXCJjaGFuZ2VTY3JvbGxUb3BcIiwgdGhpcy4kb25DaGFuZ2VTY3JvbGwpO1xuICAgICAgICAgICAgZS5vbGRTZXNzaW9uLm9mZihcImNoYW5nZVNjcm9sbExlZnRcIiwgdGhpcy4kb25DaGFuZ2VTY3JvbGwpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgfVxuXG4gICAgJG9uQ2hhbmdlU2Nyb2xsKCkge1xuICAgICAgICBpZiAodGhpcy5lZGl0b3IucmVuZGVyZXIgJiYgKHRoaXMuaXNTaG93bigpIHx8IHRoaXMuZ2V0QWx3YXlzU2hvdygpKSkge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IucmVuZGVyZXIub25jZShcImFmdGVyUmVuZGVyXCIsIHRoaXMudXBkYXRlUG9zaXRpb24uYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkb25Nb3VzZU1vdmUoZSkge1xuICAgICAgICBpZiAodGhpcy4kbW91c2VJblRvb2x0aXApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY3Vyc29yUG9zaXRpb24gPSB0aGlzLmVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICB2YXIgY3Vyc29yU2NyZWVuUG9zaXRpb24gPSB0aGlzLmVkaXRvci5yZW5kZXJlci50ZXh0VG9TY3JlZW5Db29yZGluYXRlcyhjdXJzb3JQb3NpdGlvbi5yb3csIGN1cnNvclBvc2l0aW9uLmNvbHVtbik7XG4gICAgICAgIHZhciBsaW5lSGVpZ2h0ID0gdGhpcy5lZGl0b3IucmVuZGVyZXIubGluZUhlaWdodDtcbiAgICAgICAgXG4gICAgICAgIHZhciBpc0luQ3VycmVudExpbmUgPSBlLmNsaWVudFkgPj0gY3Vyc29yU2NyZWVuUG9zaXRpb24ucGFnZVkgJiYgZS5jbGllbnRZIDwgY3Vyc29yU2NyZWVuUG9zaXRpb24ucGFnZVkgKyBsaW5lSGVpZ2h0O1xuXG4gICAgICAgIGlmIChpc0luQ3VycmVudExpbmUpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1Nob3duKCkgJiYgIXRoaXMuJHNob3dUb29sdGlwVGltZXIuaXNQZW5kaW5nKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRzaG93VG9vbHRpcFRpbWVyLmRlbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy4kaGlkZVRvb2x0aXBUaW1lci5pc1BlbmRpbmcoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGhpZGVUb29sdGlwVGltZXIuY2FuY2VsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5pc1Nob3duKCkgJiYgIXRoaXMuJGhpZGVUb29sdGlwVGltZXIuaXNQZW5kaW5nKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRoaWRlVG9vbHRpcFRpbWVyLmRlbGF5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy4kc2hvd1Rvb2x0aXBUaW1lci5pc1BlbmRpbmcoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHNob3dUb29sdGlwVGltZXIuY2FuY2VsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkcHJldmVudE1vdXNlRXZlbnQoZSkge1xuICAgICAgICBpZiAodGhpcy5lZGl0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBcbiAgICAkc2NoZWR1bGVUb29sdGlwRm9ySGlkZSgpIHtcbiAgICAgICAgdGhpcy4kbW91c2VJblRvb2x0aXAgPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kc2hvd1Rvb2x0aXBUaW1lci5jYW5jZWwoKTtcbiAgICAgICAgdGhpcy4kaGlkZVRvb2x0aXBUaW1lci5kZWxheSgpO1xuICAgIH1cblxuICAgICR0b29sdGlwRW50ZXIoKSB7XG4gICAgICAgIHRoaXMuJG1vdXNlSW5Ub29sdGlwID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuJHNob3dUb29sdGlwVGltZXIuaXNQZW5kaW5nKCkpIHtcbiAgICAgICAgICAgIHRoaXMuJHNob3dUb29sdGlwVGltZXIuY2FuY2VsKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuJGhpZGVUb29sdGlwVGltZXIuaXNQZW5kaW5nKCkpIHtcbiAgICAgICAgICAgIHRoaXMuJGhpZGVUb29sdGlwVGltZXIuY2FuY2VsKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtlbmFibGVIb3Zlcl1cbiAgICAgKi9cbiAgICAkdXBkYXRlT25Ib3ZlckhhbmRsZXJzKGVuYWJsZUhvdmVyKSB7XG4gICAgICAgIHZhciB0b29sdGlwRWwgPSB0aGlzLnRvb2x0aXAuZ2V0RWxlbWVudCgpO1xuICAgICAgICB2YXIgbW9yZU9wdGlvbnNFbCA9IHRoaXMubW9yZU9wdGlvbnMuZ2V0RWxlbWVudCgpO1xuICAgICAgICBpZiAoZW5hYmxlSG92ZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLm9uKFwibW91c2Vtb3ZlXCIsIHRoaXMuJG9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5yZW5kZXJlci5nZXRNb3VzZUV2ZW50VGFyZ2V0KCkuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIHRoaXMuJHNjaGVkdWxlVG9vbHRpcEZvckhpZGUsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9vbHRpcEVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLiR0b29sdGlwRW50ZXIpO1xuICAgICAgICAgICAgdG9vbHRpcEVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLiRzY2hlZHVsZVRvb2x0aXBGb3JIaWRlKTtcbiAgICAgICAgICAgIG1vcmVPcHRpb25zRWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuJHRvb2x0aXBFbnRlcik7XG4gICAgICAgICAgICBtb3JlT3B0aW9uc0VsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLiRzY2hlZHVsZVRvb2x0aXBGb3JIaWRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLm9mZihcIm1vdXNlbW92ZVwiLCB0aGlzLiRvbk1vdXNlTW92ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3IucmVuZGVyZXIuZ2V0TW91c2VFdmVudFRhcmdldCgpLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCB0aGlzLiRzY2hlZHVsZVRvb2x0aXBGb3JIaWRlLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRvb2x0aXBFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy4kdG9vbHRpcEVudGVyKTtcbiAgICAgICAgICAgIHRvb2x0aXBFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy4kc2NoZWR1bGVUb29sdGlwRm9ySGlkZSk7XG4gICAgICAgICAgICBtb3JlT3B0aW9uc0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLiR0b29sdGlwRW50ZXIpO1xuICAgICAgICAgICAgbW9yZU9wdGlvbnNFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy4kc2NoZWR1bGVUb29sdGlwRm9ySGlkZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkc2hvd1Rvb2x0aXAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzU2hvd24oKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMudG9vbHRpcC5zZXRUaGVtZSh0aGlzLmVkaXRvci5yZW5kZXJlci50aGVtZSk7XG4gICAgICAgIHRoaXMudG9vbHRpcC5zZXRDbGFzc05hbWUoVE9PTFRJUF9DTEFTU19OQU1FICsgXCJfd3JhcHBlclwiKTtcbiAgICAgICAgdGhpcy50b29sdGlwLnNob3coKTtcbiAgICAgICAgdGhpcy51cGRhdGUoKTtcbiAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICB0aGlzLl9zaWduYWwoXCJzaG93XCIpO1xuICAgIH1cbiAgICAkaGlkZVRvb2x0aXAoKSB7XG4gICAgICAgIHRoaXMuJG1vdXNlSW5Ub29sdGlwID0gZmFsc2U7XG4gICAgICAgIGlmICghdGhpcy5pc1Nob3duKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vcmVPcHRpb25zLmhpZGUoKTtcbiAgICAgICAgdGhpcy50b29sdGlwLmhpZGUoKTtcbiAgICAgICAgdGhpcy5fc2lnbmFsKFwiaGlkZVwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaWRcbiAgICAgKi9cbiAgICAkdXBkYXRlRWxlbWVudChpZCkge1xuICAgICAgICB2YXIgY29tbWFuZCA9IHRoaXMuY29tbWFuZHNbaWRdO1xuICAgICAgICBpZiAoIWNvbW1hbmQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZWwgPSB0aGlzLmVsZW1lbnRzW2lkXTtcbiAgICAgICAgdmFyIGNvbW1hbmRFbmFibGVkID0gY29tbWFuZC5lbmFibGVkO1xuICAgICAgICBcbiAgICAgICAgaWYgKHR5cGVvZiBjb21tYW5kRW5hYmxlZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY29tbWFuZEVuYWJsZWQgPSBjb21tYW5kRW5hYmxlZCh0aGlzLmVkaXRvcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIGNvbW1hbmQuZ2V0VmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGNvbW1hbmQuZ2V0VmFsdWUodGhpcy5lZGl0b3IpO1xuICAgICAgICAgICAgaWYgKGNvbW1hbmQudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgICAgICAgZWwudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY29tbWFuZC50eXBlID09PSAnY2hlY2tib3gnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRvbUNzc0ZuID0gdmFsdWUgPyBkb20uYWRkQ3NzQ2xhc3MgOiBkb20ucmVtb3ZlQ3NzQ2xhc3M7XG4gICAgICAgICAgICAgICAgdmFyIGlzT25Ub29sdGlwID0gZWwucGFyZW50RWxlbWVudCA9PT0gdGhpcy50b29sdGlwRWw7XG4gICAgICAgICAgICAgICAgZWwuYXJpYUNoZWNrZWQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBpZiAoaXNPblRvb2x0aXApIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tQ3NzRm4oZWwsIFwiYWNlX3NlbGVjdGVkXCIpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGVsID0gZWwucXVlcnlTZWxlY3RvcihcIi5cIiArIFZBTFVFX0NMQVNTX05BTUUpO1xuICAgICAgICAgICAgICAgICAgICBkb21Dc3NGbihlbCwgXCJhY2VfY2hlY2ttYXJrXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb21tYW5kRW5hYmxlZCAmJiBlbC5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZG9tLnJlbW92ZUNzc0NsYXNzKGVsLCBcImFjZV9kaXNhYmxlZFwiKTtcbiAgICAgICAgICAgIGVsLmFyaWFEaXNhYmxlZCA9IGVsLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgfSBlbHNlIGlmICghY29tbWFuZEVuYWJsZWQgJiYgIWVsLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBkb20uYWRkQ3NzQ2xhc3MoZWwsIFwiYWNlX2Rpc2FibGVkXCIpO1xuICAgICAgICAgICAgZWwuYXJpYURpc2FibGVkID0gZWwuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKFwiZGlzYWJsZWRcIiwgXCJcIik7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbm9vcC5pbXBsZW1lbnQoQ29tbWFuZEJhclRvb2x0aXAucHJvdG90eXBlLCBFdmVudEVtaXR0ZXIpO1xuXG5kb20uaW1wb3J0Q3NzU3RyaW5nKGBcbi5hY2VfdG9vbHRpcC4ke1RPT0xUSVBfQ0xBU1NfTkFNRX1fd3JhcHBlciB7XG4gICAgcGFkZGluZzogMDtcbn1cblxuLmFjZV90b29sdGlwIC4ke1RPT0xUSVBfQ0xBU1NfTkFNRX0ge1xuICAgIHBhZGRpbmc6IDFweCA1cHg7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBwb2ludGVyLWV2ZW50czogYXV0bztcbn1cblxuLmFjZV90b29sdGlwIC4ke1RPT0xUSVBfQ0xBU1NfTkFNRX0udG9vbHRpcF9tb3JlX29wdGlvbnMge1xuICAgIHBhZGRpbmc6IDFweDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG5kaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX0ge1xuICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBtYXJnaW46IDFweDtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgcGFkZGluZzogMnB4IDVweDtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG5kaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX0uYWNlX3NlbGVjdGVkLFxuZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9OmhvdmVyOm5vdCguYWNlX2Rpc2FibGVkKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjEpO1xufVxuXG5kaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX0uYWNlX2Rpc2FibGVkIHtcbiAgICBjb2xvcjogIzc3NztcbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcbn1cblxuZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9IC5hY2VfaWNvbl9zdmcge1xuICAgIGhlaWdodDogMTJweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xufVxuXG5kaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX0uYWNlX2Rpc2FibGVkIC5hY2VfaWNvbl9zdmcge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM3Nzc7XG59XG5cbi4ke1RPT0xUSVBfQ0xBU1NfTkFNRX0udG9vbHRpcF9tb3JlX29wdGlvbnMgLiR7QlVUVE9OX0NMQVNTX05BTUV9IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xufVxuXG4uJHtUT09MVElQX0NMQVNTX05BTUV9LiR7VkFMVUVfQ0xBU1NfTkFNRX0ge1xuICAgIGRpc3BsYXk6IG5vbmU7XG59XG5cbi4ke1RPT0xUSVBfQ0xBU1NfTkFNRX0udG9vbHRpcF9tb3JlX29wdGlvbnMgLiR7VkFMVUVfQ0xBU1NfTkFNRX0ge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICB3aWR0aDogMTJweDtcbn1cblxuLiR7Q0FQVElPTl9DTEFTU19OQU1FfSB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xufVxuXG4uJHtLRVlCSU5ESU5HX0NMQVNTX05BTUV9IHtcbiAgICBtYXJnaW46IDAgMnB4O1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBmb250LXNpemU6IDhweDtcbn1cblxuLiR7VE9PTFRJUF9DTEFTU19OQU1FfS50b29sdGlwX21vcmVfb3B0aW9ucyAuJHtLRVlCSU5ESU5HX0NMQVNTX05BTUV9IHtcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcbn1cblxuLiR7S0VZQklORElOR19DTEFTU19OQU1FfSBkaXYge1xuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICBtaW4td2lkdGg6IDhweDtcbiAgICBwYWRkaW5nOiAycHg7XG4gICAgbWFyZ2luOiAwIDFweDtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2NjYztcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5cbi5hY2VfZGFyay5hY2VfdG9vbHRpcCAuJHtUT09MVElQX0NMQVNTX05BTUV9IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzczNzM3O1xuICAgIGNvbG9yOiAjZWVlO1xufVxuXG4uYWNlX2RhcmsgZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9LmFjZV9kaXNhYmxlZCB7XG4gICAgY29sb3I6ICM5Nzk3OTc7XG59XG5cbi5hY2VfZGFyayBkaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX0uYWNlX3NlbGVjdGVkLFxuLmFjZV9kYXJrIGRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfTpob3Zlcjpub3QoLmFjZV9kaXNhYmxlZCkge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKTtcbn1cblxuLmFjZV9kYXJrIGRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfSAuYWNlX2ljb25fc3ZnIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVlO1xufVxuXG4uYWNlX2RhcmsgZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9LmFjZV9kaXNhYmxlZCAuYWNlX2ljb25fc3ZnIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjOTc5Nzk3O1xufVxuXG4uYWNlX2RhcmsgLiR7QlVUVE9OX0NMQVNTX05BTUV9LmFjZV9kaXNhYmxlZCB7XG4gICAgY29sb3I6ICM5Nzk3OTc7XG59XG5cbi5hY2VfZGFyayAuJHtLRVlCSU5ESU5HX0NMQVNTX05BTUV9IGRpdiB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzU3NTc1Nztcbn1cblxuLmFjZV9jaGVja21hcms6OmJlZm9yZSB7XG4gICAgY29udGVudDogJ+Kckyc7XG59XG5gLCBcImNvbW1hbmRiYXIuY3NzXCIsIGZhbHNlKTtcblxuZXhwb3J0cy5Db21tYW5kQmFyVG9vbHRpcCA9IENvbW1hbmRCYXJUb29sdGlwO1xuZXhwb3J0cy5UT09MVElQX0NMQVNTX05BTUUgPSBUT09MVElQX0NMQVNTX05BTUU7XG5leHBvcnRzLkJVVFRPTl9DTEFTU19OQU1FID0gQlVUVE9OX0NMQVNTX05BTUU7XG4iLCIvKipcbiAqICMjIElubGluZSBBdXRvY29tcGxldGUgZXh0ZW5zaW9uXG4gKlxuICogUHJvdmlkZXMgbGlnaHR3ZWlnaHQsIHByZWZpeC1iYXNlZCBhdXRvY29tcGxldGlvbiB3aXRoIGlubGluZSBnaG9zdCB0ZXh0IHJlbmRlcmluZyBhbmQgYW4gb3B0aW9uYWwgY29tbWFuZCBiYXIgdG9vbHRpcC5cbiAqIERpc3BsYXlzIGNvbXBsZXRpb24gc3VnZ2VzdGlvbnMgYXMgZ2hvc3QgdGV4dCBkaXJlY3RseSBpbiB0aGUgZWRpdG9yIHdpdGgga2V5Ym9hcmQgbmF2aWdhdGlvbiBhbmQgaW50ZXJhY3RpdmUgY29udHJvbHMuXG4gKlxuICogKipFbmFibGU6KiogYGVkaXRvci5zZXRPcHRpb24oXCJlbmFibGVJbmxpbmVBdXRvY29tcGxldGlvblwiLCB0cnVlKWBcbiAqIG9yIGNvbmZpZ3VyZSBpdCBkdXJpbmcgZWRpdG9yIGluaXRpYWxpemF0aW9uIGluIHRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBtb2R1bGVcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIEhhc2hIYW5kbGVyID0gcmVxdWlyZShcIi4uL2tleWJvYXJkL2hhc2hfaGFuZGxlclwiKS5IYXNoSGFuZGxlcjtcbnZhciBBY2VJbmxpbmUgPSByZXF1aXJlKFwiLi4vYXV0b2NvbXBsZXRlL2lubGluZVwiKS5BY2VJbmxpbmU7XG52YXIgRmlsdGVyZWRMaXN0ID0gcmVxdWlyZShcIi4uL2F1dG9jb21wbGV0ZVwiKS5GaWx0ZXJlZExpc3Q7XG52YXIgQ29tcGxldGlvblByb3ZpZGVyID0gcmVxdWlyZShcIi4uL2F1dG9jb21wbGV0ZVwiKS5Db21wbGV0aW9uUHJvdmlkZXI7XG52YXIgRWRpdG9yID0gcmVxdWlyZShcIi4uL2VkaXRvclwiKS5FZGl0b3I7XG52YXIgdXRpbCA9IHJlcXVpcmUoXCIuLi9hdXRvY29tcGxldGUvdXRpbFwiKTtcbnZhciBkb20gPSByZXF1aXJlKFwiLi4vbGliL2RvbVwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIENvbW1hbmRCYXJUb29sdGlwID0gcmVxdWlyZShcIi4vY29tbWFuZF9iYXJcIikuQ29tbWFuZEJhclRvb2x0aXA7XG52YXIgQlVUVE9OX0NMQVNTX05BTUUgPSByZXF1aXJlKFwiLi9jb21tYW5kX2JhclwiKS5CVVRUT05fQ0xBU1NfTkFNRTtcblxudmFyIHNuaXBwZXRDb21wbGV0ZXIgPSByZXF1aXJlKFwiLi9sYW5ndWFnZV90b29sc1wiKS5zbmlwcGV0Q29tcGxldGVyO1xudmFyIHRleHRDb21wbGV0ZXIgPSByZXF1aXJlKFwiLi9sYW5ndWFnZV90b29sc1wiKS50ZXh0Q29tcGxldGVyO1xudmFyIGtleVdvcmRDb21wbGV0ZXIgPSByZXF1aXJlKFwiLi9sYW5ndWFnZV90b29sc1wiKS5rZXlXb3JkQ29tcGxldGVyO1xuXG52YXIgZGVzdHJveUNvbXBsZXRlciA9IGZ1bmN0aW9uKGUsIGVkaXRvcikge1xuICAgIGVkaXRvci5jb21wbGV0ZXIgJiYgZWRpdG9yLmNvbXBsZXRlci5kZXN0cm95KCk7XG59O1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgY29udHJvbHMgdGhlIGlubGluZS1vbmx5IGF1dG9jb21wbGV0aW9uIGNvbXBvbmVudHMgYW5kIHRoZWlyIGxpZmVjeWNsZS5cbiAqIFRoaXMgaXMgbW9yZSBsaWdodHdlaWdodCB0aGFuIHRoZSBwb3B1cC1iYXNlZCBhdXRvY29tcGxldGlvbiwgYXMgaXQgY2FuIG9ubHkgd29yayB3aXRoIGV4YWN0IHByZWZpeCBtYXRjaGVzLlxuICogVGhlcmUgaXMgYW4gaW5saW5lIGdob3N0IHRleHQgcmVuZGVyZXIgYW5kIGFuIG9wdGlvbmFsIGNvbW1hbmQgYmFyIHRvb2x0aXAgaW5zaWRlLlxuICovXG5jbGFzcyBJbmxpbmVBdXRvY29tcGxldGUge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihlZGl0b3IpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBlZGl0b3I7XG4gICAgICAgIHRoaXMua2V5Ym9hcmRIYW5kbGVyID0gbmV3IEhhc2hIYW5kbGVyKHRoaXMuY29tbWFuZHMpO1xuICAgICAgICB0aGlzLiRpbmRleCA9IC0xO1xuXG4gICAgICAgIHRoaXMuYmx1ckxpc3RlbmVyID0gdGhpcy5ibHVyTGlzdGVuZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jaGFuZ2VMaXN0ZW5lciA9IHRoaXMuY2hhbmdlTGlzdGVuZXIuYmluZCh0aGlzKTtcblxuXG4gICAgICAgIHRoaXMuY2hhbmdlVGltZXIgPSBsYW5nLmRlbGF5ZWRDYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVDb21wbGV0aW9ucygpO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEByZXR1cm4ge0FjZUlubGluZX1cbiAgICAgKi9cbiAgICBnZXRJbmxpbmVSZW5kZXJlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlubGluZVJlbmRlcmVyKVxuICAgICAgICAgICAgdGhpcy5pbmxpbmVSZW5kZXJlciA9IG5ldyBBY2VJbmxpbmUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5saW5lUmVuZGVyZXI7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7Q29tbWFuZEJhclRvb2x0aXB9XG4gICAgICovXG4gICAgZ2V0SW5saW5lVG9vbHRpcCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlubGluZVRvb2x0aXApIHtcbiAgICAgICAgICAgIHRoaXMuaW5saW5lVG9vbHRpcCA9IElubGluZUF1dG9jb21wbGV0ZS5jcmVhdGVJbmxpbmVUb29sdGlwKGRvY3VtZW50LmJvZHkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pbmxpbmVUb29sdGlwO1xuICAgIH1cblxuXG4gICAgLyoqXG4gICAgICogVGhpcyBmdW5jdGlvbiBpcyB0aGUgZW50cnkgcG9pbnQgdG8gdGhlIGNsYXNzLiBUaGlzIHRyaWdnZXJzIHRoZSBnYXRoZXJpbmcgb2YgdGhlIGF1dG9jb21wbGV0aW9uIGFuZCBkaXNwbGF5aW5nIHRoZSByZXN1bHRzO1xuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5Db21wbGV0aW9uT3B0aW9uc30gb3B0aW9uc1xuICAgICAqL1xuICAgIHNob3cob3B0aW9ucykge1xuICAgICAgICB0aGlzLmFjdGl2YXRlZCA9IHRydWU7XG5cbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yLmNvbXBsZXRlciAhPT0gdGhpcykge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWRpdG9yLmNvbXBsZXRlcilcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5jb21wbGV0ZXIuZGV0YWNoKCk7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5jb21wbGV0ZXIgPSB0aGlzO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lZGl0b3Iub24oXCJjaGFuZ2VTZWxlY3Rpb25cIiwgdGhpcy5jaGFuZ2VMaXN0ZW5lcik7XG4gICAgICAgIHRoaXMuZWRpdG9yLm9uKFwiYmx1clwiLCB0aGlzLmJsdXJMaXN0ZW5lcik7XG5cbiAgICAgICAgdGhpcy51cGRhdGVDb21wbGV0aW9ucyhvcHRpb25zKTtcbiAgICB9XG5cbiAgICAkb3BlbigpIHtcbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yLnRleHRJbnB1dC5zZXRBcmlhT3B0aW9ucykge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IudGV4dElucHV0LnNldEFyaWFPcHRpb25zKHt9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZWRpdG9yLmtleUJpbmRpbmcuYWRkS2V5Ym9hcmRIYW5kbGVyKHRoaXMua2V5Ym9hcmRIYW5kbGVyKTtcbiAgICAgICAgdGhpcy5nZXRJbmxpbmVUb29sdGlwKCkuYXR0YWNoKHRoaXMuZWRpdG9yKTtcblxuICAgICAgICBpZiAodGhpcy4kaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLnNldEluZGV4KDApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kc2hvd0NvbXBsZXRpb24oKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5jaGFuZ2VUaW1lci5jYW5jZWwoKTtcbiAgICB9XG4gICAgXG4gICAgaW5zZXJ0TWF0Y2goKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB0aGlzLmdldENvbXBsZXRpb25Qcm92aWRlcigpLmluc2VydEJ5SW5kZXgodGhpcy5lZGl0b3IsIHRoaXMuJGluZGV4KTtcbiAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjaGFuZ2VMaXN0ZW5lcihlKSB7XG4gICAgICAgIHZhciBjdXJzb3IgPSB0aGlzLmVkaXRvci5zZWxlY3Rpb24ubGVhZDtcbiAgICAgICAgaWYgKGN1cnNvci5yb3cgIT0gdGhpcy5iYXNlLnJvdyB8fCBjdXJzb3IuY29sdW1uIDwgdGhpcy5iYXNlLmNvbHVtbikge1xuICAgICAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5hY3RpdmF0ZWQpXG4gICAgICAgICAgICB0aGlzLmNoYW5nZVRpbWVyLnNjaGVkdWxlKCk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgfVxuXG4gICAgYmx1ckxpc3RlbmVyKGUpIHtcbiAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2ltcG9ydChcIi4uLy4uL2FjZS1pbnRlcm5hbFwiKS5BY2UuSW5saW5lQXV0b2NvbXBsZXRlQWN0aW9ufSB3aGVyZVxuICAgICAqL1xuICAgIGdvVG8od2hlcmUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBsZXRpb25zIHx8ICF0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbXBsZXRpb25MZW5ndGggPSB0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkLmxlbmd0aDtcbiAgICAgICAgc3dpdGNoKHdoZXJlLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJwcmV2XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbmRleCgodGhpcy4kaW5kZXggLSAxICsgY29tcGxldGlvbkxlbmd0aCkgJSBjb21wbGV0aW9uTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJuZXh0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbmRleCgodGhpcy4kaW5kZXggKyAxICsgY29tcGxldGlvbkxlbmd0aCkgJSBjb21wbGV0aW9uTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJmaXJzdFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SW5kZXgoMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibGFzdFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SW5kZXgodGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExlbmd0aCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBsZXRpb25zIHx8ICF0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZC5sZW5ndGg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtpbmRleF1cbiAgICAgKiBAcmV0dXJucyB7aW1wb3J0KFwiLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5Db21wbGV0aW9uIHwgdW5kZWZpbmVkfVxuICAgICAqL1xuICAgIGdldERhdGEoaW5kZXgpIHtcbiAgICAgICAgaWYgKGluZGV4ID09IHVuZGVmaW5lZCB8fCBpbmRleCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWRbdGhpcy4kaW5kZXhdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWRbaW5kZXhdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0SW5kZXgoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRpbmRleDtcbiAgICB9XG5cbiAgICBpc09wZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRpbmRleCA+PSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB2YWx1ZVxuICAgICAqL1xuICAgIHNldEluZGV4KHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5jb21wbGV0aW9ucyB8fCAhdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXdJbmRleCA9IE1hdGgubWF4KC0xLCBNYXRoLm1pbih0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkLmxlbmd0aCAtIDEsIHZhbHVlKSk7XG4gICAgICAgIGlmIChuZXdJbmRleCAhPT0gdGhpcy4kaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuJGluZGV4ID0gbmV3SW5kZXg7XG4gICAgICAgICAgICB0aGlzLiRzaG93Q29tcGxldGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7Q29tcGxldGlvblByb3ZpZGVyfVxuICAgICAqL1xuICAgIGdldENvbXBsZXRpb25Qcm92aWRlcihpbml0aWFsUG9zaXRpb24pIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBsZXRpb25Qcm92aWRlcilcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGlvblByb3ZpZGVyID0gbmV3IENvbXBsZXRpb25Qcm92aWRlcihpbml0aWFsUG9zaXRpb24pO1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wbGV0aW9uUHJvdmlkZXI7XG4gICAgfVxuXG4gICAgJHNob3dDb21wbGV0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuZ2V0SW5saW5lUmVuZGVyZXIoKS5zaG93KHRoaXMuZWRpdG9yLCB0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkW3RoaXMuJGluZGV4XSwgdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJUZXh0KSkge1xuICAgICAgICAgICAgLy8gTm90IGFibGUgdG8gc2hvdyB0aGUgY29tcGxldGlvbiwgaGlkZSB0aGUgcHJldmlvdXMgb25lXG4gICAgICAgICAgICB0aGlzLmdldElubGluZVJlbmRlcmVyKCkuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlubGluZVRvb2x0aXAgJiYgdGhpcy5pbmxpbmVUb29sdGlwLmlzU2hvd24oKSkge1xuICAgICAgICAgICAgdGhpcy5pbmxpbmVUb29sdGlwLnVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHJldHVybiB7YW55fVxuICAgICAqL1xuICAgICR1cGRhdGVQcmVmaXgoKSB7XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLmVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICB2YXIgcHJlZml4ID0gdGhpcy5lZGl0b3Iuc2Vzc2lvbi5nZXRUZXh0UmFuZ2Uoe3N0YXJ0OiB0aGlzLmJhc2UsIGVuZDogcG9zfSk7XG4gICAgICAgIHRoaXMuY29tcGxldGlvbnMuc2V0RmlsdGVyKHByZWZpeCk7XG4gICAgICAgIGlmICghdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZC5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXRhY2goKTtcbiAgICAgICAgaWYgKHRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWQubGVuZ3RoID09IDFcbiAgICAgICAgJiYgdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZFswXS52YWx1ZSA9PSBwcmVmaXhcbiAgICAgICAgJiYgIXRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWRbMF0uc25pcHBldClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldGFjaCgpO1xuICAgICAgICAvL0B0cy1leHBlY3QtZXJyb3IgVE9ETzogcG90ZW50aWFsIHdyb25nIGFyZ3VtZW50c1xuICAgICAgICB0aGlzLiRvcGVuKHRoaXMuZWRpdG9yLCBwcmVmaXgpO1xuICAgICAgICByZXR1cm4gcHJlZml4O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5Db21wbGV0aW9uT3B0aW9uc30gW29wdGlvbnNdXG4gICAgICovXG4gICAgdXBkYXRlQ29tcGxldGlvbnMob3B0aW9ucykge1xuICAgICAgICB2YXIgcHJlZml4ID0gXCJcIjtcbiAgICAgICAgXG4gICAgICAgIGlmIChvcHRpb25zICYmIG9wdGlvbnMubWF0Y2hlcykge1xuICAgICAgICAgICAgdmFyIHBvcyA9IHRoaXMuZWRpdG9yLmdldFNlbGVjdGlvblJhbmdlKCkuc3RhcnQ7XG4gICAgICAgICAgICB0aGlzLmJhc2UgPSB0aGlzLmVkaXRvci5zZXNzaW9uLmRvYy5jcmVhdGVBbmNob3IocG9zLnJvdywgcG9zLmNvbHVtbik7XG4gICAgICAgICAgICB0aGlzLmJhc2UuJGluc2VydFJpZ2h0ID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGlvbnMgPSBuZXcgRmlsdGVyZWRMaXN0KG9wdGlvbnMubWF0Y2hlcyk7XG4gICAgICAgICAgICAvL0B0cy1leHBlY3QtZXJyb3IgVE9ETzogcG90ZW50aWFsIHdyb25nIGFyZ3VtZW50c1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJG9wZW4odGhpcy5lZGl0b3IsIFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYmFzZSAmJiB0aGlzLmNvbXBsZXRpb25zKSB7XG4gICAgICAgICAgICBwcmVmaXggPSB0aGlzLiR1cGRhdGVQcmVmaXgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZXNzaW9uID0gdGhpcy5lZGl0b3IuZ2V0U2Vzc2lvbigpO1xuICAgICAgICB2YXIgcG9zID0gdGhpcy5lZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHByZWZpeCA9IHV0aWwuZ2V0Q29tcGxldGlvblByZWZpeCh0aGlzLmVkaXRvcik7XG4gICAgICAgIHRoaXMuYmFzZSA9IHNlc3Npb24uZG9jLmNyZWF0ZUFuY2hvcihwb3Mucm93LCBwb3MuY29sdW1uIC0gcHJlZml4Lmxlbmd0aCk7XG4gICAgICAgIHRoaXMuYmFzZS4kaW5zZXJ0UmlnaHQgPSB0cnVlO1xuXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBleGFjdE1hdGNoOiB0cnVlLFxuICAgICAgICAgICAgaWdub3JlQ2FwdGlvbjogdHJ1ZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmdldENvbXBsZXRpb25Qcm92aWRlcih7XG4gICAgICAgICAgICBwcmVmaXgsXG4gICAgICAgICAgICBiYXNlOiB0aGlzLmJhc2UsXG4gICAgICAgICAgICBwb3NcbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgfSkucHJvdmlkZUNvbXBsZXRpb25zKHRoaXMuZWRpdG9yLCBvcHRpb25zLFxuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAdGhpcyB7SW5saW5lQXV0b2NvbXBsZXRlfVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBmdW5jdGlvbihlcnIsIGNvbXBsZXRpb25zLCBmaW5pc2hlZCkge1xuICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJlZCA9IGNvbXBsZXRpb25zLmZpbHRlcmVkO1xuICAgICAgICAgICAgICAgIHZhciBwcmVmaXggPSB1dGlsLmdldENvbXBsZXRpb25QcmVmaXgodGhpcy5lZGl0b3IpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZpbmlzaGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIE5vIHJlc3VsdHNcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFmaWx0ZXJlZC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kZXRhY2goKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBPbmUgcmVzdWx0IGVxdWFscyB0byB0aGUgcHJlZml4XG4gICAgICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGggPT0gMSAmJiBmaWx0ZXJlZFswXS52YWx1ZSA9PSBwcmVmaXggJiYgIWZpbHRlcmVkWzBdLnNuaXBwZXQpXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kZXRhY2goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5jb21wbGV0aW9ucyA9IGNvbXBsZXRpb25zO1xuICAgICAgICAgICAgICAgIC8vQHRzLWV4cGVjdC1lcnJvciBUT0RPOiBwb3RlbnRpYWwgd3JvbmcgYXJndW1lbnRzXG4gICAgICAgICAgICAgICAgdGhpcy4kb3Blbih0aGlzLmVkaXRvciwgcHJlZml4KTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgZGV0YWNoKCkge1xuICAgICAgICBpZiAodGhpcy5lZGl0b3IpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLmtleUJpbmRpbmcucmVtb3ZlS2V5Ym9hcmRIYW5kbGVyKHRoaXMua2V5Ym9hcmRIYW5kbGVyKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLm9mZihcImNoYW5nZVNlbGVjdGlvblwiLCB0aGlzLmNoYW5nZUxpc3RlbmVyKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLm9mZihcImJsdXJcIiwgdGhpcy5ibHVyTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuY2hhbmdlVGltZXIuY2FuY2VsKCk7XG4gICAgICAgIGlmICh0aGlzLmlubGluZVRvb2x0aXApIHtcbiAgICAgICAgICAgIHRoaXMuaW5saW5lVG9vbHRpcC5kZXRhY2goKTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgdGhpcy5zZXRJbmRleCgtMSk7XG5cbiAgICAgICAgaWYgKHRoaXMuY29tcGxldGlvblByb3ZpZGVyKSB7XG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRpb25Qcm92aWRlci5kZXRhY2goKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmlubGluZVJlbmRlcmVyICYmIHRoaXMuaW5saW5lUmVuZGVyZXIuaXNPcGVuKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5saW5lUmVuZGVyZXIuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYmFzZSlcbiAgICAgICAgICAgIHRoaXMuYmFzZS5kZXRhY2goKTtcbiAgICAgICAgdGhpcy5hY3RpdmF0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5jb21wbGV0aW9uUHJvdmlkZXIgPSB0aGlzLmNvbXBsZXRpb25zID0gdGhpcy5iYXNlID0gbnVsbDtcbiAgICB9XG5cbiAgICBkZXN0cm95KCkge1xuICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgICAgICBpZiAodGhpcy5pbmxpbmVSZW5kZXJlcilcbiAgICAgICAgICAgIHRoaXMuaW5saW5lUmVuZGVyZXIuZGVzdHJveSgpO1xuICAgICAgICBpZiAodGhpcy5pbmxpbmVUb29sdGlwKVxuICAgICAgICAgICAgdGhpcy5pbmxpbmVUb29sdGlwLmRlc3Ryb3koKTtcbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yICYmIHRoaXMuZWRpdG9yLmNvbXBsZXRlciA9PSB0aGlzKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5vZmYoXCJkZXN0cm95XCIsIGRlc3Ryb3lDb21wbGV0ZXIpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuY29tcGxldGVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmlubGluZVRvb2x0aXAgPSB0aGlzLmVkaXRvciA9IHRoaXMuaW5saW5lUmVuZGVyZXIgPSBudWxsO1xuICAgIH1cblxuICAgIHVwZGF0ZURvY1Rvb2x0aXAoKXtcbiAgICB9XG5cbn1cblxuLyoqXG4gKiBcbiAqIEB0eXBlIHt7W2tleTogc3RyaW5nXTogaW1wb3J0KFwiLi4vLi4vYWNlLWludGVybmFsXCIpLkFjZS5Db21tYW5kfX1cbiAqL1xuSW5saW5lQXV0b2NvbXBsZXRlLnByb3RvdHlwZS5jb21tYW5kcyA9IHtcbiAgICBcIlByZXZpb3VzXCI6IHtcbiAgICAgICAgYmluZEtleTogXCJBbHQtW1wiLFxuICAgICAgICBuYW1lOiBcIlByZXZpb3VzXCIsXG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgZWRpdG9yLmNvbXBsZXRlci5nb1RvKFwicHJldlwiKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJOZXh0XCI6IHtcbiAgICAgICAgYmluZEtleTogXCJBbHQtXVwiLFxuICAgICAgICBuYW1lOiBcIk5leHRcIixcbiAgICAgICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgICBlZGl0b3IuY29tcGxldGVyLmdvVG8oXCJuZXh0XCIpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBcIkFjY2VwdFwiOiB7XG4gICAgICAgIGJpbmRLZXk6IHsgd2luOiBcIlRhYnxDdHJsLVJpZ2h0XCIsIG1hYzogXCJUYWJ8Q21kLVJpZ2h0XCIgfSxcbiAgICAgICAgbmFtZTogXCJBY2NlcHRcIixcbiAgICAgICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgICByZXR1cm4gLyoqQHR5cGV7SW5saW5lQXV0b2NvbXBsZXRlfSovKGVkaXRvci5jb21wbGV0ZXIpLmluc2VydE1hdGNoKCk7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiQ2xvc2VcIjoge1xuICAgICAgICBiaW5kS2V5OiBcIkVzY1wiLFxuICAgICAgICBuYW1lOiBcIkNsb3NlXCIsXG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgZWRpdG9yLmNvbXBsZXRlci5kZXRhY2goKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbklubGluZUF1dG9jb21wbGV0ZS5mb3IgPSBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICBpZiAoZWRpdG9yLmNvbXBsZXRlciBpbnN0YW5jZW9mIElubGluZUF1dG9jb21wbGV0ZSkge1xuICAgICAgICByZXR1cm4gZWRpdG9yLmNvbXBsZXRlcjtcbiAgICB9XG4gICAgaWYgKGVkaXRvci5jb21wbGV0ZXIpIHtcbiAgICAgICAgZWRpdG9yLmNvbXBsZXRlci5kZXN0cm95KCk7XG4gICAgICAgIGVkaXRvci5jb21wbGV0ZXIgPSBudWxsO1xuICAgIH1cblxuICAgIGVkaXRvci5jb21wbGV0ZXIgPSBuZXcgSW5saW5lQXV0b2NvbXBsZXRlKGVkaXRvcik7XG4gICAgZWRpdG9yLm9uY2UoXCJkZXN0cm95XCIsIGRlc3Ryb3lDb21wbGV0ZXIpO1xuICAgIHJldHVybiBlZGl0b3IuY29tcGxldGVyO1xufTtcblxuSW5saW5lQXV0b2NvbXBsZXRlLnN0YXJ0Q29tbWFuZCA9IHtcbiAgICBuYW1lOiBcInN0YXJ0SW5saW5lQXV0b2NvbXBsZXRlXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBjb21wbGV0ZXIgPSBJbmxpbmVBdXRvY29tcGxldGUuZm9yKGVkaXRvcik7XG4gICAgICAgIGNvbXBsZXRlci5zaG93KG9wdGlvbnMpO1xuICAgIH0sXG4gICAgYmluZEtleTogeyB3aW46IFwiQWx0LUNcIiwgbWFjOiBcIk9wdGlvbi1DXCIgfVxufTtcblxuXG52YXIgY29tcGxldGVycyA9IFtzbmlwcGV0Q29tcGxldGVyLCB0ZXh0Q29tcGxldGVyLCBrZXlXb3JkQ29tcGxldGVyXTtcblxucmVxdWlyZShcIi4uL2NvbmZpZ1wiKS5kZWZpbmVPcHRpb25zKEVkaXRvci5wcm90b3R5cGUsIFwiZWRpdG9yXCIsIHtcbiAgICBlbmFibGVJbmxpbmVBdXRvY29tcGxldGlvbjoge1xuICAgICAgICAvKipcbiAgICAgICAgICogQHRoaXN7RWRpdG9yfVxuICAgICAgICAgKiBAcGFyYW0gdmFsXG4gICAgICAgICAqL1xuICAgICAgICBzZXQ6IGZ1bmN0aW9uKHZhbCkge1xuICAgICAgICAgICAgaWYgKHZhbCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jb21wbGV0ZXJzKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbXBsZXRlcnMgPSBBcnJheS5pc0FycmF5KHZhbCk/IHZhbCA6IGNvbXBsZXRlcnM7XG4gICAgICAgICAgICAgICAgdGhpcy5jb21tYW5kcy5hZGRDb21tYW5kKElubGluZUF1dG9jb21wbGV0ZS5zdGFydENvbW1hbmQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLnJlbW92ZUNvbW1hbmQoSW5saW5lQXV0b2NvbXBsZXRlLnN0YXJ0Q29tbWFuZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHZhbHVlOiBmYWxzZVxuICAgIH1cbn0pO1xuXG4vKipcbiAqIEZhY3RvcnkgbWV0aG9kIHRvIGNyZWF0ZSBhIGNvbW1hbmQgYmFyIHRvb2x0aXAgZm9yIGlubGluZSBhdXRvY29tcGxldGUuXG4gKiBcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHBhcmVudEVsICBUaGUgcGFyZW50IGVsZW1lbnQgd2hlcmUgdGhlIHRvb2x0aXAgSFRNTCBlbGVtZW50cyB3aWxsIGJlIGFkZGVkLlxuICogQHJldHVybnMge0NvbW1hbmRCYXJUb29sdGlwfSAgIFRoZSBjb21tYW5kIGJhciB0b29sdGlwIGZvciBpbmxpbmUgYXV0b2NvbXBsZXRlXG4gKi9cbklubGluZUF1dG9jb21wbGV0ZS5jcmVhdGVJbmxpbmVUb29sdGlwID0gZnVuY3Rpb24ocGFyZW50RWwpIHtcbiAgICAvKipAdHlwZSB7Q29tbWFuZEJhclRvb2x0aXB9Ki9cbiAgICB2YXIgaW5saW5lVG9vbHRpcCA9IG5ldyBDb21tYW5kQmFyVG9vbHRpcChwYXJlbnRFbCk7XG4gICAgaW5saW5lVG9vbHRpcC5yZWdpc3RlckNvbW1hbmQoXCJQcmV2aW91c1wiLFxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yXG4gICAgICAgIE9iamVjdC5hc3NpZ24oe30sIElubGluZUF1dG9jb21wbGV0ZS5wcm90b3R5cGUuY29tbWFuZHNbXCJQcmV2aW91c1wiXSwge1xuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IFwiYWNlX2Fycm93X3JvdGF0ZWRcIlxuICAgICAgICB9KVxuICAgICk7XG4gICAgaW5saW5lVG9vbHRpcC5yZWdpc3RlckNvbW1hbmQoXCJQb3NpdGlvblwiLCB7XG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBnZXRWYWx1ZTogZnVuY3Rpb24gKGVkaXRvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVkaXRvciA/IFsvKipAdHlwZXtJbmxpbmVBdXRvY29tcGxldGV9Ki9cbiAgICAgICAgICAgICAgICAoZWRpdG9yLmNvbXBsZXRlcikuZ2V0SW5kZXgoKSArIDEsIC8qKkB0eXBle0lubGluZUF1dG9jb21wbGV0ZX0qLyhlZGl0b3IuY29tcGxldGVyKS5nZXRMZW5ndGgoKVxuICAgICAgICAgICAgXS5qb2luKFwiL1wiKSA6IFwiXCI7XG4gICAgICAgIH0sXG4gICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICBjc3NDbGFzczogXCJjb21wbGV0aW9uX3Bvc2l0aW9uXCJcbiAgICB9KTtcbiAgICBpbmxpbmVUb29sdGlwLnJlZ2lzdGVyQ29tbWFuZChcIk5leHRcIixcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvclxuICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBJbmxpbmVBdXRvY29tcGxldGUucHJvdG90eXBlLmNvbW1hbmRzW1wiTmV4dFwiXSwge1xuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCIsXG4gICAgICAgICAgICBpY29uQ3NzQ2xhc3M6IFwiYWNlX2Fycm93XCJcbiAgICAgICAgfSlcbiAgICApO1xuICAgIGlubGluZVRvb2x0aXAucmVnaXN0ZXJDb21tYW5kKFwiQWNjZXB0XCIsXG4gICAgICAgIC8vIEB0cy1leHBlY3QtZXJyb3JcbiAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgSW5saW5lQXV0b2NvbXBsZXRlLnByb3RvdHlwZS5jb21tYW5kc1tcIkFjY2VwdFwiXSwge1xuICAgICAgICAgICAgZW5hYmxlZDogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEhZWRpdG9yICYmIGVkaXRvci5jb21wbGV0ZXIuZ2V0SW5kZXgoKSA+PSAwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uXCJcbiAgICAgICAgfSlcbiAgICApO1xuICAgIGlubGluZVRvb2x0aXAucmVnaXN0ZXJDb21tYW5kKFwiU2hvd1Rvb2x0aXBcIiwge1xuICAgICAgICBuYW1lOiBcIkFsd2F5cyBTaG93IFRvb2x0aXBcIixcbiAgICAgICAgZXhlYzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpbmxpbmVUb29sdGlwLnNldEFsd2F5c1Nob3coIWlubGluZVRvb2x0aXAuZ2V0QWx3YXlzU2hvdygpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIGlubGluZVRvb2x0aXAuZ2V0QWx3YXlzU2hvdygpO1xuICAgICAgICB9LFxuICAgICAgICB0eXBlOiBcImNoZWNrYm94XCJcbiAgICB9KTtcbiAgICByZXR1cm4gaW5saW5lVG9vbHRpcDtcbn07XG5cbmRvbS5pbXBvcnRDc3NTdHJpbmcoYFxuXG4uYWNlX2ljb25fc3ZnLmFjZV9hcnJvdyxcbi5hY2VfaWNvbl9zdmcuYWNlX2Fycm93X3JvdGF0ZWQge1xuICAgIC13ZWJraXQtbWFzay1pbWFnZTogdXJsKFwiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCM2FXUjBhRDBpTVRZaUlHaGxhV2RvZEQwaU1UWWlJSFpwWlhkQ2IzZzlJakFnTUNBeE5pQXhOaUlnWm1sc2JEMGlibTl1WlNJZ2VHMXNibk05SW1oMGRIQTZMeTkzZDNjdWR6TXViM0puTHpJd01EQXZjM1puSWo0OGNHRjBhQ0JtYVd4c0xYSjFiR1U5SW1WMlpXNXZaR1FpSUdOc2FYQXRjblZzWlQwaVpYWmxibTlrWkNJZ1pEMGlUVFV1T0RNM01ERWdNVFZNTkM0MU9EYzFNU0F4TXk0M01UVTFUREV3TGpFME5qZ2dPRXcwTGpVNE56VXhJREl1TWpnME5EWk1OUzQ0TXpjd01TQXhUREV5TGpZME5qVWdPRXcxTGpnek56QXhJREUxV2lJZ1ptbHNiRDBpWW14aFkyc2lMejQ4TDNOMlp6ND1cIik7XG59XG5cbi5hY2VfaWNvbl9zdmcuYWNlX2Fycm93X3JvdGF0ZWQge1xuICAgIHRyYW5zZm9ybTogcm90YXRlKDE4MGRlZyk7XG59XG5cbmRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfS5jb21wbGV0aW9uX3Bvc2l0aW9uIHtcbiAgICBwYWRkaW5nOiAwO1xufVxuYCwgXCJpbmxpbmVhdXRvY29tcGxldGUuY3NzXCIsIGZhbHNlKTtcblxuZXhwb3J0cy5JbmxpbmVBdXRvY29tcGxldGUgPSBJbmxpbmVBdXRvY29tcGxldGU7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=