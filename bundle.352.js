"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[352],{

/***/ 90352:
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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjM1Mi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxXQUFXLFFBQVE7QUFDbkIsYUFBYSxNQUFNO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0Isa0JBQWtCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlLFFBQVE7QUFDdkIsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL2V4dC9tb2RlbGlzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1vZGVzID0gW107XG4vKipcbiAqIFN1Z2dlc3RzIGEgbW9kZSBiYXNlZCBvbiB0aGUgZmlsZSBleHRlbnNpb24gcHJlc2VudCBpbiB0aGUgZ2l2ZW4gcGF0aFxuICogQHBhcmFtIHtzdHJpbmd9IHBhdGggVGhlIHBhdGggdG8gdGhlIGZpbGVcbiAqIEByZXR1cm5zIHtNb2RlfSBSZXR1cm5zIGFuIG9iamVjdCBjb250YWluaW5nIGluZm9ybWF0aW9uIGFib3V0IHRoZVxuICogIHN1Z2dlc3RlZCBtb2RlLlxuICovXG5mdW5jdGlvbiBnZXRNb2RlRm9yUGF0aChwYXRoKSB7XG4gICAgdmFyIG1vZGUgPSBtb2Rlc0J5TmFtZS50ZXh0O1xuICAgIHZhciBmaWxlTmFtZSA9IHBhdGguc3BsaXQoL1tcXC9cXFxcXS8pLnBvcCgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbW9kZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKG1vZGVzW2ldLnN1cHBvcnRzRmlsZShmaWxlTmFtZSkpIHtcbiAgICAgICAgICAgIG1vZGUgPSBtb2Rlc1tpXTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtb2RlO1xufVxuXG5jbGFzcyBNb2RlIHtcbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBjYXB0aW9uXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGV4dGVuc2lvbnNcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihuYW1lLCBjYXB0aW9uLCBleHRlbnNpb25zKSB7XG4gICAgICAgIHRoaXMubmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuY2FwdGlvbiA9IGNhcHRpb247XG4gICAgICAgIHRoaXMubW9kZSA9IFwiYWNlL21vZGUvXCIgKyBuYW1lO1xuICAgICAgICB0aGlzLmV4dGVuc2lvbnMgPSBleHRlbnNpb25zO1xuICAgICAgICB2YXIgcmU7XG4gICAgICAgIGlmICgvXFxeLy50ZXN0KGV4dGVuc2lvbnMpKSB7XG4gICAgICAgICAgICByZSA9IGV4dGVuc2lvbnMucmVwbGFjZSgvXFx8KFxcXik/L2csIGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiJHxcIiArIChiID8gXCJeXCIgOiBcIl4uKlxcXFwuXCIpO1xuICAgICAgICAgICAgfSkgKyBcIiRcIjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlID0gXCJeLipcXFxcLihcIiArIGV4dGVuc2lvbnMgKyBcIikkXCI7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmV4dFJlID0gbmV3IFJlZ0V4cChyZSwgXCJnaVwiKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gZmlsZW5hbWVcbiAgICAgKi9cbiAgICBzdXBwb3J0c0ZpbGUoZmlsZW5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGZpbGVuYW1lLm1hdGNoKHRoaXMuZXh0UmUpO1xuICAgIH1cbn1cblxuLy8gdG9kbyBmaXJzdGxpbmVtYXRjaFxudmFyIHN1cHBvcnRlZE1vZGVzID0ge1xuICAgIEFCQVA6ICAgICAgICBbXCJhYmFwXCJdLFxuICAgIEFCQzogICAgICAgICBbXCJhYmNcIl0sXG4gICAgQWN0aW9uU2NyaXB0OltcImFzXCJdLFxuICAgIEFEQTogICAgICAgICBbXCJhZGF8YWRiXCJdLFxuICAgIEFsZGE6ICAgICAgICBbXCJhbGRhXCJdLFxuICAgIEFwYWNoZV9Db25mOiBbXCJeaHRhY2Nlc3N8Xmh0Z3JvdXBzfF5odHBhc3N3ZHxeY29uZnxodGFjY2Vzc3xodGdyb3Vwc3xodHBhc3N3ZFwiXSxcbiAgICBBcGV4OiAgICAgICAgW1wiYXBleHxjbHN8dHJpZ2dlcnx0Z3JcIl0sXG4gICAgQVFMOiAgICAgICAgIFtcImFxbFwiXSxcbiAgICBBc2NpaURvYzogICAgW1wiYXNjaWlkb2N8YWRvY1wiXSxcbiAgICBBU0w6ICAgICAgICAgW1wiZHNsfGFzbHxhc2wuanNvblwiXSxcbiAgICBBc3NlbWJseV94ODY6W1wiYXNtfGFcIl0sXG4gICAgQXN0cm86ICAgICAgIFtcImFzdHJvXCJdLFxuICAgIEF1dG9Ib3RLZXk6ICBbXCJhaGtcIl0sXG4gICAgQmF0Y2hGaWxlOiAgIFtcImJhdHxjbWRcIl0sXG4gICAgQmliVGVYOiAgICAgIFtcImJpYlwiXSxcbiAgICBDX0NwcDogICAgICAgW1wiY3BwfGN8Y2N8Y3h4fGh8aGh8aHBwfGlub1wiXSxcbiAgICBDOVNlYXJjaDogICAgW1wiYzlzZWFyY2hfcmVzdWx0c1wiXSxcbiAgICBDaXJydTogICAgICAgW1wiY2lycnV8Y3JcIl0sXG4gICAgQ2xvanVyZTogICAgIFtcImNsanxjbGpzXCJdLFxuICAgIENvYm9sOiAgICAgICBbXCJDQkx8Q09CXCJdLFxuICAgIGNvZmZlZTogICAgICBbXCJjb2ZmZWV8Y2Z8Y3NvbnxeQ2FrZWZpbGVcIl0sXG4gICAgQ29sZEZ1c2lvbjogIFtcImNmbXxjZmNcIl0sXG4gICAgQ3J5c3RhbDogICAgIFtcImNyXCJdLFxuICAgIENTaGFycDogICAgICBbXCJjc1wiXSxcbiAgICBDc291bmRfRG9jdW1lbnQ6IFtcImNzZFwiXSxcbiAgICBDc291bmRfT3JjaGVzdHJhOiBbXCJvcmNcIl0sXG4gICAgQ3NvdW5kX1Njb3JlOiBbXCJzY29cIl0sXG4gICAgQ1NTOiAgICAgICAgIFtcImNzc1wiXSxcbiAgICBDdXJseTogICAgICAgW1wiY3VybHlcIl0sXG4gICAgQ3V0dGxlZmlzaDogIFtcImNvbmZcIl0sXG4gICAgRDogICAgICAgICAgIFtcImR8ZGlcIl0sXG4gICAgRGFydDogICAgICAgIFtcImRhcnRcIl0sXG4gICAgRGlmZjogICAgICAgIFtcImRpZmZ8cGF0Y2hcIl0sXG4gICAgRGphbmdvOiAgICAgIFtcImRqdHxodG1sLmRqdHxkai5odG1sfGRqaHRtbFwiXSxcbiAgICBEb2NrZXJmaWxlOiAgW1wiXkRvY2tlcmZpbGVcIl0sXG4gICAgRG90OiAgICAgICAgIFtcImRvdFwiXSxcbiAgICBEcm9vbHM6ICAgICAgW1wiZHJsXCJdLFxuICAgIEVkaWZhY3Q6ICAgICBbXCJlZGlcIl0sXG4gICAgRWlmZmVsOiAgICAgIFtcImV8Z2VcIl0sXG4gICAgRUpTOiAgICAgICAgIFtcImVqc1wiXSxcbiAgICBFbGl4aXI6ICAgICAgW1wiZXh8ZXhzXCJdLFxuICAgIEVsbTogICAgICAgICBbXCJlbG1cIl0sXG4gICAgRXJsYW5nOiAgICAgIFtcImVybHxocmxcIl0sXG4gICAgRmxpeDogICAgICAgIFtcImZsaXhcIl0sXG4gICAgRm9ydGg6ICAgICAgIFtcImZydHxmc3xsZHJ8ZnRofDR0aFwiXSxcbiAgICBGb3J0cmFuOiAgICAgW1wiZnxmOTBcIl0sXG4gICAgRlNoYXJwOiAgICAgIFtcImZzaXxmc3xtbHxtbGl8ZnN4fGZzc2NyaXB0XCJdLFxuICAgIEZTTDogICAgICAgICBbXCJmc2xcIl0sXG4gICAgRlRMOiAgICAgICAgIFtcImZ0bFwiXSxcbiAgICBHY29kZTogICAgICAgW1wiZ2NvZGVcIl0sXG4gICAgR2hlcmtpbjogICAgIFtcImZlYXR1cmVcIl0sXG4gICAgR2l0aWdub3JlOiAgIFtcIl4uZ2l0aWdub3JlXCJdLFxuICAgIEdsc2w6ICAgICAgICBbXCJnbHNsfGZyYWd8dmVydFwiXSxcbiAgICBHb2JzdG9uZXM6ICAgW1wiZ2JzXCJdLFxuICAgIGdvbGFuZzogICAgICBbXCJnb1wiXSxcbiAgICBHcmFwaFFMU2NoZW1hOiBbXCJncWxcIl0sXG4gICAgR3Jvb3Z5OiAgICAgIFtcImdyb292eVwiXSxcbiAgICBIQU1MOiAgICAgICAgW1wiaGFtbFwiXSxcbiAgICBIYW5kbGViYXJzOiAgW1wiaGJzfGhhbmRsZWJhcnN8dHBsfG11c3RhY2hlXCJdLFxuICAgIEhhc2tlbGw6ICAgICBbXCJoc1wiXSxcbiAgICBIYXNrZWxsX0NhYmFsOiBbXCJjYWJhbFwiXSxcbiAgICBoYVhlOiAgICAgICAgW1wiaHhcIl0sXG4gICAgSGpzb246ICAgICAgIFtcImhqc29uXCJdLFxuICAgIEhUTUw6ICAgICAgICBbXCJodG1sfGh0bXx4aHRtbHx2dWV8d2V8d3B5XCJdLFxuICAgIEhUTUxfRWxpeGlyOiBbXCJlZXh8aHRtbC5lZXhcIl0sXG4gICAgSFRNTF9SdWJ5OiAgIFtcImVyYnxyaHRtbHxodG1sLmVyYlwiXSxcbiAgICBJTkk6ICAgICAgICAgW1wiaW5pfGNvbmZ8Y2ZnfHByZWZzXCJdLFxuICAgIElvOiAgICAgICAgICBbXCJpb1wiXSxcbiAgICBJb246ICAgICAgICAgW1wiaW9uXCJdLFxuICAgIEphY2s6ICAgICAgICBbXCJqYWNrXCJdLFxuICAgIEphZGU6ICAgICAgICBbXCJqYWRlfHB1Z1wiXSxcbiAgICBKYXZhOiAgICAgICAgW1wiamF2YVwiXSxcbiAgICBKYXZhU2NyaXB0OiAgW1wianN8anNtfGpzeHxjanN8bWpzXCJdLFxuICAgIEpFWEw6ICAgICAgICBbXCJqZXhsXCJdLFxuICAgIEpTT046ICAgICAgICBbXCJqc29uXCJdLFxuICAgIEpTT041OiAgICAgICBbXCJqc29uNVwiXSxcbiAgICBKU09OaXE6ICAgICAgW1wianFcIl0sXG4gICAgSlNQOiAgICAgICAgIFtcImpzcFwiXSxcbiAgICBKU1NNOiAgICAgICAgW1wianNzbXxqc3NtX3N0YXRlXCJdLFxuICAgIEpTWDogICAgICAgICBbXCJqc3hcIl0sXG4gICAgSnVsaWE6ICAgICAgIFtcImpsXCJdLFxuICAgIEtvdGxpbjogICAgICBbXCJrdHxrdHNcIl0sXG4gICAgTGFUZVg6ICAgICAgIFtcInRleHxsYXRleHxsdHh8YmliXCJdLFxuICAgIExhdHRlOiAgICAgICBbXCJsYXR0ZVwiXSxcbiAgICBMRVNTOiAgICAgICAgW1wibGVzc1wiXSxcbiAgICBMaXF1aWQ6ICAgICAgW1wibGlxdWlkXCJdLFxuICAgIExpc3A6ICAgICAgICBbXCJsaXNwXCJdLFxuICAgIExpdmVTY3JpcHQ6ICBbXCJsc1wiXSxcbiAgICBMb2c6ICAgICAgICAgW1wibG9nXCJdLFxuICAgIExvZ2lRTDogICAgICBbXCJsb2dpY3xscWxcIl0sXG4gICAgTG9ndGFsazogICAgIFtcImxndFwiXSxcbiAgICBMU0w6ICAgICAgICAgW1wibHNsXCJdLFxuICAgIEx1YTogICAgICAgICBbXCJsdWFcIl0sXG4gICAgTHVhUGFnZTogICAgIFtcImxwXCJdLFxuICAgIEx1Y2VuZTogICAgICBbXCJsdWNlbmVcIl0sXG4gICAgTWFrZWZpbGU6ICAgIFtcIl5NYWtlZmlsZXxeR05VbWFrZWZpbGV8Xm1ha2VmaWxlfF5PQ2FtbE1ha2VmaWxlfG1ha2VcIl0sXG4gICAgTWFya2Rvd246ICAgIFtcIm1kfG1hcmtkb3duXCJdLFxuICAgIE1hc2s6ICAgICAgICBbXCJtYXNrXCJdLFxuICAgIE1BVExBQjogICAgICBbXCJtYXRsYWJcIl0sXG4gICAgTWF6ZTogICAgICAgIFtcIm16XCJdLFxuICAgIE1lZGlhV2lraTogICBbXCJ3aWtpfG1lZGlhd2lraVwiXSxcbiAgICBNRUw6ICAgICAgICAgW1wibWVsXCJdLFxuICAgIE1JUFM6ICAgICAgICBbXCJzfGFzbVwiXSxcbiAgICBNSVhBTDogICAgICAgW1wibWl4YWxcIl0sXG4gICAgTVVTSENvZGU6ICAgIFtcIm1jfG11c2hcIl0sXG4gICAgTXlTUUw6ICAgICAgIFtcIm15c3FsXCJdLFxuICAgIE5hc2FsOiAgICAgICBbXCJuYXNcIl0sXG4gICAgTmdpbng6ICAgICAgIFtcIm5naW54fGNvbmZcIl0sXG4gICAgTmltOiAgICAgICAgIFtcIm5pbVwiXSxcbiAgICBOaXg6ICAgICAgICAgW1wibml4XCJdLFxuICAgIE5TSVM6ICAgICAgICBbXCJuc2l8bnNoXCJdLFxuICAgIE51bmp1Y2tzOiAgICBbXCJudW5qdWNrc3xudW5qc3xuanxuamtcIl0sXG4gICAgT2JqZWN0aXZlQzogIFtcIm18bW1cIl0sXG4gICAgT0NhbWw6ICAgICAgIFtcIm1sfG1saVwiXSxcbiAgICBPZGluOiAgICAgICAgW1wib2RpblwiXSxcbiAgICBQYXJ0aVFMOiAgICAgW1wicGFydGlxbHxwcWxcIl0sXG4gICAgUGFzY2FsOiAgICAgIFtcInBhc3xwXCJdLFxuICAgIFBlcmw6ICAgICAgICBbXCJwbHxwbVwiXSxcbiAgICBwZ1NRTDogICAgICAgW1wicGdzcWxcIl0sXG4gICAgUEhQOiAgICAgICAgIFtcInBocHxpbmN8cGh0bWx8c2h0bWx8cGhwM3xwaHA0fHBocDV8cGhwc3xwaHB0fGF3fGN0cHxtb2R1bGVcIl0sXG4gICAgUEhQX0xhcmF2ZWxfYmxhZGU6IFtcImJsYWRlLnBocFwiXSxcbiAgICBQaWc6ICAgICAgICAgW1wicGlnXCJdLFxuICAgIFBMU1FMOiAgICAgICBbXCJwbHNxbFwiXSxcbiAgICBQb3dlcnNoZWxsOiAgW1wicHMxXCJdLFxuICAgIFByYWF0OiAgICAgICBbXCJwcmFhdHxwcmFhdHNjcmlwdHxwc2N8cHJvY1wiXSxcbiAgICBQcmlzbWE6ICAgICAgW1wicHJpc21hXCJdLFxuICAgIFByb2xvZzogICAgICBbXCJwbGd8cHJvbG9nXCJdLFxuICAgIFByb3BlcnRpZXM6ICBbXCJwcm9wZXJ0aWVzXCJdLFxuICAgIFByb3RvYnVmOiAgICBbXCJwcm90b1wiXSxcbiAgICBQUlFMOiAgICAgICAgW1wicHJxbFwiXSxcbiAgICBQdXBwZXQ6ICAgICAgW1wiZXBwfHBwXCJdLFxuICAgIFB5dGhvbjogICAgICBbXCJweVwiXSxcbiAgICBRTUw6ICAgICAgICAgW1wicW1sXCJdLFxuICAgIFI6ICAgICAgICAgICBbXCJyXCJdLFxuICAgIFJha3U6ICAgICAgICBbXCJyYWt1fHJha3Vtb2R8cmFrdXRlc3R8cDZ8cGw2fHBtNlwiXSxcbiAgICBSYXpvcjogICAgICAgW1wiY3NodG1sfGFzcFwiXSxcbiAgICBSRG9jOiAgICAgICAgW1wiUmRcIl0sXG4gICAgUmVkOiAgICAgICAgIFtcInJlZHxyZWRzXCJdLFxuICAgIFJIVE1MOiAgICAgICBbXCJSaHRtbFwiXSxcbiAgICBSb2JvdDogICAgICAgW1wicm9ib3R8cmVzb3VyY2VcIl0sXG4gICAgUlNUOiAgICAgICAgIFtcInJzdFwiXSxcbiAgICBSdWJ5OiAgICAgICAgW1wicmJ8cnV8Z2Vtc3BlY3xyYWtlfF5HdWFyZGZpbGV8XlJha2VmaWxlfF5HZW1maWxlXCJdLFxuICAgIFJ1c3Q6ICAgICAgICBbXCJyc1wiXSxcbiAgICBTYUM6ICAgICAgICAgW1wic2FjXCJdLFxuICAgIFNBU1M6ICAgICAgICBbXCJzYXNzXCJdLFxuICAgIFNDQUQ6ICAgICAgICBbXCJzY2FkXCJdLFxuICAgIFNjYWxhOiAgICAgICBbXCJzY2FsYXxzYnRcIl0sXG4gICAgU2NoZW1lOiAgICAgIFtcInNjbXxzbXxya3R8b2FrfHNjaGVtZVwiXSxcbiAgICBTY3J5cHQ6ICAgICAgW1wic2NyeXB0XCJdLFxuICAgIFNDU1M6ICAgICAgICBbXCJzY3NzXCJdLFxuICAgIFNIOiAgICAgICAgICBbXCJzaHxiYXNofF4uYmFzaHJjXCJdLFxuICAgIFNKUzogICAgICAgICBbXCJzanNcIl0sXG4gICAgU2xpbTogICAgICAgIFtcInNsaW18c2tpbVwiXSxcbiAgICBTbWFydHk6ICAgICAgW1wic21hcnR5fHRwbFwiXSxcbiAgICBTbWl0aHk6ICAgICAgW1wic21pdGh5XCJdLFxuICAgIHNuaXBwZXRzOiAgICBbXCJzbmlwcGV0c1wiXSxcbiAgICBTb3lfVGVtcGxhdGU6W1wic295XCJdLFxuICAgIFNwYWNlOiAgICAgICBbXCJzcGFjZVwiXSxcbiAgICBTUEFSUUw6ICAgICAgW1wicnFcIl0sXG4gICAgU1FMOiAgICAgICAgIFtcInNxbFwiXSxcbiAgICBTUUxTZXJ2ZXI6ICAgW1wic3Fsc2VydmVyXCJdLFxuICAgIFN0eWx1czogICAgICBbXCJzdHlsfHN0eWx1c1wiXSxcbiAgICBTVkc6ICAgICAgICAgW1wic3ZnXCJdLFxuICAgIFN3aWZ0OiAgICAgICBbXCJzd2lmdFwiXSxcbiAgICBUY2w6ICAgICAgICAgW1widGNsXCJdLFxuICAgIFRlcnJhZm9ybTogICBbXCJ0ZlwiLCBcInRmdmFyc1wiLCBcInRlcnJhZ3J1bnRcIl0sXG4gICAgVGV4OiAgICAgICAgIFtcInRleFwiXSxcbiAgICBUZXh0OiAgICAgICAgW1widHh0XCJdLFxuICAgIFRleHRpbGU6ICAgICBbXCJ0ZXh0aWxlXCJdLFxuICAgIFRvbWw6ICAgICAgICBbXCJ0b21sXCJdLFxuICAgIFRTWDogICAgICAgICBbXCJ0c3hcIl0sXG4gICAgVHVydGxlOiAgICAgIFtcInR0bFwiXSxcbiAgICBUd2lnOiAgICAgICAgW1widHdpZ3xzd2lnXCJdLFxuICAgIFR5cGVzY3JpcHQ6ICBbXCJ0c3xtdHN8Y3RzfHR5cGVzY3JpcHR8c3RyXCJdLFxuICAgIFZhbGE6ICAgICAgICBbXCJ2YWxhXCJdLFxuICAgIFZCU2NyaXB0OiAgICBbXCJ2YnN8dmJcIl0sXG4gICAgVmVsb2NpdHk6ICAgIFtcInZtXCJdLFxuICAgIFZlcmlsb2c6ICAgICBbXCJ2fHZofHN2fHN2aFwiXSxcbiAgICBWSERMOiAgICAgICAgW1widmhkfHZoZGxcIl0sXG4gICAgVmlzdWFsZm9yY2U6IFtcInZmcHxjb21wb25lbnR8cGFnZVwiXSxcbiAgICBXb2xsb2s6ICAgICAgW1wid2xrfHdwZ218d3Rlc3RcIl0sXG4gICAgWE1MOiAgICAgICAgIFtcInhtbHxyZGZ8cnNzfHdzZGx8eHNsdHxhdG9tfG1hdGhtbHxtbWx8eHVsfHhibHx4YW1sXCJdLFxuICAgIFhRdWVyeTogICAgICBbXCJ4cVwiXSxcbiAgICBZQU1MOiAgICAgICAgW1wieWFtbHx5bWxcIl0sXG4gICAgWmVlazogICAgICAgIFtcInplZWt8YnJvXCJdXG59O1xuXG52YXIgbmFtZU92ZXJyaWRlcyA9IHtcbiAgICBPYmplY3RpdmVDOiBcIk9iamVjdGl2ZS1DXCIsXG4gICAgQ1NoYXJwOiBcIkMjXCIsXG4gICAgZ29sYW5nOiBcIkdvXCIsXG4gICAgQ19DcHA6IFwiQyBhbmQgQysrXCIsXG4gICAgQ3NvdW5kX0RvY3VtZW50OiBcIkNzb3VuZCBEb2N1bWVudFwiLFxuICAgIENzb3VuZF9PcmNoZXN0cmE6IFwiQ3NvdW5kXCIsXG4gICAgQ3NvdW5kX1Njb3JlOiBcIkNzb3VuZCBTY29yZVwiLFxuICAgIGNvZmZlZTogXCJDb2ZmZWVTY3JpcHRcIixcbiAgICBIVE1MX1J1Ynk6IFwiSFRNTCAoUnVieSlcIixcbiAgICBIVE1MX0VsaXhpcjogXCJIVE1MIChFbGl4aXIpXCIsXG4gICAgRlRMOiBcIkZyZWVNYXJrZXJcIixcbiAgICBQSFBfTGFyYXZlbF9ibGFkZTogXCJQSFAgKEJsYWRlIFRlbXBsYXRlKVwiLFxuICAgIFBlcmw2OiBcIlBlcmwgNlwiLFxuICAgIEF1dG9Ib3RLZXk6IFwiQXV0b0hvdGtleSAvIEF1dG9JdFwiXG59O1xuXG52YXIgbW9kZXNCeU5hbWUgPSB7fTtcbmZvciAodmFyIG5hbWUgaW4gc3VwcG9ydGVkTW9kZXMpIHtcbiAgICB2YXIgZGF0YSA9IHN1cHBvcnRlZE1vZGVzW25hbWVdO1xuICAgIHZhciBkaXNwbGF5TmFtZSA9IChuYW1lT3ZlcnJpZGVzW25hbWVdIHx8IG5hbWUpLnJlcGxhY2UoL18vZywgXCIgXCIpO1xuICAgIHZhciBmaWxlbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcbiAgICB2YXIgbW9kZSA9IG5ldyBNb2RlKGZpbGVuYW1lLCBkaXNwbGF5TmFtZSwgZGF0YVswXSk7XG4gICAgbW9kZXNCeU5hbWVbZmlsZW5hbWVdID0gbW9kZTtcbiAgICBtb2Rlcy5wdXNoKG1vZGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRNb2RlRm9yUGF0aDogZ2V0TW9kZUZvclBhdGgsXG4gICAgbW9kZXM6IG1vZGVzLFxuICAgIG1vZGVzQnlOYW1lOiBtb2Rlc0J5TmFtZVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==