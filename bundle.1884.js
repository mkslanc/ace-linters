(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1884],{

/***/ 31884:
/***/ ((module) => {

module.exports = `snippet #!
	#!/usr/bin/env python
snippet imp
	import \${1:module}
snippet from
	from \${1:package} import \${2:module}
# Module Docstring
snippet docs
	'''
	File: \${1:FILENAME:file_name}
	Author: \${2:author}
	Description: \${3}
	'''
snippet wh
	while \${1:condition}:
		\${2:# TODO: write code...}
# dowh - does the same as do...while in other languages
snippet dowh
	while True:
		\${1:# TODO: write code...}
		if \${2:condition}:
			break
snippet with
	with \${1:expr} as \${2:var}:
		\${3:# TODO: write code...}
# New Class
snippet cl
	class \${1:ClassName}(\${2:object}):
		"""\${3:docstring for \$1}"""
		def __init__(self, \${4:arg}):
			\${5:super(\$1, self).__init__()}
			self.\$4 = \$4
			\${6}
# New Function
snippet def
	def \${1:fname}(\${2:\`indent('.') ? 'self' : ''\`}):
		"""\${3:docstring for \$1}"""
		\${4:# TODO: write code...}
snippet deff
	def \${1:fname}(\${2:\`indent('.') ? 'self' : ''\`}):
		\${3:# TODO: write code...}
# New Method
snippet defs
	def \${1:mname}(self, \${2:arg}):
		\${3:# TODO: write code...}
# New Property
snippet property
	def \${1:foo}():
		doc = "\${2:The \$1 property.}"
		def fget(self):
			\${3:return self._\$1}
		def fset(self, value):
			\${4:self._\$1 = value}
# Ifs
snippet if
	if \${1:condition}:
		\${2:# TODO: write code...}
snippet el
	else:
		\${1:# TODO: write code...}
snippet ei
	elif \${1:condition}:
		\${2:# TODO: write code...}
# For
snippet for
	for \${1:item} in \${2:items}:
		\${3:# TODO: write code...}
# Encodes
snippet cutf8
	# -*- coding: utf-8 -*-
snippet clatin1
	# -*- coding: latin-1 -*-
snippet cascii
	# -*- coding: ascii -*-
# Lambda
snippet ld
	\${1:var} = lambda \${2:vars} : \${3:action}
snippet .
	self.
snippet try Try/Except
	try:
		\${1:# TODO: write code...}
	except \${2:Exception}, \${3:e}:
		\${4:raise \$3}
snippet try Try/Except/Else
	try:
		\${1:# TODO: write code...}
	except \${2:Exception}, \${3:e}:
		\${4:raise \$3}
	else:
		\${5:# TODO: write code...}
snippet try Try/Except/Finally
	try:
		\${1:# TODO: write code...}
	except \${2:Exception}, \${3:e}:
		\${4:raise \$3}
	finally:
		\${5:# TODO: write code...}
snippet try Try/Except/Else/Finally
	try:
		\${1:# TODO: write code...}
	except \${2:Exception}, \${3:e}:
		\${4:raise \$3}
	else:
		\${5:# TODO: write code...}
	finally:
		\${6:# TODO: write code...}
# if __name__ == '__main__':
snippet ifmain
	if __name__ == '__main__':
		\${1:main()}
# __magic__
snippet _
	__\${1:init}__\${2}
# python debugger (pdb)
snippet pdb
	import pdb; pdb.set_trace()
# ipython debugger (ipdb)
snippet ipdb
	import ipdb; ipdb.set_trace()
# ipython debugger (pdbbb)
snippet pdbbb
	import pdbpp; pdbpp.set_trace()
snippet pprint
	import pprint; pprint.pprint(\${1})\${2}
snippet "
	"""
	\${1:doc}
	"""
# test function/method
snippet test
	def test_\${1:description}(\${2:self}):
		\${3:# TODO: write code...}
# test case
snippet testcase
	class \${1:ExampleCase}(unittest.TestCase):
		
		def test_\${2:description}(self):
			\${3:# TODO: write code...}
snippet fut
	from __future__ import \${1}
#getopt
snippet getopt
	try:
		# Short option syntax: "hv:"
		# Long option syntax: "help" or "verbose="
		opts, args = getopt.getopt(sys.argv[1:], "\${1:short_options}", [\${2:long_options}])
	
	except getopt.GetoptError, err:
		# Print debug info
		print str(err)
		\${3:error_action}

	for option, argument in opts:
		if option in ("-h", "--help"):
			\${4}
		elif option in ("-v", "--verbose"):
			verbose = argument
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjE4ODQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxTQUFTLFdBQVcsVUFBVTtBQUM5QjtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1YsWUFBWTtBQUNaLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsVUFBVSxZQUFZO0FBQ3RCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsUUFBUSxZQUFZO0FBQ3BCO0FBQ0E7QUFDQSxTQUFTLFFBQVEsTUFBTSxNQUFNO0FBQzdCLEtBQUs7QUFDTDtBQUNBO0FBQ0EsVUFBVSxZQUFZLElBQUksU0FBUztBQUNuQyxRQUFRLG9CQUFvQjtBQUM1Qix3QkFBd0IsTUFBTTtBQUM5QixNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLFFBQVEsUUFBUSxJQUFJLGdDQUFnQztBQUNwRCxRQUFRLG9CQUFvQjtBQUM1QixLQUFLO0FBQ0w7QUFDQSxRQUFRLFFBQVEsSUFBSSxnQ0FBZ0M7QUFDcEQsS0FBSztBQUNMO0FBQ0E7QUFDQSxRQUFRLFFBQVEsVUFBVSxNQUFNO0FBQ2hDLEtBQUs7QUFDTDtBQUNBO0FBQ0EsUUFBUSxNQUFNO0FBQ2QsWUFBWSxvQkFBb0I7QUFDaEM7QUFDQSxNQUFNO0FBQ047QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLE9BQU8sWUFBWTtBQUNuQixLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLFNBQVMsWUFBWTtBQUNyQixLQUFLO0FBQ0w7QUFDQTtBQUNBLFFBQVEsUUFBUSxNQUFNLFFBQVE7QUFDOUIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUksT0FBTyxZQUFZLFFBQVEsS0FBSztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxXQUFXLFlBQVksS0FBSyxJQUFJO0FBQ2hDLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMLFdBQVcsWUFBWSxLQUFLLElBQUk7QUFDaEMsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsV0FBVyxZQUFZLEtBQUssSUFBSTtBQUNoQyxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxXQUFXLFlBQVksS0FBSyxJQUFJO0FBQ2hDLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQU0sT0FBTyxLQUFLO0FBQ2xCO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsZ0JBQWdCLGlCQUFpQixFQUFFLElBQUk7QUFDdkM7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQSxhQUFhLGNBQWMsSUFBSSxPQUFPO0FBQ3RDLEtBQUs7QUFDTDtBQUNBO0FBQ0EsVUFBVSxjQUFjO0FBQ3hCO0FBQ0EsY0FBYyxjQUFjO0FBQzVCLE1BQU07QUFDTjtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLGdCQUFnQixPQUFPLGVBQWU7QUFDckY7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvcHl0aG9uLnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gYHNuaXBwZXQgIyFcblx0IyEvdXNyL2Jpbi9lbnYgcHl0aG9uXG5zbmlwcGV0IGltcFxuXHRpbXBvcnQgXFwkezE6bW9kdWxlfVxuc25pcHBldCBmcm9tXG5cdGZyb20gXFwkezE6cGFja2FnZX0gaW1wb3J0IFxcJHsyOm1vZHVsZX1cbiMgTW9kdWxlIERvY3N0cmluZ1xuc25pcHBldCBkb2NzXG5cdCcnJ1xuXHRGaWxlOiBcXCR7MTpGSUxFTkFNRTpmaWxlX25hbWV9XG5cdEF1dGhvcjogXFwkezI6YXV0aG9yfVxuXHREZXNjcmlwdGlvbjogXFwkezN9XG5cdCcnJ1xuc25pcHBldCB3aFxuXHR3aGlsZSBcXCR7MTpjb25kaXRpb259OlxuXHRcdFxcJHsyOiMgVE9ETzogd3JpdGUgY29kZS4uLn1cbiMgZG93aCAtIGRvZXMgdGhlIHNhbWUgYXMgZG8uLi53aGlsZSBpbiBvdGhlciBsYW5ndWFnZXNcbnNuaXBwZXQgZG93aFxuXHR3aGlsZSBUcnVlOlxuXHRcdFxcJHsxOiMgVE9ETzogd3JpdGUgY29kZS4uLn1cblx0XHRpZiBcXCR7Mjpjb25kaXRpb259OlxuXHRcdFx0YnJlYWtcbnNuaXBwZXQgd2l0aFxuXHR3aXRoIFxcJHsxOmV4cHJ9IGFzIFxcJHsyOnZhcn06XG5cdFx0XFwkezM6IyBUT0RPOiB3cml0ZSBjb2RlLi4ufVxuIyBOZXcgQ2xhc3NcbnNuaXBwZXQgY2xcblx0Y2xhc3MgXFwkezE6Q2xhc3NOYW1lfShcXCR7MjpvYmplY3R9KTpcblx0XHRcIlwiXCJcXCR7Mzpkb2NzdHJpbmcgZm9yIFxcJDF9XCJcIlwiXG5cdFx0ZGVmIF9faW5pdF9fKHNlbGYsIFxcJHs0OmFyZ30pOlxuXHRcdFx0XFwkezU6c3VwZXIoXFwkMSwgc2VsZikuX19pbml0X18oKX1cblx0XHRcdHNlbGYuXFwkNCA9IFxcJDRcblx0XHRcdFxcJHs2fVxuIyBOZXcgRnVuY3Rpb25cbnNuaXBwZXQgZGVmXG5cdGRlZiBcXCR7MTpmbmFtZX0oXFwkezI6XFxgaW5kZW50KCcuJykgPyAnc2VsZicgOiAnJ1xcYH0pOlxuXHRcdFwiXCJcIlxcJHszOmRvY3N0cmluZyBmb3IgXFwkMX1cIlwiXCJcblx0XHRcXCR7NDojIFRPRE86IHdyaXRlIGNvZGUuLi59XG5zbmlwcGV0IGRlZmZcblx0ZGVmIFxcJHsxOmZuYW1lfShcXCR7MjpcXGBpbmRlbnQoJy4nKSA/ICdzZWxmJyA6ICcnXFxgfSk6XG5cdFx0XFwkezM6IyBUT0RPOiB3cml0ZSBjb2RlLi4ufVxuIyBOZXcgTWV0aG9kXG5zbmlwcGV0IGRlZnNcblx0ZGVmIFxcJHsxOm1uYW1lfShzZWxmLCBcXCR7Mjphcmd9KTpcblx0XHRcXCR7MzojIFRPRE86IHdyaXRlIGNvZGUuLi59XG4jIE5ldyBQcm9wZXJ0eVxuc25pcHBldCBwcm9wZXJ0eVxuXHRkZWYgXFwkezE6Zm9vfSgpOlxuXHRcdGRvYyA9IFwiXFwkezI6VGhlIFxcJDEgcHJvcGVydHkufVwiXG5cdFx0ZGVmIGZnZXQoc2VsZik6XG5cdFx0XHRcXCR7MzpyZXR1cm4gc2VsZi5fXFwkMX1cblx0XHRkZWYgZnNldChzZWxmLCB2YWx1ZSk6XG5cdFx0XHRcXCR7NDpzZWxmLl9cXCQxID0gdmFsdWV9XG4jIElmc1xuc25pcHBldCBpZlxuXHRpZiBcXCR7MTpjb25kaXRpb259OlxuXHRcdFxcJHsyOiMgVE9ETzogd3JpdGUgY29kZS4uLn1cbnNuaXBwZXQgZWxcblx0ZWxzZTpcblx0XHRcXCR7MTojIFRPRE86IHdyaXRlIGNvZGUuLi59XG5zbmlwcGV0IGVpXG5cdGVsaWYgXFwkezE6Y29uZGl0aW9ufTpcblx0XHRcXCR7MjojIFRPRE86IHdyaXRlIGNvZGUuLi59XG4jIEZvclxuc25pcHBldCBmb3Jcblx0Zm9yIFxcJHsxOml0ZW19IGluIFxcJHsyOml0ZW1zfTpcblx0XHRcXCR7MzojIFRPRE86IHdyaXRlIGNvZGUuLi59XG4jIEVuY29kZXNcbnNuaXBwZXQgY3V0Zjhcblx0IyAtKi0gY29kaW5nOiB1dGYtOCAtKi1cbnNuaXBwZXQgY2xhdGluMVxuXHQjIC0qLSBjb2Rpbmc6IGxhdGluLTEgLSotXG5zbmlwcGV0IGNhc2NpaVxuXHQjIC0qLSBjb2Rpbmc6IGFzY2lpIC0qLVxuIyBMYW1iZGFcbnNuaXBwZXQgbGRcblx0XFwkezE6dmFyfSA9IGxhbWJkYSBcXCR7Mjp2YXJzfSA6IFxcJHszOmFjdGlvbn1cbnNuaXBwZXQgLlxuXHRzZWxmLlxuc25pcHBldCB0cnkgVHJ5L0V4Y2VwdFxuXHR0cnk6XG5cdFx0XFwkezE6IyBUT0RPOiB3cml0ZSBjb2RlLi4ufVxuXHRleGNlcHQgXFwkezI6RXhjZXB0aW9ufSwgXFwkezM6ZX06XG5cdFx0XFwkezQ6cmFpc2UgXFwkM31cbnNuaXBwZXQgdHJ5IFRyeS9FeGNlcHQvRWxzZVxuXHR0cnk6XG5cdFx0XFwkezE6IyBUT0RPOiB3cml0ZSBjb2RlLi4ufVxuXHRleGNlcHQgXFwkezI6RXhjZXB0aW9ufSwgXFwkezM6ZX06XG5cdFx0XFwkezQ6cmFpc2UgXFwkM31cblx0ZWxzZTpcblx0XHRcXCR7NTojIFRPRE86IHdyaXRlIGNvZGUuLi59XG5zbmlwcGV0IHRyeSBUcnkvRXhjZXB0L0ZpbmFsbHlcblx0dHJ5OlxuXHRcdFxcJHsxOiMgVE9ETzogd3JpdGUgY29kZS4uLn1cblx0ZXhjZXB0IFxcJHsyOkV4Y2VwdGlvbn0sIFxcJHszOmV9OlxuXHRcdFxcJHs0OnJhaXNlIFxcJDN9XG5cdGZpbmFsbHk6XG5cdFx0XFwkezU6IyBUT0RPOiB3cml0ZSBjb2RlLi4ufVxuc25pcHBldCB0cnkgVHJ5L0V4Y2VwdC9FbHNlL0ZpbmFsbHlcblx0dHJ5OlxuXHRcdFxcJHsxOiMgVE9ETzogd3JpdGUgY29kZS4uLn1cblx0ZXhjZXB0IFxcJHsyOkV4Y2VwdGlvbn0sIFxcJHszOmV9OlxuXHRcdFxcJHs0OnJhaXNlIFxcJDN9XG5cdGVsc2U6XG5cdFx0XFwkezU6IyBUT0RPOiB3cml0ZSBjb2RlLi4ufVxuXHRmaW5hbGx5OlxuXHRcdFxcJHs2OiMgVE9ETzogd3JpdGUgY29kZS4uLn1cbiMgaWYgX19uYW1lX18gPT0gJ19fbWFpbl9fJzpcbnNuaXBwZXQgaWZtYWluXG5cdGlmIF9fbmFtZV9fID09ICdfX21haW5fXyc6XG5cdFx0XFwkezE6bWFpbigpfVxuIyBfX21hZ2ljX19cbnNuaXBwZXQgX1xuXHRfX1xcJHsxOmluaXR9X19cXCR7Mn1cbiMgcHl0aG9uIGRlYnVnZ2VyIChwZGIpXG5zbmlwcGV0IHBkYlxuXHRpbXBvcnQgcGRiOyBwZGIuc2V0X3RyYWNlKClcbiMgaXB5dGhvbiBkZWJ1Z2dlciAoaXBkYilcbnNuaXBwZXQgaXBkYlxuXHRpbXBvcnQgaXBkYjsgaXBkYi5zZXRfdHJhY2UoKVxuIyBpcHl0aG9uIGRlYnVnZ2VyIChwZGJiYilcbnNuaXBwZXQgcGRiYmJcblx0aW1wb3J0IHBkYnBwOyBwZGJwcC5zZXRfdHJhY2UoKVxuc25pcHBldCBwcHJpbnRcblx0aW1wb3J0IHBwcmludDsgcHByaW50LnBwcmludChcXCR7MX0pXFwkezJ9XG5zbmlwcGV0IFwiXG5cdFwiXCJcIlxuXHRcXCR7MTpkb2N9XG5cdFwiXCJcIlxuIyB0ZXN0IGZ1bmN0aW9uL21ldGhvZFxuc25pcHBldCB0ZXN0XG5cdGRlZiB0ZXN0X1xcJHsxOmRlc2NyaXB0aW9ufShcXCR7MjpzZWxmfSk6XG5cdFx0XFwkezM6IyBUT0RPOiB3cml0ZSBjb2RlLi4ufVxuIyB0ZXN0IGNhc2VcbnNuaXBwZXQgdGVzdGNhc2Vcblx0Y2xhc3MgXFwkezE6RXhhbXBsZUNhc2V9KHVuaXR0ZXN0LlRlc3RDYXNlKTpcblx0XHRcblx0XHRkZWYgdGVzdF9cXCR7MjpkZXNjcmlwdGlvbn0oc2VsZik6XG5cdFx0XHRcXCR7MzojIFRPRE86IHdyaXRlIGNvZGUuLi59XG5zbmlwcGV0IGZ1dFxuXHRmcm9tIF9fZnV0dXJlX18gaW1wb3J0IFxcJHsxfVxuI2dldG9wdFxuc25pcHBldCBnZXRvcHRcblx0dHJ5OlxuXHRcdCMgU2hvcnQgb3B0aW9uIHN5bnRheDogXCJodjpcIlxuXHRcdCMgTG9uZyBvcHRpb24gc3ludGF4OiBcImhlbHBcIiBvciBcInZlcmJvc2U9XCJcblx0XHRvcHRzLCBhcmdzID0gZ2V0b3B0LmdldG9wdChzeXMuYXJndlsxOl0sIFwiXFwkezE6c2hvcnRfb3B0aW9uc31cIiwgW1xcJHsyOmxvbmdfb3B0aW9uc31dKVxuXHRcblx0ZXhjZXB0IGdldG9wdC5HZXRvcHRFcnJvciwgZXJyOlxuXHRcdCMgUHJpbnQgZGVidWcgaW5mb1xuXHRcdHByaW50IHN0cihlcnIpXG5cdFx0XFwkezM6ZXJyb3JfYWN0aW9ufVxuXG5cdGZvciBvcHRpb24sIGFyZ3VtZW50IGluIG9wdHM6XG5cdFx0aWYgb3B0aW9uIGluIChcIi1oXCIsIFwiLS1oZWxwXCIpOlxuXHRcdFx0XFwkezR9XG5cdFx0ZWxpZiBvcHRpb24gaW4gKFwiLXZcIiwgXCItLXZlcmJvc2VcIik6XG5cdFx0XHR2ZXJib3NlID0gYXJndW1lbnRcbmA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=