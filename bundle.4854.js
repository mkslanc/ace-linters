(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4854],{

/***/ 34854:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var identifier, LiveScriptMode, keywordend, stringfill;
  identifier = '(?![\\d\\s])[$\\w\\xAA-\\uFFDC](?:(?!\\s)[$\\w\\xAA-\\uFFDC]|-[A-Za-z])*';
  exports.Mode = LiveScriptMode = (function(superclass){
    var indenter, prototype = extend$((import$(LiveScriptMode, superclass).displayName = 'LiveScriptMode', LiveScriptMode), superclass).prototype, constructor = LiveScriptMode;
    function LiveScriptMode(){
      var that;
      this.$tokenizer = new (__webpack_require__(32934).Tokenizer)(LiveScriptMode.Rules);
      if (that = __webpack_require__(28670)) {
        this.$outdent = new that.MatchingBraceOutdent;
      }
      this.$id = "ace/mode/livescript";
      this.$behaviour = new ((__webpack_require__(32589)/* .CstyleBehaviour */ ._))();
    }
    indenter = RegExp('(?:[({[=:]|[-~]>|\\b(?:e(?:lse|xport)|d(?:o|efault)|t(?:ry|hen)|finally|import(?:\\s*all)?|const|var|let|new|catch(?:\\s*' + identifier + ')?))\\s*$');
    prototype.getNextLineIndent = function(state, line, tab){
      var indent, tokens;
      indent = this.$getIndent(line);
      tokens = this.$tokenizer.getLineTokens(line, state).tokens;
      if (!(tokens.length && tokens[tokens.length - 1].type === 'comment')) {
        if (state === 'start' && indenter.test(line)) {
          indent += tab;
        }
      }
      return indent;
    };
    prototype.lineCommentStart = "#";
    prototype.blockComment = {start: "###", end: "###"};
    prototype.checkOutdent = function(state, line, input){
      var ref$;
      return (ref$ = this.$outdent) != null ? ref$.checkOutdent(line, input) : void 8;
    };
    prototype.autoOutdent = function(state, doc, row){
      var ref$;
      return (ref$ = this.$outdent) != null ? ref$.autoOutdent(doc, row) : void 8;
    };
    return LiveScriptMode;
  }((__webpack_require__(49432).Mode)));
  keywordend = '(?![$\\w]|-[A-Za-z]|\\s*:(?![:=]))';
  stringfill = {
    defaultToken: 'string'
  };
  LiveScriptMode.Rules = {
    start: [
      {
        token: 'keyword',
        regex: '(?:t(?:h(?:is|row|en)|ry|ypeof!?)|c(?:on(?:tinue|st)|a(?:se|tch)|lass)|i(?:n(?:stanceof)?|mp(?:ort(?:\\s+all)?|lements)|[fs])|d(?:e(?:fault|lete|bugger)|o)|f(?:or(?:\\s+own)?|inally|unction)|s(?:uper|witch)|e(?:lse|x(?:tends|port)|val)|a(?:nd|rguments)|n(?:ew|ot)|un(?:less|til)|w(?:hile|ith)|o[fr]|return|break|let|var|loop)' + keywordend
      }, {
        token: 'constant.language',
        regex: '(?:true|false|yes|no|on|off|null|void|undefined)' + keywordend
      }, {
        token: 'invalid.illegal',
        regex: '(?:p(?:ackage|r(?:ivate|otected)|ublic)|i(?:mplements|nterface)|enum|static|yield)' + keywordend
      }, {
        token: 'language.support.class',
        regex: '(?:R(?:e(?:gExp|ferenceError)|angeError)|S(?:tring|yntaxError)|E(?:rror|valError)|Array|Boolean|Date|Function|Number|Object|TypeError|URIError)' + keywordend
      }, {
        token: 'language.support.function',
        regex: '(?:is(?:NaN|Finite)|parse(?:Int|Float)|Math|JSON|(?:en|de)codeURI(?:Component)?)' + keywordend
      }, {
        token: 'variable.language',
        regex: '(?:t(?:hat|il|o)|f(?:rom|allthrough)|it|by|e)' + keywordend
      }, {
        token: 'identifier',
        regex: identifier + '\\s*:(?![:=])'
      }, {
        token: 'variable',
        regex: identifier
      }, {
        token: 'keyword.operator',
        regex: '(?:\\.{3}|\\s+\\?)'
      }, {
        token: 'keyword.variable',
        regex: '(?:@+|::|\\.\\.)',
        next: 'key'
      }, {
        token: 'keyword.operator',
        regex: '\\.\\s*',
        next: 'key'
      }, {
        token: 'string',
        regex: '\\\\\\S[^\\s,;)}\\]]*'
      }, {
        token: 'string.doc',
        regex: '\'\'\'',
        next: 'qdoc'
      }, {
        token: 'string.doc',
        regex: '"""',
        next: 'qqdoc'
      }, {
        token: 'string',
        regex: '\'',
        next: 'qstring'
      }, {
        token: 'string',
        regex: '"',
        next: 'qqstring'
      }, {
        token: 'string',
        regex: '`',
        next: 'js'
      }, {
        token: 'string',
        regex: '<\\[',
        next: 'words'
      }, {
        token: 'string.regex',
        regex: '//',
        next: 'heregex'
      }, {
        token: 'comment.doc',
        regex: '/\\*',
        next: 'comment'
      }, {
        token: 'comment',
        regex: '#.*'
      }, {
        token: 'string.regex',
        regex: '\\/(?:[^[\\/\\n\\\\]*(?:(?:\\\\.|\\[[^\\]\\n\\\\]*(?:\\\\.[^\\]\\n\\\\]*)*\\])[^[\\/\\n\\\\]*)*)\\/[gimy$]{0,4}',
        next: 'key'
      }, {
        token: 'constant.numeric',
        regex: '(?:0x[\\da-fA-F][\\da-fA-F_]*|(?:[2-9]|[12]\\d|3[0-6])r[\\da-zA-Z][\\da-zA-Z_]*|(?:\\d[\\d_]*(?:\\.\\d[\\d_]*)?|\\.\\d[\\d_]*)(?:e[+-]?\\d[\\d_]*)?[\\w$]*)'
      }, {
        token: 'lparen',
        regex: '[({[]'
      }, {
        token: 'rparen',
        regex: '[)}\\]]',
        next: 'key'
      }, {
        token: 'keyword.operator',
        regex: '[\\^!|&%+\\-]+'
      }, {
        token: 'text',
        regex: '\\s+'
      }
    ],
    heregex: [
      {
        token: 'string.regex',
        regex: '.*?//[gimy$?]{0,4}',
        next: 'start'
      }, {
        token: 'string.regex',
        regex: '\\s*#{'
      }, {
        token: 'comment.regex',
        regex: '\\s+(?:#.*)?'
      }, {
        defaultToken: 'string.regex'
      }
    ],
    key: [
      {
        token: 'keyword.operator',
        regex: '[.?@!]+'
      }, {
        token: 'identifier',
        regex: identifier,
        next: 'start'
      }, {
        token: 'text',
        regex: '',
        next: 'start'
      }
    ],
    comment: [
      {
        token: 'comment.doc',
        regex: '.*?\\*/',
        next: 'start'
      }, {
        defaultToken: 'comment.doc'
      }
    ],
    qdoc: [
      {
        token: 'string',
        regex: ".*?'''",
        next: 'key'
      }, stringfill
    ],
    qqdoc: [
      {
        token: 'string',
        regex: '.*?"""',
        next: 'key'
      }, stringfill
    ],
    qstring: [
      {
        token: 'string',
        regex: '[^\\\\\']*(?:\\\\.[^\\\\\']*)*\'',
        next: 'key'
      }, stringfill
    ],
    qqstring: [
      {
        token: 'string',
        regex: '[^\\\\"]*(?:\\\\.[^\\\\"]*)*"',
        next: 'key'
      }, stringfill
    ],
    js: [
      {
        token: 'string',
        regex: '[^\\\\`]*(?:\\\\.[^\\\\`]*)*`',
        next: 'key'
      }, stringfill
    ],
    words: [
      {
        token: 'string',
        regex: '.*?\\]>',
        next: 'key'
      }, stringfill
    ]
  };
function extend$(sub, sup){
  function fun(){} fun.prototype = (sub.superclass = sup).prototype;
  (sub.prototype = new fun).constructor = sub;
  if (typeof sup.extended == 'function') sup.extended(sub);
  return sub;
}
function import$(obj, src){
  var own = {}.hasOwnProperty;
  for (var key in src) if (own.call(src, key)) obj[key] = src[key];
  return obj;
}


/***/ }),

