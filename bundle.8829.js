(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[8829],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjg4MjkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBLFlBQVk7QUFDWixJQUFJO0FBQ0o7QUFDQSxZQUFZLEVBQUU7QUFDZCxJQUFJO0FBQ0o7QUFDQSxVQUFVLEVBQUU7QUFDWixJQUFJO0FBQ0o7QUFDQSxZQUFZO0FBQ1osSUFBSTtBQUNKO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFVBQVU7QUFDVjtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxVQUFVLGdDQUFnQyxHQUFHO0FBQzdDO0FBQ0EsZUFBZTtBQUNmO0FBQ0EsWUFBWTtBQUNaO0FBQ0EsUUFBUSxPQUFPO0FBQ2YsTUFBTTtBQUNOO0FBQ0E7QUFDQSxRQUFRLE9BQU87QUFDZixNQUFNO0FBQ04sR0FBRztBQUNILE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksRUFBRTtBQUNkLE1BQU07QUFDTjtBQUNBO0FBQ0EsU0FBUyxFQUFFO0FBQ1gsTUFBTTtBQUNOO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQSxhQUFhLEtBQUssY0FBYyxTQUFTLFNBQVMsV0FBVyxHQUFHLEtBQUs7QUFDckUsTUFBTTtBQUNOO0FBQ0E7QUFDQSxlQUFlLFFBQVEsTUFBTSxXQUFXO0FBQ3hDLE1BQU07QUFDTjtBQUNBO0FBQ0EsV0FBVyxrQkFBa0I7QUFDN0IsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTixHQUFHLFVBQVUsa0JBQWtCO0FBQy9CO0FBQ0EsV0FBVyxrQkFBa0I7QUFDN0I7QUFDQTtBQUNBLE1BQU07QUFDTixHQUFHLFVBQVUsY0FBYztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sR0FBRyxVQUFVLGNBQWM7QUFDM0IsR0FBRztBQUNIO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy9kYXJ0LnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gYHNuaXBwZXQgbGliXG5cdGxpYnJhcnkgXFwkezF9O1xuXHRcXCR7Mn1cbnNuaXBwZXQgaW1cblx0aW1wb3J0ICdcXCR7MX0nO1xuXHRcXCR7Mn1cbnNuaXBwZXQgcGFcblx0cGFydCAnXFwkezF9Jztcblx0XFwkezJ9XG5zbmlwcGV0IHBhb1xuXHRwYXJ0IG9mIFxcJHsxfTtcblx0XFwkezJ9XG5zbmlwcGV0IG1haW5cblx0dm9pZCBtYWluKCkge1xuXHQgIFxcJHsxOi8qIGNvZGUgKi99XG5cdH1cbnNuaXBwZXQgc3Rcblx0c3RhdGljIFxcJHsxfVxuc25pcHBldCBmaVxuXHRmaW5hbCBcXCR7MX1cbnNuaXBwZXQgcmVcblx0cmV0dXJuIFxcJHsxfVxuc25pcHBldCBiclxuXHRicmVhaztcbnNuaXBwZXQgdGhcblx0dGhyb3cgXFwkezF9XG5zbmlwcGV0IGNsXG5cdGNsYXNzIFxcJHsxOlxcYEZpbGVuYW1lKFwiXCIsIFwidW50aXRsZWRcIilcXGB9IFxcJHsyfVxuc25pcHBldCBpbXBcblx0aW1wbGVtZW50cyBcXCR7MX1cbnNuaXBwZXQgZXh0XG5cdGV4dGVuZHMgXFwkezF9XG5zbmlwcGV0IGlmXG5cdGlmIChcXCR7MTp0cnVlfSkge1xuXHQgIFxcJHsyfVxuXHR9XG5zbmlwcGV0IGlmZVxuXHRpZiAoXFwkezE6dHJ1ZX0pIHtcblx0ICBcXCR7Mn1cblx0fSBlbHNlIHtcblx0ICBcXCR7M31cblx0fVxuc25pcHBldCBlbFxuXHRlbHNlXG5zbmlwcGV0IHN3XG5cdHN3aXRjaCAoXFwkezF9KSB7XG5cdCAgXFwkezJ9XG5cdH1cbnNuaXBwZXQgY3Ncblx0Y2FzZSBcXCR7MX06XG5cdCAgXFwkezJ9XG5zbmlwcGV0IGRlXG5cdGRlZmF1bHQ6XG5cdCAgXFwkezF9XG5zbmlwcGV0IGZvclxuXHRmb3IgKHZhciBcXCR7MjppfSA9IDAsIGxlbiA9IFxcJHsxOnRoaW5nc30ubGVuZ3RoOyBcXCQyIDwgbGVuOyBcXCR7MzorK31cXCQyKSB7XG5cdCAgXFwkezQ6XFwkMVtcXCQyXX1cblx0fVxuc25pcHBldCBmb3JlXG5cdGZvciAoZmluYWwgXFwkezI6aXRlbX0gaW4gXFwkezE6aXRlbUxpc3R9KSB7XG5cdCAgXFwkezM6LyogY29kZSAqL31cblx0fVxuc25pcHBldCB3aFxuXHR3aGlsZSAoXFwkezE6LyogY29uZGl0aW9uICovfSkge1xuXHQgIFxcJHsyOi8qIGNvZGUgKi99XG5cdH1cbnNuaXBwZXQgZG93aFxuXHRkbyB7XG5cdCAgXFwkezI6LyogY29kZSAqL31cblx0fSB3aGlsZSAoXFwkezE6LyogY29uZGl0aW9uICovfSk7XG5zbmlwcGV0IGFzXG5cdGFzc2VydChcXCR7MTovKiBjb25kaXRpb24gKi99KTtcbnNuaXBwZXQgdHJ5XG5cdHRyeSB7XG5cdCAgXFwkezJ9XG5cdH0gY2F0Y2ggKFxcJHsxOkV4Y2VwdGlvbiBlfSkge1xuXHR9XG5zbmlwcGV0IHRyeWZcblx0dHJ5IHtcblx0ICBcXCR7Mn1cblx0fSBjYXRjaCAoXFwkezE6RXhjZXB0aW9uIGV9KSB7XG5cdH0gZmluYWxseSB7XG5cdH1cbmA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=