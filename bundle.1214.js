(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1214,1772,6613,1494],{

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

/***/ 11214:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
 * ## Interactive Settings Menu Extension
 *
 * Provides settings interface for the Ace editor that displays dynamically generated configuration options based on
 * the current editor state. The menu appears as an overlay panel allowing users to modify editor options, themes,
 * modes, and other settings through an intuitive graphical interface.
 *
 * **Usage:**
 * ```javascript
 * editor.showSettingsMenu();
 * ```
 *
 * The extension automatically registers the `showSettingsMenu` command and method
 * on the editor instance when initialized.
 *
 * @author <a href="mailto:matthewkastor@gmail.com">
 *  Matthew Christopher Kastor-Inare III </a><br />
 *
 * @module
 */

/*jslint indent: 4, maxerr: 50, white: true, browser: true, vars: true*/
/*global define, require */


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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCLGFBQWE7QUFDYixtQkFBbUI7Ozs7Ozs7O0FDL1NuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QUNBOztBQUVhOztBQUViO0FBQ0EsYUFBYSxRQUFRO0FBQ3JCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEIsY0FBYyxTQUFTO0FBQ3ZCLGNBQWMsUUFBUTtBQUN0Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tZW51X3Rvb2xzL292ZXJsYXlfcGFnZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvbWVudV90b29scy9zZXR0aW5nc19tZW51LmNzcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvbW9kZWxpc3QuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L29wdGlvbnMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3NldHRpbmdzX21lbnUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3RoZW1lbGlzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqICMjIE92ZXJsYXkgUGFnZSB1dGlsaXR5XG4gKlxuICogUHJvdmlkZXMgbW9kYWwgb3ZlcmxheSBmdW5jdGlvbmFsaXR5IGZvciBkaXNwbGF5aW5nIGVkaXRvciBleHRlbnNpb24gaW50ZXJmYWNlcy4gQ3JlYXRlcyBhIGZ1bGwtc2NyZWVuIG92ZXJsYXkgd2l0aFxuICogY29uZmlndXJhYmxlIGJhY2tkcm9wIGJlaGF2aW9yLCBrZXlib2FyZCBuYXZpZ2F0aW9uIChFU0MgdG8gY2xvc2UpLCBhbmQgZm9jdXMgbWFuYWdlbWVudC4gVXNlZCBieSB2YXJpb3VzIGV4dGVuc2lvbnNcbiAqIHRvIGRpc3BsYXkgbWVudXMsIHNldHRpbmdzIHBhbmVscywgYW5kIG90aGVyIGludGVyYWN0aXZlIGNvbnRlbnQgb3ZlciB0aGUgZWRpdG9yIGludGVyZmFjZS5cbiAqXG4gKiAqKlVzYWdlOioqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiB2YXIgb3ZlcmxheVBhZ2UgPSByZXF1aXJlKCcuL292ZXJsYXlfcGFnZScpLm92ZXJsYXlQYWdlO1xuICogdmFyIGNvbnRlbnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gKiBjb250ZW50RWxlbWVudC5pbm5lckhUTUwgPSAnPGgxPlNldHRpbmdzPC9oMT4nO1xuICpcbiAqIHZhciBvdmVybGF5ID0gb3ZlcmxheVBhZ2UoZWRpdG9yLCBjb250ZW50RWxlbWVudCwgZnVuY3Rpb24oKSB7XG4gKiAgIGNvbnNvbGUubG9nKCdPdmVybGF5IGNsb3NlZCcpO1xuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBAbW9kdWxlXG4gKi9cblxuXG4vKmpzbGludCBpbmRlbnQ6IDQsIG1heGVycjogNTAsIHdoaXRlOiB0cnVlLCBicm93c2VyOiB0cnVlLCB2YXJzOiB0cnVlKi9cbi8qZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSAqL1xuXG4ndXNlIHN0cmljdCc7XG52YXIgZG9tID0gcmVxdWlyZShcIi4uLy4uL2xpYi9kb21cIik7XG52YXIgY3NzVGV4dCA9IHJlcXVpcmUoXCIuL3NldHRpbmdzX21lbnUuY3NzXCIpO1xuZG9tLmltcG9ydENzc1N0cmluZyhjc3NUZXh0LCBcInNldHRpbmdzX21lbnUuY3NzXCIsIGZhbHNlKTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYW4gb3ZlcmxheSBmb3IgZGlzcGxheWluZyBtZW51cy4gVGhlIG92ZXJsYXkgaXMgYW4gYWJzb2x1dGVseVxuICogIHBvc2l0aW9uZWQgZGl2LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vLi4vZWRpdG9yXCIpLkVkaXRvcn0gZWRpdG9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZW50RWxlbWVudCBBbnkgZWxlbWVudCB3aGljaCBtYXkgYmUgcHJlc2VudGVkIGluc2lkZVxuICogIGEgZGl2LlxuICogQHBhcmFtIHsoKSA9PiB2b2lkfSBbY2FsbGJhY2tdXG4gKi9cbm1vZHVsZS5leHBvcnRzLm92ZXJsYXlQYWdlID0gZnVuY3Rpb24gb3ZlcmxheVBhZ2UoZWRpdG9yLCBjb250ZW50RWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICB2YXIgY2xvc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGlnbm9yZUZvY3VzT3V0ID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkb2N1bWVudEVzY0xpc3RlbmVyKGUpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgaWYgKCFjbG9zZXIpIHJldHVybjtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGRvY3VtZW50RXNjTGlzdGVuZXIpO1xuICAgICAgICBjbG9zZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjbG9zZXIpO1xuICAgICAgICBpZiAoZWRpdG9yKSB7XG4gICAgICAgICAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBjbG9zZXIgPSBudWxsO1xuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgb3ZlcmxheSBpcyBjbG9zZWQgd2hlbiB1c2VyIGNsaWNrcyBvdXRzaWRlIG9mIGl0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaWdub3JlICAgICAgSWYgc2V0IHRvIHRydWUgb3ZlcmxheSBzdGF5cyBvcGVuIHdoZW4gZm9jdXMgbW92ZXMgdG8gYW5vdGhlciBwYXJ0IG9mIHRoZSBlZGl0b3IuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0SWdub3JlRm9jdXNPdXQoaWdub3JlKSB7XG4gICAgICAgIGlnbm9yZUZvY3VzT3V0ID0gaWdub3JlO1xuICAgICAgICBpZiAoaWdub3JlKSB7XG4gICAgICAgICAgICBjbG9zZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgICAgY29udGVudEVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VyLnN0eWxlLmNzc1RleHQgPSAnbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyAnICtcbiAgICAgICAgJ3Bvc2l0aW9uOiBmaXhlZDsgdG9wOjA7IGJvdHRvbTowOyBsZWZ0OjA7IHJpZ2h0OjA7JyArXG4gICAgICAgICd6LWluZGV4OiA5OTkwOyAnICtcbiAgICAgICAgKGVkaXRvciA/ICdiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7JyA6ICcnKTtcbiAgICBjbG9zZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghaWdub3JlRm9jdXNPdXQpIHtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBjbGljayBjbG9zZXIgaWYgZXNjIGtleSBpcyBwcmVzc2VkXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGRvY3VtZW50RXNjTGlzdGVuZXIpO1xuXG4gICAgY29udGVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgY2xvc2VyLmFwcGVuZENoaWxkKGNvbnRlbnRFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNsb3Nlcik7XG4gICAgaWYgKGVkaXRvcikge1xuICAgICAgICBlZGl0b3IuYmx1cigpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBjbG9zZTogY2xvc2UsXG4gICAgICAgIHNldElnbm9yZUZvY3VzT3V0OiBzZXRJZ25vcmVGb2N1c091dFxuICAgIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBgI2FjZV9zZXR0aW5nc21lbnUsICNrYnNob3J0Y3V0bWVudSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0Y3RjdGNztcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgYm94LXNoYWRvdzogLTVweCA0cHggNXB4IHJnYmEoMTI2LCAxMjYsIDEyNiwgMC41NSk7XG4gICAgcGFkZGluZzogMWVtIDAuNWVtIDJlbSAxZW07XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG1hcmdpbjogMDtcbiAgICBib3R0b206IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgdG9wOiAwO1xuICAgIHotaW5kZXg6IDk5OTE7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4uYWNlX2RhcmsgI2FjZV9zZXR0aW5nc21lbnUsIC5hY2VfZGFyayAja2JzaG9ydGN1dG1lbnUge1xuICAgIGJveC1zaGFkb3c6IC0yMHB4IDEwcHggMjVweCByZ2JhKDEyNiwgMTI2LCAxMjYsIDAuMjUpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcbiAgICBjb2xvcjogYmxhY2s7XG59XG5cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeTpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMDAsIDEwMCwgMTAwLCAwLjEpO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzXG59XG5cbi5hY2VfY2xvc2VCdXR0b24ge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjQ1LCAxNDYsIDE0NiwgMC41KTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRjQ4QThBO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBwYWRkaW5nOiA3cHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAtOHB4O1xuICAgIHRvcDogLThweDtcbiAgICB6LWluZGV4OiAxMDAwMDA7XG59XG4uYWNlX2Nsb3NlQnV0dG9ue1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjQ1LCAxNDYsIDE0NiwgMC45KTtcbn1cbi5hY2Vfb3B0aW9uc01lbnVLZXkge1xuICAgIGNvbG9yOiBkYXJrc2xhdGVibHVlO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuLmFjZV9vcHRpb25zTWVudUNvbW1hbmQge1xuICAgIGNvbG9yOiBkYXJrY3lhbjtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGlucHV0LCAuYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uIHtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuXG4uYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uW2FjZV9zZWxlY3RlZF9idXR0b249dHJ1ZV0ge1xuICAgIGJhY2tncm91bmQ6ICNlN2U3ZTc7XG4gICAgYm94LXNoYWRvdzogMXB4IDBweCAycHggMHB4ICNhZGFkYWQgaW5zZXQ7XG4gICAgYm9yZGVyLWNvbG9yOiAjYWRhZGFkO1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICAgIG1hcmdpbjogMHB4O1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvbjpob3ZlcntcbiAgICBiYWNrZ3JvdW5kOiAjZjBmMGYwO1xufWA7XG4iLCIvKipcbiAqICMjIEZpbGUgbW9kZSBkZXRlY3Rpb24gdXRpbGl0eVxuICpcbiAqIFByb3ZpZGVzIGF1dG9tYXRpYyBkZXRlY3Rpb24gb2YgZWRpdG9yIHN5bnRheCBtb2RlcyBiYXNlZCBvbiBmaWxlIHBhdGhzIGFuZCBleHRlbnNpb25zLiBNYXBzIGZpbGUgZXh0ZW5zaW9ucyB0b1xuICogYXBwcm9wcmlhdGUgQWNlIEVkaXRvciBzeW50YXggaGlnaGxpZ2h0aW5nIG1vZGVzIGZvciBvdmVyIDEwMCBwcm9ncmFtbWluZyBsYW5ndWFnZXMgYW5kIGZpbGUgZm9ybWF0cyBpbmNsdWRpbmdcbiAqIEphdmFTY3JpcHQsIFR5cGVTY3JpcHQsIEhUTUwsIENTUywgUHl0aG9uLCBKYXZhLCBDKyssIGFuZCBtYW55IG90aGVycy4gU3VwcG9ydHMgY29tcGxleCBleHRlbnNpb24gcGF0dGVybnMgYW5kXG4gKiBwcm92aWRlcyBmYWxsYmFjayBtZWNoYW5pc21zIGZvciB1bmtub3duIGZpbGUgdHlwZXMuXG4gKlxuICogQG1vZHVsZVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gYXJyYXkgdG8gc3RvcmUgdmFyaW91cyBzeW50YXggbW9kZXMuXG4gKlxuICogQHR5cGUge01vZGVbXX1cbiAqL1xudmFyIG1vZGVzID0gW107XG4vKipcbiAqIFN1Z2dlc3RzIGEgbW9kZSBiYXNlZCBvbiB0aGUgZmlsZSBleHRlbnNpb24gcHJlc2VudCBpbiB0aGUgZ2l2ZW4gcGF0aFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gdGhlIGZpbGVcbiAqIEByZXR1cm5zIHtNb2RlfSBSZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZVxuICogIHN1Z2dlc3RlZCBtb2RlLlxuICovXG5mdW5jdGlvbiBnZXRNb2RlRm9yUGF0aChwYXRoKSB7XG4gICAgdmFyIG1vZGUgPSBtb2Rlc0J5TmFtZS50ZXh0O1xuICAgIHZhciBmaWxlTmFtZSA9IHBhdGguc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG1vZGVzW2ldLnN1cHBvcnRzRmlsZShmaWxlTmFtZSkpIHtcbiAgICAgICAgICAgIG1vZGUgPSBtb2Rlc1tpXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtb2RlO1xufVxuXG5jbGFzcyBNb2RlIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjYXB0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV4dGVuc2lvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBjYXB0aW9uLCBleHRlbnNpb25zKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY2FwdGlvbiA9IGNhcHRpb247XG4gICAgICAgIHRoaXMubW9kZSA9IFwiYWNlL21vZGUvXCIgKyBuYW1lO1xuICAgICAgICB0aGlzLmV4dGVuc2lvbnMgPSBleHRlbnNpb25zO1xuICAgICAgICB2YXIgcmU7XG4gICAgICAgIGlmICgvXFxeLy50ZXN0KGV4dGVuc2lvbnMpKSB7XG4gICAgICAgICAgICByZSA9IGV4dGVuc2lvbnMucmVwbGFjZSgvXFx8KFxcXik/L2csIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiJHxcIiArIChiID8gXCJeXCIgOiBcIl4uKlxcXFwuXCIpO1xuICAgICAgICAgICAgfSkgKyBcIiRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlID0gXCJcXFxcLihcIiArIGV4dGVuc2lvbnMgKyBcIikkXCI7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmV4dFJlID0gbmV3IFJlZ0V4cChyZSwgXCJnaVwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZW5hbWVcbiAgICAgKiBAcmV0dXJucyB7UmVnRXhwTWF0Y2hBcnJheSB8IG51bGx9XG4gICAgICovXG4gICAgc3VwcG9ydHNGaWxlKGZpbGVuYW1lKSB7XG4gICAgICAgIHJldHVybiBmaWxlbmFtZS5tYXRjaCh0aGlzLmV4dFJlKTtcbiAgICB9XG59XG5cbi8vIHRvZG8gZmlyc3RsaW5lbWF0Y2hcbnZhciBzdXBwb3J0ZWRNb2RlcyA9IHtcbiAgICBBQkFQOiAgICAgICAgW1wiYWJhcFwiXSxcbiAgICBBQkM6ICAgICAgICAgW1wiYWJjXCJdLFxuICAgIEFjdGlvblNjcmlwdDpbXCJhc1wiXSxcbiAgICBBREE6ICAgICAgICAgW1wiYWRhfGFkYlwiXSxcbiAgICBBbGRhOiAgICAgICAgW1wiYWxkYVwiXSxcbiAgICBBcGFjaGVfQ29uZjogW1wiXmh0YWNjZXNzfF5odGdyb3Vwc3xeaHRwYXNzd2R8XmNvbmZ8aHRhY2Nlc3N8aHRncm91cHN8aHRwYXNzd2RcIl0sXG4gICAgQXBleDogICAgICAgIFtcImFwZXh8Y2xzfHRyaWdnZXJ8dGdyXCJdLFxuICAgIEFRTDogICAgICAgICBbXCJhcWxcIl0sXG4gICAgQXNjaWlEb2M6ICAgIFtcImFzY2lpZG9jfGFkb2NcIl0sXG4gICAgQVNMOiAgICAgICAgIFtcImRzbHxhc2x8YXNsLmpzb25cIl0sXG4gICAgQXNzZW1ibHlfQVJNMzI6W1wic1wiXSxcbiAgICBBc3NlbWJseV94ODY6W1wiYXNtfGFcIl0sXG4gICAgQXN0cm86ICAgICAgIFtcImFzdHJvXCJdLFxuICAgIEF1dG9Ib3RLZXk6ICBbXCJhaGtcIl0sXG4gICAgQmFzaWM6ICAgICAgIFtcImJhc3xiYWtcIl0sXG4gICAgQmF0Y2hGaWxlOiAgIFtcImJhdHxjbWRcIl0sXG4gICAgQmliVGVYOiAgICAgIFtcImJpYlwiXSxcbiAgICBDX0NwcDogICAgICAgW1wiY3BwfGN8Y2N8Y3h4fGh8aGh8aHBwfGlub1wiXSxcbiAgICBDOVNlYXJjaDogICAgW1wiYzlzZWFyY2hfcmVzdWx0c1wiXSxcbiAgICBDaXJydTogICAgICAgW1wiY2lycnV8Y3JcIl0sXG4gICAgQ2xvanVyZTogICAgIFtcImNsanxjbGpzXCJdLFxuICAgIENsdWU6ICAgICAgICBbXCJjbHVlXCJdLFxuICAgIENvYm9sOiAgICAgICBbXCJDQkx8Q09CXCJdLFxuICAgIGNvZmZlZTogICAgICBbXCJjb2ZmZWV8Y2Z8Y3NvbnxeQ2FrZWZpbGVcIl0sXG4gICAgQ29sZEZ1c2lvbjogIFtcImNmbXxjZmNcIl0sXG4gICAgQ3J5c3RhbDogICAgIFtcImNyXCJdLFxuICAgIENTaGFycDogICAgICBbXCJjc1wiXSxcbiAgICBDc291bmRfRG9jdW1lbnQ6IFtcImNzZFwiXSxcbiAgICBDc291bmRfT3JjaGVzdHJhOiBbXCJvcmNcIl0sXG4gICAgQ3NvdW5kX1Njb3JlOiBbXCJzY29cIl0sXG4gICAgQ1NTOiAgICAgICAgIFtcImNzc1wiXSxcbiAgICBDU1Y6ICAgICAgICAgW1wiY3N2XCJdLFxuICAgIEN1cmx5OiAgICAgICBbXCJjdXJseVwiXSxcbiAgICBDdXR0bGVmaXNoOiAgW1wiY29uZlwiXSxcbiAgICBEOiAgICAgICAgICAgW1wiZHxkaVwiXSxcbiAgICBEYXJ0OiAgICAgICAgW1wiZGFydFwiXSxcbiAgICBEaWZmOiAgICAgICAgW1wiZGlmZnxwYXRjaFwiXSxcbiAgICBEamFuZ286ICAgICAgW1wiZGp0fGh0bWwuZGp0fGRqLmh0bWx8ZGpodG1sXCJdLFxuICAgIERvY2tlcmZpbGU6ICBbXCJeRG9ja2VyZmlsZVwiXSxcbiAgICBEb3Q6ICAgICAgICAgW1wiZG90XCJdLFxuICAgIERyb29sczogICAgICBbXCJkcmxcIl0sXG4gICAgRWRpZmFjdDogICAgIFtcImVkaVwiXSxcbiAgICBFaWZmZWw6ICAgICAgW1wiZXxnZVwiXSxcbiAgICBFSlM6ICAgICAgICAgW1wiZWpzXCJdLFxuICAgIEVsaXhpcjogICAgICBbXCJleHxleHNcIl0sXG4gICAgRWxtOiAgICAgICAgIFtcImVsbVwiXSxcbiAgICBFcmxhbmc6ICAgICAgW1wiZXJsfGhybFwiXSxcbiAgICBGbGl4OiAgICAgICAgW1wiZmxpeFwiXSxcbiAgICBGb3J0aDogICAgICAgW1wiZnJ0fGZzfGxkcnxmdGh8NHRoXCJdLFxuICAgIEZvcnRyYW46ICAgICBbXCJmfGY5MFwiXSxcbiAgICBGU2hhcnA6ICAgICAgW1wiZnNpfGZzfG1sfG1saXxmc3h8ZnNzY3JpcHRcIl0sXG4gICAgRlNMOiAgICAgICAgIFtcImZzbFwiXSxcbiAgICBGVEw6ICAgICAgICAgW1wiZnRsXCJdLFxuICAgIEdjb2RlOiAgICAgICBbXCJnY29kZVwiXSxcbiAgICBHaGVya2luOiAgICAgW1wiZmVhdHVyZVwiXSxcbiAgICBHaXRpZ25vcmU6ICAgW1wiXi5naXRpZ25vcmVcIl0sXG4gICAgR2xzbDogICAgICAgIFtcImdsc2x8ZnJhZ3x2ZXJ0XCJdLFxuICAgIEdvYnN0b25lczogICBbXCJnYnNcIl0sXG4gICAgZ29sYW5nOiAgICAgIFtcImdvXCJdLFxuICAgIEdyYXBoUUxTY2hlbWE6IFtcImdxbFwiXSxcbiAgICBHcm9vdnk6ICAgICAgW1wiZ3Jvb3Z5XCJdLFxuICAgIEhBTUw6ICAgICAgICBbXCJoYW1sXCJdLFxuICAgIEhhbmRsZWJhcnM6ICBbXCJoYnN8aGFuZGxlYmFyc3x0cGx8bXVzdGFjaGVcIl0sXG4gICAgSGFza2VsbDogICAgIFtcImhzXCJdLFxuICAgIEhhc2tlbGxfQ2FiYWw6IFtcImNhYmFsXCJdLFxuICAgIGhhWGU6ICAgICAgICBbXCJoeFwiXSxcbiAgICBIanNvbjogICAgICAgW1wiaGpzb25cIl0sXG4gICAgSFRNTDogW1wiaHRtbHxodG18eGh0bWx8d2V8d3B5XCJdLFxuICAgIEhUTUxfRWxpeGlyOiBbXCJlZXh8aHRtbC5lZXhcIl0sXG4gICAgSFRNTF9SdWJ5OiAgIFtcImVyYnxyaHRtbHxodG1sLmVyYlwiXSxcbiAgICBJTkk6ICAgICAgICAgW1wiaW5pfGNvbmZ8Y2ZnfHByZWZzXCJdLFxuICAgIElvOiAgICAgICAgICBbXCJpb1wiXSxcbiAgICBJb246ICAgICAgICAgW1wiaW9uXCJdLFxuICAgIEphY2s6ICAgICAgICBbXCJqYWNrXCJdLFxuICAgIEphZGU6ICAgICAgICBbXCJqYWRlfHB1Z1wiXSxcbiAgICBKYXZhOiAgICAgICAgW1wiamF2YVwiXSxcbiAgICBKYXZhU2NyaXB0OiAgW1wianN8anNtfGNqc3xtanNcIl0sXG4gICAgSkVYTDogICAgICAgIFtcImpleGxcIl0sXG4gICAgSlNPTjogICAgICAgIFtcImpzb25cIl0sXG4gICAgSlNPTjU6ICAgICAgIFtcImpzb241XCJdLFxuICAgIEpTT05pcTogICAgICBbXCJqcVwiXSxcbiAgICBKU1A6ICAgICAgICAgW1wianNwXCJdLFxuICAgIEpTU006ICAgICAgICBbXCJqc3NtfGpzc21fc3RhdGVcIl0sXG4gICAgSlNYOiAgICAgICAgIFtcImpzeFwiXSxcbiAgICBKdWxpYTogICAgICAgW1wiamxcIl0sXG4gICAgS290bGluOiAgICAgIFtcImt0fGt0c1wiXSxcbiAgICBMYVRlWDogICAgICAgW1widGV4fGxhdGV4fGx0eHxiaWJcIl0sXG4gICAgTGF0dGU6ICAgICAgIFtcImxhdHRlXCJdLFxuICAgIExFU1M6ICAgICAgICBbXCJsZXNzXCJdLFxuICAgIExpcXVpZDogICAgICBbXCJsaXF1aWRcIl0sXG4gICAgTGlzcDogICAgICAgIFtcImxpc3BcIl0sXG4gICAgTGl2ZVNjcmlwdDogIFtcImxzXCJdLFxuICAgIExvZzogICAgICAgICBbXCJsb2dcIl0sXG4gICAgTG9naVFMOiAgICAgIFtcImxvZ2ljfGxxbFwiXSxcbiAgICBMb2d0YWxrOiAgICAgW1wibGd0XCJdLFxuICAgIExTTDogICAgICAgICBbXCJsc2xcIl0sXG4gICAgTHVhOiAgICAgICAgIFtcImx1YVwiXSxcbiAgICBMdWFQYWdlOiAgICAgW1wibHBcIl0sXG4gICAgTHVjZW5lOiAgICAgIFtcImx1Y2VuZVwiXSxcbiAgICBNYWtlZmlsZTogICAgW1wiXk1ha2VmaWxlfF5HTlVtYWtlZmlsZXxebWFrZWZpbGV8Xk9DYW1sTWFrZWZpbGV8bWFrZVwiXSxcbiAgICBNYXJrZG93bjogICAgW1wibWR8bWFya2Rvd25cIl0sXG4gICAgTWFzazogICAgICAgIFtcIm1hc2tcIl0sXG4gICAgTUFUTEFCOiAgICAgIFtcIm1hdGxhYlwiXSxcbiAgICBNYXplOiAgICAgICAgW1wibXpcIl0sXG4gICAgTWVkaWFXaWtpOiAgIFtcIndpa2l8bWVkaWF3aWtpXCJdLFxuICAgIE1FTDogICAgICAgICBbXCJtZWxcIl0sXG4gICAgTUlQUzogICAgICAgIFtcInN8YXNtXCJdLFxuICAgIE1JWEFMOiAgICAgICBbXCJtaXhhbFwiXSxcbiAgICBNVVNIQ29kZTogICAgW1wibWN8bXVzaFwiXSxcbiAgICBNeVNRTDogICAgICAgW1wibXlzcWxcIl0sXG4gICAgTmFzYWw6ICAgICAgIFtcIm5hc1wiXSxcbiAgICBOZ2lueDogICAgICAgW1wibmdpbnh8Y29uZlwiXSxcbiAgICBOaW06ICAgICAgICAgW1wibmltXCJdLFxuICAgIE5peDogICAgICAgICBbXCJuaXhcIl0sXG4gICAgTlNJUzogICAgICAgIFtcIm5zaXxuc2hcIl0sXG4gICAgTnVuanVja3M6ICAgIFtcIm51bmp1Y2tzfG51bmpzfG5qfG5qa1wiXSxcbiAgICBPYmplY3RpdmVDOiAgW1wibXxtbVwiXSxcbiAgICBPQ2FtbDogICAgICAgW1wibWx8bWxpXCJdLFxuICAgIE9kaW46ICAgICAgICBbXCJvZGluXCJdLFxuICAgIFBhcnRpUUw6ICAgICBbXCJwYXJ0aXFsfHBxbFwiXSxcbiAgICBQYXNjYWw6ICAgICAgW1wicGFzfHBcIl0sXG4gICAgUGVybDogICAgICAgIFtcInBsfHBtXCJdLFxuICAgIHBnU1FMOiAgICAgICBbXCJwZ3NxbFwiXSxcbiAgICBQSFA6ICAgICAgICAgW1wicGhwfGluY3xwaHRtbHxzaHRtbHxwaHAzfHBocDR8cGhwNXxwaHBzfHBocHR8YXd8Y3RwfG1vZHVsZVwiXSxcbiAgICBQSFBfTGFyYXZlbF9ibGFkZTogW1wiYmxhZGUucGhwXCJdLFxuICAgIFBpZzogICAgICAgICBbXCJwaWdcIl0sXG4gICAgUExTUUw6ICAgICAgIFtcInBsc3FsXCJdLFxuICAgIFBvd2Vyc2hlbGw6ICBbXCJwczFcIl0sXG4gICAgUHJhYXQ6ICAgICAgIFtcInByYWF0fHByYWF0c2NyaXB0fHBzY3xwcm9jXCJdLFxuICAgIFByaXNtYTogICAgICBbXCJwcmlzbWFcIl0sXG4gICAgUHJvbG9nOiAgICAgIFtcInBsZ3xwcm9sb2dcIl0sXG4gICAgUHJvcGVydGllczogIFtcInByb3BlcnRpZXNcIl0sXG4gICAgUHJvdG9idWY6ICAgIFtcInByb3RvXCJdLFxuICAgIFBSUUw6ICAgICAgICBbXCJwcnFsXCJdLFxuICAgIFB1cHBldDogICAgICBbXCJlcHB8cHBcIl0sXG4gICAgUHl0aG9uOiAgICAgIFtcInB5XCJdLFxuICAgIFFNTDogICAgICAgICBbXCJxbWxcIl0sXG4gICAgUjogICAgICAgICAgIFtcInJcIl0sXG4gICAgUmFrdTogICAgICAgIFtcInJha3V8cmFrdW1vZHxyYWt1dGVzdHxwNnxwbDZ8cG02XCJdLFxuICAgIFJhem9yOiAgICAgICBbXCJjc2h0bWx8YXNwXCJdLFxuICAgIFJEb2M6ICAgICAgICBbXCJSZFwiXSxcbiAgICBSZWQ6ICAgICAgICAgW1wicmVkfHJlZHNcIl0sXG4gICAgUkhUTUw6ICAgICAgIFtcIlJodG1sXCJdLFxuICAgIFJvYm90OiAgICAgICBbXCJyb2JvdHxyZXNvdXJjZVwiXSxcbiAgICBSU1Q6ICAgICAgICAgW1wicnN0XCJdLFxuICAgIFJ1Ynk6ICAgICAgICBbXCJyYnxydXxnZW1zcGVjfHJha2V8Xkd1YXJkZmlsZXxeUmFrZWZpbGV8XkdlbWZpbGVcIl0sXG4gICAgUnVzdDogICAgICAgIFtcInJzXCJdLFxuICAgIFNhQzogICAgICAgICBbXCJzYWNcIl0sXG4gICAgU0FTUzogICAgICAgIFtcInNhc3NcIl0sXG4gICAgU0NBRDogICAgICAgIFtcInNjYWRcIl0sXG4gICAgU2NhbGE6ICAgICAgIFtcInNjYWxhfHNidFwiXSxcbiAgICBTY2hlbWU6ICAgICAgW1wic2NtfHNtfHJrdHxvYWt8c2NoZW1lXCJdLFxuICAgIFNjcnlwdDogICAgICBbXCJzY3J5cHRcIl0sXG4gICAgU0NTUzogICAgICAgIFtcInNjc3NcIl0sXG4gICAgU0g6ICAgICAgICAgIFtcInNofGJhc2h8Xi5iYXNocmNcIl0sXG4gICAgU0pTOiAgICAgICAgIFtcInNqc1wiXSxcbiAgICBTbGltOiAgICAgICAgW1wic2xpbXxza2ltXCJdLFxuICAgIFNtYXJ0eTogICAgICBbXCJzbWFydHl8dHBsXCJdLFxuICAgIFNtaXRoeTogICAgICBbXCJzbWl0aHlcIl0sXG4gICAgc25pcHBldHM6ICAgIFtcInNuaXBwZXRzXCJdLFxuICAgIFNveV9UZW1wbGF0ZTpbXCJzb3lcIl0sXG4gICAgU3BhY2U6ICAgICAgIFtcInNwYWNlXCJdLFxuICAgIFNQQVJRTDogICAgICBbXCJycVwiXSxcbiAgICBTUUw6ICAgICAgICAgW1wic3FsXCJdLFxuICAgIFNRTFNlcnZlcjogICBbXCJzcWxzZXJ2ZXJcIl0sXG4gICAgU3R5bHVzOiAgICAgIFtcInN0eWx8c3R5bHVzXCJdLFxuICAgIFNWRzogICAgICAgICBbXCJzdmdcIl0sXG4gICAgU3dpZnQ6ICAgICAgIFtcInN3aWZ0XCJdLFxuICAgIFRjbDogICAgICAgICBbXCJ0Y2xcIl0sXG4gICAgVGVycmFmb3JtOiAgIFtcInRmXCIsIFwidGZ2YXJzXCIsIFwidGVycmFncnVudFwiXSxcbiAgICBUZXg6ICAgICAgICAgW1widGV4XCJdLFxuICAgIFRleHQ6ICAgICAgICBbXCJ0eHRcIl0sXG4gICAgVGV4dGlsZTogICAgIFtcInRleHRpbGVcIl0sXG4gICAgVG9tbDogICAgICAgIFtcInRvbWxcIl0sXG4gICAgVFNWOiAgICAgICAgIFtcInRzdlwiXSxcbiAgICBUU1g6ICAgICAgICAgW1widHN4XCJdLFxuICAgIFR1cnRsZTogICAgICBbXCJ0dGxcIl0sXG4gICAgVHdpZzogICAgICAgIFtcInR3aWd8c3dpZ1wiXSxcbiAgICBUeXBlc2NyaXB0OiAgW1widHN8bXRzfGN0c3x0eXBlc2NyaXB0fHN0clwiXSxcbiAgICBWYWxhOiAgICAgICAgW1widmFsYVwiXSxcbiAgICBWQlNjcmlwdDogICAgW1widmJzfHZiXCJdLFxuICAgIFZlbG9jaXR5OiAgICBbXCJ2bVwiXSxcbiAgICBWZXJpbG9nOiAgICAgW1widnx2aHxzdnxzdmhcIl0sXG4gICAgVkhETDogICAgICAgIFtcInZoZHx2aGRsXCJdLFxuICAgIFZpc3VhbGZvcmNlOiBbXCJ2ZnB8Y29tcG9uZW50fHBhZ2VcIl0sXG4gICAgVnVlOiBbXCJ2dWVcIl0sXG4gICAgV29sbG9rOiAgICAgIFtcIndsa3x3cGdtfHd0ZXN0XCJdLFxuICAgIFhNTDogICAgICAgICBbXCJ4bWx8cmRmfHJzc3x3c2RsfHhzbHR8YXRvbXxtYXRobWx8bW1sfHh1bHx4Ymx8eGFtbFwiXSxcbiAgICBYUXVlcnk6ICAgICAgW1wieHFcIl0sXG4gICAgWUFNTDogICAgICAgIFtcInlhbWx8eW1sXCJdLFxuICAgIFplZWs6ICAgICAgICBbXCJ6ZWVrfGJyb1wiXSxcbiAgICBaaWc6ICAgICAgICAgW1wiemlnXCJdXG59O1xuXG52YXIgbmFtZU92ZXJyaWRlcyA9IHtcbiAgICBPYmplY3RpdmVDOiBcIk9iamVjdGl2ZS1DXCIsXG4gICAgQ1NoYXJwOiBcIkMjXCIsXG4gICAgZ29sYW5nOiBcIkdvXCIsXG4gICAgQ19DcHA6IFwiQyBhbmQgQysrXCIsXG4gICAgQ3NvdW5kX0RvY3VtZW50OiBcIkNzb3VuZCBEb2N1bWVudFwiLFxuICAgIENzb3VuZF9PcmNoZXN0cmE6IFwiQ3NvdW5kXCIsXG4gICAgQ3NvdW5kX1Njb3JlOiBcIkNzb3VuZCBTY29yZVwiLFxuICAgIGNvZmZlZTogXCJDb2ZmZWVTY3JpcHRcIixcbiAgICBIVE1MX1J1Ynk6IFwiSFRNTCAoUnVieSlcIixcbiAgICBIVE1MX0VsaXhpcjogXCJIVE1MIChFbGl4aXIpXCIsXG4gICAgRlRMOiBcIkZyZWVNYXJrZXJcIixcbiAgICBQSFBfTGFyYXZlbF9ibGFkZTogXCJQSFAgKEJsYWRlIFRlbXBsYXRlKVwiLFxuICAgIFBlcmw2OiBcIlBlcmwgNlwiLFxuICAgIEF1dG9Ib3RLZXk6IFwiQXV0b0hvdGtleSAvIEF1dG9JdFwiXG59O1xuXG4vKipcbiAqIEFuIG9iamVjdCB0aGF0IHNlcnZlcyBhcyBhIG1hcHBpbmcgb2YgbW9kZSBuYW1lcyB0byB0aGVpciBjb3JyZXNwb25kaW5nIG1vZGUgZGF0YS5cbiAqIFRoZSBrZXlzIG9mIHRoaXMgb2JqZWN0IGFyZSBtb2RlIG5hbWVzIChhcyBzdHJpbmdzKSwgYW5kIHRoZSB2YWx1ZXMgYXJlIGV4cGVjdGVkXG4gKiB0byByZXByZXNlbnQgZGF0YSBhc3NvY2lhdGVkIHdpdGggZWFjaCBtb2RlLlxuICpcbiAqIFRoaXMgc3RydWN0dXJlIGNhbiBiZSB1c2VkIGZvciBxdWljayBsb29rdXBzIG9mIG1vZGUgaW5mb3JtYXRpb24gYnkgbmFtZS5cbiAqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBNb2RlPn1cbiAqL1xudmFyIG1vZGVzQnlOYW1lID0ge307XG5mb3IgKHZhciBuYW1lIGluIHN1cHBvcnRlZE1vZGVzKSB7XG4gICAgdmFyIGRhdGEgPSBzdXBwb3J0ZWRNb2Rlc1tuYW1lXTtcbiAgICB2YXIgZGlzcGxheU5hbWUgPSAobmFtZU92ZXJyaWRlc1tuYW1lXSB8fCBuYW1lKS5yZXBsYWNlKC9fL2csIFwiIFwiKTtcbiAgICB2YXIgZmlsZW5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIG1vZGUgPSBuZXcgTW9kZShmaWxlbmFtZSwgZGlzcGxheU5hbWUsIGRhdGFbMF0pO1xuICAgIG1vZGVzQnlOYW1lW2ZpbGVuYW1lXSA9IG1vZGU7XG4gICAgbW9kZXMucHVzaChtb2RlKTtcbn1cblxuZXhwb3J0cy5nZXRNb2RlRm9yUGF0aCA9IGdldE1vZGVGb3JQYXRoO1xuZXhwb3J0cy5tb2RlcyA9IG1vZGVzO1xuZXhwb3J0cy5tb2Rlc0J5TmFtZSA9IG1vZGVzQnlOYW1lOyIsIi8qKlxuICogIyMgU2V0dGluZ3MgTWVudSBleHRlbnNpb25cbiAqXG4gKiBQcm92aWRlcyBhIHNldHRpbmdzIHBhbmVsIGZvciBjb25maWd1cmluZyBlZGl0b3Igb3B0aW9ucyB0aHJvdWdoIGFuIGludGVyYWN0aXZlIFVJLlxuICogQ3JlYXRlcyBhIHRhYnVsYXIgaW50ZXJmYWNlIHdpdGggZ3JvdXBlZCBjb25maWd1cmF0aW9uIG9wdGlvbnMgaW5jbHVkaW5nIHRoZW1lcywgbW9kZXMsIGtleWJpbmRpbmdzLFxuICogZm9udCBzZXR0aW5ncywgZGlzcGxheSBwcmVmZXJlbmNlcywgYW5kIGFkdmFuY2VkIGVkaXRvciBiZWhhdmlvcnMuIFN1cHBvcnRzIGR5bmFtaWMgb3B0aW9uIHJlbmRlcmluZ1xuICogd2l0aCB2YXJpb3VzIGlucHV0IHR5cGVzIChkcm9wZG93bnMsIGNoZWNrYm94ZXMsIG51bWJlciBpbnB1dHMsIGJ1dHRvbiBiYXJzKSBhbmQgcmVhbC10aW1lIHVwZGF0ZXMuXG4gKlxuICogKipVc2FnZToqKlxuICogYGBgamF2YXNjcmlwdFxuICogdmFyIE9wdGlvblBhbmVsID0gcmVxdWlyZShcImFjZS9leHQvc2V0dGluZ3NfbWVudVwiKS5PcHRpb25QYW5lbDtcbiAqIHZhciBwYW5lbCA9IG5ldyBPcHRpb25QYW5lbChlZGl0b3IpO1xuICogcGFuZWwucmVuZGVyKCk7XG4gKiBgYGBcbiAqXG4gKiBAbW9kdWxlXG4gKi9cblxuXG5cInVzZSBzdHJpY3RcIjtcbi8qKlxuICogQHR5cGVkZWYge2ltcG9ydChcIi4uL2VkaXRvclwiKS5FZGl0b3J9IEVkaXRvclxuICovXG5cbnJlcXVpcmUoXCIuL21lbnVfdG9vbHMvb3ZlcmxheV9wYWdlXCIpO1xuXG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2xpYi9kb21cIik7XG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgY29uZmlnID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKTtcbnZhciBFdmVudEVtaXR0ZXIgPSByZXF1aXJlKFwiLi4vbGliL2V2ZW50X2VtaXR0ZXJcIikuRXZlbnRFbWl0dGVyO1xudmFyIGJ1aWxkRG9tID0gZG9tLmJ1aWxkRG9tO1xuXG52YXIgbW9kZWxpc3QgPSByZXF1aXJlKFwiLi9tb2RlbGlzdFwiKTtcbnZhciB0aGVtZWxpc3QgPSByZXF1aXJlKFwiLi90aGVtZWxpc3RcIik7XG5cbnZhciB0aGVtZXMgPSB7IEJyaWdodDogW10sIERhcms6IFtdIH07XG50aGVtZWxpc3QudGhlbWVzLmZvckVhY2goZnVuY3Rpb24oeCkge1xuICAgIHRoZW1lc1t4LmlzRGFyayA/IFwiRGFya1wiIDogXCJCcmlnaHRcIl0ucHVzaCh7IGNhcHRpb246IHguY2FwdGlvbiwgdmFsdWU6IHgudGhlbWUgfSk7XG59KTtcblxudmFyIG1vZGVzID0gbW9kZWxpc3QubW9kZXMubWFwKGZ1bmN0aW9uKHgpeyBcbiAgICByZXR1cm4geyBjYXB0aW9uOiB4LmNhcHRpb24sIHZhbHVlOiB4Lm1vZGUgfTsgXG59KTtcblxuXG4vKipcbiAqIENvbmZpZ3VyYXRpb24gb2JqZWN0IGZvciBncm91cGluZyB2YXJpb3VzIG9wdGlvbnMvc2V0dGluZ3MgaW50byBjYXRlZ29yaXplZCBncm91cHMuXG4gKlxuICogT3JnYW5pemVzIHNldHRpbmdzIGludG8gdHdvIG1haW4gY2F0ZWdvcmllczogXCJNYWluXCIgYW5kIFwiTW9yZVwiLFxuICogZWFjaCBjb250YWluaW5nIHNldHRpbmdzIGZvciBjb25maWd1cmFibGUgZmVhdHVyZXMgb2YgYW4gYXBwbGljYXRpb24uXG4gKi9cbnZhciBvcHRpb25Hcm91cHMgPSB7XG4gICAgTWFpbjoge1xuICAgICAgICBNb2RlOiB7XG4gICAgICAgICAgICBwYXRoOiBcIm1vZGVcIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBpdGVtczogbW9kZXNcbiAgICAgICAgfSxcbiAgICAgICAgVGhlbWU6IHtcbiAgICAgICAgICAgIHBhdGg6IFwidGhlbWVcIixcbiAgICAgICAgICAgIHR5cGU6IFwic2VsZWN0XCIsXG4gICAgICAgICAgICBpdGVtczogdGhlbWVzXG4gICAgICAgIH0sXG4gICAgICAgIFwiS2V5YmluZGluZ1wiOiB7XG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvbkJhclwiLFxuICAgICAgICAgICAgcGF0aDogXCJrZXlib2FyZEhhbmRsZXJcIixcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJBY2VcIiwgdmFsdWUgOiBudWxsIH0sXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJWaW1cIiwgdmFsdWUgOiBcImFjZS9rZXlib2FyZC92aW1cIiB9LFxuICAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiRW1hY3NcIiwgdmFsdWUgOiBcImFjZS9rZXlib2FyZC9lbWFjc1wiIH0sXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJTdWJsaW1lXCIsIHZhbHVlIDogXCJhY2Uva2V5Ym9hcmQvc3VibGltZVwiIH0sXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJWU0NvZGVcIiwgdmFsdWUgOiBcImFjZS9rZXlib2FyZC92c2NvZGVcIiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiRm9udCBTaXplXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZm9udFNpemVcIixcbiAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICBkZWZhdWx0VmFsdWU6IDEyLFxuICAgICAgICAgICAgZGVmYXVsdHM6IFtcbiAgICAgICAgICAgICAgICB7Y2FwdGlvbjogXCIxMnB4XCIsIHZhbHVlOiAxMn0sXG4gICAgICAgICAgICAgICAge2NhcHRpb246IFwiMjRweFwiLCB2YWx1ZTogMjR9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiU29mdCBXcmFwXCI6IHtcbiAgICAgICAgICAgIHR5cGU6IFwiYnV0dG9uQmFyXCIsXG4gICAgICAgICAgICBwYXRoOiBcIndyYXBcIixcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIk9mZlwiLCAgdmFsdWUgOiBcIm9mZlwiIH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIlZpZXdcIiwgdmFsdWUgOiBcImZyZWVcIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJtYXJnaW5cIiwgdmFsdWUgOiBcInByaW50TWFyZ2luXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiNDBcIiwgICB2YWx1ZSA6IFwiNDBcIiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiQ3Vyc29yIFN0eWxlXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiY3Vyc29yU3R5bGVcIixcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIkFjZVwiLCAgICB2YWx1ZSA6IFwiYWNlXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiU2xpbVwiLCAgIHZhbHVlIDogXCJzbGltXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiU21vb3RoXCIsIHZhbHVlIDogXCJzbW9vdGhcIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJTbW9vdGggQW5kIFNsaW1cIiwgdmFsdWUgOiBcInNtb290aCBzbGltXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiV2lkZVwiLCAgIHZhbHVlIDogXCJ3aWRlXCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBcIkZvbGRpbmdcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJmb2xkU3R5bGVcIixcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJNYW51YWxcIiwgdmFsdWUgOiBcIm1hbnVhbFwiIH0sXG4gICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJNYXJrIGJlZ2luXCIsIHZhbHVlIDogXCJtYXJrYmVnaW5cIiB9LFxuICAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiTWFyayBiZWdpbiBhbmQgZW5kXCIsIHZhbHVlIDogXCJtYXJrYmVnaW5lbmRcIiB9XG4gICAgICAgICAgICBdXG4gICAgICAgIH0sXG4gICAgICAgIFwiU29mdCBUYWJzXCI6IFt7XG4gICAgICAgICAgICBwYXRoOiBcInVzZVNvZnRUYWJzXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgYXJpYUxhYmVsOiBcIlRhYiBTaXplXCIsXG4gICAgICAgICAgICBwYXRoOiBcInRhYlNpemVcIixcbiAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICB2YWx1ZXM6IFsyLCAzLCA0LCA4LCAxNl1cbiAgICAgICAgfV0sXG4gICAgICAgIFwiT3ZlcnNjcm9sbFwiOiB7XG4gICAgICAgICAgICB0eXBlOiBcImJ1dHRvbkJhclwiLFxuICAgICAgICAgICAgcGF0aDogXCJzY3JvbGxQYXN0RW5kXCIsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJOb25lXCIsICB2YWx1ZSA6IDAgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiSGFsZlwiLCAgIHZhbHVlIDogMC41IH0sXG4gICAgICAgICAgICAgICB7IGNhcHRpb24gOiBcIkZ1bGxcIiwgICB2YWx1ZSA6IDEgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9XG4gICAgfSxcbiAgICBNb3JlOiB7XG4gICAgICAgIFwiQXRvbWljIHNvZnQgdGFic1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcIm5hdmlnYXRlV2l0aGluU29mdFRhYnNcIlxuICAgICAgICB9LFxuICAgICAgICBcIkVuYWJsZSBCZWhhdmlvdXJzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiYmVoYXZpb3Vyc0VuYWJsZWRcIlxuICAgICAgICB9LFxuICAgICAgICBcIldyYXAgd2l0aCBxdW90ZXNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJ3cmFwQmVoYXZpb3Vyc0VuYWJsZWRcIlxuICAgICAgICB9LFxuICAgICAgICBcIkVuYWJsZSBBdXRvIEluZGVudFwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImVuYWJsZUF1dG9JbmRlbnRcIlxuICAgICAgICB9LFxuICAgICAgICBcIkZ1bGwgTGluZSBTZWxlY3Rpb25cIjoge1xuICAgICAgICAgICAgdHlwZTogXCJjaGVja2JveFwiLFxuICAgICAgICAgICAgdmFsdWVzOiBcInRleHR8bGluZVwiLFxuICAgICAgICAgICAgcGF0aDogXCJzZWxlY3Rpb25TdHlsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiSGlnaGxpZ2h0IEFjdGl2ZSBMaW5lXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiaGlnaGxpZ2h0QWN0aXZlTGluZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiU2hvdyBJbnZpc2libGVzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwic2hvd0ludmlzaWJsZXNcIlxuICAgICAgICB9LFxuICAgICAgICBcIlNob3cgSW5kZW50IEd1aWRlc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImRpc3BsYXlJbmRlbnRHdWlkZXNcIlxuICAgICAgICB9LFxuICAgICAgICBcIkhpZ2hsaWdodCBJbmRlbnQgR3VpZGVzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiaGlnaGxpZ2h0SW5kZW50R3VpZGVzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJQZXJzaXN0ZW50IEhTY3JvbGxiYXJcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJoU2Nyb2xsQmFyQWx3YXlzVmlzaWJsZVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiUGVyc2lzdGVudCBWU2Nyb2xsYmFyXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwidlNjcm9sbEJhckFsd2F5c1Zpc2libGVcIlxuICAgICAgICB9LFxuICAgICAgICBcIkFuaW1hdGUgc2Nyb2xsaW5nXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiYW5pbWF0ZWRTY3JvbGxcIlxuICAgICAgICB9LFxuICAgICAgICBcIlNob3cgR3V0dGVyXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwic2hvd0d1dHRlclwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiU2hvdyBMaW5lIE51bWJlcnNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJzaG93TGluZU51bWJlcnNcIlxuICAgICAgICB9LFxuICAgICAgICBcIlJlbGF0aXZlIExpbmUgTnVtYmVyc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInJlbGF0aXZlTGluZU51bWJlcnNcIlxuICAgICAgICB9LFxuICAgICAgICBcIkZpeGVkIEd1dHRlciBXaWR0aFwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImZpeGVkV2lkdGhHdXR0ZXJcIlxuICAgICAgICB9LFxuICAgICAgICBcIlNob3cgUHJpbnQgTWFyZ2luXCI6IFt7XG4gICAgICAgICAgICBwYXRoOiBcInNob3dQcmludE1hcmdpblwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGFyaWFMYWJlbDogXCJQcmludCBNYXJnaW5cIixcbiAgICAgICAgICAgIHR5cGU6IFwibnVtYmVyXCIsXG4gICAgICAgICAgICBwYXRoOiBcInByaW50TWFyZ2luQ29sdW1uXCJcbiAgICAgICAgfV0sXG4gICAgICAgIFwiSW5kZW50ZWQgU29mdCBXcmFwXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiaW5kZW50ZWRTb2Z0V3JhcFwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiSGlnaGxpZ2h0IHNlbGVjdGVkIHdvcmRcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJoaWdobGlnaHRTZWxlY3RlZFdvcmRcIlxuICAgICAgICB9LFxuICAgICAgICBcIkZhZGUgRm9sZCBXaWRnZXRzXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwiZmFkZUZvbGRXaWRnZXRzXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJVc2UgdGV4dGFyZWEgZm9yIElNRVwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInVzZVRleHRhcmVhRm9ySU1FXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJNZXJnZSBVbmRvIERlbHRhc1wiOiB7XG4gICAgICAgICAgICBwYXRoOiBcIm1lcmdlVW5kb0RlbHRhc1wiLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiQWx3YXlzXCIsICB2YWx1ZSA6IFwiYWx3YXlzXCIgfSxcbiAgICAgICAgICAgICAgIHsgY2FwdGlvbiA6IFwiTmV2ZXJcIiwgICB2YWx1ZSA6IFwiZmFsc2VcIiB9LFxuICAgICAgICAgICAgICAgeyBjYXB0aW9uIDogXCJUaW1lZFwiLCAgIHZhbHVlIDogXCJ0cnVlXCIgfVxuICAgICAgICAgICAgXVxuICAgICAgICB9LFxuICAgICAgICBcIkVsYXN0aWMgVGFic3RvcHNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJ1c2VFbGFzdGljVGFic3RvcHNcIlxuICAgICAgICB9LFxuICAgICAgICBcIkluY3JlbWVudGFsIFNlYXJjaFwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcInVzZUluY3JlbWVudGFsU2VhcmNoXCJcbiAgICAgICAgfSxcbiAgICAgICAgXCJSZWFkLW9ubHlcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJyZWFkT25seVwiXG4gICAgICAgIH0sXG4gICAgICAgIFwiQ29weSB3aXRob3V0IHNlbGVjdGlvblwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImNvcHlXaXRoRW1wdHlTZWxlY3Rpb25cIlxuICAgICAgICB9LFxuICAgICAgICBcIkxpdmUgQXV0b2NvbXBsZXRpb25cIjoge1xuICAgICAgICAgICAgcGF0aDogXCJlbmFibGVMaXZlQXV0b2NvbXBsZXRpb25cIlxuICAgICAgICB9LFxuICAgICAgICBcIkN1c3RvbSBzY3JvbGxiYXJcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJjdXN0b21TY3JvbGxiYXJcIlxuICAgICAgICB9LFxuICAgICAgICBcIlVzZSBTVkcgZ3V0dGVyIGljb25zXCI6IHtcbiAgICAgICAgICAgIHBhdGg6IFwidXNlU3ZnR3V0dGVySWNvbnNcIlxuICAgICAgICB9LFxuICAgICAgICBcIkFubm90YXRpb25zIGZvciBmb2xkZWQgbGluZXNcIjoge1xuICAgICAgICAgICAgcGF0aDogXCJzaG93Rm9sZGVkQW5ub3RhdGlvbnNcIlxuICAgICAgICB9LFxuICAgICAgICBcIktleWJvYXJkIEFjY2Vzc2liaWxpdHkgTW9kZVwiOiB7XG4gICAgICAgICAgICBwYXRoOiBcImVuYWJsZUtleWJvYXJkQWNjZXNzaWJpbGl0eVwiXG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vKipcbiAqIE9wdGlvbiBwYW5lbCBjb21wb25lbnQgZm9yIGNvbmZpZ3VyaW5nIHNldHRpbmdzIG9yIG9wdGlvbnMuXG4gKiBUaGUgcGFuZWwgaXMgZGVzaWduZWQgdG8gaW50ZWdyYXRlIHdpdGggYW4gZWRpdG9yIGFuZCByZW5kZXIgdmFyaW91cyBVSSBjb250cm9scyBiYXNlZCBvbiBwcm92aWRlZCBjb25maWd1cmF0aW9uLlxuICovXG5jbGFzcyBPcHRpb25QYW5lbCB7XG4gICAgLyoqXG4gICAgICogXG4gICAgICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICAgICAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IFtlbGVtZW50XVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGVkaXRvciwgZWxlbWVudCkge1xuICAgICAgICB0aGlzLmVkaXRvciA9IGVkaXRvcjtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBlbGVtZW50IHx8IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHRoaXMuZ3JvdXBzID0gW107XG4gICAgICAgIHRoaXMub3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBcbiAgICBhZGQoY29uZmlnKSB7XG4gICAgICAgIGlmIChjb25maWcuTWFpbilcbiAgICAgICAgICAgIG9vcC5taXhpbihvcHRpb25Hcm91cHMuTWFpbiwgY29uZmlnLk1haW4pO1xuICAgICAgICBpZiAoY29uZmlnLk1vcmUpXG4gICAgICAgICAgICBvb3AubWl4aW4ob3B0aW9uR3JvdXBzLk1vcmUsIGNvbmZpZy5Nb3JlKTtcbiAgICB9XG5cbiAgXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiO1xuICAgICAgICBidWlsZERvbShbXCJ0YWJsZVwiLCB7cm9sZTogXCJwcmVzZW50YXRpb25cIiwgaWQ6IFwiY29udHJvbHNcIn0sIFxuICAgICAgICAgICAgdGhpcy5yZW5kZXJPcHRpb25Hcm91cChvcHRpb25Hcm91cHMuTWFpbiksXG4gICAgICAgICAgICBbXCJ0clwiLCBudWxsLCBbXCJ0ZFwiLCB7Y29sc3BhbjogMn0sXG4gICAgICAgICAgICAgICAgW1widGFibGVcIiwge3JvbGU6IFwicHJlc2VudGF0aW9uXCIsIGlkOiBcIm1vcmUtY29udHJvbHNcIn0sIFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbmRlck9wdGlvbkdyb3VwKG9wdGlvbkdyb3Vwcy5Nb3JlKVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF1dLFxuICAgICAgICAgICAgW1widHJcIiwgbnVsbCwgW1widGRcIiwge2NvbHNwYW46IDJ9LCBcInZlcnNpb24gXCIgKyBjb25maWcudmVyc2lvbl1dXG4gICAgICAgIF0sIHRoaXMuY29udGFpbmVyKTtcbiAgICB9XG4gICAgXG4gICAgcmVuZGVyT3B0aW9uR3JvdXAoZ3JvdXApIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKGdyb3VwKS5tYXAoZnVuY3Rpb24oa2V5LCBpKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGdyb3VwW2tleV07XG4gICAgICAgICAgICBpZiAoIWl0ZW0ucG9zaXRpb24pXG4gICAgICAgICAgICAgICAgaXRlbS5wb3NpdGlvbiA9IGkgLyAxMDAwMDtcbiAgICAgICAgICAgIGlmICghaXRlbS5sYWJlbClcbiAgICAgICAgICAgICAgICBpdGVtLmxhYmVsID0ga2V5O1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgIH0pLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEucG9zaXRpb24gLSBiLnBvc2l0aW9uO1xuICAgICAgICB9KS5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyT3B0aW9uKGl0ZW0ubGFiZWwsIGl0ZW0pO1xuICAgICAgICB9LCB0aGlzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvblxuICAgICAqL1xuICAgIHJlbmRlck9wdGlvbkNvbnRyb2woa2V5LCBvcHRpb24pIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShvcHRpb24pKSB7XG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLm1hcChmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNlbGYucmVuZGVyT3B0aW9uQ29udHJvbChrZXksIHgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgLyoqQHR5cGUge2FueX0qL1xuICAgICAgICB2YXIgY29udHJvbDtcbiAgICAgICAgXG4gICAgICAgIHZhciB2YWx1ZSA9IHNlbGYuZ2V0T3B0aW9uKG9wdGlvbik7XG4gICAgICAgIFxuICAgICAgICBpZiAob3B0aW9uLnZhbHVlcyAmJiBvcHRpb24udHlwZSAhPSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uLnZhbHVlcyA9PSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgIG9wdGlvbi52YWx1ZXMgPSBvcHRpb24udmFsdWVzLnNwbGl0KFwifFwiKTtcbiAgICAgICAgICAgIG9wdGlvbi5pdGVtcyA9IG9wdGlvbi52YWx1ZXMubWFwKGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB2YWx1ZTogdiwgbmFtZTogdiB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGlmIChvcHRpb24udHlwZSA9PSBcImJ1dHRvbkJhclwiKSB7XG4gICAgICAgICAgICBjb250cm9sID0gW1wiZGl2XCIsIHtyb2xlOiBcImdyb3VwXCIsIFwiYXJpYS1sYWJlbGxlZGJ5XCI6IG9wdGlvbi5wYXRoICsgXCItbGFiZWxcIn0sIG9wdGlvbi5pdGVtcy5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXCJidXR0b25cIiwgeyBcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW0udmFsdWUsIFxuICAgICAgICAgICAgICAgICAgICBhY2Vfc2VsZWN0ZWRfYnV0dG9uOiB2YWx1ZSA9PSBpdGVtLnZhbHVlLCBcbiAgICAgICAgICAgICAgICAgICAgJ2FyaWEtcHJlc3NlZCc6IHZhbHVlID09IGl0ZW0udmFsdWUsIFxuICAgICAgICAgICAgICAgICAgICBvbmNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuc2V0T3B0aW9uKG9wdGlvbiwgaXRlbS52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbm9kZXMgPSB0aGlzLnBhcmVudE5vZGUucXVlcnlTZWxlY3RvckFsbChcIlthY2Vfc2VsZWN0ZWRfYnV0dG9uXVwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBub2Rlc1tpXS5yZW1vdmVBdHRyaWJ1dGUoXCJhY2Vfc2VsZWN0ZWRfYnV0dG9uXCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGVzW2ldLnNldEF0dHJpYnV0ZShcImFyaWEtcHJlc3NlZFwiLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImFjZV9zZWxlY3RlZF9idXR0b25cIiwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEF0dHJpYnV0ZShcImFyaWEtcHJlc3NlZFwiLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBcbiAgICAgICAgICAgICAgICB9LCBpdGVtLmRlc2MgfHwgaXRlbS5jYXB0aW9uIHx8IGl0ZW0ubmFtZV07XG4gICAgICAgICAgICB9KV07XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9uLnR5cGUgPT0gXCJudW1iZXJcIikge1xuICAgICAgICAgICAgY29udHJvbCA9IFtcImlucHV0XCIsIHt0eXBlOiBcIm51bWJlclwiLCB2YWx1ZTogdmFsdWUgfHwgb3B0aW9uLmRlZmF1bHRWYWx1ZSwgc3R5bGU6XCJ3aWR0aDozZW1cIiwgb25pbnB1dDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRPcHRpb24ob3B0aW9uLCBwYXJzZUludCh0aGlzLnZhbHVlKSk7XG4gICAgICAgICAgICB9fV07XG4gICAgICAgICAgICBpZiAob3B0aW9uLmFyaWFMYWJlbCkge1xuICAgICAgICAgICAgICAgIGNvbnRyb2xbMV1bXCJhcmlhLWxhYmVsXCJdID0gb3B0aW9uLmFyaWFMYWJlbDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udHJvbFsxXS5pZCA9IGtleTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChvcHRpb24uZGVmYXVsdHMpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sID0gW2NvbnRyb2wsIG9wdGlvbi5kZWZhdWx0cy5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gW1wiYnV0dG9uXCIsIHtvbmNsaWNrOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dCA9IHRoaXMucGFyZW50Tm9kZS5maXJzdENoaWxkO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBpdGVtLnZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQub25pbnB1dCgpO1xuICAgICAgICAgICAgICAgICAgICB9fSwgaXRlbS5jYXB0aW9uXTtcbiAgICAgICAgICAgICAgICB9KV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9uLml0ZW1zKSB7XG4gICAgICAgICAgICB2YXIgYnVpbGRJdGVtcyA9IGZ1bmN0aW9uKGl0ZW1zKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW1zLm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBbXCJvcHRpb25cIiwgeyB2YWx1ZTogaXRlbS52YWx1ZSB8fCBpdGVtLm5hbWUgfSwgaXRlbS5kZXNjIHx8IGl0ZW0uY2FwdGlvbiB8fCBpdGVtLm5hbWVdO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIGl0ZW1zID0gQXJyYXkuaXNBcnJheShvcHRpb24uaXRlbXMpIFxuICAgICAgICAgICAgICAgID8gYnVpbGRJdGVtcyhvcHRpb24uaXRlbXMpXG4gICAgICAgICAgICAgICAgOiBPYmplY3Qua2V5cyhvcHRpb24uaXRlbXMpLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFtcIm9wdGdyb3VwXCIsIHtcImxhYmVsXCI6IGtleX0sIGJ1aWxkSXRlbXMob3B0aW9uLml0ZW1zW2tleV0pXTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnRyb2wgPSBbXCJzZWxlY3RcIiwgeyBpZDoga2V5LCB2YWx1ZTogdmFsdWUsIG9uY2hhbmdlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnNldE9wdGlvbihvcHRpb24sIHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgfSB9LCBpdGVtc107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIG9wdGlvbi52YWx1ZXMgPT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICBvcHRpb24udmFsdWVzID0gb3B0aW9uLnZhbHVlcy5zcGxpdChcInxcIik7XG4gICAgICAgICAgICBpZiAob3B0aW9uLnZhbHVlcykgdmFsdWUgPSB2YWx1ZSA9PSBvcHRpb24udmFsdWVzWzFdO1xuICAgICAgICAgICAgY29udHJvbCA9IFtcImlucHV0XCIsIHsgdHlwZTogXCJjaGVja2JveFwiLCBpZDoga2V5LCBjaGVja2VkOiB2YWx1ZSB8fCBudWxsLCBvbmNoYW5nZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5jaGVja2VkO1xuICAgICAgICAgICAgICAgIGlmIChvcHRpb24udmFsdWVzKSB2YWx1ZSA9IG9wdGlvbi52YWx1ZXNbdmFsdWUgPyAxIDogMF07XG4gICAgICAgICAgICAgICAgc2VsZi5zZXRPcHRpb24ob3B0aW9uLCB2YWx1ZSk7XG4gICAgICAgICAgICB9fV07XG4gICAgICAgICAgICBpZiAob3B0aW9uLnR5cGUgPT0gXCJjaGVja2VkTnVtYmVyXCIpIHtcbiAgICAgICAgICAgICAgICBjb250cm9sID0gW2NvbnRyb2wsIFtdXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29udHJvbDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBcbiAgICAgKiBAcGFyYW0ga2V5XG4gICAgICogQHBhcmFtIG9wdGlvblxuICAgICAqL1xuICAgIHJlbmRlck9wdGlvbihrZXksIG9wdGlvbikge1xuICAgICAgICBpZiAob3B0aW9uLnBhdGggJiYgIW9wdGlvbi5vbmNoYW5nZSAmJiAhdGhpcy5lZGl0b3IuJG9wdGlvbnNbb3B0aW9uLnBhdGhdKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgcGF0aCA9IEFycmF5LmlzQXJyYXkob3B0aW9uKSA/IG9wdGlvblswXS5wYXRoIDogb3B0aW9uLnBhdGg7XG4gICAgICAgIHRoaXMub3B0aW9uc1twYXRoXSA9IG9wdGlvbjtcbiAgICAgICAgdmFyIHNhZmVLZXkgPSBcIi1cIiArIHBhdGg7XG4gICAgICAgIHZhciBzYWZlSWQgPSBwYXRoICsgXCItbGFiZWxcIjtcbiAgICAgICAgdmFyIGNvbnRyb2wgPSB0aGlzLnJlbmRlck9wdGlvbkNvbnRyb2woc2FmZUtleSwgb3B0aW9uKTtcbiAgICAgICAgcmV0dXJuIFtcInRyXCIsIHtjbGFzczogXCJhY2Vfb3B0aW9uc01lbnVFbnRyeVwifSwgW1widGRcIixcbiAgICAgICAgICAgIFtcImxhYmVsXCIsIHtmb3I6IHNhZmVLZXksIGlkOiBzYWZlSWR9LCBrZXldXG4gICAgICAgIF0sIFtcInRkXCIsIGNvbnRyb2xdXTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZyB8IG51bWJlciB8IE9iamVjdH0gb3B0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmcgfCBudW1iZXIgfCBib29sZWFufSB2YWx1ZVxuICAgICAqL1xuICAgIHNldE9wdGlvbihvcHRpb24sIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb3B0aW9uID09IFwic3RyaW5nXCIpXG4gICAgICAgICAgICBvcHRpb24gPSB0aGlzLm9wdGlvbnNbb3B0aW9uXTtcbiAgICAgICAgaWYgKHZhbHVlID09IFwiZmFsc2VcIikgdmFsdWUgPSBmYWxzZTtcbiAgICAgICAgaWYgKHZhbHVlID09IFwidHJ1ZVwiKSB2YWx1ZSA9IHRydWU7XG4gICAgICAgIGlmICh2YWx1ZSA9PSBcIm51bGxcIikgdmFsdWUgPSBudWxsO1xuICAgICAgICBpZiAodmFsdWUgPT0gXCJ1bmRlZmluZWRcIikgdmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gXCJzdHJpbmdcIiAmJiBwYXJzZUZsb2F0KHZhbHVlKS50b1N0cmluZygpID09IHZhbHVlKVxuICAgICAgICAgICAgdmFsdWUgPSBwYXJzZUZsb2F0KHZhbHVlKTtcbiAgICAgICAgaWYgKG9wdGlvbi5vbmNoYW5nZSlcbiAgICAgICAgICAgIG9wdGlvbi5vbmNoYW5nZSh2YWx1ZSk7XG4gICAgICAgIGVsc2UgaWYgKG9wdGlvbi5wYXRoKVxuICAgICAgICAgICAgdGhpcy5lZGl0b3Iuc2V0T3B0aW9uKG9wdGlvbi5wYXRoLCB2YWx1ZSk7XG4gICAgICAgIHRoaXMuX3NpZ25hbChcInNldE9wdGlvblwiLCB7bmFtZTogb3B0aW9uLnBhdGgsIHZhbHVlOiB2YWx1ZX0pO1xuICAgIH1cbiAgICBcbiAgICBnZXRPcHRpb24ob3B0aW9uKSB7XG4gICAgICAgIGlmIChvcHRpb24uZ2V0VmFsdWUpXG4gICAgICAgICAgICByZXR1cm4gb3B0aW9uLmdldFZhbHVlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRvci5nZXRPcHRpb24ob3B0aW9uLnBhdGgpO1xuICAgIH1cbn1cbm9vcC5pbXBsZW1lbnQoT3B0aW9uUGFuZWwucHJvdG90eXBlLCBFdmVudEVtaXR0ZXIpO1xuXG5leHBvcnRzLk9wdGlvblBhbmVsID0gT3B0aW9uUGFuZWw7XG5leHBvcnRzLm9wdGlvbkdyb3VwcyA9IG9wdGlvbkdyb3VwcztcbiIsIi8qKlxuICogIyMgSW50ZXJhY3RpdmUgU2V0dGluZ3MgTWVudSBFeHRlbnNpb25cbiAqXG4gKiBQcm92aWRlcyBzZXR0aW5ncyBpbnRlcmZhY2UgZm9yIHRoZSBBY2UgZWRpdG9yIHRoYXQgZGlzcGxheXMgZHluYW1pY2FsbHkgZ2VuZXJhdGVkIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyBiYXNlZCBvblxuICogdGhlIGN1cnJlbnQgZWRpdG9yIHN0YXRlLiBUaGUgbWVudSBhcHBlYXJzIGFzIGFuIG92ZXJsYXkgcGFuZWwgYWxsb3dpbmcgdXNlcnMgdG8gbW9kaWZ5IGVkaXRvciBvcHRpb25zLCB0aGVtZXMsXG4gKiBtb2RlcywgYW5kIG90aGVyIHNldHRpbmdzIHRocm91Z2ggYW4gaW50dWl0aXZlIGdyYXBoaWNhbCBpbnRlcmZhY2UuXG4gKlxuICogKipVc2FnZToqKlxuICogYGBgamF2YXNjcmlwdFxuICogZWRpdG9yLnNob3dTZXR0aW5nc01lbnUoKTtcbiAqIGBgYFxuICpcbiAqIFRoZSBleHRlbnNpb24gYXV0b21hdGljYWxseSByZWdpc3RlcnMgdGhlIGBzaG93U2V0dGluZ3NNZW51YCBjb21tYW5kIGFuZCBtZXRob2RcbiAqIG9uIHRoZSBlZGl0b3IgaW5zdGFuY2Ugd2hlbiBpbml0aWFsaXplZC5cbiAqXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICpcbiAqIEBtb2R1bGVcbiAqL1xuXG4vKmpzbGludCBpbmRlbnQ6IDQsIG1heGVycjogNTAsIHdoaXRlOiB0cnVlLCBicm93c2VyOiB0cnVlLCB2YXJzOiB0cnVlKi9cbi8qZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSAqL1xuXG5cInVzZSBzdHJpY3RcIjtcbnZhciBPcHRpb25QYW5lbCA9IHJlcXVpcmUoXCIuL29wdGlvbnNcIikuT3B0aW9uUGFuZWw7XG52YXIgb3ZlcmxheVBhZ2UgPSByZXF1aXJlKCcuL21lbnVfdG9vbHMvb3ZlcmxheV9wYWdlJykub3ZlcmxheVBhZ2U7XG5cbi8qKlxuICogVGhpcyBkaXNwbGF5cyB0aGUgc2V0dGluZ3MgbWVudSBpZiBpdCBpcyBub3QgYWxyZWFkeSBiZWluZyBzaG93bi5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAcGFyYW0ge2ltcG9ydChcIi4uL2VkaXRvclwiKS5FZGl0b3J9IGVkaXRvciBBbiBpbnN0YW5jZSBvZiB0aGUgYWNlIGVkaXRvci5cbiAqL1xuZnVuY3Rpb24gc2hvd1NldHRpbmdzTWVudShlZGl0b3IpIHtcbiAgICAvLyBzaG93IGlmIHRoZSBtZW51IGlzbid0IG9wZW4gYWxyZWFkeS5cbiAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhY2Vfc2V0dGluZ3NtZW51JykpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBuZXcgT3B0aW9uUGFuZWwoZWRpdG9yKTtcbiAgICAgICAgb3B0aW9ucy5yZW5kZXIoKTtcbiAgICAgICAgb3B0aW9ucy5jb250YWluZXIuaWQgPSBcImFjZV9zZXR0aW5nc21lbnVcIjtcbiAgICAgICAgb3ZlcmxheVBhZ2UoZWRpdG9yLCBvcHRpb25zLmNvbnRhaW5lcik7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgb3B0aW9ucy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcInNlbGVjdCxpbnB1dCxidXR0b24sY2hlY2tib3hcIikuZm9jdXMoKTtcbiAgICB9XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZXMgdGhlIHNldHRpbmdzIG1lbnUgZXh0ZW5zaW9uLiBJdCBhZGRzIHRoZSBzaG93U2V0dGluZ3NNZW51XG4gKiAgbWV0aG9kIHRvIHRoZSBnaXZlbiBlZGl0b3Igb2JqZWN0IGFuZCBhZGRzIHRoZSBzaG93U2V0dGluZ3NNZW51IGNvbW1hbmRcbiAqICB0byB0aGUgZWRpdG9yIHdpdGggYXBwcm9wcmlhdGUga2V5Ym9hcmQgc2hvcnRjdXRzLlxuICovXG5tb2R1bGUuZXhwb3J0cy5pbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIEVkaXRvciA9IHJlcXVpcmUoXCIuLi9lZGl0b3JcIikuRWRpdG9yO1xuICAgIEVkaXRvci5wcm90b3R5cGUuc2hvd1NldHRpbmdzTWVudSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBzaG93U2V0dGluZ3NNZW51KHRoaXMpO1xuICAgIH07XG59O1xuIiwiLyoqXG4gKiAjIyBUaGVtZSBlbnVtZXJhdGlvbiB1dGlsaXR5XG4gKlxuICogUHJvdmlkZXMgdGhlbWUgbWFuYWdlbWVudCBmb3IgdGhlIEFjZSBFZGl0b3IgYnkgZ2VuZXJhdGluZyBhbmQgb3JnYW5pemluZyBhdmFpbGFibGUgdGhlbWVzIGludG9cbiAqIGNhdGVnb3JpemVkIGNvbGxlY3Rpb25zLiBBdXRvbWF0aWNhbGx5IG1hcHMgdGhlbWUgZGF0YSBpbnRvIHN0cnVjdHVyZWQgb2JqZWN0cyBjb250YWluaW5nIHRoZW1lIG1ldGFkYXRhIGluY2x1ZGluZ1xuICogZGlzcGxheSBjYXB0aW9ucywgdGhlbWUgcGF0aHMsIGJyaWdodG5lc3MgY2xhc3NpZmljYXRpb24gKGRhcmsvbGlnaHQpLCBhbmQgbm9ybWFsaXplZCBuYW1lcy4gRXhwb3J0cyBib3RoIGFuXG4gKiBpbmRleGVkIHRoZW1lIGNvbGxlY3Rpb24gYW5kIGEgY29tcGxldGUgdGhlbWVzIGFycmF5IGZvciBlYXN5IGludGVncmF0aW9uIHdpdGggdGhlbWUgc2VsZWN0aW9uIGNvbXBvbmVudHNcbiAqIGFuZCBjb25maWd1cmF0aW9uIHN5c3RlbXMuXG4gKlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqIEBtb2R1bGVcbiAqL1xuLyoqXG4gKiBHZW5lcmF0ZXMgYSBsaXN0IG9mIHRoZW1lcyBhdmFpbGFibGUgd2hlbiBhY2Ugd2FzIGJ1aWx0LlxuICogQGZpbGVPdmVydmlldyBHZW5lcmF0ZXMgYSBsaXN0IG9mIHRoZW1lcyBhdmFpbGFibGUgd2hlbiBhY2Ugd2FzIGJ1aWx0LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBUaGVtZVxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNhcHRpb24gLSBUaGUgZGlzcGxheSBjYXB0aW9uIG9mIHRoZSB0aGVtZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0aGVtZSAgIC0gVGhlIHBhdGggb3IgaWRlbnRpZmllciBmb3IgdGhlIEFDRSB0aGVtZS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNEYXJrIC0gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHRoZW1lIGlzIGRhcmsgb3IgbGlnaHQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbmFtZSAgICAtIFRoZSBub3JtYWxpemVkIG5hbWUgdXNlZCBhcyB0aGUga2V5LlxuICovXG5cbnZhciB0aGVtZURhdGEgPSBbXG4gICAgW1wiQ2hyb21lXCIgICAgICAgICBdLFxuICAgIFtcIkNsb3Vkc1wiICAgICAgICAgXSxcbiAgICBbXCJDcmltc29uIEVkaXRvclwiIF0sXG4gICAgW1wiRGF3blwiICAgICAgICAgICBdLFxuICAgIFtcIkRyZWFtd2VhdmVyXCIgICAgXSxcbiAgICBbXCJFY2xpcHNlXCIgICAgICAgIF0sXG4gICAgW1wiR2l0SHViIExpZ2h0IERlZmF1bHRcIiBdLFxuICAgIFtcIkdpdEh1YiAoTGVnYWN5KVwiICAgICAgLFwiZ2l0aHViXCIgICAgICAgICAgICAgICAgICAsIFwibGlnaHRcIl0sXG4gICAgW1wiSVBsYXN0aWNcIiAgICAgICBdLFxuICAgIFtcIlNvbGFyaXplZCBMaWdodFwiXSxcbiAgICBbXCJUZXh0TWF0ZVwiICAgICAgIF0sXG4gICAgW1wiVG9tb3Jyb3dcIiAgICAgICBdLFxuICAgIFtcIlhDb2RlXCIgICAgICAgICAgXSxcbiAgICBbXCJLdXJvaXJcIl0sXG4gICAgW1wiS2F0emVuTWlsY2hcIl0sXG4gICAgW1wiU1FMIFNlcnZlclwiICAgICAgICAgICAsXCJzcWxzZXJ2ZXJcIiAgICAgICAgICAgICAgICwgXCJsaWdodFwiXSxcbiAgICBbXCJDbG91ZEVkaXRvclwiICAgICAgICAgICxcImNsb3VkX2VkaXRvclwiICAgICAgICAgICAgLCBcImxpZ2h0XCJdLFxuICAgIFtcIkFtYmlhbmNlXCIgICAgICAgICAgICAgLFwiYW1iaWFuY2VcIiAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiQ2hhb3NcIiAgICAgICAgICAgICAgICAsXCJjaGFvc1wiICAgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJDbG91ZHMgTWlkbmlnaHRcIiAgICAgICxcImNsb3Vkc19taWRuaWdodFwiICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkRyYWN1bGFcIiAgICAgICAgICAgICAgLFwiXCIgICAgICAgICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiQ29iYWx0XCIgICAgICAgICAgICAgICAsXCJjb2JhbHRcIiAgICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJHcnV2Ym94XCIgICAgICAgICAgICAgICxcImdydXZib3hcIiAgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkdyZWVuIG9uIEJsYWNrXCIgICAgICAgLFwiZ29iXCIgICAgICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiaWRsZSBGaW5nZXJzXCIgICAgICAgICAsXCJpZGxlX2ZpbmdlcnNcIiAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJrclRoZW1lXCIgICAgICAgICAgICAgICxcImtyX3RoZW1lXCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk1lcmJpdm9yZVwiICAgICAgICAgICAgLFwibWVyYml2b3JlXCIgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiTWVyYml2b3JlIFNvZnRcIiAgICAgICAsXCJtZXJiaXZvcmVfc29mdFwiICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJNb25vIEluZHVzdHJpYWxcIiAgICAgICxcIm1vbm9faW5kdXN0cmlhbFwiICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIk1vbm9rYWlcIiAgICAgICAgICAgICAgLFwibW9ub2thaVwiICAgICAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiTm9yZCBEYXJrXCIgICAgICAgICAgICAsXCJub3JkX2RhcmtcIiAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJPbmUgRGFya1wiICAgICAgICAgICAgICxcIm9uZV9kYXJrXCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlBhc3RlbCBvbiBkYXJrXCIgICAgICAgLFwicGFzdGVsX29uX2RhcmtcIiAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiU29sYXJpemVkIERhcmtcIiAgICAgICAsXCJzb2xhcml6ZWRfZGFya1wiICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUZXJtaW5hbFwiICAgICAgICAgICAgICxcInRlcm1pbmFsXCIgICAgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlRvbW9ycm93IE5pZ2h0XCIgICAgICAgLFwidG9tb3Jyb3dfbmlnaHRcIiAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiVG9tb3Jyb3cgTmlnaHQgQmx1ZVwiICAsXCJ0b21vcnJvd19uaWdodF9ibHVlXCIgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJUb21vcnJvdyBOaWdodCBCcmlnaHRcIixcInRvbW9ycm93X25pZ2h0X2JyaWdodFwiICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIlRvbW9ycm93IE5pZ2h0IDgwc1wiICAgLFwidG9tb3Jyb3dfbmlnaHRfZWlnaHRpZXNcIiAsICBcImRhcmtcIl0sXG4gICAgW1wiVHdpbGlnaHRcIiAgICAgICAgICAgICAsXCJ0d2lsaWdodFwiICAgICAgICAgICAgICAgICwgIFwiZGFya1wiXSxcbiAgICBbXCJWaWJyYW50IElua1wiICAgICAgICAgICxcInZpYnJhbnRfaW5rXCIgICAgICAgICAgICAgLCAgXCJkYXJrXCJdLFxuICAgIFtcIkdpdEh1YiBEYXJrXCIgICAgICAgICAgLFwiZ2l0aHViX2RhcmtcIiAgICAgICAgICAgICAsICBcImRhcmtcIl0sXG4gICAgW1wiQ2xvdWRFZGl0b3IgRGFya1wiICAgICAsXCJjbG91ZF9lZGl0b3JfZGFya1wiICAgICAgICwgIFwiZGFya1wiXVxuXTtcblxuLyoqXG4gKiBAdHlwZSB7T2JqZWN0PHN0cmluZywgVGhlbWU+fVxuICovXG5leHBvcnRzLnRoZW1lc0J5TmFtZSA9IHt9O1xuXG4vKipcbiAqIEFuIGFycmF5IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgYXZhaWxhYmxlIHRoZW1lcy5cbiAqIEB0eXBlIHtUaGVtZVtdfVxuICovXG5leHBvcnRzLnRoZW1lcyA9IHRoZW1lRGF0YS5tYXAoZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciBuYW1lID0gZGF0YVsxXSB8fCBkYXRhWzBdLnJlcGxhY2UoLyAvZywgXCJfXCIpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIHRoZW1lID0ge1xuICAgICAgICBjYXB0aW9uOiBkYXRhWzBdLFxuICAgICAgICB0aGVtZTogXCJhY2UvdGhlbWUvXCIgKyBuYW1lLFxuICAgICAgICBpc0Rhcms6IGRhdGFbMl0gPT0gXCJkYXJrXCIsXG4gICAgICAgIG5hbWU6IG5hbWVcbiAgICB9O1xuICAgIGV4cG9ydHMudGhlbWVzQnlOYW1lW25hbWVdID0gdGhlbWU7XG4gICAgcmV0dXJuIHRoZW1lO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=