(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[793],{

/***/ 10793:
/***/ ((module) => {

module.exports = `snippet lib
	library \${1};
	\${2}
snippet im
	import '\${1}';
	\${2}
snippet pa
	part '\${1}';
	\${2}
snippet pao
	part of \${1};
	\${2}
snippet main
	void main() {
	  \${1:/* code */}
	}
snippet st
	static \${1}
snippet fi
	final \${1}
snippet re
	return \${1}
snippet br
	break;
snippet th
	throw \${1}
snippet cl
	class \${1:\`Filename("", "untitled")\`} \${2}
snippet imp
	implements \${1}
snippet ext
	extends \${1}
snippet if
	if (\${1:true}) {
	  \${2}
	}
snippet ife
	if (\${1:true}) {
	  \${2}
	} else {
	  \${3}
	}
snippet el
	else
snippet sw
	switch (\${1}) {
	  \${2}
	}
snippet cs
	case \${1}:
	  \${2}
snippet de
	default:
	  \${1}
snippet for
	for (var \${2:i} = 0, len = \${1:things}.length; \$2 < len; \${3:++}\$2) {
	  \${4:\$1[\$2]}
	}
snippet fore
	for (final \${2:item} in \${1:itemList}) {
	  \${3:/* code */}
	}
snippet wh
	while (\${1:/* condition */}) {
	  \${2:/* code */}
	}
snippet dowh
	do {
	  \${2:/* code */}
	} while (\${1:/* condition */});
snippet as
	assert(\${1:/* condition */});
snippet try
	try {
	  \${2}
	} catch (\${1:Exception e}) {
	}
snippet tryf
	try {
	  \${2}
	} catch (\${1:Exception e}) {
	} finally {
	}
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjc5My5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0EsWUFBWTtBQUNaLElBQUk7QUFDSjtBQUNBLFlBQVksRUFBRTtBQUNkLElBQUk7QUFDSjtBQUNBLFVBQVUsRUFBRTtBQUNaLElBQUk7QUFDSjtBQUNBLFlBQVk7QUFDWixJQUFJO0FBQ0o7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLFVBQVUsZ0NBQWdDLEdBQUc7QUFDN0M7QUFDQSxlQUFlO0FBQ2Y7QUFDQSxZQUFZO0FBQ1o7QUFDQSxRQUFRLE9BQU87QUFDZixNQUFNO0FBQ047QUFDQTtBQUNBLFFBQVEsT0FBTztBQUNmLE1BQU07QUFDTixHQUFHO0FBQ0gsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxFQUFFO0FBQ2QsTUFBTTtBQUNOO0FBQ0E7QUFDQSxTQUFTLEVBQUU7QUFDWCxNQUFNO0FBQ047QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBLGFBQWEsS0FBSyxjQUFjLFNBQVMsU0FBUyxXQUFXLEdBQUcsS0FBSztBQUNyRSxNQUFNO0FBQ047QUFDQTtBQUNBLGVBQWUsUUFBUSxNQUFNLFdBQVc7QUFDeEMsTUFBTTtBQUNOO0FBQ0E7QUFDQSxXQUFXLGtCQUFrQjtBQUM3QixNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEdBQUcsVUFBVSxrQkFBa0I7QUFDL0I7QUFDQSxXQUFXLGtCQUFrQjtBQUM3QjtBQUNBO0FBQ0EsTUFBTTtBQUNOLEdBQUcsVUFBVSxjQUFjO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixHQUFHLFVBQVUsY0FBYztBQUMzQixHQUFHO0FBQ0g7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL2RhcnQuc25pcHBldHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBgc25pcHBldCBsaWJcblx0bGlicmFyeSBcXCR7MX07XG5cdFxcJHsyfVxuc25pcHBldCBpbVxuXHRpbXBvcnQgJ1xcJHsxfSc7XG5cdFxcJHsyfVxuc25pcHBldCBwYVxuXHRwYXJ0ICdcXCR7MX0nO1xuXHRcXCR7Mn1cbnNuaXBwZXQgcGFvXG5cdHBhcnQgb2YgXFwkezF9O1xuXHRcXCR7Mn1cbnNuaXBwZXQgbWFpblxuXHR2b2lkIG1haW4oKSB7XG5cdCAgXFwkezE6LyogY29kZSAqL31cblx0fVxuc25pcHBldCBzdFxuXHRzdGF0aWMgXFwkezF9XG5zbmlwcGV0IGZpXG5cdGZpbmFsIFxcJHsxfVxuc25pcHBldCByZVxuXHRyZXR1cm4gXFwkezF9XG5zbmlwcGV0IGJyXG5cdGJyZWFrO1xuc25pcHBldCB0aFxuXHR0aHJvdyBcXCR7MX1cbnNuaXBwZXQgY2xcblx0Y2xhc3MgXFwkezE6XFxgRmlsZW5hbWUoXCJcIiwgXCJ1bnRpdGxlZFwiKVxcYH0gXFwkezJ9XG5zbmlwcGV0IGltcFxuXHRpbXBsZW1lbnRzIFxcJHsxfVxuc25pcHBldCBleHRcblx0ZXh0ZW5kcyBcXCR7MX1cbnNuaXBwZXQgaWZcblx0aWYgKFxcJHsxOnRydWV9KSB7XG5cdCAgXFwkezJ9XG5cdH1cbnNuaXBwZXQgaWZlXG5cdGlmIChcXCR7MTp0cnVlfSkge1xuXHQgIFxcJHsyfVxuXHR9IGVsc2Uge1xuXHQgIFxcJHszfVxuXHR9XG5zbmlwcGV0IGVsXG5cdGVsc2VcbnNuaXBwZXQgc3dcblx0c3dpdGNoIChcXCR7MX0pIHtcblx0ICBcXCR7Mn1cblx0fVxuc25pcHBldCBjc1xuXHRjYXNlIFxcJHsxfTpcblx0ICBcXCR7Mn1cbnNuaXBwZXQgZGVcblx0ZGVmYXVsdDpcblx0ICBcXCR7MX1cbnNuaXBwZXQgZm9yXG5cdGZvciAodmFyIFxcJHsyOml9ID0gMCwgbGVuID0gXFwkezE6dGhpbmdzfS5sZW5ndGg7IFxcJDIgPCBsZW47IFxcJHszOisrfVxcJDIpIHtcblx0ICBcXCR7NDpcXCQxW1xcJDJdfVxuXHR9XG5zbmlwcGV0IGZvcmVcblx0Zm9yIChmaW5hbCBcXCR7MjppdGVtfSBpbiBcXCR7MTppdGVtTGlzdH0pIHtcblx0ICBcXCR7MzovKiBjb2RlICovfVxuXHR9XG5zbmlwcGV0IHdoXG5cdHdoaWxlIChcXCR7MTovKiBjb25kaXRpb24gKi99KSB7XG5cdCAgXFwkezI6LyogY29kZSAqL31cblx0fVxuc25pcHBldCBkb3doXG5cdGRvIHtcblx0ICBcXCR7MjovKiBjb2RlICovfVxuXHR9IHdoaWxlIChcXCR7MTovKiBjb25kaXRpb24gKi99KTtcbnNuaXBwZXQgYXNcblx0YXNzZXJ0KFxcJHsxOi8qIGNvbmRpdGlvbiAqL30pO1xuc25pcHBldCB0cnlcblx0dHJ5IHtcblx0ICBcXCR7Mn1cblx0fSBjYXRjaCAoXFwkezE6RXhjZXB0aW9uIGV9KSB7XG5cdH1cbnNuaXBwZXQgdHJ5ZlxuXHR0cnkge1xuXHQgIFxcJHsyfVxuXHR9IGNhdGNoIChcXCR7MTpFeGNlcHRpb24gZX0pIHtcblx0fSBmaW5hbGx5IHtcblx0fVxuYDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==