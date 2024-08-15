(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8137,8829],{

/***/ 20518:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(18829);
exports.scope = "dart";


/***/ }),

/***/ 18829:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjgxMzcuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsZ0RBQWdEO0FBQ2hELGFBQWE7Ozs7Ozs7O0FDSGI7QUFDQSxZQUFZO0FBQ1osSUFBSTtBQUNKO0FBQ0EsWUFBWSxFQUFFO0FBQ2QsSUFBSTtBQUNKO0FBQ0EsVUFBVSxFQUFFO0FBQ1osSUFBSTtBQUNKO0FBQ0EsWUFBWTtBQUNaLElBQUk7QUFDSjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0EsVUFBVSxnQ0FBZ0MsR0FBRztBQUM3QztBQUNBLGVBQWU7QUFDZjtBQUNBLFlBQVk7QUFDWjtBQUNBLFFBQVEsT0FBTztBQUNmLE1BQU07QUFDTjtBQUNBO0FBQ0EsUUFBUSxPQUFPO0FBQ2YsTUFBTTtBQUNOLEdBQUc7QUFDSCxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLEVBQUU7QUFDZCxNQUFNO0FBQ047QUFDQTtBQUNBLFNBQVMsRUFBRTtBQUNYLE1BQU07QUFDTjtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0EsYUFBYSxLQUFLLGNBQWMsU0FBUyxTQUFTLFdBQVcsR0FBRyxLQUFLO0FBQ3JFLE1BQU07QUFDTjtBQUNBO0FBQ0EsZUFBZSxRQUFRLE1BQU0sV0FBVztBQUN4QyxNQUFNO0FBQ047QUFDQTtBQUNBLFdBQVcsa0JBQWtCO0FBQzdCLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sR0FBRyxVQUFVLGtCQUFrQjtBQUMvQjtBQUNBLFdBQVcsa0JBQWtCO0FBQzdCO0FBQ0E7QUFDQSxNQUFNO0FBQ04sR0FBRyxVQUFVLGNBQWM7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLEdBQUcsVUFBVSxjQUFjO0FBQzNCLEdBQUc7QUFDSDtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvZGFydC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy9kYXJ0LnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLnNuaXBwZXRUZXh0ID0gcmVxdWlyZShcIi4vZGFydC5zbmlwcGV0c1wiKTtcbmV4cG9ydHMuc2NvcGUgPSBcImRhcnRcIjtcbiIsIm1vZHVsZS5leHBvcnRzID0gYHNuaXBwZXQgbGliXG5cdGxpYnJhcnkgXFwkezF9O1xuXHRcXCR7Mn1cbnNuaXBwZXQgaW1cblx0aW1wb3J0ICdcXCR7MX0nO1xuXHRcXCR7Mn1cbnNuaXBwZXQgcGFcblx0cGFydCAnXFwkezF9Jztcblx0XFwkezJ9XG5zbmlwcGV0IHBhb1xuXHRwYXJ0IG9mIFxcJHsxfTtcblx0XFwkezJ9XG5zbmlwcGV0IG1haW5cblx0dm9pZCBtYWluKCkge1xuXHQgIFxcJHsxOi8qIGNvZGUgKi99XG5cdH1cbnNuaXBwZXQgc3Rcblx0c3RhdGljIFxcJHsxfVxuc25pcHBldCBmaVxuXHRmaW5hbCBcXCR7MX1cbnNuaXBwZXQgcmVcblx0cmV0dXJuIFxcJHsxfVxuc25pcHBldCBiclxuXHRicmVhaztcbnNuaXBwZXQgdGhcblx0dGhyb3cgXFwkezF9XG5zbmlwcGV0IGNsXG5cdGNsYXNzIFxcJHsxOlxcYEZpbGVuYW1lKFwiXCIsIFwidW50aXRsZWRcIilcXGB9IFxcJHsyfVxuc25pcHBldCBpbXBcblx0aW1wbGVtZW50cyBcXCR7MX1cbnNuaXBwZXQgZXh0XG5cdGV4dGVuZHMgXFwkezF9XG5zbmlwcGV0IGlmXG5cdGlmIChcXCR7MTp0cnVlfSkge1xuXHQgIFxcJHsyfVxuXHR9XG5zbmlwcGV0IGlmZVxuXHRpZiAoXFwkezE6dHJ1ZX0pIHtcblx0ICBcXCR7Mn1cblx0fSBlbHNlIHtcblx0ICBcXCR7M31cblx0fVxuc25pcHBldCBlbFxuXHRlbHNlXG5zbmlwcGV0IHN3XG5cdHN3aXRjaCAoXFwkezF9KSB7XG5cdCAgXFwkezJ9XG5cdH1cbnNuaXBwZXQgY3Ncblx0Y2FzZSBcXCR7MX06XG5cdCAgXFwkezJ9XG5zbmlwcGV0IGRlXG5cdGRlZmF1bHQ6XG5cdCAgXFwkezF9XG5zbmlwcGV0IGZvclxuXHRmb3IgKHZhciBcXCR7MjppfSA9IDAsIGxlbiA9IFxcJHsxOnRoaW5nc30ubGVuZ3RoOyBcXCQyIDwgbGVuOyBcXCR7MzorK31cXCQyKSB7XG5cdCAgXFwkezQ6XFwkMVtcXCQyXX1cblx0fVxuc25pcHBldCBmb3JlXG5cdGZvciAoZmluYWwgXFwkezI6aXRlbX0gaW4gXFwkezE6aXRlbUxpc3R9KSB7XG5cdCAgXFwkezM6LyogY29kZSAqL31cblx0fVxuc25pcHBldCB3aFxuXHR3aGlsZSAoXFwkezE6LyogY29uZGl0aW9uICovfSkge1xuXHQgIFxcJHsyOi8qIGNvZGUgKi99XG5cdH1cbnNuaXBwZXQgZG93aFxuXHRkbyB7XG5cdCAgXFwkezI6LyogY29kZSAqL31cblx0fSB3aGlsZSAoXFwkezE6LyogY29uZGl0aW9uICovfSk7XG5zbmlwcGV0IGFzXG5cdGFzc2VydChcXCR7MTovKiBjb25kaXRpb24gKi99KTtcbnNuaXBwZXQgdHJ5XG5cdHRyeSB7XG5cdCAgXFwkezJ9XG5cdH0gY2F0Y2ggKFxcJHsxOkV4Y2VwdGlvbiBlfSkge1xuXHR9XG5zbmlwcGV0IHRyeWZcblx0dHJ5IHtcblx0ICBcXCR7Mn1cblx0fSBjYXRjaCAoXFwkezE6RXhjZXB0aW9uIGV9KSB7XG5cdH0gZmluYWxseSB7XG5cdH1cbmA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=