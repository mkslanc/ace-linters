(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7396],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjczOTYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0EsZUFBZSxlQUFlLFFBQVEsVUFBVSxRQUFRLFdBQVcsU0FBUyxZQUFZLGFBQWEsZUFBZSxZQUFZLGFBQWEsZUFBZSxXQUFXLFlBQVk7O0FBRW5MO0FBQ0EsY0FBYyxXQUFXLFFBQVEsSUFBSSxRQUFRLGVBQWUsT0FBTyxnQkFBZ0IsUUFBUTs7QUFFM0Y7QUFDQSxvQkFBb0IsVUFBVSxLQUFLLGNBQWMsTUFBTSxlQUFlLE9BQU87O0FBRTdFO0FBQ0EsZ0JBQWdCLFdBQVcsUUFBUSxJQUFJLFFBQVE7O0FBRS9DO0FBQ0EsZ0JBQWdCLFdBQVcsUUFBUSxJQUFJLFFBQVE7Ozs7QUFJL0M7QUFDQSxPQUFPLFNBQVM7O0FBRWhCO0FBQ0EsT0FBTyxTQUFTLElBQUksV0FBVzs7QUFFL0I7QUFDQSxPQUFPLFNBQVM7O0FBRWhCO0FBQ0EsT0FBTyxPQUFPLElBQUksV0FBVyxJQUFJLFdBQVc7OztBQUc1QyIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL2FiYy5zbmlwcGV0cy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IGBcbnNuaXBwZXQgenVwZm5vdGVyLnByaW50XG5cdCUlJSVobi5wcmludCB7XCJzdGFydHBvc1wiOiBcXCR7MTpwb3NfeX0sIFwidFwiOlwiXFwkezI6dGl0bGV9XCIsIFwidlwiOltcXCR7Mzp2b2ljZXN9XSwgXCJzXCI6W1tcXCR7NDpzeW5jdm9pY2VzfTEsMl1dLCBcImZcIjpbXFwkezU6Zmxvd2xpbmVzfV0sICBcInNmXCI6W1xcJHs2OnN1YmZsb3dsaW5lc31dLCBcImpcIjpbXFwkezc6anVtcGxpbmVzfV19XG5cbnNuaXBwZXQgenVwZm5vdGVyLm5vdGVcblx0JSUlJWhuLm5vdGUge1wicG9zXCI6IFtcXCR7MTpwb3NfeH0sXFwkezI6cG9zX3l9XSwgXCJ0ZXh0XCI6IFwiXFwkezM6dGV4dH1cIiwgXCJzdHlsZVwiOiBcIlxcJHs0OnN0eWxlfVwifVxuXG5zbmlwcGV0IHp1cGZub3Rlci5hbm5vdGF0aW9uXG5cdCUlJSVobi5hbm5vdGF0aW9uIHtcImlkXCI6IFwiXFwkezE6aWR9XCIsIFwicG9zXCI6IFtcXCR7Mjpwb3N9XSwgXCJ0ZXh0XCI6IFwiXFwkezM6dGV4dH1cIn1cblxuc25pcHBldCB6dXBmbm90ZXIubHlyaWNzXG5cdCUlJSVobi5seXJpY3Mge1wicG9zXCI6IFtcXCR7MTp4X3Bvc30sXFwkezI6eV9wb3N9XX1cblxuc25pcHBldCB6dXBmbm90ZXIubGVnZW5kXG5cdCUlJSVobi5sZWdlbmQge1wicG9zXCI6IFtcXCR7MTp4X3Bvc30sXFwkezI6eV9wb3N9XX1cblxuXG5cbnNuaXBwZXQgenVwZm5vdGVyLnRhcmdldFxuXHRcIl46XFwkezE6dGFyZ2V0fVwiXG5cbnNuaXBwZXQgenVwZm5vdGVyLmdvdG9cblx0XCJeQFxcJHsxOnRhcmdldH1AXFwkezI6ZGlzdGFuY2V9XCJcblxuc25pcHBldCB6dXBmbm90ZXIuYW5ub3RhdGlvbnJlZlxuXHRcIl4jXFwkezE6dGFyZ2V0fVwiXG5cbnNuaXBwZXQgenVwZm5vdGVyLmFubm90YXRpb25cblx0XCJeIVxcJHsxOnRleHR9QFxcJHsyOnhfb2Zmc2V0fSxcXCR7Mzp5X29mZnNldH1cIlxuXG5cbmA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=