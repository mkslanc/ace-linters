(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3275,352,3056,4953],{

/***/ 9613:
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


var dom = __webpack_require__(6359);
var cssText = __webpack_require__(10221);
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

/***/ 10221:
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

/***/ 90352:
/***/ ((module) => {

"use strict";


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
            re = "^.*\\.(" + extensions + ")$";
        }

        this.extRe = new RegExp(re, "gi");
    }

    /**
     * @param {string} filename
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
    Assembly_x86:["asm|a"],
    Astro:       ["astro"],
    AutoHotKey:  ["ahk"],
    BatchFile:   ["bat|cmd"],
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
    HTML:        ["html|htm|xhtml|vue|we|wpy"],
    HTML_Elixir: ["eex|html.eex"],
    HTML_Ruby:   ["erb|rhtml|html.erb"],
    INI:         ["ini|conf|cfg|prefs"],
    Io:          ["io"],
    Ion:         ["ion"],
    Jack:        ["jack"],
    Jade:        ["jade|pug"],
    Java:        ["java"],
    JavaScript:  ["js|jsm|jsx|cjs|mjs"],
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
    Wollok:      ["wlk|wpgm|wtest"],
    XML:         ["xml|rdf|rss|wsdl|xslt|atom|mathml|mml|xul|xbl|xaml"],
    XQuery:      ["xq"],
    YAML:        ["yaml|yml"],
    Zeek:        ["zeek|bro"]
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

module.exports = {
    getModeForPath: getModeForPath,
    modes: modes,
    modesByName: modesByName
};


/***/ }),

/***/ 32814:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

/**
 * @typedef {import("../editor").Editor} Editor
 */

__webpack_require__(9613);

var dom = __webpack_require__(6359);
var oop = __webpack_require__(89359);
var config = __webpack_require__(13188);
var EventEmitter = (__webpack_require__(23056)/* .EventEmitter */ .v);
var buildDom = dom.buildDom;

var modelist = __webpack_require__(90352);
var themelist = __webpack_require__(84953);

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

/***/ 93275:
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


var OptionPanel = (__webpack_require__(32814).OptionPanel);
var overlayPage = (__webpack_require__(9613).overlayPage);

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
    var Editor = (__webpack_require__(82880)/* .Editor */ .M);
    Editor.prototype.showSettingsMenu = function() {
        showSettingsMenu(this);
    };
};


/***/ }),

/***/ 84953:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * Generates a list of themes available when ace was built.
 * @fileOverview Generates a list of themes available when ace was built.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 */



