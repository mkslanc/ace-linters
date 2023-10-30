(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1531,352],{

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

/***/ 81531:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * Prompt plugin is used for getting input from user.
 *
 * @param {Object} editor                   Ouside editor related to this prompt. Will be blurred when prompt is open. 
 * @param {String} message                  Predefined value of prompt input box.
 * @param {Object} options                  Cusomizable options for this prompt. 
 * @param {String} options.name             Prompt name.
 * @param {String} options.$type            Use prompt of specific type (gotoLine|commands|modes or default if empty).
 * @param {[start, end]} options.selection  Defines which part of the predefined value should be highlited.
 * @param {Boolean} options.hasDescription  Set to true if prompt has description below input box.
 * @param {String} options.prompt           Description below input box.
 * @param {String} options.placeholder      Placeholder for value.
 * @param {Object} options.$rules           Specific rules for input like password or regexp.
 * @param {Boolean} options.ignoreFocusOut  Set to true to keep the prompt open when focus moves to another part of the editor.
 * @param {Function} options.getCompletions Function for defining list of options for value.
 * @param {Function} options.getPrefix      Function for defining current value prefix.
 * @param {Function} options.onAccept       Function called when Enter is pressed.
 * @param {Function} options.onInput        Function called when input is added to prompt input box.
 * @param {Function} options.onCancel       Function called when Esc|Shift-Esc is pressed.
 * @param {Function} callback               Function called after done.
 * */



var nls = (__webpack_require__(13188).nls);
var Range = (__webpack_require__(59082)/* .Range */ .e);
var dom = __webpack_require__(6359);
var FilteredList= (__webpack_require__(39528)/* .FilteredList */ .Xy);
var AcePopup = (__webpack_require__(42985)/* .AcePopup */ .uE);
var $singleLineEditor = (__webpack_require__(42985)/* .$singleLineEditor */ .LT);
var UndoManager = (__webpack_require__(40718)/* .UndoManager */ .H);
var Tokenizer = (__webpack_require__(60760).Tokenizer);
var overlayPage = (__webpack_require__(9613).overlayPage);
var modelist = __webpack_require__(90352);
var openPrompt;

function prompt(editor, message, options, callback) {
    if (typeof message == "object") {
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
            if (!data.error) {
                cmdLine.setValue(data.value || data.name || data);
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
        if (curData && !curData.error) {
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
        if (current && !current.error)
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
            var _history = prompt.gotoLine._history;
            if (!_history)
                prompt.gotoLine._history = _history = [];
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
            if (!prompt.gotoLine._history)
                return [];
            return prompt.gotoLine._history;

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
            var platform = handler.platform;
            var cbn = handler.byName;
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
            prompt.commands.history = history;
        },
        history: function() {
            return prompt.commands.history || [];
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
                recentlyUsedCommands[0].message = nls("Recently used");
                otherCommands[0].message = nls("Other commands");
            }

            var completions = recentlyUsedCommands.concat(otherCommands);
            return completions.length > 0 ? completions : [{
                value: nls("No matching commands"),
                error: 1
            }];
        }
    });
};

