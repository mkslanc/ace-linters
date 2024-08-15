"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2697],{

/***/ 92697:
/***/ ((module, exports, __webpack_require__) => {



var event = __webpack_require__(19631);
var UA = __webpack_require__(74943);
var ace = __webpack_require__(80820);

module.exports = exports = ace;

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

// Default startup options.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjI2OTcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLEtBQWM7QUFDbEMsU0FBUyxtQkFBTyxDQUFDLEtBQWtCO0FBQ25DLFVBQVUsbUJBQU8sQ0FBQyxLQUFROztBQUUxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsYUFBYTtBQUN4QixXQUFXLFFBQVE7QUFDbkI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVyxhQUFhO0FBQ3hCLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFFQUFxRTtBQUNyRSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0Msb0JBQW9COztBQUU1RDtBQUNBLHVDQUF1QztBQUN2QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxlQUFlO0FBQ3hCLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9CQUFvQjtBQUN4QztBQUNBO0FBQ0Esb0JBQW9CLGdCQUFnQjtBQUNwQzs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvdGV4dGFyZWEuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBldmVudCA9IHJlcXVpcmUoXCIuLi9saWIvZXZlbnRcIik7XG52YXIgVUEgPSByZXF1aXJlKFwiLi4vbGliL3VzZXJhZ2VudFwiKTtcbnZhciBhY2UgPSByZXF1aXJlKFwiLi4vYWNlXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHMgPSBhY2U7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgQ1NTIHByb3BlcnR5IG9mIGVsZW1lbnQuXG4gKiAgIDEpIElmIHRoZSBDU1MgcHJvcGVydHkgaXMgb24gdGhlIHN0eWxlIG9iamVjdCBvZiB0aGUgZWxlbWVudCwgdXNlIGl0LCBPUlxuICogICAyKSBDb21wdXRlIHRoZSBDU1MgcHJvcGVydHlcbiAqXG4gKiBJZiB0aGUgcHJvcGVydHkgY2FuJ3QgZ2V0IGNvbXB1dGVkLCBpcyAnYXV0bycgb3IgJ2ludHJpbnNpYycsIHRoZSBmb3JtZXJcbiAqIGNhbGN1bGF0ZWQgcHJvcGVydHkgaXMgdXNlZCAodGhpcyBjYW4gaGFwcGVuIGluIGNhc2VzIHdoZXJlIHRoZSB0ZXh0YXJlYVxuICogaXMgaGlkZGVuIGFuZCBoYXMgbm8gZGltZW5zaW9uIHN0eWxlcykuXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbGVtZW50XG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250YWluZXJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wZXJ0eVxuICovXG52YXIgZ2V0Q1NTUHJvcGVydHkgPSBmdW5jdGlvbihlbGVtZW50LCBjb250YWluZXIsIHByb3BlcnR5KSB7XG4gICAgdmFyIHJldCA9IGVsZW1lbnQuc3R5bGVbcHJvcGVydHldO1xuXG4gICAgaWYgKCFyZXQpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XG4gICAgICAgICAgICByZXQgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCAnJykuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICByZXQgPSBlbGVtZW50LmN1cnJlbnRTdHlsZVtwcm9wZXJ0eV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXJldCB8fCByZXQgPT0gJ2F1dG8nIHx8IHJldCA9PSAnaW50cmluc2ljJykge1xuICAgICAgICByZXQgPSBjb250YWluZXIuc3R5bGVbcHJvcGVydHldO1xuICAgIH1cbiAgICByZXR1cm4gcmV0O1xufTtcblxuLyoqXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBlbG1cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdHlsZXNcbiAqL1xuZnVuY3Rpb24gYXBwbHlTdHlsZXMoZWxtLCBzdHlsZXMpIHtcbiAgICBmb3IgKHZhciBzdHlsZSBpbiBzdHlsZXMpIHtcbiAgICAgICAgZWxtLnN0eWxlW3N0eWxlXSA9IHN0eWxlc1tzdHlsZV07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXR1cENvbnRhaW5lcihlbGVtZW50LCBnZXRWYWx1ZSkge1xuICAgIGlmIChlbGVtZW50LnR5cGUgIT0gJ3RleHRhcmVhJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUZXh0YXJlYSByZXF1aXJlZCFcIik7XG4gICAgfVxuXG4gICAgdmFyIHBhcmVudE5vZGUgPSBlbGVtZW50LnBhcmVudE5vZGU7XG5cbiAgICAvLyBUaGlzIHdpbGwgaG9sZCB0aGUgZWRpdG9yLlxuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIC8vIFRvIHB1dCBBY2UgaW4gdGhlIHBsYWNlIG9mIHRoZSB0ZXh0YXJlYSwgd2UgaGF2ZSB0byBjb3B5IGEgZmV3IG9mIHRoZVxuICAgIC8vIHRleHRhcmVhJ3Mgc3R5bGUgYXR0cmlidXRlcyB0byB0aGUgZGl2IGNvbnRhaW5lci5cbiAgICAvL1xuICAgIC8vIFRoZSBwcm9ibGVtIGlzIHRoYXQgdGhlIHByb3BlcnRpZXMgaGF2ZSB0byBnZXQgY29tcHV0ZWQgKHRoZXkgbWlnaHQgYmVcbiAgICAvLyBkZWZpbmVkIGJ5IGEgQ1NTIGZpbGUgb24gdGhlIHBhZ2UgLSB5b3UgY2FuJ3QgYWNjZXNzIHN1Y2ggcnVsZXMgdGhhdFxuICAgIC8vIGFwcGx5IHRvIGFuIGVsZW1lbnQgdmlhIGVsbS5zdHlsZSkuIENvbXB1dGVkIHByb3BlcnRpZXMgYXJlIGNvbnZlcnRlZCB0b1xuICAgIC8vIHBpeGVscyBhbHRob3VnaCB0aGUgZGltZW5zaW9uIG1pZ2h0IGJlIGdpdmVuIGFzIHBlcmNlbnRhZ2UuIFdoZW4gdGhlXG4gICAgLy8gd2luZG93IHJlc2l6ZXMsIHRoZSBkaW1lbnNpb25zIGRlZmluZWQgYnkgcGVyY2VudGFnZXMgY2hhbmdlcywgc28gdGhlXG4gICAgLy8gcHJvcGVydGllcyBoYXZlIHRvIGdldCByZWNvbXB1dGVkIHRvIGdldCB0aGUgbmV3L3RydWUgcGl4ZWxzLlxuICAgIHZhciByZXNpemVFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc3R5bGUgPSAncG9zaXRpb246cmVsYXRpdmU7JztcbiAgICAgICAgW1xuICAgICAgICAgICAgJ21hcmdpbi10b3AnLCAnbWFyZ2luLWxlZnQnLCAnbWFyZ2luLXJpZ2h0JywgJ21hcmdpbi1ib3R0b20nXG4gICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICBzdHlsZSArPSBpdGVtICsgJzonICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldENTU1Byb3BlcnR5KGVsZW1lbnQsIGNvbnRhaW5lciwgaXRlbSkgKyAnOyc7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIENhbGN1bGF0aW5nIHRoZSB3aWR0aC9oZWlnaHQgb2YgdGhlIHRleHRhcmVhIGlzIHNvbWV3aGF0IHRyaWNreS4gVG9cbiAgICAgICAgLy8gZG8gaXQgcmlnaHQsIHlvdSBoYXZlIHRvIGluY2x1ZGUgdGhlIHBhZGRpbmdzIHRvIHRoZSBzaWRlcyBhcyB3ZWxsXG4gICAgICAgIC8vIChlZy4gd2lkdGggPSB3aWR0aCArIHBhZGRpbmctbGVmdCwgLXJpZ2h0KS4gIFRoaXMgd29ya3Mgd2VsbCwgYXNcbiAgICAgICAgLy8gbG9uZyBhcyB0aGUgd2lkdGggb2YgdGhlIGVsZW1lbnQgaXMgbm90IHNldCBvciBnaXZlbiBpbiBwaXhlbHMuIEluXG4gICAgICAgIC8vIHRoaXMgY2FzZSBhbmQgYWZ0ZXIgdGhlIHRleHRhcmVhIGlzIGhpZGRlbiwgZ2V0Q1NTUHJvcGVydHkoZWxlbWVudCxcbiAgICAgICAgLy8gY29udGFpbmVyLCAnd2lkdGgnKSB3aWxsIHN0aWxsIHJldHVybiBwaXhlbCB2YWx1ZS4gSWYgdGhlIGVsZW1lbnRcbiAgICAgICAgLy8gaGFzIHJlYWx0aXYgZGltZW5zaW9ucyAoZS5nLiB3aWR0aD0nOTU8cGVyY2VudD4nKVxuICAgICAgICAvLyBnZXRDU1NQcm9wZXJ0eSguLi4pIHdpbGwgcmV0dXJuIHBpeGVsIHZhbHVlcyBvbmx5IGFzIGxvbmcgYXMgdGhlXG4gICAgICAgIC8vIHRleHRhcmVhIGlzIHZpc2libGUuIEFmdGVyIGl0IGlzIGhpZGRlbiBnZXRDU1NQcm9wZXJ0eSB3aWxsIHJldHVyblxuICAgICAgICAvLyB0aGUgcmVsYXRpdmUgZGltZW5zaW9ucyBhcyB0aGV5IGFyZSBzZXQgb24gdGhlIGVsZW1lbnQgKGluIHRoZSBjYXNlXG4gICAgICAgIC8vIG9mIHdpZHRoLCA5NTxwZXJjZW50PikuXG4gICAgICAgIC8vIE1ha2luZyB0aGUgc3VtIG9mIHBpeGVsIHZhdWxlcyAoZS5nLiBwYWRkaW5nKSBhbmQgcmVhbHRpdmUgdmFsdWVzXG4gICAgICAgIC8vIChlLmcuIDxwZXJjZW50PikgaXMgbm90IHBvc3NpYmxlLiBBcyBzdWNoIHRoZSBwYWRkaW5nIHN0eWxlcyBhcmVcbiAgICAgICAgLy8gaWdub3JlZC5cblxuICAgICAgICAvLyBUaGUgY29tcGxldGUgd2lkdGggaXMgdGhlIHdpZHRoIG9mIHRoZSB0ZXh0YXJlYSArIHRoZSBwYWRkaW5nXG4gICAgICAgIC8vIHRvIHRoZSBsZWZ0IGFuZCByaWdodC5cbiAgICAgICAgdmFyIHdpZHRoID0gZ2V0Q1NTUHJvcGVydHkoZWxlbWVudCwgY29udGFpbmVyLCAnd2lkdGgnKSB8fCAoZWxlbWVudC5jbGllbnRXaWR0aCArIFwicHhcIik7XG4gICAgICAgIHZhciBoZWlnaHQgPSBnZXRDU1NQcm9wZXJ0eShlbGVtZW50LCBjb250YWluZXIsICdoZWlnaHQnKSAgfHwgKGVsZW1lbnQuY2xpZW50SGVpZ2h0ICsgXCJweFwiKTtcbiAgICAgICAgc3R5bGUgKz0gJ2hlaWdodDonICsgaGVpZ2h0ICsgJzt3aWR0aDonICsgd2lkdGggKyAnOyc7XG5cbiAgICAgICAgLy8gU2V0IHRoZSBkaXNwbGF5IHByb3BlcnR5IHRvICdpbmxpbmUtYmxvY2snLlxuICAgICAgICBzdHlsZSArPSAnZGlzcGxheTppbmxpbmUtYmxvY2s7JztcbiAgICAgICAgY29udGFpbmVyLnN0eWxlLmNzc1RleHQgPSBzdHlsZTtcbiAgICB9O1xuICAgIGV2ZW50LmFkZExpc3RlbmVyKHdpbmRvdywgJ3Jlc2l6ZScsIHJlc2l6ZUV2ZW50KTtcblxuICAgIC8vIENhbGwgdGhlIHJlc2l6ZUV2ZW50IG9uY2UsIHNvIHRoYXQgdGhlIHNpemUgb2YgdGhlIGNvbnRhaW5lciBpc1xuICAgIC8vIGNhbGN1bGF0ZWQuXG4gICAgcmVzaXplRXZlbnQoKTtcblxuICAgIC8vIEluc2VydCB0aGUgZGl2IGNvbnRhaW5lciBhZnRlciB0aGUgZWxlbWVudC5cbiAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShjb250YWluZXIsIGVsZW1lbnQubmV4dFNpYmxpbmcpO1xuXG4gICAgLy8gT3ZlcnJpZGUgdGhlIGZvcm1zIG9uc3VibWl0IGZ1bmN0aW9uLiBTZXQgdGhlIGlubmVySFRNTCBhbmQgdmFsdWVcbiAgICAvLyBvZiB0aGUgdGV4dGFyZWEgYmVmb3JlIHN1Ym1pdHRpbmcuXG4gICAgd2hpbGUgKHBhcmVudE5vZGUgIT09IGRvY3VtZW50KSB7XG4gICAgICAgIGlmIChwYXJlbnROb2RlLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0ZPUk0nKSB7XG4gICAgICAgICAgICB2YXIgb2xkU3VtaXQgPSBwYXJlbnROb2RlLm9uc3VibWl0O1xuICAgICAgICAgICAgLy8gT3ZlcnJpZGUgdGhlIG9uc3VibWl0IGZ1bmN0aW9uIG9mIHRoZSBmb3JtLlxuICAgICAgICAgICAgcGFyZW50Tm9kZS5vbnN1Ym1pdCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQudmFsdWUgPSBnZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGEgb25zdWJtaXQgZnVuY3Rpb24gYWxyZWFkeSwgdGhlbiBjYWxsXG4gICAgICAgICAgICAgICAgLy8gaXQgd2l0aCB0aGUgY3VycmVudCBjb250ZXh0IGFuZCBwYXNzIHRoZSBldmVudC5cbiAgICAgICAgICAgICAgICBpZiAob2xkU3VtaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkU3VtaXQuY2FsbCh0aGlzLCBldnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gY29udGFpbmVyO1xufVxuXG5leHBvcnRzLnRyYW5zZm9ybVRleHRhcmVhID0gZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHZhciBpc0ZvY3VzZWQgPSBlbGVtZW50LmF1dG9mb2N1cyB8fCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09IGVsZW1lbnQ7XG4gICAgdmFyIHNlc3Npb247XG4gICAgdmFyIGNvbnRhaW5lciA9IHNldHVwQ29udGFpbmVyKGVsZW1lbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRWYWx1ZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gSGlkZSB0aGUgZWxlbWVudC5cbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgY29udGFpbmVyLnN0eWxlLmJhY2tncm91bmQgPSAnd2hpdGUnO1xuXG4gICAgLy9cbiAgICB2YXIgZWRpdG9yRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBhcHBseVN0eWxlcyhlZGl0b3JEaXYsIHtcbiAgICAgICAgdG9wOiBcIjBweFwiLFxuICAgICAgICBsZWZ0OiBcIjBweFwiLFxuICAgICAgICByaWdodDogXCIwcHhcIixcbiAgICAgICAgYm90dG9tOiBcIjBweFwiLFxuICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkIGdyYXlcIixcbiAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIlxuICAgIH0pO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0b3JEaXYpO1xuXG4gICAgdmFyIHNldHRpbmdPcGVuZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGFwcGx5U3R5bGVzKHNldHRpbmdPcGVuZXIsIHtcbiAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgcmlnaHQ6IFwiMHB4XCIsXG4gICAgICAgIGJvdHRvbTogXCIwcHhcIixcbiAgICAgICAgY3Vyc29yOiBcIm53LXJlc2l6ZVwiLFxuICAgICAgICBib3JkZXI6IFwic29saWQgOXB4XCIsXG4gICAgICAgIGJvcmRlckNvbG9yOiBcImxpZ2h0Ymx1ZSBncmF5IGdyYXkgI2NlYWRlNlwiLFxuICAgICAgICB6SW5kZXg6IDEwMVxuICAgIH0pO1xuXG4gICAgdmFyIHNldHRpbmdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHZhciBzZXR0aW5nRGl2U3R5bGVzID0ge1xuICAgICAgICB0b3A6IFwiMHB4XCIsXG4gICAgICAgIGxlZnQ6IFwiMjAlXCIsXG4gICAgICAgIHJpZ2h0OiBcIjBweFwiLFxuICAgICAgICBib3R0b206IFwiMHB4XCIsXG4gICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgIHBhZGRpbmc6IFwiNXB4XCIsXG4gICAgICAgIHpJbmRleDogMTAwLFxuICAgICAgICBjb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgICBkaXNwbGF5OiBcIm5vbmVcIixcbiAgICAgICAgb3ZlcmZsb3c6IFwiYXV0b1wiLFxuICAgICAgICBmb250U2l6ZTogXCIxNHB4XCIsXG4gICAgICAgIGJveFNoYWRvdzogXCItNXB4IDJweCAzcHggZ3JheVwiXG4gICAgfTtcbiAgICBpZiAoIVVBLmlzT2xkSUUpIHtcbiAgICAgICAgc2V0dGluZ0RpdlN0eWxlcy5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwgMCwgMCwgMC42KVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNldHRpbmdEaXZTdHlsZXMuYmFja2dyb3VuZENvbG9yID0gXCIjMzMzXCI7XG4gICAgfVxuXG4gICAgYXBwbHlTdHlsZXMoc2V0dGluZ0Rpdiwgc2V0dGluZ0RpdlN0eWxlcyk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNldHRpbmdEaXYpO1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwgZXhwb3J0cy5kZWZhdWx0T3B0aW9ucztcbiAgICAvLyBQb3dlciB1cCBhY2Ugb24gdGhlIHRleHRhcmVhOlxuICAgIHZhciBlZGl0b3IgPSBhY2UuZWRpdChlZGl0b3JEaXYpO1xuICAgIHNlc3Npb24gPSBlZGl0b3IuZ2V0U2Vzc2lvbigpO1xuXG4gICAgc2Vzc2lvbi5zZXRWYWx1ZShlbGVtZW50LnZhbHVlIHx8IGVsZW1lbnQuaW5uZXJIVE1MKTtcbiAgICBpZiAoaXNGb2N1c2VkKVxuICAgICAgICBlZGl0b3IuZm9jdXMoKTtcblxuICAgIC8vIEFkZCB0aGUgc2V0dGluZ1BhbmVsIG9wZW5lciB0byB0aGUgZWRpdG9yJ3MgZGl2LlxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZXR0aW5nT3BlbmVyKTtcblxuICAgIC8vIENyZWF0ZSB0aGUgQVBJLlxuICAgIHNldHVwQXBpKGVkaXRvciwgZWRpdG9yRGl2LCBzZXR0aW5nRGl2LCBhY2UsIG9wdGlvbnMpO1xuXG4gICAgLy8gQ3JlYXRlIHRoZSBzZXR0aW5nJ3MgcGFuZWwuXG4gICAgc2V0dXBTZXR0aW5nUGFuZWwoc2V0dGluZ0Rpdiwgc2V0dGluZ09wZW5lciwgZWRpdG9yKTtcblxuICAgIHZhciBzdGF0ZSA9IFwiXCI7XG4gICAgZXZlbnQuYWRkTGlzdGVuZXIoc2V0dGluZ09wZW5lciwgXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgcmVjdCA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciB4ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0LCB5ID0gZS5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgICAgIGlmICh4ICsgeSA8IChyZWN0LndpZHRoICsgcmVjdC5oZWlnaHQpLzIpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgICAgICBzdGF0ZSA9IFwidG9nZ2xlXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZSA9IFwicmVzaXplXCI7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLmN1cnNvciA9IFwibnctcmVzaXplXCI7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV2ZW50LmFkZExpc3RlbmVyKHNldHRpbmdPcGVuZXIsIFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoc3RhdGUgPT0gXCJ0b2dnbGVcIikge1xuICAgICAgICAgICAgZWRpdG9yLnNldERpc3BsYXlTZXR0aW5ncygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSBcIjEwMDAwMFwiO1xuICAgICAgICB2YXIgcmVjdCA9IGNvbnRhaW5lci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgdmFyIHN0YXJ0WCA9IHJlY3Qud2lkdGggICsgcmVjdC5sZWZ0IC0gZS5jbGllbnRYO1xuICAgICAgICB2YXIgc3RhcnRZID0gcmVjdC5oZWlnaHQgICsgcmVjdC50b3AgLSBlLmNsaWVudFk7XG4gICAgICAgIGV2ZW50LmNhcHR1cmUoc2V0dGluZ09wZW5lciwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLndpZHRoID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0ICsgc3RhcnRYICsgXCJweFwiO1xuICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGUuY2xpZW50WSAtIHJlY3QudG9wICsgc3RhcnRZICsgXCJweFwiO1xuICAgICAgICAgICAgZWRpdG9yLnJlc2l6ZSgpO1xuICAgICAgICB9LCBmdW5jdGlvbigpIHt9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBlZGl0b3I7XG59O1xuXG5mdW5jdGlvbiBzZXR1cEFwaShlZGl0b3IsIGVkaXRvckRpdiwgc2V0dGluZ0RpdiwgYWNlLCBvcHRpb25zKSB7XG4gICAgZnVuY3Rpb24gdG9Cb29sKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSA9PT0gXCJ0cnVlXCIgfHwgdmFsdWUgPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBlZGl0b3Iuc2V0RGlzcGxheVNldHRpbmdzID0gZnVuY3Rpb24oZGlzcGxheSkge1xuICAgICAgICBpZiAoZGlzcGxheSA9PSBudWxsKVxuICAgICAgICAgICAgZGlzcGxheSA9IHNldHRpbmdEaXYuc3R5bGUuZGlzcGxheSA9PSBcIm5vbmVcIjtcbiAgICAgICAgaWYgKGRpc3BsYXkpIHtcbiAgICAgICAgICAgIHNldHRpbmdEaXYuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIHNldHRpbmdEaXYuaGlkZUJ1dHRvbi5mb2N1cygpO1xuICAgICAgICAgICAgZWRpdG9yLm9uKFwiZm9jdXNcIiwgZnVuY3Rpb24gb25Gb2N1cygpIHtcbiAgICAgICAgICAgICAgICBlZGl0b3IucmVtb3ZlTGlzdGVuZXIoXCJmb2N1c1wiLCBvbkZvY3VzKTtcbiAgICAgICAgICAgICAgICBzZXR0aW5nRGl2LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWRpdG9yLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZWRpdG9yLiRzZXRPcHRpb24gPSBlZGl0b3Iuc2V0T3B0aW9uO1xuICAgIGVkaXRvci4kZ2V0T3B0aW9uID0gZWRpdG9yLmdldE9wdGlvbjtcbiAgICBlZGl0b3Iuc2V0T3B0aW9uID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgY2FzZSBcIm1vZGVcIjpcbiAgICAgICAgICAgICAgICBlZGl0b3IuJHNldE9wdGlvbihcIm1vZGVcIiwgXCJhY2UvbW9kZS9cIiArIHZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcInRoZW1lXCI6XG4gICAgICAgICAgICAgICAgZWRpdG9yLiRzZXRPcHRpb24oXCJ0aGVtZVwiLCBcImFjZS90aGVtZS9cIiArIHZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcImtleWJpbmRpbmdzXCI6XG4gICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwidmltXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0b3Iuc2V0S2V5Ym9hcmRIYW5kbGVyKFwiYWNlL2tleWJvYXJkL3ZpbVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiZW1hY3NcIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvci5zZXRLZXlib2FyZEhhbmRsZXIoXCJhY2Uva2V5Ym9hcmQvZW1hY3NcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvci5zZXRLZXlib2FyZEhhbmRsZXIobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgXCJ3cmFwXCI6XG4gICAgICAgICAgICBjYXNlIFwiZm9udFNpemVcIjpcbiAgICAgICAgICAgICAgICBlZGl0b3IuJHNldE9wdGlvbihrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGVkaXRvci4kc2V0T3B0aW9uKGtleSwgdG9Cb29sKHZhbHVlKSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZWRpdG9yLmdldE9wdGlvbiA9IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICBzd2l0Y2ggKGtleSkge1xuICAgICAgICAgICAgY2FzZSBcIm1vZGVcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gZWRpdG9yLiRnZXRPcHRpb24oXCJtb2RlXCIpLnN1YnN0cihcImFjZS9tb2RlL1wiLmxlbmd0aCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBcInRoZW1lXCI6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVkaXRvci4kZ2V0T3B0aW9uKFwidGhlbWVcIikuc3Vic3RyKFwiYWNlL3RoZW1lL1wiLmxlbmd0aCk7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBcImtleWJpbmRpbmdzXCI6XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZWRpdG9yLmdldEtleWJvYXJkSGFuZGxlcigpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodmFsdWUgJiYgdmFsdWUuJGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJhY2Uva2V5Ym9hcmQvdmltXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJ2aW1cIjtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFjZS9rZXlib2FyZC9lbWFjc1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiZW1hY3NcIjtcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcImFjZVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBlZGl0b3IuJGdldE9wdGlvbihrZXkpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGVkaXRvci5zZXRPcHRpb25zKG9wdGlvbnMpO1xuICAgIHJldHVybiBlZGl0b3I7XG59XG5cbmZ1bmN0aW9uIHNldHVwU2V0dGluZ1BhbmVsKHNldHRpbmdEaXYsIHNldHRpbmdPcGVuZXIsIGVkaXRvcikge1xuICAgIHZhciBCT09MID0gbnVsbDtcblxuICAgIHZhciBkZXNjID0ge1xuICAgICAgICBtb2RlOiAgICAgICAgICAgIFwiTW9kZTpcIixcbiAgICAgICAgd3JhcDogICAgICAgICAgICBcIlNvZnQgV3JhcDpcIixcbiAgICAgICAgdGhlbWU6ICAgICAgICAgICBcIlRoZW1lOlwiLFxuICAgICAgICBmb250U2l6ZTogICAgICAgIFwiRm9udCBTaXplOlwiLFxuICAgICAgICBzaG93R3V0dGVyOiAgICAgIFwiRGlzcGxheSBHdXR0ZXI6XCIsXG4gICAgICAgIGtleWJpbmRpbmdzOiAgICAgXCJLZXlib2FyZFwiLFxuICAgICAgICBzaG93UHJpbnRNYXJnaW46IFwiU2hvdyBQcmludCBNYXJnaW46XCIsXG4gICAgICAgIHVzZVNvZnRUYWJzOiAgICAgXCJVc2UgU29mdCBUYWJzOlwiLFxuICAgICAgICBzaG93SW52aXNpYmxlczogIFwiU2hvdyBJbnZpc2libGVzXCJcbiAgICB9O1xuXG4gICAgdmFyIG9wdGlvblZhbHVlcyA9IHtcbiAgICAgICAgbW9kZToge1xuICAgICAgICAgICAgdGV4dDogICAgICAgXCJQbGFpblwiLFxuICAgICAgICAgICAgamF2YXNjcmlwdDogXCJKYXZhU2NyaXB0XCIsXG4gICAgICAgICAgICB4bWw6ICAgICAgICBcIlhNTFwiLFxuICAgICAgICAgICAgaHRtbDogICAgICAgXCJIVE1MXCIsXG4gICAgICAgICAgICBjc3M6ICAgICAgICBcIkNTU1wiLFxuICAgICAgICAgICAgc2NzczogICAgICAgXCJTQ1NTXCIsXG4gICAgICAgICAgICBweXRob246ICAgICBcIlB5dGhvblwiLFxuICAgICAgICAgICAgcGhwOiAgICAgICAgXCJQSFBcIixcbiAgICAgICAgICAgIGphdmE6ICAgICAgIFwiSmF2YVwiLFxuICAgICAgICAgICAgcnVieTogICAgICAgXCJSdWJ5XCIsXG4gICAgICAgICAgICBjX2NwcDogICAgICBcIkMvQysrXCIsXG4gICAgICAgICAgICBjb2ZmZWU6ICAgICBcIkNvZmZlZVNjcmlwdFwiLFxuICAgICAgICAgICAganNvbjogICAgICAgXCJqc29uXCIsXG4gICAgICAgICAgICBwZXJsOiAgICAgICBcIlBlcmxcIixcbiAgICAgICAgICAgIGNsb2p1cmU6ICAgIFwiQ2xvanVyZVwiLFxuICAgICAgICAgICAgb2NhbWw6ICAgICAgXCJPQ2FtbFwiLFxuICAgICAgICAgICAgY3NoYXJwOiAgICAgXCJDI1wiLFxuICAgICAgICAgICAgaGF4ZTogICAgICAgXCJoYVhlXCIsXG4gICAgICAgICAgICBzdmc6ICAgICAgICBcIlNWR1wiLFxuICAgICAgICAgICAgdGV4dGlsZTogICAgXCJUZXh0aWxlXCIsXG4gICAgICAgICAgICBncm9vdnk6ICAgICBcIkdyb292eVwiLFxuICAgICAgICAgICAgbGlxdWlkOiAgICAgXCJMaXF1aWRcIixcbiAgICAgICAgICAgIFNjYWxhOiAgICAgIFwiU2NhbGFcIlxuICAgICAgICB9LFxuICAgICAgICB0aGVtZToge1xuICAgICAgICAgICAgY2xvdWRzOiAgICAgICAgICAgXCJDbG91ZHNcIixcbiAgICAgICAgICAgIGNsb3Vkc19taWRuaWdodDogIFwiQ2xvdWRzIE1pZG5pZ2h0XCIsXG4gICAgICAgICAgICBjb2JhbHQ6ICAgICAgICAgICBcIkNvYmFsdFwiLFxuICAgICAgICAgICAgY3JpbXNvbl9lZGl0b3I6ICAgXCJDcmltc29uIEVkaXRvclwiLFxuICAgICAgICAgICAgZGF3bjogICAgICAgICAgICAgXCJEYXduXCIsXG4gICAgICAgICAgICBnb2I6ICAgICAgICAgICAgICBcIkdyZWVuIG9uIEJsYWNrXCIsXG4gICAgICAgICAgICBlY2xpcHNlOiAgICAgICAgICBcIkVjbGlwc2VcIixcbiAgICAgICAgICAgIGlkbGVfZmluZ2VyczogICAgIFwiSWRsZSBGaW5nZXJzXCIsXG4gICAgICAgICAgICBrcl90aGVtZTogICAgICAgICBcIktyIFRoZW1lXCIsXG4gICAgICAgICAgICBtZXJiaXZvcmU6ICAgICAgICBcIk1lcmJpdm9yZVwiLFxuICAgICAgICAgICAgbWVyYml2b3JlX3NvZnQ6ICAgXCJNZXJiaXZvcmUgU29mdFwiLFxuICAgICAgICAgICAgbW9ub19pbmR1c3RyaWFsOiAgXCJNb25vIEluZHVzdHJpYWxcIixcbiAgICAgICAgICAgIG1vbm9rYWk6ICAgICAgICAgIFwiTW9ub2thaVwiLFxuICAgICAgICAgICAgcGFzdGVsX29uX2Rhcms6ICAgXCJQYXN0ZWwgT24gRGFya1wiLFxuICAgICAgICAgICAgc29sYXJpemVkX2Rhcms6ICAgXCJTb2xhcml6ZWQgRGFya1wiLFxuICAgICAgICAgICAgc29sYXJpemVkX2xpZ2h0OiAgXCJTb2xhcml6ZWQgTGlnaHRcIixcbiAgICAgICAgICAgIHRleHRtYXRlOiAgICAgICAgIFwiVGV4dG1hdGVcIixcbiAgICAgICAgICAgIHR3aWxpZ2h0OiAgICAgICAgIFwiVHdpbGlnaHRcIixcbiAgICAgICAgICAgIHZpYnJhbnRfaW5rOiAgICAgIFwiVmlicmFudCBJbmtcIlxuICAgICAgICB9LFxuICAgICAgICBzaG93R3V0dGVyOiBCT09MLFxuICAgICAgICBmb250U2l6ZToge1xuICAgICAgICAgICAgXCIxMHB4XCI6IFwiMTBweFwiLFxuICAgICAgICAgICAgXCIxMXB4XCI6IFwiMTFweFwiLFxuICAgICAgICAgICAgXCIxMnB4XCI6IFwiMTJweFwiLFxuICAgICAgICAgICAgXCIxNHB4XCI6IFwiMTRweFwiLFxuICAgICAgICAgICAgXCIxNnB4XCI6IFwiMTZweFwiXG4gICAgICAgIH0sXG4gICAgICAgIHdyYXA6IHtcbiAgICAgICAgICAgIG9mZjogICAgXCJPZmZcIixcbiAgICAgICAgICAgIDQwOiAgICAgXCI0MFwiLFxuICAgICAgICAgICAgODA6ICAgICBcIjgwXCIsXG4gICAgICAgICAgICBmcmVlOiAgIFwiRnJlZVwiXG4gICAgICAgIH0sXG4gICAgICAgIGtleWJpbmRpbmdzOiB7XG4gICAgICAgICAgICBhY2U6IFwiYWNlXCIsXG4gICAgICAgICAgICB2aW06IFwidmltXCIsXG4gICAgICAgICAgICBlbWFjczogXCJlbWFjc1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNob3dQcmludE1hcmdpbjogICAgQk9PTCxcbiAgICAgICAgdXNlU29mdFRhYnM6ICAgICAgICBCT09MLFxuICAgICAgICBzaG93SW52aXNpYmxlczogICAgIEJPT0xcbiAgICB9O1xuXG4gICAgdmFyIHRhYmxlID0gW107XG4gICAgdGFibGUucHVzaChcIjx0YWJsZT48dHI+PHRoPlNldHRpbmc8L3RoPjx0aD5WYWx1ZTwvdGg+PC90cj5cIik7XG5cbiAgICBmdW5jdGlvbiByZW5kZXJPcHRpb24oYnVpbGRlciwgb3B0aW9uLCBvYmosIGNWYWx1ZSkge1xuICAgICAgICBpZiAoIW9iaikge1xuICAgICAgICAgICAgYnVpbGRlci5wdXNoKFxuICAgICAgICAgICAgICAgIFwiPGlucHV0IHR5cGU9J2NoZWNrYm94JyB0aXRsZT0nXCIsIG9wdGlvbiwgXCInIFwiLFxuICAgICAgICAgICAgICAgICAgICBjVmFsdWUgKyBcIlwiID09IFwidHJ1ZVwiID8gXCJjaGVja2VkPSd0cnVlJ1wiIDogXCJcIixcbiAgICAgICAgICAgICAgIFwiJz48L2lucHV0PlwiXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGJ1aWxkZXIucHVzaChcIjxzZWxlY3QgdGl0bGU9J1wiICsgb3B0aW9uICsgXCInPlwiKTtcbiAgICAgICAgZm9yICh2YXIgdmFsdWUgaW4gb2JqKSB7XG4gICAgICAgICAgICBidWlsZGVyLnB1c2goXCI8b3B0aW9uIHZhbHVlPSdcIiArIHZhbHVlICsgXCInIFwiKTtcblxuICAgICAgICAgICAgaWYgKGNWYWx1ZSA9PSB2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGJ1aWxkZXIucHVzaChcIiBzZWxlY3RlZCBcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGJ1aWxkZXIucHVzaChcIj5cIixcbiAgICAgICAgICAgICAgICBvYmpbdmFsdWVdLFxuICAgICAgICAgICAgICAgIFwiPC9vcHRpb24+XCIpO1xuICAgICAgICB9XG4gICAgICAgIGJ1aWxkZXIucHVzaChcIjwvc2VsZWN0PlwiKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBvcHRpb24gaW4gZXhwb3J0cy5kZWZhdWx0T3B0aW9ucykge1xuICAgICAgICB0YWJsZS5wdXNoKFwiPHRyPjx0ZD5cIiwgZGVzY1tvcHRpb25dLCBcIjwvdGQ+XCIpO1xuICAgICAgICB0YWJsZS5wdXNoKFwiPHRkPlwiKTtcbiAgICAgICAgcmVuZGVyT3B0aW9uKHRhYmxlLCBvcHRpb24sIG9wdGlvblZhbHVlc1tvcHRpb25dLCBlZGl0b3IuZ2V0T3B0aW9uKG9wdGlvbikpO1xuICAgICAgICB0YWJsZS5wdXNoKFwiPC90ZD48L3RyPlwiKTtcbiAgICB9XG4gICAgdGFibGUucHVzaChcIjwvdGFibGU+XCIpO1xuICAgIHNldHRpbmdEaXYuaW5uZXJIVE1MID0gdGFibGUuam9pbihcIlwiKTtcblxuICAgIHZhciBvbkNoYW5nZSA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIHNlbGVjdCA9IGUuY3VycmVudFRhcmdldDtcbiAgICAgICAgZWRpdG9yLnNldE9wdGlvbihzZWxlY3QudGl0bGUsIHNlbGVjdC52YWx1ZSk7XG4gICAgfTtcbiAgICB2YXIgb25DbGljayA9IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIGNiID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBlZGl0b3Iuc2V0T3B0aW9uKGNiLnRpdGxlLCBjYi5jaGVja2VkKTtcbiAgICB9O1xuICAgIHZhciBzZWxlY3RzID0gc2V0dGluZ0Rpdi5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNlbGVjdFwiKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNlbGVjdHMubGVuZ3RoOyBpKyspXG4gICAgICAgIHNlbGVjdHNbaV0ub25jaGFuZ2UgPSBvbkNoYW5nZTtcbiAgICB2YXIgY2JzID0gc2V0dGluZ0Rpdi5nZXRFbGVtZW50c0J5VGFnTmFtZShcImlucHV0XCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2JzLmxlbmd0aDsgaSsrKVxuICAgICAgICBjYnNbaV0ub25jbGljayA9IG9uQ2xpY2s7XG5cblxuICAgIHZhciBidXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW5wdXRcIik7XG4gICAgYnV0dG9uLnR5cGUgPSBcImJ1dHRvblwiO1xuICAgIGJ1dHRvbi52YWx1ZSA9IFwiSGlkZVwiO1xuICAgIGV2ZW50LmFkZExpc3RlbmVyKGJ1dHRvbiwgXCJjbGlja1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZWRpdG9yLnNldERpc3BsYXlTZXR0aW5ncyhmYWxzZSk7XG4gICAgfSk7XG4gICAgc2V0dGluZ0Rpdi5hcHBlbmRDaGlsZChidXR0b24pO1xuICAgIHNldHRpbmdEaXYuaGlkZUJ1dHRvbiA9IGJ1dHRvbjtcbn1cblxuLy8gRGVmYXVsdCBzdGFydHVwIG9wdGlvbnMuXG5leHBvcnRzLmRlZmF1bHRPcHRpb25zID0ge1xuICAgIG1vZGU6ICAgICAgICAgICAgICAgXCJqYXZhc2NyaXB0XCIsXG4gICAgdGhlbWU6ICAgICAgICAgICAgICBcInRleHRtYXRlXCIsXG4gICAgd3JhcDogICAgICAgICAgICAgICBcIm9mZlwiLFxuICAgIGZvbnRTaXplOiAgICAgICAgICAgXCIxMnB4XCIsXG4gICAgc2hvd0d1dHRlcjogICAgICAgICBcImZhbHNlXCIsXG4gICAga2V5YmluZGluZ3M6ICAgICAgICBcImFjZVwiLFxuICAgIHNob3dQcmludE1hcmdpbjogICAgXCJmYWxzZVwiLFxuICAgIHVzZVNvZnRUYWJzOiAgICAgICAgXCJ0cnVlXCIsXG4gICAgc2hvd0ludmlzaWJsZXM6ICAgICBcImZhbHNlXCJcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=