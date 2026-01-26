"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4166],{

/***/ 34166:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

/**
 * ## Code beautification and formatting extension.
 *
 * **This extension is considered outdated.** For better formatting support with modern language servers
 * and advanced formatting capabilities, consider using [ace-linters](https://github.com/mkslanc/ace-linters)
 * which provides comprehensive language support including formatting, linting, and IntelliSense features.
 *
 * This legacy extension provides basic formatting for HTML, CSS, JavaScript, and PHP code with support for
 * proper indentation, whitespace management, line breaks, and bracket alignment. It handles various language
 * constructs including HTML tags, CSS selectors, JavaScript operators, control structures, and maintains
 * consistent code style throughout the document.
 *
 * @module
 */




var TokenIterator = (__webpack_require__(99339).TokenIterator);

function is(token, type) {
    return token.type.lastIndexOf(type + ".xml") > -1;
}

/**
 * List of HTML singleton (self-closing) tags that do not require additional indentation.
 * These tags are typically void elements that cannot have child content and are closed within themselves.
 *
 * @type {string[]}
 * @exports
 */
exports.singletonTags = ["area", "base", "br", "col", "command", "embed", "hr", "html", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];

/**
 * List of HTML block-level tags that typically require line breaks after their opening and closing tags.
 * These tags represent structural elements that usually contain other content and are rendered as block-level elements.
 *
 * @type {string[]}
 */
exports.blockTags = ["article", "aside", "blockquote", "body", "div", "dl", "fieldset", "footer", "form", "head", "header", "html", "nav", "ol", "p", "script", "section", "style", "table", "tbody", "tfoot", "thead", "ul"];

/**
 * Configuration options for code formatting behavior.
 * Controls various formatting rules such as line break placement and spacing preferences.
 *
 * @type {{lineBreaksAfterCommasInCurlyBlock?: boolean}}
 */
exports.formatOptions = {
    lineBreaksAfterCommasInCurlyBlock: true
};

/**
 * Formats and beautifies code in the editor session with intelligent indentation, whitespace management, and bracket alignment.
 * Supports HTML, CSS, JavaScript, and PHP with configurable formatting options and language-specific rules.
 *
 * @param {import("../edit_session").EditSession} session - The editor session containing the code to format
 */

