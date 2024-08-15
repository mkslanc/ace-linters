(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[2853,7921],{

/***/ 42853:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


exports.snippetText = __webpack_require__(27921);
exports.scope = "html";


/***/ }),

/***/ 27921:
/***/ ((module) => {

module.exports = `# Some useful Unicode entities
# Non-Breaking Space
snippet nbs
	&nbsp;
# ←
snippet left
	&#x2190;
# →
snippet right
	&#x2192;
# ↑
snippet up
	&#x2191;
# ↓
snippet down
	&#x2193;
# ↩
snippet return
	&#x21A9;
# ⇤
snippet backtab
	&#x21E4;
# ⇥
snippet tab
	&#x21E5;
# ⇧
snippet shift
	&#x21E7;
# ⌃
snippet ctrl
	&#x2303;
# ⌅
snippet enter
	&#x2305;
# ⌘
snippet cmd
	&#x2318;
# ⌥
snippet option
	&#x2325;
# ⌦
snippet delete
	&#x2326;
# ⌫
snippet backspace
	&#x232B;
# ⎋
snippet esc
	&#x238B;
# Generic Doctype
snippet doctype HTML 4.01 Strict
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
	"http://www.w3.org/TR/html4/strict.dtd">
snippet doctype HTML 4.01 Transitional
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
	"http://www.w3.org/TR/html4/loose.dtd">
snippet doctype HTML 5
	<!DOCTYPE HTML>
snippet doctype XHTML 1.0 Frameset
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
snippet doctype XHTML 1.0 Strict
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
snippet doctype XHTML 1.0 Transitional
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
snippet doctype XHTML 1.1
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
	"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
# HTML Doctype 4.01 Strict
snippet docts
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
	"http://www.w3.org/TR/html4/strict.dtd">
# HTML Doctype 4.01 Transitional
snippet doct
	<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
	"http://www.w3.org/TR/html4/loose.dtd">
# HTML Doctype 5
snippet doct5
	<!DOCTYPE html>
# XHTML Doctype 1.0 Frameset
snippet docxf
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">
# XHTML Doctype 1.0 Strict
snippet docxs
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
# XHTML Doctype 1.0 Transitional
snippet docxt
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
	"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
# XHTML Doctype 1.1
snippet docx
	<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN"
	"http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">
# html5shiv
snippet html5shiv
	<!--[if lte IE 8]>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"></script>
	<![endif]-->
snippet html5printshiv
	<!--[if lte IE 8]>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv-printshiv.min.js"></script>
	<![endif]-->
# Attributes
snippet attr
	\${1:attribute}="\${2:property}"
snippet attr+
	\${1:attribute}="\${2:property}" attr+\${3}
snippet .
	class="\${1}"\${2}
snippet #
	id="\${1}"\${2}
snippet alt
	alt="\${1}"\${2}
snippet charset
	charset="\${1:utf-8}"\${2}
snippet data
	data-\${1}="\${2:\$1}"\${3}
snippet for
	for="\${1}"\${2}
snippet height
	height="\${1}"\${2}
snippet href
	href="\${1:#}"\${2}
snippet lang
	lang="\${1:en}"\${2}
snippet media
	media="\${1}"\${2}
snippet name
	name="\${1}"\${2}
snippet rel
	rel="\${1}"\${2}
snippet scope
	scope="\${1:row}"\${2}
snippet src
	src="\${1}"\${2}
snippet title=
	title="\${1}"\${2}
snippet type
	type="\${1}"\${2}
snippet value
	value="\${1}"\${2}
snippet width
	width="\${1}"\${2}
# Elements
snippet a
	<a href="\${1:#}">\${2:\$1}</a>
snippet a.
	<a class="\${1}" href="\${2:#}">\${3:\$1}</a>
snippet a#
	<a id="\${1}" href="\${2:#}">\${3:\$1}</a>
snippet a:ext
	<a href="http://\${1:example.com}">\${2:\$1}</a>
snippet a:mail
	<a href="mailto:\${1:joe@example.com}?subject=\${2:feedback}">\${3:email me}</a>
snippet abbr
	<abbr title="\${1}">\${2}</abbr>
snippet address
	<address>
		\${1}
	</address>
snippet area
	<area shape="\${1:rect}" coords="\${2}" href="\${3}" alt="\${4}" />
snippet area+
	<area shape="\${1:rect}" coords="\${2}" href="\${3}" alt="\${4}" />
	area+\${5}
snippet area:c
	<area shape="circle" coords="\${1}" href="\${2}" alt="\${3}" />
snippet area:d
	<area shape="default" coords="\${1}" href="\${2}" alt="\${3}" />
snippet area:p
	<area shape="poly" coords="\${1}" href="\${2}" alt="\${3}" />
snippet area:r
	<area shape="rect" coords="\${1}" href="\${2}" alt="\${3}" />
snippet article
	<article>
		\${1}
	</article>
snippet article.
	<article class="\${1}">
		\${2}
	</article>
snippet article#
	<article id="\${1}">
		\${2}
	</article>
snippet aside
	<aside>
		\${1}
	</aside>
snippet aside.
	<aside class="\${1}">
		\${2}
	</aside>
snippet aside#
	<aside id="\${1}">
		\${2}
	</aside>
snippet audio
	<audio src="\${1}>\${2}</audio>
snippet b
	<b>\${1}</b>
snippet base
	<base href="\${1}" target="\${2}" />
snippet bdi
	<bdi>\${1}</bdo>
snippet bdo
	<bdo dir="\${1}">\${2}</bdo>
snippet bdo:l
	<bdo dir="ltr">\${1}</bdo>
snippet bdo:r
	<bdo dir="rtl">\${1}</bdo>
snippet blockquote
	<blockquote>
		\${1}
	</blockquote>
snippet body
	<body>
		\${1}
	</body>
snippet br
	<br />\${1}
snippet button
	<button type="\${1:submit}">\${2}</button>
snippet button.
	<button class="\${1:button}" type="\${2:submit}">\${3}</button>
snippet button#
	<button id="\${1}" type="\${2:submit}">\${3}</button>
snippet button:s
	<button type="submit">\${1}</button>
snippet button:r
	<button type="reset">\${1}</button>
snippet canvas
	<canvas id="\${1:canvas}"></canvas>
snippet caption
	<caption>\${1}</caption>
snippet cite
	<cite>\${1}</cite>
snippet code
	<code>\${1}</code>
snippet col
	<col />\${1}
snippet col+
	<col />
	col+\${1}
snippet colgroup
	<colgroup>
		\${1}
	</colgroup>
snippet colgroup+
	<colgroup>
		<col />
		col+\${1}
	</colgroup>
snippet command
	<command type="command" label="\${1}" icon="\${2}" />
snippet command:c
	<command type="checkbox" label="\${1}" icon="\${2}" />
snippet command:r
	<command type="radio" radiogroup="\${1}" label="\${2}" icon="\${3}" />
snippet datagrid
	<datagrid>
		\${1}
	</datagrid>
snippet datalist
	<datalist>
		\${1}
	</datalist>
snippet datatemplate
	<datatemplate>
		\${1}
	</datatemplate>
snippet dd
	<dd>\${1}</dd>
snippet dd.
	<dd class="\${1}">\${2}</dd>
snippet dd#
	<dd id="\${1}">\${2}</dd>
snippet del
	<del>\${1}</del>
snippet details
	<details>\${1}</details>
snippet dfn
	<dfn>\${1}</dfn>
snippet dialog
	<dialog>
		\${1}
	</dialog>
snippet div
	<div>
		\${1}
	</div>
snippet div.
	<div class="\${1}">
		\${2}
	</div>
snippet div#
	<div id="\${1}">
		\${2}
	</div>
snippet dl
	<dl>
		\${1}
	</dl>
snippet dl.
	<dl class="\${1}">
		\${2}
	</dl>
snippet dl#
	<dl id="\${1}">
		\${2}
	</dl>
snippet dl+
	<dl>
		<dt>\${1}</dt>
		<dd>\${2}</dd>
		dt+\${3}
	</dl>
snippet dt
	<dt>\${1}</dt>
snippet dt.
	<dt class="\${1}">\${2}</dt>
snippet dt#
	<dt id="\${1}">\${2}</dt>
snippet dt+
	<dt>\${1}</dt>
	<dd>\${2}</dd>
	dt+\${3}
snippet em
	<em>\${1}</em>
snippet embed
	<embed src=\${1} type="\${2} />
snippet fieldset
	<fieldset>
		\${1}
	</fieldset>
snippet fieldset.
	<fieldset class="\${1}">
		\${2}
	</fieldset>
snippet fieldset#
	<fieldset id="\${1}">
		\${2}
	</fieldset>
snippet fieldset+
	<fieldset>
		<legend><span>\${1}</span></legend>
		\${2}
	</fieldset>
	fieldset+\${3}
snippet figcaption
	<figcaption>\${1}</figcaption>
snippet figure
	<figure>\${1}</figure>
snippet footer
	<footer>
		\${1}
	</footer>
snippet footer.
	<footer class="\${1}">
		\${2}
	</footer>
snippet footer#
	<footer id="\${1}">
		\${2}
	</footer>
snippet form
	<form action="\${1}" method="\${2:get}" accept-charset="utf-8">
		\${3}
	</form>
snippet form.
	<form class="\${1}" action="\${2}" method="\${3:get}" accept-charset="utf-8">
		\${4}
	</form>
snippet form#
	<form id="\${1}" action="\${2}" method="\${3:get}" accept-charset="utf-8">
		\${4}
	</form>
snippet h1
	<h1>\${1}</h1>
snippet h1.
	<h1 class="\${1}">\${2}</h1>
snippet h1#
	<h1 id="\${1}">\${2}</h1>
snippet h2
	<h2>\${1}</h2>
snippet h2.
	<h2 class="\${1}">\${2}</h2>
snippet h2#
	<h2 id="\${1}">\${2}</h2>
snippet h3
	<h3>\${1}</h3>
snippet h3.
	<h3 class="\${1}">\${2}</h3>
snippet h3#
	<h3 id="\${1}">\${2}</h3>
snippet h4
	<h4>\${1}</h4>
snippet h4.
	<h4 class="\${1}">\${2}</h4>
snippet h4#
	<h4 id="\${1}">\${2}</h4>
snippet h5
	<h5>\${1}</h5>
snippet h5.
	<h5 class="\${1}">\${2}</h5>
snippet h5#
	<h5 id="\${1}">\${2}</h5>
snippet h6
	<h6>\${1}</h6>
snippet h6.
	<h6 class="\${1}">\${2}</h6>
snippet h6#
	<h6 id="\${1}">\${2}</h6>
snippet head
	<head>
		<meta http-equiv="content-type" content="text/html; charset=utf-8" />

		<title>\${1:\`substitute(Filename('', 'Page Title'), '^.', '\\u&', '')\`}</title>
		\${2}
	</head>
snippet header
	<header>
		\${1}
	</header>
snippet header.
	<header class="\${1}">
		\${2}
	</header>
snippet header#
	<header id="\${1}">
		\${2}
	</header>
snippet hgroup
	<hgroup>
		\${1}
	</hgroup>
snippet hgroup.
	<hgroup class="\${1}>
		\${2}
	</hgroup>
snippet hr
	<hr />\${1}
snippet html
	<html>
	\${1}
	</html>
snippet xhtml
	<html xmlns="http://www.w3.org/1999/xhtml">
	\${1}
	</html>
snippet html5
	<!DOCTYPE html>
	<html>
		<head>
			<meta http-equiv="content-type" content="text/html; charset=utf-8" />
			<title>\${1:\`substitute(Filename('', 'Page Title'), '^.', '\\u&', '')\`}</title>
			\${2:meta}
		</head>
		<body>
			\${3:body}
		</body>
	</html>
snippet xhtml5
	<!DOCTYPE html>
	<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
			<meta http-equiv="content-type" content="application/xhtml+xml; charset=utf-8" />
			<title>\${1:\`substitute(Filename('', 'Page Title'), '^.', '\\u&', '')\`}</title>
			\${2:meta}
		</head>
		<body>
			\${3:body}
		</body>
	</html>
snippet i
	<i>\${1}</i>
snippet iframe
	<iframe src="\${1}" frameborder="0"></iframe>\${2}
snippet iframe.
	<iframe class="\${1}" src="\${2}" frameborder="0"></iframe>\${3}
snippet iframe#
	<iframe id="\${1}" src="\${2}" frameborder="0"></iframe>\${3}
snippet img
	<img src="\${1}" alt="\${2}" />\${3}
snippet img.
	<img class="\${1}" src="\${2}" alt="\${3}" />\${4}
snippet img#
	<img id="\${1}" src="\${2}" alt="\${3}" />\${4}
snippet input
	<input type="\${1:text/submit/hidden/button/image}" name="\${2}" id="\${3:\$2}" value="\${4}" />\${5}
snippet input.
	<input class="\${1}" type="\${2:text/submit/hidden/button/image}" name="\${3}" id="\${4:\$3}" value="\${5}" />\${6}
snippet input:text
	<input type="text" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet input:submit
	<input type="submit" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet input:hidden
	<input type="hidden" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet input:button
	<input type="button" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet input:image
	<input type="image" name="\${1}" id="\${2:\$1}" src="\${3}" alt="\${4}" />\${5}
snippet input:checkbox
	<input type="checkbox" name="\${1}" id="\${2:\$1}" />\${3}
snippet input:radio
	<input type="radio" name="\${1}" id="\${2:\$1}" />\${3}
snippet input:color
	<input type="color" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet input:date
	<input type="date" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet input:datetime
	<input type="datetime" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet input:datetime-local
	<input type="datetime-local" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet input:email
	<input type="email" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet input:file
	<input type="file" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet input:month
	<input type="month" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet input:number
	<input type="number" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet input:password
	<input type="password" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet input:range
	<input type="range" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet input:reset
	<input type="reset" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet input:search
	<input type="search" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet input:time
	<input type="time" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet input:url
	<input type="url" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet input:week
	<input type="week" name="\${1}" id="\${2:\$1}" value="\${3}" />\${4}
snippet ins
	<ins>\${1}</ins>
snippet kbd
	<kbd>\${1}</kbd>
snippet keygen
	<keygen>\${1}</keygen>
snippet label
	<label for="\${2:\$1}">\${1}</label>
snippet label:i
	<label for="\${2:\$1}">\${1}</label>
	<input type="\${3:text/submit/hidden/button}" name="\${4:\$2}" id="\${5:\$2}" value="\${6}" />\${7}
snippet label:s
	<label for="\${2:\$1}">\${1}</label>
	<select name="\${3:\$2}" id="\${4:\$2}">
		<option value="\${5}">\${6:\$5}</option>
	</select>
snippet legend
	<legend>\${1}</legend>
snippet legend+
	<legend><span>\${1}</span></legend>
snippet li
	<li>\${1}</li>
snippet li.
	<li class="\${1}">\${2}</li>
snippet li+
	<li>\${1}</li>
	li+\${2}
snippet lia
	<li><a href="\${2:#}">\${1}</a></li>
snippet lia+
	<li><a href="\${2:#}">\${1}</a></li>
	lia+\${3}
snippet link
	<link rel="\${1}" href="\${2}" title="\${3}" type="\${4}" />\${5}
snippet link:atom
	<link rel="alternate" href="\${1:atom.xml}" title="Atom" type="application/atom+xml" />\${2}
snippet link:css
	<link rel="stylesheet" href="\${2:style.css}" type="text/css" media="\${3:all}" />\${4}
snippet link:favicon
	<link rel="shortcut icon" href="\${1:favicon.ico}" type="image/x-icon" />\${2}
snippet link:rss
	<link rel="alternate" href="\${1:rss.xml}" title="RSS" type="application/atom+xml" />\${2}
snippet link:touch
	<link rel="apple-touch-icon" href="\${1:favicon.png}" />\${2}
snippet map
	<map name="\${1}">
		\${2}
	</map>
snippet map.
	<map class="\${1}" name="\${2}">
		\${3}
	</map>
snippet map#
	<map name="\${1}" id="\${2:\$1}>
		\${3}
	</map>
snippet map+
	<map name="\${1}">
		<area shape="\${2}" coords="\${3}" href="\${4}" alt="\${5}" />\${6}
	</map>\${7}
snippet mark
	<mark>\${1}</mark>
snippet menu
	<menu>
		\${1}
	</menu>
snippet menu:c
	<menu type="context">
		\${1}
	</menu>
snippet menu:t
	<menu type="toolbar">
		\${1}
	</menu>
snippet meta
	<meta http-equiv="\${1}" content="\${2}" />\${3}
snippet meta:compat
	<meta http-equiv="X-UA-Compatible" content="IE=\${1:7,8,edge}" />\${3}
snippet meta:refresh
	<meta http-equiv="refresh" content="text/html;charset=UTF-8" />\${3}
snippet meta:utf
	<meta http-equiv="content-type" content="text/html;charset=UTF-8" />\${3}
snippet meter
	<meter>\${1}</meter>
snippet nav
	<nav>
		\${1}
	</nav>
snippet nav.
	<nav class="\${1}">
		\${2}
	</nav>
snippet nav#
	<nav id="\${1}">
		\${2}
	</nav>
snippet noscript
	<noscript>
		\${1}
	</noscript>
snippet object
	<object data="\${1}" type="\${2}">
		\${3}
	</object>\${4}
# Embed QT Movie
snippet movie
	<object width="\$2" height="\$3" classid="clsid:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B"
	 codebase="http://www.apple.com/qtactivex/qtplugin.cab">
		<param name="src" value="\$1" />
		<param name="controller" value="\$4" />
		<param name="autoplay" value="\$5" />
		<embed src="\${1:movie.mov}"
			width="\${2:320}" height="\${3:240}"
			controller="\${4:true}" autoplay="\${5:true}"
			scale="tofit" cache="true"
			pluginspage="http://www.apple.com/quicktime/download/" />
	</object>\${6}
snippet ol
	<ol>
		\${1}
	</ol>
snippet ol.
	<ol class="\${1}>
		\${2}
	</ol>
snippet ol#
	<ol id="\${1}>
		\${2}
	</ol>
snippet ol+
	<ol>
		<li>\${1}</li>
		li+\${2}
	</ol>
snippet opt
	<option value="\${1}">\${2:\$1}</option>
snippet opt+
	<option value="\${1}">\${2:\$1}</option>
	opt+\${3}
snippet optt
	<option>\${1}</option>
snippet optgroup
	<optgroup>
		<option value="\${1}">\${2:\$1}</option>
		opt+\${3}
	</optgroup>
snippet output
	<output>\${1}</output>
snippet p
	<p>\${1}</p>
snippet param
	<param name="\${1}" value="\${2}" />\${3}
snippet pre
	<pre>
		\${1}
	</pre>
snippet progress
	<progress>\${1}</progress>
snippet q
	<q>\${1}</q>
snippet rp
	<rp>\${1}</rp>
snippet rt
	<rt>\${1}</rt>
snippet ruby
	<ruby>
		<rp><rt>\${1}</rt></rp>
	</ruby>
snippet s
	<s>\${1}</s>
snippet samp
	<samp>
		\${1}
	</samp>
snippet script
	<script type="text/javascript" charset="utf-8">
		\${1}
	</script>
snippet scriptsrc
	<script src="\${1}.js" type="text/javascript" charset="utf-8"></script>
snippet newscript
	<script type="application/javascript" charset="utf-8">
		\${1}
	</script>
snippet newscriptsrc
	<script src="\${1}.js" type="application/javascript" charset="utf-8"></script>
snippet section
	<section>
		\${1}
	</section>
snippet section.
	<section class="\${1}">
		\${2}
	</section>
snippet section#
	<section id="\${1}">
		\${2}
	</section>
snippet select
	<select name="\${1}" id="\${2:\$1}">
		\${3}
	</select>
snippet select.
	<select name="\${1}" id="\${2:\$1}" class="\${3}>
		\${4}
	</select>
snippet select+
	<select name="\${1}" id="\${2:\$1}">
		<option value="\${3}">\${4:\$3}</option>
		opt+\${5}
	</select>
snippet small
	<small>\${1}</small>
snippet source
	<source src="\${1}" type="\${2}" media="\${3}" />
snippet span
	<span>\${1}</span>
snippet strong
	<strong>\${1}</strong>
snippet style
	<style type="text/css" media="\${1:all}">
		\${2}
	</style>
snippet sub
	<sub>\${1}</sub>
snippet summary
	<summary>
		\${1}
	</summary>
snippet sup
	<sup>\${1}</sup>
snippet table
	<table border="\${1:0}">
		\${2}
	</table>
snippet table.
	<table class="\${1}" border="\${2:0}">
		\${3}
	</table>
snippet table#
	<table id="\${1}" border="\${2:0}">
		\${3}
	</table>
snippet tbody
	<tbody>
		\${1}
	</tbody>
snippet td
	<td>\${1}</td>
snippet td.
	<td class="\${1}">\${2}</td>
snippet td#
	<td id="\${1}">\${2}</td>
snippet td+
	<td>\${1}</td>
	td+\${2}
snippet textarea
	<textarea name="\${1}" id=\${2:\$1} rows="\${3:8}" cols="\${4:40}">\${5}</textarea>\${6}
snippet tfoot
	<tfoot>
		\${1}
	</tfoot>
snippet th
	<th>\${1}</th>
snippet th.
	<th class="\${1}">\${2}</th>
snippet th#
	<th id="\${1}">\${2}</th>
snippet th+
	<th>\${1}</th>
	th+\${2}
snippet thead
	<thead>
		\${1}
	</thead>
snippet time
	<time datetime="\${1}" pubdate="\${2:\$1}>\${3:\$1}</time>
snippet title
	<title>\${1:\`substitute(Filename('', 'Page Title'), '^.', '\\u&', '')\`}</title>
snippet tr
	<tr>
		\${1}
	</tr>
snippet tr+
	<tr>
		<td>\${1}</td>
		td+\${2}
	</tr>
snippet track
	<track src="\${1}" srclang="\${2}" label="\${3}" default="\${4:default}>\${5}</track>\${6}
snippet ul
	<ul>
		\${1}
	</ul>
snippet ul.
	<ul class="\${1}">
		\${2}
	</ul>
snippet ul#
	<ul id="\${1}">
		\${2}
	</ul>
snippet ul+
	<ul>
		<li>\${1}</li>
		li+\${2}
	</ul>
snippet var
	<var>\${1}</var>
snippet video
	<video src="\${1}" height="\${2}" width="\${3}" preload="\${5:none}" autoplay="\${6:autoplay}">\${7}</video>\${8}
snippet wbr
	<wbr />\${1}
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SUFBSSxXQUFXLEtBQUssS0FBSyxFQUFFLGNBQWM7QUFDdkY7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsUUFBUSxFQUFFO0FBQ1Y7QUFDQSxlQUFlLEVBQUUsS0FBSyxFQUFFO0FBQ3hCO0FBQ0EsWUFBWSxFQUFFLEtBQUssRUFBRTtBQUNyQjtBQUNBLFFBQVEsRUFBRTtBQUNWLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxvQkFBb0IsRUFBRSxjQUFjLE1BQU0sSUFBSSxNQUFNO0FBQ3BEO0FBQ0EsV0FBVywrREFBK0Q7QUFDMUU7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTLEVBQUU7QUFDWCxRQUFRO0FBQ1I7QUFDQTtBQUNBLGdCQUFnQixFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsY0FBYyxVQUFVLElBQUksRUFBRSxXQUFXO0FBQ3pGO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGVBQWUsRUFBRTtBQUNqQixLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVksRUFBRTtBQUNkLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTLEVBQUU7QUFDWCxRQUFRO0FBQ1I7QUFDQTtBQUNBLFNBQVMsRUFBRTtBQUNYO0FBQ0EsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLFlBQVksRUFBRSxjQUFjLE9BQU8sZUFBZSxXQUFXLEtBQUssRUFBRSxXQUFXO0FBQ2hIO0FBQ0EsV0FBVztBQUNYIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvaHRtbC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9zbmlwcGV0cy9odG1sLnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLnNuaXBwZXRUZXh0ID0gcmVxdWlyZShcIi4vaHRtbC5zbmlwcGV0c1wiKTtcbmV4cG9ydHMuc2NvcGUgPSBcImh0bWxcIjtcbiIsIm1vZHVsZS5leHBvcnRzID0gYCMgU29tZSB1c2VmdWwgVW5pY29kZSBlbnRpdGllc1xuIyBOb24tQnJlYWtpbmcgU3BhY2VcbnNuaXBwZXQgbmJzXG5cdCZuYnNwO1xuIyDihpBcbnNuaXBwZXQgbGVmdFxuXHQmI3gyMTkwO1xuIyDihpJcbnNuaXBwZXQgcmlnaHRcblx0JiN4MjE5MjtcbiMg4oaRXG5zbmlwcGV0IHVwXG5cdCYjeDIxOTE7XG4jIOKGk1xuc25pcHBldCBkb3duXG5cdCYjeDIxOTM7XG4jIOKGqVxuc25pcHBldCByZXR1cm5cblx0JiN4MjFBOTtcbiMg4oekXG5zbmlwcGV0IGJhY2t0YWJcblx0JiN4MjFFNDtcbiMg4oelXG5zbmlwcGV0IHRhYlxuXHQmI3gyMUU1O1xuIyDih6dcbnNuaXBwZXQgc2hpZnRcblx0JiN4MjFFNztcbiMg4oyDXG5zbmlwcGV0IGN0cmxcblx0JiN4MjMwMztcbiMg4oyFXG5zbmlwcGV0IGVudGVyXG5cdCYjeDIzMDU7XG4jIOKMmFxuc25pcHBldCBjbWRcblx0JiN4MjMxODtcbiMg4oylXG5zbmlwcGV0IG9wdGlvblxuXHQmI3gyMzI1O1xuIyDijKZcbnNuaXBwZXQgZGVsZXRlXG5cdCYjeDIzMjY7XG4jIOKMq1xuc25pcHBldCBiYWNrc3BhY2Vcblx0JiN4MjMyQjtcbiMg4o6LXG5zbmlwcGV0IGVzY1xuXHQmI3gyMzhCO1xuIyBHZW5lcmljIERvY3R5cGVcbnNuaXBwZXQgZG9jdHlwZSBIVE1MIDQuMDEgU3RyaWN0XG5cdDwhRE9DVFlQRSBIVE1MIFBVQkxJQyBcIi0vL1czQy8vRFREIEhUTUwgNC4wMS8vRU5cIlxuXHRcImh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw0L3N0cmljdC5kdGRcIj5cbnNuaXBwZXQgZG9jdHlwZSBIVE1MIDQuMDEgVHJhbnNpdGlvbmFsXG5cdDwhRE9DVFlQRSBIVE1MIFBVQkxJQyBcIi0vL1czQy8vRFREIEhUTUwgNC4wMSBUcmFuc2l0aW9uYWwvL0VOXCJcblx0XCJodHRwOi8vd3d3LnczLm9yZy9UUi9odG1sNC9sb29zZS5kdGRcIj5cbnNuaXBwZXQgZG9jdHlwZSBIVE1MIDVcblx0PCFET0NUWVBFIEhUTUw+XG5zbmlwcGV0IGRvY3R5cGUgWEhUTUwgMS4wIEZyYW1lc2V0XG5cdDwhRE9DVFlQRSBodG1sIFBVQkxJQyBcIi0vL1czQy8vRFREIFhIVE1MIDEuMCBTdHJpY3QvL0VOXCJcblx0XCJodHRwOi8vd3d3LnczLm9yZy9UUi94aHRtbDEvRFREL3hodG1sMS1zdHJpY3QuZHRkXCI+XG5zbmlwcGV0IGRvY3R5cGUgWEhUTUwgMS4wIFN0cmljdFxuXHQ8IURPQ1RZUEUgaHRtbCBQVUJMSUMgXCItLy9XM0MvL0RURCBYSFRNTCAxLjAgU3RyaWN0Ly9FTlwiXG5cdFwiaHR0cDovL3d3dy53My5vcmcvVFIveGh0bWwxL0RURC94aHRtbDEtc3RyaWN0LmR0ZFwiPlxuc25pcHBldCBkb2N0eXBlIFhIVE1MIDEuMCBUcmFuc2l0aW9uYWxcblx0PCFET0NUWVBFIGh0bWwgUFVCTElDIFwiLS8vVzNDLy9EVEQgWEhUTUwgMS4wIFRyYW5zaXRpb25hbC8vRU5cIlxuXHRcImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXRyYW5zaXRpb25hbC5kdGRcIj5cbnNuaXBwZXQgZG9jdHlwZSBYSFRNTCAxLjFcblx0PCFET0NUWVBFIGh0bWwgUFVCTElDIFwiLS8vVzNDLy9EVEQgWEhUTUwgMS4xLy9FTlwiXG5cdFwiaHR0cDovL3d3dy53My5vcmcvVFIveGh0bWwxMS9EVEQveGh0bWwxMS5kdGRcIj5cbiMgSFRNTCBEb2N0eXBlIDQuMDEgU3RyaWN0XG5zbmlwcGV0IGRvY3RzXG5cdDwhRE9DVFlQRSBIVE1MIFBVQkxJQyBcIi0vL1czQy8vRFREIEhUTUwgNC4wMS8vRU5cIlxuXHRcImh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw0L3N0cmljdC5kdGRcIj5cbiMgSFRNTCBEb2N0eXBlIDQuMDEgVHJhbnNpdGlvbmFsXG5zbmlwcGV0IGRvY3Rcblx0PCFET0NUWVBFIEhUTUwgUFVCTElDIFwiLS8vVzNDLy9EVEQgSFRNTCA0LjAxIFRyYW5zaXRpb25hbC8vRU5cIlxuXHRcImh0dHA6Ly93d3cudzMub3JnL1RSL2h0bWw0L2xvb3NlLmR0ZFwiPlxuIyBIVE1MIERvY3R5cGUgNVxuc25pcHBldCBkb2N0NVxuXHQ8IURPQ1RZUEUgaHRtbD5cbiMgWEhUTUwgRG9jdHlwZSAxLjAgRnJhbWVzZXRcbnNuaXBwZXQgZG9jeGZcblx0PCFET0NUWVBFIGh0bWwgUFVCTElDIFwiLS8vVzNDLy9EVEQgWEhUTUwgMS4wIEZyYW1lc2V0Ly9FTlwiXG5cdFwiaHR0cDovL3d3dy53My5vcmcvVFIveGh0bWwxL0RURC94aHRtbDEtZnJhbWVzZXQuZHRkXCI+XG4jIFhIVE1MIERvY3R5cGUgMS4wIFN0cmljdFxuc25pcHBldCBkb2N4c1xuXHQ8IURPQ1RZUEUgaHRtbCBQVUJMSUMgXCItLy9XM0MvL0RURCBYSFRNTCAxLjAgU3RyaWN0Ly9FTlwiXG5cdFwiaHR0cDovL3d3dy53My5vcmcvVFIveGh0bWwxL0RURC94aHRtbDEtc3RyaWN0LmR0ZFwiPlxuIyBYSFRNTCBEb2N0eXBlIDEuMCBUcmFuc2l0aW9uYWxcbnNuaXBwZXQgZG9jeHRcblx0PCFET0NUWVBFIGh0bWwgUFVCTElDIFwiLS8vVzNDLy9EVEQgWEhUTUwgMS4wIFRyYW5zaXRpb25hbC8vRU5cIlxuXHRcImh0dHA6Ly93d3cudzMub3JnL1RSL3hodG1sMS9EVEQveGh0bWwxLXRyYW5zaXRpb25hbC5kdGRcIj5cbiMgWEhUTUwgRG9jdHlwZSAxLjFcbnNuaXBwZXQgZG9jeFxuXHQ8IURPQ1RZUEUgaHRtbCBQVUJMSUMgXCItLy9XM0MvL0RURCBYSFRNTCAxLjEvL0VOXCJcblx0XCJodHRwOi8vd3d3LnczLm9yZy9UUi94aHRtbDExL0RURC94aHRtbDExLmR0ZFwiPlxuIyBodG1sNXNoaXZcbnNuaXBwZXQgaHRtbDVzaGl2XG5cdDwhLS1baWYgbHRlIElFIDhdPlxuXHRcdDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvaHRtbDVzaGl2LzMuNy4zL2h0bWw1c2hpdi5taW4uanNcIj48L3NjcmlwdD5cblx0PCFbZW5kaWZdLS0+XG5zbmlwcGV0IGh0bWw1cHJpbnRzaGl2XG5cdDwhLS1baWYgbHRlIElFIDhdPlxuXHRcdDxzY3JpcHQgc3JjPVwiaHR0cHM6Ly9jZG5qcy5jbG91ZGZsYXJlLmNvbS9hamF4L2xpYnMvaHRtbDVzaGl2LzMuNy4zL2h0bWw1c2hpdi1wcmludHNoaXYubWluLmpzXCI+PC9zY3JpcHQ+XG5cdDwhW2VuZGlmXS0tPlxuIyBBdHRyaWJ1dGVzXG5zbmlwcGV0IGF0dHJcblx0XFwkezE6YXR0cmlidXRlfT1cIlxcJHsyOnByb3BlcnR5fVwiXG5zbmlwcGV0IGF0dHIrXG5cdFxcJHsxOmF0dHJpYnV0ZX09XCJcXCR7Mjpwcm9wZXJ0eX1cIiBhdHRyK1xcJHszfVxuc25pcHBldCAuXG5cdGNsYXNzPVwiXFwkezF9XCJcXCR7Mn1cbnNuaXBwZXQgI1xuXHRpZD1cIlxcJHsxfVwiXFwkezJ9XG5zbmlwcGV0IGFsdFxuXHRhbHQ9XCJcXCR7MX1cIlxcJHsyfVxuc25pcHBldCBjaGFyc2V0XG5cdGNoYXJzZXQ9XCJcXCR7MTp1dGYtOH1cIlxcJHsyfVxuc25pcHBldCBkYXRhXG5cdGRhdGEtXFwkezF9PVwiXFwkezI6XFwkMX1cIlxcJHszfVxuc25pcHBldCBmb3Jcblx0Zm9yPVwiXFwkezF9XCJcXCR7Mn1cbnNuaXBwZXQgaGVpZ2h0XG5cdGhlaWdodD1cIlxcJHsxfVwiXFwkezJ9XG5zbmlwcGV0IGhyZWZcblx0aHJlZj1cIlxcJHsxOiN9XCJcXCR7Mn1cbnNuaXBwZXQgbGFuZ1xuXHRsYW5nPVwiXFwkezE6ZW59XCJcXCR7Mn1cbnNuaXBwZXQgbWVkaWFcblx0bWVkaWE9XCJcXCR7MX1cIlxcJHsyfVxuc25pcHBldCBuYW1lXG5cdG5hbWU9XCJcXCR7MX1cIlxcJHsyfVxuc25pcHBldCByZWxcblx0cmVsPVwiXFwkezF9XCJcXCR7Mn1cbnNuaXBwZXQgc2NvcGVcblx0c2NvcGU9XCJcXCR7MTpyb3d9XCJcXCR7Mn1cbnNuaXBwZXQgc3JjXG5cdHNyYz1cIlxcJHsxfVwiXFwkezJ9XG5zbmlwcGV0IHRpdGxlPVxuXHR0aXRsZT1cIlxcJHsxfVwiXFwkezJ9XG5zbmlwcGV0IHR5cGVcblx0dHlwZT1cIlxcJHsxfVwiXFwkezJ9XG5zbmlwcGV0IHZhbHVlXG5cdHZhbHVlPVwiXFwkezF9XCJcXCR7Mn1cbnNuaXBwZXQgd2lkdGhcblx0d2lkdGg9XCJcXCR7MX1cIlxcJHsyfVxuIyBFbGVtZW50c1xuc25pcHBldCBhXG5cdDxhIGhyZWY9XCJcXCR7MTojfVwiPlxcJHsyOlxcJDF9PC9hPlxuc25pcHBldCBhLlxuXHQ8YSBjbGFzcz1cIlxcJHsxfVwiIGhyZWY9XCJcXCR7MjojfVwiPlxcJHszOlxcJDF9PC9hPlxuc25pcHBldCBhI1xuXHQ8YSBpZD1cIlxcJHsxfVwiIGhyZWY9XCJcXCR7MjojfVwiPlxcJHszOlxcJDF9PC9hPlxuc25pcHBldCBhOmV4dFxuXHQ8YSBocmVmPVwiaHR0cDovL1xcJHsxOmV4YW1wbGUuY29tfVwiPlxcJHsyOlxcJDF9PC9hPlxuc25pcHBldCBhOm1haWxcblx0PGEgaHJlZj1cIm1haWx0bzpcXCR7MTpqb2VAZXhhbXBsZS5jb219P3N1YmplY3Q9XFwkezI6ZmVlZGJhY2t9XCI+XFwkezM6ZW1haWwgbWV9PC9hPlxuc25pcHBldCBhYmJyXG5cdDxhYmJyIHRpdGxlPVwiXFwkezF9XCI+XFwkezJ9PC9hYmJyPlxuc25pcHBldCBhZGRyZXNzXG5cdDxhZGRyZXNzPlxuXHRcdFxcJHsxfVxuXHQ8L2FkZHJlc3M+XG5zbmlwcGV0IGFyZWFcblx0PGFyZWEgc2hhcGU9XCJcXCR7MTpyZWN0fVwiIGNvb3Jkcz1cIlxcJHsyfVwiIGhyZWY9XCJcXCR7M31cIiBhbHQ9XCJcXCR7NH1cIiAvPlxuc25pcHBldCBhcmVhK1xuXHQ8YXJlYSBzaGFwZT1cIlxcJHsxOnJlY3R9XCIgY29vcmRzPVwiXFwkezJ9XCIgaHJlZj1cIlxcJHszfVwiIGFsdD1cIlxcJHs0fVwiIC8+XG5cdGFyZWErXFwkezV9XG5zbmlwcGV0IGFyZWE6Y1xuXHQ8YXJlYSBzaGFwZT1cImNpcmNsZVwiIGNvb3Jkcz1cIlxcJHsxfVwiIGhyZWY9XCJcXCR7Mn1cIiBhbHQ9XCJcXCR7M31cIiAvPlxuc25pcHBldCBhcmVhOmRcblx0PGFyZWEgc2hhcGU9XCJkZWZhdWx0XCIgY29vcmRzPVwiXFwkezF9XCIgaHJlZj1cIlxcJHsyfVwiIGFsdD1cIlxcJHszfVwiIC8+XG5zbmlwcGV0IGFyZWE6cFxuXHQ8YXJlYSBzaGFwZT1cInBvbHlcIiBjb29yZHM9XCJcXCR7MX1cIiBocmVmPVwiXFwkezJ9XCIgYWx0PVwiXFwkezN9XCIgLz5cbnNuaXBwZXQgYXJlYTpyXG5cdDxhcmVhIHNoYXBlPVwicmVjdFwiIGNvb3Jkcz1cIlxcJHsxfVwiIGhyZWY9XCJcXCR7Mn1cIiBhbHQ9XCJcXCR7M31cIiAvPlxuc25pcHBldCBhcnRpY2xlXG5cdDxhcnRpY2xlPlxuXHRcdFxcJHsxfVxuXHQ8L2FydGljbGU+XG5zbmlwcGV0IGFydGljbGUuXG5cdDxhcnRpY2xlIGNsYXNzPVwiXFwkezF9XCI+XG5cdFx0XFwkezJ9XG5cdDwvYXJ0aWNsZT5cbnNuaXBwZXQgYXJ0aWNsZSNcblx0PGFydGljbGUgaWQ9XCJcXCR7MX1cIj5cblx0XHRcXCR7Mn1cblx0PC9hcnRpY2xlPlxuc25pcHBldCBhc2lkZVxuXHQ8YXNpZGU+XG5cdFx0XFwkezF9XG5cdDwvYXNpZGU+XG5zbmlwcGV0IGFzaWRlLlxuXHQ8YXNpZGUgY2xhc3M9XCJcXCR7MX1cIj5cblx0XHRcXCR7Mn1cblx0PC9hc2lkZT5cbnNuaXBwZXQgYXNpZGUjXG5cdDxhc2lkZSBpZD1cIlxcJHsxfVwiPlxuXHRcdFxcJHsyfVxuXHQ8L2FzaWRlPlxuc25pcHBldCBhdWRpb1xuXHQ8YXVkaW8gc3JjPVwiXFwkezF9PlxcJHsyfTwvYXVkaW8+XG5zbmlwcGV0IGJcblx0PGI+XFwkezF9PC9iPlxuc25pcHBldCBiYXNlXG5cdDxiYXNlIGhyZWY9XCJcXCR7MX1cIiB0YXJnZXQ9XCJcXCR7Mn1cIiAvPlxuc25pcHBldCBiZGlcblx0PGJkaT5cXCR7MX08L2Jkbz5cbnNuaXBwZXQgYmRvXG5cdDxiZG8gZGlyPVwiXFwkezF9XCI+XFwkezJ9PC9iZG8+XG5zbmlwcGV0IGJkbzpsXG5cdDxiZG8gZGlyPVwibHRyXCI+XFwkezF9PC9iZG8+XG5zbmlwcGV0IGJkbzpyXG5cdDxiZG8gZGlyPVwicnRsXCI+XFwkezF9PC9iZG8+XG5zbmlwcGV0IGJsb2NrcXVvdGVcblx0PGJsb2NrcXVvdGU+XG5cdFx0XFwkezF9XG5cdDwvYmxvY2txdW90ZT5cbnNuaXBwZXQgYm9keVxuXHQ8Ym9keT5cblx0XHRcXCR7MX1cblx0PC9ib2R5Plxuc25pcHBldCBiclxuXHQ8YnIgLz5cXCR7MX1cbnNuaXBwZXQgYnV0dG9uXG5cdDxidXR0b24gdHlwZT1cIlxcJHsxOnN1Ym1pdH1cIj5cXCR7Mn08L2J1dHRvbj5cbnNuaXBwZXQgYnV0dG9uLlxuXHQ8YnV0dG9uIGNsYXNzPVwiXFwkezE6YnV0dG9ufVwiIHR5cGU9XCJcXCR7MjpzdWJtaXR9XCI+XFwkezN9PC9idXR0b24+XG5zbmlwcGV0IGJ1dHRvbiNcblx0PGJ1dHRvbiBpZD1cIlxcJHsxfVwiIHR5cGU9XCJcXCR7MjpzdWJtaXR9XCI+XFwkezN9PC9idXR0b24+XG5zbmlwcGV0IGJ1dHRvbjpzXG5cdDxidXR0b24gdHlwZT1cInN1Ym1pdFwiPlxcJHsxfTwvYnV0dG9uPlxuc25pcHBldCBidXR0b246clxuXHQ8YnV0dG9uIHR5cGU9XCJyZXNldFwiPlxcJHsxfTwvYnV0dG9uPlxuc25pcHBldCBjYW52YXNcblx0PGNhbnZhcyBpZD1cIlxcJHsxOmNhbnZhc31cIj48L2NhbnZhcz5cbnNuaXBwZXQgY2FwdGlvblxuXHQ8Y2FwdGlvbj5cXCR7MX08L2NhcHRpb24+XG5zbmlwcGV0IGNpdGVcblx0PGNpdGU+XFwkezF9PC9jaXRlPlxuc25pcHBldCBjb2RlXG5cdDxjb2RlPlxcJHsxfTwvY29kZT5cbnNuaXBwZXQgY29sXG5cdDxjb2wgLz5cXCR7MX1cbnNuaXBwZXQgY29sK1xuXHQ8Y29sIC8+XG5cdGNvbCtcXCR7MX1cbnNuaXBwZXQgY29sZ3JvdXBcblx0PGNvbGdyb3VwPlxuXHRcdFxcJHsxfVxuXHQ8L2NvbGdyb3VwPlxuc25pcHBldCBjb2xncm91cCtcblx0PGNvbGdyb3VwPlxuXHRcdDxjb2wgLz5cblx0XHRjb2wrXFwkezF9XG5cdDwvY29sZ3JvdXA+XG5zbmlwcGV0IGNvbW1hbmRcblx0PGNvbW1hbmQgdHlwZT1cImNvbW1hbmRcIiBsYWJlbD1cIlxcJHsxfVwiIGljb249XCJcXCR7Mn1cIiAvPlxuc25pcHBldCBjb21tYW5kOmNcblx0PGNvbW1hbmQgdHlwZT1cImNoZWNrYm94XCIgbGFiZWw9XCJcXCR7MX1cIiBpY29uPVwiXFwkezJ9XCIgLz5cbnNuaXBwZXQgY29tbWFuZDpyXG5cdDxjb21tYW5kIHR5cGU9XCJyYWRpb1wiIHJhZGlvZ3JvdXA9XCJcXCR7MX1cIiBsYWJlbD1cIlxcJHsyfVwiIGljb249XCJcXCR7M31cIiAvPlxuc25pcHBldCBkYXRhZ3JpZFxuXHQ8ZGF0YWdyaWQ+XG5cdFx0XFwkezF9XG5cdDwvZGF0YWdyaWQ+XG5zbmlwcGV0IGRhdGFsaXN0XG5cdDxkYXRhbGlzdD5cblx0XHRcXCR7MX1cblx0PC9kYXRhbGlzdD5cbnNuaXBwZXQgZGF0YXRlbXBsYXRlXG5cdDxkYXRhdGVtcGxhdGU+XG5cdFx0XFwkezF9XG5cdDwvZGF0YXRlbXBsYXRlPlxuc25pcHBldCBkZFxuXHQ8ZGQ+XFwkezF9PC9kZD5cbnNuaXBwZXQgZGQuXG5cdDxkZCBjbGFzcz1cIlxcJHsxfVwiPlxcJHsyfTwvZGQ+XG5zbmlwcGV0IGRkI1xuXHQ8ZGQgaWQ9XCJcXCR7MX1cIj5cXCR7Mn08L2RkPlxuc25pcHBldCBkZWxcblx0PGRlbD5cXCR7MX08L2RlbD5cbnNuaXBwZXQgZGV0YWlsc1xuXHQ8ZGV0YWlscz5cXCR7MX08L2RldGFpbHM+XG5zbmlwcGV0IGRmblxuXHQ8ZGZuPlxcJHsxfTwvZGZuPlxuc25pcHBldCBkaWFsb2dcblx0PGRpYWxvZz5cblx0XHRcXCR7MX1cblx0PC9kaWFsb2c+XG5zbmlwcGV0IGRpdlxuXHQ8ZGl2PlxuXHRcdFxcJHsxfVxuXHQ8L2Rpdj5cbnNuaXBwZXQgZGl2LlxuXHQ8ZGl2IGNsYXNzPVwiXFwkezF9XCI+XG5cdFx0XFwkezJ9XG5cdDwvZGl2Plxuc25pcHBldCBkaXYjXG5cdDxkaXYgaWQ9XCJcXCR7MX1cIj5cblx0XHRcXCR7Mn1cblx0PC9kaXY+XG5zbmlwcGV0IGRsXG5cdDxkbD5cblx0XHRcXCR7MX1cblx0PC9kbD5cbnNuaXBwZXQgZGwuXG5cdDxkbCBjbGFzcz1cIlxcJHsxfVwiPlxuXHRcdFxcJHsyfVxuXHQ8L2RsPlxuc25pcHBldCBkbCNcblx0PGRsIGlkPVwiXFwkezF9XCI+XG5cdFx0XFwkezJ9XG5cdDwvZGw+XG5zbmlwcGV0IGRsK1xuXHQ8ZGw+XG5cdFx0PGR0PlxcJHsxfTwvZHQ+XG5cdFx0PGRkPlxcJHsyfTwvZGQ+XG5cdFx0ZHQrXFwkezN9XG5cdDwvZGw+XG5zbmlwcGV0IGR0XG5cdDxkdD5cXCR7MX08L2R0Plxuc25pcHBldCBkdC5cblx0PGR0IGNsYXNzPVwiXFwkezF9XCI+XFwkezJ9PC9kdD5cbnNuaXBwZXQgZHQjXG5cdDxkdCBpZD1cIlxcJHsxfVwiPlxcJHsyfTwvZHQ+XG5zbmlwcGV0IGR0K1xuXHQ8ZHQ+XFwkezF9PC9kdD5cblx0PGRkPlxcJHsyfTwvZGQ+XG5cdGR0K1xcJHszfVxuc25pcHBldCBlbVxuXHQ8ZW0+XFwkezF9PC9lbT5cbnNuaXBwZXQgZW1iZWRcblx0PGVtYmVkIHNyYz1cXCR7MX0gdHlwZT1cIlxcJHsyfSAvPlxuc25pcHBldCBmaWVsZHNldFxuXHQ8ZmllbGRzZXQ+XG5cdFx0XFwkezF9XG5cdDwvZmllbGRzZXQ+XG5zbmlwcGV0IGZpZWxkc2V0LlxuXHQ8ZmllbGRzZXQgY2xhc3M9XCJcXCR7MX1cIj5cblx0XHRcXCR7Mn1cblx0PC9maWVsZHNldD5cbnNuaXBwZXQgZmllbGRzZXQjXG5cdDxmaWVsZHNldCBpZD1cIlxcJHsxfVwiPlxuXHRcdFxcJHsyfVxuXHQ8L2ZpZWxkc2V0Plxuc25pcHBldCBmaWVsZHNldCtcblx0PGZpZWxkc2V0PlxuXHRcdDxsZWdlbmQ+PHNwYW4+XFwkezF9PC9zcGFuPjwvbGVnZW5kPlxuXHRcdFxcJHsyfVxuXHQ8L2ZpZWxkc2V0PlxuXHRmaWVsZHNldCtcXCR7M31cbnNuaXBwZXQgZmlnY2FwdGlvblxuXHQ8ZmlnY2FwdGlvbj5cXCR7MX08L2ZpZ2NhcHRpb24+XG5zbmlwcGV0IGZpZ3VyZVxuXHQ8ZmlndXJlPlxcJHsxfTwvZmlndXJlPlxuc25pcHBldCBmb290ZXJcblx0PGZvb3Rlcj5cblx0XHRcXCR7MX1cblx0PC9mb290ZXI+XG5zbmlwcGV0IGZvb3Rlci5cblx0PGZvb3RlciBjbGFzcz1cIlxcJHsxfVwiPlxuXHRcdFxcJHsyfVxuXHQ8L2Zvb3Rlcj5cbnNuaXBwZXQgZm9vdGVyI1xuXHQ8Zm9vdGVyIGlkPVwiXFwkezF9XCI+XG5cdFx0XFwkezJ9XG5cdDwvZm9vdGVyPlxuc25pcHBldCBmb3JtXG5cdDxmb3JtIGFjdGlvbj1cIlxcJHsxfVwiIG1ldGhvZD1cIlxcJHsyOmdldH1cIiBhY2NlcHQtY2hhcnNldD1cInV0Zi04XCI+XG5cdFx0XFwkezN9XG5cdDwvZm9ybT5cbnNuaXBwZXQgZm9ybS5cblx0PGZvcm0gY2xhc3M9XCJcXCR7MX1cIiBhY3Rpb249XCJcXCR7Mn1cIiBtZXRob2Q9XCJcXCR7MzpnZXR9XCIgYWNjZXB0LWNoYXJzZXQ9XCJ1dGYtOFwiPlxuXHRcdFxcJHs0fVxuXHQ8L2Zvcm0+XG5zbmlwcGV0IGZvcm0jXG5cdDxmb3JtIGlkPVwiXFwkezF9XCIgYWN0aW9uPVwiXFwkezJ9XCIgbWV0aG9kPVwiXFwkezM6Z2V0fVwiIGFjY2VwdC1jaGFyc2V0PVwidXRmLThcIj5cblx0XHRcXCR7NH1cblx0PC9mb3JtPlxuc25pcHBldCBoMVxuXHQ8aDE+XFwkezF9PC9oMT5cbnNuaXBwZXQgaDEuXG5cdDxoMSBjbGFzcz1cIlxcJHsxfVwiPlxcJHsyfTwvaDE+XG5zbmlwcGV0IGgxI1xuXHQ8aDEgaWQ9XCJcXCR7MX1cIj5cXCR7Mn08L2gxPlxuc25pcHBldCBoMlxuXHQ8aDI+XFwkezF9PC9oMj5cbnNuaXBwZXQgaDIuXG5cdDxoMiBjbGFzcz1cIlxcJHsxfVwiPlxcJHsyfTwvaDI+XG5zbmlwcGV0IGgyI1xuXHQ8aDIgaWQ9XCJcXCR7MX1cIj5cXCR7Mn08L2gyPlxuc25pcHBldCBoM1xuXHQ8aDM+XFwkezF9PC9oMz5cbnNuaXBwZXQgaDMuXG5cdDxoMyBjbGFzcz1cIlxcJHsxfVwiPlxcJHsyfTwvaDM+XG5zbmlwcGV0IGgzI1xuXHQ8aDMgaWQ9XCJcXCR7MX1cIj5cXCR7Mn08L2gzPlxuc25pcHBldCBoNFxuXHQ8aDQ+XFwkezF9PC9oND5cbnNuaXBwZXQgaDQuXG5cdDxoNCBjbGFzcz1cIlxcJHsxfVwiPlxcJHsyfTwvaDQ+XG5zbmlwcGV0IGg0I1xuXHQ8aDQgaWQ9XCJcXCR7MX1cIj5cXCR7Mn08L2g0Plxuc25pcHBldCBoNVxuXHQ8aDU+XFwkezF9PC9oNT5cbnNuaXBwZXQgaDUuXG5cdDxoNSBjbGFzcz1cIlxcJHsxfVwiPlxcJHsyfTwvaDU+XG5zbmlwcGV0IGg1I1xuXHQ8aDUgaWQ9XCJcXCR7MX1cIj5cXCR7Mn08L2g1Plxuc25pcHBldCBoNlxuXHQ8aDY+XFwkezF9PC9oNj5cbnNuaXBwZXQgaDYuXG5cdDxoNiBjbGFzcz1cIlxcJHsxfVwiPlxcJHsyfTwvaDY+XG5zbmlwcGV0IGg2I1xuXHQ8aDYgaWQ9XCJcXCR7MX1cIj5cXCR7Mn08L2g2Plxuc25pcHBldCBoZWFkXG5cdDxoZWFkPlxuXHRcdDxtZXRhIGh0dHAtZXF1aXY9XCJjb250ZW50LXR5cGVcIiBjb250ZW50PVwidGV4dC9odG1sOyBjaGFyc2V0PXV0Zi04XCIgLz5cblxuXHRcdDx0aXRsZT5cXCR7MTpcXGBzdWJzdGl0dXRlKEZpbGVuYW1lKCcnLCAnUGFnZSBUaXRsZScpLCAnXi4nLCAnXFxcXHUmJywgJycpXFxgfTwvdGl0bGU+XG5cdFx0XFwkezJ9XG5cdDwvaGVhZD5cbnNuaXBwZXQgaGVhZGVyXG5cdDxoZWFkZXI+XG5cdFx0XFwkezF9XG5cdDwvaGVhZGVyPlxuc25pcHBldCBoZWFkZXIuXG5cdDxoZWFkZXIgY2xhc3M9XCJcXCR7MX1cIj5cblx0XHRcXCR7Mn1cblx0PC9oZWFkZXI+XG5zbmlwcGV0IGhlYWRlciNcblx0PGhlYWRlciBpZD1cIlxcJHsxfVwiPlxuXHRcdFxcJHsyfVxuXHQ8L2hlYWRlcj5cbnNuaXBwZXQgaGdyb3VwXG5cdDxoZ3JvdXA+XG5cdFx0XFwkezF9XG5cdDwvaGdyb3VwPlxuc25pcHBldCBoZ3JvdXAuXG5cdDxoZ3JvdXAgY2xhc3M9XCJcXCR7MX0+XG5cdFx0XFwkezJ9XG5cdDwvaGdyb3VwPlxuc25pcHBldCBoclxuXHQ8aHIgLz5cXCR7MX1cbnNuaXBwZXQgaHRtbFxuXHQ8aHRtbD5cblx0XFwkezF9XG5cdDwvaHRtbD5cbnNuaXBwZXQgeGh0bWxcblx0PGh0bWwgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI+XG5cdFxcJHsxfVxuXHQ8L2h0bWw+XG5zbmlwcGV0IGh0bWw1XG5cdDwhRE9DVFlQRSBodG1sPlxuXHQ8aHRtbD5cblx0XHQ8aGVhZD5cblx0XHRcdDxtZXRhIGh0dHAtZXF1aXY9XCJjb250ZW50LXR5cGVcIiBjb250ZW50PVwidGV4dC9odG1sOyBjaGFyc2V0PXV0Zi04XCIgLz5cblx0XHRcdDx0aXRsZT5cXCR7MTpcXGBzdWJzdGl0dXRlKEZpbGVuYW1lKCcnLCAnUGFnZSBUaXRsZScpLCAnXi4nLCAnXFxcXHUmJywgJycpXFxgfTwvdGl0bGU+XG5cdFx0XHRcXCR7MjptZXRhfVxuXHRcdDwvaGVhZD5cblx0XHQ8Ym9keT5cblx0XHRcdFxcJHszOmJvZHl9XG5cdFx0PC9ib2R5PlxuXHQ8L2h0bWw+XG5zbmlwcGV0IHhodG1sNVxuXHQ8IURPQ1RZUEUgaHRtbD5cblx0PGh0bWwgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI+XG5cdFx0PGhlYWQ+XG5cdFx0XHQ8bWV0YSBodHRwLWVxdWl2PVwiY29udGVudC10eXBlXCIgY29udGVudD1cImFwcGxpY2F0aW9uL3hodG1sK3htbDsgY2hhcnNldD11dGYtOFwiIC8+XG5cdFx0XHQ8dGl0bGU+XFwkezE6XFxgc3Vic3RpdHV0ZShGaWxlbmFtZSgnJywgJ1BhZ2UgVGl0bGUnKSwgJ14uJywgJ1xcXFx1JicsICcnKVxcYH08L3RpdGxlPlxuXHRcdFx0XFwkezI6bWV0YX1cblx0XHQ8L2hlYWQ+XG5cdFx0PGJvZHk+XG5cdFx0XHRcXCR7Mzpib2R5fVxuXHRcdDwvYm9keT5cblx0PC9odG1sPlxuc25pcHBldCBpXG5cdDxpPlxcJHsxfTwvaT5cbnNuaXBwZXQgaWZyYW1lXG5cdDxpZnJhbWUgc3JjPVwiXFwkezF9XCIgZnJhbWVib3JkZXI9XCIwXCI+PC9pZnJhbWU+XFwkezJ9XG5zbmlwcGV0IGlmcmFtZS5cblx0PGlmcmFtZSBjbGFzcz1cIlxcJHsxfVwiIHNyYz1cIlxcJHsyfVwiIGZyYW1lYm9yZGVyPVwiMFwiPjwvaWZyYW1lPlxcJHszfVxuc25pcHBldCBpZnJhbWUjXG5cdDxpZnJhbWUgaWQ9XCJcXCR7MX1cIiBzcmM9XCJcXCR7Mn1cIiBmcmFtZWJvcmRlcj1cIjBcIj48L2lmcmFtZT5cXCR7M31cbnNuaXBwZXQgaW1nXG5cdDxpbWcgc3JjPVwiXFwkezF9XCIgYWx0PVwiXFwkezJ9XCIgLz5cXCR7M31cbnNuaXBwZXQgaW1nLlxuXHQ8aW1nIGNsYXNzPVwiXFwkezF9XCIgc3JjPVwiXFwkezJ9XCIgYWx0PVwiXFwkezN9XCIgLz5cXCR7NH1cbnNuaXBwZXQgaW1nI1xuXHQ8aW1nIGlkPVwiXFwkezF9XCIgc3JjPVwiXFwkezJ9XCIgYWx0PVwiXFwkezN9XCIgLz5cXCR7NH1cbnNuaXBwZXQgaW5wdXRcblx0PGlucHV0IHR5cGU9XCJcXCR7MTp0ZXh0L3N1Ym1pdC9oaWRkZW4vYnV0dG9uL2ltYWdlfVwiIG5hbWU9XCJcXCR7Mn1cIiBpZD1cIlxcJHszOlxcJDJ9XCIgdmFsdWU9XCJcXCR7NH1cIiAvPlxcJHs1fVxuc25pcHBldCBpbnB1dC5cblx0PGlucHV0IGNsYXNzPVwiXFwkezF9XCIgdHlwZT1cIlxcJHsyOnRleHQvc3VibWl0L2hpZGRlbi9idXR0b24vaW1hZ2V9XCIgbmFtZT1cIlxcJHszfVwiIGlkPVwiXFwkezQ6XFwkM31cIiB2YWx1ZT1cIlxcJHs1fVwiIC8+XFwkezZ9XG5zbmlwcGV0IGlucHV0OnRleHRcblx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIlxcJHsxfVwiIGlkPVwiXFwkezI6XFwkMX1cIiB2YWx1ZT1cIlxcJHszfVwiIC8+XFwkezR9XG5zbmlwcGV0IGlucHV0OnN1Ym1pdFxuXHQ8aW5wdXQgdHlwZT1cInN1Ym1pdFwiIG5hbWU9XCJcXCR7MX1cIiBpZD1cIlxcJHsyOlxcJDF9XCIgdmFsdWU9XCJcXCR7M31cIiAvPlxcJHs0fVxuc25pcHBldCBpbnB1dDpoaWRkZW5cblx0PGlucHV0IHR5cGU9XCJoaWRkZW5cIiBuYW1lPVwiXFwkezF9XCIgaWQ9XCJcXCR7MjpcXCQxfVwiIHZhbHVlPVwiXFwkezN9XCIgLz5cXCR7NH1cbnNuaXBwZXQgaW5wdXQ6YnV0dG9uXG5cdDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgbmFtZT1cIlxcJHsxfVwiIGlkPVwiXFwkezI6XFwkMX1cIiB2YWx1ZT1cIlxcJHszfVwiIC8+XFwkezR9XG5zbmlwcGV0IGlucHV0OmltYWdlXG5cdDxpbnB1dCB0eXBlPVwiaW1hZ2VcIiBuYW1lPVwiXFwkezF9XCIgaWQ9XCJcXCR7MjpcXCQxfVwiIHNyYz1cIlxcJHszfVwiIGFsdD1cIlxcJHs0fVwiIC8+XFwkezV9XG5zbmlwcGV0IGlucHV0OmNoZWNrYm94XG5cdDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwiXFwkezF9XCIgaWQ9XCJcXCR7MjpcXCQxfVwiIC8+XFwkezN9XG5zbmlwcGV0IGlucHV0OnJhZGlvXG5cdDxpbnB1dCB0eXBlPVwicmFkaW9cIiBuYW1lPVwiXFwkezF9XCIgaWQ9XCJcXCR7MjpcXCQxfVwiIC8+XFwkezN9XG5zbmlwcGV0IGlucHV0OmNvbG9yXG5cdDxpbnB1dCB0eXBlPVwiY29sb3JcIiBuYW1lPVwiXFwkezF9XCIgaWQ9XCJcXCR7MjpcXCQxfVwiIHZhbHVlPVwiXFwkezN9XCIgLz5cXCR7NH1cbnNuaXBwZXQgaW5wdXQ6ZGF0ZVxuXHQ8aW5wdXQgdHlwZT1cImRhdGVcIiBuYW1lPVwiXFwkezF9XCIgaWQ9XCJcXCR7MjpcXCQxfVwiIHZhbHVlPVwiXFwkezN9XCIgLz5cXCR7NH1cbnNuaXBwZXQgaW5wdXQ6ZGF0ZXRpbWVcblx0PGlucHV0IHR5cGU9XCJkYXRldGltZVwiIG5hbWU9XCJcXCR7MX1cIiBpZD1cIlxcJHsyOlxcJDF9XCIgdmFsdWU9XCJcXCR7M31cIiAvPlxcJHs0fVxuc25pcHBldCBpbnB1dDpkYXRldGltZS1sb2NhbFxuXHQ8aW5wdXQgdHlwZT1cImRhdGV0aW1lLWxvY2FsXCIgbmFtZT1cIlxcJHsxfVwiIGlkPVwiXFwkezI6XFwkMX1cIiB2YWx1ZT1cIlxcJHszfVwiIC8+XFwkezR9XG5zbmlwcGV0IGlucHV0OmVtYWlsXG5cdDxpbnB1dCB0eXBlPVwiZW1haWxcIiBuYW1lPVwiXFwkezF9XCIgaWQ9XCJcXCR7MjpcXCQxfVwiIHZhbHVlPVwiXFwkezN9XCIgLz5cXCR7NH1cbnNuaXBwZXQgaW5wdXQ6ZmlsZVxuXHQ8aW5wdXQgdHlwZT1cImZpbGVcIiBuYW1lPVwiXFwkezF9XCIgaWQ9XCJcXCR7MjpcXCQxfVwiIHZhbHVlPVwiXFwkezN9XCIgLz5cXCR7NH1cbnNuaXBwZXQgaW5wdXQ6bW9udGhcblx0PGlucHV0IHR5cGU9XCJtb250aFwiIG5hbWU9XCJcXCR7MX1cIiBpZD1cIlxcJHsyOlxcJDF9XCIgdmFsdWU9XCJcXCR7M31cIiAvPlxcJHs0fVxuc25pcHBldCBpbnB1dDpudW1iZXJcblx0PGlucHV0IHR5cGU9XCJudW1iZXJcIiBuYW1lPVwiXFwkezF9XCIgaWQ9XCJcXCR7MjpcXCQxfVwiIHZhbHVlPVwiXFwkezN9XCIgLz5cXCR7NH1cbnNuaXBwZXQgaW5wdXQ6cGFzc3dvcmRcblx0PGlucHV0IHR5cGU9XCJwYXNzd29yZFwiIG5hbWU9XCJcXCR7MX1cIiBpZD1cIlxcJHsyOlxcJDF9XCIgdmFsdWU9XCJcXCR7M31cIiAvPlxcJHs0fVxuc25pcHBldCBpbnB1dDpyYW5nZVxuXHQ8aW5wdXQgdHlwZT1cInJhbmdlXCIgbmFtZT1cIlxcJHsxfVwiIGlkPVwiXFwkezI6XFwkMX1cIiB2YWx1ZT1cIlxcJHszfVwiIC8+XFwkezR9XG5zbmlwcGV0IGlucHV0OnJlc2V0XG5cdDxpbnB1dCB0eXBlPVwicmVzZXRcIiBuYW1lPVwiXFwkezF9XCIgaWQ9XCJcXCR7MjpcXCQxfVwiIHZhbHVlPVwiXFwkezN9XCIgLz5cXCR7NH1cbnNuaXBwZXQgaW5wdXQ6c2VhcmNoXG5cdDxpbnB1dCB0eXBlPVwic2VhcmNoXCIgbmFtZT1cIlxcJHsxfVwiIGlkPVwiXFwkezI6XFwkMX1cIiB2YWx1ZT1cIlxcJHszfVwiIC8+XFwkezR9XG5zbmlwcGV0IGlucHV0OnRpbWVcblx0PGlucHV0IHR5cGU9XCJ0aW1lXCIgbmFtZT1cIlxcJHsxfVwiIGlkPVwiXFwkezI6XFwkMX1cIiB2YWx1ZT1cIlxcJHszfVwiIC8+XFwkezR9XG5zbmlwcGV0IGlucHV0OnVybFxuXHQ8aW5wdXQgdHlwZT1cInVybFwiIG5hbWU9XCJcXCR7MX1cIiBpZD1cIlxcJHsyOlxcJDF9XCIgdmFsdWU9XCJcXCR7M31cIiAvPlxcJHs0fVxuc25pcHBldCBpbnB1dDp3ZWVrXG5cdDxpbnB1dCB0eXBlPVwid2Vla1wiIG5hbWU9XCJcXCR7MX1cIiBpZD1cIlxcJHsyOlxcJDF9XCIgdmFsdWU9XCJcXCR7M31cIiAvPlxcJHs0fVxuc25pcHBldCBpbnNcblx0PGlucz5cXCR7MX08L2lucz5cbnNuaXBwZXQga2JkXG5cdDxrYmQ+XFwkezF9PC9rYmQ+XG5zbmlwcGV0IGtleWdlblxuXHQ8a2V5Z2VuPlxcJHsxfTwva2V5Z2VuPlxuc25pcHBldCBsYWJlbFxuXHQ8bGFiZWwgZm9yPVwiXFwkezI6XFwkMX1cIj5cXCR7MX08L2xhYmVsPlxuc25pcHBldCBsYWJlbDppXG5cdDxsYWJlbCBmb3I9XCJcXCR7MjpcXCQxfVwiPlxcJHsxfTwvbGFiZWw+XG5cdDxpbnB1dCB0eXBlPVwiXFwkezM6dGV4dC9zdWJtaXQvaGlkZGVuL2J1dHRvbn1cIiBuYW1lPVwiXFwkezQ6XFwkMn1cIiBpZD1cIlxcJHs1OlxcJDJ9XCIgdmFsdWU9XCJcXCR7Nn1cIiAvPlxcJHs3fVxuc25pcHBldCBsYWJlbDpzXG5cdDxsYWJlbCBmb3I9XCJcXCR7MjpcXCQxfVwiPlxcJHsxfTwvbGFiZWw+XG5cdDxzZWxlY3QgbmFtZT1cIlxcJHszOlxcJDJ9XCIgaWQ9XCJcXCR7NDpcXCQyfVwiPlxuXHRcdDxvcHRpb24gdmFsdWU9XCJcXCR7NX1cIj5cXCR7NjpcXCQ1fTwvb3B0aW9uPlxuXHQ8L3NlbGVjdD5cbnNuaXBwZXQgbGVnZW5kXG5cdDxsZWdlbmQ+XFwkezF9PC9sZWdlbmQ+XG5zbmlwcGV0IGxlZ2VuZCtcblx0PGxlZ2VuZD48c3Bhbj5cXCR7MX08L3NwYW4+PC9sZWdlbmQ+XG5zbmlwcGV0IGxpXG5cdDxsaT5cXCR7MX08L2xpPlxuc25pcHBldCBsaS5cblx0PGxpIGNsYXNzPVwiXFwkezF9XCI+XFwkezJ9PC9saT5cbnNuaXBwZXQgbGkrXG5cdDxsaT5cXCR7MX08L2xpPlxuXHRsaStcXCR7Mn1cbnNuaXBwZXQgbGlhXG5cdDxsaT48YSBocmVmPVwiXFwkezI6I31cIj5cXCR7MX08L2E+PC9saT5cbnNuaXBwZXQgbGlhK1xuXHQ8bGk+PGEgaHJlZj1cIlxcJHsyOiN9XCI+XFwkezF9PC9hPjwvbGk+XG5cdGxpYStcXCR7M31cbnNuaXBwZXQgbGlua1xuXHQ8bGluayByZWw9XCJcXCR7MX1cIiBocmVmPVwiXFwkezJ9XCIgdGl0bGU9XCJcXCR7M31cIiB0eXBlPVwiXFwkezR9XCIgLz5cXCR7NX1cbnNuaXBwZXQgbGluazphdG9tXG5cdDxsaW5rIHJlbD1cImFsdGVybmF0ZVwiIGhyZWY9XCJcXCR7MTphdG9tLnhtbH1cIiB0aXRsZT1cIkF0b21cIiB0eXBlPVwiYXBwbGljYXRpb24vYXRvbSt4bWxcIiAvPlxcJHsyfVxuc25pcHBldCBsaW5rOmNzc1xuXHQ8bGluayByZWw9XCJzdHlsZXNoZWV0XCIgaHJlZj1cIlxcJHsyOnN0eWxlLmNzc31cIiB0eXBlPVwidGV4dC9jc3NcIiBtZWRpYT1cIlxcJHszOmFsbH1cIiAvPlxcJHs0fVxuc25pcHBldCBsaW5rOmZhdmljb25cblx0PGxpbmsgcmVsPVwic2hvcnRjdXQgaWNvblwiIGhyZWY9XCJcXCR7MTpmYXZpY29uLmljb31cIiB0eXBlPVwiaW1hZ2UveC1pY29uXCIgLz5cXCR7Mn1cbnNuaXBwZXQgbGluazpyc3Ncblx0PGxpbmsgcmVsPVwiYWx0ZXJuYXRlXCIgaHJlZj1cIlxcJHsxOnJzcy54bWx9XCIgdGl0bGU9XCJSU1NcIiB0eXBlPVwiYXBwbGljYXRpb24vYXRvbSt4bWxcIiAvPlxcJHsyfVxuc25pcHBldCBsaW5rOnRvdWNoXG5cdDxsaW5rIHJlbD1cImFwcGxlLXRvdWNoLWljb25cIiBocmVmPVwiXFwkezE6ZmF2aWNvbi5wbmd9XCIgLz5cXCR7Mn1cbnNuaXBwZXQgbWFwXG5cdDxtYXAgbmFtZT1cIlxcJHsxfVwiPlxuXHRcdFxcJHsyfVxuXHQ8L21hcD5cbnNuaXBwZXQgbWFwLlxuXHQ8bWFwIGNsYXNzPVwiXFwkezF9XCIgbmFtZT1cIlxcJHsyfVwiPlxuXHRcdFxcJHszfVxuXHQ8L21hcD5cbnNuaXBwZXQgbWFwI1xuXHQ8bWFwIG5hbWU9XCJcXCR7MX1cIiBpZD1cIlxcJHsyOlxcJDF9PlxuXHRcdFxcJHszfVxuXHQ8L21hcD5cbnNuaXBwZXQgbWFwK1xuXHQ8bWFwIG5hbWU9XCJcXCR7MX1cIj5cblx0XHQ8YXJlYSBzaGFwZT1cIlxcJHsyfVwiIGNvb3Jkcz1cIlxcJHszfVwiIGhyZWY9XCJcXCR7NH1cIiBhbHQ9XCJcXCR7NX1cIiAvPlxcJHs2fVxuXHQ8L21hcD5cXCR7N31cbnNuaXBwZXQgbWFya1xuXHQ8bWFyaz5cXCR7MX08L21hcms+XG5zbmlwcGV0IG1lbnVcblx0PG1lbnU+XG5cdFx0XFwkezF9XG5cdDwvbWVudT5cbnNuaXBwZXQgbWVudTpjXG5cdDxtZW51IHR5cGU9XCJjb250ZXh0XCI+XG5cdFx0XFwkezF9XG5cdDwvbWVudT5cbnNuaXBwZXQgbWVudTp0XG5cdDxtZW51IHR5cGU9XCJ0b29sYmFyXCI+XG5cdFx0XFwkezF9XG5cdDwvbWVudT5cbnNuaXBwZXQgbWV0YVxuXHQ8bWV0YSBodHRwLWVxdWl2PVwiXFwkezF9XCIgY29udGVudD1cIlxcJHsyfVwiIC8+XFwkezN9XG5zbmlwcGV0IG1ldGE6Y29tcGF0XG5cdDxtZXRhIGh0dHAtZXF1aXY9XCJYLVVBLUNvbXBhdGlibGVcIiBjb250ZW50PVwiSUU9XFwkezE6Nyw4LGVkZ2V9XCIgLz5cXCR7M31cbnNuaXBwZXQgbWV0YTpyZWZyZXNoXG5cdDxtZXRhIGh0dHAtZXF1aXY9XCJyZWZyZXNoXCIgY29udGVudD1cInRleHQvaHRtbDtjaGFyc2V0PVVURi04XCIgLz5cXCR7M31cbnNuaXBwZXQgbWV0YTp1dGZcblx0PG1ldGEgaHR0cC1lcXVpdj1cImNvbnRlbnQtdHlwZVwiIGNvbnRlbnQ9XCJ0ZXh0L2h0bWw7Y2hhcnNldD1VVEYtOFwiIC8+XFwkezN9XG5zbmlwcGV0IG1ldGVyXG5cdDxtZXRlcj5cXCR7MX08L21ldGVyPlxuc25pcHBldCBuYXZcblx0PG5hdj5cblx0XHRcXCR7MX1cblx0PC9uYXY+XG5zbmlwcGV0IG5hdi5cblx0PG5hdiBjbGFzcz1cIlxcJHsxfVwiPlxuXHRcdFxcJHsyfVxuXHQ8L25hdj5cbnNuaXBwZXQgbmF2I1xuXHQ8bmF2IGlkPVwiXFwkezF9XCI+XG5cdFx0XFwkezJ9XG5cdDwvbmF2Plxuc25pcHBldCBub3NjcmlwdFxuXHQ8bm9zY3JpcHQ+XG5cdFx0XFwkezF9XG5cdDwvbm9zY3JpcHQ+XG5zbmlwcGV0IG9iamVjdFxuXHQ8b2JqZWN0IGRhdGE9XCJcXCR7MX1cIiB0eXBlPVwiXFwkezJ9XCI+XG5cdFx0XFwkezN9XG5cdDwvb2JqZWN0PlxcJHs0fVxuIyBFbWJlZCBRVCBNb3ZpZVxuc25pcHBldCBtb3ZpZVxuXHQ8b2JqZWN0IHdpZHRoPVwiXFwkMlwiIGhlaWdodD1cIlxcJDNcIiBjbGFzc2lkPVwiY2xzaWQ6MDJCRjI1RDUtOEMxNy00QjIzLUJDODAtRDM0ODhBQkREQzZCXCJcblx0IGNvZGViYXNlPVwiaHR0cDovL3d3dy5hcHBsZS5jb20vcXRhY3RpdmV4L3F0cGx1Z2luLmNhYlwiPlxuXHRcdDxwYXJhbSBuYW1lPVwic3JjXCIgdmFsdWU9XCJcXCQxXCIgLz5cblx0XHQ8cGFyYW0gbmFtZT1cImNvbnRyb2xsZXJcIiB2YWx1ZT1cIlxcJDRcIiAvPlxuXHRcdDxwYXJhbSBuYW1lPVwiYXV0b3BsYXlcIiB2YWx1ZT1cIlxcJDVcIiAvPlxuXHRcdDxlbWJlZCBzcmM9XCJcXCR7MTptb3ZpZS5tb3Z9XCJcblx0XHRcdHdpZHRoPVwiXFwkezI6MzIwfVwiIGhlaWdodD1cIlxcJHszOjI0MH1cIlxuXHRcdFx0Y29udHJvbGxlcj1cIlxcJHs0OnRydWV9XCIgYXV0b3BsYXk9XCJcXCR7NTp0cnVlfVwiXG5cdFx0XHRzY2FsZT1cInRvZml0XCIgY2FjaGU9XCJ0cnVlXCJcblx0XHRcdHBsdWdpbnNwYWdlPVwiaHR0cDovL3d3dy5hcHBsZS5jb20vcXVpY2t0aW1lL2Rvd25sb2FkL1wiIC8+XG5cdDwvb2JqZWN0PlxcJHs2fVxuc25pcHBldCBvbFxuXHQ8b2w+XG5cdFx0XFwkezF9XG5cdDwvb2w+XG5zbmlwcGV0IG9sLlxuXHQ8b2wgY2xhc3M9XCJcXCR7MX0+XG5cdFx0XFwkezJ9XG5cdDwvb2w+XG5zbmlwcGV0IG9sI1xuXHQ8b2wgaWQ9XCJcXCR7MX0+XG5cdFx0XFwkezJ9XG5cdDwvb2w+XG5zbmlwcGV0IG9sK1xuXHQ8b2w+XG5cdFx0PGxpPlxcJHsxfTwvbGk+XG5cdFx0bGkrXFwkezJ9XG5cdDwvb2w+XG5zbmlwcGV0IG9wdFxuXHQ8b3B0aW9uIHZhbHVlPVwiXFwkezF9XCI+XFwkezI6XFwkMX08L29wdGlvbj5cbnNuaXBwZXQgb3B0K1xuXHQ8b3B0aW9uIHZhbHVlPVwiXFwkezF9XCI+XFwkezI6XFwkMX08L29wdGlvbj5cblx0b3B0K1xcJHszfVxuc25pcHBldCBvcHR0XG5cdDxvcHRpb24+XFwkezF9PC9vcHRpb24+XG5zbmlwcGV0IG9wdGdyb3VwXG5cdDxvcHRncm91cD5cblx0XHQ8b3B0aW9uIHZhbHVlPVwiXFwkezF9XCI+XFwkezI6XFwkMX08L29wdGlvbj5cblx0XHRvcHQrXFwkezN9XG5cdDwvb3B0Z3JvdXA+XG5zbmlwcGV0IG91dHB1dFxuXHQ8b3V0cHV0PlxcJHsxfTwvb3V0cHV0Plxuc25pcHBldCBwXG5cdDxwPlxcJHsxfTwvcD5cbnNuaXBwZXQgcGFyYW1cblx0PHBhcmFtIG5hbWU9XCJcXCR7MX1cIiB2YWx1ZT1cIlxcJHsyfVwiIC8+XFwkezN9XG5zbmlwcGV0IHByZVxuXHQ8cHJlPlxuXHRcdFxcJHsxfVxuXHQ8L3ByZT5cbnNuaXBwZXQgcHJvZ3Jlc3Ncblx0PHByb2dyZXNzPlxcJHsxfTwvcHJvZ3Jlc3M+XG5zbmlwcGV0IHFcblx0PHE+XFwkezF9PC9xPlxuc25pcHBldCBycFxuXHQ8cnA+XFwkezF9PC9ycD5cbnNuaXBwZXQgcnRcblx0PHJ0PlxcJHsxfTwvcnQ+XG5zbmlwcGV0IHJ1Ynlcblx0PHJ1Ynk+XG5cdFx0PHJwPjxydD5cXCR7MX08L3J0PjwvcnA+XG5cdDwvcnVieT5cbnNuaXBwZXQgc1xuXHQ8cz5cXCR7MX08L3M+XG5zbmlwcGV0IHNhbXBcblx0PHNhbXA+XG5cdFx0XFwkezF9XG5cdDwvc2FtcD5cbnNuaXBwZXQgc2NyaXB0XG5cdDxzY3JpcHQgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiIGNoYXJzZXQ9XCJ1dGYtOFwiPlxuXHRcdFxcJHsxfVxuXHQ8L3NjcmlwdD5cbnNuaXBwZXQgc2NyaXB0c3JjXG5cdDxzY3JpcHQgc3JjPVwiXFwkezF9LmpzXCIgdHlwZT1cInRleHQvamF2YXNjcmlwdFwiIGNoYXJzZXQ9XCJ1dGYtOFwiPjwvc2NyaXB0Plxuc25pcHBldCBuZXdzY3JpcHRcblx0PHNjcmlwdCB0eXBlPVwiYXBwbGljYXRpb24vamF2YXNjcmlwdFwiIGNoYXJzZXQ9XCJ1dGYtOFwiPlxuXHRcdFxcJHsxfVxuXHQ8L3NjcmlwdD5cbnNuaXBwZXQgbmV3c2NyaXB0c3JjXG5cdDxzY3JpcHQgc3JjPVwiXFwkezF9LmpzXCIgdHlwZT1cImFwcGxpY2F0aW9uL2phdmFzY3JpcHRcIiBjaGFyc2V0PVwidXRmLThcIj48L3NjcmlwdD5cbnNuaXBwZXQgc2VjdGlvblxuXHQ8c2VjdGlvbj5cblx0XHRcXCR7MX1cblx0PC9zZWN0aW9uPlxuc25pcHBldCBzZWN0aW9uLlxuXHQ8c2VjdGlvbiBjbGFzcz1cIlxcJHsxfVwiPlxuXHRcdFxcJHsyfVxuXHQ8L3NlY3Rpb24+XG5zbmlwcGV0IHNlY3Rpb24jXG5cdDxzZWN0aW9uIGlkPVwiXFwkezF9XCI+XG5cdFx0XFwkezJ9XG5cdDwvc2VjdGlvbj5cbnNuaXBwZXQgc2VsZWN0XG5cdDxzZWxlY3QgbmFtZT1cIlxcJHsxfVwiIGlkPVwiXFwkezI6XFwkMX1cIj5cblx0XHRcXCR7M31cblx0PC9zZWxlY3Q+XG5zbmlwcGV0IHNlbGVjdC5cblx0PHNlbGVjdCBuYW1lPVwiXFwkezF9XCIgaWQ9XCJcXCR7MjpcXCQxfVwiIGNsYXNzPVwiXFwkezN9PlxuXHRcdFxcJHs0fVxuXHQ8L3NlbGVjdD5cbnNuaXBwZXQgc2VsZWN0K1xuXHQ8c2VsZWN0IG5hbWU9XCJcXCR7MX1cIiBpZD1cIlxcJHsyOlxcJDF9XCI+XG5cdFx0PG9wdGlvbiB2YWx1ZT1cIlxcJHszfVwiPlxcJHs0OlxcJDN9PC9vcHRpb24+XG5cdFx0b3B0K1xcJHs1fVxuXHQ8L3NlbGVjdD5cbnNuaXBwZXQgc21hbGxcblx0PHNtYWxsPlxcJHsxfTwvc21hbGw+XG5zbmlwcGV0IHNvdXJjZVxuXHQ8c291cmNlIHNyYz1cIlxcJHsxfVwiIHR5cGU9XCJcXCR7Mn1cIiBtZWRpYT1cIlxcJHszfVwiIC8+XG5zbmlwcGV0IHNwYW5cblx0PHNwYW4+XFwkezF9PC9zcGFuPlxuc25pcHBldCBzdHJvbmdcblx0PHN0cm9uZz5cXCR7MX08L3N0cm9uZz5cbnNuaXBwZXQgc3R5bGVcblx0PHN0eWxlIHR5cGU9XCJ0ZXh0L2Nzc1wiIG1lZGlhPVwiXFwkezE6YWxsfVwiPlxuXHRcdFxcJHsyfVxuXHQ8L3N0eWxlPlxuc25pcHBldCBzdWJcblx0PHN1Yj5cXCR7MX08L3N1Yj5cbnNuaXBwZXQgc3VtbWFyeVxuXHQ8c3VtbWFyeT5cblx0XHRcXCR7MX1cblx0PC9zdW1tYXJ5Plxuc25pcHBldCBzdXBcblx0PHN1cD5cXCR7MX08L3N1cD5cbnNuaXBwZXQgdGFibGVcblx0PHRhYmxlIGJvcmRlcj1cIlxcJHsxOjB9XCI+XG5cdFx0XFwkezJ9XG5cdDwvdGFibGU+XG5zbmlwcGV0IHRhYmxlLlxuXHQ8dGFibGUgY2xhc3M9XCJcXCR7MX1cIiBib3JkZXI9XCJcXCR7MjowfVwiPlxuXHRcdFxcJHszfVxuXHQ8L3RhYmxlPlxuc25pcHBldCB0YWJsZSNcblx0PHRhYmxlIGlkPVwiXFwkezF9XCIgYm9yZGVyPVwiXFwkezI6MH1cIj5cblx0XHRcXCR7M31cblx0PC90YWJsZT5cbnNuaXBwZXQgdGJvZHlcblx0PHRib2R5PlxuXHRcdFxcJHsxfVxuXHQ8L3Rib2R5Plxuc25pcHBldCB0ZFxuXHQ8dGQ+XFwkezF9PC90ZD5cbnNuaXBwZXQgdGQuXG5cdDx0ZCBjbGFzcz1cIlxcJHsxfVwiPlxcJHsyfTwvdGQ+XG5zbmlwcGV0IHRkI1xuXHQ8dGQgaWQ9XCJcXCR7MX1cIj5cXCR7Mn08L3RkPlxuc25pcHBldCB0ZCtcblx0PHRkPlxcJHsxfTwvdGQ+XG5cdHRkK1xcJHsyfVxuc25pcHBldCB0ZXh0YXJlYVxuXHQ8dGV4dGFyZWEgbmFtZT1cIlxcJHsxfVwiIGlkPVxcJHsyOlxcJDF9IHJvd3M9XCJcXCR7Mzo4fVwiIGNvbHM9XCJcXCR7NDo0MH1cIj5cXCR7NX08L3RleHRhcmVhPlxcJHs2fVxuc25pcHBldCB0Zm9vdFxuXHQ8dGZvb3Q+XG5cdFx0XFwkezF9XG5cdDwvdGZvb3Q+XG5zbmlwcGV0IHRoXG5cdDx0aD5cXCR7MX08L3RoPlxuc25pcHBldCB0aC5cblx0PHRoIGNsYXNzPVwiXFwkezF9XCI+XFwkezJ9PC90aD5cbnNuaXBwZXQgdGgjXG5cdDx0aCBpZD1cIlxcJHsxfVwiPlxcJHsyfTwvdGg+XG5zbmlwcGV0IHRoK1xuXHQ8dGg+XFwkezF9PC90aD5cblx0dGgrXFwkezJ9XG5zbmlwcGV0IHRoZWFkXG5cdDx0aGVhZD5cblx0XHRcXCR7MX1cblx0PC90aGVhZD5cbnNuaXBwZXQgdGltZVxuXHQ8dGltZSBkYXRldGltZT1cIlxcJHsxfVwiIHB1YmRhdGU9XCJcXCR7MjpcXCQxfT5cXCR7MzpcXCQxfTwvdGltZT5cbnNuaXBwZXQgdGl0bGVcblx0PHRpdGxlPlxcJHsxOlxcYHN1YnN0aXR1dGUoRmlsZW5hbWUoJycsICdQYWdlIFRpdGxlJyksICdeLicsICdcXFxcdSYnLCAnJylcXGB9PC90aXRsZT5cbnNuaXBwZXQgdHJcblx0PHRyPlxuXHRcdFxcJHsxfVxuXHQ8L3RyPlxuc25pcHBldCB0citcblx0PHRyPlxuXHRcdDx0ZD5cXCR7MX08L3RkPlxuXHRcdHRkK1xcJHsyfVxuXHQ8L3RyPlxuc25pcHBldCB0cmFja1xuXHQ8dHJhY2sgc3JjPVwiXFwkezF9XCIgc3JjbGFuZz1cIlxcJHsyfVwiIGxhYmVsPVwiXFwkezN9XCIgZGVmYXVsdD1cIlxcJHs0OmRlZmF1bHR9PlxcJHs1fTwvdHJhY2s+XFwkezZ9XG5zbmlwcGV0IHVsXG5cdDx1bD5cblx0XHRcXCR7MX1cblx0PC91bD5cbnNuaXBwZXQgdWwuXG5cdDx1bCBjbGFzcz1cIlxcJHsxfVwiPlxuXHRcdFxcJHsyfVxuXHQ8L3VsPlxuc25pcHBldCB1bCNcblx0PHVsIGlkPVwiXFwkezF9XCI+XG5cdFx0XFwkezJ9XG5cdDwvdWw+XG5zbmlwcGV0IHVsK1xuXHQ8dWw+XG5cdFx0PGxpPlxcJHsxfTwvbGk+XG5cdFx0bGkrXFwkezJ9XG5cdDwvdWw+XG5zbmlwcGV0IHZhclxuXHQ8dmFyPlxcJHsxfTwvdmFyPlxuc25pcHBldCB2aWRlb1xuXHQ8dmlkZW8gc3JjPVwiXFwkezF9XCIgaGVpZ2h0PVwiXFwkezJ9XCIgd2lkdGg9XCJcXCR7M31cIiBwcmVsb2FkPVwiXFwkezU6bm9uZX1cIiBhdXRvcGxheT1cIlxcJHs2OmF1dG9wbGF5fVwiPlxcJHs3fTwvdmlkZW8+XFwkezh9XG5zbmlwcGV0IHdiclxuXHQ8d2JyIC8+XFwkezF9XG5gO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9