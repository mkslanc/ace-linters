"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4404],{

/***/ 54404:
/***/ ((module, exports, __webpack_require__) => {



var event = __webpack_require__(17989);
var UA = __webpack_require__(50618);
var ace = __webpack_require__(59100);

module.exports = exports = ace;

/*
 * Returns the CSS property of element.
 *   1) If the CSS property is on the style object of the element, use it, OR
 *   2) Compute the CSS property
 *
 * If the property can't get computed, is 'auto' or 'intrinsic', the former
 * calculated property is used (this can happen in cases where the textarea
 * is hidden and has no dimension styles).
 */
var getCSSProperty = function(element, container, property) {
    var ret = element.style[property];

    if (!ret) {
        if (window.getComputedStyle) {
            ret = window.getComputedStyle(element, '').getPropertyValue(property);
        } else {
            ret = element.currentStyle[property];
        }
    }

    if (!ret || ret == 'auto' || ret == 'intrinsic') {
        ret = container.style[property];
    }
    return ret;
};

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
        container.setAttribute('style', style);
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
        container.style.zIndex = 100000;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQ0MDQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLEtBQWM7QUFDbEMsU0FBUyxtQkFBTyxDQUFDLEtBQWtCO0FBQ25DLFVBQVUsbUJBQU8sQ0FBQyxLQUFROztBQUUxQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxRUFBcUU7QUFDckUsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLG9CQUFvQjs7QUFFNUQ7QUFDQSx1Q0FBdUM7QUFDdkM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsZUFBZTtBQUN4QixLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvQkFBb0I7QUFDeEM7QUFDQTtBQUNBLG9CQUFvQixnQkFBZ0I7QUFDcEM7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3RleHRhcmVhLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgZXZlbnQgPSByZXF1aXJlKFwiLi4vbGliL2V2ZW50XCIpO1xudmFyIFVBID0gcmVxdWlyZShcIi4uL2xpYi91c2VyYWdlbnRcIik7XG52YXIgYWNlID0gcmVxdWlyZShcIi4uL2FjZVwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzID0gYWNlO1xuXG4vKlxuICogUmV0dXJucyB0aGUgQ1NTIHByb3BlcnR5IG9mIGVsZW1lbnQuXG4gKiAgIDEpIElmIHRoZSBDU1MgcHJvcGVydHkgaXMgb24gdGhlIHN0eWxlIG9iamVjdCBvZiB0aGUgZWxlbWVudCwgdXNlIGl0LCBPUlxuICogICAyKSBDb21wdXRlIHRoZSBDU1MgcHJvcGVydHlcbiAqXG4gKiBJZiB0aGUgcHJvcGVydHkgY2FuJ3QgZ2V0IGNvbXB1dGVkLCBpcyAnYXV0bycgb3IgJ2ludHJpbnNpYycsIHRoZSBmb3JtZXJcbiAqIGNhbGN1bGF0ZWQgcHJvcGVydHkgaXMgdXNlZCAodGhpcyBjYW4gaGFwcGVuIGluIGNhc2VzIHdoZXJlIHRoZSB0ZXh0YXJlYVxuICogaXMgaGlkZGVuIGFuZCBoYXMgbm8gZGltZW5zaW9uIHN0eWxlcykuXG4gKi9cbnZhciBnZXRDU1NQcm9wZXJ0eSA9IGZ1bmN0aW9uKGVsZW1lbnQsIGNvbnRhaW5lciwgcHJvcGVydHkpIHtcbiAgICB2YXIgcmV0ID0gZWxlbWVudC5zdHlsZVtwcm9wZXJ0eV07XG5cbiAgICBpZiAoIXJldCkge1xuICAgICAgICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcbiAgICAgICAgICAgIHJldCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQsICcnKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3BlcnR5KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldCA9IGVsZW1lbnQuY3VycmVudFN0eWxlW3Byb3BlcnR5XTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmICghcmV0IHx8IHJldCA9PSAnYXV0bycgfHwgcmV0ID09ICdpbnRyaW5zaWMnKSB7XG4gICAgICAgIHJldCA9IGNvbnRhaW5lci5zdHlsZVtwcm9wZXJ0eV07XG4gICAgfVxuICAgIHJldHVybiByZXQ7XG59O1xuXG5mdW5jdGlvbiBhcHBseVN0eWxlcyhlbG0sIHN0eWxlcykge1xuICAgIGZvciAodmFyIHN0eWxlIGluIHN0eWxlcykge1xuICAgICAgICBlbG0uc3R5bGVbc3R5bGVdID0gc3R5bGVzW3N0eWxlXTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldHVwQ29udGFpbmVyKGVsZW1lbnQsIGdldFZhbHVlKSB7XG4gICAgaWYgKGVsZW1lbnQudHlwZSAhPSAndGV4dGFyZWEnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIlRleHRhcmVhIHJlcXVpcmVkIVwiKTtcbiAgICB9XG5cbiAgICB2YXIgcGFyZW50Tm9kZSA9IGVsZW1lbnQucGFyZW50Tm9kZTtcblxuICAgIC8vIFRoaXMgd2lsbCBob2xkIHRoZSBlZGl0b3IuXG4gICAgdmFyIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgLy8gVG8gcHV0IEFjZSBpbiB0aGUgcGxhY2Ugb2YgdGhlIHRleHRhcmVhLCB3ZSBoYXZlIHRvIGNvcHkgYSBmZXcgb2YgdGhlXG4gICAgLy8gdGV4dGFyZWEncyBzdHlsZSBhdHRyaWJ1dGVzIHRvIHRoZSBkaXYgY29udGFpbmVyLlxuICAgIC8vXG4gICAgLy8gVGhlIHByb2JsZW0gaXMgdGhhdCB0aGUgcHJvcGVydGllcyBoYXZlIHRvIGdldCBjb21wdXRlZCAodGhleSBtaWdodCBiZVxuICAgIC8vIGRlZmluZWQgYnkgYSBDU1MgZmlsZSBvbiB0aGUgcGFnZSAtIHlvdSBjYW4ndCBhY2Nlc3Mgc3VjaCBydWxlcyB0aGF0XG4gICAgLy8gYXBwbHkgdG8gYW4gZWxlbWVudCB2aWEgZWxtLnN0eWxlKS4gQ29tcHV0ZWQgcHJvcGVydGllcyBhcmUgY29udmVydGVkIHRvXG4gICAgLy8gcGl4ZWxzIGFsdGhvdWdoIHRoZSBkaW1lbnNpb24gbWlnaHQgYmUgZ2l2ZW4gYXMgcGVyY2VudGFnZS4gV2hlbiB0aGVcbiAgICAvLyB3aW5kb3cgcmVzaXplcywgdGhlIGRpbWVuc2lvbnMgZGVmaW5lZCBieSBwZXJjZW50YWdlcyBjaGFuZ2VzLCBzbyB0aGVcbiAgICAvLyBwcm9wZXJ0aWVzIGhhdmUgdG8gZ2V0IHJlY29tcHV0ZWQgdG8gZ2V0IHRoZSBuZXcvdHJ1ZSBwaXhlbHMuXG4gICAgdmFyIHJlc2l6ZUV2ZW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzdHlsZSA9ICdwb3NpdGlvbjpyZWxhdGl2ZTsnO1xuICAgICAgICBbXG4gICAgICAgICAgICAnbWFyZ2luLXRvcCcsICdtYXJnaW4tbGVmdCcsICdtYXJnaW4tcmlnaHQnLCAnbWFyZ2luLWJvdHRvbSdcbiAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHN0eWxlICs9IGl0ZW0gKyAnOicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0Q1NTUHJvcGVydHkoZWxlbWVudCwgY29udGFpbmVyLCBpdGVtKSArICc7JztcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ2FsY3VsYXRpbmcgdGhlIHdpZHRoL2hlaWdodCBvZiB0aGUgdGV4dGFyZWEgaXMgc29tZXdoYXQgdHJpY2t5LiBUb1xuICAgICAgICAvLyBkbyBpdCByaWdodCwgeW91IGhhdmUgdG8gaW5jbHVkZSB0aGUgcGFkZGluZ3MgdG8gdGhlIHNpZGVzIGFzIHdlbGxcbiAgICAgICAgLy8gKGVnLiB3aWR0aCA9IHdpZHRoICsgcGFkZGluZy1sZWZ0LCAtcmlnaHQpLiAgVGhpcyB3b3JrcyB3ZWxsLCBhc1xuICAgICAgICAvLyBsb25nIGFzIHRoZSB3aWR0aCBvZiB0aGUgZWxlbWVudCBpcyBub3Qgc2V0IG9yIGdpdmVuIGluIHBpeGVscy4gSW5cbiAgICAgICAgLy8gdGhpcyBjYXNlIGFuZCBhZnRlciB0aGUgdGV4dGFyZWEgaXMgaGlkZGVuLCBnZXRDU1NQcm9wZXJ0eShlbGVtZW50LFxuICAgICAgICAvLyBjb250YWluZXIsICd3aWR0aCcpIHdpbGwgc3RpbGwgcmV0dXJuIHBpeGVsIHZhbHVlLiBJZiB0aGUgZWxlbWVudFxuICAgICAgICAvLyBoYXMgcmVhbHRpdiBkaW1lbnNpb25zIChlLmcuIHdpZHRoPSc5NTxwZXJjZW50PicpXG4gICAgICAgIC8vIGdldENTU1Byb3BlcnR5KC4uLikgd2lsbCByZXR1cm4gcGl4ZWwgdmFsdWVzIG9ubHkgYXMgbG9uZyBhcyB0aGVcbiAgICAgICAgLy8gdGV4dGFyZWEgaXMgdmlzaWJsZS4gQWZ0ZXIgaXQgaXMgaGlkZGVuIGdldENTU1Byb3BlcnR5IHdpbGwgcmV0dXJuXG4gICAgICAgIC8vIHRoZSByZWxhdGl2ZSBkaW1lbnNpb25zIGFzIHRoZXkgYXJlIHNldCBvbiB0aGUgZWxlbWVudCAoaW4gdGhlIGNhc2VcbiAgICAgICAgLy8gb2Ygd2lkdGgsIDk1PHBlcmNlbnQ+KS5cbiAgICAgICAgLy8gTWFraW5nIHRoZSBzdW0gb2YgcGl4ZWwgdmF1bGVzIChlLmcuIHBhZGRpbmcpIGFuZCByZWFsdGl2ZSB2YWx1ZXNcbiAgICAgICAgLy8gKGUuZy4gPHBlcmNlbnQ+KSBpcyBub3QgcG9zc2libGUuIEFzIHN1Y2ggdGhlIHBhZGRpbmcgc3R5bGVzIGFyZVxuICAgICAgICAvLyBpZ25vcmVkLlxuXG4gICAgICAgIC8vIFRoZSBjb21wbGV0ZSB3aWR0aCBpcyB0aGUgd2lkdGggb2YgdGhlIHRleHRhcmVhICsgdGhlIHBhZGRpbmdcbiAgICAgICAgLy8gdG8gdGhlIGxlZnQgYW5kIHJpZ2h0LlxuICAgICAgICB2YXIgd2lkdGggPSBnZXRDU1NQcm9wZXJ0eShlbGVtZW50LCBjb250YWluZXIsICd3aWR0aCcpIHx8IChlbGVtZW50LmNsaWVudFdpZHRoICsgXCJweFwiKTtcbiAgICAgICAgdmFyIGhlaWdodCA9IGdldENTU1Byb3BlcnR5KGVsZW1lbnQsIGNvbnRhaW5lciwgJ2hlaWdodCcpICB8fCAoZWxlbWVudC5jbGllbnRIZWlnaHQgKyBcInB4XCIpO1xuICAgICAgICBzdHlsZSArPSAnaGVpZ2h0OicgKyBoZWlnaHQgKyAnO3dpZHRoOicgKyB3aWR0aCArICc7JztcblxuICAgICAgICAvLyBTZXQgdGhlIGRpc3BsYXkgcHJvcGVydHkgdG8gJ2lubGluZS1ibG9jaycuXG4gICAgICAgIHN0eWxlICs9ICdkaXNwbGF5OmlubGluZS1ibG9jazsnO1xuICAgICAgICBjb250YWluZXIuc2V0QXR0cmlidXRlKCdzdHlsZScsIHN0eWxlKTtcbiAgICB9O1xuICAgIGV2ZW50LmFkZExpc3RlbmVyKHdpbmRvdywgJ3Jlc2l6ZScsIHJlc2l6ZUV2ZW50KTtcblxuICAgIC8vIENhbGwgdGhlIHJlc2l6ZUV2ZW50IG9uY2UsIHNvIHRoYXQgdGhlIHNpemUgb2YgdGhlIGNvbnRhaW5lciBpc1xuICAgIC8vIGNhbGN1bGF0ZWQuXG4gICAgcmVzaXplRXZlbnQoKTtcblxuICAgIC8vIEluc2VydCB0aGUgZGl2IGNvbnRhaW5lciBhZnRlciB0aGUgZWxlbWVudC5cbiAgICBwYXJlbnROb2RlLmluc2VydEJlZm9yZShjb250YWluZXIsIGVsZW1lbnQubmV4dFNpYmxpbmcpO1xuXG4gICAgLy8gT3ZlcnJpZGUgdGhlIGZvcm1zIG9uc3VibWl0IGZ1bmN0aW9uLiBTZXQgdGhlIGlubmVySFRNTCBhbmQgdmFsdWVcbiAgICAvLyBvZiB0aGUgdGV4dGFyZWEgYmVmb3JlIHN1Ym1pdHRpbmcuXG4gICAgd2hpbGUgKHBhcmVudE5vZGUgIT09IGRvY3VtZW50KSB7XG4gICAgICAgIGlmIChwYXJlbnROb2RlLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gJ0ZPUk0nKSB7XG4gICAgICAgICAgICB2YXIgb2xkU3VtaXQgPSBwYXJlbnROb2RlLm9uc3VibWl0O1xuICAgICAgICAgICAgLy8gT3ZlcnJpZGUgdGhlIG9uc3VibWl0IGZ1bmN0aW9uIG9mIHRoZSBmb3JtLlxuICAgICAgICAgICAgcGFyZW50Tm9kZS5vbnN1Ym1pdCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICAgICAgIGVsZW1lbnQudmFsdWUgPSBnZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZXJlIGlzIGEgb25zdWJtaXQgZnVuY3Rpb24gYWxyZWFkeSwgdGhlbiBjYWxsXG4gICAgICAgICAgICAgICAgLy8gaXQgd2l0aCB0aGUgY3VycmVudCBjb250ZXh0IGFuZCBwYXNzIHRoZSBldmVudC5cbiAgICAgICAgICAgICAgICBpZiAob2xkU3VtaXQpIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkU3VtaXQuY2FsbCh0aGlzLCBldnQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBwYXJlbnROb2RlID0gcGFyZW50Tm9kZS5wYXJlbnROb2RlO1xuICAgIH1cbiAgICByZXR1cm4gY29udGFpbmVyO1xufVxuXG5leHBvcnRzLnRyYW5zZm9ybVRleHRhcmVhID0gZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgIHZhciBpc0ZvY3VzZWQgPSBlbGVtZW50LmF1dG9mb2N1cyB8fCBkb2N1bWVudC5hY3RpdmVFbGVtZW50ID09IGVsZW1lbnQ7XG4gICAgdmFyIHNlc3Npb247XG4gICAgdmFyIGNvbnRhaW5lciA9IHNldHVwQ29udGFpbmVyKGVsZW1lbnQsIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRWYWx1ZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gSGlkZSB0aGUgZWxlbWVudC5cbiAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgY29udGFpbmVyLnN0eWxlLmJhY2tncm91bmQgPSAnd2hpdGUnO1xuXG4gICAgLy9cbiAgICB2YXIgZWRpdG9yRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBhcHBseVN0eWxlcyhlZGl0b3JEaXYsIHtcbiAgICAgICAgdG9wOiBcIjBweFwiLFxuICAgICAgICBsZWZ0OiBcIjBweFwiLFxuICAgICAgICByaWdodDogXCIwcHhcIixcbiAgICAgICAgYm90dG9tOiBcIjBweFwiLFxuICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkIGdyYXlcIixcbiAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIlxuICAgIH0pO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChlZGl0b3JEaXYpO1xuXG4gICAgdmFyIHNldHRpbmdPcGVuZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIGFwcGx5U3R5bGVzKHNldHRpbmdPcGVuZXIsIHtcbiAgICAgICAgcG9zaXRpb246IFwiYWJzb2x1dGVcIixcbiAgICAgICAgcmlnaHQ6IFwiMHB4XCIsXG4gICAgICAgIGJvdHRvbTogXCIwcHhcIixcbiAgICAgICAgY3Vyc29yOiBcIm53LXJlc2l6ZVwiLFxuICAgICAgICBib3JkZXI6IFwic29saWQgOXB4XCIsXG4gICAgICAgIGJvcmRlckNvbG9yOiBcImxpZ2h0Ymx1ZSBncmF5IGdyYXkgI2NlYWRlNlwiLFxuICAgICAgICB6SW5kZXg6IDEwMVxuICAgIH0pO1xuXG4gICAgdmFyIHNldHRpbmdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgIHZhciBzZXR0aW5nRGl2U3R5bGVzID0ge1xuICAgICAgICB0b3A6IFwiMHB4XCIsXG4gICAgICAgIGxlZnQ6IFwiMjAlXCIsXG4gICAgICAgIHJpZ2h0OiBcIjBweFwiLFxuICAgICAgICBib3R0b206IFwiMHB4XCIsXG4gICAgICAgIHBvc2l0aW9uOiBcImFic29sdXRlXCIsXG4gICAgICAgIHBhZGRpbmc6IFwiNXB4XCIsXG4gICAgICAgIHpJbmRleDogMTAwLFxuICAgICAgICBjb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgICBkaXNwbGF5OiBcIm5vbmVcIixcbiAgICAgICAgb3ZlcmZsb3c6IFwiYXV0b1wiLFxuICAgICAgICBmb250U2l6ZTogXCIxNHB4XCIsXG4gICAgICAgIGJveFNoYWRvdzogXCItNXB4IDJweCAzcHggZ3JheVwiXG4gICAgfTtcbiAgICBpZiAoIVVBLmlzT2xkSUUpIHtcbiAgICAgICAgc2V0dGluZ0RpdlN0eWxlcy5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwgMCwgMCwgMC42KVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNldHRpbmdEaXZTdHlsZXMuYmFja2dyb3VuZENvbG9yID0gXCIjMzMzXCI7XG4gICAgfVxuXG4gICAgYXBwbHlTdHlsZXMoc2V0dGluZ0Rpdiwgc2V0dGluZ0RpdlN0eWxlcyk7XG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHNldHRpbmdEaXYpO1xuXG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwgZXhwb3J0cy5kZWZhdWx0T3B0aW9ucztcbiAgICAvLyBQb3dlciB1cCBhY2Ugb24gdGhlIHRleHRhcmVhOlxuICAgIHZhciBlZGl0b3IgPSBhY2UuZWRpdChlZGl0b3JEaXYpO1xuICAgIHNlc3Npb24gPSBlZGl0b3IuZ2V0U2Vzc2lvbigpO1xuXG4gICAgc2Vzc2lvbi5zZXRWYWx1ZShlbGVtZW50LnZhbHVlIHx8IGVsZW1lbnQuaW5uZXJIVE1MKTtcbiAgICBpZiAoaXNGb2N1c2VkKVxuICAgICAgICBlZGl0b3IuZm9jdXMoKTtcblxuICAgIC8vIEFkZCB0aGUgc2V0dGluZ1BhbmVsIG9wZW5lciB0byB0aGUgZWRpdG9yJ3MgZGl2LlxuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzZXR0aW5nT3BlbmVyKTtcblxuICAgIC8vIENyZWF0ZSB0aGUgQVBJLlxuICAgIHNldHVwQXBpKGVkaXRvciwgZWRpdG9yRGl2LCBzZXR0aW5nRGl2LCBhY2UsIG9wdGlvbnMpO1xuXG4gICAgLy8gQ3JlYXRlIHRoZSBzZXR0aW5nJ3MgcGFuZWwuXG4gICAgc2V0dXBTZXR0aW5nUGFuZWwoc2V0dGluZ0Rpdiwgc2V0dGluZ09wZW5lciwgZWRpdG9yKTtcblxuICAgIHZhciBzdGF0ZSA9IFwiXCI7XG4gICAgZXZlbnQuYWRkTGlzdGVuZXIoc2V0dGluZ09wZW5lciwgXCJtb3VzZW1vdmVcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgcmVjdCA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciB4ID0gZS5jbGllbnRYIC0gcmVjdC5sZWZ0LCB5ID0gZS5jbGllbnRZIC0gcmVjdC50b3A7XG4gICAgICAgIGlmICh4ICsgeSA8IChyZWN0LndpZHRoICsgcmVjdC5oZWlnaHQpLzIpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGUuY3Vyc29yID0gXCJwb2ludGVyXCI7XG4gICAgICAgICAgICBzdGF0ZSA9IFwidG9nZ2xlXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdGF0ZSA9IFwicmVzaXplXCI7XG4gICAgICAgICAgICB0aGlzLnN0eWxlLmN1cnNvciA9IFwibnctcmVzaXplXCI7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIGV2ZW50LmFkZExpc3RlbmVyKHNldHRpbmdPcGVuZXIsIFwibW91c2Vkb3duXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAoc3RhdGUgPT0gXCJ0b2dnbGVcIikge1xuICAgICAgICAgICAgZWRpdG9yLnNldERpc3BsYXlTZXR0aW5ncygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnRhaW5lci5zdHlsZS56SW5kZXggPSAxMDAwMDA7XG4gICAgICAgIHZhciByZWN0ID0gY29udGFpbmVyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB2YXIgc3RhcnRYID0gcmVjdC53aWR0aCAgKyByZWN0LmxlZnQgLSBlLmNsaWVudFg7XG4gICAgICAgIHZhciBzdGFydFkgPSByZWN0LmhlaWdodCAgKyByZWN0LnRvcCAtIGUuY2xpZW50WTtcbiAgICAgICAgZXZlbnQuY2FwdHVyZShzZXR0aW5nT3BlbmVyLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBjb250YWluZXIuc3R5bGUud2lkdGggPSBlLmNsaWVudFggLSByZWN0LmxlZnQgKyBzdGFydFggKyBcInB4XCI7XG4gICAgICAgICAgICBjb250YWluZXIuc3R5bGUuaGVpZ2h0ID0gZS5jbGllbnRZIC0gcmVjdC50b3AgKyBzdGFydFkgKyBcInB4XCI7XG4gICAgICAgICAgICBlZGl0b3IucmVzaXplKCk7XG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge30pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGVkaXRvcjtcbn07XG5cbmZ1bmN0aW9uIHNldHVwQXBpKGVkaXRvciwgZWRpdG9yRGl2LCBzZXR0aW5nRGl2LCBhY2UsIG9wdGlvbnMpIHtcbiAgICBmdW5jdGlvbiB0b0Jvb2wodmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlID09PSBcInRydWVcIiB8fCB2YWx1ZSA9PSB0cnVlO1xuICAgIH1cblxuICAgIGVkaXRvci5zZXREaXNwbGF5U2V0dGluZ3MgPSBmdW5jdGlvbihkaXNwbGF5KSB7XG4gICAgICAgIGlmIChkaXNwbGF5ID09IG51bGwpXG4gICAgICAgICAgICBkaXNwbGF5ID0gc2V0dGluZ0Rpdi5zdHlsZS5kaXNwbGF5ID09IFwibm9uZVwiO1xuICAgICAgICBpZiAoZGlzcGxheSkge1xuICAgICAgICAgICAgc2V0dGluZ0Rpdi5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgc2V0dGluZ0Rpdi5oaWRlQnV0dG9uLmZvY3VzKCk7XG4gICAgICAgICAgICBlZGl0b3Iub24oXCJmb2N1c1wiLCBmdW5jdGlvbiBvbkZvY3VzKCkge1xuICAgICAgICAgICAgICAgIGVkaXRvci5yZW1vdmVMaXN0ZW5lcihcImZvY3VzXCIsIG9uRm9jdXMpO1xuICAgICAgICAgICAgICAgIHNldHRpbmdEaXYuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBlZGl0b3IuJHNldE9wdGlvbiA9IGVkaXRvci5zZXRPcHRpb247XG4gICAgZWRpdG9yLiRnZXRPcHRpb24gPSBlZGl0b3IuZ2V0T3B0aW9uO1xuICAgIGVkaXRvci5zZXRPcHRpb24gPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICBjYXNlIFwibW9kZVwiOlxuICAgICAgICAgICAgICAgIGVkaXRvci4kc2V0T3B0aW9uKFwibW9kZVwiLCBcImFjZS9tb2RlL1wiICsgdmFsdWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwidGhlbWVcIjpcbiAgICAgICAgICAgICAgICBlZGl0b3IuJHNldE9wdGlvbihcInRoZW1lXCIsIFwiYWNlL3RoZW1lL1wiICsgdmFsdWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIFwia2V5YmluZGluZ3NcIjpcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJ2aW1cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRvci5zZXRLZXlib2FyZEhhbmRsZXIoXCJhY2Uva2V5Ym9hcmQvdmltXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgXCJlbWFjc1wiOlxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNldEtleWJvYXJkSGFuZGxlcihcImFjZS9rZXlib2FyZC9lbWFjc1wiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yLnNldEtleWJvYXJkSGFuZGxlcihudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSBcIndyYXBcIjpcbiAgICAgICAgICAgIGNhc2UgXCJmb250U2l6ZVwiOlxuICAgICAgICAgICAgICAgIGVkaXRvci4kc2V0T3B0aW9uKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZWRpdG9yLiRzZXRPcHRpb24oa2V5LCB0b0Jvb2wodmFsdWUpKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBlZGl0b3IuZ2V0T3B0aW9uID0gZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgIHN3aXRjaCAoa2V5KSB7XG4gICAgICAgICAgICBjYXNlIFwibW9kZVwiOlxuICAgICAgICAgICAgICAgIHJldHVybiBlZGl0b3IuJGdldE9wdGlvbihcIm1vZGVcIikuc3Vic3RyKFwiYWNlL21vZGUvXCIubGVuZ3RoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwidGhlbWVcIjpcbiAgICAgICAgICAgICAgICByZXR1cm4gZWRpdG9yLiRnZXRPcHRpb24oXCJ0aGVtZVwiKS5zdWJzdHIoXCJhY2UvdGhlbWUvXCIubGVuZ3RoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlIFwia2V5YmluZGluZ3NcIjpcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBlZGl0b3IuZ2V0S2V5Ym9hcmRIYW5kbGVyKCk7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh2YWx1ZSAmJiB2YWx1ZS4kaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBcImFjZS9rZXlib2FyZC92aW1cIjpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBcInZpbVwiO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIFwiYWNlL2tleWJvYXJkL2VtYWNzXCI6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gXCJlbWFjc1wiO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFwiYWNlXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGVkaXRvci4kZ2V0T3B0aW9uKGtleSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZWRpdG9yLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgcmV0dXJuIGVkaXRvcjtcbn1cblxuZnVuY3Rpb24gc2V0dXBTZXR0aW5nUGFuZWwoc2V0dGluZ0Rpdiwgc2V0dGluZ09wZW5lciwgZWRpdG9yKSB7XG4gICAgdmFyIEJPT0wgPSBudWxsO1xuXG4gICAgdmFyIGRlc2MgPSB7XG4gICAgICAgIG1vZGU6ICAgICAgICAgICAgXCJNb2RlOlwiLFxuICAgICAgICB3cmFwOiAgICAgICAgICAgIFwiU29mdCBXcmFwOlwiLFxuICAgICAgICB0aGVtZTogICAgICAgICAgIFwiVGhlbWU6XCIsXG4gICAgICAgIGZvbnRTaXplOiAgICAgICAgXCJGb250IFNpemU6XCIsXG4gICAgICAgIHNob3dHdXR0ZXI6ICAgICAgXCJEaXNwbGF5IEd1dHRlcjpcIixcbiAgICAgICAga2V5YmluZGluZ3M6ICAgICBcIktleWJvYXJkXCIsXG4gICAgICAgIHNob3dQcmludE1hcmdpbjogXCJTaG93IFByaW50IE1hcmdpbjpcIixcbiAgICAgICAgdXNlU29mdFRhYnM6ICAgICBcIlVzZSBTb2Z0IFRhYnM6XCIsXG4gICAgICAgIHNob3dJbnZpc2libGVzOiAgXCJTaG93IEludmlzaWJsZXNcIlxuICAgIH07XG5cbiAgICB2YXIgb3B0aW9uVmFsdWVzID0ge1xuICAgICAgICBtb2RlOiB7XG4gICAgICAgICAgICB0ZXh0OiAgICAgICBcIlBsYWluXCIsXG4gICAgICAgICAgICBqYXZhc2NyaXB0OiBcIkphdmFTY3JpcHRcIixcbiAgICAgICAgICAgIHhtbDogICAgICAgIFwiWE1MXCIsXG4gICAgICAgICAgICBodG1sOiAgICAgICBcIkhUTUxcIixcbiAgICAgICAgICAgIGNzczogICAgICAgIFwiQ1NTXCIsXG4gICAgICAgICAgICBzY3NzOiAgICAgICBcIlNDU1NcIixcbiAgICAgICAgICAgIHB5dGhvbjogICAgIFwiUHl0aG9uXCIsXG4gICAgICAgICAgICBwaHA6ICAgICAgICBcIlBIUFwiLFxuICAgICAgICAgICAgamF2YTogICAgICAgXCJKYXZhXCIsXG4gICAgICAgICAgICBydWJ5OiAgICAgICBcIlJ1YnlcIixcbiAgICAgICAgICAgIGNfY3BwOiAgICAgIFwiQy9DKytcIixcbiAgICAgICAgICAgIGNvZmZlZTogICAgIFwiQ29mZmVlU2NyaXB0XCIsXG4gICAgICAgICAgICBqc29uOiAgICAgICBcImpzb25cIixcbiAgICAgICAgICAgIHBlcmw6ICAgICAgIFwiUGVybFwiLFxuICAgICAgICAgICAgY2xvanVyZTogICAgXCJDbG9qdXJlXCIsXG4gICAgICAgICAgICBvY2FtbDogICAgICBcIk9DYW1sXCIsXG4gICAgICAgICAgICBjc2hhcnA6ICAgICBcIkMjXCIsXG4gICAgICAgICAgICBoYXhlOiAgICAgICBcImhhWGVcIixcbiAgICAgICAgICAgIHN2ZzogICAgICAgIFwiU1ZHXCIsXG4gICAgICAgICAgICB0ZXh0aWxlOiAgICBcIlRleHRpbGVcIixcbiAgICAgICAgICAgIGdyb292eTogICAgIFwiR3Jvb3Z5XCIsXG4gICAgICAgICAgICBsaXF1aWQ6ICAgICBcIkxpcXVpZFwiLFxuICAgICAgICAgICAgU2NhbGE6ICAgICAgXCJTY2FsYVwiXG4gICAgICAgIH0sXG4gICAgICAgIHRoZW1lOiB7XG4gICAgICAgICAgICBjbG91ZHM6ICAgICAgICAgICBcIkNsb3Vkc1wiLFxuICAgICAgICAgICAgY2xvdWRzX21pZG5pZ2h0OiAgXCJDbG91ZHMgTWlkbmlnaHRcIixcbiAgICAgICAgICAgIGNvYmFsdDogICAgICAgICAgIFwiQ29iYWx0XCIsXG4gICAgICAgICAgICBjcmltc29uX2VkaXRvcjogICBcIkNyaW1zb24gRWRpdG9yXCIsXG4gICAgICAgICAgICBkYXduOiAgICAgICAgICAgICBcIkRhd25cIixcbiAgICAgICAgICAgIGdvYjogICAgICAgICAgICAgIFwiR3JlZW4gb24gQmxhY2tcIixcbiAgICAgICAgICAgIGVjbGlwc2U6ICAgICAgICAgIFwiRWNsaXBzZVwiLFxuICAgICAgICAgICAgaWRsZV9maW5nZXJzOiAgICAgXCJJZGxlIEZpbmdlcnNcIixcbiAgICAgICAgICAgIGtyX3RoZW1lOiAgICAgICAgIFwiS3IgVGhlbWVcIixcbiAgICAgICAgICAgIG1lcmJpdm9yZTogICAgICAgIFwiTWVyYml2b3JlXCIsXG4gICAgICAgICAgICBtZXJiaXZvcmVfc29mdDogICBcIk1lcmJpdm9yZSBTb2Z0XCIsXG4gICAgICAgICAgICBtb25vX2luZHVzdHJpYWw6ICBcIk1vbm8gSW5kdXN0cmlhbFwiLFxuICAgICAgICAgICAgbW9ub2thaTogICAgICAgICAgXCJNb25va2FpXCIsXG4gICAgICAgICAgICBwYXN0ZWxfb25fZGFyazogICBcIlBhc3RlbCBPbiBEYXJrXCIsXG4gICAgICAgICAgICBzb2xhcml6ZWRfZGFyazogICBcIlNvbGFyaXplZCBEYXJrXCIsXG4gICAgICAgICAgICBzb2xhcml6ZWRfbGlnaHQ6ICBcIlNvbGFyaXplZCBMaWdodFwiLFxuICAgICAgICAgICAgdGV4dG1hdGU6ICAgICAgICAgXCJUZXh0bWF0ZVwiLFxuICAgICAgICAgICAgdHdpbGlnaHQ6ICAgICAgICAgXCJUd2lsaWdodFwiLFxuICAgICAgICAgICAgdmlicmFudF9pbms6ICAgICAgXCJWaWJyYW50IElua1wiXG4gICAgICAgIH0sXG4gICAgICAgIHNob3dHdXR0ZXI6IEJPT0wsXG4gICAgICAgIGZvbnRTaXplOiB7XG4gICAgICAgICAgICBcIjEwcHhcIjogXCIxMHB4XCIsXG4gICAgICAgICAgICBcIjExcHhcIjogXCIxMXB4XCIsXG4gICAgICAgICAgICBcIjEycHhcIjogXCIxMnB4XCIsXG4gICAgICAgICAgICBcIjE0cHhcIjogXCIxNHB4XCIsXG4gICAgICAgICAgICBcIjE2cHhcIjogXCIxNnB4XCJcbiAgICAgICAgfSxcbiAgICAgICAgd3JhcDoge1xuICAgICAgICAgICAgb2ZmOiAgICBcIk9mZlwiLFxuICAgICAgICAgICAgNDA6ICAgICBcIjQwXCIsXG4gICAgICAgICAgICA4MDogICAgIFwiODBcIixcbiAgICAgICAgICAgIGZyZWU6ICAgXCJGcmVlXCJcbiAgICAgICAgfSxcbiAgICAgICAga2V5YmluZGluZ3M6IHtcbiAgICAgICAgICAgIGFjZTogXCJhY2VcIixcbiAgICAgICAgICAgIHZpbTogXCJ2aW1cIixcbiAgICAgICAgICAgIGVtYWNzOiBcImVtYWNzXCJcbiAgICAgICAgfSxcbiAgICAgICAgc2hvd1ByaW50TWFyZ2luOiAgICBCT09MLFxuICAgICAgICB1c2VTb2Z0VGFiczogICAgICAgIEJPT0wsXG4gICAgICAgIHNob3dJbnZpc2libGVzOiAgICAgQk9PTFxuICAgIH07XG5cbiAgICB2YXIgdGFibGUgPSBbXTtcbiAgICB0YWJsZS5wdXNoKFwiPHRhYmxlPjx0cj48dGg+U2V0dGluZzwvdGg+PHRoPlZhbHVlPC90aD48L3RyPlwiKTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlck9wdGlvbihidWlsZGVyLCBvcHRpb24sIG9iaiwgY1ZhbHVlKSB7XG4gICAgICAgIGlmICghb2JqKSB7XG4gICAgICAgICAgICBidWlsZGVyLnB1c2goXG4gICAgICAgICAgICAgICAgXCI8aW5wdXQgdHlwZT0nY2hlY2tib3gnIHRpdGxlPSdcIiwgb3B0aW9uLCBcIicgXCIsXG4gICAgICAgICAgICAgICAgICAgIGNWYWx1ZSArIFwiXCIgPT0gXCJ0cnVlXCIgPyBcImNoZWNrZWQ9J3RydWUnXCIgOiBcIlwiLFxuICAgICAgICAgICAgICAgXCInPjwvaW5wdXQ+XCJcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYnVpbGRlci5wdXNoKFwiPHNlbGVjdCB0aXRsZT0nXCIgKyBvcHRpb24gKyBcIic+XCIpO1xuICAgICAgICBmb3IgKHZhciB2YWx1ZSBpbiBvYmopIHtcbiAgICAgICAgICAgIGJ1aWxkZXIucHVzaChcIjxvcHRpb24gdmFsdWU9J1wiICsgdmFsdWUgKyBcIicgXCIpO1xuXG4gICAgICAgICAgICBpZiAoY1ZhbHVlID09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgYnVpbGRlci5wdXNoKFwiIHNlbGVjdGVkIFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnVpbGRlci5wdXNoKFwiPlwiLFxuICAgICAgICAgICAgICAgIG9ialt2YWx1ZV0sXG4gICAgICAgICAgICAgICAgXCI8L29wdGlvbj5cIik7XG4gICAgICAgIH1cbiAgICAgICAgYnVpbGRlci5wdXNoKFwiPC9zZWxlY3Q+XCIpO1xuICAgIH1cblxuICAgIGZvciAodmFyIG9wdGlvbiBpbiBleHBvcnRzLmRlZmF1bHRPcHRpb25zKSB7XG4gICAgICAgIHRhYmxlLnB1c2goXCI8dHI+PHRkPlwiLCBkZXNjW29wdGlvbl0sIFwiPC90ZD5cIik7XG4gICAgICAgIHRhYmxlLnB1c2goXCI8dGQ+XCIpO1xuICAgICAgICByZW5kZXJPcHRpb24odGFibGUsIG9wdGlvbiwgb3B0aW9uVmFsdWVzW29wdGlvbl0sIGVkaXRvci5nZXRPcHRpb24ob3B0aW9uKSk7XG4gICAgICAgIHRhYmxlLnB1c2goXCI8L3RkPjwvdHI+XCIpO1xuICAgIH1cbiAgICB0YWJsZS5wdXNoKFwiPC90YWJsZT5cIik7XG4gICAgc2V0dGluZ0Rpdi5pbm5lckhUTUwgPSB0YWJsZS5qb2luKFwiXCIpO1xuXG4gICAgdmFyIG9uQ2hhbmdlID0gZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgc2VsZWN0ID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBlZGl0b3Iuc2V0T3B0aW9uKHNlbGVjdC50aXRsZSwgc2VsZWN0LnZhbHVlKTtcbiAgICB9O1xuICAgIHZhciBvbkNsaWNrID0gZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgY2IgPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGVkaXRvci5zZXRPcHRpb24oY2IudGl0bGUsIGNiLmNoZWNrZWQpO1xuICAgIH07XG4gICAgdmFyIHNlbGVjdHMgPSBzZXR0aW5nRGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2VsZWN0XCIpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2VsZWN0cy5sZW5ndGg7IGkrKylcbiAgICAgICAgc2VsZWN0c1tpXS5vbmNoYW5nZSA9IG9uQ2hhbmdlO1xuICAgIHZhciBjYnMgPSBzZXR0aW5nRGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW5wdXRcIik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYnMubGVuZ3RoOyBpKyspXG4gICAgICAgIGNic1tpXS5vbmNsaWNrID0gb25DbGljaztcblxuXG4gICAgdmFyIGJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcbiAgICBidXR0b24udHlwZSA9IFwiYnV0dG9uXCI7XG4gICAgYnV0dG9uLnZhbHVlID0gXCJIaWRlXCI7XG4gICAgZXZlbnQuYWRkTGlzdGVuZXIoYnV0dG9uLCBcImNsaWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBlZGl0b3Iuc2V0RGlzcGxheVNldHRpbmdzKGZhbHNlKTtcbiAgICB9KTtcbiAgICBzZXR0aW5nRGl2LmFwcGVuZENoaWxkKGJ1dHRvbik7XG4gICAgc2V0dGluZ0Rpdi5oaWRlQnV0dG9uID0gYnV0dG9uO1xufVxuXG4vLyBEZWZhdWx0IHN0YXJ0dXAgb3B0aW9ucy5cbmV4cG9ydHMuZGVmYXVsdE9wdGlvbnMgPSB7XG4gICAgbW9kZTogICAgICAgICAgICAgICBcImphdmFzY3JpcHRcIixcbiAgICB0aGVtZTogICAgICAgICAgICAgIFwidGV4dG1hdGVcIixcbiAgICB3cmFwOiAgICAgICAgICAgICAgIFwib2ZmXCIsXG4gICAgZm9udFNpemU6ICAgICAgICAgICBcIjEycHhcIixcbiAgICBzaG93R3V0dGVyOiAgICAgICAgIFwiZmFsc2VcIixcbiAgICBrZXliaW5kaW5nczogICAgICAgIFwiYWNlXCIsXG4gICAgc2hvd1ByaW50TWFyZ2luOiAgICBcImZhbHNlXCIsXG4gICAgdXNlU29mdFRhYnM6ICAgICAgICBcInRydWVcIixcbiAgICBzaG93SW52aXNpYmxlczogICAgIFwiZmFsc2VcIlxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==