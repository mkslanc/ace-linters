"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4583],{

/***/ 64583:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var AssemblyARM32HighlightRules = (__webpack_require__(58292)/* .AssemblyARM32HighlightRules */ .V);
var FoldMode = (__webpack_require__(69261)/* .FoldMode */ .l);

var Mode = function() {
    this.HighlightRules = AssemblyARM32HighlightRules;
    this.foldingRules = new FoldMode();
    this.$behaviour = this.$defaultBehaviour;
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = [";"];
	this.blockComment = {start: "/*", end: "*/"};
    this.$id = "ace/mode/assembly_arm32";
}).call(Mode.prototype);

exports.Mode = Mode;

/***/ }),

/***/ 58292:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var AssemblyARM32HighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = { 
        start: [ 
            { 
                token: 'keyword.control.assembly',
                // should cover every instruction listed in https://pages.cs.wisc.edu/~markhill/restricted/arm_isa_quick_reference.pdf
                regex: '\\b(?:cpsid|cpsie|cps|setend|(?:srs|rfe)(?:ia|ib|da|db|fd|ed|fa|ea)|bkpt|nop|pld|cdp2|mrc2|mrrc2|mcr2|mcrr2|ldc2|stc2|(?:add|adc|sub|sbc|rsb|rsc|mul|mla|umull|umlal|smull|smlal|mvn|and|eor|orr|bic)(?:eq|ne|cs|hs|cc|lo|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al)?s?|(?:(?:q|qd)?(?:add|sub)|umaal|smul(?:b|t)(?:b|t)|smulw(?:b|t)|smla(?:b|t)(?:b|t)|smlaw(?:b|t)|smlal(?:b|t)(?:b|t)|smuadx?|smladx?|smlaldx?|smusdx?|smlsdx?|smlsldx?|smmulr?|smmlar?|smmlsr?|mia|miaph|mia(?:b|t)(?:b|t)|clz|(?:s|q|sh|u|uq|uh)(?:add16|sub16|add8|sub8|addsubx|subaddx)|usad8|usada8|mrs|msr|mra|mar|cpy|tst|teq|cmp|cmn|ssat|ssat16|usat|usat16|pkhbt|pkhtb|sxth|sxtb16|sxtb|uxth|uxtb16|uxtb|sxtah|sxtab16|sxtab|uxtah|uxtab16|uxtab|rev|rev16|revsh|sel|b|bl|bx|blx|bxj|swi|svc|ldrex|strex|cdp|mrc|mrrc|mcr|mcrr|ldc|stc)(?:eq|ne|cs|hs|cc|lo|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al)?|ldr(?:eq|ne|cs|hs|cc|lo|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al)?(?:t|b|bt|sb|h|sh|d)?|str(?:eq|ne|cs|hs|cc|lo|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al)?(?:t|b|bt|h|d)?|(?:ldm|stm)(?:eq|ne|cs|hs|cc|lo|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al)?(?:ia|ib|da|db|fd|ed|fa|ea)|swp(?:eq|ne|cs|hs|cc|lo|mi|pl|vs|vc|hi|ls|ge|lt|gt|le|al)?b?|mov(?:t|w)?)\\b',
                caseInsensitive: true
            },
            { 
                token: 'variable.parameter.register.assembly', 
                //          first half are actual registers until spsr, where it changes to fields and flexible operands
                regex: '\\b(?:r0|r1|r2|r3|r4|r5|r6|r7|r8|r9|r10|r11|r12|r13|r14|r15|fp|ip|sp|lr|pc|cpsr|spsr|c|f|s|x|lsl|lsr|asr|ror|rrx)\\b',
                caseInsensitive: true 
            },
            { 
                token: 'constant.character.hexadecimal.assembly',
                regex: '#0x[A-F0-9]+',
                caseInsensitive: true 
            },
            { 
                token: 'constant.character.decimal.assembly',
                regex: '#[0-9]+' 
            },
            { 
                token: 'string.assembly', 
                regex: /'([^\\']|\\.)*'/ 
            },
            { 
                token: 'string.assembly', 
                regex: /"([^\\"]|\\.)*"/ 
            },
            { 
                token: 'support.function.directive.assembly',
                regex: '(?:\.section|\.global|\.text|\.asciz|\.asciiz|\.ascii|\.align|\.byte|\.end|\.data|\.equ|\.extern|\.include)'
            },
            { 
                token: 'entity.name.function.assembly', 
                regex: '^\\s*%%[\\w.]+?:$' 
            },
            { 
                token: 'entity.name.function.assembly', 
                regex: '^\\s*%\\$[\\w.]+?:$' 
            },
            {
                token: 'entity.name.function.assembly', 
                regex: '^[\\w.]+?:' 
            },
            { 
                token: 'entity.name.function.assembly', 
                regex: '^[\\w.]+?\\b'
            },
            {
                token: 'comment.assembly', 
                regex: '\\/\\*', next: 'comment'
            },
            { 
                token: 'comment.assembly', 
                regex: '(?:;|//|@).*$' 
            } 
        ],
        comment:[
            {
                token: 'comment.assembly',
                regex: '\\*\\/', next:'start'
            },
            {
                defaultToken:'comment'
            }
        ]
    };
    
    this.normalizeRules();
};

