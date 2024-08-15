(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8173],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjgxNzMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLGtCQUFrQixHQUFHO0FBQzlCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJLE9BQU8sS0FBSyxRQUFRLEtBQUs7QUFDN0I7QUFDQTtBQUNBLEtBQUssR0FBRztBQUNSLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLLEdBQUc7QUFDUixLQUFLO0FBQ0wsR0FBRztBQUNILEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLLEdBQUc7QUFDUixLQUFLO0FBQ0wsR0FBRyxRQUFRLEdBQUc7QUFDZCxLQUFLO0FBQ0wsR0FBRztBQUNILEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFNLFFBQVEsR0FBRyxxQkFBcUIsR0FBRyxNQUFNO0FBQy9DLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxRQUFRLEdBQUcsSUFBSSxHQUFHLE9BQU8sR0FBRztBQUM1QjtBQUNBO0FBQ0EsUUFBUSxHQUFHO0FBQ1gsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE1BQU0sT0FBTyxPQUFPLElBQUksV0FBVyxXQUFXLEdBQUcsUUFBUTtBQUN6RCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsWUFBWSxNQUFNLEdBQUc7QUFDckIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFVBQVUsTUFBTSxHQUFHO0FBQ25CO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxPQUFPLEdBQUc7QUFDVjtBQUNBO0FBQ0EsV0FBVztBQUNYLEtBQUs7QUFDTCxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSixLQUFLO0FBQ0wsRUFBRSxHQUFHO0FBQ0w7QUFDQTtBQUNBLG1CQUFtQixTQUFTLEdBQUc7QUFDL0I7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy90Y2wuc25pcHBldHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBgIyAjIS91c3IvYmluL2VudiB0Y2xzaFxuc25pcHBldCAjIVxuXHQjIS91c3IvYmluL2VudiB0Y2xzaFxuXHRcbiMgUHJvY2Vzc1xuc25pcHBldCBwcm9cblx0cHJvYyBcXCR7MTpmdW5jdGlvbl9uYW1lfSB7XFwkezI6YXJnc319IHtcblx0XHRcXCR7MzojYm9keSAuLi59XG5cdH1cbiN4aWZcbnNuaXBwZXQgeGlmXG5cdFxcJHsxOmV4cHJ9PyBcXCR7Mjp0cnVlfSA6IFxcJHszOmZhbHNlfVxuIyBDb25kaXRpb25hbFxuc25pcHBldCBpZlxuXHRpZiB7XFwkezF9fSB7XG5cdFx0XFwkezI6IyBib2R5Li4ufVxuXHR9XG4jIENvbmRpdGlvbmFsIGlmLi5lbHNlXG5zbmlwcGV0IGlmZVxuXHRpZiB7XFwkezF9fSB7XG5cdFx0XFwkezI6IyBib2R5Li4ufVxuXHR9IGVsc2Uge1xuXHRcdFxcJHszOiMgZWxzZS4uLn1cblx0fVxuIyBDb25kaXRpb25hbCBpZi4uZWxzaWYuLmVsc2VcbnNuaXBwZXQgaWZlZVxuXHRpZiB7XFwkezF9fSB7XG5cdFx0XFwkezI6IyBib2R5Li4ufVxuXHR9IGVsc2VpZiB7XFwkezN9fSB7XG5cdFx0XFwkezQ6IyBlbHNpZi4uLn1cblx0fSBlbHNlIHtcblx0XHRcXCR7NTojIGVsc2UuLi59XG5cdH1cbiMgSWYgY2F0Y2ggdGhlblxuc25pcHBldCBpZmNcblx0aWYgeyBbY2F0Y2gge1xcJHsxOiNkbyBzb21ldGhpbmcuLi59fSBcXCR7MjplcnJ9XSB9IHtcblx0XHRcXCR7MzojIGhhbmRsZSBmYWlsdXJlLi4ufVxuXHR9XG4jIENhdGNoXG5zbmlwcGV0IGNhdGNoXG5cdGNhdGNoIHtcXCR7MX19IFxcJHsyOmVycn0gXFwkezM6b3B0aW9uc31cbiMgV2hpbGUgTG9vcFxuc25pcHBldCB3aFxuXHR3aGlsZSB7XFwkezF9fSB7XG5cdFx0XFwkezI6IyBib2R5Li4ufVxuXHR9XG4jIEZvciBMb29wXG5zbmlwcGV0IGZvclxuXHRmb3Ige3NldCBcXCR7Mjp2YXJ9IDB9IHtcXCRcXCQyIDwgXFwkezE6Y291bnR9fSB7XFwkezM6aW5jcn0gXFwkMn0ge1xuXHRcdFxcJHs0OiMgYm9keS4uLn1cblx0fVxuIyBGb3JlYWNoIExvb3BcbnNuaXBwZXQgZm9yZVxuXHRmb3JlYWNoIFxcJHsxOnh9IHtcXCR7MjojbGlzdH19IHtcblx0XHRcXCR7MzojIGJvZHkuLi59XG5cdH1cbiMgYWZ0ZXIgbXMgc2NyaXB0Li4uXG5zbmlwcGV0IGFmXG5cdGFmdGVyIFxcJHsxOm1zfSBcXCR7MjojZG8gc29tZXRoaW5nfVxuIyBhZnRlciBjYW5jZWwgaWRcbnNuaXBwZXQgYWZjXG5cdGFmdGVyIGNhbmNlbCBcXCR7MTppZCBvciBzY3JpcHR9XG4jIGFmdGVyIGlkbGVcbnNuaXBwZXQgYWZpXG5cdGFmdGVyIGlkbGUgXFwkezE6c2NyaXB0fVxuIyBhZnRlciBpbmZvIGlkXG5zbmlwcGV0IGFmaW5cblx0YWZ0ZXIgaW5mbyBcXCR7MTppZH1cbiMgRXhwclxuc25pcHBldCBleHBcblx0ZXhwciB7XFwkezE6I2V4cHJlc3Npb24gaGVyZX19XG4jIFN3aXRjaFxuc25pcHBldCBzd1xuXHRzd2l0Y2ggXFwkezE6dmFyfSB7XG5cdFx0XFwkezM6cGF0dGVybiAxfSB7XG5cdFx0XHRcXCR7NDojZG8gc29tZXRoaW5nfVxuXHRcdH1cblx0XHRkZWZhdWx0IHtcblx0XHRcdFxcJHsyOiNkbyBzb21ldGhpbmd9XG5cdFx0fVxuXHR9XG4jIENhc2VcbnNuaXBwZXQgY2Fcblx0XFwkezE6cGF0dGVybn0ge1xuXHRcdFxcJHsyOiNkbyBzb21ldGhpbmd9XG5cdH1cXCR7M31cbiMgTmFtZXNwYWNlIGV2YWxcbnNuaXBwZXQgbnNcblx0bmFtZXNwYWNlIGV2YWwgXFwkezE6cGF0aH0ge1xcJHsyOiNzY3JpcHQuLi59fVxuIyBOYW1lc3BhY2UgY3VycmVudFxuc25pcHBldCBuc2Ncblx0bmFtZXNwYWNlIGN1cnJlbnRcbmA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=