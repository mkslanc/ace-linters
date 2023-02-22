(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[25],{

/***/ 6025:
/***/ ((module) => {

/*! For license information please see json-service.js.LICENSE.txt */
!function (e, t) { if (true)
    module.exports = t();
else { var n, r; } }(self, (() => (() => { var e = { 1696: (e, t, r) => {
        "use strict";
        var n = r(4406), o = r(3716);
        function i(e) { return i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e; } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e; }, i(e); }
        var a, s, c = r(7515).codes, u = c.ERR_AMBIGUOUS_ARGUMENT, l = c.ERR_INVALID_ARG_TYPE, f = c.ERR_INVALID_ARG_VALUE, p = c.ERR_INVALID_RETURN_VALUE, h = c.ERR_MISSING_ARGS, d = r(4082), g = r(3335).inspect, m = r(3335).types, y = m.isPromise, v = m.isRegExp, b = Object.assign ? Object.assign : r(4956).assign, x = Object.is ? Object.is : r(4679);
        function S() { var e = r(6796); a = e.isDeepEqual, s = e.isDeepStrictEqual; }
        new Map;
        var A = !1, w = e.exports = j, O = {};
        function k(e) { if (e.message instanceof Error)
            throw e.message; throw new d(e); }
        function E(e, t, r, n) { if (!r) {
            var o = !1;
            if (0 === t)
                o = !0, n = "No value argument passed to `assert.ok()`";
            else if (n instanceof Error)
                throw n;
            var i = new d({ actual: r, expected: !0, message: n, operator: "==", stackStartFn: e });
            throw i.generatedMessage = o, i;
        } }
        function j() { for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
            t[r] = arguments[r]; E.apply(void 0, [j, t.length].concat(t)); }
        w.fail = function e(t, r, i, a, s) { var c, u = arguments.length; if (0 === u)
            c = "Failed";
        else if (1 === u)
            i = t, t = void 0;
        else {
            if (!1 === A) {
                A = !0;
                var l = n.emitWarning ? n.emitWarning : o.warn.bind(o);
                l("assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.", "DeprecationWarning", "DEP0094");
            }
            2 === u && (a = "!=");
        } if (i instanceof Error)
            throw i; var f = { actual: t, expected: r, operator: void 0 === a ? "fail" : a, stackStartFn: s || e }; void 0 !== i && (f.message = i); var p = new d(f); throw c && (p.message = c, p.generatedMessage = !0), p; }, w.AssertionError = d, w.ok = j, w.equal = function e(t, r, n) { if (arguments.length < 2)
            throw new h("actual", "expected"); t != r && k({ actual: t, expected: r, message: n, operator: "==", stackStartFn: e }); }, w.notEqual = function e(t, r, n) { if (arguments.length < 2)
            throw new h("actual", "expected"); t == r && k({ actual: t, expected: r, message: n, operator: "!=", stackStartFn: e }); }, w.deepEqual = function e(t, r, n) { if (arguments.length < 2)
            throw new h("actual", "expected"); void 0 === a && S(), a(t, r) || k({ actual: t, expected: r, message: n, operator: "deepEqual", stackStartFn: e }); }, w.notDeepEqual = function e(t, r, n) { if (arguments.length < 2)
            throw new h("actual", "expected"); void 0 === a && S(), a(t, r) && k({ actual: t, expected: r, message: n, operator: "notDeepEqual", stackStartFn: e }); }, w.deepStrictEqual = function e(t, r, n) { if (arguments.length < 2)
            throw new h("actual", "expected"); void 0 === a && S(), s(t, r) || k({ actual: t, expected: r, message: n, operator: "deepStrictEqual", stackStartFn: e }); }, w.notDeepStrictEqual = function e(t, r, n) { if (arguments.length < 2)
            throw new h("actual", "expected"); void 0 === a && S(), s(t, r) && k({ actual: t, expected: r, message: n, operator: "notDeepStrictEqual", stackStartFn: e }); }, w.strictEqual = function e(t, r, n) { if (arguments.length < 2)
            throw new h("actual", "expected"); x(t, r) || k({ actual: t, expected: r, message: n, operator: "strictEqual", stackStartFn: e }); }, w.notStrictEqual = function e(t, r, n) { if (arguments.length < 2)
            throw new h("actual", "expected"); x(t, r) && k({ actual: t, expected: r, message: n, operator: "notStrictEqual", stackStartFn: e }); };
        var T = function e(t, r, n) { var o = this; !function (e, t) { if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function"); }(this, e), r.forEach((function (e) { e in t && (void 0 !== n && "string" == typeof n[e] && v(t[e]) && t[e].test(n[e]) ? o[e] = n[e] : o[e] = t[e]); })); };
        function C(e, t, r, n, o, i) { if (!(r in e) || !s(e[r], t[r])) {
            if (!n) {
                var a = new T(e, o), c = new T(t, o, e), u = new d({ actual: a, expected: c, operator: "deepStrictEqual", stackStartFn: i });
                throw u.actual = e, u.expected = t, u.operator = i.name, u;
            }
            k({ actual: e, expected: t, message: n, operator: i.name, stackStartFn: i });
        } }
        function P(e, t, r, n) { if ("function" != typeof t) {
            if (v(t))
                return t.test(e);
            if (2 === arguments.length)
                throw new l("expected", ["Function", "RegExp"], t);
            if ("object" !== i(e) || null === e) {
                var o = new d({ actual: e, expected: t, message: r, operator: "deepStrictEqual", stackStartFn: n });
                throw o.operator = n.name, o;
            }
            var s = Object.keys(t);
            if (t instanceof Error)
                s.push("name", "message");
            else if (0 === s.length)
                throw new f("error", t, "may not be an empty object");
            return void 0 === a && S(), s.forEach((function (o) { "string" == typeof e[o] && v(t[o]) && t[o].test(e[o]) || C(e, t, o, r, s, n); })), !0;
        } return void 0 !== t.prototype && e instanceof t || !Error.isPrototypeOf(t) && !0 === t.call({}, e); }
        function I(e) { if ("function" != typeof e)
            throw new l("fn", "Function", e); try {
            e();
        }
        catch (e) {
            return e;
        } return O; }
        function M(e) { return y(e) || null !== e && "object" === i(e) && "function" == typeof e.then && "function" == typeof e.catch; }
        function N(e) { return Promise.resolve().then((function () { var t; if ("function" == typeof e) {
            if (!M(t = e()))
                throw new p("instance of Promise", "promiseFn", t);
        }
        else {
            if (!M(e))
                throw new l("promiseFn", ["Function", "Promise"], e);
            t = e;
        } return Promise.resolve().then((function () { return t; })).then((function () { return O; })).catch((function (e) { return e; })); })); }
        function F(e, t, r, n) { if ("string" == typeof r) {
            if (4 === arguments.length)
                throw new l("error", ["Object", "Error", "Function", "RegExp"], r);
            if ("object" === i(t) && null !== t) {
                if (t.message === r)
                    throw new u("error/message", 'The error message "'.concat(t.message, '" is identical to the message.'));
            }
            else if (t === r)
                throw new u("error/message", 'The error "'.concat(t, '" is identical to the message.'));
            n = r, r = void 0;
        }
        else if (null != r && "object" !== i(r) && "function" != typeof r)
            throw new l("error", ["Object", "Error", "Function", "RegExp"], r); if (t === O) {
            var o = "";
            r && r.name && (o += " (".concat(r.name, ")")), o += n ? ": ".concat(n) : ".";
            var a = "rejects" === e.name ? "rejection" : "exception";
            k({ actual: void 0, expected: r, operator: e.name, message: "Missing expected ".concat(a).concat(o), stackStartFn: e });
        } if (r && !P(t, r, n, e))
            throw t; }
        function _(e, t, r, n) { if (t !== O) {
            if ("string" == typeof r && (n = r, r = void 0), !r || P(t, r)) {
                var o = n ? ": ".concat(n) : ".", i = "doesNotReject" === e.name ? "rejection" : "exception";
                k({ actual: t, expected: r, operator: e.name, message: "Got unwanted ".concat(i).concat(o, "\n") + 'Actual message: "'.concat(t && t.message, '"'), stackStartFn: e });
            }
            throw t;
        } }
        function R() { for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
            t[r] = arguments[r]; E.apply(void 0, [R, t.length].concat(t)); }
        w.throws = function e(t) { for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
            n[o - 1] = arguments[o]; F.apply(void 0, [e, I(t)].concat(n)); }, w.rejects = function e(t) { for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
            n[o - 1] = arguments[o]; return N(t).then((function (t) { return F.apply(void 0, [e, t].concat(n)); })); }, w.doesNotThrow = function e(t) { for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
            n[o - 1] = arguments[o]; _.apply(void 0, [e, I(t)].concat(n)); }, w.doesNotReject = function e(t) { for (var r = arguments.length, n = new Array(r > 1 ? r - 1 : 0), o = 1; o < r; o++)
            n[o - 1] = arguments[o]; return N(t).then((function (t) { return _.apply(void 0, [e, t].concat(n)); })); }, w.ifError = function e(t) { if (null != t) {
            var r = "ifError got unwanted exception: ";
            "object" === i(t) && "string" == typeof t.message ? 0 === t.message.length && t.constructor ? r += t.constructor.name : r += t.message : r += g(t);
            var n = new d({ actual: t, expected: null, operator: "ifError", message: r, stackStartFn: e }), o = t.stack;
            if ("string" == typeof o) {
                var a = o.split("\n");
                a.shift();
                for (var s = n.stack.split("\n"), c = 0; c < a.length; c++) {
                    var u = s.indexOf(a[c]);
                    if (-1 !== u) {
                        s = s.slice(0, u);
                        break;
                    }
                }
                n.stack = "".concat(s.join("\n"), "\n").concat(a.join("\n"));
            }
            throw n;
        } }, w.strict = b(R, w, { equal: w.strictEqual, deepEqual: w.deepStrictEqual, notEqual: w.notStrictEqual, notDeepEqual: w.notDeepStrictEqual }), w.strict.strict = w.strict;
    }, 4082: (e, t, r) => {
        "use strict";
        var n = r(4406);
        function o(e, t, r) { return t in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e; }
        function i(e, t) { for (var r = 0; r < t.length; r++) {
            var n = t[r];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
        } }
        function a(e, t) { return !t || "object" !== h(t) && "function" != typeof t ? s(e) : t; }
        function s(e) { if (void 0 === e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
        function c(e) { var t = "function" == typeof Map ? new Map : void 0; return c = function (e) { if (null === e || (r = e, -1 === Function.toString.call(r).indexOf("[native code]")))
            return e; var r; if ("function" != typeof e)
            throw new TypeError("Super expression must either be null or a function"); if (void 0 !== t) {
            if (t.has(e))
                return t.get(e);
            t.set(e, n);
        } function n() { return l(e, arguments, p(this).constructor); } return n.prototype = Object.create(e.prototype, { constructor: { value: n, enumerable: !1, writable: !0, configurable: !0 } }), f(n, e); }, c(e); }
        function u() { if ("undefined" == typeof Reflect || !Reflect.construct)
            return !1; if (Reflect.construct.sham)
            return !1; if ("function" == typeof Proxy)
            return !0; try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], (function () { }))), !0;
        }
        catch (e) {
            return !1;
        } }
        function l(e, t, r) { return l = u() ? Reflect.construct : function (e, t, r) { var n = [null]; n.push.apply(n, t); var o = new (Function.bind.apply(e, n)); return r && f(o, r.prototype), o; }, l.apply(null, arguments); }
        function f(e, t) { return f = Object.setPrototypeOf || function (e, t) { return e.__proto__ = t, e; }, f(e, t); }
        function p(e) { return p = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) { return e.__proto__ || Object.getPrototypeOf(e); }, p(e); }
        function h(e) { return h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e; } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e; }, h(e); }
        var d = r(3335).inspect, g = r(7515).codes.ERR_INVALID_ARG_TYPE;
        function m(e, t, r) { return (void 0 === r || r > e.length) && (r = e.length), e.substring(r - t.length, r) === t; }
        var y = "", v = "", b = "", x = "", S = { deepStrictEqual: "Expected values to be strictly deep-equal:", strictEqual: "Expected values to be strictly equal:", strictEqualObject: 'Expected "actual" to be reference-equal to "expected":', deepEqual: "Expected values to be loosely deep-equal:", equal: "Expected values to be loosely equal:", notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:', notStrictEqual: 'Expected "actual" to be strictly unequal to:', notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":', notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:', notEqual: 'Expected "actual" to be loosely unequal to:', notIdentical: "Values identical but not reference-equal:" };
        function A(e) { var t = Object.keys(e), r = Object.create(Object.getPrototypeOf(e)); return t.forEach((function (t) { r[t] = e[t]; })), Object.defineProperty(r, "message", { value: e.message }), r; }
        function w(e) { return d(e, { compact: !1, customInspect: !1, depth: 1e3, maxArrayLength: 1 / 0, showHidden: !1, breakLength: 1 / 0, showProxy: !1, sorted: !0, getters: !0 }); }
        var O = function (e) { function t(e) { var r; if (function (e, t) { if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function"); }(this, t), "object" !== h(e) || null === e)
            throw new g("options", "Object", e); var o = e.message, i = e.operator, c = e.stackStartFn, u = e.actual, l = e.expected, f = Error.stackTraceLimit; if (Error.stackTraceLimit = 0, null != o)
            r = a(this, p(t).call(this, String(o)));
        else if (n.stderr && n.stderr.isTTY && (n.stderr && n.stderr.getColorDepth && 1 !== n.stderr.getColorDepth() ? (y = "[34m", v = "[32m", x = "[39m", b = "[31m") : (y = "", v = "", x = "", b = "")), "object" === h(u) && null !== u && "object" === h(l) && null !== l && "stack" in u && u instanceof Error && "stack" in l && l instanceof Error && (u = A(u), l = A(l)), "deepStrictEqual" === i || "strictEqual" === i)
            r = a(this, p(t).call(this, function (e, t, r) { var o = "", i = "", a = 0, s = "", c = !1, u = w(e), l = u.split("\n"), f = w(t).split("\n"), p = 0, d = ""; if ("strictEqual" === r && "object" === h(e) && "object" === h(t) && null !== e && null !== t && (r = "strictEqualObject"), 1 === l.length && 1 === f.length && l[0] !== f[0]) {
                var g = l[0].length + f[0].length;
                if (g <= 10) {
                    if (!("object" === h(e) && null !== e || "object" === h(t) && null !== t || 0 === e && 0 === t))
                        return "".concat(S[r], "\n\n") + "".concat(l[0], " !== ").concat(f[0], "\n");
                }
                else if ("strictEqualObject" !== r && g < (n.stderr && n.stderr.isTTY ? n.stderr.columns : 80)) {
                    for (; l[0][p] === f[0][p];)
                        p++;
                    p > 2 && (d = "\n  ".concat(function (e, t) { if (t = Math.floor(t), 0 == e.length || 0 == t)
                        return ""; var r = e.length * t; for (t = Math.floor(Math.log(t) / Math.log(2)); t;)
                        e += e, t--; return e + e.substring(0, r - e.length); }(" ", p), "^"), p = 0);
                }
            } for (var A = l[l.length - 1], O = f[f.length - 1]; A === O && (p++ < 2 ? s = "\n  ".concat(A).concat(s) : o = A, l.pop(), f.pop(), 0 !== l.length && 0 !== f.length);)
                A = l[l.length - 1], O = f[f.length - 1]; var k = Math.max(l.length, f.length); if (0 === k) {
                var E = u.split("\n");
                if (E.length > 30)
                    for (E[26] = "".concat(y, "...").concat(x); E.length > 27;)
                        E.pop();
                return "".concat(S.notIdentical, "\n\n").concat(E.join("\n"), "\n");
            } p > 3 && (s = "\n".concat(y, "...").concat(x).concat(s), c = !0), "" !== o && (s = "\n  ".concat(o).concat(s), o = ""); var j = 0, T = S[r] + "\n".concat(v, "+ actual").concat(x, " ").concat(b, "- expected").concat(x), C = " ".concat(y, "...").concat(x, " Lines skipped"); for (p = 0; p < k; p++) {
                var P = p - a;
                if (l.length < p + 1)
                    P > 1 && p > 2 && (P > 4 ? (i += "\n".concat(y, "...").concat(x), c = !0) : P > 3 && (i += "\n  ".concat(f[p - 2]), j++), i += "\n  ".concat(f[p - 1]), j++), a = p, o += "\n".concat(b, "-").concat(x, " ").concat(f[p]), j++;
                else if (f.length < p + 1)
                    P > 1 && p > 2 && (P > 4 ? (i += "\n".concat(y, "...").concat(x), c = !0) : P > 3 && (i += "\n  ".concat(l[p - 2]), j++), i += "\n  ".concat(l[p - 1]), j++), a = p, i += "\n".concat(v, "+").concat(x, " ").concat(l[p]), j++;
                else {
                    var I = f[p], M = l[p], N = M !== I && (!m(M, ",") || M.slice(0, -1) !== I);
                    N && m(I, ",") && I.slice(0, -1) === M && (N = !1, M += ","), N ? (P > 1 && p > 2 && (P > 4 ? (i += "\n".concat(y, "...").concat(x), c = !0) : P > 3 && (i += "\n  ".concat(l[p - 2]), j++), i += "\n  ".concat(l[p - 1]), j++), a = p, i += "\n".concat(v, "+").concat(x, " ").concat(M), o += "\n".concat(b, "-").concat(x, " ").concat(I), j += 2) : (i += o, o = "", 1 !== P && 0 !== p || (i += "\n  ".concat(M), j++));
                }
                if (j > 20 && p < k - 2)
                    return "".concat(T).concat(C, "\n").concat(i, "\n").concat(y, "...").concat(x).concat(o, "\n") + "".concat(y, "...").concat(x);
            } return "".concat(T).concat(c ? C : "", "\n").concat(i).concat(o).concat(s).concat(d); }(u, l, i)));
        else if ("notDeepStrictEqual" === i || "notStrictEqual" === i) {
            var d = S[i], O = w(u).split("\n");
            if ("notStrictEqual" === i && "object" === h(u) && null !== u && (d = S.notStrictEqualObject), O.length > 30)
                for (O[26] = "".concat(y, "...").concat(x); O.length > 27;)
                    O.pop();
            r = 1 === O.length ? a(this, p(t).call(this, "".concat(d, " ").concat(O[0]))) : a(this, p(t).call(this, "".concat(d, "\n\n").concat(O.join("\n"), "\n")));
        }
        else {
            var k = w(u), E = "", j = S[i];
            "notDeepEqual" === i || "notEqual" === i ? (k = "".concat(S[i], "\n\n").concat(k)).length > 1024 && (k = "".concat(k.slice(0, 1021), "...")) : (E = "".concat(w(l)), k.length > 512 && (k = "".concat(k.slice(0, 509), "...")), E.length > 512 && (E = "".concat(E.slice(0, 509), "...")), "deepEqual" === i || "equal" === i ? k = "".concat(j, "\n\n").concat(k, "\n\nshould equal\n\n") : E = " ".concat(i, " ").concat(E)), r = a(this, p(t).call(this, "".concat(k).concat(E)));
        } return Error.stackTraceLimit = f, r.generatedMessage = !o, Object.defineProperty(s(r), "name", { value: "AssertionError [ERR_ASSERTION]", enumerable: !1, writable: !0, configurable: !0 }), r.code = "ERR_ASSERTION", r.actual = u, r.expected = l, r.operator = i, Error.captureStackTrace && Error.captureStackTrace(s(r), c), r.stack, r.name = "AssertionError", a(r); } var r, c; return function (e, t) { if ("function" != typeof t && null !== t)
            throw new TypeError("Super expression must either be null or a function"); e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), t && f(e, t); }(t, e), r = t, c = [{ key: "toString", value: function () { return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message); } }, { key: d.custom, value: function (e, t) { return d(this, function (e) { for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {}, n = Object.keys(r);
                    "function" == typeof Object.getOwnPropertySymbols && (n = n.concat(Object.getOwnPropertySymbols(r).filter((function (e) { return Object.getOwnPropertyDescriptor(r, e).enumerable; })))), n.forEach((function (t) { o(e, t, r[t]); }));
                } return e; }({}, t, { customInspect: !1, depth: 0 })); } }], c && i(r.prototype, c), t; }(c(Error));
        e.exports = O;
    }, 7515: (e, t, r) => {
        "use strict";
        function n(e) { return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e; } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e; }, n(e); }
        function o(e) { return o = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) { return e.__proto__ || Object.getPrototypeOf(e); }, o(e); }
        function i(e, t) { return i = Object.setPrototypeOf || function (e, t) { return e.__proto__ = t, e; }, i(e, t); }
        var a, s, c = {};
        function u(e, t, r) { r || (r = Error); var a = function (r) { function a(r, i, s) { var c; return function (e, t) { if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function"); }(this, a), c = function (e, t) { return !t || "object" !== n(t) && "function" != typeof t ? function (e) { if (void 0 === e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }(e) : t; }(this, o(a).call(this, function (e, r, n) { return "string" == typeof t ? t : t(e, r, n); }(r, i, s))), c.code = e, c; } return function (e, t) { if ("function" != typeof t && null !== t)
            throw new TypeError("Super expression must either be null or a function"); e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), t && i(e, t); }(a, r), a; }(r); c[e] = a; }
        function l(e, t) { if (Array.isArray(e)) {
            var r = e.length;
            return e = e.map((function (e) { return String(e); })), r > 2 ? "one of ".concat(t, " ").concat(e.slice(0, r - 1).join(", "), ", or ") + e[r - 1] : 2 === r ? "one of ".concat(t, " ").concat(e[0], " or ").concat(e[1]) : "of ".concat(t, " ").concat(e[0]);
        } return "of ".concat(t, " ").concat(String(e)); }
        u("ERR_AMBIGUOUS_ARGUMENT", 'The "%s" argument is ambiguous. %s', TypeError), u("ERR_INVALID_ARG_TYPE", (function (e, t, o) { var i, s, c, u, f; if (void 0 === a && (a = r(1696)), a("string" == typeof e, "'name' must be a string"), "string" == typeof t && (s = "not ", t.substr(0, s.length) === s) ? (i = "must not be", t = t.replace(/^not /, "")) : i = "must be", function (e, t, r) { return (void 0 === r || r > e.length) && (r = e.length), e.substring(r - t.length, r) === t; }(e, " argument"))
            c = "The ".concat(e, " ").concat(i, " ").concat(l(t, "type"));
        else {
            var p = ("number" != typeof f && (f = 0), f + ".".length > (u = e).length || -1 === u.indexOf(".", f) ? "argument" : "property");
            c = 'The "'.concat(e, '" ').concat(p, " ").concat(i, " ").concat(l(t, "type"));
        } return c + ". Received type ".concat(n(o)); }), TypeError), u("ERR_INVALID_ARG_VALUE", (function (e, t) { var n = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "is invalid"; void 0 === s && (s = r(3335)); var o = s.inspect(t); return o.length > 128 && (o = "".concat(o.slice(0, 128), "...")), "The argument '".concat(e, "' ").concat(n, ". Received ").concat(o); }), TypeError, RangeError), u("ERR_INVALID_RETURN_VALUE", (function (e, t, r) { var o; return o = r && r.constructor && r.constructor.name ? "instance of ".concat(r.constructor.name) : "type ".concat(n(r)), "Expected ".concat(e, ' to be returned from the "').concat(t, '"') + " function but got ".concat(o, "."); }), TypeError), u("ERR_MISSING_ARGS", (function () { for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n]; void 0 === a && (a = r(1696)), a(t.length > 0, "At least one arg needs to be specified"); var o = "The ", i = t.length; switch (t = t.map((function (e) { return '"'.concat(e, '"'); })), i) {
            case 1:
                o += "".concat(t[0], " argument");
                break;
            case 2:
                o += "".concat(t[0], " and ").concat(t[1], " arguments");
                break;
            default: o += t.slice(0, i - 1).join(", "), o += ", and ".concat(t[i - 1], " arguments");
        } return "".concat(o, " must be specified"); }), TypeError), e.exports.codes = c;
    }, 6796: (e, t, r) => {
        "use strict";
        function n(e, t) { return function (e) { if (Array.isArray(e))
            return e; }(e) || function (e, t) { var r = [], n = !0, o = !1, i = void 0; try {
            for (var a, s = e[Symbol.iterator](); !(n = (a = s.next()).done) && (r.push(a.value), !t || r.length !== t); n = !0)
                ;
        }
        catch (e) {
            o = !0, i = e;
        }
        finally {
            try {
                n || null == s.return || s.return();
            }
            finally {
                if (o)
                    throw i;
            }
        } return r; }(e, t) || function () { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }(); }
        function o(e) { return o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e; } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e; }, o(e); }
        var i = void 0 !== /a/g.flags, a = function (e) { var t = []; return e.forEach((function (e) { return t.push(e); })), t; }, s = function (e) { var t = []; return e.forEach((function (e, r) { return t.push([r, e]); })), t; }, c = Object.is ? Object.is : r(4679), u = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function () { return []; }, l = Number.isNaN ? Number.isNaN : r(4782);
        function f(e) { return e.call.bind(e); }
        var p = f(Object.prototype.hasOwnProperty), h = f(Object.prototype.propertyIsEnumerable), d = f(Object.prototype.toString), g = r(3335).types, m = g.isAnyArrayBuffer, y = g.isArrayBufferView, v = g.isDate, b = g.isMap, x = g.isRegExp, S = g.isSet, A = g.isNativeError, w = g.isBoxedPrimitive, O = g.isNumberObject, k = g.isStringObject, E = g.isBooleanObject, j = g.isBigIntObject, T = g.isSymbolObject, C = g.isFloat32Array, P = g.isFloat64Array;
        function I(e) { if (0 === e.length || e.length > 10)
            return !0; for (var t = 0; t < e.length; t++) {
            var r = e.charCodeAt(t);
            if (r < 48 || r > 57)
                return !0;
        } return 10 === e.length && e >= Math.pow(2, 32); }
        function M(e) { return Object.keys(e).filter(I).concat(u(e).filter(Object.prototype.propertyIsEnumerable.bind(e))); }
        function N(e, t) { if (e === t)
            return 0; for (var r = e.length, n = t.length, o = 0, i = Math.min(r, n); o < i; ++o)
            if (e[o] !== t[o]) {
                r = e[o], n = t[o];
                break;
            } return r < n ? -1 : n < r ? 1 : 0; }
        function F(e, t, r, n) { if (e === t)
            return 0 !== e || !r || c(e, t); if (r) {
            if ("object" !== o(e))
                return "number" == typeof e && l(e) && l(t);
            if ("object" !== o(t) || null === e || null === t)
                return !1;
            if (Object.getPrototypeOf(e) !== Object.getPrototypeOf(t))
                return !1;
        }
        else {
            if (null === e || "object" !== o(e))
                return (null === t || "object" !== o(t)) && e == t;
            if (null === t || "object" !== o(t))
                return !1;
        } var a, s, u, f, p = d(e); if (p !== d(t))
            return !1; if (Array.isArray(e)) {
            if (e.length !== t.length)
                return !1;
            var h = M(e), g = M(t);
            return h.length === g.length && R(e, t, r, n, 1, h);
        } if ("[object Object]" === p && (!b(e) && b(t) || !S(e) && S(t)))
            return !1; if (v(e)) {
            if (!v(t) || Date.prototype.getTime.call(e) !== Date.prototype.getTime.call(t))
                return !1;
        }
        else if (x(e)) {
            if (!x(t) || (u = e, f = t, !(i ? u.source === f.source && u.flags === f.flags : RegExp.prototype.toString.call(u) === RegExp.prototype.toString.call(f))))
                return !1;
        }
        else if (A(e) || e instanceof Error) {
            if (e.message !== t.message || e.name !== t.name)
                return !1;
        }
        else {
            if (y(e)) {
                if (r || !C(e) && !P(e)) {
                    if (!function (e, t) { return e.byteLength === t.byteLength && 0 === N(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), new Uint8Array(t.buffer, t.byteOffset, t.byteLength)); }(e, t))
                        return !1;
                }
                else if (!function (e, t) { if (e.byteLength !== t.byteLength)
                    return !1; for (var r = 0; r < e.byteLength; r++)
                    if (e[r] !== t[r])
                        return !1; return !0; }(e, t))
                    return !1;
                var I = M(e), F = M(t);
                return I.length === F.length && R(e, t, r, n, 0, I);
            }
            if (S(e))
                return !(!S(t) || e.size !== t.size) && R(e, t, r, n, 2);
            if (b(e))
                return !(!b(t) || e.size !== t.size) && R(e, t, r, n, 3);
            if (m(e)) {
                if (s = t, (a = e).byteLength !== s.byteLength || 0 !== N(new Uint8Array(a), new Uint8Array(s)))
                    return !1;
            }
            else if (w(e) && !function (e, t) { return O(e) ? O(t) && c(Number.prototype.valueOf.call(e), Number.prototype.valueOf.call(t)) : k(e) ? k(t) && String.prototype.valueOf.call(e) === String.prototype.valueOf.call(t) : E(e) ? E(t) && Boolean.prototype.valueOf.call(e) === Boolean.prototype.valueOf.call(t) : j(e) ? j(t) && BigInt.prototype.valueOf.call(e) === BigInt.prototype.valueOf.call(t) : T(t) && Symbol.prototype.valueOf.call(e) === Symbol.prototype.valueOf.call(t); }(e, t))
                return !1;
        } return R(e, t, r, n, 0); }
        function _(e, t) { return t.filter((function (t) { return h(e, t); })); }
        function R(e, t, r, n, o, i) { if (5 === arguments.length) {
            i = Object.keys(e);
            var a = Object.keys(t);
            if (i.length !== a.length)
                return !1;
        } for (var s = 0; s < i.length; s++)
            if (!p(t, i[s]))
                return !1; if (r && 5 === arguments.length) {
            var c = u(e);
            if (0 !== c.length) {
                var l = 0;
                for (s = 0; s < c.length; s++) {
                    var f = c[s];
                    if (h(e, f)) {
                        if (!h(t, f))
                            return !1;
                        i.push(f), l++;
                    }
                    else if (h(t, f))
                        return !1;
                }
                var d = u(t);
                if (c.length !== d.length && _(t, d).length !== l)
                    return !1;
            }
            else {
                var g = u(t);
                if (0 !== g.length && 0 !== _(t, g).length)
                    return !1;
            }
        } if (0 === i.length && (0 === o || 1 === o && 0 === e.length || 0 === e.size))
            return !0; if (void 0 === n)
            n = { val1: new Map, val2: new Map, position: 0 };
        else {
            var m = n.val1.get(e);
            if (void 0 !== m) {
                var y = n.val2.get(t);
                if (void 0 !== y)
                    return m === y;
            }
            n.position++;
        } n.val1.set(e, n.position), n.val2.set(t, n.position); var v = B(e, t, r, i, n, o); return n.val1.delete(e), n.val2.delete(t), v; }
        function L(e, t, r, n) { for (var o = a(e), i = 0; i < o.length; i++) {
            var s = o[i];
            if (F(t, s, r, n))
                return e.delete(s), !0;
        } return !1; }
        function D(e) { switch (o(e)) {
            case "undefined": return null;
            case "object": return;
            case "symbol": return !1;
            case "string": e = +e;
            case "number": if (l(e))
                return !1;
        } return !0; }
        function V(e, t, r) { var n = D(r); return null != n ? n : t.has(n) && !e.has(n); }
        function U(e, t, r, n, o) { var i = D(r); if (null != i)
            return i; var a = t.get(i); return !(void 0 === a && !t.has(i) || !F(n, a, !1, o)) && !e.has(i) && F(n, a, !1, o); }
        function $(e, t, r, n, o, i) { for (var s = a(e), c = 0; c < s.length; c++) {
            var u = s[c];
            if (F(r, u, o, i) && F(n, t.get(u), o, i))
                return e.delete(u), !0;
        } return !1; }
        function B(e, t, r, i, c, u) { var l = 0; if (2 === u) {
            if (!function (e, t, r, n) { for (var i = null, s = a(e), c = 0; c < s.length; c++) {
                var u = s[c];
                if ("object" === o(u) && null !== u)
                    null === i && (i = new Set), i.add(u);
                else if (!t.has(u)) {
                    if (r)
                        return !1;
                    if (!V(e, t, u))
                        return !1;
                    null === i && (i = new Set), i.add(u);
                }
            } if (null !== i) {
                for (var l = a(t), f = 0; f < l.length; f++) {
                    var p = l[f];
                    if ("object" === o(p) && null !== p) {
                        if (!L(i, p, r, n))
                            return !1;
                    }
                    else if (!r && !e.has(p) && !L(i, p, r, n))
                        return !1;
                }
                return 0 === i.size;
            } return !0; }(e, t, r, c))
                return !1;
        }
        else if (3 === u) {
            if (!function (e, t, r, i) { for (var a = null, c = s(e), u = 0; u < c.length; u++) {
                var l = n(c[u], 2), f = l[0], p = l[1];
                if ("object" === o(f) && null !== f)
                    null === a && (a = new Set), a.add(f);
                else {
                    var h = t.get(f);
                    if (void 0 === h && !t.has(f) || !F(p, h, r, i)) {
                        if (r)
                            return !1;
                        if (!U(e, t, f, p, i))
                            return !1;
                        null === a && (a = new Set), a.add(f);
                    }
                }
            } if (null !== a) {
                for (var d = s(t), g = 0; g < d.length; g++) {
                    var m = n(d[g], 2), y = (f = m[0], m[1]);
                    if ("object" === o(f) && null !== f) {
                        if (!$(a, e, f, y, r, i))
                            return !1;
                    }
                    else if (!(r || e.has(f) && F(e.get(f), y, !1, i) || $(a, e, f, y, !1, i)))
                        return !1;
                }
                return 0 === a.size;
            } return !0; }(e, t, r, c))
                return !1;
        }
        else if (1 === u)
            for (; l < e.length; l++) {
                if (!p(e, l)) {
                    if (p(t, l))
                        return !1;
                    for (var f = Object.keys(e); l < f.length; l++) {
                        var h = f[l];
                        if (!p(t, h) || !F(e[h], t[h], r, c))
                            return !1;
                    }
                    return f.length === Object.keys(t).length;
                }
                if (!p(t, l) || !F(e[l], t[l], r, c))
                    return !1;
            } for (l = 0; l < i.length; l++) {
            var d = i[l];
            if (!F(e[d], t[d], r, c))
                return !1;
        } return !0; }
        e.exports = { isDeepEqual: function (e, t) { return F(e, t, !1); }, isDeepStrictEqual: function (e, t) { return F(e, t, !0); } };
    }, 2680: (e, t, r) => {
        "use strict";
        var n = r(7286), o = r(9429), i = o(n("String.prototype.indexOf"));
        e.exports = function (e, t) { var r = n(e, !!t); return "function" == typeof r && i(e, ".prototype.") > -1 ? o(r) : r; };
    }, 9429: (e, t, r) => {
        "use strict";
        var n = r(4090), o = r(7286), i = o("%Function.prototype.apply%"), a = o("%Function.prototype.call%"), s = o("%Reflect.apply%", !0) || n.call(a, i), c = o("%Object.getOwnPropertyDescriptor%", !0), u = o("%Object.defineProperty%", !0), l = o("%Math.max%");
        if (u)
            try {
                u({}, "a", { value: 1 });
            }
            catch (e) {
                u = null;
            }
        e.exports = function (e) { var t = s(n, a, arguments); if (c && u) {
            var r = c(t, "length");
            r.configurable && u(t, "length", { value: 1 + l(0, e.length - (arguments.length - 1)) });
        } return t; };
        var f = function () { return s(n, i, arguments); };
        u ? u(e.exports, "apply", { value: f }) : e.exports.apply = f;
    }, 3716: (e, t, r) => { var n = r(3335), o = r(1696); function i() { return (new Date).getTime(); } var a, s = Array.prototype.slice, c = {}; a = void 0 !== r.g && r.g.console ? r.g.console : "undefined" != typeof window && window.console ? window.console : {}; for (var u = [[function () { }, "log"], [function () { a.log.apply(a, arguments); }, "info"], [function () { a.log.apply(a, arguments); }, "warn"], [function () { a.warn.apply(a, arguments); }, "error"], [function (e) { c[e] = i(); }, "time"], [function (e) { var t = c[e]; if (!t)
                throw new Error("No such label: " + e); delete c[e]; var r = i() - t; a.log(e + ": " + r + "ms"); }, "timeEnd"], [function () { var e = new Error; e.name = "Trace", e.message = n.format.apply(null, arguments), a.error(e.stack); }, "trace"], [function (e) { a.log(n.inspect(e) + "\n"); }, "dir"], [function (e) { if (!e) {
                var t = s.call(arguments, 1);
                o.ok(!1, n.format.apply(null, t));
            } }, "assert"]], l = 0; l < u.length; l++) {
        var f = u[l], p = f[0], h = f[1];
        a[h] || (a[h] = p);
    } e.exports = a; }, 4926: (e, t, r) => {
        "use strict";
        var n = r(3464), o = "function" == typeof Symbol && "symbol" == typeof Symbol("foo"), i = Object.prototype.toString, a = Array.prototype.concat, s = Object.defineProperty, c = r(1181)(), u = s && c, l = function (e, t, r, n) { if (t in e)
            if (!0 === n) {
                if (e[t] === r)
                    return;
            }
            else if ("function" != typeof (o = n) || "[object Function]" !== i.call(o) || !n())
                return; var o; u ? s(e, t, { configurable: !0, enumerable: !1, value: r, writable: !0 }) : e[t] = r; }, f = function (e, t) { var r = arguments.length > 2 ? arguments[2] : {}, i = n(t); o && (i = a.call(i, Object.getOwnPropertySymbols(t))); for (var s = 0; s < i.length; s += 1)
            l(e, i[s], t[i[s]], r[i[s]]); };
        f.supportsDescriptors = !!u, e.exports = f;
    }, 4956: e => {
        "use strict";
        function t(e, t) { if (null == e)
            throw new TypeError("Cannot convert first argument to object"); for (var r = Object(e), n = 1; n < arguments.length; n++) {
            var o = arguments[n];
            if (null != o)
                for (var i = Object.keys(Object(o)), a = 0, s = i.length; a < s; a++) {
                    var c = i[a], u = Object.getOwnPropertyDescriptor(o, c);
                    void 0 !== u && u.enumerable && (r[c] = o[c]);
                }
        } return r; }
        e.exports = { assign: t, polyfill: function () { Object.assign || Object.defineProperty(Object, "assign", { enumerable: !1, configurable: !0, writable: !0, value: t }); } };
    }, 3243: (e, t, r) => {
        "use strict";
        var n = r(9680), o = Object.prototype.toString, i = Object.prototype.hasOwnProperty, a = function (e, t, r) { for (var n = 0, o = e.length; n < o; n++)
            i.call(e, n) && (null == r ? t(e[n], n, e) : t.call(r, e[n], n, e)); }, s = function (e, t, r) { for (var n = 0, o = e.length; n < o; n++)
            null == r ? t(e.charAt(n), n, e) : t.call(r, e.charAt(n), n, e); }, c = function (e, t, r) { for (var n in e)
            i.call(e, n) && (null == r ? t(e[n], n, e) : t.call(r, e[n], n, e)); };
        e.exports = function (e, t, r) { if (!n(t))
            throw new TypeError("iterator must be a function"); var i; arguments.length >= 3 && (i = r), "[object Array]" === o.call(e) ? a(e, t, i) : "string" == typeof e ? s(e, t, i) : c(e, t, i); };
    }, 7795: e => {
        "use strict";
        var t = "Function.prototype.bind called on incompatible ", r = Array.prototype.slice, n = Object.prototype.toString, o = "[object Function]";
        e.exports = function (e) { var i = this; if ("function" != typeof i || n.call(i) !== o)
            throw new TypeError(t + i); for (var a, s = r.call(arguments, 1), c = function () { if (this instanceof a) {
            var t = i.apply(this, s.concat(r.call(arguments)));
            return Object(t) === t ? t : this;
        } return i.apply(e, s.concat(r.call(arguments))); }, u = Math.max(0, i.length - s.length), l = [], f = 0; f < u; f++)
            l.push("$" + f); if (a = Function("binder", "return function (" + l.join(",") + "){ return binder.apply(this,arguments); }")(c), i.prototype) {
            var p = function () { };
            p.prototype = i.prototype, a.prototype = new p, p.prototype = null;
        } return a; };
    }, 4090: (e, t, r) => {
        "use strict";
        var n = r(7795);
        e.exports = Function.prototype.bind || n;
    }, 7286: (e, t, r) => {
        "use strict";
        var n, o = SyntaxError, i = Function, a = TypeError, s = function (e) { try {
            return i('"use strict"; return (' + e + ").constructor;")();
        }
        catch (e) { } }, c = Object.getOwnPropertyDescriptor;
        if (c)
            try {
                c({}, "");
            }
            catch (e) {
                c = null;
            }
        var u = function () { throw new a; }, l = c ? function () { try {
            return u;
        }
        catch (e) {
            try {
                return c(arguments, "callee").get;
            }
            catch (e) {
                return u;
            }
        } }() : u, f = r(2636)(), p = Object.getPrototypeOf || function (e) { return e.__proto__; }, h = {}, d = "undefined" == typeof Uint8Array ? n : p(Uint8Array), g = { "%AggregateError%": "undefined" == typeof AggregateError ? n : AggregateError, "%Array%": Array, "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? n : ArrayBuffer, "%ArrayIteratorPrototype%": f ? p([][Symbol.iterator]()) : n, "%AsyncFromSyncIteratorPrototype%": n, "%AsyncFunction%": h, "%AsyncGenerator%": h, "%AsyncGeneratorFunction%": h, "%AsyncIteratorPrototype%": h, "%Atomics%": "undefined" == typeof Atomics ? n : Atomics, "%BigInt%": "undefined" == typeof BigInt ? n : BigInt, "%Boolean%": Boolean, "%DataView%": "undefined" == typeof DataView ? n : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": "undefined" == typeof Float32Array ? n : Float32Array, "%Float64Array%": "undefined" == typeof Float64Array ? n : Float64Array, "%FinalizationRegistry%": "undefined" == typeof FinalizationRegistry ? n : FinalizationRegistry, "%Function%": i, "%GeneratorFunction%": h, "%Int8Array%": "undefined" == typeof Int8Array ? n : Int8Array, "%Int16Array%": "undefined" == typeof Int16Array ? n : Int16Array, "%Int32Array%": "undefined" == typeof Int32Array ? n : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": f ? p(p([][Symbol.iterator]())) : n, "%JSON%": "object" == typeof JSON ? JSON : n, "%Map%": "undefined" == typeof Map ? n : Map, "%MapIteratorPrototype%": "undefined" != typeof Map && f ? p((new Map)[Symbol.iterator]()) : n, "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": "undefined" == typeof Promise ? n : Promise, "%Proxy%": "undefined" == typeof Proxy ? n : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": "undefined" == typeof Reflect ? n : Reflect, "%RegExp%": RegExp, "%Set%": "undefined" == typeof Set ? n : Set, "%SetIteratorPrototype%": "undefined" != typeof Set && f ? p((new Set)[Symbol.iterator]()) : n, "%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? n : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": f ? p(""[Symbol.iterator]()) : n, "%Symbol%": f ? Symbol : n, "%SyntaxError%": o, "%ThrowTypeError%": l, "%TypedArray%": d, "%TypeError%": a, "%Uint8Array%": "undefined" == typeof Uint8Array ? n : Uint8Array, "%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? n : Uint8ClampedArray, "%Uint16Array%": "undefined" == typeof Uint16Array ? n : Uint16Array, "%Uint32Array%": "undefined" == typeof Uint32Array ? n : Uint32Array, "%URIError%": URIError, "%WeakMap%": "undefined" == typeof WeakMap ? n : WeakMap, "%WeakRef%": "undefined" == typeof WeakRef ? n : WeakRef, "%WeakSet%": "undefined" == typeof WeakSet ? n : WeakSet }, m = function e(t) { var r; if ("%AsyncFunction%" === t)
            r = s("async function () {}");
        else if ("%GeneratorFunction%" === t)
            r = s("function* () {}");
        else if ("%AsyncGeneratorFunction%" === t)
            r = s("async function* () {}");
        else if ("%AsyncGenerator%" === t) {
            var n = e("%AsyncGeneratorFunction%");
            n && (r = n.prototype);
        }
        else if ("%AsyncIteratorPrototype%" === t) {
            var o = e("%AsyncGenerator%");
            o && (r = p(o.prototype));
        } return g[t] = r, r; }, y = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, v = r(4090), b = r(3198), x = v.call(Function.call, Array.prototype.concat), S = v.call(Function.apply, Array.prototype.splice), A = v.call(Function.call, String.prototype.replace), w = v.call(Function.call, String.prototype.slice), O = v.call(Function.call, RegExp.prototype.exec), k = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, E = /\\(\\)?/g, j = function (e) { var t = w(e, 0, 1), r = w(e, -1); if ("%" === t && "%" !== r)
            throw new o("invalid intrinsic syntax, expected closing `%`"); if ("%" === r && "%" !== t)
            throw new o("invalid intrinsic syntax, expected opening `%`"); var n = []; return A(e, k, (function (e, t, r, o) { n[n.length] = r ? A(o, E, "$1") : t || e; })), n; }, T = function (e, t) { var r, n = e; if (b(y, n) && (n = "%" + (r = y[n])[0] + "%"), b(g, n)) {
            var i = g[n];
            if (i === h && (i = m(n)), void 0 === i && !t)
                throw new a("intrinsic " + e + " exists, but is not available. Please file an issue!");
            return { alias: r, name: n, value: i };
        } throw new o("intrinsic " + e + " does not exist!"); };
        e.exports = function (e, t) { if ("string" != typeof e || 0 === e.length)
            throw new a("intrinsic name must be a non-empty string"); if (arguments.length > 1 && "boolean" != typeof t)
            throw new a('"allowMissing" argument must be a boolean'); if (null === O(/^%?[^%]*%?$/, e))
            throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name"); var r = j(e), n = r.length > 0 ? r[0] : "", i = T("%" + n + "%", t), s = i.name, u = i.value, l = !1, f = i.alias; f && (n = f[0], S(r, x([0, 1], f))); for (var p = 1, h = !0; p < r.length; p += 1) {
            var d = r[p], m = w(d, 0, 1), y = w(d, -1);
            if (('"' === m || "'" === m || "`" === m || '"' === y || "'" === y || "`" === y) && m !== y)
                throw new o("property names with quotes must have matching quotes");
            if ("constructor" !== d && h || (l = !0), b(g, s = "%" + (n += "." + d) + "%"))
                u = g[s];
            else if (null != u) {
                if (!(d in u)) {
                    if (!t)
                        throw new a("base intrinsic for " + e + " exists, but the property is not available.");
                    return;
                }
                if (c && p + 1 >= r.length) {
                    var v = c(u, d);
                    u = (h = !!v) && "get" in v && !("originalValue" in v.get) ? v.get : u[d];
                }
                else
                    h = b(u, d), u = u[d];
                h && !l && (g[s] = u);
            }
        } return u; };
    }, 326: (e, t, r) => {
        "use strict";
        var n = r(7286)("%Object.getOwnPropertyDescriptor%", !0);
        if (n)
            try {
                n([], "length");
            }
            catch (e) {
                n = null;
            }
        e.exports = n;
    }, 1181: (e, t, r) => {
        "use strict";
        var n = r(7286)("%Object.defineProperty%", !0), o = function () { if (n)
            try {
                return n({}, "a", { value: 1 }), !0;
            }
            catch (e) {
                return !1;
            } return !1; };
        o.hasArrayLengthDefineBug = function () { if (!o())
            return null; try {
            return 1 !== n([], "length", { value: 1 }).length;
        }
        catch (e) {
            return !0;
        } }, e.exports = o;
    }, 2636: (e, t, r) => {
        "use strict";
        var n = "undefined" != typeof Symbol && Symbol, o = r(6679);
        e.exports = function () { return "function" == typeof n && "function" == typeof Symbol && "symbol" == typeof n("foo") && "symbol" == typeof Symbol("bar") && o(); };
    }, 6679: e => {
        "use strict";
        e.exports = function () { if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols)
            return !1; if ("symbol" == typeof Symbol.iterator)
            return !0; var e = {}, t = Symbol("test"), r = Object(t); if ("string" == typeof t)
            return !1; if ("[object Symbol]" !== Object.prototype.toString.call(t))
            return !1; if ("[object Symbol]" !== Object.prototype.toString.call(r))
            return !1; for (t in e[t] = 42, e)
            return !1; if ("function" == typeof Object.keys && 0 !== Object.keys(e).length)
            return !1; if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(e).length)
            return !1; var n = Object.getOwnPropertySymbols(e); if (1 !== n.length || n[0] !== t)
            return !1; if (!Object.prototype.propertyIsEnumerable.call(e, t))
            return !1; if ("function" == typeof Object.getOwnPropertyDescriptor) {
            var o = Object.getOwnPropertyDescriptor(e, t);
            if (42 !== o.value || !0 !== o.enumerable)
                return !1;
        } return !0; };
    }, 7226: (e, t, r) => {
        "use strict";
        var n = r(6679);
        e.exports = function () { return n() && !!Symbol.toStringTag; };
    }, 3198: (e, t, r) => {
        "use strict";
        var n = r(4090);
        e.exports = n.call(Function.call, Object.prototype.hasOwnProperty);
    }, 1285: e => { "function" == typeof Object.create ? e.exports = function (e, t) { t && (e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })); } : e.exports = function (e, t) { if (t) {
        e.super_ = t;
        var r = function () { };
        r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e;
    } }; }, 2635: (e, t, r) => {
        "use strict";
        var n = r(7226)(), o = r(2680)("Object.prototype.toString"), i = function (e) { return !(n && e && "object" == typeof e && Symbol.toStringTag in e) && "[object Arguments]" === o(e); }, a = function (e) { return !!i(e) || null !== e && "object" == typeof e && "number" == typeof e.length && e.length >= 0 && "[object Array]" !== o(e) && "[object Function]" === o(e.callee); }, s = function () { return i(arguments); }();
        i.isLegacyArguments = a, e.exports = s ? i : a;
    }, 9680: e => {
        "use strict";
        var t, r, n = Function.prototype.toString, o = "object" == typeof Reflect && null !== Reflect && Reflect.apply;
        if ("function" == typeof o && "function" == typeof Object.defineProperty)
            try {
                t = Object.defineProperty({}, "length", { get: function () { throw r; } }), r = {}, o((function () { throw 42; }), null, t);
            }
            catch (e) {
                e !== r && (o = null);
            }
        else
            o = null;
        var i = /^\s*class\b/, a = function (e) { try {
            var t = n.call(e);
            return i.test(t);
        }
        catch (e) {
            return !1;
        } }, s = function (e) { try {
            return !a(e) && (n.call(e), !0);
        }
        catch (e) {
            return !1;
        } }, c = Object.prototype.toString, u = "function" == typeof Symbol && !!Symbol.toStringTag, l = !(0 in [,]), f = function () { return !1; };
        if ("object" == typeof document) {
            var p = document.all;
            c.call(p) === c.call(document.all) && (f = function (e) { if ((l || !e) && (void 0 === e || "object" == typeof e))
                try {
                    var t = c.call(e);
                    return ("[object HTMLAllCollection]" === t || "[object HTML document.all class]" === t || "[object HTMLCollection]" === t || "[object Object]" === t) && null == e("");
                }
                catch (e) { } return !1; });
        }
        e.exports = o ? function (e) { if (f(e))
            return !0; if (!e)
            return !1; if ("function" != typeof e && "object" != typeof e)
            return !1; try {
            o(e, null, t);
        }
        catch (e) {
            if (e !== r)
                return !1;
        } return !a(e) && s(e); } : function (e) { if (f(e))
            return !0; if (!e)
            return !1; if ("function" != typeof e && "object" != typeof e)
            return !1; if (u)
            return s(e); if (a(e))
            return !1; var t = c.call(e); return !("[object Function]" !== t && "[object GeneratorFunction]" !== t && !/^\[object HTML/.test(t)) && s(e); };
    }, 3138: (e, t, r) => {
        "use strict";
        var n, o = Object.prototype.toString, i = Function.prototype.toString, a = /^\s*(?:function)?\*/, s = r(7226)(), c = Object.getPrototypeOf;
        e.exports = function (e) { if ("function" != typeof e)
            return !1; if (a.test(i.call(e)))
            return !0; if (!s)
            return "[object GeneratorFunction]" === o.call(e); if (!c)
            return !1; if (void 0 === n) {
            var t = function () { if (!s)
                return !1; try {
                return Function("return function*() {}")();
            }
            catch (e) { } }();
            n = !!t && c(t);
        } return c(e) === n; };
    }, 7053: e => {
        "use strict";
        e.exports = function (e) { return e != e; };
    }, 4782: (e, t, r) => {
        "use strict";
        var n = r(9429), o = r(4926), i = r(7053), a = r(755), s = r(5346), c = n(a(), Number);
        o(c, { getPolyfill: a, implementation: i, shim: s }), e.exports = c;
    }, 755: (e, t, r) => {
        "use strict";
        var n = r(7053);
        e.exports = function () { return Number.isNaN && Number.isNaN(NaN) && !Number.isNaN("a") ? Number.isNaN : n; };
    }, 5346: (e, t, r) => {
        "use strict";
        var n = r(4926), o = r(755);
        e.exports = function () { var e = o(); return n(Number, { isNaN: e }, { isNaN: function () { return Number.isNaN !== e; } }), e; };
    }, 198: (e, t, r) => {
        "use strict";
        var n = r(3243), o = r(2191), i = r(2680), a = i("Object.prototype.toString"), s = r(7226)(), c = r(326), u = "undefined" == typeof globalThis ? r.g : globalThis, l = o(), f = i("Array.prototype.indexOf", !0) || function (e, t) { for (var r = 0; r < e.length; r += 1)
            if (e[r] === t)
                return r; return -1; }, p = i("String.prototype.slice"), h = {}, d = Object.getPrototypeOf;
        s && c && d && n(l, (function (e) { var t = new u[e]; if (Symbol.toStringTag in t) {
            var r = d(t), n = c(r, Symbol.toStringTag);
            if (!n) {
                var o = d(r);
                n = c(o, Symbol.toStringTag);
            }
            h[e] = n.get;
        } })), e.exports = function (e) { if (!e || "object" != typeof e)
            return !1; if (!s || !(Symbol.toStringTag in e)) {
            var t = p(a(e), 8, -1);
            return f(l, t) > -1;
        } return !!c && function (e) { var t = !1; return n(h, (function (r, n) { if (!t)
            try {
                t = r.call(e) === n;
            }
            catch (e) { } })), t; }(e); };
    }, 8169: e => {
        "use strict";
        var t = function (e) { return e != e; };
        e.exports = function (e, r) { return 0 === e && 0 === r ? 1 / e == 1 / r : e === r || !(!t(e) || !t(r)); };
    }, 4679: (e, t, r) => {
        "use strict";
        var n = r(4926), o = r(9429), i = r(8169), a = r(8070), s = r(191), c = o(a(), Object);
        n(c, { getPolyfill: a, implementation: i, shim: s }), e.exports = c;
    }, 8070: (e, t, r) => {
        "use strict";
        var n = r(8169);
        e.exports = function () { return "function" == typeof Object.is ? Object.is : n; };
    }, 191: (e, t, r) => {
        "use strict";
        var n = r(8070), o = r(4926);
        e.exports = function () { var e = n(); return o(Object, { is: e }, { is: function () { return Object.is !== e; } }), e; };
    }, 5691: (e, t, r) => {
        "use strict";
        var n;
        if (!Object.keys) {
            var o = Object.prototype.hasOwnProperty, i = Object.prototype.toString, a = r(801), s = Object.prototype.propertyIsEnumerable, c = !s.call({ toString: null }, "toString"), u = s.call((function () { }), "prototype"), l = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], f = function (e) { var t = e.constructor; return t && t.prototype === e; }, p = { $applicationCache: !0, $console: !0, $external: !0, $frame: !0, $frameElement: !0, $frames: !0, $innerHeight: !0, $innerWidth: !0, $onmozfullscreenchange: !0, $onmozfullscreenerror: !0, $outerHeight: !0, $outerWidth: !0, $pageXOffset: !0, $pageYOffset: !0, $parent: !0, $scrollLeft: !0, $scrollTop: !0, $scrollX: !0, $scrollY: !0, $self: !0, $webkitIndexedDB: !0, $webkitStorageInfo: !0, $window: !0 }, h = function () { if ("undefined" == typeof window)
                return !1; for (var e in window)
                try {
                    if (!p["$" + e] && o.call(window, e) && null !== window[e] && "object" == typeof window[e])
                        try {
                            f(window[e]);
                        }
                        catch (e) {
                            return !0;
                        }
                }
                catch (e) {
                    return !0;
                } return !1; }();
            n = function (e) { var t = null !== e && "object" == typeof e, r = "[object Function]" === i.call(e), n = a(e), s = t && "[object String]" === i.call(e), p = []; if (!t && !r && !n)
                throw new TypeError("Object.keys called on a non-object"); var d = u && r; if (s && e.length > 0 && !o.call(e, 0))
                for (var g = 0; g < e.length; ++g)
                    p.push(String(g)); if (n && e.length > 0)
                for (var m = 0; m < e.length; ++m)
                    p.push(String(m));
            else
                for (var y in e)
                    d && "prototype" === y || !o.call(e, y) || p.push(String(y)); if (c)
                for (var v = function (e) { if ("undefined" == typeof window || !h)
                    return f(e); try {
                    return f(e);
                }
                catch (e) {
                    return !1;
                } }(e), b = 0; b < l.length; ++b)
                    v && "constructor" === l[b] || !o.call(e, l[b]) || p.push(l[b]); return p; };
        }
        e.exports = n;
    }, 3464: (e, t, r) => {
        "use strict";
        var n = Array.prototype.slice, o = r(801), i = Object.keys, a = i ? function (e) { return i(e); } : r(5691), s = Object.keys;
        a.shim = function () { if (Object.keys) {
            var e = function () { var e = Object.keys(arguments); return e && e.length === arguments.length; }(1, 2);
            e || (Object.keys = function (e) { return o(e) ? s(n.call(e)) : s(e); });
        }
        else
            Object.keys = a; return Object.keys || a; }, e.exports = a;
    }, 801: e => {
        "use strict";
        var t = Object.prototype.toString;
        e.exports = function (e) { var r = t.call(e), n = "[object Arguments]" === r; return n || (n = "[object Array]" !== r && null !== e && "object" == typeof e && "number" == typeof e.length && e.length >= 0 && "[object Function]" === t.call(e.callee)), n; };
    }, 4406: e => { var t, r, n = e.exports = {}; function o() { throw new Error("setTimeout has not been defined"); } function i() { throw new Error("clearTimeout has not been defined"); } function a(e) { if (t === setTimeout)
        return setTimeout(e, 0); if ((t === o || !t) && setTimeout)
        return t = setTimeout, setTimeout(e, 0); try {
        return t(e, 0);
    }
    catch (r) {
        try {
            return t.call(null, e, 0);
        }
        catch (r) {
            return t.call(this, e, 0);
        }
    } } !function () { try {
        t = "function" == typeof setTimeout ? setTimeout : o;
    }
    catch (e) {
        t = o;
    } try {
        r = "function" == typeof clearTimeout ? clearTimeout : i;
    }
    catch (e) {
        r = i;
    } }(); var s, c = [], u = !1, l = -1; function f() { u && s && (u = !1, s.length ? c = s.concat(c) : l = -1, c.length && p()); } function p() { if (!u) {
        var e = a(f);
        u = !0;
        for (var t = c.length; t;) {
            for (s = c, c = []; ++l < t;)
                s && s[l].run();
            l = -1, t = c.length;
        }
        s = null, u = !1, function (e) { if (r === clearTimeout)
            return clearTimeout(e); if ((r === i || !r) && clearTimeout)
            return r = clearTimeout, clearTimeout(e); try {
            r(e);
        }
        catch (t) {
            try {
                return r.call(null, e);
            }
            catch (t) {
                return r.call(this, e);
            }
        } }(e);
    } } function h(e, t) { this.fun = e, this.array = t; } function d() { } n.nextTick = function (e) { var t = new Array(arguments.length - 1); if (arguments.length > 1)
        for (var r = 1; r < arguments.length; r++)
            t[r - 1] = arguments[r]; c.push(new h(e, t)), 1 !== c.length || u || a(p); }, h.prototype.run = function () { this.fun.apply(null, this.array); }, n.title = "browser", n.browser = !0, n.env = {}, n.argv = [], n.version = "", n.versions = {}, n.on = d, n.addListener = d, n.once = d, n.off = d, n.removeListener = d, n.removeAllListeners = d, n.emit = d, n.prependListener = d, n.prependOnceListener = d, n.listeners = function (e) { return []; }, n.binding = function (e) { throw new Error("process.binding is not supported"); }, n.cwd = function () { return "/"; }, n.chdir = function (e) { throw new Error("process.chdir is not supported"); }, n.umask = function () { return 0; }; }, 3401: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.BaseService = void 0;
        const n = r(6508), o = r(4881);
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
            setValue(e, t) { let r = this.getDocument(e.uri); r && (r = o.TextDocument.create(r.uri, r.languageId, r.version, t), this.documents[r.uri] = r); }
            setGlobalOptions(e) { this.globalOptions = e ?? {}; }
            setOptions(e, t, r = !1) { this.options[e] = r ? (0, n.mergeObjects)(t, this.options[e]) : t; }
            getOption(e, t) { return this.options[e] && this.options[e][t] ? this.options[e][t] : this.globalOptions[t]; }
            applyDeltas(e, t) { let r = this.getDocument(e.uri); r && o.TextDocument.update(r, t, e.version); }
            async doComplete(e, t) { return null; }
            async doHover(e, t) { return null; }
            async doResolve(e) { return null; }
            async doValidation(e) { return []; }
            format(e, t, r) { return []; }
        };
    }, 9028: function (e, t, r) {
        "use strict";
        var n = this && this.__createBinding || (Object.create ? function (e, t, r, n) { void 0 === n && (n = r); var o = Object.getOwnPropertyDescriptor(t, r); o && !("get" in o ? !t.__esModule : o.writable || o.configurable) || (o = { enumerable: !0, get: function () { return t[r]; } }), Object.defineProperty(e, n, o); } : function (e, t, r, n) { void 0 === n && (n = r), e[n] = t[r]; }), o = this && this.__setModuleDefault || (Object.create ? function (e, t) { Object.defineProperty(e, "default", { enumerable: !0, value: t }); } : function (e, t) { e.default = t; }), i = this && this.__importStar || function (e) { if (e && e.__esModule)
            return e; var t = {}; if (null != e)
            for (var r in e)
                "default" !== r && Object.prototype.hasOwnProperty.call(e, r) && n(t, e, r); return o(t, e), t; };
        Object.defineProperty(t, "__esModule", { value: !0 }), t.JsonService = void 0;
        const a = r(3401), s = i(r(3396));
        class c extends a.BaseService {
            $service;
            schemas = {};
            constructor(e) { super(e), this.$service = s.getLanguageService({ schemaRequestService: e => { e = e.replace("file:///", ""); let t = this.schemas[e]; return t ? Promise.resolve(t) : Promise.reject(`Unable to load schema at ${e}`); } }); }
            $getJsonSchemaUri(e) { return this.getOption(e, "schemaUri"); }
            addDocument(e) { super.addDocument(e), this.$configureService(e.uri); }
            $configureService(e) { let t = this.getOption(e, "schemas"); t?.forEach((t => { t.uri === this.$getJsonSchemaUri(e) && (t.fileMatch ??= [], t.fileMatch.push(e)); let r = t.schema ?? this.schemas[t.uri]; r && (this.schemas[t.uri] = r), this.$service.resetSchema(t.uri), t.schema = void 0; })), this.$service.configure({ schemas: t, allowComments: "json5" === this.mode }); }
            removeDocument(e) { super.removeDocument(e); let t = this.getOption(e.uri, "schemas"); t?.forEach((t => { t.uri === this.$getJsonSchemaUri(e.uri) && (t.fileMatch = t.fileMatch?.filter((t => t != e.uri))); })), this.$service.configure({ schemas: t, allowComments: "json5" === this.mode }); }
            setOptions(e, t, r = !1) { super.setOptions(e, t, r), this.$configureService(e); }
            setGlobalOptions(e) { super.setGlobalOptions(e), this.$configureService(""); }
            format(e, t, r) { let n = this.getDocument(e.uri); return n ? this.$service.format(n, t, r) : []; }
            async doHover(e, t) { let r = this.getDocument(e.uri); if (!r)
                return null; let n = this.$service.parseJSONDocument(r); return this.$service.doHover(r, t, n); }
            async doValidation(e) { let t = this.getDocument(e.uri); if (!t)
                return []; let r = this.$service.parseJSONDocument(t); return this.$service.doValidation(t, r, { trailingCommas: "json5" === this.mode ? "ignore" : "error" }); }
            async doComplete(e, t) { let r = this.getDocument(e.uri); if (!r)
                return null; let n = this.$service.parseJSONDocument(r); return this.$service.doComplete(r, t, n); }
            async doResolve(e) { return this.$service.doResolve(e); }
        }
        t.JsonService = c;
    }, 6508: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.mergeObjects = void 0, t.mergeObjects = function e(t, r) { if (!t)
            return r; if (!r)
            return t; const n = {}; for (const o of [...Object.keys(t), ...Object.keys(r)])
            t[o] && r[o] ? Array.isArray(t[o]) ? n[o] = t[o].concat(r[o]) : n[o] = e(t[o], r[o]) : n[o] = t[o] ?? r[o]; return n; };
    }, 82: e => { e.exports = function (e) { return e && "object" == typeof e && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8; }; }, 4895: (e, t, r) => {
        "use strict";
        var n = r(2635), o = r(3138), i = r(2094), a = r(198);
        function s(e) { return e.call.bind(e); }
        var c = "undefined" != typeof BigInt, u = "undefined" != typeof Symbol, l = s(Object.prototype.toString), f = s(Number.prototype.valueOf), p = s(String.prototype.valueOf), h = s(Boolean.prototype.valueOf);
        if (c)
            var d = s(BigInt.prototype.valueOf);
        if (u)
            var g = s(Symbol.prototype.valueOf);
        function m(e, t) { if ("object" != typeof e)
            return !1; try {
            return t(e), !0;
        }
        catch (e) {
            return !1;
        } }
        function y(e) { return "[object Map]" === l(e); }
        function v(e) { return "[object Set]" === l(e); }
        function b(e) { return "[object WeakMap]" === l(e); }
        function x(e) { return "[object WeakSet]" === l(e); }
        function S(e) { return "[object ArrayBuffer]" === l(e); }
        function A(e) { return "undefined" != typeof ArrayBuffer && (S.working ? S(e) : e instanceof ArrayBuffer); }
        function w(e) { return "[object DataView]" === l(e); }
        function O(e) { return "undefined" != typeof DataView && (w.working ? w(e) : e instanceof DataView); }
        t.isArgumentsObject = n, t.isGeneratorFunction = o, t.isTypedArray = a, t.isPromise = function (e) { return "undefined" != typeof Promise && e instanceof Promise || null !== e && "object" == typeof e && "function" == typeof e.then && "function" == typeof e.catch; }, t.isArrayBufferView = function (e) { return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : a(e) || O(e); }, t.isUint8Array = function (e) { return "Uint8Array" === i(e); }, t.isUint8ClampedArray = function (e) { return "Uint8ClampedArray" === i(e); }, t.isUint16Array = function (e) { return "Uint16Array" === i(e); }, t.isUint32Array = function (e) { return "Uint32Array" === i(e); }, t.isInt8Array = function (e) { return "Int8Array" === i(e); }, t.isInt16Array = function (e) { return "Int16Array" === i(e); }, t.isInt32Array = function (e) { return "Int32Array" === i(e); }, t.isFloat32Array = function (e) { return "Float32Array" === i(e); }, t.isFloat64Array = function (e) { return "Float64Array" === i(e); }, t.isBigInt64Array = function (e) { return "BigInt64Array" === i(e); }, t.isBigUint64Array = function (e) { return "BigUint64Array" === i(e); }, y.working = "undefined" != typeof Map && y(new Map), t.isMap = function (e) { return "undefined" != typeof Map && (y.working ? y(e) : e instanceof Map); }, v.working = "undefined" != typeof Set && v(new Set), t.isSet = function (e) { return "undefined" != typeof Set && (v.working ? v(e) : e instanceof Set); }, b.working = "undefined" != typeof WeakMap && b(new WeakMap), t.isWeakMap = function (e) { return "undefined" != typeof WeakMap && (b.working ? b(e) : e instanceof WeakMap); }, x.working = "undefined" != typeof WeakSet && x(new WeakSet), t.isWeakSet = function (e) { return x(e); }, S.working = "undefined" != typeof ArrayBuffer && S(new ArrayBuffer), t.isArrayBuffer = A, w.working = "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView && w(new DataView(new ArrayBuffer(1), 0, 1)), t.isDataView = O;
        var k = "undefined" != typeof SharedArrayBuffer ? SharedArrayBuffer : void 0;
        function E(e) { return "[object SharedArrayBuffer]" === l(e); }
        function j(e) { return void 0 !== k && (void 0 === E.working && (E.working = E(new k)), E.working ? E(e) : e instanceof k); }
        function T(e) { return m(e, f); }
        function C(e) { return m(e, p); }
        function P(e) { return m(e, h); }
        function I(e) { return c && m(e, d); }
        function M(e) { return u && m(e, g); }
        t.isSharedArrayBuffer = j, t.isAsyncFunction = function (e) { return "[object AsyncFunction]" === l(e); }, t.isMapIterator = function (e) { return "[object Map Iterator]" === l(e); }, t.isSetIterator = function (e) { return "[object Set Iterator]" === l(e); }, t.isGeneratorObject = function (e) { return "[object Generator]" === l(e); }, t.isWebAssemblyCompiledModule = function (e) { return "[object WebAssembly.Module]" === l(e); }, t.isNumberObject = T, t.isStringObject = C, t.isBooleanObject = P, t.isBigIntObject = I, t.isSymbolObject = M, t.isBoxedPrimitive = function (e) { return T(e) || C(e) || P(e) || I(e) || M(e); }, t.isAnyArrayBuffer = function (e) { return "undefined" != typeof Uint8Array && (A(e) || j(e)); }, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach((function (e) { Object.defineProperty(t, e, { enumerable: !1, value: function () { throw new Error(e + " is not supported in userland"); } }); }));
    }, 3335: (e, t, r) => { var n = r(4406), o = r(3716), i = Object.getOwnPropertyDescriptors || function (e) { for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++)
        r[t[n]] = Object.getOwnPropertyDescriptor(e, t[n]); return r; }, a = /%[sdj%]/g; t.format = function (e) { if (!x(e)) {
        for (var t = [], r = 0; r < arguments.length; r++)
            t.push(l(arguments[r]));
        return t.join(" ");
    } r = 1; for (var n = arguments, o = n.length, i = String(e).replace(a, (function (e) { if ("%%" === e)
        return "%"; if (r >= o)
        return e; switch (e) {
        case "%s": return String(n[r++]);
        case "%d": return Number(n[r++]);
        case "%j": try {
            return JSON.stringify(n[r++]);
        }
        catch (e) {
            return "[Circular]";
        }
        default: return e;
    } })), s = n[r]; r < o; s = n[++r])
        v(s) || !w(s) ? i += " " + s : i += " " + l(s); return i; }, t.deprecate = function (e, r) { if (void 0 !== n && !0 === n.noDeprecation)
        return e; if (void 0 === n)
        return function () { return t.deprecate(e, r).apply(this, arguments); }; var i = !1; return function () { if (!i) {
        if (n.throwDeprecation)
            throw new Error(r);
        n.traceDeprecation ? o.trace(r) : o.error(r), i = !0;
    } return e.apply(this, arguments); }; }; var s = {}, c = /^$/; if (n.env.NODE_DEBUG) {
        var u = n.env.NODE_DEBUG;
        u = u.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), c = new RegExp("^" + u + "$", "i");
    } function l(e, r) { var n = { seen: [], stylize: p }; return arguments.length >= 3 && (n.depth = arguments[2]), arguments.length >= 4 && (n.colors = arguments[3]), y(r) ? n.showHidden = r : r && t._extend(n, r), S(n.showHidden) && (n.showHidden = !1), S(n.depth) && (n.depth = 2), S(n.colors) && (n.colors = !1), S(n.customInspect) && (n.customInspect = !0), n.colors && (n.stylize = f), h(n, e, n.depth); } function f(e, t) { var r = l.styles[t]; return r ? "[" + l.colors[r][0] + "m" + e + "[" + l.colors[r][1] + "m" : e; } function p(e, t) { return e; } function h(e, r, n) { if (e.customInspect && r && E(r.inspect) && r.inspect !== t.inspect && (!r.constructor || r.constructor.prototype !== r)) {
        var o = r.inspect(n, e);
        return x(o) || (o = h(e, o, n)), o;
    } var i = function (e, t) { if (S(t))
        return e.stylize("undefined", "undefined"); if (x(t)) {
        var r = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return e.stylize(r, "string");
    } return b(t) ? e.stylize("" + t, "number") : y(t) ? e.stylize("" + t, "boolean") : v(t) ? e.stylize("null", "null") : void 0; }(e, r); if (i)
        return i; var a = Object.keys(r), s = function (e) { var t = {}; return e.forEach((function (e, r) { t[e] = !0; })), t; }(a); if (e.showHidden && (a = Object.getOwnPropertyNames(r)), k(r) && (a.indexOf("message") >= 0 || a.indexOf("description") >= 0))
        return d(r); if (0 === a.length) {
        if (E(r)) {
            var c = r.name ? ": " + r.name : "";
            return e.stylize("[Function" + c + "]", "special");
        }
        if (A(r))
            return e.stylize(RegExp.prototype.toString.call(r), "regexp");
        if (O(r))
            return e.stylize(Date.prototype.toString.call(r), "date");
        if (k(r))
            return d(r);
    } var u, l = "", f = !1, p = ["{", "}"]; return m(r) && (f = !0, p = ["[", "]"]), E(r) && (l = " [Function" + (r.name ? ": " + r.name : "") + "]"), A(r) && (l = " " + RegExp.prototype.toString.call(r)), O(r) && (l = " " + Date.prototype.toUTCString.call(r)), k(r) && (l = " " + d(r)), 0 !== a.length || f && 0 != r.length ? n < 0 ? A(r) ? e.stylize(RegExp.prototype.toString.call(r), "regexp") : e.stylize("[Object]", "special") : (e.seen.push(r), u = f ? function (e, t, r, n, o) { for (var i = [], a = 0, s = t.length; a < s; ++a)
        I(t, String(a)) ? i.push(g(e, t, r, n, String(a), !0)) : i.push(""); return o.forEach((function (o) { o.match(/^\d+$/) || i.push(g(e, t, r, n, o, !0)); })), i; }(e, r, n, s, a) : a.map((function (t) { return g(e, r, n, s, t, f); })), e.seen.pop(), function (e, t, r) { return e.reduce((function (e, t) { return t.indexOf("\n"), e + t.replace(/\u001b\[\d\d?m/g, "").length + 1; }), 0) > 60 ? r[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + r[1] : r[0] + t + " " + e.join(", ") + " " + r[1]; }(u, l, p)) : p[0] + l + p[1]; } function d(e) { return "[" + Error.prototype.toString.call(e) + "]"; } function g(e, t, r, n, o, i) { var a, s, c; if ((c = Object.getOwnPropertyDescriptor(t, o) || { value: t[o] }).get ? s = c.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : c.set && (s = e.stylize("[Setter]", "special")), I(n, o) || (a = "[" + o + "]"), s || (e.seen.indexOf(c.value) < 0 ? (s = v(r) ? h(e, c.value, null) : h(e, c.value, r - 1)).indexOf("\n") > -1 && (s = i ? s.split("\n").map((function (e) { return "  " + e; })).join("\n").slice(2) : "\n" + s.split("\n").map((function (e) { return "   " + e; })).join("\n")) : s = e.stylize("[Circular]", "special")), S(a)) {
        if (i && o.match(/^\d+$/))
            return s;
        (a = JSON.stringify("" + o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.slice(1, -1), a = e.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), a = e.stylize(a, "string"));
    } return a + ": " + s; } function m(e) { return Array.isArray(e); } function y(e) { return "boolean" == typeof e; } function v(e) { return null === e; } function b(e) { return "number" == typeof e; } function x(e) { return "string" == typeof e; } function S(e) { return void 0 === e; } function A(e) { return w(e) && "[object RegExp]" === j(e); } function w(e) { return "object" == typeof e && null !== e; } function O(e) { return w(e) && "[object Date]" === j(e); } function k(e) { return w(e) && ("[object Error]" === j(e) || e instanceof Error); } function E(e) { return "function" == typeof e; } function j(e) { return Object.prototype.toString.call(e); } function T(e) { return e < 10 ? "0" + e.toString(10) : e.toString(10); } t.debuglog = function (e) { if (e = e.toUpperCase(), !s[e])
        if (c.test(e)) {
            var r = n.pid;
            s[e] = function () { var n = t.format.apply(t, arguments); o.error("%s %d: %s", e, r, n); };
        }
        else
            s[e] = function () { }; return s[e]; }, t.inspect = l, l.colors = { bold: [1, 22], italic: [3, 23], underline: [4, 24], inverse: [7, 27], white: [37, 39], grey: [90, 39], black: [30, 39], blue: [34, 39], cyan: [36, 39], green: [32, 39], magenta: [35, 39], red: [31, 39], yellow: [33, 39] }, l.styles = { special: "cyan", number: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", date: "magenta", regexp: "red" }, t.types = r(4895), t.isArray = m, t.isBoolean = y, t.isNull = v, t.isNullOrUndefined = function (e) { return null == e; }, t.isNumber = b, t.isString = x, t.isSymbol = function (e) { return "symbol" == typeof e; }, t.isUndefined = S, t.isRegExp = A, t.types.isRegExp = A, t.isObject = w, t.isDate = O, t.types.isDate = O, t.isError = k, t.types.isNativeError = k, t.isFunction = E, t.isPrimitive = function (e) { return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || void 0 === e; }, t.isBuffer = r(82); var C = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; function P() { var e = new Date, t = [T(e.getHours()), T(e.getMinutes()), T(e.getSeconds())].join(":"); return [e.getDate(), C[e.getMonth()], t].join(" "); } function I(e, t) { return Object.prototype.hasOwnProperty.call(e, t); } t.log = function () { o.log("%s - %s", P(), t.format.apply(t, arguments)); }, t.inherits = r(1285), t._extend = function (e, t) { if (!t || !w(t))
        return e; for (var r = Object.keys(t), n = r.length; n--;)
        e[r[n]] = t[r[n]]; return e; }; var M = "undefined" != typeof Symbol ? Symbol("util.promisify.custom") : void 0; function N(e, t) { if (!e) {
        var r = new Error("Promise was rejected with a falsy value");
        r.reason = e, e = r;
    } return t(e); } t.promisify = function (e) { if ("function" != typeof e)
        throw new TypeError('The "original" argument must be of type Function'); if (M && e[M]) {
        var t;
        if ("function" != typeof (t = e[M]))
            throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        return Object.defineProperty(t, M, { value: t, enumerable: !1, writable: !1, configurable: !0 }), t;
    } function t() { for (var t, r, n = new Promise((function (e, n) { t = e, r = n; })), o = [], i = 0; i < arguments.length; i++)
        o.push(arguments[i]); o.push((function (e, n) { e ? r(e) : t(n); })); try {
        e.apply(this, o);
    }
    catch (e) {
        r(e);
    } return n; } return Object.setPrototypeOf(t, Object.getPrototypeOf(e)), M && Object.defineProperty(t, M, { value: t, enumerable: !1, writable: !1, configurable: !0 }), Object.defineProperties(t, i(e)); }, t.promisify.custom = M, t.callbackify = function (e) { if ("function" != typeof e)
        throw new TypeError('The "original" argument must be of type Function'); function t() { for (var t = [], r = 0; r < arguments.length; r++)
        t.push(arguments[r]); var o = t.pop(); if ("function" != typeof o)
        throw new TypeError("The last argument must be of type Function"); var i = this, a = function () { return o.apply(i, arguments); }; e.apply(this, t).then((function (e) { n.nextTick(a.bind(null, null, e)); }), (function (e) { n.nextTick(N.bind(null, e, a)); })); } return Object.setPrototypeOf(t, Object.getPrototypeOf(e)), Object.defineProperties(t, i(e)), t; }; }, 3396: (e, t, r) => {
        "use strict";
        function n(e, t = !1) { const r = e.length; let n = 0, s = "", c = 0, u = 16, l = 0, f = 0, p = 0, h = 0, d = 0; function g(t, r) { let o = 0, i = 0; for (; o < t || !r;) {
            let t = e.charCodeAt(n);
            if (t >= 48 && t <= 57)
                i = 16 * i + t - 48;
            else if (t >= 65 && t <= 70)
                i = 16 * i + t - 65 + 10;
            else {
                if (!(t >= 97 && t <= 102))
                    break;
                i = 16 * i + t - 97 + 10;
            }
            n++, o++;
        } return o < t && (i = -1), i; } function m() { if (s = "", d = 0, c = n, f = l, h = p, n >= r)
            return c = r, u = 17; let t = e.charCodeAt(n); if (o(t)) {
            do {
                n++, s += String.fromCharCode(t), t = e.charCodeAt(n);
            } while (o(t));
            return u = 15;
        } if (i(t))
            return n++, s += String.fromCharCode(t), 13 === t && 10 === e.charCodeAt(n) && (n++, s += "\n"), l++, p = n, u = 14; switch (t) {
            case 123: return n++, u = 1;
            case 125: return n++, u = 2;
            case 91: return n++, u = 3;
            case 93: return n++, u = 4;
            case 58: return n++, u = 6;
            case 44: return n++, u = 5;
            case 34: return n++, s = function () { let t = "", o = n; for (;;) {
                if (n >= r) {
                    t += e.substring(o, n), d = 2;
                    break;
                }
                const a = e.charCodeAt(n);
                if (34 === a) {
                    t += e.substring(o, n), n++;
                    break;
                }
                if (92 !== a) {
                    if (a >= 0 && a <= 31) {
                        if (i(a)) {
                            t += e.substring(o, n), d = 2;
                            break;
                        }
                        d = 6;
                    }
                    n++;
                }
                else {
                    if (t += e.substring(o, n), n++, n >= r) {
                        d = 2;
                        break;
                    }
                    switch (e.charCodeAt(n++)) {
                        case 34:
                            t += '"';
                            break;
                        case 92:
                            t += "\\";
                            break;
                        case 47:
                            t += "/";
                            break;
                        case 98:
                            t += "\b";
                            break;
                        case 102:
                            t += "\f";
                            break;
                        case 110:
                            t += "\n";
                            break;
                        case 114:
                            t += "\r";
                            break;
                        case 116:
                            t += "\t";
                            break;
                        case 117:
                            const e = g(4, !0);
                            e >= 0 ? t += String.fromCharCode(e) : d = 4;
                            break;
                        default: d = 5;
                    }
                    o = n;
                }
            } return t; }(), u = 10;
            case 47:
                const o = n - 1;
                if (47 === e.charCodeAt(n + 1)) {
                    for (n += 2; n < r && !i(e.charCodeAt(n));)
                        n++;
                    return s = e.substring(o, n), u = 12;
                }
                if (42 === e.charCodeAt(n + 1)) {
                    n += 2;
                    const t = r - 1;
                    let a = !1;
                    for (; n < t;) {
                        const t = e.charCodeAt(n);
                        if (42 === t && 47 === e.charCodeAt(n + 1)) {
                            n += 2, a = !0;
                            break;
                        }
                        n++, i(t) && (13 === t && 10 === e.charCodeAt(n) && n++, l++, p = n);
                    }
                    return a || (n++, d = 1), s = e.substring(o, n), u = 13;
                }
                return s += String.fromCharCode(t), n++, u = 16;
            case 45: if (s += String.fromCharCode(t), n++, n === r || !a(e.charCodeAt(n)))
                return u = 16;
            case 48:
            case 49:
            case 50:
            case 51:
            case 52:
            case 53:
            case 54:
            case 55:
            case 56:
            case 57: return s += function () { let t = n; if (48 === e.charCodeAt(n))
                n++;
            else
                for (n++; n < e.length && a(e.charCodeAt(n));)
                    n++; if (n < e.length && 46 === e.charCodeAt(n)) {
                if (n++, !(n < e.length && a(e.charCodeAt(n))))
                    return d = 3, e.substring(t, n);
                for (n++; n < e.length && a(e.charCodeAt(n));)
                    n++;
            } let r = n; if (n < e.length && (69 === e.charCodeAt(n) || 101 === e.charCodeAt(n)))
                if (n++, (n < e.length && 43 === e.charCodeAt(n) || 45 === e.charCodeAt(n)) && n++, n < e.length && a(e.charCodeAt(n))) {
                    for (n++; n < e.length && a(e.charCodeAt(n));)
                        n++;
                    r = n;
                }
                else
                    d = 3; return e.substring(t, r); }(), u = 11;
            default:
                for (; n < r && y(t);)
                    n++, t = e.charCodeAt(n);
                if (c !== n) {
                    switch (s = e.substring(c, n), s) {
                        case "true": return u = 8;
                        case "false": return u = 9;
                        case "null": return u = 7;
                    }
                    return u = 16;
                }
                return s += String.fromCharCode(t), n++, u = 16;
        } } function y(e) { if (o(e) || i(e))
            return !1; switch (e) {
            case 125:
            case 93:
            case 123:
            case 91:
            case 34:
            case 58:
            case 44:
            case 47: return !1;
        } return !0; } return { setPosition: function (e) { n = e, s = "", c = 0, u = 16, d = 0; }, getPosition: () => n, scan: t ? function () { let e; do {
                e = m();
            } while (e >= 12 && e <= 15); return e; } : m, getToken: () => u, getTokenValue: () => s, getTokenOffset: () => c, getTokenLength: () => n - c, getTokenStartLine: () => f, getTokenStartCharacter: () => c - h, getTokenError: () => d }; }
        function o(e) { return 32 === e || 9 === e; }
        function i(e) { return 10 === e || 13 === e; }
        function a(e) { return e >= 48 && e <= 57; }
        var s, c;
        function u(e, t) { let r = ""; for (let n = 0; n < t; n++)
            r += e; return r; }
        function l(e, t) { return -1 !== "\r\n".indexOf(e.charAt(t)); }
        r.r(t), r.d(t, { ClientCapabilities: () => He, CodeAction: () => je, CodeActionContext: () => Ee, CodeActionKind: () => Oe, Color: () => j, ColorInformation: () => T, ColorPresentation: () => C, Command: () => L, CompletionItem: () => fe, CompletionItemKind: () => ie, CompletionItemTag: () => se, CompletionList: () => pe, Diagnostic: () => R, DiagnosticSeverity: () => N, DocumentHighlight: () => ve, DocumentHighlightKind: () => ye, DocumentLink: () => Pe, DocumentSymbol: () => we, ErrorCode: () => Je, FoldingRange: () => I, FoldingRangeKind: () => P, Hover: () => de, InsertTextFormat: () => ae, Location: () => k, MarkedString: () => he, MarkupContent: () => oe, MarkupKind: () => ne, Position: () => w, Range: () => O, SelectionRange: () => Ie, SymbolInformation: () => Se, SymbolKind: () => be, TextDocument: () => Xe.TextDocument, TextDocumentEdit: () => B, TextEdit: () => D, VersionedTextDocumentIdentifier: () => ee, WorkspaceEdit: () => G, getLanguageService: () => fr }), function (e) { e[e.lineFeed = 10] = "lineFeed", e[e.carriageReturn = 13] = "carriageReturn", e[e.space = 32] = "space", e[e._0 = 48] = "_0", e[e._1 = 49] = "_1", e[e._2 = 50] = "_2", e[e._3 = 51] = "_3", e[e._4 = 52] = "_4", e[e._5 = 53] = "_5", e[e._6 = 54] = "_6", e[e._7 = 55] = "_7", e[e._8 = 56] = "_8", e[e._9 = 57] = "_9", e[e.a = 97] = "a", e[e.b = 98] = "b", e[e.c = 99] = "c", e[e.d = 100] = "d", e[e.e = 101] = "e", e[e.f = 102] = "f", e[e.g = 103] = "g", e[e.h = 104] = "h", e[e.i = 105] = "i", e[e.j = 106] = "j", e[e.k = 107] = "k", e[e.l = 108] = "l", e[e.m = 109] = "m", e[e.n = 110] = "n", e[e.o = 111] = "o", e[e.p = 112] = "p", e[e.q = 113] = "q", e[e.r = 114] = "r", e[e.s = 115] = "s", e[e.t = 116] = "t", e[e.u = 117] = "u", e[e.v = 118] = "v", e[e.w = 119] = "w", e[e.x = 120] = "x", e[e.y = 121] = "y", e[e.z = 122] = "z", e[e.A = 65] = "A", e[e.B = 66] = "B", e[e.C = 67] = "C", e[e.D = 68] = "D", e[e.E = 69] = "E", e[e.F = 70] = "F", e[e.G = 71] = "G", e[e.H = 72] = "H", e[e.I = 73] = "I", e[e.J = 74] = "J", e[e.K = 75] = "K", e[e.L = 76] = "L", e[e.M = 77] = "M", e[e.N = 78] = "N", e[e.O = 79] = "O", e[e.P = 80] = "P", e[e.Q = 81] = "Q", e[e.R = 82] = "R", e[e.S = 83] = "S", e[e.T = 84] = "T", e[e.U = 85] = "U", e[e.V = 86] = "V", e[e.W = 87] = "W", e[e.X = 88] = "X", e[e.Y = 89] = "Y", e[e.Z = 90] = "Z", e[e.asterisk = 42] = "asterisk", e[e.backslash = 92] = "backslash", e[e.closeBrace = 125] = "closeBrace", e[e.closeBracket = 93] = "closeBracket", e[e.colon = 58] = "colon", e[e.comma = 44] = "comma", e[e.dot = 46] = "dot", e[e.doubleQuote = 34] = "doubleQuote", e[e.minus = 45] = "minus", e[e.openBrace = 123] = "openBrace", e[e.openBracket = 91] = "openBracket", e[e.plus = 43] = "plus", e[e.slash = 47] = "slash", e[e.formFeed = 12] = "formFeed", e[e.tab = 9] = "tab"; }(s || (s = {})), function (e) { e.DEFAULT = { allowTrailingComma: !1 }; }(c || (c = {}));
        const f = n;
        var p, h;
        !function (e) { e[e.None = 0] = "None", e[e.UnexpectedEndOfComment = 1] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 2] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 3] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 4] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 5] = "InvalidEscapeCharacter", e[e.InvalidCharacter = 6] = "InvalidCharacter"; }(p || (p = {})), function (e) { e[e.OpenBraceToken = 1] = "OpenBraceToken", e[e.CloseBraceToken = 2] = "CloseBraceToken", e[e.OpenBracketToken = 3] = "OpenBracketToken", e[e.CloseBracketToken = 4] = "CloseBracketToken", e[e.CommaToken = 5] = "CommaToken", e[e.ColonToken = 6] = "ColonToken", e[e.NullKeyword = 7] = "NullKeyword", e[e.TrueKeyword = 8] = "TrueKeyword", e[e.FalseKeyword = 9] = "FalseKeyword", e[e.StringLiteral = 10] = "StringLiteral", e[e.NumericLiteral = 11] = "NumericLiteral", e[e.LineCommentTrivia = 12] = "LineCommentTrivia", e[e.BlockCommentTrivia = 13] = "BlockCommentTrivia", e[e.LineBreakTrivia = 14] = "LineBreakTrivia", e[e.Trivia = 15] = "Trivia", e[e.Unknown = 16] = "Unknown", e[e.EOF = 17] = "EOF"; }(h || (h = {}));
        const d = function (e, t = [], r = c.DEFAULT) { let o = null, i = []; const a = []; function s(e) { Array.isArray(i) ? i.push(e) : null !== o && (i[o] = e); } return function (e, t, r = c.DEFAULT) { const o = n(e, !1), i = []; function a(e) { return e ? () => e(o.getTokenOffset(), o.getTokenLength(), o.getTokenStartLine(), o.getTokenStartCharacter()) : () => !0; } function s(e) { return e ? () => e(o.getTokenOffset(), o.getTokenLength(), o.getTokenStartLine(), o.getTokenStartCharacter(), (() => i.slice())) : () => !0; } function u(e) { return e ? t => e(t, o.getTokenOffset(), o.getTokenLength(), o.getTokenStartLine(), o.getTokenStartCharacter()) : () => !0; } function l(e) { return e ? t => e(t, o.getTokenOffset(), o.getTokenLength(), o.getTokenStartLine(), o.getTokenStartCharacter(), (() => i.slice())) : () => !0; } const f = s(t.onObjectBegin), p = l(t.onObjectProperty), h = a(t.onObjectEnd), d = s(t.onArrayBegin), g = a(t.onArrayEnd), m = l(t.onLiteralValue), y = u(t.onSeparator), v = a(t.onComment), b = u(t.onError), x = r && r.disallowComments, S = r && r.allowTrailingComma; function A() { for (;;) {
            const e = o.scan();
            switch (o.getTokenError()) {
                case 4:
                    w(14);
                    break;
                case 5:
                    w(15);
                    break;
                case 3:
                    w(13);
                    break;
                case 1:
                    x || w(11);
                    break;
                case 2:
                    w(12);
                    break;
                case 6: w(16);
            }
            switch (e) {
                case 12:
                case 13:
                    x ? w(10) : v();
                    break;
                case 16:
                    w(1);
                    break;
                case 15:
                case 14: break;
                default: return e;
            }
        } } function w(e, t = [], r = []) { if (b(e), t.length + r.length > 0) {
            let e = o.getToken();
            for (; 17 !== e;) {
                if (-1 !== t.indexOf(e)) {
                    A();
                    break;
                }
                if (-1 !== r.indexOf(e))
                    break;
                e = A();
            }
        } } function O(e) { const t = o.getTokenValue(); return e ? m(t) : (p(t), i.push(t)), A(), !0; } A(), 17 === o.getToken() ? !!r.allowEmptyContent || w(4, [], []) : function e() { switch (o.getToken()) {
            case 3: return function () { d(), A(); let t = !0, r = !1; for (; 4 !== o.getToken() && 17 !== o.getToken();) {
                if (5 === o.getToken()) {
                    if (r || w(4, [], []), y(","), A(), 4 === o.getToken() && S)
                        break;
                }
                else
                    r && w(6, [], []);
                t ? (i.push(0), t = !1) : i[i.length - 1]++, e() || w(4, [], [4, 5]), r = !0;
            } return g(), t || i.pop(), 4 !== o.getToken() ? w(8, [4], []) : A(), !0; }();
            case 1: return function () { f(), A(); let t = !1; for (; 2 !== o.getToken() && 17 !== o.getToken();) {
                if (5 === o.getToken()) {
                    if (t || w(4, [], []), y(","), A(), 2 === o.getToken() && S)
                        break;
                }
                else
                    t && w(6, [], []);
                (10 !== o.getToken() ? (w(3, [], [2, 5]), 0) : (O(!1), 6 === o.getToken() ? (y(":"), A(), e() || w(4, [], [2, 5])) : w(5, [], [2, 5]), i.pop(), 1)) || w(4, [], [2, 5]), t = !0;
            } return h(), 2 !== o.getToken() ? w(7, [2], []) : A(), !0; }();
            case 10: return O(!0);
            default: return function () { switch (o.getToken()) {
                case 11:
                    const e = o.getTokenValue();
                    let t = Number(e);
                    isNaN(t) && (w(2), t = 0), m(t);
                    break;
                case 7:
                    m(null);
                    break;
                case 8:
                    m(!0);
                    break;
                case 9:
                    m(!1);
                    break;
                default: return !1;
            } return A(), !0; }();
        } }() ? 17 !== o.getToken() && w(9, [], []) : w(4, [], []); }(e, { onObjectBegin: () => { const e = {}; s(e), a.push(i), i = e, o = null; }, onObjectProperty: e => { o = e; }, onObjectEnd: () => { i = a.pop(); }, onArrayBegin: () => { const e = []; s(e), a.push(i), i = e, o = null; }, onArrayEnd: () => { i = a.pop(); }, onLiteralValue: s, onError: (e, r, n) => { t.push({ error: e, offset: r, length: n }); } }, r), i[0]; }, g = function e(t, r, n = !1) { if (function (e, t, r = !1) { return t >= e.offset && t < e.offset + e.length || r && t === e.offset + e.length; }(t, r, n)) {
            const o = t.children;
            if (Array.isArray(o))
                for (let t = 0; t < o.length && o[t].offset <= r; t++) {
                    const i = e(o[t], r, n);
                    if (i)
                        return i;
                }
            return t;
        } }, m = function e(t) { if (!t.parent || !t.parent.children)
            return []; const r = e(t.parent); if ("property" === t.parent.type) {
            const e = t.parent.children[0].value;
            r.push(e);
        }
        else if ("array" === t.parent.type) {
            const e = t.parent.children.indexOf(t);
            -1 !== e && r.push(e);
        } return r; }, y = function e(t) { switch (t.type) {
            case "array": return t.children.map(e);
            case "object":
                const r = Object.create(null);
                for (let n of t.children) {
                    const t = n.children[1];
                    t && (r[n.children[0].value] = e(t));
                }
                return r;
            case "null":
            case "string":
            case "number":
            case "boolean": return t.value;
            default: return;
        } };
        var v, b, x, S, A, w, O, k, E, j, T, C, P, I, M, N, F, _, R, L, D, V, U, $, B, q, W, z, G;
        function K(e, t) { if (e === t)
            return !0; if (null == e || null == t)
            return !1; if (typeof e != typeof t)
            return !1; if ("object" != typeof e)
            return !1; if (Array.isArray(e) !== Array.isArray(t))
            return !1; var r, n; if (Array.isArray(e)) {
            if (e.length !== t.length)
                return !1;
            for (r = 0; r < e.length; r++)
                if (!K(e[r], t[r]))
                    return !1;
        }
        else {
            var o = [];
            for (n in e)
                o.push(n);
            o.sort();
            var i = [];
            for (n in t)
                i.push(n);
            if (i.sort(), !K(o, i))
                return !1;
            for (r = 0; r < o.length; r++)
                if (!K(e[o[r]], t[o[r]]))
                    return !1;
        } return !0; }
        function J(e) { return "number" == typeof e; }
        function H(e) { return void 0 !== e; }
        function X(e) { return "boolean" == typeof e; }
        function Z(e, t) { var r = e.length - t.length; return r > 0 ? e.lastIndexOf(t) === r : 0 === r && e === t; }
        function Y(e) { var t = ""; (function (e, t) { if (e.length < t.length)
            return !1; for (var r = 0; r < t.length; r++)
            if (e[r] !== t[r])
                return !1; return !0; })(e, "(?i)") && (e = e.substring(4), t = "i"); try {
            return new RegExp(e, t + "u");
        }
        catch (r) {
            try {
                return new RegExp(e, t);
            }
            catch (e) {
                return;
            }
        } }
        !function (e) { e[e.InvalidSymbol = 1] = "InvalidSymbol", e[e.InvalidNumberFormat = 2] = "InvalidNumberFormat", e[e.PropertyNameExpected = 3] = "PropertyNameExpected", e[e.ValueExpected = 4] = "ValueExpected", e[e.ColonExpected = 5] = "ColonExpected", e[e.CommaExpected = 6] = "CommaExpected", e[e.CloseBraceExpected = 7] = "CloseBraceExpected", e[e.CloseBracketExpected = 8] = "CloseBracketExpected", e[e.EndOfFileExpected = 9] = "EndOfFileExpected", e[e.InvalidCommentToken = 10] = "InvalidCommentToken", e[e.UnexpectedEndOfComment = 11] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 12] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 13] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 14] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 15] = "InvalidEscapeCharacter", e[e.InvalidCharacter = 16] = "InvalidCharacter"; }(v || (v = {})), function (e) { e.is = function (e) { return "string" == typeof e; }; }(b || (b = {})), function (e) { e.is = function (e) { return "string" == typeof e; }; }(x || (x = {})), function (e) { e.MIN_VALUE = -2147483648, e.MAX_VALUE = 2147483647, e.is = function (t) { return "number" == typeof t && e.MIN_VALUE <= t && t <= e.MAX_VALUE; }; }(S || (S = {})), function (e) { e.MIN_VALUE = 0, e.MAX_VALUE = 2147483647, e.is = function (t) { return "number" == typeof t && e.MIN_VALUE <= t && t <= e.MAX_VALUE; }; }(A || (A = {})), function (e) { e.create = function (e, t) { return e === Number.MAX_VALUE && (e = A.MAX_VALUE), t === Number.MAX_VALUE && (t = A.MAX_VALUE), { line: e, character: t }; }, e.is = function (e) { var t = e; return Ge.objectLiteral(t) && Ge.uinteger(t.line) && Ge.uinteger(t.character); }; }(w || (w = {})), function (e) { e.create = function (e, t, r, n) { if (Ge.uinteger(e) && Ge.uinteger(t) && Ge.uinteger(r) && Ge.uinteger(n))
            return { start: w.create(e, t), end: w.create(r, n) }; if (w.is(e) && w.is(t))
            return { start: e, end: t }; throw new Error("Range#create called with invalid arguments[".concat(e, ", ").concat(t, ", ").concat(r, ", ").concat(n, "]")); }, e.is = function (e) { var t = e; return Ge.objectLiteral(t) && w.is(t.start) && w.is(t.end); }; }(O || (O = {})), function (e) { e.create = function (e, t) { return { uri: e, range: t }; }, e.is = function (e) { var t = e; return Ge.objectLiteral(t) && O.is(t.range) && (Ge.string(t.uri) || Ge.undefined(t.uri)); }; }(k || (k = {})), function (e) { e.create = function (e, t, r, n) { return { targetUri: e, targetRange: t, targetSelectionRange: r, originSelectionRange: n }; }, e.is = function (e) { var t = e; return Ge.objectLiteral(t) && O.is(t.targetRange) && Ge.string(t.targetUri) && O.is(t.targetSelectionRange) && (O.is(t.originSelectionRange) || Ge.undefined(t.originSelectionRange)); }; }(E || (E = {})), function (e) { e.create = function (e, t, r, n) { return { red: e, green: t, blue: r, alpha: n }; }, e.is = function (e) { var t = e; return Ge.objectLiteral(t) && Ge.numberRange(t.red, 0, 1) && Ge.numberRange(t.green, 0, 1) && Ge.numberRange(t.blue, 0, 1) && Ge.numberRange(t.alpha, 0, 1); }; }(j || (j = {})), function (e) { e.create = function (e, t) { return { range: e, color: t }; }, e.is = function (e) { var t = e; return Ge.objectLiteral(t) && O.is(t.range) && j.is(t.color); }; }(T || (T = {})), function (e) { e.create = function (e, t, r) { return { label: e, textEdit: t, additionalTextEdits: r }; }, e.is = function (e) { var t = e; return Ge.objectLiteral(t) && Ge.string(t.label) && (Ge.undefined(t.textEdit) || D.is(t)) && (Ge.undefined(t.additionalTextEdits) || Ge.typedArray(t.additionalTextEdits, D.is)); }; }(C || (C = {})), function (e) { e.Comment = "comment", e.Imports = "imports", e.Region = "region"; }(P || (P = {})), function (e) { e.create = function (e, t, r, n, o, i) { var a = { startLine: e, endLine: t }; return Ge.defined(r) && (a.startCharacter = r), Ge.defined(n) && (a.endCharacter = n), Ge.defined(o) && (a.kind = o), Ge.defined(i) && (a.collapsedText = i), a; }, e.is = function (e) { var t = e; return Ge.objectLiteral(t) && Ge.uinteger(t.startLine) && Ge.uinteger(t.startLine) && (Ge.undefined(t.startCharacter) || Ge.uinteger(t.startCharacter)) && (Ge.undefined(t.endCharacter) || Ge.uinteger(t.endCharacter)) && (Ge.undefined(t.kind) || Ge.string(t.kind)); }; }(I || (I = {})), function (e) { e.create = function (e, t) { return { location: e, message: t }; }, e.is = function (e) { var t = e; return Ge.defined(t) && k.is(t.location) && Ge.string(t.message); }; }(M || (M = {})), function (e) { e.Error = 1, e.Warning = 2, e.Information = 3, e.Hint = 4; }(N || (N = {})), function (e) { e.Unnecessary = 1, e.Deprecated = 2; }(F || (F = {})), function (e) { e.is = function (e) { var t = e; return Ge.objectLiteral(t) && Ge.string(t.href); }; }(_ || (_ = {})), function (e) { e.create = function (e, t, r, n, o, i) { var a = { range: e, message: t }; return Ge.defined(r) && (a.severity = r), Ge.defined(n) && (a.code = n), Ge.defined(o) && (a.source = o), Ge.defined(i) && (a.relatedInformation = i), a; }, e.is = function (e) { var t, r = e; return Ge.defined(r) && O.is(r.range) && Ge.string(r.message) && (Ge.number(r.severity) || Ge.undefined(r.severity)) && (Ge.integer(r.code) || Ge.string(r.code) || Ge.undefined(r.code)) && (Ge.undefined(r.codeDescription) || Ge.string(null === (t = r.codeDescription) || void 0 === t ? void 0 : t.href)) && (Ge.string(r.source) || Ge.undefined(r.source)) && (Ge.undefined(r.relatedInformation) || Ge.typedArray(r.relatedInformation, M.is)); }; }(R || (R = {})), function (e) { e.create = function (e, t) { for (var r = [], n = 2; n < arguments.length; n++)
            r[n - 2] = arguments[n]; var o = { title: e, command: t }; return Ge.defined(r) && r.length > 0 && (o.arguments = r), o; }, e.is = function (e) { var t = e; return Ge.defined(t) && Ge.string(t.title) && Ge.string(t.command); }; }(L || (L = {})), function (e) { e.replace = function (e, t) { return { range: e, newText: t }; }, e.insert = function (e, t) { return { range: { start: e, end: e }, newText: t }; }, e.del = function (e) { return { range: e, newText: "" }; }, e.is = function (e) { var t = e; return Ge.objectLiteral(t) && Ge.string(t.newText) && O.is(t.range); }; }(D || (D = {})), function (e) { e.create = function (e, t, r) { var n = { label: e }; return void 0 !== t && (n.needsConfirmation = t), void 0 !== r && (n.description = r), n; }, e.is = function (e) { var t = e; return Ge.objectLiteral(t) && Ge.string(t.label) && (Ge.boolean(t.needsConfirmation) || void 0 === t.needsConfirmation) && (Ge.string(t.description) || void 0 === t.description); }; }(V || (V = {})), function (e) { e.is = function (e) { var t = e; return Ge.string(t); }; }(U || (U = {})), function (e) { e.replace = function (e, t, r) { return { range: e, newText: t, annotationId: r }; }, e.insert = function (e, t, r) { return { range: { start: e, end: e }, newText: t, annotationId: r }; }, e.del = function (e, t) { return { range: e, newText: "", annotationId: t }; }, e.is = function (e) { var t = e; return D.is(t) && (V.is(t.annotationId) || U.is(t.annotationId)); }; }($ || ($ = {})), function (e) { e.create = function (e, t) { return { textDocument: e, edits: t }; }, e.is = function (e) { var t = e; return Ge.defined(t) && te.is(t.textDocument) && Array.isArray(t.edits); }; }(B || (B = {})), function (e) { e.create = function (e, t, r) { var n = { kind: "create", uri: e }; return void 0 === t || void 0 === t.overwrite && void 0 === t.ignoreIfExists || (n.options = t), void 0 !== r && (n.annotationId = r), n; }, e.is = function (e) { var t = e; return t && "create" === t.kind && Ge.string(t.uri) && (void 0 === t.options || (void 0 === t.options.overwrite || Ge.boolean(t.options.overwrite)) && (void 0 === t.options.ignoreIfExists || Ge.boolean(t.options.ignoreIfExists))) && (void 0 === t.annotationId || U.is(t.annotationId)); }; }(q || (q = {})), function (e) { e.create = function (e, t, r, n) { var o = { kind: "rename", oldUri: e, newUri: t }; return void 0 === r || void 0 === r.overwrite && void 0 === r.ignoreIfExists || (o.options = r), void 0 !== n && (o.annotationId = n), o; }, e.is = function (e) { var t = e; return t && "rename" === t.kind && Ge.string(t.oldUri) && Ge.string(t.newUri) && (void 0 === t.options || (void 0 === t.options.overwrite || Ge.boolean(t.options.overwrite)) && (void 0 === t.options.ignoreIfExists || Ge.boolean(t.options.ignoreIfExists))) && (void 0 === t.annotationId || U.is(t.annotationId)); }; }(W || (W = {})), function (e) { e.create = function (e, t, r) { var n = { kind: "delete", uri: e }; return void 0 === t || void 0 === t.recursive && void 0 === t.ignoreIfNotExists || (n.options = t), void 0 !== r && (n.annotationId = r), n; }, e.is = function (e) { var t = e; return t && "delete" === t.kind && Ge.string(t.uri) && (void 0 === t.options || (void 0 === t.options.recursive || Ge.boolean(t.options.recursive)) && (void 0 === t.options.ignoreIfNotExists || Ge.boolean(t.options.ignoreIfNotExists))) && (void 0 === t.annotationId || U.is(t.annotationId)); }; }(z || (z = {})), function (e) { e.is = function (e) { var t = e; return t && (void 0 !== t.changes || void 0 !== t.documentChanges) && (void 0 === t.documentChanges || t.documentChanges.every((function (e) { return Ge.string(e.kind) ? q.is(e) || W.is(e) || z.is(e) : B.is(e); }))); }; }(G || (G = {}));
        var Q, ee, te, re, ne, oe, ie, ae, se, ce, ue, le, fe, pe, he, de, ge, me, ye, ve, be, xe, Se, Ae, we, Oe, ke, Ee, je, Te, Ce, Pe, Ie, Me, Ne, Fe, _e, Re, Le, De, Ve, Ue, $e, Be, qe, We = function () { function e(e, t) { this.edits = e, this.changeAnnotations = t; } return e.prototype.insert = function (e, t, r) { var n, o; if (void 0 === r ? n = D.insert(e, t) : U.is(r) ? (o = r, n = $.insert(e, t, r)) : (this.assertChangeAnnotations(this.changeAnnotations), o = this.changeAnnotations.manage(r), n = $.insert(e, t, o)), this.edits.push(n), void 0 !== o)
            return o; }, e.prototype.replace = function (e, t, r) { var n, o; if (void 0 === r ? n = D.replace(e, t) : U.is(r) ? (o = r, n = $.replace(e, t, r)) : (this.assertChangeAnnotations(this.changeAnnotations), o = this.changeAnnotations.manage(r), n = $.replace(e, t, o)), this.edits.push(n), void 0 !== o)
            return o; }, e.prototype.delete = function (e, t) { var r, n; if (void 0 === t ? r = D.del(e) : U.is(t) ? (n = t, r = $.del(e, t)) : (this.assertChangeAnnotations(this.changeAnnotations), n = this.changeAnnotations.manage(t), r = $.del(e, n)), this.edits.push(r), void 0 !== n)
            return n; }, e.prototype.add = function (e) { this.edits.push(e); }, e.prototype.all = function () { return this.edits; }, e.prototype.clear = function () { this.edits.splice(0, this.edits.length); }, e.prototype.assertChangeAnnotations = function (e) { if (void 0 === e)
            throw new Error("Text edit change is not configured to manage change annotations."); }, e; }(), ze = function () { function e(e) { this._annotations = void 0 === e ? Object.create(null) : e, this._counter = 0, this._size = 0; } return e.prototype.all = function () { return this._annotations; }, Object.defineProperty(e.prototype, "size", { get: function () { return this._size; }, enumerable: !1, configurable: !0 }), e.prototype.manage = function (e, t) { var r; if (U.is(e) ? r = e : (r = this.nextId(), t = e), void 0 !== this._annotations[r])
            throw new Error("Id ".concat(r, " is already in use.")); if (void 0 === t)
            throw new Error("No annotation provided for id ".concat(r)); return this._annotations[r] = t, this._size++, r; }, e.prototype.nextId = function () { return this._counter++, this._counter.toString(); }, e; }();
        !function () { function e(e) { var t = this; this._textEditChanges = Object.create(null), void 0 !== e ? (this._workspaceEdit = e, e.documentChanges ? (this._changeAnnotations = new ze(e.changeAnnotations), e.changeAnnotations = this._changeAnnotations.all(), e.documentChanges.forEach((function (e) { if (B.is(e)) {
            var r = new We(e.edits, t._changeAnnotations);
            t._textEditChanges[e.textDocument.uri] = r;
        } }))) : e.changes && Object.keys(e.changes).forEach((function (r) { var n = new We(e.changes[r]); t._textEditChanges[r] = n; }))) : this._workspaceEdit = {}; } Object.defineProperty(e.prototype, "edit", { get: function () { return this.initDocumentChanges(), void 0 !== this._changeAnnotations && (0 === this._changeAnnotations.size ? this._workspaceEdit.changeAnnotations = void 0 : this._workspaceEdit.changeAnnotations = this._changeAnnotations.all()), this._workspaceEdit; }, enumerable: !1, configurable: !0 }), e.prototype.getTextEditChange = function (e) { if (te.is(e)) {
            if (this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges)
                throw new Error("Workspace edit is not configured for document changes.");
            var t = { uri: e.uri, version: e.version };
            if (!(n = this._textEditChanges[t.uri])) {
                var r = { textDocument: t, edits: o = [] };
                this._workspaceEdit.documentChanges.push(r), n = new We(o, this._changeAnnotations), this._textEditChanges[t.uri] = n;
            }
            return n;
        } if (this.initChanges(), void 0 === this._workspaceEdit.changes)
            throw new Error("Workspace edit is not configured for normal text edit changes."); var n; if (!(n = this._textEditChanges[e])) {
            var o = [];
            this._workspaceEdit.changes[e] = o, n = new We(o), this._textEditChanges[e] = n;
        } return n; }, e.prototype.initDocumentChanges = function () { void 0 === this._workspaceEdit.documentChanges && void 0 === this._workspaceEdit.changes && (this._changeAnnotations = new ze, this._workspaceEdit.documentChanges = [], this._workspaceEdit.changeAnnotations = this._changeAnnotations.all()); }, e.prototype.initChanges = function () { void 0 === this._workspaceEdit.documentChanges && void 0 === this._workspaceEdit.changes && (this._workspaceEdit.changes = Object.create(null)); }, e.prototype.createFile = function (e, t, r) { if (this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges)
            throw new Error("Workspace edit is not configured for document changes."); var n, o, i; if (V.is(t) || U.is(t) ? n = t : r = t, void 0 === n ? o = q.create(e, r) : (i = U.is(n) ? n : this._changeAnnotations.manage(n), o = q.create(e, r, i)), this._workspaceEdit.documentChanges.push(o), void 0 !== i)
            return i; }, e.prototype.renameFile = function (e, t, r, n) { if (this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges)
            throw new Error("Workspace edit is not configured for document changes."); var o, i, a; if (V.is(r) || U.is(r) ? o = r : n = r, void 0 === o ? i = W.create(e, t, n) : (a = U.is(o) ? o : this._changeAnnotations.manage(o), i = W.create(e, t, n, a)), this._workspaceEdit.documentChanges.push(i), void 0 !== a)
            return a; }, e.prototype.deleteFile = function (e, t, r) { if (this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges)
            throw new Error("Workspace edit is not configured for document changes."); var n, o, i; if (V.is(t) || U.is(t) ? n = t : r = t, void 0 === n ? o = z.create(e, r) : (i = U.is(n) ? n : this._changeAnnotations.manage(n), o = z.create(e, r, i)), this._workspaceEdit.documentChanges.push(o), void 0 !== i)
            return i; }; }(), function (e) { e.create = function (e) { return { uri: e }; }, e.is = function (e) { var t = e; return Ge.defined(t) && Ge.string(t.uri); }; }(Q || (Q = {})), function (e) { e.create = function (e, t) { return { uri: e, version: t }; }, e.is = function (e) { var t = e; return Ge.defined(t) && Ge.string(t.uri) && Ge.integer(t.version); }; }(ee || (ee = {})), function (e) { e.create = function (e, t) { return { uri: e, version: t }; }, e.is = function (e) { var t = e; return Ge.defined(t) && Ge.string(t.uri) && (null === t.version || Ge.integer(t.version)); }; }(te || (te = {})), function (e) { e.create = function (e, t, r, n) { return { uri: e, languageId: t, version: r, text: n }; }, e.is = function (e) { var t = e; return Ge.defined(t) && Ge.string(t.uri) && Ge.string(t.languageId) && Ge.integer(t.version) && Ge.string(t.text); }; }(re || (re = {})), function (e) { e.PlainText = "plaintext", e.Markdown = "markdown", e.is = function (t) { var r = t; return r === e.PlainText || r === e.Markdown; }; }(ne || (ne = {})), function (e) { e.is = function (e) { var t = e; return Ge.objectLiteral(e) && ne.is(t.kind) && Ge.string(t.value); }; }(oe || (oe = {})), function (e) { e.Text = 1, e.Method = 2, e.Function = 3, e.Constructor = 4, e.Field = 5, e.Variable = 6, e.Class = 7, e.Interface = 8, e.Module = 9, e.Property = 10, e.Unit = 11, e.Value = 12, e.Enum = 13, e.Keyword = 14, e.Snippet = 15, e.Color = 16, e.File = 17, e.Reference = 18, e.Folder = 19, e.EnumMember = 20, e.Constant = 21, e.Struct = 22, e.Event = 23, e.Operator = 24, e.TypeParameter = 25; }(ie || (ie = {})), function (e) { e.PlainText = 1, e.Snippet = 2; }(ae || (ae = {})), function (e) { e.Deprecated = 1; }(se || (se = {})), function (e) { e.create = function (e, t, r) { return { newText: e, insert: t, replace: r }; }, e.is = function (e) { var t = e; return t && Ge.string(t.newText) && O.is(t.insert) && O.is(t.replace); }; }(ce || (ce = {})), function (e) { e.asIs = 1, e.adjustIndentation = 2; }(ue || (ue = {})), function (e) { e.is = function (e) { var t = e; return t && (Ge.string(t.detail) || void 0 === t.detail) && (Ge.string(t.description) || void 0 === t.description); }; }(le || (le = {})), function (e) { e.create = function (e) { return { label: e }; }; }(fe || (fe = {})), function (e) { e.create = function (e, t) { return { items: e || [], isIncomplete: !!t }; }; }(pe || (pe = {})), function (e) { e.fromPlainText = function (e) { return e.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&"); }, e.is = function (e) { var t = e; return Ge.string(t) || Ge.objectLiteral(t) && Ge.string(t.language) && Ge.string(t.value); }; }(he || (he = {})), function (e) { e.is = function (e) { var t = e; return !!t && Ge.objectLiteral(t) && (oe.is(t.contents) || he.is(t.contents) || Ge.typedArray(t.contents, he.is)) && (void 0 === e.range || O.is(e.range)); }; }(de || (de = {})), function (e) { e.create = function (e, t) { return t ? { label: e, documentation: t } : { label: e }; }; }(ge || (ge = {})), function (e) { e.create = function (e, t) { for (var r = [], n = 2; n < arguments.length; n++)
            r[n - 2] = arguments[n]; var o = { label: e }; return Ge.defined(t) && (o.documentation = t), Ge.defined(r) ? o.parameters = r : o.parameters = [], o; }; }(me || (me = {})), function (e) { e.Text = 1, e.Read = 2, e.Write = 3; }(ye || (ye = {})), function (e) { e.create = function (e, t) { var r = { range: e }; return Ge.number(t) && (r.kind = t), r; }; }(ve || (ve = {})), function (e) { e.File = 1, e.Module = 2, e.Namespace = 3, e.Package = 4, e.Class = 5, e.Method = 6, e.Property = 7, e.Field = 8, e.Constructor = 9, e.Enum = 10, e.Interface = 11, e.Function = 12, e.Variable = 13, e.Constant = 14, e.String = 15, e.Number = 16, e.Boolean = 17, e.Array = 18, e.Object = 19, e.Key = 20, e.Null = 21, e.EnumMember = 22, e.Struct = 23, e.Event = 24, e.Operator = 25, e.TypeParameter = 26; }(be || (be = {})), function (e) { e.Deprecated = 1; }(xe || (xe = {})), function (e) { e.create = function (e, t, r, n, o) { var i = { name: e, kind: t, location: { uri: n, range: r } }; return o && (i.containerName = o), i; }; }(Se || (Se = {})), function (e) { e.create = function (e, t, r, n) { return void 0 !== n ? { name: e, kind: t, location: { uri: r, range: n } } : { name: e, kind: t, location: { uri: r } }; }; }(Ae || (Ae = {})), function (e) { e.create = function (e, t, r, n, o, i) { var a = { name: e, detail: t, kind: r, range: n, selectionRange: o }; return void 0 !== i && (a.children = i), a; }, e.is = function (e) { var t = e; return t && Ge.string(t.name) && Ge.number(t.kind) && O.is(t.range) && O.is(t.selectionRange) && (void 0 === t.detail || Ge.string(t.detail)) && (void 0 === t.deprecated || Ge.boolean(t.deprecated)) && (void 0 === t.children || Array.isArray(t.children)) && (void 0 === t.tags || Array.isArray(t.tags)); }; }(we || (we = {})), function (e) { e.Empty = "", e.QuickFix = "quickfix", e.Refactor = "refactor", e.RefactorExtract = "refactor.extract", e.RefactorInline = "refactor.inline", e.RefactorRewrite = "refactor.rewrite", e.Source = "source", e.SourceOrganizeImports = "source.organizeImports", e.SourceFixAll = "source.fixAll"; }(Oe || (Oe = {})), function (e) { e.Invoked = 1, e.Automatic = 2; }(ke || (ke = {})), function (e) { e.create = function (e, t, r) { var n = { diagnostics: e }; return null != t && (n.only = t), null != r && (n.triggerKind = r), n; }, e.is = function (e) { var t = e; return Ge.defined(t) && Ge.typedArray(t.diagnostics, R.is) && (void 0 === t.only || Ge.typedArray(t.only, Ge.string)) && (void 0 === t.triggerKind || t.triggerKind === ke.Invoked || t.triggerKind === ke.Automatic); }; }(Ee || (Ee = {})), function (e) { e.create = function (e, t, r) { var n = { title: e }, o = !0; return "string" == typeof t ? (o = !1, n.kind = t) : L.is(t) ? n.command = t : n.edit = t, o && void 0 !== r && (n.kind = r), n; }, e.is = function (e) { var t = e; return t && Ge.string(t.title) && (void 0 === t.diagnostics || Ge.typedArray(t.diagnostics, R.is)) && (void 0 === t.kind || Ge.string(t.kind)) && (void 0 !== t.edit || void 0 !== t.command) && (void 0 === t.command || L.is(t.command)) && (void 0 === t.isPreferred || Ge.boolean(t.isPreferred)) && (void 0 === t.edit || G.is(t.edit)); }; }(je || (je = {})), function (e) { e.create = function (e, t) { var r = { range: e }; return Ge.defined(t) && (r.data = t), r; }, e.is = function (e) { var t = e; return Ge.defined(t) && O.is(t.range) && (Ge.undefined(t.command) || L.is(t.command)); }; }(Te || (Te = {})), function (e) { e.create = function (e, t) { return { tabSize: e, insertSpaces: t }; }, e.is = function (e) { var t = e; return Ge.defined(t) && Ge.uinteger(t.tabSize) && Ge.boolean(t.insertSpaces); }; }(Ce || (Ce = {})), function (e) { e.create = function (e, t, r) { return { range: e, target: t, data: r }; }, e.is = function (e) { var t = e; return Ge.defined(t) && O.is(t.range) && (Ge.undefined(t.target) || Ge.string(t.target)); }; }(Pe || (Pe = {})), function (e) { e.create = function (e, t) { return { range: e, parent: t }; }, e.is = function (t) { var r = t; return Ge.objectLiteral(r) && O.is(r.range) && (void 0 === r.parent || e.is(r.parent)); }; }(Ie || (Ie = {})), function (e) { e.namespace = "namespace", e.type = "type", e.class = "class", e.enum = "enum", e.interface = "interface", e.struct = "struct", e.typeParameter = "typeParameter", e.parameter = "parameter", e.variable = "variable", e.property = "property", e.enumMember = "enumMember", e.event = "event", e.function = "function", e.method = "method", e.macro = "macro", e.keyword = "keyword", e.modifier = "modifier", e.comment = "comment", e.string = "string", e.number = "number", e.regexp = "regexp", e.operator = "operator", e.decorator = "decorator"; }(Me || (Me = {})), function (e) { e.declaration = "declaration", e.definition = "definition", e.readonly = "readonly", e.static = "static", e.deprecated = "deprecated", e.abstract = "abstract", e.async = "async", e.modification = "modification", e.documentation = "documentation", e.defaultLibrary = "defaultLibrary"; }(Ne || (Ne = {})), function (e) { e.is = function (e) { var t = e; return Ge.objectLiteral(t) && (void 0 === t.resultId || "string" == typeof t.resultId) && Array.isArray(t.data) && (0 === t.data.length || "number" == typeof t.data[0]); }; }(Fe || (Fe = {})), function (e) { e.create = function (e, t) { return { range: e, text: t }; }, e.is = function (e) { var t = e; return null != t && O.is(t.range) && Ge.string(t.text); }; }(_e || (_e = {})), function (e) { e.create = function (e, t, r) { return { range: e, variableName: t, caseSensitiveLookup: r }; }, e.is = function (e) { var t = e; return null != t && O.is(t.range) && Ge.boolean(t.caseSensitiveLookup) && (Ge.string(t.variableName) || void 0 === t.variableName); }; }(Re || (Re = {})), function (e) { e.create = function (e, t) { return { range: e, expression: t }; }, e.is = function (e) { var t = e; return null != t && O.is(t.range) && (Ge.string(t.expression) || void 0 === t.expression); }; }(Le || (Le = {})), function (e) { e.create = function (e, t) { return { frameId: e, stoppedLocation: t }; }, e.is = function (e) { var t = e; return Ge.defined(t) && O.is(e.stoppedLocation); }; }(De || (De = {})), function (e) { e.Type = 1, e.Parameter = 2, e.is = function (e) { return 1 === e || 2 === e; }; }(Ve || (Ve = {})), function (e) { e.create = function (e) { return { value: e }; }, e.is = function (e) { var t = e; return Ge.objectLiteral(t) && (void 0 === t.tooltip || Ge.string(t.tooltip) || oe.is(t.tooltip)) && (void 0 === t.location || k.is(t.location)) && (void 0 === t.command || L.is(t.command)); }; }(Ue || (Ue = {})), function (e) { e.create = function (e, t, r) { var n = { position: e, label: t }; return void 0 !== r && (n.kind = r), n; }, e.is = function (e) { var t = e; return Ge.objectLiteral(t) && w.is(t.position) && (Ge.string(t.label) || Ge.typedArray(t.label, Ue.is)) && (void 0 === t.kind || Ve.is(t.kind)) && void 0 === t.textEdits || Ge.typedArray(t.textEdits, D.is) && (void 0 === t.tooltip || Ge.string(t.tooltip) || oe.is(t.tooltip)) && (void 0 === t.paddingLeft || Ge.boolean(t.paddingLeft)) && (void 0 === t.paddingRight || Ge.boolean(t.paddingRight)); }; }($e || ($e = {})), function (e) { e.is = function (e) { var t = e; return Ge.objectLiteral(t) && x.is(t.uri) && Ge.string(t.name); }; }(Be || (Be = {})), function (e) { function t(e, r) { if (e.length <= 1)
            return e; var n = e.length / 2 | 0, o = e.slice(0, n), i = e.slice(n); t(o, r), t(i, r); for (var a = 0, s = 0, c = 0; a < o.length && s < i.length;) {
            var u = r(o[a], i[s]);
            e[c++] = u <= 0 ? o[a++] : i[s++];
        } for (; a < o.length;)
            e[c++] = o[a++]; for (; s < i.length;)
            e[c++] = i[s++]; return e; } e.create = function (e, t, r, n) { return new Ke(e, t, r, n); }, e.is = function (e) { var t = e; return !!(Ge.defined(t) && Ge.string(t.uri) && (Ge.undefined(t.languageId) || Ge.string(t.languageId)) && Ge.uinteger(t.lineCount) && Ge.func(t.getText) && Ge.func(t.positionAt) && Ge.func(t.offsetAt)); }, e.applyEdits = function (e, r) { for (var n = e.getText(), o = t(r, (function (e, t) { var r = e.range.start.line - t.range.start.line; return 0 === r ? e.range.start.character - t.range.start.character : r; })), i = n.length, a = o.length - 1; a >= 0; a--) {
            var s = o[a], c = e.offsetAt(s.range.start), u = e.offsetAt(s.range.end);
            if (!(u <= i))
                throw new Error("Overlapping edit");
            n = n.substring(0, c) + s.newText + n.substring(u, n.length), i = c;
        } return n; }; }(qe || (qe = {}));
        var Ge, Ke = function () { function e(e, t, r, n) { this._uri = e, this._languageId = t, this._version = r, this._content = n, this._lineOffsets = void 0; } return Object.defineProperty(e.prototype, "uri", { get: function () { return this._uri; }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "languageId", { get: function () { return this._languageId; }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "version", { get: function () { return this._version; }, enumerable: !1, configurable: !0 }), e.prototype.getText = function (e) { if (e) {
            var t = this.offsetAt(e.start), r = this.offsetAt(e.end);
            return this._content.substring(t, r);
        } return this._content; }, e.prototype.update = function (e, t) { this._content = e.text, this._version = t, this._lineOffsets = void 0; }, e.prototype.getLineOffsets = function () { if (void 0 === this._lineOffsets) {
            for (var e = [], t = this._content, r = !0, n = 0; n < t.length; n++) {
                r && (e.push(n), r = !1);
                var o = t.charAt(n);
                r = "\r" === o || "\n" === o, "\r" === o && n + 1 < t.length && "\n" === t.charAt(n + 1) && n++;
            }
            r && t.length > 0 && e.push(t.length), this._lineOffsets = e;
        } return this._lineOffsets; }, e.prototype.positionAt = function (e) { e = Math.max(Math.min(e, this._content.length), 0); var t = this.getLineOffsets(), r = 0, n = t.length; if (0 === n)
            return w.create(0, e); for (; r < n;) {
            var o = Math.floor((r + n) / 2);
            t[o] > e ? n = o : r = o + 1;
        } var i = r - 1; return w.create(i, e - t[i]); }, e.prototype.offsetAt = function (e) { var t = this.getLineOffsets(); if (e.line >= t.length)
            return this._content.length; if (e.line < 0)
            return 0; var r = t[e.line], n = e.line + 1 < t.length ? t[e.line + 1] : this._content.length; return Math.max(Math.min(r + e.character, n), r); }, Object.defineProperty(e.prototype, "lineCount", { get: function () { return this.getLineOffsets().length; }, enumerable: !1, configurable: !0 }), e; }();
        !function (e) { var t = Object.prototype.toString; e.defined = function (e) { return void 0 !== e; }, e.undefined = function (e) { return void 0 === e; }, e.boolean = function (e) { return !0 === e || !1 === e; }, e.string = function (e) { return "[object String]" === t.call(e); }, e.number = function (e) { return "[object Number]" === t.call(e); }, e.numberRange = function (e, r, n) { return "[object Number]" === t.call(e) && r <= e && e <= n; }, e.integer = function (e) { return "[object Number]" === t.call(e) && -2147483648 <= e && e <= 2147483647; }, e.uinteger = function (e) { return "[object Number]" === t.call(e) && 0 <= e && e <= 2147483647; }, e.func = function (e) { return "[object Function]" === t.call(e); }, e.objectLiteral = function (e) { return null !== e && "object" == typeof e; }, e.typedArray = function (e, t) { return Array.isArray(e) && e.every(t); }; }(Ge || (Ge = {}));
        var Je, He, Xe = r(4881);
        !function (e) { e[e.Undefined = 0] = "Undefined", e[e.EnumValueMismatch = 1] = "EnumValueMismatch", e[e.Deprecated = 2] = "Deprecated", e[e.UnexpectedEndOfComment = 257] = "UnexpectedEndOfComment", e[e.UnexpectedEndOfString = 258] = "UnexpectedEndOfString", e[e.UnexpectedEndOfNumber = 259] = "UnexpectedEndOfNumber", e[e.InvalidUnicode = 260] = "InvalidUnicode", e[e.InvalidEscapeCharacter = 261] = "InvalidEscapeCharacter", e[e.InvalidCharacter = 262] = "InvalidCharacter", e[e.PropertyExpected = 513] = "PropertyExpected", e[e.CommaExpected = 514] = "CommaExpected", e[e.ColonExpected = 515] = "ColonExpected", e[e.ValueExpected = 516] = "ValueExpected", e[e.CommaOrCloseBacketExpected = 517] = "CommaOrCloseBacketExpected", e[e.CommaOrCloseBraceExpected = 518] = "CommaOrCloseBraceExpected", e[e.TrailingComma = 519] = "TrailingComma", e[e.DuplicateKey = 520] = "DuplicateKey", e[e.CommentNotPermitted = 521] = "CommentNotPermitted", e[e.SchemaResolveError = 768] = "SchemaResolveError"; }(Je || (Je = {})), function (e) { e.LATEST = { textDocument: { completion: { completionItem: { documentationFormat: [ne.Markdown, ne.PlainText], commitCharactersSupport: !0 } } } }; }(He || (He = {}));
        var Ze, Ye, Qe = r(7045), et = (Ze = function (e, t) { return Ze = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var r in t)
            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]); }, Ze(e, t); }, function (e, t) { if ("function" != typeof t && null !== t)
            throw new TypeError("Class extends value " + String(t) + " is not a constructor or null"); function r() { this.constructor = e; } Ze(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r); }), tt = Qe.loadMessageBundle(), rt = { "color-hex": { errorMessage: tt("colorHexFormatWarning", "Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA."), pattern: /^#([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$/ }, "date-time": { errorMessage: tt("dateTimeFormatWarning", "String is not a RFC3339 date-time."), pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i }, date: { errorMessage: tt("dateFormatWarning", "String is not a RFC3339 date."), pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i }, time: { errorMessage: tt("timeFormatWarning", "String is not a RFC3339 time."), pattern: /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i }, email: { errorMessage: tt("emailFormatWarning", "String is not an e-mail address."), pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}))$/ }, hostname: { errorMessage: tt("hostnameFormatWarning", "String is not a hostname."), pattern: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i }, ipv4: { errorMessage: tt("ipv4FormatWarning", "String is not an IPv4 address."), pattern: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/ }, ipv6: { errorMessage: tt("ipv6FormatWarning", "String is not an IPv6 address."), pattern: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i } }, nt = function () { function e(e, t, r) { void 0 === r && (r = 0), this.offset = t, this.length = r, this.parent = e; } return Object.defineProperty(e.prototype, "children", { get: function () { return []; }, enumerable: !1, configurable: !0 }), e.prototype.toString = function () { return "type: " + this.type + " (" + this.offset + "/" + this.length + ")" + (this.parent ? " parent: {" + this.parent.toString() + "}" : ""); }, e; }(), ot = function (e) { function t(t, r) { var n = e.call(this, t, r) || this; return n.type = "null", n.value = null, n; } return et(t, e), t; }(nt), it = function (e) { function t(t, r, n) { var o = e.call(this, t, n) || this; return o.type = "boolean", o.value = r, o; } return et(t, e), t; }(nt), at = function (e) { function t(t, r) { var n = e.call(this, t, r) || this; return n.type = "array", n.items = [], n; } return et(t, e), Object.defineProperty(t.prototype, "children", { get: function () { return this.items; }, enumerable: !1, configurable: !0 }), t; }(nt), st = function (e) { function t(t, r) { var n = e.call(this, t, r) || this; return n.type = "number", n.isInteger = !0, n.value = Number.NaN, n; } return et(t, e), t; }(nt), ct = function (e) { function t(t, r, n) { var o = e.call(this, t, r, n) || this; return o.type = "string", o.value = "", o; } return et(t, e), t; }(nt), ut = function (e) { function t(t, r, n) { var o = e.call(this, t, r) || this; return o.type = "property", o.colonOffset = -1, o.keyNode = n, o; } return et(t, e), Object.defineProperty(t.prototype, "children", { get: function () { return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode]; }, enumerable: !1, configurable: !0 }), t; }(nt), lt = function (e) { function t(t, r) { var n = e.call(this, t, r) || this; return n.type = "object", n.properties = [], n; } return et(t, e), Object.defineProperty(t.prototype, "children", { get: function () { return this.properties; }, enumerable: !1, configurable: !0 }), t; }(nt);
        function ft(e) { return X(e) ? e ? {} : { not: {} } : e; }
        !function (e) { e[e.Key = 0] = "Key", e[e.Enum = 1] = "Enum"; }(Ye || (Ye = {}));
        var pt = function () { function e(e, t) { void 0 === e && (e = -1), this.focusOffset = e, this.exclude = t, this.schemas = []; } return e.prototype.add = function (e) { this.schemas.push(e); }, e.prototype.merge = function (e) { Array.prototype.push.apply(this.schemas, e.schemas); }, e.prototype.include = function (e) { return (-1 === this.focusOffset || yt(e, this.focusOffset)) && e !== this.exclude; }, e.prototype.newSub = function () { return new e(-1, this.exclude); }, e; }(), ht = function () { function e() { } return Object.defineProperty(e.prototype, "schemas", { get: function () { return []; }, enumerable: !1, configurable: !0 }), e.prototype.add = function (e) { }, e.prototype.merge = function (e) { }, e.prototype.include = function (e) { return !0; }, e.prototype.newSub = function () { return this; }, e.instance = new e, e; }(), dt = function () { function e() { this.problems = [], this.propertiesMatches = 0, this.propertiesValueMatches = 0, this.primaryValueMatches = 0, this.enumValueMatch = !1, this.enumValues = void 0; } return e.prototype.hasProblems = function () { return !!this.problems.length; }, e.prototype.mergeAll = function (e) { for (var t = 0, r = e; t < r.length; t++) {
            var n = r[t];
            this.merge(n);
        } }, e.prototype.merge = function (e) { this.problems = this.problems.concat(e.problems); }, e.prototype.mergeEnumValues = function (e) { if (!this.enumValueMatch && !e.enumValueMatch && this.enumValues && e.enumValues) {
            this.enumValues = this.enumValues.concat(e.enumValues);
            for (var t = 0, r = this.problems; t < r.length; t++) {
                var n = r[t];
                n.code === Je.EnumValueMismatch && (n.message = tt("enumWarning", "Value is not accepted. Valid values: {0}.", this.enumValues.map((function (e) { return JSON.stringify(e); })).join(", ")));
            }
        } }, e.prototype.mergePropertyMatch = function (e) { this.merge(e), this.propertiesMatches++, (e.enumValueMatch || !e.hasProblems() && e.propertiesMatches) && this.propertiesValueMatches++, e.enumValueMatch && e.enumValues && 1 === e.enumValues.length && this.primaryValueMatches++; }, e.prototype.compare = function (e) { var t = this.hasProblems(); return t !== e.hasProblems() ? t ? -1 : 1 : this.enumValueMatch !== e.enumValueMatch ? e.enumValueMatch ? -1 : 1 : this.primaryValueMatches !== e.primaryValueMatches ? this.primaryValueMatches - e.primaryValueMatches : this.propertiesValueMatches !== e.propertiesValueMatches ? this.propertiesValueMatches - e.propertiesValueMatches : this.propertiesMatches - e.propertiesMatches; }, e; }();
        function gt(e) { return y(e); }
        function mt(e) { return m(e); }
        function yt(e, t, r) { return void 0 === r && (r = !1), t >= e.offset && t < e.offset + e.length || r && t === e.offset + e.length; }
        var vt = function () { function e(e, t, r) { void 0 === t && (t = []), void 0 === r && (r = []), this.root = e, this.syntaxErrors = t, this.comments = r; } return e.prototype.getNodeFromOffset = function (e, t) { if (void 0 === t && (t = !1), this.root)
            return g(this.root, e, t); }, e.prototype.visit = function (e) { if (this.root) {
            var t = function (r) { var n = e(r), o = r.children; if (Array.isArray(o))
                for (var i = 0; i < o.length && n; i++)
                    n = t(o[i]); return n; };
            t(this.root);
        } }, e.prototype.validate = function (e, t, r) { if (void 0 === r && (r = N.Warning), this.root && t) {
            var n = new dt;
            return bt(this.root, t, n, ht.instance), n.problems.map((function (t) { var n, o = O.create(e.positionAt(t.location.offset), e.positionAt(t.location.offset + t.location.length)); return R.create(o, t.message, null !== (n = t.severity) && void 0 !== n ? n : r, t.code); }));
        } }, e.prototype.getMatchingSchemas = function (e, t, r) { void 0 === t && (t = -1); var n = new pt(t, r); return this.root && e && bt(this.root, e, new dt, n), n.schemas; }, e; }();
        function bt(e, t, r, n) { if (e && n.include(e)) {
            var o = e;
            switch (o.type) {
                case "object":
                    !function (e, t, r, n) { for (var o = Object.create(null), i = [], a = 0, s = e.properties; a < s.length; a++)
                        o[V = (m = s[a]).keyNode.value] = m.valueNode, i.push(V); if (Array.isArray(t.required))
                        for (var c = 0, u = t.required; c < u.length; c++)
                            if (!o[w = u[c]]) {
                                var l = e.parent && "property" === e.parent.type && e.parent.keyNode, f = l ? { offset: l.offset, length: l.length } : { offset: e.offset, length: 1 };
                                r.problems.push({ location: f, message: tt("MissingRequiredPropWarning", 'Missing property "{0}".', w) });
                            } var p = function (e) { for (var t = i.indexOf(e); t >= 0;)
                        i.splice(t, 1), t = i.indexOf(e); }; if (t.properties)
                        for (var h = 0, d = Object.keys(t.properties); h < d.length; h++) {
                            p(w = d[h]);
                            var g = t.properties[w];
                            if (C = o[w])
                                if (X(g))
                                    if (g)
                                        r.propertiesMatches++, r.propertiesValueMatches++;
                                    else {
                                        var m = C.parent;
                                        r.problems.push({ location: { offset: m.keyNode.offset, length: m.keyNode.length }, message: t.errorMessage || tt("DisallowedExtraPropWarning", "Property {0} is not allowed.", w) });
                                    }
                                else
                                    bt(C, g, E = new dt, n), r.mergePropertyMatch(E);
                        } if (t.patternProperties)
                        for (var y = 0, v = Object.keys(t.patternProperties); y < v.length; y++)
                            for (var b = v[y], x = Y(b), S = 0, A = i.slice(0); S < A.length; S++) {
                                var w = A[S];
                                (null == x ? void 0 : x.test(w)) && (p(w), (C = o[w]) && (X(g = t.patternProperties[b]) ? g ? (r.propertiesMatches++, r.propertiesValueMatches++) : (m = C.parent, r.problems.push({ location: { offset: m.keyNode.offset, length: m.keyNode.length }, message: t.errorMessage || tt("DisallowedExtraPropWarning", "Property {0} is not allowed.", w) })) : (bt(C, g, E = new dt, n), r.mergePropertyMatch(E))));
                            } if ("object" == typeof t.additionalProperties) {
                        for (var O = 0, k = i; O < k.length; O++)
                            if (C = o[w = k[O]]) {
                                var E = new dt;
                                bt(C, t.additionalProperties, E, n), r.mergePropertyMatch(E);
                            }
                    }
                    else if (!1 === t.additionalProperties && i.length > 0)
                        for (var j = 0, T = i; j < T.length; j++) {
                            var C;
                            (C = o[w = T[j]]) && (m = C.parent, r.problems.push({ location: { offset: m.keyNode.offset, length: m.keyNode.length }, message: t.errorMessage || tt("DisallowedExtraPropWarning", "Property {0} is not allowed.", w) }));
                        } if (J(t.maxProperties) && e.properties.length > t.maxProperties && r.problems.push({ location: { offset: e.offset, length: e.length }, message: tt("MaxPropWarning", "Object has more properties than limit of {0}.", t.maxProperties) }), J(t.minProperties) && e.properties.length < t.minProperties && r.problems.push({ location: { offset: e.offset, length: e.length }, message: tt("MinPropWarning", "Object has fewer properties than the required number of {0}", t.minProperties) }), t.dependencies)
                        for (var P = 0, I = Object.keys(t.dependencies); P < I.length; P++)
                            if (o[V = I[P]]) {
                                var M = t.dependencies[V];
                                if (Array.isArray(M))
                                    for (var N = 0, F = M; N < F.length; N++) {
                                        var _ = F[N];
                                        o[_] ? r.propertiesValueMatches++ : r.problems.push({ location: { offset: e.offset, length: e.length }, message: tt("RequiredDependentPropWarning", "Object is missing property {0} required by property {1}.", _, V) });
                                    }
                                else
                                    (g = ft(M)) && (bt(e, g, E = new dt, n), r.mergePropertyMatch(E));
                            } var R = ft(t.propertyNames); if (R)
                        for (var L = 0, D = e.properties; L < D.length; L++) {
                            var V;
                            (V = D[L].keyNode) && bt(V, R, r, ht.instance);
                        } }(o, t, r, n);
                    break;
                case "array":
                    !function (e, t, r, n) { if (Array.isArray(t.items)) {
                        for (var o = t.items, i = 0; i < o.length; i++) {
                            var a = ft(o[i]), s = new dt;
                            (p = e.items[i]) ? (bt(p, a, s, n), r.mergePropertyMatch(s)) : e.items.length >= o.length && r.propertiesValueMatches++;
                        }
                        if (e.items.length > o.length)
                            if ("object" == typeof t.additionalItems)
                                for (var c = o.length; c < e.items.length; c++)
                                    s = new dt, bt(e.items[c], t.additionalItems, s, n), r.mergePropertyMatch(s);
                            else
                                !1 === t.additionalItems && r.problems.push({ location: { offset: e.offset, length: e.length }, message: tt("additionalItemsWarning", "Array has too many items according to schema. Expected {0} or fewer.", o.length) });
                    }
                    else {
                        var u = ft(t.items);
                        if (u)
                            for (var l = 0, f = e.items; l < f.length; l++) {
                                var p;
                                bt(p = f[l], u, s = new dt, n), r.mergePropertyMatch(s);
                            }
                    } var h = ft(t.contains); if (h) {
                        var d = e.items.some((function (e) { var t = new dt; return bt(e, h, t, ht.instance), !t.hasProblems(); }));
                        d || r.problems.push({ location: { offset: e.offset, length: e.length }, message: t.errorMessage || tt("requiredItemMissingWarning", "Array does not contain required item.") });
                    } if (J(t.minItems) && e.items.length < t.minItems && r.problems.push({ location: { offset: e.offset, length: e.length }, message: tt("minItemsWarning", "Array has too few items. Expected {0} or more.", t.minItems) }), J(t.maxItems) && e.items.length > t.maxItems && r.problems.push({ location: { offset: e.offset, length: e.length }, message: tt("maxItemsWarning", "Array has too many items. Expected {0} or fewer.", t.maxItems) }), !0 === t.uniqueItems) {
                        var g = gt(e), m = g.some((function (e, t) { return t !== g.lastIndexOf(e); }));
                        m && r.problems.push({ location: { offset: e.offset, length: e.length }, message: tt("uniqueItemsWarning", "Array has duplicate items.") });
                    } }(o, t, r, n);
                    break;
                case "string":
                    !function (e, t, r, n) { if (J(t.minLength) && e.value.length < t.minLength && r.problems.push({ location: { offset: e.offset, length: e.length }, message: tt("minLengthWarning", "String is shorter than the minimum length of {0}.", t.minLength) }), J(t.maxLength) && e.value.length > t.maxLength && r.problems.push({ location: { offset: e.offset, length: e.length }, message: tt("maxLengthWarning", "String is longer than the maximum length of {0}.", t.maxLength) }), "string" == typeof t.pattern) {
                        var o = Y(t.pattern);
                        (null == o ? void 0 : o.test(e.value)) || r.problems.push({ location: { offset: e.offset, length: e.length }, message: t.patternErrorMessage || t.errorMessage || tt("patternWarning", 'String does not match the pattern of "{0}".', t.pattern) });
                    } if (t.format)
                        switch (t.format) {
                            case "uri":
                            case "uri-reference":
                                var i = void 0;
                                if (e.value) {
                                    var a = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/.exec(e.value);
                                    a ? a[2] || "uri" !== t.format || (i = tt("uriSchemeMissing", "URI with a scheme is expected.")) : i = tt("uriMissing", "URI is expected.");
                                }
                                else
                                    i = tt("uriEmpty", "URI expected.");
                                i && r.problems.push({ location: { offset: e.offset, length: e.length }, message: t.patternErrorMessage || t.errorMessage || tt("uriFormatWarning", "String is not a URI: {0}", i) });
                                break;
                            case "color-hex":
                            case "date-time":
                            case "date":
                            case "time":
                            case "email":
                            case "hostname":
                            case "ipv4":
                            case "ipv6":
                                var s = rt[t.format];
                                e.value && s.pattern.exec(e.value) || r.problems.push({ location: { offset: e.offset, length: e.length }, message: t.patternErrorMessage || t.errorMessage || s.errorMessage });
                        } }(o, t, r);
                    break;
                case "number":
                    !function (e, t, r, n) { var o = e.value; function i(e) { var t, r = /^(-?\d+)(?:\.(\d+))?(?:e([-+]\d+))?$/.exec(e.toString()); return r && { value: Number(r[1] + (r[2] || "")), multiplier: ((null === (t = r[2]) || void 0 === t ? void 0 : t.length) || 0) - (parseInt(r[3]) || 0) }; } if (J(t.multipleOf)) {
                        var a = -1;
                        if (Number.isInteger(t.multipleOf))
                            a = o % t.multipleOf;
                        else {
                            var s = i(t.multipleOf), c = i(o);
                            if (s && c) {
                                var u = Math.pow(10, Math.abs(c.multiplier - s.multiplier));
                                c.multiplier < s.multiplier ? c.value *= u : s.value *= u, a = c.value % s.value;
                            }
                        }
                        0 !== a && r.problems.push({ location: { offset: e.offset, length: e.length }, message: tt("multipleOfWarning", "Value is not divisible by {0}.", t.multipleOf) });
                    } function l(e, t) { return J(t) ? t : X(t) && t ? e : void 0; } function f(e, t) { if (!X(t) || !t)
                        return e; } var p = l(t.minimum, t.exclusiveMinimum); J(p) && o <= p && r.problems.push({ location: { offset: e.offset, length: e.length }, message: tt("exclusiveMinimumWarning", "Value is below the exclusive minimum of {0}.", p) }); var h = l(t.maximum, t.exclusiveMaximum); J(h) && o >= h && r.problems.push({ location: { offset: e.offset, length: e.length }, message: tt("exclusiveMaximumWarning", "Value is above the exclusive maximum of {0}.", h) }); var d = f(t.minimum, t.exclusiveMinimum); J(d) && o < d && r.problems.push({ location: { offset: e.offset, length: e.length }, message: tt("minimumWarning", "Value is below the minimum of {0}.", d) }); var g = f(t.maximum, t.exclusiveMaximum); J(g) && o > g && r.problems.push({ location: { offset: e.offset, length: e.length }, message: tt("maximumWarning", "Value is above the maximum of {0}.", g) }); }(o, t, r);
                    break;
                case "property": return bt(o.valueNode, t, r, n);
            }
            !function () { function e(e) { return o.type === e || "integer" === e && "number" === o.type && o.isInteger; } if (Array.isArray(t.type) ? t.type.some(e) || r.problems.push({ location: { offset: o.offset, length: o.length }, message: t.errorMessage || tt("typeArrayMismatchWarning", "Incorrect type. Expected one of {0}.", t.type.join(", ")) }) : t.type && (e(t.type) || r.problems.push({ location: { offset: o.offset, length: o.length }, message: t.errorMessage || tt("typeMismatchWarning", 'Incorrect type. Expected "{0}".', t.type) })), Array.isArray(t.allOf))
                for (var i = 0, a = t.allOf; i < a.length; i++) {
                    var s = a[i];
                    bt(o, ft(s), r, n);
                } var c = ft(t.not); if (c) {
                var u = new dt, l = n.newSub();
                bt(o, c, u, l), u.hasProblems() || r.problems.push({ location: { offset: o.offset, length: o.length }, message: tt("notSchemaWarning", "Matches a schema that is not allowed.") });
                for (var f = 0, p = l.schemas; f < p.length; f++) {
                    var h = p[f];
                    h.inverted = !h.inverted, n.add(h);
                }
            } var d = function (e, t) { for (var i = [], a = void 0, s = 0, c = e; s < c.length; s++) {
                var u = ft(c[s]), l = new dt, f = n.newSub();
                if (bt(o, u, l, f), l.hasProblems() || i.push(u), a)
                    if (t || l.hasProblems() || a.validationResult.hasProblems()) {
                        var p = l.compare(a.validationResult);
                        p > 0 ? a = { schema: u, validationResult: l, matchingSchemas: f } : 0 === p && (a.matchingSchemas.merge(f), a.validationResult.mergeEnumValues(l));
                    }
                    else
                        a.matchingSchemas.merge(f), a.validationResult.propertiesMatches += l.propertiesMatches, a.validationResult.propertiesValueMatches += l.propertiesValueMatches;
                else
                    a = { schema: u, validationResult: l, matchingSchemas: f };
            } return i.length > 1 && t && r.problems.push({ location: { offset: o.offset, length: 1 }, message: tt("oneOfWarning", "Matches multiple schemas when only one must validate.") }), a && (r.merge(a.validationResult), r.propertiesMatches += a.validationResult.propertiesMatches, r.propertiesValueMatches += a.validationResult.propertiesValueMatches, n.merge(a.matchingSchemas)), i.length; }; Array.isArray(t.anyOf) && d(t.anyOf, !1), Array.isArray(t.oneOf) && d(t.oneOf, !0); var g = function (e) { var t = new dt, i = n.newSub(); bt(o, ft(e), t, i), r.merge(t), r.propertiesMatches += t.propertiesMatches, r.propertiesValueMatches += t.propertiesValueMatches, n.merge(i); }, m = ft(t.if); if (m && function (e, t, r) { var i = ft(e), a = new dt, s = n.newSub(); bt(o, i, a, s), n.merge(s), a.hasProblems() ? r && g(r) : t && g(t); }(m, ft(t.then), ft(t.else)), Array.isArray(t.enum)) {
                for (var y = gt(o), v = !1, b = 0, x = t.enum; b < x.length; b++) {
                    if (K(y, x[b])) {
                        v = !0;
                        break;
                    }
                }
                r.enumValues = t.enum, r.enumValueMatch = v, v || r.problems.push({ location: { offset: o.offset, length: o.length }, code: Je.EnumValueMismatch, message: t.errorMessage || tt("enumWarning", "Value is not accepted. Valid values: {0}.", t.enum.map((function (e) { return JSON.stringify(e); })).join(", ")) });
            } H(t.const) && (K(y = gt(o), t.const) ? r.enumValueMatch = !0 : (r.problems.push({ location: { offset: o.offset, length: o.length }, code: Je.EnumValueMismatch, message: t.errorMessage || tt("constWarning", "Value must be {0}.", JSON.stringify(t.const)) }), r.enumValueMatch = !1), r.enumValues = [t.const]), t.deprecationMessage && o.parent && r.problems.push({ location: { offset: o.parent.offset, length: o.parent.length }, severity: N.Warning, message: t.deprecationMessage, code: Je.Deprecated }); }(), n.add({ node: o, schema: t });
        } }
        function xt(e, t, r) { if (null !== e && "object" == typeof e) {
            var n = t + "\t";
            if (Array.isArray(e)) {
                if (0 === e.length)
                    return "[]";
                for (var o = "[\n", i = 0; i < e.length; i++)
                    o += n + xt(e[i], n, r), i < e.length - 1 && (o += ","), o += "\n";
                return o + (t + "]");
            }
            var a = Object.keys(e);
            if (0 === a.length)
                return "{}";
            for (o = "{\n", i = 0; i < a.length; i++) {
                var s = a[i];
                o += n + JSON.stringify(s) + ": " + xt(e[s], n, r), i < a.length - 1 && (o += ","), o += "\n";
            }
            return o + (t + "}");
        } return r(e); }
        var St = r(3716), At = Qe.loadMessageBundle(), wt = function () { function e(e, t, r, n) { void 0 === t && (t = []), void 0 === r && (r = Promise), void 0 === n && (n = {}), this.schemaService = e, this.contributions = t, this.promiseConstructor = r, this.clientCapabilities = n; } return e.prototype.doResolve = function (e) { for (var t = this.contributions.length - 1; t >= 0; t--) {
            var r = this.contributions[t].resolveCompletion;
            if (r) {
                var n = r(e);
                if (n)
                    return n;
            }
        } return this.promiseConstructor.resolve(e); }, e.prototype.doComplete = function (e, t, r) { var n = this, o = { items: [], isIncomplete: !1 }, i = e.getText(), a = e.offsetAt(t), s = r.getNodeFromOffset(a, !0); if (this.isInComment(e, s ? s.offset : 0, a))
            return Promise.resolve(o); if (s && a === s.offset + s.length && a > 0) {
            var c = i[a - 1];
            ("object" === s.type && "}" === c || "array" === s.type && "]" === c) && (s = s.parent);
        } var u, l = this.getCurrentWord(e, a); if (!s || "string" !== s.type && "number" !== s.type && "boolean" !== s.type && "null" !== s.type) {
            var f = a - l.length;
            f > 0 && '"' === i[f - 1] && f--, u = O.create(e.positionAt(f), t);
        }
        else
            u = O.create(e.positionAt(s.offset), e.positionAt(s.offset + s.length)); var p = {}, h = { add: function (e) { var t = e.label, r = p[t]; if (r)
                r.documentation || (r.documentation = e.documentation), r.detail || (r.detail = e.detail);
            else {
                if ((t = t.replace(/[\n]/g, "↵")).length > 60) {
                    var n = t.substr(0, 57).trim() + "...";
                    p[n] || (t = n);
                }
                u && void 0 !== e.insertText && (e.textEdit = D.replace(u, e.insertText)), e.label = t, p[t] = e, o.items.push(e);
            } }, setAsIncomplete: function () { o.isIncomplete = !0; }, error: function (e) { St.error(e); }, log: function (e) { St.log(e); }, getNumberOfProposals: function () { return o.items.length; } }; return this.schemaService.getSchemaForResource(e.uri, r).then((function (t) { var c = [], f = !0, d = "", g = void 0; if (s && "string" === s.type) {
            var m = s.parent;
            m && "property" === m.type && m.keyNode === s && (f = !m.valueNode, g = m, d = i.substr(s.offset + 1, s.length - 2), m && (s = m.parent));
        } if (s && "object" === s.type) {
            if (s.offset === a)
                return o;
            s.properties.forEach((function (e) { g && g === e || (p[e.keyNode.value] = fe.create("__")); }));
            var y = "";
            f && (y = n.evaluateSeparatorAfter(e, e.offsetAt(u.end))), t ? n.getPropertyCompletions(t, r, s, f, y, h) : n.getSchemaLessPropertyCompletions(r, s, d, h);
            var v = mt(s);
            n.contributions.forEach((function (t) { var r = t.collectPropertyCompletions(e.uri, v, l, f, "" === y, h); r && c.push(r); })), !t && l.length > 0 && '"' !== i.charAt(a - l.length - 1) && (h.add({ kind: ie.Property, label: n.getLabelForValue(l), insertText: n.getInsertTextForProperty(l, void 0, !1, y), insertTextFormat: ae.Snippet, documentation: "" }), h.setAsIncomplete());
        } var b = {}; return t ? n.getValueCompletions(t, r, s, a, e, h, b) : n.getSchemaLessValueCompletions(r, s, a, e, h), n.contributions.length > 0 && n.getContributedValueCompletions(r, s, a, e, h, c), n.promiseConstructor.all(c).then((function () { if (0 === h.getNumberOfProposals()) {
            var t = a;
            !s || "string" !== s.type && "number" !== s.type && "boolean" !== s.type && "null" !== s.type || (t = s.offset + s.length);
            var r = n.evaluateSeparatorAfter(e, t);
            n.addFillerValueCompletions(b, r, h);
        } return o; })); })); }, e.prototype.getPropertyCompletions = function (e, t, r, n, o, i) { var a = this; t.getMatchingSchemas(e.schema, r.offset).forEach((function (e) { if (e.node === r && !e.inverted) {
            var t = e.schema.properties;
            t && Object.keys(t).forEach((function (e) { var r = t[e]; if ("object" == typeof r && !r.deprecationMessage && !r.doNotSuggest) {
                var s = { kind: ie.Property, label: e, insertText: a.getInsertTextForProperty(e, r, n, o), insertTextFormat: ae.Snippet, filterText: a.getFilterTextForValue(e), documentation: a.fromMarkup(r.markdownDescription) || r.description || "" };
                void 0 !== r.suggestSortText && (s.sortText = r.suggestSortText), s.insertText && Z(s.insertText, "$1".concat(o)) && (s.command = { title: "Suggest", command: "editor.action.triggerSuggest" }), i.add(s);
            } }));
            var s = e.schema.propertyNames;
            if ("object" == typeof s && !s.deprecationMessage && !s.doNotSuggest) {
                var c = function (e, t) { void 0 === t && (t = void 0); var r = { kind: ie.Property, label: e, insertText: a.getInsertTextForProperty(e, void 0, n, o), insertTextFormat: ae.Snippet, filterText: a.getFilterTextForValue(e), documentation: t || a.fromMarkup(s.markdownDescription) || s.description || "" }; void 0 !== s.suggestSortText && (r.sortText = s.suggestSortText), r.insertText && Z(r.insertText, "$1".concat(o)) && (r.command = { title: "Suggest", command: "editor.action.triggerSuggest" }), i.add(r); };
                if (s.enum)
                    for (var u = 0; u < s.enum.length; u++) {
                        var l = void 0;
                        s.markdownEnumDescriptions && u < s.markdownEnumDescriptions.length ? l = a.fromMarkup(s.markdownEnumDescriptions[u]) : s.enumDescriptions && u < s.enumDescriptions.length && (l = s.enumDescriptions[u]), c(s.enum[u], l);
                    }
                s.const && c(s.const);
            }
        } })); }, e.prototype.getSchemaLessPropertyCompletions = function (e, t, r, n) { var o = this, i = function (e) { e.properties.forEach((function (e) { var t = e.keyNode.value; n.add({ kind: ie.Property, label: t, insertText: o.getInsertTextForValue(t, ""), insertTextFormat: ae.Snippet, filterText: o.getFilterTextForValue(t), documentation: "" }); })); }; if (t.parent)
            if ("property" === t.parent.type) {
                var a = t.parent.keyNode.value;
                e.visit((function (e) { return "property" === e.type && e !== t.parent && e.keyNode.value === a && e.valueNode && "object" === e.valueNode.type && i(e.valueNode), !0; }));
            }
            else
                "array" === t.parent.type && t.parent.items.forEach((function (e) { "object" === e.type && e !== t && i(e); }));
        else
            "object" === t.type && n.add({ kind: ie.Property, label: "$schema", insertText: this.getInsertTextForProperty("$schema", void 0, !0, ""), insertTextFormat: ae.Snippet, documentation: "", filterText: this.getFilterTextForValue("$schema") }); }, e.prototype.getSchemaLessValueCompletions = function (e, t, r, n, o) { var i = this, a = r; if (!t || "string" !== t.type && "number" !== t.type && "boolean" !== t.type && "null" !== t.type || (a = t.offset + t.length, t = t.parent), !t)
            return o.add({ kind: this.getSuggestionKind("object"), label: "Empty object", insertText: this.getInsertTextForValue({}, ""), insertTextFormat: ae.Snippet, documentation: "" }), void o.add({ kind: this.getSuggestionKind("array"), label: "Empty array", insertText: this.getInsertTextForValue([], ""), insertTextFormat: ae.Snippet, documentation: "" }); var s = this.evaluateSeparatorAfter(n, a), c = function (e) { e.parent && !yt(e.parent, r, !0) && o.add({ kind: i.getSuggestionKind(e.type), label: i.getLabelTextForMatchingNode(e, n), insertText: i.getInsertTextForMatchingNode(e, n, s), insertTextFormat: ae.Snippet, documentation: "" }), "boolean" === e.type && i.addBooleanValueCompletion(!e.value, s, o); }; if ("property" === t.type && r > (t.colonOffset || 0)) {
            var u = t.valueNode;
            if (u && (r > u.offset + u.length || "object" === u.type || "array" === u.type))
                return;
            var l = t.keyNode.value;
            e.visit((function (e) { return "property" === e.type && e.keyNode.value === l && e.valueNode && c(e.valueNode), !0; })), "$schema" === l && t.parent && !t.parent.parent && this.addDollarSchemaCompletions(s, o);
        } if ("array" === t.type)
            if (t.parent && "property" === t.parent.type) {
                var f = t.parent.keyNode.value;
                e.visit((function (e) { return "property" === e.type && e.keyNode.value === f && e.valueNode && "array" === e.valueNode.type && e.valueNode.items.forEach(c), !0; }));
            }
            else
                t.items.forEach(c); }, e.prototype.getValueCompletions = function (e, t, r, n, o, i, a) { var s = n, c = void 0, u = void 0; if (!r || "string" !== r.type && "number" !== r.type && "boolean" !== r.type && "null" !== r.type || (s = r.offset + r.length, u = r, r = r.parent), r) {
            if ("property" === r.type && n > (r.colonOffset || 0)) {
                var l = r.valueNode;
                if (l && n > l.offset + l.length)
                    return;
                c = r.keyNode.value, r = r.parent;
            }
            if (r && (void 0 !== c || "array" === r.type)) {
                for (var f = this.evaluateSeparatorAfter(o, s), p = 0, h = t.getMatchingSchemas(e.schema, r.offset, u); p < h.length; p++) {
                    var d = h[p];
                    if (d.node === r && !d.inverted && d.schema) {
                        if ("array" === r.type && d.schema.items)
                            if (Array.isArray(d.schema.items)) {
                                var g = this.findItemAtOffset(r, o, n);
                                g < d.schema.items.length && this.addSchemaValueCompletions(d.schema.items[g], f, i, a);
                            }
                            else
                                this.addSchemaValueCompletions(d.schema.items, f, i, a);
                        if (void 0 !== c) {
                            var m = !1;
                            if (d.schema.properties && (S = d.schema.properties[c]) && (m = !0, this.addSchemaValueCompletions(S, f, i, a)), d.schema.patternProperties && !m)
                                for (var y = 0, v = Object.keys(d.schema.patternProperties); y < v.length; y++) {
                                    var b = v[y], x = Y(b);
                                    if (null == x ? void 0 : x.test(c)) {
                                        m = !0;
                                        var S = d.schema.patternProperties[b];
                                        this.addSchemaValueCompletions(S, f, i, a);
                                    }
                                }
                            d.schema.additionalProperties && !m && (S = d.schema.additionalProperties, this.addSchemaValueCompletions(S, f, i, a));
                        }
                    }
                }
                "$schema" !== c || r.parent || this.addDollarSchemaCompletions(f, i), a.boolean && (this.addBooleanValueCompletion(!0, f, i), this.addBooleanValueCompletion(!1, f, i)), a.null && this.addNullValueCompletion(f, i);
            }
        }
        else
            this.addSchemaValueCompletions(e.schema, "", i, a); }, e.prototype.getContributedValueCompletions = function (e, t, r, n, o, i) { if (t) {
            if ("string" !== t.type && "number" !== t.type && "boolean" !== t.type && "null" !== t.type || (t = t.parent), t && "property" === t.type && r > (t.colonOffset || 0)) {
                var a = t.keyNode.value, s = t.valueNode;
                if ((!s || r <= s.offset + s.length) && t.parent) {
                    var c = mt(t.parent);
                    this.contributions.forEach((function (e) { var t = e.collectValueCompletions(n.uri, c, a, o); t && i.push(t); }));
                }
            }
        }
        else
            this.contributions.forEach((function (e) { var t = e.collectDefaultCompletions(n.uri, o); t && i.push(t); })); }, e.prototype.addSchemaValueCompletions = function (e, t, r, n) { var o = this; "object" == typeof e && (this.addEnumValueCompletions(e, t, r), this.addDefaultValueCompletions(e, t, r), this.collectTypes(e, n), Array.isArray(e.allOf) && e.allOf.forEach((function (e) { return o.addSchemaValueCompletions(e, t, r, n); })), Array.isArray(e.anyOf) && e.anyOf.forEach((function (e) { return o.addSchemaValueCompletions(e, t, r, n); })), Array.isArray(e.oneOf) && e.oneOf.forEach((function (e) { return o.addSchemaValueCompletions(e, t, r, n); }))); }, e.prototype.addDefaultValueCompletions = function (e, t, r, n) { var o = this; void 0 === n && (n = 0); var i = !1; if (H(e.default)) {
            for (var a = e.type, s = e.default, c = n; c > 0; c--)
                s = [s], a = "array";
            r.add({ kind: this.getSuggestionKind(a), label: this.getLabelForValue(s), insertText: this.getInsertTextForValue(s, t), insertTextFormat: ae.Snippet, detail: At("json.suggest.default", "Default value") }), i = !0;
        } Array.isArray(e.examples) && e.examples.forEach((function (a) { for (var s = e.type, c = a, u = n; u > 0; u--)
            c = [c], s = "array"; r.add({ kind: o.getSuggestionKind(s), label: o.getLabelForValue(c), insertText: o.getInsertTextForValue(c, t), insertTextFormat: ae.Snippet }), i = !0; })), Array.isArray(e.defaultSnippets) && e.defaultSnippets.forEach((function (a) { var s, c, u = e.type, l = a.body, f = a.label; if (H(l)) {
            e.type;
            for (var p = n; p > 0; p--)
                l = [l];
            s = o.getInsertTextForSnippetValue(l, t), c = o.getFilterTextForSnippetValue(l), f = f || o.getLabelForSnippetValue(l);
        }
        else {
            if ("string" != typeof a.bodyText)
                return;
            var h = "", d = "", g = "";
            for (p = n; p > 0; p--)
                h = h + g + "[\n", d = d + "\n" + g + "]", g += "\t", u = "array";
            s = h + g + a.bodyText.split("\n").join("\n" + g) + d + t, f = f || s, c = s.replace(/[\n]/g, "");
        } r.add({ kind: o.getSuggestionKind(u), label: f, documentation: o.fromMarkup(a.markdownDescription) || a.description, insertText: s, insertTextFormat: ae.Snippet, filterText: c }), i = !0; })), !i && "object" == typeof e.items && !Array.isArray(e.items) && n < 5 && this.addDefaultValueCompletions(e.items, t, r, n + 1); }, e.prototype.addEnumValueCompletions = function (e, t, r) { if (H(e.const) && r.add({ kind: this.getSuggestionKind(e.type), label: this.getLabelForValue(e.const), insertText: this.getInsertTextForValue(e.const, t), insertTextFormat: ae.Snippet, documentation: this.fromMarkup(e.markdownDescription) || e.description }), Array.isArray(e.enum))
            for (var n = 0, o = e.enum.length; n < o; n++) {
                var i = e.enum[n], a = this.fromMarkup(e.markdownDescription) || e.description;
                e.markdownEnumDescriptions && n < e.markdownEnumDescriptions.length && this.doesSupportMarkdown() ? a = this.fromMarkup(e.markdownEnumDescriptions[n]) : e.enumDescriptions && n < e.enumDescriptions.length && (a = e.enumDescriptions[n]), r.add({ kind: this.getSuggestionKind(e.type), label: this.getLabelForValue(i), insertText: this.getInsertTextForValue(i, t), insertTextFormat: ae.Snippet, documentation: a });
            } }, e.prototype.collectTypes = function (e, t) { if (!Array.isArray(e.enum) && !H(e.const)) {
            var r = e.type;
            Array.isArray(r) ? r.forEach((function (e) { return t[e] = !0; })) : r && (t[r] = !0);
        } }, e.prototype.addFillerValueCompletions = function (e, t, r) { e.object && r.add({ kind: this.getSuggestionKind("object"), label: "{}", insertText: this.getInsertTextForGuessedValue({}, t), insertTextFormat: ae.Snippet, detail: At("defaults.object", "New object"), documentation: "" }), e.array && r.add({ kind: this.getSuggestionKind("array"), label: "[]", insertText: this.getInsertTextForGuessedValue([], t), insertTextFormat: ae.Snippet, detail: At("defaults.array", "New array"), documentation: "" }); }, e.prototype.addBooleanValueCompletion = function (e, t, r) { r.add({ kind: this.getSuggestionKind("boolean"), label: e ? "true" : "false", insertText: this.getInsertTextForValue(e, t), insertTextFormat: ae.Snippet, documentation: "" }); }, e.prototype.addNullValueCompletion = function (e, t) { t.add({ kind: this.getSuggestionKind("null"), label: "null", insertText: "null" + e, insertTextFormat: ae.Snippet, documentation: "" }); }, e.prototype.addDollarSchemaCompletions = function (e, t) { var r = this, n = this.schemaService.getRegisteredSchemaIds((function (e) { return "http" === e || "https" === e; })); n.forEach((function (n) { return t.add({ kind: ie.Module, label: r.getLabelForValue(n), filterText: r.getFilterTextForValue(n), insertText: r.getInsertTextForValue(n, e), insertTextFormat: ae.Snippet, documentation: "" }); })); }, e.prototype.getLabelForValue = function (e) { return JSON.stringify(e); }, e.prototype.getFilterTextForValue = function (e) { return JSON.stringify(e); }, e.prototype.getFilterTextForSnippetValue = function (e) { return JSON.stringify(e).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1"); }, e.prototype.getLabelForSnippetValue = function (e) { return JSON.stringify(e).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, "$1"); }, e.prototype.getInsertTextForPlainText = function (e) { return e.replace(/[\\\$\}]/g, "\\$&"); }, e.prototype.getInsertTextForValue = function (e, t) { var r = JSON.stringify(e, null, "\t"); return "{}" === r ? "{$1}" + t : "[]" === r ? "[$1]" + t : this.getInsertTextForPlainText(r + t); }, e.prototype.getInsertTextForSnippetValue = function (e, t) { return xt(e, "", (function (e) { return "string" == typeof e && "^" === e[0] ? e.substr(1) : JSON.stringify(e); })) + t; }, e.prototype.getInsertTextForGuessedValue = function (e, t) { switch (typeof e) {
            case "object": return null === e ? "${1:null}" + t : this.getInsertTextForValue(e, t);
            case "string":
                var r = JSON.stringify(e);
                return r = r.substr(1, r.length - 2), '"${1:' + (r = this.getInsertTextForPlainText(r)) + '}"' + t;
            case "number":
            case "boolean": return "${1:" + JSON.stringify(e) + "}" + t;
        } return this.getInsertTextForValue(e, t); }, e.prototype.getSuggestionKind = function (e) { if (Array.isArray(e)) {
            var t = e;
            e = t.length > 0 ? t[0] : void 0;
        } if (!e)
            return ie.Value; switch (e) {
            case "string":
            default: return ie.Value;
            case "object": return ie.Module;
            case "property": return ie.Property;
        } }, e.prototype.getLabelTextForMatchingNode = function (e, t) { switch (e.type) {
            case "array": return "[]";
            case "object": return "{}";
            default: return t.getText().substr(e.offset, e.length);
        } }, e.prototype.getInsertTextForMatchingNode = function (e, t, r) { switch (e.type) {
            case "array": return this.getInsertTextForValue([], r);
            case "object": return this.getInsertTextForValue({}, r);
            default:
                var n = t.getText().substr(e.offset, e.length) + r;
                return this.getInsertTextForPlainText(n);
        } }, e.prototype.getInsertTextForProperty = function (e, t, r, n) { var o = this.getInsertTextForValue(e, ""); if (!r)
            return o; var i, a = o + ": ", s = 0; if (t) {
            if (Array.isArray(t.defaultSnippets)) {
                if (1 === t.defaultSnippets.length) {
                    var c = t.defaultSnippets[0].body;
                    H(c) && (i = this.getInsertTextForSnippetValue(c, ""));
                }
                s += t.defaultSnippets.length;
            }
            if (t.enum && (i || 1 !== t.enum.length || (i = this.getInsertTextForGuessedValue(t.enum[0], "")), s += t.enum.length), H(t.default) && (i || (i = this.getInsertTextForGuessedValue(t.default, "")), s++), Array.isArray(t.examples) && t.examples.length && (i || (i = this.getInsertTextForGuessedValue(t.examples[0], "")), s += t.examples.length), 0 === s) {
                var u = Array.isArray(t.type) ? t.type[0] : t.type;
                switch (u || (t.properties ? u = "object" : t.items && (u = "array")), u) {
                    case "boolean":
                        i = "$1";
                        break;
                    case "string":
                        i = '"$1"';
                        break;
                    case "object":
                        i = "{$1}";
                        break;
                    case "array":
                        i = "[$1]";
                        break;
                    case "number":
                    case "integer":
                        i = "${1:0}";
                        break;
                    case "null":
                        i = "${1:null}";
                        break;
                    default: return o;
                }
            }
        } return (!i || s > 1) && (i = "$1"), a + i + n; }, e.prototype.getCurrentWord = function (e, t) { for (var r = t - 1, n = e.getText(); r >= 0 && -1 === ' \t\n\r\v":{[,]}'.indexOf(n.charAt(r));)
            r--; return n.substring(r + 1, t); }, e.prototype.evaluateSeparatorAfter = function (e, t) { var r = f(e.getText(), !0); switch (r.setPosition(t), r.scan()) {
            case 5:
            case 2:
            case 4:
            case 17: return "";
            default: return ",";
        } }, e.prototype.findItemAtOffset = function (e, t, r) { for (var n = f(t.getText(), !0), o = e.items, i = o.length - 1; i >= 0; i--) {
            var a = o[i];
            if (r > a.offset + a.length)
                return n.setPosition(a.offset + a.length), 5 === n.scan() && r >= n.getTokenOffset() + n.getTokenLength() ? i + 1 : i;
            if (r >= a.offset)
                return i;
        } return 0; }, e.prototype.isInComment = function (e, t, r) { var n = f(e.getText(), !1); n.setPosition(t); for (var o = n.scan(); 17 !== o && n.getTokenOffset() + n.getTokenLength() < r;)
            o = n.scan(); return (12 === o || 13 === o) && n.getTokenOffset() <= r; }, e.prototype.fromMarkup = function (e) { if (e && this.doesSupportMarkdown())
            return { kind: ne.Markdown, value: e }; }, e.prototype.doesSupportMarkdown = function () { if (!H(this.supportsMarkdown)) {
            var e = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.completion;
            this.supportsMarkdown = e && e.completionItem && Array.isArray(e.completionItem.documentationFormat) && -1 !== e.completionItem.documentationFormat.indexOf(ne.Markdown);
        } return this.supportsMarkdown; }, e.prototype.doesSupportsCommitCharacters = function () { if (!H(this.supportsCommitCharacters)) {
            var e = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.completion;
            this.supportsCommitCharacters = e && e.completionItem && !!e.completionItem.commitCharactersSupport;
        } return this.supportsCommitCharacters; }, e; }(), Ot = function () { function e(e, t, r) { void 0 === t && (t = []), this.schemaService = e, this.contributions = t, this.promise = r || Promise; } return e.prototype.doHover = function (e, t, r) { var n = e.offsetAt(t), o = r.getNodeFromOffset(n); if (!o || ("object" === o.type || "array" === o.type) && n > o.offset + 1 && n < o.offset + o.length - 1)
            return this.promise.resolve(null); var i = o; if ("string" === o.type) {
            var a = o.parent;
            if (a && "property" === a.type && a.keyNode === o && !(o = a.valueNode))
                return this.promise.resolve(null);
        } for (var s = O.create(e.positionAt(i.offset), e.positionAt(i.offset + i.length)), c = function (e) { return { contents: e, range: s }; }, u = mt(o), l = this.contributions.length - 1; l >= 0; l--) {
            var f = this.contributions[l].getInfoContribution(e.uri, u);
            if (f)
                return f.then((function (e) { return c(e); }));
        } return this.schemaService.getSchemaForResource(e.uri, r).then((function (e) { if (e && o) {
            var t = r.getMatchingSchemas(e.schema, o.offset), n = void 0, i = void 0, a = void 0, s = void 0;
            t.every((function (e) { if (e.node === o && !e.inverted && e.schema && (n = n || e.schema.title, i = i || e.schema.markdownDescription || kt(e.schema.description), e.schema.enum)) {
                var t = e.schema.enum.indexOf(gt(o));
                e.schema.markdownEnumDescriptions ? a = e.schema.markdownEnumDescriptions[t] : e.schema.enumDescriptions && (a = kt(e.schema.enumDescriptions[t])), a && "string" != typeof (s = e.schema.enum[t]) && (s = JSON.stringify(s));
            } return !0; }));
            var u = "";
            return n && (u = kt(n)), i && (u.length > 0 && (u += "\n\n"), u += i), a && (u.length > 0 && (u += "\n\n"), u += "`".concat((l = s, -1 !== l.indexOf("`") ? "`` " + l + " ``" : l), "`: ").concat(a)), c([u]);
        } var l; return null; })); }, e; }();
        function kt(e) { if (e)
            return e.replace(/([^\n\r])(\r?\n)([^\n\r])/gm, "$1\n\n$3").replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&"); }
        var Et = Qe.loadMessageBundle(), jt = function () { function e(e, t) { this.jsonSchemaService = e, this.promise = t, this.validationEnabled = !0; } return e.prototype.configure = function (e) { e && (this.validationEnabled = !1 !== e.validate, this.commentSeverity = e.allowComments ? void 0 : N.Error); }, e.prototype.doValidation = function (e, t, r, n) { var o = this; if (!this.validationEnabled)
            return this.promise.resolve([]); var i = [], a = {}, s = function (e) { var t = e.range.start.line + " " + e.range.start.character + " " + e.message; a[t] || (a[t] = !0, i.push(e)); }, c = function (n) { var a = (null == r ? void 0 : r.trailingCommas) ? It(r.trailingCommas) : N.Error, c = (null == r ? void 0 : r.comments) ? It(r.comments) : o.commentSeverity, u = (null == r ? void 0 : r.schemaValidation) ? It(r.schemaValidation) : N.Warning, l = (null == r ? void 0 : r.schemaRequest) ? It(r.schemaRequest) : N.Warning; if (n) {
            if (n.errors.length && t.root && l) {
                var f = t.root, p = "object" === f.type ? f.properties[0] : void 0;
                if (p && "$schema" === p.keyNode.value) {
                    var h = p.valueNode || p, d = O.create(e.positionAt(h.offset), e.positionAt(h.offset + h.length));
                    s(R.create(d, n.errors[0], l, Je.SchemaResolveError));
                }
                else
                    d = O.create(e.positionAt(f.offset), e.positionAt(f.offset + 1)), s(R.create(d, n.errors[0], l, Je.SchemaResolveError));
            }
            else if (u) {
                var g = t.validate(e, n.schema, u);
                g && g.forEach(s);
            }
            Ct(n.schema) && (c = void 0), Pt(n.schema) && (a = void 0);
        } for (var m = 0, y = t.syntaxErrors; m < y.length; m++) {
            var v = y[m];
            if (v.code === Je.TrailingComma) {
                if ("number" != typeof a)
                    continue;
                v.severity = a;
            }
            s(v);
        } if ("number" == typeof c) {
            var b = Et("InvalidCommentToken", "Comments are not permitted in JSON.");
            t.comments.forEach((function (e) { s(R.create(e, b, c, Je.CommentNotPermitted)); }));
        } return i; }; if (n) {
            var u = n.id || "schemaservice://untitled/" + Tt++;
            return this.jsonSchemaService.registerExternalSchema(u, [], n).getResolvedSchema().then((function (e) { return c(e); }));
        } return this.jsonSchemaService.getSchemaForResource(e.uri, t).then((function (e) { return c(e); })); }, e.prototype.getLanguageStatus = function (e, t) { return { schemas: this.jsonSchemaService.getSchemaURIsForResource(e.uri, t) }; }, e; }(), Tt = 0;
        function Ct(e) { if (e && "object" == typeof e) {
            if (X(e.allowComments))
                return e.allowComments;
            if (e.allOf)
                for (var t = 0, r = e.allOf; t < r.length; t++) {
                    var n = Ct(r[t]);
                    if (X(n))
                        return n;
                }
        } }
        function Pt(e) { if (e && "object" == typeof e) {
            if (X(e.allowTrailingCommas))
                return e.allowTrailingCommas;
            var t = e;
            if (X(t.allowsTrailingCommas))
                return t.allowsTrailingCommas;
            if (e.allOf)
                for (var r = 0, n = e.allOf; r < n.length; r++) {
                    var o = Pt(n[r]);
                    if (X(o))
                        return o;
                }
        } }
        function It(e) { switch (e) {
            case "error": return N.Error;
            case "warning": return N.Warning;
            case "ignore": return;
        } }
        function Mt(e) { return e < 48 ? 0 : e <= 57 ? e - 48 : (e < 97 && (e += 32), e >= 97 && e <= 102 ? e - 97 + 10 : 0); }
        function Nt(e) { if ("#" === e[0])
            switch (e.length) {
                case 4: return { red: 17 * Mt(e.charCodeAt(1)) / 255, green: 17 * Mt(e.charCodeAt(2)) / 255, blue: 17 * Mt(e.charCodeAt(3)) / 255, alpha: 1 };
                case 5: return { red: 17 * Mt(e.charCodeAt(1)) / 255, green: 17 * Mt(e.charCodeAt(2)) / 255, blue: 17 * Mt(e.charCodeAt(3)) / 255, alpha: 17 * Mt(e.charCodeAt(4)) / 255 };
                case 7: return { red: (16 * Mt(e.charCodeAt(1)) + Mt(e.charCodeAt(2))) / 255, green: (16 * Mt(e.charCodeAt(3)) + Mt(e.charCodeAt(4))) / 255, blue: (16 * Mt(e.charCodeAt(5)) + Mt(e.charCodeAt(6))) / 255, alpha: 1 };
                case 9: return { red: (16 * Mt(e.charCodeAt(1)) + Mt(e.charCodeAt(2))) / 255, green: (16 * Mt(e.charCodeAt(3)) + Mt(e.charCodeAt(4))) / 255, blue: (16 * Mt(e.charCodeAt(5)) + Mt(e.charCodeAt(6))) / 255, alpha: (16 * Mt(e.charCodeAt(7)) + Mt(e.charCodeAt(8))) / 255 };
            } }
        var Ft = function () { function e(e) { this.schemaService = e; } return e.prototype.findDocumentSymbols = function (e, t, r) { var n = this; void 0 === r && (r = { resultLimit: Number.MAX_VALUE }); var o = t.root; if (!o)
            return []; var i = r.resultLimit || Number.MAX_VALUE, a = e.uri; if (("vscode://defaultsettings/keybindings.json" === a || Z(a.toLowerCase(), "/user/keybindings.json")) && "array" === o.type) {
            for (var s = [], c = 0, u = o.items; c < u.length; c++) {
                var l = u[c];
                if ("object" === l.type)
                    for (var f = 0, p = l.properties; f < p.length; f++) {
                        var h = p[f];
                        if ("key" === h.keyNode.value && h.valueNode) {
                            var d = k.create(e.uri, _t(e, l));
                            if (s.push({ name: gt(h.valueNode), kind: be.Function, location: d }), --i <= 0)
                                return r && r.onResultLimitExceeded && r.onResultLimitExceeded(a), s;
                        }
                    }
            }
            return s;
        } for (var g = [{ node: o, containerName: "" }], m = 0, y = !1, v = [], b = function (t, r) { "array" === t.type ? t.items.forEach((function (e) { e && g.push({ node: e, containerName: r }); })) : "object" === t.type && t.properties.forEach((function (t) { var o = t.valueNode; if (o)
            if (i > 0) {
                i--;
                var a = k.create(e.uri, _t(e, t)), s = r ? r + "." + t.keyNode.value : t.keyNode.value;
                v.push({ name: n.getKeyLabel(t), kind: n.getSymbolKind(o.type), location: a, containerName: r }), g.push({ node: o, containerName: s });
            }
            else
                y = !0; })); }; m < g.length;) {
            var x = g[m++];
            b(x.node, x.containerName);
        } return y && r && r.onResultLimitExceeded && r.onResultLimitExceeded(a), v; }, e.prototype.findDocumentSymbols2 = function (e, t, r) { var n = this; void 0 === r && (r = { resultLimit: Number.MAX_VALUE }); var o = t.root; if (!o)
            return []; var i = r.resultLimit || Number.MAX_VALUE, a = e.uri; if (("vscode://defaultsettings/keybindings.json" === a || Z(a.toLowerCase(), "/user/keybindings.json")) && "array" === o.type) {
            for (var s = [], c = 0, u = o.items; c < u.length; c++) {
                var l = u[c];
                if ("object" === l.type)
                    for (var f = 0, p = l.properties; f < p.length; f++) {
                        var h = p[f];
                        if ("key" === h.keyNode.value && h.valueNode) {
                            var d = _t(e, l), g = _t(e, h.keyNode);
                            if (s.push({ name: gt(h.valueNode), kind: be.Function, range: d, selectionRange: g }), --i <= 0)
                                return r && r.onResultLimitExceeded && r.onResultLimitExceeded(a), s;
                        }
                    }
            }
            return s;
        } for (var m = [], y = [{ node: o, result: m }], v = 0, b = !1, x = function (t, r) { "array" === t.type ? t.items.forEach((function (t, o) { if (t)
            if (i > 0) {
                i--;
                var a = _t(e, t), s = a, c = { name: String(o), kind: n.getSymbolKind(t.type), range: a, selectionRange: s, children: [] };
                r.push(c), y.push({ result: c.children, node: t });
            }
            else
                b = !0; })) : "object" === t.type && t.properties.forEach((function (t) { var o = t.valueNode; if (o)
            if (i > 0) {
                i--;
                var a = _t(e, t), s = _t(e, t.keyNode), c = [], u = { name: n.getKeyLabel(t), kind: n.getSymbolKind(o.type), range: a, selectionRange: s, children: c, detail: n.getDetail(o) };
                r.push(u), y.push({ result: c, node: o });
            }
            else
                b = !0; })); }; v < y.length;) {
            var S = y[v++];
            x(S.node, S.result);
        } return b && r && r.onResultLimitExceeded && r.onResultLimitExceeded(a), m; }, e.prototype.getSymbolKind = function (e) { switch (e) {
            case "object": return be.Module;
            case "string": return be.String;
            case "number": return be.Number;
            case "array": return be.Array;
            case "boolean": return be.Boolean;
            default: return be.Variable;
        } }, e.prototype.getKeyLabel = function (e) { var t = e.keyNode.value; return t && (t = t.replace(/[\n]/g, "↵")), t && t.trim() ? t : '"'.concat(t, '"'); }, e.prototype.getDetail = function (e) { if (e)
            return "boolean" === e.type || "number" === e.type || "null" === e.type || "string" === e.type ? String(e.value) : "array" === e.type ? e.children.length ? void 0 : "[]" : "object" === e.type ? e.children.length ? void 0 : "{}" : void 0; }, e.prototype.findDocumentColors = function (e, t, r) { return this.schemaService.getSchemaForResource(e.uri, t).then((function (n) { var o = []; if (n)
            for (var i = r && "number" == typeof r.resultLimit ? r.resultLimit : Number.MAX_VALUE, a = {}, s = 0, c = t.getMatchingSchemas(n.schema); s < c.length; s++) {
                var u = c[s];
                if (!u.inverted && u.schema && ("color" === u.schema.format || "color-hex" === u.schema.format) && u.node && "string" === u.node.type) {
                    var l = String(u.node.offset);
                    if (!a[l]) {
                        var f = Nt(gt(u.node));
                        if (f) {
                            var p = _t(e, u.node);
                            o.push({ color: f, range: p });
                        }
                        if (a[l] = !0, --i <= 0)
                            return r && r.onResultLimitExceeded && r.onResultLimitExceeded(e.uri), o;
                    }
                }
            } return o; })); }, e.prototype.getColorPresentations = function (e, t, r, n) { var o, i = [], a = Math.round(255 * r.red), s = Math.round(255 * r.green), c = Math.round(255 * r.blue); function u(e) { var t = e.toString(16); return 2 !== t.length ? "0" + t : t; } return o = 1 === r.alpha ? "#".concat(u(a)).concat(u(s)).concat(u(c)) : "#".concat(u(a)).concat(u(s)).concat(u(c)).concat(u(Math.round(255 * r.alpha))), i.push({ label: o, textEdit: D.replace(n, JSON.stringify(o)) }), i; }, e; }();
        function _t(e, t) { return O.create(e.positionAt(t.offset), e.positionAt(t.offset + t.length)); }
        var Rt = r(3716), Lt = Qe.loadMessageBundle(), Dt = { schemaAssociations: [], schemas: { "http://json-schema.org/schema#": { $ref: "http://json-schema.org/draft-07/schema#" }, "http://json-schema.org/draft-04/schema#": { $schema: "http://json-schema.org/draft-04/schema#", definitions: { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, positiveInteger: { type: "integer", minimum: 0 }, positiveIntegerDefault0: { allOf: [{ $ref: "#/definitions/positiveInteger" }, { default: 0 }] }, simpleTypes: { type: "string", enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, minItems: 1, uniqueItems: !0 } }, type: "object", properties: { id: { type: "string", format: "uri" }, $schema: { type: "string", format: "uri" }, title: { type: "string" }, description: { type: "string" }, default: {}, multipleOf: { type: "number", minimum: 0, exclusiveMinimum: !0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "boolean", default: !1 }, minimum: { type: "number" }, exclusiveMinimum: { type: "boolean", default: !1 }, maxLength: { allOf: [{ $ref: "#/definitions/positiveInteger" }] }, minLength: { allOf: [{ $ref: "#/definitions/positiveIntegerDefault0" }] }, pattern: { type: "string", format: "regex" }, additionalItems: { anyOf: [{ type: "boolean" }, { $ref: "#" }], default: {} }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: {} }, maxItems: { allOf: [{ $ref: "#/definitions/positiveInteger" }] }, minItems: { allOf: [{ $ref: "#/definitions/positiveIntegerDefault0" }] }, uniqueItems: { type: "boolean", default: !1 }, maxProperties: { allOf: [{ $ref: "#/definitions/positiveInteger" }] }, minProperties: { allOf: [{ $ref: "#/definitions/positiveIntegerDefault0" }] }, required: { allOf: [{ $ref: "#/definitions/stringArray" }] }, additionalProperties: { anyOf: [{ type: "boolean" }, { $ref: "#" }], default: {} }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, enum: { type: "array", minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { anyOf: [{ type: "string", enum: ["date-time", "uri", "email", "hostname", "ipv4", "ipv6", "regex"] }, { type: "string" }] }, allOf: { allOf: [{ $ref: "#/definitions/schemaArray" }] }, anyOf: { allOf: [{ $ref: "#/definitions/schemaArray" }] }, oneOf: { allOf: [{ $ref: "#/definitions/schemaArray" }] }, not: { allOf: [{ $ref: "#" }] } }, dependencies: { exclusiveMaximum: ["maximum"], exclusiveMinimum: ["minimum"] }, default: {} }, "http://json-schema.org/draft-07/schema#": { definitions: { schemaArray: { type: "array", minItems: 1, items: { $ref: "#" } }, nonNegativeInteger: { type: "integer", minimum: 0 }, nonNegativeIntegerDefault0: { allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }] }, simpleTypes: { enum: ["array", "boolean", "integer", "null", "number", "object", "string"] }, stringArray: { type: "array", items: { type: "string" }, uniqueItems: !0, default: [] } }, type: ["object", "boolean"], properties: { $id: { type: "string", format: "uri-reference" }, $schema: { type: "string", format: "uri" }, $ref: { type: "string", format: "uri-reference" }, $comment: { type: "string" }, title: { type: "string" }, description: { type: "string" }, default: !0, readOnly: { type: "boolean", default: !1 }, examples: { type: "array", items: !0 }, multipleOf: { type: "number", exclusiveMinimum: 0 }, maximum: { type: "number" }, exclusiveMaximum: { type: "number" }, minimum: { type: "number" }, exclusiveMinimum: { type: "number" }, maxLength: { $ref: "#/definitions/nonNegativeInteger" }, minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, pattern: { type: "string", format: "regex" }, additionalItems: { $ref: "#" }, items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: !0 }, maxItems: { $ref: "#/definitions/nonNegativeInteger" }, minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, uniqueItems: { type: "boolean", default: !1 }, contains: { $ref: "#" }, maxProperties: { $ref: "#/definitions/nonNegativeInteger" }, minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" }, required: { $ref: "#/definitions/stringArray" }, additionalProperties: { $ref: "#" }, definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} }, patternProperties: { type: "object", additionalProperties: { $ref: "#" }, propertyNames: { format: "regex" }, default: {} }, dependencies: { type: "object", additionalProperties: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }] } }, propertyNames: { $ref: "#" }, const: !0, enum: { type: "array", items: !0, minItems: 1, uniqueItems: !0 }, type: { anyOf: [{ $ref: "#/definitions/simpleTypes" }, { type: "array", items: { $ref: "#/definitions/simpleTypes" }, minItems: 1, uniqueItems: !0 }] }, format: { type: "string" }, contentMediaType: { type: "string" }, contentEncoding: { type: "string" }, if: { $ref: "#" }, then: { $ref: "#" }, else: { $ref: "#" }, allOf: { $ref: "#/definitions/schemaArray" }, anyOf: { $ref: "#/definitions/schemaArray" }, oneOf: { $ref: "#/definitions/schemaArray" }, not: { $ref: "#" } }, default: !0 } } }, Vt = { id: Lt("schema.json.id", "A unique identifier for the schema."), $schema: Lt("schema.json.$schema", "The schema to verify this document against."), title: Lt("schema.json.title", "A descriptive title of the element."), description: Lt("schema.json.description", "A long description of the element. Used in hover menus and suggestions."), default: Lt("schema.json.default", "A default value. Used by suggestions."), multipleOf: Lt("schema.json.multipleOf", "A number that should cleanly divide the current value (i.e. have no remainder)."), maximum: Lt("schema.json.maximum", "The maximum numerical value, inclusive by default."), exclusiveMaximum: Lt("schema.json.exclusiveMaximum", "Makes the maximum property exclusive."), minimum: Lt("schema.json.minimum", "The minimum numerical value, inclusive by default."), exclusiveMinimum: Lt("schema.json.exclusiveMininum", "Makes the minimum property exclusive."), maxLength: Lt("schema.json.maxLength", "The maximum length of a string."), minLength: Lt("schema.json.minLength", "The minimum length of a string."), pattern: Lt("schema.json.pattern", "A regular expression to match the string against. It is not implicitly anchored."), additionalItems: Lt("schema.json.additionalItems", "For arrays, only when items is set as an array. If it is a schema, then this schema validates items after the ones specified by the items array. If it is false, then additional items will cause validation to fail."), items: Lt("schema.json.items", "For arrays. Can either be a schema to validate every element against or an array of schemas to validate each item against in order (the first schema will validate the first element, the second schema will validate the second element, and so on."), maxItems: Lt("schema.json.maxItems", "The maximum number of items that can be inside an array. Inclusive."), minItems: Lt("schema.json.minItems", "The minimum number of items that can be inside an array. Inclusive."), uniqueItems: Lt("schema.json.uniqueItems", "If all of the items in the array must be unique. Defaults to false."), maxProperties: Lt("schema.json.maxProperties", "The maximum number of properties an object can have. Inclusive."), minProperties: Lt("schema.json.minProperties", "The minimum number of properties an object can have. Inclusive."), required: Lt("schema.json.required", "An array of strings that lists the names of all properties required on this object."), additionalProperties: Lt("schema.json.additionalProperties", "Either a schema or a boolean. If a schema, then used to validate all properties not matched by 'properties' or 'patternProperties'. If false, then any properties not matched by either will cause this schema to fail."), definitions: Lt("schema.json.definitions", "Not used for validation. Place subschemas here that you wish to reference inline with $ref."), properties: Lt("schema.json.properties", "A map of property names to schemas for each property."), patternProperties: Lt("schema.json.patternProperties", "A map of regular expressions on property names to schemas for matching properties."), dependencies: Lt("schema.json.dependencies", "A map of property names to either an array of property names or a schema. An array of property names means the property named in the key depends on the properties in the array being present in the object in order to be valid. If the value is a schema, then the schema is only applied to the object if the property in the key exists on the object."), enum: Lt("schema.json.enum", "The set of literal values that are valid."), type: Lt("schema.json.type", "Either a string of one of the basic schema types (number, integer, null, array, object, boolean, string) or an array of strings specifying a subset of those types."), format: Lt("schema.json.format", "Describes the format expected for the value."), allOf: Lt("schema.json.allOf", "An array of schemas, all of which must match."), anyOf: Lt("schema.json.anyOf", "An array of schemas, where at least one must match."), oneOf: Lt("schema.json.oneOf", "An array of schemas, exactly one of which must match."), not: Lt("schema.json.not", "A schema which must not match."), $id: Lt("schema.json.$id", "A unique identifier for the schema."), $ref: Lt("schema.json.$ref", "Reference a definition hosted on any location."), $comment: Lt("schema.json.$comment", "Comments from schema authors to readers or maintainers of the schema."), readOnly: Lt("schema.json.readOnly", "Indicates that the value of the instance is managed exclusively by the owning authority."), examples: Lt("schema.json.examples", "Sample JSON values associated with a particular schema, for the purpose of illustrating usage."), contains: Lt("schema.json.contains", 'An array instance is valid against "contains" if at least one of its elements is valid against the given schema.'), propertyNames: Lt("schema.json.propertyNames", "If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema."), const: Lt("schema.json.const", "An instance validates successfully against this keyword if its value is equal to the value of the keyword."), contentMediaType: Lt("schema.json.contentMediaType", "Describes the media type of a string property."), contentEncoding: Lt("schema.json.contentEncoding", "Describes the content encoding of a string property."), if: Lt("schema.json.if", 'The validation outcome of the "if" subschema controls which of the "then" or "else" keywords are evaluated.'), then: Lt("schema.json.then", 'The "if" subschema is used for validation when the "if" subschema succeeds.'), else: Lt("schema.json.else", 'The "else" subschema is used for validation when the "if" subschema fails.') };
        for (var Ut in Dt.schemas) {
            var $t = Dt.schemas[Ut];
            for (var Bt in $t.properties) {
                var qt = $t.properties[Bt];
                "boolean" == typeof qt && (qt = $t.properties[Bt] = {});
                var Wt = Vt[Bt];
                Wt ? qt.description = Wt : Rt.log("".concat(Bt, ": localize('schema.json.").concat(Bt, '\', "")'));
            }
        }
        var zt, Gt = r(4406);
        (() => { var e = { 470: e => { function t(e) { if ("string" != typeof e)
                throw new TypeError("Path must be a string. Received " + JSON.stringify(e)); } function r(e, t) { for (var r, n = "", o = 0, i = -1, a = 0, s = 0; s <= e.length; ++s) {
                if (s < e.length)
                    r = e.charCodeAt(s);
                else {
                    if (47 === r)
                        break;
                    r = 47;
                }
                if (47 === r) {
                    if (i === s - 1 || 1 === a)
                        ;
                    else if (i !== s - 1 && 2 === a) {
                        if (n.length < 2 || 2 !== o || 46 !== n.charCodeAt(n.length - 1) || 46 !== n.charCodeAt(n.length - 2))
                            if (n.length > 2) {
                                var c = n.lastIndexOf("/");
                                if (c !== n.length - 1) {
                                    -1 === c ? (n = "", o = 0) : o = (n = n.slice(0, c)).length - 1 - n.lastIndexOf("/"), i = s, a = 0;
                                    continue;
                                }
                            }
                            else if (2 === n.length || 1 === n.length) {
                                n = "", o = 0, i = s, a = 0;
                                continue;
                            }
                        t && (n.length > 0 ? n += "/.." : n = "..", o = 2);
                    }
                    else
                        n.length > 0 ? n += "/" + e.slice(i + 1, s) : n = e.slice(i + 1, s), o = s - i - 1;
                    i = s, a = 0;
                }
                else
                    46 === r && -1 !== a ? ++a : a = -1;
            } return n; } var n = { resolve: function () { for (var e, n = "", o = !1, i = arguments.length - 1; i >= -1 && !o; i--) {
                    var a;
                    i >= 0 ? a = arguments[i] : (void 0 === e && (e = Gt.cwd()), a = e), t(a), 0 !== a.length && (n = a + "/" + n, o = 47 === a.charCodeAt(0));
                } return n = r(n, !o), o ? n.length > 0 ? "/" + n : "/" : n.length > 0 ? n : "."; }, normalize: function (e) { if (t(e), 0 === e.length)
                    return "."; var n = 47 === e.charCodeAt(0), o = 47 === e.charCodeAt(e.length - 1); return 0 !== (e = r(e, !n)).length || n || (e = "."), e.length > 0 && o && (e += "/"), n ? "/" + e : e; }, isAbsolute: function (e) { return t(e), e.length > 0 && 47 === e.charCodeAt(0); }, join: function () { if (0 === arguments.length)
                    return "."; for (var e, r = 0; r < arguments.length; ++r) {
                    var o = arguments[r];
                    t(o), o.length > 0 && (void 0 === e ? e = o : e += "/" + o);
                } return void 0 === e ? "." : n.normalize(e); }, relative: function (e, r) { if (t(e), t(r), e === r)
                    return ""; if ((e = n.resolve(e)) === (r = n.resolve(r)))
                    return ""; for (var o = 1; o < e.length && 47 === e.charCodeAt(o); ++o)
                    ; for (var i = e.length, a = i - o, s = 1; s < r.length && 47 === r.charCodeAt(s); ++s)
                    ; for (var c = r.length - s, u = a < c ? a : c, l = -1, f = 0; f <= u; ++f) {
                    if (f === u) {
                        if (c > u) {
                            if (47 === r.charCodeAt(s + f))
                                return r.slice(s + f + 1);
                            if (0 === f)
                                return r.slice(s + f);
                        }
                        else
                            a > u && (47 === e.charCodeAt(o + f) ? l = f : 0 === f && (l = 0));
                        break;
                    }
                    var p = e.charCodeAt(o + f);
                    if (p !== r.charCodeAt(s + f))
                        break;
                    47 === p && (l = f);
                } var h = ""; for (f = o + l + 1; f <= i; ++f)
                    f !== i && 47 !== e.charCodeAt(f) || (0 === h.length ? h += ".." : h += "/.."); return h.length > 0 ? h + r.slice(s + l) : (s += l, 47 === r.charCodeAt(s) && ++s, r.slice(s)); }, _makeLong: function (e) { return e; }, dirname: function (e) { if (t(e), 0 === e.length)
                    return "."; for (var r = e.charCodeAt(0), n = 47 === r, o = -1, i = !0, a = e.length - 1; a >= 1; --a)
                    if (47 === (r = e.charCodeAt(a))) {
                        if (!i) {
                            o = a;
                            break;
                        }
                    }
                    else
                        i = !1; return -1 === o ? n ? "/" : "." : n && 1 === o ? "//" : e.slice(0, o); }, basename: function (e, r) { if (void 0 !== r && "string" != typeof r)
                    throw new TypeError('"ext" argument must be a string'); t(e); var n, o = 0, i = -1, a = !0; if (void 0 !== r && r.length > 0 && r.length <= e.length) {
                    if (r.length === e.length && r === e)
                        return "";
                    var s = r.length - 1, c = -1;
                    for (n = e.length - 1; n >= 0; --n) {
                        var u = e.charCodeAt(n);
                        if (47 === u) {
                            if (!a) {
                                o = n + 1;
                                break;
                            }
                        }
                        else
                            -1 === c && (a = !1, c = n + 1), s >= 0 && (u === r.charCodeAt(s) ? -1 == --s && (i = n) : (s = -1, i = c));
                    }
                    return o === i ? i = c : -1 === i && (i = e.length), e.slice(o, i);
                } for (n = e.length - 1; n >= 0; --n)
                    if (47 === e.charCodeAt(n)) {
                        if (!a) {
                            o = n + 1;
                            break;
                        }
                    }
                    else
                        -1 === i && (a = !1, i = n + 1); return -1 === i ? "" : e.slice(o, i); }, extname: function (e) { t(e); for (var r = -1, n = 0, o = -1, i = !0, a = 0, s = e.length - 1; s >= 0; --s) {
                    var c = e.charCodeAt(s);
                    if (47 !== c)
                        -1 === o && (i = !1, o = s + 1), 46 === c ? -1 === r ? r = s : 1 !== a && (a = 1) : -1 !== r && (a = -1);
                    else if (!i) {
                        n = s + 1;
                        break;
                    }
                } return -1 === r || -1 === o || 0 === a || 1 === a && r === o - 1 && r === n + 1 ? "" : e.slice(r, o); }, format: function (e) { if (null === e || "object" != typeof e)
                    throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e); return function (e, t) { var r = t.dir || t.root, n = t.base || (t.name || "") + (t.ext || ""); return r ? r === t.root ? r + n : r + "/" + n : n; }(0, e); }, parse: function (e) { t(e); var r = { root: "", dir: "", base: "", ext: "", name: "" }; if (0 === e.length)
                    return r; var n, o = e.charCodeAt(0), i = 47 === o; i ? (r.root = "/", n = 1) : n = 0; for (var a = -1, s = 0, c = -1, u = !0, l = e.length - 1, f = 0; l >= n; --l)
                    if (47 !== (o = e.charCodeAt(l)))
                        -1 === c && (u = !1, c = l + 1), 46 === o ? -1 === a ? a = l : 1 !== f && (f = 1) : -1 !== a && (f = -1);
                    else if (!u) {
                        s = l + 1;
                        break;
                    } return -1 === a || -1 === c || 0 === f || 1 === f && a === c - 1 && a === s + 1 ? -1 !== c && (r.base = r.name = 0 === s && i ? e.slice(1, c) : e.slice(s, c)) : (0 === s && i ? (r.name = e.slice(1, a), r.base = e.slice(1, c)) : (r.name = e.slice(s, a), r.base = e.slice(s, c)), r.ext = e.slice(a, c)), s > 0 ? r.dir = e.slice(0, s - 1) : i && (r.dir = "/"), r; }, sep: "/", delimiter: ":", win32: null, posix: null }; n.posix = n, e.exports = n; } }, t = {}; function r(n) { var o = t[n]; if (void 0 !== o)
            return o.exports; var i = t[n] = { exports: {} }; return e[n](i, i.exports, r), i.exports; } r.d = (e, t) => { for (var n in t)
            r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] }); }, r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), r.r = e => { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }); }; var n = {}; (() => { var e; if (r.r(n), r.d(n, { URI: () => d, Utils: () => k }), "object" == typeof Gt)
            e = "win32" === Gt.platform;
        else if ("object" == typeof navigator) {
            var t = navigator.userAgent;
            e = t.indexOf("Windows") >= 0;
        } var o, i, a = (o = function (e, t) { return o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var r in t)
            Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]); }, o(e, t); }, function (e, t) { if ("function" != typeof t && null !== t)
            throw new TypeError("Class extends value " + String(t) + " is not a constructor or null"); function r() { this.constructor = e; } o(e, t), e.prototype = null === t ? Object.create(t) : (r.prototype = t.prototype, new r); }), s = /^\w[\w\d+.-]*$/, c = /^\//, u = /^\/\//; function l(e, t) { if (!e.scheme && t)
            throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "'.concat(e.authority, '", path: "').concat(e.path, '", query: "').concat(e.query, '", fragment: "').concat(e.fragment, '"}')); if (e.scheme && !s.test(e.scheme))
            throw new Error("[UriError]: Scheme contains illegal characters."); if (e.path)
            if (e.authority) {
                if (!c.test(e.path))
                    throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
            }
            else if (u.test(e.path))
                throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'); } var f = "", p = "/", h = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/, d = function () { function t(e, t, r, n, o, i) { void 0 === i && (i = !1), "object" == typeof e ? (this.scheme = e.scheme || f, this.authority = e.authority || f, this.path = e.path || f, this.query = e.query || f, this.fragment = e.fragment || f) : (this.scheme = function (e, t) { return e || t ? e : "file"; }(e, i), this.authority = t || f, this.path = function (e, t) { switch (e) {
            case "https":
            case "http":
            case "file": t ? t[0] !== p && (t = p + t) : t = p;
        } return t; }(this.scheme, r || f), this.query = n || f, this.fragment = o || f, l(this, i)); } return t.isUri = function (e) { return e instanceof t || !!e && "string" == typeof e.authority && "string" == typeof e.fragment && "string" == typeof e.path && "string" == typeof e.query && "string" == typeof e.scheme && "string" == typeof e.fsPath && "function" == typeof e.with && "function" == typeof e.toString; }, Object.defineProperty(t.prototype, "fsPath", { get: function () { return x(this, !1); }, enumerable: !1, configurable: !0 }), t.prototype.with = function (e) { if (!e)
            return this; var t = e.scheme, r = e.authority, n = e.path, o = e.query, i = e.fragment; return void 0 === t ? t = this.scheme : null === t && (t = f), void 0 === r ? r = this.authority : null === r && (r = f), void 0 === n ? n = this.path : null === n && (n = f), void 0 === o ? o = this.query : null === o && (o = f), void 0 === i ? i = this.fragment : null === i && (i = f), t === this.scheme && r === this.authority && n === this.path && o === this.query && i === this.fragment ? this : new m(t, r, n, o, i); }, t.parse = function (e, t) { void 0 === t && (t = !1); var r = h.exec(e); return r ? new m(r[2] || f, O(r[4] || f), O(r[5] || f), O(r[7] || f), O(r[9] || f), t) : new m(f, f, f, f, f); }, t.file = function (t) { var r = f; if (e && (t = t.replace(/\\/g, p)), t[0] === p && t[1] === p) {
            var n = t.indexOf(p, 2);
            -1 === n ? (r = t.substring(2), t = p) : (r = t.substring(2, n), t = t.substring(n) || p);
        } return new m("file", r, t, f, f); }, t.from = function (e) { var t = new m(e.scheme, e.authority, e.path, e.query, e.fragment); return l(t, !0), t; }, t.prototype.toString = function (e) { return void 0 === e && (e = !1), S(this, e); }, t.prototype.toJSON = function () { return this; }, t.revive = function (e) { if (e) {
            if (e instanceof t)
                return e;
            var r = new m(e);
            return r._formatted = e.external, r._fsPath = e._sep === g ? e.fsPath : null, r;
        } return e; }, t; }(), g = e ? 1 : void 0, m = function (e) { function t() { var t = null !== e && e.apply(this, arguments) || this; return t._formatted = null, t._fsPath = null, t; } return a(t, e), Object.defineProperty(t.prototype, "fsPath", { get: function () { return this._fsPath || (this._fsPath = x(this, !1)), this._fsPath; }, enumerable: !1, configurable: !0 }), t.prototype.toString = function (e) { return void 0 === e && (e = !1), e ? S(this, !0) : (this._formatted || (this._formatted = S(this, !1)), this._formatted); }, t.prototype.toJSON = function () { var e = { $mid: 1 }; return this._fsPath && (e.fsPath = this._fsPath, e._sep = g), this._formatted && (e.external = this._formatted), this.path && (e.path = this.path), this.scheme && (e.scheme = this.scheme), this.authority && (e.authority = this.authority), this.query && (e.query = this.query), this.fragment && (e.fragment = this.fragment), e; }, t; }(d), y = ((i = {})[58] = "%3A", i[47] = "%2F", i[63] = "%3F", i[35] = "%23", i[91] = "%5B", i[93] = "%5D", i[64] = "%40", i[33] = "%21", i[36] = "%24", i[38] = "%26", i[39] = "%27", i[40] = "%28", i[41] = "%29", i[42] = "%2A", i[43] = "%2B", i[44] = "%2C", i[59] = "%3B", i[61] = "%3D", i[32] = "%20", i); function v(e, t, r) { for (var n = void 0, o = -1, i = 0; i < e.length; i++) {
            var a = e.charCodeAt(i);
            if (a >= 97 && a <= 122 || a >= 65 && a <= 90 || a >= 48 && a <= 57 || 45 === a || 46 === a || 95 === a || 126 === a || t && 47 === a || r && 91 === a || r && 93 === a || r && 58 === a)
                -1 !== o && (n += encodeURIComponent(e.substring(o, i)), o = -1), void 0 !== n && (n += e.charAt(i));
            else {
                void 0 === n && (n = e.substr(0, i));
                var s = y[a];
                void 0 !== s ? (-1 !== o && (n += encodeURIComponent(e.substring(o, i)), o = -1), n += s) : -1 === o && (o = i);
            }
        } return -1 !== o && (n += encodeURIComponent(e.substring(o))), void 0 !== n ? n : e; } function b(e) { for (var t = void 0, r = 0; r < e.length; r++) {
            var n = e.charCodeAt(r);
            35 === n || 63 === n ? (void 0 === t && (t = e.substr(0, r)), t += y[n]) : void 0 !== t && (t += e[r]);
        } return void 0 !== t ? t : e; } function x(t, r) { var n; return n = t.authority && t.path.length > 1 && "file" === t.scheme ? "//".concat(t.authority).concat(t.path) : 47 === t.path.charCodeAt(0) && (t.path.charCodeAt(1) >= 65 && t.path.charCodeAt(1) <= 90 || t.path.charCodeAt(1) >= 97 && t.path.charCodeAt(1) <= 122) && 58 === t.path.charCodeAt(2) ? r ? t.path.substr(1) : t.path[1].toLowerCase() + t.path.substr(2) : t.path, e && (n = n.replace(/\//g, "\\")), n; } function S(e, t) { var r = t ? b : v, n = "", o = e.scheme, i = e.authority, a = e.path, s = e.query, c = e.fragment; if (o && (n += o, n += ":"), (i || "file" === o) && (n += p, n += p), i) {
            var u = i.indexOf("@");
            if (-1 !== u) {
                var l = i.substr(0, u);
                i = i.substr(u + 1), -1 === (u = l.lastIndexOf(":")) ? n += r(l, !1, !1) : (n += r(l.substr(0, u), !1, !1), n += ":", n += r(l.substr(u + 1), !1, !0)), n += "@";
            }
            -1 === (u = (i = i.toLowerCase()).lastIndexOf(":")) ? n += r(i, !1, !0) : (n += r(i.substr(0, u), !1, !0), n += i.substr(u));
        } if (a) {
            if (a.length >= 3 && 47 === a.charCodeAt(0) && 58 === a.charCodeAt(2))
                (f = a.charCodeAt(1)) >= 65 && f <= 90 && (a = "/".concat(String.fromCharCode(f + 32), ":").concat(a.substr(3)));
            else if (a.length >= 2 && 58 === a.charCodeAt(1)) {
                var f;
                (f = a.charCodeAt(0)) >= 65 && f <= 90 && (a = "".concat(String.fromCharCode(f + 32), ":").concat(a.substr(2)));
            }
            n += r(a, !0, !1);
        } return s && (n += "?", n += r(s, !1, !1)), c && (n += "#", n += t ? c : v(c, !1, !1)), n; } function A(e) { try {
            return decodeURIComponent(e);
        }
        catch (t) {
            return e.length > 3 ? e.substr(0, 3) + A(e.substr(3)) : e;
        } } var w = /(%[0-9A-Za-z][0-9A-Za-z])+/g; function O(e) { return e.match(w) ? e.replace(w, (function (e) { return A(e); })) : e; } var k, E = r(470), j = function (e, t, r) { if (r || 2 === arguments.length)
            for (var n, o = 0, i = t.length; o < i; o++)
                !n && o in t || (n || (n = Array.prototype.slice.call(t, 0, o)), n[o] = t[o]); return e.concat(n || Array.prototype.slice.call(t)); }, T = E.posix || E, C = "/"; !function (e) { e.joinPath = function (e) { for (var t = [], r = 1; r < arguments.length; r++)
            t[r - 1] = arguments[r]; return e.with({ path: T.join.apply(T, j([e.path], t, !1)) }); }, e.resolvePath = function (e) { for (var t = [], r = 1; r < arguments.length; r++)
            t[r - 1] = arguments[r]; var n = e.path, o = !1; n[0] !== C && (n = C + n, o = !0); var i = T.resolve.apply(T, j([n], t, !1)); return o && i[0] === C && !e.authority && (i = i.substring(1)), e.with({ path: i }); }, e.dirname = function (e) { if (0 === e.path.length || e.path === C)
            return e; var t = T.dirname(e.path); return 1 === t.length && 46 === t.charCodeAt(0) && (t = ""), e.with({ path: t }); }, e.basename = function (e) { return T.basename(e.path); }, e.extname = function (e) { return T.extname(e.path); }; }(k || (k = {})); })(), zt = n; })();
        const { URI: Kt, Utils: Jt } = zt;
        function Ht(e, t) { if ("string" != typeof e)
            throw new TypeError("Expected a string"); for (var r, n = String(e), o = "", i = !!t && !!t.extended, a = !!t && !!t.globstar, s = !1, c = t && "string" == typeof t.flags ? t.flags : "", u = 0, l = n.length; u < l; u++)
            switch (r = n[u]) {
                case "/":
                case "$":
                case "^":
                case "+":
                case ".":
                case "(":
                case ")":
                case "=":
                case "!":
                case "|":
                    o += "\\" + r;
                    break;
                case "?": if (i) {
                    o += ".";
                    break;
                }
                case "[":
                case "]": if (i) {
                    o += r;
                    break;
                }
                case "{": if (i) {
                    s = !0, o += "(";
                    break;
                }
                case "}": if (i) {
                    s = !1, o += ")";
                    break;
                }
                case ",":
                    if (s) {
                        o += "|";
                        break;
                    }
                    o += "\\" + r;
                    break;
                case "*":
                    for (var f = n[u - 1], p = 1; "*" === n[u + 1];)
                        p++, u++;
                    var h = n[u + 1];
                    a ? !(p > 1) || "/" !== f && void 0 !== f && "{" !== f && "," !== f || "/" !== h && void 0 !== h && "," !== h && "}" !== h ? o += "([^/]*)" : ("/" === h ? u++ : "/" === f && o.endsWith("\\/") && (o = o.substr(0, o.length - 2)), o += "((?:[^/]*(?:/|$))*)") : o += ".*";
                    break;
                default: o += r;
            } return c && ~c.indexOf("g") || (o = "^" + o + "$"), new RegExp(o, c); }
        var Xt = Qe.loadMessageBundle(), Zt = function () { function e(e, t) { this.globWrappers = []; try {
            for (var r = 0, n = e; r < n.length; r++) {
                var o = n[r], i = "!" !== o[0];
                i || (o = o.substring(1)), o.length > 0 && ("/" === o[0] && (o = o.substring(1)), this.globWrappers.push({ regexp: Ht("**/" + o, { extended: !0, globstar: !0 }), include: i }));
            }
            this.uris = t;
        }
        catch (e) {
            this.globWrappers.length = 0, this.uris = [];
        } } return e.prototype.matchesPattern = function (e) { for (var t = !1, r = 0, n = this.globWrappers; r < n.length; r++) {
            var o = n[r], i = o.regexp, a = o.include;
            i.test(e) && (t = a);
        } return t; }, e.prototype.getURIs = function () { return this.uris; }, e; }(), Yt = function () { function e(e, t, r) { this.service = e, this.uri = t, this.dependencies = new Set, this.anchors = void 0, r && (this.unresolvedSchema = this.service.promise.resolve(new Qt(r))); } return e.prototype.getUnresolvedSchema = function () { return this.unresolvedSchema || (this.unresolvedSchema = this.service.loadSchema(this.uri)), this.unresolvedSchema; }, e.prototype.getResolvedSchema = function () { var e = this; return this.resolvedSchema || (this.resolvedSchema = this.getUnresolvedSchema().then((function (t) { return e.service.resolveSchemaContent(t, e); }))), this.resolvedSchema; }, e.prototype.clearSchema = function () { var e = !!this.unresolvedSchema; return this.resolvedSchema = void 0, this.unresolvedSchema = void 0, this.dependencies.clear(), this.anchors = void 0, e; }, e; }(), Qt = function (e, t) { void 0 === t && (t = []), this.schema = e, this.errors = t; }, er = function () { function e(e, t) { void 0 === t && (t = []), this.schema = e, this.errors = t; } return e.prototype.getSection = function (e) { var t = this.getSectionRecursive(e, this.schema); if (t)
            return ft(t); }, e.prototype.getSectionRecursive = function (e, t) { if (!t || "boolean" == typeof t || 0 === e.length)
            return t; var r = e.shift(); if (t.properties && (t.properties[r], 1))
            return this.getSectionRecursive(e, t.properties[r]); if (t.patternProperties)
            for (var n = 0, o = Object.keys(t.patternProperties); n < o.length; n++) {
                var i = o[n], a = Y(i);
                if (null == a ? void 0 : a.test(r))
                    return this.getSectionRecursive(e, t.patternProperties[i]);
            }
        else {
            if ("object" == typeof t.additionalProperties)
                return this.getSectionRecursive(e, t.additionalProperties);
            if (r.match("[0-9]+"))
                if (Array.isArray(t.items)) {
                    var s = parseInt(r, 10);
                    if (!isNaN(s) && t.items[s])
                        return this.getSectionRecursive(e, t.items[s]);
                }
                else if (t.items)
                    return this.getSectionRecursive(e, t.items);
        } }, e; }(), tr = function () { function e(e, t, r) { this.contextService = t, this.requestService = e, this.promiseConstructor = r || Promise, this.callOnDispose = [], this.contributionSchemas = {}, this.contributionAssociations = [], this.schemasById = {}, this.filePatternAssociations = [], this.registeredSchemasIds = {}; } return e.prototype.getRegisteredSchemaIds = function (e) { return Object.keys(this.registeredSchemasIds).filter((function (t) { var r = Kt.parse(t).scheme; return "schemaservice" !== r && (!e || e(r)); })); }, Object.defineProperty(e.prototype, "promise", { get: function () { return this.promiseConstructor; }, enumerable: !1, configurable: !0 }), e.prototype.dispose = function () { for (; this.callOnDispose.length > 0;)
            this.callOnDispose.pop()(); }, e.prototype.onResourceChange = function (e) { var t = this; this.cachedSchemaForResource = void 0; for (var r = !1, n = [e = nr(e)], o = Object.keys(this.schemasById).map((function (e) { return t.schemasById[e]; })); n.length;)
            for (var i = n.pop(), a = 0; a < o.length; a++) {
                var s = o[a];
                s && (s.uri === i || s.dependencies.has(i)) && (s.uri !== i && n.push(s.uri), s.clearSchema() && (r = !0), o[a] = void 0);
            } return r; }, e.prototype.setSchemaContributions = function (e) { if (e.schemas) {
            var t = e.schemas;
            for (var r in t) {
                var n = nr(r);
                this.contributionSchemas[n] = this.addSchemaHandle(n, t[r]);
            }
        } if (Array.isArray(e.schemaAssociations))
            for (var o = 0, i = e.schemaAssociations; o < i.length; o++) {
                var a = i[o], s = a.uris.map(nr), c = this.addFilePatternAssociation(a.pattern, s);
                this.contributionAssociations.push(c);
            } }, e.prototype.addSchemaHandle = function (e, t) { var r = new Yt(this, e, t); return this.schemasById[e] = r, r; }, e.prototype.getOrAddSchemaHandle = function (e, t) { return this.schemasById[e] || this.addSchemaHandle(e, t); }, e.prototype.addFilePatternAssociation = function (e, t) { var r = new Zt(e, t); return this.filePatternAssociations.push(r), r; }, e.prototype.registerExternalSchema = function (e, t, r) { var n = nr(e); return this.registeredSchemasIds[n] = !0, this.cachedSchemaForResource = void 0, t && this.addFilePatternAssociation(t, [n]), r ? this.addSchemaHandle(n, r) : this.getOrAddSchemaHandle(n); }, e.prototype.clearExternalSchemas = function () { for (var e in this.schemasById = {}, this.filePatternAssociations = [], this.registeredSchemasIds = {}, this.cachedSchemaForResource = void 0, this.contributionSchemas)
            this.schemasById[e] = this.contributionSchemas[e], this.registeredSchemasIds[e] = !0; for (var t = 0, r = this.contributionAssociations; t < r.length; t++) {
            var n = r[t];
            this.filePatternAssociations.push(n);
        } }, e.prototype.getResolvedSchema = function (e) { var t = nr(e), r = this.schemasById[t]; return r ? r.getResolvedSchema() : this.promise.resolve(void 0); }, e.prototype.loadSchema = function (e) { if (!this.requestService) {
            var t = Xt("json.schema.norequestservice", "Unable to load schema from '{0}'. No schema request service available", or(e));
            return this.promise.resolve(new Qt({}, [t]));
        } return this.requestService(e).then((function (t) { if (!t) {
            var r = Xt("json.schema.nocontent", "Unable to load schema from '{0}': No content.", or(e));
            return new Qt({}, [r]);
        } var n, o = []; n = d(t, o); var i = o.length ? [Xt("json.schema.invalidFormat", "Unable to parse content from '{0}': Parse error at offset {1}.", or(e), o[0].offset)] : []; return new Qt(n, i); }), (function (t) { var r = t.toString(), n = t.toString().split("Error: "); return n.length > 1 && (r = n[1]), Z(r, ".") && (r = r.substr(0, r.length - 1)), new Qt({}, [Xt("json.schema.nocontent", "Unable to load schema from '{0}': {1}.", or(e), r)]); })); }, e.prototype.resolveSchemaContent = function (e, t) { var r = this, n = e.errors.slice(0), o = e.schema; if (o.$schema) {
            var i = nr(o.$schema);
            if ("http://json-schema.org/draft-03/schema" === i)
                return this.promise.resolve(new er({}, [Xt("json.schema.draft03.notsupported", "Draft-03 schemas are not supported.")]));
            "https://json-schema.org/draft/2019-09/schema" === i ? n.push(Xt("json.schema.draft201909.notsupported", "Draft 2019-09 schemas are not yet fully supported.")) : "https://json-schema.org/draft/2020-12/schema" === i && n.push(Xt("json.schema.draft202012.notsupported", "Draft 2020-12 schemas are not yet fully supported."));
        } var a = this.contextService, s = function (e, t, r, o) { var i; i = void 0 === o || 0 === o.length ? t : "/" === o.charAt(0) ? function (e, t) { t = decodeURIComponent(t); var r = e; return "/" === t[0] && (t = t.substring(1)), t.split("/").some((function (e) { return e = e.replace(/~1/g, "/").replace(/~0/g, "~"), !(r = r[e]); })), r; }(t, o) : function (e, t, r) { return t.anchors || (t.anchors = l(e)), t.anchors.get(r); }(t, r, o), i ? function (e, t) { for (var r in t)
            t.hasOwnProperty(r) && !e.hasOwnProperty(r) && "id" !== r && "$id" !== r && (e[r] = t[r]); }(e, i) : n.push(Xt("json.schema.invalidid", "$ref '{0}' in '{1}' can not be resolved.", o, r.uri)); }, c = function (e, t, o, i) { a && !/^[A-Za-z][A-Za-z0-9+\-.+]*:\/\/.*/.test(t) && (t = a.resolveRelativePath(t, i.uri)), t = nr(t); var c = r.getOrAddSchemaHandle(t); return c.getUnresolvedSchema().then((function (r) { if (i.dependencies.add(t), r.errors.length) {
            var a = o ? t + "#" + o : t;
            n.push(Xt("json.schema.problemloadingref", "Problems loading reference '{0}': {1}", a, r.errors[0]));
        } return s(e, r.schema, c, o), u(e, r.schema, c); })); }, u = function (e, t, n) { var o = []; return r.traverseNodes(e, (function (e) { for (var r = new Set; e.$ref;) {
            var i = e.$ref, a = i.split("#", 2);
            if (delete e.$ref, a[0].length > 0)
                return void o.push(c(e, a[0], a[1], n));
            if (!r.has(i)) {
                var u = a[1];
                s(e, t, n, u), r.add(i);
            }
        } })), r.promise.all(o); }, l = function (e) { var t = new Map; return r.traverseNodes(e, (function (e) { var r = e.$id || e.id; if ("string" == typeof r && "#" === r.charAt(0)) {
            var o = r.substring(1);
            t.has(o) ? n.push(Xt("json.schema.duplicateid", "Duplicate id declaration: '{0}'", r)) : t.set(o, e);
        } })), t; }; return u(o, o, t).then((function (e) { return new er(o, n); })); }, e.prototype.traverseNodes = function (e, t) { if (!e || "object" != typeof e)
            return Promise.resolve(null); for (var r = new Set, n = function () { for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t]; for (var r = 0, n = e; r < n.length; r++) {
            var o = n[r];
            "object" == typeof o && a.push(o);
        } }, o = function () { for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t]; for (var r = 0, n = e; r < n.length; r++) {
            var o = n[r];
            if ("object" == typeof o)
                for (var i in o) {
                    var s = i, c = o[s];
                    "object" == typeof c && a.push(c);
                }
        } }, i = function () { for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t]; for (var r = 0, n = e; r < n.length; r++) {
            var o = n[r];
            if (Array.isArray(o))
                for (var i = 0, s = o; i < s.length; i++) {
                    var c = s[i];
                    "object" == typeof c && a.push(c);
                }
        } }, a = [e], s = a.pop(); s;)
            r.has(s) || (r.add(s), t(s), n(s.items, s.additionalItems, s.additionalProperties, s.not, s.contains, s.propertyNames, s.if, s.then, s.else), o(s.definitions, s.properties, s.patternProperties, s.dependencies), i(s.anyOf, s.allOf, s.oneOf, s.items)), s = a.pop(); }, e.prototype.getSchemaFromProperty = function (e, t) { var r, n; if ("object" === (null === (r = t.root) || void 0 === r ? void 0 : r.type))
            for (var o = 0, i = t.root.properties; o < i.length; o++) {
                var a = i[o];
                if ("$schema" === a.keyNode.value && "string" === (null === (n = a.valueNode) || void 0 === n ? void 0 : n.type)) {
                    var s = a.valueNode.value;
                    return this.contextService && !/^\w[\w\d+.-]*:/.test(s) && (s = this.contextService.resolveRelativePath(s, e)), s;
                }
            } }, e.prototype.getAssociatedSchemas = function (e) { for (var t = Object.create(null), r = [], n = function (e) { try {
            return Kt.parse(e).with({ fragment: null, query: null }).toString(!0);
        }
        catch (t) {
            return e;
        } }(e), o = 0, i = this.filePatternAssociations; o < i.length; o++) {
            var a = i[o];
            if (a.matchesPattern(n))
                for (var s = 0, c = a.getURIs(); s < c.length; s++) {
                    var u = c[s];
                    t[u] || (r.push(u), t[u] = !0);
                }
        } return r; }, e.prototype.getSchemaURIsForResource = function (e, t) { var r = t && this.getSchemaFromProperty(e, t); return r ? [r] : this.getAssociatedSchemas(e); }, e.prototype.getSchemaForResource = function (e, t) { if (t) {
            var r = this.getSchemaFromProperty(e, t);
            if (r) {
                var n = nr(r);
                return this.getOrAddSchemaHandle(n).getResolvedSchema();
            }
        } if (this.cachedSchemaForResource && this.cachedSchemaForResource.resource === e)
            return this.cachedSchemaForResource.resolvedSchema; var o = this.getAssociatedSchemas(e), i = o.length > 0 ? this.createCombinedSchema(e, o).getResolvedSchema() : this.promise.resolve(void 0); return this.cachedSchemaForResource = { resource: e, resolvedSchema: i }, i; }, e.prototype.createCombinedSchema = function (e, t) { if (1 === t.length)
            return this.getOrAddSchemaHandle(t[0]); var r = "schemaservice://combinedSchema/" + encodeURIComponent(e), n = { allOf: t.map((function (e) { return { $ref: e }; })) }; return this.addSchemaHandle(r, n); }, e.prototype.getMatchingSchemas = function (e, t, r) { if (r) {
            var n = r.id || "schemaservice://untitled/matchingSchemas/" + rr++;
            return this.addSchemaHandle(n, r).getResolvedSchema().then((function (e) { return t.getMatchingSchemas(e.schema).filter((function (e) { return !e.inverted; })); }));
        } return this.getSchemaForResource(e.uri, t).then((function (e) { return e ? t.getMatchingSchemas(e.schema).filter((function (e) { return !e.inverted; })) : []; })); }, e; }(), rr = 0;
        function nr(e) { try {
            return Kt.parse(e).toString(!0);
        }
        catch (t) {
            return e;
        } }
        function or(e) { try {
            var t = Kt.parse(e);
            if ("file" === t.scheme)
                return t.fsPath;
        }
        catch (e) { } return e; }
        function ir(e, t) { var r = [], n = [], o = [], i = -1, a = f(e.getText(), !1), s = a.scan(); function c(e) { r.push(e), n.push(o.length); } for (; 17 !== s;) {
            switch (s) {
                case 1:
                case 3:
                    var u = { startLine: h = e.positionAt(a.getTokenOffset()).line, endLine: h, kind: 1 === s ? "object" : "array" };
                    o.push(u);
                    break;
                case 2:
                case 4:
                    var l = 2 === s ? "object" : "array";
                    if (o.length > 0 && o[o.length - 1].kind === l) {
                        u = o.pop();
                        var p = e.positionAt(a.getTokenOffset()).line;
                        u && p > u.startLine + 1 && i !== u.startLine && (u.endLine = p - 1, c(u), i = u.startLine);
                    }
                    break;
                case 13:
                    var h = e.positionAt(a.getTokenOffset()).line, d = e.positionAt(a.getTokenOffset() + a.getTokenLength()).line;
                    1 === a.getTokenError() && h + 1 < e.lineCount ? a.setPosition(e.offsetAt(w.create(h + 1, 0))) : h < d && (c({ startLine: h, endLine: d, kind: P.Comment }), i = h);
                    break;
                case 12:
                    var g = e.getText().substr(a.getTokenOffset(), a.getTokenLength()).match(/^\/\/\s*#(region\b)|(endregion\b)/);
                    if (g)
                        if (p = e.positionAt(a.getTokenOffset()).line, g[1])
                            u = { startLine: p, endLine: p, kind: P.Region }, o.push(u);
                        else {
                            for (var m = o.length - 1; m >= 0 && o[m].kind !== P.Region;)
                                m--;
                            m >= 0 && (u = o[m], o.length = m, p > u.startLine && i !== u.startLine && (u.endLine = p, c(u), i = u.startLine));
                        }
            }
            s = a.scan();
        } var y = t && t.rangeLimit; if ("number" != typeof y || r.length <= y)
            return r; t && t.onRangeLimitExceeded && t.onRangeLimitExceeded(e.uri); for (var v = [], b = 0, x = n; b < x.length; b++)
            (E = x[b]) < 30 && (v[E] = (v[E] || 0) + 1); var S = 0, A = 0; for (m = 0; m < v.length; m++) {
            var O = v[m];
            if (O) {
                if (O + S > y) {
                    A = m;
                    break;
                }
                S += O;
            }
        } var k = []; for (m = 0; m < r.length; m++) {
            var E;
            "number" == typeof (E = n[m]) && (E < A || E === A && S++ < y) && k.push(r[m]);
        } return k; }
        function ar(e, t, r) { function n(t, r) { return O.create(e.positionAt(t), e.positionAt(r)); } var o = f(e.getText(), !0); function i(e, t) { return o.setPosition(e), o.scan() === t ? o.getTokenOffset() + o.getTokenLength() : -1; } return t.map((function (t) { for (var o = e.offsetAt(t), a = r.getNodeFromOffset(o, !0), s = []; a;) {
            switch (a.type) {
                case "string":
                case "object":
                case "array":
                    var c = a.offset + 1, u = a.offset + a.length - 1;
                    c < u && o >= c && o <= u && s.push(n(c, u)), s.push(n(a.offset, a.offset + a.length));
                    break;
                case "number":
                case "boolean":
                case "null":
                case "property": s.push(n(a.offset, a.offset + a.length));
            }
            if ("property" === a.type || a.parent && "array" === a.parent.type) {
                var l = i(a.offset + a.length, 5);
                -1 !== l && s.push(n(a.offset, l));
            }
            a = a.parent;
        } for (var f = void 0, p = s.length - 1; p >= 0; p--)
            f = Ie.create(s[p], f); return f || (f = Ie.create(O.create(t, t))), f; })); }
        function sr(e, t) { var r = []; return t.visit((function (n) { var o; if ("property" === n.type && "$ref" === n.keyNode.value && "string" === (null === (o = n.valueNode) || void 0 === o ? void 0 : o.type)) {
            var i = n.valueNode.value, a = function (e, t) { var r = function (e) { return "#" === e ? [] : "#" !== e[0] || "/" !== e[1] ? null : e.substring(2).split(/\//).map(lr); }(t); return r ? ur(r, e.root) : null; }(t, i);
            if (a) {
                var s = e.positionAt(a.offset);
                r.push({ target: "".concat(e.uri, "#").concat(s.line + 1, ",").concat(s.character + 1), range: cr(e, n.valueNode) });
            }
        } return !0; })), Promise.resolve(r); }
        function cr(e, t) { return O.create(e.positionAt(t.offset + 1), e.positionAt(t.offset + t.length - 1)); }
        function ur(e, t) { if (!t)
            return null; if (0 === e.length)
            return t; var r = e.shift(); if (t && "object" === t.type) {
            var n = t.properties.find((function (e) { return e.keyNode.value === r; }));
            return n ? ur(e, n.valueNode) : null;
        } if (t && "array" === t.type && r.match(/^(0|[1-9][0-9]*)$/)) {
            var o = Number.parseInt(r), i = t.items[o];
            return i ? ur(e, i) : null;
        } return null; }
        function lr(e) { return e.replace(/~1/g, "/").replace(/~0/g, "~"); }
        function fr(e) { var t = e.promiseConstructor || Promise, r = new tr(e.schemaRequestService, e.workspaceContext, t); r.setSchemaContributions(Dt); var o = new wt(r, e.contributions, t, e.clientCapabilities), i = new Ot(r, e.contributions, t), a = new Ft(r), s = new jt(r, t); return { configure: function (e) { r.clearExternalSchemas(), e.schemas && e.schemas.forEach((function (e) { r.registerExternalSchema(e.uri, e.fileMatch, e.schema); })), s.configure(e); }, resetSchema: function (e) { return r.onResourceChange(e); }, doValidation: s.doValidation.bind(s), getLanguageStatus: s.getLanguageStatus.bind(s), parseJSONDocument: function (e) { return function (e, t) { var r = [], n = -1, o = e.getText(), i = f(o, !1), a = t && t.collectComments ? [] : void 0; function s() { for (;;) {
                var t = i.scan();
                switch (l(), t) {
                    case 12:
                    case 13:
                        Array.isArray(a) && a.push(O.create(e.positionAt(i.getTokenOffset()), e.positionAt(i.getTokenOffset() + i.getTokenLength())));
                        break;
                    case 15:
                    case 14: break;
                    default: return t;
                }
            } } function c(t, o, i, a, s) { if (void 0 === s && (s = N.Error), 0 === r.length || i !== n) {
                var c = O.create(e.positionAt(i), e.positionAt(a));
                r.push(R.create(c, t, s, o, e.languageId)), n = i;
            } } function u(e, t, r, n, a) { void 0 === r && (r = void 0), void 0 === n && (n = []), void 0 === a && (a = []); var u = i.getTokenOffset(), l = i.getTokenOffset() + i.getTokenLength(); if (u === l && u > 0) {
                for (u--; u > 0 && /\s/.test(o.charAt(u));)
                    u--;
                l = u + 1;
            } if (c(e, t, u, l), r && p(r, !1), n.length + a.length > 0)
                for (var f = i.getToken(); 17 !== f;) {
                    if (-1 !== n.indexOf(f)) {
                        s();
                        break;
                    }
                    if (-1 !== a.indexOf(f))
                        break;
                    f = s();
                } return r; } function l() { switch (i.getTokenError()) {
                case 4: return u(tt("InvalidUnicode", "Invalid unicode sequence in string."), Je.InvalidUnicode), !0;
                case 5: return u(tt("InvalidEscapeCharacter", "Invalid escape character in string."), Je.InvalidEscapeCharacter), !0;
                case 3: return u(tt("UnexpectedEndOfNumber", "Unexpected end of number."), Je.UnexpectedEndOfNumber), !0;
                case 1: return u(tt("UnexpectedEndOfComment", "Unexpected end of comment."), Je.UnexpectedEndOfComment), !0;
                case 2: return u(tt("UnexpectedEndOfString", "Unexpected end of string."), Je.UnexpectedEndOfString), !0;
                case 6: return u(tt("InvalidCharacter", "Invalid characters in string. Control characters must be escaped."), Je.InvalidCharacter), !0;
            } return !1; } function p(e, t) { return e.length = i.getTokenOffset() + i.getTokenLength() - e.offset, t && s(), e; } var h = new ct(void 0, 0, 0); function d(t, r) { var n = new ut(t, i.getTokenOffset(), h), o = g(n); if (!o) {
                if (16 !== i.getToken())
                    return;
                u(tt("DoubleQuotesExpected", "Property keys must be doublequoted"), Je.Undefined);
                var a = new ct(n, i.getTokenOffset(), i.getTokenLength());
                a.value = i.getTokenValue(), o = a, s();
            } n.keyNode = o; var l = r[o.value]; if (l ? (c(tt("DuplicateKeyWarning", "Duplicate object key"), Je.DuplicateKey, n.keyNode.offset, n.keyNode.offset + n.keyNode.length, N.Warning), "object" == typeof l && c(tt("DuplicateKeyWarning", "Duplicate object key"), Je.DuplicateKey, l.keyNode.offset, l.keyNode.offset + l.keyNode.length, N.Warning), r[o.value] = !0) : r[o.value] = n, 6 === i.getToken())
                n.colonOffset = i.getTokenOffset(), s();
            else if (u(tt("ColonExpected", "Colon expected"), Je.ColonExpected), 10 === i.getToken() && e.positionAt(o.offset + o.length).line < e.positionAt(i.getTokenOffset()).line)
                return n.length = o.length, n; var f = m(n); return f ? (n.valueNode = f, n.length = f.offset + f.length - n.offset, n) : u(tt("ValueExpected", "Value expected"), Je.ValueExpected, n, [], [2, 5]); } function g(e) { if (10 === i.getToken()) {
                var t = new ct(e, i.getTokenOffset());
                return t.value = i.getTokenValue(), p(t, !0);
            } } function m(e) { return function (e) { if (3 === i.getToken()) {
                var t = new at(e, i.getTokenOffset());
                s();
                for (var r = !1; 4 !== i.getToken() && 17 !== i.getToken();) {
                    if (5 === i.getToken()) {
                        r || u(tt("ValueExpected", "Value expected"), Je.ValueExpected);
                        var n = i.getTokenOffset();
                        if (s(), 4 === i.getToken()) {
                            r && c(tt("TrailingComma", "Trailing comma"), Je.TrailingComma, n, n + 1);
                            continue;
                        }
                    }
                    else
                        r && u(tt("ExpectedComma", "Expected comma"), Je.CommaExpected);
                    var o = m(t);
                    o ? t.items.push(o) : u(tt("PropertyExpected", "Value expected"), Je.ValueExpected, void 0, [], [4, 5]), r = !0;
                }
                return 4 !== i.getToken() ? u(tt("ExpectedCloseBracket", "Expected comma or closing bracket"), Je.CommaOrCloseBacketExpected, t) : p(t, !0);
            } }(e) || function (e) { if (1 === i.getToken()) {
                var t = new lt(e, i.getTokenOffset()), r = Object.create(null);
                s();
                for (var n = !1; 2 !== i.getToken() && 17 !== i.getToken();) {
                    if (5 === i.getToken()) {
                        n || u(tt("PropertyExpected", "Property expected"), Je.PropertyExpected);
                        var o = i.getTokenOffset();
                        if (s(), 2 === i.getToken()) {
                            n && c(tt("TrailingComma", "Trailing comma"), Je.TrailingComma, o, o + 1);
                            continue;
                        }
                    }
                    else
                        n && u(tt("ExpectedComma", "Expected comma"), Je.CommaExpected);
                    var a = d(t, r);
                    a ? t.properties.push(a) : u(tt("PropertyExpected", "Property expected"), Je.PropertyExpected, void 0, [], [2, 5]), n = !0;
                }
                return 2 !== i.getToken() ? u(tt("ExpectedCloseBrace", "Expected comma or closing brace"), Je.CommaOrCloseBraceExpected, t) : p(t, !0);
            } }(e) || g(e) || function (e) { if (11 === i.getToken()) {
                var t = new st(e, i.getTokenOffset());
                if (0 === i.getTokenError()) {
                    var r = i.getTokenValue();
                    try {
                        var n = JSON.parse(r);
                        if (!J(n))
                            return u(tt("InvalidNumberFormat", "Invalid number format."), Je.Undefined, t);
                        t.value = n;
                    }
                    catch (e) {
                        return u(tt("InvalidNumberFormat", "Invalid number format."), Je.Undefined, t);
                    }
                    t.isInteger = -1 === r.indexOf(".");
                }
                return p(t, !0);
            } }(e) || function (e) { switch (i.getToken()) {
                case 7: return p(new ot(e, i.getTokenOffset()), !0);
                case 8: return p(new it(e, !0, i.getTokenOffset()), !0);
                case 9: return p(new it(e, !1, i.getTokenOffset()), !0);
                default: return;
            } }(e); } var y = void 0; return 17 !== s() && ((y = m(y)) ? 17 !== i.getToken() && u(tt("End of file expected", "End of file expected."), Je.Undefined) : u(tt("Invalid symbol", "Expected a JSON object, array or literal."), Je.Undefined)), new vt(y, r, a); }(e, { collectComments: !0 }); }, newJSONDocument: function (e, t) { return function (e, t) { return void 0 === t && (t = []), new vt(e, t, []); }(e, t); }, getMatchingSchemas: r.getMatchingSchemas.bind(r), doResolve: o.doResolve.bind(o), doComplete: o.doComplete.bind(o), findDocumentSymbols: a.findDocumentSymbols.bind(a), findDocumentSymbols2: a.findDocumentSymbols2.bind(a), findDocumentColors: a.findDocumentColors.bind(a), getColorPresentations: a.getColorPresentations.bind(a), doHover: i.doHover.bind(i), getFoldingRanges: ir, getSelectionRanges: ar, findDefinition: function () { return Promise.resolve([]); }, findLinks: sr, format: function (e, t, r) { var o = void 0; if (t) {
                var i = e.offsetAt(t.start);
                o = { offset: i, length: e.offsetAt(t.end) - i };
            } var a = { tabSize: r ? r.tabSize : 4, insertSpaces: !0 === (null == r ? void 0 : r.insertSpaces), insertFinalNewline: !0 === (null == r ? void 0 : r.insertFinalNewline), eol: "\n" }; return function (e, t, r) { return function (e, t, r) { let o, i, a, s, c; if (t) {
                for (s = t.offset, c = s + t.length, a = s; a > 0 && !l(e, a - 1);)
                    a--;
                let n = c;
                for (; n < e.length && !l(e, n);)
                    n++;
                i = e.substring(a, n), o = function (e, t) { let r = 0, n = 0; const o = t.tabSize || 4; for (; r < e.length;) {
                    let t = e.charAt(r);
                    if (" " === t)
                        n++;
                    else {
                        if ("\t" !== t)
                            break;
                        n += o;
                    }
                    r++;
                } return Math.floor(n / o); }(i, r);
            }
            else
                i = e, o = 0, a = 0, s = 0, c = e.length; const f = function (e, t) { for (let e = 0; e < t.length; e++) {
                const r = t.charAt(e);
                if ("\r" === r)
                    return e + 1 < t.length && "\n" === t.charAt(e + 1) ? "\r\n" : "\r";
                if ("\n" === r)
                    return "\n";
            } return e && e.eol || "\n"; }(r, e); let p, h = 0, d = 0; p = r.insertSpaces ? u(" ", r.tabSize || 4) : "\t"; let g = n(i, !1), m = !1; function y() { return h > 1 ? u(f, h) + u(p, o + d) : f + u(p, o + d); } function v() { let e = g.scan(); for (h = 0; 15 === e || 14 === e;)
                14 === e && r.keepLines ? h += 1 : 14 === e && (h = 1), e = g.scan(); return m = 16 === e || 0 !== g.getTokenError(), e; } const b = []; function x(r, n, o) { m || t && !(n < c && o > s) || e.substring(n, o) === r || b.push({ offset: n, length: o - n, content: r }); } let S = v(); if (r.keepLines && h > 0 && x(u(f, h), 0, 0), 17 !== S) {
                let e = g.getTokenOffset() + a;
                x(u(p, o), a, e);
            } for (; 17 !== S;) {
                let e = g.getTokenOffset() + g.getTokenLength() + a, t = v(), n = "", o = !1;
                for (; 0 === h && (12 === t || 13 === t);)
                    x(" ", e, g.getTokenOffset() + a), e = g.getTokenOffset() + g.getTokenLength() + a, o = 12 === t, n = o ? y() : "", t = v();
                if (2 === t)
                    1 !== S && d--, r.keepLines && h > 0 || !r.keepLines && 1 !== S ? n = y() : r.keepLines && (n = " ");
                else if (4 === t)
                    3 !== S && d--, r.keepLines && h > 0 || !r.keepLines && 3 !== S ? n = y() : r.keepLines && (n = " ");
                else {
                    switch (S) {
                        case 3:
                        case 1:
                            d++, n = r.keepLines && h > 0 || !r.keepLines ? y() : " ";
                            break;
                        case 5:
                            n = r.keepLines && h > 0 || !r.keepLines ? y() : " ";
                            break;
                        case 12:
                            n = y();
                            break;
                        case 13:
                            h > 0 ? n = y() : o || (n = " ");
                            break;
                        case 6:
                            r.keepLines && h > 0 ? n = y() : o || (n = " ");
                            break;
                        case 10:
                            r.keepLines && h > 0 ? n = y() : 6 !== t || o || (n = "");
                            break;
                        case 7:
                        case 8:
                        case 9:
                        case 11:
                        case 2:
                        case 4:
                            r.keepLines && h > 0 ? n = y() : 12 !== t && 13 !== t || o ? 5 !== t && 17 !== t && (m = !0) : n = " ";
                            break;
                        case 16: m = !0;
                    }
                    h > 0 && (12 === t || 13 === t) && (n = y());
                }
                17 === t && (n = r.keepLines && h > 0 ? y() : r.insertFinalNewline ? f : ""), x(n, e, g.getTokenOffset() + a), S = t;
            } return b; }(e, t, r); }(e.getText(), o, a).map((function (t) { return D.replace(O.create(e.positionAt(t.offset), e.positionAt(t.offset + t.length)), t.content); })); } }; }
    }, 4881: (e, t, r) => {
        "use strict";
        r.r(t), r.d(t, { TextDocument: () => n });
        var n, o = function (e, t, r) { if (r || 2 === arguments.length)
            for (var n, o = 0, i = t.length; o < i; o++)
                !n && o in t || (n || (n = Array.prototype.slice.call(t, 0, o)), n[o] = t[o]); return e.concat(n || Array.prototype.slice.call(t)); }, i = function () { function e(e, t, r, n) { this._uri = e, this._languageId = t, this._version = r, this._content = n, this._lineOffsets = void 0; } return Object.defineProperty(e.prototype, "uri", { get: function () { return this._uri; }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "languageId", { get: function () { return this._languageId; }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "version", { get: function () { return this._version; }, enumerable: !1, configurable: !0 }), e.prototype.getText = function (e) { if (e) {
            var t = this.offsetAt(e.start), r = this.offsetAt(e.end);
            return this._content.substring(t, r);
        } return this._content; }, e.prototype.update = function (t, r) { for (var n = 0, i = t; n < i.length; n++) {
            var a = i[n];
            if (e.isIncremental(a)) {
                var u = c(a.range), l = this.offsetAt(u.start), f = this.offsetAt(u.end);
                this._content = this._content.substring(0, l) + a.text + this._content.substring(f, this._content.length);
                var p = Math.max(u.start.line, 0), h = Math.max(u.end.line, 0), d = this._lineOffsets, g = s(a.text, !1, l);
                if (h - p === g.length)
                    for (var m = 0, y = g.length; m < y; m++)
                        d[m + p + 1] = g[m];
                else
                    g.length < 1e4 ? d.splice.apply(d, o([p + 1, h - p], g, !1)) : this._lineOffsets = d = d.slice(0, p + 1).concat(g, d.slice(h + 1));
                var v = a.text.length - (f - l);
                if (0 !== v)
                    for (m = p + 1 + g.length, y = d.length; m < y; m++)
                        d[m] = d[m] + v;
            }
            else {
                if (!e.isFull(a))
                    throw new Error("Unknown change event received");
                this._content = a.text, this._lineOffsets = void 0;
            }
        } this._version = r; }, e.prototype.getLineOffsets = function () { return void 0 === this._lineOffsets && (this._lineOffsets = s(this._content, !0)), this._lineOffsets; }, e.prototype.positionAt = function (e) { e = Math.max(Math.min(e, this._content.length), 0); var t = this.getLineOffsets(), r = 0, n = t.length; if (0 === n)
            return { line: 0, character: e }; for (; r < n;) {
            var o = Math.floor((r + n) / 2);
            t[o] > e ? n = o : r = o + 1;
        } var i = r - 1; return { line: i, character: e - t[i] }; }, e.prototype.offsetAt = function (e) { var t = this.getLineOffsets(); if (e.line >= t.length)
            return this._content.length; if (e.line < 0)
            return 0; var r = t[e.line], n = e.line + 1 < t.length ? t[e.line + 1] : this._content.length; return Math.max(Math.min(r + e.character, n), r); }, Object.defineProperty(e.prototype, "lineCount", { get: function () { return this.getLineOffsets().length; }, enumerable: !1, configurable: !0 }), e.isIncremental = function (e) { var t = e; return null != t && "string" == typeof t.text && void 0 !== t.range && (void 0 === t.rangeLength || "number" == typeof t.rangeLength); }, e.isFull = function (e) { var t = e; return null != t && "string" == typeof t.text && void 0 === t.range && void 0 === t.rangeLength; }, e; }();
        function a(e, t) { if (e.length <= 1)
            return e; var r = e.length / 2 | 0, n = e.slice(0, r), o = e.slice(r); a(n, t), a(o, t); for (var i = 0, s = 0, c = 0; i < n.length && s < o.length;) {
            var u = t(n[i], o[s]);
            e[c++] = u <= 0 ? n[i++] : o[s++];
        } for (; i < n.length;)
            e[c++] = n[i++]; for (; s < o.length;)
            e[c++] = o[s++]; return e; }
        function s(e, t, r) { void 0 === r && (r = 0); for (var n = t ? [r] : [], o = 0; o < e.length; o++) {
            var i = e.charCodeAt(o);
            13 !== i && 10 !== i || (13 === i && o + 1 < e.length && 10 === e.charCodeAt(o + 1) && o++, n.push(r + o + 1));
        } return n; }
        function c(e) { var t = e.start, r = e.end; return t.line > r.line || t.line === r.line && t.character > r.character ? { start: r, end: t } : e; }
        function u(e) { var t = c(e.range); return t !== e.range ? { newText: e.newText, range: t } : e; }
        !function (e) { e.create = function (e, t, r, n) { return new i(e, t, r, n); }, e.update = function (e, t, r) { if (e instanceof i)
            return e.update(t, r), e; throw new Error("TextDocument.update: document must be created by TextDocument.create"); }, e.applyEdits = function (e, t) { for (var r = e.getText(), n = 0, o = [], i = 0, s = a(t.map(u), (function (e, t) { var r = e.range.start.line - t.range.start.line; return 0 === r ? e.range.start.character - t.range.start.character : r; })); i < s.length; i++) {
            var c = s[i], l = e.offsetAt(c.range.start);
            if (l < n)
                throw new Error("Overlapping edit");
            l > n && o.push(r.substring(n, l)), c.newText.length && o.push(c.newText), n = e.offsetAt(c.range.end);
        } return o.push(r.substr(n)), o.join(""); }; }(n || (n = {}));
    }, 7045: function (e, t, r) {
        "use strict";
        var n = this && this.__spreadArray || function (e, t, r) { if (r || 2 === arguments.length)
            for (var n, o = 0, i = t.length; o < i; o++)
                !n && o in t || (n || (n = Array.prototype.slice.call(t, 0, o)), n[o] = t[o]); return e.concat(n || Array.prototype.slice.call(t)); };
        Object.defineProperty(t, "__esModule", { value: !0 }), t.config = t.loadMessageBundle = t.BundleFormat = t.MessageFormat = void 0;
        var o = r(9889), i = r(2310), a = r(2310);
        function s(e) { return function (e, t) { for (var r = [], o = 2; o < arguments.length; o++)
            r[o - 2] = arguments[o]; if ("number" == typeof e)
            throw new Error("Browser implementation does currently not support externalized strings."); return i.localize.apply(void 0, n([e, t], r, !1)); }; }
        function c(e) { var t; return (0, i.setPseudo)("pseudo" === (null === (t = null == e ? void 0 : e.locale) || void 0 === t ? void 0 : t.toLowerCase())), s; }
        Object.defineProperty(t, "MessageFormat", { enumerable: !0, get: function () { return a.MessageFormat; } }), Object.defineProperty(t, "BundleFormat", { enumerable: !0, get: function () { return a.BundleFormat; } }), t.loadMessageBundle = s, t.config = c, o.default.install(Object.freeze({ loadMessageBundle: s, config: c }));
    }, 2310: (e, t, r) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.config = t.loadMessageBundle = t.localize = t.format = t.setPseudo = t.isPseudo = t.isDefined = t.BundleFormat = t.MessageFormat = void 0;
        var n, o, i, a = r(9889);
        function s(e) { return void 0 !== e; }
        function c(e, r) { return t.isPseudo && (e = "［" + e.replace(/[aouei]/g, "$&$&") + "］"), 0 === r.length ? e : e.replace(/\{(\d+)\}/g, (function (e, t) { var n = t[0], o = r[n], i = e; return "string" == typeof o ? i = o : "number" != typeof o && "boolean" != typeof o && null != o || (i = String(o)), i; })); }
        (i = t.MessageFormat || (t.MessageFormat = {})).file = "file", i.bundle = "bundle", i.both = "both", (o = t.BundleFormat || (t.BundleFormat = {})).standalone = "standalone", o.languagePack = "languagePack", function (e) { e.is = function (e) { var t = e; return t && s(t.key) && s(t.comment); }; }(n || (n = {})), t.isDefined = s, t.isPseudo = !1, t.setPseudo = function (e) { t.isPseudo = e; }, t.format = c, t.localize = function (e, t) { for (var r = [], n = 2; n < arguments.length; n++)
            r[n - 2] = arguments[n]; return c(t, r); }, t.loadMessageBundle = function (e) { return (0, a.default)().loadMessageBundle(e); }, t.config = function (e) { return (0, a.default)().config(e); };
    }, 9889: (e, t) => {
        "use strict";
        var r;
        function n() { if (void 0 === r)
            throw new Error("No runtime abstraction layer installed"); return r; }
        Object.defineProperty(t, "__esModule", { value: !0 }), function (e) { e.install = function (e) { if (void 0 === e)
            throw new Error("No runtime abstraction layer provided"); r = e; }; }(n || (n = {})), t.default = n;
    }, 2094: (e, t, r) => {
        "use strict";
        var n = r(3243), o = r(2191), i = r(2680), a = r(326), s = i("Object.prototype.toString"), c = r(7226)(), u = "undefined" == typeof globalThis ? r.g : globalThis, l = o(), f = i("String.prototype.slice"), p = {}, h = Object.getPrototypeOf;
        c && a && h && n(l, (function (e) { if ("function" == typeof u[e]) {
            var t = new u[e];
            if (Symbol.toStringTag in t) {
                var r = h(t), n = a(r, Symbol.toStringTag);
                if (!n) {
                    var o = h(r);
                    n = a(o, Symbol.toStringTag);
                }
                p[e] = n.get;
            }
        } }));
        var d = r(198);
        e.exports = function (e) { return !!d(e) && (c && Symbol.toStringTag in e ? function (e) { var t = !1; return n(p, (function (r, n) { if (!t)
            try {
                var o = r.call(e);
                o === n && (t = o);
            }
            catch (e) { } })), t; }(e) : f(s(e), 8, -1)); };
    }, 2191: (e, t, r) => {
        "use strict";
        var n = ["BigInt64Array", "BigUint64Array", "Float32Array", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray"], o = "undefined" == typeof globalThis ? r.g : globalThis;
        e.exports = function () { for (var e = [], t = 0; t < n.length; t++)
            "function" == typeof o[n[t]] && (e[e.length] = n[t]); return e; };
    } }, t = {}; function r(n) { var o = t[n]; if (void 0 !== o)
    return o.exports; var i = t[n] = { exports: {} }; return e[n].call(i.exports, i, i.exports, r), i.exports; } return r.d = (e, t) => { for (var n in t)
    r.o(t, n) && !r.o(e, n) && Object.defineProperty(e, n, { enumerable: !0, get: t[n] }); }, r.g = function () { if ("object" == typeof globalThis)
    return globalThis; try {
    return this || new Function("return this")();
}
catch (e) {
    if ("object" == typeof window)
        return window;
} }(), r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), r.r = e => { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }); }, r(9028); })()));



/***/ })

}]);
//# sourceMappingURL=bundle.25.js.map