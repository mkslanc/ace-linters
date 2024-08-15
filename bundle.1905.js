"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[1905],{

/***/ 93887:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var oop = __webpack_require__(2645);
var Range = (__webpack_require__(91902)/* .Range */ .Q);
var BaseFoldMode = (__webpack_require__(51358).FoldMode);

var FoldMode = exports.l = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {
    
    this.foldingStartMarker = /([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/;
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
    
    //prevent naming conflict with any modes that inherit from cstyle and override this (like csharp)
    this._getFoldWidgetBase = this.getFoldWidget;
    
    /**
     * Gets fold widget with some non-standard extras:
     *
     * @example lineCommentRegionStart
     *      //#region [optional description]
     *
     * @example blockCommentRegionStart
     *      /*#region [optional description] *[/]
     *
     * @example tripleStarFoldingSection
     *      /*** this folds even though 1 line because it has 3 stars ***[/]
     * 
     * @note the pound symbol for region tags is optional
     */
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
    
        if (this.singleLineBlockCommentRe.test(line)) {
            // No widget for single line block comment unless region or triple star
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
    
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart
    
        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        
        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);
        
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };
    
    /**
     * gets comment region block with end region assumed to be start of comment in any cstyle mode or SQL mode (--) which inherits from this.
     * There may optionally be a pound symbol before the region/endregion statement
     */
    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        
        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);


/***/ }),

/***/ 28670:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



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


/***/ }),

/***/ 41905:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/*
  THIS FILE WAS AUTOGENERATED BY mode.tmpl.js
*/



var oop = __webpack_require__(2645);
var TextMode = (__webpack_require__(49432).Mode);
var ValaHighlightRules = (__webpack_require__(44518)/* .ValaHighlightRules */ .W);
var CStyleFoldMode = (__webpack_require__(93887)/* .FoldMode */ .l);
var MatchingBraceOutdent = (__webpack_require__(28670).MatchingBraceOutdent);

var Mode = function() {
    this.HighlightRules = ValaHighlightRules;
    
    this.$outdent = new MatchingBraceOutdent();
    this.$behaviour = this.$defaultBehaviour;
    this.foldingRules = new CStyleFoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.lineCommentStart = "//";
    this.blockComment = {start: "/*", end: "*/"};

    this.getNextLineIndent = function(state, line, tab) {
        var indent = this.$getIndent(line);

        var tokenizedLine = this.getTokenizer().getLineTokens(line, state);
        var tokens = tokenizedLine.tokens;
        var endState = tokenizedLine.state;

        if (tokens.length && tokens[tokens.length-1].type == "comment") {
            return indent;
        }

        if (state == "start" || state == "no_regex") {
            var match = line.match(/^.*(?:\bcase\b.*:|[\{\(\[])\s*$/);
            if (match) {
                indent += tab;
            }
        } else if (state == "doc-start") {
            if (endState == "start" || endState == "no_regex") {
                return "";
            }
            var match = line.match(/^\s*(\/?)\*/);
            if (match) {
                if (match[1]) {
                    indent += " ";
                }
                indent += "* ";
            }
        }

        return indent;
    };

    this.checkOutdent = function(state, line, input) {
        return this.$outdent.checkOutdent(line, input);
    };

    this.autoOutdent = function(state, doc, row) {
        this.$outdent.autoOutdent(doc, row);
    };

    // Extra logic goes here.
    this.$id = "ace/mode/vala";
    this.snippetFileId = "ace/snippets/vala";
}).call(Mode.prototype);

exports.Mode = Mode;


/***/ }),

/***/ 44518:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/* This file was autogenerated from https://raw.githubusercontent.com/technosophos/Vala-TMBundle/master/Syntaxes/Vala.tmLanguage (uuid: ) */
/****************************************************************************************
 * IT MIGHT NOT BE PERFECT ...But it's a good start from an existing *.tmlanguage file. *
 * fileTypes                                                                            *
 ****************************************************************************************/



var oop = __webpack_require__(2645);
var TextHighlightRules = (__webpack_require__(16387)/* .TextHighlightRules */ .r);

