"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2697],{

/***/ 92697:
/***/ ((module, exports, __webpack_require__) => {

/**
 * ## Textarea transformation extension
 *
 * Transforms HTML textarea elements into fully-featured Ace editor instances while maintaining form compatibility
 * and providing an interactive settings panel. Handles automatic resizing, form submission integration, and
 * preserves the original textarea's styling properties. Includes a visual settings interface for configuring
 * editor options like themes, modes, keybindings, and display preferences through an overlay panel.
 *
 * **Usage:**
 * ```javascript
 * var ace = require("ace/ext/textarea");
 * var editor = ace.transformTextarea(textareaElement, {
 *   mode: "javascript",
 *   theme: "monokai",
 *   wrap: true
 * });
 * ```
 *
 * @module
 */



var event = __webpack_require__(19631);
var UA = __webpack_require__(74943);
var ace = __webpack_require__(80820);

module.exports = exports = ace;

/**
 * @typedef {Object} TextAreaOptions
 * @property {string} [mode] - Programming language mode for syntax highlighting (e.g., "javascript", "html", "css")
 * @property {string} [theme] - Visual theme for the editor appearance (e.g., "textmate", "monokai", "eclipse")
 * @property {string|number} [wrap] - Line wrapping behavior - "off", "free", or specific column number like "40", "80"
 * @property {string} [fontSize] - Font size in CSS units (e.g., "12px", "14px", "16px")
 * @property {boolean|string} [showGutter] - Whether to display the line number gutter on the left side
 * @property {string} [keybindings] - Keyboard handler/bindings to use - "ace", "vim", or "emacs"
 * @property {boolean|string} [showPrintMargin] - Whether to show the print margin indicator line
 * @property {boolean|string} [useSoftTabs] - Whether to use soft tabs (spaces) instead of hard tabs
 * @property {boolean|string} [showInvisibles] - Whether to show invisible characters like spaces and tabs
 */

/**
 * Returns the CSS property of element.
 *   1) If the CSS property is on the style object of the element, use it, OR
 *   2) Compute the CSS property
 *
 * If the property can't get computed, is 'auto' or 'intrinsic', the former
 * calculated property is used (this can happen in cases where the textarea
 * is hidden and has no dimension styles).
 * @param {HTMLElement} element
 * @param {HTMLElement} container
 * @param {string} property
 */
var getCSSProperty = function(element, container, property) {
    var ret = element.style[property];

    if (!ret) {
        if (window.getComputedStyle) {
            ret = window.getComputedStyle(element, '').getPropertyValue(property);
        } else {
            // @ts-ignore
            ret = element.currentStyle[property];
        }
    }

    if (!ret || ret == 'auto' || ret == 'intrinsic') {
        ret = container.style[property];
    }
    return ret;
};

/**
 * @param {HTMLElement} elm
 * @param {Object} styles
 */
function applyStyles(elm, styles) {
    for (var style in styles) {
        elm.style[style] = styles[style];
    }
}

function setupContainer(element, getValue) {
    if (element.type != 'textarea') {
        throw new Error("Textarea required!");
    }

    var parentNode = element.parentNode;

    // This will hold the editor.
    var container = document.createElement('div');

    // To put Ace in the place of the textarea, we have to copy a few of the
    // textarea's style attributes to the div container.
    //
    // The problem is that the properties have to get computed (they might be
    // defined by a CSS file on the page - you can't access such rules that
    // apply to an element via elm.style). Computed properties are converted to
    // pixels although the dimension might be given as percentage. When the
    // window resizes, the dimensions defined by percentages changes, so the
    // properties have to get recomputed to get the new/true pixels.
    var resizeEvent = function() {
        var style = 'position:relative;';
        [
            'margin-top', 'margin-left', 'margin-right', 'margin-bottom'
        ].forEach(function(item) {
            style += item + ':' +
                        getCSSProperty(element, container, item) + ';';
        });

        // Calculating the width/height of the textarea is somewhat tricky. To
        // do it right, you have to include the paddings to the sides as well
        // (eg. width = width + padding-left, -right).  This works well, as
        // long as the width of the element is not set or given in pixels. In
        // this case and after the textarea is hidden, getCSSProperty(element,
        // container, 'width') will still return pixel value. If the element
        // has realtiv dimensions (e.g. width='95<percent>')
        // getCSSProperty(...) will return pixel values only as long as the
        // textarea is visible. After it is hidden getCSSProperty will return
        // the relative dimensions as they are set on the element (in the case
        // of width, 95<percent>).
        // Making the sum of pixel vaules (e.g. padding) and realtive values
        // (e.g. <percent>) is not possible. As such the padding styles are
        // ignored.

        // The complete width is the width of the textarea + the padding
        // to the left and right.
        var width = getCSSProperty(element, container, 'width') || (element.clientWidth + "px");
        var height = getCSSProperty(element, container, 'height')  || (element.clientHeight + "px");
        style += 'height:' + height + ';width:' + width + ';';

        // Set the display property to 'inline-block'.
        style += 'display:inline-block;';
        container.style.cssText = style;
    };
    event.addListener(window, 'resize', resizeEvent);

    // Call the resizeEvent once, so that the size of the container is
    // calculated.
    resizeEvent();

    // Insert the div container after the element.
    parentNode.insertBefore(container, element.nextSibling);

    // Override the forms onsubmit function. Set the innerHTML and value
    // of the textarea before submitting.
    while (parentNode !== document) {
        if (parentNode.tagName.toUpperCase() === 'FORM') {
            var oldSumit = parentNode.onsubmit;
            // Override the onsubmit function of the form.
            parentNode.onsubmit = function(evt) {
                element.value = getValue();
                // If there is a onsubmit function already, then call
                // it with the current context and pass the event.
                if (oldSumit) {
                    oldSumit.call(this, evt);
                }
            };
            break;
        }
        parentNode = parentNode.parentNode;
    }
    return container;
}

/**
 * Transforms a textarea element into an Ace editor instance.
 *
 * This function replaces the original textarea with an Ace editor,
 * preserving the textarea's initial value and focus state. It creates
 * a container with settings panel and provides full editor functionality.
 *
 * @param {HTMLTextAreaElement} element - The textarea element to transform
 * @param {TextAreaOptions} [options] - Optional configuration options for the editor
 * @returns {import("../editor").Editor} The created Ace editor instance
 */
exports.transformTextarea = function(element, options) {
    var isFocused = element.autofocus || document.activeElement == element;
    var session;
    var container = setupContainer(element, function() {
        return session.getValue();
    });

    // Hide the element.
    element.style.display = 'none';
    container.style.background = 'white';

    //
    var editorDiv = document.createElement("div");
    applyStyles(editorDiv, {
        top: "0px",
        left: "0px",
        right: "0px",
        bottom: "0px",
        border: "1px solid gray",
        position: "absolute"
    });
    container.appendChild(editorDiv);

    var settingOpener = document.createElement("div");
    applyStyles(settingOpener, {
        position: "absolute",
        right: "0px",
        bottom: "0px",
        cursor: "nw-resize",
        border: "solid 9px",
        borderColor: "lightblue gray gray #ceade6",
        zIndex: 101
    });

    var settingDiv = document.createElement("div");
    var settingDivStyles = {
        top: "0px",
        left: "20%",
        right: "0px",
        bottom: "0px",
        position: "absolute",
        padding: "5px",
        zIndex: 100,
        color: "white",
        display: "none",
        overflow: "auto",
        fontSize: "14px",
        boxShadow: "-5px 2px 3px gray"
    };
    if (!UA.isOldIE) {
        settingDivStyles.backgroundColor = "rgba(0, 0, 0, 0.6)";
    } else {
        settingDivStyles.backgroundColor = "#333";
    }

    applyStyles(settingDiv, settingDivStyles);
    container.appendChild(settingDiv);

    options = options || exports.defaultOptions;
    // Power up ace on the textarea:
    var editor = ace.edit(editorDiv);
    session = editor.getSession();

    session.setValue(element.value || element.innerHTML);
    if (isFocused)
        editor.focus();

    // Add the settingPanel opener to the editor's div.
    container.appendChild(settingOpener);

    // Create the API.
    setupApi(editor, editorDiv, settingDiv, ace, options);

    // Create the setting's panel.
    setupSettingPanel(settingDiv, settingOpener, editor);

    var state = "";
    event.addListener(settingOpener, "mousemove", function(e) {
        var rect = this.getBoundingClientRect();
        var x = e.clientX - rect.left, y = e.clientY - rect.top;
        if (x + y < (rect.width + rect.height)/2) {
            this.style.cursor = "pointer";
            state = "toggle";
        } else {
            state = "resize";
            this.style.cursor = "nw-resize";
        }
    });

    event.addListener(settingOpener, "mousedown", function(e) {
        e.preventDefault();
        if (state == "toggle") {
            editor.setDisplaySettings();
            return;
        }
        container.style.zIndex = "100000";
        var rect = container.getBoundingClientRect();
        var startX = rect.width  + rect.left - e.clientX;
        var startY = rect.height  + rect.top - e.clientY;
        event.capture(settingOpener, function(e) {
            container.style.width = e.clientX - rect.left + startX + "px";
            container.style.height = e.clientY - rect.top + startY + "px";
            editor.resize();
        }, function() {});
    });

    return editor;
};

function setupApi(editor, editorDiv, settingDiv, ace, options) {
    function toBool(value) {
        return value === "true" || value == true;
    }

    editor.setDisplaySettings = function(display) {
        if (display == null)
            display = settingDiv.style.display == "none";
        if (display) {
            settingDiv.style.display = "block";
            settingDiv.hideButton.focus();
            editor.on("focus", function onFocus() {
                editor.removeListener("focus", onFocus);
                settingDiv.style.display = "none";
            });
        } else {
            editor.focus();
        }
    };

    editor.$setOption = editor.setOption;
    editor.$getOption = editor.getOption;
    editor.setOption = function(key, value) {
        switch (key) {
            case "mode":
                editor.$setOption("mode", "ace/mode/" + value);
            break;
            case "theme":
                editor.$setOption("theme", "ace/theme/" + value);
            break;
            case "keybindings":
                switch (value) {
                    case "vim":
                        editor.setKeyboardHandler("ace/keyboard/vim");
                        break;
                    case "emacs":
                        editor.setKeyboardHandler("ace/keyboard/emacs");
                        break;
                    default:
                        editor.setKeyboardHandler(null);
                }
            break;

            case "wrap":
            case "fontSize":
                editor.$setOption(key, value);
            break;
            
            default:
                editor.$setOption(key, toBool(value));
        }
    };

    editor.getOption = function(key) {
        switch (key) {
            case "mode":
                return editor.$getOption("mode").substr("ace/mode/".length);
            break;

            case "theme":
                return editor.$getOption("theme").substr("ace/theme/".length);
            break;

            case "keybindings":
                var value = editor.getKeyboardHandler();
                switch (value && value.$id) {
                    case "ace/keyboard/vim":
                        return "vim";
                    case "ace/keyboard/emacs":
                        return "emacs";
                    default:
                        return "ace";
                }
            break;

            default:
                return editor.$getOption(key);
        }
    };

    editor.setOptions(options);
    return editor;
}

function setupSettingPanel(settingDiv, settingOpener, editor) {
    var BOOL = null;

    var desc = {
        mode:            "Mode:",
        wrap:            "Soft Wrap:",
        theme:           "Theme:",
        fontSize:        "Font Size:",
        showGutter:      "Display Gutter:",
        keybindings:     "Keyboard",
        showPrintMargin: "Show Print Margin:",
        useSoftTabs:     "Use Soft Tabs:",
        showInvisibles:  "Show Invisibles"
    };

    var optionValues = {
        mode: {
            text:       "Plain",
            javascript: "JavaScript",
            xml:        "XML",
            html:       "HTML",
            css:        "CSS",
            scss:       "SCSS",
            python:     "Python",
            php:        "PHP",
            java:       "Java",
            ruby:       "Ruby",
            c_cpp:      "C/C++",
            coffee:     "CoffeeScript",
            json:       "json",
            perl:       "Perl",
            clojure:    "Clojure",
            ocaml:      "OCaml",
            csharp:     "C#",
            haxe:       "haXe",
            svg:        "SVG",
            textile:    "Textile",
            groovy:     "Groovy",
            liquid:     "Liquid",
            Scala:      "Scala"
        },
        theme: {
            clouds:           "Clouds",
            clouds_midnight:  "Clouds Midnight",
            cobalt:           "Cobalt",
            crimson_editor:   "Crimson Editor",
            dawn:             "Dawn",
            gob:              "Green on Black",
            eclipse:          "Eclipse",
            idle_fingers:     "Idle Fingers",
            kr_theme:         "Kr Theme",
            merbivore:        "Merbivore",
            merbivore_soft:   "Merbivore Soft",
            mono_industrial:  "Mono Industrial",
            monokai:          "Monokai",
            pastel_on_dark:   "Pastel On Dark",
            solarized_dark:   "Solarized Dark",
            solarized_light:  "Solarized Light",
            textmate:         "Textmate",
            twilight:         "Twilight",
            vibrant_ink:      "Vibrant Ink"
        },
        showGutter: BOOL,
        fontSize: {
            "10px": "10px",
            "11px": "11px",
            "12px": "12px",
            "14px": "14px",
            "16px": "16px"
        },
        wrap: {
            off:    "Off",
            40:     "40",
            80:     "80",
            free:   "Free"
        },
        keybindings: {
            ace: "ace",
            vim: "vim",
            emacs: "emacs"
        },
        showPrintMargin:    BOOL,
        useSoftTabs:        BOOL,
        showInvisibles:     BOOL
    };

    var table = [];
    table.push("<table><tr><th>Setting</th><th>Value</th></tr>");

    function renderOption(builder, option, obj, cValue) {
        if (!obj) {
            builder.push(
                "<input type='checkbox' title='", option, "' ",
                    cValue + "" == "true" ? "checked='true'" : "",
               "'></input>"
            );
            return;
        }
        builder.push("<select title='" + option + "'>");
        for (var value in obj) {
            builder.push("<option value='" + value + "' ");

            if (cValue == value) {
                builder.push(" selected ");
            }

            builder.push(">",
                obj[value],
                "</option>");
        }
        builder.push("</select>");
    }

    for (var option in exports.defaultOptions) {
        table.push("<tr><td>", desc[option], "</td>");
        table.push("<td>");
        renderOption(table, option, optionValues[option], editor.getOption(option));
        table.push("</td></tr>");
    }
    table.push("</table>");
    settingDiv.innerHTML = table.join("");

    var onChange = function(e) {
        var select = e.currentTarget;
        editor.setOption(select.title, select.value);
    };
    var onClick = function(e) {
        var cb = e.currentTarget;
        editor.setOption(cb.title, cb.checked);
    };
    var selects = settingDiv.getElementsByTagName("select");
    for (var i = 0; i < selects.length; i++)
        selects[i].onchange = onChange;
    var cbs = settingDiv.getElementsByTagName("input");
    for (var i = 0; i < cbs.length; i++)
        cbs[i].onclick = onClick;


    var button = document.createElement("input");
    button.type = "button";
    button.value = "Hide";
    event.addListener(button, "click", function() {
        editor.setDisplaySettings(false);
    });
    settingDiv.appendChild(button);
    settingDiv.hideButton = button;
}

/**
 * Default startup options.
 * @type {TextAreaOptions}
 */
exports.defaultOptions = {
    mode:               "javascript",
    theme:              "textmate",
    wrap:               "off",
    fontSize:           "12px",
    showGutter:         "false",
    keybindings:        "ace",
    showPrintMargin:    "false",
    useSoftTabs:        "true",
    showInvisibles:     "false"
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0EsYUFBYTtBQUNiLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvQkFBb0I7QUFDeEM7QUFDQTtBQUNBLG9CQUFvQixnQkFBZ0I7QUFDcEM7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvdGV4dGFyZWEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIyBUZXh0YXJlYSB0cmFuc2Zvcm1hdGlvbiBleHRlbnNpb25cbiAqXG4gKiBUcmFuc2Zvcm1zIEhUTUwgdGV4dGFyZWEgZWxlbWVudHMgaW50byBmdWxseS1mZWF0dXJlZCBBY2UgZWRpdG9yIGluc3RhbmNlcyB3aGlsZSBtYWludGFpbmluZyBmb3JtIGNvbXBhdGliaWxpdHlcbiAqIGFuZCBwcm92aWRpbmcgYW4gaW50ZXJhY3RpdmUgc2V0dGluZ3MgcGFuZWwuIEhhbmRsZXMgYXV0b21hdGljIHJlc2l6aW5nLCBmb3JtIHN1Ym1pc3Npb24gaW50ZWdyYXRpb24sIGFuZFxuICogcHJlc2VydmVzIHRoZSBvcmlnaW5hbCB0ZXh0YXJlYSdzIHN0eWxpbmcgcHJvcGVydGllcy4gSW5jbHVkZXMgYSB2aXN1YWwgc2V0dGluZ3MgaW50ZXJmYWNlIGZvciBjb25maWd1cmluZ1xuICogZWRpdG9yIG9wdGlvbnMgbGlrZSB0aGVtZXMsIG1vZGVzLCBrZXliaW5kaW5ncywgYW5kIGRpc3BsYXkgcHJlZmVyZW5jZXMgdGhyb3VnaCBhbiBvdmVybGF5IHBhbmVsLlxuICpcbiAqICoqVXNhZ2U6KipcbiAqIGBgYGphdmFzY3JpcHRcbiAqIHZhciBhY2UgPSByZXF1aXJlKFwiYWNlL2V4dC90ZXh0YXJlYVwiKTtcbiAqIHZhciBlZGl0b3IgPSBhY2UudHJhbnNmb3JtVGV4dGFyZWEodGV4dGFyZWFFbGVtZW50LCB7XG4gKiAgIG1vZGU6IFwiamF2YXNjcmlwdFwiLFxuICogICB0aGVtZTogXCJtb25va2FpXCIsXG4gKiAgIHdyYXA6IHRydWVcbiAqIH0pO1xuICogYGBgXG4gKlxuICogQG1vZHVsZVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgZXZlbnQgPSByZXF1aXJlKFwiLi4vbGliL2V2ZW50XCIpO1xudmFyIFVBID0gcmVxdWlyZShcIi4uL2xpYi91c2VyYWdlbnRcIik7XG52YXIgYWNlID0gcmVxdWlyZShcIi4uL2FjZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gYWNlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFRleHRBcmVhT3B0aW9uc1xuICogQHByb3BlcnR5IHtzdHJpbmd9IFttb2RlXSAtIFByb2dyYW1taW5nIGxhbmd1YWdlIG1vZGUgZm9yIHN5bnRheCBoaWdobGlnaHRpbmcgKGUuZy4sIFwiamF2YXNjcmlwdFwiLCBcImh0bWxcIiwgXCJjc3NcIilcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBbdGhlbWVdIC0gVmlzdWFsIHRoZW1lIGZvciB0aGUgZWRpdG9yIGFwcGVhcmFuY2UgKGUuZy4sIFwidGV4dG1hdGVcIiwgXCJtb25va2FpXCIsIFwiZWNsaXBzZVwiKVxuICogQHByb3BlcnR5IHtzdHJpbmd8bnVtYmVyfSBbd3JhcF0gLSBMaW5lIHdyYXBwaW5nIGJlaGF2aW9yIC0gXCJvZmZcIiwgXCJmcmVlXCIsIG9yIHNwZWNpZmljIGNvbHVtbiBudW1iZXIgbGlrZSBcIjQwXCIsIFwiODBcIlxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtmb250U2l6ZV0gLSBGb250IHNpemUgaW4gQ1NTIHVuaXRzIChlLmcuLCBcIjEycHhcIiwgXCIxNHB4XCIsIFwiMTZweFwiKVxuICogQHByb3BlcnR5IHtib29sZWFufHN0cmluZ30gW3Nob3dHdXR0ZXJdIC0gV2hldGhlciB0byBkaXNwbGF5IHRoZSBsaW5lIG51bWJlciBndXR0ZXIgb24gdGhlIGxlZnQgc2lkZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IFtrZXliaW5kaW5nc10gLSBLZXlib2FyZCBoYW5kbGVyL2JpbmRpbmdzIHRvIHVzZSAtIFwiYWNlXCIsIFwidmltXCIsIG9yIFwiZW1hY3NcIlxuICogQHByb3BlcnR5IHtib29sZWFufHN0cmluZ30gW3Nob3dQcmludE1hcmdpbl0gLSBXaGV0aGVyIHRvIHNob3cgdGhlIHByaW50IG1hcmdpbiBpbmRpY2F0b3IgbGluZVxuICogQHByb3BlcnR5IHtib29sZWFufHN0cmluZ30gW3VzZVNvZnRUYWJzXSAtIFdoZXRoZXIgdG8gdXNlIHNvZnQgdGFicyAoc3BhY2VzKSBpbnN0ZWFkIG9mIGhhcmQgdGFic1xuICogQHByb3BlcnR5IHtib29sZWFufHN0cmluZ30gW3Nob3dJbnZpc2libGVzXSAtIFdoZXRoZXIgdG8gc2hvdyBpbnZpc2libGUgY2hhcmFjdGVycyBsaWtlIHNwYWNlcyBhbmQgdGFic1xuICovXG5cbi8qKlxuICogUmV0dXJucyB0aGUgQ1NTIHByb3BlcnR5IG9mIGVsZW1lbnQuXG4gKiAgIDEpIElmIHRoZSBDU1MgcHJvcGVydHkgaXMgb24gdGhlIHN0eWxlIG9iamVjdCBvZiB0aGUgZWxlbWVudCwgdXNlIGl0LCBPUlxuICogICAyKSBDb21wdXRlIHRoZSBDU1MgcHJvcGVydHlcbiAqXG4gKiBJZiB0aGUgcHJvcGVydHkgY2FuJ3QgZ2V0IGNvbXB1dGVkLCBpcyAnYXV0bycgb3IgJ2ludHJpbnNpYycsIHRoZSBmb3JtZXJcbiAqIGNhbGN1bGF0ZWQgcHJvcGVydHkgaXMgdXNlZCAodGhpcyBjYW4gaGFwcGVuIGluIGNhc2VzIHdoZXJlIHRoZSB0ZXh0YXJlYVxuICogaXMgaGlkZGVuIGFuZCBoYXMgbm8gZGltZW5zaW9uIHN0eWxlcykuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250YWluZXJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eVxuICovXG52YXIgZ2V0Q1NTUHJvcGVydHkgPSBmdW5jdGlvbihlbGVtZW50LCBjb250YWluZXIsIHByb3BlcnR5KSB7XG4gICAgdmFyIHJldCA9IGVsZW1lbnQuc3R5bGVbcHJvcGVydHldO1xuXG4gICAgaWYgKCFyZXQpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XG4gICAgICAgICAgICByZXQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCAnJykuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICByZXQgPSBlbGVtZW50LmN1cnJlbnRTdHlsZVtwcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXJldCB8fCByZXQgPT0gJ2F1dG8nIHx8IHJldCA9PSAnaW50cmluc2ljJykge1xuICAgICAgICByZXQgPSBjb250YWluZXIuc3R5bGVbcHJvcGVydHldO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbG1cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXNcbiAqL1xuZnVuY3Rpb24gYXBwbHlTdHlsZXMoZWxtLCBzdHlsZXMpIHtcbiAgICBmb3IgKHZhciBzdHlsZSBpbiBzdHlsZXMpIHtcbiAgICAgICAgZWxtLnN0eWxlW3N0eWxlXSA9IHN0eWxlc1tzdHlsZV07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXR1cENvbnRhaW5lcihlbGVtZW50LCBnZXRWYWx1ZSkge1xuICAgIGlmIChlbGVtZW50LnR5cGUgIT0gJ3RleHRhcmVhJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUZXh0YXJlYSByZXF1aXJlZCFcIik7XG4gICAgfVxuXG4gICAgdmFyIHBhcmVudE5vZGUgPSBlbGVtZW50LnBhcmVudE5vZGU7XG5cbiAgICAvLyBUaGlzIHdpbGwgaG9sZCB0aGUgZWRpdG9yLlxuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIC8vIFRvIHB1dCBBY2UgaW4gdGhlIHBsYWNlIG9mIHRoZSB0ZXh0YXJlYSwgd2UgaGF2ZSB0byBjb3B5IGEgZmV3IG9mIHRoZVxuICAgIC8vIHRleHRhcmVhJ3Mgc3R5bGUgYXR0cmlidXRlcyB0byB0aGUgZGl2IGNvbnRhaW5lci5cbiAgICAvL1xuICAgIC8vIFRoZSBwcm9ibGVtIGlzIHRoYXQgdGhlIHByb3BlcnRpZXMgaGF2ZSB0byBnZXQgY29tcHV0ZWQgKHRoZXkgbWlnaHQgYmVcbiAgICAvLyBkZWZpbmVkIGJ5IGEgQ1NTIGZpbGUgb24gdGhlIHBhZ2UgLSB5b3UgY2FuJ3QgYWNjZXNzIHN1Y2ggcnVsZXMgdGhhdFxuICAgIC8vIGFwcGx5IHRvIGFuIGVsZW1lbnQgdmlhIGVsbS5zdHlsZSkuIENvbXB1dGVkIHByb3BlcnRpZXMgYXJlIGNvbnZlcnRlZCB0b1xuICAgIC8vIHBpeGVscyBhbHRob3VnaCB0aGUgZGltZW5zaW9uIG1pZ2h0IGJlIGdpdmVuIGFzIHBlcmNlbnRhZ2UuIFdoZW4gdGhlXG4gICAgLy8gd2luZG93IHJlc2l6ZXMsIHRoZSBkaW1lbnNpb25zIGRlZmluZWQgYnkgcGVyY2VudGFnZXMgY2hhbmdlcywgc28gdGhlXG4gICAgLy8gcHJvcGVydGllcyBoYXZlIHRvIGdldCByZWNvbXB1dGVkIHRvIGdldCB0aGUgbmV3L3RydWUgcGl4ZWxzLlxuICAgIHZhciByZXNpemVFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3R5bGUgPSAncG9zaXRpb246cmVsYXRpdmU7JztcbiAgICAgICAgW1xuICAgICAgICAgICAgJ21hcmdpbi10b3AnLCAnbWFyZ2luLWxlZnQnLCAnbWFyZ2luLXJpZ2h0JywgJ21hcmdpbi1ib3R0b20nXG4gICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICBzdHlsZSArPSBpdGVtICsgJzonICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldENTU1Byb3BlcnR5KGVsZW1lbnQsIGNvbnRhaW5lciwgaXRlbSkgKyAnOyc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENhbGN1bGF0aW5nIHRoZSB3aWR0aC9oZWlnaHQgb2YgdGhlIHRleHRhcmVhIGlzIHNvbWV3aGF0IHRyaWNreS4gVG9cbiAgICAgICAgLy8gZG8gaXQgcmlnaHQsIHlvdSBoYXZlIHRvIGluY2x1ZGUgdGhlIHBhZGRpbmdzIHRvIHRoZSBzaWRlcyBhcyB3ZWxsXG4gICAgICAgIC8vIChlZy4gd2lkdGggPSB3aWR0aCArIHBhZGRpbmctbGVmdCwgLXJpZ2h0KS4gIFRoaXMgd29ya3Mgd2VsbCwgYXNcbiAgICAgICAgLy8gbG9uZyBhcyB0aGUgd2lkdGggb2YgdGhlIGVsZW1lbnQgaXMgbm90IHNldCBvciBnaXZlbiBpbiBwaXhlbHMuIEluXG4gICAgICAgIC8vIHRoaXMgY2FzZSBhbmQgYWZ0ZXIgdGhlIHRleHRhcmVhIGlzIGhpZGRlbiwgZ2V0Q1NTUHJvcGVydHkoZWxlbWVudCxcbiAgICAgICAgLy8gY29udGFpbmVyLCAnd2lkdGgnKSB3aWxsIHN0aWxsIHJldHVybiBwaXhlbCB2YWx1ZS4gSWYgdGhlIGVsZW1lbnRcbiAgICAgICAgLy8gaGFzIHJlYWx0aXYgZGltZW5zaW9ucyAoZS5nLiB3aWR0aD0nOTU8cGVyY2VudD4nKVxuICAgICAgICAvLyBnZXRDU1NQcm9wZXJ0eSguLi4pIHdpbGwgcmV0dXJuIHBpeGVsIHZhbHVlcyBvbmx5IGFzIGxvbmcgYXMgdGhlXG4gICAgICAgIC8vIHRleHRhcmVhIGlzIHZpc2libGUuIEFmdGVyIGl0IGlzIGhpZGRlbiBnZXRDU1NQcm9wZXJ0eSB3aWxsIHJldHVyblxuICAgICAgICAvLyB0aGUgcmVsYXRpdmUgZGltZW5zaW9ucyBhcyB0aGV5IGFyZSBzZXQgb24gdGhlIGVsZW1lbnQgKGluIHRoZSBjYXNlXG4gICAgICAgIC8vIG9mIHdpZHRoLCA5NTxwZXJjZW50PikuXG4gICAgICAgIC8vIE1ha2luZyB0aGUgc3VtIG9mIHBpeGVsIHZhdWxlcyAoZS5nLiBwYWRkaW5nKSBhbmQgcmVhbHRpdmUgdmFsdWVzXG4gICAgICAgIC8vIChlLmcuIDxwZXJjZW50PikgaXMgbm90IHBvc3NpYmxlLiBBcyBzdWNoIHRoZSBwYWRkaW5nIHN0eWxlcyBhcmVcbiAgICAgICAgLy8gaWdub3JlZC5cblxuICAgICAgICAvLyBUaGUgY29tcGxldGUgd2lkdGggaXMgdGhlIHdpZHRoIG9mIHRoZSB0ZXh0YXJlYSArIHRoZSBwYWRkaW5nXG4gICAgICAgIC8vIHRvIHRoZSBsZWZ0IGFuZCByaWdodC5cbiAgICAgICAgdmFyIHdpZHRoID0gZ2V0Q1NTUHJvcGVydHkoZWxlbWVudCwgY29udGFpbmVyLCAnd2lkdGgnKSB8fCAoZWxlbWVudC5jbGllbnRXaWR0aCArIFwicHhcIik7XG4gICAgICAgIHZhciBoZWlnaHQgPSBnZXRDU1NQcm9wZXJ0eShlbGVtZW50LCBjb250YWluZXIsICdoZWlnaHQnKSAgfHwgKGVsZW1lbnQuY2xpZW50SGVpZ2h0ICsgXCJweFwiKTtcbiAgICAgICAgc3R5bGUgKz0gJ2hlaWdodDonICsgaGVpZ2h0ICsgJzt3aWR0aDonICsgd2lkdGggKyAnOyc7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBkaXNwbGF5IHByb3BlcnR5IHRvICdpbmxpbmUtYmxvY2snLlxuICAgICAgICBzdHlsZSArPSAnZGlzcGxheTppbmxpbmUtYmxvY2s7JztcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBzdHlsZTtcbiAgICB9O1xuICAgIGV2ZW50LmFkZExpc3RlbmVyKHdpbmRvdywgJ3Jlc2l6ZScsIHJlc2l6ZUV2ZW50KTtcblxuICAgIC8vIENhbGwgdGhlIHJlc2l6ZUV2ZW50IG9uY2UsIHNvIHRoYXQgdGhlIHNpemUgb2YgdGhlIGNvbnRhaW5lciBpc1xuICAgIC8vIGNhbGN1bGF0ZWQuXG4gICAgcmVzaXplRXZlbnQoKTtcblxuICAgIC8vIEluc2VydCB0aGUgZGl2IGNvbnRhaW5lciBhZnRlciB0aGUgZWxlbWVudC5cbiAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShjb250YWluZXIsIGVsZW1lbnQubmV4dFNpYmxpbmcpO1xuXG4gICAgLy8gT3ZlcnJpZGUgdGhlIGZvcm1zIG9uc3VibWl0IGZ1bmN0aW9uLiBTZXQgdGhlIGlubmVySFRNTCBhbmQgdmFsdWVcbiAgICAvLyBvZiB0aGUgdGV4dGFyZWEgYmVmb3JlIHN1Ym1pdHRpbmcuXG4gICAgd2hpbGUgKHBhcmVudE5vZGUgIT09IGRvY3VtZW50KSB7XG4gICAgICAgIGlmIChwYXJlbnROb2RlLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0ZPUk0nKSB7XG4gICAgICAgICAgICB2YXIgb2xkU3VtaXQgPSBwYXJlbnROb2RlLm9uc3VibWl0O1xuICAgICAgICAgICAgLy8gT3ZlcnJpZGUgdGhlIG9uc3VibWl0IGZ1bmN0aW9uIG9mIHRoZSBmb3JtLlxuICAgICAgICAgICAgcGFyZW50Tm9kZS5vbnN1Ym1pdCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQudmFsdWUgPSBnZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGEgb25zdWJtaXQgZnVuY3Rpb24gYWxyZWFkeSwgdGhlbiBjYWxsXG4gICAgICAgICAgICAgICAgLy8gaXQgd2l0aCB0aGUgY3VycmVudCBjb250ZXh0IGFuZCBwYXNzIHRoZSBldmVudC5cbiAgICAgICAgICAgICAgICBpZiAob2xkU3VtaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkU3VtaXQuY2FsbCh0aGlzLCBldnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gY29udGFpbmVyO1xufVxuXG4vKipcbiAqIFRyYW5zZm9ybXMgYSB0ZXh0YXJlYSBlbGVtZW50IGludG8gYW4gQWNlIGVkaXRvciBpbnN0YW5jZS5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHJlcGxhY2VzIHRoZSBvcmlnaW5hbCB0ZXh0YXJlYSB3aXRoIGFuIEFjZSBlZGl0b3IsXG4gKiBwcmVzZXJ2aW5nIHRoZSB0ZXh0YXJlYSdzIGluaXRpYWwgdmFsdWUgYW5kIGZvY3VzIHN0YXRlLiBJdCBjcmVhdGVzXG4gKiBhIGNvbnRhaW5lciB3aXRoIHNldHRpbmdzIHBhbmVsIGFuZCBwcm92aWRlcyBmdWxsIGVkaXRvciBmdW5jdGlvbmFsaXR5LlxuICpcbiAqIEBwYXJhbSB7SFRNTFRleHRBcmVhRWxlbWVudH0gZWxlbWVudCAtIFRoZSB0ZXh0YXJlYSBlbGVtZW50IHRvIHRyYW5zZm9ybVxuICogQHBhcmFtIHtUZXh0QXJlYU9wdGlvbnN9IFtvcHRpb25zXSAtIE9wdGlvbmFsIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIGVkaXRvclxuICogQHJldHVybnMge2ltcG9ydChcIi4uL2VkaXRvclwiKS5FZGl0b3J9IFRoZSBjcmVhdGVkIEFjZSBlZGl0b3IgaW5zdGFuY2VcbiAqL1xuZXhwb3J0cy50cmFuc2Zvcm1UZXh0YXJlYSA9IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICB2YXIgaXNGb2N1c2VkID0gZWxlbWVudC5hdXRvZm9jdXMgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCA9PSBlbGVtZW50O1xuICAgIHZhciBzZXNzaW9uO1xuICAgIHZhciBjb250YWluZXIgPSBzZXR1cENvbnRhaW5lcihlbGVtZW50LCBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHNlc3Npb24uZ2V0VmFsdWUoKTtcbiAgICB9KTtcblxuICAgIC8vIEhpZGUgdGhlIGVsZW1lbnQuXG4gICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIGNvbnRhaW5lci5zdHlsZS5iYWNrZ3JvdW5kID0gJ3doaXRlJztcblxuICAgIC8vXG4gICAgdmFyIGVkaXRvckRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgYXBwbHlTdHlsZXMoZWRpdG9yRGl2LCB7XG4gICAgICAgIHRvcDogXCIwcHhcIixcbiAgICAgICAgbGVmdDogXCIwcHhcIixcbiAgICAgICAgcmlnaHQ6IFwiMHB4XCIsXG4gICAgICAgIGJvdHRvbTogXCIwcHhcIixcbiAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCBncmF5XCIsXG4gICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCJcbiAgICB9KTtcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoZWRpdG9yRGl2KTtcblxuICAgIHZhciBzZXR0aW5nT3BlbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBhcHBseVN0eWxlcyhzZXR0aW5nT3BlbmVyLCB7XG4gICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgIHJpZ2h0OiBcIjBweFwiLFxuICAgICAgICBib3R0b206IFwiMHB4XCIsXG4gICAgICAgIGN1cnNvcjogXCJudy1yZXNpemVcIixcbiAgICAgICAgYm9yZGVyOiBcInNvbGlkIDlweFwiLFxuICAgICAgICBib3JkZXJDb2xvcjogXCJsaWdodGJsdWUgZ3JheSBncmF5ICNjZWFkZTZcIixcbiAgICAgICAgekluZGV4OiAxMDFcbiAgICB9KTtcblxuICAgIHZhciBzZXR0aW5nRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICB2YXIgc2V0dGluZ0RpdlN0eWxlcyA9IHtcbiAgICAgICAgdG9wOiBcIjBweFwiLFxuICAgICAgICBsZWZ0OiBcIjIwJVwiLFxuICAgICAgICByaWdodDogXCIwcHhcIixcbiAgICAgICAgYm90dG9tOiBcIjBweFwiLFxuICAgICAgICBwb3NpdGlvbjogXCJhYnNvbHV0ZVwiLFxuICAgICAgICBwYWRkaW5nOiBcIjVweFwiLFxuICAgICAgICB6SW5kZXg6IDEwMCxcbiAgICAgICAgY29sb3I6IFwid2hpdGVcIixcbiAgICAgICAgZGlzcGxheTogXCJub25lXCIsXG4gICAgICAgIG92ZXJmbG93OiBcImF1dG9cIixcbiAgICAgICAgZm9udFNpemU6IFwiMTRweFwiLFxuICAgICAgICBib3hTaGFkb3c6IFwiLTVweCAycHggM3B4IGdyYXlcIlxuICAgIH07XG4gICAgaWYgKCFVQS5pc09sZElFKSB7XG4gICAgICAgIHNldHRpbmdEaXZTdHlsZXMuYmFja2dyb3VuZENvbG9yID0gXCJyZ2JhKDAsIDAsIDAsIDAuNilcIjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzZXR0aW5nRGl2U3R5bGVzLmJhY2tncm91bmRDb2xvciA9IFwiIzMzM1wiO1xuICAgIH1cblxuICAgIGFwcGx5U3R5bGVzKHNldHRpbmdEaXYsIHNldHRpbmdEaXZTdHlsZXMpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZXR0aW5nRGl2KTtcblxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IGV4cG9ydHMuZGVmYXVsdE9wdGlvbnM7XG4gICAgLy8gUG93ZXIgdXAgYWNlIG9uIHRoZSB0ZXh0YXJlYTpcbiAgICB2YXIgZWRpdG9yID0gYWNlLmVkaXQoZWRpdG9yRGl2KTtcbiAgICBzZXNzaW9uID0gZWRpdG9yLmdldFNlc3Npb24oKTtcblxuICAgIHNlc3Npb24uc2V0VmFsdWUoZWxlbWVudC52YWx1ZSB8fCBlbGVtZW50LmlubmVySFRNTCk7XG4gICAgaWYgKGlzRm9jdXNlZClcbiAgICAgICAgZWRpdG9yLmZvY3VzKCk7XG5cbiAgICAvLyBBZGQgdGhlIHNldHRpbmdQYW5lbCBvcGVuZXIgdG8gdGhlIGVkaXRvcidzIGRpdi5cbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoc2V0dGluZ09wZW5lcik7XG5cbiAgICAvLyBDcmVhdGUgdGhlIEFQSS5cbiAgICBzZXR1cEFwaShlZGl0b3IsIGVkaXRvckRpdiwgc2V0dGluZ0RpdiwgYWNlLCBvcHRpb25zKTtcblxuICAgIC8vIENyZWF0ZSB0aGUgc2V0dGluZydzIHBhbmVsLlxuICAgIHNldHVwU2V0dGluZ1BhbmVsKHNldHRpbmdEaXYsIHNldHRpbmdPcGVuZXIsIGVkaXRvcik7XG5cbiAgICB2YXIgc3RhdGUgPSBcIlwiO1xuICAgIGV2ZW50LmFkZExpc3RlbmVyKHNldHRpbmdPcGVuZXIsIFwibW91c2Vtb3ZlXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgeCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdCwgeSA9IGUuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICBpZiAoeCArIHkgPCAocmVjdC53aWR0aCArIHJlY3QuaGVpZ2h0KS8yKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLmN1cnNvciA9IFwicG9pbnRlclwiO1xuICAgICAgICAgICAgc3RhdGUgPSBcInRvZ2dsZVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdGUgPSBcInJlc2l6ZVwiO1xuICAgICAgICAgICAgdGhpcy5zdHlsZS5jdXJzb3IgPSBcIm53LXJlc2l6ZVwiO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBldmVudC5hZGRMaXN0ZW5lcihzZXR0aW5nT3BlbmVyLCBcIm1vdXNlZG93blwiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHN0YXRlID09IFwidG9nZ2xlXCIpIHtcbiAgICAgICAgICAgIGVkaXRvci5zZXREaXNwbGF5U2V0dGluZ3MoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb250YWluZXIuc3R5bGUuekluZGV4ID0gXCIxMDAwMDBcIjtcbiAgICAgICAgdmFyIHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBzdGFydFggPSByZWN0LndpZHRoICArIHJlY3QubGVmdCAtIGUuY2xpZW50WDtcbiAgICAgICAgdmFyIHN0YXJ0WSA9IHJlY3QuaGVpZ2h0ICArIHJlY3QudG9wIC0gZS5jbGllbnRZO1xuICAgICAgICBldmVudC5jYXB0dXJlKHNldHRpbmdPcGVuZXIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS53aWR0aCA9IGUuY2xpZW50WCAtIHJlY3QubGVmdCArIHN0YXJ0WCArIFwicHhcIjtcbiAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBlLmNsaWVudFkgLSByZWN0LnRvcCArIHN0YXJ0WSArIFwicHhcIjtcbiAgICAgICAgICAgIGVkaXRvci5yZXNpemUoKTtcbiAgICAgICAgfSwgZnVuY3Rpb24oKSB7fSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gZWRpdG9yO1xufTtcblxuZnVuY3Rpb24gc2V0dXBBcGkoZWRpdG9yLCBlZGl0b3JEaXYsIHNldHRpbmdEaXYsIGFjZSwgb3B0aW9ucykge1xuICAgIGZ1bmN0aW9uIHRvQm9vbCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdmFsdWUgPT09IFwidHJ1ZVwiIHx8IHZhbHVlID09IHRydWU7XG4gICAgfVxuXG4gICAgZWRpdG9yLnNldERpc3BsYXlTZXR0aW5ncyA9IGZ1bmN0aW9uKGRpc3BsYXkpIHtcbiAgICAgICAgaWYgKGRpc3BsYXkgPT0gbnVsbClcbiAgICAgICAgICAgIGRpc3BsYXkgPSBzZXR0aW5nRGl2LnN0eWxlLmRpc3BsYXkgPT0gXCJub25lXCI7XG4gICAgICAgIGlmIChkaXNwbGF5KSB7XG4gICAgICAgICAgICBzZXR0aW5nRGl2LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICBzZXR0aW5nRGl2LmhpZGVCdXR0b24uZm9jdXMoKTtcbiAgICAgICAgICAgIGVkaXRvci5vbihcImZvY3VzXCIsIGZ1bmN0aW9uIG9uRm9jdXMoKSB7XG4gICAgICAgICAgICAgICAgZWRpdG9yLnJlbW92ZUxpc3RlbmVyKFwiZm9jdXNcIiwgb25Gb2N1cyk7XG4gICAgICAgICAgICAgICAgc2V0dGluZ0Rpdi5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVkaXRvci5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGVkaXRvci4kc2V0T3B0aW9uID0gZWRpdG9yLnNldE9wdGlvbjtcbiAgICBlZGl0b3IuJGdldE9wdGlvbiA9IGVkaXRvci5nZXRPcHRpb247XG4gICAgZWRpdG9yLnNldE9wdGlvbiA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJtb2RlXCI6XG4gICAgICAgICAgICAgICAgZWRpdG9yLiRzZXRPcHRpb24oXCJtb2RlXCIsIFwiYWNlL21vZGUvXCIgKyB2YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJ0aGVtZVwiOlxuICAgICAgICAgICAgICAgIGVkaXRvci4kc2V0T3B0aW9uKFwidGhlbWVcIiwgXCJhY2UvdGhlbWUvXCIgKyB2YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgXCJrZXliaW5kaW5nc1wiOlxuICAgICAgICAgICAgICAgIHN3aXRjaCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcInZpbVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNldEtleWJvYXJkSGFuZGxlcihcImFjZS9rZXlib2FyZC92aW1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImVtYWNzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0S2V5Ym9hcmRIYW5kbGVyKFwiYWNlL2tleWJvYXJkL2VtYWNzXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0S2V5Ym9hcmRIYW5kbGVyKG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwid3JhcFwiOlxuICAgICAgICAgICAgY2FzZSBcImZvbnRTaXplXCI6XG4gICAgICAgICAgICAgICAgZWRpdG9yLiRzZXRPcHRpb24oa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBlZGl0b3IuJHNldE9wdGlvbihrZXksIHRvQm9vbCh2YWx1ZSkpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGVkaXRvci5nZXRPcHRpb24gPSBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgc3dpdGNoIChrZXkpIHtcbiAgICAgICAgICAgIGNhc2UgXCJtb2RlXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVkaXRvci4kZ2V0T3B0aW9uKFwibW9kZVwiKS5zdWJzdHIoXCJhY2UvbW9kZS9cIi5sZW5ndGgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJ0aGVtZVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBlZGl0b3IuJGdldE9wdGlvbihcInRoZW1lXCIpLnN1YnN0cihcImFjZS90aGVtZS9cIi5sZW5ndGgpO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJrZXliaW5kaW5nc1wiOlxuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGVkaXRvci5nZXRLZXlib2FyZEhhbmRsZXIoKTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlICYmIHZhbHVlLiRpZCkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYWNlL2tleWJvYXJkL3ZpbVwiOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwidmltXCI7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhY2Uva2V5Ym9hcmQvZW1hY3NcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImVtYWNzXCI7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJhY2VcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gZWRpdG9yLiRnZXRPcHRpb24oa2V5KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBlZGl0b3Iuc2V0T3B0aW9ucyhvcHRpb25zKTtcbiAgICByZXR1cm4gZWRpdG9yO1xufVxuXG5mdW5jdGlvbiBzZXR1cFNldHRpbmdQYW5lbChzZXR0aW5nRGl2LCBzZXR0aW5nT3BlbmVyLCBlZGl0b3IpIHtcbiAgICB2YXIgQk9PTCA9IG51bGw7XG5cbiAgICB2YXIgZGVzYyA9IHtcbiAgICAgICAgbW9kZTogICAgICAgICAgICBcIk1vZGU6XCIsXG4gICAgICAgIHdyYXA6ICAgICAgICAgICAgXCJTb2Z0IFdyYXA6XCIsXG4gICAgICAgIHRoZW1lOiAgICAgICAgICAgXCJUaGVtZTpcIixcbiAgICAgICAgZm9udFNpemU6ICAgICAgICBcIkZvbnQgU2l6ZTpcIixcbiAgICAgICAgc2hvd0d1dHRlcjogICAgICBcIkRpc3BsYXkgR3V0dGVyOlwiLFxuICAgICAgICBrZXliaW5kaW5nczogICAgIFwiS2V5Ym9hcmRcIixcbiAgICAgICAgc2hvd1ByaW50TWFyZ2luOiBcIlNob3cgUHJpbnQgTWFyZ2luOlwiLFxuICAgICAgICB1c2VTb2Z0VGFiczogICAgIFwiVXNlIFNvZnQgVGFiczpcIixcbiAgICAgICAgc2hvd0ludmlzaWJsZXM6ICBcIlNob3cgSW52aXNpYmxlc1wiXG4gICAgfTtcblxuICAgIHZhciBvcHRpb25WYWx1ZXMgPSB7XG4gICAgICAgIG1vZGU6IHtcbiAgICAgICAgICAgIHRleHQ6ICAgICAgIFwiUGxhaW5cIixcbiAgICAgICAgICAgIGphdmFzY3JpcHQ6IFwiSmF2YVNjcmlwdFwiLFxuICAgICAgICAgICAgeG1sOiAgICAgICAgXCJYTUxcIixcbiAgICAgICAgICAgIGh0bWw6ICAgICAgIFwiSFRNTFwiLFxuICAgICAgICAgICAgY3NzOiAgICAgICAgXCJDU1NcIixcbiAgICAgICAgICAgIHNjc3M6ICAgICAgIFwiU0NTU1wiLFxuICAgICAgICAgICAgcHl0aG9uOiAgICAgXCJQeXRob25cIixcbiAgICAgICAgICAgIHBocDogICAgICAgIFwiUEhQXCIsXG4gICAgICAgICAgICBqYXZhOiAgICAgICBcIkphdmFcIixcbiAgICAgICAgICAgIHJ1Ynk6ICAgICAgIFwiUnVieVwiLFxuICAgICAgICAgICAgY19jcHA6ICAgICAgXCJDL0MrK1wiLFxuICAgICAgICAgICAgY29mZmVlOiAgICAgXCJDb2ZmZWVTY3JpcHRcIixcbiAgICAgICAgICAgIGpzb246ICAgICAgIFwianNvblwiLFxuICAgICAgICAgICAgcGVybDogICAgICAgXCJQZXJsXCIsXG4gICAgICAgICAgICBjbG9qdXJlOiAgICBcIkNsb2p1cmVcIixcbiAgICAgICAgICAgIG9jYW1sOiAgICAgIFwiT0NhbWxcIixcbiAgICAgICAgICAgIGNzaGFycDogICAgIFwiQyNcIixcbiAgICAgICAgICAgIGhheGU6ICAgICAgIFwiaGFYZVwiLFxuICAgICAgICAgICAgc3ZnOiAgICAgICAgXCJTVkdcIixcbiAgICAgICAgICAgIHRleHRpbGU6ICAgIFwiVGV4dGlsZVwiLFxuICAgICAgICAgICAgZ3Jvb3Z5OiAgICAgXCJHcm9vdnlcIixcbiAgICAgICAgICAgIGxpcXVpZDogICAgIFwiTGlxdWlkXCIsXG4gICAgICAgICAgICBTY2FsYTogICAgICBcIlNjYWxhXCJcbiAgICAgICAgfSxcbiAgICAgICAgdGhlbWU6IHtcbiAgICAgICAgICAgIGNsb3VkczogICAgICAgICAgIFwiQ2xvdWRzXCIsXG4gICAgICAgICAgICBjbG91ZHNfbWlkbmlnaHQ6ICBcIkNsb3VkcyBNaWRuaWdodFwiLFxuICAgICAgICAgICAgY29iYWx0OiAgICAgICAgICAgXCJDb2JhbHRcIixcbiAgICAgICAgICAgIGNyaW1zb25fZWRpdG9yOiAgIFwiQ3JpbXNvbiBFZGl0b3JcIixcbiAgICAgICAgICAgIGRhd246ICAgICAgICAgICAgIFwiRGF3blwiLFxuICAgICAgICAgICAgZ29iOiAgICAgICAgICAgICAgXCJHcmVlbiBvbiBCbGFja1wiLFxuICAgICAgICAgICAgZWNsaXBzZTogICAgICAgICAgXCJFY2xpcHNlXCIsXG4gICAgICAgICAgICBpZGxlX2ZpbmdlcnM6ICAgICBcIklkbGUgRmluZ2Vyc1wiLFxuICAgICAgICAgICAga3JfdGhlbWU6ICAgICAgICAgXCJLciBUaGVtZVwiLFxuICAgICAgICAgICAgbWVyYml2b3JlOiAgICAgICAgXCJNZXJiaXZvcmVcIixcbiAgICAgICAgICAgIG1lcmJpdm9yZV9zb2Z0OiAgIFwiTWVyYml2b3JlIFNvZnRcIixcbiAgICAgICAgICAgIG1vbm9faW5kdXN0cmlhbDogIFwiTW9ubyBJbmR1c3RyaWFsXCIsXG4gICAgICAgICAgICBtb25va2FpOiAgICAgICAgICBcIk1vbm9rYWlcIixcbiAgICAgICAgICAgIHBhc3RlbF9vbl9kYXJrOiAgIFwiUGFzdGVsIE9uIERhcmtcIixcbiAgICAgICAgICAgIHNvbGFyaXplZF9kYXJrOiAgIFwiU29sYXJpemVkIERhcmtcIixcbiAgICAgICAgICAgIHNvbGFyaXplZF9saWdodDogIFwiU29sYXJpemVkIExpZ2h0XCIsXG4gICAgICAgICAgICB0ZXh0bWF0ZTogICAgICAgICBcIlRleHRtYXRlXCIsXG4gICAgICAgICAgICB0d2lsaWdodDogICAgICAgICBcIlR3aWxpZ2h0XCIsXG4gICAgICAgICAgICB2aWJyYW50X2luazogICAgICBcIlZpYnJhbnQgSW5rXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2hvd0d1dHRlcjogQk9PTCxcbiAgICAgICAgZm9udFNpemU6IHtcbiAgICAgICAgICAgIFwiMTBweFwiOiBcIjEwcHhcIixcbiAgICAgICAgICAgIFwiMTFweFwiOiBcIjExcHhcIixcbiAgICAgICAgICAgIFwiMTJweFwiOiBcIjEycHhcIixcbiAgICAgICAgICAgIFwiMTRweFwiOiBcIjE0cHhcIixcbiAgICAgICAgICAgIFwiMTZweFwiOiBcIjE2cHhcIlxuICAgICAgICB9LFxuICAgICAgICB3cmFwOiB7XG4gICAgICAgICAgICBvZmY6ICAgIFwiT2ZmXCIsXG4gICAgICAgICAgICA0MDogICAgIFwiNDBcIixcbiAgICAgICAgICAgIDgwOiAgICAgXCI4MFwiLFxuICAgICAgICAgICAgZnJlZTogICBcIkZyZWVcIlxuICAgICAgICB9LFxuICAgICAgICBrZXliaW5kaW5nczoge1xuICAgICAgICAgICAgYWNlOiBcImFjZVwiLFxuICAgICAgICAgICAgdmltOiBcInZpbVwiLFxuICAgICAgICAgICAgZW1hY3M6IFwiZW1hY3NcIlxuICAgICAgICB9LFxuICAgICAgICBzaG93UHJpbnRNYXJnaW46ICAgIEJPT0wsXG4gICAgICAgIHVzZVNvZnRUYWJzOiAgICAgICAgQk9PTCxcbiAgICAgICAgc2hvd0ludmlzaWJsZXM6ICAgICBCT09MXG4gICAgfTtcblxuICAgIHZhciB0YWJsZSA9IFtdO1xuICAgIHRhYmxlLnB1c2goXCI8dGFibGU+PHRyPjx0aD5TZXR0aW5nPC90aD48dGg+VmFsdWU8L3RoPjwvdHI+XCIpO1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyT3B0aW9uKGJ1aWxkZXIsIG9wdGlvbiwgb2JqLCBjVmFsdWUpIHtcbiAgICAgICAgaWYgKCFvYmopIHtcbiAgICAgICAgICAgIGJ1aWxkZXIucHVzaChcbiAgICAgICAgICAgICAgICBcIjxpbnB1dCB0eXBlPSdjaGVja2JveCcgdGl0bGU9J1wiLCBvcHRpb24sIFwiJyBcIixcbiAgICAgICAgICAgICAgICAgICAgY1ZhbHVlICsgXCJcIiA9PSBcInRydWVcIiA/IFwiY2hlY2tlZD0ndHJ1ZSdcIiA6IFwiXCIsXG4gICAgICAgICAgICAgICBcIic+PC9pbnB1dD5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBidWlsZGVyLnB1c2goXCI8c2VsZWN0IHRpdGxlPSdcIiArIG9wdGlvbiArIFwiJz5cIik7XG4gICAgICAgIGZvciAodmFyIHZhbHVlIGluIG9iaikge1xuICAgICAgICAgICAgYnVpbGRlci5wdXNoKFwiPG9wdGlvbiB2YWx1ZT0nXCIgKyB2YWx1ZSArIFwiJyBcIik7XG5cbiAgICAgICAgICAgIGlmIChjVmFsdWUgPT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBidWlsZGVyLnB1c2goXCIgc2VsZWN0ZWQgXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBidWlsZGVyLnB1c2goXCI+XCIsXG4gICAgICAgICAgICAgICAgb2JqW3ZhbHVlXSxcbiAgICAgICAgICAgICAgICBcIjwvb3B0aW9uPlwiKTtcbiAgICAgICAgfVxuICAgICAgICBidWlsZGVyLnB1c2goXCI8L3NlbGVjdD5cIik7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgb3B0aW9uIGluIGV4cG9ydHMuZGVmYXVsdE9wdGlvbnMpIHtcbiAgICAgICAgdGFibGUucHVzaChcIjx0cj48dGQ+XCIsIGRlc2Nbb3B0aW9uXSwgXCI8L3RkPlwiKTtcbiAgICAgICAgdGFibGUucHVzaChcIjx0ZD5cIik7XG4gICAgICAgIHJlbmRlck9wdGlvbih0YWJsZSwgb3B0aW9uLCBvcHRpb25WYWx1ZXNbb3B0aW9uXSwgZWRpdG9yLmdldE9wdGlvbihvcHRpb24pKTtcbiAgICAgICAgdGFibGUucHVzaChcIjwvdGQ+PC90cj5cIik7XG4gICAgfVxuICAgIHRhYmxlLnB1c2goXCI8L3RhYmxlPlwiKTtcbiAgICBzZXR0aW5nRGl2LmlubmVySFRNTCA9IHRhYmxlLmpvaW4oXCJcIik7XG5cbiAgICB2YXIgb25DaGFuZ2UgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBzZWxlY3QgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGVkaXRvci5zZXRPcHRpb24oc2VsZWN0LnRpdGxlLCBzZWxlY3QudmFsdWUpO1xuICAgIH07XG4gICAgdmFyIG9uQ2xpY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBjYiA9IGUuY3VycmVudFRhcmdldDtcbiAgICAgICAgZWRpdG9yLnNldE9wdGlvbihjYi50aXRsZSwgY2IuY2hlY2tlZCk7XG4gICAgfTtcbiAgICB2YXIgc2VsZWN0cyA9IHNldHRpbmdEaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzZWxlY3RcIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzZWxlY3RzLmxlbmd0aDsgaSsrKVxuICAgICAgICBzZWxlY3RzW2ldLm9uY2hhbmdlID0gb25DaGFuZ2U7XG4gICAgdmFyIGNicyA9IHNldHRpbmdEaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJpbnB1dFwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNicy5sZW5ndGg7IGkrKylcbiAgICAgICAgY2JzW2ldLm9uY2xpY2sgPSBvbkNsaWNrO1xuXG5cbiAgICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xuICAgIGJ1dHRvbi50eXBlID0gXCJidXR0b25cIjtcbiAgICBidXR0b24udmFsdWUgPSBcIkhpZGVcIjtcbiAgICBldmVudC5hZGRMaXN0ZW5lcihidXR0b24sIFwiY2xpY2tcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIGVkaXRvci5zZXREaXNwbGF5U2V0dGluZ3MoZmFsc2UpO1xuICAgIH0pO1xuICAgIHNldHRpbmdEaXYuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICBzZXR0aW5nRGl2LmhpZGVCdXR0b24gPSBidXR0b247XG59XG5cbi8qKlxuICogRGVmYXVsdCBzdGFydHVwIG9wdGlvbnMuXG4gKiBAdHlwZSB7VGV4dEFyZWFPcHRpb25zfVxuICovXG5leHBvcnRzLmRlZmF1bHRPcHRpb25zID0ge1xuICAgIG1vZGU6ICAgICAgICAgICAgICAgXCJqYXZhc2NyaXB0XCIsXG4gICAgdGhlbWU6ICAgICAgICAgICAgICBcInRleHRtYXRlXCIsXG4gICAgd3JhcDogICAgICAgICAgICAgICBcIm9mZlwiLFxuICAgIGZvbnRTaXplOiAgICAgICAgICAgXCIxMnB4XCIsXG4gICAgc2hvd0d1dHRlcjogICAgICAgICBcImZhbHNlXCIsXG4gICAga2V5YmluZGluZ3M6ICAgICAgICBcImFjZVwiLFxuICAgIHNob3dQcmludE1hcmdpbjogICAgXCJmYWxzZVwiLFxuICAgIHVzZVNvZnRUYWJzOiAgICAgICAgXCJ0cnVlXCIsXG4gICAgc2hvd0ludmlzaWJsZXM6ICAgICBcImZhbHNlXCJcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=