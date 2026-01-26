(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1570],{

/***/ 40024:
/***/ ((module) => {

module.exports = `

/* ------------------------------------------------------------------------------------------
 * Editor Search Form
 * --------------------------------------------------------------------------------------- */
.ace_search {
    background-color: #ddd;
    color: #666;
    border: 1px solid #cbcbcb;
    border-top: 0 none;
    overflow: hidden;
    margin: 0;
    padding: 4px 6px 0 4px;
    position: absolute;
    top: 0;
    z-index: 99;
    white-space: normal;
}
.ace_search.left {
    border-left: 0 none;
    border-radius: 0px 0px 5px 0px;
    left: 0;
}
.ace_search.right {
    border-radius: 0px 0px 0px 5px;
    border-right: 0 none;
    right: 0;
}

.ace_search_form, .ace_replace_form {
    margin: 0 20px 4px 0;
    overflow: hidden;
    line-height: 1.9;
}
.ace_replace_form {
    margin-right: 0;
}
.ace_search_form.ace_nomatch {
    outline: 1px solid red;
}

.ace_search_field {
    border-radius: 3px 0 0 3px;
    background-color: white;
    color: black;
    border: 1px solid #cbcbcb;
    border-right: 0 none;
    outline: 0;
    padding: 0;
    font-size: inherit;
    margin: 0;
    line-height: inherit;
    padding: 0 6px;
    min-width: 17em;
    vertical-align: top;
    min-height: 1.8em;
    box-sizing: content-box;
}
.ace_searchbtn {
    border: 1px solid #cbcbcb;
    line-height: inherit;
    display: inline-block;
    padding: 0 6px;
    background: #fff;
    border-right: 0 none;
    border-left: 1px solid #dcdcdc;
    cursor: pointer;
    margin: 0;
    position: relative;
    color: #666;
}
.ace_searchbtn:last-child {
    border-radius: 0 3px 3px 0;
    border-right: 1px solid #cbcbcb;
}
.ace_searchbtn:disabled {
    background: none;
    cursor: default;
}
.ace_searchbtn:hover {
    background-color: #eef1f6;
}
.ace_searchbtn.prev, .ace_searchbtn.next {
     padding: 0px 0.7em
}
.ace_searchbtn.prev:after, .ace_searchbtn.next:after {
     content: "";
     border: solid 2px #888;
     width: 0.5em;
     height: 0.5em;
     border-width:  2px 0 0 2px;
     display:inline-block;
     transform: rotate(-45deg);
}
.ace_searchbtn.next:after {
     border-width: 0 2px 2px 0 ;
}
.ace_searchbtn_close {
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAcCAYAAABRVo5BAAAAZ0lEQVR42u2SUQrAMAhDvazn8OjZBilCkYVVxiis8H4CT0VrAJb4WHT3C5xU2a2IQZXJjiQIRMdkEoJ5Q2yMqpfDIo+XY4k6h+YXOyKqTIj5REaxloNAd0xiKmAtsTHqW8sR2W5f7gCu5nWFUpVjZwAAAABJRU5ErkJggg==) no-repeat 50% 0;
    border-radius: 50%;
    border: 0 none;
    color: #656565;
    cursor: pointer;
    font: 16px/16px Arial;
    padding: 0;
    height: 14px;
    width: 14px;
    top: 9px;
    right: 7px;
    position: absolute;
}
.ace_searchbtn_close:hover {
    background-color: #656565;
    background-position: 50% 100%;
    color: white;
}

.ace_button {
    margin-left: 2px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
    user-select: none;
    overflow: hidden;
    opacity: 0.7;
    border: 1px solid rgba(100,100,100,0.23);
    padding: 1px;
    box-sizing:    border-box!important;
    color: black;
}

.ace_button:hover {
    background-color: #eee;
    opacity:1;
}
.ace_button:active {
    background-color: #ddd;
}

.ace_button.checked {
    border-color: #3399ff;
    opacity:1;
}

.ace_search_options{
    margin-bottom: 3px;
    text-align: right;
    -webkit-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
    user-select: none;
    clear: both;
}

.ace_search_counter {
    float: left;
    font-family: arial;
    padding: 0 8px;
}`;


/***/ }),

/***/ 41570:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * ## Interactive search and replace UI extension for text editing
 *
 * Provides a floating search box interface with find/replace functionality including live search results, regex
 * support, case sensitivity options, whole word matching, and scoped selection searching. Features keyboard shortcuts
 * for quick access and navigation, with visual feedback for search matches and a counter showing current position
 * in results.
 *
 * **Key Features:**
 * - Real-time search with highlighted matches
 * - Find and replace with individual or bulk operations
 * - Advanced options: regex, case sensitivity, whole words, search in selection
 * - Keyboard navigation and shortcuts
 * - Visual match counter and no-match indicators
 *
 * **Usage:**
 * ```javascript
 * // Show search box
 * require("ace/ext/searchbox").Search(editor);
 *
 * // Show with replace functionality
 * require("ace/ext/searchbox").Search(editor, true);
 * ```
 *
 * @module
 */



/**
 * @typedef {import("../editor").Editor} Editor
 */
var dom = __webpack_require__(71435);
var lang = __webpack_require__(39955);
var event = __webpack_require__(19631);
var searchboxCss = __webpack_require__(40024);
var HashHandler = (__webpack_require__(93050).HashHandler);
var keyUtil = __webpack_require__(29451);
var nls = (__webpack_require__(76321).nls);

var MAX_COUNT = 999;

dom.importCssString(searchboxCss, "ace_searchbox", false);

class SearchBox {
    /**
     * @param {Editor} editor
     * @param {never} [range]
     * @param {never} [showReplaceForm]
     */
    constructor(editor, range, showReplaceForm) {
        /**@type {HTMLInputElement}*/
        this.activeInput;
        /**@type {HTMLDivElement}*/
        this.element = dom.buildDom(["div", {class:"ace_search right"},
            ["span", {action: "hide", class: "ace_searchbtn_close"}],
            ["div", {class: "ace_search_form"},
                ["input", {class: "ace_search_field", placeholder: nls("search-box.find.placeholder", "Search for"), spellcheck: "false"}],
                ["span", {action: "findPrev", class: "ace_searchbtn prev"}, "\u200b"],
                ["span", {action: "findNext", class: "ace_searchbtn next"}, "\u200b"],
                ["span", {action: "findAll", class: "ace_searchbtn", title: "Alt-Enter"}, nls("search-box.find-all.text", "All")]
            ],
            ["div", {class: "ace_replace_form"},
                ["input", {class: "ace_search_field", placeholder: nls("search-box.replace.placeholder", "Replace with"), spellcheck: "false"}],
                ["span", {action: "replaceAndFindNext", class: "ace_searchbtn"}, nls("search-box.replace-next.text", "Replace")],
                ["span", {action: "replaceAll", class: "ace_searchbtn"}, nls("search-box.replace-all.text", "All")]
            ],
            ["div", {class: "ace_search_options"},
                ["span", {action: "toggleReplace", class: "ace_button", title: nls("search-box.toggle-replace.title", "Toggle Replace mode"),
                    style: "float:left;margin-top:-2px;padding:0 5px;"}, "+"],
                ["span", {class: "ace_search_counter"}],
                ["span", {action: "toggleRegexpMode", class: "ace_button", title: nls("search-box.toggle-regexp.title", "RegExp Search")}, ".*"],
                ["span", {action: "toggleCaseSensitive", class: "ace_button", title: nls("search-box.toggle-case.title", "CaseSensitive Search")}, "Aa"],
                ["span", {action: "toggleWholeWords", class: "ace_button", title: nls("search-box.toggle-whole-word.title", "Whole Word Search")}, "\\b"],
                ["span", {action: "searchInSelection", class: "ace_button", title: nls("search-box.toggle-in-selection.title", "Search In Selection")}, "S"]
            ]
        ]);

        this.setSession = this.setSession.bind(this);
        this.$onEditorInput = this.onEditorInput.bind(this);

        this.$init();
        this.setEditor(editor);
        dom.importCssString(searchboxCss, "ace_searchbox", editor.container);
        event.addListener(this.element, "touchstart", function(e) { e.stopPropagation(); }, editor);
    }

    /**
     * @param {Editor} editor
     */
    setEditor(editor) {
        editor.searchBox = this;
        editor.renderer.scroller.appendChild(this.element);
        /**@type {Editor}*/
        this.editor = editor;
    }

    setSession(e) {
        this.searchRange = null;
        this.$syncOptions(true);
    }

    // Auto update "updateCounter" and "ace_nomatch"
    onEditorInput() {
        this.find(false, false, true);
    }

    /**
     * @param {HTMLElement} sb
     */
    $initElements(sb) {
        /**@type {HTMLElement}*/
        this.searchBox = sb.querySelector(".ace_search_form");
        /**@type {HTMLElement}*/
        this.replaceBox = sb.querySelector(".ace_replace_form");
        /**@type {HTMLInputElement}*/
        this.searchOption = sb.querySelector("[action=searchInSelection]");
        /**@type {HTMLInputElement}*/
        this.replaceOption = sb.querySelector("[action=toggleReplace]");
        /**@type {HTMLInputElement}*/
        this.regExpOption = sb.querySelector("[action=toggleRegexpMode]");
        /**@type {HTMLInputElement}*/
        this.caseSensitiveOption = sb.querySelector("[action=toggleCaseSensitive]");
        /**@type {HTMLInputElement}*/
        this.wholeWordOption = sb.querySelector("[action=toggleWholeWords]");
        /**@type {HTMLInputElement}*/
        this.searchInput = this.searchBox.querySelector(".ace_search_field");
        /**@type {HTMLInputElement}*/
        this.replaceInput = this.replaceBox.querySelector(".ace_search_field");
        /**@type {HTMLElement}*/
        this.searchCounter = sb.querySelector(".ace_search_counter");
    }

    $init() {
        var sb = this.element;

        this.$initElements(sb);

        var _this = this;
        event.addListener(sb, "mousedown", function(e) {
            setTimeout(function(){
                _this.activeInput.focus();
            }, 0);
            event.stopPropagation(e);
        });
        event.addListener(sb, "click", function(e) {
            var t = e.target || e.srcElement;
            var action = t.getAttribute("action");
            if (action && _this[action])
                _this[action]();
            else if (_this.$searchBarKb.commands[action])
                _this.$searchBarKb.commands[action].exec(_this);
            event.stopPropagation(e);
        });

        event.addCommandKeyListener(sb, function(e, hashId, keyCode) {
            var keyString = keyUtil.keyCodeToString(keyCode);
            var command = _this.$searchBarKb.findKeyCommand(hashId, keyString);
            if (command && command.exec) {
                command.exec(_this);
                event.stopEvent(e);
            }
        });

        /**
         * @type {{schedule: (timeout?: number) => void}}
         * @external
        */
        this.$onChange = lang.delayedCall(function() {
            _this.find(false, false);
        });

        event.addListener(this.searchInput, "input", function() {
            _this.$onChange.schedule(20);
        });
        event.addListener(this.searchInput, "focus", function() {
            _this.activeInput = _this.searchInput;
            _this.searchInput.value && _this.highlight();
        });
        event.addListener(this.replaceInput, "focus", function() {
            _this.activeInput = _this.replaceInput;
            _this.searchInput.value && _this.highlight();
        });
    }

    setSearchRange(range) {
        this.searchRange = range;
        if (range) {
            this.searchRangeMarker = this.editor.session.addMarker(range, "ace_active-line");
        } else if (this.searchRangeMarker) {
            this.editor.session.removeMarker(this.searchRangeMarker);
            this.searchRangeMarker = null;
        }
    }

    /**
     * @param {boolean} [preventScroll]
     * @external
     */
    $syncOptions(preventScroll) {
        dom.setCssClass(this.replaceOption, "checked", this.searchRange);
        dom.setCssClass(this.searchOption, "checked", this.searchOption.checked);
        this.replaceOption.textContent = this.replaceOption.checked ? "-" : "+";
        dom.setCssClass(this.regExpOption, "checked", this.regExpOption.checked);
        dom.setCssClass(this.wholeWordOption, "checked", this.wholeWordOption.checked);
        dom.setCssClass(this.caseSensitiveOption, "checked", this.caseSensitiveOption.checked);
        var readOnly = this.editor.getReadOnly();
        this.replaceOption.style.display = readOnly ? "none" : "";
        this.replaceBox.style.display = this.replaceOption.checked && !readOnly ? "" : "none";
        this.find(false, false, preventScroll);
    }

    /**
     * @param {RegExp} [re]
     */
    highlight(re) {
        this.editor.session.highlight(re || this.editor.$search.$options.re);
        this.editor.renderer.updateBackMarkers();
    }

    /**
     * @param {boolean} skipCurrent
     * @param {boolean} backwards
     * @param {any} [preventScroll]
     */
    find(skipCurrent, backwards, preventScroll) {
        if (!this.editor.session) return;
        var range = this.editor.find(this.searchInput.value, {
            skipCurrent: skipCurrent,
            backwards: backwards,
            wrap: true,
            regExp: this.regExpOption.checked,
            caseSensitive: this.caseSensitiveOption.checked,
            wholeWord: this.wholeWordOption.checked,
            preventScroll: preventScroll,
            range: this.searchRange
        });
        /**@type {any}*/
        var noMatch = !range && this.searchInput.value;
        dom.setCssClass(this.searchBox, "ace_nomatch", noMatch);
        this.editor._emit("findSearchBox", { match: !noMatch });
        this.highlight();
        this.updateCounter();
    }
    updateCounter() {
        var editor = this.editor;
        var regex = editor.$search.$options.re;
        var supportsUnicodeFlag = regex.unicode;
        var all = 0;
        var before = 0;
        if (regex) {
            var value = this.searchRange
                ? editor.session.getTextRange(this.searchRange)
                : editor.getValue();

            /**
             * Convert all line ending variations to Unix-style = \n
             * Windows (\r\n), MacOS Classic (\r), and Unix (\n)
             */
            if (editor.$search.$isMultilineSearch(editor.getLastSearchOptions())) {
                value = value.replace(/\r\n|\r|\n/g, "\n");
                editor.session.doc.$autoNewLine = "\n";
            }

            var offset = editor.session.doc.positionToIndex(editor.selection.anchor);
            if (this.searchRange)
                offset -= editor.session.doc.positionToIndex(this.searchRange.start);

            var last = regex.lastIndex = 0;
            var m;
            while ((m = regex.exec(value))) {
                all++;
                last = m.index;
                if (last <= offset)
                    before++;
                if (all > MAX_COUNT)
                    break;
                if (!m[0]) {
                    regex.lastIndex = last += lang.skipEmptyMatch(value, last, supportsUnicodeFlag);
                    if (last >= value.length)
                        break;
                }
            }
        }
        this.searchCounter.textContent = nls("search-box.search-counter", "$0 of $1", [before , (all > MAX_COUNT ? MAX_COUNT + "+" : all)]);
    }
    findNext() {
        this.find(true, false);
    }
    findPrev() {
        this.find(true, true);
    }
    findAll(){
        var range = this.editor.findAll(this.searchInput.value, {
            regExp: this.regExpOption.checked,
            caseSensitive: this.caseSensitiveOption.checked,
            wholeWord: this.wholeWordOption.checked
        });
        /**@type {any}*/
        var noMatch = !range && this.searchInput.value;
        dom.setCssClass(this.searchBox, "ace_nomatch", noMatch);
        this.editor._emit("findSearchBox", { match: !noMatch });
        this.highlight();
        this.hide();
    }
    replace() {
        if (!this.editor.getReadOnly())
            this.editor.replace(this.replaceInput.value);
    }
    replaceAndFindNext() {
        if (!this.editor.getReadOnly()) {
            this.editor.replace(this.replaceInput.value);
            this.findNext();
        }
    }
    replaceAll() {
        if (!this.editor.getReadOnly())
            this.editor.replaceAll(this.replaceInput.value);
    }

    hide() {
        this.active = false;
        this.setSearchRange(null);
        this.editor.off("changeSession", this.setSession);
        this.editor.off("input", this.$onEditorInput);

        this.element.style.display = "none";
        this.editor.keyBinding.removeKeyboardHandler(this.$closeSearchBarKb);
        this.editor.focus();
    }

    /**
     * @param {string} value
     * @param {boolean} [isReplace]
     */
    show(value, isReplace) {
        this.active = true;
        this.editor.on("changeSession", this.setSession);
        this.editor.on("input", this.$onEditorInput);
        this.element.style.display = "";
        this.replaceOption.checked = isReplace;

        if (this.editor.$search.$options.regExp)
            value = lang.escapeRegExp(value);

        if (value != undefined)
            this.searchInput.value = value;

        this.searchInput.focus();
        this.searchInput.select();

        this.editor.keyBinding.addKeyboardHandler(this.$closeSearchBarKb);

        this.$syncOptions(true);
    }

    isFocused() {
        var el = document.activeElement;
        return el == this.searchInput || el == this.replaceInput;
    }
}

//keybinding outside of the searchbox
var $searchBarKb = new HashHandler();
$searchBarKb.bindKeys({
    "Ctrl-f|Command-f": function(sb) {
        var isReplace = sb.isReplace = !sb.isReplace;
        sb.replaceBox.style.display = isReplace ? "" : "none";
        sb.replaceOption.checked = false;
        sb.$syncOptions();
        sb.searchInput.focus();
    },
    "Ctrl-H|Command-Option-F": function(sb) {
        if (sb.editor.getReadOnly())
            return;
        sb.replaceOption.checked = true;
        sb.$syncOptions();
        sb.replaceInput.focus();
    },
    "Ctrl-G|Command-G": function(sb) {
        sb.findNext();
    },
    "Ctrl-Shift-G|Command-Shift-G": function(sb) {
        sb.findPrev();
    },
    "esc": function(sb) {
        setTimeout(function() { sb.hide();});
    },
    "Return": function(sb) {
        if (sb.activeInput == sb.replaceInput)
            sb.replace();
        sb.findNext();
    },
    "Shift-Return": function(sb) {
        if (sb.activeInput == sb.replaceInput)
            sb.replace();
        sb.findPrev();
    },
    "Alt-Return": function(sb) {
        if (sb.activeInput == sb.replaceInput)
            sb.replaceAll();
        sb.findAll();
    },
    "Tab": function(sb) {
        (sb.activeInput == sb.replaceInput ? sb.searchInput : sb.replaceInput).focus();
    }
});

$searchBarKb.addCommands([{
    name: "toggleRegexpMode",
    bindKey: {win: "Alt-R|Alt-/", mac: "Ctrl-Alt-R|Ctrl-Alt-/"},
    exec: function(sb) {
        sb.regExpOption.checked = !sb.regExpOption.checked;
        sb.$syncOptions();
    }
}, {
    name: "toggleCaseSensitive",
    bindKey: {win: "Alt-C|Alt-I", mac: "Ctrl-Alt-R|Ctrl-Alt-I"},
    exec: function(sb) {
        sb.caseSensitiveOption.checked = !sb.caseSensitiveOption.checked;
        sb.$syncOptions();
    }
}, {
    name: "toggleWholeWords",
    bindKey: {win: "Alt-B|Alt-W", mac: "Ctrl-Alt-B|Ctrl-Alt-W"},
    exec: function(sb) {
        sb.wholeWordOption.checked = !sb.wholeWordOption.checked;
        sb.$syncOptions();
    }
}, {
    name: "toggleReplace",
    exec: function(sb) {
        sb.replaceOption.checked = !sb.replaceOption.checked;
        sb.$syncOptions();
    }
}, {
    name: "searchInSelection",
    exec: function(sb) {
        sb.searchOption.checked = !sb.searchRange;
        sb.setSearchRange(sb.searchOption.checked && sb.editor.getSelectionRange());
        sb.$syncOptions();
    }
}]);

//keybinding outside of the searchbox
var $closeSearchBarKb = new HashHandler([{
    bindKey: "Esc",
    name: "closeSearchBar",
    exec: function(editor) {
        editor.searchBox.hide();
    }
}]);

SearchBox.prototype.$searchBarKb = $searchBarKb;
SearchBox.prototype.$closeSearchBarKb = $closeSearchBarKb;

exports.SearchBox = SearchBox;

/**
 * Shows the search box for the editor with optional replace functionality.
 *
 * @param {Editor} editor - The editor instance
 * @param {boolean} [isReplace] - Whether to show replace options
 */
exports.Search = function(editor, isReplace) {
    var sb = editor.searchBox || new SearchBox(editor);
    var range = editor.session.selection.getRange();
    var value = range.isMultiLine() ? "" : editor.session.getTextRange(range);
    sb.show(value, isReplace);
};


/* ------------------------------------------------------------------------------------------
 * TODO
 * --------------------------------------------------------------------------------------- */
/*
- move search form to the left if it masks current word
- include all options that search has. ex: regex
- searchbox.searchbox is not that pretty. We should have just searchbox
- disable prev button if it makes sense
*/


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjE1NzAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7O0FDaktEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsY0FBYyxpREFBaUQ7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxjQUFjLGlEQUFpRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGNBQWMsaURBQWlEO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFNBQVM7QUFDcEI7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3NlYXJjaGJveC1jc3MuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3NlYXJjaGJveC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGBcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBFZGl0b3IgU2VhcmNoIEZvcm1cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLmFjZV9zZWFyY2gge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XG4gICAgY29sb3I6ICM2NjY7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NiY2JjYjtcbiAgICBib3JkZXItdG9wOiAwIG5vbmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogNHB4IDZweCAwIDRweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHotaW5kZXg6IDk5O1xuICAgIHdoaXRlLXNwYWNlOiBub3JtYWw7XG59XG4uYWNlX3NlYXJjaC5sZWZ0IHtcbiAgICBib3JkZXItbGVmdDogMCBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDBweCAwcHggNXB4IDBweDtcbiAgICBsZWZ0OiAwO1xufVxuLmFjZV9zZWFyY2gucmlnaHQge1xuICAgIGJvcmRlci1yYWRpdXM6IDBweCAwcHggMHB4IDVweDtcbiAgICBib3JkZXItcmlnaHQ6IDAgbm9uZTtcbiAgICByaWdodDogMDtcbn1cblxuLmFjZV9zZWFyY2hfZm9ybSwgLmFjZV9yZXBsYWNlX2Zvcm0ge1xuICAgIG1hcmdpbjogMCAyMHB4IDRweCAwO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgbGluZS1oZWlnaHQ6IDEuOTtcbn1cbi5hY2VfcmVwbGFjZV9mb3JtIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XG59XG4uYWNlX3NlYXJjaF9mb3JtLmFjZV9ub21hdGNoIHtcbiAgICBvdXRsaW5lOiAxcHggc29saWQgcmVkO1xufVxuXG4uYWNlX3NlYXJjaF9maWVsZCB7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4IDAgMCAzcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgY29sb3I6IGJsYWNrO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjYmNiY2I7XG4gICAgYm9yZGVyLXJpZ2h0OiAwIG5vbmU7XG4gICAgb3V0bGluZTogMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGZvbnQtc2l6ZTogaW5oZXJpdDtcbiAgICBtYXJnaW46IDA7XG4gICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XG4gICAgcGFkZGluZzogMCA2cHg7XG4gICAgbWluLXdpZHRoOiAxN2VtO1xuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gICAgbWluLWhlaWdodDogMS44ZW07XG4gICAgYm94LXNpemluZzogY29udGVudC1ib3g7XG59XG4uYWNlX3NlYXJjaGJ0biB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NiY2JjYjtcbiAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgcGFkZGluZzogMCA2cHg7XG4gICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICBib3JkZXItcmlnaHQ6IDAgbm9uZTtcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNkY2RjZGM7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIG1hcmdpbjogMDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgY29sb3I6ICM2NjY7XG59XG4uYWNlX3NlYXJjaGJ0bjpsYXN0LWNoaWxkIHtcbiAgICBib3JkZXItcmFkaXVzOiAwIDNweCAzcHggMDtcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjY2JjYmNiO1xufVxuLmFjZV9zZWFyY2hidG46ZGlzYWJsZWQge1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xufVxuLmFjZV9zZWFyY2hidG46aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWYxZjY7XG59XG4uYWNlX3NlYXJjaGJ0bi5wcmV2LCAuYWNlX3NlYXJjaGJ0bi5uZXh0IHtcbiAgICAgcGFkZGluZzogMHB4IDAuN2VtXG59XG4uYWNlX3NlYXJjaGJ0bi5wcmV2OmFmdGVyLCAuYWNlX3NlYXJjaGJ0bi5uZXh0OmFmdGVyIHtcbiAgICAgY29udGVudDogXCJcIjtcbiAgICAgYm9yZGVyOiBzb2xpZCAycHggIzg4ODtcbiAgICAgd2lkdGg6IDAuNWVtO1xuICAgICBoZWlnaHQ6IDAuNWVtO1xuICAgICBib3JkZXItd2lkdGg6ICAycHggMCAwIDJweDtcbiAgICAgZGlzcGxheTppbmxpbmUtYmxvY2s7XG4gICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG59XG4uYWNlX3NlYXJjaGJ0bi5uZXh0OmFmdGVyIHtcbiAgICAgYm9yZGVyLXdpZHRoOiAwIDJweCAycHggMCA7XG59XG4uYWNlX3NlYXJjaGJ0bl9jbG9zZSB7XG4gICAgYmFja2dyb3VuZDogdXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQTRBQUFBY0NBWUFBQUJSVm81QkFBQUFaMGxFUVZSNDJ1MlNVUXJBTUFoRHZhem44T2paQmlsQ2tZVlZ4aWlzOEg0Q1QwVnJBSmI0V0hUM0M1eFUyYTJJUVpYSmppUUlSTWRrRW9KNVEyeU1xcGZESW8rWFk0azZoK1lYT3lLcVRJajVSRWF4bG9OQWQweGlLbUF0c1RIcVc4c1IyVzVmN2dDdTVuV0ZVcFZqWndBQUFBQkpSVTVFcmtKZ2dnPT0pIG5vLXJlcGVhdCA1MCUgMDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYm9yZGVyOiAwIG5vbmU7XG4gICAgY29sb3I6ICM2NTY1NjU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZvbnQ6IDE2cHgvMTZweCBBcmlhbDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGhlaWdodDogMTRweDtcbiAgICB3aWR0aDogMTRweDtcbiAgICB0b3A6IDlweDtcbiAgICByaWdodDogN3B4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cbi5hY2Vfc2VhcmNoYnRuX2Nsb3NlOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjU2NTY1O1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDUwJSAxMDAlO1xuICAgIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmFjZV9idXR0b24ge1xuICAgIG1hcmdpbi1sZWZ0OiAycHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtby11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBvcGFjaXR5OiAwLjc7XG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgxMDAsMTAwLDEwMCwwLjIzKTtcbiAgICBwYWRkaW5nOiAxcHg7XG4gICAgYm94LXNpemluZzogICAgYm9yZGVyLWJveCFpbXBvcnRhbnQ7XG4gICAgY29sb3I6IGJsYWNrO1xufVxuXG4uYWNlX2J1dHRvbjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbiAgICBvcGFjaXR5OjE7XG59XG4uYWNlX2J1dHRvbjphY3RpdmUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XG59XG5cbi5hY2VfYnV0dG9uLmNoZWNrZWQge1xuICAgIGJvcmRlci1jb2xvcjogIzMzOTlmZjtcbiAgICBvcGFjaXR5OjE7XG59XG5cbi5hY2Vfc2VhcmNoX29wdGlvbnN7XG4gICAgbWFyZ2luLWJvdHRvbTogM3B4O1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtby11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgY2xlYXI6IGJvdGg7XG59XG5cbi5hY2Vfc2VhcmNoX2NvdW50ZXIge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIGZvbnQtZmFtaWx5OiBhcmlhbDtcbiAgICBwYWRkaW5nOiAwIDhweDtcbn1gO1xuIiwiLyoqXG4gKiAjIyBJbnRlcmFjdGl2ZSBzZWFyY2ggYW5kIHJlcGxhY2UgVUkgZXh0ZW5zaW9uIGZvciB0ZXh0IGVkaXRpbmdcbiAqXG4gKiBQcm92aWRlcyBhIGZsb2F0aW5nIHNlYXJjaCBib3ggaW50ZXJmYWNlIHdpdGggZmluZC9yZXBsYWNlIGZ1bmN0aW9uYWxpdHkgaW5jbHVkaW5nIGxpdmUgc2VhcmNoIHJlc3VsdHMsIHJlZ2V4XG4gKiBzdXBwb3J0LCBjYXNlIHNlbnNpdGl2aXR5IG9wdGlvbnMsIHdob2xlIHdvcmQgbWF0Y2hpbmcsIGFuZCBzY29wZWQgc2VsZWN0aW9uIHNlYXJjaGluZy4gRmVhdHVyZXMga2V5Ym9hcmQgc2hvcnRjdXRzXG4gKiBmb3IgcXVpY2sgYWNjZXNzIGFuZCBuYXZpZ2F0aW9uLCB3aXRoIHZpc3VhbCBmZWVkYmFjayBmb3Igc2VhcmNoIG1hdGNoZXMgYW5kIGEgY291bnRlciBzaG93aW5nIGN1cnJlbnQgcG9zaXRpb25cbiAqIGluIHJlc3VsdHMuXG4gKlxuICogKipLZXkgRmVhdHVyZXM6KipcbiAqIC0gUmVhbC10aW1lIHNlYXJjaCB3aXRoIGhpZ2hsaWdodGVkIG1hdGNoZXNcbiAqIC0gRmluZCBhbmQgcmVwbGFjZSB3aXRoIGluZGl2aWR1YWwgb3IgYnVsayBvcGVyYXRpb25zXG4gKiAtIEFkdmFuY2VkIG9wdGlvbnM6IHJlZ2V4LCBjYXNlIHNlbnNpdGl2aXR5LCB3aG9sZSB3b3Jkcywgc2VhcmNoIGluIHNlbGVjdGlvblxuICogLSBLZXlib2FyZCBuYXZpZ2F0aW9uIGFuZCBzaG9ydGN1dHNcbiAqIC0gVmlzdWFsIG1hdGNoIGNvdW50ZXIgYW5kIG5vLW1hdGNoIGluZGljYXRvcnNcbiAqXG4gKiAqKlVzYWdlOioqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiAvLyBTaG93IHNlYXJjaCBib3hcbiAqIHJlcXVpcmUoXCJhY2UvZXh0L3NlYXJjaGJveFwiKS5TZWFyY2goZWRpdG9yKTtcbiAqXG4gKiAvLyBTaG93IHdpdGggcmVwbGFjZSBmdW5jdGlvbmFsaXR5XG4gKiByZXF1aXJlKFwiYWNlL2V4dC9zZWFyY2hib3hcIikuU2VhcmNoKGVkaXRvciwgdHJ1ZSk7XG4gKiBgYGBcbiAqXG4gKiBAbW9kdWxlXG4gKi9cblxuXG5cInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydChcIi4uL2VkaXRvclwiKS5FZGl0b3J9IEVkaXRvclxuICovXG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2xpYi9kb21cIik7XG52YXIgbGFuZyA9IHJlcXVpcmUoXCIuLi9saWIvbGFuZ1wiKTtcbnZhciBldmVudCA9IHJlcXVpcmUoXCIuLi9saWIvZXZlbnRcIik7XG52YXIgc2VhcmNoYm94Q3NzID0gcmVxdWlyZShcIi4vc2VhcmNoYm94LWNzc1wiKTtcbnZhciBIYXNoSGFuZGxlciA9IHJlcXVpcmUoXCIuLi9rZXlib2FyZC9oYXNoX2hhbmRsZXJcIikuSGFzaEhhbmRsZXI7XG52YXIga2V5VXRpbCA9IHJlcXVpcmUoXCIuLi9saWIva2V5c1wiKTtcbnZhciBubHMgPSByZXF1aXJlKFwiLi4vY29uZmlnXCIpLm5scztcblxudmFyIE1BWF9DT1VOVCA9IDk5OTtcblxuZG9tLmltcG9ydENzc1N0cmluZyhzZWFyY2hib3hDc3MsIFwiYWNlX3NlYXJjaGJveFwiLCBmYWxzZSk7XG5cbmNsYXNzIFNlYXJjaEJveCB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICAgICAqIEBwYXJhbSB7bmV2ZXJ9IFtyYW5nZV1cbiAgICAgKiBAcGFyYW0ge25ldmVyfSBbc2hvd1JlcGxhY2VGb3JtXVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGVkaXRvciwgcmFuZ2UsIHNob3dSZXBsYWNlRm9ybSkge1xuICAgICAgICAvKipAdHlwZSB7SFRNTElucHV0RWxlbWVudH0qL1xuICAgICAgICB0aGlzLmFjdGl2ZUlucHV0O1xuICAgICAgICAvKipAdHlwZSB7SFRNTERpdkVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZG9tLmJ1aWxkRG9tKFtcImRpdlwiLCB7Y2xhc3M6XCJhY2Vfc2VhcmNoIHJpZ2h0XCJ9LFxuICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcImhpZGVcIiwgY2xhc3M6IFwiYWNlX3NlYXJjaGJ0bl9jbG9zZVwifV0sXG4gICAgICAgICAgICBbXCJkaXZcIiwge2NsYXNzOiBcImFjZV9zZWFyY2hfZm9ybVwifSxcbiAgICAgICAgICAgICAgICBbXCJpbnB1dFwiLCB7Y2xhc3M6IFwiYWNlX3NlYXJjaF9maWVsZFwiLCBwbGFjZWhvbGRlcjogbmxzKFwic2VhcmNoLWJveC5maW5kLnBsYWNlaG9sZGVyXCIsIFwiU2VhcmNoIGZvclwiKSwgc3BlbGxjaGVjazogXCJmYWxzZVwifV0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcImZpbmRQcmV2XCIsIGNsYXNzOiBcImFjZV9zZWFyY2hidG4gcHJldlwifSwgXCJcXHUyMDBiXCJdLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJmaW5kTmV4dFwiLCBjbGFzczogXCJhY2Vfc2VhcmNoYnRuIG5leHRcIn0sIFwiXFx1MjAwYlwiXSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwiZmluZEFsbFwiLCBjbGFzczogXCJhY2Vfc2VhcmNoYnRuXCIsIHRpdGxlOiBcIkFsdC1FbnRlclwifSwgbmxzKFwic2VhcmNoLWJveC5maW5kLWFsbC50ZXh0XCIsIFwiQWxsXCIpXVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcImRpdlwiLCB7Y2xhc3M6IFwiYWNlX3JlcGxhY2VfZm9ybVwifSxcbiAgICAgICAgICAgICAgICBbXCJpbnB1dFwiLCB7Y2xhc3M6IFwiYWNlX3NlYXJjaF9maWVsZFwiLCBwbGFjZWhvbGRlcjogbmxzKFwic2VhcmNoLWJveC5yZXBsYWNlLnBsYWNlaG9sZGVyXCIsIFwiUmVwbGFjZSB3aXRoXCIpLCBzcGVsbGNoZWNrOiBcImZhbHNlXCJ9XSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwicmVwbGFjZUFuZEZpbmROZXh0XCIsIGNsYXNzOiBcImFjZV9zZWFyY2hidG5cIn0sIG5scyhcInNlYXJjaC1ib3gucmVwbGFjZS1uZXh0LnRleHRcIiwgXCJSZXBsYWNlXCIpXSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwicmVwbGFjZUFsbFwiLCBjbGFzczogXCJhY2Vfc2VhcmNoYnRuXCJ9LCBubHMoXCJzZWFyY2gtYm94LnJlcGxhY2UtYWxsLnRleHRcIiwgXCJBbGxcIildXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1wiZGl2XCIsIHtjbGFzczogXCJhY2Vfc2VhcmNoX29wdGlvbnNcIn0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcInRvZ2dsZVJlcGxhY2VcIiwgY2xhc3M6IFwiYWNlX2J1dHRvblwiLCB0aXRsZTogbmxzKFwic2VhcmNoLWJveC50b2dnbGUtcmVwbGFjZS50aXRsZVwiLCBcIlRvZ2dsZSBSZXBsYWNlIG1vZGVcIiksXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcImZsb2F0OmxlZnQ7bWFyZ2luLXRvcDotMnB4O3BhZGRpbmc6MCA1cHg7XCJ9LCBcIitcIl0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7Y2xhc3M6IFwiYWNlX3NlYXJjaF9jb3VudGVyXCJ9XSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwidG9nZ2xlUmVnZXhwTW9kZVwiLCBjbGFzczogXCJhY2VfYnV0dG9uXCIsIHRpdGxlOiBubHMoXCJzZWFyY2gtYm94LnRvZ2dsZS1yZWdleHAudGl0bGVcIiwgXCJSZWdFeHAgU2VhcmNoXCIpfSwgXCIuKlwiXSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwidG9nZ2xlQ2FzZVNlbnNpdGl2ZVwiLCBjbGFzczogXCJhY2VfYnV0dG9uXCIsIHRpdGxlOiBubHMoXCJzZWFyY2gtYm94LnRvZ2dsZS1jYXNlLnRpdGxlXCIsIFwiQ2FzZVNlbnNpdGl2ZSBTZWFyY2hcIil9LCBcIkFhXCJdLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJ0b2dnbGVXaG9sZVdvcmRzXCIsIGNsYXNzOiBcImFjZV9idXR0b25cIiwgdGl0bGU6IG5scyhcInNlYXJjaC1ib3gudG9nZ2xlLXdob2xlLXdvcmQudGl0bGVcIiwgXCJXaG9sZSBXb3JkIFNlYXJjaFwiKX0sIFwiXFxcXGJcIl0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcInNlYXJjaEluU2VsZWN0aW9uXCIsIGNsYXNzOiBcImFjZV9idXR0b25cIiwgdGl0bGU6IG5scyhcInNlYXJjaC1ib3gudG9nZ2xlLWluLXNlbGVjdGlvbi50aXRsZVwiLCBcIlNlYXJjaCBJbiBTZWxlY3Rpb25cIil9LCBcIlNcIl1cbiAgICAgICAgICAgIF1cbiAgICAgICAgXSk7XG5cbiAgICAgICAgdGhpcy5zZXRTZXNzaW9uID0gdGhpcy5zZXRTZXNzaW9uLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuJG9uRWRpdG9ySW5wdXQgPSB0aGlzLm9uRWRpdG9ySW5wdXQuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLiRpbml0KCk7XG4gICAgICAgIHRoaXMuc2V0RWRpdG9yKGVkaXRvcik7XG4gICAgICAgIGRvbS5pbXBvcnRDc3NTdHJpbmcoc2VhcmNoYm94Q3NzLCBcImFjZV9zZWFyY2hib3hcIiwgZWRpdG9yLmNvbnRhaW5lcik7XG4gICAgICAgIGV2ZW50LmFkZExpc3RlbmVyKHRoaXMuZWxlbWVudCwgXCJ0b3VjaHN0YXJ0XCIsIGZ1bmN0aW9uKGUpIHsgZS5zdG9wUHJvcGFnYXRpb24oKTsgfSwgZWRpdG9yKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICovXG4gICAgc2V0RWRpdG9yKGVkaXRvcikge1xuICAgICAgICBlZGl0b3Iuc2VhcmNoQm94ID0gdGhpcztcbiAgICAgICAgZWRpdG9yLnJlbmRlcmVyLnNjcm9sbGVyLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgICAgIC8qKkB0eXBlIHtFZGl0b3J9Ki9cbiAgICAgICAgdGhpcy5lZGl0b3IgPSBlZGl0b3I7XG4gICAgfVxuXG4gICAgc2V0U2Vzc2lvbihlKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoUmFuZ2UgPSBudWxsO1xuICAgICAgICB0aGlzLiRzeW5jT3B0aW9ucyh0cnVlKTtcbiAgICB9XG5cbiAgICAvLyBBdXRvIHVwZGF0ZSBcInVwZGF0ZUNvdW50ZXJcIiBhbmQgXCJhY2Vfbm9tYXRjaFwiXG4gICAgb25FZGl0b3JJbnB1dCgpIHtcbiAgICAgICAgdGhpcy5maW5kKGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gc2JcbiAgICAgKi9cbiAgICAkaW5pdEVsZW1lbnRzKHNiKSB7XG4gICAgICAgIC8qKkB0eXBlIHtIVE1MRWxlbWVudH0qL1xuICAgICAgICB0aGlzLnNlYXJjaEJveCA9IHNiLnF1ZXJ5U2VsZWN0b3IoXCIuYWNlX3NlYXJjaF9mb3JtXCIpO1xuICAgICAgICAvKipAdHlwZSB7SFRNTEVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy5yZXBsYWNlQm94ID0gc2IucXVlcnlTZWxlY3RvcihcIi5hY2VfcmVwbGFjZV9mb3JtXCIpO1xuICAgICAgICAvKipAdHlwZSB7SFRNTElucHV0RWxlbWVudH0qL1xuICAgICAgICB0aGlzLnNlYXJjaE9wdGlvbiA9IHNiLnF1ZXJ5U2VsZWN0b3IoXCJbYWN0aW9uPXNlYXJjaEluU2VsZWN0aW9uXVwiKTtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy5yZXBsYWNlT3B0aW9uID0gc2IucXVlcnlTZWxlY3RvcihcIlthY3Rpb249dG9nZ2xlUmVwbGFjZV1cIik7XG4gICAgICAgIC8qKkB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSovXG4gICAgICAgIHRoaXMucmVnRXhwT3B0aW9uID0gc2IucXVlcnlTZWxlY3RvcihcIlthY3Rpb249dG9nZ2xlUmVnZXhwTW9kZV1cIik7XG4gICAgICAgIC8qKkB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSovXG4gICAgICAgIHRoaXMuY2FzZVNlbnNpdGl2ZU9wdGlvbiA9IHNiLnF1ZXJ5U2VsZWN0b3IoXCJbYWN0aW9uPXRvZ2dsZUNhc2VTZW5zaXRpdmVdXCIpO1xuICAgICAgICAvKipAdHlwZSB7SFRNTElucHV0RWxlbWVudH0qL1xuICAgICAgICB0aGlzLndob2xlV29yZE9wdGlvbiA9IHNiLnF1ZXJ5U2VsZWN0b3IoXCJbYWN0aW9uPXRvZ2dsZVdob2xlV29yZHNdXCIpO1xuICAgICAgICAvKipAdHlwZSB7SFRNTElucHV0RWxlbWVudH0qL1xuICAgICAgICB0aGlzLnNlYXJjaElucHV0ID0gdGhpcy5zZWFyY2hCb3gucXVlcnlTZWxlY3RvcihcIi5hY2Vfc2VhcmNoX2ZpZWxkXCIpO1xuICAgICAgICAvKipAdHlwZSB7SFRNTElucHV0RWxlbWVudH0qL1xuICAgICAgICB0aGlzLnJlcGxhY2VJbnB1dCA9IHRoaXMucmVwbGFjZUJveC5xdWVyeVNlbGVjdG9yKFwiLmFjZV9zZWFyY2hfZmllbGRcIik7XG4gICAgICAgIC8qKkB0eXBlIHtIVE1MRWxlbWVudH0qL1xuICAgICAgICB0aGlzLnNlYXJjaENvdW50ZXIgPSBzYi5xdWVyeVNlbGVjdG9yKFwiLmFjZV9zZWFyY2hfY291bnRlclwiKTtcbiAgICB9XG5cbiAgICAkaW5pdCgpIHtcbiAgICAgICAgdmFyIHNiID0gdGhpcy5lbGVtZW50O1xuXG4gICAgICAgIHRoaXMuJGluaXRFbGVtZW50cyhzYik7XG5cbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgZXZlbnQuYWRkTGlzdGVuZXIoc2IsIFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBfdGhpcy5hY3RpdmVJbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBldmVudC5hZGRMaXN0ZW5lcihzYiwgXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgdCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSB0LmdldEF0dHJpYnV0ZShcImFjdGlvblwiKTtcbiAgICAgICAgICAgIGlmIChhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSlcbiAgICAgICAgICAgICAgICBfdGhpc1thY3Rpb25dKCk7XG4gICAgICAgICAgICBlbHNlIGlmIChfdGhpcy4kc2VhcmNoQmFyS2IuY29tbWFuZHNbYWN0aW9uXSlcbiAgICAgICAgICAgICAgICBfdGhpcy4kc2VhcmNoQmFyS2IuY29tbWFuZHNbYWN0aW9uXS5leGVjKF90aGlzKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbihlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXZlbnQuYWRkQ29tbWFuZEtleUxpc3RlbmVyKHNiLCBmdW5jdGlvbihlLCBoYXNoSWQsIGtleUNvZGUpIHtcbiAgICAgICAgICAgIHZhciBrZXlTdHJpbmcgPSBrZXlVdGlsLmtleUNvZGVUb1N0cmluZyhrZXlDb2RlKTtcbiAgICAgICAgICAgIHZhciBjb21tYW5kID0gX3RoaXMuJHNlYXJjaEJhcktiLmZpbmRLZXlDb21tYW5kKGhhc2hJZCwga2V5U3RyaW5nKTtcbiAgICAgICAgICAgIGlmIChjb21tYW5kICYmIGNvbW1hbmQuZXhlYykge1xuICAgICAgICAgICAgICAgIGNvbW1hbmQuZXhlYyhfdGhpcyk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcEV2ZW50KGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogQHR5cGUge3tzY2hlZHVsZTogKHRpbWVvdXQ/OiBudW1iZXIpID0+IHZvaWR9fVxuICAgICAgICAgKiBAZXh0ZXJuYWxcbiAgICAgICAgKi9cbiAgICAgICAgdGhpcy4kb25DaGFuZ2UgPSBsYW5nLmRlbGF5ZWRDYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMuZmluZChmYWxzZSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBldmVudC5hZGRMaXN0ZW5lcih0aGlzLnNlYXJjaElucHV0LCBcImlucHV0XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMuJG9uQ2hhbmdlLnNjaGVkdWxlKDIwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGV2ZW50LmFkZExpc3RlbmVyKHRoaXMuc2VhcmNoSW5wdXQsIFwiZm9jdXNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy5hY3RpdmVJbnB1dCA9IF90aGlzLnNlYXJjaElucHV0O1xuICAgICAgICAgICAgX3RoaXMuc2VhcmNoSW5wdXQudmFsdWUgJiYgX3RoaXMuaGlnaGxpZ2h0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBldmVudC5hZGRMaXN0ZW5lcih0aGlzLnJlcGxhY2VJbnB1dCwgXCJmb2N1c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF90aGlzLmFjdGl2ZUlucHV0ID0gX3RoaXMucmVwbGFjZUlucHV0O1xuICAgICAgICAgICAgX3RoaXMuc2VhcmNoSW5wdXQudmFsdWUgJiYgX3RoaXMuaGlnaGxpZ2h0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldFNlYXJjaFJhbmdlKHJhbmdlKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoUmFuZ2UgPSByYW5nZTtcbiAgICAgICAgaWYgKHJhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFJhbmdlTWFya2VyID0gdGhpcy5lZGl0b3Iuc2Vzc2lvbi5hZGRNYXJrZXIocmFuZ2UsIFwiYWNlX2FjdGl2ZS1saW5lXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VhcmNoUmFuZ2VNYXJrZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNlc3Npb24ucmVtb3ZlTWFya2VyKHRoaXMuc2VhcmNoUmFuZ2VNYXJrZXIpO1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hSYW5nZU1hcmtlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtwcmV2ZW50U2Nyb2xsXVxuICAgICAqIEBleHRlcm5hbFxuICAgICAqL1xuICAgICRzeW5jT3B0aW9ucyhwcmV2ZW50U2Nyb2xsKSB7XG4gICAgICAgIGRvbS5zZXRDc3NDbGFzcyh0aGlzLnJlcGxhY2VPcHRpb24sIFwiY2hlY2tlZFwiLCB0aGlzLnNlYXJjaFJhbmdlKTtcbiAgICAgICAgZG9tLnNldENzc0NsYXNzKHRoaXMuc2VhcmNoT3B0aW9uLCBcImNoZWNrZWRcIiwgdGhpcy5zZWFyY2hPcHRpb24uY2hlY2tlZCk7XG4gICAgICAgIHRoaXMucmVwbGFjZU9wdGlvbi50ZXh0Q29udGVudCA9IHRoaXMucmVwbGFjZU9wdGlvbi5jaGVja2VkID8gXCItXCIgOiBcIitcIjtcbiAgICAgICAgZG9tLnNldENzc0NsYXNzKHRoaXMucmVnRXhwT3B0aW9uLCBcImNoZWNrZWRcIiwgdGhpcy5yZWdFeHBPcHRpb24uY2hlY2tlZCk7XG4gICAgICAgIGRvbS5zZXRDc3NDbGFzcyh0aGlzLndob2xlV29yZE9wdGlvbiwgXCJjaGVja2VkXCIsIHRoaXMud2hvbGVXb3JkT3B0aW9uLmNoZWNrZWQpO1xuICAgICAgICBkb20uc2V0Q3NzQ2xhc3ModGhpcy5jYXNlU2Vuc2l0aXZlT3B0aW9uLCBcImNoZWNrZWRcIiwgdGhpcy5jYXNlU2Vuc2l0aXZlT3B0aW9uLmNoZWNrZWQpO1xuICAgICAgICB2YXIgcmVhZE9ubHkgPSB0aGlzLmVkaXRvci5nZXRSZWFkT25seSgpO1xuICAgICAgICB0aGlzLnJlcGxhY2VPcHRpb24uc3R5bGUuZGlzcGxheSA9IHJlYWRPbmx5ID8gXCJub25lXCIgOiBcIlwiO1xuICAgICAgICB0aGlzLnJlcGxhY2VCb3guc3R5bGUuZGlzcGxheSA9IHRoaXMucmVwbGFjZU9wdGlvbi5jaGVja2VkICYmICFyZWFkT25seSA/IFwiXCIgOiBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5maW5kKGZhbHNlLCBmYWxzZSwgcHJldmVudFNjcm9sbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtSZWdFeHB9IFtyZV1cbiAgICAgKi9cbiAgICBoaWdobGlnaHQocmUpIHtcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2Vzc2lvbi5oaWdobGlnaHQocmUgfHwgdGhpcy5lZGl0b3IuJHNlYXJjaC4kb3B0aW9ucy5yZSk7XG4gICAgICAgIHRoaXMuZWRpdG9yLnJlbmRlcmVyLnVwZGF0ZUJhY2tNYXJrZXJzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBza2lwQ3VycmVudFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYmFja3dhcmRzXG4gICAgICogQHBhcmFtIHthbnl9IFtwcmV2ZW50U2Nyb2xsXVxuICAgICAqL1xuICAgIGZpbmQoc2tpcEN1cnJlbnQsIGJhY2t3YXJkcywgcHJldmVudFNjcm9sbCkge1xuICAgICAgICBpZiAoIXRoaXMuZWRpdG9yLnNlc3Npb24pIHJldHVybjtcbiAgICAgICAgdmFyIHJhbmdlID0gdGhpcy5lZGl0b3IuZmluZCh0aGlzLnNlYXJjaElucHV0LnZhbHVlLCB7XG4gICAgICAgICAgICBza2lwQ3VycmVudDogc2tpcEN1cnJlbnQsXG4gICAgICAgICAgICBiYWNrd2FyZHM6IGJhY2t3YXJkcyxcbiAgICAgICAgICAgIHdyYXA6IHRydWUsXG4gICAgICAgICAgICByZWdFeHA6IHRoaXMucmVnRXhwT3B0aW9uLmNoZWNrZWQsXG4gICAgICAgICAgICBjYXNlU2Vuc2l0aXZlOiB0aGlzLmNhc2VTZW5zaXRpdmVPcHRpb24uY2hlY2tlZCxcbiAgICAgICAgICAgIHdob2xlV29yZDogdGhpcy53aG9sZVdvcmRPcHRpb24uY2hlY2tlZCxcbiAgICAgICAgICAgIHByZXZlbnRTY3JvbGw6IHByZXZlbnRTY3JvbGwsXG4gICAgICAgICAgICByYW5nZTogdGhpcy5zZWFyY2hSYW5nZVxuICAgICAgICB9KTtcbiAgICAgICAgLyoqQHR5cGUge2FueX0qL1xuICAgICAgICB2YXIgbm9NYXRjaCA9ICFyYW5nZSAmJiB0aGlzLnNlYXJjaElucHV0LnZhbHVlO1xuICAgICAgICBkb20uc2V0Q3NzQ2xhc3ModGhpcy5zZWFyY2hCb3gsIFwiYWNlX25vbWF0Y2hcIiwgbm9NYXRjaCk7XG4gICAgICAgIHRoaXMuZWRpdG9yLl9lbWl0KFwiZmluZFNlYXJjaEJveFwiLCB7IG1hdGNoOiAhbm9NYXRjaCB9KTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDb3VudGVyKCk7XG4gICAgfVxuICAgIHVwZGF0ZUNvdW50ZXIoKSB7XG4gICAgICAgIHZhciBlZGl0b3IgPSB0aGlzLmVkaXRvcjtcbiAgICAgICAgdmFyIHJlZ2V4ID0gZWRpdG9yLiRzZWFyY2guJG9wdGlvbnMucmU7XG4gICAgICAgIHZhciBzdXBwb3J0c1VuaWNvZGVGbGFnID0gcmVnZXgudW5pY29kZTtcbiAgICAgICAgdmFyIGFsbCA9IDA7XG4gICAgICAgIHZhciBiZWZvcmUgPSAwO1xuICAgICAgICBpZiAocmVnZXgpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuc2VhcmNoUmFuZ2VcbiAgICAgICAgICAgICAgICA/IGVkaXRvci5zZXNzaW9uLmdldFRleHRSYW5nZSh0aGlzLnNlYXJjaFJhbmdlKVxuICAgICAgICAgICAgICAgIDogZWRpdG9yLmdldFZhbHVlKCk7XG5cbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQ29udmVydCBhbGwgbGluZSBlbmRpbmcgdmFyaWF0aW9ucyB0byBVbml4LXN0eWxlID0gXFxuXG4gICAgICAgICAgICAgKiBXaW5kb3dzIChcXHJcXG4pLCBNYWNPUyBDbGFzc2ljIChcXHIpLCBhbmQgVW5peCAoXFxuKVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICBpZiAoZWRpdG9yLiRzZWFyY2guJGlzTXVsdGlsaW5lU2VhcmNoKGVkaXRvci5nZXRMYXN0U2VhcmNoT3B0aW9ucygpKSkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxyXFxufFxccnxcXG4vZywgXCJcXG5cIik7XG4gICAgICAgICAgICAgICAgZWRpdG9yLnNlc3Npb24uZG9jLiRhdXRvTmV3TGluZSA9IFwiXFxuXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBlZGl0b3Iuc2Vzc2lvbi5kb2MucG9zaXRpb25Ub0luZGV4KGVkaXRvci5zZWxlY3Rpb24uYW5jaG9yKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaFJhbmdlKVxuICAgICAgICAgICAgICAgIG9mZnNldCAtPSBlZGl0b3Iuc2Vzc2lvbi5kb2MucG9zaXRpb25Ub0luZGV4KHRoaXMuc2VhcmNoUmFuZ2Uuc3RhcnQpO1xuXG4gICAgICAgICAgICB2YXIgbGFzdCA9IHJlZ2V4Lmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICB2YXIgbTtcbiAgICAgICAgICAgIHdoaWxlICgobSA9IHJlZ2V4LmV4ZWModmFsdWUpKSkge1xuICAgICAgICAgICAgICAgIGFsbCsrO1xuICAgICAgICAgICAgICAgIGxhc3QgPSBtLmluZGV4O1xuICAgICAgICAgICAgICAgIGlmIChsYXN0IDw9IG9mZnNldClcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlKys7XG4gICAgICAgICAgICAgICAgaWYgKGFsbCA+IE1BWF9DT1VOVClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgaWYgKCFtWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4Lmxhc3RJbmRleCA9IGxhc3QgKz0gbGFuZy5za2lwRW1wdHlNYXRjaCh2YWx1ZSwgbGFzdCwgc3VwcG9ydHNVbmljb2RlRmxhZyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0ID49IHZhbHVlLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlYXJjaENvdW50ZXIudGV4dENvbnRlbnQgPSBubHMoXCJzZWFyY2gtYm94LnNlYXJjaC1jb3VudGVyXCIsIFwiJDAgb2YgJDFcIiwgW2JlZm9yZSAsIChhbGwgPiBNQVhfQ09VTlQgPyBNQVhfQ09VTlQgKyBcIitcIiA6IGFsbCldKTtcbiAgICB9XG4gICAgZmluZE5leHQoKSB7XG4gICAgICAgIHRoaXMuZmluZCh0cnVlLCBmYWxzZSk7XG4gICAgfVxuICAgIGZpbmRQcmV2KCkge1xuICAgICAgICB0aGlzLmZpbmQodHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGZpbmRBbGwoKXtcbiAgICAgICAgdmFyIHJhbmdlID0gdGhpcy5lZGl0b3IuZmluZEFsbCh0aGlzLnNlYXJjaElucHV0LnZhbHVlLCB7XG4gICAgICAgICAgICByZWdFeHA6IHRoaXMucmVnRXhwT3B0aW9uLmNoZWNrZWQsXG4gICAgICAgICAgICBjYXNlU2Vuc2l0aXZlOiB0aGlzLmNhc2VTZW5zaXRpdmVPcHRpb24uY2hlY2tlZCxcbiAgICAgICAgICAgIHdob2xlV29yZDogdGhpcy53aG9sZVdvcmRPcHRpb24uY2hlY2tlZFxuICAgICAgICB9KTtcbiAgICAgICAgLyoqQHR5cGUge2FueX0qL1xuICAgICAgICB2YXIgbm9NYXRjaCA9ICFyYW5nZSAmJiB0aGlzLnNlYXJjaElucHV0LnZhbHVlO1xuICAgICAgICBkb20uc2V0Q3NzQ2xhc3ModGhpcy5zZWFyY2hCb3gsIFwiYWNlX25vbWF0Y2hcIiwgbm9NYXRjaCk7XG4gICAgICAgIHRoaXMuZWRpdG9yLl9lbWl0KFwiZmluZFNlYXJjaEJveFwiLCB7IG1hdGNoOiAhbm9NYXRjaCB9KTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHQoKTtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICAgIHJlcGxhY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5lZGl0b3IuZ2V0UmVhZE9ubHkoKSlcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnJlcGxhY2UodGhpcy5yZXBsYWNlSW5wdXQudmFsdWUpO1xuICAgIH1cbiAgICByZXBsYWNlQW5kRmluZE5leHQoKSB7XG4gICAgICAgIGlmICghdGhpcy5lZGl0b3IuZ2V0UmVhZE9ubHkoKSkge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IucmVwbGFjZSh0aGlzLnJlcGxhY2VJbnB1dC52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmZpbmROZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVwbGFjZUFsbCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVkaXRvci5nZXRSZWFkT25seSgpKVxuICAgICAgICAgICAgdGhpcy5lZGl0b3IucmVwbGFjZUFsbCh0aGlzLnJlcGxhY2VJbnB1dC52YWx1ZSk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXRTZWFyY2hSYW5nZShudWxsKTtcbiAgICAgICAgdGhpcy5lZGl0b3Iub2ZmKFwiY2hhbmdlU2Vzc2lvblwiLCB0aGlzLnNldFNlc3Npb24pO1xuICAgICAgICB0aGlzLmVkaXRvci5vZmYoXCJpbnB1dFwiLCB0aGlzLiRvbkVkaXRvcklucHV0KTtcblxuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLmVkaXRvci5rZXlCaW5kaW5nLnJlbW92ZUtleWJvYXJkSGFuZGxlcih0aGlzLiRjbG9zZVNlYXJjaEJhcktiKTtcbiAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1JlcGxhY2VdXG4gICAgICovXG4gICAgc2hvdyh2YWx1ZSwgaXNSZXBsYWNlKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lZGl0b3Iub24oXCJjaGFuZ2VTZXNzaW9uXCIsIHRoaXMuc2V0U2Vzc2lvbik7XG4gICAgICAgIHRoaXMuZWRpdG9yLm9uKFwiaW5wdXRcIiwgdGhpcy4kb25FZGl0b3JJbnB1dCk7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgdGhpcy5yZXBsYWNlT3B0aW9uLmNoZWNrZWQgPSBpc1JlcGxhY2U7XG5cbiAgICAgICAgaWYgKHRoaXMuZWRpdG9yLiRzZWFyY2guJG9wdGlvbnMucmVnRXhwKVxuICAgICAgICAgICAgdmFsdWUgPSBsYW5nLmVzY2FwZVJlZ0V4cCh2YWx1ZSk7XG5cbiAgICAgICAgaWYgKHZhbHVlICE9IHVuZGVmaW5lZClcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXQudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLnNlYXJjaElucHV0LmZvY3VzKCk7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXQuc2VsZWN0KCk7XG5cbiAgICAgICAgdGhpcy5lZGl0b3Iua2V5QmluZGluZy5hZGRLZXlib2FyZEhhbmRsZXIodGhpcy4kY2xvc2VTZWFyY2hCYXJLYik7XG5cbiAgICAgICAgdGhpcy4kc3luY09wdGlvbnModHJ1ZSk7XG4gICAgfVxuXG4gICAgaXNGb2N1c2VkKCkge1xuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgICByZXR1cm4gZWwgPT0gdGhpcy5zZWFyY2hJbnB1dCB8fCBlbCA9PSB0aGlzLnJlcGxhY2VJbnB1dDtcbiAgICB9XG59XG5cbi8va2V5YmluZGluZyBvdXRzaWRlIG9mIHRoZSBzZWFyY2hib3hcbnZhciAkc2VhcmNoQmFyS2IgPSBuZXcgSGFzaEhhbmRsZXIoKTtcbiRzZWFyY2hCYXJLYi5iaW5kS2V5cyh7XG4gICAgXCJDdHJsLWZ8Q29tbWFuZC1mXCI6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIHZhciBpc1JlcGxhY2UgPSBzYi5pc1JlcGxhY2UgPSAhc2IuaXNSZXBsYWNlO1xuICAgICAgICBzYi5yZXBsYWNlQm94LnN0eWxlLmRpc3BsYXkgPSBpc1JlcGxhY2UgPyBcIlwiIDogXCJub25lXCI7XG4gICAgICAgIHNiLnJlcGxhY2VPcHRpb24uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICBzYi4kc3luY09wdGlvbnMoKTtcbiAgICAgICAgc2Iuc2VhcmNoSW5wdXQuZm9jdXMoKTtcbiAgICB9LFxuICAgIFwiQ3RybC1IfENvbW1hbmQtT3B0aW9uLUZcIjogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgaWYgKHNiLmVkaXRvci5nZXRSZWFkT25seSgpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBzYi5yZXBsYWNlT3B0aW9uLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICBzYi4kc3luY09wdGlvbnMoKTtcbiAgICAgICAgc2IucmVwbGFjZUlucHV0LmZvY3VzKCk7XG4gICAgfSxcbiAgICBcIkN0cmwtR3xDb21tYW5kLUdcIjogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgc2IuZmluZE5leHQoKTtcbiAgICB9LFxuICAgIFwiQ3RybC1TaGlmdC1HfENvbW1hbmQtU2hpZnQtR1wiOiBmdW5jdGlvbihzYikge1xuICAgICAgICBzYi5maW5kUHJldigpO1xuICAgIH0sXG4gICAgXCJlc2NcIjogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgc2IuaGlkZSgpO30pO1xuICAgIH0sXG4gICAgXCJSZXR1cm5cIjogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgaWYgKHNiLmFjdGl2ZUlucHV0ID09IHNiLnJlcGxhY2VJbnB1dClcbiAgICAgICAgICAgIHNiLnJlcGxhY2UoKTtcbiAgICAgICAgc2IuZmluZE5leHQoKTtcbiAgICB9LFxuICAgIFwiU2hpZnQtUmV0dXJuXCI6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIGlmIChzYi5hY3RpdmVJbnB1dCA9PSBzYi5yZXBsYWNlSW5wdXQpXG4gICAgICAgICAgICBzYi5yZXBsYWNlKCk7XG4gICAgICAgIHNiLmZpbmRQcmV2KCk7XG4gICAgfSxcbiAgICBcIkFsdC1SZXR1cm5cIjogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgaWYgKHNiLmFjdGl2ZUlucHV0ID09IHNiLnJlcGxhY2VJbnB1dClcbiAgICAgICAgICAgIHNiLnJlcGxhY2VBbGwoKTtcbiAgICAgICAgc2IuZmluZEFsbCgpO1xuICAgIH0sXG4gICAgXCJUYWJcIjogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgKHNiLmFjdGl2ZUlucHV0ID09IHNiLnJlcGxhY2VJbnB1dCA/IHNiLnNlYXJjaElucHV0IDogc2IucmVwbGFjZUlucHV0KS5mb2N1cygpO1xuICAgIH1cbn0pO1xuXG4kc2VhcmNoQmFyS2IuYWRkQ29tbWFuZHMoW3tcbiAgICBuYW1lOiBcInRvZ2dsZVJlZ2V4cE1vZGVcIixcbiAgICBiaW5kS2V5OiB7d2luOiBcIkFsdC1SfEFsdC0vXCIsIG1hYzogXCJDdHJsLUFsdC1SfEN0cmwtQWx0LS9cIn0sXG4gICAgZXhlYzogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgc2IucmVnRXhwT3B0aW9uLmNoZWNrZWQgPSAhc2IucmVnRXhwT3B0aW9uLmNoZWNrZWQ7XG4gICAgICAgIHNiLiRzeW5jT3B0aW9ucygpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcInRvZ2dsZUNhc2VTZW5zaXRpdmVcIixcbiAgICBiaW5kS2V5OiB7d2luOiBcIkFsdC1DfEFsdC1JXCIsIG1hYzogXCJDdHJsLUFsdC1SfEN0cmwtQWx0LUlcIn0sXG4gICAgZXhlYzogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgc2IuY2FzZVNlbnNpdGl2ZU9wdGlvbi5jaGVja2VkID0gIXNiLmNhc2VTZW5zaXRpdmVPcHRpb24uY2hlY2tlZDtcbiAgICAgICAgc2IuJHN5bmNPcHRpb25zKCk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwidG9nZ2xlV2hvbGVXb3Jkc1wiLFxuICAgIGJpbmRLZXk6IHt3aW46IFwiQWx0LUJ8QWx0LVdcIiwgbWFjOiBcIkN0cmwtQWx0LUJ8Q3RybC1BbHQtV1wifSxcbiAgICBleGVjOiBmdW5jdGlvbihzYikge1xuICAgICAgICBzYi53aG9sZVdvcmRPcHRpb24uY2hlY2tlZCA9ICFzYi53aG9sZVdvcmRPcHRpb24uY2hlY2tlZDtcbiAgICAgICAgc2IuJHN5bmNPcHRpb25zKCk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwidG9nZ2xlUmVwbGFjZVwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIHNiLnJlcGxhY2VPcHRpb24uY2hlY2tlZCA9ICFzYi5yZXBsYWNlT3B0aW9uLmNoZWNrZWQ7XG4gICAgICAgIHNiLiRzeW5jT3B0aW9ucygpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcInNlYXJjaEluU2VsZWN0aW9uXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgc2Iuc2VhcmNoT3B0aW9uLmNoZWNrZWQgPSAhc2Iuc2VhcmNoUmFuZ2U7XG4gICAgICAgIHNiLnNldFNlYXJjaFJhbmdlKHNiLnNlYXJjaE9wdGlvbi5jaGVja2VkICYmIHNiLmVkaXRvci5nZXRTZWxlY3Rpb25SYW5nZSgpKTtcbiAgICAgICAgc2IuJHN5bmNPcHRpb25zKCk7XG4gICAgfVxufV0pO1xuXG4vL2tleWJpbmRpbmcgb3V0c2lkZSBvZiB0aGUgc2VhcmNoYm94XG52YXIgJGNsb3NlU2VhcmNoQmFyS2IgPSBuZXcgSGFzaEhhbmRsZXIoW3tcbiAgICBiaW5kS2V5OiBcIkVzY1wiLFxuICAgIG5hbWU6IFwiY2xvc2VTZWFyY2hCYXJcIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLnNlYXJjaEJveC5oaWRlKCk7XG4gICAgfVxufV0pO1xuXG5TZWFyY2hCb3gucHJvdG90eXBlLiRzZWFyY2hCYXJLYiA9ICRzZWFyY2hCYXJLYjtcblNlYXJjaEJveC5wcm90b3R5cGUuJGNsb3NlU2VhcmNoQmFyS2IgPSAkY2xvc2VTZWFyY2hCYXJLYjtcblxuZXhwb3J0cy5TZWFyY2hCb3ggPSBTZWFyY2hCb3g7XG5cbi8qKlxuICogU2hvd3MgdGhlIHNlYXJjaCBib3ggZm9yIHRoZSBlZGl0b3Igd2l0aCBvcHRpb25hbCByZXBsYWNlIGZ1bmN0aW9uYWxpdHkuXG4gKlxuICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvciAtIFRoZSBlZGl0b3IgaW5zdGFuY2VcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzUmVwbGFjZV0gLSBXaGV0aGVyIHRvIHNob3cgcmVwbGFjZSBvcHRpb25zXG4gKi9cbmV4cG9ydHMuU2VhcmNoID0gZnVuY3Rpb24oZWRpdG9yLCBpc1JlcGxhY2UpIHtcbiAgICB2YXIgc2IgPSBlZGl0b3Iuc2VhcmNoQm94IHx8IG5ldyBTZWFyY2hCb3goZWRpdG9yKTtcbiAgICB2YXIgcmFuZ2UgPSBlZGl0b3Iuc2Vzc2lvbi5zZWxlY3Rpb24uZ2V0UmFuZ2UoKTtcbiAgICB2YXIgdmFsdWUgPSByYW5nZS5pc011bHRpTGluZSgpID8gXCJcIiA6IGVkaXRvci5zZXNzaW9uLmdldFRleHRSYW5nZShyYW5nZSk7XG4gICAgc2Iuc2hvdyh2YWx1ZSwgaXNSZXBsYWNlKTtcbn07XG5cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUT0RPXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qXG4tIG1vdmUgc2VhcmNoIGZvcm0gdG8gdGhlIGxlZnQgaWYgaXQgbWFza3MgY3VycmVudCB3b3JkXG4tIGluY2x1ZGUgYWxsIG9wdGlvbnMgdGhhdCBzZWFyY2ggaGFzLiBleDogcmVnZXhcbi0gc2VhcmNoYm94LnNlYXJjaGJveCBpcyBub3QgdGhhdCBwcmV0dHkuIFdlIHNob3VsZCBoYXZlIGp1c3Qgc2VhcmNoYm94XG4tIGRpc2FibGUgcHJldiBidXR0b24gaWYgaXQgbWFrZXMgc2Vuc2VcbiovXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=