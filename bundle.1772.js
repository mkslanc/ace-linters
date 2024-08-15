"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1772],{

/***/ 91772:
/***/ ((module) => {



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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjE3NzIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWEsTUFBTTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGtCQUFrQjtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QixlQUFlLFFBQVE7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvbW9kZWxpc3QuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtb2RlcyA9IFtdO1xuLyoqXG4gKiBTdWdnZXN0cyBhIG1vZGUgYmFzZWQgb24gdGhlIGZpbGUgZXh0ZW5zaW9uIHByZXNlbnQgaW4gdGhlIGdpdmVuIHBhdGhcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXRoIFRoZSBwYXRoIHRvIHRoZSBmaWxlXG4gKiBAcmV0dXJucyB7TW9kZX0gUmV0dXJucyBhbiBvYmplY3QgY29udGFpbmluZyBpbmZvcm1hdGlvbiBhYm91dCB0aGVcbiAqICBzdWdnZXN0ZWQgbW9kZS5cbiAqL1xuZnVuY3Rpb24gZ2V0TW9kZUZvclBhdGgocGF0aCkge1xuICAgIHZhciBtb2RlID0gbW9kZXNCeU5hbWUudGV4dDtcbiAgICB2YXIgZmlsZU5hbWUgPSBwYXRoLnNwbGl0KC9bXFwvXFxcXF0vKS5wb3AoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1vZGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChtb2Rlc1tpXS5zdXBwb3J0c0ZpbGUoZmlsZU5hbWUpKSB7XG4gICAgICAgICAgICBtb2RlID0gbW9kZXNbaV07XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbW9kZTtcbn1cblxuY2xhc3MgTW9kZSB7XG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gY2FwdGlvblxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBleHRlbnNpb25zXG4gICAgICovXG4gICAgY29uc3RydWN0b3IobmFtZSwgY2FwdGlvbiwgZXh0ZW5zaW9ucykge1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLmNhcHRpb24gPSBjYXB0aW9uO1xuICAgICAgICB0aGlzLm1vZGUgPSBcImFjZS9tb2RlL1wiICsgbmFtZTtcbiAgICAgICAgdGhpcy5leHRlbnNpb25zID0gZXh0ZW5zaW9ucztcbiAgICAgICAgdmFyIHJlO1xuICAgICAgICBpZiAoL1xcXi8udGVzdChleHRlbnNpb25zKSkge1xuICAgICAgICAgICAgcmUgPSBleHRlbnNpb25zLnJlcGxhY2UoL1xcfChcXF4pPy9nLCBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgIHJldHVybiBcIiR8XCIgKyAoYiA/IFwiXlwiIDogXCJeLipcXFxcLlwiKTtcbiAgICAgICAgICAgIH0pICsgXCIkXCI7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZSA9IFwiXi4qXFxcXC4oXCIgKyBleHRlbnNpb25zICsgXCIpJFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5leHRSZSA9IG5ldyBSZWdFeHAocmUsIFwiZ2lcIik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGZpbGVuYW1lXG4gICAgICovXG4gICAgc3VwcG9ydHNGaWxlKGZpbGVuYW1lKSB7XG4gICAgICAgIHJldHVybiBmaWxlbmFtZS5tYXRjaCh0aGlzLmV4dFJlKTtcbiAgICB9XG59XG5cbi8vIHRvZG8gZmlyc3RsaW5lbWF0Y2hcbnZhciBzdXBwb3J0ZWRNb2RlcyA9IHtcbiAgICBBQkFQOiAgICAgICAgW1wiYWJhcFwiXSxcbiAgICBBQkM6ICAgICAgICAgW1wiYWJjXCJdLFxuICAgIEFjdGlvblNjcmlwdDpbXCJhc1wiXSxcbiAgICBBREE6ICAgICAgICAgW1wiYWRhfGFkYlwiXSxcbiAgICBBbGRhOiAgICAgICAgW1wiYWxkYVwiXSxcbiAgICBBcGFjaGVfQ29uZjogW1wiXmh0YWNjZXNzfF5odGdyb3Vwc3xeaHRwYXNzd2R8XmNvbmZ8aHRhY2Nlc3N8aHRncm91cHN8aHRwYXNzd2RcIl0sXG4gICAgQXBleDogICAgICAgIFtcImFwZXh8Y2xzfHRyaWdnZXJ8dGdyXCJdLFxuICAgIEFRTDogICAgICAgICBbXCJhcWxcIl0sXG4gICAgQXNjaWlEb2M6ICAgIFtcImFzY2lpZG9jfGFkb2NcIl0sXG4gICAgQVNMOiAgICAgICAgIFtcImRzbHxhc2x8YXNsLmpzb25cIl0sXG4gICAgQXNzZW1ibHlfQVJNMzI6W1wic1wiXSxcbiAgICBBc3NlbWJseV94ODY6W1wiYXNtfGFcIl0sXG4gICAgQXN0cm86ICAgICAgIFtcImFzdHJvXCJdLFxuICAgIEF1dG9Ib3RLZXk6ICBbXCJhaGtcIl0sXG4gICAgQmF0Y2hGaWxlOiAgIFtcImJhdHxjbWRcIl0sXG4gICAgQmliVGVYOiAgICAgIFtcImJpYlwiXSxcbiAgICBDX0NwcDogICAgICAgW1wiY3BwfGN8Y2N8Y3h4fGh8aGh8aHBwfGlub1wiXSxcbiAgICBDOVNlYXJjaDogICAgW1wiYzlzZWFyY2hfcmVzdWx0c1wiXSxcbiAgICBDaXJydTogICAgICAgW1wiY2lycnV8Y3JcIl0sXG4gICAgQ2xvanVyZTogICAgIFtcImNsanxjbGpzXCJdLFxuICAgIENvYm9sOiAgICAgICBbXCJDQkx8Q09CXCJdLFxuICAgIGNvZmZlZTogICAgICBbXCJjb2ZmZWV8Y2Z8Y3NvbnxeQ2FrZWZpbGVcIl0sXG4gICAgQ29sZEZ1c2lvbjogIFtcImNmbXxjZmNcIl0sXG4gICAgQ3J5c3RhbDogICAgIFtcImNyXCJdLFxuICAgIENTaGFycDogICAgICBbXCJjc1wiXSxcbiAgICBDc291bmRfRG9jdW1lbnQ6IFtcImNzZFwiXSxcbiAgICBDc291bmRfT3JjaGVzdHJhOiBbXCJvcmNcIl0sXG4gICAgQ3NvdW5kX1Njb3JlOiBbXCJzY29cIl0sXG4gICAgQ1NTOiAgICAgICAgIFtcImNzc1wiXSxcbiAgICBDdXJseTogICAgICAgW1wiY3VybHlcIl0sXG4gICAgQ3V0dGxlZmlzaDogIFtcImNvbmZcIl0sXG4gICAgRDogICAgICAgICAgIFtcImR8ZGlcIl0sXG4gICAgRGFydDogICAgICAgIFtcImRhcnRcIl0sXG4gICAgRGlmZjogICAgICAgIFtcImRpZmZ8cGF0Y2hcIl0sXG4gICAgRGphbmdvOiAgICAgIFtcImRqdHxodG1sLmRqdHxkai5odG1sfGRqaHRtbFwiXSxcbiAgICBEb2NrZXJmaWxlOiAgW1wiXkRvY2tlcmZpbGVcIl0sXG4gICAgRG90OiAgICAgICAgIFtcImRvdFwiXSxcbiAgICBEcm9vbHM6ICAgICAgW1wiZHJsXCJdLFxuICAgIEVkaWZhY3Q6ICAgICBbXCJlZGlcIl0sXG4gICAgRWlmZmVsOiAgICAgIFtcImV8Z2VcIl0sXG4gICAgRUpTOiAgICAgICAgIFtcImVqc1wiXSxcbiAgICBFbGl4aXI6ICAgICAgW1wiZXh8ZXhzXCJdLFxuICAgIEVsbTogICAgICAgICBbXCJlbG1cIl0sXG4gICAgRXJsYW5nOiAgICAgIFtcImVybHxocmxcIl0sXG4gICAgRmxpeDogICAgICAgIFtcImZsaXhcIl0sXG4gICAgRm9ydGg6ICAgICAgIFtcImZydHxmc3xsZHJ8ZnRofDR0aFwiXSxcbiAgICBGb3J0cmFuOiAgICAgW1wiZnxmOTBcIl0sXG4gICAgRlNoYXJwOiAgICAgIFtcImZzaXxmc3xtbHxtbGl8ZnN4fGZzc2NyaXB0XCJdLFxuICAgIEZTTDogICAgICAgICBbXCJmc2xcIl0sXG4gICAgRlRMOiAgICAgICAgIFtcImZ0bFwiXSxcbiAgICBHY29kZTogICAgICAgW1wiZ2NvZGVcIl0sXG4gICAgR2hlcmtpbjogICAgIFtcImZlYXR1cmVcIl0sXG4gICAgR2l0aWdub3JlOiAgIFtcIl4uZ2l0aWdub3JlXCJdLFxuICAgIEdsc2w6ICAgICAgICBbXCJnbHNsfGZyYWd8dmVydFwiXSxcbiAgICBHb2JzdG9uZXM6ICAgW1wiZ2JzXCJdLFxuICAgIGdvbGFuZzogICAgICBbXCJnb1wiXSxcbiAgICBHcmFwaFFMU2NoZW1hOiBbXCJncWxcIl0sXG4gICAgR3Jvb3Z5OiAgICAgIFtcImdyb292eVwiXSxcbiAgICBIQU1MOiAgICAgICAgW1wiaGFtbFwiXSxcbiAgICBIYW5kbGViYXJzOiAgW1wiaGJzfGhhbmRsZWJhcnN8dHBsfG11c3RhY2hlXCJdLFxuICAgIEhhc2tlbGw6ICAgICBbXCJoc1wiXSxcbiAgICBIYXNrZWxsX0NhYmFsOiBbXCJjYWJhbFwiXSxcbiAgICBoYVhlOiAgICAgICAgW1wiaHhcIl0sXG4gICAgSGpzb246ICAgICAgIFtcImhqc29uXCJdLFxuICAgIEhUTUw6IFtcImh0bWx8aHRtfHhodG1sfHdlfHdweVwiXSxcbiAgICBIVE1MX0VsaXhpcjogW1wiZWV4fGh0bWwuZWV4XCJdLFxuICAgIEhUTUxfUnVieTogICBbXCJlcmJ8cmh0bWx8aHRtbC5lcmJcIl0sXG4gICAgSU5JOiAgICAgICAgIFtcImluaXxjb25mfGNmZ3xwcmVmc1wiXSxcbiAgICBJbzogICAgICAgICAgW1wiaW9cIl0sXG4gICAgSW9uOiAgICAgICAgIFtcImlvblwiXSxcbiAgICBKYWNrOiAgICAgICAgW1wiamFja1wiXSxcbiAgICBKYWRlOiAgICAgICAgW1wiamFkZXxwdWdcIl0sXG4gICAgSmF2YTogICAgICAgIFtcImphdmFcIl0sXG4gICAgSmF2YVNjcmlwdDogIFtcImpzfGpzbXxjanN8bWpzXCJdLFxuICAgIEpFWEw6ICAgICAgICBbXCJqZXhsXCJdLFxuICAgIEpTT046ICAgICAgICBbXCJqc29uXCJdLFxuICAgIEpTT041OiAgICAgICBbXCJqc29uNVwiXSxcbiAgICBKU09OaXE6ICAgICAgW1wianFcIl0sXG4gICAgSlNQOiAgICAgICAgIFtcImpzcFwiXSxcbiAgICBKU1NNOiAgICAgICAgW1wianNzbXxqc3NtX3N0YXRlXCJdLFxuICAgIEpTWDogICAgICAgICBbXCJqc3hcIl0sXG4gICAgSnVsaWE6ICAgICAgIFtcImpsXCJdLFxuICAgIEtvdGxpbjogICAgICBbXCJrdHxrdHNcIl0sXG4gICAgTGFUZVg6ICAgICAgIFtcInRleHxsYXRleHxsdHh8YmliXCJdLFxuICAgIExhdHRlOiAgICAgICBbXCJsYXR0ZVwiXSxcbiAgICBMRVNTOiAgICAgICAgW1wibGVzc1wiXSxcbiAgICBMaXF1aWQ6ICAgICAgW1wibGlxdWlkXCJdLFxuICAgIExpc3A6ICAgICAgICBbXCJsaXNwXCJdLFxuICAgIExpdmVTY3JpcHQ6ICBbXCJsc1wiXSxcbiAgICBMb2c6ICAgICAgICAgW1wibG9nXCJdLFxuICAgIExvZ2lRTDogICAgICBbXCJsb2dpY3xscWxcIl0sXG4gICAgTG9ndGFsazogICAgIFtcImxndFwiXSxcbiAgICBMU0w6ICAgICAgICAgW1wibHNsXCJdLFxuICAgIEx1YTogICAgICAgICBbXCJsdWFcIl0sXG4gICAgTHVhUGFnZTogICAgIFtcImxwXCJdLFxuICAgIEx1Y2VuZTogICAgICBbXCJsdWNlbmVcIl0sXG4gICAgTWFrZWZpbGU6ICAgIFtcIl5NYWtlZmlsZXxeR05VbWFrZWZpbGV8Xm1ha2VmaWxlfF5PQ2FtbE1ha2VmaWxlfG1ha2VcIl0sXG4gICAgTWFya2Rvd246ICAgIFtcIm1kfG1hcmtkb3duXCJdLFxuICAgIE1hc2s6ICAgICAgICBbXCJtYXNrXCJdLFxuICAgIE1BVExBQjogICAgICBbXCJtYXRsYWJcIl0sXG4gICAgTWF6ZTogICAgICAgIFtcIm16XCJdLFxuICAgIE1lZGlhV2lraTogICBbXCJ3aWtpfG1lZGlhd2lraVwiXSxcbiAgICBNRUw6ICAgICAgICAgW1wibWVsXCJdLFxuICAgIE1JUFM6ICAgICAgICBbXCJzfGFzbVwiXSxcbiAgICBNSVhBTDogICAgICAgW1wibWl4YWxcIl0sXG4gICAgTVVTSENvZGU6ICAgIFtcIm1jfG11c2hcIl0sXG4gICAgTXlTUUw6ICAgICAgIFtcIm15c3FsXCJdLFxuICAgIE5hc2FsOiAgICAgICBbXCJuYXNcIl0sXG4gICAgTmdpbng6ICAgICAgIFtcIm5naW54fGNvbmZcIl0sXG4gICAgTmltOiAgICAgICAgIFtcIm5pbVwiXSxcbiAgICBOaXg6ICAgICAgICAgW1wibml4XCJdLFxuICAgIE5TSVM6ICAgICAgICBbXCJuc2l8bnNoXCJdLFxuICAgIE51bmp1Y2tzOiAgICBbXCJudW5qdWNrc3xudW5qc3xuanxuamtcIl0sXG4gICAgT2JqZWN0aXZlQzogIFtcIm18bW1cIl0sXG4gICAgT0NhbWw6ICAgICAgIFtcIm1sfG1saVwiXSxcbiAgICBPZGluOiAgICAgICAgW1wib2RpblwiXSxcbiAgICBQYXJ0aVFMOiAgICAgW1wicGFydGlxbHxwcWxcIl0sXG4gICAgUGFzY2FsOiAgICAgIFtcInBhc3xwXCJdLFxuICAgIFBlcmw6ICAgICAgICBbXCJwbHxwbVwiXSxcbiAgICBwZ1NRTDogICAgICAgW1wicGdzcWxcIl0sXG4gICAgUEhQOiAgICAgICAgIFtcInBocHxpbmN8cGh0bWx8c2h0bWx8cGhwM3xwaHA0fHBocDV8cGhwc3xwaHB0fGF3fGN0cHxtb2R1bGVcIl0sXG4gICAgUEhQX0xhcmF2ZWxfYmxhZGU6IFtcImJsYWRlLnBocFwiXSxcbiAgICBQaWc6ICAgICAgICAgW1wicGlnXCJdLFxuICAgIFBMU1FMOiAgICAgICBbXCJwbHNxbFwiXSxcbiAgICBQb3dlcnNoZWxsOiAgW1wicHMxXCJdLFxuICAgIFByYWF0OiAgICAgICBbXCJwcmFhdHxwcmFhdHNjcmlwdHxwc2N8cHJvY1wiXSxcbiAgICBQcmlzbWE6ICAgICAgW1wicHJpc21hXCJdLFxuICAgIFByb2xvZzogICAgICBbXCJwbGd8cHJvbG9nXCJdLFxuICAgIFByb3BlcnRpZXM6ICBbXCJwcm9wZXJ0aWVzXCJdLFxuICAgIFByb3RvYnVmOiAgICBbXCJwcm90b1wiXSxcbiAgICBQUlFMOiAgICAgICAgW1wicHJxbFwiXSxcbiAgICBQdXBwZXQ6ICAgICAgW1wiZXBwfHBwXCJdLFxuICAgIFB5dGhvbjogICAgICBbXCJweVwiXSxcbiAgICBRTUw6ICAgICAgICAgW1wicW1sXCJdLFxuICAgIFI6ICAgICAgICAgICBbXCJyXCJdLFxuICAgIFJha3U6ICAgICAgICBbXCJyYWt1fHJha3Vtb2R8cmFrdXRlc3R8cDZ8cGw2fHBtNlwiXSxcbiAgICBSYXpvcjogICAgICAgW1wiY3NodG1sfGFzcFwiXSxcbiAgICBSRG9jOiAgICAgICAgW1wiUmRcIl0sXG4gICAgUmVkOiAgICAgICAgIFtcInJlZHxyZWRzXCJdLFxuICAgIFJIVE1MOiAgICAgICBbXCJSaHRtbFwiXSxcbiAgICBSb2JvdDogICAgICAgW1wicm9ib3R8cmVzb3VyY2VcIl0sXG4gICAgUlNUOiAgICAgICAgIFtcInJzdFwiXSxcbiAgICBSdWJ5OiAgICAgICAgW1wicmJ8cnV8Z2Vtc3BlY3xyYWtlfF5HdWFyZGZpbGV8XlJha2VmaWxlfF5HZW1maWxlXCJdLFxuICAgIFJ1c3Q6ICAgICAgICBbXCJyc1wiXSxcbiAgICBTYUM6ICAgICAgICAgW1wic2FjXCJdLFxuICAgIFNBU1M6ICAgICAgICBbXCJzYXNzXCJdLFxuICAgIFNDQUQ6ICAgICAgICBbXCJzY2FkXCJdLFxuICAgIFNjYWxhOiAgICAgICBbXCJzY2FsYXxzYnRcIl0sXG4gICAgU2NoZW1lOiAgICAgIFtcInNjbXxzbXxya3R8b2FrfHNjaGVtZVwiXSxcbiAgICBTY3J5cHQ6ICAgICAgW1wic2NyeXB0XCJdLFxuICAgIFNDU1M6ICAgICAgICBbXCJzY3NzXCJdLFxuICAgIFNIOiAgICAgICAgICBbXCJzaHxiYXNofF4uYmFzaHJjXCJdLFxuICAgIFNKUzogICAgICAgICBbXCJzanNcIl0sXG4gICAgU2xpbTogICAgICAgIFtcInNsaW18c2tpbVwiXSxcbiAgICBTbWFydHk6ICAgICAgW1wic21hcnR5fHRwbFwiXSxcbiAgICBTbWl0aHk6ICAgICAgW1wic21pdGh5XCJdLFxuICAgIHNuaXBwZXRzOiAgICBbXCJzbmlwcGV0c1wiXSxcbiAgICBTb3lfVGVtcGxhdGU6W1wic295XCJdLFxuICAgIFNwYWNlOiAgICAgICBbXCJzcGFjZVwiXSxcbiAgICBTUEFSUUw6ICAgICAgW1wicnFcIl0sXG4gICAgU1FMOiAgICAgICAgIFtcInNxbFwiXSxcbiAgICBTUUxTZXJ2ZXI6ICAgW1wic3Fsc2VydmVyXCJdLFxuICAgIFN0eWx1czogICAgICBbXCJzdHlsfHN0eWx1c1wiXSxcbiAgICBTVkc6ICAgICAgICAgW1wic3ZnXCJdLFxuICAgIFN3aWZ0OiAgICAgICBbXCJzd2lmdFwiXSxcbiAgICBUY2w6ICAgICAgICAgW1widGNsXCJdLFxuICAgIFRlcnJhZm9ybTogICBbXCJ0ZlwiLCBcInRmdmFyc1wiLCBcInRlcnJhZ3J1bnRcIl0sXG4gICAgVGV4OiAgICAgICAgIFtcInRleFwiXSxcbiAgICBUZXh0OiAgICAgICAgW1widHh0XCJdLFxuICAgIFRleHRpbGU6ICAgICBbXCJ0ZXh0aWxlXCJdLFxuICAgIFRvbWw6ICAgICAgICBbXCJ0b21sXCJdLFxuICAgIFRTWDogICAgICAgICBbXCJ0c3hcIl0sXG4gICAgVHVydGxlOiAgICAgIFtcInR0bFwiXSxcbiAgICBUd2lnOiAgICAgICAgW1widHdpZ3xzd2lnXCJdLFxuICAgIFR5cGVzY3JpcHQ6ICBbXCJ0c3xtdHN8Y3RzfHR5cGVzY3JpcHR8c3RyXCJdLFxuICAgIFZhbGE6ICAgICAgICBbXCJ2YWxhXCJdLFxuICAgIFZCU2NyaXB0OiAgICBbXCJ2YnN8dmJcIl0sXG4gICAgVmVsb2NpdHk6ICAgIFtcInZtXCJdLFxuICAgIFZlcmlsb2c6ICAgICBbXCJ2fHZofHN2fHN2aFwiXSxcbiAgICBWSERMOiAgICAgICAgW1widmhkfHZoZGxcIl0sXG4gICAgVmlzdWFsZm9yY2U6IFtcInZmcHxjb21wb25lbnR8cGFnZVwiXSxcbiAgICBWdWU6IFtcInZ1ZVwiXSxcbiAgICBXb2xsb2s6ICAgICAgW1wid2xrfHdwZ218d3Rlc3RcIl0sXG4gICAgWE1MOiAgICAgICAgIFtcInhtbHxyZGZ8cnNzfHdzZGx8eHNsdHxhdG9tfG1hdGhtbHxtbWx8eHVsfHhibHx4YW1sXCJdLFxuICAgIFhRdWVyeTogICAgICBbXCJ4cVwiXSxcbiAgICBZQU1MOiAgICAgICAgW1wieWFtbHx5bWxcIl0sXG4gICAgWmVlazogICAgICAgIFtcInplZWt8YnJvXCJdLFxuICAgIFppZzogICAgICAgICBbXCJ6aWdcIl1cbn07XG5cbnZhciBuYW1lT3ZlcnJpZGVzID0ge1xuICAgIE9iamVjdGl2ZUM6IFwiT2JqZWN0aXZlLUNcIixcbiAgICBDU2hhcnA6IFwiQyNcIixcbiAgICBnb2xhbmc6IFwiR29cIixcbiAgICBDX0NwcDogXCJDIGFuZCBDKytcIixcbiAgICBDc291bmRfRG9jdW1lbnQ6IFwiQ3NvdW5kIERvY3VtZW50XCIsXG4gICAgQ3NvdW5kX09yY2hlc3RyYTogXCJDc291bmRcIixcbiAgICBDc291bmRfU2NvcmU6IFwiQ3NvdW5kIFNjb3JlXCIsXG4gICAgY29mZmVlOiBcIkNvZmZlZVNjcmlwdFwiLFxuICAgIEhUTUxfUnVieTogXCJIVE1MIChSdWJ5KVwiLFxuICAgIEhUTUxfRWxpeGlyOiBcIkhUTUwgKEVsaXhpcilcIixcbiAgICBGVEw6IFwiRnJlZU1hcmtlclwiLFxuICAgIFBIUF9MYXJhdmVsX2JsYWRlOiBcIlBIUCAoQmxhZGUgVGVtcGxhdGUpXCIsXG4gICAgUGVybDY6IFwiUGVybCA2XCIsXG4gICAgQXV0b0hvdEtleTogXCJBdXRvSG90a2V5IC8gQXV0b0l0XCJcbn07XG5cbnZhciBtb2Rlc0J5TmFtZSA9IHt9O1xuZm9yICh2YXIgbmFtZSBpbiBzdXBwb3J0ZWRNb2Rlcykge1xuICAgIHZhciBkYXRhID0gc3VwcG9ydGVkTW9kZXNbbmFtZV07XG4gICAgdmFyIGRpc3BsYXlOYW1lID0gKG5hbWVPdmVycmlkZXNbbmFtZV0gfHwgbmFtZSkucmVwbGFjZSgvXy9nLCBcIiBcIik7XG4gICAgdmFyIGZpbGVuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhciBtb2RlID0gbmV3IE1vZGUoZmlsZW5hbWUsIGRpc3BsYXlOYW1lLCBkYXRhWzBdKTtcbiAgICBtb2Rlc0J5TmFtZVtmaWxlbmFtZV0gPSBtb2RlO1xuICAgIG1vZGVzLnB1c2gobW9kZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGdldE1vZGVGb3JQYXRoOiBnZXRNb2RlRm9yUGF0aCxcbiAgICBtb2RlczogbW9kZXMsXG4gICAgbW9kZXNCeU5hbWU6IG1vZGVzQnlOYW1lXG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9