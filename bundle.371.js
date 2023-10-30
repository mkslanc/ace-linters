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
        this.getCompletionProvider({
            prefix,
            base: this.base,
            pos
        }).provideCompletions(this.editor, options, function(err, completions, finished) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjM3MS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBLGNBQWMsMkNBQTZCO0FBQzNDLG1CQUFtQixrREFBNEM7QUFDL0QsV0FBVyxtQkFBTyxDQUFDLEtBQWE7QUFDaEMsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsVUFBVSxtQkFBTyxDQUFDLEtBQVk7QUFDOUIsZ0JBQWdCLG1CQUFPLENBQUMsS0FBa0I7O0FBRTFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsU0FBUztBQUN2QixnQkFBZ0IsU0FBUztBQUN6QixpQkFBaUIsU0FBUztBQUMxQixhQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdEQUFnRCwyQkFBMkI7QUFDM0Usb0RBQW9ELHFEQUFxRDs7QUFFekc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsbUJBQW1CO0FBQ2xDLGVBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQixtQkFBbUI7QUFDbEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsMEJBQTBCLHlCQUF5QjtBQUNuRCwwQkFBMEIsMkJBQTJCO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsOEJBQThCO0FBQ3hEO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0JBQStCLHVFQUF1RTtBQUN0Rzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxlQUFlLG1CQUFtQjtBQUNsQztBQUNBOztBQUVBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0IsbUJBQW1CO0FBQ25DO0FBQ0E7QUFDQTs7QUFFQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxrQkFBa0I7QUFDeEIsTUFBTSxrQkFBa0I7QUFDeEI7QUFDQTs7QUFFQSxNQUFNLGtCQUFrQjtBQUN4QjtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxtQkFBbUI7QUFDekI7QUFDQTtBQUNBOztBQUVBLE1BQU0sa0JBQWtCO0FBQ3hCO0FBQ0E7O0FBRUEsR0FBRyxtQkFBbUIseUJBQXlCO0FBQy9DO0FBQ0E7O0FBRUEsR0FBRyxtQkFBbUIsR0FBRztBQUN6QjtBQUNBOztBQUVBLEdBQUcsbUJBQW1CLHlCQUF5QjtBQUMvQztBQUNBO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7O0FBRUEsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEdBQUcsbUJBQW1CLHlCQUF5QjtBQUMvQztBQUNBOztBQUVBLEdBQUcsdUJBQXVCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7O0FBRUEsZ0JBQWdCLGtCQUFrQjtBQUNsQyxnQkFBZ0Isa0JBQWtCO0FBQ2xDO0FBQ0E7O0FBRUEsZ0JBQWdCLG1CQUFtQjtBQUNuQztBQUNBOztBQUVBLGdCQUFnQixrQkFBa0I7QUFDbEM7QUFDQTs7QUFFQSxhQUFhLGtCQUFrQjtBQUMvQjtBQUNBOztBQUVBLGFBQWEsdUJBQXVCO0FBQ3BDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCO0FBQ3pCLDBCQUEwQjtBQUMxQix5QkFBeUI7Ozs7Ozs7OztBQzFuQlo7O0FBRWIsa0JBQWtCLHVDQUErQztBQUNqRSxnQkFBZ0IsK0NBQTJDO0FBQzNELG1CQUFtQixtREFBdUM7QUFDMUQseUJBQXlCLHlEQUE2QztBQUN0RSxhQUFhLDRDQUEyQjtBQUN4QyxXQUFXLG1CQUFPLENBQUMsS0FBc0I7QUFDekMsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsV0FBVyxtQkFBTyxDQUFDLEtBQWE7QUFDaEMsd0JBQXdCLDhDQUEwQztBQUNsRSx3QkFBd0IsOENBQTBDOztBQUVsRSx1QkFBdUIsNkNBQTRDO0FBQ25FLG9CQUFvQiwwQ0FBeUM7QUFDN0QsdUJBQXVCLDZDQUE0Qzs7QUFFbkU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsZUFBZSxtQkFBbUI7QUFDbEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtREFBbUQ7QUFDbkQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELDJCQUEyQjtBQUNsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsbUJBQW1CLDZDQUE2QztBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxlQUFlO0FBQ2Y7OztBQUdBOztBQUVBLDBDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEIsYUFBYSxxQkFBcUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0I7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTSxrQkFBa0I7QUFDeEI7QUFDQTtBQUNBOztBQUVBLDBCQUEwQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9jb21tYW5kX2Jhci5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvaW5saW5lX2F1dG9jb21wbGV0ZS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgVG9vbHRpcCA9IHJlcXVpcmUoXCIuLi90b29sdGlwXCIpLlRvb2x0aXA7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcIi4uL2xpYi9ldmVudF9lbWl0dGVyXCIpLkV2ZW50RW1pdHRlcjtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9saWIvZG9tXCIpO1xudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIHVzZXJhZ2VudCA9IHJlcXVpcmUoXCIuLi9saWIvdXNlcmFnZW50XCIpO1xuXG52YXIgQlVUVE9OX0NMQVNTX05BTUUgPSAnY29tbWFuZF9iYXJfdG9vbHRpcF9idXR0b24nO1xudmFyIFZBTFVFX0NMQVNTX05BTUUgPSAnY29tbWFuZF9iYXJfYnV0dG9uX3ZhbHVlJztcbnZhciBDQVBUSU9OX0NMQVNTX05BTUUgPSAnY29tbWFuZF9iYXJfYnV0dG9uX2NhcHRpb24nO1xudmFyIEtFWUJJTkRJTkdfQ0xBU1NfTkFNRSA9ICdjb21tYW5kX2Jhcl9rZXliaW5kaW5nJztcbnZhciBUT09MVElQX0NMQVNTX05BTUUgPSAnY29tbWFuZF9iYXJfdG9vbHRpcCc7XG52YXIgTU9SRV9PUFRJT05TX0JVVFRPTl9JRCA9ICdNb3JlT3B0aW9uc0J1dHRvbic7XG5cbnZhciBkZWZhdWx0RGVsYXkgPSAxMDA7XG52YXIgZGVmYXVsdE1heEVsZW1lbnRzID0gNDtcblxudmFyIG1pblBvc2l0aW9uID0gZnVuY3Rpb24gKHBvc0EsIHBvc0IpIHtcbiAgICBpZiAocG9zQi5yb3cgPiBwb3NBLnJvdykge1xuICAgICAgICByZXR1cm4gcG9zQTtcbiAgICB9IGVsc2UgaWYgKHBvc0Iucm93ID09PSBwb3NBLnJvdyAmJiBwb3NCLmNvbHVtbiA+IHBvc0EuY29sdW1uKSB7XG4gICAgICAgIHJldHVybiBwb3NBO1xuICAgIH1cbiAgICByZXR1cm4gcG9zQjtcbn07XG5cbnZhciBrZXlEaXNwbGF5TWFwID0ge1xuICAgIFwiQ3RybFwiOiB7IG1hYzogXCJeXCJ9LFxuICAgIFwiT3B0aW9uXCI6IHsgbWFjOiBcIuKMpVwifSxcbiAgICBcIkNvbW1hbmRcIjogeyBtYWM6IFwi4oyYXCJ9LFxuICAgIFwiQ21kXCI6IHsgbWFjOiBcIuKMmFwifSxcbiAgICBcIlNoaWZ0XCI6IFwi4oenXCIsXG4gICAgXCJMZWZ0XCI6IFwi4oaQXCIsXG4gICAgXCJSaWdodFwiOiBcIuKGklwiLFxuICAgIFwiVXBcIjogXCLihpFcIixcbiAgICBcIkRvd25cIjogXCLihpNcIlxufTtcblxuXG4vKipcbiAqIERpc3BsYXlzIGEgY29tbWFuZCB0b29sdGlwIGFib3ZlIHRoZSBjdXJyZW50bHkgYWN0aXZlIGxpbmUgc2VsZWN0aW9uLCB3aXRoIGNsaWNrYWJsZSBlbGVtZW50cy5cbiAqXG4gKiBJbnRlcm5hbGx5IGl0IGlzIGEgY29tcG9zaXRlIG9mIHR3byB0b29sdGlwcywgb25lIGZvciB0aGUgbWFpbiB0b29sdGlwIGFuZCBvbmUgZm9yIHRoZSBcbiAqIG92ZXJmbG93aW5nIGNvbW1hbmRzLlxuICogVGhlIGNvbW1hbmRzIGFyZSBhZGRlZCBzZXF1ZW50aWFsbHkgaW4gcmVnaXN0cmF0aW9uIG9yZGVyLlxuICogV2hlbiBhdHRhY2hlZCB0byBhbiBlZGl0b3IsIGl0IGlzIGVpdGhlciBhbHdheXMgc2hvd24gb3Igb25seSB3aGVuIHRoZSBhY3RpdmUgbGluZSBpcyBob3ZlcmVkXG4gKiB3aXRoIG1vdXNlLCBkZXBlbmRpbmcgb24gdGhlIGFsd2F5c1Nob3cgcHJvcGVydHkuXG4gKi9cbmNsYXNzIENvbW1hbmRCYXJUb29sdGlwIHtcbiAgICBjb25zdHJ1Y3RvcihwYXJlbnROb2RlLCBvcHRpb25zKSB7XG4gICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgICAgICB0aGlzLnBhcmVudE5vZGUgPSBwYXJlbnROb2RlO1xuICAgICAgICB0aGlzLnRvb2x0aXAgPSBuZXcgVG9vbHRpcCh0aGlzLnBhcmVudE5vZGUpO1xuICAgICAgICB0aGlzLm1vcmVPcHRpb25zID0gbmV3IFRvb2x0aXAodGhpcy5wYXJlbnROb2RlKTtcbiAgICAgICAgdGhpcy5tYXhFbGVtZW50c09uVG9vbHRpcCA9IG9wdGlvbnMubWF4RWxlbWVudHNPblRvb2x0aXAgfHwgZGVmYXVsdE1heEVsZW1lbnRzO1xuICAgICAgICB0aGlzLiRhbHdheXNTaG93ID0gb3B0aW9ucy5hbHdheXNTaG93IHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmV2ZW50TGlzdGVuZXJzID0ge307XG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSB7fTtcbiAgICAgICAgdGhpcy5jb21tYW5kcyA9IHt9O1xuXG4gICAgICAgIHRoaXMudG9vbHRpcEVsID0gZG9tLmJ1aWxkRG9tKFsnZGl2JywgeyBjbGFzczogVE9PTFRJUF9DTEFTU19OQU1FIH1dLCB0aGlzLnRvb2x0aXAuZ2V0RWxlbWVudCgpKTtcbiAgICAgICAgdGhpcy5tb3JlT3B0aW9uc0VsID0gZG9tLmJ1aWxkRG9tKFsnZGl2JywgeyBjbGFzczogVE9PTFRJUF9DTEFTU19OQU1FICsgXCIgdG9vbHRpcF9tb3JlX29wdGlvbnNcIiB9XSwgdGhpcy5tb3JlT3B0aW9ucy5nZXRFbGVtZW50KCkpO1xuXG4gICAgICAgIHRoaXMuJHNob3dUb29sdGlwVGltZXIgPSBsYW5nLmRlbGF5ZWRDYWxsKHRoaXMuJHNob3dUb29sdGlwLmJpbmQodGhpcyksIG9wdGlvbnMuc2hvd0RlbGF5IHx8IGRlZmF1bHREZWxheSk7XG4gICAgICAgIHRoaXMuJGhpZGVUb29sdGlwVGltZXIgPSBsYW5nLmRlbGF5ZWRDYWxsKHRoaXMuJGhpZGVUb29sdGlwLmJpbmQodGhpcyksIG9wdGlvbnMuaGlkZURlbGF5IHx8IGRlZmF1bHREZWxheSk7XG4gICAgICAgIHRoaXMuJHRvb2x0aXBFbnRlciA9IHRoaXMuJHRvb2x0aXBFbnRlci5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLiRvbk1vdXNlTW92ZSA9IHRoaXMuJG9uTW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuJG9uQ2hhbmdlU2Nyb2xsID0gdGhpcy4kb25DaGFuZ2VTY3JvbGwuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy4kb25FZGl0b3JDaGFuZ2VTZXNzaW9uID0gdGhpcy4kb25FZGl0b3JDaGFuZ2VTZXNzaW9uLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuJHNjaGVkdWxlVG9vbHRpcEZvckhpZGUgPSB0aGlzLiRzY2hlZHVsZVRvb2x0aXBGb3JIaWRlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuJHByZXZlbnRNb3VzZUV2ZW50ID0gdGhpcy4kcHJldmVudE1vdXNlRXZlbnQuYmluZCh0aGlzKTtcblxuICAgICAgICBmb3IgKHZhciBldmVudCBvZiBbXCJtb3VzZWRvd25cIiwgXCJtb3VzZXVwXCIsIFwiY2xpY2tcIl0pIHtcbiAgICAgICAgICAgIHRoaXMudG9vbHRpcC5nZXRFbGVtZW50KCkuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy4kcHJldmVudE1vdXNlRXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5tb3JlT3B0aW9ucy5nZXRFbGVtZW50KCkuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgdGhpcy4kcHJldmVudE1vdXNlRXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXJzIGEgY29tbWFuZCBvbiB0aGUgY29tbWFuZCBiYXIgdG9vbHRpcC5cbiAgICAgKiBcbiAgICAgKiBUaGUgY29tbWFuZHMgYXJlIGFkZGVkIGluIHNlcXVlbnRpYWwgb3JkZXIuIElmIHRoZXJlIGlzIG5vdCBlbm91Z2ggc3BhY2Ugb24gdGhlIG1haW5cbiAgICAgKiB0b29sYmFyLCB0aGUgcmVtYWluaW5nIGVsZW1lbnRzIGFyZSBhZGRlZCB0byB0aGUgb3ZlcmZsb3cgbWVudS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICAgICBpZCAgICAgIFxuICAgICAqIEBwYXJhbSB7VG9vbHRpcENvbW1hbmR9IGNvbW1hbmRcbiAgICAgKi9cbiAgICByZWdpc3RlckNvbW1hbmQoaWQsIGNvbW1hbmQpIHtcbiAgICAgICAgdmFyIHJlZ2lzdGVyRm9yTWFpblRvb2x0aXAgPSBPYmplY3Qua2V5cyh0aGlzLmNvbW1hbmRzKS5sZW5ndGggPCB0aGlzLm1heEVsZW1lbnRzT25Ub29sdGlwO1xuICAgICAgICBpZiAoIXJlZ2lzdGVyRm9yTWFpblRvb2x0aXAgJiYgIXRoaXMuZWxlbWVudHNbTU9SRV9PUFRJT05TX0JVVFRPTl9JRF0pIHtcbiAgICAgICAgICAgIHRoaXMuJGNyZWF0ZUNvbW1hbmQoTU9SRV9PUFRJT05TX0JVVFRPTl9JRCwge1xuICAgICAgICAgICAgICAgIG5hbWU6IFwiwrfCt8K3XCIsXG4gICAgICAgICAgICAgICAgZXhlYzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJHNob3VsZEhpZGVNb3JlT3B0aW9ucyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLiRzZXRNb3JlT3B0aW9uc1Zpc2liaWxpdHkoIXRoaXMuaXNNb3JlT3B0aW9uc1Nob3duKCkpO1xuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgICAgICAgICAgICB0eXBlOiBcImNoZWNrYm94XCIsXG4gICAgICAgICAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pc01vcmVPcHRpb25zU2hvd24oKTtcbiAgICAgICAgICAgICAgICB9LmJpbmQodGhpcyksXG4gICAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy4kY3JlYXRlQ29tbWFuZChpZCwgY29tbWFuZCwgcmVnaXN0ZXJGb3JNYWluVG9vbHRpcCk7XG4gICAgICAgIGlmICh0aGlzLmlzU2hvd24oKSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNTaG93bigpIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy50b29sdGlwICYmIHRoaXMudG9vbHRpcC5pc09wZW47XG4gICAgfVxuXG4gICAgaXNNb3JlT3B0aW9uc1Nob3duKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLm1vcmVPcHRpb25zICYmIHRoaXMubW9yZU9wdGlvbnMuaXNPcGVuO1xuICAgIH1cblxuICAgIGdldEFsd2F5c1Nob3coKSB7XG4gICAgICAgIHJldHVybiB0aGlzLiRhbHdheXNTaG93O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHMgdGhlIGRpc3BsYXkgbW9kZSBvZiB0aGUgdG9vbHRpcFxuICAgICAqIFxuICAgICAqIFdoZW4gdHJ1ZSwgdGhlIHRvb2x0aXAgaXMgYWx3YXlzIGRpc3BsYXllZCB3aGlsZSBpdCBpcyBhdHRhY2hlZCB0byBhbiBlZGl0b3IuXG4gICAgICogV2hlbiBmYWxzZSwgdGhlIHRvb2x0aXAgaXMgZGlzcGxheWVkIG9ubHkgd2hlbiB0aGUgbW91c2UgaG92ZXJzIG92ZXIgdGhlIGFjdGl2ZSBlZGl0b3IgbGluZS5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICovXG4gICAgc2V0QWx3YXlzU2hvdyhhbHdheXNTaG93KSB7XG4gICAgICAgIHRoaXMuJGFsd2F5c1Nob3cgPSBhbHdheXNTaG93O1xuICAgICAgICB0aGlzLiR1cGRhdGVPbkhvdmVySGFuZGxlcnMoIXRoaXMuJGFsd2F5c1Nob3cpO1xuICAgICAgICB0aGlzLl9zaWduYWwoXCJhbHdheXNTaG93XCIsIHRoaXMuJGFsd2F5c1Nob3cpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEF0dGFjaGVzIHRoZSBjbGlja2FibGUgY29tbWFuZCBiYXIgdG9vbHRpcCB0byBhbiBlZGl0b3JcbiAgICAgKiBcbiAgICAgKiBEZXBlbmRpbmcgb24gdGhlIGFsd2F5c1Nob3cgcGFyYW1ldGVyIGl0IGVpdGhlciBkaXNwbGF5cyB0aGUgdG9vbHRpcCBpbW1lZGlhdGVseSxcbiAgICAgKiBvciBzdWJzY3JpYmVzIHRvIHRoZSBuZWNlc3NhcnkgZXZlbnRzIHRvIGRpc3BsYXkgdGhlIHRvb2x0aXAgb24gaG92ZXIuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICAgICAqL1xuICAgIGF0dGFjaChlZGl0b3IpIHtcbiAgICAgICAgaWYgKCFlZGl0b3IgfHwgKHRoaXMuaXNTaG93bigpICYmIHRoaXMuZWRpdG9yID09PSBlZGl0b3IpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmRldGFjaCgpO1xuXG4gICAgICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yO1xuICAgICAgICB0aGlzLmVkaXRvci5vbihcImNoYW5nZVNlc3Npb25cIiwgdGhpcy4kb25FZGl0b3JDaGFuZ2VTZXNzaW9uKTtcbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yLnNlc3Npb24pIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNlc3Npb24ub24oXCJjaGFuZ2VTY3JvbGxMZWZ0XCIsIHRoaXMuJG9uQ2hhbmdlU2Nyb2xsKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNlc3Npb24ub24oXCJjaGFuZ2VTY3JvbGxUb3BcIiwgdGhpcy4kb25DaGFuZ2VTY3JvbGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZ2V0QWx3YXlzU2hvdygpKSB7XG4gICAgICAgICAgICB0aGlzLiRzaG93VG9vbHRpcCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy4kdXBkYXRlT25Ib3ZlckhhbmRsZXJzKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlcyB0aGUgcG9zaXRpb24gb2YgdGhlIGNvbW1hbmQgYmFyIHRvb2x0aXAuIEl0IGFsaWducyBpdHNlbGYgYWJvdmUgdGhlIGFjdGl2ZSBsaW5lIGluIHRoZSBlZGl0b3IuXG4gICAgICovXG4gICAgdXBkYXRlUG9zaXRpb24oKSB7XG4gICAgICAgIGlmICghdGhpcy5lZGl0b3IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcmVuZGVyZXIgPSB0aGlzLmVkaXRvci5yZW5kZXJlcjtcblxuICAgICAgICB2YXIgcmFuZ2VzO1xuICAgICAgICBpZiAodGhpcy5lZGl0b3Iuc2VsZWN0aW9uLmdldEFsbFJhbmdlcykge1xuICAgICAgICAgICAgcmFuZ2VzID0gdGhpcy5lZGl0b3Iuc2VsZWN0aW9uLmdldEFsbFJhbmdlcygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmFuZ2VzID0gW3RoaXMuZWRpdG9yLmdldFNlbGVjdGlvblJhbmdlKCldO1xuICAgICAgICB9XG4gICAgICAgIGlmICghcmFuZ2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtaW5Qb3MgPSBtaW5Qb3NpdGlvbihyYW5nZXNbMF0uc3RhcnQsIHJhbmdlc1swXS5lbmQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgcmFuZ2U7IHJhbmdlID0gcmFuZ2VzW2ldOyBpKyspIHtcbiAgICAgICAgICAgIG1pblBvcyA9IG1pblBvc2l0aW9uKG1pblBvcywgbWluUG9zaXRpb24ocmFuZ2Uuc3RhcnQsIHJhbmdlLmVuZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHBvcyA9IHJlbmRlcmVyLiRjdXJzb3JMYXllci5nZXRQaXhlbFBvc2l0aW9uKG1pblBvcywgdHJ1ZSk7XG5cbiAgICAgICAgdmFyIHRvb2x0aXBFbCA9IHRoaXMudG9vbHRpcC5nZXRFbGVtZW50KCk7XG4gICAgICAgIHZhciBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB2YXIgc2NyZWVuSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICB2YXIgcmVjdCA9IHRoaXMuZWRpdG9yLmNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICBwb3MudG9wICs9IHJlY3QudG9wIC0gcmVuZGVyZXIubGF5ZXJDb25maWcub2Zmc2V0O1xuICAgICAgICBwb3MubGVmdCArPSByZWN0LmxlZnQgKyByZW5kZXJlci5ndXR0ZXJXaWR0aCAtIHJlbmRlcmVyLnNjcm9sbExlZnQ7XG5cbiAgICAgICAgdmFyIGN1cnNvclZpc2libGUgPSBwb3MudG9wID49IHJlY3QudG9wICYmIHBvcy50b3AgPD0gcmVjdC5ib3R0b20gJiZcbiAgICAgICAgICAgIHBvcy5sZWZ0ID49IHJlY3QubGVmdCArIHJlbmRlcmVyLmd1dHRlcldpZHRoICYmIHBvcy5sZWZ0IDw9IHJlY3QucmlnaHQ7XG5cbiAgICAgICAgaWYgKCFjdXJzb3JWaXNpYmxlICYmIHRoaXMuaXNTaG93bigpKSB7XG4gICAgICAgICAgICB0aGlzLiRoaWRlVG9vbHRpcCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnNvclZpc2libGUgJiYgIXRoaXMuaXNTaG93bigpICYmIHRoaXMuZ2V0QWx3YXlzU2hvdygpKSB7XG4gICAgICAgICAgICB0aGlzLiRzaG93VG9vbHRpcCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRvcCA9IHBvcy50b3AgLSB0b29sdGlwRWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgICB2YXIgbGVmdCA9IE1hdGgubWluKHNjcmVlbldpZHRoIC0gdG9vbHRpcEVsLm9mZnNldFdpZHRoLCBwb3MubGVmdCk7XG5cbiAgICAgICAgdmFyIHRvb2x0aXBGaXRzID0gdG9wID49IDAgJiYgdG9wICsgdG9vbHRpcEVsLm9mZnNldEhlaWdodCA8PSBzY3JlZW5IZWlnaHQgJiZcbiAgICAgICAgICAgIGxlZnQgPj0gMCAmJiBsZWZ0ICsgdG9vbHRpcEVsLm9mZnNldFdpZHRoIDw9IHNjcmVlbldpZHRoO1xuXG4gICAgICAgIGlmICghdG9vbHRpcEZpdHMpIHtcbiAgICAgICAgICAgIHRoaXMuJGhpZGVUb29sdGlwKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRvb2x0aXAuc2V0UG9zaXRpb24obGVmdCwgdG9wKTtcblxuICAgICAgICBpZiAodGhpcy5pc01vcmVPcHRpb25zU2hvd24oKSkge1xuICAgICAgICAgICAgdG9wID0gdG9wICsgdG9vbHRpcEVsLm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgIGxlZnQgPSB0aGlzLmVsZW1lbnRzW01PUkVfT1BUSU9OU19CVVRUT05fSURdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgXG4gICAgICAgICAgICB2YXIgbW9yZU9wdGlvbnNFbCA9IHRoaXMubW9yZU9wdGlvbnMuZ2V0RWxlbWVudCgpO1xuICAgICAgICAgICAgdmFyIHNjcmVlbkhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgICAgIGlmICh0b3AgKyBtb3JlT3B0aW9uc0VsLm9mZnNldEhlaWdodCA+IHNjcmVlbkhlaWdodCkge1xuICAgICAgICAgICAgICAgIHRvcCAtPSB0b29sdGlwRWwub2Zmc2V0SGVpZ2h0ICsgbW9yZU9wdGlvbnNFbC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGVmdCArIG1vcmVPcHRpb25zRWwub2Zmc2V0V2lkdGggPiBzY3JlZW5XaWR0aCkge1xuICAgICAgICAgICAgICAgIGxlZnQgPSBzY3JlZW5XaWR0aCAtIG1vcmVPcHRpb25zRWwub2Zmc2V0V2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMubW9yZU9wdGlvbnMuc2V0UG9zaXRpb24obGVmdCwgdG9wKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZXMgZWFjaCBjb21tYW5kIGVsZW1lbnQgaW4gdGhlIHRvb2x0aXAuIFxuICAgICAqIFxuICAgICAqIFRoaXMgaXMgYXV0b21hdGljYWxseSBjYWxsZWQgb24gY2VydGFpbiBldmVudHMsIGJ1dCBjYW4gYmUgY2FsbGVkIG1hbnVhbGx5IGFzIHdlbGwuXG4gICAgICovXG4gICAgdXBkYXRlKCkge1xuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmVsZW1lbnRzKS5mb3JFYWNoKHRoaXMuJHVwZGF0ZUVsZW1lbnQuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0YWNoZXMgdGhlIHRvb2x0aXAgZnJvbSB0aGUgZWRpdG9yLlxuICAgICAqL1xuICAgIGRldGFjaCgpIHtcbiAgICAgICAgdGhpcy50b29sdGlwLmhpZGUoKTtcbiAgICAgICAgdGhpcy5tb3JlT3B0aW9ucy5oaWRlKCk7XG4gICAgICAgIHRoaXMuJHVwZGF0ZU9uSG92ZXJIYW5kbGVycyhmYWxzZSk7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iub2ZmKFwiY2hhbmdlU2Vzc2lvblwiLCB0aGlzLiRvbkVkaXRvckNoYW5nZVNlc3Npb24pO1xuICAgICAgICAgICAgaWYgKHRoaXMuZWRpdG9yLnNlc3Npb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5zZXNzaW9uLm9mZihcImNoYW5nZVNjcm9sbExlZnRcIiwgdGhpcy4kb25DaGFuZ2VTY3JvbGwpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNlc3Npb24ub2ZmKFwiY2hhbmdlU2Nyb2xsVG9wXCIsIHRoaXMuJG9uQ2hhbmdlU2Nyb2xsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLiRtb3VzZUluVG9vbHRpcCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVkaXRvciA9IG51bGw7XG4gICAgfVxuXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMudG9vbHRpcCAmJiB0aGlzLm1vcmVPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgICAgICAgICAgdGhpcy50b29sdGlwLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMubW9yZU9wdGlvbnMuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZXZlbnRMaXN0ZW5lcnMgPSB7fTtcbiAgICAgICAgdGhpcy5jb21tYW5kcyA9IHt9O1xuICAgICAgICB0aGlzLmVsZW1lbnRzID0ge307XG4gICAgICAgIHRoaXMudG9vbHRpcCA9IHRoaXMubW9yZU9wdGlvbnMgPSB0aGlzLnBhcmVudE5vZGUgPSBudWxsO1xuICAgIH1cblxuICAgICRjcmVhdGVDb21tYW5kKGlkLCBjb21tYW5kLCBmb3JNYWluVG9vbHRpcCkge1xuICAgICAgICB2YXIgcGFyZW50RWwgPSBmb3JNYWluVG9vbHRpcCA/IHRoaXMudG9vbHRpcEVsIDogdGhpcy5tb3JlT3B0aW9uc0VsO1xuICAgICAgICB2YXIga2V5UGFydHMgPSBbXTtcbiAgICAgICAgdmFyIGJpbmRLZXkgPSBjb21tYW5kLmJpbmRLZXk7XG4gICAgICAgIGlmIChiaW5kS2V5KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGJpbmRLZXkgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgYmluZEtleSA9IHVzZXJhZ2VudC5pc01hYyA/IGJpbmRLZXkubWFjIDogYmluZEtleS53aW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBiaW5kS2V5ID0gYmluZEtleS5zcGxpdChcInxcIilbMF07XG4gICAgICAgICAgICBrZXlQYXJ0cyA9IGJpbmRLZXkuc3BsaXQoXCItXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBrZXlQYXJ0cyA9IGtleVBhcnRzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICBpZiAoa2V5RGlzcGxheU1hcFtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5RGlzcGxheU1hcFtrZXldID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleURpc3BsYXlNYXBba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1c2VyYWdlbnQuaXNNYWMgJiYga2V5RGlzcGxheU1hcFtrZXldLm1hYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGtleURpc3BsYXlNYXBba2V5XS5tYWM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGtleTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGJ1dHRvbk5vZGU7XG4gICAgICAgIGlmIChmb3JNYWluVG9vbHRpcCAmJiBjb21tYW5kLmljb25Dc3NDbGFzcykge1xuICAgICAgICAgICAgLy9Pbmx5IHN1cHBvcnQgaWNvbiBidXR0b24gZm9yIG1haW4gdG9vbHRpcCwgb3RoZXJ3aXNlIGZhbGwgYmFjayB0byB0ZXh0IGJ1dHRvblxuICAgICAgICAgICAgYnV0dG9uTm9kZSA9IFtcbiAgICAgICAgICAgICAgICAnZGl2JyxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICBjbGFzczogW1wiYWNlX2ljb25fc3ZnXCIsIGNvbW1hbmQuaWNvbkNzc0NsYXNzXS5qb2luKFwiIFwiKSxcbiAgICAgICAgICAgICAgICAgICAgIFwiYXJpYS1sYWJlbFwiOiBjb21tYW5kLm5hbWUgKyBcIiAoXCIgKyBjb21tYW5kLmJpbmRLZXkgKyBcIilcIlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBidXR0b25Ob2RlID0gW1xuICAgICAgICAgICAgICAgIFsnZGl2JywgeyBjbGFzczogVkFMVUVfQ0xBU1NfTkFNRSB9XSxcbiAgICAgICAgICAgICAgICBbJ2RpdicsIHsgY2xhc3M6IENBUFRJT05fQ0xBU1NfTkFNRSB9LCBjb21tYW5kLm5hbWVdXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWYgKGtleVBhcnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGJ1dHRvbk5vZGUucHVzaChcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2RpdicsXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGNsYXNzOiBLRVlCSU5ESU5HX0NMQVNTX05BTUUgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGtleVBhcnRzLm1hcChmdW5jdGlvbihrZXlQYXJ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsnZGl2Jywga2V5UGFydF07XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSBcbiAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBkb20uYnVpbGREb20oWydkaXYnLCB7IGNsYXNzOiBbQlVUVE9OX0NMQVNTX05BTUUsIGNvbW1hbmQuY3NzQ2xhc3MgfHwgXCJcIl0uam9pbihcIiBcIiksIHJlZjogaWQgfSwgYnV0dG9uTm9kZV0sIHBhcmVudEVsLCB0aGlzLmVsZW1lbnRzKTtcbiAgICAgICAgdGhpcy5jb21tYW5kc1tpZF0gPSBjb21tYW5kO1xuXG4gICAgICAgIHZhciBldmVudExpc3RlbmVyID0gZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIEludGVybmFsIHZhcmlhYmxlIHRvIHByb3Blcmx5IGhhbmRsZSB3aGVuIHRoZSBtb3JlIG9wdGlvbnMgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgICAgICAgIHRoaXMuJHNob3VsZEhpZGVNb3JlT3B0aW9ucyA9IHRoaXMuaXNNb3JlT3B0aW9uc1Nob3duKCk7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZWxlbWVudHNbaWRdLmRpc2FibGVkICYmIGNvbW1hbmQuZXhlYykge1xuICAgICAgICAgICAgICAgIGNvbW1hbmQuZXhlYyh0aGlzLmVkaXRvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy4kc2hvdWxkSGlkZU1vcmVPcHRpb25zKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc2V0TW9yZU9wdGlvbnNWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5ldmVudExpc3RlbmVyc1tpZF0gPSBldmVudExpc3RlbmVyO1xuICAgICAgICB0aGlzLmVsZW1lbnRzW2lkXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV2ZW50TGlzdGVuZXIuYmluZCh0aGlzKSk7XG4gICAgICAgIHRoaXMuJHVwZGF0ZUVsZW1lbnQoaWQpO1xuICAgIH1cblxuICAgICRzZXRNb3JlT3B0aW9uc1Zpc2liaWxpdHkodmlzaWJsZSkge1xuICAgICAgICBpZiAodmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5tb3JlT3B0aW9ucy5zZXRUaGVtZSh0aGlzLmVkaXRvci5yZW5kZXJlci50aGVtZSk7XG4gICAgICAgICAgICB0aGlzLm1vcmVPcHRpb25zLnNldENsYXNzTmFtZShUT09MVElQX0NMQVNTX05BTUUgKyBcIl93cmFwcGVyXCIpO1xuICAgICAgICAgICAgdGhpcy5tb3JlT3B0aW9ucy5zaG93KCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVQb3NpdGlvbigpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5tb3JlT3B0aW9ucy5oaWRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAkb25FZGl0b3JDaGFuZ2VTZXNzaW9uKGUpIHtcbiAgICAgICAgaWYgKGUub2xkU2Vzc2lvbikge1xuICAgICAgICAgICAgZS5vbGRTZXNzaW9uLm9mZihcImNoYW5nZVNjcm9sbFRvcFwiLCB0aGlzLiRvbkNoYW5nZVNjcm9sbCk7XG4gICAgICAgICAgICBlLm9sZFNlc3Npb24ub2ZmKFwiY2hhbmdlU2Nyb2xsTGVmdFwiLCB0aGlzLiRvbkNoYW5nZVNjcm9sbCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICB9XG5cbiAgICAkb25DaGFuZ2VTY3JvbGwoKSB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvci5yZW5kZXJlciAmJiAodGhpcy5pc1Nob3duKCkgfHwgdGhpcy5nZXRBbHdheXNTaG93KCkpKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5yZW5kZXJlci5vbmNlKFwiYWZ0ZXJSZW5kZXJcIiwgdGhpcy51cGRhdGVQb3NpdGlvbi5iaW5kKHRoaXMpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICRvbk1vdXNlTW92ZShlKSB7XG4gICAgICAgIGlmICh0aGlzLiRtb3VzZUluVG9vbHRpcCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJzb3JQb3NpdGlvbiA9IHRoaXMuZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgIHZhciBjdXJzb3JTY3JlZW5Qb3NpdGlvbiA9IHRoaXMuZWRpdG9yLnJlbmRlcmVyLnRleHRUb1NjcmVlbkNvb3JkaW5hdGVzKGN1cnNvclBvc2l0aW9uLnJvdywgY3Vyc29yUG9zaXRpb24uY29sdW1uKTtcbiAgICAgICAgdmFyIGxpbmVIZWlnaHQgPSB0aGlzLmVkaXRvci5yZW5kZXJlci5saW5lSGVpZ2h0O1xuICAgICAgICBcbiAgICAgICAgdmFyIGlzSW5DdXJyZW50TGluZSA9IGUuY2xpZW50WSA+PSBjdXJzb3JTY3JlZW5Qb3NpdGlvbi5wYWdlWSAmJiBlLmNsaWVudFkgPCBjdXJzb3JTY3JlZW5Qb3NpdGlvbi5wYWdlWSArIGxpbmVIZWlnaHQ7XG5cbiAgICAgICAgaWYgKGlzSW5DdXJyZW50TGluZSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2hvd24oKSAmJiAhdGhpcy4kc2hvd1Rvb2x0aXBUaW1lci5pc1BlbmRpbmcoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJHNob3dUb29sdGlwVGltZXIuZGVsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLiRoaWRlVG9vbHRpcFRpbWVyLmlzUGVuZGluZygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kaGlkZVRvb2x0aXBUaW1lci5jYW5jZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU2hvd24oKSAmJiAhdGhpcy4kaGlkZVRvb2x0aXBUaW1lci5pc1BlbmRpbmcoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGhpZGVUb29sdGlwVGltZXIuZGVsYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLiRzaG93VG9vbHRpcFRpbWVyLmlzUGVuZGluZygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kc2hvd1Rvb2x0aXBUaW1lci5jYW5jZWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgICRwcmV2ZW50TW91c2VFdmVudChlKSB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIFxuICAgICRzY2hlZHVsZVRvb2x0aXBGb3JIaWRlKCkge1xuICAgICAgICB0aGlzLiRtb3VzZUluVG9vbHRpcCA9IGZhbHNlO1xuICAgICAgICB0aGlzLiRzaG93VG9vbHRpcFRpbWVyLmNhbmNlbCgpO1xuICAgICAgICB0aGlzLiRoaWRlVG9vbHRpcFRpbWVyLmRlbGF5KCk7XG4gICAgfVxuXG4gICAgJHRvb2x0aXBFbnRlcigpIHtcbiAgICAgICAgdGhpcy4kbW91c2VJblRvb2x0aXAgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy4kc2hvd1Rvb2x0aXBUaW1lci5pc1BlbmRpbmcoKSkge1xuICAgICAgICAgICAgdGhpcy4kc2hvd1Rvb2x0aXBUaW1lci5jYW5jZWwoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy4kaGlkZVRvb2x0aXBUaW1lci5pc1BlbmRpbmcoKSkge1xuICAgICAgICAgICAgdGhpcy4kaGlkZVRvb2x0aXBUaW1lci5jYW5jZWwoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICR1cGRhdGVPbkhvdmVySGFuZGxlcnMoZW5hYmxlSG92ZXIpIHtcbiAgICAgICAgdmFyIHRvb2x0aXBFbCA9IHRoaXMudG9vbHRpcC5nZXRFbGVtZW50KCk7XG4gICAgICAgIHZhciBtb3JlT3B0aW9uc0VsID0gdGhpcy5tb3JlT3B0aW9ucy5nZXRFbGVtZW50KCk7XG4gICAgICAgIGlmIChlbmFibGVIb3Zlcikge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3Iub24oXCJtb3VzZW1vdmVcIiwgdGhpcy4kb25Nb3VzZU1vdmUpO1xuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLnJlbmRlcmVyLmdldE1vdXNlRXZlbnRUYXJnZXQoKS5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgdGhpcy4kc2NoZWR1bGVUb29sdGlwRm9ySGlkZSwgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0b29sdGlwRWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuJHRvb2x0aXBFbnRlcik7XG4gICAgICAgICAgICB0b29sdGlwRWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuJHNjaGVkdWxlVG9vbHRpcEZvckhpZGUpO1xuICAgICAgICAgICAgbW9yZU9wdGlvbnNFbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdGhpcy4kdG9vbHRpcEVudGVyKTtcbiAgICAgICAgICAgIG1vcmVPcHRpb25zRWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMuJHNjaGVkdWxlVG9vbHRpcEZvckhpZGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuZWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lZGl0b3Iub2ZmKFwibW91c2Vtb3ZlXCIsIHRoaXMuJG9uTW91c2VNb3ZlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmVkaXRvci5yZW5kZXJlci5nZXRNb3VzZUV2ZW50VGFyZ2V0KCkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIHRoaXMuJHNjaGVkdWxlVG9vbHRpcEZvckhpZGUsIHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdG9vbHRpcEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0aGlzLiR0b29sdGlwRW50ZXIpO1xuICAgICAgICAgICAgdG9vbHRpcEVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLiRzY2hlZHVsZVRvb2x0aXBGb3JIaWRlKTtcbiAgICAgICAgICAgIG1vcmVPcHRpb25zRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRoaXMuJHRvb2x0aXBFbnRlcik7XG4gICAgICAgICAgICBtb3JlT3B0aW9uc0VsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLiRzY2hlZHVsZVRvb2x0aXBGb3JIaWRlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICRzaG93VG9vbHRpcCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNTaG93bigpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy50b29sdGlwLnNldFRoZW1lKHRoaXMuZWRpdG9yLnJlbmRlcmVyLnRoZW1lKTtcbiAgICAgICAgdGhpcy50b29sdGlwLnNldENsYXNzTmFtZShUT09MVElQX0NMQVNTX05BTUUgKyBcIl93cmFwcGVyXCIpO1xuICAgICAgICB0aGlzLnRvb2x0aXAuc2hvdygpO1xuICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuICAgICAgICB0aGlzLnVwZGF0ZVBvc2l0aW9uKCk7XG4gICAgICAgIHRoaXMuX3NpZ25hbChcInNob3dcIik7XG4gICAgfVxuICAgIFxuICAgICRoaWRlVG9vbHRpcCgpIHtcbiAgICAgICAgdGhpcy4kbW91c2VJblRvb2x0aXAgPSBmYWxzZTtcbiAgICAgICAgaWYgKCF0aGlzLmlzU2hvd24oKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubW9yZU9wdGlvbnMuaGlkZSgpO1xuICAgICAgICB0aGlzLnRvb2x0aXAuaGlkZSgpO1xuICAgICAgICB0aGlzLl9zaWduYWwoXCJoaWRlXCIpO1xuICAgIH1cblxuICAgICR1cGRhdGVFbGVtZW50KGlkKSB7XG4gICAgICAgIHZhciBjb21tYW5kID0gdGhpcy5jb21tYW5kc1tpZF07XG4gICAgICAgIGlmICghY29tbWFuZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBlbCA9IHRoaXMuZWxlbWVudHNbaWRdO1xuICAgICAgICB2YXIgY29tbWFuZEVuYWJsZWQgPSBjb21tYW5kLmVuYWJsZWQ7XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGNvbW1hbmRFbmFibGVkID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjb21tYW5kRW5hYmxlZCA9IGNvbW1hbmRFbmFibGVkKHRoaXMuZWRpdG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgY29tbWFuZC5nZXRWYWx1ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gY29tbWFuZC5nZXRWYWx1ZSh0aGlzLmVkaXRvcik7XG4gICAgICAgICAgICBpZiAoY29tbWFuZC50eXBlID09PSAndGV4dCcpIHtcbiAgICAgICAgICAgICAgICBlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb21tYW5kLnR5cGUgPT09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICAgICAgICB2YXIgZG9tQ3NzRm4gPSB2YWx1ZSA/IGRvbS5hZGRDc3NDbGFzcyA6IGRvbS5yZW1vdmVDc3NDbGFzcztcbiAgICAgICAgICAgICAgICB2YXIgaXNPblRvb2x0aXAgPSBlbC5wYXJlbnRFbGVtZW50ID09PSB0aGlzLnRvb2x0aXBFbDtcbiAgICAgICAgICAgICAgICBlbC5hcmlhQ2hlY2tlZCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGlmIChpc09uVG9vbHRpcCkge1xuICAgICAgICAgICAgICAgICAgICBkb21Dc3NGbihlbCwgXCJhY2Vfc2VsZWN0ZWRcIik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZWwgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLlwiICsgVkFMVUVfQ0xBU1NfTkFNRSk7XG4gICAgICAgICAgICAgICAgICAgIGRvbUNzc0ZuKGVsLCBcImFjZV9jaGVja21hcmtcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbW1hbmRFbmFibGVkICYmIGVsLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBkb20ucmVtb3ZlQ3NzQ2xhc3MoZWwsIFwiYWNlX2Rpc2FibGVkXCIpO1xuICAgICAgICAgICAgZWwuYXJpYURpc2FibGVkID0gZWwuZGlzYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZShcImRpc2FibGVkXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKCFjb21tYW5kRW5hYmxlZCAmJiAhZWwuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGRvbS5hZGRDc3NDbGFzcyhlbCwgXCJhY2VfZGlzYWJsZWRcIik7XG4gICAgICAgICAgICBlbC5hcmlhRGlzYWJsZWQgPSBlbC5kaXNhYmxlZCA9IHRydWU7XG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLCBcIlwiKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxub29wLmltcGxlbWVudChDb21tYW5kQmFyVG9vbHRpcC5wcm90b3R5cGUsIEV2ZW50RW1pdHRlcik7XG5cbmRvbS5pbXBvcnRDc3NTdHJpbmcoYFxuLmFjZV90b29sdGlwLiR7VE9PTFRJUF9DTEFTU19OQU1FfV93cmFwcGVyIHtcbiAgICBwYWRkaW5nOiAwO1xufVxuXG4uYWNlX3Rvb2x0aXAgLiR7VE9PTFRJUF9DTEFTU19OQU1FfSB7XG4gICAgcGFkZGluZzogMXB4IDVweDtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xufVxuXG4uYWNlX3Rvb2x0aXAgLiR7VE9PTFRJUF9DTEFTU19OQU1FfS50b29sdGlwX21vcmVfb3B0aW9ucyB7XG4gICAgcGFkZGluZzogMXB4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbmRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfSB7XG4gICAgZGlzcGxheTogaW5saW5lLWZsZXg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIG1hcmdpbjogMXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBwYWRkaW5nOiAycHggNXB4O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbmRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfS5hY2Vfc2VsZWN0ZWQsXG5kaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX06aG92ZXI6bm90KC5hY2VfZGlzYWJsZWQpIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMSk7XG59XG5cbmRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfS5hY2VfZGlzYWJsZWQge1xuICAgIGNvbG9yOiAjNzc3O1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xufVxuXG5kaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX0gLmFjZV9pY29uX3N2ZyB7XG4gICAgaGVpZ2h0OiAxMnB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMwMDA7XG59XG5cbmRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfS5hY2VfZGlzYWJsZWQgLmFjZV9pY29uX3N2ZyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzc3Nztcbn1cblxuLiR7VE9PTFRJUF9DTEFTU19OQU1FfS50b29sdGlwX21vcmVfb3B0aW9ucyAuJHtCVVRUT05fQ0xBU1NfTkFNRX0ge1xuICAgIGRpc3BsYXk6IGZsZXg7XG59XG5cbi4ke1RPT0xUSVBfQ0xBU1NfTkFNRX0uJHtWQUxVRV9DTEFTU19OQU1FfSB7XG4gICAgZGlzcGxheTogbm9uZTtcbn1cblxuLiR7VE9PTFRJUF9DTEFTU19OQU1FfS50b29sdGlwX21vcmVfb3B0aW9ucyAuJHtWQUxVRV9DTEFTU19OQU1FfSB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHdpZHRoOiAxMnB4O1xufVxuXG4uJHtDQVBUSU9OX0NMQVNTX05BTUV9IHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi4ke0tFWUJJTkRJTkdfQ0xBU1NfTkFNRX0ge1xuICAgIG1hcmdpbjogMCAycHg7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIGZvbnQtc2l6ZTogOHB4O1xufVxuXG4uJHtUT09MVElQX0NMQVNTX05BTUV9LnRvb2x0aXBfbW9yZV9vcHRpb25zIC4ke0tFWUJJTkRJTkdfQ0xBU1NfTkFNRX0ge1xuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xufVxuXG4uJHtLRVlCSU5ESU5HX0NMQVNTX05BTUV9IGRpdiB7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIG1pbi13aWR0aDogOHB4O1xuICAgIHBhZGRpbmc6IDJweDtcbiAgICBtYXJnaW46IDAgMXB4O1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2NjO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLmFjZV9kYXJrLmFjZV90b29sdGlwIC4ke1RPT0xUSVBfQ0xBU1NfTkFNRX0ge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICMzNzM3Mzc7XG4gICAgY29sb3I6ICNlZWU7XG59XG5cbi5hY2VfZGFyayBkaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX0uYWNlX2Rpc2FibGVkIHtcbiAgICBjb2xvcjogIzk3OTc5Nztcbn1cblxuLmFjZV9kYXJrIGRpdi4ke0JVVFRPTl9DTEFTU19OQU1FfS5hY2Vfc2VsZWN0ZWQsXG4uYWNlX2RhcmsgZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9OmhvdmVyOm5vdCguYWNlX2Rpc2FibGVkKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjEpO1xufVxuXG4uYWNlX2RhcmsgZGl2LiR7QlVUVE9OX0NMQVNTX05BTUV9IC5hY2VfaWNvbl9zdmcge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG59XG5cbi5hY2VfZGFyayBkaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX0uYWNlX2Rpc2FibGVkIC5hY2VfaWNvbl9zdmcge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM5Nzk3OTc7XG59XG5cbi5hY2VfZGFyayAuJHtCVVRUT05fQ0xBU1NfTkFNRX0uYWNlX2Rpc2FibGVkIHtcbiAgICBjb2xvcjogIzk3OTc5Nztcbn1cblxuLmFjZV9kYXJrIC4ke0tFWUJJTkRJTkdfQ0xBU1NfTkFNRX0gZGl2IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNTc1NzU3O1xufVxuXG4uYWNlX2NoZWNrbWFyazo6YmVmb3JlIHtcbiAgICBjb250ZW50OiAn4pyTJztcbn1cbmAsIFwiY29tbWFuZGJhci5jc3NcIiwgZmFsc2UpO1xuXG5leHBvcnRzLkNvbW1hbmRCYXJUb29sdGlwID0gQ29tbWFuZEJhclRvb2x0aXA7XG5leHBvcnRzLlRPT0xUSVBfQ0xBU1NfTkFNRSA9IFRPT0xUSVBfQ0xBU1NfTkFNRTtcbmV4cG9ydHMuQlVUVE9OX0NMQVNTX05BTUUgPSBCVVRUT05fQ0xBU1NfTkFNRTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgSGFzaEhhbmRsZXIgPSByZXF1aXJlKFwiLi4va2V5Ym9hcmQvaGFzaF9oYW5kbGVyXCIpLkhhc2hIYW5kbGVyO1xudmFyIEFjZUlubGluZSA9IHJlcXVpcmUoXCIuLi9hdXRvY29tcGxldGUvaW5saW5lXCIpLkFjZUlubGluZTtcbnZhciBGaWx0ZXJlZExpc3QgPSByZXF1aXJlKFwiLi4vYXV0b2NvbXBsZXRlXCIpLkZpbHRlcmVkTGlzdDtcbnZhciBDb21wbGV0aW9uUHJvdmlkZXIgPSByZXF1aXJlKFwiLi4vYXV0b2NvbXBsZXRlXCIpLkNvbXBsZXRpb25Qcm92aWRlcjtcbnZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi4vZWRpdG9yXCIpLkVkaXRvcjtcbnZhciB1dGlsID0gcmVxdWlyZShcIi4uL2F1dG9jb21wbGV0ZS91dGlsXCIpO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9saWIvZG9tXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgQ29tbWFuZEJhclRvb2x0aXAgPSByZXF1aXJlKFwiLi9jb21tYW5kX2JhclwiKS5Db21tYW5kQmFyVG9vbHRpcDtcbnZhciBCVVRUT05fQ0xBU1NfTkFNRSA9IHJlcXVpcmUoXCIuL2NvbW1hbmRfYmFyXCIpLkJVVFRPTl9DTEFTU19OQU1FO1xuXG52YXIgc25pcHBldENvbXBsZXRlciA9IHJlcXVpcmUoXCIuL2xhbmd1YWdlX3Rvb2xzXCIpLnNuaXBwZXRDb21wbGV0ZXI7XG52YXIgdGV4dENvbXBsZXRlciA9IHJlcXVpcmUoXCIuL2xhbmd1YWdlX3Rvb2xzXCIpLnRleHRDb21wbGV0ZXI7XG52YXIga2V5V29yZENvbXBsZXRlciA9IHJlcXVpcmUoXCIuL2xhbmd1YWdlX3Rvb2xzXCIpLmtleVdvcmRDb21wbGV0ZXI7XG5cbnZhciBkZXN0cm95Q29tcGxldGVyID0gZnVuY3Rpb24oZSwgZWRpdG9yKSB7XG4gICAgZWRpdG9yLmNvbXBsZXRlciAmJiBlZGl0b3IuY29tcGxldGVyLmRlc3Ryb3koKTtcbn07XG5cbi8qKlxuICogVGhpcyBjbGFzcyBjb250cm9scyB0aGUgaW5saW5lLW9ubHkgYXV0b2NvbXBsZXRpb24gY29tcG9uZW50cyBhbmQgdGhlaXIgbGlmZWN5Y2xlLlxuICogVGhpcyBpcyBtb3JlIGxpZ2h0d2VpZ2h0IHRoYW4gdGhlIHBvcHVwLWJhc2VkIGF1dG9jb21wbGV0aW9uLCBhcyBpdCBjYW4gb25seSB3b3JrIHdpdGggZXhhY3QgcHJlZml4IG1hdGNoZXMuXG4gKiBUaGVyZSBpcyBhbiBpbmxpbmUgZ2hvc3QgdGV4dCByZW5kZXJlciBhbmQgYW4gb3B0aW9uYWwgY29tbWFuZCBiYXIgdG9vbHRpcCBpbnNpZGUuXG4gKi9cbmNsYXNzIElubGluZUF1dG9jb21wbGV0ZSB7XG4gICAgY29uc3RydWN0b3IoZWRpdG9yKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yO1xuICAgICAgICB0aGlzLmtleWJvYXJkSGFuZGxlciA9IG5ldyBIYXNoSGFuZGxlcih0aGlzLmNvbW1hbmRzKTtcbiAgICAgICAgdGhpcy4kaW5kZXggPSAtMTtcblxuICAgICAgICB0aGlzLmJsdXJMaXN0ZW5lciA9IHRoaXMuYmx1ckxpc3RlbmVyLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY2hhbmdlTGlzdGVuZXIgPSB0aGlzLmNoYW5nZUxpc3RlbmVyLmJpbmQodGhpcyk7XG5cblxuICAgICAgICB0aGlzLmNoYW5nZVRpbWVyID0gbGFuZy5kZWxheWVkQ2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ29tcGxldGlvbnMoKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgXG4gICAgZ2V0SW5saW5lUmVuZGVyZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbmxpbmVSZW5kZXJlcilcbiAgICAgICAgICAgIHRoaXMuaW5saW5lUmVuZGVyZXIgPSBuZXcgQWNlSW5saW5lKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmlubGluZVJlbmRlcmVyO1xuICAgIH1cblxuICAgIGdldElubGluZVRvb2x0aXAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pbmxpbmVUb29sdGlwKSB7XG4gICAgICAgICAgICB0aGlzLmlubGluZVRvb2x0aXAgPSBJbmxpbmVBdXRvY29tcGxldGUuY3JlYXRlSW5saW5lVG9vbHRpcChkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaW5saW5lVG9vbHRpcDtcbiAgICB9XG5cblxuICAgIC8qKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMgdGhlIGVudHJ5IHBvaW50IHRvIHRoZSBjbGFzcy4gVGhpcyB0cmlnZ2VycyB0aGUgZ2F0aGVyaW5nIG9mIHRoZSBhdXRvY29tcGxldGlvbiBhbmQgZGlzcGxheWluZyB0aGUgcmVzdWx0cztcbiAgICAgKiBAcGFyYW0ge0NvbXBsZXRpb25PcHRpb25zfSBvcHRpb25zXG4gICAgICovXG4gICAgc2hvdyhvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuYWN0aXZhdGVkID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy5lZGl0b3IuY29tcGxldGVyICE9PSB0aGlzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lZGl0b3IuY29tcGxldGVyKVxuICAgICAgICAgICAgICAgIHRoaXMuZWRpdG9yLmNvbXBsZXRlci5kZXRhY2goKTtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLmNvbXBsZXRlciA9IHRoaXM7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVkaXRvci5vbihcImNoYW5nZVNlbGVjdGlvblwiLCB0aGlzLmNoYW5nZUxpc3RlbmVyKTtcbiAgICAgICAgdGhpcy5lZGl0b3Iub24oXCJibHVyXCIsIHRoaXMuYmx1ckxpc3RlbmVyKTtcblxuICAgICAgICB0aGlzLnVwZGF0ZUNvbXBsZXRpb25zKG9wdGlvbnMpO1xuICAgIH1cblxuICAgICRvcGVuKCkge1xuICAgICAgICBpZiAodGhpcy5lZGl0b3IudGV4dElucHV0LnNldEFyaWFPcHRpb25zKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci50ZXh0SW5wdXQuc2V0QXJpYU9wdGlvbnMoe30pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5lZGl0b3Iua2V5QmluZGluZy5hZGRLZXlib2FyZEhhbmRsZXIodGhpcy5rZXlib2FyZEhhbmRsZXIpO1xuICAgICAgICB0aGlzLmdldElubGluZVRvb2x0aXAoKS5hdHRhY2godGhpcy5lZGl0b3IpO1xuXG4gICAgICAgIGlmICh0aGlzLiRpbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0SW5kZXgoMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLiRzaG93Q29tcGxldGlvbigpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLmNoYW5nZVRpbWVyLmNhbmNlbCgpO1xuICAgIH1cbiAgICBcbiAgICBpbnNlcnRNYXRjaCgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuZ2V0Q29tcGxldGlvblByb3ZpZGVyKCkuaW5zZXJ0QnlJbmRleCh0aGlzLmVkaXRvciwgdGhpcy4kaW5kZXgpO1xuICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGNoYW5nZUxpc3RlbmVyKGUpIHtcbiAgICAgICAgdmFyIGN1cnNvciA9IHRoaXMuZWRpdG9yLnNlbGVjdGlvbi5sZWFkO1xuICAgICAgICBpZiAoY3Vyc29yLnJvdyAhPSB0aGlzLmJhc2Uucm93IHx8IGN1cnNvci5jb2x1bW4gPCB0aGlzLmJhc2UuY29sdW1uKSB7XG4gICAgICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmFjdGl2YXRlZClcbiAgICAgICAgICAgIHRoaXMuY2hhbmdlVGltZXIuc2NoZWR1bGUoKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgdGhpcy5kZXRhY2goKTtcbiAgICB9XG5cbiAgICBibHVyTGlzdGVuZXIoZSkge1xuICAgICAgICB0aGlzLmRldGFjaCgpO1xuICAgIH1cblxuICAgIGdvVG8od2hlcmUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBsZXRpb25zIHx8ICF0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbXBsZXRpb25MZW5ndGggPSB0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkLmxlbmd0aDtcbiAgICAgICAgc3dpdGNoKHdoZXJlLnRvTG93ZXJDYXNlKCkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJwcmV2XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbmRleCgodGhpcy4kaW5kZXggLSAxICsgY29tcGxldGlvbkxlbmd0aCkgJSBjb21wbGV0aW9uTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJuZXh0XCI6XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRJbmRleCgodGhpcy4kaW5kZXggKyAxICsgY29tcGxldGlvbkxlbmd0aCkgJSBjb21wbGV0aW9uTGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJmaXJzdFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SW5kZXgoMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwibGFzdFwiOlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0SW5kZXgodGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldExlbmd0aCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBsZXRpb25zIHx8ICF0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZC5sZW5ndGg7XG4gICAgfVxuXG4gICAgZ2V0RGF0YShpbmRleCkge1xuICAgICAgICBpZiAoaW5kZXggPT0gdW5kZWZpbmVkIHx8IGluZGV4ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZFt0aGlzLiRpbmRleF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZFtpbmRleF07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRJbmRleCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGluZGV4O1xuICAgIH1cblxuICAgIGlzT3BlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJGluZGV4ID49IDA7XG4gICAgfVxuXG4gICAgc2V0SW5kZXgodmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLmNvbXBsZXRpb25zIHx8ICF0aGlzLmNvbXBsZXRpb25zLmZpbHRlcmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG5ld0luZGV4ID0gTWF0aC5tYXgoLTEsIE1hdGgubWluKHRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWQubGVuZ3RoIC0gMSwgdmFsdWUpKTtcbiAgICAgICAgaWYgKG5ld0luZGV4ICE9PSB0aGlzLiRpbmRleCkge1xuICAgICAgICAgICAgdGhpcy4kaW5kZXggPSBuZXdJbmRleDtcbiAgICAgICAgICAgIHRoaXMuJHNob3dDb21wbGV0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRDb21wbGV0aW9uUHJvdmlkZXIoaW5pdGlhbFBvc2l0aW9uKSB7XG4gICAgICAgIGlmICghdGhpcy5jb21wbGV0aW9uUHJvdmlkZXIpXG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRpb25Qcm92aWRlciA9IG5ldyBDb21wbGV0aW9uUHJvdmlkZXIoaW5pdGlhbFBvc2l0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tcGxldGlvblByb3ZpZGVyO1xuICAgIH1cblxuICAgICRzaG93Q29tcGxldGlvbigpIHtcbiAgICAgICAgaWYgKCF0aGlzLmdldElubGluZVJlbmRlcmVyKCkuc2hvdyh0aGlzLmVkaXRvciwgdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZFt0aGlzLiRpbmRleF0sIHRoaXMuY29tcGxldGlvbnMuZmlsdGVyVGV4dCkpIHtcbiAgICAgICAgICAgIC8vIE5vdCBhYmxlIHRvIHNob3cgdGhlIGNvbXBsZXRpb24sIGhpZGUgdGhlIHByZXZpb3VzIG9uZVxuICAgICAgICAgICAgdGhpcy5nZXRJbmxpbmVSZW5kZXJlcigpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5pbmxpbmVUb29sdGlwICYmIHRoaXMuaW5saW5lVG9vbHRpcC5pc1Nob3duKCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5saW5lVG9vbHRpcC51cGRhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICR1cGRhdGVQcmVmaXgoKSB7XG4gICAgICAgIHZhciBwb3MgPSB0aGlzLmVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICB2YXIgcHJlZml4ID0gdGhpcy5lZGl0b3Iuc2Vzc2lvbi5nZXRUZXh0UmFuZ2Uoe3N0YXJ0OiB0aGlzLmJhc2UsIGVuZDogcG9zfSk7XG4gICAgICAgIHRoaXMuY29tcGxldGlvbnMuc2V0RmlsdGVyKHByZWZpeCk7XG4gICAgICAgIGlmICghdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZC5sZW5ndGgpXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZXRhY2goKTtcbiAgICAgICAgaWYgKHRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWQubGVuZ3RoID09IDFcbiAgICAgICAgJiYgdGhpcy5jb21wbGV0aW9ucy5maWx0ZXJlZFswXS52YWx1ZSA9PSBwcmVmaXhcbiAgICAgICAgJiYgIXRoaXMuY29tcGxldGlvbnMuZmlsdGVyZWRbMF0uc25pcHBldClcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRldGFjaCgpO1xuICAgICAgICB0aGlzLiRvcGVuKHRoaXMuZWRpdG9yLCBwcmVmaXgpO1xuICAgICAgICByZXR1cm4gcHJlZml4O1xuICAgIH1cblxuICAgIHVwZGF0ZUNvbXBsZXRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHByZWZpeCA9IFwiXCI7XG4gICAgICAgIFxuICAgICAgICBpZiAob3B0aW9ucyAmJiBvcHRpb25zLm1hdGNoZXMpIHtcbiAgICAgICAgICAgIHZhciBwb3MgPSB0aGlzLmVkaXRvci5nZXRTZWxlY3Rpb25SYW5nZSgpLnN0YXJ0O1xuICAgICAgICAgICAgdGhpcy5iYXNlID0gdGhpcy5lZGl0b3Iuc2Vzc2lvbi5kb2MuY3JlYXRlQW5jaG9yKHBvcy5yb3csIHBvcy5jb2x1bW4pO1xuICAgICAgICAgICAgdGhpcy5iYXNlLiRpbnNlcnRSaWdodCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmNvbXBsZXRpb25zID0gbmV3IEZpbHRlcmVkTGlzdChvcHRpb25zLm1hdGNoZXMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJG9wZW4odGhpcy5lZGl0b3IsIFwiXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuYmFzZSAmJiB0aGlzLmNvbXBsZXRpb25zKSB7XG4gICAgICAgICAgICBwcmVmaXggPSB0aGlzLiR1cGRhdGVQcmVmaXgoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzZXNzaW9uID0gdGhpcy5lZGl0b3IuZ2V0U2Vzc2lvbigpO1xuICAgICAgICB2YXIgcG9zID0gdGhpcy5lZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHByZWZpeCA9IHV0aWwuZ2V0Q29tcGxldGlvblByZWZpeCh0aGlzLmVkaXRvcik7XG4gICAgICAgIHRoaXMuYmFzZSA9IHNlc3Npb24uZG9jLmNyZWF0ZUFuY2hvcihwb3Mucm93LCBwb3MuY29sdW1uIC0gcHJlZml4Lmxlbmd0aCk7XG4gICAgICAgIHRoaXMuYmFzZS4kaW5zZXJ0UmlnaHQgPSB0cnVlO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGV4YWN0TWF0Y2g6IHRydWUsXG4gICAgICAgICAgICBpZ25vcmVDYXB0aW9uOiB0cnVlXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuZ2V0Q29tcGxldGlvblByb3ZpZGVyKHtcbiAgICAgICAgICAgIHByZWZpeCxcbiAgICAgICAgICAgIGJhc2U6IHRoaXMuYmFzZSxcbiAgICAgICAgICAgIHBvc1xuICAgICAgICB9KS5wcm92aWRlQ29tcGxldGlvbnModGhpcy5lZGl0b3IsIG9wdGlvbnMsIGZ1bmN0aW9uKGVyciwgY29tcGxldGlvbnMsIGZpbmlzaGVkKSB7XG4gICAgICAgICAgICB2YXIgZmlsdGVyZWQgPSBjb21wbGV0aW9ucy5maWx0ZXJlZDtcbiAgICAgICAgICAgIHZhciBwcmVmaXggPSB1dGlsLmdldENvbXBsZXRpb25QcmVmaXgodGhpcy5lZGl0b3IpO1xuXG4gICAgICAgICAgICBpZiAoZmluaXNoZWQpIHtcbiAgICAgICAgICAgICAgICAvLyBObyByZXN1bHRzXG4gICAgICAgICAgICAgICAgaWYgKCFmaWx0ZXJlZC5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRldGFjaCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gT25lIHJlc3VsdCBlcXVhbHMgdG8gdGhlIHByZWZpeFxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGggPT0gMSAmJiBmaWx0ZXJlZFswXS52YWx1ZSA9PSBwcmVmaXggJiYgIWZpbHRlcmVkWzBdLnNuaXBwZXQpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmRldGFjaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5jb21wbGV0aW9ucyA9IGNvbXBsZXRpb25zO1xuICAgICAgICAgICAgdGhpcy4kb3Blbih0aGlzLmVkaXRvciwgcHJlZml4KTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBkZXRhY2goKSB7XG4gICAgICAgIGlmICh0aGlzLmVkaXRvcikge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iua2V5QmluZGluZy5yZW1vdmVLZXlib2FyZEhhbmRsZXIodGhpcy5rZXlib2FyZEhhbmRsZXIpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iub2ZmKFwiY2hhbmdlU2VsZWN0aW9uXCIsIHRoaXMuY2hhbmdlTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iub2ZmKFwiYmx1clwiLCB0aGlzLmJsdXJMaXN0ZW5lcik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jaGFuZ2VUaW1lci5jYW5jZWwoKTtcbiAgICAgICAgaWYgKHRoaXMuaW5saW5lVG9vbHRpcCkge1xuICAgICAgICAgICAgdGhpcy5pbmxpbmVUb29sdGlwLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNldEluZGV4KC0xKTtcblxuICAgICAgICBpZiAodGhpcy5jb21wbGV0aW9uUHJvdmlkZXIpIHtcbiAgICAgICAgICAgIHRoaXMuY29tcGxldGlvblByb3ZpZGVyLmRldGFjaCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaW5saW5lUmVuZGVyZXIgJiYgdGhpcy5pbmxpbmVSZW5kZXJlci5pc09wZW4oKSkge1xuICAgICAgICAgICAgdGhpcy5pbmxpbmVSZW5kZXJlci5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5iYXNlKVxuICAgICAgICAgICAgdGhpcy5iYXNlLmRldGFjaCgpO1xuICAgICAgICB0aGlzLmFjdGl2YXRlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNvbXBsZXRpb25Qcm92aWRlciA9IHRoaXMuY29tcGxldGlvbnMgPSB0aGlzLmJhc2UgPSBudWxsO1xuICAgIH1cblxuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMuZGV0YWNoKCk7XG4gICAgICAgIGlmICh0aGlzLmlubGluZVJlbmRlcmVyKVxuICAgICAgICAgICAgdGhpcy5pbmxpbmVSZW5kZXJlci5kZXN0cm95KCk7XG4gICAgICAgIGlmICh0aGlzLmlubGluZVRvb2x0aXApXG4gICAgICAgICAgICB0aGlzLmlubGluZVRvb2x0aXAuZGVzdHJveSgpO1xuICAgICAgICBpZiAodGhpcy5lZGl0b3IgJiYgdGhpcy5lZGl0b3IuY29tcGxldGVyID09IHRoaXMpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLm9mZihcImRlc3Ryb3lcIiwgZGVzdHJveUNvbXBsZXRlcik7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5jb21wbGV0ZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5saW5lVG9vbHRpcCA9IHRoaXMuZWRpdG9yID0gdGhpcy5pbmxpbmVSZW5kZXJlciA9IG51bGw7XG4gICAgfVxuXG59XG5cbklubGluZUF1dG9jb21wbGV0ZS5wcm90b3R5cGUuY29tbWFuZHMgPSB7XG4gICAgXCJQcmV2aW91c1wiOiB7XG4gICAgICAgIGJpbmRLZXk6IFwiQWx0LVtcIixcbiAgICAgICAgbmFtZTogXCJQcmV2aW91c1wiLFxuICAgICAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgICAgIGVkaXRvci5jb21wbGV0ZXIuZ29UbyhcInByZXZcIik7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFwiTmV4dFwiOiB7XG4gICAgICAgIGJpbmRLZXk6IFwiQWx0LV1cIixcbiAgICAgICAgbmFtZTogXCJOZXh0XCIsXG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgZWRpdG9yLmNvbXBsZXRlci5nb1RvKFwibmV4dFwiKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJBY2NlcHRcIjoge1xuICAgICAgICBiaW5kS2V5OiB7IHdpbjogXCJUYWJ8Q3RybC1SaWdodFwiLCBtYWM6IFwiVGFifENtZC1SaWdodFwiIH0sXG4gICAgICAgIG5hbWU6IFwiQWNjZXB0XCIsXG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVkaXRvci5jb21wbGV0ZXIuaW5zZXJ0TWF0Y2goKTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgXCJDbG9zZVwiOiB7XG4gICAgICAgIGJpbmRLZXk6IFwiRXNjXCIsXG4gICAgICAgIG5hbWU6IFwiQ2xvc2VcIixcbiAgICAgICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgICBlZGl0b3IuY29tcGxldGVyLmRldGFjaCgpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuSW5saW5lQXV0b2NvbXBsZXRlLmZvciA9IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgIGlmIChlZGl0b3IuY29tcGxldGVyIGluc3RhbmNlb2YgSW5saW5lQXV0b2NvbXBsZXRlKSB7XG4gICAgICAgIHJldHVybiBlZGl0b3IuY29tcGxldGVyO1xuICAgIH1cbiAgICBpZiAoZWRpdG9yLmNvbXBsZXRlcikge1xuICAgICAgICBlZGl0b3IuY29tcGxldGVyLmRlc3Ryb3koKTtcbiAgICAgICAgZWRpdG9yLmNvbXBsZXRlciA9IG51bGw7XG4gICAgfVxuXG4gICAgZWRpdG9yLmNvbXBsZXRlciA9IG5ldyBJbmxpbmVBdXRvY29tcGxldGUoZWRpdG9yKTtcbiAgICBlZGl0b3Iub25jZShcImRlc3Ryb3lcIiwgZGVzdHJveUNvbXBsZXRlcik7XG4gICAgcmV0dXJuIGVkaXRvci5jb21wbGV0ZXI7XG59O1xuXG5JbmxpbmVBdXRvY29tcGxldGUuc3RhcnRDb21tYW5kID0ge1xuICAgIG5hbWU6IFwic3RhcnRJbmxpbmVBdXRvY29tcGxldGVcIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIGNvbXBsZXRlciA9IElubGluZUF1dG9jb21wbGV0ZS5mb3IoZWRpdG9yKTtcbiAgICAgICAgY29tcGxldGVyLnNob3cob3B0aW9ucyk7XG4gICAgfSxcbiAgICBiaW5kS2V5OiB7IHdpbjogXCJBbHQtQ1wiLCBtYWM6IFwiT3B0aW9uLUNcIiB9XG59O1xuXG5cbnZhciBjb21wbGV0ZXJzID0gW3NuaXBwZXRDb21wbGV0ZXIsIHRleHRDb21wbGV0ZXIsIGtleVdvcmRDb21wbGV0ZXJdO1xuXG5yZXF1aXJlKFwiLi4vY29uZmlnXCIpLmRlZmluZU9wdGlvbnMoRWRpdG9yLnByb3RvdHlwZSwgXCJlZGl0b3JcIiwge1xuICAgIGVuYWJsZUlubGluZUF1dG9jb21wbGV0aW9uOiB7XG4gICAgICAgIHNldDogZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICBpZiAodmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbXBsZXRlcnMpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tcGxldGVycyA9IEFycmF5LmlzQXJyYXkodmFsKT8gdmFsIDogY29tcGxldGVycztcbiAgICAgICAgICAgICAgICB0aGlzLmNvbW1hbmRzLmFkZENvbW1hbmQoSW5saW5lQXV0b2NvbXBsZXRlLnN0YXJ0Q29tbWFuZCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuY29tbWFuZHMucmVtb3ZlQ29tbWFuZChJbmxpbmVBdXRvY29tcGxldGUuc3RhcnRDb21tYW5kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgfVxufSk7XG5cbi8qKlxuICogRmFjdG9yeSBtZXRob2QgdG8gY3JlYXRlIGEgY29tbWFuZCBiYXIgdG9vbHRpcCBmb3IgaW5saW5lIGF1dG9jb21wbGV0ZS5cbiAqIFxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gcGFyZW50RWwgIFRoZSBwYXJlbnQgZWxlbWVudCB3aGVyZSB0aGUgdG9vbHRpcCBIVE1MIGVsZW1lbnRzIHdpbGwgYmUgYWRkZWQuXG4gKiBAcmV0dXJucyB7Q29tbWFuZEJhclRvb2x0aXB9ICAgVGhlIGNvbW1hbmQgYmFyIHRvb2x0aXAgZm9yIGlubGluZSBhdXRvY29tcGxldGVcbiAqL1xuSW5saW5lQXV0b2NvbXBsZXRlLmNyZWF0ZUlubGluZVRvb2x0aXAgPSBmdW5jdGlvbihwYXJlbnRFbCkge1xuICAgIHZhciBpbmxpbmVUb29sdGlwID0gbmV3IENvbW1hbmRCYXJUb29sdGlwKHBhcmVudEVsKTtcbiAgICBpbmxpbmVUb29sdGlwLnJlZ2lzdGVyQ29tbWFuZChcIlByZXZpb3VzXCIsIFxuICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBJbmxpbmVBdXRvY29tcGxldGUucHJvdG90eXBlLmNvbW1hbmRzW1wiUHJldmlvdXNcIl0sIHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgaWNvbkNzc0NsYXNzOiBcImFjZV9hcnJvd19yb3RhdGVkXCJcbiAgICAgICAgfSlcbiAgICApO1xuICAgIGlubGluZVRvb2x0aXAucmVnaXN0ZXJDb21tYW5kKFwiUG9zaXRpb25cIiwge1xuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgZ2V0VmFsdWU6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgcmV0dXJuIGVkaXRvciA/IFtlZGl0b3IuY29tcGxldGVyLmdldEluZGV4KCkgKyAxLCBlZGl0b3IuY29tcGxldGVyLmdldExlbmd0aCgpXS5qb2luKFwiL1wiKSA6IFwiXCI7XG4gICAgICAgIH0sXG4gICAgICAgIHR5cGU6IFwidGV4dFwiLFxuICAgICAgICBjc3NDbGFzczogXCJjb21wbGV0aW9uX3Bvc2l0aW9uXCJcbiAgICB9KTtcbiAgICBpbmxpbmVUb29sdGlwLnJlZ2lzdGVyQ29tbWFuZChcIk5leHRcIiwgXG4gICAgICAgIE9iamVjdC5hc3NpZ24oe30sIElubGluZUF1dG9jb21wbGV0ZS5wcm90b3R5cGUuY29tbWFuZHNbXCJOZXh0XCJdLCB7XG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgICAgdHlwZTogXCJidXR0b25cIixcbiAgICAgICAgICAgIGljb25Dc3NDbGFzczogXCJhY2VfYXJyb3dcIlxuICAgICAgICB9KVxuICAgICk7XG4gICAgaW5saW5lVG9vbHRpcC5yZWdpc3RlckNvbW1hbmQoXCJBY2NlcHRcIiwgXG4gICAgICAgIE9iamVjdC5hc3NpZ24oe30sIElubGluZUF1dG9jb21wbGV0ZS5wcm90b3R5cGUuY29tbWFuZHNbXCJBY2NlcHRcIl0sIHtcbiAgICAgICAgICAgIGVuYWJsZWQ6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgICAgIHJldHVybiAhIWVkaXRvciAmJiBlZGl0b3IuY29tcGxldGVyLmdldEluZGV4KCkgPj0gMDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvblwiXG4gICAgICAgIH0pXG4gICAgKTtcbiAgICBpbmxpbmVUb29sdGlwLnJlZ2lzdGVyQ29tbWFuZChcIlNob3dUb29sdGlwXCIsIHtcbiAgICAgICAgbmFtZTogXCJBbHdheXMgU2hvdyBUb29sdGlwXCIsXG4gICAgICAgIGV4ZWM6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaW5saW5lVG9vbHRpcC5zZXRBbHdheXNTaG93KCFpbmxpbmVUb29sdGlwLmdldEFsd2F5c1Nob3coKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgIGdldFZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBpbmxpbmVUb29sdGlwLmdldEFsd2F5c1Nob3coKTtcbiAgICAgICAgfSxcbiAgICAgICAgdHlwZTogXCJjaGVja2JveFwiXG4gICAgfSk7XG4gICAgcmV0dXJuIGlubGluZVRvb2x0aXA7XG59O1xuXG5kb20uaW1wb3J0Q3NzU3RyaW5nKGBcblxuLmFjZV9pY29uX3N2Zy5hY2VfYXJyb3csXG4uYWNlX2ljb25fc3ZnLmFjZV9hcnJvd19yb3RhdGVkIHtcbiAgICAtd2Via2l0LW1hc2staW1hZ2U6IHVybChcImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjNhV1IwYUQwaU1UWWlJR2hsYVdkb2REMGlNVFlpSUhacFpYZENiM2c5SWpBZ01DQXhOaUF4TmlJZ1ptbHNiRDBpYm05dVpTSWdlRzFzYm5NOUltaDBkSEE2THk5M2QzY3Vkek11YjNKbkx6SXdNREF2YzNabklqNDhjR0YwYUNCbWFXeHNMWEoxYkdVOUltVjJaVzV2WkdRaUlHTnNhWEF0Y25Wc1pUMGlaWFpsYm05a1pDSWdaRDBpVFRVdU9ETTNNREVnTVRWTU5DNDFPRGMxTVNBeE15NDNNVFUxVERFd0xqRTBOamdnT0V3MExqVTROelV4SURJdU1qZzBORFpNTlM0NE16Y3dNU0F4VERFeUxqWTBOalVnT0V3MUxqZ3pOekF4SURFMVdpSWdabWxzYkQwaVlteGhZMnNpTHo0OEwzTjJaejQ9XCIpO1xufVxuXG4uYWNlX2ljb25fc3ZnLmFjZV9hcnJvd19yb3RhdGVkIHtcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgxODBkZWcpO1xufVxuXG5kaXYuJHtCVVRUT05fQ0xBU1NfTkFNRX0uY29tcGxldGlvbl9wb3NpdGlvbiB7XG4gICAgcGFkZGluZzogMDtcbn1cbmAsIFwiaW5saW5lYXV0b2NvbXBsZXRlLmNzc1wiLCBmYWxzZSk7XG5cbmV4cG9ydHMuSW5saW5lQXV0b2NvbXBsZXRlID0gSW5saW5lQXV0b2NvbXBsZXRlO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9