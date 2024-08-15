(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1020,3634],{

/***/ 81020:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(73634);
exports.scope = "wollok";


/***/ }),

/***/ 73634:
/***/ ((module) => {

module.exports = `##
## Basic Java packages and import
snippet im
	import
snippet w.l
	wollok.lang
snippet w.i
	wollok.lib

## Class and object
snippet cl
	class \${1:\`Filename("", "untitled")\`} \${2}
snippet obj
	object \${1:\`Filename("", "untitled")\`} \${2:inherits Parent}\${3}
snippet te
	test \${1:\`Filename("", "untitled")\`}

##
## Enhancements
snippet inh
	inherits

##
## Comments
snippet /*
	/*
	 * \${1}
	 */

##
## Control Statements
snippet el
	else
snippet if
	if (\${1}) \${2}

##
## Create a Method
snippet m
	method \${1:method}(\${2}) \${5}

##  
## Tests
snippet as
	assert.equals(\${1:expected}, \${2:actual})

##
## Exceptions
snippet ca
	catch \${1:e} : (\${2:Exception} ) \${3}
snippet thr
	throw
snippet try
	try {
		\${3}
	} catch \${1:e} : \${2:Exception} {
	}

##
## Javadocs
snippet /**
	/**
	 * \${1}
	 */

##
## Print Methods
snippet print
	console.println("\${1:Message}")

##
## Setter and Getter Methods
snippet set
	method set\${1:}(\${2:}) {
		\$1 = \$2
	}
snippet get
	method get\${1:}() {
		return \${1:};
	}

##
## Terminate Methods or Loops
snippet re
	return`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjEwMjAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsZ0RBQWtEO0FBQ2xELGFBQWE7Ozs7Ozs7O0FDSGI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSxnQ0FBZ0MsR0FBRztBQUM3QztBQUNBLFdBQVcsZ0NBQWdDLEdBQUcsa0JBQWtCLEdBQUc7QUFDbkU7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLEVBQUUsS0FBSzs7QUFFZjtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVMsSUFBSSxFQUFFLEtBQUs7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixXQUFXLEtBQUssU0FBUzs7QUFFM0M7QUFDQTtBQUNBO0FBQ0EsVUFBVSxLQUFLLE1BQU0sYUFBYSxLQUFLO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUcsU0FBUyxLQUFLLEtBQUs7QUFDdEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFVBQVU7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBLGNBQWMsR0FBRyxJQUFJLEdBQUc7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsY0FBYyxHQUFHO0FBQ2pCLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL3dvbGxvay5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy93b2xsb2suc25pcHBldHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuc25pcHBldFRleHQgPSByZXF1aXJlKFwiLi93b2xsb2suc25pcHBldHNcIik7XG5leHBvcnRzLnNjb3BlID0gXCJ3b2xsb2tcIjtcbiIsIm1vZHVsZS5leHBvcnRzID0gYCMjXG4jIyBCYXNpYyBKYXZhIHBhY2thZ2VzIGFuZCBpbXBvcnRcbnNuaXBwZXQgaW1cblx0aW1wb3J0XG5zbmlwcGV0IHcubFxuXHR3b2xsb2subGFuZ1xuc25pcHBldCB3Lmlcblx0d29sbG9rLmxpYlxuXG4jIyBDbGFzcyBhbmQgb2JqZWN0XG5zbmlwcGV0IGNsXG5cdGNsYXNzIFxcJHsxOlxcYEZpbGVuYW1lKFwiXCIsIFwidW50aXRsZWRcIilcXGB9IFxcJHsyfVxuc25pcHBldCBvYmpcblx0b2JqZWN0IFxcJHsxOlxcYEZpbGVuYW1lKFwiXCIsIFwidW50aXRsZWRcIilcXGB9IFxcJHsyOmluaGVyaXRzIFBhcmVudH1cXCR7M31cbnNuaXBwZXQgdGVcblx0dGVzdCBcXCR7MTpcXGBGaWxlbmFtZShcIlwiLCBcInVudGl0bGVkXCIpXFxgfVxuXG4jI1xuIyMgRW5oYW5jZW1lbnRzXG5zbmlwcGV0IGluaFxuXHRpbmhlcml0c1xuXG4jI1xuIyMgQ29tbWVudHNcbnNuaXBwZXQgLypcblx0Lypcblx0ICogXFwkezF9XG5cdCAqL1xuXG4jI1xuIyMgQ29udHJvbCBTdGF0ZW1lbnRzXG5zbmlwcGV0IGVsXG5cdGVsc2VcbnNuaXBwZXQgaWZcblx0aWYgKFxcJHsxfSkgXFwkezJ9XG5cbiMjXG4jIyBDcmVhdGUgYSBNZXRob2RcbnNuaXBwZXQgbVxuXHRtZXRob2QgXFwkezE6bWV0aG9kfShcXCR7Mn0pIFxcJHs1fVxuXG4jIyAgXG4jIyBUZXN0c1xuc25pcHBldCBhc1xuXHRhc3NlcnQuZXF1YWxzKFxcJHsxOmV4cGVjdGVkfSwgXFwkezI6YWN0dWFsfSlcblxuIyNcbiMjIEV4Y2VwdGlvbnNcbnNuaXBwZXQgY2Fcblx0Y2F0Y2ggXFwkezE6ZX0gOiAoXFwkezI6RXhjZXB0aW9ufSApIFxcJHszfVxuc25pcHBldCB0aHJcblx0dGhyb3dcbnNuaXBwZXQgdHJ5XG5cdHRyeSB7XG5cdFx0XFwkezN9XG5cdH0gY2F0Y2ggXFwkezE6ZX0gOiBcXCR7MjpFeGNlcHRpb259IHtcblx0fVxuXG4jI1xuIyMgSmF2YWRvY3NcbnNuaXBwZXQgLyoqXG5cdC8qKlxuXHQgKiBcXCR7MX1cblx0ICovXG5cbiMjXG4jIyBQcmludCBNZXRob2RzXG5zbmlwcGV0IHByaW50XG5cdGNvbnNvbGUucHJpbnRsbihcIlxcJHsxOk1lc3NhZ2V9XCIpXG5cbiMjXG4jIyBTZXR0ZXIgYW5kIEdldHRlciBNZXRob2RzXG5zbmlwcGV0IHNldFxuXHRtZXRob2Qgc2V0XFwkezE6fShcXCR7Mjp9KSB7XG5cdFx0XFwkMSA9IFxcJDJcblx0fVxuc25pcHBldCBnZXRcblx0bWV0aG9kIGdldFxcJHsxOn0oKSB7XG5cdFx0cmV0dXJuIFxcJHsxOn07XG5cdH1cblxuIyNcbiMjIFRlcm1pbmF0ZSBNZXRob2RzIG9yIExvb3BzXG5zbmlwcGV0IHJlXG5cdHJldHVybmA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=