(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[334,8320],{

/***/ 80334:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(48320);
exports.scope = "robot";


/***/ }),

/***/ 48320:
/***/ ((module) => {

module.exports = `# scope: robot
### Sections
snippet settingssection
description *** Settings *** section
	*** Settings ***
	Library    \${1}

snippet keywordssection
description *** Keywords *** section
	*** Keywords ***
	\${1:Keyword Name}
	    [Arguments]    \\\${\${2:Example Arg 1}}
	
snippet testcasessection
description *** Test Cases *** section
	*** Test Cases ***
	\${1:First Test Case}
	    \${2:Log    Example Arg}

snippet variablessection
description *** Variables *** section
	*** Variables ***
	\\\${\${1:Variable Name}}=    \${2:Variable Value}

### Helpful keywords
snippet testcase
description A test case
	\${1:Test Case Name}
	    \${2:Log    Example log message}
	
snippet keyword
description A keyword
	\${1:Example Keyword}
	    [Arguments]    \\\${\${2:Example Arg 1}}

### Built Ins
snippet forinr
description For In Range Loop
	FOR    \\\${\${1:Index}}    IN RANGE     \\\${\${2:10}}
	    Log     \\\${\${1:Index}}
	END

snippet forin
description For In Loop
	FOR    \\\${\${1:Item}}    IN     @{\${2:List Variable}}
	    Log     \\\${\${1:Item}}
	END

snippet if
description If Statement
	IF    \${1:condition}
	    \${2:Do something}
	END

snippet else
description If Statement
	IF    \${1:Condition}
	    \${2:Do something}
	ELSE
	    \${3:Otherwise do this}
	END

snippet elif
description Else-If Statement
	IF    \${1:Condition 1}
	    \${2:Do something}
	ELSE IF    \${3:Condition 2}
	    \${4:Do something else}
	END
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjMzNC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYixnREFBaUQ7QUFDakQsYUFBYTs7Ozs7Ozs7QUNIYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0oseUJBQXlCLEdBQUc7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQSxNQUFNLEdBQUcsaUJBQWlCLFFBQVE7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLHlCQUF5QixHQUFHOztBQUU1QjtBQUNBO0FBQ0E7QUFDQSxhQUFhLEdBQUcsYUFBYSxrQkFBa0IsR0FBRztBQUNsRCxrQkFBa0IsR0FBRztBQUNyQjs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxHQUFHLFlBQVksU0FBUyxHQUFHO0FBQ3hDLGtCQUFrQixHQUFHO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsUUFBUTtBQUNSOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsUUFBUTtBQUNSLGVBQWU7QUFDZixRQUFRO0FBQ1I7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL3JvYm90LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL3JvYm90LnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLnNuaXBwZXRUZXh0ID0gcmVxdWlyZShcIi4vcm9ib3Quc25pcHBldHNcIik7XG5leHBvcnRzLnNjb3BlID0gXCJyb2JvdFwiO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBgIyBzY29wZTogcm9ib3RcbiMjIyBTZWN0aW9uc1xuc25pcHBldCBzZXR0aW5nc3NlY3Rpb25cbmRlc2NyaXB0aW9uICoqKiBTZXR0aW5ncyAqKiogc2VjdGlvblxuXHQqKiogU2V0dGluZ3MgKioqXG5cdExpYnJhcnkgICAgXFwkezF9XG5cbnNuaXBwZXQga2V5d29yZHNzZWN0aW9uXG5kZXNjcmlwdGlvbiAqKiogS2V5d29yZHMgKioqIHNlY3Rpb25cblx0KioqIEtleXdvcmRzICoqKlxuXHRcXCR7MTpLZXl3b3JkIE5hbWV9XG5cdCAgICBbQXJndW1lbnRzXSAgICBcXFxcXFwke1xcJHsyOkV4YW1wbGUgQXJnIDF9fVxuXHRcbnNuaXBwZXQgdGVzdGNhc2Vzc2VjdGlvblxuZGVzY3JpcHRpb24gKioqIFRlc3QgQ2FzZXMgKioqIHNlY3Rpb25cblx0KioqIFRlc3QgQ2FzZXMgKioqXG5cdFxcJHsxOkZpcnN0IFRlc3QgQ2FzZX1cblx0ICAgIFxcJHsyOkxvZyAgICBFeGFtcGxlIEFyZ31cblxuc25pcHBldCB2YXJpYWJsZXNzZWN0aW9uXG5kZXNjcmlwdGlvbiAqKiogVmFyaWFibGVzICoqKiBzZWN0aW9uXG5cdCoqKiBWYXJpYWJsZXMgKioqXG5cdFxcXFxcXCR7XFwkezE6VmFyaWFibGUgTmFtZX19PSAgICBcXCR7MjpWYXJpYWJsZSBWYWx1ZX1cblxuIyMjIEhlbHBmdWwga2V5d29yZHNcbnNuaXBwZXQgdGVzdGNhc2VcbmRlc2NyaXB0aW9uIEEgdGVzdCBjYXNlXG5cdFxcJHsxOlRlc3QgQ2FzZSBOYW1lfVxuXHQgICAgXFwkezI6TG9nICAgIEV4YW1wbGUgbG9nIG1lc3NhZ2V9XG5cdFxuc25pcHBldCBrZXl3b3JkXG5kZXNjcmlwdGlvbiBBIGtleXdvcmRcblx0XFwkezE6RXhhbXBsZSBLZXl3b3JkfVxuXHQgICAgW0FyZ3VtZW50c10gICAgXFxcXFxcJHtcXCR7MjpFeGFtcGxlIEFyZyAxfX1cblxuIyMjIEJ1aWx0IEluc1xuc25pcHBldCBmb3JpbnJcbmRlc2NyaXB0aW9uIEZvciBJbiBSYW5nZSBMb29wXG5cdEZPUiAgICBcXFxcXFwke1xcJHsxOkluZGV4fX0gICAgSU4gUkFOR0UgICAgIFxcXFxcXCR7XFwkezI6MTB9fVxuXHQgICAgTG9nICAgICBcXFxcXFwke1xcJHsxOkluZGV4fX1cblx0RU5EXG5cbnNuaXBwZXQgZm9yaW5cbmRlc2NyaXB0aW9uIEZvciBJbiBMb29wXG5cdEZPUiAgICBcXFxcXFwke1xcJHsxOkl0ZW19fSAgICBJTiAgICAgQHtcXCR7MjpMaXN0IFZhcmlhYmxlfX1cblx0ICAgIExvZyAgICAgXFxcXFxcJHtcXCR7MTpJdGVtfX1cblx0RU5EXG5cbnNuaXBwZXQgaWZcbmRlc2NyaXB0aW9uIElmIFN0YXRlbWVudFxuXHRJRiAgICBcXCR7MTpjb25kaXRpb259XG5cdCAgICBcXCR7MjpEbyBzb21ldGhpbmd9XG5cdEVORFxuXG5zbmlwcGV0IGVsc2VcbmRlc2NyaXB0aW9uIElmIFN0YXRlbWVudFxuXHRJRiAgICBcXCR7MTpDb25kaXRpb259XG5cdCAgICBcXCR7MjpEbyBzb21ldGhpbmd9XG5cdEVMU0Vcblx0ICAgIFxcJHszOk90aGVyd2lzZSBkbyB0aGlzfVxuXHRFTkRcblxuc25pcHBldCBlbGlmXG5kZXNjcmlwdGlvbiBFbHNlLUlmIFN0YXRlbWVudFxuXHRJRiAgICBcXCR7MTpDb25kaXRpb24gMX1cblx0ICAgIFxcJHsyOkRvIHNvbWV0aGluZ31cblx0RUxTRSBJRiAgICBcXCR7MzpDb25kaXRpb24gMn1cblx0ICAgIFxcJHs0OkRvIHNvbWV0aGluZyBlbHNlfVxuXHRFTkRcbmA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=