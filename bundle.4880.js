(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4880],{

/***/ 64880:
/***/ ((module) => {

module.exports = `snippet ec
	echo \${1};
snippet ns
	namespace \${1:Foo\\Bar\\Baz};
	\${2}
snippet use
	use \${1:Foo\\Bar\\Baz};
	\${2}
snippet c
	\${1:abstract }class \${2:\$FILENAME}
	{
		\${3}
	}
snippet i
	interface \${1:\$FILENAME}
	{
		\${2}
	}
snippet t.
	\$this->\${1}
snippet f
	function \${1:foo}(\${2:array }\${3:\$bar})
	{
		\${4}
	}
# method
snippet m
	\${1:abstract }\${2:protected}\${3: static} function \${4:foo}(\${5:array }\${6:\$bar})
	{
		\${7}
	}
# setter method
snippet sm
	/**
	 * Sets the value of \${1:foo}
	 *
	 * @param \${2:\$1} \$\$1 \${3:description}
	 *
	 * @return \${4:\$FILENAME}
	 */
	\${5:public} function set\${6:\$2}(\${7:\$2 }\$\$1)
	{
		\$this->\${8:\$1} = \$\$1;
		return \$this;
	}\${9}
# getter method
snippet gm
	/**
	 * Gets the value of \${1:foo}
	 *
	 * @return \${2:\$1}
	 */
	\${3:public} function get\${4:\$2}()
	{
		return \$this->\${5:\$1};
	}\${6}
#setter
snippet \$s
	\${1:\$foo}->set\${2:Bar}(\${3});
#getter
snippet \$g
	\${1:\$foo}->get\${2:Bar}();

# Tertiary conditional
snippet =?:
	\$\${1:foo} = \${2:true} ? \${3:a} : \${4};
snippet ?:
	\${1:true} ? \${2:a} : \${3}

snippet C
	\$_COOKIE['\${1:variable}']\${2}
snippet E
	\$_ENV['\${1:variable}']\${2}
snippet F
	\$_FILES['\${1:variable}']\${2}
snippet G
	\$_GET['\${1:variable}']\${2}
snippet P
	\$_POST['\${1:variable}']\${2}
snippet R
	\$_REQUEST['\${1:variable}']\${2}
snippet S
	\$_SERVER['\${1:variable}']\${2}
snippet SS
	\$_SESSION['\${1:variable}']\${2}

# the following are old ones
snippet inc
	include '\${1:file}';\${2}
snippet inc1
	include_once '\${1:file}';\${2}
snippet req
	require '\${1:file}';\${2}
snippet req1
	require_once '\${1:file}';\${2}
# Start Docblock
snippet /*
	/**
	 * \${1}
	 */
# Class - post doc
snippet doc_cp
	/**
	 * \${1:undocumented class}
	 *
	 * @package \${2:default}
	 * @subpackage \${3:default}
	 * @author \${4:\`g:snips_author\`}
	 */\${5}
# Class Variable - post doc
snippet doc_vp
	/**
	 * \${1:undocumented class variable}
	 *
	 * @var \${2:string}
	 */\${3}
# Class Variable
snippet doc_v
	/**
	 * \${3:undocumented class variable}
	 *
	 * @var \${4:string}
	 */
	\${1:var} \$\${2};\${5}
# Class
snippet doc_c
	/**
	 * \${3:undocumented class}
	 *
	 * @package \${4:default}
	 * @subpackage \${5:default}
	 * @author \${6:\`g:snips_author\`}
	 */
	\${1:}class \${2:}
	{
		\${7}
	} // END \$1class \$2
# Constant Definition - post doc
snippet doc_dp
	/**
	 * \${1:undocumented constant}
	 */\${2}
# Constant Definition
snippet doc_d
	/**
	 * \${3:undocumented constant}
	 */
	define(\${1}, \${2});\${4}
# Function - post doc
snippet doc_fp
	/**
	 * \${1:undocumented function}
	 *
	 * @return \${2:void}
	 * @author \${3:\`g:snips_author\`}
	 */\${4}
# Function signature
snippet doc_s
	/**
	 * \${4:undocumented function}
	 *
	 * @return \${5:void}
	 * @author \${6:\`g:snips_author\`}
	 */
	\${1}function \${2}(\${3});\${7}
# Function
snippet doc_f
	/**
	 * \${4:undocumented function}
	 *
	 * @return \${5:void}
	 * @author \${6:\`g:snips_author\`}
	 */
	\${1}function \${2}(\${3})
	{\${7}
	}
# Header
snippet doc_h
	/**
	 * \${1}
	 *
	 * @author \${2:\`g:snips_author\`}
	 * @version \${3:\$Id\$}
	 * @copyright \${4:\$2}, \`strftime('%d %B, %Y')\`
	 * @package \${5:default}
	 */

# Interface
snippet interface
	/**
	 * \${2:undocumented class}
	 *
	 * @package \${3:default}
	 * @author \${4:\`g:snips_author\`}
	 */
	interface \${1:\$FILENAME}
	{
		\${5}
	}
# class ...
snippet class
	/**
	 * \${1}
	 */
	class \${2:\$FILENAME}
	{
		\${3}
		/**
		 * \${4}
		 */
		\${5:public} function \${6:__construct}(\${7:argument})
		{
			\${8:// code...}
		}
	}
# define(...)
snippet def
	define('\${1}'\${2});\${3}
# defined(...)
snippet def?
	\${1}defined('\${2}')\${3}
snippet wh
	while (\${1:/* condition */}) {
		\${2:// code...}
	}
# do ... while
snippet do
	do {
		\${2:// code... }
	} while (\${1:/* condition */});
snippet if
	if (\${1:/* condition */}) {
		\${2:// code...}
	}
snippet ife
	if (\${1:/* condition */}) {
		\${2:// code...}
	} else {
		\${3:// code...}
	}
	\${4}
snippet else
	else {
		\${1:// code...}
	}
snippet elseif
	elseif (\${1:/* condition */}) {
		\${2:// code...}
	}
snippet switch
	switch (\$\${1:variable}) {
		case '\${2:value}':
			\${3:// code...}
			break;
		\${5}
		default:
			\${4:// code...}
			break;
	}
snippet case
	case '\${1:value}':
		\${2:// code...}
		break;\${3}
snippet for
	for (\$\${2:i} = 0; \$\$2 < \${1:count}; \$\$2\${3:++}) {
		\${4: // code...}
	}
snippet foreach
	foreach (\$\${1:variable} as \$\${2:value}) {
		\${3:// code...}
	}
snippet foreachk
	foreach (\$\${1:variable} as \$\${2:key} => \$\${3:value}) {
		\${4:// code...}
	}
# \$... = array (...)
snippet array
	\$\${1:arrayName} = array('\${2}' => \${3});\${4}
snippet try
	try {
		\${2}
	} catch (\${1:Exception} \$e) {
	}
# lambda with closure
snippet lambda
	\${1:static }function (\${2:args}) use (\${3:&\$x, \$y /*put vars in scope (closure) */}) {
		\${4}
	};
# pre_dump();
snippet pd
	echo '<pre>'; var_dump(\${1}); echo '</pre>';
# pre_dump(); die();
snippet pdd
	echo '<pre>'; var_dump(\${1}); echo '</pre>'; die(\${2:});
snippet vd
	var_dump(\${1});
snippet vdd
	var_dump(\${1}); die(\${2:});
snippet http_redirect
	header ("HTTP/1.1 301 Moved Permanently");
	header ("Location: ".URL);
	exit();
# Getters & Setters
snippet gs
	/**
	 * Gets the value of \${1:foo}
	 *
	 * @return \${2:\$1}
	 */
	public function get\${3:\$2}()
	{
		return \$this->\${4:\$1};
	}

	/**
	 * Sets the value of \$1
	 *
	 * @param \$2 \$\$1 \${5:description}
	 *
	 * @return \${6:\$FILENAME}
	 */
	public function set\$3(\${7:\$2 }\$\$1)
	{
		\$this->\$4 = \$\$1;
		return \$this;
	}\${8}
# anotation, get, and set, useful for doctrine
snippet ags
	/**
	 * \${1:description}
	 *
	 * @\${7}
	 */
	\${2:protected} \$\${3:foo};

	public function get\${4:\$3}()
	{
		return \$this->\$3;
	}

	public function set\$4(\${5:\$4 }\$\${6:\$3})
	{
		\$this->\$3 = \$\$6;
		return \$this;
	}
snippet rett
	return true;
snippet retf
	return false;
scope html
snippet <?
	<?php

	\${1}
snippet <?e
	<?php echo \${1} ?>
# this one is for php5.4
snippet <?=
	<?=\${1}?>
snippet ifil
	<?php if (\${1:/* condition */}): ?>
		\${2:<!-- code... -->}
	<?php endif; ?>
snippet ifeil
	<?php if (\${1:/* condition */}): ?>
		\${2:<!-- html... -->}
	<?php else: ?>
		\${3:<!-- html... -->}
	<?php endif; ?>
	\${4}
snippet foreachil
	<?php foreach (\$\${1:variable} as \$\${2:value}): ?>
		\${3:<!-- html... -->}
	<?php endforeach; ?>
snippet foreachkil
	<?php foreach (\$\${1:variable} as \$\${2:key} => \$\${3:value}): ?>
		\${4:<!-- html... -->}
	<?php endforeach; ?>
scope html-tag
snippet ifil\\n\\
	<?php if (\${1:true}): ?>\${2:code}<?php endif; ?>
snippet ifeil\\n\\
	<?php if (\${1:true}): ?>\${2:code}<?php else: ?>\${3:code}<?php endif; ?>\${4}
`;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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a0I7QUFDaEMsS0FBSztBQUNMLGNBQWM7QUFDZDtBQUNBLGNBQWMsa0JBQWtCO0FBQ2hDLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTCxjQUFjO0FBQ2QsSUFBSTtBQUNKO0FBQ0EscUJBQXFCLFlBQVksUUFBUSxRQUFRO0FBQ2pELEtBQUs7QUFDTCxtQkFBbUI7QUFDbkI7QUFDQSxxQkFBcUIsWUFBWSxRQUFRLE9BQU8sUUFBUSxRQUFRO0FBQ2hFLEtBQUs7QUFDTCxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLGNBQWMsT0FBTyxRQUFRLE9BQU8sYUFBYTtBQUNqRDtBQUNBLGNBQWMsT0FBTyxRQUFRLE9BQU8saUJBQWlCLE9BQU8sYUFBYSxLQUFLO0FBQzlFIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvc25pcHBldHMvcGhwLnNuaXBwZXRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gYHNuaXBwZXQgZWNcblx0ZWNobyBcXCR7MX07XG5zbmlwcGV0IG5zXG5cdG5hbWVzcGFjZSBcXCR7MTpGb29cXFxcQmFyXFxcXEJhen07XG5cdFxcJHsyfVxuc25pcHBldCB1c2Vcblx0dXNlIFxcJHsxOkZvb1xcXFxCYXJcXFxcQmF6fTtcblx0XFwkezJ9XG5zbmlwcGV0IGNcblx0XFwkezE6YWJzdHJhY3QgfWNsYXNzIFxcJHsyOlxcJEZJTEVOQU1FfVxuXHR7XG5cdFx0XFwkezN9XG5cdH1cbnNuaXBwZXQgaVxuXHRpbnRlcmZhY2UgXFwkezE6XFwkRklMRU5BTUV9XG5cdHtcblx0XHRcXCR7Mn1cblx0fVxuc25pcHBldCB0LlxuXHRcXCR0aGlzLT5cXCR7MX1cbnNuaXBwZXQgZlxuXHRmdW5jdGlvbiBcXCR7MTpmb299KFxcJHsyOmFycmF5IH1cXCR7MzpcXCRiYXJ9KVxuXHR7XG5cdFx0XFwkezR9XG5cdH1cbiMgbWV0aG9kXG5zbmlwcGV0IG1cblx0XFwkezE6YWJzdHJhY3QgfVxcJHsyOnByb3RlY3RlZH1cXCR7Mzogc3RhdGljfSBmdW5jdGlvbiBcXCR7NDpmb299KFxcJHs1OmFycmF5IH1cXCR7NjpcXCRiYXJ9KVxuXHR7XG5cdFx0XFwkezd9XG5cdH1cbiMgc2V0dGVyIG1ldGhvZFxuc25pcHBldCBzbVxuXHQvKipcblx0ICogU2V0cyB0aGUgdmFsdWUgb2YgXFwkezE6Zm9vfVxuXHQgKlxuXHQgKiBAcGFyYW0gXFwkezI6XFwkMX0gXFwkXFwkMSBcXCR7MzpkZXNjcmlwdGlvbn1cblx0ICpcblx0ICogQHJldHVybiBcXCR7NDpcXCRGSUxFTkFNRX1cblx0ICovXG5cdFxcJHs1OnB1YmxpY30gZnVuY3Rpb24gc2V0XFwkezY6XFwkMn0oXFwkezc6XFwkMiB9XFwkXFwkMSlcblx0e1xuXHRcdFxcJHRoaXMtPlxcJHs4OlxcJDF9ID0gXFwkXFwkMTtcblx0XHRyZXR1cm4gXFwkdGhpcztcblx0fVxcJHs5fVxuIyBnZXR0ZXIgbWV0aG9kXG5zbmlwcGV0IGdtXG5cdC8qKlxuXHQgKiBHZXRzIHRoZSB2YWx1ZSBvZiBcXCR7MTpmb299XG5cdCAqXG5cdCAqIEByZXR1cm4gXFwkezI6XFwkMX1cblx0ICovXG5cdFxcJHszOnB1YmxpY30gZnVuY3Rpb24gZ2V0XFwkezQ6XFwkMn0oKVxuXHR7XG5cdFx0cmV0dXJuIFxcJHRoaXMtPlxcJHs1OlxcJDF9O1xuXHR9XFwkezZ9XG4jc2V0dGVyXG5zbmlwcGV0IFxcJHNcblx0XFwkezE6XFwkZm9vfS0+c2V0XFwkezI6QmFyfShcXCR7M30pO1xuI2dldHRlclxuc25pcHBldCBcXCRnXG5cdFxcJHsxOlxcJGZvb30tPmdldFxcJHsyOkJhcn0oKTtcblxuIyBUZXJ0aWFyeSBjb25kaXRpb25hbFxuc25pcHBldCA9Pzpcblx0XFwkXFwkezE6Zm9vfSA9IFxcJHsyOnRydWV9ID8gXFwkezM6YX0gOiBcXCR7NH07XG5zbmlwcGV0ID86XG5cdFxcJHsxOnRydWV9ID8gXFwkezI6YX0gOiBcXCR7M31cblxuc25pcHBldCBDXG5cdFxcJF9DT09LSUVbJ1xcJHsxOnZhcmlhYmxlfSddXFwkezJ9XG5zbmlwcGV0IEVcblx0XFwkX0VOVlsnXFwkezE6dmFyaWFibGV9J11cXCR7Mn1cbnNuaXBwZXQgRlxuXHRcXCRfRklMRVNbJ1xcJHsxOnZhcmlhYmxlfSddXFwkezJ9XG5zbmlwcGV0IEdcblx0XFwkX0dFVFsnXFwkezE6dmFyaWFibGV9J11cXCR7Mn1cbnNuaXBwZXQgUFxuXHRcXCRfUE9TVFsnXFwkezE6dmFyaWFibGV9J11cXCR7Mn1cbnNuaXBwZXQgUlxuXHRcXCRfUkVRVUVTVFsnXFwkezE6dmFyaWFibGV9J11cXCR7Mn1cbnNuaXBwZXQgU1xuXHRcXCRfU0VSVkVSWydcXCR7MTp2YXJpYWJsZX0nXVxcJHsyfVxuc25pcHBldCBTU1xuXHRcXCRfU0VTU0lPTlsnXFwkezE6dmFyaWFibGV9J11cXCR7Mn1cblxuIyB0aGUgZm9sbG93aW5nIGFyZSBvbGQgb25lc1xuc25pcHBldCBpbmNcblx0aW5jbHVkZSAnXFwkezE6ZmlsZX0nO1xcJHsyfVxuc25pcHBldCBpbmMxXG5cdGluY2x1ZGVfb25jZSAnXFwkezE6ZmlsZX0nO1xcJHsyfVxuc25pcHBldCByZXFcblx0cmVxdWlyZSAnXFwkezE6ZmlsZX0nO1xcJHsyfVxuc25pcHBldCByZXExXG5cdHJlcXVpcmVfb25jZSAnXFwkezE6ZmlsZX0nO1xcJHsyfVxuIyBTdGFydCBEb2NibG9ja1xuc25pcHBldCAvKlxuXHQvKipcblx0ICogXFwkezF9XG5cdCAqL1xuIyBDbGFzcyAtIHBvc3QgZG9jXG5zbmlwcGV0IGRvY19jcFxuXHQvKipcblx0ICogXFwkezE6dW5kb2N1bWVudGVkIGNsYXNzfVxuXHQgKlxuXHQgKiBAcGFja2FnZSBcXCR7MjpkZWZhdWx0fVxuXHQgKiBAc3VicGFja2FnZSBcXCR7MzpkZWZhdWx0fVxuXHQgKiBAYXV0aG9yIFxcJHs0OlxcYGc6c25pcHNfYXV0aG9yXFxgfVxuXHQgKi9cXCR7NX1cbiMgQ2xhc3MgVmFyaWFibGUgLSBwb3N0IGRvY1xuc25pcHBldCBkb2NfdnBcblx0LyoqXG5cdCAqIFxcJHsxOnVuZG9jdW1lbnRlZCBjbGFzcyB2YXJpYWJsZX1cblx0ICpcblx0ICogQHZhciBcXCR7MjpzdHJpbmd9XG5cdCAqL1xcJHszfVxuIyBDbGFzcyBWYXJpYWJsZVxuc25pcHBldCBkb2NfdlxuXHQvKipcblx0ICogXFwkezM6dW5kb2N1bWVudGVkIGNsYXNzIHZhcmlhYmxlfVxuXHQgKlxuXHQgKiBAdmFyIFxcJHs0OnN0cmluZ31cblx0ICovXG5cdFxcJHsxOnZhcn0gXFwkXFwkezJ9O1xcJHs1fVxuIyBDbGFzc1xuc25pcHBldCBkb2NfY1xuXHQvKipcblx0ICogXFwkezM6dW5kb2N1bWVudGVkIGNsYXNzfVxuXHQgKlxuXHQgKiBAcGFja2FnZSBcXCR7NDpkZWZhdWx0fVxuXHQgKiBAc3VicGFja2FnZSBcXCR7NTpkZWZhdWx0fVxuXHQgKiBAYXV0aG9yIFxcJHs2OlxcYGc6c25pcHNfYXV0aG9yXFxgfVxuXHQgKi9cblx0XFwkezE6fWNsYXNzIFxcJHsyOn1cblx0e1xuXHRcdFxcJHs3fVxuXHR9IC8vIEVORCBcXCQxY2xhc3MgXFwkMlxuIyBDb25zdGFudCBEZWZpbml0aW9uIC0gcG9zdCBkb2NcbnNuaXBwZXQgZG9jX2RwXG5cdC8qKlxuXHQgKiBcXCR7MTp1bmRvY3VtZW50ZWQgY29uc3RhbnR9XG5cdCAqL1xcJHsyfVxuIyBDb25zdGFudCBEZWZpbml0aW9uXG5zbmlwcGV0IGRvY19kXG5cdC8qKlxuXHQgKiBcXCR7Mzp1bmRvY3VtZW50ZWQgY29uc3RhbnR9XG5cdCAqL1xuXHRkZWZpbmUoXFwkezF9LCBcXCR7Mn0pO1xcJHs0fVxuIyBGdW5jdGlvbiAtIHBvc3QgZG9jXG5zbmlwcGV0IGRvY19mcFxuXHQvKipcblx0ICogXFwkezE6dW5kb2N1bWVudGVkIGZ1bmN0aW9ufVxuXHQgKlxuXHQgKiBAcmV0dXJuIFxcJHsyOnZvaWR9XG5cdCAqIEBhdXRob3IgXFwkezM6XFxgZzpzbmlwc19hdXRob3JcXGB9XG5cdCAqL1xcJHs0fVxuIyBGdW5jdGlvbiBzaWduYXR1cmVcbnNuaXBwZXQgZG9jX3Ncblx0LyoqXG5cdCAqIFxcJHs0OnVuZG9jdW1lbnRlZCBmdW5jdGlvbn1cblx0ICpcblx0ICogQHJldHVybiBcXCR7NTp2b2lkfVxuXHQgKiBAYXV0aG9yIFxcJHs2OlxcYGc6c25pcHNfYXV0aG9yXFxgfVxuXHQgKi9cblx0XFwkezF9ZnVuY3Rpb24gXFwkezJ9KFxcJHszfSk7XFwkezd9XG4jIEZ1bmN0aW9uXG5zbmlwcGV0IGRvY19mXG5cdC8qKlxuXHQgKiBcXCR7NDp1bmRvY3VtZW50ZWQgZnVuY3Rpb259XG5cdCAqXG5cdCAqIEByZXR1cm4gXFwkezU6dm9pZH1cblx0ICogQGF1dGhvciBcXCR7NjpcXGBnOnNuaXBzX2F1dGhvclxcYH1cblx0ICovXG5cdFxcJHsxfWZ1bmN0aW9uIFxcJHsyfShcXCR7M30pXG5cdHtcXCR7N31cblx0fVxuIyBIZWFkZXJcbnNuaXBwZXQgZG9jX2hcblx0LyoqXG5cdCAqIFxcJHsxfVxuXHQgKlxuXHQgKiBAYXV0aG9yIFxcJHsyOlxcYGc6c25pcHNfYXV0aG9yXFxgfVxuXHQgKiBAdmVyc2lvbiBcXCR7MzpcXCRJZFxcJH1cblx0ICogQGNvcHlyaWdodCBcXCR7NDpcXCQyfSwgXFxgc3RyZnRpbWUoJyVkICVCLCAlWScpXFxgXG5cdCAqIEBwYWNrYWdlIFxcJHs1OmRlZmF1bHR9XG5cdCAqL1xuXG4jIEludGVyZmFjZVxuc25pcHBldCBpbnRlcmZhY2Vcblx0LyoqXG5cdCAqIFxcJHsyOnVuZG9jdW1lbnRlZCBjbGFzc31cblx0ICpcblx0ICogQHBhY2thZ2UgXFwkezM6ZGVmYXVsdH1cblx0ICogQGF1dGhvciBcXCR7NDpcXGBnOnNuaXBzX2F1dGhvclxcYH1cblx0ICovXG5cdGludGVyZmFjZSBcXCR7MTpcXCRGSUxFTkFNRX1cblx0e1xuXHRcdFxcJHs1fVxuXHR9XG4jIGNsYXNzIC4uLlxuc25pcHBldCBjbGFzc1xuXHQvKipcblx0ICogXFwkezF9XG5cdCAqL1xuXHRjbGFzcyBcXCR7MjpcXCRGSUxFTkFNRX1cblx0e1xuXHRcdFxcJHszfVxuXHRcdC8qKlxuXHRcdCAqIFxcJHs0fVxuXHRcdCAqL1xuXHRcdFxcJHs1OnB1YmxpY30gZnVuY3Rpb24gXFwkezY6X19jb25zdHJ1Y3R9KFxcJHs3OmFyZ3VtZW50fSlcblx0XHR7XG5cdFx0XHRcXCR7ODovLyBjb2RlLi4ufVxuXHRcdH1cblx0fVxuIyBkZWZpbmUoLi4uKVxuc25pcHBldCBkZWZcblx0ZGVmaW5lKCdcXCR7MX0nXFwkezJ9KTtcXCR7M31cbiMgZGVmaW5lZCguLi4pXG5zbmlwcGV0IGRlZj9cblx0XFwkezF9ZGVmaW5lZCgnXFwkezJ9JylcXCR7M31cbnNuaXBwZXQgd2hcblx0d2hpbGUgKFxcJHsxOi8qIGNvbmRpdGlvbiAqL30pIHtcblx0XHRcXCR7MjovLyBjb2RlLi4ufVxuXHR9XG4jIGRvIC4uLiB3aGlsZVxuc25pcHBldCBkb1xuXHRkbyB7XG5cdFx0XFwkezI6Ly8gY29kZS4uLiB9XG5cdH0gd2hpbGUgKFxcJHsxOi8qIGNvbmRpdGlvbiAqL30pO1xuc25pcHBldCBpZlxuXHRpZiAoXFwkezE6LyogY29uZGl0aW9uICovfSkge1xuXHRcdFxcJHsyOi8vIGNvZGUuLi59XG5cdH1cbnNuaXBwZXQgaWZlXG5cdGlmIChcXCR7MTovKiBjb25kaXRpb24gKi99KSB7XG5cdFx0XFwkezI6Ly8gY29kZS4uLn1cblx0fSBlbHNlIHtcblx0XHRcXCR7MzovLyBjb2RlLi4ufVxuXHR9XG5cdFxcJHs0fVxuc25pcHBldCBlbHNlXG5cdGVsc2Uge1xuXHRcdFxcJHsxOi8vIGNvZGUuLi59XG5cdH1cbnNuaXBwZXQgZWxzZWlmXG5cdGVsc2VpZiAoXFwkezE6LyogY29uZGl0aW9uICovfSkge1xuXHRcdFxcJHsyOi8vIGNvZGUuLi59XG5cdH1cbnNuaXBwZXQgc3dpdGNoXG5cdHN3aXRjaCAoXFwkXFwkezE6dmFyaWFibGV9KSB7XG5cdFx0Y2FzZSAnXFwkezI6dmFsdWV9Jzpcblx0XHRcdFxcJHszOi8vIGNvZGUuLi59XG5cdFx0XHRicmVhaztcblx0XHRcXCR7NX1cblx0XHRkZWZhdWx0OlxuXHRcdFx0XFwkezQ6Ly8gY29kZS4uLn1cblx0XHRcdGJyZWFrO1xuXHR9XG5zbmlwcGV0IGNhc2Vcblx0Y2FzZSAnXFwkezE6dmFsdWV9Jzpcblx0XHRcXCR7MjovLyBjb2RlLi4ufVxuXHRcdGJyZWFrO1xcJHszfVxuc25pcHBldCBmb3Jcblx0Zm9yIChcXCRcXCR7MjppfSA9IDA7IFxcJFxcJDIgPCBcXCR7MTpjb3VudH07IFxcJFxcJDJcXCR7MzorK30pIHtcblx0XHRcXCR7NDogLy8gY29kZS4uLn1cblx0fVxuc25pcHBldCBmb3JlYWNoXG5cdGZvcmVhY2ggKFxcJFxcJHsxOnZhcmlhYmxlfSBhcyBcXCRcXCR7Mjp2YWx1ZX0pIHtcblx0XHRcXCR7MzovLyBjb2RlLi4ufVxuXHR9XG5zbmlwcGV0IGZvcmVhY2hrXG5cdGZvcmVhY2ggKFxcJFxcJHsxOnZhcmlhYmxlfSBhcyBcXCRcXCR7MjprZXl9ID0+IFxcJFxcJHszOnZhbHVlfSkge1xuXHRcdFxcJHs0Oi8vIGNvZGUuLi59XG5cdH1cbiMgXFwkLi4uID0gYXJyYXkgKC4uLilcbnNuaXBwZXQgYXJyYXlcblx0XFwkXFwkezE6YXJyYXlOYW1lfSA9IGFycmF5KCdcXCR7Mn0nID0+IFxcJHszfSk7XFwkezR9XG5zbmlwcGV0IHRyeVxuXHR0cnkge1xuXHRcdFxcJHsyfVxuXHR9IGNhdGNoIChcXCR7MTpFeGNlcHRpb259IFxcJGUpIHtcblx0fVxuIyBsYW1iZGEgd2l0aCBjbG9zdXJlXG5zbmlwcGV0IGxhbWJkYVxuXHRcXCR7MTpzdGF0aWMgfWZ1bmN0aW9uIChcXCR7MjphcmdzfSkgdXNlIChcXCR7MzomXFwkeCwgXFwkeSAvKnB1dCB2YXJzIGluIHNjb3BlIChjbG9zdXJlKSAqL30pIHtcblx0XHRcXCR7NH1cblx0fTtcbiMgcHJlX2R1bXAoKTtcbnNuaXBwZXQgcGRcblx0ZWNobyAnPHByZT4nOyB2YXJfZHVtcChcXCR7MX0pOyBlY2hvICc8L3ByZT4nO1xuIyBwcmVfZHVtcCgpOyBkaWUoKTtcbnNuaXBwZXQgcGRkXG5cdGVjaG8gJzxwcmU+JzsgdmFyX2R1bXAoXFwkezF9KTsgZWNobyAnPC9wcmU+JzsgZGllKFxcJHsyOn0pO1xuc25pcHBldCB2ZFxuXHR2YXJfZHVtcChcXCR7MX0pO1xuc25pcHBldCB2ZGRcblx0dmFyX2R1bXAoXFwkezF9KTsgZGllKFxcJHsyOn0pO1xuc25pcHBldCBodHRwX3JlZGlyZWN0XG5cdGhlYWRlciAoXCJIVFRQLzEuMSAzMDEgTW92ZWQgUGVybWFuZW50bHlcIik7XG5cdGhlYWRlciAoXCJMb2NhdGlvbjogXCIuVVJMKTtcblx0ZXhpdCgpO1xuIyBHZXR0ZXJzICYgU2V0dGVyc1xuc25pcHBldCBnc1xuXHQvKipcblx0ICogR2V0cyB0aGUgdmFsdWUgb2YgXFwkezE6Zm9vfVxuXHQgKlxuXHQgKiBAcmV0dXJuIFxcJHsyOlxcJDF9XG5cdCAqL1xuXHRwdWJsaWMgZnVuY3Rpb24gZ2V0XFwkezM6XFwkMn0oKVxuXHR7XG5cdFx0cmV0dXJuIFxcJHRoaXMtPlxcJHs0OlxcJDF9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFNldHMgdGhlIHZhbHVlIG9mIFxcJDFcblx0ICpcblx0ICogQHBhcmFtIFxcJDIgXFwkXFwkMSBcXCR7NTpkZXNjcmlwdGlvbn1cblx0ICpcblx0ICogQHJldHVybiBcXCR7NjpcXCRGSUxFTkFNRX1cblx0ICovXG5cdHB1YmxpYyBmdW5jdGlvbiBzZXRcXCQzKFxcJHs3OlxcJDIgfVxcJFxcJDEpXG5cdHtcblx0XHRcXCR0aGlzLT5cXCQ0ID0gXFwkXFwkMTtcblx0XHRyZXR1cm4gXFwkdGhpcztcblx0fVxcJHs4fVxuIyBhbm90YXRpb24sIGdldCwgYW5kIHNldCwgdXNlZnVsIGZvciBkb2N0cmluZVxuc25pcHBldCBhZ3Ncblx0LyoqXG5cdCAqIFxcJHsxOmRlc2NyaXB0aW9ufVxuXHQgKlxuXHQgKiBAXFwkezd9XG5cdCAqL1xuXHRcXCR7Mjpwcm90ZWN0ZWR9IFxcJFxcJHszOmZvb307XG5cblx0cHVibGljIGZ1bmN0aW9uIGdldFxcJHs0OlxcJDN9KClcblx0e1xuXHRcdHJldHVybiBcXCR0aGlzLT5cXCQzO1xuXHR9XG5cblx0cHVibGljIGZ1bmN0aW9uIHNldFxcJDQoXFwkezU6XFwkNCB9XFwkXFwkezY6XFwkM30pXG5cdHtcblx0XHRcXCR0aGlzLT5cXCQzID0gXFwkXFwkNjtcblx0XHRyZXR1cm4gXFwkdGhpcztcblx0fVxuc25pcHBldCByZXR0XG5cdHJldHVybiB0cnVlO1xuc25pcHBldCByZXRmXG5cdHJldHVybiBmYWxzZTtcbnNjb3BlIGh0bWxcbnNuaXBwZXQgPD9cblx0PD9waHBcblxuXHRcXCR7MX1cbnNuaXBwZXQgPD9lXG5cdDw/cGhwIGVjaG8gXFwkezF9ID8+XG4jIHRoaXMgb25lIGlzIGZvciBwaHA1LjRcbnNuaXBwZXQgPD89XG5cdDw/PVxcJHsxfT8+XG5zbmlwcGV0IGlmaWxcblx0PD9waHAgaWYgKFxcJHsxOi8qIGNvbmRpdGlvbiAqL30pOiA/PlxuXHRcdFxcJHsyOjwhLS0gY29kZS4uLiAtLT59XG5cdDw/cGhwIGVuZGlmOyA/Plxuc25pcHBldCBpZmVpbFxuXHQ8P3BocCBpZiAoXFwkezE6LyogY29uZGl0aW9uICovfSk6ID8+XG5cdFx0XFwkezI6PCEtLSBodG1sLi4uIC0tPn1cblx0PD9waHAgZWxzZTogPz5cblx0XHRcXCR7Mzo8IS0tIGh0bWwuLi4gLS0+fVxuXHQ8P3BocCBlbmRpZjsgPz5cblx0XFwkezR9XG5zbmlwcGV0IGZvcmVhY2hpbFxuXHQ8P3BocCBmb3JlYWNoIChcXCRcXCR7MTp2YXJpYWJsZX0gYXMgXFwkXFwkezI6dmFsdWV9KTogPz5cblx0XHRcXCR7Mzo8IS0tIGh0bWwuLi4gLS0+fVxuXHQ8P3BocCBlbmRmb3JlYWNoOyA/Plxuc25pcHBldCBmb3JlYWNoa2lsXG5cdDw/cGhwIGZvcmVhY2ggKFxcJFxcJHsxOnZhcmlhYmxlfSBhcyBcXCRcXCR7MjprZXl9ID0+IFxcJFxcJHszOnZhbHVlfSk6ID8+XG5cdFx0XFwkezQ6PCEtLSBodG1sLi4uIC0tPn1cblx0PD9waHAgZW5kZm9yZWFjaDsgPz5cbnNjb3BlIGh0bWwtdGFnXG5zbmlwcGV0IGlmaWxcXFxcblxcXFxcblx0PD9waHAgaWYgKFxcJHsxOnRydWV9KTogPz5cXCR7Mjpjb2RlfTw/cGhwIGVuZGlmOyA/Plxuc25pcHBldCBpZmVpbFxcXFxuXFxcXFxuXHQ8P3BocCBpZiAoXFwkezE6dHJ1ZX0pOiA/PlxcJHsyOmNvZGV9PD9waHAgZWxzZTogPz5cXCR7Mzpjb2RlfTw/cGhwIGVuZGlmOyA/PlxcJHs0fVxuYDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==