/***/ 28670:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var Range = (__webpack_require__(91902)/* .Range */ .Q);

var MatchingBraceOutdent = function() {};

(function() {

    this.checkOutdent = function(line, input) {
        if (! /^\s+$/.test(line))
            return false;

        return /^\s*\}/.test(input);
    };

    this.autoOutdent = function(doc, row) {
        var line = doc.getLine(row);
        var match = line.match(/^(\s*\})/);

        if (!match) return 0;

        var column = match[1].length;
        var openBracePos = doc.findMatchingBracket({row: row, column: column});

        if (!openBracePos || openBracePos.row == row) return 0;

        var indent = this.$getIndent(doc.getLine(openBracePos.row));
        doc.replace(new Range(row, 0, row, column-1), indent);
    };

    this.$getIndent = function(line) {
        return line.match(/^\s*/)[0];
    };

}).call(MatchingBraceOutdent.prototype);

exports.MatchingBraceOutdent = MatchingBraceOutdent;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Oi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9saXZlc2NyaXB0LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgaWRlbnRpZmllciwgTGl2ZVNjcmlwdE1vZGUsIGtleXdvcmRlbmQsIHN0cmluZ2ZpbGw7XG4gIGlkZW50aWZpZXIgPSAnKD8hW1xcXFxkXFxcXHNdKVskXFxcXHdcXFxceEFBLVxcXFx1RkZEQ10oPzooPyFcXFxccylbJFxcXFx3XFxcXHhBQS1cXFxcdUZGRENdfC1bQS1aYS16XSkqJztcbiAgZXhwb3J0cy5Nb2RlID0gTGl2ZVNjcmlwdE1vZGUgPSAoZnVuY3Rpb24oc3VwZXJjbGFzcyl7XG4gICAgdmFyIGluZGVudGVyLCBwcm90b3R5cGUgPSBleHRlbmQkKChpbXBvcnQkKExpdmVTY3JpcHRNb2RlLCBzdXBlcmNsYXNzKS5kaXNwbGF5TmFtZSA9ICdMaXZlU2NyaXB0TW9kZScsIExpdmVTY3JpcHRNb2RlKSwgc3VwZXJjbGFzcykucHJvdG90eXBlLCBjb25zdHJ1Y3RvciA9IExpdmVTY3JpcHRNb2RlO1xuICAgIGZ1bmN0aW9uIExpdmVTY3JpcHRNb2RlKCl7XG4gICAgICB2YXIgdGhhdDtcbiAgICAgIHRoaXMuJHRva2VuaXplciA9IG5ldyAocmVxdWlyZSgnLi4vdG9rZW5pemVyJykpLlRva2VuaXplcihMaXZlU2NyaXB0TW9kZS5SdWxlcyk7XG4gICAgICBpZiAodGhhdCA9IHJlcXVpcmUoJy4uL21vZGUvbWF0Y2hpbmdfYnJhY2Vfb3V0ZGVudCcpKSB7XG4gICAgICAgIHRoaXMuJG91dGRlbnQgPSBuZXcgdGhhdC5NYXRjaGluZ0JyYWNlT3V0ZGVudDtcbiAgICAgIH1cbiAgICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS9saXZlc2NyaXB0XCI7XG4gICAgICB0aGlzLiRiZWhhdmlvdXIgPSBuZXcgKHJlcXVpcmUoXCIuL2JlaGF2aW91ci9jc3R5bGVcIikuQ3N0eWxlQmVoYXZpb3VyKSgpO1xuICAgIH1cbiAgICBpbmRlbnRlciA9IFJlZ0V4cCgnKD86Wyh7Wz06XXxbLX5dPnxcXFxcYig/OmUoPzpsc2V8eHBvcnQpfGQoPzpvfGVmYXVsdCl8dCg/OnJ5fGhlbil8ZmluYWxseXxpbXBvcnQoPzpcXFxccyphbGwpP3xjb25zdHx2YXJ8bGV0fG5ld3xjYXRjaCg/OlxcXFxzKicgKyBpZGVudGlmaWVyICsgJyk/KSlcXFxccyokJyk7XG4gICAgcHJvdG90eXBlLmdldE5leHRMaW5lSW5kZW50ID0gZnVuY3Rpb24oc3RhdGUsIGxpbmUsIHRhYil7XG4gICAgICB2YXIgaW5kZW50LCB0b2tlbnM7XG4gICAgICBpbmRlbnQgPSB0aGlzLiRnZXRJbmRlbnQobGluZSk7XG4gICAgICB0b2tlbnMgPSB0aGlzLiR0b2tlbml6ZXIuZ2V0TGluZVRva2VucyhsaW5lLCBzdGF0ZSkudG9rZW5zO1xuICAgICAgaWYgKCEodG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdLnR5cGUgPT09ICdjb21tZW50JykpIHtcbiAgICAgICAgaWYgKHN0YXRlID09PSAnc3RhcnQnICYmIGluZGVudGVyLnRlc3QobGluZSkpIHtcbiAgICAgICAgICBpbmRlbnQgKz0gdGFiO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gaW5kZW50O1xuICAgIH07XG4gICAgcHJvdG90eXBlLmxpbmVDb21tZW50U3RhcnQgPSBcIiNcIjtcbiAgICBwcm90b3R5cGUuYmxvY2tDb21tZW50ID0ge3N0YXJ0OiBcIiMjI1wiLCBlbmQ6IFwiIyMjXCJ9O1xuICAgIHByb3RvdHlwZS5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpe1xuICAgICAgdmFyIHJlZiQ7XG4gICAgICByZXR1cm4gKHJlZiQgPSB0aGlzLiRvdXRkZW50KSAhPSBudWxsID8gcmVmJC5jaGVja091dGRlbnQobGluZSwgaW5wdXQpIDogdm9pZCA4O1xuICAgIH07XG4gICAgcHJvdG90eXBlLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oc3RhdGUsIGRvYywgcm93KXtcbiAgICAgIHZhciByZWYkO1xuICAgICAgcmV0dXJuIChyZWYkID0gdGhpcy4kb3V0ZGVudCkgIT0gbnVsbCA/IHJlZiQuYXV0b091dGRlbnQoZG9jLCByb3cpIDogdm9pZCA4O1xuICAgIH07XG4gICAgcmV0dXJuIExpdmVTY3JpcHRNb2RlO1xuICB9KHJlcXVpcmUoJy4uL21vZGUvdGV4dCcpLk1vZGUpKTtcbiAga2V5d29yZGVuZCA9ICcoPyFbJFxcXFx3XXwtW0EtWmEtel18XFxcXHMqOig/IVs6PV0pKSc7XG4gIHN0cmluZ2ZpbGwgPSB7XG4gICAgZGVmYXVsdFRva2VuOiAnc3RyaW5nJ1xuICB9O1xuICBMaXZlU2NyaXB0TW9kZS5SdWxlcyA9IHtcbiAgICBzdGFydDogW1xuICAgICAge1xuICAgICAgICB0b2tlbjogJ2tleXdvcmQnLFxuICAgICAgICByZWdleDogJyg/OnQoPzpoKD86aXN8cm93fGVuKXxyeXx5cGVvZiE/KXxjKD86b24oPzp0aW51ZXxzdCl8YSg/OnNlfHRjaCl8bGFzcyl8aSg/Om4oPzpzdGFuY2VvZik/fG1wKD86b3J0KD86XFxcXHMrYWxsKT98bGVtZW50cyl8W2ZzXSl8ZCg/OmUoPzpmYXVsdHxsZXRlfGJ1Z2dlcil8byl8Zig/Om9yKD86XFxcXHMrb3duKT98aW5hbGx5fHVuY3Rpb24pfHMoPzp1cGVyfHdpdGNoKXxlKD86bHNlfHgoPzp0ZW5kc3xwb3J0KXx2YWwpfGEoPzpuZHxyZ3VtZW50cyl8big/OmV3fG90KXx1big/Omxlc3N8dGlsKXx3KD86aGlsZXxpdGgpfG9bZnJdfHJldHVybnxicmVha3xsZXR8dmFyfGxvb3ApJyArIGtleXdvcmRlbmRcbiAgICAgIH0sIHtcbiAgICAgICAgdG9rZW46ICdjb25zdGFudC5sYW5ndWFnZScsXG4gICAgICAgIHJlZ2V4OiAnKD86dHJ1ZXxmYWxzZXx5ZXN8bm98b258b2ZmfG51bGx8dm9pZHx1bmRlZmluZWQpJyArIGtleXdvcmRlbmRcbiAgICAgIH0sIHtcbiAgICAgICAgdG9rZW46ICdpbnZhbGlkLmlsbGVnYWwnLFxuICAgICAgICByZWdleDogJyg/OnAoPzphY2thZ2V8cig/Oml2YXRlfG90ZWN0ZWQpfHVibGljKXxpKD86bXBsZW1lbnRzfG50ZXJmYWNlKXxlbnVtfHN0YXRpY3x5aWVsZCknICsga2V5d29yZGVuZFxuICAgICAgfSwge1xuICAgICAgICB0b2tlbjogJ2xhbmd1YWdlLnN1cHBvcnQuY2xhc3MnLFxuICAgICAgICByZWdleDogJyg/OlIoPzplKD86Z0V4cHxmZXJlbmNlRXJyb3IpfGFuZ2VFcnJvcil8Uyg/OnRyaW5nfHludGF4RXJyb3IpfEUoPzpycm9yfHZhbEVycm9yKXxBcnJheXxCb29sZWFufERhdGV8RnVuY3Rpb258TnVtYmVyfE9iamVjdHxUeXBlRXJyb3J8VVJJRXJyb3IpJyArIGtleXdvcmRlbmRcbiAgICAgIH0sIHtcbiAgICAgICAgdG9rZW46ICdsYW5ndWFnZS5zdXBwb3J0LmZ1bmN0aW9uJyxcbiAgICAgICAgcmVnZXg6ICcoPzppcyg/Ok5hTnxGaW5pdGUpfHBhcnNlKD86SW50fEZsb2F0KXxNYXRofEpTT058KD86ZW58ZGUpY29kZVVSSSg/OkNvbXBvbmVudCk/KScgKyBrZXl3b3JkZW5kXG4gICAgICB9LCB7XG4gICAgICAgIHRva2VuOiAndmFyaWFibGUubGFuZ3VhZ2UnLFxuICAgICAgICByZWdleDogJyg/OnQoPzpoYXR8aWx8byl8Zig/OnJvbXxhbGx0aHJvdWdoKXxpdHxieXxlKScgKyBrZXl3b3JkZW5kXG4gICAgICB9LCB7XG4gICAgICAgIHRva2VuOiAnaWRlbnRpZmllcicsXG4gICAgICAgIHJlZ2V4OiBpZGVudGlmaWVyICsgJ1xcXFxzKjooPyFbOj1dKSdcbiAgICAgIH0sIHtcbiAgICAgICAgdG9rZW46ICd2YXJpYWJsZScsXG4gICAgICAgIHJlZ2V4OiBpZGVudGlmaWVyXG4gICAgICB9LCB7XG4gICAgICAgIHRva2VuOiAna2V5d29yZC5vcGVyYXRvcicsXG4gICAgICAgIHJlZ2V4OiAnKD86XFxcXC57M318XFxcXHMrXFxcXD8pJ1xuICAgICAgfSwge1xuICAgICAgICB0b2tlbjogJ2tleXdvcmQudmFyaWFibGUnLFxuICAgICAgICByZWdleDogJyg/OkArfDo6fFxcXFwuXFxcXC4pJyxcbiAgICAgICAgbmV4dDogJ2tleSdcbiAgICAgIH0sIHtcbiAgICAgICAgdG9rZW46ICdrZXl3b3JkLm9wZXJhdG9yJyxcbiAgICAgICAgcmVnZXg6ICdcXFxcLlxcXFxzKicsXG4gICAgICAgIG5leHQ6ICdrZXknXG4gICAgICB9LCB7XG4gICAgICAgIHRva2VuOiAnc3RyaW5nJyxcbiAgICAgICAgcmVnZXg6ICdcXFxcXFxcXFxcXFxTW15cXFxccyw7KX1cXFxcXV0qJ1xuICAgICAgfSwge1xuICAgICAgICB0b2tlbjogJ3N0cmluZy5kb2MnLFxuICAgICAgICByZWdleDogJ1xcJ1xcJ1xcJycsXG4gICAgICAgIG5leHQ6ICdxZG9jJ1xuICAgICAgfSwge1xuICAgICAgICB0b2tlbjogJ3N0cmluZy5kb2MnLFxuICAgICAgICByZWdleDogJ1wiXCJcIicsXG4gICAgICAgIG5leHQ6ICdxcWRvYydcbiAgICAgIH0sIHtcbiAgICAgICAgdG9rZW46ICdzdHJpbmcnLFxuICAgICAgICByZWdleDogJ1xcJycsXG4gICAgICAgIG5leHQ6ICdxc3RyaW5nJ1xuICAgICAgfSwge1xuICAgICAgICB0b2tlbjogJ3N0cmluZycsXG4gICAgICAgIHJlZ2V4OiAnXCInLFxuICAgICAgICBuZXh0OiAncXFzdHJpbmcnXG4gICAgICB9LCB7XG4gICAgICAgIHRva2VuOiAnc3RyaW5nJyxcbiAgICAgICAgcmVnZXg6ICdgJyxcbiAgICAgICAgbmV4dDogJ2pzJ1xuICAgICAgfSwge1xuICAgICAgICB0b2tlbjogJ3N0cmluZycsXG4gICAgICAgIHJlZ2V4OiAnPFxcXFxbJyxcbiAgICAgICAgbmV4dDogJ3dvcmRzJ1xuICAgICAgfSwge1xuICAgICAgICB0b2tlbjogJ3N0cmluZy5yZWdleCcsXG4gICAgICAgIHJlZ2V4OiAnLy8nLFxuICAgICAgICBuZXh0OiAnaGVyZWdleCdcbiAgICAgIH0sIHtcbiAgICAgICAgdG9rZW46ICdjb21tZW50LmRvYycsXG4gICAgICAgIHJlZ2V4OiAnL1xcXFwqJyxcbiAgICAgICAgbmV4dDogJ2NvbW1lbnQnXG4gICAgICB9LCB7XG4gICAgICAgIHRva2VuOiAnY29tbWVudCcsXG4gICAgICAgIHJlZ2V4OiAnIy4qJ1xuICAgICAgfSwge1xuICAgICAgICB0b2tlbjogJ3N0cmluZy5yZWdleCcsXG4gICAgICAgIHJlZ2V4OiAnXFxcXC8oPzpbXltcXFxcL1xcXFxuXFxcXFxcXFxdKig/Oig/OlxcXFxcXFxcLnxcXFxcW1teXFxcXF1cXFxcblxcXFxcXFxcXSooPzpcXFxcXFxcXC5bXlxcXFxdXFxcXG5cXFxcXFxcXF0qKSpcXFxcXSlbXltcXFxcL1xcXFxuXFxcXFxcXFxdKikqKVxcXFwvW2dpbXkkXXswLDR9JyxcbiAgICAgICAgbmV4dDogJ2tleSdcbiAgICAgIH0sIHtcbiAgICAgICAgdG9rZW46ICdjb25zdGFudC5udW1lcmljJyxcbiAgICAgICAgcmVnZXg6ICcoPzoweFtcXFxcZGEtZkEtRl1bXFxcXGRhLWZBLUZfXSp8KD86WzItOV18WzEyXVxcXFxkfDNbMC02XSlyW1xcXFxkYS16QS1aXVtcXFxcZGEtekEtWl9dKnwoPzpcXFxcZFtcXFxcZF9dKig/OlxcXFwuXFxcXGRbXFxcXGRfXSopP3xcXFxcLlxcXFxkW1xcXFxkX10qKSg/OmVbKy1dP1xcXFxkW1xcXFxkX10qKT9bXFxcXHckXSopJ1xuICAgICAgfSwge1xuICAgICAgICB0b2tlbjogJ2xwYXJlbicsXG4gICAgICAgIHJlZ2V4OiAnWyh7W10nXG4gICAgICB9LCB7XG4gICAgICAgIHRva2VuOiAncnBhcmVuJyxcbiAgICAgICAgcmVnZXg6ICdbKX1cXFxcXV0nLFxuICAgICAgICBuZXh0OiAna2V5J1xuICAgICAgfSwge1xuICAgICAgICB0b2tlbjogJ2tleXdvcmQub3BlcmF0b3InLFxuICAgICAgICByZWdleDogJ1tcXFxcXiF8JiUrXFxcXC1dKydcbiAgICAgIH0sIHtcbiAgICAgICAgdG9rZW46ICd0ZXh0JyxcbiAgICAgICAgcmVnZXg6ICdcXFxccysnXG4gICAgICB9XG4gICAgXSxcbiAgICBoZXJlZ2V4OiBbXG4gICAgICB7XG4gICAgICAgIHRva2VuOiAnc3RyaW5nLnJlZ2V4JyxcbiAgICAgICAgcmVnZXg6ICcuKj8vL1tnaW15JD9dezAsNH0nLFxuICAgICAgICBuZXh0OiAnc3RhcnQnXG4gICAgICB9LCB7XG4gICAgICAgIHRva2VuOiAnc3RyaW5nLnJlZ2V4JyxcbiAgICAgICAgcmVnZXg6ICdcXFxccyojeydcbiAgICAgIH0sIHtcbiAgICAgICAgdG9rZW46ICdjb21tZW50LnJlZ2V4JyxcbiAgICAgICAgcmVnZXg6ICdcXFxccysoPzojLiopPydcbiAgICAgIH0sIHtcbiAgICAgICAgZGVmYXVsdFRva2VuOiAnc3RyaW5nLnJlZ2V4J1xuICAgICAgfVxuICAgIF0sXG4gICAga2V5OiBbXG4gICAgICB7XG4gICAgICAgIHRva2VuOiAna2V5d29yZC5vcGVyYXRvcicsXG4gICAgICAgIHJlZ2V4OiAnWy4/QCFdKydcbiAgICAgIH0sIHtcbiAgICAgICAgdG9rZW46ICdpZGVudGlmaWVyJyxcbiAgICAgICAgcmVnZXg6IGlkZW50aWZpZXIsXG4gICAgICAgIG5leHQ6ICdzdGFydCdcbiAgICAgIH0sIHtcbiAgICAgICAgdG9rZW46ICd0ZXh0JyxcbiAgICAgICAgcmVnZXg6ICcnLFxuICAgICAgICBuZXh0OiAnc3RhcnQnXG4gICAgICB9XG4gICAgXSxcbiAgICBjb21tZW50OiBbXG4gICAgICB7XG4gICAgICAgIHRva2VuOiAnY29tbWVudC5kb2MnLFxuICAgICAgICByZWdleDogJy4qP1xcXFwqLycsXG4gICAgICAgIG5leHQ6ICdzdGFydCdcbiAgICAgIH0sIHtcbiAgICAgICAgZGVmYXVsdFRva2VuOiAnY29tbWVudC5kb2MnXG4gICAgICB9XG4gICAgXSxcbiAgICBxZG9jOiBbXG4gICAgICB7XG4gICAgICAgIHRva2VuOiAnc3RyaW5nJyxcbiAgICAgICAgcmVnZXg6IFwiLio/JycnXCIsXG4gICAgICAgIG5leHQ6ICdrZXknXG4gICAgICB9LCBzdHJpbmdmaWxsXG4gICAgXSxcbiAgICBxcWRvYzogW1xuICAgICAge1xuICAgICAgICB0b2tlbjogJ3N0cmluZycsXG4gICAgICAgIHJlZ2V4OiAnLio/XCJcIlwiJyxcbiAgICAgICAgbmV4dDogJ2tleSdcbiAgICAgIH0sIHN0cmluZ2ZpbGxcbiAgICBdLFxuICAgIHFzdHJpbmc6IFtcbiAgICAgIHtcbiAgICAgICAgdG9rZW46ICdzdHJpbmcnLFxuICAgICAgICByZWdleDogJ1teXFxcXFxcXFxcXCddKig/OlxcXFxcXFxcLlteXFxcXFxcXFxcXCddKikqXFwnJyxcbiAgICAgICAgbmV4dDogJ2tleSdcbiAgICAgIH0sIHN0cmluZ2ZpbGxcbiAgICBdLFxuICAgIHFxc3RyaW5nOiBbXG4gICAgICB7XG4gICAgICAgIHRva2VuOiAnc3RyaW5nJyxcbiAgICAgICAgcmVnZXg6ICdbXlxcXFxcXFxcXCJdKig/OlxcXFxcXFxcLlteXFxcXFxcXFxcIl0qKSpcIicsXG4gICAgICAgIG5leHQ6ICdrZXknXG4gICAgICB9LCBzdHJpbmdmaWxsXG4gICAgXSxcbiAgICBqczogW1xuICAgICAge1xuICAgICAgICB0b2tlbjogJ3N0cmluZycsXG4gICAgICAgIHJlZ2V4OiAnW15cXFxcXFxcXGBdKig/OlxcXFxcXFxcLlteXFxcXFxcXFxgXSopKmAnLFxuICAgICAgICBuZXh0OiAna2V5J1xuICAgICAgfSwgc3RyaW5nZmlsbFxuICAgIF0sXG4gICAgd29yZHM6IFtcbiAgICAgIHtcbiAgICAgICAgdG9rZW46ICdzdHJpbmcnLFxuICAgICAgICByZWdleDogJy4qP1xcXFxdPicsXG4gICAgICAgIG5leHQ6ICdrZXknXG4gICAgICB9LCBzdHJpbmdmaWxsXG4gICAgXVxuICB9O1xuZnVuY3Rpb24gZXh0ZW5kJChzdWIsIHN1cCl7XG4gIGZ1bmN0aW9uIGZ1bigpe30gZnVuLnByb3RvdHlwZSA9IChzdWIuc3VwZXJjbGFzcyA9IHN1cCkucHJvdG90eXBlO1xuICAoc3ViLnByb3RvdHlwZSA9IG5ldyBmdW4pLmNvbnN0cnVjdG9yID0gc3ViO1xuICBpZiAodHlwZW9mIHN1cC5leHRlbmRlZCA9PSAnZnVuY3Rpb24nKSBzdXAuZXh0ZW5kZWQoc3ViKTtcbiAgcmV0dXJuIHN1Yjtcbn1cbmZ1bmN0aW9uIGltcG9ydCQob2JqLCBzcmMpe1xuICB2YXIgb3duID0ge30uaGFzT3duUHJvcGVydHk7XG4gIGZvciAodmFyIGtleSBpbiBzcmMpIGlmIChvd24uY2FsbChzcmMsIGtleSkpIG9ialtrZXldID0gc3JjW2tleV07XG4gIHJldHVybiBvYmo7XG59XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIFJhbmdlID0gcmVxdWlyZShcIi4uL3JhbmdlXCIpLlJhbmdlO1xuXG52YXIgTWF0Y2hpbmdCcmFjZU91dGRlbnQgPSBmdW5jdGlvbigpIHt9O1xuXG4oZnVuY3Rpb24oKSB7XG5cbiAgICB0aGlzLmNoZWNrT3V0ZGVudCA9IGZ1bmN0aW9uKGxpbmUsIGlucHV0KSB7XG4gICAgICAgIGlmICghIC9eXFxzKyQvLnRlc3QobGluZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgcmV0dXJuIC9eXFxzKlxcfS8udGVzdChpbnB1dCk7XG4gICAgfTtcblxuICAgIHRoaXMuYXV0b091dGRlbnQgPSBmdW5jdGlvbihkb2MsIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IGRvYy5nZXRMaW5lKHJvdyk7XG4gICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14oXFxzKlxcfSkvKTtcblxuICAgICAgICBpZiAoIW1hdGNoKSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgY29sdW1uID0gbWF0Y2hbMV0ubGVuZ3RoO1xuICAgICAgICB2YXIgb3BlbkJyYWNlUG9zID0gZG9jLmZpbmRNYXRjaGluZ0JyYWNrZXQoe3Jvdzogcm93LCBjb2x1bW46IGNvbHVtbn0pO1xuXG4gICAgICAgIGlmICghb3BlbkJyYWNlUG9zIHx8IG9wZW5CcmFjZVBvcy5yb3cgPT0gcm93KSByZXR1cm4gMDtcblxuICAgICAgICB2YXIgaW5kZW50ID0gdGhpcy4kZ2V0SW5kZW50KGRvYy5nZXRMaW5lKG9wZW5CcmFjZVBvcy5yb3cpKTtcbiAgICAgICAgZG9jLnJlcGxhY2UobmV3IFJhbmdlKHJvdywgMCwgcm93LCBjb2x1bW4tMSksIGluZGVudCk7XG4gICAgfTtcblxuICAgIHRoaXMuJGdldEluZGVudCA9IGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgcmV0dXJuIGxpbmUubWF0Y2goL15cXHMqLylbMF07XG4gICAgfTtcblxufSkuY2FsbChNYXRjaGluZ0JyYWNlT3V0ZGVudC5wcm90b3R5cGUpO1xuXG5leHBvcnRzLk1hdGNoaW5nQnJhY2VPdXRkZW50ID0gTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=