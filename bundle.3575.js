(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3575],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dkQsS0FBSyxXQUFXO0FBQ2hCOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsV0FBVyxpQkFBaUIsRUFBRTtBQUN0QztBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxRQUFRLFdBQVcsaUJBQWlCLEVBQUU7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsUUFBUSxvQkFBb0IsaUJBQWlCLEVBQUUsTUFBTTtBQUNyRDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvamF2YXNjcmlwdC5zbmlwcGV0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGAjIFByb3RvdHlwZVxuc25pcHBldCBwcm90b1xuXHRcXCR7MTpjbGFzc19uYW1lfS5wcm90b3R5cGUuXFwkezI6bWV0aG9kX25hbWV9ID0gZnVuY3Rpb24oXFwkezM6Zmlyc3RfYXJndW1lbnR9KSB7XG5cdFx0XFwkezQ6Ly8gYm9keS4uLn1cblx0fTtcbiMgRnVuY3Rpb25cbnNuaXBwZXQgZnVuXG5cdGZ1bmN0aW9uIFxcJHsxPzpmdW5jdGlvbl9uYW1lfShcXCR7Mjphcmd1bWVudH0pIHtcblx0XHRcXCR7MzovLyBib2R5Li4ufVxuXHR9XG4jIEFub255bW91cyBGdW5jdGlvblxucmVnZXggLygoPSlcXFxccyp8KDopXFxcXHMqfChcXFxcKCl8XFxcXGIpL2YvKFxcXFwpKT8vXG5zbmlwcGV0IGZcblx0ZnVuY3Rpb25cXCR7TTE/OiBcXCR7MTpmdW5jdGlvbk5hbWV9fShcXCQyKSB7XG5cdFx0XFwkezA6XFwkVE1fU0VMRUNURURfVEVYVH1cblx0fVxcJHtNMj87fVxcJHtNMz8sfVxcJHtNND8pfVxuIyBJbW1lZGlhdGUgZnVuY3Rpb25cbnRyaWdnZXIgXFxcXCg/ZlxcXFwoXG5lbmRUcmlnZ2VyIFxcXFwpP1xuc25pcHBldCBmKFxuXHQoZnVuY3Rpb24oXFwkezF9KSB7XG5cdFx0XFwkezA6XFwke1RNX1NFTEVDVEVEX1RFWFQ6LyogY29kZSAqL319XG5cdH0oXFwkezF9KSk7XG4jIGlmXG5zbmlwcGV0IGlmXG5cdGlmIChcXCR7MTp0cnVlfSkge1xuXHRcdFxcJHswfVxuXHR9XG4jIGlmIC4uLiBlbHNlXG5zbmlwcGV0IGlmZVxuXHRpZiAoXFwkezE6dHJ1ZX0pIHtcblx0XHRcXCR7Mn1cblx0fSBlbHNlIHtcblx0XHRcXCR7MH1cblx0fVxuIyB0ZXJ0aWFyeSBjb25kaXRpb25hbFxuc25pcHBldCB0ZXJcblx0XFwkezE6LyogY29uZGl0aW9uICovfSA/IFxcJHsyOmF9IDogXFwkezM6Yn1cbiMgc3dpdGNoXG5zbmlwcGV0IHN3aXRjaFxuXHRzd2l0Y2ggKFxcJHsxOmV4cHJlc3Npb259KSB7XG5cdFx0Y2FzZSAnXFwkezM6Y2FzZX0nOlxuXHRcdFx0XFwkezQ6Ly8gY29kZX1cblx0XHRcdGJyZWFrO1xuXHRcdFxcJHs1fVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRcXCR7MjovLyBjb2RlfVxuXHR9XG4jIGNhc2VcbnNuaXBwZXQgY2FzZVxuXHRjYXNlICdcXCR7MTpjYXNlfSc6XG5cdFx0XFwkezI6Ly8gY29kZX1cblx0XHRicmVhaztcblx0XFwkezN9XG5cbiMgd2hpbGUgKC4uLikgey4uLn1cbnNuaXBwZXQgd2hcblx0d2hpbGUgKFxcJHsxOi8qIGNvbmRpdGlvbiAqL30pIHtcblx0XHRcXCR7MDovKiBjb2RlICovfVxuXHR9XG4jIHRyeVxuc25pcHBldCB0cnlcblx0dHJ5IHtcblx0XHRcXCR7MDovKiBjb2RlICovfVxuXHR9IGNhdGNoIChlKSB7fVxuIyBkby4uLndoaWxlXG5zbmlwcGV0IGRvXG5cdGRvIHtcblx0XHRcXCR7MjovKiBjb2RlICovfVxuXHR9IHdoaWxlIChcXCR7MTovKiBjb25kaXRpb24gKi99KTtcbiMgT2JqZWN0IE1ldGhvZFxuc25pcHBldCA6ZlxucmVnZXggLyhbLHtbXSl8XlxcXFxzKi86Zi9cblx0XFwkezE6bWV0aG9kX25hbWV9OiBmdW5jdGlvbihcXCR7MjphdHRyaWJ1dGV9KSB7XG5cdFx0XFwkezB9XG5cdH1cXCR7MzosfVxuIyBzZXRUaW1lb3V0IGZ1bmN0aW9uXG5zbmlwcGV0IHNldFRpbWVvdXRcbnJlZ2V4IC9cXFxcYi9zdHx0aW1lb3V0fHNldFRpbWVvP3U/dD8vXG5cdHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XFwkezM6XFwkVE1fU0VMRUNURURfVEVYVH19LCBcXCR7MToxMH0pO1xuIyBHZXQgRWxlbWVudHNcbnNuaXBwZXQgZ2V0dFxuXHRnZXRFbGVtZW50c0J5XFwkezE6VGFnTmFtZX0oJ1xcJHsyfScpXFwkezN9XG4jIEdldCBFbGVtZW50XG5zbmlwcGV0IGdldFxuXHRnZXRFbGVtZW50QnlcXCR7MTpJZH0oJ1xcJHsyfScpXFwkezN9XG4jIGNvbnNvbGUubG9nIChGaXJlYnVnKVxuc25pcHBldCBjbFxuXHRjb25zb2xlLmxvZyhcXCR7MX0pO1xuIyByZXR1cm5cbnNuaXBwZXQgcmV0XG5cdHJldHVybiBcXCR7MTpyZXN1bHR9XG4jIGZvciAocHJvcGVydHkgaW4gb2JqZWN0ICkgeyAuLi4gfVxuc25pcHBldCBmb3JpXG5cdGZvciAodmFyIFxcJHsxOnByb3B9IGluIFxcJHsyOlRoaW5nc30pIHtcblx0XHRcXCR7MDpcXCQyW1xcJDFdfVxuXHR9XG4jIGhhc093blByb3BlcnR5XG5zbmlwcGV0IGhhc1xuXHRoYXNPd25Qcm9wZXJ0eShcXCR7MX0pXG4jIGRvY3N0cmluZ1xuc25pcHBldCAvKipcblx0LyoqXG5cdCAqIFxcJHsxOmRlc2NyaXB0aW9ufVxuXHQgKlxuXHQgKi9cbnNuaXBwZXQgQHBhclxucmVnZXggL15cXFxccypcXFxcKlxcXFxzKi9AKHBhcmE/bT8pPy9cblx0QHBhcmFtIHtcXCR7MTp0eXBlfX0gXFwkezI6bmFtZX0gXFwkezM6ZGVzY3JpcHRpb259XG5zbmlwcGV0IEByZXRcblx0QHJldHVybiB7XFwkezE6dHlwZX19IFxcJHsyOmRlc2NyaXB0aW9ufVxuIyBKU09OLnBhcnNlXG5zbmlwcGV0IGpzb25wXG5cdEpTT04ucGFyc2UoXFwkezE6anN0cn0pO1xuIyBKU09OLnN0cmluZ2lmeVxuc25pcHBldCBqc29uc1xuXHRKU09OLnN0cmluZ2lmeShcXCR7MTpvYmplY3R9KTtcbiMgc2VsZi1kZWZpbmluZyBmdW5jdGlvblxuc25pcHBldCBzZGZcblx0dmFyIFxcJHsxOmZ1bmN0aW9uX25hbWV9ID0gZnVuY3Rpb24oXFwkezI6YXJndW1lbnR9KSB7XG5cdFx0XFwkezM6Ly8gaW5pdGlhbCBjb2RlIC4uLn1cblxuXHRcdFxcJDEgPSBmdW5jdGlvbihcXCQyKSB7XG5cdFx0XHRcXCR7NDovLyBtYWluIGNvZGV9XG5cdFx0fTtcblx0fVxuIyBzaW5nbGV0b25cbnNuaXBwZXQgc2luZ1xuXHRmdW5jdGlvbiBcXCR7MTpTaW5nbGV0b259IChcXCR7Mjphcmd1bWVudH0pIHtcblx0XHQvLyB0aGUgY2FjaGVkIGluc3RhbmNlXG5cdFx0dmFyIGluc3RhbmNlO1xuXG5cdFx0Ly8gcmV3cml0ZSB0aGUgY29uc3RydWN0b3Jcblx0XHRcXCQxID0gZnVuY3Rpb24gXFwkMShcXCQyKSB7XG5cdFx0XHRyZXR1cm4gaW5zdGFuY2U7XG5cdFx0fTtcblx0XHRcblx0XHQvLyBjYXJyeSBvdmVyIHRoZSBwcm90b3R5cGUgcHJvcGVydGllc1xuXHRcdFxcJDEucHJvdG90eXBlID0gdGhpcztcblxuXHRcdC8vIHRoZSBpbnN0YW5jZVxuXHRcdGluc3RhbmNlID0gbmV3IFxcJDEoKTtcblxuXHRcdC8vIHJlc2V0IHRoZSBjb25zdHJ1Y3RvciBwb2ludGVyXG5cdFx0aW5zdGFuY2UuY29uc3RydWN0b3IgPSBcXCQxO1xuXG5cdFx0XFwkezM6Ly8gY29kZSAuLi59XG5cblx0XHRyZXR1cm4gaW5zdGFuY2U7XG5cdH1cbiMgY2xhc3NcbnNuaXBwZXQgY2xhc3NcbnJlZ2V4IC9eXFxcXHMqL2NsYXN7MCwyfS9cblx0dmFyIFxcJHsxOmNsYXNzfSA9IGZ1bmN0aW9uKFxcJHsyMH0pIHtcblx0XHRcXCQ0MFxcJDBcblx0fTtcblx0XG5cdChmdW5jdGlvbigpIHtcblx0XHRcXCR7NjA6dGhpcy5wcm9wID0gXCJcIn1cblx0fSkuY2FsbChcXCR7MTpjbGFzc30ucHJvdG90eXBlKTtcblx0XG5cdGV4cG9ydHMuXFwkezE6Y2xhc3N9ID0gXFwkezE6Y2xhc3N9O1xuIyBcbnNuaXBwZXQgZm9yLVxuXHRmb3IgKHZhciBcXCR7MTppfSA9IFxcJHsyOlRoaW5nc30ubGVuZ3RoOyBcXCR7MTppfS0tOyApIHtcblx0XHRcXCR7MDpcXCR7MjpUaGluZ3N9W1xcJHsxOml9XTt9XG5cdH1cbiMgZm9yICguLi4pIHsuLi59XG5zbmlwcGV0IGZvclxuXHRmb3IgKHZhciBcXCR7MTppfSA9IDA7IFxcJDEgPCBcXCR7MjpUaGluZ3N9Lmxlbmd0aDsgXFwkMSsrKSB7XG5cdFx0XFwkezM6XFwkMltcXCQxXX1cXCQwXG5cdH1cbiMgZm9yICguLi4pIHsuLi59IChJbXByb3ZlZCBOYXRpdmUgRm9yLUxvb3ApXG5zbmlwcGV0IGZvcnJcblx0Zm9yICh2YXIgXFwkezE6aX0gPSBcXCR7MjpUaGluZ3N9Lmxlbmd0aCAtIDE7IFxcJDEgPj0gMDsgXFwkMS0tKSB7XG5cdFx0XFwkezM6XFwkMltcXCQxXX1cXCQwXG5cdH1cblxuXG4jbW9kdWxlc1xuc25pcHBldCBkZWZcblx0ZGVmaW5cXHg2NShmdW5jdGlvbihyZXF1aXJcXHg2NSwgZXhwb3J0cywgbW9kdWxlKSB7XG5cdFwidXNlIHN0cmljdFwiO1xuXHR2YXIgXFwkezEvLipcXFxcLy8vfSA9IHJlcXVpclxceDY1KFwiXFwkezF9XCIpO1xuXHRcblx0XFwkVE1fU0VMRUNURURfVEVYVFxuXHR9KTtcbnNuaXBwZXQgcmVxXG5ndWFyZCBeXFxcXHMqXG5cdHZhciBcXCR7MS8uKlxcXFwvLy99ID0gcmVxdWlyXFx4NjUoXCJcXCR7MX1cIik7XG5cdFxcJDBcbnNuaXBwZXQgcmVxdVxuZ3VhcmQgXlxcXFxzKlxuXHR2YXIgXFwkezEvLipcXFxcLyguKS9cXFxcdVxcJDEvfSA9IHJlcXVpclxceDY1KFwiXFwkezF9XCIpLlxcJHsxLy4qXFxcXC8oLikvXFxcXHVcXCQxL307XG5cdFxcJDBcbmA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=