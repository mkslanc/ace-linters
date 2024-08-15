(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[585,8173],{

/***/ 90585:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(8173);
exports.scope = "tcl";


/***/ }),

/***/ 8173:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjU4NS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYiwrQ0FBK0M7QUFDL0MsYUFBYTs7Ozs7Ozs7QUNIYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGtCQUFrQixHQUFHO0FBQzlCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJLE9BQU8sS0FBSyxRQUFRLEtBQUs7QUFDN0I7QUFDQTtBQUNBLEtBQUssR0FBRztBQUNSLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLLEdBQUc7QUFDUixLQUFLO0FBQ0wsR0FBRztBQUNILEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLLEdBQUc7QUFDUixLQUFLO0FBQ0wsR0FBRyxRQUFRLEdBQUc7QUFDZCxLQUFLO0FBQ0wsR0FBRztBQUNILEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFNLFFBQVEsR0FBRyxxQkFBcUIsR0FBRyxNQUFNO0FBQy9DLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxRQUFRLEdBQUcsSUFBSSxHQUFHLE9BQU8sR0FBRztBQUM1QjtBQUNBO0FBQ0EsUUFBUSxHQUFHO0FBQ1gsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQU0sT0FBTyxPQUFPLElBQUksV0FBVyxXQUFXLEdBQUcsUUFBUTtBQUN6RCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsWUFBWSxNQUFNLEdBQUc7QUFDckIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVUsTUFBTSxHQUFHO0FBQ25CO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxPQUFPLEdBQUc7QUFDVjtBQUNBO0FBQ0EsV0FBVztBQUNYLEtBQUs7QUFDTCxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixLQUFLO0FBQ0wsRUFBRSxHQUFHO0FBQ0w7QUFDQTtBQUNBLG1CQUFtQixTQUFTLEdBQUc7QUFDL0I7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy90Y2wuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvdGNsLnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLnNuaXBwZXRUZXh0ID0gcmVxdWlyZShcIi4vdGNsLnNuaXBwZXRzXCIpO1xuZXhwb3J0cy5zY29wZSA9IFwidGNsXCI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGAjICMhL3Vzci9iaW4vZW52IHRjbHNoXG5zbmlwcGV0ICMhXG5cdCMhL3Vzci9iaW4vZW52IHRjbHNoXG5cdFxuIyBQcm9jZXNzXG5zbmlwcGV0IHByb1xuXHRwcm9jIFxcJHsxOmZ1bmN0aW9uX25hbWV9IHtcXCR7MjphcmdzfX0ge1xuXHRcdFxcJHszOiNib2R5IC4uLn1cblx0fVxuI3hpZlxuc25pcHBldCB4aWZcblx0XFwkezE6ZXhwcn0/IFxcJHsyOnRydWV9IDogXFwkezM6ZmFsc2V9XG4jIENvbmRpdGlvbmFsXG5zbmlwcGV0IGlmXG5cdGlmIHtcXCR7MX19IHtcblx0XHRcXCR7MjojIGJvZHkuLi59XG5cdH1cbiMgQ29uZGl0aW9uYWwgaWYuLmVsc2VcbnNuaXBwZXQgaWZlXG5cdGlmIHtcXCR7MX19IHtcblx0XHRcXCR7MjojIGJvZHkuLi59XG5cdH0gZWxzZSB7XG5cdFx0XFwkezM6IyBlbHNlLi4ufVxuXHR9XG4jIENvbmRpdGlvbmFsIGlmLi5lbHNpZi4uZWxzZVxuc25pcHBldCBpZmVlXG5cdGlmIHtcXCR7MX19IHtcblx0XHRcXCR7MjojIGJvZHkuLi59XG5cdH0gZWxzZWlmIHtcXCR7M319IHtcblx0XHRcXCR7NDojIGVsc2lmLi4ufVxuXHR9IGVsc2Uge1xuXHRcdFxcJHs1OiMgZWxzZS4uLn1cblx0fVxuIyBJZiBjYXRjaCB0aGVuXG5zbmlwcGV0IGlmY1xuXHRpZiB7IFtjYXRjaCB7XFwkezE6I2RvIHNvbWV0aGluZy4uLn19IFxcJHsyOmVycn1dIH0ge1xuXHRcdFxcJHszOiMgaGFuZGxlIGZhaWx1cmUuLi59XG5cdH1cbiMgQ2F0Y2hcbnNuaXBwZXQgY2F0Y2hcblx0Y2F0Y2gge1xcJHsxfX0gXFwkezI6ZXJyfSBcXCR7MzpvcHRpb25zfVxuIyBXaGlsZSBMb29wXG5zbmlwcGV0IHdoXG5cdHdoaWxlIHtcXCR7MX19IHtcblx0XHRcXCR7MjojIGJvZHkuLi59XG5cdH1cbiMgRm9yIExvb3BcbnNuaXBwZXQgZm9yXG5cdGZvciB7c2V0IFxcJHsyOnZhcn0gMH0ge1xcJFxcJDIgPCBcXCR7MTpjb3VudH19IHtcXCR7MzppbmNyfSBcXCQyfSB7XG5cdFx0XFwkezQ6IyBib2R5Li4ufVxuXHR9XG4jIEZvcmVhY2ggTG9vcFxuc25pcHBldCBmb3JlXG5cdGZvcmVhY2ggXFwkezE6eH0ge1xcJHsyOiNsaXN0fX0ge1xuXHRcdFxcJHszOiMgYm9keS4uLn1cblx0fVxuIyBhZnRlciBtcyBzY3JpcHQuLi5cbnNuaXBwZXQgYWZcblx0YWZ0ZXIgXFwkezE6bXN9IFxcJHsyOiNkbyBzb21ldGhpbmd9XG4jIGFmdGVyIGNhbmNlbCBpZFxuc25pcHBldCBhZmNcblx0YWZ0ZXIgY2FuY2VsIFxcJHsxOmlkIG9yIHNjcmlwdH1cbiMgYWZ0ZXIgaWRsZVxuc25pcHBldCBhZmlcblx0YWZ0ZXIgaWRsZSBcXCR7MTpzY3JpcHR9XG4jIGFmdGVyIGluZm8gaWRcbnNuaXBwZXQgYWZpblxuXHRhZnRlciBpbmZvIFxcJHsxOmlkfVxuIyBFeHByXG5zbmlwcGV0IGV4cFxuXHRleHByIHtcXCR7MTojZXhwcmVzc2lvbiBoZXJlfX1cbiMgU3dpdGNoXG5zbmlwcGV0IHN3XG5cdHN3aXRjaCBcXCR7MTp2YXJ9IHtcblx0XHRcXCR7MzpwYXR0ZXJuIDF9IHtcblx0XHRcdFxcJHs0OiNkbyBzb21ldGhpbmd9XG5cdFx0fVxuXHRcdGRlZmF1bHQge1xuXHRcdFx0XFwkezI6I2RvIHNvbWV0aGluZ31cblx0XHR9XG5cdH1cbiMgQ2FzZVxuc25pcHBldCBjYVxuXHRcXCR7MTpwYXR0ZXJufSB7XG5cdFx0XFwkezI6I2RvIHNvbWV0aGluZ31cblx0fVxcJHszfVxuIyBOYW1lc3BhY2UgZXZhbFxuc25pcHBldCBuc1xuXHRuYW1lc3BhY2UgZXZhbCBcXCR7MTpwYXRofSB7XFwkezI6I3NjcmlwdC4uLn19XG4jIE5hbWVzcGFjZSBjdXJyZW50XG5zbmlwcGV0IG5zY1xuXHRuYW1lc3BhY2UgY3VycmVudFxuYDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==