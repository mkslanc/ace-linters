(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8371,4787],{

/***/ 58371:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(44787);
exports.scope = "jsp";


/***/ }),

/***/ 44787:
/***/ ((module) => {

module.exports = `snippet @page
	<%@page contentType="text/html" pageEncoding="UTF-8"%>
snippet jstl
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
	<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
snippet jstl:c
	<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
snippet jstl:fn
	<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
snippet cpath
	\${pageContext.request.contextPath}
snippet cout
	<c:out value="\${1}" default="\${2}" />
snippet cset
	<c:set var="\${1}" value="\${2}" />
snippet cremove
	<c:remove var="\${1}" scope="\${2:page}" />
snippet ccatch
	<c:catch var="\${1}" />
snippet cif
	<c:if test="\${\${1}}">
		\${2}
	</c:if>
snippet cchoose
	<c:choose>
		\${1}
	</c:choose>
snippet cwhen
	<c:when test="\${\${1}}">
		\${2}
	</c:when>
snippet cother
	<c:otherwise>
		\${1}
	</c:otherwise>
snippet cfore
	<c:forEach items="\${\${1}}" var="\${2}" varStatus="\${3}">
		\${4:<c:out value="\$2" />}
	</c:forEach>
snippet cfort
	<c:set var="\${1}">\${2:item1,item2,item3}</c:set>
	<c:forTokens var="\${3}" items="\${\$1}" delims="\${4:,}">
		\${5:<c:out value="\$3" />}
	</c:forTokens>
snippet cparam
	<c:param name="\${1}" value="\${2}" />
snippet cparam+
	<c:param name="\${1}" value="\${2}" />
	cparam+\${3}
snippet cimport
	<c:import url="\${1}" />
snippet cimport+
	<c:import url="\${1}">
		<c:param name="\${2}" value="\${3}" />
		cparam+\${4}
	</c:import>
snippet curl
	<c:url value="\${1}" var="\${2}" />
	<a href="\${\$2}">\${3}</a>
snippet curl+
	<c:url value="\${1}" var="\${2}">
		<c:param name="\${4}" value="\${5}" />
		cparam+\${6}
	</c:url>
	<a href="\${\$2}">\${3}</a>
snippet credirect
	<c:redirect url="\${1}" />
snippet contains
	\${fn:contains(\${1:string}, \${2:substr})}
snippet contains:i
	\${fn:containsIgnoreCase(\${1:string}, \${2:substr})}
snippet endswith
	\${fn:endsWith(\${1:string}, \${2:suffix})}
snippet escape
	\${fn:escapeXml(\${1:string})}
snippet indexof
	\${fn:indexOf(\${1:string}, \${2:substr})}
snippet join
	\${fn:join(\${1:collection}, \${2:delims})}
snippet length
	\${fn:length(\${1:collection_or_string})}
snippet replace
	\${fn:replace(\${1:string}, \${2:substr}, \${3:replace})}
snippet split
	\${fn:split(\${1:string}, \${2:delims})}
snippet startswith
	\${fn:startsWith(\${1:string}, \${2:prefix})}
snippet substr
	\${fn:substring(\${1:string}, \${2:begin}, \${3:end})}
snippet substr:a
	\${fn:substringAfter(\${1:string}, \${2:substr})}
snippet substr:b
	\${fn:substringBefore(\${1:string}, \${2:substr})}
snippet lc
	\${fn:toLowerCase(\${1:string})}
snippet uc
	\${fn:toUpperCase(\${1:string})}
snippet trim
	\${fn:trim(\${1:string})}
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjgzNzEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsZ0RBQStDO0FBQy9DLGFBQWE7Ozs7Ozs7O0FDSGI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxrQkFBa0IsRUFBRSxjQUFjLEVBQUU7QUFDcEM7QUFDQSxnQkFBZ0IsRUFBRSxZQUFZLEVBQUU7QUFDaEM7QUFDQSxtQkFBbUIsRUFBRSxZQUFZLE9BQU87QUFDeEM7QUFDQSxrQkFBa0IsRUFBRTtBQUNwQjtBQUNBLGdCQUFnQixHQUFHLEdBQUc7QUFDdEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esa0JBQWtCLEdBQUcsR0FBRztBQUN4QixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxzQkFBc0IsR0FBRyxHQUFHLFVBQVUsRUFBRSxnQkFBZ0IsRUFBRTtBQUMxRCxLQUFLO0FBQ0w7QUFDQTtBQUNBLGdCQUFnQixFQUFFLEtBQUssb0JBQW9CO0FBQzNDLHNCQUFzQixFQUFFLFlBQVksSUFBSSxhQUFhLElBQUk7QUFDekQsS0FBSztBQUNMO0FBQ0E7QUFDQSxtQkFBbUIsRUFBRSxZQUFZLEVBQUU7QUFDbkM7QUFDQSxtQkFBbUIsRUFBRSxZQUFZLEVBQUU7QUFDbkMsV0FBVztBQUNYO0FBQ0EsbUJBQW1CLEVBQUU7QUFDckI7QUFDQSxtQkFBbUIsRUFBRTtBQUNyQixvQkFBb0IsRUFBRSxZQUFZLEVBQUU7QUFDcEMsWUFBWTtBQUNaO0FBQ0E7QUFDQSxrQkFBa0IsRUFBRSxVQUFVLEVBQUU7QUFDaEMsYUFBYSxJQUFJLEtBQUssRUFBRTtBQUN4QjtBQUNBLGtCQUFrQixFQUFFLFVBQVUsRUFBRTtBQUNoQyxvQkFBb0IsRUFBRSxZQUFZLEVBQUU7QUFDcEMsWUFBWTtBQUNaO0FBQ0EsYUFBYSxJQUFJLEtBQUssRUFBRTtBQUN4QjtBQUNBLHFCQUFxQixFQUFFO0FBQ3ZCO0FBQ0EsSUFBSSxlQUFlLFNBQVMsS0FBSyxTQUFTO0FBQzFDO0FBQ0EsSUFBSSx5QkFBeUIsU0FBUyxLQUFLLFNBQVM7QUFDcEQ7QUFDQSxJQUFJLGVBQWUsU0FBUyxLQUFLLFNBQVM7QUFDMUM7QUFDQSxJQUFJLGdCQUFnQixTQUFTO0FBQzdCO0FBQ0EsSUFBSSxjQUFjLFNBQVMsS0FBSyxTQUFTO0FBQ3pDO0FBQ0EsSUFBSSxXQUFXLGFBQWEsS0FBSyxTQUFTO0FBQzFDO0FBQ0EsSUFBSSxhQUFhLHVCQUF1QjtBQUN4QztBQUNBLElBQUksY0FBYyxTQUFTLEtBQUssU0FBUyxLQUFLLFVBQVU7QUFDeEQ7QUFDQSxJQUFJLFlBQVksU0FBUyxLQUFLLFNBQVM7QUFDdkM7QUFDQSxJQUFJLGlCQUFpQixTQUFTLEtBQUssU0FBUztBQUM1QztBQUNBLElBQUksZ0JBQWdCLFNBQVMsS0FBSyxRQUFRLEtBQUssTUFBTTtBQUNyRDtBQUNBLElBQUkscUJBQXFCLFNBQVMsS0FBSyxTQUFTO0FBQ2hEO0FBQ0EsSUFBSSxzQkFBc0IsU0FBUyxLQUFLLFNBQVM7QUFDakQ7QUFDQSxJQUFJLGtCQUFrQixTQUFTO0FBQy9CO0FBQ0EsSUFBSSxrQkFBa0IsU0FBUztBQUMvQjtBQUNBLElBQUksV0FBVyxTQUFTO0FBQ3hCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvanNwLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL2pzcC5zbmlwcGV0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5zbmlwcGV0VGV4dCA9IHJlcXVpcmUoXCIuL2pzcC5zbmlwcGV0c1wiKTtcbmV4cG9ydHMuc2NvcGUgPSBcImpzcFwiO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBgc25pcHBldCBAcGFnZVxuXHQ8JUBwYWdlIGNvbnRlbnRUeXBlPVwidGV4dC9odG1sXCIgcGFnZUVuY29kaW5nPVwiVVRGLThcIiU+XG5zbmlwcGV0IGpzdGxcblx0PCVAIHRhZ2xpYiB1cmk9XCJodHRwOi8vamF2YS5zdW4uY29tL2pzcC9qc3RsL2NvcmVcIiBwcmVmaXg9XCJjXCIgJT5cblx0PCVAIHRhZ2xpYiB1cmk9XCJodHRwOi8vamF2YS5zdW4uY29tL2pzcC9qc3RsL2Z1bmN0aW9uc1wiIHByZWZpeD1cImZuXCIgJT5cbnNuaXBwZXQganN0bDpjXG5cdDwlQCB0YWdsaWIgdXJpPVwiaHR0cDovL2phdmEuc3VuLmNvbS9qc3AvanN0bC9jb3JlXCIgcHJlZml4PVwiY1wiICU+XG5zbmlwcGV0IGpzdGw6Zm5cblx0PCVAIHRhZ2xpYiB1cmk9XCJodHRwOi8vamF2YS5zdW4uY29tL2pzcC9qc3RsL2Z1bmN0aW9uc1wiIHByZWZpeD1cImZuXCIgJT5cbnNuaXBwZXQgY3BhdGhcblx0XFwke3BhZ2VDb250ZXh0LnJlcXVlc3QuY29udGV4dFBhdGh9XG5zbmlwcGV0IGNvdXRcblx0PGM6b3V0IHZhbHVlPVwiXFwkezF9XCIgZGVmYXVsdD1cIlxcJHsyfVwiIC8+XG5zbmlwcGV0IGNzZXRcblx0PGM6c2V0IHZhcj1cIlxcJHsxfVwiIHZhbHVlPVwiXFwkezJ9XCIgLz5cbnNuaXBwZXQgY3JlbW92ZVxuXHQ8YzpyZW1vdmUgdmFyPVwiXFwkezF9XCIgc2NvcGU9XCJcXCR7MjpwYWdlfVwiIC8+XG5zbmlwcGV0IGNjYXRjaFxuXHQ8YzpjYXRjaCB2YXI9XCJcXCR7MX1cIiAvPlxuc25pcHBldCBjaWZcblx0PGM6aWYgdGVzdD1cIlxcJHtcXCR7MX19XCI+XG5cdFx0XFwkezJ9XG5cdDwvYzppZj5cbnNuaXBwZXQgY2Nob29zZVxuXHQ8YzpjaG9vc2U+XG5cdFx0XFwkezF9XG5cdDwvYzpjaG9vc2U+XG5zbmlwcGV0IGN3aGVuXG5cdDxjOndoZW4gdGVzdD1cIlxcJHtcXCR7MX19XCI+XG5cdFx0XFwkezJ9XG5cdDwvYzp3aGVuPlxuc25pcHBldCBjb3RoZXJcblx0PGM6b3RoZXJ3aXNlPlxuXHRcdFxcJHsxfVxuXHQ8L2M6b3RoZXJ3aXNlPlxuc25pcHBldCBjZm9yZVxuXHQ8Yzpmb3JFYWNoIGl0ZW1zPVwiXFwke1xcJHsxfX1cIiB2YXI9XCJcXCR7Mn1cIiB2YXJTdGF0dXM9XCJcXCR7M31cIj5cblx0XHRcXCR7NDo8YzpvdXQgdmFsdWU9XCJcXCQyXCIgLz59XG5cdDwvYzpmb3JFYWNoPlxuc25pcHBldCBjZm9ydFxuXHQ8YzpzZXQgdmFyPVwiXFwkezF9XCI+XFwkezI6aXRlbTEsaXRlbTIsaXRlbTN9PC9jOnNldD5cblx0PGM6Zm9yVG9rZW5zIHZhcj1cIlxcJHszfVwiIGl0ZW1zPVwiXFwke1xcJDF9XCIgZGVsaW1zPVwiXFwkezQ6LH1cIj5cblx0XHRcXCR7NTo8YzpvdXQgdmFsdWU9XCJcXCQzXCIgLz59XG5cdDwvYzpmb3JUb2tlbnM+XG5zbmlwcGV0IGNwYXJhbVxuXHQ8YzpwYXJhbSBuYW1lPVwiXFwkezF9XCIgdmFsdWU9XCJcXCR7Mn1cIiAvPlxuc25pcHBldCBjcGFyYW0rXG5cdDxjOnBhcmFtIG5hbWU9XCJcXCR7MX1cIiB2YWx1ZT1cIlxcJHsyfVwiIC8+XG5cdGNwYXJhbStcXCR7M31cbnNuaXBwZXQgY2ltcG9ydFxuXHQ8YzppbXBvcnQgdXJsPVwiXFwkezF9XCIgLz5cbnNuaXBwZXQgY2ltcG9ydCtcblx0PGM6aW1wb3J0IHVybD1cIlxcJHsxfVwiPlxuXHRcdDxjOnBhcmFtIG5hbWU9XCJcXCR7Mn1cIiB2YWx1ZT1cIlxcJHszfVwiIC8+XG5cdFx0Y3BhcmFtK1xcJHs0fVxuXHQ8L2M6aW1wb3J0Plxuc25pcHBldCBjdXJsXG5cdDxjOnVybCB2YWx1ZT1cIlxcJHsxfVwiIHZhcj1cIlxcJHsyfVwiIC8+XG5cdDxhIGhyZWY9XCJcXCR7XFwkMn1cIj5cXCR7M308L2E+XG5zbmlwcGV0IGN1cmwrXG5cdDxjOnVybCB2YWx1ZT1cIlxcJHsxfVwiIHZhcj1cIlxcJHsyfVwiPlxuXHRcdDxjOnBhcmFtIG5hbWU9XCJcXCR7NH1cIiB2YWx1ZT1cIlxcJHs1fVwiIC8+XG5cdFx0Y3BhcmFtK1xcJHs2fVxuXHQ8L2M6dXJsPlxuXHQ8YSBocmVmPVwiXFwke1xcJDJ9XCI+XFwkezN9PC9hPlxuc25pcHBldCBjcmVkaXJlY3Rcblx0PGM6cmVkaXJlY3QgdXJsPVwiXFwkezF9XCIgLz5cbnNuaXBwZXQgY29udGFpbnNcblx0XFwke2ZuOmNvbnRhaW5zKFxcJHsxOnN0cmluZ30sIFxcJHsyOnN1YnN0cn0pfVxuc25pcHBldCBjb250YWluczppXG5cdFxcJHtmbjpjb250YWluc0lnbm9yZUNhc2UoXFwkezE6c3RyaW5nfSwgXFwkezI6c3Vic3RyfSl9XG5zbmlwcGV0IGVuZHN3aXRoXG5cdFxcJHtmbjplbmRzV2l0aChcXCR7MTpzdHJpbmd9LCBcXCR7MjpzdWZmaXh9KX1cbnNuaXBwZXQgZXNjYXBlXG5cdFxcJHtmbjplc2NhcGVYbWwoXFwkezE6c3RyaW5nfSl9XG5zbmlwcGV0IGluZGV4b2Zcblx0XFwke2ZuOmluZGV4T2YoXFwkezE6c3RyaW5nfSwgXFwkezI6c3Vic3RyfSl9XG5zbmlwcGV0IGpvaW5cblx0XFwke2ZuOmpvaW4oXFwkezE6Y29sbGVjdGlvbn0sIFxcJHsyOmRlbGltc30pfVxuc25pcHBldCBsZW5ndGhcblx0XFwke2ZuOmxlbmd0aChcXCR7MTpjb2xsZWN0aW9uX29yX3N0cmluZ30pfVxuc25pcHBldCByZXBsYWNlXG5cdFxcJHtmbjpyZXBsYWNlKFxcJHsxOnN0cmluZ30sIFxcJHsyOnN1YnN0cn0sIFxcJHszOnJlcGxhY2V9KX1cbnNuaXBwZXQgc3BsaXRcblx0XFwke2ZuOnNwbGl0KFxcJHsxOnN0cmluZ30sIFxcJHsyOmRlbGltc30pfVxuc25pcHBldCBzdGFydHN3aXRoXG5cdFxcJHtmbjpzdGFydHNXaXRoKFxcJHsxOnN0cmluZ30sIFxcJHsyOnByZWZpeH0pfVxuc25pcHBldCBzdWJzdHJcblx0XFwke2ZuOnN1YnN0cmluZyhcXCR7MTpzdHJpbmd9LCBcXCR7MjpiZWdpbn0sIFxcJHszOmVuZH0pfVxuc25pcHBldCBzdWJzdHI6YVxuXHRcXCR7Zm46c3Vic3RyaW5nQWZ0ZXIoXFwkezE6c3RyaW5nfSwgXFwkezI6c3Vic3RyfSl9XG5zbmlwcGV0IHN1YnN0cjpiXG5cdFxcJHtmbjpzdWJzdHJpbmdCZWZvcmUoXFwkezE6c3RyaW5nfSwgXFwkezI6c3Vic3RyfSl9XG5zbmlwcGV0IGxjXG5cdFxcJHtmbjp0b0xvd2VyQ2FzZShcXCR7MTpzdHJpbmd9KX1cbnNuaXBwZXQgdWNcblx0XFwke2ZuOnRvVXBwZXJDYXNlKFxcJHsxOnN0cmluZ30pfVxuc25pcHBldCB0cmltXG5cdFxcJHtmbjp0cmltKFxcJHsxOnN0cmluZ30pfVxuYDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==