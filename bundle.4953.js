"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4953],{

/***/ 84953:
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
    ["GitHub"         ],
    ["IPlastic"       ],
    ["Solarized Light"],
    ["TextMate"       ],
    ["Tomorrow"       ],
    ["XCode"          ],
    ["Kuroir"],
    ["KatzenMilch"],
    ["SQL Server"           ,"sqlserver"               , "light"],
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
    ["GitHub Dark"          ,"github_dark"             ,  "dark"]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQ5NTMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3RoZW1lbGlzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEdlbmVyYXRlcyBhIGxpc3Qgb2YgdGhlbWVzIGF2YWlsYWJsZSB3aGVuIGFjZSB3YXMgYnVpbHQuXG4gKiBAZmlsZU92ZXJ2aWV3IEdlbmVyYXRlcyBhIGxpc3Qgb2YgdGhlbWVzIGF2YWlsYWJsZSB3aGVuIGFjZSB3YXMgYnVpbHQuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgdGhlbWVEYXRhID0gW1xuICAgIFtcIkNocm9tZVwiICAgICAgICAgXSxcbiAgICBbXCJDbG91ZHNcIiAgICAgICAgIF0sXG4gICAgW1wiQ3JpbXNvbiBFZGl0b3JcIiBdLFxuICAgIFtcIkRhd25cIiAgICAgICAgICAgXSxcbiAgICBbXCJEcmVhbXdlYXZlclwiICAgIF0sXG4gICAgW1wiRWNsaXBzZVwiICAgICAgICBdLFxuICAgIFtcIkdpdEh1YlwiICAgICAgICAgXSxcbiAgICBbXCJJUGxhc3RpY1wiICAgICAgIF0sXG4gICAgW1wiU29sYXJpemVkIExpZ2h0XCJdLFxuICAgIFtcIlRleHRNYXRlXCIgICAgICAgXSxcbiAgICBbXCJUb21vcnJvd1wiICAgICAgIF0sXG4gICAgW1wiWENvZGVcIiAgICAgICAgICBdLFxuICAgIFtcIkt1cm9pclwiXSxcbiAgICBbXCJLYXR6ZW5NaWxjaFwiXSxcbiAgICBbXCJTUUwgU2VydmVyXCIgICAgICAgICAgICxcInNxbHNlcnZlclwiICAgICAgICAgICAgICAgLCBcImxpZ2h0XCJdLFxuICAgIFtcIkFtYmlhbmNlXCIgICAgICAgICAgICAgLFwiYW1iaWFuY2VcIiAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiQ2hhb3NcIiAgICAgICAgICAgICAgICAsXCJjaGFvc1wiICAgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJDbG91ZHMgTWlkbmlnaHRcIiAgICAgICxcImNsb3Vkc19taWRuaWdodFwiICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkRyYWN1bGFcIiAgICAgICAgICAgICAgLFwiXCIgICAgICAgICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiQ29iYWx0XCIgICAgICAgICAgICAgICAsXCJjb2JhbHRcIiAgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJHcnV2Ym94XCIgICAgICAgICAgICAgICxcImdydXZib3hcIiAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkdyZWVuIG9uIEJsYWNrXCIgICAgICAgLFwiZ29iXCIgICAgICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiaWRsZSBGaW5nZXJzXCIgICAgICAgICAsXCJpZGxlX2ZpbmdlcnNcIiAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJrclRoZW1lXCIgICAgICAgICAgICAgICxcImtyX3RoZW1lXCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk1lcmJpdm9yZVwiICAgICAgICAgICAgLFwibWVyYml2b3JlXCIgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiTWVyYml2b3JlIFNvZnRcIiAgICAgICAsXCJtZXJiaXZvcmVfc29mdFwiICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJNb25vIEluZHVzdHJpYWxcIiAgICAgICxcIm1vbm9faW5kdXN0cmlhbFwiICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk1vbm9rYWlcIiAgICAgICAgICAgICAgLFwibW9ub2thaVwiICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiTm9yZCBEYXJrXCIgICAgICAgICAgICAsXCJub3JkX2RhcmtcIiAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJPbmUgRGFya1wiICAgICAgICAgICAgICxcIm9uZV9kYXJrXCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlBhc3RlbCBvbiBkYXJrXCIgICAgICAgLFwicGFzdGVsX29uX2RhcmtcIiAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiU29sYXJpemVkIERhcmtcIiAgICAgICAsXCJzb2xhcml6ZWRfZGFya1wiICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUZXJtaW5hbFwiICAgICAgICAgICAgICxcInRlcm1pbmFsXCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlRvbW9ycm93IE5pZ2h0XCIgICAgICAgLFwidG9tb3Jyb3dfbmlnaHRcIiAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVG9tb3Jyb3cgTmlnaHQgQmx1ZVwiICAsXCJ0b21vcnJvd19uaWdodF9ibHVlXCIgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUb21vcnJvdyBOaWdodCBCcmlnaHRcIixcInRvbW9ycm93X25pZ2h0X2JyaWdodFwiICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlRvbW9ycm93IE5pZ2h0IDgwc1wiICAgLFwidG9tb3Jyb3dfbmlnaHRfZWlnaHRpZXNcIiAsICBcImRhcmtcIl0sXG4gICAgW1wiVHdpbGlnaHRcIiAgICAgICAgICAgICAsXCJ0d2lsaWdodFwiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJWaWJyYW50IElua1wiICAgICAgICAgICxcInZpYnJhbnRfaW5rXCIgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkdpdEh1YiBEYXJrXCIgICAgICAgICAgLFwiZ2l0aHViX2RhcmtcIiAgICAgICAgICAgICAsICBcImRhcmtcIl1cbl07XG5cblxuZXhwb3J0cy50aGVtZXNCeU5hbWUgPSB7fTtcblxuLyoqXG4gKiBBbiBhcnJheSBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IGF2YWlsYWJsZSB0aGVtZXMuXG4gKi9cbmV4cG9ydHMudGhlbWVzID0gdGhlbWVEYXRhLm1hcChmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIG5hbWUgPSBkYXRhWzFdIHx8IGRhdGFbMF0ucmVwbGFjZSgvIC9nLCBcIl9cIikudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgdGhlbWUgPSB7XG4gICAgICAgIGNhcHRpb246IGRhdGFbMF0sXG4gICAgICAgIHRoZW1lOiBcImFjZS90aGVtZS9cIiArIG5hbWUsXG4gICAgICAgIGlzRGFyazogZGF0YVsyXSA9PSBcImRhcmtcIixcbiAgICAgICAgbmFtZTogbmFtZVxuICAgIH07XG4gICAgZXhwb3J0cy50aGVtZXNCeU5hbWVbbmFtZV0gPSB0aGVtZTtcbiAgICByZXR1cm4gdGhlbWU7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==