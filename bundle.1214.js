(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1214,1772,6613,1494],{

/***/ 24809:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*jslint indent: 4, maxerr: 50, white: true, browser: true, vars: true*/
/*global define, require */

/**
 * Overlay Page
 * @fileOverview Overlay Page <br />
 * Generates an overlay for displaying menus. The overlay is an absolutely
 *  positioned div.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 */


var dom = __webpack_require__(71435);
var cssText = __webpack_require__(39047);
dom.importCssString(cssText, "settings_menu.css", false);

/**
 * Generates an overlay for displaying menus. The overlay is an absolutely
 *  positioned div.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param editor
 * @param {HTMLElement} contentElement Any element which may be presented inside
 *  a div.
 * @param [callback]
 */
module.exports.overlayPage = function overlayPage(editor, contentElement, callback) {
    var closer = document.createElement('div');
    var ignoreFocusOut = false;

    function documentEscListener(e) {
        if (e.keyCode === 27) {
            close();
        }
    }

    function close() {
        if (!closer) return;
        document.removeEventListener('keydown', documentEscListener);
        closer.parentNode.removeChild(closer);
        if (editor) {
            editor.focus();
        }
        closer = null;
        callback && callback();
    }

     /**
     * Defines whether overlay is closed when user clicks outside of it.
     * 
     * @param {Boolean} ignore      If set to true overlay stays open when focus moves to another part of the editor.
     */
    function setIgnoreFocusOut(ignore) {
        ignoreFocusOut = ignore;
        if (ignore) {
            closer.style.pointerEvents = "none";
            contentElement.style.pointerEvents = "auto";
        }
    }

    closer.style.cssText = 'margin: 0; padding: 0; ' +
        'position: fixed; top:0; bottom:0; left:0; right:0;' +
        'z-index: 9990; ' +
        (editor ? 'background-color: rgba(0, 0, 0, 0.3);' : '');
    closer.addEventListener('click', function(e) {
        if (!ignoreFocusOut) {
            close();
        }
    });
    // click closer if esc key is pressed
    document.addEventListener('keydown', documentEscListener);

    contentElement.addEventListener('click', function (e) {
        e.stopPropagation();
    });

    closer.appendChild(contentElement);
    document.body.appendChild(closer);
    if (editor) {
        editor.blur();
    }
    return {
        close: close,
        setIgnoreFocusOut: setIgnoreFocusOut
    };
};


/***/ }),

/***/ 39047:
/***/ ((module) => {

module.exports = `#ace_settingsmenu, #kbshortcutmenu {
    background-color: #F7F7F7;
    color: black;
    box-shadow: -5px 4px 5px rgba(126, 126, 126, 0.55);
    padding: 1em 0.5em 2em 1em;
    overflow: auto;
    position: absolute;
    margin: 0;
    bottom: 0;
    right: 0;
    top: 0;
    z-index: 9991;
    cursor: default;
}

.ace_dark #ace_settingsmenu, .ace_dark #kbshortcutmenu {
    box-shadow: -20px 10px 25px rgba(126, 126, 126, 0.25);
    background-color: rgba(255, 255, 255, 0.6);
    color: black;
}

.ace_optionsMenuEntry:hover {
    background-color: rgba(100, 100, 100, 0.1);
    transition: all 0.3s
}

.ace_closeButton {
    background: rgba(245, 146, 146, 0.5);
    border: 1px solid #F48A8A;
    border-radius: 50%;
    padding: 7px;
    position: absolute;
    right: -8px;
    top: -8px;
    z-index: 100000;
}
.ace_closeButton{
    background: rgba(245, 146, 146, 0.9);
}
.ace_optionsMenuKey {
    color: darkslateblue;
    font-weight: bold;
}
.ace_optionsMenuCommand {
    color: darkcyan;
    font-weight: normal;
}
.ace_optionsMenuEntry input, .ace_optionsMenuEntry button {
    vertical-align: middle;
}

.ace_optionsMenuEntry button[ace_selected_button=true] {
    background: #e7e7e7;
    box-shadow: 1px 0px 2px 0px #adadad inset;
    border-color: #adadad;
}
.ace_optionsMenuEntry button {
    background: white;
    border: 1px solid lightgray;
    margin: 0px;
}
.ace_optionsMenuEntry button:hover{
    background: #f0f0f0;
}`;


/***/ }),

