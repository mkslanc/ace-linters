"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4223],{

/***/ 3719:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);

var FoldMode = exports.l = function(markers) {
    this.foldingStartMarker = new RegExp("([\\[{])(?:\\s*)$|(" + markers + ")(?:\\s*)(?:#.*)?$");
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) {
            if (match[1])
                return this.openingBracketBlock(session, match[1], row, match.index);
            if (match[2])
                return this.indentationBlock(session, row, match.index + match[2].length);
            return this.indentationBlock(session, row);
        }
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 44223:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var MushCodeRules = (__webpack_require__(84828)/* .MushCodeRules */ .W);
var PythonFoldMode = (__webpack_require__(3719)/* .FoldMode */ .l);
var Range = (__webpack_require__(91902)/* .Range */ .Q);

var Mode = function() {
    this.HighlightRules = MushCodeRules;
    this.foldingRules = new PythonFoldMode("\\:");
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {


    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start") {
            var match = line.match(/^.*[\{\(\[:]\s*$/);
            if (match) {
                indent += tab;
            }
        }

        return indent;
    };

   var outdents = {
        "pass": 1,
        "return": 1,
        "raise": 1,
        "break": 1,
        "continue": 1
    };

    this.checkOutdent = function(state, line, input) {
        if (input !== "\r\n" && input !== "\r" && input !== "\n")
            return false;

        var tokens = this.getTokenizer().getLineTokens(line.trim(), state).tokens;

        if (!tokens)
            return false;

        // ignore trailing comments
        do {
            var last = tokens.pop();
        } while (last && (last.type == "comment" || (last.type == "text" && last.value.match(/^\s+$/))));

        if (!last)
            return false;

        return (last.type == "keyword" && outdents[last.value]);
    };

    this.autoOutdent = function(state, doc, row) {
        // outdenting in python is slightly different because it always applies
        // to the next line and only of a new line is inserted

        row += 1;
        var indent = this.$getIndent(doc.getLine(row));
        var tab = doc.getTabString();
        if (indent.slice(-tab.length) == tab)
            doc.remove(new Range(row, indent.length-tab.length, row, indent.length));
    };

    this.$id = "ace/mode/mushcode";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 84828:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
 * MUSHCodeMode
 */



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var MushCodeRules = function() {


    var keywords = (
 "@if|"+
 "@ifelse|"+
 "@switch|"+
 "@halt|"+
 "@dolist|"+
 "@create|"+
 "@scent|"+
 "@sound|"+
 "@touch|"+
 "@ataste|"+
 "@osound|"+
 "@ahear|"+
 "@aahear|"+
 "@amhear|"+
 "@otouch|"+
 "@otaste|"+
 "@drop|"+
 "@odrop|"+
 "@adrop|"+
 "@dropfail|"+
 "@odropfail|"+
 "@smell|"+
 "@oemit|"+
 "@emit|"+
 "@pemit|"+
 "@parent|"+
 "@clone|"+
 "@taste|"+
 "whisper|"+
 "page|"+
 "say|"+
 "pose|"+
 "semipose|"+
 "teach|"+
 "touch|"+
 "taste|"+
 "smell|"+
 "listen|"+
 "look|"+
 "move|"+
 "go|"+
 "home|"+
 "follow|"+
 "unfollow|"+
 "desert|"+
 "dismiss|"+
 "@tel"
    );

    var builtinConstants = (
        "=#0"
    );

    var builtinFunctions = (
 "default|"+
 "edefault|"+
 "eval|"+
 "get_eval|"+
 "get|"+
 "grep|"+
 "grepi|"+
 "hasattr|"+
 "hasattrp|"+
 "hasattrval|"+
 "hasattrpval|"+
 "lattr|"+
 "nattr|"+
 "poss|"+
 "udefault|"+
 "ufun|"+
 "u|"+
 "v|"+
 "uldefault|"+
 "xget|"+
 "zfun|"+
 "band|"+
 "bnand|"+
 "bnot|"+
 "bor|"+
 "bxor|"+
 "shl|"+
 "shr|"+
 "and|"+
 "cand|"+
 "cor|"+
 "eq|"+
 "gt|"+
 "gte|"+
 "lt|"+
 "lte|"+
 "nand|"+
 "neq|"+
 "nor|"+
 "not|"+
 "or|"+
 "t|"+
 "xor|"+
 "con|"+
 "entrances|"+
 "exit|"+
 "followers|"+
 "home|"+
 "lcon|"+
 "lexits|"+
 "loc|"+
 "locate|"+
 "lparent|"+
 "lsearch|"+
 "next|"+
 "num|"+
 "owner|"+
 "parent|"+
 "pmatch|"+
 "rloc|"+
 "rnum|"+
 "room|"+
 "where|"+
 "zone|"+
 "worn|"+
 "held|"+
 "carried|"+
 "acos|"+
 "asin|"+
 "atan|"+
 "ceil|"+
 "cos|"+
 "e|"+
 "exp|"+
 "fdiv|"+
 "fmod|"+
 "floor|"+
 "log|"+
 "ln|"+
 "pi|"+
 "power|"+
 "round|"+
 "sin|"+
 "sqrt|"+
 "tan|"+
 "aposs|"+
 "andflags|"+
 "conn|"+
 "commandssent|"+
 "controls|"+
 "doing|"+
 "elock|"+
 "findable|"+
 "flags|"+
 "fullname|"+
 "hasflag|"+
 "haspower|"+
 "hastype|"+
 "hidden|"+
 "idle|"+
 "isbaker|"+
 "lock|"+
 "lstats|"+
 "money|"+
 "who|"+
 "name|"+
 "nearby|"+
 "obj|"+
 "objflags|"+
 "photo|"+
 "poll|"+
 "powers|"+
 "pendingtext|"+
 "receivedtext|"+
 "restarts|"+
 "restarttime|"+
 "subj|"+
 "shortestpath|"+
 "tmoney|"+
 "type|"+
 "visible|"+
 "cat|"+
 "element|"+
 "elements|"+
 "extract|"+
 "filter|"+
 "filterbool|"+
 "first|"+
 "foreach|"+
 "fold|"+
 "grab|"+
 "graball|"+
 "index|"+
 "insert|"+
 "itemize|"+
 "items|"+
 "iter|"+
 "last|"+
 "ldelete|"+
 "map|"+
 "match|"+
 "matchall|"+
 "member|"+
 "mix|"+
 "munge|"+
 "pick|"+
 "remove|"+
 "replace|"+
 "rest|"+
 "revwords|"+
 "setdiff|"+
 "setinter|"+
 "setunion|"+
 "shuffle|"+
 "sort|"+
 "sortby|"+
 "splice|"+
 "step|"+
 "wordpos|"+
 "words|"+
 "add|"+
 "lmath|"+
 "max|"+
 "mean|"+
 "median|"+
 "min|"+
 "mul|"+
 "percent|"+
 "sign|"+
 "stddev|"+
 "sub|"+
 "val|"+
 "bound|"+
 "abs|"+
 "inc|"+
 "dec|"+
 "dist2d|"+
 "dist3d|"+
 "div|"+
 "floordiv|"+
 "mod|"+
 "modulo|"+
 "remainder|"+
 "vadd|"+
 "vdim|"+
 "vdot|"+
 "vmag|"+
 "vmax|"+
 "vmin|"+
 "vmul|"+
 "vsub|"+
 "vunit|"+
 "regedit|"+
 "regeditall|"+
 "regeditalli|"+
 "regediti|"+
 "regmatch|"+
 "regmatchi|"+
 "regrab|"+
 "regraball|"+
 "regraballi|"+
 "regrabi|"+
 "regrep|"+
 "regrepi|"+
 "after|"+
 "alphamin|"+
 "alphamax|"+
 "art|"+
 "before|"+
 "brackets|"+
 "capstr|"+
 "case|"+
 "caseall|"+
 "center|"+
 "containsfansi|"+
 "comp|"+
 "decompose|"+
 "decrypt|"+
 "delete|"+
 "edit|"+
 "encrypt|"+
 "escape|"+
 "if|"+
 "ifelse|"+
 "lcstr|"+
 "left|"+
 "lit|"+
 "ljust|"+
 "merge|"+
 "mid|"+
 "ostrlen|"+
 "pos|"+
 "repeat|"+
 "reverse|"+
 "right|"+
 "rjust|"+
 "scramble|"+
 "secure|"+
 "space|"+
 "spellnum|"+
 "squish|"+
 "strcat|"+
 "strmatch|"+
 "strinsert|"+
 "stripansi|"+
 "stripfansi|"+
 "strlen|"+
 "switch|"+
 "switchall|"+
 "table|"+
 "tr|"+
 "trim|"+
 "ucstr|"+
 "unsafe|"+
 "wrap|"+
 "ctitle|"+
 "cwho|"+
 "channels|"+
 "clock|"+
 "cflags|"+
 "ilev|"+
 "itext|"+
 "inum|"+
 "convsecs|"+
 "convutcsecs|"+
 "convtime|"+
 "ctime|"+
 "etimefmt|"+
 "isdaylight|"+
 "mtime|"+
 "secs|"+
 "msecs|"+
 "starttime|"+
 "time|"+
 "timefmt|"+
 "timestring|"+
 "utctime|"+
 "atrlock|"+
 "clone|"+
 "create|"+
 "cook|"+
 "dig|"+
 "emit|"+
 "lemit|"+
 "link|"+
 "oemit|"+
 "open|"+
 "pemit|"+
 "remit|"+
 "set|"+
 "tel|"+
 "wipe|"+
 "zemit|"+
 "fbcreate|"+
 "fbdestroy|"+
 "fbwrite|"+
 "fbclear|"+
 "fbcopy|"+
 "fbcopyto|"+
 "fbclip|"+
 "fbdump|"+
 "fbflush|"+
 "fbhset|"+
 "fblist|"+
 "fbstats|"+
 "qentries|"+
 "qentry|"+
 "play|"+
 "ansi|"+
 "break|"+
 "c|"+
 "asc|"+
 "die|"+
 "isdbref|"+
 "isint|"+
 "isnum|"+
 "isletters|"+
 "linecoords|"+
 "localize|"+
 "lnum|"+
 "nameshort|"+
 "null|"+
 "objeval|"+
 "r|"+
 "rand|"+
 "s|"+
 "setq|"+
 "setr|"+
 "soundex|"+
 "soundslike|"+
 "valid|"+
 "vchart|"+
 "vchart2|"+
 "vlabel|"+
 "@@|"+
 "bakerdays|"+
 "bodybuild|"+
 "box|"+
 "capall|"+
 "catalog|"+
 "children|"+
 "ctrailer|"+
 "darttime|"+
 "debt|"+
 "detailbar|"+
 "exploredroom|"+
 "fansitoansi|"+
 "fansitoxansi|"+
 "fullbar|"+
 "halfbar|"+
 "isdarted|"+
 "isnewbie|"+
 "isword|"+
 "lambda|"+
 "lobjects|"+
 "lplayers|"+
 "lthings|"+
 "lvexits|"+
 "lvobjects|"+
 "lvplayers|"+
 "lvthings|"+
 "newswrap|"+
 "numsuffix|"+
 "playerson|"+
 "playersthisweek|"+
 "randomad|"+
 "randword|"+
 "realrandword|"+
 "replacechr|"+
 "second|"+
 "splitamount|"+
 "strlenall|"+
 "text|"+
 "third|"+
 "tofansi|"+
 "totalac|"+
 "unique|"+
 "getaddressroom|"+
 "listpropertycomm|"+
 "listpropertyres|"+
 "lotowner|"+
 "lotrating|"+
 "lotratingcount|"+
 "lotvalue|"+
 "boughtproduct|"+
 "companyabb|"+
 "companyicon|"+
 "companylist|"+
 "companyname|"+
 "companyowners|"+
 "companyvalue|"+
 "employees|"+
 "invested|"+
 "productlist|"+
 "productname|"+
 "productowners|"+
 "productrating|"+
 "productratingcount|"+
 "productsoldat|"+
 "producttype|"+
 "ratedproduct|"+
 "soldproduct|"+
 "topproducts|"+
 "totalspentonproduct|"+
 "totalstock|"+
 "transfermoney|"+
 "uniquebuyercount|"+
 "uniqueproductsbought|"+
 "validcompany|"+
 "deletepicture|"+
 "fbsave|"+
 "getpicturesecurity|"+
 "haspicture|"+
 "listpictures|"+
 "picturesize|"+
 "replacecolor|"+
 "rgbtocolor|"+
 "savepicture|"+
 "setpicturesecurity|"+
 "showpicture|"+
 "piechart|"+
 "piechartlabel|"+
 "createmaze|"+
 "drawmaze|"+
 "drawwireframe"
    );
    var keywordMapper = this.createKeywordMapper({
        "invalid.deprecated": "debugger",
        "support.function": builtinFunctions,
        "constant.language": builtinConstants,
        "keyword": keywords
    }, "identifier");

    var strPre = "(?:r|u|ur|R|U|UR|Ur|uR)?";

    var decimalInteger = "(?:(?:[1-9]\\d*)|(?:0))";
    var octInteger = "(?:0[oO]?[0-7]+)";
    var hexInteger = "(?:0[xX][\\dA-Fa-f]+)";
    var binInteger = "(?:0[bB][01]+)";
    var integer = "(?:" + decimalInteger + "|" + octInteger + "|" + hexInteger + "|" + binInteger + ")";

    var exponent = "(?:[eE][+-]?\\d+)";
    var fraction = "(?:\\.\\d+)";
    var intPart = "(?:\\d+)";
    var pointFloat = "(?:(?:" + intPart + "?" + fraction + ")|(?:" + intPart + "\\.))";
    var exponentFloat = "(?:(?:" + pointFloat + "|" +  intPart + ")" + exponent + ")";
    var floatNumber = "(?:" + exponentFloat + "|" + pointFloat + ")";

    this.$rules = {
        "start" : [
         {
                token : "variable", // mush substitution register
                regex : "%[0-9]{1}"
         },
         {
                token : "variable", // mush substitution register
                regex : "%q[0-9A-Za-z]{1}"
         },
         {
                token : "variable", // mush special character register
                regex : "%[a-zA-Z]{1}"
         },
         {
                token: "variable.language",
                regex: "%[a-z0-9-_]+"
         },
        {
            token : "constant.numeric", // imaginary
            regex : "(?:" + floatNumber + "|\\d+)[jJ]\\b"
        }, {
            token : "constant.numeric", // float
            regex : floatNumber
        }, {
            token : "constant.numeric", // long integer
            regex : integer + "[lL]\\b"
        }, {
            token : "constant.numeric", // integer
            regex : integer + "\\b"
        }, {
            token : keywordMapper,
            regex : "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
        }, {
            token : "keyword.operator",
            regex : "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|#|%|<<|>>|\\||\\^|~|<|>|<=|=>|==|!=|<>|="
        }, {
            token : "paren.lparen",
            regex : "[\\[\\(\\{]"
        }, {
            token : "paren.rparen",
            regex : "[\\]\\)\\}]"
        }, {
            token : "text",
            regex : "\\s+"
        } ]
    };
};

oop.inherits(MushCodeRules, TextHighlightRules);

exports.W = MushCodeRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQyMjMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQWU7QUFDakMsbUJBQW1CLHFDQUErQjs7QUFFbEQsZUFBZSxTQUFnQjtBQUMvQixnREFBZ0Q7QUFDaEQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7O0FDeEJZOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLGVBQWUsaUNBQXNCO0FBQ3JDLG9CQUFvQixtREFBbUQ7QUFDdkUscUJBQXFCLDZDQUFzQztBQUMzRCxZQUFZLDJDQUF5Qjs7QUFFckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMENBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQsWUFBWTs7Ozs7Ozs7QUNoRlo7QUFDQTtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFZO0FBQzlCLHlCQUF5Qix3REFBb0Q7O0FBRTdFOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxFQUFFO0FBQ2xDLFVBQVU7QUFDVjtBQUNBO0FBQ0EsdUNBQXVDLEVBQUU7QUFDekMsVUFBVTtBQUNWO0FBQ0E7QUFDQSxtQ0FBbUMsRUFBRTtBQUNyQyxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSwrQkFBK0I7QUFDL0IsU0FBUztBQUNUO0FBQ0EsK0JBQStCO0FBQy9CLFNBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7O0FBRUE7O0FBRUEsU0FBcUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvcHl0aG9uaWMuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9tdXNoY29kZS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL211c2hjb2RlX2hpZ2hsaWdodF9ydWxlcy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi8uLi9saWIvb29wXCIpO1xudmFyIEJhc2VGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRfbW9kZVwiKS5Gb2xkTW9kZTtcblxudmFyIEZvbGRNb2RlID0gZXhwb3J0cy5Gb2xkTW9kZSA9IGZ1bmN0aW9uKG1hcmtlcnMpIHtcbiAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXCIoW1xcXFxbe10pKD86XFxcXHMqKSR8KFwiICsgbWFya2VycyArIFwiKSg/OlxcXFxzKikoPzojLiopPyRcIik7XG59O1xub29wLmluaGVyaXRzKEZvbGRNb2RlLCBCYXNlRm9sZE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KSB7XG4gICAgICAgIHZhciBsaW5lID0gc2Vzc2lvbi5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2godGhpcy5mb2xkaW5nU3RhcnRNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5vcGVuaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIG1hdGNoLmluZGV4KTtcbiAgICAgICAgICAgIGlmIChtYXRjaFsyXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pbmRlbnRhdGlvbkJsb2NrKHNlc3Npb24sIHJvdywgbWF0Y2guaW5kZXggKyBtYXRjaFsyXS5sZW5ndGgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaW5kZW50YXRpb25CbG9jayhzZXNzaW9uLCByb3cpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBNdXNoQ29kZVJ1bGVzID0gcmVxdWlyZShcIi4vbXVzaGNvZGVfaGlnaGxpZ2h0X3J1bGVzXCIpLk11c2hDb2RlUnVsZXM7XG52YXIgUHl0aG9uRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL3B5dGhvbmljXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBNdXNoQ29kZVJ1bGVzO1xuICAgIHRoaXMuZm9sZGluZ1J1bGVzID0gbmV3IFB5dGhvbkZvbGRNb2RlKFwiXFxcXDpcIik7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbn07XG5vb3AuaW5oZXJpdHMoTW9kZSwgVGV4dE1vZGUpO1xuXG4oZnVuY3Rpb24oKSB7XG5cblxuICAgIHRoaXMuZ2V0TmV4dExpbmVJbmRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgdGFiKSB7XG4gICAgICAgIHZhciBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG5cbiAgICAgICAgdmFyIHRva2VuaXplZExpbmUgPSB0aGlzLmdldFRva2VuaXplcigpLmdldExpbmVUb2tlbnMobGluZSwgc3RhdGUpO1xuICAgICAgICB2YXIgdG9rZW5zID0gdG9rZW5pemVkTGluZS50b2tlbnM7XG5cbiAgICAgICAgaWYgKHRva2Vucy5sZW5ndGggJiYgdG9rZW5zW3Rva2Vucy5sZW5ndGgtMV0udHlwZSA9PSBcImNvbW1lbnRcIikge1xuICAgICAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzdGF0ZSA9PSBcInN0YXJ0XCIpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKltcXHtcXChcXFs6XVxccyokLyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuXG4gICB2YXIgb3V0ZGVudHMgPSB7XG4gICAgICAgIFwicGFzc1wiOiAxLFxuICAgICAgICBcInJldHVyblwiOiAxLFxuICAgICAgICBcInJhaXNlXCI6IDEsXG4gICAgICAgIFwiYnJlYWtcIjogMSxcbiAgICAgICAgXCJjb250aW51ZVwiOiAxXG4gICAgfTtcblxuICAgIHRoaXMuY2hlY2tPdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIGlucHV0KSB7XG4gICAgICAgIGlmIChpbnB1dCAhPT0gXCJcXHJcXG5cIiAmJiBpbnB1dCAhPT0gXCJcXHJcIiAmJiBpbnB1dCAhPT0gXCJcXG5cIilcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICB2YXIgdG9rZW5zID0gdGhpcy5nZXRUb2tlbml6ZXIoKS5nZXRMaW5lVG9rZW5zKGxpbmUudHJpbSgpLCBzdGF0ZSkudG9rZW5zO1xuXG4gICAgICAgIGlmICghdG9rZW5zKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIC8vIGlnbm9yZSB0cmFpbGluZyBjb21tZW50c1xuICAgICAgICBkbyB7XG4gICAgICAgICAgICB2YXIgbGFzdCA9IHRva2Vucy5wb3AoKTtcbiAgICAgICAgfSB3aGlsZSAobGFzdCAmJiAobGFzdC50eXBlID09IFwiY29tbWVudFwiIHx8IChsYXN0LnR5cGUgPT0gXCJ0ZXh0XCIgJiYgbGFzdC52YWx1ZS5tYXRjaCgvXlxccyskLykpKSk7XG5cbiAgICAgICAgaWYgKCFsYXN0KVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiAobGFzdC50eXBlID09IFwia2V5d29yZFwiICYmIG91dGRlbnRzW2xhc3QudmFsdWVdKTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBkb2MsIHJvdykge1xuICAgICAgICAvLyBvdXRkZW50aW5nIGluIHB5dGhvbiBpcyBzbGlnaHRseSBkaWZmZXJlbnQgYmVjYXVzZSBpdCBhbHdheXMgYXBwbGllc1xuICAgICAgICAvLyB0byB0aGUgbmV4dCBsaW5lIGFuZCBvbmx5IG9mIGEgbmV3IGxpbmUgaXMgaW5zZXJ0ZWRcblxuICAgICAgICByb3cgKz0gMTtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChkb2MuZ2V0TGluZShyb3cpKTtcbiAgICAgICAgdmFyIHRhYiA9IGRvYy5nZXRUYWJTdHJpbmcoKTtcbiAgICAgICAgaWYgKGluZGVudC5zbGljZSgtdGFiLmxlbmd0aCkgPT0gdGFiKVxuICAgICAgICAgICAgZG9jLnJlbW92ZShuZXcgUmFuZ2Uocm93LCBpbmRlbnQubGVuZ3RoLXRhYi5sZW5ndGgsIHJvdywgaW5kZW50Lmxlbmd0aCkpO1xuICAgIH07XG5cbiAgICB0aGlzLiRpZCA9IFwiYWNlL21vZGUvbXVzaGNvZGVcIjtcbn0pLmNhbGwoTW9kZS5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1vZGUgPSBNb2RlO1xuIiwiLypcbiAqIE1VU0hDb2RlTW9kZVxuICovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgTXVzaENvZGVSdWxlcyA9IGZ1bmN0aW9uKCkge1xuXG5cbiAgICB2YXIga2V5d29yZHMgPSAoXG4gXCJAaWZ8XCIrXG4gXCJAaWZlbHNlfFwiK1xuIFwiQHN3aXRjaHxcIitcbiBcIkBoYWx0fFwiK1xuIFwiQGRvbGlzdHxcIitcbiBcIkBjcmVhdGV8XCIrXG4gXCJAc2NlbnR8XCIrXG4gXCJAc291bmR8XCIrXG4gXCJAdG91Y2h8XCIrXG4gXCJAYXRhc3RlfFwiK1xuIFwiQG9zb3VuZHxcIitcbiBcIkBhaGVhcnxcIitcbiBcIkBhYWhlYXJ8XCIrXG4gXCJAYW1oZWFyfFwiK1xuIFwiQG90b3VjaHxcIitcbiBcIkBvdGFzdGV8XCIrXG4gXCJAZHJvcHxcIitcbiBcIkBvZHJvcHxcIitcbiBcIkBhZHJvcHxcIitcbiBcIkBkcm9wZmFpbHxcIitcbiBcIkBvZHJvcGZhaWx8XCIrXG4gXCJAc21lbGx8XCIrXG4gXCJAb2VtaXR8XCIrXG4gXCJAZW1pdHxcIitcbiBcIkBwZW1pdHxcIitcbiBcIkBwYXJlbnR8XCIrXG4gXCJAY2xvbmV8XCIrXG4gXCJAdGFzdGV8XCIrXG4gXCJ3aGlzcGVyfFwiK1xuIFwicGFnZXxcIitcbiBcInNheXxcIitcbiBcInBvc2V8XCIrXG4gXCJzZW1pcG9zZXxcIitcbiBcInRlYWNofFwiK1xuIFwidG91Y2h8XCIrXG4gXCJ0YXN0ZXxcIitcbiBcInNtZWxsfFwiK1xuIFwibGlzdGVufFwiK1xuIFwibG9va3xcIitcbiBcIm1vdmV8XCIrXG4gXCJnb3xcIitcbiBcImhvbWV8XCIrXG4gXCJmb2xsb3d8XCIrXG4gXCJ1bmZvbGxvd3xcIitcbiBcImRlc2VydHxcIitcbiBcImRpc21pc3N8XCIrXG4gXCJAdGVsXCJcbiAgICApO1xuXG4gICAgdmFyIGJ1aWx0aW5Db25zdGFudHMgPSAoXG4gICAgICAgIFwiPSMwXCJcbiAgICApO1xuXG4gICAgdmFyIGJ1aWx0aW5GdW5jdGlvbnMgPSAoXG4gXCJkZWZhdWx0fFwiK1xuIFwiZWRlZmF1bHR8XCIrXG4gXCJldmFsfFwiK1xuIFwiZ2V0X2V2YWx8XCIrXG4gXCJnZXR8XCIrXG4gXCJncmVwfFwiK1xuIFwiZ3JlcGl8XCIrXG4gXCJoYXNhdHRyfFwiK1xuIFwiaGFzYXR0cnB8XCIrXG4gXCJoYXNhdHRydmFsfFwiK1xuIFwiaGFzYXR0cnB2YWx8XCIrXG4gXCJsYXR0cnxcIitcbiBcIm5hdHRyfFwiK1xuIFwicG9zc3xcIitcbiBcInVkZWZhdWx0fFwiK1xuIFwidWZ1bnxcIitcbiBcInV8XCIrXG4gXCJ2fFwiK1xuIFwidWxkZWZhdWx0fFwiK1xuIFwieGdldHxcIitcbiBcInpmdW58XCIrXG4gXCJiYW5kfFwiK1xuIFwiYm5hbmR8XCIrXG4gXCJibm90fFwiK1xuIFwiYm9yfFwiK1xuIFwiYnhvcnxcIitcbiBcInNobHxcIitcbiBcInNocnxcIitcbiBcImFuZHxcIitcbiBcImNhbmR8XCIrXG4gXCJjb3J8XCIrXG4gXCJlcXxcIitcbiBcImd0fFwiK1xuIFwiZ3RlfFwiK1xuIFwibHR8XCIrXG4gXCJsdGV8XCIrXG4gXCJuYW5kfFwiK1xuIFwibmVxfFwiK1xuIFwibm9yfFwiK1xuIFwibm90fFwiK1xuIFwib3J8XCIrXG4gXCJ0fFwiK1xuIFwieG9yfFwiK1xuIFwiY29ufFwiK1xuIFwiZW50cmFuY2VzfFwiK1xuIFwiZXhpdHxcIitcbiBcImZvbGxvd2Vyc3xcIitcbiBcImhvbWV8XCIrXG4gXCJsY29ufFwiK1xuIFwibGV4aXRzfFwiK1xuIFwibG9jfFwiK1xuIFwibG9jYXRlfFwiK1xuIFwibHBhcmVudHxcIitcbiBcImxzZWFyY2h8XCIrXG4gXCJuZXh0fFwiK1xuIFwibnVtfFwiK1xuIFwib3duZXJ8XCIrXG4gXCJwYXJlbnR8XCIrXG4gXCJwbWF0Y2h8XCIrXG4gXCJybG9jfFwiK1xuIFwicm51bXxcIitcbiBcInJvb218XCIrXG4gXCJ3aGVyZXxcIitcbiBcInpvbmV8XCIrXG4gXCJ3b3JufFwiK1xuIFwiaGVsZHxcIitcbiBcImNhcnJpZWR8XCIrXG4gXCJhY29zfFwiK1xuIFwiYXNpbnxcIitcbiBcImF0YW58XCIrXG4gXCJjZWlsfFwiK1xuIFwiY29zfFwiK1xuIFwiZXxcIitcbiBcImV4cHxcIitcbiBcImZkaXZ8XCIrXG4gXCJmbW9kfFwiK1xuIFwiZmxvb3J8XCIrXG4gXCJsb2d8XCIrXG4gXCJsbnxcIitcbiBcInBpfFwiK1xuIFwicG93ZXJ8XCIrXG4gXCJyb3VuZHxcIitcbiBcInNpbnxcIitcbiBcInNxcnR8XCIrXG4gXCJ0YW58XCIrXG4gXCJhcG9zc3xcIitcbiBcImFuZGZsYWdzfFwiK1xuIFwiY29ubnxcIitcbiBcImNvbW1hbmRzc2VudHxcIitcbiBcImNvbnRyb2xzfFwiK1xuIFwiZG9pbmd8XCIrXG4gXCJlbG9ja3xcIitcbiBcImZpbmRhYmxlfFwiK1xuIFwiZmxhZ3N8XCIrXG4gXCJmdWxsbmFtZXxcIitcbiBcImhhc2ZsYWd8XCIrXG4gXCJoYXNwb3dlcnxcIitcbiBcImhhc3R5cGV8XCIrXG4gXCJoaWRkZW58XCIrXG4gXCJpZGxlfFwiK1xuIFwiaXNiYWtlcnxcIitcbiBcImxvY2t8XCIrXG4gXCJsc3RhdHN8XCIrXG4gXCJtb25leXxcIitcbiBcIndob3xcIitcbiBcIm5hbWV8XCIrXG4gXCJuZWFyYnl8XCIrXG4gXCJvYmp8XCIrXG4gXCJvYmpmbGFnc3xcIitcbiBcInBob3RvfFwiK1xuIFwicG9sbHxcIitcbiBcInBvd2Vyc3xcIitcbiBcInBlbmRpbmd0ZXh0fFwiK1xuIFwicmVjZWl2ZWR0ZXh0fFwiK1xuIFwicmVzdGFydHN8XCIrXG4gXCJyZXN0YXJ0dGltZXxcIitcbiBcInN1Ymp8XCIrXG4gXCJzaG9ydGVzdHBhdGh8XCIrXG4gXCJ0bW9uZXl8XCIrXG4gXCJ0eXBlfFwiK1xuIFwidmlzaWJsZXxcIitcbiBcImNhdHxcIitcbiBcImVsZW1lbnR8XCIrXG4gXCJlbGVtZW50c3xcIitcbiBcImV4dHJhY3R8XCIrXG4gXCJmaWx0ZXJ8XCIrXG4gXCJmaWx0ZXJib29sfFwiK1xuIFwiZmlyc3R8XCIrXG4gXCJmb3JlYWNofFwiK1xuIFwiZm9sZHxcIitcbiBcImdyYWJ8XCIrXG4gXCJncmFiYWxsfFwiK1xuIFwiaW5kZXh8XCIrXG4gXCJpbnNlcnR8XCIrXG4gXCJpdGVtaXplfFwiK1xuIFwiaXRlbXN8XCIrXG4gXCJpdGVyfFwiK1xuIFwibGFzdHxcIitcbiBcImxkZWxldGV8XCIrXG4gXCJtYXB8XCIrXG4gXCJtYXRjaHxcIitcbiBcIm1hdGNoYWxsfFwiK1xuIFwibWVtYmVyfFwiK1xuIFwibWl4fFwiK1xuIFwibXVuZ2V8XCIrXG4gXCJwaWNrfFwiK1xuIFwicmVtb3ZlfFwiK1xuIFwicmVwbGFjZXxcIitcbiBcInJlc3R8XCIrXG4gXCJyZXZ3b3Jkc3xcIitcbiBcInNldGRpZmZ8XCIrXG4gXCJzZXRpbnRlcnxcIitcbiBcInNldHVuaW9ufFwiK1xuIFwic2h1ZmZsZXxcIitcbiBcInNvcnR8XCIrXG4gXCJzb3J0Ynl8XCIrXG4gXCJzcGxpY2V8XCIrXG4gXCJzdGVwfFwiK1xuIFwid29yZHBvc3xcIitcbiBcIndvcmRzfFwiK1xuIFwiYWRkfFwiK1xuIFwibG1hdGh8XCIrXG4gXCJtYXh8XCIrXG4gXCJtZWFufFwiK1xuIFwibWVkaWFufFwiK1xuIFwibWlufFwiK1xuIFwibXVsfFwiK1xuIFwicGVyY2VudHxcIitcbiBcInNpZ258XCIrXG4gXCJzdGRkZXZ8XCIrXG4gXCJzdWJ8XCIrXG4gXCJ2YWx8XCIrXG4gXCJib3VuZHxcIitcbiBcImFic3xcIitcbiBcImluY3xcIitcbiBcImRlY3xcIitcbiBcImRpc3QyZHxcIitcbiBcImRpc3QzZHxcIitcbiBcImRpdnxcIitcbiBcImZsb29yZGl2fFwiK1xuIFwibW9kfFwiK1xuIFwibW9kdWxvfFwiK1xuIFwicmVtYWluZGVyfFwiK1xuIFwidmFkZHxcIitcbiBcInZkaW18XCIrXG4gXCJ2ZG90fFwiK1xuIFwidm1hZ3xcIitcbiBcInZtYXh8XCIrXG4gXCJ2bWlufFwiK1xuIFwidm11bHxcIitcbiBcInZzdWJ8XCIrXG4gXCJ2dW5pdHxcIitcbiBcInJlZ2VkaXR8XCIrXG4gXCJyZWdlZGl0YWxsfFwiK1xuIFwicmVnZWRpdGFsbGl8XCIrXG4gXCJyZWdlZGl0aXxcIitcbiBcInJlZ21hdGNofFwiK1xuIFwicmVnbWF0Y2hpfFwiK1xuIFwicmVncmFifFwiK1xuIFwicmVncmFiYWxsfFwiK1xuIFwicmVncmFiYWxsaXxcIitcbiBcInJlZ3JhYml8XCIrXG4gXCJyZWdyZXB8XCIrXG4gXCJyZWdyZXBpfFwiK1xuIFwiYWZ0ZXJ8XCIrXG4gXCJhbHBoYW1pbnxcIitcbiBcImFscGhhbWF4fFwiK1xuIFwiYXJ0fFwiK1xuIFwiYmVmb3JlfFwiK1xuIFwiYnJhY2tldHN8XCIrXG4gXCJjYXBzdHJ8XCIrXG4gXCJjYXNlfFwiK1xuIFwiY2FzZWFsbHxcIitcbiBcImNlbnRlcnxcIitcbiBcImNvbnRhaW5zZmFuc2l8XCIrXG4gXCJjb21wfFwiK1xuIFwiZGVjb21wb3NlfFwiK1xuIFwiZGVjcnlwdHxcIitcbiBcImRlbGV0ZXxcIitcbiBcImVkaXR8XCIrXG4gXCJlbmNyeXB0fFwiK1xuIFwiZXNjYXBlfFwiK1xuIFwiaWZ8XCIrXG4gXCJpZmVsc2V8XCIrXG4gXCJsY3N0cnxcIitcbiBcImxlZnR8XCIrXG4gXCJsaXR8XCIrXG4gXCJsanVzdHxcIitcbiBcIm1lcmdlfFwiK1xuIFwibWlkfFwiK1xuIFwib3N0cmxlbnxcIitcbiBcInBvc3xcIitcbiBcInJlcGVhdHxcIitcbiBcInJldmVyc2V8XCIrXG4gXCJyaWdodHxcIitcbiBcInJqdXN0fFwiK1xuIFwic2NyYW1ibGV8XCIrXG4gXCJzZWN1cmV8XCIrXG4gXCJzcGFjZXxcIitcbiBcInNwZWxsbnVtfFwiK1xuIFwic3F1aXNofFwiK1xuIFwic3RyY2F0fFwiK1xuIFwic3RybWF0Y2h8XCIrXG4gXCJzdHJpbnNlcnR8XCIrXG4gXCJzdHJpcGFuc2l8XCIrXG4gXCJzdHJpcGZhbnNpfFwiK1xuIFwic3RybGVufFwiK1xuIFwic3dpdGNofFwiK1xuIFwic3dpdGNoYWxsfFwiK1xuIFwidGFibGV8XCIrXG4gXCJ0cnxcIitcbiBcInRyaW18XCIrXG4gXCJ1Y3N0cnxcIitcbiBcInVuc2FmZXxcIitcbiBcIndyYXB8XCIrXG4gXCJjdGl0bGV8XCIrXG4gXCJjd2hvfFwiK1xuIFwiY2hhbm5lbHN8XCIrXG4gXCJjbG9ja3xcIitcbiBcImNmbGFnc3xcIitcbiBcImlsZXZ8XCIrXG4gXCJpdGV4dHxcIitcbiBcImludW18XCIrXG4gXCJjb252c2Vjc3xcIitcbiBcImNvbnZ1dGNzZWNzfFwiK1xuIFwiY29udnRpbWV8XCIrXG4gXCJjdGltZXxcIitcbiBcImV0aW1lZm10fFwiK1xuIFwiaXNkYXlsaWdodHxcIitcbiBcIm10aW1lfFwiK1xuIFwic2Vjc3xcIitcbiBcIm1zZWNzfFwiK1xuIFwic3RhcnR0aW1lfFwiK1xuIFwidGltZXxcIitcbiBcInRpbWVmbXR8XCIrXG4gXCJ0aW1lc3RyaW5nfFwiK1xuIFwidXRjdGltZXxcIitcbiBcImF0cmxvY2t8XCIrXG4gXCJjbG9uZXxcIitcbiBcImNyZWF0ZXxcIitcbiBcImNvb2t8XCIrXG4gXCJkaWd8XCIrXG4gXCJlbWl0fFwiK1xuIFwibGVtaXR8XCIrXG4gXCJsaW5rfFwiK1xuIFwib2VtaXR8XCIrXG4gXCJvcGVufFwiK1xuIFwicGVtaXR8XCIrXG4gXCJyZW1pdHxcIitcbiBcInNldHxcIitcbiBcInRlbHxcIitcbiBcIndpcGV8XCIrXG4gXCJ6ZW1pdHxcIitcbiBcImZiY3JlYXRlfFwiK1xuIFwiZmJkZXN0cm95fFwiK1xuIFwiZmJ3cml0ZXxcIitcbiBcImZiY2xlYXJ8XCIrXG4gXCJmYmNvcHl8XCIrXG4gXCJmYmNvcHl0b3xcIitcbiBcImZiY2xpcHxcIitcbiBcImZiZHVtcHxcIitcbiBcImZiZmx1c2h8XCIrXG4gXCJmYmhzZXR8XCIrXG4gXCJmYmxpc3R8XCIrXG4gXCJmYnN0YXRzfFwiK1xuIFwicWVudHJpZXN8XCIrXG4gXCJxZW50cnl8XCIrXG4gXCJwbGF5fFwiK1xuIFwiYW5zaXxcIitcbiBcImJyZWFrfFwiK1xuIFwiY3xcIitcbiBcImFzY3xcIitcbiBcImRpZXxcIitcbiBcImlzZGJyZWZ8XCIrXG4gXCJpc2ludHxcIitcbiBcImlzbnVtfFwiK1xuIFwiaXNsZXR0ZXJzfFwiK1xuIFwibGluZWNvb3Jkc3xcIitcbiBcImxvY2FsaXplfFwiK1xuIFwibG51bXxcIitcbiBcIm5hbWVzaG9ydHxcIitcbiBcIm51bGx8XCIrXG4gXCJvYmpldmFsfFwiK1xuIFwicnxcIitcbiBcInJhbmR8XCIrXG4gXCJzfFwiK1xuIFwic2V0cXxcIitcbiBcInNldHJ8XCIrXG4gXCJzb3VuZGV4fFwiK1xuIFwic291bmRzbGlrZXxcIitcbiBcInZhbGlkfFwiK1xuIFwidmNoYXJ0fFwiK1xuIFwidmNoYXJ0MnxcIitcbiBcInZsYWJlbHxcIitcbiBcIkBAfFwiK1xuIFwiYmFrZXJkYXlzfFwiK1xuIFwiYm9keWJ1aWxkfFwiK1xuIFwiYm94fFwiK1xuIFwiY2FwYWxsfFwiK1xuIFwiY2F0YWxvZ3xcIitcbiBcImNoaWxkcmVufFwiK1xuIFwiY3RyYWlsZXJ8XCIrXG4gXCJkYXJ0dGltZXxcIitcbiBcImRlYnR8XCIrXG4gXCJkZXRhaWxiYXJ8XCIrXG4gXCJleHBsb3JlZHJvb218XCIrXG4gXCJmYW5zaXRvYW5zaXxcIitcbiBcImZhbnNpdG94YW5zaXxcIitcbiBcImZ1bGxiYXJ8XCIrXG4gXCJoYWxmYmFyfFwiK1xuIFwiaXNkYXJ0ZWR8XCIrXG4gXCJpc25ld2JpZXxcIitcbiBcImlzd29yZHxcIitcbiBcImxhbWJkYXxcIitcbiBcImxvYmplY3RzfFwiK1xuIFwibHBsYXllcnN8XCIrXG4gXCJsdGhpbmdzfFwiK1xuIFwibHZleGl0c3xcIitcbiBcImx2b2JqZWN0c3xcIitcbiBcImx2cGxheWVyc3xcIitcbiBcImx2dGhpbmdzfFwiK1xuIFwibmV3c3dyYXB8XCIrXG4gXCJudW1zdWZmaXh8XCIrXG4gXCJwbGF5ZXJzb258XCIrXG4gXCJwbGF5ZXJzdGhpc3dlZWt8XCIrXG4gXCJyYW5kb21hZHxcIitcbiBcInJhbmR3b3JkfFwiK1xuIFwicmVhbHJhbmR3b3JkfFwiK1xuIFwicmVwbGFjZWNocnxcIitcbiBcInNlY29uZHxcIitcbiBcInNwbGl0YW1vdW50fFwiK1xuIFwic3RybGVuYWxsfFwiK1xuIFwidGV4dHxcIitcbiBcInRoaXJkfFwiK1xuIFwidG9mYW5zaXxcIitcbiBcInRvdGFsYWN8XCIrXG4gXCJ1bmlxdWV8XCIrXG4gXCJnZXRhZGRyZXNzcm9vbXxcIitcbiBcImxpc3Rwcm9wZXJ0eWNvbW18XCIrXG4gXCJsaXN0cHJvcGVydHlyZXN8XCIrXG4gXCJsb3Rvd25lcnxcIitcbiBcImxvdHJhdGluZ3xcIitcbiBcImxvdHJhdGluZ2NvdW50fFwiK1xuIFwibG90dmFsdWV8XCIrXG4gXCJib3VnaHRwcm9kdWN0fFwiK1xuIFwiY29tcGFueWFiYnxcIitcbiBcImNvbXBhbnlpY29ufFwiK1xuIFwiY29tcGFueWxpc3R8XCIrXG4gXCJjb21wYW55bmFtZXxcIitcbiBcImNvbXBhbnlvd25lcnN8XCIrXG4gXCJjb21wYW55dmFsdWV8XCIrXG4gXCJlbXBsb3llZXN8XCIrXG4gXCJpbnZlc3RlZHxcIitcbiBcInByb2R1Y3RsaXN0fFwiK1xuIFwicHJvZHVjdG5hbWV8XCIrXG4gXCJwcm9kdWN0b3duZXJzfFwiK1xuIFwicHJvZHVjdHJhdGluZ3xcIitcbiBcInByb2R1Y3RyYXRpbmdjb3VudHxcIitcbiBcInByb2R1Y3Rzb2xkYXR8XCIrXG4gXCJwcm9kdWN0dHlwZXxcIitcbiBcInJhdGVkcHJvZHVjdHxcIitcbiBcInNvbGRwcm9kdWN0fFwiK1xuIFwidG9wcHJvZHVjdHN8XCIrXG4gXCJ0b3RhbHNwZW50b25wcm9kdWN0fFwiK1xuIFwidG90YWxzdG9ja3xcIitcbiBcInRyYW5zZmVybW9uZXl8XCIrXG4gXCJ1bmlxdWVidXllcmNvdW50fFwiK1xuIFwidW5pcXVlcHJvZHVjdHNib3VnaHR8XCIrXG4gXCJ2YWxpZGNvbXBhbnl8XCIrXG4gXCJkZWxldGVwaWN0dXJlfFwiK1xuIFwiZmJzYXZlfFwiK1xuIFwiZ2V0cGljdHVyZXNlY3VyaXR5fFwiK1xuIFwiaGFzcGljdHVyZXxcIitcbiBcImxpc3RwaWN0dXJlc3xcIitcbiBcInBpY3R1cmVzaXplfFwiK1xuIFwicmVwbGFjZWNvbG9yfFwiK1xuIFwicmdidG9jb2xvcnxcIitcbiBcInNhdmVwaWN0dXJlfFwiK1xuIFwic2V0cGljdHVyZXNlY3VyaXR5fFwiK1xuIFwic2hvd3BpY3R1cmV8XCIrXG4gXCJwaWVjaGFydHxcIitcbiBcInBpZWNoYXJ0bGFiZWx8XCIrXG4gXCJjcmVhdGVtYXplfFwiK1xuIFwiZHJhd21hemV8XCIrXG4gXCJkcmF3d2lyZWZyYW1lXCJcbiAgICApO1xuICAgIHZhciBrZXl3b3JkTWFwcGVyID0gdGhpcy5jcmVhdGVLZXl3b3JkTWFwcGVyKHtcbiAgICAgICAgXCJpbnZhbGlkLmRlcHJlY2F0ZWRcIjogXCJkZWJ1Z2dlclwiLFxuICAgICAgICBcInN1cHBvcnQuZnVuY3Rpb25cIjogYnVpbHRpbkZ1bmN0aW9ucyxcbiAgICAgICAgXCJjb25zdGFudC5sYW5ndWFnZVwiOiBidWlsdGluQ29uc3RhbnRzLFxuICAgICAgICBcImtleXdvcmRcIjoga2V5d29yZHNcbiAgICB9LCBcImlkZW50aWZpZXJcIik7XG5cbiAgICB2YXIgc3RyUHJlID0gXCIoPzpyfHV8dXJ8UnxVfFVSfFVyfHVSKT9cIjtcblxuICAgIHZhciBkZWNpbWFsSW50ZWdlciA9IFwiKD86KD86WzEtOV1cXFxcZCopfCg/OjApKVwiO1xuICAgIHZhciBvY3RJbnRlZ2VyID0gXCIoPzowW29PXT9bMC03XSspXCI7XG4gICAgdmFyIGhleEludGVnZXIgPSBcIig/OjBbeFhdW1xcXFxkQS1GYS1mXSspXCI7XG4gICAgdmFyIGJpbkludGVnZXIgPSBcIig/OjBbYkJdWzAxXSspXCI7XG4gICAgdmFyIGludGVnZXIgPSBcIig/OlwiICsgZGVjaW1hbEludGVnZXIgKyBcInxcIiArIG9jdEludGVnZXIgKyBcInxcIiArIGhleEludGVnZXIgKyBcInxcIiArIGJpbkludGVnZXIgKyBcIilcIjtcblxuICAgIHZhciBleHBvbmVudCA9IFwiKD86W2VFXVsrLV0/XFxcXGQrKVwiO1xuICAgIHZhciBmcmFjdGlvbiA9IFwiKD86XFxcXC5cXFxcZCspXCI7XG4gICAgdmFyIGludFBhcnQgPSBcIig/OlxcXFxkKylcIjtcbiAgICB2YXIgcG9pbnRGbG9hdCA9IFwiKD86KD86XCIgKyBpbnRQYXJ0ICsgXCI/XCIgKyBmcmFjdGlvbiArIFwiKXwoPzpcIiArIGludFBhcnQgKyBcIlxcXFwuKSlcIjtcbiAgICB2YXIgZXhwb25lbnRGbG9hdCA9IFwiKD86KD86XCIgKyBwb2ludEZsb2F0ICsgXCJ8XCIgKyAgaW50UGFydCArIFwiKVwiICsgZXhwb25lbnQgKyBcIilcIjtcbiAgICB2YXIgZmxvYXROdW1iZXIgPSBcIig/OlwiICsgZXhwb25lbnRGbG9hdCArIFwifFwiICsgcG9pbnRGbG9hdCArIFwiKVwiO1xuXG4gICAgdGhpcy4kcnVsZXMgPSB7XG4gICAgICAgIFwic3RhcnRcIiA6IFtcbiAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGVcIiwgLy8gbXVzaCBzdWJzdGl0dXRpb24gcmVnaXN0ZXJcbiAgICAgICAgICAgICAgICByZWdleCA6IFwiJVswLTldezF9XCJcbiAgICAgICAgIH0sXG4gICAgICAgICB7XG4gICAgICAgICAgICAgICAgdG9rZW4gOiBcInZhcmlhYmxlXCIsIC8vIG11c2ggc3Vic3RpdHV0aW9uIHJlZ2lzdGVyXG4gICAgICAgICAgICAgICAgcmVnZXggOiBcIiVxWzAtOUEtWmEtel17MX1cIlxuICAgICAgICAgfSxcbiAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA6IFwidmFyaWFibGVcIiwgLy8gbXVzaCBzcGVjaWFsIGNoYXJhY3RlciByZWdpc3RlclxuICAgICAgICAgICAgICAgIHJlZ2V4IDogXCIlW2EtekEtWl17MX1cIlxuICAgICAgICAgfSxcbiAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogXCJ2YXJpYWJsZS5sYW5ndWFnZVwiLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiBcIiVbYS16MC05LV9dK1wiXG4gICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBpbWFnaW5hcnlcbiAgICAgICAgICAgIHJlZ2V4IDogXCIoPzpcIiArIGZsb2F0TnVtYmVyICsgXCJ8XFxcXGQrKVtqSl1cXFxcYlwiXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGZsb2F0XG4gICAgICAgICAgICByZWdleCA6IGZsb2F0TnVtYmVyXG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIHRva2VuIDogXCJjb25zdGFudC5udW1lcmljXCIsIC8vIGxvbmcgaW50ZWdlclxuICAgICAgICAgICAgcmVnZXggOiBpbnRlZ2VyICsgXCJbbExdXFxcXGJcIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwiY29uc3RhbnQubnVtZXJpY1wiLCAvLyBpbnRlZ2VyXG4gICAgICAgICAgICByZWdleCA6IGludGVnZXIgKyBcIlxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBrZXl3b3JkTWFwcGVyLFxuICAgICAgICAgICAgcmVnZXggOiBcIlthLXpBLVpfJF1bYS16QS1aMC05XyRdKlxcXFxiXCJcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgdG9rZW4gOiBcImtleXdvcmQub3BlcmF0b3JcIixcbiAgICAgICAgICAgIHJlZ2V4IDogXCJcXFxcK3xcXFxcLXxcXFxcKnxcXFxcKlxcXFwqfFxcXFwvfFxcXFwvXFxcXC98I3wlfDw8fD4+fFxcXFx8fFxcXFxefH58PHw+fDw9fD0+fD09fCE9fDw+fD1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ubHBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW1xcXFxbXFxcXChcXFxce11cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwicGFyZW4ucnBhcmVuXCIsXG4gICAgICAgICAgICByZWdleCA6IFwiW1xcXFxdXFxcXClcXFxcfV1cIlxuICAgICAgICB9LCB7XG4gICAgICAgICAgICB0b2tlbiA6IFwidGV4dFwiLFxuICAgICAgICAgICAgcmVnZXggOiBcIlxcXFxzK1wiXG4gICAgICAgIH0gXVxuICAgIH07XG59O1xuXG5vb3AuaW5oZXJpdHMoTXVzaENvZGVSdWxlcywgVGV4dEhpZ2hsaWdodFJ1bGVzKTtcblxuZXhwb3J0cy5NdXNoQ29kZVJ1bGVzID0gTXVzaENvZGVSdWxlcztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==