var ValaHighlightRules = function() {
    // regexp must not have capturing parentheses. Use (?:) instead.
    // regexps are ordered -> the first match is used

    this.$rules = { start: 
       [ { token: 
            [ 'meta.using.vala',
              'keyword.other.using.vala',
              'meta.using.vala',
              'storage.modifier.using.vala',
              'meta.using.vala',
              'punctuation.terminator.vala' ],
           regex: '^(\\s*)(using)\\b(?:(\\s*)([^ ;$]+)(\\s*)((?:;)?))?' },
         { include: '#code' } ],
      '#all-types': 
       [ { include: '#primitive-arrays' },
         { include: '#primitive-types' },
         { include: '#object-types' } ],
      '#annotations': 
       [ { token: 
            [ 'storage.type.annotation.vala',
              'punctuation.definition.annotation-arguments.begin.vala' ],
           regex: '(@[^ (]+)(\\()',
           push: 
            [ { token: 'punctuation.definition.annotation-arguments.end.vala',
                regex: '\\)',
                next: 'pop' },
              { token: 
                 [ 'constant.other.key.vala',
                   'text',
                   'keyword.operator.assignment.vala' ],
                regex: '(\\w*)(\\s*)(=)' },
              { include: '#code' },
              { token: 'punctuation.seperator.property.vala', regex: ',' },
              { defaultToken: 'meta.declaration.annotation.vala' } ] },
         { token: 'storage.type.annotation.vala', regex: '@\\w*' } ],
      '#anonymous-classes-and-new': 
       [ { token: 'keyword.control.new.vala',
           regex: '\\bnew\\b',
           push_disabled: 
            [ { token: 'text',
                regex: '(?<=\\)|\\])(?!\\s*{)|(?<=})|(?=;)',
                TODO: 'FIXME: regexp doesn\'t have js equivalent',
                originalRegex: '(?<=\\)|\\])(?!\\s*{)|(?<=})|(?=;)',
                next: 'pop' },
              { token: [ 'storage.type.vala', 'text' ],
                regex: '(\\w+)(\\s*)(?=\\[)',
                push: 
                 [ { token: 'text', regex: '}|(?=;|\\))', next: 'pop' },
                   { token: 'text',
                     regex: '\\[',
                     push: 
                      [ { token: 'text', regex: '\\]', next: 'pop' },
                        { include: '#code' } ] },
                   { token: 'text',
                     regex: '{',
                     push: 
                      [ { token: 'text', regex: '(?=})', next: 'pop' },
                        { include: '#code' } ] } ] },
              { token: 'text',
                regex: '(?=\\w.*\\()',
                push: 
                 [ { token: 'text',
                     regex: '(?<=\\))',
                     TODO: 'FIXME: regexp doesn\'t have js equivalent',
                     originalRegex: '(?<=\\))',
                     next: 'pop' },
                   { include: '#object-types' },
                   { token: 'text',
                     regex: '\\(',
                     push: 
                      [ { token: 'text', regex: '\\)', next: 'pop' },
                        { include: '#code' } ] } ] },
              { token: 'meta.inner-class.vala',
                regex: '{',
                push: 
                 [ { token: 'meta.inner-class.vala', regex: '}', next: 'pop' },
                   { include: '#class-body' },
                   { defaultToken: 'meta.inner-class.vala' } ] } ] } ],
      '#assertions': 
       [ { token: 
            [ 'keyword.control.assert.vala',
              'meta.declaration.assertion.vala' ],
           regex: '\\b(assert|requires|ensures)(\\s)',
           push: 
            [ { token: 'meta.declaration.assertion.vala',
                regex: '$',
                next: 'pop' },
              { token: 'keyword.operator.assert.expression-seperator.vala',
                regex: ':' },
              { include: '#code' },
              { defaultToken: 'meta.declaration.assertion.vala' } ] } ],
      '#class': 
       [ { token: 'meta.class.vala',
           regex: '(?=\\w?[\\w\\s]*(?:class|(?:@)?interface|enum|struct|namespace)\\s+\\w+)',
           push: 
            [ { token: 'paren.vala',
                regex: '}',
                next: 'pop' },
              { include: '#storage-modifiers' },
              { include: '#comments' },
              { token: 
                 [ 'storage.modifier.vala',
                   'meta.class.identifier.vala',
                   'entity.name.type.class.vala' ],
                regex: '(class|(?:@)?interface|enum|struct|namespace)(\\s+)([\\w\\.]+)' },
              { token: 'storage.modifier.extends.vala',
                regex: ':',
                push: 
                 [ { token: 'meta.definition.class.inherited.classes.vala',
                     regex: '(?={|,)',
                     next: 'pop' },
                   { include: '#object-types-inherited' },
                   { include: '#comments' },
                   { defaultToken: 'meta.definition.class.inherited.classes.vala' } ] },
              { token: 
                 [ 'storage.modifier.implements.vala',
                   'meta.definition.class.implemented.interfaces.vala' ],
                regex: '(,)(\\s)',
                push: 
                 [ { token: 'meta.definition.class.implemented.interfaces.vala',
                     regex: '(?=\\{)',
                     next: 'pop' },
                   { include: '#object-types-inherited' },
                   { include: '#comments' },
                   { defaultToken: 'meta.definition.class.implemented.interfaces.vala' } ] },
              { token: 'paren.vala',
                regex: '{',
                push: 
                 [ { token: 'paren.vala', regex: '(?=})', next: 'pop' },
                   { include: '#class-body' },
                   { defaultToken: 'meta.class.body.vala' } ] },
              { defaultToken: 'meta.class.vala' } ],
           comment: 'attempting to put namespace in here.' } ],
      '#class-body': 
       [ { include: '#comments' },
         { include: '#class' },
         { include: '#enums' },
         { include: '#methods' },
         { include: '#annotations' },
         { include: '#storage-modifiers' },
         { include: '#code' } ],
      '#code': 
       [ { include: '#comments' },
         { include: '#class' },
         { token: 'text',
           regex: '{',
           push: 
            [ { token: 'text', regex: '}', next: 'pop' },
              { include: '#code' } ] },
         { include: '#assertions' },
         { include: '#parens' },
         { include: '#constants-and-special-vars' },
         { include: '#anonymous-classes-and-new' },
         { include: '#keywords' },
         { include: '#storage-modifiers' },
         { include: '#strings' },
         { include: '#all-types' } ],
      '#comments': 
       [ { token: 'punctuation.definition.comment.vala',
           regex: '/\\*\\*/' },
         { include: 'text.html.javadoc' },
         { include: '#comments-inline' } ],
      '#comments-inline': 
       [ { token: 'punctuation.definition.comment.vala',
           regex: '/\\*',
           push: 
            [ { token: 'punctuation.definition.comment.vala',
                regex: '\\*/',
                next: 'pop' },
              { defaultToken: 'comment.block.vala' } ] },
         { token: 
            [ 'text',
              'punctuation.definition.comment.vala',
              'comment.line.double-slash.vala' ],
           regex: '(\\s*)(//)(.*$)' } ],
      '#constants-and-special-vars': 
       [ { token: 'constant.language.vala',
           regex: '\\b(?:true|false|null)\\b' },
         { token: 'variable.language.vala',
           regex: '\\b(?:this|base)\\b' },
         { token: 'constant.numeric.vala',
           regex: '\\b(?:0(?:x|X)[0-9a-fA-F]*|(?:[0-9]+\\.?[0-9]*|\\.[0-9]+)(?:(?:e|E)(?:\\+|-)?[0-9]+)?)(?:[LlFfUuDd]|UL|ul)?\\b' },
         { token: [ 'keyword.operator.dereference.vala', 'constant.other.vala' ],
           regex: '((?:\\.)?)\\b([A-Z][A-Z0-9_]+)(?!<|\\.class|\\s*\\w+\\s*=)\\b' } ],
      '#enums': 
       [ { token: 'text',
           regex: '^(?=\\s*[A-Z0-9_]+\\s*(?:{|\\(|,))',
           push: 
            [ { token: 'text', regex: '(?=;|})', next: 'pop' },
              { token: 'constant.other.enum.vala',
                regex: '\\w+',
                push: 
                 [ { token: 'meta.enum.vala', regex: '(?=,|;|})', next: 'pop' },
                   { include: '#parens' },
                   { token: 'text',
                     regex: '{',
                     push: 
                      [ { token: 'text', regex: '}', next: 'pop' },
                        { include: '#class-body' } ] },
                   { defaultToken: 'meta.enum.vala' } ] } ] } ],
      '#keywords': 
       [ { token: 'keyword.control.catch-exception.vala',
           regex: '\\b(?:try|catch|finally|throw)\\b' },
         { token: 'keyword.control.vala', regex: '\\?|:|\\?\\?' },
         { token: 'keyword.control.vala',
           regex: '\\b(?:return|break|case|continue|default|do|while|for|foreach|switch|if|else|in|yield|get|set|value)\\b' },
         { token: 'keyword.operator.vala',
           regex: '\\b(?:typeof|is|as)\\b' },
         { token: 'keyword.operator.comparison.vala',
           regex: '==|!=|<=|>=|<>|<|>' },
         { token: 'keyword.operator.assignment.vala', regex: '=' },
         { token: 'keyword.operator.increment-decrement.vala',
           regex: '\\-\\-|\\+\\+' },
         { token: 'keyword.operator.arithmetic.vala',
           regex: '\\-|\\+|\\*|\\/|%' },
         { token: 'keyword.operator.logical.vala', regex: '!|&&|\\|\\|' },
         { token: 'keyword.operator.dereference.vala',
           regex: '\\.(?=\\S)',
           originalRegex: '(?<=\\S)\\.(?=\\S)' },
         { token: 'punctuation.terminator.vala', regex: ';' },
         { token: 'keyword.operator.ownership', regex: 'owned|unowned' } ],
      '#methods': 
       [ { token: 'meta.method.vala',
           regex: '(?!new)(?=\\w.*\\s+)(?=[^=]+\\()',
           push: 
            [ { token: 'paren.vala', regex: '}|(?=;)', next: 'pop' },
              { include: '#storage-modifiers' },
              { token: [ 'entity.name.function.vala', 'meta.method.identifier.vala' ],
                regex: '([\\~\\w\\.]+)(\\s*\\()',
                push: 
                 [ { token: 'meta.method.identifier.vala',
                     regex: '\\)',
                     next: 'pop' },
                   { include: '#parameters' },
                   { defaultToken: 'meta.method.identifier.vala' } ] },
              { token: 'meta.method.return-type.vala',
                regex: '(?=\\w.*\\s+\\w+\\s*\\()',
                push: 
                 [ { token: 'meta.method.return-type.vala',
                     regex: '(?=\\w+\\s*\\()',
                     next: 'pop' },
                   { include: '#all-types' },
                   { defaultToken: 'meta.method.return-type.vala' } ] },
              { include: '#throws' },
              { token: 'paren.vala',
                regex: '{',
                push: 
                 [ { token: 'paren.vala', regex: '(?=})', next: 'pop' },
                   { include: '#code' },
                   { defaultToken: 'meta.method.body.vala' } ] },
              { defaultToken: 'meta.method.vala' } ] } ],
      '#namespace': 
       [ { token: 'text',
           regex: '^(?=\\s*[A-Z0-9_]+\\s*(?:{|\\(|,))',
           push: 
            [ { token: 'text', regex: '(?=;|})', next: 'pop' },
              { token: 'constant.other.namespace.vala',
                regex: '\\w+',
                push: 
                 [ { token: 'meta.namespace.vala', regex: '(?=,|;|})', next: 'pop' },
                   { include: '#parens' },
                   { token: 'text',
                     regex: '{',
                     push: 
                      [ { token: 'text', regex: '}', next: 'pop' },
                        { include: '#code' } ] },
                   { defaultToken: 'meta.namespace.vala' } ] } ],
           comment: 'This is not quite right. See the class grammar right now' } ],
      '#object-types': 
       [ { token: 'storage.type.generic.vala',
           regex: '\\b(?:[a-z]\\w*\\.)*[A-Z]+\\w*<',
           push: 
            [ { token: 'storage.type.generic.vala',
                regex: '>|[^\\w\\s,\\?<\\[()\\]]',
                TODO: 'FIXME: regexp doesn\'t have js equivalent',
                originalRegex: '>|[^\\w\\s,\\?<\\[(?:[,]+)\\]]',
                next: 'pop' },
              { include: '#object-types' },
              { token: 'storage.type.generic.vala',
                regex: '<',
                push: 
                 [ { token: 'storage.type.generic.vala',
                     regex: '>|[^\\w\\s,\\[\\]<]',
                     next: 'pop' },
                   { defaultToken: 'storage.type.generic.vala' } ],
                comment: 'This is just to support <>\'s with no actual type prefix' },
              { defaultToken: 'storage.type.generic.vala' } ] },
         { token: 'storage.type.object.array.vala',
           regex: '\\b(?:[a-z]\\w*\\.)*[A-Z]+\\w*(?=\\[)',
           push: 
            [ { token: 'storage.type.object.array.vala',
                regex: '(?=[^\\]\\s])',
                next: 'pop' },
              { token: 'text',
                regex: '\\[',
                push: 
                 [ { token: 'text', regex: '\\]', next: 'pop' },
                   { include: '#code' } ] },
              { defaultToken: 'storage.type.object.array.vala' } ] },
         { token: 
            [ 'storage.type.vala',
              'keyword.operator.dereference.vala',
              'storage.type.vala' ],
           regex: '\\b(?:([a-z]\\w*)(\\.))*([A-Z]+\\w*\\b)' } ],
      '#object-types-inherited': 
       [ { token: 'entity.other.inherited-class.vala',
           regex: '\\b(?:[a-z]\\w*\\.)*[A-Z]+\\w*<',
           push: 
            [ { token: 'entity.other.inherited-class.vala',
                regex: '>|[^\\w\\s,<]',
                next: 'pop' },
              { include: '#object-types' },
              { token: 'storage.type.generic.vala',
                regex: '<',
                push: 
                 [ { token: 'storage.type.generic.vala',
                     regex: '>|[^\\w\\s,<]',
                     next: 'pop' },
                   { defaultToken: 'storage.type.generic.vala' } ],
                comment: 'This is just to support <>\'s with no actual type prefix' },
              { defaultToken: 'entity.other.inherited-class.vala' } ] },
         { token: 
            [ 'entity.other.inherited-class.vala',
              'keyword.operator.dereference.vala',
              'entity.other.inherited-class.vala' ],
           regex: '\\b(?:([a-z]\\w*)(\\.))*([A-Z]+\\w*)' } ],
      '#parameters': 
       [ { token: 'storage.modifier.vala', regex: 'final' },
         { include: '#primitive-arrays' },
         { include: '#primitive-types' },
         { include: '#object-types' },
         { token: 'variable.parameter.vala', regex: '\\w+' } ],
      '#parens': 
       [ { token: 'text',
           regex: '\\(',
           push: 
            [ { token: 'text', regex: '\\)', next: 'pop' },
              { include: '#code' } ] } ],
      '#primitive-arrays': 
       [ { token: 'storage.type.primitive.array.vala',
           regex: '\\b(?:bool|byte|sbyte|char|decimal|double|float|int|uint|long|ulong|object|short|ushort|string|void|int8|int16|int32|int64|uint8|uint16|uint32|uint64)(?:\\[\\])*\\b' } ],
      '#primitive-types': 
       [ { token: 'storage.type.primitive.vala',
           regex: '\\b(?:var|bool|byte|sbyte|char|decimal|double|float|int|uint|long|ulong|object|short|ushort|string|void|signal|int8|int16|int32|int64|uint8|uint16|uint32|uint64)\\b',
           comment: 'var is not really a primitive, but acts like one in most cases' } ],
      '#storage-modifiers': 
       [ { token: 'storage.modifier.vala',
           regex: '\\b(?:public|private|protected|internal|static|final|sealed|virtual|override|abstract|readonly|volatile|dynamic|async|unsafe|out|ref|weak|owned|unowned|const)\\b',
           comment: 'Not sure about unsafe and readonly' } ],
      '#strings': 
       [ { token: 'punctuation.definition.string.begin.vala',
           regex: '@"',
           push: 
            [ { token: 'punctuation.definition.string.end.vala',
                regex: '"',
                next: 'pop' },
              { token: 'constant.character.escape.vala',
                regex: '\\\\.|%[\\w\\.\\-]+|\\$(?:\\w+|\\([\\w\\s\\+\\-\\*\\/]+\\))' },
              { defaultToken: 'string.quoted.interpolated.vala' } ] },
         { token: 'punctuation.definition.string.begin.vala',
           regex: '"',
           push: 
            [ { token: 'punctuation.definition.string.end.vala',
                regex: '"',
                next: 'pop' },
              { token: 'constant.character.escape.vala', regex: '\\\\.' },
              { token: 'constant.character.escape.vala',
                regex: '%[\\w\\.\\-]+' },
              { defaultToken: 'string.quoted.double.vala' } ] },
         { token: 'punctuation.definition.string.begin.vala',
           regex: '\'',
           push: 
            [ { token: 'punctuation.definition.string.end.vala',
                regex: '\'',
                next: 'pop' },
              { token: 'constant.character.escape.vala', regex: '\\\\.' },
              { defaultToken: 'string.quoted.single.vala' } ] },
         { token: 'punctuation.definition.string.begin.vala',
           regex: '"""',
           push: 
            [ { token: 'punctuation.definition.string.end.vala',
                regex: '"""',
                next: 'pop' },
              { token: 'constant.character.escape.vala',
                regex: '%[\\w\\.\\-]+' },
              { defaultToken: 'string.quoted.triple.vala' } ] } ],
      '#throws': 
       [ { token: 'storage.modifier.vala',
           regex: 'throws',
           push: 
            [ { token: 'meta.throwables.vala', regex: '(?={|;)', next: 'pop' },
              { include: '#object-types' },
              { defaultToken: 'meta.throwables.vala' } ] } ],
      '#values': 
       [ { include: '#strings' },
         { include: '#object-types' },
         { include: '#constants-and-special-vars' } ] };
    
    this.normalizeRules();
};

ValaHighlightRules.metaData = { 
    comment: 'Based heavily on the Java bundle\'s language syntax. TODO:\n* Closures\n* Delegates\n* Properties: Better support for properties.\n* Annotations\n* Error domains\n* Named arguments\n* Array slicing, negative indexes, multidimensional\n* construct blocks\n* lock blocks?\n* regex literals\n* DocBlock syntax highlighting. (Currently importing javadoc)\n* Folding rule for comments.\n',
      fileTypes: [ 'vala' ],
      foldingStartMarker: '(\\{\\s*(//.*)?$|^\\s*// \\{\\{\\{)',
      foldingStopMarker: '^\\s*(\\}|// \\}\\}\\}$)',
      name: 'Vala',
      scopeName: 'source.vala' };


