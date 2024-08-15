(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2120,4998],{

/***/ 62120:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(14998);
exports.scope = "csound_orchestra";


/***/ }),

/***/ 14998:
/***/ ((module) => {

module.exports = `# else
snippet else
	else
		\${1:/* statements */}
# elseif
snippet elseif
	elseif \${1:/* condition */} then
		\${2:/* statements */}
# if
snippet if
	if \${1:/* condition */} then
		\${2:/* statements */}
	endif
# instrument block
snippet instr
	instr \${1:name}
		\${2:/* statements */}
	endin
# i-time while loop
snippet iwhile
	i\${1:Index} = \${2:0}
	while i\${1:Index} < \${3:/* count */} do
		\${4:/* statements */}
		i\${1:Index} += 1
	od
# k-rate while loop
snippet kwhile
	k\${1:Index} = \${2:0}
	while k\${1:Index} < \${3:/* count */} do
		\${4:/* statements */}
		k\${1:Index} += 1
	od
# opcode
snippet opcode
	opcode \${1:name}, \${2:/* output types */ 0}, \${3:/* input types */ 0}
		\${4:/* statements */}
	endop
# until loop
snippet until
	until \${1:/* condition */} do
		\${2:/* statements */}
	od
# while loop
snippet while
	while \${1:/* condition */} do
		\${2:/* statements */}
	od
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjIxMjAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsZ0RBQTREO0FBQzVELGFBQWE7Ozs7Ozs7O0FDSGI7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxXQUFXLG1CQUFtQjtBQUM5QixLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU8sbUJBQW1CO0FBQzFCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUssU0FBUyxLQUFLO0FBQ25CLFdBQVcsU0FBUyxLQUFLLGVBQWU7QUFDeEMsS0FBSztBQUNMLE1BQU0sU0FBUztBQUNmO0FBQ0E7QUFDQTtBQUNBLEtBQUssU0FBUyxLQUFLO0FBQ25CLFdBQVcsU0FBUyxLQUFLLGVBQWU7QUFDeEMsS0FBSztBQUNMLE1BQU0sU0FBUztBQUNmO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTyxLQUFLLHVCQUF1QixLQUFLO0FBQ25ELEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFVLG1CQUFtQjtBQUM3QixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsVUFBVSxtQkFBbUI7QUFDN0IsS0FBSztBQUNMO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy9jc291bmRfb3JjaGVzdHJhLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL2Nzb3VuZF9vcmNoZXN0cmEuc25pcHBldHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuc25pcHBldFRleHQgPSByZXF1aXJlKFwiLi9jc291bmRfb3JjaGVzdHJhLnNuaXBwZXRzXCIpO1xuZXhwb3J0cy5zY29wZSA9IFwiY3NvdW5kX29yY2hlc3RyYVwiO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBgIyBlbHNlXG5zbmlwcGV0IGVsc2Vcblx0ZWxzZVxuXHRcdFxcJHsxOi8qIHN0YXRlbWVudHMgKi99XG4jIGVsc2VpZlxuc25pcHBldCBlbHNlaWZcblx0ZWxzZWlmIFxcJHsxOi8qIGNvbmRpdGlvbiAqL30gdGhlblxuXHRcdFxcJHsyOi8qIHN0YXRlbWVudHMgKi99XG4jIGlmXG5zbmlwcGV0IGlmXG5cdGlmIFxcJHsxOi8qIGNvbmRpdGlvbiAqL30gdGhlblxuXHRcdFxcJHsyOi8qIHN0YXRlbWVudHMgKi99XG5cdGVuZGlmXG4jIGluc3RydW1lbnQgYmxvY2tcbnNuaXBwZXQgaW5zdHJcblx0aW5zdHIgXFwkezE6bmFtZX1cblx0XHRcXCR7MjovKiBzdGF0ZW1lbnRzICovfVxuXHRlbmRpblxuIyBpLXRpbWUgd2hpbGUgbG9vcFxuc25pcHBldCBpd2hpbGVcblx0aVxcJHsxOkluZGV4fSA9IFxcJHsyOjB9XG5cdHdoaWxlIGlcXCR7MTpJbmRleH0gPCBcXCR7MzovKiBjb3VudCAqL30gZG9cblx0XHRcXCR7NDovKiBzdGF0ZW1lbnRzICovfVxuXHRcdGlcXCR7MTpJbmRleH0gKz0gMVxuXHRvZFxuIyBrLXJhdGUgd2hpbGUgbG9vcFxuc25pcHBldCBrd2hpbGVcblx0a1xcJHsxOkluZGV4fSA9IFxcJHsyOjB9XG5cdHdoaWxlIGtcXCR7MTpJbmRleH0gPCBcXCR7MzovKiBjb3VudCAqL30gZG9cblx0XHRcXCR7NDovKiBzdGF0ZW1lbnRzICovfVxuXHRcdGtcXCR7MTpJbmRleH0gKz0gMVxuXHRvZFxuIyBvcGNvZGVcbnNuaXBwZXQgb3Bjb2RlXG5cdG9wY29kZSBcXCR7MTpuYW1lfSwgXFwkezI6Lyogb3V0cHV0IHR5cGVzICovIDB9LCBcXCR7MzovKiBpbnB1dCB0eXBlcyAqLyAwfVxuXHRcdFxcJHs0Oi8qIHN0YXRlbWVudHMgKi99XG5cdGVuZG9wXG4jIHVudGlsIGxvb3BcbnNuaXBwZXQgdW50aWxcblx0dW50aWwgXFwkezE6LyogY29uZGl0aW9uICovfSBkb1xuXHRcdFxcJHsyOi8qIHN0YXRlbWVudHMgKi99XG5cdG9kXG4jIHdoaWxlIGxvb3BcbnNuaXBwZXQgd2hpbGVcblx0d2hpbGUgXFwkezE6LyogY29uZGl0aW9uICovfSBkb1xuXHRcdFxcJHsyOi8qIHN0YXRlbWVudHMgKi99XG5cdG9kXG5gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9