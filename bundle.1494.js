"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1494],{

/***/ 91494:
/***/ ((__unused_webpack_module, exports) => {

/**
 * ## Theme enumeration utility
 *
 * Provides theme management for the Ace Editor by generating and organizing available themes into
 * categorized collections. Automatically maps theme data into structured objects containing theme metadata including
 * display captions, theme paths, brightness classification (dark/light), and normalized names. Exports both an
 * indexed theme collection and a complete themes array for easy integration with theme selection components
 * and configuration systems.
 *
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 * @module
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjE0OTQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBLGFBQWEsUUFBUTtBQUNyQixjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsU0FBUztBQUN2QixjQUFjLFFBQVE7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBVTtBQUNWO0FBQ0Esb0JBQW9COztBQUVwQjtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvdGhlbWVsaXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogIyMgVGhlbWUgZW51bWVyYXRpb24gdXRpbGl0eVxuICpcbiAqIFByb3ZpZGVzIHRoZW1lIG1hbmFnZW1lbnQgZm9yIHRoZSBBY2UgRWRpdG9yIGJ5IGdlbmVyYXRpbmcgYW5kIG9yZ2FuaXppbmcgYXZhaWxhYmxlIHRoZW1lcyBpbnRvXG4gKiBjYXRlZ29yaXplZCBjb2xsZWN0aW9ucy4gQXV0b21hdGljYWxseSBtYXBzIHRoZW1lIGRhdGEgaW50byBzdHJ1Y3R1cmVkIG9iamVjdHMgY29udGFpbmluZyB0aGVtZSBtZXRhZGF0YSBpbmNsdWRpbmdcbiAqIGRpc3BsYXkgY2FwdGlvbnMsIHRoZW1lIHBhdGhzLCBicmlnaHRuZXNzIGNsYXNzaWZpY2F0aW9uIChkYXJrL2xpZ2h0KSwgYW5kIG5vcm1hbGl6ZWQgbmFtZXMuIEV4cG9ydHMgYm90aCBhblxuICogaW5kZXhlZCB0aGVtZSBjb2xsZWN0aW9uIGFuZCBhIGNvbXBsZXRlIHRoZW1lcyBhcnJheSBmb3IgZWFzeSBpbnRlZ3JhdGlvbiB3aXRoIHRoZW1lIHNlbGVjdGlvbiBjb21wb25lbnRzXG4gKiBhbmQgY29uZmlndXJhdGlvbiBzeXN0ZW1zLlxuICpcbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiBAbW9kdWxlXG4gKi9cbi8qKlxuICogR2VuZXJhdGVzIGEgbGlzdCBvZiB0aGVtZXMgYXZhaWxhYmxlIHdoZW4gYWNlIHdhcyBidWlsdC5cbiAqIEBmaWxlT3ZlcnZpZXcgR2VuZXJhdGVzIGEgbGlzdCBvZiB0aGVtZXMgYXZhaWxhYmxlIHdoZW4gYWNlIHdhcyBidWlsdC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gVGhlbWVcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjYXB0aW9uIC0gVGhlIGRpc3BsYXkgY2FwdGlvbiBvZiB0aGUgdGhlbWUuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdGhlbWUgICAtIFRoZSBwYXRoIG9yIGlkZW50aWZpZXIgZm9yIHRoZSBBQ0UgdGhlbWUuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzRGFyayAtIEluZGljYXRlcyB3aGV0aGVyIHRoZSB0aGVtZSBpcyBkYXJrIG9yIGxpZ2h0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IG5hbWUgICAgLSBUaGUgbm9ybWFsaXplZCBuYW1lIHVzZWQgYXMgdGhlIGtleS5cbiAqL1xuXG52YXIgdGhlbWVEYXRhID0gW1xuICAgIFtcIkNocm9tZVwiICAgICAgICAgXSxcbiAgICBbXCJDbG91ZHNcIiAgICAgICAgIF0sXG4gICAgW1wiQ3JpbXNvbiBFZGl0b3JcIiBdLFxuICAgIFtcIkRhd25cIiAgICAgICAgICAgXSxcbiAgICBbXCJEcmVhbXdlYXZlclwiICAgIF0sXG4gICAgW1wiRWNsaXBzZVwiICAgICAgICBdLFxuICAgIFtcIkdpdEh1YiBMaWdodCBEZWZhdWx0XCIgXSxcbiAgICBbXCJHaXRIdWIgKExlZ2FjeSlcIiAgICAgICxcImdpdGh1YlwiICAgICAgICAgICAgICAgICAgLCBcImxpZ2h0XCJdLFxuICAgIFtcIklQbGFzdGljXCIgICAgICAgXSxcbiAgICBbXCJTb2xhcml6ZWQgTGlnaHRcIl0sXG4gICAgW1wiVGV4dE1hdGVcIiAgICAgICBdLFxuICAgIFtcIlRvbW9ycm93XCIgICAgICAgXSxcbiAgICBbXCJYQ29kZVwiICAgICAgICAgIF0sXG4gICAgW1wiS3Vyb2lyXCJdLFxuICAgIFtcIkthdHplbk1pbGNoXCJdLFxuICAgIFtcIlNRTCBTZXJ2ZXJcIiAgICAgICAgICAgLFwic3Fsc2VydmVyXCIgICAgICAgICAgICAgICAsIFwibGlnaHRcIl0sXG4gICAgW1wiQ2xvdWRFZGl0b3JcIiAgICAgICAgICAsXCJjbG91ZF9lZGl0b3JcIiAgICAgICAgICAgICwgXCJsaWdodFwiXSxcbiAgICBbXCJBbWJpYW5jZVwiICAgICAgICAgICAgICxcImFtYmlhbmNlXCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkNoYW9zXCIgICAgICAgICAgICAgICAgLFwiY2hhb3NcIiAgICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiQ2xvdWRzIE1pZG5pZ2h0XCIgICAgICAsXCJjbG91ZHNfbWlkbmlnaHRcIiAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJEcmFjdWxhXCIgICAgICAgICAgICAgICxcIlwiICAgICAgICAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkNvYmFsdFwiICAgICAgICAgICAgICAgLFwiY29iYWx0XCIgICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiR3J1dmJveFwiICAgICAgICAgICAgICAsXCJncnV2Ym94XCIgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJHcmVlbiBvbiBCbGFja1wiICAgICAgICxcImdvYlwiICAgICAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcImlkbGUgRmluZ2Vyc1wiICAgICAgICAgLFwiaWRsZV9maW5nZXJzXCIgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wia3JUaGVtZVwiICAgICAgICAgICAgICAsXCJrcl90aGVtZVwiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJNZXJiaXZvcmVcIiAgICAgICAgICAgICxcIm1lcmJpdm9yZVwiICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk1lcmJpdm9yZSBTb2Z0XCIgICAgICAgLFwibWVyYml2b3JlX3NvZnRcIiAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiTW9ubyBJbmR1c3RyaWFsXCIgICAgICAsXCJtb25vX2luZHVzdHJpYWxcIiAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJNb25va2FpXCIgICAgICAgICAgICAgICxcIm1vbm9rYWlcIiAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk5vcmQgRGFya1wiICAgICAgICAgICAgLFwibm9yZF9kYXJrXCIgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiT25lIERhcmtcIiAgICAgICAgICAgICAsXCJvbmVfZGFya1wiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJQYXN0ZWwgb24gZGFya1wiICAgICAgICxcInBhc3RlbF9vbl9kYXJrXCIgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlNvbGFyaXplZCBEYXJrXCIgICAgICAgLFwic29sYXJpemVkX2RhcmtcIiAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVGVybWluYWxcIiAgICAgICAgICAgICAsXCJ0ZXJtaW5hbFwiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUb21vcnJvdyBOaWdodFwiICAgICAgICxcInRvbW9ycm93X25pZ2h0XCIgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlRvbW9ycm93IE5pZ2h0IEJsdWVcIiAgLFwidG9tb3Jyb3dfbmlnaHRfYmx1ZVwiICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVG9tb3Jyb3cgTmlnaHQgQnJpZ2h0XCIsXCJ0b21vcnJvd19uaWdodF9icmlnaHRcIiAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUb21vcnJvdyBOaWdodCA4MHNcIiAgICxcInRvbW9ycm93X25pZ2h0X2VpZ2h0aWVzXCIgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlR3aWxpZ2h0XCIgICAgICAgICAgICAgLFwidHdpbGlnaHRcIiAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVmlicmFudCBJbmtcIiAgICAgICAgICAsXCJ2aWJyYW50X2lua1wiICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJHaXRIdWIgRGFya1wiICAgICAgICAgICxcImdpdGh1Yl9kYXJrXCIgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkNsb3VkRWRpdG9yIERhcmtcIiAgICAgLFwiY2xvdWRfZWRpdG9yX2RhcmtcIiAgICAgICAsICBcImRhcmtcIl1cbl07XG5cbi8qKlxuICogQHR5cGUge09iamVjdDxzdHJpbmcsIFRoZW1lPn1cbiAqL1xuZXhwb3J0cy50aGVtZXNCeU5hbWUgPSB7fTtcblxuLyoqXG4gKiBBbiBhcnJheSBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IGF2YWlsYWJsZSB0aGVtZXMuXG4gKiBAdHlwZSB7VGhlbWVbXX1cbiAqL1xuZXhwb3J0cy50aGVtZXMgPSB0aGVtZURhdGEubWFwKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgbmFtZSA9IGRhdGFbMV0gfHwgZGF0YVswXS5yZXBsYWNlKC8gL2csIFwiX1wiKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciB0aGVtZSA9IHtcbiAgICAgICAgY2FwdGlvbjogZGF0YVswXSxcbiAgICAgICAgdGhlbWU6IFwiYWNlL3RoZW1lL1wiICsgbmFtZSxcbiAgICAgICAgaXNEYXJrOiBkYXRhWzJdID09IFwiZGFya1wiLFxuICAgICAgICBuYW1lOiBuYW1lXG4gICAgfTtcbiAgICBleHBvcnRzLnRoZW1lc0J5TmFtZVtuYW1lXSA9IHRoZW1lO1xuICAgIHJldHVybiB0aGVtZTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9