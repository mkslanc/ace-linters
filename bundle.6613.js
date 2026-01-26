(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[6613,1772,1494],{

/***/ 24809:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * ## Overlay Page utility
 *
 * Provides modal overlay functionality for displaying editor extension interfaces. Creates a full-screen overlay with
 * configurable backdrop behavior, keyboard navigation (ESC to close), and focus management. Used by various extensions
 * to display menus, settings panels, and other interactive content over the editor interface.
 *
 * **Usage:**
 * ```javascript
 * var overlayPage = require('./overlay_page').overlayPage;
 * var contentElement = document.createElement('div');
 * contentElement.innerHTML = '<h1>Settings</h1>';
 *
 * var overlay = overlayPage(editor, contentElement, function() {
 *   console.log('Overlay closed');
 * });
 * ```
 *
 * @module
 */


/*jslint indent: 4, maxerr: 50, white: true, browser: true, vars: true*/
/*global define, require */


var dom = __webpack_require__(71435);
var cssText = __webpack_require__(39047);
dom.importCssString(cssText, "settings_menu.css", false);

/**
 * Generates an overlay for displaying menus. The overlay is an absolutely
 *  positioned div.
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *  ☭ Hial Atropa!! ☭
 * @param {import("../../editor").Editor} editor
 * @param {HTMLElement} contentElement Any element which may be presented inside
 *  a div.
 * @param {() => void} [callback]
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
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * ## File mode detection utility
 *
 * Provides automatic detection of editor syntax modes based on file paths and extensions. Maps file extensions to
 * appropriate Ace Editor syntax highlighting modes for over 100 programming languages and file formats including
 * JavaScript, TypeScript, HTML, CSS, Python, Java, C++, and many others. Supports complex extension patterns and
 * provides fallback mechanisms for unknown file types.
 *
 * @module
 */



/**
 * Represents an array to store various syntax modes.
 *
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
    Basic:       ["bas|bak"],
    BatchFile:   ["bat|cmd"],
    BibTeX:      ["bib"],
    C_Cpp:       ["cpp|c|cc|cxx|h|hh|hpp|ino"],
    C9Search:    ["c9search_results"],
    Cirru:       ["cirru|cr"],
    Clojure:     ["clj|cljs"],
    Clue:        ["clue"],
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
 * An object that serves as a mapping of mode names to their corresponding mode data.
 * The keys of this object are mode names (as strings), and the values are expected
 * to represent data associated with each mode.
 *
 * This structure can be used for quick lookups of mode information by name.
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

exports.getModeForPath = getModeForPath;
exports.modes = modes;
exports.modesByName = modesByName;

/***/ }),

/***/ 86613:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * ## Settings Menu extension
 *
 * Provides a settings panel for configuring editor options through an interactive UI.
 * Creates a tabular interface with grouped configuration options including themes, modes, keybindings,
 * font settings, display preferences, and advanced editor behaviors. Supports dynamic option rendering
 * with various input types (dropdowns, checkboxes, number inputs, button bars) and real-time updates.
 *
 * **Usage:**
 * ```javascript
 * var OptionPanel = require("ace/ext/settings_menu").OptionPanel;
 * var panel = new OptionPanel(editor);
 * panel.render();
 * ```
 *
 * @module
 */



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


/**
 * Configuration object for grouping various options/settings into categorized groups.
 *
 * Organizes settings into two main categories: "Main" and "More",
 * each containing settings for configurable features of an application.
 */
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
        }
    }
};

/**
 * Option panel component for configuring settings or options.
 * The panel is designed to integrate with an editor and render various UI controls based on provided configuration.
 */
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
exports.optionGroups = optionGroups;


/***/ }),

