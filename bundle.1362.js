(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1362],{

/***/ 11362:
/***/ ((module) => {

module.exports = `## Access Modifiers
snippet u
	UN
snippet un
	UNB
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QztBQUNBLHVCQUF1QixVQUFVLE1BQU0sT0FBTztBQUM5QztBQUNBLHVCQUF1QixFQUFFO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUSxFQUFFLEdBQUc7QUFDeEI7QUFDQSxvQkFBb0IsRUFBRSxNQUFNLEVBQUUsRUFBRSxHQUFHO0FBQ25DO0FBQ0EsaUJBQWlCLFFBQVEsRUFBRSxHQUFHO0FBQzlCO0FBQ0EsZUFBZSxRQUFRLEVBQUUsR0FBRztBQUM1QjtBQUNBLGNBQWMsUUFBUSxFQUFFLEdBQUc7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsSUFBSSxVQUFVLFdBQVcsR0FBRyxJQUFJLFVBQVUsR0FBRyxHQUFHO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLElBQUksVUFBVSxHQUFHLFVBQVUsTUFBTSxHQUFHO0FBQ3BDLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixPQUFPO0FBQzNCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsT0FBTztBQUMzQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixRQUFRLElBQUksT0FBTyxJQUFJLEdBQUc7QUFDakQ7QUFDQSxhQUFhLFFBQVEsRUFBRSxHQUFHO0FBQzFCO0FBQ0EsbUJBQW1CLFFBQVEsRUFBRSxHQUFHO0FBQ2hDO0FBQ0EsYUFBYSxRQUFRLEVBQUUsR0FBRztBQUMxQjtBQUNBLGlCQUFpQixRQUFRLEVBQUUsR0FBRztBQUM5QjtBQUNBLFlBQVksUUFBUSxFQUFFLEdBQUc7QUFDekIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy9lZGlmYWN0LnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gYCMjIEFjY2VzcyBNb2RpZmllcnNcbnNuaXBwZXQgdVxuXHRVTlxuc25pcHBldCB1blxuXHRVTkJcbnNuaXBwZXQgcHJcblx0cHJpdmF0ZVxuIyNcbiMjIEFubm90YXRpb25zXG5zbmlwcGV0IGJlZm9yZVxuXHRAQmVmb3JlXG5cdHN0YXRpYyB2b2lkIFxcJHsxOmludGVyY2VwdH0oXFwkezI6YXJnc30pIHsgXFwkezN9IH1cbnNuaXBwZXQgbW1cblx0QE1hbnlUb01hbnlcblx0XFwkezF9XG5zbmlwcGV0IG1vXG5cdEBNYW55VG9PbmVcblx0XFwkezF9XG5zbmlwcGV0IG9tXG5cdEBPbmVUb01hbnlcXCR7MTooY2FzY2FkZT1DYXNjYWRlVHlwZS5BTEwpfVxuXHRcXCR7Mn1cbnNuaXBwZXQgb29cblx0QE9uZVRvT25lXG5cdFxcJHsxfVxuIyNcbiMjIEJhc2ljIEphdmEgcGFja2FnZXMgYW5kIGltcG9ydFxuc25pcHBldCBpbVxuXHRpbXBvcnRcbnNuaXBwZXQgai5iXG5cdGphdmEuYmVhbnMuXG5zbmlwcGV0IGouaVxuXHRqYXZhLmlvLlxuc25pcHBldCBqLm1cblx0amF2YS5tYXRoLlxuc25pcHBldCBqLm5cblx0amF2YS5uZXQuXG5zbmlwcGV0IGoudVxuXHRqYXZhLnV0aWwuXG4jI1xuIyMgQ2xhc3NcbnNuaXBwZXQgY2xcblx0Y2xhc3MgXFwkezE6XFxgRmlsZW5hbWUoXCJcIiwgXCJ1bnRpdGxlZFwiKVxcYH0gXFwkezJ9XG5zbmlwcGV0IGluXG5cdGludGVyZmFjZSBcXCR7MTpcXGBGaWxlbmFtZShcIlwiLCBcInVudGl0bGVkXCIpXFxgfSBcXCR7MjpleHRlbmRzIFBhcmVudH1cXCR7M31cbnNuaXBwZXQgdGNcblx0cHVibGljIGNsYXNzIFxcJHsxOlxcYEZpbGVuYW1lKClcXGB9IGV4dGVuZHMgXFwkezI6VGVzdENhc2V9XG4jI1xuIyMgQ2xhc3MgRW5oYW5jZW1lbnRzXG5zbmlwcGV0IGV4dFxuXHRleHRlbmRzIFxuc25pcHBldCBpbXBcblx0aW1wbGVtZW50c1xuIyNcbiMjIENvbW1lbnRzXG5zbmlwcGV0IC8qXG5cdC8qXG5cdCAqIFxcJHsxfVxuXHQgKi9cbiMjXG4jIyBDb25zdGFudHNcbnNuaXBwZXQgY29cblx0c3RhdGljIHB1YmxpYyBmaW5hbCBcXCR7MTpTdHJpbmd9IFxcJHsyOnZhcn0gPSBcXCR7M307XFwkezR9XG5zbmlwcGV0IGNvc1xuXHRzdGF0aWMgcHVibGljIGZpbmFsIFN0cmluZyBcXCR7MTp2YXJ9ID0gXCJcXCR7Mn1cIjtcXCR7M31cbiMjXG4jIyBDb250cm9sIFN0YXRlbWVudHNcbnNuaXBwZXQgY2FzZVxuXHRjYXNlIFxcJHsxfTpcblx0XHRcXCR7Mn1cbnNuaXBwZXQgZGVmXG5cdGRlZmF1bHQ6XG5cdFx0XFwkezJ9XG5zbmlwcGV0IGVsXG5cdGVsc2VcbnNuaXBwZXQgZWxpZlxuXHRlbHNlIGlmIChcXCR7MX0pIFxcJHsyfVxuc25pcHBldCBpZlxuXHRpZiAoXFwkezF9KSBcXCR7Mn1cbnNuaXBwZXQgc3dcblx0c3dpdGNoIChcXCR7MX0pIHtcblx0XHRcXCR7Mn1cblx0fVxuIyNcbiMjIENyZWF0ZSBhIE1ldGhvZFxuc25pcHBldCBtXG5cdFxcJHsxOnZvaWR9IFxcJHsyOm1ldGhvZH0oXFwkezN9KSBcXCR7NDp0aHJvd3MgfVxcJHs1fVxuIyNcbiMjIENyZWF0ZSBhIFZhcmlhYmxlXG5zbmlwcGV0IHZcblx0XFwkezE6U3RyaW5nfSBcXCR7Mjp2YXJ9XFwkezM6ID0gbnVsbH1cXCR7NH07XFwkezV9XG4jI1xuIyMgRW5oYW5jZW1lbnRzIHRvIE1ldGhvZHMsIHZhcmlhYmxlcywgY2xhc3NlcywgZXRjLlxuc25pcHBldCBhYlxuXHRhYnN0cmFjdFxuc25pcHBldCBmaVxuXHRmaW5hbFxuc25pcHBldCBzdFxuXHRzdGF0aWNcbnNuaXBwZXQgc3lcblx0c3luY2hyb25pemVkXG4jI1xuIyMgRXJyb3IgTWV0aG9kc1xuc25pcHBldCBlcnJcblx0U3lzdGVtLmVyci5wcmludChcIlxcJHsxOk1lc3NhZ2V9XCIpO1xuc25pcHBldCBlcnJmXG5cdFN5c3RlbS5lcnIucHJpbnRmKFwiXFwkezE6TWVzc2FnZX1cIiwgXFwkezI6ZXhjZXB0aW9ufSk7XG5zbmlwcGV0IGVycmxuXG5cdFN5c3RlbS5lcnIucHJpbnRsbihcIlxcJHsxOk1lc3NhZ2V9XCIpO1xuIyNcbiMjIEV4Y2VwdGlvbiBIYW5kbGluZ1xuc25pcHBldCBhc1xuXHRhc3NlcnQgXFwkezE6dGVzdH0gOiBcIlxcJHsyOkZhaWx1cmUgbWVzc2FnZX1cIjtcXCR7M31cbnNuaXBwZXQgY2Fcblx0Y2F0Y2goXFwkezE6RXhjZXB0aW9ufSBcXCR7MjplfSkgXFwkezN9XG5zbmlwcGV0IHRoclxuXHR0aHJvd1xuc25pcHBldCB0aHNcblx0dGhyb3dzXG5zbmlwcGV0IHRyeVxuXHR0cnkge1xuXHRcdFxcJHszfVxuXHR9IGNhdGNoKFxcJHsxOkV4Y2VwdGlvbn0gXFwkezI6ZX0pIHtcblx0fVxuc25pcHBldCB0cnlmXG5cdHRyeSB7XG5cdFx0XFwkezN9XG5cdH0gY2F0Y2goXFwkezE6RXhjZXB0aW9ufSBcXCR7MjplfSkge1xuXHR9IGZpbmFsbHkge1xuXHR9XG4jI1xuIyMgRmluZCBNZXRob2RzXG5zbmlwcGV0IGZpbmRhbGxcblx0TGlzdDxcXCR7MTpsaXN0TmFtZX0+IFxcJHsyOml0ZW1zfSA9IFxcJHsxfS5maW5kQWxsKCk7XFwkezN9XG5zbmlwcGV0IGZpbmRieWlkXG5cdFxcJHsxOnZhcn0gXFwkezI6aXRlbX0gPSBcXCR7MX0uZmluZEJ5SWQoXFwkezN9KTtcXCR7NH1cbiMjXG4jIyBKYXZhZG9jc1xuc25pcHBldCAvKipcblx0LyoqXG5cdCAqIFxcJHsxfVxuXHQgKi9cbnNuaXBwZXQgQGF1XG5cdEBhdXRob3IgXFxgc3lzdGVtKFwiZ3JlcCBcXFxcXFxgaWQgLXVuXFxcXFxcYCAvZXRjL3Bhc3N3ZCB8IGN1dCAtZCBcXFxcXCI6XFxcXFwiIC1mNSB8IGN1dCAtZCBcXFxcXCIsXFxcXFwiIC1mMVwiKVxcYFxuc25pcHBldCBAYnJcblx0QGJyaWVmIFxcJHsxOkRlc2NyaXB0aW9ufVxuc25pcHBldCBAZmlcblx0QGZpbGUgXFwkezE6XFxgRmlsZW5hbWUoKVxcYH0uamF2YVxuc25pcHBldCBAcGFcblx0QHBhcmFtIFxcJHsxOnBhcmFtfVxuc25pcHBldCBAcmVcblx0QHJldHVybiBcXCR7MTpwYXJhbX1cbiMjXG4jIyBMb2dnZXIgTWV0aG9kc1xuc25pcHBldCBkZWJ1Z1xuXHRMb2dnZXIuZGVidWcoXFwkezE6cGFyYW19KTtcXCR7Mn1cbnNuaXBwZXQgZXJyb3Jcblx0TG9nZ2VyLmVycm9yKFxcJHsxOnBhcmFtfSk7XFwkezJ9XG5zbmlwcGV0IGluZm9cblx0TG9nZ2VyLmluZm8oXFwkezE6cGFyYW19KTtcXCR7Mn1cbnNuaXBwZXQgd2FyblxuXHRMb2dnZXIud2FybihcXCR7MTpwYXJhbX0pO1xcJHsyfVxuIyNcbiMjIExvb3BzXG5zbmlwcGV0IGVuZm9yXG5cdGZvciAoXFwkezF9IDogXFwkezJ9KSBcXCR7M31cbnNuaXBwZXQgZm9yXG5cdGZvciAoXFwkezF9OyBcXCR7Mn07IFxcJHszfSkgXFwkezR9XG5zbmlwcGV0IHdoXG5cdHdoaWxlIChcXCR7MX0pIFxcJHsyfVxuIyNcbiMjIE1haW4gbWV0aG9kXG5zbmlwcGV0IG1haW5cblx0cHVibGljIHN0YXRpYyB2b2lkIG1haW4gKFN0cmluZ1tdIGFyZ3MpIHtcblx0XHRcXCR7MTovKiBjb2RlICovfVxuXHR9XG4jI1xuIyMgUHJpbnQgTWV0aG9kc1xuc25pcHBldCBwcmludFxuXHRTeXN0ZW0ub3V0LnByaW50KFwiXFwkezE6TWVzc2FnZX1cIik7XG5zbmlwcGV0IHByaW50ZlxuXHRTeXN0ZW0ub3V0LnByaW50ZihcIlxcJHsxOk1lc3NhZ2V9XCIsIFxcJHsyOmFyZ3N9KTtcbnNuaXBwZXQgcHJpbnRsblxuXHRTeXN0ZW0ub3V0LnByaW50bG4oXFwkezF9KTtcbiMjXG4jIyBSZW5kZXIgTWV0aG9kc1xuc25pcHBldCByZW5cblx0cmVuZGVyKFxcJHsxOnBhcmFtfSk7XFwkezJ9XG5zbmlwcGV0IHJlbmFcblx0cmVuZGVyQXJncy5wdXQoXCJcXCR7MX1cIiwgXFwkezJ9KTtcXCR7M31cbnNuaXBwZXQgcmVuYlxuXHRyZW5kZXJCaW5hcnkoXFwkezE6cGFyYW19KTtcXCR7Mn1cbnNuaXBwZXQgcmVualxuXHRyZW5kZXJKU09OKFxcJHsxOnBhcmFtfSk7XFwkezJ9XG5zbmlwcGV0IHJlbnhcblx0cmVuZGVyWG1sKFxcJHsxOnBhcmFtfSk7XFwkezJ9XG4jI1xuIyMgU2V0dGVyIGFuZCBHZXR0ZXIgTWV0aG9kc1xuc25pcHBldCBzZXRcblx0XFwkezE6cHVibGljfSB2b2lkIHNldFxcJHszOn0oXFwkezI6U3RyaW5nfSBcXCR7NDp9KXtcblx0XHR0aGlzLlxcJDQgPSBcXCQ0O1xuXHR9XG5zbmlwcGV0IGdldFxuXHRcXCR7MTpwdWJsaWN9IFxcJHsyOlN0cmluZ30gZ2V0XFwkezM6fSgpe1xuXHRcdHJldHVybiB0aGlzLlxcJHs0On07XG5cdH1cbiMjXG4jIyBUZXJtaW5hdGUgTWV0aG9kcyBvciBMb29wc1xuc25pcHBldCByZVxuXHRyZXR1cm5cbnNuaXBwZXQgYnJcblx0YnJlYWs7XG4jI1xuIyMgVGVzdCBNZXRob2RzXG5zbmlwcGV0IHRcblx0cHVibGljIHZvaWQgdGVzdFxcJHsxOk5hbWV9KCkgdGhyb3dzIEV4Y2VwdGlvbiB7XG5cdFx0XFwkezJ9XG5cdH1cbnNuaXBwZXQgdGVzdFxuXHRAVGVzdFxuXHRwdWJsaWMgdm9pZCB0ZXN0XFwkezE6TmFtZX0oKSB0aHJvd3MgRXhjZXB0aW9uIHtcblx0XHRcXCR7Mn1cblx0fVxuIyNcbiMjIFV0aWxzXG5zbmlwcGV0IFNjXG5cdFNjYW5uZXJcbiMjXG4jIyBNaXNjZWxsYW5lb3VzXG5zbmlwcGV0IGFjdGlvblxuXHRwdWJsaWMgc3RhdGljIHZvaWQgXFwkezE6aW5kZXh9KFxcJHsyOmFyZ3N9KSB7IFxcJHszfSB9XG5zbmlwcGV0IHJuZlxuXHRub3RGb3VuZChcXCR7MTpwYXJhbX0pO1xcJHsyfVxuc25pcHBldCBybmZpblxuXHRub3RGb3VuZElmTnVsbChcXCR7MTpwYXJhbX0pO1xcJHsyfVxuc25pcHBldCByclxuXHRyZWRpcmVjdChcXCR7MTpwYXJhbX0pO1xcJHsyfVxuc25pcHBldCBydVxuXHR1bmF1dGhvcml6ZWQoXFwkezE6cGFyYW19KTtcXCR7Mn1cbnNuaXBwZXQgdW5sZXNzXG5cdCh1bmxlc3M9XFwkezE6cGFyYW19KTtcXCR7Mn1cbmA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=