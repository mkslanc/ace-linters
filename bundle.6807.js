(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[6807,6013],{

/***/ 6807:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(6013);
exports.scope = "sh";


/***/ }),

/***/ 6013:
/***/ ((module) => {

module.exports = `# Shebang. Executing bash via /usr/bin/env makes scripts more portable.
snippet #!
	#!/usr/bin/env bash
	
snippet if
	if [[ \${1:condition} ]]; then
		\${2:#statements}
	fi
snippet elif
	elif [[ \${1:condition} ]]; then
		\${2:#statements}
snippet for
	for (( \${2:i} = 0; \$2 < \${1:count}; \$2++ )); do
		\${3:#statements}
	done
snippet fori
	for \${1:needle} in \${2:haystack} ; do
		\${3:#statements}
	done
snippet wh
	while [[ \${1:condition} ]]; do
		\${2:#statements}
	done
snippet until
	until [[ \${1:condition} ]]; do
		\${2:#statements}
	done
snippet case
	case \${1:word} in
		\${2:pattern})
			\${3};;
	esac
snippet go 
	while getopts '\${1:o}' \${2:opts} 
	do 
		case \$\$2 in
		\${3:o0})
			\${4:#staments};;
		esac
	done
# Set SCRIPT_DIR variable to directory script is located.
snippet sdir
	SCRIPT_DIR="\$( cd "\$( dirname "\${BASH_SOURCE[0]}" )" && pwd )"
# getopt
snippet getopt
	__ScriptVersion="\${1:version}"

	#===  FUNCTION  ================================================================
	#         NAME:  usage
	#  DESCRIPTION:  Display usage information.
	#===============================================================================
	function usage ()
	{
			cat <<- EOT

	  Usage :  \$\${0:0} [options] [--] 

	  Options: 
	  -h|help       Display this message
	  -v|version    Display script version

	EOT
	}    # ----------  end of function usage  ----------

	#-----------------------------------------------------------------------
	#  Handle command line arguments
	#-----------------------------------------------------------------------

	while getopts ":hv" opt
	do
	  case \$opt in

		h|help     )  usage; exit 0   ;;

		v|version  )  echo "\$\${0:0} -- Version \$__ScriptVersion"; exit 0   ;;

		\\? )  echo -e "\\n  Option does not exist : \$OPTARG\\n"
			  usage; exit 1   ;;

	  esac    # --- end of case ---
	done
	shift \$((\$OPTIND-1))

`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjY4MDcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsK0NBQThDO0FBQzlDLGFBQWE7Ozs7Ozs7O0FDSGI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsYUFBYSxJQUFJO0FBQzNCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWSxhQUFhLElBQUk7QUFDN0IsS0FBSztBQUNMO0FBQ0EsV0FBVyxLQUFLLEtBQUssU0FBUyxVQUFVLFVBQVU7QUFDbEQsS0FBSztBQUNMO0FBQ0E7QUFDQSxRQUFRLFVBQVUsTUFBTSxjQUFjO0FBQ3RDLEtBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBYSxhQUFhLElBQUk7QUFDOUIsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhLGFBQWEsSUFBSTtBQUM5QixLQUFLO0FBQ0w7QUFDQTtBQUNBLFNBQVMsUUFBUTtBQUNqQixLQUFLLFVBQVU7QUFDZixNQUFNO0FBQ047QUFDQTtBQUNBLG1CQUFtQixJQUFJLEtBQUs7QUFDNUI7QUFDQTtBQUNBLEtBQUssS0FBSztBQUNWLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyxlQUFlO0FBQ3BEO0FBQ0E7QUFDQSxxQkFBcUIsVUFBVTs7QUFFL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaUJBQWlCLEtBQUs7O0FBRXRCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLE1BQU07O0FBRU47QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUI7O0FBRXZCLDJCQUEyQixLQUFLLCtCQUErQjs7QUFFL0Q7QUFDQSxZQUFZOztBQUVaO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL3NoLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL3NoLnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLnNuaXBwZXRUZXh0ID0gcmVxdWlyZShcIi4vc2guc25pcHBldHNcIik7XG5leHBvcnRzLnNjb3BlID0gXCJzaFwiO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBgIyBTaGViYW5nLiBFeGVjdXRpbmcgYmFzaCB2aWEgL3Vzci9iaW4vZW52IG1ha2VzIHNjcmlwdHMgbW9yZSBwb3J0YWJsZS5cbnNuaXBwZXQgIyFcblx0IyEvdXNyL2Jpbi9lbnYgYmFzaFxuXHRcbnNuaXBwZXQgaWZcblx0aWYgW1sgXFwkezE6Y29uZGl0aW9ufSBdXTsgdGhlblxuXHRcdFxcJHsyOiNzdGF0ZW1lbnRzfVxuXHRmaVxuc25pcHBldCBlbGlmXG5cdGVsaWYgW1sgXFwkezE6Y29uZGl0aW9ufSBdXTsgdGhlblxuXHRcdFxcJHsyOiNzdGF0ZW1lbnRzfVxuc25pcHBldCBmb3Jcblx0Zm9yICgoIFxcJHsyOml9ID0gMDsgXFwkMiA8IFxcJHsxOmNvdW50fTsgXFwkMisrICkpOyBkb1xuXHRcdFxcJHszOiNzdGF0ZW1lbnRzfVxuXHRkb25lXG5zbmlwcGV0IGZvcmlcblx0Zm9yIFxcJHsxOm5lZWRsZX0gaW4gXFwkezI6aGF5c3RhY2t9IDsgZG9cblx0XHRcXCR7Mzojc3RhdGVtZW50c31cblx0ZG9uZVxuc25pcHBldCB3aFxuXHR3aGlsZSBbWyBcXCR7MTpjb25kaXRpb259IF1dOyBkb1xuXHRcdFxcJHsyOiNzdGF0ZW1lbnRzfVxuXHRkb25lXG5zbmlwcGV0IHVudGlsXG5cdHVudGlsIFtbIFxcJHsxOmNvbmRpdGlvbn0gXV07IGRvXG5cdFx0XFwkezI6I3N0YXRlbWVudHN9XG5cdGRvbmVcbnNuaXBwZXQgY2FzZVxuXHRjYXNlIFxcJHsxOndvcmR9IGluXG5cdFx0XFwkezI6cGF0dGVybn0pXG5cdFx0XHRcXCR7M307O1xuXHRlc2FjXG5zbmlwcGV0IGdvIFxuXHR3aGlsZSBnZXRvcHRzICdcXCR7MTpvfScgXFwkezI6b3B0c30gXG5cdGRvIFxuXHRcdGNhc2UgXFwkXFwkMiBpblxuXHRcdFxcJHszOm8wfSlcblx0XHRcdFxcJHs0OiNzdGFtZW50c307O1xuXHRcdGVzYWNcblx0ZG9uZVxuIyBTZXQgU0NSSVBUX0RJUiB2YXJpYWJsZSB0byBkaXJlY3Rvcnkgc2NyaXB0IGlzIGxvY2F0ZWQuXG5zbmlwcGV0IHNkaXJcblx0U0NSSVBUX0RJUj1cIlxcJCggY2QgXCJcXCQoIGRpcm5hbWUgXCJcXCR7QkFTSF9TT1VSQ0VbMF19XCIgKVwiICYmIHB3ZCApXCJcbiMgZ2V0b3B0XG5zbmlwcGV0IGdldG9wdFxuXHRfX1NjcmlwdFZlcnNpb249XCJcXCR7MTp2ZXJzaW9ufVwiXG5cblx0Iz09PSAgRlVOQ1RJT04gID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0IyAgICAgICAgIE5BTUU6ICB1c2FnZVxuXHQjICBERVNDUklQVElPTjogIERpc3BsYXkgdXNhZ2UgaW5mb3JtYXRpb24uXG5cdCM9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cdGZ1bmN0aW9uIHVzYWdlICgpXG5cdHtcblx0XHRcdGNhdCA8PC0gRU9UXG5cblx0ICBVc2FnZSA6ICBcXCRcXCR7MDowfSBbb3B0aW9uc10gWy0tXSBcblxuXHQgIE9wdGlvbnM6IFxuXHQgIC1ofGhlbHAgICAgICAgRGlzcGxheSB0aGlzIG1lc3NhZ2Vcblx0ICAtdnx2ZXJzaW9uICAgIERpc3BsYXkgc2NyaXB0IHZlcnNpb25cblxuXHRFT1Rcblx0fSAgICAjIC0tLS0tLS0tLS0gIGVuZCBvZiBmdW5jdGlvbiB1c2FnZSAgLS0tLS0tLS0tLVxuXG5cdCMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXHQjICBIYW5kbGUgY29tbWFuZCBsaW5lIGFyZ3VtZW50c1xuXHQjLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cblxuXHR3aGlsZSBnZXRvcHRzIFwiOmh2XCIgb3B0XG5cdGRvXG5cdCAgY2FzZSBcXCRvcHQgaW5cblxuXHRcdGh8aGVscCAgICAgKSAgdXNhZ2U7IGV4aXQgMCAgIDs7XG5cblx0XHR2fHZlcnNpb24gICkgIGVjaG8gXCJcXCRcXCR7MDowfSAtLSBWZXJzaW9uIFxcJF9fU2NyaXB0VmVyc2lvblwiOyBleGl0IDAgICA7O1xuXG5cdFx0XFxcXD8gKSAgZWNobyAtZSBcIlxcXFxuICBPcHRpb24gZG9lcyBub3QgZXhpc3QgOiBcXCRPUFRBUkdcXFxcblwiXG5cdFx0XHQgIHVzYWdlOyBleGl0IDEgICA7O1xuXG5cdCAgZXNhYyAgICAjIC0tLSBlbmQgb2YgY2FzZSAtLS1cblx0ZG9uZVxuXHRzaGlmdCBcXCQoKFxcJE9QVElORC0xKSlcblxuYDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==