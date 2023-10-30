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
    D:           ["d|di"],
    Dart:        ["dart"],
    Diff:        ["diff|patch"],
    Dockerfile:  ["^Dockerfile"],
    Dot:         ["dot"],
    Drools:      ["drl"],
    Edifact:     ["edi"],
    Eiffel:      ["e|ge"],
    EJS:         ["ejs"],
    Elixir:      ["ex|exs"],
    Elm:         ["elm"],
    Erlang:      ["erl|hrl"],
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
    Typescript:  ["ts|typescript|str"],
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
    Zeek:        ["zeek|bro"],
    // Add the missing mode "Django" to ext-modelist
    Django:      ["html"]
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjMwNTYuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7QUFDYixVQUFVLG1CQUFPLENBQUMsSUFBZTtBQUNqQyxjQUFjLG1CQUFPLENBQUMsS0FBcUI7QUFDM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7O0FBRUEsMEJBQTBCO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsWUFBWTtBQUNuRCwwQkFBMEIsT0FBTyxVQUFVLFFBQVEsUUFBUTtBQUMzRCx3QkFBd0I7QUFDeEIsd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7O0FDL0RZOztBQUViO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFDQTs7O0FBR0Esb0JBQW9COztBQUVwQjtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tZW51X3Rvb2xzL292ZXJsYXlfcGFnZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvbWVudV90b29scy9zZXR0aW5nc19tZW51LmNzcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvbW9kZWxpc3QuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L29wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3RoZW1lbGlzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKmpzbGludCBpbmRlbnQ6IDQsIG1heGVycjogNTAsIHdoaXRlOiB0cnVlLCBicm93c2VyOiB0cnVlLCB2YXJzOiB0cnVlKi9cbi8qZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSAqL1xuXG4vKipcbiAqIE92ZXJsYXkgUGFnZVxuICogQGZpbGVPdmVydmlldyBPdmVybGF5IFBhZ2UgPGJyIC8+XG4gKiBHZW5lcmF0ZXMgYW4gb3ZlcmxheSBmb3IgZGlzcGxheWluZyBtZW51cy4gVGhlIG92ZXJsYXkgaXMgYW4gYWJzb2x1dGVseVxuICogIHBvc2l0aW9uZWQgZGl2LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG52YXIgZG9tID0gcmVxdWlyZShcIi4uLy4uL2xpYi9kb21cIik7XG52YXIgY3NzVGV4dCA9IHJlcXVpcmUoXCIuL3NldHRpbmdzX21lbnUuY3NzXCIpO1xuZG9tLmltcG9ydENzc1N0cmluZyhjc3NUZXh0LCBcInNldHRpbmdzX21lbnUuY3NzXCIsIGZhbHNlKTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYW4gb3ZlcmxheSBmb3IgZGlzcGxheWluZyBtZW51cy4gVGhlIG92ZXJsYXkgaXMgYW4gYWJzb2x1dGVseVxuICogIHBvc2l0aW9uZWQgZGl2LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBwYXJhbSB7RWxlbWVudH0gY29udGVudEVsZW1lbnQgQW55IGVsZW1lbnQgd2hpY2ggbWF5IGJlIHByZXNlbnRlZCBpbnNpZGVcbiAqICBhIGRpdi5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cy5vdmVybGF5UGFnZSA9IGZ1bmN0aW9uIG92ZXJsYXlQYWdlKGVkaXRvciwgY29udGVudEVsZW1lbnQsIGNhbGxiYWNrKSB7XG4gICAgdmFyIGNsb3NlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHZhciBpZ25vcmVGb2N1c091dCA9IGZhbHNlO1xuXG4gICAgZnVuY3Rpb24gZG9jdW1lbnRFc2NMaXN0ZW5lcihlKSB7XG4gICAgICAgIGlmIChlLmtleUNvZGUgPT09IDI3KSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2UoKSB7XG4gICAgICAgIGlmICghY2xvc2VyKSByZXR1cm47XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBkb2N1bWVudEVzY0xpc3RlbmVyKTtcbiAgICAgICAgY2xvc2VyLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoY2xvc2VyKTtcbiAgICAgICAgaWYgKGVkaXRvcikge1xuICAgICAgICAgICAgZWRpdG9yLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2xvc2VyID0gbnVsbDtcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICAgLyoqXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIG92ZXJsYXkgaXMgY2xvc2VkIHdoZW4gdXNlciBjbGlja3Mgb3V0c2lkZSBvZiBpdC5cbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGlnbm9yZSAgICAgIElmIHNldCB0byB0cnVlIG92ZXJsYXkgc3RheXMgb3BlbiB3aGVuIGZvY3VzIG1vdmVzIHRvIGFub3RoZXIgcGFydCBvZiB0aGUgZWRpdG9yLlxuICAgICAqL1xuICAgIGZ1bmN0aW9uIHNldElnbm9yZUZvY3VzT3V0KGlnbm9yZSkge1xuICAgICAgICBpZ25vcmVGb2N1c091dCA9IGlnbm9yZTtcbiAgICAgICAgaWYgKGlnbm9yZSkge1xuICAgICAgICAgICAgY2xvc2VyLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIGNvbnRlbnRFbGVtZW50LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3Nlci5zdHlsZS5jc3NUZXh0ID0gJ21hcmdpbjogMDsgcGFkZGluZzogMDsgJyArXG4gICAgICAgICdwb3NpdGlvbjogZml4ZWQ7IHRvcDowOyBib3R0b206MDsgbGVmdDowOyByaWdodDowOycgK1xuICAgICAgICAnei1pbmRleDogOTk5MDsgJyArXG4gICAgICAgIChlZGl0b3IgPyAnYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjMpOycgOiAnJyk7XG4gICAgY2xvc2VyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBpZiAoIWlnbm9yZUZvY3VzT3V0KSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgLy8gY2xpY2sgY2xvc2VyIGlmIGVzYyBrZXkgaXMgcHJlc3NlZFxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBkb2N1bWVudEVzY0xpc3RlbmVyKTtcblxuICAgIGNvbnRlbnRFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgIGNsb3Nlci5hcHBlbmRDaGlsZChjb250ZW50RWxlbWVudCk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChjbG9zZXIpO1xuICAgIGlmIChlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLmJsdXIoKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgY2xvc2U6IGNsb3NlLFxuICAgICAgICBzZXRJZ25vcmVGb2N1c091dDogc2V0SWdub3JlRm9jdXNPdXRcbiAgICB9O1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gYCNhY2Vfc2V0dGluZ3NtZW51LCAja2JzaG9ydGN1dG1lbnUge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNGN0Y3Rjc7XG4gICAgY29sb3I6IGJsYWNrO1xuICAgIGJveC1zaGFkb3c6IC01cHggNHB4IDVweCByZ2JhKDEyNiwgMTI2LCAxMjYsIDAuNTUpO1xuICAgIHBhZGRpbmc6IDFlbSAwLjVlbSAyZW0gMWVtO1xuICAgIG92ZXJmbG93OiBhdXRvO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBtYXJnaW46IDA7XG4gICAgYm90dG9tOiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIHRvcDogMDtcbiAgICB6LWluZGV4OiA5OTkxO1xuICAgIGN1cnNvcjogZGVmYXVsdDtcbn1cblxuLmFjZV9kYXJrICNhY2Vfc2V0dGluZ3NtZW51LCAuYWNlX2RhcmsgI2tic2hvcnRjdXRtZW51IHtcbiAgICBib3gtc2hhZG93OiAtMjBweCAxMHB4IDI1cHggcmdiYSgxMjYsIDEyNiwgMTI2LCAwLjI1KTtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuNik7XG4gICAgY29sb3I6IGJsYWNrO1xufVxuXG4uYWNlX29wdGlvbnNNZW51RW50cnk6aG92ZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTAwLCAxMDAsIDEwMCwgMC4xKTtcbiAgICB0cmFuc2l0aW9uOiBhbGwgMC4zc1xufVxuXG4uYWNlX2Nsb3NlQnV0dG9uIHtcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI0NSwgMTQ2LCAxNDYsIDAuNSk7XG4gICAgYm9yZGVyOiAxcHggc29saWQgI0Y0OEE4QTtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgcGFkZGluZzogN3B4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICByaWdodDogLThweDtcbiAgICB0b3A6IC04cHg7XG4gICAgei1pbmRleDogMTAwMDAwO1xufVxuLmFjZV9jbG9zZUJ1dHRvbntcbiAgICBiYWNrZ3JvdW5kOiByZ2JhKDI0NSwgMTQ2LCAxNDYsIDAuOSk7XG59XG4uYWNlX29wdGlvbnNNZW51S2V5IHtcbiAgICBjb2xvcjogZGFya3NsYXRlYmx1ZTtcbiAgICBmb250LXdlaWdodDogYm9sZDtcbn1cbi5hY2Vfb3B0aW9uc01lbnVDb21tYW5kIHtcbiAgICBjb2xvcjogZGFya2N5YW47XG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbn1cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeSBpbnB1dCwgLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvbiB7XG4gICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbn1cblxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvblthY2Vfc2VsZWN0ZWRfYnV0dG9uPXRydWVdIHtcbiAgICBiYWNrZ3JvdW5kOiAjZTdlN2U3O1xuICAgIGJveC1zaGFkb3c6IDFweCAwcHggMnB4IDBweCAjYWRhZGFkIGluc2V0O1xuICAgIGJvcmRlci1jb2xvcjogI2FkYWRhZDtcbn1cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeSBidXR0b24ge1xuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkIGxpZ2h0Z3JheTtcbiAgICBtYXJnaW46IDBweDtcbn1cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeSBidXR0b246aG92ZXJ7XG4gICAgYmFja2dyb3VuZDogI2YwZjBmMDtcbn1gO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtb2RlcyA9IFtdO1xuLyoqXG4gKiBTdWdnZXN0cyBhIG1vZGUgYmFzZWQgb24gdGhlIGZpbGUgZXh0ZW5zaW9uIHByZXNlbnQgaW4gdGhlIGdpdmVuIHBhdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIHRoZSBmaWxlXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBSZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZVxuICogIHN1Z2dlc3RlZCBtb2RlLlxuICovXG5mdW5jdGlvbiBnZXRNb2RlRm9yUGF0aChwYXRoKSB7XG4gICAgdmFyIG1vZGUgPSBtb2Rlc0J5TmFtZS50ZXh0O1xuICAgIHZhciBmaWxlTmFtZSA9IHBhdGguc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG1vZGVzW2ldLnN1cHBvcnRzRmlsZShmaWxlTmFtZSkpIHtcbiAgICAgICAgICAgIG1vZGUgPSBtb2Rlc1tpXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtb2RlO1xufVxuXG5jbGFzcyBNb2RlIHtcbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBjYXB0aW9uLCBleHRlbnNpb25zKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY2FwdGlvbiA9IGNhcHRpb247XG4gICAgICAgIHRoaXMubW9kZSA9IFwiYWNlL21vZGUvXCIgKyBuYW1lO1xuICAgICAgICB0aGlzLmV4dGVuc2lvbnMgPSBleHRlbnNpb25zO1xuICAgICAgICB2YXIgcmU7XG4gICAgICAgIGlmICgvXFxeLy50ZXN0KGV4dGVuc2lvbnMpKSB7XG4gICAgICAgICAgICByZSA9IGV4dGVuc2lvbnMucmVwbGFjZSgvXFx8KFxcXik/L2csIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiJHxcIiArIChiID8gXCJeXCIgOiBcIl4uKlxcXFwuXCIpO1xuICAgICAgICAgICAgfSkgKyBcIiRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlID0gXCJeLipcXFxcLihcIiArIGV4dGVuc2lvbnMgKyBcIikkXCI7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmV4dFJlID0gbmV3IFJlZ0V4cChyZSwgXCJnaVwiKTtcbiAgICB9XG5cbiAgICBzdXBwb3J0c0ZpbGUoZmlsZW5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZpbGVuYW1lLm1hdGNoKHRoaXMuZXh0UmUpO1xuICAgIH1cbn1cblxuLy8gdG9kbyBmaXJzdGxpbmVtYXRjaFxudmFyIHN1cHBvcnRlZE1vZGVzID0ge1xuICAgIEFCQVA6ICAgICAgICBbXCJhYmFwXCJdLFxuICAgIEFCQzogICAgICAgICBbXCJhYmNcIl0sXG4gICAgQWN0aW9uU2NyaXB0OltcImFzXCJdLFxuICAgIEFEQTogICAgICAgICBbXCJhZGF8YWRiXCJdLFxuICAgIEFsZGE6ICAgICAgICBbXCJhbGRhXCJdLFxuICAgIEFwYWNoZV9Db25mOiBbXCJeaHRhY2Nlc3N8Xmh0Z3JvdXBzfF5odHBhc3N3ZHxeY29uZnxodGFjY2Vzc3xodGdyb3Vwc3xodHBhc3N3ZFwiXSxcbiAgICBBcGV4OiAgICAgICAgW1wiYXBleHxjbHN8dHJpZ2dlcnx0Z3JcIl0sXG4gICAgQVFMOiAgICAgICAgIFtcImFxbFwiXSxcbiAgICBBc2NpaURvYzogICAgW1wiYXNjaWlkb2N8YWRvY1wiXSxcbiAgICBBU0w6ICAgICAgICAgW1wiZHNsfGFzbHxhc2wuanNvblwiXSxcbiAgICBBc3NlbWJseV94ODY6W1wiYXNtfGFcIl0sXG4gICAgQXV0b0hvdEtleTogIFtcImFoa1wiXSxcbiAgICBCYXRjaEZpbGU6ICAgW1wiYmF0fGNtZFwiXSxcbiAgICBCaWJUZVg6ICAgICAgW1wiYmliXCJdLFxuICAgIENfQ3BwOiAgICAgICBbXCJjcHB8Y3xjY3xjeHh8aHxoaHxocHB8aW5vXCJdLFxuICAgIEM5U2VhcmNoOiAgICBbXCJjOXNlYXJjaF9yZXN1bHRzXCJdLFxuICAgIENpcnJ1OiAgICAgICBbXCJjaXJydXxjclwiXSxcbiAgICBDbG9qdXJlOiAgICAgW1wiY2xqfGNsanNcIl0sXG4gICAgQ29ib2w6ICAgICAgIFtcIkNCTHxDT0JcIl0sXG4gICAgY29mZmVlOiAgICAgIFtcImNvZmZlZXxjZnxjc29ufF5DYWtlZmlsZVwiXSxcbiAgICBDb2xkRnVzaW9uOiAgW1wiY2ZtfGNmY1wiXSxcbiAgICBDcnlzdGFsOiAgICAgW1wiY3JcIl0sXG4gICAgQ1NoYXJwOiAgICAgIFtcImNzXCJdLFxuICAgIENzb3VuZF9Eb2N1bWVudDogW1wiY3NkXCJdLFxuICAgIENzb3VuZF9PcmNoZXN0cmE6IFtcIm9yY1wiXSxcbiAgICBDc291bmRfU2NvcmU6IFtcInNjb1wiXSxcbiAgICBDU1M6ICAgICAgICAgW1wiY3NzXCJdLFxuICAgIEN1cmx5OiAgICAgICBbXCJjdXJseVwiXSxcbiAgICBEOiAgICAgICAgICAgW1wiZHxkaVwiXSxcbiAgICBEYXJ0OiAgICAgICAgW1wiZGFydFwiXSxcbiAgICBEaWZmOiAgICAgICAgW1wiZGlmZnxwYXRjaFwiXSxcbiAgICBEb2NrZXJmaWxlOiAgW1wiXkRvY2tlcmZpbGVcIl0sXG4gICAgRG90OiAgICAgICAgIFtcImRvdFwiXSxcbiAgICBEcm9vbHM6ICAgICAgW1wiZHJsXCJdLFxuICAgIEVkaWZhY3Q6ICAgICBbXCJlZGlcIl0sXG4gICAgRWlmZmVsOiAgICAgIFtcImV8Z2VcIl0sXG4gICAgRUpTOiAgICAgICAgIFtcImVqc1wiXSxcbiAgICBFbGl4aXI6ICAgICAgW1wiZXh8ZXhzXCJdLFxuICAgIEVsbTogICAgICAgICBbXCJlbG1cIl0sXG4gICAgRXJsYW5nOiAgICAgIFtcImVybHxocmxcIl0sXG4gICAgRm9ydGg6ICAgICAgIFtcImZydHxmc3xsZHJ8ZnRofDR0aFwiXSxcbiAgICBGb3J0cmFuOiAgICAgW1wiZnxmOTBcIl0sXG4gICAgRlNoYXJwOiAgICAgIFtcImZzaXxmc3xtbHxtbGl8ZnN4fGZzc2NyaXB0XCJdLFxuICAgIEZTTDogICAgICAgICBbXCJmc2xcIl0sXG4gICAgRlRMOiAgICAgICAgIFtcImZ0bFwiXSxcbiAgICBHY29kZTogICAgICAgW1wiZ2NvZGVcIl0sXG4gICAgR2hlcmtpbjogICAgIFtcImZlYXR1cmVcIl0sXG4gICAgR2l0aWdub3JlOiAgIFtcIl4uZ2l0aWdub3JlXCJdLFxuICAgIEdsc2w6ICAgICAgICBbXCJnbHNsfGZyYWd8dmVydFwiXSxcbiAgICBHb2JzdG9uZXM6ICAgW1wiZ2JzXCJdLFxuICAgIGdvbGFuZzogICAgICBbXCJnb1wiXSxcbiAgICBHcmFwaFFMU2NoZW1hOiBbXCJncWxcIl0sXG4gICAgR3Jvb3Z5OiAgICAgIFtcImdyb292eVwiXSxcbiAgICBIQU1MOiAgICAgICAgW1wiaGFtbFwiXSxcbiAgICBIYW5kbGViYXJzOiAgW1wiaGJzfGhhbmRsZWJhcnN8dHBsfG11c3RhY2hlXCJdLFxuICAgIEhhc2tlbGw6ICAgICBbXCJoc1wiXSxcbiAgICBIYXNrZWxsX0NhYmFsOiBbXCJjYWJhbFwiXSxcbiAgICBoYVhlOiAgICAgICAgW1wiaHhcIl0sXG4gICAgSGpzb246ICAgICAgIFtcImhqc29uXCJdLFxuICAgIEhUTUw6ICAgICAgICBbXCJodG1sfGh0bXx4aHRtbHx2dWV8d2V8d3B5XCJdLFxuICAgIEhUTUxfRWxpeGlyOiBbXCJlZXh8aHRtbC5lZXhcIl0sXG4gICAgSFRNTF9SdWJ5OiAgIFtcImVyYnxyaHRtbHxodG1sLmVyYlwiXSxcbiAgICBJTkk6ICAgICAgICAgW1wiaW5pfGNvbmZ8Y2ZnfHByZWZzXCJdLFxuICAgIElvOiAgICAgICAgICBbXCJpb1wiXSxcbiAgICBJb246ICAgICAgICAgW1wiaW9uXCJdLFxuICAgIEphY2s6ICAgICAgICBbXCJqYWNrXCJdLFxuICAgIEphZGU6ICAgICAgICBbXCJqYWRlfHB1Z1wiXSxcbiAgICBKYXZhOiAgICAgICAgW1wiamF2YVwiXSxcbiAgICBKYXZhU2NyaXB0OiAgW1wianN8anNtfGpzeHxjanN8bWpzXCJdLFxuICAgIEpFWEw6ICAgICAgICBbXCJqZXhsXCJdLFxuICAgIEpTT046ICAgICAgICBbXCJqc29uXCJdLFxuICAgIEpTT041OiAgICAgICBbXCJqc29uNVwiXSxcbiAgICBKU09OaXE6ICAgICAgW1wianFcIl0sXG4gICAgSlNQOiAgICAgICAgIFtcImpzcFwiXSxcbiAgICBKU1NNOiAgICAgICAgW1wianNzbXxqc3NtX3N0YXRlXCJdLFxuICAgIEpTWDogICAgICAgICBbXCJqc3hcIl0sXG4gICAgSnVsaWE6ICAgICAgIFtcImpsXCJdLFxuICAgIEtvdGxpbjogICAgICBbXCJrdHxrdHNcIl0sXG4gICAgTGFUZVg6ICAgICAgIFtcInRleHxsYXRleHxsdHh8YmliXCJdLFxuICAgIExhdHRlOiAgICAgICBbXCJsYXR0ZVwiXSxcbiAgICBMRVNTOiAgICAgICAgW1wibGVzc1wiXSxcbiAgICBMaXF1aWQ6ICAgICAgW1wibGlxdWlkXCJdLFxuICAgIExpc3A6ICAgICAgICBbXCJsaXNwXCJdLFxuICAgIExpdmVTY3JpcHQ6ICBbXCJsc1wiXSxcbiAgICBMb2c6ICAgICAgICAgW1wibG9nXCJdLFxuICAgIExvZ2lRTDogICAgICBbXCJsb2dpY3xscWxcIl0sXG4gICAgTG9ndGFsazogICAgIFtcImxndFwiXSxcbiAgICBMU0w6ICAgICAgICAgW1wibHNsXCJdLFxuICAgIEx1YTogICAgICAgICBbXCJsdWFcIl0sXG4gICAgTHVhUGFnZTogICAgIFtcImxwXCJdLFxuICAgIEx1Y2VuZTogICAgICBbXCJsdWNlbmVcIl0sXG4gICAgTWFrZWZpbGU6ICAgIFtcIl5NYWtlZmlsZXxeR05VbWFrZWZpbGV8Xm1ha2VmaWxlfF5PQ2FtbE1ha2VmaWxlfG1ha2VcIl0sXG4gICAgTWFya2Rvd246ICAgIFtcIm1kfG1hcmtkb3duXCJdLFxuICAgIE1hc2s6ICAgICAgICBbXCJtYXNrXCJdLFxuICAgIE1BVExBQjogICAgICBbXCJtYXRsYWJcIl0sXG4gICAgTWF6ZTogICAgICAgIFtcIm16XCJdLFxuICAgIE1lZGlhV2lraTogICBbXCJ3aWtpfG1lZGlhd2lraVwiXSxcbiAgICBNRUw6ICAgICAgICAgW1wibWVsXCJdLFxuICAgIE1JUFM6ICAgICAgICBbXCJzfGFzbVwiXSxcbiAgICBNSVhBTDogICAgICAgW1wibWl4YWxcIl0sXG4gICAgTVVTSENvZGU6ICAgIFtcIm1jfG11c2hcIl0sXG4gICAgTXlTUUw6ICAgICAgIFtcIm15c3FsXCJdLFxuICAgIE5naW54OiAgICAgICBbXCJuZ2lueHxjb25mXCJdLFxuICAgIE5pbTogICAgICAgICBbXCJuaW1cIl0sXG4gICAgTml4OiAgICAgICAgIFtcIm5peFwiXSxcbiAgICBOU0lTOiAgICAgICAgW1wibnNpfG5zaFwiXSxcbiAgICBOdW5qdWNrczogICAgW1wibnVuanVja3N8bnVuanN8bmp8bmprXCJdLFxuICAgIE9iamVjdGl2ZUM6ICBbXCJtfG1tXCJdLFxuICAgIE9DYW1sOiAgICAgICBbXCJtbHxtbGlcIl0sXG4gICAgT2RpbjogICAgICAgIFtcIm9kaW5cIl0sXG4gICAgUGFydGlRTDogICAgIFtcInBhcnRpcWx8cHFsXCJdLFxuICAgIFBhc2NhbDogICAgICBbXCJwYXN8cFwiXSxcbiAgICBQZXJsOiAgICAgICAgW1wicGx8cG1cIl0sXG4gICAgcGdTUUw6ICAgICAgIFtcInBnc3FsXCJdLFxuICAgIFBIUDogICAgICAgICBbXCJwaHB8aW5jfHBodG1sfHNodG1sfHBocDN8cGhwNHxwaHA1fHBocHN8cGhwdHxhd3xjdHB8bW9kdWxlXCJdLFxuICAgIFBIUF9MYXJhdmVsX2JsYWRlOiBbXCJibGFkZS5waHBcIl0sXG4gICAgUGlnOiAgICAgICAgIFtcInBpZ1wiXSxcbiAgICBQTFNRTDogICAgICAgW1wicGxzcWxcIl0sXG4gICAgUG93ZXJzaGVsbDogIFtcInBzMVwiXSxcbiAgICBQcmFhdDogICAgICAgW1wicHJhYXR8cHJhYXRzY3JpcHR8cHNjfHByb2NcIl0sXG4gICAgUHJpc21hOiAgICAgIFtcInByaXNtYVwiXSxcbiAgICBQcm9sb2c6ICAgICAgW1wicGxnfHByb2xvZ1wiXSxcbiAgICBQcm9wZXJ0aWVzOiAgW1wicHJvcGVydGllc1wiXSxcbiAgICBQcm90b2J1ZjogICAgW1wicHJvdG9cIl0sXG4gICAgUHVwcGV0OiAgICAgIFtcImVwcHxwcFwiXSxcbiAgICBQeXRob246ICAgICAgW1wicHlcIl0sXG4gICAgUU1MOiAgICAgICAgIFtcInFtbFwiXSxcbiAgICBSOiAgICAgICAgICAgW1wiclwiXSxcbiAgICBSYWt1OiAgICAgICAgW1wicmFrdXxyYWt1bW9kfHJha3V0ZXN0fHA2fHBsNnxwbTZcIl0sXG4gICAgUmF6b3I6ICAgICAgIFtcImNzaHRtbHxhc3BcIl0sXG4gICAgUkRvYzogICAgICAgIFtcIlJkXCJdLFxuICAgIFJlZDogICAgICAgICBbXCJyZWR8cmVkc1wiXSxcbiAgICBSSFRNTDogICAgICAgW1wiUmh0bWxcIl0sXG4gICAgUm9ib3Q6ICAgICAgIFtcInJvYm90fHJlc291cmNlXCJdLFxuICAgIFJTVDogICAgICAgICBbXCJyc3RcIl0sXG4gICAgUnVieTogICAgICAgIFtcInJifHJ1fGdlbXNwZWN8cmFrZXxeR3VhcmRmaWxlfF5SYWtlZmlsZXxeR2VtZmlsZVwiXSxcbiAgICBSdXN0OiAgICAgICAgW1wicnNcIl0sXG4gICAgU2FDOiAgICAgICAgIFtcInNhY1wiXSxcbiAgICBTQVNTOiAgICAgICAgW1wic2Fzc1wiXSxcbiAgICBTQ0FEOiAgICAgICAgW1wic2NhZFwiXSxcbiAgICBTY2FsYTogICAgICAgW1wic2NhbGF8c2J0XCJdLFxuICAgIFNjaGVtZTogICAgICBbXCJzY218c218cmt0fG9ha3xzY2hlbWVcIl0sXG4gICAgU2NyeXB0OiAgICAgIFtcInNjcnlwdFwiXSxcbiAgICBTQ1NTOiAgICAgICAgW1wic2Nzc1wiXSxcbiAgICBTSDogICAgICAgICAgW1wic2h8YmFzaHxeLmJhc2hyY1wiXSxcbiAgICBTSlM6ICAgICAgICAgW1wic2pzXCJdLFxuICAgIFNsaW06ICAgICAgICBbXCJzbGltfHNraW1cIl0sXG4gICAgU21hcnR5OiAgICAgIFtcInNtYXJ0eXx0cGxcIl0sXG4gICAgU21pdGh5OiAgICAgIFtcInNtaXRoeVwiXSxcbiAgICBzbmlwcGV0czogICAgW1wic25pcHBldHNcIl0sXG4gICAgU295X1RlbXBsYXRlOltcInNveVwiXSxcbiAgICBTcGFjZTogICAgICAgW1wic3BhY2VcIl0sXG4gICAgU1BBUlFMOiAgICAgIFtcInJxXCJdLFxuICAgIFNRTDogICAgICAgICBbXCJzcWxcIl0sXG4gICAgU1FMU2VydmVyOiAgIFtcInNxbHNlcnZlclwiXSxcbiAgICBTdHlsdXM6ICAgICAgW1wic3R5bHxzdHlsdXNcIl0sXG4gICAgU1ZHOiAgICAgICAgIFtcInN2Z1wiXSxcbiAgICBTd2lmdDogICAgICAgW1wic3dpZnRcIl0sXG4gICAgVGNsOiAgICAgICAgIFtcInRjbFwiXSxcbiAgICBUZXJyYWZvcm06ICAgW1widGZcIiwgXCJ0ZnZhcnNcIiwgXCJ0ZXJyYWdydW50XCJdLFxuICAgIFRleDogICAgICAgICBbXCJ0ZXhcIl0sXG4gICAgVGV4dDogICAgICAgIFtcInR4dFwiXSxcbiAgICBUZXh0aWxlOiAgICAgW1widGV4dGlsZVwiXSxcbiAgICBUb21sOiAgICAgICAgW1widG9tbFwiXSxcbiAgICBUU1g6ICAgICAgICAgW1widHN4XCJdLFxuICAgIFR1cnRsZTogICAgICBbXCJ0dGxcIl0sXG4gICAgVHdpZzogICAgICAgIFtcInR3aWd8c3dpZ1wiXSxcbiAgICBUeXBlc2NyaXB0OiAgW1widHN8dHlwZXNjcmlwdHxzdHJcIl0sXG4gICAgVmFsYTogICAgICAgIFtcInZhbGFcIl0sXG4gICAgVkJTY3JpcHQ6ICAgIFtcInZic3x2YlwiXSxcbiAgICBWZWxvY2l0eTogICAgW1widm1cIl0sXG4gICAgVmVyaWxvZzogICAgIFtcInZ8dmh8c3Z8c3ZoXCJdLFxuICAgIFZIREw6ICAgICAgICBbXCJ2aGR8dmhkbFwiXSxcbiAgICBWaXN1YWxmb3JjZTogW1widmZwfGNvbXBvbmVudHxwYWdlXCJdLFxuICAgIFdvbGxvazogICAgICBbXCJ3bGt8d3BnbXx3dGVzdFwiXSxcbiAgICBYTUw6ICAgICAgICAgW1wieG1sfHJkZnxyc3N8d3NkbHx4c2x0fGF0b218bWF0aG1sfG1tbHx4dWx8eGJsfHhhbWxcIl0sXG4gICAgWFF1ZXJ5OiAgICAgIFtcInhxXCJdLFxuICAgIFlBTUw6ICAgICAgICBbXCJ5YW1sfHltbFwiXSxcbiAgICBaZWVrOiAgICAgICAgW1wiemVla3xicm9cIl0sXG4gICAgLy8gQWRkIHRoZSBtaXNzaW5nIG1vZGUgXCJEamFuZ29cIiB0byBleHQtbW9kZWxpc3RcbiAgICBEamFuZ286ICAgICAgW1wiaHRtbFwiXVxufTtcblxudmFyIG5hbWVPdmVycmlkZXMgPSB7XG4gICAgT2JqZWN0aXZlQzogXCJPYmplY3RpdmUtQ1wiLFxuICAgIENTaGFycDogXCJDI1wiLFxuICAgIGdvbGFuZzogXCJHb1wiLFxuICAgIENfQ3BwOiBcIkMgYW5kIEMrK1wiLFxuICAgIENzb3VuZF9Eb2N1bWVudDogXCJDc291bmQgRG9jdW1lbnRcIixcbiAgICBDc291bmRfT3JjaGVzdHJhOiBcIkNzb3VuZFwiLFxuICAgIENzb3VuZF9TY29yZTogXCJDc291bmQgU2NvcmVcIixcbiAgICBjb2ZmZWU6IFwiQ29mZmVlU2NyaXB0XCIsXG4gICAgSFRNTF9SdWJ5OiBcIkhUTUwgKFJ1YnkpXCIsXG4gICAgSFRNTF9FbGl4aXI6IFwiSFRNTCAoRWxpeGlyKVwiLFxuICAgIEZUTDogXCJGcmVlTWFya2VyXCIsXG4gICAgUEhQX0xhcmF2ZWxfYmxhZGU6IFwiUEhQIChCbGFkZSBUZW1wbGF0ZSlcIixcbiAgICBQZXJsNjogXCJQZXJsIDZcIixcbiAgICBBdXRvSG90S2V5OiBcIkF1dG9Ib3RrZXkgLyBBdXRvSXRcIlxufTtcblxudmFyIG1vZGVzQnlOYW1lID0ge307XG5mb3IgKHZhciBuYW1lIGluIHN1cHBvcnRlZE1vZGVzKSB7XG4gICAgdmFyIGRhdGEgPSBzdXBwb3J0ZWRNb2Rlc1tuYW1lXTtcbiAgICB2YXIgZGlzcGxheU5hbWUgPSAobmFtZU92ZXJyaWRlc1tuYW1lXSB8fCBuYW1lKS5yZXBsYWNlKC9fL2csIFwiIFwiKTtcbiAgICB2YXIgZmlsZW5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIG1vZGUgPSBuZXcgTW9kZShmaWxlbmFtZSwgZGlzcGxheU5hbWUsIGRhdGFbMF0pO1xuICAgIG1vZGVzQnlOYW1lW2ZpbGVuYW1lXSA9IG1vZGU7XG4gICAgbW9kZXMucHVzaChtb2RlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0TW9kZUZvclBhdGg6IGdldE1vZGVGb3JQYXRoLFxuICAgIG1vZGVzOiBtb2RlcyxcbiAgICBtb2Rlc0J5TmFtZTogbW9kZXNCeU5hbWVcbn07XG4iLCJcInVzZSBzdHJpY3RcIjtcblxucmVxdWlyZShcIi4vbWVudV90b29scy9vdmVybGF5X3BhZ2VcIik7XG5cbnZhciBkb20gPSByZXF1aXJlKFwiLi4vbGliL2RvbVwiKTtcbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiLi4vY29uZmlnXCIpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoXCIuLi9saWIvZXZlbnRfZW1pdHRlclwiKS5FdmVudEVtaXR0ZXI7XG52YXIgYnVpbGREb20gPSBkb20uYnVpbGREb207XG5cbnZhciBtb2RlbGlzdCA9IHJlcXVpcmUoXCIuL21vZGVsaXN0XCIpO1xudmFyIHRoZW1lbGlzdCA9IHJlcXVpcmUoXCIuL3RoZW1lbGlzdFwiKTtcblxudmFyIHRoZW1lcyA9IHsgQnJpZ2h0OiBbXSwgRGFyazogW10gfTtcbnRoZW1lbGlzdC50aGVtZXMuZm9yRWFjaChmdW5jdGlvbih4KSB7XG4gICAgdGhlbWVzW3guaXNEYXJrID8gXCJEYXJrXCIgOiBcIkJyaWdodFwiXS5wdXNoKHsgY2FwdGlvbjogeC5jYXB0aW9uLCB2YWx1ZTogeC50aGVtZSB9KTtcbn0pO1xuXG52YXIgbW9kZXMgPSBtb2RlbGlzdC5tb2Rlcy5tYXAoZnVuY3Rpb24oeCl7IFxuICAgIHJldHVybiB7IGNhcHRpb246IHguY2FwdGlvbiwgdmFsdWU6IHgubW9kZSB9OyBcbn0pO1xuXG5cbnZhciBvcHRpb25Hcm91cHMgPSB7XG4gICAgTWFpbjoge1xuICAgICAgICBNb2RlOiB7XG4gICAgICAgICAgICBwYXRoOiBcIm1vZGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBpdGVtczogbW9kZXNcbiAgICAgICAgfSxcbiAgICAgICAgVGhlbWU6IHtcbiAgICAgICAgICAgIHBhdGg6IFwidGhlbWVcIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBpdGVtczogdGhlbWVzXG4gICAgICAgIH0sXG4gICAgICAgIFwiS2V5YmluZGluZ1wiOiB7XG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvbkJhclwiLFxuICAgICAgICAgICAgcGF0aDogXCJrZXlib2FyZEhhbmRsZXJcIixcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJBY2VcIiwgdmFsdWUgOiBudWxsIH0sXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJWaW1cIiwgdmFsdWUgOiBcImFjZS9rZXlib2FyZC92aW1cIiB9LFxuICAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiRW1hY3NcIiwgdmFsdWUgOiBcImFjZS9rZXlib2FyZC9lbWFjc1wiIH0sXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJTdWJsaW1lXCIsIHZhbHVlIDogXCJhY2Uva2V5Ym9hcmQvc3VibGltZVwiIH0sXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJWU0NvZGVcIiwgdmFsdWUgOiBcImFjZS9rZXlib2FyZC92c2NvZGVcIiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiRm9udCBTaXplXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZm9udFNpemVcIixcbiAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IDEyLFxuICAgICAgICAgICAgZGVmYXVsdHM6IFtcbiAgICAgICAgICAgICAgICB7Y2FwdGlvbjogXCIxMnB4XCIsIHZhbHVlOiAxMn0sXG4gICAgICAgICAgICAgICAge2NhcHRpb246IFwiMjRweFwiLCB2YWx1ZTogMjR9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiU29mdCBXcmFwXCI6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uQmFyXCIsXG4gICAgICAgICAgICBwYXRoOiBcIndyYXBcIixcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIk9mZlwiLCAgdmFsdWUgOiBcIm9mZlwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlZpZXdcIiwgdmFsdWUgOiBcImZyZWVcIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJtYXJnaW5cIiwgdmFsdWUgOiBcInByaW50TWFyZ2luXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiNDBcIiwgICB2YWx1ZSA6IFwiNDBcIiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiQ3Vyc29yIFN0eWxlXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiY3Vyc29yU3R5bGVcIixcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIkFjZVwiLCAgICB2YWx1ZSA6IFwiYWNlXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiU2xpbVwiLCAgIHZhbHVlIDogXCJzbGltXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiU21vb3RoXCIsIHZhbHVlIDogXCJzbW9vdGhcIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJTbW9vdGggQW5kIFNsaW1cIiwgdmFsdWUgOiBcInNtb290aCBzbGltXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiV2lkZVwiLCAgIHZhbHVlIDogXCJ3aWRlXCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBcIkZvbGRpbmdcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJmb2xkU3R5bGVcIixcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJNYW51YWxcIiwgdmFsdWUgOiBcIm1hbnVhbFwiIH0sXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJNYXJrIGJlZ2luXCIsIHZhbHVlIDogXCJtYXJrYmVnaW5cIiB9LFxuICAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiTWFyayBiZWdpbiBhbmQgZW5kXCIsIHZhbHVlIDogXCJtYXJrYmVnaW5lbmRcIiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiU29mdCBUYWJzXCI6IFt7XG4gICAgICAgICAgICBwYXRoOiBcInVzZVNvZnRUYWJzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYXJpYUxhYmVsOiBcIlRhYiBTaXplXCIsXG4gICAgICAgICAgICBwYXRoOiBcInRhYlNpemVcIixcbiAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICB2YWx1ZXM6IFsyLCAzLCA0LCA4LCAxNl1cbiAgICAgICAgfV0sXG4gICAgICAgIFwiT3ZlcnNjcm9sbFwiOiB7XG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvbkJhclwiLFxuICAgICAgICAgICAgcGF0aDogXCJzY3JvbGxQYXN0RW5kXCIsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJOb25lXCIsICB2YWx1ZSA6IDAgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiSGFsZlwiLCAgIHZhbHVlIDogMC41IH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIkZ1bGxcIiwgICB2YWx1ZSA6IDEgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfSxcbiAgICBNb3JlOiB7XG4gICAgICAgIFwiQXRvbWljIHNvZnQgdGFic1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcIm5hdmlnYXRlV2l0aGluU29mdFRhYnNcIlxuICAgICAgICB9LFxuICAgICAgICBcIkVuYWJsZSBCZWhhdmlvdXJzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiYmVoYXZpb3Vyc0VuYWJsZWRcIlxuICAgICAgICB9LFxuICAgICAgICBcIldyYXAgd2l0aCBxdW90ZXNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJ3cmFwQmVoYXZpb3Vyc0VuYWJsZWRcIlxuICAgICAgICB9LFxuICAgICAgICBcIkVuYWJsZSBBdXRvIEluZGVudFwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImVuYWJsZUF1dG9JbmRlbnRcIlxuICAgICAgICB9LFxuICAgICAgICBcIkZ1bGwgTGluZSBTZWxlY3Rpb25cIjoge1xuICAgICAgICAgICAgdHlwZTogXCJjaGVja2JveFwiLFxuICAgICAgICAgICAgdmFsdWVzOiBcInRleHR8bGluZVwiLFxuICAgICAgICAgICAgcGF0aDogXCJzZWxlY3Rpb25TdHlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiSGlnaGxpZ2h0IEFjdGl2ZSBMaW5lXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiaGlnaGxpZ2h0QWN0aXZlTGluZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiU2hvdyBJbnZpc2libGVzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwic2hvd0ludmlzaWJsZXNcIlxuICAgICAgICB9LFxuICAgICAgICBcIlNob3cgSW5kZW50IEd1aWRlc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImRpc3BsYXlJbmRlbnRHdWlkZXNcIlxuICAgICAgICB9LFxuICAgICAgICBcIkhpZ2hsaWdodCBJbmRlbnQgR3VpZGVzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiaGlnaGxpZ2h0SW5kZW50R3VpZGVzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJQZXJzaXN0ZW50IEhTY3JvbGxiYXJcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJoU2Nyb2xsQmFyQWx3YXlzVmlzaWJsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiUGVyc2lzdGVudCBWU2Nyb2xsYmFyXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwidlNjcm9sbEJhckFsd2F5c1Zpc2libGVcIlxuICAgICAgICB9LFxuICAgICAgICBcIkFuaW1hdGUgc2Nyb2xsaW5nXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiYW5pbWF0ZWRTY3JvbGxcIlxuICAgICAgICB9LFxuICAgICAgICBcIlNob3cgR3V0dGVyXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwic2hvd0d1dHRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiU2hvdyBMaW5lIE51bWJlcnNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJzaG93TGluZU51bWJlcnNcIlxuICAgICAgICB9LFxuICAgICAgICBcIlJlbGF0aXZlIExpbmUgTnVtYmVyc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInJlbGF0aXZlTGluZU51bWJlcnNcIlxuICAgICAgICB9LFxuICAgICAgICBcIkZpeGVkIEd1dHRlciBXaWR0aFwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImZpeGVkV2lkdGhHdXR0ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBcIlNob3cgUHJpbnQgTWFyZ2luXCI6IFt7XG4gICAgICAgICAgICBwYXRoOiBcInNob3dQcmludE1hcmdpblwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGFyaWFMYWJlbDogXCJQcmludCBNYXJnaW5cIixcbiAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICBwYXRoOiBcInByaW50TWFyZ2luQ29sdW1uXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwiSW5kZW50ZWQgU29mdCBXcmFwXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiaW5kZW50ZWRTb2Z0V3JhcFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiSGlnaGxpZ2h0IHNlbGVjdGVkIHdvcmRcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJoaWdobGlnaHRTZWxlY3RlZFdvcmRcIlxuICAgICAgICB9LFxuICAgICAgICBcIkZhZGUgRm9sZCBXaWRnZXRzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZmFkZUZvbGRXaWRnZXRzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJVc2UgdGV4dGFyZWEgZm9yIElNRVwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInVzZVRleHRhcmVhRm9ySU1FXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJNZXJnZSBVbmRvIERlbHRhc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcIm1lcmdlVW5kb0RlbHRhc1wiLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiQWx3YXlzXCIsICB2YWx1ZSA6IFwiYWx3YXlzXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiTmV2ZXJcIiwgICB2YWx1ZSA6IFwiZmFsc2VcIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJUaW1lZFwiLCAgIHZhbHVlIDogXCJ0cnVlXCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBcIkVsYXN0aWMgVGFic3RvcHNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJ1c2VFbGFzdGljVGFic3RvcHNcIlxuICAgICAgICB9LFxuICAgICAgICBcIkluY3JlbWVudGFsIFNlYXJjaFwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInVzZUluY3JlbWVudGFsU2VhcmNoXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJSZWFkLW9ubHlcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJyZWFkT25seVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiQ29weSB3aXRob3V0IHNlbGVjdGlvblwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImNvcHlXaXRoRW1wdHlTZWxlY3Rpb25cIlxuICAgICAgICB9LFxuICAgICAgICBcIkxpdmUgQXV0b2NvbXBsZXRpb25cIjoge1xuICAgICAgICAgICAgcGF0aDogXCJlbmFibGVMaXZlQXV0b2NvbXBsZXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBcIkN1c3RvbSBzY3JvbGxiYXJcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJjdXN0b21TY3JvbGxiYXJcIlxuICAgICAgICB9LFxuICAgICAgICBcIlVzZSBTVkcgZ3V0dGVyIGljb25zXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwidXNlU3ZnR3V0dGVySWNvbnNcIlxuICAgICAgICB9LFxuICAgICAgICBcIkFubm90YXRpb25zIGZvciBmb2xkZWQgbGluZXNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJzaG93Rm9sZGVkQW5ub3RhdGlvbnNcIlxuICAgICAgICB9LFxuICAgICAgICBcIktleWJvYXJkIEFjY2Vzc2liaWxpdHkgTW9kZVwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImVuYWJsZUtleWJvYXJkQWNjZXNzaWJpbGl0eVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiR3V0dGVyIHRvb2x0aXAgZm9sbG93cyBtb3VzZVwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInRvb2x0aXBGb2xsb3dzTW91c2VcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogdHJ1ZVxuICAgICAgICB9XG4gICAgfVxufTtcblxuY2xhc3MgT3B0aW9uUGFuZWwge1xuICAgIGNvbnN0cnVjdG9yKGVkaXRvciwgZWxlbWVudCkge1xuICAgICAgICB0aGlzLmVkaXRvciA9IGVkaXRvcjtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBlbGVtZW50IHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMuZ3JvdXBzID0gW107XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBcbiAgICBhZGQoY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcuTWFpbilcbiAgICAgICAgICAgIG9vcC5taXhpbihvcHRpb25Hcm91cHMuTWFpbiwgY29uZmlnLk1haW4pO1xuICAgICAgICBpZiAoY29uZmlnLk1vcmUpXG4gICAgICAgICAgICBvb3AubWl4aW4ob3B0aW9uR3JvdXBzLk1vcmUsIGNvbmZpZy5Nb3JlKTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBidWlsZERvbShbXCJ0YWJsZVwiLCB7cm9sZTogXCJwcmVzZW50YXRpb25cIiwgaWQ6IFwiY29udHJvbHNcIn0sIFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJPcHRpb25Hcm91cChvcHRpb25Hcm91cHMuTWFpbiksXG4gICAgICAgICAgICBbXCJ0clwiLCBudWxsLCBbXCJ0ZFwiLCB7Y29sc3BhbjogMn0sXG4gICAgICAgICAgICAgICAgW1widGFibGVcIiwge3JvbGU6IFwicHJlc2VudGF0aW9uXCIsIGlkOiBcIm1vcmUtY29udHJvbHNcIn0sIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlck9wdGlvbkdyb3VwKG9wdGlvbkdyb3Vwcy5Nb3JlKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF1dLFxuICAgICAgICAgICAgW1widHJcIiwgbnVsbCwgW1widGRcIiwge2NvbHNwYW46IDJ9LCBcInZlcnNpb24gXCIgKyBjb25maWcudmVyc2lvbl1dXG4gICAgICAgIF0sIHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyT3B0aW9uR3JvdXAoZ3JvdXApIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGdyb3VwKS5tYXAoZnVuY3Rpb24oa2V5LCBpKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGdyb3VwW2tleV07XG4gICAgICAgICAgICBpZiAoIWl0ZW0ucG9zaXRpb24pXG4gICAgICAgICAgICAgICAgaXRlbS5wb3NpdGlvbiA9IGkgLyAxMDAwMDtcbiAgICAgICAgICAgIGlmICghaXRlbS5sYWJlbClcbiAgICAgICAgICAgICAgICBpdGVtLmxhYmVsID0ga2V5O1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH0pLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEucG9zaXRpb24gLSBiLnBvc2l0aW9uO1xuICAgICAgICB9KS5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyT3B0aW9uKGl0ZW0ubGFiZWwsIGl0ZW0pO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyT3B0aW9uQ29udHJvbChrZXksIG9wdGlvbikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24ubWFwKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5yZW5kZXJPcHRpb25Db250cm9sKGtleSwgeCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY29udHJvbDtcbiAgICAgICAgXG4gICAgICAgIHZhciB2YWx1ZSA9IHNlbGYuZ2V0T3B0aW9uKG9wdGlvbik7XG4gICAgICAgIFxuICAgICAgICBpZiAob3B0aW9uLnZhbHVlcyAmJiBvcHRpb24udHlwZSAhPSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLnZhbHVlcyA9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZXMgPSBvcHRpb24udmFsdWVzLnNwbGl0KFwifFwiKTtcbiAgICAgICAgICAgIG9wdGlvbi5pdGVtcyA9IG9wdGlvbi52YWx1ZXMubWFwKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdiwgbmFtZTogdiB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChvcHRpb24udHlwZSA9PSBcImJ1dHRvbkJhclwiKSB7XG4gICAgICAgICAgICBjb250cm9sID0gW1wiZGl2XCIsIHtyb2xlOiBcImdyb3VwXCIsIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IG9wdGlvbi5wYXRoICsgXCItbGFiZWxcIn0sIG9wdGlvbi5pdGVtcy5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXCJidXR0b25cIiwgeyBcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW0udmFsdWUsIFxuICAgICAgICAgICAgICAgICAgICBhY2Vfc2VsZWN0ZWRfYnV0dG9uOiB2YWx1ZSA9PSBpdGVtLnZhbHVlLCBcbiAgICAgICAgICAgICAgICAgICAgJ2FyaWEtcHJlc3NlZCc6IHZhbHVlID09IGl0ZW0udmFsdWUsIFxuICAgICAgICAgICAgICAgICAgICBvbmNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0T3B0aW9uKG9wdGlvbiwgaXRlbS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZXMgPSB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbChcIlthY2Vfc2VsZWN0ZWRfYnV0dG9uXVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2Rlc1tpXS5yZW1vdmVBdHRyaWJ1dGUoXCJhY2Vfc2VsZWN0ZWRfYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzW2ldLnNldEF0dHJpYnV0ZShcImFyaWEtcHJlc3NlZFwiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImFjZV9zZWxlY3RlZF9idXR0b25cIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImFyaWEtcHJlc3NlZFwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICB9LCBpdGVtLmRlc2MgfHwgaXRlbS5jYXB0aW9uIHx8IGl0ZW0ubmFtZV07XG4gICAgICAgICAgICB9KV07XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9uLnR5cGUgPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgY29udHJvbCA9IFtcImlucHV0XCIsIHt0eXBlOiBcIm51bWJlclwiLCB2YWx1ZTogdmFsdWUgfHwgb3B0aW9uLmRlZmF1bHRWYWx1ZSwgc3R5bGU6XCJ3aWR0aDozZW1cIiwgb25pbnB1dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRPcHRpb24ob3B0aW9uLCBwYXJzZUludCh0aGlzLnZhbHVlKSk7XG4gICAgICAgICAgICB9fV07XG4gICAgICAgICAgICBpZiAob3B0aW9uLmFyaWFMYWJlbCkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xbMV1bXCJhcmlhLWxhYmVsXCJdID0gb3B0aW9uLmFyaWFMYWJlbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udHJvbFsxXS5pZCA9IGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb24uZGVmYXVsdHMpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sID0gW2NvbnRyb2wsIG9wdGlvbi5kZWZhdWx0cy5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wiYnV0dG9uXCIsIHtvbmNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMucGFyZW50Tm9kZS5maXJzdENoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBpdGVtLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQub25pbnB1dCgpO1xuICAgICAgICAgICAgICAgICAgICB9fSwgaXRlbS5jYXB0aW9uXTtcbiAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9uLml0ZW1zKSB7XG4gICAgICAgICAgICB2YXIgYnVpbGRJdGVtcyA9IGZ1bmN0aW9uKGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJvcHRpb25cIiwgeyB2YWx1ZTogaXRlbS52YWx1ZSB8fCBpdGVtLm5hbWUgfSwgaXRlbS5kZXNjIHx8IGl0ZW0uY2FwdGlvbiB8fCBpdGVtLm5hbWVdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGl0ZW1zID0gQXJyYXkuaXNBcnJheShvcHRpb24uaXRlbXMpIFxuICAgICAgICAgICAgICAgID8gYnVpbGRJdGVtcyhvcHRpb24uaXRlbXMpXG4gICAgICAgICAgICAgICAgOiBPYmplY3Qua2V5cyhvcHRpb24uaXRlbXMpLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcIm9wdGdyb3VwXCIsIHtcImxhYmVsXCI6IGtleX0sIGJ1aWxkSXRlbXMob3B0aW9uLml0ZW1zW2tleV0pXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnRyb2wgPSBbXCJzZWxlY3RcIiwgeyBpZDoga2V5LCB2YWx1ZTogdmFsdWUsIG9uY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldE9wdGlvbihvcHRpb24sIHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgfSB9LCBpdGVtc107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbi52YWx1ZXMgPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICBvcHRpb24udmFsdWVzID0gb3B0aW9uLnZhbHVlcy5zcGxpdChcInxcIik7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnZhbHVlcykgdmFsdWUgPSB2YWx1ZSA9PSBvcHRpb24udmFsdWVzWzFdO1xuICAgICAgICAgICAgY29udHJvbCA9IFtcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBpZDoga2V5LCBjaGVja2VkOiB2YWx1ZSB8fCBudWxsLCBvbmNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5jaGVja2VkO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24udmFsdWVzKSB2YWx1ZSA9IG9wdGlvbi52YWx1ZXNbdmFsdWUgPyAxIDogMF07XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRPcHRpb24ob3B0aW9uLCB2YWx1ZSk7XG4gICAgICAgICAgICB9fV07XG4gICAgICAgICAgICBpZiAob3B0aW9uLnR5cGUgPT0gXCJjaGVja2VkTnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sID0gW2NvbnRyb2wsIFtdXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udHJvbDtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyT3B0aW9uKGtleSwgb3B0aW9uKSB7XG4gICAgICAgIGlmIChvcHRpb24ucGF0aCAmJiAhb3B0aW9uLm9uY2hhbmdlICYmICF0aGlzLmVkaXRvci4kb3B0aW9uc1tvcHRpb24ucGF0aF0pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBwYXRoID0gQXJyYXkuaXNBcnJheShvcHRpb24pID8gb3B0aW9uWzBdLnBhdGggOiBvcHRpb24ucGF0aDtcbiAgICAgICAgdGhpcy5vcHRpb25zW3BhdGhdID0gb3B0aW9uO1xuICAgICAgICB2YXIgc2FmZUtleSA9IFwiLVwiICsgcGF0aDtcbiAgICAgICAgdmFyIHNhZmVJZCA9IHBhdGggKyBcIi1sYWJlbFwiO1xuICAgICAgICB2YXIgY29udHJvbCA9IHRoaXMucmVuZGVyT3B0aW9uQ29udHJvbChzYWZlS2V5LCBvcHRpb24pO1xuICAgICAgICByZXR1cm4gW1widHJcIiwge2NsYXNzOiBcImFjZV9vcHRpb25zTWVudUVudHJ5XCJ9LCBbXCJ0ZFwiLFxuICAgICAgICAgICAgW1wibGFiZWxcIiwge2Zvcjogc2FmZUtleSwgaWQ6IHNhZmVJZH0sIGtleV1cbiAgICAgICAgXSwgW1widGRcIiwgY29udHJvbF1dO1xuICAgIH1cbiAgICBcbiAgICBzZXRPcHRpb24ob3B0aW9uLCB2YWx1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIG9wdGlvbiA9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgb3B0aW9uID0gdGhpcy5vcHRpb25zW29wdGlvbl07XG4gICAgICAgIGlmICh2YWx1ZSA9PSBcImZhbHNlXCIpIHZhbHVlID0gZmFsc2U7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBcInRydWVcIikgdmFsdWUgPSB0cnVlO1xuICAgICAgICBpZiAodmFsdWUgPT0gXCJudWxsXCIpIHZhbHVlID0gbnVsbDtcbiAgICAgICAgaWYgKHZhbHVlID09IFwidW5kZWZpbmVkXCIpIHZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09IFwic3RyaW5nXCIgJiYgcGFyc2VGbG9hdCh2YWx1ZSkudG9TdHJpbmcoKSA9PSB2YWx1ZSlcbiAgICAgICAgICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgICAgIGlmIChvcHRpb24ub25jaGFuZ2UpXG4gICAgICAgICAgICBvcHRpb24ub25jaGFuZ2UodmFsdWUpO1xuICAgICAgICBlbHNlIGlmIChvcHRpb24ucGF0aClcbiAgICAgICAgICAgIHRoaXMuZWRpdG9yLnNldE9wdGlvbihvcHRpb24ucGF0aCwgdmFsdWUpO1xuICAgICAgICB0aGlzLl9zaWduYWwoXCJzZXRPcHRpb25cIiwge25hbWU6IG9wdGlvbi5wYXRoLCB2YWx1ZTogdmFsdWV9KTtcbiAgICB9XG4gICAgXG4gICAgZ2V0T3B0aW9uKG9wdGlvbikge1xuICAgICAgICBpZiAob3B0aW9uLmdldFZhbHVlKVxuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi5nZXRWYWx1ZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy5lZGl0b3IuZ2V0T3B0aW9uKG9wdGlvbi5wYXRoKTtcbiAgICB9XG59XG5vb3AuaW1wbGVtZW50KE9wdGlvblBhbmVsLnByb3RvdHlwZSwgRXZlbnRFbWl0dGVyKTtcblxuZXhwb3J0cy5PcHRpb25QYW5lbCA9IE9wdGlvblBhbmVsO1xuIiwiLyoqXG4gKiBHZW5lcmF0ZXMgYSBsaXN0IG9mIHRoZW1lcyBhdmFpbGFibGUgd2hlbiBhY2Ugd2FzIGJ1aWx0LlxuICogQGZpbGVPdmVydmlldyBHZW5lcmF0ZXMgYSBsaXN0IG9mIHRoZW1lcyBhdmFpbGFibGUgd2hlbiBhY2Ugd2FzIGJ1aWx0LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIHRoZW1lRGF0YSA9IFtcbiAgICBbXCJDaHJvbWVcIiAgICAgICAgIF0sXG4gICAgW1wiQ2xvdWRzXCIgICAgICAgICBdLFxuICAgIFtcIkNyaW1zb24gRWRpdG9yXCIgXSxcbiAgICBbXCJEYXduXCIgICAgICAgICAgIF0sXG4gICAgW1wiRHJlYW13ZWF2ZXJcIiAgICBdLFxuICAgIFtcIkVjbGlwc2VcIiAgICAgICAgXSxcbiAgICBbXCJHaXRIdWJcIiAgICAgICAgIF0sXG4gICAgW1wiSVBsYXN0aWNcIiAgICAgICBdLFxuICAgIFtcIlNvbGFyaXplZCBMaWdodFwiXSxcbiAgICBbXCJUZXh0TWF0ZVwiICAgICAgIF0sXG4gICAgW1wiVG9tb3Jyb3dcIiAgICAgICBdLFxuICAgIFtcIlhDb2RlXCIgICAgICAgICAgXSxcbiAgICBbXCJLdXJvaXJcIl0sXG4gICAgW1wiS2F0emVuTWlsY2hcIl0sXG4gICAgW1wiU1FMIFNlcnZlclwiICAgICAgICAgICAsXCJzcWxzZXJ2ZXJcIiAgICAgICAgICAgICAgICwgXCJsaWdodFwiXSxcbiAgICBbXCJBbWJpYW5jZVwiICAgICAgICAgICAgICxcImFtYmlhbmNlXCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkNoYW9zXCIgICAgICAgICAgICAgICAgLFwiY2hhb3NcIiAgICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiQ2xvdWRzIE1pZG5pZ2h0XCIgICAgICAsXCJjbG91ZHNfbWlkbmlnaHRcIiAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJEcmFjdWxhXCIgICAgICAgICAgICAgICxcIlwiICAgICAgICAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkNvYmFsdFwiICAgICAgICAgICAgICAgLFwiY29iYWx0XCIgICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiR3J1dmJveFwiICAgICAgICAgICAgICAsXCJncnV2Ym94XCIgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJHcmVlbiBvbiBCbGFja1wiICAgICAgICxcImdvYlwiICAgICAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcImlkbGUgRmluZ2Vyc1wiICAgICAgICAgLFwiaWRsZV9maW5nZXJzXCIgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wia3JUaGVtZVwiICAgICAgICAgICAgICAsXCJrcl90aGVtZVwiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJNZXJiaXZvcmVcIiAgICAgICAgICAgICxcIm1lcmJpdm9yZVwiICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk1lcmJpdm9yZSBTb2Z0XCIgICAgICAgLFwibWVyYml2b3JlX3NvZnRcIiAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiTW9ubyBJbmR1c3RyaWFsXCIgICAgICAsXCJtb25vX2luZHVzdHJpYWxcIiAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJNb25va2FpXCIgICAgICAgICAgICAgICxcIm1vbm9rYWlcIiAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk5vcmQgRGFya1wiICAgICAgICAgICAgLFwibm9yZF9kYXJrXCIgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiT25lIERhcmtcIiAgICAgICAgICAgICAsXCJvbmVfZGFya1wiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJQYXN0ZWwgb24gZGFya1wiICAgICAgICxcInBhc3RlbF9vbl9kYXJrXCIgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlNvbGFyaXplZCBEYXJrXCIgICAgICAgLFwic29sYXJpemVkX2RhcmtcIiAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVGVybWluYWxcIiAgICAgICAgICAgICAsXCJ0ZXJtaW5hbFwiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUb21vcnJvdyBOaWdodFwiICAgICAgICxcInRvbW9ycm93X25pZ2h0XCIgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlRvbW9ycm93IE5pZ2h0IEJsdWVcIiAgLFwidG9tb3Jyb3dfbmlnaHRfYmx1ZVwiICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVG9tb3Jyb3cgTmlnaHQgQnJpZ2h0XCIsXCJ0b21vcnJvd19uaWdodF9icmlnaHRcIiAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUb21vcnJvdyBOaWdodCA4MHNcIiAgICxcInRvbW9ycm93X25pZ2h0X2VpZ2h0aWVzXCIgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlR3aWxpZ2h0XCIgICAgICAgICAgICAgLFwidHdpbGlnaHRcIiAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVmlicmFudCBJbmtcIiAgICAgICAgICAsXCJ2aWJyYW50X2lua1wiICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJHaXRIdWIgRGFya1wiICAgICAgICAgICxcImdpdGh1Yl9kYXJrXCIgICAgICAgICAgICAgLCAgXCJkYXJrXCJdXG5dO1xuXG5cbmV4cG9ydHMudGhlbWVzQnlOYW1lID0ge307XG5cbi8qKlxuICogQW4gYXJyYXkgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCBhdmFpbGFibGUgdGhlbWVzLlxuICovXG5leHBvcnRzLnRoZW1lcyA9IHRoZW1lRGF0YS5tYXAoZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciBuYW1lID0gZGF0YVsxXSB8fCBkYXRhWzBdLnJlcGxhY2UoLyAvZywgXCJfXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIHRoZW1lID0ge1xuICAgICAgICBjYXB0aW9uOiBkYXRhWzBdLFxuICAgICAgICB0aGVtZTogXCJhY2UvdGhlbWUvXCIgKyBuYW1lLFxuICAgICAgICBpc0Rhcms6IGRhdGFbMl0gPT0gXCJkYXJrXCIsXG4gICAgICAgIG5hbWU6IG5hbWVcbiAgICB9O1xuICAgIGV4cG9ydHMudGhlbWVzQnlOYW1lW25hbWVdID0gdGhlbWU7XG4gICAgcmV0dXJuIHRoZW1lO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=