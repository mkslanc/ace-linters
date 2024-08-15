(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[275,7715],{

/***/ 80275:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(47715);
exports.scope = "tex";


/***/ }),

/***/ 47715:
/***/ ((module) => {

module.exports = `#PREAMBLE
#newcommand
snippet nc
	\\newcommand{\\\${1:cmd}}[\${2:opt}]{\${3:realcmd}}\${4}
#usepackage
snippet up
	\\usepackage[\${1:[options}]{\${2:package}}
#newunicodechar
snippet nuc
	\\newunicodechar{\${1}}{\${2:\\ensuremath}\${3:tex-substitute}}}
#DeclareMathOperator
snippet dmo
	\\DeclareMathOperator{\${1}}{\${2}}

#DOCUMENT
# \\begin{}...\\end{}
snippet begin
	\\begin{\${1:env}}
		\${2}
	\\end{\$1}
# Tabular
snippet tab
	\\begin{\${1:tabular}}{\${2:c}}
	\${3}
	\\end{\$1}
snippet thm
	\\begin[\${1:author}]{\${2:thm}}
	\${3}
	\\end{\$1}
snippet center
	\\begin{center}
		\${1}
	\\end{center}
# Align(ed)
snippet ali
	\\begin{align\${1:ed}}
		\${2}
	\\end{align\$1}
# Gather(ed)
snippet gat
	\\begin{gather\${1:ed}}
		\${2}
	\\end{gather\$1}
# Equation
snippet eq
	\\begin{equation}
		\${1}
	\\end{equation}
# Equation
snippet eq*
	\\begin{equation*}
		\${1}
	\\end{equation*}
# Unnumbered Equation
snippet \\
	\\[
		\${1}
	\\]
# Enumerate
snippet enum
	\\begin{enumerate}
		\\item \${1}
	\\end{enumerate}
# Itemize
snippet itemize
	\\begin{itemize}
		\\item \${1}
	\\end{itemize}
# Description
snippet desc
	\\begin{description}
		\\item[\${1}] \${2}
	\\end{description}
# Matrix
snippet mat
	\\begin{\${1:p/b/v/V/B/small}matrix}
		\${2}
	\\end{\$1matrix}
# Cases
snippet cas
	\\begin{cases}
		\${1:equation}, &\\text{ if }\${2:case}\\\\
		\${3}
	\\end{cases}
# Split
snippet spl
	\\begin{split}
		\${1}
	\\end{split}
# Part
snippet part
	\\part{\${1:part name}} % (fold)
	\\label{prt:\${2:\$1}}
	\${3}
	% part \$2 (end)
# Chapter
snippet cha
	\\chapter{\${1:chapter name}}
	\\label{cha:\${2:\$1}}
	\${3}
# Section
snippet sec
	\\section{\${1:section name}}
	\\label{sec:\${2:\$1}}
	\${3}
# Sub Section
snippet sub
	\\subsection{\${1:subsection name}}
	\\label{sub:\${2:\$1}}
	\${3}
# Sub Sub Section
snippet subs
	\\subsubsection{\${1:subsubsection name}}
	\\label{ssub:\${2:\$1}}
	\${3}
# Paragraph
snippet par
	\\paragraph{\${1:paragraph name}}
	\\label{par:\${2:\$1}}
	\${3}
# Sub Paragraph
snippet subp
	\\subparagraph{\${1:subparagraph name}}
	\\label{subp:\${2:\$1}}
	\${3}
#References
snippet itd
	\\item[\${1:description}] \${2:item}
snippet figure
	\${1:Figure}~\\ref{\${2:fig:}}\${3}
snippet table
	\${1:Table}~\\ref{\${2:tab:}}\${3}
snippet listing
	\${1:Listing}~\\ref{\${2:list}}\${3}
snippet section
	\${1:Section}~\\ref{\${2:sec:}}\${3}
snippet page
	\${1:page}~\\pageref{\${2}}\${3}
snippet index
	\\index{\${1:index}}\${2}
#Citations
snippet cite
	\\cite[\${1}]{\${2}}\${3}
snippet fcite
	\\footcite[\${1}]{\${2}}\${3}
#Formating text: italic, bold, underline, small capital, emphase ..
snippet it
	\\textit{\${1:text}}
snippet bf
	\\textbf{\${1:text}}
snippet under
	\\underline{\${1:text}}
snippet emp
	\\emph{\${1:text}}
snippet sc
	\\textsc{\${1:text}}
#Choosing font
snippet sf
	\\textsf{\${1:text}}
snippet rm
	\\textrm{\${1:text}}
snippet tt
	\\texttt{\${1:text}}
#misc
snippet ft
	\\footnote{\${1:text}}
snippet fig
	\\begin{figure}
	\\begin{center}
	    \\includegraphics[scale=\${1}]{Figures/\${2}}
	\\end{center}
	\\caption{\${3}}
	\\label{fig:\${4}}
	\\end{figure}
snippet tikz
	\\begin{figure}
	\\begin{center}
	\\begin{tikzpicture}[scale=\${1:1}]
		\${2}
	\\end{tikzpicture}
	\\end{center}
	\\caption{\${3}}
	\\label{fig:\${4}}
	\\end{figure}
#math
snippet stackrel
	\\stackrel{\${1:above}}{\${2:below}} \${3}
snippet frac
	\\frac{\${1:num}}{\${2:denom}}
snippet sum
	\\sum^{\${1:n}}_{\${2:i=1}}{\${3}}`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0EsVUFBVSxHQUFHO0FBQ2I7QUFDQTtBQUNBLFVBQVUsR0FBRztBQUNiO0FBQ0EsVUFBVSxHQUFHO0FBQ2I7QUFDQSxVQUFVLEdBQUc7QUFDYjtBQUNBO0FBQ0EsWUFBWSxHQUFHO0FBQ2Y7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULGdDQUFnQyxFQUFFLEVBQUUsV0FBVztBQUMvQyxPQUFPO0FBQ1AsV0FBVyxHQUFHO0FBQ2QsU0FBUyxPQUFPO0FBQ2hCLE9BQU87QUFDUDtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUyxZQUFZLFVBQVUsSUFBSTtBQUNuQyxLQUFLO0FBQ0wsT0FBTztBQUNQLE9BQU87QUFDUCxXQUFXLEdBQUc7QUFDZCxTQUFTLE9BQU87QUFDaEIsT0FBTztBQUNQO0FBQ0E7QUFDQSxZQUFZLEdBQUcsVUFBVSxHQUFHLFVBQVUsR0FBRztBQUN6QztBQUNBLFFBQVEsR0FBRyxRQUFRLEdBQUc7QUFDdEI7QUFDQSxRQUFRLEdBQUcsS0FBSyxFQUFFLEdBQUcsUUFBUSxHQUFHLEdBQUciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy90ZXguanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvdGV4LnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLnNuaXBwZXRUZXh0ID0gcmVxdWlyZShcIi4vdGV4LnNuaXBwZXRzXCIpO1xuZXhwb3J0cy5zY29wZSA9IFwidGV4XCI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGAjUFJFQU1CTEVcbiNuZXdjb21tYW5kXG5zbmlwcGV0IG5jXG5cdFxcXFxuZXdjb21tYW5ke1xcXFxcXCR7MTpjbWR9fVtcXCR7MjpvcHR9XXtcXCR7MzpyZWFsY21kfX1cXCR7NH1cbiN1c2VwYWNrYWdlXG5zbmlwcGV0IHVwXG5cdFxcXFx1c2VwYWNrYWdlW1xcJHsxOltvcHRpb25zfV17XFwkezI6cGFja2FnZX19XG4jbmV3dW5pY29kZWNoYXJcbnNuaXBwZXQgbnVjXG5cdFxcXFxuZXd1bmljb2RlY2hhcntcXCR7MX19e1xcJHsyOlxcXFxlbnN1cmVtYXRofVxcJHszOnRleC1zdWJzdGl0dXRlfX19XG4jRGVjbGFyZU1hdGhPcGVyYXRvclxuc25pcHBldCBkbW9cblx0XFxcXERlY2xhcmVNYXRoT3BlcmF0b3J7XFwkezF9fXtcXCR7Mn19XG5cbiNET0NVTUVOVFxuIyBcXFxcYmVnaW57fS4uLlxcXFxlbmR7fVxuc25pcHBldCBiZWdpblxuXHRcXFxcYmVnaW57XFwkezE6ZW52fX1cblx0XHRcXCR7Mn1cblx0XFxcXGVuZHtcXCQxfVxuIyBUYWJ1bGFyXG5zbmlwcGV0IHRhYlxuXHRcXFxcYmVnaW57XFwkezE6dGFidWxhcn19e1xcJHsyOmN9fVxuXHRcXCR7M31cblx0XFxcXGVuZHtcXCQxfVxuc25pcHBldCB0aG1cblx0XFxcXGJlZ2luW1xcJHsxOmF1dGhvcn1de1xcJHsyOnRobX19XG5cdFxcJHszfVxuXHRcXFxcZW5ke1xcJDF9XG5zbmlwcGV0IGNlbnRlclxuXHRcXFxcYmVnaW57Y2VudGVyfVxuXHRcdFxcJHsxfVxuXHRcXFxcZW5ke2NlbnRlcn1cbiMgQWxpZ24oZWQpXG5zbmlwcGV0IGFsaVxuXHRcXFxcYmVnaW57YWxpZ25cXCR7MTplZH19XG5cdFx0XFwkezJ9XG5cdFxcXFxlbmR7YWxpZ25cXCQxfVxuIyBHYXRoZXIoZWQpXG5zbmlwcGV0IGdhdFxuXHRcXFxcYmVnaW57Z2F0aGVyXFwkezE6ZWR9fVxuXHRcdFxcJHsyfVxuXHRcXFxcZW5ke2dhdGhlclxcJDF9XG4jIEVxdWF0aW9uXG5zbmlwcGV0IGVxXG5cdFxcXFxiZWdpbntlcXVhdGlvbn1cblx0XHRcXCR7MX1cblx0XFxcXGVuZHtlcXVhdGlvbn1cbiMgRXF1YXRpb25cbnNuaXBwZXQgZXEqXG5cdFxcXFxiZWdpbntlcXVhdGlvbip9XG5cdFx0XFwkezF9XG5cdFxcXFxlbmR7ZXF1YXRpb24qfVxuIyBVbm51bWJlcmVkIEVxdWF0aW9uXG5zbmlwcGV0IFxcXFxcblx0XFxcXFtcblx0XHRcXCR7MX1cblx0XFxcXF1cbiMgRW51bWVyYXRlXG5zbmlwcGV0IGVudW1cblx0XFxcXGJlZ2lue2VudW1lcmF0ZX1cblx0XHRcXFxcaXRlbSBcXCR7MX1cblx0XFxcXGVuZHtlbnVtZXJhdGV9XG4jIEl0ZW1pemVcbnNuaXBwZXQgaXRlbWl6ZVxuXHRcXFxcYmVnaW57aXRlbWl6ZX1cblx0XHRcXFxcaXRlbSBcXCR7MX1cblx0XFxcXGVuZHtpdGVtaXplfVxuIyBEZXNjcmlwdGlvblxuc25pcHBldCBkZXNjXG5cdFxcXFxiZWdpbntkZXNjcmlwdGlvbn1cblx0XHRcXFxcaXRlbVtcXCR7MX1dIFxcJHsyfVxuXHRcXFxcZW5ke2Rlc2NyaXB0aW9ufVxuIyBNYXRyaXhcbnNuaXBwZXQgbWF0XG5cdFxcXFxiZWdpbntcXCR7MTpwL2Ivdi9WL0Ivc21hbGx9bWF0cml4fVxuXHRcdFxcJHsyfVxuXHRcXFxcZW5ke1xcJDFtYXRyaXh9XG4jIENhc2VzXG5zbmlwcGV0IGNhc1xuXHRcXFxcYmVnaW57Y2FzZXN9XG5cdFx0XFwkezE6ZXF1YXRpb259LCAmXFxcXHRleHR7IGlmIH1cXCR7MjpjYXNlfVxcXFxcXFxcXG5cdFx0XFwkezN9XG5cdFxcXFxlbmR7Y2FzZXN9XG4jIFNwbGl0XG5zbmlwcGV0IHNwbFxuXHRcXFxcYmVnaW57c3BsaXR9XG5cdFx0XFwkezF9XG5cdFxcXFxlbmR7c3BsaXR9XG4jIFBhcnRcbnNuaXBwZXQgcGFydFxuXHRcXFxccGFydHtcXCR7MTpwYXJ0IG5hbWV9fSAlIChmb2xkKVxuXHRcXFxcbGFiZWx7cHJ0OlxcJHsyOlxcJDF9fVxuXHRcXCR7M31cblx0JSBwYXJ0IFxcJDIgKGVuZClcbiMgQ2hhcHRlclxuc25pcHBldCBjaGFcblx0XFxcXGNoYXB0ZXJ7XFwkezE6Y2hhcHRlciBuYW1lfX1cblx0XFxcXGxhYmVse2NoYTpcXCR7MjpcXCQxfX1cblx0XFwkezN9XG4jIFNlY3Rpb25cbnNuaXBwZXQgc2VjXG5cdFxcXFxzZWN0aW9ue1xcJHsxOnNlY3Rpb24gbmFtZX19XG5cdFxcXFxsYWJlbHtzZWM6XFwkezI6XFwkMX19XG5cdFxcJHszfVxuIyBTdWIgU2VjdGlvblxuc25pcHBldCBzdWJcblx0XFxcXHN1YnNlY3Rpb257XFwkezE6c3Vic2VjdGlvbiBuYW1lfX1cblx0XFxcXGxhYmVse3N1YjpcXCR7MjpcXCQxfX1cblx0XFwkezN9XG4jIFN1YiBTdWIgU2VjdGlvblxuc25pcHBldCBzdWJzXG5cdFxcXFxzdWJzdWJzZWN0aW9ue1xcJHsxOnN1YnN1YnNlY3Rpb24gbmFtZX19XG5cdFxcXFxsYWJlbHtzc3ViOlxcJHsyOlxcJDF9fVxuXHRcXCR7M31cbiMgUGFyYWdyYXBoXG5zbmlwcGV0IHBhclxuXHRcXFxccGFyYWdyYXBoe1xcJHsxOnBhcmFncmFwaCBuYW1lfX1cblx0XFxcXGxhYmVse3BhcjpcXCR7MjpcXCQxfX1cblx0XFwkezN9XG4jIFN1YiBQYXJhZ3JhcGhcbnNuaXBwZXQgc3VicFxuXHRcXFxcc3VicGFyYWdyYXBoe1xcJHsxOnN1YnBhcmFncmFwaCBuYW1lfX1cblx0XFxcXGxhYmVse3N1YnA6XFwkezI6XFwkMX19XG5cdFxcJHszfVxuI1JlZmVyZW5jZXNcbnNuaXBwZXQgaXRkXG5cdFxcXFxpdGVtW1xcJHsxOmRlc2NyaXB0aW9ufV0gXFwkezI6aXRlbX1cbnNuaXBwZXQgZmlndXJlXG5cdFxcJHsxOkZpZ3VyZX1+XFxcXHJlZntcXCR7MjpmaWc6fX1cXCR7M31cbnNuaXBwZXQgdGFibGVcblx0XFwkezE6VGFibGV9flxcXFxyZWZ7XFwkezI6dGFiOn19XFwkezN9XG5zbmlwcGV0IGxpc3Rpbmdcblx0XFwkezE6TGlzdGluZ31+XFxcXHJlZntcXCR7MjpsaXN0fX1cXCR7M31cbnNuaXBwZXQgc2VjdGlvblxuXHRcXCR7MTpTZWN0aW9ufX5cXFxccmVme1xcJHsyOnNlYzp9fVxcJHszfVxuc25pcHBldCBwYWdlXG5cdFxcJHsxOnBhZ2V9flxcXFxwYWdlcmVme1xcJHsyfX1cXCR7M31cbnNuaXBwZXQgaW5kZXhcblx0XFxcXGluZGV4e1xcJHsxOmluZGV4fX1cXCR7Mn1cbiNDaXRhdGlvbnNcbnNuaXBwZXQgY2l0ZVxuXHRcXFxcY2l0ZVtcXCR7MX1de1xcJHsyfX1cXCR7M31cbnNuaXBwZXQgZmNpdGVcblx0XFxcXGZvb3RjaXRlW1xcJHsxfV17XFwkezJ9fVxcJHszfVxuI0Zvcm1hdGluZyB0ZXh0OiBpdGFsaWMsIGJvbGQsIHVuZGVybGluZSwgc21hbGwgY2FwaXRhbCwgZW1waGFzZSAuLlxuc25pcHBldCBpdFxuXHRcXFxcdGV4dGl0e1xcJHsxOnRleHR9fVxuc25pcHBldCBiZlxuXHRcXFxcdGV4dGJme1xcJHsxOnRleHR9fVxuc25pcHBldCB1bmRlclxuXHRcXFxcdW5kZXJsaW5le1xcJHsxOnRleHR9fVxuc25pcHBldCBlbXBcblx0XFxcXGVtcGh7XFwkezE6dGV4dH19XG5zbmlwcGV0IHNjXG5cdFxcXFx0ZXh0c2N7XFwkezE6dGV4dH19XG4jQ2hvb3NpbmcgZm9udFxuc25pcHBldCBzZlxuXHRcXFxcdGV4dHNme1xcJHsxOnRleHR9fVxuc25pcHBldCBybVxuXHRcXFxcdGV4dHJte1xcJHsxOnRleHR9fVxuc25pcHBldCB0dFxuXHRcXFxcdGV4dHR0e1xcJHsxOnRleHR9fVxuI21pc2NcbnNuaXBwZXQgZnRcblx0XFxcXGZvb3Rub3Rle1xcJHsxOnRleHR9fVxuc25pcHBldCBmaWdcblx0XFxcXGJlZ2lue2ZpZ3VyZX1cblx0XFxcXGJlZ2lue2NlbnRlcn1cblx0ICAgIFxcXFxpbmNsdWRlZ3JhcGhpY3Nbc2NhbGU9XFwkezF9XXtGaWd1cmVzL1xcJHsyfX1cblx0XFxcXGVuZHtjZW50ZXJ9XG5cdFxcXFxjYXB0aW9ue1xcJHszfX1cblx0XFxcXGxhYmVse2ZpZzpcXCR7NH19XG5cdFxcXFxlbmR7ZmlndXJlfVxuc25pcHBldCB0aWt6XG5cdFxcXFxiZWdpbntmaWd1cmV9XG5cdFxcXFxiZWdpbntjZW50ZXJ9XG5cdFxcXFxiZWdpbnt0aWt6cGljdHVyZX1bc2NhbGU9XFwkezE6MX1dXG5cdFx0XFwkezJ9XG5cdFxcXFxlbmR7dGlrenBpY3R1cmV9XG5cdFxcXFxlbmR7Y2VudGVyfVxuXHRcXFxcY2FwdGlvbntcXCR7M319XG5cdFxcXFxsYWJlbHtmaWc6XFwkezR9fVxuXHRcXFxcZW5ke2ZpZ3VyZX1cbiNtYXRoXG5zbmlwcGV0IHN0YWNrcmVsXG5cdFxcXFxzdGFja3JlbHtcXCR7MTphYm92ZX19e1xcJHsyOmJlbG93fX0gXFwkezN9XG5zbmlwcGV0IGZyYWNcblx0XFxcXGZyYWN7XFwkezE6bnVtfX17XFwkezI6ZGVub219fVxuc25pcHBldCBzdW1cblx0XFxcXHN1bV57XFwkezE6bn19X3tcXCR7MjppPTF9fXtcXCR7M319YDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==