"use strict";
(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[4166],{

/***/ 34166:
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

// [WIP]


var TokenIterator = (__webpack_require__(99339).TokenIterator);

function is(token, type) {
    return token.type.lastIndexOf(type + ".xml") > -1;
}

// do not indent after singleton tags or <html>
exports.singletonTags = ["area", "base", "br", "col", "command", "embed", "hr", "html", "img", "input", "keygen", "link", "meta", "param", "source", "track", "wbr"];

// insert a line break after block level tags
exports.blockTags = ["article", "aside", "blockquote", "body", "div", "dl", "fieldset", "footer", "form", "head", "header", "html", "nav", "ol", "p", "script", "section", "style", "table", "tbody", "tfoot", "thead", "ul"];

/**
 * 
 * @type {{lineBreaksAfterCommasInCurlyBlock?: boolean}}
 */
exports.formatOptions = {
    lineBreaksAfterCommasInCurlyBlock: true
};

/**
 * 
 * @param {import("../edit_session").EditSession} session
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0E7QUFDQTtBQUNBLGtEQUFrRDtBQUNsRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjs7QUFFQTtBQUNBO0FBQ0Esa0RBQWtEOztBQUVsRCxnQ0FBZ0Msa0JBQWtCO0FBQ2xEO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYWNlLWxpbnRlcnMtcm9vdC8uL25vZGVfbW9kdWxlcy9hY2UtY29kZS9zcmMvZXh0L2JlYXV0aWZ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFtXSVBdXG5cblwidXNlIHN0cmljdFwiO1xudmFyIFRva2VuSXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vdG9rZW5faXRlcmF0b3JcIikuVG9rZW5JdGVyYXRvcjtcblxuZnVuY3Rpb24gaXModG9rZW4sIHR5cGUpIHtcbiAgICByZXR1cm4gdG9rZW4udHlwZS5sYXN0SW5kZXhPZih0eXBlICsgXCIueG1sXCIpID4gLTE7XG59XG5cbi8vIGRvIG5vdCBpbmRlbnQgYWZ0ZXIgc2luZ2xldG9uIHRhZ3Mgb3IgPGh0bWw+XG5leHBvcnRzLnNpbmdsZXRvblRhZ3MgPSBbXCJhcmVhXCIsIFwiYmFzZVwiLCBcImJyXCIsIFwiY29sXCIsIFwiY29tbWFuZFwiLCBcImVtYmVkXCIsIFwiaHJcIiwgXCJodG1sXCIsIFwiaW1nXCIsIFwiaW5wdXRcIiwgXCJrZXlnZW5cIiwgXCJsaW5rXCIsIFwibWV0YVwiLCBcInBhcmFtXCIsIFwic291cmNlXCIsIFwidHJhY2tcIiwgXCJ3YnJcIl07XG5cbi8vIGluc2VydCBhIGxpbmUgYnJlYWsgYWZ0ZXIgYmxvY2sgbGV2ZWwgdGFnc1xuZXhwb3J0cy5ibG9ja1RhZ3MgPSBbXCJhcnRpY2xlXCIsIFwiYXNpZGVcIiwgXCJibG9ja3F1b3RlXCIsIFwiYm9keVwiLCBcImRpdlwiLCBcImRsXCIsIFwiZmllbGRzZXRcIiwgXCJmb290ZXJcIiwgXCJmb3JtXCIsIFwiaGVhZFwiLCBcImhlYWRlclwiLCBcImh0bWxcIiwgXCJuYXZcIiwgXCJvbFwiLCBcInBcIiwgXCJzY3JpcHRcIiwgXCJzZWN0aW9uXCIsIFwic3R5bGVcIiwgXCJ0YWJsZVwiLCBcInRib2R5XCIsIFwidGZvb3RcIiwgXCJ0aGVhZFwiLCBcInVsXCJdO1xuXG4vKipcbiAqIFxuICogQHR5cGUge3tsaW5lQnJlYWtzQWZ0ZXJDb21tYXNJbkN1cmx5QmxvY2s/OiBib29sZWFufX1cbiAqL1xuZXhwb3J0cy5mb3JtYXRPcHRpb25zID0ge1xuICAgIGxpbmVCcmVha3NBZnRlckNvbW1hc0luQ3VybHlCbG9jazogdHJ1ZVxufTtcblxuLyoqXG4gKiBcbiAqIEBwYXJhbSB7aW1wb3J0KFwiLi4vZWRpdF9zZXNzaW9uXCIpLkVkaXRTZXNzaW9ufSBzZXNzaW9uXG4gKi9cbmV4cG9ydHMuYmVhdXRpZnkgPSBmdW5jdGlvbihzZXNzaW9uKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0gbmV3IFRva2VuSXRlcmF0b3Ioc2Vzc2lvbiwgMCwgMCk7XG4gICAgdmFyIHRva2VuID0gaXRlcmF0b3IuZ2V0Q3VycmVudFRva2VuKCk7XG4gICAgdmFyIHRhYlN0cmluZyA9IHNlc3Npb24uZ2V0VGFiU3RyaW5nKCk7XG4gICAgdmFyIHNpbmdsZXRvblRhZ3MgPSBleHBvcnRzLnNpbmdsZXRvblRhZ3M7XG4gICAgdmFyIGJsb2NrVGFncyA9IGV4cG9ydHMuYmxvY2tUYWdzO1xuICAgIHZhciBmb3JtYXRPcHRpb25zID0gZXhwb3J0cy5mb3JtYXRPcHRpb25zIHx8IHt9O1xuICAgIHZhciBuZXh0VG9rZW47XG4gICAgdmFyIGJyZWFrQmVmb3JlID0gZmFsc2U7XG4gICAgdmFyIHNwYWNlQmVmb3JlID0gZmFsc2U7XG4gICAgdmFyIHNwYWNlQWZ0ZXIgPSBmYWxzZTtcbiAgICB2YXIgY29kZSA9IFwiXCI7XG4gICAgdmFyIHZhbHVlID0gXCJcIjtcbiAgICB2YXIgdGFnTmFtZSA9IFwiXCI7XG4gICAgdmFyIGRlcHRoID0gMDtcbiAgICB2YXIgbGFzdERlcHRoID0gMDtcbiAgICB2YXIgbGFzdEluZGVudCA9IDA7XG4gICAgdmFyIGluZGVudCA9IDA7XG4gICAgdmFyIHVuaW5kZW50ID0gMDtcbiAgICB2YXIgcm91bmREZXB0aCA9IDA7XG4gICAgdmFyIGN1cmx5RGVwdGggPSAwO1xuICAgIHZhciByb3c7XG4gICAgdmFyIGN1clJvdyA9IDA7XG4gICAgdmFyIHJvd3NUb0FkZCA9IDA7XG4gICAgdmFyIHJvd1Rva2VucyA9IFtdO1xuICAgIHZhciBhYm9ydCA9IGZhbHNlO1xuICAgIHZhciBpO1xuICAgIHZhciBpbmRlbnROZXh0TGluZSA9IGZhbHNlO1xuICAgIHZhciBpblRhZyA9IGZhbHNlO1xuICAgIHZhciBpbkNTUyA9IGZhbHNlO1xuICAgIHZhciBpbkJsb2NrID0gZmFsc2U7XG4gICAgdmFyIGxldmVscyA9IHswOiAwfTtcbiAgICB2YXIgcGFyZW50cyA9IFtdO1xuICAgIHZhciBjYXNlQm9keSA9IGZhbHNlO1xuXG4gICAgdmFyIHRyaW1OZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmIChuZXh0VG9rZW4gJiYgbmV4dFRva2VuLnZhbHVlICYmIG5leHRUb2tlbi50eXBlICE9PSAnc3RyaW5nLnJlZ2V4cCcpXG4gICAgICAgICAgICBuZXh0VG9rZW4udmFsdWUgPSBuZXh0VG9rZW4udmFsdWUucmVwbGFjZSgvXlxccyovLCBcIlwiKTtcbiAgICB9O1xuICAgIFxuICAgIHZhciB0cmltTGluZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZW5kID0gY29kZS5sZW5ndGggLSAxO1xuXG4gICAgICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICAgICAgICBpZiAoZW5kID09IDApXG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBpZiAoY29kZVtlbmRdICE9PSBcIiBcIilcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgZW5kID0gZW5kIC0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvZGUgPSBjb2RlLnNsaWNlKDAsIGVuZCArIDEpO1xuICAgIH07XG4gICAgXG4gICAgdmFyIHRyaW1Db2RlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGNvZGUgPSBjb2RlLnRyaW1SaWdodCgpO1xuICAgICAgICBicmVha0JlZm9yZSA9IGZhbHNlO1xuICAgIH07XG5cbiAgICB3aGlsZSAodG9rZW4gIT09IG51bGwpIHtcbiAgICAgICAgY3VyUm93ID0gaXRlcmF0b3IuZ2V0Q3VycmVudFRva2VuUm93KCk7XG4gICAgICAgIHJvd1Rva2VucyA9IGl0ZXJhdG9yLiRyb3dUb2tlbnM7XG4gICAgICAgIG5leHRUb2tlbiA9IGl0ZXJhdG9yLnN0ZXBGb3J3YXJkKCk7XG5cbiAgICAgICAgaWYgKHR5cGVvZiB0b2tlbiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdmFsdWUgPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgICAgIHVuaW5kZW50ID0gMDtcblxuICAgICAgICAgICAgLy8gbW9kZVxuICAgICAgICAgICAgaW5DU1MgPSAodGFnTmFtZSA9PT0gXCJzdHlsZVwiIHx8IHNlc3Npb24uJG1vZGVJZCA9PT0gXCJhY2UvbW9kZS9jc3NcIik7XG5cbiAgICAgICAgICAgIC8vIGluIHRhZ1xuICAgICAgICAgICAgaWYgKGlzKHRva2VuLCBcInRhZy1vcGVuXCIpKSB7XG4gICAgICAgICAgICAgICAgaW5UYWcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgLy8gYXJlIHdlIGluIGEgYmxvY2sgdGFnXG4gICAgICAgICAgICAgICAgaWYgKG5leHRUb2tlbilcbiAgICAgICAgICAgICAgICAgICAgaW5CbG9jayA9IChibG9ja1RhZ3MuaW5kZXhPZihuZXh0VG9rZW4udmFsdWUpICE9PSAtMSk7XG5cbiAgICAgICAgICAgICAgICAvLyBodG1sIGluZGVudGF0aW9uXG4gICAgICAgICAgICAgICAgaWYgKHZhbHVlID09PSBcIjwvXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbGluZSBicmVhayBiZWZvcmUgY2xvc2luZyB0YWcgdW5sZXNzIHdlIGp1c3QgaGFkIG9uZVxuICAgICAgICAgICAgICAgICAgICBpZiAoaW5CbG9jayAmJiAhYnJlYWtCZWZvcmUgJiYgcm93c1RvQWRkIDwgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3NUb0FkZCsrO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbkNTUylcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3NUb0FkZCA9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgdW5pbmRlbnQgPSAxO1xuICAgICAgICAgICAgICAgICAgICBpbkJsb2NrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChpcyh0b2tlbiwgXCJ0YWctY2xvc2VcIikpIHtcbiAgICAgICAgICAgICAgICBpblRhZyA9IGZhbHNlO1xuICAgICAgICAgICAgLy8gY29tbWVudHNcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXModG9rZW4sIFwiY29tbWVudC5zdGFydFwiKSkge1xuICAgICAgICAgICAgICAgIGluQmxvY2sgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpcyh0b2tlbiwgXCJjb21tZW50LmVuZFwiKSkge1xuICAgICAgICAgICAgICAgIGluQmxvY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gbGluZSBicmVhayBiZWZvcmUgfVxuICAgICAgICAgICAgaWYgKCFpblRhZyAmJiAhcm93c1RvQWRkICYmIHRva2VuLnR5cGUgPT09IFwicGFyZW4ucnBhcmVuXCIgJiYgdG9rZW4udmFsdWUuc3Vic3RyKDAsIDEpID09PSBcIn1cIikge1xuICAgICAgICAgICAgICAgIHJvd3NUb0FkZCsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBhZGQgcm93c1xuICAgICAgICAgICAgaWYgKGN1clJvdyAhPT0gcm93KSB7XG4gICAgICAgICAgICAgICAgcm93c1RvQWRkID0gY3VyUm93O1xuXG4gICAgICAgICAgICAgICAgaWYgKHJvdylcbiAgICAgICAgICAgICAgICAgICAgcm93c1RvQWRkIC09IHJvdztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHJvd3NUb0FkZCkge1xuICAgICAgICAgICAgICAgIHRyaW1Db2RlKCk7XG4gICAgICAgICAgICAgICAgZm9yICg7IHJvd3NUb0FkZCA+IDA7IHJvd3NUb0FkZC0tKVxuICAgICAgICAgICAgICAgICAgICBjb2RlICs9IFwiXFxuXCI7XG5cbiAgICAgICAgICAgICAgICBicmVha0JlZm9yZSA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAvLyB0cmltIHZhbHVlIGlmIG5vdCBpbiBhIGNvbW1lbnQgb3Igc3RyaW5nXG4gICAgICAgICAgICAgICAgaWYgKCFpcyh0b2tlbiwgXCJjb21tZW50XCIpICYmICF0b2tlbi50eXBlLm1hdGNoKC9eKGNvbW1lbnR8c3RyaW5nKSQvKSlcbiAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnRyaW1MZWZ0KCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIC8vIHdoaXRlc3BhY2VcbiAgICAgICAgICAgICAgICBpZiAodG9rZW4udHlwZSA9PT0gXCJrZXl3b3JkXCIgJiYgdmFsdWUubWF0Y2goL14oaWZ8ZWxzZXxlbHNlaWZ8Zm9yfGZvcmVhY2h8d2hpbGV8c3dpdGNoKSQvKSkge1xuICAgICAgICAgICAgICAgICAgICBwYXJlbnRzW2RlcHRoXSA9IHZhbHVlO1xuXG4gICAgICAgICAgICAgICAgICAgIHRyaW1OZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgIHNwYWNlQWZ0ZXIgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNwYWNlIGJlZm9yZSBlbHNlLCBlbHNlaWZcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLm1hdGNoKC9eKGVsc2V8ZWxzZWlmKSQvKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUubWF0Y2goL1xcfVtcXHNdKiQvKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaW1Db2RlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZWZvcmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gdHJpbSB2YWx1ZSBhZnRlciBvcGVuaW5nIHBhcmVuXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0b2tlbi50eXBlID09PSBcInBhcmVuLmxwYXJlblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyaW1OZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gd2hpdGVzcGFjZSBhZnRlciB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5zdWJzdHIoLTEpID09PSBcIntcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VBZnRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRlbnROZXh0TGluZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZighaW5UYWcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93c1RvQWRkID0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGVuc3VyZSBjdXJseSBicmFjZSBpcyBwcmVjZWVkZWQgYnkgd2hpdGVzcGFjZVxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUuc3Vic3RyKDAsIDEpID09PSBcIntcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZWZvcmUgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb2xsYXBzZSBzcXVhcmUgYW5kIGN1cmx5IGJyYWNrZXRzIHRvZ2V0aGVyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY29kZS5zdWJzdHIoLTEpICE9PSAnWycgJiYgY29kZS50cmltUmlnaHQoKS5zdWJzdHIoLTEpID09PSAnWycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmltQ29kZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmVmb3JlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNvZGUudHJpbVJpZ2h0KCkuc3Vic3RyKC0xKSA9PT0gJyknKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpbUNvZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpbUxpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBzcGFjZSBiZWZvcmUgY2xvc2luZyBwYXJlblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gXCJwYXJlbi5ycGFyZW5cIikge1xuICAgICAgICAgICAgICAgICAgICB1bmluZGVudCA9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZW5zdXJlIGN1cmx5IGJyYWNlIGlzIHByZWNlZWRlZCBieSB3aGl0ZXNwYWNlXG4gICAgICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5zdWJzdHIoMCwgMSkgPT09IFwifVwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocGFyZW50c1tkZXB0aC0xXSA9PT0gJ2Nhc2UnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuaW5kZW50Kys7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2RlLnRyaW1SaWdodCgpLnN1YnN0cigtMSkgPT09ICd7Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaW1Db2RlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmVmb3JlID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbkNTUylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93c1RvQWRkKz0yO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGFwc2Ugc3F1YXJlIGFuZCBjdXJseSBicmFja2V0cyB0b2dldGhlclxuICAgICAgICAgICAgICAgICAgICBpZiAodmFsdWUuc3Vic3RyKDAsIDEpID09PSBcIl1cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUuc3Vic3RyKC0xKSAhPT0gJ30nICYmIGNvZGUudHJpbVJpZ2h0KCkuc3Vic3RyKC0xKSA9PT0gJ30nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZWZvcmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRlbnQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmltQ29kZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY29sbGFwc2Ugcm91bmQgYnJhY2tldHMgdG9nZXRoZXJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLnN1YnN0cigwLCAxKSA9PT0gXCIpXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb2RlLnN1YnN0cigtMSkgIT09ICcoJyAmJiBjb2RlLnRyaW1SaWdodCgpLnN1YnN0cigtMSkgPT09ICcoJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmVmb3JlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5kZW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJpbUNvZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRyaW1MaW5lKCk7XG4gICAgICAgICAgICAgICAgLy8gYWRkIHNwYWNlcyBhcm91bmQgY29uZGl0aW9uYWwgb3BlcmF0b3JzXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICgodG9rZW4udHlwZSA9PT0gXCJrZXl3b3JkLm9wZXJhdG9yXCIgfHwgdG9rZW4udHlwZSA9PT0gXCJrZXl3b3JkXCIpICYmIHZhbHVlLm1hdGNoKC9eKD18PT18PT09fCE9fCE9PXwmJnxcXHxcXHx8YW5kfG9yfHhvcnxcXCs9fC49fD58Pj18PHw8PXw9PikkLykpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpbUNvZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpbU5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VCZWZvcmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzcGFjZUFmdGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgc3BhY2UgYmVmb3JlIHNlbWljb2xvblxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gXCJwdW5jdHVhdGlvbi5vcGVyYXRvclwiICYmIHZhbHVlID09PSAnOycpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpbUNvZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgdHJpbU5leHQoKTtcbiAgICAgICAgICAgICAgICAgICAgc3BhY2VBZnRlciA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGluQ1NTKVxuICAgICAgICAgICAgICAgICAgICAgICAgcm93c1RvQWRkKys7XG4gICAgICAgICAgICAgICAgLy8gc3BhY2UgYWZ0ZXIgY29sb24gb3IgY29tbWFcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IFwicHVuY3R1YXRpb24ub3BlcmF0b3JcIiAmJiB2YWx1ZS5tYXRjaCgvXig6fCwpJC8pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyaW1Db2RlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRyaW1OZXh0KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbGluZSBicmVhayBhZnRlciBjb21tYXMgaW4gY3VybHkgYmxvY2tcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlLm1hdGNoKC9eKCwpJC8pICYmIGN1cmx5RGVwdGg+MCAmJiByb3VuZERlcHRoPT09MCAmJiBmb3JtYXRPcHRpb25zLmxpbmVCcmVha3NBZnRlckNvbW1hc0luQ3VybHlCbG9jaykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcm93c1RvQWRkKys7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUFmdGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrQmVmb3JlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBlbnN1cmUgc3BhY2UgYmVmb3JlIHBocCBjbG9zaW5nIHRhZ1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW4udHlwZSA9PT0gXCJzdXBwb3J0LnBocF90YWdcIiAmJiB2YWx1ZSA9PT0gXCI/PlwiICYmICFicmVha0JlZm9yZSkge1xuICAgICAgICAgICAgICAgICAgICB0cmltQ29kZSgpO1xuICAgICAgICAgICAgICAgICAgICBzcGFjZUJlZm9yZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGV4Y2VzcyBzcGFjZSBiZWZvcmUgSFRNTCBhdHRyaWJ1dGVcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzKHRva2VuLCBcImF0dHJpYnV0ZS1uYW1lXCIpICYmIGNvZGUuc3Vic3RyKC0xKS5tYXRjaCgvXlxccyQvKSkge1xuICAgICAgICAgICAgICAgICAgICBzcGFjZUJlZm9yZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHNwYWNlIGFyb3VuZCBhdHRyaWJ1dGUgZXF1YWxzXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpcyh0b2tlbiwgXCJhdHRyaWJ1dGUtZXF1YWxzXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyaW1MaW5lKCk7XG4gICAgICAgICAgICAgICAgICAgIHRyaW1OZXh0KCk7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIHNwYWNlIGJlZm9yZSBIVE1MIGNsb3NpbmcgdGFnXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpcyh0b2tlbiwgXCJ0YWctY2xvc2VcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpbUxpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYodmFsdWUgPT09IFwiLz5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmVmb3JlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IFwia2V5d29yZFwiICYmIHZhbHVlLm1hdGNoKC9eKGNhc2V8ZGVmYXVsdCkkLykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhc2VCb2R5KVxuICAgICAgICAgICAgICAgICAgICAgICAgdW5pbmRlbnQgPSAxO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGFkZCBpbmRlbnQgdG8gY29kZSB1bmxlc3MgbXVsdGlsaW5lIHN0cmluZyBvciBjb21tZW50XG4gICAgICAgICAgICAgICAgaWYgKGJyZWFrQmVmb3JlICYmICEodG9rZW4udHlwZS5tYXRjaCgvXihjb21tZW50KSQvKSAmJiAhdmFsdWUuc3Vic3RyKDAsIDEpLm1hdGNoKC9eWy8jXSQvKSkgJiYgISh0b2tlbi50eXBlLm1hdGNoKC9eKHN0cmluZykkLykgJiYgIXZhbHVlLnN1YnN0cigwLCAxKS5tYXRjaCgvXlsnXCJAXSQvKSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBpbmRlbnQgPSBsYXN0SW5kZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKGRlcHRoID4gbGFzdERlcHRoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRlbnQrKztcblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChpPWRlcHRoOyBpID4gbGFzdERlcHRoOyBpLS0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV2ZWxzW2ldID0gaW5kZW50O1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZGVwdGggPCBsYXN0RGVwdGgpXG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRlbnQgPSBsZXZlbHNbZGVwdGhdO1xuXG4gICAgICAgICAgICAgICAgICAgIGxhc3REZXB0aCA9IGRlcHRoO1xuICAgICAgICAgICAgICAgICAgICBsYXN0SW5kZW50ID0gaW5kZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKHVuaW5kZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZW50IC09IHVuaW5kZW50O1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChpbmRlbnROZXh0TGluZSAmJiAhcm91bmREZXB0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5kZW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmRlbnROZXh0TGluZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGluZGVudDsgaSsrKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29kZSArPSB0YWJTdHJpbmc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IFwia2V5d29yZFwiICYmIHZhbHVlLm1hdGNoKC9eKGNhc2V8ZGVmYXVsdCkkLykpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhc2VCb2R5ID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50c1tkZXB0aF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBjYXNlQm9keSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRva2VuLnR5cGUgPT09IFwia2V5d29yZFwiICYmIHZhbHVlLm1hdGNoKC9eKGJyZWFrKSQvKSkge1xuICAgICAgICAgICAgICAgICAgICBpZihwYXJlbnRzW2RlcHRoLTFdICYmIHBhcmVudHNbZGVwdGgtMV0ubWF0Y2goL14oY2FzZXxkZWZhdWx0KSQvKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwdGgtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2VCb2R5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpbmRlbnQgb25lIGxpbmUgYWZ0ZXIgaWYgb3IgZWxzZVxuICAgICAgICAgICAgICAgIGlmICh0b2tlbi50eXBlID09PSBcInBhcmVuLmxwYXJlblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdW5kRGVwdGggKz0gKHZhbHVlLm1hdGNoKC9cXCgvZykgfHwgW10pLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgY3VybHlEZXB0aCArPSAodmFsdWUubWF0Y2goL1xcey9nKSB8fCBbXSkubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBkZXB0aCArPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgPT09IFwia2V5d29yZFwiICYmIHZhbHVlLm1hdGNoKC9eKGlmfGVsc2V8ZWxzZWlmfGZvcnx3aGlsZSkkLykpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZW50TmV4dExpbmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByb3VuZERlcHRoID0gMDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFyb3VuZERlcHRoICYmIHZhbHVlLnRyaW0oKSAmJiB0b2tlbi50eXBlICE9PSBcImNvbW1lbnRcIilcbiAgICAgICAgICAgICAgICAgICAgaW5kZW50TmV4dExpbmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIGlmICh0b2tlbi50eXBlID09PSBcInBhcmVuLnJwYXJlblwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdW5kRGVwdGggLT0gKHZhbHVlLm1hdGNoKC9cXCkvZykgfHwgW10pLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgY3VybHlEZXB0aCAtPSAodmFsdWUubWF0Y2goL1xcfS9nKSB8fCBbXSkubGVuZ3RoO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwdGgtLTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHZhbHVlLnN1YnN0cihpLCAxKT09PSd9JyAmJiBwYXJlbnRzW2RlcHRoXT09PSdjYXNlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlcHRoLS07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKHRva2VuLnR5cGUgPT0gXCJ0ZXh0XCIpXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxzKyQvLCBcIiBcIik7XG5cbiAgICAgICAgICAgICAgICAvLyBhZGQgdG8gY29kZVxuICAgICAgICAgICAgICAgIGlmIChzcGFjZUJlZm9yZSAmJiAhYnJlYWtCZWZvcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJpbUxpbmUoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvZGUuc3Vic3RyKC0xKSAhPT0gXCJcXG5cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvZGUgKz0gXCIgXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29kZSArPSB2YWx1ZTtcblxuICAgICAgICAgICAgICAgIGlmIChzcGFjZUFmdGVyKVxuICAgICAgICAgICAgICAgICAgICBjb2RlICs9IFwiIFwiO1xuXG4gICAgICAgICAgICAgICAgYnJlYWtCZWZvcmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzcGFjZUJlZm9yZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNwYWNlQWZ0ZXIgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgIC8vIGxpbmUgYnJlYWsgYWZ0ZXIgYmxvY2sgdGFnIG9yIGRvY3R5cGVcbiAgICAgICAgICAgICAgICBpZiAoKGlzKHRva2VuLCBcInRhZy1jbG9zZVwiKSAmJiAoaW5CbG9jayB8fCBibG9ja1RhZ3MuaW5kZXhPZih0YWdOYW1lKSAhPT0gLTEpKSB8fCAoaXModG9rZW4sIFwiZG9jdHlwZVwiKSAmJiB2YWx1ZSA9PT0gXCI+XCIpKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHVuZG8gbGluZWJyZWFrIGlmIHRhZyBpcyBpbW1lZGlhdGVseSBjbG9zZWRcbiAgICAgICAgICAgICAgICAgICAgaWYgKGluQmxvY2sgJiYgbmV4dFRva2VuICYmIG5leHRUb2tlbi52YWx1ZSA9PT0gXCI8L1wiKVxuICAgICAgICAgICAgICAgICAgICAgICAgcm93c1RvQWRkID0gLTE7XG4gICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd3NUb0FkZCA9IDE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gaHRtbCBpbmRlbnRhdGlvblxuICAgICAgICAgICAgICAgIGlmIChuZXh0VG9rZW4gJiYgc2luZ2xldG9uVGFncy5pbmRleE9mKG5leHRUb2tlbi52YWx1ZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpcyh0b2tlbiwgXCJ0YWctb3BlblwiKSAmJiB2YWx1ZSA9PT0gXCI8L1wiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0aC0tO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzKHRva2VuLCBcInRhZy1vcGVuXCIpICYmIHZhbHVlID09PSBcIjxcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVwdGgrKztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpcyh0b2tlbiwgXCJ0YWctY2xvc2VcIikgJiYgdmFsdWUgPT09IFwiLz5cIil7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZXB0aC0tO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGlmIChpcyh0b2tlbiwgXCJ0YWctbmFtZVwiKSkge1xuICAgICAgICAgICAgICAgICAgICB0YWdOYW1lID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcm93ID0gY3VyUm93O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdG9rZW4gPSBuZXh0VG9rZW47XG4gICAgfVxuXG4gICAgY29kZSA9IGNvZGUudHJpbSgpO1xuICAgIHNlc3Npb24uZG9jLnNldFZhbHVlKGNvZGUpO1xufTtcblxuZXhwb3J0cy5jb21tYW5kcyA9IFt7XG4gICAgbmFtZTogXCJiZWF1dGlmeVwiLFxuICAgIGRlc2NyaXB0aW9uOiBcIkZvcm1hdCBzZWxlY3Rpb24gKEJlYXV0aWZ5KVwiLFxuICAgIGV4ZWM6IGZ1bmN0aW9uKGVkaXRvcikge1xuICAgICAgICBleHBvcnRzLmJlYXV0aWZ5KGVkaXRvci5zZXNzaW9uKTtcbiAgICB9LFxuICAgIGJpbmRLZXk6IFwiQ3RybC1TaGlmdC1CXCJcbn1dO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9