AssemblyARM32HighlightRules.metaData = { fileTypes: [ 's' ],
      name: 'Assembly ARM32',
      scopeName: 'source.assembly' };


oop.inherits(AssemblyARM32HighlightRules, TextHighlightRules);

exports.V = AssemblyARM32HighlightRules;


/***/ }),

/***/ 69261:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);
var Range = (__webpack_require__(91902)/* .Range */ .Q);

var FoldMode = exports.l = function() {};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    this.commentBlock = function(session, row) {
        var re = /\S/;
        var line = session.getLine(row);
        var startLevel = line.search(re);
        if (startLevel == -1 || line[startLevel] != "#")
            return;

        var startColumn = line.length;
        var maxRow = session.getLength();
        var startRow = row;
        var endRow = row;

        while (++row < maxRow) {
            line = session.getLine(row);
            var level = line.search(re);

            if (level == -1)
                continue;

            if (line[level] != "#")
                break;

            endRow = row;
        }

        if (endRow > startRow) {
            var endColumn = session.getLine(endRow).length;
            return new Range(startRow, startColumn, endRow, endColumn);
        }
    };

    this.getFoldWidgetRange = function(session, foldStyle, row) {
        var range = this.indentationBlock(session, row);
        if (range)
            return range;

        range = this.commentBlock(session, row);
        if (range)
            return range;
    };

    // must return "" if there's no fold, to enable caching
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
        var indent = line.search(/\S/);
        var next = session.getLine(row + 1);
        var prev = session.getLine(row - 1);
        var prevIndent = prev.search(/\S/);
        var nextIndent = next.search(/\S/);

        if (indent == -1) {
            session.foldWidgets[row - 1] = prevIndent!= -1 && prevIndent < nextIndent ? "start" : "";
            return "";
        }

        // documentation comments
        if (prevIndent == -1) {
            if (indent == nextIndent && line[indent] == "#" && next[indent] == "#") {
                session.foldWidgets[row - 1] = "";
                session.foldWidgets[row + 1] = "";
                return "start";
            }
        } else if (prevIndent == indent && line[indent] == "#" && prev[indent] == "#") {
            if (session.getLine(row - 2).search(/\S/) == -1) {
                session.foldWidgets[row - 1] = "start";
                session.foldWidgets[row + 1] = "";
                return "";
            }
        }

        if (prevIndent!= -1 && prevIndent < indent)
            session.foldWidgets[row - 1] = "start";
        else
            session.foldWidgets[row - 1] = "";

        if (indent < nextIndent)
            return "start";
        else
            return "";
    };

}).call(FoldMode.prototype);


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLjQ1ODMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLElBQVk7QUFDOUIsZUFBZSxpQ0FBc0I7QUFDckMsa0NBQWtDLGlFQUF1RTtBQUN6RyxlQUFlLDhDQUFvQzs7QUFFbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCO0FBQy9CLHNCQUFzQjtBQUN0QjtBQUNBLENBQUM7O0FBRUQsWUFBWTs7Ozs7OztBQ3BCQzs7QUFFYixVQUFVLG1CQUFPLENBQUMsSUFBWTtBQUM5Qix5QkFBeUIsd0RBQW9EOztBQUU3RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlDQUF5QztBQUN6QztBQUNBOzs7QUFHQTs7QUFFQSxTQUFtQzs7Ozs7Ozs7QUMxRnRCOztBQUViLFVBQVUsbUJBQU8sQ0FBQyxJQUFlO0FBQ2pDLG1CQUFtQixxQ0FBK0I7QUFDbEQsWUFBWSwyQ0FBNEI7O0FBRXhDLGVBQWUsU0FBZ0I7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9hc3NlbWJseV9hcm0zMi5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2Fzc2VtYmx5X2FybTMyX2hpZ2hsaWdodF9ydWxlcy5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL2ZvbGRpbmcvY29mZmVlLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dE1vZGUgPSByZXF1aXJlKFwiLi90ZXh0XCIpLk1vZGU7XG52YXIgQXNzZW1ibHlBUk0zMkhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vYXNzZW1ibHlfYXJtMzJfaGlnaGxpZ2h0X3J1bGVzXCIpLkFzc2VtYmx5QVJNMzJIaWdobGlnaHRSdWxlcztcbnZhciBGb2xkTW9kZSA9IHJlcXVpcmUoXCIuL2ZvbGRpbmcvY29mZmVlXCIpLkZvbGRNb2RlO1xuXG52YXIgTW9kZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuSGlnaGxpZ2h0UnVsZXMgPSBBc3NlbWJseUFSTTMySGlnaGxpZ2h0UnVsZXM7XG4gICAgdGhpcy5mb2xkaW5nUnVsZXMgPSBuZXcgRm9sZE1vZGUoKTtcbiAgICB0aGlzLiRiZWhhdmlvdXIgPSB0aGlzLiRkZWZhdWx0QmVoYXZpb3VyO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBbXCI7XCJdO1xuXHR0aGlzLmJsb2NrQ29tbWVudCA9IHtzdGFydDogXCIvKlwiLCBlbmQ6IFwiKi9cIn07XG4gICAgdGhpcy4kaWQgPSBcImFjZS9tb2RlL2Fzc2VtYmx5X2FybTMyXCI7XG59KS5jYWxsKE1vZGUucHJvdG90eXBlKTtcblxuZXhwb3J0cy5Nb2RlID0gTW9kZTsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG9vcCA9IHJlcXVpcmUoXCIuLi9saWIvb29wXCIpO1xudmFyIFRleHRIaWdobGlnaHRSdWxlcyA9IHJlcXVpcmUoXCIuL3RleHRfaGlnaGxpZ2h0X3J1bGVzXCIpLlRleHRIaWdobGlnaHRSdWxlcztcblxudmFyIEFzc2VtYmx5QVJNMzJIaWdobGlnaHRSdWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIHJlZ2V4cCBtdXN0IG5vdCBoYXZlIGNhcHR1cmluZyBwYXJlbnRoZXNlcy4gVXNlICg/OikgaW5zdGVhZC5cbiAgICAvLyByZWdleHBzIGFyZSBvcmRlcmVkIC0+IHRoZSBmaXJzdCBtYXRjaCBpcyB1c2VkXG5cbiAgICB0aGlzLiRydWxlcyA9IHsgXG4gICAgICAgIHN0YXJ0OiBbIFxuICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2tleXdvcmQuY29udHJvbC5hc3NlbWJseScsXG4gICAgICAgICAgICAgICAgLy8gc2hvdWxkIGNvdmVyIGV2ZXJ5IGluc3RydWN0aW9uIGxpc3RlZCBpbiBodHRwczovL3BhZ2VzLmNzLndpc2MuZWR1L35tYXJraGlsbC9yZXN0cmljdGVkL2FybV9pc2FfcXVpY2tfcmVmZXJlbmNlLnBkZlxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFxcXGIoPzpjcHNpZHxjcHNpZXxjcHN8c2V0ZW5kfCg/OnNyc3xyZmUpKD86aWF8aWJ8ZGF8ZGJ8ZmR8ZWR8ZmF8ZWEpfGJrcHR8bm9wfHBsZHxjZHAyfG1yYzJ8bXJyYzJ8bWNyMnxtY3JyMnxsZGMyfHN0YzJ8KD86YWRkfGFkY3xzdWJ8c2JjfHJzYnxyc2N8bXVsfG1sYXx1bXVsbHx1bWxhbHxzbXVsbHxzbWxhbHxtdm58YW5kfGVvcnxvcnJ8YmljKSg/OmVxfG5lfGNzfGhzfGNjfGxvfG1pfHBsfHZzfHZjfGhpfGxzfGdlfGx0fGd0fGxlfGFsKT9zP3woPzooPzpxfHFkKT8oPzphZGR8c3ViKXx1bWFhbHxzbXVsKD86Ynx0KSg/OmJ8dCl8c211bHcoPzpifHQpfHNtbGEoPzpifHQpKD86Ynx0KXxzbWxhdyg/OmJ8dCl8c21sYWwoPzpifHQpKD86Ynx0KXxzbXVhZHg/fHNtbGFkeD98c21sYWxkeD98c211c2R4P3xzbWxzZHg/fHNtbHNsZHg/fHNtbXVscj98c21tbGFyP3xzbW1sc3I/fG1pYXxtaWFwaHxtaWEoPzpifHQpKD86Ynx0KXxjbHp8KD86c3xxfHNofHV8dXF8dWgpKD86YWRkMTZ8c3ViMTZ8YWRkOHxzdWI4fGFkZHN1Ynh8c3ViYWRkeCl8dXNhZDh8dXNhZGE4fG1yc3xtc3J8bXJhfG1hcnxjcHl8dHN0fHRlcXxjbXB8Y21ufHNzYXR8c3NhdDE2fHVzYXR8dXNhdDE2fHBraGJ0fHBraHRifHN4dGh8c3h0YjE2fHN4dGJ8dXh0aHx1eHRiMTZ8dXh0YnxzeHRhaHxzeHRhYjE2fHN4dGFifHV4dGFofHV4dGFiMTZ8dXh0YWJ8cmV2fHJldjE2fHJldnNofHNlbHxifGJsfGJ4fGJseHxieGp8c3dpfHN2Y3xsZHJleHxzdHJleHxjZHB8bXJjfG1ycmN8bWNyfG1jcnJ8bGRjfHN0YykoPzplcXxuZXxjc3xoc3xjY3xsb3xtaXxwbHx2c3x2Y3xoaXxsc3xnZXxsdHxndHxsZXxhbCk/fGxkcig/OmVxfG5lfGNzfGhzfGNjfGxvfG1pfHBsfHZzfHZjfGhpfGxzfGdlfGx0fGd0fGxlfGFsKT8oPzp0fGJ8YnR8c2J8aHxzaHxkKT98c3RyKD86ZXF8bmV8Y3N8aHN8Y2N8bG98bWl8cGx8dnN8dmN8aGl8bHN8Z2V8bHR8Z3R8bGV8YWwpPyg/OnR8YnxidHxofGQpP3woPzpsZG18c3RtKSg/OmVxfG5lfGNzfGhzfGNjfGxvfG1pfHBsfHZzfHZjfGhpfGxzfGdlfGx0fGd0fGxlfGFsKT8oPzppYXxpYnxkYXxkYnxmZHxlZHxmYXxlYSl8c3dwKD86ZXF8bmV8Y3N8aHN8Y2N8bG98bWl8cGx8dnN8dmN8aGl8bHN8Z2V8bHR8Z3R8bGV8YWwpP2I/fG1vdig/OnR8dyk/KVxcXFxiJyxcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWVcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgIHRva2VuOiAndmFyaWFibGUucGFyYW1ldGVyLnJlZ2lzdGVyLmFzc2VtYmx5JywgXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgZmlyc3QgaGFsZiBhcmUgYWN0dWFsIHJlZ2lzdGVycyB1bnRpbCBzcHNyLCB3aGVyZSBpdCBjaGFuZ2VzIHRvIGZpZWxkcyBhbmQgZmxleGlibGUgb3BlcmFuZHNcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFxiKD86cjB8cjF8cjJ8cjN8cjR8cjV8cjZ8cjd8cjh8cjl8cjEwfHIxMXxyMTJ8cjEzfHIxNHxyMTV8ZnB8aXB8c3B8bHJ8cGN8Y3BzcnxzcHNyfGN8ZnxzfHh8bHNsfGxzcnxhc3J8cm9yfHJyeClcXFxcYicsXG4gICAgICAgICAgICAgICAgY2FzZUluc2Vuc2l0aXZlOiB0cnVlIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgdG9rZW46ICdjb25zdGFudC5jaGFyYWN0ZXIuaGV4YWRlY2ltYWwuYXNzZW1ibHknLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnIzB4W0EtRjAtOV0rJyxcbiAgICAgICAgICAgICAgICBjYXNlSW5zZW5zaXRpdmU6IHRydWUgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2NvbnN0YW50LmNoYXJhY3Rlci5kZWNpbWFsLmFzc2VtYmx5JyxcbiAgICAgICAgICAgICAgICByZWdleDogJyNbMC05XSsnIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgdG9rZW46ICdzdHJpbmcuYXNzZW1ibHknLCBcbiAgICAgICAgICAgICAgICByZWdleDogLycoW15cXFxcJ118XFxcXC4pKicvIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgdG9rZW46ICdzdHJpbmcuYXNzZW1ibHknLCBcbiAgICAgICAgICAgICAgICByZWdleDogL1wiKFteXFxcXFwiXXxcXFxcLikqXCIvIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgdG9rZW46ICdzdXBwb3J0LmZ1bmN0aW9uLmRpcmVjdGl2ZS5hc3NlbWJseScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICcoPzpcXC5zZWN0aW9ufFxcLmdsb2JhbHxcXC50ZXh0fFxcLmFzY2l6fFxcLmFzY2lpenxcXC5hc2NpaXxcXC5hbGlnbnxcXC5ieXRlfFxcLmVuZHxcXC5kYXRhfFxcLmVxdXxcXC5leHRlcm58XFwuaW5jbHVkZSknXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2VudGl0eS5uYW1lLmZ1bmN0aW9uLmFzc2VtYmx5JywgXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdeXFxcXHMqJSVbXFxcXHcuXSs/OiQnIFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgXG4gICAgICAgICAgICAgICAgdG9rZW46ICdlbnRpdHkubmFtZS5mdW5jdGlvbi5hc3NlbWJseScsIFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXlxcXFxzKiVcXFxcJFtcXFxcdy5dKz86JCcgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRva2VuOiAnZW50aXR5Lm5hbWUuZnVuY3Rpb24uYXNzZW1ibHknLCBcbiAgICAgICAgICAgICAgICByZWdleDogJ15bXFxcXHcuXSs/OicgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgeyBcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2VudGl0eS5uYW1lLmZ1bmN0aW9uLmFzc2VtYmx5JywgXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdeW1xcXFx3Ll0rP1xcXFxiJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2NvbW1lbnQuYXNzZW1ibHknLCBcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFwvXFxcXConLCBuZXh0OiAnY29tbWVudCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IFxuICAgICAgICAgICAgICAgIHRva2VuOiAnY29tbWVudC5hc3NlbWJseScsIFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnKD86O3wvL3xAKS4qJCcgXG4gICAgICAgICAgICB9IFxuICAgICAgICBdLFxuICAgICAgICBjb21tZW50OltcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0b2tlbjogJ2NvbW1lbnQuYXNzZW1ibHknLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFxcXCpcXFxcLycsIG5leHQ6J3N0YXJ0J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VG9rZW46J2NvbW1lbnQnXG4gICAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICB9O1xuICAgIFxuICAgIHRoaXMubm9ybWFsaXplUnVsZXMoKTtcbn07XG5cbkFzc2VtYmx5QVJNMzJIaWdobGlnaHRSdWxlcy5tZXRhRGF0YSA9IHsgZmlsZVR5cGVzOiBbICdzJyBdLFxuICAgICAgbmFtZTogJ0Fzc2VtYmx5IEFSTTMyJyxcbiAgICAgIHNjb3BlTmFtZTogJ3NvdXJjZS5hc3NlbWJseScgfTtcblxuXG5vb3AuaW5oZXJpdHMoQXNzZW1ibHlBUk0zMkhpZ2hsaWdodFJ1bGVzLCBUZXh0SGlnaGxpZ2h0UnVsZXMpO1xuXG5leHBvcnRzLkFzc2VtYmx5QVJNMzJIaWdobGlnaHRSdWxlcyA9IEFzc2VtYmx5QVJNMzJIaWdobGlnaHRSdWxlcztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uLy4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oKSB7fTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuY29tbWVudEJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgcm93KSB7XG4gICAgICAgIHZhciByZSA9IC9cXFMvO1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRMZXZlbCA9IGxpbmUuc2VhcmNoKHJlKTtcbiAgICAgICAgaWYgKHN0YXJ0TGV2ZWwgPT0gLTEgfHwgbGluZVtzdGFydExldmVsXSAhPSBcIiNcIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgc3RhcnRDb2x1bW4gPSBsaW5lLmxlbmd0aDtcbiAgICAgICAgdmFyIG1heFJvdyA9IHNlc3Npb24uZ2V0TGVuZ3RoKCk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIGVuZFJvdyA9IHJvdztcblxuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBsZXZlbCA9IGxpbmUuc2VhcmNoKHJlKTtcblxuICAgICAgICAgICAgaWYgKGxldmVsID09IC0xKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBpZiAobGluZVtsZXZlbF0gIT0gXCIjXCIpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgdmFyIGVuZENvbHVtbiA9IHNlc3Npb24uZ2V0TGluZShlbmRSb3cpLmxlbmd0aDtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUmFuZ2Uoc3RhcnRSb3csIHN0YXJ0Q29sdW1uLCBlbmRSb3csIGVuZENvbHVtbik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0UmFuZ2UgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgcmFuZ2UgPSB0aGlzLmluZGVudGF0aW9uQmxvY2soc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgaWYgKHJhbmdlKVxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuXG4gICAgICAgIHJhbmdlID0gdGhpcy5jb21tZW50QmxvY2soc2Vzc2lvbiwgcm93KTtcbiAgICAgICAgaWYgKHJhbmdlKVxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgIH07XG5cbiAgICAvLyBtdXN0IHJldHVybiBcIlwiIGlmIHRoZXJlJ3Mgbm8gZm9sZCwgdG8gZW5hYmxlIGNhY2hpbmdcbiAgICB0aGlzLmdldEZvbGRXaWRnZXQgPSBmdW5jdGlvbihzZXNzaW9uLCBmb2xkU3R5bGUsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgaW5kZW50ID0gbGluZS5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgbmV4dCA9IHNlc3Npb24uZ2V0TGluZShyb3cgKyAxKTtcbiAgICAgICAgdmFyIHByZXYgPSBzZXNzaW9uLmdldExpbmUocm93IC0gMSk7XG4gICAgICAgIHZhciBwcmV2SW5kZW50ID0gcHJldi5zZWFyY2goL1xcUy8pO1xuICAgICAgICB2YXIgbmV4dEluZGVudCA9IG5leHQuc2VhcmNoKC9cXFMvKTtcblxuICAgICAgICBpZiAoaW5kZW50ID09IC0xKSB7XG4gICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gcHJldkluZGVudCE9IC0xICYmIHByZXZJbmRlbnQgPCBuZXh0SW5kZW50ID8gXCJzdGFydFwiIDogXCJcIjtcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZG9jdW1lbnRhdGlvbiBjb21tZW50c1xuICAgICAgICBpZiAocHJldkluZGVudCA9PSAtMSkge1xuICAgICAgICAgICAgaWYgKGluZGVudCA9PSBuZXh0SW5kZW50ICYmIGxpbmVbaW5kZW50XSA9PSBcIiNcIiAmJiBuZXh0W2luZGVudF0gPT0gXCIjXCIpIHtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyArIDFdID0gXCJcIjtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJzdGFydFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHByZXZJbmRlbnQgPT0gaW5kZW50ICYmIGxpbmVbaW5kZW50XSA9PSBcIiNcIiAmJiBwcmV2W2luZGVudF0gPT0gXCIjXCIpIHtcbiAgICAgICAgICAgIGlmIChzZXNzaW9uLmdldExpbmUocm93IC0gMikuc2VhcmNoKC9cXFMvKSA9PSAtMSkge1xuICAgICAgICAgICAgICAgIHNlc3Npb24uZm9sZFdpZGdldHNbcm93IC0gMV0gPSBcInN0YXJ0XCI7XG4gICAgICAgICAgICAgICAgc2Vzc2lvbi5mb2xkV2lkZ2V0c1tyb3cgKyAxXSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocHJldkluZGVudCE9IC0xICYmIHByZXZJbmRlbnQgPCBpbmRlbnQpXG4gICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJzdGFydFwiO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBzZXNzaW9uLmZvbGRXaWRnZXRzW3JvdyAtIDFdID0gXCJcIjtcblxuICAgICAgICBpZiAoaW5kZW50IDwgbmV4dEluZGVudClcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgIH07XG5cbn0pLmNhbGwoRm9sZE1vZGUucHJvdG90eXBlKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==