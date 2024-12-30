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


exports.themesByName = {};

/**
 * An array containing information about available themes.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjE0OTQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3RoZW1lbGlzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEdlbmVyYXRlcyBhIGxpc3Qgb2YgdGhlbWVzIGF2YWlsYWJsZSB3aGVuIGFjZSB3YXMgYnVpbHQuXG4gKiBAZmlsZU92ZXJ2aWV3IEdlbmVyYXRlcyBhIGxpc3Qgb2YgdGhlbWVzIGF2YWlsYWJsZSB3aGVuIGFjZSB3YXMgYnVpbHQuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgdGhlbWVEYXRhID0gW1xuICAgIFtcIkNocm9tZVwiICAgICAgICAgXSxcbiAgICBbXCJDbG91ZHNcIiAgICAgICAgIF0sXG4gICAgW1wiQ3JpbXNvbiBFZGl0b3JcIiBdLFxuICAgIFtcIkRhd25cIiAgICAgICAgICAgXSxcbiAgICBbXCJEcmVhbXdlYXZlclwiICAgIF0sXG4gICAgW1wiRWNsaXBzZVwiICAgICAgICBdLFxuICAgIFtcIkdpdEh1YiBMaWdodCBEZWZhdWx0XCIgXSxcbiAgICBbXCJHaXRIdWIgKExlZ2FjeSlcIiAgICAgICxcImdpdGh1YlwiICAgICAgICAgICAgICAgICAgLCBcImxpZ2h0XCJdLFxuICAgIFtcIklQbGFzdGljXCIgICAgICAgXSxcbiAgICBbXCJTb2xhcml6ZWQgTGlnaHRcIl0sXG4gICAgW1wiVGV4dE1hdGVcIiAgICAgICBdLFxuICAgIFtcIlRvbW9ycm93XCIgICAgICAgXSxcbiAgICBbXCJYQ29kZVwiICAgICAgICAgIF0sXG4gICAgW1wiS3Vyb2lyXCJdLFxuICAgIFtcIkthdHplbk1pbGNoXCJdLFxuICAgIFtcIlNRTCBTZXJ2ZXJcIiAgICAgICAgICAgLFwic3Fsc2VydmVyXCIgICAgICAgICAgICAgICAsIFwibGlnaHRcIl0sXG4gICAgW1wiQ2xvdWRFZGl0b3JcIiAgICAgICAgICAsXCJjbG91ZF9lZGl0b3JcIiAgICAgICAgICAgICwgXCJsaWdodFwiXSxcbiAgICBbXCJBbWJpYW5jZVwiICAgICAgICAgICAgICxcImFtYmlhbmNlXCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkNoYW9zXCIgICAgICAgICAgICAgICAgLFwiY2hhb3NcIiAgICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiQ2xvdWRzIE1pZG5pZ2h0XCIgICAgICAsXCJjbG91ZHNfbWlkbmlnaHRcIiAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJEcmFjdWxhXCIgICAgICAgICAgICAgICxcIlwiICAgICAgICAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkNvYmFsdFwiICAgICAgICAgICAgICAgLFwiY29iYWx0XCIgICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiR3J1dmJveFwiICAgICAgICAgICAgICAsXCJncnV2Ym94XCIgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJHcmVlbiBvbiBCbGFja1wiICAgICAgICxcImdvYlwiICAgICAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcImlkbGUgRmluZ2Vyc1wiICAgICAgICAgLFwiaWRsZV9maW5nZXJzXCIgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wia3JUaGVtZVwiICAgICAgICAgICAgICAsXCJrcl90aGVtZVwiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJNZXJiaXZvcmVcIiAgICAgICAgICAgICxcIm1lcmJpdm9yZVwiICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk1lcmJpdm9yZSBTb2Z0XCIgICAgICAgLFwibWVyYml2b3JlX3NvZnRcIiAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiTW9ubyBJbmR1c3RyaWFsXCIgICAgICAsXCJtb25vX2luZHVzdHJpYWxcIiAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJNb25va2FpXCIgICAgICAgICAgICAgICxcIm1vbm9rYWlcIiAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk5vcmQgRGFya1wiICAgICAgICAgICAgLFwibm9yZF9kYXJrXCIgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiT25lIERhcmtcIiAgICAgICAgICAgICAsXCJvbmVfZGFya1wiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJQYXN0ZWwgb24gZGFya1wiICAgICAgICxcInBhc3RlbF9vbl9kYXJrXCIgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlNvbGFyaXplZCBEYXJrXCIgICAgICAgLFwic29sYXJpemVkX2RhcmtcIiAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVGVybWluYWxcIiAgICAgICAgICAgICAsXCJ0ZXJtaW5hbFwiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUb21vcnJvdyBOaWdodFwiICAgICAgICxcInRvbW9ycm93X25pZ2h0XCIgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlRvbW9ycm93IE5pZ2h0IEJsdWVcIiAgLFwidG9tb3Jyb3dfbmlnaHRfYmx1ZVwiICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVG9tb3Jyb3cgTmlnaHQgQnJpZ2h0XCIsXCJ0b21vcnJvd19uaWdodF9icmlnaHRcIiAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUb21vcnJvdyBOaWdodCA4MHNcIiAgICxcInRvbW9ycm93X25pZ2h0X2VpZ2h0aWVzXCIgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlR3aWxpZ2h0XCIgICAgICAgICAgICAgLFwidHdpbGlnaHRcIiAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVmlicmFudCBJbmtcIiAgICAgICAgICAsXCJ2aWJyYW50X2lua1wiICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJHaXRIdWIgRGFya1wiICAgICAgICAgICxcImdpdGh1Yl9kYXJrXCIgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkNsb3VkRWRpdG9yIERhcmtcIiAgICAgLFwiY2xvdWRfZWRpdG9yX2RhcmtcIiAgICAgICAsICBcImRhcmtcIl1cbl07XG5cblxuZXhwb3J0cy50aGVtZXNCeU5hbWUgPSB7fTtcblxuLyoqXG4gKiBBbiBhcnJheSBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IGF2YWlsYWJsZSB0aGVtZXMuXG4gKi9cbmV4cG9ydHMudGhlbWVzID0gdGhlbWVEYXRhLm1hcChmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIG5hbWUgPSBkYXRhWzFdIHx8IGRhdGFbMF0ucmVwbGFjZSgvIC9nLCBcIl9cIikudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgdGhlbWUgPSB7XG4gICAgICAgIGNhcHRpb246IGRhdGFbMF0sXG4gICAgICAgIHRoZW1lOiBcImFjZS90aGVtZS9cIiArIG5hbWUsXG4gICAgICAgIGlzRGFyazogZGF0YVsyXSA9PSBcImRhcmtcIixcbiAgICAgICAgbmFtZTogbmFtZVxuICAgIH07XG4gICAgZXhwb3J0cy50aGVtZXNCeU5hbWVbbmFtZV0gPSB0aGVtZTtcbiAgICByZXR1cm4gdGhlbWU7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==