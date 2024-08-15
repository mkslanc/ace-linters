(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9037],{

/***/ 79037:
/***/ ((module) => {

module.exports = `## STL Collections
# std::array
snippet array
	std::array<\${1:T}, \${2:N}> \${3};\${4}
# std::vector
snippet vector
	std::vector<\${1:T}> \${2};\${3}
# std::deque
snippet deque
	std::deque<\${1:T}> \${2};\${3}
# std::forward_list
snippet flist
	std::forward_list<\${1:T}> \${2};\${3}
# std::list
snippet list
	std::list<\${1:T}> \${2};\${3}
# std::set
snippet set
	std::set<\${1:T}> \${2};\${3}
# std::map
snippet map
	std::map<\${1:Key}, \${2:T}> \${3};\${4}
# std::multiset
snippet mset
	std::multiset<\${1:T}> \${2};\${3}
# std::multimap
snippet mmap
	std::multimap<\${1:Key}, \${2:T}> \${3};\${4}
# std::unordered_set
snippet uset
	std::unordered_set<\${1:T}> \${2};\${3}
# std::unordered_map
snippet umap
	std::unordered_map<\${1:Key}, \${2:T}> \${3};\${4}
# std::unordered_multiset
snippet umset
	std::unordered_multiset<\${1:T}> \${2};\${3}
# std::unordered_multimap
snippet ummap
	std::unordered_multimap<\${1:Key}, \${2:T}> \${3};\${4}
# std::stack
snippet stack
	std::stack<\${1:T}> \${2};\${3}
# std::queue
snippet queue
	std::queue<\${1:T}> \${2};\${3}
# std::priority_queue
snippet pqueue
	std::priority_queue<\${1:T}> \${2};\${3}
##
## Access Modifiers
# private
snippet pri
	private
# protected
snippet pro
	protected
# public
snippet pub
	public
# friend
snippet fr
	friend
# mutable
snippet mu
	mutable
## 
## Class
# class
snippet cl
	class \${1:\`Filename('\$1', 'name')\`} 
	{
	public:
		\$1(\${2});
		~\$1();

	private:
		\${3:/* data */}
	};
# member function implementation
snippet mfun
	\${4:void} \${1:\`Filename('\$1', 'ClassName')\`}::\${2:memberFunction}(\${3}) {
		\${5:/* code */}
	}
# namespace
snippet ns
	namespace \${1:\`Filename('', 'my')\`} {
		\${2}
	} /* namespace \$1 */
##
## Input/Output
# std::cout
snippet cout
	std::cout << \${1} << std::endl;\${2}
# std::cin
snippet cin
	std::cin >> \${1};\${2}
##
## Iteration
# for i 
snippet fori
	for (int \${2:i} = 0; \$2 < \${1:count}; \$2\${3:++}) {
		\${4:/* code */}
	}\${5}

# foreach
snippet fore
	for (\${1:auto} \${2:i} : \${3:container}) {
		\${4:/* code */}
	}\${5}
# iterator
snippet iter
	for (\${1:std::vector}<\${2:type}>::\${3:const_iterator} \${4:i} = \${5:container}.begin(); \$4 != \$5.end(); ++\$4) {
		\${6}
	}\${7}

# auto iterator
snippet itera
	for (auto \${1:i} = \$1.begin(); \$1 != \$1.end(); ++\$1) {
		\${2:std::cout << *\$1 << std::endl;}
	}\${3}
##
## Lambdas
# lamda (one line)
snippet ld
	[\${1}](\${2}){\${3:/* code */}}\${4}
# lambda (multi-line)
snippet lld
	[\${1}](\${2}){
		\${3:/* code */}
	}\${4}
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjkwMzcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLElBQUksS0FBSyxJQUFJLEtBQUssR0FBRyxHQUFHO0FBQ3ZDO0FBQ0E7QUFDQSxnQkFBZ0IsSUFBSSxLQUFLLEdBQUcsR0FBRztBQUMvQjtBQUNBO0FBQ0EsZUFBZSxJQUFJLEtBQUssR0FBRyxHQUFHO0FBQzlCO0FBQ0E7QUFDQSxzQkFBc0IsSUFBSSxLQUFLLEdBQUcsR0FBRztBQUNyQztBQUNBO0FBQ0EsY0FBYyxJQUFJLEtBQUssR0FBRyxHQUFHO0FBQzdCO0FBQ0E7QUFDQSxhQUFhLElBQUksS0FBSyxHQUFHLEdBQUc7QUFDNUI7QUFDQTtBQUNBLGFBQWEsTUFBTSxLQUFLLElBQUksS0FBSyxHQUFHLEdBQUc7QUFDdkM7QUFDQTtBQUNBLGtCQUFrQixJQUFJLEtBQUssR0FBRyxHQUFHO0FBQ2pDO0FBQ0E7QUFDQSxrQkFBa0IsTUFBTSxLQUFLLElBQUksS0FBSyxHQUFHLEdBQUc7QUFDNUM7QUFDQTtBQUNBLHVCQUF1QixJQUFJLEtBQUssR0FBRyxHQUFHO0FBQ3RDO0FBQ0E7QUFDQSx1QkFBdUIsTUFBTSxLQUFLLElBQUksS0FBSyxHQUFHLEdBQUc7QUFDakQ7QUFDQTtBQUNBLDRCQUE0QixJQUFJLEtBQUssR0FBRyxHQUFHO0FBQzNDO0FBQ0E7QUFDQSw0QkFBNEIsTUFBTSxLQUFLLElBQUksS0FBSyxHQUFHLEdBQUc7QUFDdEQ7QUFDQTtBQUNBLGVBQWUsSUFBSSxLQUFLLEdBQUcsR0FBRztBQUM5QjtBQUNBO0FBQ0EsZUFBZSxJQUFJLEtBQUssR0FBRyxHQUFHO0FBQzlCO0FBQ0E7QUFDQSx3QkFBd0IsSUFBSSxLQUFLLEdBQUcsR0FBRztBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBLFNBQVMsRUFBRTtBQUNYOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLElBQUksUUFBUSxHQUFHLG1DQUFtQyxLQUFLLGlCQUFpQixJQUFJLEVBQUU7QUFDOUUsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLEdBQUcsYUFBYSxHQUFHO0FBQ3BDO0FBQ0E7QUFDQSxnQkFBZ0IsR0FBRyxHQUFHO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxLQUFLLEtBQUssU0FBUyxVQUFVLE1BQU0sS0FBSztBQUNyRCxLQUFLO0FBQ0wsRUFBRSxHQUFHOztBQUVMO0FBQ0E7QUFDQSxTQUFTLFFBQVEsR0FBRyxLQUFLLEtBQUssWUFBWTtBQUMxQyxLQUFLO0FBQ0wsRUFBRSxHQUFHO0FBQ0w7QUFDQTtBQUNBLFNBQVMsY0FBYyxJQUFJLE9BQU8sTUFBTSxrQkFBa0IsR0FBRyxLQUFLLEtBQUssWUFBWSxVQUFVLGtCQUFrQjtBQUMvRyxLQUFLO0FBQ0wsRUFBRSxHQUFHOztBQUVMO0FBQ0E7QUFDQSxjQUFjLEtBQUssZUFBZSxrQkFBa0I7QUFDcEQsS0FBSztBQUNMLEVBQUUsR0FBRztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLEdBQUcsY0FBYyxHQUFHO0FBQ3BDO0FBQ0E7QUFDQSxLQUFLLEVBQUUsS0FBSyxFQUFFO0FBQ2QsS0FBSztBQUNMLEVBQUUsR0FBRztBQUNMIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvY19jcHAuc25pcHBldHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBgIyMgU1RMIENvbGxlY3Rpb25zXG4jIHN0ZDo6YXJyYXlcbnNuaXBwZXQgYXJyYXlcblx0c3RkOjphcnJheTxcXCR7MTpUfSwgXFwkezI6Tn0+IFxcJHszfTtcXCR7NH1cbiMgc3RkOjp2ZWN0b3JcbnNuaXBwZXQgdmVjdG9yXG5cdHN0ZDo6dmVjdG9yPFxcJHsxOlR9PiBcXCR7Mn07XFwkezN9XG4jIHN0ZDo6ZGVxdWVcbnNuaXBwZXQgZGVxdWVcblx0c3RkOjpkZXF1ZTxcXCR7MTpUfT4gXFwkezJ9O1xcJHszfVxuIyBzdGQ6OmZvcndhcmRfbGlzdFxuc25pcHBldCBmbGlzdFxuXHRzdGQ6OmZvcndhcmRfbGlzdDxcXCR7MTpUfT4gXFwkezJ9O1xcJHszfVxuIyBzdGQ6Omxpc3RcbnNuaXBwZXQgbGlzdFxuXHRzdGQ6Omxpc3Q8XFwkezE6VH0+IFxcJHsyfTtcXCR7M31cbiMgc3RkOjpzZXRcbnNuaXBwZXQgc2V0XG5cdHN0ZDo6c2V0PFxcJHsxOlR9PiBcXCR7Mn07XFwkezN9XG4jIHN0ZDo6bWFwXG5zbmlwcGV0IG1hcFxuXHRzdGQ6Om1hcDxcXCR7MTpLZXl9LCBcXCR7MjpUfT4gXFwkezN9O1xcJHs0fVxuIyBzdGQ6Om11bHRpc2V0XG5zbmlwcGV0IG1zZXRcblx0c3RkOjptdWx0aXNldDxcXCR7MTpUfT4gXFwkezJ9O1xcJHszfVxuIyBzdGQ6Om11bHRpbWFwXG5zbmlwcGV0IG1tYXBcblx0c3RkOjptdWx0aW1hcDxcXCR7MTpLZXl9LCBcXCR7MjpUfT4gXFwkezN9O1xcJHs0fVxuIyBzdGQ6OnVub3JkZXJlZF9zZXRcbnNuaXBwZXQgdXNldFxuXHRzdGQ6OnVub3JkZXJlZF9zZXQ8XFwkezE6VH0+IFxcJHsyfTtcXCR7M31cbiMgc3RkOjp1bm9yZGVyZWRfbWFwXG5zbmlwcGV0IHVtYXBcblx0c3RkOjp1bm9yZGVyZWRfbWFwPFxcJHsxOktleX0sIFxcJHsyOlR9PiBcXCR7M307XFwkezR9XG4jIHN0ZDo6dW5vcmRlcmVkX211bHRpc2V0XG5zbmlwcGV0IHVtc2V0XG5cdHN0ZDo6dW5vcmRlcmVkX211bHRpc2V0PFxcJHsxOlR9PiBcXCR7Mn07XFwkezN9XG4jIHN0ZDo6dW5vcmRlcmVkX211bHRpbWFwXG5zbmlwcGV0IHVtbWFwXG5cdHN0ZDo6dW5vcmRlcmVkX211bHRpbWFwPFxcJHsxOktleX0sIFxcJHsyOlR9PiBcXCR7M307XFwkezR9XG4jIHN0ZDo6c3RhY2tcbnNuaXBwZXQgc3RhY2tcblx0c3RkOjpzdGFjazxcXCR7MTpUfT4gXFwkezJ9O1xcJHszfVxuIyBzdGQ6OnF1ZXVlXG5zbmlwcGV0IHF1ZXVlXG5cdHN0ZDo6cXVldWU8XFwkezE6VH0+IFxcJHsyfTtcXCR7M31cbiMgc3RkOjpwcmlvcml0eV9xdWV1ZVxuc25pcHBldCBwcXVldWVcblx0c3RkOjpwcmlvcml0eV9xdWV1ZTxcXCR7MTpUfT4gXFwkezJ9O1xcJHszfVxuIyNcbiMjIEFjY2VzcyBNb2RpZmllcnNcbiMgcHJpdmF0ZVxuc25pcHBldCBwcmlcblx0cHJpdmF0ZVxuIyBwcm90ZWN0ZWRcbnNuaXBwZXQgcHJvXG5cdHByb3RlY3RlZFxuIyBwdWJsaWNcbnNuaXBwZXQgcHViXG5cdHB1YmxpY1xuIyBmcmllbmRcbnNuaXBwZXQgZnJcblx0ZnJpZW5kXG4jIG11dGFibGVcbnNuaXBwZXQgbXVcblx0bXV0YWJsZVxuIyMgXG4jIyBDbGFzc1xuIyBjbGFzc1xuc25pcHBldCBjbFxuXHRjbGFzcyBcXCR7MTpcXGBGaWxlbmFtZSgnXFwkMScsICduYW1lJylcXGB9IFxuXHR7XG5cdHB1YmxpYzpcblx0XHRcXCQxKFxcJHsyfSk7XG5cdFx0flxcJDEoKTtcblxuXHRwcml2YXRlOlxuXHRcdFxcJHszOi8qIGRhdGEgKi99XG5cdH07XG4jIG1lbWJlciBmdW5jdGlvbiBpbXBsZW1lbnRhdGlvblxuc25pcHBldCBtZnVuXG5cdFxcJHs0OnZvaWR9IFxcJHsxOlxcYEZpbGVuYW1lKCdcXCQxJywgJ0NsYXNzTmFtZScpXFxgfTo6XFwkezI6bWVtYmVyRnVuY3Rpb259KFxcJHszfSkge1xuXHRcdFxcJHs1Oi8qIGNvZGUgKi99XG5cdH1cbiMgbmFtZXNwYWNlXG5zbmlwcGV0IG5zXG5cdG5hbWVzcGFjZSBcXCR7MTpcXGBGaWxlbmFtZSgnJywgJ215JylcXGB9IHtcblx0XHRcXCR7Mn1cblx0fSAvKiBuYW1lc3BhY2UgXFwkMSAqL1xuIyNcbiMjIElucHV0L091dHB1dFxuIyBzdGQ6OmNvdXRcbnNuaXBwZXQgY291dFxuXHRzdGQ6OmNvdXQgPDwgXFwkezF9IDw8IHN0ZDo6ZW5kbDtcXCR7Mn1cbiMgc3RkOjpjaW5cbnNuaXBwZXQgY2luXG5cdHN0ZDo6Y2luID4+IFxcJHsxfTtcXCR7Mn1cbiMjXG4jIyBJdGVyYXRpb25cbiMgZm9yIGkgXG5zbmlwcGV0IGZvcmlcblx0Zm9yIChpbnQgXFwkezI6aX0gPSAwOyBcXCQyIDwgXFwkezE6Y291bnR9OyBcXCQyXFwkezM6Kyt9KSB7XG5cdFx0XFwkezQ6LyogY29kZSAqL31cblx0fVxcJHs1fVxuXG4jIGZvcmVhY2hcbnNuaXBwZXQgZm9yZVxuXHRmb3IgKFxcJHsxOmF1dG99IFxcJHsyOml9IDogXFwkezM6Y29udGFpbmVyfSkge1xuXHRcdFxcJHs0Oi8qIGNvZGUgKi99XG5cdH1cXCR7NX1cbiMgaXRlcmF0b3JcbnNuaXBwZXQgaXRlclxuXHRmb3IgKFxcJHsxOnN0ZDo6dmVjdG9yfTxcXCR7Mjp0eXBlfT46OlxcJHszOmNvbnN0X2l0ZXJhdG9yfSBcXCR7NDppfSA9IFxcJHs1OmNvbnRhaW5lcn0uYmVnaW4oKTsgXFwkNCAhPSBcXCQ1LmVuZCgpOyArK1xcJDQpIHtcblx0XHRcXCR7Nn1cblx0fVxcJHs3fVxuXG4jIGF1dG8gaXRlcmF0b3JcbnNuaXBwZXQgaXRlcmFcblx0Zm9yIChhdXRvIFxcJHsxOml9ID0gXFwkMS5iZWdpbigpOyBcXCQxICE9IFxcJDEuZW5kKCk7ICsrXFwkMSkge1xuXHRcdFxcJHsyOnN0ZDo6Y291dCA8PCAqXFwkMSA8PCBzdGQ6OmVuZGw7fVxuXHR9XFwkezN9XG4jI1xuIyMgTGFtYmRhc1xuIyBsYW1kYSAob25lIGxpbmUpXG5zbmlwcGV0IGxkXG5cdFtcXCR7MX1dKFxcJHsyfSl7XFwkezM6LyogY29kZSAqL319XFwkezR9XG4jIGxhbWJkYSAobXVsdGktbGluZSlcbnNuaXBwZXQgbGxkXG5cdFtcXCR7MX1dKFxcJHsyfSl7XG5cdFx0XFwkezM6LyogY29kZSAqL31cblx0fVxcJHs0fVxuYDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==