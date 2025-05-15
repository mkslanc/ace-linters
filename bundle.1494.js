"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1494],{

/***/ 91494:
/***/ ((__unused_webpack_module, exports) => {

/**
 * Generates a list of themes available when ace was built.
 * @fileOverview Generates a list of themes available when ace was built.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 */



/**
 * @typedef {Object} Theme
 * @property {string} caption - The display caption of the theme.
 * @property {string} theme   - The path or identifier for the ACE theme.
 * @property {boolean} isDark - Indicates whether the theme is dark or light.
 * @property {string} name    - The normalized name used as the key.
 */

var themeData = [
    ["Chrome"         ],
    ["Clouds"         ],
    ["Crimson Editor" ],
    ["Dawn"           ],
    ["Dreamweaver"    ],
    ["Eclipse"        ],
    ["GitHub Light Default" ],
    ["GitHub (Legacy)"      ,"github"                  , "light"],
    ["IPlastic"       ],
    ["Solarized Light"],
    ["TextMate"       ],
    ["Tomorrow"       ],
    ["XCode"          ],
    ["Kuroir"],
    ["KatzenMilch"],
    ["SQL Server"           ,"sqlserver"               , "light"],
    ["CloudEditor"          ,"cloud_editor"            , "light"],
    ["Ambiance"             ,"ambiance"                ,  "dark"],
    ["Chaos"                ,"chaos"                   ,  "dark"],
    ["Clouds Midnight"      ,"clouds_midnight"         ,  "dark"],
    ["Dracula"              ,""                        ,  "dark"],
    ["Cobalt"               ,"cobalt"                  ,  "dark"],
    ["Gruvbox"              ,"gruvbox"                 ,  "dark"],
    ["Green on Black"       ,"gob"                     ,  "dark"],
    ["idle Fingers"         ,"idle_fingers"            ,  "dark"],
    ["krTheme"              ,"kr_theme"                ,  "dark"],
    ["Merbivore"            ,"merbivore"               ,  "dark"],
    ["Merbivore Soft"       ,"merbivore_soft"          ,  "dark"],
    ["Mono Industrial"      ,"mono_industrial"         ,  "dark"],
    ["Monokai"              ,"monokai"                 ,  "dark"],
    ["Nord Dark"            ,"nord_dark"               ,  "dark"],
    ["One Dark"             ,"one_dark"                ,  "dark"],
    ["Pastel on dark"       ,"pastel_on_dark"          ,  "dark"],
    ["Solarized Dark"       ,"solarized_dark"          ,  "dark"],
    ["Terminal"             ,"terminal"                ,  "dark"],
    ["Tomorrow Night"       ,"tomorrow_night"          ,  "dark"],
    ["Tomorrow Night Blue"  ,"tomorrow_night_blue"     ,  "dark"],
    ["Tomorrow Night Bright","tomorrow_night_bright"   ,  "dark"],
    ["Tomorrow Night 80s"   ,"tomorrow_night_eighties" ,  "dark"],
    ["Twilight"             ,"twilight"                ,  "dark"],
    ["Vibrant Ink"          ,"vibrant_ink"             ,  "dark"],
    ["GitHub Dark"          ,"github_dark"             ,  "dark"],
    ["CloudEditor Dark"     ,"cloud_editor_dark"       ,  "dark"]
];

/**
 * @type {Object<string, Theme>}
 */
exports.themesByName = {};

/**
 * An array containing information about available themes.
 * @type {Theme[]}
 */
exports.themes = themeData.map(function(data) {
    var name = data[1] || data[0].replace(/ /g, "_").toLowerCase();
    var theme = {
        caption: data[0],
        theme: "ace/theme/" + name,
        isDark: data[2] == "dark",
        name: name
    };
    exports.themesByName[name] = theme;
    return theme;
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjE0OTQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQSxhQUFhLFFBQVE7QUFDckIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFNBQVM7QUFDdkIsY0FBYyxRQUFRO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFVBQVU7QUFDVjtBQUNBLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3RoZW1lbGlzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEdlbmVyYXRlcyBhIGxpc3Qgb2YgdGhlbWVzIGF2YWlsYWJsZSB3aGVuIGFjZSB3YXMgYnVpbHQuXG4gKiBAZmlsZU92ZXJ2aWV3IEdlbmVyYXRlcyBhIGxpc3Qgb2YgdGhlbWVzIGF2YWlsYWJsZSB3aGVuIGFjZSB3YXMgYnVpbHQuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFRoZW1lXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY2FwdGlvbiAtIFRoZSBkaXNwbGF5IGNhcHRpb24gb2YgdGhlIHRoZW1lLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHRoZW1lICAgLSBUaGUgcGF0aCBvciBpZGVudGlmaWVyIGZvciB0aGUgQUNFIHRoZW1lLlxuICogQHByb3BlcnR5IHtib29sZWFufSBpc0RhcmsgLSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgdGhlbWUgaXMgZGFyayBvciBsaWdodC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lICAgIC0gVGhlIG5vcm1hbGl6ZWQgbmFtZSB1c2VkIGFzIHRoZSBrZXkuXG4gKi9cblxudmFyIHRoZW1lRGF0YSA9IFtcbiAgICBbXCJDaHJvbWVcIiAgICAgICAgIF0sXG4gICAgW1wiQ2xvdWRzXCIgICAgICAgICBdLFxuICAgIFtcIkNyaW1zb24gRWRpdG9yXCIgXSxcbiAgICBbXCJEYXduXCIgICAgICAgICAgIF0sXG4gICAgW1wiRHJlYW13ZWF2ZXJcIiAgICBdLFxuICAgIFtcIkVjbGlwc2VcIiAgICAgICAgXSxcbiAgICBbXCJHaXRIdWIgTGlnaHQgRGVmYXVsdFwiIF0sXG4gICAgW1wiR2l0SHViIChMZWdhY3kpXCIgICAgICAsXCJnaXRodWJcIiAgICAgICAgICAgICAgICAgICwgXCJsaWdodFwiXSxcbiAgICBbXCJJUGxhc3RpY1wiICAgICAgIF0sXG4gICAgW1wiU29sYXJpemVkIExpZ2h0XCJdLFxuICAgIFtcIlRleHRNYXRlXCIgICAgICAgXSxcbiAgICBbXCJUb21vcnJvd1wiICAgICAgIF0sXG4gICAgW1wiWENvZGVcIiAgICAgICAgICBdLFxuICAgIFtcIkt1cm9pclwiXSxcbiAgICBbXCJLYXR6ZW5NaWxjaFwiXSxcbiAgICBbXCJTUUwgU2VydmVyXCIgICAgICAgICAgICxcInNxbHNlcnZlclwiICAgICAgICAgICAgICAgLCBcImxpZ2h0XCJdLFxuICAgIFtcIkNsb3VkRWRpdG9yXCIgICAgICAgICAgLFwiY2xvdWRfZWRpdG9yXCIgICAgICAgICAgICAsIFwibGlnaHRcIl0sXG4gICAgW1wiQW1iaWFuY2VcIiAgICAgICAgICAgICAsXCJhbWJpYW5jZVwiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJDaGFvc1wiICAgICAgICAgICAgICAgICxcImNoYW9zXCIgICAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkNsb3VkcyBNaWRuaWdodFwiICAgICAgLFwiY2xvdWRzX21pZG5pZ2h0XCIgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiRHJhY3VsYVwiICAgICAgICAgICAgICAsXCJcIiAgICAgICAgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJDb2JhbHRcIiAgICAgICAgICAgICAgICxcImNvYmFsdFwiICAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkdydXZib3hcIiAgICAgICAgICAgICAgLFwiZ3J1dmJveFwiICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiR3JlZW4gb24gQmxhY2tcIiAgICAgICAsXCJnb2JcIiAgICAgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJpZGxlIEZpbmdlcnNcIiAgICAgICAgICxcImlkbGVfZmluZ2Vyc1wiICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcImtyVGhlbWVcIiAgICAgICAgICAgICAgLFwia3JfdGhlbWVcIiAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiTWVyYml2b3JlXCIgICAgICAgICAgICAsXCJtZXJiaXZvcmVcIiAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJNZXJiaXZvcmUgU29mdFwiICAgICAgICxcIm1lcmJpdm9yZV9zb2Z0XCIgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk1vbm8gSW5kdXN0cmlhbFwiICAgICAgLFwibW9ub19pbmR1c3RyaWFsXCIgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiTW9ub2thaVwiICAgICAgICAgICAgICAsXCJtb25va2FpXCIgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJOb3JkIERhcmtcIiAgICAgICAgICAgICxcIm5vcmRfZGFya1wiICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk9uZSBEYXJrXCIgICAgICAgICAgICAgLFwib25lX2RhcmtcIiAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiUGFzdGVsIG9uIGRhcmtcIiAgICAgICAsXCJwYXN0ZWxfb25fZGFya1wiICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJTb2xhcml6ZWQgRGFya1wiICAgICAgICxcInNvbGFyaXplZF9kYXJrXCIgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlRlcm1pbmFsXCIgICAgICAgICAgICAgLFwidGVybWluYWxcIiAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVG9tb3Jyb3cgTmlnaHRcIiAgICAgICAsXCJ0b21vcnJvd19uaWdodFwiICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUb21vcnJvdyBOaWdodCBCbHVlXCIgICxcInRvbW9ycm93X25pZ2h0X2JsdWVcIiAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlRvbW9ycm93IE5pZ2h0IEJyaWdodFwiLFwidG9tb3Jyb3dfbmlnaHRfYnJpZ2h0XCIgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVG9tb3Jyb3cgTmlnaHQgODBzXCIgICAsXCJ0b21vcnJvd19uaWdodF9laWdodGllc1wiICwgIFwiZGFya1wiXSxcbiAgICBbXCJUd2lsaWdodFwiICAgICAgICAgICAgICxcInR3aWxpZ2h0XCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlZpYnJhbnQgSW5rXCIgICAgICAgICAgLFwidmlicmFudF9pbmtcIiAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiR2l0SHViIERhcmtcIiAgICAgICAgICAsXCJnaXRodWJfZGFya1wiICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJDbG91ZEVkaXRvciBEYXJrXCIgICAgICxcImNsb3VkX2VkaXRvcl9kYXJrXCIgICAgICAgLCAgXCJkYXJrXCJdXG5dO1xuXG4vKipcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBUaGVtZT59XG4gKi9cbmV4cG9ydHMudGhlbWVzQnlOYW1lID0ge307XG5cbi8qKlxuICogQW4gYXJyYXkgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCBhdmFpbGFibGUgdGhlbWVzLlxuICogQHR5cGUge1RoZW1lW119XG4gKi9cbmV4cG9ydHMudGhlbWVzID0gdGhlbWVEYXRhLm1hcChmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIG5hbWUgPSBkYXRhWzFdIHx8IGRhdGFbMF0ucmVwbGFjZSgvIC9nLCBcIl9cIikudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgdGhlbWUgPSB7XG4gICAgICAgIGNhcHRpb246IGRhdGFbMF0sXG4gICAgICAgIHRoZW1lOiBcImFjZS90aGVtZS9cIiArIG5hbWUsXG4gICAgICAgIGlzRGFyazogZGF0YVsyXSA9PSBcImRhcmtcIixcbiAgICAgICAgbmFtZTogbmFtZVxuICAgIH07XG4gICAgZXhwb3J0cy50aGVtZXNCeU5hbWVbbmFtZV0gPSB0aGVtZTtcbiAgICByZXR1cm4gdGhlbWU7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==