oop.inherits(ValaHighlightRules, TextHighlightRules);

exports.W = ValaHighlightRules;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ekUsZ0JBQWdCLDRDQUE0QyxHQUFHO0FBQy9ELFdBQVc7QUFDWDtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0EsNkJBQTZCO0FBQzdCLGdCQUFnQjtBQUNoQix3Q0FBd0M7QUFDeEMsZ0JBQWdCLDRDQUE0QyxJQUFJO0FBQ2hFO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxnQkFBZ0IsMkNBQTJDLEVBQUUsaUJBQWlCO0FBQzlFLGdCQUFnQiwwQkFBMEI7QUFDMUMsZ0JBQWdCLHVDQUF1QyxJQUFJO0FBQzNEO0FBQ0EsV0FBVyxxQkFBcUI7QUFDaEMsV0FBVywwQkFBMEI7QUFDckMsV0FBVyx5Q0FBeUM7QUFDcEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQix3QkFBd0IsR0FBRyxHQUFHO0FBQzdELG1DQUFtQyxPQUFPLEdBQUcsR0FBRztBQUNoRDtBQUNBOzs7QUFHQTs7QUFFQSxTQUEwQiIsInNvdXJjZXMiOlsid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvZm9sZGluZy9jc3R5bGUuanMiLCJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvbW9kZS9tYXRjaGluZ19icmFjZV9vdXRkZW50LmpzIiwid2VicGFjazovL2FjZS1saW50ZXJzLXJvb3QvLi9ub2RlX21vZHVsZXMvYWNlLWNvZGUvc3JjL21vZGUvdmFsYS5qcyIsIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9tb2RlL3ZhbGFfaGlnaGxpZ2h0X3J1bGVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uLy4uL2xpYi9vb3BcIik7XG52YXIgUmFuZ2UgPSByZXF1aXJlKFwiLi4vLi4vcmFuZ2VcIikuUmFuZ2U7XG52YXIgQmFzZUZvbGRNb2RlID0gcmVxdWlyZShcIi4vZm9sZF9tb2RlXCIpLkZvbGRNb2RlO1xuXG52YXIgRm9sZE1vZGUgPSBleHBvcnRzLkZvbGRNb2RlID0gZnVuY3Rpb24oY29tbWVudFJlZ2V4KSB7XG4gICAgaWYgKGNvbW1lbnRSZWdleCkge1xuICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlciA9IG5ldyBSZWdFeHAoXG4gICAgICAgICAgICB0aGlzLmZvbGRpbmdTdGFydE1hcmtlci5zb3VyY2UucmVwbGFjZSgvXFx8W158XSo/JC8sIFwifFwiICsgY29tbWVudFJlZ2V4LnN0YXJ0KVxuICAgICAgICApO1xuICAgICAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gbmV3IFJlZ0V4cChcbiAgICAgICAgICAgIHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIuc291cmNlLnJlcGxhY2UoL1xcfFtefF0qPyQvLCBcInxcIiArIGNvbW1lbnRSZWdleC5lbmQpXG4gICAgICAgICk7XG4gICAgfVxufTtcbm9vcC5pbmhlcml0cyhGb2xkTW9kZSwgQmFzZUZvbGRNb2RlKTtcblxuKGZ1bmN0aW9uKCkge1xuICAgIFxuICAgIHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyID0gLyhbXFx7XFxbXFwoXSlbXlxcfVxcXVxcKV0qJHxeXFxzKihcXC9cXCopLztcbiAgICB0aGlzLmZvbGRpbmdTdG9wTWFya2VyID0gL15bXlxcW1xce1xcKF0qKFtcXH1cXF1cXCldKXxeW1xcc1xcKl0qKFxcKlxcLykvO1xuICAgIHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlPSAvXlxccyooXFwvXFwqKS4qXFwqXFwvXFxzKiQvO1xuICAgIHRoaXMudHJpcGxlU3RhckJsb2NrQ29tbWVudFJlID0gL15cXHMqKFxcL1xcKlxcKlxcKikuKlxcKlxcL1xccyokLztcbiAgICB0aGlzLnN0YXJ0UmVnaW9uUmUgPSAvXlxccyooXFwvXFwqfFxcL1xcLykjP3JlZ2lvblxcYi87XG4gICAgXG4gICAgLy9wcmV2ZW50IG5hbWluZyBjb25mbGljdCB3aXRoIGFueSBtb2RlcyB0aGF0IGluaGVyaXQgZnJvbSBjc3R5bGUgYW5kIG92ZXJyaWRlIHRoaXMgKGxpa2UgY3NoYXJwKVxuICAgIHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlID0gdGhpcy5nZXRGb2xkV2lkZ2V0O1xuICAgIFxuICAgIC8qKlxuICAgICAqIEdldHMgZm9sZCB3aWRnZXQgd2l0aCBzb21lIG5vbi1zdGFuZGFyZCBleHRyYXM6XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZSBsaW5lQ29tbWVudFJlZ2lvblN0YXJ0XG4gICAgICogICAgICAvLyNyZWdpb24gW29wdGlvbmFsIGRlc2NyaXB0aW9uXVxuICAgICAqXG4gICAgICogQGV4YW1wbGUgYmxvY2tDb21tZW50UmVnaW9uU3RhcnRcbiAgICAgKiAgICAgIC8qI3JlZ2lvbiBbb3B0aW9uYWwgZGVzY3JpcHRpb25dICpbL11cbiAgICAgKlxuICAgICAqIEBleGFtcGxlIHRyaXBsZVN0YXJGb2xkaW5nU2VjdGlvblxuICAgICAqICAgICAgLyoqKiB0aGlzIGZvbGRzIGV2ZW4gdGhvdWdoIDEgbGluZSBiZWNhdXNlIGl0IGhhcyAzIHN0YXJzICoqKlsvXVxuICAgICAqIFxuICAgICAqIEBub3RlIHRoZSBwb3VuZCBzeW1ib2wgZm9yIHJlZ2lvbiB0YWdzIGlzIG9wdGlvbmFsXG4gICAgICovXG4gICAgdGhpcy5nZXRGb2xkV2lkZ2V0ID0gZnVuY3Rpb24oc2Vzc2lvbiwgZm9sZFN0eWxlLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICBcbiAgICAgICAgaWYgKHRoaXMuc2luZ2xlTGluZUJsb2NrQ29tbWVudFJlLnRlc3QobGluZSkpIHtcbiAgICAgICAgICAgIC8vIE5vIHdpZGdldCBmb3Igc2luZ2xlIGxpbmUgYmxvY2sgY29tbWVudCB1bmxlc3MgcmVnaW9uIG9yIHRyaXBsZSBzdGFyXG4gICAgICAgICAgICBpZiAoIXRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpICYmICF0aGlzLnRyaXBsZVN0YXJCbG9ja0NvbW1lbnRSZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgICB9XG4gICAgXG4gICAgICAgIHZhciBmdyA9IHRoaXMuX2dldEZvbGRXaWRnZXRCYXNlKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93KTtcbiAgICBcbiAgICAgICAgaWYgKCFmdyAmJiB0aGlzLnN0YXJ0UmVnaW9uUmUudGVzdChsaW5lKSlcbiAgICAgICAgICAgIHJldHVybiBcInN0YXJ0XCI7IC8vIGxpbmVDb21tZW50UmVnaW9uU3RhcnRcbiAgICBcbiAgICAgICAgcmV0dXJuIGZ3O1xuICAgIH07XG5cbiAgICB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIGZvbGRTdHlsZSwgcm93LCBmb3JjZU11bHRpbGluZSkge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICBcbiAgICAgICAgaWYgKHRoaXMuc3RhcnRSZWdpb25SZS50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrKHNlc3Npb24sIGxpbmUsIHJvdyk7XG4gICAgICAgIFxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0YXJ0TWFya2VyKTtcbiAgICAgICAgaWYgKG1hdGNoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IG1hdGNoLmluZGV4O1xuXG4gICAgICAgICAgICBpZiAobWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMub3BlbmluZ0JyYWNrZXRCbG9jayhzZXNzaW9uLCBtYXRjaFsxXSwgcm93LCBpKTtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciByYW5nZSA9IHNlc3Npb24uZ2V0Q29tbWVudEZvbGRSYW5nZShyb3csIGkgKyBtYXRjaFswXS5sZW5ndGgsIDEpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAocmFuZ2UgJiYgIXJhbmdlLmlzTXVsdGlMaW5lKCkpIHtcbiAgICAgICAgICAgICAgICBpZiAoZm9yY2VNdWx0aWxpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmFuZ2UgPSB0aGlzLmdldFNlY3Rpb25SYW5nZShzZXNzaW9uLCByb3cpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZm9sZFN0eWxlICE9IFwiYWxsXCIpXG4gICAgICAgICAgICAgICAgICAgIHJhbmdlID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcmV0dXJuIHJhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZvbGRTdHlsZSA9PT0gXCJtYXJrYmVnaW5cIilcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKHRoaXMuZm9sZGluZ1N0b3BNYXJrZXIpO1xuICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgIHZhciBpID0gbWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGg7XG5cbiAgICAgICAgICAgIGlmIChtYXRjaFsxXSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jbG9zaW5nQnJhY2tldEJsb2NrKHNlc3Npb24sIG1hdGNoWzFdLCByb3csIGkpO1xuXG4gICAgICAgICAgICByZXR1cm4gc2Vzc2lvbi5nZXRDb21tZW50Rm9sZFJhbmdlKHJvdywgaSwgLTEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBcbiAgICB0aGlzLmdldFNlY3Rpb25SYW5nZSA9IGZ1bmN0aW9uKHNlc3Npb24sIHJvdykge1xuICAgICAgICB2YXIgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgc3RhcnRJbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgIHZhciBzdGFydFJvdyA9IHJvdztcbiAgICAgICAgdmFyIHN0YXJ0Q29sdW1uID0gbGluZS5sZW5ndGg7XG4gICAgICAgIHJvdyA9IHJvdyArIDE7XG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIHZhciBtYXhSb3cgPSBzZXNzaW9uLmdldExlbmd0aCgpO1xuICAgICAgICB3aGlsZSAoKytyb3cgPCBtYXhSb3cpIHtcbiAgICAgICAgICAgIGxpbmUgPSBzZXNzaW9uLmdldExpbmUocm93KTtcbiAgICAgICAgICAgIHZhciBpbmRlbnQgPSBsaW5lLnNlYXJjaCgvXFxTLyk7XG4gICAgICAgICAgICBpZiAoaW5kZW50ID09PSAtMSlcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIGlmICAoc3RhcnRJbmRlbnQgPiBpbmRlbnQpXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB2YXIgc3ViUmFuZ2UgPSB0aGlzLmdldEZvbGRXaWRnZXRSYW5nZShzZXNzaW9uLCBcImFsbFwiLCByb3cpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAoc3ViUmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoc3ViUmFuZ2Uuc3RhcnQucm93IDw9IHN0YXJ0Um93KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3ViUmFuZ2UuaXNNdWx0aUxpbmUoKSkge1xuICAgICAgICAgICAgICAgICAgICByb3cgPSBzdWJSYW5nZS5lbmQucm93O1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhcnRJbmRlbnQgPT0gaW5kZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFJvdyA9IHJvdztcbiAgICAgICAgfVxuICAgICAgICBcbiAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgc2Vzc2lvbi5nZXRMaW5lKGVuZFJvdykubGVuZ3RoKTtcbiAgICB9O1xuICAgIFxuICAgIC8qKlxuICAgICAqIGdldHMgY29tbWVudCByZWdpb24gYmxvY2sgd2l0aCBlbmQgcmVnaW9uIGFzc3VtZWQgdG8gYmUgc3RhcnQgb2YgY29tbWVudCBpbiBhbnkgY3N0eWxlIG1vZGUgb3IgU1FMIG1vZGUgKC0tKSB3aGljaCBpbmhlcml0cyBmcm9tIHRoaXMuXG4gICAgICogVGhlcmUgbWF5IG9wdGlvbmFsbHkgYmUgYSBwb3VuZCBzeW1ib2wgYmVmb3JlIHRoZSByZWdpb24vZW5kcmVnaW9uIHN0YXRlbWVudFxuICAgICAqL1xuICAgIHRoaXMuZ2V0Q29tbWVudFJlZ2lvbkJsb2NrID0gZnVuY3Rpb24oc2Vzc2lvbiwgbGluZSwgcm93KSB7XG4gICAgICAgIHZhciBzdGFydENvbHVtbiA9IGxpbmUuc2VhcmNoKC9cXHMqJC8pO1xuICAgICAgICB2YXIgbWF4Um93ID0gc2Vzc2lvbi5nZXRMZW5ndGgoKTtcbiAgICAgICAgdmFyIHN0YXJ0Um93ID0gcm93O1xuICAgICAgICBcbiAgICAgICAgdmFyIHJlID0gL15cXHMqKD86XFwvXFwqfFxcL1xcL3wtLSkjPyhlbmQpP3JlZ2lvblxcYi87XG4gICAgICAgIHZhciBkZXB0aCA9IDE7XG4gICAgICAgIHdoaWxlICgrK3JvdyA8IG1heFJvdykge1xuICAgICAgICAgICAgbGluZSA9IHNlc3Npb24uZ2V0TGluZShyb3cpO1xuICAgICAgICAgICAgdmFyIG0gPSByZS5leGVjKGxpbmUpO1xuICAgICAgICAgICAgaWYgKCFtKSBjb250aW51ZTtcbiAgICAgICAgICAgIGlmIChtWzFdKSBkZXB0aC0tO1xuICAgICAgICAgICAgZWxzZSBkZXB0aCsrO1xuXG4gICAgICAgICAgICBpZiAoIWRlcHRoKSBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBlbmRSb3cgPSByb3c7XG4gICAgICAgIGlmIChlbmRSb3cgPiBzdGFydFJvdykge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBSYW5nZShzdGFydFJvdywgc3RhcnRDb2x1bW4sIGVuZFJvdywgbGluZS5sZW5ndGgpO1xuICAgICAgICB9XG4gICAgfTtcblxufSkuY2FsbChGb2xkTW9kZS5wcm90b3R5cGUpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBSYW5nZSA9IHJlcXVpcmUoXCIuLi9yYW5nZVwiKS5SYW5nZTtcblxudmFyIE1hdGNoaW5nQnJhY2VPdXRkZW50ID0gZnVuY3Rpb24oKSB7fTtcblxuKGZ1bmN0aW9uKCkge1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihsaW5lLCBpbnB1dCkge1xuICAgICAgICBpZiAoISAvXlxccyskLy50ZXN0KGxpbmUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHJldHVybiAvXlxccypcXH0vLnRlc3QoaW5wdXQpO1xuICAgIH07XG5cbiAgICB0aGlzLmF1dG9PdXRkZW50ID0gZnVuY3Rpb24oZG9jLCByb3cpIHtcbiAgICAgICAgdmFyIGxpbmUgPSBkb2MuZ2V0TGluZShyb3cpO1xuICAgICAgICB2YXIgbWF0Y2ggPSBsaW5lLm1hdGNoKC9eKFxccypcXH0pLyk7XG5cbiAgICAgICAgaWYgKCFtYXRjaCkgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGNvbHVtbiA9IG1hdGNoWzFdLmxlbmd0aDtcbiAgICAgICAgdmFyIG9wZW5CcmFjZVBvcyA9IGRvYy5maW5kTWF0Y2hpbmdCcmFja2V0KHtyb3c6IHJvdywgY29sdW1uOiBjb2x1bW59KTtcblxuICAgICAgICBpZiAoIW9wZW5CcmFjZVBvcyB8fCBvcGVuQnJhY2VQb3Mucm93ID09IHJvdykgcmV0dXJuIDA7XG5cbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChkb2MuZ2V0TGluZShvcGVuQnJhY2VQb3Mucm93KSk7XG4gICAgICAgIGRvYy5yZXBsYWNlKG5ldyBSYW5nZShyb3csIDAsIHJvdywgY29sdW1uLTEpLCBpbmRlbnQpO1xuICAgIH07XG5cbiAgICB0aGlzLiRnZXRJbmRlbnQgPSBmdW5jdGlvbihsaW5lKSB7XG4gICAgICAgIHJldHVybiBsaW5lLm1hdGNoKC9eXFxzKi8pWzBdO1xuICAgIH07XG5cbn0pLmNhbGwoTWF0Y2hpbmdCcmFjZU91dGRlbnQucHJvdG90eXBlKTtcblxuZXhwb3J0cy5NYXRjaGluZ0JyYWNlT3V0ZGVudCA9IE1hdGNoaW5nQnJhY2VPdXRkZW50O1xuIiwiLypcbiAgVEhJUyBGSUxFIFdBUyBBVVRPR0VORVJBVEVEIEJZIG1vZGUudG1wbC5qc1xuKi9cblxuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBvb3AgPSByZXF1aXJlKFwiLi4vbGliL29vcFwiKTtcbnZhciBUZXh0TW9kZSA9IHJlcXVpcmUoXCIuL3RleHRcIikuTW9kZTtcbnZhciBWYWxhSGlnaGxpZ2h0UnVsZXMgPSByZXF1aXJlKFwiLi92YWxhX2hpZ2hsaWdodF9ydWxlc1wiKS5WYWxhSGlnaGxpZ2h0UnVsZXM7XG52YXIgQ1N0eWxlRm9sZE1vZGUgPSByZXF1aXJlKFwiLi9mb2xkaW5nL2NzdHlsZVwiKS5Gb2xkTW9kZTtcbnZhciBNYXRjaGluZ0JyYWNlT3V0ZGVudCA9IHJlcXVpcmUoXCIuL21hdGNoaW5nX2JyYWNlX291dGRlbnRcIikuTWF0Y2hpbmdCcmFjZU91dGRlbnQ7XG5cbnZhciBNb2RlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5IaWdobGlnaHRSdWxlcyA9IFZhbGFIaWdobGlnaHRSdWxlcztcbiAgICBcbiAgICB0aGlzLiRvdXRkZW50ID0gbmV3IE1hdGNoaW5nQnJhY2VPdXRkZW50KCk7XG4gICAgdGhpcy4kYmVoYXZpb3VyID0gdGhpcy4kZGVmYXVsdEJlaGF2aW91cjtcbiAgICB0aGlzLmZvbGRpbmdSdWxlcyA9IG5ldyBDU3R5bGVGb2xkTW9kZSgpO1xufTtcbm9vcC5pbmhlcml0cyhNb2RlLCBUZXh0TW9kZSk7XG5cbihmdW5jdGlvbigpIHtcbiAgICB0aGlzLmxpbmVDb21tZW50U3RhcnQgPSBcIi8vXCI7XG4gICAgdGhpcy5ibG9ja0NvbW1lbnQgPSB7c3RhcnQ6IFwiLypcIiwgZW5kOiBcIiovXCJ9O1xuXG4gICAgdGhpcy5nZXROZXh0TGluZUluZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBsaW5lLCB0YWIpIHtcbiAgICAgICAgdmFyIGluZGVudCA9IHRoaXMuJGdldEluZGVudChsaW5lKTtcblxuICAgICAgICB2YXIgdG9rZW5pemVkTGluZSA9IHRoaXMuZ2V0VG9rZW5pemVyKCkuZ2V0TGluZVRva2VucyhsaW5lLCBzdGF0ZSk7XG4gICAgICAgIHZhciB0b2tlbnMgPSB0b2tlbml6ZWRMaW5lLnRva2VucztcbiAgICAgICAgdmFyIGVuZFN0YXRlID0gdG9rZW5pemVkTGluZS5zdGF0ZTtcblxuICAgICAgICBpZiAodG9rZW5zLmxlbmd0aCAmJiB0b2tlbnNbdG9rZW5zLmxlbmd0aC0xXS50eXBlID09IFwiY29tbWVudFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gaW5kZW50O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHN0YXRlID09IFwic3RhcnRcIiB8fCBzdGF0ZSA9PSBcIm5vX3JlZ2V4XCIpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL14uKig/OlxcYmNhc2VcXGIuKjp8W1xce1xcKFxcW10pXFxzKiQvKTtcbiAgICAgICAgICAgIGlmIChtYXRjaCkge1xuICAgICAgICAgICAgICAgIGluZGVudCArPSB0YWI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUgPT0gXCJkb2Mtc3RhcnRcIikge1xuICAgICAgICAgICAgaWYgKGVuZFN0YXRlID09IFwic3RhcnRcIiB8fCBlbmRTdGF0ZSA9PSBcIm5vX3JlZ2V4XCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goL15cXHMqKFxcLz8pXFwqLyk7XG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZW50ICs9IFwiIFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpbmRlbnQgKz0gXCIqIFwiO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGluZGVudDtcbiAgICB9O1xuXG4gICAgdGhpcy5jaGVja091dGRlbnQgPSBmdW5jdGlvbihzdGF0ZSwgbGluZSwgaW5wdXQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuJG91dGRlbnQuY2hlY2tPdXRkZW50KGxpbmUsIGlucHV0KTtcbiAgICB9O1xuXG4gICAgdGhpcy5hdXRvT3V0ZGVudCA9IGZ1bmN0aW9uKHN0YXRlLCBkb2MsIHJvdykge1xuICAgICAgICB0aGlzLiRvdXRkZW50LmF1dG9PdXRkZW50KGRvYywgcm93KTtcbiAgICB9O1xuXG4gICAgLy8gRXh0cmEgbG9naWMgZ29lcyBoZXJlLlxuICAgIHRoaXMuJGlkID0gXCJhY2UvbW9kZS92YWxhXCI7XG4gICAgdGhpcy5zbmlwcGV0RmlsZUlkID0gXCJhY2Uvc25pcHBldHMvdmFsYVwiO1xufSkuY2FsbChNb2RlLnByb3RvdHlwZSk7XG5cbmV4cG9ydHMuTW9kZSA9IE1vZGU7XG4iLCIvKiBUaGlzIGZpbGUgd2FzIGF1dG9nZW5lcmF0ZWQgZnJvbSBodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vdGVjaG5vc29waG9zL1ZhbGEtVE1CdW5kbGUvbWFzdGVyL1N5bnRheGVzL1ZhbGEudG1MYW5ndWFnZSAodXVpZDogKSAqL1xuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKipcbiAqIElUIE1JR0hUIE5PVCBCRSBQRVJGRUNUIC4uLkJ1dCBpdCdzIGEgZ29vZCBzdGFydCBmcm9tIGFuIGV4aXN0aW5nICoudG1sYW5ndWFnZSBmaWxlLiAqXG4gKiBmaWxlVHlwZXMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKlxuICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG5cblwidXNlIHN0cmljdFwiO1xuXG52YXIgb29wID0gcmVxdWlyZShcIi4uL2xpYi9vb3BcIik7XG52YXIgVGV4dEhpZ2hsaWdodFJ1bGVzID0gcmVxdWlyZShcIi4vdGV4dF9oaWdobGlnaHRfcnVsZXNcIikuVGV4dEhpZ2hsaWdodFJ1bGVzO1xuXG52YXIgVmFsYUhpZ2hsaWdodFJ1bGVzID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gcmVnZXhwIG11c3Qgbm90IGhhdmUgY2FwdHVyaW5nIHBhcmVudGhlc2VzLiBVc2UgKD86KSBpbnN0ZWFkLlxuICAgIC8vIHJlZ2V4cHMgYXJlIG9yZGVyZWQgLT4gdGhlIGZpcnN0IG1hdGNoIGlzIHVzZWRcblxuICAgIHRoaXMuJHJ1bGVzID0geyBzdGFydDogXG4gICAgICAgWyB7IHRva2VuOiBcbiAgICAgICAgICAgIFsgJ21ldGEudXNpbmcudmFsYScsXG4gICAgICAgICAgICAgICdrZXl3b3JkLm90aGVyLnVzaW5nLnZhbGEnLFxuICAgICAgICAgICAgICAnbWV0YS51c2luZy52YWxhJyxcbiAgICAgICAgICAgICAgJ3N0b3JhZ2UubW9kaWZpZXIudXNpbmcudmFsYScsXG4gICAgICAgICAgICAgICdtZXRhLnVzaW5nLnZhbGEnLFxuICAgICAgICAgICAgICAncHVuY3R1YXRpb24udGVybWluYXRvci52YWxhJyBdLFxuICAgICAgICAgICByZWdleDogJ14oXFxcXHMqKSh1c2luZylcXFxcYig/OihcXFxccyopKFteIDskXSspKFxcXFxzKikoKD86Oyk/KSk/JyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI2NvZGUnIH0gXSxcbiAgICAgICcjYWxsLXR5cGVzJzogXG4gICAgICAgWyB7IGluY2x1ZGU6ICcjcHJpbWl0aXZlLWFycmF5cycgfSxcbiAgICAgICAgIHsgaW5jbHVkZTogJyNwcmltaXRpdmUtdHlwZXMnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjb2JqZWN0LXR5cGVzJyB9IF0sXG4gICAgICAnI2Fubm90YXRpb25zJzogXG4gICAgICAgWyB7IHRva2VuOiBcbiAgICAgICAgICAgIFsgJ3N0b3JhZ2UudHlwZS5hbm5vdGF0aW9uLnZhbGEnLFxuICAgICAgICAgICAgICAncHVuY3R1YXRpb24uZGVmaW5pdGlvbi5hbm5vdGF0aW9uLWFyZ3VtZW50cy5iZWdpbi52YWxhJyBdLFxuICAgICAgICAgICByZWdleDogJyhAW14gKF0rKShcXFxcKCknLFxuICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgIFsgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24uYW5ub3RhdGlvbi1hcmd1bWVudHMuZW5kLnZhbGEnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFxcXCknLFxuICAgICAgICAgICAgICAgIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgIHsgdG9rZW46IFxuICAgICAgICAgICAgICAgICBbICdjb25zdGFudC5vdGhlci5rZXkudmFsYScsXG4gICAgICAgICAgICAgICAgICAgJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICdrZXl3b3JkLm9wZXJhdG9yLmFzc2lnbm1lbnQudmFsYScgXSxcbiAgICAgICAgICAgICAgICByZWdleDogJyhcXFxcdyopKFxcXFxzKikoPSknIH0sXG4gICAgICAgICAgICAgIHsgaW5jbHVkZTogJyNjb2RlJyB9LFxuICAgICAgICAgICAgICB7IHRva2VuOiAncHVuY3R1YXRpb24uc2VwZXJhdG9yLnByb3BlcnR5LnZhbGEnLCByZWdleDogJywnIH0sXG4gICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnbWV0YS5kZWNsYXJhdGlvbi5hbm5vdGF0aW9uLnZhbGEnIH0gXSB9LFxuICAgICAgICAgeyB0b2tlbjogJ3N0b3JhZ2UudHlwZS5hbm5vdGF0aW9uLnZhbGEnLCByZWdleDogJ0BcXFxcdyonIH0gXSxcbiAgICAgICcjYW5vbnltb3VzLWNsYXNzZXMtYW5kLW5ldyc6IFxuICAgICAgIFsgeyB0b2tlbjogJ2tleXdvcmQuY29udHJvbC5uZXcudmFsYScsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGJuZXdcXFxcYicsXG4gICAgICAgICAgIHB1c2hfZGlzYWJsZWQ6IFxuICAgICAgICAgICAgWyB7IHRva2VuOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICcoPzw9XFxcXCl8XFxcXF0pKD8hXFxcXHMqeyl8KD88PX0pfCg/PTspJyxcbiAgICAgICAgICAgICAgICBUT0RPOiAnRklYTUU6IHJlZ2V4cCBkb2VzblxcJ3QgaGF2ZSBqcyBlcXVpdmFsZW50JyxcbiAgICAgICAgICAgICAgICBvcmlnaW5hbFJlZ2V4OiAnKD88PVxcXFwpfFxcXFxdKSg/IVxcXFxzKnspfCg/PD19KXwoPz07KScsXG4gICAgICAgICAgICAgICAgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogWyAnc3RvcmFnZS50eXBlLnZhbGEnLCAndGV4dCcgXSxcbiAgICAgICAgICAgICAgICByZWdleDogJyhcXFxcdyspKFxcXFxzKikoPz1cXFxcWyknLFxuICAgICAgICAgICAgICAgIHB1c2g6IFxuICAgICAgICAgICAgICAgICBbIHsgdG9rZW46ICd0ZXh0JywgcmVnZXg6ICd9fCg/PTt8XFxcXCkpJywgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgICAgICB7IHRva2VuOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICByZWdleDogJ1xcXFxbJyxcbiAgICAgICAgICAgICAgICAgICAgIHB1c2g6IFxuICAgICAgICAgICAgICAgICAgICAgIFsgeyB0b2tlbjogJ3RleHQnLCByZWdleDogJ1xcXFxdJywgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaW5jbHVkZTogJyNjb2RlJyB9IF0gfSxcbiAgICAgICAgICAgICAgICAgICB7IHRva2VuOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICByZWdleDogJ3snLFxuICAgICAgICAgICAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICAgICAgICAgICAgWyB7IHRva2VuOiAndGV4dCcsIHJlZ2V4OiAnKD89fSknLCBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI2NvZGUnIH0gXSB9IF0gfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ3RleHQnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnKD89XFxcXHcuKlxcXFwoKScsXG4gICAgICAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICAgICAgIFsgeyB0b2tlbjogJ3RleHQnLFxuICAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICcoPzw9XFxcXCkpJyxcbiAgICAgICAgICAgICAgICAgICAgIFRPRE86ICdGSVhNRTogcmVnZXhwIGRvZXNuXFwndCBoYXZlIGpzIGVxdWl2YWxlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWxSZWdleDogJyg/PD1cXFxcKSknLFxuICAgICAgICAgICAgICAgICAgICAgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjb2JqZWN0LXR5cGVzJyB9LFxuICAgICAgICAgICAgICAgICAgIHsgdG9rZW46ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFxcXCgnLFxuICAgICAgICAgICAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICAgICAgICAgICAgWyB7IHRva2VuOiAndGV4dCcsIHJlZ2V4OiAnXFxcXCknLCBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI2NvZGUnIH0gXSB9IF0gfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ21ldGEuaW5uZXItY2xhc3MudmFsYScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICd7JyxcbiAgICAgICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgICAgICAgWyB7IHRva2VuOiAnbWV0YS5pbm5lci1jbGFzcy52YWxhJywgcmVnZXg6ICd9JywgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjY2xhc3MtYm9keScgfSxcbiAgICAgICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ21ldGEuaW5uZXItY2xhc3MudmFsYScgfSBdIH0gXSB9IF0sXG4gICAgICAnI2Fzc2VydGlvbnMnOiBcbiAgICAgICBbIHsgdG9rZW46IFxuICAgICAgICAgICAgWyAna2V5d29yZC5jb250cm9sLmFzc2VydC52YWxhJyxcbiAgICAgICAgICAgICAgJ21ldGEuZGVjbGFyYXRpb24uYXNzZXJ0aW9uLnZhbGEnIF0sXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGIoYXNzZXJ0fHJlcXVpcmVzfGVuc3VyZXMpKFxcXFxzKScsXG4gICAgICAgICAgIHB1c2g6IFxuICAgICAgICAgICAgWyB7IHRva2VuOiAnbWV0YS5kZWNsYXJhdGlvbi5hc3NlcnRpb24udmFsYScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICckJyxcbiAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICB7IHRva2VuOiAna2V5d29yZC5vcGVyYXRvci5hc3NlcnQuZXhwcmVzc2lvbi1zZXBlcmF0b3IudmFsYScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICc6JyB9LFxuICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjY29kZScgfSxcbiAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdtZXRhLmRlY2xhcmF0aW9uLmFzc2VydGlvbi52YWxhJyB9IF0gfSBdLFxuICAgICAgJyNjbGFzcyc6IFxuICAgICAgIFsgeyB0b2tlbjogJ21ldGEuY2xhc3MudmFsYScsXG4gICAgICAgICAgIHJlZ2V4OiAnKD89XFxcXHc/W1xcXFx3XFxcXHNdKig/OmNsYXNzfCg/OkApP2ludGVyZmFjZXxlbnVtfHN0cnVjdHxuYW1lc3BhY2UpXFxcXHMrXFxcXHcrKScsXG4gICAgICAgICAgIHB1c2g6IFxuICAgICAgICAgICAgWyB7IHRva2VuOiAncGFyZW4udmFsYScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICd9JyxcbiAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjc3RvcmFnZS1tb2RpZmllcnMnIH0sXG4gICAgICAgICAgICAgIHsgaW5jbHVkZTogJyNjb21tZW50cycgfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogXG4gICAgICAgICAgICAgICAgIFsgJ3N0b3JhZ2UubW9kaWZpZXIudmFsYScsXG4gICAgICAgICAgICAgICAgICAgJ21ldGEuY2xhc3MuaWRlbnRpZmllci52YWxhJyxcbiAgICAgICAgICAgICAgICAgICAnZW50aXR5Lm5hbWUudHlwZS5jbGFzcy52YWxhJyBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnKGNsYXNzfCg/OkApP2ludGVyZmFjZXxlbnVtfHN0cnVjdHxuYW1lc3BhY2UpKFxcXFxzKykoW1xcXFx3XFxcXC5dKyknIH0sXG4gICAgICAgICAgICAgIHsgdG9rZW46ICdzdG9yYWdlLm1vZGlmaWVyLmV4dGVuZHMudmFsYScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICc6JyxcbiAgICAgICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgICAgICAgWyB7IHRva2VuOiAnbWV0YS5kZWZpbml0aW9uLmNsYXNzLmluaGVyaXRlZC5jbGFzc2VzLnZhbGEnLFxuICAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICcoPz17fCwpJyxcbiAgICAgICAgICAgICAgICAgICAgIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI29iamVjdC10eXBlcy1pbmhlcml0ZWQnIH0sXG4gICAgICAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI2NvbW1lbnRzJyB9LFxuICAgICAgICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnbWV0YS5kZWZpbml0aW9uLmNsYXNzLmluaGVyaXRlZC5jbGFzc2VzLnZhbGEnIH0gXSB9LFxuICAgICAgICAgICAgICB7IHRva2VuOiBcbiAgICAgICAgICAgICAgICAgWyAnc3RvcmFnZS5tb2RpZmllci5pbXBsZW1lbnRzLnZhbGEnLFxuICAgICAgICAgICAgICAgICAgICdtZXRhLmRlZmluaXRpb24uY2xhc3MuaW1wbGVtZW50ZWQuaW50ZXJmYWNlcy52YWxhJyBdLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnKCwpKFxcXFxzKScsXG4gICAgICAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICAgICAgIFsgeyB0b2tlbjogJ21ldGEuZGVmaW5pdGlvbi5jbGFzcy5pbXBsZW1lbnRlZC5pbnRlcmZhY2VzLnZhbGEnLFxuICAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICcoPz1cXFxceyknLFxuICAgICAgICAgICAgICAgICAgICAgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjb2JqZWN0LXR5cGVzLWluaGVyaXRlZCcgfSxcbiAgICAgICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjY29tbWVudHMnIH0sXG4gICAgICAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdtZXRhLmRlZmluaXRpb24uY2xhc3MuaW1wbGVtZW50ZWQuaW50ZXJmYWNlcy52YWxhJyB9IF0gfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ3BhcmVuLnZhbGEnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAneycsXG4gICAgICAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICAgICAgIFsgeyB0b2tlbjogJ3BhcmVuLnZhbGEnLCByZWdleDogJyg/PX0pJywgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjY2xhc3MtYm9keScgfSxcbiAgICAgICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ21ldGEuY2xhc3MuYm9keS52YWxhJyB9IF0gfSxcbiAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdtZXRhLmNsYXNzLnZhbGEnIH0gXSxcbiAgICAgICAgICAgY29tbWVudDogJ2F0dGVtcHRpbmcgdG8gcHV0IG5hbWVzcGFjZSBpbiBoZXJlLicgfSBdLFxuICAgICAgJyNjbGFzcy1ib2R5JzogXG4gICAgICAgWyB7IGluY2x1ZGU6ICcjY29tbWVudHMnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjY2xhc3MnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjZW51bXMnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjbWV0aG9kcycgfSxcbiAgICAgICAgIHsgaW5jbHVkZTogJyNhbm5vdGF0aW9ucycgfSxcbiAgICAgICAgIHsgaW5jbHVkZTogJyNzdG9yYWdlLW1vZGlmaWVycycgfSxcbiAgICAgICAgIHsgaW5jbHVkZTogJyNjb2RlJyB9IF0sXG4gICAgICAnI2NvZGUnOiBcbiAgICAgICBbIHsgaW5jbHVkZTogJyNjb21tZW50cycgfSxcbiAgICAgICAgIHsgaW5jbHVkZTogJyNjbGFzcycgfSxcbiAgICAgICAgIHsgdG9rZW46ICd0ZXh0JyxcbiAgICAgICAgICAgcmVnZXg6ICd7JyxcbiAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICBbIHsgdG9rZW46ICd0ZXh0JywgcmVnZXg6ICd9JywgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI2NvZGUnIH0gXSB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI2Fzc2VydGlvbnMnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjcGFyZW5zJyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI2NvbnN0YW50cy1hbmQtc3BlY2lhbC12YXJzJyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI2Fub255bW91cy1jbGFzc2VzLWFuZC1uZXcnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcja2V5d29yZHMnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjc3RvcmFnZS1tb2RpZmllcnMnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjc3RyaW5ncycgfSxcbiAgICAgICAgIHsgaW5jbHVkZTogJyNhbGwtdHlwZXMnIH0gXSxcbiAgICAgICcjY29tbWVudHMnOiBcbiAgICAgICBbIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLmNvbW1lbnQudmFsYScsXG4gICAgICAgICAgIHJlZ2V4OiAnL1xcXFwqXFxcXCovJyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAndGV4dC5odG1sLmphdmFkb2MnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjY29tbWVudHMtaW5saW5lJyB9IF0sXG4gICAgICAnI2NvbW1lbnRzLWlubGluZSc6IFxuICAgICAgIFsgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24uY29tbWVudC52YWxhJyxcbiAgICAgICAgICAgcmVnZXg6ICcvXFxcXConLFxuICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgIFsgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24uY29tbWVudC52YWxhJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFwqLycsXG4gICAgICAgICAgICAgICAgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdjb21tZW50LmJsb2NrLnZhbGEnIH0gXSB9LFxuICAgICAgICAgeyB0b2tlbjogXG4gICAgICAgICAgICBbICd0ZXh0JyxcbiAgICAgICAgICAgICAgJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24uY29tbWVudC52YWxhJyxcbiAgICAgICAgICAgICAgJ2NvbW1lbnQubGluZS5kb3VibGUtc2xhc2gudmFsYScgXSxcbiAgICAgICAgICAgcmVnZXg6ICcoXFxcXHMqKSgvLykoLiokKScgfSBdLFxuICAgICAgJyNjb25zdGFudHMtYW5kLXNwZWNpYWwtdmFycyc6IFxuICAgICAgIFsgeyB0b2tlbjogJ2NvbnN0YW50Lmxhbmd1YWdlLnZhbGEnLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiKD86dHJ1ZXxmYWxzZXxudWxsKVxcXFxiJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ3ZhcmlhYmxlLmxhbmd1YWdlLnZhbGEnLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiKD86dGhpc3xiYXNlKVxcXFxiJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2NvbnN0YW50Lm51bWVyaWMudmFsYScsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGIoPzowKD86eHxYKVswLTlhLWZBLUZdKnwoPzpbMC05XStcXFxcLj9bMC05XSp8XFxcXC5bMC05XSspKD86KD86ZXxFKSg/OlxcXFwrfC0pP1swLTldKyk/KSg/OltMbEZmVXVEZF18VUx8dWwpP1xcXFxiJyB9LFxuICAgICAgICAgeyB0b2tlbjogWyAna2V5d29yZC5vcGVyYXRvci5kZXJlZmVyZW5jZS52YWxhJywgJ2NvbnN0YW50Lm90aGVyLnZhbGEnIF0sXG4gICAgICAgICAgIHJlZ2V4OiAnKCg/OlxcXFwuKT8pXFxcXGIoW0EtWl1bQS1aMC05X10rKSg/ITx8XFxcXC5jbGFzc3xcXFxccypcXFxcdytcXFxccyo9KVxcXFxiJyB9IF0sXG4gICAgICAnI2VudW1zJzogXG4gICAgICAgWyB7IHRva2VuOiAndGV4dCcsXG4gICAgICAgICAgIHJlZ2V4OiAnXig/PVxcXFxzKltBLVowLTlfXStcXFxccyooPzp7fFxcXFwofCwpKScsXG4gICAgICAgICAgIHB1c2g6IFxuICAgICAgICAgICAgWyB7IHRva2VuOiAndGV4dCcsIHJlZ2V4OiAnKD89O3x9KScsIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgIHsgdG9rZW46ICdjb25zdGFudC5vdGhlci5lbnVtLnZhbGEnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFxcXHcrJyxcbiAgICAgICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgICAgICAgWyB7IHRva2VuOiAnbWV0YS5lbnVtLnZhbGEnLCByZWdleDogJyg/PSx8O3x9KScsIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI3BhcmVucycgfSxcbiAgICAgICAgICAgICAgICAgICB7IHRva2VuOiAndGV4dCcsXG4gICAgICAgICAgICAgICAgICAgICByZWdleDogJ3snLFxuICAgICAgICAgICAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICAgICAgICAgICAgWyB7IHRva2VuOiAndGV4dCcsIHJlZ2V4OiAnfScsIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjY2xhc3MtYm9keScgfSBdIH0sXG4gICAgICAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdtZXRhLmVudW0udmFsYScgfSBdIH0gXSB9IF0sXG4gICAgICAnI2tleXdvcmRzJzogXG4gICAgICAgWyB7IHRva2VuOiAna2V5d29yZC5jb250cm9sLmNhdGNoLWV4Y2VwdGlvbi52YWxhJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXFxcYig/OnRyeXxjYXRjaHxmaW5hbGx5fHRocm93KVxcXFxiJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQuY29udHJvbC52YWxhJywgcmVnZXg6ICdcXFxcP3w6fFxcXFw/XFxcXD8nIH0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5jb250cm9sLnZhbGEnLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiKD86cmV0dXJufGJyZWFrfGNhc2V8Y29udGludWV8ZGVmYXVsdHxkb3x3aGlsZXxmb3J8Zm9yZWFjaHxzd2l0Y2h8aWZ8ZWxzZXxpbnx5aWVsZHxnZXR8c2V0fHZhbHVlKVxcXFxiJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQub3BlcmF0b3IudmFsYScsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGIoPzp0eXBlb2Z8aXN8YXMpXFxcXGInIH0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5vcGVyYXRvci5jb21wYXJpc29uLnZhbGEnLFxuICAgICAgICAgICByZWdleDogJz09fCE9fDw9fD49fDw+fDx8PicgfSxcbiAgICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLm9wZXJhdG9yLmFzc2lnbm1lbnQudmFsYScsIHJlZ2V4OiAnPScgfSxcbiAgICAgICAgIHsgdG9rZW46ICdrZXl3b3JkLm9wZXJhdG9yLmluY3JlbWVudC1kZWNyZW1lbnQudmFsYScsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXC1cXFxcLXxcXFxcK1xcXFwrJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQub3BlcmF0b3IuYXJpdGhtZXRpYy52YWxhJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXFxcLXxcXFxcK3xcXFxcKnxcXFxcL3wlJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQub3BlcmF0b3IubG9naWNhbC52YWxhJywgcmVnZXg6ICchfCYmfFxcXFx8XFxcXHwnIH0sXG4gICAgICAgICB7IHRva2VuOiAna2V5d29yZC5vcGVyYXRvci5kZXJlZmVyZW5jZS52YWxhJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXFxcLig/PVxcXFxTKScsXG4gICAgICAgICAgIG9yaWdpbmFsUmVnZXg6ICcoPzw9XFxcXFMpXFxcXC4oPz1cXFxcUyknIH0sXG4gICAgICAgICB7IHRva2VuOiAncHVuY3R1YXRpb24udGVybWluYXRvci52YWxhJywgcmVnZXg6ICc7JyB9LFxuICAgICAgICAgeyB0b2tlbjogJ2tleXdvcmQub3BlcmF0b3Iub3duZXJzaGlwJywgcmVnZXg6ICdvd25lZHx1bm93bmVkJyB9IF0sXG4gICAgICAnI21ldGhvZHMnOiBcbiAgICAgICBbIHsgdG9rZW46ICdtZXRhLm1ldGhvZC52YWxhJyxcbiAgICAgICAgICAgcmVnZXg6ICcoPyFuZXcpKD89XFxcXHcuKlxcXFxzKykoPz1bXj1dK1xcXFwoKScsXG4gICAgICAgICAgIHB1c2g6IFxuICAgICAgICAgICAgWyB7IHRva2VuOiAncGFyZW4udmFsYScsIHJlZ2V4OiAnfXwoPz07KScsIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgIHsgaW5jbHVkZTogJyNzdG9yYWdlLW1vZGlmaWVycycgfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogWyAnZW50aXR5Lm5hbWUuZnVuY3Rpb24udmFsYScsICdtZXRhLm1ldGhvZC5pZGVudGlmaWVyLnZhbGEnIF0sXG4gICAgICAgICAgICAgICAgcmVnZXg6ICcoW1xcXFx+XFxcXHdcXFxcLl0rKShcXFxccypcXFxcKCknLFxuICAgICAgICAgICAgICAgIHB1c2g6IFxuICAgICAgICAgICAgICAgICBbIHsgdG9rZW46ICdtZXRhLm1ldGhvZC5pZGVudGlmaWVyLnZhbGEnLFxuICAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICdcXFxcKScsXG4gICAgICAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICAgICAgIHsgaW5jbHVkZTogJyNwYXJhbWV0ZXJzJyB9LFxuICAgICAgICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnbWV0YS5tZXRob2QuaWRlbnRpZmllci52YWxhJyB9IF0gfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ21ldGEubWV0aG9kLnJldHVybi10eXBlLnZhbGEnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnKD89XFxcXHcuKlxcXFxzK1xcXFx3K1xcXFxzKlxcXFwoKScsXG4gICAgICAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICAgICAgIFsgeyB0b2tlbjogJ21ldGEubWV0aG9kLnJldHVybi10eXBlLnZhbGEnLFxuICAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICcoPz1cXFxcdytcXFxccypcXFxcKCknLFxuICAgICAgICAgICAgICAgICAgICAgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjYWxsLXR5cGVzJyB9LFxuICAgICAgICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnbWV0YS5tZXRob2QucmV0dXJuLXR5cGUudmFsYScgfSBdIH0sXG4gICAgICAgICAgICAgIHsgaW5jbHVkZTogJyN0aHJvd3MnIH0sXG4gICAgICAgICAgICAgIHsgdG9rZW46ICdwYXJlbi52YWxhJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ3snLFxuICAgICAgICAgICAgICAgIHB1c2g6IFxuICAgICAgICAgICAgICAgICBbIHsgdG9rZW46ICdwYXJlbi52YWxhJywgcmVnZXg6ICcoPz19KScsIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI2NvZGUnIH0sXG4gICAgICAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdtZXRhLm1ldGhvZC5ib2R5LnZhbGEnIH0gXSB9LFxuICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ21ldGEubWV0aG9kLnZhbGEnIH0gXSB9IF0sXG4gICAgICAnI25hbWVzcGFjZSc6IFxuICAgICAgIFsgeyB0b2tlbjogJ3RleHQnLFxuICAgICAgICAgICByZWdleDogJ14oPz1cXFxccypbQS1aMC05X10rXFxcXHMqKD86e3xcXFxcKHwsKSknLFxuICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgIFsgeyB0b2tlbjogJ3RleHQnLCByZWdleDogJyg/PTt8fSknLCBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICB7IHRva2VuOiAnY29uc3RhbnQub3RoZXIubmFtZXNwYWNlLnZhbGEnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnXFxcXHcrJyxcbiAgICAgICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgICAgICAgWyB7IHRva2VuOiAnbWV0YS5uYW1lc3BhY2UudmFsYScsIHJlZ2V4OiAnKD89LHw7fH0pJywgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgICAgICB7IGluY2x1ZGU6ICcjcGFyZW5zJyB9LFxuICAgICAgICAgICAgICAgICAgIHsgdG9rZW46ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAneycsXG4gICAgICAgICAgICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgICAgICAgICAgICBbIHsgdG9rZW46ICd0ZXh0JywgcmVnZXg6ICd9JywgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgaW5jbHVkZTogJyNjb2RlJyB9IF0gfSxcbiAgICAgICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ21ldGEubmFtZXNwYWNlLnZhbGEnIH0gXSB9IF0sXG4gICAgICAgICAgIGNvbW1lbnQ6ICdUaGlzIGlzIG5vdCBxdWl0ZSByaWdodC4gU2VlIHRoZSBjbGFzcyBncmFtbWFyIHJpZ2h0IG5vdycgfSBdLFxuICAgICAgJyNvYmplY3QtdHlwZXMnOiBcbiAgICAgICBbIHsgdG9rZW46ICdzdG9yYWdlLnR5cGUuZ2VuZXJpYy52YWxhJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXFxcYig/OlthLXpdXFxcXHcqXFxcXC4pKltBLVpdK1xcXFx3KjwnLFxuICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgIFsgeyB0b2tlbjogJ3N0b3JhZ2UudHlwZS5nZW5lcmljLnZhbGEnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnPnxbXlxcXFx3XFxcXHMsXFxcXD88XFxcXFsoKVxcXFxdXScsXG4gICAgICAgICAgICAgICAgVE9ETzogJ0ZJWE1FOiByZWdleHAgZG9lc25cXCd0IGhhdmUganMgZXF1aXZhbGVudCcsXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxSZWdleDogJz58W15cXFxcd1xcXFxzLFxcXFw/PFxcXFxbKD86WyxdKylcXFxcXV0nLFxuICAgICAgICAgICAgICAgIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgIHsgaW5jbHVkZTogJyNvYmplY3QtdHlwZXMnIH0sXG4gICAgICAgICAgICAgIHsgdG9rZW46ICdzdG9yYWdlLnR5cGUuZ2VuZXJpYy52YWxhJyxcbiAgICAgICAgICAgICAgICByZWdleDogJzwnLFxuICAgICAgICAgICAgICAgIHB1c2g6IFxuICAgICAgICAgICAgICAgICBbIHsgdG9rZW46ICdzdG9yYWdlLnR5cGUuZ2VuZXJpYy52YWxhJyxcbiAgICAgICAgICAgICAgICAgICAgIHJlZ2V4OiAnPnxbXlxcXFx3XFxcXHMsXFxcXFtcXFxcXTxdJyxcbiAgICAgICAgICAgICAgICAgICAgIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdzdG9yYWdlLnR5cGUuZ2VuZXJpYy52YWxhJyB9IF0sXG4gICAgICAgICAgICAgICAgY29tbWVudDogJ1RoaXMgaXMganVzdCB0byBzdXBwb3J0IDw+XFwncyB3aXRoIG5vIGFjdHVhbCB0eXBlIHByZWZpeCcgfSxcbiAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdzdG9yYWdlLnR5cGUuZ2VuZXJpYy52YWxhJyB9IF0gfSxcbiAgICAgICAgIHsgdG9rZW46ICdzdG9yYWdlLnR5cGUub2JqZWN0LmFycmF5LnZhbGEnLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiKD86W2Etel1cXFxcdypcXFxcLikqW0EtWl0rXFxcXHcqKD89XFxcXFspJyxcbiAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICBbIHsgdG9rZW46ICdzdG9yYWdlLnR5cGUub2JqZWN0LmFycmF5LnZhbGEnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnKD89W15cXFxcXVxcXFxzXSknLFxuICAgICAgICAgICAgICAgIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgIHsgdG9rZW46ICd0ZXh0JyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFxbJyxcbiAgICAgICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgICAgICAgWyB7IHRva2VuOiAndGV4dCcsIHJlZ2V4OiAnXFxcXF0nLCBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICAgICAgIHsgaW5jbHVkZTogJyNjb2RlJyB9IF0gfSxcbiAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdzdG9yYWdlLnR5cGUub2JqZWN0LmFycmF5LnZhbGEnIH0gXSB9LFxuICAgICAgICAgeyB0b2tlbjogXG4gICAgICAgICAgICBbICdzdG9yYWdlLnR5cGUudmFsYScsXG4gICAgICAgICAgICAgICdrZXl3b3JkLm9wZXJhdG9yLmRlcmVmZXJlbmNlLnZhbGEnLFxuICAgICAgICAgICAgICAnc3RvcmFnZS50eXBlLnZhbGEnIF0sXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGIoPzooW2Etel1cXFxcdyopKFxcXFwuKSkqKFtBLVpdK1xcXFx3KlxcXFxiKScgfSBdLFxuICAgICAgJyNvYmplY3QtdHlwZXMtaW5oZXJpdGVkJzogXG4gICAgICAgWyB7IHRva2VuOiAnZW50aXR5Lm90aGVyLmluaGVyaXRlZC1jbGFzcy52YWxhJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXFxcYig/OlthLXpdXFxcXHcqXFxcXC4pKltBLVpdK1xcXFx3KjwnLFxuICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgIFsgeyB0b2tlbjogJ2VudGl0eS5vdGhlci5pbmhlcml0ZWQtY2xhc3MudmFsYScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICc+fFteXFxcXHdcXFxccyw8XScsXG4gICAgICAgICAgICAgICAgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI29iamVjdC10eXBlcycgfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ3N0b3JhZ2UudHlwZS5nZW5lcmljLnZhbGEnLFxuICAgICAgICAgICAgICAgIHJlZ2V4OiAnPCcsXG4gICAgICAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICAgICAgIFsgeyB0b2tlbjogJ3N0b3JhZ2UudHlwZS5nZW5lcmljLnZhbGEnLFxuICAgICAgICAgICAgICAgICAgICAgcmVnZXg6ICc+fFteXFxcXHdcXFxccyw8XScsXG4gICAgICAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnc3RvcmFnZS50eXBlLmdlbmVyaWMudmFsYScgfSBdLFxuICAgICAgICAgICAgICAgIGNvbW1lbnQ6ICdUaGlzIGlzIGp1c3QgdG8gc3VwcG9ydCA8PlxcJ3Mgd2l0aCBubyBhY3R1YWwgdHlwZSBwcmVmaXgnIH0sXG4gICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnZW50aXR5Lm90aGVyLmluaGVyaXRlZC1jbGFzcy52YWxhJyB9IF0gfSxcbiAgICAgICAgIHsgdG9rZW46IFxuICAgICAgICAgICAgWyAnZW50aXR5Lm90aGVyLmluaGVyaXRlZC1jbGFzcy52YWxhJyxcbiAgICAgICAgICAgICAgJ2tleXdvcmQub3BlcmF0b3IuZGVyZWZlcmVuY2UudmFsYScsXG4gICAgICAgICAgICAgICdlbnRpdHkub3RoZXIuaW5oZXJpdGVkLWNsYXNzLnZhbGEnIF0sXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXGIoPzooW2Etel1cXFxcdyopKFxcXFwuKSkqKFtBLVpdK1xcXFx3KiknIH0gXSxcbiAgICAgICcjcGFyYW1ldGVycyc6IFxuICAgICAgIFsgeyB0b2tlbjogJ3N0b3JhZ2UubW9kaWZpZXIudmFsYScsIHJlZ2V4OiAnZmluYWwnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjcHJpbWl0aXZlLWFycmF5cycgfSxcbiAgICAgICAgIHsgaW5jbHVkZTogJyNwcmltaXRpdmUtdHlwZXMnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjb2JqZWN0LXR5cGVzJyB9LFxuICAgICAgICAgeyB0b2tlbjogJ3ZhcmlhYmxlLnBhcmFtZXRlci52YWxhJywgcmVnZXg6ICdcXFxcdysnIH0gXSxcbiAgICAgICcjcGFyZW5zJzogXG4gICAgICAgWyB7IHRva2VuOiAndGV4dCcsXG4gICAgICAgICAgIHJlZ2V4OiAnXFxcXCgnLFxuICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgIFsgeyB0b2tlbjogJ3RleHQnLCByZWdleDogJ1xcXFwpJywgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyBpbmNsdWRlOiAnI2NvZGUnIH0gXSB9IF0sXG4gICAgICAnI3ByaW1pdGl2ZS1hcnJheXMnOiBcbiAgICAgICBbIHsgdG9rZW46ICdzdG9yYWdlLnR5cGUucHJpbWl0aXZlLmFycmF5LnZhbGEnLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiKD86Ym9vbHxieXRlfHNieXRlfGNoYXJ8ZGVjaW1hbHxkb3VibGV8ZmxvYXR8aW50fHVpbnR8bG9uZ3x1bG9uZ3xvYmplY3R8c2hvcnR8dXNob3J0fHN0cmluZ3x2b2lkfGludDh8aW50MTZ8aW50MzJ8aW50NjR8dWludDh8dWludDE2fHVpbnQzMnx1aW50NjQpKD86XFxcXFtcXFxcXSkqXFxcXGInIH0gXSxcbiAgICAgICcjcHJpbWl0aXZlLXR5cGVzJzogXG4gICAgICAgWyB7IHRva2VuOiAnc3RvcmFnZS50eXBlLnByaW1pdGl2ZS52YWxhJyxcbiAgICAgICAgICAgcmVnZXg6ICdcXFxcYig/OnZhcnxib29sfGJ5dGV8c2J5dGV8Y2hhcnxkZWNpbWFsfGRvdWJsZXxmbG9hdHxpbnR8dWludHxsb25nfHVsb25nfG9iamVjdHxzaG9ydHx1c2hvcnR8c3RyaW5nfHZvaWR8c2lnbmFsfGludDh8aW50MTZ8aW50MzJ8aW50NjR8dWludDh8dWludDE2fHVpbnQzMnx1aW50NjQpXFxcXGInLFxuICAgICAgICAgICBjb21tZW50OiAndmFyIGlzIG5vdCByZWFsbHkgYSBwcmltaXRpdmUsIGJ1dCBhY3RzIGxpa2Ugb25lIGluIG1vc3QgY2FzZXMnIH0gXSxcbiAgICAgICcjc3RvcmFnZS1tb2RpZmllcnMnOiBcbiAgICAgICBbIHsgdG9rZW46ICdzdG9yYWdlLm1vZGlmaWVyLnZhbGEnLFxuICAgICAgICAgICByZWdleDogJ1xcXFxiKD86cHVibGljfHByaXZhdGV8cHJvdGVjdGVkfGludGVybmFsfHN0YXRpY3xmaW5hbHxzZWFsZWR8dmlydHVhbHxvdmVycmlkZXxhYnN0cmFjdHxyZWFkb25seXx2b2xhdGlsZXxkeW5hbWljfGFzeW5jfHVuc2FmZXxvdXR8cmVmfHdlYWt8b3duZWR8dW5vd25lZHxjb25zdClcXFxcYicsXG4gICAgICAgICAgIGNvbW1lbnQ6ICdOb3Qgc3VyZSBhYm91dCB1bnNhZmUgYW5kIHJlYWRvbmx5JyB9IF0sXG4gICAgICAnI3N0cmluZ3MnOiBcbiAgICAgICBbIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5iZWdpbi52YWxhJyxcbiAgICAgICAgICAgcmVnZXg6ICdAXCInLFxuICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgIFsgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmVuZC52YWxhJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1wiJyxcbiAgICAgICAgICAgICAgICBuZXh0OiAncG9wJyB9LFxuICAgICAgICAgICAgICB7IHRva2VuOiAnY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZS52YWxhJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1xcXFxcXFxcLnwlW1xcXFx3XFxcXC5cXFxcLV0rfFxcXFwkKD86XFxcXHcrfFxcXFwoW1xcXFx3XFxcXHNcXFxcK1xcXFwtXFxcXCpcXFxcL10rXFxcXCkpJyB9LFxuICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ3N0cmluZy5xdW90ZWQuaW50ZXJwb2xhdGVkLnZhbGEnIH0gXSB9LFxuICAgICAgICAgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmJlZ2luLnZhbGEnLFxuICAgICAgICAgICByZWdleDogJ1wiJyxcbiAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICBbIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5lbmQudmFsYScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcIicsXG4gICAgICAgICAgICAgICAgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ2NvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUudmFsYScsIHJlZ2V4OiAnXFxcXFxcXFwuJyB9LFxuICAgICAgICAgICAgICB7IHRva2VuOiAnY29uc3RhbnQuY2hhcmFjdGVyLmVzY2FwZS52YWxhJyxcbiAgICAgICAgICAgICAgICByZWdleDogJyVbXFxcXHdcXFxcLlxcXFwtXSsnIH0sXG4gICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnc3RyaW5nLnF1b3RlZC5kb3VibGUudmFsYScgfSBdIH0sXG4gICAgICAgICB7IHRva2VuOiAncHVuY3R1YXRpb24uZGVmaW5pdGlvbi5zdHJpbmcuYmVnaW4udmFsYScsXG4gICAgICAgICAgIHJlZ2V4OiAnXFwnJyxcbiAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICBbIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5lbmQudmFsYScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICdcXCcnLFxuICAgICAgICAgICAgICAgIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgIHsgdG9rZW46ICdjb25zdGFudC5jaGFyYWN0ZXIuZXNjYXBlLnZhbGEnLCByZWdleDogJ1xcXFxcXFxcLicgfSxcbiAgICAgICAgICAgICAgeyBkZWZhdWx0VG9rZW46ICdzdHJpbmcucXVvdGVkLnNpbmdsZS52YWxhJyB9IF0gfSxcbiAgICAgICAgIHsgdG9rZW46ICdwdW5jdHVhdGlvbi5kZWZpbml0aW9uLnN0cmluZy5iZWdpbi52YWxhJyxcbiAgICAgICAgICAgcmVnZXg6ICdcIlwiXCInLFxuICAgICAgICAgICBwdXNoOiBcbiAgICAgICAgICAgIFsgeyB0b2tlbjogJ3B1bmN0dWF0aW9uLmRlZmluaXRpb24uc3RyaW5nLmVuZC52YWxhJyxcbiAgICAgICAgICAgICAgICByZWdleDogJ1wiXCJcIicsXG4gICAgICAgICAgICAgICAgbmV4dDogJ3BvcCcgfSxcbiAgICAgICAgICAgICAgeyB0b2tlbjogJ2NvbnN0YW50LmNoYXJhY3Rlci5lc2NhcGUudmFsYScsXG4gICAgICAgICAgICAgICAgcmVnZXg6ICclW1xcXFx3XFxcXC5cXFxcLV0rJyB9LFxuICAgICAgICAgICAgICB7IGRlZmF1bHRUb2tlbjogJ3N0cmluZy5xdW90ZWQudHJpcGxlLnZhbGEnIH0gXSB9IF0sXG4gICAgICAnI3Rocm93cyc6IFxuICAgICAgIFsgeyB0b2tlbjogJ3N0b3JhZ2UubW9kaWZpZXIudmFsYScsXG4gICAgICAgICAgIHJlZ2V4OiAndGhyb3dzJyxcbiAgICAgICAgICAgcHVzaDogXG4gICAgICAgICAgICBbIHsgdG9rZW46ICdtZXRhLnRocm93YWJsZXMudmFsYScsIHJlZ2V4OiAnKD89e3w7KScsIG5leHQ6ICdwb3AnIH0sXG4gICAgICAgICAgICAgIHsgaW5jbHVkZTogJyNvYmplY3QtdHlwZXMnIH0sXG4gICAgICAgICAgICAgIHsgZGVmYXVsdFRva2VuOiAnbWV0YS50aHJvd2FibGVzLnZhbGEnIH0gXSB9IF0sXG4gICAgICAnI3ZhbHVlcyc6IFxuICAgICAgIFsgeyBpbmNsdWRlOiAnI3N0cmluZ3MnIH0sXG4gICAgICAgICB7IGluY2x1ZGU6ICcjb2JqZWN0LXR5cGVzJyB9LFxuICAgICAgICAgeyBpbmNsdWRlOiAnI2NvbnN0YW50cy1hbmQtc3BlY2lhbC12YXJzJyB9IF0gfTtcbiAgICBcbiAgICB0aGlzLm5vcm1hbGl6ZVJ1bGVzKCk7XG59O1xuXG5WYWxhSGlnaGxpZ2h0UnVsZXMubWV0YURhdGEgPSB7IFxuICAgIGNvbW1lbnQ6ICdCYXNlZCBoZWF2aWx5IG9uIHRoZSBKYXZhIGJ1bmRsZVxcJ3MgbGFuZ3VhZ2Ugc3ludGF4LiBUT0RPOlxcbiogQ2xvc3VyZXNcXG4qIERlbGVnYXRlc1xcbiogUHJvcGVydGllczogQmV0dGVyIHN1cHBvcnQgZm9yIHByb3BlcnRpZXMuXFxuKiBBbm5vdGF0aW9uc1xcbiogRXJyb3IgZG9tYWluc1xcbiogTmFtZWQgYXJndW1lbnRzXFxuKiBBcnJheSBzbGljaW5nLCBuZWdhdGl2ZSBpbmRleGVzLCBtdWx0aWRpbWVuc2lvbmFsXFxuKiBjb25zdHJ1Y3QgYmxvY2tzXFxuKiBsb2NrIGJsb2Nrcz9cXG4qIHJlZ2V4IGxpdGVyYWxzXFxuKiBEb2NCbG9jayBzeW50YXggaGlnaGxpZ2h0aW5nLiAoQ3VycmVudGx5IGltcG9ydGluZyBqYXZhZG9jKVxcbiogRm9sZGluZyBydWxlIGZvciBjb21tZW50cy5cXG4nLFxuICAgICAgZmlsZVR5cGVzOiBbICd2YWxhJyBdLFxuICAgICAgZm9sZGluZ1N0YXJ0TWFya2VyOiAnKFxcXFx7XFxcXHMqKC8vLiopPyR8XlxcXFxzKi8vIFxcXFx7XFxcXHtcXFxceyknLFxuICAgICAgZm9sZGluZ1N0b3BNYXJrZXI6ICdeXFxcXHMqKFxcXFx9fC8vIFxcXFx9XFxcXH1cXFxcfSQpJyxcbiAgICAgIG5hbWU6ICdWYWxhJyxcbiAgICAgIHNjb3BlTmFtZTogJ3NvdXJjZS52YWxhJyB9O1xuXG5cbm9vcC5pbmhlcml0cyhWYWxhSGlnaGxpZ2h0UnVsZXMsIFRleHRIaWdobGlnaHRSdWxlcyk7XG5cbmV4cG9ydHMuVmFsYUhpZ2hsaWdodFJ1bGVzID0gVmFsYUhpZ2hsaWdodFJ1bGVzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9