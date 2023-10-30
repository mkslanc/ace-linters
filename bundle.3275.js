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
 * @param {ace.Editor} editor An instance of the ace editor.
 */
function showSettingsMenu(editor) {
    // show if the menu isn't open already.
    if (!document.getElementById('ace_settingsmenu')) {
        var options = new OptionPanel(editor);
        options.render();
        options.container.id = "ace_settingsmenu";
        overlayPage(editor, options.container);
        options.container.querySelector("select,input,button,checkbox").focus();
    }
}

/**
 * Initializes the settings menu extension. It adds the showSettingsMenu
 *  method to the given editor object and adds the showSettingsMenu command
 *  to the editor with appropriate keyboard shortcuts.
 * @param {ace.Editor} editor An instance of the Editor.
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjMyNzUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7QUFDYixVQUFVLG1CQUFPLENBQUMsSUFBZTtBQUNqQyxjQUFjLG1CQUFPLENBQUMsS0FBcUI7QUFDM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7O0FBRUEsMEJBQTBCO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsWUFBWTtBQUNuRCwwQkFBMEIsT0FBTyxVQUFVLFFBQVEsUUFBUTtBQUMzRCx3QkFBd0I7QUFDeEIsd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7O0FDL0RZOztBQUViO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUFtQjtBQUNuQixpQkFBaUIsNENBQTJCO0FBQzVDO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQSxvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L21lbnVfdG9vbHMvb3ZlcmxheV9wYWdlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tZW51X3Rvb2xzL3NldHRpbmdzX21lbnUuY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tb2RlbGlzdC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvc2V0dGluZ3NfbWVudS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvdGhlbWVsaXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qanNsaW50IGluZGVudDogNCwgbWF4ZXJyOiA1MCwgd2hpdGU6IHRydWUsIGJyb3dzZXI6IHRydWUsIHZhcnM6IHRydWUqL1xuLypnbG9iYWwgZGVmaW5lLCByZXF1aXJlICovXG5cbi8qKlxuICogT3ZlcmxheSBQYWdlXG4gKiBAZmlsZU92ZXJ2aWV3IE92ZXJsYXkgUGFnZSA8YnIgLz5cbiAqIEdlbmVyYXRlcyBhbiBvdmVybGF5IGZvciBkaXNwbGF5aW5nIG1lbnVzLiBUaGUgb3ZlcmxheSBpcyBhbiBhYnNvbHV0ZWx5XG4gKiAgcG9zaXRpb25lZCBkaXYuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICovXG5cbid1c2Ugc3RyaWN0JztcbnZhciBkb20gPSByZXF1aXJlKFwiLi4vLi4vbGliL2RvbVwiKTtcbnZhciBjc3NUZXh0ID0gcmVxdWlyZShcIi4vc2V0dGluZ3NfbWVudS5jc3NcIik7XG5kb20uaW1wb3J0Q3NzU3RyaW5nKGNzc1RleHQsIFwic2V0dGluZ3NfbWVudS5jc3NcIiwgZmFsc2UpO1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhbiBvdmVybGF5IGZvciBkaXNwbGF5aW5nIG1lbnVzLiBUaGUgb3ZlcmxheSBpcyBhbiBhYnNvbHV0ZWx5XG4gKiAgcG9zaXRpb25lZCBkaXYuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHBhcmFtIHtFbGVtZW50fSBjb250ZW50RWxlbWVudCBBbnkgZWxlbWVudCB3aGljaCBtYXkgYmUgcHJlc2VudGVkIGluc2lkZVxuICogIGEgZGl2LlxuICovXG5cbm1vZHVsZS5leHBvcnRzLm92ZXJsYXlQYWdlID0gZnVuY3Rpb24gb3ZlcmxheVBhZ2UoZWRpdG9yLCBjb250ZW50RWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICB2YXIgY2xvc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGlnbm9yZUZvY3VzT3V0ID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkb2N1bWVudEVzY0xpc3RlbmVyKGUpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgaWYgKCFjbG9zZXIpIHJldHVybjtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGRvY3VtZW50RXNjTGlzdGVuZXIpO1xuICAgICAgICBjbG9zZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjbG9zZXIpO1xuICAgICAgICBpZiAoZWRpdG9yKSB7XG4gICAgICAgICAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBjbG9zZXIgPSBudWxsO1xuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgb3ZlcmxheSBpcyBjbG9zZWQgd2hlbiB1c2VyIGNsaWNrcyBvdXRzaWRlIG9mIGl0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaWdub3JlICAgICAgSWYgc2V0IHRvIHRydWUgb3ZlcmxheSBzdGF5cyBvcGVuIHdoZW4gZm9jdXMgbW92ZXMgdG8gYW5vdGhlciBwYXJ0IG9mIHRoZSBlZGl0b3IuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0SWdub3JlRm9jdXNPdXQoaWdub3JlKSB7XG4gICAgICAgIGlnbm9yZUZvY3VzT3V0ID0gaWdub3JlO1xuICAgICAgICBpZiAoaWdub3JlKSB7XG4gICAgICAgICAgICBjbG9zZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgICAgY29udGVudEVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VyLnN0eWxlLmNzc1RleHQgPSAnbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyAnICtcbiAgICAgICAgJ3Bvc2l0aW9uOiBmaXhlZDsgdG9wOjA7IGJvdHRvbTowOyBsZWZ0OjA7IHJpZ2h0OjA7JyArXG4gICAgICAgICd6LWluZGV4OiA5OTkwOyAnICtcbiAgICAgICAgKGVkaXRvciA/ICdiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7JyA6ICcnKTtcbiAgICBjbG9zZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghaWdub3JlRm9jdXNPdXQpIHtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBjbGljayBjbG9zZXIgaWYgZXNjIGtleSBpcyBwcmVzc2VkXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGRvY3VtZW50RXNjTGlzdGVuZXIpO1xuXG4gICAgY29udGVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgY2xvc2VyLmFwcGVuZENoaWxkKGNvbnRlbnRFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNsb3Nlcik7XG4gICAgaWYgKGVkaXRvcikge1xuICAgICAgICBlZGl0b3IuYmx1cigpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBjbG9zZTogY2xvc2UsXG4gICAgICAgIHNldElnbm9yZUZvY3VzT3V0OiBzZXRJZ25vcmVGb2N1c091dFxuICAgIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBgI2FjZV9zZXR0aW5nc21lbnUsICNrYnNob3J0Y3V0bWVudSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0Y3RjdGNztcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgYm94LXNoYWRvdzogLTVweCA0cHggNXB4IHJnYmEoMTI2LCAxMjYsIDEyNiwgMC41NSk7XG4gICAgcGFkZGluZzogMWVtIDAuNWVtIDJlbSAxZW07XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG1hcmdpbjogMDtcbiAgICBib3R0b206IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgdG9wOiAwO1xuICAgIHotaW5kZXg6IDk5OTE7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4uYWNlX2RhcmsgI2FjZV9zZXR0aW5nc21lbnUsIC5hY2VfZGFyayAja2JzaG9ydGN1dG1lbnUge1xuICAgIGJveC1zaGFkb3c6IC0yMHB4IDEwcHggMjVweCByZ2JhKDEyNiwgMTI2LCAxMjYsIDAuMjUpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcbiAgICBjb2xvcjogYmxhY2s7XG59XG5cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeTpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMDAsIDEwMCwgMTAwLCAwLjEpO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzXG59XG5cbi5hY2VfY2xvc2VCdXR0b24ge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjQ1LCAxNDYsIDE0NiwgMC41KTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRjQ4QThBO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBwYWRkaW5nOiA3cHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAtOHB4O1xuICAgIHRvcDogLThweDtcbiAgICB6LWluZGV4OiAxMDAwMDA7XG59XG4uYWNlX2Nsb3NlQnV0dG9ue1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjQ1LCAxNDYsIDE0NiwgMC45KTtcbn1cbi5hY2Vfb3B0aW9uc01lbnVLZXkge1xuICAgIGNvbG9yOiBkYXJrc2xhdGVibHVlO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuLmFjZV9vcHRpb25zTWVudUNvbW1hbmQge1xuICAgIGNvbG9yOiBkYXJrY3lhbjtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGlucHV0LCAuYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uIHtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuXG4uYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uW2FjZV9zZWxlY3RlZF9idXR0b249dHJ1ZV0ge1xuICAgIGJhY2tncm91bmQ6ICNlN2U3ZTc7XG4gICAgYm94LXNoYWRvdzogMXB4IDBweCAycHggMHB4ICNhZGFkYWQgaW5zZXQ7XG4gICAgYm9yZGVyLWNvbG9yOiAjYWRhZGFkO1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICAgIG1hcmdpbjogMHB4O1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvbjpob3ZlcntcbiAgICBiYWNrZ3JvdW5kOiAjZjBmMGYwO1xufWA7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1vZGVzID0gW107XG4vKipcbiAqIFN1Z2dlc3RzIGEgbW9kZSBiYXNlZCBvbiB0aGUgZmlsZSBleHRlbnNpb24gcHJlc2VudCBpbiB0aGUgZ2l2ZW4gcGF0aFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gdGhlIGZpbGVcbiAqIEByZXR1cm5zIHtvYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlXG4gKiAgc3VnZ2VzdGVkIG1vZGUuXG4gKi9cbmZ1bmN0aW9uIGdldE1vZGVGb3JQYXRoKHBhdGgpIHtcbiAgICB2YXIgbW9kZSA9IG1vZGVzQnlOYW1lLnRleHQ7XG4gICAgdmFyIGZpbGVOYW1lID0gcGF0aC5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobW9kZXNbaV0uc3VwcG9ydHNGaWxlKGZpbGVOYW1lKSkge1xuICAgICAgICAgICAgbW9kZSA9IG1vZGVzW2ldO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1vZGU7XG59XG5cbmNsYXNzIE1vZGUge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGNhcHRpb24sIGV4dGVuc2lvbnMpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jYXB0aW9uID0gY2FwdGlvbjtcbiAgICAgICAgdGhpcy5tb2RlID0gXCJhY2UvbW9kZS9cIiArIG5hbWU7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnM7XG4gICAgICAgIHZhciByZTtcbiAgICAgICAgaWYgKC9cXF4vLnRlc3QoZXh0ZW5zaW9ucykpIHtcbiAgICAgICAgICAgIHJlID0gZXh0ZW5zaW9ucy5yZXBsYWNlKC9cXHwoXFxeKT8vZywgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIkfFwiICsgKGIgPyBcIl5cIiA6IFwiXi4qXFxcXC5cIik7XG4gICAgICAgICAgICB9KSArIFwiJFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmUgPSBcIl4uKlxcXFwuKFwiICsgZXh0ZW5zaW9ucyArIFwiKSRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZXh0UmUgPSBuZXcgUmVnRXhwKHJlLCBcImdpXCIpO1xuICAgIH1cblxuICAgIHN1cHBvcnRzRmlsZShmaWxlbmFtZSkge1xuICAgICAgICByZXR1cm4gZmlsZW5hbWUubWF0Y2godGhpcy5leHRSZSk7XG4gICAgfVxufVxuXG4vLyB0b2RvIGZpcnN0bGluZW1hdGNoXG52YXIgc3VwcG9ydGVkTW9kZXMgPSB7XG4gICAgQUJBUDogICAgICAgIFtcImFiYXBcIl0sXG4gICAgQUJDOiAgICAgICAgIFtcImFiY1wiXSxcbiAgICBBY3Rpb25TY3JpcHQ6W1wiYXNcIl0sXG4gICAgQURBOiAgICAgICAgIFtcImFkYXxhZGJcIl0sXG4gICAgQWxkYTogICAgICAgIFtcImFsZGFcIl0sXG4gICAgQXBhY2hlX0NvbmY6IFtcIl5odGFjY2Vzc3xeaHRncm91cHN8Xmh0cGFzc3dkfF5jb25mfGh0YWNjZXNzfGh0Z3JvdXBzfGh0cGFzc3dkXCJdLFxuICAgIEFwZXg6ICAgICAgICBbXCJhcGV4fGNsc3x0cmlnZ2VyfHRnclwiXSxcbiAgICBBUUw6ICAgICAgICAgW1wiYXFsXCJdLFxuICAgIEFzY2lpRG9jOiAgICBbXCJhc2NpaWRvY3xhZG9jXCJdLFxuICAgIEFTTDogICAgICAgICBbXCJkc2x8YXNsfGFzbC5qc29uXCJdLFxuICAgIEFzc2VtYmx5X3g4NjpbXCJhc218YVwiXSxcbiAgICBBdXRvSG90S2V5OiAgW1wiYWhrXCJdLFxuICAgIEJhdGNoRmlsZTogICBbXCJiYXR8Y21kXCJdLFxuICAgIEJpYlRlWDogICAgICBbXCJiaWJcIl0sXG4gICAgQ19DcHA6ICAgICAgIFtcImNwcHxjfGNjfGN4eHxofGhofGhwcHxpbm9cIl0sXG4gICAgQzlTZWFyY2g6ICAgIFtcImM5c2VhcmNoX3Jlc3VsdHNcIl0sXG4gICAgQ2lycnU6ICAgICAgIFtcImNpcnJ1fGNyXCJdLFxuICAgIENsb2p1cmU6ICAgICBbXCJjbGp8Y2xqc1wiXSxcbiAgICBDb2JvbDogICAgICAgW1wiQ0JMfENPQlwiXSxcbiAgICBjb2ZmZWU6ICAgICAgW1wiY29mZmVlfGNmfGNzb258XkNha2VmaWxlXCJdLFxuICAgIENvbGRGdXNpb246ICBbXCJjZm18Y2ZjXCJdLFxuICAgIENyeXN0YWw6ICAgICBbXCJjclwiXSxcbiAgICBDU2hhcnA6ICAgICAgW1wiY3NcIl0sXG4gICAgQ3NvdW5kX0RvY3VtZW50OiBbXCJjc2RcIl0sXG4gICAgQ3NvdW5kX09yY2hlc3RyYTogW1wib3JjXCJdLFxuICAgIENzb3VuZF9TY29yZTogW1wic2NvXCJdLFxuICAgIENTUzogICAgICAgICBbXCJjc3NcIl0sXG4gICAgQ3VybHk6ICAgICAgIFtcImN1cmx5XCJdLFxuICAgIEQ6ICAgICAgICAgICBbXCJkfGRpXCJdLFxuICAgIERhcnQ6ICAgICAgICBbXCJkYXJ0XCJdLFxuICAgIERpZmY6ICAgICAgICBbXCJkaWZmfHBhdGNoXCJdLFxuICAgIERvY2tlcmZpbGU6ICBbXCJeRG9ja2VyZmlsZVwiXSxcbiAgICBEb3Q6ICAgICAgICAgW1wiZG90XCJdLFxuICAgIERyb29sczogICAgICBbXCJkcmxcIl0sXG4gICAgRWRpZmFjdDogICAgIFtcImVkaVwiXSxcbiAgICBFaWZmZWw6ICAgICAgW1wiZXxnZVwiXSxcbiAgICBFSlM6ICAgICAgICAgW1wiZWpzXCJdLFxuICAgIEVsaXhpcjogICAgICBbXCJleHxleHNcIl0sXG4gICAgRWxtOiAgICAgICAgIFtcImVsbVwiXSxcbiAgICBFcmxhbmc6ICAgICAgW1wiZXJsfGhybFwiXSxcbiAgICBGb3J0aDogICAgICAgW1wiZnJ0fGZzfGxkcnxmdGh8NHRoXCJdLFxuICAgIEZvcnRyYW46ICAgICBbXCJmfGY5MFwiXSxcbiAgICBGU2hhcnA6ICAgICAgW1wiZnNpfGZzfG1sfG1saXxmc3h8ZnNzY3JpcHRcIl0sXG4gICAgRlNMOiAgICAgICAgIFtcImZzbFwiXSxcbiAgICBGVEw6ICAgICAgICAgW1wiZnRsXCJdLFxuICAgIEdjb2RlOiAgICAgICBbXCJnY29kZVwiXSxcbiAgICBHaGVya2luOiAgICAgW1wiZmVhdHVyZVwiXSxcbiAgICBHaXRpZ25vcmU6ICAgW1wiXi5naXRpZ25vcmVcIl0sXG4gICAgR2xzbDogICAgICAgIFtcImdsc2x8ZnJhZ3x2ZXJ0XCJdLFxuICAgIEdvYnN0b25lczogICBbXCJnYnNcIl0sXG4gICAgZ29sYW5nOiAgICAgIFtcImdvXCJdLFxuICAgIEdyYXBoUUxTY2hlbWE6IFtcImdxbFwiXSxcbiAgICBHcm9vdnk6ICAgICAgW1wiZ3Jvb3Z5XCJdLFxuICAgIEhBTUw6ICAgICAgICBbXCJoYW1sXCJdLFxuICAgIEhhbmRsZWJhcnM6ICBbXCJoYnN8aGFuZGxlYmFyc3x0cGx8bXVzdGFjaGVcIl0sXG4gICAgSGFza2VsbDogICAgIFtcImhzXCJdLFxuICAgIEhhc2tlbGxfQ2FiYWw6IFtcImNhYmFsXCJdLFxuICAgIGhhWGU6ICAgICAgICBbXCJoeFwiXSxcbiAgICBIanNvbjogICAgICAgW1wiaGpzb25cIl0sXG4gICAgSFRNTDogICAgICAgIFtcImh0bWx8aHRtfHhodG1sfHZ1ZXx3ZXx3cHlcIl0sXG4gICAgSFRNTF9FbGl4aXI6IFtcImVleHxodG1sLmVleFwiXSxcbiAgICBIVE1MX1J1Ynk6ICAgW1wiZXJifHJodG1sfGh0bWwuZXJiXCJdLFxuICAgIElOSTogICAgICAgICBbXCJpbml8Y29uZnxjZmd8cHJlZnNcIl0sXG4gICAgSW86ICAgICAgICAgIFtcImlvXCJdLFxuICAgIElvbjogICAgICAgICBbXCJpb25cIl0sXG4gICAgSmFjazogICAgICAgIFtcImphY2tcIl0sXG4gICAgSmFkZTogICAgICAgIFtcImphZGV8cHVnXCJdLFxuICAgIEphdmE6ICAgICAgICBbXCJqYXZhXCJdLFxuICAgIEphdmFTY3JpcHQ6ICBbXCJqc3xqc218anN4fGNqc3xtanNcIl0sXG4gICAgSkVYTDogICAgICAgIFtcImpleGxcIl0sXG4gICAgSlNPTjogICAgICAgIFtcImpzb25cIl0sXG4gICAgSlNPTjU6ICAgICAgIFtcImpzb241XCJdLFxuICAgIEpTT05pcTogICAgICBbXCJqcVwiXSxcbiAgICBKU1A6ICAgICAgICAgW1wianNwXCJdLFxuICAgIEpTU006ICAgICAgICBbXCJqc3NtfGpzc21fc3RhdGVcIl0sXG4gICAgSlNYOiAgICAgICAgIFtcImpzeFwiXSxcbiAgICBKdWxpYTogICAgICAgW1wiamxcIl0sXG4gICAgS290bGluOiAgICAgIFtcImt0fGt0c1wiXSxcbiAgICBMYVRlWDogICAgICAgW1widGV4fGxhdGV4fGx0eHxiaWJcIl0sXG4gICAgTGF0dGU6ICAgICAgIFtcImxhdHRlXCJdLFxuICAgIExFU1M6ICAgICAgICBbXCJsZXNzXCJdLFxuICAgIExpcXVpZDogICAgICBbXCJsaXF1aWRcIl0sXG4gICAgTGlzcDogICAgICAgIFtcImxpc3BcIl0sXG4gICAgTGl2ZVNjcmlwdDogIFtcImxzXCJdLFxuICAgIExvZzogICAgICAgICBbXCJsb2dcIl0sXG4gICAgTG9naVFMOiAgICAgIFtcImxvZ2ljfGxxbFwiXSxcbiAgICBMb2d0YWxrOiAgICAgW1wibGd0XCJdLFxuICAgIExTTDogICAgICAgICBbXCJsc2xcIl0sXG4gICAgTHVhOiAgICAgICAgIFtcImx1YVwiXSxcbiAgICBMdWFQYWdlOiAgICAgW1wibHBcIl0sXG4gICAgTHVjZW5lOiAgICAgIFtcImx1Y2VuZVwiXSxcbiAgICBNYWtlZmlsZTogICAgW1wiXk1ha2VmaWxlfF5HTlVtYWtlZmlsZXxebWFrZWZpbGV8Xk9DYW1sTWFrZWZpbGV8bWFrZVwiXSxcbiAgICBNYXJrZG93bjogICAgW1wibWR8bWFya2Rvd25cIl0sXG4gICAgTWFzazogICAgICAgIFtcIm1hc2tcIl0sXG4gICAgTUFUTEFCOiAgICAgIFtcIm1hdGxhYlwiXSxcbiAgICBNYXplOiAgICAgICAgW1wibXpcIl0sXG4gICAgTWVkaWFXaWtpOiAgIFtcIndpa2l8bWVkaWF3aWtpXCJdLFxuICAgIE1FTDogICAgICAgICBbXCJtZWxcIl0sXG4gICAgTUlQUzogICAgICAgIFtcInN8YXNtXCJdLFxuICAgIE1JWEFMOiAgICAgICBbXCJtaXhhbFwiXSxcbiAgICBNVVNIQ29kZTogICAgW1wibWN8bXVzaFwiXSxcbiAgICBNeVNRTDogICAgICAgW1wibXlzcWxcIl0sXG4gICAgTmdpbng6ICAgICAgIFtcIm5naW54fGNvbmZcIl0sXG4gICAgTmltOiAgICAgICAgIFtcIm5pbVwiXSxcbiAgICBOaXg6ICAgICAgICAgW1wibml4XCJdLFxuICAgIE5TSVM6ICAgICAgICBbXCJuc2l8bnNoXCJdLFxuICAgIE51bmp1Y2tzOiAgICBbXCJudW5qdWNrc3xudW5qc3xuanxuamtcIl0sXG4gICAgT2JqZWN0aXZlQzogIFtcIm18bW1cIl0sXG4gICAgT0NhbWw6ICAgICAgIFtcIm1sfG1saVwiXSxcbiAgICBPZGluOiAgICAgICAgW1wib2RpblwiXSxcbiAgICBQYXJ0aVFMOiAgICAgW1wicGFydGlxbHxwcWxcIl0sXG4gICAgUGFzY2FsOiAgICAgIFtcInBhc3xwXCJdLFxuICAgIFBlcmw6ICAgICAgICBbXCJwbHxwbVwiXSxcbiAgICBwZ1NRTDogICAgICAgW1wicGdzcWxcIl0sXG4gICAgUEhQOiAgICAgICAgIFtcInBocHxpbmN8cGh0bWx8c2h0bWx8cGhwM3xwaHA0fHBocDV8cGhwc3xwaHB0fGF3fGN0cHxtb2R1bGVcIl0sXG4gICAgUEhQX0xhcmF2ZWxfYmxhZGU6IFtcImJsYWRlLnBocFwiXSxcbiAgICBQaWc6ICAgICAgICAgW1wicGlnXCJdLFxuICAgIFBMU1FMOiAgICAgICBbXCJwbHNxbFwiXSxcbiAgICBQb3dlcnNoZWxsOiAgW1wicHMxXCJdLFxuICAgIFByYWF0OiAgICAgICBbXCJwcmFhdHxwcmFhdHNjcmlwdHxwc2N8cHJvY1wiXSxcbiAgICBQcmlzbWE6ICAgICAgW1wicHJpc21hXCJdLFxuICAgIFByb2xvZzogICAgICBbXCJwbGd8cHJvbG9nXCJdLFxuICAgIFByb3BlcnRpZXM6ICBbXCJwcm9wZXJ0aWVzXCJdLFxuICAgIFByb3RvYnVmOiAgICBbXCJwcm90b1wiXSxcbiAgICBQdXBwZXQ6ICAgICAgW1wiZXBwfHBwXCJdLFxuICAgIFB5dGhvbjogICAgICBbXCJweVwiXSxcbiAgICBRTUw6ICAgICAgICAgW1wicW1sXCJdLFxuICAgIFI6ICAgICAgICAgICBbXCJyXCJdLFxuICAgIFJha3U6ICAgICAgICBbXCJyYWt1fHJha3Vtb2R8cmFrdXRlc3R8cDZ8cGw2fHBtNlwiXSxcbiAgICBSYXpvcjogICAgICAgW1wiY3NodG1sfGFzcFwiXSxcbiAgICBSRG9jOiAgICAgICAgW1wiUmRcIl0sXG4gICAgUmVkOiAgICAgICAgIFtcInJlZHxyZWRzXCJdLFxuICAgIFJIVE1MOiAgICAgICBbXCJSaHRtbFwiXSxcbiAgICBSb2JvdDogICAgICAgW1wicm9ib3R8cmVzb3VyY2VcIl0sXG4gICAgUlNUOiAgICAgICAgIFtcInJzdFwiXSxcbiAgICBSdWJ5OiAgICAgICAgW1wicmJ8cnV8Z2Vtc3BlY3xyYWtlfF5HdWFyZGZpbGV8XlJha2VmaWxlfF5HZW1maWxlXCJdLFxuICAgIFJ1c3Q6ICAgICAgICBbXCJyc1wiXSxcbiAgICBTYUM6ICAgICAgICAgW1wic2FjXCJdLFxuICAgIFNBU1M6ICAgICAgICBbXCJzYXNzXCJdLFxuICAgIFNDQUQ6ICAgICAgICBbXCJzY2FkXCJdLFxuICAgIFNjYWxhOiAgICAgICBbXCJzY2FsYXxzYnRcIl0sXG4gICAgU2NoZW1lOiAgICAgIFtcInNjbXxzbXxya3R8b2FrfHNjaGVtZVwiXSxcbiAgICBTY3J5cHQ6ICAgICAgW1wic2NyeXB0XCJdLFxuICAgIFNDU1M6ICAgICAgICBbXCJzY3NzXCJdLFxuICAgIFNIOiAgICAgICAgICBbXCJzaHxiYXNofF4uYmFzaHJjXCJdLFxuICAgIFNKUzogICAgICAgICBbXCJzanNcIl0sXG4gICAgU2xpbTogICAgICAgIFtcInNsaW18c2tpbVwiXSxcbiAgICBTbWFydHk6ICAgICAgW1wic21hcnR5fHRwbFwiXSxcbiAgICBTbWl0aHk6ICAgICAgW1wic21pdGh5XCJdLFxuICAgIHNuaXBwZXRzOiAgICBbXCJzbmlwcGV0c1wiXSxcbiAgICBTb3lfVGVtcGxhdGU6W1wic295XCJdLFxuICAgIFNwYWNlOiAgICAgICBbXCJzcGFjZVwiXSxcbiAgICBTUEFSUUw6ICAgICAgW1wicnFcIl0sXG4gICAgU1FMOiAgICAgICAgIFtcInNxbFwiXSxcbiAgICBTUUxTZXJ2ZXI6ICAgW1wic3Fsc2VydmVyXCJdLFxuICAgIFN0eWx1czogICAgICBbXCJzdHlsfHN0eWx1c1wiXSxcbiAgICBTVkc6ICAgICAgICAgW1wic3ZnXCJdLFxuICAgIFN3aWZ0OiAgICAgICBbXCJzd2lmdFwiXSxcbiAgICBUY2w6ICAgICAgICAgW1widGNsXCJdLFxuICAgIFRlcnJhZm9ybTogICBbXCJ0ZlwiLCBcInRmdmFyc1wiLCBcInRlcnJhZ3J1bnRcIl0sXG4gICAgVGV4OiAgICAgICAgIFtcInRleFwiXSxcbiAgICBUZXh0OiAgICAgICAgW1widHh0XCJdLFxuICAgIFRleHRpbGU6ICAgICBbXCJ0ZXh0aWxlXCJdLFxuICAgIFRvbWw6ICAgICAgICBbXCJ0b21sXCJdLFxuICAgIFRTWDogICAgICAgICBbXCJ0c3hcIl0sXG4gICAgVHVydGxlOiAgICAgIFtcInR0bFwiXSxcbiAgICBUd2lnOiAgICAgICAgW1widHdpZ3xzd2lnXCJdLFxuICAgIFR5cGVzY3JpcHQ6ICBbXCJ0c3x0eXBlc2NyaXB0fHN0clwiXSxcbiAgICBWYWxhOiAgICAgICAgW1widmFsYVwiXSxcbiAgICBWQlNjcmlwdDogICAgW1widmJzfHZiXCJdLFxuICAgIFZlbG9jaXR5OiAgICBbXCJ2bVwiXSxcbiAgICBWZXJpbG9nOiAgICAgW1widnx2aHxzdnxzdmhcIl0sXG4gICAgVkhETDogICAgICAgIFtcInZoZHx2aGRsXCJdLFxuICAgIFZpc3VhbGZvcmNlOiBbXCJ2ZnB8Y29tcG9uZW50fHBhZ2VcIl0sXG4gICAgV29sbG9rOiAgICAgIFtcIndsa3x3cGdtfHd0ZXN0XCJdLFxuICAgIFhNTDogICAgICAgICBbXCJ4bWx8cmRmfHJzc3x3c2RsfHhzbHR8YXRvbXxtYXRobWx8bW1sfHh1bHx4Ymx8eGFtbFwiXSxcbiAgICBYUXVlcnk6ICAgICAgW1wieHFcIl0sXG4gICAgWUFNTDogICAgICAgIFtcInlhbWx8eW1sXCJdLFxuICAgIFplZWs6ICAgICAgICBbXCJ6ZWVrfGJyb1wiXSxcbiAgICAvLyBBZGQgdGhlIG1pc3NpbmcgbW9kZSBcIkRqYW5nb1wiIHRvIGV4dC1tb2RlbGlzdFxuICAgIERqYW5nbzogICAgICBbXCJodG1sXCJdXG59O1xuXG52YXIgbmFtZU92ZXJyaWRlcyA9IHtcbiAgICBPYmplY3RpdmVDOiBcIk9iamVjdGl2ZS1DXCIsXG4gICAgQ1NoYXJwOiBcIkMjXCIsXG4gICAgZ29sYW5nOiBcIkdvXCIsXG4gICAgQ19DcHA6IFwiQyBhbmQgQysrXCIsXG4gICAgQ3NvdW5kX0RvY3VtZW50OiBcIkNzb3VuZCBEb2N1bWVudFwiLFxuICAgIENzb3VuZF9PcmNoZXN0cmE6IFwiQ3NvdW5kXCIsXG4gICAgQ3NvdW5kX1Njb3JlOiBcIkNzb3VuZCBTY29yZVwiLFxuICAgIGNvZmZlZTogXCJDb2ZmZWVTY3JpcHRcIixcbiAgICBIVE1MX1J1Ynk6IFwiSFRNTCAoUnVieSlcIixcbiAgICBIVE1MX0VsaXhpcjogXCJIVE1MIChFbGl4aXIpXCIsXG4gICAgRlRMOiBcIkZyZWVNYXJrZXJcIixcbiAgICBQSFBfTGFyYXZlbF9ibGFkZTogXCJQSFAgKEJsYWRlIFRlbXBsYXRlKVwiLFxuICAgIFBlcmw2OiBcIlBlcmwgNlwiLFxuICAgIEF1dG9Ib3RLZXk6IFwiQXV0b0hvdGtleSAvIEF1dG9JdFwiXG59O1xuXG52YXIgbW9kZXNCeU5hbWUgPSB7fTtcbmZvciAodmFyIG5hbWUgaW4gc3VwcG9ydGVkTW9kZXMpIHtcbiAgICB2YXIgZGF0YSA9IHN1cHBvcnRlZE1vZGVzW25hbWVdO1xuICAgIHZhciBkaXNwbGF5TmFtZSA9IChuYW1lT3ZlcnJpZGVzW25hbWVdIHx8IG5hbWUpLnJlcGxhY2UoL18vZywgXCIgXCIpO1xuICAgIHZhciBmaWxlbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgbW9kZSA9IG5ldyBNb2RlKGZpbGVuYW1lLCBkaXNwbGF5TmFtZSwgZGF0YVswXSk7XG4gICAgbW9kZXNCeU5hbWVbZmlsZW5hbWVdID0gbW9kZTtcbiAgICBtb2Rlcy5wdXNoKG1vZGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRNb2RlRm9yUGF0aDogZ2V0TW9kZUZvclBhdGgsXG4gICAgbW9kZXM6IG1vZGVzLFxuICAgIG1vZGVzQnlOYW1lOiBtb2Rlc0J5TmFtZVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG5yZXF1aXJlKFwiLi9tZW51X3Rvb2xzL292ZXJsYXlfcGFnZVwiKTtcblxudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9saWIvZG9tXCIpO1xudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIGNvbmZpZyA9IHJlcXVpcmUoXCIuLi9jb25maWdcIik7XG52YXIgRXZlbnRFbWl0dGVyID0gcmVxdWlyZShcIi4uL2xpYi9ldmVudF9lbWl0dGVyXCIpLkV2ZW50RW1pdHRlcjtcbnZhciBidWlsZERvbSA9IGRvbS5idWlsZERvbTtcblxudmFyIG1vZGVsaXN0ID0gcmVxdWlyZShcIi4vbW9kZWxpc3RcIik7XG52YXIgdGhlbWVsaXN0ID0gcmVxdWlyZShcIi4vdGhlbWVsaXN0XCIpO1xuXG52YXIgdGhlbWVzID0geyBCcmlnaHQ6IFtdLCBEYXJrOiBbXSB9O1xudGhlbWVsaXN0LnRoZW1lcy5mb3JFYWNoKGZ1bmN0aW9uKHgpIHtcbiAgICB0aGVtZXNbeC5pc0RhcmsgPyBcIkRhcmtcIiA6IFwiQnJpZ2h0XCJdLnB1c2goeyBjYXB0aW9uOiB4LmNhcHRpb24sIHZhbHVlOiB4LnRoZW1lIH0pO1xufSk7XG5cbnZhciBtb2RlcyA9IG1vZGVsaXN0Lm1vZGVzLm1hcChmdW5jdGlvbih4KXsgXG4gICAgcmV0dXJuIHsgY2FwdGlvbjogeC5jYXB0aW9uLCB2YWx1ZTogeC5tb2RlIH07IFxufSk7XG5cblxudmFyIG9wdGlvbkdyb3VwcyA9IHtcbiAgICBNYWluOiB7XG4gICAgICAgIE1vZGU6IHtcbiAgICAgICAgICAgIHBhdGg6IFwibW9kZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgICAgIGl0ZW1zOiBtb2Rlc1xuICAgICAgICB9LFxuICAgICAgICBUaGVtZToge1xuICAgICAgICAgICAgcGF0aDogXCJ0aGVtZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgICAgIGl0ZW1zOiB0aGVtZXNcbiAgICAgICAgfSxcbiAgICAgICAgXCJLZXliaW5kaW5nXCI6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uQmFyXCIsXG4gICAgICAgICAgICBwYXRoOiBcImtleWJvYXJkSGFuZGxlclwiLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIkFjZVwiLCB2YWx1ZSA6IG51bGwgfSxcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlZpbVwiLCB2YWx1ZSA6IFwiYWNlL2tleWJvYXJkL3ZpbVwiIH0sXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJFbWFjc1wiLCB2YWx1ZSA6IFwiYWNlL2tleWJvYXJkL2VtYWNzXCIgfSxcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlN1YmxpbWVcIiwgdmFsdWUgOiBcImFjZS9rZXlib2FyZC9zdWJsaW1lXCIgfSxcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlZTQ29kZVwiLCB2YWx1ZSA6IFwiYWNlL2tleWJvYXJkL3ZzY29kZVwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJGb250IFNpemVcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJmb250U2l6ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogMTIsXG4gICAgICAgICAgICBkZWZhdWx0czogW1xuICAgICAgICAgICAgICAgIHtjYXB0aW9uOiBcIjEycHhcIiwgdmFsdWU6IDEyfSxcbiAgICAgICAgICAgICAgICB7Y2FwdGlvbjogXCIyNHB4XCIsIHZhbHVlOiAyNH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJTb2Z0IFdyYXBcIjoge1xuICAgICAgICAgICAgdHlwZTogXCJidXR0b25CYXJcIixcbiAgICAgICAgICAgIHBhdGg6IFwid3JhcFwiLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiT2ZmXCIsICB2YWx1ZSA6IFwib2ZmXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiVmlld1wiLCB2YWx1ZSA6IFwiZnJlZVwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIm1hcmdpblwiLCB2YWx1ZSA6IFwicHJpbnRNYXJnaW5cIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCI0MFwiLCAgIHZhbHVlIDogXCI0MFwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJDdXJzb3IgU3R5bGVcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJjdXJzb3JTdHlsZVwiLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiQWNlXCIsICAgIHZhbHVlIDogXCJhY2VcIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJTbGltXCIsICAgdmFsdWUgOiBcInNsaW1cIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJTbW9vdGhcIiwgdmFsdWUgOiBcInNtb290aFwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlNtb290aCBBbmQgU2xpbVwiLCB2YWx1ZSA6IFwic21vb3RoIHNsaW1cIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJXaWRlXCIsICAgdmFsdWUgOiBcIndpZGVcIiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiRm9sZGluZ1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImZvbGRTdHlsZVwiLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIk1hbnVhbFwiLCB2YWx1ZSA6IFwibWFudWFsXCIgfSxcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIk1hcmsgYmVnaW5cIiwgdmFsdWUgOiBcIm1hcmtiZWdpblwiIH0sXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJNYXJrIGJlZ2luIGFuZCBlbmRcIiwgdmFsdWUgOiBcIm1hcmtiZWdpbmVuZFwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJTb2Z0IFRhYnNcIjogW3tcbiAgICAgICAgICAgIHBhdGg6IFwidXNlU29mdFRhYnNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBhcmlhTGFiZWw6IFwiVGFiIFNpemVcIixcbiAgICAgICAgICAgIHBhdGg6IFwidGFiU2l6ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgIHZhbHVlczogWzIsIDMsIDQsIDgsIDE2XVxuICAgICAgICB9XSxcbiAgICAgICAgXCJPdmVyc2Nyb2xsXCI6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uQmFyXCIsXG4gICAgICAgICAgICBwYXRoOiBcInNjcm9sbFBhc3RFbmRcIixcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIk5vbmVcIiwgIHZhbHVlIDogMCB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJIYWxmXCIsICAgdmFsdWUgOiAwLjUgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiRnVsbFwiLCAgIHZhbHVlIDogMSB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIE1vcmU6IHtcbiAgICAgICAgXCJBdG9taWMgc29mdCB0YWJzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwibmF2aWdhdGVXaXRoaW5Tb2Z0VGFic1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiRW5hYmxlIEJlaGF2aW91cnNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJiZWhhdmlvdXJzRW5hYmxlZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiV3JhcCB3aXRoIHF1b3Rlc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcIndyYXBCZWhhdmlvdXJzRW5hYmxlZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiRW5hYmxlIEF1dG8gSW5kZW50XCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZW5hYmxlQXV0b0luZGVudFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiRnVsbCBMaW5lIFNlbGVjdGlvblwiOiB7XG4gICAgICAgICAgICB0eXBlOiBcImNoZWNrYm94XCIsXG4gICAgICAgICAgICB2YWx1ZXM6IFwidGV4dHxsaW5lXCIsXG4gICAgICAgICAgICBwYXRoOiBcInNlbGVjdGlvblN0eWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJIaWdobGlnaHQgQWN0aXZlIExpbmVcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJoaWdobGlnaHRBY3RpdmVMaW5lXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJTaG93IEludmlzaWJsZXNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJzaG93SW52aXNpYmxlc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiU2hvdyBJbmRlbnQgR3VpZGVzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZGlzcGxheUluZGVudEd1aWRlc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiSGlnaGxpZ2h0IEluZGVudCBHdWlkZXNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJoaWdobGlnaHRJbmRlbnRHdWlkZXNcIlxuICAgICAgICB9LFxuICAgICAgICBcIlBlcnNpc3RlbnQgSFNjcm9sbGJhclwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImhTY3JvbGxCYXJBbHdheXNWaXNpYmxlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJQZXJzaXN0ZW50IFZTY3JvbGxiYXJcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJ2U2Nyb2xsQmFyQWx3YXlzVmlzaWJsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiQW5pbWF0ZSBzY3JvbGxpbmdcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJhbmltYXRlZFNjcm9sbFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiU2hvdyBHdXR0ZXJcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJzaG93R3V0dGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJTaG93IExpbmUgTnVtYmVyc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInNob3dMaW5lTnVtYmVyc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiUmVsYXRpdmUgTGluZSBOdW1iZXJzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwicmVsYXRpdmVMaW5lTnVtYmVyc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiRml4ZWQgR3V0dGVyIFdpZHRoXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZml4ZWRXaWR0aEd1dHRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiU2hvdyBQcmludCBNYXJnaW5cIjogW3tcbiAgICAgICAgICAgIHBhdGg6IFwic2hvd1ByaW50TWFyZ2luXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYXJpYUxhYmVsOiBcIlByaW50IE1hcmdpblwiLFxuICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgIHBhdGg6IFwicHJpbnRNYXJnaW5Db2x1bW5cIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJJbmRlbnRlZCBTb2Z0IFdyYXBcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJpbmRlbnRlZFNvZnRXcmFwXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJIaWdobGlnaHQgc2VsZWN0ZWQgd29yZFwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImhpZ2hsaWdodFNlbGVjdGVkV29yZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiRmFkZSBGb2xkIFdpZGdldHNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJmYWRlRm9sZFdpZGdldHNcIlxuICAgICAgICB9LFxuICAgICAgICBcIlVzZSB0ZXh0YXJlYSBmb3IgSU1FXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwidXNlVGV4dGFyZWFGb3JJTUVcIlxuICAgICAgICB9LFxuICAgICAgICBcIk1lcmdlIFVuZG8gRGVsdGFzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwibWVyZ2VVbmRvRGVsdGFzXCIsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJBbHdheXNcIiwgIHZhbHVlIDogXCJhbHdheXNcIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJOZXZlclwiLCAgIHZhbHVlIDogXCJmYWxzZVwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlRpbWVkXCIsICAgdmFsdWUgOiBcInRydWVcIiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiRWxhc3RpYyBUYWJzdG9wc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInVzZUVsYXN0aWNUYWJzdG9wc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiSW5jcmVtZW50YWwgU2VhcmNoXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwidXNlSW5jcmVtZW50YWxTZWFyY2hcIlxuICAgICAgICB9LFxuICAgICAgICBcIlJlYWQtb25seVwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInJlYWRPbmx5XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJDb3B5IHdpdGhvdXQgc2VsZWN0aW9uXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiY29weVdpdGhFbXB0eVNlbGVjdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiTGl2ZSBBdXRvY29tcGxldGlvblwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImVuYWJsZUxpdmVBdXRvY29tcGxldGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiQ3VzdG9tIHNjcm9sbGJhclwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImN1c3RvbVNjcm9sbGJhclwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiVXNlIFNWRyBndXR0ZXIgaWNvbnNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJ1c2VTdmdHdXR0ZXJJY29uc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiQW5ub3RhdGlvbnMgZm9yIGZvbGRlZCBsaW5lc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInNob3dGb2xkZWRBbm5vdGF0aW9uc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiS2V5Ym9hcmQgQWNjZXNzaWJpbGl0eSBNb2RlXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZW5hYmxlS2V5Ym9hcmRBY2Nlc3NpYmlsaXR5XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJHdXR0ZXIgdG9vbHRpcCBmb2xsb3dzIG1vdXNlXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwidG9vbHRpcEZvbGxvd3NNb3VzZVwiLFxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlOiB0cnVlXG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5jbGFzcyBPcHRpb25QYW5lbCB7XG4gICAgY29uc3RydWN0b3IoZWRpdG9yLCBlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yO1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGVsZW1lbnQgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGhpcy5ncm91cHMgPSBbXTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0ge307XG4gICAgfVxuICAgIFxuICAgIGFkZChjb25maWcpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5NYWluKVxuICAgICAgICAgICAgb29wLm1peGluKG9wdGlvbkdyb3Vwcy5NYWluLCBjb25maWcuTWFpbik7XG4gICAgICAgIGlmIChjb25maWcuTW9yZSlcbiAgICAgICAgICAgIG9vcC5taXhpbihvcHRpb25Hcm91cHMuTW9yZSwgY29uZmlnLk1vcmUpO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGJ1aWxkRG9tKFtcInRhYmxlXCIsIHtyb2xlOiBcInByZXNlbnRhdGlvblwiLCBpZDogXCJjb250cm9sc1wifSwgXG4gICAgICAgICAgICB0aGlzLnJlbmRlck9wdGlvbkdyb3VwKG9wdGlvbkdyb3Vwcy5NYWluKSxcbiAgICAgICAgICAgIFtcInRyXCIsIG51bGwsIFtcInRkXCIsIHtjb2xzcGFuOiAyfSxcbiAgICAgICAgICAgICAgICBbXCJ0YWJsZVwiLCB7cm9sZTogXCJwcmVzZW50YXRpb25cIiwgaWQ6IFwibW9yZS1jb250cm9sc1wifSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyT3B0aW9uR3JvdXAob3B0aW9uR3JvdXBzLk1vcmUpXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgXV0sXG4gICAgICAgICAgICBbXCJ0clwiLCBudWxsLCBbXCJ0ZFwiLCB7Y29sc3BhbjogMn0sIFwidmVyc2lvbiBcIiArIGNvbmZpZy52ZXJzaW9uXV1cbiAgICAgICAgXSwgdGhpcy5jb250YWluZXIpO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXJPcHRpb25Hcm91cChncm91cCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoZ3JvdXApLm1hcChmdW5jdGlvbihrZXksIGkpIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gZ3JvdXBba2V5XTtcbiAgICAgICAgICAgIGlmICghaXRlbS5wb3NpdGlvbilcbiAgICAgICAgICAgICAgICBpdGVtLnBvc2l0aW9uID0gaSAvIDEwMDAwO1xuICAgICAgICAgICAgaWYgKCFpdGVtLmxhYmVsKVxuICAgICAgICAgICAgICAgIGl0ZW0ubGFiZWwgPSBrZXk7XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfSkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5wb3NpdGlvbiAtIGIucG9zaXRpb247XG4gICAgICAgIH0pLm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJPcHRpb24oaXRlbS5sYWJlbCwgaXRlbSk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXJPcHRpb25Db250cm9sKGtleSwgb3B0aW9uKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkob3B0aW9uKSkge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbi5tYXAoZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBzZWxmLnJlbmRlck9wdGlvbkNvbnRyb2woa2V5LCB4KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjb250cm9sO1xuICAgICAgICBcbiAgICAgICAgdmFyIHZhbHVlID0gc2VsZi5nZXRPcHRpb24ob3B0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChvcHRpb24udmFsdWVzICYmIG9wdGlvbi50eXBlICE9IFwiY2hlY2tib3hcIikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24udmFsdWVzID09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlcyA9IG9wdGlvbi52YWx1ZXMuc3BsaXQoXCJ8XCIpO1xuICAgICAgICAgICAgb3B0aW9uLml0ZW1zID0gb3B0aW9uLnZhbHVlcy5tYXAoZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiB2LCBuYW1lOiB2IH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKG9wdGlvbi50eXBlID09IFwiYnV0dG9uQmFyXCIpIHtcbiAgICAgICAgICAgIGNvbnRyb2wgPSBbXCJkaXZcIiwge3JvbGU6IFwiZ3JvdXBcIiwgXCJhcmlhLWxhYmVsbGVkYnlcIjogb3B0aW9uLnBhdGggKyBcIi1sYWJlbFwifSwgb3B0aW9uLml0ZW1zLm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcImJ1dHRvblwiLCB7IFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbS52YWx1ZSwgXG4gICAgICAgICAgICAgICAgICAgIGFjZV9zZWxlY3RlZF9idXR0b246IHZhbHVlID09IGl0ZW0udmFsdWUsIFxuICAgICAgICAgICAgICAgICAgICAnYXJpYS1wcmVzc2VkJzogdmFsdWUgPT0gaXRlbS52YWx1ZSwgXG4gICAgICAgICAgICAgICAgICAgIG9uY2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRPcHRpb24ob3B0aW9uLCBpdGVtLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub2RlcyA9IHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKFwiW2FjZV9zZWxlY3RlZF9idXR0b25dXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzW2ldLnJlbW92ZUF0dHJpYnV0ZShcImFjZV9zZWxlY3RlZF9idXR0b25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXNbaV0uc2V0QXR0cmlidXRlKFwiYXJpYS1wcmVzc2VkXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiYWNlX3NlbGVjdGVkX2J1dHRvblwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiYXJpYS1wcmVzc2VkXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIH0sIGl0ZW0uZGVzYyB8fCBpdGVtLmNhcHRpb24gfHwgaXRlbS5uYW1lXTtcbiAgICAgICAgICAgIH0pXTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb24udHlwZSA9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBjb250cm9sID0gW1wiaW5wdXRcIiwge3R5cGU6IFwibnVtYmVyXCIsIHZhbHVlOiB2YWx1ZSB8fCBvcHRpb24uZGVmYXVsdFZhbHVlLCBzdHlsZTpcIndpZHRoOjNlbVwiLCBvbmlucHV0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldE9wdGlvbihvcHRpb24sIHBhcnNlSW50KHRoaXMudmFsdWUpKTtcbiAgICAgICAgICAgIH19XTtcbiAgICAgICAgICAgIGlmIChvcHRpb24uYXJpYUxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbFsxXVtcImFyaWEtbGFiZWxcIl0gPSBvcHRpb24uYXJpYUxhYmVsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250cm9sWzFdLmlkID0ga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbi5kZWZhdWx0cykge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wgPSBbY29udHJvbCwgb3B0aW9uLmRlZmF1bHRzLm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJidXR0b25cIiwge29uY2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdGhpcy5wYXJlbnROb2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGl0ZW0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5vbmlucHV0KCk7XG4gICAgICAgICAgICAgICAgICAgIH19LCBpdGVtLmNhcHRpb25dO1xuICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb24uaXRlbXMpIHtcbiAgICAgICAgICAgIHZhciBidWlsZEl0ZW1zID0gZnVuY3Rpb24oaXRlbXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXMubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcIm9wdGlvblwiLCB7IHZhbHVlOiBpdGVtLnZhbHVlIHx8IGl0ZW0ubmFtZSB9LCBpdGVtLmRlc2MgfHwgaXRlbS5jYXB0aW9uIHx8IGl0ZW0ubmFtZV07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgaXRlbXMgPSBBcnJheS5pc0FycmF5KG9wdGlvbi5pdGVtcykgXG4gICAgICAgICAgICAgICAgPyBidWlsZEl0ZW1zKG9wdGlvbi5pdGVtcylcbiAgICAgICAgICAgICAgICA6IE9iamVjdC5rZXlzKG9wdGlvbi5pdGVtcykubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wib3B0Z3JvdXBcIiwge1wibGFiZWxcIjoga2V5fSwgYnVpbGRJdGVtcyhvcHRpb24uaXRlbXNba2V5XSldO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udHJvbCA9IFtcInNlbGVjdFwiLCB7IGlkOiBrZXksIHZhbHVlOiB2YWx1ZSwgb25jaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0T3B0aW9uKG9wdGlvbiwgdGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB9IH0sIGl0ZW1zXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLnZhbHVlcyA9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZXMgPSBvcHRpb24udmFsdWVzLnNwbGl0KFwifFwiKTtcbiAgICAgICAgICAgIGlmIChvcHRpb24udmFsdWVzKSB2YWx1ZSA9IHZhbHVlID09IG9wdGlvbi52YWx1ZXNbMV07XG4gICAgICAgICAgICBjb250cm9sID0gW1wiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGlkOiBrZXksIGNoZWNrZWQ6IHZhbHVlIHx8IG51bGwsIG9uY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmNoZWNrZWQ7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi52YWx1ZXMpIHZhbHVlID0gb3B0aW9uLnZhbHVlc1t2YWx1ZSA/IDEgOiAwXTtcbiAgICAgICAgICAgICAgICBzZWxmLnNldE9wdGlvbihvcHRpb24sIHZhbHVlKTtcbiAgICAgICAgICAgIH19XTtcbiAgICAgICAgICAgIGlmIChvcHRpb24udHlwZSA9PSBcImNoZWNrZWROdW1iZXJcIikge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wgPSBbY29udHJvbCwgW11dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250cm9sO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXJPcHRpb24oa2V5LCBvcHRpb24pIHtcbiAgICAgICAgaWYgKG9wdGlvbi5wYXRoICYmICFvcHRpb24ub25jaGFuZ2UgJiYgIXRoaXMuZWRpdG9yLiRvcHRpb25zW29wdGlvbi5wYXRoXSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIHBhdGggPSBBcnJheS5pc0FycmF5KG9wdGlvbikgPyBvcHRpb25bMF0ucGF0aCA6IG9wdGlvbi5wYXRoO1xuICAgICAgICB0aGlzLm9wdGlvbnNbcGF0aF0gPSBvcHRpb247XG4gICAgICAgIHZhciBzYWZlS2V5ID0gXCItXCIgKyBwYXRoO1xuICAgICAgICB2YXIgc2FmZUlkID0gcGF0aCArIFwiLWxhYmVsXCI7XG4gICAgICAgIHZhciBjb250cm9sID0gdGhpcy5yZW5kZXJPcHRpb25Db250cm9sKHNhZmVLZXksIG9wdGlvbik7XG4gICAgICAgIHJldHVybiBbXCJ0clwiLCB7Y2xhc3M6IFwiYWNlX29wdGlvbnNNZW51RW50cnlcIn0sIFtcInRkXCIsXG4gICAgICAgICAgICBbXCJsYWJlbFwiLCB7Zm9yOiBzYWZlS2V5LCBpZDogc2FmZUlkfSwga2V5XVxuICAgICAgICBdLCBbXCJ0ZFwiLCBjb250cm9sXV07XG4gICAgfVxuICAgIFxuICAgIHNldE9wdGlvbihvcHRpb24sIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICBvcHRpb24gPSB0aGlzLm9wdGlvbnNbb3B0aW9uXTtcbiAgICAgICAgaWYgKHZhbHVlID09IFwiZmFsc2VcIikgdmFsdWUgPSBmYWxzZTtcbiAgICAgICAgaWYgKHZhbHVlID09IFwidHJ1ZVwiKSB2YWx1ZSA9IHRydWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBcIm51bGxcIikgdmFsdWUgPSBudWxsO1xuICAgICAgICBpZiAodmFsdWUgPT0gXCJ1bmRlZmluZWRcIikgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJzdHJpbmdcIiAmJiBwYXJzZUZsb2F0KHZhbHVlKS50b1N0cmluZygpID09IHZhbHVlKVxuICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgICAgaWYgKG9wdGlvbi5vbmNoYW5nZSlcbiAgICAgICAgICAgIG9wdGlvbi5vbmNoYW5nZSh2YWx1ZSk7XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbi5wYXRoKVxuICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2V0T3B0aW9uKG9wdGlvbi5wYXRoLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3NpZ25hbChcInNldE9wdGlvblwiLCB7bmFtZTogb3B0aW9uLnBhdGgsIHZhbHVlOiB2YWx1ZX0pO1xuICAgIH1cbiAgICBcbiAgICBnZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgICAgIGlmIChvcHRpb24uZ2V0VmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLmdldFZhbHVlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRvci5nZXRPcHRpb24ob3B0aW9uLnBhdGgpO1xuICAgIH1cbn1cbm9vcC5pbXBsZW1lbnQoT3B0aW9uUGFuZWwucHJvdG90eXBlLCBFdmVudEVtaXR0ZXIpO1xuXG5leHBvcnRzLk9wdGlvblBhbmVsID0gT3B0aW9uUGFuZWw7XG4iLCIvKmpzbGludCBpbmRlbnQ6IDQsIG1heGVycjogNTAsIHdoaXRlOiB0cnVlLCBicm93c2VyOiB0cnVlLCB2YXJzOiB0cnVlKi9cbi8qZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSAqL1xuXG4vKipcbiAqIFNob3cgU2V0dGluZ3MgTWVudVxuICogQGZpbGVPdmVydmlldyBTaG93IFNldHRpbmdzIE1lbnUgPGJyIC8+XG4gKiBEaXNwbGF5cyBhbiBpbnRlcmFjdGl2ZSBzZXR0aW5ncyBtZW51IG1vc3RseSBnZW5lcmF0ZWQgb24gdGhlIGZseSBiYXNlZCBvblxuICogIHRoZSBjdXJyZW50IHN0YXRlIG9mIHRoZSBlZGl0b3IuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICovXG5cblwidXNlIHN0cmljdFwiO1xudmFyIE9wdGlvblBhbmVsID0gcmVxdWlyZShcIi4vb3B0aW9uc1wiKS5PcHRpb25QYW5lbDtcbnZhciBvdmVybGF5UGFnZSA9IHJlcXVpcmUoJy4vbWVudV90b29scy9vdmVybGF5X3BhZ2UnKS5vdmVybGF5UGFnZTtcbi8qKlxuICogVGhpcyBkaXNwbGF5cyB0aGUgc2V0dGluZ3MgbWVudSBpZiBpdCBpcyBub3QgYWxyZWFkeSBiZWluZyBzaG93bi5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAcGFyYW0ge2FjZS5FZGl0b3J9IGVkaXRvciBBbiBpbnN0YW5jZSBvZiB0aGUgYWNlIGVkaXRvci5cbiAqL1xuZnVuY3Rpb24gc2hvd1NldHRpbmdzTWVudShlZGl0b3IpIHtcbiAgICAvLyBzaG93IGlmIHRoZSBtZW51IGlzbid0IG9wZW4gYWxyZWFkeS5cbiAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhY2Vfc2V0dGluZ3NtZW51JykpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgT3B0aW9uUGFuZWwoZWRpdG9yKTtcbiAgICAgICAgb3B0aW9ucy5yZW5kZXIoKTtcbiAgICAgICAgb3B0aW9ucy5jb250YWluZXIuaWQgPSBcImFjZV9zZXR0aW5nc21lbnVcIjtcbiAgICAgICAgb3ZlcmxheVBhZ2UoZWRpdG9yLCBvcHRpb25zLmNvbnRhaW5lcik7XG4gICAgICAgIG9wdGlvbnMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJzZWxlY3QsaW5wdXQsYnV0dG9uLGNoZWNrYm94XCIpLmZvY3VzKCk7XG4gICAgfVxufVxuXG4vKipcbiAqIEluaXRpYWxpemVzIHRoZSBzZXR0aW5ncyBtZW51IGV4dGVuc2lvbi4gSXQgYWRkcyB0aGUgc2hvd1NldHRpbmdzTWVudVxuICogIG1ldGhvZCB0byB0aGUgZ2l2ZW4gZWRpdG9yIG9iamVjdCBhbmQgYWRkcyB0aGUgc2hvd1NldHRpbmdzTWVudSBjb21tYW5kXG4gKiAgdG8gdGhlIGVkaXRvciB3aXRoIGFwcHJvcHJpYXRlIGtleWJvYXJkIHNob3J0Y3V0cy5cbiAqIEBwYXJhbSB7YWNlLkVkaXRvcn0gZWRpdG9yIEFuIGluc3RhbmNlIG9mIHRoZSBFZGl0b3IuXG4gKi9cbm1vZHVsZS5leHBvcnRzLmluaXQgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgRWRpdG9yID0gcmVxdWlyZShcIi4uL2VkaXRvclwiKS5FZGl0b3I7XG4gICAgRWRpdG9yLnByb3RvdHlwZS5zaG93U2V0dGluZ3NNZW51ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHNob3dTZXR0aW5nc01lbnUodGhpcyk7XG4gICAgfTtcbn07XG4iLCIvKipcbiAqIEdlbmVyYXRlcyBhIGxpc3Qgb2YgdGhlbWVzIGF2YWlsYWJsZSB3aGVuIGFjZSB3YXMgYnVpbHQuXG4gKiBAZmlsZU92ZXJ2aWV3IEdlbmVyYXRlcyBhIGxpc3Qgb2YgdGhlbWVzIGF2YWlsYWJsZSB3aGVuIGFjZSB3YXMgYnVpbHQuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgdGhlbWVEYXRhID0gW1xuICAgIFtcIkNocm9tZVwiICAgICAgICAgXSxcbiAgICBbXCJDbG91ZHNcIiAgICAgICAgIF0sXG4gICAgW1wiQ3JpbXNvbiBFZGl0b3JcIiBdLFxuICAgIFtcIkRhd25cIiAgICAgICAgICAgXSxcbiAgICBbXCJEcmVhbXdlYXZlclwiICAgIF0sXG4gICAgW1wiRWNsaXBzZVwiICAgICAgICBdLFxuICAgIFtcIkdpdEh1YlwiICAgICAgICAgXSxcbiAgICBbXCJJUGxhc3RpY1wiICAgICAgIF0sXG4gICAgW1wiU29sYXJpemVkIExpZ2h0XCJdLFxuICAgIFtcIlRleHRNYXRlXCIgICAgICAgXSxcbiAgICBbXCJUb21vcnJvd1wiICAgICAgIF0sXG4gICAgW1wiWENvZGVcIiAgICAgICAgICBdLFxuICAgIFtcIkt1cm9pclwiXSxcbiAgICBbXCJLYXR6ZW5NaWxjaFwiXSxcbiAgICBbXCJTUUwgU2VydmVyXCIgICAgICAgICAgICxcInNxbHNlcnZlclwiICAgICAgICAgICAgICAgLCBcImxpZ2h0XCJdLFxuICAgIFtcIkFtYmlhbmNlXCIgICAgICAgICAgICAgLFwiYW1iaWFuY2VcIiAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiQ2hhb3NcIiAgICAgICAgICAgICAgICAsXCJjaGFvc1wiICAgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJDbG91ZHMgTWlkbmlnaHRcIiAgICAgICxcImNsb3Vkc19taWRuaWdodFwiICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkRyYWN1bGFcIiAgICAgICAgICAgICAgLFwiXCIgICAgICAgICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiQ29iYWx0XCIgICAgICAgICAgICAgICAsXCJjb2JhbHRcIiAgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJHcnV2Ym94XCIgICAgICAgICAgICAgICxcImdydXZib3hcIiAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkdyZWVuIG9uIEJsYWNrXCIgICAgICAgLFwiZ29iXCIgICAgICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiaWRsZSBGaW5nZXJzXCIgICAgICAgICAsXCJpZGxlX2ZpbmdlcnNcIiAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJrclRoZW1lXCIgICAgICAgICAgICAgICxcImtyX3RoZW1lXCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk1lcmJpdm9yZVwiICAgICAgICAgICAgLFwibWVyYml2b3JlXCIgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiTWVyYml2b3JlIFNvZnRcIiAgICAgICAsXCJtZXJiaXZvcmVfc29mdFwiICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJNb25vIEluZHVzdHJpYWxcIiAgICAgICxcIm1vbm9faW5kdXN0cmlhbFwiICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk1vbm9rYWlcIiAgICAgICAgICAgICAgLFwibW9ub2thaVwiICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiTm9yZCBEYXJrXCIgICAgICAgICAgICAsXCJub3JkX2RhcmtcIiAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJPbmUgRGFya1wiICAgICAgICAgICAgICxcIm9uZV9kYXJrXCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlBhc3RlbCBvbiBkYXJrXCIgICAgICAgLFwicGFzdGVsX29uX2RhcmtcIiAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiU29sYXJpemVkIERhcmtcIiAgICAgICAsXCJzb2xhcml6ZWRfZGFya1wiICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUZXJtaW5hbFwiICAgICAgICAgICAgICxcInRlcm1pbmFsXCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlRvbW9ycm93IE5pZ2h0XCIgICAgICAgLFwidG9tb3Jyb3dfbmlnaHRcIiAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVG9tb3Jyb3cgTmlnaHQgQmx1ZVwiICAsXCJ0b21vcnJvd19uaWdodF9ibHVlXCIgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUb21vcnJvdyBOaWdodCBCcmlnaHRcIixcInRvbW9ycm93X25pZ2h0X2JyaWdodFwiICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlRvbW9ycm93IE5pZ2h0IDgwc1wiICAgLFwidG9tb3Jyb3dfbmlnaHRfZWlnaHRpZXNcIiAsICBcImRhcmtcIl0sXG4gICAgW1wiVHdpbGlnaHRcIiAgICAgICAgICAgICAsXCJ0d2lsaWdodFwiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJWaWJyYW50IElua1wiICAgICAgICAgICxcInZpYnJhbnRfaW5rXCIgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkdpdEh1YiBEYXJrXCIgICAgICAgICAgLFwiZ2l0aHViX2RhcmtcIiAgICAgICAgICAgICAsICBcImRhcmtcIl1cbl07XG5cblxuZXhwb3J0cy50aGVtZXNCeU5hbWUgPSB7fTtcblxuLyoqXG4gKiBBbiBhcnJheSBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IGF2YWlsYWJsZSB0aGVtZXMuXG4gKi9cbmV4cG9ydHMudGhlbWVzID0gdGhlbWVEYXRhLm1hcChmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIG5hbWUgPSBkYXRhWzFdIHx8IGRhdGFbMF0ucmVwbGFjZSgvIC9nLCBcIl9cIikudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgdGhlbWUgPSB7XG4gICAgICAgIGNhcHRpb246IGRhdGFbMF0sXG4gICAgICAgIHRoZW1lOiBcImFjZS90aGVtZS9cIiArIG5hbWUsXG4gICAgICAgIGlzRGFyazogZGF0YVsyXSA9PSBcImRhcmtcIixcbiAgICAgICAgbmFtZTogbmFtZVxuICAgIH07XG4gICAgZXhwb3J0cy50aGVtZXNCeU5hbWVbbmFtZV0gPSB0aGVtZTtcbiAgICByZXR1cm4gdGhlbWU7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==