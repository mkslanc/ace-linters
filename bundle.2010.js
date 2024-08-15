(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2010,8980],{

/***/ 72010:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(48980);
exports.scope = "clojure";


/***/ }),

/***/ 48980:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjIwMTAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsZ0RBQW1EO0FBQ25ELGFBQWE7Ozs7Ozs7O0FDSGI7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsV0FBVyxRQUFRLEdBQUc7QUFDdEIsTUFBTSxFQUFFO0FBQ1I7QUFDQSxTQUFTLEVBQUU7QUFDWDtBQUNBLGVBQWUsV0FBVyxJQUFJLGFBQWEsS0FBSyxnQkFBZ0IsSUFBSSxPQUFPO0FBQzNFLE1BQU0sRUFBRTtBQUNSO0FBQ0EsY0FBYyxRQUFRLElBQUksYUFBYSxLQUFLLGNBQWM7QUFDMUQ7QUFDQSxjQUFjLFFBQVEsSUFBSSxhQUFhLEtBQUssY0FBYztBQUMxRDtBQUNBLFVBQVUsUUFBUSxJQUFJLGFBQWEsTUFBTSxXQUFXO0FBQ3BELE1BQU0sRUFBRTtBQUNSO0FBQ0EsaUJBQWlCO0FBQ2pCLE1BQU0sRUFBRTtBQUNSO0FBQ0EsZUFBZSxRQUFRLElBQUksU0FBUztBQUNwQyxNQUFNO0FBQ04sTUFBTSxFQUFFO0FBQ1I7QUFDQSxhQUFhO0FBQ2IsZUFBZSxZQUFZO0FBQzNCLE1BQU0sRUFBRTtBQUNSO0FBQ0EsV0FBVyxHQUFHLEdBQUcsRUFBRTtBQUNuQjtBQUNBLGFBQWEsUUFBUSxJQUFJLFNBQVM7QUFDbEMsTUFBTTtBQUNOLE1BQU0sRUFBRTtBQUNSO0FBQ0EsWUFBWSxRQUFRLEdBQUcsT0FBTztBQUM5QixNQUFNLEVBQUU7QUFDUjtBQUNBLFNBQVMsV0FBVyxLQUFLLEVBQUU7QUFDM0I7QUFDQSxRQUFRO0FBQ1IsTUFBTTtBQUNOLE1BQU0sWUFBWTtBQUNsQjtBQUNBLGFBQWEsVUFBVSxHQUFHLFlBQVk7QUFDdEMsTUFBTSxhQUFhO0FBQ25CLE1BQU0sWUFBWTtBQUNsQjtBQUNBLGNBQWMsVUFBVTtBQUN4QixJQUFJLFVBQVUsT0FBTyxPQUFPLEdBQUc7QUFDL0I7QUFDQSxVQUFVLFFBQVEsR0FBRyxPQUFPO0FBQzVCLEtBQUssRUFBRTtBQUNQO0FBQ0EsYUFBYSxZQUFZLE9BQU87QUFDaEMsY0FBYyxFQUFFO0FBQ2hCO0FBQ0EsU0FBUyxRQUFRLEdBQUcsT0FBTztBQUMzQjtBQUNBLFdBQVcsU0FBUyxLQUFLLE9BQU87QUFDaEM7QUFDQSxLQUFLLFFBQVEsSUFBSSxRQUFRLEdBQUcsT0FBTztBQUNuQyxNQUFNLEVBQUU7QUFDUjtBQUNBLFFBQVE7QUFDUixNQUFNLEVBQUU7QUFDUjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsUUFBUTtBQUM1QixVQUFVLEVBQUU7QUFDWjtBQUNBLEtBQUssUUFBUSxJQUFJLFFBQVEsR0FBRyxPQUFPO0FBQ25DO0FBQ0EsOEJBQThCLEVBQUU7QUFDaEM7QUFDQSxlQUFlLGFBQWEsUUFBUSxFQUFFO0FBQ3RDO0FBQ0EsV0FBVyxhQUFhLFVBQVUsRUFBRTtBQUNwQztBQUNBLGFBQWEsRUFBRTtBQUNmO0FBQ0EsWUFBWSxlQUFlLEVBQUUsR0FBRyxHQUFHLEVBQUU7QUFDckM7QUFDQSxVQUFVLFFBQVEsR0FBRyxPQUFPO0FBQzVCO0FBQ0EsZUFBZSxVQUFVLEdBQUcsT0FBTztBQUNuQyxLQUFLLE9BQU87QUFDWiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL2Nsb2p1cmUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvY2xvanVyZS5zbmlwcGV0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5zbmlwcGV0VGV4dCA9IHJlcXVpcmUoXCIuL2Nsb2p1cmUuc25pcHBldHNcIik7XG5leHBvcnRzLnNjb3BlID0gXCJjbG9qdXJlXCI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGBzbmlwcGV0IGNvbW1cblx0KGNvbW1lbnRcblx0ICBcXCR7MX1cblx0ICApXG5zbmlwcGV0IGNvbmRwXG5cdChjb25kcCBcXCR7MTpwcmVkfSBcXCR7MjpleHByfVxuXHQgIFxcJHszfSlcbnNuaXBwZXQgZGVmXG5cdChkZWYgXFwkezF9KVxuc25pcHBldCBkZWZtXG5cdChkZWZtZXRob2QgXFwkezE6bXVsdGlmbn0gXCJcXCR7Mjpkb2Mtc3RyaW5nfVwiIFxcJHszOmRpc3BhdGNoLXZhbH0gW1xcJHs0OmFyZ3N9XVxuXHQgIFxcJHs1fSlcbnNuaXBwZXQgZGVmbW1cblx0KGRlZm11bHRpIFxcJHsxOm5hbWV9IFwiXFwkezI6ZG9jLXN0cmluZ31cIiBcXCR7MzpkaXNwYXRjaC1mbn0pXG5zbmlwcGV0IGRlZm1hXG5cdChkZWZtYWNybyBcXCR7MTpuYW1lfSBcIlxcJHsyOmRvYy1zdHJpbmd9XCIgXFwkezM6ZGlzcGF0Y2gtZm59KVxuc25pcHBldCBkZWZuXG5cdChkZWZuIFxcJHsxOm5hbWV9IFwiXFwkezI6ZG9jLXN0cmluZ31cIiBbXFwkezM6YXJnLWxpc3R9XVxuXHQgIFxcJHs0fSlcbnNuaXBwZXQgZGVmcFxuXHQoZGVmcHJvdG9jb2wgXFwkezE6bmFtZX1cblx0ICBcXCR7Mn0pXG5zbmlwcGV0IGRlZnJcblx0KGRlZnJlY29yZCBcXCR7MTpuYW1lfSBbXFwkezI6ZmllbGRzfV1cblx0ICBcXCR7Mzpwcm90b2NvbH1cblx0ICBcXCR7NH0pXG5zbmlwcGV0IGRlZnRcblx0KGRlZnRlc3QgXFwkezE6bmFtZX1cblx0ICAgIChpcyAoPSBcXCR7Mjphc3NlcnRpb259KSkpXG5cdCAgXFwkezN9KVxuc25pcHBldCBpc1xuXHQoaXMgKD0gXFwkezF9IFxcJHsyfSkpXG5zbmlwcGV0IGRlZnR5XG5cdChkZWZ0eXBlIFxcJHsxOk5hbWV9IFtcXCR7MjpmaWVsZHN9XVxuXHQgIFxcJHszOlByb3RvY29sfVxuXHQgIFxcJHs0fSlcbnNuaXBwZXQgZG9zZXFcblx0KGRvc2VxIFtcXCR7MTplbGVtfSBcXCR7Mjpjb2xsfV1cblx0ICBcXCR7M30pXG5zbmlwcGV0IGZuXG5cdChmbiBbXFwkezE6YXJnLWxpc3R9XSBcXCR7Mn0pXG5zbmlwcGV0IGlmXG5cdChpZiBcXCR7MTp0ZXN0LWV4cHJ9XG5cdCAgXFwkezI6dGhlbi1leHByfVxuXHQgIFxcJHszOmVsc2UtZXhwcn0pXG5zbmlwcGV0IGlmLWxldCBcblx0KGlmLWxldCBbXFwkezE6cmVzdWx0fSBcXCR7Mjp0ZXN0LWV4cHJ9XVxuXHRcdChcXCR7Mzp0aGVuLWV4cHJ9IFxcJDEpXG5cdFx0KFxcJHs0OmVsc2UtZXhwcn0pKVxuc25pcHBldCBpbXBcblx0KDppbXBvcnQgW1xcJHsxOnBhY2thZ2V9XSlcblx0JiB7OmtleXMgW1xcJHsxOmtleXN9XSA6b3Ige1xcJHsyOmRlZmF1bHRzfX19XG5zbmlwcGV0IGxldFxuXHQobGV0IFtcXCR7MTpuYW1lfSBcXCR7MjpleHByfV1cblx0XHRcXCR7M30pXG5zbmlwcGV0IGxldGZuXG5cdChsZXRmbiBbKFxcJHsxOm5hbWUpIFtcXCR7MjphcmdzfV1cblx0ICAgICAgICAgIFxcJHszfSldKVxuc25pcHBldCBtYXBcblx0KG1hcCBcXCR7MTpmdW5jfSBcXCR7Mjpjb2xsfSlcbnNuaXBwZXQgbWFwbFxuXHQobWFwICMoXFwkezE6bGFtYmRhfSkgXFwkezI6Y29sbH0pXG5zbmlwcGV0IG1ldFxuXHQoXFwkezE6bmFtZX0gW1xcJHsyOnRoaXN9IFxcJHszOmFyZ3N9XVxuXHQgIFxcJHs0fSlcbnNuaXBwZXQgbnNcblx0KG5zIFxcJHsxOm5hbWV9XG5cdCAgXFwkezJ9KVxuc25pcHBldCBkb3RpbWVzXG5cdChkb3RpbWVzIFtfIDEwXVxuXHQgICh0aW1lXG5cdCAgICAoZG90aW1lcyBbXyBcXCR7MTp0aW1lc31dXG5cdCAgICAgIFxcJHsyfSkpKVxuc25pcHBldCBwbWV0aG9kXG5cdChcXCR7MTpuYW1lfSBbXFwkezI6dGhpc30gXFwkezM6YXJnc31dKVxuc25pcHBldCByZWZlclxuXHQoOnJlZmVyLWNsb2p1cmUgOmV4Y2x1ZGUgW1xcJHsxfV0pXG5zbmlwcGV0IHJlcXVpcmVcblx0KDpyZXF1aXJlIFtcXCR7MTpuYW1lc3BhY2V9IDphcyBbXFwkezJ9XV0pXG5zbmlwcGV0IHVzZVxuXHQoOnVzZSBbXFwkezE6bmFtZXNwYWNlfSA6b25seSBbXFwkezJ9XV0pXG5zbmlwcGV0IHByaW50XG5cdChwcmludGxuIFxcJHsxfSlcbnNuaXBwZXQgcmVkdWNlXG5cdChyZWR1Y2UgXFwkezE6KGZuIFtwIG5dIFxcJHszfSl9IFxcJHsyfSlcbnNuaXBwZXQgd2hlblxuXHQod2hlbiBcXCR7MTp0ZXN0fSBcXCR7Mjpib2R5fSlcbnNuaXBwZXQgd2hlbi1sZXRcblx0KHdoZW4tbGV0IFtcXCR7MTpyZXN1bHR9IFxcJHsyOnRlc3R9XVxuXHRcdFxcJHszOmJvZHl9KVxuYDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==