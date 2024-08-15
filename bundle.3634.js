(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3634],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjM2MzQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxVQUFVLGdDQUFnQyxHQUFHO0FBQzdDO0FBQ0EsV0FBVyxnQ0FBZ0MsR0FBRyxrQkFBa0IsR0FBRztBQUNuRTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsRUFBRSxLQUFLOztBQUVmO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUyxJQUFJLEVBQUUsS0FBSzs7QUFFL0I7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFdBQVcsS0FBSyxTQUFTOztBQUUzQztBQUNBO0FBQ0E7QUFDQSxVQUFVLEtBQUssTUFBTSxhQUFhLEtBQUs7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRyxTQUFTLEtBQUssS0FBSztBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIsVUFBVTs7QUFFL0I7QUFDQTtBQUNBO0FBQ0EsY0FBYyxHQUFHLElBQUksR0FBRztBQUN4QjtBQUNBO0FBQ0E7QUFDQSxjQUFjLEdBQUc7QUFDakIsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvd29sbG9rLnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gYCMjXG4jIyBCYXNpYyBKYXZhIHBhY2thZ2VzIGFuZCBpbXBvcnRcbnNuaXBwZXQgaW1cblx0aW1wb3J0XG5zbmlwcGV0IHcubFxuXHR3b2xsb2subGFuZ1xuc25pcHBldCB3Lmlcblx0d29sbG9rLmxpYlxuXG4jIyBDbGFzcyBhbmQgb2JqZWN0XG5zbmlwcGV0IGNsXG5cdGNsYXNzIFxcJHsxOlxcYEZpbGVuYW1lKFwiXCIsIFwidW50aXRsZWRcIilcXGB9IFxcJHsyfVxuc25pcHBldCBvYmpcblx0b2JqZWN0IFxcJHsxOlxcYEZpbGVuYW1lKFwiXCIsIFwidW50aXRsZWRcIilcXGB9IFxcJHsyOmluaGVyaXRzIFBhcmVudH1cXCR7M31cbnNuaXBwZXQgdGVcblx0dGVzdCBcXCR7MTpcXGBGaWxlbmFtZShcIlwiLCBcInVudGl0bGVkXCIpXFxgfVxuXG4jI1xuIyMgRW5oYW5jZW1lbnRzXG5zbmlwcGV0IGluaFxuXHRpbmhlcml0c1xuXG4jI1xuIyMgQ29tbWVudHNcbnNuaXBwZXQgLypcblx0Lypcblx0ICogXFwkezF9XG5cdCAqL1xuXG4jI1xuIyMgQ29udHJvbCBTdGF0ZW1lbnRzXG5zbmlwcGV0IGVsXG5cdGVsc2VcbnNuaXBwZXQgaWZcblx0aWYgKFxcJHsxfSkgXFwkezJ9XG5cbiMjXG4jIyBDcmVhdGUgYSBNZXRob2RcbnNuaXBwZXQgbVxuXHRtZXRob2QgXFwkezE6bWV0aG9kfShcXCR7Mn0pIFxcJHs1fVxuXG4jIyAgXG4jIyBUZXN0c1xuc25pcHBldCBhc1xuXHRhc3NlcnQuZXF1YWxzKFxcJHsxOmV4cGVjdGVkfSwgXFwkezI6YWN0dWFsfSlcblxuIyNcbiMjIEV4Y2VwdGlvbnNcbnNuaXBwZXQgY2Fcblx0Y2F0Y2ggXFwkezE6ZX0gOiAoXFwkezI6RXhjZXB0aW9ufSApIFxcJHszfVxuc25pcHBldCB0aHJcblx0dGhyb3dcbnNuaXBwZXQgdHJ5XG5cdHRyeSB7XG5cdFx0XFwkezN9XG5cdH0gY2F0Y2ggXFwkezE6ZX0gOiBcXCR7MjpFeGNlcHRpb259IHtcblx0fVxuXG4jI1xuIyMgSmF2YWRvY3NcbnNuaXBwZXQgLyoqXG5cdC8qKlxuXHQgKiBcXCR7MX1cblx0ICovXG5cbiMjXG4jIyBQcmludCBNZXRob2RzXG5zbmlwcGV0IHByaW50XG5cdGNvbnNvbGUucHJpbnRsbihcIlxcJHsxOk1lc3NhZ2V9XCIpXG5cbiMjXG4jIyBTZXR0ZXIgYW5kIEdldHRlciBNZXRob2RzXG5zbmlwcGV0IHNldFxuXHRtZXRob2Qgc2V0XFwkezE6fShcXCR7Mjp9KSB7XG5cdFx0XFwkMSA9IFxcJDJcblx0fVxuc25pcHBldCBnZXRcblx0bWV0aG9kIGdldFxcJHsxOn0oKSB7XG5cdFx0cmV0dXJuIFxcJHsxOn07XG5cdH1cblxuIyNcbiMjIFRlcm1pbmF0ZSBNZXRob2RzIG9yIExvb3BzXG5zbmlwcGV0IHJlXG5cdHJldHVybmA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=