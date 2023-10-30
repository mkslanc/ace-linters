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
    constructor(editor, range, showReplaceForm) {
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
        this.element = div.firstChild;

        this.setSession = this.setSession.bind(this);

        this.$init();
        this.setEditor(editor);
        dom.importCssString(searchboxCss, "ace_searchbox", editor.container);
    }
    
    setEditor(editor) {
        editor.searchBox = this;
        editor.renderer.scroller.appendChild(this.element);
        this.editor = editor;
    }
    
    setSession(e) {
        this.searchRange = null;
        this.$syncOptions(true);
    }

    $initElements(sb) {
        this.searchBox = sb.querySelector(".ace_search_form");
        this.replaceBox = sb.querySelector(".ace_replace_form");
        this.searchOption = sb.querySelector("[action=searchInSelection]");
        this.replaceOption = sb.querySelector("[action=toggleReplace]");
        this.regExpOption = sb.querySelector("[action=toggleRegexpMode]");
        this.caseSensitiveOption = sb.querySelector("[action=toggleCaseSensitive]");
        this.wholeWordOption = sb.querySelector("[action=toggleWholeWords]");
        this.searchInput = this.searchBox.querySelector(".ace_search_field");
        this.replaceInput = this.replaceBox.querySelector(".ace_search_field");
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

    highlight(re) {
        this.editor.session.highlight(re || this.editor.$search.$options.re);
        this.editor.renderer.updateBackMarkers();
    }
    
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
        var noMatch = !range && this.searchInput.value;
        dom.setCssClass(this.searchBox, "ace_nomatch", noMatch);
        this.editor._emit("findSearchBox", { match: !noMatch });
        this.highlight();
        this.updateCounter();
    }
    updateCounter() {
        var editor = this.editor;
        var regex = editor.$search.$options.re;
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
                    regex.lastIndex = last += 1;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjI4OTIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7O0FDaktZOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLFdBQVcsbUJBQU8sQ0FBQyxLQUFhO0FBQ2hDLFlBQVksbUJBQU8sQ0FBQyxLQUFjO0FBQ2xDLG1CQUFtQixtQkFBTyxDQUFDLEtBQWlCO0FBQzVDLGtCQUFrQix1Q0FBK0M7QUFDakUsY0FBYyxtQkFBTyxDQUFDLEtBQWE7QUFDbkMsVUFBVSxnQ0FBd0I7O0FBRWxDOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4Qix5QkFBeUI7QUFDdkQsc0JBQXNCLDZDQUE2QztBQUNuRSxxQkFBcUIseUJBQXlCO0FBQzlDLDJCQUEyQiwrRUFBK0U7QUFDMUcsMEJBQTBCLGdEQUFnRDtBQUMxRSwwQkFBMEIsZ0RBQWdEO0FBQzFFLDBCQUEwQiw4REFBOEQ7QUFDeEY7QUFDQSxxQkFBcUIsMEJBQTBCO0FBQy9DLDJCQUEyQixpRkFBaUY7QUFDNUcsMEJBQTBCLHFEQUFxRDtBQUMvRSwwQkFBMEIsNkNBQTZDO0FBQ3ZFO0FBQ0EscUJBQXFCLDRCQUE0QjtBQUNqRCwwQkFBMEI7QUFDMUIsdUNBQXVDLGdCQUFnQixjQUFjLEVBQUU7QUFDdkUsMEJBQTBCLDRCQUE0QjtBQUN0RCwwQkFBMEIsNkVBQTZFO0FBQ3ZHLDBCQUEwQix1RkFBdUY7QUFDakgsMEJBQTBCLGlGQUFpRjtBQUMzRywwQkFBMEIsb0ZBQW9GO0FBQzlHO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsNkNBQTZDLGlCQUFpQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsNkNBQTZDLGlCQUFpQjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLGdDQUFnQyxXQUFXO0FBQzNDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxjQUFjLGlEQUFpRDtBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBLGNBQWMsaURBQWlEO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0EsY0FBYyxpREFBaUQ7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBOztBQUVBLGlCQUFpQjs7QUFFakIsY0FBYztBQUNkO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3NlYXJjaGJveC1jc3MuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3NlYXJjaGJveC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGBcblxuLyogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKiBFZGl0b3IgU2VhcmNoIEZvcm1cbiAqIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xuLmFjZV9zZWFyY2gge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XG4gICAgY29sb3I6ICM2NjY7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NiY2JjYjtcbiAgICBib3JkZXItdG9wOiAwIG5vbmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBtYXJnaW46IDA7XG4gICAgcGFkZGluZzogNHB4IDZweCAwIDRweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHotaW5kZXg6IDk5O1xuICAgIHdoaXRlLXNwYWNlOiBub3JtYWw7XG59XG4uYWNlX3NlYXJjaC5sZWZ0IHtcbiAgICBib3JkZXItbGVmdDogMCBub25lO1xuICAgIGJvcmRlci1yYWRpdXM6IDBweCAwcHggNXB4IDBweDtcbiAgICBsZWZ0OiAwO1xufVxuLmFjZV9zZWFyY2gucmlnaHQge1xuICAgIGJvcmRlci1yYWRpdXM6IDBweCAwcHggMHB4IDVweDtcbiAgICBib3JkZXItcmlnaHQ6IDAgbm9uZTtcbiAgICByaWdodDogMDtcbn1cblxuLmFjZV9zZWFyY2hfZm9ybSwgLmFjZV9yZXBsYWNlX2Zvcm0ge1xuICAgIG1hcmdpbjogMCAyMHB4IDRweCAwO1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgbGluZS1oZWlnaHQ6IDEuOTtcbn1cbi5hY2VfcmVwbGFjZV9mb3JtIHtcbiAgICBtYXJnaW4tcmlnaHQ6IDA7XG59XG4uYWNlX3NlYXJjaF9mb3JtLmFjZV9ub21hdGNoIHtcbiAgICBvdXRsaW5lOiAxcHggc29saWQgcmVkO1xufVxuXG4uYWNlX3NlYXJjaF9maWVsZCB7XG4gICAgYm9yZGVyLXJhZGl1czogM3B4IDAgMCAzcHg7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gICAgY29sb3I6IGJsYWNrO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNjYmNiY2I7XG4gICAgYm9yZGVyLXJpZ2h0OiAwIG5vbmU7XG4gICAgb3V0bGluZTogMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGZvbnQtc2l6ZTogaW5oZXJpdDtcbiAgICBtYXJnaW46IDA7XG4gICAgbGluZS1oZWlnaHQ6IGluaGVyaXQ7XG4gICAgcGFkZGluZzogMCA2cHg7XG4gICAgbWluLXdpZHRoOiAxN2VtO1xuICAgIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gICAgbWluLWhlaWdodDogMS44ZW07XG4gICAgYm94LXNpemluZzogY29udGVudC1ib3g7XG59XG4uYWNlX3NlYXJjaGJ0biB7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI2NiY2JjYjtcbiAgICBsaW5lLWhlaWdodDogaW5oZXJpdDtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgcGFkZGluZzogMCA2cHg7XG4gICAgYmFja2dyb3VuZDogI2ZmZjtcbiAgICBib3JkZXItcmlnaHQ6IDAgbm9uZTtcbiAgICBib3JkZXItbGVmdDogMXB4IHNvbGlkICNkY2RjZGM7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIG1hcmdpbjogMDtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgY29sb3I6ICM2NjY7XG59XG4uYWNlX3NlYXJjaGJ0bjpsYXN0LWNoaWxkIHtcbiAgICBib3JkZXItcmFkaXVzOiAwIDNweCAzcHggMDtcbiAgICBib3JkZXItcmlnaHQ6IDFweCBzb2xpZCAjY2JjYmNiO1xufVxuLmFjZV9zZWFyY2hidG46ZGlzYWJsZWQge1xuICAgIGJhY2tncm91bmQ6IG5vbmU7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xufVxuLmFjZV9zZWFyY2hidG46aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNlZWYxZjY7XG59XG4uYWNlX3NlYXJjaGJ0bi5wcmV2LCAuYWNlX3NlYXJjaGJ0bi5uZXh0IHtcbiAgICAgcGFkZGluZzogMHB4IDAuN2VtXG59XG4uYWNlX3NlYXJjaGJ0bi5wcmV2OmFmdGVyLCAuYWNlX3NlYXJjaGJ0bi5uZXh0OmFmdGVyIHtcbiAgICAgY29udGVudDogXCJcIjtcbiAgICAgYm9yZGVyOiBzb2xpZCAycHggIzg4ODtcbiAgICAgd2lkdGg6IDAuNWVtO1xuICAgICBoZWlnaHQ6IDAuNWVtO1xuICAgICBib3JkZXItd2lkdGg6ICAycHggMCAwIDJweDtcbiAgICAgZGlzcGxheTppbmxpbmUtYmxvY2s7XG4gICAgIHRyYW5zZm9ybTogcm90YXRlKC00NWRlZyk7XG59XG4uYWNlX3NlYXJjaGJ0bi5uZXh0OmFmdGVyIHtcbiAgICAgYm9yZGVyLXdpZHRoOiAwIDJweCAycHggMCA7XG59XG4uYWNlX3NlYXJjaGJ0bl9jbG9zZSB7XG4gICAgYmFja2dyb3VuZDogdXJsKGRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQTRBQUFBY0NBWUFBQUJSVm81QkFBQUFaMGxFUVZSNDJ1MlNVUXJBTUFoRHZhem44T2paQmlsQ2tZVlZ4aWlzOEg0Q1QwVnJBSmI0V0hUM0M1eFUyYTJJUVpYSmppUUlSTWRrRW9KNVEyeU1xcGZESW8rWFk0azZoK1lYT3lLcVRJajVSRWF4bG9OQWQweGlLbUF0c1RIcVc4c1IyVzVmN2dDdTVuV0ZVcFZqWndBQUFBQkpSVTVFcmtKZ2dnPT0pIG5vLXJlcGVhdCA1MCUgMDtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgYm9yZGVyOiAwIG5vbmU7XG4gICAgY29sb3I6ICM2NTY1NjU7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIGZvbnQ6IDE2cHgvMTZweCBBcmlhbDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGhlaWdodDogMTRweDtcbiAgICB3aWR0aDogMTRweDtcbiAgICB0b3A6IDlweDtcbiAgICByaWdodDogN3B4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbn1cbi5hY2Vfc2VhcmNoYnRuX2Nsb3NlOmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjNjU2NTY1O1xuICAgIGJhY2tncm91bmQtcG9zaXRpb246IDUwJSAxMDAlO1xuICAgIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmFjZV9idXR0b24ge1xuICAgIG1hcmdpbi1sZWZ0OiAycHg7XG4gICAgY3Vyc29yOiBwb2ludGVyO1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtby11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBvcGFjaXR5OiAwLjc7XG4gICAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgxMDAsMTAwLDEwMCwwLjIzKTtcbiAgICBwYWRkaW5nOiAxcHg7XG4gICAgYm94LXNpemluZzogICAgYm9yZGVyLWJveCFpbXBvcnRhbnQ7XG4gICAgY29sb3I6IGJsYWNrO1xufVxuXG4uYWNlX2J1dHRvbjpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2VlZTtcbiAgICBvcGFjaXR5OjE7XG59XG4uYWNlX2J1dHRvbjphY3RpdmUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNkZGQ7XG59XG5cbi5hY2VfYnV0dG9uLmNoZWNrZWQge1xuICAgIGJvcmRlci1jb2xvcjogIzMzOTlmZjtcbiAgICBvcGFjaXR5OjE7XG59XG5cbi5hY2Vfc2VhcmNoX29wdGlvbnN7XG4gICAgbWFyZ2luLWJvdHRvbTogM3B4O1xuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xuICAgIC13ZWJraXQtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgLW1vei11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtby11c2VyLXNlbGVjdDogbm9uZTtcbiAgICAtbXMtdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgdXNlci1zZWxlY3Q6IG5vbmU7XG4gICAgY2xlYXI6IGJvdGg7XG59XG5cbi5hY2Vfc2VhcmNoX2NvdW50ZXIge1xuICAgIGZsb2F0OiBsZWZ0O1xuICAgIGZvbnQtZmFtaWx5OiBhcmlhbDtcbiAgICBwYWRkaW5nOiAwIDhweDtcbn1gO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBkb20gPSByZXF1aXJlKFwiLi4vbGliL2RvbVwiKTtcbnZhciBsYW5nID0gcmVxdWlyZShcIi4uL2xpYi9sYW5nXCIpO1xudmFyIGV2ZW50ID0gcmVxdWlyZShcIi4uL2xpYi9ldmVudFwiKTtcbnZhciBzZWFyY2hib3hDc3MgPSByZXF1aXJlKFwiLi9zZWFyY2hib3gtY3NzXCIpO1xudmFyIEhhc2hIYW5kbGVyID0gcmVxdWlyZShcIi4uL2tleWJvYXJkL2hhc2hfaGFuZGxlclwiKS5IYXNoSGFuZGxlcjtcbnZhciBrZXlVdGlsID0gcmVxdWlyZShcIi4uL2xpYi9rZXlzXCIpO1xudmFyIG5scyA9IHJlcXVpcmUoXCIuLi9jb25maWdcIikubmxzO1xuXG52YXIgTUFYX0NPVU5UID0gOTk5O1xuXG5kb20uaW1wb3J0Q3NzU3RyaW5nKHNlYXJjaGJveENzcywgXCJhY2Vfc2VhcmNoYm94XCIsIGZhbHNlKTtcblxuY2xhc3MgU2VhcmNoQm94IHtcbiAgICBjb25zdHJ1Y3RvcihlZGl0b3IsIHJhbmdlLCBzaG93UmVwbGFjZUZvcm0pIHtcbiAgICAgICAgdmFyIGRpdiA9IGRvbS5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBkb20uYnVpbGREb20oW1wiZGl2XCIsIHtjbGFzczpcImFjZV9zZWFyY2ggcmlnaHRcIn0sXG4gICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwiaGlkZVwiLCBjbGFzczogXCJhY2Vfc2VhcmNoYnRuX2Nsb3NlXCJ9XSxcbiAgICAgICAgICAgIFtcImRpdlwiLCB7Y2xhc3M6IFwiYWNlX3NlYXJjaF9mb3JtXCJ9LFxuICAgICAgICAgICAgICAgIFtcImlucHV0XCIsIHtjbGFzczogXCJhY2Vfc2VhcmNoX2ZpZWxkXCIsIHBsYWNlaG9sZGVyOiBubHMoXCJTZWFyY2ggZm9yXCIpLCBzcGVsbGNoZWNrOiBcImZhbHNlXCJ9XSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwiZmluZFByZXZcIiwgY2xhc3M6IFwiYWNlX3NlYXJjaGJ0biBwcmV2XCJ9LCBcIlxcdTIwMGJcIl0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcImZpbmROZXh0XCIsIGNsYXNzOiBcImFjZV9zZWFyY2hidG4gbmV4dFwifSwgXCJcXHUyMDBiXCJdLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJmaW5kQWxsXCIsIGNsYXNzOiBcImFjZV9zZWFyY2hidG5cIiwgdGl0bGU6IFwiQWx0LUVudGVyXCJ9LCBubHMoXCJBbGxcIildXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1wiZGl2XCIsIHtjbGFzczogXCJhY2VfcmVwbGFjZV9mb3JtXCJ9LFxuICAgICAgICAgICAgICAgIFtcImlucHV0XCIsIHtjbGFzczogXCJhY2Vfc2VhcmNoX2ZpZWxkXCIsIHBsYWNlaG9sZGVyOiBubHMoXCJSZXBsYWNlIHdpdGhcIiksIHNwZWxsY2hlY2s6IFwiZmFsc2VcIn1dLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJyZXBsYWNlQW5kRmluZE5leHRcIiwgY2xhc3M6IFwiYWNlX3NlYXJjaGJ0blwifSwgbmxzKFwiUmVwbGFjZVwiKV0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcInJlcGxhY2VBbGxcIiwgY2xhc3M6IFwiYWNlX3NlYXJjaGJ0blwifSwgbmxzKFwiQWxsXCIpXVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIFtcImRpdlwiLCB7Y2xhc3M6IFwiYWNlX3NlYXJjaF9vcHRpb25zXCJ9LFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJ0b2dnbGVSZXBsYWNlXCIsIGNsYXNzOiBcImFjZV9idXR0b25cIiwgdGl0bGU6IG5scyhcIlRvZ2dsZSBSZXBsYWNlIG1vZGVcIiksXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiBcImZsb2F0OmxlZnQ7bWFyZ2luLXRvcDotMnB4O3BhZGRpbmc6MCA1cHg7XCJ9LCBcIitcIl0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7Y2xhc3M6IFwiYWNlX3NlYXJjaF9jb3VudGVyXCJ9XSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwidG9nZ2xlUmVnZXhwTW9kZVwiLCBjbGFzczogXCJhY2VfYnV0dG9uXCIsIHRpdGxlOiBubHMoXCJSZWdFeHAgU2VhcmNoXCIpfSwgXCIuKlwiXSxcbiAgICAgICAgICAgICAgICBbXCJzcGFuXCIsIHthY3Rpb246IFwidG9nZ2xlQ2FzZVNlbnNpdGl2ZVwiLCBjbGFzczogXCJhY2VfYnV0dG9uXCIsIHRpdGxlOiBubHMoXCJDYXNlU2Vuc2l0aXZlIFNlYXJjaFwiKX0sIFwiQWFcIl0sXG4gICAgICAgICAgICAgICAgW1wic3BhblwiLCB7YWN0aW9uOiBcInRvZ2dsZVdob2xlV29yZHNcIiwgY2xhc3M6IFwiYWNlX2J1dHRvblwiLCB0aXRsZTogbmxzKFwiV2hvbGUgV29yZCBTZWFyY2hcIil9LCBcIlxcXFxiXCJdLFxuICAgICAgICAgICAgICAgIFtcInNwYW5cIiwge2FjdGlvbjogXCJzZWFyY2hJblNlbGVjdGlvblwiLCBjbGFzczogXCJhY2VfYnV0dG9uXCIsIHRpdGxlOiBubHMoXCJTZWFyY2ggSW4gU2VsZWN0aW9uXCIpfSwgXCJTXCJdXG4gICAgICAgICAgICBdXG4gICAgICAgIF0sIGRpdik7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGRpdi5maXJzdENoaWxkO1xuXG4gICAgICAgIHRoaXMuc2V0U2Vzc2lvbiA9IHRoaXMuc2V0U2Vzc2lvbi5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuJGluaXQoKTtcbiAgICAgICAgdGhpcy5zZXRFZGl0b3IoZWRpdG9yKTtcbiAgICAgICAgZG9tLmltcG9ydENzc1N0cmluZyhzZWFyY2hib3hDc3MsIFwiYWNlX3NlYXJjaGJveFwiLCBlZGl0b3IuY29udGFpbmVyKTtcbiAgICB9XG4gICAgXG4gICAgc2V0RWRpdG9yKGVkaXRvcikge1xuICAgICAgICBlZGl0b3Iuc2VhcmNoQm94ID0gdGhpcztcbiAgICAgICAgZWRpdG9yLnJlbmRlcmVyLnNjcm9sbGVyLmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yO1xuICAgIH1cbiAgICBcbiAgICBzZXRTZXNzaW9uKGUpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hSYW5nZSA9IG51bGw7XG4gICAgICAgIHRoaXMuJHN5bmNPcHRpb25zKHRydWUpO1xuICAgIH1cblxuICAgICRpbml0RWxlbWVudHMoc2IpIHtcbiAgICAgICAgdGhpcy5zZWFyY2hCb3ggPSBzYi5xdWVyeVNlbGVjdG9yKFwiLmFjZV9zZWFyY2hfZm9ybVwiKTtcbiAgICAgICAgdGhpcy5yZXBsYWNlQm94ID0gc2IucXVlcnlTZWxlY3RvcihcIi5hY2VfcmVwbGFjZV9mb3JtXCIpO1xuICAgICAgICB0aGlzLnNlYXJjaE9wdGlvbiA9IHNiLnF1ZXJ5U2VsZWN0b3IoXCJbYWN0aW9uPXNlYXJjaEluU2VsZWN0aW9uXVwiKTtcbiAgICAgICAgdGhpcy5yZXBsYWNlT3B0aW9uID0gc2IucXVlcnlTZWxlY3RvcihcIlthY3Rpb249dG9nZ2xlUmVwbGFjZV1cIik7XG4gICAgICAgIHRoaXMucmVnRXhwT3B0aW9uID0gc2IucXVlcnlTZWxlY3RvcihcIlthY3Rpb249dG9nZ2xlUmVnZXhwTW9kZV1cIik7XG4gICAgICAgIHRoaXMuY2FzZVNlbnNpdGl2ZU9wdGlvbiA9IHNiLnF1ZXJ5U2VsZWN0b3IoXCJbYWN0aW9uPXRvZ2dsZUNhc2VTZW5zaXRpdmVdXCIpO1xuICAgICAgICB0aGlzLndob2xlV29yZE9wdGlvbiA9IHNiLnF1ZXJ5U2VsZWN0b3IoXCJbYWN0aW9uPXRvZ2dsZVdob2xlV29yZHNdXCIpO1xuICAgICAgICB0aGlzLnNlYXJjaElucHV0ID0gdGhpcy5zZWFyY2hCb3gucXVlcnlTZWxlY3RvcihcIi5hY2Vfc2VhcmNoX2ZpZWxkXCIpO1xuICAgICAgICB0aGlzLnJlcGxhY2VJbnB1dCA9IHRoaXMucmVwbGFjZUJveC5xdWVyeVNlbGVjdG9yKFwiLmFjZV9zZWFyY2hfZmllbGRcIik7XG4gICAgICAgIHRoaXMuc2VhcmNoQ291bnRlciA9IHNiLnF1ZXJ5U2VsZWN0b3IoXCIuYWNlX3NlYXJjaF9jb3VudGVyXCIpO1xuICAgIH1cbiAgICBcbiAgICAkaW5pdCgpIHtcbiAgICAgICAgdmFyIHNiID0gdGhpcy5lbGVtZW50O1xuICAgICAgICBcbiAgICAgICAgdGhpcy4kaW5pdEVsZW1lbnRzKHNiKTtcbiAgICAgICAgXG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGV2ZW50LmFkZExpc3RlbmVyKHNiLCBcIm1vdXNlZG93blwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgX3RoaXMuYWN0aXZlSW5wdXQuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sIDApO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgZXZlbnQuYWRkTGlzdGVuZXIoc2IsIFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIHQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQ7XG4gICAgICAgICAgICB2YXIgYWN0aW9uID0gdC5nZXRBdHRyaWJ1dGUoXCJhY3Rpb25cIik7XG4gICAgICAgICAgICBpZiAoYWN0aW9uICYmIF90aGlzW2FjdGlvbl0pXG4gICAgICAgICAgICAgICAgX3RoaXNbYWN0aW9uXSgpO1xuICAgICAgICAgICAgZWxzZSBpZiAoX3RoaXMuJHNlYXJjaEJhcktiLmNvbW1hbmRzW2FjdGlvbl0pXG4gICAgICAgICAgICAgICAgX3RoaXMuJHNlYXJjaEJhcktiLmNvbW1hbmRzW2FjdGlvbl0uZXhlYyhfdGhpcyk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGV2ZW50LmFkZENvbW1hbmRLZXlMaXN0ZW5lcihzYiwgZnVuY3Rpb24oZSwgaGFzaElkLCBrZXlDb2RlKSB7XG4gICAgICAgICAgICB2YXIga2V5U3RyaW5nID0ga2V5VXRpbC5rZXlDb2RlVG9TdHJpbmcoa2V5Q29kZSk7XG4gICAgICAgICAgICB2YXIgY29tbWFuZCA9IF90aGlzLiRzZWFyY2hCYXJLYi5maW5kS2V5Q29tbWFuZChoYXNoSWQsIGtleVN0cmluZyk7XG4gICAgICAgICAgICBpZiAoY29tbWFuZCAmJiBjb21tYW5kLmV4ZWMpIHtcbiAgICAgICAgICAgICAgICBjb21tYW5kLmV4ZWMoX3RoaXMpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BFdmVudChlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy4kb25DaGFuZ2UgPSBsYW5nLmRlbGF5ZWRDYWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMuZmluZChmYWxzZSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBldmVudC5hZGRMaXN0ZW5lcih0aGlzLnNlYXJjaElucHV0LCBcImlucHV0XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgX3RoaXMuJG9uQ2hhbmdlLnNjaGVkdWxlKDIwKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGV2ZW50LmFkZExpc3RlbmVyKHRoaXMuc2VhcmNoSW5wdXQsIFwiZm9jdXNcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy5hY3RpdmVJbnB1dCA9IF90aGlzLnNlYXJjaElucHV0O1xuICAgICAgICAgICAgX3RoaXMuc2VhcmNoSW5wdXQudmFsdWUgJiYgX3RoaXMuaGlnaGxpZ2h0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBldmVudC5hZGRMaXN0ZW5lcih0aGlzLnJlcGxhY2VJbnB1dCwgXCJmb2N1c1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF90aGlzLmFjdGl2ZUlucHV0ID0gX3RoaXMucmVwbGFjZUlucHV0O1xuICAgICAgICAgICAgX3RoaXMuc2VhcmNoSW5wdXQudmFsdWUgJiYgX3RoaXMuaGlnaGxpZ2h0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBzZXRTZWFyY2hSYW5nZShyYW5nZSkge1xuICAgICAgICB0aGlzLnNlYXJjaFJhbmdlID0gcmFuZ2U7XG4gICAgICAgIGlmIChyYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5zZWFyY2hSYW5nZU1hcmtlciA9IHRoaXMuZWRpdG9yLnNlc3Npb24uYWRkTWFya2VyKHJhbmdlLCBcImFjZV9hY3RpdmUtbGluZVwiKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlYXJjaFJhbmdlTWFya2VyKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5zZXNzaW9uLnJlbW92ZU1hcmtlcih0aGlzLnNlYXJjaFJhbmdlTWFya2VyKTtcbiAgICAgICAgICAgIHRoaXMuc2VhcmNoUmFuZ2VNYXJrZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJHN5bmNPcHRpb25zKHByZXZlbnRTY3JvbGwpIHtcbiAgICAgICAgZG9tLnNldENzc0NsYXNzKHRoaXMucmVwbGFjZU9wdGlvbiwgXCJjaGVja2VkXCIsIHRoaXMuc2VhcmNoUmFuZ2UpO1xuICAgICAgICBkb20uc2V0Q3NzQ2xhc3ModGhpcy5zZWFyY2hPcHRpb24sIFwiY2hlY2tlZFwiLCB0aGlzLnNlYXJjaE9wdGlvbi5jaGVja2VkKTtcbiAgICAgICAgdGhpcy5yZXBsYWNlT3B0aW9uLnRleHRDb250ZW50ID0gdGhpcy5yZXBsYWNlT3B0aW9uLmNoZWNrZWQgPyBcIi1cIiA6IFwiK1wiO1xuICAgICAgICBkb20uc2V0Q3NzQ2xhc3ModGhpcy5yZWdFeHBPcHRpb24sIFwiY2hlY2tlZFwiLCB0aGlzLnJlZ0V4cE9wdGlvbi5jaGVja2VkKTtcbiAgICAgICAgZG9tLnNldENzc0NsYXNzKHRoaXMud2hvbGVXb3JkT3B0aW9uLCBcImNoZWNrZWRcIiwgdGhpcy53aG9sZVdvcmRPcHRpb24uY2hlY2tlZCk7XG4gICAgICAgIGRvbS5zZXRDc3NDbGFzcyh0aGlzLmNhc2VTZW5zaXRpdmVPcHRpb24sIFwiY2hlY2tlZFwiLCB0aGlzLmNhc2VTZW5zaXRpdmVPcHRpb24uY2hlY2tlZCk7XG4gICAgICAgIHZhciByZWFkT25seSA9IHRoaXMuZWRpdG9yLmdldFJlYWRPbmx5KCk7XG4gICAgICAgIHRoaXMucmVwbGFjZU9wdGlvbi5zdHlsZS5kaXNwbGF5ID0gcmVhZE9ubHkgPyBcIm5vbmVcIiA6IFwiXCI7XG4gICAgICAgIHRoaXMucmVwbGFjZUJveC5zdHlsZS5kaXNwbGF5ID0gdGhpcy5yZXBsYWNlT3B0aW9uLmNoZWNrZWQgJiYgIXJlYWRPbmx5ID8gXCJcIiA6IFwibm9uZVwiO1xuICAgICAgICB0aGlzLmZpbmQoZmFsc2UsIGZhbHNlLCBwcmV2ZW50U2Nyb2xsKTtcbiAgICB9XG5cbiAgICBoaWdobGlnaHQocmUpIHtcbiAgICAgICAgdGhpcy5lZGl0b3Iuc2Vzc2lvbi5oaWdobGlnaHQocmUgfHwgdGhpcy5lZGl0b3IuJHNlYXJjaC4kb3B0aW9ucy5yZSk7XG4gICAgICAgIHRoaXMuZWRpdG9yLnJlbmRlcmVyLnVwZGF0ZUJhY2tNYXJrZXJzKCk7XG4gICAgfVxuICAgIFxuICAgIGZpbmQoc2tpcEN1cnJlbnQsIGJhY2t3YXJkcywgcHJldmVudFNjcm9sbCkge1xuICAgICAgICB2YXIgcmFuZ2UgPSB0aGlzLmVkaXRvci5maW5kKHRoaXMuc2VhcmNoSW5wdXQudmFsdWUsIHtcbiAgICAgICAgICAgIHNraXBDdXJyZW50OiBza2lwQ3VycmVudCxcbiAgICAgICAgICAgIGJhY2t3YXJkczogYmFja3dhcmRzLFxuICAgICAgICAgICAgd3JhcDogdHJ1ZSxcbiAgICAgICAgICAgIHJlZ0V4cDogdGhpcy5yZWdFeHBPcHRpb24uY2hlY2tlZCxcbiAgICAgICAgICAgIGNhc2VTZW5zaXRpdmU6IHRoaXMuY2FzZVNlbnNpdGl2ZU9wdGlvbi5jaGVja2VkLFxuICAgICAgICAgICAgd2hvbGVXb3JkOiB0aGlzLndob2xlV29yZE9wdGlvbi5jaGVja2VkLFxuICAgICAgICAgICAgcHJldmVudFNjcm9sbDogcHJldmVudFNjcm9sbCxcbiAgICAgICAgICAgIHJhbmdlOiB0aGlzLnNlYXJjaFJhbmdlXG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgbm9NYXRjaCA9ICFyYW5nZSAmJiB0aGlzLnNlYXJjaElucHV0LnZhbHVlO1xuICAgICAgICBkb20uc2V0Q3NzQ2xhc3ModGhpcy5zZWFyY2hCb3gsIFwiYWNlX25vbWF0Y2hcIiwgbm9NYXRjaCk7XG4gICAgICAgIHRoaXMuZWRpdG9yLl9lbWl0KFwiZmluZFNlYXJjaEJveFwiLCB7IG1hdGNoOiAhbm9NYXRjaCB9KTtcbiAgICAgICAgdGhpcy5oaWdobGlnaHQoKTtcbiAgICAgICAgdGhpcy51cGRhdGVDb3VudGVyKCk7XG4gICAgfVxuICAgIHVwZGF0ZUNvdW50ZXIoKSB7XG4gICAgICAgIHZhciBlZGl0b3IgPSB0aGlzLmVkaXRvcjtcbiAgICAgICAgdmFyIHJlZ2V4ID0gZWRpdG9yLiRzZWFyY2guJG9wdGlvbnMucmU7XG4gICAgICAgIHZhciBhbGwgPSAwO1xuICAgICAgICB2YXIgYmVmb3JlID0gMDtcbiAgICAgICAgaWYgKHJlZ2V4KSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnNlYXJjaFJhbmdlXG4gICAgICAgICAgICAgICAgPyBlZGl0b3Iuc2Vzc2lvbi5nZXRUZXh0UmFuZ2UodGhpcy5zZWFyY2hSYW5nZSlcbiAgICAgICAgICAgICAgICA6IGVkaXRvci5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgb2Zmc2V0ID0gZWRpdG9yLnNlc3Npb24uZG9jLnBvc2l0aW9uVG9JbmRleChlZGl0b3Iuc2VsZWN0aW9uLmFuY2hvcik7XG4gICAgICAgICAgICBpZiAodGhpcy5zZWFyY2hSYW5nZSlcbiAgICAgICAgICAgICAgICBvZmZzZXQgLT0gZWRpdG9yLnNlc3Npb24uZG9jLnBvc2l0aW9uVG9JbmRleCh0aGlzLnNlYXJjaFJhbmdlLnN0YXJ0KTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBsYXN0ID0gcmVnZXgubGFzdEluZGV4ID0gMDtcbiAgICAgICAgICAgIHZhciBtO1xuICAgICAgICAgICAgd2hpbGUgKChtID0gcmVnZXguZXhlYyh2YWx1ZSkpKSB7XG4gICAgICAgICAgICAgICAgYWxsKys7XG4gICAgICAgICAgICAgICAgbGFzdCA9IG0uaW5kZXg7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3QgPD0gb2Zmc2V0KVxuICAgICAgICAgICAgICAgICAgICBiZWZvcmUrKztcbiAgICAgICAgICAgICAgICBpZiAoYWxsID4gTUFYX0NPVU5UKVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBpZiAoIW1bMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmVnZXgubGFzdEluZGV4ID0gbGFzdCArPSAxO1xuICAgICAgICAgICAgICAgICAgICBpZiAobGFzdCA+PSB2YWx1ZS5sZW5ndGgpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZWFyY2hDb3VudGVyLnRleHRDb250ZW50ID0gbmxzKFwiJDAgb2YgJDFcIiwgW2JlZm9yZSAsIChhbGwgPiBNQVhfQ09VTlQgPyBNQVhfQ09VTlQgKyBcIitcIiA6IGFsbCldKTtcbiAgICB9XG4gICAgZmluZE5leHQoKSB7XG4gICAgICAgIHRoaXMuZmluZCh0cnVlLCBmYWxzZSk7XG4gICAgfVxuICAgIGZpbmRQcmV2KCkge1xuICAgICAgICB0aGlzLmZpbmQodHJ1ZSwgdHJ1ZSk7XG4gICAgfVxuICAgIGZpbmRBbGwoKXtcbiAgICAgICAgdmFyIHJhbmdlID0gdGhpcy5lZGl0b3IuZmluZEFsbCh0aGlzLnNlYXJjaElucHV0LnZhbHVlLCB7ICAgICAgICAgICAgXG4gICAgICAgICAgICByZWdFeHA6IHRoaXMucmVnRXhwT3B0aW9uLmNoZWNrZWQsXG4gICAgICAgICAgICBjYXNlU2Vuc2l0aXZlOiB0aGlzLmNhc2VTZW5zaXRpdmVPcHRpb24uY2hlY2tlZCxcbiAgICAgICAgICAgIHdob2xlV29yZDogdGhpcy53aG9sZVdvcmRPcHRpb24uY2hlY2tlZFxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIG5vTWF0Y2ggPSAhcmFuZ2UgJiYgdGhpcy5zZWFyY2hJbnB1dC52YWx1ZTtcbiAgICAgICAgZG9tLnNldENzc0NsYXNzKHRoaXMuc2VhcmNoQm94LCBcImFjZV9ub21hdGNoXCIsIG5vTWF0Y2gpO1xuICAgICAgICB0aGlzLmVkaXRvci5fZW1pdChcImZpbmRTZWFyY2hCb3hcIiwgeyBtYXRjaDogIW5vTWF0Y2ggfSk7XG4gICAgICAgIHRoaXMuaGlnaGxpZ2h0KCk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cbiAgICByZXBsYWNlKCkge1xuICAgICAgICBpZiAoIXRoaXMuZWRpdG9yLmdldFJlYWRPbmx5KCkpXG4gICAgICAgICAgICB0aGlzLmVkaXRvci5yZXBsYWNlKHRoaXMucmVwbGFjZUlucHV0LnZhbHVlKTtcbiAgICB9ICAgIFxuICAgIHJlcGxhY2VBbmRGaW5kTmV4dCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmVkaXRvci5nZXRSZWFkT25seSgpKSB7XG4gICAgICAgICAgICB0aGlzLmVkaXRvci5yZXBsYWNlKHRoaXMucmVwbGFjZUlucHV0LnZhbHVlKTtcbiAgICAgICAgICAgIHRoaXMuZmluZE5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXBsYWNlQWxsKCkge1xuICAgICAgICBpZiAoIXRoaXMuZWRpdG9yLmdldFJlYWRPbmx5KCkpXG4gICAgICAgICAgICB0aGlzLmVkaXRvci5yZXBsYWNlQWxsKHRoaXMucmVwbGFjZUlucHV0LnZhbHVlKTtcbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNldFNlYXJjaFJhbmdlKG51bGwpO1xuICAgICAgICB0aGlzLmVkaXRvci5vZmYoXCJjaGFuZ2VTZXNzaW9uXCIsIHRoaXMuc2V0U2Vzc2lvbik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLmVsZW1lbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB0aGlzLmVkaXRvci5rZXlCaW5kaW5nLnJlbW92ZUtleWJvYXJkSGFuZGxlcih0aGlzLiRjbG9zZVNlYXJjaEJhcktiKTtcbiAgICAgICAgdGhpcy5lZGl0b3IuZm9jdXMoKTtcbiAgICB9XG4gICAgc2hvdyh2YWx1ZSwgaXNSZXBsYWNlKSB7XG4gICAgICAgIHRoaXMuYWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5lZGl0b3Iub24oXCJjaGFuZ2VTZXNzaW9uXCIsIHRoaXMuc2V0U2Vzc2lvbik7XG4gICAgICAgIHRoaXMuZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgdGhpcy5yZXBsYWNlT3B0aW9uLmNoZWNrZWQgPSBpc1JlcGxhY2U7XG4gICAgICAgIFxuICAgICAgICBpZiAodmFsdWUpXG4gICAgICAgICAgICB0aGlzLnNlYXJjaElucHV0LnZhbHVlID0gdmFsdWU7XG4gICAgICAgIFxuICAgICAgICB0aGlzLnNlYXJjaElucHV0LmZvY3VzKCk7XG4gICAgICAgIHRoaXMuc2VhcmNoSW5wdXQuc2VsZWN0KCk7XG5cbiAgICAgICAgdGhpcy5lZGl0b3Iua2V5QmluZGluZy5hZGRLZXlib2FyZEhhbmRsZXIodGhpcy4kY2xvc2VTZWFyY2hCYXJLYik7XG4gICAgICAgIFxuICAgICAgICB0aGlzLiRzeW5jT3B0aW9ucyh0cnVlKTtcbiAgICB9XG5cbiAgICBpc0ZvY3VzZWQoKSB7XG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgIHJldHVybiBlbCA9PSB0aGlzLnNlYXJjaElucHV0IHx8IGVsID09IHRoaXMucmVwbGFjZUlucHV0O1xuICAgIH1cbn1cblxuLy9rZXliaW5kaW5nIG91dHNpZGUgb2YgdGhlIHNlYXJjaGJveFxudmFyICRzZWFyY2hCYXJLYiA9IG5ldyBIYXNoSGFuZGxlcigpO1xuJHNlYXJjaEJhcktiLmJpbmRLZXlzKHtcbiAgICBcIkN0cmwtZnxDb21tYW5kLWZcIjogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgdmFyIGlzUmVwbGFjZSA9IHNiLmlzUmVwbGFjZSA9ICFzYi5pc1JlcGxhY2U7XG4gICAgICAgIHNiLnJlcGxhY2VCb3guc3R5bGUuZGlzcGxheSA9IGlzUmVwbGFjZSA/IFwiXCIgOiBcIm5vbmVcIjtcbiAgICAgICAgc2IucmVwbGFjZU9wdGlvbi5jaGVja2VkID0gZmFsc2U7XG4gICAgICAgIHNiLiRzeW5jT3B0aW9ucygpO1xuICAgICAgICBzYi5zZWFyY2hJbnB1dC5mb2N1cygpO1xuICAgIH0sXG4gICAgXCJDdHJsLUh8Q29tbWFuZC1PcHRpb24tRlwiOiBmdW5jdGlvbihzYikge1xuICAgICAgICBpZiAoc2IuZWRpdG9yLmdldFJlYWRPbmx5KCkpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHNiLnJlcGxhY2VPcHRpb24uY2hlY2tlZCA9IHRydWU7XG4gICAgICAgIHNiLiRzeW5jT3B0aW9ucygpO1xuICAgICAgICBzYi5yZXBsYWNlSW5wdXQuZm9jdXMoKTtcbiAgICB9LFxuICAgIFwiQ3RybC1HfENvbW1hbmQtR1wiOiBmdW5jdGlvbihzYikge1xuICAgICAgICBzYi5maW5kTmV4dCgpO1xuICAgIH0sXG4gICAgXCJDdHJsLVNoaWZ0LUd8Q29tbWFuZC1TaGlmdC1HXCI6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIHNiLmZpbmRQcmV2KCk7XG4gICAgfSxcbiAgICBcImVzY1wiOiBmdW5jdGlvbihzYikge1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBzYi5oaWRlKCk7fSk7XG4gICAgfSxcbiAgICBcIlJldHVyblwiOiBmdW5jdGlvbihzYikge1xuICAgICAgICBpZiAoc2IuYWN0aXZlSW5wdXQgPT0gc2IucmVwbGFjZUlucHV0KVxuICAgICAgICAgICAgc2IucmVwbGFjZSgpO1xuICAgICAgICBzYi5maW5kTmV4dCgpO1xuICAgIH0sXG4gICAgXCJTaGlmdC1SZXR1cm5cIjogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgaWYgKHNiLmFjdGl2ZUlucHV0ID09IHNiLnJlcGxhY2VJbnB1dClcbiAgICAgICAgICAgIHNiLnJlcGxhY2UoKTtcbiAgICAgICAgc2IuZmluZFByZXYoKTtcbiAgICB9LFxuICAgIFwiQWx0LVJldHVyblwiOiBmdW5jdGlvbihzYikge1xuICAgICAgICBpZiAoc2IuYWN0aXZlSW5wdXQgPT0gc2IucmVwbGFjZUlucHV0KVxuICAgICAgICAgICAgc2IucmVwbGFjZUFsbCgpO1xuICAgICAgICBzYi5maW5kQWxsKCk7XG4gICAgfSxcbiAgICBcIlRhYlwiOiBmdW5jdGlvbihzYikge1xuICAgICAgICAoc2IuYWN0aXZlSW5wdXQgPT0gc2IucmVwbGFjZUlucHV0ID8gc2Iuc2VhcmNoSW5wdXQgOiBzYi5yZXBsYWNlSW5wdXQpLmZvY3VzKCk7XG4gICAgfVxufSk7XG5cbiRzZWFyY2hCYXJLYi5hZGRDb21tYW5kcyhbe1xuICAgIG5hbWU6IFwidG9nZ2xlUmVnZXhwTW9kZVwiLFxuICAgIGJpbmRLZXk6IHt3aW46IFwiQWx0LVJ8QWx0LS9cIiwgbWFjOiBcIkN0cmwtQWx0LVJ8Q3RybC1BbHQtL1wifSxcbiAgICBleGVjOiBmdW5jdGlvbihzYikge1xuICAgICAgICBzYi5yZWdFeHBPcHRpb24uY2hlY2tlZCA9ICFzYi5yZWdFeHBPcHRpb24uY2hlY2tlZDtcbiAgICAgICAgc2IuJHN5bmNPcHRpb25zKCk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwidG9nZ2xlQ2FzZVNlbnNpdGl2ZVwiLFxuICAgIGJpbmRLZXk6IHt3aW46IFwiQWx0LUN8QWx0LUlcIiwgbWFjOiBcIkN0cmwtQWx0LVJ8Q3RybC1BbHQtSVwifSxcbiAgICBleGVjOiBmdW5jdGlvbihzYikge1xuICAgICAgICBzYi5jYXNlU2Vuc2l0aXZlT3B0aW9uLmNoZWNrZWQgPSAhc2IuY2FzZVNlbnNpdGl2ZU9wdGlvbi5jaGVja2VkO1xuICAgICAgICBzYi4kc3luY09wdGlvbnMoKTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogXCJ0b2dnbGVXaG9sZVdvcmRzXCIsXG4gICAgYmluZEtleToge3dpbjogXCJBbHQtQnxBbHQtV1wiLCBtYWM6IFwiQ3RybC1BbHQtQnxDdHJsLUFsdC1XXCJ9LFxuICAgIGV4ZWM6IGZ1bmN0aW9uKHNiKSB7XG4gICAgICAgIHNiLndob2xlV29yZE9wdGlvbi5jaGVja2VkID0gIXNiLndob2xlV29yZE9wdGlvbi5jaGVja2VkO1xuICAgICAgICBzYi4kc3luY09wdGlvbnMoKTtcbiAgICB9XG59LCB7XG4gICAgbmFtZTogXCJ0b2dnbGVSZXBsYWNlXCIsXG4gICAgZXhlYzogZnVuY3Rpb24oc2IpIHtcbiAgICAgICAgc2IucmVwbGFjZU9wdGlvbi5jaGVja2VkID0gIXNiLnJlcGxhY2VPcHRpb24uY2hlY2tlZDtcbiAgICAgICAgc2IuJHN5bmNPcHRpb25zKCk7XG4gICAgfVxufSwge1xuICAgIG5hbWU6IFwic2VhcmNoSW5TZWxlY3Rpb25cIixcbiAgICBleGVjOiBmdW5jdGlvbihzYikge1xuICAgICAgICBzYi5zZWFyY2hPcHRpb24uY2hlY2tlZCA9ICFzYi5zZWFyY2hSYW5nZTtcbiAgICAgICAgc2Iuc2V0U2VhcmNoUmFuZ2Uoc2Iuc2VhcmNoT3B0aW9uLmNoZWNrZWQgJiYgc2IuZWRpdG9yLmdldFNlbGVjdGlvblJhbmdlKCkpO1xuICAgICAgICBzYi4kc3luY09wdGlvbnMoKTtcbiAgICB9XG59XSk7XG5cbi8va2V5YmluZGluZyBvdXRzaWRlIG9mIHRoZSBzZWFyY2hib3hcbnZhciAkY2xvc2VTZWFyY2hCYXJLYiA9IG5ldyBIYXNoSGFuZGxlcihbe1xuICAgIGJpbmRLZXk6IFwiRXNjXCIsXG4gICAgbmFtZTogXCJjbG9zZVNlYXJjaEJhclwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICBlZGl0b3Iuc2VhcmNoQm94LmhpZGUoKTtcbiAgICB9XG59XSk7XG5cblNlYXJjaEJveC5wcm90b3R5cGUuJHNlYXJjaEJhcktiID0gJHNlYXJjaEJhcktiO1xuU2VhcmNoQm94LnByb3RvdHlwZS4kY2xvc2VTZWFyY2hCYXJLYiA9ICRjbG9zZVNlYXJjaEJhcktiO1xuXG5leHBvcnRzLlNlYXJjaEJveCA9IFNlYXJjaEJveDtcblxuZXhwb3J0cy5TZWFyY2ggPSBmdW5jdGlvbihlZGl0b3IsIGlzUmVwbGFjZSkge1xuICAgIHZhciBzYiA9IGVkaXRvci5zZWFyY2hCb3ggfHwgbmV3IFNlYXJjaEJveChlZGl0b3IpO1xuICAgIHNiLnNob3coZWRpdG9yLnNlc3Npb24uZ2V0VGV4dFJhbmdlKCksIGlzUmVwbGFjZSk7XG59O1xuXG5cbi8qIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICogVE9ET1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXG4vKlxuLSBtb3ZlIHNlYXJjaCBmb3JtIHRvIHRoZSBsZWZ0IGlmIGl0IG1hc2tzIGN1cnJlbnQgd29yZFxuLSBpbmNsdWRlIGFsbCBvcHRpb25zIHRoYXQgc2VhcmNoIGhhcy4gZXg6IHJlZ2V4XG4tIHNlYXJjaGJveC5zZWFyY2hib3ggaXMgbm90IHRoYXQgcHJldHR5LiBXZSBzaG91bGQgaGF2ZSBqdXN0IHNlYXJjaGJveFxuLSBkaXNhYmxlIHByZXYgYnV0dG9uIGlmIGl0IG1ha2VzIHNlbnNlXG4qL1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9