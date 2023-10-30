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
var Tokenizer = (__webpack_require__(60760)/* .Tokenizer */ .d);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjE1MzEuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7QUFDYixVQUFVLG1CQUFPLENBQUMsSUFBZTtBQUNqQyxjQUFjLG1CQUFPLENBQUMsS0FBcUI7QUFDM0M7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7O0FBRUEsMEJBQTBCO0FBQzFCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsWUFBWTtBQUNuRCwwQkFBMEIsT0FBTyxVQUFVLFFBQVEsUUFBUTtBQUMzRCx3QkFBd0I7QUFDeEIsd0RBQXdEO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7O0FDL0RZOztBQUViO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixrQkFBa0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDclFBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxjQUFjO0FBQ3pCLFdBQVcsU0FBUztBQUNwQixXQUFXLFFBQVE7QUFDbkIsV0FBVyxRQUFRO0FBQ25CLFdBQVcsUUFBUTtBQUNuQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsVUFBVTtBQUNyQixXQUFXLFVBQVU7QUFDckIsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsVUFBVTtBQUNyQixXQUFXLFVBQVU7QUFDckI7O0FBRWE7O0FBRWIsVUFBVSxnQ0FBd0I7QUFDbEMsWUFBWSwyQ0FBeUI7QUFDckMsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsa0JBQWtCLG1EQUF1QztBQUN6RCxlQUFlLCtDQUF5QztBQUN4RCx3QkFBd0Isd0RBQWtEO0FBQzFFLGtCQUFrQixpREFBcUM7QUFDdkQsZ0JBQWdCLCtDQUFpQztBQUNqRCxrQkFBa0IsdUNBQWdEO0FBQ2xFLGVBQWUsbUJBQU8sQ0FBQyxLQUFZO0FBQ25DOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUNBQW1DLDhGQUE4RjtBQUNqSTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3REFBd0QsbUNBQW1DO0FBQzNGO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFDQUFxQyxrQkFBa0IsdUJBQXVCO0FBQzlFLHVDQUF1QyxvQkFBb0IsdUJBQXVCO0FBQ2xGLG9EQUFvRCxxQkFBcUIsdUJBQXVCO0FBQ2hHLHFEQUFxRCxtQkFBbUIsdUJBQXVCO0FBQy9GO0FBQ0Esb0NBQW9DO0FBQ3BDLGFBQWE7QUFDYix5Q0FBeUMsb0JBQW9CLHVCQUF1QjtBQUNwRiwyQ0FBMkMsc0JBQXNCO0FBQ2pFLFNBQVM7QUFDVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUIsbURBQW1EO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEIsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixvQkFBb0I7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7QUFHRCxjQUFjIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L21lbnVfdG9vbHMvb3ZlcmxheV9wYWdlLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tZW51X3Rvb2xzL3NldHRpbmdzX21lbnUuY3NzLmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tb2RlbGlzdC5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvcHJvbXB0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qanNsaW50IGluZGVudDogNCwgbWF4ZXJyOiA1MCwgd2hpdGU6IHRydWUsIGJyb3dzZXI6IHRydWUsIHZhcnM6IHRydWUqL1xuLypnbG9iYWwgZGVmaW5lLCByZXF1aXJlICovXG5cbi8qKlxuICogT3ZlcmxheSBQYWdlXG4gKiBAZmlsZU92ZXJ2aWV3IE92ZXJsYXkgUGFnZSA8YnIgLz5cbiAqIEdlbmVyYXRlcyBhbiBvdmVybGF5IGZvciBkaXNwbGF5aW5nIG1lbnVzLiBUaGUgb3ZlcmxheSBpcyBhbiBhYnNvbHV0ZWx5XG4gKiAgcG9zaXRpb25lZCBkaXYuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICovXG5cbid1c2Ugc3RyaWN0JztcbnZhciBkb20gPSByZXF1aXJlKFwiLi4vLi4vbGliL2RvbVwiKTtcbnZhciBjc3NUZXh0ID0gcmVxdWlyZShcIi4vc2V0dGluZ3NfbWVudS5jc3NcIik7XG5kb20uaW1wb3J0Q3NzU3RyaW5nKGNzc1RleHQsIFwic2V0dGluZ3NfbWVudS5jc3NcIiwgZmFsc2UpO1xuXG4vKipcbiAqIEdlbmVyYXRlcyBhbiBvdmVybGF5IGZvciBkaXNwbGF5aW5nIG1lbnVzLiBUaGUgb3ZlcmxheSBpcyBhbiBhYnNvbHV0ZWx5XG4gKiAgcG9zaXRpb25lZCBkaXYuXG4gKiBAYXV0aG9yIDxhIGhyZWY9XCJtYWlsdG86bWF0dGhld2thc3RvckBnbWFpbC5jb21cIj5cbiAqICBNYXR0aGV3IENocmlzdG9waGVyIEthc3Rvci1JbmFyZSBJSUkgPC9hPjxiciAvPlxuICogIOKYrSBIaWFsIEF0cm9wYSEhIOKYrVxuICogQHBhcmFtIHtFbGVtZW50fSBjb250ZW50RWxlbWVudCBBbnkgZWxlbWVudCB3aGljaCBtYXkgYmUgcHJlc2VudGVkIGluc2lkZVxuICogIGEgZGl2LlxuICovXG5cbm1vZHVsZS5leHBvcnRzLm92ZXJsYXlQYWdlID0gZnVuY3Rpb24gb3ZlcmxheVBhZ2UoZWRpdG9yLCBjb250ZW50RWxlbWVudCwgY2FsbGJhY2spIHtcbiAgICB2YXIgY2xvc2VyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGlnbm9yZUZvY3VzT3V0ID0gZmFsc2U7XG5cbiAgICBmdW5jdGlvbiBkb2N1bWVudEVzY0xpc3RlbmVyKGUpIHtcbiAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMjcpIHtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgICAgICAgaWYgKCFjbG9zZXIpIHJldHVybjtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGRvY3VtZW50RXNjTGlzdGVuZXIpO1xuICAgICAgICBjbG9zZXIucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChjbG9zZXIpO1xuICAgICAgICBpZiAoZWRpdG9yKSB7XG4gICAgICAgICAgICBlZGl0b3IuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgICAgICBjbG9zZXIgPSBudWxsO1xuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgIH1cblxuICAgICAvKipcbiAgICAgKiBEZWZpbmVzIHdoZXRoZXIgb3ZlcmxheSBpcyBjbG9zZWQgd2hlbiB1c2VyIGNsaWNrcyBvdXRzaWRlIG9mIGl0LlxuICAgICAqIFxuICAgICAqIEBwYXJhbSB7Qm9vbGVhbn0gaWdub3JlICAgICAgSWYgc2V0IHRvIHRydWUgb3ZlcmxheSBzdGF5cyBvcGVuIHdoZW4gZm9jdXMgbW92ZXMgdG8gYW5vdGhlciBwYXJ0IG9mIHRoZSBlZGl0b3IuXG4gICAgICovXG4gICAgZnVuY3Rpb24gc2V0SWdub3JlRm9jdXNPdXQoaWdub3JlKSB7XG4gICAgICAgIGlnbm9yZUZvY3VzT3V0ID0gaWdub3JlO1xuICAgICAgICBpZiAoaWdub3JlKSB7XG4gICAgICAgICAgICBjbG9zZXIuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xuICAgICAgICAgICAgY29udGVudEVsZW1lbnQuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VyLnN0eWxlLmNzc1RleHQgPSAnbWFyZ2luOiAwOyBwYWRkaW5nOiAwOyAnICtcbiAgICAgICAgJ3Bvc2l0aW9uOiBmaXhlZDsgdG9wOjA7IGJvdHRvbTowOyBsZWZ0OjA7IHJpZ2h0OjA7JyArXG4gICAgICAgICd6LWluZGV4OiA5OTkwOyAnICtcbiAgICAgICAgKGVkaXRvciA/ICdiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuMyk7JyA6ICcnKTtcbiAgICBjbG9zZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGlmICghaWdub3JlRm9jdXNPdXQpIHtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBjbGljayBjbG9zZXIgaWYgZXNjIGtleSBpcyBwcmVzc2VkXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGRvY3VtZW50RXNjTGlzdGVuZXIpO1xuXG4gICAgY29udGVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgY2xvc2VyLmFwcGVuZENoaWxkKGNvbnRlbnRFbGVtZW50KTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNsb3Nlcik7XG4gICAgaWYgKGVkaXRvcikge1xuICAgICAgICBlZGl0b3IuYmx1cigpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBjbG9zZTogY2xvc2UsXG4gICAgICAgIHNldElnbm9yZUZvY3VzT3V0OiBzZXRJZ25vcmVGb2N1c091dFxuICAgIH07XG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSBgI2FjZV9zZXR0aW5nc21lbnUsICNrYnNob3J0Y3V0bWVudSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI0Y3RjdGNztcbiAgICBjb2xvcjogYmxhY2s7XG4gICAgYm94LXNoYWRvdzogLTVweCA0cHggNXB4IHJnYmEoMTI2LCAxMjYsIDEyNiwgMC41NSk7XG4gICAgcGFkZGluZzogMWVtIDAuNWVtIDJlbSAxZW07XG4gICAgb3ZlcmZsb3c6IGF1dG87XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIG1hcmdpbjogMDtcbiAgICBib3R0b206IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgdG9wOiAwO1xuICAgIHotaW5kZXg6IDk5OTE7XG4gICAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4uYWNlX2RhcmsgI2FjZV9zZXR0aW5nc21lbnUsIC5hY2VfZGFyayAja2JzaG9ydGN1dG1lbnUge1xuICAgIGJveC1zaGFkb3c6IC0yMHB4IDEwcHggMjVweCByZ2JhKDEyNiwgMTI2LCAxMjYsIDAuMjUpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC42KTtcbiAgICBjb2xvcjogYmxhY2s7XG59XG5cbi5hY2Vfb3B0aW9uc01lbnVFbnRyeTpob3ZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxMDAsIDEwMCwgMTAwLCAwLjEpO1xuICAgIHRyYW5zaXRpb246IGFsbCAwLjNzXG59XG5cbi5hY2VfY2xvc2VCdXR0b24ge1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjQ1LCAxNDYsIDE0NiwgMC41KTtcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjRjQ4QThBO1xuICAgIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgICBwYWRkaW5nOiA3cHg7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAtOHB4O1xuICAgIHRvcDogLThweDtcbiAgICB6LWluZGV4OiAxMDAwMDA7XG59XG4uYWNlX2Nsb3NlQnV0dG9ue1xuICAgIGJhY2tncm91bmQ6IHJnYmEoMjQ1LCAxNDYsIDE0NiwgMC45KTtcbn1cbi5hY2Vfb3B0aW9uc01lbnVLZXkge1xuICAgIGNvbG9yOiBkYXJrc2xhdGVibHVlO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuLmFjZV9vcHRpb25zTWVudUNvbW1hbmQge1xuICAgIGNvbG9yOiBkYXJrY3lhbjtcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGlucHV0LCAuYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uIHtcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xufVxuXG4uYWNlX29wdGlvbnNNZW51RW50cnkgYnV0dG9uW2FjZV9zZWxlY3RlZF9idXR0b249dHJ1ZV0ge1xuICAgIGJhY2tncm91bmQ6ICNlN2U3ZTc7XG4gICAgYm94LXNoYWRvdzogMXB4IDBweCAycHggMHB4ICNhZGFkYWQgaW5zZXQ7XG4gICAgYm9yZGVyLWNvbG9yOiAjYWRhZGFkO1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvbiB7XG4gICAgYmFja2dyb3VuZDogd2hpdGU7XG4gICAgYm9yZGVyOiAxcHggc29saWQgbGlnaHRncmF5O1xuICAgIG1hcmdpbjogMHB4O1xufVxuLmFjZV9vcHRpb25zTWVudUVudHJ5IGJ1dHRvbjpob3ZlcntcbiAgICBiYWNrZ3JvdW5kOiAjZjBmMGYwO1xufWA7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1vZGVzID0gW107XG4vKipcbiAqIFN1Z2dlc3RzIGEgbW9kZSBiYXNlZCBvbiB0aGUgZmlsZSBleHRlbnNpb24gcHJlc2VudCBpbiB0aGUgZ2l2ZW4gcGF0aFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gdGhlIGZpbGVcbiAqIEByZXR1cm5zIHtvYmplY3R9IFJldHVybnMgYW4gb2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlXG4gKiAgc3VnZ2VzdGVkIG1vZGUuXG4gKi9cbmZ1bmN0aW9uIGdldE1vZGVGb3JQYXRoKHBhdGgpIHtcbiAgICB2YXIgbW9kZSA9IG1vZGVzQnlOYW1lLnRleHQ7XG4gICAgdmFyIGZpbGVOYW1lID0gcGF0aC5zcGxpdCgvW1xcL1xcXFxdLykucG9wKCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAobW9kZXNbaV0uc3VwcG9ydHNGaWxlKGZpbGVOYW1lKSkge1xuICAgICAgICAgICAgbW9kZSA9IG1vZGVzW2ldO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1vZGU7XG59XG5cbmNsYXNzIE1vZGUge1xuICAgIGNvbnN0cnVjdG9yKG5hbWUsIGNhcHRpb24sIGV4dGVuc2lvbnMpIHtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5jYXB0aW9uID0gY2FwdGlvbjtcbiAgICAgICAgdGhpcy5tb2RlID0gXCJhY2UvbW9kZS9cIiArIG5hbWU7XG4gICAgICAgIHRoaXMuZXh0ZW5zaW9ucyA9IGV4dGVuc2lvbnM7XG4gICAgICAgIHZhciByZTtcbiAgICAgICAgaWYgKC9cXF4vLnRlc3QoZXh0ZW5zaW9ucykpIHtcbiAgICAgICAgICAgIHJlID0gZXh0ZW5zaW9ucy5yZXBsYWNlKC9cXHwoXFxeKT8vZywgZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCIkfFwiICsgKGIgPyBcIl5cIiA6IFwiXi4qXFxcXC5cIik7XG4gICAgICAgICAgICB9KSArIFwiJFwiO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmUgPSBcIl4uKlxcXFwuKFwiICsgZXh0ZW5zaW9ucyArIFwiKSRcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZXh0UmUgPSBuZXcgUmVnRXhwKHJlLCBcImdpXCIpO1xuICAgIH1cblxuICAgIHN1cHBvcnRzRmlsZShmaWxlbmFtZSkge1xuICAgICAgICByZXR1cm4gZmlsZW5hbWUubWF0Y2godGhpcy5leHRSZSk7XG4gICAgfVxufVxuXG4vLyB0b2RvIGZpcnN0bGluZW1hdGNoXG52YXIgc3VwcG9ydGVkTW9kZXMgPSB7XG4gICAgQUJBUDogICAgICAgIFtcImFiYXBcIl0sXG4gICAgQUJDOiAgICAgICAgIFtcImFiY1wiXSxcbiAgICBBY3Rpb25TY3JpcHQ6W1wiYXNcIl0sXG4gICAgQURBOiAgICAgICAgIFtcImFkYXxhZGJcIl0sXG4gICAgQWxkYTogICAgICAgIFtcImFsZGFcIl0sXG4gICAgQXBhY2hlX0NvbmY6IFtcIl5odGFjY2Vzc3xeaHRncm91cHN8Xmh0cGFzc3dkfF5jb25mfGh0YWNjZXNzfGh0Z3JvdXBzfGh0cGFzc3dkXCJdLFxuICAgIEFwZXg6ICAgICAgICBbXCJhcGV4fGNsc3x0cmlnZ2VyfHRnclwiXSxcbiAgICBBUUw6ICAgICAgICAgW1wiYXFsXCJdLFxuICAgIEFzY2lpRG9jOiAgICBbXCJhc2NpaWRvY3xhZG9jXCJdLFxuICAgIEFTTDogICAgICAgICBbXCJkc2x8YXNsfGFzbC5qc29uXCJdLFxuICAgIEFzc2VtYmx5X3g4NjpbXCJhc218YVwiXSxcbiAgICBBdXRvSG90S2V5OiAgW1wiYWhrXCJdLFxuICAgIEJhdGNoRmlsZTogICBbXCJiYXR8Y21kXCJdLFxuICAgIEJpYlRlWDogICAgICBbXCJiaWJcIl0sXG4gICAgQ19DcHA6ICAgICAgIFtcImNwcHxjfGNjfGN4eHxofGhofGhwcHxpbm9cIl0sXG4gICAgQzlTZWFyY2g6ICAgIFtcImM5c2VhcmNoX3Jlc3VsdHNcIl0sXG4gICAgQ2lycnU6ICAgICAgIFtcImNpcnJ1fGNyXCJdLFxuICAgIENsb2p1cmU6ICAgICBbXCJjbGp8Y2xqc1wiXSxcbiAgICBDb2JvbDogICAgICAgW1wiQ0JMfENPQlwiXSxcbiAgICBjb2ZmZWU6ICAgICAgW1wiY29mZmVlfGNmfGNzb258XkNha2VmaWxlXCJdLFxuICAgIENvbGRGdXNpb246ICBbXCJjZm18Y2ZjXCJdLFxuICAgIENyeXN0YWw6ICAgICBbXCJjclwiXSxcbiAgICBDU2hhcnA6ICAgICAgW1wiY3NcIl0sXG4gICAgQ3NvdW5kX0RvY3VtZW50OiBbXCJjc2RcIl0sXG4gICAgQ3NvdW5kX09yY2hlc3RyYTogW1wib3JjXCJdLFxuICAgIENzb3VuZF9TY29yZTogW1wic2NvXCJdLFxuICAgIENTUzogICAgICAgICBbXCJjc3NcIl0sXG4gICAgQ3VybHk6ICAgICAgIFtcImN1cmx5XCJdLFxuICAgIEQ6ICAgICAgICAgICBbXCJkfGRpXCJdLFxuICAgIERhcnQ6ICAgICAgICBbXCJkYXJ0XCJdLFxuICAgIERpZmY6ICAgICAgICBbXCJkaWZmfHBhdGNoXCJdLFxuICAgIERvY2tlcmZpbGU6ICBbXCJeRG9ja2VyZmlsZVwiXSxcbiAgICBEb3Q6ICAgICAgICAgW1wiZG90XCJdLFxuICAgIERyb29sczogICAgICBbXCJkcmxcIl0sXG4gICAgRWRpZmFjdDogICAgIFtcImVkaVwiXSxcbiAgICBFaWZmZWw6ICAgICAgW1wiZXxnZVwiXSxcbiAgICBFSlM6ICAgICAgICAgW1wiZWpzXCJdLFxuICAgIEVsaXhpcjogICAgICBbXCJleHxleHNcIl0sXG4gICAgRWxtOiAgICAgICAgIFtcImVsbVwiXSxcbiAgICBFcmxhbmc6ICAgICAgW1wiZXJsfGhybFwiXSxcbiAgICBGb3J0aDogICAgICAgW1wiZnJ0fGZzfGxkcnxmdGh8NHRoXCJdLFxuICAgIEZvcnRyYW46ICAgICBbXCJmfGY5MFwiXSxcbiAgICBGU2hhcnA6ICAgICAgW1wiZnNpfGZzfG1sfG1saXxmc3h8ZnNzY3JpcHRcIl0sXG4gICAgRlNMOiAgICAgICAgIFtcImZzbFwiXSxcbiAgICBGVEw6ICAgICAgICAgW1wiZnRsXCJdLFxuICAgIEdjb2RlOiAgICAgICBbXCJnY29kZVwiXSxcbiAgICBHaGVya2luOiAgICAgW1wiZmVhdHVyZVwiXSxcbiAgICBHaXRpZ25vcmU6ICAgW1wiXi5naXRpZ25vcmVcIl0sXG4gICAgR2xzbDogICAgICAgIFtcImdsc2x8ZnJhZ3x2ZXJ0XCJdLFxuICAgIEdvYnN0b25lczogICBbXCJnYnNcIl0sXG4gICAgZ29sYW5nOiAgICAgIFtcImdvXCJdLFxuICAgIEdyYXBoUUxTY2hlbWE6IFtcImdxbFwiXSxcbiAgICBHcm9vdnk6ICAgICAgW1wiZ3Jvb3Z5XCJdLFxuICAgIEhBTUw6ICAgICAgICBbXCJoYW1sXCJdLFxuICAgIEhhbmRsZWJhcnM6ICBbXCJoYnN8aGFuZGxlYmFyc3x0cGx8bXVzdGFjaGVcIl0sXG4gICAgSGFza2VsbDogICAgIFtcImhzXCJdLFxuICAgIEhhc2tlbGxfQ2FiYWw6IFtcImNhYmFsXCJdLFxuICAgIGhhWGU6ICAgICAgICBbXCJoeFwiXSxcbiAgICBIanNvbjogICAgICAgW1wiaGpzb25cIl0sXG4gICAgSFRNTDogICAgICAgIFtcImh0bWx8aHRtfHhodG1sfHZ1ZXx3ZXx3cHlcIl0sXG4gICAgSFRNTF9FbGl4aXI6IFtcImVleHxodG1sLmVleFwiXSxcbiAgICBIVE1MX1J1Ynk6ICAgW1wiZXJifHJodG1sfGh0bWwuZXJiXCJdLFxuICAgIElOSTogICAgICAgICBbXCJpbml8Y29uZnxjZmd8cHJlZnNcIl0sXG4gICAgSW86ICAgICAgICAgIFtcImlvXCJdLFxuICAgIElvbjogICAgICAgICBbXCJpb25cIl0sXG4gICAgSmFjazogICAgICAgIFtcImphY2tcIl0sXG4gICAgSmFkZTogICAgICAgIFtcImphZGV8cHVnXCJdLFxuICAgIEphdmE6ICAgICAgICBbXCJqYXZhXCJdLFxuICAgIEphdmFTY3JpcHQ6ICBbXCJqc3xqc218anN4fGNqc3xtanNcIl0sXG4gICAgSkVYTDogICAgICAgIFtcImpleGxcIl0sXG4gICAgSlNPTjogICAgICAgIFtcImpzb25cIl0sXG4gICAgSlNPTjU6ICAgICAgIFtcImpzb241XCJdLFxuICAgIEpTT05pcTogICAgICBbXCJqcVwiXSxcbiAgICBKU1A6ICAgICAgICAgW1wianNwXCJdLFxuICAgIEpTU006ICAgICAgICBbXCJqc3NtfGpzc21fc3RhdGVcIl0sXG4gICAgSlNYOiAgICAgICAgIFtcImpzeFwiXSxcbiAgICBKdWxpYTogICAgICAgW1wiamxcIl0sXG4gICAgS290bGluOiAgICAgIFtcImt0fGt0c1wiXSxcbiAgICBMYVRlWDogICAgICAgW1widGV4fGxhdGV4fGx0eHxiaWJcIl0sXG4gICAgTGF0dGU6ICAgICAgIFtcImxhdHRlXCJdLFxuICAgIExFU1M6ICAgICAgICBbXCJsZXNzXCJdLFxuICAgIExpcXVpZDogICAgICBbXCJsaXF1aWRcIl0sXG4gICAgTGlzcDogICAgICAgIFtcImxpc3BcIl0sXG4gICAgTGl2ZVNjcmlwdDogIFtcImxzXCJdLFxuICAgIExvZzogICAgICAgICBbXCJsb2dcIl0sXG4gICAgTG9naVFMOiAgICAgIFtcImxvZ2ljfGxxbFwiXSxcbiAgICBMb2d0YWxrOiAgICAgW1wibGd0XCJdLFxuICAgIExTTDogICAgICAgICBbXCJsc2xcIl0sXG4gICAgTHVhOiAgICAgICAgIFtcImx1YVwiXSxcbiAgICBMdWFQYWdlOiAgICAgW1wibHBcIl0sXG4gICAgTHVjZW5lOiAgICAgIFtcImx1Y2VuZVwiXSxcbiAgICBNYWtlZmlsZTogICAgW1wiXk1ha2VmaWxlfF5HTlVtYWtlZmlsZXxebWFrZWZpbGV8Xk9DYW1sTWFrZWZpbGV8bWFrZVwiXSxcbiAgICBNYXJrZG93bjogICAgW1wibWR8bWFya2Rvd25cIl0sXG4gICAgTWFzazogICAgICAgIFtcIm1hc2tcIl0sXG4gICAgTUFUTEFCOiAgICAgIFtcIm1hdGxhYlwiXSxcbiAgICBNYXplOiAgICAgICAgW1wibXpcIl0sXG4gICAgTWVkaWFXaWtpOiAgIFtcIndpa2l8bWVkaWF3aWtpXCJdLFxuICAgIE1FTDogICAgICAgICBbXCJtZWxcIl0sXG4gICAgTUlQUzogICAgICAgIFtcInN8YXNtXCJdLFxuICAgIE1JWEFMOiAgICAgICBbXCJtaXhhbFwiXSxcbiAgICBNVVNIQ29kZTogICAgW1wibWN8bXVzaFwiXSxcbiAgICBNeVNRTDogICAgICAgW1wibXlzcWxcIl0sXG4gICAgTmdpbng6ICAgICAgIFtcIm5naW54fGNvbmZcIl0sXG4gICAgTmltOiAgICAgICAgIFtcIm5pbVwiXSxcbiAgICBOaXg6ICAgICAgICAgW1wibml4XCJdLFxuICAgIE5TSVM6ICAgICAgICBbXCJuc2l8bnNoXCJdLFxuICAgIE51bmp1Y2tzOiAgICBbXCJudW5qdWNrc3xudW5qc3xuanxuamtcIl0sXG4gICAgT2JqZWN0aXZlQzogIFtcIm18bW1cIl0sXG4gICAgT0NhbWw6ICAgICAgIFtcIm1sfG1saVwiXSxcbiAgICBPZGluOiAgICAgICAgW1wib2RpblwiXSxcbiAgICBQYXJ0aVFMOiAgICAgW1wicGFydGlxbHxwcWxcIl0sXG4gICAgUGFzY2FsOiAgICAgIFtcInBhc3xwXCJdLFxuICAgIFBlcmw6ICAgICAgICBbXCJwbHxwbVwiXSxcbiAgICBwZ1NRTDogICAgICAgW1wicGdzcWxcIl0sXG4gICAgUEhQOiAgICAgICAgIFtcInBocHxpbmN8cGh0bWx8c2h0bWx8cGhwM3xwaHA0fHBocDV8cGhwc3xwaHB0fGF3fGN0cHxtb2R1bGVcIl0sXG4gICAgUEhQX0xhcmF2ZWxfYmxhZGU6IFtcImJsYWRlLnBocFwiXSxcbiAgICBQaWc6ICAgICAgICAgW1wicGlnXCJdLFxuICAgIFBMU1FMOiAgICAgICBbXCJwbHNxbFwiXSxcbiAgICBQb3dlcnNoZWxsOiAgW1wicHMxXCJdLFxuICAgIFByYWF0OiAgICAgICBbXCJwcmFhdHxwcmFhdHNjcmlwdHxwc2N8cHJvY1wiXSxcbiAgICBQcmlzbWE6ICAgICAgW1wicHJpc21hXCJdLFxuICAgIFByb2xvZzogICAgICBbXCJwbGd8cHJvbG9nXCJdLFxuICAgIFByb3BlcnRpZXM6ICBbXCJwcm9wZXJ0aWVzXCJdLFxuICAgIFByb3RvYnVmOiAgICBbXCJwcm90b1wiXSxcbiAgICBQdXBwZXQ6ICAgICAgW1wiZXBwfHBwXCJdLFxuICAgIFB5dGhvbjogICAgICBbXCJweVwiXSxcbiAgICBRTUw6ICAgICAgICAgW1wicW1sXCJdLFxuICAgIFI6ICAgICAgICAgICBbXCJyXCJdLFxuICAgIFJha3U6ICAgICAgICBbXCJyYWt1fHJha3Vtb2R8cmFrdXRlc3R8cDZ8cGw2fHBtNlwiXSxcbiAgICBSYXpvcjogICAgICAgW1wiY3NodG1sfGFzcFwiXSxcbiAgICBSRG9jOiAgICAgICAgW1wiUmRcIl0sXG4gICAgUmVkOiAgICAgICAgIFtcInJlZHxyZWRzXCJdLFxuICAgIFJIVE1MOiAgICAgICBbXCJSaHRtbFwiXSxcbiAgICBSb2JvdDogICAgICAgW1wicm9ib3R8cmVzb3VyY2VcIl0sXG4gICAgUlNUOiAgICAgICAgIFtcInJzdFwiXSxcbiAgICBSdWJ5OiAgICAgICAgW1wicmJ8cnV8Z2Vtc3BlY3xyYWtlfF5HdWFyZGZpbGV8XlJha2VmaWxlfF5HZW1maWxlXCJdLFxuICAgIFJ1c3Q6ICAgICAgICBbXCJyc1wiXSxcbiAgICBTYUM6ICAgICAgICAgW1wic2FjXCJdLFxuICAgIFNBU1M6ICAgICAgICBbXCJzYXNzXCJdLFxuICAgIFNDQUQ6ICAgICAgICBbXCJzY2FkXCJdLFxuICAgIFNjYWxhOiAgICAgICBbXCJzY2FsYXxzYnRcIl0sXG4gICAgU2NoZW1lOiAgICAgIFtcInNjbXxzbXxya3R8b2FrfHNjaGVtZVwiXSxcbiAgICBTY3J5cHQ6ICAgICAgW1wic2NyeXB0XCJdLFxuICAgIFNDU1M6ICAgICAgICBbXCJzY3NzXCJdLFxuICAgIFNIOiAgICAgICAgICBbXCJzaHxiYXNofF4uYmFzaHJjXCJdLFxuICAgIFNKUzogICAgICAgICBbXCJzanNcIl0sXG4gICAgU2xpbTogICAgICAgIFtcInNsaW18c2tpbVwiXSxcbiAgICBTbWFydHk6ICAgICAgW1wic21hcnR5fHRwbFwiXSxcbiAgICBTbWl0aHk6ICAgICAgW1wic21pdGh5XCJdLFxuICAgIHNuaXBwZXRzOiAgICBbXCJzbmlwcGV0c1wiXSxcbiAgICBTb3lfVGVtcGxhdGU6W1wic295XCJdLFxuICAgIFNwYWNlOiAgICAgICBbXCJzcGFjZVwiXSxcbiAgICBTUEFSUUw6ICAgICAgW1wicnFcIl0sXG4gICAgU1FMOiAgICAgICAgIFtcInNxbFwiXSxcbiAgICBTUUxTZXJ2ZXI6ICAgW1wic3Fsc2VydmVyXCJdLFxuICAgIFN0eWx1czogICAgICBbXCJzdHlsfHN0eWx1c1wiXSxcbiAgICBTVkc6ICAgICAgICAgW1wic3ZnXCJdLFxuICAgIFN3aWZ0OiAgICAgICBbXCJzd2lmdFwiXSxcbiAgICBUY2w6ICAgICAgICAgW1widGNsXCJdLFxuICAgIFRlcnJhZm9ybTogICBbXCJ0ZlwiLCBcInRmdmFyc1wiLCBcInRlcnJhZ3J1bnRcIl0sXG4gICAgVGV4OiAgICAgICAgIFtcInRleFwiXSxcbiAgICBUZXh0OiAgICAgICAgW1widHh0XCJdLFxuICAgIFRleHRpbGU6ICAgICBbXCJ0ZXh0aWxlXCJdLFxuICAgIFRvbWw6ICAgICAgICBbXCJ0b21sXCJdLFxuICAgIFRTWDogICAgICAgICBbXCJ0c3hcIl0sXG4gICAgVHVydGxlOiAgICAgIFtcInR0bFwiXSxcbiAgICBUd2lnOiAgICAgICAgW1widHdpZ3xzd2lnXCJdLFxuICAgIFR5cGVzY3JpcHQ6ICBbXCJ0c3x0eXBlc2NyaXB0fHN0clwiXSxcbiAgICBWYWxhOiAgICAgICAgW1widmFsYVwiXSxcbiAgICBWQlNjcmlwdDogICAgW1widmJzfHZiXCJdLFxuICAgIFZlbG9jaXR5OiAgICBbXCJ2bVwiXSxcbiAgICBWZXJpbG9nOiAgICAgW1widnx2aHxzdnxzdmhcIl0sXG4gICAgVkhETDogICAgICAgIFtcInZoZHx2aGRsXCJdLFxuICAgIFZpc3VhbGZvcmNlOiBbXCJ2ZnB8Y29tcG9uZW50fHBhZ2VcIl0sXG4gICAgV29sbG9rOiAgICAgIFtcIndsa3x3cGdtfHd0ZXN0XCJdLFxuICAgIFhNTDogICAgICAgICBbXCJ4bWx8cmRmfHJzc3x3c2RsfHhzbHR8YXRvbXxtYXRobWx8bW1sfHh1bHx4Ymx8eGFtbFwiXSxcbiAgICBYUXVlcnk6ICAgICAgW1wieHFcIl0sXG4gICAgWUFNTDogICAgICAgIFtcInlhbWx8eW1sXCJdLFxuICAgIFplZWs6ICAgICAgICBbXCJ6ZWVrfGJyb1wiXSxcbiAgICAvLyBBZGQgdGhlIG1pc3NpbmcgbW9kZSBcIkRqYW5nb1wiIHRvIGV4dC1tb2RlbGlzdFxuICAgIERqYW5nbzogICAgICBbXCJodG1sXCJdXG59O1xuXG52YXIgbmFtZU92ZXJyaWRlcyA9IHtcbiAgICBPYmplY3RpdmVDOiBcIk9iamVjdGl2ZS1DXCIsXG4gICAgQ1NoYXJwOiBcIkMjXCIsXG4gICAgZ29sYW5nOiBcIkdvXCIsXG4gICAgQ19DcHA6IFwiQyBhbmQgQysrXCIsXG4gICAgQ3NvdW5kX0RvY3VtZW50OiBcIkNzb3VuZCBEb2N1bWVudFwiLFxuICAgIENzb3VuZF9PcmNoZXN0cmE6IFwiQ3NvdW5kXCIsXG4gICAgQ3NvdW5kX1Njb3JlOiBcIkNzb3VuZCBTY29yZVwiLFxuICAgIGNvZmZlZTogXCJDb2ZmZWVTY3JpcHRcIixcbiAgICBIVE1MX1J1Ynk6IFwiSFRNTCAoUnVieSlcIixcbiAgICBIVE1MX0VsaXhpcjogXCJIVE1MIChFbGl4aXIpXCIsXG4gICAgRlRMOiBcIkZyZWVNYXJrZXJcIixcbiAgICBQSFBfTGFyYXZlbF9ibGFkZTogXCJQSFAgKEJsYWRlIFRlbXBsYXRlKVwiLFxuICAgIFBlcmw2OiBcIlBlcmwgNlwiLFxuICAgIEF1dG9Ib3RLZXk6IFwiQXV0b0hvdGtleSAvIEF1dG9JdFwiXG59O1xuXG52YXIgbW9kZXNCeU5hbWUgPSB7fTtcbmZvciAodmFyIG5hbWUgaW4gc3VwcG9ydGVkTW9kZXMpIHtcbiAgICB2YXIgZGF0YSA9IHN1cHBvcnRlZE1vZGVzW25hbWVdO1xuICAgIHZhciBkaXNwbGF5TmFtZSA9IChuYW1lT3ZlcnJpZGVzW25hbWVdIHx8IG5hbWUpLnJlcGxhY2UoL18vZywgXCIgXCIpO1xuICAgIHZhciBmaWxlbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgbW9kZSA9IG5ldyBNb2RlKGZpbGVuYW1lLCBkaXNwbGF5TmFtZSwgZGF0YVswXSk7XG4gICAgbW9kZXNCeU5hbWVbZmlsZW5hbWVdID0gbW9kZTtcbiAgICBtb2Rlcy5wdXNoKG1vZGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRNb2RlRm9yUGF0aDogZ2V0TW9kZUZvclBhdGgsXG4gICAgbW9kZXM6IG1vZGVzLFxuICAgIG1vZGVzQnlOYW1lOiBtb2Rlc0J5TmFtZVxufTtcbiIsIi8qKlxuICogUHJvbXB0IHBsdWdpbiBpcyB1c2VkIGZvciBnZXR0aW5nIGlucHV0IGZyb20gdXNlci5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZWRpdG9yICAgICAgICAgICAgICAgICAgIE91c2lkZSBlZGl0b3IgcmVsYXRlZCB0byB0aGlzIHByb21wdC4gV2lsbCBiZSBibHVycmVkIHdoZW4gcHJvbXB0IGlzIG9wZW4uIFxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgICAgICAgICAgICAgICAgICBQcmVkZWZpbmVkIHZhbHVlIG9mIHByb21wdCBpbnB1dCBib3guXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAgICAgICAgICAgICAgICAgIEN1c29taXphYmxlIG9wdGlvbnMgZm9yIHRoaXMgcHJvbXB0LiBcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLm5hbWUgICAgICAgICAgICAgUHJvbXB0IG5hbWUuXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy4kdHlwZSAgICAgICAgICAgIFVzZSBwcm9tcHQgb2Ygc3BlY2lmaWMgdHlwZSAoZ290b0xpbmV8Y29tbWFuZHN8bW9kZXMgb3IgZGVmYXVsdCBpZiBlbXB0eSkuXG4gKiBAcGFyYW0ge1tzdGFydCwgZW5kXX0gb3B0aW9ucy5zZWxlY3Rpb24gIERlZmluZXMgd2hpY2ggcGFydCBvZiB0aGUgcHJlZGVmaW5lZCB2YWx1ZSBzaG91bGQgYmUgaGlnaGxpdGVkLlxuICogQHBhcmFtIHtCb29sZWFufSBvcHRpb25zLmhhc0Rlc2NyaXB0aW9uICBTZXQgdG8gdHJ1ZSBpZiBwcm9tcHQgaGFzIGRlc2NyaXB0aW9uIGJlbG93IGlucHV0IGJveC5cbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLnByb21wdCAgICAgICAgICAgRGVzY3JpcHRpb24gYmVsb3cgaW5wdXQgYm94LlxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMucGxhY2Vob2xkZXIgICAgICBQbGFjZWhvbGRlciBmb3IgdmFsdWUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy4kcnVsZXMgICAgICAgICAgIFNwZWNpZmljIHJ1bGVzIGZvciBpbnB1dCBsaWtlIHBhc3N3b3JkIG9yIHJlZ2V4cC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb3B0aW9ucy5pZ25vcmVGb2N1c091dCAgU2V0IHRvIHRydWUgdG8ga2VlcCB0aGUgcHJvbXB0IG9wZW4gd2hlbiBmb2N1cyBtb3ZlcyB0byBhbm90aGVyIHBhcnQgb2YgdGhlIGVkaXRvci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMuZ2V0Q29tcGxldGlvbnMgRnVuY3Rpb24gZm9yIGRlZmluaW5nIGxpc3Qgb2Ygb3B0aW9ucyBmb3IgdmFsdWUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLmdldFByZWZpeCAgICAgIEZ1bmN0aW9uIGZvciBkZWZpbmluZyBjdXJyZW50IHZhbHVlIHByZWZpeC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMub25BY2NlcHQgICAgICAgRnVuY3Rpb24gY2FsbGVkIHdoZW4gRW50ZXIgaXMgcHJlc3NlZC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMub25JbnB1dCAgICAgICAgRnVuY3Rpb24gY2FsbGVkIHdoZW4gaW5wdXQgaXMgYWRkZWQgdG8gcHJvbXB0IGlucHV0IGJveC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMub25DYW5jZWwgICAgICAgRnVuY3Rpb24gY2FsbGVkIHdoZW4gRXNjfFNoaWZ0LUVzYyBpcyBwcmVzc2VkLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgICAgICAgICAgICAgICBGdW5jdGlvbiBjYWxsZWQgYWZ0ZXIgZG9uZS5cbiAqICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgbmxzID0gcmVxdWlyZShcIi4uL2NvbmZpZ1wiKS5ubHM7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgZG9tID0gcmVxdWlyZShcIi4uL2xpYi9kb21cIik7XG52YXIgRmlsdGVyZWRMaXN0PSByZXF1aXJlKFwiLi4vYXV0b2NvbXBsZXRlXCIpLkZpbHRlcmVkTGlzdDtcbnZhciBBY2VQb3B1cCA9IHJlcXVpcmUoJy4uL2F1dG9jb21wbGV0ZS9wb3B1cCcpLkFjZVBvcHVwO1xudmFyICRzaW5nbGVMaW5lRWRpdG9yID0gcmVxdWlyZSgnLi4vYXV0b2NvbXBsZXRlL3BvcHVwJykuJHNpbmdsZUxpbmVFZGl0b3I7XG52YXIgVW5kb01hbmFnZXIgPSByZXF1aXJlKFwiLi4vdW5kb21hbmFnZXJcIikuVW5kb01hbmFnZXI7XG52YXIgVG9rZW5pemVyID0gcmVxdWlyZShcIi4uL3Rva2VuaXplclwiKS5Ub2tlbml6ZXI7XG52YXIgb3ZlcmxheVBhZ2UgPSByZXF1aXJlKFwiLi9tZW51X3Rvb2xzL292ZXJsYXlfcGFnZVwiKS5vdmVybGF5UGFnZTtcbnZhciBtb2RlbGlzdCA9IHJlcXVpcmUoXCIuL21vZGVsaXN0XCIpO1xudmFyIG9wZW5Qcm9tcHQ7XG5cbmZ1bmN0aW9uIHByb21wdChlZGl0b3IsIG1lc3NhZ2UsIG9wdGlvbnMsIGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiBtZXNzYWdlID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgcmV0dXJuIHByb21wdChlZGl0b3IsIFwiXCIsIG1lc3NhZ2UsIG9wdGlvbnMpO1xuICAgIH1cbiAgICBpZiAob3BlblByb21wdCkge1xuICAgICAgICB2YXIgbGFzdFByb21wdCA9IG9wZW5Qcm9tcHQ7XG4gICAgICAgIGVkaXRvciA9IGxhc3RQcm9tcHQuZWRpdG9yO1xuICAgICAgICBsYXN0UHJvbXB0LmNsb3NlKCk7XG4gICAgICAgIGlmIChsYXN0UHJvbXB0Lm5hbWUgJiYgbGFzdFByb21wdC5uYW1lID09IG9wdGlvbnMubmFtZSlcbiAgICAgICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuJHR5cGUpXG4gICAgICAgcmV0dXJuIHByb21wdFtvcHRpb25zLiR0eXBlXShlZGl0b3IsIGNhbGxiYWNrKTtcblxuICAgIHZhciBjbWRMaW5lID0gJHNpbmdsZUxpbmVFZGl0b3IoKTtcbiAgICBjbWRMaW5lLnNlc3Npb24uc2V0VW5kb01hbmFnZXIobmV3IFVuZG9NYW5hZ2VyKCkpO1xuXG4gICAgdmFyIGVsID0gZG9tLmJ1aWxkRG9tKFtcImRpdlwiLCB7Y2xhc3M6IFwiYWNlX3Byb21wdF9jb250YWluZXJcIiArIChvcHRpb25zLmhhc0Rlc2NyaXB0aW9uID8gXCIgaW5wdXQtYm94LXdpdGgtZGVzY3JpcHRpb25cIiA6IFwiXCIpfV0pO1xuICAgIHZhciBvdmVybGF5ID0gb3ZlcmxheVBhZ2UoZWRpdG9yLCBlbCwgZG9uZSk7XG4gICAgZWwuYXBwZW5kQ2hpbGQoY21kTGluZS5jb250YWluZXIpO1xuXG4gICAgaWYgKGVkaXRvcikge1xuICAgICAgICBlZGl0b3IuY21kTGluZSA9IGNtZExpbmU7XG4gICAgICAgIGNtZExpbmUuc2V0T3B0aW9uKFwiZm9udFNpemVcIiwgZWRpdG9yLmdldE9wdGlvbihcImZvbnRTaXplXCIpKTtcbiAgICB9XG4gICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgY21kTGluZS5zZXRWYWx1ZShtZXNzYWdlLCAxKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuc2VsZWN0aW9uKSB7XG4gICAgICAgIGNtZExpbmUuc2VsZWN0aW9uLnNldFJhbmdlKHtcbiAgICAgICAgICAgIHN0YXJ0OiBjbWRMaW5lLnNlc3Npb24uZG9jLmluZGV4VG9Qb3NpdGlvbihvcHRpb25zLnNlbGVjdGlvblswXSksXG4gICAgICAgICAgICBlbmQ6IGNtZExpbmUuc2Vzc2lvbi5kb2MuaW5kZXhUb1Bvc2l0aW9uKG9wdGlvbnMuc2VsZWN0aW9uWzFdKVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5nZXRDb21wbGV0aW9ucykge1xuICAgICAgICB2YXIgcG9wdXAgPSBuZXcgQWNlUG9wdXAoKTtcbiAgICAgICAgcG9wdXAucmVuZGVyZXIuc2V0U3R5bGUoXCJhY2VfYXV0b2NvbXBsZXRlX2lubGluZVwiKTtcbiAgICAgICAgcG9wdXAuY29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgIHBvcHVwLmNvbnRhaW5lci5zdHlsZS5tYXhXaWR0aCA9IFwiNjAwcHhcIjtcbiAgICAgICAgcG9wdXAuY29udGFpbmVyLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIHBvcHVwLmNvbnRhaW5lci5zdHlsZS5tYXJnaW5Ub3AgPSBcIjNweFwiO1xuICAgICAgICBwb3B1cC5yZW5kZXJlci5zZXRTY3JvbGxNYXJnaW4oMiwgMiwgMCwgMCk7XG4gICAgICAgIHBvcHVwLmF1dG9TZWxlY3QgPSBmYWxzZTtcbiAgICAgICAgcG9wdXAucmVuZGVyZXIuJG1heExpbmVzID0gMTU7XG4gICAgICAgIHBvcHVwLnNldFJvdygtMSk7XG4gICAgICAgIHBvcHVwLm9uKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBwb3B1cC5nZXREYXRhKHBvcHVwLmdldFJvdygpKTtcbiAgICAgICAgICAgIGlmICghZGF0YS5lcnJvcikge1xuICAgICAgICAgICAgICAgIGNtZExpbmUuc2V0VmFsdWUoZGF0YS52YWx1ZSB8fCBkYXRhLm5hbWUgfHwgZGF0YSk7XG4gICAgICAgICAgICAgICAgYWNjZXB0KCk7XG4gICAgICAgICAgICAgICAgZS5zdG9wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBlbC5hcHBlbmRDaGlsZChwb3B1cC5jb250YWluZXIpO1xuICAgICAgICB1cGRhdGVDb21wbGV0aW9ucygpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLiRydWxlcykge1xuICAgICAgICB2YXIgdG9rZW5pemVyID0gbmV3IFRva2VuaXplcihvcHRpb25zLiRydWxlcyk7XG4gICAgICAgIGNtZExpbmUuc2Vzc2lvbi5iZ1Rva2VuaXplci5zZXRUb2tlbml6ZXIodG9rZW5pemVyKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5wbGFjZWhvbGRlcikge1xuICAgICAgICBjbWRMaW5lLnNldE9wdGlvbihcInBsYWNlaG9sZGVyXCIsIG9wdGlvbnMucGxhY2Vob2xkZXIpO1xuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmhhc0Rlc2NyaXB0aW9uKSB7XG4gICAgICAgIHZhciBwcm9tcHRUZXh0Q29udGFpbmVyID0gZG9tLmJ1aWxkRG9tKFtcImRpdlwiLCB7Y2xhc3M6IFwiYWNlX3Byb21wdF90ZXh0X2NvbnRhaW5lclwifV0pO1xuICAgICAgICBkb20uYnVpbGREb20ob3B0aW9ucy5wcm9tcHQgfHwgXCJQcmVzcyAnRW50ZXInIHRvIGNvbmZpcm0gb3IgJ0VzY2FwZScgdG8gY2FuY2VsXCIsIHByb21wdFRleHRDb250YWluZXIpO1xuICAgICAgICBlbC5hcHBlbmRDaGlsZChwcm9tcHRUZXh0Q29udGFpbmVyKTtcbiAgICB9XG5cbiAgICBvdmVybGF5LnNldElnbm9yZUZvY3VzT3V0KG9wdGlvbnMuaWdub3JlRm9jdXNPdXQpO1xuXG4gICAgZnVuY3Rpb24gYWNjZXB0KCkge1xuICAgICAgICB2YXIgdmFsO1xuICAgICAgICBpZiAocG9wdXAgJiYgcG9wdXAuZ2V0Q3Vyc29yUG9zaXRpb24oKS5yb3cgPiAwKSB7XG4gICAgICAgICAgICB2YWwgPSB2YWx1ZUZyb21SZWNlbnRMaXN0KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YWwgPSBjbWRMaW5lLmdldFZhbHVlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGN1ckRhdGEgPSBwb3B1cCA/IHBvcHVwLmdldERhdGEocG9wdXAuZ2V0Um93KCkpIDogdmFsO1xuICAgICAgICBpZiAoY3VyRGF0YSAmJiAhY3VyRGF0YS5lcnJvcikge1xuICAgICAgICAgICAgZG9uZSgpO1xuICAgICAgICAgICAgb3B0aW9ucy5vbkFjY2VwdCAmJiBvcHRpb25zLm9uQWNjZXB0KHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsLFxuICAgICAgICAgICAgICAgIGl0ZW06IGN1ckRhdGFcbiAgICAgICAgICAgIH0sIGNtZExpbmUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSB7XG4gICAgICAgIFwiRW50ZXJcIjogYWNjZXB0LFxuICAgICAgICBcIkVzY3xTaGlmdC1Fc2NcIjogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBvcHRpb25zLm9uQ2FuY2VsICYmIG9wdGlvbnMub25DYW5jZWwoY21kTGluZS5nZXRWYWx1ZSgpLCBjbWRMaW5lKTtcbiAgICAgICAgICAgIGRvbmUoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBpZiAocG9wdXApIHtcbiAgICAgICAgT2JqZWN0LmFzc2lnbihrZXlzLCB7XG4gICAgICAgICAgICBcIlVwXCI6IGZ1bmN0aW9uKGVkaXRvcikgeyBwb3B1cC5nb1RvKFwidXBcIik7IHZhbHVlRnJvbVJlY2VudExpc3QoKTt9LFxuICAgICAgICAgICAgXCJEb3duXCI6IGZ1bmN0aW9uKGVkaXRvcikgeyBwb3B1cC5nb1RvKFwiZG93blwiKTsgdmFsdWVGcm9tUmVjZW50TGlzdCgpO30sXG4gICAgICAgICAgICBcIkN0cmwtVXB8Q3RybC1Ib21lXCI6IGZ1bmN0aW9uKGVkaXRvcikgeyBwb3B1cC5nb1RvKFwic3RhcnRcIik7IHZhbHVlRnJvbVJlY2VudExpc3QoKTt9LFxuICAgICAgICAgICAgXCJDdHJsLURvd258Q3RybC1FbmRcIjogZnVuY3Rpb24oZWRpdG9yKSB7IHBvcHVwLmdvVG8oXCJlbmRcIik7IHZhbHVlRnJvbVJlY2VudExpc3QoKTt9LFxuICAgICAgICAgICAgXCJUYWJcIjogZnVuY3Rpb24oZWRpdG9yKSB7XG4gICAgICAgICAgICAgICAgcG9wdXAuZ29UbyhcImRvd25cIik7IHZhbHVlRnJvbVJlY2VudExpc3QoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIlBhZ2VVcFwiOiBmdW5jdGlvbihlZGl0b3IpIHsgcG9wdXAuZ290b1BhZ2VVcCgpOyB2YWx1ZUZyb21SZWNlbnRMaXN0KCk7fSxcbiAgICAgICAgICAgIFwiUGFnZURvd25cIjogZnVuY3Rpb24oZWRpdG9yKSB7IHBvcHVwLmdvdG9QYWdlRG93bigpOyB2YWx1ZUZyb21SZWNlbnRMaXN0KCk7fVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjbWRMaW5lLmNvbW1hbmRzLmJpbmRLZXlzKGtleXMpO1xuXG4gICAgZnVuY3Rpb24gZG9uZSgpIHtcbiAgICAgICAgb3ZlcmxheS5jbG9zZSgpO1xuICAgICAgICBjYWxsYmFjayAmJiBjYWxsYmFjaygpO1xuICAgICAgICBvcGVuUHJvbXB0ID0gbnVsbDtcbiAgICB9XG5cbiAgICBjbWRMaW5lLm9uKFwiaW5wdXRcIiwgZnVuY3Rpb24oKSB7XG4gICAgICAgIG9wdGlvbnMub25JbnB1dCAmJiBvcHRpb25zLm9uSW5wdXQoKTtcbiAgICAgICAgdXBkYXRlQ29tcGxldGlvbnMoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUNvbXBsZXRpb25zKCkge1xuICAgICAgICBpZiAob3B0aW9ucy5nZXRDb21wbGV0aW9ucykge1xuICAgICAgICAgICAgdmFyIHByZWZpeDtcbiAgICAgICAgICAgIGlmIChvcHRpb25zLmdldFByZWZpeCkge1xuICAgICAgICAgICAgICAgIHByZWZpeCA9IG9wdGlvbnMuZ2V0UHJlZml4KGNtZExpbmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY29tcGxldGlvbnMgPSBvcHRpb25zLmdldENvbXBsZXRpb25zKGNtZExpbmUpO1xuICAgICAgICAgICAgcG9wdXAuc2V0RGF0YShjb21wbGV0aW9ucywgcHJlZml4KTtcbiAgICAgICAgICAgIHBvcHVwLnJlc2l6ZSh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZhbHVlRnJvbVJlY2VudExpc3QoKSB7XG4gICAgICAgIHZhciBjdXJyZW50ID0gcG9wdXAuZ2V0RGF0YShwb3B1cC5nZXRSb3coKSk7XG4gICAgICAgIGlmIChjdXJyZW50ICYmICFjdXJyZW50LmVycm9yKVxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnQudmFsdWUgfHwgY3VycmVudC5jYXB0aW9uIHx8IGN1cnJlbnQ7XG4gICAgfVxuXG4gICAgY21kTGluZS5yZXNpemUodHJ1ZSk7XG4gICAgaWYgKHBvcHVwKSB7XG4gICAgICAgIHBvcHVwLnJlc2l6ZSh0cnVlKTtcbiAgICB9XG4gICAgY21kTGluZS5mb2N1cygpO1xuXG4gICAgb3BlblByb21wdCA9IHtcbiAgICAgICAgY2xvc2U6IGRvbmUsXG4gICAgICAgIG5hbWU6IG9wdGlvbnMubmFtZSxcbiAgICAgICAgZWRpdG9yOiBlZGl0b3JcbiAgICB9O1xufVxuXG5wcm9tcHQuZ290b0xpbmUgPSBmdW5jdGlvbihlZGl0b3IsIGNhbGxiYWNrKSB7XG4gICAgZnVuY3Rpb24gc3RyaW5naWZ5U2VsZWN0aW9uKHNlbGVjdGlvbikge1xuICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoc2VsZWN0aW9uKSlcbiAgICAgICAgICAgIHNlbGVjdGlvbiA9IFtzZWxlY3Rpb25dO1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uLm1hcChmdW5jdGlvbihyKSB7XG4gICAgICAgICAgICB2YXIgY3Vyc29yID0gci5pc0JhY2t3YXJkcyA/IHIuc3RhcnQ6IHIuZW5kO1xuICAgICAgICAgICAgdmFyIGFuY2hvciA9IHIuaXNCYWNrd2FyZHMgPyByLmVuZDogci5zdGFydDtcbiAgICAgICAgICAgIHZhciByb3cgPSBhbmNob3Iucm93O1xuICAgICAgICAgICAgdmFyIHMgPSAocm93ICsgMSkgKyBcIjpcIiArIGFuY2hvci5jb2x1bW47XG5cbiAgICAgICAgICAgIGlmIChhbmNob3Iucm93ID09IGN1cnNvci5yb3cpIHtcbiAgICAgICAgICAgICAgICBpZiAoYW5jaG9yLmNvbHVtbiAhPSBjdXJzb3IuY29sdW1uKVxuICAgICAgICAgICAgICAgICAgICBzICs9IFwiPlwiICsgXCI6XCIgKyBjdXJzb3IuY29sdW1uO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzICs9IFwiPlwiICsgKGN1cnNvci5yb3cgKyAxKSArIFwiOlwiICsgY3Vyc29yLmNvbHVtbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzO1xuICAgICAgICB9KS5yZXZlcnNlKCkuam9pbihcIiwgXCIpO1xuICAgIH1cblxuICAgIHByb21wdChlZGl0b3IsIFwiOlwiICsgc3RyaW5naWZ5U2VsZWN0aW9uKGVkaXRvci5zZWxlY3Rpb24udG9KU09OKCkpLCB7XG4gICAgICAgIG5hbWU6IFwiZ290b0xpbmVcIixcbiAgICAgICAgc2VsZWN0aW9uOiBbMSwgTnVtYmVyLk1BWF9WQUxVRV0sXG4gICAgICAgIG9uQWNjZXB0OiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBkYXRhLnZhbHVlO1xuICAgICAgICAgICAgdmFyIF9oaXN0b3J5ID0gcHJvbXB0LmdvdG9MaW5lLl9oaXN0b3J5O1xuICAgICAgICAgICAgaWYgKCFfaGlzdG9yeSlcbiAgICAgICAgICAgICAgICBwcm9tcHQuZ290b0xpbmUuX2hpc3RvcnkgPSBfaGlzdG9yeSA9IFtdO1xuICAgICAgICAgICAgaWYgKF9oaXN0b3J5LmluZGV4T2YodmFsdWUpICE9IC0xKVxuICAgICAgICAgICAgICAgIF9oaXN0b3J5LnNwbGljZShfaGlzdG9yeS5pbmRleE9mKHZhbHVlKSwgMSk7XG4gICAgICAgICAgICBfaGlzdG9yeS51bnNoaWZ0KHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChfaGlzdG9yeS5sZW5ndGggPiAyMCkgX2hpc3RvcnkubGVuZ3RoID0gMjA7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHBvcyA9IGVkaXRvci5nZXRDdXJzb3JQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIHJhbmdlcyA9IFtdO1xuICAgICAgICAgICAgdmFsdWUucmVwbGFjZSgvXjovLCBcIlwiKS5zcGxpdCgvLC8pLm1hcChmdW5jdGlvbihzdHIpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGFydHMgPSBzdHIuc3BsaXQoLyhbPD46Ky1dfGM/XFxkKyl8W15jXFxkPD46Ky1dKy8pLmZpbHRlcihCb29sZWFuKTtcbiAgICAgICAgICAgICAgICB2YXIgaSA9IDA7XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gcmVhZFBvc2l0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IHBhcnRzW2krK107XG4gICAgICAgICAgICAgICAgICAgIGlmICghYykgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY1swXSA9PSBcImNcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoYy5zbGljZSgxKSkgfHwgMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBlZGl0b3Iuc2Vzc2lvbi5kb2MuaW5kZXhUb1Bvc2l0aW9uKGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgcm93ID0gcG9zLnJvdztcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbHVtbiA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGlmICgvXFxkLy50ZXN0KGMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3cgPSBwYXJzZUludChjKSAtIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gcGFydHNbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoYyA9PSBcIjpcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgYyA9IHBhcnRzW2krK107XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoL1xcZC8udGVzdChjKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbiA9IHBhcnNlSW50KGMpIHx8IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtyb3c6IHJvdywgY29sdW1uOiBjb2x1bW59O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwb3MgPSByZWFkUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB2YXIgcmFuZ2UgPSBSYW5nZS5mcm9tUG9pbnRzKHBvcywgcG9zKTtcbiAgICAgICAgICAgICAgICBpZiAocGFydHNbaV0gPT0gXCI+XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICByYW5nZS5lbmQgPSByZWFkUG9zaXRpb24oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAocGFydHNbaV0gPT0gXCI8XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgICAgICAgICByYW5nZS5zdGFydCA9IHJlYWRQb3NpdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByYW5nZXMudW5zaGlmdChyYW5nZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uZnJvbUpTT04ocmFuZ2VzKTtcbiAgICAgICAgICAgIHZhciBzY3JvbGxUb3AgPSBlZGl0b3IucmVuZGVyZXIuc2Nyb2xsVG9wO1xuICAgICAgICAgICAgZWRpdG9yLnJlbmRlcmVyLnNjcm9sbFNlbGVjdGlvbkludG9WaWV3KFxuICAgICAgICAgICAgICAgIGVkaXRvci5zZWxlY3Rpb24uYW5jaG9yLCBcbiAgICAgICAgICAgICAgICBlZGl0b3Iuc2VsZWN0aW9uLmN1cnNvciwgXG4gICAgICAgICAgICAgICAgMC41XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZWRpdG9yLnJlbmRlcmVyLmFuaW1hdGVTY3JvbGxpbmcoc2Nyb2xsVG9wKTtcbiAgICAgICAgfSxcbiAgICAgICAgaGlzdG9yeTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoIXByb21wdC5nb3RvTGluZS5faGlzdG9yeSlcbiAgICAgICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgICAgICByZXR1cm4gcHJvbXB0LmdvdG9MaW5lLl9oaXN0b3J5O1xuXG4gICAgICAgIH0sXG4gICAgICAgIGdldENvbXBsZXRpb25zOiBmdW5jdGlvbihjbWRMaW5lKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBjbWRMaW5lLmdldFZhbHVlKCk7XG4gICAgICAgICAgICB2YXIgbSA9IHZhbHVlLnJlcGxhY2UoL146LywgXCJcIikuc3BsaXQoXCI6XCIpO1xuICAgICAgICAgICAgdmFyIHJvdyA9IE1hdGgubWluKHBhcnNlSW50KG1bMF0pIHx8IDEsIGVkaXRvci5zZXNzaW9uLmdldExlbmd0aCgpKSAtIDE7XG4gICAgICAgICAgICB2YXIgbGluZSA9IGVkaXRvci5zZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBjdXJyZW50ID0gdmFsdWUgKyBcIiAgXCIgKyBsaW5lO1xuICAgICAgICAgICAgcmV0dXJuIFtjdXJyZW50XS5jb25jYXQodGhpcy5oaXN0b3J5KCkpO1xuICAgICAgICB9LFxuICAgICAgICAkcnVsZXM6IHtcbiAgICAgICAgICAgIHN0YXJ0OiBbe1xuICAgICAgICAgICAgICAgIHJlZ2V4OiAvXFxkKy8sXG4gICAgICAgICAgICAgICAgdG9rZW46IFwic3RyaW5nXCJcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICByZWdleDogL1s6LD48K1xcLWNdLyxcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJrZXl3b3JkXCJcbiAgICAgICAgICAgIH1dXG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbnByb21wdC5jb21tYW5kcyA9IGZ1bmN0aW9uKGVkaXRvciwgY2FsbGJhY2spIHtcbiAgICBmdW5jdGlvbiBub3JtYWxpemVOYW1lKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIChuYW1lIHx8IFwiXCIpLnJlcGxhY2UoL14uLywgZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgcmV0dXJuIHgudG9VcHBlckNhc2UoeCk7XG4gICAgICAgIH0pLnJlcGxhY2UoL1thLXpdW0EtWl0vZywgZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgcmV0dXJuIHhbMF0gKyBcIiBcIiArIHhbMV0udG9Mb3dlckNhc2UoeCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBmdW5jdGlvbiBnZXRFZGl0b3JDb21tYW5kc0J5TmFtZShleGNsdWRlQ29tbWFuZHMpIHtcbiAgICAgICAgdmFyIGNvbW1hbmRzQnlOYW1lID0gW107XG4gICAgICAgIHZhciBjb21tYW5kTWFwID0ge307XG4gICAgICAgIGVkaXRvci5rZXlCaW5kaW5nLiRoYW5kbGVycy5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHZhciBwbGF0Zm9ybSA9IGhhbmRsZXIucGxhdGZvcm07XG4gICAgICAgICAgICB2YXIgY2JuID0gaGFuZGxlci5ieU5hbWU7XG4gICAgICAgICAgICBmb3IgKHZhciBpIGluIGNibikge1xuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBjYm5baV0uYmluZEtleTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGtleSAhPT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICBrZXkgPSBrZXkgJiYga2V5W3BsYXRmb3JtXSB8fCBcIlwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgY29tbWFuZHMgPSBjYm5baV07XG4gICAgICAgICAgICAgICAgdmFyIGRlc2NyaXB0aW9uID0gY29tbWFuZHMuZGVzY3JpcHRpb24gfHwgbm9ybWFsaXplTmFtZShjb21tYW5kcy5uYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoIUFycmF5LmlzQXJyYXkoY29tbWFuZHMpKVxuICAgICAgICAgICAgICAgICAgICBjb21tYW5kcyA9IFtjb21tYW5kc107XG4gICAgICAgICAgICAgICAgY29tbWFuZHMuZm9yRWFjaChmdW5jdGlvbihjb21tYW5kKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgY29tbWFuZCAhPSBcInN0cmluZ1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZCA9IGNvbW1hbmQubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5lZWRsZSA9IGV4Y2x1ZGVDb21tYW5kcy5maW5kKGZ1bmN0aW9uKGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZWwgPT09IGNvbW1hbmQ7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIW5lZWRsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbW1hbmRNYXBbY29tbWFuZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kTWFwW2NvbW1hbmRdLmtleSArPSBcInxcIiArIGtleTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZE1hcFtjb21tYW5kXSA9IHtrZXk6IGtleSwgY29tbWFuZDogY29tbWFuZCwgZGVzY3JpcHRpb246IGRlc2NyaXB0aW9ufTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kc0J5TmFtZS5wdXNoKGNvbW1hbmRNYXBbY29tbWFuZF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY29tbWFuZHNCeU5hbWU7XG4gICAgfVxuICAgIC8vIGV4Y2x1ZGUgY29tbWFuZHMgdGhhdCBjYW4gbm90IGJlIGV4ZWN1dGVkIHdpdGhvdXQgYXJnc1xuICAgIHZhciBleGNsdWRlQ29tbWFuZHNMaXN0ID0gW1wiaW5zZXJ0c3RyaW5nXCIsIFwiaW5zZXJ0dGV4dFwiLCBcInNldEluZGVudGF0aW9uXCIsIFwicGFzdGVcIl07XG4gICAgdmFyIHNob3J0Y3V0c0FycmF5ID0gZ2V0RWRpdG9yQ29tbWFuZHNCeU5hbWUoZXhjbHVkZUNvbW1hbmRzTGlzdCk7XG4gICAgc2hvcnRjdXRzQXJyYXkgPSBzaG9ydGN1dHNBcnJheS5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICByZXR1cm4ge3ZhbHVlOiBpdGVtLmRlc2NyaXB0aW9uLCBtZXRhOiBpdGVtLmtleSwgY29tbWFuZDogaXRlbS5jb21tYW5kfTtcbiAgICB9KTtcbiAgICBwcm9tcHQoZWRpdG9yLCBcIlwiLCAge1xuICAgICAgICBuYW1lOiBcImNvbW1hbmRzXCIsXG4gICAgICAgIHNlbGVjdGlvbjogWzAsIE51bWJlci5NQVhfVkFMVUVdLFxuICAgICAgICBtYXhIaXN0b3J5Q291bnQ6IDUsXG4gICAgICAgIG9uQWNjZXB0OiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5pdGVtKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbW1hbmROYW1lID0gZGF0YS5pdGVtLmNvbW1hbmQ7XG4gICAgICAgICAgICAgICAgdGhpcy5hZGRUb0hpc3RvcnkoZGF0YS5pdGVtKTtcblxuICAgICAgICAgICAgICAgIGVkaXRvci5leGVjQ29tbWFuZChjb21tYW5kTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGFkZFRvSGlzdG9yeTogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgdmFyIGhpc3RvcnkgPSB0aGlzLmhpc3RvcnkoKTtcbiAgICAgICAgICAgIGhpc3RvcnkudW5zaGlmdChpdGVtKTtcbiAgICAgICAgICAgIGRlbGV0ZSBpdGVtLm1lc3NhZ2U7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGhpc3RvcnkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoaGlzdG9yeVtpXVtcImNvbW1hbmRcIl0gPT0gaXRlbS5jb21tYW5kICkge1xuICAgICAgICAgICAgICAgICAgICBoaXN0b3J5LnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMubWF4SGlzdG9yeUNvdW50ID4gMCAmJiBoaXN0b3J5Lmxlbmd0aCA+IHRoaXMubWF4SGlzdG9yeUNvdW50KSB7XG4gICAgICAgICAgICAgICAgaGlzdG9yeS5zcGxpY2UoaGlzdG9yeS5sZW5ndGggLSAxLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb21wdC5jb21tYW5kcy5oaXN0b3J5ID0gaGlzdG9yeTtcbiAgICAgICAgfSxcbiAgICAgICAgaGlzdG9yeTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJvbXB0LmNvbW1hbmRzLmhpc3RvcnkgfHwgW107XG4gICAgICAgIH0sXG4gICAgICAgIGdldFByZWZpeDogZnVuY3Rpb24oY21kTGluZSkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRQb3MgPSBjbWRMaW5lLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgICAgICB2YXIgZmlsdGVyVmFsdWUgPSBjbWRMaW5lLmdldFZhbHVlKCk7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyVmFsdWUuc3Vic3RyaW5nKDAsIGN1cnJlbnRQb3MuY29sdW1uKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Q29tcGxldGlvbnM6IGZ1bmN0aW9uKGNtZExpbmUpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEZpbHRlcmVkQ29tcGxldGlvbnMoY29tbWFuZHMsIHByZWZpeCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHRDb21tYW5kcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoY29tbWFuZHMpKTtcblxuICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJlZCA9IG5ldyBGaWx0ZXJlZExpc3QocmVzdWx0Q29tbWFuZHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZC5maWx0ZXJDb21wbGV0aW9ucyhyZXN1bHRDb21tYW5kcywgcHJlZml4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0VW5pcXVlQ29tbWFuZExpc3QoY29tbWFuZHMsIHVzZWRDb21tYW5kcykge1xuICAgICAgICAgICAgICAgIGlmICghdXNlZENvbW1hbmRzIHx8ICF1c2VkQ29tbWFuZHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb21tYW5kcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGV4Y2x1ZGVDb21tYW5kcyA9IFtdO1xuICAgICAgICAgICAgICAgIHVzZWRDb21tYW5kcy5mb3JFYWNoKGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgZXhjbHVkZUNvbW1hbmRzLnB1c2goaXRlbS5jb21tYW5kKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHZhciByZXN1bHRDb21tYW5kcyA9IFtdO1xuXG4gICAgICAgICAgICAgICAgY29tbWFuZHMuZm9yRWFjaChmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChleGNsdWRlQ29tbWFuZHMuaW5kZXhPZihpdGVtLmNvbW1hbmQpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0Q29tbWFuZHMucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdENvbW1hbmRzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgcHJlZml4ID0gdGhpcy5nZXRQcmVmaXgoY21kTGluZSk7XG4gICAgICAgICAgICB2YXIgcmVjZW50bHlVc2VkQ29tbWFuZHMgPSBnZXRGaWx0ZXJlZENvbXBsZXRpb25zKHRoaXMuaGlzdG9yeSgpLCBwcmVmaXgpO1xuICAgICAgICAgICAgdmFyIG90aGVyQ29tbWFuZHMgPSBnZXRVbmlxdWVDb21tYW5kTGlzdChzaG9ydGN1dHNBcnJheSwgcmVjZW50bHlVc2VkQ29tbWFuZHMpO1xuICAgICAgICAgICAgb3RoZXJDb21tYW5kcyA9IGdldEZpbHRlcmVkQ29tcGxldGlvbnMob3RoZXJDb21tYW5kcywgcHJlZml4KTtcblxuICAgICAgICAgICAgaWYgKHJlY2VudGx5VXNlZENvbW1hbmRzLmxlbmd0aCAmJiBvdGhlckNvbW1hbmRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHJlY2VudGx5VXNlZENvbW1hbmRzWzBdLm1lc3NhZ2UgPSBubHMoXCJSZWNlbnRseSB1c2VkXCIpO1xuICAgICAgICAgICAgICAgIG90aGVyQ29tbWFuZHNbMF0ubWVzc2FnZSA9IG5scyhcIk90aGVyIGNvbW1hbmRzXCIpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgY29tcGxldGlvbnMgPSByZWNlbnRseVVzZWRDb21tYW5kcy5jb25jYXQob3RoZXJDb21tYW5kcyk7XG4gICAgICAgICAgICByZXR1cm4gY29tcGxldGlvbnMubGVuZ3RoID4gMCA/IGNvbXBsZXRpb25zIDogW3tcbiAgICAgICAgICAgICAgICB2YWx1ZTogbmxzKFwiTm8gbWF0Y2hpbmcgY29tbWFuZHNcIiksXG4gICAgICAgICAgICAgICAgZXJyb3I6IDFcbiAgICAgICAgICAgIH1dO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5wcm9tcHQubW9kZXMgPSBmdW5jdGlvbihlZGl0b3IsIGNhbGxiYWNrKSB7XG4gICAgdmFyIG1vZGVzQXJyYXkgPSBtb2RlbGlzdC5tb2RlcztcbiAgICBtb2Rlc0FycmF5ID0gbW9kZXNBcnJheS5tYXAoZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICByZXR1cm4ge3ZhbHVlOiBpdGVtLmNhcHRpb24sIG1vZGU6IGl0ZW0ubmFtZX07XG4gICAgfSk7XG4gICAgcHJvbXB0KGVkaXRvciwgXCJcIiwgIHtcbiAgICAgICAgbmFtZTogXCJtb2Rlc1wiLFxuICAgICAgICBzZWxlY3Rpb246IFswLCBOdW1iZXIuTUFYX1ZBTFVFXSxcbiAgICAgICAgb25BY2NlcHQ6IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLml0ZW0pIHtcbiAgICAgICAgICAgICAgICB2YXIgbW9kZU5hbWUgPSBcImFjZS9tb2RlL1wiICsgZGF0YS5pdGVtLm1vZGU7XG4gICAgICAgICAgICAgICAgZWRpdG9yLnNlc3Npb24uc2V0TW9kZShtb2RlTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGdldFByZWZpeDogZnVuY3Rpb24oY21kTGluZSkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRQb3MgPSBjbWRMaW5lLmdldEN1cnNvclBvc2l0aW9uKCk7XG4gICAgICAgICAgICB2YXIgZmlsdGVyVmFsdWUgPSBjbWRMaW5lLmdldFZhbHVlKCk7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyVmFsdWUuc3Vic3RyaW5nKDAsIGN1cnJlbnRQb3MuY29sdW1uKTtcbiAgICAgICAgfSxcbiAgICAgICAgZ2V0Q29tcGxldGlvbnM6IGZ1bmN0aW9uKGNtZExpbmUpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGdldEZpbHRlcmVkQ29tcGxldGlvbnMobW9kZXMsIHByZWZpeCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHRDb21tYW5kcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobW9kZXMpKTtcblxuICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJlZCA9IG5ldyBGaWx0ZXJlZExpc3QocmVzdWx0Q29tbWFuZHMpO1xuICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZC5maWx0ZXJDb21wbGV0aW9ucyhyZXN1bHRDb21tYW5kcywgcHJlZml4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIHByZWZpeCA9IHRoaXMuZ2V0UHJlZml4KGNtZExpbmUpO1xuICAgICAgICAgICAgdmFyIGNvbXBsZXRpb25zID0gZ2V0RmlsdGVyZWRDb21wbGV0aW9ucyhtb2Rlc0FycmF5LCBwcmVmaXgpO1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBsZXRpb25zLmxlbmd0aCA+IDAgPyBjb21wbGV0aW9ucyA6IFt7XG4gICAgICAgICAgICAgICAgXCJjYXB0aW9uXCI6IFwiTm8gbW9kZSBtYXRjaGluZ1wiLFxuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogXCJObyBtb2RlIG1hdGNoaW5nXCIsXG4gICAgICAgICAgICAgICAgXCJlcnJvclwiOiAxXG4gICAgICAgICAgICB9XTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuZG9tLmltcG9ydENzc1N0cmluZyhgLmFjZV9wcm9tcHRfY29udGFpbmVyIHtcbiAgICBtYXgtd2lkdGg6IDYwM3B4O1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIG1hcmdpbjogMjBweCBhdXRvO1xuICAgIHBhZGRpbmc6IDNweDtcbiAgICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgICBib3JkZXItcmFkaXVzOiAycHg7XG4gICAgYm94LXNoYWRvdzogMHB4IDJweCAzcHggMHB4ICM1NTU7XG59YCwgXCJwcm9tdHAuY3NzXCIsIGZhbHNlKTtcblxuXG5leHBvcnRzLnByb21wdCA9IHByb21wdDtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==