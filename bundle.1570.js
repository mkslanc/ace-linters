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
        /**@type {any}*/
        this.activeInput;
        var div = dom.createElement("div");
        dom.buildDom(["div", {class:"ace_search right"},
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
        ], div);
        /**@type {any}*/
        this.element = div.firstChild;

        this.setSession = this.setSession.bind(this);

        this.$init();
        this.setEditor(editor);
        dom.importCssString(searchboxCss, "ace_searchbox", editor.container);
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
        this.element.style.display = "";
        this.replaceOption.checked = isReplace;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQSxpQkFBaUI7O0FBRWpCO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsV0FBVyxTQUFTO0FBQ3BCO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3NlYXJjaGJveC1jc3MuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3NlYXJjaGJveC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGBcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBFZGl0b3IgU2VhcmNoIEZvcm1cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLmFjZV9zZWFyY2gge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XG4gICAgY29sb3I6ICM2NjY7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NiY2JjYjtcbiAgICBib3JkZXItdG9wOiAwIG5vbmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogNHB4IDZweCAwIDRweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHotaW5kZXg6IDk5O1xuICAgIHdoaXRlLXNwYWNlOiBub3JtYWw7XG59XG4uYWNlX3NlYXJjaC5sZWZ0IHtcbiAgICBib3JkZXItbGVmdDogMCBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDBweCAwcHggNXB4IDBweDtcbiAgICBsZWZ0OiAwO1xufVxuLmFjZV9zZWFyY2gucmlnaHQge1xuICAgIGJvcmRlci1yYWRpdXM6IDBweCAwcHggMHB4IDVweDtcbiAgICBib3JkZXItcmlnaHQ6IDAgbm9uZTtcbiAgICByaWdodDogMDtcbn1cblxuLmFjZV9zZWFyY2hfZm9ybSwgLmFjZV9yZXBsYWNlX2Zvcm0ge1xuICAgIG1hcmdpbjogMCAyMHB4IDRweCAwO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgbGluZS1oZWlnaHQ6IDEuOTtcbn1cbi5hY2VfcmVwbGFjZV9mb3JtIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XG59XG4uYWNlX3NlYXJjaF9mb3JtLmFjZV9ub21hdGNoIHtcbiAgICBvdXRsaW5lOiAxcHggc29saWQgcmVkO1xufVxuXG4uYWNlX3NlYXJjaF9maWVsZCB7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4IDAgMCAzcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgY29sb3I6IGJsYWNrO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjYmNiY2I7XG4gICAgYm9yZGVyLXJpZ2h0OiAwIG5vbmU7XG4gICAgb3V0bGluZTogMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGZvbnQtc2l6ZTogaW5oZXJpdDtcbiAgICBtYXJnaW46IDA7XG4gICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XG4gICAgcGFkZGluZzogMCA2cHg7XG4gICAgbWluLXdpZHRoOiAxN2VtO1xuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gICAgbWluLWhlaWdodDogMS44ZW07XG4gICAgYm94LXNpemluZzogY29udGVudC1ib3g7XG59XG4uYWNlX3NlYXJjaGJ0biB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NiY2JjYjtcbiAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgcGFkZGluZzogMCA2cHg7XG4gICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICBib3JkZXItcmlnaHQ6IDAgbm9uZTtcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNkY2RjZGM7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIG1hcmdpbjogMDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgY29sb3I6ICM2NjY7XG59XG4uYWNlX3NlYXJjaGJ0bjpsYXN0LWNoaWxkIHtcbiAgICBib3JkZXItcmFkaXVzOiAwIDNweCAzcHggMDtcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjY2JjYmNiO1xufVxuLmFjZV9zZWFyY2hidG46ZGlzYWJsZWQge1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xufVxuLmFjZV9zZWFyY2hidG46aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWYxZjY7XG59XG4uYWNlX3NlYXJjaGJ0bi5wcmV2LCAuYWNlX3NlYXJjaGJ0bi5uZXh0IHtcbiAgICAgcGFkZGluZzogMHB4IDAuN2VtXG59XG4uYWNlX3NlYXJjaGJ0bi5wcmV2OmFmdGVyLCAuYWNlX3NlYXJjaGJ0bi5uZXh0OmFmdGVyIHtcbiAgICAgY29udGVudDogXCJcIjtcbiAgICAgYm9yZGVyOiBzb2xpZCAycHggIzg4ODtcbiAgICAgd2lkdGg6IDAuNWVtO1xuICAgICBoZWlnaHQ6IDAuNWVtO1xuICAgICBib3JkZXItd2lkdGg6ICAycHggMCAwIDJweDtcbiAgICAgZGlzcGxheTppbmxpbmUtYmxvY2s7XG4gICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG59XG4uYWNlX3NlYXJjaGJ0bi5uZXh0OmFmdGVyIHtcbiAgICAgYm9yZGVyLXdpZHRoOiAwIDJweCAycHggMCA7XG59XG4uYWNlX3NlYXJjaGJ0bl9jbG9zZSB7XG4gICAgYmFja2dyb3VuZDogdXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQTRBQUFBY0NBWUFBQUJSVm81QkFBQUFaMGxFUVZSNDJ1MlNVUXJBTUFoRHZhem44T2paQmlsQ2tZVlZ4aWlzOEg0Q1QwVnJBSmI0V0hUM0M1eFUyYTJJUVpYSmppUUlSTWRrRW9KNVEyeU1xcGZESW8rWFk0azZoK1lYT3lLcVRJajVSRWF4bG9OQWQweGlLbUF0c1RIcVc4c1IyVzVmN2dDdTVuV0ZVcFZqWndBQUFBQkpSVTVFcmtKZ2dnPT0pIG5vLXJlcGVhdCA1MCUgMDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYm9yZGVyOiAwIG5vbmU7XG4gICAgY29sb3I6ICM2NTY1NjU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZvbnQ6IDE2cHgvMTZweCBBcmlhbDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGhlaWdodDogMTRweDtcbiAgICB3aWR0aDogMTRweDtcbiAgICB0b3A6IDlweDtcbiAgICByaWdodDogN3B4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cbi5hY2Vfc2VhcmNoYnRuX2Nsb3NlOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjU2NTY1O1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDUwJSAxMDAlO1xuICAgIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmFjZV9idXR0b24ge1xuICAgIG1hcmdpbi1sZWZ0OiAycHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtby11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBvcGFjaXR5OiAwLjc7XG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgxMDAsMTAwLDEwMCwwLjIzKTtcbiAgICBwYWRkaW5nOiAxcHg7XG4gICAgYm94LXNpemluZzogICAgYm9yZGVyLWJveCFpbXBvcnRhbnQ7XG4gICAgY29sb3I6IGJsYWNrO1xufVxuXG4uYWNlX2J1dHRvbjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbiAgICBvcGFjaXR5OjE7XG59XG4uYWNlX2J1dHRvbjphY3RpdmUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XG59XG5cbi5hY2VfYnV0dG9uLmNoZWNrZWQge1xuICAgIGJvcmRlci1jb2xvcjogIzMzOTlmZjtcbiAgICBvcGFjaXR5OjE7XG59XG5cbi5hY2Vfc2VhcmNoX29wdGlvbnN7XG4gICAgbWFyZ2luLWJvdHRvbTogM3B4O1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtby11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgY2xlYXI6IGJvdGg7XG59XG5cbi5hY2Vfc2VhcmNoX2NvdW50ZXIge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIGZvbnQtZmFtaWx5OiBhcmlhbDtcbiAgICBwYWRkaW5nOiAwIDhweDtcbn1gO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9lZGl0b3JcIikuRWRpdG9yfSBFZGl0b3JcbiAqL1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9saWIvZG9tXCIpO1xudmFyIGxhbmcgPSByZXF1aXJlKFwiLi4vbGliL2xhbmdcIik7XG52YXIgZXZlbnQgPSByZXF1aXJlKFwiLi4vbGliL2V2ZW50XCIpO1xudmFyIHNlYXJjaGJveENzcyA9IHJlcXVpcmUoXCIuL3NlYXJjaGJveC1jc3NcIik7XG52YXIgSGFzaEhhbmRsZXIgPSByZXF1aXJlKFwiLi4va2V5Ym9hcmQvaGFzaF9oYW5kbGVyXCIpLkhhc2hIYW5kbGVyO1xudmFyIGtleVV0aWwgPSByZXF1aXJlKFwiLi4vbGliL2tleXNcIik7XG52YXIgbmxzID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKS5ubHM7XG5cbnZhciBNQVhfQ09VTlQgPSA5OTk7XG5cbmRvbS5pbXBvcnRDc3NTdHJpbmcoc2VhcmNoYm94Q3NzLCBcImFjZV9zZWFyY2hib3hcIiwgZmFsc2UpO1xuXG5jbGFzcyBTZWFyY2hCb3gge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAgICAgKiBAcGFyYW0ge25ldmVyfSBbcmFuZ2VdXG4gICAgICogQHBhcmFtIHtuZXZlcn0gW3Nob3dSZXBsYWNlRm9ybV1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihlZGl0b3IsIHJhbmdlLCBzaG93UmVwbGFjZUZvcm0pIHtcbiAgICAgICAgLyoqQHR5cGUge2FueX0qL1xuICAgICAgICB0aGlzLmFjdGl2ZUlucHV0O1xuICAgICAgICB2YXIgZGl2ID0gZG9tLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGRvbS5idWlsZERvbShbXCJkaXZcIiwge2NsYXNzOlwiYWNlX3NlYXJjaCByaWdodFwifSxcbiAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJoaWRlXCIsIGNsYXNzOiBcImFjZV9zZWFyY2hidG5fY2xvc2VcIn1dLFxuICAgICAgICAgICAgW1wiZGl2XCIsIHtjbGFzczogXCJhY2Vfc2VhcmNoX2Zvcm1cIn0sXG4gICAgICAgICAgICAgICAgW1wiaW5wdXRcIiwge2NsYXNzOiBcImFjZV9zZWFyY2hfZmllbGRcIiwgcGxhY2Vob2xkZXI6IG5scyhcInNlYXJjaC1ib3guZmluZC5wbGFjZWhvbGRlclwiLCBcIlNlYXJjaCBmb3JcIiksIHNwZWxsY2hlY2s6IFwiZmFsc2VcIn1dLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJmaW5kUHJldlwiLCBjbGFzczogXCJhY2Vfc2VhcmNoYnRuIHByZXZcIn0sIFwiXFx1MjAwYlwiXSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwiZmluZE5leHRcIiwgY2xhc3M6IFwiYWNlX3NlYXJjaGJ0biBuZXh0XCJ9LCBcIlxcdTIwMGJcIl0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcImZpbmRBbGxcIiwgY2xhc3M6IFwiYWNlX3NlYXJjaGJ0blwiLCB0aXRsZTogXCJBbHQtRW50ZXJcIn0sIG5scyhcInNlYXJjaC1ib3guZmluZC1hbGwudGV4dFwiLCBcIkFsbFwiKV1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXCJkaXZcIiwge2NsYXNzOiBcImFjZV9yZXBsYWNlX2Zvcm1cIn0sXG4gICAgICAgICAgICAgICAgW1wiaW5wdXRcIiwge2NsYXNzOiBcImFjZV9zZWFyY2hfZmllbGRcIiwgcGxhY2Vob2xkZXI6IG5scyhcInNlYXJjaC1ib3gucmVwbGFjZS5wbGFjZWhvbGRlclwiLCBcIlJlcGxhY2Ugd2l0aFwiKSwgc3BlbGxjaGVjazogXCJmYWxzZVwifV0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcInJlcGxhY2VBbmRGaW5kTmV4dFwiLCBjbGFzczogXCJhY2Vfc2VhcmNoYnRuXCJ9LCBubHMoXCJzZWFyY2gtYm94LnJlcGxhY2UtbmV4dC50ZXh0XCIsIFwiUmVwbGFjZVwiKV0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcInJlcGxhY2VBbGxcIiwgY2xhc3M6IFwiYWNlX3NlYXJjaGJ0blwifSwgbmxzKFwic2VhcmNoLWJveC5yZXBsYWNlLWFsbC50ZXh0XCIsIFwiQWxsXCIpXVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcImRpdlwiLCB7Y2xhc3M6IFwiYWNlX3NlYXJjaF9vcHRpb25zXCJ9LFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJ0b2dnbGVSZXBsYWNlXCIsIGNsYXNzOiBcImFjZV9idXR0b25cIiwgdGl0bGU6IG5scyhcInNlYXJjaC1ib3gudG9nZ2xlLXJlcGxhY2UudGl0bGVcIiwgXCJUb2dnbGUgUmVwbGFjZSBtb2RlXCIpLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogXCJmbG9hdDpsZWZ0O21hcmdpbi10b3A6LTJweDtwYWRkaW5nOjAgNXB4O1wifSwgXCIrXCJdLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2NsYXNzOiBcImFjZV9zZWFyY2hfY291bnRlclwifV0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcInRvZ2dsZVJlZ2V4cE1vZGVcIiwgY2xhc3M6IFwiYWNlX2J1dHRvblwiLCB0aXRsZTogbmxzKFwic2VhcmNoLWJveC50b2dnbGUtcmVnZXhwLnRpdGxlXCIsIFwiUmVnRXhwIFNlYXJjaFwiKX0sIFwiLipcIl0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcInRvZ2dsZUNhc2VTZW5zaXRpdmVcIiwgY2xhc3M6IFwiYWNlX2J1dHRvblwiLCB0aXRsZTogbmxzKFwic2VhcmNoLWJveC50b2dnbGUtY2FzZS50aXRsZVwiLCBcIkNhc2VTZW5zaXRpdmUgU2VhcmNoXCIpfSwgXCJBYVwiXSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwidG9nZ2xlV2hvbGVXb3Jkc1wiLCBjbGFzczogXCJhY2VfYnV0dG9uXCIsIHRpdGxlOiBubHMoXCJzZWFyY2gtYm94LnRvZ2dsZS13aG9sZS13b3JkLnRpdGxlXCIsIFwiV2hvbGUgV29yZCBTZWFyY2hcIil9LCBcIlxcXFxiXCJdLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJzZWFyY2hJblNlbGVjdGlvblwiLCBjbGFzczogXCJhY2VfYnV0dG9uXCIsIHRpdGxlOiBubHMoXCJzZWFyY2gtYm94LnRvZ2dsZS1pbi1zZWxlY3Rpb24udGl0bGVcIiwgXCJTZWFyY2ggSW4gU2VsZWN0aW9uXCIpfSwgXCJTXCJdXG4gICAgICAgICAgICBdXG4gICAgICAgIF0sIGRpdik7XG4gICAgICAgIC8qKkB0eXBlIHthbnl9Ki9cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZGl2LmZpcnN0Q2hpbGQ7XG5cbiAgICAgICAgdGhpcy5zZXRTZXNzaW9uID0gdGhpcy5zZXRTZXNzaW9uLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy4kaW5pdCgpO1xuICAgICAgICB0aGlzLnNldEVkaXRvcihlZGl0b3IpO1xuICAgICAgICBkb20uaW1wb3J0Q3NzU3RyaW5nKHNlYXJjaGJveENzcywgXCJhY2Vfc2VhcmNoYm94XCIsIGVkaXRvci5jb250YWluZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAgICAgKi9cbiAgICBzZXRFZGl0b3IoZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5zZWFyY2hCb3ggPSB0aGlzO1xuICAgICAgICBlZGl0b3IucmVuZGVyZXIuc2Nyb2xsZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICAgICAgLyoqQHR5cGUge0VkaXRvcn0qL1xuICAgICAgICB0aGlzLmVkaXRvciA9IGVkaXRvcjtcbiAgICB9XG5cbiAgICBzZXRTZXNzaW9uKGUpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hSYW5nZSA9IG51bGw7XG4gICAgICAgIHRoaXMuJHN5bmNPcHRpb25zKHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHNiXG4gICAgICovXG4gICAgJGluaXRFbGVtZW50cyhzYikge1xuICAgICAgICAvKipAdHlwZSB7SFRNTEVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy5zZWFyY2hCb3ggPSBzYi5xdWVyeVNlbGVjdG9yKFwiLmFjZV9zZWFyY2hfZm9ybVwiKTtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxFbGVtZW50fSovXG4gICAgICAgIHRoaXMucmVwbGFjZUJveCA9IHNiLnF1ZXJ5U2VsZWN0b3IoXCIuYWNlX3JlcGxhY2VfZm9ybVwiKTtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy5zZWFyY2hPcHRpb24gPSBzYi5xdWVyeVNlbGVjdG9yKFwiW2FjdGlvbj1zZWFyY2hJblNlbGVjdGlvbl1cIik7XG4gICAgICAgIC8qKkB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSovXG4gICAgICAgIHRoaXMucmVwbGFjZU9wdGlvbiA9IHNiLnF1ZXJ5U2VsZWN0b3IoXCJbYWN0aW9uPXRvZ2dsZVJlcGxhY2VdXCIpO1xuICAgICAgICAvKipAdHlwZSB7SFRNTElucHV0RWxlbWVudH0qL1xuICAgICAgICB0aGlzLnJlZ0V4cE9wdGlvbiA9IHNiLnF1ZXJ5U2VsZWN0b3IoXCJbYWN0aW9uPXRvZ2dsZVJlZ2V4cE1vZGVdXCIpO1xuICAgICAgICAvKipAdHlwZSB7SFRNTElucHV0RWxlbWVudH0qL1xuICAgICAgICB0aGlzLmNhc2VTZW5zaXRpdmVPcHRpb24gPSBzYi5xdWVyeVNlbGVjdG9yKFwiW2FjdGlvbj10b2dnbGVDYXNlU2Vuc2l0aXZlXVwiKTtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy53aG9sZVdvcmRPcHRpb24gPSBzYi5xdWVyeVNlbGVjdG9yKFwiW2FjdGlvbj10b2dnbGVXaG9sZVdvcmRzXVwiKTtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dCA9IHRoaXMuc2VhcmNoQm94LnF1ZXJ5U2VsZWN0b3IoXCIuYWNlX3NlYXJjaF9maWVsZFwiKTtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy5yZXBsYWNlSW5wdXQgPSB0aGlzLnJlcGxhY2VCb3gucXVlcnlTZWxlY3RvcihcIi5hY2Vfc2VhcmNoX2ZpZWxkXCIpO1xuICAgICAgICAvKipAdHlwZSB7SFRNTEVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy5zZWFyY2hDb3VudGVyID0gc2IucXVlcnlTZWxlY3RvcihcIi5hY2Vfc2VhcmNoX2NvdW50ZXJcIik7XG4gICAgfVxuXG4gICAgJGluaXQoKSB7XG4gICAgICAgIHZhciBzYiA9IHRoaXMuZWxlbWVudDtcblxuICAgICAgICB0aGlzLiRpbml0RWxlbWVudHMoc2IpO1xuXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGV2ZW50LmFkZExpc3RlbmVyKHNiLCBcIm1vdXNlZG93blwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgX3RoaXMuYWN0aXZlSW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgZXZlbnQuYWRkTGlzdGVuZXIoc2IsIFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIHQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gdC5nZXRBdHRyaWJ1dGUoXCJhY3Rpb25cIik7XG4gICAgICAgICAgICBpZiAoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pXG4gICAgICAgICAgICAgICAgX3RoaXNbYWN0aW9uXSgpO1xuICAgICAgICAgICAgZWxzZSBpZiAoX3RoaXMuJHNlYXJjaEJhcktiLmNvbW1hbmRzW2FjdGlvbl0pXG4gICAgICAgICAgICAgICAgX3RoaXMuJHNlYXJjaEJhcktiLmNvbW1hbmRzW2FjdGlvbl0uZXhlYyhfdGhpcyk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV2ZW50LmFkZENvbW1hbmRLZXlMaXN0ZW5lcihzYiwgZnVuY3Rpb24oZSwgaGFzaElkLCBrZXlDb2RlKSB7XG4gICAgICAgICAgICB2YXIga2V5U3RyaW5nID0ga2V5VXRpbC5rZXlDb2RlVG9TdHJpbmcoa2V5Q29kZSk7XG4gICAgICAgICAgICB2YXIgY29tbWFuZCA9IF90aGlzLiRzZWFyY2hCYXJLYi5maW5kS2V5Q29tbWFuZChoYXNoSWQsIGtleVN0cmluZyk7XG4gICAgICAgICAgICBpZiAoY29tbWFuZCAmJiBjb21tYW5kLmV4ZWMpIHtcbiAgICAgICAgICAgICAgICBjb21tYW5kLmV4ZWMoX3RoaXMpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BFdmVudChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEB0eXBlIHt7c2NoZWR1bGU6ICh0aW1lb3V0PzogbnVtYmVyKSA9PiB2b2lkfX1cbiAgICAgICAgICogQGV4dGVybmFsXG4gICAgICAgICovXG4gICAgICAgIHRoaXMuJG9uQ2hhbmdlID0gbGFuZy5kZWxheWVkQ2FsbChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF90aGlzLmZpbmQoZmFsc2UsIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5zZWFyY2hJbnB1dCwgXCJpbnB1dFwiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF90aGlzLiRvbkNoYW5nZS5zY2hlZHVsZSgyMCk7XG4gICAgICAgIH0pO1xuICAgICAgICBldmVudC5hZGRMaXN0ZW5lcih0aGlzLnNlYXJjaElucHV0LCBcImZvY3VzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMuYWN0aXZlSW5wdXQgPSBfdGhpcy5zZWFyY2hJbnB1dDtcbiAgICAgICAgICAgIF90aGlzLnNlYXJjaElucHV0LnZhbHVlICYmIF90aGlzLmhpZ2hsaWdodCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5yZXBsYWNlSW5wdXQsIFwiZm9jdXNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy5hY3RpdmVJbnB1dCA9IF90aGlzLnJlcGxhY2VJbnB1dDtcbiAgICAgICAgICAgIF90aGlzLnNlYXJjaElucHV0LnZhbHVlICYmIF90aGlzLmhpZ2hsaWdodCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzZXRTZWFyY2hSYW5nZShyYW5nZSkge1xuICAgICAgICB0aGlzLnNlYXJjaFJhbmdlID0gcmFuZ2U7XG4gICAgICAgIGlmIChyYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hSYW5nZU1hcmtlciA9IHRoaXMuZWRpdG9yLnNlc3Npb24uYWRkTWFya2VyKHJhbmdlLCBcImFjZV9hY3RpdmUtbGluZVwiKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlYXJjaFJhbmdlTWFya2VyKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5zZXNzaW9uLnJlbW92ZU1hcmtlcih0aGlzLnNlYXJjaFJhbmdlTWFya2VyKTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUmFuZ2VNYXJrZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBbcHJldmVudFNjcm9sbF1cbiAgICAgKiBAZXh0ZXJuYWxcbiAgICAgKi9cbiAgICAkc3luY09wdGlvbnMocHJldmVudFNjcm9sbCkge1xuICAgICAgICBkb20uc2V0Q3NzQ2xhc3ModGhpcy5yZXBsYWNlT3B0aW9uLCBcImNoZWNrZWRcIiwgdGhpcy5zZWFyY2hSYW5nZSk7XG4gICAgICAgIGRvbS5zZXRDc3NDbGFzcyh0aGlzLnNlYXJjaE9wdGlvbiwgXCJjaGVja2VkXCIsIHRoaXMuc2VhcmNoT3B0aW9uLmNoZWNrZWQpO1xuICAgICAgICB0aGlzLnJlcGxhY2VPcHRpb24udGV4dENvbnRlbnQgPSB0aGlzLnJlcGxhY2VPcHRpb24uY2hlY2tlZCA/IFwiLVwiIDogXCIrXCI7XG4gICAgICAgIGRvbS5zZXRDc3NDbGFzcyh0aGlzLnJlZ0V4cE9wdGlvbiwgXCJjaGVja2VkXCIsIHRoaXMucmVnRXhwT3B0aW9uLmNoZWNrZWQpO1xuICAgICAgICBkb20uc2V0Q3NzQ2xhc3ModGhpcy53aG9sZVdvcmRPcHRpb24sIFwiY2hlY2tlZFwiLCB0aGlzLndob2xlV29yZE9wdGlvbi5jaGVja2VkKTtcbiAgICAgICAgZG9tLnNldENzc0NsYXNzKHRoaXMuY2FzZVNlbnNpdGl2ZU9wdGlvbiwgXCJjaGVja2VkXCIsIHRoaXMuY2FzZVNlbnNpdGl2ZU9wdGlvbi5jaGVja2VkKTtcbiAgICAgICAgdmFyIHJlYWRPbmx5ID0gdGhpcy5lZGl0b3IuZ2V0UmVhZE9ubHkoKTtcbiAgICAgICAgdGhpcy5yZXBsYWNlT3B0aW9uLnN0eWxlLmRpc3BsYXkgPSByZWFkT25seSA/IFwibm9uZVwiIDogXCJcIjtcbiAgICAgICAgdGhpcy5yZXBsYWNlQm94LnN0eWxlLmRpc3BsYXkgPSB0aGlzLnJlcGxhY2VPcHRpb24uY2hlY2tlZCAmJiAhcmVhZE9ubHkgPyBcIlwiIDogXCJub25lXCI7XG4gICAgICAgIHRoaXMuZmluZChmYWxzZSwgZmFsc2UsIHByZXZlbnRTY3JvbGwpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7UmVnRXhwfSBbcmVdXG4gICAgICovXG4gICAgaGlnaGxpZ2h0KHJlKSB7XG4gICAgICAgIHRoaXMuZWRpdG9yLnNlc3Npb24uaGlnaGxpZ2h0KHJlIHx8IHRoaXMuZWRpdG9yLiRzZWFyY2guJG9wdGlvbnMucmUpO1xuICAgICAgICB0aGlzLmVkaXRvci5yZW5kZXJlci51cGRhdGVCYWNrTWFya2VycygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gc2tpcEN1cnJlbnRcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGJhY2t3YXJkc1xuICAgICAqIEBwYXJhbSB7YW55fSBbcHJldmVudFNjcm9sbF1cbiAgICAgKi9cbiAgICBmaW5kKHNraXBDdXJyZW50LCBiYWNrd2FyZHMsIHByZXZlbnRTY3JvbGwpIHtcbiAgICAgICAgdmFyIHJhbmdlID0gdGhpcy5lZGl0b3IuZmluZCh0aGlzLnNlYXJjaElucHV0LnZhbHVlLCB7XG4gICAgICAgICAgICBza2lwQ3VycmVudDogc2tpcEN1cnJlbnQsXG4gICAgICAgICAgICBiYWNrd2FyZHM6IGJhY2t3YXJkcyxcbiAgICAgICAgICAgIHdyYXA6IHRydWUsXG4gICAgICAgICAgICByZWdFeHA6IHRoaXMucmVnRXhwT3B0aW9uLmNoZWNrZWQsXG4gICAgICAgICAgICBjYXNlU2Vuc2l0aXZlOiB0aGlzLmNhc2VTZW5zaXRpdmVPcHRpb24uY2hlY2tlZCxcbiAgICAgICAgICAgIHdob2xlV29yZDogdGhpcy53aG9sZVdvcmRPcHRpb24uY2hlY2tlZCxcbiAgICAgICAgICAgIHByZXZlbnRTY3JvbGw6IHByZXZlbnRTY3JvbGwsXG4gICAgICAgICAgICByYW5nZTogdGhpcy5zZWFyY2hSYW5nZVxuICAgICAgICB9KTtcbiAgICAgICAgLyoqQHR5cGUge2FueX0qL1xuICAgICAgICB2YXIgbm9NYXRjaCA9ICFyYW5nZSAmJiB0aGlzLnNlYXJjaElucHV0LnZhbHVlO1xuICAgICAgICBkb20uc2V0Q3NzQ2xhc3ModGhpcy5zZWFyY2hCb3gsIFwiYWNlX25vbWF0Y2hcIiwgbm9NYXRjaCk7XG4gICAgICAgIHRoaXMuZWRpdG9yLl9lbWl0KFwiZmluZFNlYXJjaEJveFwiLCB7IG1hdGNoOiAhbm9NYXRjaCB9KTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDb3VudGVyKCk7XG4gICAgfVxuICAgIHVwZGF0ZUNvdW50ZXIoKSB7XG4gICAgICAgIHZhciBlZGl0b3IgPSB0aGlzLmVkaXRvcjtcbiAgICAgICAgdmFyIHJlZ2V4ID0gZWRpdG9yLiRzZWFyY2guJG9wdGlvbnMucmU7XG4gICAgICAgIHZhciBzdXBwb3J0c1VuaWNvZGVGbGFnID0gcmVnZXgudW5pY29kZTtcbiAgICAgICAgdmFyIGFsbCA9IDA7XG4gICAgICAgIHZhciBiZWZvcmUgPSAwO1xuICAgICAgICBpZiAocmVnZXgpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuc2VhcmNoUmFuZ2VcbiAgICAgICAgICAgICAgICA/IGVkaXRvci5zZXNzaW9uLmdldFRleHRSYW5nZSh0aGlzLnNlYXJjaFJhbmdlKVxuICAgICAgICAgICAgICAgIDogZWRpdG9yLmdldFZhbHVlKCk7XG5cbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBlZGl0b3Iuc2Vzc2lvbi5kb2MucG9zaXRpb25Ub0luZGV4KGVkaXRvci5zZWxlY3Rpb24uYW5jaG9yKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnNlYXJjaFJhbmdlKVxuICAgICAgICAgICAgICAgIG9mZnNldCAtPSBlZGl0b3Iuc2Vzc2lvbi5kb2MucG9zaXRpb25Ub0luZGV4KHRoaXMuc2VhcmNoUmFuZ2Uuc3RhcnQpO1xuXG4gICAgICAgICAgICB2YXIgbGFzdCA9IHJlZ2V4Lmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICB2YXIgbTtcbiAgICAgICAgICAgIHdoaWxlICgobSA9IHJlZ2V4LmV4ZWModmFsdWUpKSkge1xuICAgICAgICAgICAgICAgIGFsbCsrO1xuICAgICAgICAgICAgICAgIGxhc3QgPSBtLmluZGV4O1xuICAgICAgICAgICAgICAgIGlmIChsYXN0IDw9IG9mZnNldClcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlKys7XG4gICAgICAgICAgICAgICAgaWYgKGFsbCA+IE1BWF9DT1VOVClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgaWYgKCFtWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4Lmxhc3RJbmRleCA9IGxhc3QgKz0gbGFuZy5za2lwRW1wdHlNYXRjaCh2YWx1ZSwgbGFzdCwgc3VwcG9ydHNVbmljb2RlRmxhZyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0ID49IHZhbHVlLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlYXJjaENvdW50ZXIudGV4dENvbnRlbnQgPSBubHMoXCJzZWFyY2gtYm94LnNlYXJjaC1jb3VudGVyXCIsIFwiJDAgb2YgJDFcIiwgW2JlZm9yZSAsIChhbGwgPiBNQVhfQ09VTlQgPyBNQVhfQ09VTlQgKyBcIitcIiA6IGFsbCldKTtcbiAgICB9XG4gICAgZmluZE5leHQoKSB7XG4gICAgICAgIHRoaXMuZmluZCh0cnVlLCBmYWxzZSk7XG4gICAgfVxuICAgIGZpbmRQcmV2KCkge1xuICAgICAgICB0aGlzLmZpbmQodHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGZpbmRBbGwoKXtcbiAgICAgICAgdmFyIHJhbmdlID0gdGhpcy5lZGl0b3IuZmluZEFsbCh0aGlzLnNlYXJjaElucHV0LnZhbHVlLCB7XG4gICAgICAgICAgICByZWdFeHA6IHRoaXMucmVnRXhwT3B0aW9uLmNoZWNrZWQsXG4gICAgICAgICAgICBjYXNlU2Vuc2l0aXZlOiB0aGlzLmNhc2VTZW5zaXRpdmVPcHRpb24uY2hlY2tlZCxcbiAgICAgICAgICAgIHdob2xlV29yZDogdGhpcy53aG9sZVdvcmRPcHRpb24uY2hlY2tlZFxuICAgICAgICB9KTtcbiAgICAgICAgLyoqQHR5cGUge2FueX0qL1xuICAgICAgICB2YXIgbm9NYXRjaCA9ICFyYW5nZSAmJiB0aGlzLnNlYXJjaElucHV0LnZhbHVlO1xuICAgICAgICBkb20uc2V0Q3NzQ2xhc3ModGhpcy5zZWFyY2hCb3gsIFwiYWNlX25vbWF0Y2hcIiwgbm9NYXRjaCk7XG4gICAgICAgIHRoaXMuZWRpdG9yLl9lbWl0KFwiZmluZFNlYXJjaEJveFwiLCB7IG1hdGNoOiAhbm9NYXRjaCB9KTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHQoKTtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICAgIHJlcGxhY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5lZGl0b3IuZ2V0UmVhZE9ubHkoKSlcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnJlcGxhY2UodGhpcy5yZXBsYWNlSW5wdXQudmFsdWUpO1xuICAgIH1cbiAgICByZXBsYWNlQW5kRmluZE5leHQoKSB7XG4gICAgICAgIGlmICghdGhpcy5lZGl0b3IuZ2V0UmVhZE9ubHkoKSkge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3IucmVwbGFjZSh0aGlzLnJlcGxhY2VJbnB1dC52YWx1ZSk7XG4gICAgICAgICAgICB0aGlzLmZpbmROZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVwbGFjZUFsbCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVkaXRvci5nZXRSZWFkT25seSgpKVxuICAgICAgICAgICAgdGhpcy5lZGl0b3IucmVwbGFjZUFsbCh0aGlzLnJlcGxhY2VJbnB1dC52YWx1ZSk7XG4gICAgfVxuXG4gICAgaGlkZSgpIHtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXRTZWFyY2hSYW5nZShudWxsKTtcbiAgICAgICAgdGhpcy5lZGl0b3Iub2ZmKFwiY2hhbmdlU2Vzc2lvblwiLCB0aGlzLnNldFNlc3Npb24pO1xuXG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuZWRpdG9yLmtleUJpbmRpbmcucmVtb3ZlS2V5Ym9hcmRIYW5kbGVyKHRoaXMuJGNsb3NlU2VhcmNoQmFyS2IpO1xuICAgICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzUmVwbGFjZV1cbiAgICAgKi9cbiAgICBzaG93KHZhbHVlLCBpc1JlcGxhY2UpIHtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmVkaXRvci5vbihcImNoYW5nZVNlc3Npb25cIiwgdGhpcy5zZXRTZXNzaW9uKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgICB0aGlzLnJlcGxhY2VPcHRpb24uY2hlY2tlZCA9IGlzUmVwbGFjZTtcblxuICAgICAgICBpZiAodmFsdWUpXG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0LnZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5mb2N1cygpO1xuICAgICAgICB0aGlzLnNlYXJjaElucHV0LnNlbGVjdCgpO1xuXG4gICAgICAgIHRoaXMuZWRpdG9yLmtleUJpbmRpbmcuYWRkS2V5Ym9hcmRIYW5kbGVyKHRoaXMuJGNsb3NlU2VhcmNoQmFyS2IpO1xuXG4gICAgICAgIHRoaXMuJHN5bmNPcHRpb25zKHRydWUpO1xuICAgIH1cblxuICAgIGlzRm9jdXNlZCgpIHtcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgcmV0dXJuIGVsID09IHRoaXMuc2VhcmNoSW5wdXQgfHwgZWwgPT0gdGhpcy5yZXBsYWNlSW5wdXQ7XG4gICAgfVxufVxuXG4vL2tleWJpbmRpbmcgb3V0c2lkZSBvZiB0aGUgc2VhcmNoYm94XG52YXIgJHNlYXJjaEJhcktiID0gbmV3IEhhc2hIYW5kbGVyKCk7XG4kc2VhcmNoQmFyS2IuYmluZEtleXMoe1xuICAgIFwiQ3RybC1mfENvbW1hbmQtZlwiOiBmdW5jdGlvbihzYikge1xuICAgICAgICB2YXIgaXNSZXBsYWNlID0gc2IuaXNSZXBsYWNlID0gIXNiLmlzUmVwbGFjZTtcbiAgICAgICAgc2IucmVwbGFjZUJveC5zdHlsZS5kaXNwbGF5ID0gaXNSZXBsYWNlID8gXCJcIiA6IFwibm9uZVwiO1xuICAgICAgICBzYi5yZXBsYWNlT3B0aW9uLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgc2IuJHN5bmNPcHRpb25zKCk7XG4gICAgICAgIHNiLnNlYXJjaElucHV0LmZvY3VzKCk7XG4gICAgfSxcbiAgICBcIkN0cmwtSHxDb21tYW5kLU9wdGlvbi1GXCI6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIGlmIChzYi5lZGl0b3IuZ2V0UmVhZE9ubHkoKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgc2IucmVwbGFjZU9wdGlvbi5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgc2IuJHN5bmNPcHRpb25zKCk7XG4gICAgICAgIHNiLnJlcGxhY2VJbnB1dC5mb2N1cygpO1xuICAgIH0sXG4gICAgXCJDdHJsLUd8Q29tbWFuZC1HXCI6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIHNiLmZpbmROZXh0KCk7XG4gICAgfSxcbiAgICBcIkN0cmwtU2hpZnQtR3xDb21tYW5kLVNoaWZ0LUdcIjogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgc2IuZmluZFByZXYoKTtcbiAgICB9LFxuICAgIFwiZXNjXCI6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHNiLmhpZGUoKTt9KTtcbiAgICB9LFxuICAgIFwiUmV0dXJuXCI6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIGlmIChzYi5hY3RpdmVJbnB1dCA9PSBzYi5yZXBsYWNlSW5wdXQpXG4gICAgICAgICAgICBzYi5yZXBsYWNlKCk7XG4gICAgICAgIHNiLmZpbmROZXh0KCk7XG4gICAgfSxcbiAgICBcIlNoaWZ0LVJldHVyblwiOiBmdW5jdGlvbihzYikge1xuICAgICAgICBpZiAoc2IuYWN0aXZlSW5wdXQgPT0gc2IucmVwbGFjZUlucHV0KVxuICAgICAgICAgICAgc2IucmVwbGFjZSgpO1xuICAgICAgICBzYi5maW5kUHJldigpO1xuICAgIH0sXG4gICAgXCJBbHQtUmV0dXJuXCI6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIGlmIChzYi5hY3RpdmVJbnB1dCA9PSBzYi5yZXBsYWNlSW5wdXQpXG4gICAgICAgICAgICBzYi5yZXBsYWNlQWxsKCk7XG4gICAgICAgIHNiLmZpbmRBbGwoKTtcbiAgICB9LFxuICAgIFwiVGFiXCI6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIChzYi5hY3RpdmVJbnB1dCA9PSBzYi5yZXBsYWNlSW5wdXQgPyBzYi5zZWFyY2hJbnB1dCA6IHNiLnJlcGxhY2VJbnB1dCkuZm9jdXMoKTtcbiAgICB9XG59KTtcblxuJHNlYXJjaEJhcktiLmFkZENvbW1hbmRzKFt7XG4gICAgbmFtZTogXCJ0b2dnbGVSZWdleHBNb2RlXCIsXG4gICAgYmluZEtleToge3dpbjogXCJBbHQtUnxBbHQtL1wiLCBtYWM6IFwiQ3RybC1BbHQtUnxDdHJsLUFsdC0vXCJ9LFxuICAgIGV4ZWM6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIHNiLnJlZ0V4cE9wdGlvbi5jaGVja2VkID0gIXNiLnJlZ0V4cE9wdGlvbi5jaGVja2VkO1xuICAgICAgICBzYi4kc3luY09wdGlvbnMoKTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogXCJ0b2dnbGVDYXNlU2Vuc2l0aXZlXCIsXG4gICAgYmluZEtleToge3dpbjogXCJBbHQtQ3xBbHQtSVwiLCBtYWM6IFwiQ3RybC1BbHQtUnxDdHJsLUFsdC1JXCJ9LFxuICAgIGV4ZWM6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIHNiLmNhc2VTZW5zaXRpdmVPcHRpb24uY2hlY2tlZCA9ICFzYi5jYXNlU2Vuc2l0aXZlT3B0aW9uLmNoZWNrZWQ7XG4gICAgICAgIHNiLiRzeW5jT3B0aW9ucygpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcInRvZ2dsZVdob2xlV29yZHNcIixcbiAgICBiaW5kS2V5OiB7d2luOiBcIkFsdC1CfEFsdC1XXCIsIG1hYzogXCJDdHJsLUFsdC1CfEN0cmwtQWx0LVdcIn0sXG4gICAgZXhlYzogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgc2Iud2hvbGVXb3JkT3B0aW9uLmNoZWNrZWQgPSAhc2Iud2hvbGVXb3JkT3B0aW9uLmNoZWNrZWQ7XG4gICAgICAgIHNiLiRzeW5jT3B0aW9ucygpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcInRvZ2dsZVJlcGxhY2VcIixcbiAgICBleGVjOiBmdW5jdGlvbihzYikge1xuICAgICAgICBzYi5yZXBsYWNlT3B0aW9uLmNoZWNrZWQgPSAhc2IucmVwbGFjZU9wdGlvbi5jaGVja2VkO1xuICAgICAgICBzYi4kc3luY09wdGlvbnMoKTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogXCJzZWFyY2hJblNlbGVjdGlvblwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIHNiLnNlYXJjaE9wdGlvbi5jaGVja2VkID0gIXNiLnNlYXJjaFJhbmdlO1xuICAgICAgICBzYi5zZXRTZWFyY2hSYW5nZShzYi5zZWFyY2hPcHRpb24uY2hlY2tlZCAmJiBzYi5lZGl0b3IuZ2V0U2VsZWN0aW9uUmFuZ2UoKSk7XG4gICAgICAgIHNiLiRzeW5jT3B0aW9ucygpO1xuICAgIH1cbn1dKTtcblxuLy9rZXliaW5kaW5nIG91dHNpZGUgb2YgdGhlIHNlYXJjaGJveFxudmFyICRjbG9zZVNlYXJjaEJhcktiID0gbmV3IEhhc2hIYW5kbGVyKFt7XG4gICAgYmluZEtleTogXCJFc2NcIixcbiAgICBuYW1lOiBcImNsb3NlU2VhcmNoQmFyXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5zZWFyY2hCb3guaGlkZSgpO1xuICAgIH1cbn1dKTtcblxuU2VhcmNoQm94LnByb3RvdHlwZS4kc2VhcmNoQmFyS2IgPSAkc2VhcmNoQmFyS2I7XG5TZWFyY2hCb3gucHJvdG90eXBlLiRjbG9zZVNlYXJjaEJhcktiID0gJGNsb3NlU2VhcmNoQmFyS2I7XG5cbmV4cG9ydHMuU2VhcmNoQm94ID0gU2VhcmNoQm94O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1JlcGxhY2VdXG4gKi9cbmV4cG9ydHMuU2VhcmNoID0gZnVuY3Rpb24oZWRpdG9yLCBpc1JlcGxhY2UpIHtcbiAgICB2YXIgc2IgPSBlZGl0b3Iuc2VhcmNoQm94IHx8IG5ldyBTZWFyY2hCb3goZWRpdG9yKTtcbiAgICBzYi5zaG93KGVkaXRvci5zZXNzaW9uLmdldFRleHRSYW5nZSgpLCBpc1JlcGxhY2UpO1xufTtcblxuXG4vKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAqIFRPRE9cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLypcbi0gbW92ZSBzZWFyY2ggZm9ybSB0byB0aGUgbGVmdCBpZiBpdCBtYXNrcyBjdXJyZW50IHdvcmRcbi0gaW5jbHVkZSBhbGwgb3B0aW9ucyB0aGF0IHNlYXJjaCBoYXMuIGV4OiByZWdleFxuLSBzZWFyY2hib3guc2VhcmNoYm94IGlzIG5vdCB0aGF0IHByZXR0eS4gV2Ugc2hvdWxkIGhhdmUganVzdCBzZWFyY2hib3hcbi0gZGlzYWJsZSBwcmV2IGJ1dHRvbiBpZiBpdCBtYWtlcyBzZW5zZVxuKi9cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==