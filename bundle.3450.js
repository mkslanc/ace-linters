(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3450,7396],{

/***/ 93450:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(97396);
exports.scope = "abc";


/***/ }),

/***/ 97396:
/***/ ((module) => {

module.exports = `
snippet zupfnoter.print
	%%%%hn.print {"startpos": \${1:pos_y}, "t":"\${2:title}", "v":[\${3:voices}], "s":[[\${4:syncvoices}1,2]], "f":[\${5:flowlines}],  "sf":[\${6:subflowlines}], "j":[\${7:jumplines}]}

snippet zupfnoter.note
	%%%%hn.note {"pos": [\${1:pos_x},\${2:pos_y}], "text": "\${3:text}", "style": "\${4:style}"}

snippet zupfnoter.annotation
	%%%%hn.annotation {"id": "\${1:id}", "pos": [\${2:pos}], "text": "\${3:text}"}

snippet zupfnoter.lyrics
	%%%%hn.lyrics {"pos": [\${1:x_pos},\${2:y_pos}]}

snippet zupfnoter.legend
	%%%%hn.legend {"pos": [\${1:x_pos},\${2:y_pos}]}



snippet zupfnoter.target
	"^:\${1:target}"

snippet zupfnoter.goto
	"^@\${1:target}@\${2:distance}"

snippet zupfnoter.annotationref
	"^#\${1:target}"

snippet zupfnoter.annotation
	"^!\${1:text}@\${2:x_offset},\${3:y_offset}"


`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjM0NTAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsZ0RBQStDO0FBQy9DLGFBQWE7Ozs7Ozs7O0FDSGI7QUFDQTtBQUNBLGVBQWUsZUFBZSxRQUFRLFVBQVUsUUFBUSxXQUFXLFNBQVMsWUFBWSxhQUFhLGVBQWUsWUFBWSxhQUFhLGVBQWUsV0FBVyxZQUFZOztBQUVuTDtBQUNBLGNBQWMsV0FBVyxRQUFRLElBQUksUUFBUSxlQUFlLE9BQU8sZ0JBQWdCLFFBQVE7O0FBRTNGO0FBQ0Esb0JBQW9CLFVBQVUsS0FBSyxjQUFjLE1BQU0sZUFBZSxPQUFPOztBQUU3RTtBQUNBLGdCQUFnQixXQUFXLFFBQVEsSUFBSSxRQUFROztBQUUvQztBQUNBLGdCQUFnQixXQUFXLFFBQVEsSUFBSSxRQUFROzs7O0FBSS9DO0FBQ0EsT0FBTyxTQUFTOztBQUVoQjtBQUNBLE9BQU8sU0FBUyxJQUFJLFdBQVc7O0FBRS9CO0FBQ0EsT0FBTyxTQUFTOztBQUVoQjtBQUNBLE9BQU8sT0FBTyxJQUFJLFdBQVcsSUFBSSxXQUFXOzs7QUFHNUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy9hYmMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvYWJjLnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLnNuaXBwZXRUZXh0ID0gcmVxdWlyZShcIi4vYWJjLnNuaXBwZXRzXCIpO1xuZXhwb3J0cy5zY29wZSA9IFwiYWJjXCI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGBcbnNuaXBwZXQgenVwZm5vdGVyLnByaW50XG5cdCUlJSVobi5wcmludCB7XCJzdGFydHBvc1wiOiBcXCR7MTpwb3NfeX0sIFwidFwiOlwiXFwkezI6dGl0bGV9XCIsIFwidlwiOltcXCR7Mzp2b2ljZXN9XSwgXCJzXCI6W1tcXCR7NDpzeW5jdm9pY2VzfTEsMl1dLCBcImZcIjpbXFwkezU6Zmxvd2xpbmVzfV0sICBcInNmXCI6W1xcJHs2OnN1YmZsb3dsaW5lc31dLCBcImpcIjpbXFwkezc6anVtcGxpbmVzfV19XG5cbnNuaXBwZXQgenVwZm5vdGVyLm5vdGVcblx0JSUlJWhuLm5vdGUge1wicG9zXCI6IFtcXCR7MTpwb3NfeH0sXFwkezI6cG9zX3l9XSwgXCJ0ZXh0XCI6IFwiXFwkezM6dGV4dH1cIiwgXCJzdHlsZVwiOiBcIlxcJHs0OnN0eWxlfVwifVxuXG5zbmlwcGV0IHp1cGZub3Rlci5hbm5vdGF0aW9uXG5cdCUlJSVobi5hbm5vdGF0aW9uIHtcImlkXCI6IFwiXFwkezE6aWR9XCIsIFwicG9zXCI6IFtcXCR7Mjpwb3N9XSwgXCJ0ZXh0XCI6IFwiXFwkezM6dGV4dH1cIn1cblxuc25pcHBldCB6dXBmbm90ZXIubHlyaWNzXG5cdCUlJSVobi5seXJpY3Mge1wicG9zXCI6IFtcXCR7MTp4X3Bvc30sXFwkezI6eV9wb3N9XX1cblxuc25pcHBldCB6dXBmbm90ZXIubGVnZW5kXG5cdCUlJSVobi5sZWdlbmQge1wicG9zXCI6IFtcXCR7MTp4X3Bvc30sXFwkezI6eV9wb3N9XX1cblxuXG5cbnNuaXBwZXQgenVwZm5vdGVyLnRhcmdldFxuXHRcIl46XFwkezE6dGFyZ2V0fVwiXG5cbnNuaXBwZXQgenVwZm5vdGVyLmdvdG9cblx0XCJeQFxcJHsxOnRhcmdldH1AXFwkezI6ZGlzdGFuY2V9XCJcblxuc25pcHBldCB6dXBmbm90ZXIuYW5ub3RhdGlvbnJlZlxuXHRcIl4jXFwkezE6dGFyZ2V0fVwiXG5cbnNuaXBwZXQgenVwZm5vdGVyLmFubm90YXRpb25cblx0XCJeIVxcJHsxOnRleHR9QFxcJHsyOnhfb2Zmc2V0fSxcXCR7Mzp5X29mZnNldH1cIlxuXG5cbmA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=