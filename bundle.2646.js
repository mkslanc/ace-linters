(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2646,7483],{

/***/ 72646:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(37483);
exports.scope = "tcl";


/***/ }),

/***/ 37483:
/***/ ((module) => {

module.exports = `# #!/usr/bin/env tclsh
snippet #!
	#!/usr/bin/env tclsh
	
# Process
snippet pro
	proc \${1:function_name} {\${2:args}} {
		\${3:#body ...}
	}
#xif
snippet xif
	\${1:expr}? \${2:true} : \${3:false}
# Conditional
snippet if
	if {\${1}} {
		\${2:# body...}
	}
# Conditional if..else
snippet ife
	if {\${1}} {
		\${2:# body...}
	} else {
		\${3:# else...}
	}
# Conditional if..elsif..else
snippet ifee
	if {\${1}} {
		\${2:# body...}
	} elseif {\${3}} {
		\${4:# elsif...}
	} else {
		\${5:# else...}
	}
# If catch then
snippet ifc
	if { [catch {\${1:#do something...}} \${2:err}] } {
		\${3:# handle failure...}
	}
# Catch
snippet catch
	catch {\${1}} \${2:err} \${3:options}
# While Loop
snippet wh
	while {\${1}} {
		\${2:# body...}
	}
# For Loop
snippet for
	for {set \${2:var} 0} {\$\$2 < \${1:count}} {\${3:incr} \$2} {
		\${4:# body...}
	}
# Foreach Loop
snippet fore
	foreach \${1:x} {\${2:#list}} {
		\${3:# body...}
	}
# after ms script...
snippet af
	after \${1:ms} \${2:#do something}
# after cancel id
snippet afc
	after cancel \${1:id or script}
# after idle
snippet afi
	after idle \${1:script}
# after info id
snippet afin
	after info \${1:id}
# Expr
snippet exp
	expr {\${1:#expression here}}
# Switch
snippet sw
	switch \${1:var} {
		\${3:pattern 1} {
			\${4:#do something}
		}
		default {
			\${2:#do something}
		}
	}
# Case
snippet ca
	\${1:pattern} {
		\${2:#do something}
	}\${3}
# Namespace eval
snippet ns
	namespace eval \${1:path} {\${2:#script...}}
# Namespace current
snippet nsc
	namespace current
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjI2NDYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsZ0RBQStDO0FBQy9DLGFBQWE7Ozs7Ozs7O0FDSGI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUyxrQkFBa0IsR0FBRztBQUM5QixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsSUFBSSxPQUFPLEtBQUssUUFBUSxLQUFLO0FBQzdCO0FBQ0E7QUFDQSxLQUFLLEdBQUc7QUFDUixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSyxHQUFHO0FBQ1IsS0FBSztBQUNMLEdBQUc7QUFDSCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSyxHQUFHO0FBQ1IsS0FBSztBQUNMLEdBQUcsUUFBUSxHQUFHO0FBQ2QsS0FBSztBQUNMLEdBQUc7QUFDSCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBTSxRQUFRLEdBQUcscUJBQXFCLEdBQUcsTUFBTTtBQUMvQyxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsUUFBUSxHQUFHLElBQUksR0FBRyxPQUFPLEdBQUc7QUFDNUI7QUFDQTtBQUNBLFFBQVEsR0FBRztBQUNYLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFNLE9BQU8sT0FBTyxJQUFJLFdBQVcsV0FBVyxHQUFHLFFBQVE7QUFDekQsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFlBQVksTUFBTSxHQUFHO0FBQ3JCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFVLE1BQU0sR0FBRztBQUNuQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsT0FBTyxHQUFHO0FBQ1Y7QUFDQTtBQUNBLFdBQVc7QUFDWCxLQUFLO0FBQ0wsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0osS0FBSztBQUNMLEVBQUUsR0FBRztBQUNMO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUyxHQUFHO0FBQy9CO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvdGNsLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL3RjbC5zbmlwcGV0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5zbmlwcGV0VGV4dCA9IHJlcXVpcmUoXCIuL3RjbC5zbmlwcGV0c1wiKTtcbmV4cG9ydHMuc2NvcGUgPSBcInRjbFwiO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBgIyAjIS91c3IvYmluL2VudiB0Y2xzaFxuc25pcHBldCAjIVxuXHQjIS91c3IvYmluL2VudiB0Y2xzaFxuXHRcbiMgUHJvY2Vzc1xuc25pcHBldCBwcm9cblx0cHJvYyBcXCR7MTpmdW5jdGlvbl9uYW1lfSB7XFwkezI6YXJnc319IHtcblx0XHRcXCR7MzojYm9keSAuLi59XG5cdH1cbiN4aWZcbnNuaXBwZXQgeGlmXG5cdFxcJHsxOmV4cHJ9PyBcXCR7Mjp0cnVlfSA6IFxcJHszOmZhbHNlfVxuIyBDb25kaXRpb25hbFxuc25pcHBldCBpZlxuXHRpZiB7XFwkezF9fSB7XG5cdFx0XFwkezI6IyBib2R5Li4ufVxuXHR9XG4jIENvbmRpdGlvbmFsIGlmLi5lbHNlXG5zbmlwcGV0IGlmZVxuXHRpZiB7XFwkezF9fSB7XG5cdFx0XFwkezI6IyBib2R5Li4ufVxuXHR9IGVsc2Uge1xuXHRcdFxcJHszOiMgZWxzZS4uLn1cblx0fVxuIyBDb25kaXRpb25hbCBpZi4uZWxzaWYuLmVsc2VcbnNuaXBwZXQgaWZlZVxuXHRpZiB7XFwkezF9fSB7XG5cdFx0XFwkezI6IyBib2R5Li4ufVxuXHR9IGVsc2VpZiB7XFwkezN9fSB7XG5cdFx0XFwkezQ6IyBlbHNpZi4uLn1cblx0fSBlbHNlIHtcblx0XHRcXCR7NTojIGVsc2UuLi59XG5cdH1cbiMgSWYgY2F0Y2ggdGhlblxuc25pcHBldCBpZmNcblx0aWYgeyBbY2F0Y2gge1xcJHsxOiNkbyBzb21ldGhpbmcuLi59fSBcXCR7MjplcnJ9XSB9IHtcblx0XHRcXCR7MzojIGhhbmRsZSBmYWlsdXJlLi4ufVxuXHR9XG4jIENhdGNoXG5zbmlwcGV0IGNhdGNoXG5cdGNhdGNoIHtcXCR7MX19IFxcJHsyOmVycn0gXFwkezM6b3B0aW9uc31cbiMgV2hpbGUgTG9vcFxuc25pcHBldCB3aFxuXHR3aGlsZSB7XFwkezF9fSB7XG5cdFx0XFwkezI6IyBib2R5Li4ufVxuXHR9XG4jIEZvciBMb29wXG5zbmlwcGV0IGZvclxuXHRmb3Ige3NldCBcXCR7Mjp2YXJ9IDB9IHtcXCRcXCQyIDwgXFwkezE6Y291bnR9fSB7XFwkezM6aW5jcn0gXFwkMn0ge1xuXHRcdFxcJHs0OiMgYm9keS4uLn1cblx0fVxuIyBGb3JlYWNoIExvb3BcbnNuaXBwZXQgZm9yZVxuXHRmb3JlYWNoIFxcJHsxOnh9IHtcXCR7MjojbGlzdH19IHtcblx0XHRcXCR7MzojIGJvZHkuLi59XG5cdH1cbiMgYWZ0ZXIgbXMgc2NyaXB0Li4uXG5zbmlwcGV0IGFmXG5cdGFmdGVyIFxcJHsxOm1zfSBcXCR7MjojZG8gc29tZXRoaW5nfVxuIyBhZnRlciBjYW5jZWwgaWRcbnNuaXBwZXQgYWZjXG5cdGFmdGVyIGNhbmNlbCBcXCR7MTppZCBvciBzY3JpcHR9XG4jIGFmdGVyIGlkbGVcbnNuaXBwZXQgYWZpXG5cdGFmdGVyIGlkbGUgXFwkezE6c2NyaXB0fVxuIyBhZnRlciBpbmZvIGlkXG5zbmlwcGV0IGFmaW5cblx0YWZ0ZXIgaW5mbyBcXCR7MTppZH1cbiMgRXhwclxuc25pcHBldCBleHBcblx0ZXhwciB7XFwkezE6I2V4cHJlc3Npb24gaGVyZX19XG4jIFN3aXRjaFxuc25pcHBldCBzd1xuXHRzd2l0Y2ggXFwkezE6dmFyfSB7XG5cdFx0XFwkezM6cGF0dGVybiAxfSB7XG5cdFx0XHRcXCR7NDojZG8gc29tZXRoaW5nfVxuXHRcdH1cblx0XHRkZWZhdWx0IHtcblx0XHRcdFxcJHsyOiNkbyBzb21ldGhpbmd9XG5cdFx0fVxuXHR9XG4jIENhc2VcbnNuaXBwZXQgY2Fcblx0XFwkezE6cGF0dGVybn0ge1xuXHRcdFxcJHsyOiNkbyBzb21ldGhpbmd9XG5cdH1cXCR7M31cbiMgTmFtZXNwYWNlIGV2YWxcbnNuaXBwZXQgbnNcblx0bmFtZXNwYWNlIGV2YWwgXFwkezE6cGF0aH0ge1xcJHsyOiNzY3JpcHQuLi59fVxuIyBOYW1lc3BhY2UgY3VycmVudFxuc25pcHBldCBuc2Ncblx0bmFtZXNwYWNlIGN1cnJlbnRcbmA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=