(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[922],{

/***/ 6922:
/***/ ((module) => {

!function (e, t) { if (true)
    module.exports = t();
else { var r, n; } }(self, (() => (() => { var e = { 7438: function (e, t, n) { var r, o, a; e = n.nmd(e), function (i, s, c) {
        "use strict";
        var u = { function: !0, object: !0 }, l = u[typeof t] && t && !t.nodeType && t, p = u.object && e && !e.nodeType && e, f = l && p && "object" == typeof n.g && n.g, d = p && p.exports === l && l;
        !f || f.global !== f && f.window !== f && f.self, o = [t], void 0 === (a = "function" == typeof (r = c) ? r.apply(t, o) : r) || (e.exports = a), l && d && c(p.exports);
    }(0, 0, (function (e) {
        "use strict";
        var t, n, r, o, a;
        e.version = "0.3.1";
        var i = e.defaultOptions = { wait: !1, comments: !0, scope: !1, locations: !1, ranges: !1, onCreateNode: null, onCreateScope: null, onDestroyScope: null, onLocalDeclaration: null, luaVersion: "5.1", encodingMode: "none" };
        function s(e, t) { return t = t || 0, e < 128 ? String.fromCharCode(e) : e < 2048 ? String.fromCharCode(192 | t | e >> 6, 128 | t | 63 & e) : e < 65536 ? String.fromCharCode(224 | t | e >> 12, 128 | t | e >> 6 & 63, 128 | t | 63 & e) : e < 1114112 ? String.fromCharCode(240 | t | e >> 18, 128 | t | e >> 12 & 63, 128 | t | e >> 6 & 63, 128 | t | 63 & e) : null; }
        function c(e) { return function (t) { var n = e.exec(t); if (!n)
            return t; T(null, d.invalidCodeUnit, function (e, t) { for (var n = e.toString(16); n.length < 4;)
            n = "0" + n; return n; }(n[0].charCodeAt(0)).toUpperCase()); }; }
        var u = { "pseudo-latin1": { fixup: c(/[^\x00-\xff]/), encodeByte: function (e) { return null === e ? "" : String.fromCharCode(e); }, encodeUTF8: function (e) { return s(e); } }, "x-user-defined": { fixup: c(/[^\x00-\x7f\uf780-\uf7ff]/), encodeByte: function (e) { return null === e ? "" : e >= 128 ? String.fromCharCode(63232 | e) : String.fromCharCode(e); }, encodeUTF8: function (e) { return s(e, 63232); } }, none: { discardStrings: !0, fixup: function (e) { return e; }, encodeByte: function (e) { return ""; }, encodeUTF8: function (e) { return ""; } } }, l = 32, p = 128, f = 256;
        e.tokenTypes = { EOF: 1, StringLiteral: 2, Keyword: 4, Identifier: 8, NumericLiteral: 16, Punctuator: l, BooleanLiteral: 64, NilLiteral: p, VarargLiteral: f };
        var d = e.errors = { unexpected: "unexpected %1 '%2' near '%3'", unexpectedEOF: "unexpected symbol near '<eof>'", expected: "'%1' expected near '%2'", expectedToken: "%1 expected near '%2'", unfinishedString: "unfinished string near '%1'", malformedNumber: "malformed number near '%1'", decimalEscapeTooLarge: "decimal escape too large near '%1'", invalidEscape: "invalid escape sequence near '%1'", hexadecimalDigitExpected: "hexadecimal digit expected near '%1'", braceExpected: "missing '%1' near '%2'", tooLargeCodepoint: "UTF-8 value too large near '%1'", unfinishedLongString: "unfinished long string (starting at line %1) near '%2'", unfinishedLongComment: "unfinished long comment (starting at line %1) near '%2'", ambiguousSyntax: "ambiguous syntax (function call x new statement) near '%1'", noLoopToBreak: "no loop to break near '%1'", labelAlreadyDefined: "label '%1' already defined on line %2", labelNotVisible: "no visible label '%1' for <goto>", gotoJumpInLocalScope: "<goto %1> jumps into the scope of local '%2'", cannotUseVararg: "cannot use '...' outside a vararg function near '%1'", invalidCodeUnit: "code unit U+%1 is not allowed in the current encoding mode" }, h = e.ast = { labelStatement: function (e) { return { type: "LabelStatement", label: e }; }, breakStatement: function () { return { type: "BreakStatement" }; }, gotoStatement: function (e) { return { type: "GotoStatement", label: e }; }, returnStatement: function (e) { return { type: "ReturnStatement", arguments: e }; }, ifStatement: function (e) { return { type: "IfStatement", clauses: e }; }, ifClause: function (e, t) { return { type: "IfClause", condition: e, body: t }; }, elseifClause: function (e, t) { return { type: "ElseifClause", condition: e, body: t }; }, elseClause: function (e) { return { type: "ElseClause", body: e }; }, whileStatement: function (e, t) { return { type: "WhileStatement", condition: e, body: t }; }, doStatement: function (e) { return { type: "DoStatement", body: e }; }, repeatStatement: function (e, t) { return { type: "RepeatStatement", condition: e, body: t }; }, localStatement: function (e, t) { return { type: "LocalStatement", variables: e, init: t }; }, assignmentStatement: function (e, t) { return { type: "AssignmentStatement", variables: e, init: t }; }, callStatement: function (e) { return { type: "CallStatement", expression: e }; }, functionStatement: function (e, t, n, r) { return { type: "FunctionDeclaration", identifier: e, isLocal: n, parameters: t, body: r }; }, forNumericStatement: function (e, t, n, r, o) { return { type: "ForNumericStatement", variable: e, start: t, end: n, step: r, body: o }; }, forGenericStatement: function (e, t, n) { return { type: "ForGenericStatement", variables: e, iterators: t, body: n }; }, chunk: function (e) { return { type: "Chunk", body: e }; }, identifier: function (e) { return { type: "Identifier", name: e }; }, literal: function (e, t, n) { return { type: e = 2 === e ? "StringLiteral" : 16 === e ? "NumericLiteral" : 64 === e ? "BooleanLiteral" : e === p ? "NilLiteral" : "VarargLiteral", value: t, raw: n }; }, tableKey: function (e, t) { return { type: "TableKey", key: e, value: t }; }, tableKeyString: function (e, t) { return { type: "TableKeyString", key: e, value: t }; }, tableValue: function (e) { return { type: "TableValue", value: e }; }, tableConstructorExpression: function (e) { return { type: "TableConstructorExpression", fields: e }; }, binaryExpression: function (e, t, n) { return { type: "and" === e || "or" === e ? "LogicalExpression" : "BinaryExpression", operator: e, left: t, right: n }; }, unaryExpression: function (e, t) { return { type: "UnaryExpression", operator: e, argument: t }; }, memberExpression: function (e, t, n) { return { type: "MemberExpression", indexer: t, identifier: n, base: e }; }, indexExpression: function (e, t) { return { type: "IndexExpression", base: e, index: t }; }, callExpression: function (e, t) { return { type: "CallExpression", base: e, arguments: t }; }, tableCallExpression: function (e, t) { return { type: "TableCallExpression", base: e, arguments: t }; }, stringCallExpression: function (e, t) { return { type: "StringCallExpression", base: e, argument: t }; }, comment: function (e, t) { return { type: "Comment", value: e, raw: t }; } };
        function g(e) { if (oe) {
            var t = ae.pop();
            t.complete(), t.bless(e);
        } return n.onCreateNode && n.onCreateNode(e), e; }
        var v = Array.prototype.slice, m = (Object.prototype.toString, function (e, t) { for (var n = 0, r = e.length; n < r; ++n)
            if (e[n] === t)
                return n; return -1; });
        function y(e) { var t = v.call(arguments, 1); return e = e.replace(/%(\d)/g, (function (e, n) { return "" + t[n - 1] || ""; })), e; }
        Array.prototype.indexOf && (m = function (e, t) { return e.indexOf(t); });
        var b, x, S, C, w, O, A, E, L, k, _, j = function (e) { for (var t, n, r = v.call(arguments, 1), o = 0, a = r.length; o < a; ++o)
            for (n in t = r[o])
                Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]); return e; };
        function D(e) { return Object.create ? Object.create(e, { line: { writable: !0, value: e.line }, index: { writable: !0, value: e.index }, column: { writable: !0, value: e.column } }) : e; }
        function T(e) { var t, n, r = y.apply(null, v.call(arguments, 1)); throw null === e || void 0 === e.line ? (n = b - E + 1, (t = D(new SyntaxError(y("[%1:%2] %3", A, n, r)))).index = b, t.line = A, t.column = n) : (n = e.range[0] - e.lineStart, (t = D(new SyntaxError(y("[%1:%2] %3", e.line, n, r)))).line = e.line, t.index = e.range[0], t.column = n), t; }
        function I(e) { return t.slice(e.range[0], e.range[1]) || e.value; }
        function P(e, t) { T(t, d.expectedToken, e, I(t)); }
        function N(e) { var t = I(C); if (void 0 !== e.type) {
            var n;
            switch (e.type) {
                case 2:
                    n = "string";
                    break;
                case 4:
                    n = "keyword";
                    break;
                case 8:
                    n = "identifier";
                    break;
                case 16:
                    n = "number";
                    break;
                case l:
                    n = "symbol";
                    break;
                case 64:
                    n = "boolean";
                    break;
                case p: return T(e, d.unexpected, "symbol", "nil", t);
                case 1: return T(e, d.unexpectedEOF);
            }
            return T(e, d.unexpected, n, I(e), t);
        } return T(e, d.unexpected, "symbol", e, t); }
        function M() { for (G(); 45 === t.charCodeAt(b) && 45 === t.charCodeAt(b + 1);)
            K(), G(); if (b >= r)
            return { type: 1, value: "<eof>", line: A, lineStart: E, range: [b, b] }; var e, n, i, s = t.charCodeAt(b), c = t.charCodeAt(b + 1); if (O = b, function (e) { return e >= 65 && e <= 90 || e >= 97 && e <= 122 || 95 === e || !!(o.extendedIdentifiers && e >= 128); }(s))
            return function () { for (var e, n; X(t.charCodeAt(++b));)
                ; return !function (e) { switch (e.length) {
                case 2: return "do" === e || "if" === e || "in" === e || "or" === e;
                case 3: return "and" === e || "end" === e || "for" === e || "not" === e;
                case 4: return "else" === e || "then" === e || !(!o.labels || o.contextualGoto) && "goto" === e;
                case 5: return "break" === e || "local" === e || "until" === e || "while" === e;
                case 6: return "elseif" === e || "repeat" === e || "return" === e;
                case 8: return "function" === e;
            } return !1; }(e = a.fixup(t.slice(O, b))) ? "true" === e || "false" === e ? (n = 64, e = "true" === e) : "nil" === e ? (n = p, e = null) : n = 8 : n = 4, { type: n, value: e, line: A, lineStart: E, range: [O, b] }; }(); switch (s) {
            case 39:
            case 34: return function () { for (var e, n = t.charCodeAt(b++), o = A, i = E, s = b, c = a.discardStrings ? null : ""; n !== (e = t.charCodeAt(b++));)
                if ((b > r || R(e)) && (c += t.slice(s, b - 1), T(null, d.unfinishedString, t.slice(O, b - 1))), 92 === e) {
                    if (!a.discardStrings) {
                        var u = t.slice(s, b - 1);
                        c += a.fixup(u);
                    }
                    var l = U();
                    a.discardStrings || (c += l), s = b;
                } return a.discardStrings || (c += a.encodeByte(null), c += a.fixup(t.slice(s, b - 1))), { type: 2, value: c, line: o, lineStart: i, lastLine: A, lastLineStart: E, range: [O, b] }; }();
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57: return F();
            case 46: return q(c) ? F() : 46 === c ? 46 === t.charCodeAt(b + 2) ? { type: f, value: "...", line: A, lineStart: E, range: [O, b += 3] } : B("..") : B(".");
            case 61: return B(61 === c ? "==" : "=");
            case 62: return o.bitwiseOperators && 62 === c ? B(">>") : B(61 === c ? ">=" : ">");
            case 60: return o.bitwiseOperators && 60 === c ? B("<<") : B(61 === c ? "<=" : "<");
            case 126:
                if (61 === c)
                    return B("~=");
                if (!o.bitwiseOperators)
                    break;
                return B("~");
            case 58: return o.labels && 58 === c ? B("::") : B(":");
            case 91: return 91 === c || 61 === c ? (e = A, n = E, !1 === (i = W(!1)) && T(x, d.expected, "[", I(x)), { type: 2, value: a.discardStrings ? null : a.fixup(i), line: e, lineStart: n, lastLine: A, lastLineStart: E, range: [O, b] }) : B("[");
            case 47: return o.integerDivision && 47 === c ? B("//") : B("/");
            case 38:
            case 124: if (!o.bitwiseOperators)
                break;
            case 42:
            case 94:
            case 37:
            case 44:
            case 123:
            case 125:
            case 93:
            case 40:
            case 41:
            case 59:
            case 35:
            case 45:
            case 43: return B(t.charAt(b));
        } return N(t.charAt(b)); }
        function V() { var e = t.charCodeAt(b), n = t.charCodeAt(b + 1); return !!R(e) && (10 === e && 13 === n && ++b, 13 === e && 10 === n && ++b, ++A, E = ++b, !0); }
        function G() { for (; b < r;)
            if (9 === (e = t.charCodeAt(b)) || 32 === e || 11 === e || 12 === e)
                ++b;
            else if (!V())
                break; var e; }
        function B(e) { return b += e.length, { type: l, value: e, line: A, lineStart: E, range: [O, b] }; }
        function F() { var e = t.charAt(b), n = t.charAt(b + 1), r = "0" === e && "xX".indexOf(n || null) >= 0 ? function () { var e, n, r, o, a = 0, i = 1, s = 1; for (o = b += 2, z(t.charCodeAt(b)) || T(null, d.malformedNumber, t.slice(O, b)); z(t.charCodeAt(b));)
            ++b; e = parseInt(t.slice(o, b), 16); var c = !1; if ("." === t.charAt(b)) {
            for (c = !0, n = ++b; z(t.charCodeAt(b));)
                ++b;
            a = t.slice(n, b), a = n === b ? 0 : parseInt(a, 16) / Math.pow(16, b - n);
        } var u = !1; if ("pP".indexOf(t.charAt(b) || null) >= 0) {
            for (u = !0, ++b, "+-".indexOf(t.charAt(b) || null) >= 0 && (s = "+" === t.charAt(b++) ? 1 : -1), r = b, q(t.charCodeAt(b)) || T(null, d.malformedNumber, t.slice(O, b)); q(t.charCodeAt(b));)
                ++b;
            i = t.slice(r, b), i = Math.pow(2, i * s);
        } return { value: (e + a) * i, hasFractionPart: c || u }; }() : function () { for (; q(t.charCodeAt(b));)
            ++b; var e = !1; if ("." === t.charAt(b))
            for (e = !0, ++b; q(t.charCodeAt(b));)
                ++b; var n = !1; if ("eE".indexOf(t.charAt(b) || null) >= 0)
            for (n = !0, ++b, "+-".indexOf(t.charAt(b) || null) >= 0 && ++b, q(t.charCodeAt(b)) || T(null, d.malformedNumber, t.slice(O, b)); q(t.charCodeAt(b));)
                ++b; return { value: parseFloat(t.slice(O, b)), hasFractionPart: e || n }; }(), a = function () { if (o.imaginaryNumbers)
            return "iI".indexOf(t.charAt(b) || null) >= 0 && (++b, !0); }(); return function () { if (o.integerSuffixes)
            if ("uU".indexOf(t.charAt(b) || null) >= 0)
                if (++b, "lL".indexOf(t.charAt(b) || null) >= 0) {
                    if (++b, "lL".indexOf(t.charAt(b) || null) >= 0)
                        return ++b, "ULL";
                    T(null, d.malformedNumber, t.slice(O, b));
                }
                else
                    T(null, d.malformedNumber, t.slice(O, b));
            else if ("lL".indexOf(t.charAt(b) || null) >= 0) {
                if (++b, "lL".indexOf(t.charAt(b) || null) >= 0)
                    return ++b, "LL";
                T(null, d.malformedNumber, t.slice(O, b));
            } }() && (a || r.hasFractionPart) && T(null, d.malformedNumber, t.slice(O, b)), { type: 16, value: r.value, line: A, lineStart: E, range: [O, b] }; }
        function U() { var e = b; switch (t.charAt(b)) {
            case "a": return ++b, "";
            case "n": return ++b, "\n";
            case "r": return ++b, "\r";
            case "t": return ++b, "\t";
            case "v": return ++b, "\v";
            case "b": return ++b, "\b";
            case "f": return ++b, "\f";
            case "\r":
            case "\n": return V(), "\n";
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                for (; q(t.charCodeAt(b)) && b - e < 3;)
                    ++b;
                var n = t.slice(e, b), r = parseInt(n, 10);
                return r > 255 && T(null, d.decimalEscapeTooLarge, "\\" + r), a.encodeByte(r, "\\" + n);
            case "z":
                if (o.skipWhitespaceEscape)
                    return ++b, G(), "";
                break;
            case "x":
                if (o.hexEscapes) {
                    if (z(t.charCodeAt(b + 1)) && z(t.charCodeAt(b + 2)))
                        return b += 3, a.encodeByte(parseInt(t.slice(e + 1, b), 16), "\\" + t.slice(e, b));
                    T(null, d.hexadecimalDigitExpected, "\\" + t.slice(e, b + 2));
                }
                break;
            case "u":
                if (o.unicodeEscapes)
                    return function () { var e = b++; for ("{" !== t.charAt(b++) && T(null, d.braceExpected, "{", "\\" + t.slice(e, b)), z(t.charCodeAt(b)) || T(null, d.hexadecimalDigitExpected, "\\" + t.slice(e, b)); 48 === t.charCodeAt(b);)
                        ++b; for (var n = b; z(t.charCodeAt(b));)
                        ++b - n > 6 && T(null, d.tooLargeCodepoint, "\\" + t.slice(e, b)); var r = t.charAt(b++); "}" !== r && ('"' === r || "'" === r ? T(null, d.braceExpected, "}", "\\" + t.slice(e, b--)) : T(null, d.hexadecimalDigitExpected, "\\" + t.slice(e, b))); var o = parseInt(t.slice(n, b - 1) || "0", 16), i = "\\" + t.slice(e, b); return o > 1114111 && T(null, d.tooLargeCodepoint, i), a.encodeUTF8(o, i); }();
                break;
            case "\\":
            case '"':
            case "'": return t.charAt(b++);
        } return o.strictEscapes && T(null, d.invalidEscape, "\\" + t.slice(e, b + 1)), t.charAt(b++); }
        function K() { O = b, b += 2; var e = t.charAt(b), o = "", a = !1, i = b, s = E, c = A; if ("[" === e && (!1 === (o = W(!0)) ? o = e : a = !0), !a) {
            for (; b < r && !R(t.charCodeAt(b));)
                ++b;
            n.comments && (o = t.slice(i, b));
        } if (n.comments) {
            var u = h.comment(o, t.slice(O, b));
            n.locations && (u.loc = { start: { line: c, column: O - s }, end: { line: A, column: b - E } }), n.ranges && (u.range = [O, b]), n.onCreateNode && n.onCreateNode(u), w.push(u);
        } }
        function W(e) { var n, o = 0, a = "", i = !1, s = A; for (++b; "=" === t.charAt(b + o);)
            ++o; if ("[" !== t.charAt(b + o))
            return !1; for (b += o + 1, R(t.charCodeAt(b)) && V(), n = b; b < r;) {
            for (; R(t.charCodeAt(b));)
                V();
            if ("]" === t.charAt(b++)) {
                i = !0;
                for (var c = 0; c < o; ++c)
                    "=" !== t.charAt(b + c) && (i = !1);
                "]" !== t.charAt(b + o) && (i = !1);
            }
            if (i)
                return a += t.slice(n, b - 1), b += o + 1, a;
        } T(null, e ? d.unfinishedLongComment : d.unfinishedLongString, s, "<eof>"); }
        function $() { S = x, x = C, C = M(); }
        function H(e) { return e === x.value && ($(), !0); }
        function J(e) { e === x.value ? $() : T(x, d.expected, e, I(x)); }
        function R(e) { return 10 === e || 13 === e; }
        function q(e) { return e >= 48 && e <= 57; }
        function z(e) { return e >= 48 && e <= 57 || e >= 97 && e <= 102 || e >= 65 && e <= 70; }
        function X(e) { return e >= 65 && e <= 90 || e >= 97 && e <= 122 || 95 === e || e >= 48 && e <= 57 || !!(o.extendedIdentifiers && e >= 128); }
        function Q(e) { if (1 === e.type)
            return !0; if (4 !== e.type)
            return !1; switch (e.value) {
            case "else":
            case "elseif":
            case "end":
            case "until": return !0;
            default: return !1;
        } }
        function Y() { var e = L[k++].slice(); L.push(e), n.onCreateScope && n.onCreateScope(); }
        function Z() { L.pop(), --k, n.onDestroyScope && n.onDestroyScope(); }
        function ee(e) { n.onLocalDeclaration && n.onLocalDeclaration(e), -1 === m(L[k], e) && L[k].push(e); }
        function te(e) { ee(e.name), ne(e, !0); }
        function ne(e, t) { t || -1 !== function (e, t, n) { for (var r = 0, o = e.length; r < o; ++r)
            if (e[r].name === n)
                return r; return -1; }(_, 0, e.name) || _.push(e), e.isLocal = t; }
        function re(e) { return -1 !== m(L[k], e); }
        Object.assign && (j = Object.assign), e.SyntaxError = SyntaxError, e.lex = M;
        var oe, ae = [];
        function ie() { return new se(x); }
        function se(e) { n.locations && (this.loc = { start: { line: e.line, column: e.range[0] - e.lineStart }, end: { line: 0, column: 0 } }), n.ranges && (this.range = [e.range[0], 0]); }
        function ce() { oe && ae.push(ie()); }
        function ue(e) { oe && ae.push(e); }
        function le() { this.scopes = [], this.pendingGotos = []; }
        function pe() { this.level = 0, this.loopLevels = []; }
        function fe() { return o.labels ? new le : new pe; }
        function de(e) { for (var t, n = []; !Q(x);) {
            if ("return" === x.value || !o.relaxedBreak && "break" === x.value) {
                n.push(he(e));
                break;
            }
            t = he(e), H(";"), t && n.push(t);
        } return n; }
        function he(e) { if (ce(), l === x.type && H("::"))
            return function (e) { var t = x, r = ve(); return n.scope && (ee("::" + t.value + "::"), ne(r, !0)), J("::"), e.addLabel(t.value, t), g(h.labelStatement(r)); }(e); if (!o.emptyStatement || !H(";")) {
            if (e.raiseDeferredErrors(), 4 === x.type)
                switch (x.value) {
                    case "local": return $(), function (e) { var t, r = S; if (8 === x.type) {
                        var o = [], a = [];
                        do {
                            t = ve(), o.push(t), e.addLocal(t.name, r);
                        } while (H(","));
                        if (H("="))
                            do {
                                var i = xe(e);
                                a.push(i);
                            } while (H(","));
                        if (n.scope)
                            for (var s = 0, c = o.length; s < c; ++s)
                                te(o[s]);
                        return g(h.localStatement(o, a));
                    } if (H("function"))
                        return t = ve(), e.addLocal(t.name, r), n.scope && (te(t), Y()), me(t, !0); P("<name>", x); }(e);
                    case "if": return $(), function (e) { var t, r, o, a = []; for (oe && (o = ae[ae.length - 1], ae.push(o)), t = xe(e), J("then"), n.scope && Y(), e.pushScope(), r = de(e), e.popScope(), n.scope && Z(), a.push(g(h.ifClause(t, r))), oe && (o = ie()); H("elseif");)
                        ue(o), t = xe(e), J("then"), n.scope && Y(), e.pushScope(), r = de(e), e.popScope(), n.scope && Z(), a.push(g(h.elseifClause(t, r))), oe && (o = ie()); return H("else") && (oe && (o = new se(S), ae.push(o)), n.scope && Y(), e.pushScope(), r = de(e), e.popScope(), n.scope && Z(), a.push(g(h.elseClause(r)))), J("end"), g(h.ifStatement(a)); }(e);
                    case "return": return $(), function (e) { var t = []; if ("end" !== x.value) {
                        var n = be(e);
                        for (null != n && t.push(n); H(",");)
                            n = xe(e), t.push(n);
                        H(";");
                    } return g(h.returnStatement(t)); }(e);
                    case "function": return $(), me(function () { var e, t, r; for (oe && (r = ie()), e = ve(), n.scope && (ne(e, re(e.name)), Y()); H(".");)
                        ue(r), t = ve(), e = g(h.memberExpression(e, ".", t)); return H(":") && (ue(r), t = ve(), e = g(h.memberExpression(e, ":", t)), n.scope && ee("self")), e; }());
                    case "while": return $(), function (e) { var t = xe(e); J("do"), n.scope && Y(), e.pushScope(!0); var r = de(e); return e.popScope(), n.scope && Z(), J("end"), g(h.whileStatement(t, r)); }(e);
                    case "for": return $(), function (e) { var t, r = ve(); if (n.scope && (Y(), te(r)), H("=")) {
                        var o = xe(e);
                        J(",");
                        var a = xe(e), i = H(",") ? xe(e) : null;
                        return J("do"), e.pushScope(!0), t = de(e), e.popScope(), J("end"), n.scope && Z(), g(h.forNumericStatement(r, o, a, i, t));
                    } for (var s = [r]; H(",");)
                        r = ve(), n.scope && te(r), s.push(r); J("in"); var c = []; do {
                        var u = xe(e);
                        c.push(u);
                    } while (H(",")); return J("do"), e.pushScope(!0), t = de(e), e.popScope(), J("end"), n.scope && Z(), g(h.forGenericStatement(s, c, t)); }(e);
                    case "repeat": return $(), function (e) { n.scope && Y(), e.pushScope(!0); var t = de(e); J("until"), e.raiseDeferredErrors(); var r = xe(e); return e.popScope(), n.scope && Z(), g(h.repeatStatement(r, t)); }(e);
                    case "break": return $(), e.isInLoop() || T(x, d.noLoopToBreak, x.value), g(h.breakStatement());
                    case "do": return $(), function (e) { n.scope && Y(), e.pushScope(); var t = de(e); return e.popScope(), n.scope && Z(), J("end"), g(h.doStatement(t)); }(e);
                    case "goto": return $(), ge(e);
                }
            return o.contextualGoto && 8 === x.type && "goto" === x.value && 8 === C.type && "goto" !== C.value ? ($(), ge(e)) : (oe && ae.pop(), function (e) { var t, r, o, a, i, s = []; for (oe && (r = ie());;) {
                if (oe && (t = ie()), 8 === x.type)
                    i = x.value, a = ve(), n.scope && ne(a, re(i)), o = !0;
                else {
                    if ("(" !== x.value)
                        return N(x);
                    $(), a = xe(e), J(")"), o = !1;
                }
                e: for (;;) {
                    switch (2 === x.type ? '"' : x.value) {
                        case ".":
                        case "[":
                            o = !0;
                            break;
                        case ":":
                        case "(":
                        case "{":
                        case '"':
                            o = null;
                            break;
                        default: break e;
                    }
                    a = we(a, t, e);
                }
                if (s.push(a), "," !== x.value)
                    break;
                if (!o)
                    return N(x);
                $();
            } if (1 === s.length && null === o)
                return ue(t), g(h.callStatement(s[0])); if (!o)
                return N(x); J("="); var c = []; do {
                c.push(xe(e));
            } while (H(",")); return ue(r), g(h.assignmentStatement(s, c)); }(e));
        } oe && ae.pop(); }
        function ge(e) { var t = x.value, n = S, r = ve(); return e.addGoto(t, n), g(h.gotoStatement(r)); }
        function ve() { ce(); var e = x.value; return 8 !== x.type && P("<name>", x), $(), g(h.identifier(e)); }
        function me(e, t) { var r = fe(); r.pushScope(); var o = []; if (J("("), !H(")"))
            for (;;) {
                if (8 === x.type) {
                    var a = ve();
                    if (n.scope && te(a), o.push(a), H(","))
                        continue;
                }
                else
                    f === x.type ? (r.allowVararg = !0, o.push(Ae(r))) : P("<name> or '...'", x);
                J(")");
                break;
            } var i = de(r); return r.popScope(), J("end"), n.scope && Z(), t = t || !1, g(h.functionStatement(e, o, t, i)); }
        function ye(e) { for (var t, n, r = [];;) {
            if (ce(), l === x.type && H("["))
                t = xe(e), J("]"), J("="), n = xe(e), r.push(g(h.tableKey(t, n)));
            else if (8 === x.type)
                "=" === C.value ? (t = ve(), $(), n = xe(e), r.push(g(h.tableKeyString(t, n)))) : (n = xe(e), r.push(g(h.tableValue(n))));
            else {
                if (null == (n = be(e))) {
                    ae.pop();
                    break;
                }
                r.push(g(h.tableValue(n)));
            }
            if (!(",;".indexOf(x.value) >= 0))
                break;
            $();
        } return J("}"), g(h.tableConstructorExpression(r)); }
        function be(e) { return Ce(0, e); }
        function xe(e) { var t = be(e); if (null != t)
            return t; P("<expression>", x); }
        function Se(e) { var t = e.charCodeAt(0), n = e.length; if (1 === n)
            switch (t) {
                case 94: return 12;
                case 42:
                case 47:
                case 37: return 10;
                case 43:
                case 45: return 9;
                case 38: return 6;
                case 126: return 5;
                case 124: return 4;
                case 60:
                case 62: return 3;
            }
        else if (2 === n)
            switch (t) {
                case 47: return 10;
                case 46: return 8;
                case 60:
                case 62: return "<<" === e || ">>" === e ? 7 : 3;
                case 61:
                case 126: return 3;
                case 111: return 1;
            }
        else if (97 === t && "and" === e)
            return 2; return 0; }
        function Ce(e, t) { var r, o, a, i = x.value; if (oe && (o = ie()), function (e) { return l === e.type ? "#-~".indexOf(e.value) >= 0 : 4 === e.type && "not" === e.value; }(x)) {
            ce(), $();
            var s = Ce(10, t);
            null == s && P("<expression>", x), r = g(h.unaryExpression(i, s));
        } if (null == r && null == (r = Ae(t)) && (r = function (e) { var t, r, o; if (oe && (o = ie()), 8 === x.type)
            r = x.value, t = ve(), n.scope && ne(t, re(r));
        else {
            if (!H("("))
                return null;
            t = xe(e), J(")");
        } for (;;) {
            var a = we(t, o, e);
            if (null === a)
                break;
            t = a;
        } return t; }(t)), null == r)
            return null; for (; i = x.value, !(0 === (a = l === x.type || 4 === x.type ? Se(i) : 0) || a <= e);) {
            "^" !== i && ".." !== i || --a, $();
            var c = Ce(a, t);
            null == c && P("<expression>", x), oe && ae.push(o), r = g(h.binaryExpression(i, r, c));
        } return r; }
        function we(e, t, n) { var r, o; if (l === x.type)
            switch (x.value) {
                case "[": return ue(t), $(), r = xe(n), J("]"), g(h.indexExpression(e, r));
                case ".": return ue(t), $(), o = ve(), g(h.memberExpression(e, ".", o));
                case ":": return ue(t), $(), o = ve(), e = g(h.memberExpression(e, ":", o)), ue(t), Oe(e, n);
                case "(":
                case "{": return ue(t), Oe(e, n);
            }
        else if (2 === x.type)
            return ue(t), Oe(e, n); return null; }
        function Oe(e, t) { if (l === x.type)
            switch (x.value) {
                case "(":
                    o.emptyStatement || x.line !== S.line && T(null, d.ambiguousSyntax, x.value), $();
                    var n = [], r = be(t);
                    for (null != r && n.push(r); H(",");)
                        r = xe(t), n.push(r);
                    return J(")"), g(h.callExpression(e, n));
                case "{":
                    ce(), $();
                    var a = ye(t);
                    return g(h.tableCallExpression(e, a));
            }
        else if (2 === x.type)
            return g(h.stringCallExpression(e, Ae(t))); P("function arguments", x); }
        function Ae(e) { var r, o = x.value, a = x.type; if (oe && (r = ie()), a !== f || e.allowVararg || T(x, d.cannotUseVararg, x.value), 466 & a) {
            ue(r);
            var i = t.slice(x.range[0], x.range[1]);
            return $(), g(h.literal(a, o, i));
        } return 4 === a && "function" === o ? (ue(r), $(), n.scope && Y(), me(null)) : H("{") ? (ue(r), ye(e)) : void 0; }
        se.prototype.complete = function () { n.locations && (this.loc.end.line = S.lastLine || S.line, this.loc.end.column = S.range[1] - (S.lastLineStart || S.lineStart)), n.ranges && (this.range[1] = S.range[1]); }, se.prototype.bless = function (e) { if (this.loc) {
            var t = this.loc;
            e.loc = { start: { line: t.start.line, column: t.start.column }, end: { line: t.end.line, column: t.end.column } };
        } this.range && (e.range = [this.range[0], this.range[1]]); }, le.prototype.isInLoop = function () { for (var e = this.scopes.length; e-- > 0;)
            if (this.scopes[e].isLoop)
                return !0; return !1; }, le.prototype.pushScope = function (e) { var t = { labels: {}, locals: [], deferredGotos: [], isLoop: !!e }; this.scopes.push(t); }, le.prototype.popScope = function () { for (var e = 0; e < this.pendingGotos.length; ++e) {
            var t = this.pendingGotos[e];
            t.maxDepth >= this.scopes.length && --t.maxDepth <= 0 && T(t.token, d.labelNotVisible, t.target);
        } this.scopes.pop(); }, le.prototype.addGoto = function (e, t) { for (var n = [], r = 0; r < this.scopes.length; ++r) {
            var o = this.scopes[r];
            if (n.push(o.locals.length), Object.prototype.hasOwnProperty.call(o.labels, e))
                return;
        } this.pendingGotos.push({ maxDepth: this.scopes.length, target: e, token: t, localCounts: n }); }, le.prototype.addLabel = function (e, t) { var n = this.currentScope(); if (Object.prototype.hasOwnProperty.call(n.labels, e))
            T(t, d.labelAlreadyDefined, e, n.labels[e].line);
        else {
            for (var r = [], o = 0; o < this.pendingGotos.length; ++o) {
                var a = this.pendingGotos[o];
                a.maxDepth >= this.scopes.length && a.target === e ? a.localCounts[this.scopes.length - 1] < n.locals.length && n.deferredGotos.push(a) : r.push(a);
            }
            this.pendingGotos = r;
        } n.labels[e] = { localCount: n.locals.length, line: t.line }; }, le.prototype.addLocal = function (e, t) { this.currentScope().locals.push({ name: e, token: t }); }, le.prototype.currentScope = function () { return this.scopes[this.scopes.length - 1]; }, le.prototype.raiseDeferredErrors = function () { for (var e = this.currentScope(), t = e.deferredGotos, n = 0; n < t.length; ++n) {
            var r = t[n];
            T(r.token, d.gotoJumpInLocalScope, r.target, e.locals[r.localCounts[this.scopes.length - 1]].name);
        } }, pe.prototype.isInLoop = function () { return !!this.loopLevels.length; }, pe.prototype.pushScope = function (e) { ++this.level, e && this.loopLevels.push(this.level); }, pe.prototype.popScope = function () { var e = this.loopLevels, t = e.length; t && e[t - 1] === this.level && e.pop(), --this.level; }, pe.prototype.addGoto = pe.prototype.addLabel = function () { throw new Error("This should never happen"); }, pe.prototype.addLocal = pe.prototype.raiseDeferredErrors = function () { }, e.parse = function (s, c) { if (void 0 === c && "object" == typeof s && (c = s, s = void 0), c || (c = {}), t = s || "", n = j({}, i, c), b = 0, A = 1, E = 0, r = t.length, L = [[]], k = 0, _ = [], ae = [], !Object.prototype.hasOwnProperty.call(Ee, n.luaVersion))
            throw new Error(y("Lua version '%1' not supported", n.luaVersion)); if (o = j({}, Ee[n.luaVersion]), void 0 !== n.extendedIdentifiers && (o.extendedIdentifiers = !!n.extendedIdentifiers), !Object.prototype.hasOwnProperty.call(u, n.encodingMode))
            throw new Error(y("Encoding mode '%1' not supported", n.encodingMode)); return a = u[n.encodingMode], n.comments && (w = []), n.wait ? e : ke(); };
        var Ee = { 5.1: {}, 5.2: { labels: !0, emptyStatement: !0, hexEscapes: !0, skipWhitespaceEscape: !0, strictEscapes: !0, relaxedBreak: !0 }, 5.3: { labels: !0, emptyStatement: !0, hexEscapes: !0, skipWhitespaceEscape: !0, strictEscapes: !0, unicodeEscapes: !0, bitwiseOperators: !0, integerDivision: !0, relaxedBreak: !0 }, LuaJIT: { labels: !0, contextualGoto: !0, hexEscapes: !0, skipWhitespaceEscape: !0, strictEscapes: !0, unicodeEscapes: !0, imaginaryNumbers: !0, integerSuffixes: !0 } };
        function Le(n) { return t += String(n), r = t.length, e; }
        function ke(e) { void 0 !== e && Le(e), t && "#!" === t.substr(0, 2) && (t = t.replace(/^.*/, (function (e) { return e.replace(/./g, " "); }))), r = t.length, oe = n.locations || n.ranges, C = M(); var o = function () { $(), ce(), n.scope && Y(); var e = fe(); e.allowVararg = !0, e.pushScope(); var t = de(e); return e.popScope(), n.scope && Z(), 1 !== x.type && N(x), oe && !t.length && (S = x), g(h.chunk(t)); }(); if (n.comments && (o.comments = w), n.scope && (o.globals = _), ae.length > 0)
            throw new Error("Location tracking failed. This is most likely a bug in luaparse"); return o; }
        e.write = Le, e.end = ke;
    })); }, 3401: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.BaseService = void 0;
        const r = n(6508), o = n(4881);
        t.BaseService = class {
            mode;
            documents = {};
            options = {};
            globalOptions = {};
            constructor(e) { this.mode = e; }
            addDocument(e) { this.documents[e.uri] = o.TextDocument.create(e.uri, e.languageId, e.version, e.text); }
            getDocument(e) { return this.documents[e]; }
            removeDocument(e) { delete this.documents[e.uri], this.options[e.uri] && delete this.options[e.uri]; }
            getDocumentValue(e) { return this.getDocument(e).getText(); }
            setValue(e, t) { let n = this.getDocument(e.uri); n && (n = o.TextDocument.create(n.uri, n.languageId, n.version, t), this.documents[n.uri] = n); }
            setGlobalOptions(e) { this.globalOptions = e ?? {}; }
            setOptions(e, t, n = !1) { this.options[e] = n ? (0, r.mergeObjects)(t, this.options[e]) : t; }
            getOption(e, t) { return this.options[e] && this.options[e][t] ? this.options[e][t] : this.globalOptions[t]; }
            applyDeltas(e, t) { let n = this.getDocument(e.uri); n && o.TextDocument.update(n, t, e.version); }
            async doComplete(e, t) { return null; }
            async doHover(e, t) { return null; }
            async doResolve(e) { return null; }
            async doValidation(e) { return []; }
            format(e, t, n) { return []; }
            async provideSignatureHelp(e, t) { return null; }
            async findDocumentHighlights(e, t) { return []; }
        };
    }, 6086: function (e, t, n) {
        "use strict";
        var r = this && this.__createBinding || (Object.create ? function (e, t, n, r) { void 0 === r && (r = n); var o = Object.getOwnPropertyDescriptor(t, n); o && !("get" in o ? !t.__esModule : o.writable || o.configurable) || (o = { enumerable: !0, get: function () { return t[n]; } }), Object.defineProperty(e, r, o); } : function (e, t, n, r) { void 0 === r && (r = n), e[r] = t[n]; }), o = this && this.__setModuleDefault || (Object.create ? function (e, t) { Object.defineProperty(e, "default", { enumerable: !0, value: t }); } : function (e, t) { e.default = t; }), a = this && this.__importStar || function (e) { if (e && e.__esModule)
            return e; var t = {}; if (null != e)
            for (var n in e)
                "default" !== n && Object.prototype.hasOwnProperty.call(e, n) && r(t, e, n); return o(t, e), t; };
        Object.defineProperty(t, "__esModule", { value: !0 }), t.LuaService = void 0;
        const i = n(3401), s = a(n(7438));
        class c extends i.BaseService {
            $service;
            constructor(e) { super(e), this.$service = s; }
            async doValidation(e) { let t = this.getDocumentValue(e.uri); if (!t)
                return []; let n = []; try {
                this.$service.parse(t);
            }
            catch (e) {
                e instanceof this.$service.SyntaxError && n.push({ range: { start: { line: e.line - 1, character: e.column }, end: { line: e.line - 1, character: e.column } }, message: e.message, severity: 1 });
            } return n; }
        }
        t.LuaService = c;
    }, 6508: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.mergeObjects = void 0, t.mergeObjects = function e(t, n) { if (!t)
            return n; if (!n)
            return t; const r = {}; for (const o of [...Object.keys(t), ...Object.keys(n)])
            t[o] && n[o] ? Array.isArray(t[o]) ? r[o] = t[o].concat(n[o]) : r[o] = e(t[o], n[o]) : r[o] = t[o] ?? n[o]; return r; };
    }, 4881: (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { TextDocument: () => r });
        var r, o = function (e, t, n) { if (n || 2 === arguments.length)
            for (var r, o = 0, a = t.length; o < a; o++)
                !r && o in t || (r || (r = Array.prototype.slice.call(t, 0, o)), r[o] = t[o]); return e.concat(r || Array.prototype.slice.call(t)); }, a = function () { function e(e, t, n, r) { this._uri = e, this._languageId = t, this._version = n, this._content = r, this._lineOffsets = void 0; } return Object.defineProperty(e.prototype, "uri", { get: function () { return this._uri; }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "languageId", { get: function () { return this._languageId; }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "version", { get: function () { return this._version; }, enumerable: !1, configurable: !0 }), e.prototype.getText = function (e) { if (e) {
            var t = this.offsetAt(e.start), n = this.offsetAt(e.end);
            return this._content.substring(t, n);
        } return this._content; }, e.prototype.update = function (t, n) { for (var r = 0, a = t; r < a.length; r++) {
            var i = a[r];
            if (e.isIncremental(i)) {
                var u = c(i.range), l = this.offsetAt(u.start), p = this.offsetAt(u.end);
                this._content = this._content.substring(0, l) + i.text + this._content.substring(p, this._content.length);
                var f = Math.max(u.start.line, 0), d = Math.max(u.end.line, 0), h = this._lineOffsets, g = s(i.text, !1, l);
                if (d - f === g.length)
                    for (var v = 0, m = g.length; v < m; v++)
                        h[v + f + 1] = g[v];
                else
                    g.length < 1e4 ? h.splice.apply(h, o([f + 1, d - f], g, !1)) : this._lineOffsets = h = h.slice(0, f + 1).concat(g, h.slice(d + 1));
                var y = i.text.length - (p - l);
                if (0 !== y)
                    for (v = f + 1 + g.length, m = h.length; v < m; v++)
                        h[v] = h[v] + y;
            }
            else {
                if (!e.isFull(i))
                    throw new Error("Unknown change event received");
                this._content = i.text, this._lineOffsets = void 0;
            }
        } this._version = n; }, e.prototype.getLineOffsets = function () { return void 0 === this._lineOffsets && (this._lineOffsets = s(this._content, !0)), this._lineOffsets; }, e.prototype.positionAt = function (e) { e = Math.max(Math.min(e, this._content.length), 0); var t = this.getLineOffsets(), n = 0, r = t.length; if (0 === r)
            return { line: 0, character: e }; for (; n < r;) {
            var o = Math.floor((n + r) / 2);
            t[o] > e ? r = o : n = o + 1;
        } var a = n - 1; return { line: a, character: e - t[a] }; }, e.prototype.offsetAt = function (e) { var t = this.getLineOffsets(); if (e.line >= t.length)
            return this._content.length; if (e.line < 0)
            return 0; var n = t[e.line], r = e.line + 1 < t.length ? t[e.line + 1] : this._content.length; return Math.max(Math.min(n + e.character, r), n); }, Object.defineProperty(e.prototype, "lineCount", { get: function () { return this.getLineOffsets().length; }, enumerable: !1, configurable: !0 }), e.isIncremental = function (e) { var t = e; return null != t && "string" == typeof t.text && void 0 !== t.range && (void 0 === t.rangeLength || "number" == typeof t.rangeLength); }, e.isFull = function (e) { var t = e; return null != t && "string" == typeof t.text && void 0 === t.range && void 0 === t.rangeLength; }, e; }();
        function i(e, t) { if (e.length <= 1)
            return e; var n = e.length / 2 | 0, r = e.slice(0, n), o = e.slice(n); i(r, t), i(o, t); for (var a = 0, s = 0, c = 0; a < r.length && s < o.length;) {
            var u = t(r[a], o[s]);
            e[c++] = u <= 0 ? r[a++] : o[s++];
        } for (; a < r.length;)
            e[c++] = r[a++]; for (; s < o.length;)
            e[c++] = o[s++]; return e; }
        function s(e, t, n) { void 0 === n && (n = 0); for (var r = t ? [n] : [], o = 0; o < e.length; o++) {
            var a = e.charCodeAt(o);
            13 !== a && 10 !== a || (13 === a && o + 1 < e.length && 10 === e.charCodeAt(o + 1) && o++, r.push(n + o + 1));
        } return r; }
        function c(e) { var t = e.start, n = e.end; return t.line > n.line || t.line === n.line && t.character > n.character ? { start: n, end: t } : e; }
        function u(e) { var t = c(e.range); return t !== e.range ? { newText: e.newText, range: t } : e; }
        !function (e) { e.create = function (e, t, n, r) { return new a(e, t, n, r); }, e.update = function (e, t, n) { if (e instanceof a)
            return e.update(t, n), e; throw new Error("TextDocument.update: document must be created by TextDocument.create"); }, e.applyEdits = function (e, t) { for (var n = e.getText(), r = 0, o = [], a = 0, s = i(t.map(u), (function (e, t) { var n = e.range.start.line - t.range.start.line; return 0 === n ? e.range.start.character - t.range.start.character : n; })); a < s.length; a++) {
            var c = s[a], l = e.offsetAt(c.range.start);
            if (l < r)
                throw new Error("Overlapping edit");
            l > r && o.push(n.substring(r, l)), c.newText.length && o.push(c.newText), r = e.offsetAt(c.range.end);
        } return o.push(n.substr(r)), o.join(""); }; }(r || (r = {}));
    } }, t = {}; function n(r) { var o = t[r]; if (void 0 !== o)
    return o.exports; var a = t[r] = { id: r, loaded: !1, exports: {} }; return e[r].call(a.exports, a, a.exports, n), a.loaded = !0, a.exports; } return n.d = (e, t) => { for (var r in t)
    n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] }); }, n.g = function () { if ("object" == typeof globalThis)
    return globalThis; try {
    return this || new Function("return this")();
}
catch (e) {
    if ("object" == typeof window)
        return window;
} }(), n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), n.r = e => { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }); }, n.nmd = e => (e.paths = [], e.children || (e.children = []), e), n(6086); })()));



/***/ })

}]);
//# sourceMappingURL=bundle.922.js.map