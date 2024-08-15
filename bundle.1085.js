(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1085,1772],{

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
    Assembly_ARM32:["s"],
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

/***/ 71085:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
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
 * @property {[start: number, end: number]} selection  Defines which part of the predefined value should be highlited.
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
 * 
 * @param {Editor} editor
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
 * 
 * @param {Editor} editor
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
 *
 * @param {Editor} editor
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWMsTUFBTTtBQUNwQjtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRCxjQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L21lbnVfdG9vbHMvb3ZlcmxheV9wYWdlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tZW51X3Rvb2xzL3NldHRpbmdzX21lbnUuY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tb2RlbGlzdC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvcHJvbXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qanNsaW50IGluZGVudDogNCwgbWF4ZXJyOiA1MCwgd2hpdGU6IHRydWUsIGJyb3dzZXI6IHRydWUsIHZhcnM6IHRydWUqL1xuLypnbG9iYWwgZGVmaW5lLCByZXF1aXJlICovXG5cbi8qKlxuICogT3ZlcmxheSBQYWdlXG4gKiBAZmlsZU92ZXJ2aWV3IE92ZXJsYXkgUGFnZSA8YnIgLz5cbiAqIEdlbmVyYXRlcyBhbiBvdmVybGF5IGZvciBkaXNwbGF5aW5nIG1lbnVzLiBUaGUgb3ZlcmxheSBpcyBhbiBhYnNvbHV0ZWx5XG4gKiAgcG9zaXRpb25lZCBkaXYuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICovXG5cbid1c2Ugc3RyaWN0JztcbnZhciBkb20gPSByZXF1aXJlKFwiLi4vLi4vbGliL2RvbVwiKTtcbnZhciBjc3NUZXh0ID0gcmVxdWlyZShcIi4vc2V0dGluZ3NfbWVudS5jc3NcIik7XG5kb20uaW1wb3J0Q3NzU3RyaW5nKGNzc1RleHQsIFwic2V0dGluZ3NfbWVudS5jc3NcIiwgZmFsc2UpO1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhbiBvdmVybGF5IGZvciBkaXNwbGF5aW5nIG1lbnVzLiBUaGUgb3ZlcmxheSBpcyBhbiBhYnNvbHV0ZWx5XG4gKiAgcG9zaXRpb25lZCBkaXYuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHBhcmFtIGVkaXRvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGVudEVsZW1lbnQgQW55IGVsZW1lbnQgd2hpY2ggbWF5IGJlIHByZXNlbnRlZCBpbnNpZGVcbiAqICBhIGRpdi5cbiAqIEBwYXJhbSBbY2FsbGJhY2tdXG4gKi9cbm1vZHVsZS5leHBvcnRzLm92ZXJsYXlQYWdlID0gZnVuY3Rpb24gb3ZlcmxheVBhZ2UoZWRpdG9yLCBjb250ZW50RWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICB2YXIgY2xvc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGlnbm9yZUZvY3VzT3V0ID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkb2N1bWVudEVzY0xpc3RlbmVyKGUpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgaWYgKCFjbG9zZXIpIHJldHVybjtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGRvY3VtZW50RXNjTGlzdGVuZXIpO1xuICAgICAgICBjbG9zZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjbG9zZXIpO1xuICAgICAgICBpZiAoZWRpdG9yKSB7XG4gICAgICAgICAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBjbG9zZXIgPSBudWxsO1xuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgb3ZlcmxheSBpcyBjbG9zZWQgd2hlbiB1c2VyIGNsaWNrcyBvdXRzaWRlIG9mIGl0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaWdub3JlICAgICAgSWYgc2V0IHRvIHRydWUgb3ZlcmxheSBzdGF5cyBvcGVuIHdoZW4gZm9jdXMgbW92ZXMgdG8gYW5vdGhlciBwYXJ0IG9mIHRoZSBlZGl0b3IuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0SWdub3JlRm9jdXNPdXQoaWdub3JlKSB7XG4gICAgICAgIGlnbm9yZUZvY3VzT3V0ID0gaWdub3JlO1xuICAgICAgICBpZiAoaWdub3JlKSB7XG4gICAgICAgICAgICBjbG9zZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgICAgY29udGVudEVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VyLnN0eWxlLmNzc1RleHQgPSAnbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyAnICtcbiAgICAgICAgJ3Bvc2l0aW9uOiBmaXhlZDsgdG9wOjA7IGJvdHRvbTowOyBsZWZ0OjA7IHJpZ2h0OjA7JyArXG4gICAgICAgICd6LWluZGV4OiA5OTkwOyAnICtcbiAgICAgICAgKGVkaXRvciA/ICdiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7JyA6ICcnKTtcbiAgICBjbG9zZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghaWdub3JlRm9jdXNPdXQpIHtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBjbGljayBjbG9zZXIgaWYgZXNjIGtleSBpcyBwcmVzc2VkXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGRvY3VtZW50RXNjTGlzdGVuZXIpO1xuXG4gICAgY29udGVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgY2xvc2VyLmFwcGVuZENoaWxkKGNvbnRlbnRFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNsb3Nlcik7XG4gICAgaWYgKGVkaXRvcikge1xuICAgICAgICBlZGl0b3IuYmx1cigpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBjbG9zZTogY2xvc2UsXG4gICAgICAgIHNldElnbm9yZUZvY3VzT3V0OiBzZXRJZ25vcmVGb2N1c091dFxuICAgIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBgI2FjZV9zZXR0aW5nc21lbnUsICNrYnNob3J0Y3V0bWVudSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0Y3RjdGNztcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgYm94LXNoYWRvdzogLTVweCA0cHggNXB4IHJnYmEoMTI2LCAxMjYsIDEyNiwgMC41NSk7XG4gICAgcGFkZGluZzogMWVtIDAuNWVtIDJlbSAxZW07XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG1hcmdpbjogMDtcbiAgICBib3R0b206IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgdG9wOiAwO1xuICAgIHotaW5kZXg6IDk5OTE7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4uYWNlX2RhcmsgI2FjZV9zZXR0aW5nc21lbnUsIC5hY2VfZGFyayAja2JzaG9ydGN1dG1lbnUge1xuICAgIGJveC1zaGFkb3c6IC0yMHB4IDEwcHggMjVweCByZ2JhKDEyNiwgMTI2LCAxMjYsIDAuMjUpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcbiAgICBjb2xvcjogYmxhY2s7XG59XG5cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeTpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMDAsIDEwMCwgMTAwLCAwLjEpO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzXG59XG5cbi5hY2VfY2xvc2VCdXR0b24ge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjQ1LCAxNDYsIDE0NiwgMC41KTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRjQ4QThBO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBwYWRkaW5nOiA3cHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAtOHB4O1xuICAgIHRvcDogLThweDtcbiAgICB6LWluZGV4OiAxMDAwMDA7XG59XG4uYWNlX2Nsb3NlQnV0dG9ue1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjQ1LCAxNDYsIDE0NiwgMC45KTtcbn1cbi5hY2Vfb3B0aW9uc01lbnVLZXkge1xuICAgIGNvbG9yOiBkYXJrc2xhdGVibHVlO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuLmFjZV9vcHRpb25zTWVudUNvbW1hbmQge1xuICAgIGNvbG9yOiBkYXJrY3lhbjtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGlucHV0LCAuYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uIHtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuXG4uYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uW2FjZV9zZWxlY3RlZF9idXR0b249dHJ1ZV0ge1xuICAgIGJhY2tncm91bmQ6ICNlN2U3ZTc7XG4gICAgYm94LXNoYWRvdzogMXB4IDBweCAycHggMHB4ICNhZGFkYWQgaW5zZXQ7XG4gICAgYm9yZGVyLWNvbG9yOiAjYWRhZGFkO1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICAgIG1hcmdpbjogMHB4O1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvbjpob3ZlcntcbiAgICBiYWNrZ3JvdW5kOiAjZjBmMGYwO1xufWA7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1vZGVzID0gW107XG4vKipcbiAqIFN1Z2dlc3RzIGEgbW9kZSBiYXNlZCBvbiB0aGUgZmlsZSBleHRlbnNpb24gcHJlc2VudCBpbiB0aGUgZ2l2ZW4gcGF0aFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gdGhlIGZpbGVcbiAqIEByZXR1cm5zIHtNb2RlfSBSZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZVxuICogIHN1Z2dlc3RlZCBtb2RlLlxuICovXG5mdW5jdGlvbiBnZXRNb2RlRm9yUGF0aChwYXRoKSB7XG4gICAgdmFyIG1vZGUgPSBtb2Rlc0J5TmFtZS50ZXh0O1xuICAgIHZhciBmaWxlTmFtZSA9IHBhdGguc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG1vZGVzW2ldLnN1cHBvcnRzRmlsZShmaWxlTmFtZSkpIHtcbiAgICAgICAgICAgIG1vZGUgPSBtb2Rlc1tpXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtb2RlO1xufVxuXG5jbGFzcyBNb2RlIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjYXB0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV4dGVuc2lvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBjYXB0aW9uLCBleHRlbnNpb25zKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY2FwdGlvbiA9IGNhcHRpb247XG4gICAgICAgIHRoaXMubW9kZSA9IFwiYWNlL21vZGUvXCIgKyBuYW1lO1xuICAgICAgICB0aGlzLmV4dGVuc2lvbnMgPSBleHRlbnNpb25zO1xuICAgICAgICB2YXIgcmU7XG4gICAgICAgIGlmICgvXFxeLy50ZXN0KGV4dGVuc2lvbnMpKSB7XG4gICAgICAgICAgICByZSA9IGV4dGVuc2lvbnMucmVwbGFjZSgvXFx8KFxcXik/L2csIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiJHxcIiArIChiID8gXCJeXCIgOiBcIl4uKlxcXFwuXCIpO1xuICAgICAgICAgICAgfSkgKyBcIiRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlID0gXCJeLipcXFxcLihcIiArIGV4dGVuc2lvbnMgKyBcIikkXCI7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmV4dFJlID0gbmV3IFJlZ0V4cChyZSwgXCJnaVwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZW5hbWVcbiAgICAgKi9cbiAgICBzdXBwb3J0c0ZpbGUoZmlsZW5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZpbGVuYW1lLm1hdGNoKHRoaXMuZXh0UmUpO1xuICAgIH1cbn1cblxuLy8gdG9kbyBmaXJzdGxpbmVtYXRjaFxudmFyIHN1cHBvcnRlZE1vZGVzID0ge1xuICAgIEFCQVA6ICAgICAgICBbXCJhYmFwXCJdLFxuICAgIEFCQzogICAgICAgICBbXCJhYmNcIl0sXG4gICAgQWN0aW9uU2NyaXB0OltcImFzXCJdLFxuICAgIEFEQTogICAgICAgICBbXCJhZGF8YWRiXCJdLFxuICAgIEFsZGE6ICAgICAgICBbXCJhbGRhXCJdLFxuICAgIEFwYWNoZV9Db25mOiBbXCJeaHRhY2Nlc3N8Xmh0Z3JvdXBzfF5odHBhc3N3ZHxeY29uZnxodGFjY2Vzc3xodGdyb3Vwc3xodHBhc3N3ZFwiXSxcbiAgICBBcGV4OiAgICAgICAgW1wiYXBleHxjbHN8dHJpZ2dlcnx0Z3JcIl0sXG4gICAgQVFMOiAgICAgICAgIFtcImFxbFwiXSxcbiAgICBBc2NpaURvYzogICAgW1wiYXNjaWlkb2N8YWRvY1wiXSxcbiAgICBBU0w6ICAgICAgICAgW1wiZHNsfGFzbHxhc2wuanNvblwiXSxcbiAgICBBc3NlbWJseV9BUk0zMjpbXCJzXCJdLFxuICAgIEFzc2VtYmx5X3g4NjpbXCJhc218YVwiXSxcbiAgICBBc3RybzogICAgICAgW1wiYXN0cm9cIl0sXG4gICAgQXV0b0hvdEtleTogIFtcImFoa1wiXSxcbiAgICBCYXRjaEZpbGU6ICAgW1wiYmF0fGNtZFwiXSxcbiAgICBCaWJUZVg6ICAgICAgW1wiYmliXCJdLFxuICAgIENfQ3BwOiAgICAgICBbXCJjcHB8Y3xjY3xjeHh8aHxoaHxocHB8aW5vXCJdLFxuICAgIEM5U2VhcmNoOiAgICBbXCJjOXNlYXJjaF9yZXN1bHRzXCJdLFxuICAgIENpcnJ1OiAgICAgICBbXCJjaXJydXxjclwiXSxcbiAgICBDbG9qdXJlOiAgICAgW1wiY2xqfGNsanNcIl0sXG4gICAgQ29ib2w6ICAgICAgIFtcIkNCTHxDT0JcIl0sXG4gICAgY29mZmVlOiAgICAgIFtcImNvZmZlZXxjZnxjc29ufF5DYWtlZmlsZVwiXSxcbiAgICBDb2xkRnVzaW9uOiAgW1wiY2ZtfGNmY1wiXSxcbiAgICBDcnlzdGFsOiAgICAgW1wiY3JcIl0sXG4gICAgQ1NoYXJwOiAgICAgIFtcImNzXCJdLFxuICAgIENzb3VuZF9Eb2N1bWVudDogW1wiY3NkXCJdLFxuICAgIENzb3VuZF9PcmNoZXN0cmE6IFtcIm9yY1wiXSxcbiAgICBDc291bmRfU2NvcmU6IFtcInNjb1wiXSxcbiAgICBDU1M6ICAgICAgICAgW1wiY3NzXCJdLFxuICAgIEN1cmx5OiAgICAgICBbXCJjdXJseVwiXSxcbiAgICBDdXR0bGVmaXNoOiAgW1wiY29uZlwiXSxcbiAgICBEOiAgICAgICAgICAgW1wiZHxkaVwiXSxcbiAgICBEYXJ0OiAgICAgICAgW1wiZGFydFwiXSxcbiAgICBEaWZmOiAgICAgICAgW1wiZGlmZnxwYXRjaFwiXSxcbiAgICBEamFuZ286ICAgICAgW1wiZGp0fGh0bWwuZGp0fGRqLmh0bWx8ZGpodG1sXCJdLFxuICAgIERvY2tlcmZpbGU6ICBbXCJeRG9ja2VyZmlsZVwiXSxcbiAgICBEb3Q6ICAgICAgICAgW1wiZG90XCJdLFxuICAgIERyb29sczogICAgICBbXCJkcmxcIl0sXG4gICAgRWRpZmFjdDogICAgIFtcImVkaVwiXSxcbiAgICBFaWZmZWw6ICAgICAgW1wiZXxnZVwiXSxcbiAgICBFSlM6ICAgICAgICAgW1wiZWpzXCJdLFxuICAgIEVsaXhpcjogICAgICBbXCJleHxleHNcIl0sXG4gICAgRWxtOiAgICAgICAgIFtcImVsbVwiXSxcbiAgICBFcmxhbmc6ICAgICAgW1wiZXJsfGhybFwiXSxcbiAgICBGbGl4OiAgICAgICAgW1wiZmxpeFwiXSxcbiAgICBGb3J0aDogICAgICAgW1wiZnJ0fGZzfGxkcnxmdGh8NHRoXCJdLFxuICAgIEZvcnRyYW46ICAgICBbXCJmfGY5MFwiXSxcbiAgICBGU2hhcnA6ICAgICAgW1wiZnNpfGZzfG1sfG1saXxmc3h8ZnNzY3JpcHRcIl0sXG4gICAgRlNMOiAgICAgICAgIFtcImZzbFwiXSxcbiAgICBGVEw6ICAgICAgICAgW1wiZnRsXCJdLFxuICAgIEdjb2RlOiAgICAgICBbXCJnY29kZVwiXSxcbiAgICBHaGVya2luOiAgICAgW1wiZmVhdHVyZVwiXSxcbiAgICBHaXRpZ25vcmU6ICAgW1wiXi5naXRpZ25vcmVcIl0sXG4gICAgR2xzbDogICAgICAgIFtcImdsc2x8ZnJhZ3x2ZXJ0XCJdLFxuICAgIEdvYnN0b25lczogICBbXCJnYnNcIl0sXG4gICAgZ29sYW5nOiAgICAgIFtcImdvXCJdLFxuICAgIEdyYXBoUUxTY2hlbWE6IFtcImdxbFwiXSxcbiAgICBHcm9vdnk6ICAgICAgW1wiZ3Jvb3Z5XCJdLFxuICAgIEhBTUw6ICAgICAgICBbXCJoYW1sXCJdLFxuICAgIEhhbmRsZWJhcnM6ICBbXCJoYnN8aGFuZGxlYmFyc3x0cGx8bXVzdGFjaGVcIl0sXG4gICAgSGFza2VsbDogICAgIFtcImhzXCJdLFxuICAgIEhhc2tlbGxfQ2FiYWw6IFtcImNhYmFsXCJdLFxuICAgIGhhWGU6ICAgICAgICBbXCJoeFwiXSxcbiAgICBIanNvbjogICAgICAgW1wiaGpzb25cIl0sXG4gICAgSFRNTDogW1wiaHRtbHxodG18eGh0bWx8d2V8d3B5XCJdLFxuICAgIEhUTUxfRWxpeGlyOiBbXCJlZXh8aHRtbC5lZXhcIl0sXG4gICAgSFRNTF9SdWJ5OiAgIFtcImVyYnxyaHRtbHxodG1sLmVyYlwiXSxcbiAgICBJTkk6ICAgICAgICAgW1wiaW5pfGNvbmZ8Y2ZnfHByZWZzXCJdLFxuICAgIElvOiAgICAgICAgICBbXCJpb1wiXSxcbiAgICBJb246ICAgICAgICAgW1wiaW9uXCJdLFxuICAgIEphY2s6ICAgICAgICBbXCJqYWNrXCJdLFxuICAgIEphZGU6ICAgICAgICBbXCJqYWRlfHB1Z1wiXSxcbiAgICBKYXZhOiAgICAgICAgW1wiamF2YVwiXSxcbiAgICBKYXZhU2NyaXB0OiAgW1wianN8anNtfGNqc3xtanNcIl0sXG4gICAgSkVYTDogICAgICAgIFtcImpleGxcIl0sXG4gICAgSlNPTjogICAgICAgIFtcImpzb25cIl0sXG4gICAgSlNPTjU6ICAgICAgIFtcImpzb241XCJdLFxuICAgIEpTT05pcTogICAgICBbXCJqcVwiXSxcbiAgICBKU1A6ICAgICAgICAgW1wianNwXCJdLFxuICAgIEpTU006ICAgICAgICBbXCJqc3NtfGpzc21fc3RhdGVcIl0sXG4gICAgSlNYOiAgICAgICAgIFtcImpzeFwiXSxcbiAgICBKdWxpYTogICAgICAgW1wiamxcIl0sXG4gICAgS290bGluOiAgICAgIFtcImt0fGt0c1wiXSxcbiAgICBMYVRlWDogICAgICAgW1widGV4fGxhdGV4fGx0eHxiaWJcIl0sXG4gICAgTGF0dGU6ICAgICAgIFtcImxhdHRlXCJdLFxuICAgIExFU1M6ICAgICAgICBbXCJsZXNzXCJdLFxuICAgIExpcXVpZDogICAgICBbXCJsaXF1aWRcIl0sXG4gICAgTGlzcDogICAgICAgIFtcImxpc3BcIl0sXG4gICAgTGl2ZVNjcmlwdDogIFtcImxzXCJdLFxuICAgIExvZzogICAgICAgICBbXCJsb2dcIl0sXG4gICAgTG9naVFMOiAgICAgIFtcImxvZ2ljfGxxbFwiXSxcbiAgICBMb2d0YWxrOiAgICAgW1wibGd0XCJdLFxuICAgIExTTDogICAgICAgICBbXCJsc2xcIl0sXG4gICAgTHVhOiAgICAgICAgIFtcImx1YVwiXSxcbiAgICBMdWFQYWdlOiAgICAgW1wibHBcIl0sXG4gICAgTHVjZW5lOiAgICAgIFtcImx1Y2VuZVwiXSxcbiAgICBNYWtlZmlsZTogICAgW1wiXk1ha2VmaWxlfF5HTlVtYWtlZmlsZXxebWFrZWZpbGV8Xk9DYW1sTWFrZWZpbGV8bWFrZVwiXSxcbiAgICBNYXJrZG93bjogICAgW1wibWR8bWFya2Rvd25cIl0sXG4gICAgTWFzazogICAgICAgIFtcIm1hc2tcIl0sXG4gICAgTUFUTEFCOiAgICAgIFtcIm1hdGxhYlwiXSxcbiAgICBNYXplOiAgICAgICAgW1wibXpcIl0sXG4gICAgTWVkaWFXaWtpOiAgIFtcIndpa2l8bWVkaWF3aWtpXCJdLFxuICAgIE1FTDogICAgICAgICBbXCJtZWxcIl0sXG4gICAgTUlQUzogICAgICAgIFtcInN8YXNtXCJdLFxuICAgIE1JWEFMOiAgICAgICBbXCJtaXhhbFwiXSxcbiAgICBNVVNIQ29kZTogICAgW1wibWN8bXVzaFwiXSxcbiAgICBNeVNRTDogICAgICAgW1wibXlzcWxcIl0sXG4gICAgTmFzYWw6ICAgICAgIFtcIm5hc1wiXSxcbiAgICBOZ2lueDogICAgICAgW1wibmdpbnh8Y29uZlwiXSxcbiAgICBOaW06ICAgICAgICAgW1wibmltXCJdLFxuICAgIE5peDogICAgICAgICBbXCJuaXhcIl0sXG4gICAgTlNJUzogICAgICAgIFtcIm5zaXxuc2hcIl0sXG4gICAgTnVuanVja3M6ICAgIFtcIm51bmp1Y2tzfG51bmpzfG5qfG5qa1wiXSxcbiAgICBPYmplY3RpdmVDOiAgW1wibXxtbVwiXSxcbiAgICBPQ2FtbDogICAgICAgW1wibWx8bWxpXCJdLFxuICAgIE9kaW46ICAgICAgICBbXCJvZGluXCJdLFxuICAgIFBhcnRpUUw6ICAgICBbXCJwYXJ0aXFsfHBxbFwiXSxcbiAgICBQYXNjYWw6ICAgICAgW1wicGFzfHBcIl0sXG4gICAgUGVybDogICAgICAgIFtcInBsfHBtXCJdLFxuICAgIHBnU1FMOiAgICAgICBbXCJwZ3NxbFwiXSxcbiAgICBQSFA6ICAgICAgICAgW1wicGhwfGluY3xwaHRtbHxzaHRtbHxwaHAzfHBocDR8cGhwNXxwaHBzfHBocHR8YXd8Y3RwfG1vZHVsZVwiXSxcbiAgICBQSFBfTGFyYXZlbF9ibGFkZTogW1wiYmxhZGUucGhwXCJdLFxuICAgIFBpZzogICAgICAgICBbXCJwaWdcIl0sXG4gICAgUExTUUw6ICAgICAgIFtcInBsc3FsXCJdLFxuICAgIFBvd2Vyc2hlbGw6ICBbXCJwczFcIl0sXG4gICAgUHJhYXQ6ICAgICAgIFtcInByYWF0fHByYWF0c2NyaXB0fHBzY3xwcm9jXCJdLFxuICAgIFByaXNtYTogICAgICBbXCJwcmlzbWFcIl0sXG4gICAgUHJvbG9nOiAgICAgIFtcInBsZ3xwcm9sb2dcIl0sXG4gICAgUHJvcGVydGllczogIFtcInByb3BlcnRpZXNcIl0sXG4gICAgUHJvdG9idWY6ICAgIFtcInByb3RvXCJdLFxuICAgIFBSUUw6ICAgICAgICBbXCJwcnFsXCJdLFxuICAgIFB1cHBldDogICAgICBbXCJlcHB8cHBcIl0sXG4gICAgUHl0aG9uOiAgICAgIFtcInB5XCJdLFxuICAgIFFNTDogICAgICAgICBbXCJxbWxcIl0sXG4gICAgUjogICAgICAgICAgIFtcInJcIl0sXG4gICAgUmFrdTogICAgICAgIFtcInJha3V8cmFrdW1vZHxyYWt1dGVzdHxwNnxwbDZ8cG02XCJdLFxuICAgIFJhem9yOiAgICAgICBbXCJjc2h0bWx8YXNwXCJdLFxuICAgIFJEb2M6ICAgICAgICBbXCJSZFwiXSxcbiAgICBSZWQ6ICAgICAgICAgW1wicmVkfHJlZHNcIl0sXG4gICAgUkhUTUw6ICAgICAgIFtcIlJodG1sXCJdLFxuICAgIFJvYm90OiAgICAgICBbXCJyb2JvdHxyZXNvdXJjZVwiXSxcbiAgICBSU1Q6ICAgICAgICAgW1wicnN0XCJdLFxuICAgIFJ1Ynk6ICAgICAgICBbXCJyYnxydXxnZW1zcGVjfHJha2V8Xkd1YXJkZmlsZXxeUmFrZWZpbGV8XkdlbWZpbGVcIl0sXG4gICAgUnVzdDogICAgICAgIFtcInJzXCJdLFxuICAgIFNhQzogICAgICAgICBbXCJzYWNcIl0sXG4gICAgU0FTUzogICAgICAgIFtcInNhc3NcIl0sXG4gICAgU0NBRDogICAgICAgIFtcInNjYWRcIl0sXG4gICAgU2NhbGE6ICAgICAgIFtcInNjYWxhfHNidFwiXSxcbiAgICBTY2hlbWU6ICAgICAgW1wic2NtfHNtfHJrdHxvYWt8c2NoZW1lXCJdLFxuICAgIFNjcnlwdDogICAgICBbXCJzY3J5cHRcIl0sXG4gICAgU0NTUzogICAgICAgIFtcInNjc3NcIl0sXG4gICAgU0g6ICAgICAgICAgIFtcInNofGJhc2h8Xi5iYXNocmNcIl0sXG4gICAgU0pTOiAgICAgICAgIFtcInNqc1wiXSxcbiAgICBTbGltOiAgICAgICAgW1wic2xpbXxza2ltXCJdLFxuICAgIFNtYXJ0eTogICAgICBbXCJzbWFydHl8dHBsXCJdLFxuICAgIFNtaXRoeTogICAgICBbXCJzbWl0aHlcIl0sXG4gICAgc25pcHBldHM6ICAgIFtcInNuaXBwZXRzXCJdLFxuICAgIFNveV9UZW1wbGF0ZTpbXCJzb3lcIl0sXG4gICAgU3BhY2U6ICAgICAgIFtcInNwYWNlXCJdLFxuICAgIFNQQVJRTDogICAgICBbXCJycVwiXSxcbiAgICBTUUw6ICAgICAgICAgW1wic3FsXCJdLFxuICAgIFNRTFNlcnZlcjogICBbXCJzcWxzZXJ2ZXJcIl0sXG4gICAgU3R5bHVzOiAgICAgIFtcInN0eWx8c3R5bHVzXCJdLFxuICAgIFNWRzogICAgICAgICBbXCJzdmdcIl0sXG4gICAgU3dpZnQ6ICAgICAgIFtcInN3aWZ0XCJdLFxuICAgIFRjbDogICAgICAgICBbXCJ0Y2xcIl0sXG4gICAgVGVycmFmb3JtOiAgIFtcInRmXCIsIFwidGZ2YXJzXCIsIFwidGVycmFncnVudFwiXSxcbiAgICBUZXg6ICAgICAgICAgW1widGV4XCJdLFxuICAgIFRleHQ6ICAgICAgICBbXCJ0eHRcIl0sXG4gICAgVGV4dGlsZTogICAgIFtcInRleHRpbGVcIl0sXG4gICAgVG9tbDogICAgICAgIFtcInRvbWxcIl0sXG4gICAgVFNYOiAgICAgICAgIFtcInRzeFwiXSxcbiAgICBUdXJ0bGU6ICAgICAgW1widHRsXCJdLFxuICAgIFR3aWc6ICAgICAgICBbXCJ0d2lnfHN3aWdcIl0sXG4gICAgVHlwZXNjcmlwdDogIFtcInRzfG10c3xjdHN8dHlwZXNjcmlwdHxzdHJcIl0sXG4gICAgVmFsYTogICAgICAgIFtcInZhbGFcIl0sXG4gICAgVkJTY3JpcHQ6ICAgIFtcInZic3x2YlwiXSxcbiAgICBWZWxvY2l0eTogICAgW1widm1cIl0sXG4gICAgVmVyaWxvZzogICAgIFtcInZ8dmh8c3Z8c3ZoXCJdLFxuICAgIFZIREw6ICAgICAgICBbXCJ2aGR8dmhkbFwiXSxcbiAgICBWaXN1YWxmb3JjZTogW1widmZwfGNvbXBvbmVudHxwYWdlXCJdLFxuICAgIFZ1ZTogW1widnVlXCJdLFxuICAgIFdvbGxvazogICAgICBbXCJ3bGt8d3BnbXx3dGVzdFwiXSxcbiAgICBYTUw6ICAgICAgICAgW1wieG1sfHJkZnxyc3N8d3NkbHx4c2x0fGF0b218bWF0aG1sfG1tbHx4dWx8eGJsfHhhbWxcIl0sXG4gICAgWFF1ZXJ5OiAgICAgIFtcInhxXCJdLFxuICAgIFlBTUw6ICAgICAgICBbXCJ5YW1sfHltbFwiXSxcbiAgICBaZWVrOiAgICAgICAgW1wiemVla3xicm9cIl0sXG4gICAgWmlnOiAgICAgICAgIFtcInppZ1wiXVxufTtcblxudmFyIG5hbWVPdmVycmlkZXMgPSB7XG4gICAgT2JqZWN0aXZlQzogXCJPYmplY3RpdmUtQ1wiLFxuICAgIENTaGFycDogXCJDI1wiLFxuICAgIGdvbGFuZzogXCJHb1wiLFxuICAgIENfQ3BwOiBcIkMgYW5kIEMrK1wiLFxuICAgIENzb3VuZF9Eb2N1bWVudDogXCJDc291bmQgRG9jdW1lbnRcIixcbiAgICBDc291bmRfT3JjaGVzdHJhOiBcIkNzb3VuZFwiLFxuICAgIENzb3VuZF9TY29yZTogXCJDc291bmQgU2NvcmVcIixcbiAgICBjb2ZmZWU6IFwiQ29mZmVlU2NyaXB0XCIsXG4gICAgSFRNTF9SdWJ5OiBcIkhUTUwgKFJ1YnkpXCIsXG4gICAgSFRNTF9FbGl4aXI6IFwiSFRNTCAoRWxpeGlyKVwiLFxuICAgIEZUTDogXCJGcmVlTWFya2VyXCIsXG4gICAgUEhQX0xhcmF2ZWxfYmxhZGU6IFwiUEhQIChCbGFkZSBUZW1wbGF0ZSlcIixcbiAgICBQZXJsNjogXCJQZXJsIDZcIixcbiAgICBBdXRvSG90S2V5OiBcIkF1dG9Ib3RrZXkgLyBBdXRvSXRcIlxufTtcblxudmFyIG1vZGVzQnlOYW1lID0ge307XG5mb3IgKHZhciBuYW1lIGluIHN1cHBvcnRlZE1vZGVzKSB7XG4gICAgdmFyIGRhdGEgPSBzdXBwb3J0ZWRNb2Rlc1tuYW1lXTtcbiAgICB2YXIgZGlzcGxheU5hbWUgPSAobmFtZU92ZXJyaWRlc1tuYW1lXSB8fCBuYW1lKS5yZXBsYWNlKC9fL2csIFwiIFwiKTtcbiAgICB2YXIgZmlsZW5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIG1vZGUgPSBuZXcgTW9kZShmaWxlbmFtZSwgZGlzcGxheU5hbWUsIGRhdGFbMF0pO1xuICAgIG1vZGVzQnlOYW1lW2ZpbGVuYW1lXSA9IG1vZGU7XG4gICAgbW9kZXMucHVzaChtb2RlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0TW9kZUZvclBhdGg6IGdldE1vZGVGb3JQYXRoLFxuICAgIG1vZGVzOiBtb2RlcyxcbiAgICBtb2Rlc0J5TmFtZTogbW9kZXNCeU5hbWVcbn07XG4iLCIvKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9lZGl0b3JcIikuRWRpdG9yfSBFZGl0b3JcbiAqL1xuXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgbmxzID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKS5ubHM7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2xpYi9kb21cIik7XG52YXIgRmlsdGVyZWRMaXN0PSByZXF1aXJlKFwiLi4vYXV0b2NvbXBsZXRlXCIpLkZpbHRlcmVkTGlzdDtcbnZhciBBY2VQb3B1cCA9IHJlcXVpcmUoJy4uL2F1dG9jb21wbGV0ZS9wb3B1cCcpLkFjZVBvcHVwO1xudmFyICRzaW5nbGVMaW5lRWRpdG9yID0gcmVxdWlyZSgnLi4vYXV0b2NvbXBsZXRlL3BvcHVwJykuJHNpbmdsZUxpbmVFZGl0b3I7XG52YXIgVW5kb01hbmFnZXIgPSByZXF1aXJlKFwiLi4vdW5kb21hbmFnZXJcIikuVW5kb01hbmFnZXI7XG52YXIgVG9rZW5pemVyID0gcmVxdWlyZShcIi4uL3Rva2VuaXplclwiKS5Ub2tlbml6ZXI7XG52YXIgb3ZlcmxheVBhZ2UgPSByZXF1aXJlKFwiLi9tZW51X3Rvb2xzL292ZXJsYXlfcGFnZVwiKS5vdmVybGF5UGFnZTtcbnZhciBtb2RlbGlzdCA9IHJlcXVpcmUoXCIuL21vZGVsaXN0XCIpO1xudmFyIG9wZW5Qcm9tcHQ7XG5cbi8qKlxuICogQHR5cGVkZWYgUHJvbXB0T3B0aW9uc1xuICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgICAgICAgICAgICAgUHJvbXB0IG5hbWUuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gJHR5cGUgICAgICAgICAgICBVc2UgcHJvbXB0IG9mIHNwZWNpZmljIHR5cGUgKGdvdG9MaW5lfGNvbW1hbmRzfG1vZGVzIG9yIGRlZmF1bHQgaWYgZW1wdHkpLlxuICogQHByb3BlcnR5IHtbc3RhcnQ6IG51bWJlciwgZW5kOiBudW1iZXJdfSBzZWxlY3Rpb24gIERlZmluZXMgd2hpY2ggcGFydCBvZiB0aGUgcHJlZGVmaW5lZCB2YWx1ZSBzaG91bGQgYmUgaGlnaGxpdGVkLlxuICogQHByb3BlcnR5IHtCb29sZWFufSBoYXNEZXNjcmlwdGlvbiAgU2V0IHRvIHRydWUgaWYgcHJvbXB0IGhhcyBkZXNjcmlwdGlvbiBiZWxvdyBpbnB1dCBib3guXG4gKiBAcHJvcGVydHkge1N0cmluZ30gcHJvbXB0ICAgICAgICAgICBEZXNjcmlwdGlvbiBiZWxvdyBpbnB1dCBib3guXG4gKiBAcHJvcGVydHkge1N0cmluZ30gcGxhY2Vob2xkZXIgICAgICBQbGFjZWhvbGRlciBmb3IgdmFsdWUuXG4gKiBAcHJvcGVydHkge09iamVjdH0gJHJ1bGVzICAgICAgICAgICBTcGVjaWZpYyBydWxlcyBmb3IgaW5wdXQgbGlrZSBwYXNzd29yZCBvciByZWdleHAuXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGlnbm9yZUZvY3VzT3V0ICBTZXQgdG8gdHJ1ZSB0byBrZWVwIHRoZSBwcm9tcHQgb3BlbiB3aGVuIGZvY3VzIG1vdmVzIHRvIGFub3RoZXIgcGFydCBvZiB0aGUgZWRpdG9yLlxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gZ2V0Q29tcGxldGlvbnMgRnVuY3Rpb24gZm9yIGRlZmluaW5nIGxpc3Qgb2Ygb3B0aW9ucyBmb3IgdmFsdWUuXG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBnZXRQcmVmaXggICAgICBGdW5jdGlvbiBmb3IgZGVmaW5pbmcgY3VycmVudCB2YWx1ZSBwcmVmaXguXG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBvbkFjY2VwdCAgICAgICBGdW5jdGlvbiBjYWxsZWQgd2hlbiBFbnRlciBpcyBwcmVzc2VkLlxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gb25JbnB1dCAgICAgICAgRnVuY3Rpb24gY2FsbGVkIHdoZW4gaW5wdXQgaXMgYWRkZWQgdG8gcHJvbXB0IGlucHV0IGJveC5cbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IG9uQ2FuY2VsICAgICAgIEZ1bmN0aW9uIGNhbGxlZCB3aGVuIEVzY3xTaGlmdC1Fc2MgaXMgcHJlc3NlZC5cbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGhpc3RvcnkgICAgICAgIEZ1bmN0aW9uIGZvciBkZWZpbmluZyBoaXN0b3J5IGxpc3QuXG4gKiBAcHJvcGVydHkge251bWJlcn0gbWF4SGlzdG9yeUNvdW50XG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBhZGRUb0hpc3RvcnlcbiAqL1xuXG4vKipcbiAqIFByb21wdCBwbHVnaW4gaXMgdXNlZCBmb3IgZ2V0dGluZyBpbnB1dCBmcm9tIHVzZXIuXG4gKlxuICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvciAgICAgICAgICAgICAgICAgICBPdXNpZGUgZWRpdG9yIHJlbGF0ZWQgdG8gdGhpcyBwcm9tcHQuIFdpbGwgYmUgYmx1cnJlZCB3aGVuIHByb21wdCBpcyBvcGVuLlxuICogQHBhcmFtIHtTdHJpbmcgfCBQYXJ0aWFsPFByb21wdE9wdGlvbnM+fSBtZXNzYWdlICAgICAgICAgICAgICAgICAgUHJlZGVmaW5lZCB2YWx1ZSBvZiBwcm9tcHQgaW5wdXQgYm94LlxuICogQHBhcmFtIHtQYXJ0aWFsPFByb21wdE9wdGlvbnM+fSBvcHRpb25zICAgICAgICAgICAgICAgICAgQ3Vzb21pemFibGUgb3B0aW9ucyBmb3IgdGhpcyBwcm9tcHQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdICAgICAgICAgICAgICAgRnVuY3Rpb24gY2FsbGVkIGFmdGVyIGRvbmUuXG4gKiAqL1xuZnVuY3Rpb24gcHJvbXB0KGVkaXRvciwgbWVzc2FnZSwgb3B0aW9ucywgY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIG1lc3NhZ2UgPT0gXCJvYmplY3RcIikge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIHJldHVybiBwcm9tcHQoZWRpdG9yLCBcIlwiLCBtZXNzYWdlLCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKG9wZW5Qcm9tcHQpIHtcbiAgICAgICAgdmFyIGxhc3RQcm9tcHQgPSBvcGVuUHJvbXB0O1xuICAgICAgICBlZGl0b3IgPSBsYXN0UHJvbXB0LmVkaXRvcjtcbiAgICAgICAgbGFzdFByb21wdC5jbG9zZSgpO1xuICAgICAgICBpZiAobGFzdFByb21wdC5uYW1lICYmIGxhc3RQcm9tcHQubmFtZSA9PSBvcHRpb25zLm5hbWUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvcHRpb25zLiR0eXBlKVxuICAgICAgIHJldHVybiBwcm9tcHRbb3B0aW9ucy4kdHlwZV0oZWRpdG9yLCBjYWxsYmFjayk7XG5cbiAgICB2YXIgY21kTGluZSA9ICRzaW5nbGVMaW5lRWRpdG9yKCk7XG4gICAgY21kTGluZS5zZXNzaW9uLnNldFVuZG9NYW5hZ2VyKG5ldyBVbmRvTWFuYWdlcigpKTtcblxuICAgIC8qKkB0eXBlIHthbnl9Ki9cbiAgICB2YXIgZWwgPSBkb20uYnVpbGREb20oW1wiZGl2XCIsIHtjbGFzczogXCJhY2VfcHJvbXB0X2NvbnRhaW5lclwiICsgKG9wdGlvbnMuaGFzRGVzY3JpcHRpb24gPyBcIiBpbnB1dC1ib3gtd2l0aC1kZXNjcmlwdGlvblwiIDogXCJcIil9XSk7XG4gICAgdmFyIG92ZXJsYXkgPSBvdmVybGF5UGFnZShlZGl0b3IsIGVsLCBkb25lKTtcbiAgICBlbC5hcHBlbmRDaGlsZChjbWRMaW5lLmNvbnRhaW5lcik7XG5cbiAgICBpZiAoZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5jbWRMaW5lID0gY21kTGluZTtcbiAgICAgICAgY21kTGluZS5zZXRPcHRpb24oXCJmb250U2l6ZVwiLCBlZGl0b3IuZ2V0T3B0aW9uKFwiZm9udFNpemVcIikpO1xuICAgIH1cbiAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICBjbWRMaW5lLnNldFZhbHVlKG1lc3NhZ2UsIDEpO1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy5zZWxlY3Rpb24pIHtcbiAgICAgICAgY21kTGluZS5zZWxlY3Rpb24uc2V0UmFuZ2Uoe1xuICAgICAgICAgICAgc3RhcnQ6IGNtZExpbmUuc2Vzc2lvbi5kb2MuaW5kZXhUb1Bvc2l0aW9uKG9wdGlvbnMuc2VsZWN0aW9uWzBdKSxcbiAgICAgICAgICAgIGVuZDogY21kTGluZS5zZXNzaW9uLmRvYy5pbmRleFRvUG9zaXRpb24ob3B0aW9ucy5zZWxlY3Rpb25bMV0pXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmdldENvbXBsZXRpb25zKSB7XG4gICAgICAgIHZhciBwb3B1cCA9IG5ldyBBY2VQb3B1cCgpO1xuICAgICAgICBwb3B1cC5yZW5kZXJlci5zZXRTdHlsZShcImFjZV9hdXRvY29tcGxldGVfaW5saW5lXCIpO1xuICAgICAgICBwb3B1cC5jb250YWluZXIuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgcG9wdXAuY29udGFpbmVyLnN0eWxlLm1heFdpZHRoID0gXCI2MDBweFwiO1xuICAgICAgICBwb3B1cC5jb250YWluZXIuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgcG9wdXAuY29udGFpbmVyLnN0eWxlLm1hcmdpblRvcCA9IFwiM3B4XCI7XG4gICAgICAgIHBvcHVwLnJlbmRlcmVyLnNldFNjcm9sbE1hcmdpbigyLCAyLCAwLCAwKTtcbiAgICAgICAgcG9wdXAuYXV0b1NlbGVjdCA9IGZhbHNlO1xuICAgICAgICBwb3B1cC5yZW5kZXJlci4kbWF4TGluZXMgPSAxNTtcbiAgICAgICAgcG9wdXAuc2V0Um93KC0xKTtcbiAgICAgICAgcG9wdXAub24oXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IHBvcHVwLmdldERhdGEocG9wdXAuZ2V0Um93KCkpO1xuICAgICAgICAgICAgaWYgKCFkYXRhW1wiZXJyb3JcIl0pIHtcbiAgICAgICAgICAgICAgICBjbWRMaW5lLnNldFZhbHVlKGRhdGEudmFsdWUgfHwgZGF0YVtcIm5hbWVcIl0gfHwgZGF0YSk7XG4gICAgICAgICAgICAgICAgYWNjZXB0KCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBlbC5hcHBlbmRDaGlsZChwb3B1cC5jb250YWluZXIpO1xuICAgICAgICB1cGRhdGVDb21wbGV0aW9ucygpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLiRydWxlcykge1xuICAgICAgICB2YXIgdG9rZW5pemVyID0gbmV3IFRva2VuaXplcihvcHRpb25zLiRydWxlcyk7XG4gICAgICAgIGNtZExpbmUuc2Vzc2lvbi5iZ1Rva2VuaXplci5zZXRUb2tlbml6ZXIodG9rZW5pemVyKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5wbGFjZWhvbGRlcikge1xuICAgICAgICBjbWRMaW5lLnNldE9wdGlvbihcInBsYWNlaG9sZGVyXCIsIG9wdGlvbnMucGxhY2Vob2xkZXIpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmhhc0Rlc2NyaXB0aW9uKSB7XG4gICAgICAgIC8qKkB0eXBlIHthbnl9Ki9cbiAgICAgICAgdmFyIHByb21wdFRleHRDb250YWluZXIgPSBkb20uYnVpbGREb20oW1wiZGl2XCIsIHtjbGFzczogXCJhY2VfcHJvbXB0X3RleHRfY29udGFpbmVyXCJ9XSk7XG4gICAgICAgIGRvbS5idWlsZERvbShvcHRpb25zLnByb21wdCB8fCBcIlByZXNzICdFbnRlcicgdG8gY29uZmlybSBvciAnRXNjYXBlJyB0byBjYW5jZWxcIiwgcHJvbXB0VGV4dENvbnRhaW5lcik7XG4gICAgICAgIGVsLmFwcGVuZENoaWxkKHByb21wdFRleHRDb250YWluZXIpO1xuICAgIH1cblxuICAgIG92ZXJsYXkuc2V0SWdub3JlRm9jdXNPdXQob3B0aW9ucy5pZ25vcmVGb2N1c091dCk7XG5cbiAgICBmdW5jdGlvbiBhY2NlcHQoKSB7XG4gICAgICAgIHZhciB2YWw7XG4gICAgICAgIGlmIChwb3B1cCAmJiBwb3B1cC5nZXRDdXJzb3JQb3NpdGlvbigpLnJvdyA+IDApIHtcbiAgICAgICAgICAgIHZhbCA9IHZhbHVlRnJvbVJlY2VudExpc3QoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbCA9IGNtZExpbmUuZ2V0VmFsdWUoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY3VyRGF0YSA9IHBvcHVwID8gcG9wdXAuZ2V0RGF0YShwb3B1cC5nZXRSb3coKSkgOiB2YWw7XG4gICAgICAgIGlmIChjdXJEYXRhICYmICFjdXJEYXRhW1wiZXJyb3JcIl0pIHtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIG9wdGlvbnMub25BY2NlcHQgJiYgb3B0aW9ucy5vbkFjY2VwdCh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbCxcbiAgICAgICAgICAgICAgICBpdGVtOiBjdXJEYXRhXG4gICAgICAgICAgICB9LCBjbWRMaW5lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBrZXlzID0ge1xuICAgICAgICBcIkVudGVyXCI6IGFjY2VwdCxcbiAgICAgICAgXCJFc2N8U2hpZnQtRXNjXCI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgb3B0aW9ucy5vbkNhbmNlbCAmJiBvcHRpb25zLm9uQ2FuY2VsKGNtZExpbmUuZ2V0VmFsdWUoKSwgY21kTGluZSk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHBvcHVwKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oa2V5cywge1xuICAgICAgICAgICAgXCJVcFwiOiBmdW5jdGlvbihlZGl0b3IpIHsgcG9wdXAuZ29UbyhcInVwXCIpOyB2YWx1ZUZyb21SZWNlbnRMaXN0KCk7fSxcbiAgICAgICAgICAgIFwiRG93blwiOiBmdW5jdGlvbihlZGl0b3IpIHsgcG9wdXAuZ29UbyhcImRvd25cIik7IHZhbHVlRnJvbVJlY2VudExpc3QoKTt9LFxuICAgICAgICAgICAgXCJDdHJsLVVwfEN0cmwtSG9tZVwiOiBmdW5jdGlvbihlZGl0b3IpIHsgcG9wdXAuZ29UbyhcInN0YXJ0XCIpOyB2YWx1ZUZyb21SZWNlbnRMaXN0KCk7fSxcbiAgICAgICAgICAgIFwiQ3RybC1Eb3dufEN0cmwtRW5kXCI6IGZ1bmN0aW9uKGVkaXRvcikgeyBwb3B1cC5nb1RvKFwiZW5kXCIpOyB2YWx1ZUZyb21SZWNlbnRMaXN0KCk7fSxcbiAgICAgICAgICAgIFwiVGFiXCI6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgICAgIHBvcHVwLmdvVG8oXCJkb3duXCIpOyB2YWx1ZUZyb21SZWNlbnRMaXN0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJQYWdlVXBcIjogZnVuY3Rpb24oZWRpdG9yKSB7IHBvcHVwLmdvdG9QYWdlVXAoKTsgdmFsdWVGcm9tUmVjZW50TGlzdCgpO30sXG4gICAgICAgICAgICBcIlBhZ2VEb3duXCI6IGZ1bmN0aW9uKGVkaXRvcikgeyBwb3B1cC5nb3RvUGFnZURvd24oKTsgdmFsdWVGcm9tUmVjZW50TGlzdCgpO31cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY21kTGluZS5jb21tYW5kcy5iaW5kS2V5cyhrZXlzKTtcblxuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICAgIG92ZXJsYXkuY2xvc2UoKTtcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICAgICAgb3BlblByb21wdCA9IG51bGw7XG4gICAgfVxuXG4gICAgY21kTGluZS5vbihcImlucHV0XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBvcHRpb25zLm9uSW5wdXQgJiYgb3B0aW9ucy5vbklucHV0KCk7XG4gICAgICAgIHVwZGF0ZUNvbXBsZXRpb25zKCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVDb21wbGV0aW9ucygpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZ2V0Q29tcGxldGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBwcmVmaXg7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5nZXRQcmVmaXgpIHtcbiAgICAgICAgICAgICAgICBwcmVmaXggPSBvcHRpb25zLmdldFByZWZpeChjbWRMaW5lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25zID0gb3B0aW9ucy5nZXRDb21wbGV0aW9ucyhjbWRMaW5lKTtcbiAgICAgICAgICAgIHBvcHVwLnNldERhdGEoY29tcGxldGlvbnMsIHByZWZpeCk7XG4gICAgICAgICAgICBwb3B1cC5yZXNpemUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWx1ZUZyb21SZWNlbnRMaXN0KCkge1xuICAgICAgICB2YXIgY3VycmVudCA9IHBvcHVwLmdldERhdGEocG9wdXAuZ2V0Um93KCkpO1xuICAgICAgICBpZiAoY3VycmVudCAmJiAhY3VycmVudFtcImVycm9yXCJdKVxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQudmFsdWUgfHwgY3VycmVudC5jYXB0aW9uIHx8IGN1cnJlbnQ7XG4gICAgfVxuXG4gICAgY21kTGluZS5yZXNpemUodHJ1ZSk7XG4gICAgaWYgKHBvcHVwKSB7XG4gICAgICAgIHBvcHVwLnJlc2l6ZSh0cnVlKTtcbiAgICB9XG4gICAgY21kTGluZS5mb2N1cygpO1xuXG4gICAgb3BlblByb21wdCA9IHtcbiAgICAgICAgY2xvc2U6IGRvbmUsXG4gICAgICAgIG5hbWU6IG9wdGlvbnMubmFtZSxcbiAgICAgICAgZWRpdG9yOiBlZGl0b3JcbiAgICB9O1xufVxuXG4vKipcbiAqIFxuICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXVxuICovXG5wcm9tcHQuZ290b0xpbmUgPSBmdW5jdGlvbihlZGl0b3IsIGNhbGxiYWNrKSB7XG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5U2VsZWN0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoc2VsZWN0aW9uKSlcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IFtzZWxlY3Rpb25dO1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uLm1hcChmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICB2YXIgY3Vyc29yID0gci5pc0JhY2t3YXJkcyA/IHIuc3RhcnQ6IHIuZW5kO1xuICAgICAgICAgICAgdmFyIGFuY2hvciA9IHIuaXNCYWNrd2FyZHMgPyByLmVuZDogci5zdGFydDtcbiAgICAgICAgICAgIHZhciByb3cgPSBhbmNob3Iucm93O1xuICAgICAgICAgICAgdmFyIHMgPSAocm93ICsgMSkgKyBcIjpcIiArIGFuY2hvci5jb2x1bW47XG5cbiAgICAgICAgICAgIGlmIChhbmNob3Iucm93ID09IGN1cnNvci5yb3cpIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5jaG9yLmNvbHVtbiAhPSBjdXJzb3IuY29sdW1uKVxuICAgICAgICAgICAgICAgICAgICBzICs9IFwiPlwiICsgXCI6XCIgKyBjdXJzb3IuY29sdW1uO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzICs9IFwiPlwiICsgKGN1cnNvci5yb3cgKyAxKSArIFwiOlwiICsgY3Vyc29yLmNvbHVtbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9KS5yZXZlcnNlKCkuam9pbihcIiwgXCIpO1xuICAgIH1cblxuICAgIHByb21wdChlZGl0b3IsIFwiOlwiICsgc3RyaW5naWZ5U2VsZWN0aW9uKGVkaXRvci5zZWxlY3Rpb24udG9KU09OKCkpLCB7XG4gICAgICAgIG5hbWU6IFwiZ290b0xpbmVcIixcbiAgICAgICAgc2VsZWN0aW9uOiBbMSwgTnVtYmVyLk1BWF9WQUxVRV0sXG4gICAgICAgIG9uQWNjZXB0OiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBkYXRhLnZhbHVlO1xuICAgICAgICAgICAgdmFyIF9oaXN0b3J5ID0gcHJvbXB0LmdvdG9MaW5lW1wiX2hpc3RvcnlcIl07XG4gICAgICAgICAgICBpZiAoIV9oaXN0b3J5KVxuICAgICAgICAgICAgICAgIHByb21wdC5nb3RvTGluZVtcIl9oaXN0b3J5XCJdID0gX2hpc3RvcnkgPSBbXTtcbiAgICAgICAgICAgIGlmIChfaGlzdG9yeS5pbmRleE9mKHZhbHVlKSAhPSAtMSlcbiAgICAgICAgICAgICAgICBfaGlzdG9yeS5zcGxpY2UoX2hpc3RvcnkuaW5kZXhPZih2YWx1ZSksIDEpO1xuICAgICAgICAgICAgX2hpc3RvcnkudW5zaGlmdCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoX2hpc3RvcnkubGVuZ3RoID4gMjApIF9oaXN0b3J5Lmxlbmd0aCA9IDIwO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBwb3MgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciByYW5nZXMgPSBbXTtcbiAgICAgICAgICAgIHZhbHVlLnJlcGxhY2UoL146LywgXCJcIikuc3BsaXQoLywvKS5tYXAoZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KC8oWzw+OistXXxjP1xcZCspfFteY1xcZDw+OistXSsvKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlYWRQb3NpdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGMgPSBwYXJ0c1tpKytdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWMpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNbMF0gPT0gXCJjXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGMuc2xpY2UoMSkpIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWRpdG9yLnNlc3Npb24uZG9jLmluZGV4VG9Qb3NpdGlvbihpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHBvcy5yb3c7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2x1bW4gPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoL1xcZC8udGVzdChjKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gcGFyc2VJbnQoYykgLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgYyA9IHBhcnRzW2krK107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGMgPT0gXCI6XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBwYXJ0c1tpKytdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9cXGQvLnRlc3QoYykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW4gPSBwYXJzZUludChjKSB8fCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7cm93OiByb3csIGNvbHVtbjogY29sdW1ufTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zID0gcmVhZFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyIHJhbmdlID0gUmFuZ2UuZnJvbVBvaW50cyhwb3MsIHBvcyk7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnRzW2ldID09IFwiPlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UuZW5kID0gcmVhZFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBhcnRzW2ldID09IFwiPFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2Uuc3RhcnQgPSByZWFkUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmFuZ2VzLnVuc2hpZnQocmFuZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLmZyb21KU09OKHJhbmdlcyk7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsVG9wID0gZWRpdG9yLnJlbmRlcmVyLnNjcm9sbFRvcDtcbiAgICAgICAgICAgIGVkaXRvci5yZW5kZXJlci5zY3JvbGxTZWxlY3Rpb25JbnRvVmlldyhcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLmFuY2hvciwgXG4gICAgICAgICAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5jdXJzb3IsIFxuICAgICAgICAgICAgICAgIDAuNVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGVkaXRvci5yZW5kZXJlci5hbmltYXRlU2Nyb2xsaW5nKHNjcm9sbFRvcCk7XG4gICAgICAgIH0sXG4gICAgICAgIGhpc3Rvcnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFwcm9tcHQuZ290b0xpbmVbXCJfaGlzdG9yeVwiXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICByZXR1cm4gcHJvbXB0LmdvdG9MaW5lW1wiX2hpc3RvcnlcIl07XG5cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Q29tcGxldGlvbnM6IGZ1bmN0aW9uKGNtZExpbmUpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGNtZExpbmUuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIHZhciBtID0gdmFsdWUucmVwbGFjZSgvXjovLCBcIlwiKS5zcGxpdChcIjpcIik7XG4gICAgICAgICAgICB2YXIgcm93ID0gTWF0aC5taW4ocGFyc2VJbnQobVswXSkgfHwgMSwgZWRpdG9yLnNlc3Npb24uZ2V0TGVuZ3RoKCkpIC0gMTtcbiAgICAgICAgICAgIHZhciBsaW5lID0gZWRpdG9yLnNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnQgPSB2YWx1ZSArIFwiICBcIiArIGxpbmU7XG4gICAgICAgICAgICByZXR1cm4gW2N1cnJlbnRdLmNvbmNhdCh0aGlzLmhpc3RvcnkoKSk7XG4gICAgICAgIH0sXG4gICAgICAgICRydWxlczoge1xuICAgICAgICAgICAgc3RhcnQ6IFt7XG4gICAgICAgICAgICAgICAgcmVnZXg6IC9cXGQrLyxcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJzdHJpbmdcIlxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHJlZ2V4OiAvWzosPjwrXFwtY10vLFxuICAgICAgICAgICAgICAgIHRva2VuOiBcImtleXdvcmRcIlxuICAgICAgICAgICAgfV1cbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuLyoqXG4gKiBcbiAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja11cbiAqL1xucHJvbXB0LmNvbW1hbmRzID0gZnVuY3Rpb24oZWRpdG9yLCBjYWxsYmFjaykge1xuICAgIGZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWUobmFtZSkge1xuICAgICAgICByZXR1cm4gKG5hbWUgfHwgXCJcIikucmVwbGFjZSgvXi4vLCBmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICByZXR1cm4geC50b1VwcGVyQ2FzZSh4KTtcbiAgICAgICAgfSkucmVwbGFjZSgvW2Etel1bQS1aXS9nLCBmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICByZXR1cm4geFswXSArIFwiIFwiICsgeFsxXS50b0xvd2VyQ2FzZSh4KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGdldEVkaXRvckNvbW1hbmRzQnlOYW1lKGV4Y2x1ZGVDb21tYW5kcykge1xuICAgICAgICB2YXIgY29tbWFuZHNCeU5hbWUgPSBbXTtcbiAgICAgICAgdmFyIGNvbW1hbmRNYXAgPSB7fTtcbiAgICAgICAgZWRpdG9yLmtleUJpbmRpbmcuJGhhbmRsZXJzLmZvckVhY2goZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgICAgICAgdmFyIHBsYXRmb3JtID0gaGFuZGxlcltcInBsYXRmb3JtXCJdO1xuICAgICAgICAgICAgdmFyIGNibiA9IGhhbmRsZXJbXCJieU5hbWVcIl07XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGNibikge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBjYm5baV0uYmluZEtleTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXkgJiYga2V5W3BsYXRmb3JtXSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgY29tbWFuZHMgPSBjYm5baV07XG4gICAgICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gY29tbWFuZHMuZGVzY3JpcHRpb24gfHwgbm9ybWFsaXplTmFtZShjb21tYW5kcy5uYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29tbWFuZHMpKVxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kcyA9IFtjb21tYW5kc107XG4gICAgICAgICAgICAgICAgY29tbWFuZHMuZm9yRWFjaChmdW5jdGlvbihjb21tYW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29tbWFuZCAhPSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA9IGNvbW1hbmQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5lZWRsZSA9IGV4Y2x1ZGVDb21tYW5kcy5maW5kKGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWwgPT09IGNvbW1hbmQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW5lZWRsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbW1hbmRNYXBbY29tbWFuZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kTWFwW2NvbW1hbmRdLmtleSArPSBcInxcIiArIGtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZE1hcFtjb21tYW5kXSA9IHtrZXk6IGtleSwgY29tbWFuZDogY29tbWFuZCwgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9ufTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kc0J5TmFtZS5wdXNoKGNvbW1hbmRNYXBbY29tbWFuZF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29tbWFuZHNCeU5hbWU7XG4gICAgfVxuICAgIC8vIGV4Y2x1ZGUgY29tbWFuZHMgdGhhdCBjYW4gbm90IGJlIGV4ZWN1dGVkIHdpdGhvdXQgYXJnc1xuICAgIHZhciBleGNsdWRlQ29tbWFuZHNMaXN0ID0gW1wiaW5zZXJ0c3RyaW5nXCIsIFwiaW5zZXJ0dGV4dFwiLCBcInNldEluZGVudGF0aW9uXCIsIFwicGFzdGVcIl07XG4gICAgdmFyIHNob3J0Y3V0c0FycmF5ID0gZ2V0RWRpdG9yQ29tbWFuZHNCeU5hbWUoZXhjbHVkZUNvbW1hbmRzTGlzdCk7XG4gICAgc2hvcnRjdXRzQXJyYXkgPSBzaG9ydGN1dHNBcnJheS5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICByZXR1cm4ge3ZhbHVlOiBpdGVtLmRlc2NyaXB0aW9uLCBtZXRhOiBpdGVtLmtleSwgY29tbWFuZDogaXRlbS5jb21tYW5kfTtcbiAgICB9KTtcbiAgICBwcm9tcHQoZWRpdG9yLCBcIlwiLCAge1xuICAgICAgICBuYW1lOiBcImNvbW1hbmRzXCIsXG4gICAgICAgIHNlbGVjdGlvbjogWzAsIE51bWJlci5NQVhfVkFMVUVdLFxuICAgICAgICBtYXhIaXN0b3J5Q291bnQ6IDUsXG4gICAgICAgIG9uQWNjZXB0OiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5pdGVtKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbW1hbmROYW1lID0gZGF0YS5pdGVtLmNvbW1hbmQ7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUb0hpc3RvcnkoZGF0YS5pdGVtKTtcblxuICAgICAgICAgICAgICAgIGVkaXRvci5leGVjQ29tbWFuZChjb21tYW5kTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGFkZFRvSGlzdG9yeTogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgdmFyIGhpc3RvcnkgPSB0aGlzLmhpc3RvcnkoKTtcbiAgICAgICAgICAgIGhpc3RvcnkudW5zaGlmdChpdGVtKTtcbiAgICAgICAgICAgIGRlbGV0ZSBpdGVtLm1lc3NhZ2U7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGhpc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaGlzdG9yeVtpXVtcImNvbW1hbmRcIl0gPT0gaXRlbS5jb21tYW5kICkge1xuICAgICAgICAgICAgICAgICAgICBoaXN0b3J5LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubWF4SGlzdG9yeUNvdW50ID4gMCAmJiBoaXN0b3J5Lmxlbmd0aCA+IHRoaXMubWF4SGlzdG9yeUNvdW50KSB7XG4gICAgICAgICAgICAgICAgaGlzdG9yeS5zcGxpY2UoaGlzdG9yeS5sZW5ndGggLSAxLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb21wdC5jb21tYW5kc1tcImhpc3RvcnlcIl0gPSBoaXN0b3J5O1xuICAgICAgICB9LFxuICAgICAgICBoaXN0b3J5OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBwcm9tcHQuY29tbWFuZHNbXCJoaXN0b3J5XCJdIHx8IFtdO1xuICAgICAgICB9LFxuICAgICAgICBnZXRQcmVmaXg6IGZ1bmN0aW9uKGNtZExpbmUpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50UG9zID0gY21kTGluZS5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGZpbHRlclZhbHVlID0gY21kTGluZS5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlclZhbHVlLnN1YnN0cmluZygwLCBjdXJyZW50UG9zLmNvbHVtbik7XG4gICAgICAgIH0sXG4gICAgICAgIGdldENvbXBsZXRpb25zOiBmdW5jdGlvbihjbWRMaW5lKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRGaWx0ZXJlZENvbXBsZXRpb25zKGNvbW1hbmRzLCBwcmVmaXgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0Q29tbWFuZHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbW1hbmRzKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZmlsdGVyZWQgPSBuZXcgRmlsdGVyZWRMaXN0KHJlc3VsdENvbW1hbmRzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyZWQuZmlsdGVyQ29tcGxldGlvbnMocmVzdWx0Q29tbWFuZHMsIHByZWZpeCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFVuaXF1ZUNvbW1hbmRMaXN0KGNvbW1hbmRzLCB1c2VkQ29tbWFuZHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXVzZWRDb21tYW5kcyB8fCAhdXNlZENvbW1hbmRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBleGNsdWRlQ29tbWFuZHMgPSBbXTtcbiAgICAgICAgICAgICAgICB1c2VkQ29tbWFuZHMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4Y2x1ZGVDb21tYW5kcy5wdXNoKGl0ZW0uY29tbWFuZCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0Q29tbWFuZHMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGNvbW1hbmRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhjbHVkZUNvbW1hbmRzLmluZGV4T2YoaXRlbS5jb21tYW5kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdENvbW1hbmRzLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRDb21tYW5kcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHByZWZpeCA9IHRoaXMuZ2V0UHJlZml4KGNtZExpbmUpO1xuICAgICAgICAgICAgdmFyIHJlY2VudGx5VXNlZENvbW1hbmRzID0gZ2V0RmlsdGVyZWRDb21wbGV0aW9ucyh0aGlzLmhpc3RvcnkoKSwgcHJlZml4KTtcbiAgICAgICAgICAgIHZhciBvdGhlckNvbW1hbmRzID0gZ2V0VW5pcXVlQ29tbWFuZExpc3Qoc2hvcnRjdXRzQXJyYXksIHJlY2VudGx5VXNlZENvbW1hbmRzKTtcbiAgICAgICAgICAgIG90aGVyQ29tbWFuZHMgPSBnZXRGaWx0ZXJlZENvbXBsZXRpb25zKG90aGVyQ29tbWFuZHMsIHByZWZpeCk7XG5cbiAgICAgICAgICAgIGlmIChyZWNlbnRseVVzZWRDb21tYW5kcy5sZW5ndGggJiYgb3RoZXJDb21tYW5kcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZWNlbnRseVVzZWRDb21tYW5kc1swXS5tZXNzYWdlID0gbmxzKFwicHJvbXB0LnJlY2VudGx5LXVzZWRcIiwgXCJSZWNlbnRseSB1c2VkXCIpO1xuICAgICAgICAgICAgICAgIG90aGVyQ29tbWFuZHNbMF0ubWVzc2FnZSA9IG5scyhcInByb21wdC5vdGhlci1jb21tYW5kc1wiLCBcIk90aGVyIGNvbW1hbmRzXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY29tcGxldGlvbnMgPSByZWNlbnRseVVzZWRDb21tYW5kcy5jb25jYXQob3RoZXJDb21tYW5kcyk7XG4gICAgICAgICAgICByZXR1cm4gY29tcGxldGlvbnMubGVuZ3RoID4gMCA/IGNvbXBsZXRpb25zIDogW3tcbiAgICAgICAgICAgICAgICB2YWx1ZTogbmxzKFwicHJvbXB0Lm5vLW1hdGNoaW5nLWNvbW1hbmRzXCIsIFwiTm8gbWF0Y2hpbmcgY29tbWFuZHNcIiksXG4gICAgICAgICAgICAgICAgZXJyb3I6IDFcbiAgICAgICAgICAgIH1dO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG4vKipcbiAqXG4gKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdXG4gKi9cbnByb21wdC5tb2RlcyA9IGZ1bmN0aW9uKGVkaXRvciwgY2FsbGJhY2spIHtcbiAgICAvKipAdHlwZSB7YW55W119Ki9cbiAgICB2YXIgbW9kZXNBcnJheSA9IG1vZGVsaXN0Lm1vZGVzO1xuICAgIG1vZGVzQXJyYXkgPSBtb2Rlc0FycmF5Lm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHJldHVybiB7dmFsdWU6IGl0ZW0uY2FwdGlvbiwgbW9kZTogaXRlbS5uYW1lfTtcbiAgICB9KTtcbiAgICBwcm9tcHQoZWRpdG9yLCBcIlwiLCAge1xuICAgICAgICBuYW1lOiBcIm1vZGVzXCIsXG4gICAgICAgIHNlbGVjdGlvbjogWzAsIE51bWJlci5NQVhfVkFMVUVdLFxuICAgICAgICBvbkFjY2VwdDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaXRlbSkge1xuICAgICAgICAgICAgICAgIHZhciBtb2RlTmFtZSA9IFwiYWNlL21vZGUvXCIgKyBkYXRhLml0ZW0ubW9kZTtcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2Vzc2lvbi5zZXRNb2RlKG1vZGVOYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZ2V0UHJlZml4OiBmdW5jdGlvbihjbWRMaW5lKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudFBvcyA9IGNtZExpbmUuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciBmaWx0ZXJWYWx1ZSA9IGNtZExpbmUuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJWYWx1ZS5zdWJzdHJpbmcoMCwgY3VycmVudFBvcy5jb2x1bW4pO1xuICAgICAgICB9LFxuICAgICAgICBnZXRDb21wbGV0aW9uczogZnVuY3Rpb24oY21kTGluZSkge1xuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0RmlsdGVyZWRDb21wbGV0aW9ucyhtb2RlcywgcHJlZml4KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdENvbW1hbmRzID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShtb2RlcykpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGZpbHRlcmVkID0gbmV3IEZpbHRlcmVkTGlzdChyZXN1bHRDb21tYW5kcyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkLmZpbHRlckNvbXBsZXRpb25zKHJlc3VsdENvbW1hbmRzLCBwcmVmaXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcHJlZml4ID0gdGhpcy5nZXRQcmVmaXgoY21kTGluZSk7XG4gICAgICAgICAgICB2YXIgY29tcGxldGlvbnMgPSBnZXRGaWx0ZXJlZENvbXBsZXRpb25zKG1vZGVzQXJyYXksIHByZWZpeCk7XG4gICAgICAgICAgICByZXR1cm4gY29tcGxldGlvbnMubGVuZ3RoID4gMCA/IGNvbXBsZXRpb25zIDogW3tcbiAgICAgICAgICAgICAgICBcImNhcHRpb25cIjogXCJObyBtb2RlIG1hdGNoaW5nXCIsXG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiBcIk5vIG1vZGUgbWF0Y2hpbmdcIixcbiAgICAgICAgICAgICAgICBcImVycm9yXCI6IDFcbiAgICAgICAgICAgIH1dO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5kb20uaW1wb3J0Q3NzU3RyaW5nKGAuYWNlX3Byb21wdF9jb250YWluZXIge1xuICAgIG1heC13aWR0aDogNjAzcHg7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWFyZ2luOiAyMHB4IGF1dG87XG4gICAgcGFkZGluZzogM3B4O1xuICAgIGJhY2tncm91bmQ6IHdoaXRlO1xuICAgIGJvcmRlci1yYWRpdXM6IDJweDtcbiAgICBib3gtc2hhZG93OiAwcHggMnB4IDNweCAwcHggIzU1NTtcbn1gLCBcInByb210cC5jc3NcIiwgZmFsc2UpO1xuXG5cbmV4cG9ydHMucHJvbXB0ID0gcHJvbXB0O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9