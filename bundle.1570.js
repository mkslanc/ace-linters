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

        if (value)
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
 *
 * @param {Editor} editor
 * @param {boolean} [isReplace]
 */
exports.Search = function(editor, isReplace) {
    var sb = editor.searchBox || new SearchBox(editor);
    sb.show(editor.session.getTextRange(), isReplace);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULGtCQUFrQixJQUFJO0FBQ3RCO0FBQ0E7QUFDQSw2Q0FBNkMsaUJBQWlCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsUUFBUTtBQUN2QixlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsZ0NBQWdDLFdBQVc7QUFDM0MsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLGNBQWMsaURBQWlEO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsY0FBYyxpREFBaUQ7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxjQUFjLGlEQUFpRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUEsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsU0FBUztBQUNwQjtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9zZWFyY2hib3gtY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9zZWFyY2hib3guanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBgXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRWRpdG9yIFNlYXJjaCBGb3JtXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi5hY2Vfc2VhcmNoIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO1xuICAgIGNvbG9yOiAjNjY2O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjYmNiY2I7XG4gICAgYm9yZGVyLXRvcDogMCBub25lO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDRweCA2cHggMCA0cHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICB6LWluZGV4OiA5OTtcbiAgICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xufVxuLmFjZV9zZWFyY2gubGVmdCB7XG4gICAgYm9yZGVyLWxlZnQ6IDAgbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiAwcHggMHB4IDVweCAwcHg7XG4gICAgbGVmdDogMDtcbn1cbi5hY2Vfc2VhcmNoLnJpZ2h0IHtcbiAgICBib3JkZXItcmFkaXVzOiAwcHggMHB4IDBweCA1cHg7XG4gICAgYm9yZGVyLXJpZ2h0OiAwIG5vbmU7XG4gICAgcmlnaHQ6IDA7XG59XG5cbi5hY2Vfc2VhcmNoX2Zvcm0sIC5hY2VfcmVwbGFjZV9mb3JtIHtcbiAgICBtYXJnaW46IDAgMjBweCA0cHggMDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjk7XG59XG4uYWNlX3JlcGxhY2VfZm9ybSB7XG4gICAgbWFyZ2luLXJpZ2h0OiAwO1xufVxuLmFjZV9zZWFyY2hfZm9ybS5hY2Vfbm9tYXRjaCB7XG4gICAgb3V0bGluZTogMXB4IHNvbGlkIHJlZDtcbn1cblxuLmFjZV9zZWFyY2hfZmllbGQge1xuICAgIGJvcmRlci1yYWRpdXM6IDNweCAwIDAgM3B4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIGNvbG9yOiBibGFjaztcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2JjYmNiO1xuICAgIGJvcmRlci1yaWdodDogMCBub25lO1xuICAgIG91dGxpbmU6IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICBmb250LXNpemU6IGluaGVyaXQ7XG4gICAgbWFyZ2luOiAwO1xuICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xuICAgIHBhZGRpbmc6IDAgNnB4O1xuICAgIG1pbi13aWR0aDogMTdlbTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIG1pbi1oZWlnaHQ6IDEuOGVtO1xuICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xufVxuLmFjZV9zZWFyY2hidG4ge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjYmNiY2I7XG4gICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHBhZGRpbmc6IDAgNnB4O1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgYm9yZGVyLXJpZ2h0OiAwIG5vbmU7XG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjZGNkY2RjO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBtYXJnaW46IDA7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGNvbG9yOiAjNjY2O1xufVxuLmFjZV9zZWFyY2hidG46bGFzdC1jaGlsZCB7XG4gICAgYm9yZGVyLXJhZGl1czogMCAzcHggM3B4IDA7XG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2NiY2JjYjtcbn1cbi5hY2Vfc2VhcmNoYnRuOmRpc2FibGVkIHtcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbn1cbi5hY2Vfc2VhcmNoYnRuOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVmMWY2O1xufVxuLmFjZV9zZWFyY2hidG4ucHJldiwgLmFjZV9zZWFyY2hidG4ubmV4dCB7XG4gICAgIHBhZGRpbmc6IDBweCAwLjdlbVxufVxuLmFjZV9zZWFyY2hidG4ucHJldjphZnRlciwgLmFjZV9zZWFyY2hidG4ubmV4dDphZnRlciB7XG4gICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgIGJvcmRlcjogc29saWQgMnB4ICM4ODg7XG4gICAgIHdpZHRoOiAwLjVlbTtcbiAgICAgaGVpZ2h0OiAwLjVlbTtcbiAgICAgYm9yZGVyLXdpZHRoOiAgMnB4IDAgMCAycHg7XG4gICAgIGRpc3BsYXk6aW5saW5lLWJsb2NrO1xuICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xufVxuLmFjZV9zZWFyY2hidG4ubmV4dDphZnRlciB7XG4gICAgIGJvcmRlci13aWR0aDogMCAycHggMnB4IDAgO1xufVxuLmFjZV9zZWFyY2hidG5fY2xvc2Uge1xuICAgIGJhY2tncm91bmQ6IHVybChkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUE0QUFBQWNDQVlBQUFCUlZvNUJBQUFBWjBsRVFWUjQydTJTVVFyQU1BaER2YXpuOE9qWkJpbENrWVZWeGlpczhINENUMFZyQUpiNFdIVDNDNXhVMmEySVFaWEpqaVFJUk1ka0VvSjVRMnlNcXBmRElvK1hZNGs2aCtZWE95S3FUSWo1UkVheGxvTkFkMHhpS21BdHNUSHFXOHNSMlc1ZjdnQ3U1bldGVXBWalp3QUFBQUJKUlU1RXJrSmdnZz09KSBuby1yZXBlYXQgNTAlIDA7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJvcmRlcjogMCBub25lO1xuICAgIGNvbG9yOiAjNjU2NTY1O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmb250OiAxNnB4LzE2cHggQXJpYWw7XG4gICAgcGFkZGluZzogMDtcbiAgICBoZWlnaHQ6IDE0cHg7XG4gICAgd2lkdGg6IDE0cHg7XG4gICAgdG9wOiA5cHg7XG4gICAgcmlnaHQ6IDdweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG4uYWNlX3NlYXJjaGJ0bl9jbG9zZTpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzY1NjU2NTtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA1MCUgMTAwJTtcbiAgICBjb2xvcjogd2hpdGU7XG59XG5cbi5hY2VfYnV0dG9uIHtcbiAgICBtYXJnaW4tbGVmdDogMnB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW8tdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgb3BhY2l0eTogMC43O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMTAwLDEwMCwxMDAsMC4yMyk7XG4gICAgcGFkZGluZzogMXB4O1xuICAgIGJveC1zaXppbmc6ICAgIGJvcmRlci1ib3ghaW1wb3J0YW50O1xuICAgIGNvbG9yOiBibGFjaztcbn1cblxuLmFjZV9idXR0b246aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gICAgb3BhY2l0eToxO1xufVxuLmFjZV9idXR0b246YWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO1xufVxuXG4uYWNlX2J1dHRvbi5jaGVja2VkIHtcbiAgICBib3JkZXItY29sb3I6ICMzMzk5ZmY7XG4gICAgb3BhY2l0eToxO1xufVxuXG4uYWNlX3NlYXJjaF9vcHRpb25ze1xuICAgIG1hcmdpbi1ib3R0b206IDNweDtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW8tdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIGNsZWFyOiBib3RoO1xufVxuXG4uYWNlX3NlYXJjaF9jb3VudGVyIHtcbiAgICBmbG9hdDogbGVmdDtcbiAgICBmb250LWZhbWlseTogYXJpYWw7XG4gICAgcGFkZGluZzogMCA4cHg7XG59YDtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vZWRpdG9yXCIpLkVkaXRvcn0gRWRpdG9yXG4gKi9cbnZhciBkb20gPSByZXF1aXJlKFwiLi4vbGliL2RvbVwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIGV2ZW50ID0gcmVxdWlyZShcIi4uL2xpYi9ldmVudFwiKTtcbnZhciBzZWFyY2hib3hDc3MgPSByZXF1aXJlKFwiLi9zZWFyY2hib3gtY3NzXCIpO1xudmFyIEhhc2hIYW5kbGVyID0gcmVxdWlyZShcIi4uL2tleWJvYXJkL2hhc2hfaGFuZGxlclwiKS5IYXNoSGFuZGxlcjtcbnZhciBrZXlVdGlsID0gcmVxdWlyZShcIi4uL2xpYi9rZXlzXCIpO1xudmFyIG5scyA9IHJlcXVpcmUoXCIuLi9jb25maWdcIikubmxzO1xuXG52YXIgTUFYX0NPVU5UID0gOTk5O1xuXG5kb20uaW1wb3J0Q3NzU3RyaW5nKHNlYXJjaGJveENzcywgXCJhY2Vfc2VhcmNoYm94XCIsIGZhbHNlKTtcblxuY2xhc3MgU2VhcmNoQm94IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICogQHBhcmFtIHtuZXZlcn0gW3JhbmdlXVxuICAgICAqIEBwYXJhbSB7bmV2ZXJ9IFtzaG93UmVwbGFjZUZvcm1dXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZWRpdG9yLCByYW5nZSwgc2hvd1JlcGxhY2VGb3JtKSB7XG4gICAgICAgIC8qKkB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSovXG4gICAgICAgIHRoaXMuYWN0aXZlSW5wdXQ7XG4gICAgICAgIC8qKkB0eXBlIHtIVE1MRGl2RWxlbWVudH0qL1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkb20uYnVpbGREb20oW1wiZGl2XCIsIHtjbGFzczpcImFjZV9zZWFyY2ggcmlnaHRcIn0sXG4gICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwiaGlkZVwiLCBjbGFzczogXCJhY2Vfc2VhcmNoYnRuX2Nsb3NlXCJ9XSxcbiAgICAgICAgICAgIFtcImRpdlwiLCB7Y2xhc3M6IFwiYWNlX3NlYXJjaF9mb3JtXCJ9LFxuICAgICAgICAgICAgICAgIFtcImlucHV0XCIsIHtjbGFzczogXCJhY2Vfc2VhcmNoX2ZpZWxkXCIsIHBsYWNlaG9sZGVyOiBubHMoXCJzZWFyY2gtYm94LmZpbmQucGxhY2Vob2xkZXJcIiwgXCJTZWFyY2ggZm9yXCIpLCBzcGVsbGNoZWNrOiBcImZhbHNlXCJ9XSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwiZmluZFByZXZcIiwgY2xhc3M6IFwiYWNlX3NlYXJjaGJ0biBwcmV2XCJ9LCBcIlxcdTIwMGJcIl0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcImZpbmROZXh0XCIsIGNsYXNzOiBcImFjZV9zZWFyY2hidG4gbmV4dFwifSwgXCJcXHUyMDBiXCJdLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJmaW5kQWxsXCIsIGNsYXNzOiBcImFjZV9zZWFyY2hidG5cIiwgdGl0bGU6IFwiQWx0LUVudGVyXCJ9LCBubHMoXCJzZWFyY2gtYm94LmZpbmQtYWxsLnRleHRcIiwgXCJBbGxcIildXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1wiZGl2XCIsIHtjbGFzczogXCJhY2VfcmVwbGFjZV9mb3JtXCJ9LFxuICAgICAgICAgICAgICAgIFtcImlucHV0XCIsIHtjbGFzczogXCJhY2Vfc2VhcmNoX2ZpZWxkXCIsIHBsYWNlaG9sZGVyOiBubHMoXCJzZWFyY2gtYm94LnJlcGxhY2UucGxhY2Vob2xkZXJcIiwgXCJSZXBsYWNlIHdpdGhcIiksIHNwZWxsY2hlY2s6IFwiZmFsc2VcIn1dLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJyZXBsYWNlQW5kRmluZE5leHRcIiwgY2xhc3M6IFwiYWNlX3NlYXJjaGJ0blwifSwgbmxzKFwic2VhcmNoLWJveC5yZXBsYWNlLW5leHQudGV4dFwiLCBcIlJlcGxhY2VcIildLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJyZXBsYWNlQWxsXCIsIGNsYXNzOiBcImFjZV9zZWFyY2hidG5cIn0sIG5scyhcInNlYXJjaC1ib3gucmVwbGFjZS1hbGwudGV4dFwiLCBcIkFsbFwiKV1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXCJkaXZcIiwge2NsYXNzOiBcImFjZV9zZWFyY2hfb3B0aW9uc1wifSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwidG9nZ2xlUmVwbGFjZVwiLCBjbGFzczogXCJhY2VfYnV0dG9uXCIsIHRpdGxlOiBubHMoXCJzZWFyY2gtYm94LnRvZ2dsZS1yZXBsYWNlLnRpdGxlXCIsIFwiVG9nZ2xlIFJlcGxhY2UgbW9kZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFwiZmxvYXQ6bGVmdDttYXJnaW4tdG9wOi0ycHg7cGFkZGluZzowIDVweDtcIn0sIFwiK1wiXSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHtjbGFzczogXCJhY2Vfc2VhcmNoX2NvdW50ZXJcIn1dLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJ0b2dnbGVSZWdleHBNb2RlXCIsIGNsYXNzOiBcImFjZV9idXR0b25cIiwgdGl0bGU6IG5scyhcInNlYXJjaC1ib3gudG9nZ2xlLXJlZ2V4cC50aXRsZVwiLCBcIlJlZ0V4cCBTZWFyY2hcIil9LCBcIi4qXCJdLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJ0b2dnbGVDYXNlU2Vuc2l0aXZlXCIsIGNsYXNzOiBcImFjZV9idXR0b25cIiwgdGl0bGU6IG5scyhcInNlYXJjaC1ib3gudG9nZ2xlLWNhc2UudGl0bGVcIiwgXCJDYXNlU2Vuc2l0aXZlIFNlYXJjaFwiKX0sIFwiQWFcIl0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcInRvZ2dsZVdob2xlV29yZHNcIiwgY2xhc3M6IFwiYWNlX2J1dHRvblwiLCB0aXRsZTogbmxzKFwic2VhcmNoLWJveC50b2dnbGUtd2hvbGUtd29yZC50aXRsZVwiLCBcIldob2xlIFdvcmQgU2VhcmNoXCIpfSwgXCJcXFxcYlwiXSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwic2VhcmNoSW5TZWxlY3Rpb25cIiwgY2xhc3M6IFwiYWNlX2J1dHRvblwiLCB0aXRsZTogbmxzKFwic2VhcmNoLWJveC50b2dnbGUtaW4tc2VsZWN0aW9uLnRpdGxlXCIsIFwiU2VhcmNoIEluIFNlbGVjdGlvblwiKX0sIFwiU1wiXVxuICAgICAgICAgICAgXVxuICAgICAgICBdKTtcblxuICAgICAgICB0aGlzLnNldFNlc3Npb24gPSB0aGlzLnNldFNlc3Npb24uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy4kb25FZGl0b3JJbnB1dCA9IHRoaXMub25FZGl0b3JJbnB1dC5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuJGluaXQoKTtcbiAgICAgICAgdGhpcy5zZXRFZGl0b3IoZWRpdG9yKTtcbiAgICAgICAgZG9tLmltcG9ydENzc1N0cmluZyhzZWFyY2hib3hDc3MsIFwiYWNlX3NlYXJjaGJveFwiLCBlZGl0b3IuY29udGFpbmVyKTtcbiAgICAgICAgZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5lbGVtZW50LCBcInRvdWNoc3RhcnRcIiwgZnVuY3Rpb24oZSkgeyBlLnN0b3BQcm9wYWdhdGlvbigpOyB9LCBlZGl0b3IpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAgICAgKi9cbiAgICBzZXRFZGl0b3IoZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5zZWFyY2hCb3ggPSB0aGlzO1xuICAgICAgICBlZGl0b3IucmVuZGVyZXIuc2Nyb2xsZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICAgICAgLyoqQHR5cGUge0VkaXRvcn0qL1xuICAgICAgICB0aGlzLmVkaXRvciA9IGVkaXRvcjtcbiAgICB9XG5cbiAgICBzZXRTZXNzaW9uKGUpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hSYW5nZSA9IG51bGw7XG4gICAgICAgIHRoaXMuJHN5bmNPcHRpb25zKHRydWUpO1xuICAgIH1cblxuICAgIC8vIEF1dG8gdXBkYXRlIFwidXBkYXRlQ291bnRlclwiIGFuZCBcImFjZV9ub21hdGNoXCJcbiAgICBvbkVkaXRvcklucHV0KCkge1xuICAgICAgICB0aGlzLmZpbmQoZmFsc2UsIGZhbHNlLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzYlxuICAgICAqL1xuICAgICRpbml0RWxlbWVudHMoc2IpIHtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxFbGVtZW50fSovXG4gICAgICAgIHRoaXMuc2VhcmNoQm94ID0gc2IucXVlcnlTZWxlY3RvcihcIi5hY2Vfc2VhcmNoX2Zvcm1cIik7XG4gICAgICAgIC8qKkB0eXBlIHtIVE1MRWxlbWVudH0qL1xuICAgICAgICB0aGlzLnJlcGxhY2VCb3ggPSBzYi5xdWVyeVNlbGVjdG9yKFwiLmFjZV9yZXBsYWNlX2Zvcm1cIik7XG4gICAgICAgIC8qKkB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSovXG4gICAgICAgIHRoaXMuc2VhcmNoT3B0aW9uID0gc2IucXVlcnlTZWxlY3RvcihcIlthY3Rpb249c2VhcmNoSW5TZWxlY3Rpb25dXCIpO1xuICAgICAgICAvKipAdHlwZSB7SFRNTElucHV0RWxlbWVudH0qL1xuICAgICAgICB0aGlzLnJlcGxhY2VPcHRpb24gPSBzYi5xdWVyeVNlbGVjdG9yKFwiW2FjdGlvbj10b2dnbGVSZXBsYWNlXVwiKTtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy5yZWdFeHBPcHRpb24gPSBzYi5xdWVyeVNlbGVjdG9yKFwiW2FjdGlvbj10b2dnbGVSZWdleHBNb2RlXVwiKTtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy5jYXNlU2Vuc2l0aXZlT3B0aW9uID0gc2IucXVlcnlTZWxlY3RvcihcIlthY3Rpb249dG9nZ2xlQ2FzZVNlbnNpdGl2ZV1cIik7XG4gICAgICAgIC8qKkB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSovXG4gICAgICAgIHRoaXMud2hvbGVXb3JkT3B0aW9uID0gc2IucXVlcnlTZWxlY3RvcihcIlthY3Rpb249dG9nZ2xlV2hvbGVXb3Jkc11cIik7XG4gICAgICAgIC8qKkB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSovXG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXQgPSB0aGlzLnNlYXJjaEJveC5xdWVyeVNlbGVjdG9yKFwiLmFjZV9zZWFyY2hfZmllbGRcIik7XG4gICAgICAgIC8qKkB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSovXG4gICAgICAgIHRoaXMucmVwbGFjZUlucHV0ID0gdGhpcy5yZXBsYWNlQm94LnF1ZXJ5U2VsZWN0b3IoXCIuYWNlX3NlYXJjaF9maWVsZFwiKTtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxFbGVtZW50fSovXG4gICAgICAgIHRoaXMuc2VhcmNoQ291bnRlciA9IHNiLnF1ZXJ5U2VsZWN0b3IoXCIuYWNlX3NlYXJjaF9jb3VudGVyXCIpO1xuICAgIH1cblxuICAgICRpbml0KCkge1xuICAgICAgICB2YXIgc2IgPSB0aGlzLmVsZW1lbnQ7XG5cbiAgICAgICAgdGhpcy4kaW5pdEVsZW1lbnRzKHNiKTtcblxuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBldmVudC5hZGRMaXN0ZW5lcihzYiwgXCJtb3VzZWRvd25cIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIF90aGlzLmFjdGl2ZUlucHV0LmZvY3VzKCk7XG4gICAgICAgICAgICB9LCAwKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbihlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGV2ZW50LmFkZExpc3RlbmVyKHNiLCBcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciB0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50O1xuICAgICAgICAgICAgdmFyIGFjdGlvbiA9IHQuZ2V0QXR0cmlidXRlKFwiYWN0aW9uXCIpO1xuICAgICAgICAgICAgaWYgKGFjdGlvbiAmJiBfdGhpc1thY3Rpb25dKVxuICAgICAgICAgICAgICAgIF90aGlzW2FjdGlvbl0oKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKF90aGlzLiRzZWFyY2hCYXJLYi5jb21tYW5kc1thY3Rpb25dKVxuICAgICAgICAgICAgICAgIF90aGlzLiRzZWFyY2hCYXJLYi5jb21tYW5kc1thY3Rpb25dLmV4ZWMoX3RoaXMpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKGUpO1xuICAgICAgICB9KTtcblxuICAgICAgICBldmVudC5hZGRDb21tYW5kS2V5TGlzdGVuZXIoc2IsIGZ1bmN0aW9uKGUsIGhhc2hJZCwga2V5Q29kZSkge1xuICAgICAgICAgICAgdmFyIGtleVN0cmluZyA9IGtleVV0aWwua2V5Q29kZVRvU3RyaW5nKGtleUNvZGUpO1xuICAgICAgICAgICAgdmFyIGNvbW1hbmQgPSBfdGhpcy4kc2VhcmNoQmFyS2IuZmluZEtleUNvbW1hbmQoaGFzaElkLCBrZXlTdHJpbmcpO1xuICAgICAgICAgICAgaWYgKGNvbW1hbmQgJiYgY29tbWFuZC5leGVjKSB7XG4gICAgICAgICAgICAgICAgY29tbWFuZC5leGVjKF90aGlzKTtcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wRXZlbnQoZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAdHlwZSB7e3NjaGVkdWxlOiAodGltZW91dD86IG51bWJlcikgPT4gdm9pZH19XG4gICAgICAgICAqIEBleHRlcm5hbFxuICAgICAgICAqL1xuICAgICAgICB0aGlzLiRvbkNoYW5nZSA9IGxhbmcuZGVsYXllZENhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy5maW5kKGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV2ZW50LmFkZExpc3RlbmVyKHRoaXMuc2VhcmNoSW5wdXQsIFwiaW5wdXRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy4kb25DaGFuZ2Uuc2NoZWR1bGUoMjApO1xuICAgICAgICB9KTtcbiAgICAgICAgZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5zZWFyY2hJbnB1dCwgXCJmb2N1c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF90aGlzLmFjdGl2ZUlucHV0ID0gX3RoaXMuc2VhcmNoSW5wdXQ7XG4gICAgICAgICAgICBfdGhpcy5zZWFyY2hJbnB1dC52YWx1ZSAmJiBfdGhpcy5oaWdobGlnaHQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGV2ZW50LmFkZExpc3RlbmVyKHRoaXMucmVwbGFjZUlucHV0LCBcImZvY3VzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMuYWN0aXZlSW5wdXQgPSBfdGhpcy5yZXBsYWNlSW5wdXQ7XG4gICAgICAgICAgICBfdGhpcy5zZWFyY2hJbnB1dC52YWx1ZSAmJiBfdGhpcy5oaWdobGlnaHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0U2VhcmNoUmFuZ2UocmFuZ2UpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hSYW5nZSA9IHJhbmdlO1xuICAgICAgICBpZiAocmFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUmFuZ2VNYXJrZXIgPSB0aGlzLmVkaXRvci5zZXNzaW9uLmFkZE1hcmtlcihyYW5nZSwgXCJhY2VfYWN0aXZlLWxpbmVcIik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWFyY2hSYW5nZU1hcmtlcikge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2Vzc2lvbi5yZW1vdmVNYXJrZXIodGhpcy5zZWFyY2hSYW5nZU1hcmtlcik7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFJhbmdlTWFya2VyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3ByZXZlbnRTY3JvbGxdXG4gICAgICogQGV4dGVybmFsXG4gICAgICovXG4gICAgJHN5bmNPcHRpb25zKHByZXZlbnRTY3JvbGwpIHtcbiAgICAgICAgZG9tLnNldENzc0NsYXNzKHRoaXMucmVwbGFjZU9wdGlvbiwgXCJjaGVja2VkXCIsIHRoaXMuc2VhcmNoUmFuZ2UpO1xuICAgICAgICBkb20uc2V0Q3NzQ2xhc3ModGhpcy5zZWFyY2hPcHRpb24sIFwiY2hlY2tlZFwiLCB0aGlzLnNlYXJjaE9wdGlvbi5jaGVja2VkKTtcbiAgICAgICAgdGhpcy5yZXBsYWNlT3B0aW9uLnRleHRDb250ZW50ID0gdGhpcy5yZXBsYWNlT3B0aW9uLmNoZWNrZWQgPyBcIi1cIiA6IFwiK1wiO1xuICAgICAgICBkb20uc2V0Q3NzQ2xhc3ModGhpcy5yZWdFeHBPcHRpb24sIFwiY2hlY2tlZFwiLCB0aGlzLnJlZ0V4cE9wdGlvbi5jaGVja2VkKTtcbiAgICAgICAgZG9tLnNldENzc0NsYXNzKHRoaXMud2hvbGVXb3JkT3B0aW9uLCBcImNoZWNrZWRcIiwgdGhpcy53aG9sZVdvcmRPcHRpb24uY2hlY2tlZCk7XG4gICAgICAgIGRvbS5zZXRDc3NDbGFzcyh0aGlzLmNhc2VTZW5zaXRpdmVPcHRpb24sIFwiY2hlY2tlZFwiLCB0aGlzLmNhc2VTZW5zaXRpdmVPcHRpb24uY2hlY2tlZCk7XG4gICAgICAgIHZhciByZWFkT25seSA9IHRoaXMuZWRpdG9yLmdldFJlYWRPbmx5KCk7XG4gICAgICAgIHRoaXMucmVwbGFjZU9wdGlvbi5zdHlsZS5kaXNwbGF5ID0gcmVhZE9ubHkgPyBcIm5vbmVcIiA6IFwiXCI7XG4gICAgICAgIHRoaXMucmVwbGFjZUJveC5zdHlsZS5kaXNwbGF5ID0gdGhpcy5yZXBsYWNlT3B0aW9uLmNoZWNrZWQgJiYgIXJlYWRPbmx5ID8gXCJcIiA6IFwibm9uZVwiO1xuICAgICAgICB0aGlzLmZpbmQoZmFsc2UsIGZhbHNlLCBwcmV2ZW50U2Nyb2xsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1JlZ0V4cH0gW3JlXVxuICAgICAqL1xuICAgIGhpZ2hsaWdodChyZSkge1xuICAgICAgICB0aGlzLmVkaXRvci5zZXNzaW9uLmhpZ2hsaWdodChyZSB8fCB0aGlzLmVkaXRvci4kc2VhcmNoLiRvcHRpb25zLnJlKTtcbiAgICAgICAgdGhpcy5lZGl0b3IucmVuZGVyZXIudXBkYXRlQmFja01hcmtlcnMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNraXBDdXJyZW50XG4gICAgICogQHBhcmFtIHtib29sZWFufSBiYWNrd2FyZHNcbiAgICAgKiBAcGFyYW0ge2FueX0gW3ByZXZlbnRTY3JvbGxdXG4gICAgICovXG4gICAgZmluZChza2lwQ3VycmVudCwgYmFja3dhcmRzLCBwcmV2ZW50U2Nyb2xsKSB7XG4gICAgICAgIHZhciByYW5nZSA9IHRoaXMuZWRpdG9yLmZpbmQodGhpcy5zZWFyY2hJbnB1dC52YWx1ZSwge1xuICAgICAgICAgICAgc2tpcEN1cnJlbnQ6IHNraXBDdXJyZW50LFxuICAgICAgICAgICAgYmFja3dhcmRzOiBiYWNrd2FyZHMsXG4gICAgICAgICAgICB3cmFwOiB0cnVlLFxuICAgICAgICAgICAgcmVnRXhwOiB0aGlzLnJlZ0V4cE9wdGlvbi5jaGVja2VkLFxuICAgICAgICAgICAgY2FzZVNlbnNpdGl2ZTogdGhpcy5jYXNlU2Vuc2l0aXZlT3B0aW9uLmNoZWNrZWQsXG4gICAgICAgICAgICB3aG9sZVdvcmQ6IHRoaXMud2hvbGVXb3JkT3B0aW9uLmNoZWNrZWQsXG4gICAgICAgICAgICBwcmV2ZW50U2Nyb2xsOiBwcmV2ZW50U2Nyb2xsLFxuICAgICAgICAgICAgcmFuZ2U6IHRoaXMuc2VhcmNoUmFuZ2VcbiAgICAgICAgfSk7XG4gICAgICAgIC8qKkB0eXBlIHthbnl9Ki9cbiAgICAgICAgdmFyIG5vTWF0Y2ggPSAhcmFuZ2UgJiYgdGhpcy5zZWFyY2hJbnB1dC52YWx1ZTtcbiAgICAgICAgZG9tLnNldENzc0NsYXNzKHRoaXMuc2VhcmNoQm94LCBcImFjZV9ub21hdGNoXCIsIG5vTWF0Y2gpO1xuICAgICAgICB0aGlzLmVkaXRvci5fZW1pdChcImZpbmRTZWFyY2hCb3hcIiwgeyBtYXRjaDogIW5vTWF0Y2ggfSk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0KCk7XG4gICAgICAgIHRoaXMudXBkYXRlQ291bnRlcigpO1xuICAgIH1cbiAgICB1cGRhdGVDb3VudGVyKCkge1xuICAgICAgICB2YXIgZWRpdG9yID0gdGhpcy5lZGl0b3I7XG4gICAgICAgIHZhciByZWdleCA9IGVkaXRvci4kc2VhcmNoLiRvcHRpb25zLnJlO1xuICAgICAgICB2YXIgc3VwcG9ydHNVbmljb2RlRmxhZyA9IHJlZ2V4LnVuaWNvZGU7XG4gICAgICAgIHZhciBhbGwgPSAwO1xuICAgICAgICB2YXIgYmVmb3JlID0gMDtcbiAgICAgICAgaWYgKHJlZ2V4KSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnNlYXJjaFJhbmdlXG4gICAgICAgICAgICAgICAgPyBlZGl0b3Iuc2Vzc2lvbi5nZXRUZXh0UmFuZ2UodGhpcy5zZWFyY2hSYW5nZSlcbiAgICAgICAgICAgICAgICA6IGVkaXRvci5nZXRWYWx1ZSgpO1xuXG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIENvbnZlcnQgYWxsIGxpbmUgZW5kaW5nIHZhcmlhdGlvbnMgdG8gVW5peC1zdHlsZSA9IFxcblxuICAgICAgICAgICAgICogV2luZG93cyAoXFxyXFxuKSwgTWFjT1MgQ2xhc3NpYyAoXFxyKSwgYW5kIFVuaXggKFxcbilcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgaWYgKGVkaXRvci4kc2VhcmNoLiRpc011bHRpbGluZVNlYXJjaChlZGl0b3IuZ2V0TGFzdFNlYXJjaE9wdGlvbnMoKSkpIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcclxcbnxcXHJ8XFxuL2csIFwiXFxuXCIpO1xuICAgICAgICAgICAgICAgIGVkaXRvci5zZXNzaW9uLmRvYy4kYXV0b05ld0xpbmUgPSBcIlxcblwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gZWRpdG9yLnNlc3Npb24uZG9jLnBvc2l0aW9uVG9JbmRleChlZGl0b3Iuc2VsZWN0aW9uLmFuY2hvcik7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hSYW5nZSlcbiAgICAgICAgICAgICAgICBvZmZzZXQgLT0gZWRpdG9yLnNlc3Npb24uZG9jLnBvc2l0aW9uVG9JbmRleCh0aGlzLnNlYXJjaFJhbmdlLnN0YXJ0KTtcblxuICAgICAgICAgICAgdmFyIGxhc3QgPSByZWdleC5sYXN0SW5kZXggPSAwO1xuICAgICAgICAgICAgdmFyIG07XG4gICAgICAgICAgICB3aGlsZSAoKG0gPSByZWdleC5leGVjKHZhbHVlKSkpIHtcbiAgICAgICAgICAgICAgICBhbGwrKztcbiAgICAgICAgICAgICAgICBsYXN0ID0gbS5pbmRleDtcbiAgICAgICAgICAgICAgICBpZiAobGFzdCA8PSBvZmZzZXQpXG4gICAgICAgICAgICAgICAgICAgIGJlZm9yZSsrO1xuICAgICAgICAgICAgICAgIGlmIChhbGwgPiBNQVhfQ09VTlQpXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGlmICghbVswXSkge1xuICAgICAgICAgICAgICAgICAgICByZWdleC5sYXN0SW5kZXggPSBsYXN0ICs9IGxhbmcuc2tpcEVtcHR5TWF0Y2godmFsdWUsIGxhc3QsIHN1cHBvcnRzVW5pY29kZUZsYWcpO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdCA+PSB2YWx1ZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWFyY2hDb3VudGVyLnRleHRDb250ZW50ID0gbmxzKFwic2VhcmNoLWJveC5zZWFyY2gtY291bnRlclwiLCBcIiQwIG9mICQxXCIsIFtiZWZvcmUgLCAoYWxsID4gTUFYX0NPVU5UID8gTUFYX0NPVU5UICsgXCIrXCIgOiBhbGwpXSk7XG4gICAgfVxuICAgIGZpbmROZXh0KCkge1xuICAgICAgICB0aGlzLmZpbmQodHJ1ZSwgZmFsc2UpO1xuICAgIH1cbiAgICBmaW5kUHJldigpIHtcbiAgICAgICAgdGhpcy5maW5kKHRydWUsIHRydWUpO1xuICAgIH1cbiAgICBmaW5kQWxsKCl7XG4gICAgICAgIHZhciByYW5nZSA9IHRoaXMuZWRpdG9yLmZpbmRBbGwodGhpcy5zZWFyY2hJbnB1dC52YWx1ZSwge1xuICAgICAgICAgICAgcmVnRXhwOiB0aGlzLnJlZ0V4cE9wdGlvbi5jaGVja2VkLFxuICAgICAgICAgICAgY2FzZVNlbnNpdGl2ZTogdGhpcy5jYXNlU2Vuc2l0aXZlT3B0aW9uLmNoZWNrZWQsXG4gICAgICAgICAgICB3aG9sZVdvcmQ6IHRoaXMud2hvbGVXb3JkT3B0aW9uLmNoZWNrZWRcbiAgICAgICAgfSk7XG4gICAgICAgIC8qKkB0eXBlIHthbnl9Ki9cbiAgICAgICAgdmFyIG5vTWF0Y2ggPSAhcmFuZ2UgJiYgdGhpcy5zZWFyY2hJbnB1dC52YWx1ZTtcbiAgICAgICAgZG9tLnNldENzc0NsYXNzKHRoaXMuc2VhcmNoQm94LCBcImFjZV9ub21hdGNoXCIsIG5vTWF0Y2gpO1xuICAgICAgICB0aGlzLmVkaXRvci5fZW1pdChcImZpbmRTZWFyY2hCb3hcIiwgeyBtYXRjaDogIW5vTWF0Y2ggfSk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0KCk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgICByZXBsYWNlKCkge1xuICAgICAgICBpZiAoIXRoaXMuZWRpdG9yLmdldFJlYWRPbmx5KCkpXG4gICAgICAgICAgICB0aGlzLmVkaXRvci5yZXBsYWNlKHRoaXMucmVwbGFjZUlucHV0LnZhbHVlKTtcbiAgICB9XG4gICAgcmVwbGFjZUFuZEZpbmROZXh0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZWRpdG9yLmdldFJlYWRPbmx5KCkpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnJlcGxhY2UodGhpcy5yZXBsYWNlSW5wdXQudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5maW5kTmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlcGxhY2VBbGwoKSB7XG4gICAgICAgIGlmICghdGhpcy5lZGl0b3IuZ2V0UmVhZE9ubHkoKSlcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnJlcGxhY2VBbGwodGhpcy5yZXBsYWNlSW5wdXQudmFsdWUpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2V0U2VhcmNoUmFuZ2UobnVsbCk7XG4gICAgICAgIHRoaXMuZWRpdG9yLm9mZihcImNoYW5nZVNlc3Npb25cIiwgdGhpcy5zZXRTZXNzaW9uKTtcbiAgICAgICAgdGhpcy5lZGl0b3Iub2ZmKFwiaW5wdXRcIiwgdGhpcy4kb25FZGl0b3JJbnB1dCk7XG5cbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5lZGl0b3Iua2V5QmluZGluZy5yZW1vdmVLZXlib2FyZEhhbmRsZXIodGhpcy4kY2xvc2VTZWFyY2hCYXJLYik7XG4gICAgICAgIHRoaXMuZWRpdG9yLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZhbHVlXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbaXNSZXBsYWNlXVxuICAgICAqL1xuICAgIHNob3codmFsdWUsIGlzUmVwbGFjZSkge1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZWRpdG9yLm9uKFwiY2hhbmdlU2Vzc2lvblwiLCB0aGlzLnNldFNlc3Npb24pO1xuICAgICAgICB0aGlzLmVkaXRvci5vbihcImlucHV0XCIsIHRoaXMuJG9uRWRpdG9ySW5wdXQpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICAgIHRoaXMucmVwbGFjZU9wdGlvbi5jaGVja2VkID0gaXNSZXBsYWNlO1xuXG4gICAgICAgIGlmICh0aGlzLmVkaXRvci4kc2VhcmNoLiRvcHRpb25zLnJlZ0V4cClcbiAgICAgICAgICAgIHZhbHVlID0gbGFuZy5lc2NhcGVSZWdFeHAodmFsdWUpO1xuXG4gICAgICAgIGlmICh2YWx1ZSlcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXQudmFsdWUgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLnNlYXJjaElucHV0LmZvY3VzKCk7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXQuc2VsZWN0KCk7XG5cbiAgICAgICAgdGhpcy5lZGl0b3Iua2V5QmluZGluZy5hZGRLZXlib2FyZEhhbmRsZXIodGhpcy4kY2xvc2VTZWFyY2hCYXJLYik7XG5cbiAgICAgICAgdGhpcy4kc3luY09wdGlvbnModHJ1ZSk7XG4gICAgfVxuXG4gICAgaXNGb2N1c2VkKCkge1xuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgICAgICByZXR1cm4gZWwgPT0gdGhpcy5zZWFyY2hJbnB1dCB8fCBlbCA9PSB0aGlzLnJlcGxhY2VJbnB1dDtcbiAgICB9XG59XG5cbi8va2V5YmluZGluZyBvdXRzaWRlIG9mIHRoZSBzZWFyY2hib3hcbnZhciAkc2VhcmNoQmFyS2IgPSBuZXcgSGFzaEhhbmRsZXIoKTtcbiRzZWFyY2hCYXJLYi5iaW5kS2V5cyh7XG4gICAgXCJDdHJsLWZ8Q29tbWFuZC1mXCI6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIHZhciBpc1JlcGxhY2UgPSBzYi5pc1JlcGxhY2UgPSAhc2IuaXNSZXBsYWNlO1xuICAgICAgICBzYi5yZXBsYWNlQm94LnN0eWxlLmRpc3BsYXkgPSBpc1JlcGxhY2UgPyBcIlwiIDogXCJub25lXCI7XG4gICAgICAgIHNiLnJlcGxhY2VPcHRpb24uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgICBzYi4kc3luY09wdGlvbnMoKTtcbiAgICAgICAgc2Iuc2VhcmNoSW5wdXQuZm9jdXMoKTtcbiAgICB9LFxuICAgIFwiQ3RybC1IfENvbW1hbmQtT3B0aW9uLUZcIjogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgaWYgKHNiLmVkaXRvci5nZXRSZWFkT25seSgpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBzYi5yZXBsYWNlT3B0aW9uLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICBzYi4kc3luY09wdGlvbnMoKTtcbiAgICAgICAgc2IucmVwbGFjZUlucHV0LmZvY3VzKCk7XG4gICAgfSxcbiAgICBcIkN0cmwtR3xDb21tYW5kLUdcIjogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgc2IuZmluZE5leHQoKTtcbiAgICB9LFxuICAgIFwiQ3RybC1TaGlmdC1HfENvbW1hbmQtU2hpZnQtR1wiOiBmdW5jdGlvbihzYikge1xuICAgICAgICBzYi5maW5kUHJldigpO1xuICAgIH0sXG4gICAgXCJlc2NcIjogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHsgc2IuaGlkZSgpO30pO1xuICAgIH0sXG4gICAgXCJSZXR1cm5cIjogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgaWYgKHNiLmFjdGl2ZUlucHV0ID09IHNiLnJlcGxhY2VJbnB1dClcbiAgICAgICAgICAgIHNiLnJlcGxhY2UoKTtcbiAgICAgICAgc2IuZmluZE5leHQoKTtcbiAgICB9LFxuICAgIFwiU2hpZnQtUmV0dXJuXCI6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIGlmIChzYi5hY3RpdmVJbnB1dCA9PSBzYi5yZXBsYWNlSW5wdXQpXG4gICAgICAgICAgICBzYi5yZXBsYWNlKCk7XG4gICAgICAgIHNiLmZpbmRQcmV2KCk7XG4gICAgfSxcbiAgICBcIkFsdC1SZXR1cm5cIjogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgaWYgKHNiLmFjdGl2ZUlucHV0ID09IHNiLnJlcGxhY2VJbnB1dClcbiAgICAgICAgICAgIHNiLnJlcGxhY2VBbGwoKTtcbiAgICAgICAgc2IuZmluZEFsbCgpO1xuICAgIH0sXG4gICAgXCJUYWJcIjogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgKHNiLmFjdGl2ZUlucHV0ID09IHNiLnJlcGxhY2VJbnB1dCA/IHNiLnNlYXJjaElucHV0IDogc2IucmVwbGFjZUlucHV0KS5mb2N1cygpO1xuICAgIH1cbn0pO1xuXG4kc2VhcmNoQmFyS2IuYWRkQ29tbWFuZHMoW3tcbiAgICBuYW1lOiBcInRvZ2dsZVJlZ2V4cE1vZGVcIixcbiAgICBiaW5kS2V5OiB7d2luOiBcIkFsdC1SfEFsdC0vXCIsIG1hYzogXCJDdHJsLUFsdC1SfEN0cmwtQWx0LS9cIn0sXG4gICAgZXhlYzogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgc2IucmVnRXhwT3B0aW9uLmNoZWNrZWQgPSAhc2IucmVnRXhwT3B0aW9uLmNoZWNrZWQ7XG4gICAgICAgIHNiLiRzeW5jT3B0aW9ucygpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcInRvZ2dsZUNhc2VTZW5zaXRpdmVcIixcbiAgICBiaW5kS2V5OiB7d2luOiBcIkFsdC1DfEFsdC1JXCIsIG1hYzogXCJDdHJsLUFsdC1SfEN0cmwtQWx0LUlcIn0sXG4gICAgZXhlYzogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgc2IuY2FzZVNlbnNpdGl2ZU9wdGlvbi5jaGVja2VkID0gIXNiLmNhc2VTZW5zaXRpdmVPcHRpb24uY2hlY2tlZDtcbiAgICAgICAgc2IuJHN5bmNPcHRpb25zKCk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwidG9nZ2xlV2hvbGVXb3Jkc1wiLFxuICAgIGJpbmRLZXk6IHt3aW46IFwiQWx0LUJ8QWx0LVdcIiwgbWFjOiBcIkN0cmwtQWx0LUJ8Q3RybC1BbHQtV1wifSxcbiAgICBleGVjOiBmdW5jdGlvbihzYikge1xuICAgICAgICBzYi53aG9sZVdvcmRPcHRpb24uY2hlY2tlZCA9ICFzYi53aG9sZVdvcmRPcHRpb24uY2hlY2tlZDtcbiAgICAgICAgc2IuJHN5bmNPcHRpb25zKCk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwidG9nZ2xlUmVwbGFjZVwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIHNiLnJlcGxhY2VPcHRpb24uY2hlY2tlZCA9ICFzYi5yZXBsYWNlT3B0aW9uLmNoZWNrZWQ7XG4gICAgICAgIHNiLiRzeW5jT3B0aW9ucygpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcInNlYXJjaEluU2VsZWN0aW9uXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgc2Iuc2VhcmNoT3B0aW9uLmNoZWNrZWQgPSAhc2Iuc2VhcmNoUmFuZ2U7XG4gICAgICAgIHNiLnNldFNlYXJjaFJhbmdlKHNiLnNlYXJjaE9wdGlvbi5jaGVja2VkICYmIHNiLmVkaXRvci5nZXRTZWxlY3Rpb25SYW5nZSgpKTtcbiAgICAgICAgc2IuJHN5bmNPcHRpb25zKCk7XG4gICAgfVxufV0pO1xuXG4vL2tleWJpbmRpbmcgb3V0c2lkZSBvZiB0aGUgc2VhcmNoYm94XG52YXIgJGNsb3NlU2VhcmNoQmFyS2IgPSBuZXcgSGFzaEhhbmRsZXIoW3tcbiAgICBiaW5kS2V5OiBcIkVzY1wiLFxuICAgIG5hbWU6IFwiY2xvc2VTZWFyY2hCYXJcIixcbiAgICBleGVjOiBmdW5jdGlvbihlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLnNlYXJjaEJveC5oaWRlKCk7XG4gICAgfVxufV0pO1xuXG5TZWFyY2hCb3gucHJvdG90eXBlLiRzZWFyY2hCYXJLYiA9ICRzZWFyY2hCYXJLYjtcblNlYXJjaEJveC5wcm90b3R5cGUuJGNsb3NlU2VhcmNoQmFyS2IgPSAkY2xvc2VTZWFyY2hCYXJLYjtcblxuZXhwb3J0cy5TZWFyY2hCb3ggPSBTZWFyY2hCb3g7XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzUmVwbGFjZV1cbiAqL1xuZXhwb3J0cy5TZWFyY2ggPSBmdW5jdGlvbihlZGl0b3IsIGlzUmVwbGFjZSkge1xuICAgIHZhciBzYiA9IGVkaXRvci5zZWFyY2hCb3ggfHwgbmV3IFNlYXJjaEJveChlZGl0b3IpO1xuICAgIHNiLnNob3coZWRpdG9yLnNlc3Npb24uZ2V0VGV4dFJhbmdlKCksIGlzUmVwbGFjZSk7XG59O1xuXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVE9ET1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKlxuLSBtb3ZlIHNlYXJjaCBmb3JtIHRvIHRoZSBsZWZ0IGlmIGl0IG1hc2tzIGN1cnJlbnQgd29yZFxuLSBpbmNsdWRlIGFsbCBvcHRpb25zIHRoYXQgc2VhcmNoIGhhcy4gZXg6IHJlZ2V4XG4tIHNlYXJjaGJveC5zZWFyY2hib3ggaXMgbm90IHRoYXQgcHJldHR5LiBXZSBzaG91bGQgaGF2ZSBqdXN0IHNlYXJjaGJveFxuLSBkaXNhYmxlIHByZXYgYnV0dG9uIGlmIGl0IG1ha2VzIHNlbnNlXG4qL1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9