/***/ 91772:
/***/ ((module) => {

"use strict";


/**
 * @type {Mode[]}
 */
var modes = [];
/**
 * Suggests a mode based on the file extension present in the given path
 * @param {string} path The path to the file
 * @returns {Mode} Returns an object containing information about the
 *  suggested mode.
 */
function getModeForPath(path) {
    var mode = modesByName.text;
    var fileName = path.split(/[\/\\]/).pop();
    for (var i = 0; i < modes.length; i++) {
        if (modes[i].supportsFile(fileName)) {
            mode = modes[i];
            break;
        }
    }
    return mode;
}

class Mode {
    /**
     * @param {string} name
     * @param {string} caption
     * @param {string} extensions
     */
    constructor(name, caption, extensions) {
        this.name = name;
        this.caption = caption;
        this.mode = "ace/mode/" + name;
        this.extensions = extensions;
        var re;
        if (/\^/.test(extensions)) {
            re = extensions.replace(/\|(\^)?/g, function (a, b) {
                return "$|" + (b ? "^" : "^.*\\.");
            }) + "$";
        }
        else {
            re = "\\.(" + extensions + ")$";
        }

        this.extRe = new RegExp(re, "gi");
    }

    /**
     * @param {string} filename
     * @returns {RegExpMatchArray | null}
     */
    supportsFile(filename) {
        return filename.match(this.extRe);
    }
}

// todo firstlinematch
var supportedModes = {
    ABAP:        ["abap"],
    ABC:         ["abc"],
    ActionScript:["as"],
    ADA:         ["ada|adb"],
    Alda:        ["alda"],
    Apache_Conf: ["^htaccess|^htgroups|^htpasswd|^conf|htaccess|htgroups|htpasswd"],
    Apex:        ["apex|cls|trigger|tgr"],
    AQL:         ["aql"],
    AsciiDoc:    ["asciidoc|adoc"],
    ASL:         ["dsl|asl|asl.json"],
    Assembly_ARM32:["s"],
    Assembly_x86:["asm|a"],
    Astro:       ["astro"],
    AutoHotKey:  ["ahk"],
    BatchFile:   ["bat|cmd"],
    Basic:       ["bas|bak"],
    BibTeX:      ["bib"],
    C_Cpp:       ["cpp|c|cc|cxx|h|hh|hpp|ino"],
    C9Search:    ["c9search_results"],
    Cirru:       ["cirru|cr"],
    Clojure:     ["clj|cljs"],
    Cobol:       ["CBL|COB"],
    coffee:      ["coffee|cf|cson|^Cakefile"],
    ColdFusion:  ["cfm|cfc"],
    Crystal:     ["cr"],
    CSharp:      ["cs"],
    Csound_Document: ["csd"],
    Csound_Orchestra: ["orc"],
    Csound_Score: ["sco"],
    CSS:         ["css"],
    CSV:         ["csv"],
    Curly:       ["curly"],
    Cuttlefish:  ["conf"],
    D:           ["d|di"],
    Dart:        ["dart"],
    Diff:        ["diff|patch"],
    Django:      ["djt|html.djt|dj.html|djhtml"],
    Dockerfile:  ["^Dockerfile"],
    Dot:         ["dot"],
    Drools:      ["drl"],
    Edifact:     ["edi"],
    Eiffel:      ["e|ge"],
    EJS:         ["ejs"],
    Elixir:      ["ex|exs"],
    Elm:         ["elm"],
    Erlang:      ["erl|hrl"],
    Flix:        ["flix"],
    Forth:       ["frt|fs|ldr|fth|4th"],
    Fortran:     ["f|f90"],
    FSharp:      ["fsi|fs|ml|mli|fsx|fsscript"],
    FSL:         ["fsl"],
    FTL:         ["ftl"],
    Gcode:       ["gcode"],
    Gherkin:     ["feature"],
    Gitignore:   ["^.gitignore"],
    Glsl:        ["glsl|frag|vert"],
    Gobstones:   ["gbs"],
    golang:      ["go"],
    GraphQLSchema: ["gql"],
    Groovy:      ["groovy"],
    HAML:        ["haml"],
    Handlebars:  ["hbs|handlebars|tpl|mustache"],
    Haskell:     ["hs"],
    Haskell_Cabal: ["cabal"],
    haXe:        ["hx"],
    Hjson:       ["hjson"],
    HTML: ["html|htm|xhtml|we|wpy"],
    HTML_Elixir: ["eex|html.eex"],
    HTML_Ruby:   ["erb|rhtml|html.erb"],
    INI:         ["ini|conf|cfg|prefs"],
    Io:          ["io"],
    Ion:         ["ion"],
    Jack:        ["jack"],
    Jade:        ["jade|pug"],
    Java:        ["java"],
    JavaScript:  ["js|jsm|cjs|mjs"],
    JEXL:        ["jexl"],
    JSON:        ["json"],
    JSON5:       ["json5"],
    JSONiq:      ["jq"],
    JSP:         ["jsp"],
    JSSM:        ["jssm|jssm_state"],
    JSX:         ["jsx"],
    Julia:       ["jl"],
    Kotlin:      ["kt|kts"],
    LaTeX:       ["tex|latex|ltx|bib"],
    Latte:       ["latte"],
    LESS:        ["less"],
    Liquid:      ["liquid"],
    Lisp:        ["lisp"],
    LiveScript:  ["ls"],
    Log:         ["log"],
    LogiQL:      ["logic|lql"],
    Logtalk:     ["lgt"],
    LSL:         ["lsl"],
    Lua:         ["lua"],
    LuaPage:     ["lp"],
    Lucene:      ["lucene"],
    Makefile:    ["^Makefile|^GNUmakefile|^makefile|^OCamlMakefile|make"],
    Markdown:    ["md|markdown"],
    Mask:        ["mask"],
    MATLAB:      ["matlab"],
    Maze:        ["mz"],
    MediaWiki:   ["wiki|mediawiki"],
    MEL:         ["mel"],
    MIPS:        ["s|asm"],
    MIXAL:       ["mixal"],
    MUSHCode:    ["mc|mush"],
    MySQL:       ["mysql"],
    Nasal:       ["nas"],
    Nginx:       ["nginx|conf"],
    Nim:         ["nim"],
    Nix:         ["nix"],
    NSIS:        ["nsi|nsh"],
    Nunjucks:    ["nunjucks|nunjs|nj|njk"],
    ObjectiveC:  ["m|mm"],
    OCaml:       ["ml|mli"],
    Odin:        ["odin"],
    PartiQL:     ["partiql|pql"],
    Pascal:      ["pas|p"],
    Perl:        ["pl|pm"],
    pgSQL:       ["pgsql"],
    PHP:         ["php|inc|phtml|shtml|php3|php4|php5|phps|phpt|aw|ctp|module"],
    PHP_Laravel_blade: ["blade.php"],
    Pig:         ["pig"],
    PLSQL:       ["plsql"],
    Powershell:  ["ps1"],
    Praat:       ["praat|praatscript|psc|proc"],
    Prisma:      ["prisma"],
    Prolog:      ["plg|prolog"],
    Properties:  ["properties"],
    Protobuf:    ["proto"],
    PRQL:        ["prql"],
    Puppet:      ["epp|pp"],
    Python:      ["py"],
    QML:         ["qml"],
    R:           ["r"],
    Raku:        ["raku|rakumod|rakutest|p6|pl6|pm6"],
    Razor:       ["cshtml|asp"],
    RDoc:        ["Rd"],
    Red:         ["red|reds"],
    RHTML:       ["Rhtml"],
    Robot:       ["robot|resource"],
    RST:         ["rst"],
    Ruby:        ["rb|ru|gemspec|rake|^Guardfile|^Rakefile|^Gemfile"],
    Rust:        ["rs"],
    SaC:         ["sac"],
    SASS:        ["sass"],
    SCAD:        ["scad"],
    Scala:       ["scala|sbt"],
    Scheme:      ["scm|sm|rkt|oak|scheme"],
    Scrypt:      ["scrypt"],
    SCSS:        ["scss"],
    SH:          ["sh|bash|^.bashrc"],
    SJS:         ["sjs"],
    Slim:        ["slim|skim"],
    Smarty:      ["smarty|tpl"],
    Smithy:      ["smithy"],
    snippets:    ["snippets"],
    Soy_Template:["soy"],
    Space:       ["space"],
    SPARQL:      ["rq"],
    SQL:         ["sql"],
    SQLServer:   ["sqlserver"],
    Stylus:      ["styl|stylus"],
    SVG:         ["svg"],
    Swift:       ["swift"],
    Tcl:         ["tcl"],
    Terraform:   ["tf", "tfvars", "terragrunt"],
    Tex:         ["tex"],
    Text:        ["txt"],
    Textile:     ["textile"],
    Toml:        ["toml"],
    TSV:         ["tsv"],
    TSX:         ["tsx"],
    Turtle:      ["ttl"],
    Twig:        ["twig|swig"],
    Typescript:  ["ts|mts|cts|typescript|str"],
    Vala:        ["vala"],
    VBScript:    ["vbs|vb"],
    Velocity:    ["vm"],
    Verilog:     ["v|vh|sv|svh"],
    VHDL:        ["vhd|vhdl"],
    Visualforce: ["vfp|component|page"],
    Vue: ["vue"],
    Wollok:      ["wlk|wpgm|wtest"],
    XML:         ["xml|rdf|rss|wsdl|xslt|atom|mathml|mml|xul|xbl|xaml"],
    XQuery:      ["xq"],
    YAML:        ["yaml|yml"],
    Zeek:        ["zeek|bro"],
    Zig:         ["zig"]
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

/**
 * @type {Record<string, Mode>}
 */
var modesByName = {};
for (var name in supportedModes) {
    var data = supportedModes[name];
    var displayName = (nameOverrides[name] || name).replace(/_/g, " ");
    var filename = name.toLowerCase();
    var mode = new Mode(filename, displayName, data[0]);
    modesByName[filename] = mode;
    modes.push(mode);
}

module.exports = {
    getModeForPath: getModeForPath,
    modes: modes,
    modesByName: modesByName
};


/***/ }),

/***/ 86613:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/**
 * @typedef {import("../editor").Editor} Editor
 */

__webpack_require__(24809);

var dom = __webpack_require__(71435);
var oop = __webpack_require__(2645);
var config = __webpack_require__(76321);
var EventEmitter = (__webpack_require__(87366).EventEmitter);
var buildDom = dom.buildDom;

var modelist = __webpack_require__(91772);
var themelist = __webpack_require__(91494);

var themes = { Bright: [], Dark: [] };
themelist.themes.forEach(function(x) {
    themes[x.isDark ? "Dark" : "Bright"].push({ caption: x.caption, value: x.theme });
});

var modes = modelist.modes.map(function(x){ 
    return { caption: x.caption, value: x.mode }; 
});


var optionGroups = {
    Main: {
        Mode: {
            path: "mode",
            type: "select",
            items: modes
        },
        Theme: {
            path: "theme",
            type: "select",
            items: themes
        },
        "Keybinding": {
            type: "buttonBar",
            path: "keyboardHandler",
            items: [
                { caption : "Ace", value : null },
                { caption : "Vim", value : "ace/keyboard/vim" },
                { caption : "Emacs", value : "ace/keyboard/emacs" },
                { caption : "Sublime", value : "ace/keyboard/sublime" },
                { caption : "VSCode", value : "ace/keyboard/vscode" }
            ]
        },
        "Font Size": {
            path: "fontSize",
            type: "number",
            defaultValue: 12,
            defaults: [
                {caption: "12px", value: 12},
                {caption: "24px", value: 24}
            ]
        },
        "Soft Wrap": {
            type: "buttonBar",
            path: "wrap",
            items: [
               { caption : "Off",  value : "off" },
               { caption : "View", value : "free" },
               { caption : "margin", value : "printMargin" },
               { caption : "40",   value : "40" }
            ]
        },
        "Cursor Style": {
            path: "cursorStyle",
            items: [
               { caption : "Ace",    value : "ace" },
               { caption : "Slim",   value : "slim" },
               { caption : "Smooth", value : "smooth" },
               { caption : "Smooth And Slim", value : "smooth slim" },
               { caption : "Wide",   value : "wide" }
            ]
        },
        "Folding": {
            path: "foldStyle",
            items: [
                { caption : "Manual", value : "manual" },
                { caption : "Mark begin", value : "markbegin" },
                { caption : "Mark begin and end", value : "markbeginend" }
            ]
        },
        "Soft Tabs": [{
            path: "useSoftTabs"
        }, {
            ariaLabel: "Tab Size",
            path: "tabSize",
            type: "number",
            values: [2, 3, 4, 8, 16]
        }],
        "Overscroll": {
            type: "buttonBar",
            path: "scrollPastEnd",
            items: [
               { caption : "None",  value : 0 },
               { caption : "Half",   value : 0.5 },
               { caption : "Full",   value : 1 }
            ]
        }
    },
    More: {
        "Atomic soft tabs": {
            path: "navigateWithinSoftTabs"
        },
        "Enable Behaviours": {
            path: "behavioursEnabled"
        },
        "Wrap with quotes": {
            path: "wrapBehavioursEnabled"
        },
        "Enable Auto Indent": {
            path: "enableAutoIndent"
        },
        "Full Line Selection": {
            type: "checkbox",
            values: "text|line",
            path: "selectionStyle"
        },
        "Highlight Active Line": {
            path: "highlightActiveLine"
        },
        "Show Invisibles": {
            path: "showInvisibles"
        },
        "Show Indent Guides": {
            path: "displayIndentGuides"
        },
        "Highlight Indent Guides": {
            path: "highlightIndentGuides"
        },
        "Persistent HScrollbar": {
            path: "hScrollBarAlwaysVisible"
        },
        "Persistent VScrollbar": {
            path: "vScrollBarAlwaysVisible"
        },
        "Animate scrolling": {
            path: "animatedScroll"
        },
        "Show Gutter": {
            path: "showGutter"
        },
        "Show Line Numbers": {
            path: "showLineNumbers"
        },
        "Relative Line Numbers": {
            path: "relativeLineNumbers"
        },
        "Fixed Gutter Width": {
            path: "fixedWidthGutter"
        },
        "Show Print Margin": [{
            path: "showPrintMargin"
        }, {
            ariaLabel: "Print Margin",
            type: "number",
            path: "printMarginColumn"
        }],
        "Indented Soft Wrap": {
            path: "indentedSoftWrap"
        },
        "Highlight selected word": {
            path: "highlightSelectedWord"
        },
        "Fade Fold Widgets": {
            path: "fadeFoldWidgets"
        },
        "Use textarea for IME": {
            path: "useTextareaForIME"
        },
        "Merge Undo Deltas": {
            path: "mergeUndoDeltas",
            items: [
               { caption : "Always",  value : "always" },
               { caption : "Never",   value : "false" },
               { caption : "Timed",   value : "true" }
            ]
        },
        "Elastic Tabstops": {
            path: "useElasticTabstops"
        },
        "Incremental Search": {
            path: "useIncrementalSearch"
        },
        "Read-only": {
            path: "readOnly"
        },
        "Copy without selection": {
            path: "copyWithEmptySelection"
        },
        "Live Autocompletion": {
            path: "enableLiveAutocompletion"
        },
        "Custom scrollbar": {
            path: "customScrollbar"
        },
        "Use SVG gutter icons": {
            path: "useSvgGutterIcons"
        },
        "Annotations for folded lines": {
            path: "showFoldedAnnotations"
        },
        "Keyboard Accessibility Mode": {
            path: "enableKeyboardAccessibility"
        },
        "Gutter tooltip follows mouse": {
            path: "tooltipFollowsMouse",
            defaultValue: true
        }
    }
};

class OptionPanel {
    /**
     * 
     * @param {Editor} editor
     * @param {HTMLElement} [element]
     */
    constructor(editor, element) {
        this.editor = editor;
        this.container = element || document.createElement("div");
        this.groups = [];
        this.options = {};
    }
    
    add(config) {
        if (config.Main)
            oop.mixin(optionGroups.Main, config.Main);
        if (config.More)
            oop.mixin(optionGroups.More, config.More);
    }

  
    render() {
        this.container.innerHTML = "";
        buildDom(["table", {role: "presentation", id: "controls"}, 
            this.renderOptionGroup(optionGroups.Main),
            ["tr", null, ["td", {colspan: 2},
                ["table", {role: "presentation", id: "more-controls"}, 
                    this.renderOptionGroup(optionGroups.More)
                ]
            ]],
            ["tr", null, ["td", {colspan: 2}, "version " + config.version]]
        ], this.container);
    }
    
    renderOptionGroup(group) {
        return Object.keys(group).map(function(key, i) {
            var item = group[key];
            if (!item.position)
                item.position = i / 10000;
            if (!item.label)
                item.label = key;
            return item;
        }).sort(function(a, b) {
            return a.position - b.position;
        }).map(function(item) {
            return this.renderOption(item.label, item);
        }, this);
    }

    /**
     * @param {string} key
     * @param {Object} option
     */
    renderOptionControl(key, option) {
        var self = this;
        if (Array.isArray(option)) {
            return option.map(function(x) {
                return self.renderOptionControl(key, x);
            });
        }
        /**@type {any}*/
        var control;
        
        var value = self.getOption(option);
        
        if (option.values && option.type != "checkbox") {
            if (typeof option.values == "string")
                option.values = option.values.split("|");
            option.items = option.values.map(function(v) {
                return { value: v, name: v };
            });
        }
        
        if (option.type == "buttonBar") {
            control = ["div", {role: "group", "aria-labelledby": option.path + "-label"}, option.items.map(function(item) {
                return ["button", { 
                    value: item.value, 
                    ace_selected_button: value == item.value, 
                    'aria-pressed': value == item.value, 
                    onclick: function() {
                        self.setOption(option, item.value);
                        var nodes = this.parentNode.querySelectorAll("[ace_selected_button]");
                        for (var i = 0; i < nodes.length; i++) {
                            nodes[i].removeAttribute("ace_selected_button");
                            nodes[i].setAttribute("aria-pressed", false);
                        }
                        this.setAttribute("ace_selected_button", true);
                        this.setAttribute("aria-pressed", true);
                    } 
                }, item.desc || item.caption || item.name];
            })];
        } else if (option.type == "number") {
            control = ["input", {type: "number", value: value || option.defaultValue, style:"width:3em", oninput: function() {
                self.setOption(option, parseInt(this.value));
            }}];
            if (option.ariaLabel) {
                control[1]["aria-label"] = option.ariaLabel;
            } else {
                control[1].id = key;
            }
            if (option.defaults) {
                control = [control, option.defaults.map(function(item) {
                    return ["button", {onclick: function() {
                        var input = this.parentNode.firstChild;
                        input.value = item.value;
                        input.oninput();
                    }}, item.caption];
                })];
            }
        } else if (option.items) {
            var buildItems = function(items) {
                return items.map(function(item) {
                    return ["option", { value: item.value || item.name }, item.desc || item.caption || item.name];
                });
            };
            
            var items = Array.isArray(option.items) 
                ? buildItems(option.items)
                : Object.keys(option.items).map(function(key) {
                    return ["optgroup", {"label": key}, buildItems(option.items[key])];
                });
            control = ["select", { id: key, value: value, onchange: function() {
                self.setOption(option, this.value);
            } }, items];
        } else {
            if (typeof option.values == "string")
                option.values = option.values.split("|");
            if (option.values) value = value == option.values[1];
            control = ["input", { type: "checkbox", id: key, checked: value || null, onchange: function() {
                var value = this.checked;
                if (option.values) value = option.values[value ? 1 : 0];
                self.setOption(option, value);
            }}];
            if (option.type == "checkedNumber") {
                control = [control, []];
            }
        }
        return control;
    }

    /**
     * 
     * @param key
     * @param option
     */
    renderOption(key, option) {
        if (option.path && !option.onchange && !this.editor.$options[option.path])
            return;
        var path = Array.isArray(option) ? option[0].path : option.path;
        this.options[path] = option;
        var safeKey = "-" + path;
        var safeId = path + "-label";
        var control = this.renderOptionControl(safeKey, option);
        return ["tr", {class: "ace_optionsMenuEntry"}, ["td",
            ["label", {for: safeKey, id: safeId}, key]
        ], ["td", control]];
    }

    /**
     * @param {string | number | Object} option
     * @param {string | number | boolean} value
     */
    setOption(option, value) {
        if (typeof option == "string")
            option = this.options[option];
        if (value == "false") value = false;
        if (value == "true") value = true;
        if (value == "null") value = null;
        if (value == "undefined") value = undefined;
        if (typeof value == "string" && parseFloat(value).toString() == value)
            value = parseFloat(value);
        if (option.onchange)
            option.onchange(value);
        else if (option.path)
            this.editor.setOption(option.path, value);
        this._signal("setOption", {name: option.path, value: value});
    }
    
    getOption(option) {
        if (option.getValue)
            return option.getValue();
        return this.editor.getOption(option.path);
    }
}
oop.implement(OptionPanel.prototype, EventEmitter);

exports.OptionPanel = OptionPanel;


/***/ }),

