(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2892],{

/***/ 99977:
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

/***/ 32892:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/**
 * @typedef {import("../editor").Editor} Editor
 */
var dom = __webpack_require__(6359);
var lang = __webpack_require__(20124);
var event = __webpack_require__(17989);
var searchboxCss = __webpack_require__(99977);
var HashHandler = (__webpack_require__(7116).HashHandler);
var keyUtil = __webpack_require__(11797);
var nls = (__webpack_require__(13188).nls);

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
                ["input", {class: "ace_search_field", placeholder: nls("Search for"), spellcheck: "false"}],
                ["span", {action: "findPrev", class: "ace_searchbtn prev"}, "\u200b"],
                ["span", {action: "findNext", class: "ace_searchbtn next"}, "\u200b"],
                ["span", {action: "findAll", class: "ace_searchbtn", title: "Alt-Enter"}, nls("All")]
            ],
            ["div", {class: "ace_replace_form"},
                ["input", {class: "ace_search_field", placeholder: nls("Replace with"), spellcheck: "false"}],
                ["span", {action: "replaceAndFindNext", class: "ace_searchbtn"}, nls("Replace")],
                ["span", {action: "replaceAll", class: "ace_searchbtn"}, nls("All")]
            ],
            ["div", {class: "ace_search_options"},
                ["span", {action: "toggleReplace", class: "ace_button", title: nls("Toggle Replace mode"),
                    style: "float:left;margin-top:-2px;padding:0 5px;"}, "+"],
                ["span", {class: "ace_search_counter"}],
                ["span", {action: "toggleRegexpMode", class: "ace_button", title: nls("RegExp Search")}, ".*"],
                ["span", {action: "toggleCaseSensitive", class: "ace_button", title: nls("CaseSensitive Search")}, "Aa"],
                ["span", {action: "toggleWholeWords", class: "ace_button", title: nls("Whole Word Search")}, "\\b"],
                ["span", {action: "searchInSelection", class: "ace_button", title: nls("Search In Selection")}, "S"]
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
        this.searchCounter.textContent = nls("$0 of $1", [before , (all > MAX_COUNT ? MAX_COUNT + "+" : all)]);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjI4OTIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7O0FDaktZO0FBQ2I7QUFDQSxhQUFhLDRCQUE0QjtBQUN6QztBQUNBLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLFdBQVcsbUJBQU8sQ0FBQyxLQUFhO0FBQ2hDLFlBQVksbUJBQU8sQ0FBQyxLQUFjO0FBQ2xDLG1CQUFtQixtQkFBTyxDQUFDLEtBQWlCO0FBQzVDLGtCQUFrQix1Q0FBK0M7QUFDakUsY0FBYyxtQkFBTyxDQUFDLEtBQWE7QUFDbkMsVUFBVSxnQ0FBd0I7O0FBRWxDOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxXQUFXO0FBQzFCLGVBQWUsV0FBVztBQUMxQjtBQUNBO0FBQ0Esa0JBQWtCLElBQUk7QUFDdEI7QUFDQTtBQUNBLDhCQUE4Qix5QkFBeUI7QUFDdkQsc0JBQXNCLDZDQUE2QztBQUNuRSxxQkFBcUIseUJBQXlCO0FBQzlDLDJCQUEyQiwrRUFBK0U7QUFDMUcsMEJBQTBCLGdEQUFnRDtBQUMxRSwwQkFBMEIsZ0RBQWdEO0FBQzFFLDBCQUEwQiw4REFBOEQ7QUFDeEY7QUFDQSxxQkFBcUIsMEJBQTBCO0FBQy9DLDJCQUEyQixpRkFBaUY7QUFDNUcsMEJBQTBCLHFEQUFxRDtBQUMvRSwwQkFBMEIsNkNBQTZDO0FBQ3ZFO0FBQ0EscUJBQXFCLDRCQUE0QjtBQUNqRCwwQkFBMEI7QUFDMUIsdUNBQXVDLGdCQUFnQixjQUFjLEVBQUU7QUFDdkUsMEJBQTBCLDRCQUE0QjtBQUN0RCwwQkFBMEIsNkVBQTZFO0FBQ3ZHLDBCQUEwQix1RkFBdUY7QUFDakgsMEJBQTBCLGlGQUFpRjtBQUMzRywwQkFBMEIsb0ZBQW9GO0FBQzlHO0FBQ0E7QUFDQSxrQkFBa0IsSUFBSTtBQUN0Qjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixPQUFPO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxhQUFhO0FBQzVCO0FBQ0E7QUFDQSxrQkFBa0IsWUFBWTtBQUM5QjtBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQSxrQkFBa0IsaUJBQWlCO0FBQ25DO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBLGtCQUFrQixZQUFZO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLFNBQVM7QUFDeEIsZUFBZSxTQUFTO0FBQ3hCLGVBQWUsS0FBSztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULGtCQUFrQixJQUFJO0FBQ3RCO0FBQ0E7QUFDQSw2Q0FBNkMsaUJBQWlCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsa0JBQWtCLElBQUk7QUFDdEI7QUFDQTtBQUNBLDZDQUE2QyxpQkFBaUI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsZ0NBQWdDLFdBQVc7QUFDM0MsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLGNBQWMsaURBQWlEO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsY0FBYyxpREFBaUQ7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxjQUFjLGlEQUFpRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUEsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsU0FBUztBQUNwQjtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9zZWFyY2hib3gtY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9zZWFyY2hib3guanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBgXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogRWRpdG9yIFNlYXJjaCBGb3JtXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cbi5hY2Vfc2VhcmNoIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO1xuICAgIGNvbG9yOiAjNjY2O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjYmNiY2I7XG4gICAgYm9yZGVyLXRvcDogMCBub25lO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgbWFyZ2luOiAwO1xuICAgIHBhZGRpbmc6IDRweCA2cHggMCA0cHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICB6LWluZGV4OiA5OTtcbiAgICB3aGl0ZS1zcGFjZTogbm9ybWFsO1xufVxuLmFjZV9zZWFyY2gubGVmdCB7XG4gICAgYm9yZGVyLWxlZnQ6IDAgbm9uZTtcbiAgICBib3JkZXItcmFkaXVzOiAwcHggMHB4IDVweCAwcHg7XG4gICAgbGVmdDogMDtcbn1cbi5hY2Vfc2VhcmNoLnJpZ2h0IHtcbiAgICBib3JkZXItcmFkaXVzOiAwcHggMHB4IDBweCA1cHg7XG4gICAgYm9yZGVyLXJpZ2h0OiAwIG5vbmU7XG4gICAgcmlnaHQ6IDA7XG59XG5cbi5hY2Vfc2VhcmNoX2Zvcm0sIC5hY2VfcmVwbGFjZV9mb3JtIHtcbiAgICBtYXJnaW46IDAgMjBweCA0cHggMDtcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgIGxpbmUtaGVpZ2h0OiAxLjk7XG59XG4uYWNlX3JlcGxhY2VfZm9ybSB7XG4gICAgbWFyZ2luLXJpZ2h0OiAwO1xufVxuLmFjZV9zZWFyY2hfZm9ybS5hY2Vfbm9tYXRjaCB7XG4gICAgb3V0bGluZTogMXB4IHNvbGlkIHJlZDtcbn1cblxuLmFjZV9zZWFyY2hfZmllbGQge1xuICAgIGJvcmRlci1yYWRpdXM6IDNweCAwIDAgM3B4O1xuICAgIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICAgIGNvbG9yOiBibGFjaztcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjY2JjYmNiO1xuICAgIGJvcmRlci1yaWdodDogMCBub25lO1xuICAgIG91dGxpbmU6IDA7XG4gICAgcGFkZGluZzogMDtcbiAgICBmb250LXNpemU6IGluaGVyaXQ7XG4gICAgbWFyZ2luOiAwO1xuICAgIGxpbmUtaGVpZ2h0OiBpbmhlcml0O1xuICAgIHBhZGRpbmc6IDAgNnB4O1xuICAgIG1pbi13aWR0aDogMTdlbTtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuICAgIG1pbi1oZWlnaHQ6IDEuOGVtO1xuICAgIGJveC1zaXppbmc6IGNvbnRlbnQtYm94O1xufVxuLmFjZV9zZWFyY2hidG4ge1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjYmNiY2I7XG4gICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICAgIHBhZGRpbmc6IDAgNnB4O1xuICAgIGJhY2tncm91bmQ6ICNmZmY7XG4gICAgYm9yZGVyLXJpZ2h0OiAwIG5vbmU7XG4gICAgYm9yZGVyLWxlZnQ6IDFweCBzb2xpZCAjZGNkY2RjO1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBtYXJnaW46IDA7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIGNvbG9yOiAjNjY2O1xufVxuLmFjZV9zZWFyY2hidG46bGFzdC1jaGlsZCB7XG4gICAgYm9yZGVyLXJhZGl1czogMCAzcHggM3B4IDA7XG4gICAgYm9yZGVyLXJpZ2h0OiAxcHggc29saWQgI2NiY2JjYjtcbn1cbi5hY2Vfc2VhcmNoYnRuOmRpc2FibGVkIHtcbiAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbn1cbi5hY2Vfc2VhcmNoYnRuOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZWVmMWY2O1xufVxuLmFjZV9zZWFyY2hidG4ucHJldiwgLmFjZV9zZWFyY2hidG4ubmV4dCB7XG4gICAgIHBhZGRpbmc6IDBweCAwLjdlbVxufVxuLmFjZV9zZWFyY2hidG4ucHJldjphZnRlciwgLmFjZV9zZWFyY2hidG4ubmV4dDphZnRlciB7XG4gICAgIGNvbnRlbnQ6IFwiXCI7XG4gICAgIGJvcmRlcjogc29saWQgMnB4ICM4ODg7XG4gICAgIHdpZHRoOiAwLjVlbTtcbiAgICAgaGVpZ2h0OiAwLjVlbTtcbiAgICAgYm9yZGVyLXdpZHRoOiAgMnB4IDAgMCAycHg7XG4gICAgIGRpc3BsYXk6aW5saW5lLWJsb2NrO1xuICAgICB0cmFuc2Zvcm06IHJvdGF0ZSgtNDVkZWcpO1xufVxuLmFjZV9zZWFyY2hidG4ubmV4dDphZnRlciB7XG4gICAgIGJvcmRlci13aWR0aDogMCAycHggMnB4IDAgO1xufVxuLmFjZV9zZWFyY2hidG5fY2xvc2Uge1xuICAgIGJhY2tncm91bmQ6IHVybChkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUE0QUFBQWNDQVlBQUFCUlZvNUJBQUFBWjBsRVFWUjQydTJTVVFyQU1BaER2YXpuOE9qWkJpbENrWVZWeGlpczhINENUMFZyQUpiNFdIVDNDNXhVMmEySVFaWEpqaVFJUk1ka0VvSjVRMnlNcXBmRElvK1hZNGs2aCtZWE95S3FUSWo1UkVheGxvTkFkMHhpS21BdHNUSHFXOHNSMlc1ZjdnQ3U1bldGVXBWalp3QUFBQUJKUlU1RXJrSmdnZz09KSBuby1yZXBlYXQgNTAlIDA7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIGJvcmRlcjogMCBub25lO1xuICAgIGNvbG9yOiAjNjU2NTY1O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICBmb250OiAxNnB4LzE2cHggQXJpYWw7XG4gICAgcGFkZGluZzogMDtcbiAgICBoZWlnaHQ6IDE0cHg7XG4gICAgd2lkdGg6IDE0cHg7XG4gICAgdG9wOiA5cHg7XG4gICAgcmlnaHQ6IDdweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG59XG4uYWNlX3NlYXJjaGJ0bl9jbG9zZTpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogIzY1NjU2NTtcbiAgICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiA1MCUgMTAwJTtcbiAgICBjb2xvcjogd2hpdGU7XG59XG5cbi5hY2VfYnV0dG9uIHtcbiAgICBtYXJnaW4tbGVmdDogMnB4O1xuICAgIGN1cnNvcjogcG9pbnRlcjtcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW8tdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgb3BhY2l0eTogMC43O1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMTAwLDEwMCwxMDAsMC4yMyk7XG4gICAgcGFkZGluZzogMXB4O1xuICAgIGJveC1zaXppbmc6ICAgIGJvcmRlci1ib3ghaW1wb3J0YW50O1xuICAgIGNvbG9yOiBibGFjaztcbn1cblxuLmFjZV9idXR0b246aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWU7XG4gICAgb3BhY2l0eToxO1xufVxuLmFjZV9idXR0b246YWN0aXZlIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjZGRkO1xufVxuXG4uYWNlX2J1dHRvbi5jaGVja2VkIHtcbiAgICBib3JkZXItY29sb3I6ICMzMzk5ZmY7XG4gICAgb3BhY2l0eToxO1xufVxuXG4uYWNlX3NlYXJjaF9vcHRpb25ze1xuICAgIG1hcmdpbi1ib3R0b206IDNweDtcbiAgICB0ZXh0LWFsaWduOiByaWdodDtcbiAgICAtd2Via2l0LXVzZXItc2VsZWN0OiBub25lO1xuICAgIC1tb3otdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW8tdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1zLXVzZXItc2VsZWN0OiBub25lO1xuICAgIHVzZXItc2VsZWN0OiBub25lO1xuICAgIGNsZWFyOiBib3RoO1xufVxuXG4uYWNlX3NlYXJjaF9jb3VudGVyIHtcbiAgICBmbG9hdDogbGVmdDtcbiAgICBmb250LWZhbWlseTogYXJpYWw7XG4gICAgcGFkZGluZzogMCA4cHg7XG59YDtcbiIsIlwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vZWRpdG9yXCIpLkVkaXRvcn0gRWRpdG9yXG4gKi9cbnZhciBkb20gPSByZXF1aXJlKFwiLi4vbGliL2RvbVwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIGV2ZW50ID0gcmVxdWlyZShcIi4uL2xpYi9ldmVudFwiKTtcbnZhciBzZWFyY2hib3hDc3MgPSByZXF1aXJlKFwiLi9zZWFyY2hib3gtY3NzXCIpO1xudmFyIEhhc2hIYW5kbGVyID0gcmVxdWlyZShcIi4uL2tleWJvYXJkL2hhc2hfaGFuZGxlclwiKS5IYXNoSGFuZGxlcjtcbnZhciBrZXlVdGlsID0gcmVxdWlyZShcIi4uL2xpYi9rZXlzXCIpO1xudmFyIG5scyA9IHJlcXVpcmUoXCIuLi9jb25maWdcIikubmxzO1xuXG52YXIgTUFYX0NPVU5UID0gOTk5O1xuXG5kb20uaW1wb3J0Q3NzU3RyaW5nKHNlYXJjaGJveENzcywgXCJhY2Vfc2VhcmNoYm94XCIsIGZhbHNlKTtcblxuY2xhc3MgU2VhcmNoQm94IHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICogQHBhcmFtIHt1bmRlZmluZWR9IFtyYW5nZV1cbiAgICAgKiBAcGFyYW0ge3VuZGVmaW5lZH0gW3Nob3dSZXBsYWNlRm9ybV1cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihlZGl0b3IsIHJhbmdlLCBzaG93UmVwbGFjZUZvcm0pIHtcbiAgICAgICAgLyoqQHR5cGUge2FueX0qL1xuICAgICAgICB0aGlzLmFjdGl2ZUlucHV0O1xuICAgICAgICB2YXIgZGl2ID0gZG9tLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGRvbS5idWlsZERvbShbXCJkaXZcIiwge2NsYXNzOlwiYWNlX3NlYXJjaCByaWdodFwifSxcbiAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJoaWRlXCIsIGNsYXNzOiBcImFjZV9zZWFyY2hidG5fY2xvc2VcIn1dLFxuICAgICAgICAgICAgW1wiZGl2XCIsIHtjbGFzczogXCJhY2Vfc2VhcmNoX2Zvcm1cIn0sXG4gICAgICAgICAgICAgICAgW1wiaW5wdXRcIiwge2NsYXNzOiBcImFjZV9zZWFyY2hfZmllbGRcIiwgcGxhY2Vob2xkZXI6IG5scyhcIlNlYXJjaCBmb3JcIiksIHNwZWxsY2hlY2s6IFwiZmFsc2VcIn1dLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJmaW5kUHJldlwiLCBjbGFzczogXCJhY2Vfc2VhcmNoYnRuIHByZXZcIn0sIFwiXFx1MjAwYlwiXSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwiZmluZE5leHRcIiwgY2xhc3M6IFwiYWNlX3NlYXJjaGJ0biBuZXh0XCJ9LCBcIlxcdTIwMGJcIl0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcImZpbmRBbGxcIiwgY2xhc3M6IFwiYWNlX3NlYXJjaGJ0blwiLCB0aXRsZTogXCJBbHQtRW50ZXJcIn0sIG5scyhcIkFsbFwiKV1cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBbXCJkaXZcIiwge2NsYXNzOiBcImFjZV9yZXBsYWNlX2Zvcm1cIn0sXG4gICAgICAgICAgICAgICAgW1wiaW5wdXRcIiwge2NsYXNzOiBcImFjZV9zZWFyY2hfZmllbGRcIiwgcGxhY2Vob2xkZXI6IG5scyhcIlJlcGxhY2Ugd2l0aFwiKSwgc3BlbGxjaGVjazogXCJmYWxzZVwifV0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcInJlcGxhY2VBbmRGaW5kTmV4dFwiLCBjbGFzczogXCJhY2Vfc2VhcmNoYnRuXCJ9LCBubHMoXCJSZXBsYWNlXCIpXSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwicmVwbGFjZUFsbFwiLCBjbGFzczogXCJhY2Vfc2VhcmNoYnRuXCJ9LCBubHMoXCJBbGxcIildXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1wiZGl2XCIsIHtjbGFzczogXCJhY2Vfc2VhcmNoX29wdGlvbnNcIn0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcInRvZ2dsZVJlcGxhY2VcIiwgY2xhc3M6IFwiYWNlX2J1dHRvblwiLCB0aXRsZTogbmxzKFwiVG9nZ2xlIFJlcGxhY2UgbW9kZVwiKSxcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU6IFwiZmxvYXQ6bGVmdDttYXJnaW4tdG9wOi0ycHg7cGFkZGluZzowIDVweDtcIn0sIFwiK1wiXSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHtjbGFzczogXCJhY2Vfc2VhcmNoX2NvdW50ZXJcIn1dLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJ0b2dnbGVSZWdleHBNb2RlXCIsIGNsYXNzOiBcImFjZV9idXR0b25cIiwgdGl0bGU6IG5scyhcIlJlZ0V4cCBTZWFyY2hcIil9LCBcIi4qXCJdLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJ0b2dnbGVDYXNlU2Vuc2l0aXZlXCIsIGNsYXNzOiBcImFjZV9idXR0b25cIiwgdGl0bGU6IG5scyhcIkNhc2VTZW5zaXRpdmUgU2VhcmNoXCIpfSwgXCJBYVwiXSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwidG9nZ2xlV2hvbGVXb3Jkc1wiLCBjbGFzczogXCJhY2VfYnV0dG9uXCIsIHRpdGxlOiBubHMoXCJXaG9sZSBXb3JkIFNlYXJjaFwiKX0sIFwiXFxcXGJcIl0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcInNlYXJjaEluU2VsZWN0aW9uXCIsIGNsYXNzOiBcImFjZV9idXR0b25cIiwgdGl0bGU6IG5scyhcIlNlYXJjaCBJbiBTZWxlY3Rpb25cIil9LCBcIlNcIl1cbiAgICAgICAgICAgIF1cbiAgICAgICAgXSwgZGl2KTtcbiAgICAgICAgLyoqQHR5cGUge2FueX0qL1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBkaXYuZmlyc3RDaGlsZDtcblxuICAgICAgICB0aGlzLnNldFNlc3Npb24gPSB0aGlzLnNldFNlc3Npb24uYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLiRpbml0KCk7XG4gICAgICAgIHRoaXMuc2V0RWRpdG9yKGVkaXRvcik7XG4gICAgICAgIGRvbS5pbXBvcnRDc3NTdHJpbmcoc2VhcmNoYm94Q3NzLCBcImFjZV9zZWFyY2hib3hcIiwgZWRpdG9yLmNvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICAgICAqL1xuICAgIHNldEVkaXRvcihlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLnNlYXJjaEJveCA9IHRoaXM7XG4gICAgICAgIGVkaXRvci5yZW5kZXJlci5zY3JvbGxlci5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICAgICAgICAvKipAdHlwZSB7RWRpdG9yfSovXG4gICAgICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yO1xuICAgIH1cbiAgICBcbiAgICBzZXRTZXNzaW9uKGUpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hSYW5nZSA9IG51bGw7XG4gICAgICAgIHRoaXMuJHN5bmNPcHRpb25zKHRydWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IHNiXG4gICAgICovXG4gICAgJGluaXRFbGVtZW50cyhzYikge1xuICAgICAgICAvKipAdHlwZSB7SFRNTEVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy5zZWFyY2hCb3ggPSBzYi5xdWVyeVNlbGVjdG9yKFwiLmFjZV9zZWFyY2hfZm9ybVwiKTtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxFbGVtZW50fSovXG4gICAgICAgIHRoaXMucmVwbGFjZUJveCA9IHNiLnF1ZXJ5U2VsZWN0b3IoXCIuYWNlX3JlcGxhY2VfZm9ybVwiKTtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy5zZWFyY2hPcHRpb24gPSBzYi5xdWVyeVNlbGVjdG9yKFwiW2FjdGlvbj1zZWFyY2hJblNlbGVjdGlvbl1cIik7XG4gICAgICAgIC8qKkB0eXBlIHtIVE1MSW5wdXRFbGVtZW50fSovXG4gICAgICAgIHRoaXMucmVwbGFjZU9wdGlvbiA9IHNiLnF1ZXJ5U2VsZWN0b3IoXCJbYWN0aW9uPXRvZ2dsZVJlcGxhY2VdXCIpO1xuICAgICAgICAvKipAdHlwZSB7SFRNTElucHV0RWxlbWVudH0qL1xuICAgICAgICB0aGlzLnJlZ0V4cE9wdGlvbiA9IHNiLnF1ZXJ5U2VsZWN0b3IoXCJbYWN0aW9uPXRvZ2dsZVJlZ2V4cE1vZGVdXCIpO1xuICAgICAgICAvKipAdHlwZSB7SFRNTElucHV0RWxlbWVudH0qL1xuICAgICAgICB0aGlzLmNhc2VTZW5zaXRpdmVPcHRpb24gPSBzYi5xdWVyeVNlbGVjdG9yKFwiW2FjdGlvbj10b2dnbGVDYXNlU2Vuc2l0aXZlXVwiKTtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy53aG9sZVdvcmRPcHRpb24gPSBzYi5xdWVyeVNlbGVjdG9yKFwiW2FjdGlvbj10b2dnbGVXaG9sZVdvcmRzXVwiKTtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy5zZWFyY2hJbnB1dCA9IHRoaXMuc2VhcmNoQm94LnF1ZXJ5U2VsZWN0b3IoXCIuYWNlX3NlYXJjaF9maWVsZFwiKTtcbiAgICAgICAgLyoqQHR5cGUge0hUTUxJbnB1dEVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy5yZXBsYWNlSW5wdXQgPSB0aGlzLnJlcGxhY2VCb3gucXVlcnlTZWxlY3RvcihcIi5hY2Vfc2VhcmNoX2ZpZWxkXCIpO1xuICAgICAgICAvKipAdHlwZSB7SFRNTEVsZW1lbnR9Ki9cbiAgICAgICAgdGhpcy5zZWFyY2hDb3VudGVyID0gc2IucXVlcnlTZWxlY3RvcihcIi5hY2Vfc2VhcmNoX2NvdW50ZXJcIik7XG4gICAgfVxuICAgIFxuICAgICRpbml0KCkge1xuICAgICAgICB2YXIgc2IgPSB0aGlzLmVsZW1lbnQ7XG4gICAgICAgIFxuICAgICAgICB0aGlzLiRpbml0RWxlbWVudHMoc2IpO1xuICAgICAgICBcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgZXZlbnQuYWRkTGlzdGVuZXIoc2IsIFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBfdGhpcy5hY3RpdmVJbnB1dC5mb2N1cygpO1xuICAgICAgICAgICAgfSwgMCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oZSk7XG4gICAgICAgIH0pO1xuICAgICAgICBldmVudC5hZGRMaXN0ZW5lcihzYiwgXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgdCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICAgICAgICAgIHZhciBhY3Rpb24gPSB0LmdldEF0dHJpYnV0ZShcImFjdGlvblwiKTtcbiAgICAgICAgICAgIGlmIChhY3Rpb24gJiYgX3RoaXNbYWN0aW9uXSlcbiAgICAgICAgICAgICAgICBfdGhpc1thY3Rpb25dKCk7XG4gICAgICAgICAgICBlbHNlIGlmIChfdGhpcy4kc2VhcmNoQmFyS2IuY29tbWFuZHNbYWN0aW9uXSlcbiAgICAgICAgICAgICAgICBfdGhpcy4kc2VhcmNoQmFyS2IuY29tbWFuZHNbYWN0aW9uXS5leGVjKF90aGlzKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbihlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZXZlbnQuYWRkQ29tbWFuZEtleUxpc3RlbmVyKHNiLCBmdW5jdGlvbihlLCBoYXNoSWQsIGtleUNvZGUpIHtcbiAgICAgICAgICAgIHZhciBrZXlTdHJpbmcgPSBrZXlVdGlsLmtleUNvZGVUb1N0cmluZyhrZXlDb2RlKTtcbiAgICAgICAgICAgIHZhciBjb21tYW5kID0gX3RoaXMuJHNlYXJjaEJhcktiLmZpbmRLZXlDb21tYW5kKGhhc2hJZCwga2V5U3RyaW5nKTtcbiAgICAgICAgICAgIGlmIChjb21tYW5kICYmIGNvbW1hbmQuZXhlYykge1xuICAgICAgICAgICAgICAgIGNvbW1hbmQuZXhlYyhfdGhpcyk7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcEV2ZW50KGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLiRvbkNoYW5nZSA9IGxhbmcuZGVsYXllZENhbGwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy5maW5kKGZhbHNlLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV2ZW50LmFkZExpc3RlbmVyKHRoaXMuc2VhcmNoSW5wdXQsIFwiaW5wdXRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy4kb25DaGFuZ2Uuc2NoZWR1bGUoMjApO1xuICAgICAgICB9KTtcbiAgICAgICAgZXZlbnQuYWRkTGlzdGVuZXIodGhpcy5zZWFyY2hJbnB1dCwgXCJmb2N1c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF90aGlzLmFjdGl2ZUlucHV0ID0gX3RoaXMuc2VhcmNoSW5wdXQ7XG4gICAgICAgICAgICBfdGhpcy5zZWFyY2hJbnB1dC52YWx1ZSAmJiBfdGhpcy5oaWdobGlnaHQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGV2ZW50LmFkZExpc3RlbmVyKHRoaXMucmVwbGFjZUlucHV0LCBcImZvY3VzXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMuYWN0aXZlSW5wdXQgPSBfdGhpcy5yZXBsYWNlSW5wdXQ7XG4gICAgICAgICAgICBfdGhpcy5zZWFyY2hJbnB1dC52YWx1ZSAmJiBfdGhpcy5oaWdobGlnaHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2V0U2VhcmNoUmFuZ2UocmFuZ2UpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hSYW5nZSA9IHJhbmdlO1xuICAgICAgICBpZiAocmFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUmFuZ2VNYXJrZXIgPSB0aGlzLmVkaXRvci5zZXNzaW9uLmFkZE1hcmtlcihyYW5nZSwgXCJhY2VfYWN0aXZlLWxpbmVcIik7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWFyY2hSYW5nZU1hcmtlcikge1xuICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2Vzc2lvbi5yZW1vdmVNYXJrZXIodGhpcy5zZWFyY2hSYW5nZU1hcmtlcik7XG4gICAgICAgICAgICB0aGlzLnNlYXJjaFJhbmdlTWFya2VyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW3ByZXZlbnRTY3JvbGxdXG4gICAgICovXG4gICAgJHN5bmNPcHRpb25zKHByZXZlbnRTY3JvbGwpIHtcbiAgICAgICAgZG9tLnNldENzc0NsYXNzKHRoaXMucmVwbGFjZU9wdGlvbiwgXCJjaGVja2VkXCIsIHRoaXMuc2VhcmNoUmFuZ2UpO1xuICAgICAgICBkb20uc2V0Q3NzQ2xhc3ModGhpcy5zZWFyY2hPcHRpb24sIFwiY2hlY2tlZFwiLCB0aGlzLnNlYXJjaE9wdGlvbi5jaGVja2VkKTtcbiAgICAgICAgdGhpcy5yZXBsYWNlT3B0aW9uLnRleHRDb250ZW50ID0gdGhpcy5yZXBsYWNlT3B0aW9uLmNoZWNrZWQgPyBcIi1cIiA6IFwiK1wiO1xuICAgICAgICBkb20uc2V0Q3NzQ2xhc3ModGhpcy5yZWdFeHBPcHRpb24sIFwiY2hlY2tlZFwiLCB0aGlzLnJlZ0V4cE9wdGlvbi5jaGVja2VkKTtcbiAgICAgICAgZG9tLnNldENzc0NsYXNzKHRoaXMud2hvbGVXb3JkT3B0aW9uLCBcImNoZWNrZWRcIiwgdGhpcy53aG9sZVdvcmRPcHRpb24uY2hlY2tlZCk7XG4gICAgICAgIGRvbS5zZXRDc3NDbGFzcyh0aGlzLmNhc2VTZW5zaXRpdmVPcHRpb24sIFwiY2hlY2tlZFwiLCB0aGlzLmNhc2VTZW5zaXRpdmVPcHRpb24uY2hlY2tlZCk7XG4gICAgICAgIHZhciByZWFkT25seSA9IHRoaXMuZWRpdG9yLmdldFJlYWRPbmx5KCk7XG4gICAgICAgIHRoaXMucmVwbGFjZU9wdGlvbi5zdHlsZS5kaXNwbGF5ID0gcmVhZE9ubHkgPyBcIm5vbmVcIiA6IFwiXCI7XG4gICAgICAgIHRoaXMucmVwbGFjZUJveC5zdHlsZS5kaXNwbGF5ID0gdGhpcy5yZXBsYWNlT3B0aW9uLmNoZWNrZWQgJiYgIXJlYWRPbmx5ID8gXCJcIiA6IFwibm9uZVwiO1xuICAgICAgICB0aGlzLmZpbmQoZmFsc2UsIGZhbHNlLCBwcmV2ZW50U2Nyb2xsKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge1JlZ0V4cH0gW3JlXVxuICAgICAqL1xuICAgIGhpZ2hsaWdodChyZSkge1xuICAgICAgICB0aGlzLmVkaXRvci5zZXNzaW9uLmhpZ2hsaWdodChyZSB8fCB0aGlzLmVkaXRvci4kc2VhcmNoLiRvcHRpb25zLnJlKTtcbiAgICAgICAgdGhpcy5lZGl0b3IucmVuZGVyZXIudXBkYXRlQmFja01hcmtlcnMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IHNraXBDdXJyZW50XG4gICAgICogQHBhcmFtIHtib29sZWFufSBiYWNrd2FyZHNcbiAgICAgKiBAcGFyYW0ge2FueX0gW3ByZXZlbnRTY3JvbGxdXG4gICAgICovXG4gICAgZmluZChza2lwQ3VycmVudCwgYmFja3dhcmRzLCBwcmV2ZW50U2Nyb2xsKSB7XG4gICAgICAgIHZhciByYW5nZSA9IHRoaXMuZWRpdG9yLmZpbmQodGhpcy5zZWFyY2hJbnB1dC52YWx1ZSwge1xuICAgICAgICAgICAgc2tpcEN1cnJlbnQ6IHNraXBDdXJyZW50LFxuICAgICAgICAgICAgYmFja3dhcmRzOiBiYWNrd2FyZHMsXG4gICAgICAgICAgICB3cmFwOiB0cnVlLFxuICAgICAgICAgICAgcmVnRXhwOiB0aGlzLnJlZ0V4cE9wdGlvbi5jaGVja2VkLFxuICAgICAgICAgICAgY2FzZVNlbnNpdGl2ZTogdGhpcy5jYXNlU2Vuc2l0aXZlT3B0aW9uLmNoZWNrZWQsXG4gICAgICAgICAgICB3aG9sZVdvcmQ6IHRoaXMud2hvbGVXb3JkT3B0aW9uLmNoZWNrZWQsXG4gICAgICAgICAgICBwcmV2ZW50U2Nyb2xsOiBwcmV2ZW50U2Nyb2xsLFxuICAgICAgICAgICAgcmFuZ2U6IHRoaXMuc2VhcmNoUmFuZ2VcbiAgICAgICAgfSk7XG4gICAgICAgIC8qKkB0eXBlIHthbnl9Ki9cbiAgICAgICAgdmFyIG5vTWF0Y2ggPSAhcmFuZ2UgJiYgdGhpcy5zZWFyY2hJbnB1dC52YWx1ZTtcbiAgICAgICAgZG9tLnNldENzc0NsYXNzKHRoaXMuc2VhcmNoQm94LCBcImFjZV9ub21hdGNoXCIsIG5vTWF0Y2gpO1xuICAgICAgICB0aGlzLmVkaXRvci5fZW1pdChcImZpbmRTZWFyY2hCb3hcIiwgeyBtYXRjaDogIW5vTWF0Y2ggfSk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0KCk7XG4gICAgICAgIHRoaXMudXBkYXRlQ291bnRlcigpO1xuICAgIH1cbiAgICB1cGRhdGVDb3VudGVyKCkge1xuICAgICAgICB2YXIgZWRpdG9yID0gdGhpcy5lZGl0b3I7XG4gICAgICAgIHZhciByZWdleCA9IGVkaXRvci4kc2VhcmNoLiRvcHRpb25zLnJlO1xuICAgICAgICB2YXIgc3VwcG9ydHNVbmljb2RlRmxhZyA9IHJlZ2V4LnVuaWNvZGU7XG4gICAgICAgIHZhciBhbGwgPSAwO1xuICAgICAgICB2YXIgYmVmb3JlID0gMDtcbiAgICAgICAgaWYgKHJlZ2V4KSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnNlYXJjaFJhbmdlXG4gICAgICAgICAgICAgICAgPyBlZGl0b3Iuc2Vzc2lvbi5nZXRUZXh0UmFuZ2UodGhpcy5zZWFyY2hSYW5nZSlcbiAgICAgICAgICAgICAgICA6IGVkaXRvci5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gZWRpdG9yLnNlc3Npb24uZG9jLnBvc2l0aW9uVG9JbmRleChlZGl0b3Iuc2VsZWN0aW9uLmFuY2hvcik7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hSYW5nZSlcbiAgICAgICAgICAgICAgICBvZmZzZXQgLT0gZWRpdG9yLnNlc3Npb24uZG9jLnBvc2l0aW9uVG9JbmRleCh0aGlzLnNlYXJjaFJhbmdlLnN0YXJ0KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBsYXN0ID0gcmVnZXgubGFzdEluZGV4ID0gMDtcbiAgICAgICAgICAgIHZhciBtO1xuICAgICAgICAgICAgd2hpbGUgKChtID0gcmVnZXguZXhlYyh2YWx1ZSkpKSB7XG4gICAgICAgICAgICAgICAgYWxsKys7XG4gICAgICAgICAgICAgICAgbGFzdCA9IG0uaW5kZXg7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3QgPD0gb2Zmc2V0KVxuICAgICAgICAgICAgICAgICAgICBiZWZvcmUrKztcbiAgICAgICAgICAgICAgICBpZiAoYWxsID4gTUFYX0NPVU5UKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBpZiAoIW1bMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVnZXgubGFzdEluZGV4ID0gbGFzdCArPSBsYW5nLnNraXBFbXB0eU1hdGNoKHZhbHVlLCBsYXN0LCBzdXBwb3J0c1VuaWNvZGVGbGFnKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxhc3QgPj0gdmFsdWUubGVuZ3RoKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VhcmNoQ291bnRlci50ZXh0Q29udGVudCA9IG5scyhcIiQwIG9mICQxXCIsIFtiZWZvcmUgLCAoYWxsID4gTUFYX0NPVU5UID8gTUFYX0NPVU5UICsgXCIrXCIgOiBhbGwpXSk7XG4gICAgfVxuICAgIGZpbmROZXh0KCkge1xuICAgICAgICB0aGlzLmZpbmQodHJ1ZSwgZmFsc2UpO1xuICAgIH1cbiAgICBmaW5kUHJldigpIHtcbiAgICAgICAgdGhpcy5maW5kKHRydWUsIHRydWUpO1xuICAgIH1cbiAgICBmaW5kQWxsKCl7XG4gICAgICAgIHZhciByYW5nZSA9IHRoaXMuZWRpdG9yLmZpbmRBbGwodGhpcy5zZWFyY2hJbnB1dC52YWx1ZSwgeyAgICAgICAgICAgIFxuICAgICAgICAgICAgcmVnRXhwOiB0aGlzLnJlZ0V4cE9wdGlvbi5jaGVja2VkLFxuICAgICAgICAgICAgY2FzZVNlbnNpdGl2ZTogdGhpcy5jYXNlU2Vuc2l0aXZlT3B0aW9uLmNoZWNrZWQsXG4gICAgICAgICAgICB3aG9sZVdvcmQ6IHRoaXMud2hvbGVXb3JkT3B0aW9uLmNoZWNrZWRcbiAgICAgICAgfSk7XG4gICAgICAgIC8qKkB0eXBlIHthbnl9Ki9cbiAgICAgICAgdmFyIG5vTWF0Y2ggPSAhcmFuZ2UgJiYgdGhpcy5zZWFyY2hJbnB1dC52YWx1ZTtcbiAgICAgICAgZG9tLnNldENzc0NsYXNzKHRoaXMuc2VhcmNoQm94LCBcImFjZV9ub21hdGNoXCIsIG5vTWF0Y2gpO1xuICAgICAgICB0aGlzLmVkaXRvci5fZW1pdChcImZpbmRTZWFyY2hCb3hcIiwgeyBtYXRjaDogIW5vTWF0Y2ggfSk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0KCk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgICByZXBsYWNlKCkge1xuICAgICAgICBpZiAoIXRoaXMuZWRpdG9yLmdldFJlYWRPbmx5KCkpXG4gICAgICAgICAgICB0aGlzLmVkaXRvci5yZXBsYWNlKHRoaXMucmVwbGFjZUlucHV0LnZhbHVlKTtcbiAgICB9ICAgIFxuICAgIHJlcGxhY2VBbmRGaW5kTmV4dCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVkaXRvci5nZXRSZWFkT25seSgpKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5yZXBsYWNlKHRoaXMucmVwbGFjZUlucHV0LnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuZmluZE5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXBsYWNlQWxsKCkge1xuICAgICAgICBpZiAoIXRoaXMuZWRpdG9yLmdldFJlYWRPbmx5KCkpXG4gICAgICAgICAgICB0aGlzLmVkaXRvci5yZXBsYWNlQWxsKHRoaXMucmVwbGFjZUlucHV0LnZhbHVlKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNldFNlYXJjaFJhbmdlKG51bGwpO1xuICAgICAgICB0aGlzLmVkaXRvci5vZmYoXCJjaGFuZ2VTZXNzaW9uXCIsIHRoaXMuc2V0U2Vzc2lvbik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLmVkaXRvci5rZXlCaW5kaW5nLnJlbW92ZUtleWJvYXJkSGFuZGxlcih0aGlzLiRjbG9zZVNlYXJjaEJhcktiKTtcbiAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtpc1JlcGxhY2VdXG4gICAgICovXG4gICAgc2hvdyh2YWx1ZSwgaXNSZXBsYWNlKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lZGl0b3Iub24oXCJjaGFuZ2VTZXNzaW9uXCIsIHRoaXMuc2V0U2Vzc2lvbik7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgdGhpcy5yZXBsYWNlT3B0aW9uLmNoZWNrZWQgPSBpc1JlcGxhY2U7XG4gICAgICAgIFxuICAgICAgICBpZiAodmFsdWUpXG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNlYXJjaElucHV0LmZvY3VzKCk7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXQuc2VsZWN0KCk7XG5cbiAgICAgICAgdGhpcy5lZGl0b3Iua2V5QmluZGluZy5hZGRLZXlib2FyZEhhbmRsZXIodGhpcy4kY2xvc2VTZWFyY2hCYXJLYik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLiRzeW5jT3B0aW9ucyh0cnVlKTtcbiAgICB9XG5cbiAgICBpc0ZvY3VzZWQoKSB7XG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHJldHVybiBlbCA9PSB0aGlzLnNlYXJjaElucHV0IHx8IGVsID09IHRoaXMucmVwbGFjZUlucHV0O1xuICAgIH1cbn1cblxuLy9rZXliaW5kaW5nIG91dHNpZGUgb2YgdGhlIHNlYXJjaGJveFxudmFyICRzZWFyY2hCYXJLYiA9IG5ldyBIYXNoSGFuZGxlcigpO1xuJHNlYXJjaEJhcktiLmJpbmRLZXlzKHtcbiAgICBcIkN0cmwtZnxDb21tYW5kLWZcIjogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgdmFyIGlzUmVwbGFjZSA9IHNiLmlzUmVwbGFjZSA9ICFzYi5pc1JlcGxhY2U7XG4gICAgICAgIHNiLnJlcGxhY2VCb3guc3R5bGUuZGlzcGxheSA9IGlzUmVwbGFjZSA/IFwiXCIgOiBcIm5vbmVcIjtcbiAgICAgICAgc2IucmVwbGFjZU9wdGlvbi5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIHNiLiRzeW5jT3B0aW9ucygpO1xuICAgICAgICBzYi5zZWFyY2hJbnB1dC5mb2N1cygpO1xuICAgIH0sXG4gICAgXCJDdHJsLUh8Q29tbWFuZC1PcHRpb24tRlwiOiBmdW5jdGlvbihzYikge1xuICAgICAgICBpZiAoc2IuZWRpdG9yLmdldFJlYWRPbmx5KCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHNiLnJlcGxhY2VPcHRpb24uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIHNiLiRzeW5jT3B0aW9ucygpO1xuICAgICAgICBzYi5yZXBsYWNlSW5wdXQuZm9jdXMoKTtcbiAgICB9LFxuICAgIFwiQ3RybC1HfENvbW1hbmQtR1wiOiBmdW5jdGlvbihzYikge1xuICAgICAgICBzYi5maW5kTmV4dCgpO1xuICAgIH0sXG4gICAgXCJDdHJsLVNoaWZ0LUd8Q29tbWFuZC1TaGlmdC1HXCI6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIHNiLmZpbmRQcmV2KCk7XG4gICAgfSxcbiAgICBcImVzY1wiOiBmdW5jdGlvbihzYikge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBzYi5oaWRlKCk7fSk7XG4gICAgfSxcbiAgICBcIlJldHVyblwiOiBmdW5jdGlvbihzYikge1xuICAgICAgICBpZiAoc2IuYWN0aXZlSW5wdXQgPT0gc2IucmVwbGFjZUlucHV0KVxuICAgICAgICAgICAgc2IucmVwbGFjZSgpO1xuICAgICAgICBzYi5maW5kTmV4dCgpO1xuICAgIH0sXG4gICAgXCJTaGlmdC1SZXR1cm5cIjogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgaWYgKHNiLmFjdGl2ZUlucHV0ID09IHNiLnJlcGxhY2VJbnB1dClcbiAgICAgICAgICAgIHNiLnJlcGxhY2UoKTtcbiAgICAgICAgc2IuZmluZFByZXYoKTtcbiAgICB9LFxuICAgIFwiQWx0LVJldHVyblwiOiBmdW5jdGlvbihzYikge1xuICAgICAgICBpZiAoc2IuYWN0aXZlSW5wdXQgPT0gc2IucmVwbGFjZUlucHV0KVxuICAgICAgICAgICAgc2IucmVwbGFjZUFsbCgpO1xuICAgICAgICBzYi5maW5kQWxsKCk7XG4gICAgfSxcbiAgICBcIlRhYlwiOiBmdW5jdGlvbihzYikge1xuICAgICAgICAoc2IuYWN0aXZlSW5wdXQgPT0gc2IucmVwbGFjZUlucHV0ID8gc2Iuc2VhcmNoSW5wdXQgOiBzYi5yZXBsYWNlSW5wdXQpLmZvY3VzKCk7XG4gICAgfVxufSk7XG5cbiRzZWFyY2hCYXJLYi5hZGRDb21tYW5kcyhbe1xuICAgIG5hbWU6IFwidG9nZ2xlUmVnZXhwTW9kZVwiLFxuICAgIGJpbmRLZXk6IHt3aW46IFwiQWx0LVJ8QWx0LS9cIiwgbWFjOiBcIkN0cmwtQWx0LVJ8Q3RybC1BbHQtL1wifSxcbiAgICBleGVjOiBmdW5jdGlvbihzYikge1xuICAgICAgICBzYi5yZWdFeHBPcHRpb24uY2hlY2tlZCA9ICFzYi5yZWdFeHBPcHRpb24uY2hlY2tlZDtcbiAgICAgICAgc2IuJHN5bmNPcHRpb25zKCk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwidG9nZ2xlQ2FzZVNlbnNpdGl2ZVwiLFxuICAgIGJpbmRLZXk6IHt3aW46IFwiQWx0LUN8QWx0LUlcIiwgbWFjOiBcIkN0cmwtQWx0LVJ8Q3RybC1BbHQtSVwifSxcbiAgICBleGVjOiBmdW5jdGlvbihzYikge1xuICAgICAgICBzYi5jYXNlU2Vuc2l0aXZlT3B0aW9uLmNoZWNrZWQgPSAhc2IuY2FzZVNlbnNpdGl2ZU9wdGlvbi5jaGVja2VkO1xuICAgICAgICBzYi4kc3luY09wdGlvbnMoKTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogXCJ0b2dnbGVXaG9sZVdvcmRzXCIsXG4gICAgYmluZEtleToge3dpbjogXCJBbHQtQnxBbHQtV1wiLCBtYWM6IFwiQ3RybC1BbHQtQnxDdHJsLUFsdC1XXCJ9LFxuICAgIGV4ZWM6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIHNiLndob2xlV29yZE9wdGlvbi5jaGVja2VkID0gIXNiLndob2xlV29yZE9wdGlvbi5jaGVja2VkO1xuICAgICAgICBzYi4kc3luY09wdGlvbnMoKTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogXCJ0b2dnbGVSZXBsYWNlXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgc2IucmVwbGFjZU9wdGlvbi5jaGVja2VkID0gIXNiLnJlcGxhY2VPcHRpb24uY2hlY2tlZDtcbiAgICAgICAgc2IuJHN5bmNPcHRpb25zKCk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwic2VhcmNoSW5TZWxlY3Rpb25cIixcbiAgICBleGVjOiBmdW5jdGlvbihzYikge1xuICAgICAgICBzYi5zZWFyY2hPcHRpb24uY2hlY2tlZCA9ICFzYi5zZWFyY2hSYW5nZTtcbiAgICAgICAgc2Iuc2V0U2VhcmNoUmFuZ2Uoc2Iuc2VhcmNoT3B0aW9uLmNoZWNrZWQgJiYgc2IuZWRpdG9yLmdldFNlbGVjdGlvblJhbmdlKCkpO1xuICAgICAgICBzYi4kc3luY09wdGlvbnMoKTtcbiAgICB9XG59XSk7XG5cbi8va2V5YmluZGluZyBvdXRzaWRlIG9mIHRoZSBzZWFyY2hib3hcbnZhciAkY2xvc2VTZWFyY2hCYXJLYiA9IG5ldyBIYXNoSGFuZGxlcihbe1xuICAgIGJpbmRLZXk6IFwiRXNjXCIsXG4gICAgbmFtZTogXCJjbG9zZVNlYXJjaEJhclwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICBlZGl0b3Iuc2VhcmNoQm94LmhpZGUoKTtcbiAgICB9XG59XSk7XG5cblNlYXJjaEJveC5wcm90b3R5cGUuJHNlYXJjaEJhcktiID0gJHNlYXJjaEJhcktiO1xuU2VhcmNoQm94LnByb3RvdHlwZS4kY2xvc2VTZWFyY2hCYXJLYiA9ICRjbG9zZVNlYXJjaEJhcktiO1xuXG5leHBvcnRzLlNlYXJjaEJveCA9IFNlYXJjaEJveDtcblxuLyoqXG4gKiBcbiAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzUmVwbGFjZV1cbiAqL1xuZXhwb3J0cy5TZWFyY2ggPSBmdW5jdGlvbihlZGl0b3IsIGlzUmVwbGFjZSkge1xuICAgIHZhciBzYiA9IGVkaXRvci5zZWFyY2hCb3ggfHwgbmV3IFNlYXJjaEJveChlZGl0b3IpO1xuICAgIHNiLnNob3coZWRpdG9yLnNlc3Npb24uZ2V0VGV4dFJhbmdlKCksIGlzUmVwbGFjZSk7XG59O1xuXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVE9ET1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKlxuLSBtb3ZlIHNlYXJjaCBmb3JtIHRvIHRoZSBsZWZ0IGlmIGl0IG1hc2tzIGN1cnJlbnQgd29yZFxuLSBpbmNsdWRlIGFsbCBvcHRpb25zIHRoYXQgc2VhcmNoIGhhcy4gZXg6IHJlZ2V4XG4tIHNlYXJjaGJveC5zZWFyY2hib3ggaXMgbm90IHRoYXQgcHJldHR5LiBXZSBzaG91bGQgaGF2ZSBqdXN0IHNlYXJjaGJveFxuLSBkaXNhYmxlIHByZXYgYnV0dG9uIGlmIGl0IG1ha2VzIHNlbnNlXG4qL1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9