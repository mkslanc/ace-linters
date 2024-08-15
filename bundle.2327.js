(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2327,3871],{

/***/ 72327:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(53871);
exports.scope = "velocity";
exports.includeScopes = ["html", "javascript", "css"];


/***/ }),

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjIzMjcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsZ0RBQW9EO0FBQ3BELGFBQWE7QUFDYixxQkFBcUI7Ozs7Ozs7O0FDSnJCO0FBQ0E7QUFDQSxhQUFhLGFBQWEsR0FBRyw2QkFBNkI7QUFDMUQsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGVBQWUsWUFBWSxNQUFNLGtCQUFrQjtBQUNuRCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFVLFFBQVE7QUFDbEIsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGVBQWUsMEJBQTBCO0FBQ3pDO0FBQ0E7QUFDQSxhQUFhLE9BQU8sS0FBSyxHQUFHO0FBQzVCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvdmVsb2NpdHkuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvdmVsb2NpdHkuc25pcHBldHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuc25pcHBldFRleHQgPSByZXF1aXJlKFwiLi92ZWxvY2l0eS5zbmlwcGV0c1wiKTtcbmV4cG9ydHMuc2NvcGUgPSBcInZlbG9jaXR5XCI7XG5leHBvcnRzLmluY2x1ZGVTY29wZXMgPSBbXCJodG1sXCIsIFwiamF2YXNjcmlwdFwiLCBcImNzc1wiXTtcbiIsIm1vZHVsZS5leHBvcnRzID0gYCMgbWFjcm9cbnNuaXBwZXQgI21hY3JvXG5cdCNtYWNybyAoIFxcJHsxOm1hY3JvTmFtZX0gXFwkezI6XFxcXFxcJHZhcjEsIFtcXFxcXFwkdmFyMiwgLi4uXX0gKVxuXHRcdFxcJHszOiMjIG1hY3JvIGNvZGV9XG5cdCNlbmRcbiMgZm9yZWFjaFxuc25pcHBldCAjZm9yZWFjaFxuXHQjZm9yZWFjaCAoIFxcJHsxOlxcXFxcXCRpdGVtfSBpbiBcXCR7MjpcXFxcXFwkY29sbGVjdGlvbn0gKVxuXHRcdFxcJHszOiMjIGZvcmVhY2ggY29kZX1cblx0I2VuZFxuIyBpZlxuc25pcHBldCAjaWZcblx0I2lmICggXFwkezE6dHJ1ZX0gKVxuXHRcdFxcJHswfVxuXHQjZW5kXG4jIGlmIC4uLiBlbHNlXG5zbmlwcGV0ICNpZmVcblx0I2lmICggXFwkezE6dHJ1ZX0gKVxuXHRcdFxcJHsyfVxuXHQjZWxzZVxuXHRcdFxcJHswfVxuXHQjZW5kXG4jaW1wb3J0XG5zbmlwcGV0ICNpbXBvcnRcblx0I2ltcG9ydCAoIFwiXFwkezE6cGF0aC90by92ZWxvY2l0eS9mb3JtYXR9XCIgKVxuIyBzZXRcbnNuaXBwZXQgI3NldFxuXHQjc2V0ICggXFwkXFwkezE6dmFyfSA9IFxcJHswfSApXG5gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9