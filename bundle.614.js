(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[614],{

/***/ 90614:
/***/ ((module) => {

module.exports = `snippet comm
	(comment
	  \${1}
	  )
snippet condp
	(condp \${1:pred} \${2:expr}
	  \${3})
snippet def
	(def \${1})
snippet defm
	(defmethod \${1:multifn} "\${2:doc-string}" \${3:dispatch-val} [\${4:args}]
	  \${5})
snippet defmm
	(defmulti \${1:name} "\${2:doc-string}" \${3:dispatch-fn})
snippet defma
	(defmacro \${1:name} "\${2:doc-string}" \${3:dispatch-fn})
snippet defn
	(defn \${1:name} "\${2:doc-string}" [\${3:arg-list}]
	  \${4})
snippet defp
	(defprotocol \${1:name}
	  \${2})
snippet defr
	(defrecord \${1:name} [\${2:fields}]
	  \${3:protocol}
	  \${4})
snippet deft
	(deftest \${1:name}
	    (is (= \${2:assertion})))
	  \${3})
snippet is
	(is (= \${1} \${2}))
snippet defty
	(deftype \${1:Name} [\${2:fields}]
	  \${3:Protocol}
	  \${4})
snippet doseq
	(doseq [\${1:elem} \${2:coll}]
	  \${3})
snippet fn
	(fn [\${1:arg-list}] \${2})
snippet if
	(if \${1:test-expr}
	  \${2:then-expr}
	  \${3:else-expr})
snippet if-let 
	(if-let [\${1:result} \${2:test-expr}]
		(\${3:then-expr} \$1)
		(\${4:else-expr}))
snippet imp
	(:import [\${1:package}])
	& {:keys [\${1:keys}] :or {\${2:defaults}}}
snippet let
	(let [\${1:name} \${2:expr}]
		\${3})
snippet letfn
	(letfn [(\${1:name) [\${2:args}]
	          \${3})])
snippet map
	(map \${1:func} \${2:coll})
snippet mapl
	(map #(\${1:lambda}) \${2:coll})
snippet met
	(\${1:name} [\${2:this} \${3:args}]
	  \${4})
snippet ns
	(ns \${1:name}
	  \${2})
snippet dotimes
	(dotimes [_ 10]
	  (time
	    (dotimes [_ \${1:times}]
	      \${2})))
snippet pmethod
	(\${1:name} [\${2:this} \${3:args}])
snippet refer
	(:refer-clojure :exclude [\${1}])
snippet require
	(:require [\${1:namespace} :as [\${2}]])
snippet use
	(:use [\${1:namespace} :only [\${2}]])
snippet print
	(println \${1})
snippet reduce
	(reduce \${1:(fn [p n] \${3})} \${2})
snippet when
	(when \${1:test} \${2:body})
snippet when-let
	(when-let [\${1:result} \${2:test}]
		\${3:body})
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjYxNC5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLFdBQVcsUUFBUSxHQUFHO0FBQ3RCLE1BQU0sRUFBRTtBQUNSO0FBQ0EsU0FBUyxFQUFFO0FBQ1g7QUFDQSxlQUFlLFdBQVcsSUFBSSxhQUFhLEtBQUssZ0JBQWdCLElBQUksT0FBTztBQUMzRSxNQUFNLEVBQUU7QUFDUjtBQUNBLGNBQWMsUUFBUSxJQUFJLGFBQWEsS0FBSyxjQUFjO0FBQzFEO0FBQ0EsY0FBYyxRQUFRLElBQUksYUFBYSxLQUFLLGNBQWM7QUFDMUQ7QUFDQSxVQUFVLFFBQVEsSUFBSSxhQUFhLE1BQU0sV0FBVztBQUNwRCxNQUFNLEVBQUU7QUFDUjtBQUNBLGlCQUFpQjtBQUNqQixNQUFNLEVBQUU7QUFDUjtBQUNBLGVBQWUsUUFBUSxJQUFJLFNBQVM7QUFDcEMsTUFBTTtBQUNOLE1BQU0sRUFBRTtBQUNSO0FBQ0EsYUFBYTtBQUNiLGVBQWUsWUFBWTtBQUMzQixNQUFNLEVBQUU7QUFDUjtBQUNBLFdBQVcsR0FBRyxHQUFHLEVBQUU7QUFDbkI7QUFDQSxhQUFhLFFBQVEsSUFBSSxTQUFTO0FBQ2xDLE1BQU07QUFDTixNQUFNLEVBQUU7QUFDUjtBQUNBLFlBQVksUUFBUSxHQUFHLE9BQU87QUFDOUIsTUFBTSxFQUFFO0FBQ1I7QUFDQSxTQUFTLFdBQVcsS0FBSyxFQUFFO0FBQzNCO0FBQ0EsUUFBUTtBQUNSLE1BQU07QUFDTixNQUFNLFlBQVk7QUFDbEI7QUFDQSxhQUFhLFVBQVUsR0FBRyxZQUFZO0FBQ3RDLE1BQU0sYUFBYTtBQUNuQixNQUFNLFlBQVk7QUFDbEI7QUFDQSxjQUFjLFVBQVU7QUFDeEIsSUFBSSxVQUFVLE9BQU8sT0FBTyxHQUFHO0FBQy9CO0FBQ0EsVUFBVSxRQUFRLEdBQUcsT0FBTztBQUM1QixLQUFLLEVBQUU7QUFDUDtBQUNBLGFBQWEsWUFBWSxPQUFPO0FBQ2hDLGNBQWMsRUFBRTtBQUNoQjtBQUNBLFNBQVMsUUFBUSxHQUFHLE9BQU87QUFDM0I7QUFDQSxXQUFXLFNBQVMsS0FBSyxPQUFPO0FBQ2hDO0FBQ0EsS0FBSyxRQUFRLElBQUksUUFBUSxHQUFHLE9BQU87QUFDbkMsTUFBTSxFQUFFO0FBQ1I7QUFDQSxRQUFRO0FBQ1IsTUFBTSxFQUFFO0FBQ1I7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFFBQVE7QUFDNUIsVUFBVSxFQUFFO0FBQ1o7QUFDQSxLQUFLLFFBQVEsSUFBSSxRQUFRLEdBQUcsT0FBTztBQUNuQztBQUNBLDhCQUE4QixFQUFFO0FBQ2hDO0FBQ0EsZUFBZSxhQUFhLFFBQVEsRUFBRTtBQUN0QztBQUNBLFdBQVcsYUFBYSxVQUFVLEVBQUU7QUFDcEM7QUFDQSxhQUFhLEVBQUU7QUFDZjtBQUNBLFlBQVksZUFBZSxFQUFFLEdBQUcsR0FBRyxFQUFFO0FBQ3JDO0FBQ0EsVUFBVSxRQUFRLEdBQUcsT0FBTztBQUM1QjtBQUNBLGVBQWUsVUFBVSxHQUFHLE9BQU87QUFDbkMsS0FBSyxPQUFPO0FBQ1oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy9jbG9qdXJlLnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gYHNuaXBwZXQgY29tbVxuXHQoY29tbWVudFxuXHQgIFxcJHsxfVxuXHQgIClcbnNuaXBwZXQgY29uZHBcblx0KGNvbmRwIFxcJHsxOnByZWR9IFxcJHsyOmV4cHJ9XG5cdCAgXFwkezN9KVxuc25pcHBldCBkZWZcblx0KGRlZiBcXCR7MX0pXG5zbmlwcGV0IGRlZm1cblx0KGRlZm1ldGhvZCBcXCR7MTptdWx0aWZufSBcIlxcJHsyOmRvYy1zdHJpbmd9XCIgXFwkezM6ZGlzcGF0Y2gtdmFsfSBbXFwkezQ6YXJnc31dXG5cdCAgXFwkezV9KVxuc25pcHBldCBkZWZtbVxuXHQoZGVmbXVsdGkgXFwkezE6bmFtZX0gXCJcXCR7Mjpkb2Mtc3RyaW5nfVwiIFxcJHszOmRpc3BhdGNoLWZufSlcbnNuaXBwZXQgZGVmbWFcblx0KGRlZm1hY3JvIFxcJHsxOm5hbWV9IFwiXFwkezI6ZG9jLXN0cmluZ31cIiBcXCR7MzpkaXNwYXRjaC1mbn0pXG5zbmlwcGV0IGRlZm5cblx0KGRlZm4gXFwkezE6bmFtZX0gXCJcXCR7Mjpkb2Mtc3RyaW5nfVwiIFtcXCR7MzphcmctbGlzdH1dXG5cdCAgXFwkezR9KVxuc25pcHBldCBkZWZwXG5cdChkZWZwcm90b2NvbCBcXCR7MTpuYW1lfVxuXHQgIFxcJHsyfSlcbnNuaXBwZXQgZGVmclxuXHQoZGVmcmVjb3JkIFxcJHsxOm5hbWV9IFtcXCR7MjpmaWVsZHN9XVxuXHQgIFxcJHszOnByb3RvY29sfVxuXHQgIFxcJHs0fSlcbnNuaXBwZXQgZGVmdFxuXHQoZGVmdGVzdCBcXCR7MTpuYW1lfVxuXHQgICAgKGlzICg9IFxcJHsyOmFzc2VydGlvbn0pKSlcblx0ICBcXCR7M30pXG5zbmlwcGV0IGlzXG5cdChpcyAoPSBcXCR7MX0gXFwkezJ9KSlcbnNuaXBwZXQgZGVmdHlcblx0KGRlZnR5cGUgXFwkezE6TmFtZX0gW1xcJHsyOmZpZWxkc31dXG5cdCAgXFwkezM6UHJvdG9jb2x9XG5cdCAgXFwkezR9KVxuc25pcHBldCBkb3NlcVxuXHQoZG9zZXEgW1xcJHsxOmVsZW19IFxcJHsyOmNvbGx9XVxuXHQgIFxcJHszfSlcbnNuaXBwZXQgZm5cblx0KGZuIFtcXCR7MTphcmctbGlzdH1dIFxcJHsyfSlcbnNuaXBwZXQgaWZcblx0KGlmIFxcJHsxOnRlc3QtZXhwcn1cblx0ICBcXCR7Mjp0aGVuLWV4cHJ9XG5cdCAgXFwkezM6ZWxzZS1leHByfSlcbnNuaXBwZXQgaWYtbGV0IFxuXHQoaWYtbGV0IFtcXCR7MTpyZXN1bHR9IFxcJHsyOnRlc3QtZXhwcn1dXG5cdFx0KFxcJHszOnRoZW4tZXhwcn0gXFwkMSlcblx0XHQoXFwkezQ6ZWxzZS1leHByfSkpXG5zbmlwcGV0IGltcFxuXHQoOmltcG9ydCBbXFwkezE6cGFja2FnZX1dKVxuXHQmIHs6a2V5cyBbXFwkezE6a2V5c31dIDpvciB7XFwkezI6ZGVmYXVsdHN9fX1cbnNuaXBwZXQgbGV0XG5cdChsZXQgW1xcJHsxOm5hbWV9IFxcJHsyOmV4cHJ9XVxuXHRcdFxcJHszfSlcbnNuaXBwZXQgbGV0Zm5cblx0KGxldGZuIFsoXFwkezE6bmFtZSkgW1xcJHsyOmFyZ3N9XVxuXHQgICAgICAgICAgXFwkezN9KV0pXG5zbmlwcGV0IG1hcFxuXHQobWFwIFxcJHsxOmZ1bmN9IFxcJHsyOmNvbGx9KVxuc25pcHBldCBtYXBsXG5cdChtYXAgIyhcXCR7MTpsYW1iZGF9KSBcXCR7Mjpjb2xsfSlcbnNuaXBwZXQgbWV0XG5cdChcXCR7MTpuYW1lfSBbXFwkezI6dGhpc30gXFwkezM6YXJnc31dXG5cdCAgXFwkezR9KVxuc25pcHBldCBuc1xuXHQobnMgXFwkezE6bmFtZX1cblx0ICBcXCR7Mn0pXG5zbmlwcGV0IGRvdGltZXNcblx0KGRvdGltZXMgW18gMTBdXG5cdCAgKHRpbWVcblx0ICAgIChkb3RpbWVzIFtfIFxcJHsxOnRpbWVzfV1cblx0ICAgICAgXFwkezJ9KSkpXG5zbmlwcGV0IHBtZXRob2Rcblx0KFxcJHsxOm5hbWV9IFtcXCR7Mjp0aGlzfSBcXCR7MzphcmdzfV0pXG5zbmlwcGV0IHJlZmVyXG5cdCg6cmVmZXItY2xvanVyZSA6ZXhjbHVkZSBbXFwkezF9XSlcbnNuaXBwZXQgcmVxdWlyZVxuXHQoOnJlcXVpcmUgW1xcJHsxOm5hbWVzcGFjZX0gOmFzIFtcXCR7Mn1dXSlcbnNuaXBwZXQgdXNlXG5cdCg6dXNlIFtcXCR7MTpuYW1lc3BhY2V9IDpvbmx5IFtcXCR7Mn1dXSlcbnNuaXBwZXQgcHJpbnRcblx0KHByaW50bG4gXFwkezF9KVxuc25pcHBldCByZWR1Y2Vcblx0KHJlZHVjZSBcXCR7MTooZm4gW3Agbl0gXFwkezN9KX0gXFwkezJ9KVxuc25pcHBldCB3aGVuXG5cdCh3aGVuIFxcJHsxOnRlc3R9IFxcJHsyOmJvZHl9KVxuc25pcHBldCB3aGVuLWxldFxuXHQod2hlbi1sZXQgW1xcJHsxOnJlc3VsdH0gXFwkezI6dGVzdH1dXG5cdFx0XFwkezM6Ym9keX0pXG5gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9