/***/ 11214:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/*jslint indent: 4, maxerr: 50, white: true, browser: true, vars: true*/
/*global define, require */

/**
 * Show Settings Menu
 * @fileOverview Show Settings Menu <br />
 * Displays an interactive settings menu mostly generated on the fly based on
 *  the current state of the editor.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 */


var OptionPanel = (__webpack_require__(86613).OptionPanel);
var overlayPage = (__webpack_require__(24809).overlayPage);

/**
 * This displays the settings menu if it is not already being shown.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {import("../editor").Editor} editor An instance of the ace editor.
 */
function showSettingsMenu(editor) {
    // show if the menu isn't open already.
    if (!document.getElementById('ace_settingsmenu')) {
        var options = new OptionPanel(editor);
        options.render();
        options.container.id = "ace_settingsmenu";
        overlayPage(editor, options.container);
        // @ts-ignore
        options.container.querySelector("select,input,button,checkbox").focus();
    }
}

/**
 * Initializes the settings menu extension. It adds the showSettingsMenu
 *  method to the given editor object and adds the showSettingsMenu command
 *  to the editor with appropriate keyboard shortcuts.
 */
module.exports.init = function() {
    var Editor = (__webpack_require__(27258).Editor);
    Editor.prototype.showSettingsMenu = function() {
        showSettingsMenu(this);
    };
};


/***/ }),

/***/ 91494:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * Generates a list of themes available when ace was built.
 * @fileOverview Generates a list of themes available when ace was built.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 */



/**
 * @typedef {Object} Theme
 * @property {string} caption - The display caption of the theme.
 * @property {string} theme   - The path or identifier for the ACE theme.
 * @property {boolean} isDark - Indicates whether the theme is dark or light.
 * @property {string} name    - The normalized name used as the key.
 */

var themeData = [
    ["Chrome"         ],
    ["Clouds"         ],
    ["Crimson Editor" ],
    ["Dawn"           ],
    ["Dreamweaver"    ],
    ["Eclipse"        ],
    ["GitHub Light Default" ],
    ["GitHub (Legacy)"      ,"github"                  , "light"],
    ["IPlastic"       ],
    ["Solarized Light"],
    ["TextMate"       ],
    ["Tomorrow"       ],
    ["XCode"          ],
    ["Kuroir"],
    ["KatzenMilch"],
    ["SQL Server"           ,"sqlserver"               , "light"],
    ["CloudEditor"          ,"cloud_editor"            , "light"],
    ["Ambiance"             ,"ambiance"                ,  "dark"],
    ["Chaos"                ,"chaos"                   ,  "dark"],
    ["Clouds Midnight"      ,"clouds_midnight"         ,  "dark"],
    ["Dracula"              ,""                        ,  "dark"],
    ["Cobalt"               ,"cobalt"                  ,  "dark"],
    ["Gruvbox"              ,"gruvbox"                 ,  "dark"],
    ["Green on Black"       ,"gob"                     ,  "dark"],
    ["idle Fingers"         ,"idle_fingers"            ,  "dark"],
    ["krTheme"              ,"kr_theme"                ,  "dark"],
    ["Merbivore"            ,"merbivore"               ,  "dark"],
    ["Merbivore Soft"       ,"merbivore_soft"          ,  "dark"],
    ["Mono Industrial"      ,"mono_industrial"         ,  "dark"],
    ["Monokai"              ,"monokai"                 ,  "dark"],
    ["Nord Dark"            ,"nord_dark"               ,  "dark"],
    ["One Dark"             ,"one_dark"                ,  "dark"],
    ["Pastel on dark"       ,"pastel_on_dark"          ,  "dark"],
    ["Solarized Dark"       ,"solarized_dark"          ,  "dark"],
    ["Terminal"             ,"terminal"                ,  "dark"],
    ["Tomorrow Night"       ,"tomorrow_night"          ,  "dark"],
    ["Tomorrow Night Blue"  ,"tomorrow_night_blue"     ,  "dark"],
    ["Tomorrow Night Bright","tomorrow_night_bright"   ,  "dark"],
    ["Tomorrow Night 80s"   ,"tomorrow_night_eighties" ,  "dark"],
    ["Twilight"             ,"twilight"                ,  "dark"],
    ["Vibrant Ink"          ,"vibrant_ink"             ,  "dark"],
    ["GitHub Dark"          ,"github_dark"             ,  "dark"],
    ["CloudEditor Dark"     ,"cloud_editor_dark"       ,  "dark"]
];

/**
 * @type {Object<string, Theme>}
 */
exports.themesByName = {};

/**
 * An array containing information about available themes.
 * @type {Theme[]}
 */
