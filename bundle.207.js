(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[207,3575],{

/***/ 70207:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(93575);
exports.scope = "javascript";


/***/ }),

/***/ 93575:
/***/ ((module) => {

module.exports = `# Prototype
snippet proto
	\${1:class_name}.prototype.\${2:method_name} = function(\${3:first_argument}) {
		\${4:// body...}
	};
# Function
snippet fun
	function \${1?:function_name}(\${2:argument}) {
		\${3:// body...}
	}
# Anonymous Function
regex /((=)\\s*|(:)\\s*|(\\()|\\b)/f/(\\))?/
snippet f
	function\${M1?: \${1:functionName}}(\$2) {
		\${0:\$TM_SELECTED_TEXT}
	}\${M2?;}\${M3?,}\${M4?)}
# Immediate function
trigger \\(?f\\(
endTrigger \\)?
snippet f(
	(function(\${1}) {
		\${0:\${TM_SELECTED_TEXT:/* code */}}
	}(\${1}));
# if
snippet if
	if (\${1:true}) {
		\${0}
	}
# if ... else
snippet ife
	if (\${1:true}) {
		\${2}
	} else {
		\${0}
	}
# tertiary conditional
snippet ter
	\${1:/* condition */} ? \${2:a} : \${3:b}
# switch
snippet switch
	switch (\${1:expression}) {
		case '\${3:case}':
			\${4:// code}
			break;
		\${5}
		default:
			\${2:// code}
	}
# case
snippet case
	case '\${1:case}':
		\${2:// code}
		break;
	\${3}

# while (...) {...}
snippet wh
	while (\${1:/* condition */}) {
		\${0:/* code */}
	}
# try
snippet try
	try {
		\${0:/* code */}
	} catch (e) {}
# do...while
snippet do
	do {
		\${2:/* code */}
	} while (\${1:/* condition */});
# Object Method
snippet :f
regex /([,{[])|^\\s*/:f/
	\${1:method_name}: function(\${2:attribute}) {
		\${0}
	}\${3:,}
# setTimeout function
snippet setTimeout
regex /\\b/st|timeout|setTimeo?u?t?/
	setTimeout(function() {\${3:\$TM_SELECTED_TEXT}}, \${1:10});
# Get Elements
snippet gett
	getElementsBy\${1:TagName}('\${2}')\${3}
# Get Element
snippet get
	getElementBy\${1:Id}('\${2}')\${3}
# console.log (Firebug)
snippet cl
	console.log(\${1});
# return
snippet ret
	return \${1:result}
# for (property in object ) { ... }
snippet fori
	for (var \${1:prop} in \${2:Things}) {
		\${0:\$2[\$1]}
	}
# hasOwnProperty
snippet has
	hasOwnProperty(\${1})
# docstring
snippet /**
	/**
	 * \${1:description}
	 *
	 */
snippet @par
regex /^\\s*\\*\\s*/@(para?m?)?/
	@param {\${1:type}} \${2:name} \${3:description}
snippet @ret
	@return {\${1:type}} \${2:description}
# JSON.parse
snippet jsonp
	JSON.parse(\${1:jstr});
# JSON.stringify
snippet jsons
	JSON.stringify(\${1:object});
# self-defining function
snippet sdf
	var \${1:function_name} = function(\${2:argument}) {
		\${3:// initial code ...}

		\$1 = function(\$2) {
			\${4:// main code}
		};
	}
# singleton
snippet sing
	function \${1:Singleton} (\${2:argument}) {
		// the cached instance
		var instance;

		// rewrite the constructor
		\$1 = function \$1(\$2) {
			return instance;
		};
		
		// carry over the prototype properties
		\$1.prototype = this;

		// the instance
		instance = new \$1();

		// reset the constructor pointer
		instance.constructor = \$1;

		\${3:// code ...}

		return instance;
	}
# class
snippet class
regex /^\\s*/clas{0,2}/
	var \${1:class} = function(\${20}) {
		\$40\$0
	};
	
	(function() {
		\${60:this.prop = ""}
	}).call(\${1:class}.prototype);
	
	exports.\${1:class} = \${1:class};
# 
snippet for-
	for (var \${1:i} = \${2:Things}.length; \${1:i}--; ) {
		\${0:\${2:Things}[\${1:i}];}
	}
# for (...) {...}
snippet for
	for (var \${1:i} = 0; \$1 < \${2:Things}.length; \$1++) {
		\${3:\$2[\$1]}\$0
	}
# for (...) {...} (Improved Native For-Loop)
snippet forr
	for (var \${1:i} = \${2:Things}.length - 1; \$1 >= 0; \$1--) {
		\${3:\$2[\$1]}\$0
	}


#modules
snippet def
	defin\x65(function(requir\x65, exports, module) {
	"use strict";
	var \${1/.*\\///} = requir\x65("\${1}");
	
	\$TM_SELECTED_TEXT
	});
snippet req
guard ^\\s*
	var \${1/.*\\///} = requir\x65("\${1}");
	\$0
snippet requ
guard ^\\s*
	var \${1/.*\\/(.)/\\u\$1/} = requir\x65("\${1}").\${1/.*\\/(.)/\\u\$1/};
	\$0
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjIwNy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYixnREFBc0Q7QUFDdEQsYUFBYTs7Ozs7Ozs7QUNIYjtBQUNBO0FBQ0EsSUFBSSxhQUFhLGNBQWMsZUFBZSxjQUFjLGlCQUFpQjtBQUM3RSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUIsSUFBSSxXQUFXO0FBQzdDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksUUFBUSxnQkFBZ0I7QUFDcEMsS0FBSztBQUNMLEVBQUUsR0FBRyxLQUFLLEdBQUcsS0FBSyxHQUFHO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxFQUFFO0FBQ2hCLEtBQUssS0FBSztBQUNWLEVBQUUsSUFBSSxFQUFFO0FBQ1I7QUFDQTtBQUNBLFFBQVEsT0FBTztBQUNmLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxRQUFRLE9BQU87QUFDZixLQUFLO0FBQ0wsR0FBRztBQUNILEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxJQUFJLG1CQUFtQixLQUFLLEtBQUssS0FBSztBQUN0QztBQUNBO0FBQ0EsWUFBWSxhQUFhO0FBQ3pCLFdBQVcsT0FBTztBQUNsQixNQUFNO0FBQ047QUFDQSxLQUFLO0FBQ0w7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsVUFBVSxPQUFPO0FBQ2pCLEtBQUs7QUFDTDtBQUNBLElBQUk7O0FBRUosZUFBZTtBQUNmO0FBQ0EsV0FBVyxrQkFBa0I7QUFDN0IsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRyxVQUFVLGtCQUFrQjtBQUMvQjtBQUNBO0FBQ0EsV0FBVztBQUNYLElBQUksY0FBYyxjQUFjLFlBQVk7QUFDNUMsS0FBSztBQUNMLEVBQUUsR0FBRztBQUNMO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixHQUFHLHNCQUFzQixLQUFLLEtBQUs7QUFDM0Q7QUFDQTtBQUNBLGlCQUFpQixVQUFVLEtBQUssRUFBRSxLQUFLO0FBQ3ZDO0FBQ0E7QUFDQSxnQkFBZ0IsS0FBSyxLQUFLLEVBQUUsS0FBSztBQUNqQztBQUNBO0FBQ0EsZ0JBQWdCLEVBQUU7QUFDbEI7QUFDQTtBQUNBLFdBQVc7QUFDWCw4QkFBOEI7QUFDOUI7QUFDQSxhQUFhLFFBQVEsTUFBTSxTQUFTO0FBQ3BDLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsRUFBRTtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTLEdBQUcsU0FBUyxHQUFHLFFBQVEsR0FBRztBQUNuQztBQUNBLFVBQVUsR0FBRyxTQUFTLEdBQUc7QUFDekI7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTtBQUNBLFFBQVEsaUJBQWlCLGNBQWMsV0FBVztBQUNsRCxLQUFLOztBQUVMO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxhQUFhLElBQUksV0FBVztBQUN6QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLElBQUk7QUFDdEIsUUFBUSxTQUFTLGNBQWMsR0FBRztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxFQUFFLFVBQVUsUUFBUTtBQUNwQjtBQUNBLFlBQVksU0FBUyxLQUFLO0FBQzFCO0FBQ0E7QUFDQSxhQUFhLEtBQUssS0FBSyxTQUFTLFNBQVMsR0FBRyxJQUFJLElBQUk7QUFDcEQsS0FBSyxLQUFLLFNBQVMsSUFBSSxJQUFJO0FBQzNCO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYSxLQUFLLEtBQUssU0FBUyxTQUFTLFNBQVM7QUFDbEQsS0FBSyxXQUFXO0FBQ2hCO0FBQ0EsYUFBYSxLQUFLO0FBQ2xCO0FBQ0EsYUFBYSxLQUFLLEtBQUssU0FBUyxhQUFhLFVBQVU7QUFDdkQsS0FBSyxXQUFXO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsV0FBVyxpQkFBaUIsRUFBRTtBQUN0QztBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxRQUFRLFdBQVcsaUJBQWlCLEVBQUU7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsUUFBUSxvQkFBb0IsaUJBQWlCLEVBQUUsTUFBTTtBQUNyRDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvamF2YXNjcmlwdC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy9qYXZhc2NyaXB0LnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLnNuaXBwZXRUZXh0ID0gcmVxdWlyZShcIi4vamF2YXNjcmlwdC5zbmlwcGV0c1wiKTtcbmV4cG9ydHMuc2NvcGUgPSBcImphdmFzY3JpcHRcIjtcbiIsIm1vZHVsZS5leHBvcnRzID0gYCMgUHJvdG90eXBlXG5zbmlwcGV0IHByb3RvXG5cdFxcJHsxOmNsYXNzX25hbWV9LnByb3RvdHlwZS5cXCR7MjptZXRob2RfbmFtZX0gPSBmdW5jdGlvbihcXCR7MzpmaXJzdF9hcmd1bWVudH0pIHtcblx0XHRcXCR7NDovLyBib2R5Li4ufVxuXHR9O1xuIyBGdW5jdGlvblxuc25pcHBldCBmdW5cblx0ZnVuY3Rpb24gXFwkezE/OmZ1bmN0aW9uX25hbWV9KFxcJHsyOmFyZ3VtZW50fSkge1xuXHRcdFxcJHszOi8vIGJvZHkuLi59XG5cdH1cbiMgQW5vbnltb3VzIEZ1bmN0aW9uXG5yZWdleCAvKCg9KVxcXFxzKnwoOilcXFxccyp8KFxcXFwoKXxcXFxcYikvZi8oXFxcXCkpPy9cbnNuaXBwZXQgZlxuXHRmdW5jdGlvblxcJHtNMT86IFxcJHsxOmZ1bmN0aW9uTmFtZX19KFxcJDIpIHtcblx0XHRcXCR7MDpcXCRUTV9TRUxFQ1RFRF9URVhUfVxuXHR9XFwke00yPzt9XFwke00zPyx9XFwke000Pyl9XG4jIEltbWVkaWF0ZSBmdW5jdGlvblxudHJpZ2dlciBcXFxcKD9mXFxcXChcbmVuZFRyaWdnZXIgXFxcXCk/XG5zbmlwcGV0IGYoXG5cdChmdW5jdGlvbihcXCR7MX0pIHtcblx0XHRcXCR7MDpcXCR7VE1fU0VMRUNURURfVEVYVDovKiBjb2RlICovfX1cblx0fShcXCR7MX0pKTtcbiMgaWZcbnNuaXBwZXQgaWZcblx0aWYgKFxcJHsxOnRydWV9KSB7XG5cdFx0XFwkezB9XG5cdH1cbiMgaWYgLi4uIGVsc2VcbnNuaXBwZXQgaWZlXG5cdGlmIChcXCR7MTp0cnVlfSkge1xuXHRcdFxcJHsyfVxuXHR9IGVsc2Uge1xuXHRcdFxcJHswfVxuXHR9XG4jIHRlcnRpYXJ5IGNvbmRpdGlvbmFsXG5zbmlwcGV0IHRlclxuXHRcXCR7MTovKiBjb25kaXRpb24gKi99ID8gXFwkezI6YX0gOiBcXCR7MzpifVxuIyBzd2l0Y2hcbnNuaXBwZXQgc3dpdGNoXG5cdHN3aXRjaCAoXFwkezE6ZXhwcmVzc2lvbn0pIHtcblx0XHRjYXNlICdcXCR7MzpjYXNlfSc6XG5cdFx0XHRcXCR7NDovLyBjb2RlfVxuXHRcdFx0YnJlYWs7XG5cdFx0XFwkezV9XG5cdFx0ZGVmYXVsdDpcblx0XHRcdFxcJHsyOi8vIGNvZGV9XG5cdH1cbiMgY2FzZVxuc25pcHBldCBjYXNlXG5cdGNhc2UgJ1xcJHsxOmNhc2V9Jzpcblx0XHRcXCR7MjovLyBjb2RlfVxuXHRcdGJyZWFrO1xuXHRcXCR7M31cblxuIyB3aGlsZSAoLi4uKSB7Li4ufVxuc25pcHBldCB3aFxuXHR3aGlsZSAoXFwkezE6LyogY29uZGl0aW9uICovfSkge1xuXHRcdFxcJHswOi8qIGNvZGUgKi99XG5cdH1cbiMgdHJ5XG5zbmlwcGV0IHRyeVxuXHR0cnkge1xuXHRcdFxcJHswOi8qIGNvZGUgKi99XG5cdH0gY2F0Y2ggKGUpIHt9XG4jIGRvLi4ud2hpbGVcbnNuaXBwZXQgZG9cblx0ZG8ge1xuXHRcdFxcJHsyOi8qIGNvZGUgKi99XG5cdH0gd2hpbGUgKFxcJHsxOi8qIGNvbmRpdGlvbiAqL30pO1xuIyBPYmplY3QgTWV0aG9kXG5zbmlwcGV0IDpmXG5yZWdleCAvKFsse1tdKXxeXFxcXHMqLzpmL1xuXHRcXCR7MTptZXRob2RfbmFtZX06IGZ1bmN0aW9uKFxcJHsyOmF0dHJpYnV0ZX0pIHtcblx0XHRcXCR7MH1cblx0fVxcJHszOix9XG4jIHNldFRpbWVvdXQgZnVuY3Rpb25cbnNuaXBwZXQgc2V0VGltZW91dFxucmVnZXggL1xcXFxiL3N0fHRpbWVvdXR8c2V0VGltZW8/dT90Py9cblx0c2V0VGltZW91dChmdW5jdGlvbigpIHtcXCR7MzpcXCRUTV9TRUxFQ1RFRF9URVhUfX0sIFxcJHsxOjEwfSk7XG4jIEdldCBFbGVtZW50c1xuc25pcHBldCBnZXR0XG5cdGdldEVsZW1lbnRzQnlcXCR7MTpUYWdOYW1lfSgnXFwkezJ9JylcXCR7M31cbiMgR2V0IEVsZW1lbnRcbnNuaXBwZXQgZ2V0XG5cdGdldEVsZW1lbnRCeVxcJHsxOklkfSgnXFwkezJ9JylcXCR7M31cbiMgY29uc29sZS5sb2cgKEZpcmVidWcpXG5zbmlwcGV0IGNsXG5cdGNvbnNvbGUubG9nKFxcJHsxfSk7XG4jIHJldHVyblxuc25pcHBldCByZXRcblx0cmV0dXJuIFxcJHsxOnJlc3VsdH1cbiMgZm9yIChwcm9wZXJ0eSBpbiBvYmplY3QgKSB7IC4uLiB9XG5zbmlwcGV0IGZvcmlcblx0Zm9yICh2YXIgXFwkezE6cHJvcH0gaW4gXFwkezI6VGhpbmdzfSkge1xuXHRcdFxcJHswOlxcJDJbXFwkMV19XG5cdH1cbiMgaGFzT3duUHJvcGVydHlcbnNuaXBwZXQgaGFzXG5cdGhhc093blByb3BlcnR5KFxcJHsxfSlcbiMgZG9jc3RyaW5nXG5zbmlwcGV0IC8qKlxuXHQvKipcblx0ICogXFwkezE6ZGVzY3JpcHRpb259XG5cdCAqXG5cdCAqL1xuc25pcHBldCBAcGFyXG5yZWdleCAvXlxcXFxzKlxcXFwqXFxcXHMqL0AocGFyYT9tPyk/L1xuXHRAcGFyYW0ge1xcJHsxOnR5cGV9fSBcXCR7MjpuYW1lfSBcXCR7MzpkZXNjcmlwdGlvbn1cbnNuaXBwZXQgQHJldFxuXHRAcmV0dXJuIHtcXCR7MTp0eXBlfX0gXFwkezI6ZGVzY3JpcHRpb259XG4jIEpTT04ucGFyc2VcbnNuaXBwZXQganNvbnBcblx0SlNPTi5wYXJzZShcXCR7MTpqc3RyfSk7XG4jIEpTT04uc3RyaW5naWZ5XG5zbmlwcGV0IGpzb25zXG5cdEpTT04uc3RyaW5naWZ5KFxcJHsxOm9iamVjdH0pO1xuIyBzZWxmLWRlZmluaW5nIGZ1bmN0aW9uXG5zbmlwcGV0IHNkZlxuXHR2YXIgXFwkezE6ZnVuY3Rpb25fbmFtZX0gPSBmdW5jdGlvbihcXCR7Mjphcmd1bWVudH0pIHtcblx0XHRcXCR7MzovLyBpbml0aWFsIGNvZGUgLi4ufVxuXG5cdFx0XFwkMSA9IGZ1bmN0aW9uKFxcJDIpIHtcblx0XHRcdFxcJHs0Oi8vIG1haW4gY29kZX1cblx0XHR9O1xuXHR9XG4jIHNpbmdsZXRvblxuc25pcHBldCBzaW5nXG5cdGZ1bmN0aW9uIFxcJHsxOlNpbmdsZXRvbn0gKFxcJHsyOmFyZ3VtZW50fSkge1xuXHRcdC8vIHRoZSBjYWNoZWQgaW5zdGFuY2Vcblx0XHR2YXIgaW5zdGFuY2U7XG5cblx0XHQvLyByZXdyaXRlIHRoZSBjb25zdHJ1Y3RvclxuXHRcdFxcJDEgPSBmdW5jdGlvbiBcXCQxKFxcJDIpIHtcblx0XHRcdHJldHVybiBpbnN0YW5jZTtcblx0XHR9O1xuXHRcdFxuXHRcdC8vIGNhcnJ5IG92ZXIgdGhlIHByb3RvdHlwZSBwcm9wZXJ0aWVzXG5cdFx0XFwkMS5wcm90b3R5cGUgPSB0aGlzO1xuXG5cdFx0Ly8gdGhlIGluc3RhbmNlXG5cdFx0aW5zdGFuY2UgPSBuZXcgXFwkMSgpO1xuXG5cdFx0Ly8gcmVzZXQgdGhlIGNvbnN0cnVjdG9yIHBvaW50ZXJcblx0XHRpbnN0YW5jZS5jb25zdHJ1Y3RvciA9IFxcJDE7XG5cblx0XHRcXCR7MzovLyBjb2RlIC4uLn1cblxuXHRcdHJldHVybiBpbnN0YW5jZTtcblx0fVxuIyBjbGFzc1xuc25pcHBldCBjbGFzc1xucmVnZXggL15cXFxccyovY2xhc3swLDJ9L1xuXHR2YXIgXFwkezE6Y2xhc3N9ID0gZnVuY3Rpb24oXFwkezIwfSkge1xuXHRcdFxcJDQwXFwkMFxuXHR9O1xuXHRcblx0KGZ1bmN0aW9uKCkge1xuXHRcdFxcJHs2MDp0aGlzLnByb3AgPSBcIlwifVxuXHR9KS5jYWxsKFxcJHsxOmNsYXNzfS5wcm90b3R5cGUpO1xuXHRcblx0ZXhwb3J0cy5cXCR7MTpjbGFzc30gPSBcXCR7MTpjbGFzc307XG4jIFxuc25pcHBldCBmb3ItXG5cdGZvciAodmFyIFxcJHsxOml9ID0gXFwkezI6VGhpbmdzfS5sZW5ndGg7IFxcJHsxOml9LS07ICkge1xuXHRcdFxcJHswOlxcJHsyOlRoaW5nc31bXFwkezE6aX1dO31cblx0fVxuIyBmb3IgKC4uLikgey4uLn1cbnNuaXBwZXQgZm9yXG5cdGZvciAodmFyIFxcJHsxOml9ID0gMDsgXFwkMSA8IFxcJHsyOlRoaW5nc30ubGVuZ3RoOyBcXCQxKyspIHtcblx0XHRcXCR7MzpcXCQyW1xcJDFdfVxcJDBcblx0fVxuIyBmb3IgKC4uLikgey4uLn0gKEltcHJvdmVkIE5hdGl2ZSBGb3ItTG9vcClcbnNuaXBwZXQgZm9yclxuXHRmb3IgKHZhciBcXCR7MTppfSA9IFxcJHsyOlRoaW5nc30ubGVuZ3RoIC0gMTsgXFwkMSA+PSAwOyBcXCQxLS0pIHtcblx0XHRcXCR7MzpcXCQyW1xcJDFdfVxcJDBcblx0fVxuXG5cbiNtb2R1bGVzXG5zbmlwcGV0IGRlZlxuXHRkZWZpblxceDY1KGZ1bmN0aW9uKHJlcXVpclxceDY1LCBleHBvcnRzLCBtb2R1bGUpIHtcblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdHZhciBcXCR7MS8uKlxcXFwvLy99ID0gcmVxdWlyXFx4NjUoXCJcXCR7MX1cIik7XG5cdFxuXHRcXCRUTV9TRUxFQ1RFRF9URVhUXG5cdH0pO1xuc25pcHBldCByZXFcbmd1YXJkIF5cXFxccypcblx0dmFyIFxcJHsxLy4qXFxcXC8vL30gPSByZXF1aXJcXHg2NShcIlxcJHsxfVwiKTtcblx0XFwkMFxuc25pcHBldCByZXF1XG5ndWFyZCBeXFxcXHMqXG5cdHZhciBcXCR7MS8uKlxcXFwvKC4pL1xcXFx1XFwkMS99ID0gcmVxdWlyXFx4NjUoXCJcXCR7MX1cIikuXFwkezEvLipcXFxcLyguKS9cXFxcdVxcJDEvfTtcblx0XFwkMFxuYDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==