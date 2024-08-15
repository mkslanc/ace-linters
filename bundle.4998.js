(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4998],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQ5OTguanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFdBQVcsbUJBQW1CO0FBQzlCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsT0FBTyxtQkFBbUI7QUFDMUIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSyxTQUFTLEtBQUs7QUFDbkIsV0FBVyxTQUFTLEtBQUssZUFBZTtBQUN4QyxLQUFLO0FBQ0wsTUFBTSxTQUFTO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsS0FBSyxTQUFTLEtBQUs7QUFDbkIsV0FBVyxTQUFTLEtBQUssZUFBZTtBQUN4QyxLQUFLO0FBQ0wsTUFBTSxTQUFTO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPLEtBQUssdUJBQXVCLEtBQUs7QUFDbkQsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVUsbUJBQW1CO0FBQzdCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFVLG1CQUFtQjtBQUM3QixLQUFLO0FBQ0w7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL2Nzb3VuZF9vcmNoZXN0cmEuc25pcHBldHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBgIyBlbHNlXG5zbmlwcGV0IGVsc2Vcblx0ZWxzZVxuXHRcdFxcJHsxOi8qIHN0YXRlbWVudHMgKi99XG4jIGVsc2VpZlxuc25pcHBldCBlbHNlaWZcblx0ZWxzZWlmIFxcJHsxOi8qIGNvbmRpdGlvbiAqL30gdGhlblxuXHRcdFxcJHsyOi8qIHN0YXRlbWVudHMgKi99XG4jIGlmXG5zbmlwcGV0IGlmXG5cdGlmIFxcJHsxOi8qIGNvbmRpdGlvbiAqL30gdGhlblxuXHRcdFxcJHsyOi8qIHN0YXRlbWVudHMgKi99XG5cdGVuZGlmXG4jIGluc3RydW1lbnQgYmxvY2tcbnNuaXBwZXQgaW5zdHJcblx0aW5zdHIgXFwkezE6bmFtZX1cblx0XHRcXCR7MjovKiBzdGF0ZW1lbnRzICovfVxuXHRlbmRpblxuIyBpLXRpbWUgd2hpbGUgbG9vcFxuc25pcHBldCBpd2hpbGVcblx0aVxcJHsxOkluZGV4fSA9IFxcJHsyOjB9XG5cdHdoaWxlIGlcXCR7MTpJbmRleH0gPCBcXCR7MzovKiBjb3VudCAqL30gZG9cblx0XHRcXCR7NDovKiBzdGF0ZW1lbnRzICovfVxuXHRcdGlcXCR7MTpJbmRleH0gKz0gMVxuXHRvZFxuIyBrLXJhdGUgd2hpbGUgbG9vcFxuc25pcHBldCBrd2hpbGVcblx0a1xcJHsxOkluZGV4fSA9IFxcJHsyOjB9XG5cdHdoaWxlIGtcXCR7MTpJbmRleH0gPCBcXCR7MzovKiBjb3VudCAqL30gZG9cblx0XHRcXCR7NDovKiBzdGF0ZW1lbnRzICovfVxuXHRcdGtcXCR7MTpJbmRleH0gKz0gMVxuXHRvZFxuIyBvcGNvZGVcbnNuaXBwZXQgb3Bjb2RlXG5cdG9wY29kZSBcXCR7MTpuYW1lfSwgXFwkezI6Lyogb3V0cHV0IHR5cGVzICovIDB9LCBcXCR7MzovKiBpbnB1dCB0eXBlcyAqLyAwfVxuXHRcdFxcJHs0Oi8qIHN0YXRlbWVudHMgKi99XG5cdGVuZG9wXG4jIHVudGlsIGxvb3BcbnNuaXBwZXQgdW50aWxcblx0dW50aWwgXFwkezE6LyogY29uZGl0aW9uICovfSBkb1xuXHRcdFxcJHsyOi8qIHN0YXRlbWVudHMgKi99XG5cdG9kXG4jIHdoaWxlIGxvb3BcbnNuaXBwZXQgd2hpbGVcblx0d2hpbGUgXFwkezE6LyogY29uZGl0aW9uICovfSBkb1xuXHRcdFxcJHsyOi8qIHN0YXRlbWVudHMgKi99XG5cdG9kXG5gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9