exports.themes = themeData.map(function(data) {
    var name = data[1] || data[0].replace(/ /g, "_").toLowerCase();
    var theme = {
        caption: data[0],
        theme: "ace/theme/" + name,
        isDark: data[2] == "dark",
        name: name
    };
    exports.themesByName[name] = theme;
    return theme;
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvbWVudV90b29scy9vdmVybGF5X3BhZ2UuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L21lbnVfdG9vbHMvc2V0dGluZ3NfbWVudS5jc3MuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L21vZGVsaXN0LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9vcHRpb25zLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9zZXR0aW5nc19tZW51LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC90aGVtZWxpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypqc2xpbnQgaW5kZW50OiA0LCBtYXhlcnI6IDUwLCB3aGl0ZTogdHJ1ZSwgYnJvd3NlcjogdHJ1ZSwgdmFyczogdHJ1ZSovXG4vKmdsb2JhbCBkZWZpbmUsIHJlcXVpcmUgKi9cblxuLyoqXG4gKiBPdmVybGF5IFBhZ2VcbiAqIEBmaWxlT3ZlcnZpZXcgT3ZlcmxheSBQYWdlIDxiciAvPlxuICogR2VuZXJhdGVzIGFuIG92ZXJsYXkgZm9yIGRpc3BsYXlpbmcgbWVudXMuIFRoZSBvdmVybGF5IGlzIGFuIGFic29sdXRlbHlcbiAqICBwb3NpdGlvbmVkIGRpdi5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi8uLi9saWIvZG9tXCIpO1xudmFyIGNzc1RleHQgPSByZXF1aXJlKFwiLi9zZXR0aW5nc19tZW51LmNzc1wiKTtcbmRvbS5pbXBvcnRDc3NTdHJpbmcoY3NzVGV4dCwgXCJzZXR0aW5nc19tZW51LmNzc1wiLCBmYWxzZSk7XG5cbi8qKlxuICogR2VuZXJhdGVzIGFuIG92ZXJsYXkgZm9yIGRpc3BsYXlpbmcgbWVudXMuIFRoZSBvdmVybGF5IGlzIGFuIGFic29sdXRlbHlcbiAqICBwb3NpdGlvbmVkIGRpdi5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAcGFyYW0gZWRpdG9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZW50RWxlbWVudCBBbnkgZWxlbWVudCB3aGljaCBtYXkgYmUgcHJlc2VudGVkIGluc2lkZVxuICogIGEgZGl2LlxuICogQHBhcmFtIFtjYWxsYmFja11cbiAqL1xubW9kdWxlLmV4cG9ydHMub3ZlcmxheVBhZ2UgPSBmdW5jdGlvbiBvdmVybGF5UGFnZShlZGl0b3IsIGNvbnRlbnRFbGVtZW50LCBjYWxsYmFjaykge1xuICAgIHZhciBjbG9zZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgaWdub3JlRm9jdXNPdXQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIGRvY3VtZW50RXNjTGlzdGVuZXIoZSkge1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICBpZiAoIWNsb3NlcikgcmV0dXJuO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZG9jdW1lbnRFc2NMaXN0ZW5lcik7XG4gICAgICAgIGNsb3Nlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNsb3Nlcik7XG4gICAgICAgIGlmIChlZGl0b3IpIHtcbiAgICAgICAgICAgIGVkaXRvci5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIGNsb3NlciA9IG51bGw7XG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgIC8qKlxuICAgICAqIERlZmluZXMgd2hldGhlciBvdmVybGF5IGlzIGNsb3NlZCB3aGVuIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgaXQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBpZ25vcmUgICAgICBJZiBzZXQgdG8gdHJ1ZSBvdmVybGF5IHN0YXlzIG9wZW4gd2hlbiBmb2N1cyBtb3ZlcyB0byBhbm90aGVyIHBhcnQgb2YgdGhlIGVkaXRvci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRJZ25vcmVGb2N1c091dChpZ25vcmUpIHtcbiAgICAgICAgaWdub3JlRm9jdXNPdXQgPSBpZ25vcmU7XG4gICAgICAgIGlmIChpZ25vcmUpIHtcbiAgICAgICAgICAgIGNsb3Nlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgICAgICBjb250ZW50RWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZXIuc3R5bGUuY3NzVGV4dCA9ICdtYXJnaW46IDA7IHBhZGRpbmc6IDA7ICcgK1xuICAgICAgICAncG9zaXRpb246IGZpeGVkOyB0b3A6MDsgYm90dG9tOjA7IGxlZnQ6MDsgcmlnaHQ6MDsnICtcbiAgICAgICAgJ3otaW5kZXg6IDk5OTA7ICcgK1xuICAgICAgICAoZWRpdG9yID8gJ2JhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTsnIDogJycpO1xuICAgIGNsb3Nlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCFpZ25vcmVGb2N1c091dCkge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGNsaWNrIGNsb3NlciBpZiBlc2Mga2V5IGlzIHByZXNzZWRcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZG9jdW1lbnRFc2NMaXN0ZW5lcik7XG5cbiAgICBjb250ZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICBjbG9zZXIuYXBwZW5kQ2hpbGQoY29udGVudEVsZW1lbnQpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2xvc2VyKTtcbiAgICBpZiAoZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5ibHVyKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGNsb3NlOiBjbG9zZSxcbiAgICAgICAgc2V0SWdub3JlRm9jdXNPdXQ6IHNldElnbm9yZUZvY3VzT3V0XG4gICAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGAjYWNlX3NldHRpbmdzbWVudSwgI2tic2hvcnRjdXRtZW51IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjdGN0Y3O1xuICAgIGNvbG9yOiBibGFjaztcbiAgICBib3gtc2hhZG93OiAtNXB4IDRweCA1cHggcmdiYSgxMjYsIDEyNiwgMTI2LCAwLjU1KTtcbiAgICBwYWRkaW5nOiAxZW0gMC41ZW0gMmVtIDFlbTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbWFyZ2luOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICByaWdodDogMDtcbiAgICB0b3A6IDA7XG4gICAgei1pbmRleDogOTk5MTtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbi5hY2VfZGFyayAjYWNlX3NldHRpbmdzbWVudSwgLmFjZV9kYXJrICNrYnNob3J0Y3V0bWVudSB7XG4gICAgYm94LXNoYWRvdzogLTIwcHggMTBweCAyNXB4IHJnYmEoMTI2LCAxMjYsIDEyNiwgMC4yNSk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO1xuICAgIGNvbG9yOiBibGFjaztcbn1cblxuLmFjZV9vcHRpb25zTWVudUVudHJ5OmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEwMCwgMTAwLCAxMDAsIDAuMSk7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3Ncbn1cblxuLmFjZV9jbG9zZUJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNDUsIDE0NiwgMTQ2LCAwLjUpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNGNDhBOEE7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIHBhZGRpbmc6IDdweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IC04cHg7XG4gICAgdG9wOiAtOHB4O1xuICAgIHotaW5kZXg6IDEwMDAwMDtcbn1cbi5hY2VfY2xvc2VCdXR0b257XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNDUsIDE0NiwgMTQ2LCAwLjkpO1xufVxuLmFjZV9vcHRpb25zTWVudUtleSB7XG4gICAgY29sb3I6IGRhcmtzbGF0ZWJsdWU7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4uYWNlX29wdGlvbnNNZW51Q29tbWFuZCB7XG4gICAgY29sb3I6IGRhcmtjeWFuO1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG4uYWNlX29wdGlvbnNNZW51RW50cnkgaW5wdXQsIC5hY2Vfb3B0aW9uc01lbnVFbnRyeSBidXR0b24ge1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG5cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeSBidXR0b25bYWNlX3NlbGVjdGVkX2J1dHRvbj10cnVlXSB7XG4gICAgYmFja2dyb3VuZDogI2U3ZTdlNztcbiAgICBib3gtc2hhZG93OiAxcHggMHB4IDJweCAwcHggI2FkYWRhZCBpbnNldDtcbiAgICBib3JkZXItY29sb3I6ICNhZGFkYWQ7XG59XG4uYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uIHtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gICAgbWFyZ2luOiAwcHg7XG59XG4uYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uOmhvdmVye1xuICAgIGJhY2tncm91bmQ6ICNmMGYwZjA7XG59YDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIEB0eXBlIHtNb2RlW119XG4gKi9cbnZhciBtb2RlcyA9IFtdO1xuLyoqXG4gKiBTdWdnZXN0cyBhIG1vZGUgYmFzZWQgb24gdGhlIGZpbGUgZXh0ZW5zaW9uIHByZXNlbnQgaW4gdGhlIGdpdmVuIHBhdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIHRoZSBmaWxlXG4gKiBAcmV0dXJucyB7TW9kZX0gUmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGVcbiAqICBzdWdnZXN0ZWQgbW9kZS5cbiAqL1xuZnVuY3Rpb24gZ2V0TW9kZUZvclBhdGgocGF0aCkge1xuICAgIHZhciBtb2RlID0gbW9kZXNCeU5hbWUudGV4dDtcbiAgICB2YXIgZmlsZU5hbWUgPSBwYXRoLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChtb2Rlc1tpXS5zdXBwb3J0c0ZpbGUoZmlsZU5hbWUpKSB7XG4gICAgICAgICAgICBtb2RlID0gbW9kZXNbaV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbW9kZTtcbn1cblxuY2xhc3MgTW9kZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2FwdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBleHRlbnNpb25zXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgY2FwdGlvbiwgZXh0ZW5zaW9ucykge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNhcHRpb24gPSBjYXB0aW9uO1xuICAgICAgICB0aGlzLm1vZGUgPSBcImFjZS9tb2RlL1wiICsgbmFtZTtcbiAgICAgICAgdGhpcy5leHRlbnNpb25zID0gZXh0ZW5zaW9ucztcbiAgICAgICAgdmFyIHJlO1xuICAgICAgICBpZiAoL1xcXi8udGVzdChleHRlbnNpb25zKSkge1xuICAgICAgICAgICAgcmUgPSBleHRlbnNpb25zLnJlcGxhY2UoL1xcfChcXF4pPy9nLCBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIiR8XCIgKyAoYiA/IFwiXlwiIDogXCJeLipcXFxcLlwiKTtcbiAgICAgICAgICAgIH0pICsgXCIkXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZSA9IFwiXFxcXC4oXCIgKyBleHRlbnNpb25zICsgXCIpJFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5leHRSZSA9IG5ldyBSZWdFeHAocmUsIFwiZ2lcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVuYW1lXG4gICAgICogQHJldHVybnMge1JlZ0V4cE1hdGNoQXJyYXkgfCBudWxsfVxuICAgICAqL1xuICAgIHN1cHBvcnRzRmlsZShmaWxlbmFtZSkge1xuICAgICAgICByZXR1cm4gZmlsZW5hbWUubWF0Y2godGhpcy5leHRSZSk7XG4gICAgfVxufVxuXG4vLyB0b2RvIGZpcnN0bGluZW1hdGNoXG52YXIgc3VwcG9ydGVkTW9kZXMgPSB7XG4gICAgQUJBUDogICAgICAgIFtcImFiYXBcIl0sXG4gICAgQUJDOiAgICAgICAgIFtcImFiY1wiXSxcbiAgICBBY3Rpb25TY3JpcHQ6W1wiYXNcIl0sXG4gICAgQURBOiAgICAgICAgIFtcImFkYXxhZGJcIl0sXG4gICAgQWxkYTogICAgICAgIFtcImFsZGFcIl0sXG4gICAgQXBhY2hlX0NvbmY6IFtcIl5odGFjY2Vzc3xeaHRncm91cHN8Xmh0cGFzc3dkfF5jb25mfGh0YWNjZXNzfGh0Z3JvdXBzfGh0cGFzc3dkXCJdLFxuICAgIEFwZXg6ICAgICAgICBbXCJhcGV4fGNsc3x0cmlnZ2VyfHRnclwiXSxcbiAgICBBUUw6ICAgICAgICAgW1wiYXFsXCJdLFxuICAgIEFzY2lpRG9jOiAgICBbXCJhc2NpaWRvY3xhZG9jXCJdLFxuICAgIEFTTDogICAgICAgICBbXCJkc2x8YXNsfGFzbC5qc29uXCJdLFxuICAgIEFzc2VtYmx5X0FSTTMyOltcInNcIl0sXG4gICAgQXNzZW1ibHlfeDg2OltcImFzbXxhXCJdLFxuICAgIEFzdHJvOiAgICAgICBbXCJhc3Ryb1wiXSxcbiAgICBBdXRvSG90S2V5OiAgW1wiYWhrXCJdLFxuICAgIEJhdGNoRmlsZTogICBbXCJiYXR8Y21kXCJdLFxuICAgIEJhc2ljOiAgICAgICBbXCJiYXN8YmFrXCJdLFxuICAgIEJpYlRlWDogICAgICBbXCJiaWJcIl0sXG4gICAgQ19DcHA6ICAgICAgIFtcImNwcHxjfGNjfGN4eHxofGhofGhwcHxpbm9cIl0sXG4gICAgQzlTZWFyY2g6ICAgIFtcImM5c2VhcmNoX3Jlc3VsdHNcIl0sXG4gICAgQ2lycnU6ICAgICAgIFtcImNpcnJ1fGNyXCJdLFxuICAgIENsb2p1cmU6ICAgICBbXCJjbGp8Y2xqc1wiXSxcbiAgICBDb2JvbDogICAgICAgW1wiQ0JMfENPQlwiXSxcbiAgICBjb2ZmZWU6ICAgICAgW1wiY29mZmVlfGNmfGNzb258XkNha2VmaWxlXCJdLFxuICAgIENvbGRGdXNpb246ICBbXCJjZm18Y2ZjXCJdLFxuICAgIENyeXN0YWw6ICAgICBbXCJjclwiXSxcbiAgICBDU2hhcnA6ICAgICAgW1wiY3NcIl0sXG4gICAgQ3NvdW5kX0RvY3VtZW50OiBbXCJjc2RcIl0sXG4gICAgQ3NvdW5kX09yY2hlc3RyYTogW1wib3JjXCJdLFxuICAgIENzb3VuZF9TY29yZTogW1wic2NvXCJdLFxuICAgIENTUzogICAgICAgICBbXCJjc3NcIl0sXG4gICAgQ1NWOiAgICAgICAgIFtcImNzdlwiXSxcbiAgICBDdXJseTogICAgICAgW1wiY3VybHlcIl0sXG4gICAgQ3V0dGxlZmlzaDogIFtcImNvbmZcIl0sXG4gICAgRDogICAgICAgICAgIFtcImR8ZGlcIl0sXG4gICAgRGFydDogICAgICAgIFtcImRhcnRcIl0sXG4gICAgRGlmZjogICAgICAgIFtcImRpZmZ8cGF0Y2hcIl0sXG4gICAgRGphbmdvOiAgICAgIFtcImRqdHxodG1sLmRqdHxkai5odG1sfGRqaHRtbFwiXSxcbiAgICBEb2NrZXJmaWxlOiAgW1wiXkRvY2tlcmZpbGVcIl0sXG4gICAgRG90OiAgICAgICAgIFtcImRvdFwiXSxcbiAgICBEcm9vbHM6ICAgICAgW1wiZHJsXCJdLFxuICAgIEVkaWZhY3Q6ICAgICBbXCJlZGlcIl0sXG4gICAgRWlmZmVsOiAgICAgIFtcImV8Z2VcIl0sXG4gICAgRUpTOiAgICAgICAgIFtcImVqc1wiXSxcbiAgICBFbGl4aXI6ICAgICAgW1wiZXh8ZXhzXCJdLFxuICAgIEVsbTogICAgICAgICBbXCJlbG1cIl0sXG4gICAgRXJsYW5nOiAgICAgIFtcImVybHxocmxcIl0sXG4gICAgRmxpeDogICAgICAgIFtcImZsaXhcIl0sXG4gICAgRm9ydGg6ICAgICAgIFtcImZydHxmc3xsZHJ8ZnRofDR0aFwiXSxcbiAgICBGb3J0cmFuOiAgICAgW1wiZnxmOTBcIl0sXG4gICAgRlNoYXJwOiAgICAgIFtcImZzaXxmc3xtbHxtbGl8ZnN4fGZzc2NyaXB0XCJdLFxuICAgIEZTTDogICAgICAgICBbXCJmc2xcIl0sXG4gICAgRlRMOiAgICAgICAgIFtcImZ0bFwiXSxcbiAgICBHY29kZTogICAgICAgW1wiZ2NvZGVcIl0sXG4gICAgR2hlcmtpbjogICAgIFtcImZlYXR1cmVcIl0sXG4gICAgR2l0aWdub3JlOiAgIFtcIl4uZ2l0aWdub3JlXCJdLFxuICAgIEdsc2w6ICAgICAgICBbXCJnbHNsfGZyYWd8dmVydFwiXSxcbiAgICBHb2JzdG9uZXM6ICAgW1wiZ2JzXCJdLFxuICAgIGdvbGFuZzogICAgICBbXCJnb1wiXSxcbiAgICBHcmFwaFFMU2NoZW1hOiBbXCJncWxcIl0sXG4gICAgR3Jvb3Z5OiAgICAgIFtcImdyb292eVwiXSxcbiAgICBIQU1MOiAgICAgICAgW1wiaGFtbFwiXSxcbiAgICBIYW5kbGViYXJzOiAgW1wiaGJzfGhhbmRsZWJhcnN8dHBsfG11c3RhY2hlXCJdLFxuICAgIEhhc2tlbGw6ICAgICBbXCJoc1wiXSxcbiAgICBIYXNrZWxsX0NhYmFsOiBbXCJjYWJhbFwiXSxcbiAgICBoYVhlOiAgICAgICAgW1wiaHhcIl0sXG4gICAgSGpzb246ICAgICAgIFtcImhqc29uXCJdLFxuICAgIEhUTUw6IFtcImh0bWx8aHRtfHhodG1sfHdlfHdweVwiXSxcbiAgICBIVE1MX0VsaXhpcjogW1wiZWV4fGh0bWwuZWV4XCJdLFxuICAgIEhUTUxfUnVieTogICBbXCJlcmJ8cmh0bWx8aHRtbC5lcmJcIl0sXG4gICAgSU5JOiAgICAgICAgIFtcImluaXxjb25mfGNmZ3xwcmVmc1wiXSxcbiAgICBJbzogICAgICAgICAgW1wiaW9cIl0sXG4gICAgSW9uOiAgICAgICAgIFtcImlvblwiXSxcbiAgICBKYWNrOiAgICAgICAgW1wiamFja1wiXSxcbiAgICBKYWRlOiAgICAgICAgW1wiamFkZXxwdWdcIl0sXG4gICAgSmF2YTogICAgICAgIFtcImphdmFcIl0sXG4gICAgSmF2YVNjcmlwdDogIFtcImpzfGpzbXxjanN8bWpzXCJdLFxuICAgIEpFWEw6ICAgICAgICBbXCJqZXhsXCJdLFxuICAgIEpTT046ICAgICAgICBbXCJqc29uXCJdLFxuICAgIEpTT041OiAgICAgICBbXCJqc29uNVwiXSxcbiAgICBKU09OaXE6ICAgICAgW1wianFcIl0sXG4gICAgSlNQOiAgICAgICAgIFtcImpzcFwiXSxcbiAgICBKU1NNOiAgICAgICAgW1wianNzbXxqc3NtX3N0YXRlXCJdLFxuICAgIEpTWDogICAgICAgICBbXCJqc3hcIl0sXG4gICAgSnVsaWE6ICAgICAgIFtcImpsXCJdLFxuICAgIEtvdGxpbjogICAgICBbXCJrdHxrdHNcIl0sXG4gICAgTGFUZVg6ICAgICAgIFtcInRleHxsYXRleHxsdHh8YmliXCJdLFxuICAgIExhdHRlOiAgICAgICBbXCJsYXR0ZVwiXSxcbiAgICBMRVNTOiAgICAgICAgW1wibGVzc1wiXSxcbiAgICBMaXF1aWQ6ICAgICAgW1wibGlxdWlkXCJdLFxuICAgIExpc3A6ICAgICAgICBbXCJsaXNwXCJdLFxuICAgIExpdmVTY3JpcHQ6ICBbXCJsc1wiXSxcbiAgICBMb2c6ICAgICAgICAgW1wibG9nXCJdLFxuICAgIExvZ2lRTDogICAgICBbXCJsb2dpY3xscWxcIl0sXG4gICAgTG9ndGFsazogICAgIFtcImxndFwiXSxcbiAgICBMU0w6ICAgICAgICAgW1wibHNsXCJdLFxuICAgIEx1YTogICAgICAgICBbXCJsdWFcIl0sXG4gICAgTHVhUGFnZTogICAgIFtcImxwXCJdLFxuICAgIEx1Y2VuZTogICAgICBbXCJsdWNlbmVcIl0sXG4gICAgTWFrZWZpbGU6ICAgIFtcIl5NYWtlZmlsZXxeR05VbWFrZWZpbGV8Xm1ha2VmaWxlfF5PQ2FtbE1ha2VmaWxlfG1ha2VcIl0sXG4gICAgTWFya2Rvd246ICAgIFtcIm1kfG1hcmtkb3duXCJdLFxuICAgIE1hc2s6ICAgICAgICBbXCJtYXNrXCJdLFxuICAgIE1BVExBQjogICAgICBbXCJtYXRsYWJcIl0sXG4gICAgTWF6ZTogICAgICAgIFtcIm16XCJdLFxuICAgIE1lZGlhV2lraTogICBbXCJ3aWtpfG1lZGlhd2lraVwiXSxcbiAgICBNRUw6ICAgICAgICAgW1wibWVsXCJdLFxuICAgIE1JUFM6ICAgICAgICBbXCJzfGFzbVwiXSxcbiAgICBNSVhBTDogICAgICAgW1wibWl4YWxcIl0sXG4gICAgTVVTSENvZGU6ICAgIFtcIm1jfG11c2hcIl0sXG4gICAgTXlTUUw6ICAgICAgIFtcIm15c3FsXCJdLFxuICAgIE5hc2FsOiAgICAgICBbXCJuYXNcIl0sXG4gICAgTmdpbng6ICAgICAgIFtcIm5naW54fGNvbmZcIl0sXG4gICAgTmltOiAgICAgICAgIFtcIm5pbVwiXSxcbiAgICBOaXg6ICAgICAgICAgW1wibml4XCJdLFxuICAgIE5TSVM6ICAgICAgICBbXCJuc2l8bnNoXCJdLFxuICAgIE51bmp1Y2tzOiAgICBbXCJudW5qdWNrc3xudW5qc3xuanxuamtcIl0sXG4gICAgT2JqZWN0aXZlQzogIFtcIm18bW1cIl0sXG4gICAgT0NhbWw6ICAgICAgIFtcIm1sfG1saVwiXSxcbiAgICBPZGluOiAgICAgICAgW1wib2RpblwiXSxcbiAgICBQYXJ0aVFMOiAgICAgW1wicGFydGlxbHxwcWxcIl0sXG4gICAgUGFzY2FsOiAgICAgIFtcInBhc3xwXCJdLFxuICAgIFBlcmw6ICAgICAgICBbXCJwbHxwbVwiXSxcbiAgICBwZ1NRTDogICAgICAgW1wicGdzcWxcIl0sXG4gICAgUEhQOiAgICAgICAgIFtcInBocHxpbmN8cGh0bWx8c2h0bWx8cGhwM3xwaHA0fHBocDV8cGhwc3xwaHB0fGF3fGN0cHxtb2R1bGVcIl0sXG4gICAgUEhQX0xhcmF2ZWxfYmxhZGU6IFtcImJsYWRlLnBocFwiXSxcbiAgICBQaWc6ICAgICAgICAgW1wicGlnXCJdLFxuICAgIFBMU1FMOiAgICAgICBbXCJwbHNxbFwiXSxcbiAgICBQb3dlcnNoZWxsOiAgW1wicHMxXCJdLFxuICAgIFByYWF0OiAgICAgICBbXCJwcmFhdHxwcmFhdHNjcmlwdHxwc2N8cHJvY1wiXSxcbiAgICBQcmlzbWE6ICAgICAgW1wicHJpc21hXCJdLFxuICAgIFByb2xvZzogICAgICBbXCJwbGd8cHJvbG9nXCJdLFxuICAgIFByb3BlcnRpZXM6ICBbXCJwcm9wZXJ0aWVzXCJdLFxuICAgIFByb3RvYnVmOiAgICBbXCJwcm90b1wiXSxcbiAgICBQUlFMOiAgICAgICAgW1wicHJxbFwiXSxcbiAgICBQdXBwZXQ6ICAgICAgW1wiZXBwfHBwXCJdLFxuICAgIFB5dGhvbjogICAgICBbXCJweVwiXSxcbiAgICBRTUw6ICAgICAgICAgW1wicW1sXCJdLFxuICAgIFI6ICAgICAgICAgICBbXCJyXCJdLFxuICAgIFJha3U6ICAgICAgICBbXCJyYWt1fHJha3Vtb2R8cmFrdXRlc3R8cDZ8cGw2fHBtNlwiXSxcbiAgICBSYXpvcjogICAgICAgW1wiY3NodG1sfGFzcFwiXSxcbiAgICBSRG9jOiAgICAgICAgW1wiUmRcIl0sXG4gICAgUmVkOiAgICAgICAgIFtcInJlZHxyZWRzXCJdLFxuICAgIFJIVE1MOiAgICAgICBbXCJSaHRtbFwiXSxcbiAgICBSb2JvdDogICAgICAgW1wicm9ib3R8cmVzb3VyY2VcIl0sXG4gICAgUlNUOiAgICAgICAgIFtcInJzdFwiXSxcbiAgICBSdWJ5OiAgICAgICAgW1wicmJ8cnV8Z2Vtc3BlY3xyYWtlfF5HdWFyZGZpbGV8XlJha2VmaWxlfF5HZW1maWxlXCJdLFxuICAgIFJ1c3Q6ICAgICAgICBbXCJyc1wiXSxcbiAgICBTYUM6ICAgICAgICAgW1wic2FjXCJdLFxuICAgIFNBU1M6ICAgICAgICBbXCJzYXNzXCJdLFxuICAgIFNDQUQ6ICAgICAgICBbXCJzY2FkXCJdLFxuICAgIFNjYWxhOiAgICAgICBbXCJzY2FsYXxzYnRcIl0sXG4gICAgU2NoZW1lOiAgICAgIFtcInNjbXxzbXxya3R8b2FrfHNjaGVtZVwiXSxcbiAgICBTY3J5cHQ6ICAgICAgW1wic2NyeXB0XCJdLFxuICAgIFNDU1M6ICAgICAgICBbXCJzY3NzXCJdLFxuICAgIFNIOiAgICAgICAgICBbXCJzaHxiYXNofF4uYmFzaHJjXCJdLFxuICAgIFNKUzogICAgICAgICBbXCJzanNcIl0sXG4gICAgU2xpbTogICAgICAgIFtcInNsaW18c2tpbVwiXSxcbiAgICBTbWFydHk6ICAgICAgW1wic21hcnR5fHRwbFwiXSxcbiAgICBTbWl0aHk6ICAgICAgW1wic21pdGh5XCJdLFxuICAgIHNuaXBwZXRzOiAgICBbXCJzbmlwcGV0c1wiXSxcbiAgICBTb3lfVGVtcGxhdGU6W1wic295XCJdLFxuICAgIFNwYWNlOiAgICAgICBbXCJzcGFjZVwiXSxcbiAgICBTUEFSUUw6ICAgICAgW1wicnFcIl0sXG4gICAgU1FMOiAgICAgICAgIFtcInNxbFwiXSxcbiAgICBTUUxTZXJ2ZXI6ICAgW1wic3Fsc2VydmVyXCJdLFxuICAgIFN0eWx1czogICAgICBbXCJzdHlsfHN0eWx1c1wiXSxcbiAgICBTVkc6ICAgICAgICAgW1wic3ZnXCJdLFxuICAgIFN3aWZ0OiAgICAgICBbXCJzd2lmdFwiXSxcbiAgICBUY2w6ICAgICAgICAgW1widGNsXCJdLFxuICAgIFRlcnJhZm9ybTogICBbXCJ0ZlwiLCBcInRmdmFyc1wiLCBcInRlcnJhZ3J1bnRcIl0sXG4gICAgVGV4OiAgICAgICAgIFtcInRleFwiXSxcbiAgICBUZXh0OiAgICAgICAgW1widHh0XCJdLFxuICAgIFRleHRpbGU6ICAgICBbXCJ0ZXh0aWxlXCJdLFxuICAgIFRvbWw6ICAgICAgICBbXCJ0b21sXCJdLFxuICAgIFRTVjogICAgICAgICBbXCJ0c3ZcIl0sXG4gICAgVFNYOiAgICAgICAgIFtcInRzeFwiXSxcbiAgICBUdXJ0bGU6ICAgICAgW1widHRsXCJdLFxuICAgIFR3aWc6ICAgICAgICBbXCJ0d2lnfHN3aWdcIl0sXG4gICAgVHlwZXNjcmlwdDogIFtcInRzfG10c3xjdHN8dHlwZXNjcmlwdHxzdHJcIl0sXG4gICAgVmFsYTogICAgICAgIFtcInZhbGFcIl0sXG4gICAgVkJTY3JpcHQ6ICAgIFtcInZic3x2YlwiXSxcbiAgICBWZWxvY2l0eTogICAgW1widm1cIl0sXG4gICAgVmVyaWxvZzogICAgIFtcInZ8dmh8c3Z8c3ZoXCJdLFxuICAgIFZIREw6ICAgICAgICBbXCJ2aGR8dmhkbFwiXSxcbiAgICBWaXN1YWxmb3JjZTogW1widmZwfGNvbXBvbmVudHxwYWdlXCJdLFxuICAgIFZ1ZTogW1widnVlXCJdLFxuICAgIFdvbGxvazogICAgICBbXCJ3bGt8d3BnbXx3dGVzdFwiXSxcbiAgICBYTUw6ICAgICAgICAgW1wieG1sfHJkZnxyc3N8d3NkbHx4c2x0fGF0b218bWF0aG1sfG1tbHx4dWx8eGJsfHhhbWxcIl0sXG4gICAgWFF1ZXJ5OiAgICAgIFtcInhxXCJdLFxuICAgIFlBTUw6ICAgICAgICBbXCJ5YW1sfHltbFwiXSxcbiAgICBaZWVrOiAgICAgICAgW1wiemVla3xicm9cIl0sXG4gICAgWmlnOiAgICAgICAgIFtcInppZ1wiXVxufTtcblxudmFyIG5hbWVPdmVycmlkZXMgPSB7XG4gICAgT2JqZWN0aXZlQzogXCJPYmplY3RpdmUtQ1wiLFxuICAgIENTaGFycDogXCJDI1wiLFxuICAgIGdvbGFuZzogXCJHb1wiLFxuICAgIENfQ3BwOiBcIkMgYW5kIEMrK1wiLFxuICAgIENzb3VuZF9Eb2N1bWVudDogXCJDc291bmQgRG9jdW1lbnRcIixcbiAgICBDc291bmRfT3JjaGVzdHJhOiBcIkNzb3VuZFwiLFxuICAgIENzb3VuZF9TY29yZTogXCJDc291bmQgU2NvcmVcIixcbiAgICBjb2ZmZWU6IFwiQ29mZmVlU2NyaXB0XCIsXG4gICAgSFRNTF9SdWJ5OiBcIkhUTUwgKFJ1YnkpXCIsXG4gICAgSFRNTF9FbGl4aXI6IFwiSFRNTCAoRWxpeGlyKVwiLFxuICAgIEZUTDogXCJGcmVlTWFya2VyXCIsXG4gICAgUEhQX0xhcmF2ZWxfYmxhZGU6IFwiUEhQIChCbGFkZSBUZW1wbGF0ZSlcIixcbiAgICBQZXJsNjogXCJQZXJsIDZcIixcbiAgICBBdXRvSG90S2V5OiBcIkF1dG9Ib3RrZXkgLyBBdXRvSXRcIlxufTtcblxuLyoqXG4gKiBAdHlwZSB7UmVjb3JkPHN0cmluZywgTW9kZT59XG4gKi9cbnZhciBtb2Rlc0J5TmFtZSA9IHt9O1xuZm9yICh2YXIgbmFtZSBpbiBzdXBwb3J0ZWRNb2Rlcykge1xuICAgIHZhciBkYXRhID0gc3VwcG9ydGVkTW9kZXNbbmFtZV07XG4gICAgdmFyIGRpc3BsYXlOYW1lID0gKG5hbWVPdmVycmlkZXNbbmFtZV0gfHwgbmFtZSkucmVwbGFjZSgvXy9nLCBcIiBcIik7XG4gICAgdmFyIGZpbGVuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBtb2RlID0gbmV3IE1vZGUoZmlsZW5hbWUsIGRpc3BsYXlOYW1lLCBkYXRhWzBdKTtcbiAgICBtb2Rlc0J5TmFtZVtmaWxlbmFtZV0gPSBtb2RlO1xuICAgIG1vZGVzLnB1c2gobW9kZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldE1vZGVGb3JQYXRoOiBnZXRNb2RlRm9yUGF0aCxcbiAgICBtb2RlczogbW9kZXMsXG4gICAgbW9kZXNCeU5hbWU6IG1vZGVzQnlOYW1lXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG4vKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9lZGl0b3JcIikuRWRpdG9yfSBFZGl0b3JcbiAqL1xuXG5yZXF1aXJlKFwiLi9tZW51X3Rvb2xzL292ZXJsYXlfcGFnZVwiKTtcblxudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9saWIvZG9tXCIpO1xudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcIi4uL2xpYi9ldmVudF9lbWl0dGVyXCIpLkV2ZW50RW1pdHRlcjtcbnZhciBidWlsZERvbSA9IGRvbS5idWlsZERvbTtcblxudmFyIG1vZGVsaXN0ID0gcmVxdWlyZShcIi4vbW9kZWxpc3RcIik7XG52YXIgdGhlbWVsaXN0ID0gcmVxdWlyZShcIi4vdGhlbWVsaXN0XCIpO1xuXG52YXIgdGhlbWVzID0geyBCcmlnaHQ6IFtdLCBEYXJrOiBbXSB9O1xudGhlbWVsaXN0LnRoZW1lcy5mb3JFYWNoKGZ1bmN0aW9uKHgpIHtcbiAgICB0aGVtZXNbeC5pc0RhcmsgPyBcIkRhcmtcIiA6IFwiQnJpZ2h0XCJdLnB1c2goeyBjYXB0aW9uOiB4LmNhcHRpb24sIHZhbHVlOiB4LnRoZW1lIH0pO1xufSk7XG5cbnZhciBtb2RlcyA9IG1vZGVsaXN0Lm1vZGVzLm1hcChmdW5jdGlvbih4KXsgXG4gICAgcmV0dXJuIHsgY2FwdGlvbjogeC5jYXB0aW9uLCB2YWx1ZTogeC5tb2RlIH07IFxufSk7XG5cblxudmFyIG9wdGlvbkdyb3VwcyA9IHtcbiAgICBNYWluOiB7XG4gICAgICAgIE1vZGU6IHtcbiAgICAgICAgICAgIHBhdGg6IFwibW9kZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgICAgIGl0ZW1zOiBtb2Rlc1xuICAgICAgICB9LFxuICAgICAgICBUaGVtZToge1xuICAgICAgICAgICAgcGF0aDogXCJ0aGVtZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgICAgIGl0ZW1zOiB0aGVtZXNcbiAgICAgICAgfSxcbiAgICAgICAgXCJLZXliaW5kaW5nXCI6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uQmFyXCIsXG4gICAgICAgICAgICBwYXRoOiBcImtleWJvYXJkSGFuZGxlclwiLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIkFjZVwiLCB2YWx1ZSA6IG51bGwgfSxcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlZpbVwiLCB2YWx1ZSA6IFwiYWNlL2tleWJvYXJkL3ZpbVwiIH0sXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJFbWFjc1wiLCB2YWx1ZSA6IFwiYWNlL2tleWJvYXJkL2VtYWNzXCIgfSxcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlN1YmxpbWVcIiwgdmFsdWUgOiBcImFjZS9rZXlib2FyZC9zdWJsaW1lXCIgfSxcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlZTQ29kZVwiLCB2YWx1ZSA6IFwiYWNlL2tleWJvYXJkL3ZzY29kZVwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJGb250IFNpemVcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJmb250U2l6ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogMTIsXG4gICAgICAgICAgICBkZWZhdWx0czogW1xuICAgICAgICAgICAgICAgIHtjYXB0aW9uOiBcIjEycHhcIiwgdmFsdWU6IDEyfSxcbiAgICAgICAgICAgICAgICB7Y2FwdGlvbjogXCIyNHB4XCIsIHZhbHVlOiAyNH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJTb2Z0IFdyYXBcIjoge1xuICAgICAgICAgICAgdHlwZTogXCJidXR0b25CYXJcIixcbiAgICAgICAgICAgIHBhdGg6IFwid3JhcFwiLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiT2ZmXCIsICB2YWx1ZSA6IFwib2ZmXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiVmlld1wiLCB2YWx1ZSA6IFwiZnJlZVwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIm1hcmdpblwiLCB2YWx1ZSA6IFwicHJpbnRNYXJnaW5cIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCI0MFwiLCAgIHZhbHVlIDogXCI0MFwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJDdXJzb3IgU3R5bGVcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJjdXJzb3JTdHlsZVwiLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiQWNlXCIsICAgIHZhbHVlIDogXCJhY2VcIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJTbGltXCIsICAgdmFsdWUgOiBcInNsaW1cIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJTbW9vdGhcIiwgdmFsdWUgOiBcInNtb290aFwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlNtb290aCBBbmQgU2xpbVwiLCB2YWx1ZSA6IFwic21vb3RoIHNsaW1cIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJXaWRlXCIsICAgdmFsdWUgOiBcIndpZGVcIiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiRm9sZGluZ1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImZvbGRTdHlsZVwiLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIk1hbnVhbFwiLCB2YWx1ZSA6IFwibWFudWFsXCIgfSxcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIk1hcmsgYmVnaW5cIiwgdmFsdWUgOiBcIm1hcmtiZWdpblwiIH0sXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJNYXJrIGJlZ2luIGFuZCBlbmRcIiwgdmFsdWUgOiBcIm1hcmtiZWdpbmVuZFwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJTb2Z0IFRhYnNcIjogW3tcbiAgICAgICAgICAgIHBhdGg6IFwidXNlU29mdFRhYnNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBhcmlhTGFiZWw6IFwiVGFiIFNpemVcIixcbiAgICAgICAgICAgIHBhdGg6IFwidGFiU2l6ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgIHZhbHVlczogWzIsIDMsIDQsIDgsIDE2XVxuICAgICAgICB9XSxcbiAgICAgICAgXCJPdmVyc2Nyb2xsXCI6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uQmFyXCIsXG4gICAgICAgICAgICBwYXRoOiBcInNjcm9sbFBhc3RFbmRcIixcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIk5vbmVcIiwgIHZhbHVlIDogMCB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJIYWxmXCIsICAgdmFsdWUgOiAwLjUgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiRnVsbFwiLCAgIHZhbHVlIDogMSB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIE1vcmU6IHtcbiAgICAgICAgXCJBdG9taWMgc29mdCB0YWJzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwibmF2aWdhdGVXaXRoaW5Tb2Z0VGFic1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiRW5hYmxlIEJlaGF2aW91cnNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJiZWhhdmlvdXJzRW5hYmxlZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiV3JhcCB3aXRoIHF1b3Rlc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcIndyYXBCZWhhdmlvdXJzRW5hYmxlZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiRW5hYmxlIEF1dG8gSW5kZW50XCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZW5hYmxlQXV0b0luZGVudFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiRnVsbCBMaW5lIFNlbGVjdGlvblwiOiB7XG4gICAgICAgICAgICB0eXBlOiBcImNoZWNrYm94XCIsXG4gICAgICAgICAgICB2YWx1ZXM6IFwidGV4dHxsaW5lXCIsXG4gICAgICAgICAgICBwYXRoOiBcInNlbGVjdGlvblN0eWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJIaWdobGlnaHQgQWN0aXZlIExpbmVcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJoaWdobGlnaHRBY3RpdmVMaW5lXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJTaG93IEludmlzaWJsZXNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJzaG93SW52aXNpYmxlc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiU2hvdyBJbmRlbnQgR3VpZGVzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZGlzcGxheUluZGVudEd1aWRlc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiSGlnaGxpZ2h0IEluZGVudCBHdWlkZXNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJoaWdobGlnaHRJbmRlbnRHdWlkZXNcIlxuICAgICAgICB9LFxuICAgICAgICBcIlBlcnNpc3RlbnQgSFNjcm9sbGJhclwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImhTY3JvbGxCYXJBbHdheXNWaXNpYmxlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJQZXJzaXN0ZW50IFZTY3JvbGxiYXJcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJ2U2Nyb2xsQmFyQWx3YXlzVmlzaWJsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiQW5pbWF0ZSBzY3JvbGxpbmdcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJhbmltYXRlZFNjcm9sbFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiU2hvdyBHdXR0ZXJcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJzaG93R3V0dGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJTaG93IExpbmUgTnVtYmVyc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInNob3dMaW5lTnVtYmVyc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiUmVsYXRpdmUgTGluZSBOdW1iZXJzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwicmVsYXRpdmVMaW5lTnVtYmVyc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiRml4ZWQgR3V0dGVyIFdpZHRoXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZml4ZWRXaWR0aEd1dHRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiU2hvdyBQcmludCBNYXJnaW5cIjogW3tcbiAgICAgICAgICAgIHBhdGg6IFwic2hvd1ByaW50TWFyZ2luXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYXJpYUxhYmVsOiBcIlByaW50IE1hcmdpblwiLFxuICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgIHBhdGg6IFwicHJpbnRNYXJnaW5Db2x1bW5cIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJJbmRlbnRlZCBTb2Z0IFdyYXBcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJpbmRlbnRlZFNvZnRXcmFwXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJIaWdobGlnaHQgc2VsZWN0ZWQgd29yZFwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImhpZ2hsaWdodFNlbGVjdGVkV29yZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiRmFkZSBGb2xkIFdpZGdldHNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJmYWRlRm9sZFdpZGdldHNcIlxuICAgICAgICB9LFxuICAgICAgICBcIlVzZSB0ZXh0YXJlYSBmb3IgSU1FXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwidXNlVGV4dGFyZWFGb3JJTUVcIlxuICAgICAgICB9LFxuICAgICAgICBcIk1lcmdlIFVuZG8gRGVsdGFzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwibWVyZ2VVbmRvRGVsdGFzXCIsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJBbHdheXNcIiwgIHZhbHVlIDogXCJhbHdheXNcIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJOZXZlclwiLCAgIHZhbHVlIDogXCJmYWxzZVwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlRpbWVkXCIsICAgdmFsdWUgOiBcInRydWVcIiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiRWxhc3RpYyBUYWJzdG9wc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInVzZUVsYXN0aWNUYWJzdG9wc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiSW5jcmVtZW50YWwgU2VhcmNoXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwidXNlSW5jcmVtZW50YWxTZWFyY2hcIlxuICAgICAgICB9LFxuICAgICAgICBcIlJlYWQtb25seVwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInJlYWRPbmx5XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJDb3B5IHdpdGhvdXQgc2VsZWN0aW9uXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiY29weVdpdGhFbXB0eVNlbGVjdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiTGl2ZSBBdXRvY29tcGxldGlvblwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImVuYWJsZUxpdmVBdXRvY29tcGxldGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiQ3VzdG9tIHNjcm9sbGJhclwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImN1c3RvbVNjcm9sbGJhclwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiVXNlIFNWRyBndXR0ZXIgaWNvbnNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJ1c2VTdmdHdXR0ZXJJY29uc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiQW5ub3RhdGlvbnMgZm9yIGZvbGRlZCBsaW5lc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInNob3dGb2xkZWRBbm5vdGF0aW9uc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiS2V5Ym9hcmQgQWNjZXNzaWJpbGl0eSBNb2RlXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZW5hYmxlS2V5Ym9hcmRBY2Nlc3NpYmlsaXR5XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJHdXR0ZXIgdG9vbHRpcCBmb2xsb3dzIG1vdXNlXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwidG9vbHRpcEZvbGxvd3NNb3VzZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5jbGFzcyBPcHRpb25QYW5lbCB7XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtlbGVtZW50XVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGVkaXRvciwgZWxlbWVudCkge1xuICAgICAgICB0aGlzLmVkaXRvciA9IGVkaXRvcjtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBlbGVtZW50IHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMuZ3JvdXBzID0gW107XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBcbiAgICBhZGQoY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcuTWFpbilcbiAgICAgICAgICAgIG9vcC5taXhpbihvcHRpb25Hcm91cHMuTWFpbiwgY29uZmlnLk1haW4pO1xuICAgICAgICBpZiAoY29uZmlnLk1vcmUpXG4gICAgICAgICAgICBvb3AubWl4aW4ob3B0aW9uR3JvdXBzLk1vcmUsIGNvbmZpZy5Nb3JlKTtcbiAgICB9XG5cbiAgXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBidWlsZERvbShbXCJ0YWJsZVwiLCB7cm9sZTogXCJwcmVzZW50YXRpb25cIiwgaWQ6IFwiY29udHJvbHNcIn0sIFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJPcHRpb25Hcm91cChvcHRpb25Hcm91cHMuTWFpbiksXG4gICAgICAgICAgICBbXCJ0clwiLCBudWxsLCBbXCJ0ZFwiLCB7Y29sc3BhbjogMn0sXG4gICAgICAgICAgICAgICAgW1widGFibGVcIiwge3JvbGU6IFwicHJlc2VudGF0aW9uXCIsIGlkOiBcIm1vcmUtY29udHJvbHNcIn0sIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlck9wdGlvbkdyb3VwKG9wdGlvbkdyb3Vwcy5Nb3JlKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF1dLFxuICAgICAgICAgICAgW1widHJcIiwgbnVsbCwgW1widGRcIiwge2NvbHNwYW46IDJ9LCBcInZlcnNpb24gXCIgKyBjb25maWcudmVyc2lvbl1dXG4gICAgICAgIF0sIHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyT3B0aW9uR3JvdXAoZ3JvdXApIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGdyb3VwKS5tYXAoZnVuY3Rpb24oa2V5LCBpKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGdyb3VwW2tleV07XG4gICAgICAgICAgICBpZiAoIWl0ZW0ucG9zaXRpb24pXG4gICAgICAgICAgICAgICAgaXRlbS5wb3NpdGlvbiA9IGkgLyAxMDAwMDtcbiAgICAgICAgICAgIGlmICghaXRlbS5sYWJlbClcbiAgICAgICAgICAgICAgICBpdGVtLmxhYmVsID0ga2V5O1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH0pLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEucG9zaXRpb24gLSBiLnBvc2l0aW9uO1xuICAgICAgICB9KS5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyT3B0aW9uKGl0ZW0ubGFiZWwsIGl0ZW0pO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvblxuICAgICAqL1xuICAgIHJlbmRlck9wdGlvbkNvbnRyb2woa2V5LCBvcHRpb24pIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLm1hcChmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYucmVuZGVyT3B0aW9uQ29udHJvbChrZXksIHgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqQHR5cGUge2FueX0qL1xuICAgICAgICB2YXIgY29udHJvbDtcbiAgICAgICAgXG4gICAgICAgIHZhciB2YWx1ZSA9IHNlbGYuZ2V0T3B0aW9uKG9wdGlvbik7XG4gICAgICAgIFxuICAgICAgICBpZiAob3B0aW9uLnZhbHVlcyAmJiBvcHRpb24udHlwZSAhPSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLnZhbHVlcyA9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZXMgPSBvcHRpb24udmFsdWVzLnNwbGl0KFwifFwiKTtcbiAgICAgICAgICAgIG9wdGlvbi5pdGVtcyA9IG9wdGlvbi52YWx1ZXMubWFwKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdiwgbmFtZTogdiB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChvcHRpb24udHlwZSA9PSBcImJ1dHRvbkJhclwiKSB7XG4gICAgICAgICAgICBjb250cm9sID0gW1wiZGl2XCIsIHtyb2xlOiBcImdyb3VwXCIsIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IG9wdGlvbi5wYXRoICsgXCItbGFiZWxcIn0sIG9wdGlvbi5pdGVtcy5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXCJidXR0b25cIiwgeyBcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW0udmFsdWUsIFxuICAgICAgICAgICAgICAgICAgICBhY2Vfc2VsZWN0ZWRfYnV0dG9uOiB2YWx1ZSA9PSBpdGVtLnZhbHVlLCBcbiAgICAgICAgICAgICAgICAgICAgJ2FyaWEtcHJlc3NlZCc6IHZhbHVlID09IGl0ZW0udmFsdWUsIFxuICAgICAgICAgICAgICAgICAgICBvbmNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0T3B0aW9uKG9wdGlvbiwgaXRlbS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZXMgPSB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbChcIlthY2Vfc2VsZWN0ZWRfYnV0dG9uXVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2Rlc1tpXS5yZW1vdmVBdHRyaWJ1dGUoXCJhY2Vfc2VsZWN0ZWRfYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzW2ldLnNldEF0dHJpYnV0ZShcImFyaWEtcHJlc3NlZFwiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImFjZV9zZWxlY3RlZF9idXR0b25cIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImFyaWEtcHJlc3NlZFwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICB9LCBpdGVtLmRlc2MgfHwgaXRlbS5jYXB0aW9uIHx8IGl0ZW0ubmFtZV07XG4gICAgICAgICAgICB9KV07XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9uLnR5cGUgPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgY29udHJvbCA9IFtcImlucHV0XCIsIHt0eXBlOiBcIm51bWJlclwiLCB2YWx1ZTogdmFsdWUgfHwgb3B0aW9uLmRlZmF1bHRWYWx1ZSwgc3R5bGU6XCJ3aWR0aDozZW1cIiwgb25pbnB1dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRPcHRpb24ob3B0aW9uLCBwYXJzZUludCh0aGlzLnZhbHVlKSk7XG4gICAgICAgICAgICB9fV07XG4gICAgICAgICAgICBpZiAob3B0aW9uLmFyaWFMYWJlbCkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xbMV1bXCJhcmlhLWxhYmVsXCJdID0gb3B0aW9uLmFyaWFMYWJlbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udHJvbFsxXS5pZCA9IGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb24uZGVmYXVsdHMpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sID0gW2NvbnRyb2wsIG9wdGlvbi5kZWZhdWx0cy5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wiYnV0dG9uXCIsIHtvbmNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMucGFyZW50Tm9kZS5maXJzdENoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBpdGVtLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQub25pbnB1dCgpO1xuICAgICAgICAgICAgICAgICAgICB9fSwgaXRlbS5jYXB0aW9uXTtcbiAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9uLml0ZW1zKSB7XG4gICAgICAgICAgICB2YXIgYnVpbGRJdGVtcyA9IGZ1bmN0aW9uKGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJvcHRpb25cIiwgeyB2YWx1ZTogaXRlbS52YWx1ZSB8fCBpdGVtLm5hbWUgfSwgaXRlbS5kZXNjIHx8IGl0ZW0uY2FwdGlvbiB8fCBpdGVtLm5hbWVdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGl0ZW1zID0gQXJyYXkuaXNBcnJheShvcHRpb24uaXRlbXMpIFxuICAgICAgICAgICAgICAgID8gYnVpbGRJdGVtcyhvcHRpb24uaXRlbXMpXG4gICAgICAgICAgICAgICAgOiBPYmplY3Qua2V5cyhvcHRpb24uaXRlbXMpLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcIm9wdGdyb3VwXCIsIHtcImxhYmVsXCI6IGtleX0sIGJ1aWxkSXRlbXMob3B0aW9uLml0ZW1zW2tleV0pXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnRyb2wgPSBbXCJzZWxlY3RcIiwgeyBpZDoga2V5LCB2YWx1ZTogdmFsdWUsIG9uY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldE9wdGlvbihvcHRpb24sIHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgfSB9LCBpdGVtc107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbi52YWx1ZXMgPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICBvcHRpb24udmFsdWVzID0gb3B0aW9uLnZhbHVlcy5zcGxpdChcInxcIik7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnZhbHVlcykgdmFsdWUgPSB2YWx1ZSA9PSBvcHRpb24udmFsdWVzWzFdO1xuICAgICAgICAgICAgY29udHJvbCA9IFtcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBpZDoga2V5LCBjaGVja2VkOiB2YWx1ZSB8fCBudWxsLCBvbmNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5jaGVja2VkO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24udmFsdWVzKSB2YWx1ZSA9IG9wdGlvbi52YWx1ZXNbdmFsdWUgPyAxIDogMF07XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRPcHRpb24ob3B0aW9uLCB2YWx1ZSk7XG4gICAgICAgICAgICB9fV07XG4gICAgICAgICAgICBpZiAob3B0aW9uLnR5cGUgPT0gXCJjaGVja2VkTnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sID0gW2NvbnRyb2wsIFtdXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udHJvbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIG9wdGlvblxuICAgICAqL1xuICAgIHJlbmRlck9wdGlvbihrZXksIG9wdGlvbikge1xuICAgICAgICBpZiAob3B0aW9uLnBhdGggJiYgIW9wdGlvbi5vbmNoYW5nZSAmJiAhdGhpcy5lZGl0b3IuJG9wdGlvbnNbb3B0aW9uLnBhdGhdKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgcGF0aCA9IEFycmF5LmlzQXJyYXkob3B0aW9uKSA/IG9wdGlvblswXS5wYXRoIDogb3B0aW9uLnBhdGg7XG4gICAgICAgIHRoaXMub3B0aW9uc1twYXRoXSA9IG9wdGlvbjtcbiAgICAgICAgdmFyIHNhZmVLZXkgPSBcIi1cIiArIHBhdGg7XG4gICAgICAgIHZhciBzYWZlSWQgPSBwYXRoICsgXCItbGFiZWxcIjtcbiAgICAgICAgdmFyIGNvbnRyb2wgPSB0aGlzLnJlbmRlck9wdGlvbkNvbnRyb2woc2FmZUtleSwgb3B0aW9uKTtcbiAgICAgICAgcmV0dXJuIFtcInRyXCIsIHtjbGFzczogXCJhY2Vfb3B0aW9uc01lbnVFbnRyeVwifSwgW1widGRcIixcbiAgICAgICAgICAgIFtcImxhYmVsXCIsIHtmb3I6IHNhZmVLZXksIGlkOiBzYWZlSWR9LCBrZXldXG4gICAgICAgIF0sIFtcInRkXCIsIGNvbnRyb2xdXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bWJlciB8IE9iamVjdH0gb3B0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudW1iZXIgfCBib29sZWFufSB2YWx1ZVxuICAgICAqL1xuICAgIHNldE9wdGlvbihvcHRpb24sIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICBvcHRpb24gPSB0aGlzLm9wdGlvbnNbb3B0aW9uXTtcbiAgICAgICAgaWYgKHZhbHVlID09IFwiZmFsc2VcIikgdmFsdWUgPSBmYWxzZTtcbiAgICAgICAgaWYgKHZhbHVlID09IFwidHJ1ZVwiKSB2YWx1ZSA9IHRydWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBcIm51bGxcIikgdmFsdWUgPSBudWxsO1xuICAgICAgICBpZiAodmFsdWUgPT0gXCJ1bmRlZmluZWRcIikgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJzdHJpbmdcIiAmJiBwYXJzZUZsb2F0KHZhbHVlKS50b1N0cmluZygpID09IHZhbHVlKVxuICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgICAgaWYgKG9wdGlvbi5vbmNoYW5nZSlcbiAgICAgICAgICAgIG9wdGlvbi5vbmNoYW5nZSh2YWx1ZSk7XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbi5wYXRoKVxuICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2V0T3B0aW9uKG9wdGlvbi5wYXRoLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3NpZ25hbChcInNldE9wdGlvblwiLCB7bmFtZTogb3B0aW9uLnBhdGgsIHZhbHVlOiB2YWx1ZX0pO1xuICAgIH1cbiAgICBcbiAgICBnZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgICAgIGlmIChvcHRpb24uZ2V0VmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLmdldFZhbHVlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRvci5nZXRPcHRpb24ob3B0aW9uLnBhdGgpO1xuICAgIH1cbn1cbm9vcC5pbXBsZW1lbnQoT3B0aW9uUGFuZWwucHJvdG90eXBlLCBFdmVudEVtaXR0ZXIpO1xuXG5leHBvcnRzLk9wdGlvblBhbmVsID0gT3B0aW9uUGFuZWw7XG4iLCIvKmpzbGludCBpbmRlbnQ6IDQsIG1heGVycjogNTAsIHdoaXRlOiB0cnVlLCBicm93c2VyOiB0cnVlLCB2YXJzOiB0cnVlKi9cbi8qZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSAqL1xuXG4vKipcbiAqIFNob3cgU2V0dGluZ3MgTWVudVxuICogQGZpbGVPdmVydmlldyBTaG93IFNldHRpbmdzIE1lbnUgPGJyIC8+XG4gKiBEaXNwbGF5cyBhbiBpbnRlcmFjdGl2ZSBzZXR0aW5ncyBtZW51IG1vc3RseSBnZW5lcmF0ZWQgb24gdGhlIGZseSBiYXNlZCBvblxuICogIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBlZGl0b3IuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICovXG5cblwidXNlIHN0cmljdFwiO1xudmFyIE9wdGlvblBhbmVsID0gcmVxdWlyZShcIi4vb3B0aW9uc1wiKS5PcHRpb25QYW5lbDtcbnZhciBvdmVybGF5UGFnZSA9IHJlcXVpcmUoJy4vbWVudV90b29scy9vdmVybGF5X3BhZ2UnKS5vdmVybGF5UGFnZTtcblxuLyoqXG4gKiBUaGlzIGRpc3BsYXlzIHRoZSBzZXR0aW5ncyBtZW51IGlmIGl0IGlzIG5vdCBhbHJlYWR5IGJlaW5nIHNob3duLlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vZWRpdG9yXCIpLkVkaXRvcn0gZWRpdG9yIEFuIGluc3RhbmNlIG9mIHRoZSBhY2UgZWRpdG9yLlxuICovXG5mdW5jdGlvbiBzaG93U2V0dGluZ3NNZW51KGVkaXRvcikge1xuICAgIC8vIHNob3cgaWYgdGhlIG1lbnUgaXNuJ3Qgb3BlbiBhbHJlYWR5LlxuICAgIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FjZV9zZXR0aW5nc21lbnUnKSkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IG5ldyBPcHRpb25QYW5lbChlZGl0b3IpO1xuICAgICAgICBvcHRpb25zLnJlbmRlcigpO1xuICAgICAgICBvcHRpb25zLmNvbnRhaW5lci5pZCA9IFwiYWNlX3NldHRpbmdzbWVudVwiO1xuICAgICAgICBvdmVybGF5UGFnZShlZGl0b3IsIG9wdGlvbnMuY29udGFpbmVyKTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBvcHRpb25zLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwic2VsZWN0LGlucHV0LGJ1dHRvbixjaGVja2JveFwiKS5mb2N1cygpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBJbml0aWFsaXplcyB0aGUgc2V0dGluZ3MgbWVudSBleHRlbnNpb24uIEl0IGFkZHMgdGhlIHNob3dTZXR0aW5nc01lbnVcbiAqICBtZXRob2QgdG8gdGhlIGdpdmVuIGVkaXRvciBvYmplY3QgYW5kIGFkZHMgdGhlIHNob3dTZXR0aW5nc01lbnUgY29tbWFuZFxuICogIHRvIHRoZSBlZGl0b3Igd2l0aCBhcHByb3ByaWF0ZSBrZXlib2FyZCBzaG9ydGN1dHMuXG4gKi9cbm1vZHVsZS5leHBvcnRzLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgRWRpdG9yID0gcmVxdWlyZShcIi4uL2VkaXRvclwiKS5FZGl0b3I7XG4gICAgRWRpdG9yLnByb3RvdHlwZS5zaG93U2V0dGluZ3NNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNob3dTZXR0aW5nc01lbnUodGhpcyk7XG4gICAgfTtcbn07XG4iLCIvKipcbiAqIEdlbmVyYXRlcyBhIGxpc3Qgb2YgdGhlbWVzIGF2YWlsYWJsZSB3aGVuIGFjZSB3YXMgYnVpbHQuXG4gKiBAZmlsZU92ZXJ2aWV3IEdlbmVyYXRlcyBhIGxpc3Qgb2YgdGhlbWVzIGF2YWlsYWJsZSB3aGVuIGFjZSB3YXMgYnVpbHQuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFRoZW1lXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY2FwdGlvbiAtIFRoZSBkaXNwbGF5IGNhcHRpb24gb2YgdGhlIHRoZW1lLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHRoZW1lICAgLSBUaGUgcGF0aCBvciBpZGVudGlmaWVyIGZvciB0aGUgQUNFIHRoZW1lLlxuICogQHByb3BlcnR5IHtib29sZWFufSBpc0RhcmsgLSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgdGhlbWUgaXMgZGFyayBvciBsaWdodC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBuYW1lICAgIC0gVGhlIG5vcm1hbGl6ZWQgbmFtZSB1c2VkIGFzIHRoZSBrZXkuXG4gKi9cblxudmFyIHRoZW1lRGF0YSA9IFtcbiAgICBbXCJDaHJvbWVcIiAgICAgICAgIF0sXG4gICAgW1wiQ2xvdWRzXCIgICAgICAgICBdLFxuICAgIFtcIkNyaW1zb24gRWRpdG9yXCIgXSxcbiAgICBbXCJEYXduXCIgICAgICAgICAgIF0sXG4gICAgW1wiRHJlYW13ZWF2ZXJcIiAgICBdLFxuICAgIFtcIkVjbGlwc2VcIiAgICAgICAgXSxcbiAgICBbXCJHaXRIdWIgTGlnaHQgRGVmYXVsdFwiIF0sXG4gICAgW1wiR2l0SHViIChMZWdhY3kpXCIgICAgICAsXCJnaXRodWJcIiAgICAgICAgICAgICAgICAgICwgXCJsaWdodFwiXSxcbiAgICBbXCJJUGxhc3RpY1wiICAgICAgIF0sXG4gICAgW1wiU29sYXJpemVkIExpZ2h0XCJdLFxuICAgIFtcIlRleHRNYXRlXCIgICAgICAgXSxcbiAgICBbXCJUb21vcnJvd1wiICAgICAgIF0sXG4gICAgW1wiWENvZGVcIiAgICAgICAgICBdLFxuICAgIFtcIkt1cm9pclwiXSxcbiAgICBbXCJLYXR6ZW5NaWxjaFwiXSxcbiAgICBbXCJTUUwgU2VydmVyXCIgICAgICAgICAgICxcInNxbHNlcnZlclwiICAgICAgICAgICAgICAgLCBcImxpZ2h0XCJdLFxuICAgIFtcIkNsb3VkRWRpdG9yXCIgICAgICAgICAgLFwiY2xvdWRfZWRpdG9yXCIgICAgICAgICAgICAsIFwibGlnaHRcIl0sXG4gICAgW1wiQW1iaWFuY2VcIiAgICAgICAgICAgICAsXCJhbWJpYW5jZVwiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJDaGFvc1wiICAgICAgICAgICAgICAgICxcImNoYW9zXCIgICAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkNsb3VkcyBNaWRuaWdodFwiICAgICAgLFwiY2xvdWRzX21pZG5pZ2h0XCIgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiRHJhY3VsYVwiICAgICAgICAgICAgICAsXCJcIiAgICAgICAgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJDb2JhbHRcIiAgICAgICAgICAgICAgICxcImNvYmFsdFwiICAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkdydXZib3hcIiAgICAgICAgICAgICAgLFwiZ3J1dmJveFwiICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiR3JlZW4gb24gQmxhY2tcIiAgICAgICAsXCJnb2JcIiAgICAgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJpZGxlIEZpbmdlcnNcIiAgICAgICAgICxcImlkbGVfZmluZ2Vyc1wiICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcImtyVGhlbWVcIiAgICAgICAgICAgICAgLFwia3JfdGhlbWVcIiAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiTWVyYml2b3JlXCIgICAgICAgICAgICAsXCJtZXJiaXZvcmVcIiAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJNZXJiaXZvcmUgU29mdFwiICAgICAgICxcIm1lcmJpdm9yZV9zb2Z0XCIgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk1vbm8gSW5kdXN0cmlhbFwiICAgICAgLFwibW9ub19pbmR1c3RyaWFsXCIgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiTW9ub2thaVwiICAgICAgICAgICAgICAsXCJtb25va2FpXCIgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJOb3JkIERhcmtcIiAgICAgICAgICAgICxcIm5vcmRfZGFya1wiICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk9uZSBEYXJrXCIgICAgICAgICAgICAgLFwib25lX2RhcmtcIiAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiUGFzdGVsIG9uIGRhcmtcIiAgICAgICAsXCJwYXN0ZWxfb25fZGFya1wiICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJTb2xhcml6ZWQgRGFya1wiICAgICAgICxcInNvbGFyaXplZF9kYXJrXCIgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlRlcm1pbmFsXCIgICAgICAgICAgICAgLFwidGVybWluYWxcIiAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVG9tb3Jyb3cgTmlnaHRcIiAgICAgICAsXCJ0b21vcnJvd19uaWdodFwiICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUb21vcnJvdyBOaWdodCBCbHVlXCIgICxcInRvbW9ycm93X25pZ2h0X2JsdWVcIiAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlRvbW9ycm93IE5pZ2h0IEJyaWdodFwiLFwidG9tb3Jyb3dfbmlnaHRfYnJpZ2h0XCIgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVG9tb3Jyb3cgTmlnaHQgODBzXCIgICAsXCJ0b21vcnJvd19uaWdodF9laWdodGllc1wiICwgIFwiZGFya1wiXSxcbiAgICBbXCJUd2lsaWdodFwiICAgICAgICAgICAgICxcInR3aWxpZ2h0XCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlZpYnJhbnQgSW5rXCIgICAgICAgICAgLFwidmlicmFudF9pbmtcIiAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiR2l0SHViIERhcmtcIiAgICAgICAgICAsXCJnaXRodWJfZGFya1wiICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJDbG91ZEVkaXRvciBEYXJrXCIgICAgICxcImNsb3VkX2VkaXRvcl9kYXJrXCIgICAgICAgLCAgXCJkYXJrXCJdXG5dO1xuXG4vKipcbiAqIEB0eXBlIHtPYmplY3Q8c3RyaW5nLCBUaGVtZT59XG4gKi9cbmV4cG9ydHMudGhlbWVzQnlOYW1lID0ge307XG5cbi8qKlxuICogQW4gYXJyYXkgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCBhdmFpbGFibGUgdGhlbWVzLlxuICogQHR5cGUge1RoZW1lW119XG4gKi9cbmV4cG9ydHMudGhlbWVzID0gdGhlbWVEYXRhLm1hcChmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIG5hbWUgPSBkYXRhWzFdIHx8IGRhdGFbMF0ucmVwbGFjZSgvIC9nLCBcIl9cIikudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgdGhlbWUgPSB7XG4gICAgICAgIGNhcHRpb246IGRhdGFbMF0sXG4gICAgICAgIHRoZW1lOiBcImFjZS90aGVtZS9cIiArIG5hbWUsXG4gICAgICAgIGlzRGFyazogZGF0YVsyXSA9PSBcImRhcmtcIixcbiAgICAgICAgbmFtZTogbmFtZVxuICAgIH07XG4gICAgZXhwb3J0cy50aGVtZXNCeU5hbWVbbmFtZV0gPSB0aGVtZTtcbiAgICByZXR1cm4gdGhlbWU7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==