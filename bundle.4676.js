(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4676,1738],{

/***/ 4676:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(21738);
exports.scope = "r";


/***/ }),

/***/ 21738:
/***/ ((module) => {

module.exports = `snippet #!
	#!/usr/bin/env Rscript

# includes
snippet lib
	library(\${1:package})
snippet req
	require(\${1:package})
snippet source
	source('\${1:file}')

# conditionals
snippet if
	if (\${1:condition}) {
		\${2:code}
	}
snippet el
	else {
		\${1:code}
	}
snippet ei
	else if (\${1:condition}) {
		\${2:code}
	}

# functions
snippet fun
	\${1:name} = function (\${2:variables}) {
		\${3:code}
	}
snippet ret
	return(\${1:code})

# dataframes, lists, etc
snippet df
	\${1:name}[\${2:rows}, \${3:cols}]
snippet c
	c(\${1:items})
snippet li
	list(\${1:items})
snippet mat
	matrix(\${1:data}, nrow=\${2:rows}, ncol=\${3:cols})

# apply functions
snippet apply
	apply(\${1:array}, \${2:margin}, \${3:function})
snippet lapply
	lapply(\${1:list}, \${2:function})
snippet sapply
	sapply(\${1:list}, \${2:function})
snippet vapply
	vapply(\${1:list}, \${2:function}, \${3:type})
snippet mapply
	mapply(\${1:function}, \${2:...})
snippet tapply
	tapply(\${1:vector}, \${2:index}, \${3:function})
snippet rapply
	rapply(\${1:list}, \${2:function})

# plyr functions
snippet dd
	ddply(\${1:frame}, \${2:variables}, \${3:function})
snippet dl
	dlply(\${1:frame}, \${2:variables}, \${3:function})
snippet da
	daply(\${1:frame}, \${2:variables}, \${3:function})
snippet d_
	d_ply(\${1:frame}, \${2:variables}, \${3:function})

snippet ad
	adply(\${1:array}, \${2:margin}, \${3:function})
snippet al
	alply(\${1:array}, \${2:margin}, \${3:function})
snippet aa
	aaply(\${1:array}, \${2:margin}, \${3:function})
snippet a_
	a_ply(\${1:array}, \${2:margin}, \${3:function})

snippet ld
	ldply(\${1:list}, \${2:function})
snippet ll
	llply(\${1:list}, \${2:function})
snippet la
	laply(\${1:list}, \${2:function})
snippet l_
	l_ply(\${1:list}, \${2:function})

snippet md
	mdply(\${1:matrix}, \${2:function})
snippet ml
	mlply(\${1:matrix}, \${2:function})
snippet ma
	maply(\${1:matrix}, \${2:function})
snippet m_
	m_ply(\${1:matrix}, \${2:function})

# plot functions
snippet pl
	plot(\${1:x}, \${2:y})
snippet ggp
	ggplot(\${1:data}, aes(\${2:aesthetics}))
snippet img
	\${1:(jpeg,bmp,png,tiff)}(filename="\${2:filename}", width=\${3}, height=\${4}, unit="\${5}")
	\${6:plot}
	dev.off()

# statistical test functions
snippet fis
	fisher.test(\${1:x}, \${2:y})
snippet chi
	chisq.test(\${1:x}, \${2:y})
snippet tt
	t.test(\${1:x}, \${2:y})
snippet wil
	wilcox.test(\${1:x}, \${2:y})
snippet cor
	cor.test(\${1:x}, \${2:y})
snippet fte
	var.test(\${1:x}, \${2:y})
snippet kvt 
	kv.test(\${1:x}, \${2:y})
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQ2NzYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsZ0RBQTZDO0FBQzdDLGFBQWE7Ozs7Ozs7O0FDSGI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxVQUFVO0FBQ3RCO0FBQ0EsWUFBWSxVQUFVO0FBQ3RCO0FBQ0EsWUFBWSxPQUFPOztBQUVuQjtBQUNBO0FBQ0EsUUFBUSxZQUFZO0FBQ3BCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQWEsWUFBWTtBQUN6QixLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLElBQUksUUFBUSxlQUFlLFlBQVk7QUFDdkMsS0FBSztBQUNMO0FBQ0E7QUFDQSxXQUFXLE9BQU87O0FBRWxCO0FBQ0E7QUFDQSxJQUFJLE9BQU8sSUFBSSxPQUFPLEtBQUssT0FBTztBQUNsQztBQUNBLE1BQU0sUUFBUTtBQUNkO0FBQ0EsU0FBUyxRQUFRO0FBQ2pCO0FBQ0EsV0FBVyxPQUFPLFVBQVUsT0FBTyxVQUFVLE9BQU87O0FBRXBEO0FBQ0E7QUFDQSxVQUFVLFFBQVEsS0FBSyxTQUFTLEtBQUssV0FBVztBQUNoRDtBQUNBLFdBQVcsT0FBTyxLQUFLLFdBQVc7QUFDbEM7QUFDQSxXQUFXLE9BQU8sS0FBSyxXQUFXO0FBQ2xDO0FBQ0EsV0FBVyxPQUFPLEtBQUssV0FBVyxLQUFLLE9BQU87QUFDOUM7QUFDQSxXQUFXLFdBQVcsS0FBSyxNQUFNO0FBQ2pDO0FBQ0EsV0FBVyxTQUFTLEtBQUssUUFBUSxLQUFLLFdBQVc7QUFDakQ7QUFDQSxXQUFXLE9BQU8sS0FBSyxXQUFXOztBQUVsQztBQUNBO0FBQ0EsVUFBVSxRQUFRLEtBQUssWUFBWSxLQUFLLFdBQVc7QUFDbkQ7QUFDQSxVQUFVLFFBQVEsS0FBSyxZQUFZLEtBQUssV0FBVztBQUNuRDtBQUNBLFVBQVUsUUFBUSxLQUFLLFlBQVksS0FBSyxXQUFXO0FBQ25EO0FBQ0EsVUFBVSxRQUFRLEtBQUssWUFBWSxLQUFLLFdBQVc7O0FBRW5EO0FBQ0EsVUFBVSxRQUFRLEtBQUssU0FBUyxLQUFLLFdBQVc7QUFDaEQ7QUFDQSxVQUFVLFFBQVEsS0FBSyxTQUFTLEtBQUssV0FBVztBQUNoRDtBQUNBLFVBQVUsUUFBUSxLQUFLLFNBQVMsS0FBSyxXQUFXO0FBQ2hEO0FBQ0EsVUFBVSxRQUFRLEtBQUssU0FBUyxLQUFLLFdBQVc7O0FBRWhEO0FBQ0EsVUFBVSxPQUFPLEtBQUssV0FBVztBQUNqQztBQUNBLFVBQVUsT0FBTyxLQUFLLFdBQVc7QUFDakM7QUFDQSxVQUFVLE9BQU8sS0FBSyxXQUFXO0FBQ2pDO0FBQ0EsVUFBVSxPQUFPLEtBQUssV0FBVzs7QUFFakM7QUFDQSxVQUFVLFNBQVMsS0FBSyxXQUFXO0FBQ25DO0FBQ0EsVUFBVSxTQUFTLEtBQUssV0FBVztBQUNuQztBQUNBLFVBQVUsU0FBUyxLQUFLLFdBQVc7QUFDbkM7QUFDQSxVQUFVLFNBQVMsS0FBSyxXQUFXOztBQUVuQztBQUNBO0FBQ0EsU0FBUyxJQUFJLEtBQUssSUFBSTtBQUN0QjtBQUNBLFdBQVcsT0FBTyxTQUFTLGFBQWE7QUFDeEM7QUFDQSxJQUFJLHNCQUFzQixjQUFjLFdBQVcsWUFBWSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUU7QUFDNUYsSUFBSTtBQUNKOztBQUVBO0FBQ0E7QUFDQSxnQkFBZ0IsSUFBSSxLQUFLLElBQUk7QUFDN0I7QUFDQSxlQUFlLElBQUksS0FBSyxJQUFJO0FBQzVCO0FBQ0EsV0FBVyxJQUFJLEtBQUssSUFBSTtBQUN4QjtBQUNBLGdCQUFnQixJQUFJLEtBQUssSUFBSTtBQUM3QjtBQUNBLGFBQWEsSUFBSSxLQUFLLElBQUk7QUFDMUI7QUFDQSxhQUFhLElBQUksS0FBSyxJQUFJO0FBQzFCO0FBQ0EsWUFBWSxJQUFJLEtBQUssSUFBSTtBQUN6QiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL3IuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvci5zbmlwcGV0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5zbmlwcGV0VGV4dCA9IHJlcXVpcmUoXCIuL3Iuc25pcHBldHNcIik7XG5leHBvcnRzLnNjb3BlID0gXCJyXCI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGBzbmlwcGV0ICMhXG5cdCMhL3Vzci9iaW4vZW52IFJzY3JpcHRcblxuIyBpbmNsdWRlc1xuc25pcHBldCBsaWJcblx0bGlicmFyeShcXCR7MTpwYWNrYWdlfSlcbnNuaXBwZXQgcmVxXG5cdHJlcXVpcmUoXFwkezE6cGFja2FnZX0pXG5zbmlwcGV0IHNvdXJjZVxuXHRzb3VyY2UoJ1xcJHsxOmZpbGV9JylcblxuIyBjb25kaXRpb25hbHNcbnNuaXBwZXQgaWZcblx0aWYgKFxcJHsxOmNvbmRpdGlvbn0pIHtcblx0XHRcXCR7Mjpjb2RlfVxuXHR9XG5zbmlwcGV0IGVsXG5cdGVsc2Uge1xuXHRcdFxcJHsxOmNvZGV9XG5cdH1cbnNuaXBwZXQgZWlcblx0ZWxzZSBpZiAoXFwkezE6Y29uZGl0aW9ufSkge1xuXHRcdFxcJHsyOmNvZGV9XG5cdH1cblxuIyBmdW5jdGlvbnNcbnNuaXBwZXQgZnVuXG5cdFxcJHsxOm5hbWV9ID0gZnVuY3Rpb24gKFxcJHsyOnZhcmlhYmxlc30pIHtcblx0XHRcXCR7Mzpjb2RlfVxuXHR9XG5zbmlwcGV0IHJldFxuXHRyZXR1cm4oXFwkezE6Y29kZX0pXG5cbiMgZGF0YWZyYW1lcywgbGlzdHMsIGV0Y1xuc25pcHBldCBkZlxuXHRcXCR7MTpuYW1lfVtcXCR7Mjpyb3dzfSwgXFwkezM6Y29sc31dXG5zbmlwcGV0IGNcblx0YyhcXCR7MTppdGVtc30pXG5zbmlwcGV0IGxpXG5cdGxpc3QoXFwkezE6aXRlbXN9KVxuc25pcHBldCBtYXRcblx0bWF0cml4KFxcJHsxOmRhdGF9LCBucm93PVxcJHsyOnJvd3N9LCBuY29sPVxcJHszOmNvbHN9KVxuXG4jIGFwcGx5IGZ1bmN0aW9uc1xuc25pcHBldCBhcHBseVxuXHRhcHBseShcXCR7MTphcnJheX0sIFxcJHsyOm1hcmdpbn0sIFxcJHszOmZ1bmN0aW9ufSlcbnNuaXBwZXQgbGFwcGx5XG5cdGxhcHBseShcXCR7MTpsaXN0fSwgXFwkezI6ZnVuY3Rpb259KVxuc25pcHBldCBzYXBwbHlcblx0c2FwcGx5KFxcJHsxOmxpc3R9LCBcXCR7MjpmdW5jdGlvbn0pXG5zbmlwcGV0IHZhcHBseVxuXHR2YXBwbHkoXFwkezE6bGlzdH0sIFxcJHsyOmZ1bmN0aW9ufSwgXFwkezM6dHlwZX0pXG5zbmlwcGV0IG1hcHBseVxuXHRtYXBwbHkoXFwkezE6ZnVuY3Rpb259LCBcXCR7MjouLi59KVxuc25pcHBldCB0YXBwbHlcblx0dGFwcGx5KFxcJHsxOnZlY3Rvcn0sIFxcJHsyOmluZGV4fSwgXFwkezM6ZnVuY3Rpb259KVxuc25pcHBldCByYXBwbHlcblx0cmFwcGx5KFxcJHsxOmxpc3R9LCBcXCR7MjpmdW5jdGlvbn0pXG5cbiMgcGx5ciBmdW5jdGlvbnNcbnNuaXBwZXQgZGRcblx0ZGRwbHkoXFwkezE6ZnJhbWV9LCBcXCR7Mjp2YXJpYWJsZXN9LCBcXCR7MzpmdW5jdGlvbn0pXG5zbmlwcGV0IGRsXG5cdGRscGx5KFxcJHsxOmZyYW1lfSwgXFwkezI6dmFyaWFibGVzfSwgXFwkezM6ZnVuY3Rpb259KVxuc25pcHBldCBkYVxuXHRkYXBseShcXCR7MTpmcmFtZX0sIFxcJHsyOnZhcmlhYmxlc30sIFxcJHszOmZ1bmN0aW9ufSlcbnNuaXBwZXQgZF9cblx0ZF9wbHkoXFwkezE6ZnJhbWV9LCBcXCR7Mjp2YXJpYWJsZXN9LCBcXCR7MzpmdW5jdGlvbn0pXG5cbnNuaXBwZXQgYWRcblx0YWRwbHkoXFwkezE6YXJyYXl9LCBcXCR7MjptYXJnaW59LCBcXCR7MzpmdW5jdGlvbn0pXG5zbmlwcGV0IGFsXG5cdGFscGx5KFxcJHsxOmFycmF5fSwgXFwkezI6bWFyZ2lufSwgXFwkezM6ZnVuY3Rpb259KVxuc25pcHBldCBhYVxuXHRhYXBseShcXCR7MTphcnJheX0sIFxcJHsyOm1hcmdpbn0sIFxcJHszOmZ1bmN0aW9ufSlcbnNuaXBwZXQgYV9cblx0YV9wbHkoXFwkezE6YXJyYXl9LCBcXCR7MjptYXJnaW59LCBcXCR7MzpmdW5jdGlvbn0pXG5cbnNuaXBwZXQgbGRcblx0bGRwbHkoXFwkezE6bGlzdH0sIFxcJHsyOmZ1bmN0aW9ufSlcbnNuaXBwZXQgbGxcblx0bGxwbHkoXFwkezE6bGlzdH0sIFxcJHsyOmZ1bmN0aW9ufSlcbnNuaXBwZXQgbGFcblx0bGFwbHkoXFwkezE6bGlzdH0sIFxcJHsyOmZ1bmN0aW9ufSlcbnNuaXBwZXQgbF9cblx0bF9wbHkoXFwkezE6bGlzdH0sIFxcJHsyOmZ1bmN0aW9ufSlcblxuc25pcHBldCBtZFxuXHRtZHBseShcXCR7MTptYXRyaXh9LCBcXCR7MjpmdW5jdGlvbn0pXG5zbmlwcGV0IG1sXG5cdG1scGx5KFxcJHsxOm1hdHJpeH0sIFxcJHsyOmZ1bmN0aW9ufSlcbnNuaXBwZXQgbWFcblx0bWFwbHkoXFwkezE6bWF0cml4fSwgXFwkezI6ZnVuY3Rpb259KVxuc25pcHBldCBtX1xuXHRtX3BseShcXCR7MTptYXRyaXh9LCBcXCR7MjpmdW5jdGlvbn0pXG5cbiMgcGxvdCBmdW5jdGlvbnNcbnNuaXBwZXQgcGxcblx0cGxvdChcXCR7MTp4fSwgXFwkezI6eX0pXG5zbmlwcGV0IGdncFxuXHRnZ3Bsb3QoXFwkezE6ZGF0YX0sIGFlcyhcXCR7MjphZXN0aGV0aWNzfSkpXG5zbmlwcGV0IGltZ1xuXHRcXCR7MTooanBlZyxibXAscG5nLHRpZmYpfShmaWxlbmFtZT1cIlxcJHsyOmZpbGVuYW1lfVwiLCB3aWR0aD1cXCR7M30sIGhlaWdodD1cXCR7NH0sIHVuaXQ9XCJcXCR7NX1cIilcblx0XFwkezY6cGxvdH1cblx0ZGV2Lm9mZigpXG5cbiMgc3RhdGlzdGljYWwgdGVzdCBmdW5jdGlvbnNcbnNuaXBwZXQgZmlzXG5cdGZpc2hlci50ZXN0KFxcJHsxOnh9LCBcXCR7Mjp5fSlcbnNuaXBwZXQgY2hpXG5cdGNoaXNxLnRlc3QoXFwkezE6eH0sIFxcJHsyOnl9KVxuc25pcHBldCB0dFxuXHR0LnRlc3QoXFwkezE6eH0sIFxcJHsyOnl9KVxuc25pcHBldCB3aWxcblx0d2lsY294LnRlc3QoXFwkezE6eH0sIFxcJHsyOnl9KVxuc25pcHBldCBjb3Jcblx0Y29yLnRlc3QoXFwkezE6eH0sIFxcJHsyOnl9KVxuc25pcHBldCBmdGVcblx0dmFyLnRlc3QoXFwkezE6eH0sIFxcJHsyOnl9KVxuc25pcHBldCBrdnQgXG5cdGt2LnRlc3QoXFwkezE6eH0sIFxcJHsyOnl9KVxuYDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==