prompt.modes = function(editor, callback) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjE1MzEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7QUFDYixVQUFVLG1CQUFPLENBQUMsSUFBZTtBQUNqQyxjQUFjLG1CQUFPLENBQUMsS0FBcUI7QUFDM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7O0FBRUEsMEJBQTBCO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsWUFBWTtBQUNuRCwwQkFBMEIsT0FBTyxVQUFVLFFBQVEsUUFBUTtBQUMzRCx3QkFBd0I7QUFDeEIsd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7O0FDL0RZOztBQUViO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN6UUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLGNBQWM7QUFDekIsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsU0FBUztBQUNwQixXQUFXLFVBQVU7QUFDckIsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsVUFBVTtBQUNyQixXQUFXLFVBQVU7QUFDckIsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsVUFBVTtBQUNyQjs7QUFFYTs7QUFFYixVQUFVLGdDQUF3QjtBQUNsQyxZQUFZLDJDQUF5QjtBQUNyQyxVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5QixrQkFBa0IsbURBQXVDO0FBQ3pELGVBQWUsK0NBQXlDO0FBQ3hELHdCQUF3Qix3REFBa0Q7QUFDMUUsa0JBQWtCLGlEQUFxQztBQUN2RCxnQkFBZ0Isc0NBQWlDO0FBQ2pELGtCQUFrQix1Q0FBZ0Q7QUFDbEUsZUFBZSxtQkFBTyxDQUFDLEtBQVk7QUFDbkM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxtQ0FBbUMsOEZBQThGO0FBQ2pJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHdEQUF3RCxtQ0FBbUM7QUFDM0Y7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUNBQXFDLGtCQUFrQix1QkFBdUI7QUFDOUUsdUNBQXVDLG9CQUFvQix1QkFBdUI7QUFDbEYsb0RBQW9ELHFCQUFxQix1QkFBdUI7QUFDaEcscURBQXFELG1CQUFtQix1QkFBdUI7QUFDL0Y7QUFDQSxvQ0FBb0M7QUFDcEMsYUFBYTtBQUNiLHlDQUF5QyxvQkFBb0IsdUJBQXVCO0FBQ3BGLDJDQUEyQyxzQkFBc0I7QUFDakUsU0FBUztBQUNUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQixtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLG9CQUFvQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7OztBQUdELGNBQWMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvbWVudV90b29scy9vdmVybGF5X3BhZ2UuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L21lbnVfdG9vbHMvc2V0dGluZ3NfbWVudS5jc3MuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L21vZGVsaXN0LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9wcm9tcHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypqc2xpbnQgaW5kZW50OiA0LCBtYXhlcnI6IDUwLCB3aGl0ZTogdHJ1ZSwgYnJvd3NlcjogdHJ1ZSwgdmFyczogdHJ1ZSovXG4vKmdsb2JhbCBkZWZpbmUsIHJlcXVpcmUgKi9cblxuLyoqXG4gKiBPdmVybGF5IFBhZ2VcbiAqIEBmaWxlT3ZlcnZpZXcgT3ZlcmxheSBQYWdlIDxiciAvPlxuICogR2VuZXJhdGVzIGFuIG92ZXJsYXkgZm9yIGRpc3BsYXlpbmcgbWVudXMuIFRoZSBvdmVybGF5IGlzIGFuIGFic29sdXRlbHlcbiAqICBwb3NpdGlvbmVkIGRpdi5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi8uLi9saWIvZG9tXCIpO1xudmFyIGNzc1RleHQgPSByZXF1aXJlKFwiLi9zZXR0aW5nc19tZW51LmNzc1wiKTtcbmRvbS5pbXBvcnRDc3NTdHJpbmcoY3NzVGV4dCwgXCJzZXR0aW5nc19tZW51LmNzc1wiLCBmYWxzZSk7XG5cbi8qKlxuICogR2VuZXJhdGVzIGFuIG92ZXJsYXkgZm9yIGRpc3BsYXlpbmcgbWVudXMuIFRoZSBvdmVybGF5IGlzIGFuIGFic29sdXRlbHlcbiAqICBwb3NpdGlvbmVkIGRpdi5cbiAqIEBhdXRob3IgPGEgaHJlZj1cIm1haWx0bzptYXR0aGV3a2FzdG9yQGdtYWlsLmNvbVwiPlxuICogIE1hdHRoZXcgQ2hyaXN0b3BoZXIgS2FzdG9yLUluYXJlIElJSSA8L2E+PGJyIC8+XG4gKiAg4pitIEhpYWwgQXRyb3BhISEg4pitXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRlbnRFbGVtZW50IEFueSBlbGVtZW50IHdoaWNoIG1heSBiZSBwcmVzZW50ZWQgaW5zaWRlXG4gKiAgYSBkaXYuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMub3ZlcmxheVBhZ2UgPSBmdW5jdGlvbiBvdmVybGF5UGFnZShlZGl0b3IsIGNvbnRlbnRFbGVtZW50LCBjYWxsYmFjaykge1xuICAgIHZhciBjbG9zZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB2YXIgaWdub3JlRm9jdXNPdXQgPSBmYWxzZTtcblxuICAgIGZ1bmN0aW9uIGRvY3VtZW50RXNjTGlzdGVuZXIoZSkge1xuICAgICAgICBpZiAoZS5rZXlDb2RlID09PSAyNykge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlKCkge1xuICAgICAgICBpZiAoIWNsb3NlcikgcmV0dXJuO1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZG9jdW1lbnRFc2NMaXN0ZW5lcik7XG4gICAgICAgIGNsb3Nlci5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNsb3Nlcik7XG4gICAgICAgIGlmIChlZGl0b3IpIHtcbiAgICAgICAgICAgIGVkaXRvci5mb2N1cygpO1xuICAgICAgICB9XG4gICAgICAgIGNsb3NlciA9IG51bGw7XG4gICAgICAgIGNhbGxiYWNrICYmIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgIC8qKlxuICAgICAqIERlZmluZXMgd2hldGhlciBvdmVybGF5IGlzIGNsb3NlZCB3aGVuIHVzZXIgY2xpY2tzIG91dHNpZGUgb2YgaXQuXG4gICAgICogXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBpZ25vcmUgICAgICBJZiBzZXQgdG8gdHJ1ZSBvdmVybGF5IHN0YXlzIG9wZW4gd2hlbiBmb2N1cyBtb3ZlcyB0byBhbm90aGVyIHBhcnQgb2YgdGhlIGVkaXRvci5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBzZXRJZ25vcmVGb2N1c091dChpZ25vcmUpIHtcbiAgICAgICAgaWdub3JlRm9jdXNPdXQgPSBpZ25vcmU7XG4gICAgICAgIGlmIChpZ25vcmUpIHtcbiAgICAgICAgICAgIGNsb3Nlci5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XG4gICAgICAgICAgICBjb250ZW50RWxlbWVudC5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbG9zZXIuc3R5bGUuY3NzVGV4dCA9ICdtYXJnaW46IDA7IHBhZGRpbmc6IDA7ICcgK1xuICAgICAgICAncG9zaXRpb246IGZpeGVkOyB0b3A6MDsgYm90dG9tOjA7IGxlZnQ6MDsgcmlnaHQ6MDsnICtcbiAgICAgICAgJ3otaW5kZXg6IDk5OTA7ICcgK1xuICAgICAgICAoZWRpdG9yID8gJ2JhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC4zKTsnIDogJycpO1xuICAgIGNsb3Nlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKCFpZ25vcmVGb2N1c091dCkge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGNsaWNrIGNsb3NlciBpZiBlc2Mga2V5IGlzIHByZXNzZWRcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZG9jdW1lbnRFc2NMaXN0ZW5lcik7XG5cbiAgICBjb250ZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICBjbG9zZXIuYXBwZW5kQ2hpbGQoY29udGVudEVsZW1lbnQpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2xvc2VyKTtcbiAgICBpZiAoZWRpdG9yKSB7XG4gICAgICAgIGVkaXRvci5ibHVyKCk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGNsb3NlOiBjbG9zZSxcbiAgICAgICAgc2V0SWdub3JlRm9jdXNPdXQ6IHNldElnbm9yZUZvY3VzT3V0XG4gICAgfTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IGAjYWNlX3NldHRpbmdzbWVudSwgI2tic2hvcnRjdXRtZW51IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjRjdGN0Y3O1xuICAgIGNvbG9yOiBibGFjaztcbiAgICBib3gtc2hhZG93OiAtNXB4IDRweCA1cHggcmdiYSgxMjYsIDEyNiwgMTI2LCAwLjU1KTtcbiAgICBwYWRkaW5nOiAxZW0gMC41ZW0gMmVtIDFlbTtcbiAgICBvdmVyZmxvdzogYXV0bztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbWFyZ2luOiAwO1xuICAgIGJvdHRvbTogMDtcbiAgICByaWdodDogMDtcbiAgICB0b3A6IDA7XG4gICAgei1pbmRleDogOTk5MTtcbiAgICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbi5hY2VfZGFyayAjYWNlX3NldHRpbmdzbWVudSwgLmFjZV9kYXJrICNrYnNob3J0Y3V0bWVudSB7XG4gICAgYm94LXNoYWRvdzogLTIwcHggMTBweCAyNXB4IHJnYmEoMTI2LCAxMjYsIDEyNiwgMC4yNSk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjYpO1xuICAgIGNvbG9yOiBibGFjaztcbn1cblxuLmFjZV9vcHRpb25zTWVudUVudHJ5OmhvdmVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDEwMCwgMTAwLCAxMDAsIDAuMSk7XG4gICAgdHJhbnNpdGlvbjogYWxsIDAuM3Ncbn1cblxuLmFjZV9jbG9zZUJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNDUsIDE0NiwgMTQ2LCAwLjUpO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNGNDhBOEE7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIHBhZGRpbmc6IDdweDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcmlnaHQ6IC04cHg7XG4gICAgdG9wOiAtOHB4O1xuICAgIHotaW5kZXg6IDEwMDAwMDtcbn1cbi5hY2VfY2xvc2VCdXR0b257XG4gICAgYmFja2dyb3VuZDogcmdiYSgyNDUsIDE0NiwgMTQ2LCAwLjkpO1xufVxuLmFjZV9vcHRpb25zTWVudUtleSB7XG4gICAgY29sb3I6IGRhcmtzbGF0ZWJsdWU7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG4uYWNlX29wdGlvbnNNZW51Q29tbWFuZCB7XG4gICAgY29sb3I6IGRhcmtjeWFuO1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG4uYWNlX29wdGlvbnNNZW51RW50cnkgaW5wdXQsIC5hY2Vfb3B0aW9uc01lbnVFbnRyeSBidXR0b24ge1xuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG59XG5cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeSBidXR0b25bYWNlX3NlbGVjdGVkX2J1dHRvbj10cnVlXSB7XG4gICAgYmFja2dyb3VuZDogI2U3ZTdlNztcbiAgICBib3gtc2hhZG93OiAxcHggMHB4IDJweCAwcHggI2FkYWRhZCBpbnNldDtcbiAgICBib3JkZXItY29sb3I6ICNhZGFkYWQ7XG59XG4uYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uIHtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCBsaWdodGdyYXk7XG4gICAgbWFyZ2luOiAwcHg7XG59XG4uYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uOmhvdmVye1xuICAgIGJhY2tncm91bmQ6ICNmMGYwZjA7XG59YDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbW9kZXMgPSBbXTtcbi8qKlxuICogU3VnZ2VzdHMgYSBtb2RlIGJhc2VkIG9uIHRoZSBmaWxlIGV4dGVuc2lvbiBwcmVzZW50IGluIHRoZSBnaXZlbiBwYXRoXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCB0byB0aGUgZmlsZVxuICogQHJldHVybnMge29iamVjdH0gUmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGVcbiAqICBzdWdnZXN0ZWQgbW9kZS5cbiAqL1xuZnVuY3Rpb24gZ2V0TW9kZUZvclBhdGgocGF0aCkge1xuICAgIHZhciBtb2RlID0gbW9kZXNCeU5hbWUudGV4dDtcbiAgICB2YXIgZmlsZU5hbWUgPSBwYXRoLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChtb2Rlc1tpXS5zdXBwb3J0c0ZpbGUoZmlsZU5hbWUpKSB7XG4gICAgICAgICAgICBtb2RlID0gbW9kZXNbaV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbW9kZTtcbn1cblxuY2xhc3MgTW9kZSB7XG4gICAgY29uc3RydWN0b3IobmFtZSwgY2FwdGlvbiwgZXh0ZW5zaW9ucykge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNhcHRpb24gPSBjYXB0aW9uO1xuICAgICAgICB0aGlzLm1vZGUgPSBcImFjZS9tb2RlL1wiICsgbmFtZTtcbiAgICAgICAgdGhpcy5leHRlbnNpb25zID0gZXh0ZW5zaW9ucztcbiAgICAgICAgdmFyIHJlO1xuICAgICAgICBpZiAoL1xcXi8udGVzdChleHRlbnNpb25zKSkge1xuICAgICAgICAgICAgcmUgPSBleHRlbnNpb25zLnJlcGxhY2UoL1xcfChcXF4pPy9nLCBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIiR8XCIgKyAoYiA/IFwiXlwiIDogXCJeLipcXFxcLlwiKTtcbiAgICAgICAgICAgIH0pICsgXCIkXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZSA9IFwiXi4qXFxcXC4oXCIgKyBleHRlbnNpb25zICsgXCIpJFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5leHRSZSA9IG5ldyBSZWdFeHAocmUsIFwiZ2lcIik7XG4gICAgfVxuXG4gICAgc3VwcG9ydHNGaWxlKGZpbGVuYW1lKSB7XG4gICAgICAgIHJldHVybiBmaWxlbmFtZS5tYXRjaCh0aGlzLmV4dFJlKTtcbiAgICB9XG59XG5cbi8vIHRvZG8gZmlyc3RsaW5lbWF0Y2hcbnZhciBzdXBwb3J0ZWRNb2RlcyA9IHtcbiAgICBBQkFQOiAgICAgICAgW1wiYWJhcFwiXSxcbiAgICBBQkM6ICAgICAgICAgW1wiYWJjXCJdLFxuICAgIEFjdGlvblNjcmlwdDpbXCJhc1wiXSxcbiAgICBBREE6ICAgICAgICAgW1wiYWRhfGFkYlwiXSxcbiAgICBBbGRhOiAgICAgICAgW1wiYWxkYVwiXSxcbiAgICBBcGFjaGVfQ29uZjogW1wiXmh0YWNjZXNzfF5odGdyb3Vwc3xeaHRwYXNzd2R8XmNvbmZ8aHRhY2Nlc3N8aHRncm91cHN8aHRwYXNzd2RcIl0sXG4gICAgQXBleDogICAgICAgIFtcImFwZXh8Y2xzfHRyaWdnZXJ8dGdyXCJdLFxuICAgIEFRTDogICAgICAgICBbXCJhcWxcIl0sXG4gICAgQXNjaWlEb2M6ICAgIFtcImFzY2lpZG9jfGFkb2NcIl0sXG4gICAgQVNMOiAgICAgICAgIFtcImRzbHxhc2x8YXNsLmpzb25cIl0sXG4gICAgQXNzZW1ibHlfeDg2OltcImFzbXxhXCJdLFxuICAgIEFzdHJvOiAgICAgICBbXCJhc3Ryb1wiXSxcbiAgICBBdXRvSG90S2V5OiAgW1wiYWhrXCJdLFxuICAgIEJhdGNoRmlsZTogICBbXCJiYXR8Y21kXCJdLFxuICAgIEJpYlRlWDogICAgICBbXCJiaWJcIl0sXG4gICAgQ19DcHA6ICAgICAgIFtcImNwcHxjfGNjfGN4eHxofGhofGhwcHxpbm9cIl0sXG4gICAgQzlTZWFyY2g6ICAgIFtcImM5c2VhcmNoX3Jlc3VsdHNcIl0sXG4gICAgQ2lycnU6ICAgICAgIFtcImNpcnJ1fGNyXCJdLFxuICAgIENsb2p1cmU6ICAgICBbXCJjbGp8Y2xqc1wiXSxcbiAgICBDb2JvbDogICAgICAgW1wiQ0JMfENPQlwiXSxcbiAgICBjb2ZmZWU6ICAgICAgW1wiY29mZmVlfGNmfGNzb258XkNha2VmaWxlXCJdLFxuICAgIENvbGRGdXNpb246ICBbXCJjZm18Y2ZjXCJdLFxuICAgIENyeXN0YWw6ICAgICBbXCJjclwiXSxcbiAgICBDU2hhcnA6ICAgICAgW1wiY3NcIl0sXG4gICAgQ3NvdW5kX0RvY3VtZW50OiBbXCJjc2RcIl0sXG4gICAgQ3NvdW5kX09yY2hlc3RyYTogW1wib3JjXCJdLFxuICAgIENzb3VuZF9TY29yZTogW1wic2NvXCJdLFxuICAgIENTUzogICAgICAgICBbXCJjc3NcIl0sXG4gICAgQ3VybHk6ICAgICAgIFtcImN1cmx5XCJdLFxuICAgIEN1dHRsZWZpc2g6ICBbXCJjb25mXCJdLFxuICAgIEQ6ICAgICAgICAgICBbXCJkfGRpXCJdLFxuICAgIERhcnQ6ICAgICAgICBbXCJkYXJ0XCJdLFxuICAgIERpZmY6ICAgICAgICBbXCJkaWZmfHBhdGNoXCJdLFxuICAgIERqYW5nbzogICAgICBbXCJkanR8aHRtbC5kanR8ZGouaHRtbHxkamh0bWxcIl0sXG4gICAgRG9ja2VyZmlsZTogIFtcIl5Eb2NrZXJmaWxlXCJdLFxuICAgIERvdDogICAgICAgICBbXCJkb3RcIl0sXG4gICAgRHJvb2xzOiAgICAgIFtcImRybFwiXSxcbiAgICBFZGlmYWN0OiAgICAgW1wiZWRpXCJdLFxuICAgIEVpZmZlbDogICAgICBbXCJlfGdlXCJdLFxuICAgIEVKUzogICAgICAgICBbXCJlanNcIl0sXG4gICAgRWxpeGlyOiAgICAgIFtcImV4fGV4c1wiXSxcbiAgICBFbG06ICAgICAgICAgW1wiZWxtXCJdLFxuICAgIEVybGFuZzogICAgICBbXCJlcmx8aHJsXCJdLFxuICAgIEZsaXg6ICAgICAgICBbXCJmbGl4XCJdLFxuICAgIEZvcnRoOiAgICAgICBbXCJmcnR8ZnN8bGRyfGZ0aHw0dGhcIl0sXG4gICAgRm9ydHJhbjogICAgIFtcImZ8ZjkwXCJdLFxuICAgIEZTaGFycDogICAgICBbXCJmc2l8ZnN8bWx8bWxpfGZzeHxmc3NjcmlwdFwiXSxcbiAgICBGU0w6ICAgICAgICAgW1wiZnNsXCJdLFxuICAgIEZUTDogICAgICAgICBbXCJmdGxcIl0sXG4gICAgR2NvZGU6ICAgICAgIFtcImdjb2RlXCJdLFxuICAgIEdoZXJraW46ICAgICBbXCJmZWF0dXJlXCJdLFxuICAgIEdpdGlnbm9yZTogICBbXCJeLmdpdGlnbm9yZVwiXSxcbiAgICBHbHNsOiAgICAgICAgW1wiZ2xzbHxmcmFnfHZlcnRcIl0sXG4gICAgR29ic3RvbmVzOiAgIFtcImdic1wiXSxcbiAgICBnb2xhbmc6ICAgICAgW1wiZ29cIl0sXG4gICAgR3JhcGhRTFNjaGVtYTogW1wiZ3FsXCJdLFxuICAgIEdyb292eTogICAgICBbXCJncm9vdnlcIl0sXG4gICAgSEFNTDogICAgICAgIFtcImhhbWxcIl0sXG4gICAgSGFuZGxlYmFyczogIFtcImhic3xoYW5kbGViYXJzfHRwbHxtdXN0YWNoZVwiXSxcbiAgICBIYXNrZWxsOiAgICAgW1wiaHNcIl0sXG4gICAgSGFza2VsbF9DYWJhbDogW1wiY2FiYWxcIl0sXG4gICAgaGFYZTogICAgICAgIFtcImh4XCJdLFxuICAgIEhqc29uOiAgICAgICBbXCJoanNvblwiXSxcbiAgICBIVE1MOiAgICAgICAgW1wiaHRtbHxodG18eGh0bWx8dnVlfHdlfHdweVwiXSxcbiAgICBIVE1MX0VsaXhpcjogW1wiZWV4fGh0bWwuZWV4XCJdLFxuICAgIEhUTUxfUnVieTogICBbXCJlcmJ8cmh0bWx8aHRtbC5lcmJcIl0sXG4gICAgSU5JOiAgICAgICAgIFtcImluaXxjb25mfGNmZ3xwcmVmc1wiXSxcbiAgICBJbzogICAgICAgICAgW1wiaW9cIl0sXG4gICAgSW9uOiAgICAgICAgIFtcImlvblwiXSxcbiAgICBKYWNrOiAgICAgICAgW1wiamFja1wiXSxcbiAgICBKYWRlOiAgICAgICAgW1wiamFkZXxwdWdcIl0sXG4gICAgSmF2YTogICAgICAgIFtcImphdmFcIl0sXG4gICAgSmF2YVNjcmlwdDogIFtcImpzfGpzbXxqc3h8Y2pzfG1qc1wiXSxcbiAgICBKRVhMOiAgICAgICAgW1wiamV4bFwiXSxcbiAgICBKU09OOiAgICAgICAgW1wianNvblwiXSxcbiAgICBKU09ONTogICAgICAgW1wianNvbjVcIl0sXG4gICAgSlNPTmlxOiAgICAgIFtcImpxXCJdLFxuICAgIEpTUDogICAgICAgICBbXCJqc3BcIl0sXG4gICAgSlNTTTogICAgICAgIFtcImpzc218anNzbV9zdGF0ZVwiXSxcbiAgICBKU1g6ICAgICAgICAgW1wianN4XCJdLFxuICAgIEp1bGlhOiAgICAgICBbXCJqbFwiXSxcbiAgICBLb3RsaW46ICAgICAgW1wia3R8a3RzXCJdLFxuICAgIExhVGVYOiAgICAgICBbXCJ0ZXh8bGF0ZXh8bHR4fGJpYlwiXSxcbiAgICBMYXR0ZTogICAgICAgW1wibGF0dGVcIl0sXG4gICAgTEVTUzogICAgICAgIFtcImxlc3NcIl0sXG4gICAgTGlxdWlkOiAgICAgIFtcImxpcXVpZFwiXSxcbiAgICBMaXNwOiAgICAgICAgW1wibGlzcFwiXSxcbiAgICBMaXZlU2NyaXB0OiAgW1wibHNcIl0sXG4gICAgTG9nOiAgICAgICAgIFtcImxvZ1wiXSxcbiAgICBMb2dpUUw6ICAgICAgW1wibG9naWN8bHFsXCJdLFxuICAgIExvZ3RhbGs6ICAgICBbXCJsZ3RcIl0sXG4gICAgTFNMOiAgICAgICAgIFtcImxzbFwiXSxcbiAgICBMdWE6ICAgICAgICAgW1wibHVhXCJdLFxuICAgIEx1YVBhZ2U6ICAgICBbXCJscFwiXSxcbiAgICBMdWNlbmU6ICAgICAgW1wibHVjZW5lXCJdLFxuICAgIE1ha2VmaWxlOiAgICBbXCJeTWFrZWZpbGV8XkdOVW1ha2VmaWxlfF5tYWtlZmlsZXxeT0NhbWxNYWtlZmlsZXxtYWtlXCJdLFxuICAgIE1hcmtkb3duOiAgICBbXCJtZHxtYXJrZG93blwiXSxcbiAgICBNYXNrOiAgICAgICAgW1wibWFza1wiXSxcbiAgICBNQVRMQUI6ICAgICAgW1wibWF0bGFiXCJdLFxuICAgIE1hemU6ICAgICAgICBbXCJtelwiXSxcbiAgICBNZWRpYVdpa2k6ICAgW1wid2lraXxtZWRpYXdpa2lcIl0sXG4gICAgTUVMOiAgICAgICAgIFtcIm1lbFwiXSxcbiAgICBNSVBTOiAgICAgICAgW1wic3xhc21cIl0sXG4gICAgTUlYQUw6ICAgICAgIFtcIm1peGFsXCJdLFxuICAgIE1VU0hDb2RlOiAgICBbXCJtY3xtdXNoXCJdLFxuICAgIE15U1FMOiAgICAgICBbXCJteXNxbFwiXSxcbiAgICBOYXNhbDogICAgICAgW1wibmFzXCJdLFxuICAgIE5naW54OiAgICAgICBbXCJuZ2lueHxjb25mXCJdLFxuICAgIE5pbTogICAgICAgICBbXCJuaW1cIl0sXG4gICAgTml4OiAgICAgICAgIFtcIm5peFwiXSxcbiAgICBOU0lTOiAgICAgICAgW1wibnNpfG5zaFwiXSxcbiAgICBOdW5qdWNrczogICAgW1wibnVuanVja3N8bnVuanN8bmp8bmprXCJdLFxuICAgIE9iamVjdGl2ZUM6ICBbXCJtfG1tXCJdLFxuICAgIE9DYW1sOiAgICAgICBbXCJtbHxtbGlcIl0sXG4gICAgT2RpbjogICAgICAgIFtcIm9kaW5cIl0sXG4gICAgUGFydGlRTDogICAgIFtcInBhcnRpcWx8cHFsXCJdLFxuICAgIFBhc2NhbDogICAgICBbXCJwYXN8cFwiXSxcbiAgICBQZXJsOiAgICAgICAgW1wicGx8cG1cIl0sXG4gICAgcGdTUUw6ICAgICAgIFtcInBnc3FsXCJdLFxuICAgIFBIUDogICAgICAgICBbXCJwaHB8aW5jfHBodG1sfHNodG1sfHBocDN8cGhwNHxwaHA1fHBocHN8cGhwdHxhd3xjdHB8bW9kdWxlXCJdLFxuICAgIFBIUF9MYXJhdmVsX2JsYWRlOiBbXCJibGFkZS5waHBcIl0sXG4gICAgUGlnOiAgICAgICAgIFtcInBpZ1wiXSxcbiAgICBQTFNRTDogICAgICAgW1wicGxzcWxcIl0sXG4gICAgUG93ZXJzaGVsbDogIFtcInBzMVwiXSxcbiAgICBQcmFhdDogICAgICAgW1wicHJhYXR8cHJhYXRzY3JpcHR8cHNjfHByb2NcIl0sXG4gICAgUHJpc21hOiAgICAgIFtcInByaXNtYVwiXSxcbiAgICBQcm9sb2c6ICAgICAgW1wicGxnfHByb2xvZ1wiXSxcbiAgICBQcm9wZXJ0aWVzOiAgW1wicHJvcGVydGllc1wiXSxcbiAgICBQcm90b2J1ZjogICAgW1wicHJvdG9cIl0sXG4gICAgUFJRTDogICAgICAgIFtcInBycWxcIl0sXG4gICAgUHVwcGV0OiAgICAgIFtcImVwcHxwcFwiXSxcbiAgICBQeXRob246ICAgICAgW1wicHlcIl0sXG4gICAgUU1MOiAgICAgICAgIFtcInFtbFwiXSxcbiAgICBSOiAgICAgICAgICAgW1wiclwiXSxcbiAgICBSYWt1OiAgICAgICAgW1wicmFrdXxyYWt1bW9kfHJha3V0ZXN0fHA2fHBsNnxwbTZcIl0sXG4gICAgUmF6b3I6ICAgICAgIFtcImNzaHRtbHxhc3BcIl0sXG4gICAgUkRvYzogICAgICAgIFtcIlJkXCJdLFxuICAgIFJlZDogICAgICAgICBbXCJyZWR8cmVkc1wiXSxcbiAgICBSSFRNTDogICAgICAgW1wiUmh0bWxcIl0sXG4gICAgUm9ib3Q6ICAgICAgIFtcInJvYm90fHJlc291cmNlXCJdLFxuICAgIFJTVDogICAgICAgICBbXCJyc3RcIl0sXG4gICAgUnVieTogICAgICAgIFtcInJifHJ1fGdlbXNwZWN8cmFrZXxeR3VhcmRmaWxlfF5SYWtlZmlsZXxeR2VtZmlsZVwiXSxcbiAgICBSdXN0OiAgICAgICAgW1wicnNcIl0sXG4gICAgU2FDOiAgICAgICAgIFtcInNhY1wiXSxcbiAgICBTQVNTOiAgICAgICAgW1wic2Fzc1wiXSxcbiAgICBTQ0FEOiAgICAgICAgW1wic2NhZFwiXSxcbiAgICBTY2FsYTogICAgICAgW1wic2NhbGF8c2J0XCJdLFxuICAgIFNjaGVtZTogICAgICBbXCJzY218c218cmt0fG9ha3xzY2hlbWVcIl0sXG4gICAgU2NyeXB0OiAgICAgIFtcInNjcnlwdFwiXSxcbiAgICBTQ1NTOiAgICAgICAgW1wic2Nzc1wiXSxcbiAgICBTSDogICAgICAgICAgW1wic2h8YmFzaHxeLmJhc2hyY1wiXSxcbiAgICBTSlM6ICAgICAgICAgW1wic2pzXCJdLFxuICAgIFNsaW06ICAgICAgICBbXCJzbGltfHNraW1cIl0sXG4gICAgU21hcnR5OiAgICAgIFtcInNtYXJ0eXx0cGxcIl0sXG4gICAgU21pdGh5OiAgICAgIFtcInNtaXRoeVwiXSxcbiAgICBzbmlwcGV0czogICAgW1wic25pcHBldHNcIl0sXG4gICAgU295X1RlbXBsYXRlOltcInNveVwiXSxcbiAgICBTcGFjZTogICAgICAgW1wic3BhY2VcIl0sXG4gICAgU1BBUlFMOiAgICAgIFtcInJxXCJdLFxuICAgIFNRTDogICAgICAgICBbXCJzcWxcIl0sXG4gICAgU1FMU2VydmVyOiAgIFtcInNxbHNlcnZlclwiXSxcbiAgICBTdHlsdXM6ICAgICAgW1wic3R5bHxzdHlsdXNcIl0sXG4gICAgU1ZHOiAgICAgICAgIFtcInN2Z1wiXSxcbiAgICBTd2lmdDogICAgICAgW1wic3dpZnRcIl0sXG4gICAgVGNsOiAgICAgICAgIFtcInRjbFwiXSxcbiAgICBUZXJyYWZvcm06ICAgW1widGZcIiwgXCJ0ZnZhcnNcIiwgXCJ0ZXJyYWdydW50XCJdLFxuICAgIFRleDogICAgICAgICBbXCJ0ZXhcIl0sXG4gICAgVGV4dDogICAgICAgIFtcInR4dFwiXSxcbiAgICBUZXh0aWxlOiAgICAgW1widGV4dGlsZVwiXSxcbiAgICBUb21sOiAgICAgICAgW1widG9tbFwiXSxcbiAgICBUU1g6ICAgICAgICAgW1widHN4XCJdLFxuICAgIFR1cnRsZTogICAgICBbXCJ0dGxcIl0sXG4gICAgVHdpZzogICAgICAgIFtcInR3aWd8c3dpZ1wiXSxcbiAgICBUeXBlc2NyaXB0OiAgW1widHN8bXRzfGN0c3x0eXBlc2NyaXB0fHN0clwiXSxcbiAgICBWYWxhOiAgICAgICAgW1widmFsYVwiXSxcbiAgICBWQlNjcmlwdDogICAgW1widmJzfHZiXCJdLFxuICAgIFZlbG9jaXR5OiAgICBbXCJ2bVwiXSxcbiAgICBWZXJpbG9nOiAgICAgW1widnx2aHxzdnxzdmhcIl0sXG4gICAgVkhETDogICAgICAgIFtcInZoZHx2aGRsXCJdLFxuICAgIFZpc3VhbGZvcmNlOiBbXCJ2ZnB8Y29tcG9uZW50fHBhZ2VcIl0sXG4gICAgV29sbG9rOiAgICAgIFtcIndsa3x3cGdtfHd0ZXN0XCJdLFxuICAgIFhNTDogICAgICAgICBbXCJ4bWx8cmRmfHJzc3x3c2RsfHhzbHR8YXRvbXxtYXRobWx8bW1sfHh1bHx4Ymx8eGFtbFwiXSxcbiAgICBYUXVlcnk6ICAgICAgW1wieHFcIl0sXG4gICAgWUFNTDogICAgICAgIFtcInlhbWx8eW1sXCJdLFxuICAgIFplZWs6ICAgICAgICBbXCJ6ZWVrfGJyb1wiXVxufTtcblxudmFyIG5hbWVPdmVycmlkZXMgPSB7XG4gICAgT2JqZWN0aXZlQzogXCJPYmplY3RpdmUtQ1wiLFxuICAgIENTaGFycDogXCJDI1wiLFxuICAgIGdvbGFuZzogXCJHb1wiLFxuICAgIENfQ3BwOiBcIkMgYW5kIEMrK1wiLFxuICAgIENzb3VuZF9Eb2N1bWVudDogXCJDc291bmQgRG9jdW1lbnRcIixcbiAgICBDc291bmRfT3JjaGVzdHJhOiBcIkNzb3VuZFwiLFxuICAgIENzb3VuZF9TY29yZTogXCJDc291bmQgU2NvcmVcIixcbiAgICBjb2ZmZWU6IFwiQ29mZmVlU2NyaXB0XCIsXG4gICAgSFRNTF9SdWJ5OiBcIkhUTUwgKFJ1YnkpXCIsXG4gICAgSFRNTF9FbGl4aXI6IFwiSFRNTCAoRWxpeGlyKVwiLFxuICAgIEZUTDogXCJGcmVlTWFya2VyXCIsXG4gICAgUEhQX0xhcmF2ZWxfYmxhZGU6IFwiUEhQIChCbGFkZSBUZW1wbGF0ZSlcIixcbiAgICBQZXJsNjogXCJQZXJsIDZcIixcbiAgICBBdXRvSG90S2V5OiBcIkF1dG9Ib3RrZXkgLyBBdXRvSXRcIlxufTtcblxudmFyIG1vZGVzQnlOYW1lID0ge307XG5mb3IgKHZhciBuYW1lIGluIHN1cHBvcnRlZE1vZGVzKSB7XG4gICAgdmFyIGRhdGEgPSBzdXBwb3J0ZWRNb2Rlc1tuYW1lXTtcbiAgICB2YXIgZGlzcGxheU5hbWUgPSAobmFtZU92ZXJyaWRlc1tuYW1lXSB8fCBuYW1lKS5yZXBsYWNlKC9fL2csIFwiIFwiKTtcbiAgICB2YXIgZmlsZW5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFyIG1vZGUgPSBuZXcgTW9kZShmaWxlbmFtZSwgZGlzcGxheU5hbWUsIGRhdGFbMF0pO1xuICAgIG1vZGVzQnlOYW1lW2ZpbGVuYW1lXSA9IG1vZGU7XG4gICAgbW9kZXMucHVzaChtb2RlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZ2V0TW9kZUZvclBhdGg6IGdldE1vZGVGb3JQYXRoLFxuICAgIG1vZGVzOiBtb2RlcyxcbiAgICBtb2Rlc0J5TmFtZTogbW9kZXNCeU5hbWVcbn07XG4iLCIvKipcbiAqIFByb21wdCBwbHVnaW4gaXMgdXNlZCBmb3IgZ2V0dGluZyBpbnB1dCBmcm9tIHVzZXIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGVkaXRvciAgICAgICAgICAgICAgICAgICBPdXNpZGUgZWRpdG9yIHJlbGF0ZWQgdG8gdGhpcyBwcm9tcHQuIFdpbGwgYmUgYmx1cnJlZCB3aGVuIHByb21wdCBpcyBvcGVuLiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXNzYWdlICAgICAgICAgICAgICAgICAgUHJlZGVmaW5lZCB2YWx1ZSBvZiBwcm9tcHQgaW5wdXQgYm94LlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgICAgICAgICAgICAgICAgICBDdXNvbWl6YWJsZSBvcHRpb25zIGZvciB0aGlzIHByb21wdC4gXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5uYW1lICAgICAgICAgICAgIFByb21wdCBuYW1lLlxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuJHR5cGUgICAgICAgICAgICBVc2UgcHJvbXB0IG9mIHNwZWNpZmljIHR5cGUgKGdvdG9MaW5lfGNvbW1hbmRzfG1vZGVzIG9yIGRlZmF1bHQgaWYgZW1wdHkpLlxuICogQHBhcmFtIHtbc3RhcnQsIGVuZF19IG9wdGlvbnMuc2VsZWN0aW9uICBEZWZpbmVzIHdoaWNoIHBhcnQgb2YgdGhlIHByZWRlZmluZWQgdmFsdWUgc2hvdWxkIGJlIGhpZ2hsaXRlZC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5oYXNEZXNjcmlwdGlvbiAgU2V0IHRvIHRydWUgaWYgcHJvbXB0IGhhcyBkZXNjcmlwdGlvbiBiZWxvdyBpbnB1dCBib3guXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5wcm9tcHQgICAgICAgICAgIERlc2NyaXB0aW9uIGJlbG93IGlucHV0IGJveC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnBsYWNlaG9sZGVyICAgICAgUGxhY2Vob2xkZXIgZm9yIHZhbHVlLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuJHJ1bGVzICAgICAgICAgICBTcGVjaWZpYyBydWxlcyBmb3IgaW5wdXQgbGlrZSBwYXNzd29yZCBvciByZWdleHAuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9wdGlvbnMuaWdub3JlRm9jdXNPdXQgIFNldCB0byB0cnVlIHRvIGtlZXAgdGhlIHByb21wdCBvcGVuIHdoZW4gZm9jdXMgbW92ZXMgdG8gYW5vdGhlciBwYXJ0IG9mIHRoZSBlZGl0b3IuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLmdldENvbXBsZXRpb25zIEZ1bmN0aW9uIGZvciBkZWZpbmluZyBsaXN0IG9mIG9wdGlvbnMgZm9yIHZhbHVlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5nZXRQcmVmaXggICAgICBGdW5jdGlvbiBmb3IgZGVmaW5pbmcgY3VycmVudCB2YWx1ZSBwcmVmaXguXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLm9uQWNjZXB0ICAgICAgIEZ1bmN0aW9uIGNhbGxlZCB3aGVuIEVudGVyIGlzIHByZXNzZWQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLm9uSW5wdXQgICAgICAgIEZ1bmN0aW9uIGNhbGxlZCB3aGVuIGlucHV0IGlzIGFkZGVkIHRvIHByb21wdCBpbnB1dCBib3guXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLm9uQ2FuY2VsICAgICAgIEZ1bmN0aW9uIGNhbGxlZCB3aGVuIEVzY3xTaGlmdC1Fc2MgaXMgcHJlc3NlZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrICAgICAgICAgICAgICAgRnVuY3Rpb24gY2FsbGVkIGFmdGVyIGRvbmUuXG4gKiAqL1xuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIG5scyA9IHJlcXVpcmUoXCIuLi9jb25maWdcIikubmxzO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xudmFyIGRvbSA9IHJlcXVpcmUoXCIuLi9saWIvZG9tXCIpO1xudmFyIEZpbHRlcmVkTGlzdD0gcmVxdWlyZShcIi4uL2F1dG9jb21wbGV0ZVwiKS5GaWx0ZXJlZExpc3Q7XG52YXIgQWNlUG9wdXAgPSByZXF1aXJlKCcuLi9hdXRvY29tcGxldGUvcG9wdXAnKS5BY2VQb3B1cDtcbnZhciAkc2luZ2xlTGluZUVkaXRvciA9IHJlcXVpcmUoJy4uL2F1dG9jb21wbGV0ZS9wb3B1cCcpLiRzaW5nbGVMaW5lRWRpdG9yO1xudmFyIFVuZG9NYW5hZ2VyID0gcmVxdWlyZShcIi4uL3VuZG9tYW5hZ2VyXCIpLlVuZG9NYW5hZ2VyO1xudmFyIFRva2VuaXplciA9IHJlcXVpcmUoXCIuLi90b2tlbml6ZXJcIikuVG9rZW5pemVyO1xudmFyIG92ZXJsYXlQYWdlID0gcmVxdWlyZShcIi4vbWVudV90b29scy9vdmVybGF5X3BhZ2VcIikub3ZlcmxheVBhZ2U7XG52YXIgbW9kZWxpc3QgPSByZXF1aXJlKFwiLi9tb2RlbGlzdFwiKTtcbnZhciBvcGVuUHJvbXB0O1xuXG5mdW5jdGlvbiBwcm9tcHQoZWRpdG9yLCBtZXNzYWdlLCBvcHRpb25zLCBjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2YgbWVzc2FnZSA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgIHJldHVybiBwcm9tcHQoZWRpdG9yLCBcIlwiLCBtZXNzYWdlLCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKG9wZW5Qcm9tcHQpIHtcbiAgICAgICAgdmFyIGxhc3RQcm9tcHQgPSBvcGVuUHJvbXB0O1xuICAgICAgICBlZGl0b3IgPSBsYXN0UHJvbXB0LmVkaXRvcjtcbiAgICAgICAgbGFzdFByb21wdC5jbG9zZSgpO1xuICAgICAgICBpZiAobGFzdFByb21wdC5uYW1lICYmIGxhc3RQcm9tcHQubmFtZSA9PSBvcHRpb25zLm5hbWUpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvcHRpb25zLiR0eXBlKVxuICAgICAgIHJldHVybiBwcm9tcHRbb3B0aW9ucy4kdHlwZV0oZWRpdG9yLCBjYWxsYmFjayk7XG5cbiAgICB2YXIgY21kTGluZSA9ICRzaW5nbGVMaW5lRWRpdG9yKCk7XG4gICAgY21kTGluZS5zZXNzaW9uLnNldFVuZG9NYW5hZ2VyKG5ldyBVbmRvTWFuYWdlcigpKTtcblxuICAgIHZhciBlbCA9IGRvbS5idWlsZERvbShbXCJkaXZcIiwge2NsYXNzOiBcImFjZV9wcm9tcHRfY29udGFpbmVyXCIgKyAob3B0aW9ucy5oYXNEZXNjcmlwdGlvbiA/IFwiIGlucHV0LWJveC13aXRoLWRlc2NyaXB0aW9uXCIgOiBcIlwiKX1dKTtcbiAgICB2YXIgb3ZlcmxheSA9IG92ZXJsYXlQYWdlKGVkaXRvciwgZWwsIGRvbmUpO1xuICAgIGVsLmFwcGVuZENoaWxkKGNtZExpbmUuY29udGFpbmVyKTtcblxuICAgIGlmIChlZGl0b3IpIHtcbiAgICAgICAgZWRpdG9yLmNtZExpbmUgPSBjbWRMaW5lO1xuICAgICAgICBjbWRMaW5lLnNldE9wdGlvbihcImZvbnRTaXplXCIsIGVkaXRvci5nZXRPcHRpb24oXCJmb250U2l6ZVwiKSk7XG4gICAgfVxuICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgIGNtZExpbmUuc2V0VmFsdWUobWVzc2FnZSwgMSk7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLnNlbGVjdGlvbikge1xuICAgICAgICBjbWRMaW5lLnNlbGVjdGlvbi5zZXRSYW5nZSh7XG4gICAgICAgICAgICBzdGFydDogY21kTGluZS5zZXNzaW9uLmRvYy5pbmRleFRvUG9zaXRpb24ob3B0aW9ucy5zZWxlY3Rpb25bMF0pLFxuICAgICAgICAgICAgZW5kOiBjbWRMaW5lLnNlc3Npb24uZG9jLmluZGV4VG9Qb3NpdGlvbihvcHRpb25zLnNlbGVjdGlvblsxXSlcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuZ2V0Q29tcGxldGlvbnMpIHtcbiAgICAgICAgdmFyIHBvcHVwID0gbmV3IEFjZVBvcHVwKCk7XG4gICAgICAgIHBvcHVwLnJlbmRlcmVyLnNldFN0eWxlKFwiYWNlX2F1dG9jb21wbGV0ZV9pbmxpbmVcIik7XG4gICAgICAgIHBvcHVwLmNvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICBwb3B1cC5jb250YWluZXIuc3R5bGUubWF4V2lkdGggPSBcIjYwMHB4XCI7XG4gICAgICAgIHBvcHVwLmNvbnRhaW5lci5zdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICBwb3B1cC5jb250YWluZXIuc3R5bGUubWFyZ2luVG9wID0gXCIzcHhcIjtcbiAgICAgICAgcG9wdXAucmVuZGVyZXIuc2V0U2Nyb2xsTWFyZ2luKDIsIDIsIDAsIDApO1xuICAgICAgICBwb3B1cC5hdXRvU2VsZWN0ID0gZmFsc2U7XG4gICAgICAgIHBvcHVwLnJlbmRlcmVyLiRtYXhMaW5lcyA9IDE1O1xuICAgICAgICBwb3B1cC5zZXRSb3coLTEpO1xuICAgICAgICBwb3B1cC5vbihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gcG9wdXAuZ2V0RGF0YShwb3B1cC5nZXRSb3coKSk7XG4gICAgICAgICAgICBpZiAoIWRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjbWRMaW5lLnNldFZhbHVlKGRhdGEudmFsdWUgfHwgZGF0YS5uYW1lIHx8IGRhdGEpO1xuICAgICAgICAgICAgICAgIGFjY2VwdCgpO1xuICAgICAgICAgICAgICAgIGUuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQocG9wdXAuY29udGFpbmVyKTtcbiAgICAgICAgdXBkYXRlQ29tcGxldGlvbnMoKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy4kcnVsZXMpIHtcbiAgICAgICAgdmFyIHRva2VuaXplciA9IG5ldyBUb2tlbml6ZXIob3B0aW9ucy4kcnVsZXMpO1xuICAgICAgICBjbWRMaW5lLnNlc3Npb24uYmdUb2tlbml6ZXIuc2V0VG9rZW5pemVyKHRva2VuaXplcik7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMucGxhY2Vob2xkZXIpIHtcbiAgICAgICAgY21kTGluZS5zZXRPcHRpb24oXCJwbGFjZWhvbGRlclwiLCBvcHRpb25zLnBsYWNlaG9sZGVyKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5oYXNEZXNjcmlwdGlvbikge1xuICAgICAgICB2YXIgcHJvbXB0VGV4dENvbnRhaW5lciA9IGRvbS5idWlsZERvbShbXCJkaXZcIiwge2NsYXNzOiBcImFjZV9wcm9tcHRfdGV4dF9jb250YWluZXJcIn1dKTtcbiAgICAgICAgZG9tLmJ1aWxkRG9tKG9wdGlvbnMucHJvbXB0IHx8IFwiUHJlc3MgJ0VudGVyJyB0byBjb25maXJtIG9yICdFc2NhcGUnIHRvIGNhbmNlbFwiLCBwcm9tcHRUZXh0Q29udGFpbmVyKTtcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQocHJvbXB0VGV4dENvbnRhaW5lcik7XG4gICAgfVxuXG4gICAgb3ZlcmxheS5zZXRJZ25vcmVGb2N1c091dChvcHRpb25zLmlnbm9yZUZvY3VzT3V0KTtcblxuICAgIGZ1bmN0aW9uIGFjY2VwdCgpIHtcbiAgICAgICAgdmFyIHZhbDtcbiAgICAgICAgaWYgKHBvcHVwICYmIHBvcHVwLmdldEN1cnNvclBvc2l0aW9uKCkucm93ID4gMCkge1xuICAgICAgICAgICAgdmFsID0gdmFsdWVGcm9tUmVjZW50TGlzdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsID0gY21kTGluZS5nZXRWYWx1ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJEYXRhID0gcG9wdXAgPyBwb3B1cC5nZXREYXRhKHBvcHVwLmdldFJvdygpKSA6IHZhbDtcbiAgICAgICAgaWYgKGN1ckRhdGEgJiYgIWN1ckRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgICAgIG9wdGlvbnMub25BY2NlcHQgJiYgb3B0aW9ucy5vbkFjY2VwdCh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbCxcbiAgICAgICAgICAgICAgICBpdGVtOiBjdXJEYXRhXG4gICAgICAgICAgICB9LCBjbWRMaW5lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBrZXlzID0ge1xuICAgICAgICBcIkVudGVyXCI6IGFjY2VwdCxcbiAgICAgICAgXCJFc2N8U2hpZnQtRXNjXCI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgb3B0aW9ucy5vbkNhbmNlbCAmJiBvcHRpb25zLm9uQ2FuY2VsKGNtZExpbmUuZ2V0VmFsdWUoKSwgY21kTGluZSk7XG4gICAgICAgICAgICBkb25lKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYgKHBvcHVwKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oa2V5cywge1xuICAgICAgICAgICAgXCJVcFwiOiBmdW5jdGlvbihlZGl0b3IpIHsgcG9wdXAuZ29UbyhcInVwXCIpOyB2YWx1ZUZyb21SZWNlbnRMaXN0KCk7fSxcbiAgICAgICAgICAgIFwiRG93blwiOiBmdW5jdGlvbihlZGl0b3IpIHsgcG9wdXAuZ29UbyhcImRvd25cIik7IHZhbHVlRnJvbVJlY2VudExpc3QoKTt9LFxuICAgICAgICAgICAgXCJDdHJsLVVwfEN0cmwtSG9tZVwiOiBmdW5jdGlvbihlZGl0b3IpIHsgcG9wdXAuZ29UbyhcInN0YXJ0XCIpOyB2YWx1ZUZyb21SZWNlbnRMaXN0KCk7fSxcbiAgICAgICAgICAgIFwiQ3RybC1Eb3dufEN0cmwtRW5kXCI6IGZ1bmN0aW9uKGVkaXRvcikgeyBwb3B1cC5nb1RvKFwiZW5kXCIpOyB2YWx1ZUZyb21SZWNlbnRMaXN0KCk7fSxcbiAgICAgICAgICAgIFwiVGFiXCI6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICAgICAgICAgIHBvcHVwLmdvVG8oXCJkb3duXCIpOyB2YWx1ZUZyb21SZWNlbnRMaXN0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJQYWdlVXBcIjogZnVuY3Rpb24oZWRpdG9yKSB7IHBvcHVwLmdvdG9QYWdlVXAoKTsgdmFsdWVGcm9tUmVjZW50TGlzdCgpO30sXG4gICAgICAgICAgICBcIlBhZ2VEb3duXCI6IGZ1bmN0aW9uKGVkaXRvcikgeyBwb3B1cC5nb3RvUGFnZURvd24oKTsgdmFsdWVGcm9tUmVjZW50TGlzdCgpO31cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY21kTGluZS5jb21tYW5kcy5iaW5kS2V5cyhrZXlzKTtcblxuICAgIGZ1bmN0aW9uIGRvbmUoKSB7XG4gICAgICAgIG92ZXJsYXkuY2xvc2UoKTtcbiAgICAgICAgY2FsbGJhY2sgJiYgY2FsbGJhY2soKTtcbiAgICAgICAgb3BlblByb21wdCA9IG51bGw7XG4gICAgfVxuXG4gICAgY21kTGluZS5vbihcImlucHV0XCIsIGZ1bmN0aW9uKCkge1xuICAgICAgICBvcHRpb25zLm9uSW5wdXQgJiYgb3B0aW9ucy5vbklucHV0KCk7XG4gICAgICAgIHVwZGF0ZUNvbXBsZXRpb25zKCk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVDb21wbGV0aW9ucygpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuZ2V0Q29tcGxldGlvbnMpIHtcbiAgICAgICAgICAgIHZhciBwcmVmaXg7XG4gICAgICAgICAgICBpZiAob3B0aW9ucy5nZXRQcmVmaXgpIHtcbiAgICAgICAgICAgICAgICBwcmVmaXggPSBvcHRpb25zLmdldFByZWZpeChjbWRMaW5lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25zID0gb3B0aW9ucy5nZXRDb21wbGV0aW9ucyhjbWRMaW5lKTtcbiAgICAgICAgICAgIHBvcHVwLnNldERhdGEoY29tcGxldGlvbnMsIHByZWZpeCk7XG4gICAgICAgICAgICBwb3B1cC5yZXNpemUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2YWx1ZUZyb21SZWNlbnRMaXN0KCkge1xuICAgICAgICB2YXIgY3VycmVudCA9IHBvcHVwLmdldERhdGEocG9wdXAuZ2V0Um93KCkpO1xuICAgICAgICBpZiAoY3VycmVudCAmJiAhY3VycmVudC5lcnJvcilcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50LnZhbHVlIHx8IGN1cnJlbnQuY2FwdGlvbiB8fCBjdXJyZW50O1xuICAgIH1cblxuICAgIGNtZExpbmUucmVzaXplKHRydWUpO1xuICAgIGlmIChwb3B1cCkge1xuICAgICAgICBwb3B1cC5yZXNpemUodHJ1ZSk7XG4gICAgfVxuICAgIGNtZExpbmUuZm9jdXMoKTtcblxuICAgIG9wZW5Qcm9tcHQgPSB7XG4gICAgICAgIGNsb3NlOiBkb25lLFxuICAgICAgICBuYW1lOiBvcHRpb25zLm5hbWUsXG4gICAgICAgIGVkaXRvcjogZWRpdG9yXG4gICAgfTtcbn1cblxucHJvbXB0LmdvdG9MaW5lID0gZnVuY3Rpb24oZWRpdG9yLCBjYWxsYmFjaykge1xuICAgIGZ1bmN0aW9uIHN0cmluZ2lmeVNlbGVjdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHNlbGVjdGlvbikpXG4gICAgICAgICAgICBzZWxlY3Rpb24gPSBbc2VsZWN0aW9uXTtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbi5tYXAoZnVuY3Rpb24ocikge1xuICAgICAgICAgICAgdmFyIGN1cnNvciA9IHIuaXNCYWNrd2FyZHMgPyByLnN0YXJ0OiByLmVuZDtcbiAgICAgICAgICAgIHZhciBhbmNob3IgPSByLmlzQmFja3dhcmRzID8gci5lbmQ6IHIuc3RhcnQ7XG4gICAgICAgICAgICB2YXIgcm93ID0gYW5jaG9yLnJvdztcbiAgICAgICAgICAgIHZhciBzID0gKHJvdyArIDEpICsgXCI6XCIgKyBhbmNob3IuY29sdW1uO1xuXG4gICAgICAgICAgICBpZiAoYW5jaG9yLnJvdyA9PSBjdXJzb3Iucm93KSB7XG4gICAgICAgICAgICAgICAgaWYgKGFuY2hvci5jb2x1bW4gIT0gY3Vyc29yLmNvbHVtbilcbiAgICAgICAgICAgICAgICAgICAgcyArPSBcIj5cIiArIFwiOlwiICsgY3Vyc29yLmNvbHVtbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcyArPSBcIj5cIiArIChjdXJzb3Iucm93ICsgMSkgKyBcIjpcIiArIGN1cnNvci5jb2x1bW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcztcbiAgICAgICAgfSkucmV2ZXJzZSgpLmpvaW4oXCIsIFwiKTtcbiAgICB9XG5cbiAgICBwcm9tcHQoZWRpdG9yLCBcIjpcIiArIHN0cmluZ2lmeVNlbGVjdGlvbihlZGl0b3Iuc2VsZWN0aW9uLnRvSlNPTigpKSwge1xuICAgICAgICBuYW1lOiBcImdvdG9MaW5lXCIsXG4gICAgICAgIHNlbGVjdGlvbjogWzEsIE51bWJlci5NQVhfVkFMVUVdLFxuICAgICAgICBvbkFjY2VwdDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gZGF0YS52YWx1ZTtcbiAgICAgICAgICAgIHZhciBfaGlzdG9yeSA9IHByb21wdC5nb3RvTGluZS5faGlzdG9yeTtcbiAgICAgICAgICAgIGlmICghX2hpc3RvcnkpXG4gICAgICAgICAgICAgICAgcHJvbXB0LmdvdG9MaW5lLl9oaXN0b3J5ID0gX2hpc3RvcnkgPSBbXTtcbiAgICAgICAgICAgIGlmIChfaGlzdG9yeS5pbmRleE9mKHZhbHVlKSAhPSAtMSlcbiAgICAgICAgICAgICAgICBfaGlzdG9yeS5zcGxpY2UoX2hpc3RvcnkuaW5kZXhPZih2YWx1ZSksIDEpO1xuICAgICAgICAgICAgX2hpc3RvcnkudW5zaGlmdCh2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoX2hpc3RvcnkubGVuZ3RoID4gMjApIF9oaXN0b3J5Lmxlbmd0aCA9IDIwO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBwb3MgPSBlZGl0b3IuZ2V0Q3Vyc29yUG9zaXRpb24oKTtcbiAgICAgICAgICAgIHZhciByYW5nZXMgPSBbXTtcbiAgICAgICAgICAgIHZhbHVlLnJlcGxhY2UoL146LywgXCJcIikuc3BsaXQoLywvKS5tYXAoZnVuY3Rpb24oc3RyKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gc3RyLnNwbGl0KC8oWzw+OistXXxjP1xcZCspfFteY1xcZDw+OistXSsvKS5maWx0ZXIoQm9vbGVhbik7XG4gICAgICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIHJlYWRQb3NpdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGMgPSBwYXJ0c1tpKytdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWMpIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNbMF0gPT0gXCJjXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGMuc2xpY2UoMSkpIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWRpdG9yLnNlc3Npb24uZG9jLmluZGV4VG9Qb3NpdGlvbihpbmRleCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIHJvdyA9IHBvcy5yb3c7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb2x1bW4gPSAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoL1xcZC8udGVzdChjKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93ID0gcGFyc2VJbnQoYykgLSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgYyA9IHBhcnRzW2krK107XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGMgPT0gXCI6XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBwYXJ0c1tpKytdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKC9cXGQvLnRlc3QoYykpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW4gPSBwYXJzZUludChjKSB8fCAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7cm93OiByb3csIGNvbHVtbjogY29sdW1ufTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcG9zID0gcmVhZFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgdmFyIHJhbmdlID0gUmFuZ2UuZnJvbVBvaW50cyhwb3MsIHBvcyk7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnRzW2ldID09IFwiPlwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UuZW5kID0gcmVhZFBvc2l0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBhcnRzW2ldID09IFwiPFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2Uuc3RhcnQgPSByZWFkUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmFuZ2VzLnVuc2hpZnQocmFuZ2UpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLmZyb21KU09OKHJhbmdlcyk7XG4gICAgICAgICAgICB2YXIgc2Nyb2xsVG9wID0gZWRpdG9yLnJlbmRlcmVyLnNjcm9sbFRvcDtcbiAgICAgICAgICAgIGVkaXRvci5yZW5kZXJlci5zY3JvbGxTZWxlY3Rpb25JbnRvVmlldyhcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLmFuY2hvciwgXG4gICAgICAgICAgICAgICAgZWRpdG9yLnNlbGVjdGlvbi5jdXJzb3IsIFxuICAgICAgICAgICAgICAgIDAuNVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGVkaXRvci5yZW5kZXJlci5hbmltYXRlU2Nyb2xsaW5nKHNjcm9sbFRvcCk7XG4gICAgICAgIH0sXG4gICAgICAgIGhpc3Rvcnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFwcm9tcHQuZ290b0xpbmUuX2hpc3RvcnkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgICAgICAgcmV0dXJuIHByb21wdC5nb3RvTGluZS5faGlzdG9yeTtcblxuICAgICAgICB9LFxuICAgICAgICBnZXRDb21wbGV0aW9uczogZnVuY3Rpb24oY21kTGluZSkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gY21kTGluZS5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgdmFyIG0gPSB2YWx1ZS5yZXBsYWNlKC9eOi8sIFwiXCIpLnNwbGl0KFwiOlwiKTtcbiAgICAgICAgICAgIHZhciByb3cgPSBNYXRoLm1pbihwYXJzZUludChtWzBdKSB8fCAxLCBlZGl0b3Iuc2Vzc2lvbi5nZXRMZW5ndGgoKSkgLSAxO1xuICAgICAgICAgICAgdmFyIGxpbmUgPSBlZGl0b3Iuc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgICAgICB2YXIgY3VycmVudCA9IHZhbHVlICsgXCIgIFwiICsgbGluZTtcbiAgICAgICAgICAgIHJldHVybiBbY3VycmVudF0uY29uY2F0KHRoaXMuaGlzdG9yeSgpKTtcbiAgICAgICAgfSxcbiAgICAgICAgJHJ1bGVzOiB7XG4gICAgICAgICAgICBzdGFydDogW3tcbiAgICAgICAgICAgICAgICByZWdleDogL1xcZCsvLFxuICAgICAgICAgICAgICAgIHRva2VuOiBcInN0cmluZ1wiXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgcmVnZXg6IC9bOiw+PCtcXC1jXS8sXG4gICAgICAgICAgICAgICAgdG9rZW46IFwia2V5d29yZFwiXG4gICAgICAgICAgICB9XVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5wcm9tcHQuY29tbWFuZHMgPSBmdW5jdGlvbihlZGl0b3IsIGNhbGxiYWNrKSB7XG4gICAgZnVuY3Rpb24gbm9ybWFsaXplTmFtZShuYW1lKSB7XG4gICAgICAgIHJldHVybiAobmFtZSB8fCBcIlwiKS5yZXBsYWNlKC9eLi8sIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgIHJldHVybiB4LnRvVXBwZXJDYXNlKHgpO1xuICAgICAgICB9KS5yZXBsYWNlKC9bYS16XVtBLVpdL2csIGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgIHJldHVybiB4WzBdICsgXCIgXCIgKyB4WzFdLnRvTG93ZXJDYXNlKHgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZnVuY3Rpb24gZ2V0RWRpdG9yQ29tbWFuZHNCeU5hbWUoZXhjbHVkZUNvbW1hbmRzKSB7XG4gICAgICAgIHZhciBjb21tYW5kc0J5TmFtZSA9IFtdO1xuICAgICAgICB2YXIgY29tbWFuZE1hcCA9IHt9O1xuICAgICAgICBlZGl0b3Iua2V5QmluZGluZy4kaGFuZGxlcnMuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICAgICAgICB2YXIgcGxhdGZvcm0gPSBoYW5kbGVyLnBsYXRmb3JtO1xuICAgICAgICAgICAgdmFyIGNibiA9IGhhbmRsZXIuYnlOYW1lO1xuICAgICAgICAgICAgZm9yICh2YXIgaSBpbiBjYm4pIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0gY2JuW2ldLmJpbmRLZXk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBrZXkgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAga2V5ID0ga2V5ICYmIGtleVtwbGF0Zm9ybV0gfHwgXCJcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGNvbW1hbmRzID0gY2JuW2ldO1xuICAgICAgICAgICAgICAgIHZhciBkZXNjcmlwdGlvbiA9IGNvbW1hbmRzLmRlc2NyaXB0aW9uIHx8IG5vcm1hbGl6ZU5hbWUoY29tbWFuZHMubmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKCFBcnJheS5pc0FycmF5KGNvbW1hbmRzKSlcbiAgICAgICAgICAgICAgICAgICAgY29tbWFuZHMgPSBbY29tbWFuZHNdO1xuICAgICAgICAgICAgICAgIGNvbW1hbmRzLmZvckVhY2goZnVuY3Rpb24oY29tbWFuZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNvbW1hbmQgIT0gXCJzdHJpbmdcIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQgPSBjb21tYW5kLm5hbWU7XG4gICAgICAgICAgICAgICAgICAgIHZhciBuZWVkbGUgPSBleGNsdWRlQ29tbWFuZHMuZmluZChmdW5jdGlvbihlbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGVsID09PSBjb21tYW5kO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFuZWVkbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb21tYW5kTWFwW2NvbW1hbmRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZE1hcFtjb21tYW5kXS5rZXkgKz0gXCJ8XCIgKyBrZXk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmRNYXBbY29tbWFuZF0gPSB7a2V5OiBrZXksIGNvbW1hbmQ6IGNvbW1hbmQsIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvbn07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZHNCeU5hbWUucHVzaChjb21tYW5kTWFwW2NvbW1hbmRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNvbW1hbmRzQnlOYW1lO1xuICAgIH1cbiAgICAvLyBleGNsdWRlIGNvbW1hbmRzIHRoYXQgY2FuIG5vdCBiZSBleGVjdXRlZCB3aXRob3V0IGFyZ3NcbiAgICB2YXIgZXhjbHVkZUNvbW1hbmRzTGlzdCA9IFtcImluc2VydHN0cmluZ1wiLCBcImluc2VydHRleHRcIiwgXCJzZXRJbmRlbnRhdGlvblwiLCBcInBhc3RlXCJdO1xuICAgIHZhciBzaG9ydGN1dHNBcnJheSA9IGdldEVkaXRvckNvbW1hbmRzQnlOYW1lKGV4Y2x1ZGVDb21tYW5kc0xpc3QpO1xuICAgIHNob3J0Y3V0c0FycmF5ID0gc2hvcnRjdXRzQXJyYXkubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHt2YWx1ZTogaXRlbS5kZXNjcmlwdGlvbiwgbWV0YTogaXRlbS5rZXksIGNvbW1hbmQ6IGl0ZW0uY29tbWFuZH07XG4gICAgfSk7XG4gICAgcHJvbXB0KGVkaXRvciwgXCJcIiwgIHtcbiAgICAgICAgbmFtZTogXCJjb21tYW5kc1wiLFxuICAgICAgICBzZWxlY3Rpb246IFswLCBOdW1iZXIuTUFYX1ZBTFVFXSxcbiAgICAgICAgbWF4SGlzdG9yeUNvdW50OiA1LFxuICAgICAgICBvbkFjY2VwdDogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgaWYgKGRhdGEuaXRlbSkge1xuICAgICAgICAgICAgICAgIHZhciBjb21tYW5kTmFtZSA9IGRhdGEuaXRlbS5jb21tYW5kO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkVG9IaXN0b3J5KGRhdGEuaXRlbSk7XG5cbiAgICAgICAgICAgICAgICBlZGl0b3IuZXhlY0NvbW1hbmQoY29tbWFuZE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBhZGRUb0hpc3Rvcnk6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBoaXN0b3J5ID0gdGhpcy5oaXN0b3J5KCk7XG4gICAgICAgICAgICBoaXN0b3J5LnVuc2hpZnQoaXRlbSk7XG4gICAgICAgICAgICBkZWxldGUgaXRlbS5tZXNzYWdlO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBoaXN0b3J5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGhpc3RvcnlbaV1bXCJjb21tYW5kXCJdID09IGl0ZW0uY29tbWFuZCApIHtcbiAgICAgICAgICAgICAgICAgICAgaGlzdG9yeS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLm1heEhpc3RvcnlDb3VudCA+IDAgJiYgaGlzdG9yeS5sZW5ndGggPiB0aGlzLm1heEhpc3RvcnlDb3VudCkge1xuICAgICAgICAgICAgICAgIGhpc3Rvcnkuc3BsaWNlKGhpc3RvcnkubGVuZ3RoIC0gMSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9tcHQuY29tbWFuZHMuaGlzdG9yeSA9IGhpc3Rvcnk7XG4gICAgICAgIH0sXG4gICAgICAgIGhpc3Rvcnk6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHByb21wdC5jb21tYW5kcy5oaXN0b3J5IHx8IFtdO1xuICAgICAgICB9LFxuICAgICAgICBnZXRQcmVmaXg6IGZ1bmN0aW9uKGNtZExpbmUpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50UG9zID0gY21kTGluZS5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGZpbHRlclZhbHVlID0gY21kTGluZS5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlclZhbHVlLnN1YnN0cmluZygwLCBjdXJyZW50UG9zLmNvbHVtbik7XG4gICAgICAgIH0sXG4gICAgICAgIGdldENvbXBsZXRpb25zOiBmdW5jdGlvbihjbWRMaW5lKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRGaWx0ZXJlZENvbXBsZXRpb25zKGNvbW1hbmRzLCBwcmVmaXgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0Q29tbWFuZHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGNvbW1hbmRzKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZmlsdGVyZWQgPSBuZXcgRmlsdGVyZWRMaXN0KHJlc3VsdENvbW1hbmRzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyZWQuZmlsdGVyQ29tcGxldGlvbnMocmVzdWx0Q29tbWFuZHMsIHByZWZpeCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldFVuaXF1ZUNvbW1hbmRMaXN0KGNvbW1hbmRzLCB1c2VkQ29tbWFuZHMpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXVzZWRDb21tYW5kcyB8fCAhdXNlZENvbW1hbmRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY29tbWFuZHM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBleGNsdWRlQ29tbWFuZHMgPSBbXTtcbiAgICAgICAgICAgICAgICB1c2VkQ29tbWFuZHMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGV4Y2x1ZGVDb21tYW5kcy5wdXNoKGl0ZW0uY29tbWFuZCk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0Q29tbWFuZHMgPSBbXTtcblxuICAgICAgICAgICAgICAgIGNvbW1hbmRzLmZvckVhY2goZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZXhjbHVkZUNvbW1hbmRzLmluZGV4T2YoaXRlbS5jb21tYW5kKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdENvbW1hbmRzLnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHRDb21tYW5kcztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHByZWZpeCA9IHRoaXMuZ2V0UHJlZml4KGNtZExpbmUpO1xuICAgICAgICAgICAgdmFyIHJlY2VudGx5VXNlZENvbW1hbmRzID0gZ2V0RmlsdGVyZWRDb21wbGV0aW9ucyh0aGlzLmhpc3RvcnkoKSwgcHJlZml4KTtcbiAgICAgICAgICAgIHZhciBvdGhlckNvbW1hbmRzID0gZ2V0VW5pcXVlQ29tbWFuZExpc3Qoc2hvcnRjdXRzQXJyYXksIHJlY2VudGx5VXNlZENvbW1hbmRzKTtcbiAgICAgICAgICAgIG90aGVyQ29tbWFuZHMgPSBnZXRGaWx0ZXJlZENvbXBsZXRpb25zKG90aGVyQ29tbWFuZHMsIHByZWZpeCk7XG5cbiAgICAgICAgICAgIGlmIChyZWNlbnRseVVzZWRDb21tYW5kcy5sZW5ndGggJiYgb3RoZXJDb21tYW5kcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZWNlbnRseVVzZWRDb21tYW5kc1swXS5tZXNzYWdlID0gbmxzKFwiUmVjZW50bHkgdXNlZFwiKTtcbiAgICAgICAgICAgICAgICBvdGhlckNvbW1hbmRzWzBdLm1lc3NhZ2UgPSBubHMoXCJPdGhlciBjb21tYW5kc1wiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25zID0gcmVjZW50bHlVc2VkQ29tbWFuZHMuY29uY2F0KG90aGVyQ29tbWFuZHMpO1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBsZXRpb25zLmxlbmd0aCA+IDAgPyBjb21wbGV0aW9ucyA6IFt7XG4gICAgICAgICAgICAgICAgdmFsdWU6IG5scyhcIk5vIG1hdGNoaW5nIGNvbW1hbmRzXCIpLFxuICAgICAgICAgICAgICAgIGVycm9yOiAxXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxucHJvbXB0Lm1vZGVzID0gZnVuY3Rpb24oZWRpdG9yLCBjYWxsYmFjaykge1xuICAgIHZhciBtb2Rlc0FycmF5ID0gbW9kZWxpc3QubW9kZXM7XG4gICAgbW9kZXNBcnJheSA9IG1vZGVzQXJyYXkubWFwKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHt2YWx1ZTogaXRlbS5jYXB0aW9uLCBtb2RlOiBpdGVtLm5hbWV9O1xuICAgIH0pO1xuICAgIHByb21wdChlZGl0b3IsIFwiXCIsICB7XG4gICAgICAgIG5hbWU6IFwibW9kZXNcIixcbiAgICAgICAgc2VsZWN0aW9uOiBbMCwgTnVtYmVyLk1BWF9WQUxVRV0sXG4gICAgICAgIG9uQWNjZXB0OiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5pdGVtKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1vZGVOYW1lID0gXCJhY2UvbW9kZS9cIiArIGRhdGEuaXRlbS5tb2RlO1xuICAgICAgICAgICAgICAgIGVkaXRvci5zZXNzaW9uLnNldE1vZGUobW9kZU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBnZXRQcmVmaXg6IGZ1bmN0aW9uKGNtZExpbmUpIHtcbiAgICAgICAgICAgIHZhciBjdXJyZW50UG9zID0gY21kTGluZS5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIGZpbHRlclZhbHVlID0gY21kTGluZS5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlclZhbHVlLnN1YnN0cmluZygwLCBjdXJyZW50UG9zLmNvbHVtbik7XG4gICAgICAgIH0sXG4gICAgICAgIGdldENvbXBsZXRpb25zOiBmdW5jdGlvbihjbWRMaW5lKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBnZXRGaWx0ZXJlZENvbXBsZXRpb25zKG1vZGVzLCBwcmVmaXgpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0Q29tbWFuZHMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG1vZGVzKSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgZmlsdGVyZWQgPSBuZXcgRmlsdGVyZWRMaXN0KHJlc3VsdENvbW1hbmRzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyZWQuZmlsdGVyQ29tcGxldGlvbnMocmVzdWx0Q29tbWFuZHMsIHByZWZpeCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBwcmVmaXggPSB0aGlzLmdldFByZWZpeChjbWRMaW5lKTtcbiAgICAgICAgICAgIHZhciBjb21wbGV0aW9ucyA9IGdldEZpbHRlcmVkQ29tcGxldGlvbnMobW9kZXNBcnJheSwgcHJlZml4KTtcbiAgICAgICAgICAgIHJldHVybiBjb21wbGV0aW9ucy5sZW5ndGggPiAwID8gY29tcGxldGlvbnMgOiBbe1xuICAgICAgICAgICAgICAgIFwiY2FwdGlvblwiOiBcIk5vIG1vZGUgbWF0Y2hpbmdcIixcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IFwiTm8gbW9kZSBtYXRjaGluZ1wiLFxuICAgICAgICAgICAgICAgIFwiZXJyb3JcIjogMVxuICAgICAgICAgICAgfV07XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbmRvbS5pbXBvcnRDc3NTdHJpbmcoYC5hY2VfcHJvbXB0X2NvbnRhaW5lciB7XG4gICAgbWF4LXdpZHRoOiA2MDNweDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW46IDIwcHggYXV0bztcbiAgICBwYWRkaW5nOiAzcHg7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgYm9yZGVyLXJhZGl1czogMnB4O1xuICAgIGJveC1zaGFkb3c6IDBweCAycHggM3B4IDBweCAjNTU1O1xufWAsIFwicHJvbXRwLmNzc1wiLCBmYWxzZSk7XG5cblxuZXhwb3J0cy5wcm9tcHQgPSBwcm9tcHQ7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=