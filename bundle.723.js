(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[723,5795],{

/***/ 70723:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(75795);
exports.scope = "sh";


/***/ }),

/***/ 75795:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjcyMy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYixnREFBOEM7QUFDOUMsYUFBYTs7Ozs7Ozs7QUNIYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxhQUFhLElBQUk7QUFDM0IsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZLGFBQWEsSUFBSTtBQUM3QixLQUFLO0FBQ0w7QUFDQSxXQUFXLEtBQUssS0FBSyxTQUFTLFVBQVUsVUFBVTtBQUNsRCxLQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQVEsVUFBVSxNQUFNLGNBQWM7QUFDdEMsS0FBSztBQUNMO0FBQ0E7QUFDQSxhQUFhLGFBQWEsSUFBSTtBQUM5QixLQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQWEsYUFBYSxJQUFJO0FBQzlCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsU0FBUyxRQUFRO0FBQ2pCLEtBQUssVUFBVTtBQUNmLE1BQU07QUFDTjtBQUNBO0FBQ0EsbUJBQW1CLElBQUksS0FBSztBQUM1QjtBQUNBO0FBQ0EsS0FBSyxLQUFLO0FBQ1YsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQXFDLGVBQWU7QUFDcEQ7QUFDQTtBQUNBLHFCQUFxQixVQUFVOztBQUUvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsS0FBSzs7QUFFdEI7QUFDQTtBQUNBOztBQUVBO0FBQ0EsTUFBTTs7QUFFTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHVCQUF1Qjs7QUFFdkIsMkJBQTJCLEtBQUssK0JBQStCOztBQUUvRDtBQUNBLFlBQVk7O0FBRVo7QUFDQTtBQUNBOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvc2guanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvc2guc25pcHBldHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuc25pcHBldFRleHQgPSByZXF1aXJlKFwiLi9zaC5zbmlwcGV0c1wiKTtcbmV4cG9ydHMuc2NvcGUgPSBcInNoXCI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGAjIFNoZWJhbmcuIEV4ZWN1dGluZyBiYXNoIHZpYSAvdXNyL2Jpbi9lbnYgbWFrZXMgc2NyaXB0cyBtb3JlIHBvcnRhYmxlLlxuc25pcHBldCAjIVxuXHQjIS91c3IvYmluL2VudiBiYXNoXG5cdFxuc25pcHBldCBpZlxuXHRpZiBbWyBcXCR7MTpjb25kaXRpb259IF1dOyB0aGVuXG5cdFx0XFwkezI6I3N0YXRlbWVudHN9XG5cdGZpXG5zbmlwcGV0IGVsaWZcblx0ZWxpZiBbWyBcXCR7MTpjb25kaXRpb259IF1dOyB0aGVuXG5cdFx0XFwkezI6I3N0YXRlbWVudHN9XG5zbmlwcGV0IGZvclxuXHRmb3IgKCggXFwkezI6aX0gPSAwOyBcXCQyIDwgXFwkezE6Y291bnR9OyBcXCQyKysgKSk7IGRvXG5cdFx0XFwkezM6I3N0YXRlbWVudHN9XG5cdGRvbmVcbnNuaXBwZXQgZm9yaVxuXHRmb3IgXFwkezE6bmVlZGxlfSBpbiBcXCR7MjpoYXlzdGFja30gOyBkb1xuXHRcdFxcJHszOiNzdGF0ZW1lbnRzfVxuXHRkb25lXG5zbmlwcGV0IHdoXG5cdHdoaWxlIFtbIFxcJHsxOmNvbmRpdGlvbn0gXV07IGRvXG5cdFx0XFwkezI6I3N0YXRlbWVudHN9XG5cdGRvbmVcbnNuaXBwZXQgdW50aWxcblx0dW50aWwgW1sgXFwkezE6Y29uZGl0aW9ufSBdXTsgZG9cblx0XHRcXCR7Mjojc3RhdGVtZW50c31cblx0ZG9uZVxuc25pcHBldCBjYXNlXG5cdGNhc2UgXFwkezE6d29yZH0gaW5cblx0XHRcXCR7MjpwYXR0ZXJufSlcblx0XHRcdFxcJHszfTs7XG5cdGVzYWNcbnNuaXBwZXQgZ28gXG5cdHdoaWxlIGdldG9wdHMgJ1xcJHsxOm99JyBcXCR7MjpvcHRzfSBcblx0ZG8gXG5cdFx0Y2FzZSBcXCRcXCQyIGluXG5cdFx0XFwkezM6bzB9KVxuXHRcdFx0XFwkezQ6I3N0YW1lbnRzfTs7XG5cdFx0ZXNhY1xuXHRkb25lXG4jIFNldCBTQ1JJUFRfRElSIHZhcmlhYmxlIHRvIGRpcmVjdG9yeSBzY3JpcHQgaXMgbG9jYXRlZC5cbnNuaXBwZXQgc2RpclxuXHRTQ1JJUFRfRElSPVwiXFwkKCBjZCBcIlxcJCggZGlybmFtZSBcIlxcJHtCQVNIX1NPVVJDRVswXX1cIiApXCIgJiYgcHdkIClcIlxuIyBnZXRvcHRcbnNuaXBwZXQgZ2V0b3B0XG5cdF9fU2NyaXB0VmVyc2lvbj1cIlxcJHsxOnZlcnNpb259XCJcblxuXHQjPT09ICBGVU5DVElPTiAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXHQjICAgICAgICAgTkFNRTogIHVzYWdlXG5cdCMgIERFU0NSSVBUSU9OOiAgRGlzcGxheSB1c2FnZSBpbmZvcm1hdGlvbi5cblx0Iz09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblx0ZnVuY3Rpb24gdXNhZ2UgKClcblx0e1xuXHRcdFx0Y2F0IDw8LSBFT1RcblxuXHQgIFVzYWdlIDogIFxcJFxcJHswOjB9IFtvcHRpb25zXSBbLS1dIFxuXG5cdCAgT3B0aW9uczogXG5cdCAgLWh8aGVscCAgICAgICBEaXNwbGF5IHRoaXMgbWVzc2FnZVxuXHQgIC12fHZlcnNpb24gICAgRGlzcGxheSBzY3JpcHQgdmVyc2lvblxuXG5cdEVPVFxuXHR9ICAgICMgLS0tLS0tLS0tLSAgZW5kIG9mIGZ1bmN0aW9uIHVzYWdlICAtLS0tLS0tLS0tXG5cblx0Iy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cdCMgIEhhbmRsZSBjb21tYW5kIGxpbmUgYXJndW1lbnRzXG5cdCMtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cdHdoaWxlIGdldG9wdHMgXCI6aHZcIiBvcHRcblx0ZG9cblx0ICBjYXNlIFxcJG9wdCBpblxuXG5cdFx0aHxoZWxwICAgICApICB1c2FnZTsgZXhpdCAwICAgOztcblxuXHRcdHZ8dmVyc2lvbiAgKSAgZWNobyBcIlxcJFxcJHswOjB9IC0tIFZlcnNpb24gXFwkX19TY3JpcHRWZXJzaW9uXCI7IGV4aXQgMCAgIDs7XG5cblx0XHRcXFxcPyApICBlY2hvIC1lIFwiXFxcXG4gIE9wdGlvbiBkb2VzIG5vdCBleGlzdCA6IFxcJE9QVEFSR1xcXFxuXCJcblx0XHRcdCAgdXNhZ2U7IGV4aXQgMSAgIDs7XG5cblx0ICBlc2FjICAgICMgLS0tIGVuZCBvZiBjYXNlIC0tLVxuXHRkb25lXG5cdHNoaWZ0IFxcJCgoXFwkT1BUSU5ELTEpKVxuXG5gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9