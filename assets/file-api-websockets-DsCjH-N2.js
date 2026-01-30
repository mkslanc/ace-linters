import { i as __toCommonJS, t as __commonJSMin } from "./chunk-iA-Slpst.js";
import { a as init_esm_resolver, i as esm_resolver_exports, r as LanguageProvider, t as addFormatCommand } from "./utils-DupifF8s.js";
import { t as require_useragent } from "./useragent-BODERP_7.js";
import "./dom-BBjJ92-n.js";
import "./range-BUVqNbwc.js";
import { t as require_oop } from "./oop-DcdK5Mrs.js";
import "./lang-DcNOSqFo.js";
import { t as require_keys } from "./keys-B8CLTATX.js";
import { t as require_event } from "./event-BcX-N72I.js";
import "./config-DPm1ug3B.js";
import { t as require_event_emitter } from "./event_emitter-BGfSYA24.js";
import "./textmate-zFNmb5zU.js";
import { t as require_editor } from "./editor-BiOsjB7l.js";
import "./edit_session-CDHRvoey.js";
import "./tooltip-DAauyLxM.js";
import "./tokenizer-C2b-GJMk.js";
import "./text-B9A1mx6l.js";
import "./token_iterator-CbfYmntj.js";
import { t as require_hash_handler } from "./hash_handler-G_6vQiwI.js";
import "./text-DOzSnOss.js";
import { t as require_virtual_renderer } from "./virtual_renderer-xL5PfPPr.js";
import "./ace-BNoj2zEj.js";
import "./multi_select-B30HHNMb.js";
import "./fold_mode-D1xG2KFM.js";
import "./error_marker-BBMov5iD.js";
import "./snippets-Ct-Wi_HP.js";
import { i as require_popup } from "./autocomplete-CHTKiwQ7.js";
import { t as require_language_tools } from "./language_tools-BNL-ks-K.js";
import "./message-types-M_uv5dSK.js";
import "./src-D7AYzDf6.js";
var require_modelist = /* @__PURE__ */ __commonJSMin(((exports) => {
	var modes = [];
	function getModeForPath(path) {
		var mode$1 = modesByName.text;
		var fileName = path.split(/[\/\\]/).pop();
		for (var i = 0; i < modes.length; i++) if (modes[i].supportsFile(fileName)) {
			mode$1 = modes[i];
			break;
		}
		return mode$1;
	}
	var Mode = class {
		constructor(name$1, caption, extensions) {
			this.name = name$1;
			this.caption = caption;
			this.mode = "ace/mode/" + name$1;
			this.extensions = extensions;
			var re;
			if (/\^/.test(extensions)) re = extensions.replace(/\|(\^)?/g, function(a, b) {
				return "$|" + (b ? "^" : "^.*\\.");
			}) + "$";
			else re = "\\.(" + extensions + ")$";
			this.extRe = new RegExp(re, "gi");
		}
		supportsFile(filename$1) {
			return filename$1.match(this.extRe);
		}
	};
	var supportedModes = {
		ABAP: ["abap"],
		ABC: ["abc"],
		ActionScript: ["as"],
		ADA: ["ada|adb"],
		Alda: ["alda"],
		Apache_Conf: ["^htaccess|^htgroups|^htpasswd|^conf|htaccess|htgroups|htpasswd"],
		Apex: ["apex|cls|trigger|tgr"],
		AQL: ["aql"],
		AsciiDoc: ["asciidoc|adoc"],
		ASL: ["dsl|asl|asl.json"],
		Assembly_ARM32: ["s"],
		Assembly_x86: ["asm|a"],
		Astro: ["astro"],
		AutoHotKey: ["ahk"],
		Basic: ["bas|bak"],
		BatchFile: ["bat|cmd"],
		BibTeX: ["bib"],
		C_Cpp: ["cpp|c|cc|cxx|h|hh|hpp|ino"],
		C9Search: ["c9search_results"],
		Cirru: ["cirru|cr"],
		Clojure: ["clj|cljs"],
		Clue: ["clue"],
		Cobol: ["CBL|COB"],
		coffee: ["coffee|cf|cson|^Cakefile"],
		ColdFusion: ["cfm|cfc"],
		Crystal: ["cr"],
		CSharp: ["cs"],
		Csound_Document: ["csd"],
		Csound_Orchestra: ["orc"],
		Csound_Score: ["sco"],
		CSS: ["css"],
		CSV: ["csv"],
		Curly: ["curly"],
		Cuttlefish: ["conf"],
		D: ["d|di"],
		Dart: ["dart"],
		Diff: ["diff|patch"],
		Django: ["djt|html.djt|dj.html|djhtml"],
		Dockerfile: ["^Dockerfile"],
		Dot: ["dot"],
		Drools: ["drl"],
		Edifact: ["edi"],
		Eiffel: ["e|ge"],
		EJS: ["ejs"],
		Elixir: ["ex|exs"],
		Elm: ["elm"],
		Erlang: ["erl|hrl"],
		Flix: ["flix"],
		Forth: ["frt|fs|ldr|fth|4th"],
		Fortran: ["f|f90"],
		FSharp: ["fsi|fs|ml|mli|fsx|fsscript"],
		FSL: ["fsl"],
		FTL: ["ftl"],
		Gcode: ["gcode"],
		Gherkin: ["feature"],
		Gitignore: ["^.gitignore"],
		Glsl: ["glsl|frag|vert"],
		Gobstones: ["gbs"],
		golang: ["go"],
		GraphQLSchema: ["gql"],
		Groovy: ["groovy"],
		HAML: ["haml"],
		Handlebars: ["hbs|handlebars|tpl|mustache"],
		Haskell: ["hs"],
		Haskell_Cabal: ["cabal"],
		haXe: ["hx"],
		Hjson: ["hjson"],
		HTML: ["html|htm|xhtml|we|wpy"],
		HTML_Elixir: ["eex|html.eex"],
		HTML_Ruby: ["erb|rhtml|html.erb"],
		INI: ["ini|conf|cfg|prefs"],
		Io: ["io"],
		Ion: ["ion"],
		Jack: ["jack"],
		Jade: ["jade|pug"],
		Java: ["java"],
		JavaScript: ["js|jsm|cjs|mjs"],
		JEXL: ["jexl"],
		JSON: ["json"],
		JSON5: ["json5"],
		JSONiq: ["jq"],
		JSP: ["jsp"],
		JSSM: ["jssm|jssm_state"],
		JSX: ["jsx"],
		Julia: ["jl"],
		Kotlin: ["kt|kts"],
		LaTeX: ["tex|latex|ltx|bib"],
		Latte: ["latte"],
		LESS: ["less"],
		Liquid: ["liquid"],
		Lisp: ["lisp"],
		LiveScript: ["ls"],
		Log: ["log"],
		LogiQL: ["logic|lql"],
		Logtalk: ["lgt"],
		LSL: ["lsl"],
		Lua: ["lua"],
		LuaPage: ["lp"],
		Lucene: ["lucene"],
		Makefile: ["^Makefile|^GNUmakefile|^makefile|^OCamlMakefile|make"],
		Markdown: ["md|markdown"],
		Mask: ["mask"],
		MATLAB: ["matlab"],
		Maze: ["mz"],
		MediaWiki: ["wiki|mediawiki"],
		MEL: ["mel"],
		MIPS: ["s|asm"],
		MIXAL: ["mixal"],
		MUSHCode: ["mc|mush"],
		MySQL: ["mysql"],
		Nasal: ["nas"],
		Nginx: ["nginx|conf"],
		Nim: ["nim"],
		Nix: ["nix"],
		NSIS: ["nsi|nsh"],
		Nunjucks: ["nunjucks|nunjs|nj|njk"],
		ObjectiveC: ["m|mm"],
		OCaml: ["ml|mli"],
		Odin: ["odin"],
		PartiQL: ["partiql|pql"],
		Pascal: ["pas|p"],
		Perl: ["pl|pm"],
		pgSQL: ["pgsql"],
		PHP: ["php|inc|phtml|shtml|php3|php4|php5|phps|phpt|aw|ctp|module"],
		PHP_Laravel_blade: ["blade.php"],
		Pig: ["pig"],
		PLSQL: ["plsql"],
		Powershell: ["ps1"],
		Praat: ["praat|praatscript|psc|proc"],
		Prisma: ["prisma"],
		Prolog: ["plg|prolog"],
		Properties: ["properties"],
		Protobuf: ["proto"],
		PRQL: ["prql"],
		Puppet: ["epp|pp"],
		Python: ["py"],
		QML: ["qml"],
		R: ["r"],
		Raku: ["raku|rakumod|rakutest|p6|pl6|pm6"],
		Razor: ["cshtml|asp"],
		RDoc: ["Rd"],
		Red: ["red|reds"],
		RHTML: ["Rhtml"],
		Robot: ["robot|resource"],
		RST: ["rst"],
		Ruby: ["rb|ru|gemspec|rake|^Guardfile|^Rakefile|^Gemfile"],
		Rust: ["rs"],
		SaC: ["sac"],
		SASS: ["sass"],
		SCAD: ["scad"],
		Scala: ["scala|sbt"],
		Scheme: ["scm|sm|rkt|oak|scheme"],
		Scrypt: ["scrypt"],
		SCSS: ["scss"],
		SH: ["sh|bash|^.bashrc"],
		SJS: ["sjs"],
		Slim: ["slim|skim"],
		Smarty: ["smarty|tpl"],
		Smithy: ["smithy"],
		snippets: ["snippets"],
		Soy_Template: ["soy"],
		Space: ["space"],
		SPARQL: ["rq"],
		SQL: ["sql"],
		SQLServer: ["sqlserver"],
		Stylus: ["styl|stylus"],
		SVG: ["svg"],
		Swift: ["swift"],
		Tcl: ["tcl"],
		Terraform: [
			"tf",
			"tfvars",
			"terragrunt"
		],
		Tex: ["tex"],
		Text: ["txt"],
		Textile: ["textile"],
		Toml: ["toml"],
		TSV: ["tsv"],
		TSX: ["tsx"],
		Turtle: ["ttl"],
		Twig: ["twig|swig"],
		Typescript: ["ts|mts|cts|typescript|str"],
		Vala: ["vala"],
		VBScript: ["vbs|vb"],
		Velocity: ["vm"],
		Verilog: ["v|vh|sv|svh"],
		VHDL: ["vhd|vhdl"],
		Visualforce: ["vfp|component|page"],
		Vue: ["vue"],
		Wollok: ["wlk|wpgm|wtest"],
		XML: ["xml|rdf|rss|wsdl|xslt|atom|mathml|mml|xul|xbl|xaml"],
		XQuery: ["xq"],
		YAML: ["yaml|yml"],
		Zeek: ["zeek|bro"],
		Zig: ["zig"]
	};
	var nameOverrides = {
		ObjectiveC: "Objective-C",
		CSharp: "C#",
		golang: "Go",
		C_Cpp: "C and C++",
		Csound_Document: "Csound Document",
		Csound_Orchestra: "Csound",
		Csound_Score: "Csound Score",
		coffee: "CoffeeScript",
		HTML_Ruby: "HTML (Ruby)",
		HTML_Elixir: "HTML (Elixir)",
		FTL: "FreeMarker",
		PHP_Laravel_blade: "PHP (Blade Template)",
		Perl6: "Perl 6",
		AutoHotKey: "AutoHotkey / AutoIt"
	};
	var modesByName = {};
	for (var name in supportedModes) {
		var data = supportedModes[name];
		var displayName = (nameOverrides[name] || name).replace(/_/g, " ");
		var filename = name.toLowerCase();
		var mode = new Mode(filename, displayName, data[0]);
		modesByName[filename] = mode;
		modes.push(mode);
	}
	exports.getModeForPath = getModeForPath;
	exports.modes = modes;
	exports.modesByName = modesByName;
}));
var import_bundle_index = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function webpackUniversalModuleDefinition(root, factory) {
		if (typeof exports === "object" && typeof module === "object") module.exports = factory(require_event(), require_keys(), require_hash_handler(), require_useragent(), require_popup(), (init_esm_resolver(), __toCommonJS(esm_resolver_exports)), require_editor(), require_virtual_renderer(), require_modelist(), require_language_tools(), require_oop(), require_event_emitter());
		else if (typeof define === "function" && define.amd) define([
			"ace-code/src/lib/event",
			"ace-code/src/lib/keys",
			"ace-code/src/keyboard/hash_handler",
			"ace-code/src/lib/useragent",
			"ace-code/src/autocomplete/popup",
			"ace-code/esm-resolver",
			"ace-code/src/editor",
			"ace-code/src/virtual_renderer",
			"ace-code/src/ext/modelist",
			"ace-code/src/ext/language_tools",
			"ace-code/src/lib/oop",
			"ace-code/src/lib/event_emitter"
		], factory);
		else {
			var a = typeof exports === "object" ? factory(require_event(), require_keys(), require_hash_handler(), require_useragent(), require_popup(), (init_esm_resolver(), __toCommonJS(esm_resolver_exports)), require_editor(), require_virtual_renderer(), require_modelist(), require_language_tools(), require_oop(), require_event_emitter()) : factory(root["ace-code/src/lib/event"], root["ace-code/src/lib/keys"], root["ace-code/src/keyboard/hash_handler"], root["ace-code/src/lib/useragent"], root["ace-code/src/autocomplete/popup"], root["ace-code/esm-resolver"], root["ace-code/src/editor"], root["ace-code/src/virtual_renderer"], root["ace-code/src/ext/modelist"], root["ace-code/src/ext/language_tools"], root["ace-code/src/lib/oop"], root["ace-code/src/lib/event_emitter"]);
			for (var i in a) (typeof exports === "object" ? exports : root)[i] = a[i];
		}
	})(self, (__WEBPACK_EXTERNAL_MODULE__517__, __WEBPACK_EXTERNAL_MODULE__863__, __WEBPACK_EXTERNAL_MODULE__736__, __WEBPACK_EXTERNAL_MODULE__493__, __WEBPACK_EXTERNAL_MODULE__910__, __WEBPACK_EXTERNAL_MODULE__444__, __WEBPACK_EXTERNAL_MODULE__254__, __WEBPACK_EXTERNAL_MODULE__748__, __WEBPACK_EXTERNAL_MODULE__292__, __WEBPACK_EXTERNAL_MODULE__685__, __WEBPACK_EXTERNAL_MODULE__387__, __WEBPACK_EXTERNAL_MODULE__540__) => {
		return (() => {
			var __webpack_modules__ = {
				286: ((module$1, __webpack_exports__$1, __webpack_require__$1) => {
					"use strict";
					__webpack_require__$1.d(__webpack_exports__$1, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
					var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__$1(1);
					var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
					var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__$1(935);
					var ___CSS_LOADER_EXPORT___ = (/* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__))()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
					___CSS_LOADER_EXPORT___.push([
						module$1.id,
						`.toggle-block {
    position: absolute;
    /*border: 1px solid black;*/
}


.toggle-bar {
    display:flex;
    background: #cecece;
    color: #111;
    align-items: stretch;
    justify-content: stretch;
    overflow: hidden;
    position: absolute;
    user-select: none;
    cursor: pointer;
}
.toggleBlockDragging {
    pointer-events: none;
    overflow-y: hidden;
}
.toggleBlockDragging  .title{
    pointer-events: none;
}

.toggle-bar .title {
    position: absolute;
    top: auto;
    left: auto;
    width: auto;
    height: auto;
}

.toggle-bar-h {
    width: 20px;
    height: 100%;
}

.toggle-bar-v {
    height: 20px;
    width: 100%;
}
.toggle-bar-h div {
    margin-left: -2px;
    width: 5px;
    height: 100%
}
.toggle-bar-v div {
    margin-top: -2px;
    height: 5px;
}`,
						"",
						{
							"version": 3,
							"sources": ["webpack://./assets/styles/accordion.css"],
							"names": [],
							"mappings": "AAAA;IACI,kBAAkB;IAClB,2BAA2B;AAC/B;;;AAGA;IACI,YAAY;IACZ,mBAAmB;IACnB,WAAW;IACX,oBAAoB;IACpB,wBAAwB;IACxB,gBAAgB;IAChB,kBAAkB;IAClB,iBAAiB;IACjB,eAAe;AACnB;AACA;IACI,oBAAoB;IACpB,kBAAkB;AACtB;AACA;IACI,oBAAoB;AACxB;;AAEA;IACI,kBAAkB;IAClB,SAAS;IACT,UAAU;IACV,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,YAAY;IACZ,WAAW;AACf;AACA;IACI,iBAAiB;IACjB,UAAU;IACV;AACJ;AACA;IACI,gBAAgB;IAChB,WAAW;AACf",
							"sourcesContent": [".toggle-block {\r\n    position: absolute;\r\n    /*border: 1px solid black;*/\r\n}\r\n\r\n\r\n.toggle-bar {\r\n    display:flex;\r\n    background: #cecece;\r\n    color: #111;\r\n    align-items: stretch;\r\n    justify-content: stretch;\r\n    overflow: hidden;\r\n    position: absolute;\r\n    user-select: none;\r\n    cursor: pointer;\r\n}\r\n.toggleBlockDragging {\r\n    pointer-events: none;\r\n    overflow-y: hidden;\r\n}\r\n.toggleBlockDragging  .title{\r\n    pointer-events: none;\r\n}\r\n\r\n.toggle-bar .title {\r\n    position: absolute;\r\n    top: auto;\r\n    left: auto;\r\n    width: auto;\r\n    height: auto;\r\n}\r\n\r\n.toggle-bar-h {\r\n    width: 20px;\r\n    height: 100%;\r\n}\r\n\r\n.toggle-bar-v {\r\n    height: 20px;\r\n    width: 100%;\r\n}\r\n.toggle-bar-h div {\r\n    margin-left: -2px;\r\n    width: 5px;\r\n    height: 100%\r\n}\r\n.toggle-bar-v div {\r\n    margin-top: -2px;\r\n    height: 5px;\r\n}"],
							"sourceRoot": ""
						}
					]);
					const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
				}),
				216: ((module$1, __webpack_exports__$1, __webpack_require__$1) => {
					"use strict";
					__webpack_require__$1.d(__webpack_exports__$1, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
					var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__$1(1);
					var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
					var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__$1(935);
					var ___CSS_LOADER_EXPORT___ = (/* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__))()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
					___CSS_LOADER_EXPORT___.push([
						module$1.id,
						`.ace-tree-wrapper {
    height: 100%;
}`,
						"",
						{
							"version": 3,
							"sources": ["webpack://./assets/styles/ace-tree.css"],
							"names": [],
							"mappings": "AAAA;IACI,YAAY;AAChB",
							"sourcesContent": [".ace-tree-wrapper {\r\n    height: 100%;\r\n}"],
							"sourceRoot": ""
						}
					]);
					const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
				}),
				382: ((module$1, __webpack_exports__$1, __webpack_require__$1) => {
					"use strict";
					__webpack_require__$1.d(__webpack_exports__$1, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
					var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__$1(1);
					var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
					var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__$1(935);
					var ___CSS_LOADER_EXPORT___ = (/* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__))()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
					___CSS_LOADER_EXPORT___.push([
						module$1.id,
						`.blackbutton {
    background-image: linear-gradient(to bottom, #4c4c4c 0%, #434343 52%, #333333 52%, #454545 100%);
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.125) inset, 0px 1px rgba(255, 255, 255, 0.125);
    border: 1px solid #042440;
    border-radius: 3px;
    color: #d0e3ce;
    text-shadow: 0;
    height: 27px;
    line-height: 27px;
    padding: 0 11px;
    text-align: center;
    cursor: default;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;
}
.blackbuttonDisabled {
    color: rgba(220, 235, 219, 0.5);
}
.blackbuttonFocus {
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.125) inset, 0px 1px rgba(255, 255, 255, 0.125), 0 0 6px 1px rgba(255, 255, 255, 0.1) inset;
}
.blackbuttonOver {
    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.125) inset, 0px 1px rgba(255, 255, 255, 0.125), 0 0 0 1000px rgba(158, 169, 156, 0.08) inset;
}
.blackbuttonDown {
    box-shadow: 0 0 3px 2px #343434 inset;
}`,
						"",
						{
							"version": 3,
							"sources": ["webpack://./assets/styles/button.css"],
							"names": [],
							"mappings": "AAAA;IACI,gGAAgG;IAChG,wFAAwF;IACxF,yBAAyB;IACzB,kBAAkB;IAClB,cAAc;IACd,cAAc;IACd,YAAY;IACZ,iBAAiB;IACjB,eAAe;IACf,kBAAkB;IAClB,eAAe;IACf,mBAAmB;IACnB,mCAAmC,CAAC,kCAAkC;AAC1E;AACA;IACI,+BAA+B;AACnC;AACA;IACI,oIAAoI;AACxI;AACA;IACI,sIAAsI;AAC1I;AACA;IACI,qCAAqC;AACzC",
							"sourcesContent": [".blackbutton {\r\n    background-image: linear-gradient(to bottom, #4c4c4c 0%, #434343 52%, #333333 52%, #454545 100%);\r\n    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.125) inset, 0px 1px rgba(255, 255, 255, 0.125);\r\n    border: 1px solid #042440;\r\n    border-radius: 3px;\r\n    color: #d0e3ce;\r\n    text-shadow: 0;\r\n    height: 27px;\r\n    line-height: 27px;\r\n    padding: 0 11px;\r\n    text-align: center;\r\n    cursor: default;\r\n    font-weight: normal;\r\n    -webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;\r\n}\r\n.blackbuttonDisabled {\r\n    color: rgba(220, 235, 219, 0.5);\r\n}\r\n.blackbuttonFocus {\r\n    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.125) inset, 0px 1px rgba(255, 255, 255, 0.125), 0 0 6px 1px rgba(255, 255, 255, 0.1) inset;\r\n}\r\n.blackbuttonOver {\r\n    box-shadow: 0 1px 0 rgba(255, 255, 255, 0.125) inset, 0px 1px rgba(255, 255, 255, 0.125), 0 0 0 1000px rgba(158, 169, 156, 0.08) inset;\r\n}\r\n.blackbuttonDown {\r\n    box-shadow: 0 0 3px 2px #343434 inset;\r\n}"],
							"sourceRoot": ""
						}
					]);
					const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
				}),
				593: ((module$1, __webpack_exports__$1, __webpack_require__$1) => {
					"use strict";
					__webpack_require__$1.d(__webpack_exports__$1, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
					var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__$1(1);
					var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
					var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__$1(935);
					var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
					var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__$1(62);
					var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
					var ___CSS_LOADER_URL_IMPORT_0___ = new URL(__webpack_require__$1(952), __webpack_require__$1.b);
					var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
					var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
					___CSS_LOADER_EXPORT___.push([
						module$1.id,
						`.black_dropdown {
    display: inline-block;
    position: relative;
    overflow: hidden;
    height: 21px;
    border-radius: 3px;
    border: 1px solid #1c1c1c;
    background: #383838 linear-gradient(0deg, #323232 0%, #383838 100%);
    box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.15) inset, 0px 1px 0px 0px rgba(255, 255, 255, 0.1);
    text-shadow: none;
    min-height: 19px !important;
    max-height: 19px !important;
}
.black_dropdown .lbl {
    position: relative;
    overflow: hidden;
    height: 17px;
    padding: 4px 0 0 6px;
    margin: 0 19px 0 0;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    color: #c0dabe;
    line-height: 13px;
    border-right: 1px solid #1c1c1c;
    cursor: default;
    white-space: nowrap;
}
.black_dropdown .button {
    width: 19px;
    border-left: 1px solid #4d4c4d;
    bottom: 0;
    position: absolute;
    top: 0;
    right: 0;
    background-repeat: no-repeat;
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_0___});
    background-size: 9px 13px;
    background-position: 4px 4px;
}
.black_dropdownOver {
    background-image: linear-gradient(0deg, #2f2f2f 0%, #3f3f3f 100%);
}
.black_dropdownDown {
    background: #2d2d2d linear-gradient(0deg, #2d2d2d 0%, #363636 100%);
}`,
						"",
						{
							"version": 3,
							"sources": ["webpack://./assets/styles/dropdown.css"],
							"names": [],
							"mappings": "AAAA;IACI,qBAAqB;IACrB,kBAAkB;IAClB,gBAAgB;IAChB,YAAY;IACZ,kBAAkB;IAClB,yBAAyB;IACzB,mEAAmE;IACnE,iGAAiG;IACjG,iBAAiB;IACjB,2BAA2B;IAC3B,2BAA2B;AAC/B;AACA;IACI,kBAAkB;IAClB,gBAAgB;IAChB,YAAY;IACZ,oBAAoB;IACpB,kBAAkB;IAClB,yCAAyC;IACzC,eAAe;IACf,cAAc;IACd,iBAAiB;IACjB,+BAA+B;IAC/B,eAAe;IACf,mBAAmB;AACvB;AACA;IACI,WAAW;IACX,8BAA8B;IAC9B,SAAS;IACT,kBAAkB;IAClB,MAAM;IACN,QAAQ;IACR,4BAA4B;IAC5B,yDAAmE;IACnE,yBAAyB;IACzB,4BAA4B;AAChC;AACA;IACI,iEAAiE;AACrE;AACA;IACI,mEAAmE;AACvE",
							"sourcesContent": [".black_dropdown {\r\n    display: inline-block;\r\n    position: relative;\r\n    overflow: hidden;\r\n    height: 21px;\r\n    border-radius: 3px;\r\n    border: 1px solid #1c1c1c;\r\n    background: #383838 linear-gradient(0deg, #323232 0%, #383838 100%);\r\n    box-shadow: 0px 1px 0px rgba(255, 255, 255, 0.15) inset, 0px 1px 0px 0px rgba(255, 255, 255, 0.1);\r\n    text-shadow: none;\r\n    min-height: 19px !important;\r\n    max-height: 19px !important;\r\n}\r\n.black_dropdown .lbl {\r\n    position: relative;\r\n    overflow: hidden;\r\n    height: 17px;\r\n    padding: 4px 0 0 6px;\r\n    margin: 0 19px 0 0;\r\n    font-family: Arial, Helvetica, sans-serif;\r\n    font-size: 12px;\r\n    color: #c0dabe;\r\n    line-height: 13px;\r\n    border-right: 1px solid #1c1c1c;\r\n    cursor: default;\r\n    white-space: nowrap;\r\n}\r\n.black_dropdown .button {\r\n    width: 19px;\r\n    border-left: 1px solid #4d4c4d;\r\n    bottom: 0;\r\n    position: absolute;\r\n    top: 0;\r\n    right: 0;\r\n    background-repeat: no-repeat;\r\n    background-image: url(../images/dropdown-dark-glossy/button@1x.png);\r\n    background-size: 9px 13px;\r\n    background-position: 4px 4px;\r\n}\r\n.black_dropdownOver {\r\n    background-image: linear-gradient(0deg, #2f2f2f 0%, #3f3f3f 100%);\r\n}\r\n.black_dropdownDown {\r\n    background: #2d2d2d linear-gradient(0deg, #2d2d2d 0%, #363636 100%);\r\n}"],
							"sourceRoot": ""
						}
					]);
					const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
				}),
				0: ((module$1, __webpack_exports__$1, __webpack_require__$1) => {
					"use strict";
					__webpack_require__$1.d(__webpack_exports__$1, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
					var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__$1(1);
					var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
					var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__$1(935);
					var ___CSS_LOADER_EXPORT___ = (/* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__))()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
					___CSS_LOADER_EXPORT___.push([
						module$1.id,
						`body {
    font-family: Tahoma, sans-serif;
}

body.disableIframe iframe {pointer-events: none;}

.splitter {
    background: var(--splitter-color);
    z-index:10;
    position: absolute;
}

.splitter-h {
    width: 1px;
    cursor: ew-resize;
}

.splitter-v {
    height: 1px;
    cursor: ns-resize;
    box-shadow: 1px 1px 0px rgba(143, 143, 143, 0.14);
}
.splitter-h div {
    margin-left: -2px;
    width: 5px;
    height: 100%
}
.splitter-v div {
    margin-top: -2px;
    height: 5px;
}
.splitter-h:hover {

}
.splitter-v:hover {

}
.splitter:hover {

}
.box {
    overflow: hidden;
}

.menuToolBar {
    display: flex;
    height: 30px;
    background: #787878;
    color: #111;
    align-items: stretch;
    justify-content: stretch;
    overflow: hidden;
    position: absolute;
}

.findbar {
    display:flex;
    height:30px;
    background: #665a82;
    background: #cecece;
    color: #111;
    align-items: stretch;
    justify-content: stretch;
    overflow: hidden;
    position: absolute;
}


.fullScreenParent {overflow: visible}
.fullScreenNode {
    position: fixed!important;
    z-index: 1!important;
}
.fullScreenSibling {
    z-index: 0!important;
}


body {
    overflow: hidden!important;
    width: 100%;
    height: 100%;
}

.consoleCloseBtn {
    background-repeat: no-repeat;
    background-size: 22px 66px;
    cursor: pointer;
    padding-right: 5px;
}

div.consoleCloseBtn:hover {
    color: #35cc95;
}

.buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 1000;
    padding: 0px;
    position: absolute;
    right: 3px;
    top: 0px;
    height: 24px;
}

.animateBoxes {
    transition-duration: 0.15s;
    transition-property: top, left, width, height, transform;
    transition-timing-function: cubic-bezier(.10, .10, .25, .90);
}


.animateBoxes * {
    transition-duration: inherit;
    transition-property: top, left, width, height, transform;
    transition-timing-function: inherit;
}


.tabPanel {
    background: whitesmoke;
}

.inheritCursor *{
    cursor: inherit;
}

.panelbar {
    background-color: var(--toolbar-background);
    position: absolute;
    box-sizing: border-box;
}
.panelbar.top, .tabbar {
    border-bottom: 1px solid var(--splitter-color);
    box-sizing: border-box;
}
.panelbar.bottom {
    border-top: 1px solid var(--splitter-color);
}

body {
    --toolbar-background: #f3f3f3;
    --splitter-color: #d0d0d0;
    --hover-background: #eaeaea;
}

.spacer {
    flex: 1
}
.panelbar {
    display: flex;
    align-items: center;
    padding: 4px;
}
.panelbar>* {
    margin: 0 4px
}
.panelbar> button {
    padding: 5px;
}
.panelbar> button, .panelbar> input  {
    border: none;
    color: #333
}
.panelbar> *:active,
.panelbar> *:focus {
    outline: 1px solid lightblue;
    outline-offset: 1px
}
.panelbar> button {
    background: transparent;
    color: #0da6ff;
}
.panelbar> button:hover  {
    background: var(--hover-background);
    color: black
}
.panelbar> button[disabled] {
    pointer-events: none;
    color: gray!important;
}

.ace_editor.ace_listBox {
    background: var(--toolbar-background)!important;
    font-family: inherit;
    border: none;
}


.ace_listBox .ace_ {
    margin-left: 1em;
}
.ace_listBox .ace_header {
    font-weight: bold;
    margin-left: 0;
}

iframe {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
}`,
						"",
						{
							"version": 3,
							"sources": ["webpack://./assets/styles/layout.css"],
							"names": [],
							"mappings": "AAAA;IACI,+BAA+B;AACnC;;AAEA,2BAA2B,oBAAoB,CAAC;;AAEhD;IACI,iCAAiC;IACjC,UAAU;IACV,kBAAkB;AACtB;;AAEA;IACI,UAAU;IACV,iBAAiB;AACrB;;AAEA;IACI,WAAW;IACX,iBAAiB;IACjB,iDAAiD;AACrD;AACA;IACI,iBAAiB;IACjB,UAAU;IACV;AACJ;AACA;IACI,gBAAgB;IAChB,WAAW;AACf;AACA;;AAEA;AACA;;AAEA;AACA;;AAEA;AACA;IACI,gBAAgB;AACpB;;AAEA;IACI,aAAa;IACb,YAAY;IACZ,mBAAmB;IACnB,WAAW;IACX,oBAAoB;IACpB,wBAAwB;IACxB,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,mBAAmB;IACnB,mBAAmB;IACnB,WAAW;IACX,oBAAoB;IACpB,wBAAwB;IACxB,gBAAgB;IAChB,kBAAkB;AACtB;;;AAGA,mBAAmB,iBAAiB;AACpC;IACI,yBAAyB;IACzB,oBAAoB;AACxB;AACA;IACI,oBAAoB;AACxB;;;AAGA;IACI,0BAA0B;IAC1B,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,4BAA4B;IAC5B,0BAA0B;IAC1B,eAAe;IACf,kBAAkB;AACtB;;AAEA;IACI,cAAc;AAClB;;AAEA;IACI,aAAa;IACb,mBAAmB;IACnB,yBAAyB;IACzB,aAAa;IACb,YAAY;IACZ,kBAAkB;IAClB,UAAU;IACV,QAAQ;IACR,YAAY;AAChB;;AAEA;IACI,0BAA0B;IAC1B,wDAAwD;IACxD,4DAA4D;AAChE;;;AAGA;IACI,4BAA4B;IAC5B,wDAAwD;IACxD,mCAAmC;AACvC;;;AAGA;IACI,sBAAsB;AAC1B;;AAEA;IACI,eAAe;AACnB;;AAEA;IACI,2CAA2C;IAC3C,kBAAkB;IAClB,sBAAsB;AAC1B;AACA;IACI,8CAA8C;IAC9C,sBAAsB;AAC1B;AACA;IACI,2CAA2C;AAC/C;;AAEA;IACI,6BAA6B;IAC7B,yBAAyB;IACzB,2BAA2B;AAC/B;;AAEA;IACI;AACJ;AACA;IACI,aAAa;IACb,mBAAmB;IACnB,YAAY;AAChB;AACA;IACI;AACJ;AACA;IACI,YAAY;AAChB;AACA;IACI,YAAY;IACZ;AACJ;AACA;;IAEI,4BAA4B;IAC5B;AACJ;AACA;IACI,uBAAuB;IACvB,cAAc;AAClB;AACA;IACI,mCAAmC;IACnC;AACJ;AACA;IACI,oBAAoB;IACpB,qBAAqB;AACzB;;AAEA;IACI,+CAA+C;IAC/C,oBAAoB;IACpB,YAAY;AAChB;;;AAGA;IACI,gBAAgB;AACpB;AACA;IACI,iBAAiB;IACjB,cAAc;AAClB;;AAEA;IACI,SAAS;IACT,UAAU;IACV,SAAS;IACT,eAAe;IACf,aAAa;IACb,wBAAwB;AAC5B",
							"sourcesContent": ["body {\r\n    font-family: Tahoma, sans-serif;\r\n}\r\n\r\nbody.disableIframe iframe {pointer-events: none;}\r\n\r\n.splitter {\r\n    background: var(--splitter-color);\r\n    z-index:10;\r\n    position: absolute;\r\n}\r\n\r\n.splitter-h {\r\n    width: 1px;\r\n    cursor: ew-resize;\r\n}\r\n\r\n.splitter-v {\r\n    height: 1px;\r\n    cursor: ns-resize;\r\n    box-shadow: 1px 1px 0px rgba(143, 143, 143, 0.14);\r\n}\r\n.splitter-h div {\r\n    margin-left: -2px;\r\n    width: 5px;\r\n    height: 100%\r\n}\r\n.splitter-v div {\r\n    margin-top: -2px;\r\n    height: 5px;\r\n}\r\n.splitter-h:hover {\r\n\r\n}\r\n.splitter-v:hover {\r\n\r\n}\r\n.splitter:hover {\r\n\r\n}\r\n.box {\r\n    overflow: hidden;\r\n}\r\n\r\n.menuToolBar {\r\n    display: flex;\r\n    height: 30px;\r\n    background: #787878;\r\n    color: #111;\r\n    align-items: stretch;\r\n    justify-content: stretch;\r\n    overflow: hidden;\r\n    position: absolute;\r\n}\r\n\r\n.findbar {\r\n    display:flex;\r\n    height:30px;\r\n    background: #665a82;\r\n    background: #cecece;\r\n    color: #111;\r\n    align-items: stretch;\r\n    justify-content: stretch;\r\n    overflow: hidden;\r\n    position: absolute;\r\n}\r\n\r\n\r\n.fullScreenParent {overflow: visible}\r\n.fullScreenNode {\r\n    position: fixed!important;\r\n    z-index: 1!important;\r\n}\r\n.fullScreenSibling {\r\n    z-index: 0!important;\r\n}\r\n\r\n\r\nbody {\r\n    overflow: hidden!important;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n.consoleCloseBtn {\r\n    background-repeat: no-repeat;\r\n    background-size: 22px 66px;\r\n    cursor: pointer;\r\n    padding-right: 5px;\r\n}\r\n\r\ndiv.consoleCloseBtn:hover {\r\n    color: #35cc95;\r\n}\r\n\r\n.buttons {\r\n    display: flex;\r\n    align-items: center;\r\n    justify-content: flex-end;\r\n    z-index: 1000;\r\n    padding: 0px;\r\n    position: absolute;\r\n    right: 3px;\r\n    top: 0px;\r\n    height: 24px;\r\n}\r\n\r\n.animateBoxes {\r\n    transition-duration: 0.15s;\r\n    transition-property: top, left, width, height, transform;\r\n    transition-timing-function: cubic-bezier(.10, .10, .25, .90);\r\n}\r\n\r\n\r\n.animateBoxes * {\r\n    transition-duration: inherit;\r\n    transition-property: top, left, width, height, transform;\r\n    transition-timing-function: inherit;\r\n}\r\n\r\n\r\n.tabPanel {\r\n    background: whitesmoke;\r\n}\r\n\r\n.inheritCursor *{\r\n    cursor: inherit;\r\n}\r\n\r\n.panelbar {\r\n    background-color: var(--toolbar-background);\r\n    position: absolute;\r\n    box-sizing: border-box;\r\n}\r\n.panelbar.top, .tabbar {\r\n    border-bottom: 1px solid var(--splitter-color);\r\n    box-sizing: border-box;\r\n}\r\n.panelbar.bottom {\r\n    border-top: 1px solid var(--splitter-color);\r\n}\r\n\r\nbody {\r\n    --toolbar-background: #f3f3f3;\r\n    --splitter-color: #d0d0d0;\r\n    --hover-background: #eaeaea;\r\n}\r\n\r\n.spacer {\r\n    flex: 1\r\n}\r\n.panelbar {\r\n    display: flex;\r\n    align-items: center;\r\n    padding: 4px;\r\n}\r\n.panelbar>* {\r\n    margin: 0 4px\r\n}\r\n.panelbar> button {\r\n    padding: 5px;\r\n}\r\n.panelbar> button, .panelbar> input  {\r\n    border: none;\r\n    color: #333\r\n}\r\n.panelbar> *:active,\r\n.panelbar> *:focus {\r\n    outline: 1px solid lightblue;\r\n    outline-offset: 1px\r\n}\r\n.panelbar> button {\r\n    background: transparent;\r\n    color: #0da6ff;\r\n}\r\n.panelbar> button:hover  {\r\n    background: var(--hover-background);\r\n    color: black\r\n}\r\n.panelbar> button[disabled] {\r\n    pointer-events: none;\r\n    color: gray!important;\r\n}\r\n\r\n.ace_editor.ace_listBox {\r\n    background: var(--toolbar-background)!important;\r\n    font-family: inherit;\r\n    border: none;\r\n}\r\n\r\n\r\n.ace_listBox .ace_ {\r\n    margin-left: 1em;\r\n}\r\n.ace_listBox .ace_header {\r\n    font-weight: bold;\r\n    margin-left: 0;\r\n}\r\n\r\niframe {\r\n    margin: 0;\r\n    padding: 0;\r\n    border: 0;\r\n    font-size: 100%;\r\n    font: inherit;\r\n    vertical-align: baseline;\r\n}"],
							"sourceRoot": ""
						}
					]);
					const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
				}),
				807: ((module$1, __webpack_exports__$1, __webpack_require__$1) => {
					"use strict";
					__webpack_require__$1.d(__webpack_exports__$1, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
					var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__$1(1);
					var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
					var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__$1(935);
					var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
					var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__$1(62);
					var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
					var ___CSS_LOADER_URL_IMPORT_0___ = new URL(__webpack_require__$1(784), __webpack_require__$1.b);
					var ___CSS_LOADER_URL_IMPORT_1___ = new URL(__webpack_require__$1(560), __webpack_require__$1.b);
					var ___CSS_LOADER_URL_IMPORT_2___ = new URL(__webpack_require__$1(937), __webpack_require__$1.b);
					var ___CSS_LOADER_URL_IMPORT_3___ = new URL(__webpack_require__$1(147), __webpack_require__$1.b);
					var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
					var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
					var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
					var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
					var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
					___CSS_LOADER_EXPORT___.push([
						module$1.id,
						`.menuButton {
    height: 100%;
    box-sizing: border-box;
    overflow: visible;
    cursor: default;
    position: relative;
    display: inline-block;
    font-family: Tahoma, Arial;
    font-size: 12px;
    line-height: 14px;
    color: #cecece;
    padding: 4px 7px 0 7px;
    text-shadow: #292a2b 0px 1px 0px;
    -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;
}
.menuButtonOver, .menuButton:hover {
    background-color: #333333;
    box-shadow: 1px -1px 0 0 #000000, -1px 0 0 0 #000000, 0 1px 0 0 rgba(255, 255, 255, 0.15) inset;
    color: #d4d4d4;
}
.menuButton.menuButtonDown {
    font-weight: normal;
    background-color: #494949;
    box-shadow: 1px 0 0 0 #000000 inset, 1px 0 0 0 #000000, 0 1px 0 0 rgba(255, 255, 255, 0.15) inset;
    border: 0;
    border-width: 0;
    padding: 4px 7px 0 7px;
    z-index: 100000000;
}
.menuButtonDisabled.menuButton .label {
    color: #999999;
}
.menuButtonIcon {
    padding-left: 24px;
}
.menuButtonIcon .icon {
    display: block;
}
.menuButtonEmpty {
    padding-left: 7px;
}
.menuButtonEmpty .icon {
    left: 0;
    top: 0;
}
.menuButtonDisabled {
    color: gray;
}
.menuButton.btn {
    min-width: 12px;
    font-weight: bold;
    background-position: 2px 50%;
}


.menu {
    margin: -1px 0 0 0;
    padding: 3px 0 3px 0;
    z-index: 10000;
    position: absolute;
    overflow: visible;
    font-family: Tahoma, Arial;
    font-size: 11px;
    line-height: 14px;
    color: #f1f1f1;
    cursor: default;
    display: none;
    border: 1px solid #00040a;
    box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.65);
    background-color: #494949;
    text-shadow: 0px 1px 0px #2c2c2c;
    border-radius: 0;
}
.menu > div.menu_item {
    padding: 3px 16px 5px 23px;
    white-space: nowrap;
    cursor: default;
    z-index: 1100000;
    height: 13px;
}
.menu > div.menu_item.update {
    background-color: #748512;
    font-weight: bold;
    color: #f1f1f1;
    text-shadow: none;
}
.menu > div.menu_item.hover {
    background-color: #262626;
    color: #a0b42a;
}
.menu > div.menu_divider {
    overflow: visible;
    padding: 0;
    font-size: 1px;
    margin: 2px 3px;
    border-top: 1px solid #353535;
    border-bottom: 1px solid #565656;
    height: 0;
}
.menu > div.menu_item > .shortcut {
    right: 15px;
    margin-top: 0px;
    z-index: 10;
    text-align: right;
    padding-left: 15px;
    float: right;
}
.menu > div.submenu > .shortcut {
    background: url(${___CSS_LOADER_URL_REPLACEMENT_0___}) no-repeat right -15px;
    width: 4px;
    height: 7px;
    display: block;
    position: absolute;
    right: 8px;
    margin: 4px 0 0 0;
    z-index: 10;
}
.menu > div.submenu.hover > span {
    background: url(${___CSS_LOADER_URL_REPLACEMENT_0___}) no-repeat right -15px;
}
.menu > div.menu_item.disabled {
    color: #808080;
    text-shadow: none;
    -webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;
}
.menu > div.menu_item > u {
    width: 16px;
    height: 16px;
    position: absolute;
    left: 3px;
    margin-top: -1px;
}
.menu > div.menu_item > a {
    float: left;
}
.menu > div.menu_item.selected > u {
    background: url(${___CSS_LOADER_URL_REPLACEMENT_1___}) no-repeat 0 -16px;
}
.menu > div.menu_item.selected:hover > u {
    background: url(${___CSS_LOADER_URL_REPLACEMENT_1___}) no-repeat 0 -16px;
}
.menu > div.menu_item.checked > u {
    background: url(${___CSS_LOADER_URL_REPLACEMENT_2___}) no-repeat 0 -16px;
}
.menu > div.menu_item.checked:hover > u {
    background: url(${___CSS_LOADER_URL_REPLACEMENT_2___}) no-repeat 0 -16px;
}
.menu > div.menu_item.disabled > u {
    opacity: 0.2;
}
.menu > div.menu_item.checked.disabled > u {
    background: url(${___CSS_LOADER_URL_REPLACEMENT_2___}) no-repeat 0 -16px;
}
.menu > div.menu_item.selected.disabled > u {
    background: url(${___CSS_LOADER_URL_REPLACEMENT_1___}) no-repeat 0 -16px;
}

.menu_searchbox {
    height: auto;
    width: auto;
    border: 1px solid #be1100;
    background-color: #653b13;
    color: white;
    position: absolute;
    font-family: Tahoma, Arial;
    font-size: 12px;
}

.menu-completion-highlight {
    color: #2d69c7;
}
.searchbtn_close {
    background: url(${___CSS_LOADER_URL_REPLACEMENT_3___}) no-repeat 50% 0;
    border-radius: 50%;
    border: 0 none;
    color: #656565;
    cursor: pointer;
    font: 16px/16px Arial;
    padding: 0;
    height: 14px;
    width: 14px; 
    display: inline-block;
}
.searchbtn_close:hover {
    background-color: #656565;
    background-position: 50% 100%;
    color: white;
}

.searchbtn_filter {
    background: url(${___CSS_LOADER_URL_REPLACEMENT_2___}) no-repeat 50% 0;
    border-radius: 50%;
    border: 0 none;
    color: #656565;
    cursor: pointer;
    font: 16px/16px Arial;
    padding: 0;
    height: 14px;
    width: 14px; 
    display: inline-block;
}

.searchbtn_filter:hover {
    background-color: #656565;
    background-position: 50% 100%;
    color: white;
}

.menu_no_result {
    padding: 3px 10px 5px 20px;
    white-space: nowrap;
    cursor: default;
    z-index: 1100000;
    height: 13px;
}`,
						"",
						{
							"version": 3,
							"sources": ["webpack://./assets/styles/menu.css"],
							"names": [],
							"mappings": "AAAA;IACI,YAAY;IACZ,sBAAsB;IACtB,iBAAiB;IACjB,eAAe;IACf,kBAAkB;IAClB,qBAAqB;IACrB,0BAA0B;IAC1B,eAAe;IACf,iBAAiB;IACjB,cAAc;IACd,sBAAsB;IACtB,gCAAgC;IAChC,yBAAyB,EAAE,sBAAsB,EAAE,qBAAqB,EAAE,iBAAiB;AAC/F;AACA;IACI,yBAAyB;IACzB,+FAA+F;IAC/F,cAAc;AAClB;AACA;IACI,mBAAmB;IACnB,yBAAyB;IACzB,iGAAiG;IACjG,SAAS;IACT,eAAe;IACf,sBAAsB;IACtB,kBAAkB;AACtB;AACA;IACI,cAAc;AAClB;AACA;IACI,kBAAkB;AACtB;AACA;IACI,cAAc;AAClB;AACA;IACI,iBAAiB;AACrB;AACA;IACI,OAAO;IACP,MAAM;AACV;AACA;IACI,WAAW;AACf;AACA;IACI,eAAe;IACf,iBAAiB;IACjB,4BAA4B;AAChC;;;AAGA;IACI,kBAAkB;IAClB,oBAAoB;IACpB,cAAc;IACd,kBAAkB;IAClB,iBAAiB;IACjB,0BAA0B;IAC1B,eAAe;IACf,iBAAiB;IACjB,cAAc;IACd,eAAe;IACf,aAAa;IACb,yBAAyB;IACzB,gDAAgD;IAChD,yBAAyB;IACzB,gCAAgC;IAChC,gBAAgB;AACpB;AACA;IACI,0BAA0B;IAC1B,mBAAmB;IACnB,eAAe;IACf,gBAAgB;IAChB,YAAY;AAChB;AACA;IACI,yBAAyB;IACzB,iBAAiB;IACjB,cAAc;IACd,iBAAiB;AACrB;AACA;IACI,yBAAyB;IACzB,cAAc;AAClB;AACA;IACI,iBAAiB;IACjB,UAAU;IACV,cAAc;IACd,eAAe;IACf,6BAA6B;IAC7B,gCAAgC;IAChC,SAAS;AACb;AACA;IACI,WAAW;IACX,eAAe;IACf,WAAW;IACX,iBAAiB;IACjB,kBAAkB;IAClB,YAAY;AAChB;AACA;IACI,yEAAoE;IACpE,UAAU;IACV,WAAW;IACX,cAAc;IACd,kBAAkB;IAClB,UAAU;IACV,iBAAiB;IACjB,WAAW;AACf;AACA;IACI,yEAAoE;AACxE;AACA;IACI,cAAc;IACd,iBAAiB;IACjB,mCAAmC,CAAC,kCAAkC;AAC1E;AACA;IACI,WAAW;IACX,YAAY;IACZ,kBAAkB;IAClB,SAAS;IACT,gBAAgB;AACpB;AACA;IACI,WAAW;AACf;AACA;IACI,qEAAwD;AAC5D;AACA;IACI,qEAAwD;AAC5D;AACA;IACI,qEAAwD;AAC5D;AACA;IACI,qEAAwD;AAC5D;AACA;IACI,YAAY;AAChB;AACA;IACI,qEAAwD;AAC5D;AACA;IACI,qEAAwD;AAC5D;;AAEA;IACI,YAAY;IACZ,WAAW;IACX,yBAAyB;IACzB,yBAAyB;IACzB,YAAY;IACZ,kBAAkB;IAClB,0BAA0B;IAC1B,eAAe;AACnB;;AAEA;IACI,cAAc;AAClB;AACA;IACI,mEAA+Q;IAC/Q,kBAAkB;IAClB,cAAc;IACd,cAAc;IACd,eAAe;IACf,qBAAqB;IACrB,UAAU;IACV,YAAY;IACZ,WAAW;IACX,qBAAqB;AACzB;AACA;IACI,yBAAyB;IACzB,6BAA6B;IAC7B,YAAY;AAChB;;AAEA;IACI,mEAAsD;IACtD,kBAAkB;IAClB,cAAc;IACd,cAAc;IACd,eAAe;IACf,qBAAqB;IACrB,UAAU;IACV,YAAY;IACZ,WAAW;IACX,qBAAqB;AACzB;;AAEA;IACI,yBAAyB;IACzB,6BAA6B;IAC7B,YAAY;AAChB;;AAEA;IACI,0BAA0B;IAC1B,mBAAmB;IACnB,eAAe;IACf,gBAAgB;IAChB,YAAY;AAChB",
							"sourcesContent": [".menuButton {\r\n    height: 100%;\r\n    box-sizing: border-box;\r\n    overflow: visible;\r\n    cursor: default;\r\n    position: relative;\r\n    display: inline-block;\r\n    font-family: Tahoma, Arial;\r\n    font-size: 12px;\r\n    line-height: 14px;\r\n    color: #cecece;\r\n    padding: 4px 7px 0 7px;\r\n    text-shadow: #292a2b 0px 1px 0px;\r\n    -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none;\r\n}\r\n.menuButtonOver, .menuButton:hover {\r\n    background-color: #333333;\r\n    box-shadow: 1px -1px 0 0 #000000, -1px 0 0 0 #000000, 0 1px 0 0 rgba(255, 255, 255, 0.15) inset;\r\n    color: #d4d4d4;\r\n}\r\n.menuButton.menuButtonDown {\r\n    font-weight: normal;\r\n    background-color: #494949;\r\n    box-shadow: 1px 0 0 0 #000000 inset, 1px 0 0 0 #000000, 0 1px 0 0 rgba(255, 255, 255, 0.15) inset;\r\n    border: 0;\r\n    border-width: 0;\r\n    padding: 4px 7px 0 7px;\r\n    z-index: 100000000;\r\n}\r\n.menuButtonDisabled.menuButton .label {\r\n    color: #999999;\r\n}\r\n.menuButtonIcon {\r\n    padding-left: 24px;\r\n}\r\n.menuButtonIcon .icon {\r\n    display: block;\r\n}\r\n.menuButtonEmpty {\r\n    padding-left: 7px;\r\n}\r\n.menuButtonEmpty .icon {\r\n    left: 0;\r\n    top: 0;\r\n}\r\n.menuButtonDisabled {\r\n    color: gray;\r\n}\r\n.menuButton.btn {\r\n    min-width: 12px;\r\n    font-weight: bold;\r\n    background-position: 2px 50%;\r\n}\r\n\r\n\r\n.menu {\r\n    margin: -1px 0 0 0;\r\n    padding: 3px 0 3px 0;\r\n    z-index: 10000;\r\n    position: absolute;\r\n    overflow: visible;\r\n    font-family: Tahoma, Arial;\r\n    font-size: 11px;\r\n    line-height: 14px;\r\n    color: #f1f1f1;\r\n    cursor: default;\r\n    display: none;\r\n    border: 1px solid #00040a;\r\n    box-shadow: 0px 3px 15px 0px rgba(0, 0, 0, 0.65);\r\n    background-color: #494949;\r\n    text-shadow: 0px 1px 0px #2c2c2c;\r\n    border-radius: 0;\r\n}\r\n.menu > div.menu_item {\r\n    padding: 3px 16px 5px 23px;\r\n    white-space: nowrap;\r\n    cursor: default;\r\n    z-index: 1100000;\r\n    height: 13px;\r\n}\r\n.menu > div.menu_item.update {\r\n    background-color: #748512;\r\n    font-weight: bold;\r\n    color: #f1f1f1;\r\n    text-shadow: none;\r\n}\r\n.menu > div.menu_item.hover {\r\n    background-color: #262626;\r\n    color: #a0b42a;\r\n}\r\n.menu > div.menu_divider {\r\n    overflow: visible;\r\n    padding: 0;\r\n    font-size: 1px;\r\n    margin: 2px 3px;\r\n    border-top: 1px solid #353535;\r\n    border-bottom: 1px solid #565656;\r\n    height: 0;\r\n}\r\n.menu > div.menu_item > .shortcut {\r\n    right: 15px;\r\n    margin-top: 0px;\r\n    z-index: 10;\r\n    text-align: right;\r\n    padding-left: 15px;\r\n    float: right;\r\n}\r\n.menu > div.submenu > .shortcut {\r\n    background: url(\"../images/submenu_arrow.gif\") no-repeat right -15px;\r\n    width: 4px;\r\n    height: 7px;\r\n    display: block;\r\n    position: absolute;\r\n    right: 8px;\r\n    margin: 4px 0 0 0;\r\n    z-index: 10;\r\n}\r\n.menu > div.submenu.hover > span {\r\n    background: url(\"../images/submenu_arrow.gif\") no-repeat right -15px;\r\n}\r\n.menu > div.menu_item.disabled {\r\n    color: #808080;\r\n    text-shadow: none;\r\n    -webkit-font-smoothing: antialiased;-moz-osx-font-smoothing: grayscale;\r\n}\r\n.menu > div.menu_item > u {\r\n    width: 16px;\r\n    height: 16px;\r\n    position: absolute;\r\n    left: 3px;\r\n    margin-top: -1px;\r\n}\r\n.menu > div.menu_item > a {\r\n    float: left;\r\n}\r\n.menu > div.menu_item.selected > u {\r\n    background: url(\"../images/radio.gif\") no-repeat 0 -16px;\r\n}\r\n.menu > div.menu_item.selected:hover > u {\r\n    background: url(\"../images/radio.gif\") no-repeat 0 -16px;\r\n}\r\n.menu > div.menu_item.checked > u {\r\n    background: url(\"../images/check.gif\") no-repeat 0 -16px;\r\n}\r\n.menu > div.menu_item.checked:hover > u {\r\n    background: url(\"../images/check.gif\") no-repeat 0 -16px;\r\n}\r\n.menu > div.menu_item.disabled > u {\r\n    opacity: 0.2;\r\n}\r\n.menu > div.menu_item.checked.disabled > u {\r\n    background: url(\"../images/check.gif\") no-repeat 0 -16px;\r\n}\r\n.menu > div.menu_item.selected.disabled > u {\r\n    background: url(\"../images/radio.gif\") no-repeat 0 -16px;\r\n}\r\n\r\n.menu_searchbox {\r\n    height: auto;\r\n    width: auto;\r\n    border: 1px solid #be1100;\r\n    background-color: #653b13;\r\n    color: white;\r\n    position: absolute;\r\n    font-family: Tahoma, Arial;\r\n    font-size: 12px;\r\n}\r\n\r\n.menu-completion-highlight {\r\n    color: #2d69c7;\r\n}\r\n.searchbtn_close {\r\n    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAcCAYAAABRVo5BAAAAZ0lEQVR42u2SUQrAMAhDvazn8OjZBilCkYVVxiis8H4CT0VrAJb4WHT3C5xU2a2IQZXJjiQIRMdkEoJ5Q2yMqpfDIo+XY4k6h+YXOyKqTIj5REaxloNAd0xiKmAtsTHqW8sR2W5f7gCu5nWFUpVjZwAAAABJRU5ErkJggg==) no-repeat 50% 0;\r\n    border-radius: 50%;\r\n    border: 0 none;\r\n    color: #656565;\r\n    cursor: pointer;\r\n    font: 16px/16px Arial;\r\n    padding: 0;\r\n    height: 14px;\r\n    width: 14px; \r\n    display: inline-block;\r\n}\r\n.searchbtn_close:hover {\r\n    background-color: #656565;\r\n    background-position: 50% 100%;\r\n    color: white;\r\n}\r\n\r\n.searchbtn_filter {\r\n    background: url(\"../images/check.gif\") no-repeat 50% 0;\r\n    border-radius: 50%;\r\n    border: 0 none;\r\n    color: #656565;\r\n    cursor: pointer;\r\n    font: 16px/16px Arial;\r\n    padding: 0;\r\n    height: 14px;\r\n    width: 14px; \r\n    display: inline-block;\r\n}\r\n\r\n.searchbtn_filter:hover {\r\n    background-color: #656565;\r\n    background-position: 50% 100%;\r\n    color: white;\r\n}\r\n\r\n.menu_no_result {\r\n    padding: 3px 10px 5px 20px;\r\n    white-space: nowrap;\r\n    cursor: default;\r\n    z-index: 1100000;\r\n    height: 13px;\r\n}"],
							"sourceRoot": ""
						}
					]);
					const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
				}),
				174: ((module$1, __webpack_exports__$1, __webpack_require__$1) => {
					"use strict";
					__webpack_require__$1.d(__webpack_exports__$1, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
					var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__$1(1);
					var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
					var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__$1(935);
					var ___CSS_LOADER_EXPORT___ = (/* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__))()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
					___CSS_LOADER_EXPORT___.push([
						module$1.id,
						`.panelbar {
    display:flex;
    height:30px;
    background: #665a82;
    background: #cecece;
    color: #111;
    align-items: stretch;
    justify-content: stretch;
    overflow: hidden;
    position: absolute;
}
.panelbar.vertical {
}

.panelbar.vertical .panelButton {
}
.panelbar.vertical.right .panelButton {
}

.panelButton {
    cursor: default;
    display:flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    transition: 0.5s background-color;
    border-left: #b3b3b3 solid 1px;
    user-select: none;
    height: 30px;
    width: 30px;
    position: absolute;
}
.panelButton:hover {
    background: #e0e0e0;
    border-radius: 10px 10px 0 0;
}
.panelButton.selected {
    background-color: #e7e7e7;
}
.panelButton.active {
    background-color: whitesmoke!important;
    border-radius: 10px 10px 0 0;
}
.panelTitle {
    flex: 1;
    padding: 0 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
`,
						"",
						{
							"version": 3,
							"sources": ["webpack://./assets/styles/panel.css"],
							"names": [],
							"mappings": "AAAA;IACI,YAAY;IACZ,WAAW;IACX,mBAAmB;IACnB,mBAAmB;IACnB,WAAW;IACX,oBAAoB;IACpB,wBAAwB;IACxB,gBAAgB;IAChB,kBAAkB;AACtB;AACA;AACA;;AAEA;AACA;AACA;AACA;;AAEA;IACI,eAAe;IACf,YAAY;IACZ,mBAAmB;IACnB,eAAe;IACf,sBAAsB;IACtB,iCAAiC;IACjC,8BAA8B;IAC9B,iBAAiB;IACjB,YAAY;IACZ,WAAW;IACX,kBAAkB;AACtB;AACA;IACI,mBAAmB;IACnB,4BAA4B;AAChC;AACA;IACI,yBAAyB;AAC7B;AACA;IACI,sCAAsC;IACtC,4BAA4B;AAChC;AACA;IACI,OAAO;IACP,cAAc;IACd,gBAAgB;IAChB,uBAAuB;IACvB,mBAAmB;AACvB",
							"sourcesContent": [".panelbar {\r\n    display:flex;\r\n    height:30px;\r\n    background: #665a82;\r\n    background: #cecece;\r\n    color: #111;\r\n    align-items: stretch;\r\n    justify-content: stretch;\r\n    overflow: hidden;\r\n    position: absolute;\r\n}\r\n.panelbar.vertical {\r\n}\r\n\r\n.panelbar.vertical .panelButton {\r\n}\r\n.panelbar.vertical.right .panelButton {\r\n}\r\n\r\n.panelButton {\r\n    cursor: default;\r\n    display:flex;\r\n    align-items: center;\r\n    padding: 0 10px;\r\n    box-sizing: border-box;\r\n    transition: 0.5s background-color;\r\n    border-left: #b3b3b3 solid 1px;\r\n    user-select: none;\r\n    height: 30px;\r\n    width: 30px;\r\n    position: absolute;\r\n}\r\n.panelButton:hover {\r\n    background: #e0e0e0;\r\n    border-radius: 10px 10px 0 0;\r\n}\r\n.panelButton.selected {\r\n    background-color: #e7e7e7;\r\n}\r\n.panelButton.active {\r\n    background-color: whitesmoke!important;\r\n    border-radius: 10px 10px 0 0;\r\n}\r\n.panelTitle {\r\n    flex: 1;\r\n    padding: 0 2px;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    white-space: nowrap;\r\n}\r\n"],
							"sourceRoot": ""
						}
					]);
					const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
				}),
				915: ((module$1, __webpack_exports__$1, __webpack_require__$1) => {
					"use strict";
					__webpack_require__$1.d(__webpack_exports__$1, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
					var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__$1(1);
					var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
					var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__$1(935);
					var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
					var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__$1(62);
					var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
					var ___CSS_LOADER_URL_IMPORT_0___ = new URL(__webpack_require__$1(553), __webpack_require__$1.b);
					var ___CSS_LOADER_URL_IMPORT_1___ = new URL(__webpack_require__$1(592), __webpack_require__$1.b);
					var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
					var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
					var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
					___CSS_LOADER_EXPORT___.push([
						module$1.id,
						`.cboffline {
    width: 55px;
    height: 21px;
    background: url(${___CSS_LOADER_URL_REPLACEMENT_0___}) no-repeat 0 -21px;
    display: inline-block;
}
.cbofflineDown {
    background-position: 0 0px;
}
.cbofflineChecked {
    background-position: 0 0px;
}

.checkbox {
    display: inline-block;
    width: 16px;
    height: 17px;
    background-repeat: no-repeat;
    background-image: url(${___CSS_LOADER_URL_REPLACEMENT_1___});
    background-size: 16px 136px;
    background-position: 0 0;
}

.checkboxOver {
    background-position: 0 -17px;
}

.checkboxDown {
    background-position: 0 -34px;
}

.checkboxChecked {
    background-position: 0 -51px;
}`,
						"",
						{
							"version": 3,
							"sources": ["webpack://./assets/styles/switcher.css"],
							"names": [],
							"mappings": "AAAA;IACI,WAAW;IACX,YAAY;IACZ,qEAAuD;IACvD,qBAAqB;AACzB;AACA;IACI,0BAA0B;AAC9B;AACA;IACI,0BAA0B;AAC9B;;AAEA;IACI,qBAAqB;IACrB,WAAW;IACX,YAAY;IACZ,4BAA4B;IAC5B,yDAAwD;IACxD,2BAA2B;IAC3B,wBAAwB;AAC5B;;AAEA;IACI,4BAA4B;AAChC;;AAEA;IACI,4BAA4B;AAChC;;AAEA;IACI,4BAA4B;AAChC",
							"sourcesContent": [".cboffline {\r\n    width: 55px;\r\n    height: 21px;\r\n    background: url(\"../images/sync.png\") no-repeat 0 -21px;\r\n    display: inline-block;\r\n}\r\n.cbofflineDown {\r\n    background-position: 0 0px;\r\n}\r\n.cbofflineChecked {\r\n    background-position: 0 0px;\r\n}\r\n\r\n.checkbox {\r\n    display: inline-block;\r\n    width: 16px;\r\n    height: 17px;\r\n    background-repeat: no-repeat;\r\n    background-image: url(\"../images/checkbox_black@1x.png\");\r\n    background-size: 16px 136px;\r\n    background-position: 0 0;\r\n}\r\n\r\n.checkboxOver {\r\n    background-position: 0 -17px;\r\n}\r\n\r\n.checkboxDown {\r\n    background-position: 0 -34px;\r\n}\r\n\r\n.checkboxChecked {\r\n    background-position: 0 -51px;\r\n}"],
							"sourceRoot": ""
						}
					]);
					const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
				}),
				129: ((module$1, __webpack_exports__$1, __webpack_require__$1) => {
					"use strict";
					__webpack_require__$1.d(__webpack_exports__$1, { A: () => __WEBPACK_DEFAULT_EXPORT__ });
					var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__$1(1);
					var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
					var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__$1(935);
					var ___CSS_LOADER_EXPORT___ = (/* @__PURE__ */ __webpack_require__$1.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__))()(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default());
					___CSS_LOADER_EXPORT___.push([
						module$1.id,
						`.tabContainer {
    align-items: stretch;
    height: 30px;
}

.tabPlusButton {
    --color: #ababab;
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 8px;
    color: transparent;
}
.tabPlusButton:after {
    content: "";
    background-image: linear-gradient(to bottom, transparent 40%, var(--color) 40%, var(--color) 60%,  transparent 60%),
        linear-gradient(to right, transparent 40%, var(--color) 40%, var(--color) 60%, transparent 60%);
        position: absolute;
    width: 12px;
    height: 12px;
    top: 8px;
}
.tabPlusButton:hover:after {
    --color: #35cc95

}

.tabPlusButton:active {
    color: darkgreen
}

.tabScroller {
    overflow: hidden;
    position: relative;
}
.tab.changed>.tabCloseButton {
    background: #afafaf;
    border: transparent;
}

.tabbar {
    display:flex;
    background: var(--toolbar-background);
    color: #333;
    align-items: stretch;
    overflow: hidden;
    position: absolute;
    user-select: none;
}
.tab {
    font-size: 12px;
    height: 100%;
    /*min-width: 100px;*/
    cursor: default;
    display:flex;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    background: var(--toolbar-background);
    border-left: transparent solid 1px;
    border-right: transparent solid 1px;
    user-select: none;
    position: absolute;
}

.tab.selected.active:after {
    content: "";
    border-bottom: 2px solid rgb(127, 127, 191);
    width: calc(100% - 22px);
    bottom: 0;
    position: absolute;
}
.tab.focused.active:after {
    content: "";
    border-bottom: 3px solid rgb(127, 127, 191);
    width: calc(100% - 22px);
    bottom: 0;
    position: absolute;
}

.tab.scrolledLeft {
    border-color: var(--splitter-color);
    box-shadow: 0px 0px 2px 0px #d0d0d0;
}
.tabIcon {
    display: none;
}

.tabLeftOverflow {

}
.tabRightOverflow {

}
.tabDragging {
    display: flex;
    box-sizing: border-box;
    transition: 0.5s background-color;
    user-select: none;
    z-index: 100000;
    pointer-events: none;
    position: absolute;
}

.tab:hover {
    background: var(--hover-background);
}
.tab.selected {
    background-color: #e7e7e7;
}
.tab.active {
    background-color: whitesmoke;
}
 .tabDragging > .tab.active {
    background-color: #e7e7e7;
}

.tabCloseButton {
    transform: rotate(45deg);
    width: 11px;
    height: 11px;
    display: inline-block;
    border-radius: 10px;
    cursor: pointer;
    opacity: 0;
    background: linear-gradient(to bottom, transparent 40%, #ababab 40%, #ababab 60%,  transparent 60%),
        linear-gradient(to right, transparent 40%, #ababab 40%, #ababab 60%, transparent 60%);
}


.tabCloseButton:hover {
    background-color: #ababab;
    border: 1px solid #ababab;
    background-image: linear-gradient(to bottom, transparent 40%, #fff 40%, #fff 60%,  transparent 60%),
        linear-gradient(to right, transparent 40%, #fff 40%, #fff 60%, transparent 60%);

}

.tab.active .tabCloseButton,
.tab:hover .tabCloseButton,
.tabCloseButton.changed {
    opacity: 1
}

.tabIcon {
    color: yellow;
    padding: 0 4px 0 0;
}
.tab.active .tabIcon {
    color: orange
}
.tabTitle {
    flex: 1;
    padding: 0 2px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}



.tabbar.vertical .tab {
    transform: rotate(180deg);
}


.split-area {
    position: absolute;
    background: rgba(0, 0, 0, 0.05);
    border: 1px solid rgba(0, 0, 0, 0.2);
    z-index: 100000;
    pointer-events: none;
    box-sizing: border-box;
    cursor: default;
}

.dark.split-area {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 0 200px rgba(255, 255, 255, 0.15) inset;
    outline: 1px solid black;
}

.tab-editor {
    position: absolute;
}`,
						"",
						{
							"version": 3,
							"sources": ["webpack://./assets/styles/tab.css"],
							"names": [],
							"mappings": "AAAA;IACI,oBAAoB;IACpB,YAAY;AAChB;;AAEA;IACI,gBAAgB;IAChB,eAAe;IACf,aAAa;IACb,mBAAmB;IACnB,YAAY;IACZ,kBAAkB;AACtB;AACA;IACI,WAAW;IACX;uGACmG;QAC/F,kBAAkB;IACtB,WAAW;IACX,YAAY;IACZ,QAAQ;AACZ;AACA;IACI;;AAEJ;;AAEA;IACI;AACJ;;AAEA;IACI,gBAAgB;IAChB,kBAAkB;AACtB;AACA;IACI,mBAAmB;IACnB,mBAAmB;AACvB;;AAEA;IACI,YAAY;IACZ,qCAAqC;IACrC,WAAW;IACX,oBAAoB;IACpB,gBAAgB;IAChB,kBAAkB;IAClB,iBAAiB;AACrB;AACA;IACI,eAAe;IACf,YAAY;IACZ,oBAAoB;IACpB,eAAe;IACf,YAAY;IACZ,mBAAmB;IACnB,eAAe;IACf,sBAAsB;IACtB,qCAAqC;IACrC,kCAAkC;IAClC,mCAAmC;IACnC,iBAAiB;IACjB,kBAAkB;AACtB;;AAEA;IACI,WAAW;IACX,2CAA2C;IAC3C,wBAAwB;IACxB,SAAS;IACT,kBAAkB;AACtB;AACA;IACI,WAAW;IACX,2CAA2C;IAC3C,wBAAwB;IACxB,SAAS;IACT,kBAAkB;AACtB;;AAEA;IACI,mCAAmC;IACnC,mCAAmC;AACvC;AACA;IACI,aAAa;AACjB;;AAEA;;AAEA;AACA;;AAEA;AACA;IACI,aAAa;IACb,sBAAsB;IACtB,iCAAiC;IACjC,iBAAiB;IACjB,eAAe;IACf,oBAAoB;IACpB,kBAAkB;AACtB;;AAEA;IACI,mCAAmC;AACvC;AACA;IACI,yBAAyB;AAC7B;AACA;IACI,4BAA4B;AAChC;CACC;IACG,yBAAyB;AAC7B;;AAEA;IACI,wBAAwB;IACxB,WAAW;IACX,YAAY;IACZ,qBAAqB;IACrB,mBAAmB;IACnB,eAAe;IACf,UAAU;IACV;6FACyF;AAC7F;;;AAGA;IACI,yBAAyB;IACzB,yBAAyB;IACzB;uFACmF;;AAEvF;;AAEA;;;IAGI;AACJ;;AAEA;IACI,aAAa;IACb,kBAAkB;AACtB;AACA;IACI;AACJ;AACA;IACI,OAAO;IACP,cAAc;IACd,gBAAgB;IAChB,uBAAuB;IACvB,mBAAmB;AACvB;;;;AAIA;IACI,yBAAyB;AAC7B;;;AAGA;IACI,kBAAkB;IAClB,+BAA+B;IAC/B,oCAAoC;IACpC,eAAe;IACf,oBAAoB;IACpB,sBAAsB;IACtB,eAAe;AACnB;;AAEA;IACI,qCAAqC;IACrC,0CAA0C;IAC1C,qDAAqD;IACrD,wBAAwB;AAC5B;;AAEA;IACI,kBAAkB;AACtB",
							"sourcesContent": [".tabContainer {\r\n    align-items: stretch;\r\n    height: 30px;\r\n}\r\n\r\n.tabPlusButton {\r\n    --color: #ababab;\r\n    cursor: pointer;\r\n    display: flex;\r\n    align-items: center;\r\n    padding: 8px;\r\n    color: transparent;\r\n}\r\n.tabPlusButton:after {\r\n    content: \"\";\r\n    background-image: linear-gradient(to bottom, transparent 40%, var(--color) 40%, var(--color) 60%,  transparent 60%),\r\n        linear-gradient(to right, transparent 40%, var(--color) 40%, var(--color) 60%, transparent 60%);\r\n        position: absolute;\r\n    width: 12px;\r\n    height: 12px;\r\n    top: 8px;\r\n}\r\n.tabPlusButton:hover:after {\r\n    --color: #35cc95\r\n\r\n}\r\n\r\n.tabPlusButton:active {\r\n    color: darkgreen\r\n}\r\n\r\n.tabScroller {\r\n    overflow: hidden;\r\n    position: relative;\r\n}\r\n.tab.changed>.tabCloseButton {\r\n    background: #afafaf;\r\n    border: transparent;\r\n}\r\n\r\n.tabbar {\r\n    display:flex;\r\n    background: var(--toolbar-background);\r\n    color: #333;\r\n    align-items: stretch;\r\n    overflow: hidden;\r\n    position: absolute;\r\n    user-select: none;\r\n}\r\n.tab {\r\n    font-size: 12px;\r\n    height: 100%;\r\n    /*min-width: 100px;*/\r\n    cursor: default;\r\n    display:flex;\r\n    align-items: center;\r\n    padding: 0 10px;\r\n    box-sizing: border-box;\r\n    background: var(--toolbar-background);\r\n    border-left: transparent solid 1px;\r\n    border-right: transparent solid 1px;\r\n    user-select: none;\r\n    position: absolute;\r\n}\r\n\r\n.tab.selected.active:after {\r\n    content: \"\";\r\n    border-bottom: 2px solid rgb(127, 127, 191);\r\n    width: calc(100% - 22px);\r\n    bottom: 0;\r\n    position: absolute;\r\n}\r\n.tab.focused.active:after {\r\n    content: \"\";\r\n    border-bottom: 3px solid rgb(127, 127, 191);\r\n    width: calc(100% - 22px);\r\n    bottom: 0;\r\n    position: absolute;\r\n}\r\n\r\n.tab.scrolledLeft {\r\n    border-color: var(--splitter-color);\r\n    box-shadow: 0px 0px 2px 0px #d0d0d0;\r\n}\r\n.tabIcon {\r\n    display: none;\r\n}\r\n\r\n.tabLeftOverflow {\r\n\r\n}\r\n.tabRightOverflow {\r\n\r\n}\r\n.tabDragging {\r\n    display: flex;\r\n    box-sizing: border-box;\r\n    transition: 0.5s background-color;\r\n    user-select: none;\r\n    z-index: 100000;\r\n    pointer-events: none;\r\n    position: absolute;\r\n}\r\n\r\n.tab:hover {\r\n    background: var(--hover-background);\r\n}\r\n.tab.selected {\r\n    background-color: #e7e7e7;\r\n}\r\n.tab.active {\r\n    background-color: whitesmoke;\r\n}\r\n .tabDragging > .tab.active {\r\n    background-color: #e7e7e7;\r\n}\r\n\r\n.tabCloseButton {\r\n    transform: rotate(45deg);\r\n    width: 11px;\r\n    height: 11px;\r\n    display: inline-block;\r\n    border-radius: 10px;\r\n    cursor: pointer;\r\n    opacity: 0;\r\n    background: linear-gradient(to bottom, transparent 40%, #ababab 40%, #ababab 60%,  transparent 60%),\r\n        linear-gradient(to right, transparent 40%, #ababab 40%, #ababab 60%, transparent 60%);\r\n}\r\n\r\n\r\n.tabCloseButton:hover {\r\n    background-color: #ababab;\r\n    border: 1px solid #ababab;\r\n    background-image: linear-gradient(to bottom, transparent 40%, #fff 40%, #fff 60%,  transparent 60%),\r\n        linear-gradient(to right, transparent 40%, #fff 40%, #fff 60%, transparent 60%);\r\n\r\n}\r\n\r\n.tab.active .tabCloseButton,\r\n.tab:hover .tabCloseButton,\r\n.tabCloseButton.changed {\r\n    opacity: 1\r\n}\r\n\r\n.tabIcon {\r\n    color: yellow;\r\n    padding: 0 4px 0 0;\r\n}\r\n.tab.active .tabIcon {\r\n    color: orange\r\n}\r\n.tabTitle {\r\n    flex: 1;\r\n    padding: 0 2px;\r\n    overflow: hidden;\r\n    text-overflow: ellipsis;\r\n    white-space: nowrap;\r\n}\r\n\r\n\r\n\r\n.tabbar.vertical .tab {\r\n    transform: rotate(180deg);\r\n}\r\n\r\n\r\n.split-area {\r\n    position: absolute;\r\n    background: rgba(0, 0, 0, 0.05);\r\n    border: 1px solid rgba(0, 0, 0, 0.2);\r\n    z-index: 100000;\r\n    pointer-events: none;\r\n    box-sizing: border-box;\r\n    cursor: default;\r\n}\r\n\r\n.dark.split-area {\r\n    background: rgba(255, 255, 255, 0.05);\r\n    border: 1px solid rgba(255, 255, 255, 0.3);\r\n    box-shadow: 0 0 200px rgba(255, 255, 255, 0.15) inset;\r\n    outline: 1px solid black;\r\n}\r\n\r\n.tab-editor {\r\n    position: absolute;\r\n}"],
							"sourceRoot": ""
						}
					]);
					const __WEBPACK_DEFAULT_EXPORT__ = ___CSS_LOADER_EXPORT___;
				}),
				935: ((module$1) => {
					"use strict";
					module$1.exports = function(cssWithMappingToString) {
						var list = [];
						list.toString = function toString() {
							return this.map(function(item) {
								var content = "";
								var needLayer = typeof item[5] !== "undefined";
								if (item[4]) content += "@supports (".concat(item[4], ") {");
								if (item[2]) content += "@media ".concat(item[2], " {");
								if (needLayer) content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
								content += cssWithMappingToString(item);
								if (needLayer) content += "}";
								if (item[2]) content += "}";
								if (item[4]) content += "}";
								return content;
							}).join("");
						};
						list.i = function i(modules, media, dedupe, supports, layer) {
							if (typeof modules === "string") modules = [[
								null,
								modules,
								void 0
							]];
							var alreadyImportedModules = {};
							if (dedupe) for (var k = 0; k < this.length; k++) {
								var id = this[k][0];
								if (id != null) alreadyImportedModules[id] = true;
							}
							for (var _k = 0; _k < modules.length; _k++) {
								var item = [].concat(modules[_k]);
								if (dedupe && alreadyImportedModules[item[0]]) continue;
								if (typeof layer !== "undefined") if (typeof item[5] === "undefined") item[5] = layer;
								else {
									item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
									item[5] = layer;
								}
								if (media) if (!item[2]) item[2] = media;
								else {
									item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
									item[2] = media;
								}
								if (supports) if (!item[4]) item[4] = "".concat(supports);
								else {
									item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
									item[4] = supports;
								}
								list.push(item);
							}
						};
						return list;
					};
				}),
				62: ((module$1) => {
					"use strict";
					module$1.exports = function(url, options) {
						if (!options) options = {};
						if (!url) return url;
						url = String(url.__esModule ? url.default : url);
						if (/^['"].*['"]$/.test(url)) url = url.slice(1, -1);
						if (options.hash) url += options.hash;
						if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) return "\"".concat(url.replace(/"/g, "\\\"").replace(/\n/g, "\\n"), "\"");
						return url;
					};
				}),
				1: ((module$1) => {
					"use strict";
					module$1.exports = function(item) {
						var content = item[1];
						var cssMapping = item[3];
						if (!cssMapping) return content;
						if (typeof btoa === "function") {
							var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
							var data$1 = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
							var sourceMapping = "/*# ".concat(data$1, " */");
							return [content].concat([sourceMapping]).join("\n");
						}
						return [content].join("\n");
					};
				}),
				532: (function(module$1) {
					(function webpackUniversalModuleDefinition(root, factory) {
						module$1.exports = factory();
					})(this, () => {
						return (() => {
							var __webpack_modules__$1 = {
								217: ((module2) => {
									"use strict";
									var $cancelT;
									module2.exports = {
										lineMode: false,
										pasteCancelled: function() {
											if ($cancelT && $cancelT > Date.now() - 50) return true;
											return $cancelT = false;
										},
										cancel: function() {
											$cancelT = Date.now();
										}
									};
								}),
								379: ((__unused_webpack_module, exports2, __webpack_require__2) => {
									"use strict";
									var oop = __webpack_require__2(645);
									var MultiHashHandler = __webpack_require__2(50).O;
									var EventEmitter = __webpack_require__2(366).b;
									var CommandManager = function(platform, commands) {
										MultiHashHandler.call(this, commands, platform);
										this.byName = this.commands;
										this.setDefaultHandler("exec", function(e) {
											if (!e.args) return e.command.exec(e.editor, {}, e.event, true);
											return e.command.exec(e.editor, e.args, e.event, false);
										});
									};
									oop.inherits(CommandManager, MultiHashHandler);
									(function() {
										oop.implement(this, EventEmitter);
										this.exec = function(command, editor, args) {
											if (Array.isArray(command)) {
												for (var i = command.length; i--;) if (this.exec(command[i], editor, args)) return true;
												return false;
											}
											if (typeof command === "string") command = this.commands[command];
											if (!command) return false;
											if (editor && editor.$readOnly && !command.readOnly) return false;
											if (this.$checkCommandState != false && command.isAvailable && !command.isAvailable(editor)) return false;
											var e = {
												editor,
												command,
												args
											};
											e.returnValue = this._emit("exec", e);
											this._signal("afterExec", e);
											return e.returnValue === false ? false : true;
										};
										this.toggleRecording = function(editor) {
											if (this.$inReplay) return;
											editor && editor._emit("changeStatus");
											if (this.recording) {
												this.macro.pop();
												this.off("exec", this.$addCommandToMacro);
												if (!this.macro.length) this.macro = this.oldMacro;
												return this.recording = false;
											}
											if (!this.$addCommandToMacro) this.$addCommandToMacro = function(e) {
												this.macro.push([e.command, e.args]);
											}.bind(this);
											this.oldMacro = this.macro;
											this.macro = [];
											this.on("exec", this.$addCommandToMacro);
											return this.recording = true;
										};
										this.replay = function(editor) {
											if (this.$inReplay || !this.macro) return;
											if (this.recording) return this.toggleRecording(editor);
											try {
												this.$inReplay = true;
												this.macro.forEach(function(x) {
													if (typeof x == "string") this.exec(x, editor);
													else this.exec(x[0], editor, x[1]);
												}, this);
											} finally {
												this.$inReplay = false;
											}
										};
										this.trimMacro = function(m) {
											return m.map(function(x) {
												if (typeof x[0] != "string") x[0] = x[0].name;
												if (!x[1]) x = x[0];
												return x;
											});
										};
									}).call(CommandManager.prototype);
									exports2.F = CommandManager;
								}),
								50: ((__unused_webpack_module, exports2, __webpack_require__2) => {
									"use strict";
									var keyUtil = __webpack_require__2(451);
									var useragent = __webpack_require__2(943);
									var KEY_MODS = keyUtil.KEY_MODS;
									function HashHandler(config, platform) {
										this.platform = platform || (useragent.isMac ? "mac" : "win");
										this.commands = {};
										this.commandKeyBinding = {};
										this.addCommands(config);
										this.$singleCommand = true;
									}
									function MultiHashHandler(config, platform) {
										HashHandler.call(this, config, platform);
										this.$singleCommand = false;
									}
									MultiHashHandler.prototype = HashHandler.prototype;
									(function() {
										this.addCommand = function(command) {
											if (this.commands[command.name]) this.removeCommand(command);
											this.commands[command.name] = command;
											if (command.bindKey) this._buildKeyHash(command);
										};
										this.removeCommand = function(command, keepCommand) {
											var name$1 = command && (typeof command === "string" ? command : command.name);
											command = this.commands[name$1];
											if (!keepCommand) delete this.commands[name$1];
											var ckb = this.commandKeyBinding;
											for (var keyId in ckb) {
												var cmdGroup = ckb[keyId];
												if (cmdGroup == command) delete ckb[keyId];
												else if (Array.isArray(cmdGroup)) {
													var i = cmdGroup.indexOf(command);
													if (i != -1) {
														cmdGroup.splice(i, 1);
														if (cmdGroup.length == 1) ckb[keyId] = cmdGroup[0];
													}
												}
											}
										};
										this.bindKey = function(key, command, position) {
											if (typeof key == "object" && key) {
												if (position == void 0) position = key.position;
												key = key[this.platform];
											}
											if (!key) return;
											if (typeof command == "function") return this.addCommand({
												exec: command,
												bindKey: key,
												name: command.name || key
											});
											key.split("|").forEach(function(keyPart) {
												var chain = "";
												if (keyPart.indexOf(" ") != -1) {
													var parts = keyPart.split(/\s+/);
													keyPart = parts.pop();
													parts.forEach(function(keyPart2) {
														var binding2 = this.parseKeys(keyPart2);
														var id2 = KEY_MODS[binding2.hashId] + binding2.key;
														chain += (chain ? " " : "") + id2;
														this._addCommandToBinding(chain, "chainKeys");
													}, this);
													chain += " ";
												}
												var binding = this.parseKeys(keyPart);
												var id = KEY_MODS[binding.hashId] + binding.key;
												this._addCommandToBinding(chain + id, command, position);
											}, this);
										};
										function getPosition(command) {
											return typeof command == "object" && command.bindKey && command.bindKey.position || (command.isDefault ? -100 : 0);
										}
										this._addCommandToBinding = function(keyId, command, position) {
											var ckb = this.commandKeyBinding, i;
											if (!command) delete ckb[keyId];
											else if (!ckb[keyId] || this.$singleCommand) ckb[keyId] = command;
											else {
												if (!Array.isArray(ckb[keyId])) ckb[keyId] = [ckb[keyId]];
												else if ((i = ckb[keyId].indexOf(command)) != -1) ckb[keyId].splice(i, 1);
												if (typeof position != "number") position = getPosition(command);
												var commands = ckb[keyId];
												for (i = 0; i < commands.length; i++) {
													var other = commands[i];
													if (getPosition(other) > position) break;
												}
												commands.splice(i, 0, command);
											}
										};
										this.addCommands = function(commands) {
											commands && Object.keys(commands).forEach(function(name$1) {
												var command = commands[name$1];
												if (!command) return;
												if (typeof command === "string") return this.bindKey(command, name$1);
												if (typeof command === "function") command = { exec: command };
												if (typeof command !== "object") return;
												if (!command.name) command.name = name$1;
												this.addCommand(command);
											}, this);
										};
										this.removeCommands = function(commands) {
											Object.keys(commands).forEach(function(name$1) {
												this.removeCommand(commands[name$1]);
											}, this);
										};
										this.bindKeys = function(keyList) {
											Object.keys(keyList).forEach(function(key) {
												this.bindKey(key, keyList[key]);
											}, this);
										};
										this._buildKeyHash = function(command) {
											this.bindKey(command.bindKey, command);
										};
										this.parseKeys = function(keys) {
											var parts = keys.toLowerCase().split(/[\-\+]([\-\+])?/).filter(function(x) {
												return x;
											});
											var key = parts.pop();
											var keyCode = keyUtil[key];
											if (keyUtil.FUNCTION_KEYS[keyCode]) key = keyUtil.FUNCTION_KEYS[keyCode].toLowerCase();
											else if (!parts.length) return {
												key,
												hashId: -1
											};
											else if (parts.length == 1 && parts[0] == "shift") return {
												key: key.toUpperCase(),
												hashId: -1
											};
											var hashId = 0;
											for (var i = parts.length; i--;) {
												var modifier = keyUtil.KEY_MODS[parts[i]];
												if (modifier == null) {
													if (typeof console != "undefined") console.error("invalid modifier " + parts[i] + " in " + keys);
													return false;
												}
												hashId |= modifier;
											}
											return {
												key,
												hashId
											};
										};
										this.findKeyCommand = function findKeyCommand(hashId, keyString) {
											var key = KEY_MODS[hashId] + keyString;
											return this.commandKeyBinding[key];
										};
										this.handleKeyboard = function(data$1, hashId, keyString, keyCode) {
											if (keyCode < 0) return;
											var key = KEY_MODS[hashId] + keyString;
											var command = this.commandKeyBinding[key];
											if (data$1.$keyChain) {
												data$1.$keyChain += " " + key;
												command = this.commandKeyBinding[data$1.$keyChain] || command;
											}
											if (command) {
												if (command == "chainKeys" || command[command.length - 1] == "chainKeys") {
													data$1.$keyChain = data$1.$keyChain || key;
													return { command: "null" };
												}
											}
											if (data$1.$keyChain) {
												if ((!hashId || hashId == 4) && keyString.length == 1) data$1.$keyChain = data$1.$keyChain.slice(0, -key.length - 1);
												else if (hashId == -1 || keyCode > 0) data$1.$keyChain = "";
											}
											return { command };
										};
										this.getStatusText = function(editor, data$1) {
											return data$1.$keyChain || "";
										};
									}).call(HashHandler.prototype);
									exports2.O = MultiHashHandler;
								}),
								957: ((__unused_webpack_module, exports2, __webpack_require__2) => {
									"use strict";
									var keyUtil = __webpack_require__2(451);
									var event = __webpack_require__2(631);
									var KeyBinding = function(editor) {
										this.$editor = editor;
										this.$data = { editor };
										this.$handlers = [];
										this.setDefaultHandler(editor.commands);
									};
									(function() {
										this.setDefaultHandler = function(kb) {
											this.removeKeyboardHandler(this.$defaultHandler);
											this.$defaultHandler = kb;
											this.addKeyboardHandler(kb, 0);
										};
										this.setKeyboardHandler = function(kb) {
											var h = this.$handlers;
											if (h[h.length - 1] == kb) return;
											while (h[h.length - 1] && h[h.length - 1] != this.$defaultHandler) this.removeKeyboardHandler(h[h.length - 1]);
											this.addKeyboardHandler(kb, 1);
										};
										this.addKeyboardHandler = function(kb, pos) {
											if (!kb) return;
											if (typeof kb == "function" && !kb.handleKeyboard) kb.handleKeyboard = kb;
											var i = this.$handlers.indexOf(kb);
											if (i != -1) this.$handlers.splice(i, 1);
											if (pos == void 0) this.$handlers.push(kb);
											else this.$handlers.splice(pos, 0, kb);
											if (i == -1 && kb.attach) kb.attach(this.$editor);
										};
										this.removeKeyboardHandler = function(kb) {
											var i = this.$handlers.indexOf(kb);
											if (i == -1) return false;
											this.$handlers.splice(i, 1);
											kb.detach && kb.detach(this.$editor);
											return true;
										};
										this.getKeyboardHandler = function() {
											return this.$handlers[this.$handlers.length - 1];
										};
										this.getStatusText = function() {
											var data$1 = this.$data;
											var editor = data$1.editor;
											return this.$handlers.map(function(h) {
												return h.getStatusText && h.getStatusText(editor, data$1) || "";
											}).filter(Boolean).join(" ");
										};
										this.$callKeyboardHandlers = function(hashId, keyString, keyCode, e) {
											var toExecute;
											var success = false;
											var commands = this.$editor.commands;
											for (var i = this.$handlers.length; i--;) {
												toExecute = this.$handlers[i].handleKeyboard(this.$data, hashId, keyString, keyCode, e);
												if (!toExecute || !toExecute.command) continue;
												if (toExecute.command == "null") success = true;
												else success = commands.exec(toExecute.command, this.$editor, toExecute.args, e);
												if (success && e && hashId != -1 && toExecute.passEvent != true && toExecute.command.passEvent != true) event.stopEvent(e);
												if (success) break;
											}
											if (!success && hashId == -1) {
												toExecute = { command: "insertstring" };
												success = commands.exec("insertstring", this.$editor, keyString);
											}
											if (success && this.$editor._signal) this.$editor._signal("keyboardActivity", toExecute);
											return success;
										};
										this.onCommandKey = function(e, hashId, keyCode) {
											var keyString = keyUtil.keyCodeToString(keyCode);
											return this.$callKeyboardHandlers(hashId, keyString, keyCode, e);
										};
										this.onTextInput = function(text) {
											return this.$callKeyboardHandlers(-1, text);
										};
									}).call(KeyBinding.prototype);
									exports2.$ = KeyBinding;
								}),
								984: ((__unused_webpack_module, exports2, __webpack_require__2) => {
									"use strict";
									var event = __webpack_require__2(631);
									var useragent = __webpack_require__2(943);
									var dom$1 = __webpack_require__2(435);
									var lang = __webpack_require__2(955);
									var clipboard = __webpack_require__2(217);
									var BROKEN_SETDATA = useragent.isChrome < 18;
									var USE_IE_MIME_TYPE = useragent.isIE;
									var HAS_FOCUS_ARGS = useragent.isChrome > 63;
									var MAX_LINE_LENGTH = 400;
									var KEYS = __webpack_require__2(451);
									var MODS = KEYS.KEY_MODS;
									var isIOS = useragent.isIOS;
									var valueResetRegex = isIOS ? /\s/ : /\n/;
									var isMobile = useragent.isMobile;
									var TextInput = function(parentNode, host) {
										var text = dom$1.createElement("textarea");
										text.className = "ace_text-input";
										text.setAttribute("wrap", "off");
										text.setAttribute("autocorrect", "off");
										text.setAttribute("autocapitalize", "off");
										text.setAttribute("spellcheck", false);
										text.style.opacity = "0";
										parentNode.insertBefore(text, parentNode.firstChild);
										var copied = false;
										var pasted = false;
										var inComposition = false;
										var sendingText = false;
										var tempStyle = "";
										if (!isMobile) text.style.fontSize = "1px";
										var commandMode = false;
										var ignoreFocusEvents = false;
										var lastValue = "";
										var lastSelectionStart = 0;
										var lastSelectionEnd = 0;
										var lastRestoreEnd = 0;
										try {
											var isFocused = document.activeElement === text;
										} catch (e) {}
										this.setAriaOptions = function(options) {
											if (options.activeDescendant) {
												text.setAttribute("aria-haspopup", "true");
												text.setAttribute("aria-autocomplete", "list");
												text.setAttribute("aria-activedescendant", options.activeDescendant);
											} else {
												text.setAttribute("aria-haspopup", "false");
												text.setAttribute("aria-autocomplete", "both");
												text.removeAttribute("aria-activedescendant");
											}
											if (options.role) text.setAttribute("role", options.role);
										};
										this.setAriaOptions({ role: "textbox" });
										event.addListener(text, "blur", function(e) {
											if (ignoreFocusEvents) return;
											host.onBlur(e);
											isFocused = false;
										}, host);
										event.addListener(text, "focus", function(e) {
											if (ignoreFocusEvents) return;
											isFocused = true;
											if (useragent.isEdge) try {
												if (!document.hasFocus()) return;
											} catch (e2) {}
											host.onFocus(e);
											if (useragent.isEdge) setTimeout(resetSelection);
											else resetSelection();
										}, host);
										this.$focusScroll = false;
										this.focus = function() {
											if (tempStyle || HAS_FOCUS_ARGS || this.$focusScroll == "browser") return text.focus({ preventScroll: true });
											var top = text.style.top;
											text.style.position = "fixed";
											text.style.top = "0px";
											try {
												var isTransformed = text.getBoundingClientRect().top != 0;
											} catch (e) {
												return;
											}
											var ancestors = [];
											if (isTransformed) {
												var t = text.parentElement;
												while (t && t.nodeType == 1) {
													ancestors.push(t);
													t.setAttribute("ace_nocontext", true);
													if (!t.parentElement && t.getRootNode) t = t.getRootNode().host;
													else t = t.parentElement;
												}
											}
											text.focus({ preventScroll: true });
											if (isTransformed) ancestors.forEach(function(p) {
												p.removeAttribute("ace_nocontext");
											});
											setTimeout(function() {
												text.style.position = "";
												if (text.style.top == "0px") text.style.top = top;
											}, 0);
										};
										this.blur = function() {
											text.blur();
										};
										this.isFocused = function() {
											return isFocused;
										};
										host.on("beforeEndOperation", function() {
											var curOp = host.curOp;
											var commandName = curOp && curOp.command && curOp.command.name;
											if (commandName == "insertstring") return;
											var isUserAction = commandName && (curOp.docChanged || curOp.selectionChanged);
											if (inComposition && isUserAction) {
												lastValue = text.value = "";
												onCompositionEnd();
											}
											resetSelection();
										});
										var resetSelection = isIOS ? function(value) {
											if (!isFocused || copied && !value || sendingText) return;
											if (!value) value = "";
											var newValue = "\n ab" + value + "cde fg\n";
											if (newValue != text.value) text.value = lastValue = newValue;
											var selectionStart = 4;
											var selectionEnd = 4 + (value.length || (host.selection.isEmpty() ? 0 : 1));
											if (lastSelectionStart != selectionStart || lastSelectionEnd != selectionEnd) text.setSelectionRange(selectionStart, selectionEnd);
											lastSelectionStart = selectionStart;
											lastSelectionEnd = selectionEnd;
										} : function() {
											if (inComposition || sendingText) return;
											if (!isFocused && !afterContextMenu) return;
											inComposition = true;
											var selectionStart = 0;
											var selectionEnd = 0;
											var line = "";
											if (host.session) {
												var selection = host.selection;
												var range = selection.getRange();
												var row = selection.cursor.row;
												selectionStart = range.start.column;
												selectionEnd = range.end.column;
												line = host.session.getLine(row);
												if (range.start.row != row) {
													var prevLine = host.session.getLine(row - 1);
													selectionStart = range.start.row < row - 1 ? 0 : selectionStart;
													selectionEnd += prevLine.length + 1;
													line = prevLine + "\n" + line;
												} else if (range.end.row != row) {
													var nextLine = host.session.getLine(row + 1);
													selectionEnd = range.end.row > row + 1 ? nextLine.length : selectionEnd;
													selectionEnd += line.length + 1;
													line = line + "\n" + nextLine;
												} else if (isMobile && row > 0) {
													line = "\n" + line;
													selectionEnd += 1;
													selectionStart += 1;
												}
												if (line.length > MAX_LINE_LENGTH) if (selectionStart < MAX_LINE_LENGTH && selectionEnd < MAX_LINE_LENGTH) line = line.slice(0, MAX_LINE_LENGTH);
												else {
													line = "\n";
													if (selectionStart == selectionEnd) selectionStart = selectionEnd = 0;
													else {
														selectionStart = 0;
														selectionEnd = 1;
													}
												}
											}
											var newValue = line + "\n\n";
											if (newValue != lastValue) {
												text.value = lastValue = newValue;
												lastSelectionStart = lastSelectionEnd = newValue.length;
											}
											if (afterContextMenu) {
												lastSelectionStart = text.selectionStart;
												lastSelectionEnd = text.selectionEnd;
											}
											if (lastSelectionEnd != selectionEnd || lastSelectionStart != selectionStart || text.selectionEnd != lastSelectionEnd) try {
												text.setSelectionRange(selectionStart, selectionEnd);
												lastSelectionStart = selectionStart;
												lastSelectionEnd = selectionEnd;
											} catch (e) {}
											inComposition = false;
										};
										this.resetSelection = resetSelection;
										if (isFocused) host.onFocus();
										var isAllSelected = function(text2) {
											return text2.selectionStart === 0 && text2.selectionEnd >= lastValue.length && text2.value === lastValue && lastValue && text2.selectionEnd !== lastSelectionEnd;
										};
										var onSelect = function(e) {
											if (inComposition) return;
											if (copied) copied = false;
											else if (isAllSelected(text)) {
												host.selectAll();
												resetSelection();
											} else if (isMobile && text.selectionStart != lastSelectionStart) resetSelection();
										};
										var inputHandler = null;
										this.setInputHandler = function(cb) {
											inputHandler = cb;
										};
										this.getInputHandler = function() {
											return inputHandler;
										};
										var afterContextMenu = false;
										var sendText = function(value, fromInput) {
											if (afterContextMenu) afterContextMenu = false;
											if (pasted) {
												resetSelection();
												if (value) host.onPaste(value);
												pasted = false;
												return "";
											} else {
												var selectionStart = text.selectionStart;
												var selectionEnd = text.selectionEnd;
												var extendLeft = lastSelectionStart;
												var extendRight = lastValue.length - lastSelectionEnd;
												var inserted = value;
												var restoreStart = value.length - selectionStart;
												var restoreEnd = value.length - selectionEnd;
												var i = 0;
												while (extendLeft > 0 && lastValue[i] == value[i]) {
													i++;
													extendLeft--;
												}
												inserted = inserted.slice(i);
												i = 1;
												while (extendRight > 0 && lastValue.length - i > lastSelectionStart - 1 && lastValue[lastValue.length - i] == value[value.length - i]) {
													i++;
													extendRight--;
												}
												restoreStart -= i - 1;
												restoreEnd -= i - 1;
												var endIndex = inserted.length - i + 1;
												if (endIndex < 0) {
													extendLeft = -endIndex;
													endIndex = 0;
												}
												inserted = inserted.slice(0, endIndex);
												if (!fromInput && !inserted && !restoreStart && !extendLeft && !extendRight && !restoreEnd) return "";
												sendingText = true;
												var shouldReset = false;
												if (useragent.isAndroid && inserted == ". ") {
													inserted = "  ";
													shouldReset = true;
												}
												if (inserted && !extendLeft && !extendRight && !restoreStart && !restoreEnd || commandMode) host.onTextInput(inserted);
												else host.onTextInput(inserted, {
													extendLeft,
													extendRight,
													restoreStart,
													restoreEnd
												});
												sendingText = false;
												lastValue = value;
												lastSelectionStart = selectionStart;
												lastSelectionEnd = selectionEnd;
												lastRestoreEnd = restoreEnd;
												return shouldReset ? "\n" : inserted;
											}
										};
										var onInput = function(e) {
											if (inComposition) return onCompositionUpdate();
											if (e && e.inputType) {
												if (e.inputType == "historyUndo") return host.execCommand("undo");
												if (e.inputType == "historyRedo") return host.execCommand("redo");
											}
											var data$1 = text.value;
											var inserted = sendText(data$1, true);
											if (data$1.length > MAX_LINE_LENGTH + 100 || valueResetRegex.test(inserted) || isMobile && lastSelectionStart < 1 && lastSelectionStart == lastSelectionEnd) resetSelection();
										};
										var handleClipboardData = function(e, data$1, forceIEMime) {
											var clipboardData = e.clipboardData || window.clipboardData;
											if (!clipboardData || BROKEN_SETDATA) return;
											var mime = USE_IE_MIME_TYPE || forceIEMime ? "Text" : "text/plain";
											try {
												if (data$1) return clipboardData.setData(mime, data$1) !== false;
												else return clipboardData.getData(mime);
											} catch (e2) {
												if (!forceIEMime) return handleClipboardData(e2, data$1, true);
											}
										};
										var doCopy = function(e, isCut) {
											var data$1 = host.getCopyText();
											if (!data$1) return event.preventDefault(e);
											if (handleClipboardData(e, data$1)) {
												if (isIOS) {
													resetSelection(data$1);
													copied = data$1;
													setTimeout(function() {
														copied = false;
													}, 10);
												}
												isCut ? host.onCut() : host.onCopy();
												event.preventDefault(e);
											} else {
												copied = true;
												text.value = data$1;
												text.select();
												setTimeout(function() {
													copied = false;
													resetSelection();
													isCut ? host.onCut() : host.onCopy();
												});
											}
										};
										var onCut = function(e) {
											doCopy(e, true);
										};
										var onCopy = function(e) {
											doCopy(e, false);
										};
										var onPaste = function(e) {
											var data$1 = handleClipboardData(e);
											if (clipboard.pasteCancelled()) return;
											if (typeof data$1 == "string") {
												if (data$1) host.onPaste(data$1, e);
												if (useragent.isIE) setTimeout(resetSelection);
												event.preventDefault(e);
											} else {
												text.value = "";
												pasted = true;
											}
										};
										event.addCommandKeyListener(text, host.onCommandKey.bind(host), host);
										event.addListener(text, "select", onSelect, host);
										event.addListener(text, "input", onInput, host);
										event.addListener(text, "cut", onCut, host);
										event.addListener(text, "copy", onCopy, host);
										event.addListener(text, "paste", onPaste, host);
										if (!("oncut" in text) || !("oncopy" in text) || !("onpaste" in text)) event.addListener(parentNode, "keydown", function(e) {
											if (useragent.isMac && !e.metaKey || !e.ctrlKey) return;
											switch (e.keyCode) {
												case 67:
													onCopy(e);
													break;
												case 86:
													onPaste(e);
													break;
												case 88:
													onCut(e);
													break;
											}
										}, host);
										var onCompositionStart = function(e) {
											if (inComposition || !host.onCompositionStart || host.$readOnly) return;
											inComposition = {};
											if (commandMode) return;
											if (e.data) inComposition.useTextareaForIME = false;
											setTimeout(onCompositionUpdate, 0);
											host._signal("compositionStart");
											host.on("mousedown", cancelComposition);
											var range = host.getSelectionRange();
											range.end.row = range.start.row;
											range.end.column = range.start.column;
											inComposition.markerRange = range;
											inComposition.selectionStart = lastSelectionStart;
											host.onCompositionStart(inComposition);
											if (inComposition.useTextareaForIME) {
												lastValue = text.value = "";
												lastSelectionStart = 0;
												lastSelectionEnd = 0;
											} else {
												if (text.msGetInputContext) inComposition.context = text.msGetInputContext();
												if (text.getInputContext) inComposition.context = text.getInputContext();
											}
										};
										var onCompositionUpdate = function() {
											if (!inComposition || !host.onCompositionUpdate || host.$readOnly) return;
											if (commandMode) return cancelComposition();
											if (inComposition.useTextareaForIME) host.onCompositionUpdate(text.value);
											else {
												var data$1 = text.value;
												sendText(data$1);
												if (inComposition.markerRange) {
													if (inComposition.context) inComposition.markerRange.start.column = inComposition.selectionStart = inComposition.context.compositionStartOffset;
													inComposition.markerRange.end.column = inComposition.markerRange.start.column + lastSelectionEnd - inComposition.selectionStart + lastRestoreEnd;
												}
											}
										};
										var onCompositionEnd = function(e) {
											if (!host.onCompositionEnd || host.$readOnly) return;
											inComposition = false;
											host.onCompositionEnd();
											host.off("mousedown", cancelComposition);
											if (e) onInput();
										};
										function cancelComposition() {
											ignoreFocusEvents = true;
											text.blur();
											text.focus();
											ignoreFocusEvents = false;
										}
										var syncComposition = lang.delayedCall(onCompositionUpdate, 50).schedule.bind(null, null);
										function onKeyup(e) {
											if (e.keyCode == 27 && text.value.length < text.selectionStart) {
												if (!inComposition) lastValue = text.value;
												lastSelectionStart = lastSelectionEnd = -1;
												resetSelection();
											}
											syncComposition();
										}
										event.addListener(text, "compositionstart", onCompositionStart, host);
										event.addListener(text, "compositionupdate", onCompositionUpdate, host);
										event.addListener(text, "keyup", onKeyup, host);
										event.addListener(text, "keydown", syncComposition, host);
										event.addListener(text, "compositionend", onCompositionEnd, host);
										this.getElement = function() {
											return text;
										};
										this.setCommandMode = function(value) {
											commandMode = value;
											text.readOnly = false;
										};
										this.setReadOnly = function(readOnly) {
											if (!commandMode) text.readOnly = readOnly;
										};
										this.setCopyWithEmptySelection = function(value) {};
										this.onContextMenu = function(e) {
											afterContextMenu = true;
											resetSelection();
											host._emit("nativecontextmenu", {
												target: host,
												domEvent: e
											});
											this.moveToMouse(e, true);
										};
										this.moveToMouse = function(e, bringToFront) {
											if (!tempStyle) tempStyle = text.style.cssText;
											text.style.cssText = (bringToFront ? "z-index:100000;" : "") + (useragent.isIE ? "opacity:0.1;" : "") + "text-indent: -" + (lastSelectionStart + lastSelectionEnd) * host.renderer.characterWidth * .5 + "px;";
											var rect = host.container.getBoundingClientRect();
											var style = dom$1.computedStyle(host.container);
											var top = rect.top + (parseInt(style.borderTopWidth) || 0);
											var left = rect.left + (parseInt(rect.borderLeftWidth) || 0);
											var maxTop = rect.bottom - top - text.clientHeight - 2;
											var move = function(e2) {
												dom$1.translate(text, e2.clientX - left - 2, Math.min(e2.clientY - top - 2, maxTop));
											};
											move(e);
											if (e.type != "mousedown") return;
											host.renderer.$isMousePressed = true;
											clearTimeout(closeTimeout);
											if (useragent.isWin) event.capture(host.container, move, onContextMenuClose);
										};
										this.onContextMenuClose = onContextMenuClose;
										var closeTimeout;
										function onContextMenuClose() {
											clearTimeout(closeTimeout);
											closeTimeout = setTimeout(function() {
												if (tempStyle) {
													text.style.cssText = tempStyle;
													tempStyle = "";
												}
												host.renderer.$isMousePressed = false;
												if (host.renderer.$keepTextAreaAtCursor) host.renderer.$moveTextAreaToCursor();
											}, 0);
										}
										var onContextMenu = function(e) {
											host.textInput.onContextMenu(e);
											onContextMenuClose();
										};
										event.addListener(text, "mouseup", onContextMenu, host);
										event.addListener(text, "mousedown", function(e) {
											e.preventDefault();
											onContextMenuClose();
										}, host);
										event.addListener(host.renderer.scroller, "contextmenu", onContextMenu, host);
										event.addListener(text, "contextmenu", onContextMenu, host);
										if (isIOS) addIosSelectionHandler(parentNode, host, text);
										function addIosSelectionHandler(parentNode2, host2, text2) {
											var typingResetTimeout = null;
											var typing = false;
											text2.addEventListener("keydown", function(e) {
												if (typingResetTimeout) clearTimeout(typingResetTimeout);
												typing = true;
											}, true);
											text2.addEventListener("keyup", function(e) {
												typingResetTimeout = setTimeout(function() {
													typing = false;
												}, 100);
											}, true);
											var detectArrowKeys = function(e) {
												if (document.activeElement !== text2) return;
												if (typing || inComposition || host2.$mouseHandler.isMousePressed) return;
												if (copied) return;
												var selectionStart = text2.selectionStart;
												var selectionEnd = text2.selectionEnd;
												var key = null;
												var modifier = 0;
												if (selectionStart == 0) key = KEYS.up;
												else if (selectionStart == 1) key = KEYS.home;
												else if (selectionEnd > lastSelectionEnd && lastValue[selectionEnd] == "\n") key = KEYS.end;
												else if (selectionStart < lastSelectionStart && lastValue[selectionStart - 1] == " ") {
													key = KEYS.left;
													modifier = MODS.option;
												} else if (selectionStart < lastSelectionStart || selectionStart == lastSelectionStart && lastSelectionEnd != lastSelectionStart && selectionStart == selectionEnd) key = KEYS.left;
												else if (selectionEnd > lastSelectionEnd && lastValue.slice(0, selectionEnd).split("\n").length > 2) key = KEYS.down;
												else if (selectionEnd > lastSelectionEnd && lastValue[selectionEnd - 1] == " ") {
													key = KEYS.right;
													modifier = MODS.option;
												} else if (selectionEnd > lastSelectionEnd || selectionEnd == lastSelectionEnd && lastSelectionEnd != lastSelectionStart && selectionStart == selectionEnd) key = KEYS.right;
												if (selectionStart !== selectionEnd) modifier |= MODS.shift;
												if (key) {
													if (!host2.onCommandKey({}, modifier, key) && host2.commands) {
														key = KEYS.keyCodeToString(key);
														var command = host2.commands.findKeyCommand(modifier, key);
														if (command) host2.execCommand(command);
													}
													lastSelectionStart = selectionStart;
													lastSelectionEnd = selectionEnd;
													resetSelection("");
												}
											};
											document.addEventListener("selectionchange", detectArrowKeys);
											host2.on("destroy", function() {
												document.removeEventListener("selectionchange", detectArrowKeys);
											});
										}
										this.destroy = function() {
											if (text.parentElement) text.parentElement.removeChild(text);
										};
									};
									exports2.k = TextInput;
								}),
								845: ((__unused_webpack_module, exports2, __webpack_require__2) => {
									"no use strict";
									var oop = __webpack_require__2(645);
									var EventEmitter = __webpack_require__2(366).b;
									var optionsProvider = {
										setOptions: function(optList) {
											Object.keys(optList).forEach(function(key) {
												this.setOption(key, optList[key]);
											}, this);
										},
										getOptions: function(optionNames) {
											var result = {};
											if (!optionNames) {
												var options = this.$options;
												optionNames = Object.keys(options).filter(function(key) {
													return !options[key].hidden;
												});
											} else if (!Array.isArray(optionNames)) {
												result = optionNames;
												optionNames = Object.keys(result);
											}
											optionNames.forEach(function(key) {
												result[key] = this.getOption(key);
											}, this);
											return result;
										},
										setOption: function(name$1, value) {
											if (this["$" + name$1] === value) return;
											var opt = this.$options[name$1];
											if (!opt) return warn("misspelled option \"" + name$1 + "\"");
											if (opt.forwardTo) return this[opt.forwardTo] && this[opt.forwardTo].setOption(name$1, value);
											if (!opt.handlesSet) this["$" + name$1] = value;
											if (opt && opt.set) opt.set.call(this, value);
										},
										getOption: function(name$1) {
											var opt = this.$options[name$1];
											if (!opt) return warn("misspelled option \"" + name$1 + "\"");
											if (opt.forwardTo) return this[opt.forwardTo] && this[opt.forwardTo].getOption(name$1);
											return opt && opt.get ? opt.get.call(this) : this["$" + name$1];
										}
									};
									function warn(message) {
										if (typeof console != "undefined" && console.warn) console.warn.apply(console, arguments);
									}
									function reportError(msg, data$1) {
										var e = new Error(msg);
										e.data = data$1;
										if (typeof console == "object" && console.error) console.error(e);
										setTimeout(function() {
											throw e;
										});
									}
									var AppConfig = function() {
										this.$defaultOptions = {};
									};
									(function() {
										oop.implement(this, EventEmitter);
										this.defineOptions = function(obj, path, options) {
											if (!obj.$options) this.$defaultOptions[path] = obj.$options = {};
											Object.keys(options).forEach(function(key) {
												var opt = options[key];
												if (typeof opt == "string") opt = { forwardTo: opt };
												opt.name || (opt.name = key);
												obj.$options[opt.name] = opt;
												if ("initialValue" in opt) obj["$" + opt.name] = opt.initialValue;
											});
											oop.implement(obj, optionsProvider);
											return this;
										};
										this.resetOptions = function(obj) {
											Object.keys(obj.$options).forEach(function(key) {
												var opt = obj.$options[key];
												if ("value" in opt) obj.setOption(key, opt.value);
											});
										};
										this.setDefaultValue = function(path, name$1, value) {
											if (!path) {
												for (path in this.$defaultOptions) if (this.$defaultOptions[path][name$1]) break;
												if (!this.$defaultOptions[path][name$1]) return false;
											}
											var opts = this.$defaultOptions[path] || (this.$defaultOptions[path] = {});
											if (opts[name$1]) if (opts.forwardTo) this.setDefaultValue(opts.forwardTo, name$1, value);
											else opts[name$1].value = value;
										};
										this.setDefaultValues = function(path, optionHash) {
											Object.keys(optionHash).forEach(function(key) {
												this.setDefaultValue(path, key, optionHash[key]);
											}, this);
										};
										this.warn = warn;
										this.reportError = reportError;
									}).call(AppConfig.prototype);
									exports2.o = AppConfig;
								}),
								435: ((__unused_webpack_module, exports2, __webpack_require__2) => {
									"use strict";
									var useragent = __webpack_require__2(943);
									var XHTML_NS = "http://www.w3.org/1999/xhtml";
									exports2.buildDom = function buildDom(arr, parent, refs) {
										if (typeof arr == "string" && arr) {
											var txt = document.createTextNode(arr);
											if (parent) parent.appendChild(txt);
											return txt;
										}
										if (!Array.isArray(arr)) {
											if (arr && arr.appendChild && parent) parent.appendChild(arr);
											return arr;
										}
										if (typeof arr[0] != "string" || !arr[0]) {
											var els = [];
											for (var i = 0; i < arr.length; i++) {
												var ch = buildDom(arr[i], parent, refs);
												ch && els.push(ch);
											}
											return els;
										}
										var el = document.createElement(arr[0]);
										var options = arr[1];
										var childIndex = 1;
										if (options && typeof options == "object" && !Array.isArray(options)) childIndex = 2;
										for (var i = childIndex; i < arr.length; i++) buildDom(arr[i], el, refs);
										if (childIndex == 2) Object.keys(options).forEach(function(n) {
											var val = options[n];
											if (n === "class") el.className = Array.isArray(val) ? val.join(" ") : val;
											else if (typeof val == "function" || n == "value" || n[0] == "$") el[n] = val;
											else if (n === "ref") {
												if (refs) refs[val] = el;
											} else if (n === "style") {
												if (typeof val == "string") el.style.cssText = val;
											} else if (val != null) el.setAttribute(n, val);
										});
										if (parent) parent.appendChild(el);
										return el;
									};
									exports2.getDocumentHead = function(doc) {
										if (!doc) doc = document;
										return doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
									};
									exports2.createElement = function(tag, ns) {
										return document.createElementNS ? document.createElementNS(ns || XHTML_NS, tag) : document.createElement(tag);
									};
									exports2.removeChildren = function(element) {
										element.innerHTML = "";
									};
									exports2.createTextNode = function(textContent, element) {
										return (element ? element.ownerDocument : document).createTextNode(textContent);
									};
									exports2.createFragment = function(element) {
										return (element ? element.ownerDocument : document).createDocumentFragment();
									};
									exports2.hasCssClass = function(el, name$1) {
										return (el.className + "").split(/\s+/g).indexOf(name$1) !== -1;
									};
									exports2.addCssClass = function(el, name$1) {
										if (!exports2.hasCssClass(el, name$1)) el.className += " " + name$1;
									};
									exports2.removeCssClass = function(el, name$1) {
										var classes = el.className.split(/\s+/g);
										while (true) {
											var index = classes.indexOf(name$1);
											if (index == -1) break;
											classes.splice(index, 1);
										}
										el.className = classes.join(" ");
									};
									exports2.toggleCssClass = function(el, name$1) {
										var classes = el.className.split(/\s+/g), add = true;
										while (true) {
											var index = classes.indexOf(name$1);
											if (index == -1) break;
											add = false;
											classes.splice(index, 1);
										}
										if (add) classes.push(name$1);
										el.className = classes.join(" ");
										return add;
									};
									exports2.setCssClass = function(node, className, include) {
										if (include) exports2.addCssClass(node, className);
										else exports2.removeCssClass(node, className);
									};
									exports2.hasCssString = function(id, doc) {
										var index = 0, sheets;
										doc = doc || document;
										if (sheets = doc.querySelectorAll("style")) {
											while (index < sheets.length) if (sheets[index++].id === id) return true;
										}
									};
									exports2.removeElementById = function(id, doc) {
										doc = doc || document;
										if (doc.getElementById(id)) doc.getElementById(id).remove();
									};
									var strictCSP;
									var cssCache = [];
									exports2.useStrictCSP = function(value) {
										strictCSP = value;
										if (value == false) insertPendingStyles();
										else if (!cssCache) cssCache = [];
									};
									function insertPendingStyles() {
										var cache = cssCache;
										cssCache = null;
										cache && cache.forEach(function(item) {
											importCssString(item[0], item[1]);
										});
									}
									function importCssString(cssText, id, target) {
										if (typeof document == "undefined") return;
										if (cssCache) {
											if (target) insertPendingStyles();
											else if (target === false) return cssCache.push([cssText, id]);
										}
										if (strictCSP) return;
										var container = target;
										if (!target || !target.getRootNode) container = document;
										else {
											container = target.getRootNode();
											if (!container || container == target) container = document;
										}
										var doc = container.ownerDocument || container;
										if (id && exports2.hasCssString(id, container)) return null;
										if (id) cssText += "\n/*# sourceURL=ace/css/" + id + " */";
										var style = exports2.createElement("style");
										style.appendChild(doc.createTextNode(cssText));
										if (id) style.id = id;
										if (container == doc) container = exports2.getDocumentHead(doc);
										container.insertBefore(style, container.firstChild);
									}
									exports2.importCssString = importCssString;
									exports2.importCssStylsheet = function(uri, doc) {
										exports2.buildDom(["link", {
											rel: "stylesheet",
											href: uri
										}], exports2.getDocumentHead(doc));
									};
									exports2.scrollbarWidth = function(doc) {
										var inner = exports2.createElement("ace_inner");
										inner.style.width = "100%";
										inner.style.minWidth = "0px";
										inner.style.height = "200px";
										inner.style.display = "block";
										var outer = exports2.createElement("ace_outer");
										var style = outer.style;
										style.position = "absolute";
										style.left = "-10000px";
										style.overflow = "hidden";
										style.width = "200px";
										style.minWidth = "0px";
										style.height = "150px";
										style.display = "block";
										outer.appendChild(inner);
										var body = doc && doc.documentElement || document && document.documentElement;
										if (!body) return 0;
										body.appendChild(outer);
										var noScrollbar = inner.offsetWidth;
										style.overflow = "scroll";
										var withScrollbar = inner.offsetWidth;
										if (noScrollbar === withScrollbar) withScrollbar = outer.clientWidth;
										body.removeChild(outer);
										return noScrollbar - withScrollbar;
									};
									exports2.computedStyle = function(element, style) {
										return window.getComputedStyle(element, "") || {};
									};
									exports2.setStyle = function(styles, property, value) {
										if (styles[property] !== value) styles[property] = value;
									};
									exports2.HAS_CSS_ANIMATION = false;
									exports2.HAS_CSS_TRANSFORMS = false;
									exports2.HI_DPI = useragent.isWin ? typeof window !== "undefined" && window.devicePixelRatio >= 1.5 : true;
									if (useragent.isChromeOS) exports2.HI_DPI = false;
									if (typeof document !== "undefined") {
										var div = document.createElement("div");
										if (exports2.HI_DPI && div.style.transform !== void 0) exports2.HAS_CSS_TRANSFORMS = true;
										if (!useragent.isEdge && typeof div.style.animationName !== "undefined") exports2.HAS_CSS_ANIMATION = true;
										div = null;
									}
									if (exports2.HAS_CSS_TRANSFORMS) exports2.translate = function(element, tx, ty) {
										element.style.transform = "translate(" + Math.round(tx) + "px, " + Math.round(ty) + "px)";
									};
									else exports2.translate = function(element, tx, ty) {
										element.style.top = Math.round(ty) + "px";
										element.style.left = Math.round(tx) + "px";
									};
								}),
								631: ((__unused_webpack_module, exports2, __webpack_require__2) => {
									"use strict";
									var keys = __webpack_require__2(451);
									var useragent = __webpack_require__2(943);
									var pressedKeys = null;
									var ts = 0;
									var activeListenerOptions;
									function detectListenerOptionsSupport() {
										activeListenerOptions = false;
										try {
											document.createComment("").addEventListener("test", function() {}, { get passive() {
												activeListenerOptions = { passive: false };
											} });
										} catch (e) {}
									}
									function getListenerOptions() {
										if (activeListenerOptions == void 0) detectListenerOptionsSupport();
										return activeListenerOptions;
									}
									function EventListener(elem, type, callback) {
										this.elem = elem;
										this.type = type;
										this.callback = callback;
									}
									EventListener.prototype.destroy = function() {
										removeListener(this.elem, this.type, this.callback);
										this.elem = this.type = this.callback = void 0;
									};
									var addListener = exports2.addListener = function(elem, type, callback, destroyer) {
										elem.addEventListener(type, callback, getListenerOptions());
										if (destroyer) destroyer.$toDestroy.push(new EventListener(elem, type, callback));
									};
									var removeListener = exports2.removeListener = function(elem, type, callback) {
										elem.removeEventListener(type, callback, getListenerOptions());
									};
									exports2.stopEvent = function(e) {
										exports2.stopPropagation(e);
										exports2.preventDefault(e);
										return false;
									};
									exports2.stopPropagation = function(e) {
										if (e.stopPropagation) e.stopPropagation();
									};
									exports2.preventDefault = function(e) {
										if (e.preventDefault) e.preventDefault();
									};
									exports2.getButton = function(e) {
										if (e.type == "dblclick") return 0;
										if (e.type == "contextmenu" || useragent.isMac && e.ctrlKey && !e.altKey && !e.shiftKey) return 2;
										return e.button;
									};
									exports2.capture = function(el, eventHandler, releaseCaptureHandler) {
										var ownerDocument = el && el.ownerDocument || document;
										function onMouseUp(e) {
											eventHandler && eventHandler(e);
											releaseCaptureHandler && releaseCaptureHandler(e);
											removeListener(ownerDocument, "mousemove", eventHandler);
											removeListener(ownerDocument, "mouseup", onMouseUp);
											removeListener(ownerDocument, "dragstart", onMouseUp);
										}
										addListener(ownerDocument, "mousemove", eventHandler);
										addListener(ownerDocument, "mouseup", onMouseUp);
										addListener(ownerDocument, "dragstart", onMouseUp);
										return onMouseUp;
									};
									exports2.addMouseWheelListener = function(el, callback, destroyer) {
										addListener(el, "wheel", function(e) {
											var factor = .15;
											var deltaX = e.deltaX || 0;
											var deltaY = e.deltaY || 0;
											switch (e.deltaMode) {
												case e.DOM_DELTA_PIXEL:
													e.wheelX = deltaX * factor;
													e.wheelY = deltaY * factor;
													break;
												case e.DOM_DELTA_LINE:
													var linePixels = 15;
													e.wheelX = deltaX * linePixels;
													e.wheelY = deltaY * linePixels;
													break;
												case e.DOM_DELTA_PAGE:
													var pagePixels = 150;
													e.wheelX = deltaX * pagePixels;
													e.wheelY = deltaY * pagePixels;
													break;
											}
											callback(e);
										}, destroyer);
									};
									exports2.addMultiMouseDownListener = function(elements, timeouts, eventHandler, callbackName, destroyer) {
										var clicks = 0;
										var startX, startY, timer;
										var eventNames = {
											2: "dblclick",
											3: "tripleclick",
											4: "quadclick"
										};
										function onMousedown(e) {
											if (exports2.getButton(e) !== 0) clicks = 0;
											else if (e.detail > 1) {
												clicks++;
												if (clicks > 4) clicks = 1;
											} else clicks = 1;
											if (useragent.isIE) {
												var isNewClick = Math.abs(e.clientX - startX) > 5 || Math.abs(e.clientY - startY) > 5;
												if (!timer || isNewClick) clicks = 1;
												if (timer) clearTimeout(timer);
												timer = setTimeout(function() {
													timer = null;
												}, timeouts[clicks - 1] || 600);
												if (clicks == 1) {
													startX = e.clientX;
													startY = e.clientY;
												}
											}
											e._clicks = clicks;
											eventHandler[callbackName]("mousedown", e);
											if (clicks > 4) clicks = 0;
											else if (clicks > 1) return eventHandler[callbackName](eventNames[clicks], e);
										}
										if (!Array.isArray(elements)) elements = [elements];
										elements.forEach(function(el) {
											addListener(el, "mousedown", onMousedown, destroyer);
										});
									};
									var getModifierHash = function(e) {
										return 0 | (e.ctrlKey ? 1 : 0) | (e.altKey ? 2 : 0) | (e.shiftKey ? 4 : 0) | (e.metaKey ? 8 : 0);
									};
									exports2.getModifierString = function(e) {
										return keys.KEY_MODS[getModifierHash(e)];
									};
									function normalizeCommandKeys(callback, e, keyCode) {
										var hashId = getModifierHash(e);
										if (!useragent.isMac && pressedKeys) {
											if (e.getModifierState && (e.getModifierState("OS") || e.getModifierState("Win"))) hashId |= 8;
											if (pressedKeys.altGr) if ((3 & hashId) != 3) pressedKeys.altGr = 0;
											else return;
											if (keyCode === 18 || keyCode === 17) {
												var location = "location" in e ? e.location : e.keyLocation;
												if (keyCode === 17 && location === 1) {
													if (pressedKeys[keyCode] == 1) ts = e.timeStamp;
												} else if (keyCode === 18 && hashId === 3 && location === 2) {
													if (e.timeStamp - ts < 50) pressedKeys.altGr = true;
												}
											}
										}
										if (keyCode in keys.MODIFIER_KEYS) keyCode = -1;
										if (!hashId && keyCode === 13) {
											var location = "location" in e ? e.location : e.keyLocation;
											if (location === 3) {
												callback(e, hashId, -keyCode);
												if (e.defaultPrevented) return;
											}
										}
										if (useragent.isChromeOS && hashId & 8) {
											callback(e, hashId, keyCode);
											if (e.defaultPrevented) return;
											else hashId &= -9;
										}
										if (!hashId && !(keyCode in keys.FUNCTION_KEYS) && !(keyCode in keys.PRINTABLE_KEYS)) return false;
										return callback(e, hashId, keyCode);
									}
									exports2.addCommandKeyListener = function(el, callback, destroyer) {
										if (useragent.isOldGecko || useragent.isOpera && !("KeyboardEvent" in window)) {
											var lastKeyDownKeyCode = null;
											addListener(el, "keydown", function(e) {
												lastKeyDownKeyCode = e.keyCode;
											}, destroyer);
											addListener(el, "keypress", function(e) {
												return normalizeCommandKeys(callback, e, lastKeyDownKeyCode);
											}, destroyer);
										} else {
											var lastDefaultPrevented = null;
											addListener(el, "keydown", function(e) {
												pressedKeys[e.keyCode] = (pressedKeys[e.keyCode] || 0) + 1;
												var result = normalizeCommandKeys(callback, e, e.keyCode);
												lastDefaultPrevented = e.defaultPrevented;
												return result;
											}, destroyer);
											addListener(el, "keypress", function(e) {
												if (lastDefaultPrevented && (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey)) {
													exports2.stopEvent(e);
													lastDefaultPrevented = null;
												}
											}, destroyer);
											addListener(el, "keyup", function(e) {
												pressedKeys[e.keyCode] = null;
											}, destroyer);
											if (!pressedKeys) {
												resetPressedKeys();
												addListener(window, "focus", resetPressedKeys);
											}
										}
									};
									function resetPressedKeys() {
										pressedKeys = /* @__PURE__ */ Object.create(null);
									}
									if (typeof window == "object" && window.postMessage && !useragent.isOldIE) {
										var postMessageId = 1;
										exports2.nextTick = function(callback, win) {
											win = win || window;
											var messageName = "zero-timeout-message-" + postMessageId++;
											var listener = function(e) {
												if (e.data == messageName) {
													exports2.stopPropagation(e);
													removeListener(win, "message", listener);
													callback();
												}
											};
											addListener(win, "message", listener);
											win.postMessage(messageName, "*");
										};
									}
									exports2.$idleBlocked = false;
									exports2.onIdle = function(cb, timeout) {
										return setTimeout(function handler() {
											if (!exports2.$idleBlocked) cb();
											else setTimeout(handler, 100);
										}, timeout);
									};
									exports2.$idleBlockId = null;
									exports2.blockIdle = function(delay) {
										if (exports2.$idleBlockId) clearTimeout(exports2.$idleBlockId);
										exports2.$idleBlocked = true;
										exports2.$idleBlockId = setTimeout(function() {
											exports2.$idleBlocked = false;
										}, delay || 100);
									};
									exports2.nextFrame = typeof window == "object" && (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame);
									if (exports2.nextFrame) exports2.nextFrame = exports2.nextFrame.bind(window);
									else exports2.nextFrame = function(callback) {
										setTimeout(callback, 17);
									};
								}),
								366: ((__unused_webpack_module, exports2) => {
									"use strict";
									var EventEmitter = {};
									var stopPropagation = function() {
										this.propagationStopped = true;
									};
									var preventDefault = function() {
										this.defaultPrevented = true;
									};
									EventEmitter._emit = EventEmitter._dispatchEvent = function(eventName, e) {
										this._eventRegistry || (this._eventRegistry = {});
										this._defaultHandlers || (this._defaultHandlers = {});
										var listeners = this._eventRegistry[eventName] || [];
										var defaultHandler = this._defaultHandlers[eventName];
										if (!listeners.length && !defaultHandler) return;
										if (typeof e != "object" || !e) e = {};
										if (!e.type) e.type = eventName;
										if (!e.stopPropagation) e.stopPropagation = stopPropagation;
										if (!e.preventDefault) e.preventDefault = preventDefault;
										listeners = listeners.slice();
										for (var i = 0; i < listeners.length; i++) {
											listeners[i](e, this);
											if (e.propagationStopped) break;
										}
										if (defaultHandler && !e.defaultPrevented) return defaultHandler(e, this);
									};
									EventEmitter._signal = function(eventName, e) {
										var listeners = (this._eventRegistry || {})[eventName];
										if (!listeners) return;
										listeners = listeners.slice();
										for (var i = 0; i < listeners.length; i++) listeners[i](e, this);
									};
									EventEmitter.once = function(eventName, callback) {
										var _self = this;
										this.on(eventName, function newCallback() {
											_self.off(eventName, newCallback);
											callback.apply(null, arguments);
										});
										if (!callback) return new Promise(function(resolve) {
											callback = resolve;
										});
									};
									EventEmitter.setDefaultHandler = function(eventName, callback) {
										var handlers = this._defaultHandlers;
										if (!handlers) handlers = this._defaultHandlers = { _disabled_: {} };
										if (handlers[eventName]) {
											var old = handlers[eventName];
											var disabled = handlers._disabled_[eventName];
											if (!disabled) handlers._disabled_[eventName] = disabled = [];
											disabled.push(old);
											var i = disabled.indexOf(callback);
											if (i != -1) disabled.splice(i, 1);
										}
										handlers[eventName] = callback;
									};
									EventEmitter.removeDefaultHandler = function(eventName, callback) {
										var handlers = this._defaultHandlers;
										if (!handlers) return;
										var disabled = handlers._disabled_[eventName];
										if (handlers[eventName] == callback) {
											if (disabled) this.setDefaultHandler(eventName, disabled.pop());
										} else if (disabled) {
											var i = disabled.indexOf(callback);
											if (i != -1) disabled.splice(i, 1);
										}
									};
									EventEmitter.on = EventEmitter.addEventListener = function(eventName, callback, capturing) {
										this._eventRegistry = this._eventRegistry || {};
										var listeners = this._eventRegistry[eventName];
										if (!listeners) listeners = this._eventRegistry[eventName] = [];
										if (listeners.indexOf(callback) == -1) listeners[capturing ? "unshift" : "push"](callback);
										return callback;
									};
									EventEmitter.off = EventEmitter.removeListener = EventEmitter.removeEventListener = function(eventName, callback) {
										this._eventRegistry = this._eventRegistry || {};
										var listeners = this._eventRegistry[eventName];
										if (!listeners) return;
										var index = listeners.indexOf(callback);
										if (index !== -1) listeners.splice(index, 1);
									};
									EventEmitter.removeAllListeners = function(eventName) {
										if (!eventName) this._eventRegistry = this._defaultHandlers = void 0;
										if (this._eventRegistry) this._eventRegistry[eventName] = void 0;
										if (this._defaultHandlers) this._defaultHandlers[eventName] = void 0;
									};
									exports2.b = EventEmitter;
								}),
								451: ((__unused_webpack_module, exports2, __webpack_require__2) => {
									"use strict";
									var oop = __webpack_require__2(645);
									var Keys = function() {
										var ret = {
											MODIFIER_KEYS: {
												16: "Shift",
												17: "Ctrl",
												18: "Alt",
												224: "Meta",
												91: "MetaLeft",
												92: "MetaRight",
												93: "ContextMenu"
											},
											KEY_MODS: {
												"ctrl": 1,
												"alt": 2,
												"option": 2,
												"shift": 4,
												"super": 8,
												"meta": 8,
												"command": 8,
												"cmd": 8,
												"control": 1
											},
											FUNCTION_KEYS: {
												8: "Backspace",
												9: "Tab",
												13: "Return",
												19: "Pause",
												27: "Esc",
												32: "Space",
												33: "PageUp",
												34: "PageDown",
												35: "End",
												36: "Home",
												37: "Left",
												38: "Up",
												39: "Right",
												40: "Down",
												44: "Print",
												45: "Insert",
												46: "Delete",
												96: "Numpad0",
												97: "Numpad1",
												98: "Numpad2",
												99: "Numpad3",
												100: "Numpad4",
												101: "Numpad5",
												102: "Numpad6",
												103: "Numpad7",
												104: "Numpad8",
												105: "Numpad9",
												"-13": "NumpadEnter",
												112: "F1",
												113: "F2",
												114: "F3",
												115: "F4",
												116: "F5",
												117: "F6",
												118: "F7",
												119: "F8",
												120: "F9",
												121: "F10",
												122: "F11",
												123: "F12",
												144: "Numlock",
												145: "Scrolllock"
											},
											PRINTABLE_KEYS: {
												32: " ",
												48: "0",
												49: "1",
												50: "2",
												51: "3",
												52: "4",
												53: "5",
												54: "6",
												55: "7",
												56: "8",
												57: "9",
												59: ";",
												61: "=",
												65: "a",
												66: "b",
												67: "c",
												68: "d",
												69: "e",
												70: "f",
												71: "g",
												72: "h",
												73: "i",
												74: "j",
												75: "k",
												76: "l",
												77: "m",
												78: "n",
												79: "o",
												80: "p",
												81: "q",
												82: "r",
												83: "s",
												84: "t",
												85: "u",
												86: "v",
												87: "w",
												88: "x",
												89: "y",
												90: "z",
												107: "+",
												109: "-",
												110: ".",
												186: ";",
												187: "=",
												188: ",",
												189: "-",
												190: ".",
												191: "/",
												192: "`",
												219: "[",
												220: "\\",
												221: "]",
												222: "'",
												111: "/",
												106: "*"
											}
										};
										ret.PRINTABLE_KEYS[173] = "-";
										var name$1, i;
										for (i in ret.FUNCTION_KEYS) {
											name$1 = ret.FUNCTION_KEYS[i].toLowerCase();
											ret[name$1] = parseInt(i, 10);
										}
										for (i in ret.PRINTABLE_KEYS) {
											name$1 = ret.PRINTABLE_KEYS[i].toLowerCase();
											ret[name$1] = parseInt(i, 10);
										}
										oop.mixin(ret, ret.MODIFIER_KEYS);
										oop.mixin(ret, ret.PRINTABLE_KEYS);
										oop.mixin(ret, ret.FUNCTION_KEYS);
										ret.enter = ret["return"];
										ret.escape = ret.esc;
										ret.del = ret["delete"];
										(function() {
											var mods = [
												"cmd",
												"ctrl",
												"alt",
												"shift"
											];
											for (var i2 = Math.pow(2, mods.length); i2--;) ret.KEY_MODS[i2] = mods.filter(function(x) {
												return i2 & ret.KEY_MODS[x];
											}).join("-") + "-";
										})();
										ret.KEY_MODS[0] = "";
										ret.KEY_MODS[-1] = "input-";
										return ret;
									}();
									oop.mixin(exports2, Keys);
									exports2.keyCodeToString = function(keyCode) {
										var keyString = Keys[keyCode];
										if (typeof keyString != "string") keyString = String.fromCharCode(keyCode);
										return keyString.toLowerCase();
									};
								}),
								955: ((__unused_webpack_module, exports2) => {
									"use strict";
									exports2.last = function(a) {
										return a[a.length - 1];
									};
									exports2.stringReverse = function(string) {
										return string.split("").reverse().join("");
									};
									exports2.stringRepeat = function(string, count) {
										var result = "";
										while (count > 0) {
											if (count & 1) result += string;
											if (count >>= 1) string += string;
										}
										return result;
									};
									var trimBeginRegexp = /^\s\s*/;
									var trimEndRegexp = /\s\s*$/;
									exports2.stringTrimLeft = function(string) {
										return string.replace(trimBeginRegexp, "");
									};
									exports2.stringTrimRight = function(string) {
										return string.replace(trimEndRegexp, "");
									};
									exports2.copyObject = function(obj) {
										var copy = {};
										for (var key in obj) copy[key] = obj[key];
										return copy;
									};
									exports2.copyArray = function(array) {
										var copy = [];
										for (var i = 0, l = array.length; i < l; i++) if (array[i] && typeof array[i] == "object") copy[i] = this.copyObject(array[i]);
										else copy[i] = array[i];
										return copy;
									};
									exports2.deepCopy = function deepCopy(obj) {
										if (typeof obj !== "object" || !obj) return obj;
										var copy;
										if (Array.isArray(obj)) {
											copy = [];
											for (var key = 0; key < obj.length; key++) copy[key] = deepCopy(obj[key]);
											return copy;
										}
										if (Object.prototype.toString.call(obj) !== "[object Object]") return obj;
										copy = {};
										for (var key in obj) copy[key] = deepCopy(obj[key]);
										return copy;
									};
									exports2.arrayToMap = function(arr) {
										var map = {};
										for (var i = 0; i < arr.length; i++) map[arr[i]] = 1;
										return map;
									};
									exports2.createMap = function(props) {
										var map = /* @__PURE__ */ Object.create(null);
										for (var i in props) map[i] = props[i];
										return map;
									};
									exports2.arrayRemove = function(array, value) {
										for (var i = 0; i <= array.length; i++) if (value === array[i]) array.splice(i, 1);
									};
									exports2.escapeRegExp = function(str) {
										return str.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1");
									};
									exports2.escapeHTML = function(str) {
										return ("" + str).replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;");
									};
									exports2.getMatchOffsets = function(string, regExp) {
										var matches = [];
										string.replace(regExp, function(str) {
											matches.push({
												offset: arguments[arguments.length - 2],
												length: str.length
											});
										});
										return matches;
									};
									exports2.deferredCall = function(fcn) {
										var timer = null;
										var callback = function() {
											timer = null;
											fcn();
										};
										var deferred = function(timeout) {
											deferred.cancel();
											timer = setTimeout(callback, timeout || 0);
											return deferred;
										};
										deferred.schedule = deferred;
										deferred.call = function() {
											this.cancel();
											fcn();
											return deferred;
										};
										deferred.cancel = function() {
											clearTimeout(timer);
											timer = null;
											return deferred;
										};
										deferred.isPending = function() {
											return timer;
										};
										return deferred;
									};
									exports2.delayedCall = function(fcn, defaultTimeout) {
										var timer = null;
										var callback = function() {
											timer = null;
											fcn();
										};
										var _self = function(timeout) {
											if (timer == null) timer = setTimeout(callback, timeout || defaultTimeout);
										};
										_self.delay = function(timeout) {
											timer && clearTimeout(timer);
											timer = setTimeout(callback, timeout || defaultTimeout);
										};
										_self.schedule = _self;
										_self.call = function() {
											this.cancel();
											fcn();
										};
										_self.cancel = function() {
											timer && clearTimeout(timer);
											timer = null;
										};
										_self.isPending = function() {
											return timer;
										};
										return _self;
									};
								}),
								552: ((__unused_webpack_module, exports2, __webpack_require__2) => {
									"use strict";
									var dom$1 = __webpack_require__2(435);
									exports2.get = function(url, callback) {
										var xhr = new XMLHttpRequest();
										xhr.open("GET", url, true);
										xhr.onreadystatechange = function() {
											if (xhr.readyState === 4) callback(xhr.responseText);
										};
										xhr.send(null);
									};
									exports2.loadScript = function(path, callback) {
										var head = dom$1.getDocumentHead();
										var s = document.createElement("script");
										s.src = path;
										head.appendChild(s);
										s.onload = s.onreadystatechange = function(_, isAbort) {
											if (isAbort || !s.readyState || s.readyState == "loaded" || s.readyState == "complete") {
												s = s.onload = s.onreadystatechange = null;
												if (!isAbort) callback();
											}
										};
									};
									exports2.qualifyURL = function(url) {
										var a = document.createElement("a");
										a.href = url;
										return a.href;
									};
								}),
								645: ((__unused_webpack_module, exports2) => {
									"use strict";
									exports2.inherits = function(ctor, superCtor) {
										ctor.super_ = superCtor;
										ctor.prototype = Object.create(superCtor.prototype, { constructor: {
											value: ctor,
											enumerable: false,
											writable: true,
											configurable: true
										} });
									};
									exports2.mixin = function(obj, mixin) {
										for (var key in mixin) obj[key] = mixin[key];
										return obj;
									};
									exports2.implement = function(proto, mixin) {
										exports2.mixin(proto, mixin);
									};
								}),
								943: ((__unused_webpack_module, exports2) => {
									"use strict";
									exports2.OS = {
										LINUX: "LINUX",
										MAC: "MAC",
										WINDOWS: "WINDOWS"
									};
									exports2.getOS = function() {
										if (exports2.isMac) return exports2.OS.MAC;
										else if (exports2.isLinux) return exports2.OS.LINUX;
										else return exports2.OS.WINDOWS;
									};
									var _navigator = typeof navigator == "object" ? navigator : {};
									var os = (/mac|win|linux/i.exec(_navigator.platform) || ["other"])[0].toLowerCase();
									var ua = _navigator.userAgent || "";
									var appName = _navigator.appName || "";
									exports2.isWin = os == "win";
									exports2.isMac = os == "mac";
									exports2.isLinux = os == "linux";
									exports2.isIE = appName == "Microsoft Internet Explorer" || appName.indexOf("MSAppHost") >= 0 ? parseFloat((ua.match(/(?:MSIE |Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]) : parseFloat((ua.match(/(?:Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]);
									exports2.isOldIE = exports2.isIE && exports2.isIE < 9;
									exports2.isGecko = exports2.isMozilla = ua.match(/ Gecko\/\d+/);
									exports2.isOpera = typeof opera == "object" && Object.prototype.toString.call(window.opera) == "[object Opera]";
									exports2.isWebKit = parseFloat(ua.split("WebKit/")[1]) || void 0;
									exports2.isChrome = parseFloat(ua.split(" Chrome/")[1]) || void 0;
									exports2.isEdge = parseFloat(ua.split(" Edge/")[1]) || void 0;
									exports2.isAIR = ua.indexOf("AdobeAIR") >= 0;
									exports2.isAndroid = ua.indexOf("Android") >= 0;
									exports2.isChromeOS = ua.indexOf(" CrOS ") >= 0;
									exports2.isIOS = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
									if (exports2.isIOS) exports2.isMac = true;
									exports2.isMobile = exports2.isIOS || exports2.isAndroid;
								}),
								481: ((__unused_webpack_module, exports2, __webpack_require__2) => {
									"use strict";
									var event = __webpack_require__2(631);
									var RenderLoop = function(onRender, win) {
										this.onRender = onRender;
										this.pending = false;
										this.changes = 0;
										this.$recursionLimit = 2;
										this.window = win || window;
										var _self = this;
										this._flush = function(ts) {
											_self.pending = false;
											var changes = _self.changes;
											if (changes) {
												event.blockIdle(100);
												_self.changes = 0;
												_self.onRender(changes);
											}
											if (_self.changes) {
												if (_self.$recursionLimit-- < 0) return;
												_self.schedule();
											} else _self.$recursionLimit = 2;
										};
									};
									(function() {
										this.schedule = function(change) {
											this.changes = this.changes | change;
											if (this.changes && !this.pending) {
												event.nextFrame(this._flush);
												this.pending = true;
											}
										};
										this.clear = function(change) {
											var changes = this.changes;
											this.changes = 0;
											return changes;
										};
									}).call(RenderLoop.prototype);
									exports2.x = RenderLoop;
								}),
								745: ((__unused_webpack_module, exports2, __webpack_require__2) => {
									"use strict";
									var oop = __webpack_require__2(645);
									var dom$1 = __webpack_require__2(435);
									var event = __webpack_require__2(631);
									var EventEmitter = __webpack_require__2(366).b;
									var MAX_SCROLL_H = 32768;
									var ScrollBar = function(parent) {
										this.element = dom$1.createElement("div");
										this.element.className = "ace_scrollbar ace_scrollbar" + this.classSuffix;
										this.inner = dom$1.createElement("div");
										this.inner.className = "ace_scrollbar-inner";
										this.inner.textContent = "\xA0";
										this.element.appendChild(this.inner);
										parent.appendChild(this.element);
										this.setVisible(false);
										this.skipEvent = false;
										event.addListener(this.element, "scroll", this.onScroll.bind(this));
										event.addListener(this.element, "mousedown", event.preventDefault);
									};
									(function() {
										oop.implement(this, EventEmitter);
										this.setVisible = function(isVisible) {
											this.element.style.display = isVisible ? "" : "none";
											this.isVisible = isVisible;
											this.coeff = 1;
										};
									}).call(ScrollBar.prototype);
									var VScrollBar = function(parent, renderer) {
										ScrollBar.call(this, parent);
										this.scrollTop = 0;
										this.scrollHeight = 0;
										renderer.$scrollbarWidth = this.width = dom$1.scrollbarWidth(parent.ownerDocument);
										this.inner.style.width = this.element.style.width = (this.width || 15) + 5 + "px";
										this.$minWidth = 0;
									};
									oop.inherits(VScrollBar, ScrollBar);
									(function() {
										this.classSuffix = "-v";
										this.onScroll = function() {
											if (!this.skipEvent) {
												this.scrollTop = this.element.scrollTop;
												if (this.coeff != 1) {
													var h = this.element.clientHeight / this.scrollHeight;
													this.scrollTop = this.scrollTop * (1 - h) / (this.coeff - h);
												}
												this._emit("scroll", { data: this.scrollTop });
											}
											this.skipEvent = false;
										};
										this.getWidth = function() {
											return Math.max(this.isVisible ? this.width : 0, this.$minWidth || 0);
										};
										this.setHeight = function(height) {
											this.element.style.height = height + "px";
										};
										this.setInnerHeight = this.setScrollHeight = function(height) {
											this.scrollHeight = height;
											if (height > MAX_SCROLL_H) {
												this.coeff = MAX_SCROLL_H / height;
												height = MAX_SCROLL_H;
											} else if (this.coeff != 1) this.coeff = 1;
											this.inner.style.height = height + "px";
										};
										this.setScrollTop = function(scrollTop) {
											if (this.scrollTop != scrollTop) {
												this.skipEvent = true;
												this.scrollTop = scrollTop;
												this.element.scrollTop = scrollTop * this.coeff;
											}
										};
									}).call(VScrollBar.prototype);
									var HScrollBar = function(parent, renderer) {
										ScrollBar.call(this, parent);
										this.scrollLeft = 0;
										this.height = renderer.$scrollbarWidth;
										this.inner.style.height = this.element.style.height = (this.height || 15) + 5 + "px";
									};
									oop.inherits(HScrollBar, ScrollBar);
									(function() {
										this.classSuffix = "-h";
										this.onScroll = function() {
											if (!this.skipEvent) {
												this.scrollLeft = this.element.scrollLeft;
												this._emit("scroll", { data: this.scrollLeft });
											}
											this.skipEvent = false;
										};
										this.getHeight = function() {
											return this.isVisible ? this.height : 0;
										};
										this.setWidth = function(width) {
											this.element.style.width = width + "px";
										};
										this.setInnerWidth = function(width) {
											this.inner.style.width = width + "px";
										};
										this.setScrollWidth = function(width) {
											this.inner.style.width = width + "px";
										};
										this.setScrollLeft = function(scrollLeft) {
											if (this.scrollLeft != scrollLeft) {
												this.skipEvent = true;
												this.scrollLeft = this.element.scrollLeft = scrollLeft;
											}
										};
									}).call(HScrollBar.prototype);
									exports2.lc = VScrollBar;
									exports2.zy = HScrollBar;
								}),
								677: ((module2, exports2, __webpack_require__2) => {
									var __WEBPACK_AMD_DEFINE_RESULT__ = function(require$1, exports3, module3) {
										"use strict";
										function bindKey(win, mac) {
											return {
												win,
												mac
											};
										}
										exports3.commands = [
											{
												name: "selectAll",
												bindKey: bindKey("Ctrl-A", "Command-A"),
												exec: function(editor) {
													editor.selectAll();
												}
											},
											{
												name: "centerselection",
												bindKey: bindKey(null, "Ctrl-L"),
												exec: function(editor) {
													editor.centerSelection();
												}
											},
											{
												name: "closeOrlevelUp",
												bindKey: bindKey("Left", "Left|Ctrl-B"),
												exec: function(editor) {
													editor.navigateLevelUp(true);
												}
											},
											,
											{
												name: "levelUp",
												bindKey: bindKey("Shift-Left", "Shift-Left|Ctrl-B"),
												exec: function(editor) {
													editor.navigateLevelUp();
												}
											},
											{
												name: "levelDown",
												bindKey: bindKey("Right", "Right|Ctrl-F"),
												exec: function(editor) {
													editor.navigateLevelDown();
												}
											},
											{
												name: "goToStart",
												editorKey: bindKey("Ctrl-Home", "Ctrl-Home"),
												bindKey: bindKey("Home|Ctrl-Home", "Home|Ctrl-Home"),
												exec: function(editor) {
													editor.navigateStart();
												}
											},
											{
												name: "goToEnd",
												editorKey: bindKey("Ctrl-End", "Ctrl-End"),
												bindKey: bindKey("End|Ctrl-End", "End|Ctrl-End"),
												exec: function(editor) {
													editor.navigateEnd();
												}
											},
											{
												name: "closeAllFromSelected",
												bindKey: bindKey("Ctrl-Left", "Ctrl-Left"),
												exec: function(ed) {
													ed.provider.close(ed.selection.getCursor(), true);
												}
											},
											{
												name: "openAllFromSelected",
												bindKey: bindKey("Ctrl-Right", "Ctrl-Right"),
												exec: function(ed) {
													ed.provider.open(ed.selection.getCursor(), true);
												}
											},
											{
												name: "pageup",
												bindKey: "Option-PageUp",
												exec: function(editor) {
													editor.scrollPageUp();
												}
											},
											{
												name: "gotopageup",
												bindKey: "PageUp",
												exec: function(editor) {
													editor.gotoPageUp();
												}
											},
											{
												name: "pagedown",
												bindKey: "Option-PageDown",
												exec: function(editor) {
													editor.scrollPageDown();
												}
											},
											{
												name: "gotopageDown",
												bindKey: "PageDown",
												exec: function(editor) {
													editor.gotoPageDown();
												}
											},
											{
												name: "scrollup",
												bindKey: bindKey("Ctrl-Up", null),
												exec: function(e) {
													e.renderer.scrollBy(0, -2 * e.renderer.layerConfig.lineHeight);
												}
											},
											{
												name: "scrolldown",
												bindKey: bindKey("Ctrl-Down", null),
												exec: function(e) {
													e.renderer.scrollBy(0, 2 * e.renderer.layerConfig.lineHeight);
												}
											},
											{
												name: "insertstring",
												exec: function(e, args) {
													e.insertSting(args);
												}
											},
											{
												name: "goUp",
												bindKey: bindKey("Up", "Up|Ctrl-P"),
												exec: function(editor) {
													editor.selection.moveSelection(-1);
												}
											},
											{
												name: "goDown",
												bindKey: bindKey("Down", "Down|Ctrl-N"),
												exec: function(editor) {
													editor.selection.moveSelection(1);
												}
											},
											{
												name: "selectUp",
												bindKey: bindKey("Shift-Up", "Shift-Up"),
												exec: function(editor) {
													editor.selection.moveSelection(-1, true);
												}
											},
											{
												name: "selectDown",
												bindKey: bindKey("Shift-Down", "Shift-Down"),
												exec: function(editor) {
													editor.selection.moveSelection(1, true);
												}
											},
											{
												name: "selectToUp",
												bindKey: bindKey("Ctrl-Up", "Ctrl-Up"),
												exec: function(editor) {
													editor.selection.moveSelection(-1, false, true);
												}
											},
											{
												name: "selectToDown",
												bindKey: bindKey("Ctrl-Down", "Ctrl-Down"),
												exec: function(editor) {
													editor.selection.moveSelection(1, false, true);
												}
											},
											{
												name: "selectMoreUp",
												bindKey: bindKey("Ctrl-Shift-Up", "Ctrl-Shift-Up"),
												exec: function(editor) {
													editor.selection.moveSelection(-1, true, true);
												}
											},
											{
												name: "selectMoreDown",
												bindKey: bindKey("Ctrl-Shift-Down", "Ctrl-Shift-Down"),
												exec: function(editor) {
													editor.selection.moveSelection(1, true, true);
												}
											},
											{
												name: "rename",
												bindKey: "F2",
												exec: function(tree) {
													tree.edit && tree.edit.startRename();
												}
											},
											{
												name: "chose",
												bindKey: "Enter",
												exec: function(tree) {
													tree._emit("afterChoose");
												}
											},
											{
												name: "delete",
												bindKey: "Delete",
												exec: function(tree) {
													tree._emit("delete");
												}
											},
											{
												name: "foldOther",
												bindKey: bindKey("Alt-0", "Command-Option-0"),
												exec: function(tree) {
													tree.provider.close(tree.provider.root, true);
													tree.reveal(tree.selection.getCursor());
												}
											}
										];
									}.call(exports2, __webpack_require__2, exports2, module2);
									__WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__);
								}),
								614: ((module2, exports2, __webpack_require__2) => {
									var __WEBPACK_AMD_DEFINE_RESULT__ = function(require$1, exports3, module3) {
										"no use strict";
										var lang = __webpack_require__2(955);
										__webpack_require__2(645);
										__webpack_require__2(552);
										var AppConfig = __webpack_require__2(845).o;
										module3.exports = exports3 = new AppConfig();
										var options = {
											packaged: false,
											workerPath: null,
											modePath: null,
											themePath: null,
											basePath: "",
											suffix: ".js",
											$moduleUrls: {}
										};
										exports3.get = function(key) {
											if (!options.hasOwnProperty(key)) throw new Error("Unknown config key: " + key);
											return options[key];
										};
										exports3.set = function(key, value) {
											if (!options.hasOwnProperty(key)) throw new Error("Unknown config key: " + key);
											options[key] = value;
										};
										exports3.all = function() {
											return lang.copyObject(options);
										};
										exports3.moduleUrl = function(name$1, component) {
											if (options.$moduleUrls[name$1]) return options.$moduleUrls[name$1];
											var parts = name$1.split("/");
											component = component || parts[parts.length - 2] || "";
											var base$1 = parts[parts.length - 1].replace(component, "").replace(/(^[\-_])|([\-_]$)/, "");
											if (!base$1 && parts.length > 1) base$1 = parts[parts.length - 2];
											var path = options[component + "Path"];
											if (path == null) path = options.basePath;
											if (path && path.slice(-1) != "/") path += "/";
											return path + component + "-" + base$1 + this.get("suffix");
										};
										exports3.setModuleUrl = function(name$1, subst) {
											return options.$moduleUrls[name$1] = subst;
										};
										exports3.$loading = {};
										exports3.loadModule = function(moduleName, onLoad) {
											debugger;
										};
									}.call(exports2, __webpack_require__2, exports2, module2);
									__WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__);
								}),
								768: ((module2, exports2, __webpack_require__2) => {
									var __WEBPACK_AMD_DEFINE_RESULT__ = function(require$1, exports3, module3) {
										exports3.isDark = false;
										exports3.cssClass = "ace_tree-light";
										exports3.cssText = __webpack_require__2(28);
										__webpack_require__2(435).importCssString(exports3.cssText, exports3.cssClass);
									}.call(exports2, __webpack_require__2, exports2, module2);
									__WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__);
								}),
								950: ((module2, exports2, __webpack_require__2) => {
									var __WEBPACK_AMD_DEFINE_RESULT__ = function(require$1, exports3, module3) {
										"use strict";
										var oop = __webpack_require__2(645);
										var Scrollable = __webpack_require__2(541);
										var dom$1 = __webpack_require__2(435);
										var escapeHTML = __webpack_require__2(955).escapeHTML;
										var DataProvider = function(root) {
											this.rowHeight = 25;
											this.setRoot(root);
										};
										(function() {
											this.rowHeight = void 0;
											this.rowHeightInner = void 0;
											this.$indentSize = 10;
											oop.implement(this, Scrollable);
											this.$sortNodes = true;
											this.setRoot = function(root) {
												if (Array.isArray(root)) root = { items: root };
												this.root = root || {};
												if (this.root.$depth == void 0) this.root.$depth = -1;
												if (this.root.$depth < 0) {
													this.visibleItems = [];
													this.open(this.root);
													this.visibleItems.unshift();
												} else this.visibleItems = [this.root];
												this.$selectedNode = this.root;
												this._signal("setRoot");
												this._signal("change");
											};
											this.open = this.expand = function(node, deep, silent) {
												if (typeof deep != "number") deep = deep ? 100 : 0;
												if (!node) return;
												var items = this.visibleItems;
												if (this.isOpen(node) && (node !== this.root || items.length)) return;
												var ch = this.getChildren(node);
												if (this.loadChildren && this.shouldLoadChildren(node, ch)) {
													var timer = setTimeout(function() {
														node.status = "loading";
														this._signal("change", node);
													}.bind(this), 100);
													this.loadChildren(node, function(err, ch2) {
														clearTimeout(timer);
														this.collapse(node, null, true);
														node.status = "loaded";
														if (!err) this.expand(node, null, false);
													}.bind(this));
													this.setOpen(node, true);
													return;
												}
												this.setOpen(node, true);
												var i = items.indexOf(node);
												if (!ch) {
													this._signal("change", node);
													return;
												}
												if (i === -1 && items.length || this.forceEmpty) return;
												ch = [i + 1, 0].concat(ch);
												items.splice.apply(items, ch);
												for (var j = 2; j < ch.length; j++) {
													var childNode = ch[j];
													if (this.isOpen(childNode)) {
														this.setOpen(childNode, false);
														this.open(childNode, deep - 1, silent);
													} else if (deep > 0) this.open(childNode, deep - 1, silent);
												}
												this.rows = items.length;
												silent || this._signal("expand", node);
											};
											this.close = this.collapse = function(node, deep, silent) {
												if (typeof deep != "number") deep = deep ? 1e3 : 0;
												var items = this.visibleItems;
												var isRoot = node === this.root;
												if (isRoot) {
													this.setOpen(node, false);
													if (deep) for (var i = 0; i < items.length; i++) {
														var ch = items[i];
														if (!ch.isRoot) {
															if (this.isOpen(ch) && ch.$depth - node.$depth < deep) {
																this.setOpen(ch, false);
																silent || this._signal("collapse", ch);
															}
														}
													}
													items.length = 0;
													if (isRoot) this.open(this.root, 0, silent);
													return;
												}
												if (!node || !this.isOpen(node)) return;
												var i = items.indexOf(node);
												if (i === -1) return;
												var thisDepth = node.$depth;
												var deletecount = 0;
												for (var t = i + 1; t < items.length; t++) if (items[t].$depth > thisDepth) deletecount++;
												else break;
												if (deep) for (var j = 0; j < deletecount; j++) {
													var ch = items[j + i];
													if (this.isOpen(ch) && ch.$depth - node.$depth < deep) {
														this.setOpen(ch, false);
														silent || this._signal("collapse", ch);
													}
												}
												items.splice(i + 1, deletecount);
												this.setOpen(node, false);
												silent || this._signal("collapse", node);
												if (isRoot) this.open(this.root, 0, silent);
											};
											this.toggleNode = function(node, deep, silent) {
												if (node && this.isOpen(node)) this.close(node, deep, silent);
												else this.open(node, deep, silent);
											};
											this.sort = function(children, compare) {
												if (!compare) compare = alphanumCompare;
												return children.sort(function(a, b) {
													var aChildren = a.children || a.map;
													var bChildren = b.children || b.map;
													if (aChildren && !bChildren) return -1;
													if (!aChildren && bChildren) return 1;
													return compare(a.label || "", b.label || "");
												});
											};
											this.setFilter = function(fn) {
												this.$filterFn = fn;
												this.setRoot(this.root);
											};
											this.getChildren = function(node) {
												var children = node.children;
												if (!children) {
													if (node.status === "pending") return;
													if (node.map) children = Object.keys(node.map).map(function(key) {
														var ch2 = node.map[key];
														ch2.parent = node;
														return ch2;
													});
													else if (node.items) children = node.items;
													if (children) node.children = children;
												}
												if (children && children[0] && children[0]) {
													var d = node.$depth + 1 || 0;
													children.forEach(function(n) {
														n.$depth = d;
														n.parent = node;
													});
												}
												if (this.$filterFn) children = children && children.filter(this.$filterFn);
												if (this.$sortNodes && !node.$sorted) children && this.sort(children);
												return children;
											};
											this.loadChildren = null;
											this.shouldLoadChildren = function(node, ch) {
												return node.status === "pending";
											};
											this.hasChildren = function(node) {
												if (node.children) return node.children.length !== 0;
												return node.map || node.status === "pending" || node.items && node.items.length;
											};
											this.findNodeByPath = function() {};
											this.getSibling = function(node, dir) {
												if (!dir) dir = 1;
												var parent = node.parent;
												var ch = this.getChildren(parent);
												return ch[ch.indexOf(node) + dir];
											};
											this.getNodeAtIndex = function(i) {
												return this.visibleItems[i];
											};
											this.getIndexForNode = function(node) {
												return this.visibleItems.indexOf(node);
											};
											this.getMinIndex = function() {
												return 0;
											};
											this.getMaxIndex = function() {
												return this.visibleItems.length - 1;
											};
											this.setOpen = function(node, val) {
												return node.isOpen = val;
											};
											this.isOpen = function(node) {
												return node.isOpen;
											};
											this.isVisible = function(node) {
												return this.visibleItems.indexOf(node) !== -1;
											};
											this.isSelected = function(node) {
												return node.isSelected;
											};
											this.setSelected = function(node, val) {
												return node.isSelected = !!val;
											};
											this.isSelectable = function(node) {
												return !node || !(node.noSelect || node.$depth < 0);
											};
											this.isAncestor = function(node, child) {
												do
													if (child == node) return true;
												while (child = child.parent);
												return false;
											};
											this.setAttribute = function(node, name$1, value) {
												node[name$1] = value;
												this._signal("change", node);
											};
											this.getDataRange = function(rows, columns, callback) {
												var view = this.visibleItems.slice(rows.start, rows.start + rows.length);
												callback(null, view, false);
												return view;
											};
											this.getRange = function(top, bottom) {
												var start = Math.floor(top / this.rowHeight);
												var end = Math.ceil(bottom / this.rowHeight) + 1;
												var range = this.visibleItems.slice(start, end);
												range.count = start;
												range.size = this.rowHeight * range.count;
												return range;
											};
											this.getTotalHeight = function(top, bottom) {
												return this.rowHeight * this.visibleItems.length;
											};
											this.getNodePosition = function(node) {
												var i = this.visibleItems.indexOf(node);
												if (i == -1 && node && node.parent) i = this.visibleItems.indexOf(node.parent);
												return {
													top: i * this.rowHeight,
													height: this.rowHeight
												};
											};
											this.findItemAtOffset = function(offset, clip) {
												var index = Math.floor(offset / this.rowHeight);
												if (clip) index = Math.min(Math.max(0, index), this.visibleItems.length - 1);
												return this.visibleItems[index];
											};
											this.getIconHTML = function(node) {
												return "";
											};
											this.getClassName = function(node) {
												return (node.className || "") + (node.status == "loading" ? " loading" : "");
											};
											this.setClass = function(node, name$1, include) {
												node.className = node.className || "";
												dom$1.setCssClass(node, name$1, include);
												this._signal("changeClass");
											};
											this.redrawNode = null;
											this.getCaptionHTML = function(node) {
												return escapeHTML(node.label || node.name || (typeof node == "string" ? node : ""));
											};
											this.getContentHTML = null;
											this.getEmptyMessage = function() {
												return this.emptyMessage || "";
											};
											this.getText = function(node) {
												return node.label || node.name || "";
											};
											this.getRowIndent = function(node) {
												return node.$depth;
											};
											this.hideAllNodes = function() {
												this.visibleItems = [];
												this.forceEmpty = true;
												this.setRoot(this.root);
											};
											this.showAllNodes = function() {
												this.forceEmpty = false;
												this.setRoot(this.root);
											};
										}).call(DataProvider.prototype);
										function alphanumCompare(a, b) {
											var caseOrder = 0;
											for (var x = 0, l = Math.min(a.length, b.length); x < l; x++) {
												var ch1 = a.charCodeAt(x);
												var ch2 = b.charCodeAt(x);
												if (ch1 < 58 && ch2 < 58 && ch1 > 47 && ch2 > 47) {
													var num1 = 0, num2 = 0;
													var n = x;
													do {
														num1 = 10 * num1 + (ch1 - 48);
														ch1 = a.charCodeAt(++n);
													} while (ch1 > 47 && ch1 < 58);
													n = x;
													do {
														num2 = 10 * num2 + (ch2 - 48);
														ch2 = b.charCodeAt(++n);
													} while (ch2 > 47 && ch2 < 58);
													if (num1 === num2) x = n - 1;
													else return num1 - num2;
												} else if (ch1 !== ch2) {
													var ch1L = a[x].toLowerCase();
													var ch2L = b[x].toLowerCase();
													if (ch1L < ch2L) return -1;
													if (ch1L > ch2L) return 1;
													if (!caseOrder) caseOrder = ch2 - ch1;
												}
											}
											return caseOrder || a.length - b.length;
										}
										DataProvider.alphanumCompare = alphanumCompare;
										DataProvider.prototype.alphanumCompare = alphanumCompare;
										DataProvider.variableHeightRowMixin = function() {
											var reset = function() {
												this.$cachedTotalHeight = 0;
											}.bind(this);
											this.on("collapse", reset);
											this.on("expand", reset);
											this.getNodePosition = function(node) {
												var i = this.visibleItems.indexOf(node);
												if (i == -1 && node && node.parent) i = this.visibleItems.indexOf(node.parent);
												var items = this.visibleItems;
												var top = 0, height = 0;
												for (var index = 0; index < i; index++) {
													height = this.getItemHeight(items[index], index);
													top += height;
												}
												height = this.getItemHeight(items[i], i);
												return {
													top,
													height
												};
											};
											this.findIndexAtOffset = function(offset, clip) {
												var items = this.visibleItems;
												var top = 0, index = 0, l = items.length;
												while (index < l) {
													var height = this.getItemHeight(items[index], index);
													top += height;
													index++;
													if (top >= offset) {
														index--;
														top -= height;
														break;
													}
												}
												if (clip) index = Math.min(Math.max(0, index), items.length - 1);
												return index;
											};
											this.findItemAtOffset = function(offset, clip) {
												var index = this.findIndexAtOffset(offset, clip);
												return this.visibleItems[index];
											};
											this.getItemHeight = function(node, index) {
												return node.height || this.rowHeight;
											};
											this.getRange = function(top, bottom) {
												var items = this.visibleItems;
												var startH = 0, index = 0, l = items.length;
												while (index < l) {
													var height = this.getItemHeight(items[index], index);
													startH += height;
													index++;
													if (startH >= top) {
														index--;
														startH -= height;
														break;
													}
												}
												index = Math.min(Math.max(0, index), items.length - 1);
												var start = index;
												var end = this.findIndexAtOffset(bottom, true) + 1;
												var range = this.visibleItems.slice(start, end);
												range.count = start;
												range.size = startH;
												return range;
											};
											this.getTotalHeight = function() {
												if (!this.$cachedTotalHeight) {
													var items = this.visibleItems;
													var height = 0;
													for (var index = 0; index < items.length; index++) height += this.getItemHeight(items[index], index);
													this.$cachedTotalHeight = height;
												}
												return this.$cachedTotalHeight;
											};
										};
										module3.exports = DataProvider;
									}.call(exports2, __webpack_require__2, exports2, module2);
									__WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__);
								}),
								365: ((module2, exports2, __webpack_require__2) => {
									var __WEBPACK_AMD_DEFINE_RESULT__ = function(require$1, exports3, module3) {
										"use strict";
										var oop = __webpack_require__2(645);
										var dom$1 = __webpack_require__2(435);
										var escapeHTML = __webpack_require__2(955).escapeHTML;
										var EventEmitter = __webpack_require__2(366).b;
										var Cells = function(parentEl) {
											this.element = dom$1.createElement("div");
											this.element.className = "ace_tree_layer ace_tree_cell-layer";
											parentEl.appendChild(this.element);
										};
										(function() {
											oop.implement(this, EventEmitter);
											this.config = {}, this.setDataProvider = function(provider) {
												this.provider = provider;
												if (provider) this.update = provider.renderRow ? this.$customUpdate : this.$treeModeUpdate;
											};
											this.update = function(config) {};
											this.measureSizes = function() {
												var domNode = this.element.firstChild;
												if (domNode) {
													this.provider.rowHeight = domNode.offsetHeight;
													this.provider.rowHeightInner = domNode.clientHeight;
												}
											};
											this.$treeModeUpdate = function(config) {
												this.config = config;
												var provider = this.provider;
												var row, html = [], view = config.view, datarow;
												var firstRow = config.firstRow, lastRow = config.lastRow + 1;
												var hsize = "auto;", vsize = provider.rowHeightInner || provider.rowHeight;
												for (row = firstRow; row < lastRow; row++) {
													datarow = view[row - firstRow];
													if (provider.getItemHeight) vsize = provider.getItemHeight(datarow, row);
													this.$renderRow(html, datarow, vsize, hsize, row);
												}
												if (firstRow <= 0 && lastRow <= 0) this.renderPlaceHolder(provider, html, config);
												this.element.innerHTML = html.join("");
												if (!vsize) this.measureSizes();
											};
											this.columnNode = function(datarow, column) {
												return "<span class='tree-column " + (column.className || "") + "' style='" + (datarow.fullWidth ? "" : "width:" + column.$width + ";") + "'>";
											};
											this.getRowClass = function(datarow, row) {
												var provider = this.provider;
												return "tree-row " + (provider.isSelected(datarow) ? "selected " : "") + (provider.getClassName(datarow) || "") + (row & 1 ? " odd" : " even");
											};
											this.$renderRow = function(html, datarow, vsize, hsize, row) {
												var provider = this.provider;
												var columns = provider.columns;
												var indent = provider.$indentSize;
												html.push("<div style='height:" + vsize + "px;" + (columns ? "padding-right:" + columns.$fixedWidth : "") + "' class='" + this.getRowClass(datarow, row) + "'>");
												if (!columns || columns[0].type == "tree") {
													if (columns) html.push(this.columnNode(datarow, columns[0], row));
													var depth = provider.getRowIndent(datarow);
													html.push((depth ? "<span style='width:" + depth * indent + "px' class='tree-indent'></span>" : "") + "<span class='toggler " + (provider.hasChildren(datarow) ? provider.isOpen(datarow) ? "open" : "closed" : "empty") + "'></span>" + (provider.getCheckboxHTML ? provider.getCheckboxHTML(datarow) : "") + provider.getIconHTML(datarow) + (provider.getContentHTML ? provider.getContentHTML(datarow) : "<span class='caption' style='width: " + hsize + "px;height: " + vsize + "px'>" + provider.getCaptionHTML(datarow) + "</span>"));
												}
												if (columns) {
													for (var col = columns[0].type == "tree" ? 1 : 0; col < columns.length; col++) {
														var column = columns[col];
														var rowStr = column.getHTML ? column.getHTML(datarow) : escapeHTML(column.getText(datarow) + "");
														html.push("</span>" + this.columnNode(datarow, column, row) + rowStr);
													}
													html.push("</span>");
												}
												html.push("</div>");
											};
											this.$customUpdate = function(config) {
												this.config = config;
												var provider = this.provider;
												var html = [];
												var firstRow = config.firstRow, lastRow = config.lastRow + 1;
												for (var row = firstRow; row < lastRow; row++) provider.renderRow(row, html, config);
												if (firstRow <= 0 && lastRow <= 0) this.renderPlaceHolder(provider, html, config);
												this.element.innerHTML = html.join("");
											};
											this.updateClasses = function(config) {
												if (this.update == this.$customUpdate && !this.provider.updateNode) return this.update(config);
												this.config = config;
												var provider = this.provider;
												var row, view = config.view, datarow;
												var firstRow = config.firstRow, lastRow = config.lastRow + 1;
												var children = this.element.children;
												if (children.length != lastRow - firstRow) return this.update(config);
												for (row = firstRow; row < lastRow; row++) {
													datarow = view[row - firstRow];
													var el = children[row - firstRow];
													el.className = this.getRowClass(datarow, row);
													if (provider.redrawNode) provider.redrawNode(el, datarow);
												}
											};
											this.scroll = function(config) {
												return this.update(config);
											};
											this.updateRows = function(config, firstRow, lastRow) {};
											this.destroy = function() {};
											this.getDomNodeAtIndex = function(i) {
												return this.element.children[i - this.config.firstRow];
											};
											this.renderPlaceHolder = function(provider, html, config) {
												if (provider.renderEmptyMessage) provider.renderEmptyMessage(html, config);
												else if (provider.getEmptyMessage) html.push("<div class='message empty'>", escapeHTML(provider.getEmptyMessage()), "</div>");
											};
										}).call(Cells.prototype);
										exports3.Cells = Cells;
									}.call(exports2, __webpack_require__2, exports2, module2);
									__WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__);
								}),
								86: ((module2, exports2, __webpack_require__2) => {
									var __WEBPACK_AMD_DEFINE_RESULT__ = function(require$1, exports3, module3) {
										"use strict";
										__webpack_require__2(645);
										var dom$1 = __webpack_require__2(435);
										__webpack_require__2(955);
										__webpack_require__2(366).b;
										var RESIZER_WIDTH = 3;
										function getColumnText(node) {
											return node[this.value] || this.defaultValue || "";
										}
										function ColumnHeader(parentEl, renderer) {
											this.element = dom$1.createElement("div");
											parentEl.appendChild(this.element);
											this.element.className = "tree-headings";
											this.visible = false;
										}
										(function() {
											this.minWidth = 25;
											this.update = function() {
												if (!this.provider || !this.visible) return;
												var columns = this.provider.columns;
												var html = [];
												for (var i = 0; i < columns.length; i++) {
													var col = columns[i];
													html.push("<span class='tree-column " + (col.className || "") + "' style='width:" + col.$width + ";height:'>" + col.caption + "</span><span class='tree-column-resizer' ></span>");
												}
												this.element.style.paddingRight = columns.$fixedWidth;
												this.element.innerHTML = html.join("");
											};
											this.setDataProvider = function(provider) {
												this.provider = provider;
												if (!provider) return;
												var columns = this.provider.columns;
												if (!columns) {
													this.visible = false;
													return;
												}
												this.visible = true;
												var fixedWidth = 0;
												columns.forEach(function(col, i) {
													col.index = i;
													if (col.value && !col.getText) col.getText = getColumnText;
													var w = col.width;
													if (typeof w == "string" && w.slice(-1) == "%") {
														col.flex = parseInt(w, 10) / 100;
														col.$width = col.width;
													} else {
														col.width = parseInt(w, 10) || this.minWidth;
														fixedWidth += col.width;
														col.$width = col.width + "px";
													}
													col.pixelWidth = 0;
												}, this);
												columns.fixedWidth = fixedWidth;
												columns.$fixedWidth = fixedWidth + "px";
												columns.width = null;
												provider.columns = columns;
											};
											this.updateWidth = function(width) {
												if (!this.provider || !this.visible) return;
												var columns = this.provider.columns;
												var fixedWidth = 0;
												columns.width = width;
												columns.forEach(function(col) {
													if (!col.flex) fixedWidth += col.width;
												});
												var flexWidth = width - fixedWidth;
												columns.forEach(function(col) {
													if (col.flex) {
														col.pixelWidth = flexWidth * col.flex;
														col.$width = col.flex * 100 + "%";
													} else {
														col.pixelWidth = col.width;
														col.$width = col.width + "px";
													}
												});
												columns.fixedWidth = fixedWidth;
												columns.$fixedWidth = fixedWidth + "px";
											};
											this.changeColumnWidth = function(changedColumn, dw, total) {
												this.updateWidth(total);
												var columns = this.provider.columns;
												var minWidth = this.minWidth;
												if (!dw) return;
												var index = columns.indexOf(changedColumn);
												var col, nextCol, prevCol;
												for (var i = index + 1; i < columns.length; i++) {
													col = columns[i];
													if (Math.floor(col.pixelWidth) > minWidth || dw < 0) {
														if (col.flex) {
															nextCol = col;
															break;
														} else if (!nextCol) nextCol = col;
													}
												}
												for (var i = index; i >= 0; i--) {
													col = columns[i];
													if (Math.floor(col.pixelWidth) > minWidth || dw > 0) {
														if (col.flex) {
															prevCol = col;
															break;
														} else if (!prevCol) {
															prevCol = col;
															if (col == changedColumn) break;
														}
													}
												}
												if (!prevCol || !nextCol) return;
												if (nextCol.pixelWidth - dw < minWidth) dw = nextCol.pixelWidth - minWidth;
												if (prevCol.pixelWidth + dw < minWidth) dw = minWidth - prevCol.pixelWidth;
												nextCol.pixelWidth -= dw;
												prevCol.pixelWidth += dw;
												if (!nextCol.flex) columns.fixedWidth -= dw;
												if (!prevCol.flex) columns.fixedWidth += dw;
												var flexWidth = total - columns.fixedWidth;
												columns.forEach(function(col2) {
													if (col2.flex) col2.flex = col2.pixelWidth / flexWidth;
													else col2.width = col2.pixelWidth;
												});
												this.updateWidth(total);
											};
											this.findColumn = function(x) {
												var columns = this.provider.columns;
												if (this.element.offsetWidth != columns.width) this.updateWidth(this.element.offsetWidth);
												var w = 0;
												for (var i = 0; i < columns.length; i++) {
													var column = columns[i];
													w += column.pixelWidth;
													if (x < w + RESIZER_WIDTH) return {
														index: i,
														column,
														overResizer: x > w - RESIZER_WIDTH
													};
												}
											};
										}).call(ColumnHeader.prototype);
										exports3.ColumnHeader = ColumnHeader;
									}.call(exports2, __webpack_require__2, exports2, module2);
									__WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__);
								}),
								611: ((module2, exports2, __webpack_require__2) => {
									var __WEBPACK_AMD_DEFINE_RESULT__ = function(require$1, exports3, module3) {
										"use strict";
										var dom$1 = __webpack_require__2(435);
										var Selection = function(parentEl, renderer) {
											this.element = dom$1.createElement("div");
											this.element.className = "ace_tree_layer ace_tree_selection-layer";
											parentEl.appendChild(this.element);
											this.renderer = renderer;
											this.markerEl = null;
											this.arrowEl = null;
										};
										(function() {
											this.setDataProvider = function(provider) {
												this.provider = provider;
											};
											this.update = function(config) {
												if (!this.provider.markedFolder || this.provider.markedFolderType) this.markerEl && this.clearFolderMarker();
												else this.showFolderMarker(config);
												if (!this.provider.markedFolder || !this.provider.markedFolderType) this.arrowEl && this.clearInsertionMarker();
												else this.showInsertionMarker(config);
											};
											this.showFolderMarker = function(config) {
												this.config = config;
												var provider = this.provider;
												var node = provider.markedFolder;
												var start = provider.getIndexForNode(node);
												var items = provider.visibleItems;
												var end = start + 1;
												var depth = node.$depth;
												while (items[end] && items[end].$depth > depth) end++;
												end--;
												if (start > config.lastRow || end < config.firstRow || start === end) return this.clearFolderMarker();
												start++;
												end++;
												var top = Math.max(start - config.firstRow, -1) * provider.rowHeight;
												var left = (depth + 1) * provider.$indentSize;
												var bottom = Math.min(end - config.firstRow, config.lastRow - config.firstRow + 2) * provider.rowHeight;
												if (!this.markerEl) {
													this.markerEl = dom$1.createElement("div");
													this.markerEl.className = "dragHighlight";
													this.element.appendChild(this.markerEl);
												}
												this.markerEl.style.top = top + "px";
												this.markerEl.style.left = left + "px";
												this.markerEl.style.right = "7px";
												this.markerEl.style.height = bottom - top + "px";
											};
											this.showInsertionMarker = function(config) {
												this.config = config;
												var provider = this.provider;
												var node = provider.markedFolder;
												var type = this.provider.markedFolderType;
												var start = provider.getIndexForNode(node);
												var depth = node.$depth;
												if (start > config.lastRow || start < config.firstRow) return this.clearInsertionMarker();
												if (type == 1) start++;
												var top = Math.max(start - config.firstRow, -1) * provider.rowHeight;
												var left = (depth + 1) * provider.$indentSize;
												if (!this.arrowEl) {
													this.arrowEl = dom$1.createElement("div");
													this.arrowEl.className = "dragArrow";
													this.element.appendChild(this.arrowEl);
												}
												this.arrowEl.style.top = top + "px";
												this.arrowEl.style.left = left + "px";
												this.arrowEl.style.right = "7px";
											};
											this.clearFolderMarker = function() {
												if (this.markerEl) {
													this.markerEl.parentNode.removeChild(this.markerEl);
													this.markerEl = null;
												}
											};
											this.clearInsertionMarker = function() {
												if (this.arrowEl) {
													this.arrowEl.parentNode.removeChild(this.arrowEl);
													this.arrowEl = null;
												}
											};
											this.clear = function() {
												this.clearFolderMarker();
												this.clearInsertMarker();
											};
											this.destroy = function() {};
										}).call(Selection.prototype);
										exports3.Selection = Selection;
									}.call(exports2, __webpack_require__2, exports2, module2);
									__WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__);
								}),
								127: ((module2, exports2, __webpack_require__2) => {
									var __WEBPACK_AMD_DEFINE_RESULT__ = function(require$1, exports3, module3) {
										"use strict";
										var dom$1 = __webpack_require__2(435);
										var DRAG_OFFSET = 5;
										function DefaultHandlers(mouseHandler) {
											mouseHandler.$clickSelection = null;
											var editor = mouseHandler.editor;
											editor.setDefaultHandler("mousedown", this.onMouseDown.bind(mouseHandler));
											editor.setDefaultHandler("dblclick", this.onDoubleClick.bind(mouseHandler));
											editor.setDefaultHandler("mouseleave", this.onMouseLeave.bind(mouseHandler));
											editor.setDefaultHandler("mousemove", this.onMouseMove.bind(mouseHandler));
											editor.setDefaultHandler("mousewheel", this.onMouseWheel.bind(mouseHandler));
											editor.setDefaultHandler("mouseup", this.onMouseUp.bind(mouseHandler));
											editor.setDefaultHandler("click", this.onClick.bind(mouseHandler));
											[
												"dragMoveSelection",
												"dragWait",
												"dragWaitEnd",
												"getRegion",
												"updateHoverState"
											].forEach(function(x) {
												mouseHandler[x] = this[x];
											}, this);
										}
										(function() {
											function isTogglerClick(target) {
												return dom$1.hasCssClass(target, "toggler") && !dom$1.hasCssClass(target, "empty");
											}
											this.onMouseMove = function(e) {
												var editor = this.editor;
												var node = e.getNode();
												var title, provider = editor.provider;
												if (!node) title = "";
												else if (provider.columns) {
													var pos = e.getDocumentPosition();
													var columnData = editor.renderer.$headingLayer.findColumn(pos.x);
													title = columnData ? columnData.column.getText(node) : "";
												} else title = provider.getTooltipText ? provider.getTooltipText(node) : provider.getText(node);
												if (!editor.tooltip && editor.container.title != title) editor.container.title = title;
												this.updateHoverState(node);
											};
											this.onMouseLeave = function() {
												this.updateHoverState(null);
											};
											this.updateHoverState = function(node) {
												var provider = this.editor.provider;
												if (node !== this.node && provider) {
													if (this.node) provider.setClass(this.node, "hover", false);
													this.node = node;
													if (this.node) provider.setClass(this.node, "hover", true);
												}
											};
											this.onMouseDown = function(ev) {
												var editor = this.editor;
												var provider = editor.provider;
												ev.detail = 1;
												this.mousedownEvent = ev;
												this.delayedSelect = false;
												this.isMousePressed = true;
												var button = ev.getButton();
												var isMultiSelect = editor.selection.getSelectedNodes().length > 1;
												if (button !== 0 && isMultiSelect) return;
												var node = ev.getNode();
												this.$clickNode = node;
												if (!node) return;
												var inSelection = provider.isSelected(node);
												var target = ev.domEvent.target;
												this.region = null;
												if (isTogglerClick(target) || node.clickAction == "toggle") {
													this.region = "toggler";
													var toggleChildren = ev.getShiftKey();
													var deep = ev.getAccelKey();
													if (button === 0) if (toggleChildren) {
														if (deep) node = node.parent;
														provider.close(node, true);
														provider.open(node);
													} else provider.toggleNode(node, deep);
													this.$clickNode = null;
												} else if (dom$1.hasCssClass(target, "checkbox")) {
													var nodes = inSelection && editor.selection.getSelectedNodes();
													provider._signal("toggleCheckbox", {
														target: node,
														selectedNodes: nodes
													});
													node.isChecked = !node.isChecked;
													if (nodes) nodes.forEach(function(n) {
														n.isChecked = node.isChecked;
													});
													provider._signal(node.isChecked ? "check" : "uncheck", nodes || [node]);
													provider._signal("change");
												} else if (dom$1.hasCssClass(target, "icon-ok")) if (ev.getShiftKey()) editor.selection.expandSelection(node, null, true);
												else editor.selection.toggleSelect(node);
												else if (ev.getAccelKey()) {
													if (inSelection && isMultiSelect) this.delayedSelect = "toggle";
													else if (!inSelection || isMultiSelect) editor.selection.toggleSelect(node);
												} else if (ev.getShiftKey()) editor.selection.expandSelection(node);
												else if (inSelection && isMultiSelect) if (!editor.isFocused()) this.$clickNode = null;
												else this.delayedSelect = true;
												else editor.selection.setSelection(node);
												if (this.$clickNode) editor.$mouseHandler.captureMouse(ev, "dragWait");
												return ev.preventDefault();
											};
											this.onMouseUp = function(ev) {
												if (this.isMousePressed == 2) return;
												this.isMousePressed = false;
												var pos = ev.getDocumentPosition();
												var node = this.editor.provider.findItemAtOffset(pos.y);
												if (node && this.$clickNode && this.$clickNode == node) {
													ev.button = ev.getButton();
													ev.target = ev.domEvent.target;
													ev.detail = this.mousedownEvent.detail;
													this.onMouseEvent("click", ev);
												}
												this.$clickNode = this.mouseEvent = null;
											};
											this.onClick = function(ev) {
												if (this.mousedownEvent.detail === 2) this.editor._emit("afterChoose");
											};
											this.onDoubleClick = function(ev) {
												var provider = this.editor.provider;
												if (provider.toggleNode && !isTogglerClick(ev.domEvent.target)) {
													var node = ev.getNode();
													if (node) provider.toggleNode(node);
												}
												if (this.mousedownEvent) this.mousedownEvent.detail = 2;
											};
											this.dragMoveSelection = function() {
												var editor = this.editor;
												var ev = this.mouseEvent;
												ev.$pos = ev.node = null;
												var node = ev.getNode(true);
												if (node != editor.selection.getCursor() && node) {
													if (ev.getShiftKey()) editor.selection.expandSelection(node, null, true);
													else editor.selection.selectNode(node);
													editor.renderer.scrollCaretIntoView();
												}
											};
											this.dragWait = function() {
												var ev = this.mousedownEvent;
												if (Math.abs(this.x - ev.x) + Math.abs(this.y - ev.y) > DRAG_OFFSET) {
													this.delayedSelect = false;
													this.editor._emit("startDrag", ev);
													if (this.state == "dragWait" && ev.getButton() === 0) this.setState("dragMoveSelection");
												}
											};
											this.dragWaitEnd = function() {
												if (this.delayedSelect) {
													var selection = this.editor.selection;
													if (this.$clickNode) if (this.delayedSelect == "toggle") selection.toggleSelect(this.$clickNode);
													else selection.setSelection(this.$clickNode);
													this.delayedSelect = false;
												}
											};
											this.onMouseWheel = function(ev) {
												if (ev.getShiftKey() || ev.getAccelKey()) return;
												var t = ev.domEvent.timeStamp;
												var dt = t - (this.$lastScrollTime || 0);
												var editor = this.editor;
												if (editor.renderer.isScrollableBy(ev.wheelX * ev.speed, ev.wheelY * ev.speed) || dt < 200) {
													this.$lastScrollTime = t;
													editor.renderer.scrollBy(ev.wheelX * ev.speed, ev.wheelY * ev.speed);
													return ev.stop();
												}
											};
										}).call(DefaultHandlers.prototype);
										exports3.DefaultHandlers = DefaultHandlers;
									}.call(exports2, __webpack_require__2, exports2, module2);
									__WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__);
								}),
								513: ((module2, exports2, __webpack_require__2) => {
									var __WEBPACK_AMD_DEFINE_RESULT__ = function(require$1, exports3, module3) {
										"use strict";
										var event = __webpack_require__2(631);
										__webpack_require__2(943);
										__webpack_require__2(127).DefaultHandlers;
										__webpack_require__2(118).MouseEvent;
										__webpack_require__2(614);
										var dom$1 = __webpack_require__2(435);
										function initDragHandlers(mouseHandler) {
											var tree = mouseHandler.editor;
											var UNFOLD_TIMEOUT = 500;
											var WIDGET_UNFOLD_TIMEOUT = 500;
											var AUTOSCROLL_DELAY = 300;
											var MIN_DRAG_T = 500;
											var dragInfo, x, y, dx, dy;
											var scrollerRect;
											mouseHandler.drag = function() {
												var ev = this.mouseEvent;
												if (!dragInfo || !ev) return;
												var node = ev.getNode();
												dx = ev.x - x;
												dy = ev.y - y;
												x = ev.x;
												y = ev.y;
												var isInTree = isInRect(x, y, scrollerRect);
												if (!isInTree) node = null;
												if (dragInfo.isInTree != isInTree && dragInfo.selectedNodes) {
													dragInfo.isInTree = isInTree;
													ev.dragInfo = dragInfo;
													tree._signal(isInTree ? "dragIn" : "dragOut", ev);
												}
												if (!isInTree) {
													ev.dragInfo = dragInfo;
													tree._signal("dragMoveOutside", ev);
												}
												if (dragInfo.el) {
													dragInfo.el.style.top = ev.y - dragInfo.offsetY + "px";
													dragInfo.el.style.left = ev.x - dragInfo.offsetX + "px";
												}
												var hoverNode = node;
												if (hoverNode) {
													var xOffset = x - scrollerRect.left;
													var depth = Math.max(0, Math.floor(xOffset / tree.provider.$indentSize));
													var depthDiff = hoverNode.$depth - depth;
													while (depthDiff > 0 && hoverNode.parent) {
														depthDiff--;
														hoverNode = hoverNode.parent;
													}
													if (!hoverNode.isFolder && dragInfo.mode != "sort") hoverNode = hoverNode.parent;
												}
												if (dragInfo.hoverNode !== hoverNode) {
													if (dragInfo.hoverNode) {
														tree.provider.setClass(dragInfo.hoverNode, "dropTarget", false);
														tree._signal("folderDragLeave", dragInfo);
													}
													if (hoverNode && dragInfo.selectedNodes && dragInfo.selectedNodes.indexOf(hoverNode) != -1) hoverNode = null;
													dragInfo.hoverNode = hoverNode;
													if (dragInfo.hoverNode) {
														tree._signal("folderDragEnter", dragInfo);
														if (dragInfo.mode !== "sort") tree.provider.setClass(dragInfo.hoverNode, "dropTarget", true);
													}
													highlightFolder(tree, dragInfo.hoverNode, dragInfo.insertPos);
												}
												var now = Date.now();
												var target = ev.domEvent.target;
												var isFoldWidget = target && dom$1.hasCssClass(target, "toggler") && !dom$1.hasCssClass(target, "empty");
												var distance = Math.abs(dx) + Math.abs(dy);
												var pos = ev.y - scrollerRect.top;
												var rowHeight = tree.provider.rowHeight;
												var renderer = tree.renderer;
												var autoScrollMargin = 1.5 * rowHeight;
												var scroll = pos - autoScrollMargin;
												if (scroll > 0) {
													scroll += -renderer.$size.scrollerHeight + 2 * autoScrollMargin;
													if (scroll < 0) scroll = 0;
												}
												if (!scroll || !isInTree) dragInfo.autoScroll = false;
												if (distance <= 2) {
													if (!dragInfo.stopTime) dragInfo.stopTime = now;
												} else if (!isFoldWidget) dragInfo.stopTime = void 0;
												var dt = now - dragInfo.stopTime;
												if (scroll && isInTree) {
													if (dt > AUTOSCROLL_DELAY || dragInfo.autoScroll) {
														tree.renderer.scrollBy(0, scroll / 2);
														dragInfo.autoScroll = true;
													}
												} else if (node && dragInfo.mode === "move") {
													if (node.parent === tree.provider.root || node.isRoot || node.parent && node.parent.isRoot) isFoldWidget = false;
													if (isFoldWidget && dt > WIDGET_UNFOLD_TIMEOUT && dt < 2 * WIDGET_UNFOLD_TIMEOUT) {
														tree.provider.toggleNode(node);
														dragInfo.stopTime = Infinity;
													} else if (!isFoldWidget && dt > UNFOLD_TIMEOUT && dt < 2 * UNFOLD_TIMEOUT) {
														tree.provider.open(node);
														dragInfo.stopTime = Infinity;
													}
												}
											};
											mouseHandler.dragEnd = function(e, cancel) {
												if (dragInfo) {
													window.removeEventListener("mousedown", keyHandler, true);
													window.removeEventListener("keydown", keyHandler, true);
													window.removeEventListener("keyup", keyHandler, true);
													if (dragInfo.el && dragInfo.el.parentNode) dragInfo.el.parentNode.removeChild(dragInfo.el);
													if (dragInfo.hoverNode) {
														tree.provider.setClass(dragInfo.hoverNode, "dropTarget", false);
														tree._signal("folderDragLeave", dragInfo);
													}
													highlightFolder(tree, null);
													if (tree.isFocused()) tree.renderer.visualizeFocus();
													tree.renderer.setStyle("dragOver", false);
													dragInfo.target = dragInfo.hoverNode;
													if (!cancel && dragInfo.selectedNodes && Date.now() - dragInfo.startT > MIN_DRAG_T) tree._emit("drop", dragInfo);
													if (!dragInfo.isInTree) {
														if (cancel) dragInfo.selectedNodes = null;
														tree._signal("dropOutside", { dragInfo });
													}
													dragInfo = null;
												}
											};
											mouseHandler.dragStart = function() {
												if (dragInfo) this.dragEnd(null, true);
												mouseHandler.setState("drag");
												tree.renderer.visualizeBlur();
												tree.renderer.setStyle("dragOver", true);
												scrollerRect = tree.renderer.scroller.getBoundingClientRect();
												dragInfo = {};
											};
											tree.on("startDrag", function(ev) {
												if (!tree.getOption("enableDragDrop")) return;
												var node = ev.getNode();
												if (!node || ev.getButton()) return;
												mouseHandler.dragStart();
												window.addEventListener("mousedown", keyHandler, true);
												window.addEventListener("keydown", keyHandler, true);
												window.addEventListener("keyup", keyHandler, true);
												var selectedNodes = tree.selection.getSelectedNodes();
												dragInfo = {
													el: constructDragNode(node),
													node,
													selectedNodes,
													offsetX: 10,
													offsetY: 10,
													target: node,
													startT: Date.now(),
													isInTree: true,
													mode: "move"
												};
												ev.dragInfo = dragInfo;
												tree._signal("dragStarted", ev);
												if (mouseHandler.state == "drag") mouseHandler.drag();
											});
											function constructDragNode(node) {
												var i = tree.provider.getIndexForNode(node);
												var domNode = tree.renderer.$cellLayer.getDomNodeAtIndex(i);
												if (!domNode) return;
												var offset = domNode.offsetHeight;
												var selectedNodes = tree.selection.getSelectedNodes();
												var el = document.createElement("div");
												el.className = tree.container.className + " dragImage";
												var ch = el.appendChild(domNode.cloneNode(true));
												ch.removeChild(ch.firstChild);
												ch.style.paddingRight = "5px";
												ch.style.opacity = "0.8";
												el.style.position = "absolute";
												el.style.zIndex = "1000000";
												el.style.pointerEvents = "none";
												el.style.overflow = "visible";
												if (selectedNodes.length > 1) {
													ch.style.color = "transparent";
													ch = el.appendChild(domNode.cloneNode(true));
													ch.removeChild(ch.firstChild);
													ch.style.paddingRight = "5px";
													ch.style.top = -offset + 2 + "px";
													ch.style.left = "2px";
													ch.style.position = "relative";
													ch.style.opacity = "0.8";
												}
												document.body.appendChild(el);
												return el;
											}
											function keyHandler(e) {
												if (dragInfo) {
													if (e.keyCode === 27 || e.type == "mousedown") {
														mouseHandler.dragEnd(null, true);
														event.stopEvent(e);
													} else if (dragInfo && e.keyCode == 17 || e.keyCode == 18) {
														dragInfo.isCopy = e.type == "keydown";
														dom$1.setCssClass(dragInfo.el, "copy", dragInfo.isCopy);
													}
												}
											}
										}
										function highlightFolder(tree, node, type) {
											tree.provider.markedFolder = node;
											tree.provider.markedFolderType = type;
											tree.renderer.$loop.schedule(tree.renderer.CHANGE_MARKER);
										}
										function isInRect(x, y, rect) {
											if (x < rect.right && x > rect.left && y > rect.top && y < rect.bottom) return true;
										}
										module3.exports = initDragHandlers;
									}.call(exports2, __webpack_require__2, exports2, module2);
									__WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__);
								}),
								543: ((module2, exports2, __webpack_require__2) => {
									var __WEBPACK_AMD_DEFINE_RESULT__ = function(require$1, exports3, module3) {
										"use strict";
										var event = __webpack_require__2(631);
										function HeadingHandler(mouseHandler) {
											var editor = mouseHandler.editor;
											var headingLayer = editor.renderer.$headingLayer;
											event.addListener(headingLayer.element, "mousedown", mouseHandler.onMouseEvent.bind(mouseHandler, "headerMouseDown"));
											event.addListener(headingLayer.element, "mousemove", mouseHandler.onMouseEvent.bind(mouseHandler, "headerMouseMove"));
											var overResizer, dragStartPos, columnData;
											editor.setDefaultHandler("headerMouseMove", function(e) {
												if (dragStartPos || !editor.provider || !editor.provider.columns) return;
												var pos = e.getDocumentPosition();
												var width = editor.renderer.$size.scrollerWidth;
												if (width != editor.provider.columns.width) headingLayer.updateWidth(width);
												columnData = headingLayer.findColumn(pos.x);
												overResizer = columnData && columnData.overResizer;
												headingLayer.element.style.cursor = overResizer ? "ew-resize" : "default";
											});
											editor.setDefaultHandler("headerMouseDown", function(e) {
												if (overResizer) {
													dragStartPos = { x: e.getDocumentPosition().x };
													mouseHandler.setState("headerResize");
													mouseHandler.captureMouse(e);
													mouseHandler.mouseEvent = e;
												}
												e.stop();
											});
											mouseHandler.headerResize = function() {
												if (this.mouseEvent && dragStartPos) {
													var dx = this.mouseEvent.getDocumentPosition().x;
													var columns = editor.renderer.provider.columns;
													for (var i = 0; i < columns.length; i++) {
														var col = columns[i];
														dx -= col.pixelWidth;
														if (col === columnData.column) break;
													}
													var total = editor.renderer.$size.scrollerWidth;
													headingLayer.changeColumnWidth(columnData.column, dx, total);
													editor.renderer.updateFull();
												}
											};
											mouseHandler.headerResizeEnd = function() {
												dragStartPos = null;
												headingLayer.element.style.cursor = "";
												overResizer = false;
											};
										}
										exports3.HeadingHandler = HeadingHandler;
									}.call(exports2, __webpack_require__2, exports2, module2);
									__WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__);
								}),
								118: ((module2, exports2, __webpack_require__2) => {
									var __WEBPACK_AMD_DEFINE_RESULT__ = function(require$1, exports3, module3) {
										"use strict";
										var event = __webpack_require__2(631);
										var useragent = __webpack_require__2(943);
										var MouseEvent = exports3.MouseEvent = function(domEvent, editor) {
											this.domEvent = domEvent;
											this.editor = editor;
											this.x = this.clientX = domEvent.clientX;
											this.y = this.clientY = domEvent.clientY;
											this.$pos = null;
											this.$inSelection = null;
											this.propagationStopped = false;
											this.defaultPrevented = false;
										};
										(function() {
											this.stopPropagation = function() {
												event.stopPropagation(this.domEvent);
												this.propagationStopped = true;
											};
											this.preventDefault = function() {
												event.preventDefault(this.domEvent);
												this.defaultPrevented = true;
											};
											this.stop = function() {
												this.stopPropagation();
												this.preventDefault();
											};
											this.getDocumentPosition = function() {
												if (this.$pos) return this.$pos;
												this.$pos = this.editor.renderer.screenToTextCoordinates(this.clientX, this.clientY);
												return this.$pos;
											};
											this.inSelection = function() {
												if (this.$inSelection !== null) return this.$inSelection;
												var node = this.getNode();
												this.$inSelection = !!(node && node.isSelected);
												return this.$inSelection;
											};
											this.node = null;
											this.getNode = function(clip) {
												if (this.node) return this.node;
												var pos = this.getDocumentPosition(clip);
												if (!pos || !this.editor.provider) return;
												return this.node = this.editor.provider.findItemAtOffset(pos.y, clip);
											};
											this.getButton = function() {
												return event.getButton(this.domEvent);
											};
											this.getShiftKey = function() {
												return this.domEvent.shiftKey;
											};
											this.getAccelKey = useragent.isMac ? function() {
												return this.domEvent.metaKey;
											} : function() {
												return this.domEvent.ctrlKey;
											};
										}).call(MouseEvent.prototype);
									}.call(exports2, __webpack_require__2, exports2, module2);
									__WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__);
								}),
								202: ((module2, exports2, __webpack_require__2) => {
									var __WEBPACK_AMD_DEFINE_RESULT__ = function(require$1, exports3, module3) {
										"use strict";
										var event = __webpack_require__2(631);
										var useragent = __webpack_require__2(943);
										var DefaultHandlers = __webpack_require__2(127).DefaultHandlers;
										var initDragHandlers = __webpack_require__2(513);
										var HeadingHandler = __webpack_require__2(543).HeadingHandler;
										var MouseEvent = __webpack_require__2(118).MouseEvent;
										var config = __webpack_require__2(614);
										var MouseHandler = function(editor) {
											this.editor = editor;
											new DefaultHandlers(this);
											new HeadingHandler(this);
											initDragHandlers(this);
											var mouseTarget = editor.renderer.getMouseEventTarget();
											event.addListener(mouseTarget, "mousedown", function(e) {
												editor.focus(true);
												return event.preventDefault(e);
											});
											event.addListener(mouseTarget, "mousemove", this.onMouseEvent.bind(this, "mousemove"));
											event.addListener(mouseTarget, "mouseup", this.onMouseEvent.bind(this, "mouseup"));
											event.addMultiMouseDownListener(mouseTarget, [
												300,
												300,
												250
											], this, "onMouseEvent");
											event.addMultiMouseDownListener(editor.renderer.scrollBarV.inner, [
												300,
												300,
												250
											], this, "onMouseEvent");
											event.addMultiMouseDownListener(editor.renderer.scrollBarH.inner, [
												300,
												300,
												250
											], this, "onMouseEvent");
											event.addMouseWheelListener(editor.container, this.onMouseWheel.bind(this, "mousewheel"));
											event.addListener(mouseTarget, "mouseout", this.onMouseEvent.bind(this, "mouseleave"));
										};
										(function() {
											this.onMouseEvent = function(name$1, e) {
												this.editor._emit(name$1, new MouseEvent(e, this.editor));
											};
											this.onMouseWheel = function(name$1, e) {
												var mouseEvent = new MouseEvent(e, this.editor);
												mouseEvent.speed = this.$scrollSpeed * 2;
												mouseEvent.wheelX = e.wheelX;
												mouseEvent.wheelY = e.wheelY;
												this.editor._emit(name$1, mouseEvent);
											};
											this.setState = function(state) {
												this.state = state;
											};
											this.captureMouse = function(ev, state) {
												if (state) this.setState(state);
												this.x = ev.x;
												this.y = ev.y;
												this.isMousePressed = 2;
												var renderer = this.editor.renderer;
												if (renderer.$keepTextAreaAtCursor) renderer.$keepTextAreaAtCursor = null;
												var self$1 = this;
												var onMouseMove = function(e) {
													self$1.x = e.clientX;
													self$1.y = e.clientY;
													self$1.mouseEvent = new MouseEvent(e, self$1.editor);
													self$1.$mouseMoved = true;
												};
												var onCaptureEnd = function(e) {
													clearInterval(timerId);
													onCaptureInterval();
													self$1[self$1.state + "End"] && self$1[self$1.state + "End"](e);
													self$1.$clickSelection = null;
													if (renderer.$keepTextAreaAtCursor == null) {
														renderer.$keepTextAreaAtCursor = true;
														renderer.$moveTextAreaToCursor();
													}
													self$1.isMousePressed = false;
													e && self$1.onMouseEvent("mouseup", e);
													self$1.$onCaptureMouseMove = self$1.releaseMouse = null;
												};
												var onCaptureInterval = function() {
													self$1[self$1.state] && self$1[self$1.state]();
													self$1.$mouseMoved = false;
												};
												if (useragent.isOldIE && ev.domEvent.type == "dblclick") return setTimeout(function() {
													onCaptureEnd(ev.domEvent);
												});
												self$1.$onCaptureMouseMove = onMouseMove;
												self$1.releaseMouse = event.capture(this.editor.container, onMouseMove, onCaptureEnd);
												var timerId = setInterval(onCaptureInterval, 20);
											};
											this.releaseMouse = null;
										}).call(MouseHandler.prototype);
										config.defineOptions(MouseHandler.prototype, "mouseHandler", {
											scrollSpeed: { initialValue: 2 },
											dragDelay: { initialValue: 150 },
											focusTimeout: { initialValue: 0 },
											enableDragDrop: { initialValue: false }
										});
										exports3.MouseHandler = MouseHandler;
									}.call(exports2, __webpack_require__2, exports2, module2);
									__WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__);
								}),
								277: ((module2, exports2, __webpack_require__2) => {
									var __WEBPACK_AMD_DEFINE_RESULT__ = function(require$1, exports3, module3) {
										"use strict";
										var quickSearch = function(tree, str) {
											var node = tree.selection.getCursor();
											var siblings = tree.provider.getChildren(node.parent);
											if (!siblings || siblings.length == 1) return;
											var index = siblings.indexOf(node);
											var newNode;
											for (var i = index + 1; i < siblings.length; i++) {
												node = siblings[i];
												var label = node.label || node.name || "";
												if (label[0] == str) {
													newNode = node;
													break;
												}
											}
											if (!newNode) for (var i = 0; i < index; i++) {
												node = siblings[i];
												var label = node.label || node.name || "";
												if (label[0] == str) {
													newNode = node;
													break;
												}
											}
											if (newNode) {
												tree.selection.selectNode(newNode);
												tree.renderer.scrollCaretIntoView(newNode, .5);
											}
										};
										module3.exports = quickSearch;
									}.call(exports2, __webpack_require__2, exports2, module2);
									__WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__);
								}),
								541: ((module2, exports2, __webpack_require__2) => {
									var __WEBPACK_AMD_DEFINE_RESULT__ = function(require$1, exports3, module3) {
										"use strict";
										var oop = __webpack_require__2(645);
										var EventEmitter = __webpack_require__2(366).b;
										var scrollable = {};
										(function() {
											oop.implement(this, EventEmitter);
											this.$scrollTop = 0;
											this.getScrollTop = function() {
												return this.$scrollTop;
											};
											this.setScrollTop = function(scrollTop) {
												scrollTop = Math.round(scrollTop);
												if (this.$scrollTop === scrollTop || isNaN(scrollTop)) return;
												this.$scrollTop = scrollTop;
												this._signal("changeScrollTop", scrollTop);
											};
											this.$scrollLeft = 0;
											this.getScrollLeft = function() {
												return this.$scrollLeft;
											};
											this.setScrollLeft = function(scrollLeft) {
												scrollLeft = Math.round(scrollLeft);
												if (this.$scrollLeft === scrollLeft || isNaN(scrollLeft)) return;
												this.$scrollLeft = scrollLeft;
												this._signal("changeScrollLeft", scrollLeft);
											};
										}).call(scrollable);
										module3.exports = scrollable;
									}.call(exports2, __webpack_require__2, exports2, module2);
									__WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__);
								}),
								592: ((module2, exports2, __webpack_require__2) => {
									var __WEBPACK_AMD_DEFINE_RESULT__ = function(require$1, exports3, module3) {
										"use strict";
										var oop = __webpack_require__2(645);
										var EventEmitter = __webpack_require__2(366).b;
										var Selection = function(provider) {
											this.provider = provider;
											if (this.provider && !this.provider.selectedItems) this.provider.selectedItems = [];
											this.provider.on("remove", this.unselectRemoved = this.unselectRemoved.bind(this));
										};
										(function() {
											oop.implement(this, EventEmitter);
											this.$wrapAround = false;
											this.getRange = function() {};
											this.selectAll = function() {
												var sel = this.provider.selectedItems;
												this.expandSelection(sel[0], sel[sel.length - 1]);
												this._signal("change");
											};
											this.moveSelection = function(dir, select, add) {
												var provider = this.provider;
												var cursor = this.getCursor();
												var anchor = this.getAnchor();
												var i = provider.getIndexForNode(cursor);
												if (!add) this.clear(true);
												else if (add && !select) this.unselectNode(cursor);
												var min = provider.getMinIndex();
												var max = provider.getMaxIndex();
												var wrapped = false;
												var newI = i;
												do {
													newI += dir;
													if (newI < min) {
														newI = this.$wrapAround ? max : min;
														wrapped = true;
													} else if (newI > max) {
														newI = this.$wrapAround ? min : max;
														wrapped = true;
													}
													var newNode = provider.getNodeAtIndex(newI);
												} while (!wrapped && newNode && !provider.isSelectable(newNode));
												if (!newNode || !provider.isSelectable(newNode)) newNode = cursor;
												if (select) this.expandSelection(newNode, anchor, add);
												else this.selectNode(newNode, add);
											};
											this.getCursor = function() {
												var sel = this.provider.selectedItems;
												return sel.cursor || sel[sel.length - 1];
											};
											this.getAnchor = function() {
												var sel = this.provider.selectedItems;
												return sel.anchor || sel.cursor || sel[0];
											};
											this.getSelectedNodes = function() {
												return this.provider.selectedItems.slice();
											};
											this.getVisibleSelectedNodes = function() {
												var provider = this.provider;
												return provider.selectedItems.filter(function(node) {
													return provider.isVisible(node);
												});
											};
											this.isEmpty = function() {
												return this.provider.selectedItems.length === 0;
											};
											this.isMultiRow = function() {
												return this.provider.selectedItems.length > 1;
											};
											this.toggleSelect = function(node) {
												var provider = this.provider;
												var sel = provider.selectedItems;
												var i = sel.indexOf(node);
												if (i != -1) sel.splice(i, 1);
												provider.setSelected(node, !provider.isSelected(node));
												if (provider.isSelected(node)) {
													sel.push(node);
													sel.anchor = sel.cursor = node;
												} else sel.anchor = sel.cursor = sel[sel.length - 1];
												this._signal("change");
											};
											this.selectNode = function(node, add, silent) {
												var provider = this.provider;
												var sel = provider.selectedItems;
												if (!provider.isSelectable(node)) return;
												if (!add) this.clear(true);
												if (node) {
													var i = sel.indexOf(node);
													if (i != -1) sel.splice(i, 1);
													provider.setSelected(node, true);
													if (provider.isSelected(node)) sel.push(node);
												}
												sel.anchor = sel.cursor = node;
												this._signal("change");
											};
											this.add = function(node) {
												this.selectNode(node, true);
											};
											this.remove = function(node) {
												if (this.provider.isSelected(node)) this.toggleSelect(node);
											};
											this.clear = this.clearSelection = function(silent) {
												var provider = this.provider;
												var sel = provider.selectedItems;
												sel.forEach(function(node) {
													provider.setSelected(node, false);
												});
												sel.splice(0, sel.length);
												sel.anchor = sel.cursor;
												silent || this._signal("change");
											};
											this.unselectNode = function(node, silent) {
												var provider = this.provider;
												var sel = provider.selectedItems;
												var i = sel.indexOf(node);
												if (i != -1) {
													sel.splice(i, 1);
													provider.setSelected(node, false);
													if (sel.anchor == node) sel.anchor = sel[i - 1] || sel[i];
													if (sel.cursor == node) sel.cursor = sel[i] || sel[i - 1];
													silent || this._signal("change");
												}
											};
											this.setSelection = function(nodes) {
												if (Array.isArray(nodes)) {
													this.clear(true);
													nodes.forEach(function(node) {
														this.selectNode(node, true, true);
													}, this);
												} else this.selectNode(nodes, false, true);
											};
											this.expandSelection = function(cursor, anchor, additive) {
												anchor = anchor || this.getAnchor();
												if (!additive) this.clear(true);
												var provider = this.provider;
												var sel = provider.selectedItems;
												var end = provider.getIndexForNode(cursor);
												var start = provider.getIndexForNode(anchor || cursor);
												if (end > start) for (var i = start; i <= end; i++) {
													var node = provider.getNodeAtIndex(i);
													var index = sel.indexOf(node);
													if (index != -1) sel.splice(index, 1);
													if (provider.isSelectable(node)) provider.setSelected(node, true);
													sel.push(node);
												}
												else for (var i = start; i >= end; i--) {
													var node = provider.getNodeAtIndex(i);
													var index = sel.indexOf(node);
													if (index != -1) sel.splice(index, 1);
													if (provider.isSelectable(node)) provider.setSelected(node, true);
													sel.push(node);
												}
												sel.cursor = cursor;
												sel.anchor = anchor;
												this._signal("change");
											};
											this.unselectRemoved = function(toRemove) {
												var sel = this.getSelectedNodes();
												var provider = this.provider;
												var changed, cursor = this.getCursor();
												sel.forEach(function(n) {
													if (provider.isAncestor(toRemove, n)) {
														changed = true;
														this.unselectNode(n, true);
													}
												}, this);
												if (changed && !provider.isSelected(cursor)) {
													var parent = toRemove.parent;
													var ch = [];
													if (parent && provider.isOpen(parent)) {
														ch = provider.getChildren(parent);
														var i = ch.indexOf(toRemove);
													}
													if (i == -1) {
														i = toRemove.index;
														var node = ch[i] || ch[i - 1] || parent;
													} else node = ch[i + 1] || ch[i - 1] || parent;
													if (node == provider.root) node = ch[0] || node;
													if (node) this.selectNode(node, true);
													this._signal("change");
												}
											};
										}).call(Selection.prototype);
										exports3.Selection = Selection;
									}.call(exports2, __webpack_require__2, exports2, module2);
									__WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__);
								}),
								336: ((module2, exports2, __webpack_require__2) => {
									var __WEBPACK_AMD_DEFINE_RESULT__ = function(require$1, exports3, module3) {
										"use strict";
										var Renderer = __webpack_require__2(743).VirtualRenderer;
										exports3.config = __webpack_require__2(614);
										var oop = __webpack_require__2(645);
										__webpack_require__2(955);
										var useragent = __webpack_require__2(943);
										var TextInput = __webpack_require__2(984).k;
										var MouseHandler = __webpack_require__2(202).MouseHandler;
										var KeyBinding = __webpack_require__2(957).$;
										var Selection = __webpack_require__2(592).Selection;
										var EventEmitter = __webpack_require__2(366).b;
										var CommandManager = __webpack_require__2(379).F;
										var defaultCommands = __webpack_require__2(677).commands;
										var config = __webpack_require__2(614);
										var quickSearch = __webpack_require__2(277);
										var Tree = function(element, cellWidth, cellHeight) {
											this.$toDestroy = [];
											this.cellWidth = cellWidth || 80;
											this.cellHeight = cellHeight || 24;
											this.renderer = new Renderer(element, this.cellWidth, this.cellHeight);
											this.container = this.renderer.container;
											this.commands = new CommandManager(useragent.isMac ? "mac" : "win", defaultCommands);
											this.textInput = new TextInput(this.container, this);
											this.keyBinding = new KeyBinding(this);
											this.$mouseHandler = new MouseHandler(this);
											this.$blockScrolling = 0;
											var _self = this;
											this.renderer.on("edit", function(e) {
												_self._emit("edit", e);
											});
											this.commands.on("exec", function() {
												this.selectionChanged = false;
											}.bind(this));
											this.commands.on("afterExec", function() {
												if (this.selectionChanged) {
													this.selectionChanged = false;
													this.renderer.scrollCaretIntoView();
													this._signal("userSelect");
												}
											}.bind(this));
											this.on("changeSelection", function() {
												if (this.$mouseHandler.isMousePressed) this._signal("userSelect");
											}.bind(this));
											config.resetOptions(this);
											config._emit("Tree", this);
										};
										(function() {
											oop.implement(this, EventEmitter);
											this.setDataProvider = function(provider) {
												if (this.provider) {
													var oldProvider = this.provider;
													this.selection.off("changeCaret", this.$onCaretChange);
													this.selection.off("change", this.$onSelectionChange);
													oldProvider.off("changeClass", this.$onChangeClass);
													oldProvider.off("expand", this.$redraw);
													oldProvider.off("collapse", this.$redraw);
													oldProvider.off("change", this.$redraw);
													oldProvider.off("changeScrollTop", this.$onScrollTopChange);
													oldProvider.off("changeScrollLeft", this.$onScrollLeftChange);
												}
												this.provider = provider;
												this.model = provider;
												if (provider) {
													this.renderer.setDataProvider(provider);
													if (!this.$redraw) this.$redraw = this.redraw.bind(this);
													this.provider.on("expand", this.$redraw);
													this.provider.on("collapse", this.$redraw);
													this.provider.on("change", this.$redraw);
													if (!this.provider.selection) this.provider.selection = new Selection(this.provider);
													this.selection = this.provider.selection;
													this.$onCaretChange = this.onCaretChange.bind(this);
													this.selection.on("changeCaret", this.$onCaretChange);
													this.$onChangeClass = this.$onChangeClass.bind(this);
													this.provider.on("changeClass", this.$onChangeClass);
													this.$onSelectionChange = this.onSelectionChange.bind(this);
													this.selection.on("change", this.$onSelectionChange);
													this.$onScrollTopChange = this.onScrollTopChange.bind(this);
													this.provider.on("changeScrollTop", this.$onScrollTopChange);
													this.$onScrollLeftChange = this.onScrollLeftChange.bind(this);
													this.provider.on("changeScrollLeft", this.$onScrollLeftChange);
													this.$blockScrolling += 1;
													this.onCaretChange();
													this.$blockScrolling -= 1;
													this.onScrollTopChange();
													this.onScrollLeftChange();
													this.onSelectionChange();
													this.renderer.updateFull();
												}
												this._emit("changeDataProvider", {
													provider,
													oldProvider
												});
											};
											this.redraw = function() {
												this.renderer.updateFull();
											};
											this.getLength = function() {
												return 0;
											};
											this.getLine = function(row) {
												return { length: 0 };
											};
											this.getDataProvider = function() {
												return this.provider;
											};
											this.getSelection = function() {
												return this.selection;
											};
											this.resize = function(force) {
												this.renderer.onResize(force);
											};
											this.focus = function(once) {
												var _self = this;
												once || setTimeout(function() {
													_self.textInput.focus();
												});
												this.textInput.focus();
											};
											this.isFocused = function() {
												return this.textInput.isFocused();
											};
											this.blur = function() {
												this.textInput.blur();
											};
											this.onFocus = function() {
												if (this.$isFocused) return;
												this.$isFocused = true;
												this.renderer.visualizeFocus();
												this._emit("focus");
											};
											this.onBlur = function() {
												if (!this.$isFocused) return;
												this.$isFocused = false;
												this.renderer.visualizeBlur();
												this._emit("blur");
											};
											this.onScrollTopChange = function() {
												this.renderer.scrollToY(this.provider.getScrollTop());
											};
											this.onScrollLeftChange = function() {
												this.renderer.scrollToX(this.renderer.getScrollLeft());
											};
											this.$onChangeClass = function() {
												this.renderer.updateCaret();
											};
											this.onCaretChange = function() {
												this.$onChangeClass();
												if (!this.$blockScrolling) this.selectionChanged = true;
												this._emit("changeSelection");
											};
											this.onSelectionChange = function(e) {
												this.onCaretChange();
											};
											this.execCommand = function(command, args) {
												this.commands.exec(command, this, args);
											};
											this.onTextInput = function(text) {
												this.keyBinding.onTextInput(text);
											};
											this.onCommandKey = function(e, hashId, keyCode) {
												this.keyBinding.onCommandKey(e, hashId, keyCode);
											};
											this.insertSting = function(str) {
												if (this.startFilter) return this.startFilter(str);
												quickSearch(this, str);
											};
											this.setTheme = function(theme) {
												this.renderer.setTheme(theme);
											};
											this.$getSelectedRows = function() {
												var range = this.getSelectionRange().collapseRows();
												return {
													first: range.start.row,
													last: range.end.row
												};
											};
											this.getVisibleNodes = function(tolerance) {
												return this.renderer.getVisibleNodes(tolerance);
											};
											this.isNodeVisible = function(node, tolerance) {
												return this.renderer.isNodeVisible(node, tolerance);
											};
											this.$moveByPage = function(dir, select) {
												var renderer = this.renderer;
												var config2 = this.renderer.layerConfig;
												config2.lineHeight = this.provider.rowHeight;
												var rows = dir * Math.floor(config2.height / config2.lineHeight);
												this.$blockScrolling++;
												this.selection.moveSelection(rows, select);
												this.$blockScrolling--;
												var scrollTop = renderer.scrollTop;
												renderer.scrollBy(0, rows * config2.lineHeight);
												if (select != null) renderer.scrollCaretIntoView(null, .5);
												renderer.animateScrolling(scrollTop);
											};
											this.selectPageDown = function() {
												this.$moveByPage(1, true);
											};
											this.selectPageUp = function() {
												this.$moveByPage(-1, true);
											};
											this.gotoPageDown = function() {
												this.$moveByPage(1, false);
											};
											this.gotoPageUp = function() {
												this.$moveByPage(-1, false);
											};
											this.scrollPageDown = function() {
												this.$moveByPage(1);
											};
											this.scrollPageUp = function() {
												this.$moveByPage(-1);
											};
											this.scrollToRow = function(row, center, animate, callback) {
												this.renderer.scrollToRow(row, center, animate, callback);
											};
											this.centerSelection = function() {
												var range = this.getSelectionRange();
												var pos = {
													row: Math.floor(range.start.row + (range.end.row - range.start.row) / 2),
													column: Math.floor(range.start.column + (range.end.column - range.start.column) / 2)
												};
												this.renderer.alignCaret(pos, .5);
											};
											this.getCursorPosition = function() {
												return this.selection.getCursor();
											};
											this.getCursorPositionScreen = function() {
												return this.session.documentToScreenPosition(this.getCursorPosition());
											};
											this.getSelectionRange = function() {
												return this.selection.getRange();
											};
											this.selectAll = function() {
												this.$blockScrolling += 1;
												this.selection.selectAll();
												this.$blockScrolling -= 1;
											};
											this.clearSelection = function() {
												this.selection.clearSelection();
											};
											this.moveCaretTo = function(row, column) {
												this.selection.moveCaretTo(row, column);
											};
											this.moveCaretToPosition = function(pos) {
												this.selection.moveCaretToPosition(pos);
											};
											this.gotoRow = function(rowNumber, column, animate) {
												this.selection.clearSelection();
												if (column === void 0) column = this.selection.getCursor().column;
												this.$blockScrolling += 1;
												this.moveCaretTo(rowNumber - 1, column || 0);
												this.$blockScrolling -= 1;
												if (!this.isRowFullyVisible(rowNumber - 1)) this.scrollToRow(rowNumber - 1, true, animate);
											};
											this.navigateTo = function(row, column) {
												this.clearSelection();
												this.moveCaretTo(row, column);
											};
											this.navigateUp = function() {
												var node = this.provider.navigate("up");
												node && this.selection.setSelection(node);
												this.$scrollIntoView();
											};
											this.navigateDown = function() {
												var node = this.provider.navigate("down");
												node && this.selection.setSelection(node);
											};
											this.navigateLevelUp = function(toggleNode) {
												var node = this.selection.getCursor();
												if (!node) {} else if (toggleNode && this.provider.isOpen(node)) this.provider.close(node);
												else this.selection.setSelection(node.parent);
											};
											this.navigateLevelDown = function() {
												var node = this.selection.getCursor();
												if (!this.provider.hasChildren(node) || this.provider.isOpen(node)) return this.selection.moveSelection(1);
												this.provider.open(node);
											};
											this.navigateStart = function() {
												var node = this.getFirstNode();
												this.selection.setSelection(node);
											};
											this.navigateEnd = function() {
												var node = this.getLastNode();
												this.selection.setSelection(node);
											};
											this.getFirstNode = function() {
												var index = this.provider.getMinIndex();
												return this.provider.getNodeAtIndex(index);
											};
											this.getLastNode = function() {
												var index = this.provider.getMaxIndex();
												return this.provider.getNodeAtIndex(index);
											};
											this.$scrollIntoView = function(node) {
												this.renderer.scrollCaretIntoView();
											};
											this.select = function(node) {
												this.selection.setSelection(node);
											};
											this.getCopyText = function(node) {
												return "";
											};
											this.onPaste = function(node) {
												return "";
											};
											this.reveal = function(node, animate) {
												var provider = this.provider;
												var parent = node.parent;
												while (parent) {
													if (!provider.isOpen(parent)) provider.expand(parent);
													parent = parent.parent;
												}
												this.select(node);
												var scrollTop = this.renderer.scrollTop;
												this.renderer.scrollCaretIntoView(node, .5);
												if (animate !== false) this.renderer.animateScrolling(scrollTop);
											};
											this.undo = function() {
												this.$blockScrolling++;
												this.session.getUndoManager().undo();
												this.$blockScrolling--;
												this.renderer.scrollCaretIntoView(null, .5);
											};
											this.redo = function() {
												this.$blockScrolling++;
												this.session.getUndoManager().redo();
												this.$blockScrolling--;
												this.renderer.scrollCaretIntoView(null, .5);
											};
											this.getReadOnly = function() {
												return this.getOption("readOnly");
											};
											this.destroy = function() {
												this.renderer.destroy();
												this._emit("destroy", this);
											};
											this.setHorHeadingVisible = function(value) {
												this.renderer.setHorHeadingVisible(value);
											};
											this.setVerHeadingVisible = function(value) {
												this.renderer.setVerHeadingVisible(value);
											};
											this.enable = function() {
												this.$disabled = false;
												this.container.style.pointerEvents = "";
												this.container.style.opacity = "";
											};
											this.disable = function() {
												this.$disabled = true;
												this.container.style.pointerEvents = "none";
												this.container.style.opacity = "0.9";
												if (this.isFocused()) this.blur();
											};
										}).call(Tree.prototype);
										config.defineOptions(Tree.prototype, "Tree", {
											toggle: {
												set: function(toggle) {},
												initialValue: false
											},
											readOnly: {
												set: function(readOnly) {
													this.textInput.setReadOnly(readOnly);
												},
												initialValue: false
											},
											animatedScroll: "renderer",
											maxLines: "renderer",
											minLines: "renderer",
											scrollSpeed: "$mouseHandler",
											enableDragDrop: "$mouseHandler"
										});
										module3.exports = Tree;
									}.call(exports2, __webpack_require__2, exports2, module2);
									__WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__);
								}),
								743: ((module2, exports2, __webpack_require__2) => {
									var __WEBPACK_AMD_DEFINE_RESULT__ = function(require$1, exports3, module3) {
										"use strict";
										var oop = __webpack_require__2(645);
										var dom$1 = __webpack_require__2(435);
										var config = __webpack_require__2(614);
										var CellLayer = __webpack_require__2(365).Cells;
										var MarkerLayer = __webpack_require__2(611).Selection;
										var HeaderLayer = __webpack_require__2(86).ColumnHeader;
										var ScrollBarH = __webpack_require__2(745).zy;
										var ScrollBarV = __webpack_require__2(745).lc;
										var RenderLoop = __webpack_require__2(481).x;
										var EventEmitter = __webpack_require__2(366).b;
										var pivotCss = __webpack_require__2(268);
										dom$1.importCssString(pivotCss, "ace_tree");
										var defaultTheme = __webpack_require__2(768);
										var VirtualRenderer = function(container, cellWidth, cellHeight) {
											var _self = this;
											this.container = container || dom$1.createElement("div");
											dom$1.addCssClass(this.container, "ace_tree");
											dom$1.addCssClass(this.container, "ace_tree");
											this.scroller = dom$1.createElement("div");
											this.scroller.className = "ace_tree_scroller";
											this.container.appendChild(this.scroller);
											this.cells = dom$1.createElement("div");
											this.cells.className = "ace_tree_cells";
											this.scroller.appendChild(this.cells);
											this.$headingLayer = new HeaderLayer(this.container, this);
											this.$markerLayer = new MarkerLayer(this.cells, this);
											this.$cellLayer = new CellLayer(this.cells);
											this.canvas = this.$cellLayer.element;
											this.$horizScroll = false;
											this.scrollBarV = new ScrollBarV(this.container, this);
											this.scrollBarV.setVisible(true);
											this.scrollBarV.addEventListener("scroll", function(e) {
												if (!_self.$inScrollAnimation) _self.setScrollTop(e.data - _self.scrollMargin.top);
											});
											this.scrollBarH = new ScrollBarH(this.container, this);
											this.scrollBarH.addEventListener("scroll", function(e) {
												if (!_self.$inScrollAnimation) _self.setScrollLeft(e.data);
											});
											this.scrollTop = 0;
											this.scrollLeft = 0;
											this.caretPos = {
												row: 0,
												column: 0
											};
											this.$size = {
												width: 0,
												height: 0,
												scrollerHeight: 0,
												scrollerWidth: 0,
												headingHeight: 0
											};
											this.layerConfig = {
												width: 1,
												padding: 0,
												firstRow: 0,
												firstRowScreen: 0,
												lastRow: 0,
												lineHeight: 1,
												characterWidth: 1,
												minHeight: 1,
												maxHeight: 1,
												offset: 0,
												height: 1
											};
											this.scrollMargin = {
												left: 0,
												right: 0,
												top: 0,
												bottom: 0,
												v: 0,
												h: 0
											};
											this.$scrollIntoView = null;
											this.$loop = new RenderLoop(this.$renderChanges.bind(this), this.container.ownerDocument.defaultView);
											this.$loop.schedule(this.CHANGE_FULL);
											this.setTheme(defaultTheme);
											this.$windowFocus = this.$windowFocus.bind(this);
											window.addEventListener("focus", this.$windowFocus);
										};
										(function() {
											this.CHANGE_SCROLL = 1;
											this.CHANGE_COLUMN = 2;
											this.CHANGE_ROW = 4;
											this.CHANGE_CELLS = 8;
											this.CHANGE_SIZE = 16;
											this.CHANGE_CLASS = 32;
											this.CHANGE_MARKER = 64;
											this.CHANGE_FULL = 128;
											this.CHANGE_H_SCROLL = 1024;
											oop.implement(this, EventEmitter);
											this.setDataProvider = function(provider) {
												this.provider = provider;
												this.model = provider;
												if (this.scrollMargin.top && provider && provider.getScrollTop() <= 0) provider.setScrollTop(-this.scrollMargin.top);
												this.scroller.className = "ace_tree_scroller";
												this.$cellLayer.setDataProvider(provider);
												this.$markerLayer.setDataProvider(provider);
												this.$headingLayer.setDataProvider(provider);
												this.$size.headingHeight = provider && provider.columns ? provider.headerHeight || provider.rowHeight : 0;
												this.$loop.schedule(this.CHANGE_FULL);
											};
											this.updateRows = function(firstRow, lastRow) {
												if (lastRow === void 0) lastRow = Infinity;
												if (!this.$changedLines) this.$changedLines = {
													firstRow,
													lastRow
												};
												else {
													if (this.$changedLines.firstRow > firstRow) this.$changedLines.firstRow = firstRow;
													if (this.$changedLines.lastRow < lastRow) this.$changedLines.lastRow = lastRow;
												}
												if (this.$changedLines.firstRow > this.layerConfig.lastRow || this.$changedLines.lastRow < this.layerConfig.firstRow) return;
												this.$loop.schedule(this.CHANGE_ROW);
											};
											this.updateCaret = function() {
												this.$loop.schedule(this.CHANGE_CLASS);
											};
											this.updateCells = function() {
												this.$loop.schedule(this.CHANGE_CELLS);
											};
											this.updateFull = function(force) {
												if (force) this.$renderChanges(this.CHANGE_FULL, true);
												else this.$loop.schedule(this.CHANGE_FULL);
											};
											this.updateHorizontalHeadings = function() {
												this.$loop.schedule(this.CHANGE_COLUMN);
											};
											this.updateVerticalHeadings = function() {
												this.$loop.schedule(this.CHANGE_ROW);
											};
											this.$changes = 0;
											this.onResize = function(force, width, height) {
												if (this.resizing > 2) return;
												else if (this.resizing > 0) this.resizing++;
												else this.resizing = force ? 1 : 0;
												var el = this.container;
												if (!height) height = el.clientHeight || el.scrollHeight;
												if (!width) width = el.clientWidth || el.scrollWidth;
												var changes = this.$updateCachedSize(force, width, height);
												if (!this.$size.scrollerHeight || !width && !height) return this.resizing = 0;
												if (force) this.$renderChanges(changes, true);
												else this.$loop.schedule(changes | this.$changes);
												if (this.resizing) this.resizing = 0;
											};
											this.$windowFocus = function() {
												this.onResize();
											};
											this.$updateCachedSize = function(force, width, height) {
												var changes = 0;
												var size = this.$size;
												var provider = this.provider;
												if (provider) {
													var headingHeight = provider.columns ? provider.headerHeight || provider.rowHeight : 0;
													if (headingHeight != size.headingHeight) {
														size.headingHeight = headingHeight;
														changes |= this.CHANGE_SIZE;
													}
												}
												if (height && (force || size.height != height)) {
													size.height = height;
													changes |= this.CHANGE_SIZE;
													size.scrollerHeight = size.height;
													if (this.$horizScroll) size.scrollerHeight -= this.scrollBarH.getHeight();
													size.scrollerHeight -= size.headingHeight;
													this.$headingLayer.element.style.height = this.scroller.style.top = this.scrollBarV.element.style.top = size.headingHeight + "px";
													this.scrollBarV.element.style.bottom = this.scrollBarH.getHeight() + "px";
													if (provider && provider.setScrollTop) changes |= this.CHANGE_SCROLL;
													if (this.$scrollIntoView) {
														if (this.$scrollIntoView.model == this.model) {
															this.scrollCaretIntoView(this.$scrollIntoView.caret, this.$scrollIntoView.offset);
															this.$scrollIntoView = null;
														}
													}
												}
												if (width && (force || size.width != width)) {
													changes |= this.CHANGE_SIZE;
													size.width = width;
													this.scrollBarH.element.style.left = this.scroller.style.left = "0px";
													size.scrollerWidth = Math.max(0, width - this.scrollBarV.getWidth());
													this.$headingLayer.element.style.right = this.scrollBarH.element.style.right = this.scroller.style.right = this.scrollBarV.getWidth() + "px";
													this.scroller.style.bottom = this.scrollBarH.getHeight() + "px";
													this.$headingLayer.updateWidth(size.scrollerWidth);
													if (provider && provider.columns) changes |= this.CHANGE_FULL;
												}
												if (changes) this._signal("resize");
												return changes;
											};
											this.setVerHeadingVisible = function(value) {
												this.$treeLayer.visible = value;
												if (this.layerConfig.vRange && this.layerConfig.hRange) {
													this.$renderChanges(this.CHANGE_FULL, true);
													this.onResize(true);
												}
											};
											this.getContainerElement = function() {
												return this.container;
											};
											this.getMouseEventTarget = function() {
												return this.scroller;
											};
											this.getVisibleNodes = function(tolerance) {
												var nodes = this.layerConfig.vRange;
												var first = 0;
												var last = nodes.length - 1;
												while (this.isNodeVisible(nodes[first], tolerance) && first < last) first++;
												while (!this.isNodeVisible(nodes[last], tolerance) && last > first) last--;
												return nodes.slice(first, last + 1);
											};
											this.isNodeVisible = function(node, tolerance) {
												var layerConfig = this.layerConfig;
												if (!layerConfig.vRange) return;
												var provider = this.provider;
												if (layerConfig.vRange.indexOf(node) == -1) return false;
												var nodePos = provider.getNodePosition(node);
												var top = nodePos.top;
												var height = nodePos.height;
												if (tolerance === void 0) tolerance = 1 / 3;
												if (this.scrollTop > top + tolerance * height) return false;
												if (this.scrollTop + this.$size.scrollerHeight <= top + (1 - tolerance) * height) return false;
												return true;
											};
											this.$updateScrollBar = function() {
												this.$updateScrollBarH();
												this.$updateScrollBarV();
											};
											this.setScrollMargin = function(top, bottom, left, right) {
												var sm = this.scrollMargin;
												sm.top = top | 0;
												sm.bottom = bottom | 0;
												sm.right = right | 0;
												sm.left = left | 0;
												sm.v = sm.top + sm.bottom;
												sm.h = sm.left + sm.right;
												if (sm.top && this.scrollTop <= 0 && this.provider) this.provider.setScrollTop(-sm.top);
												this.updateFull();
											};
											this.$updateScrollBarV = function() {
												this.scrollBarV.setInnerHeight(this.layerConfig.maxHeight + this.scrollMargin.v);
												this.scrollBarV.setScrollTop(this.scrollTop + this.scrollMargin.top);
											};
											this.$updateScrollBarH = function() {
												this.scrollBarH.setInnerWidth(this.layerConfig.maxWidth + this.scrollMargin.h);
												this.scrollBarH.setScrollLeft(this.scrollLeft + this.scrollMargin.left);
											};
											this.$frozen = false;
											this.freeze = function() {
												this.$frozen = true;
											};
											this.unfreeze = function() {
												this.$frozen = false;
											};
											this.$renderChanges = function(changes, force) {
												if (this.$changes) {
													changes |= this.$changes;
													this.$changes = 0;
												}
												if (!this.provider || !this.container.offsetWidth || this.$frozen || !changes && !force) {
													this.$changes |= changes;
													return;
												}
												if (!this.$size.width) {
													this.$changes |= changes;
													return this.onResize(true);
												}
												this._signal("beforeRender");
												var config2 = this.layerConfig;
												if (changes & this.CHANGE_FULL || changes & this.CHANGE_SIZE || changes & this.CHANGE_SCROLL || changes & this.CHANGE_H_SCROLL || changes & this.CHANGE_COLUMN || changes & this.CHANGE_ROW || changes & this.CHANGE_CELLS) {
													changes |= this.$computeLayerConfig();
													config2 = this.layerConfig;
													this.$updateScrollBar();
													this.cells.style.marginTop = -config2.vOffset + "px";
													this.cells.style.marginLeft = -config2.hOffset + "px";
													this.cells.style.width = config2.width + "px";
													this.cells.style.height = config2.height + config2.rowHeight + "px";
												}
												if (changes & this.CHANGE_FULL) {
													this.$headingLayer.update(this.layerConfig);
													this.$cellLayer.update(this.layerConfig);
													this.$markerLayer.update(this.layerConfig);
													this._signal("afterRender");
													return;
												}
												if (changes & this.CHANGE_SCROLL) {
													if (changes & this.CHANGE_ROW || changes & this.CHANGE_COLUMN || changes & this.CHANGE_CELLS) {
														this.$headingLayer.update(this.layerConfig);
														this.$cellLayer.update(this.layerConfig);
													} else {
														this.$headingLayer.update(this.layerConfig);
														this.$cellLayer.scroll(this.layerConfig);
													}
													this.$markerLayer.update(this.layerConfig);
													this.$updateScrollBar();
													this._signal("afterRender");
													return;
												}
												if (changes & this.CHANGE_CLASS) this.$cellLayer.updateClasses(this.layerConfig);
												if (changes & this.CHANGE_MARKER || changes & this.CHANGE_CELLS) this.$markerLayer.update(this.layerConfig);
												if (changes & this.CHANGE_COLUMN) this.$horHeadingLayer.update(this.layerConfig);
												if (changes & this.CHANGE_CELLS) this.$cellLayer.update(this.layerConfig);
												if (changes & this.CHANGE_SIZE) this.$updateScrollBar();
												this._signal("afterRender");
												if (this.$scrollIntoView) this.$scrollIntoView = null;
											};
											this.$autosize = function() {
												var headingHeight = this.$size.headingHeight;
												var height = this.provider.getTotalHeight() + headingHeight;
												var maxHeight = this.getMaxHeight ? this.getMaxHeight() : this.$maxLines * this.provider.rowHeight + headingHeight;
												var desiredHeight = Math.max((this.$minLines || 1) * this.provider.rowHeight + headingHeight, Math.min(maxHeight, height)) + this.scrollMargin.v;
												var vScroll = height > maxHeight;
												if (desiredHeight != this.desiredHeight || this.$size.height != this.desiredHeight || vScroll != this.$vScroll) {
													if (vScroll != this.$vScroll) {
														this.$vScroll = vScroll;
														this.scrollBarV.setVisible(vScroll);
													}
													var w = this.container.clientWidth;
													this.container.style.height = desiredHeight + "px";
													this.$updateCachedSize(true, w, desiredHeight);
													this.desiredHeight = desiredHeight;
													this._signal("autoresize");
												}
											};
											this.$computeLayerConfig = function() {
												if (this.$maxLines) this.$autosize();
												var provider = this.provider;
												this.$treeLayer;
												this.$horHeadingLayer;
												var minHeight = this.$size.scrollerHeight;
												var maxHeight = provider.getTotalHeight();
												var minWidth = this.$size.scrollerWidth;
												var maxWidth = 0;
												var hideScrollbars = this.$size.height <= 20;
												var horizScroll = !hideScrollbars && (this.$hScrollBarAlwaysVisible || this.$size.scrollerWidth - maxWidth < 0);
												var hScrollChanged = this.$horizScroll !== horizScroll;
												if (hScrollChanged) {
													this.$horizScroll = horizScroll;
													this.scrollBarH.setVisible(horizScroll);
												}
												var vScroll = !hideScrollbars && (this.$vScrollBarAlwaysVisible || this.$size.scrollerHeight - maxHeight < 0);
												var vScrollChanged = this.$vScroll !== vScroll;
												if (vScrollChanged) {
													this.$vScroll = vScroll;
													this.scrollBarV.setVisible(vScroll);
												}
												this.provider.setScrollTop(Math.max(-this.scrollMargin.top, Math.min(this.scrollTop, maxHeight - this.$size.scrollerHeight + this.scrollMargin.bottom)));
												this.provider.setScrollLeft(Math.max(-this.scrollMargin.left, Math.min(this.scrollLeft, maxWidth - this.$size.scrollerWidth + this.scrollMargin.right)));
												if (this.provider.getScrollTop() != this.scrollTop) this.scrollTop = this.provider.getScrollTop();
												var top = Math.max(this.scrollTop, 0);
												var vRange = provider.getRange(top, top + this.$size.height);
												var hRange = { size: 0 };
												var vOffset = this.scrollTop - vRange.size;
												var hOffset = this.scrollLeft - hRange.size;
												var rowCount = vRange.length;
												var firstRow = vRange.count;
												var lastRow = firstRow + rowCount - 1;
												var colCount = hRange.length;
												var firstCol = hRange.count;
												var lastCol = firstCol + colCount - 1;
												if (this.layerConfig) this.layerConfig.discard = true;
												var changes = 0;
												if (hScrollChanged || vScrollChanged) {
													changes = this.$updateCachedSize(true, this.$size.width, this.$size.height);
													this._signal("scrollbarVisibilityChanged");
												}
												this.layerConfig = {
													vRange,
													hRange,
													width: minWidth,
													height: minHeight,
													firstRow,
													lastRow,
													firstCol,
													lastCol,
													minHeight,
													maxHeight,
													minWidth,
													maxWidth,
													vOffset,
													hOffset,
													rowHeight: provider.rowHeight
												};
												var config2 = this.layerConfig, renderer = this;
												if (vRange) config2.view = provider.getDataRange({
													start: vRange.count,
													length: vRange.length
												}, {
													start: hRange.count,
													length: hRange.length
												}, function(err, view, update) {
													if (err) return false;
													config2.view = view;
													if (update) renderer.$loop.schedule(renderer.CHANGE_CELLS);
												});
												return changes;
											};
											this.$updateRows = function() {
												var firstRow = this.$changedLines.firstRow;
												var lastRow = this.$changedLines.lastRow;
												this.$changedLines = null;
												var layerConfig = this.layerConfig;
												if (firstRow > layerConfig.lastRow + 1) return;
												if (lastRow < layerConfig.firstRow) return;
												if (lastRow === Infinity) {
													this.$cellLayer.update(layerConfig);
													return;
												}
												this.$cellLayer.updateRows(layerConfig, firstRow, lastRow);
												return true;
											};
											this.scrollSelectionIntoView = function(anchor, lead, offset) {
												this.scrollCaretIntoView(anchor, offset);
												this.scrollCaretIntoView(lead, offset);
											};
											this.scrollCaretIntoView = function(caret, offset) {
												this.$scrollIntoView = {
													caret,
													offset,
													scrollTop: this.scrollTop,
													model: this.model,
													height: this.$size.scrollerHeight
												};
												if (this.$size.scrollerHeight === 0) return;
												var provider = this.provider;
												var node = caret || provider.selection.getCursor();
												if (!node) return;
												var nodePos = provider.getNodePosition(node);
												var top = nodePos.top;
												var height = nodePos.height;
												var left = 0;
												var width = 0;
												if (this.scrollTop > top) {
													if (offset) top -= offset * this.$size.scrollerHeight;
													if (top === 0) top = -this.scrollMargin.top;
													this.provider.setScrollTop(top);
												} else if (this.scrollTop + this.$size.scrollerHeight < top + height) {
													if (offset) top += offset * this.$size.scrollerHeight;
													this.provider.setScrollTop(top + height - this.$size.scrollerHeight);
												}
												var scrollLeft = this.scrollLeft;
												if (scrollLeft > left) {
													if (left < 0) left = 0;
													this.provider.setScrollLeft(left);
												} else if (scrollLeft + this.$size.scrollerWidth < left + width) this.provider.setScrollLeft(Math.round(left + width - this.$size.scrollerWidth));
												this.$scrollIntoView.scrollTop = this.scrollTop;
											};
											this.getScrollTop = function() {
												return this.scrollTop;
											};
											this.getScrollLeft = function() {
												return this.scrollLeft;
											};
											this.setScrollTop = function(scrollTop) {
												scrollTop = Math.round(scrollTop);
												if (this.scrollTop === scrollTop || isNaN(scrollTop)) return;
												this.scrollToY(scrollTop);
											};
											this.setScrollLeft = function(scrollLeft) {
												scrollLeft = Math.round(scrollLeft);
												if (this.scrollLeft === scrollLeft || isNaN(scrollLeft)) return;
												this.scrollToX(scrollLeft);
											};
											this.getScrollTopRow = function() {
												return this.layerConfig.firstRow;
											};
											this.getScrollBottomRow = function() {
												return this.layerConfig.lastRow;
											};
											this.alignCaret = function(cursor, alignment) {
												if (typeof cursor == "number") cursor = {
													row: cursor,
													column: 0
												};
												var node = this.provider.findNodeByIndex(cursor.row);
												var offset = this.provider.findSizeAtIndex(cursor.row) - (this.$size.scrollerHeight - node.size) * (alignment || 0);
												this.setScrollTop(offset);
												return offset;
											};
											this.STEPS = 8;
											this.$calcSteps = function(fromValue, toValue) {
												var i = 0;
												var l = this.STEPS;
												var steps = [];
												var func = function(t, x_min, dx) {
													return dx * (Math.pow(t - 1, 3) + 1) + x_min;
												};
												for (i = 0; i < l; ++i) steps.push(func(i / this.STEPS, fromValue, toValue - fromValue));
												return steps;
											};
											this.scrollToRow = function(row, center, animate, callback) {
												var node = this.provider.findNodeByIndex(row);
												var offset = this.provider.findSizeAtIndex(row);
												if (center) offset -= (this.$size.scrollerHeight - node.size) / 2;
												var initialScroll = this.scrollTop;
												this.setScrollTop(offset);
												if (animate !== false) this.animateScrolling(initialScroll, callback);
											};
											this.animateScrolling = function(fromValue, callback) {
												var toValue = this.scrollTop;
												if (!this.$animatedScroll) return;
												var _self = this;
												if (fromValue == toValue) return;
												if (this.$scrollAnimation) {
													var oldSteps = this.$scrollAnimation.steps;
													if (oldSteps.length) {
														fromValue = oldSteps[0];
														if (fromValue == toValue) return;
													}
												}
												var steps = _self.$calcSteps(fromValue, toValue);
												this.$scrollAnimation = {
													from: fromValue,
													to: toValue,
													steps
												};
												clearInterval(this.$timer);
												_self.provider.setScrollTop(steps.shift());
												_self.provider.$scrollTop = toValue;
												this.$timer = setInterval(function() {
													if (steps.length) {
														_self.provider.setScrollTop(steps.shift());
														_self.provider.$scrollTop = toValue;
													} else if (toValue != null) {
														_self.provider.$scrollTop = -1;
														_self.provider.setScrollTop(toValue);
														toValue = null;
													} else {
														_self.$timer = clearInterval(_self.$timer);
														_self.$scrollAnimation = null;
														callback && callback();
													}
												}, 10);
											};
											this.scrollToY = function(scrollTop) {
												if (this.scrollTop !== scrollTop) {
													this.$loop.schedule(this.CHANGE_SCROLL);
													this.scrollTop = scrollTop;
												}
											};
											this.scrollToX = function(scrollLeft) {
												if (scrollLeft < 0) scrollLeft = 0;
												if (this.scrollLeft !== scrollLeft) {
													this.$loop.schedule(this.CHANGE_SCROLL);
													this.scrollLeft = scrollLeft;
												}
											};
											this.scrollBy = function(deltaX, deltaY) {
												deltaY && this.provider.setScrollTop(this.provider.getScrollTop() + deltaY);
												deltaX && this.provider.setScrollLeft(this.provider.getScrollLeft() + deltaX);
											};
											this.isScrollableBy = function(deltaX, deltaY) {
												if (deltaY < 0 && this.getScrollTop() >= 1 - this.scrollMargin.top) return true;
												if (deltaY > 0 && this.getScrollTop() + this.$size.scrollerHeight - this.layerConfig.maxHeight < -1 + this.scrollMargin.bottom) return true;
												if (deltaX < 0 && this.getScrollLeft() >= 1) return true;
												if (deltaX > 0 && this.getScrollLeft() + this.$size.scrollerWidth - this.layerConfig.maxWidth < -1) return true;
											};
											this.screenToTextCoordinates = function(x, y) {
												var canvasPos = this.scroller.getBoundingClientRect();
												y -= canvasPos.top;
												x -= canvasPos.left;
												return {
													x: x + this.scrollLeft,
													y: y + this.scrollTop
												};
											};
											this.textToScreenCoordinates = function(row, column) {
												throw new Error();
											};
											this.findNodeAt = function(x, y, coords) {};
											this.$moveTextAreaToCursor = function() {};
											this.visualizeFocus = function() {
												dom$1.addCssClass(this.container, "ace_tree_focus");
											};
											this.visualizeBlur = function() {
												dom$1.removeCssClass(this.container, "ace_tree_focus");
											};
											this.setTheme = function(theme, cb) {
												var _self = this;
												this.$themeValue = theme;
												_self._dispatchEvent("themeChange", { theme });
												if (!theme || typeof theme == "string") {
													var moduleName = theme || "ace/theme/textmate";
													config.loadModule(["theme", moduleName], afterLoad);
												} else afterLoad(theme);
												function afterLoad(module4) {
													if (_self.$themeValue != theme) return cb && cb();
													if (!module4.cssClass) return;
													dom$1.importCssString(module4.cssText, module4.cssClass, _self.container.ownerDocument);
													if (_self.theme) dom$1.removeCssClass(_self.container, _self.theme.cssClass);
													_self.$theme = module4.cssClass;
													_self.theme = module4;
													dom$1.addCssClass(_self.container, module4.cssClass);
													dom$1.setCssClass(_self.container, "ace_dark", module4.isDark);
													var padding = module4.padding || 4;
													if (_self.$padding && padding != _self.$padding) _self.setPadding(padding);
													if (_self.$size) {
														_self.$size.width = 0;
														_self.onResize();
													}
													_self._dispatchEvent("themeLoaded", { theme: module4 });
													cb && cb();
												}
											};
											this.getTheme = function() {
												return this.$themeValue;
											};
											this.setStyle = function setStyle(style, include) {
												dom$1.setCssClass(this.container, style, include !== false);
											};
											this.unsetStyle = function unsetStyle(style) {
												dom$1.removeCssClass(this.container, style);
											};
											this.destroy = function() {
												window.removeEventListener("focus", this.$windowFocus);
												this.$cellLayer.destroy();
											};
										}).call(VirtualRenderer.prototype);
										config.defineOptions(VirtualRenderer.prototype, "renderer", {
											animatedScroll: { initialValue: true },
											showInvisibles: {
												set: function(value) {
													if (this.$cellLayer.setShowInvisibles(value)) this.$loop.schedule(this.CHANGE_TEXT);
												},
												initialValue: false
											},
											showPrintMargin: {
												set: function() {
													this.$updatePrintMargin();
												},
												initialValue: true
											},
											printMarginColumn: {
												set: function() {
													this.$updatePrintMargin();
												},
												initialValue: 80
											},
											printMargin: {
												set: function(val) {
													if (typeof val == "number") this.$printMarginColumn = val;
													this.$showPrintMargin = !!val;
													this.$updatePrintMargin();
												},
												get: function() {
													return this.$showPrintMargin && this.$printMarginColumn;
												}
											},
											displayIndentGuides: {
												set: function(show) {
													if (this.$cellLayer.setDisplayIndentGuides(show)) this.$loop.schedule(this.CHANGE_TEXT);
												},
												initialValue: true
											},
											hScrollBarAlwaysVisible: {
												set: function(alwaysVisible) {
													this.$hScrollBarAlwaysVisible = alwaysVisible;
													if (!this.$hScrollBarAlwaysVisible || !this.$horizScroll) this.$loop.schedule(this.CHANGE_SCROLL);
												},
												initialValue: false
											},
											vScrollBarAlwaysVisible: {
												set: function(val) {
													if (!this.$vScrollBarAlwaysVisible || !this.$vScroll) this.$loop.schedule(this.CHANGE_SCROLL);
												},
												initialValue: false
											},
											fontSize: {
												set: function(size) {
													if (typeof size == "number") size = size + "px";
													this.container.style.fontSize = size;
													this.updateFontSize();
												},
												initialValue: 12
											},
											fontFamily: { set: function(name$1) {
												this.container.style.fontFamily = name$1;
												this.updateFontSize();
											} },
											maxLines: { set: function(val) {
												this.updateFull();
											} },
											minLines: { set: function(val) {
												this.updateFull();
											} },
											scrollPastEnd: {
												set: function(val) {
													val = +val || 0;
													if (this.$scrollPastEnd == val) return;
													this.$scrollPastEnd = val;
													this.$loop.schedule(this.CHANGE_SCROLL);
												},
												initialValue: 0,
												handlesSet: true
											}
										});
										exports3.VirtualRenderer = VirtualRenderer;
									}.call(exports2, __webpack_require__2, exports2, module2);
									__WEBPACK_AMD_DEFINE_RESULT__ !== void 0 && (module2.exports = __WEBPACK_AMD_DEFINE_RESULT__);
								}),
								28: ((module2) => {
									module2.exports = ".ace_tree-light.ace_tree{\n    font: 12px Arial;\n}\n\n.ace_tree_selection_range{\n    background : rgba(0, 110, 255, 0.2);\n    border : 1px solid rgba(0,0,0,0.1);\n}\n.ace_tree_focus .ace_tree_selection_range{\n    \n}\n\n.ace_tree-light .toggler {\n    overflow: visible;\n    width: 10px;\n    height: 10px;\n}\n\n.ace_tree-light .tree-row .caption {\n    padding : 4px 5px;\n}\n.ace_tree-light .tree-row > .caption {\n    overflow: visible;\n    display: inline-block;\n}\n.ace_tree-light .tree-row {\n    border: 1px solid transparent;\n    -moz-box-sizing: border-box;\n    box-sizing: border-box;\n}\n.ace_tree-light .tree-row:hover,\n.ace_tree-light .tree-row.hover{\n    background: rgba(0, 0, 0, 0.03);\n}\n.ace_tree-light .tree-row.selected {\n    background: rgba(0, 0, 0, 0.04);\n}\n\n.ace_tree_focus.ace_tree-light .tree-row.selected {\n    background: -webkit-gradient(linear, left top, left bottom, from(#2890E5), color-stop(1, #1F82D2));\n    background: -moz-linear-gradient(center bottom, #1f82d2 0%, #2890e5 100%) repeat scroll 0 0 transparent;\n    background: linear-gradient(center bottom, #1f82d2 0%, #2890e5 100%) repeat scroll 0 0 transparent;\n    color: #f8f8f8;\n}\n\n\n/* datagrid */\n\n.ace_tree-light .tree-row>.tree-column {\n    border: 1px solid rgb(204, 204, 204);\n    border-width: 0 1px 1px 0;\n    padding: 4px 5px;\n}\n\n.ace_tree-light .tree-row.selected>.tree-column {\n    background: transparent;\n}\n.ace_tree-light .tree-headings {\n    background: rgb(253, 253, 253);\n}\n.ace_tree-light .tree-headings>.tree-column {\n    background: transparent;\n    padding: 5px 3px;\n}\n\n.ace_tree-light .tree-headings>.tree-column-resizer {\n    height: 100%;\n    background: rgb(182, 182, 182);\n    display: inline-block;\n    width: 1px;\n    z-index: 1000;\n    position: absolute;\n    margin-left: -1px;\n    border-left: 1px solid rgba(0, 0, 0, 0);\n}\n";
								}),
								268: ((module2) => {
									module2.exports = ".ace_tree{\n    overflow : hidden;\n    font : 12px Tahoma, Arial;\n    cursor: default;\n    position: relative;\n    white-space: pre;\n}\n\n.ace_tree textarea{\n    position : absolute;\n    z-index : 0;\n}\n\n.ace_tree_scroller {\n    position: absolute;\n    overflow: hidden;\n    top: 0;\n    bottom: 0;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n         -o-user-select: none;\n            user-select: none;\n}\n\n.ace_tree_content {\n    position: absolute;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n}\n\n.ace_scrollbar {\n    position: absolute;\n    overflow-x: hidden;\n    overflow-y: auto;\n    right: 0;\n    bottom: 0;\n}\n\n.ace_scrollbar-inner {\n    position: absolute;\n    cursor: text;\n    left: 0;\n    top: 0;\n}\n\n.ace_scrollbar-h {\n    position: absolute;\n    overflow-x: auto;\n    overflow-y: hidden;\n    right: 0;\n    left: 0;\n    bottom: 0;\n}\n\n.ace_tree_horheading {\n    position : absolute;\n}\n\n.ace_tree_verheading{\n    bottom : 0;\n    position : absolute;\n}\n\n.ace_tree_heading {\n    z-index: 10;\n    position: relative;\n    white-space: nowrap;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box;\n    pointer-events: none;\n}\n\n.ace_tree_layer {\n    z-index: 1;\n    position: absolute;\n    overflow: hidden;\n    white-space: nowrap;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box;\n    pointer-events: none;\n}\n\n.ace_tree .tree-indent {\n    display : inline-block;\n}\n\n.ace_tree_selection_range{\n    position : absolute;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box;\n}\n.ace_tree_focus .ace_tree_selection_range{\n    \n}\n\n.ace_tree-editor {\n    position : absolute;\n    z-index : 10000;\n    background : white;\n    padding : 3px 4px 3px 4px;\n    -moz-box-sizing : border-box;\n         box-sizing : border-box;\n    border : 1px dotted green;\n    left: 0;\n    right: 0\n}\n\n\n\n.ace_tree .toggler {\n    width: 10px;\n    height: 10px;\n    background-repeat: no-repeat;\n    background-position: 0px 0px;\n    background-repeat: no-repeat;\n    cursor: pointer;\n    display: inline-block;\n    pointer-events: auto;\n}\n\n.ace_tree .toggler.empty {\n    pointer-events: none;\n}\n\n.ace_tree .toggler.open {\n    background-position: -10px 0px;\n}\n\n.ace_tree .toggler.empty {\n    background-position: 50px 0px;\n    cursor: default;\n}\n\n.ace_tree_cells, .ace_tree_cell-layer {\n    width: 100%;\n}\n.ace_tree_selection-layer {\n    width: 100%;\n    height: 110%;\n}\n.ace_tree_cells .message.empty {\n    text-align: center;\n    opacity: 0.9;\n    cursor : default;\n}\n\n/* datagrid */\n\n.ace_tree .tree-row>.tree-column {\n    display: inline-block;\n    overflow: hidden;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box;\n}\n\n\n.tree-headings {\n    white-space: nowrap;\n    position: absolute;\n    overflow: hidden;\n    top: 0;\n    left: 0;\n    right: 0;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box;\n}\n.tree-headings>.tree-column {\n    display: inline-block;\n    -webkit-box-sizing: border-box;\n       -moz-box-sizing: border-box;\n            box-sizing: border-box;\n}\n\n.tree-headings>.tree-column-resizer {\n    height: 100%;\n    background: rgb(182, 182, 182);\n    display: inline-block;\n    width: 2px;\n    z-index: 1000;\n    position: absolute;\n    margin-left: -2px;\n    border-left: 1px solid rgba(0, 0, 0, 0);\n}\n";
								})
							};
							var __webpack_module_cache__$1 = {};
							function __nested_webpack_require_262623__(moduleId) {
								var cachedModule = __webpack_module_cache__$1[moduleId];
								if (cachedModule !== void 0) return cachedModule.exports;
								var module2 = __webpack_module_cache__$1[moduleId] = { exports: {} };
								__webpack_modules__$1[moduleId](module2, module2.exports, __nested_webpack_require_262623__);
								return module2.exports;
							}
							__nested_webpack_require_262623__.n = (module2) => {
								var getter = module2 && module2.__esModule ? (() => module2["default"]) : (() => module2);
								__nested_webpack_require_262623__.d(getter, { a: getter });
								return getter;
							};
							__nested_webpack_require_262623__.d = (exports2, definition) => {
								for (var key in definition) if (__nested_webpack_require_262623__.o(definition, key) && !__nested_webpack_require_262623__.o(exports2, key)) Object.defineProperty(exports2, key, {
									enumerable: true,
									get: definition[key]
								});
							};
							__nested_webpack_require_262623__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
							__nested_webpack_require_262623__.r = (exports2) => {
								if (typeof Symbol !== "undefined" && Symbol.toStringTag) Object.defineProperty(exports2, Symbol.toStringTag, { value: "Module" });
								Object.defineProperty(exports2, "__esModule", { value: true });
							};
							var __nested_webpack_exports__ = {};
							(() => {
								"use strict";
								__nested_webpack_require_262623__.r(__nested_webpack_exports__);
								__nested_webpack_require_262623__.d(__nested_webpack_exports__, {
									DataProvider: () => _src_data_provider__WEBPACK_IMPORTED_MODULE_1__,
									Tree: () => _src_tree__WEBPACK_IMPORTED_MODULE_0__
								});
								var _src_tree__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_262623__(336);
								var _src_data_provider__WEBPACK_IMPORTED_MODULE_1__ = __nested_webpack_require_262623__(950);
							})();
							return __nested_webpack_exports__;
						})();
					});
				}),
				46: ((module$1) => {
					"use strict";
					var R = typeof Reflect === "object" ? Reflect : null;
					var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply$1(target, receiver, args) {
						return Function.prototype.apply.call(target, receiver, args);
					};
					var ReflectOwnKeys;
					if (R && typeof R.ownKeys === "function") ReflectOwnKeys = R.ownKeys;
					else if (Object.getOwnPropertySymbols) ReflectOwnKeys = function ReflectOwnKeys$1(target) {
						return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
					};
					else ReflectOwnKeys = function ReflectOwnKeys$1(target) {
						return Object.getOwnPropertyNames(target);
					};
					function ProcessEmitWarning(warning) {
						if (console && console.warn) console.warn(warning);
					}
					var NumberIsNaN = Number.isNaN || function NumberIsNaN$1(value) {
						return value !== value;
					};
					function EventEmitter() {
						EventEmitter.init.call(this);
					}
					module$1.exports = EventEmitter;
					module$1.exports.once = once;
					EventEmitter.EventEmitter = EventEmitter;
					EventEmitter.prototype._events = void 0;
					EventEmitter.prototype._eventsCount = 0;
					EventEmitter.prototype._maxListeners = void 0;
					var defaultMaxListeners = 10;
					function checkListener(listener) {
						if (typeof listener !== "function") throw new TypeError("The \"listener\" argument must be of type Function. Received type " + typeof listener);
					}
					Object.defineProperty(EventEmitter, "defaultMaxListeners", {
						enumerable: true,
						get: function() {
							return defaultMaxListeners;
						},
						set: function(arg) {
							if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) throw new RangeError("The value of \"defaultMaxListeners\" is out of range. It must be a non-negative number. Received " + arg + ".");
							defaultMaxListeners = arg;
						}
					});
					EventEmitter.init = function() {
						if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
							this._events = Object.create(null);
							this._eventsCount = 0;
						}
						this._maxListeners = this._maxListeners || void 0;
					};
					EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
						if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) throw new RangeError("The value of \"n\" is out of range. It must be a non-negative number. Received " + n + ".");
						this._maxListeners = n;
						return this;
					};
					function _getMaxListeners(that) {
						if (that._maxListeners === void 0) return EventEmitter.defaultMaxListeners;
						return that._maxListeners;
					}
					EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
						return _getMaxListeners(this);
					};
					EventEmitter.prototype.emit = function emit(type) {
						var args = [];
						for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
						var doError = type === "error";
						var events = this._events;
						if (events !== void 0) doError = doError && events.error === void 0;
						else if (!doError) return false;
						if (doError) {
							var er;
							if (args.length > 0) er = args[0];
							if (er instanceof Error) throw er;
							var err = /* @__PURE__ */ new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
							err.context = er;
							throw err;
						}
						var handler = events[type];
						if (handler === void 0) return false;
						if (typeof handler === "function") ReflectApply(handler, this, args);
						else {
							var len = handler.length;
							var listeners = arrayClone(handler, len);
							for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
						}
						return true;
					};
					function _addListener(target, type, listener, prepend) {
						var m;
						var events;
						var existing;
						checkListener(listener);
						events = target._events;
						if (events === void 0) {
							events = target._events = Object.create(null);
							target._eventsCount = 0;
						} else {
							if (events.newListener !== void 0) {
								target.emit("newListener", type, listener.listener ? listener.listener : listener);
								events = target._events;
							}
							existing = events[type];
						}
						if (existing === void 0) {
							existing = events[type] = listener;
							++target._eventsCount;
						} else {
							if (typeof existing === "function") existing = events[type] = prepend ? [listener, existing] : [existing, listener];
							else if (prepend) existing.unshift(listener);
							else existing.push(listener);
							m = _getMaxListeners(target);
							if (m > 0 && existing.length > m && !existing.warned) {
								existing.warned = true;
								var w = /* @__PURE__ */ new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
								w.name = "MaxListenersExceededWarning";
								w.emitter = target;
								w.type = type;
								w.count = existing.length;
								ProcessEmitWarning(w);
							}
						}
						return target;
					}
					EventEmitter.prototype.addListener = function addListener(type, listener) {
						return _addListener(this, type, listener, false);
					};
					EventEmitter.prototype.on = EventEmitter.prototype.addListener;
					EventEmitter.prototype.prependListener = function prependListener(type, listener) {
						return _addListener(this, type, listener, true);
					};
					function onceWrapper() {
						if (!this.fired) {
							this.target.removeListener(this.type, this.wrapFn);
							this.fired = true;
							if (arguments.length === 0) return this.listener.call(this.target);
							return this.listener.apply(this.target, arguments);
						}
					}
					function _onceWrap(target, type, listener) {
						var state = {
							fired: false,
							wrapFn: void 0,
							target,
							type,
							listener
						};
						var wrapped = onceWrapper.bind(state);
						wrapped.listener = listener;
						state.wrapFn = wrapped;
						return wrapped;
					}
					EventEmitter.prototype.once = function once$1(type, listener) {
						checkListener(listener);
						this.on(type, _onceWrap(this, type, listener));
						return this;
					};
					EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
						checkListener(listener);
						this.prependListener(type, _onceWrap(this, type, listener));
						return this;
					};
					EventEmitter.prototype.removeListener = function removeListener(type, listener) {
						var list, events, position, i, originalListener;
						checkListener(listener);
						events = this._events;
						if (events === void 0) return this;
						list = events[type];
						if (list === void 0) return this;
						if (list === listener || list.listener === listener) if (--this._eventsCount === 0) this._events = Object.create(null);
						else {
							delete events[type];
							if (events.removeListener) this.emit("removeListener", type, list.listener || listener);
						}
						else if (typeof list !== "function") {
							position = -1;
							for (i = list.length - 1; i >= 0; i--) if (list[i] === listener || list[i].listener === listener) {
								originalListener = list[i].listener;
								position = i;
								break;
							}
							if (position < 0) return this;
							if (position === 0) list.shift();
							else spliceOne(list, position);
							if (list.length === 1) events[type] = list[0];
							if (events.removeListener !== void 0) this.emit("removeListener", type, originalListener || listener);
						}
						return this;
					};
					EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
					EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
						var listeners, events = this._events, i;
						if (events === void 0) return this;
						if (events.removeListener === void 0) {
							if (arguments.length === 0) {
								this._events = Object.create(null);
								this._eventsCount = 0;
							} else if (events[type] !== void 0) if (--this._eventsCount === 0) this._events = Object.create(null);
							else delete events[type];
							return this;
						}
						if (arguments.length === 0) {
							var keys = Object.keys(events);
							var key;
							for (i = 0; i < keys.length; ++i) {
								key = keys[i];
								if (key === "removeListener") continue;
								this.removeAllListeners(key);
							}
							this.removeAllListeners("removeListener");
							this._events = Object.create(null);
							this._eventsCount = 0;
							return this;
						}
						listeners = events[type];
						if (typeof listeners === "function") this.removeListener(type, listeners);
						else if (listeners !== void 0) for (i = listeners.length - 1; i >= 0; i--) this.removeListener(type, listeners[i]);
						return this;
					};
					function _listeners(target, type, unwrap) {
						var events = target._events;
						if (events === void 0) return [];
						var evlistener = events[type];
						if (evlistener === void 0) return [];
						if (typeof evlistener === "function") return unwrap ? [evlistener.listener || evlistener] : [evlistener];
						return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
					}
					EventEmitter.prototype.listeners = function listeners(type) {
						return _listeners(this, type, true);
					};
					EventEmitter.prototype.rawListeners = function rawListeners(type) {
						return _listeners(this, type, false);
					};
					EventEmitter.listenerCount = function(emitter, type) {
						if (typeof emitter.listenerCount === "function") return emitter.listenerCount(type);
						else return listenerCount.call(emitter, type);
					};
					EventEmitter.prototype.listenerCount = listenerCount;
					function listenerCount(type) {
						var events = this._events;
						if (events !== void 0) {
							var evlistener = events[type];
							if (typeof evlistener === "function") return 1;
							else if (evlistener !== void 0) return evlistener.length;
						}
						return 0;
					}
					EventEmitter.prototype.eventNames = function eventNames() {
						return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
					};
					function arrayClone(arr, n) {
						var copy = new Array(n);
						for (var i = 0; i < n; ++i) copy[i] = arr[i];
						return copy;
					}
					function spliceOne(list, index) {
						for (; index + 1 < list.length; index++) list[index] = list[index + 1];
						list.pop();
					}
					function unwrapListeners(arr) {
						var ret = new Array(arr.length);
						for (var i = 0; i < ret.length; ++i) ret[i] = arr[i].listener || arr[i];
						return ret;
					}
					function once(emitter, name$1) {
						return new Promise(function(resolve, reject) {
							function errorListener(err) {
								emitter.removeListener(name$1, resolver);
								reject(err);
							}
							function resolver() {
								if (typeof emitter.removeListener === "function") emitter.removeListener("error", errorListener);
								resolve([].slice.call(arguments));
							}
							eventTargetAgnosticAddListener(emitter, name$1, resolver, { once: true });
							if (name$1 !== "error") addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
						});
					}
					function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
						if (typeof emitter.on === "function") eventTargetAgnosticAddListener(emitter, "error", handler, flags);
					}
					function eventTargetAgnosticAddListener(emitter, name$1, listener, flags) {
						if (typeof emitter.on === "function") if (flags.once) emitter.once(name$1, listener);
						else emitter.on(name$1, listener);
						else if (typeof emitter.addEventListener === "function") emitter.addEventListener(name$1, function wrapListener(arg) {
							if (flags.once) emitter.removeEventListener(name$1, wrapListener);
							listener(arg);
						});
						else throw new TypeError("The \"emitter\" argument must be of type EventEmitter. Received type " + typeof emitter);
					}
				}),
				591: ((module$1) => {
					"use strict";
					var stylesInDOM = [];
					function getIndexByIdentifier(identifier) {
						var result = -1;
						for (var i = 0; i < stylesInDOM.length; i++) if (stylesInDOM[i].identifier === identifier) {
							result = i;
							break;
						}
						return result;
					}
					function modulesToDom(list, options) {
						var idCountMap = {};
						var identifiers = [];
						for (var i = 0; i < list.length; i++) {
							var item = list[i];
							var id = options.base ? item[0] + options.base : item[0];
							var count = idCountMap[id] || 0;
							var identifier = "".concat(id, " ").concat(count);
							idCountMap[id] = count + 1;
							var indexByIdentifier = getIndexByIdentifier(identifier);
							var obj = {
								css: item[1],
								media: item[2],
								sourceMap: item[3],
								supports: item[4],
								layer: item[5]
							};
							if (indexByIdentifier !== -1) {
								stylesInDOM[indexByIdentifier].references++;
								stylesInDOM[indexByIdentifier].updater(obj);
							} else {
								var updater = addElementStyle(obj, options);
								options.byIndex = i;
								stylesInDOM.splice(i, 0, {
									identifier,
									updater,
									references: 1
								});
							}
							identifiers.push(identifier);
						}
						return identifiers;
					}
					function addElementStyle(obj, options) {
						var api = options.domAPI(options);
						api.update(obj);
						return function updater(newObj) {
							if (newObj) {
								if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) return;
								api.update(obj = newObj);
							} else api.remove();
						};
					}
					module$1.exports = function(list, options) {
						options = options || {};
						list = list || [];
						var lastIdentifiers = modulesToDom(list, options);
						return function update(newList) {
							newList = newList || [];
							for (var i = 0; i < lastIdentifiers.length; i++) {
								var identifier = lastIdentifiers[i];
								var index = getIndexByIdentifier(identifier);
								stylesInDOM[index].references--;
							}
							var newLastIdentifiers = modulesToDom(newList, options);
							for (var _i = 0; _i < lastIdentifiers.length; _i++) {
								var _identifier = lastIdentifiers[_i];
								var _index = getIndexByIdentifier(_identifier);
								if (stylesInDOM[_index].references === 0) {
									stylesInDOM[_index].updater();
									stylesInDOM.splice(_index, 1);
								}
							}
							lastIdentifiers = newLastIdentifiers;
						};
					};
				}),
				128: ((module$1) => {
					"use strict";
					var memo = {};
					/* istanbul ignore next  */
					function getTarget(target) {
						if (typeof memo[target] === "undefined") {
							var styleTarget = document.querySelector(target);
							if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) try {
								styleTarget = styleTarget.contentDocument.head;
							} catch (e) {
								// istanbul ignore next
								styleTarget = null;
							}
							memo[target] = styleTarget;
						}
						return memo[target];
					}
					/* istanbul ignore next  */
					function insertBySelector(insert, style) {
						var target = getTarget(insert);
						if (!target) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
						target.appendChild(style);
					}
					module$1.exports = insertBySelector;
				}),
				51: ((module$1) => {
					"use strict";
					/* istanbul ignore next  */
					function insertStyleElement(options) {
						var element = document.createElement("style");
						options.setAttributes(element, options.attributes);
						options.insert(element, options.options);
						return element;
					}
					module$1.exports = insertStyleElement;
				}),
				855: ((module$1, __unused_webpack_exports, __webpack_require__$1) => {
					"use strict";
					/* istanbul ignore next  */
					function setAttributesWithoutAttributes(styleElement) {
						var nonce = __webpack_require__$1.nc;
						if (nonce) styleElement.setAttribute("nonce", nonce);
					}
					module$1.exports = setAttributesWithoutAttributes;
				}),
				740: ((module$1) => {
					"use strict";
					/* istanbul ignore next  */
					function apply(styleElement, options, obj) {
						var css = "";
						if (obj.supports) css += "@supports (".concat(obj.supports, ") {");
						if (obj.media) css += "@media ".concat(obj.media, " {");
						var needLayer = typeof obj.layer !== "undefined";
						if (needLayer) css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
						css += obj.css;
						if (needLayer) css += "}";
						if (obj.media) css += "}";
						if (obj.supports) css += "}";
						var sourceMap = obj.sourceMap;
						if (sourceMap && typeof btoa !== "undefined") css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
						/* istanbul ignore if  */
						options.styleTagTransform(css, styleElement, options.options);
					}
					function removeStyleElement(styleElement) {
						// istanbul ignore if
						if (styleElement.parentNode === null) return false;
						styleElement.parentNode.removeChild(styleElement);
					}
					/* istanbul ignore next  */
					function domAPI(options) {
						if (typeof document === "undefined") return {
							update: function update() {},
							remove: function remove() {}
						};
						var styleElement = options.insertStyleElement(options);
						return {
							update: function update(obj) {
								apply(styleElement, options, obj);
							},
							remove: function remove() {
								removeStyleElement(styleElement);
							}
						};
					}
					module$1.exports = domAPI;
				}),
				656: ((module$1) => {
					"use strict";
					/* istanbul ignore next  */
					function styleTagTransform(css, styleElement) {
						if (styleElement.styleSheet) styleElement.styleSheet.cssText = css;
						else {
							while (styleElement.firstChild) styleElement.removeChild(styleElement.firstChild);
							styleElement.appendChild(document.createTextNode(css));
						}
					}
					module$1.exports = styleTagTransform;
				}),
				937: ((module$1) => {
					"use strict";
					module$1.exports = "data:image/gif;base64,R0lGODlhDAAjAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAMACMAAAItlI+py+2fgAMSVUGvoZjHrFkeE0LmiabqagZO4CKxAM8GTONJrSv1ywoKh4oCADs=";
				}),
				592: ((module$1) => {
					"use strict";
					module$1.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAACICAYAAADuxmtPAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpBQkU4MzRBNDE1RjcxMUUyQjBEREY4NkZDMkM2NDc5MyIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpBQkU4MzRBNTE1RjcxMUUyQjBEREY4NkZDMkM2NDc5MyI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkFCRTgzNEEyMTVGNzExRTJCMERERjg2RkMyQzY0NzkzIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkFCRTgzNEEzMTVGNzExRTJCMERERjg2RkMyQzY0NzkzIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+JumAiwAACF9JREFUeNrsmX9sU9cVx6/t599J6JrUSZyfjg2OnR+khB91qdRQ0a4pVA3QlgilaemP/TFtfyG1f7VSxRqgQ9M2RZUYYh2MpghNKlJAqVKphbUNtEAggRjHTuwk2IlJ45g48e8fb+cY+8XGdvADNHVdrnQU5/l+z73vnnM+795nDk3TBFthUZES/jSCFYHxSfoWBLODXbplt5vxAhUTP9Xe3r772c2bnywuLlZQFCVMpw6FQv6pqSlzb2/vedB8Ck6+o+BD1Wttbbtfb29vlUDj8XhkiSaUSqUauVxeweFyceApLmie2LJliy4vL08CIxMOh7OkYR/s+0Jz85Og3UAFg8HHKioqqvBLNg00CtSiA0oIjbBsqEFtdBHZjp7Yog64sCAP5OB/fAYCgSAMzc/n81lFArMSNGGuTCZz2Ww2y70S6G6zWq2WwsJCF7e5uXnk9OnTfRBTD65FNoZ9UYNa3r/Pnbt9+PBhemx83A+5Lc7Nzc2DeuClGxVuNTAxMWH6rKurx2g0ftnZ2dnHiZWz/I8HD9aePHmyDKotF0ZIW1F4z1Ct8607d1r37NlzDS5Nxh1gewRMBibFyGZYuwiYG+wW2BwTxhgT8uFPAwugzD1coLzz9tut+fn5EizMTIkFtysEmGgqKyuTgbJjxw5daWmpRCwWR8OUKfb4HfbBvtu3bYsChYtQ0Gq1VWxTGDSLQIF0Zg0U1KD2/svwYVXjL2EGCJQYHO4fKFCiFrYjj4+PLwLl1KlTfYFAwJMtjbAvahigHDp0iB4bG/MXxYACKcvLMO2AxWIxHT16tGdoaOiXAhSscSIrLHxq//79R0wm0w2/3++LRCJ0OsPvoI++o6PjCGqis4cPVR/BBY/H4wbq0tkY9t0HA4JWeQco27frYIEkMArJxrDvtpaWxR1KWVlZVcJiZtVAswgUeI4I0TObhhpmh8JWnFLO/+8OECiQYQ8GlJuw28A8YGMTN28uAqW7u7vP6/V6ss1E7Isa1GI5r2hra3tOqVQ246a7pKSkCp7OgkxAgb2R+cyZM31ms/nL48eP9y4D5SEAhVQqFLsMBoMeFo6+l/3j7HH6nc9+F/0Mmhuo5SYCZSk7N/Qt+fOlT4g3h5DWY2+wA4rRaiJ7v/uYqDR1ZNBwmfx9R2d6oDidTjLnc5HK4ookBx+eO0CK5OXkqk1PPtr8HtHKNIyGG3eA1m3qIa1f7CZfXOlmrr3f8wdC5YqIfsZE2hUvkeeVm5nvksrZ5pwk/xw8QTZqmkjH9wdJmBMm8/4FYgtOE/OCjazJXUV+r/tNSukzMyheUUQOvfJX0m+6QGoVa0i3uZd8cvEwmfbfJnlBiny8ZS+JhJKLKuUW5MI7TkasNwgH6qlW0UicM5PkLy0HCD9EpVRl1EEcKPGLpUI5+dvL4GRyiFwd6yd7n/+AFPFlKWLYI2QGSrmohHRu+xP57YY3yAZZ45JA4b351lu5kN/59fX1aogtP97hUf4jpLZAm1bs8/k8n5840aNSqb5ZBkoiUA4cOGIaGbkB4fHRGRp+B330Hfv2JQMFL8DKuuksG/bFARmgIKYyYSzR4kDBz4g/Bijl5eX3PPJ8PXiWAcorn75GQLMIFDzmLbXFGbLoU4CCmpQjj91uJ8NjxhQHcaBcA6B8AEB5vKwhuZzjKRoHyokL/2KuvXvq/SSgtNRsZb5LygOTbSQroKQ9saA3lVx5T6CIheKkoko58qgLVmYEyqPiX6U/MyFQEA5xr9rHqlOAsipflVLSEIHMR566Qi0DlOdWPrPkkScKlNHR0fzGxkY1xJYpInleMVlXuiatGAjowVNLRWXlN8yRxwJHHvCY3ZHn2LEe/fKRZ3mHsrxDWd6hLO9QMr+Ura6u3rimoUEAa8CDqaZ9O4dlbLPZVlzu71eA5nvmpeyqlSs3Nj39NIWxnZyaCtMZnvUcaCKxmLdp0yY+/LMRX8pSMNp6iEBk1uFwZ3NmDgYCYfgTUCoUAojEOgoQJRPw+X62J3gY2IdaCoT8OxuwAOujP2gFVGxx7vsFws/EARRH+IEcwALe/wzgUR70er00lDLNMgL4sj5ESaVSx5zLJc7JyWEVx4WFBQFoZ7hqtXrQefu2yOf1YpbR2Rj2RQ1qsZwFT+h0TZM22yqJROIWCYVBSHk6ww8UHJ/fL4CHq1heUmK6cP782TgPJLt27VL/ePGi1u12F8D9UWm3dHDPOO3169bpu7q6huGSJxEoiDFxLDKZXrZj5xCYF4N3N1DKHuhn4/8KUKanpwukOTkRAEqENVAcDseKUbO5GtfBr1b3A1BoBAo3ASgZ2+zsrHRkdLTu1Vd3ctauXe8dNhrrYvulZKBACCU4GoTKEx95fn5eCiOvbmnZDmnPd8AmRCISifxgQdQy5QwO+HAmrANnPJVSeRE7QcJIzBbL6q1bXxTAw2r2hx/OS6zWieDaxkb93NwchpNHxTbPBKa4uqnpmTwej0t/9VVvA0Tjus1qrf918wtiHoj7+y8Jx8bMIRBfn5mZWYgvNDdWGCKYgcR+y+7iC0Sz1ZoaLizQehDnwPPWOThwVTQyYqTr6+pQ7IK+4TiEqNjP4PNajebalf7LNcFAkC4vrwjKi+XBUDBMhg0GvslkDDc0NAzMOBxz4VCITgEKzCAETuya6urIwMCVGlhdqrS0LARnCmp42EBg5GsQZmfoLnESUGBaUSdQomRg8KoWOlND+uuc2pqaQVj5mbupFQcKD7JJhSXNo6gQdoLmhp2HxzBsKIAM1UNopz1ebzgMm+1Ec83PY724eDqdjsCZSSWEZIoe8WG7BIXvUVZV/QQjO8FBOBIOk0QDqHAgIaRarfbHjECB6XFwi//zB8p/BBgAHNqa8EdleScAAAAASUVORK5CYII=";
				}),
				952: ((module$1) => {
					"use strict";
					module$1.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAkAAAANCAYAAAB7AEQGAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyRpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoTWFjaW50b3NoKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozNEM5MTlGOTAwMDQxMUUyQjQxMkIyMEY3MzE5QTlBRCIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDozNEM5MTlGQTAwMDQxMUUyQjQxMkIyMEY3MzE5QTlBRCI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjM0QzkxOUY3MDAwNDExRTJCNDEyQjIwRjczMTlBOUFEIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjM0QzkxOUY4MDAwNDExRTJCNDEyQjIwRjczMTlBOUFEIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+52cTFgAAAQdJREFUeNpi+v//PwMyZuQUUEEXY2JAAkxcghMV5OVug2hkcWQTJgRFxPy/c+fOf3efwP9Afg9MDqagx9bZ4/+lS5f+Hzhw4P/Fixf/Wzu6gRS2g+WBDHNDfb0T82dNYXj18iXEDUxMDIJCQgwxSRkMN27e0oObBMRfgfg/Ev4ANwlsJ8TRXECKnQEVfPn37f1vsCKggnZOTo4KNjY2FBVfv35j+PPnDxvIKkNdY8v/V69e+//w4UM4Pn/+wn9VHSOQtZpwkzTV1Srys1IYWJiZGX79+sXQO3kmw937D5qA1tWjhJOhuc3/qdOm/Tcws8YMJ2SFojJKIAUTkMUZsMSdEroYQIABAD4w1u/PTSI1AAAAAElFTkSuQmCC";
				}),
				560: ((module$1) => {
					"use strict";
					module$1.exports = "data:image/gif;base64,R0lGODlhDAAjAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAMACMAAAIjlI+py+0PDZhs2mWpyqDqCIbiSJbmEqRMyqJs4LbxSdf2UgAAOw==";
				}),
				784: ((module$1) => {
					"use strict";
					module$1.exports = "data:image/gif;base64,R0lGODlhBAAeAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAAEAB4AAAIXhA4maeyr1Jm02mvDDFpw/YVe12HmaRUAOw==";
				}),
				553: ((module$1) => {
					"use strict";
					module$1.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADcAAAAqCAYAAAAXk8MDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjQyQUZBRjU3QkFEMTFFMjhCODRFOEFGNTQyODdCNTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjQyQUZBRjY3QkFEMTFFMjhCODRFOEFGNTQyODdCNTQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2NDJBRkFGMzdCQUQxMUUyOEI4NEU4QUY1NDI4N0I1NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NDJBRkFGNDdCQUQxMUUyOEI4NEU4QUY1NDI4N0I1NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pv8NHYkAAASLSURBVHja3FhLbyNFEP7aHj+z3k1k5yGUxYmEtICSFRJrIXHYUyBCAo6cOEX5BZz4I9y4J3vgEIG0h0U5RQpIK22AA4l4HJIgsrE3b4f4MdN0tdPj2cnMZCZMj1eU1B67uz1dX9dX1V3FOOcgmZqa4pZlQQljzP6u5jjHqM85xz3Xa4yE1uh0Omi1Wi/1m6aJdDp9bZ9Xv/qdSqWQyWSwt7cnFzfo4/XqXV6e3UflXhuFIVKMtEMkoencBk8gr87pCjzbz4DPPvoCDx98gvKdCuKUF0d1PP7+W1RGK7xRbzBjenqaj71Tx1StjXwOyGYj4/IF45a/fwc+//RL1N78AC+eH+D5X/uxgjMMAx8+/BhGJo2JiQlukElfe7uF27eAYh5IG32FfU1kc9ADpEe/GvvzEHir+h7q9Tp0CNGd3v3g/vv4qvU1DPKN0h0gLyyWE82msuIZcynrBZpf8x81zUyhdd654sOxg7zoSj+UdiJAwhfBxNNSyvK+4szHWld05N4W7QeTDLrdLnSLWsNQypCilhkyciAABHNZEg5rQr/VXvLBHl1oV8XTuqqk7Uf29kcInS56irMmWXC0mATGewBvJF5+6YNhIOCIkhYPCBIxiMV7h3iitLQuaWn7HPP3KWdw4dzHz3ytlrDl5FXqv9IypPCkaWlbzlQ7G4GKLGTUvPxNm5g8La1eM60QoFjEyDlIWirLmWbIcy5MtPQZGwg40+pbL+qFuXd+BQNVF+uebycITvoA9/C3EH7nqSf3n2dhANHy4kxkBKVwlvM8CvzSIBfgtLi/nreaKGSLWkGdXzTlM0Xg6n9k0WkLenb7FvRrloPCgfMUDR3ziiL7+G33R2k9ne3ZLz8gl8vB2N7eZpN3J7mR2cf4vQ6Ktx0WivF2QlIcBtZ/fgRLbOIbk++K/PFWrBZr/nOKn359iu++eYLDw0PGlA9Uq1W7huKujzh/O31G1VKuq7k451JC2W63Zb6lQ6iWQsD6KY8QKthQi3tRWiybzcrCDRVwiC7UvC7U7qJSUBHKb/Od/dJylUqFLy4uYn5+HqOjo7GCo7R/dXUVy8vLGBsbk3UOVQUjsOq7U6hf9ak5zuqZc9w9dnJygqOjI+zs7DA2Pj7OFxYWMDc3JzvjzpQJzPDwMNbW1rCysoJyuay3xCBof3BwgOPjYxhExVqtpr1oMzs7i6WlJapK2TTSdeaNjIxIgLL6RdbSfbjSGtZlJh43MOf7FO3tgJJk0UYXMK/AYySd+rsVC77ehdfLa64nOL+diCVhddDyOuWj6uBmha/ldFhTvTPsu6Pq4J5veJ0z2soMCdKf1hqoz4XdhCD93If8KxNQwvraTfyf/pMoLZNeK3bLBUVaXRE4UVr6vS8p+it2JOpz/wvLvQpHAVlPgjs7O8PQ0JDWxZrNZmDYjlMoGSCWpChL3tjY0F602dzcRD6fT8RilJfSRhqNRoOJ/EfyZWZmBqVSKdbFTk9PsbW1hfX1de2JKmUeAo9su7u7/QIRAbxJ/SRsClMoFGSuFaYmEnXcfWOhih59/1eAAQAVvW4V+Ky7cAAAAABJRU5ErkJggg==";
				}),
				147: ((module$1) => {
					"use strict";
					module$1.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAcCAYAAABRVo5BAAAAZ0lEQVR42u2SUQrAMAhDvazn8OjZBilCkYVVxiis8H4CT0VrAJb4WHT3C5xU2a2IQZXJjiQIRMdkEoJ5Q2yMqpfDIo+XY4k6h+YXOyKqTIj5REaxloNAd0xiKmAtsTHqW8sR2W5f7gCu5nWFUpVjZwAAAABJRU5ErkJggg==";
				}),
				444: ((module$1) => {
					"use strict";
					module$1.exports = __WEBPACK_EXTERNAL_MODULE__444__;
				}),
				910: ((module$1) => {
					"use strict";
					module$1.exports = __WEBPACK_EXTERNAL_MODULE__910__;
				}),
				254: ((module$1) => {
					"use strict";
					module$1.exports = __WEBPACK_EXTERNAL_MODULE__254__;
				}),
				685: ((module$1) => {
					"use strict";
					module$1.exports = __WEBPACK_EXTERNAL_MODULE__685__;
				}),
				292: ((module$1) => {
					"use strict";
					module$1.exports = __WEBPACK_EXTERNAL_MODULE__292__;
				}),
				736: ((module$1) => {
					"use strict";
					module$1.exports = __WEBPACK_EXTERNAL_MODULE__736__;
				}),
				517: ((module$1) => {
					"use strict";
					module$1.exports = __WEBPACK_EXTERNAL_MODULE__517__;
				}),
				540: ((module$1) => {
					"use strict";
					module$1.exports = __WEBPACK_EXTERNAL_MODULE__540__;
				}),
				863: ((module$1) => {
					"use strict";
					module$1.exports = __WEBPACK_EXTERNAL_MODULE__863__;
				}),
				387: ((module$1) => {
					"use strict";
					module$1.exports = __WEBPACK_EXTERNAL_MODULE__387__;
				}),
				493: ((module$1) => {
					"use strict";
					module$1.exports = __WEBPACK_EXTERNAL_MODULE__493__;
				}),
				748: ((module$1) => {
					"use strict";
					module$1.exports = __WEBPACK_EXTERNAL_MODULE__748__;
				})
			};
			var __webpack_module_cache__ = {};
			function __webpack_require__(moduleId) {
				var cachedModule = __webpack_module_cache__[moduleId];
				if (cachedModule !== void 0) return cachedModule.exports;
				var module$1 = __webpack_module_cache__[moduleId] = {
					id: moduleId,
					exports: {}
				};
				__webpack_modules__[moduleId].call(module$1.exports, module$1, module$1.exports, __webpack_require__);
				return module$1.exports;
			}
			__webpack_require__.m = __webpack_modules__;
			__webpack_require__.n = (module$1) => {
				var getter = module$1 && module$1.__esModule ? () => module$1["default"] : () => module$1;
				__webpack_require__.d(getter, { a: getter });
				return getter;
			};
			__webpack_require__.d = (exports$1, definition) => {
				for (var key in definition) if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports$1, key)) Object.defineProperty(exports$1, key, {
					enumerable: true,
					get: definition[key]
				});
			};
			__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
			__webpack_require__.r = (exports$1) => {
				if (typeof Symbol !== "undefined" && Symbol.toStringTag) Object.defineProperty(exports$1, Symbol.toStringTag, { value: "Module" });
				Object.defineProperty(exports$1, "__esModule", { value: true });
			};
			__webpack_require__.b = document.baseURI || self.location.href;
			__webpack_require__.nc = void 0;
			var __webpack_exports__ = {};
			(() => {
				"use strict";
				__webpack_require__.r(__webpack_exports__);
				__webpack_require__.d(__webpack_exports__, {
					Accordion: () => Accordion,
					AceEditor: () => AceEditor,
					AceLayout: () => AceLayout$1,
					AceTreeWrapper: () => AceTreeWrapper$1,
					Box: () => Box$1,
					Button: () => Button$1,
					CommandManager: () => CommandManager,
					Dropdown: () => Dropdown,
					EditorType: () => EditorType,
					FileSystemWeb: () => FileSystemWeb$1,
					ListBox: () => ListBox,
					Menu: () => Menu,
					MenuBar: () => MenuBar,
					MenuItems: () => MenuItems,
					MenuManager: () => MenuManager,
					MenuPopup: () => MenuPopup,
					MenuSearchBox: () => MenuSearchBox,
					MenuToolbar: () => MenuToolbar,
					Pane: () => Pane$1,
					Panel: () => Panel,
					PanelBar: () => PanelBar,
					PanelManager: () => PanelManager,
					PreviewEditor: () => PreviewEditor,
					SettingsSearchBox: () => SettingsSearchBox,
					SizeUnit: () => SizeUnit,
					Switcher: () => Switcher,
					Tab: () => Tab,
					TabManager: () => TabManager$1,
					Toolbar: () => Toolbar,
					dom: () => dom$1
				});
				var accordion_namespaceObject = {};
				__webpack_require__.r(accordion_namespaceObject);
				__webpack_require__.d(accordion_namespaceObject, { "default": () => styles_accordion });
				var tab_namespaceObject = {};
				__webpack_require__.r(tab_namespaceObject);
				__webpack_require__.d(tab_namespaceObject, { "default": () => styles_tab });
				var menu_namespaceObject = {};
				__webpack_require__.r(menu_namespaceObject);
				__webpack_require__.d(menu_namespaceObject, { "default": () => styles_menu });
				var button_namespaceObject = {};
				__webpack_require__.r(button_namespaceObject);
				__webpack_require__.d(button_namespaceObject, { "default": () => assets_styles_button });
				var dropdown_namespaceObject = {};
				__webpack_require__.r(dropdown_namespaceObject);
				__webpack_require__.d(dropdown_namespaceObject, { "default": () => styles_dropdown });
				var switcher_namespaceObject = {};
				__webpack_require__.r(switcher_namespaceObject);
				__webpack_require__.d(switcher_namespaceObject, { "default": () => styles_switcher });
				var panel_namespaceObject = {};
				__webpack_require__.r(panel_namespaceObject);
				__webpack_require__.d(panel_namespaceObject, { "default": () => styles_panel });
				var layout_namespaceObject = {};
				__webpack_require__.r(layout_namespaceObject);
				__webpack_require__.d(layout_namespaceObject, { "default": () => styles_layout });
				var ace_tree_namespaceObject = {};
				__webpack_require__.r(ace_tree_namespaceObject);
				__webpack_require__.d(ace_tree_namespaceObject, { "default": () => styles_ace_tree });
				var hash_handler_ = __webpack_require__(736);
				const commandManager_event = __webpack_require__(517);
				const keyUtil = __webpack_require__(863);
				class CommandManager {
					static registerCommands(commands, context) {
						let menuKb = new hash_handler_.HashHandler(commands);
						let _this = context;
						commandManager_event.addCommandKeyListener(window, function(e, hashId, keyCode) {
							let keyString = keyUtil.keyCodeToString(keyCode);
							let command = menuKb.findKeyCommand(hashId, keyString);
							if (command && command.exec) {
								commandManager_event.stopEvent(e);
								command.exec(_this);
							}
						});
					}
				}
				var useragent_ = __webpack_require__(493);
				var XHTML_NS = "http://www.w3.org/1999/xhtml";
				var dom$1;
				((dom2) => {
					dom2.buildDom = function(arr, parent, refs) {
						if (typeof arr == "string" && arr) {
							var txt = document.createTextNode(arr);
							if (parent) parent.appendChild(txt);
							return txt;
						}
						if (!Array.isArray(arr)) {
							if (arr && arr.appendChild && parent) parent.appendChild(arr);
							return arr;
						}
						if (typeof arr[0] != "string" || !arr[0]) {
							var els = [];
							for (var i = 0; i < arr.length; i++) {
								var ch = (0, dom2.buildDom)(arr[i], parent, refs);
								ch && els.push(ch);
							}
							return els;
						}
						var el = document.createElement(arr[0]);
						var options$1 = arr[1];
						var childIndex = 1;
						if (options$1 && typeof options$1 == "object" && !Array.isArray(options$1)) childIndex = 2;
						for (var i = childIndex; i < arr.length; i++) (0, dom2.buildDom)(arr[i], el, refs);
						if (childIndex == 2) Object.keys(options$1).forEach(function(n) {
							var val = options$1[n];
							if (n === "class") el.className = Array.isArray(val) ? val.join(" ") : val;
							else if (typeof val == "function" || n == "value" || n[0] == "$") el[n] = val;
							else if (n === "ref") {
								if (refs) refs[val] = el;
							} else if (n === "style") {
								if (typeof val == "string") el.style.cssText = val;
							} else if (val != null) el.setAttribute(n, val);
						});
						if (parent) parent.appendChild(el);
						return el;
					};
					dom2.getDocumentHead = function(doc) {
						if (!doc) doc = document;
						return doc.head || doc.getElementsByTagName("head")[0] || doc.documentElement;
					};
					dom2.createElement = function(tag, ns) {
						return document.createElementNS ? document.createElementNS(ns || XHTML_NS, tag) : document.createElement(tag);
					};
					dom2.removeChildren = function(element) {
						element.innerHTML = "";
					};
					dom2.createTextNode = function(textContent, element) {
						return (element ? element.ownerDocument : document).createTextNode(textContent);
					};
					dom2.createFragment = function(element) {
						return (element ? element.ownerDocument : document).createDocumentFragment();
					};
					dom2.hasCssClass = function(el, name$1) {
						return (el.className + "").split(/\s+/g).indexOf(name$1) !== -1;
					};
					dom2.addCssClass = function(el, name$1) {
						if (!(0, dom2.hasCssClass)(el, name$1)) el.className += " " + name$1;
					};
					dom2.removeCssClass = function(el, name$1) {
						var classes = el.className.split(/\s+/g);
						while (true) {
							var index = classes.indexOf(name$1);
							if (index == -1) break;
							classes.splice(index, 1);
						}
						el.className = classes.join(" ");
					};
					dom2.toggleCssClass = function(el, name$1) {
						var classes = el.className.split(/\s+/g), add = true;
						while (true) {
							var index = classes.indexOf(name$1);
							if (index == -1) break;
							add = false;
							classes.splice(index, 1);
						}
						if (add) classes.push(name$1);
						el.className = classes.join(" ");
						return add;
					};
					dom2.setCssClass = function(node, className, include) {
						if (include) (0, dom2.addCssClass)(node, className);
						else (0, dom2.removeCssClass)(node, className);
					};
					dom2.hasCssString = function(id, doc) {
						var index = 0, sheets;
						doc = doc || document;
						if (sheets = doc.querySelectorAll("style")) {
							while (index < sheets.length) if (sheets[index++].id === id) return true;
						}
					};
					dom2.removeElementById = function(id, doc) {
						doc = doc || document;
						if (doc.getElementById(id)) doc.getElementById(id).remove();
					};
					var strictCSP;
					var cssCache = [];
					dom2.useStrictCSP = function(value) {
						strictCSP = value;
						if (value == false) insertPendingStyles();
						else if (!cssCache) cssCache = [];
					};
					function insertPendingStyles() {
						var cache = cssCache;
						cssCache = null;
						cache && cache.forEach(function(item) {
							importCssString(item[0], item[1]);
						});
					}
					function importCssString(cssText, id, target) {
						if (typeof document == "undefined") return;
						if (cssCache) {
							if (target) insertPendingStyles();
							else if (target === false) return cssCache.push([cssText, id]);
						}
						if (strictCSP) return;
						var container = target;
						if (!target || !target.getRootNode) container = document;
						else {
							container = target.getRootNode();
							if (!container || container == target) container = document;
						}
						var doc = container.ownerDocument || container;
						if (id && (0, dom2.hasCssString)(id, container)) return null;
						if (id) cssText += "\n/*# sourceURL=ace/css/" + id + " */";
						var style = (0, dom2.createElement)("style");
						style.appendChild(doc.createTextNode(cssText));
						if (id) style.id = id;
						if (container == doc) container = (0, dom2.getDocumentHead)(doc);
						container.insertBefore(style, container.firstChild);
					}
					dom2.importCssString = importCssString;
					dom2.importCssStylsheet = function(uri, doc) {
						(0, dom2.buildDom)(["link", {
							rel: "stylesheet",
							href: uri
						}], (0, dom2.getDocumentHead)(doc));
					};
					dom2.scrollbarWidth = function(document2) {
						var inner = (0, dom2.createElement)("ace_inner");
						inner.style.width = "100%";
						inner.style.minWidth = "0px";
						inner.style.height = "200px";
						inner.style.display = "block";
						var outer = (0, dom2.createElement)("ace_outer");
						var style = outer.style;
						style.position = "absolute";
						style.left = "-10000px";
						style.overflow = "hidden";
						style.width = "200px";
						style.minWidth = "0px";
						style.height = "150px";
						style.display = "block";
						outer.appendChild(inner);
						var body = document2.documentElement;
						body.appendChild(outer);
						var noScrollbar = inner.offsetWidth;
						style.overflow = "scroll";
						var withScrollbar = inner.offsetWidth;
						if (noScrollbar == withScrollbar) withScrollbar = outer.clientWidth;
						body.removeChild(outer);
						return noScrollbar - withScrollbar;
					};
					dom2.computedStyle = function(element, style) {
						return window.getComputedStyle(element, "") || {};
					};
					dom2.setStyle = function(styles, property, value) {
						if (styles[property] !== value) styles[property] = value;
					};
					dom2.HAS_CSS_ANIMATION = false;
					dom2.HAS_CSS_TRANSFORMS = false;
					dom2.HI_DPI = useragent_.isWin ? typeof window !== "undefined" && window.devicePixelRatio >= 1.5 : true;
					if (useragent_.isChromeOS) dom2.HI_DPI = false;
					if (typeof document !== "undefined") {
						var div = document.createElement("div");
						if (dom2.HI_DPI && div.style.transform !== void 0) dom2.HAS_CSS_TRANSFORMS = true;
						if (!useragent_.isEdge && typeof div.style.animationName !== "undefined") dom2.HAS_CSS_ANIMATION = true;
						div = null;
					}
					if (dom2.HAS_CSS_TRANSFORMS) dom2.translate = function(element, tx, ty) {
						element.style.transform = "translate(" + Math.round(tx) + "px, " + Math.round(ty) + "px)";
					};
					else dom2.translate = function(element, tx, ty) {
						element.style.top = Math.round(ty) + "px";
						element.style.left = Math.round(tx) + "px";
					};
				})(dom$1 || (dom$1 = {}));
				var SizeUnit = /* @__PURE__ */ ((SizeUnit2) => {
					SizeUnit2[SizeUnit2["px"] = 0] = "px";
					SizeUnit2[SizeUnit2["percent"] = 1] = "percent";
					return SizeUnit2;
				})(SizeUnit || {});
				var EditorType = /* @__PURE__ */ ((EditorType2) => {
					EditorType2["ace"] = "ace";
					EditorType2["preview"] = "preview";
					return EditorType2;
				})(EditorType || {});
				var Utils;
				((Utils2) => {
					Utils2.findHost = function(el, constructor) {
						while (el) {
							if (el.$host && (!constructor || el.$host.constructor === constructor)) return el.$host;
							el = el.parentElement;
						}
					};
					Utils2.findNode = function(node, className) {
						while (node && node.classList) {
							if (node.classList.contains(className)) return node;
							node = node.parentNode;
						}
						return null;
					};
					Utils2.findHostTarget = function(target) {
						while (target) {
							if (target.$host) return target;
							target = target.parentElement;
						}
						return null;
					};
					Utils2.setBox = function(el, x, y, w, h) {
						if (w) w = Math.max(w, 0);
						if (h) h = Math.max(h, 0);
						let s = el.style;
						s.left = x + "px";
						s.top = y + "px";
						s.width = w + "px";
						s.height = h + "px";
					};
					function getEdge(style, dir) {
						return parseInt(style["padding" + dir], 10) + parseInt(style["margin" + dir], 10) + parseInt(style["border" + dir], 10);
					}
					Utils2.getEdge = getEdge;
					function getElementEdges(element) {
						let style = getComputedStyle(element);
						return {
							"top": getEdge(style, "Top"),
							"bottom": getEdge(style, "Bottom"),
							"left": getEdge(style, "Left"),
							"right": getEdge(style, "Right")
						};
					}
					Utils2.getElementEdges = getElementEdges;
				})(Utils || (Utils = {}));
				var event_ = __webpack_require__(517);
				var events = __webpack_require__(46);
				const SPLITTER_SIZE = 1;
				const BOX_MIN_SIZE = 40;
				class Box$1 extends events.EventEmitter {
					constructor(options$1) {
						var _a, _b, _c, _d;
						super();
						this.$editorAdded = (editor) => {
							this.emit("editorAdded", editor);
						};
						if (options$1.splitter !== false) {}
						this.vertical = options$1.vertical || false;
						this.color = (_a = options$1.color) != null ? _a : "";
						this.isMain = options$1.isMain || false;
						this[0] = options$1[0];
						this[1] = options$1[1];
						if (this[0]) this[0].parent = this;
						if (this[1]) this[1].parent = this;
						this.ratio = options$1.ratio;
						this.toolBars = options$1.toolBars || {};
						this.padding = {
							top: 0,
							right: 0,
							bottom: 0,
							left: 0
						};
						this.size = options$1.size;
						this.sizeUnit = (_b = options$1.sizeUnit) != null ? _b : SizeUnit.px;
						this.minSize = options$1.minSize || BOX_MIN_SIZE;
						this.minVerticalSize = options$1.minVerticalSize || this.minSize;
						this.minHorizontalSize = options$1.minHorizontalSize || this.minSize;
						this.classNames = (_c = options$1.classNames) != null ? _c : "";
						this.hidden = (_d = options$1.hidden) != null ? _d : false;
						this.fixedSize = options$1.fixedSize;
					}
					static enableAnimation() {
						document.documentElement.classList.add("animateBoxes");
					}
					static disableAnimation() {
						document.documentElement.classList.remove("animateBoxes");
					}
					static setGlobalCursor(value) {
						if (value) document.documentElement.classList.add("inheritCursor");
						else document.documentElement.classList.remove("inheritCursor");
						document.documentElement.style.cursor = value;
					}
					toJSON() {
						return {
							0: this[0] && this[0].toJSON(),
							1: this[1] && this[1].toJSON(),
							ratio: this.ratio,
							type: this.vertical ? "vbox" : "hbox",
							fixedSize: this.fixedSize || null,
							hidden: this.hidden,
							color: this.color,
							size: this.size
						};
					}
					onMouseDown(e) {
						if (e.button !== 0) return;
						let box = this;
						let rect = this.element.getBoundingClientRect();
						let x = e.clientX;
						let y = e.clientY;
						document.body.classList.add("dragging");
						let onMouseMove = function(e2) {
							x = e2.clientX - rect.left - box.padding.left;
							y = e2.clientY - rect.top - box.padding.top;
							let height = rect.height - box.padding.top - box.padding.bottom;
							let width = rect.width - box.padding.left - box.padding.right;
							if (box.fixedChild) {
								if (box.vertical) box.fixedChild.fixedSize = box.fixedChild === box[1] ? height - y : y;
								else box.fixedChild.fixedSize = box.fixedChild === box[1] ? width - x : x;
								box.fixedChild.fixedSize = Math.max(box.fixedChild.fixedSize, box.fixedChild.minSize);
								box.ratio = void 0;
							} else {
								if (box.vertical) box.ratio = y / height;
								else box.ratio = x / width;
								box.ratio = Math.max(box.minRatio, Math.min(box.ratio, box.maxRatio));
							}
							box.resize();
						};
						let onResizeEnd = function(e2) {
							Box$1.setGlobalCursor("");
							document.body.classList.remove("dragging");
						};
						Box$1.setGlobalCursor(`${box.vertical ? "ns" : "ew"}-resize`);
						event_.capture(window, onMouseMove, onResizeEnd);
						return e.preventDefault();
					}
					resize() {
						if (!this.box) return;
						this.setBox(...this.box);
					}
					calculateMinMaxRatio() {
						if (!this.box || !this[0] && !this[1]) return;
						let propertyName = this.vertical ? "minVerticalSize" : "minHorizontalSize";
						let size = this.vertical ? this.box[3] - this.padding.top - this.padding.bottom : this.box[2] - this.padding.left - this.padding.right;
						this.minRatio = this[0] ? this[0][propertyName] / size : 0;
						this.maxRatio = this[1] ? (size - this[1][propertyName]) / size : 1;
					}
					render() {
						var _a;
						if ((_a = this.element) == null ? void 0 : _a.$host) return this.element;
						this.renderElement();
						this.splitter = dom$1.buildDom([
							"div",
							{ class: `splitter splitter${this.vertical ? "-v" : "-h"}` },
							["div"]
						]);
						this.splitter.onmousedown = this.onMouseDown.bind(this);
						this.element.appendChild(this.splitter);
						this.element.$host = this;
						this.element.style.backgroundColor = this.color;
						this.element.style.position = "absolute";
						this.renderToolBarList();
						this.renderChildren();
						if (!this.ratio) this.calculateRatio();
						return this.element;
					}
					renderElement() {
						this.element ??= dom$1.buildDom(["div", { class: "box" + this.classNames }]);
					}
					renderToolBarList() {
						for (let position in this.toolBars) this.addToolBar(position, this.toolBars[position]);
					}
					addToolBar(position, bar) {
						var _a, _b;
						if (position == "left" || position == "right") bar.direction = "vertical";
						(_b = (_a = this.toolBars[position]) == null ? void 0 : _a.element) == null || _b.remove();
						bar.position = position;
						this.padding[position] = bar.size;
						this.element.appendChild(bar.render());
						this.toolBars[position] = bar;
					}
					removeToolBar(position) {
						delete this.toolBars[position];
						this.padding[position] = 0;
					}
					renderChildren() {
						this.renderChild(this[0]);
						this.renderChild(this[1]);
						this.calculateMinSize();
					}
					renderChild(child) {
						if (!child) return;
						if (!this.element) this.render();
						child.on("editorAdded", this.$editorAdded);
						this.element.appendChild(child.render());
					}
					calculateMinSize(forceChildrenSize = false) {
						let childrenMinVerticalSize = 0;
						let childrenMinHorizontalSize = 0;
						let calculateChildBoxMinSize = (childBox) => {
							if (this.vertical) {
								childrenMinVerticalSize += childBox.minVerticalSize;
								childrenMinHorizontalSize = Math.max(childBox.minHorizontalSize, childrenMinHorizontalSize);
							} else {
								childrenMinVerticalSize = Math.max(childBox.minVerticalSize, childrenMinVerticalSize);
								childrenMinHorizontalSize += childBox.minHorizontalSize;
							}
						};
						if (this[0]) calculateChildBoxMinSize(this[0]);
						if (this[1]) calculateChildBoxMinSize(this[1]);
						if (forceChildrenSize) {
							this.minVerticalSize = childrenMinVerticalSize;
							this.minHorizontalSize = childrenMinHorizontalSize;
						} else {
							this.minVerticalSize = Math.max(this.minVerticalSize, childrenMinVerticalSize);
							this.minHorizontalSize = Math.max(this.minHorizontalSize, childrenMinHorizontalSize);
						}
						this.minSize = this.vertical ? this.minVerticalSize : this.minHorizontalSize;
						this.calculateMinMaxRatio();
					}
					calculateRatio() {
						if (this[0]) this.calculateChildRatio(this[0]);
						if (this.ratio || this.fixedChild) return;
						if (this[1]) this.calculateChildRatio(this[1]);
						if (!this.ratio && !this.fixedChild) this.ratio = .5;
					}
					calculateChildRatio(childBox, isSecond = false) {
						if (!childBox.size) return;
						let size = childBox.size;
						switch (this.sizeUnit) {
							case SizeUnit.px:
								childBox.fixedSize = size;
								this.fixedChild = childBox;
								break;
							case SizeUnit.percent:
								if (isSecond) size = 100 - size;
								this.ratio = Math.min(size / 100, 1);
								break;
						}
					}
					renderButtons(buttonList) {
						let buttons = buttonList.map((button) => {
							return dom$1.buildDom([
								"div",
								{
									class: "button " + button.class,
									title: button.title,
									onclick: button.onclick
								},
								button.content
							]);
						});
						this.setButtons(buttons);
					}
					setButtons(buttons) {
						this.buttons = buttons;
						if (this.topRightPane) this.topRightPane.removeButtons();
						this.topRightPane = this.getTopRightPane();
						if (this.topRightPane) this.topRightPane.setButtons(buttons);
					}
					addButton(button) {
						this.topRightPane = this.getTopRightPane();
						if (this.topRightPane) this.topRightPane.addButton(button);
					}
					getTopRightPane() {
						let childBox = this.vertical ? this[0] || this[1] : this[1] || this[0];
						if (!childBox) return;
						return childBox.getTopRightPane();
					}
					setBox(x, y, w, h) {
						this.box = [
							x,
							y,
							w,
							h
						];
						if (this.isMaximized) {
							x = 0;
							y = 0;
							w = window.innerWidth;
							h = window.innerHeight;
						}
						Utils.setBox(this.element, x, y, w, h);
						this.calculateMinMaxRatio();
						this.$updateChildSize(x, y, w, h);
					}
					$updateChildSize(x, y, w, h) {
						var _a;
						let splitterSize = SPLITTER_SIZE;
						if (!this[0] || this[0].hidden || !this[1] || this[1].hidden) {
							this.splitter.style.display = "none";
							splitterSize = 0;
						} else this.splitter.style.display = "";
						this.updateToolBarSize(w, h);
						w -= this.padding.left + this.padding.right;
						h -= this.padding.top + this.padding.bottom;
						x = this.padding.left;
						y = this.padding.top;
						if (this.fixedChild) {
							let size = this.fixedChild.fixedSize;
							if (this.fixedChild === this[1]) size = this.vertical ? h - size : w - size;
							this.ratio = this.vertical ? size / h : size / w;
						}
						this.ratio = Math.max(this.minRatio, Math.min((_a = this.ratio) != null ? _a : this.maxRatio, this.maxRatio));
						let ratio = this.ratio;
						if (!this[0] || this[0].hidden) ratio = 0;
						else if (!this[1] || this[1].hidden) ratio = 1;
						if (this.vertical) {
							let splitY = h * ratio - splitterSize;
							if (this.splitter) Utils.setBox(this.splitter, x, y + splitY, w, splitterSize);
							if (this[0]) this[0].setBox(x, y, w, splitY);
							if (this[1]) this[1].setBox(x, y + splitY + splitterSize, w, h - splitY - splitterSize);
						} else {
							let splitX = w * ratio - splitterSize;
							if (this.splitter) Utils.setBox(this.splitter, x + splitX, y, splitterSize, h);
							if (this[0]) this[0].setBox(x, y, splitX, h);
							if (this[1]) this[1].setBox(x + splitX + splitterSize, y, w - splitX - splitterSize, h);
						}
					}
					updateToolBarSize(width, height) {
						let bar, x, y, w, h;
						for (let type in this.toolBars) {
							x = 0;
							y = 0;
							w = width;
							h = height;
							bar = this.toolBars[type];
							switch (type) {
								case "top":
								case "bottom":
									h = bar.size;
									if (type === "bottom") y = height - bar.size;
									break;
								case "left":
								case "right":
									w = bar.size;
									y = this.padding.top;
									h -= this.padding.top + this.padding.bottom;
									if (type === "right") x = width - bar.size;
									break;
								default: continue;
							}
							bar.setBox(x, y, w, h);
						}
					}
					restore(disableAnimation = false) {
						let node = this.element;
						function rmClass(ch, cls) {
							for (let i = 0; i < ch.length; i++) if (ch[i].classList) ch[i].classList.remove(cls);
						}
						let finishRestore = () => {
							classes.forEach(function(className) {
								rmClass(document.querySelectorAll("." + className), className);
							});
							this.setBox(...this.box);
						};
						let classes = [
							"fullScreenSibling",
							"fullScreenNode",
							"fullScreenParent"
						];
						this.isMaximized = false;
						if (disableAnimation) finishRestore();
						else {
							Box$1.enableAnimation();
							node.addEventListener("transitionend", function handler(l) {
								Box$1.disableAnimation();
								node.removeEventListener("transitionend", handler);
								finishRestore();
							});
						}
						let parentRect = node.parentNode.getBoundingClientRect();
						let top = parentRect.top + this.box[1];
						let left = parentRect.left + this.box[0];
						Utils.setBox(node, left, top, this.box[2], this.box[3]);
					}
					maximize(disableAnimation = false) {
						let node = this.element;
						function addClasses() {
							node.classList.add("fullScreenNode");
							let parent = node.parentNode;
							while (parent && parent !== document.body) {
								if (parent.classList) parent.classList.add("fullScreenParent");
								let childNodes = parent.childNodes;
								for (let i = 0; i < childNodes.length; i++) {
									let childNode = childNodes[i];
									if (childNode != node && childNode.classList && !childNode.classList.contains("fullScreenParent")) childNode.classList.add("fullScreenSibling");
								}
								parent = parent.parentNode;
							}
						}
						let rect = node.getBoundingClientRect();
						Utils.setBox(node, rect.left, rect.top, rect.width, rect.height);
						addClasses();
						this.isMaximized = true;
						node.getBoundingClientRect();
						if (!disableAnimation) {
							Box$1.enableAnimation();
							node.addEventListener("transitionend", function handler() {
								node.removeEventListener("transitionend", handler);
								Box$1.disableAnimation();
							});
						}
						this.setBox(...this.box);
					}
					toggleMaximize() {
						if (this.isMaximized) this.restore();
						else this.maximize();
					}
					remove() {
						this.removeAllChildren();
						if (this.element) this.element.remove();
						if (this.parent) {
							if (this.parent[0] == this) this.parent[0] = void 0;
							if (this.parent[1] == this) this.parent[1] = void 0;
							this.parent.recalculateAllMinSizes();
							this.parent = void 0;
						}
					}
					removeAllChildren() {
						this.removeChild(this[0]);
						this.removeChild(this[1]);
						this[0] = void 0;
						this[1] = void 0;
					}
					removeChild(child) {
						if (!child) return;
						child.off("editorAdded", this.$editorAdded);
						child.remove();
						child.element.remove();
					}
					toggleShowHide() {
						var _a;
						Box$1.enableAnimation();
						this.hidden = !this.hidden;
						(_a = this.parent) == null || _a.resize();
						let node = this.element;
						let self$1 = this;
						node.addEventListener("transitionend", function handler() {
							var _a2;
							node.removeEventListener("transitionend", handler);
							Box$1.disableAnimation();
							(_a2 = self$1.parent) == null || _a2.resize();
						});
					}
					hide() {
						var _a;
						Box$1.enableAnimation();
						this.hidden = true;
						(_a = this.parent) == null || _a.resize();
						let node = this.element;
						let self$1 = this;
						node.addEventListener("transitionend", function handler() {
							var _a2;
							node.removeEventListener("transitionend", handler);
							Box$1.disableAnimation();
							(_a2 = self$1.parent) == null || _a2.resize();
						});
					}
					show() {
						var _a;
						Box$1.enableAnimation();
						this.hidden = false;
						(_a = this.parent) == null || _a.resize();
						let node = this.element;
						let self$1 = this;
						node.addEventListener("transitionend", function handler() {
							var _a2;
							node.removeEventListener("transitionend", handler);
							Box$1.disableAnimation();
							(_a2 = self$1.parent) == null || _a2.resize();
						});
					}
					addChildBox(previousBoxIndex, box) {
						let previousBox, index;
						if (previousBoxIndex instanceof Box$1) {
							previousBox = previousBoxIndex;
							index = this[0] == previousBox ? 0 : 1;
						} else {
							index = previousBoxIndex;
							previousBox = this[index];
						}
						if (previousBox && previousBox === box) return previousBox;
						let previousParent = box.parent;
						if (previousParent && previousParent !== this) {
							let previousIndex = previousParent[0] === box ? 0 : 1;
							previousParent[previousIndex] = null;
							previousParent.ratio = 1;
							if (previousParent.fixedChild && previousParent.fixedChild === box) previousParent.fixedChild = null;
							previousParent.resize();
						}
						this[index] = box;
						box.parent = this;
						this.renderChild(box);
						if (previousBox && previousBox.isMaximized) {
							previousBox.restore(true);
							box.maximize(true);
						}
						if (previousBox && previousBox.parent === this) {
							if (this.fixedChild && this.fixedChild == previousBox) {
								box.fixedSize = previousBox.fixedSize;
								if (!box.size) box.size = previousBox.size;
								previousBox.fixedSize = previousBox.size = null;
								this.fixedChild = box;
							}
							previousBox.remove();
						}
						if (!this.fixedChild) this.calculateChildRatio(box);
						this.recalculateAllMinSizes();
						this.resize();
						return box;
					}
					recalculateAllMinSizes() {
						let node = this;
						while (node) {
							node.calculateMinSize(true);
							node = node.parent;
						}
					}
				}
				let accordion_handler_event = __webpack_require__(517);
				var AccordionHandler;
				((AccordionHandler2) => {
					AccordionHandler2.toggleBarMouseDown = function(e, accordionConstructor) {
						let toggleBlock = Utils.findNode(e.target, "toggle-block");
						if (!toggleBlock) return;
						let accordionBox, accordionBoxRect, toggleBlockDragging, toggleBlockRect;
						let startIndex, changeIndex, previousIndex;
						let toggleBar, section, splitter;
						let startX = e.clientX, startY = e.clientY;
						let isDragging = false, posX, posY, prevY;
						let prevBlock, topMaxY, nextBlock, bottomMaxY;
						function distance(dx, dy) {
							return dx * dx + dy * dy;
						}
						function calculateNearbyBlocksData() {
							if (!accordionBox) return;
							prevBlock = accordionBox.toggleBlockList[changeIndex - 1] || null;
							nextBlock = accordionBox.toggleBlockList[changeIndex + 1] || null;
							topMaxY = prevBlock && parseInt(prevBlock.style.top, 10) + parseInt(prevBlock.style.height, 10) / 2 + accordionBoxRect.top;
							bottomMaxY = nextBlock && parseInt(nextBlock.style.top, 10) + parseInt(nextBlock.style.height, 10) / 2 + accordionBoxRect.top;
						}
						function startDragging() {
							if (isDragging) return;
							accordionBox = Utils.findHost(toggleBlock, accordionConstructor);
							if (!accordionBox) return;
							accordionBoxRect = accordionBox.element.getBoundingClientRect();
							startIndex = changeIndex = previousIndex = toggleBlock.$index;
							toggleBlockRect = toggleBlock.getBoundingClientRect();
							toggleBlockDragging = toggleBlock.cloneNode(true);
							toggleBlockDragging.$hostAccordionBox = accordionBox;
							toggleBlockDragging.$hostIndex = startIndex;
							toggleBlockDragging.classList.add("toggleBlockDragging");
							Utils.setBox(toggleBlockDragging, toggleBlockRect.left, toggleBlockRect.top, toggleBlockRect.width, toggleBlockRect.height);
							posX = startX - toggleBlockRect.left;
							posY = startY - toggleBlockRect.top;
							document.body.appendChild(toggleBlockDragging);
							toggleBlock.style.opacity = 0;
							calculateNearbyBlocksData();
							isDragging = true;
						}
						function recalculateIndexes(arr) {
							for (let i = 0; i < arr.length; i++) arr[i].$index = i;
						}
						function accordionDataChanged() {
							if (!accordionBox) return;
							recalculateIndexes(accordionBox.sections);
							recalculateIndexes(accordionBox.toggleBarList);
							recalculateIndexes(accordionBox.toggleBlockList);
							recalculateIndexes(accordionBox.splitterList);
							accordionBox.resize();
						}
						function addToAccordionBox(index) {
							if (!accordionBox) return;
							accordionBox.sections.splice(index, 0, section);
							accordionBox.toggleBarList.splice(index, 0, toggleBar);
							accordionBox.toggleBlockList.splice(index, 0, toggleBlock);
							calculateNearbyBlocksData();
							if (nextBlock) {
								accordionBox.element.insertBefore(splitter, nextBlock);
								accordionBox.element.insertBefore(toggleBlock, splitter);
								accordionBox.splitterList.splice(index - 1, 0, splitter);
							} else {
								accordionBox.element.appendChild(splitter);
								accordionBox.element.appendChild(toggleBlock);
								accordionBox.splitterList.push(splitter);
							}
							toggleBlock.$parent = accordionBox;
							splitter.$parent = accordionBox;
							accordionBox.calculateSectionsSizesPercents();
							accordionBox.recalculateChildrenSizes();
							accordionDataChanged();
						}
						function removeFromAccordionBox() {
							if (!accordionBox) return;
							section = accordionBox.sections.splice(previousIndex, 1)[0];
							toggleBar = accordionBox.toggleBarList.splice(previousIndex, 1)[0];
							toggleBlock = accordionBox.toggleBlockList.splice(previousIndex, 1)[0];
							let splitterIndex = accordionBox.splitterList[previousIndex] ? previousIndex : previousIndex - 1;
							splitter = accordionBox.splitterList.splice(splitterIndex, 1)[0];
							toggleBlockDragging.style.height = accordionBox.toggleBarHeight + "px";
							toggleBlock.remove();
							splitter.remove();
							accordionBox.calculateSectionsSizesPercents();
							accordionBox.recalculateChildrenSizes();
							accordionDataChanged();
							accordionBox = void 0;
							toggleBlock.$parent = null;
							splitter.$parent = null;
						}
						function finishDragging() {
							if (!accordionBox) {
								accordionBox = toggleBlockDragging.$hostAccordionBox;
								addToAccordionBox(toggleBlockDragging.$hostIndex);
							}
							toggleBlockDragging.remove();
							toggleBlock.style.opacity = 1;
							isDragging = false;
						}
						let onMouseMove = function(e2) {
							if (e2.type !== "mousemove") return;
							if (!isDragging) {
								if (distance(e2.clientX - startX, e2.clientY - startY) < 25) return;
								startDragging();
							}
							let left = e2.clientX - posX;
							let top = e2.clientY - posY;
							if (accordionBox) {
								if (left < accordionBoxRect.left - accordionBoxRect.width || left > accordionBoxRect.left + accordionBoxRect.width) removeFromAccordionBox();
							}
							if (!accordionBox) {
								accordionBox = Utils.findHost(e2.target, accordionConstructor);
								if (accordionBox) {
									accordionBoxRect = accordionBox.element.getBoundingClientRect();
									nextBlock = Utils.findNode(e2.target, "toggle-block");
									if (nextBlock) startIndex = nextBlock.$index;
									else startIndex = accordionBox.toggleBlockList.length;
									previousIndex = changeIndex = startIndex;
									addToAccordionBox(previousIndex);
									toggleBlockDragging.style.height = toggleBlock.style.height;
								}
							}
							if (accordionBox) {
								left = accordionBoxRect.left;
								if (e2.clientY < prevY && topMaxY && top < topMaxY) changeIndex--;
								else if (e2.clientY > prevY && bottomMaxY && top + toggleBlockRect.height > bottomMaxY) changeIndex++;
								if (changeIndex !== previousIndex) {
									accordionBox.element.insertBefore(toggleBlock, accordionBox.toggleBlockList[changeIndex]);
									let splitterIndex = accordionBox.splitterList[previousIndex] ? previousIndex : previousIndex + 1;
									accordionBox.element.insertBefore(accordionBox.toggleBlockList[changeIndex], accordionBox.splitterList[splitterIndex]);
									accordionBox.sections.splice(changeIndex, 0, accordionBox.sections.splice(previousIndex, 1)[0]);
									accordionBox.toggleBarList.splice(changeIndex, 0, accordionBox.toggleBarList.splice(previousIndex, 1)[0]);
									accordionBox.toggleBlockList.splice(changeIndex, 0, accordionBox.toggleBlockList.splice(previousIndex, 1)[0]);
									calculateNearbyBlocksData();
									accordionDataChanged();
									previousIndex = changeIndex;
								}
							}
							toggleBlockDragging.style.left = left + "px";
							toggleBlockDragging.style.top = top + "px";
							e2.clientX;
							prevY = e2.clientY;
						};
						let onMouseUp = function(e2) {
							if (!isDragging) return;
							finishDragging();
						};
						accordion_handler_event.capture(window, onMouseMove, onMouseUp);
						return e.preventDefault();
					};
					AccordionHandler2.toggleBarOnClick = function(e) {
						let toggleBlock = Utils.findNode(e.target, "toggle-block");
						if (!toggleBlock) return;
						let accordionBox = toggleBlock.$parent;
						let index = toggleBlock.$index;
						if (!accordionBox.isOpenedBlock(toggleBlock)) {
							toggleBlock.classList.add("toggle-opened");
							index = void 0;
						} else toggleBlock.classList.remove("toggle-opened");
						accordionBox.recalculateChildrenSizes(index);
						Box$1.enableAnimation();
						let node = accordionBox.element;
						node.addEventListener("transitionend", function handler() {
							node.removeEventListener("transitionend", handler);
							Box$1.disableAnimation();
						});
						accordionBox.resize();
					};
					AccordionHandler2.splitterMouseDown = function(e) {
						if (e.button !== 0) return;
						let splitter = Utils.findNode(e.target, "splitter");
						if (!splitter) return;
						let accordionBox = splitter.$parent;
						e.clientX;
						let y = e.clientY;
						let splitterIndex = splitter.$index + 1;
						let prevY = y;
						if (!accordionBox.hasNextOpenedBlocks(splitterIndex) || !accordionBox.hasPrevOpenedBlocks(splitterIndex)) return;
						accordionBox.keepState();
						let onMouseMove = function(e2) {
							e2.clientX;
							y = e2.clientY;
							let changedSize = 0;
							if (prevY > y) {
								changedSize = accordionBox.recalculatePreviousSectionsSize(splitterIndex, y);
								if (changedSize === 0) return;
								accordionBox.expandNextSections(splitterIndex, changedSize);
							} else if (prevY < y) {
								changedSize = accordionBox.recalculateNextSectionsSize(splitterIndex, y);
								if (changedSize === 0) return;
								accordionBox.expandPreviousSections(splitterIndex, changedSize);
							} else return;
							prevY = y;
							accordionBox.resize();
						};
						let onResizeEnd = function(e2) {
							accordionBox.dischargeState();
							Box$1.setGlobalCursor("");
							accordionBox.calculateSectionsSizesPercents();
						};
						Box$1.setGlobalCursor(`${accordionBox.vertical ? "ns" : "ew"}-resize`);
						accordion_handler_event.capture(window, onMouseMove, onResizeEnd);
						return e.preventDefault();
					};
				})(AccordionHandler || (AccordionHandler = {}));
				var injectStylesIntoStyleTag = __webpack_require__(591);
				var injectStylesIntoStyleTag_default = /* @__PURE__ */ __webpack_require__.n(injectStylesIntoStyleTag);
				var styleDomAPI = __webpack_require__(740);
				var styleDomAPI_default = /* @__PURE__ */ __webpack_require__.n(styleDomAPI);
				var insertBySelector = __webpack_require__(128);
				var insertBySelector_default = /* @__PURE__ */ __webpack_require__.n(insertBySelector);
				var setAttributesWithoutAttributes = __webpack_require__(855);
				var setAttributesWithoutAttributes_default = /* @__PURE__ */ __webpack_require__.n(setAttributesWithoutAttributes);
				var insertStyleElement = __webpack_require__(51);
				var insertStyleElement_default = /* @__PURE__ */ __webpack_require__.n(insertStyleElement);
				var styleTagTransform = __webpack_require__(656);
				var styleTagTransform_default = /* @__PURE__ */ __webpack_require__.n(styleTagTransform);
				var accordion = __webpack_require__(286);
				var options = {};
				options.styleTagTransform = styleTagTransform_default();
				options.setAttributes = setAttributesWithoutAttributes_default();
				options.insert = insertBySelector_default().bind(null, "head");
				options.domAPI = styleDomAPI_default();
				options.insertStyleElement = insertStyleElement_default();
				injectStylesIntoStyleTag_default()(accordion.A, options);
				const styles_accordion = accordion.A && accordion.A.locals ? accordion.A.locals : void 0;
				dom$1.importCssString(accordion_namespaceObject, "accordion.css");
				const accordion_BOX_MIN_SIZE = 80;
				class Accordion extends Box$1 {
					constructor(options$1) {
						var _a;
						super(options$1);
						this.toggleBarList = [];
						this.splitterList = [];
						this.toggleBlockList = [];
						this.boxMinSize = 30;
						this.toggleBarHeight = 20;
						this.splitterSize = 1;
						this.vertical = options$1.vertical || false;
						this.color = (_a = options$1.color) != null ? _a : "";
						this.sections = options$1.sections;
						this.minSize = options$1.minSize || accordion_BOX_MIN_SIZE;
						this.minVerticalSize = options$1.minVerticalSize || this.minSize;
						this.minHorizontalSize = options$1.minHorizontalSize || this.minSize;
						this.padding = {
							top: 0,
							right: 0,
							bottom: 0,
							left: 0
						};
						this.size = options$1.size;
					}
					hasNextOpenedBlocks(index) {
						for (let i = index; i < this.toggleBlockList.length; i++) if (this.isOpenedByIndex(i)) return true;
						return false;
					}
					hasPrevOpenedBlocks(index) {
						for (let i = index - 1; i >= 0; i--) if (this.isOpenedByIndex(i)) return true;
						return false;
					}
					isOpenedByIndex(index) {
						return this.isOpenedBlock(this.toggleBlockList[index]);
					}
					isOpenedBlock(toggleBlock) {
						return toggleBlock.classList.contains("toggle-opened");
					}
					keepState() {
						this.nextChangedIndexes = [];
						this.prevChangedIndexes = [];
						for (let i = 0; i < this.toggleBlockList.length; i++) if (this.isOpenedByIndex(i)) {
							let section = this.sections[i];
							section.previousSize = section.currentSize;
						}
					}
					dischargeState() {
						this.nextChangedIndexes = void 0;
						this.prevChangedIndexes = void 0;
						for (let i = 0; i < this.toggleBlockList.length; i++) if (this.isOpenedByIndex(i)) this.sections[i].previousSize = void 0;
					}
					recalculatePreviousSectionsSize(index, top, maxChangeSize) {
						let changedSize = 0;
						for (let i = index - 1; i >= 0; i--) {
							if (this.isOpenedByIndex(i)) {
								let section = this.sections[i];
								let rect = section.box.element.getBoundingClientRect();
								let done = false;
								let prevSize = rect.height;
								let currentSize = Math.max(top - rect.top, this.boxMinSize);
								top -= rect.height;
								if (currentSize < prevSize) {
									if (currentSize > this.boxMinSize) done = true;
									if (!this.prevChangedIndexes.includes(i)) this.prevChangedIndexes.unshift(i);
									section.currentSize = currentSize;
									changedSize += prevSize - currentSize;
									if (done || maxChangeSize != void 0 && changedSize >= maxChangeSize) break;
								}
							}
							top -= this.toggleBarHeight;
						}
						return changedSize;
					}
					recalculateNextSectionsSize(index, top, maxChangeSize) {
						let changedSize = 0;
						for (let i = index; i < this.toggleBlockList.length; i++) {
							if (this.isOpenedByIndex(i)) {
								let section = this.sections[i];
								let rect = section.box.element.getBoundingClientRect();
								let done = false;
								let prevSize = rect.height;
								let currentSize = Math.max(rect.bottom - top - this.toggleBarHeight, this.boxMinSize);
								top += rect.height;
								if (currentSize < prevSize) {
									if (currentSize > this.boxMinSize) done = true;
									if (!this.nextChangedIndexes.includes(i)) this.nextChangedIndexes.unshift(i);
									section.currentSize = currentSize;
									changedSize += prevSize - currentSize;
									if (done || maxChangeSize != void 0 && changedSize >= maxChangeSize) break;
								}
							}
							top += this.toggleBarHeight;
							top += this.splitterSize;
						}
						return changedSize;
					}
					restoreChangedSizes(size, changedIndexes) {
						if (!changedIndexes) return size;
						while (changedIndexes.length && size > 0) {
							let index = changedIndexes[0];
							let section = this.sections[index];
							let currSize = section.currentSize;
							section.currentSize = Math.min(section.previousSize, currSize + size);
							size -= section.currentSize - currSize;
							if (section.currentSize >= section.previousSize) changedIndexes.shift();
						}
						return size;
					}
					expandPreviousSections(index, size) {
						size = this.restoreChangedSizes(size, this.prevChangedIndexes);
						if (size <= 0) return;
						let openedSectionsList = [];
						for (let i = index - 1; i >= 0; i--) if (this.isOpenedByIndex(i)) openedSectionsList.push(this.sections[i]);
						this.applySizeToOpenedSections(size, openedSectionsList);
					}
					expandNextSections(index, size) {
						size = this.restoreChangedSizes(size, this.nextChangedIndexes);
						if (size <= 0) return;
						let openedSectionsList = [];
						for (let i = index; i < this.toggleBlockList.length; i++) if (this.isOpenedByIndex(i)) openedSectionsList.push(this.sections[i]);
						this.applySizeToOpenedSections(size, openedSectionsList);
					}
					applySizeToOpenedSections(size, openedSections) {
						let count = openedSections.length;
						if (!count) return;
						let remainder = size % count;
						let addSize = (size - remainder) / count;
						for (let i = 0; i < count; i++) openedSections[i].currentSize += addSize;
						openedSections[0].currentSize += remainder;
					}
					resize() {
						this.$updateChildSize(...this.rect);
					}
					render() {
						var _a, _b;
						if (this.element) return this.element;
						this.element = dom$1.buildDom(["div", {
							class: "box accordion",
							$host: this
						}]);
						let section;
						let splitter;
						let toggleBlock;
						let toggleBar;
						for (let i = 0; i < this.sections.length; i++) {
							section = this.sections[i];
							if (i > 0) {
								splitter = dom$1.buildDom([
									"div",
									{
										class: `splitter accordion-splitter splitter${this.vertical ? "-v" : "-h"}`,
										$index: i - 1,
										$parent: this,
										onmousedown: function(e) {
											AccordionHandler.splitterMouseDown(e);
										}
									},
									["div"]
								]);
								this.element.appendChild(splitter);
								this.splitterList.push(splitter);
							}
							toggleBlock = dom$1.buildDom(["div", {
								class: `toggle-block`,
								$index: i,
								$parent: this
							}]);
							toggleBar = dom$1.buildDom([
								"div",
								{
									class: `toggle-bar toggle-bar${this.vertical ? "-v" : "-h"}`,
									onmousedown: function(e) {
										AccordionHandler.toggleBarMouseDown(e, Accordion);
									},
									onclick: function(e) {
										AccordionHandler.toggleBarOnClick(e);
									}
								},
								[
									"div",
									{ class: "title" },
									section.title
								]
							]);
							section.currentSize = section.savedSize = parseInt((_b = (_a = section.box.size) == null ? void 0 : _a.toString()) != null ? _b : "", 10);
							toggleBlock.appendChild(toggleBar);
							this.toggleBarList.push(toggleBar);
							toggleBlock.appendChild(section.box.render());
							this.element.appendChild(toggleBlock);
							this.toggleBlockList.push(toggleBlock);
						}
						this.element.style.backgroundColor = this.color;
						this.element.style.position = "absolute";
						this.calculateSectionsSizesPercents();
						return this.element;
					}
					calculateSectionsSizesPercents() {
						let totalSize = 0;
						let actualSizes = [];
						for (let i = 0; i < this.sections.length; i++) {
							let section = this.sections[i];
							actualSizes.push(this.isOpenedByIndex(i) ? section.currentSize : section.savedSize);
							totalSize += actualSizes[i];
						}
						let minPercent = Math.floor(this.boxMinSize / totalSize * 100);
						let maxPercent = 100 - minPercent * (this.sections.length - 1);
						let totalPercent = 0;
						for (let i = 0; i < this.sections.length; i++) {
							let section = this.sections[i];
							section.sizePercent = Math.floor(actualSizes[i] / totalSize * 100);
							section.sizePercent = Math.min(Math.max(section.sizePercent, minPercent), maxPercent);
							totalPercent += section.sizePercent;
						}
						if (totalPercent !== 100) this.sections[this.sections.length - 1].sizePercent += 100 - totalPercent;
					}
					setBox(x, y, w, h) {
						this.rect = [
							x,
							y,
							w,
							h
						];
						Utils.setBox(this.element, x, y, w, h);
						this.recalculateChildrenSizes();
						this.$updateChildSize(x, y, w, h);
					}
					recalculateChildrenSizes(index) {
						let height = this.rect[3];
						height -= this.toggleBarHeight * this.toggleBarList.length;
						height -= this.splitterSize * this.splitterList.length;
						let totalSize = 0;
						let openedIndexes = [];
						for (let i = 0; i < this.sections.length; i++) {
							let section = this.sections[i];
							section.currentSize = Math.max(Math.floor(height * section.sizePercent / 100), this.boxMinSize);
							if (this.isOpenedByIndex(i)) {
								totalSize += section.currentSize;
								openedIndexes.push(i);
							} else {
								section.savedSize = section.currentSize;
								section.currentSize = 0;
							}
						}
						let spareSize = height - totalSize;
						if (!spareSize) return;
						if (index !== void 0) {
							let prevOpenedIndexes = [];
							while (openedIndexes.length && openedIndexes[0] < index) prevOpenedIndexes.push(openedIndexes.shift());
							if (!openedIndexes.length) openedIndexes = prevOpenedIndexes;
						}
						let prevSize, changedSize, openedBoxesCount, remainder, addSize;
						while (openedIndexes.length && spareSize) {
							let changedIndexes = [];
							openedBoxesCount = openedIndexes.length;
							remainder = spareSize % openedBoxesCount;
							addSize = (spareSize - remainder) / openedBoxesCount;
							for (let i = 0; i < openedIndexes.length; i++) {
								let section = this.sections[openedIndexes[i]];
								prevSize = section.currentSize;
								if (openedBoxesCount === 1) addSize += remainder;
								section.currentSize += addSize;
								section.currentSize = Math.max(section.currentSize, this.boxMinSize);
								changedSize = section.currentSize - prevSize;
								spareSize -= changedSize;
								openedBoxesCount--;
								if (changedSize < 0) changedIndexes.push(openedIndexes[i]);
							}
							openedIndexes = changedIndexes;
						}
					}
					$updateChildSize(x, y, w, h) {
						x = 0;
						y = 0;
						for (let i = 0; i < this.toggleBlockList.length; i++) {
							let toggleBlock = this.toggleBlockList[i];
							let section = this.sections[i];
							let boxSize = section.currentSize;
							h = this.toggleBarHeight + boxSize;
							Utils.setBox(toggleBlock, x, y, w, h);
							y += this.toggleBarHeight;
							section.box.setBox(0, this.toggleBarHeight, w, boxSize);
							y += boxSize;
							if (this.splitterList[i]) {
								Utils.setBox(this.splitterList[i], x, y, w, this.splitterSize);
								y += this.splitterSize;
							}
						}
					}
					remove() {
						if (this.element) this.element.remove();
						if (this.parent) {
							if (this.vertical === this.parent.vertical) this.parent.minSize -= this.minSize;
							if (this.parent[0] == this) this.parent[0] = void 0;
							if (this.parent[1] == this) this.parent[1] = void 0;
						}
					}
					toJSON() {
						let sections = [];
						let section;
						for (let i = 0; i < this.sections.length; i++) {
							section = this.sections[i];
							sections.push({
								title: section.title,
								boxData: section.box.toJSON()
							});
						}
						return {
							type: "accordion",
							vertical: this.vertical,
							size: this.size,
							sections
						};
					}
				}
				var popup_ = __webpack_require__(910);
				class ListBox extends Box$1 {
					render() {
						if (this.element) return this.element;
						this.element = super.render();
						let popup = new popup_.AcePopup();
						popup.renderer.setStyle("ace_listBox");
						popup.container.style.display = "block";
						popup.container.style.position = "absolute";
						popup.container.style.zIndex = "0";
						popup.container.style.boxShadow = "none";
						popup.renderer.setScrollMargin(2, 2, 0, 0);
						popup.autoSelect = false;
						popup.renderer["$maxLines"] = null;
						popup.setRow(-1);
						popup.on("click", (e) => {
							e.stop();
							popup.getData(popup.getRow());
						});
						popup.on("dblclick", (e) => {
							e.stop();
							popup.getData(popup.getRow());
						});
						popup.on("tripleclick", (e) => {
							e.stop();
						});
						popup.on("quadclick", (e) => {
							e.stop();
						});
						this.element.appendChild(popup.container);
						this.popup = popup;
						delete popup.focus;
						return this.element;
					}
					$updateChildSize(x, y, w, h) {
						Utils.setBox(this.popup.container, x, y, w, h);
						this.popup.resize(true);
					}
				}
				var esm_resolver_ = __webpack_require__(444);
				var esm_resolver_default = /* @__PURE__ */ __webpack_require__.n(esm_resolver_);
				var editor_ = __webpack_require__(254);
				var virtual_renderer_ = __webpack_require__(748);
				__webpack_require__(685);
				const modeList = __webpack_require__(292);
				class AceEditor {
					resize() {
						this.editor.resize();
					}
					focus() {
						this.editor.focus();
					}
					destroy() {
						this.editor.setSession(esm_resolver_default().createEditSession("", this.getMode()));
						this.editor.destroy();
						this.container.remove();
					}
					constructor() {
						this.editor = new editor_.Editor(new virtual_renderer_.VirtualRenderer(null));
						this.container = this.editor.container;
						this.container.style.position = "absolute";
						this.editor.setOptions({
							customScrollbar: false,
							newLineMode: "unix",
							enableLiveAutocompletion: true,
							enableBasicAutocompletion: true,
							showPrintMargin: false
						});
					}
					setSession(tab$1, value) {
						this.tab = tab$1;
						this.initTabSession(value);
						this.editor.setSession(this.tab.session);
					}
					initTabSession(value) {
						var _a;
						if (this.tab.session && value == null) return;
						(_a = this.tab).session ?? (_a.session = esm_resolver_default().createEditSession(value != null ? value : "", this.getMode()));
						if (value == null) this.restoreSessionFromJson(this.tab);
						else this.tab.session.setValue(value);
					}
					getMode() {
						if (this.tab.path !== void 0) return modeList.getModeForPath(this.tab.path).mode;
						return null;
					}
					static getSessionState(tab$1) {
						let session = tab$1.session;
						let undoManager = session.getUndoManager();
						return JSON.stringify({
							selection: session.selection.toJSON(),
							undoManager: undoManager.toJSON(),
							value: session.getValue(),
							scroll: [session.getScrollLeft(), session.getScrollTop()]
						});
					}
					sessionToJSON(tab$1) {
						return AceEditor.getSessionState(tab$1);
					}
					restoreSessionFromJson(tab$1) {
						if (!tab$1.session || !tab$1.sessionValue) return;
						let session = tab$1.session;
						let json = JSON.parse(tab$1.sessionValue);
						try {
							if (typeof json.value == "string" && json.value != session.getValue()) session.doc.setValue(json.value);
							if (json.selection) session.selection.fromJSON(json.selection);
							if (json.scroll) {
								session.setScrollLeft(json.scroll[0]);
								session.setScrollTop(json.scroll[1]);
							}
							tab$1.sessionValue = void 0;
						} catch (e) {
							console.error(e);
						}
					}
				}
				class PreviewEditor {
					resize() {}
					focus() {}
					destroy() {
						this.container.remove();
					}
					constructor() {
						this.container = document.createElement("iframe");
						this.container.style.position = "absolute";
					}
					setSession(tab$1, value) {
						this.tab = tab$1;
						value ??= tab$1.session;
						tab$1.session = value;
						this.container.setAttribute("srcdoc", value);
					}
					restoreSessionFromJson(tab$1) {
						var _a;
						tab$1.session = (_a = tab$1.sessionValue) != null ? _a : "";
						tab$1.sessionValue = void 0;
					}
					sessionToJSON(tab$1) {
						return tab$1.session;
					}
				}
				let tabbar_handler_event = __webpack_require__(517);
				var TabbarHandler;
				((TabbarHandler2) => {
					TabbarHandler2.tabbarMouseDown = function(e, tabConstructor, tabBarConstructor, showSplit = false) {
						let divSplit, splitPosition, pane;
						function hideSplitPosition() {
							if (!divSplit) return;
							divSplit.remove();
							divSplit = splitPosition = pane = null;
						}
						function showSplitPosition(e2) {
							let el = e2.target;
							if (tabBar) {
								hideSplitPosition();
								return;
							}
							pane = Utils.findHost(el);
							if (!pane || !pane.acceptsTab || !pane.acceptsTab(tab$1)) {
								hideSplitPosition();
								return;
							}
							if (pane.tabBar.tabList.length === 0) {
								hideSplitPosition();
								return;
							}
							if (!divSplit) {
								divSplit = document.createElement("div");
								document.body.appendChild(divSplit);
							}
							divSplit.className = "split-area";
							let rect = pane.element.getBoundingClientRect();
							let bHeight = pane.tabBar.element.clientHeight - 1;
							rect = {
								left: rect.left,
								top: rect.top + bHeight,
								width: rect.width,
								height: rect.height - bHeight
							};
							let left = (e2.clientX - rect.left) / rect.width;
							let right = 1 - left;
							let top = (e2.clientY - rect.top) / rect.height;
							let bottom = 1 - top;
							let min = Math.min(left, top, right, bottom);
							if (min == left) {
								splitPosition = [true, false];
								Utils.setBox(divSplit, rect.left, rect.top, rect.width / 2, rect.height);
							} else if (min == right) {
								splitPosition = [false, false];
								Utils.setBox(divSplit, rect.left + rect.width / 2, rect.top, rect.width / 2, rect.height);
							} else if (min == top) {
								splitPosition = [true, true];
								Utils.setBox(divSplit, rect.left, rect.top, rect.width, rect.height / 2);
							} else if (min == bottom) {
								splitPosition = [false, true];
								Utils.setBox(divSplit, rect.left, rect.top + rect.height / 2, rect.width, rect.height / 2);
							}
						}
						if (e.target.classList.contains("tabCloseButton")) return;
						let tab$1 = Utils.findHost(e.target, tabConstructor);
						if (!tab$1) return;
						let tabBar = Utils.findHost(e.target, tabBarConstructor);
						if (!tabBar) return;
						let isVertical = tabBar.isVertical();
						tabBar.tabMouseDown(tab$1, e.shiftKey, e.ctrlKey);
						if (e.shiftKey || e.ctrlKey) return;
						let isDragging = false;
						let posX, posY, prevX, prevY;
						let startX = e.clientX, startY = e.clientY;
						let parentRect, tabElement, index, selectedTabs, hostTabBar, hostIndex;
						let prevTab, leftMaxX, topMaxY, nextTab, rightMaxX, bottomMaxY;
						let tabDragElementSize = 0;
						let tabDragElementLeft = 0;
						let tabDragElementTop = 0;
						let calculateNearbyTabsData = function() {
							if (isVertical) {
								topMaxY = prevTab && parseInt(prevTab.style.top, 10) + parseInt(prevTab.style.height, 10) / 2 + parentRect.top;
								bottomMaxY = nextTab && parseInt(nextTab.style.top, 10) + parseInt(nextTab.style.height, 10) / 2 + parentRect.top;
							} else {
								if (prevTab) {
									let prevSibling = prevTab.previousSibling;
									leftMaxX = prevSibling ? parseInt(prevSibling.style.left, 10) + parseInt(prevSibling.style.width, 10) + parentRect.left : parentRect.left;
								}
								rightMaxX = nextTab && parseInt(nextTab.style.left, 10) + parseInt(nextTab.style.width, 10) / 2 + parentRect.left;
							}
						};
						let startDragging = function() {
							if (isDragging || !tabBar) return;
							tabElement = dom$1.buildDom(["div", { class: "tabDragging" }]);
							let activeIndex = index = tabBar.tabList.indexOf(tab$1);
							tabBar.tabContainer.insertBefore(tabElement, tab$1.element);
							tabDragElementLeft = parseInt(tab$1.element.style.left, 10);
							tabDragElementTop = parseInt(tab$1.element.style.top, 10);
							selectedTabs = [];
							let selectedTab, selectedTabElement;
							for (let i = 0; i < tabBar.selectedTabs.length; i++) {
								selectedTab = tabBar.selectedTabs[i];
								selectedTab.currentIndex = tabBar.tabList.indexOf(selectedTab);
								if (selectedTab.currentIndex < activeIndex) {
									index--;
									if (isVertical) tabDragElementTop -= parseInt(selectedTab.element.style.top, 10);
									else tabDragElementLeft -= parseInt(selectedTab.element.style.width, 10);
								}
								selectedTabs.push(selectedTab);
							}
							selectedTabs.sort(function(tab1, tab2) {
								return tab1.currentIndex - tab2.currentIndex;
							});
							for (let i = 0; i < selectedTabs.length; i++) {
								selectedTab = selectedTabs[i];
								selectedTabElement = selectedTab.element;
								tabElement.appendChild(selectedTabElement);
								selectedTabElement.style.pointerEvents = "none";
								if (isVertical) {
									selectedTabElement.style.top = tabDragElementSize + "px";
									tabDragElementSize += parseInt(selectedTabElement.style.height, 10);
								} else {
									selectedTabElement.style.left = tabDragElementSize + "px";
									tabDragElementSize += parseInt(selectedTabElement.style.width, 10);
								}
								tabBar.removeTab(selectedTab);
							}
							prevTab = tabElement.previousSibling;
							nextTab = tabElement.nextSibling;
							parentRect = tabBar.element.getBoundingClientRect();
							if (isVertical) {
								tabDragElementTop += parentRect.top;
								posY = startY - tabDragElementTop;
								posX = startX - parentRect.left;
							} else {
								tabDragElementLeft += parentRect.left;
								posX = startX - tabDragElementLeft;
								posY = startY - parentRect.top;
							}
							prevX = e.clientX;
							prevY = e.clientY;
							hostTabBar = tabBar;
							hostIndex = index;
							calculateNearbyTabsData();
							isDragging = true;
							document.body.appendChild(tabElement);
							if (isVertical) Utils.setBox(tabElement, tabDragElementTop, parentRect.left, parentRect.width, tabDragElementSize);
							else Utils.setBox(tabElement, tabDragElementLeft, parentRect.top, tabDragElementSize, parentRect.height);
							tabBar.startTabDragging(tabElement, index);
						};
						let finishDragging = function() {
							if (pane && pane.split && splitPosition) tabBar = pane.split(...splitPosition).tabBar;
							else if (!tabBar) tabBar = hostTabBar;
							tabBar.removeSelections();
							tabElement.remove();
							let selectedTab;
							for (let i = 0; i < selectedTabs.length; i++) {
								selectedTab = selectedTabs[i];
								selectedTab.element.style.pointerEvents = "";
								if (selectedTab === tab$1) selectedTab.active = true;
								tabBar.addTab(selectedTab, index++);
								tabBar.addSelection(selectedTab);
							}
							if (tabBar !== hostTabBar) {
								hostTabBar.removeSelections();
								hostTabBar.activatePrevious(hostIndex);
							}
							tabBar.finishTabDragging();
							isDragging = false;
							hideSplitPosition();
						};
						function distance(dx, dy) {
							return dx * dx + dy * dy;
						}
						let onMouseMove = function(e2) {
							if (e2.type !== "mousemove") return;
							if (!isDragging) {
								if (distance(e2.clientX - startX, e2.clientY - startY) < 25) return;
								startDragging();
							}
							function removeTabFromBar() {
								tabBar.finishTabDragging();
								tabBar = void 0;
							}
							if (tabBar) {
								tabBar.startTabDragging(tabElement, index);
								if (!isVertical && (e2.clientX < parentRect.left || e2.clientX > parentRect.left + parentRect.width) || isVertical && (e2.clientY < parentRect.top || e2.clientY > parentRect.top + parentRect.height)) removeTabFromBar();
							} else {
								tabBar = Utils.findHost(e2.target, tabBarConstructor);
								if (tabBar) {
									isVertical = tabBar.isVertical();
									let nextTabHost = Utils.findHost(e2.target, tabConstructor);
									if (nextTabHost) {
										index = tabBar.tabList.indexOf(nextTabHost);
										nextTab = nextTabHost.element;
										prevTab = nextTab.previousSibling;
									} else {
										index = tabBar.tabList.length;
										nextTab = null;
										prevTab = tabBar.tabContainer.childNodes[index - 1];
									}
									tabBar.startTabDragging(tabElement, index);
									parentRect = tabBar.element.getBoundingClientRect();
									calculateNearbyTabsData();
								}
							}
							if (showSplit) showSplitPosition(e2);
							let left = e2.clientX - posX;
							let top = e2.clientY - posY;
							let x = left;
							let y = top;
							if (tabBar) if (isVertical && (x < parentRect.left - parentRect.width || x > parentRect.left + parentRect.width) || !isVertical && (y < parentRect.top - parentRect.height || y > parentRect.top + parentRect.height)) removeTabFromBar();
							else {
								if (isVertical) x = parentRect.left;
								else y = parentRect.top;
								if (isVertical && e2.clientY < prevY && topMaxY && top < topMaxY || !isVertical && e2.clientX < prevX && leftMaxX && left < leftMaxX) {
									if (isVertical) prevTab.style.top = parseInt(prevTab.style.top, 10) + tabDragElementSize + "px";
									else prevTab.style.left = parseInt(prevTab.style.left, 10) + tabDragElementSize + "px";
									index--;
									[prevTab, nextTab] = [prevTab.previousSibling, prevTab];
									calculateNearbyTabsData();
								} else if (isVertical && e2.clientY > prevY && bottomMaxY && top + tabDragElementSize > bottomMaxY || !isVertical && e2.clientX > prevX && rightMaxX && left + tabDragElementSize > rightMaxX) {
									if (isVertical) nextTab.style.top = parseInt(nextTab.style.top, 10) - tabDragElementSize + "px";
									else nextTab.style.left = parseInt(nextTab.style.left, 10) - tabDragElementSize + "px";
									index++;
									[prevTab, nextTab] = [nextTab, nextTab.nextSibling];
									calculateNearbyTabsData();
								}
							}
							prevX = e2.clientX;
							prevY = e2.clientY;
							tabElement.style.left = x + "px";
							tabElement.style.top = y + "px";
						};
						let onMouseUp = function(e2) {
							if (!isDragging) {
								if (tabBar.selectedTabs.length > 1) {
									tabBar.removeSelections();
									tabBar.addSelection(tab$1);
								}
							} else finishDragging();
						};
						tabbar_handler_event.capture(window, onMouseMove, onMouseUp);
						return e.preventDefault();
					};
				})(TabbarHandler || (TabbarHandler = {}));
				window.addEventListener("mousedown", function() {
					document.body.classList.add("disableIframe");
				}, true);
				window.addEventListener("mouseup", function() {
					document.body.classList.remove("disableIframe");
				}, true);
				var tab = __webpack_require__(129);
				var tab_options = {};
				tab_options.styleTagTransform = styleTagTransform_default();
				tab_options.setAttributes = setAttributesWithoutAttributes_default();
				tab_options.insert = insertBySelector_default().bind(null, "head");
				tab_options.domAPI = styleDomAPI_default();
				tab_options.insertStyleElement = insertStyleElement_default();
				injectStylesIntoStyleTag_default()(tab.A, tab_options);
				const styles_tab = tab.A && tab.A.locals ? tab.A.locals : void 0;
				class TabPanel {
					constructor(options$1) {
						var _a;
						this.active = (_a = options$1.active) != null ? _a : false;
						this.title = options$1.title;
					}
					activate() {
						this.active = true;
						this.element.classList.add("active");
					}
					deactivate() {
						this.active = false;
						this.element.classList.remove("active");
					}
				}
				dom$1.importCssString(tab_namespaceObject, "tab.css");
				class Tab extends TabPanel {
					constructor(options$1) {
						var _a, _b, _c;
						super(options$1);
						this.contextMenu = "tabs";
						this.tabIcon = (_a = options$1.icon) != null ? _a : "";
						this.path = options$1.path;
						this.preview = (_b = options$1.preview) != null ? _b : false;
						this.editorType = (_c = options$1.editorType) != null ? _c : EditorType.ace;
					}
					toJSON() {
						return {
							title: this.title,
							icon: this.tabIcon || void 0,
							active: this.active || void 0,
							path: this.path,
							preview: this.preview || void 0,
							editorType: this.editorType
						};
					}
					activate(content) {
						super.activate();
						this.activatePane();
						let tabManager$1 = TabManager$1.getInstance();
						tabManager$1.loadFile(this, content);
						tabManager$1.activePane.resize();
					}
					activatePane() {
						var _a;
						TabManager$1.getInstance().activePane = (_a = this.parent) == null ? void 0 : _a.parent;
					}
					remove() {
						var _a;
						(_a = this.parent) == null || _a.closeTab(this);
					}
					set caption(value) {
						this.$caption = value;
					}
					get caption() {
						return this.$caption;
					}
					render() {
						this.element = dom$1.buildDom([
							"div",
							{
								class: "tab" + (this.active ? " active" : ""),
								title: this.path
							},
							[
								"span",
								{ class: "tabIcon" },
								this.tabIcon
							],
							[
								"span",
								{
									class: "tabTitle",
									ref: "$title"
								},
								this.title
							],
							["span", { class: "tabCloseButton" }]
						], void 0, this);
						if (this.preview) this.element.style.fontStyle = "italic";
						this.element.$host = this;
						return this.element;
					}
					setTitle(title) {
						this.title = title;
						this.element.getElementsByClassName("tabTitle")[0].innerHTML = title;
					}
					get isActive() {
						var _a;
						return ((_a = this.parent) == null ? void 0 : _a.activeTab) == this;
					}
					get editor() {
						var _a;
						return (_a = this.parent) == null ? void 0 : _a.parent.getEditor(this.editorType);
					}
				}
				function getCurrentPaneTabs(element) {
					var _a, _b, _c, _d;
					if (element instanceof Tab) return {
						tabs: [...(_b = (_a = element.parent) == null ? void 0 : _a.tabList) != null ? _b : []],
						activeTab: element
					};
					else return {
						tabs: [...(_d = (_c = element.activePane) == null ? void 0 : _c.tabBar.tabList) != null ? _d : []],
						activeTab: element.activeTab
					};
				}
				function goToTab(el, tabNum) {
					let currentPaneTabs = getCurrentPaneTabs(el);
					let tabs = currentPaneTabs.tabs;
					let activeTab = currentPaneTabs.activeTab;
					let index = tabNum != null ? tabNum : tabs.indexOf(activeTab);
					TabManager$1.getInstance().navigateToTab(index, activeTab, tabs);
				}
				let tabCommands = [
					{
						name: "clonetab",
						mac: "",
						win: "",
						desc: "Create a new tab with a view on the same file"
					},
					{
						name: "Close Tab",
						mac: "Option-W",
						win: "Alt-W",
						desc: "close the tab that is currently active",
						position: 300,
						exec: (el) => {
							if (el instanceof Tab) el.remove();
							else el.activeTab.remove();
						}
					},
					{
						name: "Close All Tabs",
						mac: "Option-Shift-W",
						win: "Alt-Shift-W",
						desc: "Close all opened tabs",
						position: 310,
						exec: () => {
							let tabs = TabManager$1.getInstance().tabs;
							for (let i in tabs) tabs[i].remove();
						}
					},
					{
						name: "Close other tabs",
						mac: "Option-Ctrl-W",
						win: "Ctrl-Alt-W",
						desc: "close all opened tabs, except the tab that is currently active",
						position: 320,
						exec: (el) => {
							let currentPaneTabs = getCurrentPaneTabs(el);
							let tabs = currentPaneTabs.tabs;
							let activeTab = currentPaneTabs.activeTab;
							for (let tab$1 of tabs) if (tab$1 != activeTab) tab$1.remove();
						}
					},
					{
						name: "Go to tab right",
						mac: "Command-}",
						win: "Ctrl-}",
						desc: "navigate to the next tab, right to the tab that is currently active",
						position: 330,
						exec: (el) => {
							let currentPaneTabs = getCurrentPaneTabs(el);
							let tabs = currentPaneTabs.tabs;
							let activeTab = currentPaneTabs.activeTab;
							let index = tabs.indexOf(activeTab);
							TabManager$1.getInstance().navigateToTab(index + 1, activeTab, tabs);
						}
					},
					{
						name: "Go to tab left",
						mac: "Command-{",
						win: "Ctrl-{",
						desc: "navigate to the next tab, left to the tab that is currently active",
						position: 340,
						exec: (el) => {
							let currentPaneTabs = getCurrentPaneTabs(el);
							let tabs = currentPaneTabs.tabs;
							let activeTab = currentPaneTabs.activeTab;
							let index = tabs.indexOf(activeTab);
							TabManager$1.getInstance().navigateToTab(index - 1, activeTab, tabs);
						}
					},
					{
						name: "movetabright",
						mac: "Command-Option-Shift-Right",
						win: "Ctrl-Meta-Right",
						desc: "move the tab that is currently active to the right. Will create a split tab to the right if it's the right most tab."
					},
					{
						name: "movetableft",
						mac: "Command-Option-Shift-Left",
						win: "Ctrl-Meta-Left",
						desc: "move the tab that is currently active to the left. Will create a split tab to the left if it's the left most tab."
					},
					{
						name: "movetabup",
						mac: "Command-Option-Shift-Up",
						win: "Ctrl-Meta-Up",
						desc: "move the tab that is currently active to the up. Will create a split tab to the top if it's the top most tab."
					},
					{
						name: "movetabdown",
						mac: "Command-Option-Shift-Down",
						win: "Ctrl-Meta-Down",
						desc: "move the tab that is currently active to the down. Will create a split tab to the bottom if it's the bottom most tab."
					},
					{
						name: "Go to first tab",
						mac: "Command-1",
						win: "Ctrl-1",
						desc: "navigate to the first tab",
						position: 340,
						exec: (el) => {
							goToTab(el, 0);
						}
					},
					{
						name: "Go to second tab",
						mac: "Command-2",
						win: "Ctrl-2",
						desc: "navigate to the second tab",
						position: 340,
						exec: (el) => {
							goToTab(el, 1);
						}
					},
					{
						name: "Go to third tab",
						mac: "Command-3",
						win: "Ctrl-3",
						desc: "navigate to the third tab",
						position: 340,
						exec: (el) => {
							goToTab(el, 2);
						}
					},
					{
						name: "tab4",
						mac: "Command-4",
						win: "Ctrl-4",
						desc: "navigate to the fourth tab",
						position: 340,
						exec: (el) => {
							goToTab(el, 3);
						}
					},
					{
						name: "tab5",
						mac: "Command-5",
						win: "Ctrl-5",
						desc: "navigate to the fifth tab",
						position: 340,
						exec: (el) => {
							goToTab(el, 4);
						}
					},
					{
						name: "tab6",
						mac: "Command-6",
						win: "Ctrl-6",
						desc: "navigate to the sixth tab",
						position: 340,
						exec: (el) => {
							goToTab(el, 5);
						}
					},
					{
						name: "tab7",
						mac: "Command-7",
						win: "Ctrl-7",
						desc: "navigate to the seventh tab",
						position: 340,
						exec: (el) => {
							goToTab(el, 6);
						}
					},
					{
						name: "tab8",
						mac: "Command-8",
						win: "Ctrl-8",
						desc: "navigate to the eighth tab",
						position: 340,
						exec: (el) => {
							goToTab(el, 7);
						}
					},
					{
						name: "tab9",
						mac: "Command-9",
						win: "Ctrl-9",
						desc: "navigate to the ninth tab",
						position: 340,
						exec: (el) => {
							goToTab(el, 8);
						}
					},
					{
						name: "tab0",
						mac: "Command-0",
						win: "Ctrl-0",
						desc: "navigate to the tenth tab",
						position: 340,
						exec: (el) => {
							goToTab(el, 9);
						}
					},
					{
						name: "Reveal tab",
						mac: "Command-Shift-L",
						win: "Ctrl-Shift-L",
						desc: "reveal current tab in the file tree",
						position: 340,
						exec: (el) => {}
					},
					{
						name: "Go to next tab",
						mac: "Option-Tab",
						win: "Ctrl-Tab|Alt-`",
						desc: "navigate to the next tab in the stack of accessed tabs",
						position: 340,
						exec: (el) => {
							let currentPaneTabs = getCurrentPaneTabs(el);
							let tabs = currentPaneTabs.tabs;
							let activeTab = currentPaneTabs.activeTab;
							let index = tabs.indexOf(activeTab);
							if (index < tabs.length - 1) TabManager$1.getInstance().navigateToTab(index + 1, activeTab, tabs);
							else TabManager$1.getInstance().navigateToTab(0, activeTab, tabs);
						}
					},
					{
						name: "Go to previous tab",
						mac: "Option-Shift-Tab",
						win: "Ctrl-Shift-Tab|Alt-Shift-`",
						desc: "navigate to the previous tab in the stack of accessed tabs",
						position: 340,
						exec: (el) => {
							let currentPaneTabs = getCurrentPaneTabs(el);
							let tabs = currentPaneTabs.tabs;
							let activeTab = currentPaneTabs.activeTab;
							let index = tabs.indexOf(activeTab);
							if (index > 0) TabManager$1.getInstance().navigateToTab(index - 1, activeTab, tabs);
							else TabManager$1.getInstance().navigateToTab(tabs.length - 1, activeTab, tabs);
						}
					},
					{
						name: "nextpane",
						mac: "Option-ESC",
						win: "Ctrl-`",
						desc: "navigate to the next tab in the stack of panes"
					},
					{
						name: "previouspane",
						mac: "Option-Shift-ESC",
						win: "Ctrl-Shift-`",
						desc: "navigate to the previous tab in the stack of panes"
					},
					{
						name: "gotopaneright",
						mac: "Ctrl-Meta-Right",
						win: "Ctrl-Meta-Right",
						desc: "navigate to the pane on the right"
					},
					{
						name: "gotopaneleft",
						mac: "Ctrl-Meta-Left",
						win: "Ctrl-Meta-Left",
						desc: "navigate to the pane on the left"
					},
					{
						name: "gotopaneup",
						mac: "Ctrl-Meta-Up",
						win: "Ctrl-Meta-Up",
						desc: "navigate to the pane on the top"
					},
					{
						name: "gotopanedown",
						mac: "Ctrl-Meta-Down",
						win: "Ctrl-Meta-Down",
						desc: "navigate to the pane on the bottom"
					},
					{
						name: "reopenLastTab",
						mac: "Option-Shift-T",
						win: "Alt-Shift-T",
						desc: "reopen last closed tab"
					},
					{
						name: "Close all to the right",
						mac: "",
						win: "",
						desc: "close all tabs to the right of the focussed tab",
						position: 340,
						exec: (el) => {
							let currentPaneTabs = getCurrentPaneTabs(el);
							let tabs = currentPaneTabs.tabs;
							let activeTab = currentPaneTabs.activeTab;
							let index = tabs.indexOf(activeTab);
							if (index < tabs.length - 1) for (let i = index + 1; i < tabs.length; i++) tabs[i].remove();
						}
					},
					{
						name: "Close all to the left",
						mac: "",
						win: "",
						desc: "close all tabs to the left of the focussed tab",
						position: 340,
						exec: (el) => {
							let currentPaneTabs = getCurrentPaneTabs(el);
							let tabs = currentPaneTabs.tabs;
							let activeTab = currentPaneTabs.activeTab;
							let index = tabs.indexOf(activeTab);
							if (index > 0) for (let i = 0; i < index; i++) tabs[i].remove();
						}
					},
					{
						name: "Close pane",
						mac: "Command-Ctrl-W",
						win: "Ctrl-W",
						desc: "close this pane",
						position: 340,
						exec: (el) => {
							var _a, _b;
							let tabs;
							if (el instanceof Tab) tabs = [...(_b = (_a = el.parent) == null ? void 0 : _a.tabList) != null ? _b : []];
							else tabs = [...el.activePane.tabBar.tabList];
							for (let tab$1 of tabs) tab$1.remove();
						}
					},
					{
						name: "nosplit",
						mac: "",
						win: "",
						desc: "no split"
					},
					{
						name: "hsplit",
						mac: "",
						win: "",
						desc: "split the current pane in two columns and move the active tab to it"
					},
					{
						name: "vsplit",
						mac: "",
						win: "",
						desc: "split the current pane in two rows and move the active tab to it"
					},
					{
						name: "twovsplit",
						mac: "",
						win: "",
						desc: "create a two pane row layout"
					},
					{
						name: "twohsplit",
						mac: "",
						win: "",
						desc: "create a two pane column layout"
					},
					{
						name: "foursplit",
						mac: "",
						win: "",
						desc: "create a four pane layout"
					},
					{
						name: "threeleft",
						mac: "",
						win: "",
						desc: "create a three pane layout with the stack on the left side"
					},
					{
						name: "threeright",
						mac: "",
						win: "",
						desc: "create a three pane layout with the stack on the right side"
					}
				];
				var event_emitter_ = __webpack_require__(540);
				var menu = __webpack_require__(807);
				var menu_options = {};
				menu_options.styleTagTransform = styleTagTransform_default();
				menu_options.setAttributes = setAttributesWithoutAttributes_default();
				menu_options.insert = insertBySelector_default().bind(null, "head");
				menu_options.domAPI = styleDomAPI_default();
				menu_options.insertStyleElement = insertStyleElement_default();
				injectStylesIntoStyleTag_default()(menu.A, menu_options);
				const styles_menu = menu.A && menu.A.locals ? menu.A.locals : void 0;
				dom$1.importCssString(menu_namespaceObject, "menu.css");
				class Menu {
					getLastOpenPopup() {
						return !this.menuPopup ? this : this.menuPopup.getLastOpenPopup();
					}
					getLastSelectedMenu() {
						return !this.menuPopup || !this.menuPopup.selectedMenu ? this.selectedMenu : this.menuPopup.getLastSelectedMenu();
					}
					closeLastMenu() {
						if (this.menuPopup && this.menuPopup.menuPopup) this.menuPopup.closeLastMenu();
						else this.closeMenu();
					}
					selectMenu(menu$1) {
						menu$1.buttonElement.classList.add(this.selectedClass);
						this.selectedMenu = menu$1;
					}
					unselectMenu() {
						if (!this.selectedMenu) return;
						this.selectedMenu.buttonElement.classList.remove(this.selectedClass);
						this.selectedMenu = void 0;
					}
					openMenu(direction) {
						if (!direction && this.constructor.name === "MenuPopup") direction = "right";
						if (this.menuPopup) return this.menuPopup;
						this.menuPopup = new MenuPopup();
						this.menuPopup.direction = direction != null ? direction : "";
						this.menuPopup.isSubMenu = this.constructor.name === "MenuPopup";
						this.menuPopup.menuManager = this.menuManager;
						this.menuPopup.menu = this.selectedMenu;
						this.menuPopup.parentMenu = this;
						this.menuPopup.open();
						if (this.menuManager.searchBox && this.menuManager.searchBox.isOpen) if (!this.menuPopup.isSubMenu) this.menuManager.searchBox.setParentPopup(this.menuPopup);
						else this.menuManager.searchBox.addSymbol("/");
						return this.menuPopup;
					}
					closeMenu() {
						if (!this.menuPopup) return;
						if (this.menuManager.searchBox && this.menuManager.searchBox.isOpen && this.menuPopup.isSubMenu && this.menuManager.searchBox.value.substring(this.menuManager.searchBox.value.length - 1) === "/") this.menuManager.searchBox.removeSymbol();
						this.menuPopup.close();
						this.menuPopup = void 0;
					}
					moveOnTarget(target) {
						let host = target ? target.$host : null;
						if (!host) return;
						if (this.selectedMenu) if (host.path === this.selectedMenu.path) return;
						else this.unselectMenu();
						if (this.menuPopup) this.closeMenu();
						host.buttonElement = host.$buttonElement || target;
						this.selectMenu(host);
					}
					openMenuByPath(path) {
						var _a;
						if (typeof path === "string") path = path.split("/");
						let menu$1 = this.getMenuByPath(path.shift());
						if (!menu$1) return;
						if (!menu$1.$host) menu$1.$host = menu$1;
						this.moveOnTarget(menu$1);
						if (!menu$1.$host.map) return;
						this.openMenu();
						if (path.length) (_a = this.menuPopup) == null || _a.openMenuByPath(path);
					}
				}
				class MenuBar extends Menu {
					constructor() {
						super(...arguments);
						this.selectedClass = "menuButtonDown";
						this.onMouseMove = (e) => {
							let target = this.menuManager.getTarget(e.target);
							this.moveOnTarget(target);
						};
					}
					build(parent) {
						this.element = parent;
						let items = this.menus.map || {};
						Object.keys(items).filter(Boolean).map((key) => items[key]).sort(function(item1, item2) {
							return item1.position - item2.position;
						}).map((item) => {
							item.$buttonElement = dom$1.buildDom([
								"div",
								{
									class: "menuButton" + (item.className ? " " + item.className : ""),
									$host: item,
									onmousedown: (e) => this.onMouseDown(e)
								},
								item.label + ""
							], this.element);
						});
						this.bottom = this.element.getBoundingClientRect().bottom;
					}
					activateMenu() {
						this.element.addEventListener("mousemove", this.onMouseMove);
					}
					inactivateMenu() {
						this.unselectMenu();
						this.closeMenu();
						this.element.removeEventListener("mousemove", this.onMouseMove);
					}
					onMouseDown(e) {
						e.preventDefault();
						if (this.menuManager.isActive) this.menuManager.inactivateMenu();
						else {
							let target = e.target;
							target.$host.buttonElement = target.$host.$buttonElement;
							this.selectMenu(target.$host);
							this.openMenu();
							this.menuManager.activeMenu = this;
							this.menuManager.activateMenu();
						}
					}
					moveOnTarget(target) {
						var _a;
						super.moveOnTarget(target);
						if ((_a = this.selectedMenu) == null ? void 0 : _a.map) this.openMenu();
					}
					getMenuByPath(path) {
						return this.menuManager.find(path);
					}
				}
				class MenuPopup extends Menu {
					constructor() {
						super(...arguments);
						this.selectedClass = "hover";
						this.isSubMenu = false;
						this.onMouseMove = (e) => {
							var _a;
							if (e.target === this.element) return;
							if (this.menuPopup && this.isDirectedToSubMenu(e)) return;
							let target = this.menuManager.getTarget(e.target);
							if (target === this.element) return;
							this.moveOnTarget(target);
							if ((_a = this.selectedMenu) == null ? void 0 : _a.map) this.openMenu();
						};
						this.onMouseUp = (e) => {
							if (e.target === this.element) return;
							let target = this.menuManager.getTarget(e.target);
							if (!target || target === this.element) return;
							let host = target.$host;
							if (host && host.buttonElement) {
								e.preventDefault();
								if (host.exec) host.exec(this.menuManager.currentHost);
							}
							if (!host.map) this.menuManager.inactivateMenu();
						};
					}
					inactivateMenu() {
						this.close();
					}
					activateMenu() {}
					open() {
						this.build();
						this.render();
					}
					build() {
						if (this.element) return;
						if (this.menu.element) {
							this.element = this.menu.element;
							return;
						}
						let result = [];
						if (this.menu.map) {
							let items = Object.values(this.menu.map).sort(function(item1, item2) {
								return item1.position - item2.position;
							});
							let afterDivider = true;
							result = items.map((item) => {
								if (item.label[0] === "~") {
									if (afterDivider) return;
									afterDivider = true;
									return ["div", {
										class: "menu_divider",
										$host: item
									}];
								}
								afterDivider = false;
								let classList = ["menu_item"];
								if (item.checked) classList.push(item.type === "check" ? "checked" : "selected");
								if (item.map) classList.push("submenu");
								if (item.disabled) classList.push("disabled");
								return [
									"div",
									{
										class: classList.join(" "),
										$host: item
									},
									["u", " "],
									["a", item.label + ""],
									[
										"span",
										{ class: "shortcut" },
										item.hotKey
									]
								];
							}).filter(Boolean);
							if (afterDivider) result.pop();
						}
						this.menu.element = dom$1.buildDom([
							"blockquote",
							{
								class: "menu",
								style: "display:block",
								$host: this.menu,
								onmousemove: this.onMouseMove,
								onmouseup: this.onMouseUp
							},
							result
						], document.body);
						this.element = this.menu.element;
					}
					render() {
						if (!this.element) return;
						if (this.element.style.maxWidth) this.element.style.maxWidth = window.innerWidth + "px";
						if (this.element.style.maxHeight) this.element.style.maxHeight = window.innerHeight + "px";
						let elRect = this.element.getBoundingClientRect();
						let edge = Utils.getElementEdges(this.element);
						let parentRect, top, left;
						if (this.menu && this.menu.buttonElement) parentRect = this.menu.buttonElement.getBoundingClientRect();
						if (parentRect) if (this.isSubMenu) {
							top = parentRect.top - edge.top;
							left = parentRect.right;
						} else {
							top = parentRect.bottom;
							left = parentRect.left;
						}
						else {
							top = this.position.y;
							left = this.position.x;
						}
						let targetH = Math.min(elRect.height, window.innerHeight);
						let availableH = window.innerHeight - top - edge.top - edge.bottom - 2;
						if (availableH < targetH && (!parentRect || this.isSubMenu)) {
							top = (parentRect ? window.innerHeight : top) - targetH - edge.top;
							top = Math.max(top, this.menuManager.menuBar.bottom);
							availableH = window.innerHeight - top - edge.top - edge.bottom - 2;
						}
						this.element.style.maxHeight = availableH - 10 + "px";
						elRect = this.element.getBoundingClientRect();
						let availableW = window.innerWidth - left - edge.left - edge.right - 2;
						if (availableW < elRect.width) if (parentRect) {
							let tmpLeft = this.isSubMenu ? parentRect.left : parentRect.right;
							if (tmpLeft > availableW) {
								this.direction = "left";
								left = tmpLeft - elRect.width + edge.left;
								left = Math.max(left, 0);
								availableW = tmpLeft + edge.left + edge.right;
							}
							if (availableW < elRect.width) {
								this.element.style.maxWidth = availableW + "px";
								this.element.style.overflowX = "auto";
							}
						} else left = window.innerWidth - elRect.width - edge.left - edge.right;
						this.element.style.top = top + "px";
						this.element.style.left = left + "px";
						this.element.style.position = "absolute";
						this.element.style.zIndex = String(195055);
						this.element.style.overflowY = "auto";
					}
					close() {
						if (this.menuPopup) this.closeMenu();
						if (this.element) {
							this.element.remove();
							delete this.element;
						}
						if (this.menu.element) delete this.menu.element;
					}
					scrollIfNeeded() {
						if (!this.selectedMenu) return;
						let menu$1 = this.element;
						let item = this.selectedMenu.buttonElement;
						let menuRect = menu$1.getBoundingClientRect();
						let itemRect = item.getBoundingClientRect();
						if (itemRect.top < menuRect.top) item.scrollIntoView(true);
						else if (itemRect.bottom > menuRect.bottom) item.scrollIntoView(false);
					}
					moveOnTarget(target) {
						super.moveOnTarget(target);
					}
					isDirectedToSubMenu(e) {
						let currPos = {
							x: e.clientX,
							y: e.clientY
						};
						let prevPos = this.menuManager.prevPos;
						let rect = this.menuPopup.element.getBoundingClientRect();
						let rectYTop = rect.top;
						let rectYBottom = rect.bottom;
						if (currPos.y < rectYTop || currPos.y > rectYBottom) return false;
						let rectX = this.menuPopup.direction === "left" ? rect.right : rect.left;
						let prevDiffX = Math.abs(rectX - prevPos.x);
						let currDiffX = Math.abs(rectX - currPos.x);
						if (prevDiffX < currDiffX) return false;
						let directedToBottom = currPos.y > prevPos.y;
						let maxYDiff = (directedToBottom ? rectYBottom - prevPos.y : prevPos.y - rectYTop) / prevDiffX * currDiffX;
						return directedToBottom && rectYBottom - maxYDiff >= currPos.y || !directedToBottom && rectYTop + maxYDiff <= currPos.y;
					}
					renderRecursive() {
						this.render();
						if (this.menuPopup) this.menuPopup.renderRecursive();
					}
					getMenuByPath(path) {
						let childNode;
						let childNodes = this.element.childNodes;
						for (let i = 0; i < childNodes.length; i++) {
							childNode = childNodes[i];
							if (childNode.$host && childNode.$host.id === path) {
								if (childNode.classList.contains("menu_item") && !childNode.classList.contains("disabled")) return childNode;
							}
						}
						return null;
					}
				}
				class MenuSearchBox {
					constructor() {
						this.isOpen = false;
						this.hideFiltered = false;
						this.value = "";
						this.currValue = "";
					}
					open() {
						if (!this.element) this.build();
						this.isOpen = true;
						document.body.appendChild(this.element);
						this.calcElementPosition();
					}
					close() {
						this.isOpen = false;
						if (this.parentPopup && this.parentPopup.element) {
							if (this.parentPopup.prevMaxHeight) this.parentPopup.element.style.maxHeight = this.parentPopup.prevMaxHeight;
						}
						if (this.value.length) {
							this.value = "";
							this.currValue = "";
							this.update();
						}
						this.parentPopup = void 0;
						this.element.remove();
					}
					setParentPopup(parentPopup) {
						var _a;
						if (this.parentPopup && this.parentPopup.element) {
							if (this.parentPopup.prevMaxHeight) this.parentPopup.element.style.maxHeight = this.parentPopup.prevMaxHeight;
						}
						this.parentPopup = parentPopup;
						this.currPopupMenu = parentPopup;
						if (this.isOpen) {
							this.calcElementPosition();
							let currPopupMenu = parentPopup;
							let valueArr = this.value.split("/");
							while (currPopupMenu) {
								this.currPopupMenu = currPopupMenu;
								this.currValue = (_a = valueArr.shift()) != null ? _a : "";
								this.isChanged = true;
								this.update();
								this.isOpen = false;
								currPopupMenu = this.currPopupMenu.selectedMenu && this.currPopupMenu.selectedMenu.map ? this.currPopupMenu.openMenu() : null;
								this.isOpen = true;
							}
						}
					}
					calcElementPosition() {
						if (!this.parentPopup) return;
						this.parentPopup.prevMaxHeight = null;
						let parentRect = this.parentPopup.element.getBoundingClientRect();
						let top = parentRect.top - 20;
						if (top < this.menuManager.menuBar.bottom) {
							top = parentRect.bottom;
							if (parentRect.bottom + 20 > window.innerHeight) {
								this.parentPopup.prevMaxHeight = this.parentPopup.element.style.maxHeight;
								this.parentPopup.element.style.maxHeight = parseInt(this.parentPopup.element.style.maxHeight, 10) - 20 + "px";
								top -= 20;
							}
						}
						this.element.style.top = top + "px";
						this.element.style.right = window.innerWidth - parentRect.right + "px";
					}
					addSymbol(symbol) {
						var _a;
						if (symbol === "/" && this.value.substring(this.value.length - 1) === "/") return;
						this.value += symbol;
						if (symbol === "/") {
							if (((_a = this.currPopupMenu) == null ? void 0 : _a.selectedMenu) && this.currPopupMenu.selectedMenu.map) {
								this.currPopupMenu = this.currPopupMenu.openMenu();
								this.currValue = "";
							}
							this.isChanged = false;
						} else {
							this.currValue += symbol;
							this.isChanged = true;
						}
						this.update();
					}
					removeSymbol() {
						var _a, _b;
						if (!this.isOpen) return;
						let removed = this.value.substring(this.value.length - 1);
						this.value = this.value.substring(0, this.value.length - 1);
						if (removed === "/") {
							this.currValue = (_a = this.value.split("/").pop()) != null ? _a : "";
							this.currPopupMenu = ((_b = this.currPopupMenu) == null ? void 0 : _b.parentMenu) instanceof MenuPopup ? this.currPopupMenu.parentMenu : void 0;
							this.isChanged = false;
						} else {
							this.currValue = this.currValue.substring(0, this.currValue.length - 1);
							this.isChanged = true;
						}
						this.update();
						if (!this.value.length) this.close();
					}
					update() {
						this.searchField.textContent = this.value;
						if (this.currPopupMenu && this.currPopupMenu.element && this.isChanged) {
							this.setPopupMenuHighlights();
							if (this.hideFiltered) this.calcElementPosition();
						}
					}
					switchShowHideFiltered() {
						this.hideFiltered = !this.hideFiltered;
						this.update();
						if (!this.hideFiltered) this.calcElementPosition();
					}
					showHideMenuNode(menu$1, show) {
						var _a;
						show = show || false;
						if (!show && menu$1.classList.contains("hover") && ((_a = this.currPopupMenu) == null ? void 0 : _a.menuPopup)) show = true;
						menu$1.isFiltered = !show;
						show = show || !this.hideFiltered;
						menu$1.style.display = show ? "block" : "none";
					}
					setPopupMenuHighlights() {
						var _a;
						if (!((_a = this.currPopupMenu) == null ? void 0 : _a.element)) return;
						let childNode;
						let width = 0;
						this.selectMenu = null;
						this.secondarySelectMenu = null;
						if (this.hideFiltered) {
							let rect = this.currPopupMenu.element.getBoundingClientRect();
							let edges = Utils.getElementEdges(this.currPopupMenu.element);
							width = rect.width - edges.left - edges.right;
						}
						let afterDivider = true;
						let noResult = true;
						for (let i = 0; i < this.currPopupMenu.element.childNodes.length; i++) {
							childNode = this.currPopupMenu.element.childNodes[i];
							if (childNode.classList.contains("menu_item")) {
								this.setHighlights(childNode);
								afterDivider = afterDivider && childNode.isFiltered;
								if (noResult && !childNode.isFiltered) noResult = false;
							} else if (childNode.classList.contains("menu_divider")) {
								this.showHideMenuNode(childNode, !afterDivider);
								afterDivider = true;
							}
						}
						if (this.hideFiltered) {
							this.currPopupMenu.element.style.width = Math.ceil(width) + "px";
							let noResultEl = this.currPopupMenu.element.querySelector(".menu_no_result");
							if (noResult && !noResultEl) dom$1.buildDom([
								"div",
								{ class: "menu_no_result" },
								"No matching result"
							], this.currPopupMenu.element);
							else if (!noResult && noResultEl) noResultEl.remove();
						}
						this.selectMenu = this.selectMenu || this.secondarySelectMenu;
						if (this.selectMenu) {
							this.currPopupMenu.moveOnTarget(this.selectMenu);
							this.currPopupMenu.scrollIfNeeded();
						}
						if (this.hideFiltered) this.currPopupMenu.renderRecursive();
						if (this.suggestionPopup) this.suggestionPopup.close();
						if (noResult) {
							this.currValue = this.value;
							let suggestionList = {};
							let addToSuggestionList = (menus) => {
								Object.keys(menus).forEach((name$1) => {
									let item = menus[name$1];
									if (item.label && item.label[0] === "~") return;
									if (!item.path) {
										console.log(item);
										return;
									}
									let path = item.path;
									let tokens = this.getTokens(path);
									if (tokens) suggestionList[path] = {
										label: path,
										tokens
									};
									if (item.map) addToSuggestionList(item.map);
								});
							};
							addToSuggestionList(this.menuManager.menus.map);
							this.suggestionPopup = new MenuPopup();
							this.suggestionPopup.direction = "right";
							this.suggestionPopup.isSubMenu = true;
							this.suggestionPopup.menuManager = this.menuManager;
							this.suggestionPopup.menu = {
								buttonElement: this.element,
								map: suggestionList
							};
							this.suggestionPopup.parentMenu = this;
							this.suggestionPopup.open();
							for (let i = 0; i < this.suggestionPopup.element.childNodes.length; i++) {
								let childNode2 = this.suggestionPopup.element.childNodes[i];
								let menuTitle = childNode2.querySelector("a");
								let innerHtml = "";
								for (let t = 0; t < childNode2.$host.tokens.length; t++) innerHtml += "<span class='menu-" + childNode2.$host.tokens[t].type + "'>" + childNode2.$host.tokens[t].value + "</span>";
								menuTitle.innerHTML = innerHtml;
							}
						}
					}
					setHighlights(menu$1) {
						let text = menu$1.$host.label;
						let menuTitle = menu$1.querySelector("a");
						if (!this.currValue || !this.currValue.length) {
							menuTitle.innerHTML = text;
							this.showHideMenuNode(menu$1, true);
							return;
						}
						let tokens = this.getTokens(text);
						let innerHtml = "";
						let show = true;
						if (tokens) if (menu$1.classList.contains("disabled")) innerHtml = text;
						else {
							this.secondarySelectMenu = this.secondarySelectMenu || menu$1;
							if (!this.selectMenu && tokens[0].type === "completion-highlight") this.selectMenu = menu$1;
							for (let i = 0; i < tokens.length; i++) innerHtml += "<span class='menu-" + tokens[i].type + "'>" + tokens[i].value + "</span>";
						}
						else {
							innerHtml = text;
							show = false;
						}
						this.showHideMenuNode(menu$1, show);
						menuTitle.innerHTML = innerHtml;
					}
					getTokens(string) {
						let tokens = [];
						let caption = string.toLowerCase();
						let lower = this.currValue.toLowerCase();
						let upper = this.currValue.toUpperCase();
						function addToken(value, className) {
							value && tokens.push({
								type: className || "",
								value
							});
						}
						let lastIndex = -1;
						let matchMask = 0;
						let index, distance;
						if (caption.indexOf(lower) === -1) for (let j = 0; j < this.currValue.length; j++) {
							let i1 = caption.indexOf(lower[j], lastIndex + 1);
							let i2 = caption.indexOf(upper[j], lastIndex + 1);
							index = i1 >= 0 ? i2 < 0 || i1 < i2 ? i1 : i2 : i2;
							if (index < 0) return;
							distance = index - lastIndex - 1;
							if (distance > 0) matchMask = matchMask | 1 << j;
							lastIndex = index;
						}
						let filterText = lower;
						lower = caption.toLowerCase();
						lastIndex = 0;
						let lastI = 0;
						for (let i = 0; i <= filterText.length; i++) if (i !== lastI && (matchMask & 1 << i || i === filterText.length)) {
							let sub = filterText.slice(lastI, i);
							lastI = i;
							index = lower.indexOf(sub, lastIndex);
							if (index === -1) continue;
							addToken(string.slice(lastIndex, index), "");
							lastIndex = index + sub.length;
							addToken(string.slice(index, lastIndex), "completion-highlight");
						}
						addToken(string.slice(lastIndex, string.length), "");
						return tokens;
					}
					build() {
						var _a, _b, _c, _d;
						this.element = dom$1.buildDom([
							"div",
							{ class: "menu_searchbox" },
							["span", { class: "search_field" }],
							["span", { class: "searchbtn_filter" }],
							["span", { class: "searchbtn_close" }]
						]);
						this.element.$host = this;
						this.searchField = this.element.querySelector(".search_field");
						let _this = this;
						(_b = (_a = this.element) == null ? void 0 : _a.querySelector(".searchbtn_close")) == null || _b.addEventListener("mousedown", function(e) {
							_this.close();
						});
						(_d = (_c = this.element) == null ? void 0 : _c.querySelector(".searchbtn_filter")) == null || _d.addEventListener("mousedown", function(e) {
							_this.switchShowHideFiltered();
						});
					}
				}
				const menuManager_event = __webpack_require__(517);
				const menuManager_keyUtil = __webpack_require__(863);
				function getPrevSibling(node, conditionFn, parentElement) {
					parentElement = node ? node.parentElement : parentElement;
					let wrapped = false;
					do {
						node = node && node.previousSibling;
						if (!node && !wrapped) {
							node = parentElement == null ? void 0 : parentElement.lastChild;
							wrapped = true;
						}
						if (!node) return;
					} while (!conditionFn(node));
					return node;
				}
				function getNextSibling(node, conditionFn, parentElement) {
					parentElement = node ? node.parentElement : parentElement;
					let wrapped = false;
					do {
						node = node && node.nextSibling;
						if (!node && !wrapped) {
							node = parentElement == null ? void 0 : parentElement.firstChild;
							wrapped = true;
						}
						if (!node) return;
					} while (!conditionFn(node));
					return node;
				}
				class MenuManager {
					constructor() {
						this.menus = new MenuItems();
						this.onMouseDown = (e) => {
							if (!this.getTarget(e.target, (target2) => target2.$host instanceof MenuItems)) this.inactivateMenu();
						};
						this.onMouseMove = (e) => {
							let lastPos = {
								x: e.clientX,
								y: e.clientY
							};
							if (this.lastPos && this.lastPos.x === lastPos.x && this.lastPos.y === lastPos.y) return;
							this.prevPos = this.lastPos;
							this.lastPos = lastPos;
						};
						this.onWindowResize = (e) => {
							if (!this.activeMenu) return;
							let menuPopup = this.activeMenu instanceof MenuPopup ? this.activeMenu : this.activeMenu.menuPopup;
							if (menuPopup) menuPopup.renderRecursive();
						};
						this.onContextMenuOpen = (e) => {
							e.preventDefault();
							let target = this.getTarget(e.target, (target2) => target2.$host.contextMenu);
							if (!target) return;
							let pos = {
								x: e.clientX + 2,
								y: e.clientY + 2
							};
							this.openMenuByPath("/context/" + target.$host.contextMenu, pos);
							this.currentHost = target.$host;
						};
						this.add = this.addByPath;
					}
					static getInstance() {
						if (!MenuManager._instance) MenuManager._instance = new MenuManager();
						return MenuManager._instance;
					}
					find(path, item) {
						if (typeof path === "string") path = path.split("/");
						item = item || this.menus;
						path.forEach(function(part) {
							if (!item || !item.map) return;
							item = item.map[part];
						});
						return item;
					}
					addByPath(path, options$1 = {}) {
						var _a, _b, _c, _d, _e;
						if (typeof path == "string") path = path.split("/");
						let item = this.menus;
						path.forEach(function(part) {
							var _b2;
							item.map ??= {};
							(_b2 = item.map)[part] ?? (_b2[part] = new MenuItems());
							item = item.map[part];
						});
						item.path = path.join("/");
						let name$1 = path.pop();
						item.id = name$1;
						item.label = options$1.label || name$1;
						item.position = (_a = options$1.position) != null ? _a : 0;
						item.hotKey = options$1.hotKey;
						item.type = (_b = options$1.type) != null ? _b : "";
						item.checked = (_c = options$1.checked) != null ? _c : false;
						item.disabled = (_d = options$1.disabled) != null ? _d : false;
						item.className = (_e = options$1.className) != null ? _e : "";
						item.exec = options$1.exec;
					}
					getTarget(target, callback) {
						while (target) {
							if (target.$host && (!callback || callback(target))) return target;
							target = target.parentElement;
						}
					}
					bindKeys() {
						function isMenuBarItem(node) {
							return node.classList.contains("menuButton");
						}
						function isMenuPopupActiveItem(node) {
							return node.classList.contains("menu_item") && !node.classList.contains("disabled") && !node.isFiltered;
						}
						function menuKeyDown(menuManager) {
							var _a;
							let menuPopup = (_a = menuManager.activeMenu) == null ? void 0 : _a.getLastOpenPopup();
							if (!menuPopup) return;
							let nextMenu = getNextSibling(menuPopup.selectedMenu ? menuPopup.selectedMenu.buttonElement : null, isMenuPopupActiveItem, menuPopup.element);
							menuPopup.moveOnTarget(nextMenu);
							menuPopup.scrollIfNeeded();
						}
						let menuKb = new hash_handler_.HashHandler([
							{
								bindKey: "Esc",
								name: "Esc",
								exec: function(menuManager) {
									if (menuManager.searchBox && menuManager.searchBox.isOpen) {
										menuManager.searchBox.close();
										return;
									}
									let activeMenu = menuManager.activeMenu;
									if (!activeMenu.menuPopup && activeMenu !== menuManager.menuBar) {
										activeMenu.close();
										menuManager.inactivateMenu();
									} else {
										activeMenu.closeLastMenu();
										if (!activeMenu.menuPopup && activeMenu === menuManager.menuBar) menuManager.inactivateMenu();
									}
								}
							},
							{
								bindKey: "Left",
								name: "Left",
								exec: function(menuManager) {
									let activeMenu = menuManager.activeMenu;
									activeMenu.closeLastMenu();
									if (!activeMenu.menuPopup) {
										if (activeMenu === menuManager.menuBar) {
											let prevMenu = getPrevSibling(activeMenu.selectedMenu.buttonElement, isMenuBarItem);
											if (prevMenu) activeMenu.moveOnTarget(prevMenu);
										} else if (!activeMenu.element) menuManager.inactivateMenu();
									}
								}
							},
							{
								bindKey: "Right",
								name: "Right",
								exec: function(menuManager) {
									function moveToNextOnBar() {
										if (menuManager.activeMenu !== menuManager.menuBar) return;
										let nextMenu = getNextSibling(menuManager.menuBar.selectedMenu.buttonElement, isMenuBarItem);
										if (nextMenu) menuManager.menuBar.moveOnTarget(nextMenu);
									}
									let menuPopup = menuManager.activeMenu.getLastOpenPopup();
									let menu$1 = menuManager.activeMenu.getLastSelectedMenu();
									if (!menu$1) return;
									let moveToNext = !menu$1.map || menuManager.activeMenu === menuManager.menuBar && !menuManager.activeMenu.menuPopup.selectedMenu;
									if (!moveToNext && (!menuPopup.selectedMenu && (menuManager.activeMenu.menuPopup !== menuPopup || menuManager.activeMenu !== menuPopup) || menuPopup.selectedMenu === menu$1)) {
										let isNewOpened = false;
										if (menuPopup.selectedMenu === menu$1) {
											menuPopup.openMenu();
											isNewOpened = true;
										}
										menuKeyDown(menuManager);
										if (!isNewOpened && !menuPopup.selectedMenu) moveToNext = true;
									}
									if (moveToNext) moveToNextOnBar();
								}
							},
							{
								bindKey: "Enter",
								name: "Enter",
								exec: function(menuManager) {
									let menuPopup = menuManager.activeMenu.getLastOpenPopup();
									let menu$1 = menuManager.activeMenu.getLastSelectedMenu();
									if (menu$1 && menu$1.map && menuPopup.selectedMenu === menu$1) menuPopup.openMenu();
								}
							},
							{
								bindKey: "Up",
								name: "Up",
								exec: function(menuManager) {
									let menuPopup = menuManager.activeMenu.getLastOpenPopup();
									let prevMenu = getPrevSibling(menuPopup.selectedMenu ? menuPopup.selectedMenu.buttonElement : null, isMenuPopupActiveItem, menuPopup.element);
									menuPopup.moveOnTarget(prevMenu);
									menuPopup.scrollIfNeeded();
								}
							},
							{
								bindKey: "Backspace",
								name: "Backspace",
								exec: function(menuManager) {
									menuManager.searchBox.removeSymbol();
								}
							},
							{
								bindKey: "Down",
								name: "Down",
								exec: menuKeyDown
							}
						]);
						let _this = this;
						menuManager_event.addCommandKeyListener(window, function(e, hashId, keyCode) {
							if (!_this.isActive) return;
							menuManager_event.stopEvent(e);
							let keyString = menuManager_keyUtil.keyCodeToString(keyCode);
							let command = menuKb.findKeyCommand(hashId, keyString);
							if (command && command.exec) command.exec(_this);
							else if (e.key.length === 1) MenuManager.getInstance().addSymbolToSearchBox(e.key);
						});
					}
					build() {
						window.addEventListener("contextmenu", this.onContextMenuOpen);
					}
					buildMenuBar(parent) {
						this.menuBar = new MenuBar();
						this.menuBar.menus = this.menus;
						this.menuBar.menuManager = this;
						this.menuBar.build(parent);
					}
					openMenuByPath(path, position) {
						if (typeof path === "string") path = path.split("/");
						if (path[0] && path[0].length) this.activeMenu = this.menuBar;
						else {
							this.activeMenu = new MenuPopup();
							this.activeMenu.menuManager = this;
							this.activeMenu.position = position;
							this.activeMenu.menu = this.find(path);
							this.activeMenu.open();
						}
						this.activateMenu();
						this.activeMenu.openMenuByPath(path);
					}
					activateMenu() {
						var _a;
						this.isActive = true;
						window.addEventListener("mousedown", this.onMouseDown);
						window.addEventListener("mousemove", this.onMouseMove);
						window.addEventListener("resize", this.onWindowResize);
						if ((_a = this.activeMenu) == null ? void 0 : _a.activateMenu) this.activeMenu.activateMenu();
					}
					inactivateMenu() {
						var _a;
						this.isActive = false;
						window.removeEventListener("mousedown", this.onMouseDown);
						window.removeEventListener("mousemove", this.onMouseMove);
						window.removeEventListener("resize", this.onWindowResize);
						if ((_a = this.activeMenu) == null ? void 0 : _a.inactivateMenu) this.activeMenu.inactivateMenu();
						this.activeMenu = void 0;
						if (this.searchBox) this.searchBox.close();
						this.currentHost = null;
					}
					addSymbolToSearchBox(symbol) {
						if (!this.searchBox || !this.searchBox.isOpen) this.openSearchBox();
						this.searchBox.addSymbol(symbol);
					}
					openSearchBox() {
						var _a;
						if (!this.searchBox) {
							this.searchBox = new MenuSearchBox();
							this.searchBox.menuManager = this;
						}
						this.searchBox.setParentPopup((_a = this.activeMenu) == null ? void 0 : _a.getLastOpenPopup());
						this.searchBox.open();
					}
				}
				class MenuItems {}
				const oop = __webpack_require__(387);
				const useragent = __webpack_require__(493);
				let newTabCounter = 1;
				class TabManager$1 {
					constructor(options$1) {
						this.$setBoxState = (box, state) => {
							if (!box) return;
							box.removeAllChildren();
							this.setBoxData(box, state);
							if (!box[0] && box.isMain) this.setChildBoxData(box, [{ type: "pane" }], 0);
						};
						this.containers = options$1.containers;
						this.tabs = {};
						this.fileSystem = options$1.fileSystem;
						this.commandsInit();
						this.initFileSystem();
					}
					static getInstance(options$1) {
						if (!TabManager$1._instance) TabManager$1._instance = new TabManager$1(options$1);
						return TabManager$1._instance;
					}
					initFileSystem() {
						var _a;
						(_a = this.fileSystem) == null || _a.on("openFile", (treeNode, fileContent) => {
							this.open({
								path: treeNode.path,
								title: treeNode.path.split("/").pop()
							}, void 0, fileContent);
						});
					}
					commandsInit() {
						MenuManager.getInstance().addByPath("/context/tabs");
						let commandsKeys = [];
						for (let command of tabCommands) if (command.exec !== void 0) {
							MenuManager.getInstance().addByPath("/context/tabs/" + command.name, {
								position: command.position,
								hotKey: useragent.isMac ? command.mac : command.win,
								exec: command.exec
							});
							commandsKeys.push({
								bindKey: {
									win: command.win,
									mac: command.mac
								},
								exec: command.exec
							});
						}
						CommandManager.registerCommands(commandsKeys, this);
					}
					toJSON() {
						let containers = Object.keys(this.containers);
						return Object.fromEntries(containers.map((container) => {
							var _a;
							return [container, (_a = this.containers[container]) == null ? void 0 : _a.toJSON()];
						}));
					}
					setChildBoxData(box, boxData, index) {
						if (!boxData[index]) return;
						let boxType = boxData[index].type;
						if (!box[index]) box.addChildBox(index, boxType === "pane" ? new Pane$1() : new Box$1({ vertical: boxType === "vbox" }));
						this.setBoxData(box[index], boxData[index]);
					}
					setBoxData(box, boxData) {
						if (!boxData) return;
						if (boxData.fixedSize) box.fixedSize = boxData.fixedSize;
						if (box instanceof Pane$1) {
							if (boxData.tabBar) {
								box.tabBar.scrollLeft = boxData.tabBar.scrollLeft;
								if (boxData.tabBar.tabList) {
									box.tabBar.freeze = true;
									boxData.tabBar.tabList.forEach((tabData) => {
										let tab$1 = box.tabBar.addTab(new Tab(tabData));
										this.tabs[tab$1.path] = tab$1;
										if (tab$1.preview) this.previewTab = tab$1;
									});
									box.tabBar.freeze = false;
									box.tabBar.configure();
								}
							}
						} else {
							box.hidden = boxData.hidden;
							box.ratio = boxData.ratio;
							this.setChildBoxData(box, boxData, 0);
							this.setChildBoxData(box, boxData, 1);
							box.buttons && box.setButtons(box.buttons);
						}
					}
					setState(state) {
						this.activePane = void 0;
						this.tabs = {};
						this.previewTab = void 0;
						for (let container in this.containers) this.setContainerState(container, state[container]);
					}
					setContainerState(container, state) {
						this.$setBoxState(this.containers[container], state);
					}
					clear() {}
					getPanes() {}
					getTabs() {
						return this.tabs;
					}
					get activeTab() {
						var _a;
						return (_a = this.activePane) == null ? void 0 : _a.tabBar.activeTab;
					}
					open(tabOptions, container, fileContent) {
						var _a;
						let tab$1 = this.tabs[tabOptions.path];
						tabOptions.active = (_a = tabOptions.active) != null ? _a : true;
						if (!tab$1 || !tab$1.parent) {
							let pane;
							if (container) pane = this.getContainerPane(container);
							else pane = this.activePane && this.activePane.tabBar.tabList.length > 0 ? this.activePane : this.getContainerPane("main");
							if (this.previewTab) this.previewTab.remove();
							tab$1 = pane.tabBar.addTab(new Tab(tabOptions), void 0, fileContent);
							if (tabOptions.preview) this.previewTab = tab$1;
							tab$1.parent.scrollTabIntoView(tab$1);
							this.tabs[tab$1.path] = tab$1;
						}
						if (!tabOptions.preview) {
							if (this.previewTab == tab$1) this.clearPreviewStatus(tab$1);
							else if (this.previewTab) this.previewTab.remove();
						}
						tab$1.parent.removeSelections();
						tab$1.parent.activateTab(tab$1, fileContent);
						return tab$1;
					}
					getContainerPane(container) {
						return this.containers[container].element.querySelector(".tabPanel").$host;
					}
					clearPreviewStatus(tab$1) {
						tab$1.preview = false;
						tab$1.element.style.fontStyle = "";
						if (this.previewTab == tab$1) this.previewTab = void 0;
					}
					get newTabPath() {
						return `untitled_${newTabCounter}`;
					}
					addNewTab(pane, options$1) {
						while (this.tabs.hasOwnProperty(this.newTabPath)) newTabCounter++;
						options$1 ??= {
							title: `Untitled ${newTabCounter}`,
							path: this.newTabPath
						};
						options$1.active = true;
						let newTab = pane.tabBar.addTab(new Tab(options$1));
						this.tabs[this.newTabPath] = newTab;
						return newTab;
					}
					removeTab(tab$1) {
						delete this.tabs[tab$1.path];
					}
					loadFile(tab$1, fileContent) {
						tab$1.parent.parent.getOrCreateEditor(tab$1.editorType).setSession(tab$1, fileContent);
					}
					navigateToTab(index, tab$1, tabs) {
						var _a;
						let tabsList = tabs || Object.values(this.tabs);
						let activeTab = tab$1 || this.activeTab;
						if (index >= 0 && tabsList.length > index) (_a = activeTab == null ? void 0 : activeTab.parent) == null || _a.activateTab(tabsList[index], void 0, true);
					}
					saveTo(storage) {
						for (let [path, tab$1] of Object.entries(this.tabs)) storage["@file@" + path] = tab$1.session ? tab$1.editor.sessionToJSON(tab$1) : tab$1.sessionValue;
					}
					restoreFrom(storage) {
						for (let [path, tab$1] of Object.entries(this.tabs)) {
							tab$1.sessionValue = storage["@file@" + path];
							if (tab$1.session) tab$1.editor.restoreSessionFromJson(tab$1);
						}
					}
					getTab(path) {
						return this.tabs[path];
					}
				}
				oop.implement(TabManager$1.prototype, event_emitter_.EventEmitter);
				class Toolbar {
					setBox(x, y, w, h) {
						Utils.setBox(this.element, x, y, w, h);
					}
					constructor(options$1) {
						this.direction = (options$1 == null ? void 0 : options$1.direction) || "horizontal";
						this.size = (options$1 == null ? void 0 : options$1.size) || 27;
						this.position = options$1 == null ? void 0 : options$1.position;
					}
				}
				class TabPanelBar extends Toolbar {
					constructor(options$1) {
						var _a, _b;
						super(options$1);
						this.selectedTabs = [];
						this.tabList = [];
						this.scrollLeft = 0;
						this.animationSteps = 0;
						this.MIN_TAB_SIZE = 120;
						this.MAX_TAB_SIZE = 150;
						this.activeTabHistory = [];
						this.onMouseWheel = (e) => {
							let d = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
							if (Math.abs(d) > 50) this.animateScroll(d);
							else {
								this.stopScrollAnimation();
								this.setScrollPosition((this.scrollLeft || 0) + d);
							}
						};
						this.initTabList = (_b = (_a = options$1.tabList) != null ? _a : options$1.panelList) != null ? _b : [];
					}
					isVertical() {
						return this.direction === "vertical";
					}
					getDraggingElementSize() {
						if (!this.tabDraggingElement) return 0;
						let draggingElementSize = this.isVertical() ? this.tabDraggingElement.style.height : this.tabDraggingElement.style.width;
						return parseInt(draggingElementSize, 10);
					}
					tabMouseDown(tab$1, expand = false, toggle = false) {
						if (expand) this.expandSelection(tab$1, toggle);
						else {
							this.anchorTab = null;
							if (toggle) this.toggleSelection(tab$1);
							else this.activateTab(tab$1, void 0, this.selectedTabs.indexOf(tab$1) < 0);
						}
					}
					expandSelection(tab$1, toggle = false) {
						if (!this.anchorTab) this.anchorTab = this.activeTab;
						let prevSelectedTabs = this.selectedTabs;
						this.selectedTabs = [];
						let start = this.tabList.indexOf(this.anchorTab);
						let end = this.tabList.indexOf(tab$1);
						if (end < start) [start, end] = [end, start];
						for (let i = start; i <= end; i++) this.addSelection(this.tabList[i]);
						prevSelectedTabs.forEach((selectedTab) => {
							if (this.selectedTabs.indexOf(selectedTab) < 0) if (!toggle) this.deselectTab(selectedTab);
							else this.addSelection(selectedTab);
						});
						this.activateTab(tab$1);
					}
					toggleSelection(tab$1) {
						if (this.selectedTabs.indexOf(tab$1) < 0) this.activateTab(tab$1);
						else if (tab$1 !== this.activeTab) this.removeSelection(tab$1);
					}
					addSelection(tab$1) {
						if (this.selectedTabs.indexOf(tab$1) < 0) {
							this.selectTab(tab$1);
							this.selectedTabs.push(tab$1);
						}
					}
					selectTab(tab$1) {
						tab$1.element.classList.add("selected");
					}
					deselectTab(tab$1) {
						tab$1.element.classList.remove("selected");
					}
					removeSelection(tab$1) {
						if (this.selectedTabs.indexOf(tab$1) < 0) return;
						this.deselectTab(tab$1);
						this.selectedTabs.splice(this.selectedTabs.indexOf(tab$1), 1);
					}
					removeSelections() {
						this.selectedTabs.forEach((selectedTab) => {
							this.deselectTab(selectedTab);
						});
						this.selectedTabs = [];
					}
					scrollTabIntoView(tab$1) {
						let index = this.tabList.indexOf(tab$1);
						this.setScrollPosition((index + 1) * this.tabWidth);
					}
					activateTab(tab$1, content, removeSelections = false) {
						removeSelections && this.removeSelections();
						this.activeTabClicked = false;
						this.addSelection(tab$1);
						if (this.activeTab) {
							if (this.activeTab === tab$1) {
								this.activeTabClicked = true;
								return;
							}
							if (this.activeTabHistory.indexOf(this.activeTab) >= 0) this.activeTabHistory.splice(this.activeTabHistory.indexOf(this.activeTab), 1);
							this.activeTabHistory.push(this.activeTab);
							this.activeTab.deactivate();
						}
						tab$1.activate();
						this.activeTab = tab$1;
						this.configure();
					}
					removeTab(tab$1) {
						if (tab$1 === this.activeTab) this.activeTab = void 0;
						let index = this.tabList.indexOf(tab$1);
						if (index >= 0) this.tabList.splice(index, 1);
						tab$1.parent = void 0;
					}
					activatePrevious(index) {
						if (this.tabList.length) {
							let tab$1 = this.tabList[index - 1] || this.tabList[this.tabList.length - 1];
							this.activateTab(tab$1);
						}
					}
					addTab(tab$1, index, content) {
						if (!tab$1.element) tab$1.render();
						tab$1.parent = this;
						if (index === void 0 || index === null || index >= this.tabList.length) {
							this.tabContainer.appendChild(tab$1.element);
							this.tabList.push(tab$1);
						} else {
							this.tabContainer.insertBefore(tab$1.element, this.tabContainer.childNodes[index]);
							this.tabList.splice(index, 0, tab$1);
						}
						if (tab$1.active) this.activateTab(tab$1, content, true);
						this.configure();
						return tab$1;
					}
					setScrollPosition(scrollLeft) {
						this.scrollLeft = scrollLeft;
						this.configure();
					}
					animateScroll(v) {
						this.vX = v / 80;
						this.animationSteps += 15;
						if (this.animationSteps > 15) {
							this.vX *= 1.2 * this.animationSteps / 10;
							this.animationSteps = 15 + Math.ceil((this.animationSteps - 15) * .75);
						}
						if (this.animationTimer) return;
						this.animationTimer = setInterval(() => {
							if (this.animationSteps-- <= 0) return this.stopScrollAnimation();
							let vX = this.vX;
							if (Math.abs(this.vX) < .01) vX = 0;
							vX = .9 * vX;
							let oldScrollLeft = this.scrollLeft;
							this.setScrollPosition(this.scrollLeft + 10 * vX);
							if (oldScrollLeft == this.scrollLeft) this.animationSteps = 0;
							this.vX = vX;
						}, 10);
					}
					stopScrollAnimation() {
						clearInterval(this.animationTimer);
						this.animationTimer = null;
						this.animationScrollLeft = null;
						this.vX = 0;
					}
					transform(el, dx, dy) {
						el.style.left = Math.round(dx) + "px";
						el.dx = dx;
						el.dy = dy;
					}
					startTabDragging(element, index) {
						if (this.isDragging) return;
						this.tabDraggingElement = element;
						this.draggingElementIndex = index;
						this.configure();
						this.isDragging = true;
					}
					finishTabDragging() {
						this.draggingElementIndex = void 0;
						this.tabDraggingElement = void 0;
						if (this.activeTabHistory.length) {
							let removedHistoryTabs = [];
							for (let i = 0; i < this.activeTabHistory.length; i++) if (this.tabList.indexOf(this.activeTabHistory[i]) < 0) removedHistoryTabs.push(this.activeTabHistory[i]);
							removedHistoryTabs.forEach((tab$1) => {
								let index = this.activeTabHistory.indexOf(tab$1);
								if (index >= 0) this.activeTabHistory.splice(index, 1);
							});
						}
						this.configure();
						this.isDragging = false;
					}
					toJSON() {
						return {
							tabList: this.tabList.map((tab$1) => tab$1.toJSON()),
							scrollLeft: this.scrollLeft
						};
					}
				}
				class TabBar extends TabPanelBar {
					constructor() {
						super(...arguments);
						this.inverted = true;
						this.buttonsWidth = 0;
						this.buttons = [];
						this.onTabMouseUp = (e) => {
							if (e.button == 1) {
								let tab$1 = Utils.findHost(e.target, Tab);
								if (tab$1) tab$1.remove();
							}
						};
						this.onTabMouseDown = (e) => {
							if (e.button == 0) TabbarHandler.tabbarMouseDown(e, Tab, TabBar, true);
						};
						this.onTabPlusClick = (e) => {
							this.removeSelections();
							TabManager$1.getInstance().addNewTab(this.parent);
						};
						this.onTabClick = (e) => {
							let target = e.target;
							let tab$1 = Utils.findHost(target, Tab);
							if (tab$1) {
								if (e.button == 0 && target.classList.contains("tabCloseButton")) this.closeTab(tab$1);
								else if (e.button == 0 && tab$1.isActive && tab$1.editor) tab$1.editor.focus();
								else if (e.button == 1) tab$1.remove();
							}
						};
					}
					setBox(x, y, w, h) {
						super.setBox(x, y, w, h);
						this.width = w;
						this.configure();
					}
					renderElement() {
						this.element = dom$1.buildDom([
							"div",
							{
								class: "tabbar " + this.direction,
								onwheel: this.onMouseWheel,
								$host: this
							},
							["span", { class: "tabMenuButton" }],
							[
								"div",
								{ class: "tabScroller" },
								["div", {
									class: "tabContainer",
									ref: "tabContainer",
									onclick: this.onTabClick,
									onmouseup: this.onTabMouseUp,
									onmousedown: this.onTabMouseDown
								}]
							],
							[
								"span",
								{
									class: "tabPlusButton",
									ref: "tabPlusButton",
									onclick: this.onTabPlusClick
								},
								"+"
							],
							["span", { class: "sizer" }],
							["span", {
								class: "buttons",
								ref: "additionalButtons"
							}]
						], void 0, this);
						if (this.initTabList && this.initTabList.length) for (let i = 0; i < this.initTabList.length; i++) this.addTab(this.initTabList[i]);
					}
					render() {
						if (!this.element) this.renderElement();
						return this.element;
					}
					computeConfig() {
						let draggingElementSize = this.getDraggingElementSize();
						this.plusButtonWidth = this.tabPlusButton.getBoundingClientRect().width;
						this.containerWidth = this.width - this.plusButtonWidth - this.buttonsWidth;
						let tabsCount = this.tabList.length;
						if (tabsCount * this.MAX_TAB_SIZE + draggingElementSize < this.containerWidth) {
							this.tabWidth = this.MAX_TAB_SIZE;
							this.containerWidth = tabsCount * this.tabWidth + draggingElementSize;
						} else if (tabsCount * this.MIN_TAB_SIZE + draggingElementSize < this.containerWidth) this.tabWidth = (this.containerWidth - draggingElementSize) / tabsCount;
						else this.tabWidth = this.MIN_TAB_SIZE;
						let tabsWidth = this.tabWidth * tabsCount + draggingElementSize;
						this.scrollLeft = Math.min(Math.max(this.scrollLeft, 0), tabsWidth - this.containerWidth);
					}
					configure() {
						if (!this.width || this.freeze) return;
						let shadowWidth = 4;
						this.computeConfig();
						this.tabContainer.style.width = this.containerWidth + "px";
						let draggingElementSize = this.getDraggingElementSize();
						if (this.inverted) {
							let zIndex = this.tabList.length;
							let min = shadowWidth - this.tabWidth;
							let max = this.containerWidth;
							let maxPos = (max - this.tabWidth) / 2;
							let i = 0;
							for (; i < this.tabList.length; i++) {
								let tab$1 = this.tabList[i];
								let el = tab$1.element;
								let pos = this.tabWidth * i - this.scrollLeft;
								if (this.tabDraggingElement && i >= this.draggingElementIndex) pos += draggingElementSize;
								if (tab$1 === this.activeTab) {
									let activeMin = Math.max(min + this.tabWidth * .25, -this.tabWidth * .75);
									if (pos < activeMin) min = activeMin;
								}
								if (pos < min) {
									pos = min;
									min += shadowWidth;
									el.classList.add("scrolledLeft");
								} else if (pos > maxPos) break;
								else el.classList.remove("scrolledLeft");
								el.style.width = this.tabWidth + "px";
								el.style.zIndex = String(zIndex);
								zIndex--;
								this.transform(el, pos, 0);
							}
							let lastRendered = i;
							zIndex = this.tabList.length;
							for (let i2 = this.tabList.length - 1; i2 >= lastRendered; i2--) {
								let tab$1 = this.tabList[i2];
								let el = tab$1.element;
								let pos = this.tabWidth * i2 - this.scrollLeft;
								if (this.tabDraggingElement && i2 >= this.draggingElementIndex) pos += draggingElementSize;
								if (tab$1 === this.activeTab) {
									let activeMax = Math.min(max - this.tabWidth * .25, this.containerWidth - this.tabWidth * .25);
									if (pos > activeMax) max = activeMax;
								}
								if (pos > max) {
									pos = max;
									max -= shadowWidth;
									el.classList.add("scrolledLeft");
								} else el.classList.remove("scrolledLeft");
								el.style.width = this.tabWidth + "px";
								el.style.zIndex = String(zIndex);
								zIndex--;
								this.transform(el, pos, 0);
							}
						}
					}
					addButton(button) {
						this.buttons.push(button);
						this.setButtons(this.buttons);
					}
					setButtons(buttons) {
						this.additionalButtons.innerHTML = "";
						this.buttons = buttons;
						buttons.forEach((button) => this.additionalButtons.appendChild(button));
						this.buttonsWidth = this.additionalButtons.getBoundingClientRect().width;
						this.configure();
					}
					removeButtons() {
						if (!this.buttons.length) return;
						this.buttons = [];
						this.additionalButtons.innerHTML = "";
						this.buttonsWidth = 0;
						this.configure();
					}
					clear() {
						this.removeButtons();
						this.tabList = [];
					}
					remove() {}
					closeTab(tab$1) {
						let index = this.tabList.indexOf(tab$1);
						let isActiveTab = this.activeTab === tab$1;
						let isAnchorTab = this.anchorTab === tab$1;
						this.removeTab(tab$1);
						this.removeSelection(tab$1);
						if (isActiveTab) {
							this.activeTab = void 0;
							this.activatePrevious(index);
						}
						if (isAnchorTab) this.anchorTab = null;
						if (tab$1.element) tab$1.element.remove();
						TabManager$1.getInstance().removeTab(tab$1);
						this.configure();
					}
					activateTab(tab$1, content, removeSelections = false) {
						removeSelections && this.removeSelections();
						this.activeTabClicked = false;
						this.addSelection(tab$1);
						if (this.activeTab) {
							if (this.activeTab === tab$1) {
								this.activeTabClicked = true;
								tab$1.activatePane();
								return;
							}
							if (this.activeTabHistory.indexOf(this.activeTab) >= 0) this.activeTabHistory.splice(this.activeTabHistory.indexOf(this.activeTab), 1);
							this.activeTabHistory.push(this.activeTab);
							this.activeTab.deactivate();
						}
						tab$1.activate(content);
						this.activeTab = tab$1;
						this.configure();
					}
					activatePrevious(index) {
						if (this.tabList.length) {
							let tab$1 = this.tabList[index - 1] || this.tabList[this.tabList.length - 1];
							this.activateTab(tab$1);
						} else if (this.parent) this.parent.remove();
					}
				}
				class Pane$1 extends Box$1 {
					constructor(options$1 = {}) {
						var _a;
						let tabBar = new TabBar({ tabList: options$1.tabList });
						options$1.toolBars = (_a = options$1.toolBars) != null ? _a : {};
						options$1.toolBars.top = tabBar;
						super(options$1);
						tabBar.parent = this;
						this.tabBar = tabBar;
					}
					toJSON() {
						return {
							type: "pane",
							tabBar: this.tabBar.toJSON()
						};
					}
					render() {
						super.render();
						this.element.classList.add("tabPanel");
						this.tabEditorBoxElement = dom$1.buildDom(["div", { class: `tab-editor` }]);
						this.element.appendChild(this.tabEditorBoxElement);
						return this.element;
					}
					acceptsTab(tab$1) {
						return true;
					}
					split(far, vertical) {
						let newPane = new Pane$1({});
						let root = this.parent;
						let wrapper = new Box$1({
							[far ? 1 : 0]: this,
							[far ? 0 : 1]: newPane,
							vertical,
							ratio: .5
						});
						root.addChildBox(this, wrapper);
						if (this.isButtonHost) {
							let buttons = this.tabBar.buttons;
							this.removeButtons();
							wrapper.setButtons(buttons);
						}
						return newPane;
					}
					setButtons(buttons) {
						this.isButtonHost = true;
						if (buttons) this.tabBar.setButtons(buttons);
						else this.tabBar.removeButtons();
					}
					addButton(button) {
						this.isButtonHost = true;
						this.tabBar.addButton(button);
					}
					$updateChildSize(x, y, w, h) {
						this.updateToolBarSize(w, h);
						w -= this.padding.left + this.padding.right;
						h -= this.padding.top + this.padding.bottom;
						x = this.padding.left;
						y = this.padding.top;
						if (this.editor) {
							Utils.setBox(this.editor.container, x, y, w, h);
							this.editor.resize();
						}
					}
					removeButtons() {
						this.tabBar.removeButtons();
						this.isButtonHost = false;
					}
					remove() {
						let wrapper = this.parent;
						let root = wrapper.parent;
						let pane = wrapper[wrapper[0] == this ? 1 : 0] || null;
						let rootIndex = root[0] == wrapper ? 0 : 1;
						if (pane) {
							pane.parent = root;
							root[rootIndex] = pane;
							root.element.appendChild(pane.element);
							if (root.fixedChild && root.fixedChild == wrapper) {
								pane.fixedSize = wrapper.fixedSize;
								pane.size = wrapper.size;
								root.fixedChild = pane;
							}
							wrapper.element.remove();
						} else {
							if (wrapper.isMain) root = wrapper;
							else wrapper.element.remove();
							root.ratio = 1;
						}
						root.recalculateAllMinSizes();
						root.resize();
						if (this.isButtonHost) root.setButtons(this.tabBar.buttons);
						this.clearEditors();
						this.tabBar.clear();
					}
					getTopRightPane() {
						return this;
					}
					createEditor() {
						let editor = this.createEditorByType();
						this.emit("editorAdded", editor);
						return editor;
					}
					createEditorByType() {
						switch (this.currentEditorType) {
							case EditorType.preview: return new PreviewEditor();
							case EditorType.ace:
							default: return new AceEditor();
						}
					}
					initEditor(editorType = EditorType.ace) {
						var _b;
						if (this.currentEditorType == editorType) return;
						this.hidePreviousEditor();
						this.editors ??= {};
						this.currentEditorType = editorType;
						(_b = this.editors)[editorType] ?? (_b[editorType] = this.createEditor());
						this.editor = this.editors[editorType];
						this.element.appendChild(this.editor.container);
					}
					hidePreviousEditor() {
						if (!this.editor) return;
						this.element.removeChild(this.editor.container);
					}
					getEditor(editorType = EditorType.ace) {
						return this.editors[editorType];
					}
					getOrCreateEditor(editorType = EditorType.ace) {
						this.initEditor(editorType);
						return this.editor;
					}
					clearEditors() {
						for (let i in this.editors) this.editors[i].destroy();
						this.editors = {};
						this.currentEditorType = void 0;
						this.editor = void 0;
					}
				}
				var styles_button = __webpack_require__(382);
				var button_options = {};
				button_options.styleTagTransform = styleTagTransform_default();
				button_options.setAttributes = setAttributesWithoutAttributes_default();
				button_options.insert = insertBySelector_default().bind(null, "head");
				button_options.domAPI = styleDomAPI_default();
				button_options.insertStyleElement = insertStyleElement_default();
				injectStylesIntoStyleTag_default()(styles_button.A, button_options);
				const assets_styles_button = styles_button.A && styles_button.A.locals ? styles_button.A.locals : void 0;
				var __defProp = Object.defineProperty;
				var __getOwnPropSymbols = Object.getOwnPropertySymbols;
				var __hasOwnProp = Object.prototype.hasOwnProperty;
				var __propIsEnum = Object.prototype.propertyIsEnumerable;
				var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {
					enumerable: true,
					configurable: true,
					writable: true,
					value
				}) : obj[key] = value;
				var __spreadValues = (a, b) => {
					for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
					if (__getOwnPropSymbols) {
						for (var prop of __getOwnPropSymbols(b)) if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
					}
					return a;
				};
				var __objRest = (source, exclude) => {
					var target = {};
					for (var prop in source) if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
					if (source != null && __getOwnPropSymbols) {
						for (var prop of __getOwnPropSymbols(source)) if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop)) target[prop] = source[prop];
					}
					return target;
				};
				dom$1.importCssString(button_namespaceObject, "button.css");
				class Button$1 {
					constructor(options$1) {
						let _a = options$1, { disabled, value, className, onClick } = _a, other = __objRest(_a, [
							"disabled",
							"value",
							"className",
							"onClick"
						]);
						this.disabled = disabled;
						this.value = value;
						this.className = className || "blackbutton";
						this.onClick = onClick;
						this.options = other;
					}
					remove() {}
					render() {
						var _a;
						this.renderElement();
						this.element.$host = this;
						this.element.onclick = (_a = this.onClick) != null ? _a : null;
						this.disabled && this.element.classList.add("Disabled");
						this.onClick && this.element.addEventListener("click", this.onClick);
						this.element.addEventListener("mousedown", (e) => this.addClass(e, "Down"));
						this.element.addEventListener("mouseup", (e) => this.removeClass(e, "Down"));
						this.element.addEventListener("mouseover", (e) => this.addClass(e, "Over"));
						this.element.addEventListener("mouseout", (e) => this.removeClass(e, "Over"));
						this.element.addEventListener("focus", (e) => this.addClass(e, "Focus"));
						this.element.addEventListener("unfocus", (e) => this.removeClass(e, "Focus"));
						return this.element;
					}
					addClass(e, className) {
						e.preventDefault();
						this.element.classList.add(className);
					}
					removeClass(e, className) {
						this.element.classList.remove(className);
					}
					renderElement() {
						this.element ??= dom$1.buildDom([
							"div",
							__spreadValues({}, this.options),
							this.value
						]);
						this.element.classList.add(this.className);
					}
					toJSON() {}
				}
				var dropdown = __webpack_require__(593);
				var dropdown_options = {};
				dropdown_options.styleTagTransform = styleTagTransform_default();
				dropdown_options.setAttributes = setAttributesWithoutAttributes_default();
				dropdown_options.insert = insertBySelector_default().bind(null, "head");
				dropdown_options.domAPI = styleDomAPI_default();
				dropdown_options.insertStyleElement = insertStyleElement_default();
				injectStylesIntoStyleTag_default()(dropdown.A, dropdown_options);
				const styles_dropdown = dropdown.A && dropdown.A.locals ? dropdown.A.locals : void 0;
				var dropdown_defProp = Object.defineProperty;
				var dropdown_getOwnPropSymbols = Object.getOwnPropertySymbols;
				var dropdown_hasOwnProp = Object.prototype.hasOwnProperty;
				var dropdown_propIsEnum = Object.prototype.propertyIsEnumerable;
				var dropdown_defNormalProp = (obj, key, value) => key in obj ? dropdown_defProp(obj, key, {
					enumerable: true,
					configurable: true,
					writable: true,
					value
				}) : obj[key] = value;
				var dropdown_spreadValues = (a, b) => {
					for (var prop in b || (b = {})) if (dropdown_hasOwnProp.call(b, prop)) dropdown_defNormalProp(a, prop, b[prop]);
					if (dropdown_getOwnPropSymbols) {
						for (var prop of dropdown_getOwnPropSymbols(b)) if (dropdown_propIsEnum.call(b, prop)) dropdown_defNormalProp(a, prop, b[prop]);
					}
					return a;
				};
				var dropdown_objRest = (source, exclude) => {
					var target = {};
					for (var prop in source) if (dropdown_hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
					if (source != null && dropdown_getOwnPropSymbols) {
						for (var prop of dropdown_getOwnPropSymbols(source)) if (exclude.indexOf(prop) < 0 && dropdown_propIsEnum.call(source, prop)) target[prop] = source[prop];
					}
					return target;
				};
				dom$1.importCssString(dropdown_namespaceObject, "dropdown.css");
				dom$1.importCssString(menu_namespaceObject, "menu.css");
				const DEFAULT_WIDTH = 200;
				class Dropdown {
					constructor(options$1) {
						this.onMouseDown = (e) => {
							e.preventDefault();
							let node = Utils.findNode(e.target, this.className);
							if (node && node == this.element) return;
							node = Utils.findNode(e.target, this.popup.element.className);
							if (node && node == this.popup.element) return;
							this.closePopup();
						};
						this.onMouseWheel = (e) => {
							this.closePopup();
						};
						let _a = options$1, { disabled, items, value, className, width } = _a, other = dropdown_objRest(_a, [
							"disabled",
							"items",
							"value",
							"className",
							"width"
						]);
						this.disabled = disabled != null ? disabled : false;
						this.items = items;
						this.value = value != null ? value : items[0].value;
						this.className = className || "black_dropdown";
						this.width = width != null ? width : DEFAULT_WIDTH;
						this.options = other;
					}
					render() {
						this.element = dom$1.buildDom([
							"div",
							dropdown_spreadValues({
								class: this.className + (this.disabled ? this.className + "Disabled" : ""),
								style: "width: " + this.width + "px",
								onmousedown: (e) => {
									e.preventDefault();
									this.element.className = this.className + " " + this.className + "Down";
									this.togglePopup();
								},
								onmouseup: (e) => {
									this.element.className = this.className;
								},
								onmouseover: (e) => {
									this.element.className = this.className + " " + this.className + "Over";
								},
								onfocus: (e) => {
									this.element.className = this.className + " " + this.className + "Focus";
								},
								onunfocus: (e) => {
									this.element.className = this.className;
								},
								onmouseout: (e) => {
									this.element.className = this.className;
								}
							}, this.options),
							[["div", {
								class: "lbl",
								ref: "lbl"
							}], ["div", { class: "button" }]]
						], void 0, this);
						this.element.$host = this;
						this.updateLabel();
						return this.element;
					}
					togglePopup() {
						if (this.isPopupOpen) this.closePopup();
						else this.openPopup();
					}
					openPopup() {
						if (this.isPopupOpen) return;
						this.popup = new Popup();
						this.popup.items = this.items;
						this.popup.selectedItem = this.value;
						this.popup.parent = this;
						this.popup.selectCallback = (host) => {
							this.select(host.value);
							this.closePopup();
						};
						this.popup.open();
						window.addEventListener("mousedown", this.onMouseDown);
						window.addEventListener("wheel", this.onMouseWheel);
						this.isPopupOpen = true;
					}
					closePopup() {
						if (!this.isPopupOpen) return;
						this.popup.close();
						this.isPopupOpen = false;
						window.removeEventListener("mousedown", this.onMouseDown);
						window.removeEventListener("wheel", this.onMouseWheel);
					}
					select(value) {
						this.setValue(value);
					}
					setValue(value) {
						if (this.value !== value) {
							this.value = value;
							this.updateLabel();
						}
					}
					updateLabel() {
						let items = this.items;
						for (let i = 0; i < items.length; i++) {
							let x = items[i];
							let itemValue = x.value;
							if (this.value === itemValue) {
								this.lbl.innerHTML = x.caption;
								return;
							}
						}
					}
					toJSON() {}
				}
				class Popup {
					open() {
						this.build();
						this.render();
					}
					build() {
						if (this.element) return;
						let result = [];
						if (this.items) {
							let items = Object.values(this.items).sort(function(item1, item2) {
								return item1.position - item2.position;
							});
							let afterDivider = true;
							result = items.map((item) => {
								if (item.caption[0] === "~") {
									if (afterDivider) return;
									afterDivider = true;
									return ["div", {
										class: "menu_divider",
										$host: item
									}];
								}
								afterDivider = false;
								let classList = ["menu_item"];
								if (item.checked) classList.push(item.type === "check" ? "checked" : "selected");
								if (item.map) classList.push("submenu");
								if (item.disabled) classList.push("disabled");
								if (item.value === this.selectedItem) classList.push("selected");
								return [
									"div",
									{
										class: classList.join(" "),
										$host: item
									},
									["u", " "],
									["a", item.caption + ""],
									[
										"span",
										{ class: "shortcut" },
										item.hotKey
									]
								];
							}).filter(Boolean);
							if (afterDivider) result.pop();
						}
						this.element = dom$1.buildDom([
							"blockquote",
							{
								class: "menu",
								style: "display:block",
								$host: this.parent,
								onmousemove: this.onMouseMove.bind(this),
								onclick: this.onClick.bind(this)
							},
							result
						], document.body);
					}
					render() {
						if (this.element.style.maxWidth) this.element.style.maxWidth = window.innerWidth + "px";
						if (this.element.style.maxHeight) this.element.style.maxHeight = window.innerHeight + "px";
						let elRect = this.element.getBoundingClientRect();
						let edge = Utils.getElementEdges(this.element);
						let parentRect, top, left;
						if (this.parent && this.parent.element) parentRect = this.parent.element.getBoundingClientRect();
						if (parentRect) if (this.isSubMenu) {
							top = parentRect.top - edge.top;
							left = parentRect.right;
						} else {
							top = parentRect.bottom;
							left = parentRect.left;
						}
						else {
							top = this.position.y;
							left = this.position.x;
						}
						let targetH = Math.min(elRect.height, window.innerHeight);
						let availableH = window.innerHeight - top - edge.top - edge.bottom - 2;
						if (availableH < targetH && (!parentRect || this.isSubMenu)) {
							top = (parentRect ? window.innerHeight : top) - targetH - edge.top;
							availableH = window.innerHeight - top - edge.top - edge.bottom - 2;
						}
						this.element.style.maxHeight = availableH - 10 + "px";
						elRect = this.element.getBoundingClientRect();
						let availableW = window.innerWidth - left - edge.left - edge.right - 2;
						if (availableW < elRect.width) if (parentRect) {
							let tmpLeft = this.isSubMenu ? parentRect.left : parentRect.right;
							if (tmpLeft > availableW) {
								this.direction = "left";
								left = tmpLeft - elRect.width + edge.left;
								left = Math.max(left, 0);
								availableW = tmpLeft + edge.left + edge.right;
							}
							if (availableW < elRect.width) {
								this.element.style.maxWidth = availableW + "px";
								this.element.style.overflowX = "auto";
							}
						} else left = window.innerWidth - elRect.width - edge.left - edge.right;
						this.element.style.top = top + "px";
						this.element.style.left = left + "px";
						this.element.style.position = "absolute";
						this.element.style.zIndex = 195055;
						this.element.style.overflowY = "auto";
					}
					close() {
						if (this.element) {
							this.element.remove();
							delete this.element;
						}
					}
					scrollIfNeeded() {
						if (!this.selectedMenu) return;
						let menu$1 = this.element;
						let item = this.selectedMenu.buttonElement;
						let menuRect = menu$1.getBoundingClientRect();
						let itemRect = item.getBoundingClientRect();
						if (itemRect.top < menuRect.top) item.scrollIntoView(true);
						else if (itemRect.bottom > menuRect.bottom) item.scrollIntoView(false);
					}
					onMouseMove(e) {
						if (e.target === this.element) return;
						let target = Utils.findHostTarget(e.target);
						if (target === this.element) return;
						if (target == this.activeItem) return;
						if (this.activeItem) this.activeItem.classList.remove("hover");
						this.activeItem = target;
						this.activeItem.classList.add("hover");
					}
					onClick(e) {
						if (e.target === this.element) return;
						let target = Utils.findHostTarget(e.target);
						if (target === this.element) return;
						let host = target.$host;
						this.selectCallback && this.selectCallback(host);
					}
				}
				class SettingsSearchBox {
					constructor(prefsParentNode) {
						this.hideFiltered = false;
						this.value = "";
						this.currValue = "";
						this.searchResultsCount = 0;
						this.prefsParentNode = prefsParentNode;
					}
					filter() {
						let childNode;
						let noResult = true;
						this.searchResultsCount = 0;
						for (let i = 0; i < this.prefsParentNode.childNodes.length; i++) {
							childNode = this.prefsParentNode.childNodes[i];
							this.updateVisibility(childNode);
							if (noResult && !childNode.isFiltered) noResult = false;
						}
						if (this.currValue != "") this.searchResults.innerHTML = " " + this.searchResultsCount + " Preferences Found";
						else this.searchResults.innerHTML = "";
					}
					showHide(item, show) {
						show = show || false;
						item.isFiltered = !show;
						item.style.display = show ? "block" : "none";
					}
					updateVisibility(item) {
						let text = item.innerText;
						let tokens = this.getTokens(text);
						let show = true;
						if (!tokens) show = false;
						else this.searchResultsCount++;
						this.showHide(item, show);
					}
					getTokens(string) {
						let tokens = [];
						let caption = string.toLowerCase();
						let lower = this.currValue.toLowerCase();
						let upper = this.currValue.toUpperCase();
						function addToken(value, className) {
							value && tokens.push({
								type: className || "",
								value
							});
						}
						let lastIndex = -1;
						let matchMask = 0;
						let index, distance;
						if (caption.indexOf(lower) === -1) for (let j = 0; j < this.currValue.length; j++) {
							let i1 = caption.indexOf(lower[j], lastIndex + 1);
							let i2 = caption.indexOf(upper[j], lastIndex + 1);
							index = i1 >= 0 ? i2 < 0 || i1 < i2 ? i1 : i2 : i2;
							if (index < 0) return null;
							distance = index - lastIndex - 1;
							if (distance > 0) matchMask = matchMask | 1 << j;
							lastIndex = index;
						}
						let filterText = lower;
						lower = caption.toLowerCase();
						lastIndex = 0;
						let lastI = 0;
						for (let i = 0; i <= filterText.length; i++) if (i !== lastI && (matchMask & 1 << i || i === filterText.length)) {
							let sub = filterText.slice(lastI, i);
							lastI = i;
							index = lower.indexOf(sub, lastIndex);
							if (index === -1) continue;
							addToken(string.slice(lastIndex, index), "");
							lastIndex = index + sub.length;
							addToken(string.slice(index, lastIndex), "completion-highlight");
						}
						addToken(string.slice(lastIndex, string.length), "");
						return tokens;
					}
					build() {
						this.element = dom$1.buildDom([
							"div",
							{},
							["input", {
								class: "search_field tbsimple",
								placeholder: "Search preferences"
							}],
							["span", { class: "search_results" }],
							["span", { class: "searchbtn_close" }]
						]);
						this.element.$host = this;
						this.searchField = this.element.querySelector(".search_field");
						this.searchResults = this.element.querySelector(".search_results");
						let _this = this;
						this.element.querySelector(".searchbtn_close").addEventListener("mousedown", function(e) {
							_this.clear();
						});
						this.searchField.addEventListener("input", function(e) {
							_this.currValue = e.target.value;
							_this.filter();
						});
					}
					clear() {
						if (this.currValue.length) {
							this.searchField.value = "";
							this.currValue = "";
							this.filter();
						}
					}
				}
				var switcher = __webpack_require__(915);
				var switcher_options = {};
				switcher_options.styleTagTransform = styleTagTransform_default();
				switcher_options.setAttributes = setAttributesWithoutAttributes_default();
				switcher_options.insert = insertBySelector_default().bind(null, "head");
				switcher_options.domAPI = styleDomAPI_default();
				switcher_options.insertStyleElement = insertStyleElement_default();
				injectStylesIntoStyleTag_default()(switcher.A, switcher_options);
				const styles_switcher = switcher.A && switcher.A.locals ? switcher.A.locals : void 0;
				var switcher_defProp = Object.defineProperty;
				var switcher_getOwnPropSymbols = Object.getOwnPropertySymbols;
				var switcher_hasOwnProp = Object.prototype.hasOwnProperty;
				var switcher_propIsEnum = Object.prototype.propertyIsEnumerable;
				var switcher_defNormalProp = (obj, key, value) => key in obj ? switcher_defProp(obj, key, {
					enumerable: true,
					configurable: true,
					writable: true,
					value
				}) : obj[key] = value;
				var switcher_spreadValues = (a, b) => {
					for (var prop in b || (b = {})) if (switcher_hasOwnProp.call(b, prop)) switcher_defNormalProp(a, prop, b[prop]);
					if (switcher_getOwnPropSymbols) {
						for (var prop of switcher_getOwnPropSymbols(b)) if (switcher_propIsEnum.call(b, prop)) switcher_defNormalProp(a, prop, b[prop]);
					}
					return a;
				};
				var switcher_objRest = (source, exclude) => {
					var target = {};
					for (var prop in source) if (switcher_hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0) target[prop] = source[prop];
					if (source != null && switcher_getOwnPropSymbols) {
						for (var prop of switcher_getOwnPropSymbols(source)) if (exclude.indexOf(prop) < 0 && switcher_propIsEnum.call(source, prop)) target[prop] = source[prop];
					}
					return target;
				};
				dom$1.importCssString(switcher_namespaceObject, "switcher.css");
				class Switcher {
					constructor(options$1) {
						let _a = options$1, { className, checked } = _a, other = switcher_objRest(_a, ["className", "checked"]);
						this.className = className || "cboffline";
						this.options = other;
						this.checked = checked || false;
					}
					render() {
						this.element = dom$1.buildDom([
							"div",
							switcher_spreadValues({
								class: this.className + (this.checked ? " " + this.className + "Checked" : ""),
								onmousedown: (e) => {
									e.preventDefault();
									this.checked = !this.checked;
									e.target.className = this.className + (this.checked ? " " + this.className + "Down" : "");
								},
								onclick: (e) => {
									e.preventDefault();
									e.target.className = this.className + (this.checked ? " " + this.className + "Checked" : "");
								}
							}, this.options),
							""
						]);
						this.element.$host = this;
						return this.element;
					}
					toJSON() {
						return {};
					}
					remove() {}
				}
				class MenuToolbar extends Toolbar {
					render() {
						if (!this.element) {
							this.element = dom$1.buildDom([
								"div",
								{ class: "menuToolBar" },
								["div", {
									class: "menuBar",
									ref: "menuBar"
								}]
							], void 0, this);
							let menuManager = MenuManager.getInstance();
							menuManager.build();
							menuManager.buildMenuBar(this.menuBar);
							menuManager.bindKeys();
						}
						return this.element;
					}
					remove() {}
					toJSON() {}
				}
				class PanelBar extends TabPanelBar {
					setBox(x, y, w, h) {
						super.setBox(x, y, w, h);
						this.configure();
					}
					configure() {
						let tabElement;
						let tabSize = 30;
						let position = 0;
						for (let i = 0; i < this.tabList.length; i++) {
							tabElement = this.tabList[i].element;
							if (this.draggingElementIndex === i) position += this.getDraggingElementSize();
							if (this.isVertical()) {
								tabElement.style.left = "0px";
								tabElement.style.height = tabSize + "px";
								tabElement.style.top = position + "px";
							} else {
								tabElement.style.top = "0px";
								tabElement.style.width = tabSize + "px";
								tabElement.style.left = position + "px";
							}
							position += tabSize;
						}
					}
					render() {
						if (!this.element) this.element = dom$1.buildDom([
							"div",
							{ class: "panelbar " + this.direction + " " + this.position },
							["div", {
								class: "tabContainer",
								ref: "tabContainer",
								onmousedown: function(e) {
									TabbarHandler.tabbarMouseDown(e, Panel, PanelBar);
								},
								onmouseup: (e) => {
									if (this.activeTabClicked) {
										let activeTab = this.activeTab;
										this.removeSelection(activeTab);
										activeTab.deactivate();
										this.activeTab = void 0;
										if (this.activeTabHistory.length && activeTab.autoHide) {
											let previousTab = activeTab;
											while (previousTab === activeTab && this.activeTabHistory.length) previousTab = this.activeTabHistory.pop();
											if (previousTab !== activeTab) this.activateTab(previousTab);
										}
									}
								}
							}]
						], void 0, this);
						if (this.initTabList && this.initTabList.length) for (let i = 0; i < this.initTabList.length; i++) this.addTab(this.initTabList[i]);
						this.element.$host = this;
						return this.element;
					}
					addTabList(tabList, index) {
						index = index || this.tabList.length;
						let tab$1;
						for (let i = 0; i < tabList.length; i++) {
							tab$1 = new Panel(tabList[i]);
							this.addTab(tab$1, index++);
						}
					}
					remove() {}
				}
				class PanelManager {
					constructor(options$1) {
						this.layout = options$1.layout;
						this.locations = options$1.locations;
					}
					static getInstance(options$1) {
						if (!PanelManager._instance) PanelManager._instance = new PanelManager(options$1);
						return PanelManager._instance;
					}
					toJSON() {
						return { panelBars: this.panelBarsToJSON() };
					}
					panelBarsToJSON() {
						let panelBars = {};
						for (let [position, panelBar] of Object.entries(this.layout.toolBars)) if (panelBar instanceof PanelBar) panelBars[position] = panelBar.toJSON();
						return panelBars;
					}
					setState(state) {
						var _a;
						let panelBars = (_a = state.panelBars) != null ? _a : {};
						let panelBar, panelList, panel$1;
						let panelBody, panelBodyData;
						for (let position of Object.keys(panelBars)) {
							panelList = [];
							let tabList = panelBars[position].tabList;
							for (let i = 0; i < tabList.length; i++) {
								panel$1 = tabList[i];
								panelBodyData = panel$1.panelBody;
								if (panelBodyData.type === "accordion") {
									let accordionSections = [];
									let sections = panelBodyData.sections;
									for (let index = 0; index < sections.length; index++) accordionSections.push({
										title: sections[index].title,
										box: new Box$1(sections[index].boxData)
									});
									panelBody = new Accordion({
										vertical: panelBodyData.vertical,
										size: panelBodyData.size,
										sections: accordionSections
									});
								} else panelBody = new Box$1({
									vertical: panelBodyData.type === "vbox",
									color: panelBodyData.color,
									size: panelBodyData.size,
									hidden: panelBodyData.hidden,
									fixedSize: panelBodyData.fixedSize
								});
								panelList.push({
									active: panel$1.active,
									title: panel$1.title,
									autoHide: panel$1.autoHide,
									panelBody
								});
							}
							panelBar = new PanelBar({ panelList: {} });
							this.layout.addToolBar(position, panelBar);
							panelBar.addTabList(panelList);
						}
					}
					activatePanel(panel$1) {
						let location = this.locations[panel$1.parent.position];
						if (!location) return;
						let index = location.index;
						let parent = location.parent;
						panel$1.panelBody.size = location.size;
						let newBox = parent.addChildBox(index, panel$1.panelBody);
						if (newBox.fixedSize && !parent.fixedChild) parent.fixedChild = newBox;
						location.box = newBox;
						newBox.show();
					}
					deactivatePanel(panel$1) {
						this.locations[panel$1.parent.position]?.box.hide();
					}
				}
				var panel = __webpack_require__(174);
				var panel_options = {};
				panel_options.styleTagTransform = styleTagTransform_default();
				panel_options.setAttributes = setAttributesWithoutAttributes_default();
				panel_options.insert = insertBySelector_default().bind(null, "head");
				panel_options.domAPI = styleDomAPI_default();
				panel_options.insertStyleElement = insertStyleElement_default();
				injectStylesIntoStyleTag_default()(panel.A, panel_options);
				const styles_panel = panel.A && panel.A.locals ? panel.A.locals : void 0;
				dom$1.importCssString(panel_namespaceObject, "panel.css");
				class Panel extends TabPanel {
					constructor(options$1) {
						var _a;
						super(options$1);
						this.location = options$1.location;
						this.panelBody = options$1.panelBody;
						this.autoHide = (_a = options$1.autoHide) != null ? _a : false;
						this.title = options$1.title;
					}
					activate() {
						super.activate();
						PanelManager.getInstance().activatePanel(this);
					}
					deactivate() {
						super.deactivate();
						PanelManager.getInstance().deactivatePanel(this);
					}
					render() {
						this.element = dom$1.buildDom([
							"div",
							{ class: "panelButton" + (this.active ? " active" : "") },
							[
								"span",
								{ class: "panelTitle" },
								this.title
							]
						]);
						this.element.$host = this;
						return this.element;
					}
					toJSON() {
						return {
							active: this.active,
							title: this.title,
							autoHide: this.autoHide,
							panelBody: this.panelBody.toJSON()
						};
					}
					remove() {}
				}
				var layout = __webpack_require__(0);
				var layout_options = {};
				layout_options.styleTagTransform = styleTagTransform_default();
				layout_options.setAttributes = setAttributesWithoutAttributes_default();
				layout_options.insert = insertBySelector_default().bind(null, "head");
				layout_options.domAPI = styleDomAPI_default();
				layout_options.insertStyleElement = insertStyleElement_default();
				injectStylesIntoStyleTag_default()(layout.A, layout_options);
				const styles_layout = layout.A && layout.A.locals ? layout.A.locals : void 0;
				class AceLayout$1 {
					constructor(startBox, css) {
						dom$1.importCssString(css != null ? css : layout_namespaceObject, "layout.css");
						this.box = startBox;
					}
				}
				var ace_tree_lib = __webpack_require__(532);
				const getIconUrl = (path, isDir) => {
					return `https://raw.githubusercontent.com/vscode-icons/vscode-icons/master/icons/${getIconName(path, isDir)}.svg`;
				};
				function getIconName(path, isDir) {
					if (!path) return "default_file";
					if (isDir) return "default_folder";
					const filename$1 = path.substring(path.lastIndexOf("/") + 1);
					return getIconNameFromExtension(filename$1.split(".").pop() || "") || getIconNameFromFileName(filename$1) || "default_file";
				}
				function getIconNameFromExtension(ext) {
					switch (ext.toLowerCase()) {
						case "js": return "file_type_js";
						case "ts": return "file_type_typescript";
						case "html": return "file_type_html";
						case "css": return "file_type_css";
						case "less": return "file_type_less";
						case "sass": return "file_type_sass";
						case "scss": return "file_type_scss";
						case "json": return "file_type_json";
						case "py": return "file_type_python";
						case "rb": return "file_type_ruby";
						case "go": return "file_type_go";
						case "rust": return "file_type_rust";
						case "java": return "file_type_java";
						case "scala": return "file_type_scala";
						case "swift": return "file_type_swift";
						case "sh": return "file_type_shell";
						case "makefile": return "file_type_shell";
						case "bat": return "file_type_shell";
						case "bash": return "file_type_shell";
						case "cs": return "file_type_csharp";
						case "yml": return "file_type_yaml";
						case "yaml": return "file_type_yaml";
						case "xml": return "file_type_xml";
						case "md": return "file_type_markdown";
						case "sql": return "file_type_sql";
						case "jpg": return "file_type_image";
						case "svg": return "file_type_image";
						case "jpeg": return "file_type_image";
						case "png": return "file_type_image";
						case "gif": return "file_type_image";
						case "bmp": return "file_type_image";
						default: return null;
					}
				}
				function getIconNameFromFileName(filename$1) {
					switch (filename$1.toLowerCase()) {
						case "dockerfile": return "file_type_docker";
						case ".gitignore": return "file_type_git2";
						case ".gitattributes": return "file_type_git2";
						default: return null;
					}
				}
				var ace_tree = __webpack_require__(216);
				var ace_tree_options = {};
				ace_tree_options.styleTagTransform = styleTagTransform_default();
				ace_tree_options.setAttributes = setAttributesWithoutAttributes_default();
				ace_tree_options.insert = insertBySelector_default().bind(null, "head");
				ace_tree_options.domAPI = styleDomAPI_default();
				ace_tree_options.insertStyleElement = insertStyleElement_default();
				injectStylesIntoStyleTag_default()(ace_tree.A, ace_tree_options);
				const styles_ace_tree = ace_tree.A && ace_tree.A.locals ? ace_tree.A.locals : void 0;
				const ace_tree_oop = __webpack_require__(387);
				dom$1.importCssString(ace_tree_namespaceObject, "ace-tree.css");
				function transform(node) {
					const path = node["path"] || "";
					const name$1 = path.slice(path.lastIndexOf("/") + 1);
					let children = node["nodes"] || node["children"];
					if (children) children = children.map(transform);
					return {
						fsNode: node,
						name: name$1,
						children
					};
				}
				class AceTreeWrapper$1 {
					render() {
						if (this.tree) return this.element;
						this.element ??= dom$1.buildDom(["div"]);
						this.element.className = "ace-tree-wrapper";
						this.tree = new ace_tree_lib.Tree(this.element);
						this.model = new ace_tree_lib.DataProvider({});
						this.setupAceTree();
						return this.element;
					}
					remove() {
						this.element.remove();
					}
					toJSON() {
						return {};
					}
					setupAceTree() {
						this.tree.setDataProvider(this.model);
						this.provideIcons();
						if (typeof window !== "undefined") window["fileTree"] = this.tree;
					}
					updateTreeData(fileTree$1) {
						const model = this.model;
						const tree = this.tree;
						if (!model.root || model.root.fsNode != fileTree$1) {
							const treeNodes = transform(fileTree$1);
							if (treeNodes.children.length == 1) treeNodes.children[0].isOpen = true;
							model.setRoot(treeNodes);
							tree.on("afterChoose", () => {
								var _a;
								const fsNode = (_a = tree.selection.getCursor()) == null ? void 0 : _a.fsNode;
								if (fsNode && fsNode.kind != "directory") {
									const event = new CustomEvent("item-click", { detail: fsNode });
									this.element.dispatchEvent(event);
								}
							});
						}
						this.tree.resize();
					}
					provideIcons() {
						this.model.getIconHTML = function(node) {
							const treeNode = node.fsNode;
							const isDir = treeNode.kind === "directory";
							const size = 16;
							return `<span class="file-icon">
<svg width="${size}" height="${size}">
     <image xlink:href="${getIconUrl(treeNode.path, isDir)}" width="${size}" height="${size}"/>
</svg>
</span>`;
						};
					}
				}
				ace_tree_oop.implement(AceTreeWrapper$1.prototype, event_emitter_.EventEmitter);
				var __knownSymbol = (name$1, symbol) => {
					return (symbol = Symbol[name$1]) ? symbol : Symbol.for("Symbol." + name$1);
				};
				var __async = (__this, __arguments, generator) => {
					return new Promise((resolve, reject) => {
						var fulfilled = (value) => {
							try {
								step(generator.next(value));
							} catch (e) {
								reject(e);
							}
						};
						var rejected = (value) => {
							try {
								step(generator.throw(value));
							} catch (e) {
								reject(e);
							}
						};
						var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
						step((generator = generator.apply(__this, __arguments)).next());
					});
				};
				var __forAwait = (obj, it, method) => (it = obj[__knownSymbol("asyncIterator")]) ? it.call(obj) : (obj = obj[__knownSymbol("iterator")](), it = {}, method = (key, fn) => (fn = obj[key]) && (it[key] = (arg) => new Promise((yes, no, done) => (arg = fn.call(obj, arg), done = arg.done, Promise.resolve(arg.value).then((value) => yes({
					value,
					done
				}), no)))), method("next"), method("return"), it);
				const MAX_SIZE = 8e6;
				class FileSystemEntry {
					constructor(fileSystemHandle, filePath = "") {
						this.fileSystemHandle = fileSystemHandle;
						this.filePath = filePath;
					}
					get path() {
						return [this.filePath, this.name].join("/");
					}
					get name() {
						return this.fileSystemHandle.name;
					}
					get leaf() {
						const { name: name$1, kind, path } = this;
						const leaf = {
							name: name$1,
							kind,
							path,
							self: this
						};
						if (kind == "directory") leaf["children"] = [];
						return leaf;
					}
				}
				class File extends FileSystemEntry {
					constructor(fileSystemHandle, filePath = "") {
						super(fileSystemHandle, filePath);
						this.fileSystemHandle = fileSystemHandle;
						this.filePath = filePath;
						this.kind = "file";
					}
					getFileData() {
						return __async(this, null, function* () {
							return yield this.fileSystemHandle.getFile();
						});
					}
					getFileText() {
						return __async(this, null, function* () {
							const fileData = yield this.getFileData();
							if (fileData.size > MAX_SIZE) throw new Error(`File size to large: ${fileData.size}, max ${MAX_SIZE} supported`);
							return yield fileData.text();
						});
					}
				}
				class Directory extends FileSystemEntry {
					constructor(fileSystemHandle, filePath = "") {
						super(fileSystemHandle, filePath);
						this.fileSystemHandle = fileSystemHandle;
						this.filePath = filePath;
						this.childNodes = [];
						this.kind = "directory";
					}
					static openFilehandle(fileHandle) {
						return __async(this, null, function* () {
							if (!fileHandle) throw new Error("FileHandle undefined");
							return new Directory(fileHandle);
						});
					}
					getFileTee() {
						return __async(this, null, function* () {
							const root = this.leaf;
							const entries = [root];
							while (entries.length) {
								const entry = entries.pop();
								const dir = entry.self;
								for (const childNode of yield dir.children()) {
									const child = childNode.leaf;
									if (child.kind == "directory") entries.push(child);
									entry.children.push(child);
								}
								delete entry.self;
							}
							return root;
						});
					}
					getFileByPath(pathname) {
						return __async(this, null, function* () {
							const entries = yield this.children();
							while (entries.length) {
								const entry = entries.pop();
								if (entry.path == pathname) return entry;
								if (entry.kind == "directory") entries.push(...yield entry.children());
							}
							throw new Error(`File not found in tree: ${pathname}`);
						});
					}
					getDirectoryHandle(name$1) {
						return __async(this, null, function* () {
							return this.fileSystemHandle.getDirectoryHandle(name$1);
						});
					}
					children() {
						return __async(this, null, function* () {
							if (!this.childNodes.length) try {
								for (var iter = __forAwait(this.fileSystemHandle.values()), more, temp, error; more = !(temp = yield iter.next()).done; more = false) {
									const child = temp.value;
									let childNode;
									if (child.kind == "directory") childNode = new Directory(yield this.getDirectoryHandle(child.name), this.path);
									else childNode = new File(yield this.fileSystemHandle.getFileHandle(child.name), this.path);
									this.childNodes.push(childNode);
								}
							} catch (temp$1) {
								error = [temp$1];
							} finally {
								try {
									more && (temp = iter.return) && (yield temp.call(iter));
								} finally {
									if (error) throw error[0];
								}
							}
							return [...this.childNodes];
						});
					}
				}
				var file_system_web_async = (__this, __arguments, generator) => {
					return new Promise((resolve, reject) => {
						var fulfilled = (value) => {
							try {
								step(generator.next(value));
							} catch (e) {
								reject(e);
							}
						};
						var rejected = (value) => {
							try {
								step(generator.throw(value));
							} catch (e) {
								reject(e);
							}
						};
						var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
						step((generator = generator.apply(__this, __arguments)).next());
					});
				};
				class FileSystemWeb$1 extends events.EventEmitter {
					get dir() {
						if (!this.directory) throw new Error("Accessing directory before created");
						return this.directory;
					}
					open() {
						return file_system_web_async(this, null, function* () {
							const handle = yield window.showDirectoryPicker().catch((err) => console.error("showDirectoryPicker:", err.message));
							if (handle) {
								const { err, dir } = yield Directory.openFilehandle(handle).then((dir2) => ({
									dir: dir2,
									err: null
								})).catch((err2) => ({
									err: err2,
									dir: null
								}));
								this.directory = dir;
								return this.getFileTree();
							}
						});
					}
					getFileTree() {
						return file_system_web_async(this, null, function* () {
							if (this.directory) return { nodes: [yield this.dir.getFileTee()] };
						});
					}
					openFile(treeNode) {
						return file_system_web_async(this, null, function* () {
							const fileText = yield (yield this.dir.getFileByPath(treeNode.path)).getFileText();
							this.emit("openFile", treeNode, fileText);
						});
					}
				}
			})();
			return __webpack_exports__;
		})();
	});
})))();
var worker = new Worker(new URL(
	/* @vite-ignore */
	"" + new URL("webworker-BeICsEMZ.js", import.meta.url).href,
	"" + import.meta.url
), { type: "module" });
var languageProvider = LanguageProvider.create(worker, {
	functionality: { semanticTokens: true },
	manualSessionControl: true
});
addFormatCommand(languageProvider);
var fileTree;
var editorBox;
var base = new import_bundle_index.Box({
	vertical: false,
	0: fileTree = new import_bundle_index.Box({ size: 200 }),
	1: editorBox = new import_bundle_index.Box({
		isMain: true,
		0: new import_bundle_index.Pane()
	})
});
new import_bundle_index.AceLayout(base);
window["fileTreeWrapper"] = fileTree;
var fileSystem = new import_bundle_index.FileSystemWeb();
var aceTree = new import_bundle_index.AceTreeWrapper();
aceTree.render();
function renderFileTree() {
	let button = new import_bundle_index.Button({ value: "Open Folder" });
	let buttonWrapper = [
		"div",
		{},
		button.render()
	];
	let aceTreeWrapper = [
		"div",
		{ style: "height: 100%" },
		aceTree.element
	];
	button.element.addEventListener("click", openInfo);
	import_bundle_index.dom.buildDom([
		"div",
		{ style: "height: 100%" },
		buttonWrapper,
		aceTreeWrapper
	], fileTree.element);
}
base.render();
var onResize = function() {
	base.setBox(0, 0, window.innerWidth, window.innerHeight);
};
renderFileTree();
onResize();
document.body.appendChild(base.element);
window.onresize = onResize;
var tabManager = import_bundle_index.TabManager.getInstance({
	containers: { main: editorBox },
	fileSystem
});
tabManager.fileSystem?.on("openFile", (treeNode) => {
	let tab = tabManager.getTab(treeNode.path);
	let path = treeNode.path.substring(treeNode.path.indexOf("/", 1));
	const editor = tab.editor.editor;
	languageProvider.setSessionLspConfig(editor.session, {
		filePath: path,
		joinWorkspaceURI: true
	});
	languageProvider.registerEditor(editor);
});
tabManager.restoreFrom(localStorage);
async function openFolder() {
	let nodes = await fileSystem.open();
	setWorkspace();
	aceTree.updateTreeData(nodes);
	aceTree.element.addEventListener("item-click", (evt) => {
		if ("detail" in evt) fileSystem.openFile(evt.detail);
	});
}
function openInfo() {
	var popup = document.getElementById("info-popup");
	if (popup) {
		popup.style.display = "block";
		const okayBtn = document.getElementById("okayBtn");
		if (okayBtn) okayBtn.onclick = function() {
			openFolder();
			if (popup) popup.style.display = "none";
		};
	}
}
function setWorkspace() {
	var popup = document.getElementById("workspace-popup");
	if (popup) popup.style.display = "block";
	var span = document.querySelector(".popup-content .close");
	if (span) span.onclick = function() {
		if (popup) popup.style.display = "none";
	};
	const confirmBtn = document.getElementById("confirmBtn");
	if (confirmBtn) confirmBtn.onclick = function() {
		const filePathInput = document.getElementById("filePath");
		if (filePathInput) {
			var dirPath = filePathInput.value;
			alert("File path confirmed: " + dirPath);
			if (popup) popup.style.display = "none";
			languageProvider.changeWorkspaceFolder(dirPath);
		}
	};
}
export { require_modelist as t };