exports.beautify = function(session) {
    var iterator = new TokenIterator(session, 0, 0);
    var token = iterator.getCurrentToken();
    var tabString = session.getTabString();
    var singletonTags = exports.singletonTags;
    var blockTags = exports.blockTags;
    var formatOptions = exports.formatOptions || {};
    var nextToken;
    var breakBefore = false;
    var spaceBefore = false;
    var spaceAfter = false;
    var code = "";
    var value = "";
    var tagName = "";
    var depth = 0;
    var lastDepth = 0;
    var lastIndent = 0;
    var indent = 0;
    var unindent = 0;
    var roundDepth = 0;
    var curlyDepth = 0;
    var row;
    var curRow = 0;
    var rowsToAdd = 0;
    var rowTokens = [];
    var abort = false;
    var i;
    var indentNextLine = false;
    var inTag = false;
    var inCSS = false;
    var inBlock = false;
    var levels = {0: 0};
    var parents = [];
    var caseBody = false;

    var trimNext = function() {
        if (nextToken && nextToken.value && nextToken.type !== 'string.regexp')
            nextToken.value = nextToken.value.replace(/^\s*/, "");
    };
    
    var trimLine = function() {
        var end = code.length - 1;

        while (true) {
            if (end == 0)
                break;
            if (code[end] !== " ")
                break;
            
            end = end - 1;
        }

        code = code.slice(0, end + 1);
    };
    
    var trimCode = function() {
        code = code.trimRight();
        breakBefore = false;
    };

    while (token !== null) {
        curRow = iterator.getCurrentTokenRow();
        rowTokens = iterator.$rowTokens;
        nextToken = iterator.stepForward();

        if (typeof token !== "undefined") {
            value = token.value;
            unindent = 0;

            // mode
            inCSS = (tagName === "style" || session.$modeId === "ace/mode/css");

            // in tag
            if (is(token, "tag-open")) {
                inTag = true;

                // are we in a block tag
                if (nextToken)
                    inBlock = (blockTags.indexOf(nextToken.value) !== -1);

                // html indentation
                if (value === "</") {
                    // line break before closing tag unless we just had one
                    if (inBlock && !breakBefore && rowsToAdd < 1)
                        rowsToAdd++;

                    if (inCSS)
                        rowsToAdd = 1;

                    unindent = 1;
                    inBlock = false;
                }
            } else if (is(token, "tag-close")) {
                inTag = false;
            // comments
            } else if (is(token, "comment.start")) {
                inBlock = true;
            } else if (is(token, "comment.end")) {
                inBlock = false;
            }

            // line break before }
            if (!inTag && !rowsToAdd && token.type === "paren.rparen" && token.value.substr(0, 1) === "}") {
                rowsToAdd++;
            }

            // add rows
            if (curRow !== row) {
                rowsToAdd = curRow;

                if (row)
                    rowsToAdd -= row;
            }

            if (rowsToAdd) {
                trimCode();
                for (; rowsToAdd > 0; rowsToAdd--)
                    code += "\n";

                breakBefore = true;

                // trim value if not in a comment or string
                if (!is(token, "comment") && !token.type.match(/^(comment|string)$/))
                   value = value.trimLeft();
            }

            if (value) {
                // whitespace
                if (token.type === "keyword" && value.match(/^(if|else|elseif|for|foreach|while|switch)$/)) {
                    parents[depth] = value;

                    trimNext();
                    spaceAfter = true;

                    // space before else, elseif
                    if (value.match(/^(else|elseif)$/)) {
                        if (code.match(/\}[\s]*$/)) {
                            trimCode();
                            spaceBefore = true;
                        }
                    }
                // trim value after opening paren
                } else if (token.type === "paren.lparen") {
                    trimNext();

                    // whitespace after {
                    if (value.substr(-1) === "{") {
                        spaceAfter = true;
                        indentNextLine = false;

                        if(!inTag)
                            rowsToAdd = 1;
                    }

                    // ensure curly brace is preceeded by whitespace
                    if (value.substr(0, 1) === "{") {
                        spaceBefore = true;

                        // collapse square and curly brackets together
                        if (code.substr(-1) !== '[' && code.trimRight().substr(-1) === '[') {
                            trimCode();
                            spaceBefore = false;
                        } else if (code.trimRight().substr(-1) === ')') {
                            trimCode();
                        } else {
                            trimLine();
                        }
                    }
                // remove space before closing paren
                } else if (token.type === "paren.rparen") {
                    unindent = 1;

                    // ensure curly brace is preceeded by whitespace
                    if (value.substr(0, 1) === "}") {
                        if (parents[depth-1] === 'case')
                            unindent++;

                        if (code.trimRight().substr(-1) === '{') {
                            trimCode();
                        } else {
                            spaceBefore = true;

                            if (inCSS)
                                rowsToAdd+=2;
                        }
                    }

                    // collapse square and curly brackets together
                    if (value.substr(0, 1) === "]") {
                        if (code.substr(-1) !== '}' && code.trimRight().substr(-1) === '}') {
                            spaceBefore = false;
                            indent++;
                            trimCode();
                        }
                    }

                    // collapse round brackets together
                    if (value.substr(0, 1) === ")") {
                        if (code.substr(-1) !== '(' && code.trimRight().substr(-1) === '(') {
                            spaceBefore = false;
                            indent++;
                            trimCode();
                        }
                    }

                    trimLine();
                // add spaces around conditional operators
                } else if ((token.type === "keyword.operator" || token.type === "keyword") && value.match(/^(=|==|===|!=|!==|&&|\|\||and|or|xor|\+=|.=|>|>=|<|<=|=>)$/)) {
                    trimCode();
                    trimNext();
                    spaceBefore = true;
                    spaceAfter = true;
                // remove space before semicolon
                } else if (token.type === "punctuation.operator" && value === ';') {
                    trimCode();
                    trimNext();
                    spaceAfter = true;

                    if (inCSS)
                        rowsToAdd++;
                // space after colon or comma
                } else if (token.type === "punctuation.operator" && value.match(/^(:|,)$/)) {
                    trimCode();
                    trimNext();

                    // line break after commas in curly block
                    if (value.match(/^(,)$/) && curlyDepth>0 && roundDepth===0 && formatOptions.lineBreaksAfterCommasInCurlyBlock) {
                        rowsToAdd++;
                    } else {
                        spaceAfter = true;
                        breakBefore = false;
                    }
                // ensure space before php closing tag
                } else if (token.type === "support.php_tag" && value === "?>" && !breakBefore) {
                    trimCode();
                    spaceBefore = true;
                // remove excess space before HTML attribute
                } else if (is(token, "attribute-name") && code.substr(-1).match(/^\s$/)) {
                    spaceBefore = true;
                // remove space around attribute equals
                } else if (is(token, "attribute-equals")) {
                    trimLine();
                    trimNext();
                // remove space before HTML closing tag
                } else if (is(token, "tag-close")) {
                    trimLine();
                    if(value === "/>")
                        spaceBefore = true;
                } else if (token.type === "keyword" && value.match(/^(case|default)$/)) {
                    if (caseBody)
                        unindent = 1;
                }

                // add indent to code unless multiline string or comment
                if (breakBefore && !(token.type.match(/^(comment)$/) && !value.substr(0, 1).match(/^[/#]$/)) && !(token.type.match(/^(string)$/) && !value.substr(0, 1).match(/^['"@]$/))) {

                    indent = lastIndent;

                    if(depth > lastDepth) {
                        indent++;

                        for (i=depth; i > lastDepth; i--)
                            levels[i] = indent;
                    } else if(depth < lastDepth)
                        indent = levels[depth];

                    lastDepth = depth;
                    lastIndent = indent;

                    if(unindent)
                        indent -= unindent;

                    if (indentNextLine && !roundDepth) {
                        indent++;
                        indentNextLine = false;
                    }

                    for (i = 0; i < indent; i++)
                        code += tabString;
                }

                if (token.type === "keyword" && value.match(/^(case|default)$/)) {
                    if (caseBody === false) {
                        parents[depth] = value;
                        depth++;
                        caseBody = true;
                    }
                } else if (token.type === "keyword" && value.match(/^(break)$/)) {
                    if(parents[depth-1] && parents[depth-1].match(/^(case|default)$/)) {
                        depth--;
                        caseBody = false;
                    }
                }

                // indent one line after if or else
                if (token.type === "paren.lparen") {
                    roundDepth += (value.match(/\(/g) || []).length;
                    curlyDepth += (value.match(/\{/g) || []).length;
                    depth += value.length;
                }

                if (token.type === "keyword" && value.match(/^(if|else|elseif|for|while)$/)) {
                    indentNextLine = true;
                    roundDepth = 0;
                } else if (!roundDepth && value.trim() && token.type !== "comment")
                    indentNextLine = false;

                if (token.type === "paren.rparen") {
                    roundDepth -= (value.match(/\)/g) || []).length;
                    curlyDepth -= (value.match(/\}/g) || []).length;

                    for (i = 0; i < value.length; i++) {
                        depth--;
                        if(value.substr(i, 1)==='}' && parents[depth]==='case') {
                            depth--;
                        }
                    }
                }
                
                if (token.type == "text")
                    value = value.replace(/\s+$/, " ");

                // add to code
                if (spaceBefore && !breakBefore) {
                    trimLine();
                    if (code.substr(-1) !== "\n")
                        code += " ";
                }

                code += value;

                if (spaceAfter)
                    code += " ";

                breakBefore = false;
                spaceBefore = false;
                spaceAfter = false;

                // line break after block tag or doctype
                if ((is(token, "tag-close") && (inBlock || blockTags.indexOf(tagName) !== -1)) || (is(token, "doctype") && value === ">")) {
                    // undo linebreak if tag is immediately closed
                    if (inBlock && nextToken && nextToken.value === "</")
                        rowsToAdd = -1;
                    else
                        rowsToAdd = 1;
                }

                // html indentation
                if (nextToken && singletonTags.indexOf(nextToken.value) === -1) {
                    if (is(token, "tag-open") && value === "</") {
                        depth--;
                    } else if (is(token, "tag-open") && value === "<") {
                        depth++;
                    } else if (is(token, "tag-close") && value === "/>"){
                        depth--;
                    }
                }
                
                if (is(token, "tag-name")) {
                    tagName = value;
                }

                row = curRow;
            }
        }

        token = nextToken;
    }

    code = code.trim();
    session.doc.setValue(code);
};

/**
 * Array of command definitions for the beautify extension.
 * Contains the main beautify command with keyboard shortcut and execution handler.
 *
 * @type {import("../../ace-internal").Ace.Command[]}
 */
exports.commands = [{
    name: "beautify",
    description: "Format selection (Beautify)",
    exec: function(editor) {
        exports.beautify(editor.session);
    },
    bindKey: "Ctrl-Shift-B"
}];


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q3RCOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxnQ0FBZ0MsWUFBWTtBQUM1QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjs7QUFFQTtBQUNBO0FBQ0Esa0RBQWtEOztBQUVsRCxnQ0FBZ0Msa0JBQWtCO0FBQ2xEO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9hY2UtbGludGVycy1yb290Ly4vbm9kZV9tb2R1bGVzL2FjZS1jb2RlL3NyYy9leHQvYmVhdXRpZnkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiAjIyBDb2RlIGJlYXV0aWZpY2F0aW9uIGFuZCBmb3JtYXR0aW5nIGV4dGVuc2lvbi5cbiAqXG4gKiAqKlRoaXMgZXh0ZW5zaW9uIGlzIGNvbnNpZGVyZWQgb3V0ZGF0ZWQuKiogRm9yIGJldHRlciBmb3JtYXR0aW5nIHN1cHBvcnQgd2l0aCBtb2Rlcm4gbGFuZ3VhZ2Ugc2VydmVyc1xuICogYW5kIGFkdmFuY2VkIGZvcm1hdHRpbmcgY2FwYWJpbGl0aWVzLCBjb25zaWRlciB1c2luZyBbYWNlLWxpbnRlcnNdKGh0dHBzOi8vZ2l0aHViLmNvbS9ta3NsYW5jL2FjZS1saW50ZXJzKVxuICogd2hpY2ggcHJvdmlkZXMgY29tcHJlaGVuc2l2ZSBsYW5ndWFnZSBzdXBwb3J0IGluY2x1ZGluZyBmb3JtYXR0aW5nLCBsaW50aW5nLCBhbmQgSW50ZWxsaVNlbnNlIGZlYXR1cmVzLlxuICpcbiAqIFRoaXMgbGVnYWN5IGV4dGVuc2lvbiBwcm92aWRlcyBiYXNpYyBmb3JtYXR0aW5nIGZvciBIVE1MLCBDU1MsIEphdmFTY3JpcHQsIGFuZCBQSFAgY29kZSB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwcm9wZXIgaW5kZW50YXRpb24sIHdoaXRlc3BhY2UgbWFuYWdlbWVudCwgbGluZSBicmVha3MsIGFuZCBicmFja2V0IGFsaWdubWVudC4gSXQgaGFuZGxlcyB2YXJpb3VzIGxhbmd1YWdlXG4gKiBjb25zdHJ1Y3RzIGluY2x1ZGluZyBIVE1MIHRhZ3MsIENTUyBzZWxlY3RvcnMsIEphdmFTY3JpcHQgb3BlcmF0b3JzLCBjb250cm9sIHN0cnVjdHVyZXMsIGFuZCBtYWludGFpbnNcbiAqIGNvbnNpc3RlbnQgY29kZSBzdHlsZSB0aHJvdWdob3V0IHRoZSBkb2N1bWVudC5cbiAqXG4gKiBAbW9kdWxlXG4gKi9cblxuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIFRva2VuSXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vdG9rZW5faXRlcmF0b3JcIikuVG9rZW5JdGVyYXRvcjtcblxuZnVuY3Rpb24gaXModG9rZW4sIHR5cGUpIHtcbiAgICByZXR1cm4gdG9rZW4udHlwZS5sYXN0SW5kZXhPZih0eXBlICsgXCIueG1sXCIpID4gLTE7XG59XG5cbi8qKlxuICogTGlzdCBvZiBIVE1MIHNpbmdsZXRvbiAoc2VsZi1jbG9zaW5nKSB0YWdzIHRoYXQgZG8gbm90IHJlcXVpcmUgYWRkaXRpb25hbCBpbmRlbnRhdGlvbi5cbiAqIFRoZXNlIHRhZ3MgYXJlIHR5cGljYWxseSB2b2lkIGVsZW1lbnRzIHRoYXQgY2Fubm90IGhhdmUgY2hpbGQgY29udGVudCBhbmQgYXJlIGNsb3NlZCB3aXRoaW4gdGhlbXNlbHZlcy5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nW119XG4gKiBAZXhwb3J0c1xuICovXG5leHBvcnRzLnNpbmdsZXRvblRhZ3MgPSBbXCJhcmVhXCIsIFwiYmFzZVwiLCBcImJyXCIsIFwiY29sXCIsIFwiY29tbWFuZFwiLCBcImVtYmVkXCIsIFwiaHJcIiwgXCJodG1sXCIsIFwiaW1nXCIsIFwiaW5wdXRcIiwgXCJrZXlnZW5cIiwgXCJsaW5rXCIsIFwibWV0YVwiLCBcInBhcmFtXCIsIFwic291cmNlXCIsIFwidHJhY2tcIiwgXCJ3YnJcIl07XG5cbi8qKlxuICogTGlzdCBvZiBIVE1MIGJsb2NrLWxldmVsIHRhZ3MgdGhhdCB0eXBpY2FsbHkgcmVxdWlyZSBsaW5lIGJyZWFrcyBhZnRlciB0aGVpciBvcGVuaW5nIGFuZCBjbG9zaW5nIHRhZ3MuXG4gKiBUaGVzZSB0YWdzIHJlcHJlc2VudCBzdHJ1Y3R1cmFsIGVsZW1lbnRzIHRoYXQgdXN1YWxseSBjb250YWluIG90aGVyIGNvbnRlbnQgYW5kIGFyZSByZW5kZXJlZCBhcyBibG9jay1sZXZlbCBlbGVtZW50cy5cbiAqXG4gKiBAdHlwZSB7c3RyaW5nW119XG4gKi9cbmV4cG9ydHMuYmxvY2tUYWdzID0gW1wiYXJ0aWNsZVwiLCBcImFzaWRlXCIsIFwiYmxvY2txdW90ZVwiLCBcImJvZHlcIiwgXCJkaXZcIiwgXCJkbFwiLCBcImZpZWxkc2V0XCIsIFwiZm9vdGVyXCIsIFwiZm9ybVwiLCBcImhlYWRcIiwgXCJoZWFkZXJcIiwgXCJodG1sXCIsIFwibmF2XCIsIFwib2xcIiwgXCJwXCIsIFwic2NyaXB0XCIsIFwic2VjdGlvblwiLCBcInN0eWxlXCIsIFwidGFibGVcIiwgXCJ0Ym9keVwiLCBcInRmb290XCIsIFwidGhlYWRcIiwgXCJ1bFwiXTtcblxuLyoqXG4gKiBDb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIGNvZGUgZm9ybWF0dGluZyBiZWhhdmlvci5cbiAqIENvbnRyb2xzIHZhcmlvdXMgZm9ybWF0dGluZyBydWxlcyBzdWNoIGFzIGxpbmUgYnJlYWsgcGxhY2VtZW50IGFuZCBzcGFjaW5nIHByZWZlcmVuY2VzLlxuICpcbiAqIEB0eXBlIHt7bGluZUJyZWFrc0FmdGVyQ29tbWFzSW5DdXJseUJsb2NrPzogYm9vbGVhbn19XG4gKi9cbmV4cG9ydHMuZm9ybWF0T3B0aW9ucyA9IHtcbiAgICBsaW5lQnJlYWtzQWZ0ZXJDb21tYXNJbkN1cmx5QmxvY2s6IHRydWVcbn07XG5cbi8qKlxuICogRm9ybWF0cyBhbmQgYmVhdXRpZmllcyBjb2RlIGluIHRoZSBlZGl0b3Igc2Vzc2lvbiB3aXRoIGludGVsbGlnZW50IGluZGVudGF0aW9uLCB3aGl0ZXNwYWNlIG1hbmFnZW1lbnQsIGFuZCBicmFja2V0IGFsaWdubWVudC5cbiAqIFN1cHBvcnRzIEhUTUwsIENTUywgSmF2YVNjcmlwdCwgYW5kIFBIUCB3aXRoIGNvbmZpZ3VyYWJsZSBmb3JtYXR0aW5nIG9wdGlvbnMgYW5kIGxhbmd1YWdlLXNwZWNpZmljIHJ1bGVzLlxuICpcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vZWRpdF9zZXNzaW9uXCIpLkVkaXRTZXNzaW9ufSBzZXNzaW9uIC0gVGhlIGVkaXRvciBzZXNzaW9uIGNvbnRhaW5pbmcgdGhlIGNvZGUgdG8gZm9ybWF0XG4gKi9cblxuZXhwb3J0cy5iZWF1dGlmeSA9IGZ1bmN0aW9uKHNlc3Npb24pIHtcbiAgICB2YXIgaXRlcmF0b3IgPSBuZXcgVG9rZW5JdGVyYXRvcihzZXNzaW9uLCAwLCAwKTtcbiAgICB2YXIgdG9rZW4gPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW4oKTtcbiAgICB2YXIgdGFiU3RyaW5nID0gc2Vzc2lvbi5nZXRUYWJTdHJpbmcoKTtcbiAgICB2YXIgc2luZ2xldG9uVGFncyA9IGV4cG9ydHMuc2luZ2xldG9uVGFncztcbiAgICB2YXIgYmxvY2tUYWdzID0gZXhwb3J0cy5ibG9ja1RhZ3M7XG4gICAgdmFyIGZvcm1hdE9wdGlvbnMgPSBleHBvcnRzLmZvcm1hdE9wdGlvbnMgfHwge307XG4gICAgdmFyIG5leHRUb2tlbjtcbiAgICB2YXIgYnJlYWtCZWZvcmUgPSBmYWxzZTtcbiAgICB2YXIgc3BhY2VCZWZvcmUgPSBmYWxzZTtcbiAgICB2YXIgc3BhY2VBZnRlciA9IGZhbHNlO1xuICAgIHZhciBjb2RlID0gXCJcIjtcbiAgICB2YXIgdmFsdWUgPSBcIlwiO1xuICAgIHZhciB0YWdOYW1lID0gXCJcIjtcbiAgICB2YXIgZGVwdGggPSAwO1xuICAgIHZhciBsYXN0RGVwdGggPSAwO1xuICAgIHZhciBsYXN0SW5kZW50ID0gMDtcbiAgICB2YXIgaW5kZW50ID0gMDtcbiAgICB2YXIgdW5pbmRlbnQgPSAwO1xuICAgIHZhciByb3VuZERlcHRoID0gMDtcbiAgICB2YXIgY3VybHlEZXB0aCA9IDA7XG4gICAgdmFyIHJvdztcbiAgICB2YXIgY3VyUm93ID0gMDtcbiAgICB2YXIgcm93c1RvQWRkID0gMDtcbiAgICB2YXIgcm93VG9rZW5zID0gW107XG4gICAgdmFyIGFib3J0ID0gZmFsc2U7XG4gICAgdmFyIGk7XG4gICAgdmFyIGluZGVudE5leHRMaW5lID0gZmFsc2U7XG4gICAgdmFyIGluVGFnID0gZmFsc2U7XG4gICAgdmFyIGluQ1NTID0gZmFsc2U7XG4gICAgdmFyIGluQmxvY2sgPSBmYWxzZTtcbiAgICB2YXIgbGV2ZWxzID0gezA6IDB9O1xuICAgIHZhciBwYXJlbnRzID0gW107XG4gICAgdmFyIGNhc2VCb2R5ID0gZmFsc2U7XG5cbiAgICB2YXIgdHJpbU5leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKG5leHRUb2tlbiAmJiBuZXh0VG9rZW4udmFsdWUgJiYgbmV4dFRva2VuLnR5cGUgIT09ICdzdHJpbmcucmVnZXhwJylcbiAgICAgICAgICAgIG5leHRUb2tlbi52YWx1ZSA9IG5leHRUb2tlbi52YWx1ZS5yZXBsYWNlKC9eXFxzKi8sIFwiXCIpO1xuICAgIH07XG4gICAgXG4gICAgdmFyIHRyaW1MaW5lID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBlbmQgPSBjb2RlLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgd2hpbGUgKHRydWUpIHtcbiAgICAgICAgICAgIGlmIChlbmQgPT0gMClcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGlmIChjb2RlW2VuZF0gIT09IFwiIFwiKVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBlbmQgPSBlbmQgLSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgY29kZSA9IGNvZGUuc2xpY2UoMCwgZW5kICsgMSk7XG4gICAgfTtcbiAgICBcbiAgICB2YXIgdHJpbUNvZGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29kZSA9IGNvZGUudHJpbVJpZ2h0KCk7XG4gICAgICAgIGJyZWFrQmVmb3JlID0gZmFsc2U7XG4gICAgfTtcblxuICAgIHdoaWxlICh0b2tlbiAhPT0gbnVsbCkge1xuICAgICAgICBjdXJSb3cgPSBpdGVyYXRvci5nZXRDdXJyZW50VG9rZW5Sb3coKTtcbiAgICAgICAgcm93VG9rZW5zID0gaXRlcmF0b3IuJHJvd1Rva2VucztcbiAgICAgICAgbmV4dFRva2VuID0gaXRlcmF0b3Iuc3RlcEZvcndhcmQoKTtcblxuICAgICAgICBpZiAodHlwZW9mIHRva2VuICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRva2VuLnZhbHVlO1xuICAgICAgICAgICAgdW5pbmRlbnQgPSAwO1xuXG4gICAgICAgICAgICAvLyBtb2RlXG4gICAgICAgICAgICBpbkNTUyA9ICh0YWdOYW1lID09PSBcInN0eWxlXCIgfHwgc2Vzc2lvbi4kbW9kZUlkID09PSBcImFjZS9tb2RlL2Nzc1wiKTtcblxuICAgICAgICAgICAgLy8gaW4gdGFnXG4gICAgICAgICAgICBpZiAoaXModG9rZW4sIFwidGFnLW9wZW5cIikpIHtcbiAgICAgICAgICAgICAgICBpblRhZyA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAvLyBhcmUgd2UgaW4gYSBibG9jayB0YWdcbiAgICAgICAgICAgICAgICBpZiAobmV4dFRva2VuKVxuICAgICAgICAgICAgICAgICAgICBpbkJsb2NrID0gKGJsb2NrVGFncy5pbmRleE9mKG5leHRUb2tlbi52YWx1ZSkgIT09IC0xKTtcblxuICAgICAgICAgICAgICAgIC8vIGh0bWwgaW5kZW50YXRpb25cbiAgICAgICAgICAgICAgICBpZiAodmFsdWUgPT09IFwiPC9cIikge1xuICAgICAgICAgICAgICAgICAgICAvLyBsaW5lIGJyZWFrIGJlZm9yZSBjbG9zaW5nIHRhZyB1bmxlc3Mgd2UganVzdCBoYWQgb25lXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbkJsb2NrICYmICFicmVha0JlZm9yZSAmJiByb3dzVG9BZGQgPCAxKVxuICAgICAgICAgICAgICAgICAgICAgICAgcm93c1RvQWRkKys7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGluQ1NTKVxuICAgICAgICAgICAgICAgICAgICAgICAgcm93c1RvQWRkID0gMTtcblxuICAgICAgICAgICAgICAgICAgICB1bmluZGVudCA9IDE7XG4gICAgICAgICAgICAgICAgICAgIGluQmxvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzKHRva2VuLCBcInRhZy1jbG9zZVwiKSkge1xuICAgICAgICAgICAgICAgIGluVGFnID0gZmFsc2U7XG4gICAgICAgICAgICAvLyBjb21tZW50c1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpcyh0b2tlbiwgXCJjb21tZW50LnN0YXJ0XCIpKSB7XG4gICAgICAgICAgICAgICAgaW5CbG9jayA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzKHRva2VuLCBcImNvbW1lbnQuZW5kXCIpKSB7XG4gICAgICAgICAgICAgICAgaW5CbG9jayA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBsaW5lIGJyZWFrIGJlZm9yZSB9XG4gICAgICAgICAgICBpZiAoIWluVGFnICYmICFyb3dzVG9BZGQgJiYgdG9rZW4udHlwZSA9PT0gXCJwYXJlbi5ycGFyZW5cIiAmJiB0b2tlbi52YWx1ZS5zdWJzdHIoMCwgMSkgPT09IFwifVwiKSB7XG4gICAgICAgICAgICAgICAgcm93c1RvQWRkKys7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGFkZCByb3dzXG4gICAgICAgICAgICBpZiAoY3VyUm93ICE9PSByb3cpIHtcbiAgICAgICAgICAgICAgICByb3dzVG9BZGQgPSBjdXJSb3c7XG5cbiAgICAgICAgICAgICAgICBpZiAocm93KVxuICAgICAgICAgICAgICAgICAgICByb3dzVG9BZGQgLT0gcm93O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAocm93c1RvQWRkKSB7XG4gICAgICAgICAgICAgICAgdHJpbUNvZGUoKTtcbiAgICAgICAgICAgICAgICBmb3IgKDsgcm93c1RvQWRkID4gMDsgcm93c1RvQWRkLS0pXG4gICAgICAgICAgICAgICAgICAgIGNvZGUgKz0gXCJcXG5cIjtcblxuICAgICAgICAgICAgICAgIGJyZWFrQmVmb3JlID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8vIHRyaW0gdmFsdWUgaWYgbm90IGluIGEgY29tbWVudCBvciBzdHJpbmdcbiAgICAgICAgICAgICAgICBpZiAoIWlzKHRva2VuLCBcImNvbW1lbnRcIikgJiYgIXRva2VuLnR5cGUubWF0Y2goL14oY29tbWVudHxzdHJpbmcpJC8pKVxuICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUudHJpbUxlZnQoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgLy8gd2hpdGVzcGFjZVxuICAgICAgICAgICAgICAgIGlmICh0b2tlbi50eXBlID09PSBcImtleXdvcmRcIiAmJiB2YWx1ZS5tYXRjaCgvXihpZnxlbHNlfGVsc2VpZnxmb3J8Zm9yZWFjaHx3aGlsZXxzd2l0Y2gpJC8pKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmVudHNbZGVwdGhdID0gdmFsdWU7XG5cbiAgICAgICAgICAgICAgICAgICAgdHJpbU5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VBZnRlciA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc3BhY2UgYmVmb3JlIGVsc2UsIGVsc2VpZlxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUubWF0Y2goL14oZWxzZXxlbHNlaWYpJC8pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5tYXRjaCgvXFx9W1xcc10qJC8pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpbUNvZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUJlZm9yZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyB0cmltIHZhbHVlIGFmdGVyIG9wZW5pbmcgcGFyZW5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IFwicGFyZW4ubHBhcmVuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpbU5leHQoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyB3aGl0ZXNwYWNlIGFmdGVyIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLnN1YnN0cigtMSkgPT09IFwie1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUFmdGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGVudE5leHRMaW5lID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFpblRhZylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzVG9BZGQgPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZW5zdXJlIGN1cmx5IGJyYWNlIGlzIHByZWNlZWRlZCBieSB3aGl0ZXNwYWNlXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5zdWJzdHIoMCwgMSkgPT09IFwie1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUJlZm9yZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbGxhcHNlIHNxdWFyZSBhbmQgY3VybHkgYnJhY2tldHMgdG9nZXRoZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2RlLnN1YnN0cigtMSkgIT09ICdbJyAmJiBjb2RlLnRyaW1SaWdodCgpLnN1YnN0cigtMSkgPT09ICdbJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaW1Db2RlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZWZvcmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY29kZS50cmltUmlnaHQoKS5zdWJzdHIoLTEpID09PSAnKScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmltQ29kZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmltTGluZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHNwYWNlIGJlZm9yZSBjbG9zaW5nIHBhcmVuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSBcInBhcmVuLnJwYXJlblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHVuaW5kZW50ID0gMTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBlbnN1cmUgY3VybHkgYnJhY2UgaXMgcHJlY2VlZGVkIGJ5IHdoaXRlc3BhY2VcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLnN1YnN0cigwLCAxKSA9PT0gXCJ9XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwYXJlbnRzW2RlcHRoLTFdID09PSAnY2FzZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdW5pbmRlbnQrKztcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUudHJpbVJpZ2h0KCkuc3Vic3RyKC0xKSA9PT0gJ3snKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpbUNvZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZWZvcmUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluQ1NTKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzVG9BZGQrPTI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBjb2xsYXBzZSBzcXVhcmUgYW5kIGN1cmx5IGJyYWNrZXRzIHRvZ2V0aGVyXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5zdWJzdHIoMCwgMSkgPT09IFwiXVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5zdWJzdHIoLTEpICE9PSAnfScgJiYgY29kZS50cmltUmlnaHQoKS5zdWJzdHIoLTEpID09PSAnfScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUJlZm9yZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGluZGVudCsrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaW1Db2RlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAvLyBjb2xsYXBzZSByb3VuZCBicmFja2V0cyB0b2dldGhlclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUuc3Vic3RyKDAsIDEpID09PSBcIilcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUuc3Vic3RyKC0xKSAhPT0gJygnICYmIGNvZGUudHJpbVJpZ2h0KCkuc3Vic3RyKC0xKSA9PT0gJygnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZWZvcmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRlbnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmltQ29kZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdHJpbUxpbmUoKTtcbiAgICAgICAgICAgICAgICAvLyBhZGQgc3BhY2VzIGFyb3VuZCBjb25kaXRpb25hbCBvcGVyYXRvcnNcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCh0b2tlbi50eXBlID09PSBcImtleXdvcmQub3BlcmF0b3JcIiB8fCB0b2tlbi50eXBlID09PSBcImtleXdvcmRcIikgJiYgdmFsdWUubWF0Y2goL14oPXw9PXw9PT18IT18IT09fCYmfFxcfFxcfHxhbmR8b3J8eG9yfFxcKz18Lj18Pnw+PXw8fDw9fD0+KSQvKSkge1xuICAgICAgICAgICAgICAgICAgICB0cmltQ29kZSgpO1xuICAgICAgICAgICAgICAgICAgICB0cmltTmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBzcGFjZUJlZm9yZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQWZ0ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBzcGFjZSBiZWZvcmUgc2VtaWNvbG9uXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSBcInB1bmN0dWF0aW9uLm9wZXJhdG9yXCIgJiYgdmFsdWUgPT09ICc7Jykge1xuICAgICAgICAgICAgICAgICAgICB0cmltQ29kZSgpO1xuICAgICAgICAgICAgICAgICAgICB0cmltTmV4dCgpO1xuICAgICAgICAgICAgICAgICAgICBzcGFjZUFmdGVyID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5DU1MpXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzVG9BZGQrKztcbiAgICAgICAgICAgICAgICAvLyBzcGFjZSBhZnRlciBjb2xvbiBvciBjb21tYVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiICYmIHZhbHVlLm1hdGNoKC9eKDp8LCkkLykpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpbUNvZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpbU5leHQoKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBsaW5lIGJyZWFrIGFmdGVyIGNvbW1hcyBpbiBjdXJseSBibG9ja1xuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUubWF0Y2goL14oLCkkLykgJiYgY3VybHlEZXB0aD4wICYmIHJvdW5kRGVwdGg9PT0wICYmIGZvcm1hdE9wdGlvbnMubGluZUJyZWFrc0FmdGVyQ29tbWFzSW5DdXJseUJsb2NrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzVG9BZGQrKztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQWZ0ZXIgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtCZWZvcmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIGVuc3VyZSBzcGFjZSBiZWZvcmUgcGhwIGNsb3NpbmcgdGFnXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSBcInN1cHBvcnQucGhwX3RhZ1wiICYmIHZhbHVlID09PSBcIj8+XCIgJiYgIWJyZWFrQmVmb3JlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyaW1Db2RlKCk7XG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmVmb3JlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZXhjZXNzIHNwYWNlIGJlZm9yZSBIVE1MIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXModG9rZW4sIFwiYXR0cmlidXRlLW5hbWVcIikgJiYgY29kZS5zdWJzdHIoLTEpLm1hdGNoKC9eXFxzJC8pKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQmVmb3JlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgc3BhY2UgYXJvdW5kIGF0dHJpYnV0ZSBlcXVhbHNcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzKHRva2VuLCBcImF0dHJpYnV0ZS1lcXVhbHNcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpbUxpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpbU5leHQoKTtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgc3BhY2UgYmVmb3JlIEhUTUwgY2xvc2luZyB0YWdcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzKHRva2VuLCBcInRhZy1jbG9zZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICB0cmltTGluZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZih2YWx1ZSA9PT0gXCIvPlwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZWZvcmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gXCJrZXl3b3JkXCIgJiYgdmFsdWUubWF0Y2goL14oY2FzZXxkZWZhdWx0KSQvKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FzZUJvZHkpXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmluZGVudCA9IDE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gYWRkIGluZGVudCB0byBjb2RlIHVubGVzcyBtdWx0aWxpbmUgc3RyaW5nIG9yIGNvbW1lbnRcbiAgICAgICAgICAgICAgICBpZiAoYnJlYWtCZWZvcmUgJiYgISh0b2tlbi50eXBlLm1hdGNoKC9eKGNvbW1lbnQpJC8pICYmICF2YWx1ZS5zdWJzdHIoMCwgMSkubWF0Y2goL15bLyNdJC8pKSAmJiAhKHRva2VuLnR5cGUubWF0Y2goL14oc3RyaW5nKSQvKSAmJiAhdmFsdWUuc3Vic3RyKDAsIDEpLm1hdGNoKC9eWydcIkBdJC8pKSkge1xuXG4gICAgICAgICAgICAgICAgICAgIGluZGVudCA9IGxhc3RJbmRlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZGVwdGggPiBsYXN0RGVwdGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGVudCsrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGk9ZGVwdGg7IGkgPiBsYXN0RGVwdGg7IGktLSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXZlbHNbaV0gPSBpbmRlbnQ7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihkZXB0aCA8IGxhc3REZXB0aClcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGVudCA9IGxldmVsc1tkZXB0aF07XG5cbiAgICAgICAgICAgICAgICAgICAgbGFzdERlcHRoID0gZGVwdGg7XG4gICAgICAgICAgICAgICAgICAgIGxhc3RJbmRlbnQgPSBpbmRlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodW5pbmRlbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRlbnQgLT0gdW5pbmRlbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGluZGVudE5leHRMaW5lICYmICFyb3VuZERlcHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRlbnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZGVudE5leHRMaW5lID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgaW5kZW50OyBpKyspXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2RlICs9IHRhYlN0cmluZztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gXCJrZXl3b3JkXCIgJiYgdmFsdWUubWF0Y2goL14oY2FzZXxkZWZhdWx0KSQvKSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoY2FzZUJvZHkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRzW2RlcHRoXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwdGgrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2VCb2R5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gXCJrZXl3b3JkXCIgJiYgdmFsdWUubWF0Y2goL14oYnJlYWspJC8pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcmVudHNbZGVwdGgtMV0gJiYgcGFyZW50c1tkZXB0aC0xXS5tYXRjaCgvXihjYXNlfGRlZmF1bHQpJC8pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0aC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZUJvZHkgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGluZGVudCBvbmUgbGluZSBhZnRlciBpZiBvciBlbHNlXG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IFwicGFyZW4ubHBhcmVuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcm91bmREZXB0aCArPSAodmFsdWUubWF0Y2goL1xcKC9nKSB8fCBbXSkubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBjdXJseURlcHRoICs9ICh2YWx1ZS5tYXRjaCgvXFx7L2cpIHx8IFtdKS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGRlcHRoICs9IHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gXCJrZXl3b3JkXCIgJiYgdmFsdWUubWF0Y2goL14oaWZ8ZWxzZXxlbHNlaWZ8Zm9yfHdoaWxlKSQvKSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRlbnROZXh0TGluZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHJvdW5kRGVwdGggPSAwO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoIXJvdW5kRGVwdGggJiYgdmFsdWUudHJpbSgpICYmIHRva2VuLnR5cGUgIT09IFwiY29tbWVudFwiKVxuICAgICAgICAgICAgICAgICAgICBpbmRlbnROZXh0TGluZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IFwicGFyZW4ucnBhcmVuXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcm91bmREZXB0aCAtPSAodmFsdWUubWF0Y2goL1xcKS9nKSB8fCBbXSkubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBjdXJseURlcHRoIC09ICh2YWx1ZS5tYXRjaCgvXFx9L2cpIHx8IFtdKS5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0aC0tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYodmFsdWUuc3Vic3RyKGksIDEpPT09J30nICYmIHBhcmVudHNbZGVwdGhdPT09J2Nhc2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVwdGgtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udHlwZSA9PSBcInRleHRcIilcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXHMrJC8sIFwiIFwiKTtcblxuICAgICAgICAgICAgICAgIC8vIGFkZCB0byBjb2RlXG4gICAgICAgICAgICAgICAgaWYgKHNwYWNlQmVmb3JlICYmICFicmVha0JlZm9yZSkge1xuICAgICAgICAgICAgICAgICAgICB0cmltTGluZSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5zdWJzdHIoLTEpICE9PSBcIlxcblwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZSArPSBcIiBcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb2RlICs9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHNwYWNlQWZ0ZXIpXG4gICAgICAgICAgICAgICAgICAgIGNvZGUgKz0gXCIgXCI7XG5cbiAgICAgICAgICAgICAgICBicmVha0JlZm9yZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNwYWNlQmVmb3JlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc3BhY2VBZnRlciA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gbGluZSBicmVhayBhZnRlciBibG9jayB0YWcgb3IgZG9jdHlwZVxuICAgICAgICAgICAgICAgIGlmICgoaXModG9rZW4sIFwidGFnLWNsb3NlXCIpICYmIChpbkJsb2NrIHx8IGJsb2NrVGFncy5pbmRleE9mKHRhZ05hbWUpICE9PSAtMSkpIHx8IChpcyh0b2tlbiwgXCJkb2N0eXBlXCIpICYmIHZhbHVlID09PSBcIj5cIikpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdW5kbyBsaW5lYnJlYWsgaWYgdGFnIGlzIGltbWVkaWF0ZWx5IGNsb3NlZFxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5CbG9jayAmJiBuZXh0VG9rZW4gJiYgbmV4dFRva2VuLnZhbHVlID09PSBcIjwvXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICByb3dzVG9BZGQgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgcm93c1RvQWRkID0gMTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBodG1sIGluZGVudGF0aW9uXG4gICAgICAgICAgICAgICAgaWYgKG5leHRUb2tlbiAmJiBzaW5nbGV0b25UYWdzLmluZGV4T2YobmV4dFRva2VuLnZhbHVlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzKHRva2VuLCBcInRhZy1vcGVuXCIpICYmIHZhbHVlID09PSBcIjwvXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoLS07XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXModG9rZW4sIFwidGFnLW9wZW5cIikgJiYgdmFsdWUgPT09IFwiPFwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0aCsrO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzKHRva2VuLCBcInRhZy1jbG9zZVwiKSAmJiB2YWx1ZSA9PT0gXCIvPlwiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoLS07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKGlzKHRva2VuLCBcInRhZy1uYW1lXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhZ05hbWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByb3cgPSBjdXJSb3c7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0b2tlbiA9IG5leHRUb2tlbjtcbiAgICB9XG5cbiAgICBjb2RlID0gY29kZS50cmltKCk7XG4gICAgc2Vzc2lvbi5kb2Muc2V0VmFsdWUoY29kZSk7XG59O1xuXG4vKipcbiAqIEFycmF5IG9mIGNvbW1hbmQgZGVmaW5pdGlvbnMgZm9yIHRoZSBiZWF1dGlmeSBleHRlbnNpb24uXG4gKiBDb250YWlucyB0aGUgbWFpbiBiZWF1dGlmeSBjb21tYW5kIHdpdGgga2V5Ym9hcmQgc2hvcnRjdXQgYW5kIGV4ZWN1dGlvbiBoYW5kbGVyLlxuICpcbiAqIEB0eXBlIHtpbXBvcnQoXCIuLi8uLi9hY2UtaW50ZXJuYWxcIikuQWNlLkNvbW1hbmRbXX1cbiAqL1xuZXhwb3J0cy5jb21tYW5kcyA9IFt7XG4gICAgbmFtZTogXCJiZWF1dGlmeVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkZvcm1hdCBzZWxlY3Rpb24gKEJlYXV0aWZ5KVwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICBleHBvcnRzLmJlYXV0aWZ5KGVkaXRvci5zZXNzaW9uKTtcbiAgICB9LFxuICAgIGJpbmRLZXk6IFwiQ3RybC1TaGlmdC1CXCJcbn1dO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9