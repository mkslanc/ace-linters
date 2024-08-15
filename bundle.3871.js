(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3871],{

/***/ 53871:
/***/ ((module) => {

module.exports = `# macro
snippet #macro
	#macro ( \${1:macroName} \${2:\\\$var1, [\\\$var2, ...]} )
		\${3:## macro code}
	#end
# foreach
snippet #foreach
	#foreach ( \${1:\\\$item} in \${2:\\\$collection} )
		\${3:## foreach code}
	#end
# if
snippet #if
	#if ( \${1:true} )
		\${0}
	#end
# if ... else
snippet #ife
	#if ( \${1:true} )
		\${2}
	#else
		\${0}
	#end
#import
snippet #import
	#import ( "\${1:path/to/velocity/format}" )
# set
snippet #set
	#set ( \$\${1:var} = \${0} )
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjM4NzEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0EsYUFBYSxhQUFhLEdBQUcsNkJBQTZCO0FBQzFELEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxlQUFlLFlBQVksTUFBTSxrQkFBa0I7QUFDbkQsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVUsUUFBUTtBQUNsQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxlQUFlLDBCQUEwQjtBQUN6QztBQUNBO0FBQ0EsYUFBYSxPQUFPLEtBQUssR0FBRztBQUM1QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL3ZlbG9jaXR5LnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gYCMgbWFjcm9cbnNuaXBwZXQgI21hY3JvXG5cdCNtYWNybyAoIFxcJHsxOm1hY3JvTmFtZX0gXFwkezI6XFxcXFxcJHZhcjEsIFtcXFxcXFwkdmFyMiwgLi4uXX0gKVxuXHRcdFxcJHszOiMjIG1hY3JvIGNvZGV9XG5cdCNlbmRcbiMgZm9yZWFjaFxuc25pcHBldCAjZm9yZWFjaFxuXHQjZm9yZWFjaCAoIFxcJHsxOlxcXFxcXCRpdGVtfSBpbiBcXCR7MjpcXFxcXFwkY29sbGVjdGlvbn0gKVxuXHRcdFxcJHszOiMjIGZvcmVhY2ggY29kZX1cblx0I2VuZFxuIyBpZlxuc25pcHBldCAjaWZcblx0I2lmICggXFwkezE6dHJ1ZX0gKVxuXHRcdFxcJHswfVxuXHQjZW5kXG4jIGlmIC4uLiBlbHNlXG5zbmlwcGV0ICNpZmVcblx0I2lmICggXFwkezE6dHJ1ZX0gKVxuXHRcdFxcJHsyfVxuXHQjZWxzZVxuXHRcdFxcJHswfVxuXHQjZW5kXG4jaW1wb3J0XG5zbmlwcGV0ICNpbXBvcnRcblx0I2ltcG9ydCAoIFwiXFwkezE6cGF0aC90by92ZWxvY2l0eS9mb3JtYXR9XCIgKVxuIyBzZXRcbnNuaXBwZXQgI3NldFxuXHQjc2V0ICggXFwkXFwkezE6dmFyfSA9IFxcJHswfSApXG5gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9