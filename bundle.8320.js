(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8320],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjgzMjAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7QUFFZjtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0oseUJBQXlCLEdBQUc7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osUUFBUTs7QUFFUjtBQUNBO0FBQ0E7QUFDQSxNQUFNLEdBQUcsaUJBQWlCLFFBQVE7O0FBRWxDO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKLHlCQUF5QixHQUFHOztBQUU1QjtBQUNBO0FBQ0E7QUFDQSxhQUFhLEdBQUcsYUFBYSxrQkFBa0IsR0FBRztBQUNsRCxrQkFBa0IsR0FBRztBQUNyQjs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxHQUFHLFlBQVksU0FBUyxHQUFHO0FBQ3hDLGtCQUFrQixHQUFHO0FBQ3JCOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsUUFBUTtBQUNSOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsUUFBUTtBQUNSO0FBQ0EsUUFBUTtBQUNSOztBQUVBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsUUFBUTtBQUNSLGVBQWU7QUFDZixRQUFRO0FBQ1I7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL3JvYm90LnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gYCMgc2NvcGU6IHJvYm90XG4jIyMgU2VjdGlvbnNcbnNuaXBwZXQgc2V0dGluZ3NzZWN0aW9uXG5kZXNjcmlwdGlvbiAqKiogU2V0dGluZ3MgKioqIHNlY3Rpb25cblx0KioqIFNldHRpbmdzICoqKlxuXHRMaWJyYXJ5ICAgIFxcJHsxfVxuXG5zbmlwcGV0IGtleXdvcmRzc2VjdGlvblxuZGVzY3JpcHRpb24gKioqIEtleXdvcmRzICoqKiBzZWN0aW9uXG5cdCoqKiBLZXl3b3JkcyAqKipcblx0XFwkezE6S2V5d29yZCBOYW1lfVxuXHQgICAgW0FyZ3VtZW50c10gICAgXFxcXFxcJHtcXCR7MjpFeGFtcGxlIEFyZyAxfX1cblx0XG5zbmlwcGV0IHRlc3RjYXNlc3NlY3Rpb25cbmRlc2NyaXB0aW9uICoqKiBUZXN0IENhc2VzICoqKiBzZWN0aW9uXG5cdCoqKiBUZXN0IENhc2VzICoqKlxuXHRcXCR7MTpGaXJzdCBUZXN0IENhc2V9XG5cdCAgICBcXCR7MjpMb2cgICAgRXhhbXBsZSBBcmd9XG5cbnNuaXBwZXQgdmFyaWFibGVzc2VjdGlvblxuZGVzY3JpcHRpb24gKioqIFZhcmlhYmxlcyAqKiogc2VjdGlvblxuXHQqKiogVmFyaWFibGVzICoqKlxuXHRcXFxcXFwke1xcJHsxOlZhcmlhYmxlIE5hbWV9fT0gICAgXFwkezI6VmFyaWFibGUgVmFsdWV9XG5cbiMjIyBIZWxwZnVsIGtleXdvcmRzXG5zbmlwcGV0IHRlc3RjYXNlXG5kZXNjcmlwdGlvbiBBIHRlc3QgY2FzZVxuXHRcXCR7MTpUZXN0IENhc2UgTmFtZX1cblx0ICAgIFxcJHsyOkxvZyAgICBFeGFtcGxlIGxvZyBtZXNzYWdlfVxuXHRcbnNuaXBwZXQga2V5d29yZFxuZGVzY3JpcHRpb24gQSBrZXl3b3JkXG5cdFxcJHsxOkV4YW1wbGUgS2V5d29yZH1cblx0ICAgIFtBcmd1bWVudHNdICAgIFxcXFxcXCR7XFwkezI6RXhhbXBsZSBBcmcgMX19XG5cbiMjIyBCdWlsdCBJbnNcbnNuaXBwZXQgZm9yaW5yXG5kZXNjcmlwdGlvbiBGb3IgSW4gUmFuZ2UgTG9vcFxuXHRGT1IgICAgXFxcXFxcJHtcXCR7MTpJbmRleH19ICAgIElOIFJBTkdFICAgICBcXFxcXFwke1xcJHsyOjEwfX1cblx0ICAgIExvZyAgICAgXFxcXFxcJHtcXCR7MTpJbmRleH19XG5cdEVORFxuXG5zbmlwcGV0IGZvcmluXG5kZXNjcmlwdGlvbiBGb3IgSW4gTG9vcFxuXHRGT1IgICAgXFxcXFxcJHtcXCR7MTpJdGVtfX0gICAgSU4gICAgIEB7XFwkezI6TGlzdCBWYXJpYWJsZX19XG5cdCAgICBMb2cgICAgIFxcXFxcXCR7XFwkezE6SXRlbX19XG5cdEVORFxuXG5zbmlwcGV0IGlmXG5kZXNjcmlwdGlvbiBJZiBTdGF0ZW1lbnRcblx0SUYgICAgXFwkezE6Y29uZGl0aW9ufVxuXHQgICAgXFwkezI6RG8gc29tZXRoaW5nfVxuXHRFTkRcblxuc25pcHBldCBlbHNlXG5kZXNjcmlwdGlvbiBJZiBTdGF0ZW1lbnRcblx0SUYgICAgXFwkezE6Q29uZGl0aW9ufVxuXHQgICAgXFwkezI6RG8gc29tZXRoaW5nfVxuXHRFTFNFXG5cdCAgICBcXCR7MzpPdGhlcndpc2UgZG8gdGhpc31cblx0RU5EXG5cbnNuaXBwZXQgZWxpZlxuZGVzY3JpcHRpb24gRWxzZS1JZiBTdGF0ZW1lbnRcblx0SUYgICAgXFwkezE6Q29uZGl0aW9uIDF9XG5cdCAgICBcXCR7MjpEbyBzb21ldGhpbmd9XG5cdEVMU0UgSUYgICAgXFwkezM6Q29uZGl0aW9uIDJ9XG5cdCAgICBcXCR7NDpEbyBzb21ldGhpbmcgZWxzZX1cblx0RU5EXG5gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9