(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[9253,2177],{

/***/ 99253:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(2177);
exports.scope = "markdown";


/***/ }),

/***/ 2177:
/***/ ((module) => {

module.exports = `# Markdown

# Includes octopress (http://octopress.org/) snippets

snippet [
	[\${1:text}](http://\${2:address} "\${3:title}")
snippet [*
	[\${1:link}](\${2:\`@*\`} "\${3:title}")\${4}

snippet [:
	[\${1:id}]: http://\${2:url} "\${3:title}"
snippet [:*
	[\${1:id}]: \${2:\`@*\`} "\${3:title}"

snippet ![
	![\${1:alttext}](\${2:/images/image.jpg} "\${3:title}")
snippet ![*
	![\${1:alt}](\${2:\`@*\`} "\${3:title}")\${4}

snippet ![:
	![\${1:id}]: \${2:url} "\${3:title}"
snippet ![:*
	![\${1:id}]: \${2:\`@*\`} "\${3:title}"

snippet ===
regex /^/=+/=*//
	\${PREV_LINE/./=/g}
	
	\${0}
snippet ---
regex /^/-+/-*//
	\${PREV_LINE/./-/g}
	
	\${0}
snippet blockquote
	{% blockquote %}
	\${1:quote}
	{% endblockquote %}

snippet blockquote-author
	{% blockquote \${1:author}, \${2:title} %}
	\${3:quote}
	{% endblockquote %}

snippet blockquote-link
	{% blockquote \${1:author} \${2:URL} \${3:link_text} %}
	\${4:quote}
	{% endblockquote %}

snippet bt-codeblock-short
	\`\`\`
	\${1:code_snippet}
	\`\`\`

snippet bt-codeblock-full
	\`\`\` \${1:language} \${2:title} \${3:URL} \${4:link_text}
	\${5:code_snippet}
	\`\`\`

snippet codeblock-short
	{% codeblock %}
	\${1:code_snippet}
	{% endcodeblock %}

snippet codeblock-full
	{% codeblock \${1:title} lang:\${2:language} \${3:URL} \${4:link_text} %}
	\${5:code_snippet}
	{% endcodeblock %}

snippet gist-full
	{% gist \${1:gist_id} \${2:filename} %}

snippet gist-short
	{% gist \${1:gist_id} %}

snippet img
	{% img \${1:class} \${2:URL} \${3:width} \${4:height} \${5:title_text} \${6:alt_text} %}

snippet youtube
	{% youtube \${1:video_id} %}

# The quote should appear only once in the text. It is inherently part of it.
# See http://octopress.org/docs/plugins/pullquote/ for more info.

snippet pullquote
	{% pullquote %}
	\${1:text} {" \${2:quote} "} \${3:text}
	{% endpullquote %}
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjkyNTMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsK0NBQW9EO0FBQ3BELGFBQWE7Ozs7Ozs7O0FDSGI7O0FBRUE7O0FBRUE7QUFDQSxLQUFLLE9BQU8sWUFBWSxXQUFXLElBQUksUUFBUTtBQUMvQztBQUNBLEtBQUssT0FBTyxLQUFLLFVBQVUsSUFBSSxRQUFRLEtBQUs7O0FBRTVDO0FBQ0EsS0FBSyxLQUFLLGFBQWEsT0FBTyxJQUFJLFFBQVE7QUFDMUM7QUFDQSxLQUFLLEtBQUssTUFBTSxVQUFVLElBQUksUUFBUTs7QUFFdEM7QUFDQSxNQUFNLFVBQVUsS0FBSyxxQkFBcUIsSUFBSSxRQUFRO0FBQ3REO0FBQ0EsTUFBTSxNQUFNLEtBQUssVUFBVSxJQUFJLFFBQVEsS0FBSzs7QUFFNUM7QUFDQSxNQUFNLEtBQUssTUFBTSxPQUFPLElBQUksUUFBUTtBQUNwQztBQUNBLE1BQU0sS0FBSyxNQUFNLFVBQVUsSUFBSSxRQUFROztBQUV2QztBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQSxJQUFJO0FBQ0o7QUFDQSxFQUFFO0FBQ0YsSUFBSTtBQUNKLEVBQUU7O0FBRUY7QUFDQSxFQUFFLGdCQUFnQixTQUFTLEtBQUssU0FBUztBQUN6QyxJQUFJO0FBQ0osRUFBRTs7QUFFRjtBQUNBLEVBQUUsZ0JBQWdCLFVBQVUsR0FBRyxPQUFPLEdBQUcsYUFBYTtBQUN0RCxJQUFJO0FBQ0osRUFBRTs7QUFFRjtBQUNBO0FBQ0EsSUFBSTtBQUNKOztBQUVBO0FBQ0EsV0FBVyxZQUFZLEdBQUcsU0FBUyxHQUFHLE9BQU8sR0FBRztBQUNoRCxJQUFJO0FBQ0o7O0FBRUE7QUFDQSxFQUFFO0FBQ0YsSUFBSTtBQUNKLEVBQUU7O0FBRUY7QUFDQSxFQUFFLGVBQWUsU0FBUyxRQUFRLFlBQVksR0FBRyxPQUFPLEdBQUcsYUFBYTtBQUN4RSxJQUFJO0FBQ0osRUFBRTs7QUFFRjtBQUNBLEVBQUUsVUFBVSxXQUFXLEdBQUcsWUFBWTs7QUFFdEM7QUFDQSxFQUFFLFVBQVUsV0FBVzs7QUFFdkI7QUFDQSxFQUFFLFNBQVMsU0FBUyxHQUFHLE9BQU8sR0FBRyxTQUFTLEdBQUcsVUFBVSxHQUFHLGNBQWMsR0FBRyxZQUFZOztBQUV2RjtBQUNBLEVBQUUsYUFBYSxZQUFZOztBQUUzQjtBQUNBOztBQUVBO0FBQ0EsRUFBRTtBQUNGLElBQUksU0FBUyxLQUFLLFNBQVMsR0FBRyxHQUFHO0FBQ2pDLEVBQUU7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL21hcmtkb3duLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL3NuaXBwZXRzL21hcmtkb3duLnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLnNuaXBwZXRUZXh0ID0gcmVxdWlyZShcIi4vbWFya2Rvd24uc25pcHBldHNcIik7XG5leHBvcnRzLnNjb3BlID0gXCJtYXJrZG93blwiO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBgIyBNYXJrZG93blxuXG4jIEluY2x1ZGVzIG9jdG9wcmVzcyAoaHR0cDovL29jdG9wcmVzcy5vcmcvKSBzbmlwcGV0c1xuXG5zbmlwcGV0IFtcblx0W1xcJHsxOnRleHR9XShodHRwOi8vXFwkezI6YWRkcmVzc30gXCJcXCR7Mzp0aXRsZX1cIilcbnNuaXBwZXQgWypcblx0W1xcJHsxOmxpbmt9XShcXCR7MjpcXGBAKlxcYH0gXCJcXCR7Mzp0aXRsZX1cIilcXCR7NH1cblxuc25pcHBldCBbOlxuXHRbXFwkezE6aWR9XTogaHR0cDovL1xcJHsyOnVybH0gXCJcXCR7Mzp0aXRsZX1cIlxuc25pcHBldCBbOipcblx0W1xcJHsxOmlkfV06IFxcJHsyOlxcYEAqXFxgfSBcIlxcJHszOnRpdGxlfVwiXG5cbnNuaXBwZXQgIVtcblx0IVtcXCR7MTphbHR0ZXh0fV0oXFwkezI6L2ltYWdlcy9pbWFnZS5qcGd9IFwiXFwkezM6dGl0bGV9XCIpXG5zbmlwcGV0ICFbKlxuXHQhW1xcJHsxOmFsdH1dKFxcJHsyOlxcYEAqXFxgfSBcIlxcJHszOnRpdGxlfVwiKVxcJHs0fVxuXG5zbmlwcGV0ICFbOlxuXHQhW1xcJHsxOmlkfV06IFxcJHsyOnVybH0gXCJcXCR7Mzp0aXRsZX1cIlxuc25pcHBldCAhWzoqXG5cdCFbXFwkezE6aWR9XTogXFwkezI6XFxgQCpcXGB9IFwiXFwkezM6dGl0bGV9XCJcblxuc25pcHBldCA9PT1cbnJlZ2V4IC9eLz0rLz0qLy9cblx0XFwke1BSRVZfTElORS8uLz0vZ31cblx0XG5cdFxcJHswfVxuc25pcHBldCAtLS1cbnJlZ2V4IC9eLy0rLy0qLy9cblx0XFwke1BSRVZfTElORS8uLy0vZ31cblx0XG5cdFxcJHswfVxuc25pcHBldCBibG9ja3F1b3RlXG5cdHslIGJsb2NrcXVvdGUgJX1cblx0XFwkezE6cXVvdGV9XG5cdHslIGVuZGJsb2NrcXVvdGUgJX1cblxuc25pcHBldCBibG9ja3F1b3RlLWF1dGhvclxuXHR7JSBibG9ja3F1b3RlIFxcJHsxOmF1dGhvcn0sIFxcJHsyOnRpdGxlfSAlfVxuXHRcXCR7MzpxdW90ZX1cblx0eyUgZW5kYmxvY2txdW90ZSAlfVxuXG5zbmlwcGV0IGJsb2NrcXVvdGUtbGlua1xuXHR7JSBibG9ja3F1b3RlIFxcJHsxOmF1dGhvcn0gXFwkezI6VVJMfSBcXCR7MzpsaW5rX3RleHR9ICV9XG5cdFxcJHs0OnF1b3RlfVxuXHR7JSBlbmRibG9ja3F1b3RlICV9XG5cbnNuaXBwZXQgYnQtY29kZWJsb2NrLXNob3J0XG5cdFxcYFxcYFxcYFxuXHRcXCR7MTpjb2RlX3NuaXBwZXR9XG5cdFxcYFxcYFxcYFxuXG5zbmlwcGV0IGJ0LWNvZGVibG9jay1mdWxsXG5cdFxcYFxcYFxcYCBcXCR7MTpsYW5ndWFnZX0gXFwkezI6dGl0bGV9IFxcJHszOlVSTH0gXFwkezQ6bGlua190ZXh0fVxuXHRcXCR7NTpjb2RlX3NuaXBwZXR9XG5cdFxcYFxcYFxcYFxuXG5zbmlwcGV0IGNvZGVibG9jay1zaG9ydFxuXHR7JSBjb2RlYmxvY2sgJX1cblx0XFwkezE6Y29kZV9zbmlwcGV0fVxuXHR7JSBlbmRjb2RlYmxvY2sgJX1cblxuc25pcHBldCBjb2RlYmxvY2stZnVsbFxuXHR7JSBjb2RlYmxvY2sgXFwkezE6dGl0bGV9IGxhbmc6XFwkezI6bGFuZ3VhZ2V9IFxcJHszOlVSTH0gXFwkezQ6bGlua190ZXh0fSAlfVxuXHRcXCR7NTpjb2RlX3NuaXBwZXR9XG5cdHslIGVuZGNvZGVibG9jayAlfVxuXG5zbmlwcGV0IGdpc3QtZnVsbFxuXHR7JSBnaXN0IFxcJHsxOmdpc3RfaWR9IFxcJHsyOmZpbGVuYW1lfSAlfVxuXG5zbmlwcGV0IGdpc3Qtc2hvcnRcblx0eyUgZ2lzdCBcXCR7MTpnaXN0X2lkfSAlfVxuXG5zbmlwcGV0IGltZ1xuXHR7JSBpbWcgXFwkezE6Y2xhc3N9IFxcJHsyOlVSTH0gXFwkezM6d2lkdGh9IFxcJHs0OmhlaWdodH0gXFwkezU6dGl0bGVfdGV4dH0gXFwkezY6YWx0X3RleHR9ICV9XG5cbnNuaXBwZXQgeW91dHViZVxuXHR7JSB5b3V0dWJlIFxcJHsxOnZpZGVvX2lkfSAlfVxuXG4jIFRoZSBxdW90ZSBzaG91bGQgYXBwZWFyIG9ubHkgb25jZSBpbiB0aGUgdGV4dC4gSXQgaXMgaW5oZXJlbnRseSBwYXJ0IG9mIGl0LlxuIyBTZWUgaHR0cDovL29jdG9wcmVzcy5vcmcvZG9jcy9wbHVnaW5zL3B1bGxxdW90ZS8gZm9yIG1vcmUgaW5mby5cblxuc25pcHBldCBwdWxscXVvdGVcblx0eyUgcHVsbHF1b3RlICV9XG5cdFxcJHsxOnRleHR9IHtcIiBcXCR7MjpxdW90ZX0gXCJ9IFxcJHszOnRleHR9XG5cdHslIGVuZHB1bGxxdW90ZSAlfVxuYDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==