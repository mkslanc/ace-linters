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
     * @param {undefined} [range]
     * @param {undefined} [showReplaceForm]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LGlEQUFpRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUEsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsU0FBUztBQUNwQjtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9zZWFyY2hib3gtY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9zZWFyY2hib3guanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBgXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRWRpdG9yIFNlYXJjaCBGb3JtXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi5hY2Vfc2VhcmNoIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO1xuICAgIGNvbG9yOiAjNjY2O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjYmNiY2I7XG4gICAgYm9yZGVyLXRvcDogMCBub25lO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDRweCA2cHggMCA0cHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICB6LWluZGV4OiA5OTtcbiAgICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xufVxuLmFjZV9zZWFyY2gubGVmdCB7XG4gICAgYm9yZGVyLWxlZnQ6IDAgbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiAwcHggMHB4IDVweCAwcHg7XG4gICAgbGVmdDogMDtcbn1cbi5hY2Vfc2VhcmNoLnJpZ2h0IHtcbiAgICBib3JkZXItcmFkaXVzOiAwcHggMHB4IDBweCA1cHg7XG4gICAgYm9yZGVyLXJpZ2h0OiAwIG5vbmU7XG4gICAgcmlnaHQ6IDA7XG59XG5cbi5hY2Vfc2VhcmNoX2Zvcm0sIC5hY2VfcmVwbGFjZV9mb3JtIHtcbiAgICBtYXJnaW46IDAgMjBweCA0cHggMDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjk7XG59XG4uYWNlX3JlcGxhY2VfZm9ybSB7XG4gICAgbWFyZ2luLXJpZ2h0OiAwO1xufVxuLmFjZV9zZWFyY2hfZm9ybS5hY2Vfbm9tYXRjaCB7XG4gICAgb3V0bGluZTogMXB4IHNvbGlkIHJlZDtcbn1cblxuLmFjZV9zZWFyY2hfZmllbGQge1xuICAgIGJvcmRlci1yYWRpdXM6IDNweCAwIDAgM3B4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIGNvbG9yOiBibGFjaztcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2JjYmNiO1xuICAgIGJvcmRlci1yaWdodDogMCBub25lO1xuICAgIG91dGxpbmU6IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICBmb250LXNpemU6IGluaGVyaXQ7XG4gICAgbWFyZ2luOiAwO1xuICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xuICAgIHBhZGRpbmc6IDAgNnB4O1xuICAgIG1pbi13aWR0aDogMTdlbTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIG1pbi1oZWlnaHQ6IDEuOGVtO1xuICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xufVxuLmFjZV9zZWFyY2hidG4ge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjYmNiY2I7XG4gICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHBhZGRpbmc6IDAgNnB4O1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgYm9yZGVyLXJpZ2h0OiAwIG5vbmU7XG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjZGNkY2RjO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBtYXJnaW46IDA7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGNvbG9yOiAjNjY2O1xufVxuLmFjZV9zZWFyY2hidG46bGFzdC1jaGlsZCB7XG4gICAgYm9yZGVyLXJhZGl1czogMCAzcHggM3B4IDA7XG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2NiY2JjYjtcbn1cbi5hY2Vfc2VhcmNoYnRuOmRpc2FibGVkIHtcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbn1cbi5hY2Vfc2VhcmNoYnRuOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVmMWY2O1xufVxuLmFjZV9zZWFyY2hidG4ucHJldiwgLmFjZV9zZWFyY2hidG4ubmV4dCB7XG4gICAgIHBhZGRpbmc6IDBweCAwLjdlbVxufVxuLmFjZV9zZWFyY2hidG4ucHJldjphZnRlciwgLmFjZV9zZWFyY2hidG4ubmV4dDphZnRlciB7XG4gICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgIGJvcmRlcjogc29saWQgMnB4ICM4ODg7XG4gICAgIHdpZHRoOiAwLjVlbTtcbiAgICAgaGVpZ2h0OiAwLjVlbTtcbiAgICAgYm9yZGVyLXdpZHRoOiAgMnB4IDAgMCAycHg7XG4gICAgIGRpc3BsYXk6aW5saW5lLWJsb2NrO1xuICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xufVxuLmFjZV9zZWFyY2hidG4ubmV4dDphZnRlciB7XG4gICAgIGJvcmRlci13aWR0aDogMCAycHggMnB4IDAgO1xufVxuLmFjZV9zZWFyY2hidG5fY2xvc2Uge1xuICAgIGJhY2tncm91bmQ6IHVybChkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUE0QUFBQWNDQVlBQUFCUlZvNUJBQUFBWjBsRVFWUjQydTJTVVFyQU1BaER2YXpuOE9qWkJpbENrWVZWeGlpczhINENUMFZyQUpiNFdIVDNDNXhVMmEySVFaWEpqaVFJUk1ka0VvSjVRMnlNcXBmRElvK1hZNGs2aCtZWE95S3FUSWo1UkVheGxvTkFkMHhpS21BdHNUSHFXOHNSMlc1ZjdnQ3U1bldGVXBWalp3QUFBQUJKUlU1RXJrSmdnZz09KSBuby1yZXBlYXQgNTAlIDA7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJvcmRlcjogMCBub25lO1xuICAgIGNvbG9yOiAjNjU2NTY1O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmb250OiAxNnB4LzE2cHggQXJpYWw7XG4gICAgcGFkZGluZzogMDtcbiAgICBoZWlnaHQ6IDE0cHg7XG4gICAgd2lkdGg6IDE0cHg7XG4gICAgdG9wOiA5cHg7XG4gICAgcmlnaHQ6IDdweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG4uYWNlX3NlYXJjaGJ0bl9jbG9zZTpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzY1NjU2NTtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA1MCUgMTAwJTtcbiAgICBjb2xvcjogd2hpdGU7XG59XG5cbi5hY2VfYnV0dG9uIHtcbiAgICBtYXJnaW4tbGVmdDogMnB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW8tdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgb3BhY2l0eTogMC43O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMTAwLDEwMCwxMDAsMC4yMyk7XG4gICAgcGFkZGluZzogMXB4O1xuICAgIGJveC1zaXppbmc6ICAgIGJvcmRlci1ib3ghaW1wb3J0YW50O1xuICAgIGNvbG9yOiBibGFjaztcbn1cblxuLmFjZV9idXR0b246aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gICAgb3BhY2l0eToxO1xufVxuLmFjZV9idXR0b246YWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO1xufVxuXG4uYWNlX2J1dHRvbi5jaGVja2VkIHtcbiAgICBib3JkZXItY29sb3I6ICMzMzk5ZmY7XG4gICAgb3BhY2l0eToxO1xufVxuXG4uYWNlX3NlYXJjaF9vcHRpb25ze1xuICAgIG1hcmdpbi1ib3R0b206IDNweDtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW8tdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIGNsZWFyOiBib3RoO1xufVxuXG4uYWNlX3NlYXJjaF9jb3VudGVyIHtcbiAgICBmbG9hdDogbGVmdDtcbiAgICBmb250LWZhbWlseTogYXJpYWw7XG4gICAgcGFkZGluZzogMCA4cHg7XG59YDtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vZWRpdG9yXCIpLkVkaXRvcn0gRWRpdG9yXG4gKi9cbnZhciBkb20gPSByZXF1aXJlKFwiLi4vbGliL2RvbVwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIGV2ZW50ID0gcmVxdWlyZShcIi4uL2xpYi9ldmVudFwiKTtcbnZhciBzZWFyY2hib3hDc3MgPSByZXF1aXJlKFwiLi9zZWFyY2hib3gtY3NzXCIpO1xudmFyIEhhc2hIYW5kbGVyID0gcmVxdWlyZShcIi4uL2tleWJvYXJkL2hhc2hfaGFuZGxlclwiKS5IYXNoSGFuZGxlcjtcbnZhciBrZXlVdGlsID0gcmVxdWlyZShcIi4uL2xpYi9rZXlzXCIpO1xudmFyIG5scyA9IHJlcXVpcmUoXCIuLi9jb25maWdcIikubmxzO1xuXG52YXIgTUFYX0NPVU5UID0gOTk5O1xuXG5kb20uaW1wb3J0Q3NzU3RyaW5nKHNlYXJjaGJveENzcywgXCJhY2Vfc2VhcmNoYm94XCIsIGZhbHNlKTtcblxuY2xhc3MgU2VhcmNoQm94IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICogQHBhcmFtIHt1bmRlZmluZWR9IFtyYW5nZV1cbiAgICAgKiBAcGFyYW0ge3VuZGVmaW5lZH0gW3Nob3dSZXBsYWNlRm9ybV1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihlZGl0b3IsIHJhbmdlLCBzaG93UmVwbGFjZUZvcm0pIHtcbiAgICAgICAgLyoqQHR5cGUge2FueX0qL1xuICAgICAgICB0aGlzLmFjdGl2ZUlucHV0O1xuICAgICAgICB2YXIgZGl2ID0gZG9tLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGRvbS5idWlsZERvbShbXCJkaXZcIiwge2NsYXNzOlwiYWNlX3NlYXJjaCByaWdodFwifSxcbiAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJoaWRlXCIsIGNsYXNzOiBcImFjZV9zZWFyY2hidG5fY2xvc2VcIn1dLFxuICAgICAgICAgICAgW1wiZGl2XCIsIHtjbGFzczogXCJhY2Vfc2VhcmNoX2Zvcm1cIn0sXG4gICAgICAgICAgICAgICAgW1wiaW5wdXRcIiwge2NsYXNzOiBcImFjZV9zZWFyY2hfZmllbGRcIiwgcGxhY2Vob2xkZXI6IG5scyhcInNlYXJjaC1ib3guZmluZC5wbGFjZWhvbGRlclwiLCBcIlNlYXJjaCBmb3JcIiksIHNwZWxsY2hlY2s6IFwiZmFsc2VcIn1dLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJmaW5kUHJldlwiLCBjbGFzczogXCJhY2Vfc2VhcmNoYnRuIHByZXZcIn0sIFwiXFx1MjAwYlwiXSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwiZmluZE5leHRcIiwgY2xhc3M6IFwiYWNlX3NlYXJjaGJ0biBuZXh0XCJ9LCBcIlxcdTIwMGJcIl0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcImZpbmRBbGxcIiwgY2xhc3M6IFwiYWNlX3NlYXJjaGJ0blwiLCB0aXRsZTogXCJBbHQtRW50ZXJcIn0sIG5scyhcInNlYXJjaC1ib3guZmluZC1hbGwudGV4dFwiLCBcIkFsbFwiKV1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXCJkaXZcIiwge2NsYXNzOiBcImFjZV9yZXBsYWNlX2Zvcm1cIn0sXG4gICAgICAgICAgICAgICAgW1wiaW5wdXRcIiwge2NsYXNzOiBcImFjZV9zZWFyY2hfZmllbGRcIiwgcGxhY2Vob2xkZXI6IG5scyhcInNlYXJjaC1ib3gucmVwbGFjZS5wbGFjZWhvbGRlclwiLCBcIlJlcGxhY2Ugd2l0aFwiKSwgc3BlbGxjaGVjazogXCJmYWxzZVwifV0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcInJlcGxhY2VBbmRGaW5kTmV4dFwiLCBjbGFzczogXCJhY2Vfc2VhcmNoYnRuXCJ9LCBubHMoXCJzZWFyY2gtYm94LnJlcGxhY2UtbmV4dC50ZXh0XCIsIFwiUmVwbGFjZVwiKV0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcInJlcGxhY2VBbGxcIiwgY2xhc3M6IFwiYWNlX3NlYXJjaGJ0blwifSwgbmxzKFwic2VhcmNoLWJveC5yZXBsYWNlLWFsbC50ZXh0XCIsIFwiQWxsXCIpXVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcImRpdlwiLCB7Y2xhc3M6IFwiYWNlX3NlYXJjaF9vcHRpb25zXCJ9LFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJ0b2dnbGVSZXBsYWNlXCIsIGNsYXNzOiBcImFjZV9idXR0b25cIiwgdGl0bGU6IG5scyhcInNlYXJjaC1ib3gudG9nZ2xlLXJlcGxhY2UudGl0bGVcIiwgXCJUb2dnbGUgUmVwbGFjZSBtb2RlXCIpLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogXCJmbG9hdDpsZWZ0O21hcmdpbi10b3A6LTJweDtwYWRkaW5nOjAgNXB4O1wifSwgXCIrXCJdLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2NsYXNzOiBcImFjZV9zZWFyY2hfY291bnRlclwifV0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcInRvZ2dsZVJlZ2V4cE1vZGVcIiwgY2xhc3M6IFwiYWNlX2J1dHRvblwiLCB0aXRsZTogbmxzKFwic2VhcmNoLWJveC50b2dnbGUtcmVnZXhwLnRpdGxlXCIsIFwiUmVnRXhwIFNlYXJjaFwiKX0sIFwiLipcIl0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcInRvZ2dsZUNhc2VTZW5zaXRpdmVcIiwgY2xhc3M6IFwiYWNlX2J1dHRvblwiLCB0aXRsZTogbmxzKFwic2VhcmNoLWJveC50b2dnbGUtY2FzZS50aXRsZVwiLCBcIkNhc2VTZW5zaXRpdmUgU2VhcmNoXCIpfSwgXCJBYVwiXSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwidG9nZ2xlV2hvbGVXb3Jkc1wiLCBjbGFzczogXCJhY2VfYnV0dG9uXCIsIHRpdGxlOiBubHMoXCJzZWFyY2gtYm94LnRvZ2dsZS13aG9sZS13b3JkLnRpdGxlXCIsIFwiV2hvbGUgV29yZCBTZWFyY2hcIil9LCBcIlxcXFxiXCJdLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJzZWFyY2hJblNlbGVjdGlvblwiLCBjbGFzczogXCJhY2VfYnV0dG9uXCIsIHRpdGxlOiBubHMoXCJzZWFyY2gtYm94LnRvZ2dsZS1pbi1zZWxlY3Rpb24udGl0bGVcIiwgXCJTZWFyY2ggSW4gU2VsZWN0aW9uXCIpfSwgXCJTXCJdXG4gICAgICAgICAgICBdXG4gICAgICAgIF0sIGRpdik7XG4gICAgICAgIC8qKkB0eXBlIHthbnl9Ki9cbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZGl2LmZpcnN0Q2hpbGQ7XG5cbiAgICAgICAgdGhpcy5zZXRTZXNzaW9uID0gdGhpcy5zZXRTZXNzaW9uLmJpbmQodGhpcyk7XG5cbiAgICAgICAgdGhpcy4kaW5pdCgpO1xuICAgICAgICB0aGlzLnNldEVkaXRvcihlZGl0b3IpO1xuICAgICAgICBkb20uaW1wb3J0Q3NzU3RyaW5nKHNlYXJjaGJveENzcywgXCJhY2Vfc2VhcmNoYm94XCIsIGVkaXRvci5jb250YWluZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAgICAgKi9cbiAgICBzZXRFZGl0b3IoZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5zZWFyY2hCb3ggPSB0aGlzO1xuICAgICAgICBlZGl0b3IucmVuZGVyZXIuc2Nyb2xsZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbiAgICAgICAgLyoqQHR5cGUge0VkaXRvcn0qL1xuICAgICAgICB0aGlzLmVkaXRvciA9IGVkaXRvcjtcbiAgICB9XG4gICAgXG4gICAgc2V0U2Vzc2lvbihlKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoUmFuZ2UgPSBudWxsO1xuICAgICAgICB0aGlzLiRzeW5jT3B0aW9ucyh0cnVlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBzYlxuICAgICAqL1xuICAgICRpbml0RWxlbWVudHMoc2IpIHtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxFbGVtZW50fSovXG4gICAgICAgIHRoaXMuc2VhcmNoQm94ID0gc2IucXVlcnlTZWxlY3RvcihcIi5hY2Vfc2VhcmNoX2Zvcm1cIik7XG4gICAgICAgIC8qKkB0eXBlIHtIVE1MRWxlbWVudH0qL1xuICAgICAgICB0aGlzLnJlcGxhY2VCb3ggPSBzYi5xdWVyeVNlbGVjdG9yKFwiLmFjZV9yZXBsYWNlX2Zvcm1cIik7XG4gICAgICAgIC8qKkB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSovXG4gICAgICAgIHRoaXMuc2VhcmNoT3B0aW9uID0gc2IucXVlcnlTZWxlY3RvcihcIlthY3Rpb249c2VhcmNoSW5TZWxlY3Rpb25dXCIpO1xuICAgICAgICAvKipAdHlwZSB7SFRNTElucHV0RWxlbWVudH0qL1xuICAgICAgICB0aGlzLnJlcGxhY2VPcHRpb24gPSBzYi5xdWVyeVNlbGVjdG9yKFwiW2FjdGlvbj10b2dnbGVSZXBsYWNlXVwiKTtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy5yZWdFeHBPcHRpb24gPSBzYi5xdWVyeVNlbGVjdG9yKFwiW2FjdGlvbj10b2dnbGVSZWdleHBNb2RlXVwiKTtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy5jYXNlU2Vuc2l0aXZlT3B0aW9uID0gc2IucXVlcnlTZWxlY3RvcihcIlthY3Rpb249dG9nZ2xlQ2FzZVNlbnNpdGl2ZV1cIik7XG4gICAgICAgIC8qKkB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSovXG4gICAgICAgIHRoaXMud2hvbGVXb3JkT3B0aW9uID0gc2IucXVlcnlTZWxlY3RvcihcIlthY3Rpb249dG9nZ2xlV2hvbGVXb3Jkc11cIik7XG4gICAgICAgIC8qKkB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSovXG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXQgPSB0aGlzLnNlYXJjaEJveC5xdWVyeVNlbGVjdG9yKFwiLmFjZV9zZWFyY2hfZmllbGRcIik7XG4gICAgICAgIC8qKkB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSovXG4gICAgICAgIHRoaXMucmVwbGFjZUlucHV0ID0gdGhpcy5yZXBsYWNlQm94LnF1ZXJ5U2VsZWN0b3IoXCIuYWNlX3NlYXJjaF9maWVsZFwiKTtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxFbGVtZW50fSovXG4gICAgICAgIHRoaXMuc2VhcmNoQ291bnRlciA9IHNiLnF1ZXJ5U2VsZWN0b3IoXCIuYWNlX3NlYXJjaF9jb3VudGVyXCIpO1xuICAgIH1cbiAgICBcbiAgICAkaW5pdCgpIHtcbiAgICAgICAgdmFyIHNiID0gdGhpcy5lbGVtZW50O1xuICAgICAgICBcbiAgICAgICAgdGhpcy4kaW5pdEVsZW1lbnRzKHNiKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGV2ZW50LmFkZExpc3RlbmVyKHNiLCBcIm1vdXNlZG93blwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgX3RoaXMuYWN0aXZlSW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgZXZlbnQuYWRkTGlzdGVuZXIoc2IsIFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIHQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gdC5nZXRBdHRyaWJ1dGUoXCJhY3Rpb25cIik7XG4gICAgICAgICAgICBpZiAoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pXG4gICAgICAgICAgICAgICAgX3RoaXNbYWN0aW9uXSgpO1xuICAgICAgICAgICAgZWxzZSBpZiAoX3RoaXMuJHNlYXJjaEJhcktiLmNvbW1hbmRzW2FjdGlvbl0pXG4gICAgICAgICAgICAgICAgX3RoaXMuJHNlYXJjaEJhcktiLmNvbW1hbmRzW2FjdGlvbl0uZXhlYyhfdGhpcyk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV2ZW50LmFkZENvbW1hbmRLZXlMaXN0ZW5lcihzYiwgZnVuY3Rpb24oZSwgaGFzaElkLCBrZXlDb2RlKSB7XG4gICAgICAgICAgICB2YXIga2V5U3RyaW5nID0ga2V5VXRpbC5rZXlDb2RlVG9TdHJpbmcoa2V5Q29kZSk7XG4gICAgICAgICAgICB2YXIgY29tbWFuZCA9IF90aGlzLiRzZWFyY2hCYXJLYi5maW5kS2V5Q29tbWFuZChoYXNoSWQsIGtleVN0cmluZyk7XG4gICAgICAgICAgICBpZiAoY29tbWFuZCAmJiBjb21tYW5kLmV4ZWMpIHtcbiAgICAgICAgICAgICAgICBjb21tYW5kLmV4ZWMoX3RoaXMpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BFdmVudChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy4kb25DaGFuZ2UgPSBsYW5nLmRlbGF5ZWRDYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMuZmluZChmYWxzZSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBldmVudC5hZGRMaXN0ZW5lcih0aGlzLnNlYXJjaElucHV0LCBcImlucHV0XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMuJG9uQ2hhbmdlLnNjaGVkdWxlKDIwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGV2ZW50LmFkZExpc3RlbmVyKHRoaXMuc2VhcmNoSW5wdXQsIFwiZm9jdXNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy5hY3RpdmVJbnB1dCA9IF90aGlzLnNlYXJjaElucHV0O1xuICAgICAgICAgICAgX3RoaXMuc2VhcmNoSW5wdXQudmFsdWUgJiYgX3RoaXMuaGlnaGxpZ2h0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBldmVudC5hZGRMaXN0ZW5lcih0aGlzLnJlcGxhY2VJbnB1dCwgXCJmb2N1c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF90aGlzLmFjdGl2ZUlucHV0ID0gX3RoaXMucmVwbGFjZUlucHV0O1xuICAgICAgICAgICAgX3RoaXMuc2VhcmNoSW5wdXQudmFsdWUgJiYgX3RoaXMuaGlnaGxpZ2h0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNldFNlYXJjaFJhbmdlKHJhbmdlKSB7XG4gICAgICAgIHRoaXMuc2VhcmNoUmFuZ2UgPSByYW5nZTtcbiAgICAgICAgaWYgKHJhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFJhbmdlTWFya2VyID0gdGhpcy5lZGl0b3Iuc2Vzc2lvbi5hZGRNYXJrZXIocmFuZ2UsIFwiYWNlX2FjdGl2ZS1saW5lXCIpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VhcmNoUmFuZ2VNYXJrZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNlc3Npb24ucmVtb3ZlTWFya2VyKHRoaXMuc2VhcmNoUmFuZ2VNYXJrZXIpO1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hSYW5nZU1hcmtlciA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtwcmV2ZW50U2Nyb2xsXVxuICAgICAqL1xuICAgICRzeW5jT3B0aW9ucyhwcmV2ZW50U2Nyb2xsKSB7XG4gICAgICAgIGRvbS5zZXRDc3NDbGFzcyh0aGlzLnJlcGxhY2VPcHRpb24sIFwiY2hlY2tlZFwiLCB0aGlzLnNlYXJjaFJhbmdlKTtcbiAgICAgICAgZG9tLnNldENzc0NsYXNzKHRoaXMuc2VhcmNoT3B0aW9uLCBcImNoZWNrZWRcIiwgdGhpcy5zZWFyY2hPcHRpb24uY2hlY2tlZCk7XG4gICAgICAgIHRoaXMucmVwbGFjZU9wdGlvbi50ZXh0Q29udGVudCA9IHRoaXMucmVwbGFjZU9wdGlvbi5jaGVja2VkID8gXCItXCIgOiBcIitcIjtcbiAgICAgICAgZG9tLnNldENzc0NsYXNzKHRoaXMucmVnRXhwT3B0aW9uLCBcImNoZWNrZWRcIiwgdGhpcy5yZWdFeHBPcHRpb24uY2hlY2tlZCk7XG4gICAgICAgIGRvbS5zZXRDc3NDbGFzcyh0aGlzLndob2xlV29yZE9wdGlvbiwgXCJjaGVja2VkXCIsIHRoaXMud2hvbGVXb3JkT3B0aW9uLmNoZWNrZWQpO1xuICAgICAgICBkb20uc2V0Q3NzQ2xhc3ModGhpcy5jYXNlU2Vuc2l0aXZlT3B0aW9uLCBcImNoZWNrZWRcIiwgdGhpcy5jYXNlU2Vuc2l0aXZlT3B0aW9uLmNoZWNrZWQpO1xuICAgICAgICB2YXIgcmVhZE9ubHkgPSB0aGlzLmVkaXRvci5nZXRSZWFkT25seSgpO1xuICAgICAgICB0aGlzLnJlcGxhY2VPcHRpb24uc3R5bGUuZGlzcGxheSA9IHJlYWRPbmx5ID8gXCJub25lXCIgOiBcIlwiO1xuICAgICAgICB0aGlzLnJlcGxhY2VCb3guc3R5bGUuZGlzcGxheSA9IHRoaXMucmVwbGFjZU9wdGlvbi5jaGVja2VkICYmICFyZWFkT25seSA/IFwiXCIgOiBcIm5vbmVcIjtcbiAgICAgICAgdGhpcy5maW5kKGZhbHNlLCBmYWxzZSwgcHJldmVudFNjcm9sbCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtSZWdFeHB9IFtyZV1cbiAgICAgKi9cbiAgICBoaWdobGlnaHQocmUpIHtcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2Vzc2lvbi5oaWdobGlnaHQocmUgfHwgdGhpcy5lZGl0b3IuJHNlYXJjaC4kb3B0aW9ucy5yZSk7XG4gICAgICAgIHRoaXMuZWRpdG9yLnJlbmRlcmVyLnVwZGF0ZUJhY2tNYXJrZXJzKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtib29sZWFufSBza2lwQ3VycmVudFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gYmFja3dhcmRzXG4gICAgICogQHBhcmFtIHthbnl9IFtwcmV2ZW50U2Nyb2xsXVxuICAgICAqL1xuICAgIGZpbmQoc2tpcEN1cnJlbnQsIGJhY2t3YXJkcywgcHJldmVudFNjcm9sbCkge1xuICAgICAgICB2YXIgcmFuZ2UgPSB0aGlzLmVkaXRvci5maW5kKHRoaXMuc2VhcmNoSW5wdXQudmFsdWUsIHtcbiAgICAgICAgICAgIHNraXBDdXJyZW50OiBza2lwQ3VycmVudCxcbiAgICAgICAgICAgIGJhY2t3YXJkczogYmFja3dhcmRzLFxuICAgICAgICAgICAgd3JhcDogdHJ1ZSxcbiAgICAgICAgICAgIHJlZ0V4cDogdGhpcy5yZWdFeHBPcHRpb24uY2hlY2tlZCxcbiAgICAgICAgICAgIGNhc2VTZW5zaXRpdmU6IHRoaXMuY2FzZVNlbnNpdGl2ZU9wdGlvbi5jaGVja2VkLFxuICAgICAgICAgICAgd2hvbGVXb3JkOiB0aGlzLndob2xlV29yZE9wdGlvbi5jaGVja2VkLFxuICAgICAgICAgICAgcHJldmVudFNjcm9sbDogcHJldmVudFNjcm9sbCxcbiAgICAgICAgICAgIHJhbmdlOiB0aGlzLnNlYXJjaFJhbmdlXG4gICAgICAgIH0pO1xuICAgICAgICAvKipAdHlwZSB7YW55fSovXG4gICAgICAgIHZhciBub01hdGNoID0gIXJhbmdlICYmIHRoaXMuc2VhcmNoSW5wdXQudmFsdWU7XG4gICAgICAgIGRvbS5zZXRDc3NDbGFzcyh0aGlzLnNlYXJjaEJveCwgXCJhY2Vfbm9tYXRjaFwiLCBub01hdGNoKTtcbiAgICAgICAgdGhpcy5lZGl0b3IuX2VtaXQoXCJmaW5kU2VhcmNoQm94XCIsIHsgbWF0Y2g6ICFub01hdGNoIH0pO1xuICAgICAgICB0aGlzLmhpZ2hsaWdodCgpO1xuICAgICAgICB0aGlzLnVwZGF0ZUNvdW50ZXIoKTtcbiAgICB9XG4gICAgdXBkYXRlQ291bnRlcigpIHtcbiAgICAgICAgdmFyIGVkaXRvciA9IHRoaXMuZWRpdG9yO1xuICAgICAgICB2YXIgcmVnZXggPSBlZGl0b3IuJHNlYXJjaC4kb3B0aW9ucy5yZTtcbiAgICAgICAgdmFyIHN1cHBvcnRzVW5pY29kZUZsYWcgPSByZWdleC51bmljb2RlO1xuICAgICAgICB2YXIgYWxsID0gMDtcbiAgICAgICAgdmFyIGJlZm9yZSA9IDA7XG4gICAgICAgIGlmIChyZWdleCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5zZWFyY2hSYW5nZVxuICAgICAgICAgICAgICAgID8gZWRpdG9yLnNlc3Npb24uZ2V0VGV4dFJhbmdlKHRoaXMuc2VhcmNoUmFuZ2UpXG4gICAgICAgICAgICAgICAgOiBlZGl0b3IuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIG9mZnNldCA9IGVkaXRvci5zZXNzaW9uLmRvYy5wb3NpdGlvblRvSW5kZXgoZWRpdG9yLnNlbGVjdGlvbi5hbmNob3IpO1xuICAgICAgICAgICAgaWYgKHRoaXMuc2VhcmNoUmFuZ2UpXG4gICAgICAgICAgICAgICAgb2Zmc2V0IC09IGVkaXRvci5zZXNzaW9uLmRvYy5wb3NpdGlvblRvSW5kZXgodGhpcy5zZWFyY2hSYW5nZS5zdGFydCk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgbGFzdCA9IHJlZ2V4Lmxhc3RJbmRleCA9IDA7XG4gICAgICAgICAgICB2YXIgbTtcbiAgICAgICAgICAgIHdoaWxlICgobSA9IHJlZ2V4LmV4ZWModmFsdWUpKSkge1xuICAgICAgICAgICAgICAgIGFsbCsrO1xuICAgICAgICAgICAgICAgIGxhc3QgPSBtLmluZGV4O1xuICAgICAgICAgICAgICAgIGlmIChsYXN0IDw9IG9mZnNldClcbiAgICAgICAgICAgICAgICAgICAgYmVmb3JlKys7XG4gICAgICAgICAgICAgICAgaWYgKGFsbCA+IE1BWF9DT1VOVClcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgaWYgKCFtWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZ2V4Lmxhc3RJbmRleCA9IGxhc3QgKz0gbGFuZy5za2lwRW1wdHlNYXRjaCh2YWx1ZSwgbGFzdCwgc3VwcG9ydHNVbmljb2RlRmxhZyk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsYXN0ID49IHZhbHVlLmxlbmd0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlYXJjaENvdW50ZXIudGV4dENvbnRlbnQgPSBubHMoXCJzZWFyY2gtYm94LnNlYXJjaC1jb3VudGVyXCIsIFwiJDAgb2YgJDFcIiwgW2JlZm9yZSAsIChhbGwgPiBNQVhfQ09VTlQgPyBNQVhfQ09VTlQgKyBcIitcIiA6IGFsbCldKTtcbiAgICB9XG4gICAgZmluZE5leHQoKSB7XG4gICAgICAgIHRoaXMuZmluZCh0cnVlLCBmYWxzZSk7XG4gICAgfVxuICAgIGZpbmRQcmV2KCkge1xuICAgICAgICB0aGlzLmZpbmQodHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGZpbmRBbGwoKXtcbiAgICAgICAgdmFyIHJhbmdlID0gdGhpcy5lZGl0b3IuZmluZEFsbCh0aGlzLnNlYXJjaElucHV0LnZhbHVlLCB7ICAgICAgICAgICAgXG4gICAgICAgICAgICByZWdFeHA6IHRoaXMucmVnRXhwT3B0aW9uLmNoZWNrZWQsXG4gICAgICAgICAgICBjYXNlU2Vuc2l0aXZlOiB0aGlzLmNhc2VTZW5zaXRpdmVPcHRpb24uY2hlY2tlZCxcbiAgICAgICAgICAgIHdob2xlV29yZDogdGhpcy53aG9sZVdvcmRPcHRpb24uY2hlY2tlZFxuICAgICAgICB9KTtcbiAgICAgICAgLyoqQHR5cGUge2FueX0qL1xuICAgICAgICB2YXIgbm9NYXRjaCA9ICFyYW5nZSAmJiB0aGlzLnNlYXJjaElucHV0LnZhbHVlO1xuICAgICAgICBkb20uc2V0Q3NzQ2xhc3ModGhpcy5zZWFyY2hCb3gsIFwiYWNlX25vbWF0Y2hcIiwgbm9NYXRjaCk7XG4gICAgICAgIHRoaXMuZWRpdG9yLl9lbWl0KFwiZmluZFNlYXJjaEJveFwiLCB7IG1hdGNoOiAhbm9NYXRjaCB9KTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHQoKTtcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgfVxuICAgIHJlcGxhY2UoKSB7XG4gICAgICAgIGlmICghdGhpcy5lZGl0b3IuZ2V0UmVhZE9ubHkoKSlcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnJlcGxhY2UodGhpcy5yZXBsYWNlSW5wdXQudmFsdWUpO1xuICAgIH0gICAgXG4gICAgcmVwbGFjZUFuZEZpbmROZXh0KCkge1xuICAgICAgICBpZiAoIXRoaXMuZWRpdG9yLmdldFJlYWRPbmx5KCkpIHtcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnJlcGxhY2UodGhpcy5yZXBsYWNlSW5wdXQudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5maW5kTmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlcGxhY2VBbGwoKSB7XG4gICAgICAgIGlmICghdGhpcy5lZGl0b3IuZ2V0UmVhZE9ubHkoKSlcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnJlcGxhY2VBbGwodGhpcy5yZXBsYWNlSW5wdXQudmFsdWUpO1xuICAgIH1cblxuICAgIGhpZGUoKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc2V0U2VhcmNoUmFuZ2UobnVsbCk7XG4gICAgICAgIHRoaXMuZWRpdG9yLm9mZihcImNoYW5nZVNlc3Npb25cIiwgdGhpcy5zZXRTZXNzaW9uKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHRoaXMuZWRpdG9yLmtleUJpbmRpbmcucmVtb3ZlS2V5Ym9hcmRIYW5kbGVyKHRoaXMuJGNsb3NlU2VhcmNoQmFyS2IpO1xuICAgICAgICB0aGlzLmVkaXRvci5mb2N1cygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzUmVwbGFjZV1cbiAgICAgKi9cbiAgICBzaG93KHZhbHVlLCBpc1JlcGxhY2UpIHtcbiAgICAgICAgdGhpcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB0aGlzLmVkaXRvci5vbihcImNoYW5nZVNlc3Npb25cIiwgdGhpcy5zZXRTZXNzaW9uKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgICB0aGlzLnJlcGxhY2VPcHRpb24uY2hlY2tlZCA9IGlzUmVwbGFjZTtcbiAgICAgICAgXG4gICAgICAgIGlmICh2YWx1ZSlcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoSW5wdXQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXQuZm9jdXMoKTtcbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dC5zZWxlY3QoKTtcblxuICAgICAgICB0aGlzLmVkaXRvci5rZXlCaW5kaW5nLmFkZEtleWJvYXJkSGFuZGxlcih0aGlzLiRjbG9zZVNlYXJjaEJhcktiKTtcbiAgICAgICAgXG4gICAgICAgIHRoaXMuJHN5bmNPcHRpb25zKHRydWUpO1xuICAgIH1cblxuICAgIGlzRm9jdXNlZCgpIHtcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgcmV0dXJuIGVsID09IHRoaXMuc2VhcmNoSW5wdXQgfHwgZWwgPT0gdGhpcy5yZXBsYWNlSW5wdXQ7XG4gICAgfVxufVxuXG4vL2tleWJpbmRpbmcgb3V0c2lkZSBvZiB0aGUgc2VhcmNoYm94XG52YXIgJHNlYXJjaEJhcktiID0gbmV3IEhhc2hIYW5kbGVyKCk7XG4kc2VhcmNoQmFyS2IuYmluZEtleXMoe1xuICAgIFwiQ3RybC1mfENvbW1hbmQtZlwiOiBmdW5jdGlvbihzYikge1xuICAgICAgICB2YXIgaXNSZXBsYWNlID0gc2IuaXNSZXBsYWNlID0gIXNiLmlzUmVwbGFjZTtcbiAgICAgICAgc2IucmVwbGFjZUJveC5zdHlsZS5kaXNwbGF5ID0gaXNSZXBsYWNlID8gXCJcIiA6IFwibm9uZVwiO1xuICAgICAgICBzYi5yZXBsYWNlT3B0aW9uLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgICAgc2IuJHN5bmNPcHRpb25zKCk7XG4gICAgICAgIHNiLnNlYXJjaElucHV0LmZvY3VzKCk7XG4gICAgfSxcbiAgICBcIkN0cmwtSHxDb21tYW5kLU9wdGlvbi1GXCI6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIGlmIChzYi5lZGl0b3IuZ2V0UmVhZE9ubHkoKSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgc2IucmVwbGFjZU9wdGlvbi5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgc2IuJHN5bmNPcHRpb25zKCk7XG4gICAgICAgIHNiLnJlcGxhY2VJbnB1dC5mb2N1cygpO1xuICAgIH0sXG4gICAgXCJDdHJsLUd8Q29tbWFuZC1HXCI6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIHNiLmZpbmROZXh0KCk7XG4gICAgfSxcbiAgICBcIkN0cmwtU2hpZnQtR3xDb21tYW5kLVNoaWZ0LUdcIjogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgc2IuZmluZFByZXYoKTtcbiAgICB9LFxuICAgIFwiZXNjXCI6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IHNiLmhpZGUoKTt9KTtcbiAgICB9LFxuICAgIFwiUmV0dXJuXCI6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIGlmIChzYi5hY3RpdmVJbnB1dCA9PSBzYi5yZXBsYWNlSW5wdXQpXG4gICAgICAgICAgICBzYi5yZXBsYWNlKCk7XG4gICAgICAgIHNiLmZpbmROZXh0KCk7XG4gICAgfSxcbiAgICBcIlNoaWZ0LVJldHVyblwiOiBmdW5jdGlvbihzYikge1xuICAgICAgICBpZiAoc2IuYWN0aXZlSW5wdXQgPT0gc2IucmVwbGFjZUlucHV0KVxuICAgICAgICAgICAgc2IucmVwbGFjZSgpO1xuICAgICAgICBzYi5maW5kUHJldigpO1xuICAgIH0sXG4gICAgXCJBbHQtUmV0dXJuXCI6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIGlmIChzYi5hY3RpdmVJbnB1dCA9PSBzYi5yZXBsYWNlSW5wdXQpXG4gICAgICAgICAgICBzYi5yZXBsYWNlQWxsKCk7XG4gICAgICAgIHNiLmZpbmRBbGwoKTtcbiAgICB9LFxuICAgIFwiVGFiXCI6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIChzYi5hY3RpdmVJbnB1dCA9PSBzYi5yZXBsYWNlSW5wdXQgPyBzYi5zZWFyY2hJbnB1dCA6IHNiLnJlcGxhY2VJbnB1dCkuZm9jdXMoKTtcbiAgICB9XG59KTtcblxuJHNlYXJjaEJhcktiLmFkZENvbW1hbmRzKFt7XG4gICAgbmFtZTogXCJ0b2dnbGVSZWdleHBNb2RlXCIsXG4gICAgYmluZEtleToge3dpbjogXCJBbHQtUnxBbHQtL1wiLCBtYWM6IFwiQ3RybC1BbHQtUnxDdHJsLUFsdC0vXCJ9LFxuICAgIGV4ZWM6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIHNiLnJlZ0V4cE9wdGlvbi5jaGVja2VkID0gIXNiLnJlZ0V4cE9wdGlvbi5jaGVja2VkO1xuICAgICAgICBzYi4kc3luY09wdGlvbnMoKTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogXCJ0b2dnbGVDYXNlU2Vuc2l0aXZlXCIsXG4gICAgYmluZEtleToge3dpbjogXCJBbHQtQ3xBbHQtSVwiLCBtYWM6IFwiQ3RybC1BbHQtUnxDdHJsLUFsdC1JXCJ9LFxuICAgIGV4ZWM6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIHNiLmNhc2VTZW5zaXRpdmVPcHRpb24uY2hlY2tlZCA9ICFzYi5jYXNlU2Vuc2l0aXZlT3B0aW9uLmNoZWNrZWQ7XG4gICAgICAgIHNiLiRzeW5jT3B0aW9ucygpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcInRvZ2dsZVdob2xlV29yZHNcIixcbiAgICBiaW5kS2V5OiB7d2luOiBcIkFsdC1CfEFsdC1XXCIsIG1hYzogXCJDdHJsLUFsdC1CfEN0cmwtQWx0LVdcIn0sXG4gICAgZXhlYzogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgc2Iud2hvbGVXb3JkT3B0aW9uLmNoZWNrZWQgPSAhc2Iud2hvbGVXb3JkT3B0aW9uLmNoZWNrZWQ7XG4gICAgICAgIHNiLiRzeW5jT3B0aW9ucygpO1xuICAgIH1cbn0sIHtcbiAgICBuYW1lOiBcInRvZ2dsZVJlcGxhY2VcIixcbiAgICBleGVjOiBmdW5jdGlvbihzYikge1xuICAgICAgICBzYi5yZXBsYWNlT3B0aW9uLmNoZWNrZWQgPSAhc2IucmVwbGFjZU9wdGlvbi5jaGVja2VkO1xuICAgICAgICBzYi4kc3luY09wdGlvbnMoKTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogXCJzZWFyY2hJblNlbGVjdGlvblwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIHNiLnNlYXJjaE9wdGlvbi5jaGVja2VkID0gIXNiLnNlYXJjaFJhbmdlO1xuICAgICAgICBzYi5zZXRTZWFyY2hSYW5nZShzYi5zZWFyY2hPcHRpb24uY2hlY2tlZCAmJiBzYi5lZGl0b3IuZ2V0U2VsZWN0aW9uUmFuZ2UoKSk7XG4gICAgICAgIHNiLiRzeW5jT3B0aW9ucygpO1xuICAgIH1cbn1dKTtcblxuLy9rZXliaW5kaW5nIG91dHNpZGUgb2YgdGhlIHNlYXJjaGJveFxudmFyICRjbG9zZVNlYXJjaEJhcktiID0gbmV3IEhhc2hIYW5kbGVyKFt7XG4gICAgYmluZEtleTogXCJFc2NcIixcbiAgICBuYW1lOiBcImNsb3NlU2VhcmNoQmFyXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5zZWFyY2hCb3guaGlkZSgpO1xuICAgIH1cbn1dKTtcblxuU2VhcmNoQm94LnByb3RvdHlwZS4kc2VhcmNoQmFyS2IgPSAkc2VhcmNoQmFyS2I7XG5TZWFyY2hCb3gucHJvdG90eXBlLiRjbG9zZVNlYXJjaEJhcktiID0gJGNsb3NlU2VhcmNoQmFyS2I7XG5cbmV4cG9ydHMuU2VhcmNoQm94ID0gU2VhcmNoQm94O1xuXG4vKipcbiAqIFxuICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICogQHBhcmFtIHtib29sZWFufSBbaXNSZXBsYWNlXVxuICovXG5leHBvcnRzLlNlYXJjaCA9IGZ1bmN0aW9uKGVkaXRvciwgaXNSZXBsYWNlKSB7XG4gICAgdmFyIHNiID0gZWRpdG9yLnNlYXJjaEJveCB8fCBuZXcgU2VhcmNoQm94KGVkaXRvcik7XG4gICAgc2Iuc2hvdyhlZGl0b3Iuc2Vzc2lvbi5nZXRUZXh0UmFuZ2UoKSwgaXNSZXBsYWNlKTtcbn07XG5cblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBUT0RPXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi8qXG4tIG1vdmUgc2VhcmNoIGZvcm0gdG8gdGhlIGxlZnQgaWYgaXQgbWFza3MgY3VycmVudCB3b3JkXG4tIGluY2x1ZGUgYWxsIG9wdGlvbnMgdGhhdCBzZWFyY2ggaGFzLiBleDogcmVnZXhcbi0gc2VhcmNoYm94LnNlYXJjaGJveCBpcyBub3QgdGhhdCBwcmV0dHkuIFdlIHNob3VsZCBoYXZlIGp1c3Qgc2VhcmNoYm94XG4tIGRpc2FibGUgcHJldiBidXR0b24gaWYgaXQgbWFrZXMgc2Vuc2VcbiovXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=