/***/ 91494:
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
 * ## Theme enumeration utility
 *
 * Provides theme management for the Ace Editor by generating and organizing available themes into
 * categorized collections. Automatically maps theme data into structured objects containing theme metadata including
 * display captions, theme paths, brightness classification (dark/light), and normalized names. Exports both an
 * indexed theme collection and a complete themes array for easy integration with theme selection components
 * and configuration systems.
 *
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 * @module
 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCLGFBQWE7QUFDYixtQkFBbUI7Ozs7Ozs7O0FDL1NuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNBLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L21lbnVfdG9vbHMvb3ZlcmxheV9wYWdlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tZW51X3Rvb2xzL3NldHRpbmdzX21lbnUuY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tb2RlbGlzdC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvdGhlbWVsaXN0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogIyMgT3ZlcmxheSBQYWdlIHV0aWxpdHlcbiAqXG4gKiBQcm92aWRlcyBtb2RhbCBvdmVybGF5IGZ1bmN0aW9uYWxpdHkgZm9yIGRpc3BsYXlpbmcgZWRpdG9yIGV4dGVuc2lvbiBpbnRlcmZhY2VzLiBDcmVhdGVzIGEgZnVsbC1zY3JlZW4gb3ZlcmxheSB3aXRoXG4gKiBjb25maWd1cmFibGUgYmFja2Ryb3AgYmVoYXZpb3IsIGtleWJvYXJkIG5hdmlnYXRpb24gKEVTQyB0byBjbG9zZSksIGFuZCBmb2N1cyBtYW5hZ2VtZW50LiBVc2VkIGJ5IHZhcmlvdXMgZXh0ZW5zaW9uc1xuICogdG8gZGlzcGxheSBtZW51cywgc2V0dGluZ3MgcGFuZWxzLCBhbmQgb3RoZXIgaW50ZXJhY3RpdmUgY29udGVudCBvdmVyIHRoZSBlZGl0b3IgaW50ZXJmYWNlLlxuICpcbiAqICoqVXNhZ2U6KipcbiAqIGBgYGphdmFzY3JpcHRcbiAqIHZhciBvdmVybGF5UGFnZSA9IHJlcXVpcmUoJy4vb3ZlcmxheV9wYWdlJykub3ZlcmxheVBhZ2U7XG4gKiB2YXIgY29udGVudEVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAqIGNvbnRlbnRFbGVtZW50LmlubmVySFRNTCA9ICc8aDE+U2V0dGluZ3M8L2gxPic7XG4gKlxuICogdmFyIG92ZXJsYXkgPSBvdmVybGF5UGFnZShlZGl0b3IsIGNvbnRlbnRFbGVtZW50LCBmdW5jdGlvbigpIHtcbiAqICAgY29uc29sZS5sb2coJ092ZXJsYXkgY2xvc2VkJyk7XG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIEBtb2R1bGVcbiAqL1xuXG5cbi8qanNsaW50IGluZGVudDogNCwgbWF4ZXJyOiA1MCwgd2hpdGU6IHRydWUsIGJyb3dzZXI6IHRydWUsIHZhcnM6IHRydWUqL1xuLypnbG9iYWwgZGVmaW5lLCByZXF1aXJlICovXG5cbid1c2Ugc3RyaWN0JztcbnZhciBkb20gPSByZXF1aXJlKFwiLi4vLi4vbGliL2RvbVwiKTtcbnZhciBjc3NUZXh0ID0gcmVxdWlyZShcIi4vc2V0dGluZ3NfbWVudS5jc3NcIik7XG5kb20uaW1wb3J0Q3NzU3RyaW5nKGNzc1RleHQsIFwic2V0dGluZ3NfbWVudS5jc3NcIiwgZmFsc2UpO1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhbiBvdmVybGF5IGZvciBkaXNwbGF5aW5nIG1lbnVzLiBUaGUgb3ZlcmxheSBpcyBhbiBhYnNvbHV0ZWx5XG4gKiAgcG9zaXRpb25lZCBkaXYuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHBhcmFtIHtpbXBvcnQoXCIuLi8uLi9lZGl0b3JcIikuRWRpdG9yfSBlZGl0b3JcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGNvbnRlbnRFbGVtZW50IEFueSBlbGVtZW50IHdoaWNoIG1heSBiZSBwcmVzZW50ZWQgaW5zaWRlXG4gKiAgYSBkaXYuXG4gKiBAcGFyYW0geygpID0+IHZvaWR9IFtjYWxsYmFja11cbiAqL1xubW9kdWxlLmV4cG9ydHMub3ZlcmxheVBhZ2UgPSBmdW5jdGlvbiBvdmVybGF5UGFnZShlZGl0b3IsIGNvbnRlbnRFbGVtZW50LCBjYWxsYmFjaykge1xuICAgIHZhciBjbG9zZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgaWdub3JlRm9jdXNPdXQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIGRvY3VtZW50RXNjTGlzdGVuZXIoZSkge1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICBpZiAoIWNsb3NlcikgcmV0dXJuO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZG9jdW1lbnRFc2NMaXN0ZW5lcik7XG4gICAgICAgIGNsb3Nlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNsb3Nlcik7XG4gICAgICAgIGlmIChlZGl0b3IpIHtcbiAgICAgICAgICAgIGVkaXRvci5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIGNsb3NlciA9IG51bGw7XG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgIC8qKlxuICAgICAqIERlZmluZXMgd2hldGhlciBvdmVybGF5IGlzIGNsb3NlZCB3aGVuIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgaXQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBpZ25vcmUgICAgICBJZiBzZXQgdG8gdHJ1ZSBvdmVybGF5IHN0YXlzIG9wZW4gd2hlbiBmb2N1cyBtb3ZlcyB0byBhbm90aGVyIHBhcnQgb2YgdGhlIGVkaXRvci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRJZ25vcmVGb2N1c091dChpZ25vcmUpIHtcbiAgICAgICAgaWdub3JlRm9jdXNPdXQgPSBpZ25vcmU7XG4gICAgICAgIGlmIChpZ25vcmUpIHtcbiAgICAgICAgICAgIGNsb3Nlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgICAgICBjb250ZW50RWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZXIuc3R5bGUuY3NzVGV4dCA9ICdtYXJnaW46IDA7IHBhZGRpbmc6IDA7ICcgK1xuICAgICAgICAncG9zaXRpb246IGZpeGVkOyB0b3A6MDsgYm90dG9tOjA7IGxlZnQ6MDsgcmlnaHQ6MDsnICtcbiAgICAgICAgJ3otaW5kZXg6IDk5OTA7ICcgK1xuICAgICAgICAoZWRpdG9yID8gJ2JhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTsnIDogJycpO1xuICAgIGNsb3Nlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCFpZ25vcmVGb2N1c091dCkge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGNsaWNrIGNsb3NlciBpZiBlc2Mga2V5IGlzIHByZXNzZWRcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZG9jdW1lbnRFc2NMaXN0ZW5lcik7XG5cbiAgICBjb250ZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICBjbG9zZXIuYXBwZW5kQ2hpbGQoY29udGVudEVsZW1lbnQpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2xvc2VyKTtcbiAgICBpZiAoZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5ibHVyKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGNsb3NlOiBjbG9zZSxcbiAgICAgICAgc2V0SWdub3JlRm9jdXNPdXQ6IHNldElnbm9yZUZvY3VzT3V0XG4gICAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGAjYWNlX3NldHRpbmdzbWVudSwgI2tic2hvcnRjdXRtZW51IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjdGN0Y3O1xuICAgIGNvbG9yOiBibGFjaztcbiAgICBib3gtc2hhZG93OiAtNXB4IDRweCA1cHggcmdiYSgxMjYsIDEyNiwgMTI2LCAwLjU1KTtcbiAgICBwYWRkaW5nOiAxZW0gMC41ZW0gMmVtIDFlbTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbWFyZ2luOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICByaWdodDogMDtcbiAgICB0b3A6IDA7XG4gICAgei1pbmRleDogOTk5MTtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbi5hY2VfZGFyayAjYWNlX3NldHRpbmdzbWVudSwgLmFjZV9kYXJrICNrYnNob3J0Y3V0bWVudSB7XG4gICAgYm94LXNoYWRvdzogLTIwcHggMTBweCAyNXB4IHJnYmEoMTI2LCAxMjYsIDEyNiwgMC4yNSk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO1xuICAgIGNvbG9yOiBibGFjaztcbn1cblxuLmFjZV9vcHRpb25zTWVudUVudHJ5OmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEwMCwgMTAwLCAxMDAsIDAuMSk7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3Ncbn1cblxuLmFjZV9jbG9zZUJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNDUsIDE0NiwgMTQ2LCAwLjUpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNGNDhBOEE7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIHBhZGRpbmc6IDdweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IC04cHg7XG4gICAgdG9wOiAtOHB4O1xuICAgIHotaW5kZXg6IDEwMDAwMDtcbn1cbi5hY2VfY2xvc2VCdXR0b257XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNDUsIDE0NiwgMTQ2LCAwLjkpO1xufVxuLmFjZV9vcHRpb25zTWVudUtleSB7XG4gICAgY29sb3I6IGRhcmtzbGF0ZWJsdWU7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4uYWNlX29wdGlvbnNNZW51Q29tbWFuZCB7XG4gICAgY29sb3I6IGRhcmtjeWFuO1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG4uYWNlX29wdGlvbnNNZW51RW50cnkgaW5wdXQsIC5hY2Vfb3B0aW9uc01lbnVFbnRyeSBidXR0b24ge1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG5cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeSBidXR0b25bYWNlX3NlbGVjdGVkX2J1dHRvbj10cnVlXSB7XG4gICAgYmFja2dyb3VuZDogI2U3ZTdlNztcbiAgICBib3gtc2hhZG93OiAxcHggMHB4IDJweCAwcHggI2FkYWRhZCBpbnNldDtcbiAgICBib3JkZXItY29sb3I6ICNhZGFkYWQ7XG59XG4uYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uIHtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gICAgbWFyZ2luOiAwcHg7XG59XG4uYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uOmhvdmVye1xuICAgIGJhY2tncm91bmQ6ICNmMGYwZjA7XG59YDtcbiIsIi8qKlxuICogIyMgRmlsZSBtb2RlIGRldGVjdGlvbiB1dGlsaXR5XG4gKlxuICogUHJvdmlkZXMgYXV0b21hdGljIGRldGVjdGlvbiBvZiBlZGl0b3Igc3ludGF4IG1vZGVzIGJhc2VkIG9uIGZpbGUgcGF0aHMgYW5kIGV4dGVuc2lvbnMuIE1hcHMgZmlsZSBleHRlbnNpb25zIHRvXG4gKiBhcHByb3ByaWF0ZSBBY2UgRWRpdG9yIHN5bnRheCBoaWdobGlnaHRpbmcgbW9kZXMgZm9yIG92ZXIgMTAwIHByb2dyYW1taW5nIGxhbmd1YWdlcyBhbmQgZmlsZSBmb3JtYXRzIGluY2x1ZGluZ1xuICogSmF2YVNjcmlwdCwgVHlwZVNjcmlwdCwgSFRNTCwgQ1NTLCBQeXRob24sIEphdmEsIEMrKywgYW5kIG1hbnkgb3RoZXJzLiBTdXBwb3J0cyBjb21wbGV4IGV4dGVuc2lvbiBwYXR0ZXJucyBhbmRcbiAqIHByb3ZpZGVzIGZhbGxiYWNrIG1lY2hhbmlzbXMgZm9yIHVua25vd24gZmlsZSB0eXBlcy5cbiAqXG4gKiBAbW9kdWxlXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhbiBhcnJheSB0byBzdG9yZSB2YXJpb3VzIHN5bnRheCBtb2Rlcy5cbiAqXG4gKiBAdHlwZSB7TW9kZVtdfVxuICovXG52YXIgbW9kZXMgPSBbXTtcbi8qKlxuICogU3VnZ2VzdHMgYSBtb2RlIGJhc2VkIG9uIHRoZSBmaWxlIGV4dGVuc2lvbiBwcmVzZW50IGluIHRoZSBnaXZlbiBwYXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCB0byB0aGUgZmlsZVxuICogQHJldHVybnMge01vZGV9IFJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlXG4gKiAgc3VnZ2VzdGVkIG1vZGUuXG4gKi9cbmZ1bmN0aW9uIGdldE1vZGVGb3JQYXRoKHBhdGgpIHtcbiAgICB2YXIgbW9kZSA9IG1vZGVzQnlOYW1lLnRleHQ7XG4gICAgdmFyIGZpbGVOYW1lID0gcGF0aC5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobW9kZXNbaV0uc3VwcG9ydHNGaWxlKGZpbGVOYW1lKSkge1xuICAgICAgICAgICAgbW9kZSA9IG1vZGVzW2ldO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1vZGU7XG59XG5cbmNsYXNzIE1vZGUge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNhcHRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXh0ZW5zaW9uc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGNhcHRpb24sIGV4dGVuc2lvbnMpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jYXB0aW9uID0gY2FwdGlvbjtcbiAgICAgICAgdGhpcy5tb2RlID0gXCJhY2UvbW9kZS9cIiArIG5hbWU7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnM7XG4gICAgICAgIHZhciByZTtcbiAgICAgICAgaWYgKC9cXF4vLnRlc3QoZXh0ZW5zaW9ucykpIHtcbiAgICAgICAgICAgIHJlID0gZXh0ZW5zaW9ucy5yZXBsYWNlKC9cXHwoXFxeKT8vZywgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIkfFwiICsgKGIgPyBcIl5cIiA6IFwiXi4qXFxcXC5cIik7XG4gICAgICAgICAgICB9KSArIFwiJFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmUgPSBcIlxcXFwuKFwiICsgZXh0ZW5zaW9ucyArIFwiKSRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZXh0UmUgPSBuZXcgUmVnRXhwKHJlLCBcImdpXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlbmFtZVxuICAgICAqIEByZXR1cm5zIHtSZWdFeHBNYXRjaEFycmF5IHwgbnVsbH1cbiAgICAgKi9cbiAgICBzdXBwb3J0c0ZpbGUoZmlsZW5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZpbGVuYW1lLm1hdGNoKHRoaXMuZXh0UmUpO1xuICAgIH1cbn1cblxuLy8gdG9kbyBmaXJzdGxpbmVtYXRjaFxudmFyIHN1cHBvcnRlZE1vZGVzID0ge1xuICAgIEFCQVA6ICAgICAgICBbXCJhYmFwXCJdLFxuICAgIEFCQzogICAgICAgICBbXCJhYmNcIl0sXG4gICAgQWN0aW9uU2NyaXB0OltcImFzXCJdLFxuICAgIEFEQTogICAgICAgICBbXCJhZGF8YWRiXCJdLFxuICAgIEFsZGE6ICAgICAgICBbXCJhbGRhXCJdLFxuICAgIEFwYWNoZV9Db25mOiBbXCJeaHRhY2Nlc3N8Xmh0Z3JvdXBzfF5odHBhc3N3ZHxeY29uZnxodGFjY2Vzc3xodGdyb3Vwc3xodHBhc3N3ZFwiXSxcbiAgICBBcGV4OiAgICAgICAgW1wiYXBleHxjbHN8dHJpZ2dlcnx0Z3JcIl0sXG4gICAgQVFMOiAgICAgICAgIFtcImFxbFwiXSxcbiAgICBBc2NpaURvYzogICAgW1wiYXNjaWlkb2N8YWRvY1wiXSxcbiAgICBBU0w6ICAgICAgICAgW1wiZHNsfGFzbHxhc2wuanNvblwiXSxcbiAgICBBc3NlbWJseV9BUk0zMjpbXCJzXCJdLFxuICAgIEFzc2VtYmx5X3g4NjpbXCJhc218YVwiXSxcbiAgICBBc3RybzogICAgICAgW1wiYXN0cm9cIl0sXG4gICAgQXV0b0hvdEtleTogIFtcImFoa1wiXSxcbiAgICBCYXNpYzogICAgICAgW1wiYmFzfGJha1wiXSxcbiAgICBCYXRjaEZpbGU6ICAgW1wiYmF0fGNtZFwiXSxcbiAgICBCaWJUZVg6ICAgICAgW1wiYmliXCJdLFxuICAgIENfQ3BwOiAgICAgICBbXCJjcHB8Y3xjY3xjeHh8aHxoaHxocHB8aW5vXCJdLFxuICAgIEM5U2VhcmNoOiAgICBbXCJjOXNlYXJjaF9yZXN1bHRzXCJdLFxuICAgIENpcnJ1OiAgICAgICBbXCJjaXJydXxjclwiXSxcbiAgICBDbG9qdXJlOiAgICAgW1wiY2xqfGNsanNcIl0sXG4gICAgQ2x1ZTogICAgICAgIFtcImNsdWVcIl0sXG4gICAgQ29ib2w6ICAgICAgIFtcIkNCTHxDT0JcIl0sXG4gICAgY29mZmVlOiAgICAgIFtcImNvZmZlZXxjZnxjc29ufF5DYWtlZmlsZVwiXSxcbiAgICBDb2xkRnVzaW9uOiAgW1wiY2ZtfGNmY1wiXSxcbiAgICBDcnlzdGFsOiAgICAgW1wiY3JcIl0sXG4gICAgQ1NoYXJwOiAgICAgIFtcImNzXCJdLFxuICAgIENzb3VuZF9Eb2N1bWVudDogW1wiY3NkXCJdLFxuICAgIENzb3VuZF9PcmNoZXN0cmE6IFtcIm9yY1wiXSxcbiAgICBDc291bmRfU2NvcmU6IFtcInNjb1wiXSxcbiAgICBDU1M6ICAgICAgICAgW1wiY3NzXCJdLFxuICAgIENTVjogICAgICAgICBbXCJjc3ZcIl0sXG4gICAgQ3VybHk6ICAgICAgIFtcImN1cmx5XCJdLFxuICAgIEN1dHRsZWZpc2g6ICBbXCJjb25mXCJdLFxuICAgIEQ6ICAgICAgICAgICBbXCJkfGRpXCJdLFxuICAgIERhcnQ6ICAgICAgICBbXCJkYXJ0XCJdLFxuICAgIERpZmY6ICAgICAgICBbXCJkaWZmfHBhdGNoXCJdLFxuICAgIERqYW5nbzogICAgICBbXCJkanR8aHRtbC5kanR8ZGouaHRtbHxkamh0bWxcIl0sXG4gICAgRG9ja2VyZmlsZTogIFtcIl5Eb2NrZXJmaWxlXCJdLFxuICAgIERvdDogICAgICAgICBbXCJkb3RcIl0sXG4gICAgRHJvb2xzOiAgICAgIFtcImRybFwiXSxcbiAgICBFZGlmYWN0OiAgICAgW1wiZWRpXCJdLFxuICAgIEVpZmZlbDogICAgICBbXCJlfGdlXCJdLFxuICAgIEVKUzogICAgICAgICBbXCJlanNcIl0sXG4gICAgRWxpeGlyOiAgICAgIFtcImV4fGV4c1wiXSxcbiAgICBFbG06ICAgICAgICAgW1wiZWxtXCJdLFxuICAgIEVybGFuZzogICAgICBbXCJlcmx8aHJsXCJdLFxuICAgIEZsaXg6ICAgICAgICBbXCJmbGl4XCJdLFxuICAgIEZvcnRoOiAgICAgICBbXCJmcnR8ZnN8bGRyfGZ0aHw0dGhcIl0sXG4gICAgRm9ydHJhbjogICAgIFtcImZ8ZjkwXCJdLFxuICAgIEZTaGFycDogICAgICBbXCJmc2l8ZnN8bWx8bWxpfGZzeHxmc3NjcmlwdFwiXSxcbiAgICBGU0w6ICAgICAgICAgW1wiZnNsXCJdLFxuICAgIEZUTDogICAgICAgICBbXCJmdGxcIl0sXG4gICAgR2NvZGU6ICAgICAgIFtcImdjb2RlXCJdLFxuICAgIEdoZXJraW46ICAgICBbXCJmZWF0dXJlXCJdLFxuICAgIEdpdGlnbm9yZTogICBbXCJeLmdpdGlnbm9yZVwiXSxcbiAgICBHbHNsOiAgICAgICAgW1wiZ2xzbHxmcmFnfHZlcnRcIl0sXG4gICAgR29ic3RvbmVzOiAgIFtcImdic1wiXSxcbiAgICBnb2xhbmc6ICAgICAgW1wiZ29cIl0sXG4gICAgR3JhcGhRTFNjaGVtYTogW1wiZ3FsXCJdLFxuICAgIEdyb292eTogICAgICBbXCJncm9vdnlcIl0sXG4gICAgSEFNTDogICAgICAgIFtcImhhbWxcIl0sXG4gICAgSGFuZGxlYmFyczogIFtcImhic3xoYW5kbGViYXJzfHRwbHxtdXN0YWNoZVwiXSxcbiAgICBIYXNrZWxsOiAgICAgW1wiaHNcIl0sXG4gICAgSGFza2VsbF9DYWJhbDogW1wiY2FiYWxcIl0sXG4gICAgaGFYZTogICAgICAgIFtcImh4XCJdLFxuICAgIEhqc29uOiAgICAgICBbXCJoanNvblwiXSxcbiAgICBIVE1MOiBbXCJodG1sfGh0bXx4aHRtbHx3ZXx3cHlcIl0sXG4gICAgSFRNTF9FbGl4aXI6IFtcImVleHxodG1sLmVleFwiXSxcbiAgICBIVE1MX1J1Ynk6ICAgW1wiZXJifHJodG1sfGh0bWwuZXJiXCJdLFxuICAgIElOSTogICAgICAgICBbXCJpbml8Y29uZnxjZmd8cHJlZnNcIl0sXG4gICAgSW86ICAgICAgICAgIFtcImlvXCJdLFxuICAgIElvbjogICAgICAgICBbXCJpb25cIl0sXG4gICAgSmFjazogICAgICAgIFtcImphY2tcIl0sXG4gICAgSmFkZTogICAgICAgIFtcImphZGV8cHVnXCJdLFxuICAgIEphdmE6ICAgICAgICBbXCJqYXZhXCJdLFxuICAgIEphdmFTY3JpcHQ6ICBbXCJqc3xqc218Y2pzfG1qc1wiXSxcbiAgICBKRVhMOiAgICAgICAgW1wiamV4bFwiXSxcbiAgICBKU09OOiAgICAgICAgW1wianNvblwiXSxcbiAgICBKU09ONTogICAgICAgW1wianNvbjVcIl0sXG4gICAgSlNPTmlxOiAgICAgIFtcImpxXCJdLFxuICAgIEpTUDogICAgICAgICBbXCJqc3BcIl0sXG4gICAgSlNTTTogICAgICAgIFtcImpzc218anNzbV9zdGF0ZVwiXSxcbiAgICBKU1g6ICAgICAgICAgW1wianN4XCJdLFxuICAgIEp1bGlhOiAgICAgICBbXCJqbFwiXSxcbiAgICBLb3RsaW46ICAgICAgW1wia3R8a3RzXCJdLFxuICAgIExhVGVYOiAgICAgICBbXCJ0ZXh8bGF0ZXh8bHR4fGJpYlwiXSxcbiAgICBMYXR0ZTogICAgICAgW1wibGF0dGVcIl0sXG4gICAgTEVTUzogICAgICAgIFtcImxlc3NcIl0sXG4gICAgTGlxdWlkOiAgICAgIFtcImxpcXVpZFwiXSxcbiAgICBMaXNwOiAgICAgICAgW1wibGlzcFwiXSxcbiAgICBMaXZlU2NyaXB0OiAgW1wibHNcIl0sXG4gICAgTG9nOiAgICAgICAgIFtcImxvZ1wiXSxcbiAgICBMb2dpUUw6ICAgICAgW1wibG9naWN8bHFsXCJdLFxuICAgIExvZ3RhbGs6ICAgICBbXCJsZ3RcIl0sXG4gICAgTFNMOiAgICAgICAgIFtcImxzbFwiXSxcbiAgICBMdWE6ICAgICAgICAgW1wibHVhXCJdLFxuICAgIEx1YVBhZ2U6ICAgICBbXCJscFwiXSxcbiAgICBMdWNlbmU6ICAgICAgW1wibHVjZW5lXCJdLFxuICAgIE1ha2VmaWxlOiAgICBbXCJeTWFrZWZpbGV8XkdOVW1ha2VmaWxlfF5tYWtlZmlsZXxeT0NhbWxNYWtlZmlsZXxtYWtlXCJdLFxuICAgIE1hcmtkb3duOiAgICBbXCJtZHxtYXJrZG93blwiXSxcbiAgICBNYXNrOiAgICAgICAgW1wibWFza1wiXSxcbiAgICBNQVRMQUI6ICAgICAgW1wibWF0bGFiXCJdLFxuICAgIE1hemU6ICAgICAgICBbXCJtelwiXSxcbiAgICBNZWRpYVdpa2k6ICAgW1wid2lraXxtZWRpYXdpa2lcIl0sXG4gICAgTUVMOiAgICAgICAgIFtcIm1lbFwiXSxcbiAgICBNSVBTOiAgICAgICAgW1wic3xhc21cIl0sXG4gICAgTUlYQUw6ICAgICAgIFtcIm1peGFsXCJdLFxuICAgIE1VU0hDb2RlOiAgICBbXCJtY3xtdXNoXCJdLFxuICAgIE15U1FMOiAgICAgICBbXCJteXNxbFwiXSxcbiAgICBOYXNhbDogICAgICAgW1wibmFzXCJdLFxuICAgIE5naW54OiAgICAgICBbXCJuZ2lueHxjb25mXCJdLFxuICAgIE5pbTogICAgICAgICBbXCJuaW1cIl0sXG4gICAgTml4OiAgICAgICAgIFtcIm5peFwiXSxcbiAgICBOU0lTOiAgICAgICAgW1wibnNpfG5zaFwiXSxcbiAgICBOdW5qdWNrczogICAgW1wibnVuanVja3N8bnVuanN8bmp8bmprXCJdLFxuICAgIE9iamVjdGl2ZUM6ICBbXCJtfG1tXCJdLFxuICAgIE9DYW1sOiAgICAgICBbXCJtbHxtbGlcIl0sXG4gICAgT2RpbjogICAgICAgIFtcIm9kaW5cIl0sXG4gICAgUGFydGlRTDogICAgIFtcInBhcnRpcWx8cHFsXCJdLFxuICAgIFBhc2NhbDogICAgICBbXCJwYXN8cFwiXSxcbiAgICBQZXJsOiAgICAgICAgW1wicGx8cG1cIl0sXG4gICAgcGdTUUw6ICAgICAgIFtcInBnc3FsXCJdLFxuICAgIFBIUDogICAgICAgICBbXCJwaHB8aW5jfHBodG1sfHNodG1sfHBocDN8cGhwNHxwaHA1fHBocHN8cGhwdHxhd3xjdHB8bW9kdWxlXCJdLFxuICAgIFBIUF9MYXJhdmVsX2JsYWRlOiBbXCJibGFkZS5waHBcIl0sXG4gICAgUGlnOiAgICAgICAgIFtcInBpZ1wiXSxcbiAgICBQTFNRTDogICAgICAgW1wicGxzcWxcIl0sXG4gICAgUG93ZXJzaGVsbDogIFtcInBzMVwiXSxcbiAgICBQcmFhdDogICAgICAgW1wicHJhYXR8cHJhYXRzY3JpcHR8cHNjfHByb2NcIl0sXG4gICAgUHJpc21hOiAgICAgIFtcInByaXNtYVwiXSxcbiAgICBQcm9sb2c6ICAgICAgW1wicGxnfHByb2xvZ1wiXSxcbiAgICBQcm9wZXJ0aWVzOiAgW1wicHJvcGVydGllc1wiXSxcbiAgICBQcm90b2J1ZjogICAgW1wicHJvdG9cIl0sXG4gICAgUFJRTDogICAgICAgIFtcInBycWxcIl0sXG4gICAgUHVwcGV0OiAgICAgIFtcImVwcHxwcFwiXSxcbiAgICBQeXRob246ICAgICAgW1wicHlcIl0sXG4gICAgUU1MOiAgICAgICAgIFtcInFtbFwiXSxcbiAgICBSOiAgICAgICAgICAgW1wiclwiXSxcbiAgICBSYWt1OiAgICAgICAgW1wicmFrdXxyYWt1bW9kfHJha3V0ZXN0fHA2fHBsNnxwbTZcIl0sXG4gICAgUmF6b3I6ICAgICAgIFtcImNzaHRtbHxhc3BcIl0sXG4gICAgUkRvYzogICAgICAgIFtcIlJkXCJdLFxuICAgIFJlZDogICAgICAgICBbXCJyZWR8cmVkc1wiXSxcbiAgICBSSFRNTDogICAgICAgW1wiUmh0bWxcIl0sXG4gICAgUm9ib3Q6ICAgICAgIFtcInJvYm90fHJlc291cmNlXCJdLFxuICAgIFJTVDogICAgICAgICBbXCJyc3RcIl0sXG4gICAgUnVieTogICAgICAgIFtcInJifHJ1fGdlbXNwZWN8cmFrZXxeR3VhcmRmaWxlfF5SYWtlZmlsZXxeR2VtZmlsZVwiXSxcbiAgICBSdXN0OiAgICAgICAgW1wicnNcIl0sXG4gICAgU2FDOiAgICAgICAgIFtcInNhY1wiXSxcbiAgICBTQVNTOiAgICAgICAgW1wic2Fzc1wiXSxcbiAgICBTQ0FEOiAgICAgICAgW1wic2NhZFwiXSxcbiAgICBTY2FsYTogICAgICAgW1wic2NhbGF8c2J0XCJdLFxuICAgIFNjaGVtZTogICAgICBbXCJzY218c218cmt0fG9ha3xzY2hlbWVcIl0sXG4gICAgU2NyeXB0OiAgICAgIFtcInNjcnlwdFwiXSxcbiAgICBTQ1NTOiAgICAgICAgW1wic2Nzc1wiXSxcbiAgICBTSDogICAgICAgICAgW1wic2h8YmFzaHxeLmJhc2hyY1wiXSxcbiAgICBTSlM6ICAgICAgICAgW1wic2pzXCJdLFxuICAgIFNsaW06ICAgICAgICBbXCJzbGltfHNraW1cIl0sXG4gICAgU21hcnR5OiAgICAgIFtcInNtYXJ0eXx0cGxcIl0sXG4gICAgU21pdGh5OiAgICAgIFtcInNtaXRoeVwiXSxcbiAgICBzbmlwcGV0czogICAgW1wic25pcHBldHNcIl0sXG4gICAgU295X1RlbXBsYXRlOltcInNveVwiXSxcbiAgICBTcGFjZTogICAgICAgW1wic3BhY2VcIl0sXG4gICAgU1BBUlFMOiAgICAgIFtcInJxXCJdLFxuICAgIFNRTDogICAgICAgICBbXCJzcWxcIl0sXG4gICAgU1FMU2VydmVyOiAgIFtcInNxbHNlcnZlclwiXSxcbiAgICBTdHlsdXM6ICAgICAgW1wic3R5bHxzdHlsdXNcIl0sXG4gICAgU1ZHOiAgICAgICAgIFtcInN2Z1wiXSxcbiAgICBTd2lmdDogICAgICAgW1wic3dpZnRcIl0sXG4gICAgVGNsOiAgICAgICAgIFtcInRjbFwiXSxcbiAgICBUZXJyYWZvcm06ICAgW1widGZcIiwgXCJ0ZnZhcnNcIiwgXCJ0ZXJyYWdydW50XCJdLFxuICAgIFRleDogICAgICAgICBbXCJ0ZXhcIl0sXG4gICAgVGV4dDogICAgICAgIFtcInR4dFwiXSxcbiAgICBUZXh0aWxlOiAgICAgW1widGV4dGlsZVwiXSxcbiAgICBUb21sOiAgICAgICAgW1widG9tbFwiXSxcbiAgICBUU1Y6ICAgICAgICAgW1widHN2XCJdLFxuICAgIFRTWDogICAgICAgICBbXCJ0c3hcIl0sXG4gICAgVHVydGxlOiAgICAgIFtcInR0bFwiXSxcbiAgICBUd2lnOiAgICAgICAgW1widHdpZ3xzd2lnXCJdLFxuICAgIFR5cGVzY3JpcHQ6ICBbXCJ0c3xtdHN8Y3RzfHR5cGVzY3JpcHR8c3RyXCJdLFxuICAgIFZhbGE6ICAgICAgICBbXCJ2YWxhXCJdLFxuICAgIFZCU2NyaXB0OiAgICBbXCJ2YnN8dmJcIl0sXG4gICAgVmVsb2NpdHk6ICAgIFtcInZtXCJdLFxuICAgIFZlcmlsb2c6ICAgICBbXCJ2fHZofHN2fHN2aFwiXSxcbiAgICBWSERMOiAgICAgICAgW1widmhkfHZoZGxcIl0sXG4gICAgVmlzdWFsZm9yY2U6IFtcInZmcHxjb21wb25lbnR8cGFnZVwiXSxcbiAgICBWdWU6IFtcInZ1ZVwiXSxcbiAgICBXb2xsb2s6ICAgICAgW1wid2xrfHdwZ218d3Rlc3RcIl0sXG4gICAgWE1MOiAgICAgICAgIFtcInhtbHxyZGZ8cnNzfHdzZGx8eHNsdHxhdG9tfG1hdGhtbHxtbWx8eHVsfHhibHx4YW1sXCJdLFxuICAgIFhRdWVyeTogICAgICBbXCJ4cVwiXSxcbiAgICBZQU1MOiAgICAgICAgW1wieWFtbHx5bWxcIl0sXG4gICAgWmVlazogICAgICAgIFtcInplZWt8YnJvXCJdLFxuICAgIFppZzogICAgICAgICBbXCJ6aWdcIl1cbn07XG5cbnZhciBuYW1lT3ZlcnJpZGVzID0ge1xuICAgIE9iamVjdGl2ZUM6IFwiT2JqZWN0aXZlLUNcIixcbiAgICBDU2hhcnA6IFwiQyNcIixcbiAgICBnb2xhbmc6IFwiR29cIixcbiAgICBDX0NwcDogXCJDIGFuZCBDKytcIixcbiAgICBDc291bmRfRG9jdW1lbnQ6IFwiQ3NvdW5kIERvY3VtZW50XCIsXG4gICAgQ3NvdW5kX09yY2hlc3RyYTogXCJDc291bmRcIixcbiAgICBDc291bmRfU2NvcmU6IFwiQ3NvdW5kIFNjb3JlXCIsXG4gICAgY29mZmVlOiBcIkNvZmZlZVNjcmlwdFwiLFxuICAgIEhUTUxfUnVieTogXCJIVE1MIChSdWJ5KVwiLFxuICAgIEhUTUxfRWxpeGlyOiBcIkhUTUwgKEVsaXhpcilcIixcbiAgICBGVEw6IFwiRnJlZU1hcmtlclwiLFxuICAgIFBIUF9MYXJhdmVsX2JsYWRlOiBcIlBIUCAoQmxhZGUgVGVtcGxhdGUpXCIsXG4gICAgUGVybDY6IFwiUGVybCA2XCIsXG4gICAgQXV0b0hvdEtleTogXCJBdXRvSG90a2V5IC8gQXV0b0l0XCJcbn07XG5cbi8qKlxuICogQW4gb2JqZWN0IHRoYXQgc2VydmVzIGFzIGEgbWFwcGluZyBvZiBtb2RlIG5hbWVzIHRvIHRoZWlyIGNvcnJlc3BvbmRpbmcgbW9kZSBkYXRhLlxuICogVGhlIGtleXMgb2YgdGhpcyBvYmplY3QgYXJlIG1vZGUgbmFtZXMgKGFzIHN0cmluZ3MpLCBhbmQgdGhlIHZhbHVlcyBhcmUgZXhwZWN0ZWRcbiAqIHRvIHJlcHJlc2VudCBkYXRhIGFzc29jaWF0ZWQgd2l0aCBlYWNoIG1vZGUuXG4gKlxuICogVGhpcyBzdHJ1Y3R1cmUgY2FuIGJlIHVzZWQgZm9yIHF1aWNrIGxvb2t1cHMgb2YgbW9kZSBpbmZvcm1hdGlvbiBieSBuYW1lLlxuICogQHR5cGUge1JlY29yZDxzdHJpbmcsIE1vZGU+fVxuICovXG52YXIgbW9kZXNCeU5hbWUgPSB7fTtcbmZvciAodmFyIG5hbWUgaW4gc3VwcG9ydGVkTW9kZXMpIHtcbiAgICB2YXIgZGF0YSA9IHN1cHBvcnRlZE1vZGVzW25hbWVdO1xuICAgIHZhciBkaXNwbGF5TmFtZSA9IChuYW1lT3ZlcnJpZGVzW25hbWVdIHx8IG5hbWUpLnJlcGxhY2UoL18vZywgXCIgXCIpO1xuICAgIHZhciBmaWxlbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgbW9kZSA9IG5ldyBNb2RlKGZpbGVuYW1lLCBkaXNwbGF5TmFtZSwgZGF0YVswXSk7XG4gICAgbW9kZXNCeU5hbWVbZmlsZW5hbWVdID0gbW9kZTtcbiAgICBtb2Rlcy5wdXNoKG1vZGUpO1xufVxuXG5leHBvcnRzLmdldE1vZGVGb3JQYXRoID0gZ2V0TW9kZUZvclBhdGg7XG5leHBvcnRzLm1vZGVzID0gbW9kZXM7XG5leHBvcnRzLm1vZGVzQnlOYW1lID0gbW9kZXNCeU5hbWU7IiwiLyoqXG4gKiAjIyBTZXR0aW5ncyBNZW51IGV4dGVuc2lvblxuICpcbiAqIFByb3ZpZGVzIGEgc2V0dGluZ3MgcGFuZWwgZm9yIGNvbmZpZ3VyaW5nIGVkaXRvciBvcHRpb25zIHRocm91Z2ggYW4gaW50ZXJhY3RpdmUgVUkuXG4gKiBDcmVhdGVzIGEgdGFidWxhciBpbnRlcmZhY2Ugd2l0aCBncm91cGVkIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBpbmNsdWRpbmcgdGhlbWVzLCBtb2Rlcywga2V5YmluZGluZ3MsXG4gKiBmb250IHNldHRpbmdzLCBkaXNwbGF5IHByZWZlcmVuY2VzLCBhbmQgYWR2YW5jZWQgZWRpdG9yIGJlaGF2aW9ycy4gU3VwcG9ydHMgZHluYW1pYyBvcHRpb24gcmVuZGVyaW5nXG4gKiB3aXRoIHZhcmlvdXMgaW5wdXQgdHlwZXMgKGRyb3Bkb3ducywgY2hlY2tib3hlcywgbnVtYmVyIGlucHV0cywgYnV0dG9uIGJhcnMpIGFuZCByZWFsLXRpbWUgdXBkYXRlcy5cbiAqXG4gKiAqKlVzYWdlOioqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiB2YXIgT3B0aW9uUGFuZWwgPSByZXF1aXJlKFwiYWNlL2V4dC9zZXR0aW5nc19tZW51XCIpLk9wdGlvblBhbmVsO1xuICogdmFyIHBhbmVsID0gbmV3IE9wdGlvblBhbmVsKGVkaXRvcik7XG4gKiBwYW5lbC5yZW5kZXIoKTtcbiAqIGBgYFxuICpcbiAqIEBtb2R1bGVcbiAqL1xuXG5cblwidXNlIHN0cmljdFwiO1xuLyoqXG4gKiBAdHlwZWRlZiB7aW1wb3J0KFwiLi4vZWRpdG9yXCIpLkVkaXRvcn0gRWRpdG9yXG4gKi9cblxucmVxdWlyZShcIi4vbWVudV90b29scy9vdmVybGF5X3BhZ2VcIik7XG5cbnZhciBkb20gPSByZXF1aXJlKFwiLi4vbGliL2RvbVwiKTtcbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBjb25maWcgPSByZXF1aXJlKFwiLi4vY29uZmlnXCIpO1xudmFyIEV2ZW50RW1pdHRlciA9IHJlcXVpcmUoXCIuLi9saWIvZXZlbnRfZW1pdHRlclwiKS5FdmVudEVtaXR0ZXI7XG52YXIgYnVpbGREb20gPSBkb20uYnVpbGREb207XG5cbnZhciBtb2RlbGlzdCA9IHJlcXVpcmUoXCIuL21vZGVsaXN0XCIpO1xudmFyIHRoZW1lbGlzdCA9IHJlcXVpcmUoXCIuL3RoZW1lbGlzdFwiKTtcblxudmFyIHRoZW1lcyA9IHsgQnJpZ2h0OiBbXSwgRGFyazogW10gfTtcbnRoZW1lbGlzdC50aGVtZXMuZm9yRWFjaChmdW5jdGlvbih4KSB7XG4gICAgdGhlbWVzW3guaXNEYXJrID8gXCJEYXJrXCIgOiBcIkJyaWdodFwiXS5wdXNoKHsgY2FwdGlvbjogeC5jYXB0aW9uLCB2YWx1ZTogeC50aGVtZSB9KTtcbn0pO1xuXG52YXIgbW9kZXMgPSBtb2RlbGlzdC5tb2Rlcy5tYXAoZnVuY3Rpb24oeCl7IFxuICAgIHJldHVybiB7IGNhcHRpb246IHguY2FwdGlvbiwgdmFsdWU6IHgubW9kZSB9OyBcbn0pO1xuXG5cbi8qKlxuICogQ29uZmlndXJhdGlvbiBvYmplY3QgZm9yIGdyb3VwaW5nIHZhcmlvdXMgb3B0aW9ucy9zZXR0aW5ncyBpbnRvIGNhdGVnb3JpemVkIGdyb3Vwcy5cbiAqXG4gKiBPcmdhbml6ZXMgc2V0dGluZ3MgaW50byB0d28gbWFpbiBjYXRlZ29yaWVzOiBcIk1haW5cIiBhbmQgXCJNb3JlXCIsXG4gKiBlYWNoIGNvbnRhaW5pbmcgc2V0dGluZ3MgZm9yIGNvbmZpZ3VyYWJsZSBmZWF0dXJlcyBvZiBhbiBhcHBsaWNhdGlvbi5cbiAqL1xudmFyIG9wdGlvbkdyb3VwcyA9IHtcbiAgICBNYWluOiB7XG4gICAgICAgIE1vZGU6IHtcbiAgICAgICAgICAgIHBhdGg6IFwibW9kZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgICAgIGl0ZW1zOiBtb2Rlc1xuICAgICAgICB9LFxuICAgICAgICBUaGVtZToge1xuICAgICAgICAgICAgcGF0aDogXCJ0aGVtZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJzZWxlY3RcIixcbiAgICAgICAgICAgIGl0ZW1zOiB0aGVtZXNcbiAgICAgICAgfSxcbiAgICAgICAgXCJLZXliaW5kaW5nXCI6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uQmFyXCIsXG4gICAgICAgICAgICBwYXRoOiBcImtleWJvYXJkSGFuZGxlclwiLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIkFjZVwiLCB2YWx1ZSA6IG51bGwgfSxcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlZpbVwiLCB2YWx1ZSA6IFwiYWNlL2tleWJvYXJkL3ZpbVwiIH0sXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJFbWFjc1wiLCB2YWx1ZSA6IFwiYWNlL2tleWJvYXJkL2VtYWNzXCIgfSxcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlN1YmxpbWVcIiwgdmFsdWUgOiBcImFjZS9rZXlib2FyZC9zdWJsaW1lXCIgfSxcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlZTQ29kZVwiLCB2YWx1ZSA6IFwiYWNlL2tleWJvYXJkL3ZzY29kZVwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJGb250IFNpemVcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJmb250U2l6ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgIGRlZmF1bHRWYWx1ZTogMTIsXG4gICAgICAgICAgICBkZWZhdWx0czogW1xuICAgICAgICAgICAgICAgIHtjYXB0aW9uOiBcIjEycHhcIiwgdmFsdWU6IDEyfSxcbiAgICAgICAgICAgICAgICB7Y2FwdGlvbjogXCIyNHB4XCIsIHZhbHVlOiAyNH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJTb2Z0IFdyYXBcIjoge1xuICAgICAgICAgICAgdHlwZTogXCJidXR0b25CYXJcIixcbiAgICAgICAgICAgIHBhdGg6IFwid3JhcFwiLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiT2ZmXCIsICB2YWx1ZSA6IFwib2ZmXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiVmlld1wiLCB2YWx1ZSA6IFwiZnJlZVwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIm1hcmdpblwiLCB2YWx1ZSA6IFwicHJpbnRNYXJnaW5cIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCI0MFwiLCAgIHZhbHVlIDogXCI0MFwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJDdXJzb3IgU3R5bGVcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJjdXJzb3JTdHlsZVwiLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiQWNlXCIsICAgIHZhbHVlIDogXCJhY2VcIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJTbGltXCIsICAgdmFsdWUgOiBcInNsaW1cIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJTbW9vdGhcIiwgdmFsdWUgOiBcInNtb290aFwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlNtb290aCBBbmQgU2xpbVwiLCB2YWx1ZSA6IFwic21vb3RoIHNsaW1cIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJXaWRlXCIsICAgdmFsdWUgOiBcIndpZGVcIiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiRm9sZGluZ1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImZvbGRTdHlsZVwiLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIk1hbnVhbFwiLCB2YWx1ZSA6IFwibWFudWFsXCIgfSxcbiAgICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIk1hcmsgYmVnaW5cIiwgdmFsdWUgOiBcIm1hcmtiZWdpblwiIH0sXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJNYXJrIGJlZ2luIGFuZCBlbmRcIiwgdmFsdWUgOiBcIm1hcmtiZWdpbmVuZFwiIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSxcbiAgICAgICAgXCJTb2Z0IFRhYnNcIjogW3tcbiAgICAgICAgICAgIHBhdGg6IFwidXNlU29mdFRhYnNcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBhcmlhTGFiZWw6IFwiVGFiIFNpemVcIixcbiAgICAgICAgICAgIHBhdGg6IFwidGFiU2l6ZVwiLFxuICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgIHZhbHVlczogWzIsIDMsIDQsIDgsIDE2XVxuICAgICAgICB9XSxcbiAgICAgICAgXCJPdmVyc2Nyb2xsXCI6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uQmFyXCIsXG4gICAgICAgICAgICBwYXRoOiBcInNjcm9sbFBhc3RFbmRcIixcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIk5vbmVcIiwgIHZhbHVlIDogMCB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJIYWxmXCIsICAgdmFsdWUgOiAwLjUgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiRnVsbFwiLCAgIHZhbHVlIDogMSB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9LFxuICAgIE1vcmU6IHtcbiAgICAgICAgXCJBdG9taWMgc29mdCB0YWJzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwibmF2aWdhdGVXaXRoaW5Tb2Z0VGFic1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiRW5hYmxlIEJlaGF2aW91cnNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJiZWhhdmlvdXJzRW5hYmxlZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiV3JhcCB3aXRoIHF1b3Rlc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcIndyYXBCZWhhdmlvdXJzRW5hYmxlZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiRW5hYmxlIEF1dG8gSW5kZW50XCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZW5hYmxlQXV0b0luZGVudFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiRnVsbCBMaW5lIFNlbGVjdGlvblwiOiB7XG4gICAgICAgICAgICB0eXBlOiBcImNoZWNrYm94XCIsXG4gICAgICAgICAgICB2YWx1ZXM6IFwidGV4dHxsaW5lXCIsXG4gICAgICAgICAgICBwYXRoOiBcInNlbGVjdGlvblN0eWxlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJIaWdobGlnaHQgQWN0aXZlIExpbmVcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJoaWdobGlnaHRBY3RpdmVMaW5lXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJTaG93IEludmlzaWJsZXNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJzaG93SW52aXNpYmxlc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiU2hvdyBJbmRlbnQgR3VpZGVzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZGlzcGxheUluZGVudEd1aWRlc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiSGlnaGxpZ2h0IEluZGVudCBHdWlkZXNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJoaWdobGlnaHRJbmRlbnRHdWlkZXNcIlxuICAgICAgICB9LFxuICAgICAgICBcIlBlcnNpc3RlbnQgSFNjcm9sbGJhclwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImhTY3JvbGxCYXJBbHdheXNWaXNpYmxlXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJQZXJzaXN0ZW50IFZTY3JvbGxiYXJcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJ2U2Nyb2xsQmFyQWx3YXlzVmlzaWJsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiQW5pbWF0ZSBzY3JvbGxpbmdcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJhbmltYXRlZFNjcm9sbFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiU2hvdyBHdXR0ZXJcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJzaG93R3V0dGVyXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJTaG93IExpbmUgTnVtYmVyc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInNob3dMaW5lTnVtYmVyc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiUmVsYXRpdmUgTGluZSBOdW1iZXJzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwicmVsYXRpdmVMaW5lTnVtYmVyc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiRml4ZWQgR3V0dGVyIFdpZHRoXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZml4ZWRXaWR0aEd1dHRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiU2hvdyBQcmludCBNYXJnaW5cIjogW3tcbiAgICAgICAgICAgIHBhdGg6IFwic2hvd1ByaW50TWFyZ2luXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYXJpYUxhYmVsOiBcIlByaW50IE1hcmdpblwiLFxuICAgICAgICAgICAgdHlwZTogXCJudW1iZXJcIixcbiAgICAgICAgICAgIHBhdGg6IFwicHJpbnRNYXJnaW5Db2x1bW5cIlxuICAgICAgICB9XSxcbiAgICAgICAgXCJJbmRlbnRlZCBTb2Z0IFdyYXBcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJpbmRlbnRlZFNvZnRXcmFwXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJIaWdobGlnaHQgc2VsZWN0ZWQgd29yZFwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImhpZ2hsaWdodFNlbGVjdGVkV29yZFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiRmFkZSBGb2xkIFdpZGdldHNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJmYWRlRm9sZFdpZGdldHNcIlxuICAgICAgICB9LFxuICAgICAgICBcIlVzZSB0ZXh0YXJlYSBmb3IgSU1FXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwidXNlVGV4dGFyZWFGb3JJTUVcIlxuICAgICAgICB9LFxuICAgICAgICBcIk1lcmdlIFVuZG8gRGVsdGFzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwibWVyZ2VVbmRvRGVsdGFzXCIsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJBbHdheXNcIiwgIHZhbHVlIDogXCJhbHdheXNcIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJOZXZlclwiLCAgIHZhbHVlIDogXCJmYWxzZVwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlRpbWVkXCIsICAgdmFsdWUgOiBcInRydWVcIiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiRWxhc3RpYyBUYWJzdG9wc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInVzZUVsYXN0aWNUYWJzdG9wc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiSW5jcmVtZW50YWwgU2VhcmNoXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwidXNlSW5jcmVtZW50YWxTZWFyY2hcIlxuICAgICAgICB9LFxuICAgICAgICBcIlJlYWQtb25seVwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInJlYWRPbmx5XCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJDb3B5IHdpdGhvdXQgc2VsZWN0aW9uXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiY29weVdpdGhFbXB0eVNlbGVjdGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiTGl2ZSBBdXRvY29tcGxldGlvblwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImVuYWJsZUxpdmVBdXRvY29tcGxldGlvblwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiQ3VzdG9tIHNjcm9sbGJhclwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImN1c3RvbVNjcm9sbGJhclwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiVXNlIFNWRyBndXR0ZXIgaWNvbnNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJ1c2VTdmdHdXR0ZXJJY29uc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiQW5ub3RhdGlvbnMgZm9yIGZvbGRlZCBsaW5lc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInNob3dGb2xkZWRBbm5vdGF0aW9uc1wiXG4gICAgICAgIH0sXG4gICAgICAgIFwiS2V5Ym9hcmQgQWNjZXNzaWJpbGl0eSBNb2RlXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZW5hYmxlS2V5Ym9hcmRBY2Nlc3NpYmlsaXR5XCJcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8qKlxuICogT3B0aW9uIHBhbmVsIGNvbXBvbmVudCBmb3IgY29uZmlndXJpbmcgc2V0dGluZ3Mgb3Igb3B0aW9ucy5cbiAqIFRoZSBwYW5lbCBpcyBkZXNpZ25lZCB0byBpbnRlZ3JhdGUgd2l0aCBhbiBlZGl0b3IgYW5kIHJlbmRlciB2YXJpb3VzIFVJIGNvbnRyb2xzIGJhc2VkIG9uIHByb3ZpZGVkIGNvbmZpZ3VyYXRpb24uXG4gKi9cbmNsYXNzIE9wdGlvblBhbmVsIHtcbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gICAgICogQHBhcmFtIHtIVE1MRWxlbWVudH0gW2VsZW1lbnRdXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZWRpdG9yLCBlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuZWRpdG9yID0gZWRpdG9yO1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGVsZW1lbnQgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgdGhpcy5ncm91cHMgPSBbXTtcbiAgICAgICAgdGhpcy5vcHRpb25zID0ge307XG4gICAgfVxuICAgIFxuICAgIGFkZChjb25maWcpIHtcbiAgICAgICAgaWYgKGNvbmZpZy5NYWluKVxuICAgICAgICAgICAgb29wLm1peGluKG9wdGlvbkdyb3Vwcy5NYWluLCBjb25maWcuTWFpbik7XG4gICAgICAgIGlmIChjb25maWcuTW9yZSlcbiAgICAgICAgICAgIG9vcC5taXhpbihvcHRpb25Hcm91cHMuTW9yZSwgY29uZmlnLk1vcmUpO1xuICAgIH1cblxuICBcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIGJ1aWxkRG9tKFtcInRhYmxlXCIsIHtyb2xlOiBcInByZXNlbnRhdGlvblwiLCBpZDogXCJjb250cm9sc1wifSwgXG4gICAgICAgICAgICB0aGlzLnJlbmRlck9wdGlvbkdyb3VwKG9wdGlvbkdyb3Vwcy5NYWluKSxcbiAgICAgICAgICAgIFtcInRyXCIsIG51bGwsIFtcInRkXCIsIHtjb2xzcGFuOiAyfSxcbiAgICAgICAgICAgICAgICBbXCJ0YWJsZVwiLCB7cm9sZTogXCJwcmVzZW50YXRpb25cIiwgaWQ6IFwibW9yZS1jb250cm9sc1wifSwgXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyT3B0aW9uR3JvdXAob3B0aW9uR3JvdXBzLk1vcmUpXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgXV0sXG4gICAgICAgICAgICBbXCJ0clwiLCBudWxsLCBbXCJ0ZFwiLCB7Y29sc3BhbjogMn0sIFwidmVyc2lvbiBcIiArIGNvbmZpZy52ZXJzaW9uXV1cbiAgICAgICAgXSwgdGhpcy5jb250YWluZXIpO1xuICAgIH1cbiAgICBcbiAgICByZW5kZXJPcHRpb25Hcm91cChncm91cCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoZ3JvdXApLm1hcChmdW5jdGlvbihrZXksIGkpIHtcbiAgICAgICAgICAgIHZhciBpdGVtID0gZ3JvdXBba2V5XTtcbiAgICAgICAgICAgIGlmICghaXRlbS5wb3NpdGlvbilcbiAgICAgICAgICAgICAgICBpdGVtLnBvc2l0aW9uID0gaSAvIDEwMDAwO1xuICAgICAgICAgICAgaWYgKCFpdGVtLmxhYmVsKVxuICAgICAgICAgICAgICAgIGl0ZW0ubGFiZWwgPSBrZXk7XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgfSkuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYS5wb3NpdGlvbiAtIGIucG9zaXRpb247XG4gICAgICAgIH0pLm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJPcHRpb24oaXRlbS5sYWJlbCwgaXRlbSk7XG4gICAgICAgIH0sIHRoaXMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9uXG4gICAgICovXG4gICAgcmVuZGVyT3B0aW9uQ29udHJvbChrZXksIG9wdGlvbikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9wdGlvbikpIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24ubWFwKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VsZi5yZW5kZXJPcHRpb25Db250cm9sKGtleSwgeCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvKipAdHlwZSB7YW55fSovXG4gICAgICAgIHZhciBjb250cm9sO1xuICAgICAgICBcbiAgICAgICAgdmFyIHZhbHVlID0gc2VsZi5nZXRPcHRpb24ob3B0aW9uKTtcbiAgICAgICAgXG4gICAgICAgIGlmIChvcHRpb24udmFsdWVzICYmIG9wdGlvbi50eXBlICE9IFwiY2hlY2tib3hcIikge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24udmFsdWVzID09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgb3B0aW9uLnZhbHVlcyA9IG9wdGlvbi52YWx1ZXMuc3BsaXQoXCJ8XCIpO1xuICAgICAgICAgICAgb3B0aW9uLml0ZW1zID0gb3B0aW9uLnZhbHVlcy5tYXAoZnVuY3Rpb24odikge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IHZhbHVlOiB2LCBuYW1lOiB2IH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgaWYgKG9wdGlvbi50eXBlID09IFwiYnV0dG9uQmFyXCIpIHtcbiAgICAgICAgICAgIGNvbnRyb2wgPSBbXCJkaXZcIiwge3JvbGU6IFwiZ3JvdXBcIiwgXCJhcmlhLWxhYmVsbGVkYnlcIjogb3B0aW9uLnBhdGggKyBcIi1sYWJlbFwifSwgb3B0aW9uLml0ZW1zLm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFtcImJ1dHRvblwiLCB7IFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogaXRlbS52YWx1ZSwgXG4gICAgICAgICAgICAgICAgICAgIGFjZV9zZWxlY3RlZF9idXR0b246IHZhbHVlID09IGl0ZW0udmFsdWUsIFxuICAgICAgICAgICAgICAgICAgICAnYXJpYS1wcmVzc2VkJzogdmFsdWUgPT0gaXRlbS52YWx1ZSwgXG4gICAgICAgICAgICAgICAgICAgIG9uY2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRPcHRpb24ob3B0aW9uLCBpdGVtLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBub2RlcyA9IHRoaXMucGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yQWxsKFwiW2FjZV9zZWxlY3RlZF9idXR0b25dXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzW2ldLnJlbW92ZUF0dHJpYnV0ZShcImFjZV9zZWxlY3RlZF9idXR0b25cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbm9kZXNbaV0uc2V0QXR0cmlidXRlKFwiYXJpYS1wcmVzc2VkXCIsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiYWNlX3NlbGVjdGVkX2J1dHRvblwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0QXR0cmlidXRlKFwiYXJpYS1wcmVzc2VkXCIsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9IFxuICAgICAgICAgICAgICAgIH0sIGl0ZW0uZGVzYyB8fCBpdGVtLmNhcHRpb24gfHwgaXRlbS5uYW1lXTtcbiAgICAgICAgICAgIH0pXTtcbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb24udHlwZSA9PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgICBjb250cm9sID0gW1wiaW5wdXRcIiwge3R5cGU6IFwibnVtYmVyXCIsIHZhbHVlOiB2YWx1ZSB8fCBvcHRpb24uZGVmYXVsdFZhbHVlLCBzdHlsZTpcIndpZHRoOjNlbVwiLCBvbmlucHV0OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldE9wdGlvbihvcHRpb24sIHBhcnNlSW50KHRoaXMudmFsdWUpKTtcbiAgICAgICAgICAgIH19XTtcbiAgICAgICAgICAgIGlmIChvcHRpb24uYXJpYUxhYmVsKSB7XG4gICAgICAgICAgICAgICAgY29udHJvbFsxXVtcImFyaWEtbGFiZWxcIl0gPSBvcHRpb24uYXJpYUxhYmVsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250cm9sWzFdLmlkID0ga2V5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdGlvbi5kZWZhdWx0cykge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wgPSBbY29udHJvbCwgb3B0aW9uLmRlZmF1bHRzLm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJidXR0b25cIiwge29uY2xpY2s6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGlucHV0ID0gdGhpcy5wYXJlbnROb2RlLmZpcnN0Q2hpbGQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IGl0ZW0udmFsdWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbnB1dC5vbmlucHV0KCk7XG4gICAgICAgICAgICAgICAgICAgIH19LCBpdGVtLmNhcHRpb25dO1xuICAgICAgICAgICAgICAgIH0pXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChvcHRpb24uaXRlbXMpIHtcbiAgICAgICAgICAgIHZhciBidWlsZEl0ZW1zID0gZnVuY3Rpb24oaXRlbXMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXRlbXMubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcIm9wdGlvblwiLCB7IHZhbHVlOiBpdGVtLnZhbHVlIHx8IGl0ZW0ubmFtZSB9LCBpdGVtLmRlc2MgfHwgaXRlbS5jYXB0aW9uIHx8IGl0ZW0ubmFtZV07XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgaXRlbXMgPSBBcnJheS5pc0FycmF5KG9wdGlvbi5pdGVtcykgXG4gICAgICAgICAgICAgICAgPyBidWlsZEl0ZW1zKG9wdGlvbi5pdGVtcylcbiAgICAgICAgICAgICAgICA6IE9iamVjdC5rZXlzKG9wdGlvbi5pdGVtcykubWFwKGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wib3B0Z3JvdXBcIiwge1wibGFiZWxcIjoga2V5fSwgYnVpbGRJdGVtcyhvcHRpb24uaXRlbXNba2V5XSldO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29udHJvbCA9IFtcInNlbGVjdFwiLCB7IGlkOiBrZXksIHZhbHVlOiB2YWx1ZSwgb25jaGFuZ2U6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuc2V0T3B0aW9uKG9wdGlvbiwgdGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB9IH0sIGl0ZW1zXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLnZhbHVlcyA9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZXMgPSBvcHRpb24udmFsdWVzLnNwbGl0KFwifFwiKTtcbiAgICAgICAgICAgIGlmIChvcHRpb24udmFsdWVzKSB2YWx1ZSA9IHZhbHVlID09IG9wdGlvbi52YWx1ZXNbMV07XG4gICAgICAgICAgICBjb250cm9sID0gW1wiaW5wdXRcIiwgeyB0eXBlOiBcImNoZWNrYm94XCIsIGlkOiBrZXksIGNoZWNrZWQ6IHZhbHVlIHx8IG51bGwsIG9uY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmNoZWNrZWQ7XG4gICAgICAgICAgICAgICAgaWYgKG9wdGlvbi52YWx1ZXMpIHZhbHVlID0gb3B0aW9uLnZhbHVlc1t2YWx1ZSA/IDEgOiAwXTtcbiAgICAgICAgICAgICAgICBzZWxmLnNldE9wdGlvbihvcHRpb24sIHZhbHVlKTtcbiAgICAgICAgICAgIH19XTtcbiAgICAgICAgICAgIGlmIChvcHRpb24udHlwZSA9PSBcImNoZWNrZWROdW1iZXJcIikge1xuICAgICAgICAgICAgICAgIGNvbnRyb2wgPSBbY29udHJvbCwgW11dO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb250cm9sO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFxuICAgICAqIEBwYXJhbSBrZXlcbiAgICAgKiBAcGFyYW0gb3B0aW9uXG4gICAgICovXG4gICAgcmVuZGVyT3B0aW9uKGtleSwgb3B0aW9uKSB7XG4gICAgICAgIGlmIChvcHRpb24ucGF0aCAmJiAhb3B0aW9uLm9uY2hhbmdlICYmICF0aGlzLmVkaXRvci4kb3B0aW9uc1tvcHRpb24ucGF0aF0pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBwYXRoID0gQXJyYXkuaXNBcnJheShvcHRpb24pID8gb3B0aW9uWzBdLnBhdGggOiBvcHRpb24ucGF0aDtcbiAgICAgICAgdGhpcy5vcHRpb25zW3BhdGhdID0gb3B0aW9uO1xuICAgICAgICB2YXIgc2FmZUtleSA9IFwiLVwiICsgcGF0aDtcbiAgICAgICAgdmFyIHNhZmVJZCA9IHBhdGggKyBcIi1sYWJlbFwiO1xuICAgICAgICB2YXIgY29udHJvbCA9IHRoaXMucmVuZGVyT3B0aW9uQ29udHJvbChzYWZlS2V5LCBvcHRpb24pO1xuICAgICAgICByZXR1cm4gW1widHJcIiwge2NsYXNzOiBcImFjZV9vcHRpb25zTWVudUVudHJ5XCJ9LCBbXCJ0ZFwiLFxuICAgICAgICAgICAgW1wibGFiZWxcIiwge2Zvcjogc2FmZUtleSwgaWQ6IHNhZmVJZH0sIGtleV1cbiAgICAgICAgXSwgW1widGRcIiwgY29udHJvbF1dO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVtYmVyIHwgT2JqZWN0fSBvcHRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bWJlciB8IGJvb2xlYW59IHZhbHVlXG4gICAgICovXG4gICAgc2V0T3B0aW9uKG9wdGlvbiwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvcHRpb24gPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgIG9wdGlvbiA9IHRoaXMub3B0aW9uc1tvcHRpb25dO1xuICAgICAgICBpZiAodmFsdWUgPT0gXCJmYWxzZVwiKSB2YWx1ZSA9IGZhbHNlO1xuICAgICAgICBpZiAodmFsdWUgPT0gXCJ0cnVlXCIpIHZhbHVlID0gdHJ1ZTtcbiAgICAgICAgaWYgKHZhbHVlID09IFwibnVsbFwiKSB2YWx1ZSA9IG51bGw7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBcInVuZGVmaW5lZFwiKSB2YWx1ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PSBcInN0cmluZ1wiICYmIHBhcnNlRmxvYXQodmFsdWUpLnRvU3RyaW5nKCkgPT0gdmFsdWUpXG4gICAgICAgICAgICB2YWx1ZSA9IHBhcnNlRmxvYXQodmFsdWUpO1xuICAgICAgICBpZiAob3B0aW9uLm9uY2hhbmdlKVxuICAgICAgICAgICAgb3B0aW9uLm9uY2hhbmdlKHZhbHVlKTtcbiAgICAgICAgZWxzZSBpZiAob3B0aW9uLnBhdGgpXG4gICAgICAgICAgICB0aGlzLmVkaXRvci5zZXRPcHRpb24ob3B0aW9uLnBhdGgsIHZhbHVlKTtcbiAgICAgICAgdGhpcy5fc2lnbmFsKFwic2V0T3B0aW9uXCIsIHtuYW1lOiBvcHRpb24ucGF0aCwgdmFsdWU6IHZhbHVlfSk7XG4gICAgfVxuICAgIFxuICAgIGdldE9wdGlvbihvcHRpb24pIHtcbiAgICAgICAgaWYgKG9wdGlvbi5nZXRWYWx1ZSlcbiAgICAgICAgICAgIHJldHVybiBvcHRpb24uZ2V0VmFsdWUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdG9yLmdldE9wdGlvbihvcHRpb24ucGF0aCk7XG4gICAgfVxufVxub29wLmltcGxlbWVudChPcHRpb25QYW5lbC5wcm90b3R5cGUsIEV2ZW50RW1pdHRlcik7XG5cbmV4cG9ydHMuT3B0aW9uUGFuZWwgPSBPcHRpb25QYW5lbDtcbmV4cG9ydHMub3B0aW9uR3JvdXBzID0gb3B0aW9uR3JvdXBzO1xuIiwiLyoqXG4gKiAjIyBUaGVtZSBlbnVtZXJhdGlvbiB1dGlsaXR5XG4gKlxuICogUHJvdmlkZXMgdGhlbWUgbWFuYWdlbWVudCBmb3IgdGhlIEFjZSBFZGl0b3IgYnkgZ2VuZXJhdGluZyBhbmQgb3JnYW5pemluZyBhdmFpbGFibGUgdGhlbWVzIGludG9cbiAqIGNhdGVnb3JpemVkIGNvbGxlY3Rpb25zLiBBdXRvbWF0aWNhbGx5IG1hcHMgdGhlbWUgZGF0YSBpbnRvIHN0cnVjdHVyZWQgb2JqZWN0cyBjb250YWluaW5nIHRoZW1lIG1ldGFkYXRhIGluY2x1ZGluZ1xuICogZGlzcGxheSBjYXB0aW9ucywgdGhlbWUgcGF0aHMsIGJyaWdodG5lc3MgY2xhc3NpZmljYXRpb24gKGRhcmsvbGlnaHQpLCBhbmQgbm9ybWFsaXplZCBuYW1lcy4gRXhwb3J0cyBib3RoIGFuXG4gKiBpbmRleGVkIHRoZW1lIGNvbGxlY3Rpb24gYW5kIGEgY29tcGxldGUgdGhlbWVzIGFycmF5IGZvciBlYXN5IGludGVncmF0aW9uIHdpdGggdGhlbWUgc2VsZWN0aW9uIGNvbXBvbmVudHNcbiAqIGFuZCBjb25maWd1cmF0aW9uIHN5c3RlbXMuXG4gKlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqIEBtb2R1bGVcbiAqL1xuLyoqXG4gKiBHZW5lcmF0ZXMgYSBsaXN0IG9mIHRoZW1lcyBhdmFpbGFibGUgd2hlbiBhY2Ugd2FzIGJ1aWx0LlxuICogQGZpbGVPdmVydmlldyBHZW5lcmF0ZXMgYSBsaXN0IG9mIHRoZW1lcyBhdmFpbGFibGUgd2hlbiBhY2Ugd2FzIGJ1aWx0LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBUaGVtZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNhcHRpb24gLSBUaGUgZGlzcGxheSBjYXB0aW9uIG9mIHRoZSB0aGVtZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0aGVtZSAgIC0gVGhlIHBhdGggb3IgaWRlbnRpZmllciBmb3IgdGhlIEFDRSB0aGVtZS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNEYXJrIC0gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHRoZW1lIGlzIGRhcmsgb3IgbGlnaHQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZSAgICAtIFRoZSBub3JtYWxpemVkIG5hbWUgdXNlZCBhcyB0aGUga2V5LlxuICovXG5cbnZhciB0aGVtZURhdGEgPSBbXG4gICAgW1wiQ2hyb21lXCIgICAgICAgICBdLFxuICAgIFtcIkNsb3Vkc1wiICAgICAgICAgXSxcbiAgICBbXCJDcmltc29uIEVkaXRvclwiIF0sXG4gICAgW1wiRGF3blwiICAgICAgICAgICBdLFxuICAgIFtcIkRyZWFtd2VhdmVyXCIgICAgXSxcbiAgICBbXCJFY2xpcHNlXCIgICAgICAgIF0sXG4gICAgW1wiR2l0SHViIExpZ2h0IERlZmF1bHRcIiBdLFxuICAgIFtcIkdpdEh1YiAoTGVnYWN5KVwiICAgICAgLFwiZ2l0aHViXCIgICAgICAgICAgICAgICAgICAsIFwibGlnaHRcIl0sXG4gICAgW1wiSVBsYXN0aWNcIiAgICAgICBdLFxuICAgIFtcIlNvbGFyaXplZCBMaWdodFwiXSxcbiAgICBbXCJUZXh0TWF0ZVwiICAgICAgIF0sXG4gICAgW1wiVG9tb3Jyb3dcIiAgICAgICBdLFxuICAgIFtcIlhDb2RlXCIgICAgICAgICAgXSxcbiAgICBbXCJLdXJvaXJcIl0sXG4gICAgW1wiS2F0emVuTWlsY2hcIl0sXG4gICAgW1wiU1FMIFNlcnZlclwiICAgICAgICAgICAsXCJzcWxzZXJ2ZXJcIiAgICAgICAgICAgICAgICwgXCJsaWdodFwiXSxcbiAgICBbXCJDbG91ZEVkaXRvclwiICAgICAgICAgICxcImNsb3VkX2VkaXRvclwiICAgICAgICAgICAgLCBcImxpZ2h0XCJdLFxuICAgIFtcIkFtYmlhbmNlXCIgICAgICAgICAgICAgLFwiYW1iaWFuY2VcIiAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiQ2hhb3NcIiAgICAgICAgICAgICAgICAsXCJjaGFvc1wiICAgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJDbG91ZHMgTWlkbmlnaHRcIiAgICAgICxcImNsb3Vkc19taWRuaWdodFwiICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkRyYWN1bGFcIiAgICAgICAgICAgICAgLFwiXCIgICAgICAgICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiQ29iYWx0XCIgICAgICAgICAgICAgICAsXCJjb2JhbHRcIiAgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJHcnV2Ym94XCIgICAgICAgICAgICAgICxcImdydXZib3hcIiAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkdyZWVuIG9uIEJsYWNrXCIgICAgICAgLFwiZ29iXCIgICAgICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiaWRsZSBGaW5nZXJzXCIgICAgICAgICAsXCJpZGxlX2ZpbmdlcnNcIiAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJrclRoZW1lXCIgICAgICAgICAgICAgICxcImtyX3RoZW1lXCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk1lcmJpdm9yZVwiICAgICAgICAgICAgLFwibWVyYml2b3JlXCIgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiTWVyYml2b3JlIFNvZnRcIiAgICAgICAsXCJtZXJiaXZvcmVfc29mdFwiICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJNb25vIEluZHVzdHJpYWxcIiAgICAgICxcIm1vbm9faW5kdXN0cmlhbFwiICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk1vbm9rYWlcIiAgICAgICAgICAgICAgLFwibW9ub2thaVwiICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiTm9yZCBEYXJrXCIgICAgICAgICAgICAsXCJub3JkX2RhcmtcIiAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJPbmUgRGFya1wiICAgICAgICAgICAgICxcIm9uZV9kYXJrXCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlBhc3RlbCBvbiBkYXJrXCIgICAgICAgLFwicGFzdGVsX29uX2RhcmtcIiAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiU29sYXJpemVkIERhcmtcIiAgICAgICAsXCJzb2xhcml6ZWRfZGFya1wiICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUZXJtaW5hbFwiICAgICAgICAgICAgICxcInRlcm1pbmFsXCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlRvbW9ycm93IE5pZ2h0XCIgICAgICAgLFwidG9tb3Jyb3dfbmlnaHRcIiAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVG9tb3Jyb3cgTmlnaHQgQmx1ZVwiICAsXCJ0b21vcnJvd19uaWdodF9ibHVlXCIgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUb21vcnJvdyBOaWdodCBCcmlnaHRcIixcInRvbW9ycm93X25pZ2h0X2JyaWdodFwiICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlRvbW9ycm93IE5pZ2h0IDgwc1wiICAgLFwidG9tb3Jyb3dfbmlnaHRfZWlnaHRpZXNcIiAsICBcImRhcmtcIl0sXG4gICAgW1wiVHdpbGlnaHRcIiAgICAgICAgICAgICAsXCJ0d2lsaWdodFwiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJWaWJyYW50IElua1wiICAgICAgICAgICxcInZpYnJhbnRfaW5rXCIgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkdpdEh1YiBEYXJrXCIgICAgICAgICAgLFwiZ2l0aHViX2RhcmtcIiAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiQ2xvdWRFZGl0b3IgRGFya1wiICAgICAsXCJjbG91ZF9lZGl0b3JfZGFya1wiICAgICAgICwgIFwiZGFya1wiXVxuXTtcblxuLyoqXG4gKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgVGhlbWU+fVxuICovXG5leHBvcnRzLnRoZW1lc0J5TmFtZSA9IHt9O1xuXG4vKipcbiAqIEFuIGFycmF5IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgYXZhaWxhYmxlIHRoZW1lcy5cbiAqIEB0eXBlIHtUaGVtZVtdfVxuICovXG5leHBvcnRzLnRoZW1lcyA9IHRoZW1lRGF0YS5tYXAoZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciBuYW1lID0gZGF0YVsxXSB8fCBkYXRhWzBdLnJlcGxhY2UoLyAvZywgXCJfXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIHRoZW1lID0ge1xuICAgICAgICBjYXB0aW9uOiBkYXRhWzBdLFxuICAgICAgICB0aGVtZTogXCJhY2UvdGhlbWUvXCIgKyBuYW1lLFxuICAgICAgICBpc0Rhcms6IGRhdGFbMl0gPT0gXCJkYXJrXCIsXG4gICAgICAgIG5hbWU6IG5hbWVcbiAgICB9O1xuICAgIGV4cG9ydHMudGhlbWVzQnlOYW1lW25hbWVdID0gdGhlbWU7XG4gICAgcmV0dXJuIHRoZW1lO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=