(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[7715],{

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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R0FBRztBQUNiO0FBQ0EsVUFBVSxHQUFHO0FBQ2I7QUFDQSxVQUFVLEdBQUc7QUFDYjtBQUNBO0FBQ0EsWUFBWSxHQUFHO0FBQ2Y7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULGdDQUFnQyxFQUFFLEVBQUUsV0FBVztBQUMvQyxPQUFPO0FBQ1AsV0FBVyxHQUFHO0FBQ2QsU0FBUyxPQUFPO0FBQ2hCLE9BQU87QUFDUDtBQUNBLFNBQVM7QUFDVCxTQUFTO0FBQ1QsU0FBUyxZQUFZLFVBQVUsSUFBSTtBQUNuQyxLQUFLO0FBQ0wsT0FBTztBQUNQLE9BQU87QUFDUCxXQUFXLEdBQUc7QUFDZCxTQUFTLE9BQU87QUFDaEIsT0FBTztBQUNQO0FBQ0E7QUFDQSxZQUFZLEdBQUcsVUFBVSxHQUFHLFVBQVUsR0FBRztBQUN6QztBQUNBLFFBQVEsR0FBRyxRQUFRLEdBQUc7QUFDdEI7QUFDQSxRQUFRLEdBQUcsS0FBSyxFQUFFLEdBQUcsUUFBUSxHQUFHLEdBQUciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy90ZXguc25pcHBldHMuanMiXSwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBgI1BSRUFNQkxFXG4jbmV3Y29tbWFuZFxuc25pcHBldCBuY1xuXHRcXFxcbmV3Y29tbWFuZHtcXFxcXFwkezE6Y21kfX1bXFwkezI6b3B0fV17XFwkezM6cmVhbGNtZH19XFwkezR9XG4jdXNlcGFja2FnZVxuc25pcHBldCB1cFxuXHRcXFxcdXNlcGFja2FnZVtcXCR7MTpbb3B0aW9uc31de1xcJHsyOnBhY2thZ2V9fVxuI25ld3VuaWNvZGVjaGFyXG5zbmlwcGV0IG51Y1xuXHRcXFxcbmV3dW5pY29kZWNoYXJ7XFwkezF9fXtcXCR7MjpcXFxcZW5zdXJlbWF0aH1cXCR7Mzp0ZXgtc3Vic3RpdHV0ZX19fVxuI0RlY2xhcmVNYXRoT3BlcmF0b3JcbnNuaXBwZXQgZG1vXG5cdFxcXFxEZWNsYXJlTWF0aE9wZXJhdG9ye1xcJHsxfX17XFwkezJ9fVxuXG4jRE9DVU1FTlRcbiMgXFxcXGJlZ2lue30uLi5cXFxcZW5ke31cbnNuaXBwZXQgYmVnaW5cblx0XFxcXGJlZ2lue1xcJHsxOmVudn19XG5cdFx0XFwkezJ9XG5cdFxcXFxlbmR7XFwkMX1cbiMgVGFidWxhclxuc25pcHBldCB0YWJcblx0XFxcXGJlZ2lue1xcJHsxOnRhYnVsYXJ9fXtcXCR7MjpjfX1cblx0XFwkezN9XG5cdFxcXFxlbmR7XFwkMX1cbnNuaXBwZXQgdGhtXG5cdFxcXFxiZWdpbltcXCR7MTphdXRob3J9XXtcXCR7Mjp0aG19fVxuXHRcXCR7M31cblx0XFxcXGVuZHtcXCQxfVxuc25pcHBldCBjZW50ZXJcblx0XFxcXGJlZ2lue2NlbnRlcn1cblx0XHRcXCR7MX1cblx0XFxcXGVuZHtjZW50ZXJ9XG4jIEFsaWduKGVkKVxuc25pcHBldCBhbGlcblx0XFxcXGJlZ2lue2FsaWduXFwkezE6ZWR9fVxuXHRcdFxcJHsyfVxuXHRcXFxcZW5ke2FsaWduXFwkMX1cbiMgR2F0aGVyKGVkKVxuc25pcHBldCBnYXRcblx0XFxcXGJlZ2lue2dhdGhlclxcJHsxOmVkfX1cblx0XHRcXCR7Mn1cblx0XFxcXGVuZHtnYXRoZXJcXCQxfVxuIyBFcXVhdGlvblxuc25pcHBldCBlcVxuXHRcXFxcYmVnaW57ZXF1YXRpb259XG5cdFx0XFwkezF9XG5cdFxcXFxlbmR7ZXF1YXRpb259XG4jIEVxdWF0aW9uXG5zbmlwcGV0IGVxKlxuXHRcXFxcYmVnaW57ZXF1YXRpb24qfVxuXHRcdFxcJHsxfVxuXHRcXFxcZW5ke2VxdWF0aW9uKn1cbiMgVW5udW1iZXJlZCBFcXVhdGlvblxuc25pcHBldCBcXFxcXG5cdFxcXFxbXG5cdFx0XFwkezF9XG5cdFxcXFxdXG4jIEVudW1lcmF0ZVxuc25pcHBldCBlbnVtXG5cdFxcXFxiZWdpbntlbnVtZXJhdGV9XG5cdFx0XFxcXGl0ZW0gXFwkezF9XG5cdFxcXFxlbmR7ZW51bWVyYXRlfVxuIyBJdGVtaXplXG5zbmlwcGV0IGl0ZW1pemVcblx0XFxcXGJlZ2lue2l0ZW1pemV9XG5cdFx0XFxcXGl0ZW0gXFwkezF9XG5cdFxcXFxlbmR7aXRlbWl6ZX1cbiMgRGVzY3JpcHRpb25cbnNuaXBwZXQgZGVzY1xuXHRcXFxcYmVnaW57ZGVzY3JpcHRpb259XG5cdFx0XFxcXGl0ZW1bXFwkezF9XSBcXCR7Mn1cblx0XFxcXGVuZHtkZXNjcmlwdGlvbn1cbiMgTWF0cml4XG5zbmlwcGV0IG1hdFxuXHRcXFxcYmVnaW57XFwkezE6cC9iL3YvVi9CL3NtYWxsfW1hdHJpeH1cblx0XHRcXCR7Mn1cblx0XFxcXGVuZHtcXCQxbWF0cml4fVxuIyBDYXNlc1xuc25pcHBldCBjYXNcblx0XFxcXGJlZ2lue2Nhc2VzfVxuXHRcdFxcJHsxOmVxdWF0aW9ufSwgJlxcXFx0ZXh0eyBpZiB9XFwkezI6Y2FzZX1cXFxcXFxcXFxuXHRcdFxcJHszfVxuXHRcXFxcZW5ke2Nhc2VzfVxuIyBTcGxpdFxuc25pcHBldCBzcGxcblx0XFxcXGJlZ2lue3NwbGl0fVxuXHRcdFxcJHsxfVxuXHRcXFxcZW5ke3NwbGl0fVxuIyBQYXJ0XG5zbmlwcGV0IHBhcnRcblx0XFxcXHBhcnR7XFwkezE6cGFydCBuYW1lfX0gJSAoZm9sZClcblx0XFxcXGxhYmVse3BydDpcXCR7MjpcXCQxfX1cblx0XFwkezN9XG5cdCUgcGFydCBcXCQyIChlbmQpXG4jIENoYXB0ZXJcbnNuaXBwZXQgY2hhXG5cdFxcXFxjaGFwdGVye1xcJHsxOmNoYXB0ZXIgbmFtZX19XG5cdFxcXFxsYWJlbHtjaGE6XFwkezI6XFwkMX19XG5cdFxcJHszfVxuIyBTZWN0aW9uXG5zbmlwcGV0IHNlY1xuXHRcXFxcc2VjdGlvbntcXCR7MTpzZWN0aW9uIG5hbWV9fVxuXHRcXFxcbGFiZWx7c2VjOlxcJHsyOlxcJDF9fVxuXHRcXCR7M31cbiMgU3ViIFNlY3Rpb25cbnNuaXBwZXQgc3ViXG5cdFxcXFxzdWJzZWN0aW9ue1xcJHsxOnN1YnNlY3Rpb24gbmFtZX19XG5cdFxcXFxsYWJlbHtzdWI6XFwkezI6XFwkMX19XG5cdFxcJHszfVxuIyBTdWIgU3ViIFNlY3Rpb25cbnNuaXBwZXQgc3Vic1xuXHRcXFxcc3Vic3Vic2VjdGlvbntcXCR7MTpzdWJzdWJzZWN0aW9uIG5hbWV9fVxuXHRcXFxcbGFiZWx7c3N1YjpcXCR7MjpcXCQxfX1cblx0XFwkezN9XG4jIFBhcmFncmFwaFxuc25pcHBldCBwYXJcblx0XFxcXHBhcmFncmFwaHtcXCR7MTpwYXJhZ3JhcGggbmFtZX19XG5cdFxcXFxsYWJlbHtwYXI6XFwkezI6XFwkMX19XG5cdFxcJHszfVxuIyBTdWIgUGFyYWdyYXBoXG5zbmlwcGV0IHN1YnBcblx0XFxcXHN1YnBhcmFncmFwaHtcXCR7MTpzdWJwYXJhZ3JhcGggbmFtZX19XG5cdFxcXFxsYWJlbHtzdWJwOlxcJHsyOlxcJDF9fVxuXHRcXCR7M31cbiNSZWZlcmVuY2VzXG5zbmlwcGV0IGl0ZFxuXHRcXFxcaXRlbVtcXCR7MTpkZXNjcmlwdGlvbn1dIFxcJHsyOml0ZW19XG5zbmlwcGV0IGZpZ3VyZVxuXHRcXCR7MTpGaWd1cmV9flxcXFxyZWZ7XFwkezI6ZmlnOn19XFwkezN9XG5zbmlwcGV0IHRhYmxlXG5cdFxcJHsxOlRhYmxlfX5cXFxccmVme1xcJHsyOnRhYjp9fVxcJHszfVxuc25pcHBldCBsaXN0aW5nXG5cdFxcJHsxOkxpc3Rpbmd9flxcXFxyZWZ7XFwkezI6bGlzdH19XFwkezN9XG5zbmlwcGV0IHNlY3Rpb25cblx0XFwkezE6U2VjdGlvbn1+XFxcXHJlZntcXCR7MjpzZWM6fX1cXCR7M31cbnNuaXBwZXQgcGFnZVxuXHRcXCR7MTpwYWdlfX5cXFxccGFnZXJlZntcXCR7Mn19XFwkezN9XG5zbmlwcGV0IGluZGV4XG5cdFxcXFxpbmRleHtcXCR7MTppbmRleH19XFwkezJ9XG4jQ2l0YXRpb25zXG5zbmlwcGV0IGNpdGVcblx0XFxcXGNpdGVbXFwkezF9XXtcXCR7Mn19XFwkezN9XG5zbmlwcGV0IGZjaXRlXG5cdFxcXFxmb290Y2l0ZVtcXCR7MX1de1xcJHsyfX1cXCR7M31cbiNGb3JtYXRpbmcgdGV4dDogaXRhbGljLCBib2xkLCB1bmRlcmxpbmUsIHNtYWxsIGNhcGl0YWwsIGVtcGhhc2UgLi5cbnNuaXBwZXQgaXRcblx0XFxcXHRleHRpdHtcXCR7MTp0ZXh0fX1cbnNuaXBwZXQgYmZcblx0XFxcXHRleHRiZntcXCR7MTp0ZXh0fX1cbnNuaXBwZXQgdW5kZXJcblx0XFxcXHVuZGVybGluZXtcXCR7MTp0ZXh0fX1cbnNuaXBwZXQgZW1wXG5cdFxcXFxlbXBoe1xcJHsxOnRleHR9fVxuc25pcHBldCBzY1xuXHRcXFxcdGV4dHNje1xcJHsxOnRleHR9fVxuI0Nob29zaW5nIGZvbnRcbnNuaXBwZXQgc2Zcblx0XFxcXHRleHRzZntcXCR7MTp0ZXh0fX1cbnNuaXBwZXQgcm1cblx0XFxcXHRleHRybXtcXCR7MTp0ZXh0fX1cbnNuaXBwZXQgdHRcblx0XFxcXHRleHR0dHtcXCR7MTp0ZXh0fX1cbiNtaXNjXG5zbmlwcGV0IGZ0XG5cdFxcXFxmb290bm90ZXtcXCR7MTp0ZXh0fX1cbnNuaXBwZXQgZmlnXG5cdFxcXFxiZWdpbntmaWd1cmV9XG5cdFxcXFxiZWdpbntjZW50ZXJ9XG5cdCAgICBcXFxcaW5jbHVkZWdyYXBoaWNzW3NjYWxlPVxcJHsxfV17RmlndXJlcy9cXCR7Mn19XG5cdFxcXFxlbmR7Y2VudGVyfVxuXHRcXFxcY2FwdGlvbntcXCR7M319XG5cdFxcXFxsYWJlbHtmaWc6XFwkezR9fVxuXHRcXFxcZW5ke2ZpZ3VyZX1cbnNuaXBwZXQgdGlrelxuXHRcXFxcYmVnaW57ZmlndXJlfVxuXHRcXFxcYmVnaW57Y2VudGVyfVxuXHRcXFxcYmVnaW57dGlrenBpY3R1cmV9W3NjYWxlPVxcJHsxOjF9XVxuXHRcdFxcJHsyfVxuXHRcXFxcZW5ke3Rpa3pwaWN0dXJlfVxuXHRcXFxcZW5ke2NlbnRlcn1cblx0XFxcXGNhcHRpb257XFwkezN9fVxuXHRcXFxcbGFiZWx7ZmlnOlxcJHs0fX1cblx0XFxcXGVuZHtmaWd1cmV9XG4jbWF0aFxuc25pcHBldCBzdGFja3JlbFxuXHRcXFxcc3RhY2tyZWx7XFwkezE6YWJvdmV9fXtcXCR7MjpiZWxvd319IFxcJHszfVxuc25pcHBldCBmcmFjXG5cdFxcXFxmcmFje1xcJHsxOm51bX19e1xcJHsyOmRlbm9tfX1cbnNuaXBwZXQgc3VtXG5cdFxcXFxzdW1ee1xcJHsxOm59fV97XFwkezI6aT0xfX17XFwkezN9fWA7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=