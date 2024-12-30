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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjEwODUuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7QUFDYixVQUFVLG1CQUFPLENBQUMsS0FBZTtBQUNqQyxjQUFjLG1CQUFPLENBQUMsS0FBcUI7QUFDM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGFBQWE7QUFDeEI7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsWUFBWTtBQUNuRCwwQkFBMEIsT0FBTyxVQUFVLFFBQVEsUUFBUTtBQUMzRCx3QkFBd0I7QUFDeEIsd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7O0FDL0RZOztBQUViO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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LFdBQVcsUUFBUTtBQUNuQixXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBLGNBQWMsTUFBTTtBQUNwQjtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRCxjQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L21lbnVfdG9vbHMvb3ZlcmxheV9wYWdlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tZW51X3Rvb2xzL3NldHRpbmdzX21lbnUuY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tb2RlbGlzdC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvcHJvbXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qanNsaW50IGluZGVudDogNCwgbWF4ZXJyOiA1MCwgd2hpdGU6IHRydWUsIGJyb3dzZXI6IHRydWUsIHZhcnM6IHRydWUqL1xuLypnbG9iYWwgZGVmaW5lLCByZXF1aXJlICovXG5cbi8qKlxuICogT3ZlcmxheSBQYWdlXG4gKiBAZmlsZU92ZXJ2aWV3IE92ZXJsYXkgUGFnZSA8YnIgLz5cbiAqIEdlbmVyYXRlcyBhbiBvdmVybGF5IGZvciBkaXNwbGF5aW5nIG1lbnVzLiBUaGUgb3ZlcmxheSBpcyBhbiBhYnNvbHV0ZWx5XG4gKiAgcG9zaXRpb25lZCBkaXYuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICovXG5cbid1c2Ugc3RyaWN0JztcbnZhciBkb20gPSByZXF1aXJlKFwiLi4vLi4vbGliL2RvbVwiKTtcbnZhciBjc3NUZXh0ID0gcmVxdWlyZShcIi4vc2V0dGluZ3NfbWVudS5jc3NcIik7XG5kb20uaW1wb3J0Q3NzU3RyaW5nKGNzc1RleHQsIFwic2V0dGluZ3NfbWVudS5jc3NcIiwgZmFsc2UpO1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhbiBvdmVybGF5IGZvciBkaXNwbGF5aW5nIG1lbnVzLiBUaGUgb3ZlcmxheSBpcyBhbiBhYnNvbHV0ZWx5XG4gKiAgcG9zaXRpb25lZCBkaXYuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHBhcmFtIGVkaXRvclxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gY29udGVudEVsZW1lbnQgQW55IGVsZW1lbnQgd2hpY2ggbWF5IGJlIHByZXNlbnRlZCBpbnNpZGVcbiAqICBhIGRpdi5cbiAqIEBwYXJhbSBbY2FsbGJhY2tdXG4gKi9cbm1vZHVsZS5leHBvcnRzLm92ZXJsYXlQYWdlID0gZnVuY3Rpb24gb3ZlcmxheVBhZ2UoZWRpdG9yLCBjb250ZW50RWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICB2YXIgY2xvc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGlnbm9yZUZvY3VzT3V0ID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkb2N1bWVudEVzY0xpc3RlbmVyKGUpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgaWYgKCFjbG9zZXIpIHJldHVybjtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGRvY3VtZW50RXNjTGlzdGVuZXIpO1xuICAgICAgICBjbG9zZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjbG9zZXIpO1xuICAgICAgICBpZiAoZWRpdG9yKSB7XG4gICAgICAgICAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBjbG9zZXIgPSBudWxsO1xuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgb3ZlcmxheSBpcyBjbG9zZWQgd2hlbiB1c2VyIGNsaWNrcyBvdXRzaWRlIG9mIGl0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaWdub3JlICAgICAgSWYgc2V0IHRvIHRydWUgb3ZlcmxheSBzdGF5cyBvcGVuIHdoZW4gZm9jdXMgbW92ZXMgdG8gYW5vdGhlciBwYXJ0IG9mIHRoZSBlZGl0b3IuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0SWdub3JlRm9jdXNPdXQoaWdub3JlKSB7XG4gICAgICAgIGlnbm9yZUZvY3VzT3V0ID0gaWdub3JlO1xuICAgICAgICBpZiAoaWdub3JlKSB7XG4gICAgICAgICAgICBjbG9zZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgICAgY29udGVudEVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VyLnN0eWxlLmNzc1RleHQgPSAnbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyAnICtcbiAgICAgICAgJ3Bvc2l0aW9uOiBmaXhlZDsgdG9wOjA7IGJvdHRvbTowOyBsZWZ0OjA7IHJpZ2h0OjA7JyArXG4gICAgICAgICd6LWluZGV4OiA5OTkwOyAnICtcbiAgICAgICAgKGVkaXRvciA/ICdiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7JyA6ICcnKTtcbiAgICBjbG9zZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghaWdub3JlRm9jdXNPdXQpIHtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBjbGljayBjbG9zZXIgaWYgZXNjIGtleSBpcyBwcmVzc2VkXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGRvY3VtZW50RXNjTGlzdGVuZXIpO1xuXG4gICAgY29udGVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgY2xvc2VyLmFwcGVuZENoaWxkKGNvbnRlbnRFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNsb3Nlcik7XG4gICAgaWYgKGVkaXRvcikge1xuICAgICAgICBlZGl0b3IuYmx1cigpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBjbG9zZTogY2xvc2UsXG4gICAgICAgIHNldElnbm9yZUZvY3VzT3V0OiBzZXRJZ25vcmVGb2N1c091dFxuICAgIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBgI2FjZV9zZXR0aW5nc21lbnUsICNrYnNob3J0Y3V0bWVudSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0Y3RjdGNztcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgYm94LXNoYWRvdzogLTVweCA0cHggNXB4IHJnYmEoMTI2LCAxMjYsIDEyNiwgMC41NSk7XG4gICAgcGFkZGluZzogMWVtIDAuNWVtIDJlbSAxZW07XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG1hcmdpbjogMDtcbiAgICBib3R0b206IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgdG9wOiAwO1xuICAgIHotaW5kZXg6IDk5OTE7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4uYWNlX2RhcmsgI2FjZV9zZXR0aW5nc21lbnUsIC5hY2VfZGFyayAja2JzaG9ydGN1dG1lbnUge1xuICAgIGJveC1zaGFkb3c6IC0yMHB4IDEwcHggMjVweCByZ2JhKDEyNiwgMTI2LCAxMjYsIDAuMjUpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcbiAgICBjb2xvcjogYmxhY2s7XG59XG5cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeTpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMDAsIDEwMCwgMTAwLCAwLjEpO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzXG59XG5cbi5hY2VfY2xvc2VCdXR0b24ge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjQ1LCAxNDYsIDE0NiwgMC41KTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRjQ4QThBO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBwYWRkaW5nOiA3cHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAtOHB4O1xuICAgIHRvcDogLThweDtcbiAgICB6LWluZGV4OiAxMDAwMDA7XG59XG4uYWNlX2Nsb3NlQnV0dG9ue1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjQ1LCAxNDYsIDE0NiwgMC45KTtcbn1cbi5hY2Vfb3B0aW9uc01lbnVLZXkge1xuICAgIGNvbG9yOiBkYXJrc2xhdGVibHVlO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuLmFjZV9vcHRpb25zTWVudUNvbW1hbmQge1xuICAgIGNvbG9yOiBkYXJrY3lhbjtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGlucHV0LCAuYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uIHtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuXG4uYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uW2FjZV9zZWxlY3RlZF9idXR0b249dHJ1ZV0ge1xuICAgIGJhY2tncm91bmQ6ICNlN2U3ZTc7XG4gICAgYm94LXNoYWRvdzogMXB4IDBweCAycHggMHB4ICNhZGFkYWQgaW5zZXQ7XG4gICAgYm9yZGVyLWNvbG9yOiAjYWRhZGFkO1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICAgIG1hcmdpbjogMHB4O1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvbjpob3ZlcntcbiAgICBiYWNrZ3JvdW5kOiAjZjBmMGYwO1xufWA7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLyoqXG4gKiBAdHlwZSB7TW9kZVtdfVxuICovXG52YXIgbW9kZXMgPSBbXTtcbi8qKlxuICogU3VnZ2VzdHMgYSBtb2RlIGJhc2VkIG9uIHRoZSBmaWxlIGV4dGVuc2lvbiBwcmVzZW50IGluIHRoZSBnaXZlbiBwYXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCB0byB0aGUgZmlsZVxuICogQHJldHVybnMge01vZGV9IFJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlXG4gKiAgc3VnZ2VzdGVkIG1vZGUuXG4gKi9cbmZ1bmN0aW9uIGdldE1vZGVGb3JQYXRoKHBhdGgpIHtcbiAgICB2YXIgbW9kZSA9IG1vZGVzQnlOYW1lLnRleHQ7XG4gICAgdmFyIGZpbGVOYW1lID0gcGF0aC5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobW9kZXNbaV0uc3VwcG9ydHNGaWxlKGZpbGVOYW1lKSkge1xuICAgICAgICAgICAgbW9kZSA9IG1vZGVzW2ldO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1vZGU7XG59XG5cbmNsYXNzIE1vZGUge1xuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNhcHRpb25cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZXh0ZW5zaW9uc1xuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGNhcHRpb24sIGV4dGVuc2lvbnMpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jYXB0aW9uID0gY2FwdGlvbjtcbiAgICAgICAgdGhpcy5tb2RlID0gXCJhY2UvbW9kZS9cIiArIG5hbWU7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnM7XG4gICAgICAgIHZhciByZTtcbiAgICAgICAgaWYgKC9cXF4vLnRlc3QoZXh0ZW5zaW9ucykpIHtcbiAgICAgICAgICAgIHJlID0gZXh0ZW5zaW9ucy5yZXBsYWNlKC9cXHwoXFxeKT8vZywgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIkfFwiICsgKGIgPyBcIl5cIiA6IFwiXi4qXFxcXC5cIik7XG4gICAgICAgICAgICB9KSArIFwiJFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmUgPSBcIl4uKlxcXFwuKFwiICsgZXh0ZW5zaW9ucyArIFwiKSRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZXh0UmUgPSBuZXcgUmVnRXhwKHJlLCBcImdpXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBmaWxlbmFtZVxuICAgICAqL1xuICAgIHN1cHBvcnRzRmlsZShmaWxlbmFtZSkge1xuICAgICAgICByZXR1cm4gZmlsZW5hbWUubWF0Y2godGhpcy5leHRSZSk7XG4gICAgfVxufVxuXG4vLyB0b2RvIGZpcnN0bGluZW1hdGNoXG52YXIgc3VwcG9ydGVkTW9kZXMgPSB7XG4gICAgQUJBUDogICAgICAgIFtcImFiYXBcIl0sXG4gICAgQUJDOiAgICAgICAgIFtcImFiY1wiXSxcbiAgICBBY3Rpb25TY3JpcHQ6W1wiYXNcIl0sXG4gICAgQURBOiAgICAgICAgIFtcImFkYXxhZGJcIl0sXG4gICAgQWxkYTogICAgICAgIFtcImFsZGFcIl0sXG4gICAgQXBhY2hlX0NvbmY6IFtcIl5odGFjY2Vzc3xeaHRncm91cHN8Xmh0cGFzc3dkfF5jb25mfGh0YWNjZXNzfGh0Z3JvdXBzfGh0cGFzc3dkXCJdLFxuICAgIEFwZXg6ICAgICAgICBbXCJhcGV4fGNsc3x0cmlnZ2VyfHRnclwiXSxcbiAgICBBUUw6ICAgICAgICAgW1wiYXFsXCJdLFxuICAgIEFzY2lpRG9jOiAgICBbXCJhc2NpaWRvY3xhZG9jXCJdLFxuICAgIEFTTDogICAgICAgICBbXCJkc2x8YXNsfGFzbC5qc29uXCJdLFxuICAgIEFzc2VtYmx5X0FSTTMyOltcInNcIl0sXG4gICAgQXNzZW1ibHlfeDg2OltcImFzbXxhXCJdLFxuICAgIEFzdHJvOiAgICAgICBbXCJhc3Ryb1wiXSxcbiAgICBBdXRvSG90S2V5OiAgW1wiYWhrXCJdLFxuICAgIEJhdGNoRmlsZTogICBbXCJiYXR8Y21kXCJdLFxuICAgIEJhc2ljOiAgICAgICBbXCJiYXN8YmFrXCJdLFxuICAgIEJpYlRlWDogICAgICBbXCJiaWJcIl0sXG4gICAgQ19DcHA6ICAgICAgIFtcImNwcHxjfGNjfGN4eHxofGhofGhwcHxpbm9cIl0sXG4gICAgQzlTZWFyY2g6ICAgIFtcImM5c2VhcmNoX3Jlc3VsdHNcIl0sXG4gICAgQ2lycnU6ICAgICAgIFtcImNpcnJ1fGNyXCJdLFxuICAgIENsb2p1cmU6ICAgICBbXCJjbGp8Y2xqc1wiXSxcbiAgICBDb2JvbDogICAgICAgW1wiQ0JMfENPQlwiXSxcbiAgICBjb2ZmZWU6ICAgICAgW1wiY29mZmVlfGNmfGNzb258XkNha2VmaWxlXCJdLFxuICAgIENvbGRGdXNpb246ICBbXCJjZm18Y2ZjXCJdLFxuICAgIENyeXN0YWw6ICAgICBbXCJjclwiXSxcbiAgICBDU2hhcnA6ICAgICAgW1wiY3NcIl0sXG4gICAgQ3NvdW5kX0RvY3VtZW50OiBbXCJjc2RcIl0sXG4gICAgQ3NvdW5kX09yY2hlc3RyYTogW1wib3JjXCJdLFxuICAgIENzb3VuZF9TY29yZTogW1wic2NvXCJdLFxuICAgIENTUzogICAgICAgICBbXCJjc3NcIl0sXG4gICAgQ3VybHk6ICAgICAgIFtcImN1cmx5XCJdLFxuICAgIEN1dHRsZWZpc2g6ICBbXCJjb25mXCJdLFxuICAgIEQ6ICAgICAgICAgICBbXCJkfGRpXCJdLFxuICAgIERhcnQ6ICAgICAgICBbXCJkYXJ0XCJdLFxuICAgIERpZmY6ICAgICAgICBbXCJkaWZmfHBhdGNoXCJdLFxuICAgIERqYW5nbzogICAgICBbXCJkanR8aHRtbC5kanR8ZGouaHRtbHxkamh0bWxcIl0sXG4gICAgRG9ja2VyZmlsZTogIFtcIl5Eb2NrZXJmaWxlXCJdLFxuICAgIERvdDogICAgICAgICBbXCJkb3RcIl0sXG4gICAgRHJvb2xzOiAgICAgIFtcImRybFwiXSxcbiAgICBFZGlmYWN0OiAgICAgW1wiZWRpXCJdLFxuICAgIEVpZmZlbDogICAgICBbXCJlfGdlXCJdLFxuICAgIEVKUzogICAgICAgICBbXCJlanNcIl0sXG4gICAgRWxpeGlyOiAgICAgIFtcImV4fGV4c1wiXSxcbiAgICBFbG06ICAgICAgICAgW1wiZWxtXCJdLFxuICAgIEVybGFuZzogICAgICBbXCJlcmx8aHJsXCJdLFxuICAgIEZsaXg6ICAgICAgICBbXCJmbGl4XCJdLFxuICAgIEZvcnRoOiAgICAgICBbXCJmcnR8ZnN8bGRyfGZ0aHw0dGhcIl0sXG4gICAgRm9ydHJhbjogICAgIFtcImZ8ZjkwXCJdLFxuICAgIEZTaGFycDogICAgICBbXCJmc2l8ZnN8bWx8bWxpfGZzeHxmc3NjcmlwdFwiXSxcbiAgICBGU0w6ICAgICAgICAgW1wiZnNsXCJdLFxuICAgIEZUTDogICAgICAgICBbXCJmdGxcIl0sXG4gICAgR2NvZGU6ICAgICAgIFtcImdjb2RlXCJdLFxuICAgIEdoZXJraW46ICAgICBbXCJmZWF0dXJlXCJdLFxuICAgIEdpdGlnbm9yZTogICBbXCJeLmdpdGlnbm9yZVwiXSxcbiAgICBHbHNsOiAgICAgICAgW1wiZ2xzbHxmcmFnfHZlcnRcIl0sXG4gICAgR29ic3RvbmVzOiAgIFtcImdic1wiXSxcbiAgICBnb2xhbmc6ICAgICAgW1wiZ29cIl0sXG4gICAgR3JhcGhRTFNjaGVtYTogW1wiZ3FsXCJdLFxuICAgIEdyb292eTogICAgICBbXCJncm9vdnlcIl0sXG4gICAgSEFNTDogICAgICAgIFtcImhhbWxcIl0sXG4gICAgSGFuZGxlYmFyczogIFtcImhic3xoYW5kbGViYXJzfHRwbHxtdXN0YWNoZVwiXSxcbiAgICBIYXNrZWxsOiAgICAgW1wiaHNcIl0sXG4gICAgSGFza2VsbF9DYWJhbDogW1wiY2FiYWxcIl0sXG4gICAgaGFYZTogICAgICAgIFtcImh4XCJdLFxuICAgIEhqc29uOiAgICAgICBbXCJoanNvblwiXSxcbiAgICBIVE1MOiBbXCJodG1sfGh0bXx4aHRtbHx3ZXx3cHlcIl0sXG4gICAgSFRNTF9FbGl4aXI6IFtcImVleHxodG1sLmVleFwiXSxcbiAgICBIVE1MX1J1Ynk6ICAgW1wiZXJifHJodG1sfGh0bWwuZXJiXCJdLFxuICAgIElOSTogICAgICAgICBbXCJpbml8Y29uZnxjZmd8cHJlZnNcIl0sXG4gICAgSW86ICAgICAgICAgIFtcImlvXCJdLFxuICAgIElvbjogICAgICAgICBbXCJpb25cIl0sXG4gICAgSmFjazogICAgICAgIFtcImphY2tcIl0sXG4gICAgSmFkZTogICAgICAgIFtcImphZGV8cHVnXCJdLFxuICAgIEphdmE6ICAgICAgICBbXCJqYXZhXCJdLFxuICAgIEphdmFTY3JpcHQ6ICBbXCJqc3xqc218Y2pzfG1qc1wiXSxcbiAgICBKRVhMOiAgICAgICAgW1wiamV4bFwiXSxcbiAgICBKU09OOiAgICAgICAgW1wianNvblwiXSxcbiAgICBKU09ONTogICAgICAgW1wianNvbjVcIl0sXG4gICAgSlNPTmlxOiAgICAgIFtcImpxXCJdLFxuICAgIEpTUDogICAgICAgICBbXCJqc3BcIl0sXG4gICAgSlNTTTogICAgICAgIFtcImpzc218anNzbV9zdGF0ZVwiXSxcbiAgICBKU1g6ICAgICAgICAgW1wianN4XCJdLFxuICAgIEp1bGlhOiAgICAgICBbXCJqbFwiXSxcbiAgICBLb3RsaW46ICAgICAgW1wia3R8a3RzXCJdLFxuICAgIExhVGVYOiAgICAgICBbXCJ0ZXh8bGF0ZXh8bHR4fGJpYlwiXSxcbiAgICBMYXR0ZTogICAgICAgW1wibGF0dGVcIl0sXG4gICAgTEVTUzogICAgICAgIFtcImxlc3NcIl0sXG4gICAgTGlxdWlkOiAgICAgIFtcImxpcXVpZFwiXSxcbiAgICBMaXNwOiAgICAgICAgW1wibGlzcFwiXSxcbiAgICBMaXZlU2NyaXB0OiAgW1wibHNcIl0sXG4gICAgTG9nOiAgICAgICAgIFtcImxvZ1wiXSxcbiAgICBMb2dpUUw6ICAgICAgW1wibG9naWN8bHFsXCJdLFxuICAgIExvZ3RhbGs6ICAgICBbXCJsZ3RcIl0sXG4gICAgTFNMOiAgICAgICAgIFtcImxzbFwiXSxcbiAgICBMdWE6ICAgICAgICAgW1wibHVhXCJdLFxuICAgIEx1YVBhZ2U6ICAgICBbXCJscFwiXSxcbiAgICBMdWNlbmU6ICAgICAgW1wibHVjZW5lXCJdLFxuICAgIE1ha2VmaWxlOiAgICBbXCJeTWFrZWZpbGV8XkdOVW1ha2VmaWxlfF5tYWtlZmlsZXxeT0NhbWxNYWtlZmlsZXxtYWtlXCJdLFxuICAgIE1hcmtkb3duOiAgICBbXCJtZHxtYXJrZG93blwiXSxcbiAgICBNYXNrOiAgICAgICAgW1wibWFza1wiXSxcbiAgICBNQVRMQUI6ICAgICAgW1wibWF0bGFiXCJdLFxuICAgIE1hemU6ICAgICAgICBbXCJtelwiXSxcbiAgICBNZWRpYVdpa2k6ICAgW1wid2lraXxtZWRpYXdpa2lcIl0sXG4gICAgTUVMOiAgICAgICAgIFtcIm1lbFwiXSxcbiAgICBNSVBTOiAgICAgICAgW1wic3xhc21cIl0sXG4gICAgTUlYQUw6ICAgICAgIFtcIm1peGFsXCJdLFxuICAgIE1VU0hDb2RlOiAgICBbXCJtY3xtdXNoXCJdLFxuICAgIE15U1FMOiAgICAgICBbXCJteXNxbFwiXSxcbiAgICBOYXNhbDogICAgICAgW1wibmFzXCJdLFxuICAgIE5naW54OiAgICAgICBbXCJuZ2lueHxjb25mXCJdLFxuICAgIE5pbTogICAgICAgICBbXCJuaW1cIl0sXG4gICAgTml4OiAgICAgICAgIFtcIm5peFwiXSxcbiAgICBOU0lTOiAgICAgICAgW1wibnNpfG5zaFwiXSxcbiAgICBOdW5qdWNrczogICAgW1wibnVuanVja3N8bnVuanN8bmp8bmprXCJdLFxuICAgIE9iamVjdGl2ZUM6ICBbXCJtfG1tXCJdLFxuICAgIE9DYW1sOiAgICAgICBbXCJtbHxtbGlcIl0sXG4gICAgT2RpbjogICAgICAgIFtcIm9kaW5cIl0sXG4gICAgUGFydGlRTDogICAgIFtcInBhcnRpcWx8cHFsXCJdLFxuICAgIFBhc2NhbDogICAgICBbXCJwYXN8cFwiXSxcbiAgICBQZXJsOiAgICAgICAgW1wicGx8cG1cIl0sXG4gICAgcGdTUUw6ICAgICAgIFtcInBnc3FsXCJdLFxuICAgIFBIUDogICAgICAgICBbXCJwaHB8aW5jfHBodG1sfHNodG1sfHBocDN8cGhwNHxwaHA1fHBocHN8cGhwdHxhd3xjdHB8bW9kdWxlXCJdLFxuICAgIFBIUF9MYXJhdmVsX2JsYWRlOiBbXCJibGFkZS5waHBcIl0sXG4gICAgUGlnOiAgICAgICAgIFtcInBpZ1wiXSxcbiAgICBQTFNRTDogICAgICAgW1wicGxzcWxcIl0sXG4gICAgUG93ZXJzaGVsbDogIFtcInBzMVwiXSxcbiAgICBQcmFhdDogICAgICAgW1wicHJhYXR8cHJhYXRzY3JpcHR8cHNjfHByb2NcIl0sXG4gICAgUHJpc21hOiAgICAgIFtcInByaXNtYVwiXSxcbiAgICBQcm9sb2c6ICAgICAgW1wicGxnfHByb2xvZ1wiXSxcbiAgICBQcm9wZXJ0aWVzOiAgW1wicHJvcGVydGllc1wiXSxcbiAgICBQcm90b2J1ZjogICAgW1wicHJvdG9cIl0sXG4gICAgUFJRTDogICAgICAgIFtcInBycWxcIl0sXG4gICAgUHVwcGV0OiAgICAgIFtcImVwcHxwcFwiXSxcbiAgICBQeXRob246ICAgICAgW1wicHlcIl0sXG4gICAgUU1MOiAgICAgICAgIFtcInFtbFwiXSxcbiAgICBSOiAgICAgICAgICAgW1wiclwiXSxcbiAgICBSYWt1OiAgICAgICAgW1wicmFrdXxyYWt1bW9kfHJha3V0ZXN0fHA2fHBsNnxwbTZcIl0sXG4gICAgUmF6b3I6ICAgICAgIFtcImNzaHRtbHxhc3BcIl0sXG4gICAgUkRvYzogICAgICAgIFtcIlJkXCJdLFxuICAgIFJlZDogICAgICAgICBbXCJyZWR8cmVkc1wiXSxcbiAgICBSSFRNTDogICAgICAgW1wiUmh0bWxcIl0sXG4gICAgUm9ib3Q6ICAgICAgIFtcInJvYm90fHJlc291cmNlXCJdLFxuICAgIFJTVDogICAgICAgICBbXCJyc3RcIl0sXG4gICAgUnVieTogICAgICAgIFtcInJifHJ1fGdlbXNwZWN8cmFrZXxeR3VhcmRmaWxlfF5SYWtlZmlsZXxeR2VtZmlsZVwiXSxcbiAgICBSdXN0OiAgICAgICAgW1wicnNcIl0sXG4gICAgU2FDOiAgICAgICAgIFtcInNhY1wiXSxcbiAgICBTQVNTOiAgICAgICAgW1wic2Fzc1wiXSxcbiAgICBTQ0FEOiAgICAgICAgW1wic2NhZFwiXSxcbiAgICBTY2FsYTogICAgICAgW1wic2NhbGF8c2J0XCJdLFxuICAgIFNjaGVtZTogICAgICBbXCJzY218c218cmt0fG9ha3xzY2hlbWVcIl0sXG4gICAgU2NyeXB0OiAgICAgIFtcInNjcnlwdFwiXSxcbiAgICBTQ1NTOiAgICAgICAgW1wic2Nzc1wiXSxcbiAgICBTSDogICAgICAgICAgW1wic2h8YmFzaHxeLmJhc2hyY1wiXSxcbiAgICBTSlM6ICAgICAgICAgW1wic2pzXCJdLFxuICAgIFNsaW06ICAgICAgICBbXCJzbGltfHNraW1cIl0sXG4gICAgU21hcnR5OiAgICAgIFtcInNtYXJ0eXx0cGxcIl0sXG4gICAgU21pdGh5OiAgICAgIFtcInNtaXRoeVwiXSxcbiAgICBzbmlwcGV0czogICAgW1wic25pcHBldHNcIl0sXG4gICAgU295X1RlbXBsYXRlOltcInNveVwiXSxcbiAgICBTcGFjZTogICAgICAgW1wic3BhY2VcIl0sXG4gICAgU1BBUlFMOiAgICAgIFtcInJxXCJdLFxuICAgIFNRTDogICAgICAgICBbXCJzcWxcIl0sXG4gICAgU1FMU2VydmVyOiAgIFtcInNxbHNlcnZlclwiXSxcbiAgICBTdHlsdXM6ICAgICAgW1wic3R5bHxzdHlsdXNcIl0sXG4gICAgU1ZHOiAgICAgICAgIFtcInN2Z1wiXSxcbiAgICBTd2lmdDogICAgICAgW1wic3dpZnRcIl0sXG4gICAgVGNsOiAgICAgICAgIFtcInRjbFwiXSxcbiAgICBUZXJyYWZvcm06ICAgW1widGZcIiwgXCJ0ZnZhcnNcIiwgXCJ0ZXJyYWdydW50XCJdLFxuICAgIFRleDogICAgICAgICBbXCJ0ZXhcIl0sXG4gICAgVGV4dDogICAgICAgIFtcInR4dFwiXSxcbiAgICBUZXh0aWxlOiAgICAgW1widGV4dGlsZVwiXSxcbiAgICBUb21sOiAgICAgICAgW1widG9tbFwiXSxcbiAgICBUU1g6ICAgICAgICAgW1widHN4XCJdLFxuICAgIFR1cnRsZTogICAgICBbXCJ0dGxcIl0sXG4gICAgVHdpZzogICAgICAgIFtcInR3aWd8c3dpZ1wiXSxcbiAgICBUeXBlc2NyaXB0OiAgW1widHN8bXRzfGN0c3x0eXBlc2NyaXB0fHN0clwiXSxcbiAgICBWYWxhOiAgICAgICAgW1widmFsYVwiXSxcbiAgICBWQlNjcmlwdDogICAgW1widmJzfHZiXCJdLFxuICAgIFZlbG9jaXR5OiAgICBbXCJ2bVwiXSxcbiAgICBWZXJpbG9nOiAgICAgW1widnx2aHxzdnxzdmhcIl0sXG4gICAgVkhETDogICAgICAgIFtcInZoZHx2aGRsXCJdLFxuICAgIFZpc3VhbGZvcmNlOiBbXCJ2ZnB8Y29tcG9uZW50fHBhZ2VcIl0sXG4gICAgVnVlOiBbXCJ2dWVcIl0sXG4gICAgV29sbG9rOiAgICAgIFtcIndsa3x3cGdtfHd0ZXN0XCJdLFxuICAgIFhNTDogICAgICAgICBbXCJ4bWx8cmRmfHJzc3x3c2RsfHhzbHR8YXRvbXxtYXRobWx8bW1sfHh1bHx4Ymx8eGFtbFwiXSxcbiAgICBYUXVlcnk6ICAgICAgW1wieHFcIl0sXG4gICAgWUFNTDogICAgICAgIFtcInlhbWx8eW1sXCJdLFxuICAgIFplZWs6ICAgICAgICBbXCJ6ZWVrfGJyb1wiXSxcbiAgICBaaWc6ICAgICAgICAgW1wiemlnXCJdXG59O1xuXG52YXIgbmFtZU92ZXJyaWRlcyA9IHtcbiAgICBPYmplY3RpdmVDOiBcIk9iamVjdGl2ZS1DXCIsXG4gICAgQ1NoYXJwOiBcIkMjXCIsXG4gICAgZ29sYW5nOiBcIkdvXCIsXG4gICAgQ19DcHA6IFwiQyBhbmQgQysrXCIsXG4gICAgQ3NvdW5kX0RvY3VtZW50OiBcIkNzb3VuZCBEb2N1bWVudFwiLFxuICAgIENzb3VuZF9PcmNoZXN0cmE6IFwiQ3NvdW5kXCIsXG4gICAgQ3NvdW5kX1Njb3JlOiBcIkNzb3VuZCBTY29yZVwiLFxuICAgIGNvZmZlZTogXCJDb2ZmZWVTY3JpcHRcIixcbiAgICBIVE1MX1J1Ynk6IFwiSFRNTCAoUnVieSlcIixcbiAgICBIVE1MX0VsaXhpcjogXCJIVE1MIChFbGl4aXIpXCIsXG4gICAgRlRMOiBcIkZyZWVNYXJrZXJcIixcbiAgICBQSFBfTGFyYXZlbF9ibGFkZTogXCJQSFAgKEJsYWRlIFRlbXBsYXRlKVwiLFxuICAgIFBlcmw2OiBcIlBlcmwgNlwiLFxuICAgIEF1dG9Ib3RLZXk6IFwiQXV0b0hvdGtleSAvIEF1dG9JdFwiXG59O1xuXG4vKipcbiAqIEB0eXBlIHtSZWNvcmQ8c3RyaW5nLCBNb2RlPn1cbiAqL1xudmFyIG1vZGVzQnlOYW1lID0ge307XG5mb3IgKHZhciBuYW1lIGluIHN1cHBvcnRlZE1vZGVzKSB7XG4gICAgdmFyIGRhdGEgPSBzdXBwb3J0ZWRNb2Rlc1tuYW1lXTtcbiAgICB2YXIgZGlzcGxheU5hbWUgPSAobmFtZU92ZXJyaWRlc1tuYW1lXSB8fCBuYW1lKS5yZXBsYWNlKC9fL2csIFwiIFwiKTtcbiAgICB2YXIgZmlsZW5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIG1vZGUgPSBuZXcgTW9kZShmaWxlbmFtZSwgZGlzcGxheU5hbWUsIGRhdGFbMF0pO1xuICAgIG1vZGVzQnlOYW1lW2ZpbGVuYW1lXSA9IG1vZGU7XG4gICAgbW9kZXMucHVzaChtb2RlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0TW9kZUZvclBhdGg6IGdldE1vZGVGb3JQYXRoLFxuICAgIG1vZGVzOiBtb2RlcyxcbiAgICBtb2Rlc0J5TmFtZTogbW9kZXNCeU5hbWVcbn07XG4iLCIvKipcbiAqIEB0eXBlZGVmIHtpbXBvcnQoXCIuLi9lZGl0b3JcIikuRWRpdG9yfSBFZGl0b3JcbiAqL1xuXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgbmxzID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKS5ubHM7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2xpYi9kb21cIik7XG52YXIgRmlsdGVyZWRMaXN0PSByZXF1aXJlKFwiLi4vYXV0b2NvbXBsZXRlXCIpLkZpbHRlcmVkTGlzdDtcbnZhciBBY2VQb3B1cCA9IHJlcXVpcmUoJy4uL2F1dG9jb21wbGV0ZS9wb3B1cCcpLkFjZVBvcHVwO1xudmFyICRzaW5nbGVMaW5lRWRpdG9yID0gcmVxdWlyZSgnLi4vYXV0b2NvbXBsZXRlL3BvcHVwJykuJHNpbmdsZUxpbmVFZGl0b3I7XG52YXIgVW5kb01hbmFnZXIgPSByZXF1aXJlKFwiLi4vdW5kb21hbmFnZXJcIikuVW5kb01hbmFnZXI7XG52YXIgVG9rZW5pemVyID0gcmVxdWlyZShcIi4uL3Rva2VuaXplclwiKS5Ub2tlbml6ZXI7XG52YXIgb3ZlcmxheVBhZ2UgPSByZXF1aXJlKFwiLi9tZW51X3Rvb2xzL292ZXJsYXlfcGFnZVwiKS5vdmVybGF5UGFnZTtcbnZhciBtb2RlbGlzdCA9IHJlcXVpcmUoXCIuL21vZGVsaXN0XCIpO1xudmFyIG9wZW5Qcm9tcHQ7XG5cbi8qKlxuICogQHR5cGVkZWYgUHJvbXB0T3B0aW9uc1xuICogQHByb3BlcnR5IHtTdHJpbmd9IG5hbWUgICAgICAgICAgICAgUHJvbXB0IG5hbWUuXG4gKiBAcHJvcGVydHkge1N0cmluZ30gJHR5cGUgICAgICAgICAgICBVc2UgcHJvbXB0IG9mIHNwZWNpZmljIHR5cGUgKGdvdG9MaW5lfGNvbW1hbmRzfG1vZGVzIG9yIGRlZmF1bHQgaWYgZW1wdHkpLlxuICogQHByb3BlcnR5IHtbbnVtYmVyLCBudW1iZXJdfSBzZWxlY3Rpb24gIERlZmluZXMgd2hpY2ggcGFydCBvZiB0aGUgcHJlZGVmaW5lZCB2YWx1ZSBzaG91bGQgYmUgaGlnaGxpZ2h0ZWQuXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGhhc0Rlc2NyaXB0aW9uICBTZXQgdG8gdHJ1ZSBpZiBwcm9tcHQgaGFzIGRlc2NyaXB0aW9uIGJlbG93IGlucHV0IGJveC5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBwcm9tcHQgICAgICAgICAgIERlc2NyaXB0aW9uIGJlbG93IGlucHV0IGJveC5cbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBwbGFjZWhvbGRlciAgICAgIFBsYWNlaG9sZGVyIGZvciB2YWx1ZS5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSAkcnVsZXMgICAgICAgICAgIFNwZWNpZmljIHJ1bGVzIGZvciBpbnB1dCBsaWtlIHBhc3N3b3JkIG9yIHJlZ2V4cC5cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gaWdub3JlRm9jdXNPdXQgIFNldCB0byB0cnVlIHRvIGtlZXAgdGhlIHByb21wdCBvcGVuIHdoZW4gZm9jdXMgbW92ZXMgdG8gYW5vdGhlciBwYXJ0IG9mIHRoZSBlZGl0b3IuXG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBnZXRDb21wbGV0aW9ucyBGdW5jdGlvbiBmb3IgZGVmaW5pbmcgbGlzdCBvZiBvcHRpb25zIGZvciB2YWx1ZS5cbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGdldFByZWZpeCAgICAgIEZ1bmN0aW9uIGZvciBkZWZpbmluZyBjdXJyZW50IHZhbHVlIHByZWZpeC5cbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IG9uQWNjZXB0ICAgICAgIEZ1bmN0aW9uIGNhbGxlZCB3aGVuIEVudGVyIGlzIHByZXNzZWQuXG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBvbklucHV0ICAgICAgICBGdW5jdGlvbiBjYWxsZWQgd2hlbiBpbnB1dCBpcyBhZGRlZCB0byBwcm9tcHQgaW5wdXQgYm94LlxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gb25DYW5jZWwgICAgICAgRnVuY3Rpb24gY2FsbGVkIHdoZW4gRXNjfFNoaWZ0LUVzYyBpcyBwcmVzc2VkLlxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gaGlzdG9yeSAgICAgICAgRnVuY3Rpb24gZm9yIGRlZmluaW5nIGhpc3RvcnkgbGlzdC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBtYXhIaXN0b3J5Q291bnRcbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGFkZFRvSGlzdG9yeVxuICovXG5cbi8qKlxuICogUHJvbXB0IHBsdWdpbiBpcyB1c2VkIGZvciBnZXR0aW5nIGlucHV0IGZyb20gdXNlci5cbiAqXG4gKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yICAgICAgICAgICAgICAgICAgIE91c2lkZSBlZGl0b3IgcmVsYXRlZCB0byB0aGlzIHByb21wdC4gV2lsbCBiZSBibHVycmVkIHdoZW4gcHJvbXB0IGlzIG9wZW4uXG4gKiBAcGFyYW0ge1N0cmluZyB8IFBhcnRpYWw8UHJvbXB0T3B0aW9ucz59IG1lc3NhZ2UgICAgICAgICAgICAgICAgICBQcmVkZWZpbmVkIHZhbHVlIG9mIHByb21wdCBpbnB1dCBib3guXG4gKiBAcGFyYW0ge1BhcnRpYWw8UHJvbXB0T3B0aW9ucz59IG9wdGlvbnMgICAgICAgICAgICAgICAgICBDdXNvbWl6YWJsZSBvcHRpb25zIGZvciB0aGlzIHByb21wdC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gICAgICAgICAgICAgICBGdW5jdGlvbiBjYWxsZWQgYWZ0ZXIgZG9uZS5cbiAqICovXG5mdW5jdGlvbiBwcm9tcHQoZWRpdG9yLCBtZXNzYWdlLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgcmV0dXJuIHByb21wdChlZGl0b3IsIFwiXCIsIG1lc3NhZ2UsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAob3BlblByb21wdCkge1xuICAgICAgICB2YXIgbGFzdFByb21wdCA9IG9wZW5Qcm9tcHQ7XG4gICAgICAgIGVkaXRvciA9IGxhc3RQcm9tcHQuZWRpdG9yO1xuICAgICAgICBsYXN0UHJvbXB0LmNsb3NlKCk7XG4gICAgICAgIGlmIChsYXN0UHJvbXB0Lm5hbWUgJiYgbGFzdFByb21wdC5uYW1lID09IG9wdGlvbnMubmFtZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuJHR5cGUpXG4gICAgICAgcmV0dXJuIHByb21wdFtvcHRpb25zLiR0eXBlXShlZGl0b3IsIGNhbGxiYWNrKTtcblxuICAgIHZhciBjbWRMaW5lID0gJHNpbmdsZUxpbmVFZGl0b3IoKTtcbiAgICBjbWRMaW5lLnNlc3Npb24uc2V0VW5kb01hbmFnZXIobmV3IFVuZG9NYW5hZ2VyKCkpO1xuXG4gICAgLyoqQHR5cGUge2FueX0qL1xuICAgIHZhciBlbCA9IGRvbS5idWlsZERvbShbXCJkaXZcIiwge2NsYXNzOiBcImFjZV9wcm9tcHRfY29udGFpbmVyXCIgKyAob3B0aW9ucy5oYXNEZXNjcmlwdGlvbiA/IFwiIGlucHV0LWJveC13aXRoLWRlc2NyaXB0aW9uXCIgOiBcIlwiKX1dKTtcbiAgICB2YXIgb3ZlcmxheSA9IG92ZXJsYXlQYWdlKGVkaXRvciwgZWwsIGRvbmUpO1xuICAgIGVsLmFwcGVuZENoaWxkKGNtZExpbmUuY29udGFpbmVyKTtcblxuICAgIGlmIChlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLmNtZExpbmUgPSBjbWRMaW5lO1xuICAgICAgICBjbWRMaW5lLnNldE9wdGlvbihcImZvbnRTaXplXCIsIGVkaXRvci5nZXRPcHRpb24oXCJmb250U2l6ZVwiKSk7XG4gICAgfVxuICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgIGNtZExpbmUuc2V0VmFsdWUobWVzc2FnZSwgMSk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNlbGVjdGlvbikge1xuICAgICAgICBjbWRMaW5lLnNlbGVjdGlvbi5zZXRSYW5nZSh7XG4gICAgICAgICAgICBzdGFydDogY21kTGluZS5zZXNzaW9uLmRvYy5pbmRleFRvUG9zaXRpb24ob3B0aW9ucy5zZWxlY3Rpb25bMF0pLFxuICAgICAgICAgICAgZW5kOiBjbWRMaW5lLnNlc3Npb24uZG9jLmluZGV4VG9Qb3NpdGlvbihvcHRpb25zLnNlbGVjdGlvblsxXSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuZ2V0Q29tcGxldGlvbnMpIHtcbiAgICAgICAgdmFyIHBvcHVwID0gbmV3IEFjZVBvcHVwKCk7XG4gICAgICAgIHBvcHVwLnJlbmRlcmVyLnNldFN0eWxlKFwiYWNlX2F1dG9jb21wbGV0ZV9pbmxpbmVcIik7XG4gICAgICAgIHBvcHVwLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBwb3B1cC5jb250YWluZXIuc3R5bGUubWF4V2lkdGggPSBcIjYwMHB4XCI7XG4gICAgICAgIHBvcHVwLmNvbnRhaW5lci5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICBwb3B1cC5jb250YWluZXIuc3R5bGUubWFyZ2luVG9wID0gXCIzcHhcIjtcbiAgICAgICAgcG9wdXAucmVuZGVyZXIuc2V0U2Nyb2xsTWFyZ2luKDIsIDIsIDAsIDApO1xuICAgICAgICBwb3B1cC5hdXRvU2VsZWN0ID0gZmFsc2U7XG4gICAgICAgIHBvcHVwLnJlbmRlcmVyLiRtYXhMaW5lcyA9IDE1O1xuICAgICAgICBwb3B1cC5zZXRSb3coLTEpO1xuICAgICAgICBwb3B1cC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gcG9wdXAuZ2V0RGF0YShwb3B1cC5nZXRSb3coKSk7XG4gICAgICAgICAgICBpZiAoIWRhdGFbXCJlcnJvclwiXSkge1xuICAgICAgICAgICAgICAgIGNtZExpbmUuc2V0VmFsdWUoZGF0YS52YWx1ZSB8fCBkYXRhW1wibmFtZVwiXSB8fCBkYXRhKTtcbiAgICAgICAgICAgICAgICBhY2NlcHQoKTtcbiAgICAgICAgICAgICAgICBlLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGVsLmFwcGVuZENoaWxkKHBvcHVwLmNvbnRhaW5lcik7XG4gICAgICAgIHVwZGF0ZUNvbXBsZXRpb25zKCk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuJHJ1bGVzKSB7XG4gICAgICAgIHZhciB0b2tlbml6ZXIgPSBuZXcgVG9rZW5pemVyKG9wdGlvbnMuJHJ1bGVzKTtcbiAgICAgICAgY21kTGluZS5zZXNzaW9uLmJnVG9rZW5pemVyLnNldFRva2VuaXplcih0b2tlbml6ZXIpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLnBsYWNlaG9sZGVyKSB7XG4gICAgICAgIGNtZExpbmUuc2V0T3B0aW9uKFwicGxhY2Vob2xkZXJcIiwgb3B0aW9ucy5wbGFjZWhvbGRlcik7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuaGFzRGVzY3JpcHRpb24pIHtcbiAgICAgICAgLyoqQHR5cGUge2FueX0qL1xuICAgICAgICB2YXIgcHJvbXB0VGV4dENvbnRhaW5lciA9IGRvbS5idWlsZERvbShbXCJkaXZcIiwge2NsYXNzOiBcImFjZV9wcm9tcHRfdGV4dF9jb250YWluZXJcIn1dKTtcbiAgICAgICAgZG9tLmJ1aWxkRG9tKG9wdGlvbnMucHJvbXB0IHx8IFwiUHJlc3MgJ0VudGVyJyB0byBjb25maXJtIG9yICdFc2NhcGUnIHRvIGNhbmNlbFwiLCBwcm9tcHRUZXh0Q29udGFpbmVyKTtcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQocHJvbXB0VGV4dENvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgb3ZlcmxheS5zZXRJZ25vcmVGb2N1c091dChvcHRpb25zLmlnbm9yZUZvY3VzT3V0KTtcblxuICAgIGZ1bmN0aW9uIGFjY2VwdCgpIHtcbiAgICAgICAgdmFyIHZhbDtcbiAgICAgICAgaWYgKHBvcHVwICYmIHBvcHVwLmdldEN1cnNvclBvc2l0aW9uKCkucm93ID4gMCkge1xuICAgICAgICAgICAgdmFsID0gdmFsdWVGcm9tUmVjZW50TGlzdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsID0gY21kTGluZS5nZXRWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJEYXRhID0gcG9wdXAgPyBwb3B1cC5nZXREYXRhKHBvcHVwLmdldFJvdygpKSA6IHZhbDtcbiAgICAgICAgaWYgKGN1ckRhdGEgJiYgIWN1ckRhdGFbXCJlcnJvclwiXSkge1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgb3B0aW9ucy5vbkFjY2VwdCAmJiBvcHRpb25zLm9uQWNjZXB0KHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsLFxuICAgICAgICAgICAgICAgIGl0ZW06IGN1ckRhdGFcbiAgICAgICAgICAgIH0sIGNtZExpbmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSB7XG4gICAgICAgIFwiRW50ZXJcIjogYWNjZXB0LFxuICAgICAgICBcIkVzY3xTaGlmdC1Fc2NcIjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBvcHRpb25zLm9uQ2FuY2VsICYmIG9wdGlvbnMub25DYW5jZWwoY21kTGluZS5nZXRWYWx1ZSgpLCBjbWRMaW5lKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAocG9wdXApIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihrZXlzLCB7XG4gICAgICAgICAgICBcIlVwXCI6IGZ1bmN0aW9uKGVkaXRvcikgeyBwb3B1cC5nb1RvKFwidXBcIik7IHZhbHVlRnJvbVJlY2VudExpc3QoKTt9LFxuICAgICAgICAgICAgXCJEb3duXCI6IGZ1bmN0aW9uKGVkaXRvcikgeyBwb3B1cC5nb1RvKFwiZG93blwiKTsgdmFsdWVGcm9tUmVjZW50TGlzdCgpO30sXG4gICAgICAgICAgICBcIkN0cmwtVXB8Q3RybC1Ib21lXCI6IGZ1bmN0aW9uKGVkaXRvcikgeyBwb3B1cC5nb1RvKFwic3RhcnRcIik7IHZhbHVlRnJvbVJlY2VudExpc3QoKTt9LFxuICAgICAgICAgICAgXCJDdHJsLURvd258Q3RybC1FbmRcIjogZnVuY3Rpb24oZWRpdG9yKSB7IHBvcHVwLmdvVG8oXCJlbmRcIik7IHZhbHVlRnJvbVJlY2VudExpc3QoKTt9LFxuICAgICAgICAgICAgXCJUYWJcIjogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgcG9wdXAuZ29UbyhcImRvd25cIik7IHZhbHVlRnJvbVJlY2VudExpc3QoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIlBhZ2VVcFwiOiBmdW5jdGlvbihlZGl0b3IpIHsgcG9wdXAuZ290b1BhZ2VVcCgpOyB2YWx1ZUZyb21SZWNlbnRMaXN0KCk7fSxcbiAgICAgICAgICAgIFwiUGFnZURvd25cIjogZnVuY3Rpb24oZWRpdG9yKSB7IHBvcHVwLmdvdG9QYWdlRG93bigpOyB2YWx1ZUZyb21SZWNlbnRMaXN0KCk7fVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbWRMaW5lLmNvbW1hbmRzLmJpbmRLZXlzKGtleXMpO1xuXG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgICAgb3ZlcmxheS5jbG9zZSgpO1xuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgICBvcGVuUHJvbXB0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBjbWRMaW5lLm9uKFwiaW5wdXRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIG9wdGlvbnMub25JbnB1dCAmJiBvcHRpb25zLm9uSW5wdXQoKTtcbiAgICAgICAgdXBkYXRlQ29tcGxldGlvbnMoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbXBsZXRpb25zKCkge1xuICAgICAgICBpZiAob3B0aW9ucy5nZXRDb21wbGV0aW9ucykge1xuICAgICAgICAgICAgdmFyIHByZWZpeDtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmdldFByZWZpeCkge1xuICAgICAgICAgICAgICAgIHByZWZpeCA9IG9wdGlvbnMuZ2V0UHJlZml4KGNtZExpbmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY29tcGxldGlvbnMgPSBvcHRpb25zLmdldENvbXBsZXRpb25zKGNtZExpbmUpO1xuICAgICAgICAgICAgcG9wdXAuc2V0RGF0YShjb21wbGV0aW9ucywgcHJlZml4KTtcbiAgICAgICAgICAgIHBvcHVwLnJlc2l6ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbHVlRnJvbVJlY2VudExpc3QoKSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gcG9wdXAuZ2V0RGF0YShwb3B1cC5nZXRSb3coKSk7XG4gICAgICAgIGlmIChjdXJyZW50ICYmICFjdXJyZW50W1wiZXJyb3JcIl0pXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudC52YWx1ZSB8fCBjdXJyZW50LmNhcHRpb24gfHwgY3VycmVudDtcbiAgICB9XG5cbiAgICBjbWRMaW5lLnJlc2l6ZSh0cnVlKTtcbiAgICBpZiAocG9wdXApIHtcbiAgICAgICAgcG9wdXAucmVzaXplKHRydWUpO1xuICAgIH1cbiAgICBjbWRMaW5lLmZvY3VzKCk7XG5cbiAgICBvcGVuUHJvbXB0ID0ge1xuICAgICAgICBjbG9zZTogZG9uZSxcbiAgICAgICAgbmFtZTogb3B0aW9ucy5uYW1lLFxuICAgICAgICBlZGl0b3I6IGVkaXRvclxuICAgIH07XG59XG5cbi8qKlxuICogXG4gKiBAcGFyYW0ge0VkaXRvcn0gZWRpdG9yXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdXG4gKi9cbnByb21wdC5nb3RvTGluZSA9IGZ1bmN0aW9uKGVkaXRvciwgY2FsbGJhY2spIHtcbiAgICBmdW5jdGlvbiBzdHJpbmdpZnlTZWxlY3Rpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIGlmICghQXJyYXkuaXNBcnJheShzZWxlY3Rpb24pKVxuICAgICAgICAgICAgc2VsZWN0aW9uID0gW3NlbGVjdGlvbl07XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb24ubWFwKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICAgIHZhciBjdXJzb3IgPSByLmlzQmFja3dhcmRzID8gci5zdGFydDogci5lbmQ7XG4gICAgICAgICAgICB2YXIgYW5jaG9yID0gci5pc0JhY2t3YXJkcyA/IHIuZW5kOiByLnN0YXJ0O1xuICAgICAgICAgICAgdmFyIHJvdyA9IGFuY2hvci5yb3c7XG4gICAgICAgICAgICB2YXIgcyA9IChyb3cgKyAxKSArIFwiOlwiICsgYW5jaG9yLmNvbHVtbjtcblxuICAgICAgICAgICAgaWYgKGFuY2hvci5yb3cgPT0gY3Vyc29yLnJvdykge1xuICAgICAgICAgICAgICAgIGlmIChhbmNob3IuY29sdW1uICE9IGN1cnNvci5jb2x1bW4pXG4gICAgICAgICAgICAgICAgICAgIHMgKz0gXCI+XCIgKyBcIjpcIiArIGN1cnNvci5jb2x1bW47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHMgKz0gXCI+XCIgKyAoY3Vyc29yLnJvdyArIDEpICsgXCI6XCIgKyBjdXJzb3IuY29sdW1uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHM7XG4gICAgICAgIH0pLnJldmVyc2UoKS5qb2luKFwiLCBcIik7XG4gICAgfVxuXG4gICAgcHJvbXB0KGVkaXRvciwgXCI6XCIgKyBzdHJpbmdpZnlTZWxlY3Rpb24oZWRpdG9yLnNlbGVjdGlvbi50b0pTT04oKSksIHtcbiAgICAgICAgbmFtZTogXCJnb3RvTGluZVwiLFxuICAgICAgICBzZWxlY3Rpb246IFsxLCBOdW1iZXIuTUFYX1ZBTFVFXSxcbiAgICAgICAgb25BY2NlcHQ6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGRhdGEudmFsdWU7XG4gICAgICAgICAgICB2YXIgX2hpc3RvcnkgPSBwcm9tcHQuZ290b0xpbmVbXCJfaGlzdG9yeVwiXTtcbiAgICAgICAgICAgIGlmICghX2hpc3RvcnkpXG4gICAgICAgICAgICAgICAgcHJvbXB0LmdvdG9MaW5lW1wiX2hpc3RvcnlcIl0gPSBfaGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgaWYgKF9oaXN0b3J5LmluZGV4T2YodmFsdWUpICE9IC0xKVxuICAgICAgICAgICAgICAgIF9oaXN0b3J5LnNwbGljZShfaGlzdG9yeS5pbmRleE9mKHZhbHVlKSwgMSk7XG4gICAgICAgICAgICBfaGlzdG9yeS51bnNoaWZ0KHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChfaGlzdG9yeS5sZW5ndGggPiAyMCkgX2hpc3RvcnkubGVuZ3RoID0gMjA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHBvcyA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIHJhbmdlcyA9IFtdO1xuICAgICAgICAgICAgdmFsdWUucmVwbGFjZSgvXjovLCBcIlwiKS5zcGxpdCgvLC8pLm1hcChmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoLyhbPD46Ky1dfGM/XFxkKyl8W15jXFxkPD46Ky1dKy8pLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVhZFBvc2l0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IHBhcnRzW2krK107XG4gICAgICAgICAgICAgICAgICAgIGlmICghYykgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY1swXSA9PSBcImNcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoYy5zbGljZSgxKSkgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlZGl0b3Iuc2Vzc2lvbi5kb2MuaW5kZXhUb1Bvc2l0aW9uKGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gcG9zLnJvdztcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbHVtbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmICgvXFxkLy50ZXN0KGMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3cgPSBwYXJzZUludChjKSAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gcGFydHNbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYyA9PSBcIjpcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYyA9IHBhcnRzW2krK107XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoL1xcZC8udGVzdChjKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbiA9IHBhcnNlSW50KGMpIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtyb3c6IHJvdywgY29sdW1uOiBjb2x1bW59O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwb3MgPSByZWFkUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSBSYW5nZS5mcm9tUG9pbnRzKHBvcywgcG9zKTtcbiAgICAgICAgICAgICAgICBpZiAocGFydHNbaV0gPT0gXCI+XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICByYW5nZS5lbmQgPSByZWFkUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocGFydHNbaV0gPT0gXCI8XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICByYW5nZS5zdGFydCA9IHJlYWRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByYW5nZXMudW5zaGlmdChyYW5nZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uZnJvbUpTT04ocmFuZ2VzKTtcbiAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSBlZGl0b3IucmVuZGVyZXIuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgZWRpdG9yLnJlbmRlcmVyLnNjcm9sbFNlbGVjdGlvbkludG9WaWV3KFxuICAgICAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uYW5jaG9yLCBcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLmN1cnNvciwgXG4gICAgICAgICAgICAgICAgMC41XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZWRpdG9yLnJlbmRlcmVyLmFuaW1hdGVTY3JvbGxpbmcoc2Nyb2xsVG9wKTtcbiAgICAgICAgfSxcbiAgICAgICAgaGlzdG9yeTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIXByb21wdC5nb3RvTGluZVtcIl9oaXN0b3J5XCJdKVxuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIHJldHVybiBwcm9tcHQuZ290b0xpbmVbXCJfaGlzdG9yeVwiXTtcblxuICAgICAgICB9LFxuICAgICAgICBnZXRDb21wbGV0aW9uczogZnVuY3Rpb24oY21kTGluZSkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gY21kTGluZS5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgdmFyIG0gPSB2YWx1ZS5yZXBsYWNlKC9eOi8sIFwiXCIpLnNwbGl0KFwiOlwiKTtcbiAgICAgICAgICAgIHZhciByb3cgPSBNYXRoLm1pbihwYXJzZUludChtWzBdKSB8fCAxLCBlZGl0b3Iuc2Vzc2lvbi5nZXRMZW5ndGgoKSkgLSAxO1xuICAgICAgICAgICAgdmFyIGxpbmUgPSBlZGl0b3Iuc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgY3VycmVudCA9IHZhbHVlICsgXCIgIFwiICsgbGluZTtcbiAgICAgICAgICAgIHJldHVybiBbY3VycmVudF0uY29uY2F0KHRoaXMuaGlzdG9yeSgpKTtcbiAgICAgICAgfSxcbiAgICAgICAgJHJ1bGVzOiB7XG4gICAgICAgICAgICBzdGFydDogW3tcbiAgICAgICAgICAgICAgICByZWdleDogL1xcZCsvLFxuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IC9bOiw+PCtcXC1jXS8sXG4gICAgICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIFxuICogQHBhcmFtIHtFZGl0b3J9IGVkaXRvclxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXVxuICovXG5wcm9tcHQuY29tbWFuZHMgPSBmdW5jdGlvbihlZGl0b3IsIGNhbGxiYWNrKSB7XG4gICAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgICAgIHJldHVybiAobmFtZSB8fCBcIlwiKS5yZXBsYWNlKC9eLi8sIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgIHJldHVybiB4LnRvVXBwZXJDYXNlKHgpO1xuICAgICAgICB9KS5yZXBsYWNlKC9bYS16XVtBLVpdL2csIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgIHJldHVybiB4WzBdICsgXCIgXCIgKyB4WzFdLnRvTG93ZXJDYXNlKHgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0RWRpdG9yQ29tbWFuZHNCeU5hbWUoZXhjbHVkZUNvbW1hbmRzKSB7XG4gICAgICAgIHZhciBjb21tYW5kc0J5TmFtZSA9IFtdO1xuICAgICAgICB2YXIgY29tbWFuZE1hcCA9IHt9O1xuICAgICAgICBlZGl0b3Iua2V5QmluZGluZy4kaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICAgICAgICB2YXIgcGxhdGZvcm0gPSBoYW5kbGVyW1wicGxhdGZvcm1cIl07XG4gICAgICAgICAgICB2YXIgY2JuID0gaGFuZGxlcltcImJ5TmFtZVwiXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgaW4gY2JuKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtleSA9IGNibltpXS5iaW5kS2V5O1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Yga2V5ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICAgICAgICAgIGtleSA9IGtleSAmJiBrZXlbcGxhdGZvcm1dIHx8IFwiXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjb21tYW5kcyA9IGNibltpXTtcbiAgICAgICAgICAgICAgICB2YXIgZGVzY3JpcHRpb24gPSBjb21tYW5kcy5kZXNjcmlwdGlvbiB8fCBub3JtYWxpemVOYW1lKGNvbW1hbmRzLm5hbWUpO1xuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjb21tYW5kcykpXG4gICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzID0gW2NvbW1hbmRzXTtcbiAgICAgICAgICAgICAgICBjb21tYW5kcy5mb3JFYWNoKGZ1bmN0aW9uKGNvbW1hbmQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjb21tYW5kICE9IFwic3RyaW5nXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kID0gY29tbWFuZC5uYW1lO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmVlZGxlID0gZXhjbHVkZUNvbW1hbmRzLmZpbmQoZnVuY3Rpb24oZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlbCA9PT0gY29tbWFuZDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICghbmVlZGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29tbWFuZE1hcFtjb21tYW5kXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmRNYXBbY29tbWFuZF0ua2V5ICs9IFwifFwiICsga2V5O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kTWFwW2NvbW1hbmRdID0ge2tleToga2V5LCBjb21tYW5kOiBjb21tYW5kLCBkZXNjcmlwdGlvbjogZGVzY3JpcHRpb259O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmRzQnlOYW1lLnB1c2goY29tbWFuZE1hcFtjb21tYW5kXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjb21tYW5kc0J5TmFtZTtcbiAgICB9XG4gICAgLy8gZXhjbHVkZSBjb21tYW5kcyB0aGF0IGNhbiBub3QgYmUgZXhlY3V0ZWQgd2l0aG91dCBhcmdzXG4gICAgdmFyIGV4Y2x1ZGVDb21tYW5kc0xpc3QgPSBbXCJpbnNlcnRzdHJpbmdcIiwgXCJpbnNlcnR0ZXh0XCIsIFwic2V0SW5kZW50YXRpb25cIiwgXCJwYXN0ZVwiXTtcbiAgICB2YXIgc2hvcnRjdXRzQXJyYXkgPSBnZXRFZGl0b3JDb21tYW5kc0J5TmFtZShleGNsdWRlQ29tbWFuZHNMaXN0KTtcbiAgICBzaG9ydGN1dHNBcnJheSA9IHNob3J0Y3V0c0FycmF5Lm1hcChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHJldHVybiB7dmFsdWU6IGl0ZW0uZGVzY3JpcHRpb24sIG1ldGE6IGl0ZW0ua2V5LCBjb21tYW5kOiBpdGVtLmNvbW1hbmR9O1xuICAgIH0pO1xuICAgIHByb21wdChlZGl0b3IsIFwiXCIsICB7XG4gICAgICAgIG5hbWU6IFwiY29tbWFuZHNcIixcbiAgICAgICAgc2VsZWN0aW9uOiBbMCwgTnVtYmVyLk1BWF9WQUxVRV0sXG4gICAgICAgIG1heEhpc3RvcnlDb3VudDogNSxcbiAgICAgICAgb25BY2NlcHQ6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLml0ZW0pIHtcbiAgICAgICAgICAgICAgICB2YXIgY29tbWFuZE5hbWUgPSBkYXRhLml0ZW0uY29tbWFuZDtcbiAgICAgICAgICAgICAgICB0aGlzLmFkZFRvSGlzdG9yeShkYXRhLml0ZW0pO1xuXG4gICAgICAgICAgICAgICAgZWRpdG9yLmV4ZWNDb21tYW5kKGNvbW1hbmROYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgYWRkVG9IaXN0b3J5OiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICB2YXIgaGlzdG9yeSA9IHRoaXMuaGlzdG9yeSgpO1xuICAgICAgICAgICAgaGlzdG9yeS51bnNoaWZ0KGl0ZW0pO1xuICAgICAgICAgICAgZGVsZXRlIGl0ZW0ubWVzc2FnZTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgaGlzdG9yeS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChoaXN0b3J5W2ldW1wiY29tbWFuZFwiXSA9PSBpdGVtLmNvbW1hbmQgKSB7XG4gICAgICAgICAgICAgICAgICAgIGhpc3Rvcnkuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5tYXhIaXN0b3J5Q291bnQgPiAwICYmIGhpc3RvcnkubGVuZ3RoID4gdGhpcy5tYXhIaXN0b3J5Q291bnQpIHtcbiAgICAgICAgICAgICAgICBoaXN0b3J5LnNwbGljZShoaXN0b3J5Lmxlbmd0aCAtIDEsIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvbXB0LmNvbW1hbmRzW1wiaGlzdG9yeVwiXSA9IGhpc3Rvcnk7XG4gICAgICAgIH0sXG4gICAgICAgIGhpc3Rvcnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21wdC5jb21tYW5kc1tcImhpc3RvcnlcIl0gfHwgW107XG4gICAgICAgIH0sXG4gICAgICAgIGdldFByZWZpeDogZnVuY3Rpb24oY21kTGluZSkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRQb3MgPSBjbWRMaW5lLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgICAgICB2YXIgZmlsdGVyVmFsdWUgPSBjbWRMaW5lLmdldFZhbHVlKCk7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyVmFsdWUuc3Vic3RyaW5nKDAsIGN1cnJlbnRQb3MuY29sdW1uKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Q29tcGxldGlvbnM6IGZ1bmN0aW9uKGNtZExpbmUpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEZpbHRlcmVkQ29tcGxldGlvbnMoY29tbWFuZHMsIHByZWZpeCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHRDb21tYW5kcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29tbWFuZHMpKTtcblxuICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJlZCA9IG5ldyBGaWx0ZXJlZExpc3QocmVzdWx0Q29tbWFuZHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZC5maWx0ZXJDb21wbGV0aW9ucyhyZXN1bHRDb21tYW5kcywgcHJlZml4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0VW5pcXVlQ29tbWFuZExpc3QoY29tbWFuZHMsIHVzZWRDb21tYW5kcykge1xuICAgICAgICAgICAgICAgIGlmICghdXNlZENvbW1hbmRzIHx8ICF1c2VkQ29tbWFuZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGV4Y2x1ZGVDb21tYW5kcyA9IFtdO1xuICAgICAgICAgICAgICAgIHVzZWRDb21tYW5kcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgZXhjbHVkZUNvbW1hbmRzLnB1c2goaXRlbS5jb21tYW5kKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciByZXN1bHRDb21tYW5kcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgY29tbWFuZHMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChleGNsdWRlQ29tbWFuZHMuaW5kZXhPZihpdGVtLmNvbW1hbmQpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Q29tbWFuZHMucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdENvbW1hbmRzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcHJlZml4ID0gdGhpcy5nZXRQcmVmaXgoY21kTGluZSk7XG4gICAgICAgICAgICB2YXIgcmVjZW50bHlVc2VkQ29tbWFuZHMgPSBnZXRGaWx0ZXJlZENvbXBsZXRpb25zKHRoaXMuaGlzdG9yeSgpLCBwcmVmaXgpO1xuICAgICAgICAgICAgdmFyIG90aGVyQ29tbWFuZHMgPSBnZXRVbmlxdWVDb21tYW5kTGlzdChzaG9ydGN1dHNBcnJheSwgcmVjZW50bHlVc2VkQ29tbWFuZHMpO1xuICAgICAgICAgICAgb3RoZXJDb21tYW5kcyA9IGdldEZpbHRlcmVkQ29tcGxldGlvbnMob3RoZXJDb21tYW5kcywgcHJlZml4KTtcblxuICAgICAgICAgICAgaWYgKHJlY2VudGx5VXNlZENvbW1hbmRzLmxlbmd0aCAmJiBvdGhlckNvbW1hbmRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJlY2VudGx5VXNlZENvbW1hbmRzWzBdLm1lc3NhZ2UgPSBubHMoXCJwcm9tcHQucmVjZW50bHktdXNlZFwiLCBcIlJlY2VudGx5IHVzZWRcIik7XG4gICAgICAgICAgICAgICAgb3RoZXJDb21tYW5kc1swXS5tZXNzYWdlID0gbmxzKFwicHJvbXB0Lm90aGVyLWNvbW1hbmRzXCIsIFwiT3RoZXIgY29tbWFuZHNcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBjb21wbGV0aW9ucyA9IHJlY2VudGx5VXNlZENvbW1hbmRzLmNvbmNhdChvdGhlckNvbW1hbmRzKTtcbiAgICAgICAgICAgIHJldHVybiBjb21wbGV0aW9ucy5sZW5ndGggPiAwID8gY29tcGxldGlvbnMgOiBbe1xuICAgICAgICAgICAgICAgIHZhbHVlOiBubHMoXCJwcm9tcHQubm8tbWF0Y2hpbmctY29tbWFuZHNcIiwgXCJObyBtYXRjaGluZyBjb21tYW5kc1wiKSxcbiAgICAgICAgICAgICAgICBlcnJvcjogMVxuICAgICAgICAgICAgfV07XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7RWRpdG9yfSBlZGl0b3JcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja11cbiAqL1xucHJvbXB0Lm1vZGVzID0gZnVuY3Rpb24oZWRpdG9yLCBjYWxsYmFjaykge1xuICAgIC8qKkB0eXBlIHthbnlbXX0qL1xuICAgIHZhciBtb2Rlc0FycmF5ID0gbW9kZWxpc3QubW9kZXM7XG4gICAgbW9kZXNBcnJheSA9IG1vZGVzQXJyYXkubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHt2YWx1ZTogaXRlbS5jYXB0aW9uLCBtb2RlOiBpdGVtLm5hbWV9O1xuICAgIH0pO1xuICAgIHByb21wdChlZGl0b3IsIFwiXCIsICB7XG4gICAgICAgIG5hbWU6IFwibW9kZXNcIixcbiAgICAgICAgc2VsZWN0aW9uOiBbMCwgTnVtYmVyLk1BWF9WQUxVRV0sXG4gICAgICAgIG9uQWNjZXB0OiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5pdGVtKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1vZGVOYW1lID0gXCJhY2UvbW9kZS9cIiArIGRhdGEuaXRlbS5tb2RlO1xuICAgICAgICAgICAgICAgIGVkaXRvci5zZXNzaW9uLnNldE1vZGUobW9kZU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXRQcmVmaXg6IGZ1bmN0aW9uKGNtZExpbmUpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50UG9zID0gY21kTGluZS5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGZpbHRlclZhbHVlID0gY21kTGluZS5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlclZhbHVlLnN1YnN0cmluZygwLCBjdXJyZW50UG9zLmNvbHVtbik7XG4gICAgICAgIH0sXG4gICAgICAgIGdldENvbXBsZXRpb25zOiBmdW5jdGlvbihjbWRMaW5lKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRGaWx0ZXJlZENvbXBsZXRpb25zKG1vZGVzLCBwcmVmaXgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0Q29tbWFuZHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1vZGVzKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZmlsdGVyZWQgPSBuZXcgRmlsdGVyZWRMaXN0KHJlc3VsdENvbW1hbmRzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyZWQuZmlsdGVyQ29tcGxldGlvbnMocmVzdWx0Q29tbWFuZHMsIHByZWZpeCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwcmVmaXggPSB0aGlzLmdldFByZWZpeChjbWRMaW5lKTtcbiAgICAgICAgICAgIHZhciBjb21wbGV0aW9ucyA9IGdldEZpbHRlcmVkQ29tcGxldGlvbnMobW9kZXNBcnJheSwgcHJlZml4KTtcbiAgICAgICAgICAgIHJldHVybiBjb21wbGV0aW9ucy5sZW5ndGggPiAwID8gY29tcGxldGlvbnMgOiBbe1xuICAgICAgICAgICAgICAgIFwiY2FwdGlvblwiOiBcIk5vIG1vZGUgbWF0Y2hpbmdcIixcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiTm8gbW9kZSBtYXRjaGluZ1wiLFxuICAgICAgICAgICAgICAgIFwiZXJyb3JcIjogMVxuICAgICAgICAgICAgfV07XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbmRvbS5pbXBvcnRDc3NTdHJpbmcoYC5hY2VfcHJvbXB0X2NvbnRhaW5lciB7XG4gICAgbWF4LXdpZHRoOiA2MDNweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDIwcHggYXV0bztcbiAgICBwYWRkaW5nOiAzcHg7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIGJveC1zaGFkb3c6IDBweCAycHggM3B4IDBweCAjNTU1O1xufWAsIFwicHJvbXRwLmNzc1wiLCBmYWxzZSk7XG5cblxuZXhwb3J0cy5wcm9tcHQgPSBwcm9tcHQ7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=