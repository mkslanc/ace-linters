(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1085,1772],{

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

/***/ 71085:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * ## User Input Prompt extension
 *
 * Provides customizable modal prompts for gathering user input with support for autocompletion, validation, and
 * specialized input types. Includes built-in prompt types for navigation (goto line), command palette, and mode
 * selection, with extensible architecture for custom prompt implementations.
 *
 * **Built-in Prompt Types:**
 * - `gotoLine`: Navigate to specific line numbers with selection support
 * - `commands`: Command palette with searchable editor commands and shortcuts
 * - `modes`: Language mode selector with filtering capabilities
 *
 * **Usage:**
 * ```javascript
 * // Basic prompt
 * prompt(editor, "Default value", {
 *   placeholder: "Enter text...",
 *   onAccept: (data) => console.log(data.value)
 * });
 *
 * // Built-in prompts
 * prompt.gotoLine(editor);
 * prompt.commands(editor);
 * prompt.modes(editor);
 * ```
 *
 * @module
 */

/**
 * @typedef {import("../editor").Editor} Editor
 */



var nls = (__webpack_require__(76321).nls);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var dom = __webpack_require__(71435);
var FilteredList= (__webpack_require__(26347)/* .FilteredList */ .C3);
var AcePopup = (__webpack_require__(51826).AcePopup);
var $singleLineEditor = (__webpack_require__(51826).$singleLineEditor);
var UndoManager = (__webpack_require__(79870)/* .UndoManager */ .a);
var Tokenizer = (__webpack_require__(32934).Tokenizer);
var overlayPage = (__webpack_require__(24809).overlayPage);
var modelist = __webpack_require__(91772);
var openPrompt;

/**
 * @typedef PromptOptions
 * @property {String} name             Prompt name.
 * @property {String} $type            Use prompt of specific type (gotoLine|commands|modes or default if empty).
 * @property {[number, number]} selection  Defines which part of the predefined value should be highlighted.
 * @property {Boolean} hasDescription  Set to true if prompt has description below input box.
 * @property {String} prompt           Description below input box.
 * @property {String} placeholder      Placeholder for value.
 * @property {Object} $rules           Specific rules for input like password or regexp.
 * @property {Boolean} ignoreFocusOut  Set to true to keep the prompt open when focus moves to another part of the editor.
 * @property {Function} getCompletions Function for defining list of options for value.
 * @property {Function} getPrefix      Function for defining current value prefix.
 * @property {Function} onAccept       Function called when Enter is pressed.
 * @property {Function} onInput        Function called when input is added to prompt input box.
 * @property {Function} onCancel       Function called when Esc|Shift-Esc is pressed.
 * @property {Function} history        Function for defining history list.
 * @property {number} maxHistoryCount
 * @property {Function} addToHistory
 */

/**
 * Prompt plugin is used for getting input from user.
 *
 * @param {Editor} editor                   Ouside editor related to this prompt. Will be blurred when prompt is open.
 * @param {String | Partial<PromptOptions>} message                  Predefined value of prompt input box.
 * @param {Partial<PromptOptions>} options                  Cusomizable options for this prompt.
 * @param {Function} [callback]               Function called after done.
 * */
function prompt(editor, message, options, callback) {
    if (typeof message == "object") {
        // @ts-ignore
        return prompt(editor, "", message, options);
    }
    if (openPrompt) {
        var lastPrompt = openPrompt;
        editor = lastPrompt.editor;
        lastPrompt.close();
        if (lastPrompt.name && lastPrompt.name == options.name)
            return;
    }
    if (options.$type)
       return prompt[options.$type](editor, callback);

    var cmdLine = $singleLineEditor();
    cmdLine.session.setUndoManager(new UndoManager());

    /**@type {any}*/
    var el = dom.buildDom(["div", {class: "ace_prompt_container" + (options.hasDescription ? " input-box-with-description" : "")}]);
    var overlay = overlayPage(editor, el, done);
    el.appendChild(cmdLine.container);

    if (editor) {
        editor.cmdLine = cmdLine;
        cmdLine.setOption("fontSize", editor.getOption("fontSize"));
    }
    if (message) {
        cmdLine.setValue(message, 1);
    }
    if (options.selection) {
        cmdLine.selection.setRange({
            start: cmdLine.session.doc.indexToPosition(options.selection[0]),
            end: cmdLine.session.doc.indexToPosition(options.selection[1])
        });
    }

    if (options.getCompletions) {
        var popup = new AcePopup();
        popup.renderer.setStyle("ace_autocomplete_inline");
        popup.container.style.display = "block";
        popup.container.style.maxWidth = "600px";
        popup.container.style.width = "100%";
        popup.container.style.marginTop = "3px";
        popup.renderer.setScrollMargin(2, 2, 0, 0);
        popup.autoSelect = false;
        popup.renderer.$maxLines = 15;
        popup.setRow(-1);
        popup.on("click", function(e) {
            var data = popup.getData(popup.getRow());
            if (!data["error"]) {
                cmdLine.setValue(data.value || data["name"] || data);
                accept();
                e.stop();
            }
        });
        el.appendChild(popup.container);
        updateCompletions();
    }

    if (options.$rules) {
        var tokenizer = new Tokenizer(options.$rules);
        cmdLine.session.bgTokenizer.setTokenizer(tokenizer);
    }

    if (options.placeholder) {
        cmdLine.setOption("placeholder", options.placeholder);
    }

    if (options.hasDescription) {
        /**@type {any}*/
        var promptTextContainer = dom.buildDom(["div", {class: "ace_prompt_text_container"}]);
        dom.buildDom(options.prompt || "Press 'Enter' to confirm or 'Escape' to cancel", promptTextContainer);
        el.appendChild(promptTextContainer);
    }

    overlay.setIgnoreFocusOut(options.ignoreFocusOut);

    function accept() {
        var val;
        if (popup && popup.getCursorPosition().row > 0) {
            val = valueFromRecentList();
        } else {
            val = cmdLine.getValue();
        }
        var curData = popup ? popup.getData(popup.getRow()) : val;
        if (curData && !curData["error"]) {
            done();
            options.onAccept && options.onAccept({
                value: val,
                item: curData
            }, cmdLine);
        }
    }

    var keys = {
        "Enter": accept,
        "Esc|Shift-Esc": function() {
            options.onCancel && options.onCancel(cmdLine.getValue(), cmdLine);
            done();
        }
    };

    if (popup) {
        Object.assign(keys, {
            "Up": function(editor) { popup.goTo("up"); valueFromRecentList();},
            "Down": function(editor) { popup.goTo("down"); valueFromRecentList();},
            "Ctrl-Up|Ctrl-Home": function(editor) { popup.goTo("start"); valueFromRecentList();},
            "Ctrl-Down|Ctrl-End": function(editor) { popup.goTo("end"); valueFromRecentList();},
            "Tab": function(editor) {
                popup.goTo("down"); valueFromRecentList();
            },
            "PageUp": function(editor) { popup.gotoPageUp(); valueFromRecentList();},
            "PageDown": function(editor) { popup.gotoPageDown(); valueFromRecentList();}
        });
    }

    cmdLine.commands.bindKeys(keys);

    function done() {
        overlay.close();
        callback && callback();
        openPrompt = null;
    }

    cmdLine.on("input", function() {
        options.onInput && options.onInput();
        updateCompletions();
    });

    function updateCompletions() {
        if (options.getCompletions) {
            var prefix;
            if (options.getPrefix) {
                prefix = options.getPrefix(cmdLine);
            }

            var completions = options.getCompletions(cmdLine);
            popup.setData(completions, prefix);
            popup.resize(true);
        }
    }

    function valueFromRecentList() {
        var current = popup.getData(popup.getRow());
        if (current && !current["error"])
            return current.value || current.caption || current;
    }

    cmdLine.resize(true);
    if (popup) {
        popup.resize(true);
    }
    cmdLine.focus();

    openPrompt = {
        close: done,
        name: options.name,
        editor: editor
    };
}

/**
 * Displays a "Go to Line" prompt for navigating to specific line and column positions with selection support.
 *
 * @param {Editor} editor - The editor instance to navigate within
 * @param {Function} [callback]
 */
prompt.gotoLine = function(editor, callback) {
    function stringifySelection(selection) {
        if (!Array.isArray(selection))
            selection = [selection];
        return selection.map(function(r) {
            var cursor = r.isBackwards ? r.start: r.end;
            var anchor = r.isBackwards ? r.end: r.start;
            var row = anchor.row;
            var s = (row + 1) + ":" + anchor.column;

            if (anchor.row == cursor.row) {
                if (anchor.column != cursor.column)
                    s += ">" + ":" + cursor.column;
            } else {
                s += ">" + (cursor.row + 1) + ":" + cursor.column;
            }
            return s;
        }).reverse().join(", ");
    }

    prompt(editor, ":" + stringifySelection(editor.selection.toJSON()), {
        name: "gotoLine",
        selection: [1, Number.MAX_VALUE],
        onAccept: function(data) {
            var value = data.value;
            var _history = prompt.gotoLine["_history"];
            if (!_history)
                prompt.gotoLine["_history"] = _history = [];
            if (_history.indexOf(value) != -1)
                _history.splice(_history.indexOf(value), 1);
            _history.unshift(value);
            if (_history.length > 20) _history.length = 20;
            
            
            var pos = editor.getCursorPosition();
            var ranges = [];
            value.replace(/^:/, "").split(/,/).map(function(str) {
                var parts = str.split(/([<>:+-]|c?\d+)|[^c\d<>:+-]+/).filter(Boolean);
                var i = 0;
                function readPosition() {
                    var c = parts[i++];
                    if (!c) return;
                    if (c[0] == "c") {
                        var index = parseInt(c.slice(1)) || 0;
                        return editor.session.doc.indexToPosition(index);
                    }
                    var row = pos.row;
                    var column = 0;
                    if (/\d/.test(c)) {
                        row = parseInt(c) - 1;
                        c = parts[i++];
                    }
                    if (c == ":") {
                        c = parts[i++];
                        if (/\d/.test(c)) {
                            column = parseInt(c) || 0;
                        }
                    }
                    return {row: row, column: column};
                }
                pos = readPosition();
                var range = Range.fromPoints(pos, pos);
                if (parts[i] == ">") {
                    i++;
                    range.end = readPosition();
                }
                else if (parts[i] == "<") {
                    i++;
                    range.start = readPosition();
                }
                ranges.unshift(range);
            });
            editor.selection.fromJSON(ranges);
            var scrollTop = editor.renderer.scrollTop;
            editor.renderer.scrollSelectionIntoView(
                editor.selection.anchor, 
                editor.selection.cursor, 
                0.5
            );
            editor.renderer.animateScrolling(scrollTop);
        },
        history: function() {
            if (!prompt.gotoLine["_history"])
                return [];
            return prompt.gotoLine["_history"];

        },
        getCompletions: function(cmdLine) {
            var value = cmdLine.getValue();
            var m = value.replace(/^:/, "").split(":");
            var row = Math.min(parseInt(m[0]) || 1, editor.session.getLength()) - 1;
            var line = editor.session.getLine(row);
            var current = value + "  " + line;
            return [current].concat(this.history());
        },
        $rules: {
            start: [{
                regex: /\d+/,
                token: "string"
            }, {
                regex: /[:,><+\-c]/,
                token: "keyword"
            }]
        }
    });
};

/**
 * Displays a searchable command palette for executing editor commands with keyboard shortcuts and history.
 *
 * @param {Editor} editor - The editor instance to execute commands on
 * @param {Function} [callback]
 */
prompt.commands = function(editor, callback) {
    function normalizeName(name) {
        return (name || "").replace(/^./, function(x) {
            return x.toUpperCase(x);
        }).replace(/[a-z][A-Z]/g, function(x) {
            return x[0] + " " + x[1].toLowerCase(x);
        });
    }
    function getEditorCommandsByName(excludeCommands) {
        var commandsByName = [];
        var commandMap = {};
        editor.keyBinding.$handlers.forEach(function(handler) {
            var platform = handler["platform"];
            var cbn = handler["byName"];
            for (var i in cbn) {
                var key = cbn[i].bindKey;
                if (typeof key !== "string") {
                    key = key && key[platform] || "";
                }
                var commands = cbn[i];
                var description = commands.description || normalizeName(commands.name);
                if (!Array.isArray(commands))
                    commands = [commands];
                commands.forEach(function(command) {
                    if (typeof command != "string")
                        command = command.name;
                    var needle = excludeCommands.find(function(el) {
                        return el === command;
                    });
                    if (!needle) {
                        if (commandMap[command]) {
                            commandMap[command].key += "|" + key;
                        } else {
                            commandMap[command] = {key: key, command: command, description: description};
                            commandsByName.push(commandMap[command]);
                        }
                    }
                });
            }
        });
        return commandsByName;
    }
    // exclude commands that can not be executed without args
    var excludeCommandsList = ["insertstring", "inserttext", "setIndentation", "paste"];
    var shortcutsArray = getEditorCommandsByName(excludeCommandsList);
    shortcutsArray = shortcutsArray.map(function(item) {
        return {value: item.description, meta: item.key, command: item.command};
    });
    prompt(editor, "",  {
        name: "commands",
        selection: [0, Number.MAX_VALUE],
        maxHistoryCount: 5,
        onAccept: function(data) {
            if (data.item) {
                var commandName = data.item.command;
                this.addToHistory(data.item);

                editor.execCommand(commandName);
            }
        },
        addToHistory: function(item) {
            var history = this.history();
            history.unshift(item);
            delete item.message;
            for (var i = 1; i < history.length; i++) {
                if (history[i]["command"] == item.command ) {
                    history.splice(i, 1);
                    break;
                }
            }
            if (this.maxHistoryCount > 0 && history.length > this.maxHistoryCount) {
                history.splice(history.length - 1, 1);
            }
            prompt.commands["history"] = history;
        },
        history: function() {
            return prompt.commands["history"] || [];
        },
        getPrefix: function(cmdLine) {
            var currentPos = cmdLine.getCursorPosition();
            var filterValue = cmdLine.getValue();
            return filterValue.substring(0, currentPos.column);
        },
        getCompletions: function(cmdLine) {
            function getFilteredCompletions(commands, prefix) {
                var resultCommands = JSON.parse(JSON.stringify(commands));

                var filtered = new FilteredList(resultCommands);
                return filtered.filterCompletions(resultCommands, prefix);
            }

            function getUniqueCommandList(commands, usedCommands) {
                if (!usedCommands || !usedCommands.length) {
                    return commands;
                }
                var excludeCommands = [];
                usedCommands.forEach(function(item) {
                    excludeCommands.push(item.command);
                });

                var resultCommands = [];

                commands.forEach(function(item) {
                    if (excludeCommands.indexOf(item.command) === -1) {
                        resultCommands.push(item);
                    }
                });

                return resultCommands;
            }

            var prefix = this.getPrefix(cmdLine);
            var recentlyUsedCommands = getFilteredCompletions(this.history(), prefix);
            var otherCommands = getUniqueCommandList(shortcutsArray, recentlyUsedCommands);
            otherCommands = getFilteredCompletions(otherCommands, prefix);

            if (recentlyUsedCommands.length && otherCommands.length) {
                recentlyUsedCommands[0].message = nls("prompt.recently-used", "Recently used");
                otherCommands[0].message = nls("prompt.other-commands", "Other commands");
            }

            var completions = recentlyUsedCommands.concat(otherCommands);
            return completions.length > 0 ? completions : [{
                value: nls("prompt.no-matching-commands", "No matching commands"),
                error: 1
            }];
        }
    });
};

/**
 * Shows an interactive prompt containing all available syntax highlighting modes
 * that can be applied to the editor session. Users can type to filter through the modes list
 * and select one to change the editor's syntax highlighting mode. The prompt includes real-time
 * filtering based on mode names and captions.
 *
 * @param {Editor} editor - The editor instance to change the language mode for
 * @param {Function} [callback]
 */

prompt.modes = function(editor, callback) {
    /**@type {any[]}*/
    var modesArray = modelist.modes;
    modesArray = modesArray.map(function(item) {
        return {value: item.caption, mode: item.name};
    });
    prompt(editor, "",  {
        name: "modes",
        selection: [0, Number.MAX_VALUE],
        onAccept: function(data) {
            if (data.item) {
                var modeName = "ace/mode/" + data.item.mode;
                editor.session.setMode(modeName);
            }
        },
        getPrefix: function(cmdLine) {
            var currentPos = cmdLine.getCursorPosition();
            var filterValue = cmdLine.getValue();
            return filterValue.substring(0, currentPos.column);
        },
        getCompletions: function(cmdLine) {
            function getFilteredCompletions(modes, prefix) {
                var resultCommands = JSON.parse(JSON.stringify(modes));

                var filtered = new FilteredList(resultCommands);
                return filtered.filterCompletions(resultCommands, prefix);
            }

            var prefix = this.getPrefix(cmdLine);
            var completions = getFilteredCompletions(modesArray, prefix);
            return completions.length > 0 ? completions : [{
                "caption": "No mode matching",
                "value": "No mode matching",
                "error": 1
            }];
        }
    });
};

dom.importCssString(`.ace_prompt_container {
    max-width: 603px;
    width: 100%;
    margin: 20px auto;
    padding: 3px;
    background: white;
    border-radius: 2px;
    box-shadow: 0px 2px 3px 0px #555;
}`, "promtp.css", false);


exports.prompt = prompt;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCO0FBQ3RCLGFBQWE7QUFDYixtQkFBbUI7Ozs7Ozs7O0FDL1NuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsb0JBQW9CO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFVBQVU7QUFDckI7O0FBRUE7QUFDQSxjQUFjLE1BQU07QUFDcEI7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7O0FBR0QsY0FBYyIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tZW51X3Rvb2xzL292ZXJsYXlfcGFnZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvbWVudV90b29scy9zZXR0aW5nc19tZW51LmNzcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvbW9kZWxpc3QuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L3Byb21wdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqICMjIE92ZXJsYXkgUGFnZSB1dGlsaXR5XG4gKlxuICogUHJvdmlkZXMgbW9kYWwgb3ZlcmxheSBmdW5jdGlvbmFsaXR5IGZvciBkaXNwbGF5aW5nIGVkaXRvciBleHRlbnNpb24gaW50ZXJmYWNlcy4gQ3JlYXRlcyBhIGZ1bGwtc2NyZWVuIG92ZXJsYXkgd2l0aFxuICogY29uZmlndXJhYmxlIGJhY2tkcm9wIGJlaGF2aW9yLCBrZXlib2FyZCBuYXZpZ2F0aW9uIChFU0MgdG8gY2xvc2UpLCBhbmQgZm9jdXMgbWFuYWdlbWVudC4gVXNlZCBieSB2YXJpb3VzIGV4dGVuc2lvbnNcbiAqIHRvIGRpc3BsYXkgbWVudXMsIHNldHRpbmdzIHBhbmVscywgYW5kIG90aGVyIGludGVyYWN0aXZlIGNvbnRlbnQgb3ZlciB0aGUgZWRpdG9yIGludGVyZmFjZS5cbiAqXG4gKiAqKlVzYWdlOioqXG4gKiBgYGBqYXZhc2NyaXB0XG4gKiB2YXIgb3ZlcmxheVBhZ2UgPSByZXF1aXJlKCcuL292ZXJsYXlfcGFnZScpLm92ZXJsYXlQYWdlO1xuICogdmFyIGNvbnRlbnRFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gKiBjb250ZW50RWxlbWVudC5pbm5lckhUTUwgPSAnPGgxPlNldHRpbmdzPC9oMT4nO1xuICpcbiAqIHZhciBvdmVybGF5ID0gb3ZlcmxheVBhZ2UoZWRpdG9yLCBjb250ZW50RWxlbWVudCwgZnVuY3Rpb24oKSB7XG4gKiAgIGNvbnNvbGUubG9nKCdPdmVybGF5IGNsb3NlZCcpO1xuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBAbW9kdWxlXG4gKi9cblxuXG4vKmpzbGludCBpbmRlbnQ6IDQsIG1heGVycjogNTAsIHdoaXRlOiB0cnVlLCBicm93c2VyOiB0cnVlLCB2YXJzOiB0cnVlKi9cbi8qZ2xvYmFsIGRlZmluZSwgcmVxdWlyZSAqL1xuXG4ndXNlIHN0cmljdCc7XG52YXIgZG9tID0gcmVxdWlyZShcIi4uLy4uL2xpYi9kb21cIik7XG52YXIgY3NzVGV4dCA9IHJlcXVpcmUoXCIuL3NldHRpbmdzX21lbnUuY3NzXCIpO1xuZG9tLmltcG9ydENzc1N0cmluZyhjc3NUZXh0LCBcInNldHRpbmdzX21lbnUuY3NzXCIsIGZhbHNlKTtcblxuLyoqXG4gKiBHZW5lcmF0ZXMgYW4gb3ZlcmxheSBmb3IgZGlzcGxheWluZyBtZW51cy4gVGhlIG92ZXJsYXkgaXMgYW4gYWJzb2x1dGVseVxuICogIHBvc2l0aW9uZWQgZGl2LlxuICogQGF1dGhvciA8YSBocmVmPVwibWFpbHRvOm1hdHRoZXdrYXN0b3JAZ21haWwuY29tXCI+XG4gKiAgTWF0dGhldyBDaHJpc3RvcGhlciBLYXN0b3ItSW5hcmUgSUlJIDwvYT48YnIgLz5cbiAqICDimK0gSGlhbCBBdHJvcGEhISDimK1cbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vLi4vZWRpdG9yXCIpLkVkaXRvcn0gZWRpdG9yXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBjb250ZW50RWxlbWVudCBBbnkgZWxlbWVudCB3aGljaCBtYXkgYmUgcHJlc2VudGVkIGluc2lkZVxuICogIGEgZGl2LlxuICogQHBhcmFtIHsoKSA9PiB2b2lkfSBbY2FsbGJhY2tdXG4gKi9cbm1vZHVsZS5leHBvcnRzLm92ZXJsYXlQYWdlID0gZnVuY3Rpb24gb3ZlcmxheVBhZ2UoZWRpdG9yLCBjb250ZW50RWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICB2YXIgY2xvc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGlnbm9yZUZvY3VzT3V0ID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkb2N1bWVudEVzY0xpc3RlbmVyKGUpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgaWYgKCFjbG9zZXIpIHJldHVybjtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGRvY3VtZW50RXNjTGlzdGVuZXIpO1xuICAgICAgICBjbG9zZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjbG9zZXIpO1xuICAgICAgICBpZiAoZWRpdG9yKSB7XG4gICAgICAgICAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBjbG9zZXIgPSBudWxsO1xuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgb3ZlcmxheSBpcyBjbG9zZWQgd2hlbiB1c2VyIGNsaWNrcyBvdXRzaWRlIG9mIGl0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaWdub3JlICAgICAgSWYgc2V0IHRvIHRydWUgb3ZlcmxheSBzdGF5cyBvcGVuIHdoZW4gZm9jdXMgbW92ZXMgdG8gYW5vdGhlciBwYXJ0IG9mIHRoZSBlZGl0b3IuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0SWdub3JlRm9jdXNPdXQoaWdub3JlKSB7XG4gICAgICAgIGlnbm9yZUZvY3VzT3V0ID0gaWdub3JlO1xuICAgICAgICBpZiAoaWdub3JlKSB7XG4gICAgICAgICAgICBjbG9zZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgICAgY29udGVudEVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VyLnN0eWxlLmNzc1RleHQgPSAnbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyAnICtcbiAgICAgICAgJ3Bvc2l0aW9uOiBmaXhlZDsgdG9wOjA7IGJvdHRvbTowOyBsZWZ0OjA7IHJpZ2h0OjA7JyArXG4gICAgICAgICd6LWluZGV4OiA5OTkwOyAnICtcbiAgICAgICAgKGVkaXRvciA/ICdiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7JyA6ICcnKTtcbiAgICBjbG9zZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghaWdub3JlRm9jdXNPdXQpIHtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBjbGljayBjbG9zZXIgaWYgZXNjIGtleSBpcyBwcmVzc2VkXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGRvY3VtZW50RXNjTGlzdGVuZXIpO1xuXG4gICAgY29udGVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgY2xvc2VyLmFwcGVuZENoaWxkKGNvbnRlbnRFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNsb3Nlcik7XG4gICAgaWYgKGVkaXRvcikge1xuICAgICAgICBlZGl0b3IuYmx1cigpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBjbG9zZTogY2xvc2UsXG4gICAgICAgIHNldElnbm9yZUZvY3VzT3V0OiBzZXRJZ25vcmVGb2N1c091dFxuICAgIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBgI2FjZV9zZXR0aW5nc21lbnUsICNrYnNob3J0Y3V0bWVudSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0Y3RjdGNztcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgYm94LXNoYWRvdzogLTVweCA0cHggNXB4IHJnYmEoMTI2LCAxMjYsIDEyNiwgMC41NSk7XG4gICAgcGFkZGluZzogMWVtIDAuNWVtIDJlbSAxZW07XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG1hcmdpbjogMDtcbiAgICBib3R0b206IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgdG9wOiAwO1xuICAgIHotaW5kZXg6IDk5OTE7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4uYWNlX2RhcmsgI2FjZV9zZXR0aW5nc21lbnUsIC5hY2VfZGFyayAja2JzaG9ydGN1dG1lbnUge1xuICAgIGJveC1zaGFkb3c6IC0yMHB4IDEwcHggMjVweCByZ2JhKDEyNiwgMTI2LCAxMjYsIDAuMjUpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcbiAgICBjb2xvcjogYmxhY2s7XG59XG5cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeTpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMDAsIDEwMCwgMTAwLCAwLjEpO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzXG59XG5cbi5hY2VfY2xvc2VCdXR0b24ge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjQ1LCAxNDYsIDE0NiwgMC41KTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRjQ4QThBO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBwYWRkaW5nOiA3cHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAtOHB4O1xuICAgIHRvcDogLThweDtcbiAgICB6LWluZGV4OiAxMDAwMDA7XG59XG4uYWNlX2Nsb3NlQnV0dG9ue1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjQ1LCAxNDYsIDE0NiwgMC45KTtcbn1cbi5hY2Vfb3B0aW9uc01lbnVLZXkge1xuICAgIGNvbG9yOiBkYXJrc2xhdGVibHVlO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuLmFjZV9vcHRpb25zTWVudUNvbW1hbmQge1xuICAgIGNvbG9yOiBkYXJrY3lhbjtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGlucHV0LCAuYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uIHtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuXG4uYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uW2FjZV9zZWxlY3RlZF9idXR0b249dHJ1ZV0ge1xuICAgIGJhY2tncm91bmQ6ICNlN2U3ZTc7XG4gICAgYm94LXNoYWRvdzogMXB4IDBweCAycHggMHB4ICNhZGFkYWQgaW5zZXQ7XG4gICAgYm9yZGVyLWNvbG9yOiAjYWRhZGFkO1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICAgIG1hcmdpbjogMHB4O1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvbjpob3ZlcntcbiAgICBiYWNrZ3JvdW5kOiAjZjBmMGYwO1xufWA7XG4iLCIvKipcbiAqICMjIEZpbGUgbW9kZSBkZXRlY3Rpb24gdXRpbGl0eVxuICpcbiAqIFByb3ZpZGVzIGF1dG9tYXRpYyBkZXRlY3Rpb24gb2YgZWRpdG9yIHN5bnRheCBtb2RlcyBiYXNlZCBvbiBmaWxlIHBhdGhzIGFuZCBleHRlbnNpb25zLiBNYXBzIGZpbGUgZXh0ZW5zaW9ucyB0b1xuICogYXBwcm9wcmlhdGUgQWNlIEVkaXRvciBzeW50YXggaGlnaGxpZ2h0aW5nIG1vZGVzIGZvciBvdmVyIDEwMCBwcm9ncmFtbWluZyBsYW5ndWFnZXMgYW5kIGZpbGUgZm9ybWF0cyBpbmNsdWRpbmdcbiAqIEphdmFTY3JpcHQsIFR5cGVTY3JpcHQsIEhUTUwsIENTUywgUHl0aG9uLCBKYXZhLCBDKyssIGFuZCBtYW55IG90aGVycy4gU3VwcG9ydHMgY29tcGxleCBleHRlbnNpb24gcGF0dGVybnMgYW5kXG4gKiBwcm92aWRlcyBmYWxsYmFjayBtZWNoYW5pc21zIGZvciB1bmtub3duIGZpbGUgdHlwZXMuXG4gKlxuICogQG1vZHVsZVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYW4gYXJyYXkgdG8gc3RvcmUgdmFyaW91cyBzeW50YXggbW9kZXMuXG4gKlxuICogQHR5cGUge01vZGVbXX1cbiAqL1xudmFyIG1vZGVzID0gW107XG4vKipcbiAqIFN1Z2dlc3RzIGEgbW9kZSBiYXNlZCBvbiB0aGUgZmlsZSBleHRlbnNpb24gcHJlc2VudCBpbiB0aGUgZ2l2ZW4gcGF0aFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gdGhlIGZpbGVcbiAqIEByZXR1cm5zIHtNb2RlfSBSZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZVxuICogIHN1Z2dlc3RlZCBtb2RlLlxuICovXG5mdW5jdGlvbiBnZXRNb2RlRm9yUGF0aChwYXRoKSB7XG4gICAgdmFyIG1vZGUgPSBtb2Rlc0J5TmFtZS50ZXh0O1xuICAgIHZhciBmaWxlTmFtZSA9IHBhdGguc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG1vZGVzW2ldLnN1cHBvcnRzRmlsZShmaWxlTmFtZSkpIHtcbiAgICAgICAgICAgIG1vZGUgPSBtb2Rlc1tpXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtb2RlO1xufVxuXG5jbGFzcyBNb2RlIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjYXB0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV4dGVuc2lvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBjYXB0aW9uLCBleHRlbnNpb25zKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY2FwdGlvbiA9IGNhcHRpb247XG4gICAgICAgIHRoaXMubW9kZSA9IFwiYWNlL21vZGUvXCIgKyBuYW1lO1xuICAgICAgICB0aGlzLmV4dGVuc2lvbnMgPSBleHRlbnNpb25zO1xuICAgICAgICB2YXIgcmU7XG4gICAgICAgIGlmICgvXFxeLy50ZXN0KGV4dGVuc2lvbnMpKSB7XG4gICAgICAgICAgICByZSA9IGV4dGVuc2lvbnMucmVwbGFjZSgvXFx8KFxcXik/L2csIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiJHxcIiArIChiID8gXCJeXCIgOiBcIl4uKlxcXFwuXCIpO1xuICAgICAgICAgICAgfSkgKyBcIiRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlID0gXCJcXFxcLihcIiArIGV4dGVuc2lvbnMgKyBcIikkXCI7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmV4dFJlID0gbmV3IFJlZ0V4cChyZSwgXCJnaVwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZW5hbWVcbiAgICAgKiBAcmV0dXJucyB7UmVnRXhwTWF0Y2hBcnJheSB8IG51bGx9XG4gICAgICovXG4gICAgc3VwcG9ydHNGaWxlKGZpbGVuYW1lKSB7XG4gICAgICAgIHJldHVybiBmaWxlbmFtZS5tYXRjaCh0aGlzLmV4dFJlKTtcbiAgICB9XG59XG5cbi8vIHRvZG8gZmlyc3RsaW5lbWF0Y2hcbnZhciBzdXBwb3J0ZWRNb2RlcyA9IHtcbiAgICBBQkFQOiAgICAgICAgW1wiYWJhcFwiXSxcbiAgICBBQkM6ICAgICAgICAgW1wiYWJjXCJdLFxuICAgIEFjdGlvblNjcmlwdDpbXCJhc1wiXSxcbiAgICBBREE6ICAgICAgICAgW1wiYWRhfGFkYlwiXSxcbiAgICBBbGRhOiAgICAgICAgW1wiYWxkYVwiXSxcbiAgICBBcGFjaGVfQ29uZjogW1wiXmh0YWNjZXNzfF5odGdyb3Vwc3xeaHRwYXNzd2R8XmNvbmZ8aHRhY2Nlc3N8aHRncm91cHN8aHRwYXNzd2RcIl0sXG4gICAgQXBleDogICAgICAgIFtcImFwZXh8Y2xzfHRyaWdnZXJ8dGdyXCJdLFxuICAgIEFRTDogICAgICAgICBbXCJhcWxcIl0sXG4gICAgQXNjaWlEb2M6ICAgIFtcImFzY2lpZG9jfGFkb2NcIl0sXG4gICAgQVNMOiAgICAgICAgIFtcImRzbHxhc2x8YXNsLmpzb25cIl0sXG4gICAgQXNzZW1ibHlfQVJNMzI6W1wic1wiXSxcbiAgICBBc3NlbWJseV94ODY6W1wiYXNtfGFcIl0sXG4gICAgQXN0cm86ICAgICAgIFtcImFzdHJvXCJdLFxuICAgIEF1dG9Ib3RLZXk6ICBbXCJhaGtcIl0sXG4gICAgQmFzaWM6ICAgICAgIFtcImJhc3xiYWtcIl0sXG4gICAgQmF0Y2hGaWxlOiAgIFtcImJhdHxjbWRcIl0sXG4gICAgQmliVGVYOiAgICAgIFtcImJpYlwiXSxcbiAgICBDX0NwcDogICAgICAgW1wiY3BwfGN8Y2N8Y3h4fGh8aGh8aHBwfGlub1wiXSxcbiAgICBDOVNlYXJjaDogICAgW1wiYzlzZWFyY2hfcmVzdWx0c1wiXSxcbiAgICBDaXJydTogICAgICAgW1wiY2lycnV8Y3JcIl0sXG4gICAgQ2xvanVyZTogICAgIFtcImNsanxjbGpzXCJdLFxuICAgIENsdWU6ICAgICAgICBbXCJjbHVlXCJdLFxuICAgIENvYm9sOiAgICAgICBbXCJDQkx8Q09CXCJdLFxuICAgIGNvZmZlZTogICAgICBbXCJjb2ZmZWV8Y2Z8Y3NvbnxeQ2FrZWZpbGVcIl0sXG4gICAgQ29sZEZ1c2lvbjogIFtcImNmbXxjZmNcIl0sXG4gICAgQ3J5c3RhbDogICAgIFtcImNyXCJdLFxuICAgIENTaGFycDogICAgICBbXCJjc1wiXSxcbiAgICBDc291bmRfRG9jdW1lbnQ6IFtcImNzZFwiXSxcbiAgICBDc291bmRfT3JjaGVzdHJhOiBbXCJvcmNcIl0sXG4gICAgQ3NvdW5kX1Njb3JlOiBbXCJzY29cIl0sXG4gICAgQ1NTOiAgICAgICAgIFtcImNzc1wiXSxcbiAgICBDU1Y6ICAgICAgICAgW1wiY3N2XCJdLFxuICAgIEN1cmx5OiAgICAgICBbXCJjdXJseVwiXSxcbiAgICBDdXR0bGVmaXNoOiAgW1wiY29uZlwiXSxcbiAgICBEOiAgICAgICAgICAgW1wiZHxkaVwiXSxcbiAgICBEYXJ0OiAgICAgICAgW1wiZGFydFwiXSxcbiAgICBEaWZmOiAgICAgICAgW1wiZGlmZnxwYXRjaFwiXSxcbiAgICBEamFuZ286ICAgICAgW1wiZGp0fGh0bWwuZGp0fGRqLmh0bWx8ZGpodG1sXCJdLFxuICAgIERvY2tlcmZpbGU6ICBbXCJeRG9ja2VyZmlsZVwiXSxcbiAgICBEb3Q6ICAgICAgICAgW1wiZG90XCJdLFxuICAgIERyb29sczogICAgICBbXCJkcmxcIl0sXG4gICAgRWRpZmFjdDogICAgIFtcImVkaVwiXSxcbiAgICBFaWZmZWw6ICAgICAgW1wiZXxnZVwiXSxcbiAgICBFSlM6ICAgICAgICAgW1wiZWpzXCJdLFxuICAgIEVsaXhpcjogICAgICBbXCJleHxleHNcIl0sXG4gICAgRWxtOiAgICAgICAgIFtcImVsbVwiXSxcbiAgICBFcmxhbmc6ICAgICAgW1wiZXJsfGhybFwiXSxcbiAgICBGbGl4OiAgICAgICAgW1wiZmxpeFwiXSxcbiAgICBGb3J0aDogICAgICAgW1wiZnJ0fGZzfGxkcnxmdGh8NHRoXCJdLFxuICAgIEZvcnRyYW46ICAgICBbXCJmfGY5MFwiXSxcbiAgICBGU2hhcnA6ICAgICAgW1wiZnNpfGZzfG1sfG1saXxmc3h8ZnNzY3JpcHRcIl0sXG4gICAgRlNMOiAgICAgICAgIFtcImZzbFwiXSxcbiAgICBGVEw6ICAgICAgICAgW1wiZnRsXCJdLFxuICAgIEdjb2RlOiAgICAgICBbXCJnY29kZVwiXSxcbiAgICBHaGVya2luOiAgICAgW1wiZmVhdHVyZVwiXSxcbiAgICBHaXRpZ25vcmU6ICAgW1wiXi5naXRpZ25vcmVcIl0sXG4gICAgR2xzbDogICAgICAgIFtcImdsc2x8ZnJhZ3x2ZXJ0XCJdLFxuICAgIEdvYnN0b25lczogICBbXCJnYnNcIl0sXG4gICAgZ29sYW5nOiAgICAgIFtcImdvXCJdLFxuICAgIEdyYXBoUUxTY2hlbWE6IFtcImdxbFwiXSxcbiAgICBHcm9vdnk6ICAgICAgW1wiZ3Jvb3Z5XCJdLFxuICAgIEhBTUw6ICAgICAgICBbXCJoYW1sXCJdLFxuICAgIEhhbmRsZWJhcnM6ICBbXCJoYnN8aGFuZGxlYmFyc3x0cGx8bXVzdGFjaGVcIl0sXG4gICAgSGFza2VsbDogICAgIFtcImhzXCJdLFxuICAgIEhhc2tlbGxfQ2FiYWw6IFtcImNhYmFsXCJdLFxuICAgIGhhWGU6ICAgICAgICBbXCJoeFwiXSxcbiAgICBIanNvbjogICAgICAgW1wiaGpzb25cIl0sXG4gICAgSFRNTDogW1wiaHRtbHxodG18eGh0bWx8d2V8d3B5XCJdLFxuICAgIEhUTUxfRWxpeGlyOiBbXCJlZXh8aHRtbC5lZXhcIl0sXG4gICAgSFRNTF9SdWJ5OiAgIFtcImVyYnxyaHRtbHxodG1sLmVyYlwiXSxcbiAgICBJTkk6ICAgICAgICAgW1wiaW5pfGNvbmZ8Y2ZnfHByZWZzXCJdLFxuICAgIElvOiAgICAgICAgICBbXCJpb1wiXSxcbiAgICBJb246ICAgICAgICAgW1wiaW9uXCJdLFxuICAgIEphY2s6ICAgICAgICBbXCJqYWNrXCJdLFxuICAgIEphZGU6ICAgICAgICBbXCJqYWRlfHB1Z1wiXSxcbiAgICBKYXZhOiAgICAgICAgW1wiamF2YVwiXSxcbiAgICBKYXZhU2NyaXB0OiAgW1wianN8anNtfGNqc3xtanNcIl0sXG4gICAgSkVYTDogICAgICAgIFtcImpleGxcIl0sXG4gICAgSlNPTjogICAgICAgIFtcImpzb25cIl0sXG4gICAgSlNPTjU6ICAgICAgIFtcImpzb241XCJdLFxuICAgIEpTT05pcTogICAgICBbXCJqcVwiXSxcbiAgICBKU1A6ICAgICAgICAgW1wianNwXCJdLFxuICAgIEpTU006ICAgICAgICBbXCJqc3NtfGpzc21fc3RhdGVcIl0sXG4gICAgSlNYOiAgICAgICAgIFtcImpzeFwiXSxcbiAgICBKdWxpYTogICAgICAgW1wiamxcIl0sXG4gICAgS290bGluOiAgICAgIFtcImt0fGt0c1wiXSxcbiAgICBMYVRlWDogICAgICAgW1widGV4fGxhdGV4fGx0eHxiaWJcIl0sXG4gICAgTGF0dGU6ICAgICAgIFtcImxhdHRlXCJdLFxuICAgIExFU1M6ICAgICAgICBbXCJsZXNzXCJdLFxuICAgIExpcXVpZDogICAgICBbXCJsaXF1aWRcIl0sXG4gICAgTGlzcDogICAgICAgIFtcImxpc3BcIl0sXG4gICAgTGl2ZVNjcmlwdDogIFtcImxzXCJdLFxuICAgIExvZzogICAgICAgICBbXCJsb2dcIl0sXG4gICAgTG9naVFMOiAgICAgIFtcImxvZ2ljfGxxbFwiXSxcbiAgICBMb2d0YWxrOiAgICAgW1wibGd0XCJdLFxuICAgIExTTDogICAgICAgICBbXCJsc2xcIl0sXG4gICAgTHVhOiAgICAgICAgIFtcImx1YVwiXSxcbiAgICBMdWFQYWdlOiAgICAgW1wibHBcIl0sXG4gICAgTHVjZW5lOiAgICAgIFtcImx1Y2VuZVwiXSxcbiAgICBNYWtlZmlsZTogICAgW1wiXk1ha2VmaWxlfF5HTlVtYWtlZmlsZXxebWFrZWZpbGV8Xk9DYW1sTWFrZWZpbGV8bWFrZVwiXSxcbiAgICBNYXJrZG93bjogICAgW1wibWR8bWFya2Rvd25cIl0sXG4gICAgTWFzazogICAgICAgIFtcIm1hc2tcIl0sXG4gICAgTUFUTEFCOiAgICAgIFtcIm1hdGxhYlwiXSxcbiAgICBNYXplOiAgICAgICAgW1wibXpcIl0sXG4gICAgTWVkaWFXaWtpOiAgIFtcIndpa2l8bWVkaWF3aWtpXCJdLFxuICAgIE1FTDogICAgICAgICBbXCJtZWxcIl0sXG4gICAgTUlQUzogICAgICAgIFtcInN8YXNtXCJdLFxuICAgIE1JWEFMOiAgICAgICBbXCJtaXhhbFwiXSxcbiAgICBNVVNIQ29kZTogICAgW1wibWN8bXVzaFwiXSxcbiAgICBNeVNRTDogICAgICAgW1wibXlzcWxcIl0sXG4gICAgTmFzYWw6ICAgICAgIFtcIm5hc1wiXSxcbiAgICBOZ2lueDogICAgICAgW1wibmdpbnh8Y29uZlwiXSxcbiAgICBOaW06ICAgICAgICAgW1wibmltXCJdLFxuICAgIE5peDogICAgICAgICBbXCJuaXhcIl0sXG4gICAgTlNJUzogICAgICAgIFtcIm5zaXxuc2hcIl0sXG4gICAgTnVuanVja3M6ICAgIFtcIm51bmp1Y2tzfG51bmpzfG5qfG5qa1wiXSxcbiAgICBPYmplY3RpdmVDOiAgW1wibXxtbVwiXSxcbiAgICBPQ2FtbDogICAgICAgW1wibWx8bWxpXCJdLFxuICAgIE9kaW46ICAgICAgICBbXCJvZGluXCJdLFxuICAgIFBhcnRpUUw6ICAgICBbXCJwYXJ0aXFsfHBxbFwiXSxcbiAgICBQYXNjYWw6ICAgICAgW1wicGFzfHBcIl0sXG4gICAgUGVybDogICAgICAgIFtcInBsfHBtXCJdLFxuICAgIHBnU1FMOiAgICAgICBbXCJwZ3NxbFwiXSxcbiAgICBQSFA6ICAgICAgICAgW1wicGhwfGluY3xwaHRtbHxzaHRtbHxwaHAzfHBocDR8cGhwNXxwaHBzfHBocHR8YXd8Y3RwfG1vZHVsZVwiXSxcbiAgICBQSFBfTGFyYXZlbF9ibGFkZTogW1wiYmxhZGUucGhwXCJdLFxuICAgIFBpZzogICAgICAgICBbXCJwaWdcIl0sXG4gICAgUExTUUw6ICAgICAgIFtcInBsc3FsXCJdLFxuICAgIFBvd2Vyc2hlbGw6ICBbXCJwczFcIl0sXG4gICAgUHJhYXQ6ICAgICAgIFtcInByYWF0fHByYWF0c2NyaXB0fHBzY3xwcm9jXCJdLFxuICAgIFByaXNtYTogICAgICBbXCJwcmlzbWFcIl0sXG4gICAgUHJvbG9nOiAgICAgIFtcInBsZ3xwcm9sb2dcIl0sXG4gICAgUHJvcGVydGllczogIFtcInByb3BlcnRpZXNcIl0sXG4gICAgUHJvdG9idWY6ICAgIFtcInByb3RvXCJdLFxuICAgIFBSUUw6ICAgICAgICBbXCJwcnFsXCJdLFxuICAgIFB1cHBldDogICAgICBbXCJlcHB8cHBcIl0sXG4gICAgUHl0aG9uOiAgICAgIFtcInB5XCJdLFxuICAgIFFNTDogICAgICAgICBbXCJxbWxcIl0sXG4gICAgUjogICAgICAgICAgIFtcInJcIl0sXG4gICAgUmFrdTogICAgICAgIFtcInJha3V8cmFrdW1vZHxyYWt1dGVzdHxwNnxwbDZ8cG02XCJdLFxuICAgIFJhem9yOiAgICAgICBbXCJjc2h0bWx8YXNwXCJdLFxuICAgIFJEb2M6ICAgICAgICBbXCJSZFwiXSxcbiAgICBSZWQ6ICAgICAgICAgW1wicmVkfHJlZHNcIl0sXG4gICAgUkhUTUw6ICAgICAgIFtcIlJodG1sXCJdLFxuICAgIFJvYm90OiAgICAgICBbXCJyb2JvdHxyZXNvdXJjZVwiXSxcbiAgICBSU1Q6ICAgICAgICAgW1wicnN0XCJdLFxuICAgIFJ1Ynk6ICAgICAgICBbXCJyYnxydXxnZW1zcGVjfHJha2V8Xkd1YXJkZmlsZXxeUmFrZWZpbGV8XkdlbWZpbGVcIl0sXG4gICAgUnVzdDogICAgICAgIFtcInJzXCJdLFxuICAgIFNhQzogICAgICAgICBbXCJzYWNcIl0sXG4gICAgU0FTUzogICAgICAgIFtcInNhc3NcIl0sXG4gICAgU0NBRDogICAgICAgIFtcInNjYWRcIl0sXG4gICAgU2NhbGE6ICAgICAgIFtcInNjYWxhfHNidFwiXSxcbiAgICBTY2hlbWU6ICAgICAgW1wic2NtfHNtfHJrdHxvYWt8c2NoZW1lXCJdLFxuICAgIFNjcnlwdDogICAgICBbXCJzY3J5cHRcIl0sXG4gICAgU0NTUzogICAgICAgIFtcInNjc3NcIl0sXG4gICAgU0g6ICAgICAgICAgIFtcInNofGJhc2h8Xi5iYXNocmNcIl0sXG4gICAgU0pTOiAgICAgICAgIFtcInNqc1wiXSxcbiAgICBTbGltOiAgICAgICAgW1wic2xpbXxza2ltXCJdLFxuICAgIFNtYXJ0eTogICAgICBbXCJzbWFydHl8dHBsXCJdLFxuICAgIFNtaXRoeTogICAgICBbXCJzbWl0aHlcIl0sXG4gICAgc25pcHBldHM6ICAgIFtcInNuaXBwZXRzXCJdLFxuICAgIFNveV9UZW1wbGF0ZTpbXCJzb3lcIl0sXG4gICAgU3BhY2U6ICAgICAgIFtcInNwYWNlXCJdLFxuICAgIFNQQVJRTDogICAgICBbXCJycVwiXSxcbiAgICBTUUw6ICAgICAgICAgW1wic3FsXCJdLFxuICAgIFNRTFNlcnZlcjogICBbXCJzcWxzZXJ2ZXJcIl0sXG4gICAgU3R5bHVzOiAgICAgIFtcInN0eWx8c3R5bHVzXCJdLFxuICAgIFNWRzogICAgICAgICBbXCJzdmdcIl0sXG4gICAgU3dpZnQ6ICAgICAgIFtcInN3aWZ0XCJdLFxuICAgIFRjbDogICAgICAgICBbXCJ0Y2xcIl0sXG4gICAgVGVycmFmb3JtOiAgIFtcInRmXCIsIFwidGZ2YXJzXCIsIFwidGVycmFncnVudFwiXSxcbiAgICBUZXg6ICAgICAgICAgW1widGV4XCJdLFxuICAgIFRleHQ6ICAgICAgICBbXCJ0eHRcIl0sXG4gICAgVGV4dGlsZTogICAgIFtcInRleHRpbGVcIl0sXG4gICAgVG9tbDogICAgICAgIFtcInRvbWxcIl0sXG4gICAgVFNWOiAgICAgICAgIFtcInRzdlwiXSxcbiAgICBUU1g6ICAgICAgICAgW1widHN4XCJdLFxuICAgIFR1cnRsZTogICAgICBbXCJ0dGxcIl0sXG4gICAgVHdpZzogICAgICAgIFtcInR3aWd8c3dpZ1wiXSxcbiAgICBUeXBlc2NyaXB0OiAgW1widHN8bXRzfGN0c3x0eXBlc2NyaXB0fHN0clwiXSxcbiAgICBWYWxhOiAgICAgICAgW1widmFsYVwiXSxcbiAgICBWQlNjcmlwdDogICAgW1widmJzfHZiXCJdLFxuICAgIFZlbG9jaXR5OiAgICBbXCJ2bVwiXSxcbiAgICBWZXJpbG9nOiAgICAgW1widnx2aHxzdnxzdmhcIl0sXG4gICAgVkhETDogICAgICAgIFtcInZoZHx2aGRsXCJdLFxuICAgIFZpc3VhbGZvcmNlOiBbXCJ2ZnB8Y29tcG9uZW50fHBhZ2VcIl0sXG4gICAgVnVlOiBbXCJ2dWVcIl0sXG4gICAgV29sbG9rOiAgICAgIFtcIndsa3x3cGdtfHd0ZXN0XCJdLFxuICAgIFhNTDogICAgICAgICBbXCJ4bWx8cmRmfHJzc3x3c2RsfHhzbHR8YXRvbXxtYXRobWx8bW1sfHh1bHx4Ymx8eGFtbFwiXSxcbiAgICBYUXVlcnk6ICAgICAgW1wieHFcIl0sXG4gICAgWUFNTDogICAgICAgIFtcInlhbWx8eW1sXCJdLFxuICAgIFplZWs6ICAgICAgICBbXCJ6ZWVrfGJyb1wiXSxcbiAgICBaaWc6ICAgICAgICAgW1wiemlnXCJdXG59O1xuXG52YXIgbmFtZU92ZXJyaWRlcyA9IHtcbiAgICBPYmplY3RpdmVDOiBcIk9iamVjdGl2ZS1DXCIsXG4gICAgQ1NoYXJwOiBcIkMjXCIsXG4gICAgZ29sYW5nOiBcIkdvXCIsXG4gICAgQ19DcHA6IFwiQyBhbmQgQysrXCIsXG4gICAgQ3NvdW5kX0RvY3VtZW50OiBcIkNzb3VuZCBEb2N1bWVudFwiLFxuICAgIENzb3VuZF9PcmNoZXN0cmE6IFwiQ3NvdW5kXCIsXG4gICAgQ3NvdW5kX1Njb3JlOiBcIkNzb3VuZCBTY29yZVwiLFxuICAgIGNvZmZlZTogXCJDb2ZmZWVTY3JpcHRcIixcbiAgICBIVE1MX1J1Ynk6IFwiSFRNTCAoUnVieSlcIixcbiAgICBIVE1MX0VsaXhpcjogXCJIVE1MIChFbGl4aXIpXCIsXG4gICAgRlRMOiBcIkZyZWVNYXJrZXJcIixcbiAgICBQSFBfTGFyYXZlbF9ibGFkZTogXCJQSFAgKEJsYWRlIFRlbXBsYXRlKVwiLFxuICAgIFBlcmw2OiBcIlBlcmwgNlwiLFxuICAgIEF1dG9Ib3RLZXk6IFwiQXV0b0hvdGtleSAvIEF1dG9JdFwiXG59O1xuXG4vKipcbiAqIEFuIG9iamVjdCB0aGF0IHNlcnZlcyBhcyBhIG1hcHBpbmcgb2YgbW9kZSBuYW1lcyB0byB0aGVpciBjb3JyZXNwb25kaW5nIG1vZGUgZGF0YS5cbiAqIFRoZSBrZXlzIG9mIHRoaXMgb2JqZWN0IGFyZSBtb2RlIG5hbWVzIChhcyBzdHJpbmdzKSwgYW5kIHRoZSB2YWx1ZXMgYXJlIGV4cGVjdGVkXG4gKiB0byByZXByZXNlbnQgZGF0YSBhc3NvY2lhdGVkIHdpdGggZWFjaCBtb2RlLlxuICpcbiAqIFRoaXMgc3RydWN0dXJlIGNhbiBiZSB1c2VkIGZvciBxdWljayBsb29rdXBzIG9mIG1vZGUgaW5mb3JtYXRpb24gYnkgbmFtZS5cbiAqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBNb2RlPn1cbiAqL1xudmFyIG1vZGVzQnlOYW1lID0ge307XG5mb3IgKHZhciBuYW1lIGluIHN1cHBvcnRlZE1vZGVzKSB7XG4gICAgdmFyIGRhdGEgPSBzdXBwb3J0ZWRNb2Rlc1tuYW1lXTtcbiAgICB2YXIgZGlzcGxheU5hbWUgPSAobmFtZU92ZXJyaWRlc1tuYW1lXSB8fCBuYW1lKS5yZXBsYWNlKC9fL2csIFwiIFwiKTtcbiAgICB2YXIgZmlsZW5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIG1vZGUgPSBuZXcgTW9kZShmaWxlbmFtZSwgZGlzcGxheU5hbWUsIGRhdGFbMF0pO1xuICAgIG1vZGVzQnlOYW1lW2ZpbGVuYW1lXSA9IG1vZGU7XG4gICAgbW9kZXMucHVzaChtb2RlKTtcbn1cblxuZXhwb3J0cy5nZXRNb2RlRm9yUGF0aCA9IGdldE1vZGVGb3JQYXRoO1xuZXhwb3J0cy5tb2RlcyA9IG1vZGVzO1xuZXhwb3J0cy5tb2Rlc0J5TmFtZSA9IG1vZGVzQnlOYW1lOyIsIi8qKlxuICogIyMgVXNlciBJbnB1dCBQcm9tcHQgZXh0ZW5zaW9uXG4gKlxuICogUHJvdmlkZXMgY3VzdG9taXphYmxlIG1vZGFsIHByb21wdHMgZm9yIGdhdGhlcmluZyB1c2VyIGlucHV0IHdpdGggc3VwcG9ydCBmb3IgYXV0b2NvbXBsZXRpb24sIHZhbGlkYXRpb24sIGFuZFxuICogc3BlY2lhbGl6ZWQgaW5wdXQgdHlwZXMuIEluY2x1ZGVzIGJ1aWx0LWluIHByb21wdCB0eXBlcyBmb3IgbmF2aWdhdGlvbiAoZ290byBsaW5lKSwgY29tbWFuZCBwYWxldHRlLCBhbmQgbW9kZVxuICogc2VsZWN0aW9uLCB3aXRoIGV4dGVuc2libGUgYXJjaGl0ZWN0dXJlIGZvciBjdXN0b20gcHJvbXB0IGltcGxlbWVudGF0aW9ucy5cbiAqXG4gKiAqKkJ1aWx0LWluIFByb21wdCBUeXBlczoqKlxuICogLSBgZ290b0xpbmVgOiBOYXZpZ2F0ZSB0byBzcGVjaWZpYyBsaW5lIG51bWJlcnMgd2l0aCBzZWxlY3Rpb24gc3VwcG9ydFxuICogLSBgY29tbWFuZHNgOiBDb21tYW5kIHBhbGV0dGUgd2l0aCBzZWFyY2hhYmxlIGVkaXRvciBjb21tYW5kcyBhbmQgc2hvcnRjdXRzXG4gKiAtIGBtb2Rlc2A6IExhbmd1YWdlIG1vZGUgc2VsZWN0b3Igd2l0aCBmaWx0ZXJpbmcgY2FwYWJpbGl0aWVzXG4gKlxuICogKipVc2FnZToqKlxuICogYGBgamF2YXNjcmlwdFxuICogLy8gQmFzaWMgcHJvbXB0XG4gKiBwcm9tcHQoZWRpdG9yLCBcIkRlZmF1bHQgdmFsdWVcIiwge1xuICogICBwbGFjZWhvbGRlcjogXCJFbnRlciB0ZXh0Li4uXCIsXG4gKiAgIG9uQWNjZXB0OiAoZGF0YSkgPT4gY29uc29sZS5sb2coZGF0YS52YWx1ZSlcbiAqIH0pO1xuICpcbiAqIC8vIEJ1aWx0LWluIHByb21wdHNcbiAqIHByb21wdC5nb3RvTGluZShlZGl0b3IpO1xuICogcHJvbXB0LmNvbW1hbmRzKGVkaXRvcik7XG4gKiBwcm9tcHQubW9kZXMoZWRpdG9yKTtcbiAqIGBgYFxuICpcbiAqIEBtb2R1bGVcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9lZGl0b3JcIikuRWRpdG9yfSBFZGl0b3JcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG5scyA9IHJlcXVpcmUoXCIuLi9jb25maWdcIikubmxzO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9saWIvZG9tXCIpO1xudmFyIEZpbHRlcmVkTGlzdD0gcmVxdWlyZShcIi4uL2F1dG9jb21wbGV0ZVwiKS5GaWx0ZXJlZExpc3Q7XG52YXIgQWNlUG9wdXAgPSByZXF1aXJlKCcuLi9hdXRvY29tcGxldGUvcG9wdXAnKS5BY2VQb3B1cDtcbnZhciAkc2luZ2xlTGluZUVkaXRvciA9IHJlcXVpcmUoJy4uL2F1dG9jb21wbGV0ZS9wb3B1cCcpLiRzaW5nbGVMaW5lRWRpdG9yO1xudmFyIFVuZG9NYW5hZ2VyID0gcmVxdWlyZShcIi4uL3VuZG9tYW5hZ2VyXCIpLlVuZG9NYW5hZ2VyO1xudmFyIFRva2VuaXplciA9IHJlcXVpcmUoXCIuLi90b2tlbml6ZXJcIikuVG9rZW5pemVyO1xudmFyIG92ZXJsYXlQYWdlID0gcmVxdWlyZShcIi4vbWVudV90b29scy9vdmVybGF5X3BhZ2VcIikub3ZlcmxheVBhZ2U7XG52YXIgbW9kZWxpc3QgPSByZXF1aXJlKFwiLi9tb2RlbGlzdFwiKTtcbnZhciBvcGVuUHJvbXB0O1xuXG4vKipcbiAqIEB0eXBlZGVmIFByb21wdE9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBuYW1lICAgICAgICAgICAgIFByb21wdCBuYW1lLlxuICogQHByb3BlcnR5IHtTdHJpbmd9ICR0eXBlICAgICAgICAgICAgVXNlIHByb21wdCBvZiBzcGVjaWZpYyB0eXBlIChnb3RvTGluZXxjb21tYW5kc3xtb2RlcyBvciBkZWZhdWx0IGlmIGVtcHR5KS5cbiAqIEBwcm9wZXJ0eSB7W251bWJlciwgbnVtYmVyXX0gc2VsZWN0aW9uICBEZWZpbmVzIHdoaWNoIHBhcnQgb2YgdGhlIHByZWRlZmluZWQgdmFsdWUgc2hvdWxkIGJlIGhpZ2hsaWdodGVkLlxuICogQHByb3BlcnR5IHtCb29sZWFufSBoYXNEZXNjcmlwdGlvbiAgU2V0IHRvIHRydWUgaWYgcHJvbXB0IGhhcyBkZXNjcmlwdGlvbiBiZWxvdyBpbnB1dCBib3guXG4gKiBAcHJvcGVydHkge1N0cmluZ30gcHJvbXB0ICAgICAgICAgICBEZXNjcmlwdGlvbiBiZWxvdyBpbnB1dCBib3guXG4gKiBAcHJvcGVydHkge1N0cmluZ30gcGxhY2Vob2xkZXIgICAgICBQbGFjZWhvbGRlciBmb3IgdmFsdWUuXG4gKiBAcHJvcGVydHkge09iamVjdH0gJHJ1bGVzICAgICAgICAgICBTcGVjaWZpYyBydWxlcyBmb3IgaW5wdXQgbGlrZSBwYXNzd29yZCBvciByZWdleHAuXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGlnbm9yZUZvY3VzT3V0ICBTZXQgdG8gdHJ1ZSB0byBrZWVwIHRoZSBwcm9tcHQgb3BlbiB3aGVuIGZvY3VzIG1vdmVzIHRvIGFub3RoZXIgcGFydCBvZiB0aGUgZWRpdG9yLlxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gZ2V0Q29tcGxldGlvbnMgRnVuY3Rpb24gZm9yIGRlZmluaW5nIGxpc3Qgb2Ygb3B0aW9ucyBmb3IgdmFsdWUuXG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBnZXRQcmVmaXggICAgICBGdW5jdGlvbiBmb3IgZGVmaW5pbmcgY3VycmVudCB2YWx1ZSBwcmVmaXguXG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBvbkFjY2VwdCAgICAgICBGdW5jdGlvbiBjYWxsZWQgd2hlbiBFbnRlciBpcyBwcmVzc2VkLlxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gb25JbnB1dCAgICAgICAgRnVuY3Rpb24gY2FsbGVkIHdoZW4gaW5wdXQgaXMgYWRkZWQgdG8gcHJvbXB0IGlucHV0IGJveC5cbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IG9uQ2FuY2VsICAgICAgIEZ1bmN0aW9uIGNhbGxlZCB3aGVuIEVzY3xTaGlmdC1Fc2MgaXMgcHJlc3NlZC5cbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGhpc3RvcnkgICAgICAgIEZ1bmN0aW9uIGZvciBkZWZpbmluZyBoaXN0b3J5IGxpc3QuXG4gKiBAcHJvcGVydHkge251bWJlcn0gbWF4SGlzdG9yeUNvdW50XG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBhZGRUb0hpc3RvcnlcbiAqL1xuXG4vKipcbiAqIFByb21wdCBwbHVnaW4gaXMgdXNlZCBmb3IgZ2V0dGluZyBpbnB1dCBmcm9tIHVzZXIuXG4gKlxuICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvciAgICAgICAgICAgICAgICAgICBPdXNpZGUgZWRpdG9yIHJlbGF0ZWQgdG8gdGhpcyBwcm9tcHQuIFdpbGwgYmUgYmx1cnJlZCB3aGVuIHByb21wdCBpcyBvcGVuLlxuICogQHBhcmFtIHtTdHJpbmcgfCBQYXJ0aWFsPFByb21wdE9wdGlvbnM+fSBtZXNzYWdlICAgICAgICAgICAgICAgICAgUHJlZGVmaW5lZCB2YWx1ZSBvZiBwcm9tcHQgaW5wdXQgYm94LlxuICogQHBhcmFtIHtQYXJ0aWFsPFByb21wdE9wdGlvbnM+fSBvcHRpb25zICAgICAgICAgICAgICAgICAgQ3Vzb21pemFibGUgb3B0aW9ucyBmb3IgdGhpcyBwcm9tcHQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdICAgICAgICAgICAgICAgRnVuY3Rpb24gY2FsbGVkIGFmdGVyIGRvbmUuXG4gKiAqL1xuZnVuY3Rpb24gcHJvbXB0KGVkaXRvciwgbWVzc2FnZSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBwcm9tcHQoZWRpdG9yLCBcIlwiLCBtZXNzYWdlLCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKG9wZW5Qcm9tcHQpIHtcbiAgICAgICAgdmFyIGxhc3RQcm9tcHQgPSBvcGVuUHJvbXB0O1xuICAgICAgICBlZGl0b3IgPSBsYXN0UHJvbXB0LmVkaXRvcjtcbiAgICAgICAgbGFzdFByb21wdC5jbG9zZSgpO1xuICAgICAgICBpZiAobGFzdFByb21wdC5uYW1lICYmIGxhc3RQcm9tcHQubmFtZSA9PSBvcHRpb25zLm5hbWUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvcHRpb25zLiR0eXBlKVxuICAgICAgIHJldHVybiBwcm9tcHRbb3B0aW9ucy4kdHlwZV0oZWRpdG9yLCBjYWxsYmFjayk7XG5cbiAgICB2YXIgY21kTGluZSA9ICRzaW5nbGVMaW5lRWRpdG9yKCk7XG4gICAgY21kTGluZS5zZXNzaW9uLnNldFVuZG9NYW5hZ2VyKG5ldyBVbmRvTWFuYWdlcigpKTtcblxuICAgIC8qKkB0eXBlIHthbnl9Ki9cbiAgICB2YXIgZWwgPSBkb20uYnVpbGREb20oW1wiZGl2XCIsIHtjbGFzczogXCJhY2VfcHJvbXB0X2NvbnRhaW5lclwiICsgKG9wdGlvbnMuaGFzRGVzY3JpcHRpb24gPyBcIiBpbnB1dC1ib3gtd2l0aC1kZXNjcmlwdGlvblwiIDogXCJcIil9XSk7XG4gICAgdmFyIG92ZXJsYXkgPSBvdmVybGF5UGFnZShlZGl0b3IsIGVsLCBkb25lKTtcbiAgICBlbC5hcHBlbmRDaGlsZChjbWRMaW5lLmNvbnRhaW5lcik7XG5cbiAgICBpZiAoZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5jbWRMaW5lID0gY21kTGluZTtcbiAgICAgICAgY21kTGluZS5zZXRPcHRpb24oXCJmb250U2l6ZVwiLCBlZGl0b3IuZ2V0T3B0aW9uKFwiZm9udFNpemVcIikpO1xuICAgIH1cbiAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICBjbWRMaW5lLnNldFZhbHVlKG1lc3NhZ2UsIDEpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zZWxlY3Rpb24pIHtcbiAgICAgICAgY21kTGluZS5zZWxlY3Rpb24uc2V0UmFuZ2Uoe1xuICAgICAgICAgICAgc3RhcnQ6IGNtZExpbmUuc2Vzc2lvbi5kb2MuaW5kZXhUb1Bvc2l0aW9uKG9wdGlvbnMuc2VsZWN0aW9uWzBdKSxcbiAgICAgICAgICAgIGVuZDogY21kTGluZS5zZXNzaW9uLmRvYy5pbmRleFRvUG9zaXRpb24ob3B0aW9ucy5zZWxlY3Rpb25bMV0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmdldENvbXBsZXRpb25zKSB7XG4gICAgICAgIHZhciBwb3B1cCA9IG5ldyBBY2VQb3B1cCgpO1xuICAgICAgICBwb3B1cC5yZW5kZXJlci5zZXRTdHlsZShcImFjZV9hdXRvY29tcGxldGVfaW5saW5lXCIpO1xuICAgICAgICBwb3B1cC5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgcG9wdXAuY29udGFpbmVyLnN0eWxlLm1heFdpZHRoID0gXCI2MDBweFwiO1xuICAgICAgICBwb3B1cC5jb250YWluZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgcG9wdXAuY29udGFpbmVyLnN0eWxlLm1hcmdpblRvcCA9IFwiM3B4XCI7XG4gICAgICAgIHBvcHVwLnJlbmRlcmVyLnNldFNjcm9sbE1hcmdpbigyLCAyLCAwLCAwKTtcbiAgICAgICAgcG9wdXAuYXV0b1NlbGVjdCA9IGZhbHNlO1xuICAgICAgICBwb3B1cC5yZW5kZXJlci4kbWF4TGluZXMgPSAxNTtcbiAgICAgICAgcG9wdXAuc2V0Um93KC0xKTtcbiAgICAgICAgcG9wdXAub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHBvcHVwLmdldERhdGEocG9wdXAuZ2V0Um93KCkpO1xuICAgICAgICAgICAgaWYgKCFkYXRhW1wiZXJyb3JcIl0pIHtcbiAgICAgICAgICAgICAgICBjbWRMaW5lLnNldFZhbHVlKGRhdGEudmFsdWUgfHwgZGF0YVtcIm5hbWVcIl0gfHwgZGF0YSk7XG4gICAgICAgICAgICAgICAgYWNjZXB0KCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBlbC5hcHBlbmRDaGlsZChwb3B1cC5jb250YWluZXIpO1xuICAgICAgICB1cGRhdGVDb21wbGV0aW9ucygpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLiRydWxlcykge1xuICAgICAgICB2YXIgdG9rZW5pemVyID0gbmV3IFRva2VuaXplcihvcHRpb25zLiRydWxlcyk7XG4gICAgICAgIGNtZExpbmUuc2Vzc2lvbi5iZ1Rva2VuaXplci5zZXRUb2tlbml6ZXIodG9rZW5pemVyKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5wbGFjZWhvbGRlcikge1xuICAgICAgICBjbWRMaW5lLnNldE9wdGlvbihcInBsYWNlaG9sZGVyXCIsIG9wdGlvbnMucGxhY2Vob2xkZXIpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmhhc0Rlc2NyaXB0aW9uKSB7XG4gICAgICAgIC8qKkB0eXBlIHthbnl9Ki9cbiAgICAgICAgdmFyIHByb21wdFRleHRDb250YWluZXIgPSBkb20uYnVpbGREb20oW1wiZGl2XCIsIHtjbGFzczogXCJhY2VfcHJvbXB0X3RleHRfY29udGFpbmVyXCJ9XSk7XG4gICAgICAgIGRvbS5idWlsZERvbShvcHRpb25zLnByb21wdCB8fCBcIlByZXNzICdFbnRlcicgdG8gY29uZmlybSBvciAnRXNjYXBlJyB0byBjYW5jZWxcIiwgcHJvbXB0VGV4dENvbnRhaW5lcik7XG4gICAgICAgIGVsLmFwcGVuZENoaWxkKHByb21wdFRleHRDb250YWluZXIpO1xuICAgIH1cblxuICAgIG92ZXJsYXkuc2V0SWdub3JlRm9jdXNPdXQob3B0aW9ucy5pZ25vcmVGb2N1c091dCk7XG5cbiAgICBmdW5jdGlvbiBhY2NlcHQoKSB7XG4gICAgICAgIHZhciB2YWw7XG4gICAgICAgIGlmIChwb3B1cCAmJiBwb3B1cC5nZXRDdXJzb3JQb3NpdGlvbigpLnJvdyA+IDApIHtcbiAgICAgICAgICAgIHZhbCA9IHZhbHVlRnJvbVJlY2VudExpc3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbCA9IGNtZExpbmUuZ2V0VmFsdWUoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY3VyRGF0YSA9IHBvcHVwID8gcG9wdXAuZ2V0RGF0YShwb3B1cC5nZXRSb3coKSkgOiB2YWw7XG4gICAgICAgIGlmIChjdXJEYXRhICYmICFjdXJEYXRhW1wiZXJyb3JcIl0pIHtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIG9wdGlvbnMub25BY2NlcHQgJiYgb3B0aW9ucy5vbkFjY2VwdCh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbCxcbiAgICAgICAgICAgICAgICBpdGVtOiBjdXJEYXRhXG4gICAgICAgICAgICB9LCBjbWRMaW5lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBrZXlzID0ge1xuICAgICAgICBcIkVudGVyXCI6IGFjY2VwdCxcbiAgICAgICAgXCJFc2N8U2hpZnQtRXNjXCI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgb3B0aW9ucy5vbkNhbmNlbCAmJiBvcHRpb25zLm9uQ2FuY2VsKGNtZExpbmUuZ2V0VmFsdWUoKSwgY21kTGluZSk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHBvcHVwKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oa2V5cywge1xuICAgICAgICAgICAgXCJVcFwiOiBmdW5jdGlvbihlZGl0b3IpIHsgcG9wdXAuZ29UbyhcInVwXCIpOyB2YWx1ZUZyb21SZWNlbnRMaXN0KCk7fSxcbiAgICAgICAgICAgIFwiRG93blwiOiBmdW5jdGlvbihlZGl0b3IpIHsgcG9wdXAuZ29UbyhcImRvd25cIik7IHZhbHVlRnJvbVJlY2VudExpc3QoKTt9LFxuICAgICAgICAgICAgXCJDdHJsLVVwfEN0cmwtSG9tZVwiOiBmdW5jdGlvbihlZGl0b3IpIHsgcG9wdXAuZ29UbyhcInN0YXJ0XCIpOyB2YWx1ZUZyb21SZWNlbnRMaXN0KCk7fSxcbiAgICAgICAgICAgIFwiQ3RybC1Eb3dufEN0cmwtRW5kXCI6IGZ1bmN0aW9uKGVkaXRvcikgeyBwb3B1cC5nb1RvKFwiZW5kXCIpOyB2YWx1ZUZyb21SZWNlbnRMaXN0KCk7fSxcbiAgICAgICAgICAgIFwiVGFiXCI6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgICAgIHBvcHVwLmdvVG8oXCJkb3duXCIpOyB2YWx1ZUZyb21SZWNlbnRMaXN0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJQYWdlVXBcIjogZnVuY3Rpb24oZWRpdG9yKSB7IHBvcHVwLmdvdG9QYWdlVXAoKTsgdmFsdWVGcm9tUmVjZW50TGlzdCgpO30sXG4gICAgICAgICAgICBcIlBhZ2VEb3duXCI6IGZ1bmN0aW9uKGVkaXRvcikgeyBwb3B1cC5nb3RvUGFnZURvd24oKTsgdmFsdWVGcm9tUmVjZW50TGlzdCgpO31cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY21kTGluZS5jb21tYW5kcy5iaW5kS2V5cyhrZXlzKTtcblxuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICAgIG92ZXJsYXkuY2xvc2UoKTtcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICAgICAgb3BlblByb21wdCA9IG51bGw7XG4gICAgfVxuXG4gICAgY21kTGluZS5vbihcImlucHV0XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBvcHRpb25zLm9uSW5wdXQgJiYgb3B0aW9ucy5vbklucHV0KCk7XG4gICAgICAgIHVwZGF0ZUNvbXBsZXRpb25zKCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVDb21wbGV0aW9ucygpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZ2V0Q29tcGxldGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBwcmVmaXg7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5nZXRQcmVmaXgpIHtcbiAgICAgICAgICAgICAgICBwcmVmaXggPSBvcHRpb25zLmdldFByZWZpeChjbWRMaW5lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25zID0gb3B0aW9ucy5nZXRDb21wbGV0aW9ucyhjbWRMaW5lKTtcbiAgICAgICAgICAgIHBvcHVwLnNldERhdGEoY29tcGxldGlvbnMsIHByZWZpeCk7XG4gICAgICAgICAgICBwb3B1cC5yZXNpemUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWx1ZUZyb21SZWNlbnRMaXN0KCkge1xuICAgICAgICB2YXIgY3VycmVudCA9IHBvcHVwLmdldERhdGEocG9wdXAuZ2V0Um93KCkpO1xuICAgICAgICBpZiAoY3VycmVudCAmJiAhY3VycmVudFtcImVycm9yXCJdKVxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQudmFsdWUgfHwgY3VycmVudC5jYXB0aW9uIHx8IGN1cnJlbnQ7XG4gICAgfVxuXG4gICAgY21kTGluZS5yZXNpemUodHJ1ZSk7XG4gICAgaWYgKHBvcHVwKSB7XG4gICAgICAgIHBvcHVwLnJlc2l6ZSh0cnVlKTtcbiAgICB9XG4gICAgY21kTGluZS5mb2N1cygpO1xuXG4gICAgb3BlblByb21wdCA9IHtcbiAgICAgICAgY2xvc2U6IGRvbmUsXG4gICAgICAgIG5hbWU6IG9wdGlvbnMubmFtZSxcbiAgICAgICAgZWRpdG9yOiBlZGl0b3JcbiAgICB9O1xufVxuXG4vKipcbiAqIERpc3BsYXlzIGEgXCJHbyB0byBMaW5lXCIgcHJvbXB0IGZvciBuYXZpZ2F0aW5nIHRvIHNwZWNpZmljIGxpbmUgYW5kIGNvbHVtbiBwb3NpdGlvbnMgd2l0aCBzZWxlY3Rpb24gc3VwcG9ydC5cbiAqXG4gKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yIC0gVGhlIGVkaXRvciBpbnN0YW5jZSB0byBuYXZpZ2F0ZSB3aXRoaW5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja11cbiAqL1xucHJvbXB0LmdvdG9MaW5lID0gZnVuY3Rpb24oZWRpdG9yLCBjYWxsYmFjaykge1xuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeVNlbGVjdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHNlbGVjdGlvbikpXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSBbc2VsZWN0aW9uXTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbi5tYXAoZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IHIuaXNCYWNrd2FyZHMgPyByLnN0YXJ0OiByLmVuZDtcbiAgICAgICAgICAgIHZhciBhbmNob3IgPSByLmlzQmFja3dhcmRzID8gci5lbmQ6IHIuc3RhcnQ7XG4gICAgICAgICAgICB2YXIgcm93ID0gYW5jaG9yLnJvdztcbiAgICAgICAgICAgIHZhciBzID0gKHJvdyArIDEpICsgXCI6XCIgKyBhbmNob3IuY29sdW1uO1xuXG4gICAgICAgICAgICBpZiAoYW5jaG9yLnJvdyA9PSBjdXJzb3Iucm93KSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuY2hvci5jb2x1bW4gIT0gY3Vyc29yLmNvbHVtbilcbiAgICAgICAgICAgICAgICAgICAgcyArPSBcIj5cIiArIFwiOlwiICsgY3Vyc29yLmNvbHVtbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcyArPSBcIj5cIiArIChjdXJzb3Iucm93ICsgMSkgKyBcIjpcIiArIGN1cnNvci5jb2x1bW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfSkucmV2ZXJzZSgpLmpvaW4oXCIsIFwiKTtcbiAgICB9XG5cbiAgICBwcm9tcHQoZWRpdG9yLCBcIjpcIiArIHN0cmluZ2lmeVNlbGVjdGlvbihlZGl0b3Iuc2VsZWN0aW9uLnRvSlNPTigpKSwge1xuICAgICAgICBuYW1lOiBcImdvdG9MaW5lXCIsXG4gICAgICAgIHNlbGVjdGlvbjogWzEsIE51bWJlci5NQVhfVkFMVUVdLFxuICAgICAgICBvbkFjY2VwdDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gZGF0YS52YWx1ZTtcbiAgICAgICAgICAgIHZhciBfaGlzdG9yeSA9IHByb21wdC5nb3RvTGluZVtcIl9oaXN0b3J5XCJdO1xuICAgICAgICAgICAgaWYgKCFfaGlzdG9yeSlcbiAgICAgICAgICAgICAgICBwcm9tcHQuZ290b0xpbmVbXCJfaGlzdG9yeVwiXSA9IF9oaXN0b3J5ID0gW107XG4gICAgICAgICAgICBpZiAoX2hpc3RvcnkuaW5kZXhPZih2YWx1ZSkgIT0gLTEpXG4gICAgICAgICAgICAgICAgX2hpc3Rvcnkuc3BsaWNlKF9oaXN0b3J5LmluZGV4T2YodmFsdWUpLCAxKTtcbiAgICAgICAgICAgIF9oaXN0b3J5LnVuc2hpZnQodmFsdWUpO1xuICAgICAgICAgICAgaWYgKF9oaXN0b3J5Lmxlbmd0aCA+IDIwKSBfaGlzdG9yeS5sZW5ndGggPSAyMDtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgcG9zID0gZWRpdG9yLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgICAgICB2YXIgcmFuZ2VzID0gW107XG4gICAgICAgICAgICB2YWx1ZS5yZXBsYWNlKC9eOi8sIFwiXCIpLnNwbGl0KC8sLykubWFwKGZ1bmN0aW9uKHN0cikge1xuICAgICAgICAgICAgICAgIHZhciBwYXJ0cyA9IHN0ci5zcGxpdCgvKFs8PjorLV18Yz9cXGQrKXxbXmNcXGQ8PjorLV0rLykuZmlsdGVyKEJvb2xlYW4pO1xuICAgICAgICAgICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiByZWFkUG9zaXRpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjID0gcGFydHNbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjKSByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIGlmIChjWzBdID09IFwiY1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSBwYXJzZUludChjLnNsaWNlKDEpKSB8fCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVkaXRvci5zZXNzaW9uLmRvYy5pbmRleFRvUG9zaXRpb24oaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciByb3cgPSBwb3Mucm93O1xuICAgICAgICAgICAgICAgICAgICB2YXIgY29sdW1uID0gMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKC9cXGQvLnRlc3QoYykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdyA9IHBhcnNlSW50KGMpIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBwYXJ0c1tpKytdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChjID09IFwiOlwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gcGFydHNbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgvXFxkLy50ZXN0KGMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sdW1uID0gcGFyc2VJbnQoYykgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4ge3Jvdzogcm93LCBjb2x1bW46IGNvbHVtbn07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBvcyA9IHJlYWRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIHZhciByYW5nZSA9IFJhbmdlLmZyb21Qb2ludHMocG9zLCBwb3MpO1xuICAgICAgICAgICAgICAgIGlmIChwYXJ0c1tpXSA9PSBcIj5cIikge1xuICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLmVuZCA9IHJlYWRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChwYXJ0c1tpXSA9PSBcIjxcIikge1xuICAgICAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgICAgICAgIHJhbmdlLnN0YXJ0ID0gcmVhZFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJhbmdlcy51bnNoaWZ0KHJhbmdlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5mcm9tSlNPTihyYW5nZXMpO1xuICAgICAgICAgICAgdmFyIHNjcm9sbFRvcCA9IGVkaXRvci5yZW5kZXJlci5zY3JvbGxUb3A7XG4gICAgICAgICAgICBlZGl0b3IucmVuZGVyZXIuc2Nyb2xsU2VsZWN0aW9uSW50b1ZpZXcoXG4gICAgICAgICAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5hbmNob3IsIFxuICAgICAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uY3Vyc29yLCBcbiAgICAgICAgICAgICAgICAwLjVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBlZGl0b3IucmVuZGVyZXIuYW5pbWF0ZVNjcm9sbGluZyhzY3JvbGxUb3ApO1xuICAgICAgICB9LFxuICAgICAgICBoaXN0b3J5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghcHJvbXB0LmdvdG9MaW5lW1wiX2hpc3RvcnlcIl0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgcmV0dXJuIHByb21wdC5nb3RvTGluZVtcIl9oaXN0b3J5XCJdO1xuXG4gICAgICAgIH0sXG4gICAgICAgIGdldENvbXBsZXRpb25zOiBmdW5jdGlvbihjbWRMaW5lKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBjbWRMaW5lLmdldFZhbHVlKCk7XG4gICAgICAgICAgICB2YXIgbSA9IHZhbHVlLnJlcGxhY2UoL146LywgXCJcIikuc3BsaXQoXCI6XCIpO1xuICAgICAgICAgICAgdmFyIHJvdyA9IE1hdGgubWluKHBhcnNlSW50KG1bMF0pIHx8IDEsIGVkaXRvci5zZXNzaW9uLmdldExlbmd0aCgpKSAtIDE7XG4gICAgICAgICAgICB2YXIgbGluZSA9IGVkaXRvci5zZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gdmFsdWUgKyBcIiAgXCIgKyBsaW5lO1xuICAgICAgICAgICAgcmV0dXJuIFtjdXJyZW50XS5jb25jYXQodGhpcy5oaXN0b3J5KCkpO1xuICAgICAgICB9LFxuICAgICAgICAkcnVsZXM6IHtcbiAgICAgICAgICAgIHN0YXJ0OiBbe1xuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxkKy8sXG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByZWdleDogL1s6LD48K1xcLWNdLyxcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbi8qKlxuICogRGlzcGxheXMgYSBzZWFyY2hhYmxlIGNvbW1hbmQgcGFsZXR0ZSBmb3IgZXhlY3V0aW5nIGVkaXRvciBjb21tYW5kcyB3aXRoIGtleWJvYXJkIHNob3J0Y3V0cyBhbmQgaGlzdG9yeS5cbiAqXG4gKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yIC0gVGhlIGVkaXRvciBpbnN0YW5jZSB0byBleGVjdXRlIGNvbW1hbmRzIG9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdXG4gKi9cbnByb21wdC5jb21tYW5kcyA9IGZ1bmN0aW9uKGVkaXRvciwgY2FsbGJhY2spIHtcbiAgICBmdW5jdGlvbiBub3JtYWxpemVOYW1lKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIChuYW1lIHx8IFwiXCIpLnJlcGxhY2UoL14uLywgZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgcmV0dXJuIHgudG9VcHBlckNhc2UoeCk7XG4gICAgICAgIH0pLnJlcGxhY2UoL1thLXpdW0EtWl0vZywgZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgcmV0dXJuIHhbMF0gKyBcIiBcIiArIHhbMV0udG9Mb3dlckNhc2UoeCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRFZGl0b3JDb21tYW5kc0J5TmFtZShleGNsdWRlQ29tbWFuZHMpIHtcbiAgICAgICAgdmFyIGNvbW1hbmRzQnlOYW1lID0gW107XG4gICAgICAgIHZhciBjb21tYW5kTWFwID0ge307XG4gICAgICAgIGVkaXRvci5rZXlCaW5kaW5nLiRoYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHZhciBwbGF0Zm9ybSA9IGhhbmRsZXJbXCJwbGF0Zm9ybVwiXTtcbiAgICAgICAgICAgIHZhciBjYm4gPSBoYW5kbGVyW1wiYnlOYW1lXCJdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBjYm4pIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gY2JuW2ldLmJpbmRLZXk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5ID0ga2V5ICYmIGtleVtwbGF0Zm9ybV0gfHwgXCJcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGNvbW1hbmRzID0gY2JuW2ldO1xuICAgICAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IGNvbW1hbmRzLmRlc2NyaXB0aW9uIHx8IG5vcm1hbGl6ZU5hbWUoY29tbWFuZHMubmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbW1hbmRzKSlcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZHMgPSBbY29tbWFuZHNdO1xuICAgICAgICAgICAgICAgIGNvbW1hbmRzLmZvckVhY2goZnVuY3Rpb24oY29tbWFuZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbW1hbmQgIT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBjb21tYW5kLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZWVkbGUgPSBleGNsdWRlQ29tbWFuZHMuZmluZChmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsID09PSBjb21tYW5kO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZWVkbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21tYW5kTWFwW2NvbW1hbmRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZE1hcFtjb21tYW5kXS5rZXkgKz0gXCJ8XCIgKyBrZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmRNYXBbY29tbWFuZF0gPSB7a2V5OiBrZXksIGNvbW1hbmQ6IGNvbW1hbmQsIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbn07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZHNCeU5hbWUucHVzaChjb21tYW5kTWFwW2NvbW1hbmRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvbW1hbmRzQnlOYW1lO1xuICAgIH1cbiAgICAvLyBleGNsdWRlIGNvbW1hbmRzIHRoYXQgY2FuIG5vdCBiZSBleGVjdXRlZCB3aXRob3V0IGFyZ3NcbiAgICB2YXIgZXhjbHVkZUNvbW1hbmRzTGlzdCA9IFtcImluc2VydHN0cmluZ1wiLCBcImluc2VydHRleHRcIiwgXCJzZXRJbmRlbnRhdGlvblwiLCBcInBhc3RlXCJdO1xuICAgIHZhciBzaG9ydGN1dHNBcnJheSA9IGdldEVkaXRvckNvbW1hbmRzQnlOYW1lKGV4Y2x1ZGVDb21tYW5kc0xpc3QpO1xuICAgIHNob3J0Y3V0c0FycmF5ID0gc2hvcnRjdXRzQXJyYXkubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHt2YWx1ZTogaXRlbS5kZXNjcmlwdGlvbiwgbWV0YTogaXRlbS5rZXksIGNvbW1hbmQ6IGl0ZW0uY29tbWFuZH07XG4gICAgfSk7XG4gICAgcHJvbXB0KGVkaXRvciwgXCJcIiwgIHtcbiAgICAgICAgbmFtZTogXCJjb21tYW5kc1wiLFxuICAgICAgICBzZWxlY3Rpb246IFswLCBOdW1iZXIuTUFYX1ZBTFVFXSxcbiAgICAgICAgbWF4SGlzdG9yeUNvdW50OiA1LFxuICAgICAgICBvbkFjY2VwdDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaXRlbSkge1xuICAgICAgICAgICAgICAgIHZhciBjb21tYW5kTmFtZSA9IGRhdGEuaXRlbS5jb21tYW5kO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9IaXN0b3J5KGRhdGEuaXRlbSk7XG5cbiAgICAgICAgICAgICAgICBlZGl0b3IuZXhlY0NvbW1hbmQoY29tbWFuZE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhZGRUb0hpc3Rvcnk6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBoaXN0b3J5ID0gdGhpcy5oaXN0b3J5KCk7XG4gICAgICAgICAgICBoaXN0b3J5LnVuc2hpZnQoaXRlbSk7XG4gICAgICAgICAgICBkZWxldGUgaXRlbS5tZXNzYWdlO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBoaXN0b3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhpc3RvcnlbaV1bXCJjb21tYW5kXCJdID09IGl0ZW0uY29tbWFuZCApIHtcbiAgICAgICAgICAgICAgICAgICAgaGlzdG9yeS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm1heEhpc3RvcnlDb3VudCA+IDAgJiYgaGlzdG9yeS5sZW5ndGggPiB0aGlzLm1heEhpc3RvcnlDb3VudCkge1xuICAgICAgICAgICAgICAgIGhpc3Rvcnkuc3BsaWNlKGhpc3RvcnkubGVuZ3RoIC0gMSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9tcHQuY29tbWFuZHNbXCJoaXN0b3J5XCJdID0gaGlzdG9yeTtcbiAgICAgICAgfSxcbiAgICAgICAgaGlzdG9yeTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbXB0LmNvbW1hbmRzW1wiaGlzdG9yeVwiXSB8fCBbXTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UHJlZml4OiBmdW5jdGlvbihjbWRMaW5lKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudFBvcyA9IGNtZExpbmUuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBmaWx0ZXJWYWx1ZSA9IGNtZExpbmUuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJWYWx1ZS5zdWJzdHJpbmcoMCwgY3VycmVudFBvcy5jb2x1bW4pO1xuICAgICAgICB9LFxuICAgICAgICBnZXRDb21wbGV0aW9uczogZnVuY3Rpb24oY21kTGluZSkge1xuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0RmlsdGVyZWRDb21wbGV0aW9ucyhjb21tYW5kcywgcHJlZml4KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdENvbW1hbmRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShjb21tYW5kcykpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGZpbHRlcmVkID0gbmV3IEZpbHRlcmVkTGlzdChyZXN1bHRDb21tYW5kcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkLmZpbHRlckNvbXBsZXRpb25zKHJlc3VsdENvbW1hbmRzLCBwcmVmaXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRVbmlxdWVDb21tYW5kTGlzdChjb21tYW5kcywgdXNlZENvbW1hbmRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF1c2VkQ29tbWFuZHMgfHwgIXVzZWRDb21tYW5kcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNvbW1hbmRzO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgZXhjbHVkZUNvbW1hbmRzID0gW107XG4gICAgICAgICAgICAgICAgdXNlZENvbW1hbmRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBleGNsdWRlQ29tbWFuZHMucHVzaChpdGVtLmNvbW1hbmQpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdENvbW1hbmRzID0gW107XG5cbiAgICAgICAgICAgICAgICBjb21tYW5kcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4Y2x1ZGVDb21tYW5kcy5pbmRleE9mKGl0ZW0uY29tbWFuZCkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHRDb21tYW5kcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0Q29tbWFuZHM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwcmVmaXggPSB0aGlzLmdldFByZWZpeChjbWRMaW5lKTtcbiAgICAgICAgICAgIHZhciByZWNlbnRseVVzZWRDb21tYW5kcyA9IGdldEZpbHRlcmVkQ29tcGxldGlvbnModGhpcy5oaXN0b3J5KCksIHByZWZpeCk7XG4gICAgICAgICAgICB2YXIgb3RoZXJDb21tYW5kcyA9IGdldFVuaXF1ZUNvbW1hbmRMaXN0KHNob3J0Y3V0c0FycmF5LCByZWNlbnRseVVzZWRDb21tYW5kcyk7XG4gICAgICAgICAgICBvdGhlckNvbW1hbmRzID0gZ2V0RmlsdGVyZWRDb21wbGV0aW9ucyhvdGhlckNvbW1hbmRzLCBwcmVmaXgpO1xuXG4gICAgICAgICAgICBpZiAocmVjZW50bHlVc2VkQ29tbWFuZHMubGVuZ3RoICYmIG90aGVyQ29tbWFuZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmVjZW50bHlVc2VkQ29tbWFuZHNbMF0ubWVzc2FnZSA9IG5scyhcInByb21wdC5yZWNlbnRseS11c2VkXCIsIFwiUmVjZW50bHkgdXNlZFwiKTtcbiAgICAgICAgICAgICAgICBvdGhlckNvbW1hbmRzWzBdLm1lc3NhZ2UgPSBubHMoXCJwcm9tcHQub3RoZXItY29tbWFuZHNcIiwgXCJPdGhlciBjb21tYW5kc1wiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25zID0gcmVjZW50bHlVc2VkQ29tbWFuZHMuY29uY2F0KG90aGVyQ29tbWFuZHMpO1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBsZXRpb25zLmxlbmd0aCA+IDAgPyBjb21wbGV0aW9ucyA6IFt7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5scyhcInByb21wdC5uby1tYXRjaGluZy1jb21tYW5kc1wiLCBcIk5vIG1hdGNoaW5nIGNvbW1hbmRzXCIpLFxuICAgICAgICAgICAgICAgIGVycm9yOiAxXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBTaG93cyBhbiBpbnRlcmFjdGl2ZSBwcm9tcHQgY29udGFpbmluZyBhbGwgYXZhaWxhYmxlIHN5bnRheCBoaWdobGlnaHRpbmcgbW9kZXNcbiAqIHRoYXQgY2FuIGJlIGFwcGxpZWQgdG8gdGhlIGVkaXRvciBzZXNzaW9uLiBVc2VycyBjYW4gdHlwZSB0byBmaWx0ZXIgdGhyb3VnaCB0aGUgbW9kZXMgbGlzdFxuICogYW5kIHNlbGVjdCBvbmUgdG8gY2hhbmdlIHRoZSBlZGl0b3IncyBzeW50YXggaGlnaGxpZ2h0aW5nIG1vZGUuIFRoZSBwcm9tcHQgaW5jbHVkZXMgcmVhbC10aW1lXG4gKiBmaWx0ZXJpbmcgYmFzZWQgb24gbW9kZSBuYW1lcyBhbmQgY2FwdGlvbnMuXG4gKlxuICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvciAtIFRoZSBlZGl0b3IgaW5zdGFuY2UgdG8gY2hhbmdlIHRoZSBsYW5ndWFnZSBtb2RlIGZvclxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXVxuICovXG5cbnByb21wdC5tb2RlcyA9IGZ1bmN0aW9uKGVkaXRvciwgY2FsbGJhY2spIHtcbiAgICAvKipAdHlwZSB7YW55W119Ki9cbiAgICB2YXIgbW9kZXNBcnJheSA9IG1vZGVsaXN0Lm1vZGVzO1xuICAgIG1vZGVzQXJyYXkgPSBtb2Rlc0FycmF5Lm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHJldHVybiB7dmFsdWU6IGl0ZW0uY2FwdGlvbiwgbW9kZTogaXRlbS5uYW1lfTtcbiAgICB9KTtcbiAgICBwcm9tcHQoZWRpdG9yLCBcIlwiLCAge1xuICAgICAgICBuYW1lOiBcIm1vZGVzXCIsXG4gICAgICAgIHNlbGVjdGlvbjogWzAsIE51bWJlci5NQVhfVkFMVUVdLFxuICAgICAgICBvbkFjY2VwdDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaXRlbSkge1xuICAgICAgICAgICAgICAgIHZhciBtb2RlTmFtZSA9IFwiYWNlL21vZGUvXCIgKyBkYXRhLml0ZW0ubW9kZTtcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2Vzc2lvbi5zZXRNb2RlKG1vZGVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UHJlZml4OiBmdW5jdGlvbihjbWRMaW5lKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudFBvcyA9IGNtZExpbmUuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBmaWx0ZXJWYWx1ZSA9IGNtZExpbmUuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJWYWx1ZS5zdWJzdHJpbmcoMCwgY3VycmVudFBvcy5jb2x1bW4pO1xuICAgICAgICB9LFxuICAgICAgICBnZXRDb21wbGV0aW9uczogZnVuY3Rpb24oY21kTGluZSkge1xuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0RmlsdGVyZWRDb21wbGV0aW9ucyhtb2RlcywgcHJlZml4KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdENvbW1hbmRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtb2RlcykpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGZpbHRlcmVkID0gbmV3IEZpbHRlcmVkTGlzdChyZXN1bHRDb21tYW5kcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkLmZpbHRlckNvbXBsZXRpb25zKHJlc3VsdENvbW1hbmRzLCBwcmVmaXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcHJlZml4ID0gdGhpcy5nZXRQcmVmaXgoY21kTGluZSk7XG4gICAgICAgICAgICB2YXIgY29tcGxldGlvbnMgPSBnZXRGaWx0ZXJlZENvbXBsZXRpb25zKG1vZGVzQXJyYXksIHByZWZpeCk7XG4gICAgICAgICAgICByZXR1cm4gY29tcGxldGlvbnMubGVuZ3RoID4gMCA/IGNvbXBsZXRpb25zIDogW3tcbiAgICAgICAgICAgICAgICBcImNhcHRpb25cIjogXCJObyBtb2RlIG1hdGNoaW5nXCIsXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIk5vIG1vZGUgbWF0Y2hpbmdcIixcbiAgICAgICAgICAgICAgICBcImVycm9yXCI6IDFcbiAgICAgICAgICAgIH1dO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5kb20uaW1wb3J0Q3NzU3RyaW5nKGAuYWNlX3Byb21wdF9jb250YWluZXIge1xuICAgIG1heC13aWR0aDogNjAzcHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiAyMHB4IGF1dG87XG4gICAgcGFkZGluZzogM3B4O1xuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBib3gtc2hhZG93OiAwcHggMnB4IDNweCAwcHggIzU1NTtcbn1gLCBcInByb210cC5jc3NcIiwgZmFsc2UpO1xuXG5cbmV4cG9ydHMucHJvbXB0ID0gcHJvbXB0O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9