(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[5884,2178],{

/***/ 45884:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(42178);
exports.scope = "java";


/***/ }),

/***/ 42178:
/***/ ((module) => {

module.exports = `## Access Modifiers
snippet po
	protected
snippet pu
	public
snippet pr
	private
##
## Annotations
snippet before
	@Before
	static void \${1:intercept}(\${2:args}) { \${3} }
snippet mm
	@ManyToMany
	\${1}
snippet mo
	@ManyToOne
	\${1}
snippet om
	@OneToMany\${1:(cascade=CascadeType.ALL)}
	\${2}
snippet oo
	@OneToOne
	\${1}
##
## Basic Java packages and import
snippet im
	import
snippet j.b
	java.beans.
snippet j.i
	java.io.
snippet j.m
	java.math.
snippet j.n
	java.net.
snippet j.u
	java.util.
##
## Class
snippet cl
	class \${1:\`Filename("", "untitled")\`} \${2}
snippet in
	interface \${1:\`Filename("", "untitled")\`} \${2:extends Parent}\${3}
snippet tc
	public class \${1:\`Filename()\`} extends \${2:TestCase}
##
## Class Enhancements
snippet ext
	extends 
snippet imp
	implements
##
## Comments
snippet /*
	/*
	 * \${1}
	 */
##
## Constants
snippet co
	static public final \${1:String} \${2:var} = \${3};\${4}
snippet cos
	static public final String \${1:var} = "\${2}";\${3}
##
## Control Statements
snippet case
	case \${1}:
		\${2}
snippet def
	default:
		\${2}
snippet el
	else
snippet elif
	else if (\${1}) \${2}
snippet if
	if (\${1}) \${2}
snippet sw
	switch (\${1}) {
		\${2}
	}
##
## Create a Method
snippet m
	\${1:void} \${2:method}(\${3}) \${4:throws }\${5}
##
## Create a Variable
snippet v
	\${1:String} \${2:var}\${3: = null}\${4};\${5}
##
## Enhancements to Methods, variables, classes, etc.
snippet ab
	abstract
snippet fi
	final
snippet st
	static
snippet sy
	synchronized
##
## Error Methods
snippet err
	System.err.print("\${1:Message}");
snippet errf
	System.err.printf("\${1:Message}", \${2:exception});
snippet errln
	System.err.println("\${1:Message}");
##
## Exception Handling
snippet as
	assert \${1:test} : "\${2:Failure message}";\${3}
snippet ca
	catch(\${1:Exception} \${2:e}) \${3}
snippet thr
	throw
snippet ths
	throws
snippet try
	try {
		\${3}
	} catch(\${1:Exception} \${2:e}) {
	}
snippet tryf
	try {
		\${3}
	} catch(\${1:Exception} \${2:e}) {
	} finally {
	}
##
## Find Methods
snippet findall
	List<\${1:listName}> \${2:items} = \${1}.findAll();\${3}
snippet findbyid
	\${1:var} \${2:item} = \${1}.findById(\${3});\${4}
##
## Javadocs
snippet /**
	/**
	 * \${1}
	 */
snippet @au
	@author \`system("grep \\\`id -un\\\` /etc/passwd | cut -d \\":\\" -f5 | cut -d \\",\\" -f1")\`
snippet @br
	@brief \${1:Description}
snippet @fi
	@file \${1:\`Filename()\`}.java
snippet @pa
	@param \${1:param}
snippet @re
	@return \${1:param}
##
## Logger Methods
snippet debug
	Logger.debug(\${1:param});\${2}
snippet error
	Logger.error(\${1:param});\${2}
snippet info
	Logger.info(\${1:param});\${2}
snippet warn
	Logger.warn(\${1:param});\${2}
##
## Loops
snippet enfor
	for (\${1} : \${2}) \${3}
snippet for
	for (\${1}; \${2}; \${3}) \${4}
snippet wh
	while (\${1}) \${2}
##
## Main method
snippet main
	public static void main (String[] args) {
		\${1:/* code */}
	}
##
## Print Methods
snippet print
	System.out.print("\${1:Message}");
snippet printf
	System.out.printf("\${1:Message}", \${2:args});
snippet println
	System.out.println(\${1});
##
## Render Methods
snippet ren
	render(\${1:param});\${2}
snippet rena
	renderArgs.put("\${1}", \${2});\${3}
snippet renb
	renderBinary(\${1:param});\${2}
snippet renj
	renderJSON(\${1:param});\${2}
snippet renx
	renderXml(\${1:param});\${2}
##
## Setter and Getter Methods
snippet set
	\${1:public} void set\${3:}(\${2:String} \${4:}){
		this.\$4 = \$4;
	}
snippet get
	\${1:public} \${2:String} get\${3:}(){
		return this.\${4:};
	}
##
## Terminate Methods or Loops
snippet re
	return
snippet br
	break;
##
## Test Methods
snippet t
	public void test\${1:Name}() throws Exception {
		\${2}
	}
snippet test
	@Test
	public void test\${1:Name}() throws Exception {
		\${2}
	}
##
## Utils
snippet Sc
	Scanner
##
## Miscellaneous
snippet action
	public static void \${1:index}(\${2:args}) { \${3} }
snippet rnf
	notFound(\${1:param});\${2}
snippet rnfin
	notFoundIfNull(\${1:param});\${2}
snippet rr
	redirect(\${1:param});\${2}
snippet ru
	unauthorized(\${1:param});\${2}
snippet unless
	(unless=\${1:param});\${2}
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLFVBQVU7QUFDaEM7QUFDQSx1QkFBdUIsVUFBVSxNQUFNLE9BQU87QUFDOUM7QUFDQSx1QkFBdUIsRUFBRTtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVEsRUFBRSxHQUFHO0FBQ3hCO0FBQ0Esb0JBQW9CLEVBQUUsTUFBTSxFQUFFLEVBQUUsR0FBRztBQUNuQztBQUNBLGlCQUFpQixRQUFRLEVBQUUsR0FBRztBQUM5QjtBQUNBLGVBQWUsUUFBUSxFQUFFLEdBQUc7QUFDNUI7QUFDQSxjQUFjLFFBQVEsRUFBRSxHQUFHO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLElBQUksVUFBVSxXQUFXLEdBQUcsSUFBSSxVQUFVLEdBQUcsR0FBRztBQUNoRDtBQUNBO0FBQ0E7QUFDQSxJQUFJLFVBQVUsR0FBRyxVQUFVLE1BQU0sR0FBRztBQUNwQyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLE9BQU87QUFDM0IsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsUUFBUSxJQUFJLE9BQU8sSUFBSSxHQUFHO0FBQ2pEO0FBQ0EsYUFBYSxRQUFRLEVBQUUsR0FBRztBQUMxQjtBQUNBLG1CQUFtQixRQUFRLEVBQUUsR0FBRztBQUNoQztBQUNBLGFBQWEsUUFBUSxFQUFFLEdBQUc7QUFDMUI7QUFDQSxpQkFBaUIsUUFBUSxFQUFFLEdBQUc7QUFDOUI7QUFDQSxZQUFZLFFBQVEsRUFBRSxHQUFHO0FBQ3pCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvamF2YS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy9qYXZhLnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLnNuaXBwZXRUZXh0ID0gcmVxdWlyZShcIi4vamF2YS5zbmlwcGV0c1wiKTtcbmV4cG9ydHMuc2NvcGUgPSBcImphdmFcIjtcbiIsIm1vZHVsZS5leHBvcnRzID0gYCMjIEFjY2VzcyBNb2RpZmllcnNcbnNuaXBwZXQgcG9cblx0cHJvdGVjdGVkXG5zbmlwcGV0IHB1XG5cdHB1YmxpY1xuc25pcHBldCBwclxuXHRwcml2YXRlXG4jI1xuIyMgQW5ub3RhdGlvbnNcbnNuaXBwZXQgYmVmb3JlXG5cdEBCZWZvcmVcblx0c3RhdGljIHZvaWQgXFwkezE6aW50ZXJjZXB0fShcXCR7MjphcmdzfSkgeyBcXCR7M30gfVxuc25pcHBldCBtbVxuXHRATWFueVRvTWFueVxuXHRcXCR7MX1cbnNuaXBwZXQgbW9cblx0QE1hbnlUb09uZVxuXHRcXCR7MX1cbnNuaXBwZXQgb21cblx0QE9uZVRvTWFueVxcJHsxOihjYXNjYWRlPUNhc2NhZGVUeXBlLkFMTCl9XG5cdFxcJHsyfVxuc25pcHBldCBvb1xuXHRAT25lVG9PbmVcblx0XFwkezF9XG4jI1xuIyMgQmFzaWMgSmF2YSBwYWNrYWdlcyBhbmQgaW1wb3J0XG5zbmlwcGV0IGltXG5cdGltcG9ydFxuc25pcHBldCBqLmJcblx0amF2YS5iZWFucy5cbnNuaXBwZXQgai5pXG5cdGphdmEuaW8uXG5zbmlwcGV0IGoubVxuXHRqYXZhLm1hdGguXG5zbmlwcGV0IGoublxuXHRqYXZhLm5ldC5cbnNuaXBwZXQgai51XG5cdGphdmEudXRpbC5cbiMjXG4jIyBDbGFzc1xuc25pcHBldCBjbFxuXHRjbGFzcyBcXCR7MTpcXGBGaWxlbmFtZShcIlwiLCBcInVudGl0bGVkXCIpXFxgfSBcXCR7Mn1cbnNuaXBwZXQgaW5cblx0aW50ZXJmYWNlIFxcJHsxOlxcYEZpbGVuYW1lKFwiXCIsIFwidW50aXRsZWRcIilcXGB9IFxcJHsyOmV4dGVuZHMgUGFyZW50fVxcJHszfVxuc25pcHBldCB0Y1xuXHRwdWJsaWMgY2xhc3MgXFwkezE6XFxgRmlsZW5hbWUoKVxcYH0gZXh0ZW5kcyBcXCR7MjpUZXN0Q2FzZX1cbiMjXG4jIyBDbGFzcyBFbmhhbmNlbWVudHNcbnNuaXBwZXQgZXh0XG5cdGV4dGVuZHMgXG5zbmlwcGV0IGltcFxuXHRpbXBsZW1lbnRzXG4jI1xuIyMgQ29tbWVudHNcbnNuaXBwZXQgLypcblx0Lypcblx0ICogXFwkezF9XG5cdCAqL1xuIyNcbiMjIENvbnN0YW50c1xuc25pcHBldCBjb1xuXHRzdGF0aWMgcHVibGljIGZpbmFsIFxcJHsxOlN0cmluZ30gXFwkezI6dmFyfSA9IFxcJHszfTtcXCR7NH1cbnNuaXBwZXQgY29zXG5cdHN0YXRpYyBwdWJsaWMgZmluYWwgU3RyaW5nIFxcJHsxOnZhcn0gPSBcIlxcJHsyfVwiO1xcJHszfVxuIyNcbiMjIENvbnRyb2wgU3RhdGVtZW50c1xuc25pcHBldCBjYXNlXG5cdGNhc2UgXFwkezF9OlxuXHRcdFxcJHsyfVxuc25pcHBldCBkZWZcblx0ZGVmYXVsdDpcblx0XHRcXCR7Mn1cbnNuaXBwZXQgZWxcblx0ZWxzZVxuc25pcHBldCBlbGlmXG5cdGVsc2UgaWYgKFxcJHsxfSkgXFwkezJ9XG5zbmlwcGV0IGlmXG5cdGlmIChcXCR7MX0pIFxcJHsyfVxuc25pcHBldCBzd1xuXHRzd2l0Y2ggKFxcJHsxfSkge1xuXHRcdFxcJHsyfVxuXHR9XG4jI1xuIyMgQ3JlYXRlIGEgTWV0aG9kXG5zbmlwcGV0IG1cblx0XFwkezE6dm9pZH0gXFwkezI6bWV0aG9kfShcXCR7M30pIFxcJHs0OnRocm93cyB9XFwkezV9XG4jI1xuIyMgQ3JlYXRlIGEgVmFyaWFibGVcbnNuaXBwZXQgdlxuXHRcXCR7MTpTdHJpbmd9IFxcJHsyOnZhcn1cXCR7MzogPSBudWxsfVxcJHs0fTtcXCR7NX1cbiMjXG4jIyBFbmhhbmNlbWVudHMgdG8gTWV0aG9kcywgdmFyaWFibGVzLCBjbGFzc2VzLCBldGMuXG5zbmlwcGV0IGFiXG5cdGFic3RyYWN0XG5zbmlwcGV0IGZpXG5cdGZpbmFsXG5zbmlwcGV0IHN0XG5cdHN0YXRpY1xuc25pcHBldCBzeVxuXHRzeW5jaHJvbml6ZWRcbiMjXG4jIyBFcnJvciBNZXRob2RzXG5zbmlwcGV0IGVyclxuXHRTeXN0ZW0uZXJyLnByaW50KFwiXFwkezE6TWVzc2FnZX1cIik7XG5zbmlwcGV0IGVycmZcblx0U3lzdGVtLmVyci5wcmludGYoXCJcXCR7MTpNZXNzYWdlfVwiLCBcXCR7MjpleGNlcHRpb259KTtcbnNuaXBwZXQgZXJybG5cblx0U3lzdGVtLmVyci5wcmludGxuKFwiXFwkezE6TWVzc2FnZX1cIik7XG4jI1xuIyMgRXhjZXB0aW9uIEhhbmRsaW5nXG5zbmlwcGV0IGFzXG5cdGFzc2VydCBcXCR7MTp0ZXN0fSA6IFwiXFwkezI6RmFpbHVyZSBtZXNzYWdlfVwiO1xcJHszfVxuc25pcHBldCBjYVxuXHRjYXRjaChcXCR7MTpFeGNlcHRpb259IFxcJHsyOmV9KSBcXCR7M31cbnNuaXBwZXQgdGhyXG5cdHRocm93XG5zbmlwcGV0IHRoc1xuXHR0aHJvd3NcbnNuaXBwZXQgdHJ5XG5cdHRyeSB7XG5cdFx0XFwkezN9XG5cdH0gY2F0Y2goXFwkezE6RXhjZXB0aW9ufSBcXCR7MjplfSkge1xuXHR9XG5zbmlwcGV0IHRyeWZcblx0dHJ5IHtcblx0XHRcXCR7M31cblx0fSBjYXRjaChcXCR7MTpFeGNlcHRpb259IFxcJHsyOmV9KSB7XG5cdH0gZmluYWxseSB7XG5cdH1cbiMjXG4jIyBGaW5kIE1ldGhvZHNcbnNuaXBwZXQgZmluZGFsbFxuXHRMaXN0PFxcJHsxOmxpc3ROYW1lfT4gXFwkezI6aXRlbXN9ID0gXFwkezF9LmZpbmRBbGwoKTtcXCR7M31cbnNuaXBwZXQgZmluZGJ5aWRcblx0XFwkezE6dmFyfSBcXCR7MjppdGVtfSA9IFxcJHsxfS5maW5kQnlJZChcXCR7M30pO1xcJHs0fVxuIyNcbiMjIEphdmFkb2NzXG5zbmlwcGV0IC8qKlxuXHQvKipcblx0ICogXFwkezF9XG5cdCAqL1xuc25pcHBldCBAYXVcblx0QGF1dGhvciBcXGBzeXN0ZW0oXCJncmVwIFxcXFxcXGBpZCAtdW5cXFxcXFxgIC9ldGMvcGFzc3dkIHwgY3V0IC1kIFxcXFxcIjpcXFxcXCIgLWY1IHwgY3V0IC1kIFxcXFxcIixcXFxcXCIgLWYxXCIpXFxgXG5zbmlwcGV0IEBiclxuXHRAYnJpZWYgXFwkezE6RGVzY3JpcHRpb259XG5zbmlwcGV0IEBmaVxuXHRAZmlsZSBcXCR7MTpcXGBGaWxlbmFtZSgpXFxgfS5qYXZhXG5zbmlwcGV0IEBwYVxuXHRAcGFyYW0gXFwkezE6cGFyYW19XG5zbmlwcGV0IEByZVxuXHRAcmV0dXJuIFxcJHsxOnBhcmFtfVxuIyNcbiMjIExvZ2dlciBNZXRob2RzXG5zbmlwcGV0IGRlYnVnXG5cdExvZ2dlci5kZWJ1ZyhcXCR7MTpwYXJhbX0pO1xcJHsyfVxuc25pcHBldCBlcnJvclxuXHRMb2dnZXIuZXJyb3IoXFwkezE6cGFyYW19KTtcXCR7Mn1cbnNuaXBwZXQgaW5mb1xuXHRMb2dnZXIuaW5mbyhcXCR7MTpwYXJhbX0pO1xcJHsyfVxuc25pcHBldCB3YXJuXG5cdExvZ2dlci53YXJuKFxcJHsxOnBhcmFtfSk7XFwkezJ9XG4jI1xuIyMgTG9vcHNcbnNuaXBwZXQgZW5mb3Jcblx0Zm9yIChcXCR7MX0gOiBcXCR7Mn0pIFxcJHszfVxuc25pcHBldCBmb3Jcblx0Zm9yIChcXCR7MX07IFxcJHsyfTsgXFwkezN9KSBcXCR7NH1cbnNuaXBwZXQgd2hcblx0d2hpbGUgKFxcJHsxfSkgXFwkezJ9XG4jI1xuIyMgTWFpbiBtZXRob2RcbnNuaXBwZXQgbWFpblxuXHRwdWJsaWMgc3RhdGljIHZvaWQgbWFpbiAoU3RyaW5nW10gYXJncykge1xuXHRcdFxcJHsxOi8qIGNvZGUgKi99XG5cdH1cbiMjXG4jIyBQcmludCBNZXRob2RzXG5zbmlwcGV0IHByaW50XG5cdFN5c3RlbS5vdXQucHJpbnQoXCJcXCR7MTpNZXNzYWdlfVwiKTtcbnNuaXBwZXQgcHJpbnRmXG5cdFN5c3RlbS5vdXQucHJpbnRmKFwiXFwkezE6TWVzc2FnZX1cIiwgXFwkezI6YXJnc30pO1xuc25pcHBldCBwcmludGxuXG5cdFN5c3RlbS5vdXQucHJpbnRsbihcXCR7MX0pO1xuIyNcbiMjIFJlbmRlciBNZXRob2RzXG5zbmlwcGV0IHJlblxuXHRyZW5kZXIoXFwkezE6cGFyYW19KTtcXCR7Mn1cbnNuaXBwZXQgcmVuYVxuXHRyZW5kZXJBcmdzLnB1dChcIlxcJHsxfVwiLCBcXCR7Mn0pO1xcJHszfVxuc25pcHBldCByZW5iXG5cdHJlbmRlckJpbmFyeShcXCR7MTpwYXJhbX0pO1xcJHsyfVxuc25pcHBldCByZW5qXG5cdHJlbmRlckpTT04oXFwkezE6cGFyYW19KTtcXCR7Mn1cbnNuaXBwZXQgcmVueFxuXHRyZW5kZXJYbWwoXFwkezE6cGFyYW19KTtcXCR7Mn1cbiMjXG4jIyBTZXR0ZXIgYW5kIEdldHRlciBNZXRob2RzXG5zbmlwcGV0IHNldFxuXHRcXCR7MTpwdWJsaWN9IHZvaWQgc2V0XFwkezM6fShcXCR7MjpTdHJpbmd9IFxcJHs0On0pe1xuXHRcdHRoaXMuXFwkNCA9IFxcJDQ7XG5cdH1cbnNuaXBwZXQgZ2V0XG5cdFxcJHsxOnB1YmxpY30gXFwkezI6U3RyaW5nfSBnZXRcXCR7Mzp9KCl7XG5cdFx0cmV0dXJuIHRoaXMuXFwkezQ6fTtcblx0fVxuIyNcbiMjIFRlcm1pbmF0ZSBNZXRob2RzIG9yIExvb3BzXG5zbmlwcGV0IHJlXG5cdHJldHVyblxuc25pcHBldCBiclxuXHRicmVhaztcbiMjXG4jIyBUZXN0IE1ldGhvZHNcbnNuaXBwZXQgdFxuXHRwdWJsaWMgdm9pZCB0ZXN0XFwkezE6TmFtZX0oKSB0aHJvd3MgRXhjZXB0aW9uIHtcblx0XHRcXCR7Mn1cblx0fVxuc25pcHBldCB0ZXN0XG5cdEBUZXN0XG5cdHB1YmxpYyB2b2lkIHRlc3RcXCR7MTpOYW1lfSgpIHRocm93cyBFeGNlcHRpb24ge1xuXHRcdFxcJHsyfVxuXHR9XG4jI1xuIyMgVXRpbHNcbnNuaXBwZXQgU2Ncblx0U2Nhbm5lclxuIyNcbiMjIE1pc2NlbGxhbmVvdXNcbnNuaXBwZXQgYWN0aW9uXG5cdHB1YmxpYyBzdGF0aWMgdm9pZCBcXCR7MTppbmRleH0oXFwkezI6YXJnc30pIHsgXFwkezN9IH1cbnNuaXBwZXQgcm5mXG5cdG5vdEZvdW5kKFxcJHsxOnBhcmFtfSk7XFwkezJ9XG5zbmlwcGV0IHJuZmluXG5cdG5vdEZvdW5kSWZOdWxsKFxcJHsxOnBhcmFtfSk7XFwkezJ9XG5zbmlwcGV0IHJyXG5cdHJlZGlyZWN0KFxcJHsxOnBhcmFtfSk7XFwkezJ9XG5zbmlwcGV0IHJ1XG5cdHVuYXV0aG9yaXplZChcXCR7MTpwYXJhbX0pO1xcJHsyfVxuc25pcHBldCB1bmxlc3Ncblx0KHVubGVzcz1cXCR7MTpwYXJhbX0pO1xcJHsyfVxuYDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==