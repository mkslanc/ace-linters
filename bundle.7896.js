(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7896,9590],{

/***/ 37896:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(69590);
exports.scope = "coffee";


/***/ }),

/***/ 69590:
/***/ ((module) => {

module.exports = `# Closure loop
snippet forindo
	for \${1:name} in \${2:array}
		do (\$1) ->
			\${3:// body}
# Array comprehension
snippet fora
	for \${1:name} in \${2:array}
		\${3:// body...}
# Object comprehension
snippet foro
	for \${1:key}, \${2:value} of \${3:object}
		\${4:// body...}
# Range comprehension (inclusive)
snippet forr
	for \${1:name} in [\${2:start}..\${3:finish}]
		\${4:// body...}
snippet forrb
	for \${1:name} in [\${2:start}..\${3:finish}] by \${4:step}
		\${5:// body...}
# Range comprehension (exclusive)
snippet forrex
	for \${1:name} in [\${2:start}...\${3:finish}]
		\${4:// body...}
snippet forrexb
	for \${1:name} in [\${2:start}...\${3:finish}] by \${4:step}
		\${5:// body...}
# Function
snippet fun
	(\${1:args}) ->
		\${2:// body...}
# Function (bound)
snippet bfun
	(\${1:args}) =>
		\${2:// body...}
# Class
snippet cla class ..
	class \${1:\`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')\`}
		\${2}
snippet cla class .. constructor: ..
	class \${1:\`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')\`}
		constructor: (\${2:args}) ->
			\${3}

		\${4}
snippet cla class .. extends ..
	class \${1:\`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')\`} extends \${2:ParentClass}
		\${3}
snippet cla class .. extends .. constructor: ..
	class \${1:\`substitute(Filename(), '\\(_\\|^\\)\\(.\\)', '\\u\\2', 'g')\`} extends \${2:ParentClass}
		constructor: (\${3:args}) ->
			\${4}

		\${5}
# If
snippet if
	if \${1:condition}
		\${2:// body...}
# If __ Else
snippet ife
	if \${1:condition}
		\${2:// body...}
	else
		\${3:// body...}
# Else if
snippet elif
	else if \${1:condition}
		\${2:// body...}
# Ternary If
snippet ifte
	if \${1:condition} then \${2:value} else \${3:other}
# Unless
snippet unl
	\${1:action} unless \${2:condition}
# Switch
snippet swi
	switch \${1:object}
		when \${2:value}
			\${3:// body...}

# Log
snippet log
	console.log \${1}
# Try __ Catch
snippet try
	try
		\${1}
	catch \${2:error}
		\${3}
# Require
snippet req
	\${2:\$1} = require '\${1:sys}'\${3}
# Export
snippet exp
	\${1:root} = exports ? this
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjc4OTYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsZ0RBQWtEO0FBQ2xELGFBQWE7Ozs7Ozs7O0FDSGI7QUFDQTtBQUNBLFFBQVEsUUFBUSxNQUFNO0FBQ3RCO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxRQUFRLFFBQVEsTUFBTTtBQUN0QixLQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQVEsTUFBTSxLQUFLLFNBQVMsTUFBTTtBQUNsQyxLQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQVEsUUFBUSxPQUFPLFFBQVEsS0FBSyxTQUFTO0FBQzdDLEtBQUs7QUFDTDtBQUNBLFFBQVEsUUFBUSxPQUFPLFFBQVEsS0FBSyxTQUFTLFFBQVE7QUFDckQsS0FBSztBQUNMO0FBQ0E7QUFDQSxRQUFRLFFBQVEsT0FBTyxRQUFRLE1BQU0sU0FBUztBQUM5QyxLQUFLO0FBQ0w7QUFDQSxRQUFRLFFBQVEsT0FBTyxRQUFRLE1BQU0sU0FBUyxRQUFRO0FBQ3RELEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSyxPQUFPO0FBQ1osS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLLE9BQU87QUFDWixLQUFLO0FBQ0w7QUFDQTtBQUNBLFVBQVU7QUFDVixLQUFLO0FBQ0w7QUFDQSxVQUFVO0FBQ1YsbUJBQW1CLE9BQU87QUFDMUIsTUFBTTs7QUFFTixLQUFLO0FBQ0w7QUFDQSxVQUFVLG1FQUFtRSxXQUFXO0FBQ3hGLEtBQUs7QUFDTDtBQUNBLFVBQVUsbUVBQW1FLFdBQVc7QUFDeEYsbUJBQW1CLE9BQU87QUFDMUIsTUFBTTs7QUFFTixLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixLQUFLO0FBQ0w7QUFDQTtBQUNBLE9BQU8sYUFBYSxRQUFRLFNBQVMsUUFBUTtBQUM3QztBQUNBO0FBQ0EsSUFBSSxVQUFVLFVBQVU7QUFDeEI7QUFDQTtBQUNBLFdBQVc7QUFDWCxVQUFVO0FBQ1YsTUFBTTs7QUFFTjtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxVQUFVO0FBQ1YsS0FBSztBQUNMO0FBQ0E7QUFDQSxJQUFJLE9BQU8sY0FBYyxNQUFNLElBQUk7QUFDbkM7QUFDQTtBQUNBLElBQUksUUFBUTtBQUNaIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvY29mZmVlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL2NvZmZlZS5zbmlwcGV0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5zbmlwcGV0VGV4dCA9IHJlcXVpcmUoXCIuL2NvZmZlZS5zbmlwcGV0c1wiKTtcbmV4cG9ydHMuc2NvcGUgPSBcImNvZmZlZVwiO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBgIyBDbG9zdXJlIGxvb3BcbnNuaXBwZXQgZm9yaW5kb1xuXHRmb3IgXFwkezE6bmFtZX0gaW4gXFwkezI6YXJyYXl9XG5cdFx0ZG8gKFxcJDEpIC0+XG5cdFx0XHRcXCR7MzovLyBib2R5fVxuIyBBcnJheSBjb21wcmVoZW5zaW9uXG5zbmlwcGV0IGZvcmFcblx0Zm9yIFxcJHsxOm5hbWV9IGluIFxcJHsyOmFycmF5fVxuXHRcdFxcJHszOi8vIGJvZHkuLi59XG4jIE9iamVjdCBjb21wcmVoZW5zaW9uXG5zbmlwcGV0IGZvcm9cblx0Zm9yIFxcJHsxOmtleX0sIFxcJHsyOnZhbHVlfSBvZiBcXCR7MzpvYmplY3R9XG5cdFx0XFwkezQ6Ly8gYm9keS4uLn1cbiMgUmFuZ2UgY29tcHJlaGVuc2lvbiAoaW5jbHVzaXZlKVxuc25pcHBldCBmb3JyXG5cdGZvciBcXCR7MTpuYW1lfSBpbiBbXFwkezI6c3RhcnR9Li5cXCR7MzpmaW5pc2h9XVxuXHRcdFxcJHs0Oi8vIGJvZHkuLi59XG5zbmlwcGV0IGZvcnJiXG5cdGZvciBcXCR7MTpuYW1lfSBpbiBbXFwkezI6c3RhcnR9Li5cXCR7MzpmaW5pc2h9XSBieSBcXCR7NDpzdGVwfVxuXHRcdFxcJHs1Oi8vIGJvZHkuLi59XG4jIFJhbmdlIGNvbXByZWhlbnNpb24gKGV4Y2x1c2l2ZSlcbnNuaXBwZXQgZm9ycmV4XG5cdGZvciBcXCR7MTpuYW1lfSBpbiBbXFwkezI6c3RhcnR9Li4uXFwkezM6ZmluaXNofV1cblx0XHRcXCR7NDovLyBib2R5Li4ufVxuc25pcHBldCBmb3JyZXhiXG5cdGZvciBcXCR7MTpuYW1lfSBpbiBbXFwkezI6c3RhcnR9Li4uXFwkezM6ZmluaXNofV0gYnkgXFwkezQ6c3RlcH1cblx0XHRcXCR7NTovLyBib2R5Li4ufVxuIyBGdW5jdGlvblxuc25pcHBldCBmdW5cblx0KFxcJHsxOmFyZ3N9KSAtPlxuXHRcdFxcJHsyOi8vIGJvZHkuLi59XG4jIEZ1bmN0aW9uIChib3VuZClcbnNuaXBwZXQgYmZ1blxuXHQoXFwkezE6YXJnc30pID0+XG5cdFx0XFwkezI6Ly8gYm9keS4uLn1cbiMgQ2xhc3NcbnNuaXBwZXQgY2xhIGNsYXNzIC4uXG5cdGNsYXNzIFxcJHsxOlxcYHN1YnN0aXR1dGUoRmlsZW5hbWUoKSwgJ1xcXFwoX1xcXFx8XlxcXFwpXFxcXCguXFxcXCknLCAnXFxcXHVcXFxcMicsICdnJylcXGB9XG5cdFx0XFwkezJ9XG5zbmlwcGV0IGNsYSBjbGFzcyAuLiBjb25zdHJ1Y3RvcjogLi5cblx0Y2xhc3MgXFwkezE6XFxgc3Vic3RpdHV0ZShGaWxlbmFtZSgpLCAnXFxcXChfXFxcXHxeXFxcXClcXFxcKC5cXFxcKScsICdcXFxcdVxcXFwyJywgJ2cnKVxcYH1cblx0XHRjb25zdHJ1Y3RvcjogKFxcJHsyOmFyZ3N9KSAtPlxuXHRcdFx0XFwkezN9XG5cblx0XHRcXCR7NH1cbnNuaXBwZXQgY2xhIGNsYXNzIC4uIGV4dGVuZHMgLi5cblx0Y2xhc3MgXFwkezE6XFxgc3Vic3RpdHV0ZShGaWxlbmFtZSgpLCAnXFxcXChfXFxcXHxeXFxcXClcXFxcKC5cXFxcKScsICdcXFxcdVxcXFwyJywgJ2cnKVxcYH0gZXh0ZW5kcyBcXCR7MjpQYXJlbnRDbGFzc31cblx0XHRcXCR7M31cbnNuaXBwZXQgY2xhIGNsYXNzIC4uIGV4dGVuZHMgLi4gY29uc3RydWN0b3I6IC4uXG5cdGNsYXNzIFxcJHsxOlxcYHN1YnN0aXR1dGUoRmlsZW5hbWUoKSwgJ1xcXFwoX1xcXFx8XlxcXFwpXFxcXCguXFxcXCknLCAnXFxcXHVcXFxcMicsICdnJylcXGB9IGV4dGVuZHMgXFwkezI6UGFyZW50Q2xhc3N9XG5cdFx0Y29uc3RydWN0b3I6IChcXCR7MzphcmdzfSkgLT5cblx0XHRcdFxcJHs0fVxuXG5cdFx0XFwkezV9XG4jIElmXG5zbmlwcGV0IGlmXG5cdGlmIFxcJHsxOmNvbmRpdGlvbn1cblx0XHRcXCR7MjovLyBib2R5Li4ufVxuIyBJZiBfXyBFbHNlXG5zbmlwcGV0IGlmZVxuXHRpZiBcXCR7MTpjb25kaXRpb259XG5cdFx0XFwkezI6Ly8gYm9keS4uLn1cblx0ZWxzZVxuXHRcdFxcJHszOi8vIGJvZHkuLi59XG4jIEVsc2UgaWZcbnNuaXBwZXQgZWxpZlxuXHRlbHNlIGlmIFxcJHsxOmNvbmRpdGlvbn1cblx0XHRcXCR7MjovLyBib2R5Li4ufVxuIyBUZXJuYXJ5IElmXG5zbmlwcGV0IGlmdGVcblx0aWYgXFwkezE6Y29uZGl0aW9ufSB0aGVuIFxcJHsyOnZhbHVlfSBlbHNlIFxcJHszOm90aGVyfVxuIyBVbmxlc3NcbnNuaXBwZXQgdW5sXG5cdFxcJHsxOmFjdGlvbn0gdW5sZXNzIFxcJHsyOmNvbmRpdGlvbn1cbiMgU3dpdGNoXG5zbmlwcGV0IHN3aVxuXHRzd2l0Y2ggXFwkezE6b2JqZWN0fVxuXHRcdHdoZW4gXFwkezI6dmFsdWV9XG5cdFx0XHRcXCR7MzovLyBib2R5Li4ufVxuXG4jIExvZ1xuc25pcHBldCBsb2dcblx0Y29uc29sZS5sb2cgXFwkezF9XG4jIFRyeSBfXyBDYXRjaFxuc25pcHBldCB0cnlcblx0dHJ5XG5cdFx0XFwkezF9XG5cdGNhdGNoIFxcJHsyOmVycm9yfVxuXHRcdFxcJHszfVxuIyBSZXF1aXJlXG5zbmlwcGV0IHJlcVxuXHRcXCR7MjpcXCQxfSA9IHJlcXVpcmUgJ1xcJHsxOnN5c30nXFwkezN9XG4jIEV4cG9ydFxuc25pcHBldCBleHBcblx0XFwkezE6cm9vdH0gPSBleHBvcnRzID8gdGhpc1xuYDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==