var themeData = [
    ["Chrome"         ],
    ["Clouds"         ],
    ["Crimson Editor" ],
    ["Dawn"           ],
    ["Dreamweaver"    ],
    ["Eclipse"        ],
    ["GitHub"         ],
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


exports.themesByName = {};

/**
 * An array containing information about available themes.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUI7Ozs7Ozs7OztBQ2xabkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7QUFDYixrQkFBa0Isd0NBQWdDO0FBQ2xELGtCQUFrQix1Q0FBZ0Q7O0FBRWxFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLDRCQUE0QjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQixpQkFBaUIsNENBQTJCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0Esb0JBQW9COztBQUVwQjtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tZW51X3Rvb2xzL292ZXJsYXlfcGFnZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvbWVudV90b29scy9zZXR0aW5nc19tZW51LmNzcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvbW9kZWxpc3QuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L29wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3NldHRpbmdzX21lbnUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3RoZW1lbGlzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKmpzbGludCBpbmRlbnQ6IDQsIG1heGVycjogNTAsIHdoaXRlOiB0cnVlLCBicm93c2VyOiB0cnVlLCB2YXJzOiB0cnVlKi9cbi8qZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSAqL1xuXG4vKipcbiAqIE92ZXJsYXkgUGFnZVxuICogQGZpbGVPdmVydmlldyBPdmVybGF5IFBhZ2UgPGJyIC8+XG4gKiBHZW5lcmF0ZXMgYW4gb3ZlcmxheSBmb3IgZGlzcGxheWluZyBtZW51cy4gVGhlIG92ZXJsYXkgaXMgYW4gYWJzb2x1dGVseVxuICogIHBvc2l0aW9uZWQgZGl2LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG52YXIgZG9tID0gcmVxdWlyZShcIi4uLy4uL2xpYi9kb21cIik7XG52YXIgY3NzVGV4dCA9IHJlcXVpcmUoXCIuL3NldHRpbmdzX21lbnUuY3NzXCIpO1xuZG9tLmltcG9ydENzc1N0cmluZyhjc3NUZXh0LCBcInNldHRpbmdzX21lbnUuY3NzXCIsIGZhbHNlKTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYW4gb3ZlcmxheSBmb3IgZGlzcGxheWluZyBtZW51cy4gVGhlIG92ZXJsYXkgaXMgYW4gYWJzb2x1dGVseVxuICogIHBvc2l0aW9uZWQgZGl2LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBwYXJhbSBlZGl0b3JcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRlbnRFbGVtZW50IEFueSBlbGVtZW50IHdoaWNoIG1heSBiZSBwcmVzZW50ZWQgaW5zaWRlXG4gKiAgYSBkaXYuXG4gKiBAcGFyYW0gW2NhbGxiYWNrXVxuICovXG5tb2R1bGUuZXhwb3J0cy5vdmVybGF5UGFnZSA9IGZ1bmN0aW9uIG92ZXJsYXlQYWdlKGVkaXRvciwgY29udGVudEVsZW1lbnQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGNsb3NlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBpZ25vcmVGb2N1c091dCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gZG9jdW1lbnRFc2NMaXN0ZW5lcihlKSB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgIGlmICghY2xvc2VyKSByZXR1cm47XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBkb2N1bWVudEVzY0xpc3RlbmVyKTtcbiAgICAgICAgY2xvc2VyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2xvc2VyKTtcbiAgICAgICAgaWYgKGVkaXRvcikge1xuICAgICAgICAgICAgZWRpdG9yLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2xvc2VyID0gbnVsbDtcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICAgLyoqXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIG92ZXJsYXkgaXMgY2xvc2VkIHdoZW4gdXNlciBjbGlja3Mgb3V0c2lkZSBvZiBpdC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGlnbm9yZSAgICAgIElmIHNldCB0byB0cnVlIG92ZXJsYXkgc3RheXMgb3BlbiB3aGVuIGZvY3VzIG1vdmVzIHRvIGFub3RoZXIgcGFydCBvZiB0aGUgZWRpdG9yLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNldElnbm9yZUZvY3VzT3V0KGlnbm9yZSkge1xuICAgICAgICBpZ25vcmVGb2N1c091dCA9IGlnbm9yZTtcbiAgICAgICAgaWYgKGlnbm9yZSkge1xuICAgICAgICAgICAgY2xvc2VyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIGNvbnRlbnRFbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3Nlci5zdHlsZS5jc3NUZXh0ID0gJ21hcmdpbjogMDsgcGFkZGluZzogMDsgJyArXG4gICAgICAgICdwb3NpdGlvbjogZml4ZWQ7IHRvcDowOyBib3R0b206MDsgbGVmdDowOyByaWdodDowOycgK1xuICAgICAgICAnei1pbmRleDogOTk5MDsgJyArXG4gICAgICAgIChlZGl0b3IgPyAnYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpOycgOiAnJyk7XG4gICAgY2xvc2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoIWlnbm9yZUZvY3VzT3V0KSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gY2xpY2sgY2xvc2VyIGlmIGVzYyBrZXkgaXMgcHJlc3NlZFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBkb2N1bWVudEVzY0xpc3RlbmVyKTtcblxuICAgIGNvbnRlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgIGNsb3Nlci5hcHBlbmRDaGlsZChjb250ZW50RWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjbG9zZXIpO1xuICAgIGlmIChlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLmJsdXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2xvc2U6IGNsb3NlLFxuICAgICAgICBzZXRJZ25vcmVGb2N1c091dDogc2V0SWdub3JlRm9jdXNPdXRcbiAgICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gYCNhY2Vfc2V0dGluZ3NtZW51LCAja2JzaG9ydGN1dG1lbnUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNGN0Y3Rjc7XG4gICAgY29sb3I6IGJsYWNrO1xuICAgIGJveC1zaGFkb3c6IC01cHggNHB4IDVweCByZ2JhKDEyNiwgMTI2LCAxMjYsIDAuNTUpO1xuICAgIHBhZGRpbmc6IDFlbSAwLjVlbSAyZW0gMWVtO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBtYXJnaW46IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIHRvcDogMDtcbiAgICB6LWluZGV4OiA5OTkxO1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLmFjZV9kYXJrICNhY2Vfc2V0dGluZ3NtZW51LCAuYWNlX2RhcmsgI2tic2hvcnRjdXRtZW51IHtcbiAgICBib3gtc2hhZG93OiAtMjBweCAxMHB4IDI1cHggcmdiYSgxMjYsIDEyNiwgMTI2LCAwLjI1KTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XG4gICAgY29sb3I6IGJsYWNrO1xufVxuXG4uYWNlX29wdGlvbnNNZW51RW50cnk6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTAwLCAxMDAsIDEwMCwgMC4xKTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zc1xufVxuXG4uYWNlX2Nsb3NlQnV0dG9uIHtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI0NSwgMTQ2LCAxNDYsIDAuNSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI0Y0OEE4QTtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgcGFkZGluZzogN3B4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICByaWdodDogLThweDtcbiAgICB0b3A6IC04cHg7XG4gICAgei1pbmRleDogMTAwMDAwO1xufVxuLmFjZV9jbG9zZUJ1dHRvbntcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI0NSwgMTQ2LCAxNDYsIDAuOSk7XG59XG4uYWNlX29wdGlvbnNNZW51S2V5IHtcbiAgICBjb2xvcjogZGFya3NsYXRlYmx1ZTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbn1cbi5hY2Vfb3B0aW9uc01lbnVDb21tYW5kIHtcbiAgICBjb2xvcjogZGFya2N5YW47XG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbn1cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeSBpbnB1dCwgLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvbiB7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvblthY2Vfc2VsZWN0ZWRfYnV0dG9uPXRydWVdIHtcbiAgICBiYWNrZ3JvdW5kOiAjZTdlN2U3O1xuICAgIGJveC1zaGFkb3c6IDFweCAwcHggMnB4IDBweCAjYWRhZGFkIGluc2V0O1xuICAgIGJvcmRlci1jb2xvcjogI2FkYWRhZDtcbn1cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeSBidXR0b24ge1xuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgICBtYXJnaW46IDBweDtcbn1cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeSBidXR0b246aG92ZXJ7XG4gICAgYmFja2dyb3VuZDogI2YwZjBmMDtcbn1gO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtb2RlcyA9IFtdO1xuLyoqXG4gKiBTdWdnZXN0cyBhIG1vZGUgYmFzZWQgb24gdGhlIGZpbGUgZXh0ZW5zaW9uIHByZXNlbnQgaW4gdGhlIGdpdmVuIHBhdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIHRoZSBmaWxlXG4gKiBAcmV0dXJucyB7TW9kZX0gUmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGVcbiAqICBzdWdnZXN0ZWQgbW9kZS5cbiAqL1xuZnVuY3Rpb24gZ2V0TW9kZUZvclBhdGgocGF0aCkge1xuICAgIHZhciBtb2RlID0gbW9kZXNCeU5hbWUudGV4dDtcbiAgICB2YXIgZmlsZU5hbWUgPSBwYXRoLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChtb2Rlc1tpXS5zdXBwb3J0c0ZpbGUoZmlsZU5hbWUpKSB7XG4gICAgICAgICAgICBtb2RlID0gbW9kZXNbaV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbW9kZTtcbn1cblxuY2xhc3MgTW9kZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2FwdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBleHRlbnNpb25zXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgY2FwdGlvbiwgZXh0ZW5zaW9ucykge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNhcHRpb24gPSBjYXB0aW9uO1xuICAgICAgICB0aGlzLm1vZGUgPSBcImFjZS9tb2RlL1wiICsgbmFtZTtcbiAgICAgICAgdGhpcy5leHRlbnNpb25zID0gZXh0ZW5zaW9ucztcbiAgICAgICAgdmFyIHJlO1xuICAgICAgICBpZiAoL1xcXi8udGVzdChleHRlbnNpb25zKSkge1xuICAgICAgICAgICAgcmUgPSBleHRlbnNpb25zLnJlcGxhY2UoL1xcfChcXF4pPy9nLCBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIiR8XCIgKyAoYiA/IFwiXlwiIDogXCJeLipcXFxcLlwiKTtcbiAgICAgICAgICAgIH0pICsgXCIkXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZSA9IFwiXi4qXFxcXC4oXCIgKyBleHRlbnNpb25zICsgXCIpJFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5leHRSZSA9IG5ldyBSZWdFeHAocmUsIFwiZ2lcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVuYW1lXG4gICAgICovXG4gICAgc3VwcG9ydHNGaWxlKGZpbGVuYW1lKSB7XG4gICAgICAgIHJldHVybiBmaWxlbmFtZS5tYXRjaCh0aGlzLmV4dFJlKTtcbiAgICB9XG59XG5cbi8vIHRvZG8gZmlyc3RsaW5lbWF0Y2hcbnZhciBzdXBwb3J0ZWRNb2RlcyA9IHtcbiAgICBBQkFQOiAgICAgICAgW1wiYWJhcFwiXSxcbiAgICBBQkM6ICAgICAgICAgW1wiYWJjXCJdLFxuICAgIEFjdGlvblNjcmlwdDpbXCJhc1wiXSxcbiAgICBBREE6ICAgICAgICAgW1wiYWRhfGFkYlwiXSxcbiAgICBBbGRhOiAgICAgICAgW1wiYWxkYVwiXSxcbiAgICBBcGFjaGVfQ29uZjogW1wiXmh0YWNjZXNzfF5odGdyb3Vwc3xeaHRwYXNzd2R8XmNvbmZ8aHRhY2Nlc3N8aHRncm91cHN8aHRwYXNzd2RcIl0sXG4gICAgQXBleDogICAgICAgIFtcImFwZXh8Y2xzfHRyaWdnZXJ8dGdyXCJdLFxuICAgIEFRTDogICAgICAgICBbXCJhcWxcIl0sXG4gICAgQXNjaWlEb2M6ICAgIFtcImFzY2lpZG9jfGFkb2NcIl0sXG4gICAgQVNMOiAgICAgICAgIFtcImRzbHxhc2x8YXNsLmpzb25cIl0sXG4gICAgQXNzZW1ibHlfeDg2OltcImFzbXxhXCJdLFxuICAgIEFzdHJvOiAgICAgICBbXCJhc3Ryb1wiXSxcbiAgICBBdXRvSG90S2V5OiAgW1wiYWhrXCJdLFxuICAgIEJhdGNoRmlsZTogICBbXCJiYXR8Y21kXCJdLFxuICAgIEJpYlRlWDogICAgICBbXCJiaWJcIl0sXG4gICAgQ19DcHA6ICAgICAgIFtcImNwcHxjfGNjfGN4eHxofGhofGhwcHxpbm9cIl0sXG4gICAgQzlTZWFyY2g6ICAgIFtcImM5c2VhcmNoX3Jlc3VsdHNcIl0sXG4gICAgQ2lycnU6ICAgICAgIFtcImNpcnJ1fGNyXCJdLFxuICAgIENsb2p1cmU6ICAgICBbXCJjbGp8Y2xqc1wiXSxcbiAgICBDb2JvbDogICAgICAgW1wiQ0JMfENPQlwiXSxcbiAgICBjb2ZmZWU6ICAgICAgW1wiY29mZmVlfGNmfGNzb258XkNha2VmaWxlXCJdLFxuICAgIENvbGRGdXNpb246ICBbXCJjZm18Y2ZjXCJdLFxuICAgIENyeXN0YWw6ICAgICBbXCJjclwiXSxcbiAgICBDU2hhcnA6ICAgICAgW1wiY3NcIl0sXG4gICAgQ3NvdW5kX0RvY3VtZW50OiBbXCJjc2RcIl0sXG4gICAgQ3NvdW5kX09yY2hlc3RyYTogW1wib3JjXCJdLFxuICAgIENzb3VuZF9TY29yZTogW1wic2NvXCJdLFxuICAgIENTUzogICAgICAgICBbXCJjc3NcIl0sXG4gICAgQ3VybHk6ICAgICAgIFtcImN1cmx5XCJdLFxuICAgIEN1dHRsZWZpc2g6ICBbXCJjb25mXCJdLFxuICAgIEQ6ICAgICAgICAgICBbXCJkfGRpXCJdLFxuICAgIERhcnQ6ICAgICAgICBbXCJkYXJ0XCJdLFxuICAgIERpZmY6ICAgICAgICBbXCJkaWZmfHBhdGNoXCJdLFxuICAgIERqYW5nbzogICAgICBbXCJkanR8aHRtbC5kanR8ZGouaHRtbHxkamh0bWxcIl0sXG4gICAgRG9ja2VyZmlsZTogIFtcIl5Eb2NrZXJmaWxlXCJdLFxuICAgIERvdDogICAgICAgICBbXCJkb3RcIl0sXG4gICAgRHJvb2xzOiAgICAgIFtcImRybFwiXSxcbiAgICBFZGlmYWN0OiAgICAgW1wiZWRpXCJdLFxuICAgIEVpZmZlbDogICAgICBbXCJlfGdlXCJdLFxuICAgIEVKUzogICAgICAgICBbXCJlanNcIl0sXG4gICAgRWxpeGlyOiAgICAgIFtcImV4fGV4c1wiXSxcbiAgICBFbG06ICAgICAgICAgW1wiZWxtXCJdLFxuICAgIEVybGFuZzogICAgICBbXCJlcmx8aHJsXCJdLFxuICAgIEZsaXg6ICAgICAgICBbXCJmbGl4XCJdLFxuICAgIEZvcnRoOiAgICAgICBbXCJmcnR8ZnN8bGRyfGZ0aHw0dGhcIl0sXG4gICAgRm9ydHJhbjogICAgIFtcImZ8ZjkwXCJdLFxuICAgIEZTaGFycDogICAgICBbXCJmc2l8ZnN8bWx8bWxpfGZzeHxmc3NjcmlwdFwiXSxcbiAgICBGU0w6ICAgICAgICAgW1wiZnNsXCJdLFxuICAgIEZUTDogICAgICAgICBbXCJmdGxcIl0sXG4gICAgR2NvZGU6ICAgICAgIFtcImdjb2RlXCJdLFxuICAgIEdoZXJraW46ICAgICBbXCJmZWF0dXJlXCJdLFxuICAgIEdpdGlnbm9yZTogICBbXCJeLmdpdGlnbm9yZVwiXSxcbiAgICBHbHNsOiAgICAgICAgW1wiZ2xzbHxmcmFnfHZlcnRcIl0sXG4gICAgR29ic3RvbmVzOiAgIFtcImdic1wiXSxcbiAgICBnb2xhbmc6ICAgICAgW1wiZ29cIl0sXG4gICAgR3JhcGhRTFNjaGVtYTogW1wiZ3FsXCJdLFxuICAgIEdyb292eTogICAgICBbXCJncm9vdnlcIl0sXG4gICAgSEFNTDogICAgICAgIFtcImhhbWxcIl0sXG4gICAgSGFuZGxlYmFyczogIFtcImhic3xoYW5kbGViYXJzfHRwbHxtdXN0YWNoZVwiXSxcbiAgICBIYXNrZWxsOiAgICAgW1wiaHNcIl0sXG4gICAgSGFza2VsbF9DYWJhbDogW1wiY2FiYWxcIl0sXG4gICAgaGFYZTogICAgICAgIFtcImh4XCJdLFxuICAgIEhqc29uOiAgICAgICBbXCJoanNvblwiXSxcbiAgICBIVE1MOiAgICAgICAgW1wiaHRtbHxodG18eGh0bWx8dnVlfHdlfHdweVwiXSxcbiAgICBIVE1MX0VsaXhpcjogW1wiZWV4fGh0bWwuZWV4XCJdLFxuICAgIEhUTUxfUnVieTogICBbXCJlcmJ8cmh0bWx8aHRtbC5lcmJcIl0sXG4gICAgSU5JOiAgICAgICAgIFtcImluaXxjb25mfGNmZ3xwcmVmc1wiXSxcbiAgICBJbzogICAgICAgICAgW1wiaW9cIl0sXG4gICAgSW9uOiAgICAgICAgIFtcImlvblwiXSxcbiAgICBKYWNrOiAgICAgICAgW1wiamFja1wiXSxcbiAgICBKYWRlOiAgICAgICAgW1wiamFkZXxwdWdcIl0sXG4gICAgSmF2YTogICAgICAgIFtcImphdmFcIl0sXG4gICAgSmF2YVNjcmlwdDogIFtcImpzfGpzbXxqc3h8Y2pzfG1qc1wiXSxcbiAgICBKRVhMOiAgICAgICAgW1wiamV4bFwiXSxcbiAgICBKU09OOiAgICAgICAgW1wianNvblwiXSxcbiAgICBKU09ONTogICAgICAgW1wianNvbjVcIl0sXG4gICAgSlNPTmlxOiAgICAgIFtcImpxXCJdLFxuICAgIEpTUDogICAgICAgICBbXCJqc3BcIl0sXG4gICAgSlNTTTogICAgICAgIFtcImpzc218anNzbV9zdGF0ZVwiXSxcbiAgICBKU1g6ICAgICAgICAgW1wianN4XCJdLFxuICAgIEp1bGlhOiAgICAgICBbXCJqbFwiXSxcbiAgICBLb3RsaW46ICAgICAgW1wia3R8a3RzXCJdLFxuICAgIExhVGVYOiAgICAgICBbXCJ0ZXh8bGF0ZXh8bHR4fGJpYlwiXSxcbiAgICBMYXR0ZTogICAgICAgW1wibGF0dGVcIl0sXG4gICAgTEVTUzogICAgICAgIFtcImxlc3NcIl0sXG4gICAgTGlxdWlkOiAgICAgIFtcImxpcXVpZFwiXSxcbiAgICBMaXNwOiAgICAgICAgW1wibGlzcFwiXSxcbiAgICBMaXZlU2NyaXB0OiAgW1wibHNcIl0sXG4gICAgTG9nOiAgICAgICAgIFtcImxvZ1wiXSxcbiAgICBMb2dpUUw6ICAgICAgW1wibG9naWN8bHFsXCJdLFxuICAgIExvZ3RhbGs6ICAgICBbXCJsZ3RcIl0sXG4gICAgTFNMOiAgICAgICAgIFtcImxzbFwiXSxcbiAgICBMdWE6ICAgICAgICAgW1wibHVhXCJdLFxuICAgIEx1YVBhZ2U6ICAgICBbXCJscFwiXSxcbiAgICBMdWNlbmU6ICAgICAgW1wibHVjZW5lXCJdLFxuICAgIE1ha2VmaWxlOiAgICBbXCJeTWFrZWZpbGV8XkdOVW1ha2VmaWxlfF5tYWtlZmlsZXxeT0NhbWxNYWtlZmlsZXxtYWtlXCJdLFxuICAgIE1hcmtkb3duOiAgICBbXCJtZHxtYXJrZG93blwiXSxcbiAgICBNYXNrOiAgICAgICAgW1wibWFza1wiXSxcbiAgICBNQVRMQUI6ICAgICAgW1wibWF0bGFiXCJdLFxuICAgIE1hemU6ICAgICAgICBbXCJtelwiXSxcbiAgICBNZWRpYVdpa2k6ICAgW1wid2lraXxtZWRpYXdpa2lcIl0sXG4gICAgTUVMOiAgICAgICAgIFtcIm1lbFwiXSxcbiAgICBNSVBTOiAgICAgICAgW1wic3xhc21cIl0sXG4gICAgTUlYQUw6ICAgICAgIFtcIm1peGFsXCJdLFxuICAgIE1VU0hDb2RlOiAgICBbXCJtY3xtdXNoXCJdLFxuICAgIE15U1FMOiAgICAgICBbXCJteXNxbFwiXSxcbiAgICBOYXNhbDogICAgICAgW1wibmFzXCJdLFxuICAgIE5naW54OiAgICAgICBbXCJuZ2lueHxjb25mXCJdLFxuICAgIE5pbTogICAgICAgICBbXCJuaW1cIl0sXG4gICAgTml4OiAgICAgICAgIFtcIm5peFwiXSxcbiAgICBOU0lTOiAgICAgICAgW1wibnNpfG5zaFwiXSxcbiAgICBOdW5qdWNrczogICAgW1wibnVuanVja3N8bnVuanN8bmp8bmprXCJdLFxuICAgIE9iamVjdGl2ZUM6ICBbXCJtfG1tXCJdLFxuICAgIE9DYW1sOiAgICAgICBbXCJtbHxtbGlcIl0sXG4gICAgT2RpbjogICAgICAgIFtcIm9kaW5cIl0sXG4gICAgUGFydGlRTDogICAgIFtcInBhcnRpcWx8cHFsXCJdLFxuICAgIFBhc2NhbDogICAgICBbXCJwYXN8cFwiXSxcbiAgICBQZXJsOiAgICAgICAgW1wicGx8cG1cIl0sXG4gICAgcGdTUUw6ICAgICAgIFtcInBnc3FsXCJdLFxuICAgIFBIUDogICAgICAgICBbXCJwaHB8aW5jfHBodG1sfHNodG1sfHBocDN8cGhwNHxwaHA1fHBocHN8cGhwdHxhd3xjdHB8bW9kdWxlXCJdLFxuICAgIFBIUF9MYXJhdmVsX2JsYWRlOiBbXCJibGFkZS5waHBcIl0sXG4gICAgUGlnOiAgICAgICAgIFtcInBpZ1wiXSxcbiAgICBQTFNRTDogICAgICAgW1wicGxzcWxcIl0sXG4gICAgUG93ZXJzaGVsbDogIFtcInBzMVwiXSxcbiAgICBQcmFhdDogICAgICAgW1wicHJhYXR8cHJhYXRzY3JpcHR8cHNjfHByb2NcIl0sXG4gICAgUHJpc21hOiAgICAgIFtcInByaXNtYVwiXSxcbiAgICBQcm9sb2c6ICAgICAgW1wicGxnfHByb2xvZ1wiXSxcbiAgICBQcm9wZXJ0aWVzOiAgW1wicHJvcGVydGllc1wiXSxcbiAgICBQcm90b2J1ZjogICAgW1wicHJvdG9cIl0sXG4gICAgUFJRTDogICAgICAgIFtcInBycWxcIl0sXG4gICAgUHVwcGV0OiAgICAgIFtcImVwcHxwcFwiXSxcbiAgICBQeXRob246ICAgICAgW1wicHlcIl0sXG4gICAgUU1MOiAgICAgICAgIFtcInFtbFwiXSxcbiAgICBSOiAgICAgICAgICAgW1wiclwiXSxcbiAgICBSYWt1OiAgICAgICAgW1wicmFrdXxyYWt1bW9kfHJha3V0ZXN0fHA2fHBsNnxwbTZcIl0sXG4gICAgUmF6b3I6ICAgICAgIFtcImNzaHRtbHxhc3BcIl0sXG4gICAgUkRvYzogICAgICAgIFtcIlJkXCJdLFxuICAgIFJlZDogICAgICAgICBbXCJyZWR8cmVkc1wiXSxcbiAgICBSSFRNTDogICAgICAgW1wiUmh0bWxcIl0sXG4gICAgUm9ib3Q6ICAgICAgIFtcInJvYm90fHJlc291cmNlXCJdLFxuICAgIFJTVDogICAgICAgICBbXCJyc3RcIl0sXG4gICAgUnVieTogICAgICAgIFtcInJifHJ1fGdlbXNwZWN8cmFrZXxeR3VhcmRmaWxlfF5SYWtlZmlsZXxeR2VtZmlsZVwiXSxcbiAgICBSdXN0OiAgICAgICAgW1wicnNcIl0sXG4gICAgU2FDOiAgICAgICAgIFtcInNhY1wiXSxcbiAgICBTQVNTOiAgICAgICAgW1wic2Fzc1wiXSxcbiAgICBTQ0FEOiAgICAgICAgW1wic2NhZFwiXSxcbiAgICBTY2FsYTogICAgICAgW1wic2NhbGF8c2J0XCJdLFxuICAgIFNjaGVtZTogICAgICBbXCJzY218c218cmt0fG9ha3xzY2hlbWVcIl0sXG4gICAgU2NyeXB0OiAgICAgIFtcInNjcnlwdFwiXSxcbiAgICBTQ1NTOiAgICAgICAgW1wic2Nzc1wiXSxcbiAgICBTSDogICAgICAgICAgW1wic2h8YmFzaHxeLmJhc2hyY1wiXSxcbiAgICBTSlM6ICAgICAgICAgW1wic2pzXCJdLFxuICAgIFNsaW06ICAgICAgICBbXCJzbGltfHNraW1cIl0sXG4gICAgU21hcnR5OiAgICAgIFtcInNtYXJ0eXx0cGxcIl0sXG4gICAgU21pdGh5OiAgICAgIFtcInNtaXRoeVwiXSxcbiAgICBzbmlwcGV0czogICAgW1wic25pcHBldHNcIl0sXG4gICAgU295X1RlbXBsYXRlOltcInNveVwiXSxcbiAgICBTcGFjZTogICAgICAgW1wic3BhY2VcIl0sXG4gICAgU1BBUlFMOiAgICAgIFtcInJxXCJdLFxuICAgIFNRTDogICAgICAgICBbXCJzcWxcIl0sXG4gICAgU1FMU2VydmVyOiAgIFtcInNxbHNlcnZlclwiXSxcbiAgICBTdHlsdXM6ICAgICAgW1wic3R5bHxzdHlsdXNcIl0sXG4gICAgU1ZHOiAgICAgICAgIFtcInN2Z1wiXSxcbiAgICBTd2lmdDogICAgICAgW1wic3dpZnRcIl0sXG4gICAgVGNsOiAgICAgICAgIFtcInRjbFwiXSxcbiAgICBUZXJyYWZvcm06ICAgW1widGZcIiwgXCJ0ZnZhcnNcIiwgXCJ0ZXJyYWdydW50XCJdLFxuICAgIFRleDogICAgICAgICBbXCJ0ZXhcIl0sXG4gICAgVGV4dDogICAgICAgIFtcInR4dFwiXSxcbiAgICBUZXh0aWxlOiAgICAgW1widGV4dGlsZVwiXSxcbiAgICBUb21sOiAgICAgICAgW1widG9tbFwiXSxcbiAgICBUU1g6ICAgICAgICAgW1widHN4XCJdLFxuICAgIFR1cnRsZTogICAgICBbXCJ0dGxcIl0sXG4gICAgVHdpZzogICAgICAgIFtcInR3aWd8c3dpZ1wiXSxcbiAgICBUeXBlc2NyaXB0OiAgW1widHN8bXRzfGN0c3x0eXBlc2NyaXB0fHN0clwiXSxcbiAgICBWYWxhOiAgICAgICAgW1widmFsYVwiXSxcbiAgICBWQlNjcmlwdDogICAgW1widmJzfHZiXCJdLFxuICAgIFZlbG9jaXR5OiAgICBbXCJ2bVwiXSxcbiAgICBWZXJpbG9nOiAgICAgW1widnx2aHxzdnxzdmhcIl0sXG4gICAgVkhETDogICAgICAgIFtcInZoZHx2aGRsXCJdLFxuICAgIFZpc3VhbGZvcmNlOiBbXCJ2ZnB8Y29tcG9uZW50fHBhZ2VcIl0sXG4gICAgV29sbG9rOiAgICAgIFtcIndsa3x3cGdtfHd0ZXN0XCJdLFxuICAgIFhNTDogICAgICAgICBbXCJ4bWx8cmRmfHJzc3x3c2RsfHhzbHR8YXRvbXxtYXRobWx8bW1sfHh1bHx4Ymx8eGFtbFwiXSxcbiAgICBYUXVlcnk6ICAgICAgW1wieHFcIl0sXG4gICAgWUFNTDogICAgICAgIFtcInlhbWx8eW1sXCJdLFxuICAgIFplZWs6ICAgICAgICBbXCJ6ZWVrfGJyb1wiXVxufTtcblxudmFyIG5hbWVPdmVycmlkZXMgPSB7XG4gICAgT2JqZWN0aXZlQzogXCJPYmplY3RpdmUtQ1wiLFxuICAgIENTaGFycDogXCJDI1wiLFxuICAgIGdvbGFuZzogXCJHb1wiLFxuICAgIENfQ3BwOiBcIkMgYW5kIEMrK1wiLFxuICAgIENzb3VuZF9Eb2N1bWVudDogXCJDc291bmQgRG9jdW1lbnRcIixcbiAgICBDc291bmRfT3JjaGVzdHJhOiBcIkNzb3VuZFwiLFxuICAgIENzb3VuZF9TY29yZTogXCJDc291bmQgU2NvcmVcIixcbiAgICBjb2ZmZWU6IFwiQ29mZmVlU2NyaXB0XCIsXG4gICAgSFRNTF9SdWJ5OiBcIkhUTUwgKFJ1YnkpXCIsXG4gICAgSFRNTF9FbGl4aXI6IFwiSFRNTCAoRWxpeGlyKVwiLFxuICAgIEZUTDogXCJGcmVlTWFya2VyXCIsXG4gICAgUEhQX0xhcmF2ZWxfYmxhZGU6IFwiUEhQIChCbGFkZSBUZW1wbGF0ZSlcIixcbiAgICBQZXJsNjogXCJQZXJsIDZcIixcbiAgICBBdXRvSG90S2V5OiBcIkF1dG9Ib3RrZXkgLyBBdXRvSXRcIlxufTtcblxudmFyIG1vZGVzQnlOYW1lID0ge307XG5mb3IgKHZhciBuYW1lIGluIHN1cHBvcnRlZE1vZGVzKSB7XG4gICAgdmFyIGRhdGEgPSBzdXBwb3J0ZWRNb2Rlc1tuYW1lXTtcbiAgICB2YXIgZGlzcGxheU5hbWUgPSAobmFtZU92ZXJyaWRlc1tuYW1lXSB8fCBuYW1lKS5yZXBsYWNlKC9fL2csIFwiIFwiKTtcbiAgICB2YXIgZmlsZW5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIG1vZGUgPSBuZXcgTW9kZShmaWxlbmFtZSwgZGlzcGxheU5hbWUsIGRhdGFbMF0pO1xuICAgIG1vZGVzQnlOYW1lW2ZpbGVuYW1lXSA9IG1vZGU7XG4gICAgbW9kZXMucHVzaChtb2RlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0TW9kZUZvclBhdGg6IGdldE1vZGVGb3JQYXRoLFxuICAgIG1vZGVzOiBtb2RlcyxcbiAgICBtb2Rlc0J5TmFtZTogbW9kZXNCeU5hbWVcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydChcIi4uL2VkaXRvclwiKS5FZGl0b3J9IEVkaXRvclxuICovXG5cbnJlcXVpcmUoXCIuL21lbnVfdG9vbHMvb3ZlcmxheV9wYWdlXCIpO1xuXG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2xpYi9kb21cIik7XG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgY29uZmlnID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKFwiLi4vbGliL2V2ZW50X2VtaXR0ZXJcIikuRXZlbnRFbWl0dGVyO1xudmFyIGJ1aWxkRG9tID0gZG9tLmJ1aWxkRG9tO1xuXG52YXIgbW9kZWxpc3QgPSByZXF1aXJlKFwiLi9tb2RlbGlzdFwiKTtcbnZhciB0aGVtZWxpc3QgPSByZXF1aXJlKFwiLi90aGVtZWxpc3RcIik7XG5cbnZhciB0aGVtZXMgPSB7IEJyaWdodDogW10sIERhcms6IFtdIH07XG50aGVtZWxpc3QudGhlbWVzLmZvckVhY2goZnVuY3Rpb24oeCkge1xuICAgIHRoZW1lc1t4LmlzRGFyayA/IFwiRGFya1wiIDogXCJCcmlnaHRcIl0ucHVzaCh7IGNhcHRpb246IHguY2FwdGlvbiwgdmFsdWU6IHgudGhlbWUgfSk7XG59KTtcblxudmFyIG1vZGVzID0gbW9kZWxpc3QubW9kZXMubWFwKGZ1bmN0aW9uKHgpeyBcbiAgICByZXR1cm4geyBjYXB0aW9uOiB4LmNhcHRpb24sIHZhbHVlOiB4Lm1vZGUgfTsgXG59KTtcblxuXG52YXIgb3B0aW9uR3JvdXBzID0ge1xuICAgIE1haW46IHtcbiAgICAgICAgTW9kZToge1xuICAgICAgICAgICAgcGF0aDogXCJtb2RlXCIsXG4gICAgICAgICAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgICAgICAgICAgaXRlbXM6IG1vZGVzXG4gICAgICAgIH0sXG4gICAgICAgIFRoZW1lOiB7XG4gICAgICAgICAgICBwYXRoOiBcInRoZW1lXCIsXG4gICAgICAgICAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgICAgICAgICAgaXRlbXM6IHRoZW1lc1xuICAgICAgICB9LFxuICAgICAgICBcIktleWJpbmRpbmdcIjoge1xuICAgICAgICAgICAgdHlwZTogXCJidXR0b25CYXJcIixcbiAgICAgICAgICAgIHBhdGg6IFwia2V5Ym9hcmRIYW5kbGVyXCIsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiQWNlXCIsIHZhbHVlIDogbnVsbCB9LFxuICAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiVmltXCIsIHZhbHVlIDogXCJhY2Uva2V5Ym9hcmQvdmltXCIgfSxcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIkVtYWNzXCIsIHZhbHVlIDogXCJhY2Uva2V5Ym9hcmQvZW1hY3NcIiB9LFxuICAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiU3VibGltZVwiLCB2YWx1ZSA6IFwiYWNlL2tleWJvYXJkL3N1YmxpbWVcIiB9LFxuICAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiVlNDb2RlXCIsIHZhbHVlIDogXCJhY2Uva2V5Ym9hcmQvdnNjb2RlXCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBcIkZvbnQgU2l6ZVwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImZvbnRTaXplXCIsXG4gICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiAxMixcbiAgICAgICAgICAgIGRlZmF1bHRzOiBbXG4gICAgICAgICAgICAgICAge2NhcHRpb246IFwiMTJweFwiLCB2YWx1ZTogMTJ9LFxuICAgICAgICAgICAgICAgIHtjYXB0aW9uOiBcIjI0cHhcIiwgdmFsdWU6IDI0fVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBcIlNvZnQgV3JhcFwiOiB7XG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvbkJhclwiLFxuICAgICAgICAgICAgcGF0aDogXCJ3cmFwXCIsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJPZmZcIiwgIHZhbHVlIDogXCJvZmZcIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJWaWV3XCIsIHZhbHVlIDogXCJmcmVlXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwibWFyZ2luXCIsIHZhbHVlIDogXCJwcmludE1hcmdpblwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIjQwXCIsICAgdmFsdWUgOiBcIjQwXCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBcIkN1cnNvciBTdHlsZVwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImN1cnNvclN0eWxlXCIsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJBY2VcIiwgICAgdmFsdWUgOiBcImFjZVwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlNsaW1cIiwgICB2YWx1ZSA6IFwic2xpbVwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlNtb290aFwiLCB2YWx1ZSA6IFwic21vb3RoXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiU21vb3RoIEFuZCBTbGltXCIsIHZhbHVlIDogXCJzbW9vdGggc2xpbVwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIldpZGVcIiwgICB2YWx1ZSA6IFwid2lkZVwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJGb2xkaW5nXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZm9sZFN0eWxlXCIsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiTWFudWFsXCIsIHZhbHVlIDogXCJtYW51YWxcIiB9LFxuICAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiTWFyayBiZWdpblwiLCB2YWx1ZSA6IFwibWFya2JlZ2luXCIgfSxcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIk1hcmsgYmVnaW4gYW5kIGVuZFwiLCB2YWx1ZSA6IFwibWFya2JlZ2luZW5kXCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBcIlNvZnQgVGFic1wiOiBbe1xuICAgICAgICAgICAgcGF0aDogXCJ1c2VTb2Z0VGFic1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGFyaWFMYWJlbDogXCJUYWIgU2l6ZVwiLFxuICAgICAgICAgICAgcGF0aDogXCJ0YWJTaXplXCIsXG4gICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgdmFsdWVzOiBbMiwgMywgNCwgOCwgMTZdXG4gICAgICAgIH1dLFxuICAgICAgICBcIk92ZXJzY3JvbGxcIjoge1xuICAgICAgICAgICAgdHlwZTogXCJidXR0b25CYXJcIixcbiAgICAgICAgICAgIHBhdGg6IFwic2Nyb2xsUGFzdEVuZFwiLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiTm9uZVwiLCAgdmFsdWUgOiAwIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIkhhbGZcIiwgICB2YWx1ZSA6IDAuNSB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJGdWxsXCIsICAgdmFsdWUgOiAxIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgTW9yZToge1xuICAgICAgICBcIkF0b21pYyBzb2Z0IHRhYnNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJuYXZpZ2F0ZVdpdGhpblNvZnRUYWJzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJFbmFibGUgQmVoYXZpb3Vyc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImJlaGF2aW91cnNFbmFibGVkXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJXcmFwIHdpdGggcXVvdGVzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwid3JhcEJlaGF2aW91cnNFbmFibGVkXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJFbmFibGUgQXV0byBJbmRlbnRcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJlbmFibGVBdXRvSW5kZW50XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJGdWxsIExpbmUgU2VsZWN0aW9uXCI6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIixcbiAgICAgICAgICAgIHZhbHVlczogXCJ0ZXh0fGxpbmVcIixcbiAgICAgICAgICAgIHBhdGg6IFwic2VsZWN0aW9uU3R5bGVcIlxuICAgICAgICB9LFxuICAgICAgICBcIkhpZ2hsaWdodCBBY3RpdmUgTGluZVwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImhpZ2hsaWdodEFjdGl2ZUxpbmVcIlxuICAgICAgICB9LFxuICAgICAgICBcIlNob3cgSW52aXNpYmxlc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInNob3dJbnZpc2libGVzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJTaG93IEluZGVudCBHdWlkZXNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJkaXNwbGF5SW5kZW50R3VpZGVzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJIaWdobGlnaHQgSW5kZW50IEd1aWRlc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImhpZ2hsaWdodEluZGVudEd1aWRlc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiUGVyc2lzdGVudCBIU2Nyb2xsYmFyXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiaFNjcm9sbEJhckFsd2F5c1Zpc2libGVcIlxuICAgICAgICB9LFxuICAgICAgICBcIlBlcnNpc3RlbnQgVlNjcm9sbGJhclwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInZTY3JvbGxCYXJBbHdheXNWaXNpYmxlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJBbmltYXRlIHNjcm9sbGluZ1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImFuaW1hdGVkU2Nyb2xsXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJTaG93IEd1dHRlclwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInNob3dHdXR0ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBcIlNob3cgTGluZSBOdW1iZXJzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwic2hvd0xpbmVOdW1iZXJzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJSZWxhdGl2ZSBMaW5lIE51bWJlcnNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJyZWxhdGl2ZUxpbmVOdW1iZXJzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJGaXhlZCBHdXR0ZXIgV2lkdGhcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJmaXhlZFdpZHRoR3V0dGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJTaG93IFByaW50IE1hcmdpblwiOiBbe1xuICAgICAgICAgICAgcGF0aDogXCJzaG93UHJpbnRNYXJnaW5cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBhcmlhTGFiZWw6IFwiUHJpbnQgTWFyZ2luXCIsXG4gICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgcGF0aDogXCJwcmludE1hcmdpbkNvbHVtblwiXG4gICAgICAgIH1dLFxuICAgICAgICBcIkluZGVudGVkIFNvZnQgV3JhcFwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImluZGVudGVkU29mdFdyYXBcIlxuICAgICAgICB9LFxuICAgICAgICBcIkhpZ2hsaWdodCBzZWxlY3RlZCB3b3JkXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiaGlnaGxpZ2h0U2VsZWN0ZWRXb3JkXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJGYWRlIEZvbGQgV2lkZ2V0c1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImZhZGVGb2xkV2lkZ2V0c1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiVXNlIHRleHRhcmVhIGZvciBJTUVcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJ1c2VUZXh0YXJlYUZvcklNRVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiTWVyZ2UgVW5kbyBEZWx0YXNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJtZXJnZVVuZG9EZWx0YXNcIixcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIkFsd2F5c1wiLCAgdmFsdWUgOiBcImFsd2F5c1wiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIk5ldmVyXCIsICAgdmFsdWUgOiBcImZhbHNlXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiVGltZWRcIiwgICB2YWx1ZSA6IFwidHJ1ZVwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJFbGFzdGljIFRhYnN0b3BzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwidXNlRWxhc3RpY1RhYnN0b3BzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJJbmNyZW1lbnRhbCBTZWFyY2hcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJ1c2VJbmNyZW1lbnRhbFNlYXJjaFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiUmVhZC1vbmx5XCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwicmVhZE9ubHlcIlxuICAgICAgICB9LFxuICAgICAgICBcIkNvcHkgd2l0aG91dCBzZWxlY3Rpb25cIjoge1xuICAgICAgICAgICAgcGF0aDogXCJjb3B5V2l0aEVtcHR5U2VsZWN0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJMaXZlIEF1dG9jb21wbGV0aW9uXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZW5hYmxlTGl2ZUF1dG9jb21wbGV0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJDdXN0b20gc2Nyb2xsYmFyXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiY3VzdG9tU2Nyb2xsYmFyXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJVc2UgU1ZHIGd1dHRlciBpY29uc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInVzZVN2Z0d1dHRlckljb25zXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJBbm5vdGF0aW9ucyBmb3IgZm9sZGVkIGxpbmVzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwic2hvd0ZvbGRlZEFubm90YXRpb25zXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJLZXlib2FyZCBBY2Nlc3NpYmlsaXR5IE1vZGVcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJlbmFibGVLZXlib2FyZEFjY2Vzc2liaWxpdHlcIlxuICAgICAgICB9LFxuICAgICAgICBcIkd1dHRlciB0b29sdGlwIGZvbGxvd3MgbW91c2VcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJ0b29sdGlwRm9sbG93c01vdXNlXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHRydWVcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmNsYXNzIE9wdGlvblBhbmVsIHtcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW2VsZW1lbnRdXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZWRpdG9yLCBlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yO1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGVsZW1lbnQgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGhpcy5ncm91cHMgPSBbXTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0ge307XG4gICAgfVxuICAgIFxuICAgIGFkZChjb25maWcpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5NYWluKVxuICAgICAgICAgICAgb29wLm1peGluKG9wdGlvbkdyb3Vwcy5NYWluLCBjb25maWcuTWFpbik7XG4gICAgICAgIGlmIChjb25maWcuTW9yZSlcbiAgICAgICAgICAgIG9vcC5taXhpbihvcHRpb25Hcm91cHMuTW9yZSwgY29uZmlnLk1vcmUpO1xuICAgIH1cblxuICBcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGJ1aWxkRG9tKFtcInRhYmxlXCIsIHtyb2xlOiBcInByZXNlbnRhdGlvblwiLCBpZDogXCJjb250cm9sc1wifSwgXG4gICAgICAgICAgICB0aGlzLnJlbmRlck9wdGlvbkdyb3VwKG9wdGlvbkdyb3Vwcy5NYWluKSxcbiAgICAgICAgICAgIFtcInRyXCIsIG51bGwsIFtcInRkXCIsIHtjb2xzcGFuOiAyfSxcbiAgICAgICAgICAgICAgICBbXCJ0YWJsZVwiLCB7cm9sZTogXCJwcmVzZW50YXRpb25cIiwgaWQ6IFwibW9yZS1jb250cm9sc1wifSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyT3B0aW9uR3JvdXAob3B0aW9uR3JvdXBzLk1vcmUpXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgXV0sXG4gICAgICAgICAgICBbXCJ0clwiLCBudWxsLCBbXCJ0ZFwiLCB7Y29sc3BhbjogMn0sIFwidmVyc2lvbiBcIiArIGNvbmZpZy52ZXJzaW9uXV1cbiAgICAgICAgXSwgdGhpcy5jb250YWluZXIpO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXJPcHRpb25Hcm91cChncm91cCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoZ3JvdXApLm1hcChmdW5jdGlvbihrZXksIGkpIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gZ3JvdXBba2V5XTtcbiAgICAgICAgICAgIGlmICghaXRlbS5wb3NpdGlvbilcbiAgICAgICAgICAgICAgICBpdGVtLnBvc2l0aW9uID0gaSAvIDEwMDAwO1xuICAgICAgICAgICAgaWYgKCFpdGVtLmxhYmVsKVxuICAgICAgICAgICAgICAgIGl0ZW0ubGFiZWwgPSBrZXk7XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfSkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5wb3NpdGlvbiAtIGIucG9zaXRpb247XG4gICAgICAgIH0pLm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJPcHRpb24oaXRlbS5sYWJlbCwgaXRlbSk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uXG4gICAgICovXG4gICAgcmVuZGVyT3B0aW9uQ29udHJvbChrZXksIG9wdGlvbikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24ubWFwKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5yZW5kZXJPcHRpb25Db250cm9sKGtleSwgeCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKipAdHlwZSB7YW55fSovXG4gICAgICAgIHZhciBjb250cm9sO1xuICAgICAgICBcbiAgICAgICAgdmFyIHZhbHVlID0gc2VsZi5nZXRPcHRpb24ob3B0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChvcHRpb24udmFsdWVzICYmIG9wdGlvbi50eXBlICE9IFwiY2hlY2tib3hcIikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24udmFsdWVzID09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlcyA9IG9wdGlvbi52YWx1ZXMuc3BsaXQoXCJ8XCIpO1xuICAgICAgICAgICAgb3B0aW9uLml0ZW1zID0gb3B0aW9uLnZhbHVlcy5tYXAoZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiB2LCBuYW1lOiB2IH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKG9wdGlvbi50eXBlID09IFwiYnV0dG9uQmFyXCIpIHtcbiAgICAgICAgICAgIGNvbnRyb2wgPSBbXCJkaXZcIiwge3JvbGU6IFwiZ3JvdXBcIiwgXCJhcmlhLWxhYmVsbGVkYnlcIjogb3B0aW9uLnBhdGggKyBcIi1sYWJlbFwifSwgb3B0aW9uLml0ZW1zLm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcImJ1dHRvblwiLCB7IFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbS52YWx1ZSwgXG4gICAgICAgICAgICAgICAgICAgIGFjZV9zZWxlY3RlZF9idXR0b246IHZhbHVlID09IGl0ZW0udmFsdWUsIFxuICAgICAgICAgICAgICAgICAgICAnYXJpYS1wcmVzc2VkJzogdmFsdWUgPT0gaXRlbS52YWx1ZSwgXG4gICAgICAgICAgICAgICAgICAgIG9uY2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRPcHRpb24ob3B0aW9uLCBpdGVtLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub2RlcyA9IHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKFwiW2FjZV9zZWxlY3RlZF9idXR0b25dXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzW2ldLnJlbW92ZUF0dHJpYnV0ZShcImFjZV9zZWxlY3RlZF9idXR0b25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXNbaV0uc2V0QXR0cmlidXRlKFwiYXJpYS1wcmVzc2VkXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiYWNlX3NlbGVjdGVkX2J1dHRvblwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiYXJpYS1wcmVzc2VkXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIH0sIGl0ZW0uZGVzYyB8fCBpdGVtLmNhcHRpb24gfHwgaXRlbS5uYW1lXTtcbiAgICAgICAgICAgIH0pXTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb24udHlwZSA9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBjb250cm9sID0gW1wiaW5wdXRcIiwge3R5cGU6IFwibnVtYmVyXCIsIHZhbHVlOiB2YWx1ZSB8fCBvcHRpb24uZGVmYXVsdFZhbHVlLCBzdHlsZTpcIndpZHRoOjNlbVwiLCBvbmlucHV0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldE9wdGlvbihvcHRpb24sIHBhcnNlSW50KHRoaXMudmFsdWUpKTtcbiAgICAgICAgICAgIH19XTtcbiAgICAgICAgICAgIGlmIChvcHRpb24uYXJpYUxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbFsxXVtcImFyaWEtbGFiZWxcIl0gPSBvcHRpb24uYXJpYUxhYmVsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250cm9sWzFdLmlkID0ga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbi5kZWZhdWx0cykge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wgPSBbY29udHJvbCwgb3B0aW9uLmRlZmF1bHRzLm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJidXR0b25cIiwge29uY2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdGhpcy5wYXJlbnROb2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGl0ZW0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5vbmlucHV0KCk7XG4gICAgICAgICAgICAgICAgICAgIH19LCBpdGVtLmNhcHRpb25dO1xuICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb24uaXRlbXMpIHtcbiAgICAgICAgICAgIHZhciBidWlsZEl0ZW1zID0gZnVuY3Rpb24oaXRlbXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXMubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcIm9wdGlvblwiLCB7IHZhbHVlOiBpdGVtLnZhbHVlIHx8IGl0ZW0ubmFtZSB9LCBpdGVtLmRlc2MgfHwgaXRlbS5jYXB0aW9uIHx8IGl0ZW0ubmFtZV07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgaXRlbXMgPSBBcnJheS5pc0FycmF5KG9wdGlvbi5pdGVtcykgXG4gICAgICAgICAgICAgICAgPyBidWlsZEl0ZW1zKG9wdGlvbi5pdGVtcylcbiAgICAgICAgICAgICAgICA6IE9iamVjdC5rZXlzKG9wdGlvbi5pdGVtcykubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wib3B0Z3JvdXBcIiwge1wibGFiZWxcIjoga2V5fSwgYnVpbGRJdGVtcyhvcHRpb24uaXRlbXNba2V5XSldO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udHJvbCA9IFtcInNlbGVjdFwiLCB7IGlkOiBrZXksIHZhbHVlOiB2YWx1ZSwgb25jaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0T3B0aW9uKG9wdGlvbiwgdGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB9IH0sIGl0ZW1zXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLnZhbHVlcyA9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZXMgPSBvcHRpb24udmFsdWVzLnNwbGl0KFwifFwiKTtcbiAgICAgICAgICAgIGlmIChvcHRpb24udmFsdWVzKSB2YWx1ZSA9IHZhbHVlID09IG9wdGlvbi52YWx1ZXNbMV07XG4gICAgICAgICAgICBjb250cm9sID0gW1wiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGlkOiBrZXksIGNoZWNrZWQ6IHZhbHVlIHx8IG51bGwsIG9uY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmNoZWNrZWQ7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi52YWx1ZXMpIHZhbHVlID0gb3B0aW9uLnZhbHVlc1t2YWx1ZSA/IDEgOiAwXTtcbiAgICAgICAgICAgICAgICBzZWxmLnNldE9wdGlvbihvcHRpb24sIHZhbHVlKTtcbiAgICAgICAgICAgIH19XTtcbiAgICAgICAgICAgIGlmIChvcHRpb24udHlwZSA9PSBcImNoZWNrZWROdW1iZXJcIikge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wgPSBbY29udHJvbCwgW11dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250cm9sO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcGFyYW0gb3B0aW9uXG4gICAgICovXG4gICAgcmVuZGVyT3B0aW9uKGtleSwgb3B0aW9uKSB7XG4gICAgICAgIGlmIChvcHRpb24ucGF0aCAmJiAhb3B0aW9uLm9uY2hhbmdlICYmICF0aGlzLmVkaXRvci4kb3B0aW9uc1tvcHRpb24ucGF0aF0pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBwYXRoID0gQXJyYXkuaXNBcnJheShvcHRpb24pID8gb3B0aW9uWzBdLnBhdGggOiBvcHRpb24ucGF0aDtcbiAgICAgICAgdGhpcy5vcHRpb25zW3BhdGhdID0gb3B0aW9uO1xuICAgICAgICB2YXIgc2FmZUtleSA9IFwiLVwiICsgcGF0aDtcbiAgICAgICAgdmFyIHNhZmVJZCA9IHBhdGggKyBcIi1sYWJlbFwiO1xuICAgICAgICB2YXIgY29udHJvbCA9IHRoaXMucmVuZGVyT3B0aW9uQ29udHJvbChzYWZlS2V5LCBvcHRpb24pO1xuICAgICAgICByZXR1cm4gW1widHJcIiwge2NsYXNzOiBcImFjZV9vcHRpb25zTWVudUVudHJ5XCJ9LCBbXCJ0ZFwiLFxuICAgICAgICAgICAgW1wibGFiZWxcIiwge2Zvcjogc2FmZUtleSwgaWQ6IHNhZmVJZH0sIGtleV1cbiAgICAgICAgXSwgW1widGRcIiwgY29udHJvbF1dO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVtYmVyIHwgT2JqZWN0fSBvcHRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bWJlciB8IGJvb2xlYW59IHZhbHVlXG4gICAgICovXG4gICAgc2V0T3B0aW9uKG9wdGlvbiwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIG9wdGlvbiA9IHRoaXMub3B0aW9uc1tvcHRpb25dO1xuICAgICAgICBpZiAodmFsdWUgPT0gXCJmYWxzZVwiKSB2YWx1ZSA9IGZhbHNlO1xuICAgICAgICBpZiAodmFsdWUgPT0gXCJ0cnVlXCIpIHZhbHVlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHZhbHVlID09IFwibnVsbFwiKSB2YWx1ZSA9IG51bGw7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBcInVuZGVmaW5lZFwiKSB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiICYmIHBhcnNlRmxvYXQodmFsdWUpLnRvU3RyaW5nKCkgPT0gdmFsdWUpXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICBpZiAob3B0aW9uLm9uY2hhbmdlKVxuICAgICAgICAgICAgb3B0aW9uLm9uY2hhbmdlKHZhbHVlKTtcbiAgICAgICAgZWxzZSBpZiAob3B0aW9uLnBhdGgpXG4gICAgICAgICAgICB0aGlzLmVkaXRvci5zZXRPcHRpb24ob3B0aW9uLnBhdGgsIHZhbHVlKTtcbiAgICAgICAgdGhpcy5fc2lnbmFsKFwic2V0T3B0aW9uXCIsIHtuYW1lOiBvcHRpb24ucGF0aCwgdmFsdWU6IHZhbHVlfSk7XG4gICAgfVxuICAgIFxuICAgIGdldE9wdGlvbihvcHRpb24pIHtcbiAgICAgICAgaWYgKG9wdGlvbi5nZXRWYWx1ZSlcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24uZ2V0VmFsdWUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yLmdldE9wdGlvbihvcHRpb24ucGF0aCk7XG4gICAgfVxufVxub29wLmltcGxlbWVudChPcHRpb25QYW5lbC5wcm90b3R5cGUsIEV2ZW50RW1pdHRlcik7XG5cbmV4cG9ydHMuT3B0aW9uUGFuZWwgPSBPcHRpb25QYW5lbDtcbiIsIi8qanNsaW50IGluZGVudDogNCwgbWF4ZXJyOiA1MCwgd2hpdGU6IHRydWUsIGJyb3dzZXI6IHRydWUsIHZhcnM6IHRydWUqL1xuLypnbG9iYWwgZGVmaW5lLCByZXF1aXJlICovXG5cbi8qKlxuICogU2hvdyBTZXR0aW5ncyBNZW51XG4gKiBAZmlsZU92ZXJ2aWV3IFNob3cgU2V0dGluZ3MgTWVudSA8YnIgLz5cbiAqIERpc3BsYXlzIGFuIGludGVyYWN0aXZlIHNldHRpbmdzIG1lbnUgbW9zdGx5IGdlbmVyYXRlZCBvbiB0aGUgZmx5IGJhc2VkIG9uXG4gKiAgdGhlIGN1cnJlbnQgc3RhdGUgb2YgdGhlIGVkaXRvci5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG52YXIgT3B0aW9uUGFuZWwgPSByZXF1aXJlKFwiLi9vcHRpb25zXCIpLk9wdGlvblBhbmVsO1xudmFyIG92ZXJsYXlQYWdlID0gcmVxdWlyZSgnLi9tZW51X3Rvb2xzL292ZXJsYXlfcGFnZScpLm92ZXJsYXlQYWdlO1xuXG4vKipcbiAqIFRoaXMgZGlzcGxheXMgdGhlIHNldHRpbmdzIG1lbnUgaWYgaXQgaXMgbm90IGFscmVhZHkgYmVpbmcgc2hvd24uXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHBhcmFtIHtpbXBvcnQoXCIuLi9lZGl0b3JcIikuRWRpdG9yfSBlZGl0b3IgQW4gaW5zdGFuY2Ugb2YgdGhlIGFjZSBlZGl0b3IuXG4gKi9cbmZ1bmN0aW9uIHNob3dTZXR0aW5nc01lbnUoZWRpdG9yKSB7XG4gICAgLy8gc2hvdyBpZiB0aGUgbWVudSBpc24ndCBvcGVuIGFscmVhZHkuXG4gICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYWNlX3NldHRpbmdzbWVudScpKSB7XG4gICAgICAgIHZhciBvcHRpb25zID0gbmV3IE9wdGlvblBhbmVsKGVkaXRvcik7XG4gICAgICAgIG9wdGlvbnMucmVuZGVyKCk7XG4gICAgICAgIG9wdGlvbnMuY29udGFpbmVyLmlkID0gXCJhY2Vfc2V0dGluZ3NtZW51XCI7XG4gICAgICAgIG92ZXJsYXlQYWdlKGVkaXRvciwgb3B0aW9ucy5jb250YWluZXIpO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIG9wdGlvbnMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJzZWxlY3QsaW5wdXQsYnV0dG9uLGNoZWNrYm94XCIpLmZvY3VzKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIHRoZSBzZXR0aW5ncyBtZW51IGV4dGVuc2lvbi4gSXQgYWRkcyB0aGUgc2hvd1NldHRpbmdzTWVudVxuICogIG1ldGhvZCB0byB0aGUgZ2l2ZW4gZWRpdG9yIG9iamVjdCBhbmQgYWRkcyB0aGUgc2hvd1NldHRpbmdzTWVudSBjb21tYW5kXG4gKiAgdG8gdGhlIGVkaXRvciB3aXRoIGFwcHJvcHJpYXRlIGtleWJvYXJkIHNob3J0Y3V0cy5cbiAqL1xubW9kdWxlLmV4cG9ydHMuaW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBFZGl0b3IgPSByZXF1aXJlKFwiLi4vZWRpdG9yXCIpLkVkaXRvcjtcbiAgICBFZGl0b3IucHJvdG90eXBlLnNob3dTZXR0aW5nc01lbnUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgc2hvd1NldHRpbmdzTWVudSh0aGlzKTtcbiAgICB9O1xufTtcbiIsIi8qKlxuICogR2VuZXJhdGVzIGEgbGlzdCBvZiB0aGVtZXMgYXZhaWxhYmxlIHdoZW4gYWNlIHdhcyBidWlsdC5cbiAqIEBmaWxlT3ZlcnZpZXcgR2VuZXJhdGVzIGEgbGlzdCBvZiB0aGVtZXMgYXZhaWxhYmxlIHdoZW4gYWNlIHdhcyBidWlsdC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB0aGVtZURhdGEgPSBbXG4gICAgW1wiQ2hyb21lXCIgICAgICAgICBdLFxuICAgIFtcIkNsb3Vkc1wiICAgICAgICAgXSxcbiAgICBbXCJDcmltc29uIEVkaXRvclwiIF0sXG4gICAgW1wiRGF3blwiICAgICAgICAgICBdLFxuICAgIFtcIkRyZWFtd2VhdmVyXCIgICAgXSxcbiAgICBbXCJFY2xpcHNlXCIgICAgICAgIF0sXG4gICAgW1wiR2l0SHViXCIgICAgICAgICBdLFxuICAgIFtcIklQbGFzdGljXCIgICAgICAgXSxcbiAgICBbXCJTb2xhcml6ZWQgTGlnaHRcIl0sXG4gICAgW1wiVGV4dE1hdGVcIiAgICAgICBdLFxuICAgIFtcIlRvbW9ycm93XCIgICAgICAgXSxcbiAgICBbXCJYQ29kZVwiICAgICAgICAgIF0sXG4gICAgW1wiS3Vyb2lyXCJdLFxuICAgIFtcIkthdHplbk1pbGNoXCJdLFxuICAgIFtcIlNRTCBTZXJ2ZXJcIiAgICAgICAgICAgLFwic3Fsc2VydmVyXCIgICAgICAgICAgICAgICAsIFwibGlnaHRcIl0sXG4gICAgW1wiQ2xvdWRFZGl0b3JcIiAgICAgICAgICAsXCJjbG91ZF9lZGl0b3JcIiAgICAgICAgICAgICwgXCJsaWdodFwiXSxcbiAgICBbXCJBbWJpYW5jZVwiICAgICAgICAgICAgICxcImFtYmlhbmNlXCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkNoYW9zXCIgICAgICAgICAgICAgICAgLFwiY2hhb3NcIiAgICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiQ2xvdWRzIE1pZG5pZ2h0XCIgICAgICAsXCJjbG91ZHNfbWlkbmlnaHRcIiAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJEcmFjdWxhXCIgICAgICAgICAgICAgICxcIlwiICAgICAgICAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkNvYmFsdFwiICAgICAgICAgICAgICAgLFwiY29iYWx0XCIgICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiR3J1dmJveFwiICAgICAgICAgICAgICAsXCJncnV2Ym94XCIgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJHcmVlbiBvbiBCbGFja1wiICAgICAgICxcImdvYlwiICAgICAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcImlkbGUgRmluZ2Vyc1wiICAgICAgICAgLFwiaWRsZV9maW5nZXJzXCIgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wia3JUaGVtZVwiICAgICAgICAgICAgICAsXCJrcl90aGVtZVwiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJNZXJiaXZvcmVcIiAgICAgICAgICAgICxcIm1lcmJpdm9yZVwiICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk1lcmJpdm9yZSBTb2Z0XCIgICAgICAgLFwibWVyYml2b3JlX3NvZnRcIiAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiTW9ubyBJbmR1c3RyaWFsXCIgICAgICAsXCJtb25vX2luZHVzdHJpYWxcIiAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJNb25va2FpXCIgICAgICAgICAgICAgICxcIm1vbm9rYWlcIiAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk5vcmQgRGFya1wiICAgICAgICAgICAgLFwibm9yZF9kYXJrXCIgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiT25lIERhcmtcIiAgICAgICAgICAgICAsXCJvbmVfZGFya1wiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJQYXN0ZWwgb24gZGFya1wiICAgICAgICxcInBhc3RlbF9vbl9kYXJrXCIgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlNvbGFyaXplZCBEYXJrXCIgICAgICAgLFwic29sYXJpemVkX2RhcmtcIiAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVGVybWluYWxcIiAgICAgICAgICAgICAsXCJ0ZXJtaW5hbFwiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUb21vcnJvdyBOaWdodFwiICAgICAgICxcInRvbW9ycm93X25pZ2h0XCIgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlRvbW9ycm93IE5pZ2h0IEJsdWVcIiAgLFwidG9tb3Jyb3dfbmlnaHRfYmx1ZVwiICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVG9tb3Jyb3cgTmlnaHQgQnJpZ2h0XCIsXCJ0b21vcnJvd19uaWdodF9icmlnaHRcIiAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUb21vcnJvdyBOaWdodCA4MHNcIiAgICxcInRvbW9ycm93X25pZ2h0X2VpZ2h0aWVzXCIgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlR3aWxpZ2h0XCIgICAgICAgICAgICAgLFwidHdpbGlnaHRcIiAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVmlicmFudCBJbmtcIiAgICAgICAgICAsXCJ2aWJyYW50X2lua1wiICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJHaXRIdWIgRGFya1wiICAgICAgICAgICxcImdpdGh1Yl9kYXJrXCIgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkNsb3VkRWRpdG9yIERhcmtcIiAgICAgLFwiY2xvdWRfZWRpdG9yX2RhcmtcIiAgICAgICAsICBcImRhcmtcIl1cbl07XG5cblxuZXhwb3J0cy50aGVtZXNCeU5hbWUgPSB7fTtcblxuLyoqXG4gKiBBbiBhcnJheSBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IGF2YWlsYWJsZSB0aGVtZXMuXG4gKi9cbmV4cG9ydHMudGhlbWVzID0gdGhlbWVEYXRhLm1hcChmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIG5hbWUgPSBkYXRhWzFdIHx8IGRhdGFbMF0ucmVwbGFjZSgvIC9nLCBcIl9cIikudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgdGhlbWUgPSB7XG4gICAgICAgIGNhcHRpb246IGRhdGFbMF0sXG4gICAgICAgIHRoZW1lOiBcImFjZS90aGVtZS9cIiArIG5hbWUsXG4gICAgICAgIGlzRGFyazogZGF0YVsyXSA9PSBcImRhcmtcIixcbiAgICAgICAgbmFtZTogbmFtZVxuICAgIH07XG4gICAgZXhwb3J0cy50aGVtZXNCeU5hbWVbbmFtZV0gPSB0aGVtZTtcbiAgICByZXR1cm4gdGhlbWU7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==