(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[3056,352,4953],{

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
 * @param {Element} contentElement Any element which may be presented inside
 *  a div.
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
 * @returns {object} Returns an object containing information about the
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
    
    renderOptionControl(key, option) {
        var self = this;
        if (Array.isArray(option)) {
            return option.map(function(x) {
                return self.renderOptionControl(key, x);
            });
        }
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
    ["GitHub Dark"          ,"github_dark"             ,  "dark"]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjMwNTYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7QUFDYixVQUFVLG1CQUFPLENBQUMsSUFBZTtBQUNqQyxjQUFjLG1CQUFPLENBQUMsS0FBcUI7QUFDM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7O0FBRUEsMEJBQTBCO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsWUFBWTtBQUNuRCwwQkFBMEIsT0FBTyxVQUFVLFFBQVEsUUFBUTtBQUMzRCx3QkFBd0I7QUFDeEIsd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7O0FDL0RZOztBQUViO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L21lbnVfdG9vbHMvb3ZlcmxheV9wYWdlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tZW51X3Rvb2xzL3NldHRpbmdzX21lbnUuY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tb2RlbGlzdC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvdGhlbWVsaXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qanNsaW50IGluZGVudDogNCwgbWF4ZXJyOiA1MCwgd2hpdGU6IHRydWUsIGJyb3dzZXI6IHRydWUsIHZhcnM6IHRydWUqL1xuLypnbG9iYWwgZGVmaW5lLCByZXF1aXJlICovXG5cbi8qKlxuICogT3ZlcmxheSBQYWdlXG4gKiBAZmlsZU92ZXJ2aWV3IE92ZXJsYXkgUGFnZSA8YnIgLz5cbiAqIEdlbmVyYXRlcyBhbiBvdmVybGF5IGZvciBkaXNwbGF5aW5nIG1lbnVzLiBUaGUgb3ZlcmxheSBpcyBhbiBhYnNvbHV0ZWx5XG4gKiAgcG9zaXRpb25lZCBkaXYuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICovXG5cbid1c2Ugc3RyaWN0JztcbnZhciBkb20gPSByZXF1aXJlKFwiLi4vLi4vbGliL2RvbVwiKTtcbnZhciBjc3NUZXh0ID0gcmVxdWlyZShcIi4vc2V0dGluZ3NfbWVudS5jc3NcIik7XG5kb20uaW1wb3J0Q3NzU3RyaW5nKGNzc1RleHQsIFwic2V0dGluZ3NfbWVudS5jc3NcIiwgZmFsc2UpO1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhbiBvdmVybGF5IGZvciBkaXNwbGF5aW5nIG1lbnVzLiBUaGUgb3ZlcmxheSBpcyBhbiBhYnNvbHV0ZWx5XG4gKiAgcG9zaXRpb25lZCBkaXYuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHBhcmFtIHtFbGVtZW50fSBjb250ZW50RWxlbWVudCBBbnkgZWxlbWVudCB3aGljaCBtYXkgYmUgcHJlc2VudGVkIGluc2lkZVxuICogIGEgZGl2LlxuICovXG5cbm1vZHVsZS5leHBvcnRzLm92ZXJsYXlQYWdlID0gZnVuY3Rpb24gb3ZlcmxheVBhZ2UoZWRpdG9yLCBjb250ZW50RWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICB2YXIgY2xvc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGlnbm9yZUZvY3VzT3V0ID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkb2N1bWVudEVzY0xpc3RlbmVyKGUpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgaWYgKCFjbG9zZXIpIHJldHVybjtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGRvY3VtZW50RXNjTGlzdGVuZXIpO1xuICAgICAgICBjbG9zZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjbG9zZXIpO1xuICAgICAgICBpZiAoZWRpdG9yKSB7XG4gICAgICAgICAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBjbG9zZXIgPSBudWxsO1xuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgb3ZlcmxheSBpcyBjbG9zZWQgd2hlbiB1c2VyIGNsaWNrcyBvdXRzaWRlIG9mIGl0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaWdub3JlICAgICAgSWYgc2V0IHRvIHRydWUgb3ZlcmxheSBzdGF5cyBvcGVuIHdoZW4gZm9jdXMgbW92ZXMgdG8gYW5vdGhlciBwYXJ0IG9mIHRoZSBlZGl0b3IuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0SWdub3JlRm9jdXNPdXQoaWdub3JlKSB7XG4gICAgICAgIGlnbm9yZUZvY3VzT3V0ID0gaWdub3JlO1xuICAgICAgICBpZiAoaWdub3JlKSB7XG4gICAgICAgICAgICBjbG9zZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgICAgY29udGVudEVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VyLnN0eWxlLmNzc1RleHQgPSAnbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyAnICtcbiAgICAgICAgJ3Bvc2l0aW9uOiBmaXhlZDsgdG9wOjA7IGJvdHRvbTowOyBsZWZ0OjA7IHJpZ2h0OjA7JyArXG4gICAgICAgICd6LWluZGV4OiA5OTkwOyAnICtcbiAgICAgICAgKGVkaXRvciA/ICdiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7JyA6ICcnKTtcbiAgICBjbG9zZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghaWdub3JlRm9jdXNPdXQpIHtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBjbGljayBjbG9zZXIgaWYgZXNjIGtleSBpcyBwcmVzc2VkXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGRvY3VtZW50RXNjTGlzdGVuZXIpO1xuXG4gICAgY29udGVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgY2xvc2VyLmFwcGVuZENoaWxkKGNvbnRlbnRFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNsb3Nlcik7XG4gICAgaWYgKGVkaXRvcikge1xuICAgICAgICBlZGl0b3IuYmx1cigpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBjbG9zZTogY2xvc2UsXG4gICAgICAgIHNldElnbm9yZUZvY3VzT3V0OiBzZXRJZ25vcmVGb2N1c091dFxuICAgIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBgI2FjZV9zZXR0aW5nc21lbnUsICNrYnNob3J0Y3V0bWVudSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0Y3RjdGNztcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgYm94LXNoYWRvdzogLTVweCA0cHggNXB4IHJnYmEoMTI2LCAxMjYsIDEyNiwgMC41NSk7XG4gICAgcGFkZGluZzogMWVtIDAuNWVtIDJlbSAxZW07XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG1hcmdpbjogMDtcbiAgICBib3R0b206IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgdG9wOiAwO1xuICAgIHotaW5kZXg6IDk5OTE7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4uYWNlX2RhcmsgI2FjZV9zZXR0aW5nc21lbnUsIC5hY2VfZGFyayAja2JzaG9ydGN1dG1lbnUge1xuICAgIGJveC1zaGFkb3c6IC0yMHB4IDEwcHggMjVweCByZ2JhKDEyNiwgMTI2LCAxMjYsIDAuMjUpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcbiAgICBjb2xvcjogYmxhY2s7XG59XG5cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeTpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMDAsIDEwMCwgMTAwLCAwLjEpO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzXG59XG5cbi5hY2VfY2xvc2VCdXR0b24ge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjQ1LCAxNDYsIDE0NiwgMC41KTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRjQ4QThBO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBwYWRkaW5nOiA3cHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAtOHB4O1xuICAgIHRvcDogLThweDtcbiAgICB6LWluZGV4OiAxMDAwMDA7XG59XG4uYWNlX2Nsb3NlQnV0dG9ue1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjQ1LCAxNDYsIDE0NiwgMC45KTtcbn1cbi5hY2Vfb3B0aW9uc01lbnVLZXkge1xuICAgIGNvbG9yOiBkYXJrc2xhdGVibHVlO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuLmFjZV9vcHRpb25zTWVudUNvbW1hbmQge1xuICAgIGNvbG9yOiBkYXJrY3lhbjtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGlucHV0LCAuYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uIHtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuXG4uYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uW2FjZV9zZWxlY3RlZF9idXR0b249dHJ1ZV0ge1xuICAgIGJhY2tncm91bmQ6ICNlN2U3ZTc7XG4gICAgYm94LXNoYWRvdzogMXB4IDBweCAycHggMHB4ICNhZGFkYWQgaW5zZXQ7XG4gICAgYm9yZGVyLWNvbG9yOiAjYWRhZGFkO1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICAgIG1hcmdpbjogMHB4O1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvbjpob3ZlcntcbiAgICBiYWNrZ3JvdW5kOiAjZjBmMGYwO1xufWA7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1vZGVzID0gW107XG4vKipcbiAqIFN1Z2dlc3RzIGEgbW9kZSBiYXNlZCBvbiB0aGUgZmlsZSBleHRlbnNpb24gcHJlc2VudCBpbiB0aGUgZ2l2ZW4gcGF0aFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gdGhlIGZpbGVcbiAqIEByZXR1cm5zIHtvYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlXG4gKiAgc3VnZ2VzdGVkIG1vZGUuXG4gKi9cbmZ1bmN0aW9uIGdldE1vZGVGb3JQYXRoKHBhdGgpIHtcbiAgICB2YXIgbW9kZSA9IG1vZGVzQnlOYW1lLnRleHQ7XG4gICAgdmFyIGZpbGVOYW1lID0gcGF0aC5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobW9kZXNbaV0uc3VwcG9ydHNGaWxlKGZpbGVOYW1lKSkge1xuICAgICAgICAgICAgbW9kZSA9IG1vZGVzW2ldO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1vZGU7XG59XG5cbmNsYXNzIE1vZGUge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGNhcHRpb24sIGV4dGVuc2lvbnMpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jYXB0aW9uID0gY2FwdGlvbjtcbiAgICAgICAgdGhpcy5tb2RlID0gXCJhY2UvbW9kZS9cIiArIG5hbWU7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnM7XG4gICAgICAgIHZhciByZTtcbiAgICAgICAgaWYgKC9cXF4vLnRlc3QoZXh0ZW5zaW9ucykpIHtcbiAgICAgICAgICAgIHJlID0gZXh0ZW5zaW9ucy5yZXBsYWNlKC9cXHwoXFxeKT8vZywgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIkfFwiICsgKGIgPyBcIl5cIiA6IFwiXi4qXFxcXC5cIik7XG4gICAgICAgICAgICB9KSArIFwiJFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmUgPSBcIl4uKlxcXFwuKFwiICsgZXh0ZW5zaW9ucyArIFwiKSRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZXh0UmUgPSBuZXcgUmVnRXhwKHJlLCBcImdpXCIpO1xuICAgIH1cblxuICAgIHN1cHBvcnRzRmlsZShmaWxlbmFtZSkge1xuICAgICAgICByZXR1cm4gZmlsZW5hbWUubWF0Y2godGhpcy5leHRSZSk7XG4gICAgfVxufVxuXG4vLyB0b2RvIGZpcnN0bGluZW1hdGNoXG52YXIgc3VwcG9ydGVkTW9kZXMgPSB7XG4gICAgQUJBUDogICAgICAgIFtcImFiYXBcIl0sXG4gICAgQUJDOiAgICAgICAgIFtcImFiY1wiXSxcbiAgICBBY3Rpb25TY3JpcHQ6W1wiYXNcIl0sXG4gICAgQURBOiAgICAgICAgIFtcImFkYXxhZGJcIl0sXG4gICAgQWxkYTogICAgICAgIFtcImFsZGFcIl0sXG4gICAgQXBhY2hlX0NvbmY6IFtcIl5odGFjY2Vzc3xeaHRncm91cHN8Xmh0cGFzc3dkfF5jb25mfGh0YWNjZXNzfGh0Z3JvdXBzfGh0cGFzc3dkXCJdLFxuICAgIEFwZXg6ICAgICAgICBbXCJhcGV4fGNsc3x0cmlnZ2VyfHRnclwiXSxcbiAgICBBUUw6ICAgICAgICAgW1wiYXFsXCJdLFxuICAgIEFzY2lpRG9jOiAgICBbXCJhc2NpaWRvY3xhZG9jXCJdLFxuICAgIEFTTDogICAgICAgICBbXCJkc2x8YXNsfGFzbC5qc29uXCJdLFxuICAgIEFzc2VtYmx5X3g4NjpbXCJhc218YVwiXSxcbiAgICBBc3RybzogICAgICAgW1wiYXN0cm9cIl0sXG4gICAgQXV0b0hvdEtleTogIFtcImFoa1wiXSxcbiAgICBCYXRjaEZpbGU6ICAgW1wiYmF0fGNtZFwiXSxcbiAgICBCaWJUZVg6ICAgICAgW1wiYmliXCJdLFxuICAgIENfQ3BwOiAgICAgICBbXCJjcHB8Y3xjY3xjeHh8aHxoaHxocHB8aW5vXCJdLFxuICAgIEM5U2VhcmNoOiAgICBbXCJjOXNlYXJjaF9yZXN1bHRzXCJdLFxuICAgIENpcnJ1OiAgICAgICBbXCJjaXJydXxjclwiXSxcbiAgICBDbG9qdXJlOiAgICAgW1wiY2xqfGNsanNcIl0sXG4gICAgQ29ib2w6ICAgICAgIFtcIkNCTHxDT0JcIl0sXG4gICAgY29mZmVlOiAgICAgIFtcImNvZmZlZXxjZnxjc29ufF5DYWtlZmlsZVwiXSxcbiAgICBDb2xkRnVzaW9uOiAgW1wiY2ZtfGNmY1wiXSxcbiAgICBDcnlzdGFsOiAgICAgW1wiY3JcIl0sXG4gICAgQ1NoYXJwOiAgICAgIFtcImNzXCJdLFxuICAgIENzb3VuZF9Eb2N1bWVudDogW1wiY3NkXCJdLFxuICAgIENzb3VuZF9PcmNoZXN0cmE6IFtcIm9yY1wiXSxcbiAgICBDc291bmRfU2NvcmU6IFtcInNjb1wiXSxcbiAgICBDU1M6ICAgICAgICAgW1wiY3NzXCJdLFxuICAgIEN1cmx5OiAgICAgICBbXCJjdXJseVwiXSxcbiAgICBDdXR0bGVmaXNoOiAgW1wiY29uZlwiXSxcbiAgICBEOiAgICAgICAgICAgW1wiZHxkaVwiXSxcbiAgICBEYXJ0OiAgICAgICAgW1wiZGFydFwiXSxcbiAgICBEaWZmOiAgICAgICAgW1wiZGlmZnxwYXRjaFwiXSxcbiAgICBEamFuZ286ICAgICAgW1wiZGp0fGh0bWwuZGp0fGRqLmh0bWx8ZGpodG1sXCJdLFxuICAgIERvY2tlcmZpbGU6ICBbXCJeRG9ja2VyZmlsZVwiXSxcbiAgICBEb3Q6ICAgICAgICAgW1wiZG90XCJdLFxuICAgIERyb29sczogICAgICBbXCJkcmxcIl0sXG4gICAgRWRpZmFjdDogICAgIFtcImVkaVwiXSxcbiAgICBFaWZmZWw6ICAgICAgW1wiZXxnZVwiXSxcbiAgICBFSlM6ICAgICAgICAgW1wiZWpzXCJdLFxuICAgIEVsaXhpcjogICAgICBbXCJleHxleHNcIl0sXG4gICAgRWxtOiAgICAgICAgIFtcImVsbVwiXSxcbiAgICBFcmxhbmc6ICAgICAgW1wiZXJsfGhybFwiXSxcbiAgICBGbGl4OiAgICAgICAgW1wiZmxpeFwiXSxcbiAgICBGb3J0aDogICAgICAgW1wiZnJ0fGZzfGxkcnxmdGh8NHRoXCJdLFxuICAgIEZvcnRyYW46ICAgICBbXCJmfGY5MFwiXSxcbiAgICBGU2hhcnA6ICAgICAgW1wiZnNpfGZzfG1sfG1saXxmc3h8ZnNzY3JpcHRcIl0sXG4gICAgRlNMOiAgICAgICAgIFtcImZzbFwiXSxcbiAgICBGVEw6ICAgICAgICAgW1wiZnRsXCJdLFxuICAgIEdjb2RlOiAgICAgICBbXCJnY29kZVwiXSxcbiAgICBHaGVya2luOiAgICAgW1wiZmVhdHVyZVwiXSxcbiAgICBHaXRpZ25vcmU6ICAgW1wiXi5naXRpZ25vcmVcIl0sXG4gICAgR2xzbDogICAgICAgIFtcImdsc2x8ZnJhZ3x2ZXJ0XCJdLFxuICAgIEdvYnN0b25lczogICBbXCJnYnNcIl0sXG4gICAgZ29sYW5nOiAgICAgIFtcImdvXCJdLFxuICAgIEdyYXBoUUxTY2hlbWE6IFtcImdxbFwiXSxcbiAgICBHcm9vdnk6ICAgICAgW1wiZ3Jvb3Z5XCJdLFxuICAgIEhBTUw6ICAgICAgICBbXCJoYW1sXCJdLFxuICAgIEhhbmRsZWJhcnM6ICBbXCJoYnN8aGFuZGxlYmFyc3x0cGx8bXVzdGFjaGVcIl0sXG4gICAgSGFza2VsbDogICAgIFtcImhzXCJdLFxuICAgIEhhc2tlbGxfQ2FiYWw6IFtcImNhYmFsXCJdLFxuICAgIGhhWGU6ICAgICAgICBbXCJoeFwiXSxcbiAgICBIanNvbjogICAgICAgW1wiaGpzb25cIl0sXG4gICAgSFRNTDogICAgICAgIFtcImh0bWx8aHRtfHhodG1sfHZ1ZXx3ZXx3cHlcIl0sXG4gICAgSFRNTF9FbGl4aXI6IFtcImVleHxodG1sLmVleFwiXSxcbiAgICBIVE1MX1J1Ynk6ICAgW1wiZXJifHJodG1sfGh0bWwuZXJiXCJdLFxuICAgIElOSTogICAgICAgICBbXCJpbml8Y29uZnxjZmd8cHJlZnNcIl0sXG4gICAgSW86ICAgICAgICAgIFtcImlvXCJdLFxuICAgIElvbjogICAgICAgICBbXCJpb25cIl0sXG4gICAgSmFjazogICAgICAgIFtcImphY2tcIl0sXG4gICAgSmFkZTogICAgICAgIFtcImphZGV8cHVnXCJdLFxuICAgIEphdmE6ICAgICAgICBbXCJqYXZhXCJdLFxuICAgIEphdmFTY3JpcHQ6ICBbXCJqc3xqc218anN4fGNqc3xtanNcIl0sXG4gICAgSkVYTDogICAgICAgIFtcImpleGxcIl0sXG4gICAgSlNPTjogICAgICAgIFtcImpzb25cIl0sXG4gICAgSlNPTjU6ICAgICAgIFtcImpzb241XCJdLFxuICAgIEpTT05pcTogICAgICBbXCJqcVwiXSxcbiAgICBKU1A6ICAgICAgICAgW1wianNwXCJdLFxuICAgIEpTU006ICAgICAgICBbXCJqc3NtfGpzc21fc3RhdGVcIl0sXG4gICAgSlNYOiAgICAgICAgIFtcImpzeFwiXSxcbiAgICBKdWxpYTogICAgICAgW1wiamxcIl0sXG4gICAgS290bGluOiAgICAgIFtcImt0fGt0c1wiXSxcbiAgICBMYVRlWDogICAgICAgW1widGV4fGxhdGV4fGx0eHxiaWJcIl0sXG4gICAgTGF0dGU6ICAgICAgIFtcImxhdHRlXCJdLFxuICAgIExFU1M6ICAgICAgICBbXCJsZXNzXCJdLFxuICAgIExpcXVpZDogICAgICBbXCJsaXF1aWRcIl0sXG4gICAgTGlzcDogICAgICAgIFtcImxpc3BcIl0sXG4gICAgTGl2ZVNjcmlwdDogIFtcImxzXCJdLFxuICAgIExvZzogICAgICAgICBbXCJsb2dcIl0sXG4gICAgTG9naVFMOiAgICAgIFtcImxvZ2ljfGxxbFwiXSxcbiAgICBMb2d0YWxrOiAgICAgW1wibGd0XCJdLFxuICAgIExTTDogICAgICAgICBbXCJsc2xcIl0sXG4gICAgTHVhOiAgICAgICAgIFtcImx1YVwiXSxcbiAgICBMdWFQYWdlOiAgICAgW1wibHBcIl0sXG4gICAgTHVjZW5lOiAgICAgIFtcImx1Y2VuZVwiXSxcbiAgICBNYWtlZmlsZTogICAgW1wiXk1ha2VmaWxlfF5HTlVtYWtlZmlsZXxebWFrZWZpbGV8Xk9DYW1sTWFrZWZpbGV8bWFrZVwiXSxcbiAgICBNYXJrZG93bjogICAgW1wibWR8bWFya2Rvd25cIl0sXG4gICAgTWFzazogICAgICAgIFtcIm1hc2tcIl0sXG4gICAgTUFUTEFCOiAgICAgIFtcIm1hdGxhYlwiXSxcbiAgICBNYXplOiAgICAgICAgW1wibXpcIl0sXG4gICAgTWVkaWFXaWtpOiAgIFtcIndpa2l8bWVkaWF3aWtpXCJdLFxuICAgIE1FTDogICAgICAgICBbXCJtZWxcIl0sXG4gICAgTUlQUzogICAgICAgIFtcInN8YXNtXCJdLFxuICAgIE1JWEFMOiAgICAgICBbXCJtaXhhbFwiXSxcbiAgICBNVVNIQ29kZTogICAgW1wibWN8bXVzaFwiXSxcbiAgICBNeVNRTDogICAgICAgW1wibXlzcWxcIl0sXG4gICAgTmFzYWw6ICAgICAgIFtcIm5hc1wiXSxcbiAgICBOZ2lueDogICAgICAgW1wibmdpbnh8Y29uZlwiXSxcbiAgICBOaW06ICAgICAgICAgW1wibmltXCJdLFxuICAgIE5peDogICAgICAgICBbXCJuaXhcIl0sXG4gICAgTlNJUzogICAgICAgIFtcIm5zaXxuc2hcIl0sXG4gICAgTnVuanVja3M6ICAgIFtcIm51bmp1Y2tzfG51bmpzfG5qfG5qa1wiXSxcbiAgICBPYmplY3RpdmVDOiAgW1wibXxtbVwiXSxcbiAgICBPQ2FtbDogICAgICAgW1wibWx8bWxpXCJdLFxuICAgIE9kaW46ICAgICAgICBbXCJvZGluXCJdLFxuICAgIFBhcnRpUUw6ICAgICBbXCJwYXJ0aXFsfHBxbFwiXSxcbiAgICBQYXNjYWw6ICAgICAgW1wicGFzfHBcIl0sXG4gICAgUGVybDogICAgICAgIFtcInBsfHBtXCJdLFxuICAgIHBnU1FMOiAgICAgICBbXCJwZ3NxbFwiXSxcbiAgICBQSFA6ICAgICAgICAgW1wicGhwfGluY3xwaHRtbHxzaHRtbHxwaHAzfHBocDR8cGhwNXxwaHBzfHBocHR8YXd8Y3RwfG1vZHVsZVwiXSxcbiAgICBQSFBfTGFyYXZlbF9ibGFkZTogW1wiYmxhZGUucGhwXCJdLFxuICAgIFBpZzogICAgICAgICBbXCJwaWdcIl0sXG4gICAgUExTUUw6ICAgICAgIFtcInBsc3FsXCJdLFxuICAgIFBvd2Vyc2hlbGw6ICBbXCJwczFcIl0sXG4gICAgUHJhYXQ6ICAgICAgIFtcInByYWF0fHByYWF0c2NyaXB0fHBzY3xwcm9jXCJdLFxuICAgIFByaXNtYTogICAgICBbXCJwcmlzbWFcIl0sXG4gICAgUHJvbG9nOiAgICAgIFtcInBsZ3xwcm9sb2dcIl0sXG4gICAgUHJvcGVydGllczogIFtcInByb3BlcnRpZXNcIl0sXG4gICAgUHJvdG9idWY6ICAgIFtcInByb3RvXCJdLFxuICAgIFBSUUw6ICAgICAgICBbXCJwcnFsXCJdLFxuICAgIFB1cHBldDogICAgICBbXCJlcHB8cHBcIl0sXG4gICAgUHl0aG9uOiAgICAgIFtcInB5XCJdLFxuICAgIFFNTDogICAgICAgICBbXCJxbWxcIl0sXG4gICAgUjogICAgICAgICAgIFtcInJcIl0sXG4gICAgUmFrdTogICAgICAgIFtcInJha3V8cmFrdW1vZHxyYWt1dGVzdHxwNnxwbDZ8cG02XCJdLFxuICAgIFJhem9yOiAgICAgICBbXCJjc2h0bWx8YXNwXCJdLFxuICAgIFJEb2M6ICAgICAgICBbXCJSZFwiXSxcbiAgICBSZWQ6ICAgICAgICAgW1wicmVkfHJlZHNcIl0sXG4gICAgUkhUTUw6ICAgICAgIFtcIlJodG1sXCJdLFxuICAgIFJvYm90OiAgICAgICBbXCJyb2JvdHxyZXNvdXJjZVwiXSxcbiAgICBSU1Q6ICAgICAgICAgW1wicnN0XCJdLFxuICAgIFJ1Ynk6ICAgICAgICBbXCJyYnxydXxnZW1zcGVjfHJha2V8Xkd1YXJkZmlsZXxeUmFrZWZpbGV8XkdlbWZpbGVcIl0sXG4gICAgUnVzdDogICAgICAgIFtcInJzXCJdLFxuICAgIFNhQzogICAgICAgICBbXCJzYWNcIl0sXG4gICAgU0FTUzogICAgICAgIFtcInNhc3NcIl0sXG4gICAgU0NBRDogICAgICAgIFtcInNjYWRcIl0sXG4gICAgU2NhbGE6ICAgICAgIFtcInNjYWxhfHNidFwiXSxcbiAgICBTY2hlbWU6ICAgICAgW1wic2NtfHNtfHJrdHxvYWt8c2NoZW1lXCJdLFxuICAgIFNjcnlwdDogICAgICBbXCJzY3J5cHRcIl0sXG4gICAgU0NTUzogICAgICAgIFtcInNjc3NcIl0sXG4gICAgU0g6ICAgICAgICAgIFtcInNofGJhc2h8Xi5iYXNocmNcIl0sXG4gICAgU0pTOiAgICAgICAgIFtcInNqc1wiXSxcbiAgICBTbGltOiAgICAgICAgW1wic2xpbXxza2ltXCJdLFxuICAgIFNtYXJ0eTogICAgICBbXCJzbWFydHl8dHBsXCJdLFxuICAgIFNtaXRoeTogICAgICBbXCJzbWl0aHlcIl0sXG4gICAgc25pcHBldHM6ICAgIFtcInNuaXBwZXRzXCJdLFxuICAgIFNveV9UZW1wbGF0ZTpbXCJzb3lcIl0sXG4gICAgU3BhY2U6ICAgICAgIFtcInNwYWNlXCJdLFxuICAgIFNQQVJRTDogICAgICBbXCJycVwiXSxcbiAgICBTUUw6ICAgICAgICAgW1wic3FsXCJdLFxuICAgIFNRTFNlcnZlcjogICBbXCJzcWxzZXJ2ZXJcIl0sXG4gICAgU3R5bHVzOiAgICAgIFtcInN0eWx8c3R5bHVzXCJdLFxuICAgIFNWRzogICAgICAgICBbXCJzdmdcIl0sXG4gICAgU3dpZnQ6ICAgICAgIFtcInN3aWZ0XCJdLFxuICAgIFRjbDogICAgICAgICBbXCJ0Y2xcIl0sXG4gICAgVGVycmFmb3JtOiAgIFtcInRmXCIsIFwidGZ2YXJzXCIsIFwidGVycmFncnVudFwiXSxcbiAgICBUZXg6ICAgICAgICAgW1widGV4XCJdLFxuICAgIFRleHQ6ICAgICAgICBbXCJ0eHRcIl0sXG4gICAgVGV4dGlsZTogICAgIFtcInRleHRpbGVcIl0sXG4gICAgVG9tbDogICAgICAgIFtcInRvbWxcIl0sXG4gICAgVFNYOiAgICAgICAgIFtcInRzeFwiXSxcbiAgICBUdXJ0bGU6ICAgICAgW1widHRsXCJdLFxuICAgIFR3aWc6ICAgICAgICBbXCJ0d2lnfHN3aWdcIl0sXG4gICAgVHlwZXNjcmlwdDogIFtcInRzfG10c3xjdHN8dHlwZXNjcmlwdHxzdHJcIl0sXG4gICAgVmFsYTogICAgICAgIFtcInZhbGFcIl0sXG4gICAgVkJTY3JpcHQ6ICAgIFtcInZic3x2YlwiXSxcbiAgICBWZWxvY2l0eTogICAgW1widm1cIl0sXG4gICAgVmVyaWxvZzogICAgIFtcInZ8dmh8c3Z8c3ZoXCJdLFxuICAgIFZIREw6ICAgICAgICBbXCJ2aGR8dmhkbFwiXSxcbiAgICBWaXN1YWxmb3JjZTogW1widmZwfGNvbXBvbmVudHxwYWdlXCJdLFxuICAgIFdvbGxvazogICAgICBbXCJ3bGt8d3BnbXx3dGVzdFwiXSxcbiAgICBYTUw6ICAgICAgICAgW1wieG1sfHJkZnxyc3N8d3NkbHx4c2x0fGF0b218bWF0aG1sfG1tbHx4dWx8eGJsfHhhbWxcIl0sXG4gICAgWFF1ZXJ5OiAgICAgIFtcInhxXCJdLFxuICAgIFlBTUw6ICAgICAgICBbXCJ5YW1sfHltbFwiXSxcbiAgICBaZWVrOiAgICAgICAgW1wiemVla3xicm9cIl1cbn07XG5cbnZhciBuYW1lT3ZlcnJpZGVzID0ge1xuICAgIE9iamVjdGl2ZUM6IFwiT2JqZWN0aXZlLUNcIixcbiAgICBDU2hhcnA6IFwiQyNcIixcbiAgICBnb2xhbmc6IFwiR29cIixcbiAgICBDX0NwcDogXCJDIGFuZCBDKytcIixcbiAgICBDc291bmRfRG9jdW1lbnQ6IFwiQ3NvdW5kIERvY3VtZW50XCIsXG4gICAgQ3NvdW5kX09yY2hlc3RyYTogXCJDc291bmRcIixcbiAgICBDc291bmRfU2NvcmU6IFwiQ3NvdW5kIFNjb3JlXCIsXG4gICAgY29mZmVlOiBcIkNvZmZlZVNjcmlwdFwiLFxuICAgIEhUTUxfUnVieTogXCJIVE1MIChSdWJ5KVwiLFxuICAgIEhUTUxfRWxpeGlyOiBcIkhUTUwgKEVsaXhpcilcIixcbiAgICBGVEw6IFwiRnJlZU1hcmtlclwiLFxuICAgIFBIUF9MYXJhdmVsX2JsYWRlOiBcIlBIUCAoQmxhZGUgVGVtcGxhdGUpXCIsXG4gICAgUGVybDY6IFwiUGVybCA2XCIsXG4gICAgQXV0b0hvdEtleTogXCJBdXRvSG90a2V5IC8gQXV0b0l0XCJcbn07XG5cbnZhciBtb2Rlc0J5TmFtZSA9IHt9O1xuZm9yICh2YXIgbmFtZSBpbiBzdXBwb3J0ZWRNb2Rlcykge1xuICAgIHZhciBkYXRhID0gc3VwcG9ydGVkTW9kZXNbbmFtZV07XG4gICAgdmFyIGRpc3BsYXlOYW1lID0gKG5hbWVPdmVycmlkZXNbbmFtZV0gfHwgbmFtZSkucmVwbGFjZSgvXy9nLCBcIiBcIik7XG4gICAgdmFyIGZpbGVuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBtb2RlID0gbmV3IE1vZGUoZmlsZW5hbWUsIGRpc3BsYXlOYW1lLCBkYXRhWzBdKTtcbiAgICBtb2Rlc0J5TmFtZVtmaWxlbmFtZV0gPSBtb2RlO1xuICAgIG1vZGVzLnB1c2gobW9kZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldE1vZGVGb3JQYXRoOiBnZXRNb2RlRm9yUGF0aCxcbiAgICBtb2RlczogbW9kZXMsXG4gICAgbW9kZXNCeU5hbWU6IG1vZGVzQnlOYW1lXG59O1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnJlcXVpcmUoXCIuL21lbnVfdG9vbHMvb3ZlcmxheV9wYWdlXCIpO1xuXG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2xpYi9kb21cIik7XG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgY29uZmlnID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKFwiLi4vbGliL2V2ZW50X2VtaXR0ZXJcIikuRXZlbnRFbWl0dGVyO1xudmFyIGJ1aWxkRG9tID0gZG9tLmJ1aWxkRG9tO1xuXG52YXIgbW9kZWxpc3QgPSByZXF1aXJlKFwiLi9tb2RlbGlzdFwiKTtcbnZhciB0aGVtZWxpc3QgPSByZXF1aXJlKFwiLi90aGVtZWxpc3RcIik7XG5cbnZhciB0aGVtZXMgPSB7IEJyaWdodDogW10sIERhcms6IFtdIH07XG50aGVtZWxpc3QudGhlbWVzLmZvckVhY2goZnVuY3Rpb24oeCkge1xuICAgIHRoZW1lc1t4LmlzRGFyayA/IFwiRGFya1wiIDogXCJCcmlnaHRcIl0ucHVzaCh7IGNhcHRpb246IHguY2FwdGlvbiwgdmFsdWU6IHgudGhlbWUgfSk7XG59KTtcblxudmFyIG1vZGVzID0gbW9kZWxpc3QubW9kZXMubWFwKGZ1bmN0aW9uKHgpeyBcbiAgICByZXR1cm4geyBjYXB0aW9uOiB4LmNhcHRpb24sIHZhbHVlOiB4Lm1vZGUgfTsgXG59KTtcblxuXG52YXIgb3B0aW9uR3JvdXBzID0ge1xuICAgIE1haW46IHtcbiAgICAgICAgTW9kZToge1xuICAgICAgICAgICAgcGF0aDogXCJtb2RlXCIsXG4gICAgICAgICAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgICAgICAgICAgaXRlbXM6IG1vZGVzXG4gICAgICAgIH0sXG4gICAgICAgIFRoZW1lOiB7XG4gICAgICAgICAgICBwYXRoOiBcInRoZW1lXCIsXG4gICAgICAgICAgICB0eXBlOiBcInNlbGVjdFwiLFxuICAgICAgICAgICAgaXRlbXM6IHRoZW1lc1xuICAgICAgICB9LFxuICAgICAgICBcIktleWJpbmRpbmdcIjoge1xuICAgICAgICAgICAgdHlwZTogXCJidXR0b25CYXJcIixcbiAgICAgICAgICAgIHBhdGg6IFwia2V5Ym9hcmRIYW5kbGVyXCIsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiQWNlXCIsIHZhbHVlIDogbnVsbCB9LFxuICAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiVmltXCIsIHZhbHVlIDogXCJhY2Uva2V5Ym9hcmQvdmltXCIgfSxcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIkVtYWNzXCIsIHZhbHVlIDogXCJhY2Uva2V5Ym9hcmQvZW1hY3NcIiB9LFxuICAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiU3VibGltZVwiLCB2YWx1ZSA6IFwiYWNlL2tleWJvYXJkL3N1YmxpbWVcIiB9LFxuICAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiVlNDb2RlXCIsIHZhbHVlIDogXCJhY2Uva2V5Ym9hcmQvdnNjb2RlXCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBcIkZvbnQgU2l6ZVwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImZvbnRTaXplXCIsXG4gICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiAxMixcbiAgICAgICAgICAgIGRlZmF1bHRzOiBbXG4gICAgICAgICAgICAgICAge2NhcHRpb246IFwiMTJweFwiLCB2YWx1ZTogMTJ9LFxuICAgICAgICAgICAgICAgIHtjYXB0aW9uOiBcIjI0cHhcIiwgdmFsdWU6IDI0fVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBcIlNvZnQgV3JhcFwiOiB7XG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvbkJhclwiLFxuICAgICAgICAgICAgcGF0aDogXCJ3cmFwXCIsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJPZmZcIiwgIHZhbHVlIDogXCJvZmZcIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJWaWV3XCIsIHZhbHVlIDogXCJmcmVlXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwibWFyZ2luXCIsIHZhbHVlIDogXCJwcmludE1hcmdpblwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIjQwXCIsICAgdmFsdWUgOiBcIjQwXCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBcIkN1cnNvciBTdHlsZVwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImN1cnNvclN0eWxlXCIsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJBY2VcIiwgICAgdmFsdWUgOiBcImFjZVwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlNsaW1cIiwgICB2YWx1ZSA6IFwic2xpbVwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlNtb290aFwiLCB2YWx1ZSA6IFwic21vb3RoXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiU21vb3RoIEFuZCBTbGltXCIsIHZhbHVlIDogXCJzbW9vdGggc2xpbVwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIldpZGVcIiwgICB2YWx1ZSA6IFwid2lkZVwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJGb2xkaW5nXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZm9sZFN0eWxlXCIsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiTWFudWFsXCIsIHZhbHVlIDogXCJtYW51YWxcIiB9LFxuICAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiTWFyayBiZWdpblwiLCB2YWx1ZSA6IFwibWFya2JlZ2luXCIgfSxcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIk1hcmsgYmVnaW4gYW5kIGVuZFwiLCB2YWx1ZSA6IFwibWFya2JlZ2luZW5kXCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBcIlNvZnQgVGFic1wiOiBbe1xuICAgICAgICAgICAgcGF0aDogXCJ1c2VTb2Z0VGFic1wiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGFyaWFMYWJlbDogXCJUYWIgU2l6ZVwiLFxuICAgICAgICAgICAgcGF0aDogXCJ0YWJTaXplXCIsXG4gICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgdmFsdWVzOiBbMiwgMywgNCwgOCwgMTZdXG4gICAgICAgIH1dLFxuICAgICAgICBcIk92ZXJzY3JvbGxcIjoge1xuICAgICAgICAgICAgdHlwZTogXCJidXR0b25CYXJcIixcbiAgICAgICAgICAgIHBhdGg6IFwic2Nyb2xsUGFzdEVuZFwiLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiTm9uZVwiLCAgdmFsdWUgOiAwIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIkhhbGZcIiwgICB2YWx1ZSA6IDAuNSB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJGdWxsXCIsICAgdmFsdWUgOiAxIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgIH0sXG4gICAgTW9yZToge1xuICAgICAgICBcIkF0b21pYyBzb2Z0IHRhYnNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJuYXZpZ2F0ZVdpdGhpblNvZnRUYWJzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJFbmFibGUgQmVoYXZpb3Vyc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImJlaGF2aW91cnNFbmFibGVkXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJXcmFwIHdpdGggcXVvdGVzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwid3JhcEJlaGF2aW91cnNFbmFibGVkXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJFbmFibGUgQXV0byBJbmRlbnRcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJlbmFibGVBdXRvSW5kZW50XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJGdWxsIExpbmUgU2VsZWN0aW9uXCI6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiY2hlY2tib3hcIixcbiAgICAgICAgICAgIHZhbHVlczogXCJ0ZXh0fGxpbmVcIixcbiAgICAgICAgICAgIHBhdGg6IFwic2VsZWN0aW9uU3R5bGVcIlxuICAgICAgICB9LFxuICAgICAgICBcIkhpZ2hsaWdodCBBY3RpdmUgTGluZVwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImhpZ2hsaWdodEFjdGl2ZUxpbmVcIlxuICAgICAgICB9LFxuICAgICAgICBcIlNob3cgSW52aXNpYmxlc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInNob3dJbnZpc2libGVzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJTaG93IEluZGVudCBHdWlkZXNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJkaXNwbGF5SW5kZW50R3VpZGVzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJIaWdobGlnaHQgSW5kZW50IEd1aWRlc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImhpZ2hsaWdodEluZGVudEd1aWRlc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiUGVyc2lzdGVudCBIU2Nyb2xsYmFyXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiaFNjcm9sbEJhckFsd2F5c1Zpc2libGVcIlxuICAgICAgICB9LFxuICAgICAgICBcIlBlcnNpc3RlbnQgVlNjcm9sbGJhclwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInZTY3JvbGxCYXJBbHdheXNWaXNpYmxlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJBbmltYXRlIHNjcm9sbGluZ1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImFuaW1hdGVkU2Nyb2xsXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJTaG93IEd1dHRlclwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInNob3dHdXR0ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBcIlNob3cgTGluZSBOdW1iZXJzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwic2hvd0xpbmVOdW1iZXJzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJSZWxhdGl2ZSBMaW5lIE51bWJlcnNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJyZWxhdGl2ZUxpbmVOdW1iZXJzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJGaXhlZCBHdXR0ZXIgV2lkdGhcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJmaXhlZFdpZHRoR3V0dGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJTaG93IFByaW50IE1hcmdpblwiOiBbe1xuICAgICAgICAgICAgcGF0aDogXCJzaG93UHJpbnRNYXJnaW5cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBhcmlhTGFiZWw6IFwiUHJpbnQgTWFyZ2luXCIsXG4gICAgICAgICAgICB0eXBlOiBcIm51bWJlclwiLFxuICAgICAgICAgICAgcGF0aDogXCJwcmludE1hcmdpbkNvbHVtblwiXG4gICAgICAgIH1dLFxuICAgICAgICBcIkluZGVudGVkIFNvZnQgV3JhcFwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImluZGVudGVkU29mdFdyYXBcIlxuICAgICAgICB9LFxuICAgICAgICBcIkhpZ2hsaWdodCBzZWxlY3RlZCB3b3JkXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiaGlnaGxpZ2h0U2VsZWN0ZWRXb3JkXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJGYWRlIEZvbGQgV2lkZ2V0c1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImZhZGVGb2xkV2lkZ2V0c1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiVXNlIHRleHRhcmVhIGZvciBJTUVcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJ1c2VUZXh0YXJlYUZvcklNRVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiTWVyZ2UgVW5kbyBEZWx0YXNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJtZXJnZVVuZG9EZWx0YXNcIixcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIkFsd2F5c1wiLCAgdmFsdWUgOiBcImFsd2F5c1wiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIk5ldmVyXCIsICAgdmFsdWUgOiBcImZhbHNlXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiVGltZWRcIiwgICB2YWx1ZSA6IFwidHJ1ZVwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJFbGFzdGljIFRhYnN0b3BzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwidXNlRWxhc3RpY1RhYnN0b3BzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJJbmNyZW1lbnRhbCBTZWFyY2hcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJ1c2VJbmNyZW1lbnRhbFNlYXJjaFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiUmVhZC1vbmx5XCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwicmVhZE9ubHlcIlxuICAgICAgICB9LFxuICAgICAgICBcIkNvcHkgd2l0aG91dCBzZWxlY3Rpb25cIjoge1xuICAgICAgICAgICAgcGF0aDogXCJjb3B5V2l0aEVtcHR5U2VsZWN0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJMaXZlIEF1dG9jb21wbGV0aW9uXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZW5hYmxlTGl2ZUF1dG9jb21wbGV0aW9uXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJDdXN0b20gc2Nyb2xsYmFyXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiY3VzdG9tU2Nyb2xsYmFyXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJVc2UgU1ZHIGd1dHRlciBpY29uc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInVzZVN2Z0d1dHRlckljb25zXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJBbm5vdGF0aW9ucyBmb3IgZm9sZGVkIGxpbmVzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwic2hvd0ZvbGRlZEFubm90YXRpb25zXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJLZXlib2FyZCBBY2Nlc3NpYmlsaXR5IE1vZGVcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJlbmFibGVLZXlib2FyZEFjY2Vzc2liaWxpdHlcIlxuICAgICAgICB9LFxuICAgICAgICBcIkd1dHRlciB0b29sdGlwIGZvbGxvd3MgbW91c2VcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJ0b29sdGlwRm9sbG93c01vdXNlXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IHRydWVcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmNsYXNzIE9wdGlvblBhbmVsIHtcbiAgICBjb25zdHJ1Y3RvcihlZGl0b3IsIGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5lZGl0b3IgPSBlZGl0b3I7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gZWxlbWVudCB8fCBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICB0aGlzLmdyb3VwcyA9IFtdO1xuICAgICAgICB0aGlzLm9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgXG4gICAgYWRkKGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnLk1haW4pXG4gICAgICAgICAgICBvb3AubWl4aW4ob3B0aW9uR3JvdXBzLk1haW4sIGNvbmZpZy5NYWluKTtcbiAgICAgICAgaWYgKGNvbmZpZy5Nb3JlKVxuICAgICAgICAgICAgb29wLm1peGluKG9wdGlvbkdyb3Vwcy5Nb3JlLCBjb25maWcuTW9yZSk7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdGhpcy5jb250YWluZXIuaW5uZXJIVE1MID0gXCJcIjtcbiAgICAgICAgYnVpbGREb20oW1widGFibGVcIiwge3JvbGU6IFwicHJlc2VudGF0aW9uXCIsIGlkOiBcImNvbnRyb2xzXCJ9LCBcbiAgICAgICAgICAgIHRoaXMucmVuZGVyT3B0aW9uR3JvdXAob3B0aW9uR3JvdXBzLk1haW4pLFxuICAgICAgICAgICAgW1widHJcIiwgbnVsbCwgW1widGRcIiwge2NvbHNwYW46IDJ9LFxuICAgICAgICAgICAgICAgIFtcInRhYmxlXCIsIHtyb2xlOiBcInByZXNlbnRhdGlvblwiLCBpZDogXCJtb3JlLWNvbnRyb2xzXCJ9LCBcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW5kZXJPcHRpb25Hcm91cChvcHRpb25Hcm91cHMuTW9yZSlcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICBdXSxcbiAgICAgICAgICAgIFtcInRyXCIsIG51bGwsIFtcInRkXCIsIHtjb2xzcGFuOiAyfSwgXCJ2ZXJzaW9uIFwiICsgY29uZmlnLnZlcnNpb25dXVxuICAgICAgICBdLCB0aGlzLmNvbnRhaW5lcik7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlck9wdGlvbkdyb3VwKGdyb3VwKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhncm91cCkubWFwKGZ1bmN0aW9uKGtleSwgaSkge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBncm91cFtrZXldO1xuICAgICAgICAgICAgaWYgKCFpdGVtLnBvc2l0aW9uKVxuICAgICAgICAgICAgICAgIGl0ZW0ucG9zaXRpb24gPSBpIC8gMTAwMDA7XG4gICAgICAgICAgICBpZiAoIWl0ZW0ubGFiZWwpXG4gICAgICAgICAgICAgICAgaXRlbS5sYWJlbCA9IGtleTtcbiAgICAgICAgICAgIHJldHVybiBpdGVtO1xuICAgICAgICB9KS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgIHJldHVybiBhLnBvc2l0aW9uIC0gYi5wb3NpdGlvbjtcbiAgICAgICAgfSkubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlck9wdGlvbihpdGVtLmxhYmVsLCBpdGVtKTtcbiAgICAgICAgfSwgdGhpcyk7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlck9wdGlvbkNvbnRyb2woa2V5LCBvcHRpb24pIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLm1hcChmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYucmVuZGVyT3B0aW9uQ29udHJvbChrZXksIHgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNvbnRyb2w7XG4gICAgICAgIFxuICAgICAgICB2YXIgdmFsdWUgPSBzZWxmLmdldE9wdGlvbihvcHRpb24pO1xuICAgICAgICBcbiAgICAgICAgaWYgKG9wdGlvbi52YWx1ZXMgJiYgb3B0aW9uLnR5cGUgIT0gXCJjaGVja2JveFwiKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbi52YWx1ZXMgPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICBvcHRpb24udmFsdWVzID0gb3B0aW9uLnZhbHVlcy5zcGxpdChcInxcIik7XG4gICAgICAgICAgICBvcHRpb24uaXRlbXMgPSBvcHRpb24udmFsdWVzLm1hcChmdW5jdGlvbih2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IHYsIG5hbWU6IHYgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAob3B0aW9uLnR5cGUgPT0gXCJidXR0b25CYXJcIikge1xuICAgICAgICAgICAgY29udHJvbCA9IFtcImRpdlwiLCB7cm9sZTogXCJncm91cFwiLCBcImFyaWEtbGFiZWxsZWRieVwiOiBvcHRpb24ucGF0aCArIFwiLWxhYmVsXCJ9LCBvcHRpb24uaXRlbXMubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gW1wiYnV0dG9uXCIsIHsgXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtLnZhbHVlLCBcbiAgICAgICAgICAgICAgICAgICAgYWNlX3NlbGVjdGVkX2J1dHRvbjogdmFsdWUgPT0gaXRlbS52YWx1ZSwgXG4gICAgICAgICAgICAgICAgICAgICdhcmlhLXByZXNzZWQnOiB2YWx1ZSA9PSBpdGVtLnZhbHVlLCBcbiAgICAgICAgICAgICAgICAgICAgb25jbGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLnNldE9wdGlvbihvcHRpb24sIGl0ZW0udmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5vZGVzID0gdGhpcy5wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbYWNlX3NlbGVjdGVkX2J1dHRvbl1cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXNbaV0ucmVtb3ZlQXR0cmlidXRlKFwiYWNlX3NlbGVjdGVkX2J1dHRvblwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2Rlc1tpXS5zZXRBdHRyaWJ1dGUoXCJhcmlhLXByZXNzZWRcIiwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJhY2Vfc2VsZWN0ZWRfYnV0dG9uXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRBdHRyaWJ1dGUoXCJhcmlhLXByZXNzZWRcIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH0gXG4gICAgICAgICAgICAgICAgfSwgaXRlbS5kZXNjIHx8IGl0ZW0uY2FwdGlvbiB8fCBpdGVtLm5hbWVdO1xuICAgICAgICAgICAgfSldO1xuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbi50eXBlID09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICAgIGNvbnRyb2wgPSBbXCJpbnB1dFwiLCB7dHlwZTogXCJudW1iZXJcIiwgdmFsdWU6IHZhbHVlIHx8IG9wdGlvbi5kZWZhdWx0VmFsdWUsIHN0eWxlOlwid2lkdGg6M2VtXCIsIG9uaW5wdXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0T3B0aW9uKG9wdGlvbiwgcGFyc2VJbnQodGhpcy52YWx1ZSkpO1xuICAgICAgICAgICAgfX1dO1xuICAgICAgICAgICAgaWYgKG9wdGlvbi5hcmlhTGFiZWwpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sWzFdW1wiYXJpYS1sYWJlbFwiXSA9IG9wdGlvbi5hcmlhTGFiZWw7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xbMV0uaWQgPSBrZXk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob3B0aW9uLmRlZmF1bHRzKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbCA9IFtjb250cm9sLCBvcHRpb24uZGVmYXVsdHMubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcImJ1dHRvblwiLCB7b25jbGljazogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5wdXQgPSB0aGlzLnBhcmVudE5vZGUuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gaXRlbS52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlucHV0Lm9uaW5wdXQoKTtcbiAgICAgICAgICAgICAgICAgICAgfX0sIGl0ZW0uY2FwdGlvbl07XG4gICAgICAgICAgICAgICAgfSldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9wdGlvbi5pdGVtcykge1xuICAgICAgICAgICAgdmFyIGJ1aWxkSXRlbXMgPSBmdW5jdGlvbihpdGVtcykge1xuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtcy5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wib3B0aW9uXCIsIHsgdmFsdWU6IGl0ZW0udmFsdWUgfHwgaXRlbS5uYW1lIH0sIGl0ZW0uZGVzYyB8fCBpdGVtLmNhcHRpb24gfHwgaXRlbS5uYW1lXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBpdGVtcyA9IEFycmF5LmlzQXJyYXkob3B0aW9uLml0ZW1zKSBcbiAgICAgICAgICAgICAgICA/IGJ1aWxkSXRlbXMob3B0aW9uLml0ZW1zKVxuICAgICAgICAgICAgICAgIDogT2JqZWN0LmtleXMob3B0aW9uLml0ZW1zKS5tYXAoZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJvcHRncm91cFwiLCB7XCJsYWJlbFwiOiBrZXl9LCBidWlsZEl0ZW1zKG9wdGlvbi5pdGVtc1trZXldKV07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBjb250cm9sID0gW1wic2VsZWN0XCIsIHsgaWQ6IGtleSwgdmFsdWU6IHZhbHVlLCBvbmNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRPcHRpb24ob3B0aW9uLCB0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIH0gfSwgaXRlbXNdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24udmFsdWVzID09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlcyA9IG9wdGlvbi52YWx1ZXMuc3BsaXQoXCJ8XCIpO1xuICAgICAgICAgICAgaWYgKG9wdGlvbi52YWx1ZXMpIHZhbHVlID0gdmFsdWUgPT0gb3B0aW9uLnZhbHVlc1sxXTtcbiAgICAgICAgICAgIGNvbnRyb2wgPSBbXCJpbnB1dFwiLCB7IHR5cGU6IFwiY2hlY2tib3hcIiwgaWQ6IGtleSwgY2hlY2tlZDogdmFsdWUgfHwgbnVsbCwgb25jaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuY2hlY2tlZDtcbiAgICAgICAgICAgICAgICBpZiAob3B0aW9uLnZhbHVlcykgdmFsdWUgPSBvcHRpb24udmFsdWVzW3ZhbHVlID8gMSA6IDBdO1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0T3B0aW9uKG9wdGlvbiwgdmFsdWUpO1xuICAgICAgICAgICAgfX1dO1xuICAgICAgICAgICAgaWYgKG9wdGlvbi50eXBlID09IFwiY2hlY2tlZE51bWJlclwiKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbCA9IFtjb250cm9sLCBbXV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRyb2w7XG4gICAgfVxuICAgIFxuICAgIHJlbmRlck9wdGlvbihrZXksIG9wdGlvbikge1xuICAgICAgICBpZiAob3B0aW9uLnBhdGggJiYgIW9wdGlvbi5vbmNoYW5nZSAmJiAhdGhpcy5lZGl0b3IuJG9wdGlvbnNbb3B0aW9uLnBhdGhdKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgcGF0aCA9IEFycmF5LmlzQXJyYXkob3B0aW9uKSA/IG9wdGlvblswXS5wYXRoIDogb3B0aW9uLnBhdGg7XG4gICAgICAgIHRoaXMub3B0aW9uc1twYXRoXSA9IG9wdGlvbjtcbiAgICAgICAgdmFyIHNhZmVLZXkgPSBcIi1cIiArIHBhdGg7XG4gICAgICAgIHZhciBzYWZlSWQgPSBwYXRoICsgXCItbGFiZWxcIjtcbiAgICAgICAgdmFyIGNvbnRyb2wgPSB0aGlzLnJlbmRlck9wdGlvbkNvbnRyb2woc2FmZUtleSwgb3B0aW9uKTtcbiAgICAgICAgcmV0dXJuIFtcInRyXCIsIHtjbGFzczogXCJhY2Vfb3B0aW9uc01lbnVFbnRyeVwifSwgW1widGRcIixcbiAgICAgICAgICAgIFtcImxhYmVsXCIsIHtmb3I6IHNhZmVLZXksIGlkOiBzYWZlSWR9LCBrZXldXG4gICAgICAgIF0sIFtcInRkXCIsIGNvbnRyb2xdXTtcbiAgICB9XG4gICAgXG4gICAgc2V0T3B0aW9uKG9wdGlvbiwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIG9wdGlvbiA9IHRoaXMub3B0aW9uc1tvcHRpb25dO1xuICAgICAgICBpZiAodmFsdWUgPT0gXCJmYWxzZVwiKSB2YWx1ZSA9IGZhbHNlO1xuICAgICAgICBpZiAodmFsdWUgPT0gXCJ0cnVlXCIpIHZhbHVlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHZhbHVlID09IFwibnVsbFwiKSB2YWx1ZSA9IG51bGw7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBcInVuZGVmaW5lZFwiKSB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiICYmIHBhcnNlRmxvYXQodmFsdWUpLnRvU3RyaW5nKCkgPT0gdmFsdWUpXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICBpZiAob3B0aW9uLm9uY2hhbmdlKVxuICAgICAgICAgICAgb3B0aW9uLm9uY2hhbmdlKHZhbHVlKTtcbiAgICAgICAgZWxzZSBpZiAob3B0aW9uLnBhdGgpXG4gICAgICAgICAgICB0aGlzLmVkaXRvci5zZXRPcHRpb24ob3B0aW9uLnBhdGgsIHZhbHVlKTtcbiAgICAgICAgdGhpcy5fc2lnbmFsKFwic2V0T3B0aW9uXCIsIHtuYW1lOiBvcHRpb24ucGF0aCwgdmFsdWU6IHZhbHVlfSk7XG4gICAgfVxuICAgIFxuICAgIGdldE9wdGlvbihvcHRpb24pIHtcbiAgICAgICAgaWYgKG9wdGlvbi5nZXRWYWx1ZSlcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24uZ2V0VmFsdWUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yLmdldE9wdGlvbihvcHRpb24ucGF0aCk7XG4gICAgfVxufVxub29wLmltcGxlbWVudChPcHRpb25QYW5lbC5wcm90b3R5cGUsIEV2ZW50RW1pdHRlcik7XG5cbmV4cG9ydHMuT3B0aW9uUGFuZWwgPSBPcHRpb25QYW5lbDtcbiIsIi8qKlxuICogR2VuZXJhdGVzIGEgbGlzdCBvZiB0aGVtZXMgYXZhaWxhYmxlIHdoZW4gYWNlIHdhcyBidWlsdC5cbiAqIEBmaWxlT3ZlcnZpZXcgR2VuZXJhdGVzIGEgbGlzdCBvZiB0aGVtZXMgYXZhaWxhYmxlIHdoZW4gYWNlIHdhcyBidWlsdC5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciB0aGVtZURhdGEgPSBbXG4gICAgW1wiQ2hyb21lXCIgICAgICAgICBdLFxuICAgIFtcIkNsb3Vkc1wiICAgICAgICAgXSxcbiAgICBbXCJDcmltc29uIEVkaXRvclwiIF0sXG4gICAgW1wiRGF3blwiICAgICAgICAgICBdLFxuICAgIFtcIkRyZWFtd2VhdmVyXCIgICAgXSxcbiAgICBbXCJFY2xpcHNlXCIgICAgICAgIF0sXG4gICAgW1wiR2l0SHViXCIgICAgICAgICBdLFxuICAgIFtcIklQbGFzdGljXCIgICAgICAgXSxcbiAgICBbXCJTb2xhcml6ZWQgTGlnaHRcIl0sXG4gICAgW1wiVGV4dE1hdGVcIiAgICAgICBdLFxuICAgIFtcIlRvbW9ycm93XCIgICAgICAgXSxcbiAgICBbXCJYQ29kZVwiICAgICAgICAgIF0sXG4gICAgW1wiS3Vyb2lyXCJdLFxuICAgIFtcIkthdHplbk1pbGNoXCJdLFxuICAgIFtcIlNRTCBTZXJ2ZXJcIiAgICAgICAgICAgLFwic3Fsc2VydmVyXCIgICAgICAgICAgICAgICAsIFwibGlnaHRcIl0sXG4gICAgW1wiQW1iaWFuY2VcIiAgICAgICAgICAgICAsXCJhbWJpYW5jZVwiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJDaGFvc1wiICAgICAgICAgICAgICAgICxcImNoYW9zXCIgICAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkNsb3VkcyBNaWRuaWdodFwiICAgICAgLFwiY2xvdWRzX21pZG5pZ2h0XCIgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiRHJhY3VsYVwiICAgICAgICAgICAgICAsXCJcIiAgICAgICAgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJDb2JhbHRcIiAgICAgICAgICAgICAgICxcImNvYmFsdFwiICAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkdydXZib3hcIiAgICAgICAgICAgICAgLFwiZ3J1dmJveFwiICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiR3JlZW4gb24gQmxhY2tcIiAgICAgICAsXCJnb2JcIiAgICAgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJpZGxlIEZpbmdlcnNcIiAgICAgICAgICxcImlkbGVfZmluZ2Vyc1wiICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcImtyVGhlbWVcIiAgICAgICAgICAgICAgLFwia3JfdGhlbWVcIiAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiTWVyYml2b3JlXCIgICAgICAgICAgICAsXCJtZXJiaXZvcmVcIiAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJNZXJiaXZvcmUgU29mdFwiICAgICAgICxcIm1lcmJpdm9yZV9zb2Z0XCIgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk1vbm8gSW5kdXN0cmlhbFwiICAgICAgLFwibW9ub19pbmR1c3RyaWFsXCIgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiTW9ub2thaVwiICAgICAgICAgICAgICAsXCJtb25va2FpXCIgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJOb3JkIERhcmtcIiAgICAgICAgICAgICxcIm5vcmRfZGFya1wiICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk9uZSBEYXJrXCIgICAgICAgICAgICAgLFwib25lX2RhcmtcIiAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiUGFzdGVsIG9uIGRhcmtcIiAgICAgICAsXCJwYXN0ZWxfb25fZGFya1wiICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJTb2xhcml6ZWQgRGFya1wiICAgICAgICxcInNvbGFyaXplZF9kYXJrXCIgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlRlcm1pbmFsXCIgICAgICAgICAgICAgLFwidGVybWluYWxcIiAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVG9tb3Jyb3cgTmlnaHRcIiAgICAgICAsXCJ0b21vcnJvd19uaWdodFwiICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUb21vcnJvdyBOaWdodCBCbHVlXCIgICxcInRvbW9ycm93X25pZ2h0X2JsdWVcIiAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlRvbW9ycm93IE5pZ2h0IEJyaWdodFwiLFwidG9tb3Jyb3dfbmlnaHRfYnJpZ2h0XCIgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVG9tb3Jyb3cgTmlnaHQgODBzXCIgICAsXCJ0b21vcnJvd19uaWdodF9laWdodGllc1wiICwgIFwiZGFya1wiXSxcbiAgICBbXCJUd2lsaWdodFwiICAgICAgICAgICAgICxcInR3aWxpZ2h0XCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlZpYnJhbnQgSW5rXCIgICAgICAgICAgLFwidmlicmFudF9pbmtcIiAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiR2l0SHViIERhcmtcIiAgICAgICAgICAsXCJnaXRodWJfZGFya1wiICAgICAgICAgICAgICwgIFwiZGFya1wiXVxuXTtcblxuXG5leHBvcnRzLnRoZW1lc0J5TmFtZSA9IHt9O1xuXG4vKipcbiAqIEFuIGFycmF5IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgYXZhaWxhYmxlIHRoZW1lcy5cbiAqL1xuZXhwb3J0cy50aGVtZXMgPSB0aGVtZURhdGEubWFwKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgbmFtZSA9IGRhdGFbMV0gfHwgZGF0YVswXS5yZXBsYWNlKC8gL2csIFwiX1wiKS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciB0aGVtZSA9IHtcbiAgICAgICAgY2FwdGlvbjogZGF0YVswXSxcbiAgICAgICAgdGhlbWU6IFwiYWNlL3RoZW1lL1wiICsgbmFtZSxcbiAgICAgICAgaXNEYXJrOiBkYXRhWzJdID09IFwiZGFya1wiLFxuICAgICAgICBuYW1lOiBuYW1lXG4gICAgfTtcbiAgICBleHBvcnRzLnRoZW1lc0J5TmFtZVtuYW1lXSA9IHRoZW1lO1xuICAgIHJldHVybiB0aGVtZTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9