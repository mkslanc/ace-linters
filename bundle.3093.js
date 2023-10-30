(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3093,6528],{

/***/ 33093:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(16528);
exports.scope = "robot";


/***/ }),

/***/ 16528:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjMwOTMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsZ0RBQWlEO0FBQ2pELGFBQWE7Ozs7Ozs7O0FDSGI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7O0FBRWY7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLHlCQUF5QixHQUFHO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLFFBQVE7O0FBRVI7QUFDQTtBQUNBO0FBQ0EsTUFBTSxHQUFHLGlCQUFpQixRQUFROztBQUVsQztBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSix5QkFBeUIsR0FBRzs7QUFFNUI7QUFDQTtBQUNBO0FBQ0EsYUFBYSxHQUFHLGFBQWEsa0JBQWtCLEdBQUc7QUFDbEQsa0JBQWtCLEdBQUc7QUFDckI7O0FBRUE7QUFDQTtBQUNBLGFBQWEsR0FBRyxZQUFZLFNBQVMsR0FBRztBQUN4QyxrQkFBa0IsR0FBRztBQUNyQjs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLFFBQVE7QUFDUjs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLFFBQVE7QUFDUjtBQUNBLFFBQVE7QUFDUjs7QUFFQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLFFBQVE7QUFDUixlQUFlO0FBQ2YsUUFBUTtBQUNSO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy9yb2JvdC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy9yb2JvdC5zbmlwcGV0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5zbmlwcGV0VGV4dCA9IHJlcXVpcmUoXCIuL3JvYm90LnNuaXBwZXRzXCIpO1xuZXhwb3J0cy5zY29wZSA9IFwicm9ib3RcIjtcbiIsIm1vZHVsZS5leHBvcnRzID0gYCMgc2NvcGU6IHJvYm90XG4jIyMgU2VjdGlvbnNcbnNuaXBwZXQgc2V0dGluZ3NzZWN0aW9uXG5kZXNjcmlwdGlvbiAqKiogU2V0dGluZ3MgKioqIHNlY3Rpb25cblx0KioqIFNldHRpbmdzICoqKlxuXHRMaWJyYXJ5ICAgIFxcJHsxfVxuXG5zbmlwcGV0IGtleXdvcmRzc2VjdGlvblxuZGVzY3JpcHRpb24gKioqIEtleXdvcmRzICoqKiBzZWN0aW9uXG5cdCoqKiBLZXl3b3JkcyAqKipcblx0XFwkezE6S2V5d29yZCBOYW1lfVxuXHQgICAgW0FyZ3VtZW50c10gICAgXFxcXFxcJHtcXCR7MjpFeGFtcGxlIEFyZyAxfX1cblx0XG5zbmlwcGV0IHRlc3RjYXNlc3NlY3Rpb25cbmRlc2NyaXB0aW9uICoqKiBUZXN0IENhc2VzICoqKiBzZWN0aW9uXG5cdCoqKiBUZXN0IENhc2VzICoqKlxuXHRcXCR7MTpGaXJzdCBUZXN0IENhc2V9XG5cdCAgICBcXCR7MjpMb2cgICAgRXhhbXBsZSBBcmd9XG5cbnNuaXBwZXQgdmFyaWFibGVzc2VjdGlvblxuZGVzY3JpcHRpb24gKioqIFZhcmlhYmxlcyAqKiogc2VjdGlvblxuXHQqKiogVmFyaWFibGVzICoqKlxuXHRcXFxcXFwke1xcJHsxOlZhcmlhYmxlIE5hbWV9fT0gICAgXFwkezI6VmFyaWFibGUgVmFsdWV9XG5cbiMjIyBIZWxwZnVsIGtleXdvcmRzXG5zbmlwcGV0IHRlc3RjYXNlXG5kZXNjcmlwdGlvbiBBIHRlc3QgY2FzZVxuXHRcXCR7MTpUZXN0IENhc2UgTmFtZX1cblx0ICAgIFxcJHsyOkxvZyAgICBFeGFtcGxlIGxvZyBtZXNzYWdlfVxuXHRcbnNuaXBwZXQga2V5d29yZFxuZGVzY3JpcHRpb24gQSBrZXl3b3JkXG5cdFxcJHsxOkV4YW1wbGUgS2V5d29yZH1cblx0ICAgIFtBcmd1bWVudHNdICAgIFxcXFxcXCR7XFwkezI6RXhhbXBsZSBBcmcgMX19XG5cbiMjIyBCdWlsdCBJbnNcbnNuaXBwZXQgZm9yaW5yXG5kZXNjcmlwdGlvbiBGb3IgSW4gUmFuZ2UgTG9vcFxuXHRGT1IgICAgXFxcXFxcJHtcXCR7MTpJbmRleH19ICAgIElOIFJBTkdFICAgICBcXFxcXFwke1xcJHsyOjEwfX1cblx0ICAgIExvZyAgICAgXFxcXFxcJHtcXCR7MTpJbmRleH19XG5cdEVORFxuXG5zbmlwcGV0IGZvcmluXG5kZXNjcmlwdGlvbiBGb3IgSW4gTG9vcFxuXHRGT1IgICAgXFxcXFxcJHtcXCR7MTpJdGVtfX0gICAgSU4gICAgIEB7XFwkezI6TGlzdCBWYXJpYWJsZX19XG5cdCAgICBMb2cgICAgIFxcXFxcXCR7XFwkezE6SXRlbX19XG5cdEVORFxuXG5zbmlwcGV0IGlmXG5kZXNjcmlwdGlvbiBJZiBTdGF0ZW1lbnRcblx0SUYgICAgXFwkezE6Y29uZGl0aW9ufVxuXHQgICAgXFwkezI6RG8gc29tZXRoaW5nfVxuXHRFTkRcblxuc25pcHBldCBlbHNlXG5kZXNjcmlwdGlvbiBJZiBTdGF0ZW1lbnRcblx0SUYgICAgXFwkezE6Q29uZGl0aW9ufVxuXHQgICAgXFwkezI6RG8gc29tZXRoaW5nfVxuXHRFTFNFXG5cdCAgICBcXCR7MzpPdGhlcndpc2UgZG8gdGhpc31cblx0RU5EXG5cbnNuaXBwZXQgZWxpZlxuZGVzY3JpcHRpb24gRWxzZS1JZiBTdGF0ZW1lbnRcblx0SUYgICAgXFwkezE6Q29uZGl0aW9uIDF9XG5cdCAgICBcXCR7MjpEbyBzb21ldGhpbmd9XG5cdEVMU0UgSUYgICAgXFwkezM6Q29uZGl0aW9uIDJ9XG5cdCAgICBcXCR7NDpEbyBzb21ldGhpbmcgZWxzZX1cblx0RU5EXG5gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9