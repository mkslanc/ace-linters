(self["webpackChunkace_linters_root"] = self["webpackChunkace_linters_root"] || []).push([[949],{

/***/ 949:
/***/ ((module) => {

/*! For license information please see xml-service.js.LICENSE.txt */
!function (e, t) { if (true)
    module.exports = t();
else { var r, n; } }(self, (() => (() => { var e = { 6066: (e, t, n) => { const { buildAst: r } = n(8538), { accept: o } = n(9502), { DEFAULT_NS: i } = n(544); e.exports = { buildAst: r, accept: o, DEFAULT_NS: i }; }, 8538: (e, t, n) => { const { BaseXmlCstVisitor: r } = n(3429), { last: o, forEach: i, reduce: a, map: s, pick: c, sortBy: u, isEmpty: l, isArray: f, assign: p } = n(6635), { findNextTextualToken: h, isXMLNamespaceKey: d, getXMLNamespaceKeyPrefix: y } = n(851), { getAstChildrenReflective: g } = n(3863), { DEFAULT_NS: m } = n(544), v = new class extends r {
        constructor() { super(); }
        setState({ tokenVector: e }) { this.tokenVector = e; }
        visit(e, t = {}) { return super.visit(e, { location: e.location, ...t }); }
        document(e, { location: t }) { const n = { type: "XMLDocument", rootElement: O, position: t }; return void 0 !== e.prolog && (n.prolog = this.visit(e.prolog[0])), void 0 !== e.element && !1 === l(e.element[0].children) && (n.rootElement = this.visit(e.element[0])), b(n), n; }
        prolog(e, { location: t }) { const n = { type: "XMLProlog", attributes: [], position: t }; return void 0 !== e.attribute && (n.attributes = s(e.attribute, (e => this.visit(e, { isPrologParent: !0 })))), b(n), n; }
        docTypeDecl(e, t) { }
        externalID(e, t) { }
        content(e, { location: t }) { let n = [], r = []; return void 0 !== e.element && (n = s(e.element, this.visit.bind(this))), void 0 !== e.chardata && (r = s(e.chardata, this.visit.bind(this))), { elements: n, textContents: r }; }
        element(e, { location: t }) { const n = { type: "XMLElement", namespaces: Object.create(null), name: O, attributes: [], subElements: [], textContents: [], position: t, syntax: {} }; if (void 0 !== e.attribute && (n.attributes = s(e.attribute, this.visit.bind(this))), void 0 !== e.content) {
            const { elements: t, textContents: r } = this.visit(e.content[0]);
            n.subElements = t, n.textContents = r;
        } return function (e, t) { if (void 0 !== t.Name && !0 !== t.Name[0].isInsertedInRecovery) {
            const n = t.Name[0];
            e.syntax.openName = E(n);
            const r = function (e) { const t = /^([^:]+):([^:]+)$/.exec(e); if (null === t)
                return null; return { ns: t[1], name: t[2] }; }(n.image);
            null !== r ? (e.ns = r.ns, e.name = r.name) : e.name = n.image;
        } void 0 !== t.END_NAME && !0 !== t.END_NAME[0].isInsertedInRecovery && (e.syntax.closeName = E(t.END_NAME[0])); }(n, e), function (e, t) { if (S(t.OPEN)) {
            let n;
            S(t.START_CLOSE) ? (n = t.START_CLOSE[0], e.syntax.isSelfClosing = !1) : S(t.SLASH_CLOSE) && (n = t.SLASH_CLOSE[0], e.syntax.isSelfClosing = !0), void 0 !== n && (e.syntax.openBody = { ..._(t.OPEN[0]), ...R(n) }), S(t.SLASH_OPEN) && S(t.END) && (e.syntax.closeBody = { ..._(t.SLASH_OPEN[0]), ...R(t.END[0]) });
        } }(n, e), function (e, t, n) { if (S(t.Name)) {
            const r = t.Name[0].endOffset + 2;
            if (S(t.START_CLOSE) || S(t.SLASH_CLOSE)) {
                const n = (S(t.START_CLOSE) ? t.START_CLOSE[0].startOffset : t.SLASH_CLOSE[0].startOffset) - 1;
                e.syntax.attributesRange = { startOffset: r, endOffset: n };
            }
            else {
                const i = f(t.attribute) ? o(t.attribute).location.endOffset : t.Name[0].endOffset, a = h(n, i);
                null !== a && (e.syntax.guessedAttributesRange = { startOffset: r, endOffset: a.endOffset - 1 });
            }
        } }(n, e, this.tokenVector), b(n), n; }
        reference(e, { location: t }) { }
        attribute(e, { location: t, isPrologParent: n }) { const r = { type: n ? "XMLPrologAttribute" : "XMLAttribute", position: t, key: O, value: O, syntax: {} }; if (void 0 !== e.Name && !0 !== e.Name[0].isInsertedInRecovery) {
            const t = e.Name[0];
            r.key = t.image, r.syntax.key = E(t);
        } if (void 0 !== e.STRING && !0 !== e.STRING[0].isInsertedInRecovery) {
            const t = e.STRING[0];
            r.value = (o = t.image).substring(1, o.length - 1), r.syntax.value = E(t);
        } var o; return b(r), r; }
        chardata(e, { location: t }) { const n = { type: "XMLTextContent", position: t, text: O }; let r = []; void 0 !== e.SEA_WS && (r = r.concat(e.SEA_WS)), void 0 !== e.TEXT && (r = r.concat(e.TEXT)); const o = u(r, ["startOffset"]), i = s(o, "image").join(""); return n.text = i, n; }
        misc(e, { location: t }) { }
    }; function b(e) { const t = g(e); i(t, (t => t.parent = e)); } function T(e, t = []) { const n = a(e.attributes, ((e, t) => { if (t.key !== O && !0 === d({ key: t.key, includeEmptyPrefix: !1 })) {
        const n = y(t.key);
        if (t.value) {
            const r = t.value;
            "" !== n ? e[n] = r : e[m] = r;
        }
    } return e; }), {}), r = Object.create(null); e.namespaces = p(r, t, n), i(e.subElements, (t => T(t, e.namespaces))); } function E(e) { return c(e, ["image", "startOffset", "endOffset", "startLine", "endLine", "startColumn", "endColumn"]); } function _(e) { return c(e, ["startOffset", "startLine", "startColumn"]); } function R(e) { return c(e, ["endOffset", "endLine", "endColumn"]); } function S(e) { return f(e) && 1 === e.length && !0 !== e[0].isInsertedInRecovery; } const O = null; e.exports = { buildAst: function (e, t) { v.setState({ tokenVector: t }); const n = v.visit(e); return n.rootElement !== O && T(n.rootElement), n; } }; }, 544: e => { e.exports = { DEFAULT_NS: "::DEFAULT" }; }, 3863: (e, t, n) => { const { reduce: r, has: o, isArray: i } = n(6635); e.exports = { getAstChildrenReflective: function (e) { return r(e, ((e, t, n) => ("parent" === n || (o(t, "type") ? e.push(t) : i(t) && t.length > 0 && o(t[0], "type") && (e = e.concat(t))), e)), []); } }; }, 9502: (e, t, n) => { const { forEach: r, isFunction: o } = n(6635), { getAstChildrenReflective: i } = n(3863); e.exports = { accept: function e(t, n) { switch (t.type) {
            case "XMLDocument":
                o(n.visitXMLDocument) && n.visitXMLDocument(t);
                break;
            case "XMLProlog":
                o(n.visitXMLProlog) && n.visitXMLProlog(t);
                break;
            case "XMLPrologAttribute":
                o(n.visitXMLPrologAttribute) && n.visitXMLPrologAttribute(t);
                break;
            case "XMLElement":
                o(n.visitXMLElement) && n.visitXMLElement(t);
                break;
            case "XMLAttribute":
                o(n.visitXMLAttribute) && n.visitXMLAttribute(t);
                break;
            case "XMLTextContent":
                o(n.visitXMLTextContent) && n.visitXMLTextContent(t);
                break;
            default: throw Error("None Exhaustive Match");
        } const a = i(t); r(a, (t => { e(t, n); })); } }; }, 851: (e, t, n) => { const { findNextTextualToken: r } = n(539), { isXMLNamespaceKey: o, getXMLNamespaceKeyPrefix: i } = n(2708); e.exports = { findNextTextualToken: r, isXMLNamespaceKey: o, getXMLNamespaceKeyPrefix: i }; }, 539: (e, t, n) => { const { findIndex: r } = n(6635); e.exports = { findNextTextualToken: function (e, t) { let n = r(e, (e => e.endOffset === t)); for (;;) {
            n++;
            const t = e[n];
            if (void 0 === t)
                return null;
            if ("SEA_WS" !== t.tokenType.name)
                return t;
        } } }; }, 2708: e => { const t = /^xmlns(?<prefixWithColon>:(?<prefix>[^:]*))?$/; e.exports = { isXMLNamespaceKey: function ({ key: e, includeEmptyPrefix: n }) { if ("string" != typeof e)
            return !1; const r = e.match(t); return null !== r && !(!0 !== n && r.groups.prefixWithColon && !r.groups.prefix); }, getXMLNamespaceKeyPrefix: function (e) { if ("string" != typeof e)
            return; const n = e.match(t); return null !== n ? n.groups && n.groups.prefix || "" : void 0; } }; }, 2926: (e, t, n) => { const { validate: r } = n(2723), { validateUniqueAttributeKeys: o } = n(2965), { validateTagClosingNameMatch: i } = n(9198); e.exports = { checkConstraints: function (e) { return r({ doc: e, validators: { element: [i, o] } }); } }; }, 9198: e => { e.exports = { validateTagClosingNameMatch: function (e) { const t = e.syntax.openName, n = e.syntax.closeName; return t && n ? t.image === n.image ? [] : [{ msg: `tags mismatch: "${t.image}" must match closing tag: "${n.image}"`, node: e, severity: "error", position: { startOffset: t.startOffset, endOffset: t.endOffset } }, { msg: `tags mismatch: "${n.image}" must match opening tag: "${t.image}"`, node: e, severity: "error", position: { startOffset: n.startOffset, endOffset: n.endOffset } }] : []; } }; }, 2965: (e, t, n) => { const { groupBy: r, pickBy: o, reduce: i, map: a, filter: s } = n(6635); e.exports = { validateUniqueAttributeKeys: function (e) { const t = s(e.attributes, (e => null !== e.key)), n = r(t, "key"), c = o(n, (e => e.length > 1)), u = i(c, ((e, t) => e.concat(t)), []); return a(u, (e => { const t = e.syntax.key; return { msg: `duplicate attribute: "${e.key}"`, node: e, severity: "error", position: { startOffset: t.startOffset, endOffset: t.endOffset } }; })); } }; }, 3429: (e, t, n) => { const { xmlLexer: r } = n(2229), { xmlParser: o } = n(3083); e.exports = { parse: function (e) { const t = r.tokenize(e); return o.input = t.tokens, { cst: o.document(), tokenVector: t.tokens, lexErrors: t.errors, parseErrors: o.errors }; }, BaseXmlCstVisitor: o.getBaseCstVisitorConstructor() }; }, 2229: (e, t, n) => { const { createToken: r, Lexer: o } = n(3877), i = {}, a = i; function s(e, t) { i[e] = "string" == typeof t ? t : t.source; } function c(e, ...t) { let n = ""; for (let r = 0; r < e.length; r++)
        n += e[r], r < t.length && (n += `(?:${t[r]})`); return new RegExp(n); } const u = [], l = {}; function f(e) { const t = r(e); return u.push(t), l[e.name] = t, t; } s("NameStartChar", "(:|[a-zA-Z]|_|\\u2070-\\u218F|\\u2C00-\\u2FEF|\\u3001-\\uD7FF|\\uF900-\\uFDCF|\\uFDF0-\\uFFFD)"), s("NameChar", c `${a.NameStartChar}|-|\\.|\\d|\\u00B7||[\\u0300-\\u036F]|[\\u203F-\\u2040]`), s("Name", c `${a.NameStartChar}(${a.NameChar})*`); const p = f({ name: "Comment", pattern: /<!--(.|\r?\n)*?-->/, line_breaks: !0 }), h = f({ name: "CData", pattern: /<!\[CDATA\[(.|\r?\n)*?]]>/, line_breaks: !0 }), d = f({ name: "DocType", pattern: /<!DOCTYPE/, push_mode: "INSIDE" }), y = f({ name: "DTD", pattern: /<!.*?>/, group: o.SKIPPED }), g = f({ name: "EntityRef", pattern: c `&${a.Name};` }), m = f({ name: "CharRef", pattern: /&#\d+;|&#x[a-fA-F0-9]/ }), v = f({ name: "SEA_WS", pattern: /( |\t|\n|\r\n)+/ }), b = f({ name: "XMLDeclOpen", pattern: /<\?xml[ \t\r\n]/, push_mode: "INSIDE" }), T = f({ name: "SLASH_OPEN", pattern: /<\//, push_mode: "INSIDE" }), E = f({ name: "INVALID_SLASH_OPEN", pattern: /<\//, categories: [T] }), _ = f({ name: "PROCESSING_INSTRUCTION", pattern: c `<\\?${a.Name}.*\\?>` }), R = f({ name: "OPEN", pattern: /</, push_mode: "INSIDE" }), S = f({ name: "INVALID_OPEN_INSIDE", pattern: /</, categories: [R] }), O = f({ name: "TEXT", pattern: /[^<&]+/ }), A = f({ name: "CLOSE", pattern: />/, pop_mode: !0 }), N = f({ name: "SPECIAL_CLOSE", pattern: /\?>/, pop_mode: !0 }), k = f({ name: "SLASH_CLOSE", pattern: /\/>/, pop_mode: !0 }), w = f({ name: "SLASH", pattern: /\// }), x = f({ name: "STRING", pattern: /"[^<"]*"|'[^<']*'/ }), C = new o({ defaultMode: "OUTSIDE", modes: { OUTSIDE: [p, h, d, y, g, m, v, b, T, _, R, O], INSIDE: [p, E, S, A, N, k, w, f({ name: "EQUALS", pattern: /=/ }), x, f({ name: "Name", pattern: c `${a.Name}` }), f({ name: "S", pattern: /[ \t\r\n]/, group: o.SKIPPED })] } }, { positionTracking: "full", ensureOptimizations: !1, lineTerminatorCharacters: ["\n"], lineTerminatorsPattern: /\n|\r\n/g }); e.exports = { xmlLexer: C, tokensDictionary: l }; }, 3083: (e, t, n) => { const { CstParser: r, tokenMatcher: o } = n(3877), { tokensDictionary: i } = n(2229), a = new class extends r {
        constructor() { super(i, { maxLookahead: 1, recoveryEnabled: !0, nodeLocationTracking: "full" }), this.deletionRecoveryEnabled = !0; const e = this; e.RULE("document", (() => { e.OPTION((() => { e.SUBRULE(e.prolog); })), e.MANY((() => { e.SUBRULE(e.misc); })), e.OPTION2((() => { e.SUBRULE(e.docTypeDecl); })), e.MANY2((() => { e.SUBRULE2(e.misc); })), e.SUBRULE(e.element), e.MANY3((() => { e.SUBRULE3(e.misc); })); })), e.RULE("prolog", (() => { e.CONSUME(i.XMLDeclOpen), e.MANY((() => { e.SUBRULE(e.attribute); })), e.CONSUME(i.SPECIAL_CLOSE); })), e.RULE("docTypeDecl", (() => { e.CONSUME(i.DocType), e.CONSUME(i.Name), e.OPTION((() => { e.SUBRULE(e.externalID); })), e.CONSUME(i.CLOSE); })), e.RULE("externalID", (() => { e.OR([{ GATE: () => "SYSTEM" === e.LA(1).image, ALT: () => { e.CONSUME2(i.Name, { LABEL: "System" }), e.CONSUME(i.STRING, { LABEL: "SystemLiteral" }); } }, { GATE: () => "PUBLIC" === e.LA(1).image, ALT: () => { e.CONSUME3(i.Name, { LABEL: "Public" }), e.CONSUME2(i.STRING, { LABEL: "PubIDLiteral" }), e.CONSUME3(i.STRING, { LABEL: "SystemLiteral" }); } }]); })), e.RULE("content", (() => { e.MANY((() => { e.OR([{ ALT: () => e.SUBRULE(e.element) }, { ALT: () => e.SUBRULE(e.chardata) }, { ALT: () => e.SUBRULE(e.reference) }, { ALT: () => e.CONSUME(i.CData) }, { ALT: () => e.CONSUME(i.PROCESSING_INSTRUCTION) }, { ALT: () => e.CONSUME(i.Comment) }]); })); })), e.RULE("element", (() => { e.CONSUME(i.OPEN); try {
            this.deletionRecoveryEnabled = !1, e.CONSUME(i.Name);
        }
        finally {
            this.deletionRecoveryEnabled = !0;
        } e.MANY((() => { e.SUBRULE(e.attribute); })), e.OR([{ ALT: () => { e.CONSUME(i.CLOSE, { LABEL: "START_CLOSE" }), e.SUBRULE(e.content), e.CONSUME(i.SLASH_OPEN), e.CONSUME2(i.Name, { LABEL: "END_NAME" }), e.CONSUME2(i.CLOSE, { LABEL: "END" }); } }, { ALT: () => { e.CONSUME(i.SLASH_CLOSE); } }]); })), e.RULE("reference", (() => { e.OR([{ ALT: () => e.CONSUME(i.EntityRef) }, { ALT: () => e.CONSUME(i.CharRef) }]); })), e.RULE("attribute", (() => { e.CONSUME(i.Name); try {
            this.deletionRecoveryEnabled = !1, e.CONSUME(i.EQUALS), e.CONSUME(i.STRING);
        }
        finally {
            this.deletionRecoveryEnabled = !0;
        } })), e.RULE("chardata", (() => { e.OR([{ ALT: () => e.CONSUME(i.TEXT) }, { ALT: () => e.CONSUME(i.SEA_WS) }]); })), e.RULE("misc", (() => { e.OR([{ ALT: () => e.CONSUME(i.Comment) }, { ALT: () => e.CONSUME(i.PROCESSING_INSTRUCTION) }, { ALT: () => e.CONSUME(i.SEA_WS) }]); })), this.performSelfAnalysis(); }
        canRecoverWithSingleTokenDeletion(e) { return !1 !== this.deletionRecoveryEnabled && super.canRecoverWithSingleTokenDeletion(e); }
        findReSyncTokenType() { const e = this.flattenFollowSet(); let t = this.LA(1), n = 2; for (;;) {
            const r = e.find((e => o(t, e)));
            if (void 0 !== r)
                return r;
            t = this.LA(n), n++;
        } }
    }; e.exports = { xmlParser: a }; }, 6565: (e, t, n) => { const { getSchemaValidators: r } = n(9172), { getSchemaSuggestionsProviders: o } = n(2770); e.exports = { getSchemaValidators: r, getSchemaSuggestionsProviders: o }; }, 9291: (e, t, n) => { const { difference: r, map: o } = n(6635); e.exports = { attributeNameCompletion: function (e, t) { const n = o(t.attributes, (e => e.key)), i = o(e.attributes, (e => e.key)), a = r(n, i); return o(a, (e => ({ text: e, label: e, commitCharacter: "=" }))); } }; }, 9961: (e, t, n) => { const { has: r, isRegExp: o, forEach: i, isArray: a } = n(6635); e.exports = { attributeValueCompletion: function (e, t, n = "") { if (!1 === r(t, "value"))
            return []; const s = [], c = t.value; if (o(c))
            ;
        else {
            if (!a(c))
                throw Error("None Exhaustive Match");
            i(c, (e => { e.startsWith(n) && s.push({ text: e.substring(n.length), label: e }); }));
        } return s; } }; }, 5844: (e, t, n) => { const { difference: r, map: o, filter: i, has: a, pickBy: s } = n(6635), { DEFAULT_NS: c } = n(6066), u = /^(?:([^:]*):)?([^:]*)$/; function l(e, t, n) { const a = o(n, (e => e.name)), s = i(e, (e => "many" === e.cardinality)), c = o(s, (e => e.name)), u = o(t, (e => e.name)), l = r(u, c); return r(a, l); } e.exports = { elementNameCompletion: function (e, t, n = "") { const r = n.match(u); if (null === r)
            return []; const f = r[1] ? r[1] : c, p = e.namespaces[f], h = i(t.elements, (e => !1 === a(e, "namespace") || e.namespace && e.namespace === p)), d = l(t.elements, e.subElements, h), y = o(d, (e => ({ text: e, label: e }))); if (void 0 === f || f === c) {
            const n = s(e.namespaces, ((e, t) => t !== c)), r = s(n, (n => { const r = i(t.elements, (e => !0 === a(e, "namespace") && e.namespace === n)); return l(t.elements, e.subElements, r).length > 0; })), u = o(r, ((e, t) => ({ text: t, label: t, commitCharacter: ":", isNamespace: !0 })));
            return [...u, ...y];
        } return y; } }; }, 2770: (e, t, n) => { const { attributeNameCompletion: r } = n(9291), { attributeValueCompletion: o } = n(9961), { elementNameCompletion: i } = n(5844), { findElementXssDef: a, findAttributeXssDef: s } = n(760); e.exports = { getSchemaSuggestionsProviders: function (e) { const t = function (e) { return ({ element: t, prefix: n }) => { const o = a(t, e); return void 0 !== o ? r(t, o, n) : []; }; }(e), n = function (e) { return ({ attribute: t, prefix: n }) => { const r = s(t, e); return o(t, r, n); }; }(e), c = function (e) { return ({ element: t, prefix: n }) => { const r = a(t.parent, e); return void 0 !== r ? i(t.parent, r, n) : []; }; }(e); return { schemaElementNameCompletion: c, schemaAttributeNameCompletion: t, schemaAttributeValueCompletion: n }; } }; }, 9172: (e, t, n) => { const { validateAttributeValue: r } = n(4998), { validateDuplicateSubElements: o } = n(8087), { validateRequiredAttributes: i } = n(4610), { validateRequiredSubElements: a } = n(6717), { validateUnknownAttributes: s } = n(2877), { validateUnknownSubElements: c } = n(7855), { findAttributeXssDef: u, findElementXssDef: l } = n(760); e.exports = { getSchemaValidators: function (e) { const t = function (e) { return t => { let n = []; const o = u(t, e); if (void 0 !== o) {
            const e = r(t, o);
            n = n.concat(e);
        } return n; }; }(e), n = function (e) { return t => { let n = []; const r = l(t, e); if (void 0 !== r) {
            const e = o(t, r), u = i(t, r), l = a(t, r), f = s(t, r), p = c(t, r);
            n = n.concat(e, u, l, f, p);
        } return n; }; }(e); return { attribute: t, element: n }; } }; }, 760: (e, t, n) => { const { drop: r, map: o, forEach: i, first: a } = n(6635); function s(e, t) { const n = function (e) { const t = []; t.push(e); let n = e.parent; for (; void 0 !== n && "XMLDocument" !== n.type;)
        t.push(n), n = n.parent; return t.reverse(), t; }(e), s = o(n, "name"); if (a(s) !== t.name)
        return; let c = t; return i(r(s), (e => { if (c = c.elements[e], void 0 === c)
        return !1; })), c; } e.exports = { findAttributeXssDef: function (e, t) { const n = s(e.parent, t); let r; if (void 0 !== n) {
            const t = e.key;
            r = n.attributes[t];
        } return r; }, findElementXssDef: s }; }, 4998: (e, t, n) => { const { isRegExp: r, isArray: o, includes: i, has: a } = n(6635), { tokenToOffsetPosition: s } = n(3899); e.exports = { validateAttributeValue: function (e, t) { const n = [], c = t.value; if (!1 === a(t, "value"))
            return n; const u = e.value; if (null === u)
            return n; const l = s(e.syntax.value); if (r(c))
            !1 === c.test(u) && n.push({ msg: `Expecting Value matching <${c.toString()}> but found <${u}>`, node: e, severity: "error", position: l });
        else {
            if (!o(c))
                throw Error("None Exhaustive Match");
            !1 === i(c, u) && n.push({ msg: `Expecting one of <${c.toString()}> but found <${u}>`, node: e, severity: "error", position: l });
        } return n; } }; }, 8087: (e, t, n) => { const { map: r, forEach: o, includes: i, filter: a, groupBy: s } = n(6635), { tokenToOffsetPosition: c } = n(3899); e.exports = { validateDuplicateSubElements: function (e, t) { const n = a(t.elements, (e => "many" === e.cardinality)), u = r(n, (e => e.name)), l = s(e.subElements, (e => e.name)), f = []; return o(l, ((e, n) => { const r = i(u, n), a = void 0 !== t.elements[n], s = e.length > 1; !1 === r && s && a && o(e, (e => { f.push({ msg: `Duplicate Sub-Element: <${e.name}> only a single occurrence of this Sub-Element is allowed here.`, node: e, severity: "error", position: c(e.syntax.openName) }); })); })), f; } }; }, 4610: (e, t, n) => { const { map: r, filter: o, difference: i } = n(6635), { tokenToOffsetPosition: a } = n(3899); e.exports = { validateRequiredAttributes: function (e, t) { const n = o(t.attributes, (e => !0 === e.required)), s = r(n, (e => e.key)), c = r(e.attributes, (e => e.key)), u = i(s, c), l = a(e.syntax.openName); return r(u, (t => ({ msg: `Missing Required Attribute: <${t}>`, node: e, severity: "error", position: l }))); } }; }, 6717: (e, t, n) => { const { map: r, filter: o, difference: i } = n(6635), { tokenToOffsetPosition: a } = n(3899); e.exports = { validateRequiredSubElements: function (e, t) { const n = o(t.elements, (e => !0 === e.required)), s = r(n, (e => e.name)), c = r(e.subElements, (e => e.name)), u = i(s, c), l = a(e.syntax.openName); return r(u, (t => ({ msg: `Missing Required Sub-Element: <${t}>`, node: e, severity: "error", position: l }))); } }; }, 2877: (e, t, n) => { const { map: r, includes: o, forEach: i } = n(6635), { isXMLNamespaceKey: a } = n(851), { tokenToOffsetPosition: s } = n(3899); e.exports = { validateUnknownAttributes: function (e, t) { if ("closed" !== t.attributesType)
            return []; const n = r(t.attributes, (e => e.key)), c = []; return i(e.attributes, (e => { null !== e.key && !1 === o(n, e.key) && !1 === a({ key: e.key, includeEmptyPrefix: !0 }) && c.push({ msg: `Unknown Attribute: <${e.key}> only [${n.toString()}] attributes are allowed`, node: e, severity: "error", position: s(e.syntax.key) }); })), c; } }; }, 7855: (e, t, n) => { const { map: r, forEach: o, includes: i } = n(6635), { tokenToOffsetPosition: a } = n(3899); e.exports = { validateUnknownSubElements: function (e, t) { if ("closed" !== t.elementsType)
            return []; const n = r(t.elements, (e => e.name)), s = []; return o(e.subElements, (e => { null !== e.name && !1 === i(n, e.name) && s.push({ msg: `Unknown Sub-Element: <${e.name}> only [${n.toString()}] Sub-Elements are allowed`, node: e, severity: "error", position: a(e.syntax.openName) }); })), s; } }; }, 3899: (e, t, n) => { const { pick: r } = n(6635); e.exports = { tokenToOffsetPosition: function (e) { return r(e, ["startOffset", "endOffset"]); } }; }, 2723: (e, t, n) => { const { validate: r } = n(9509); e.exports = { validate: r }; }, 9509: (e, t, n) => { const { accept: r } = n(6066), { defaultsDeep: o, flatMap: i } = n(6635); e.exports = { validate: function (e) { const t = o(e, { validators: { attribute: [], element: [] } }); let n = []; const a = { visitXMLElement: function (e) { const r = i(t.validators.element, (t => t(e))); n = n.concat(r); }, visitXMLAttribute: function (e) { const r = i(t.validators.attribute, (t => t(e))); n = n.concat(r); } }; return r(t.doc, a), n; } }; }, 1696: (e, t, n) => {
        "use strict";
        var r = n(4406), o = n(3716);
        function i(e) { return i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e; } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e; }, i(e); }
        var a, s, c = n(7515).codes, u = c.ERR_AMBIGUOUS_ARGUMENT, l = c.ERR_INVALID_ARG_TYPE, f = c.ERR_INVALID_ARG_VALUE, p = c.ERR_INVALID_RETURN_VALUE, h = c.ERR_MISSING_ARGS, d = n(4082), y = n(3335).inspect, g = n(3335).types, m = g.isPromise, v = g.isRegExp, b = Object.assign ? Object.assign : n(4956).assign, T = Object.is ? Object.is : n(4679);
        function E() { var e = n(6796); a = e.isDeepEqual, s = e.isDeepStrictEqual; }
        new Map;
        var _ = !1, R = e.exports = N, S = {};
        function O(e) { if (e.message instanceof Error)
            throw e.message; throw new d(e); }
        function A(e, t, n, r) { if (!n) {
            var o = !1;
            if (0 === t)
                o = !0, r = "No value argument passed to `assert.ok()`";
            else if (r instanceof Error)
                throw r;
            var i = new d({ actual: n, expected: !0, message: r, operator: "==", stackStartFn: e });
            throw i.generatedMessage = o, i;
        } }
        function N() { for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n]; A.apply(void 0, [N, t.length].concat(t)); }
        R.fail = function e(t, n, i, a, s) { var c, u = arguments.length; if (0 === u)
            c = "Failed";
        else if (1 === u)
            i = t, t = void 0;
        else {
            if (!1 === _) {
                _ = !0;
                var l = r.emitWarning ? r.emitWarning : o.warn.bind(o);
                l("assert.fail() with more than one argument is deprecated. Please use assert.strictEqual() instead or only pass a message.", "DeprecationWarning", "DEP0094");
            }
            2 === u && (a = "!=");
        } if (i instanceof Error)
            throw i; var f = { actual: t, expected: n, operator: void 0 === a ? "fail" : a, stackStartFn: s || e }; void 0 !== i && (f.message = i); var p = new d(f); throw c && (p.message = c, p.generatedMessage = !0), p; }, R.AssertionError = d, R.ok = N, R.equal = function e(t, n, r) { if (arguments.length < 2)
            throw new h("actual", "expected"); t != n && O({ actual: t, expected: n, message: r, operator: "==", stackStartFn: e }); }, R.notEqual = function e(t, n, r) { if (arguments.length < 2)
            throw new h("actual", "expected"); t == n && O({ actual: t, expected: n, message: r, operator: "!=", stackStartFn: e }); }, R.deepEqual = function e(t, n, r) { if (arguments.length < 2)
            throw new h("actual", "expected"); void 0 === a && E(), a(t, n) || O({ actual: t, expected: n, message: r, operator: "deepEqual", stackStartFn: e }); }, R.notDeepEqual = function e(t, n, r) { if (arguments.length < 2)
            throw new h("actual", "expected"); void 0 === a && E(), a(t, n) && O({ actual: t, expected: n, message: r, operator: "notDeepEqual", stackStartFn: e }); }, R.deepStrictEqual = function e(t, n, r) { if (arguments.length < 2)
            throw new h("actual", "expected"); void 0 === a && E(), s(t, n) || O({ actual: t, expected: n, message: r, operator: "deepStrictEqual", stackStartFn: e }); }, R.notDeepStrictEqual = function e(t, n, r) { if (arguments.length < 2)
            throw new h("actual", "expected"); void 0 === a && E(), s(t, n) && O({ actual: t, expected: n, message: r, operator: "notDeepStrictEqual", stackStartFn: e }); }, R.strictEqual = function e(t, n, r) { if (arguments.length < 2)
            throw new h("actual", "expected"); T(t, n) || O({ actual: t, expected: n, message: r, operator: "strictEqual", stackStartFn: e }); }, R.notStrictEqual = function e(t, n, r) { if (arguments.length < 2)
            throw new h("actual", "expected"); T(t, n) && O({ actual: t, expected: n, message: r, operator: "notStrictEqual", stackStartFn: e }); };
        var k = function e(t, n, r) { var o = this; !function (e, t) { if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function"); }(this, e), n.forEach((function (e) { e in t && (void 0 !== r && "string" == typeof r[e] && v(t[e]) && t[e].test(r[e]) ? o[e] = r[e] : o[e] = t[e]); })); };
        function w(e, t, n, r, o, i) { if (!(n in e) || !s(e[n], t[n])) {
            if (!r) {
                var a = new k(e, o), c = new k(t, o, e), u = new d({ actual: a, expected: c, operator: "deepStrictEqual", stackStartFn: i });
                throw u.actual = e, u.expected = t, u.operator = i.name, u;
            }
            O({ actual: e, expected: t, message: r, operator: i.name, stackStartFn: i });
        } }
        function x(e, t, n, r) { if ("function" != typeof t) {
            if (v(t))
                return t.test(e);
            if (2 === arguments.length)
                throw new l("expected", ["Function", "RegExp"], t);
            if ("object" !== i(e) || null === e) {
                var o = new d({ actual: e, expected: t, message: n, operator: "deepStrictEqual", stackStartFn: r });
                throw o.operator = r.name, o;
            }
            var s = Object.keys(t);
            if (t instanceof Error)
                s.push("name", "message");
            else if (0 === s.length)
                throw new f("error", t, "may not be an empty object");
            return void 0 === a && E(), s.forEach((function (o) { "string" == typeof e[o] && v(t[o]) && t[o].test(e[o]) || w(e, t, o, n, s, r); })), !0;
        } return void 0 !== t.prototype && e instanceof t || !Error.isPrototypeOf(t) && !0 === t.call({}, e); }
        function C(e) { if ("function" != typeof e)
            throw new l("fn", "Function", e); try {
            e();
        }
        catch (e) {
            return e;
        } return S; }
        function P(e) { return m(e) || null !== e && "object" === i(e) && "function" == typeof e.then && "function" == typeof e.catch; }
        function I(e) { return Promise.resolve().then((function () { var t; if ("function" == typeof e) {
            if (!P(t = e()))
                throw new p("instance of Promise", "promiseFn", t);
        }
        else {
            if (!P(e))
                throw new l("promiseFn", ["Function", "Promise"], e);
            t = e;
        } return Promise.resolve().then((function () { return t; })).then((function () { return S; })).catch((function (e) { return e; })); })); }
        function D(e, t, n, r) { if ("string" == typeof n) {
            if (4 === arguments.length)
                throw new l("error", ["Object", "Error", "Function", "RegExp"], n);
            if ("object" === i(t) && null !== t) {
                if (t.message === n)
                    throw new u("error/message", 'The error message "'.concat(t.message, '" is identical to the message.'));
            }
            else if (t === n)
                throw new u("error/message", 'The error "'.concat(t, '" is identical to the message.'));
            r = n, n = void 0;
        }
        else if (null != n && "object" !== i(n) && "function" != typeof n)
            throw new l("error", ["Object", "Error", "Function", "RegExp"], n); if (t === S) {
            var o = "";
            n && n.name && (o += " (".concat(n.name, ")")), o += r ? ": ".concat(r) : ".";
            var a = "rejects" === e.name ? "rejection" : "exception";
            O({ actual: void 0, expected: n, operator: e.name, message: "Missing expected ".concat(a).concat(o), stackStartFn: e });
        } if (n && !x(t, n, r, e))
            throw t; }
        function L(e, t, n, r) { if (t !== S) {
            if ("string" == typeof n && (r = n, n = void 0), !n || x(t, n)) {
                var o = r ? ": ".concat(r) : ".", i = "doesNotReject" === e.name ? "rejection" : "exception";
                O({ actual: t, expected: n, operator: e.name, message: "Got unwanted ".concat(i).concat(o, "\n") + 'Actual message: "'.concat(t && t.message, '"'), stackStartFn: e });
            }
            throw t;
        } }
        function M() { for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
            t[n] = arguments[n]; A.apply(void 0, [M, t.length].concat(t)); }
        R.throws = function e(t) { for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
            r[o - 1] = arguments[o]; D.apply(void 0, [e, C(t)].concat(r)); }, R.rejects = function e(t) { for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
            r[o - 1] = arguments[o]; return I(t).then((function (t) { return D.apply(void 0, [e, t].concat(r)); })); }, R.doesNotThrow = function e(t) { for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
            r[o - 1] = arguments[o]; L.apply(void 0, [e, C(t)].concat(r)); }, R.doesNotReject = function e(t) { for (var n = arguments.length, r = new Array(n > 1 ? n - 1 : 0), o = 1; o < n; o++)
            r[o - 1] = arguments[o]; return I(t).then((function (t) { return L.apply(void 0, [e, t].concat(r)); })); }, R.ifError = function e(t) { if (null != t) {
            var n = "ifError got unwanted exception: ";
            "object" === i(t) && "string" == typeof t.message ? 0 === t.message.length && t.constructor ? n += t.constructor.name : n += t.message : n += y(t);
            var r = new d({ actual: t, expected: null, operator: "ifError", message: n, stackStartFn: e }), o = t.stack;
            if ("string" == typeof o) {
                var a = o.split("\n");
                a.shift();
                for (var s = r.stack.split("\n"), c = 0; c < a.length; c++) {
                    var u = s.indexOf(a[c]);
                    if (-1 !== u) {
                        s = s.slice(0, u);
                        break;
                    }
                }
                r.stack = "".concat(s.join("\n"), "\n").concat(a.join("\n"));
            }
            throw r;
        } }, R.strict = b(M, R, { equal: R.strictEqual, deepEqual: R.deepStrictEqual, notEqual: R.notStrictEqual, notDeepEqual: R.notDeepStrictEqual }), R.strict.strict = R.strict;
    }, 4082: (e, t, n) => {
        "use strict";
        var r = n(4406);
        function o(e, t, n) { return t in e ? Object.defineProperty(e, t, { value: n, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = n, e; }
        function i(e, t) { for (var n = 0; n < t.length; n++) {
            var r = t[n];
            r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        } }
        function a(e, t) { return !t || "object" !== h(t) && "function" != typeof t ? s(e) : t; }
        function s(e) { if (void 0 === e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
        function c(e) { var t = "function" == typeof Map ? new Map : void 0; return c = function (e) { if (null === e || (n = e, -1 === Function.toString.call(n).indexOf("[native code]")))
            return e; var n; if ("function" != typeof e)
            throw new TypeError("Super expression must either be null or a function"); if (void 0 !== t) {
            if (t.has(e))
                return t.get(e);
            t.set(e, r);
        } function r() { return l(e, arguments, p(this).constructor); } return r.prototype = Object.create(e.prototype, { constructor: { value: r, enumerable: !1, writable: !0, configurable: !0 } }), f(r, e); }, c(e); }
        function u() { if ("undefined" == typeof Reflect || !Reflect.construct)
            return !1; if (Reflect.construct.sham)
            return !1; if ("function" == typeof Proxy)
            return !0; try {
            return Date.prototype.toString.call(Reflect.construct(Date, [], (function () { }))), !0;
        }
        catch (e) {
            return !1;
        } }
        function l(e, t, n) { return l = u() ? Reflect.construct : function (e, t, n) { var r = [null]; r.push.apply(r, t); var o = new (Function.bind.apply(e, r)); return n && f(o, n.prototype), o; }, l.apply(null, arguments); }
        function f(e, t) { return f = Object.setPrototypeOf || function (e, t) { return e.__proto__ = t, e; }, f(e, t); }
        function p(e) { return p = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) { return e.__proto__ || Object.getPrototypeOf(e); }, p(e); }
        function h(e) { return h = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e; } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e; }, h(e); }
        var d = n(3335).inspect, y = n(7515).codes.ERR_INVALID_ARG_TYPE;
        function g(e, t, n) { return (void 0 === n || n > e.length) && (n = e.length), e.substring(n - t.length, n) === t; }
        var m = "", v = "", b = "", T = "", E = { deepStrictEqual: "Expected values to be strictly deep-equal:", strictEqual: "Expected values to be strictly equal:", strictEqualObject: 'Expected "actual" to be reference-equal to "expected":', deepEqual: "Expected values to be loosely deep-equal:", equal: "Expected values to be loosely equal:", notDeepStrictEqual: 'Expected "actual" not to be strictly deep-equal to:', notStrictEqual: 'Expected "actual" to be strictly unequal to:', notStrictEqualObject: 'Expected "actual" not to be reference-equal to "expected":', notDeepEqual: 'Expected "actual" not to be loosely deep-equal to:', notEqual: 'Expected "actual" to be loosely unequal to:', notIdentical: "Values identical but not reference-equal:" };
        function _(e) { var t = Object.keys(e), n = Object.create(Object.getPrototypeOf(e)); return t.forEach((function (t) { n[t] = e[t]; })), Object.defineProperty(n, "message", { value: e.message }), n; }
        function R(e) { return d(e, { compact: !1, customInspect: !1, depth: 1e3, maxArrayLength: 1 / 0, showHidden: !1, breakLength: 1 / 0, showProxy: !1, sorted: !0, getters: !0 }); }
        var S = function (e) { function t(e) { var n; if (function (e, t) { if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function"); }(this, t), "object" !== h(e) || null === e)
            throw new y("options", "Object", e); var o = e.message, i = e.operator, c = e.stackStartFn, u = e.actual, l = e.expected, f = Error.stackTraceLimit; if (Error.stackTraceLimit = 0, null != o)
            n = a(this, p(t).call(this, String(o)));
        else if (r.stderr && r.stderr.isTTY && (r.stderr && r.stderr.getColorDepth && 1 !== r.stderr.getColorDepth() ? (m = "[34m", v = "[32m", T = "[39m", b = "[31m") : (m = "", v = "", T = "", b = "")), "object" === h(u) && null !== u && "object" === h(l) && null !== l && "stack" in u && u instanceof Error && "stack" in l && l instanceof Error && (u = _(u), l = _(l)), "deepStrictEqual" === i || "strictEqual" === i)
            n = a(this, p(t).call(this, function (e, t, n) { var o = "", i = "", a = 0, s = "", c = !1, u = R(e), l = u.split("\n"), f = R(t).split("\n"), p = 0, d = ""; if ("strictEqual" === n && "object" === h(e) && "object" === h(t) && null !== e && null !== t && (n = "strictEqualObject"), 1 === l.length && 1 === f.length && l[0] !== f[0]) {
                var y = l[0].length + f[0].length;
                if (y <= 10) {
                    if (!("object" === h(e) && null !== e || "object" === h(t) && null !== t || 0 === e && 0 === t))
                        return "".concat(E[n], "\n\n") + "".concat(l[0], " !== ").concat(f[0], "\n");
                }
                else if ("strictEqualObject" !== n && y < (r.stderr && r.stderr.isTTY ? r.stderr.columns : 80)) {
                    for (; l[0][p] === f[0][p];)
                        p++;
                    p > 2 && (d = "\n  ".concat(function (e, t) { if (t = Math.floor(t), 0 == e.length || 0 == t)
                        return ""; var n = e.length * t; for (t = Math.floor(Math.log(t) / Math.log(2)); t;)
                        e += e, t--; return e + e.substring(0, n - e.length); }(" ", p), "^"), p = 0);
                }
            } for (var _ = l[l.length - 1], S = f[f.length - 1]; _ === S && (p++ < 2 ? s = "\n  ".concat(_).concat(s) : o = _, l.pop(), f.pop(), 0 !== l.length && 0 !== f.length);)
                _ = l[l.length - 1], S = f[f.length - 1]; var O = Math.max(l.length, f.length); if (0 === O) {
                var A = u.split("\n");
                if (A.length > 30)
                    for (A[26] = "".concat(m, "...").concat(T); A.length > 27;)
                        A.pop();
                return "".concat(E.notIdentical, "\n\n").concat(A.join("\n"), "\n");
            } p > 3 && (s = "\n".concat(m, "...").concat(T).concat(s), c = !0), "" !== o && (s = "\n  ".concat(o).concat(s), o = ""); var N = 0, k = E[n] + "\n".concat(v, "+ actual").concat(T, " ").concat(b, "- expected").concat(T), w = " ".concat(m, "...").concat(T, " Lines skipped"); for (p = 0; p < O; p++) {
                var x = p - a;
                if (l.length < p + 1)
                    x > 1 && p > 2 && (x > 4 ? (i += "\n".concat(m, "...").concat(T), c = !0) : x > 3 && (i += "\n  ".concat(f[p - 2]), N++), i += "\n  ".concat(f[p - 1]), N++), a = p, o += "\n".concat(b, "-").concat(T, " ").concat(f[p]), N++;
                else if (f.length < p + 1)
                    x > 1 && p > 2 && (x > 4 ? (i += "\n".concat(m, "...").concat(T), c = !0) : x > 3 && (i += "\n  ".concat(l[p - 2]), N++), i += "\n  ".concat(l[p - 1]), N++), a = p, i += "\n".concat(v, "+").concat(T, " ").concat(l[p]), N++;
                else {
                    var C = f[p], P = l[p], I = P !== C && (!g(P, ",") || P.slice(0, -1) !== C);
                    I && g(C, ",") && C.slice(0, -1) === P && (I = !1, P += ","), I ? (x > 1 && p > 2 && (x > 4 ? (i += "\n".concat(m, "...").concat(T), c = !0) : x > 3 && (i += "\n  ".concat(l[p - 2]), N++), i += "\n  ".concat(l[p - 1]), N++), a = p, i += "\n".concat(v, "+").concat(T, " ").concat(P), o += "\n".concat(b, "-").concat(T, " ").concat(C), N += 2) : (i += o, o = "", 1 !== x && 0 !== p || (i += "\n  ".concat(P), N++));
                }
                if (N > 20 && p < O - 2)
                    return "".concat(k).concat(w, "\n").concat(i, "\n").concat(m, "...").concat(T).concat(o, "\n") + "".concat(m, "...").concat(T);
            } return "".concat(k).concat(c ? w : "", "\n").concat(i).concat(o).concat(s).concat(d); }(u, l, i)));
        else if ("notDeepStrictEqual" === i || "notStrictEqual" === i) {
            var d = E[i], S = R(u).split("\n");
            if ("notStrictEqual" === i && "object" === h(u) && null !== u && (d = E.notStrictEqualObject), S.length > 30)
                for (S[26] = "".concat(m, "...").concat(T); S.length > 27;)
                    S.pop();
            n = 1 === S.length ? a(this, p(t).call(this, "".concat(d, " ").concat(S[0]))) : a(this, p(t).call(this, "".concat(d, "\n\n").concat(S.join("\n"), "\n")));
        }
        else {
            var O = R(u), A = "", N = E[i];
            "notDeepEqual" === i || "notEqual" === i ? (O = "".concat(E[i], "\n\n").concat(O)).length > 1024 && (O = "".concat(O.slice(0, 1021), "...")) : (A = "".concat(R(l)), O.length > 512 && (O = "".concat(O.slice(0, 509), "...")), A.length > 512 && (A = "".concat(A.slice(0, 509), "...")), "deepEqual" === i || "equal" === i ? O = "".concat(N, "\n\n").concat(O, "\n\nshould equal\n\n") : A = " ".concat(i, " ").concat(A)), n = a(this, p(t).call(this, "".concat(O).concat(A)));
        } return Error.stackTraceLimit = f, n.generatedMessage = !o, Object.defineProperty(s(n), "name", { value: "AssertionError [ERR_ASSERTION]", enumerable: !1, writable: !0, configurable: !0 }), n.code = "ERR_ASSERTION", n.actual = u, n.expected = l, n.operator = i, Error.captureStackTrace && Error.captureStackTrace(s(n), c), n.stack, n.name = "AssertionError", a(n); } var n, c; return function (e, t) { if ("function" != typeof t && null !== t)
            throw new TypeError("Super expression must either be null or a function"); e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), t && f(e, t); }(t, e), n = t, c = [{ key: "toString", value: function () { return "".concat(this.name, " [").concat(this.code, "]: ").concat(this.message); } }, { key: d.custom, value: function (e, t) { return d(this, function (e) { for (var t = 1; t < arguments.length; t++) {
                    var n = null != arguments[t] ? arguments[t] : {}, r = Object.keys(n);
                    "function" == typeof Object.getOwnPropertySymbols && (r = r.concat(Object.getOwnPropertySymbols(n).filter((function (e) { return Object.getOwnPropertyDescriptor(n, e).enumerable; })))), r.forEach((function (t) { o(e, t, n[t]); }));
                } return e; }({}, t, { customInspect: !1, depth: 0 })); } }], c && i(n.prototype, c), t; }(c(Error));
        e.exports = S;
    }, 7515: (e, t, n) => {
        "use strict";
        function r(e) { return r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e; } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e; }, r(e); }
        function o(e) { return o = Object.setPrototypeOf ? Object.getPrototypeOf : function (e) { return e.__proto__ || Object.getPrototypeOf(e); }, o(e); }
        function i(e, t) { return i = Object.setPrototypeOf || function (e, t) { return e.__proto__ = t, e; }, i(e, t); }
        var a, s, c = {};
        function u(e, t, n) { n || (n = Error); var a = function (n) { function a(n, i, s) { var c; return function (e, t) { if (!(e instanceof t))
            throw new TypeError("Cannot call a class as a function"); }(this, a), c = function (e, t) { return !t || "object" !== r(t) && "function" != typeof t ? function (e) { if (void 0 === e)
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }(e) : t; }(this, o(a).call(this, function (e, n, r) { return "string" == typeof t ? t : t(e, n, r); }(n, i, s))), c.code = e, c; } return function (e, t) { if ("function" != typeof t && null !== t)
            throw new TypeError("Super expression must either be null or a function"); e.prototype = Object.create(t && t.prototype, { constructor: { value: e, writable: !0, configurable: !0 } }), t && i(e, t); }(a, n), a; }(n); c[e] = a; }
        function l(e, t) { if (Array.isArray(e)) {
            var n = e.length;
            return e = e.map((function (e) { return String(e); })), n > 2 ? "one of ".concat(t, " ").concat(e.slice(0, n - 1).join(", "), ", or ") + e[n - 1] : 2 === n ? "one of ".concat(t, " ").concat(e[0], " or ").concat(e[1]) : "of ".concat(t, " ").concat(e[0]);
        } return "of ".concat(t, " ").concat(String(e)); }
        u("ERR_AMBIGUOUS_ARGUMENT", 'The "%s" argument is ambiguous. %s', TypeError), u("ERR_INVALID_ARG_TYPE", (function (e, t, o) { var i, s, c, u, f; if (void 0 === a && (a = n(1696)), a("string" == typeof e, "'name' must be a string"), "string" == typeof t && (s = "not ", t.substr(0, s.length) === s) ? (i = "must not be", t = t.replace(/^not /, "")) : i = "must be", function (e, t, n) { return (void 0 === n || n > e.length) && (n = e.length), e.substring(n - t.length, n) === t; }(e, " argument"))
            c = "The ".concat(e, " ").concat(i, " ").concat(l(t, "type"));
        else {
            var p = ("number" != typeof f && (f = 0), f + ".".length > (u = e).length || -1 === u.indexOf(".", f) ? "argument" : "property");
            c = 'The "'.concat(e, '" ').concat(p, " ").concat(i, " ").concat(l(t, "type"));
        } return c + ". Received type ".concat(r(o)); }), TypeError), u("ERR_INVALID_ARG_VALUE", (function (e, t) { var r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "is invalid"; void 0 === s && (s = n(3335)); var o = s.inspect(t); return o.length > 128 && (o = "".concat(o.slice(0, 128), "...")), "The argument '".concat(e, "' ").concat(r, ". Received ").concat(o); }), TypeError, RangeError), u("ERR_INVALID_RETURN_VALUE", (function (e, t, n) { var o; return o = n && n.constructor && n.constructor.name ? "instance of ".concat(n.constructor.name) : "type ".concat(r(n)), "Expected ".concat(e, ' to be returned from the "').concat(t, '"') + " function but got ".concat(o, "."); }), TypeError), u("ERR_MISSING_ARGS", (function () { for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
            t[r] = arguments[r]; void 0 === a && (a = n(1696)), a(t.length > 0, "At least one arg needs to be specified"); var o = "The ", i = t.length; switch (t = t.map((function (e) { return '"'.concat(e, '"'); })), i) {
            case 1:
                o += "".concat(t[0], " argument");
                break;
            case 2:
                o += "".concat(t[0], " and ").concat(t[1], " arguments");
                break;
            default: o += t.slice(0, i - 1).join(", "), o += ", and ".concat(t[i - 1], " arguments");
        } return "".concat(o, " must be specified"); }), TypeError), e.exports.codes = c;
    }, 6796: (e, t, n) => {
        "use strict";
        function r(e, t) { return function (e) { if (Array.isArray(e))
            return e; }(e) || function (e, t) { var n = [], r = !0, o = !1, i = void 0; try {
            for (var a, s = e[Symbol.iterator](); !(r = (a = s.next()).done) && (n.push(a.value), !t || n.length !== t); r = !0)
                ;
        }
        catch (e) {
            o = !0, i = e;
        }
        finally {
            try {
                r || null == s.return || s.return();
            }
            finally {
                if (o)
                    throw i;
            }
        } return n; }(e, t) || function () { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }(); }
        function o(e) { return o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) { return typeof e; } : function (e) { return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e; }, o(e); }
        var i = void 0 !== /a/g.flags, a = function (e) { var t = []; return e.forEach((function (e) { return t.push(e); })), t; }, s = function (e) { var t = []; return e.forEach((function (e, n) { return t.push([n, e]); })), t; }, c = Object.is ? Object.is : n(4679), u = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols : function () { return []; }, l = Number.isNaN ? Number.isNaN : n(4782);
        function f(e) { return e.call.bind(e); }
        var p = f(Object.prototype.hasOwnProperty), h = f(Object.prototype.propertyIsEnumerable), d = f(Object.prototype.toString), y = n(3335).types, g = y.isAnyArrayBuffer, m = y.isArrayBufferView, v = y.isDate, b = y.isMap, T = y.isRegExp, E = y.isSet, _ = y.isNativeError, R = y.isBoxedPrimitive, S = y.isNumberObject, O = y.isStringObject, A = y.isBooleanObject, N = y.isBigIntObject, k = y.isSymbolObject, w = y.isFloat32Array, x = y.isFloat64Array;
        function C(e) { if (0 === e.length || e.length > 10)
            return !0; for (var t = 0; t < e.length; t++) {
            var n = e.charCodeAt(t);
            if (n < 48 || n > 57)
                return !0;
        } return 10 === e.length && e >= Math.pow(2, 32); }
        function P(e) { return Object.keys(e).filter(C).concat(u(e).filter(Object.prototype.propertyIsEnumerable.bind(e))); }
        function I(e, t) { if (e === t)
            return 0; for (var n = e.length, r = t.length, o = 0, i = Math.min(n, r); o < i; ++o)
            if (e[o] !== t[o]) {
                n = e[o], r = t[o];
                break;
            } return n < r ? -1 : r < n ? 1 : 0; }
        function D(e, t, n, r) { if (e === t)
            return 0 !== e || !n || c(e, t); if (n) {
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
            var h = P(e), y = P(t);
            return h.length === y.length && M(e, t, n, r, 1, h);
        } if ("[object Object]" === p && (!b(e) && b(t) || !E(e) && E(t)))
            return !1; if (v(e)) {
            if (!v(t) || Date.prototype.getTime.call(e) !== Date.prototype.getTime.call(t))
                return !1;
        }
        else if (T(e)) {
            if (!T(t) || (u = e, f = t, !(i ? u.source === f.source && u.flags === f.flags : RegExp.prototype.toString.call(u) === RegExp.prototype.toString.call(f))))
                return !1;
        }
        else if (_(e) || e instanceof Error) {
            if (e.message !== t.message || e.name !== t.name)
                return !1;
        }
        else {
            if (m(e)) {
                if (n || !w(e) && !x(e)) {
                    if (!function (e, t) { return e.byteLength === t.byteLength && 0 === I(new Uint8Array(e.buffer, e.byteOffset, e.byteLength), new Uint8Array(t.buffer, t.byteOffset, t.byteLength)); }(e, t))
                        return !1;
                }
                else if (!function (e, t) { if (e.byteLength !== t.byteLength)
                    return !1; for (var n = 0; n < e.byteLength; n++)
                    if (e[n] !== t[n])
                        return !1; return !0; }(e, t))
                    return !1;
                var C = P(e), D = P(t);
                return C.length === D.length && M(e, t, n, r, 0, C);
            }
            if (E(e))
                return !(!E(t) || e.size !== t.size) && M(e, t, n, r, 2);
            if (b(e))
                return !(!b(t) || e.size !== t.size) && M(e, t, n, r, 3);
            if (g(e)) {
                if (s = t, (a = e).byteLength !== s.byteLength || 0 !== I(new Uint8Array(a), new Uint8Array(s)))
                    return !1;
            }
            else if (R(e) && !function (e, t) { return S(e) ? S(t) && c(Number.prototype.valueOf.call(e), Number.prototype.valueOf.call(t)) : O(e) ? O(t) && String.prototype.valueOf.call(e) === String.prototype.valueOf.call(t) : A(e) ? A(t) && Boolean.prototype.valueOf.call(e) === Boolean.prototype.valueOf.call(t) : N(e) ? N(t) && BigInt.prototype.valueOf.call(e) === BigInt.prototype.valueOf.call(t) : k(t) && Symbol.prototype.valueOf.call(e) === Symbol.prototype.valueOf.call(t); }(e, t))
                return !1;
        } return M(e, t, n, r, 0); }
        function L(e, t) { return t.filter((function (t) { return h(e, t); })); }
        function M(e, t, n, r, o, i) { if (5 === arguments.length) {
            i = Object.keys(e);
            var a = Object.keys(t);
            if (i.length !== a.length)
                return !1;
        } for (var s = 0; s < i.length; s++)
            if (!p(t, i[s]))
                return !1; if (n && 5 === arguments.length) {
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
                if (c.length !== d.length && L(t, d).length !== l)
                    return !1;
            }
            else {
                var y = u(t);
                if (0 !== y.length && 0 !== L(t, y).length)
                    return !1;
            }
        } if (0 === i.length && (0 === o || 1 === o && 0 === e.length || 0 === e.size))
            return !0; if (void 0 === r)
            r = { val1: new Map, val2: new Map, position: 0 };
        else {
            var g = r.val1.get(e);
            if (void 0 !== g) {
                var m = r.val2.get(t);
                if (void 0 !== m)
                    return g === m;
            }
            r.position++;
        } r.val1.set(e, r.position), r.val2.set(t, r.position); var v = B(e, t, n, i, r, o); return r.val1.delete(e), r.val2.delete(t), v; }
        function j(e, t, n, r) { for (var o = a(e), i = 0; i < o.length; i++) {
            var s = o[i];
            if (D(t, s, n, r))
                return e.delete(s), !0;
        } return !1; }
        function U(e) { switch (o(e)) {
            case "undefined": return null;
            case "object": return;
            case "symbol": return !1;
            case "string": e = +e;
            case "number": if (l(e))
                return !1;
        } return !0; }
        function F(e, t, n) { var r = U(n); return null != r ? r : t.has(r) && !e.has(r); }
        function q(e, t, n, r, o) { var i = U(n); if (null != i)
            return i; var a = t.get(i); return !(void 0 === a && !t.has(i) || !D(r, a, !1, o)) && !e.has(i) && D(r, a, !1, o); }
        function W(e, t, n, r, o, i) { for (var s = a(e), c = 0; c < s.length; c++) {
            var u = s[c];
            if (D(n, u, o, i) && D(r, t.get(u), o, i))
                return e.delete(u), !0;
        } return !1; }
        function B(e, t, n, i, c, u) { var l = 0; if (2 === u) {
            if (!function (e, t, n, r) { for (var i = null, s = a(e), c = 0; c < s.length; c++) {
                var u = s[c];
                if ("object" === o(u) && null !== u)
                    null === i && (i = new Set), i.add(u);
                else if (!t.has(u)) {
                    if (n)
                        return !1;
                    if (!F(e, t, u))
                        return !1;
                    null === i && (i = new Set), i.add(u);
                }
            } if (null !== i) {
                for (var l = a(t), f = 0; f < l.length; f++) {
                    var p = l[f];
                    if ("object" === o(p) && null !== p) {
                        if (!j(i, p, n, r))
                            return !1;
                    }
                    else if (!n && !e.has(p) && !j(i, p, n, r))
                        return !1;
                }
                return 0 === i.size;
            } return !0; }(e, t, n, c))
                return !1;
        }
        else if (3 === u) {
            if (!function (e, t, n, i) { for (var a = null, c = s(e), u = 0; u < c.length; u++) {
                var l = r(c[u], 2), f = l[0], p = l[1];
                if ("object" === o(f) && null !== f)
                    null === a && (a = new Set), a.add(f);
                else {
                    var h = t.get(f);
                    if (void 0 === h && !t.has(f) || !D(p, h, n, i)) {
                        if (n)
                            return !1;
                        if (!q(e, t, f, p, i))
                            return !1;
                        null === a && (a = new Set), a.add(f);
                    }
                }
            } if (null !== a) {
                for (var d = s(t), y = 0; y < d.length; y++) {
                    var g = r(d[y], 2), m = (f = g[0], g[1]);
                    if ("object" === o(f) && null !== f) {
                        if (!W(a, e, f, m, n, i))
                            return !1;
                    }
                    else if (!(n || e.has(f) && D(e.get(f), m, !1, i) || W(a, e, f, m, !1, i)))
                        return !1;
                }
                return 0 === a.size;
            } return !0; }(e, t, n, c))
                return !1;
        }
        else if (1 === u)
            for (; l < e.length; l++) {
                if (!p(e, l)) {
                    if (p(t, l))
                        return !1;
                    for (var f = Object.keys(e); l < f.length; l++) {
                        var h = f[l];
                        if (!p(t, h) || !D(e[h], t[h], n, c))
                            return !1;
                    }
                    return f.length === Object.keys(t).length;
                }
                if (!p(t, l) || !D(e[l], t[l], n, c))
                    return !1;
            } for (l = 0; l < i.length; l++) {
            var d = i[l];
            if (!D(e[d], t[d], n, c))
                return !1;
        } return !0; }
        e.exports = { isDeepEqual: function (e, t) { return D(e, t, !1); }, isDeepStrictEqual: function (e, t) { return D(e, t, !0); } };
    }, 2680: (e, t, n) => {
        "use strict";
        var r = n(7286), o = n(9429), i = o(r("String.prototype.indexOf"));
        e.exports = function (e, t) { var n = r(e, !!t); return "function" == typeof n && i(e, ".prototype.") > -1 ? o(n) : n; };
    }, 9429: (e, t, n) => {
        "use strict";
        var r = n(4090), o = n(7286), i = o("%Function.prototype.apply%"), a = o("%Function.prototype.call%"), s = o("%Reflect.apply%", !0) || r.call(a, i), c = o("%Object.getOwnPropertyDescriptor%", !0), u = o("%Object.defineProperty%", !0), l = o("%Math.max%");
        if (u)
            try {
                u({}, "a", { value: 1 });
            }
            catch (e) {
                u = null;
            }
        e.exports = function (e) { var t = s(r, a, arguments); if (c && u) {
            var n = c(t, "length");
            n.configurable && u(t, "length", { value: 1 + l(0, e.length - (arguments.length - 1)) });
        } return t; };
        var f = function () { return s(r, i, arguments); };
        u ? u(e.exports, "apply", { value: f }) : e.exports.apply = f;
    }, 3877: (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { Alternation: () => me, Alternative: () => fe, CstParser: () => Tn, EMPTY_ALT: () => vn, EOF: () => oe, EarlyExitException: () => wt, EmbeddedActionsParser: () => En, GAstVisitor: () => Re, Lexer: () => Z, LexerDefinitionErrorType: () => X, MismatchedTokenException: () => At, NoViableAltException: () => Nt, NonTerminal: () => ue, NotAllInputParsedException: () => kt, Option: () => pe, Parser: () => Dn, ParserDefinitionErrorType: () => yn, Repetition: () => ye, RepetitionMandatory: () => he, RepetitionMandatoryWithSeparator: () => de, RepetitionWithSeparator: () => ge, Rule: () => le, Terminal: () => ve, VERSION: () => r, assignOccurrenceIndices: () => mt, clearCache: () => In, createSyntaxDiagramsCode: () => _n, createToken: () => re, createTokenInstance: () => ie, defaultGrammarResolverErrorProvider: () => De, defaultGrammarValidatorErrorProvider: () => Le, defaultLexerErrorProvider: () => Y, defaultParserErrorProvider: () => Ie, generateParserFactory: () => xn, generateParserModule: () => Cn, isRecognitionException: () => St, resolveGrammar: () => yt, serializeGrammar: () => be, serializeProduction: () => Te, tokenLabel: () => ee, tokenMatcher: () => ae, tokenName: () => te, validateGrammar: () => gt });
        var r = "7.1.1", o = n(1481), i = n(4844), a = {}, s = new i.RegExpParser;
        function c(e) { var t = e.toString(); if (a.hasOwnProperty(t))
            return a[t]; var n = s.pattern(t); return a[t] = n, n; }
        var u, l = (u = function (e, t) { return u = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]); }, u(e, t); }, function (e, t) { function n() { this.constructor = e; } u(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n); }), f = "Complement Sets are not supported for first char optimization", p = 'Unable to use "first char" lexer optimizations:\n';
        function h(e, t) { void 0 === t && (t = !1); try {
            var n = c(e);
            return d(n.value, {}, n.flags.ignoreCase);
        }
        catch (n) {
            if (n.message === f)
                t && (0, o.rr)(p + "\tUnable to optimize: < " + e.toString() + " >\n\tComplement Sets cannot be automatically optimized.\n\tThis will disable the lexer's first char optimizations.\n\tSee: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#COMPLEMENT for details.");
            else {
                var r = "";
                t && (r = "\n\tThis will disable the lexer's first char optimizations.\n\tSee: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#REGEXP_PARSING for details."), (0, o.WB)(p + "\n\tFailed parsing: < " + e.toString() + " >\n\tUsing the regexp-to-ast library version: " + i.VERSION + "\n\tPlease open an issue at: https://github.com/bd82/regexp-to-ast/issues" + r);
            }
        } return []; }
        function d(e, t, n) { switch (e.type) {
            case "Disjunction":
                for (var r = 0; r < e.value.length; r++)
                    d(e.value[r], t, n);
                break;
            case "Alternative":
                var i = e.value;
                for (r = 0; r < i.length; r++) {
                    var a = i[r];
                    switch (a.type) {
                        case "EndAnchor":
                        case "GroupBackReference":
                        case "Lookahead":
                        case "NegativeLookahead":
                        case "StartAnchor":
                        case "WordBoundary":
                        case "NonWordBoundary": continue;
                    }
                    var s = a;
                    switch (s.type) {
                        case "Character":
                            y(s.value, t, n);
                            break;
                        case "Set":
                            if (!0 === s.complement)
                                throw Error(f);
                            (0, o.Ed)(s.value, (function (e) { if ("number" == typeof e)
                                y(e, t, n);
                            else {
                                var r = e;
                                if (!0 === n)
                                    for (var o = r.from; o <= r.to; o++)
                                        y(o, t, n);
                                else {
                                    for (o = r.from; o <= r.to && o < j; o++)
                                        y(o, t, n);
                                    if (r.to >= j)
                                        for (var i = r.from >= j ? r.from : j, a = r.to, s = U(i), c = U(a), u = s; u <= c; u++)
                                            t[u] = u;
                                }
                            } }));
                            break;
                        case "Group":
                            d(s.value, t, n);
                            break;
                        default: throw Error("Non Exhaustive Match");
                    }
                    var c = void 0 !== s.quantifier && 0 === s.quantifier.atLeast;
                    if ("Group" === s.type && !1 === m(s) || "Group" !== s.type && !1 === c)
                        break;
                }
                break;
            default: throw Error("non exhaustive match!");
        } return (0, o.VO)(t); }
        function y(e, t, n) { var r = U(e); t[r] = r, !0 === n && function (e, t) { var n = String.fromCharCode(e), r = n.toUpperCase(); if (r !== n)
            t[o = U(r.charCodeAt(0))] = o;
        else {
            var o, i = n.toLowerCase();
            i !== n && (t[o = U(i.charCodeAt(0))] = o);
        } }(e, t); }
        function g(e, t) { return (0, o.sE)(e.value, (function (e) { if ("number" == typeof e)
            return (0, o.r3)(t, e); var n = e; return void 0 !== (0, o.sE)(t, (function (e) { return n.from <= e && e <= n.to; })); })); }
        function m(e) { return !(!e.quantifier || 0 !== e.quantifier.atLeast) || !!e.value && ((0, o.kJ)(e.value) ? (0, o.yW)(e.value, m) : m(e.value)); }
        var v = function (e) { function t(t) { var n = e.call(this) || this; return n.targetCharCodes = t, n.found = !1, n; } return l(t, e), t.prototype.visitChildren = function (t) { if (!0 !== this.found) {
            switch (t.type) {
                case "Lookahead": return void this.visitLookahead(t);
                case "NegativeLookahead": return void this.visitNegativeLookahead(t);
            }
            e.prototype.visitChildren.call(this, t);
        } }, t.prototype.visitCharacter = function (e) { (0, o.r3)(this.targetCharCodes, e.value) && (this.found = !0); }, t.prototype.visitSet = function (e) { e.complement ? void 0 === g(e, this.targetCharCodes) && (this.found = !0) : void 0 !== g(e, this.targetCharCodes) && (this.found = !0); }, t; }(i.BaseRegExpVisitor);
        function b(e, t) { if (t instanceof RegExp) {
            var n = c(t), r = new v(e);
            return r.visit(n), r.found;
        } return void 0 !== (0, o.sE)(t, (function (t) { return (0, o.r3)(e, t.charCodeAt(0)); })); }
        var T = function () { var e = function (t, n) { return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]); }, e(t, n); }; return function (t, n) { function r() { this.constructor = t; } e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r); }; }(), E = "defaultMode", _ = "modes", R = "boolean" == typeof new RegExp("(?:)").sticky;
        function S(e, t) { var n, r = (t = (0, o.ce)(t, { useSticky: R, debug: !1, safeMode: !1, positionTracking: "full", lineTerminatorCharacters: ["\r", "\n"], tracer: function (e, t) { return t(); } })).tracer; r("initCharCodeToOptimizedIndexMap", (function () { !function () { if ((0, o.xb)(F)) {
            F = new Array(65536);
            for (var e = 0; e < 65536; e++)
                F[e] = e > 255 ? 255 + ~~(e / 255) : e;
        } }(); })), r("Reject Lexer.NA", (function () { n = (0, o.d1)(e, (function (e) { return e.PATTERN === Z.NA; })); })); var i, a, s, c, u, l, f, d, y, g, m, v = !1; r("Transform Patterns", (function () { v = !1, i = (0, o.UI)(n, (function (e) { var n = e.PATTERN; if ((0, o.Kj)(n)) {
            var r = n.source;
            return 1 !== r.length || "^" === r || "$" === r || "." === r || n.ignoreCase ? 2 !== r.length || "\\" !== r[0] || (0, o.r3)(["d", "D", "s", "S", "t", "r", "n", "t", "0", "c", "b", "B", "f", "v", "w", "W"], r[1]) ? t.useSticky ? w(n) : k(n) : r[1] : r;
        } if ((0, o.mf)(n))
            return v = !0, { exec: n }; if ((0, o.e$)(n, "exec"))
            return v = !0, n; if ("string" == typeof n) {
            if (1 === n.length)
                return n;
            var i = n.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&"), a = new RegExp(i);
            return t.useSticky ? w(a) : k(a);
        } throw Error("non exhaustive match"); })); })), r("misc mapping", (function () { a = (0, o.UI)(n, (function (e) { return e.tokenTypeIdx; })), s = (0, o.UI)(n, (function (e) { var t = e.GROUP; if (t !== Z.SKIPPED) {
            if ((0, o.HD)(t))
                return t;
            if ((0, o.o8)(t))
                return !1;
            throw Error("non exhaustive match");
        } })), c = (0, o.UI)(n, (function (e) { var t = e.LONGER_ALT; if (t)
            return (0, o.cq)(n, t); })), u = (0, o.UI)(n, (function (e) { return e.PUSH_MODE; })), l = (0, o.UI)(n, (function (e) { return (0, o.e$)(e, "POP_MODE"); })); })), r("Line Terminator Handling", (function () { var e = L(t.lineTerminatorCharacters); f = (0, o.UI)(n, (function (e) { return !1; })), "onlyOffset" !== t.positionTracking && (f = (0, o.UI)(n, (function (t) { return (0, o.e$)(t, "LINE_BREAKS") ? t.LINE_BREAKS : !1 === D(t, e) ? b(e, t.PATTERN) : void 0; }))); })), r("Misc Mapping #2", (function () { d = (0, o.UI)(n, C), y = (0, o.UI)(i, P), g = (0, o.u4)(n, (function (e, t) { var n = t.GROUP; return (0, o.HD)(n) && n !== Z.SKIPPED && (e[n] = []), e; }), {}), m = (0, o.UI)(i, (function (e, t) { return { pattern: i[t], longerAlt: c[t], canLineTerminator: f[t], isCustom: d[t], short: y[t], group: s[t], push: u[t], pop: l[t], tokenTypeIdx: a[t], tokenType: n[t] }; })); })); var T = !0, E = []; return t.safeMode || r("First Char Optimization", (function () { E = (0, o.u4)(n, (function (e, n, r) { if ("string" == typeof n.PATTERN) {
            var i = U(n.PATTERN.charCodeAt(0));
            M(e, i, m[r]);
        }
        else if ((0, o.kJ)(n.START_CHARS_HINT)) {
            var a;
            (0, o.Ed)(n.START_CHARS_HINT, (function (t) { var n = U("string" == typeof t ? t.charCodeAt(0) : t); a !== n && (a = n, M(e, n, m[r])); }));
        }
        else if ((0, o.Kj)(n.PATTERN))
            if (n.PATTERN.unicode)
                T = !1, t.ensureOptimizations && (0, o.WB)(p + "\tUnable to analyze < " + n.PATTERN.toString() + " > pattern.\n\tThe regexp unicode flag is not currently supported by the regexp-to-ast library.\n\tThis will disable the lexer's first char optimizations.\n\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNICODE_OPTIMIZE");
            else {
                var s = h(n.PATTERN, t.ensureOptimizations);
                (0, o.xb)(s) && (T = !1), (0, o.Ed)(s, (function (t) { M(e, t, m[r]); }));
            }
        else
            t.ensureOptimizations && (0, o.WB)(p + "\tTokenType: <" + n.name + "> is using a custom token pattern without providing <start_chars_hint> parameter.\n\tThis will disable the lexer's first char optimizations.\n\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_OPTIMIZE"), T = !1; return e; }), []); })), r("ArrayPacking", (function () { E = (0, o.X0)(E); })), { emptyGroups: g, patternIdxToConfig: m, charCodeToPatternIdxToConfig: E, hasCustom: v, canBeOptimized: T }; }
        function O(e, t) { var n = [], r = function (e) { var t = (0, o.hX)(e, (function (e) { return !(0, o.e$)(e, "PATTERN"); })); return { errors: (0, o.UI)(t, (function (e) { return { message: "Token Type: ->" + e.name + "<- missing static 'PATTERN' property", type: X.MISSING_PATTERN, tokenTypes: [e] }; })), valid: (0, o.e5)(e, t) }; }(e); n = n.concat(r.errors); var a = function (e) { var t = (0, o.hX)(e, (function (e) { var t = e.PATTERN; return !((0, o.Kj)(t) || (0, o.mf)(t) || (0, o.e$)(t, "exec") || (0, o.HD)(t)); })); return { errors: (0, o.UI)(t, (function (e) { return { message: "Token Type: ->" + e.name + "<- static 'PATTERN' can only be a RegExp, a Function matching the {CustomPatternMatcherFunc} type or an Object matching the {ICustomPattern} interface.", type: X.INVALID_PATTERN, tokenTypes: [e] }; })), valid: (0, o.e5)(e, t) }; }(r.valid), s = a.valid; return n = (n = n.concat(a.errors)).concat(function (e) { var t = [], n = (0, o.hX)(e, (function (e) { return (0, o.Kj)(e.PATTERN); })); return t = t.concat(function (e) { var t = function (e) { function t() { var t = null !== e && e.apply(this, arguments) || this; return t.found = !1, t; } return T(t, e), t.prototype.visitEndAnchor = function (e) { this.found = !0; }, t; }(i.BaseRegExpVisitor), n = (0, o.hX)(e, (function (e) { var n = e.PATTERN; try {
            var r = c(n), o = new t;
            return o.visit(r), o.found;
        }
        catch (e) {
            return A.test(n.source);
        } })); return (0, o.UI)(n, (function (e) { return { message: "Unexpected RegExp Anchor Error:\n\tToken Type: ->" + e.name + "<- static 'PATTERN' cannot contain end of input anchor '$'\n\tSee sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS\tfor details.", type: X.EOI_ANCHOR_FOUND, tokenTypes: [e] }; })); }(n)), t = t.concat(function (e) { var t = function (e) { function t() { var t = null !== e && e.apply(this, arguments) || this; return t.found = !1, t; } return T(t, e), t.prototype.visitStartAnchor = function (e) { this.found = !0; }, t; }(i.BaseRegExpVisitor), n = (0, o.hX)(e, (function (e) { var n = e.PATTERN; try {
            var r = c(n), o = new t;
            return o.visit(r), o.found;
        }
        catch (e) {
            return N.test(n.source);
        } })); return (0, o.UI)(n, (function (e) { return { message: "Unexpected RegExp Anchor Error:\n\tToken Type: ->" + e.name + "<- static 'PATTERN' cannot contain start of input anchor '^'\n\tSee https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#ANCHORS\tfor details.", type: X.SOI_ANCHOR_FOUND, tokenTypes: [e] }; })); }(n)), t = t.concat(function (e) { var t = (0, o.hX)(e, (function (e) { var t = e.PATTERN; return t instanceof RegExp && (t.multiline || t.global); })); return (0, o.UI)(t, (function (e) { return { message: "Token Type: ->" + e.name + "<- static 'PATTERN' may NOT contain global('g') or multiline('m')", type: X.UNSUPPORTED_FLAGS_FOUND, tokenTypes: [e] }; })); }(n)), t = t.concat(function (e) { var t = [], n = (0, o.UI)(e, (function (n) { return (0, o.u4)(e, (function (e, r) { return n.PATTERN.source !== r.PATTERN.source || (0, o.r3)(t, r) || r.PATTERN === Z.NA || (t.push(r), e.push(r)), e; }), []); })); n = (0, o.oA)(n); var r = (0, o.hX)(n, (function (e) { return e.length > 1; })); return (0, o.UI)(r, (function (e) { var t = (0, o.UI)(e, (function (e) { return e.name; })); return { message: "The same RegExp pattern ->" + (0, o.Ps)(e).PATTERN + "<-has been used in all of the following Token Types: " + t.join(", ") + " <-", type: X.DUPLICATE_PATTERNS_FOUND, tokenTypes: e }; })); }(n)), t = t.concat(function (e) { var t = (0, o.hX)(e, (function (e) { return e.PATTERN.test(""); })); return (0, o.UI)(t, (function (e) { return { message: "Token Type: ->" + e.name + "<- static 'PATTERN' must not match an empty string", type: X.EMPTY_MATCH_PATTERN, tokenTypes: [e] }; })); }(n)), t; }(s)), n = n.concat(function (e) { var t = (0, o.hX)(e, (function (e) { if (!(0, o.e$)(e, "GROUP"))
            return !1; var t = e.GROUP; return t !== Z.SKIPPED && t !== Z.NA && !(0, o.HD)(t); })); return (0, o.UI)(t, (function (e) { return { message: "Token Type: ->" + e.name + "<- static 'GROUP' can only be Lexer.SKIPPED/Lexer.NA/A String", type: X.INVALID_GROUP_TYPE_FOUND, tokenTypes: [e] }; })); }(s)), n = n.concat(function (e, t) { var n = (0, o.hX)(e, (function (e) { return void 0 !== e.PUSH_MODE && !(0, o.r3)(t, e.PUSH_MODE); })); return (0, o.UI)(n, (function (e) { return { message: "Token Type: ->" + e.name + "<- static 'PUSH_MODE' value cannot refer to a Lexer Mode ->" + e.PUSH_MODE + "<-which does not exist", type: X.PUSH_MODE_DOES_NOT_EXIST, tokenTypes: [e] }; })); }(s, t)), n = n.concat(function (e) { var t = [], n = (0, o.u4)(e, (function (e, t, n) { var r, i, a = t.PATTERN; return a === Z.NA || ((0, o.HD)(a) ? e.push({ str: a, idx: n, tokenType: t }) : (0, o.Kj)(a) && (r = a, i = [".", "\\", "[", "]", "|", "^", "$", "(", ")", "?", "*", "+", "{"], void 0 === (0, o.sE)(i, (function (e) { return -1 !== r.source.indexOf(e); }))) && e.push({ str: a.source, idx: n, tokenType: t })), e; }), []); return (0, o.Ed)(e, (function (e, r) { (0, o.Ed)(n, (function (n) { var i = n.str, a = n.idx, s = n.tokenType; if (r < a && function (e, t) { if ((0, o.Kj)(t)) {
            var n = t.exec(e);
            return null !== n && 0 === n.index;
        } if ((0, o.mf)(t))
            return t(e, 0, [], {}); if ((0, o.e$)(t, "exec"))
            return t.exec(e, 0, [], {}); if ("string" == typeof t)
            return t === e; throw Error("non exhaustive match"); }(i, e.PATTERN)) {
            var c = "Token: ->" + s.name + "<- can never be matched.\nBecause it appears AFTER the Token Type ->" + e.name + "<-in the lexer's definition.\nSee https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#UNREACHABLE";
            t.push({ message: c, type: X.UNREACHABLE_PATTERN, tokenTypes: [e, s] });
        } })); })), t; }(s)), n; }
        var A = /[^\\][\$]/, N = /[^\\[][\^]|^\^/;
        function k(e) { var t = e.ignoreCase ? "i" : ""; return new RegExp("^(?:" + e.source + ")", t); }
        function w(e) { var t = e.ignoreCase ? "iy" : "y"; return new RegExp("" + e.source, t); }
        function x(e, t, n) { var r = [], i = !1, a = (0, o.oA)((0, o.xH)((0, o.Q8)(e.modes, (function (e) { return e; })))), s = (0, o.d1)(a, (function (e) { return e.PATTERN === Z.NA; })), c = L(n); return t && (0, o.Ed)(s, (function (e) { var t = D(e, c); if (!1 !== t) {
            var n = function (e, t) { if (t.issue === X.IDENTIFY_TERMINATOR)
                return "Warning: unable to identify line terminator usage in pattern.\n\tThe problem is in the <" + e.name + "> Token Type\n\t Root cause: " + t.errMsg + ".\n\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#IDENTIFY_TERMINATOR"; if (t.issue === X.CUSTOM_LINE_BREAK)
                return "Warning: A Custom Token Pattern should specify the <line_breaks> option.\n\tThe problem is in the <" + e.name + "> Token Type\n\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#CUSTOM_LINE_BREAK"; throw Error("non exhaustive match"); }(e, t), a = { message: n, type: t.issue, tokenType: e };
            r.push(a);
        }
        else
            (0, o.e$)(e, "LINE_BREAKS") ? !0 === e.LINE_BREAKS && (i = !0) : b(c, e.PATTERN) && (i = !0); })), t && !i && r.push({ message: "Warning: No LINE_BREAKS Found.\n\tThis Lexer has been defined to track line and column information,\n\tBut none of the Token Types can be identified as matching a line terminator.\n\tSee https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#LINE_BREAKS \n\tfor details.", type: X.NO_LINE_BREAKS_FLAGS }), r; }
        function C(e) { var t = e.PATTERN; if ((0, o.Kj)(t))
            return !1; if ((0, o.mf)(t))
            return !0; if ((0, o.e$)(t, "exec"))
            return !0; if ((0, o.HD)(t))
            return !1; throw Error("non exhaustive match"); }
        function P(e) { return !(!(0, o.HD)(e) || 1 !== e.length) && e.charCodeAt(0); }
        var I = { test: function (e) { for (var t = e.length, n = this.lastIndex; n < t; n++) {
                var r = e.charCodeAt(n);
                if (10 === r)
                    return this.lastIndex = n + 1, !0;
                if (13 === r)
                    return 10 === e.charCodeAt(n + 1) ? this.lastIndex = n + 2 : this.lastIndex = n + 1, !0;
            } return !1; }, lastIndex: 0 };
        function D(e, t) { if ((0, o.e$)(e, "LINE_BREAKS"))
            return !1; if ((0, o.Kj)(e.PATTERN)) {
            try {
                b(t, e.PATTERN);
            }
            catch (e) {
                return { issue: X.IDENTIFY_TERMINATOR, errMsg: e.message };
            }
            return !1;
        } if ((0, o.HD)(e.PATTERN))
            return !1; if (C(e))
            return { issue: X.CUSTOM_LINE_BREAK }; throw Error("non exhaustive match"); }
        function L(e) { return (0, o.UI)(e, (function (e) { return (0, o.HD)(e) && e.length > 0 ? e.charCodeAt(0) : e; })); }
        function M(e, t, n) { void 0 === e[t] ? e[t] = [n] : e[t].push(n); }
        var j = 256;
        function U(e) { return e < j ? e : F[e]; }
        var F = [];
        function q(e, t) { var n = e.tokenTypeIdx; return n === t.tokenTypeIdx || !0 === t.isParent && !0 === t.categoryMatchesMap[n]; }
        function W(e, t) { return e.tokenTypeIdx === t.tokenTypeIdx; }
        var B = 1, $ = {};
        function H(e) { var t = function (e) { for (var t = (0, o.Qw)(e), n = e, r = !0; r;) {
            n = (0, o.oA)((0, o.xH)((0, o.UI)(n, (function (e) { return e.CATEGORIES; }))));
            var i = (0, o.e5)(n, t);
            t = t.concat(i), (0, o.xb)(i) ? r = !1 : n = i;
        } return t; }(e); !function (e) { (0, o.Ed)(e, (function (e) { var t; K(e) || ($[B] = e, e.tokenTypeIdx = B++), G(e) && !(0, o.kJ)(e.CATEGORIES) && (e.CATEGORIES = [e.CATEGORIES]), G(e) || (e.CATEGORIES = []), t = e, (0, o.e$)(t, "categoryMatches") || (e.categoryMatches = []), function (e) { return (0, o.e$)(e, "categoryMatchesMap"); }(e) || (e.categoryMatchesMap = {}); })); }(t), function (e) { (0, o.Ed)(e, (function (e) { V([], e); })); }(t), function (e) { (0, o.Ed)(e, (function (e) { e.categoryMatches = [], (0, o.Ed)(e.categoryMatchesMap, (function (t, n) { e.categoryMatches.push($[n].tokenTypeIdx); })); })); }(t), (0, o.Ed)(t, (function (e) { e.isParent = e.categoryMatches.length > 0; })); }
        function V(e, t) { (0, o.Ed)(e, (function (e) { t.categoryMatchesMap[e.tokenTypeIdx] = !0; })), (0, o.Ed)(t.CATEGORIES, (function (n) { var r = e.concat(t); (0, o.r3)(r, n) || V(r, n); })); }
        function K(e) { return (0, o.e$)(e, "tokenTypeIdx"); }
        function G(e) { return (0, o.e$)(e, "CATEGORIES"); }
        function z(e) { return (0, o.e$)(e, "tokenTypeIdx"); }
        var X, Y = { buildUnableToPopLexerModeMessage: function (e) { return "Unable to pop Lexer Mode after encountering Token ->" + e.image + "<- The Mode Stack is empty"; }, buildUnexpectedCharactersMessage: function (e, t, n, r, o) { return "unexpected character: ->" + e.charAt(t) + "<- at offset: " + t + ", skipped " + n + " characters."; } }, J = n(3716);
        !function (e) { e[e.MISSING_PATTERN = 0] = "MISSING_PATTERN", e[e.INVALID_PATTERN = 1] = "INVALID_PATTERN", e[e.EOI_ANCHOR_FOUND = 2] = "EOI_ANCHOR_FOUND", e[e.UNSUPPORTED_FLAGS_FOUND = 3] = "UNSUPPORTED_FLAGS_FOUND", e[e.DUPLICATE_PATTERNS_FOUND = 4] = "DUPLICATE_PATTERNS_FOUND", e[e.INVALID_GROUP_TYPE_FOUND = 5] = "INVALID_GROUP_TYPE_FOUND", e[e.PUSH_MODE_DOES_NOT_EXIST = 6] = "PUSH_MODE_DOES_NOT_EXIST", e[e.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE = 7] = "MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE", e[e.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY = 8] = "MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY", e[e.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST = 9] = "MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST", e[e.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED = 10] = "LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED", e[e.SOI_ANCHOR_FOUND = 11] = "SOI_ANCHOR_FOUND", e[e.EMPTY_MATCH_PATTERN = 12] = "EMPTY_MATCH_PATTERN", e[e.NO_LINE_BREAKS_FLAGS = 13] = "NO_LINE_BREAKS_FLAGS", e[e.UNREACHABLE_PATTERN = 14] = "UNREACHABLE_PATTERN", e[e.IDENTIFY_TERMINATOR = 15] = "IDENTIFY_TERMINATOR", e[e.CUSTOM_LINE_BREAK = 16] = "CUSTOM_LINE_BREAK"; }(X || (X = {}));
        var Q = { deferDefinitionErrorsHandling: !1, positionTracking: "full", lineTerminatorsPattern: /\n|\r\n?/g, lineTerminatorCharacters: ["\n", "\r"], ensureOptimizations: !1, safeMode: !1, errorMessageProvider: Y, traceInitPerf: !1, skipValidations: !1 };
        Object.freeze(Q);
        var Z = function () { function e(e, t) { var n = this; if (void 0 === t && (t = Q), this.lexerDefinition = e, this.lexerDefinitionErrors = [], this.lexerDefinitionWarning = [], this.patternIdxToConfig = {}, this.charCodeToPatternIdxToConfig = {}, this.modes = [], this.emptyGroups = {}, this.config = void 0, this.trackStartLines = !0, this.trackEndLines = !0, this.hasCustom = !1, this.canModeBeOptimized = {}, "boolean" == typeof t)
            throw Error("The second argument to the Lexer constructor is now an ILexerConfig Object.\na boolean 2nd argument is no longer supported"); this.config = (0, o.TS)(Q, t); var r = this.config.traceInitPerf; !0 === r ? (this.traceInitMaxIdent = 1 / 0, this.traceInitPerf = !0) : "number" == typeof r && (this.traceInitMaxIdent = r, this.traceInitPerf = !0), this.traceInitIndent = -1, this.TRACE_INIT("Lexer Constructor", (function () { var r, i = !0; n.TRACE_INIT("Lexer Config handling", (function () { if (n.config.lineTerminatorsPattern === Q.lineTerminatorsPattern)
            n.config.lineTerminatorsPattern = I;
        else if (n.config.lineTerminatorCharacters === Q.lineTerminatorCharacters)
            throw Error("Error: Missing <lineTerminatorCharacters> property on the Lexer config.\n\tFor details See: https://sap.github.io/chevrotain/docs/guide/resolving_lexer_errors.html#MISSING_LINE_TERM_CHARS"); if (t.safeMode && t.ensureOptimizations)
            throw Error('"safeMode" and "ensureOptimizations" flags are mutually exclusive.'); n.trackStartLines = /full|onlyStart/i.test(n.config.positionTracking), n.trackEndLines = /full/i.test(n.config.positionTracking), (0, o.kJ)(e) ? ((r = { modes: {} }).modes.defaultMode = (0, o.Qw)(e), r.defaultMode = E) : (i = !1, r = (0, o.Cl)(e)); })), !1 === n.config.skipValidations && (n.TRACE_INIT("performRuntimeChecks", (function () { n.lexerDefinitionErrors = n.lexerDefinitionErrors.concat(function (e, t, n) { var r = []; return (0, o.e$)(e, E) || r.push({ message: "A MultiMode Lexer cannot be initialized without a <defaultMode> property in its definition\n", type: X.MULTI_MODE_LEXER_WITHOUT_DEFAULT_MODE }), (0, o.e$)(e, _) || r.push({ message: "A MultiMode Lexer cannot be initialized without a <modes> property in its definition\n", type: X.MULTI_MODE_LEXER_WITHOUT_MODES_PROPERTY }), (0, o.e$)(e, _) && (0, o.e$)(e, E) && !(0, o.e$)(e.modes, e.defaultMode) && r.push({ message: "A MultiMode Lexer cannot be initialized with a defaultMode: <" + e.defaultMode + ">which does not exist\n", type: X.MULTI_MODE_LEXER_DEFAULT_MODE_VALUE_DOES_NOT_EXIST }), (0, o.e$)(e, _) && (0, o.Ed)(e.modes, (function (e, t) { (0, o.Ed)(e, (function (e, n) { (0, o.o8)(e) && r.push({ message: "A Lexer cannot be initialized using an undefined Token Type. Mode:<" + t + "> at index: <" + n + ">\n", type: X.LEXER_DEFINITION_CANNOT_CONTAIN_UNDEFINED }); })); })), r; }(r, n.trackStartLines, n.config.lineTerminatorCharacters)); })), n.TRACE_INIT("performWarningRuntimeChecks", (function () { n.lexerDefinitionWarning = n.lexerDefinitionWarning.concat(x(r, n.trackStartLines, n.config.lineTerminatorCharacters)); }))), r.modes = r.modes ? r.modes : {}, (0, o.Ed)(r.modes, (function (e, t) { r.modes[t] = (0, o.d1)(e, (function (e) { return (0, o.o8)(e); })); })); var s = (0, o.XP)(r.modes); if ((0, o.Ed)(r.modes, (function (e, r) { n.TRACE_INIT("Mode: <" + r + "> processing", (function () { var i; n.modes.push(r), !1 === n.config.skipValidations && n.TRACE_INIT("validatePatterns", (function () { n.lexerDefinitionErrors = n.lexerDefinitionErrors.concat(O(e, s)); })), (0, o.xb)(n.lexerDefinitionErrors) && (H(e), n.TRACE_INIT("analyzeTokenTypes", (function () { i = S(e, { lineTerminatorCharacters: n.config.lineTerminatorCharacters, positionTracking: t.positionTracking, ensureOptimizations: t.ensureOptimizations, safeMode: t.safeMode, tracer: n.TRACE_INIT.bind(n) }); })), n.patternIdxToConfig[r] = i.patternIdxToConfig, n.charCodeToPatternIdxToConfig[r] = i.charCodeToPatternIdxToConfig, n.emptyGroups = (0, o.TS)(n.emptyGroups, i.emptyGroups), n.hasCustom = i.hasCustom || n.hasCustom, n.canModeBeOptimized[r] = i.canBeOptimized); })); })), n.defaultMode = r.defaultMode, !(0, o.xb)(n.lexerDefinitionErrors) && !n.config.deferDefinitionErrorsHandling) {
            var c = (0, o.UI)(n.lexerDefinitionErrors, (function (e) { return e.message; })).join("-----------------------\n");
            throw new Error("Errors detected in definition of Lexer:\n" + c);
        } (0, o.Ed)(n.lexerDefinitionWarning, (function (e) { (0, o.rr)(e.message); })), n.TRACE_INIT("Choosing sub-methods implementations", (function () { if (R ? (n.chopInput = o.Wd, n.match = n.matchWithTest) : (n.updateLastIndex = o.dG, n.match = n.matchWithExec), i && (n.handleModes = o.dG), !1 === n.trackStartLines && (n.computeNewColumn = o.Wd), !1 === n.trackEndLines && (n.updateTokenEndLineColumnLocation = o.dG), /full/i.test(n.config.positionTracking))
            n.createTokenInstance = n.createFullToken;
        else if (/onlyStart/i.test(n.config.positionTracking))
            n.createTokenInstance = n.createStartOnlyToken;
        else {
            if (!/onlyOffset/i.test(n.config.positionTracking))
                throw Error('Invalid <positionTracking> config option: "' + n.config.positionTracking + '"');
            n.createTokenInstance = n.createOffsetOnlyToken;
        } n.hasCustom ? (n.addToken = n.addTokenUsingPush, n.handlePayload = n.handlePayloadWithCustom) : (n.addToken = n.addTokenUsingMemberAccess, n.handlePayload = n.handlePayloadNoCustom); })), n.TRACE_INIT("Failed Optimization Warnings", (function () { var e = (0, o.u4)(n.canModeBeOptimized, (function (e, t, n) { return !1 === t && e.push(n), e; }), []); if (t.ensureOptimizations && !(0, o.xb)(e))
            throw Error("Lexer Modes: < " + e.join(", ") + ' > cannot be optimized.\n\t Disable the "ensureOptimizations" lexer config flag to silently ignore this and run the lexer in an un-optimized mode.\n\t Or inspect the console log for details on how to resolve these issues.'); })), n.TRACE_INIT("clearRegExpParserCache", (function () { a = {}; })), n.TRACE_INIT("toFastProperties", (function () { (0, o.SV)(n); })); })); } return e.prototype.tokenize = function (e, t) { if (void 0 === t && (t = this.defaultMode), !(0, o.xb)(this.lexerDefinitionErrors)) {
            var n = (0, o.UI)(this.lexerDefinitionErrors, (function (e) { return e.message; })).join("-----------------------\n");
            throw new Error("Unable to Tokenize because Errors detected in definition of Lexer:\n" + n);
        } return this.tokenizeInternal(e, t); }, e.prototype.tokenizeInternal = function (e, t) { var n, r, i, a, s, c, u, l, f, p, h, d, y, g, m, v, b, T = this, E = e, _ = E.length, R = 0, S = 0, O = this.hasCustom ? 0 : Math.floor(e.length / 10), A = new Array(O), N = [], k = this.trackStartLines ? 1 : void 0, w = this.trackStartLines ? 1 : void 0, x = (m = this.emptyGroups, v = {}, b = (0, o.XP)(m), (0, o.Ed)(b, (function (e) { var t = m[e]; if (!(0, o.kJ)(t))
            throw Error("non exhaustive match"); v[e] = []; })), v), C = this.trackStartLines, P = this.config.lineTerminatorsPattern, I = 0, D = [], L = [], M = [], j = []; Object.freeze(j); var F = void 0; function q() { return D; } function W(e) { var t = U(e), n = L[t]; return void 0 === n ? j : n; } var B, $ = function (e) { if (1 === M.length && void 0 === e.tokenType.PUSH_MODE) {
            var t = T.config.errorMessageProvider.buildUnableToPopLexerModeMessage(e);
            N.push({ offset: e.startOffset, line: void 0 !== e.startLine ? e.startLine : void 0, column: void 0 !== e.startColumn ? e.startColumn : void 0, length: e.image.length, message: t });
        }
        else {
            M.pop();
            var n = (0, o.Z$)(M);
            D = T.patternIdxToConfig[n], L = T.charCodeToPatternIdxToConfig[n], I = D.length;
            var r = T.canModeBeOptimized[n] && !1 === T.config.safeMode;
            F = L && r ? W : q;
        } }; function H(e) { M.push(e), L = this.charCodeToPatternIdxToConfig[e], D = this.patternIdxToConfig[e], I = D.length, I = D.length; var t = this.canModeBeOptimized[e] && !1 === this.config.safeMode; F = L && t ? W : q; } for (H.call(this, t); R < _;) {
            s = null;
            var V = E.charCodeAt(R), K = F(V), G = K.length;
            for (n = 0; n < G; n++) {
                var z = (B = K[n]).pattern;
                if (c = null, !1 !== (oe = B.short) ? V === oe && (s = z) : !0 === B.isCustom ? null !== (g = z.exec(E, R, A, x)) ? (s = g[0], void 0 !== g.payload && (c = g.payload)) : s = null : (this.updateLastIndex(z, R), s = this.match(z, e, R)), null !== s) {
                    if (void 0 !== (a = B.longerAlt)) {
                        var X = D[a], Y = X.pattern;
                        u = null, !0 === X.isCustom ? null !== (g = Y.exec(E, R, A, x)) ? (i = g[0], void 0 !== g.payload && (u = g.payload)) : i = null : (this.updateLastIndex(Y, R), i = this.match(Y, e, R)), i && i.length > s.length && (s = i, c = u, B = X);
                    }
                    break;
                }
            }
            if (null !== s) {
                if (l = s.length, void 0 !== (f = B.group) && (p = B.tokenTypeIdx, h = this.createTokenInstance(s, R, p, B.tokenType, k, w, l), this.handlePayload(h, c), !1 === f ? S = this.addToken(A, S, h) : x[f].push(h)), e = this.chopInput(e, l), R += l, w = this.computeNewColumn(w, l), !0 === C && !0 === B.canLineTerminator) {
                    var J = 0, Q = void 0, Z = void 0;
                    P.lastIndex = 0;
                    do {
                        !0 === (Q = P.test(s)) && (Z = P.lastIndex - 1, J++);
                    } while (!0 === Q);
                    0 !== J && (k += J, w = l - Z, this.updateTokenEndLineColumnLocation(h, f, Z, J, k, w, l));
                }
                this.handleModes(B, $, H, h);
            }
            else {
                for (var ee = R, te = k, ne = w, re = !1; !re && R < _;)
                    for (E.charCodeAt(R), e = this.chopInput(e, 1), R++, r = 0; r < I; r++) {
                        var oe, ie = D[r];
                        if (z = ie.pattern, !1 !== (oe = ie.short) ? E.charCodeAt(R) === oe && (re = !0) : !0 === ie.isCustom ? re = null !== z.exec(E, R, A, x) : (this.updateLastIndex(z, R), re = null !== z.exec(e)), !0 === re)
                            break;
                    }
                d = R - ee, y = this.config.errorMessageProvider.buildUnexpectedCharactersMessage(E, ee, d, te, ne), N.push({ offset: ee, line: te, column: ne, length: d, message: y });
            }
        } return this.hasCustom || (A.length = S), { tokens: A, groups: x, errors: N }; }, e.prototype.handleModes = function (e, t, n, r) { if (!0 === e.pop) {
            var o = e.push;
            t(r), void 0 !== o && n.call(this, o);
        }
        else
            void 0 !== e.push && n.call(this, e.push); }, e.prototype.chopInput = function (e, t) { return e.substring(t); }, e.prototype.updateLastIndex = function (e, t) { e.lastIndex = t; }, e.prototype.updateTokenEndLineColumnLocation = function (e, t, n, r, o, i, a) { var s, c; void 0 !== t && (c = (s = n === a - 1) ? -1 : 0, 1 === r && !0 === s || (e.endLine = o + c, e.endColumn = i - 1 - c)); }, e.prototype.computeNewColumn = function (e, t) { return e + t; }, e.prototype.createTokenInstance = function () { for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t]; return null; }, e.prototype.createOffsetOnlyToken = function (e, t, n, r) { return { image: e, startOffset: t, tokenTypeIdx: n, tokenType: r }; }, e.prototype.createStartOnlyToken = function (e, t, n, r, o, i) { return { image: e, startOffset: t, startLine: o, startColumn: i, tokenTypeIdx: n, tokenType: r }; }, e.prototype.createFullToken = function (e, t, n, r, o, i, a) { return { image: e, startOffset: t, endOffset: t + a - 1, startLine: o, endLine: o, startColumn: i, endColumn: i + a - 1, tokenTypeIdx: n, tokenType: r }; }, e.prototype.addToken = function (e, t, n) { return 666; }, e.prototype.addTokenUsingPush = function (e, t, n) { return e.push(n), t; }, e.prototype.addTokenUsingMemberAccess = function (e, t, n) { return e[t] = n, ++t; }, e.prototype.handlePayload = function (e, t) { }, e.prototype.handlePayloadNoCustom = function (e, t) { }, e.prototype.handlePayloadWithCustom = function (e, t) { null !== t && (e.payload = t); }, e.prototype.match = function (e, t, n) { return null; }, e.prototype.matchWithTest = function (e, t, n) { return !0 === e.test(t) ? t.substring(n, e.lastIndex) : null; }, e.prototype.matchWithExec = function (e, t) { var n = e.exec(t); return null !== n ? n[0] : n; }, e.prototype.TRACE_INIT = function (e, t) { if (!0 === this.traceInitPerf) {
            this.traceInitIndent++;
            var n = new Array(this.traceInitIndent + 1).join("\t");
            this.traceInitIndent < this.traceInitMaxIdent && J.log(n + "--\x3e <" + e + ">");
            var r = (0, o.HT)(t), i = r.time, a = r.value, s = i > 10 ? J.warn : J.log;
            return this.traceInitIndent < this.traceInitMaxIdent && s(n + "<-- <" + e + "> time: " + i + "ms"), this.traceInitIndent--, a;
        } return t(); }, e.SKIPPED = "This marks a skipped Token pattern, this means each token identified by it willbe consumed and then thrown into oblivion, this can be used to for example to completely ignore whitespace.", e.NA = /NOT_APPLICABLE/, e; }();
        function ee(e) { return ne(e) ? e.LABEL : e.name; }
        function te(e) { return e.name; }
        function ne(e) { return (0, o.HD)(e.LABEL) && "" !== e.LABEL; }
        function re(e) { return function (e) { var t = e.pattern, n = {}; if (n.name = e.name, (0, o.o8)(t) || (n.PATTERN = t), (0, o.e$)(e, "parent"))
            throw "The parent property is no longer supported.\nSee: https://github.com/SAP/chevrotain/issues/564#issuecomment-349062346 for details."; return (0, o.e$)(e, "categories") && (n.CATEGORIES = e.categories), H([n]), (0, o.e$)(e, "label") && (n.LABEL = e.label), (0, o.e$)(e, "group") && (n.GROUP = e.group), (0, o.e$)(e, "pop_mode") && (n.POP_MODE = e.pop_mode), (0, o.e$)(e, "push_mode") && (n.PUSH_MODE = e.push_mode), (0, o.e$)(e, "longer_alt") && (n.LONGER_ALT = e.longer_alt), (0, o.e$)(e, "line_breaks") && (n.LINE_BREAKS = e.line_breaks), (0, o.e$)(e, "start_chars_hint") && (n.START_CHARS_HINT = e.start_chars_hint), n; }(e); }
        var oe = re({ name: "EOF", pattern: Z.NA });
        function ie(e, t, n, r, o, i, a, s) { return { image: t, startOffset: n, endOffset: r, startLine: o, endLine: i, startColumn: a, endColumn: s, tokenTypeIdx: e.tokenTypeIdx, tokenType: e }; }
        function ae(e, t) { return q(e, t); }
        H([oe]);
        var se = function () { var e = function (t, n) { return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]); }, e(t, n); }; return function (t, n) { function r() { this.constructor = t; } e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r); }; }(), ce = function () { function e(e) { this._definition = e; } return Object.defineProperty(e.prototype, "definition", { get: function () { return this._definition; }, set: function (e) { this._definition = e; }, enumerable: !1, configurable: !0 }), e.prototype.accept = function (e) { e.visit(this), (0, o.Ed)(this.definition, (function (t) { t.accept(e); })); }, e; }(), ue = function (e) { function t(t) { var n = e.call(this, []) || this; return n.idx = 1, (0, o.f0)(n, (0, o.ei)(t, (function (e) { return void 0 !== e; }))), n; } return se(t, e), Object.defineProperty(t.prototype, "definition", { get: function () { return void 0 !== this.referencedRule ? this.referencedRule.definition : []; }, set: function (e) { }, enumerable: !1, configurable: !0 }), t.prototype.accept = function (e) { e.visit(this); }, t; }(ce), le = function (e) { function t(t) { var n = e.call(this, t.definition) || this; return n.orgText = "", (0, o.f0)(n, (0, o.ei)(t, (function (e) { return void 0 !== e; }))), n; } return se(t, e), t; }(ce), fe = function (e) { function t(t) { var n = e.call(this, t.definition) || this; return n.ignoreAmbiguities = !1, (0, o.f0)(n, (0, o.ei)(t, (function (e) { return void 0 !== e; }))), n; } return se(t, e), t; }(ce), pe = function (e) { function t(t) { var n = e.call(this, t.definition) || this; return n.idx = 1, (0, o.f0)(n, (0, o.ei)(t, (function (e) { return void 0 !== e; }))), n; } return se(t, e), t; }(ce), he = function (e) { function t(t) { var n = e.call(this, t.definition) || this; return n.idx = 1, (0, o.f0)(n, (0, o.ei)(t, (function (e) { return void 0 !== e; }))), n; } return se(t, e), t; }(ce), de = function (e) { function t(t) { var n = e.call(this, t.definition) || this; return n.idx = 1, (0, o.f0)(n, (0, o.ei)(t, (function (e) { return void 0 !== e; }))), n; } return se(t, e), t; }(ce), ye = function (e) { function t(t) { var n = e.call(this, t.definition) || this; return n.idx = 1, (0, o.f0)(n, (0, o.ei)(t, (function (e) { return void 0 !== e; }))), n; } return se(t, e), t; }(ce), ge = function (e) { function t(t) { var n = e.call(this, t.definition) || this; return n.idx = 1, (0, o.f0)(n, (0, o.ei)(t, (function (e) { return void 0 !== e; }))), n; } return se(t, e), t; }(ce), me = function (e) { function t(t) { var n = e.call(this, t.definition) || this; return n.idx = 1, n.ignoreAmbiguities = !1, n.hasPredicates = !1, (0, o.f0)(n, (0, o.ei)(t, (function (e) { return void 0 !== e; }))), n; } return se(t, e), Object.defineProperty(t.prototype, "definition", { get: function () { return this._definition; }, set: function (e) { this._definition = e; }, enumerable: !1, configurable: !0 }), t; }(ce), ve = function () { function e(e) { this.idx = 1, (0, o.f0)(this, (0, o.ei)(e, (function (e) { return void 0 !== e; }))); } return e.prototype.accept = function (e) { e.visit(this); }, e; }();
        function be(e) { return (0, o.UI)(e, Te); }
        function Te(e) { function t(e) { return (0, o.UI)(e, Te); } if (e instanceof ue)
            return { type: "NonTerminal", name: e.nonTerminalName, idx: e.idx }; if (e instanceof fe)
            return { type: "Alternative", definition: t(e.definition) }; if (e instanceof pe)
            return { type: "Option", idx: e.idx, definition: t(e.definition) }; if (e instanceof he)
            return { type: "RepetitionMandatory", idx: e.idx, definition: t(e.definition) }; if (e instanceof de)
            return { type: "RepetitionMandatoryWithSeparator", idx: e.idx, separator: Te(new ve({ terminalType: e.separator })), definition: t(e.definition) }; if (e instanceof ge)
            return { type: "RepetitionWithSeparator", idx: e.idx, separator: Te(new ve({ terminalType: e.separator })), definition: t(e.definition) }; if (e instanceof ye)
            return { type: "Repetition", idx: e.idx, definition: t(e.definition) }; if (e instanceof me)
            return { type: "Alternation", idx: e.idx, definition: t(e.definition) }; if (e instanceof ve) {
            var n = { type: "Terminal", name: e.terminalType.name, label: ee(e.terminalType), idx: e.idx }, r = e.terminalType.PATTERN;
            return e.terminalType.PATTERN && (n.pattern = (0, o.Kj)(r) ? r.source : r), n;
        } if (e instanceof le)
            return { type: "Rule", name: e.name, orgText: e.orgText, definition: t(e.definition) }; throw Error("non exhaustive match"); }
        var Ee = function () { function e() { } return e.prototype.walk = function (e, t) { var n = this; void 0 === t && (t = []), (0, o.Ed)(e.definition, (function (r, i) { var a = (0, o.Cw)(e.definition, i + 1); if (r instanceof ue)
            n.walkProdRef(r, a, t);
        else if (r instanceof ve)
            n.walkTerminal(r, a, t);
        else if (r instanceof fe)
            n.walkFlat(r, a, t);
        else if (r instanceof pe)
            n.walkOption(r, a, t);
        else if (r instanceof he)
            n.walkAtLeastOne(r, a, t);
        else if (r instanceof de)
            n.walkAtLeastOneSep(r, a, t);
        else if (r instanceof ge)
            n.walkManySep(r, a, t);
        else if (r instanceof ye)
            n.walkMany(r, a, t);
        else {
            if (!(r instanceof me))
                throw Error("non exhaustive match");
            n.walkOr(r, a, t);
        } })); }, e.prototype.walkTerminal = function (e, t, n) { }, e.prototype.walkProdRef = function (e, t, n) { }, e.prototype.walkFlat = function (e, t, n) { var r = t.concat(n); this.walk(e, r); }, e.prototype.walkOption = function (e, t, n) { var r = t.concat(n); this.walk(e, r); }, e.prototype.walkAtLeastOne = function (e, t, n) { var r = [new pe({ definition: e.definition })].concat(t, n); this.walk(e, r); }, e.prototype.walkAtLeastOneSep = function (e, t, n) { var r = _e(e, t, n); this.walk(e, r); }, e.prototype.walkMany = function (e, t, n) { var r = [new pe({ definition: e.definition })].concat(t, n); this.walk(e, r); }, e.prototype.walkManySep = function (e, t, n) { var r = _e(e, t, n); this.walk(e, r); }, e.prototype.walkOr = function (e, t, n) { var r = this, i = t.concat(n); (0, o.Ed)(e.definition, (function (e) { var t = new fe({ definition: [e] }); r.walk(t, i); })); }, e; }();
        function _e(e, t, n) { return [new pe({ definition: [new ve({ terminalType: e.separator })].concat(e.definition) })].concat(t, n); }
        var Re = function () { function e() { } return e.prototype.visit = function (e) { var t = e; switch (t.constructor) {
            case ue: return this.visitNonTerminal(t);
            case fe: return this.visitAlternative(t);
            case pe: return this.visitOption(t);
            case he: return this.visitRepetitionMandatory(t);
            case de: return this.visitRepetitionMandatoryWithSeparator(t);
            case ge: return this.visitRepetitionWithSeparator(t);
            case ye: return this.visitRepetition(t);
            case me: return this.visitAlternation(t);
            case ve: return this.visitTerminal(t);
            case le: return this.visitRule(t);
            default: throw Error("non exhaustive match");
        } }, e.prototype.visitNonTerminal = function (e) { }, e.prototype.visitAlternative = function (e) { }, e.prototype.visitOption = function (e) { }, e.prototype.visitRepetition = function (e) { }, e.prototype.visitRepetitionMandatory = function (e) { }, e.prototype.visitRepetitionMandatoryWithSeparator = function (e) { }, e.prototype.visitRepetitionWithSeparator = function (e) { }, e.prototype.visitAlternation = function (e) { }, e.prototype.visitTerminal = function (e) { }, e.prototype.visitRule = function (e) { }, e; }(), Se = function () { var e = function (t, n) { return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]); }, e(t, n); }; return function (t, n) { function r() { this.constructor = t; } e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r); }; }();
        function Oe(e, t) { return void 0 === t && (t = []), !!(e instanceof pe || e instanceof ye || e instanceof ge) || (e instanceof me ? (0, o.G)(e.definition, (function (e) { return Oe(e, t); })) : !(e instanceof ue && (0, o.r3)(t, e)) && e instanceof ce && (e instanceof ue && t.push(e), (0, o.yW)(e.definition, (function (e) { return Oe(e, t); })))); }
        function Ae(e) { if (e instanceof ue)
            return "SUBRULE"; if (e instanceof pe)
            return "OPTION"; if (e instanceof me)
            return "OR"; if (e instanceof he)
            return "AT_LEAST_ONE"; if (e instanceof de)
            return "AT_LEAST_ONE_SEP"; if (e instanceof ge)
            return "MANY_SEP"; if (e instanceof ye)
            return "MANY"; if (e instanceof ve)
            return "CONSUME"; throw Error("non exhaustive match"); }
        var Ne = function (e) { function t() { var t = null !== e && e.apply(this, arguments) || this; return t.separator = "-", t.dslMethods = { option: [], alternation: [], repetition: [], repetitionWithSeparator: [], repetitionMandatory: [], repetitionMandatoryWithSeparator: [] }, t; } return Se(t, e), t.prototype.reset = function () { this.dslMethods = { option: [], alternation: [], repetition: [], repetitionWithSeparator: [], repetitionMandatory: [], repetitionMandatoryWithSeparator: [] }; }, t.prototype.visitTerminal = function (e) { var t = e.terminalType.name + this.separator + "Terminal"; (0, o.e$)(this.dslMethods, t) || (this.dslMethods[t] = []), this.dslMethods[t].push(e); }, t.prototype.visitNonTerminal = function (e) { var t = e.nonTerminalName + this.separator + "Terminal"; (0, o.e$)(this.dslMethods, t) || (this.dslMethods[t] = []), this.dslMethods[t].push(e); }, t.prototype.visitOption = function (e) { this.dslMethods.option.push(e); }, t.prototype.visitRepetitionWithSeparator = function (e) { this.dslMethods.repetitionWithSeparator.push(e); }, t.prototype.visitRepetitionMandatory = function (e) { this.dslMethods.repetitionMandatory.push(e); }, t.prototype.visitRepetitionMandatoryWithSeparator = function (e) { this.dslMethods.repetitionMandatoryWithSeparator.push(e); }, t.prototype.visitRepetition = function (e) { this.dslMethods.repetition.push(e); }, t.prototype.visitAlternation = function (e) { this.dslMethods.alternation.push(e); }, t; }(Re), ke = new Ne;
        function we(e) { if (e instanceof ue)
            return we(e.referencedRule); if (e instanceof ve)
            return [e.terminalType]; if (function (e) { return e instanceof fe || e instanceof pe || e instanceof ye || e instanceof he || e instanceof de || e instanceof ge || e instanceof ve || e instanceof le; }(e))
            return function (e) { for (var t, n = [], r = e.definition, i = 0, a = r.length > i, s = !0; a && s;)
                s = Oe(t = r[i]), n = n.concat(we(t)), i += 1, a = r.length > i; return (0, o.jj)(n); }(e); if (function (e) { return e instanceof me; }(e))
            return function (e) { var t = (0, o.UI)(e.definition, (function (e) { return we(e); })); return (0, o.jj)((0, o.xH)(t)); }(e); throw Error("non exhaustive match"); }
        var xe = "_~IN~_", Ce = function () { var e = function (t, n) { return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]); }, e(t, n); }; return function (t, n) { function r() { this.constructor = t; } e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r); }; }(), Pe = function (e) { function t(t) { var n = e.call(this) || this; return n.topProd = t, n.follows = {}, n; } return Ce(t, e), t.prototype.startWalking = function () { return this.walk(this.topProd), this.follows; }, t.prototype.walkTerminal = function (e, t, n) { }, t.prototype.walkProdRef = function (e, t, n) { var r, o, i = (r = e.referencedRule, o = e.idx, r.name + o + xe + this.topProd.name), a = t.concat(n), s = we(new fe({ definition: a })); this.follows[i] = s; }, t; }(Ee), Ie = { buildMismatchTokenMessage: function (e) { var t = e.expected, n = e.actual; return e.previous, e.ruleName, "Expecting " + (ne(t) ? "--\x3e " + ee(t) + " <--" : "token of type --\x3e " + t.name + " <--") + " but found --\x3e '" + n.image + "' <--"; }, buildNotAllInputParsedMessage: function (e) { var t = e.firstRedundant; return e.ruleName, "Redundant input, expecting EOF but found: " + t.image; }, buildNoViableAltMessage: function (e) { var t = e.expectedPathsPerAlt, n = e.actual, r = (e.previous, e.customUserDescription), i = (e.ruleName, "Expecting: "), a = "\nbut found: '" + (0, o.Ps)(n).image + "'"; if (r)
                return i + r + a; var s = (0, o.u4)(t, (function (e, t) { return e.concat(t); }), []), c = (0, o.UI)(s, (function (e) { return "[" + (0, o.UI)(e, (function (e) { return ee(e); })).join(", ") + "]"; })); return i + "one of these possible Token sequences:\n" + (0, o.UI)(c, (function (e, t) { return "  " + (t + 1) + ". " + e; })).join("\n") + a; }, buildEarlyExitMessage: function (e) { var t = e.expectedIterationPaths, n = e.actual, r = e.customUserDescription, i = (e.ruleName, "Expecting: "), a = "\nbut found: '" + (0, o.Ps)(n).image + "'"; return r ? i + r + a : i + "expecting at least one iteration which starts with one of these possible Token sequences::\n  <" + (0, o.UI)(t, (function (e) { return "[" + (0, o.UI)(e, (function (e) { return ee(e); })).join(",") + "]"; })).join(" ,") + ">" + a; } };
        Object.freeze(Ie);
        var De = { buildRuleNotFoundError: function (e, t) { return "Invalid grammar, reference to a rule which is not defined: ->" + t.nonTerminalName + "<-\ninside top level rule: ->" + e.name + "<-"; } }, Le = { buildDuplicateFoundError: function (e, t) { var n, r = e.name, i = (0, o.Ps)(t), a = i.idx, s = Ae(i), c = (n = i) instanceof ve ? n.terminalType.name : n instanceof ue ? n.nonTerminalName : "", u = "->" + s + (a > 0 ? a : "") + "<- " + (c ? "with argument: ->" + c + "<-" : "") + "\n                  appears more than once (" + t.length + " times) in the top level rule: ->" + r + "<-.                  \n                  For further details see: https://sap.github.io/chevrotain/docs/FAQ.html#NUMERICAL_SUFFIXES \n                  "; return (u = u.replace(/[ \t]+/g, " ")).replace(/\s\s+/g, "\n"); }, buildNamespaceConflictError: function (e) { return "Namespace conflict found in grammar.\nThe grammar has both a Terminal(Token) and a Non-Terminal(Rule) named: <" + e.name + ">.\nTo resolve this make sure each Terminal and Non-Terminal names are unique\nThis is easy to accomplish by using the convention that Terminal names start with an uppercase letter\nand Non-Terminal names start with a lower case letter."; }, buildAlternationPrefixAmbiguityError: function (e) { var t = (0, o.UI)(e.prefixPath, (function (e) { return ee(e); })).join(", "), n = 0 === e.alternation.idx ? "" : e.alternation.idx; return "Ambiguous alternatives: <" + e.ambiguityIndices.join(" ,") + "> due to common lookahead prefix\nin <OR" + n + "> inside <" + e.topLevelRule.name + "> Rule,\n<" + t + "> may appears as a prefix path in all these alternatives.\nSee: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#COMMON_PREFIX\nFor Further details."; }, buildAlternationAmbiguityError: function (e) { var t = (0, o.UI)(e.prefixPath, (function (e) { return ee(e); })).join(", "), n = 0 === e.alternation.idx ? "" : e.alternation.idx; return "Ambiguous Alternatives Detected: <" + e.ambiguityIndices.join(" ,") + "> in <OR" + n + "> inside <" + e.topLevelRule.name + "> Rule,\n<" + t + "> may appears as a prefix path in all these alternatives.\n" + "See: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#AMBIGUOUS_ALTERNATIVES\nFor Further details."; }, buildEmptyRepetitionError: function (e) { var t = Ae(e.repetition); return 0 !== e.repetition.idx && (t += e.repetition.idx), "The repetition <" + t + "> within Rule <" + e.topLevelRule.name + "> can never consume any tokens.\nThis could lead to an infinite loop."; }, buildTokenNameError: function (e) { return "deprecated"; }, buildEmptyAlternationError: function (e) { return "Ambiguous empty alternative: <" + (e.emptyChoiceIdx + 1) + "> in <OR" + e.alternation.idx + "> inside <" + e.topLevelRule.name + "> Rule.\nOnly the last alternative may be an empty alternative."; }, buildTooManyAlternativesError: function (e) { return "An Alternation cannot have more than 256 alternatives:\n<OR" + e.alternation.idx + "> inside <" + e.topLevelRule.name + "> Rule.\n has " + (e.alternation.definition.length + 1) + " alternatives."; }, buildLeftRecursionError: function (e) { var t = e.topLevelRule.name; return "Left Recursion found in grammar.\nrule: <" + t + "> can be invoked from itself (directly or indirectly)\nwithout consuming any Tokens. The grammar path that causes this is: \n " + t + " --\x3e " + o.UI(e.leftRecursionPath, (function (e) { return e.name; })).concat([t]).join(" --\x3e ") + "\n To fix this refactor your grammar to remove the left recursion.\nsee: https://en.wikipedia.org/wiki/LL_parser#Left_Factoring."; }, buildInvalidRuleNameError: function (e) { return "deprecated"; }, buildDuplicateRuleNameError: function (e) { return "Duplicate definition, rule: ->" + (e.topLevelRule instanceof le ? e.topLevelRule.name : e.topLevelRule) + "<- is already defined in the grammar: ->" + e.grammarName + "<-"; } }, Me = function () { var e = function (t, n) { return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]); }, e(t, n); }; return function (t, n) { function r() { this.constructor = t; } e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r); }; }(), je = function (e) { function t(t, n) { var r = e.call(this) || this; return r.nameToTopRule = t, r.errMsgProvider = n, r.errors = [], r; } return Me(t, e), t.prototype.resolveRefs = function () { var e = this; (0, o.Ed)((0, o.VO)(this.nameToTopRule), (function (t) { e.currTopLevel = t, t.accept(e); })); }, t.prototype.visitNonTerminal = function (e) { var t = this.nameToTopRule[e.nonTerminalName]; if (t)
            e.referencedRule = t;
        else {
            var n = this.errMsgProvider.buildRuleNotFoundError(this.currTopLevel, e);
            this.errors.push({ message: n, type: yn.UNRESOLVED_SUBRULE_REF, ruleName: this.currTopLevel.name, unresolvedRefName: e.nonTerminalName });
        } }, t; }(Re), Ue = function () { var e = function (t, n) { return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]); }, e(t, n); }; return function (t, n) { function r() { this.constructor = t; } e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r); }; }(), Fe = function (e) { function t(t, n) { var r = e.call(this, t, n) || this; return r.path = n, r.nextTerminalName = "", r.nextTerminalOccurrence = 0, r.nextTerminalName = r.path.lastTok.name, r.nextTerminalOccurrence = r.path.lastTokOccurrence, r; } return Ue(t, e), t.prototype.walkTerminal = function (e, t, n) { if (this.isAtEndOfPath && e.terminalType.name === this.nextTerminalName && e.idx === this.nextTerminalOccurrence && !this.found) {
            var r = t.concat(n), o = new fe({ definition: r });
            this.possibleTokTypes = we(o), this.found = !0;
        } }, t; }(function (e) { function t(t, n) { var r = e.call(this) || this; return r.topProd = t, r.path = n, r.possibleTokTypes = [], r.nextProductionName = "", r.nextProductionOccurrence = 0, r.found = !1, r.isAtEndOfPath = !1, r; } return Ue(t, e), t.prototype.startWalking = function () { if (this.found = !1, this.path.ruleStack[0] !== this.topProd.name)
            throw Error("The path does not start with the walker's top Rule!"); return this.ruleStack = (0, o.Qw)(this.path.ruleStack).reverse(), this.occurrenceStack = (0, o.Qw)(this.path.occurrenceStack).reverse(), this.ruleStack.pop(), this.occurrenceStack.pop(), this.updateExpectedNext(), this.walk(this.topProd), this.possibleTokTypes; }, t.prototype.walk = function (t, n) { void 0 === n && (n = []), this.found || e.prototype.walk.call(this, t, n); }, t.prototype.walkProdRef = function (e, t, n) { if (e.referencedRule.name === this.nextProductionName && e.idx === this.nextProductionOccurrence) {
            var r = t.concat(n);
            this.updateExpectedNext(), this.walk(e.referencedRule, r);
        } }, t.prototype.updateExpectedNext = function () { (0, o.xb)(this.ruleStack) ? (this.nextProductionName = "", this.nextProductionOccurrence = 0, this.isAtEndOfPath = !0) : (this.nextProductionName = this.ruleStack.pop(), this.nextProductionOccurrence = this.occurrenceStack.pop()); }, t; }(Ee)), qe = function (e) { function t(t, n) { var r = e.call(this) || this; return r.topRule = t, r.occurrence = n, r.result = { token: void 0, occurrence: void 0, isEndOfRule: void 0 }, r; } return Ue(t, e), t.prototype.startWalking = function () { return this.walk(this.topRule), this.result; }, t; }(Ee), We = function (e) { function t() { return null !== e && e.apply(this, arguments) || this; } return Ue(t, e), t.prototype.walkMany = function (t, n, r) { if (t.idx === this.occurrence) {
            var i = (0, o.Ps)(n.concat(r));
            this.result.isEndOfRule = void 0 === i, i instanceof ve && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
        }
        else
            e.prototype.walkMany.call(this, t, n, r); }, t; }(qe), Be = function (e) { function t() { return null !== e && e.apply(this, arguments) || this; } return Ue(t, e), t.prototype.walkManySep = function (t, n, r) { if (t.idx === this.occurrence) {
            var i = (0, o.Ps)(n.concat(r));
            this.result.isEndOfRule = void 0 === i, i instanceof ve && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
        }
        else
            e.prototype.walkManySep.call(this, t, n, r); }, t; }(qe), $e = function (e) { function t() { return null !== e && e.apply(this, arguments) || this; } return Ue(t, e), t.prototype.walkAtLeastOne = function (t, n, r) { if (t.idx === this.occurrence) {
            var i = (0, o.Ps)(n.concat(r));
            this.result.isEndOfRule = void 0 === i, i instanceof ve && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
        }
        else
            e.prototype.walkAtLeastOne.call(this, t, n, r); }, t; }(qe), He = function (e) { function t() { return null !== e && e.apply(this, arguments) || this; } return Ue(t, e), t.prototype.walkAtLeastOneSep = function (t, n, r) { if (t.idx === this.occurrence) {
            var i = (0, o.Ps)(n.concat(r));
            this.result.isEndOfRule = void 0 === i, i instanceof ve && (this.result.token = i.terminalType, this.result.occurrence = i.idx);
        }
        else
            e.prototype.walkAtLeastOneSep.call(this, t, n, r); }, t; }(qe);
        function Ve(e, t, n) { void 0 === n && (n = []), n = (0, o.Qw)(n); var r = [], i = 0; function a(a) { var s = Ve(a.concat((0, o.Cw)(e, i + 1)), t, n); return r.concat(s); } for (; n.length < t && i < e.length;) {
            var s = e[i];
            if (s instanceof fe)
                return a(s.definition);
            if (s instanceof ue)
                return a(s.definition);
            if (s instanceof pe)
                r = a(s.definition);
            else {
                if (s instanceof he)
                    return a(c = s.definition.concat([new ye({ definition: s.definition })]));
                if (s instanceof de)
                    return a(c = [new fe({ definition: s.definition }), new ye({ definition: [new ve({ terminalType: s.separator })].concat(s.definition) })]);
                if (s instanceof ge) {
                    var c = s.definition.concat([new ye({ definition: [new ve({ terminalType: s.separator })].concat(s.definition) })]);
                    r = a(c);
                }
                else if (s instanceof ye)
                    c = s.definition.concat([new ye({ definition: s.definition })]), r = a(c);
                else {
                    if (s instanceof me)
                        return (0, o.Ed)(s.definition, (function (e) { !1 === (0, o.xb)(e.definition) && (r = a(e.definition)); })), r;
                    if (!(s instanceof ve))
                        throw Error("non exhaustive match");
                    n.push(s.terminalType);
                }
            }
            i++;
        } return r.push({ partialPath: n, suffixDef: (0, o.Cw)(e, i) }), r; }
        function Ke(e, t, n, r) { var i = "EXIT_NONE_TERMINAL", a = [i], s = "EXIT_ALTERNATIVE", c = !1, u = t.length, l = u - r - 1, f = [], p = []; for (p.push({ idx: -1, def: e, ruleStack: [], occurrenceStack: [] }); !(0, o.xb)(p);) {
            var h = p.pop();
            if (h !== s) {
                var d = h.def, y = h.idx, g = h.ruleStack, m = h.occurrenceStack;
                if (!(0, o.xb)(d)) {
                    var v = d[0];
                    if (v === i) {
                        var b = { idx: y, def: (0, o.Cw)(d), ruleStack: (0, o.j7)(g), occurrenceStack: (0, o.j7)(m) };
                        p.push(b);
                    }
                    else if (v instanceof ve)
                        if (y < u - 1) {
                            var T = y + 1;
                            n(t[T], v.terminalType) && (b = { idx: T, def: (0, o.Cw)(d), ruleStack: g, occurrenceStack: m }, p.push(b));
                        }
                        else {
                            if (y !== u - 1)
                                throw Error("non exhaustive match");
                            f.push({ nextTokenType: v.terminalType, nextTokenOccurrence: v.idx, ruleStack: g, occurrenceStack: m }), c = !0;
                        }
                    else if (v instanceof ue) {
                        var E = (0, o.Qw)(g);
                        E.push(v.nonTerminalName);
                        var _ = (0, o.Qw)(m);
                        _.push(v.idx), b = { idx: y, def: v.definition.concat(a, (0, o.Cw)(d)), ruleStack: E, occurrenceStack: _ }, p.push(b);
                    }
                    else if (v instanceof pe) {
                        var R = { idx: y, def: (0, o.Cw)(d), ruleStack: g, occurrenceStack: m };
                        p.push(R), p.push(s);
                        var S = { idx: y, def: v.definition.concat((0, o.Cw)(d)), ruleStack: g, occurrenceStack: m };
                        p.push(S);
                    }
                    else if (v instanceof he) {
                        var O = new ye({ definition: v.definition, idx: v.idx });
                        b = { idx: y, def: v.definition.concat([O], (0, o.Cw)(d)), ruleStack: g, occurrenceStack: m }, p.push(b);
                    }
                    else if (v instanceof de) {
                        var A = new ve({ terminalType: v.separator });
                        O = new ye({ definition: [A].concat(v.definition), idx: v.idx }), b = { idx: y, def: v.definition.concat([O], (0, o.Cw)(d)), ruleStack: g, occurrenceStack: m }, p.push(b);
                    }
                    else if (v instanceof ge) {
                        R = { idx: y, def: (0, o.Cw)(d), ruleStack: g, occurrenceStack: m }, p.push(R), p.push(s), A = new ve({ terminalType: v.separator });
                        var N = new ye({ definition: [A].concat(v.definition), idx: v.idx });
                        S = { idx: y, def: v.definition.concat([N], (0, o.Cw)(d)), ruleStack: g, occurrenceStack: m }, p.push(S);
                    }
                    else if (v instanceof ye)
                        R = { idx: y, def: (0, o.Cw)(d), ruleStack: g, occurrenceStack: m }, p.push(R), p.push(s), N = new ye({ definition: v.definition, idx: v.idx }), S = { idx: y, def: v.definition.concat([N], (0, o.Cw)(d)), ruleStack: g, occurrenceStack: m }, p.push(S);
                    else if (v instanceof me)
                        for (var k = v.definition.length - 1; k >= 0; k--) {
                            var w = { idx: y, def: v.definition[k].definition.concat((0, o.Cw)(d)), ruleStack: g, occurrenceStack: m };
                            p.push(w), p.push(s);
                        }
                    else if (v instanceof fe)
                        p.push({ idx: y, def: v.definition.concat((0, o.Cw)(d)), ruleStack: g, occurrenceStack: m });
                    else {
                        if (!(v instanceof le))
                            throw Error("non exhaustive match");
                        p.push(Ge(v, y, g, m));
                    }
                }
            }
            else
                c && (0, o.Z$)(p).idx <= l && p.pop();
        } return f; }
        function Ge(e, t, n, r) { var i = (0, o.Qw)(n); i.push(e.name); var a = (0, o.Qw)(r); return a.push(1), { idx: t, def: e.definition, ruleStack: i, occurrenceStack: a }; }
        var ze, Xe = function () { var e = function (t, n) { return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]); }, e(t, n); }; return function (t, n) { function r() { this.constructor = t; } e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r); }; }();
        !function (e) { e[e.OPTION = 0] = "OPTION", e[e.REPETITION = 1] = "REPETITION", e[e.REPETITION_MANDATORY = 2] = "REPETITION_MANDATORY", e[e.REPETITION_MANDATORY_WITH_SEPARATOR = 3] = "REPETITION_MANDATORY_WITH_SEPARATOR", e[e.REPETITION_WITH_SEPARATOR = 4] = "REPETITION_WITH_SEPARATOR", e[e.ALTERNATION = 5] = "ALTERNATION"; }(ze || (ze = {}));
        var Ye = function (e) { function t(t, n, r) { var o = e.call(this) || this; return o.topProd = t, o.targetOccurrence = n, o.targetProdType = r, o; } return Xe(t, e), t.prototype.startWalking = function () { return this.walk(this.topProd), this.restDef; }, t.prototype.checkIsTarget = function (e, t, n, r) { return e.idx === this.targetOccurrence && this.targetProdType === t && (this.restDef = n.concat(r), !0); }, t.prototype.walkOption = function (t, n, r) { this.checkIsTarget(t, ze.OPTION, n, r) || e.prototype.walkOption.call(this, t, n, r); }, t.prototype.walkAtLeastOne = function (t, n, r) { this.checkIsTarget(t, ze.REPETITION_MANDATORY, n, r) || e.prototype.walkOption.call(this, t, n, r); }, t.prototype.walkAtLeastOneSep = function (t, n, r) { this.checkIsTarget(t, ze.REPETITION_MANDATORY_WITH_SEPARATOR, n, r) || e.prototype.walkOption.call(this, t, n, r); }, t.prototype.walkMany = function (t, n, r) { this.checkIsTarget(t, ze.REPETITION, n, r) || e.prototype.walkOption.call(this, t, n, r); }, t.prototype.walkManySep = function (t, n, r) { this.checkIsTarget(t, ze.REPETITION_WITH_SEPARATOR, n, r) || e.prototype.walkOption.call(this, t, n, r); }, t; }(Ee), Je = function (e) { function t(t, n, r) { var o = e.call(this) || this; return o.targetOccurrence = t, o.targetProdType = n, o.targetRef = r, o.result = [], o; } return Xe(t, e), t.prototype.checkIsTarget = function (e, t) { e.idx !== this.targetOccurrence || this.targetProdType !== t || void 0 !== this.targetRef && e !== this.targetRef || (this.result = e.definition); }, t.prototype.visitOption = function (e) { this.checkIsTarget(e, ze.OPTION); }, t.prototype.visitRepetition = function (e) { this.checkIsTarget(e, ze.REPETITION); }, t.prototype.visitRepetitionMandatory = function (e) { this.checkIsTarget(e, ze.REPETITION_MANDATORY); }, t.prototype.visitRepetitionMandatoryWithSeparator = function (e) { this.checkIsTarget(e, ze.REPETITION_MANDATORY_WITH_SEPARATOR); }, t.prototype.visitRepetitionWithSeparator = function (e) { this.checkIsTarget(e, ze.REPETITION_WITH_SEPARATOR); }, t.prototype.visitAlternation = function (e) { this.checkIsTarget(e, ze.ALTERNATION); }, t; }(Re);
        function Qe(e) { for (var t = new Array(e), n = 0; n < e; n++)
            t[n] = []; return t; }
        function Ze(e) { for (var t = [""], n = 0; n < e.length; n++) {
            for (var r = e[n], o = [], i = 0; i < t.length; i++) {
                var a = t[i];
                o.push(a + "_" + r.tokenTypeIdx);
                for (var s = 0; s < r.categoryMatches.length; s++) {
                    var c = "_" + r.categoryMatches[s];
                    o.push(a + c);
                }
            }
            t = o;
        } return t; }
        function et(e, t, n) { for (var r = 0; r < e.length; r++)
            if (r !== n)
                for (var o = e[r], i = 0; i < t.length; i++)
                    if (!0 === o[t[i]])
                        return !1; return !0; }
        function tt(e, t) { for (var n = (0, o.UI)(e, (function (e) { return Ve([e], 1); })), r = Qe(n.length), i = (0, o.UI)(n, (function (e) { var t = {}; return (0, o.Ed)(e, (function (e) { var n = Ze(e.partialPath); (0, o.Ed)(n, (function (e) { t[e] = !0; })); })), t; })), a = n, s = 1; s <= t; s++) {
            var c = a;
            a = Qe(c.length);
            for (var u = function (e) { for (var n = c[e], u = 0; u < n.length; u++) {
                var l = n[u].partialPath, f = n[u].suffixDef, p = Ze(l);
                if (et(i, p, e) || (0, o.xb)(f) || l.length === t) {
                    var h = r[e];
                    if (!1 === ot(h, l)) {
                        h.push(l);
                        for (var d = 0; d < p.length; d++) {
                            var y = p[d];
                            i[e][y] = !0;
                        }
                    }
                }
                else {
                    var g = Ve(f, s + 1, l);
                    a[e] = a[e].concat(g), (0, o.Ed)(g, (function (t) { var n = Ze(t.partialPath); (0, o.Ed)(n, (function (t) { i[e][t] = !0; })); }));
                }
            } }, l = 0; l < c.length; l++)
                u(l);
        } return r; }
        function nt(e, t, n, r) { var o = new Je(e, ze.ALTERNATION, r); return t.accept(o), tt(o.result, n); }
        function rt(e, t, n, r) { var o = new Je(e, n); t.accept(o); var i = o.result, a = new Ye(t, e, n).startWalking(); return tt([new fe({ definition: i }), new fe({ definition: a })], r); }
        function ot(e, t) { e: for (var n = 0; n < e.length; n++) {
            var r = e[n];
            if (r.length === t.length) {
                for (var o = 0; o < r.length; o++) {
                    var i = t[o], a = r[o];
                    if (!1 == (i === a || void 0 !== a.categoryMatchesMap[i.tokenTypeIdx]))
                        continue e;
                }
                return !0;
            }
        } return !1; }
        function it(e) { return (0, o.yW)(e, (function (e) { return (0, o.yW)(e, (function (e) { return (0, o.yW)(e, (function (e) { return (0, o.xb)(e.categoryMatches); })); })); })); }
        var at = function () { var e = function (t, n) { return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]); }, e(t, n); }; return function (t, n) { function r() { this.constructor = t; } e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r); }; }();
        function st(e, t, n, r, i) { var a = o.UI(e, (function (e) { return function (e, t) { var n = new lt; e.accept(n); var r = n.allProductions, i = o.vM(r, ct), a = o.ei(i, (function (e) { return e.length > 1; })); return o.UI(o.VO(a), (function (n) { var r = o.Ps(n), i = t.buildDuplicateFoundError(e, n), a = Ae(r), s = { message: i, type: yn.DUPLICATE_PRODUCTIONS, ruleName: e.name, dslName: a, occurrence: r.idx }, c = ut(r); return c && (s.parameter = c), s; })); }(e, r); })), s = o.UI(e, (function (e) { return ft(e, e, r); })), c = [], u = [], l = []; (0, o.yW)(s, o.xb) && (c = (0, o.UI)(e, (function (e) { return function (e, t) { var n = new ht; e.accept(n); var r = n.alternations; return o.u4(r, (function (n, r) { var i = o.j7(r.definition), a = o.UI(i, (function (n, i) { var a = Ke([n], [], null, 1); return o.xb(a) ? { message: t.buildEmptyAlternationError({ topLevelRule: e, alternation: r, emptyChoiceIdx: i }), type: yn.NONE_LAST_EMPTY_ALT, ruleName: e.name, occurrence: r.idx, alternative: i + 1 } : null; })); return n.concat(o.oA(a)); }), []); }(e, r); })), u = (0, o.UI)(e, (function (e) { return function (e, t, n) { var r = new ht; e.accept(r); var i = r.alternations; return i = (0, o.d1)(i, (function (e) { return !0 === e.ignoreAmbiguities; })), o.u4(i, (function (r, i) { var a = i.idx, s = i.maxLookahead || t, c = nt(a, e, s, i), u = function (e, t, n, r) { var i = [], a = (0, o.u4)(e, (function (n, r, a) { return !0 === t.definition[a].ignoreAmbiguities || (0, o.Ed)(r, (function (r) { var s = [a]; (0, o.Ed)(e, (function (e, n) { a !== n && ot(e, r) && !0 !== t.definition[n].ignoreAmbiguities && s.push(n); })), s.length > 1 && !ot(i, r) && (i.push(r), n.push({ alts: s, path: r })); })), n; }), []); return o.UI(a, (function (e) { var i = (0, o.UI)(e.alts, (function (e) { return e + 1; })); return { message: r.buildAlternationAmbiguityError({ topLevelRule: n, alternation: t, ambiguityIndices: i, prefixPath: e.path }), type: yn.AMBIGUOUS_ALTS, ruleName: n.name, occurrence: t.idx, alternatives: [e.alts] }; })); }(c, i, e, n), l = function (e, t, n, r) { var i = [], a = (0, o.u4)(e, (function (e, t, n) { var r = (0, o.UI)(t, (function (e) { return { idx: n, path: e }; })); return e.concat(r); }), []); return (0, o.Ed)(a, (function (e) { if (!0 !== t.definition[e.idx].ignoreAmbiguities) {
            var s = e.idx, c = e.path, u = (0, o.Oq)(a, (function (e) { return !0 !== t.definition[e.idx].ignoreAmbiguities && e.idx < s && (n = e.path, r = c, n.length < r.length && (0, o.yW)(n, (function (e, t) { var n = r[t]; return e === n || n.categoryMatchesMap[e.tokenTypeIdx]; }))); var n, r; })), l = (0, o.UI)(u, (function (e) { var o = [e.idx + 1, s + 1], i = 0 === t.idx ? "" : t.idx; return { message: r.buildAlternationPrefixAmbiguityError({ topLevelRule: n, alternation: t, ambiguityIndices: o, prefixPath: e.path }), type: yn.AMBIGUOUS_PREFIX_ALTS, ruleName: n.name, occurrence: i, alternatives: o }; }));
            i = i.concat(l);
        } })), i; }(c, i, e, n); return r.concat(u, l); }), []); }(e, t, r); })), l = function (e, t, n) { var r = []; return (0, o.Ed)(e, (function (e) { var i = new dt; e.accept(i); var a = i.allProductions; (0, o.Ed)(a, (function (i) { var a = function (e) { if (e instanceof pe)
            return ze.OPTION; if (e instanceof ye)
            return ze.REPETITION; if (e instanceof he)
            return ze.REPETITION_MANDATORY; if (e instanceof de)
            return ze.REPETITION_MANDATORY_WITH_SEPARATOR; if (e instanceof ge)
            return ze.REPETITION_WITH_SEPARATOR; if (e instanceof me)
            return ze.ALTERNATION; throw Error("non exhaustive match"); }(i), s = i.maxLookahead || t, c = rt(i.idx, e, a, s)[0]; if ((0, o.xb)((0, o.xH)(c))) {
            var u = n.buildEmptyRepetitionError({ topLevelRule: e, repetition: i });
            r.push({ message: u, type: yn.NO_NON_EMPTY_LOOKAHEAD, ruleName: e.name });
        } })); })), r; }(e, t, r)); var f = function (e, t, n) { var r = [], i = (0, o.UI)(t, (function (e) { return e.name; })); return (0, o.Ed)(e, (function (e) { var t = e.name; if ((0, o.r3)(i, t)) {
            var a = n.buildNamespaceConflictError(e);
            r.push({ message: a, type: yn.CONFLICT_TOKENS_RULES_NAMESPACE, ruleName: t });
        } })), r; }(e, n, r), p = (0, o.UI)(e, (function (e) { return function (e, t) { var n = new ht; e.accept(n); var r = n.alternations; return o.u4(r, (function (n, r) { return r.definition.length > 255 && n.push({ message: t.buildTooManyAlternativesError({ topLevelRule: e, alternation: r }), type: yn.TOO_MANY_ALTS, ruleName: e.name, occurrence: r.idx }), n; }), []); }(e, r); })), h = (0, o.UI)(e, (function (t) { return function (e, t, n, r) { var i = [], a = (0, o.u4)(t, (function (t, n) { return n.name === e.name ? t + 1 : t; }), 0); if (a > 1) {
            var s = r.buildDuplicateRuleNameError({ topLevelRule: e, grammarName: n });
            i.push({ message: s, type: yn.DUPLICATE_RULE_NAME, ruleName: e.name });
        } return i; }(t, e, i, r); })); return o.xH(a.concat(l, s, c, u, f, p, h)); }
        function ct(e) { return Ae(e) + "_#_" + e.idx + "_#_" + ut(e); }
        function ut(e) { return e instanceof ve ? e.terminalType.name : e instanceof ue ? e.nonTerminalName : ""; }
        var lt = function (e) { function t() { var t = null !== e && e.apply(this, arguments) || this; return t.allProductions = [], t; } return at(t, e), t.prototype.visitNonTerminal = function (e) { this.allProductions.push(e); }, t.prototype.visitOption = function (e) { this.allProductions.push(e); }, t.prototype.visitRepetitionWithSeparator = function (e) { this.allProductions.push(e); }, t.prototype.visitRepetitionMandatory = function (e) { this.allProductions.push(e); }, t.prototype.visitRepetitionMandatoryWithSeparator = function (e) { this.allProductions.push(e); }, t.prototype.visitRepetition = function (e) { this.allProductions.push(e); }, t.prototype.visitAlternation = function (e) { this.allProductions.push(e); }, t.prototype.visitTerminal = function (e) { this.allProductions.push(e); }, t; }(Re);
        function ft(e, t, n, r) { void 0 === r && (r = []); var i = [], a = pt(t.definition); if (o.xb(a))
            return []; var s = e.name; o.r3(a, e) && i.push({ message: n.buildLeftRecursionError({ topLevelRule: e, leftRecursionPath: r }), type: yn.LEFT_RECURSION, ruleName: s }); var c = o.e5(a, r.concat([e])), u = o.UI(c, (function (t) { var i = o.Qw(r); return i.push(t), ft(e, t, n, i); })); return i.concat(o.xH(u)); }
        function pt(e) { var t = []; if (o.xb(e))
            return t; var n = o.Ps(e); if (n instanceof ue)
            t.push(n.referencedRule);
        else if (n instanceof fe || n instanceof pe || n instanceof he || n instanceof de || n instanceof ge || n instanceof ye)
            t = t.concat(pt(n.definition));
        else if (n instanceof me)
            t = o.xH(o.UI(n.definition, (function (e) { return pt(e.definition); })));
        else if (!(n instanceof ve))
            throw Error("non exhaustive match"); var r = Oe(n), i = e.length > 1; if (r && i) {
            var a = o.Cw(e);
            return t.concat(pt(a));
        } return t; }
        var ht = function (e) { function t() { var t = null !== e && e.apply(this, arguments) || this; return t.alternations = [], t; } return at(t, e), t.prototype.visitAlternation = function (e) { this.alternations.push(e); }, t; }(Re), dt = function (e) { function t() { var t = null !== e && e.apply(this, arguments) || this; return t.allProductions = [], t; } return at(t, e), t.prototype.visitRepetitionWithSeparator = function (e) { this.allProductions.push(e); }, t.prototype.visitRepetitionMandatory = function (e) { this.allProductions.push(e); }, t.prototype.visitRepetitionMandatoryWithSeparator = function (e) { this.allProductions.push(e); }, t.prototype.visitRepetition = function (e) { this.allProductions.push(e); }, t; }(Re);
        function yt(e) { e = (0, o.ce)(e, { errMsgProvider: De }); var t, n, r, i = {}; return (0, o.Ed)(e.rules, (function (e) { i[e.name] = e; })), t = i, n = e.errMsgProvider, (r = new je(t, n)).resolveRefs(), r.errors; }
        function gt(e) { return st((e = (0, o.ce)(e, { errMsgProvider: Le })).rules, e.maxLookahead, e.tokenTypes, e.errMsgProvider, e.grammarName); }
        function mt(e) { (0, o.Ed)(e.rules, (function (e) { var t = new Ne; e.accept(t), (0, o.Ed)(t.dslMethods, (function (e) { (0, o.Ed)(e, (function (e, t) { e.idx = t + 1; })); })); })); }
        var vt = function () { var e = function (t, n) { return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]); }, e(t, n); }; return function (t, n) { function r() { this.constructor = t; } e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r); }; }(), bt = "MismatchedTokenException", Tt = "NoViableAltException", Et = "EarlyExitException", _t = "NotAllInputParsedException", Rt = [bt, Tt, Et, _t];
        function St(e) { return (0, o.r3)(Rt, e.name); }
        Object.freeze(Rt);
        var Ot = function (e) { function t(t, n) { var r = this.constructor, o = e.call(this, t) || this; return o.token = n, o.resyncedTokens = [], Object.setPrototypeOf(o, r.prototype), Error.captureStackTrace && Error.captureStackTrace(o, o.constructor), o; } return vt(t, e), t; }(Error), At = function (e) { function t(t, n, r) { var o = e.call(this, t, n) || this; return o.previousToken = r, o.name = bt, o; } return vt(t, e), t; }(Ot), Nt = function (e) { function t(t, n, r) { var o = e.call(this, t, n) || this; return o.previousToken = r, o.name = Tt, o; } return vt(t, e), t; }(Ot), kt = function (e) { function t(t, n) { var r = e.call(this, t, n) || this; return r.name = _t, r; } return vt(t, e), t; }(Ot), wt = function (e) { function t(t, n, r) { var o = e.call(this, t, n) || this; return o.previousToken = r, o.name = Et, o; } return vt(t, e), t; }(Ot), xt = {}, Ct = "InRuleRecoveryException";
        function Pt(e) { this.name = Ct, this.message = e; }
        Pt.prototype = Error.prototype;
        var It = function () { function e() { } return e.prototype.initRecoverable = function (e) { this.firstAfterRepMap = {}, this.resyncFollows = {}, this.recoveryEnabled = (0, o.e$)(e, "recoveryEnabled") ? e.recoveryEnabled : gn.recoveryEnabled, this.recoveryEnabled && (this.attemptInRepetitionRecovery = Dt); }, e.prototype.getTokenToInsert = function (e) { var t = ie(e, "", NaN, NaN, NaN, NaN, NaN, NaN); return t.isInsertedInRecovery = !0, t; }, e.prototype.canTokenTypeBeInsertedInRecovery = function (e) { return !0; }, e.prototype.tryInRepetitionRecovery = function (e, t, n, r) { for (var i = this, a = this.findReSyncTokenType(), s = this.exportLexerState(), c = [], u = !1, l = this.LA(1), f = this.LA(1), p = function () { var e = i.LA(0), t = i.errorMessageProvider.buildMismatchTokenMessage({ expected: r, actual: l, previous: e, ruleName: i.getCurrRuleFullName() }), n = new At(t, l, i.LA(0)); n.resyncedTokens = (0, o.j7)(c), i.SAVE_ERROR(n); }; !u;) {
            if (this.tokenMatcher(f, r))
                return void p();
            if (n.call(this))
                return p(), void e.apply(this, t);
            this.tokenMatcher(f, a) ? u = !0 : (f = this.SKIP_TOKEN(), this.addToResyncTokens(f, c));
        } this.importLexerState(s); }, e.prototype.shouldInRepetitionRecoveryBeTried = function (e, t, n) { return !1 !== n && void 0 !== e && void 0 !== t && !this.tokenMatcher(this.LA(1), e) && !this.isBackTracking() && !this.canPerformInRuleRecovery(e, this.getFollowsForInRuleRecovery(e, t)); }, e.prototype.getFollowsForInRuleRecovery = function (e, t) { var n = this.getCurrentGrammarPath(e, t); return this.getNextPossibleTokenTypes(n); }, e.prototype.tryInRuleRecovery = function (e, t) { if (this.canRecoverWithSingleTokenInsertion(e, t))
            return this.getTokenToInsert(e); if (this.canRecoverWithSingleTokenDeletion(e)) {
            var n = this.SKIP_TOKEN();
            return this.consumeToken(), n;
        } throw new Pt("sad sad panda"); }, e.prototype.canPerformInRuleRecovery = function (e, t) { return this.canRecoverWithSingleTokenInsertion(e, t) || this.canRecoverWithSingleTokenDeletion(e); }, e.prototype.canRecoverWithSingleTokenInsertion = function (e, t) { var n = this; if (!this.canTokenTypeBeInsertedInRecovery(e))
            return !1; if ((0, o.xb)(t))
            return !1; var r = this.LA(1); return void 0 !== (0, o.sE)(t, (function (e) { return n.tokenMatcher(r, e); })); }, e.prototype.canRecoverWithSingleTokenDeletion = function (e) { return this.tokenMatcher(this.LA(2), e); }, e.prototype.isInCurrentRuleReSyncSet = function (e) { var t = this.getCurrFollowKey(), n = this.getFollowSetFromFollowKey(t); return (0, o.r3)(n, e); }, e.prototype.findReSyncTokenType = function () { for (var e = this.flattenFollowSet(), t = this.LA(1), n = 2;;) {
            var r = t.tokenType;
            if ((0, o.r3)(e, r))
                return r;
            t = this.LA(n), n++;
        } }, e.prototype.getCurrFollowKey = function () { if (1 === this.RULE_STACK.length)
            return xt; var e = this.getLastExplicitRuleShortName(), t = this.getLastExplicitRuleOccurrenceIndex(), n = this.getPreviousExplicitRuleShortName(); return { ruleName: this.shortRuleNameToFullName(e), idxInCallingRule: t, inRule: this.shortRuleNameToFullName(n) }; }, e.prototype.buildFullFollowKeyStack = function () { var e = this, t = this.RULE_STACK, n = this.RULE_OCCURRENCE_STACK; return (0, o.UI)(t, (function (r, o) { return 0 === o ? xt : { ruleName: e.shortRuleNameToFullName(r), idxInCallingRule: n[o], inRule: e.shortRuleNameToFullName(t[o - 1]) }; })); }, e.prototype.flattenFollowSet = function () { var e = this, t = (0, o.UI)(this.buildFullFollowKeyStack(), (function (t) { return e.getFollowSetFromFollowKey(t); })); return (0, o.xH)(t); }, e.prototype.getFollowSetFromFollowKey = function (e) { if (e === xt)
            return [oe]; var t = e.ruleName + e.idxInCallingRule + xe + e.inRule; return this.resyncFollows[t]; }, e.prototype.addToResyncTokens = function (e, t) { return this.tokenMatcher(e, oe) || t.push(e), t; }, e.prototype.reSyncTo = function (e) { for (var t = [], n = this.LA(1); !1 === this.tokenMatcher(n, e);)
            n = this.SKIP_TOKEN(), this.addToResyncTokens(n, t); return (0, o.j7)(t); }, e.prototype.attemptInRepetitionRecovery = function (e, t, n, r, o, i, a) { }, e.prototype.getCurrentGrammarPath = function (e, t) { return { ruleStack: this.getHumanReadableRuleStack(), occurrenceStack: (0, o.Qw)(this.RULE_OCCURRENCE_STACK), lastTok: e, lastTokOccurrence: t }; }, e.prototype.getHumanReadableRuleStack = function () { var e = this; return (0, o.UI)(this.RULE_STACK, (function (t) { return e.shortRuleNameToFullName(t); })); }, e; }();
        function Dt(e, t, n, r, o, i, a) { var s = this.getKeyForAutomaticLookahead(r, o), c = this.firstAfterRepMap[s]; if (void 0 === c) {
            var u = this.getCurrRuleFullName();
            c = new i(this.getGAstProductions()[u], o).startWalking(), this.firstAfterRepMap[s] = c;
        } var l = c.token, f = c.occurrence, p = c.isEndOfRule; 1 === this.RULE_STACK.length && p && void 0 === l && (l = oe, f = 1), this.shouldInRepetitionRecoveryBeTried(l, f, a) && this.tryInRepetitionRecovery(e, t, n, l); }
        var Lt = 1024, Mt = 1280, jt = 1536;
        function Ut(e, t, n) { return n | t | e; }
        var Ft = function () { function e() { } return e.prototype.initLooksAhead = function (e) { this.dynamicTokensEnabled = (0, o.e$)(e, "dynamicTokensEnabled") ? e.dynamicTokensEnabled : gn.dynamicTokensEnabled, this.maxLookahead = (0, o.e$)(e, "maxLookahead") ? e.maxLookahead : gn.maxLookahead, this.lookAheadFuncsCache = (0, o.dU)() ? new Map : [], (0, o.dU)() ? (this.getLaFuncFromCache = this.getLaFuncFromMap, this.setLaFuncCache = this.setLaFuncCacheUsingMap) : (this.getLaFuncFromCache = this.getLaFuncFromObj, this.setLaFuncCache = this.setLaFuncUsingObj); }, e.prototype.preComputeLookaheadFunctions = function (e) { var t = this; (0, o.Ed)(e, (function (e) { t.TRACE_INIT(e.name + " Rule Lookahead", (function () { var n = function (e) { ke.reset(), e.accept(ke); var t = ke.dslMethods; return ke.reset(), t; }(e), r = n.alternation, i = n.repetition, a = n.option, s = n.repetitionMandatory, c = n.repetitionMandatoryWithSeparator, u = n.repetitionWithSeparator; (0, o.Ed)(r, (function (n) { var r = 0 === n.idx ? "" : n.idx; t.TRACE_INIT("" + Ae(n) + r, (function () { var r, o, i, a, s, c, u = (r = n.idx, o = e, i = n.maxLookahead || t.maxLookahead, a = n.hasPredicates, s = t.dynamicTokensEnabled, (0, t.lookAheadBuilderForAlternatives)(c = nt(r, o, i), a, it(c) ? W : q, s)), l = Ut(t.fullRuleNameToShort[e.name], 256, n.idx); t.setLaFuncCache(l, u); })); })), (0, o.Ed)(i, (function (n) { t.computeLookaheadFunc(e, n.idx, 768, ze.REPETITION, n.maxLookahead, Ae(n)); })), (0, o.Ed)(a, (function (n) { t.computeLookaheadFunc(e, n.idx, 512, ze.OPTION, n.maxLookahead, Ae(n)); })), (0, o.Ed)(s, (function (n) { t.computeLookaheadFunc(e, n.idx, Lt, ze.REPETITION_MANDATORY, n.maxLookahead, Ae(n)); })), (0, o.Ed)(c, (function (n) { t.computeLookaheadFunc(e, n.idx, jt, ze.REPETITION_MANDATORY_WITH_SEPARATOR, n.maxLookahead, Ae(n)); })), (0, o.Ed)(u, (function (n) { t.computeLookaheadFunc(e, n.idx, Mt, ze.REPETITION_WITH_SEPARATOR, n.maxLookahead, Ae(n)); })); })); })); }, e.prototype.computeLookaheadFunc = function (e, t, n, r, o, i) { var a = this; this.TRACE_INIT("" + i + (0 === t ? "" : t), (function () { var i = function (e, t, n, r, o, i) { var a = rt(e, t, o, n), s = it(a) ? W : q; return i(a[0], s, r); }(t, e, o || a.maxLookahead, a.dynamicTokensEnabled, r, a.lookAheadBuilderForOptional), s = Ut(a.fullRuleNameToShort[e.name], n, t); a.setLaFuncCache(s, i); })); }, e.prototype.lookAheadBuilderForOptional = function (e, t, n) { return function (e, t, n) { var r = (0, o.yW)(e, (function (e) { return 1 === e.length; })), i = e.length; if (r && !n) {
            var a = (0, o.xH)(e);
            if (1 === a.length && (0, o.xb)(a[0].categoryMatches)) {
                var s = a[0].tokenTypeIdx;
                return function () { return this.LA(1).tokenTypeIdx === s; };
            }
            var c = (0, o.u4)(a, (function (e, t, n) { return e[t.tokenTypeIdx] = !0, (0, o.Ed)(t.categoryMatches, (function (t) { e[t] = !0; })), e; }), []);
            return function () { var e = this.LA(1); return !0 === c[e.tokenTypeIdx]; };
        } return function () { e: for (var n = 0; n < i; n++) {
            for (var r = e[n], o = r.length, a = 0; a < o; a++) {
                var s = this.LA(a + 1);
                if (!1 === t(s, r[a]))
                    continue e;
            }
            return !0;
        } return !1; }; }(e, t, n); }, e.prototype.lookAheadBuilderForAlternatives = function (e, t, n, r) { return function (e, t, n, r) { var i = e.length, a = (0, o.yW)(e, (function (e) { return (0, o.yW)(e, (function (e) { return 1 === e.length; })); })); if (t)
            return function (t) { for (var r = (0, o.UI)(t, (function (e) { return e.GATE; })), a = 0; a < i; a++) {
                var s = e[a], c = s.length, u = r[a];
                if (void 0 === u || !1 !== u.call(this))
                    e: for (var l = 0; l < c; l++) {
                        for (var f = s[l], p = f.length, h = 0; h < p; h++) {
                            var d = this.LA(h + 1);
                            if (!1 === n(d, f[h]))
                                continue e;
                        }
                        return a;
                    }
            } }; if (a && !r) {
            var s = (0, o.UI)(e, (function (e) { return (0, o.xH)(e); })), c = (0, o.u4)(s, (function (e, t, n) { return (0, o.Ed)(t, (function (t) { (0, o.e$)(e, t.tokenTypeIdx) || (e[t.tokenTypeIdx] = n), (0, o.Ed)(t.categoryMatches, (function (t) { (0, o.e$)(e, t) || (e[t] = n); })); })), e; }), []);
            return function () { var e = this.LA(1); return c[e.tokenTypeIdx]; };
        } return function () { for (var t = 0; t < i; t++) {
            var r = e[t], o = r.length;
            e: for (var a = 0; a < o; a++) {
                for (var s = r[a], c = s.length, u = 0; u < c; u++) {
                    var l = this.LA(u + 1);
                    if (!1 === n(l, s[u]))
                        continue e;
                }
                return t;
            }
        } }; }(e, t, n, r); }, e.prototype.getKeyForAutomaticLookahead = function (e, t) { return Ut(this.getLastExplicitRuleShortName(), e, t); }, e.prototype.getLaFuncFromCache = function (e) { }, e.prototype.getLaFuncFromMap = function (e) { return this.lookAheadFuncsCache.get(e); }, e.prototype.getLaFuncFromObj = function (e) { return this.lookAheadFuncsCache[e]; }, e.prototype.setLaFuncCache = function (e, t) { }, e.prototype.setLaFuncCacheUsingMap = function (e, t) { this.lookAheadFuncsCache.set(e, t); }, e.prototype.setLaFuncUsingObj = function (e, t) { this.lookAheadFuncsCache[e] = t; }, e; }();
        function qt(e, t) { !0 === isNaN(e.startOffset) ? (e.startOffset = t.startOffset, e.endOffset = t.endOffset) : e.endOffset < t.endOffset == 1 && (e.endOffset = t.endOffset); }
        function Wt(e, t) { !0 === isNaN(e.startOffset) ? (e.startOffset = t.startOffset, e.startColumn = t.startColumn, e.startLine = t.startLine, e.endOffset = t.endOffset, e.endColumn = t.endColumn, e.endLine = t.endLine) : e.endOffset < t.endOffset == 1 && (e.endOffset = t.endOffset, e.endColumn = t.endColumn, e.endLine = t.endLine); }
        var Bt, $t = "name";
        function Ht(e) { return e.name || "anonymous"; }
        function Vt(e, t) { var n = Object.getOwnPropertyDescriptor(e, $t); return !(!(0, o.o8)(n) && !n.configurable || (Object.defineProperty(e, $t, { enumerable: !1, configurable: !0, writable: !1, value: t }), 0)); }
        function Kt(e, t) { for (var n = (0, o.XP)(e), r = n.length, i = 0; i < r; i++)
            for (var a = e[n[i]], s = a.length, c = 0; c < s; c++) {
                var u = a[c];
                void 0 === u.tokenTypeIdx && this[u.name](u.children, t);
            } }
        !function (e) { e[e.REDUNDANT_METHOD = 0] = "REDUNDANT_METHOD", e[e.MISSING_METHOD = 1] = "MISSING_METHOD"; }(Bt || (Bt = {}));
        var Gt = ["constructor", "visit", "validateVisitor"], zt = function () { function e() { } return e.prototype.initTreeBuilder = function (e) { if (this.CST_STACK = [], this.outputCst = e.outputCst, this.nodeLocationTracking = (0, o.e$)(e, "nodeLocationTracking") ? e.nodeLocationTracking : gn.nodeLocationTracking, this.outputCst)
            if (/full/i.test(this.nodeLocationTracking))
                this.recoveryEnabled ? (this.setNodeLocationFromToken = Wt, this.setNodeLocationFromNode = Wt, this.cstPostRule = o.dG, this.setInitialNodeLocation = this.setInitialNodeLocationFullRecovery) : (this.setNodeLocationFromToken = o.dG, this.setNodeLocationFromNode = o.dG, this.cstPostRule = this.cstPostRuleFull, this.setInitialNodeLocation = this.setInitialNodeLocationFullRegular);
            else if (/onlyOffset/i.test(this.nodeLocationTracking))
                this.recoveryEnabled ? (this.setNodeLocationFromToken = qt, this.setNodeLocationFromNode = qt, this.cstPostRule = o.dG, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRecovery) : (this.setNodeLocationFromToken = o.dG, this.setNodeLocationFromNode = o.dG, this.cstPostRule = this.cstPostRuleOnlyOffset, this.setInitialNodeLocation = this.setInitialNodeLocationOnlyOffsetRegular);
            else {
                if (!/none/i.test(this.nodeLocationTracking))
                    throw Error('Invalid <nodeLocationTracking> config option: "' + e.nodeLocationTracking + '"');
                this.setNodeLocationFromToken = o.dG, this.setNodeLocationFromNode = o.dG, this.cstPostRule = o.dG, this.setInitialNodeLocation = o.dG;
            }
        else
            this.cstInvocationStateUpdate = o.dG, this.cstFinallyStateUpdate = o.dG, this.cstPostTerminal = o.dG, this.cstPostNonTerminal = o.dG, this.cstPostRule = o.dG; }, e.prototype.setInitialNodeLocationOnlyOffsetRecovery = function (e) { e.location = { startOffset: NaN, endOffset: NaN }; }, e.prototype.setInitialNodeLocationOnlyOffsetRegular = function (e) { e.location = { startOffset: this.LA(1).startOffset, endOffset: NaN }; }, e.prototype.setInitialNodeLocationFullRecovery = function (e) { e.location = { startOffset: NaN, startLine: NaN, startColumn: NaN, endOffset: NaN, endLine: NaN, endColumn: NaN }; }, e.prototype.setInitialNodeLocationFullRegular = function (e) { var t = this.LA(1); e.location = { startOffset: t.startOffset, startLine: t.startLine, startColumn: t.startColumn, endOffset: NaN, endLine: NaN, endColumn: NaN }; }, e.prototype.cstInvocationStateUpdate = function (e, t) { var n = { name: e, children: {} }; this.setInitialNodeLocation(n), this.CST_STACK.push(n); }, e.prototype.cstFinallyStateUpdate = function () { this.CST_STACK.pop(); }, e.prototype.cstPostRuleFull = function (e) { var t = this.LA(0), n = e.location; n.startOffset <= t.startOffset == 1 ? (n.endOffset = t.endOffset, n.endLine = t.endLine, n.endColumn = t.endColumn) : (n.startOffset = NaN, n.startLine = NaN, n.startColumn = NaN); }, e.prototype.cstPostRuleOnlyOffset = function (e) { var t = this.LA(0), n = e.location; n.startOffset <= t.startOffset == 1 ? n.endOffset = t.endOffset : n.startOffset = NaN; }, e.prototype.cstPostTerminal = function (e, t) { var n, r, o, i = this.CST_STACK[this.CST_STACK.length - 1]; r = t, o = e, void 0 === (n = i).children[o] ? n.children[o] = [r] : n.children[o].push(r), this.setNodeLocationFromToken(i.location, t); }, e.prototype.cstPostNonTerminal = function (e, t) { var n = this.CST_STACK[this.CST_STACK.length - 1]; !function (e, t, n) { void 0 === e.children[t] ? e.children[t] = [n] : e.children[t].push(n); }(n, t, e), this.setNodeLocationFromNode(n.location, e.location); }, e.prototype.getBaseCstVisitorConstructor = function () { if ((0, o.o8)(this.baseCstVisitorConstructor)) {
            var e = function (e, t) { var n = function () { }; Vt(n, e + "BaseSemantics"); var r = { visit: function (e, t) { if ((0, o.kJ)(e) && (e = e[0]), !(0, o.o8)(e))
                    return this[e.name](e.children, t); }, validateVisitor: function () { var e = function (e, t) { var n = function (e, t) { var n = (0, o.UI)(t, (function (t) { if (!(0, o.mf)(e[t]))
                    return { msg: "Missing visitor method: <" + t + "> on " + Ht(e.constructor) + " CST Visitor.", type: Bt.MISSING_METHOD, methodName: t }; })); return (0, o.oA)(n); }(e, t), r = function (e, t) { var n = []; for (var r in e)
                    !(0, o.mf)(e[r]) || (0, o.r3)(Gt, r) || (0, o.r3)(t, r) || n.push({ msg: "Redundant visitor method: <" + r + "> on " + Ht(e.constructor) + " CST Visitor\nThere is no Grammar Rule corresponding to this method's name.\n", type: Bt.REDUNDANT_METHOD, methodName: r }); return n; }(e, t); return n.concat(r); }(this, t); if (!(0, o.xb)(e)) {
                    var n = (0, o.UI)(e, (function (e) { return e.msg; }));
                    throw Error("Errors Detected in CST Visitor <" + Ht(this.constructor) + ">:\n\t" + n.join("\n\n").replace(/\n/g, "\n\t"));
                } } }; return (n.prototype = r).constructor = n, n._RULE_NAMES = t, n; }(this.className, (0, o.XP)(this.gastProductionsCache));
            return this.baseCstVisitorConstructor = e, e;
        } return this.baseCstVisitorConstructor; }, e.prototype.getBaseCstVisitorConstructorWithDefaults = function () { if ((0, o.o8)(this.baseCstVisitorWithDefaultsConstructor)) {
            var e = function (e, t, n) { var r = function () { }; Vt(r, e + "BaseSemanticsWithDefaults"); var i = Object.create(n.prototype); return (0, o.Ed)(t, (function (e) { i[e] = Kt; })), (r.prototype = i).constructor = r, r; }(this.className, (0, o.XP)(this.gastProductionsCache), this.getBaseCstVisitorConstructor());
            return this.baseCstVisitorWithDefaultsConstructor = e, e;
        } return this.baseCstVisitorWithDefaultsConstructor; }, e.prototype.getLastExplicitRuleShortName = function () { var e = this.RULE_STACK; return e[e.length - 1]; }, e.prototype.getPreviousExplicitRuleShortName = function () { var e = this.RULE_STACK; return e[e.length - 2]; }, e.prototype.getLastExplicitRuleOccurrenceIndex = function () { var e = this.RULE_OCCURRENCE_STACK; return e[e.length - 1]; }, e; }(), Xt = function () { function e() { } return e.prototype.initLexerAdapter = function () { this.tokVector = [], this.tokVectorLength = 0, this.currIdx = -1; }, Object.defineProperty(e.prototype, "input", { get: function () { return this.tokVector; }, set: function (e) { if (!0 !== this.selfAnalysisDone)
                throw Error("Missing <performSelfAnalysis> invocation at the end of the Parser's constructor."); this.reset(), this.tokVector = e, this.tokVectorLength = e.length; }, enumerable: !1, configurable: !0 }), e.prototype.SKIP_TOKEN = function () { return this.currIdx <= this.tokVector.length - 2 ? (this.consumeToken(), this.LA(1)) : dn; }, e.prototype.LA = function (e) { var t = this.currIdx + e; return t < 0 || this.tokVectorLength <= t ? dn : this.tokVector[t]; }, e.prototype.consumeToken = function () { this.currIdx++; }, e.prototype.exportLexerState = function () { return this.currIdx; }, e.prototype.importLexerState = function (e) { this.currIdx = e; }, e.prototype.resetLexerState = function () { this.currIdx = -1; }, e.prototype.moveToTerminatedState = function () { this.currIdx = this.tokVector.length - 1; }, e.prototype.getLexerPosition = function () { return this.exportLexerState(); }, e; }(), Yt = function () { function e() { } return e.prototype.ACTION = function (e) { return e.call(this); }, e.prototype.consume = function (e, t, n) { return this.consumeInternal(t, e, n); }, e.prototype.subrule = function (e, t, n) { return this.subruleInternal(t, e, n); }, e.prototype.option = function (e, t) { return this.optionInternal(t, e); }, e.prototype.or = function (e, t) { return this.orInternal(t, e); }, e.prototype.many = function (e, t) { return this.manyInternal(e, t); }, e.prototype.atLeastOne = function (e, t) { return this.atLeastOneInternal(e, t); }, e.prototype.CONSUME = function (e, t) { return this.consumeInternal(e, 0, t); }, e.prototype.CONSUME1 = function (e, t) { return this.consumeInternal(e, 1, t); }, e.prototype.CONSUME2 = function (e, t) { return this.consumeInternal(e, 2, t); }, e.prototype.CONSUME3 = function (e, t) { return this.consumeInternal(e, 3, t); }, e.prototype.CONSUME4 = function (e, t) { return this.consumeInternal(e, 4, t); }, e.prototype.CONSUME5 = function (e, t) { return this.consumeInternal(e, 5, t); }, e.prototype.CONSUME6 = function (e, t) { return this.consumeInternal(e, 6, t); }, e.prototype.CONSUME7 = function (e, t) { return this.consumeInternal(e, 7, t); }, e.prototype.CONSUME8 = function (e, t) { return this.consumeInternal(e, 8, t); }, e.prototype.CONSUME9 = function (e, t) { return this.consumeInternal(e, 9, t); }, e.prototype.SUBRULE = function (e, t) { return this.subruleInternal(e, 0, t); }, e.prototype.SUBRULE1 = function (e, t) { return this.subruleInternal(e, 1, t); }, e.prototype.SUBRULE2 = function (e, t) { return this.subruleInternal(e, 2, t); }, e.prototype.SUBRULE3 = function (e, t) { return this.subruleInternal(e, 3, t); }, e.prototype.SUBRULE4 = function (e, t) { return this.subruleInternal(e, 4, t); }, e.prototype.SUBRULE5 = function (e, t) { return this.subruleInternal(e, 5, t); }, e.prototype.SUBRULE6 = function (e, t) { return this.subruleInternal(e, 6, t); }, e.prototype.SUBRULE7 = function (e, t) { return this.subruleInternal(e, 7, t); }, e.prototype.SUBRULE8 = function (e, t) { return this.subruleInternal(e, 8, t); }, e.prototype.SUBRULE9 = function (e, t) { return this.subruleInternal(e, 9, t); }, e.prototype.OPTION = function (e) { return this.optionInternal(e, 0); }, e.prototype.OPTION1 = function (e) { return this.optionInternal(e, 1); }, e.prototype.OPTION2 = function (e) { return this.optionInternal(e, 2); }, e.prototype.OPTION3 = function (e) { return this.optionInternal(e, 3); }, e.prototype.OPTION4 = function (e) { return this.optionInternal(e, 4); }, e.prototype.OPTION5 = function (e) { return this.optionInternal(e, 5); }, e.prototype.OPTION6 = function (e) { return this.optionInternal(e, 6); }, e.prototype.OPTION7 = function (e) { return this.optionInternal(e, 7); }, e.prototype.OPTION8 = function (e) { return this.optionInternal(e, 8); }, e.prototype.OPTION9 = function (e) { return this.optionInternal(e, 9); }, e.prototype.OR = function (e) { return this.orInternal(e, 0); }, e.prototype.OR1 = function (e) { return this.orInternal(e, 1); }, e.prototype.OR2 = function (e) { return this.orInternal(e, 2); }, e.prototype.OR3 = function (e) { return this.orInternal(e, 3); }, e.prototype.OR4 = function (e) { return this.orInternal(e, 4); }, e.prototype.OR5 = function (e) { return this.orInternal(e, 5); }, e.prototype.OR6 = function (e) { return this.orInternal(e, 6); }, e.prototype.OR7 = function (e) { return this.orInternal(e, 7); }, e.prototype.OR8 = function (e) { return this.orInternal(e, 8); }, e.prototype.OR9 = function (e) { return this.orInternal(e, 9); }, e.prototype.MANY = function (e) { this.manyInternal(0, e); }, e.prototype.MANY1 = function (e) { this.manyInternal(1, e); }, e.prototype.MANY2 = function (e) { this.manyInternal(2, e); }, e.prototype.MANY3 = function (e) { this.manyInternal(3, e); }, e.prototype.MANY4 = function (e) { this.manyInternal(4, e); }, e.prototype.MANY5 = function (e) { this.manyInternal(5, e); }, e.prototype.MANY6 = function (e) { this.manyInternal(6, e); }, e.prototype.MANY7 = function (e) { this.manyInternal(7, e); }, e.prototype.MANY8 = function (e) { this.manyInternal(8, e); }, e.prototype.MANY9 = function (e) { this.manyInternal(9, e); }, e.prototype.MANY_SEP = function (e) { this.manySepFirstInternal(0, e); }, e.prototype.MANY_SEP1 = function (e) { this.manySepFirstInternal(1, e); }, e.prototype.MANY_SEP2 = function (e) { this.manySepFirstInternal(2, e); }, e.prototype.MANY_SEP3 = function (e) { this.manySepFirstInternal(3, e); }, e.prototype.MANY_SEP4 = function (e) { this.manySepFirstInternal(4, e); }, e.prototype.MANY_SEP5 = function (e) { this.manySepFirstInternal(5, e); }, e.prototype.MANY_SEP6 = function (e) { this.manySepFirstInternal(6, e); }, e.prototype.MANY_SEP7 = function (e) { this.manySepFirstInternal(7, e); }, e.prototype.MANY_SEP8 = function (e) { this.manySepFirstInternal(8, e); }, e.prototype.MANY_SEP9 = function (e) { this.manySepFirstInternal(9, e); }, e.prototype.AT_LEAST_ONE = function (e) { this.atLeastOneInternal(0, e); }, e.prototype.AT_LEAST_ONE1 = function (e) { return this.atLeastOneInternal(1, e); }, e.prototype.AT_LEAST_ONE2 = function (e) { this.atLeastOneInternal(2, e); }, e.prototype.AT_LEAST_ONE3 = function (e) { this.atLeastOneInternal(3, e); }, e.prototype.AT_LEAST_ONE4 = function (e) { this.atLeastOneInternal(4, e); }, e.prototype.AT_LEAST_ONE5 = function (e) { this.atLeastOneInternal(5, e); }, e.prototype.AT_LEAST_ONE6 = function (e) { this.atLeastOneInternal(6, e); }, e.prototype.AT_LEAST_ONE7 = function (e) { this.atLeastOneInternal(7, e); }, e.prototype.AT_LEAST_ONE8 = function (e) { this.atLeastOneInternal(8, e); }, e.prototype.AT_LEAST_ONE9 = function (e) { this.atLeastOneInternal(9, e); }, e.prototype.AT_LEAST_ONE_SEP = function (e) { this.atLeastOneSepFirstInternal(0, e); }, e.prototype.AT_LEAST_ONE_SEP1 = function (e) { this.atLeastOneSepFirstInternal(1, e); }, e.prototype.AT_LEAST_ONE_SEP2 = function (e) { this.atLeastOneSepFirstInternal(2, e); }, e.prototype.AT_LEAST_ONE_SEP3 = function (e) { this.atLeastOneSepFirstInternal(3, e); }, e.prototype.AT_LEAST_ONE_SEP4 = function (e) { this.atLeastOneSepFirstInternal(4, e); }, e.prototype.AT_LEAST_ONE_SEP5 = function (e) { this.atLeastOneSepFirstInternal(5, e); }, e.prototype.AT_LEAST_ONE_SEP6 = function (e) { this.atLeastOneSepFirstInternal(6, e); }, e.prototype.AT_LEAST_ONE_SEP7 = function (e) { this.atLeastOneSepFirstInternal(7, e); }, e.prototype.AT_LEAST_ONE_SEP8 = function (e) { this.atLeastOneSepFirstInternal(8, e); }, e.prototype.AT_LEAST_ONE_SEP9 = function (e) { this.atLeastOneSepFirstInternal(9, e); }, e.prototype.RULE = function (e, t, n) { if (void 0 === n && (n = mn), (0, o.r3)(this.definedRulesNames, e)) {
            var r = { message: Le.buildDuplicateRuleNameError({ topLevelRule: e, grammarName: this.className }), type: yn.DUPLICATE_RULE_NAME, ruleName: e };
            this.definitionErrors.push(r);
        } this.definedRulesNames.push(e); var i = this.defineRule(e, t, n); return this[e] = i, i; }, e.prototype.OVERRIDE_RULE = function (e, t, n) { void 0 === n && (n = mn); var r, i, a, s, c, u = []; u = u.concat((r = e, i = this.definedRulesNames, a = this.className, c = [], o.r3(i, r) || (s = "Invalid rule override, rule: ->" + r + "<- cannot be overridden in the grammar: ->" + a + "<-as it is not defined in any of the super grammars ", c.push({ message: s, type: yn.INVALID_RULE_OVERRIDE, ruleName: r })), c)), this.definitionErrors.push.apply(this.definitionErrors, u); var l = this.defineRule(e, t, n); return this[e] = l, l; }, e.prototype.BACKTRACK = function (e, t) { return function () { this.isBackTrackingStack.push(1); var n = this.saveRecogState(); try {
            return e.apply(this, t), !0;
        }
        catch (e) {
            if (St(e))
                return !1;
            throw e;
        }
        finally {
            this.reloadRecogState(n), this.isBackTrackingStack.pop();
        } }; }, e.prototype.getGAstProductions = function () { return this.gastProductionsCache; }, e.prototype.getSerializedGastProductions = function () { return be((0, o.VO)(this.gastProductionsCache)); }, e; }(), Jt = function () { function e() { } return e.prototype.initRecognizerEngine = function (e, t) { if (this.className = Ht(this.constructor), this.shortRuleNameToFull = {}, this.fullRuleNameToShort = {}, this.ruleShortNameIdx = 256, this.tokenMatcher = W, this.definedRulesNames = [], this.tokensMap = {}, this.isBackTrackingStack = [], this.RULE_STACK = [], this.RULE_OCCURRENCE_STACK = [], this.gastProductionsCache = {}, (0, o.e$)(t, "serializedGrammar"))
            throw Error("The Parser's configuration can no longer contain a <serializedGrammar> property.\n\tSee: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_6-0-0\n\tFor Further details."); if ((0, o.kJ)(e)) {
            if ((0, o.xb)(e))
                throw Error("A Token Vocabulary cannot be empty.\n\tNote that the first argument for the parser constructor\n\tis no longer a Token vector (since v4.0).");
            if ("number" == typeof e[0].startOffset)
                throw Error("The Parser constructor no longer accepts a token vector as the first argument.\n\tSee: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_4-0-0\n\tFor Further details.");
        } if ((0, o.kJ)(e))
            this.tokensMap = (0, o.u4)(e, (function (e, t) { return e[t.name] = t, e; }), {});
        else if ((0, o.e$)(e, "modes") && (0, o.yW)((0, o.xH)((0, o.VO)(e.modes)), z)) {
            var n = (0, o.xH)((0, o.VO)(e.modes)), r = (0, o.jj)(n);
            this.tokensMap = (0, o.u4)(r, (function (e, t) { return e[t.name] = t, e; }), {});
        }
        else {
            if (!(0, o.Kn)(e))
                throw new Error("<tokensDictionary> argument must be An Array of Token constructors, A dictionary of Token constructors or an IMultiModeLexerDefinition");
            this.tokensMap = (0, o.Cl)(e);
        } this.tokensMap.EOF = oe; var i = (0, o.yW)((0, o.VO)(e), (function (e) { return (0, o.xb)(e.categoryMatches); })); this.tokenMatcher = i ? W : q, H((0, o.VO)(this.tokensMap)); }, e.prototype.defineRule = function (e, t, n) { if (this.selfAnalysisDone)
            throw Error("Grammar rule <" + e + "> may not be defined after the 'performSelfAnalysis' method has been called'\nMake sure that all grammar rule definitions are done before 'performSelfAnalysis' is called."); var r, i = (0, o.e$)(n, "resyncEnabled") ? n.resyncEnabled : mn.resyncEnabled, a = (0, o.e$)(n, "recoveryValueFunc") ? n.recoveryValueFunc : mn.recoveryValueFunc, s = this.ruleShortNameIdx << 12; function c(e) { try {
            if (!0 === this.outputCst) {
                t.apply(this, e);
                var n = this.CST_STACK[this.CST_STACK.length - 1];
                return this.cstPostRule(n), n;
            }
            return t.apply(this, e);
        }
        catch (e) {
            return this.invokeRuleCatch(e, i, a);
        }
        finally {
            this.ruleFinallyStateUpdate();
        } } return this.ruleShortNameIdx++, this.shortRuleNameToFull[s] = e, this.fullRuleNameToShort[e] = s, (r = function (t, n) { return void 0 === t && (t = 0), this.ruleInvocationStateUpdate(s, e, t), c.call(this, n); }).ruleName = e, r.originalGrammarAction = t, r; }, e.prototype.invokeRuleCatch = function (e, t, n) { var r = 1 === this.RULE_STACK.length, o = t && !this.isBackTracking() && this.recoveryEnabled; if (St(e)) {
            var i = e;
            if (o) {
                var a, s = this.findReSyncTokenType();
                if (this.isInCurrentRuleReSyncSet(s))
                    return i.resyncedTokens = this.reSyncTo(s), this.outputCst ? ((a = this.CST_STACK[this.CST_STACK.length - 1]).recoveredNode = !0, a) : n();
                throw this.outputCst && ((a = this.CST_STACK[this.CST_STACK.length - 1]).recoveredNode = !0, i.partialCstResult = a), i;
            }
            if (r)
                return this.moveToTerminatedState(), n();
            throw i;
        } throw e; }, e.prototype.optionInternal = function (e, t) { var n = this.getKeyForAutomaticLookahead(512, t); return this.optionInternalLogic(e, t, n); }, e.prototype.optionInternalLogic = function (e, t, n) { var r, o, i = this, a = this.getLaFuncFromCache(n); if (void 0 !== e.DEF) {
            if (r = e.DEF, void 0 !== (o = e.GATE)) {
                var s = a;
                a = function () { return o.call(i) && s.call(i); };
            }
        }
        else
            r = e; if (!0 === a.call(this))
            return r.call(this); }, e.prototype.atLeastOneInternal = function (e, t) { var n = this.getKeyForAutomaticLookahead(Lt, e); return this.atLeastOneInternalLogic(e, t, n); }, e.prototype.atLeastOneInternalLogic = function (e, t, n) { var r, o, i = this, a = this.getLaFuncFromCache(n); if (void 0 !== t.DEF) {
            if (r = t.DEF, void 0 !== (o = t.GATE)) {
                var s = a;
                a = function () { return o.call(i) && s.call(i); };
            }
        }
        else
            r = t; if (!0 !== a.call(this))
            throw this.raiseEarlyExitException(e, ze.REPETITION_MANDATORY, t.ERR_MSG); for (var c = this.doSingleRepetition(r); !0 === a.call(this) && !0 === c;)
            c = this.doSingleRepetition(r); this.attemptInRepetitionRecovery(this.atLeastOneInternal, [e, t], a, Lt, e, $e); }, e.prototype.atLeastOneSepFirstInternal = function (e, t) { var n = this.getKeyForAutomaticLookahead(jt, e); this.atLeastOneSepFirstInternalLogic(e, t, n); }, e.prototype.atLeastOneSepFirstInternalLogic = function (e, t, n) { var r = this, o = t.DEF, i = t.SEP; if (!0 !== this.getLaFuncFromCache(n).call(this))
            throw this.raiseEarlyExitException(e, ze.REPETITION_MANDATORY_WITH_SEPARATOR, t.ERR_MSG); o.call(this); for (var a = function () { return r.tokenMatcher(r.LA(1), i); }; !0 === this.tokenMatcher(this.LA(1), i);)
            this.CONSUME(i), o.call(this); this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [e, i, a, o, He], a, jt, e, He); }, e.prototype.manyInternal = function (e, t) { var n = this.getKeyForAutomaticLookahead(768, e); return this.manyInternalLogic(e, t, n); }, e.prototype.manyInternalLogic = function (e, t, n) { var r, o, i = this, a = this.getLaFuncFromCache(n); if (void 0 !== t.DEF) {
            if (r = t.DEF, void 0 !== (o = t.GATE)) {
                var s = a;
                a = function () { return o.call(i) && s.call(i); };
            }
        }
        else
            r = t; for (var c = !0; !0 === a.call(this) && !0 === c;)
            c = this.doSingleRepetition(r); this.attemptInRepetitionRecovery(this.manyInternal, [e, t], a, 768, e, We, c); }, e.prototype.manySepFirstInternal = function (e, t) { var n = this.getKeyForAutomaticLookahead(Mt, e); this.manySepFirstInternalLogic(e, t, n); }, e.prototype.manySepFirstInternalLogic = function (e, t, n) { var r = this, o = t.DEF, i = t.SEP; if (!0 === this.getLaFuncFromCache(n).call(this)) {
            o.call(this);
            for (var a = function () { return r.tokenMatcher(r.LA(1), i); }; !0 === this.tokenMatcher(this.LA(1), i);)
                this.CONSUME(i), o.call(this);
            this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [e, i, a, o, Be], a, Mt, e, Be);
        } }, e.prototype.repetitionSepSecondInternal = function (e, t, n, r, o) { for (; n();)
            this.CONSUME(t), r.call(this); this.attemptInRepetitionRecovery(this.repetitionSepSecondInternal, [e, t, n, r, o], n, jt, e, o); }, e.prototype.doSingleRepetition = function (e) { var t = this.getLexerPosition(); return e.call(this), this.getLexerPosition() > t; }, e.prototype.orInternal = function (e, t) { var n = this.getKeyForAutomaticLookahead(256, t), r = (0, o.kJ)(e) ? e : e.DEF, i = this.getLaFuncFromCache(n).call(this, r); if (void 0 !== i)
            return r[i].ALT.call(this); this.raiseNoAltException(t, e.ERR_MSG); }, e.prototype.ruleFinallyStateUpdate = function () { if (this.RULE_STACK.pop(), this.RULE_OCCURRENCE_STACK.pop(), this.cstFinallyStateUpdate(), 0 === this.RULE_STACK.length && !1 === this.isAtEndOfInput()) {
            var e = this.LA(1), t = this.errorMessageProvider.buildNotAllInputParsedMessage({ firstRedundant: e, ruleName: this.getCurrRuleFullName() });
            this.SAVE_ERROR(new kt(t, e));
        } }, e.prototype.subruleInternal = function (e, t, n) { var r; try {
            var o = void 0 !== n ? n.ARGS : void 0;
            return r = e.call(this, t, o), this.cstPostNonTerminal(r, void 0 !== n && void 0 !== n.LABEL ? n.LABEL : e.ruleName), r;
        }
        catch (t) {
            this.subruleInternalError(t, n, e.ruleName);
        } }, e.prototype.subruleInternalError = function (e, t, n) { throw St(e) && void 0 !== e.partialCstResult && (this.cstPostNonTerminal(e.partialCstResult, void 0 !== t && void 0 !== t.LABEL ? t.LABEL : n), delete e.partialCstResult), e; }, e.prototype.consumeInternal = function (e, t, n) { var r; try {
            var o = this.LA(1);
            !0 === this.tokenMatcher(o, e) ? (this.consumeToken(), r = o) : this.consumeInternalError(e, o, n);
        }
        catch (n) {
            r = this.consumeInternalRecovery(e, t, n);
        } return this.cstPostTerminal(void 0 !== n && void 0 !== n.LABEL ? n.LABEL : e.name, r), r; }, e.prototype.consumeInternalError = function (e, t, n) { var r, o = this.LA(0); throw r = void 0 !== n && n.ERR_MSG ? n.ERR_MSG : this.errorMessageProvider.buildMismatchTokenMessage({ expected: e, actual: t, previous: o, ruleName: this.getCurrRuleFullName() }), this.SAVE_ERROR(new At(r, t, o)); }, e.prototype.consumeInternalRecovery = function (e, t, n) { if (!this.recoveryEnabled || "MismatchedTokenException" !== n.name || this.isBackTracking())
            throw n; var r = this.getFollowsForInRuleRecovery(e, t); try {
            return this.tryInRuleRecovery(e, r);
        }
        catch (e) {
            throw e.name === Ct ? n : e;
        } }, e.prototype.saveRecogState = function () { var e = this.errors, t = (0, o.Qw)(this.RULE_STACK); return { errors: e, lexerState: this.exportLexerState(), RULE_STACK: t, CST_STACK: this.CST_STACK }; }, e.prototype.reloadRecogState = function (e) { this.errors = e.errors, this.importLexerState(e.lexerState), this.RULE_STACK = e.RULE_STACK; }, e.prototype.ruleInvocationStateUpdate = function (e, t, n) { this.RULE_OCCURRENCE_STACK.push(n), this.RULE_STACK.push(e), this.cstInvocationStateUpdate(t, e); }, e.prototype.isBackTracking = function () { return 0 !== this.isBackTrackingStack.length; }, e.prototype.getCurrRuleFullName = function () { var e = this.getLastExplicitRuleShortName(); return this.shortRuleNameToFull[e]; }, e.prototype.shortRuleNameToFullName = function (e) { return this.shortRuleNameToFull[e]; }, e.prototype.isAtEndOfInput = function () { return this.tokenMatcher(this.LA(1), oe); }, e.prototype.reset = function () { this.resetLexerState(), this.isBackTrackingStack = [], this.errors = [], this.RULE_STACK = [], this.CST_STACK = [], this.RULE_OCCURRENCE_STACK = []; }, e; }(), Qt = function () { function e() { } return e.prototype.initErrorHandler = function (e) { this._errors = [], this.errorMessageProvider = (0, o.e$)(e, "errorMessageProvider") ? e.errorMessageProvider : gn.errorMessageProvider; }, e.prototype.SAVE_ERROR = function (e) { if (St(e))
            return e.context = { ruleStack: this.getHumanReadableRuleStack(), ruleOccurrenceStack: (0, o.Qw)(this.RULE_OCCURRENCE_STACK) }, this._errors.push(e), e; throw Error("Trying to save an Error which is not a RecognitionException"); }, Object.defineProperty(e.prototype, "errors", { get: function () { return (0, o.Qw)(this._errors); }, set: function (e) { this._errors = e; }, enumerable: !1, configurable: !0 }), e.prototype.raiseEarlyExitException = function (e, t, n) { for (var r = this.getCurrRuleFullName(), o = rt(e, this.getGAstProductions()[r], t, this.maxLookahead)[0], i = [], a = 1; a <= this.maxLookahead; a++)
            i.push(this.LA(a)); var s = this.errorMessageProvider.buildEarlyExitMessage({ expectedIterationPaths: o, actual: i, previous: this.LA(0), customUserDescription: n, ruleName: r }); throw this.SAVE_ERROR(new wt(s, this.LA(1), this.LA(0))); }, e.prototype.raiseNoAltException = function (e, t) { for (var n = this.getCurrRuleFullName(), r = nt(e, this.getGAstProductions()[n], this.maxLookahead), o = [], i = 1; i <= this.maxLookahead; i++)
            o.push(this.LA(i)); var a = this.LA(0), s = this.errorMessageProvider.buildNoViableAltMessage({ expectedPathsPerAlt: r, actual: o, previous: a, customUserDescription: t, ruleName: this.getCurrRuleFullName() }); throw this.SAVE_ERROR(new Nt(s, this.LA(1), a)); }, e; }(), Zt = function () { function e() { } return e.prototype.initContentAssist = function () { }, e.prototype.computeContentAssist = function (e, t) { var n = this.gastProductionsCache[e]; if ((0, o.o8)(n))
            throw Error("Rule ->" + e + "<- does not exist in this grammar."); return Ke([n], t, this.tokenMatcher, this.maxLookahead); }, e.prototype.getNextPossibleTokenTypes = function (e) { var t = (0, o.Ps)(e.ruleStack), n = this.getGAstProductions()[t]; return new Fe(n, e).startWalking(); }, e; }(), en = { description: "This Object indicates the Parser is during Recording Phase" };
        Object.freeze(en);
        var tn = Math.pow(2, 8) - 1, nn = re({ name: "RECORDING_PHASE_TOKEN", pattern: Z.NA });
        H([nn]);
        var rn = ie(nn, "This IToken indicates the Parser is in Recording Phase\n\tSee: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details", -1, -1, -1, -1, -1, -1);
        Object.freeze(rn);
        var on = { name: "This CSTNode indicates the Parser is in Recording Phase\n\tSee: https://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording for details", children: {} }, an = function () { function e() { } return e.prototype.initGastRecorder = function (e) { this.recordingProdStack = [], this.RECORDING_PHASE = !1; }, e.prototype.enableRecording = function () { var e = this; this.RECORDING_PHASE = !0, this.TRACE_INIT("Enable Recording", (function () { for (var t = function (t) { var n = t > 0 ? t : ""; e["CONSUME" + n] = function (e, n) { return this.consumeInternalRecord(e, t, n); }, e["SUBRULE" + n] = function (e, n) { return this.subruleInternalRecord(e, t, n); }, e["OPTION" + n] = function (e) { return this.optionInternalRecord(e, t); }, e["OR" + n] = function (e) { return this.orInternalRecord(e, t); }, e["MANY" + n] = function (e) { this.manyInternalRecord(t, e); }, e["MANY_SEP" + n] = function (e) { this.manySepFirstInternalRecord(t, e); }, e["AT_LEAST_ONE" + n] = function (e) { this.atLeastOneInternalRecord(t, e); }, e["AT_LEAST_ONE_SEP" + n] = function (e) { this.atLeastOneSepFirstInternalRecord(t, e); }; }, n = 0; n < 10; n++)
            t(n); e.consume = function (e, t, n) { return this.consumeInternalRecord(t, e, n); }, e.subrule = function (e, t, n) { return this.subruleInternalRecord(t, e, n); }, e.option = function (e, t) { return this.optionInternalRecord(t, e); }, e.or = function (e, t) { return this.orInternalRecord(t, e); }, e.many = function (e, t) { this.manyInternalRecord(e, t); }, e.atLeastOne = function (e, t) { this.atLeastOneInternalRecord(e, t); }, e.ACTION = e.ACTION_RECORD, e.BACKTRACK = e.BACKTRACK_RECORD, e.LA = e.LA_RECORD; })); }, e.prototype.disableRecording = function () { var e = this; this.RECORDING_PHASE = !1, this.TRACE_INIT("Deleting Recording methods", (function () { for (var t = 0; t < 10; t++) {
            var n = t > 0 ? t : "";
            delete e["CONSUME" + n], delete e["SUBRULE" + n], delete e["OPTION" + n], delete e["OR" + n], delete e["MANY" + n], delete e["MANY_SEP" + n], delete e["AT_LEAST_ONE" + n], delete e["AT_LEAST_ONE_SEP" + n];
        } delete e.consume, delete e.subrule, delete e.option, delete e.or, delete e.many, delete e.atLeastOne, delete e.ACTION, delete e.BACKTRACK, delete e.LA; })); }, e.prototype.ACTION_RECORD = function (e) { }, e.prototype.BACKTRACK_RECORD = function (e, t) { return function () { return !0; }; }, e.prototype.LA_RECORD = function (e) { return dn; }, e.prototype.topLevelRuleRecord = function (e, t) { try {
            var n = new le({ definition: [], name: e });
            return n.name = e, this.recordingProdStack.push(n), t.call(this), this.recordingProdStack.pop(), n;
        }
        catch (e) {
            if (!0 !== e.KNOWN_RECORDER_ERROR)
                try {
                    e.message = e.message + '\n\t This error was thrown during the "grammar recording phase" For more info see:\n\thttps://sap.github.io/chevrotain/docs/guide/internals.html#grammar-recording';
                }
                catch (t) {
                    throw e;
                }
            throw e;
        } }, e.prototype.optionInternalRecord = function (e, t) { return sn.call(this, pe, e, t); }, e.prototype.atLeastOneInternalRecord = function (e, t) { sn.call(this, he, t, e); }, e.prototype.atLeastOneSepFirstInternalRecord = function (e, t) { sn.call(this, de, t, e, !0); }, e.prototype.manyInternalRecord = function (e, t) { sn.call(this, ye, t, e); }, e.prototype.manySepFirstInternalRecord = function (e, t) { sn.call(this, ge, t, e, !0); }, e.prototype.orInternalRecord = function (e, t) { return cn.call(this, e, t); }, e.prototype.subruleInternalRecord = function (e, t, n) { if (ln(t), !e || !1 === (0, o.e$)(e, "ruleName")) {
            var r = new Error("<SUBRULE" + un(t) + "> argument is invalid expecting a Parser method reference but got: <" + JSON.stringify(e) + ">\n inside top level rule: <" + this.recordingProdStack[0].name + ">");
            throw r.KNOWN_RECORDER_ERROR = !0, r;
        } var i = (0, o.fj)(this.recordingProdStack), a = e.ruleName, s = new ue({ idx: t, nonTerminalName: a, referencedRule: void 0 }); return i.definition.push(s), this.outputCst ? on : en; }, e.prototype.consumeInternalRecord = function (e, t, n) { if (ln(t), !K(e)) {
            var r = new Error("<CONSUME" + un(t) + "> argument is invalid expecting a TokenType reference but got: <" + JSON.stringify(e) + ">\n inside top level rule: <" + this.recordingProdStack[0].name + ">");
            throw r.KNOWN_RECORDER_ERROR = !0, r;
        } var i = (0, o.fj)(this.recordingProdStack), a = new ve({ idx: t, terminalType: e }); return i.definition.push(a), rn; }, e; }();
        function sn(e, t, n, r) { void 0 === r && (r = !1), ln(n); var i = (0, o.fj)(this.recordingProdStack), a = (0, o.mf)(t) ? t : t.DEF, s = new e({ definition: [], idx: n }); return r && (s.separator = t.SEP), (0, o.e$)(t, "MAX_LOOKAHEAD") && (s.maxLookahead = t.MAX_LOOKAHEAD), this.recordingProdStack.push(s), a.call(this), i.definition.push(s), this.recordingProdStack.pop(), en; }
        function cn(e, t) { var n = this; ln(t); var r = (0, o.fj)(this.recordingProdStack), i = !1 === (0, o.kJ)(e), a = !1 === i ? e : e.DEF, s = new me({ definition: [], idx: t, ignoreAmbiguities: i && !0 === e.IGNORE_AMBIGUITIES }); (0, o.e$)(e, "MAX_LOOKAHEAD") && (s.maxLookahead = e.MAX_LOOKAHEAD); var c = (0, o.G)(a, (function (e) { return (0, o.mf)(e.GATE); })); return s.hasPredicates = c, r.definition.push(s), (0, o.Ed)(a, (function (e) { var t = new fe({ definition: [] }); s.definition.push(t), (0, o.e$)(e, "IGNORE_AMBIGUITIES") ? t.ignoreAmbiguities = e.IGNORE_AMBIGUITIES : (0, o.e$)(e, "GATE") && (t.ignoreAmbiguities = !0), n.recordingProdStack.push(t), e.ALT.call(n), n.recordingProdStack.pop(); })), en; }
        function un(e) { return 0 === e ? "" : "" + e; }
        function ln(e) { if (e < 0 || e > tn) {
            var t = new Error("Invalid DSL Method idx value: <" + e + ">\n\tIdx value must be a none negative value smaller than " + (tn + 1));
            throw t.KNOWN_RECORDER_ERROR = !0, t;
        } }
        var fn = n(3716), pn = function () { function e() { } return e.prototype.initPerformanceTracer = function (e) { if ((0, o.e$)(e, "traceInitPerf")) {
            var t = e.traceInitPerf, n = "number" == typeof t;
            this.traceInitMaxIdent = n ? t : 1 / 0, this.traceInitPerf = n ? t > 0 : t;
        }
        else
            this.traceInitMaxIdent = 0, this.traceInitPerf = gn.traceInitPerf; this.traceInitIndent = -1; }, e.prototype.TRACE_INIT = function (e, t) { if (!0 === this.traceInitPerf) {
            this.traceInitIndent++;
            var n = new Array(this.traceInitIndent + 1).join("\t");
            this.traceInitIndent < this.traceInitMaxIdent && fn.log(n + "--\x3e <" + e + ">");
            var r = (0, o.HT)(t), i = r.time, a = r.value, s = i > 10 ? fn.warn : fn.log;
            return this.traceInitIndent < this.traceInitMaxIdent && s(n + "<-- <" + e + "> time: " + i + "ms"), this.traceInitIndent--, a;
        } return t(); }, e; }(), hn = function () { var e = function (t, n) { return e = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (e, t) { e.__proto__ = t; } || function (e, t) { for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]); }, e(t, n); }; return function (t, n) { function r() { this.constructor = t; } e(t, n), t.prototype = null === n ? Object.create(n) : (r.prototype = n.prototype, new r); }; }(), dn = ie(oe, "", NaN, NaN, NaN, NaN, NaN, NaN);
        Object.freeze(dn);
        var yn, gn = Object.freeze({ recoveryEnabled: !1, maxLookahead: 3, dynamicTokensEnabled: !1, outputCst: !0, errorMessageProvider: Ie, nodeLocationTracking: "none", traceInitPerf: !1, skipValidations: !1 }), mn = Object.freeze({ recoveryValueFunc: function () { }, resyncEnabled: !0 });
        function vn(e) { return void 0 === e && (e = void 0), function () { return e; }; }
        !function (e) { e[e.INVALID_RULE_NAME = 0] = "INVALID_RULE_NAME", e[e.DUPLICATE_RULE_NAME = 1] = "DUPLICATE_RULE_NAME", e[e.INVALID_RULE_OVERRIDE = 2] = "INVALID_RULE_OVERRIDE", e[e.DUPLICATE_PRODUCTIONS = 3] = "DUPLICATE_PRODUCTIONS", e[e.UNRESOLVED_SUBRULE_REF = 4] = "UNRESOLVED_SUBRULE_REF", e[e.LEFT_RECURSION = 5] = "LEFT_RECURSION", e[e.NONE_LAST_EMPTY_ALT = 6] = "NONE_LAST_EMPTY_ALT", e[e.AMBIGUOUS_ALTS = 7] = "AMBIGUOUS_ALTS", e[e.CONFLICT_TOKENS_RULES_NAMESPACE = 8] = "CONFLICT_TOKENS_RULES_NAMESPACE", e[e.INVALID_TOKEN_NAME = 9] = "INVALID_TOKEN_NAME", e[e.NO_NON_EMPTY_LOOKAHEAD = 10] = "NO_NON_EMPTY_LOOKAHEAD", e[e.AMBIGUOUS_PREFIX_ALTS = 11] = "AMBIGUOUS_PREFIX_ALTS", e[e.TOO_MANY_ALTS = 12] = "TOO_MANY_ALTS"; }(yn || (yn = {}));
        var bn = function () { function e(e, t) { this.definitionErrors = [], this.selfAnalysisDone = !1; var n = this; if (n.initErrorHandler(t), n.initLexerAdapter(), n.initLooksAhead(t), n.initRecognizerEngine(e, t), n.initRecoverable(t), n.initTreeBuilder(t), n.initContentAssist(), n.initGastRecorder(t), n.initPerformanceTracer(t), (0, o.e$)(t, "ignoredIssues"))
            throw new Error("The <ignoredIssues> IParserConfig property has been deprecated.\n\tPlease use the <IGNORE_AMBIGUITIES> flag on the relevant DSL method instead.\n\tSee: https://sap.github.io/chevrotain/docs/guide/resolving_grammar_errors.html#IGNORING_AMBIGUITIES\n\tFor further details."); this.skipValidations = (0, o.e$)(t, "skipValidations") ? t.skipValidations : gn.skipValidations; } return e.performSelfAnalysis = function (e) { throw Error("The **static** `performSelfAnalysis` method has been deprecated.\t\nUse the **instance** method with the same name instead."); }, e.prototype.performSelfAnalysis = function () { var t = this; this.TRACE_INIT("performSelfAnalysis", (function () { var n; t.selfAnalysisDone = !0; var r = t.className; t.TRACE_INIT("toFastProps", (function () { (0, o.SV)(t); })), t.TRACE_INIT("Grammar Recording", (function () { try {
            t.enableRecording(), (0, o.Ed)(t.definedRulesNames, (function (e) { var n = t[e].originalGrammarAction, r = void 0; t.TRACE_INIT(e + " Rule", (function () { r = t.topLevelRuleRecord(e, n); })), t.gastProductionsCache[e] = r; }));
        }
        finally {
            t.disableRecording();
        } })); var i = []; if (t.TRACE_INIT("Grammar Resolving", (function () { i = yt({ rules: (0, o.VO)(t.gastProductionsCache) }), t.definitionErrors.push.apply(t.definitionErrors, i); })), t.TRACE_INIT("Grammar Validations", (function () { if ((0, o.xb)(i) && !1 === t.skipValidations) {
            var e = gt({ rules: (0, o.VO)(t.gastProductionsCache), maxLookahead: t.maxLookahead, tokenTypes: (0, o.VO)(t.tokensMap), errMsgProvider: Le, grammarName: r });
            t.definitionErrors.push.apply(t.definitionErrors, e);
        } })), (0, o.xb)(t.definitionErrors) && (t.recoveryEnabled && t.TRACE_INIT("computeAllProdsFollows", (function () { var e, n, r = (e = (0, o.VO)(t.gastProductionsCache), n = {}, (0, o.Ed)(e, (function (e) { var t = new Pe(e).startWalking(); (0, o.f0)(n, t); })), n); t.resyncFollows = r; })), t.TRACE_INIT("ComputeLookaheadFunctions", (function () { t.preComputeLookaheadFunctions((0, o.VO)(t.gastProductionsCache)); }))), !e.DEFER_DEFINITION_ERRORS_HANDLING && !(0, o.xb)(t.definitionErrors))
            throw n = (0, o.UI)(t.definitionErrors, (function (e) { return e.message; })), new Error("Parser Definition Errors detected:\n " + n.join("\n-------------------------------\n")); })); }, e.DEFER_DEFINITION_ERRORS_HANDLING = !1, e; }();
        (0, o.ef)(bn, [It, Ft, zt, Xt, Jt, Yt, Qt, Zt, an, pn]);
        var Tn = function (e) { function t(t, n) { void 0 === n && (n = gn); var r = (0, o.Cl)(n); return r.outputCst = !0, e.call(this, t, r) || this; } return hn(t, e), t; }(bn), En = function (e) { function t(t, n) { void 0 === n && (n = gn); var r = (0, o.Cl)(n); return r.outputCst = !1, e.call(this, t, r) || this; } return hn(t, e), t; }(bn);
        function _n(e, t) { var n = void 0 === t ? {} : t, o = n.resourceBase, i = void 0 === o ? "https://unpkg.com/chevrotain@" + r + "/diagrams/" : o, a = n.css; return "\n\x3c!-- This is a generated file --\x3e\n<!DOCTYPE html>\n<meta charset=\"utf-8\">\n<style>\n  body {\n    background-color: hsl(30, 20%, 95%)\n  }\n</style>\n\n\n<link rel='stylesheet' href='" + (void 0 === a ? "https://unpkg.com/chevrotain@" + r + "/diagrams/diagrams.css" : a) + "'>\n\n<script src='" + i + "vendor/railroad-diagrams.js'><\/script>\n<script src='" + i + "src/diagrams_builder.js'><\/script>\n<script src='" + i + "src/diagrams_behavior.js'><\/script>\n<script src='" + i + 'src/main.js\'><\/script>\n\n<div id="diagrams" align="center"></div>    \n\n<script>\n    window.serializedGrammar = ' + JSON.stringify(e, null, "  ") + ';\n<\/script>\n\n<script>\n    var diagramsDiv = document.getElementById("diagrams");\n    main.drawDiagramsFromSerializedGrammar(serializedGrammar, diagramsDiv);\n<\/script>\n'; }
        var Rn = "\n";
        function Sn(e) { var t; return "\nfunction " + e.name + "(tokenVocabulary, config) {\n    // invoke super constructor\n    // No support for embedded actions currently, so we can 'hardcode'\n    // The use of CstParser.\n    chevrotain.CstParser.call(this, tokenVocabulary, config)\n\n    const $ = this\n\n    " + (t = e.rules, (0, o.UI)(t, (function (e) { return n = wn(1, '$.RULE("' + (t = e).name + '", function() {') + Rn, (n += kn(t.definition, 2)) + (wn(2, "})") + Rn); var t, n; })).join("\n") + "\n\n    // very important to call this after all the rules have been defined.\n    // otherwise the parser may not work correctly as it will lack information\n    // derived during the self analysis phase.\n    this.performSelfAnalysis(this)\n}\n\n// inheritance as implemented in javascript in the previous decade... :(\n") + e.name + ".prototype = Object.create(chevrotain.CstParser.prototype)\n" + e.name + ".prototype.constructor = " + e.name + "    \n    "; }
        function On(e, t) { if (e instanceof ue)
            return function (e, t) { return wn(t, "$.SUBRULE" + e.idx + "($." + e.nonTerminalName + ")" + Rn); }(e, t); if (e instanceof pe)
            return An("OPTION", e, t); if (e instanceof he)
            return An("AT_LEAST_ONE", e, t); if (e instanceof de)
            return An("AT_LEAST_ONE_SEP", e, t); if (e instanceof ge)
            return An("MANY_SEP", e, t); if (e instanceof ye)
            return An("MANY", e, t); if (e instanceof me)
            return function (e, t) { var n = wn(t, "$.OR" + e.idx + "([") + Rn, r = (0, o.UI)(e.definition, (function (e) { return function (e, t) { var n = wn(t, "{") + Rn; return n += wn(t + 1, "ALT: function() {") + Rn, n += kn(e.definition, t + 1), (n += wn(t + 1, "}") + Rn) + wn(t, "}"); }(e, t + 1); })); return (n += r.join(",\n")) + (Rn + wn(t, "])\n")); }(e, t); if (e instanceof ve)
            return function (e, t) { var n = e.terminalType.name; return wn(t, "$.CONSUME" + e.idx + "(this.tokensMap." + n + ")" + Rn); }(e, t); if (e instanceof fe)
            return kn(e.definition, t); throw Error("non exhaustive match"); }
        function An(e, t, n) { var r = wn(n, "$." + (e + t.idx) + "("); return t.separator ? (r += "{\n", r += wn(n + 1, "SEP: this.tokensMap." + t.separator.name) + "," + Rn, r += "DEF: " + Nn(t.definition, n + 2) + Rn, r += wn(n, "}") + Rn) : r += Nn(t.definition, n + 1), r + (wn(n, ")") + Rn); }
        function Nn(e, t) { var n = "function() {\n"; return (n += kn(e, t)) + (wn(t, "}") + Rn); }
        function kn(e, t) { var n = ""; return (0, o.Ed)(e, (function (e) { n += On(e, t + 1); })), n; }
        function wn(e, t) { return Array(4 * e + 1).join(" ") + t; }
        function xn(e) { var t = function (e) { return "    \n" + Sn(e) + "\nreturn new " + e.name + "(tokenVocabulary, config)    \n"; }({ name: e.name, rules: e.rules }), r = new Function("tokenVocabulary", "config", "chevrotain", t); return function (t) { return r(e.tokenVocabulary, t, n(3877)); }; }
        function Cn(e) { return function (e) { return "\n(function (root, factory) {\n    if (typeof define === 'function' && define.amd) {\n        // AMD. Register as an anonymous module.\n        define(['chevrotain'], factory);\n    } else if (typeof module === 'object' && module.exports) {\n        // Node. Does not work with strict CommonJS, but\n        // only CommonJS-like environments that support module.exports,\n        // like Node.\n        module.exports = factory(require('chevrotain'));\n    } else {\n        // Browser globals (root is window)\n        root.returnExports = factory(root.b);\n    }\n}(typeof self !== 'undefined' ? self : this, function (chevrotain) {\n\n" + Sn(e) + "\n    \nreturn {\n    " + e.name + ": " + e.name + " \n}\n}));\n"; }({ name: e.name, rules: e.rules }); }
        var Pn = n(3716);
        function In() { Pn.warn("The clearCache function was 'soft' removed from the Chevrotain API.\n\t It performs no action other than printing this message.\n\t Please avoid using it as it will be completely removed in the future"); }
        var Dn = function () { throw new Error("The Parser class has been deprecated, use CstParser or EmbeddedActionsParser instead.\t\nSee: https://sap.github.io/chevrotain/docs/changes/BREAKING_CHANGES.html#_7-0-0"); };
    }, 1481: (e, t, n) => {
        "use strict";
        n.d(t, { Cl: () => S, Cw: () => g, Ed: () => p, G: () => L, HD: () => h, HT: () => J, Kj: () => C, Kn: () => P, Oq: () => A, Ps: () => l, Q8: () => s, Qw: () => R, SV: () => X, TS: () => W, UI: () => c, VO: () => a, WB: () => V, Wd: () => $, X0: () => H, XP: () => i, Z$: () => f, ce: () => F, cq: () => M, d1: () => b, dG: () => B, dU: () => G, e$: () => E, e5: () => D, ef: () => z, ei: () => T, f0: () => j, fj: () => Y, hX: () => v, j7: () => m, jj: () => w, kJ: () => x, mf: () => y, o8: () => d, oA: () => k, r3: () => _, rr: () => K, sE: () => O, u4: () => N, vM: () => q, xH: () => u, xb: () => o, yW: () => I });
        var r = n(3716);
        function o(e) { return e && 0 === e.length; }
        function i(e) { return null == e ? [] : Object.keys(e); }
        function a(e) { for (var t = [], n = Object.keys(e), r = 0; r < n.length; r++)
            t.push(e[n[r]]); return t; }
        function s(e, t) { for (var n = [], r = i(e), o = 0; o < r.length; o++) {
            var a = r[o];
            n.push(t.call(null, e[a], a));
        } return n; }
        function c(e, t) { for (var n = [], r = 0; r < e.length; r++)
            n.push(t.call(null, e[r], r)); return n; }
        function u(e) { for (var t = [], n = 0; n < e.length; n++) {
            var r = e[n];
            Array.isArray(r) ? t = t.concat(u(r)) : t.push(r);
        } return t; }
        function l(e) { return o(e) ? void 0 : e[0]; }
        function f(e) { var t = e && e.length; return t ? e[t - 1] : void 0; }
        function p(e, t) { if (Array.isArray(e))
            for (var n = 0; n < e.length; n++)
                t.call(null, e[n], n);
        else {
            if (!P(e))
                throw Error("non exhaustive match");
            var r = i(e);
            for (n = 0; n < r.length; n++) {
                var o = r[n], a = e[o];
                t.call(null, a, o);
            }
        } }
        function h(e) { return "string" == typeof e; }
        function d(e) { return void 0 === e; }
        function y(e) { return e instanceof Function; }
        function g(e, t) { return void 0 === t && (t = 1), e.slice(t, e.length); }
        function m(e, t) { return void 0 === t && (t = 1), e.slice(0, e.length - t); }
        function v(e, t) { var n = []; if (Array.isArray(e))
            for (var r = 0; r < e.length; r++) {
                var o = e[r];
                t.call(null, o) && n.push(o);
            } return n; }
        function b(e, t) { return v(e, (function (e) { return !t(e); })); }
        function T(e, t) { for (var n = Object.keys(e), r = {}, o = 0; o < n.length; o++) {
            var i = n[o], a = e[i];
            t(a) && (r[i] = a);
        } return r; }
        function E(e, t) { return !!P(e) && e.hasOwnProperty(t); }
        function _(e, t) { return void 0 !== O(e, (function (e) { return e === t; })); }
        function R(e) { for (var t = [], n = 0; n < e.length; n++)
            t.push(e[n]); return t; }
        function S(e) { var t = {}; for (var n in e)
            Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]); return t; }
        function O(e, t) { for (var n = 0; n < e.length; n++) {
            var r = e[n];
            if (t.call(null, r))
                return r;
        } }
        function A(e, t) { for (var n = [], r = 0; r < e.length; r++) {
            var o = e[r];
            t.call(null, o) && n.push(o);
        } return n; }
        function N(e, t, n) { for (var r = Array.isArray(e), o = r ? e : a(e), s = r ? [] : i(e), c = n, u = 0; u < o.length; u++)
            c = t.call(null, c, o[u], r ? u : s[u]); return c; }
        function k(e) { return b(e, (function (e) { return null == e; })); }
        function w(e, t) { void 0 === t && (t = function (e) { return e; }); var n = []; return N(e, (function (e, r) { var o = t(r); return _(n, o) ? e : (n.push(o), e.concat(r)); }), []); }
        function x(e) { return Array.isArray(e); }
        function C(e) { return e instanceof RegExp; }
        function P(e) { return e instanceof Object; }
        function I(e, t) { for (var n = 0; n < e.length; n++)
            if (!t(e[n], n))
                return !1; return !0; }
        function D(e, t) { return b(e, (function (e) { return _(t, e); })); }
        function L(e, t) { for (var n = 0; n < e.length; n++)
            if (t(e[n]))
                return !0; return !1; }
        function M(e, t) { for (var n = 0; n < e.length; n++)
            if (e[n] === t)
                return n; return -1; }
        function j(e) { for (var t = [], n = 1; n < arguments.length; n++)
            t[n - 1] = arguments[n]; for (var r = 0; r < t.length; r++)
            for (var o = t[r], a = i(o), s = 0; s < a.length; s++) {
                var c = a[s];
                e[c] = o[c];
            } return e; }
        function U(e) { for (var t = [], n = 1; n < arguments.length; n++)
            t[n - 1] = arguments[n]; for (var r = 0; r < t.length; r++)
            for (var o = t[r], a = i(o), s = 0; s < a.length; s++) {
                var c = a[s];
                E(e, c) || (e[c] = o[c]);
            } return e; }
        function F() { for (var e = [], t = 0; t < arguments.length; t++)
            e[t] = arguments[t]; return U.apply(null, [{}].concat(e)); }
        function q(e, t) { var n = {}; return p(e, (function (e) { var r = t(e), o = n[r]; o ? o.push(e) : n[r] = [e]; })), n; }
        function W(e, t) { for (var n = S(e), r = i(t), o = 0; o < r.length; o++) {
            var a = r[o], s = t[a];
            n[a] = s;
        } return n; }
        function B() { }
        function $(e) { return e; }
        function H(e) { for (var t = [], n = 0; n < e.length; n++) {
            var r = e[n];
            t.push(void 0 !== r ? r : void 0);
        } return t; }
        function V(e) { r && r.error && r.error("Error: " + e); }
        function K(e) { r && r.warn && r.warn("Warning: " + e); }
        function G() { return "function" == typeof Map; }
        function z(e, t) { t.forEach((function (t) { var n = t.prototype; Object.getOwnPropertyNames(n).forEach((function (r) { if ("constructor" !== r) {
            var o = Object.getOwnPropertyDescriptor(n, r);
            o && (o.get || o.set) ? Object.defineProperty(e.prototype, r, o) : e.prototype[r] = t.prototype[r];
        } })); })); }
        function X(e) { function t() { } t.prototype = e; var n = new t; function r() { return typeof n.bar; } return r(), r(), e; }
        function Y(e) { return e[e.length - 1]; }
        function J(e) { var t = (new Date).getTime(), n = e(); return { time: (new Date).getTime() - t, value: n }; }
    }, 3716: (e, t, n) => { var r = n(3335), o = n(1696); function i() { return (new Date).getTime(); } var a, s = Array.prototype.slice, c = {}; a = void 0 !== n.g && n.g.console ? n.g.console : "undefined" != typeof window && window.console ? window.console : {}; for (var u = [[function () { }, "log"], [function () { a.log.apply(a, arguments); }, "info"], [function () { a.log.apply(a, arguments); }, "warn"], [function () { a.warn.apply(a, arguments); }, "error"], [function (e) { c[e] = i(); }, "time"], [function (e) { var t = c[e]; if (!t)
                throw new Error("No such label: " + e); delete c[e]; var n = i() - t; a.log(e + ": " + n + "ms"); }, "timeEnd"], [function () { var e = new Error; e.name = "Trace", e.message = r.format.apply(null, arguments), a.error(e.stack); }, "trace"], [function (e) { a.log(r.inspect(e) + "\n"); }, "dir"], [function (e) { if (!e) {
                var t = s.call(arguments, 1);
                o.ok(!1, r.format.apply(null, t));
            } }, "assert"]], l = 0; l < u.length; l++) {
        var f = u[l], p = f[0], h = f[1];
        a[h] || (a[h] = p);
    } e.exports = a; }, 4926: (e, t, n) => {
        "use strict";
        var r = n(3464), o = "function" == typeof Symbol && "symbol" == typeof Symbol("foo"), i = Object.prototype.toString, a = Array.prototype.concat, s = Object.defineProperty, c = n(1181)(), u = s && c, l = function (e, t, n, r) { if (t in e)
            if (!0 === r) {
                if (e[t] === n)
                    return;
            }
            else if ("function" != typeof (o = r) || "[object Function]" !== i.call(o) || !r())
                return; var o; u ? s(e, t, { configurable: !0, enumerable: !1, value: n, writable: !0 }) : e[t] = n; }, f = function (e, t) { var n = arguments.length > 2 ? arguments[2] : {}, i = r(t); o && (i = a.call(i, Object.getOwnPropertySymbols(t))); for (var s = 0; s < i.length; s += 1)
            l(e, i[s], t[i[s]], n[i[s]]); };
        f.supportsDescriptors = !!u, e.exports = f;
    }, 4956: e => {
        "use strict";
        function t(e, t) { if (null == e)
            throw new TypeError("Cannot convert first argument to object"); for (var n = Object(e), r = 1; r < arguments.length; r++) {
            var o = arguments[r];
            if (null != o)
                for (var i = Object.keys(Object(o)), a = 0, s = i.length; a < s; a++) {
                    var c = i[a], u = Object.getOwnPropertyDescriptor(o, c);
                    void 0 !== u && u.enumerable && (n[c] = o[c]);
                }
        } return n; }
        e.exports = { assign: t, polyfill: function () { Object.assign || Object.defineProperty(Object, "assign", { enumerable: !1, configurable: !0, writable: !0, value: t }); } };
    }, 3243: (e, t, n) => {
        "use strict";
        var r = n(9680), o = Object.prototype.toString, i = Object.prototype.hasOwnProperty, a = function (e, t, n) { for (var r = 0, o = e.length; r < o; r++)
            i.call(e, r) && (null == n ? t(e[r], r, e) : t.call(n, e[r], r, e)); }, s = function (e, t, n) { for (var r = 0, o = e.length; r < o; r++)
            null == n ? t(e.charAt(r), r, e) : t.call(n, e.charAt(r), r, e); }, c = function (e, t, n) { for (var r in e)
            i.call(e, r) && (null == n ? t(e[r], r, e) : t.call(n, e[r], r, e)); };
        e.exports = function (e, t, n) { if (!r(t))
            throw new TypeError("iterator must be a function"); var i; arguments.length >= 3 && (i = n), "[object Array]" === o.call(e) ? a(e, t, i) : "string" == typeof e ? s(e, t, i) : c(e, t, i); };
    }, 7795: e => {
        "use strict";
        var t = "Function.prototype.bind called on incompatible ", n = Array.prototype.slice, r = Object.prototype.toString, o = "[object Function]";
        e.exports = function (e) { var i = this; if ("function" != typeof i || r.call(i) !== o)
            throw new TypeError(t + i); for (var a, s = n.call(arguments, 1), c = function () { if (this instanceof a) {
            var t = i.apply(this, s.concat(n.call(arguments)));
            return Object(t) === t ? t : this;
        } return i.apply(e, s.concat(n.call(arguments))); }, u = Math.max(0, i.length - s.length), l = [], f = 0; f < u; f++)
            l.push("$" + f); if (a = Function("binder", "return function (" + l.join(",") + "){ return binder.apply(this,arguments); }")(c), i.prototype) {
            var p = function () { };
            p.prototype = i.prototype, a.prototype = new p, p.prototype = null;
        } return a; };
    }, 4090: (e, t, n) => {
        "use strict";
        var r = n(7795);
        e.exports = Function.prototype.bind || r;
    }, 7286: (e, t, n) => {
        "use strict";
        var r, o = SyntaxError, i = Function, a = TypeError, s = function (e) { try {
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
        } }() : u, f = n(2636)(), p = Object.getPrototypeOf || function (e) { return e.__proto__; }, h = {}, d = "undefined" == typeof Uint8Array ? r : p(Uint8Array), y = { "%AggregateError%": "undefined" == typeof AggregateError ? r : AggregateError, "%Array%": Array, "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? r : ArrayBuffer, "%ArrayIteratorPrototype%": f ? p([][Symbol.iterator]()) : r, "%AsyncFromSyncIteratorPrototype%": r, "%AsyncFunction%": h, "%AsyncGenerator%": h, "%AsyncGeneratorFunction%": h, "%AsyncIteratorPrototype%": h, "%Atomics%": "undefined" == typeof Atomics ? r : Atomics, "%BigInt%": "undefined" == typeof BigInt ? r : BigInt, "%Boolean%": Boolean, "%DataView%": "undefined" == typeof DataView ? r : DataView, "%Date%": Date, "%decodeURI%": decodeURI, "%decodeURIComponent%": decodeURIComponent, "%encodeURI%": encodeURI, "%encodeURIComponent%": encodeURIComponent, "%Error%": Error, "%eval%": eval, "%EvalError%": EvalError, "%Float32Array%": "undefined" == typeof Float32Array ? r : Float32Array, "%Float64Array%": "undefined" == typeof Float64Array ? r : Float64Array, "%FinalizationRegistry%": "undefined" == typeof FinalizationRegistry ? r : FinalizationRegistry, "%Function%": i, "%GeneratorFunction%": h, "%Int8Array%": "undefined" == typeof Int8Array ? r : Int8Array, "%Int16Array%": "undefined" == typeof Int16Array ? r : Int16Array, "%Int32Array%": "undefined" == typeof Int32Array ? r : Int32Array, "%isFinite%": isFinite, "%isNaN%": isNaN, "%IteratorPrototype%": f ? p(p([][Symbol.iterator]())) : r, "%JSON%": "object" == typeof JSON ? JSON : r, "%Map%": "undefined" == typeof Map ? r : Map, "%MapIteratorPrototype%": "undefined" != typeof Map && f ? p((new Map)[Symbol.iterator]()) : r, "%Math%": Math, "%Number%": Number, "%Object%": Object, "%parseFloat%": parseFloat, "%parseInt%": parseInt, "%Promise%": "undefined" == typeof Promise ? r : Promise, "%Proxy%": "undefined" == typeof Proxy ? r : Proxy, "%RangeError%": RangeError, "%ReferenceError%": ReferenceError, "%Reflect%": "undefined" == typeof Reflect ? r : Reflect, "%RegExp%": RegExp, "%Set%": "undefined" == typeof Set ? r : Set, "%SetIteratorPrototype%": "undefined" != typeof Set && f ? p((new Set)[Symbol.iterator]()) : r, "%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? r : SharedArrayBuffer, "%String%": String, "%StringIteratorPrototype%": f ? p(""[Symbol.iterator]()) : r, "%Symbol%": f ? Symbol : r, "%SyntaxError%": o, "%ThrowTypeError%": l, "%TypedArray%": d, "%TypeError%": a, "%Uint8Array%": "undefined" == typeof Uint8Array ? r : Uint8Array, "%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? r : Uint8ClampedArray, "%Uint16Array%": "undefined" == typeof Uint16Array ? r : Uint16Array, "%Uint32Array%": "undefined" == typeof Uint32Array ? r : Uint32Array, "%URIError%": URIError, "%WeakMap%": "undefined" == typeof WeakMap ? r : WeakMap, "%WeakRef%": "undefined" == typeof WeakRef ? r : WeakRef, "%WeakSet%": "undefined" == typeof WeakSet ? r : WeakSet }, g = function e(t) { var n; if ("%AsyncFunction%" === t)
            n = s("async function () {}");
        else if ("%GeneratorFunction%" === t)
            n = s("function* () {}");
        else if ("%AsyncGeneratorFunction%" === t)
            n = s("async function* () {}");
        else if ("%AsyncGenerator%" === t) {
            var r = e("%AsyncGeneratorFunction%");
            r && (n = r.prototype);
        }
        else if ("%AsyncIteratorPrototype%" === t) {
            var o = e("%AsyncGenerator%");
            o && (n = p(o.prototype));
        } return y[t] = n, n; }, m = { "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"], "%ArrayPrototype%": ["Array", "prototype"], "%ArrayProto_entries%": ["Array", "prototype", "entries"], "%ArrayProto_forEach%": ["Array", "prototype", "forEach"], "%ArrayProto_keys%": ["Array", "prototype", "keys"], "%ArrayProto_values%": ["Array", "prototype", "values"], "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"], "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"], "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"], "%BooleanPrototype%": ["Boolean", "prototype"], "%DataViewPrototype%": ["DataView", "prototype"], "%DatePrototype%": ["Date", "prototype"], "%ErrorPrototype%": ["Error", "prototype"], "%EvalErrorPrototype%": ["EvalError", "prototype"], "%Float32ArrayPrototype%": ["Float32Array", "prototype"], "%Float64ArrayPrototype%": ["Float64Array", "prototype"], "%FunctionPrototype%": ["Function", "prototype"], "%Generator%": ["GeneratorFunction", "prototype"], "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"], "%Int8ArrayPrototype%": ["Int8Array", "prototype"], "%Int16ArrayPrototype%": ["Int16Array", "prototype"], "%Int32ArrayPrototype%": ["Int32Array", "prototype"], "%JSONParse%": ["JSON", "parse"], "%JSONStringify%": ["JSON", "stringify"], "%MapPrototype%": ["Map", "prototype"], "%NumberPrototype%": ["Number", "prototype"], "%ObjectPrototype%": ["Object", "prototype"], "%ObjProto_toString%": ["Object", "prototype", "toString"], "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"], "%PromisePrototype%": ["Promise", "prototype"], "%PromiseProto_then%": ["Promise", "prototype", "then"], "%Promise_all%": ["Promise", "all"], "%Promise_reject%": ["Promise", "reject"], "%Promise_resolve%": ["Promise", "resolve"], "%RangeErrorPrototype%": ["RangeError", "prototype"], "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"], "%RegExpPrototype%": ["RegExp", "prototype"], "%SetPrototype%": ["Set", "prototype"], "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"], "%StringPrototype%": ["String", "prototype"], "%SymbolPrototype%": ["Symbol", "prototype"], "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"], "%TypedArrayPrototype%": ["TypedArray", "prototype"], "%TypeErrorPrototype%": ["TypeError", "prototype"], "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"], "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"], "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"], "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"], "%URIErrorPrototype%": ["URIError", "prototype"], "%WeakMapPrototype%": ["WeakMap", "prototype"], "%WeakSetPrototype%": ["WeakSet", "prototype"] }, v = n(4090), b = n(3198), T = v.call(Function.call, Array.prototype.concat), E = v.call(Function.apply, Array.prototype.splice), _ = v.call(Function.call, String.prototype.replace), R = v.call(Function.call, String.prototype.slice), S = v.call(Function.call, RegExp.prototype.exec), O = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, A = /\\(\\)?/g, N = function (e) { var t = R(e, 0, 1), n = R(e, -1); if ("%" === t && "%" !== n)
            throw new o("invalid intrinsic syntax, expected closing `%`"); if ("%" === n && "%" !== t)
            throw new o("invalid intrinsic syntax, expected opening `%`"); var r = []; return _(e, O, (function (e, t, n, o) { r[r.length] = n ? _(o, A, "$1") : t || e; })), r; }, k = function (e, t) { var n, r = e; if (b(m, r) && (r = "%" + (n = m[r])[0] + "%"), b(y, r)) {
            var i = y[r];
            if (i === h && (i = g(r)), void 0 === i && !t)
                throw new a("intrinsic " + e + " exists, but is not available. Please file an issue!");
            return { alias: n, name: r, value: i };
        } throw new o("intrinsic " + e + " does not exist!"); };
        e.exports = function (e, t) { if ("string" != typeof e || 0 === e.length)
            throw new a("intrinsic name must be a non-empty string"); if (arguments.length > 1 && "boolean" != typeof t)
            throw new a('"allowMissing" argument must be a boolean'); if (null === S(/^%?[^%]*%?$/, e))
            throw new o("`%` may not be present anywhere but at the beginning and end of the intrinsic name"); var n = N(e), r = n.length > 0 ? n[0] : "", i = k("%" + r + "%", t), s = i.name, u = i.value, l = !1, f = i.alias; f && (r = f[0], E(n, T([0, 1], f))); for (var p = 1, h = !0; p < n.length; p += 1) {
            var d = n[p], g = R(d, 0, 1), m = R(d, -1);
            if (('"' === g || "'" === g || "`" === g || '"' === m || "'" === m || "`" === m) && g !== m)
                throw new o("property names with quotes must have matching quotes");
            if ("constructor" !== d && h || (l = !0), b(y, s = "%" + (r += "." + d) + "%"))
                u = y[s];
            else if (null != u) {
                if (!(d in u)) {
                    if (!t)
                        throw new a("base intrinsic for " + e + " exists, but the property is not available.");
                    return;
                }
                if (c && p + 1 >= n.length) {
                    var v = c(u, d);
                    u = (h = !!v) && "get" in v && !("originalValue" in v.get) ? v.get : u[d];
                }
                else
                    h = b(u, d), u = u[d];
                h && !l && (y[s] = u);
            }
        } return u; };
    }, 326: (e, t, n) => {
        "use strict";
        var r = n(7286)("%Object.getOwnPropertyDescriptor%", !0);
        if (r)
            try {
                r([], "length");
            }
            catch (e) {
                r = null;
            }
        e.exports = r;
    }, 1181: (e, t, n) => {
        "use strict";
        var r = n(7286)("%Object.defineProperty%", !0), o = function () { if (r)
            try {
                return r({}, "a", { value: 1 }), !0;
            }
            catch (e) {
                return !1;
            } return !1; };
        o.hasArrayLengthDefineBug = function () { if (!o())
            return null; try {
            return 1 !== r([], "length", { value: 1 }).length;
        }
        catch (e) {
            return !0;
        } }, e.exports = o;
    }, 2636: (e, t, n) => {
        "use strict";
        var r = "undefined" != typeof Symbol && Symbol, o = n(6679);
        e.exports = function () { return "function" == typeof r && "function" == typeof Symbol && "symbol" == typeof r("foo") && "symbol" == typeof Symbol("bar") && o(); };
    }, 6679: e => {
        "use strict";
        e.exports = function () { if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols)
            return !1; if ("symbol" == typeof Symbol.iterator)
            return !0; var e = {}, t = Symbol("test"), n = Object(t); if ("string" == typeof t)
            return !1; if ("[object Symbol]" !== Object.prototype.toString.call(t))
            return !1; if ("[object Symbol]" !== Object.prototype.toString.call(n))
            return !1; for (t in e[t] = 42, e)
            return !1; if ("function" == typeof Object.keys && 0 !== Object.keys(e).length)
            return !1; if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(e).length)
            return !1; var r = Object.getOwnPropertySymbols(e); if (1 !== r.length || r[0] !== t)
            return !1; if (!Object.prototype.propertyIsEnumerable.call(e, t))
            return !1; if ("function" == typeof Object.getOwnPropertyDescriptor) {
            var o = Object.getOwnPropertyDescriptor(e, t);
            if (42 !== o.value || !0 !== o.enumerable)
                return !1;
        } return !0; };
    }, 7226: (e, t, n) => {
        "use strict";
        var r = n(6679);
        e.exports = function () { return r() && !!Symbol.toStringTag; };
    }, 3198: (e, t, n) => {
        "use strict";
        var r = n(4090);
        e.exports = r.call(Function.call, Object.prototype.hasOwnProperty);
    }, 1285: e => { "function" == typeof Object.create ? e.exports = function (e, t) { t && (e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: { value: e, enumerable: !1, writable: !0, configurable: !0 } })); } : e.exports = function (e, t) { if (t) {
        e.super_ = t;
        var n = function () { };
        n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e;
    } }; }, 2635: (e, t, n) => {
        "use strict";
        var r = n(7226)(), o = n(2680)("Object.prototype.toString"), i = function (e) { return !(r && e && "object" == typeof e && Symbol.toStringTag in e) && "[object Arguments]" === o(e); }, a = function (e) { return !!i(e) || null !== e && "object" == typeof e && "number" == typeof e.length && e.length >= 0 && "[object Array]" !== o(e) && "[object Function]" === o(e.callee); }, s = function () { return i(arguments); }();
        i.isLegacyArguments = a, e.exports = s ? i : a;
    }, 9680: e => {
        "use strict";
        var t, n, r = Function.prototype.toString, o = "object" == typeof Reflect && null !== Reflect && Reflect.apply;
        if ("function" == typeof o && "function" == typeof Object.defineProperty)
            try {
                t = Object.defineProperty({}, "length", { get: function () { throw n; } }), n = {}, o((function () { throw 42; }), null, t);
            }
            catch (e) {
                e !== n && (o = null);
            }
        else
            o = null;
        var i = /^\s*class\b/, a = function (e) { try {
            var t = r.call(e);
            return i.test(t);
        }
        catch (e) {
            return !1;
        } }, s = function (e) { try {
            return !a(e) && (r.call(e), !0);
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
            if (e !== n)
                return !1;
        } return !a(e) && s(e); } : function (e) { if (f(e))
            return !0; if (!e)
            return !1; if ("function" != typeof e && "object" != typeof e)
            return !1; if (u)
            return s(e); if (a(e))
            return !1; var t = c.call(e); return !("[object Function]" !== t && "[object GeneratorFunction]" !== t && !/^\[object HTML/.test(t)) && s(e); };
    }, 3138: (e, t, n) => {
        "use strict";
        var r, o = Object.prototype.toString, i = Function.prototype.toString, a = /^\s*(?:function)?\*/, s = n(7226)(), c = Object.getPrototypeOf;
        e.exports = function (e) { if ("function" != typeof e)
            return !1; if (a.test(i.call(e)))
            return !0; if (!s)
            return "[object GeneratorFunction]" === o.call(e); if (!c)
            return !1; if (void 0 === r) {
            var t = function () { if (!s)
                return !1; try {
                return Function("return function*() {}")();
            }
            catch (e) { } }();
            r = !!t && c(t);
        } return c(e) === r; };
    }, 7053: e => {
        "use strict";
        e.exports = function (e) { return e != e; };
    }, 4782: (e, t, n) => {
        "use strict";
        var r = n(9429), o = n(4926), i = n(7053), a = n(755), s = n(5346), c = r(a(), Number);
        o(c, { getPolyfill: a, implementation: i, shim: s }), e.exports = c;
    }, 755: (e, t, n) => {
        "use strict";
        var r = n(7053);
        e.exports = function () { return Number.isNaN && Number.isNaN(NaN) && !Number.isNaN("a") ? Number.isNaN : r; };
    }, 5346: (e, t, n) => {
        "use strict";
        var r = n(4926), o = n(755);
        e.exports = function () { var e = o(); return r(Number, { isNaN: e }, { isNaN: function () { return Number.isNaN !== e; } }), e; };
    }, 198: (e, t, n) => {
        "use strict";
        var r = n(3243), o = n(2191), i = n(2680), a = i("Object.prototype.toString"), s = n(7226)(), c = n(326), u = "undefined" == typeof globalThis ? n.g : globalThis, l = o(), f = i("Array.prototype.indexOf", !0) || function (e, t) { for (var n = 0; n < e.length; n += 1)
            if (e[n] === t)
                return n; return -1; }, p = i("String.prototype.slice"), h = {}, d = Object.getPrototypeOf;
        s && c && d && r(l, (function (e) { var t = new u[e]; if (Symbol.toStringTag in t) {
            var n = d(t), r = c(n, Symbol.toStringTag);
            if (!r) {
                var o = d(n);
                r = c(o, Symbol.toStringTag);
            }
            h[e] = r.get;
        } })), e.exports = function (e) { if (!e || "object" != typeof e)
            return !1; if (!s || !(Symbol.toStringTag in e)) {
            var t = p(a(e), 8, -1);
            return f(l, t) > -1;
        } return !!c && function (e) { var t = !1; return r(h, (function (n, r) { if (!t)
            try {
                t = n.call(e) === r;
            }
            catch (e) { } })), t; }(e); };
    }, 6635: function (e, t, n) { var r; e = n.nmd(e), function () { var o, i = "Expected a function", a = "__lodash_hash_undefined__", s = "__lodash_placeholder__", c = 32, u = 128, l = 1 / 0, f = 9007199254740991, p = NaN, h = 4294967295, d = [["ary", u], ["bind", 1], ["bindKey", 2], ["curry", 8], ["curryRight", 16], ["flip", 512], ["partial", c], ["partialRight", 64], ["rearg", 256]], y = "[object Arguments]", g = "[object Array]", m = "[object Boolean]", v = "[object Date]", b = "[object Error]", T = "[object Function]", E = "[object GeneratorFunction]", _ = "[object Map]", R = "[object Number]", S = "[object Object]", O = "[object Promise]", A = "[object RegExp]", N = "[object Set]", k = "[object String]", w = "[object Symbol]", x = "[object WeakMap]", C = "[object ArrayBuffer]", P = "[object DataView]", I = "[object Float32Array]", D = "[object Float64Array]", L = "[object Int8Array]", M = "[object Int16Array]", j = "[object Int32Array]", U = "[object Uint8Array]", F = "[object Uint8ClampedArray]", q = "[object Uint16Array]", W = "[object Uint32Array]", B = /\b__p \+= '';/g, $ = /\b(__p \+=) '' \+/g, H = /(__e\(.*?\)|\b__t\)) \+\n'';/g, V = /&(?:amp|lt|gt|quot|#39);/g, K = /[&<>"']/g, G = RegExp(V.source), z = RegExp(K.source), X = /<%-([\s\S]+?)%>/g, Y = /<%([\s\S]+?)%>/g, J = /<%=([\s\S]+?)%>/g, Q = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, Z = /^\w*$/, ee = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, te = /[\\^$.*+?()[\]{}|]/g, ne = RegExp(te.source), re = /^\s+/, oe = /\s/, ie = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, ae = /\{\n\/\* \[wrapped with (.+)\] \*/, se = /,? & /, ce = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, ue = /[()=,{}\[\]\/\s]/, le = /\\(\\)?/g, fe = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, pe = /\w*$/, he = /^[-+]0x[0-9a-f]+$/i, de = /^0b[01]+$/i, ye = /^\[object .+?Constructor\]$/, ge = /^0o[0-7]+$/i, me = /^(?:0|[1-9]\d*)$/, ve = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, be = /($^)/, Te = /['\n\r\u2028\u2029\\]/g, Ee = "\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff", _e = "a-z\\xdf-\\xf6\\xf8-\\xff", Re = "A-Z\\xc0-\\xd6\\xd8-\\xde", Se = "\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", Oe = "[" + Se + "]", Ae = "[" + Ee + "]", Ne = "\\d+", ke = "[" + _e + "]", we = "[^\\ud800-\\udfff" + Se + Ne + "\\u2700-\\u27bf" + _e + Re + "]", xe = "\\ud83c[\\udffb-\\udfff]", Ce = "[^\\ud800-\\udfff]", Pe = "(?:\\ud83c[\\udde6-\\uddff]){2}", Ie = "[\\ud800-\\udbff][\\udc00-\\udfff]", De = "[" + Re + "]", Le = "(?:" + ke + "|" + we + ")", Me = "(?:" + De + "|" + we + ")", je = "(?:['’](?:d|ll|m|re|s|t|ve))?", Ue = "(?:['’](?:D|LL|M|RE|S|T|VE))?", Fe = "(?:" + Ae + "|" + xe + ")?", qe = "[\\ufe0e\\ufe0f]?", We = qe + Fe + "(?:\\u200d(?:" + [Ce, Pe, Ie].join("|") + ")" + qe + Fe + ")*", Be = "(?:" + ["[\\u2700-\\u27bf]", Pe, Ie].join("|") + ")" + We, $e = "(?:" + [Ce + Ae + "?", Ae, Pe, Ie, "[\\ud800-\\udfff]"].join("|") + ")", He = RegExp("['’]", "g"), Ve = RegExp(Ae, "g"), Ke = RegExp(xe + "(?=" + xe + ")|" + $e + We, "g"), Ge = RegExp([De + "?" + ke + "+" + je + "(?=" + [Oe, De, "$"].join("|") + ")", Me + "+" + Ue + "(?=" + [Oe, De + Le, "$"].join("|") + ")", De + "?" + Le + "+" + je, De + "+" + Ue, "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", Ne, Be].join("|"), "g"), ze = RegExp("[\\u200d\\ud800-\\udfff" + Ee + "\\ufe0e\\ufe0f]"), Xe = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Ye = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], Je = -1, Qe = {}; Qe[I] = Qe[D] = Qe[L] = Qe[M] = Qe[j] = Qe[U] = Qe[F] = Qe[q] = Qe[W] = !0, Qe[y] = Qe[g] = Qe[C] = Qe[m] = Qe[P] = Qe[v] = Qe[b] = Qe[T] = Qe[_] = Qe[R] = Qe[S] = Qe[A] = Qe[N] = Qe[k] = Qe[x] = !1; var Ze = {}; Ze[y] = Ze[g] = Ze[C] = Ze[P] = Ze[m] = Ze[v] = Ze[I] = Ze[D] = Ze[L] = Ze[M] = Ze[j] = Ze[_] = Ze[R] = Ze[S] = Ze[A] = Ze[N] = Ze[k] = Ze[w] = Ze[U] = Ze[F] = Ze[q] = Ze[W] = !0, Ze[b] = Ze[T] = Ze[x] = !1; var et = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" }, tt = parseFloat, nt = parseInt, rt = "object" == typeof n.g && n.g && n.g.Object === Object && n.g, ot = "object" == typeof self && self && self.Object === Object && self, it = rt || ot || Function("return this")(), at = t && !t.nodeType && t, st = at && e && !e.nodeType && e, ct = st && st.exports === at, ut = ct && rt.process, lt = function () { try {
        return st && st.require && st.require("util").types || ut && ut.binding && ut.binding("util");
    }
    catch (e) { } }(), ft = lt && lt.isArrayBuffer, pt = lt && lt.isDate, ht = lt && lt.isMap, dt = lt && lt.isRegExp, yt = lt && lt.isSet, gt = lt && lt.isTypedArray; function mt(e, t, n) { switch (n.length) {
        case 0: return e.call(t);
        case 1: return e.call(t, n[0]);
        case 2: return e.call(t, n[0], n[1]);
        case 3: return e.call(t, n[0], n[1], n[2]);
    } return e.apply(t, n); } function vt(e, t, n, r) { for (var o = -1, i = null == e ? 0 : e.length; ++o < i;) {
        var a = e[o];
        t(r, a, n(a), e);
    } return r; } function bt(e, t) { for (var n = -1, r = null == e ? 0 : e.length; ++n < r && !1 !== t(e[n], n, e);)
        ; return e; } function Tt(e, t) { for (var n = null == e ? 0 : e.length; n-- && !1 !== t(e[n], n, e);)
        ; return e; } function Et(e, t) { for (var n = -1, r = null == e ? 0 : e.length; ++n < r;)
        if (!t(e[n], n, e))
            return !1; return !0; } function _t(e, t) { for (var n = -1, r = null == e ? 0 : e.length, o = 0, i = []; ++n < r;) {
        var a = e[n];
        t(a, n, e) && (i[o++] = a);
    } return i; } function Rt(e, t) { return !(null == e || !e.length) && It(e, t, 0) > -1; } function St(e, t, n) { for (var r = -1, o = null == e ? 0 : e.length; ++r < o;)
        if (n(t, e[r]))
            return !0; return !1; } function Ot(e, t) { for (var n = -1, r = null == e ? 0 : e.length, o = Array(r); ++n < r;)
        o[n] = t(e[n], n, e); return o; } function At(e, t) { for (var n = -1, r = t.length, o = e.length; ++n < r;)
        e[o + n] = t[n]; return e; } function Nt(e, t, n, r) { var o = -1, i = null == e ? 0 : e.length; for (r && i && (n = e[++o]); ++o < i;)
        n = t(n, e[o], o, e); return n; } function kt(e, t, n, r) { var o = null == e ? 0 : e.length; for (r && o && (n = e[--o]); o--;)
        n = t(n, e[o], o, e); return n; } function wt(e, t) { for (var n = -1, r = null == e ? 0 : e.length; ++n < r;)
        if (t(e[n], n, e))
            return !0; return !1; } var xt = jt("length"); function Ct(e, t, n) { var r; return n(e, (function (e, n, o) { if (t(e, n, o))
        return r = n, !1; })), r; } function Pt(e, t, n, r) { for (var o = e.length, i = n + (r ? 1 : -1); r ? i-- : ++i < o;)
        if (t(e[i], i, e))
            return i; return -1; } function It(e, t, n) { return t == t ? function (e, t, n) { for (var r = n - 1, o = e.length; ++r < o;)
        if (e[r] === t)
            return r; return -1; }(e, t, n) : Pt(e, Lt, n); } function Dt(e, t, n, r) { for (var o = n - 1, i = e.length; ++o < i;)
        if (r(e[o], t))
            return o; return -1; } function Lt(e) { return e != e; } function Mt(e, t) { var n = null == e ? 0 : e.length; return n ? qt(e, t) / n : p; } function jt(e) { return function (t) { return null == t ? o : t[e]; }; } function Ut(e) { return function (t) { return null == e ? o : e[t]; }; } function Ft(e, t, n, r, o) { return o(e, (function (e, o, i) { n = r ? (r = !1, e) : t(n, e, o, i); })), n; } function qt(e, t) { for (var n, r = -1, i = e.length; ++r < i;) {
        var a = t(e[r]);
        a !== o && (n = n === o ? a : n + a);
    } return n; } function Wt(e, t) { for (var n = -1, r = Array(e); ++n < e;)
        r[n] = t(n); return r; } function Bt(e) { return e ? e.slice(0, sn(e) + 1).replace(re, "") : e; } function $t(e) { return function (t) { return e(t); }; } function Ht(e, t) { return Ot(t, (function (t) { return e[t]; })); } function Vt(e, t) { return e.has(t); } function Kt(e, t) { for (var n = -1, r = e.length; ++n < r && It(t, e[n], 0) > -1;)
        ; return n; } function Gt(e, t) { for (var n = e.length; n-- && It(t, e[n], 0) > -1;)
        ; return n; } function zt(e, t) { for (var n = e.length, r = 0; n--;)
        e[n] === t && ++r; return r; } var Xt = Ut({ À: "A", Á: "A", Â: "A", Ã: "A", Ä: "A", Å: "A", à: "a", á: "a", â: "a", ã: "a", ä: "a", å: "a", Ç: "C", ç: "c", Ð: "D", ð: "d", È: "E", É: "E", Ê: "E", Ë: "E", è: "e", é: "e", ê: "e", ë: "e", Ì: "I", Í: "I", Î: "I", Ï: "I", ì: "i", í: "i", î: "i", ï: "i", Ñ: "N", ñ: "n", Ò: "O", Ó: "O", Ô: "O", Õ: "O", Ö: "O", Ø: "O", ò: "o", ó: "o", ô: "o", õ: "o", ö: "o", ø: "o", Ù: "U", Ú: "U", Û: "U", Ü: "U", ù: "u", ú: "u", û: "u", ü: "u", Ý: "Y", ý: "y", ÿ: "y", Æ: "Ae", æ: "ae", Þ: "Th", þ: "th", ß: "ss", Ā: "A", Ă: "A", Ą: "A", ā: "a", ă: "a", ą: "a", Ć: "C", Ĉ: "C", Ċ: "C", Č: "C", ć: "c", ĉ: "c", ċ: "c", č: "c", Ď: "D", Đ: "D", ď: "d", đ: "d", Ē: "E", Ĕ: "E", Ė: "E", Ę: "E", Ě: "E", ē: "e", ĕ: "e", ė: "e", ę: "e", ě: "e", Ĝ: "G", Ğ: "G", Ġ: "G", Ģ: "G", ĝ: "g", ğ: "g", ġ: "g", ģ: "g", Ĥ: "H", Ħ: "H", ĥ: "h", ħ: "h", Ĩ: "I", Ī: "I", Ĭ: "I", Į: "I", İ: "I", ĩ: "i", ī: "i", ĭ: "i", į: "i", ı: "i", Ĵ: "J", ĵ: "j", Ķ: "K", ķ: "k", ĸ: "k", Ĺ: "L", Ļ: "L", Ľ: "L", Ŀ: "L", Ł: "L", ĺ: "l", ļ: "l", ľ: "l", ŀ: "l", ł: "l", Ń: "N", Ņ: "N", Ň: "N", Ŋ: "N", ń: "n", ņ: "n", ň: "n", ŋ: "n", Ō: "O", Ŏ: "O", Ő: "O", ō: "o", ŏ: "o", ő: "o", Ŕ: "R", Ŗ: "R", Ř: "R", ŕ: "r", ŗ: "r", ř: "r", Ś: "S", Ŝ: "S", Ş: "S", Š: "S", ś: "s", ŝ: "s", ş: "s", š: "s", Ţ: "T", Ť: "T", Ŧ: "T", ţ: "t", ť: "t", ŧ: "t", Ũ: "U", Ū: "U", Ŭ: "U", Ů: "U", Ű: "U", Ų: "U", ũ: "u", ū: "u", ŭ: "u", ů: "u", ű: "u", ų: "u", Ŵ: "W", ŵ: "w", Ŷ: "Y", ŷ: "y", Ÿ: "Y", Ź: "Z", Ż: "Z", Ž: "Z", ź: "z", ż: "z", ž: "z", Ĳ: "IJ", ĳ: "ij", Œ: "Oe", œ: "oe", ŉ: "'n", ſ: "s" }), Yt = Ut({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }); function Jt(e) { return "\\" + et[e]; } function Qt(e) { return ze.test(e); } function Zt(e) { var t = -1, n = Array(e.size); return e.forEach((function (e, r) { n[++t] = [r, e]; })), n; } function en(e, t) { return function (n) { return e(t(n)); }; } function tn(e, t) { for (var n = -1, r = e.length, o = 0, i = []; ++n < r;) {
        var a = e[n];
        a !== t && a !== s || (e[n] = s, i[o++] = n);
    } return i; } function nn(e) { var t = -1, n = Array(e.size); return e.forEach((function (e) { n[++t] = e; })), n; } function rn(e) { var t = -1, n = Array(e.size); return e.forEach((function (e) { n[++t] = [e, e]; })), n; } function on(e) { return Qt(e) ? function (e) { for (var t = Ke.lastIndex = 0; Ke.test(e);)
        ++t; return t; }(e) : xt(e); } function an(e) { return Qt(e) ? function (e) { return e.match(Ke) || []; }(e) : function (e) { return e.split(""); }(e); } function sn(e) { for (var t = e.length; t-- && oe.test(e.charAt(t));)
        ; return t; } var cn = Ut({ "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }), un = function e(t) { var n, r = (t = null == t ? it : un.defaults(it.Object(), t, un.pick(it, Ye))).Array, oe = t.Date, Ee = t.Error, _e = t.Function, Re = t.Math, Se = t.Object, Oe = t.RegExp, Ae = t.String, Ne = t.TypeError, ke = r.prototype, we = _e.prototype, xe = Se.prototype, Ce = t["__core-js_shared__"], Pe = we.toString, Ie = xe.hasOwnProperty, De = 0, Le = (n = /[^.]+$/.exec(Ce && Ce.keys && Ce.keys.IE_PROTO || "")) ? "Symbol(src)_1." + n : "", Me = xe.toString, je = Pe.call(Se), Ue = it._, Fe = Oe("^" + Pe.call(Ie).replace(te, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), qe = ct ? t.Buffer : o, We = t.Symbol, Be = t.Uint8Array, $e = qe ? qe.allocUnsafe : o, Ke = en(Se.getPrototypeOf, Se), ze = Se.create, et = xe.propertyIsEnumerable, rt = ke.splice, ot = We ? We.isConcatSpreadable : o, at = We ? We.iterator : o, st = We ? We.toStringTag : o, ut = function () { try {
        var e = li(Se, "defineProperty");
        return e({}, "", {}), e;
    }
    catch (e) { } }(), lt = t.clearTimeout !== it.clearTimeout && t.clearTimeout, xt = oe && oe.now !== it.Date.now && oe.now, Ut = t.setTimeout !== it.setTimeout && t.setTimeout, ln = Re.ceil, fn = Re.floor, pn = Se.getOwnPropertySymbols, hn = qe ? qe.isBuffer : o, dn = t.isFinite, yn = ke.join, gn = en(Se.keys, Se), mn = Re.max, vn = Re.min, bn = oe.now, Tn = t.parseInt, En = Re.random, _n = ke.reverse, Rn = li(t, "DataView"), Sn = li(t, "Map"), On = li(t, "Promise"), An = li(t, "Set"), Nn = li(t, "WeakMap"), kn = li(Se, "create"), wn = Nn && new Nn, xn = {}, Cn = Fi(Rn), Pn = Fi(Sn), In = Fi(On), Dn = Fi(An), Ln = Fi(Nn), Mn = We ? We.prototype : o, jn = Mn ? Mn.valueOf : o, Un = Mn ? Mn.toString : o; function Fn(e) { if (ns(e) && !Va(e) && !(e instanceof $n)) {
        if (e instanceof Bn)
            return e;
        if (Ie.call(e, "__wrapped__"))
            return qi(e);
    } return new Bn(e); } var qn = function () { function e() { } return function (t) { if (!ts(t))
        return {}; if (ze)
        return ze(t); e.prototype = t; var n = new e; return e.prototype = o, n; }; }(); function Wn() { } function Bn(e, t) { this.__wrapped__ = e, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = o; } function $n(e) { this.__wrapped__ = e, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = !1, this.__iteratees__ = [], this.__takeCount__ = h, this.__views__ = []; } function Hn(e) { var t = -1, n = null == e ? 0 : e.length; for (this.clear(); ++t < n;) {
        var r = e[t];
        this.set(r[0], r[1]);
    } } function Vn(e) { var t = -1, n = null == e ? 0 : e.length; for (this.clear(); ++t < n;) {
        var r = e[t];
        this.set(r[0], r[1]);
    } } function Kn(e) { var t = -1, n = null == e ? 0 : e.length; for (this.clear(); ++t < n;) {
        var r = e[t];
        this.set(r[0], r[1]);
    } } function Gn(e) { var t = -1, n = null == e ? 0 : e.length; for (this.__data__ = new Kn; ++t < n;)
        this.add(e[t]); } function zn(e) { var t = this.__data__ = new Vn(e); this.size = t.size; } function Xn(e, t) { var n = Va(e), r = !n && Ha(e), o = !n && !r && Xa(e), i = !n && !r && !o && ls(e), a = n || r || o || i, s = a ? Wt(e.length, Ae) : [], c = s.length; for (var u in e)
        !t && !Ie.call(e, u) || a && ("length" == u || o && ("offset" == u || "parent" == u) || i && ("buffer" == u || "byteLength" == u || "byteOffset" == u) || mi(u, c)) || s.push(u); return s; } function Yn(e) { var t = e.length; return t ? e[Kr(0, t - 1)] : o; } function Jn(e, t) { return Di(ko(e), ar(t, 0, e.length)); } function Qn(e) { return Di(ko(e)); } function Zn(e, t, n) { (n !== o && !Wa(e[t], n) || n === o && !(t in e)) && or(e, t, n); } function er(e, t, n) { var r = e[t]; Ie.call(e, t) && Wa(r, n) && (n !== o || t in e) || or(e, t, n); } function tr(e, t) { for (var n = e.length; n--;)
        if (Wa(e[n][0], t))
            return n; return -1; } function nr(e, t, n, r) { return fr(e, (function (e, o, i) { t(r, e, n(e), i); })), r; } function rr(e, t) { return e && wo(t, Ps(t), e); } function or(e, t, n) { "__proto__" == t && ut ? ut(e, t, { configurable: !0, enumerable: !0, value: n, writable: !0 }) : e[t] = n; } function ir(e, t) { for (var n = -1, i = t.length, a = r(i), s = null == e; ++n < i;)
        a[n] = s ? o : Ns(e, t[n]); return a; } function ar(e, t, n) { return e == e && (n !== o && (e = e <= n ? e : n), t !== o && (e = e >= t ? e : t)), e; } function sr(e, t, n, r, i, a) { var s, c = 1 & t, u = 2 & t, l = 4 & t; if (n && (s = i ? n(e, r, i, a) : n(e)), s !== o)
        return s; if (!ts(e))
        return e; var f = Va(e); if (f) {
        if (s = function (e) { var t = e.length, n = new e.constructor(t); return t && "string" == typeof e[0] && Ie.call(e, "index") && (n.index = e.index, n.input = e.input), n; }(e), !c)
            return ko(e, s);
    }
    else {
        var p = hi(e), h = p == T || p == E;
        if (Xa(e))
            return _o(e, c);
        if (p == S || p == y || h && !i) {
            if (s = u || h ? {} : yi(e), !c)
                return u ? function (e, t) { return wo(e, pi(e), t); }(e, function (e, t) { return e && wo(t, Is(t), e); }(s, e)) : function (e, t) { return wo(e, fi(e), t); }(e, rr(s, e));
        }
        else {
            if (!Ze[p])
                return i ? e : {};
            s = function (e, t, n) { var r, o = e.constructor; switch (t) {
                case C: return Ro(e);
                case m:
                case v: return new o(+e);
                case P: return function (e, t) { var n = t ? Ro(e.buffer) : e.buffer; return new e.constructor(n, e.byteOffset, e.byteLength); }(e, n);
                case I:
                case D:
                case L:
                case M:
                case j:
                case U:
                case F:
                case q:
                case W: return So(e, n);
                case _: return new o;
                case R:
                case k: return new o(e);
                case A: return function (e) { var t = new e.constructor(e.source, pe.exec(e)); return t.lastIndex = e.lastIndex, t; }(e);
                case N: return new o;
                case w: return r = e, jn ? Se(jn.call(r)) : {};
            } }(e, p, c);
        }
    } a || (a = new zn); var d = a.get(e); if (d)
        return d; a.set(e, s), ss(e) ? e.forEach((function (r) { s.add(sr(r, t, n, r, e, a)); })) : rs(e) && e.forEach((function (r, o) { s.set(o, sr(r, t, n, o, e, a)); })); var g = f ? o : (l ? u ? ri : ni : u ? Is : Ps)(e); return bt(g || e, (function (r, o) { g && (r = e[o = r]), er(s, o, sr(r, t, n, o, e, a)); })), s; } function cr(e, t, n) { var r = n.length; if (null == e)
        return !r; for (e = Se(e); r--;) {
        var i = n[r], a = t[i], s = e[i];
        if (s === o && !(i in e) || !a(s))
            return !1;
    } return !0; } function ur(e, t, n) { if ("function" != typeof e)
        throw new Ne(i); return xi((function () { e.apply(o, n); }), t); } function lr(e, t, n, r) { var o = -1, i = Rt, a = !0, s = e.length, c = [], u = t.length; if (!s)
        return c; n && (t = Ot(t, $t(n))), r ? (i = St, a = !1) : t.length >= 200 && (i = Vt, a = !1, t = new Gn(t)); e: for (; ++o < s;) {
        var l = e[o], f = null == n ? l : n(l);
        if (l = r || 0 !== l ? l : 0, a && f == f) {
            for (var p = u; p--;)
                if (t[p] === f)
                    continue e;
            c.push(l);
        }
        else
            i(t, f, r) || c.push(l);
    } return c; } Fn.templateSettings = { escape: X, evaluate: Y, interpolate: J, variable: "", imports: { _: Fn } }, Fn.prototype = Wn.prototype, Fn.prototype.constructor = Fn, Bn.prototype = qn(Wn.prototype), Bn.prototype.constructor = Bn, $n.prototype = qn(Wn.prototype), $n.prototype.constructor = $n, Hn.prototype.clear = function () { this.__data__ = kn ? kn(null) : {}, this.size = 0; }, Hn.prototype.delete = function (e) { var t = this.has(e) && delete this.__data__[e]; return this.size -= t ? 1 : 0, t; }, Hn.prototype.get = function (e) { var t = this.__data__; if (kn) {
        var n = t[e];
        return n === a ? o : n;
    } return Ie.call(t, e) ? t[e] : o; }, Hn.prototype.has = function (e) { var t = this.__data__; return kn ? t[e] !== o : Ie.call(t, e); }, Hn.prototype.set = function (e, t) { var n = this.__data__; return this.size += this.has(e) ? 0 : 1, n[e] = kn && t === o ? a : t, this; }, Vn.prototype.clear = function () { this.__data__ = [], this.size = 0; }, Vn.prototype.delete = function (e) { var t = this.__data__, n = tr(t, e); return !(n < 0 || (n == t.length - 1 ? t.pop() : rt.call(t, n, 1), --this.size, 0)); }, Vn.prototype.get = function (e) { var t = this.__data__, n = tr(t, e); return n < 0 ? o : t[n][1]; }, Vn.prototype.has = function (e) { return tr(this.__data__, e) > -1; }, Vn.prototype.set = function (e, t) { var n = this.__data__, r = tr(n, e); return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this; }, Kn.prototype.clear = function () { this.size = 0, this.__data__ = { hash: new Hn, map: new (Sn || Vn), string: new Hn }; }, Kn.prototype.delete = function (e) { var t = ci(this, e).delete(e); return this.size -= t ? 1 : 0, t; }, Kn.prototype.get = function (e) { return ci(this, e).get(e); }, Kn.prototype.has = function (e) { return ci(this, e).has(e); }, Kn.prototype.set = function (e, t) { var n = ci(this, e), r = n.size; return n.set(e, t), this.size += n.size == r ? 0 : 1, this; }, Gn.prototype.add = Gn.prototype.push = function (e) { return this.__data__.set(e, a), this; }, Gn.prototype.has = function (e) { return this.__data__.has(e); }, zn.prototype.clear = function () { this.__data__ = new Vn, this.size = 0; }, zn.prototype.delete = function (e) { var t = this.__data__, n = t.delete(e); return this.size = t.size, n; }, zn.prototype.get = function (e) { return this.__data__.get(e); }, zn.prototype.has = function (e) { return this.__data__.has(e); }, zn.prototype.set = function (e, t) { var n = this.__data__; if (n instanceof Vn) {
        var r = n.__data__;
        if (!Sn || r.length < 199)
            return r.push([e, t]), this.size = ++n.size, this;
        n = this.__data__ = new Kn(r);
    } return n.set(e, t), this.size = n.size, this; }; var fr = Po(br), pr = Po(Tr, !0); function hr(e, t) { var n = !0; return fr(e, (function (e, r, o) { return n = !!t(e, r, o); })), n; } function dr(e, t, n) { for (var r = -1, i = e.length; ++r < i;) {
        var a = e[r], s = t(a);
        if (null != s && (c === o ? s == s && !us(s) : n(s, c)))
            var c = s, u = a;
    } return u; } function yr(e, t) { var n = []; return fr(e, (function (e, r, o) { t(e, r, o) && n.push(e); })), n; } function gr(e, t, n, r, o) { var i = -1, a = e.length; for (n || (n = gi), o || (o = []); ++i < a;) {
        var s = e[i];
        t > 0 && n(s) ? t > 1 ? gr(s, t - 1, n, r, o) : At(o, s) : r || (o[o.length] = s);
    } return o; } var mr = Io(), vr = Io(!0); function br(e, t) { return e && mr(e, t, Ps); } function Tr(e, t) { return e && vr(e, t, Ps); } function Er(e, t) { return _t(t, (function (t) { return Qa(e[t]); })); } function _r(e, t) { for (var n = 0, r = (t = vo(t, e)).length; null != e && n < r;)
        e = e[Ui(t[n++])]; return n && n == r ? e : o; } function Rr(e, t, n) { var r = t(e); return Va(e) ? r : At(r, n(e)); } function Sr(e) { return null == e ? e === o ? "[object Undefined]" : "[object Null]" : st && st in Se(e) ? function (e) { var t = Ie.call(e, st), n = e[st]; try {
        e[st] = o;
        var r = !0;
    }
    catch (e) { } var i = Me.call(e); return r && (t ? e[st] = n : delete e[st]), i; }(e) : function (e) { return Me.call(e); }(e); } function Or(e, t) { return e > t; } function Ar(e, t) { return null != e && Ie.call(e, t); } function Nr(e, t) { return null != e && t in Se(e); } function kr(e, t, n) { for (var i = n ? St : Rt, a = e[0].length, s = e.length, c = s, u = r(s), l = 1 / 0, f = []; c--;) {
        var p = e[c];
        c && t && (p = Ot(p, $t(t))), l = vn(p.length, l), u[c] = !n && (t || a >= 120 && p.length >= 120) ? new Gn(c && p) : o;
    } p = e[0]; var h = -1, d = u[0]; e: for (; ++h < a && f.length < l;) {
        var y = p[h], g = t ? t(y) : y;
        if (y = n || 0 !== y ? y : 0, !(d ? Vt(d, g) : i(f, g, n))) {
            for (c = s; --c;) {
                var m = u[c];
                if (!(m ? Vt(m, g) : i(e[c], g, n)))
                    continue e;
            }
            d && d.push(g), f.push(y);
        }
    } return f; } function wr(e, t, n) { var r = null == (e = Ai(e, t = vo(t, e))) ? e : e[Ui(Ji(t))]; return null == r ? o : mt(r, e, n); } function xr(e) { return ns(e) && Sr(e) == y; } function Cr(e, t, n, r, i) { return e === t || (null == e || null == t || !ns(e) && !ns(t) ? e != e && t != t : function (e, t, n, r, i, a) { var s = Va(e), c = Va(t), u = s ? g : hi(e), l = c ? g : hi(t), f = (u = u == y ? S : u) == S, p = (l = l == y ? S : l) == S, h = u == l; if (h && Xa(e)) {
        if (!Xa(t))
            return !1;
        s = !0, f = !1;
    } if (h && !f)
        return a || (a = new zn), s || ls(e) ? ei(e, t, n, r, i, a) : function (e, t, n, r, o, i, a) { switch (n) {
            case P:
                if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
                    return !1;
                e = e.buffer, t = t.buffer;
            case C: return !(e.byteLength != t.byteLength || !i(new Be(e), new Be(t)));
            case m:
            case v:
            case R: return Wa(+e, +t);
            case b: return e.name == t.name && e.message == t.message;
            case A:
            case k: return e == t + "";
            case _: var s = Zt;
            case N:
                var c = 1 & r;
                if (s || (s = nn), e.size != t.size && !c)
                    return !1;
                var u = a.get(e);
                if (u)
                    return u == t;
                r |= 2, a.set(e, t);
                var l = ei(s(e), s(t), r, o, i, a);
                return a.delete(e), l;
            case w: if (jn)
                return jn.call(e) == jn.call(t);
        } return !1; }(e, t, u, n, r, i, a); if (!(1 & n)) {
        var d = f && Ie.call(e, "__wrapped__"), T = p && Ie.call(t, "__wrapped__");
        if (d || T) {
            var E = d ? e.value() : e, O = T ? t.value() : t;
            return a || (a = new zn), i(E, O, n, r, a);
        }
    } return !!h && (a || (a = new zn), function (e, t, n, r, i, a) { var s = 1 & n, c = ni(e), u = c.length; if (u != ni(t).length && !s)
        return !1; for (var l = u; l--;) {
        var f = c[l];
        if (!(s ? f in t : Ie.call(t, f)))
            return !1;
    } var p = a.get(e), h = a.get(t); if (p && h)
        return p == t && h == e; var d = !0; a.set(e, t), a.set(t, e); for (var y = s; ++l < u;) {
        var g = e[f = c[l]], m = t[f];
        if (r)
            var v = s ? r(m, g, f, t, e, a) : r(g, m, f, e, t, a);
        if (!(v === o ? g === m || i(g, m, n, r, a) : v)) {
            d = !1;
            break;
        }
        y || (y = "constructor" == f);
    } if (d && !y) {
        var b = e.constructor, T = t.constructor;
        b == T || !("constructor" in e) || !("constructor" in t) || "function" == typeof b && b instanceof b && "function" == typeof T && T instanceof T || (d = !1);
    } return a.delete(e), a.delete(t), d; }(e, t, n, r, i, a)); }(e, t, n, r, Cr, i)); } function Pr(e, t, n, r) { var i = n.length, a = i, s = !r; if (null == e)
        return !a; for (e = Se(e); i--;) {
        var c = n[i];
        if (s && c[2] ? c[1] !== e[c[0]] : !(c[0] in e))
            return !1;
    } for (; ++i < a;) {
        var u = (c = n[i])[0], l = e[u], f = c[1];
        if (s && c[2]) {
            if (l === o && !(u in e))
                return !1;
        }
        else {
            var p = new zn;
            if (r)
                var h = r(l, f, u, e, t, p);
            if (!(h === o ? Cr(f, l, 3, r, p) : h))
                return !1;
        }
    } return !0; } function Ir(e) { return !(!ts(e) || (t = e, Le && Le in t)) && (Qa(e) ? Fe : ye).test(Fi(e)); var t; } function Dr(e) { return "function" == typeof e ? e : null == e ? oc : "object" == typeof e ? Va(e) ? Fr(e[0], e[1]) : Ur(e) : hc(e); } function Lr(e) { if (!_i(e))
        return gn(e); var t = []; for (var n in Se(e))
        Ie.call(e, n) && "constructor" != n && t.push(n); return t; } function Mr(e, t) { return e < t; } function jr(e, t) { var n = -1, o = Ga(e) ? r(e.length) : []; return fr(e, (function (e, r, i) { o[++n] = t(e, r, i); })), o; } function Ur(e) { var t = ui(e); return 1 == t.length && t[0][2] ? Si(t[0][0], t[0][1]) : function (n) { return n === e || Pr(n, e, t); }; } function Fr(e, t) { return bi(e) && Ri(t) ? Si(Ui(e), t) : function (n) { var r = Ns(n, e); return r === o && r === t ? ks(n, e) : Cr(t, r, 3); }; } function qr(e, t, n, r, i) { e !== t && mr(t, (function (a, s) { if (i || (i = new zn), ts(a))
        !function (e, t, n, r, i, a, s) { var c = ki(e, n), u = ki(t, n), l = s.get(u); if (l)
            Zn(e, n, l);
        else {
            var f = a ? a(c, u, n + "", e, t, s) : o, p = f === o;
            if (p) {
                var h = Va(u), d = !h && Xa(u), y = !h && !d && ls(u);
                f = u, h || d || y ? Va(c) ? f = c : za(c) ? f = ko(c) : d ? (p = !1, f = _o(u, !0)) : y ? (p = !1, f = So(u, !0)) : f = [] : is(u) || Ha(u) ? (f = c, Ha(c) ? f = vs(c) : ts(c) && !Qa(c) || (f = yi(u))) : p = !1;
            }
            p && (s.set(u, f), i(f, u, r, a, s), s.delete(u)), Zn(e, n, f);
        } }(e, t, s, n, qr, r, i);
    else {
        var c = r ? r(ki(e, s), a, s + "", e, t, i) : o;
        c === o && (c = a), Zn(e, s, c);
    } }), Is); } function Wr(e, t) { var n = e.length; if (n)
        return mi(t += t < 0 ? n : 0, n) ? e[t] : o; } function Br(e, t, n) { t = t.length ? Ot(t, (function (e) { return Va(e) ? function (t) { return _r(t, 1 === e.length ? e[0] : e); } : e; })) : [oc]; var r = -1; t = Ot(t, $t(si())); var o = jr(e, (function (e, n, o) { var i = Ot(t, (function (t) { return t(e); })); return { criteria: i, index: ++r, value: e }; })); return function (e, t) { var r = e.length; for (e.sort((function (e, t) { return function (e, t, n) { for (var r = -1, o = e.criteria, i = t.criteria, a = o.length, s = n.length; ++r < a;) {
        var c = Oo(o[r], i[r]);
        if (c)
            return r >= s ? c : c * ("desc" == n[r] ? -1 : 1);
    } return e.index - t.index; }(e, t, n); })); r--;)
        e[r] = e[r].value; return e; }(o); } function $r(e, t, n) { for (var r = -1, o = t.length, i = {}; ++r < o;) {
        var a = t[r], s = _r(e, a);
        n(s, a) && Jr(i, vo(a, e), s);
    } return i; } function Hr(e, t, n, r) { var o = r ? Dt : It, i = -1, a = t.length, s = e; for (e === t && (t = ko(t)), n && (s = Ot(e, $t(n))); ++i < a;)
        for (var c = 0, u = t[i], l = n ? n(u) : u; (c = o(s, l, c, r)) > -1;)
            s !== e && rt.call(s, c, 1), rt.call(e, c, 1); return e; } function Vr(e, t) { for (var n = e ? t.length : 0, r = n - 1; n--;) {
        var o = t[n];
        if (n == r || o !== i) {
            var i = o;
            mi(o) ? rt.call(e, o, 1) : uo(e, o);
        }
    } return e; } function Kr(e, t) { return e + fn(En() * (t - e + 1)); } function Gr(e, t) { var n = ""; if (!e || t < 1 || t > f)
        return n; do {
        t % 2 && (n += e), (t = fn(t / 2)) && (e += e);
    } while (t); return n; } function zr(e, t) { return Ci(Oi(e, t, oc), e + ""); } function Xr(e) { return Yn(Ws(e)); } function Yr(e, t) { var n = Ws(e); return Di(n, ar(t, 0, n.length)); } function Jr(e, t, n, r) { if (!ts(e))
        return e; for (var i = -1, a = (t = vo(t, e)).length, s = a - 1, c = e; null != c && ++i < a;) {
        var u = Ui(t[i]), l = n;
        if ("__proto__" === u || "constructor" === u || "prototype" === u)
            return e;
        if (i != s) {
            var f = c[u];
            (l = r ? r(f, u, c) : o) === o && (l = ts(f) ? f : mi(t[i + 1]) ? [] : {});
        }
        er(c, u, l), c = c[u];
    } return e; } var Qr = wn ? function (e, t) { return wn.set(e, t), e; } : oc, Zr = ut ? function (e, t) { return ut(e, "toString", { configurable: !0, enumerable: !1, value: tc(t), writable: !0 }); } : oc; function eo(e) { return Di(Ws(e)); } function to(e, t, n) { var o = -1, i = e.length; t < 0 && (t = -t > i ? 0 : i + t), (n = n > i ? i : n) < 0 && (n += i), i = t > n ? 0 : n - t >>> 0, t >>>= 0; for (var a = r(i); ++o < i;)
        a[o] = e[o + t]; return a; } function no(e, t) { var n; return fr(e, (function (e, r, o) { return !(n = t(e, r, o)); })), !!n; } function ro(e, t, n) { var r = 0, o = null == e ? r : e.length; if ("number" == typeof t && t == t && o <= 2147483647) {
        for (; r < o;) {
            var i = r + o >>> 1, a = e[i];
            null !== a && !us(a) && (n ? a <= t : a < t) ? r = i + 1 : o = i;
        }
        return o;
    } return oo(e, t, oc, n); } function oo(e, t, n, r) { var i = 0, a = null == e ? 0 : e.length; if (0 === a)
        return 0; for (var s = (t = n(t)) != t, c = null === t, u = us(t), l = t === o; i < a;) {
        var f = fn((i + a) / 2), p = n(e[f]), h = p !== o, d = null === p, y = p == p, g = us(p);
        if (s)
            var m = r || y;
        else
            m = l ? y && (r || h) : c ? y && h && (r || !d) : u ? y && h && !d && (r || !g) : !d && !g && (r ? p <= t : p < t);
        m ? i = f + 1 : a = f;
    } return vn(a, 4294967294); } function io(e, t) { for (var n = -1, r = e.length, o = 0, i = []; ++n < r;) {
        var a = e[n], s = t ? t(a) : a;
        if (!n || !Wa(s, c)) {
            var c = s;
            i[o++] = 0 === a ? 0 : a;
        }
    } return i; } function ao(e) { return "number" == typeof e ? e : us(e) ? p : +e; } function so(e) { if ("string" == typeof e)
        return e; if (Va(e))
        return Ot(e, so) + ""; if (us(e))
        return Un ? Un.call(e) : ""; var t = e + ""; return "0" == t && 1 / e == -1 / 0 ? "-0" : t; } function co(e, t, n) { var r = -1, o = Rt, i = e.length, a = !0, s = [], c = s; if (n)
        a = !1, o = St;
    else if (i >= 200) {
        var u = t ? null : zo(e);
        if (u)
            return nn(u);
        a = !1, o = Vt, c = new Gn;
    }
    else
        c = t ? [] : s; e: for (; ++r < i;) {
        var l = e[r], f = t ? t(l) : l;
        if (l = n || 0 !== l ? l : 0, a && f == f) {
            for (var p = c.length; p--;)
                if (c[p] === f)
                    continue e;
            t && c.push(f), s.push(l);
        }
        else
            o(c, f, n) || (c !== s && c.push(f), s.push(l));
    } return s; } function uo(e, t) { return null == (e = Ai(e, t = vo(t, e))) || delete e[Ui(Ji(t))]; } function lo(e, t, n, r) { return Jr(e, t, n(_r(e, t)), r); } function fo(e, t, n, r) { for (var o = e.length, i = r ? o : -1; (r ? i-- : ++i < o) && t(e[i], i, e);)
        ; return n ? to(e, r ? 0 : i, r ? i + 1 : o) : to(e, r ? i + 1 : 0, r ? o : i); } function po(e, t) { var n = e; return n instanceof $n && (n = n.value()), Nt(t, (function (e, t) { return t.func.apply(t.thisArg, At([e], t.args)); }), n); } function ho(e, t, n) { var o = e.length; if (o < 2)
        return o ? co(e[0]) : []; for (var i = -1, a = r(o); ++i < o;)
        for (var s = e[i], c = -1; ++c < o;)
            c != i && (a[i] = lr(a[i] || s, e[c], t, n)); return co(gr(a, 1), t, n); } function yo(e, t, n) { for (var r = -1, i = e.length, a = t.length, s = {}; ++r < i;) {
        var c = r < a ? t[r] : o;
        n(s, e[r], c);
    } return s; } function go(e) { return za(e) ? e : []; } function mo(e) { return "function" == typeof e ? e : oc; } function vo(e, t) { return Va(e) ? e : bi(e, t) ? [e] : ji(bs(e)); } var bo = zr; function To(e, t, n) { var r = e.length; return n = n === o ? r : n, !t && n >= r ? e : to(e, t, n); } var Eo = lt || function (e) { return it.clearTimeout(e); }; function _o(e, t) { if (t)
        return e.slice(); var n = e.length, r = $e ? $e(n) : new e.constructor(n); return e.copy(r), r; } function Ro(e) { var t = new e.constructor(e.byteLength); return new Be(t).set(new Be(e)), t; } function So(e, t) { var n = t ? Ro(e.buffer) : e.buffer; return new e.constructor(n, e.byteOffset, e.length); } function Oo(e, t) { if (e !== t) {
        var n = e !== o, r = null === e, i = e == e, a = us(e), s = t !== o, c = null === t, u = t == t, l = us(t);
        if (!c && !l && !a && e > t || a && s && u && !c && !l || r && s && u || !n && u || !i)
            return 1;
        if (!r && !a && !l && e < t || l && n && i && !r && !a || c && n && i || !s && i || !u)
            return -1;
    } return 0; } function Ao(e, t, n, o) { for (var i = -1, a = e.length, s = n.length, c = -1, u = t.length, l = mn(a - s, 0), f = r(u + l), p = !o; ++c < u;)
        f[c] = t[c]; for (; ++i < s;)
        (p || i < a) && (f[n[i]] = e[i]); for (; l--;)
        f[c++] = e[i++]; return f; } function No(e, t, n, o) { for (var i = -1, a = e.length, s = -1, c = n.length, u = -1, l = t.length, f = mn(a - c, 0), p = r(f + l), h = !o; ++i < f;)
        p[i] = e[i]; for (var d = i; ++u < l;)
        p[d + u] = t[u]; for (; ++s < c;)
        (h || i < a) && (p[d + n[s]] = e[i++]); return p; } function ko(e, t) { var n = -1, o = e.length; for (t || (t = r(o)); ++n < o;)
        t[n] = e[n]; return t; } function wo(e, t, n, r) { var i = !n; n || (n = {}); for (var a = -1, s = t.length; ++a < s;) {
        var c = t[a], u = r ? r(n[c], e[c], c, n, e) : o;
        u === o && (u = e[c]), i ? or(n, c, u) : er(n, c, u);
    } return n; } function xo(e, t) { return function (n, r) { var o = Va(n) ? vt : nr, i = t ? t() : {}; return o(n, e, si(r, 2), i); }; } function Co(e) { return zr((function (t, n) { var r = -1, i = n.length, a = i > 1 ? n[i - 1] : o, s = i > 2 ? n[2] : o; for (a = e.length > 3 && "function" == typeof a ? (i--, a) : o, s && vi(n[0], n[1], s) && (a = i < 3 ? o : a, i = 1), t = Se(t); ++r < i;) {
        var c = n[r];
        c && e(t, c, r, a);
    } return t; })); } function Po(e, t) { return function (n, r) { if (null == n)
        return n; if (!Ga(n))
        return e(n, r); for (var o = n.length, i = t ? o : -1, a = Se(n); (t ? i-- : ++i < o) && !1 !== r(a[i], i, a);)
        ; return n; }; } function Io(e) { return function (t, n, r) { for (var o = -1, i = Se(t), a = r(t), s = a.length; s--;) {
        var c = a[e ? s : ++o];
        if (!1 === n(i[c], c, i))
            break;
    } return t; }; } function Do(e) { return function (t) { var n = Qt(t = bs(t)) ? an(t) : o, r = n ? n[0] : t.charAt(0), i = n ? To(n, 1).join("") : t.slice(1); return r[e]() + i; }; } function Lo(e) { return function (t) { return Nt(Qs(Hs(t).replace(He, "")), e, ""); }; } function Mo(e) { return function () { var t = arguments; switch (t.length) {
        case 0: return new e;
        case 1: return new e(t[0]);
        case 2: return new e(t[0], t[1]);
        case 3: return new e(t[0], t[1], t[2]);
        case 4: return new e(t[0], t[1], t[2], t[3]);
        case 5: return new e(t[0], t[1], t[2], t[3], t[4]);
        case 6: return new e(t[0], t[1], t[2], t[3], t[4], t[5]);
        case 7: return new e(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
    } var n = qn(e.prototype), r = e.apply(n, t); return ts(r) ? r : n; }; } function jo(e) { return function (t, n, r) { var i = Se(t); if (!Ga(t)) {
        var a = si(n, 3);
        t = Ps(t), n = function (e) { return a(i[e], e, i); };
    } var s = e(t, n, r); return s > -1 ? i[a ? t[s] : s] : o; }; } function Uo(e) { return ti((function (t) { var n = t.length, r = n, a = Bn.prototype.thru; for (e && t.reverse(); r--;) {
        var s = t[r];
        if ("function" != typeof s)
            throw new Ne(i);
        if (a && !c && "wrapper" == ii(s))
            var c = new Bn([], !0);
    } for (r = c ? r : n; ++r < n;) {
        var u = ii(s = t[r]), l = "wrapper" == u ? oi(s) : o;
        c = l && Ti(l[0]) && 424 == l[1] && !l[4].length && 1 == l[9] ? c[ii(l[0])].apply(c, l[3]) : 1 == s.length && Ti(s) ? c[u]() : c.thru(s);
    } return function () { var e = arguments, r = e[0]; if (c && 1 == e.length && Va(r))
        return c.plant(r).value(); for (var o = 0, i = n ? t[o].apply(this, e) : r; ++o < n;)
        i = t[o].call(this, i); return i; }; })); } function Fo(e, t, n, i, a, s, c, l, f, p) { var h = t & u, d = 1 & t, y = 2 & t, g = 24 & t, m = 512 & t, v = y ? o : Mo(e); return function o() { for (var u = arguments.length, b = r(u), T = u; T--;)
        b[T] = arguments[T]; if (g)
        var E = ai(o), _ = zt(b, E); if (i && (b = Ao(b, i, a, g)), s && (b = No(b, s, c, g)), u -= _, g && u < p) {
        var R = tn(b, E);
        return Ko(e, t, Fo, o.placeholder, n, b, R, l, f, p - u);
    } var S = d ? n : this, O = y ? S[e] : e; return u = b.length, l ? b = Ni(b, l) : m && u > 1 && b.reverse(), h && f < u && (b.length = f), this && this !== it && this instanceof o && (O = v || Mo(O)), O.apply(S, b); }; } function qo(e, t) { return function (n, r) { return function (e, t, n, r) { return br(e, (function (e, o, i) { t(r, n(e), o, i); })), r; }(n, e, t(r), {}); }; } function Wo(e, t) { return function (n, r) { var i; if (n === o && r === o)
        return t; if (n !== o && (i = n), r !== o) {
        if (i === o)
            return r;
        "string" == typeof n || "string" == typeof r ? (n = so(n), r = so(r)) : (n = ao(n), r = ao(r)), i = e(n, r);
    } return i; }; } function Bo(e) { return ti((function (t) { return t = Ot(t, $t(si())), zr((function (n) { var r = this; return e(t, (function (e) { return mt(e, r, n); })); })); })); } function $o(e, t) { var n = (t = t === o ? " " : so(t)).length; if (n < 2)
        return n ? Gr(t, e) : t; var r = Gr(t, ln(e / on(t))); return Qt(t) ? To(an(r), 0, e).join("") : r.slice(0, e); } function Ho(e) { return function (t, n, i) { return i && "number" != typeof i && vi(t, n, i) && (n = i = o), t = ds(t), n === o ? (n = t, t = 0) : n = ds(n), function (e, t, n, o) { for (var i = -1, a = mn(ln((t - e) / (n || 1)), 0), s = r(a); a--;)
        s[o ? a : ++i] = e, e += n; return s; }(t, n, i = i === o ? t < n ? 1 : -1 : ds(i), e); }; } function Vo(e) { return function (t, n) { return "string" == typeof t && "string" == typeof n || (t = ms(t), n = ms(n)), e(t, n); }; } function Ko(e, t, n, r, i, a, s, u, l, f) { var p = 8 & t; t |= p ? c : 64, 4 & (t &= ~(p ? 64 : c)) || (t &= -4); var h = [e, t, i, p ? a : o, p ? s : o, p ? o : a, p ? o : s, u, l, f], d = n.apply(o, h); return Ti(e) && wi(d, h), d.placeholder = r, Pi(d, e, t); } function Go(e) { var t = Re[e]; return function (e, n) { if (e = ms(e), (n = null == n ? 0 : vn(ys(n), 292)) && dn(e)) {
        var r = (bs(e) + "e").split("e");
        return +((r = (bs(t(r[0] + "e" + (+r[1] + n))) + "e").split("e"))[0] + "e" + (+r[1] - n));
    } return t(e); }; } var zo = An && 1 / nn(new An([, -0]))[1] == l ? function (e) { return new An(e); } : uc; function Xo(e) { return function (t) { var n = hi(t); return n == _ ? Zt(t) : n == N ? rn(t) : function (e, t) { return Ot(t, (function (t) { return [t, e[t]]; })); }(t, e(t)); }; } function Yo(e, t, n, a, l, f, p, h) { var d = 2 & t; if (!d && "function" != typeof e)
        throw new Ne(i); var y = a ? a.length : 0; if (y || (t &= -97, a = l = o), p = p === o ? p : mn(ys(p), 0), h = h === o ? h : ys(h), y -= l ? l.length : 0, 64 & t) {
        var g = a, m = l;
        a = l = o;
    } var v = d ? o : oi(e), b = [e, t, n, a, l, g, m, f, p, h]; if (v && function (e, t) { var n = e[1], r = t[1], o = n | r, i = o < 131, a = r == u && 8 == n || r == u && 256 == n && e[7].length <= t[8] || 384 == r && t[7].length <= t[8] && 8 == n; if (!i && !a)
        return e; 1 & r && (e[2] = t[2], o |= 1 & n ? 0 : 4); var c = t[3]; if (c) {
        var l = e[3];
        e[3] = l ? Ao(l, c, t[4]) : c, e[4] = l ? tn(e[3], s) : t[4];
    } (c = t[5]) && (l = e[5], e[5] = l ? No(l, c, t[6]) : c, e[6] = l ? tn(e[5], s) : t[6]), (c = t[7]) && (e[7] = c), r & u && (e[8] = null == e[8] ? t[8] : vn(e[8], t[8])), null == e[9] && (e[9] = t[9]), e[0] = t[0], e[1] = o; }(b, v), e = b[0], t = b[1], n = b[2], a = b[3], l = b[4], !(h = b[9] = b[9] === o ? d ? 0 : e.length : mn(b[9] - y, 0)) && 24 & t && (t &= -25), t && 1 != t)
        T = 8 == t || 16 == t ? function (e, t, n) { var i = Mo(e); return function a() { for (var s = arguments.length, c = r(s), u = s, l = ai(a); u--;)
            c[u] = arguments[u]; var f = s < 3 && c[0] !== l && c[s - 1] !== l ? [] : tn(c, l); return (s -= f.length) < n ? Ko(e, t, Fo, a.placeholder, o, c, f, o, o, n - s) : mt(this && this !== it && this instanceof a ? i : e, this, c); }; }(e, t, h) : t != c && 33 != t || l.length ? Fo.apply(o, b) : function (e, t, n, o) { var i = 1 & t, a = Mo(e); return function t() { for (var s = -1, c = arguments.length, u = -1, l = o.length, f = r(l + c), p = this && this !== it && this instanceof t ? a : e; ++u < l;)
            f[u] = o[u]; for (; c--;)
            f[u++] = arguments[++s]; return mt(p, i ? n : this, f); }; }(e, t, n, a);
    else
        var T = function (e, t, n) { var r = 1 & t, o = Mo(e); return function t() { return (this && this !== it && this instanceof t ? o : e).apply(r ? n : this, arguments); }; }(e, t, n); return Pi((v ? Qr : wi)(T, b), e, t); } function Jo(e, t, n, r) { return e === o || Wa(e, xe[n]) && !Ie.call(r, n) ? t : e; } function Qo(e, t, n, r, i, a) { return ts(e) && ts(t) && (a.set(t, e), qr(e, t, o, Qo, a), a.delete(t)), e; } function Zo(e) { return is(e) ? o : e; } function ei(e, t, n, r, i, a) { var s = 1 & n, c = e.length, u = t.length; if (c != u && !(s && u > c))
        return !1; var l = a.get(e), f = a.get(t); if (l && f)
        return l == t && f == e; var p = -1, h = !0, d = 2 & n ? new Gn : o; for (a.set(e, t), a.set(t, e); ++p < c;) {
        var y = e[p], g = t[p];
        if (r)
            var m = s ? r(g, y, p, t, e, a) : r(y, g, p, e, t, a);
        if (m !== o) {
            if (m)
                continue;
            h = !1;
            break;
        }
        if (d) {
            if (!wt(t, (function (e, t) { if (!Vt(d, t) && (y === e || i(y, e, n, r, a)))
                return d.push(t); }))) {
                h = !1;
                break;
            }
        }
        else if (y !== g && !i(y, g, n, r, a)) {
            h = !1;
            break;
        }
    } return a.delete(e), a.delete(t), h; } function ti(e) { return Ci(Oi(e, o, Ki), e + ""); } function ni(e) { return Rr(e, Ps, fi); } function ri(e) { return Rr(e, Is, pi); } var oi = wn ? function (e) { return wn.get(e); } : uc; function ii(e) { for (var t = e.name + "", n = xn[t], r = Ie.call(xn, t) ? n.length : 0; r--;) {
        var o = n[r], i = o.func;
        if (null == i || i == e)
            return o.name;
    } return t; } function ai(e) { return (Ie.call(Fn, "placeholder") ? Fn : e).placeholder; } function si() { var e = Fn.iteratee || ic; return e = e === ic ? Dr : e, arguments.length ? e(arguments[0], arguments[1]) : e; } function ci(e, t) { var n, r, o = e.__data__; return ("string" == (r = typeof (n = t)) || "number" == r || "symbol" == r || "boolean" == r ? "__proto__" !== n : null === n) ? o["string" == typeof t ? "string" : "hash"] : o.map; } function ui(e) { for (var t = Ps(e), n = t.length; n--;) {
        var r = t[n], o = e[r];
        t[n] = [r, o, Ri(o)];
    } return t; } function li(e, t) { var n = function (e, t) { return null == e ? o : e[t]; }(e, t); return Ir(n) ? n : o; } var fi = pn ? function (e) { return null == e ? [] : (e = Se(e), _t(pn(e), (function (t) { return et.call(e, t); }))); } : gc, pi = pn ? function (e) { for (var t = []; e;)
        At(t, fi(e)), e = Ke(e); return t; } : gc, hi = Sr; function di(e, t, n) { for (var r = -1, o = (t = vo(t, e)).length, i = !1; ++r < o;) {
        var a = Ui(t[r]);
        if (!(i = null != e && n(e, a)))
            break;
        e = e[a];
    } return i || ++r != o ? i : !!(o = null == e ? 0 : e.length) && es(o) && mi(a, o) && (Va(e) || Ha(e)); } function yi(e) { return "function" != typeof e.constructor || _i(e) ? {} : qn(Ke(e)); } function gi(e) { return Va(e) || Ha(e) || !!(ot && e && e[ot]); } function mi(e, t) { var n = typeof e; return !!(t = null == t ? f : t) && ("number" == n || "symbol" != n && me.test(e)) && e > -1 && e % 1 == 0 && e < t; } function vi(e, t, n) { if (!ts(n))
        return !1; var r = typeof t; return !!("number" == r ? Ga(n) && mi(t, n.length) : "string" == r && t in n) && Wa(n[t], e); } function bi(e, t) { if (Va(e))
        return !1; var n = typeof e; return !("number" != n && "symbol" != n && "boolean" != n && null != e && !us(e)) || Z.test(e) || !Q.test(e) || null != t && e in Se(t); } function Ti(e) { var t = ii(e), n = Fn[t]; if ("function" != typeof n || !(t in $n.prototype))
        return !1; if (e === n)
        return !0; var r = oi(n); return !!r && e === r[0]; } (Rn && hi(new Rn(new ArrayBuffer(1))) != P || Sn && hi(new Sn) != _ || On && hi(On.resolve()) != O || An && hi(new An) != N || Nn && hi(new Nn) != x) && (hi = function (e) { var t = Sr(e), n = t == S ? e.constructor : o, r = n ? Fi(n) : ""; if (r)
        switch (r) {
            case Cn: return P;
            case Pn: return _;
            case In: return O;
            case Dn: return N;
            case Ln: return x;
        } return t; }); var Ei = Ce ? Qa : mc; function _i(e) { var t = e && e.constructor; return e === ("function" == typeof t && t.prototype || xe); } function Ri(e) { return e == e && !ts(e); } function Si(e, t) { return function (n) { return null != n && n[e] === t && (t !== o || e in Se(n)); }; } function Oi(e, t, n) { return t = mn(t === o ? e.length - 1 : t, 0), function () { for (var o = arguments, i = -1, a = mn(o.length - t, 0), s = r(a); ++i < a;)
        s[i] = o[t + i]; i = -1; for (var c = r(t + 1); ++i < t;)
        c[i] = o[i]; return c[t] = n(s), mt(e, this, c); }; } function Ai(e, t) { return t.length < 2 ? e : _r(e, to(t, 0, -1)); } function Ni(e, t) { for (var n = e.length, r = vn(t.length, n), i = ko(e); r--;) {
        var a = t[r];
        e[r] = mi(a, n) ? i[a] : o;
    } return e; } function ki(e, t) { if (("constructor" !== t || "function" != typeof e[t]) && "__proto__" != t)
        return e[t]; } var wi = Ii(Qr), xi = Ut || function (e, t) { return it.setTimeout(e, t); }, Ci = Ii(Zr); function Pi(e, t, n) { var r = t + ""; return Ci(e, function (e, t) { var n = t.length; if (!n)
        return e; var r = n - 1; return t[r] = (n > 1 ? "& " : "") + t[r], t = t.join(n > 2 ? ", " : " "), e.replace(ie, "{\n/* [wrapped with " + t + "] */\n"); }(r, function (e, t) { return bt(d, (function (n) { var r = "_." + n[0]; t & n[1] && !Rt(e, r) && e.push(r); })), e.sort(); }(function (e) { var t = e.match(ae); return t ? t[1].split(se) : []; }(r), n))); } function Ii(e) { var t = 0, n = 0; return function () { var r = bn(), i = 16 - (r - n); if (n = r, i > 0) {
        if (++t >= 800)
            return arguments[0];
    }
    else
        t = 0; return e.apply(o, arguments); }; } function Di(e, t) { var n = -1, r = e.length, i = r - 1; for (t = t === o ? r : t; ++n < t;) {
        var a = Kr(n, i), s = e[a];
        e[a] = e[n], e[n] = s;
    } return e.length = t, e; } var Li, Mi, ji = (Li = La((function (e) { var t = []; return 46 === e.charCodeAt(0) && t.push(""), e.replace(ee, (function (e, n, r, o) { t.push(r ? o.replace(le, "$1") : n || e); })), t; }), (function (e) { return 500 === Mi.size && Mi.clear(), e; })), Mi = Li.cache, Li); function Ui(e) { if ("string" == typeof e || us(e))
        return e; var t = e + ""; return "0" == t && 1 / e == -1 / 0 ? "-0" : t; } function Fi(e) { if (null != e) {
        try {
            return Pe.call(e);
        }
        catch (e) { }
        try {
            return e + "";
        }
        catch (e) { }
    } return ""; } function qi(e) { if (e instanceof $n)
        return e.clone(); var t = new Bn(e.__wrapped__, e.__chain__); return t.__actions__ = ko(e.__actions__), t.__index__ = e.__index__, t.__values__ = e.__values__, t; } var Wi = zr((function (e, t) { return za(e) ? lr(e, gr(t, 1, za, !0)) : []; })), Bi = zr((function (e, t) { var n = Ji(t); return za(n) && (n = o), za(e) ? lr(e, gr(t, 1, za, !0), si(n, 2)) : []; })), $i = zr((function (e, t) { var n = Ji(t); return za(n) && (n = o), za(e) ? lr(e, gr(t, 1, za, !0), o, n) : []; })); function Hi(e, t, n) { var r = null == e ? 0 : e.length; if (!r)
        return -1; var o = null == n ? 0 : ys(n); return o < 0 && (o = mn(r + o, 0)), Pt(e, si(t, 3), o); } function Vi(e, t, n) { var r = null == e ? 0 : e.length; if (!r)
        return -1; var i = r - 1; return n !== o && (i = ys(n), i = n < 0 ? mn(r + i, 0) : vn(i, r - 1)), Pt(e, si(t, 3), i, !0); } function Ki(e) { return null != e && e.length ? gr(e, 1) : []; } function Gi(e) { return e && e.length ? e[0] : o; } var zi = zr((function (e) { var t = Ot(e, go); return t.length && t[0] === e[0] ? kr(t) : []; })), Xi = zr((function (e) { var t = Ji(e), n = Ot(e, go); return t === Ji(n) ? t = o : n.pop(), n.length && n[0] === e[0] ? kr(n, si(t, 2)) : []; })), Yi = zr((function (e) { var t = Ji(e), n = Ot(e, go); return (t = "function" == typeof t ? t : o) && n.pop(), n.length && n[0] === e[0] ? kr(n, o, t) : []; })); function Ji(e) { var t = null == e ? 0 : e.length; return t ? e[t - 1] : o; } var Qi = zr(Zi); function Zi(e, t) { return e && e.length && t && t.length ? Hr(e, t) : e; } var ea = ti((function (e, t) { var n = null == e ? 0 : e.length, r = ir(e, t); return Vr(e, Ot(t, (function (e) { return mi(e, n) ? +e : e; })).sort(Oo)), r; })); function ta(e) { return null == e ? e : _n.call(e); } var na = zr((function (e) { return co(gr(e, 1, za, !0)); })), ra = zr((function (e) { var t = Ji(e); return za(t) && (t = o), co(gr(e, 1, za, !0), si(t, 2)); })), oa = zr((function (e) { var t = Ji(e); return t = "function" == typeof t ? t : o, co(gr(e, 1, za, !0), o, t); })); function ia(e) { if (!e || !e.length)
        return []; var t = 0; return e = _t(e, (function (e) { if (za(e))
        return t = mn(e.length, t), !0; })), Wt(t, (function (t) { return Ot(e, jt(t)); })); } function aa(e, t) { if (!e || !e.length)
        return []; var n = ia(e); return null == t ? n : Ot(n, (function (e) { return mt(t, o, e); })); } var sa = zr((function (e, t) { return za(e) ? lr(e, t) : []; })), ca = zr((function (e) { return ho(_t(e, za)); })), ua = zr((function (e) { var t = Ji(e); return za(t) && (t = o), ho(_t(e, za), si(t, 2)); })), la = zr((function (e) { var t = Ji(e); return t = "function" == typeof t ? t : o, ho(_t(e, za), o, t); })), fa = zr(ia), pa = zr((function (e) { var t = e.length, n = t > 1 ? e[t - 1] : o; return n = "function" == typeof n ? (e.pop(), n) : o, aa(e, n); })); function ha(e) { var t = Fn(e); return t.__chain__ = !0, t; } function da(e, t) { return t(e); } var ya = ti((function (e) { var t = e.length, n = t ? e[0] : 0, r = this.__wrapped__, i = function (t) { return ir(t, e); }; return !(t > 1 || this.__actions__.length) && r instanceof $n && mi(n) ? ((r = r.slice(n, +n + (t ? 1 : 0))).__actions__.push({ func: da, args: [i], thisArg: o }), new Bn(r, this.__chain__).thru((function (e) { return t && !e.length && e.push(o), e; }))) : this.thru(i); })), ga = xo((function (e, t, n) { Ie.call(e, n) ? ++e[n] : or(e, n, 1); })), ma = jo(Hi), va = jo(Vi); function ba(e, t) { return (Va(e) ? bt : fr)(e, si(t, 3)); } function Ta(e, t) { return (Va(e) ? Tt : pr)(e, si(t, 3)); } var Ea = xo((function (e, t, n) { Ie.call(e, n) ? e[n].push(t) : or(e, n, [t]); })), _a = zr((function (e, t, n) { var o = -1, i = "function" == typeof t, a = Ga(e) ? r(e.length) : []; return fr(e, (function (e) { a[++o] = i ? mt(t, e, n) : wr(e, t, n); })), a; })), Ra = xo((function (e, t, n) { or(e, n, t); })); function Sa(e, t) { return (Va(e) ? Ot : jr)(e, si(t, 3)); } var Oa = xo((function (e, t, n) { e[n ? 0 : 1].push(t); }), (function () { return [[], []]; })), Aa = zr((function (e, t) { if (null == e)
        return []; var n = t.length; return n > 1 && vi(e, t[0], t[1]) ? t = [] : n > 2 && vi(t[0], t[1], t[2]) && (t = [t[0]]), Br(e, gr(t, 1), []); })), Na = xt || function () { return it.Date.now(); }; function ka(e, t, n) { return t = n ? o : t, t = e && null == t ? e.length : t, Yo(e, u, o, o, o, o, t); } function wa(e, t) { var n; if ("function" != typeof t)
        throw new Ne(i); return e = ys(e), function () { return --e > 0 && (n = t.apply(this, arguments)), e <= 1 && (t = o), n; }; } var xa = zr((function (e, t, n) { var r = 1; if (n.length) {
        var o = tn(n, ai(xa));
        r |= c;
    } return Yo(e, r, t, n, o); })), Ca = zr((function (e, t, n) { var r = 3; if (n.length) {
        var o = tn(n, ai(Ca));
        r |= c;
    } return Yo(t, r, e, n, o); })); function Pa(e, t, n) { var r, a, s, c, u, l, f = 0, p = !1, h = !1, d = !0; if ("function" != typeof e)
        throw new Ne(i); function y(t) { var n = r, i = a; return r = a = o, f = t, c = e.apply(i, n); } function g(e) { return f = e, u = xi(v, t), p ? y(e) : c; } function m(e) { var n = e - l; return l === o || n >= t || n < 0 || h && e - f >= s; } function v() { var e = Na(); if (m(e))
        return b(e); u = xi(v, function (e) { var n = t - (e - l); return h ? vn(n, s - (e - f)) : n; }(e)); } function b(e) { return u = o, d && r ? y(e) : (r = a = o, c); } function T() { var e = Na(), n = m(e); if (r = arguments, a = this, l = e, n) {
        if (u === o)
            return g(l);
        if (h)
            return Eo(u), u = xi(v, t), y(l);
    } return u === o && (u = xi(v, t)), c; } return t = ms(t) || 0, ts(n) && (p = !!n.leading, s = (h = "maxWait" in n) ? mn(ms(n.maxWait) || 0, t) : s, d = "trailing" in n ? !!n.trailing : d), T.cancel = function () { u !== o && Eo(u), f = 0, r = l = a = u = o; }, T.flush = function () { return u === o ? c : b(Na()); }, T; } var Ia = zr((function (e, t) { return ur(e, 1, t); })), Da = zr((function (e, t, n) { return ur(e, ms(t) || 0, n); })); function La(e, t) { if ("function" != typeof e || null != t && "function" != typeof t)
        throw new Ne(i); var n = function () { var r = arguments, o = t ? t.apply(this, r) : r[0], i = n.cache; if (i.has(o))
        return i.get(o); var a = e.apply(this, r); return n.cache = i.set(o, a) || i, a; }; return n.cache = new (La.Cache || Kn), n; } function Ma(e) { if ("function" != typeof e)
        throw new Ne(i); return function () { var t = arguments; switch (t.length) {
        case 0: return !e.call(this);
        case 1: return !e.call(this, t[0]);
        case 2: return !e.call(this, t[0], t[1]);
        case 3: return !e.call(this, t[0], t[1], t[2]);
    } return !e.apply(this, t); }; } La.Cache = Kn; var ja = bo((function (e, t) { var n = (t = 1 == t.length && Va(t[0]) ? Ot(t[0], $t(si())) : Ot(gr(t, 1), $t(si()))).length; return zr((function (r) { for (var o = -1, i = vn(r.length, n); ++o < i;)
        r[o] = t[o].call(this, r[o]); return mt(e, this, r); })); })), Ua = zr((function (e, t) { var n = tn(t, ai(Ua)); return Yo(e, c, o, t, n); })), Fa = zr((function (e, t) { var n = tn(t, ai(Fa)); return Yo(e, 64, o, t, n); })), qa = ti((function (e, t) { return Yo(e, 256, o, o, o, t); })); function Wa(e, t) { return e === t || e != e && t != t; } var Ba = Vo(Or), $a = Vo((function (e, t) { return e >= t; })), Ha = xr(function () { return arguments; }()) ? xr : function (e) { return ns(e) && Ie.call(e, "callee") && !et.call(e, "callee"); }, Va = r.isArray, Ka = ft ? $t(ft) : function (e) { return ns(e) && Sr(e) == C; }; function Ga(e) { return null != e && es(e.length) && !Qa(e); } function za(e) { return ns(e) && Ga(e); } var Xa = hn || mc, Ya = pt ? $t(pt) : function (e) { return ns(e) && Sr(e) == v; }; function Ja(e) { if (!ns(e))
        return !1; var t = Sr(e); return t == b || "[object DOMException]" == t || "string" == typeof e.message && "string" == typeof e.name && !is(e); } function Qa(e) { if (!ts(e))
        return !1; var t = Sr(e); return t == T || t == E || "[object AsyncFunction]" == t || "[object Proxy]" == t; } function Za(e) { return "number" == typeof e && e == ys(e); } function es(e) { return "number" == typeof e && e > -1 && e % 1 == 0 && e <= f; } function ts(e) { var t = typeof e; return null != e && ("object" == t || "function" == t); } function ns(e) { return null != e && "object" == typeof e; } var rs = ht ? $t(ht) : function (e) { return ns(e) && hi(e) == _; }; function os(e) { return "number" == typeof e || ns(e) && Sr(e) == R; } function is(e) { if (!ns(e) || Sr(e) != S)
        return !1; var t = Ke(e); if (null === t)
        return !0; var n = Ie.call(t, "constructor") && t.constructor; return "function" == typeof n && n instanceof n && Pe.call(n) == je; } var as = dt ? $t(dt) : function (e) { return ns(e) && Sr(e) == A; }, ss = yt ? $t(yt) : function (e) { return ns(e) && hi(e) == N; }; function cs(e) { return "string" == typeof e || !Va(e) && ns(e) && Sr(e) == k; } function us(e) { return "symbol" == typeof e || ns(e) && Sr(e) == w; } var ls = gt ? $t(gt) : function (e) { return ns(e) && es(e.length) && !!Qe[Sr(e)]; }, fs = Vo(Mr), ps = Vo((function (e, t) { return e <= t; })); function hs(e) { if (!e)
        return []; if (Ga(e))
        return cs(e) ? an(e) : ko(e); if (at && e[at])
        return function (e) { for (var t, n = []; !(t = e.next()).done;)
            n.push(t.value); return n; }(e[at]()); var t = hi(e); return (t == _ ? Zt : t == N ? nn : Ws)(e); } function ds(e) { return e ? (e = ms(e)) === l || e === -1 / 0 ? 17976931348623157e292 * (e < 0 ? -1 : 1) : e == e ? e : 0 : 0 === e ? e : 0; } function ys(e) { var t = ds(e), n = t % 1; return t == t ? n ? t - n : t : 0; } function gs(e) { return e ? ar(ys(e), 0, h) : 0; } function ms(e) { if ("number" == typeof e)
        return e; if (us(e))
        return p; if (ts(e)) {
        var t = "function" == typeof e.valueOf ? e.valueOf() : e;
        e = ts(t) ? t + "" : t;
    } if ("string" != typeof e)
        return 0 === e ? e : +e; e = Bt(e); var n = de.test(e); return n || ge.test(e) ? nt(e.slice(2), n ? 2 : 8) : he.test(e) ? p : +e; } function vs(e) { return wo(e, Is(e)); } function bs(e) { return null == e ? "" : so(e); } var Ts = Co((function (e, t) { if (_i(t) || Ga(t))
        wo(t, Ps(t), e);
    else
        for (var n in t)
            Ie.call(t, n) && er(e, n, t[n]); })), Es = Co((function (e, t) { wo(t, Is(t), e); })), _s = Co((function (e, t, n, r) { wo(t, Is(t), e, r); })), Rs = Co((function (e, t, n, r) { wo(t, Ps(t), e, r); })), Ss = ti(ir), Os = zr((function (e, t) { e = Se(e); var n = -1, r = t.length, i = r > 2 ? t[2] : o; for (i && vi(t[0], t[1], i) && (r = 1); ++n < r;)
        for (var a = t[n], s = Is(a), c = -1, u = s.length; ++c < u;) {
            var l = s[c], f = e[l];
            (f === o || Wa(f, xe[l]) && !Ie.call(e, l)) && (e[l] = a[l]);
        } return e; })), As = zr((function (e) { return e.push(o, Qo), mt(Ls, o, e); })); function Ns(e, t, n) { var r = null == e ? o : _r(e, t); return r === o ? n : r; } function ks(e, t) { return null != e && di(e, t, Nr); } var ws = qo((function (e, t, n) { null != t && "function" != typeof t.toString && (t = Me.call(t)), e[t] = n; }), tc(oc)), xs = qo((function (e, t, n) { null != t && "function" != typeof t.toString && (t = Me.call(t)), Ie.call(e, t) ? e[t].push(n) : e[t] = [n]; }), si), Cs = zr(wr); function Ps(e) { return Ga(e) ? Xn(e) : Lr(e); } function Is(e) { return Ga(e) ? Xn(e, !0) : function (e) { if (!ts(e))
        return function (e) { var t = []; if (null != e)
            for (var n in Se(e))
                t.push(n); return t; }(e); var t = _i(e), n = []; for (var r in e)
        ("constructor" != r || !t && Ie.call(e, r)) && n.push(r); return n; }(e); } var Ds = Co((function (e, t, n) { qr(e, t, n); })), Ls = Co((function (e, t, n, r) { qr(e, t, n, r); })), Ms = ti((function (e, t) { var n = {}; if (null == e)
        return n; var r = !1; t = Ot(t, (function (t) { return t = vo(t, e), r || (r = t.length > 1), t; })), wo(e, ri(e), n), r && (n = sr(n, 7, Zo)); for (var o = t.length; o--;)
        uo(n, t[o]); return n; })), js = ti((function (e, t) { return null == e ? {} : function (e, t) { return $r(e, t, (function (t, n) { return ks(e, n); })); }(e, t); })); function Us(e, t) { if (null == e)
        return {}; var n = Ot(ri(e), (function (e) { return [e]; })); return t = si(t), $r(e, n, (function (e, n) { return t(e, n[0]); })); } var Fs = Xo(Ps), qs = Xo(Is); function Ws(e) { return null == e ? [] : Ht(e, Ps(e)); } var Bs = Lo((function (e, t, n) { return t = t.toLowerCase(), e + (n ? $s(t) : t); })); function $s(e) { return Js(bs(e).toLowerCase()); } function Hs(e) { return (e = bs(e)) && e.replace(ve, Xt).replace(Ve, ""); } var Vs = Lo((function (e, t, n) { return e + (n ? "-" : "") + t.toLowerCase(); })), Ks = Lo((function (e, t, n) { return e + (n ? " " : "") + t.toLowerCase(); })), Gs = Do("toLowerCase"), zs = Lo((function (e, t, n) { return e + (n ? "_" : "") + t.toLowerCase(); })), Xs = Lo((function (e, t, n) { return e + (n ? " " : "") + Js(t); })), Ys = Lo((function (e, t, n) { return e + (n ? " " : "") + t.toUpperCase(); })), Js = Do("toUpperCase"); function Qs(e, t, n) { return e = bs(e), (t = n ? o : t) === o ? function (e) { return Xe.test(e); }(e) ? function (e) { return e.match(Ge) || []; }(e) : function (e) { return e.match(ce) || []; }(e) : e.match(t) || []; } var Zs = zr((function (e, t) { try {
        return mt(e, o, t);
    }
    catch (e) {
        return Ja(e) ? e : new Ee(e);
    } })), ec = ti((function (e, t) { return bt(t, (function (t) { t = Ui(t), or(e, t, xa(e[t], e)); })), e; })); function tc(e) { return function () { return e; }; } var nc = Uo(), rc = Uo(!0); function oc(e) { return e; } function ic(e) { return Dr("function" == typeof e ? e : sr(e, 1)); } var ac = zr((function (e, t) { return function (n) { return wr(n, e, t); }; })), sc = zr((function (e, t) { return function (n) { return wr(e, n, t); }; })); function cc(e, t, n) { var r = Ps(t), o = Er(t, r); null != n || ts(t) && (o.length || !r.length) || (n = t, t = e, e = this, o = Er(t, Ps(t))); var i = !(ts(n) && "chain" in n && !n.chain), a = Qa(e); return bt(o, (function (n) { var r = t[n]; e[n] = r, a && (e.prototype[n] = function () { var t = this.__chain__; if (i || t) {
        var n = e(this.__wrapped__), o = n.__actions__ = ko(this.__actions__);
        return o.push({ func: r, args: arguments, thisArg: e }), n.__chain__ = t, n;
    } return r.apply(e, At([this.value()], arguments)); }); })), e; } function uc() { } var lc = Bo(Ot), fc = Bo(Et), pc = Bo(wt); function hc(e) { return bi(e) ? jt(Ui(e)) : function (e) { return function (t) { return _r(t, e); }; }(e); } var dc = Ho(), yc = Ho(!0); function gc() { return []; } function mc() { return !1; } var vc, bc = Wo((function (e, t) { return e + t; }), 0), Tc = Go("ceil"), Ec = Wo((function (e, t) { return e / t; }), 1), _c = Go("floor"), Rc = Wo((function (e, t) { return e * t; }), 1), Sc = Go("round"), Oc = Wo((function (e, t) { return e - t; }), 0); return Fn.after = function (e, t) { if ("function" != typeof t)
        throw new Ne(i); return e = ys(e), function () { if (--e < 1)
        return t.apply(this, arguments); }; }, Fn.ary = ka, Fn.assign = Ts, Fn.assignIn = Es, Fn.assignInWith = _s, Fn.assignWith = Rs, Fn.at = Ss, Fn.before = wa, Fn.bind = xa, Fn.bindAll = ec, Fn.bindKey = Ca, Fn.castArray = function () { if (!arguments.length)
        return []; var e = arguments[0]; return Va(e) ? e : [e]; }, Fn.chain = ha, Fn.chunk = function (e, t, n) { t = (n ? vi(e, t, n) : t === o) ? 1 : mn(ys(t), 0); var i = null == e ? 0 : e.length; if (!i || t < 1)
        return []; for (var a = 0, s = 0, c = r(ln(i / t)); a < i;)
        c[s++] = to(e, a, a += t); return c; }, Fn.compact = function (e) { for (var t = -1, n = null == e ? 0 : e.length, r = 0, o = []; ++t < n;) {
        var i = e[t];
        i && (o[r++] = i);
    } return o; }, Fn.concat = function () { var e = arguments.length; if (!e)
        return []; for (var t = r(e - 1), n = arguments[0], o = e; o--;)
        t[o - 1] = arguments[o]; return At(Va(n) ? ko(n) : [n], gr(t, 1)); }, Fn.cond = function (e) { var t = null == e ? 0 : e.length, n = si(); return e = t ? Ot(e, (function (e) { if ("function" != typeof e[1])
        throw new Ne(i); return [n(e[0]), e[1]]; })) : [], zr((function (n) { for (var r = -1; ++r < t;) {
        var o = e[r];
        if (mt(o[0], this, n))
            return mt(o[1], this, n);
    } })); }, Fn.conforms = function (e) { return function (e) { var t = Ps(e); return function (n) { return cr(n, e, t); }; }(sr(e, 1)); }, Fn.constant = tc, Fn.countBy = ga, Fn.create = function (e, t) { var n = qn(e); return null == t ? n : rr(n, t); }, Fn.curry = function e(t, n, r) { var i = Yo(t, 8, o, o, o, o, o, n = r ? o : n); return i.placeholder = e.placeholder, i; }, Fn.curryRight = function e(t, n, r) { var i = Yo(t, 16, o, o, o, o, o, n = r ? o : n); return i.placeholder = e.placeholder, i; }, Fn.debounce = Pa, Fn.defaults = Os, Fn.defaultsDeep = As, Fn.defer = Ia, Fn.delay = Da, Fn.difference = Wi, Fn.differenceBy = Bi, Fn.differenceWith = $i, Fn.drop = function (e, t, n) { var r = null == e ? 0 : e.length; return r ? to(e, (t = n || t === o ? 1 : ys(t)) < 0 ? 0 : t, r) : []; }, Fn.dropRight = function (e, t, n) { var r = null == e ? 0 : e.length; return r ? to(e, 0, (t = r - (t = n || t === o ? 1 : ys(t))) < 0 ? 0 : t) : []; }, Fn.dropRightWhile = function (e, t) { return e && e.length ? fo(e, si(t, 3), !0, !0) : []; }, Fn.dropWhile = function (e, t) { return e && e.length ? fo(e, si(t, 3), !0) : []; }, Fn.fill = function (e, t, n, r) { var i = null == e ? 0 : e.length; return i ? (n && "number" != typeof n && vi(e, t, n) && (n = 0, r = i), function (e, t, n, r) { var i = e.length; for ((n = ys(n)) < 0 && (n = -n > i ? 0 : i + n), (r = r === o || r > i ? i : ys(r)) < 0 && (r += i), r = n > r ? 0 : gs(r); n < r;)
        e[n++] = t; return e; }(e, t, n, r)) : []; }, Fn.filter = function (e, t) { return (Va(e) ? _t : yr)(e, si(t, 3)); }, Fn.flatMap = function (e, t) { return gr(Sa(e, t), 1); }, Fn.flatMapDeep = function (e, t) { return gr(Sa(e, t), l); }, Fn.flatMapDepth = function (e, t, n) { return n = n === o ? 1 : ys(n), gr(Sa(e, t), n); }, Fn.flatten = Ki, Fn.flattenDeep = function (e) { return null != e && e.length ? gr(e, l) : []; }, Fn.flattenDepth = function (e, t) { return null != e && e.length ? gr(e, t = t === o ? 1 : ys(t)) : []; }, Fn.flip = function (e) { return Yo(e, 512); }, Fn.flow = nc, Fn.flowRight = rc, Fn.fromPairs = function (e) { for (var t = -1, n = null == e ? 0 : e.length, r = {}; ++t < n;) {
        var o = e[t];
        r[o[0]] = o[1];
    } return r; }, Fn.functions = function (e) { return null == e ? [] : Er(e, Ps(e)); }, Fn.functionsIn = function (e) { return null == e ? [] : Er(e, Is(e)); }, Fn.groupBy = Ea, Fn.initial = function (e) { return null != e && e.length ? to(e, 0, -1) : []; }, Fn.intersection = zi, Fn.intersectionBy = Xi, Fn.intersectionWith = Yi, Fn.invert = ws, Fn.invertBy = xs, Fn.invokeMap = _a, Fn.iteratee = ic, Fn.keyBy = Ra, Fn.keys = Ps, Fn.keysIn = Is, Fn.map = Sa, Fn.mapKeys = function (e, t) { var n = {}; return t = si(t, 3), br(e, (function (e, r, o) { or(n, t(e, r, o), e); })), n; }, Fn.mapValues = function (e, t) { var n = {}; return t = si(t, 3), br(e, (function (e, r, o) { or(n, r, t(e, r, o)); })), n; }, Fn.matches = function (e) { return Ur(sr(e, 1)); }, Fn.matchesProperty = function (e, t) { return Fr(e, sr(t, 1)); }, Fn.memoize = La, Fn.merge = Ds, Fn.mergeWith = Ls, Fn.method = ac, Fn.methodOf = sc, Fn.mixin = cc, Fn.negate = Ma, Fn.nthArg = function (e) { return e = ys(e), zr((function (t) { return Wr(t, e); })); }, Fn.omit = Ms, Fn.omitBy = function (e, t) { return Us(e, Ma(si(t))); }, Fn.once = function (e) { return wa(2, e); }, Fn.orderBy = function (e, t, n, r) { return null == e ? [] : (Va(t) || (t = null == t ? [] : [t]), Va(n = r ? o : n) || (n = null == n ? [] : [n]), Br(e, t, n)); }, Fn.over = lc, Fn.overArgs = ja, Fn.overEvery = fc, Fn.overSome = pc, Fn.partial = Ua, Fn.partialRight = Fa, Fn.partition = Oa, Fn.pick = js, Fn.pickBy = Us, Fn.property = hc, Fn.propertyOf = function (e) { return function (t) { return null == e ? o : _r(e, t); }; }, Fn.pull = Qi, Fn.pullAll = Zi, Fn.pullAllBy = function (e, t, n) { return e && e.length && t && t.length ? Hr(e, t, si(n, 2)) : e; }, Fn.pullAllWith = function (e, t, n) { return e && e.length && t && t.length ? Hr(e, t, o, n) : e; }, Fn.pullAt = ea, Fn.range = dc, Fn.rangeRight = yc, Fn.rearg = qa, Fn.reject = function (e, t) { return (Va(e) ? _t : yr)(e, Ma(si(t, 3))); }, Fn.remove = function (e, t) { var n = []; if (!e || !e.length)
        return n; var r = -1, o = [], i = e.length; for (t = si(t, 3); ++r < i;) {
        var a = e[r];
        t(a, r, e) && (n.push(a), o.push(r));
    } return Vr(e, o), n; }, Fn.rest = function (e, t) { if ("function" != typeof e)
        throw new Ne(i); return zr(e, t = t === o ? t : ys(t)); }, Fn.reverse = ta, Fn.sampleSize = function (e, t, n) { return t = (n ? vi(e, t, n) : t === o) ? 1 : ys(t), (Va(e) ? Jn : Yr)(e, t); }, Fn.set = function (e, t, n) { return null == e ? e : Jr(e, t, n); }, Fn.setWith = function (e, t, n, r) { return r = "function" == typeof r ? r : o, null == e ? e : Jr(e, t, n, r); }, Fn.shuffle = function (e) { return (Va(e) ? Qn : eo)(e); }, Fn.slice = function (e, t, n) { var r = null == e ? 0 : e.length; return r ? (n && "number" != typeof n && vi(e, t, n) ? (t = 0, n = r) : (t = null == t ? 0 : ys(t), n = n === o ? r : ys(n)), to(e, t, n)) : []; }, Fn.sortBy = Aa, Fn.sortedUniq = function (e) { return e && e.length ? io(e) : []; }, Fn.sortedUniqBy = function (e, t) { return e && e.length ? io(e, si(t, 2)) : []; }, Fn.split = function (e, t, n) { return n && "number" != typeof n && vi(e, t, n) && (t = n = o), (n = n === o ? h : n >>> 0) ? (e = bs(e)) && ("string" == typeof t || null != t && !as(t)) && !(t = so(t)) && Qt(e) ? To(an(e), 0, n) : e.split(t, n) : []; }, Fn.spread = function (e, t) { if ("function" != typeof e)
        throw new Ne(i); return t = null == t ? 0 : mn(ys(t), 0), zr((function (n) { var r = n[t], o = To(n, 0, t); return r && At(o, r), mt(e, this, o); })); }, Fn.tail = function (e) { var t = null == e ? 0 : e.length; return t ? to(e, 1, t) : []; }, Fn.take = function (e, t, n) { return e && e.length ? to(e, 0, (t = n || t === o ? 1 : ys(t)) < 0 ? 0 : t) : []; }, Fn.takeRight = function (e, t, n) { var r = null == e ? 0 : e.length; return r ? to(e, (t = r - (t = n || t === o ? 1 : ys(t))) < 0 ? 0 : t, r) : []; }, Fn.takeRightWhile = function (e, t) { return e && e.length ? fo(e, si(t, 3), !1, !0) : []; }, Fn.takeWhile = function (e, t) { return e && e.length ? fo(e, si(t, 3)) : []; }, Fn.tap = function (e, t) { return t(e), e; }, Fn.throttle = function (e, t, n) { var r = !0, o = !0; if ("function" != typeof e)
        throw new Ne(i); return ts(n) && (r = "leading" in n ? !!n.leading : r, o = "trailing" in n ? !!n.trailing : o), Pa(e, t, { leading: r, maxWait: t, trailing: o }); }, Fn.thru = da, Fn.toArray = hs, Fn.toPairs = Fs, Fn.toPairsIn = qs, Fn.toPath = function (e) { return Va(e) ? Ot(e, Ui) : us(e) ? [e] : ko(ji(bs(e))); }, Fn.toPlainObject = vs, Fn.transform = function (e, t, n) { var r = Va(e), o = r || Xa(e) || ls(e); if (t = si(t, 4), null == n) {
        var i = e && e.constructor;
        n = o ? r ? new i : [] : ts(e) && Qa(i) ? qn(Ke(e)) : {};
    } return (o ? bt : br)(e, (function (e, r, o) { return t(n, e, r, o); })), n; }, Fn.unary = function (e) { return ka(e, 1); }, Fn.union = na, Fn.unionBy = ra, Fn.unionWith = oa, Fn.uniq = function (e) { return e && e.length ? co(e) : []; }, Fn.uniqBy = function (e, t) { return e && e.length ? co(e, si(t, 2)) : []; }, Fn.uniqWith = function (e, t) { return t = "function" == typeof t ? t : o, e && e.length ? co(e, o, t) : []; }, Fn.unset = function (e, t) { return null == e || uo(e, t); }, Fn.unzip = ia, Fn.unzipWith = aa, Fn.update = function (e, t, n) { return null == e ? e : lo(e, t, mo(n)); }, Fn.updateWith = function (e, t, n, r) { return r = "function" == typeof r ? r : o, null == e ? e : lo(e, t, mo(n), r); }, Fn.values = Ws, Fn.valuesIn = function (e) { return null == e ? [] : Ht(e, Is(e)); }, Fn.without = sa, Fn.words = Qs, Fn.wrap = function (e, t) { return Ua(mo(t), e); }, Fn.xor = ca, Fn.xorBy = ua, Fn.xorWith = la, Fn.zip = fa, Fn.zipObject = function (e, t) { return yo(e || [], t || [], er); }, Fn.zipObjectDeep = function (e, t) { return yo(e || [], t || [], Jr); }, Fn.zipWith = pa, Fn.entries = Fs, Fn.entriesIn = qs, Fn.extend = Es, Fn.extendWith = _s, cc(Fn, Fn), Fn.add = bc, Fn.attempt = Zs, Fn.camelCase = Bs, Fn.capitalize = $s, Fn.ceil = Tc, Fn.clamp = function (e, t, n) { return n === o && (n = t, t = o), n !== o && (n = (n = ms(n)) == n ? n : 0), t !== o && (t = (t = ms(t)) == t ? t : 0), ar(ms(e), t, n); }, Fn.clone = function (e) { return sr(e, 4); }, Fn.cloneDeep = function (e) { return sr(e, 5); }, Fn.cloneDeepWith = function (e, t) { return sr(e, 5, t = "function" == typeof t ? t : o); }, Fn.cloneWith = function (e, t) { return sr(e, 4, t = "function" == typeof t ? t : o); }, Fn.conformsTo = function (e, t) { return null == t || cr(e, t, Ps(t)); }, Fn.deburr = Hs, Fn.defaultTo = function (e, t) { return null == e || e != e ? t : e; }, Fn.divide = Ec, Fn.endsWith = function (e, t, n) { e = bs(e), t = so(t); var r = e.length, i = n = n === o ? r : ar(ys(n), 0, r); return (n -= t.length) >= 0 && e.slice(n, i) == t; }, Fn.eq = Wa, Fn.escape = function (e) { return (e = bs(e)) && z.test(e) ? e.replace(K, Yt) : e; }, Fn.escapeRegExp = function (e) { return (e = bs(e)) && ne.test(e) ? e.replace(te, "\\$&") : e; }, Fn.every = function (e, t, n) { var r = Va(e) ? Et : hr; return n && vi(e, t, n) && (t = o), r(e, si(t, 3)); }, Fn.find = ma, Fn.findIndex = Hi, Fn.findKey = function (e, t) { return Ct(e, si(t, 3), br); }, Fn.findLast = va, Fn.findLastIndex = Vi, Fn.findLastKey = function (e, t) { return Ct(e, si(t, 3), Tr); }, Fn.floor = _c, Fn.forEach = ba, Fn.forEachRight = Ta, Fn.forIn = function (e, t) { return null == e ? e : mr(e, si(t, 3), Is); }, Fn.forInRight = function (e, t) { return null == e ? e : vr(e, si(t, 3), Is); }, Fn.forOwn = function (e, t) { return e && br(e, si(t, 3)); }, Fn.forOwnRight = function (e, t) { return e && Tr(e, si(t, 3)); }, Fn.get = Ns, Fn.gt = Ba, Fn.gte = $a, Fn.has = function (e, t) { return null != e && di(e, t, Ar); }, Fn.hasIn = ks, Fn.head = Gi, Fn.identity = oc, Fn.includes = function (e, t, n, r) { e = Ga(e) ? e : Ws(e), n = n && !r ? ys(n) : 0; var o = e.length; return n < 0 && (n = mn(o + n, 0)), cs(e) ? n <= o && e.indexOf(t, n) > -1 : !!o && It(e, t, n) > -1; }, Fn.indexOf = function (e, t, n) { var r = null == e ? 0 : e.length; if (!r)
        return -1; var o = null == n ? 0 : ys(n); return o < 0 && (o = mn(r + o, 0)), It(e, t, o); }, Fn.inRange = function (e, t, n) { return t = ds(t), n === o ? (n = t, t = 0) : n = ds(n), function (e, t, n) { return e >= vn(t, n) && e < mn(t, n); }(e = ms(e), t, n); }, Fn.invoke = Cs, Fn.isArguments = Ha, Fn.isArray = Va, Fn.isArrayBuffer = Ka, Fn.isArrayLike = Ga, Fn.isArrayLikeObject = za, Fn.isBoolean = function (e) { return !0 === e || !1 === e || ns(e) && Sr(e) == m; }, Fn.isBuffer = Xa, Fn.isDate = Ya, Fn.isElement = function (e) { return ns(e) && 1 === e.nodeType && !is(e); }, Fn.isEmpty = function (e) { if (null == e)
        return !0; if (Ga(e) && (Va(e) || "string" == typeof e || "function" == typeof e.splice || Xa(e) || ls(e) || Ha(e)))
        return !e.length; var t = hi(e); if (t == _ || t == N)
        return !e.size; if (_i(e))
        return !Lr(e).length; for (var n in e)
        if (Ie.call(e, n))
            return !1; return !0; }, Fn.isEqual = function (e, t) { return Cr(e, t); }, Fn.isEqualWith = function (e, t, n) { var r = (n = "function" == typeof n ? n : o) ? n(e, t) : o; return r === o ? Cr(e, t, o, n) : !!r; }, Fn.isError = Ja, Fn.isFinite = function (e) { return "number" == typeof e && dn(e); }, Fn.isFunction = Qa, Fn.isInteger = Za, Fn.isLength = es, Fn.isMap = rs, Fn.isMatch = function (e, t) { return e === t || Pr(e, t, ui(t)); }, Fn.isMatchWith = function (e, t, n) { return n = "function" == typeof n ? n : o, Pr(e, t, ui(t), n); }, Fn.isNaN = function (e) { return os(e) && e != +e; }, Fn.isNative = function (e) { if (Ei(e))
        throw new Ee("Unsupported core-js use. Try https://npms.io/search?q=ponyfill."); return Ir(e); }, Fn.isNil = function (e) { return null == e; }, Fn.isNull = function (e) { return null === e; }, Fn.isNumber = os, Fn.isObject = ts, Fn.isObjectLike = ns, Fn.isPlainObject = is, Fn.isRegExp = as, Fn.isSafeInteger = function (e) { return Za(e) && e >= -9007199254740991 && e <= f; }, Fn.isSet = ss, Fn.isString = cs, Fn.isSymbol = us, Fn.isTypedArray = ls, Fn.isUndefined = function (e) { return e === o; }, Fn.isWeakMap = function (e) { return ns(e) && hi(e) == x; }, Fn.isWeakSet = function (e) { return ns(e) && "[object WeakSet]" == Sr(e); }, Fn.join = function (e, t) { return null == e ? "" : yn.call(e, t); }, Fn.kebabCase = Vs, Fn.last = Ji, Fn.lastIndexOf = function (e, t, n) { var r = null == e ? 0 : e.length; if (!r)
        return -1; var i = r; return n !== o && (i = (i = ys(n)) < 0 ? mn(r + i, 0) : vn(i, r - 1)), t == t ? function (e, t, n) { for (var r = n + 1; r--;)
        if (e[r] === t)
            return r; return r; }(e, t, i) : Pt(e, Lt, i, !0); }, Fn.lowerCase = Ks, Fn.lowerFirst = Gs, Fn.lt = fs, Fn.lte = ps, Fn.max = function (e) { return e && e.length ? dr(e, oc, Or) : o; }, Fn.maxBy = function (e, t) { return e && e.length ? dr(e, si(t, 2), Or) : o; }, Fn.mean = function (e) { return Mt(e, oc); }, Fn.meanBy = function (e, t) { return Mt(e, si(t, 2)); }, Fn.min = function (e) { return e && e.length ? dr(e, oc, Mr) : o; }, Fn.minBy = function (e, t) { return e && e.length ? dr(e, si(t, 2), Mr) : o; }, Fn.stubArray = gc, Fn.stubFalse = mc, Fn.stubObject = function () { return {}; }, Fn.stubString = function () { return ""; }, Fn.stubTrue = function () { return !0; }, Fn.multiply = Rc, Fn.nth = function (e, t) { return e && e.length ? Wr(e, ys(t)) : o; }, Fn.noConflict = function () { return it._ === this && (it._ = Ue), this; }, Fn.noop = uc, Fn.now = Na, Fn.pad = function (e, t, n) { e = bs(e); var r = (t = ys(t)) ? on(e) : 0; if (!t || r >= t)
        return e; var o = (t - r) / 2; return $o(fn(o), n) + e + $o(ln(o), n); }, Fn.padEnd = function (e, t, n) { e = bs(e); var r = (t = ys(t)) ? on(e) : 0; return t && r < t ? e + $o(t - r, n) : e; }, Fn.padStart = function (e, t, n) { e = bs(e); var r = (t = ys(t)) ? on(e) : 0; return t && r < t ? $o(t - r, n) + e : e; }, Fn.parseInt = function (e, t, n) { return n || null == t ? t = 0 : t && (t = +t), Tn(bs(e).replace(re, ""), t || 0); }, Fn.random = function (e, t, n) { if (n && "boolean" != typeof n && vi(e, t, n) && (t = n = o), n === o && ("boolean" == typeof t ? (n = t, t = o) : "boolean" == typeof e && (n = e, e = o)), e === o && t === o ? (e = 0, t = 1) : (e = ds(e), t === o ? (t = e, e = 0) : t = ds(t)), e > t) {
        var r = e;
        e = t, t = r;
    } if (n || e % 1 || t % 1) {
        var i = En();
        return vn(e + i * (t - e + tt("1e-" + ((i + "").length - 1))), t);
    } return Kr(e, t); }, Fn.reduce = function (e, t, n) { var r = Va(e) ? Nt : Ft, o = arguments.length < 3; return r(e, si(t, 4), n, o, fr); }, Fn.reduceRight = function (e, t, n) { var r = Va(e) ? kt : Ft, o = arguments.length < 3; return r(e, si(t, 4), n, o, pr); }, Fn.repeat = function (e, t, n) { return t = (n ? vi(e, t, n) : t === o) ? 1 : ys(t), Gr(bs(e), t); }, Fn.replace = function () { var e = arguments, t = bs(e[0]); return e.length < 3 ? t : t.replace(e[1], e[2]); }, Fn.result = function (e, t, n) { var r = -1, i = (t = vo(t, e)).length; for (i || (i = 1, e = o); ++r < i;) {
        var a = null == e ? o : e[Ui(t[r])];
        a === o && (r = i, a = n), e = Qa(a) ? a.call(e) : a;
    } return e; }, Fn.round = Sc, Fn.runInContext = e, Fn.sample = function (e) { return (Va(e) ? Yn : Xr)(e); }, Fn.size = function (e) { if (null == e)
        return 0; if (Ga(e))
        return cs(e) ? on(e) : e.length; var t = hi(e); return t == _ || t == N ? e.size : Lr(e).length; }, Fn.snakeCase = zs, Fn.some = function (e, t, n) { var r = Va(e) ? wt : no; return n && vi(e, t, n) && (t = o), r(e, si(t, 3)); }, Fn.sortedIndex = function (e, t) { return ro(e, t); }, Fn.sortedIndexBy = function (e, t, n) { return oo(e, t, si(n, 2)); }, Fn.sortedIndexOf = function (e, t) { var n = null == e ? 0 : e.length; if (n) {
        var r = ro(e, t);
        if (r < n && Wa(e[r], t))
            return r;
    } return -1; }, Fn.sortedLastIndex = function (e, t) { return ro(e, t, !0); }, Fn.sortedLastIndexBy = function (e, t, n) { return oo(e, t, si(n, 2), !0); }, Fn.sortedLastIndexOf = function (e, t) { if (null != e && e.length) {
        var n = ro(e, t, !0) - 1;
        if (Wa(e[n], t))
            return n;
    } return -1; }, Fn.startCase = Xs, Fn.startsWith = function (e, t, n) { return e = bs(e), n = null == n ? 0 : ar(ys(n), 0, e.length), t = so(t), e.slice(n, n + t.length) == t; }, Fn.subtract = Oc, Fn.sum = function (e) { return e && e.length ? qt(e, oc) : 0; }, Fn.sumBy = function (e, t) { return e && e.length ? qt(e, si(t, 2)) : 0; }, Fn.template = function (e, t, n) { var r = Fn.templateSettings; n && vi(e, t, n) && (t = o), e = bs(e), t = _s({}, t, r, Jo); var i, a, s = _s({}, t.imports, r.imports, Jo), c = Ps(s), u = Ht(s, c), l = 0, f = t.interpolate || be, p = "__p += '", h = Oe((t.escape || be).source + "|" + f.source + "|" + (f === J ? fe : be).source + "|" + (t.evaluate || be).source + "|$", "g"), d = "//# sourceURL=" + (Ie.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Je + "]") + "\n"; e.replace(h, (function (t, n, r, o, s, c) { return r || (r = o), p += e.slice(l, c).replace(Te, Jt), n && (i = !0, p += "' +\n__e(" + n + ") +\n'"), s && (a = !0, p += "';\n" + s + ";\n__p += '"), r && (p += "' +\n((__t = (" + r + ")) == null ? '' : __t) +\n'"), l = c + t.length, t; })), p += "';\n"; var y = Ie.call(t, "variable") && t.variable; if (y) {
        if (ue.test(y))
            throw new Ee("Invalid `variable` option passed into `_.template`");
    }
    else
        p = "with (obj) {\n" + p + "\n}\n"; p = (a ? p.replace(B, "") : p).replace($, "$1").replace(H, "$1;"), p = "function(" + (y || "obj") + ") {\n" + (y ? "" : "obj || (obj = {});\n") + "var __t, __p = ''" + (i ? ", __e = _.escape" : "") + (a ? ", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n" : ";\n") + p + "return __p\n}"; var g = Zs((function () { return _e(c, d + "return " + p).apply(o, u); })); if (g.source = p, Ja(g))
        throw g; return g; }, Fn.times = function (e, t) { if ((e = ys(e)) < 1 || e > f)
        return []; var n = h, r = vn(e, h); t = si(t), e -= h; for (var o = Wt(r, t); ++n < e;)
        t(n); return o; }, Fn.toFinite = ds, Fn.toInteger = ys, Fn.toLength = gs, Fn.toLower = function (e) { return bs(e).toLowerCase(); }, Fn.toNumber = ms, Fn.toSafeInteger = function (e) { return e ? ar(ys(e), -9007199254740991, f) : 0 === e ? e : 0; }, Fn.toString = bs, Fn.toUpper = function (e) { return bs(e).toUpperCase(); }, Fn.trim = function (e, t, n) { if ((e = bs(e)) && (n || t === o))
        return Bt(e); if (!e || !(t = so(t)))
        return e; var r = an(e), i = an(t); return To(r, Kt(r, i), Gt(r, i) + 1).join(""); }, Fn.trimEnd = function (e, t, n) { if ((e = bs(e)) && (n || t === o))
        return e.slice(0, sn(e) + 1); if (!e || !(t = so(t)))
        return e; var r = an(e); return To(r, 0, Gt(r, an(t)) + 1).join(""); }, Fn.trimStart = function (e, t, n) { if ((e = bs(e)) && (n || t === o))
        return e.replace(re, ""); if (!e || !(t = so(t)))
        return e; var r = an(e); return To(r, Kt(r, an(t))).join(""); }, Fn.truncate = function (e, t) { var n = 30, r = "..."; if (ts(t)) {
        var i = "separator" in t ? t.separator : i;
        n = "length" in t ? ys(t.length) : n, r = "omission" in t ? so(t.omission) : r;
    } var a = (e = bs(e)).length; if (Qt(e)) {
        var s = an(e);
        a = s.length;
    } if (n >= a)
        return e; var c = n - on(r); if (c < 1)
        return r; var u = s ? To(s, 0, c).join("") : e.slice(0, c); if (i === o)
        return u + r; if (s && (c += u.length - c), as(i)) {
        if (e.slice(c).search(i)) {
            var l, f = u;
            for (i.global || (i = Oe(i.source, bs(pe.exec(i)) + "g")), i.lastIndex = 0; l = i.exec(f);)
                var p = l.index;
            u = u.slice(0, p === o ? c : p);
        }
    }
    else if (e.indexOf(so(i), c) != c) {
        var h = u.lastIndexOf(i);
        h > -1 && (u = u.slice(0, h));
    } return u + r; }, Fn.unescape = function (e) { return (e = bs(e)) && G.test(e) ? e.replace(V, cn) : e; }, Fn.uniqueId = function (e) { var t = ++De; return bs(e) + t; }, Fn.upperCase = Ys, Fn.upperFirst = Js, Fn.each = ba, Fn.eachRight = Ta, Fn.first = Gi, cc(Fn, (vc = {}, br(Fn, (function (e, t) { Ie.call(Fn.prototype, t) || (vc[t] = e); })), vc), { chain: !1 }), Fn.VERSION = "4.17.21", bt(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], (function (e) { Fn[e].placeholder = Fn; })), bt(["drop", "take"], (function (e, t) { $n.prototype[e] = function (n) { n = n === o ? 1 : mn(ys(n), 0); var r = this.__filtered__ && !t ? new $n(this) : this.clone(); return r.__filtered__ ? r.__takeCount__ = vn(n, r.__takeCount__) : r.__views__.push({ size: vn(n, h), type: e + (r.__dir__ < 0 ? "Right" : "") }), r; }, $n.prototype[e + "Right"] = function (t) { return this.reverse()[e](t).reverse(); }; })), bt(["filter", "map", "takeWhile"], (function (e, t) { var n = t + 1, r = 1 == n || 3 == n; $n.prototype[e] = function (e) { var t = this.clone(); return t.__iteratees__.push({ iteratee: si(e, 3), type: n }), t.__filtered__ = t.__filtered__ || r, t; }; })), bt(["head", "last"], (function (e, t) { var n = "take" + (t ? "Right" : ""); $n.prototype[e] = function () { return this[n](1).value()[0]; }; })), bt(["initial", "tail"], (function (e, t) { var n = "drop" + (t ? "" : "Right"); $n.prototype[e] = function () { return this.__filtered__ ? new $n(this) : this[n](1); }; })), $n.prototype.compact = function () { return this.filter(oc); }, $n.prototype.find = function (e) { return this.filter(e).head(); }, $n.prototype.findLast = function (e) { return this.reverse().find(e); }, $n.prototype.invokeMap = zr((function (e, t) { return "function" == typeof e ? new $n(this) : this.map((function (n) { return wr(n, e, t); })); })), $n.prototype.reject = function (e) { return this.filter(Ma(si(e))); }, $n.prototype.slice = function (e, t) { e = ys(e); var n = this; return n.__filtered__ && (e > 0 || t < 0) ? new $n(n) : (e < 0 ? n = n.takeRight(-e) : e && (n = n.drop(e)), t !== o && (n = (t = ys(t)) < 0 ? n.dropRight(-t) : n.take(t - e)), n); }, $n.prototype.takeRightWhile = function (e) { return this.reverse().takeWhile(e).reverse(); }, $n.prototype.toArray = function () { return this.take(h); }, br($n.prototype, (function (e, t) { var n = /^(?:filter|find|map|reject)|While$/.test(t), r = /^(?:head|last)$/.test(t), i = Fn[r ? "take" + ("last" == t ? "Right" : "") : t], a = r || /^find/.test(t); i && (Fn.prototype[t] = function () { var t = this.__wrapped__, s = r ? [1] : arguments, c = t instanceof $n, u = s[0], l = c || Va(t), f = function (e) { var t = i.apply(Fn, At([e], s)); return r && p ? t[0] : t; }; l && n && "function" == typeof u && 1 != u.length && (c = l = !1); var p = this.__chain__, h = !!this.__actions__.length, d = a && !p, y = c && !h; if (!a && l) {
        t = y ? t : new $n(this);
        var g = e.apply(t, s);
        return g.__actions__.push({ func: da, args: [f], thisArg: o }), new Bn(g, p);
    } return d && y ? e.apply(this, s) : (g = this.thru(f), d ? r ? g.value()[0] : g.value() : g); }); })), bt(["pop", "push", "shift", "sort", "splice", "unshift"], (function (e) { var t = ke[e], n = /^(?:push|sort|unshift)$/.test(e) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(e); Fn.prototype[e] = function () { var e = arguments; if (r && !this.__chain__) {
        var o = this.value();
        return t.apply(Va(o) ? o : [], e);
    } return this[n]((function (n) { return t.apply(Va(n) ? n : [], e); })); }; })), br($n.prototype, (function (e, t) { var n = Fn[t]; if (n) {
        var r = n.name + "";
        Ie.call(xn, r) || (xn[r] = []), xn[r].push({ name: t, func: n });
    } })), xn[Fo(o, 2).name] = [{ name: "wrapper", func: o }], $n.prototype.clone = function () { var e = new $n(this.__wrapped__); return e.__actions__ = ko(this.__actions__), e.__dir__ = this.__dir__, e.__filtered__ = this.__filtered__, e.__iteratees__ = ko(this.__iteratees__), e.__takeCount__ = this.__takeCount__, e.__views__ = ko(this.__views__), e; }, $n.prototype.reverse = function () { if (this.__filtered__) {
        var e = new $n(this);
        e.__dir__ = -1, e.__filtered__ = !0;
    }
    else
        (e = this.clone()).__dir__ *= -1; return e; }, $n.prototype.value = function () { var e = this.__wrapped__.value(), t = this.__dir__, n = Va(e), r = t < 0, o = n ? e.length : 0, i = function (e, t, n) { for (var r = -1, o = n.length; ++r < o;) {
        var i = n[r], a = i.size;
        switch (i.type) {
            case "drop":
                e += a;
                break;
            case "dropRight":
                t -= a;
                break;
            case "take":
                t = vn(t, e + a);
                break;
            case "takeRight": e = mn(e, t - a);
        }
    } return { start: e, end: t }; }(0, o, this.__views__), a = i.start, s = i.end, c = s - a, u = r ? s : a - 1, l = this.__iteratees__, f = l.length, p = 0, h = vn(c, this.__takeCount__); if (!n || !r && o == c && h == c)
        return po(e, this.__actions__); var d = []; e: for (; c-- && p < h;) {
        for (var y = -1, g = e[u += t]; ++y < f;) {
            var m = l[y], v = m.iteratee, b = m.type, T = v(g);
            if (2 == b)
                g = T;
            else if (!T) {
                if (1 == b)
                    continue e;
                break e;
            }
        }
        d[p++] = g;
    } return d; }, Fn.prototype.at = ya, Fn.prototype.chain = function () { return ha(this); }, Fn.prototype.commit = function () { return new Bn(this.value(), this.__chain__); }, Fn.prototype.next = function () { this.__values__ === o && (this.__values__ = hs(this.value())); var e = this.__index__ >= this.__values__.length; return { done: e, value: e ? o : this.__values__[this.__index__++] }; }, Fn.prototype.plant = function (e) { for (var t, n = this; n instanceof Wn;) {
        var r = qi(n);
        r.__index__ = 0, r.__values__ = o, t ? i.__wrapped__ = r : t = r;
        var i = r;
        n = n.__wrapped__;
    } return i.__wrapped__ = e, t; }, Fn.prototype.reverse = function () { var e = this.__wrapped__; if (e instanceof $n) {
        var t = e;
        return this.__actions__.length && (t = new $n(this)), (t = t.reverse()).__actions__.push({ func: da, args: [ta], thisArg: o }), new Bn(t, this.__chain__);
    } return this.thru(ta); }, Fn.prototype.toJSON = Fn.prototype.valueOf = Fn.prototype.value = function () { return po(this.__wrapped__, this.__actions__); }, Fn.prototype.first = Fn.prototype.head, at && (Fn.prototype[at] = function () { return this; }), Fn; }(); it._ = un, (r = function () { return un; }.call(t, n, t, e)) === o || (e.exports = r); }.call(this); }, 8169: e => {
        "use strict";
        var t = function (e) { return e != e; };
        e.exports = function (e, n) { return 0 === e && 0 === n ? 1 / e == 1 / n : e === n || !(!t(e) || !t(n)); };
    }, 4679: (e, t, n) => {
        "use strict";
        var r = n(4926), o = n(9429), i = n(8169), a = n(8070), s = n(191), c = o(a(), Object);
        r(c, { getPolyfill: a, implementation: i, shim: s }), e.exports = c;
    }, 8070: (e, t, n) => {
        "use strict";
        var r = n(8169);
        e.exports = function () { return "function" == typeof Object.is ? Object.is : r; };
    }, 191: (e, t, n) => {
        "use strict";
        var r = n(8070), o = n(4926);
        e.exports = function () { var e = r(); return o(Object, { is: e }, { is: function () { return Object.is !== e; } }), e; };
    }, 5691: (e, t, n) => {
        "use strict";
        var r;
        if (!Object.keys) {
            var o = Object.prototype.hasOwnProperty, i = Object.prototype.toString, a = n(801), s = Object.prototype.propertyIsEnumerable, c = !s.call({ toString: null }, "toString"), u = s.call((function () { }), "prototype"), l = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"], f = function (e) { var t = e.constructor; return t && t.prototype === e; }, p = { $applicationCache: !0, $console: !0, $external: !0, $frame: !0, $frameElement: !0, $frames: !0, $innerHeight: !0, $innerWidth: !0, $onmozfullscreenchange: !0, $onmozfullscreenerror: !0, $outerHeight: !0, $outerWidth: !0, $pageXOffset: !0, $pageYOffset: !0, $parent: !0, $scrollLeft: !0, $scrollTop: !0, $scrollX: !0, $scrollY: !0, $self: !0, $webkitIndexedDB: !0, $webkitStorageInfo: !0, $window: !0 }, h = function () { if ("undefined" == typeof window)
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
            r = function (e) { var t = null !== e && "object" == typeof e, n = "[object Function]" === i.call(e), r = a(e), s = t && "[object String]" === i.call(e), p = []; if (!t && !n && !r)
                throw new TypeError("Object.keys called on a non-object"); var d = u && n; if (s && e.length > 0 && !o.call(e, 0))
                for (var y = 0; y < e.length; ++y)
                    p.push(String(y)); if (r && e.length > 0)
                for (var g = 0; g < e.length; ++g)
                    p.push(String(g));
            else
                for (var m in e)
                    d && "prototype" === m || !o.call(e, m) || p.push(String(m)); if (c)
                for (var v = function (e) { if ("undefined" == typeof window || !h)
                    return f(e); try {
                    return f(e);
                }
                catch (e) {
                    return !1;
                } }(e), b = 0; b < l.length; ++b)
                    v && "constructor" === l[b] || !o.call(e, l[b]) || p.push(l[b]); return p; };
        }
        e.exports = r;
    }, 3464: (e, t, n) => {
        "use strict";
        var r = Array.prototype.slice, o = n(801), i = Object.keys, a = i ? function (e) { return i(e); } : n(5691), s = Object.keys;
        a.shim = function () { if (Object.keys) {
            var e = function () { var e = Object.keys(arguments); return e && e.length === arguments.length; }(1, 2);
            e || (Object.keys = function (e) { return o(e) ? s(r.call(e)) : s(e); });
        }
        else
            Object.keys = a; return Object.keys || a; }, e.exports = a;
    }, 801: e => {
        "use strict";
        var t = Object.prototype.toString;
        e.exports = function (e) { var n = t.call(e), r = "[object Arguments]" === n; return r || (r = "[object Array]" !== n && null !== e && "object" == typeof e && "number" == typeof e.length && e.length >= 0 && "[object Function]" === t.call(e.callee)), r; };
    }, 4406: e => { var t, n, r = e.exports = {}; function o() { throw new Error("setTimeout has not been defined"); } function i() { throw new Error("clearTimeout has not been defined"); } function a(e) { if (t === setTimeout)
        return setTimeout(e, 0); if ((t === o || !t) && setTimeout)
        return t = setTimeout, setTimeout(e, 0); try {
        return t(e, 0);
    }
    catch (n) {
        try {
            return t.call(null, e, 0);
        }
        catch (n) {
            return t.call(this, e, 0);
        }
    } } !function () { try {
        t = "function" == typeof setTimeout ? setTimeout : o;
    }
    catch (e) {
        t = o;
    } try {
        n = "function" == typeof clearTimeout ? clearTimeout : i;
    }
    catch (e) {
        n = i;
    } }(); var s, c = [], u = !1, l = -1; function f() { u && s && (u = !1, s.length ? c = s.concat(c) : l = -1, c.length && p()); } function p() { if (!u) {
        var e = a(f);
        u = !0;
        for (var t = c.length; t;) {
            for (s = c, c = []; ++l < t;)
                s && s[l].run();
            l = -1, t = c.length;
        }
        s = null, u = !1, function (e) { if (n === clearTimeout)
            return clearTimeout(e); if ((n === i || !n) && clearTimeout)
            return n = clearTimeout, clearTimeout(e); try {
            n(e);
        }
        catch (t) {
            try {
                return n.call(null, e);
            }
            catch (t) {
                return n.call(this, e);
            }
        } }(e);
    } } function h(e, t) { this.fun = e, this.array = t; } function d() { } r.nextTick = function (e) { var t = new Array(arguments.length - 1); if (arguments.length > 1)
        for (var n = 1; n < arguments.length; n++)
            t[n - 1] = arguments[n]; c.push(new h(e, t)), 1 !== c.length || u || a(p); }, h.prototype.run = function () { this.fun.apply(null, this.array); }, r.title = "browser", r.browser = !0, r.env = {}, r.argv = [], r.version = "", r.versions = {}, r.on = d, r.addListener = d, r.once = d, r.off = d, r.removeListener = d, r.removeAllListeners = d, r.emit = d, r.prependListener = d, r.prependOnceListener = d, r.listeners = function (e) { return []; }, r.binding = function (e) { throw new Error("process.binding is not supported"); }, r.cwd = function () { return "/"; }, r.chdir = function (e) { throw new Error("process.chdir is not supported"); }, r.umask = function () { return 0; }; }, 4844: function (e, t) { var n, r; "undefined" != typeof self && self, void 0 === (r = "function" == typeof (n = function () { function e() { } e.prototype.saveState = function () { return { idx: this.idx, input: this.input, groupIdx: this.groupIdx }; }, e.prototype.restoreState = function (e) { this.idx = e.idx, this.input = e.input, this.groupIdx = e.groupIdx; }, e.prototype.pattern = function (e) { this.idx = 0, this.input = e, this.groupIdx = 0, this.consumeChar("/"); var t = this.disjunction(); this.consumeChar("/"); for (var n = { type: "Flags", loc: { begin: this.idx, end: e.length }, global: !1, ignoreCase: !1, multiLine: !1, unicode: !1, sticky: !1 }; this.isRegExpFlag();)
        switch (this.popChar()) {
            case "g":
                s(n, "global");
                break;
            case "i":
                s(n, "ignoreCase");
                break;
            case "m":
                s(n, "multiLine");
                break;
            case "u":
                s(n, "unicode");
                break;
            case "y": s(n, "sticky");
        } if (this.idx !== this.input.length)
        throw Error("Redundant input: " + this.input.substring(this.idx)); return { type: "Pattern", flags: n, value: t, loc: this.loc(0) }; }, e.prototype.disjunction = function () { var e = [], t = this.idx; for (e.push(this.alternative()); "|" === this.peekChar();)
        this.consumeChar("|"), e.push(this.alternative()); return { type: "Disjunction", value: e, loc: this.loc(t) }; }, e.prototype.alternative = function () { for (var e = [], t = this.idx; this.isTerm();)
        e.push(this.term()); return { type: "Alternative", value: e, loc: this.loc(t) }; }, e.prototype.term = function () { return this.isAssertion() ? this.assertion() : this.atom(); }, e.prototype.assertion = function () { var e = this.idx; switch (this.popChar()) {
        case "^": return { type: "StartAnchor", loc: this.loc(e) };
        case "$": return { type: "EndAnchor", loc: this.loc(e) };
        case "\\":
            switch (this.popChar()) {
                case "b": return { type: "WordBoundary", loc: this.loc(e) };
                case "B": return { type: "NonWordBoundary", loc: this.loc(e) };
            }
            throw Error("Invalid Assertion Escape");
        case "(":
            var t;
            switch (this.consumeChar("?"), this.popChar()) {
                case "=":
                    t = "Lookahead";
                    break;
                case "!": t = "NegativeLookahead";
            }
            c(t);
            var n = this.disjunction();
            return this.consumeChar(")"), { type: t, value: n, loc: this.loc(e) };
    } !function () { throw Error("Internal Error - Should never get here!"); }(); }, e.prototype.quantifier = function (e) { var t, n = this.idx; switch (this.popChar()) {
        case "*":
            t = { atLeast: 0, atMost: 1 / 0 };
            break;
        case "+":
            t = { atLeast: 1, atMost: 1 / 0 };
            break;
        case "?":
            t = { atLeast: 0, atMost: 1 };
            break;
        case "{":
            var r = this.integerIncludingZero();
            switch (this.popChar()) {
                case "}":
                    t = { atLeast: r, atMost: r };
                    break;
                case ",": t = this.isDigit() ? { atLeast: r, atMost: this.integerIncludingZero() } : { atLeast: r, atMost: 1 / 0 }, this.consumeChar("}");
            }
            if (!0 === e && void 0 === t)
                return;
            c(t);
    } if (!0 !== e || void 0 !== t)
        return c(t), "?" === this.peekChar(0) ? (this.consumeChar("?"), t.greedy = !1) : t.greedy = !0, t.type = "Quantifier", t.loc = this.loc(n), t; }, e.prototype.atom = function () { var e, t = this.idx; switch (this.peekChar()) {
        case ".":
            e = this.dotAll();
            break;
        case "\\":
            e = this.atomEscape();
            break;
        case "[":
            e = this.characterClass();
            break;
        case "(": e = this.group();
    } return void 0 === e && this.isPatternCharacter() && (e = this.patternCharacter()), c(e), e.loc = this.loc(t), this.isQuantifier() && (e.quantifier = this.quantifier()), e; }, e.prototype.dotAll = function () { return this.consumeChar("."), { type: "Set", complement: !0, value: [i("\n"), i("\r"), i("\u2028"), i("\u2029")] }; }, e.prototype.atomEscape = function () { switch (this.consumeChar("\\"), this.peekChar()) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9": return this.decimalEscapeAtom();
        case "d":
        case "D":
        case "s":
        case "S":
        case "w":
        case "W": return this.characterClassEscape();
        case "f":
        case "n":
        case "r":
        case "t":
        case "v": return this.controlEscapeAtom();
        case "c": return this.controlLetterEscapeAtom();
        case "0": return this.nulCharacterAtom();
        case "x": return this.hexEscapeSequenceAtom();
        case "u": return this.regExpUnicodeEscapeSequenceAtom();
        default: return this.identityEscapeAtom();
    } }, e.prototype.decimalEscapeAtom = function () { return { type: "GroupBackReference", value: this.positiveInteger() }; }, e.prototype.characterClassEscape = function () { var e, t = !1; switch (this.popChar()) {
        case "d":
            e = u;
            break;
        case "D":
            e = u, t = !0;
            break;
        case "s":
            e = f;
            break;
        case "S":
            e = f, t = !0;
            break;
        case "w":
            e = l;
            break;
        case "W": e = l, t = !0;
    } return c(e), { type: "Set", value: e, complement: t }; }, e.prototype.controlEscapeAtom = function () { var e; switch (this.popChar()) {
        case "f":
            e = i("\f");
            break;
        case "n":
            e = i("\n");
            break;
        case "r":
            e = i("\r");
            break;
        case "t":
            e = i("\t");
            break;
        case "v": e = i("\v");
    } return c(e), { type: "Character", value: e }; }, e.prototype.controlLetterEscapeAtom = function () { this.consumeChar("c"); var e = this.popChar(); if (!1 === /[a-zA-Z]/.test(e))
        throw Error("Invalid "); return { type: "Character", value: e.toUpperCase().charCodeAt(0) - 64 }; }, e.prototype.nulCharacterAtom = function () { return this.consumeChar("0"), { type: "Character", value: i("\0") }; }, e.prototype.hexEscapeSequenceAtom = function () { return this.consumeChar("x"), this.parseHexDigits(2); }, e.prototype.regExpUnicodeEscapeSequenceAtom = function () { return this.consumeChar("u"), this.parseHexDigits(4); }, e.prototype.identityEscapeAtom = function () { return { type: "Character", value: i(this.popChar()) }; }, e.prototype.classPatternCharacterAtom = function () { switch (this.peekChar()) {
        case "\n":
        case "\r":
        case "\u2028":
        case "\u2029":
        case "\\":
        case "]": throw Error("TBD");
        default: return { type: "Character", value: i(this.popChar()) };
    } }, e.prototype.characterClass = function () { var e = [], t = !1; for (this.consumeChar("["), "^" === this.peekChar(0) && (this.consumeChar("^"), t = !0); this.isClassAtom();) {
        var n = this.classAtom();
        if ("Character" === n.type && this.isRangeDash()) {
            this.consumeChar("-");
            var r = this.classAtom();
            if ("Character" === r.type) {
                if (r.value < n.value)
                    throw Error("Range out of order in character class");
                e.push({ from: n.value, to: r.value });
            }
            else
                a(n.value, e), e.push(i("-")), a(r.value, e);
        }
        else
            a(n.value, e);
    } return this.consumeChar("]"), { type: "Set", complement: t, value: e }; }, e.prototype.classAtom = function () { switch (this.peekChar()) {
        case "]":
        case "\n":
        case "\r":
        case "\u2028":
        case "\u2029": throw Error("TBD");
        case "\\": return this.classEscape();
        default: return this.classPatternCharacterAtom();
    } }, e.prototype.classEscape = function () { switch (this.consumeChar("\\"), this.peekChar()) {
        case "b": return this.consumeChar("b"), { type: "Character", value: i("\b") };
        case "d":
        case "D":
        case "s":
        case "S":
        case "w":
        case "W": return this.characterClassEscape();
        case "f":
        case "n":
        case "r":
        case "t":
        case "v": return this.controlEscapeAtom();
        case "c": return this.controlLetterEscapeAtom();
        case "0": return this.nulCharacterAtom();
        case "x": return this.hexEscapeSequenceAtom();
        case "u": return this.regExpUnicodeEscapeSequenceAtom();
        default: return this.identityEscapeAtom();
    } }, e.prototype.group = function () { var e = !0; this.consumeChar("("), "?" === this.peekChar(0) ? (this.consumeChar("?"), this.consumeChar(":"), e = !1) : this.groupIdx++; var t = this.disjunction(); this.consumeChar(")"); var n = { type: "Group", capturing: e, value: t }; return e && (n.idx = this.groupIdx), n; }, e.prototype.positiveInteger = function () { var e = this.popChar(); if (!1 === o.test(e))
        throw Error("Expecting a positive integer"); for (; r.test(this.peekChar(0));)
        e += this.popChar(); return parseInt(e, 10); }, e.prototype.integerIncludingZero = function () { var e = this.popChar(); if (!1 === r.test(e))
        throw Error("Expecting an integer"); for (; r.test(this.peekChar(0));)
        e += this.popChar(); return parseInt(e, 10); }, e.prototype.patternCharacter = function () { var e = this.popChar(); switch (e) {
        case "\n":
        case "\r":
        case "\u2028":
        case "\u2029":
        case "^":
        case "$":
        case "\\":
        case ".":
        case "*":
        case "+":
        case "?":
        case "(":
        case ")":
        case "[":
        case "|": throw Error("TBD");
        default: return { type: "Character", value: i(e) };
    } }, e.prototype.isRegExpFlag = function () { switch (this.peekChar(0)) {
        case "g":
        case "i":
        case "m":
        case "u":
        case "y": return !0;
        default: return !1;
    } }, e.prototype.isRangeDash = function () { return "-" === this.peekChar() && this.isClassAtom(1); }, e.prototype.isDigit = function () { return r.test(this.peekChar(0)); }, e.prototype.isClassAtom = function (e) { switch (void 0 === e && (e = 0), this.peekChar(e)) {
        case "]":
        case "\n":
        case "\r":
        case "\u2028":
        case "\u2029": return !1;
        default: return !0;
    } }, e.prototype.isTerm = function () { return this.isAtom() || this.isAssertion(); }, e.prototype.isAtom = function () { if (this.isPatternCharacter())
        return !0; switch (this.peekChar(0)) {
        case ".":
        case "\\":
        case "[":
        case "(": return !0;
        default: return !1;
    } }, e.prototype.isAssertion = function () { switch (this.peekChar(0)) {
        case "^":
        case "$": return !0;
        case "\\": switch (this.peekChar(1)) {
            case "b":
            case "B": return !0;
            default: return !1;
        }
        case "(": return "?" === this.peekChar(1) && ("=" === this.peekChar(2) || "!" === this.peekChar(2));
        default: return !1;
    } }, e.prototype.isQuantifier = function () { var e = this.saveState(); try {
        return void 0 !== this.quantifier(!0);
    }
    catch (e) {
        return !1;
    }
    finally {
        this.restoreState(e);
    } }, e.prototype.isPatternCharacter = function () { switch (this.peekChar()) {
        case "^":
        case "$":
        case "\\":
        case ".":
        case "*":
        case "+":
        case "?":
        case "(":
        case ")":
        case "[":
        case "|":
        case "/":
        case "\n":
        case "\r":
        case "\u2028":
        case "\u2029": return !1;
        default: return !0;
    } }, e.prototype.parseHexDigits = function (e) { for (var t = "", r = 0; r < e; r++) {
        var o = this.popChar();
        if (!1 === n.test(o))
            throw Error("Expecting a HexDecimal digits");
        t += o;
    } return { type: "Character", value: parseInt(t, 16) }; }, e.prototype.peekChar = function (e) { return void 0 === e && (e = 0), this.input[this.idx + e]; }, e.prototype.popChar = function () { var e = this.peekChar(0); return this.consumeChar(), e; }, e.prototype.consumeChar = function (e) { if (void 0 !== e && this.input[this.idx] !== e)
        throw Error("Expected: '" + e + "' but found: '" + this.input[this.idx] + "' at offset: " + this.idx); if (this.idx >= this.input.length)
        throw Error("Unexpected end of input"); this.idx++; }, e.prototype.loc = function (e) { return { begin: e, end: this.idx }; }; var t, n = /[0-9a-fA-F]/, r = /[0-9]/, o = /[1-9]/; function i(e) { return e.charCodeAt(0); } function a(e, t) { void 0 !== e.length ? e.forEach((function (e) { t.push(e); })) : t.push(e); } function s(e, t) { if (!0 === e[t])
        throw "duplicate flag " + t; e[t] = !0; } function c(e) { if (void 0 === e)
        throw Error("Internal Error - Should never get here!"); } var u = []; for (t = i("0"); t <= i("9"); t++)
        u.push(t); var l = [i("_")].concat(u); for (t = i("a"); t <= i("z"); t++)
        l.push(t); for (t = i("A"); t <= i("Z"); t++)
        l.push(t); var f = [i(" "), i("\f"), i("\n"), i("\r"), i("\t"), i("\v"), i("\t"), i(" "), i(" "), i(" "), i(" "), i(" "), i(" "), i(" "), i(" "), i(" "), i(" "), i(" "), i(" "), i(" "), i("\u2028"), i("\u2029"), i(" "), i(" "), i("　"), i("\ufeff")]; function p() { } return p.prototype.visitChildren = function (e) { for (var t in e) {
        var n = e[t];
        e.hasOwnProperty(t) && (void 0 !== n.type ? this.visit(n) : Array.isArray(n) && n.forEach((function (e) { this.visit(e); }), this));
    } }, p.prototype.visit = function (e) { switch (e.type) {
        case "Pattern":
            this.visitPattern(e);
            break;
        case "Flags":
            this.visitFlags(e);
            break;
        case "Disjunction":
            this.visitDisjunction(e);
            break;
        case "Alternative":
            this.visitAlternative(e);
            break;
        case "StartAnchor":
            this.visitStartAnchor(e);
            break;
        case "EndAnchor":
            this.visitEndAnchor(e);
            break;
        case "WordBoundary":
            this.visitWordBoundary(e);
            break;
        case "NonWordBoundary":
            this.visitNonWordBoundary(e);
            break;
        case "Lookahead":
            this.visitLookahead(e);
            break;
        case "NegativeLookahead":
            this.visitNegativeLookahead(e);
            break;
        case "Character":
            this.visitCharacter(e);
            break;
        case "Set":
            this.visitSet(e);
            break;
        case "Group":
            this.visitGroup(e);
            break;
        case "GroupBackReference":
            this.visitGroupBackReference(e);
            break;
        case "Quantifier": this.visitQuantifier(e);
    } this.visitChildren(e); }, p.prototype.visitPattern = function (e) { }, p.prototype.visitFlags = function (e) { }, p.prototype.visitDisjunction = function (e) { }, p.prototype.visitAlternative = function (e) { }, p.prototype.visitStartAnchor = function (e) { }, p.prototype.visitEndAnchor = function (e) { }, p.prototype.visitWordBoundary = function (e) { }, p.prototype.visitNonWordBoundary = function (e) { }, p.prototype.visitLookahead = function (e) { }, p.prototype.visitNegativeLookahead = function (e) { }, p.prototype.visitCharacter = function (e) { }, p.prototype.visitSet = function (e) { }, p.prototype.visitGroup = function (e) { }, p.prototype.visitGroupBackReference = function (e) { }, p.prototype.visitQuantifier = function (e) { }, { RegExpParser: e, BaseRegExpVisitor: p, VERSION: "0.5.0" }; }) ? n.apply(t, []) : n) || (e.exports = r); }, 3401: (e, t, n) => {
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
    }, 9939: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.issueToDiagnostic = t.parsingErrorToDiagnostic = t.lexingErrorToDiagnostic = void 0;
        const r = n(294);
        function o(e) { switch (e) {
            case "error": return r.DiagnosticSeverity.Error;
            case "warning": return r.DiagnosticSeverity.Warning;
            default: return r.DiagnosticSeverity.Information;
        } }
        t.lexingErrorToDiagnostic = function (e, t) { return { message: t.message, range: r.Range.create(e.positionAt(t.offset), e.positionAt(t.offset + t.length)), severity: r.DiagnosticSeverity.Error }; }, t.parsingErrorToDiagnostic = function (e, t) { return { message: t.message, range: { start: e.positionAt(t.token.startOffset), end: e.positionAt(t.token.endOffset ? t.token.endOffset : 0) }, severity: r.DiagnosticSeverity.Error }; }, t.issueToDiagnostic = function (e, t) { return { message: t.msg, range: { start: e.positionAt(t.position.startOffset), end: e.positionAt(t.position.endOffset + 1) }, severity: o(t.severity) }; };
    }, 6508: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.mergeObjects = void 0, t.mergeObjects = function e(t, n) { if (!t)
            return n; if (!n)
            return t; const r = {}; for (const o of [...Object.keys(t), ...Object.keys(n)])
            t[o] && n[o] ? Array.isArray(t[o]) ? r[o] = t[o].concat(n[o]) : r[o] = e(t[o], n[o]) : r[o] = t[o] ?? n[o]; return r; };
    }, 82: e => { e.exports = function (e) { return e && "object" == typeof e && "function" == typeof e.copy && "function" == typeof e.fill && "function" == typeof e.readUInt8; }; }, 4895: (e, t, n) => {
        "use strict";
        var r = n(2635), o = n(3138), i = n(2094), a = n(198);
        function s(e) { return e.call.bind(e); }
        var c = "undefined" != typeof BigInt, u = "undefined" != typeof Symbol, l = s(Object.prototype.toString), f = s(Number.prototype.valueOf), p = s(String.prototype.valueOf), h = s(Boolean.prototype.valueOf);
        if (c)
            var d = s(BigInt.prototype.valueOf);
        if (u)
            var y = s(Symbol.prototype.valueOf);
        function g(e, t) { if ("object" != typeof e)
            return !1; try {
            return t(e), !0;
        }
        catch (e) {
            return !1;
        } }
        function m(e) { return "[object Map]" === l(e); }
        function v(e) { return "[object Set]" === l(e); }
        function b(e) { return "[object WeakMap]" === l(e); }
        function T(e) { return "[object WeakSet]" === l(e); }
        function E(e) { return "[object ArrayBuffer]" === l(e); }
        function _(e) { return "undefined" != typeof ArrayBuffer && (E.working ? E(e) : e instanceof ArrayBuffer); }
        function R(e) { return "[object DataView]" === l(e); }
        function S(e) { return "undefined" != typeof DataView && (R.working ? R(e) : e instanceof DataView); }
        t.isArgumentsObject = r, t.isGeneratorFunction = o, t.isTypedArray = a, t.isPromise = function (e) { return "undefined" != typeof Promise && e instanceof Promise || null !== e && "object" == typeof e && "function" == typeof e.then && "function" == typeof e.catch; }, t.isArrayBufferView = function (e) { return "undefined" != typeof ArrayBuffer && ArrayBuffer.isView ? ArrayBuffer.isView(e) : a(e) || S(e); }, t.isUint8Array = function (e) { return "Uint8Array" === i(e); }, t.isUint8ClampedArray = function (e) { return "Uint8ClampedArray" === i(e); }, t.isUint16Array = function (e) { return "Uint16Array" === i(e); }, t.isUint32Array = function (e) { return "Uint32Array" === i(e); }, t.isInt8Array = function (e) { return "Int8Array" === i(e); }, t.isInt16Array = function (e) { return "Int16Array" === i(e); }, t.isInt32Array = function (e) { return "Int32Array" === i(e); }, t.isFloat32Array = function (e) { return "Float32Array" === i(e); }, t.isFloat64Array = function (e) { return "Float64Array" === i(e); }, t.isBigInt64Array = function (e) { return "BigInt64Array" === i(e); }, t.isBigUint64Array = function (e) { return "BigUint64Array" === i(e); }, m.working = "undefined" != typeof Map && m(new Map), t.isMap = function (e) { return "undefined" != typeof Map && (m.working ? m(e) : e instanceof Map); }, v.working = "undefined" != typeof Set && v(new Set), t.isSet = function (e) { return "undefined" != typeof Set && (v.working ? v(e) : e instanceof Set); }, b.working = "undefined" != typeof WeakMap && b(new WeakMap), t.isWeakMap = function (e) { return "undefined" != typeof WeakMap && (b.working ? b(e) : e instanceof WeakMap); }, T.working = "undefined" != typeof WeakSet && T(new WeakSet), t.isWeakSet = function (e) { return T(e); }, E.working = "undefined" != typeof ArrayBuffer && E(new ArrayBuffer), t.isArrayBuffer = _, R.working = "undefined" != typeof ArrayBuffer && "undefined" != typeof DataView && R(new DataView(new ArrayBuffer(1), 0, 1)), t.isDataView = S;
        var O = "undefined" != typeof SharedArrayBuffer ? SharedArrayBuffer : void 0;
        function A(e) { return "[object SharedArrayBuffer]" === l(e); }
        function N(e) { return void 0 !== O && (void 0 === A.working && (A.working = A(new O)), A.working ? A(e) : e instanceof O); }
        function k(e) { return g(e, f); }
        function w(e) { return g(e, p); }
        function x(e) { return g(e, h); }
        function C(e) { return c && g(e, d); }
        function P(e) { return u && g(e, y); }
        t.isSharedArrayBuffer = N, t.isAsyncFunction = function (e) { return "[object AsyncFunction]" === l(e); }, t.isMapIterator = function (e) { return "[object Map Iterator]" === l(e); }, t.isSetIterator = function (e) { return "[object Set Iterator]" === l(e); }, t.isGeneratorObject = function (e) { return "[object Generator]" === l(e); }, t.isWebAssemblyCompiledModule = function (e) { return "[object WebAssembly.Module]" === l(e); }, t.isNumberObject = k, t.isStringObject = w, t.isBooleanObject = x, t.isBigIntObject = C, t.isSymbolObject = P, t.isBoxedPrimitive = function (e) { return k(e) || w(e) || x(e) || C(e) || P(e); }, t.isAnyArrayBuffer = function (e) { return "undefined" != typeof Uint8Array && (_(e) || N(e)); }, ["isProxy", "isExternal", "isModuleNamespaceObject"].forEach((function (e) { Object.defineProperty(t, e, { enumerable: !1, value: function () { throw new Error(e + " is not supported in userland"); } }); }));
    }, 3335: (e, t, n) => { var r = n(4406), o = n(3716), i = Object.getOwnPropertyDescriptors || function (e) { for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++)
        n[t[r]] = Object.getOwnPropertyDescriptor(e, t[r]); return n; }, a = /%[sdj%]/g; t.format = function (e) { if (!T(e)) {
        for (var t = [], n = 0; n < arguments.length; n++)
            t.push(l(arguments[n]));
        return t.join(" ");
    } n = 1; for (var r = arguments, o = r.length, i = String(e).replace(a, (function (e) { if ("%%" === e)
        return "%"; if (n >= o)
        return e; switch (e) {
        case "%s": return String(r[n++]);
        case "%d": return Number(r[n++]);
        case "%j": try {
            return JSON.stringify(r[n++]);
        }
        catch (e) {
            return "[Circular]";
        }
        default: return e;
    } })), s = r[n]; n < o; s = r[++n])
        v(s) || !R(s) ? i += " " + s : i += " " + l(s); return i; }, t.deprecate = function (e, n) { if (void 0 !== r && !0 === r.noDeprecation)
        return e; if (void 0 === r)
        return function () { return t.deprecate(e, n).apply(this, arguments); }; var i = !1; return function () { if (!i) {
        if (r.throwDeprecation)
            throw new Error(n);
        r.traceDeprecation ? o.trace(n) : o.error(n), i = !0;
    } return e.apply(this, arguments); }; }; var s = {}, c = /^$/; if (r.env.NODE_DEBUG) {
        var u = r.env.NODE_DEBUG;
        u = u.replace(/[|\\{}()[\]^$+?.]/g, "\\$&").replace(/\*/g, ".*").replace(/,/g, "$|^").toUpperCase(), c = new RegExp("^" + u + "$", "i");
    } function l(e, n) { var r = { seen: [], stylize: p }; return arguments.length >= 3 && (r.depth = arguments[2]), arguments.length >= 4 && (r.colors = arguments[3]), m(n) ? r.showHidden = n : n && t._extend(r, n), E(r.showHidden) && (r.showHidden = !1), E(r.depth) && (r.depth = 2), E(r.colors) && (r.colors = !1), E(r.customInspect) && (r.customInspect = !0), r.colors && (r.stylize = f), h(r, e, r.depth); } function f(e, t) { var n = l.styles[t]; return n ? "[" + l.colors[n][0] + "m" + e + "[" + l.colors[n][1] + "m" : e; } function p(e, t) { return e; } function h(e, n, r) { if (e.customInspect && n && A(n.inspect) && n.inspect !== t.inspect && (!n.constructor || n.constructor.prototype !== n)) {
        var o = n.inspect(r, e);
        return T(o) || (o = h(e, o, r)), o;
    } var i = function (e, t) { if (E(t))
        return e.stylize("undefined", "undefined"); if (T(t)) {
        var n = "'" + JSON.stringify(t).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
        return e.stylize(n, "string");
    } return b(t) ? e.stylize("" + t, "number") : m(t) ? e.stylize("" + t, "boolean") : v(t) ? e.stylize("null", "null") : void 0; }(e, n); if (i)
        return i; var a = Object.keys(n), s = function (e) { var t = {}; return e.forEach((function (e, n) { t[e] = !0; })), t; }(a); if (e.showHidden && (a = Object.getOwnPropertyNames(n)), O(n) && (a.indexOf("message") >= 0 || a.indexOf("description") >= 0))
        return d(n); if (0 === a.length) {
        if (A(n)) {
            var c = n.name ? ": " + n.name : "";
            return e.stylize("[Function" + c + "]", "special");
        }
        if (_(n))
            return e.stylize(RegExp.prototype.toString.call(n), "regexp");
        if (S(n))
            return e.stylize(Date.prototype.toString.call(n), "date");
        if (O(n))
            return d(n);
    } var u, l = "", f = !1, p = ["{", "}"]; return g(n) && (f = !0, p = ["[", "]"]), A(n) && (l = " [Function" + (n.name ? ": " + n.name : "") + "]"), _(n) && (l = " " + RegExp.prototype.toString.call(n)), S(n) && (l = " " + Date.prototype.toUTCString.call(n)), O(n) && (l = " " + d(n)), 0 !== a.length || f && 0 != n.length ? r < 0 ? _(n) ? e.stylize(RegExp.prototype.toString.call(n), "regexp") : e.stylize("[Object]", "special") : (e.seen.push(n), u = f ? function (e, t, n, r, o) { for (var i = [], a = 0, s = t.length; a < s; ++a)
        C(t, String(a)) ? i.push(y(e, t, n, r, String(a), !0)) : i.push(""); return o.forEach((function (o) { o.match(/^\d+$/) || i.push(y(e, t, n, r, o, !0)); })), i; }(e, n, r, s, a) : a.map((function (t) { return y(e, n, r, s, t, f); })), e.seen.pop(), function (e, t, n) { return e.reduce((function (e, t) { return t.indexOf("\n"), e + t.replace(/\u001b\[\d\d?m/g, "").length + 1; }), 0) > 60 ? n[0] + ("" === t ? "" : t + "\n ") + " " + e.join(",\n  ") + " " + n[1] : n[0] + t + " " + e.join(", ") + " " + n[1]; }(u, l, p)) : p[0] + l + p[1]; } function d(e) { return "[" + Error.prototype.toString.call(e) + "]"; } function y(e, t, n, r, o, i) { var a, s, c; if ((c = Object.getOwnPropertyDescriptor(t, o) || { value: t[o] }).get ? s = c.set ? e.stylize("[Getter/Setter]", "special") : e.stylize("[Getter]", "special") : c.set && (s = e.stylize("[Setter]", "special")), C(r, o) || (a = "[" + o + "]"), s || (e.seen.indexOf(c.value) < 0 ? (s = v(n) ? h(e, c.value, null) : h(e, c.value, n - 1)).indexOf("\n") > -1 && (s = i ? s.split("\n").map((function (e) { return "  " + e; })).join("\n").slice(2) : "\n" + s.split("\n").map((function (e) { return "   " + e; })).join("\n")) : s = e.stylize("[Circular]", "special")), E(a)) {
        if (i && o.match(/^\d+$/))
            return s;
        (a = JSON.stringify("" + o)).match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/) ? (a = a.slice(1, -1), a = e.stylize(a, "name")) : (a = a.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'"), a = e.stylize(a, "string"));
    } return a + ": " + s; } function g(e) { return Array.isArray(e); } function m(e) { return "boolean" == typeof e; } function v(e) { return null === e; } function b(e) { return "number" == typeof e; } function T(e) { return "string" == typeof e; } function E(e) { return void 0 === e; } function _(e) { return R(e) && "[object RegExp]" === N(e); } function R(e) { return "object" == typeof e && null !== e; } function S(e) { return R(e) && "[object Date]" === N(e); } function O(e) { return R(e) && ("[object Error]" === N(e) || e instanceof Error); } function A(e) { return "function" == typeof e; } function N(e) { return Object.prototype.toString.call(e); } function k(e) { return e < 10 ? "0" + e.toString(10) : e.toString(10); } t.debuglog = function (e) { if (e = e.toUpperCase(), !s[e])
        if (c.test(e)) {
            var n = r.pid;
            s[e] = function () { var r = t.format.apply(t, arguments); o.error("%s %d: %s", e, n, r); };
        }
        else
            s[e] = function () { }; return s[e]; }, t.inspect = l, l.colors = { bold: [1, 22], italic: [3, 23], underline: [4, 24], inverse: [7, 27], white: [37, 39], grey: [90, 39], black: [30, 39], blue: [34, 39], cyan: [36, 39], green: [32, 39], magenta: [35, 39], red: [31, 39], yellow: [33, 39] }, l.styles = { special: "cyan", number: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", date: "magenta", regexp: "red" }, t.types = n(4895), t.isArray = g, t.isBoolean = m, t.isNull = v, t.isNullOrUndefined = function (e) { return null == e; }, t.isNumber = b, t.isString = T, t.isSymbol = function (e) { return "symbol" == typeof e; }, t.isUndefined = E, t.isRegExp = _, t.types.isRegExp = _, t.isObject = R, t.isDate = S, t.types.isDate = S, t.isError = O, t.types.isNativeError = O, t.isFunction = A, t.isPrimitive = function (e) { return null === e || "boolean" == typeof e || "number" == typeof e || "string" == typeof e || "symbol" == typeof e || void 0 === e; }, t.isBuffer = n(82); var w = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]; function x() { var e = new Date, t = [k(e.getHours()), k(e.getMinutes()), k(e.getSeconds())].join(":"); return [e.getDate(), w[e.getMonth()], t].join(" "); } function C(e, t) { return Object.prototype.hasOwnProperty.call(e, t); } t.log = function () { o.log("%s - %s", x(), t.format.apply(t, arguments)); }, t.inherits = n(1285), t._extend = function (e, t) { if (!t || !R(t))
        return e; for (var n = Object.keys(t), r = n.length; r--;)
        e[n[r]] = t[n[r]]; return e; }; var P = "undefined" != typeof Symbol ? Symbol("util.promisify.custom") : void 0; function I(e, t) { if (!e) {
        var n = new Error("Promise was rejected with a falsy value");
        n.reason = e, e = n;
    } return t(e); } t.promisify = function (e) { if ("function" != typeof e)
        throw new TypeError('The "original" argument must be of type Function'); if (P && e[P]) {
        var t;
        if ("function" != typeof (t = e[P]))
            throw new TypeError('The "util.promisify.custom" argument must be of type Function');
        return Object.defineProperty(t, P, { value: t, enumerable: !1, writable: !1, configurable: !0 }), t;
    } function t() { for (var t, n, r = new Promise((function (e, r) { t = e, n = r; })), o = [], i = 0; i < arguments.length; i++)
        o.push(arguments[i]); o.push((function (e, r) { e ? n(e) : t(r); })); try {
        e.apply(this, o);
    }
    catch (e) {
        n(e);
    } return r; } return Object.setPrototypeOf(t, Object.getPrototypeOf(e)), P && Object.defineProperty(t, P, { value: t, enumerable: !1, writable: !1, configurable: !0 }), Object.defineProperties(t, i(e)); }, t.promisify.custom = P, t.callbackify = function (e) { if ("function" != typeof e)
        throw new TypeError('The "original" argument must be of type Function'); function t() { for (var t = [], n = 0; n < arguments.length; n++)
        t.push(arguments[n]); var o = t.pop(); if ("function" != typeof o)
        throw new TypeError("The last argument must be of type Function"); var i = this, a = function () { return o.apply(i, arguments); }; e.apply(this, t).then((function (e) { r.nextTick(a.bind(null, null, e)); }), (function (e) { r.nextTick(I.bind(null, e, a)); })); } return Object.setPrototypeOf(t, Object.getPrototypeOf(e)), Object.defineProperties(t, i(e)), t; }; }, 1200: (e, t, n) => {
        "use strict";
        e.exports = n(5953);
    }, 5953: function (e, t, n) {
        "use strict";
        var r = this && this.__createBinding || (Object.create ? function (e, t, n, r) { void 0 === r && (r = n); var o = Object.getOwnPropertyDescriptor(t, n); o && !("get" in o ? !t.__esModule : o.writable || o.configurable) || (o = { enumerable: !0, get: function () { return t[n]; } }), Object.defineProperty(e, r, o); } : function (e, t, n, r) { void 0 === r && (r = n), e[r] = t[n]; }), o = this && this.__exportStar || function (e, t) { for (var n in e)
            "default" === n || Object.prototype.hasOwnProperty.call(t, n) || r(t, e, n); };
        Object.defineProperty(t, "__esModule", { value: !0 }), t.createMessageConnection = t.BrowserMessageWriter = t.BrowserMessageReader = void 0, n(3632).default.install();
        const i = n(5247);
        o(n(5247), t);
        class a extends i.AbstractMessageReader {
            constructor(e) { super(), this._onData = new i.Emitter, this._messageListener = e => { this._onData.fire(e.data); }, e.addEventListener("error", (e => this.fireError(e))), e.onmessage = this._messageListener; }
            listen(e) { return this._onData.event(e); }
        }
        t.BrowserMessageReader = a;
        class s extends i.AbstractMessageWriter {
            constructor(e) { super(), this.context = e, this.errorCount = 0, e.addEventListener("error", (e => this.fireError(e))); }
            write(e) { try {
                return this.context.postMessage(e), Promise.resolve();
            }
            catch (t) {
                return this.handleError(t, e), Promise.reject(t);
            } }
            handleError(e, t) { this.errorCount++, this.fireError(e, t, this.errorCount); }
            end() { }
        }
        t.BrowserMessageWriter = s, t.createMessageConnection = function (e, t, n, r) { return void 0 === n && (n = i.NullLogger), i.ConnectionStrategy.is(r) && (r = { connectionStrategy: r }), (0, i.createMessageConnection)(e, t, n, r); };
    }, 3632: (e, t, n) => {
        "use strict";
        var r = n(3716);
        Object.defineProperty(t, "__esModule", { value: !0 });
        const o = n(5706), i = n(8437), a = n(5165), s = n(8652);
        class c extends s.AbstractMessageBuffer {
            constructor(e = "utf-8") { super(e), this.asciiDecoder = new TextDecoder("ascii"); }
            emptyBuffer() { return c.emptyBuffer; }
            fromString(e, t) { return (new TextEncoder).encode(e); }
            toString(e, t) { return "ascii" === t ? this.asciiDecoder.decode(e) : new TextDecoder(t).decode(e); }
            asNative(e, t) { return void 0 === t ? e : e.slice(0, t); }
            allocNative(e) { return new Uint8Array(e); }
        }
        c.emptyBuffer = new Uint8Array(0);
        class u {
            constructor(e) { this.socket = e, this._onData = new a.Emitter, this._messageListener = e => { e.data.arrayBuffer().then((e => { this._onData.fire(new Uint8Array(e)); }), (() => { (0, o.default)().console.error("Converting blob to array buffer failed."); })); }, this.socket.addEventListener("message", this._messageListener); }
            onClose(e) { return this.socket.addEventListener("close", e), i.Disposable.create((() => this.socket.removeEventListener("close", e))); }
            onError(e) { return this.socket.addEventListener("error", e), i.Disposable.create((() => this.socket.removeEventListener("error", e))); }
            onEnd(e) { return this.socket.addEventListener("end", e), i.Disposable.create((() => this.socket.removeEventListener("end", e))); }
            onData(e) { return this._onData.event(e); }
        }
        class l {
            constructor(e) { this.socket = e; }
            onClose(e) { return this.socket.addEventListener("close", e), i.Disposable.create((() => this.socket.removeEventListener("close", e))); }
            onError(e) { return this.socket.addEventListener("error", e), i.Disposable.create((() => this.socket.removeEventListener("error", e))); }
            onEnd(e) { return this.socket.addEventListener("end", e), i.Disposable.create((() => this.socket.removeEventListener("end", e))); }
            write(e, t) { if ("string" == typeof e) {
                if (void 0 !== t && "utf-8" !== t)
                    throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${t}`);
                this.socket.send(e);
            }
            else
                this.socket.send(e); return Promise.resolve(); }
            end() { this.socket.close(); }
        }
        const f = new TextEncoder, p = Object.freeze({ messageBuffer: Object.freeze({ create: e => new c(e) }), applicationJson: Object.freeze({ encoder: Object.freeze({ name: "application/json", encode: (e, t) => { if ("utf-8" !== t.charset)
                        throw new Error(`In a Browser environments only utf-8 text encoding is supported. But got encoding: ${t.charset}`); return Promise.resolve(f.encode(JSON.stringify(e, void 0, 0))); } }), decoder: Object.freeze({ name: "application/json", decode: (e, t) => { if (!(e instanceof Uint8Array))
                        throw new Error("In a Browser environments only Uint8Arrays are supported."); return Promise.resolve(JSON.parse(new TextDecoder(t.charset).decode(e))); } }) }), stream: Object.freeze({ asReadableStream: e => new u(e), asWritableStream: e => new l(e) }), console: r, timer: Object.freeze({ setTimeout(e, t, ...n) { const r = setTimeout(e, t, ...n); return { dispose: () => clearTimeout(r) }; }, setImmediate(e, ...t) { const n = setTimeout(e, 0, ...t); return { dispose: () => clearTimeout(n) }; }, setInterval(e, t, ...n) { const r = setInterval(e, t, ...n); return { dispose: () => clearInterval(r) }; } }) });
        function h() { return p; }
        !function (e) { e.install = function () { o.default.install(p); }; }(h || (h = {})), t.default = h;
    }, 5247: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.TraceFormat = t.TraceValues = t.Trace = t.ProgressType = t.ProgressToken = t.createMessageConnection = t.NullLogger = t.ConnectionOptions = t.ConnectionStrategy = t.WriteableStreamMessageWriter = t.AbstractMessageWriter = t.MessageWriter = t.ReadableStreamMessageReader = t.AbstractMessageReader = t.MessageReader = t.CancellationToken = t.CancellationTokenSource = t.Emitter = t.Event = t.Disposable = t.LRUCache = t.Touch = t.LinkedMap = t.ParameterStructures = t.NotificationType9 = t.NotificationType8 = t.NotificationType7 = t.NotificationType6 = t.NotificationType5 = t.NotificationType4 = t.NotificationType3 = t.NotificationType2 = t.NotificationType1 = t.NotificationType0 = t.NotificationType = t.ErrorCodes = t.ResponseError = t.RequestType9 = t.RequestType8 = t.RequestType7 = t.RequestType6 = t.RequestType5 = t.RequestType4 = t.RequestType3 = t.RequestType2 = t.RequestType1 = t.RequestType0 = t.RequestType = t.Message = t.RAL = void 0, t.CancellationStrategy = t.CancellationSenderStrategy = t.CancellationReceiverStrategy = t.ConnectionError = t.ConnectionErrors = t.LogTraceNotification = t.SetTraceNotification = void 0;
        const r = n(9141);
        Object.defineProperty(t, "Message", { enumerable: !0, get: function () { return r.Message; } }), Object.defineProperty(t, "RequestType", { enumerable: !0, get: function () { return r.RequestType; } }), Object.defineProperty(t, "RequestType0", { enumerable: !0, get: function () { return r.RequestType0; } }), Object.defineProperty(t, "RequestType1", { enumerable: !0, get: function () { return r.RequestType1; } }), Object.defineProperty(t, "RequestType2", { enumerable: !0, get: function () { return r.RequestType2; } }), Object.defineProperty(t, "RequestType3", { enumerable: !0, get: function () { return r.RequestType3; } }), Object.defineProperty(t, "RequestType4", { enumerable: !0, get: function () { return r.RequestType4; } }), Object.defineProperty(t, "RequestType5", { enumerable: !0, get: function () { return r.RequestType5; } }), Object.defineProperty(t, "RequestType6", { enumerable: !0, get: function () { return r.RequestType6; } }), Object.defineProperty(t, "RequestType7", { enumerable: !0, get: function () { return r.RequestType7; } }), Object.defineProperty(t, "RequestType8", { enumerable: !0, get: function () { return r.RequestType8; } }), Object.defineProperty(t, "RequestType9", { enumerable: !0, get: function () { return r.RequestType9; } }), Object.defineProperty(t, "ResponseError", { enumerable: !0, get: function () { return r.ResponseError; } }), Object.defineProperty(t, "ErrorCodes", { enumerable: !0, get: function () { return r.ErrorCodes; } }), Object.defineProperty(t, "NotificationType", { enumerable: !0, get: function () { return r.NotificationType; } }), Object.defineProperty(t, "NotificationType0", { enumerable: !0, get: function () { return r.NotificationType0; } }), Object.defineProperty(t, "NotificationType1", { enumerable: !0, get: function () { return r.NotificationType1; } }), Object.defineProperty(t, "NotificationType2", { enumerable: !0, get: function () { return r.NotificationType2; } }), Object.defineProperty(t, "NotificationType3", { enumerable: !0, get: function () { return r.NotificationType3; } }), Object.defineProperty(t, "NotificationType4", { enumerable: !0, get: function () { return r.NotificationType4; } }), Object.defineProperty(t, "NotificationType5", { enumerable: !0, get: function () { return r.NotificationType5; } }), Object.defineProperty(t, "NotificationType6", { enumerable: !0, get: function () { return r.NotificationType6; } }), Object.defineProperty(t, "NotificationType7", { enumerable: !0, get: function () { return r.NotificationType7; } }), Object.defineProperty(t, "NotificationType8", { enumerable: !0, get: function () { return r.NotificationType8; } }), Object.defineProperty(t, "NotificationType9", { enumerable: !0, get: function () { return r.NotificationType9; } }), Object.defineProperty(t, "ParameterStructures", { enumerable: !0, get: function () { return r.ParameterStructures; } });
        const o = n(7040);
        Object.defineProperty(t, "LinkedMap", { enumerable: !0, get: function () { return o.LinkedMap; } }), Object.defineProperty(t, "LRUCache", { enumerable: !0, get: function () { return o.LRUCache; } }), Object.defineProperty(t, "Touch", { enumerable: !0, get: function () { return o.Touch; } });
        const i = n(8437);
        Object.defineProperty(t, "Disposable", { enumerable: !0, get: function () { return i.Disposable; } });
        const a = n(5165);
        Object.defineProperty(t, "Event", { enumerable: !0, get: function () { return a.Event; } }), Object.defineProperty(t, "Emitter", { enumerable: !0, get: function () { return a.Emitter; } });
        const s = n(415);
        Object.defineProperty(t, "CancellationTokenSource", { enumerable: !0, get: function () { return s.CancellationTokenSource; } }), Object.defineProperty(t, "CancellationToken", { enumerable: !0, get: function () { return s.CancellationToken; } });
        const c = n(451);
        Object.defineProperty(t, "MessageReader", { enumerable: !0, get: function () { return c.MessageReader; } }), Object.defineProperty(t, "AbstractMessageReader", { enumerable: !0, get: function () { return c.AbstractMessageReader; } }), Object.defineProperty(t, "ReadableStreamMessageReader", { enumerable: !0, get: function () { return c.ReadableStreamMessageReader; } });
        const u = n(1251);
        Object.defineProperty(t, "MessageWriter", { enumerable: !0, get: function () { return u.MessageWriter; } }), Object.defineProperty(t, "AbstractMessageWriter", { enumerable: !0, get: function () { return u.AbstractMessageWriter; } }), Object.defineProperty(t, "WriteableStreamMessageWriter", { enumerable: !0, get: function () { return u.WriteableStreamMessageWriter; } });
        const l = n(1908);
        Object.defineProperty(t, "ConnectionStrategy", { enumerable: !0, get: function () { return l.ConnectionStrategy; } }), Object.defineProperty(t, "ConnectionOptions", { enumerable: !0, get: function () { return l.ConnectionOptions; } }), Object.defineProperty(t, "NullLogger", { enumerable: !0, get: function () { return l.NullLogger; } }), Object.defineProperty(t, "createMessageConnection", { enumerable: !0, get: function () { return l.createMessageConnection; } }), Object.defineProperty(t, "ProgressToken", { enumerable: !0, get: function () { return l.ProgressToken; } }), Object.defineProperty(t, "ProgressType", { enumerable: !0, get: function () { return l.ProgressType; } }), Object.defineProperty(t, "Trace", { enumerable: !0, get: function () { return l.Trace; } }), Object.defineProperty(t, "TraceValues", { enumerable: !0, get: function () { return l.TraceValues; } }), Object.defineProperty(t, "TraceFormat", { enumerable: !0, get: function () { return l.TraceFormat; } }), Object.defineProperty(t, "SetTraceNotification", { enumerable: !0, get: function () { return l.SetTraceNotification; } }), Object.defineProperty(t, "LogTraceNotification", { enumerable: !0, get: function () { return l.LogTraceNotification; } }), Object.defineProperty(t, "ConnectionErrors", { enumerable: !0, get: function () { return l.ConnectionErrors; } }), Object.defineProperty(t, "ConnectionError", { enumerable: !0, get: function () { return l.ConnectionError; } }), Object.defineProperty(t, "CancellationReceiverStrategy", { enumerable: !0, get: function () { return l.CancellationReceiverStrategy; } }), Object.defineProperty(t, "CancellationSenderStrategy", { enumerable: !0, get: function () { return l.CancellationSenderStrategy; } }), Object.defineProperty(t, "CancellationStrategy", { enumerable: !0, get: function () { return l.CancellationStrategy; } });
        const f = n(5706);
        t.RAL = f.default;
    }, 415: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.CancellationTokenSource = t.CancellationToken = void 0;
        const r = n(5706), o = n(8811), i = n(5165);
        var a;
        !function (e) { e.None = Object.freeze({ isCancellationRequested: !1, onCancellationRequested: i.Event.None }), e.Cancelled = Object.freeze({ isCancellationRequested: !0, onCancellationRequested: i.Event.None }), e.is = function (t) { const n = t; return n && (n === e.None || n === e.Cancelled || o.boolean(n.isCancellationRequested) && !!n.onCancellationRequested); }; }(a = t.CancellationToken || (t.CancellationToken = {}));
        const s = Object.freeze((function (e, t) { const n = (0, r.default)().timer.setTimeout(e.bind(t), 0); return { dispose() { n.dispose(); } }; }));
        class c {
            constructor() { this._isCancelled = !1; }
            cancel() { this._isCancelled || (this._isCancelled = !0, this._emitter && (this._emitter.fire(void 0), this.dispose())); }
            get isCancellationRequested() { return this._isCancelled; }
            get onCancellationRequested() { return this._isCancelled ? s : (this._emitter || (this._emitter = new i.Emitter), this._emitter.event); }
            dispose() { this._emitter && (this._emitter.dispose(), this._emitter = void 0); }
        }
        t.CancellationTokenSource = class {
            get token() { return this._token || (this._token = new c), this._token; }
            cancel() { this._token ? this._token.cancel() : this._token = a.Cancelled; }
            dispose() { this._token ? this._token instanceof c && this._token.dispose() : this._token = a.None; }
        };
    }, 1908: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.createMessageConnection = t.ConnectionOptions = t.CancellationStrategy = t.CancellationSenderStrategy = t.CancellationReceiverStrategy = t.ConnectionStrategy = t.ConnectionError = t.ConnectionErrors = t.LogTraceNotification = t.SetTraceNotification = t.TraceFormat = t.TraceValues = t.Trace = t.NullLogger = t.ProgressType = t.ProgressToken = void 0;
        const r = n(5706), o = n(8811), i = n(9141), a = n(7040), s = n(5165), c = n(415);
        var u, l, f, p, h, d, y, g, m, v, b, T, E, _, R;
        !function (e) { e.type = new i.NotificationType("$/cancelRequest"); }(u || (u = {})), function (e) { e.is = function (e) { return "string" == typeof e || "number" == typeof e; }; }(l = t.ProgressToken || (t.ProgressToken = {})), function (e) { e.type = new i.NotificationType("$/progress"); }(f || (f = {})), t.ProgressType = class {
            constructor() { }
        }, function (e) { e.is = function (e) { return o.func(e); }; }(p || (p = {})), t.NullLogger = Object.freeze({ error: () => { }, warn: () => { }, info: () => { }, log: () => { } }), function (e) { e[e.Off = 0] = "Off", e[e.Messages = 1] = "Messages", e[e.Compact = 2] = "Compact", e[e.Verbose = 3] = "Verbose"; }(h = t.Trace || (t.Trace = {})), (R = t.TraceValues || (t.TraceValues = {})).Off = "off", R.Messages = "messages", R.Compact = "compact", R.Verbose = "verbose", function (e) { e.fromString = function (t) { if (!o.string(t))
            return e.Off; switch (t = t.toLowerCase()) {
            case "off":
            default: return e.Off;
            case "messages": return e.Messages;
            case "compact": return e.Compact;
            case "verbose": return e.Verbose;
        } }, e.toString = function (t) { switch (t) {
            case e.Off: return "off";
            case e.Messages: return "messages";
            case e.Compact: return "compact";
            case e.Verbose: return "verbose";
            default: return "off";
        } }; }(h = t.Trace || (t.Trace = {})), function (e) { e.Text = "text", e.JSON = "json"; }(t.TraceFormat || (t.TraceFormat = {})), function (e) { e.fromString = function (t) { return o.string(t) && "json" === (t = t.toLowerCase()) ? e.JSON : e.Text; }; }(d = t.TraceFormat || (t.TraceFormat = {})), function (e) { e.type = new i.NotificationType("$/setTrace"); }(y = t.SetTraceNotification || (t.SetTraceNotification = {})), function (e) { e.type = new i.NotificationType("$/logTrace"); }(g = t.LogTraceNotification || (t.LogTraceNotification = {})), function (e) { e[e.Closed = 1] = "Closed", e[e.Disposed = 2] = "Disposed", e[e.AlreadyListening = 3] = "AlreadyListening"; }(m = t.ConnectionErrors || (t.ConnectionErrors = {}));
        class S extends Error {
            constructor(e, t) { super(t), this.code = e, Object.setPrototypeOf(this, S.prototype); }
        }
        t.ConnectionError = S, function (e) { e.is = function (e) { const t = e; return t && o.func(t.cancelUndispatched); }; }(v = t.ConnectionStrategy || (t.ConnectionStrategy = {})), function (e) { e.Message = Object.freeze({ createCancellationTokenSource: e => new c.CancellationTokenSource }), e.is = function (e) { const t = e; return t && o.func(t.createCancellationTokenSource); }; }(b = t.CancellationReceiverStrategy || (t.CancellationReceiverStrategy = {})), function (e) { e.Message = Object.freeze({ sendCancellation: (e, t) => e.sendNotification(u.type, { id: t }), cleanup(e) { } }), e.is = function (e) { const t = e; return t && o.func(t.sendCancellation) && o.func(t.cleanup); }; }(T = t.CancellationSenderStrategy || (t.CancellationSenderStrategy = {})), function (e) { e.Message = Object.freeze({ receiver: b.Message, sender: T.Message }), e.is = function (e) { const t = e; return t && b.is(t.receiver) && T.is(t.sender); }; }(E = t.CancellationStrategy || (t.CancellationStrategy = {})), (t.ConnectionOptions || (t.ConnectionOptions = {})).is = function (e) { const t = e; return t && (E.is(t.cancellationStrategy) || v.is(t.connectionStrategy)); }, function (e) { e[e.New = 1] = "New", e[e.Listening = 2] = "Listening", e[e.Closed = 3] = "Closed", e[e.Disposed = 4] = "Disposed"; }(_ || (_ = {})), t.createMessageConnection = function (e, n, v, b) { const T = void 0 !== v ? v : t.NullLogger; let R = 0, O = 0, A = 0; const N = "2.0"; let k; const w = new Map; let x; const C = new Map, P = new Map; let I, D, L = new a.LinkedMap, M = new Map, j = new Set, U = new Map, F = h.Off, q = d.Text, W = _.New; const B = new s.Emitter, $ = new s.Emitter, H = new s.Emitter, V = new s.Emitter, K = new s.Emitter, G = b && b.cancellationStrategy ? b.cancellationStrategy : E.Message; function z(e) { if (null === e)
            throw new Error("Can't send requests with id null since the response can't be correlated."); return "req-" + e.toString(); } function X(e) { } function Y() { return W === _.Listening; } function J() { return W === _.Closed; } function Q() { return W === _.Disposed; } function Z() { W !== _.New && W !== _.Listening || (W = _.Closed, $.fire(void 0)); } function ee() { I || 0 === L.size || (I = (0, r.default)().timer.setImmediate((() => { I = void 0, function () { if (0 === L.size)
            return; const e = L.shift(); try {
            i.Message.isRequest(e) ? function (e) { if (Q())
                return; function t(t, r, o) { const a = { jsonrpc: N, id: e.id }; t instanceof i.ResponseError ? a.error = t.toJson() : a.result = void 0 === t ? null : t, re(a, r, o), n.write(a).catch((() => T.error("Sending response failed."))); } function r(t, r, o) { const i = { jsonrpc: N, id: e.id, error: t.toJson() }; re(i, r, o), n.write(i).catch((() => T.error("Sending response failed."))); } !function (e) { if (F !== h.Off && D)
                if (q === d.Text) {
                    let t;
                    F !== h.Verbose && F !== h.Compact || !e.params || (t = `Params: ${ne(e.params)}\n\n`), D.log(`Received request '${e.method} - (${e.id})'.`, t);
                }
                else
                    ie("receive-request", e); }(e); const a = w.get(e.method); let s, c; a && (s = a.type, c = a.handler); const u = Date.now(); if (c || k) {
                const a = e.id ?? String(Date.now()), l = G.receiver.createCancellationTokenSource(a);
                null !== e.id && j.has(e.id) && l.cancel(), null !== e.id && U.set(a, l);
                try {
                    let f;
                    if (c)
                        if (void 0 === e.params) {
                            if (void 0 !== s && 0 !== s.numberOfParams)
                                return void r(new i.ResponseError(i.ErrorCodes.InvalidParams, `Request ${e.method} defines ${s.numberOfParams} params but received none.`), e.method, u);
                            f = c(l.token);
                        }
                        else if (Array.isArray(e.params)) {
                            if (void 0 !== s && s.parameterStructures === i.ParameterStructures.byName)
                                return void r(new i.ResponseError(i.ErrorCodes.InvalidParams, `Request ${e.method} defines parameters by name but received parameters by position`), e.method, u);
                            f = c(...e.params, l.token);
                        }
                        else {
                            if (void 0 !== s && s.parameterStructures === i.ParameterStructures.byPosition)
                                return void r(new i.ResponseError(i.ErrorCodes.InvalidParams, `Request ${e.method} defines parameters by position but received parameters by name`), e.method, u);
                            f = c(e.params, l.token);
                        }
                    else
                        k && (f = k(e.method, e.params, l.token));
                    const p = f;
                    f ? p.then ? p.then((n => { U.delete(a), t(n, e.method, u); }), (t => { U.delete(a), t instanceof i.ResponseError ? r(t, e.method, u) : t && o.string(t.message) ? r(new i.ResponseError(i.ErrorCodes.InternalError, `Request ${e.method} failed with message: ${t.message}`), e.method, u) : r(new i.ResponseError(i.ErrorCodes.InternalError, `Request ${e.method} failed unexpectedly without providing any details.`), e.method, u); })) : (U.delete(a), t(f, e.method, u)) : (U.delete(a), function (t, r, o) { void 0 === t && (t = null); const i = { jsonrpc: N, id: e.id, result: t }; re(i, r, o), n.write(i).catch((() => T.error("Sending response failed."))); }(f, e.method, u));
                }
                catch (n) {
                    U.delete(a), n instanceof i.ResponseError ? t(n, e.method, u) : n && o.string(n.message) ? r(new i.ResponseError(i.ErrorCodes.InternalError, `Request ${e.method} failed with message: ${n.message}`), e.method, u) : r(new i.ResponseError(i.ErrorCodes.InternalError, `Request ${e.method} failed unexpectedly without providing any details.`), e.method, u);
                }
            }
            else
                r(new i.ResponseError(i.ErrorCodes.MethodNotFound, `Unhandled method ${e.method}`), e.method, u); }(e) : i.Message.isNotification(e) ? function (e) { if (Q())
                return; let t, n; if (e.method === u.type.method) {
                const t = e.params.id;
                return j.delete(t), void oe(e);
            } {
                const r = C.get(e.method);
                r && (n = r.handler, t = r.type);
            } if (n || x)
                try {
                    if (oe(e), n)
                        if (void 0 === e.params)
                            void 0 !== t && 0 !== t.numberOfParams && t.parameterStructures !== i.ParameterStructures.byName && T.error(`Notification ${e.method} defines ${t.numberOfParams} params but received none.`), n();
                        else if (Array.isArray(e.params)) {
                            const r = e.params;
                            e.method === f.type.method && 2 === r.length && l.is(r[0]) ? n({ token: r[0], value: r[1] }) : (void 0 !== t && (t.parameterStructures === i.ParameterStructures.byName && T.error(`Notification ${e.method} defines parameters by name but received parameters by position`), t.numberOfParams !== e.params.length && T.error(`Notification ${e.method} defines ${t.numberOfParams} params but received ${r.length} arguments`)), n(...r));
                        }
                        else
                            void 0 !== t && t.parameterStructures === i.ParameterStructures.byPosition && T.error(`Notification ${e.method} defines parameters by position but received parameters by name`), n(e.params);
                    else
                        x && x(e.method, e.params);
                }
                catch (t) {
                    t.message ? T.error(`Notification handler '${e.method}' failed with message: ${t.message}`) : T.error(`Notification handler '${e.method}' failed unexpectedly.`);
                }
            else
                H.fire(e); }(e) : i.Message.isResponse(e) ? function (e) { if (!Q())
                if (null === e.id)
                    e.error ? T.error(`Received response message without id: Error is: \n${JSON.stringify(e.error, void 0, 4)}`) : T.error("Received response message without id. No further error information provided.");
                else {
                    const t = e.id, n = M.get(t);
                    if (function (e, t) { if (F !== h.Off && D)
                        if (q === d.Text) {
                            let n;
                            if (F !== h.Verbose && F !== h.Compact || (e.error && e.error.data ? n = `Error data: ${ne(e.error.data)}\n\n` : e.result ? n = `Result: ${ne(e.result)}\n\n` : void 0 === e.error && (n = "No result returned.\n\n")), t) {
                                const r = e.error ? ` Request failed: ${e.error.message} (${e.error.code}).` : "";
                                D.log(`Received response '${t.method} - (${e.id})' in ${Date.now() - t.timerStart}ms.${r}`, n);
                            }
                            else
                                D.log(`Received response ${e.id} without active response promise.`, n);
                        }
                        else
                            ie("receive-response", e); }(e, n), void 0 !== n) {
                        M.delete(t);
                        try {
                            if (e.error) {
                                const t = e.error;
                                n.reject(new i.ResponseError(t.code, t.message, t.data));
                            }
                            else {
                                if (void 0 === e.result)
                                    throw new Error("Should never happen.");
                                n.resolve(e.result);
                            }
                        }
                        catch (e) {
                            e.message ? T.error(`Response handler '${n.method}' failed with message: ${e.message}`) : T.error(`Response handler '${n.method}' failed unexpectedly.`);
                        }
                    }
                } }(e) : function (e) { if (!e)
                return void T.error("Received empty message."); T.error(`Received message which is neither a response nor a notification message:\n${JSON.stringify(e, null, 4)}`); const t = e; if (o.string(t.id) || o.number(t.id)) {
                const e = t.id, n = M.get(e);
                n && n.reject(new Error("The received response has neither a result nor an error property."));
            } }(e);
        }
        finally {
            ee();
        } }(); }))); } e.onClose(Z), e.onError((function (e) { B.fire([e, void 0, void 0]); })), n.onClose(Z), n.onError((function (e) { B.fire(e); })); const te = e => { try {
            if (i.Message.isNotification(e) && e.method === u.type.method) {
                const t = e.params.id, r = z(t), o = L.get(r);
                if (i.Message.isRequest(o)) {
                    const i = b?.connectionStrategy, a = i && i.cancelUndispatched ? i.cancelUndispatched(o, X) : void 0;
                    if (a && (void 0 !== a.error || void 0 !== a.result))
                        return L.delete(r), U.delete(t), a.id = o.id, re(a, e.method, Date.now()), void n.write(a).catch((() => T.error("Sending response for canceled message failed.")));
                }
                const a = U.get(t);
                if (void 0 !== a)
                    return a.cancel(), void oe(e);
                j.add(t);
            }
            !function (e, t) { var n; i.Message.isRequest(t) ? e.set(z(t.id), t) : i.Message.isResponse(t) ? e.set(null === (n = t.id) ? "res-unknown-" + (++A).toString() : "res-" + n.toString(), t) : e.set("not-" + (++O).toString(), t); }(L, e);
        }
        finally {
            ee();
        } }; function ne(e) { if (null != e)
            switch (F) {
                case h.Verbose: return JSON.stringify(e, null, 4);
                case h.Compact: return JSON.stringify(e);
                default: return;
            } } function re(e, t, n) { if (F !== h.Off && D)
            if (q === d.Text) {
                let r;
                F !== h.Verbose && F !== h.Compact || (e.error && e.error.data ? r = `Error data: ${ne(e.error.data)}\n\n` : e.result ? r = `Result: ${ne(e.result)}\n\n` : void 0 === e.error && (r = "No result returned.\n\n")), D.log(`Sending response '${t} - (${e.id})'. Processing request took ${Date.now() - n}ms`, r);
            }
            else
                ie("send-response", e); } function oe(e) { if (F !== h.Off && D && e.method !== g.type.method)
            if (q === d.Text) {
                let t;
                F !== h.Verbose && F !== h.Compact || (t = e.params ? `Params: ${ne(e.params)}\n\n` : "No parameters provided.\n\n"), D.log(`Received notification '${e.method}'.`, t);
            }
            else
                ie("receive-notification", e); } function ie(e, t) { if (!D || F === h.Off)
            return; const n = { isLSPMessage: !0, type: e, message: t, timestamp: Date.now() }; D.log(n); } function ae() { if (J())
            throw new S(m.Closed, "Connection is closed."); if (Q())
            throw new S(m.Disposed, "Connection is disposed."); } function se(e) { return void 0 === e ? null : e; } function ce(e) { return null === e ? void 0 : e; } function ue(e) { return null != e && !Array.isArray(e) && "object" == typeof e; } function le(e, t) { switch (e) {
            case i.ParameterStructures.auto: return ue(t) ? ce(t) : [se(t)];
            case i.ParameterStructures.byName:
                if (!ue(t))
                    throw new Error("Received parameters by name but param is not an object literal.");
                return ce(t);
            case i.ParameterStructures.byPosition: return [se(t)];
            default: throw new Error(`Unknown parameter structure ${e.toString()}`);
        } } function fe(e, t) { let n; const r = e.numberOfParams; switch (r) {
            case 0:
                n = void 0;
                break;
            case 1:
                n = le(e.parameterStructures, t[0]);
                break;
            default:
                n = [];
                for (let e = 0; e < t.length && e < r; e++)
                    n.push(se(t[e]));
                if (t.length < r)
                    for (let e = t.length; e < r; e++)
                        n.push(null);
        } return n; } const pe = { sendNotification: (e, ...t) => { let r, a; if (ae(), o.string(e)) {
                r = e;
                const n = t[0];
                let o = 0, s = i.ParameterStructures.auto;
                i.ParameterStructures.is(n) && (o = 1, s = n);
                let c = t.length;
                const u = c - o;
                switch (u) {
                    case 0:
                        a = void 0;
                        break;
                    case 1:
                        a = le(s, t[o]);
                        break;
                    default:
                        if (s === i.ParameterStructures.byName)
                            throw new Error(`Received ${u} parameters for 'by Name' notification parameter structure.`);
                        a = t.slice(o, c).map((e => se(e)));
                }
            }
            else {
                const n = t;
                r = e.method, a = fe(e, n);
            } const s = { jsonrpc: N, method: r, params: a }; return function (e) { if (F !== h.Off && D)
                if (q === d.Text) {
                    let t;
                    F !== h.Verbose && F !== h.Compact || (t = e.params ? `Params: ${ne(e.params)}\n\n` : "No parameters provided.\n\n"), D.log(`Sending notification '${e.method}'.`, t);
                }
                else
                    ie("send-notification", e); }(s), n.write(s).catch((() => T.error("Sending notification failed."))); }, onNotification: (e, t) => { let n; return ae(), o.func(e) ? x = e : t && (o.string(e) ? (n = e, C.set(e, { type: void 0, handler: t })) : (n = e.method, C.set(e.method, { type: e, handler: t }))), { dispose: () => { void 0 !== n ? C.delete(n) : x = void 0; } }; }, onProgress: (e, t, n) => { if (P.has(t))
                throw new Error(`Progress handler for token ${t} already registered`); return P.set(t, n), { dispose: () => { P.delete(t); } }; }, sendProgress: (e, t, n) => pe.sendNotification(f.type, { token: t, value: n }), onUnhandledProgress: V.event, sendRequest: (e, ...t) => { let r, a, s; if (ae(), function () { if (!Y())
                throw new Error("Call listen() first."); }(), o.string(e)) {
                r = e;
                const n = t[0], o = t[t.length - 1];
                let u = 0, l = i.ParameterStructures.auto;
                i.ParameterStructures.is(n) && (u = 1, l = n);
                let f = t.length;
                c.CancellationToken.is(o) && (f -= 1, s = o);
                const p = f - u;
                switch (p) {
                    case 0:
                        a = void 0;
                        break;
                    case 1:
                        a = le(l, t[u]);
                        break;
                    default:
                        if (l === i.ParameterStructures.byName)
                            throw new Error(`Received ${p} parameters for 'by Name' request parameter structure.`);
                        a = t.slice(u, f).map((e => se(e)));
                }
            }
            else {
                const n = t;
                r = e.method, a = fe(e, n);
                const o = e.numberOfParams;
                s = c.CancellationToken.is(n[o]) ? n[o] : void 0;
            } const u = R++; let l; return s && (l = s.onCancellationRequested((() => { const e = G.sender.sendCancellation(pe, u); return void 0 === e ? (T.log(`Received no promise from cancellation strategy when cancelling id ${u}`), Promise.resolve()) : e.catch((() => { T.log(`Sending cancellation messages for id ${u} failed`); })); }))), new Promise(((e, t) => { const o = { jsonrpc: N, id: u, method: r, params: a }; let s = { method: r, timerStart: Date.now(), resolve: t => { e(t), G.sender.cleanup(u), l?.dispose(); }, reject: e => { t(e), G.sender.cleanup(u), l?.dispose(); } }; !function (e) { if (F !== h.Off && D)
                if (q === d.Text) {
                    let t;
                    F !== h.Verbose && F !== h.Compact || !e.params || (t = `Params: ${ne(e.params)}\n\n`), D.log(`Sending request '${e.method} - (${e.id})'.`, t);
                }
                else
                    ie("send-request", e); }(o); try {
                n.write(o).catch((() => T.error("Sending request failed.")));
            }
            catch (e) {
                s.reject(new i.ResponseError(i.ErrorCodes.MessageWriteError, e.message ? e.message : "Unknown reason")), s = null;
            } s && M.set(u, s); })); }, onRequest: (e, t) => { ae(); let n = null; return p.is(e) ? (n = void 0, k = e) : o.string(e) ? (n = null, void 0 !== t && (n = e, w.set(e, { handler: t, type: void 0 }))) : void 0 !== t && (n = e.method, w.set(e.method, { type: e, handler: t })), { dispose: () => { null !== n && (void 0 !== n ? w.delete(n) : k = void 0); } }; }, hasPendingResponse: () => M.size > 0, trace: async (e, t, n) => { let r = !1, i = d.Text; void 0 !== n && (o.boolean(n) ? r = n : (r = n.sendNotification || !1, i = n.traceFormat || d.Text)), F = e, q = i, D = F === h.Off ? void 0 : t, !r || J() || Q() || await pe.sendNotification(y.type, { value: h.toString(e) }); }, onError: B.event, onClose: $.event, onUnhandledNotification: H.event, onDispose: K.event, end: () => { n.end(); }, dispose: () => { if (Q())
                return; W = _.Disposed, K.fire(void 0); const t = new i.ResponseError(i.ErrorCodes.PendingResponseRejected, "Pending response rejected since connection got disposed"); for (const e of M.values())
                e.reject(t); M = new Map, U = new Map, j = new Set, L = new a.LinkedMap, o.func(n.dispose) && n.dispose(), o.func(e.dispose) && e.dispose(); }, listen: () => { ae(), function () { if (Y())
                throw new S(m.AlreadyListening, "Connection is already listening"); }(), W = _.Listening, e.listen(te); }, inspect: () => { (0, r.default)().console.log("inspect"); } }; return pe.onNotification(g.type, (e => { if (F === h.Off || !D)
            return; const t = F === h.Verbose || F === h.Compact; D.log(e.message, t ? e.verbose : void 0); })), pe.onNotification(f.type, (e => { const t = P.get(e.token); t ? t(e.value) : V.fire(e); })), pe; };
    }, 8437: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.Disposable = void 0, (t.Disposable || (t.Disposable = {})).create = function (e) { return { dispose: e }; };
    }, 5165: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.Emitter = t.Event = void 0;
        const r = n(5706);
        !function (e) { const t = { dispose() { } }; e.None = function () { return t; }; }(t.Event || (t.Event = {}));
        class o {
            add(e, t = null, n) { this._callbacks || (this._callbacks = [], this._contexts = []), this._callbacks.push(e), this._contexts.push(t), Array.isArray(n) && n.push({ dispose: () => this.remove(e, t) }); }
            remove(e, t = null) { if (!this._callbacks)
                return; let n = !1; for (let r = 0, o = this._callbacks.length; r < o; r++)
                if (this._callbacks[r] === e) {
                    if (this._contexts[r] === t)
                        return this._callbacks.splice(r, 1), void this._contexts.splice(r, 1);
                    n = !0;
                } if (n)
                throw new Error("When adding a listener with a context, you should remove it with the same context"); }
            invoke(...e) { if (!this._callbacks)
                return []; const t = [], n = this._callbacks.slice(0), o = this._contexts.slice(0); for (let i = 0, a = n.length; i < a; i++)
                try {
                    t.push(n[i].apply(o[i], e));
                }
                catch (e) {
                    (0, r.default)().console.error(e);
                } return t; }
            isEmpty() { return !this._callbacks || 0 === this._callbacks.length; }
            dispose() { this._callbacks = void 0, this._contexts = void 0; }
        }
        class i {
            constructor(e) { this._options = e; }
            get event() { return this._event || (this._event = (e, t, n) => { this._callbacks || (this._callbacks = new o), this._options && this._options.onFirstListenerAdd && this._callbacks.isEmpty() && this._options.onFirstListenerAdd(this), this._callbacks.add(e, t); const r = { dispose: () => { this._callbacks && (this._callbacks.remove(e, t), r.dispose = i._noop, this._options && this._options.onLastListenerRemove && this._callbacks.isEmpty() && this._options.onLastListenerRemove(this)); } }; return Array.isArray(n) && n.push(r), r; }), this._event; }
            fire(e) { this._callbacks && this._callbacks.invoke.call(this._callbacks, e); }
            dispose() { this._callbacks && (this._callbacks.dispose(), this._callbacks = void 0); }
        }
        t.Emitter = i, i._noop = function () { };
    }, 8811: (e, t) => {
        "use strict";
        function n(e) { return "string" == typeof e || e instanceof String; }
        function r(e) { return Array.isArray(e); }
        Object.defineProperty(t, "__esModule", { value: !0 }), t.stringArray = t.array = t.func = t.error = t.number = t.string = t.boolean = void 0, t.boolean = function (e) { return !0 === e || !1 === e; }, t.string = n, t.number = function (e) { return "number" == typeof e || e instanceof Number; }, t.error = function (e) { return e instanceof Error; }, t.func = function (e) { return "function" == typeof e; }, t.array = r, t.stringArray = function (e) { return r(e) && e.every((e => n(e))); };
    }, 7040: (e, t) => {
        "use strict";
        var n, r;
        Object.defineProperty(t, "__esModule", { value: !0 }), t.LRUCache = t.LinkedMap = t.Touch = void 0, function (e) { e.None = 0, e.First = 1, e.AsOld = e.First, e.Last = 2, e.AsNew = e.Last; }(r = t.Touch || (t.Touch = {}));
        class o {
            constructor() { this[n] = "LinkedMap", this._map = new Map, this._head = void 0, this._tail = void 0, this._size = 0, this._state = 0; }
            clear() { this._map.clear(), this._head = void 0, this._tail = void 0, this._size = 0, this._state++; }
            isEmpty() { return !this._head && !this._tail; }
            get size() { return this._size; }
            get first() { return this._head?.value; }
            get last() { return this._tail?.value; }
            has(e) { return this._map.has(e); }
            get(e, t = r.None) { const n = this._map.get(e); if (n)
                return t !== r.None && this.touch(n, t), n.value; }
            set(e, t, n = r.None) { let o = this._map.get(e); if (o)
                o.value = t, n !== r.None && this.touch(o, n);
            else {
                switch (o = { key: e, value: t, next: void 0, previous: void 0 }, n) {
                    case r.None:
                        this.addItemLast(o);
                        break;
                    case r.First:
                        this.addItemFirst(o);
                        break;
                    case r.Last:
                    default: this.addItemLast(o);
                }
                this._map.set(e, o), this._size++;
            } return this; }
            delete(e) { return !!this.remove(e); }
            remove(e) { const t = this._map.get(e); if (t)
                return this._map.delete(e), this.removeItem(t), this._size--, t.value; }
            shift() { if (!this._head && !this._tail)
                return; if (!this._head || !this._tail)
                throw new Error("Invalid list"); const e = this._head; return this._map.delete(e.key), this.removeItem(e), this._size--, e.value; }
            forEach(e, t) { const n = this._state; let r = this._head; for (; r;) {
                if (t ? e.bind(t)(r.value, r.key, this) : e(r.value, r.key, this), this._state !== n)
                    throw new Error("LinkedMap got modified during iteration.");
                r = r.next;
            } }
            keys() { const e = this._state; let t = this._head; const n = { [Symbol.iterator]: () => n, next: () => { if (this._state !== e)
                    throw new Error("LinkedMap got modified during iteration."); if (t) {
                    const e = { value: t.key, done: !1 };
                    return t = t.next, e;
                } return { value: void 0, done: !0 }; } }; return n; }
            values() { const e = this._state; let t = this._head; const n = { [Symbol.iterator]: () => n, next: () => { if (this._state !== e)
                    throw new Error("LinkedMap got modified during iteration."); if (t) {
                    const e = { value: t.value, done: !1 };
                    return t = t.next, e;
                } return { value: void 0, done: !0 }; } }; return n; }
            entries() { const e = this._state; let t = this._head; const n = { [Symbol.iterator]: () => n, next: () => { if (this._state !== e)
                    throw new Error("LinkedMap got modified during iteration."); if (t) {
                    const e = { value: [t.key, t.value], done: !1 };
                    return t = t.next, e;
                } return { value: void 0, done: !0 }; } }; return n; }
            [(n = Symbol.toStringTag, Symbol.iterator)]() { return this.entries(); }
            trimOld(e) { if (e >= this.size)
                return; if (0 === e)
                return void this.clear(); let t = this._head, n = this.size; for (; t && n > e;)
                this._map.delete(t.key), t = t.next, n--; this._head = t, this._size = n, t && (t.previous = void 0), this._state++; }
            addItemFirst(e) { if (this._head || this._tail) {
                if (!this._head)
                    throw new Error("Invalid list");
                e.next = this._head, this._head.previous = e;
            }
            else
                this._tail = e; this._head = e, this._state++; }
            addItemLast(e) { if (this._head || this._tail) {
                if (!this._tail)
                    throw new Error("Invalid list");
                e.previous = this._tail, this._tail.next = e;
            }
            else
                this._head = e; this._tail = e, this._state++; }
            removeItem(e) { if (e === this._head && e === this._tail)
                this._head = void 0, this._tail = void 0;
            else if (e === this._head) {
                if (!e.next)
                    throw new Error("Invalid list");
                e.next.previous = void 0, this._head = e.next;
            }
            else if (e === this._tail) {
                if (!e.previous)
                    throw new Error("Invalid list");
                e.previous.next = void 0, this._tail = e.previous;
            }
            else {
                const t = e.next, n = e.previous;
                if (!t || !n)
                    throw new Error("Invalid list");
                t.previous = n, n.next = t;
            } e.next = void 0, e.previous = void 0, this._state++; }
            touch(e, t) { if (!this._head || !this._tail)
                throw new Error("Invalid list"); if (t === r.First || t === r.Last)
                if (t === r.First) {
                    if (e === this._head)
                        return;
                    const t = e.next, n = e.previous;
                    e === this._tail ? (n.next = void 0, this._tail = n) : (t.previous = n, n.next = t), e.previous = void 0, e.next = this._head, this._head.previous = e, this._head = e, this._state++;
                }
                else if (t === r.Last) {
                    if (e === this._tail)
                        return;
                    const t = e.next, n = e.previous;
                    e === this._head ? (t.previous = void 0, this._head = t) : (t.previous = n, n.next = t), e.next = void 0, e.previous = this._tail, this._tail.next = e, this._tail = e, this._state++;
                } }
            toJSON() { const e = []; return this.forEach(((t, n) => { e.push([n, t]); })), e; }
            fromJSON(e) { this.clear(); for (const [t, n] of e)
                this.set(t, n); }
        }
        t.LinkedMap = o, t.LRUCache = class extends o {
            constructor(e, t = 1) { super(), this._limit = e, this._ratio = Math.min(Math.max(0, t), 1); }
            get limit() { return this._limit; }
            set limit(e) { this._limit = e, this.checkTrim(); }
            get ratio() { return this._ratio; }
            set ratio(e) { this._ratio = Math.min(Math.max(0, e), 1), this.checkTrim(); }
            get(e, t = r.AsNew) { return super.get(e, t); }
            peek(e) { return super.get(e, r.None); }
            set(e, t) { return super.set(e, t, r.Last), this.checkTrim(), this; }
            checkTrim() { this.size > this._limit && this.trimOld(Math.round(this._limit * this._ratio)); }
        };
    }, 8652: (e, t) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.AbstractMessageBuffer = void 0, t.AbstractMessageBuffer = class {
            constructor(e = "utf-8") { this._encoding = e, this._chunks = [], this._totalLength = 0; }
            get encoding() { return this._encoding; }
            append(e) { const t = "string" == typeof e ? this.fromString(e, this._encoding) : e; this._chunks.push(t), this._totalLength += t.byteLength; }
            tryReadHeaders() { if (0 === this._chunks.length)
                return; let e = 0, t = 0, n = 0, r = 0; e: for (; t < this._chunks.length;) {
                const o = this._chunks[t];
                for (n = 0; n < o.length;) {
                    switch (o[n]) {
                        case 13:
                            switch (e) {
                                case 0:
                                    e = 1;
                                    break;
                                case 2:
                                    e = 3;
                                    break;
                                default: e = 0;
                            }
                            break;
                        case 10:
                            switch (e) {
                                case 1:
                                    e = 2;
                                    break;
                                case 3:
                                    e = 4, n++;
                                    break e;
                                default: e = 0;
                            }
                            break;
                        default: e = 0;
                    }
                    n++;
                }
                r += o.byteLength, t++;
            } if (4 !== e)
                return; const o = this._read(r + n), i = new Map, a = this.toString(o, "ascii").split("\r\n"); if (a.length < 2)
                return i; for (let e = 0; e < a.length - 2; e++) {
                const t = a[e], n = t.indexOf(":");
                if (-1 === n)
                    throw new Error("Message header must separate key and value using :");
                const r = t.substr(0, n), o = t.substr(n + 1).trim();
                i.set(r, o);
            } return i; }
            tryReadBody(e) { if (!(this._totalLength < e))
                return this._read(e); }
            get numberOfBytes() { return this._totalLength; }
            _read(e) { if (0 === e)
                return this.emptyBuffer(); if (e > this._totalLength)
                throw new Error("Cannot read so many bytes!"); if (this._chunks[0].byteLength === e) {
                const t = this._chunks[0];
                return this._chunks.shift(), this._totalLength -= e, this.asNative(t);
            } if (this._chunks[0].byteLength > e) {
                const t = this._chunks[0], n = this.asNative(t, e);
                return this._chunks[0] = t.slice(e), this._totalLength -= e, n;
            } const t = this.allocNative(e); let n = 0; for (; e > 0;) {
                const r = this._chunks[0];
                if (r.byteLength > e) {
                    const o = r.slice(0, e);
                    t.set(o, n), n += e, this._chunks[0] = r.slice(e), this._totalLength -= e, e -= e;
                }
                else
                    t.set(r, n), n += r.byteLength, this._chunks.shift(), this._totalLength -= r.byteLength, e -= r.byteLength;
            } return t; }
        };
    }, 451: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.ReadableStreamMessageReader = t.AbstractMessageReader = t.MessageReader = void 0;
        const r = n(5706), o = n(8811), i = n(5165);
        var a;
        (t.MessageReader || (t.MessageReader = {})).is = function (e) { let t = e; return t && o.func(t.listen) && o.func(t.dispose) && o.func(t.onError) && o.func(t.onClose) && o.func(t.onPartialMessage); };
        class s {
            constructor() { this.errorEmitter = new i.Emitter, this.closeEmitter = new i.Emitter, this.partialMessageEmitter = new i.Emitter; }
            dispose() { this.errorEmitter.dispose(), this.closeEmitter.dispose(); }
            get onError() { return this.errorEmitter.event; }
            fireError(e) { this.errorEmitter.fire(this.asError(e)); }
            get onClose() { return this.closeEmitter.event; }
            fireClose() { this.closeEmitter.fire(void 0); }
            get onPartialMessage() { return this.partialMessageEmitter.event; }
            firePartialMessage(e) { this.partialMessageEmitter.fire(e); }
            asError(e) { return e instanceof Error ? e : new Error(`Reader received error. Reason: ${o.string(e.message) ? e.message : "unknown"}`); }
        }
        t.AbstractMessageReader = s, function (e) { e.fromOptions = function (e) { let t, n; const o = new Map; let i; const a = new Map; if (void 0 === e || "string" == typeof e)
            t = e ?? "utf-8";
        else {
            if (t = e.charset ?? "utf-8", void 0 !== e.contentDecoder && (n = e.contentDecoder, o.set(n.name, n)), void 0 !== e.contentDecoders)
                for (const t of e.contentDecoders)
                    o.set(t.name, t);
            if (void 0 !== e.contentTypeDecoder && (i = e.contentTypeDecoder, a.set(i.name, i)), void 0 !== e.contentTypeDecoders)
                for (const t of e.contentTypeDecoders)
                    a.set(t.name, t);
        } return void 0 === i && (i = (0, r.default)().applicationJson.decoder, a.set(i.name, i)), { charset: t, contentDecoder: n, contentDecoders: o, contentTypeDecoder: i, contentTypeDecoders: a }; }; }(a || (a = {})), t.ReadableStreamMessageReader = class extends s {
            constructor(e, t) { super(), this.readable = e, this.options = a.fromOptions(t), this.buffer = (0, r.default)().messageBuffer.create(this.options.charset), this._partialMessageTimeout = 1e4, this.nextMessageLength = -1, this.messageToken = 0; }
            set partialMessageTimeout(e) { this._partialMessageTimeout = e; }
            get partialMessageTimeout() { return this._partialMessageTimeout; }
            listen(e) { this.nextMessageLength = -1, this.messageToken = 0, this.partialMessageTimer = void 0, this.callback = e; const t = this.readable.onData((e => { this.onData(e); })); return this.readable.onError((e => this.fireError(e))), this.readable.onClose((() => this.fireClose())), t; }
            onData(e) { for (this.buffer.append(e);;) {
                if (-1 === this.nextMessageLength) {
                    const e = this.buffer.tryReadHeaders();
                    if (!e)
                        return;
                    const t = e.get("Content-Length");
                    if (!t)
                        throw new Error("Header must provide a Content-Length property.");
                    const n = parseInt(t);
                    if (isNaN(n))
                        throw new Error("Content-Length value must be a number.");
                    this.nextMessageLength = n;
                }
                const e = this.buffer.tryReadBody(this.nextMessageLength);
                if (void 0 === e)
                    return void this.setPartialMessageTimer();
                let t;
                this.clearPartialMessageTimer(), this.nextMessageLength = -1, t = void 0 !== this.options.contentDecoder ? this.options.contentDecoder.decode(e) : Promise.resolve(e), t.then((e => { this.options.contentTypeDecoder.decode(e, this.options).then((e => { this.callback(e); }), (e => { this.fireError(e); })); }), (e => { this.fireError(e); }));
            } }
            clearPartialMessageTimer() { this.partialMessageTimer && (this.partialMessageTimer.dispose(), this.partialMessageTimer = void 0); }
            setPartialMessageTimer() { this.clearPartialMessageTimer(), this._partialMessageTimeout <= 0 || (this.partialMessageTimer = (0, r.default)().timer.setTimeout(((e, t) => { this.partialMessageTimer = void 0, e === this.messageToken && (this.firePartialMessage({ messageToken: e, waitingTime: t }), this.setPartialMessageTimer()); }), this._partialMessageTimeout, this.messageToken, this._partialMessageTimeout)); }
        };
    }, 1251: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.WriteableStreamMessageWriter = t.AbstractMessageWriter = t.MessageWriter = void 0;
        const r = n(5706), o = n(8811), i = n(2339), a = n(5165);
        var s;
        (t.MessageWriter || (t.MessageWriter = {})).is = function (e) { let t = e; return t && o.func(t.dispose) && o.func(t.onClose) && o.func(t.onError) && o.func(t.write); };
        class c {
            constructor() { this.errorEmitter = new a.Emitter, this.closeEmitter = new a.Emitter; }
            dispose() { this.errorEmitter.dispose(), this.closeEmitter.dispose(); }
            get onError() { return this.errorEmitter.event; }
            fireError(e, t, n) { this.errorEmitter.fire([this.asError(e), t, n]); }
            get onClose() { return this.closeEmitter.event; }
            fireClose() { this.closeEmitter.fire(void 0); }
            asError(e) { return e instanceof Error ? e : new Error(`Writer received error. Reason: ${o.string(e.message) ? e.message : "unknown"}`); }
        }
        t.AbstractMessageWriter = c, function (e) { e.fromOptions = function (e) { return void 0 === e || "string" == typeof e ? { charset: e ?? "utf-8", contentTypeEncoder: (0, r.default)().applicationJson.encoder } : { charset: e.charset ?? "utf-8", contentEncoder: e.contentEncoder, contentTypeEncoder: e.contentTypeEncoder ?? (0, r.default)().applicationJson.encoder }; }; }(s || (s = {})), t.WriteableStreamMessageWriter = class extends c {
            constructor(e, t) { super(), this.writable = e, this.options = s.fromOptions(t), this.errorCount = 0, this.writeSemaphore = new i.Semaphore(1), this.writable.onError((e => this.fireError(e))), this.writable.onClose((() => this.fireClose())); }
            async write(e) { return this.writeSemaphore.lock((async () => this.options.contentTypeEncoder.encode(e, this.options).then((e => void 0 !== this.options.contentEncoder ? this.options.contentEncoder.encode(e) : e)).then((t => { const n = []; return n.push("Content-Length: ", t.byteLength.toString(), "\r\n"), n.push("\r\n"), this.doWrite(e, n, t); }), (e => { throw this.fireError(e), e; })))); }
            async doWrite(e, t, n) { try {
                return await this.writable.write(t.join(""), "ascii"), this.writable.write(n);
            }
            catch (t) {
                return this.handleError(t, e), Promise.reject(t);
            } }
            handleError(e, t) { this.errorCount++, this.fireError(e, t, this.errorCount); }
            end() { this.writable.end(); }
        };
    }, 9141: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.Message = t.NotificationType9 = t.NotificationType8 = t.NotificationType7 = t.NotificationType6 = t.NotificationType5 = t.NotificationType4 = t.NotificationType3 = t.NotificationType2 = t.NotificationType1 = t.NotificationType0 = t.NotificationType = t.RequestType9 = t.RequestType8 = t.RequestType7 = t.RequestType6 = t.RequestType5 = t.RequestType4 = t.RequestType3 = t.RequestType2 = t.RequestType1 = t.RequestType = t.RequestType0 = t.AbstractMessageSignature = t.ParameterStructures = t.ResponseError = t.ErrorCodes = void 0;
        const r = n(8811);
        var o, i;
        !function (e) { e.ParseError = -32700, e.InvalidRequest = -32600, e.MethodNotFound = -32601, e.InvalidParams = -32602, e.InternalError = -32603, e.jsonrpcReservedErrorRangeStart = -32099, e.serverErrorStart = -32099, e.MessageWriteError = -32099, e.MessageReadError = -32098, e.PendingResponseRejected = -32097, e.ConnectionInactive = -32096, e.ServerNotInitialized = -32002, e.UnknownErrorCode = -32001, e.jsonrpcReservedErrorRangeEnd = -32e3, e.serverErrorEnd = -32e3; }(o = t.ErrorCodes || (t.ErrorCodes = {}));
        class a extends Error {
            constructor(e, t, n) { super(t), this.code = r.number(e) ? e : o.UnknownErrorCode, this.data = n, Object.setPrototypeOf(this, a.prototype); }
            toJson() { const e = { code: this.code, message: this.message }; return void 0 !== this.data && (e.data = this.data), e; }
        }
        t.ResponseError = a;
        class s {
            constructor(e) { this.kind = e; }
            static is(e) { return e === s.auto || e === s.byName || e === s.byPosition; }
            toString() { return this.kind; }
        }
        t.ParameterStructures = s, s.auto = new s("auto"), s.byPosition = new s("byPosition"), s.byName = new s("byName");
        class c {
            constructor(e, t) { this.method = e, this.numberOfParams = t; }
            get parameterStructures() { return s.auto; }
        }
        t.AbstractMessageSignature = c, t.RequestType0 = class extends c {
            constructor(e) { super(e, 0); }
        }, t.RequestType = class extends c {
            constructor(e, t = s.auto) { super(e, 1), this._parameterStructures = t; }
            get parameterStructures() { return this._parameterStructures; }
        }, t.RequestType1 = class extends c {
            constructor(e, t = s.auto) { super(e, 1), this._parameterStructures = t; }
            get parameterStructures() { return this._parameterStructures; }
        }, t.RequestType2 = class extends c {
            constructor(e) { super(e, 2); }
        }, t.RequestType3 = class extends c {
            constructor(e) { super(e, 3); }
        }, t.RequestType4 = class extends c {
            constructor(e) { super(e, 4); }
        }, t.RequestType5 = class extends c {
            constructor(e) { super(e, 5); }
        }, t.RequestType6 = class extends c {
            constructor(e) { super(e, 6); }
        }, t.RequestType7 = class extends c {
            constructor(e) { super(e, 7); }
        }, t.RequestType8 = class extends c {
            constructor(e) { super(e, 8); }
        }, t.RequestType9 = class extends c {
            constructor(e) { super(e, 9); }
        }, t.NotificationType = class extends c {
            constructor(e, t = s.auto) { super(e, 1), this._parameterStructures = t; }
            get parameterStructures() { return this._parameterStructures; }
        }, t.NotificationType0 = class extends c {
            constructor(e) { super(e, 0); }
        }, t.NotificationType1 = class extends c {
            constructor(e, t = s.auto) { super(e, 1), this._parameterStructures = t; }
            get parameterStructures() { return this._parameterStructures; }
        }, t.NotificationType2 = class extends c {
            constructor(e) { super(e, 2); }
        }, t.NotificationType3 = class extends c {
            constructor(e) { super(e, 3); }
        }, t.NotificationType4 = class extends c {
            constructor(e) { super(e, 4); }
        }, t.NotificationType5 = class extends c {
            constructor(e) { super(e, 5); }
        }, t.NotificationType6 = class extends c {
            constructor(e) { super(e, 6); }
        }, t.NotificationType7 = class extends c {
            constructor(e) { super(e, 7); }
        }, t.NotificationType8 = class extends c {
            constructor(e) { super(e, 8); }
        }, t.NotificationType9 = class extends c {
            constructor(e) { super(e, 9); }
        }, (i = t.Message || (t.Message = {})).isRequest = function (e) { const t = e; return t && r.string(t.method) && (r.string(t.id) || r.number(t.id)); }, i.isNotification = function (e) { const t = e; return t && r.string(t.method) && void 0 === e.id; }, i.isResponse = function (e) { const t = e; return t && (void 0 !== t.result || !!t.error) && (r.string(t.id) || r.number(t.id) || null === t.id); };
    }, 5706: (e, t) => {
        "use strict";
        let n;
        function r() { if (void 0 === n)
            throw new Error("No runtime abstraction layer installed"); return n; }
        Object.defineProperty(t, "__esModule", { value: !0 }), function (e) { e.install = function (e) { if (void 0 === e)
            throw new Error("No runtime abstraction layer provided"); n = e; }; }(r || (r = {})), t.default = r;
    }, 2339: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.Semaphore = void 0;
        const r = n(5706);
        t.Semaphore = class {
            constructor(e = 1) { if (e <= 0)
                throw new Error("Capacity must be greater than 0"); this._capacity = e, this._active = 0, this._waiting = []; }
            lock(e) { return new Promise(((t, n) => { this._waiting.push({ thunk: e, resolve: t, reject: n }), this.runNext(); })); }
            get active() { return this._active; }
            runNext() { 0 !== this._waiting.length && this._active !== this._capacity && (0, r.default)().timer.setImmediate((() => this.doRunNext())); }
            doRunNext() { if (0 === this._waiting.length || this._active === this._capacity)
                return; const e = this._waiting.shift(); if (this._active++, this._active > this._capacity)
                throw new Error("To many thunks active"); try {
                const t = e.thunk();
                t instanceof Promise ? t.then((t => { this._active--, e.resolve(t), this.runNext(); }), (t => { this._active--, e.reject(t), this.runNext(); })) : (this._active--, e.resolve(t), this.runNext());
            }
            catch (t) {
                this._active--, e.reject(t), this.runNext();
            } }
        };
    }, 294: function (e, t, n) {
        "use strict";
        var r = this && this.__createBinding || (Object.create ? function (e, t, n, r) { void 0 === r && (r = n); var o = Object.getOwnPropertyDescriptor(t, n); o && !("get" in o ? !t.__esModule : o.writable || o.configurable) || (o = { enumerable: !0, get: function () { return t[n]; } }), Object.defineProperty(e, r, o); } : function (e, t, n, r) { void 0 === r && (r = n), e[r] = t[n]; }), o = this && this.__exportStar || function (e, t) { for (var n in e)
            "default" === n || Object.prototype.hasOwnProperty.call(t, n) || r(t, e, n); };
        Object.defineProperty(t, "__esModule", { value: !0 }), t.createProtocolConnection = void 0;
        const i = n(1200);
        o(n(1200), t), o(n(0), t), t.createProtocolConnection = function (e, t, n, r) { return (0, i.createMessageConnection)(e, t, n, r); };
    }, 0: function (e, t, n) {
        "use strict";
        var r = this && this.__createBinding || (Object.create ? function (e, t, n, r) { void 0 === r && (r = n); var o = Object.getOwnPropertyDescriptor(t, n); o && !("get" in o ? !t.__esModule : o.writable || o.configurable) || (o = { enumerable: !0, get: function () { return t[n]; } }), Object.defineProperty(e, r, o); } : function (e, t, n, r) { void 0 === r && (r = n), e[r] = t[n]; }), o = this && this.__exportStar || function (e, t) { for (var n in e)
            "default" === n || Object.prototype.hasOwnProperty.call(t, n) || r(t, e, n); };
        Object.defineProperty(t, "__esModule", { value: !0 }), t.LSPErrorCodes = t.createProtocolConnection = void 0, o(n(5953), t), o(n(4767), t), o(n(8599), t), o(n(6525), t);
        var i, a = n(2798);
        Object.defineProperty(t, "createProtocolConnection", { enumerable: !0, get: function () { return a.createProtocolConnection; } }), (i = t.LSPErrorCodes || (t.LSPErrorCodes = {})).lspReservedErrorRangeStart = -32899, i.RequestFailed = -32803, i.ServerCancelled = -32802, i.ContentModified = -32801, i.RequestCancelled = -32800, i.lspReservedErrorRangeEnd = -32800;
    }, 2798: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.createProtocolConnection = void 0;
        const r = n(5953);
        t.createProtocolConnection = function (e, t, n, o) { return r.ConnectionStrategy.is(o) && (o = { connectionStrategy: o }), (0, r.createMessageConnection)(e, t, n, o); };
    }, 8599: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.ProtocolNotificationType = t.ProtocolNotificationType0 = t.ProtocolRequestType = t.ProtocolRequestType0 = t.RegistrationType = t.MessageDirection = void 0;
        const r = n(5953);
        var o;
        (o = t.MessageDirection || (t.MessageDirection = {})).clientToServer = "clientToServer", o.serverToClient = "serverToClient", o.both = "both", t.RegistrationType = class {
            constructor(e) { this.method = e; }
        };
        class i extends r.RequestType0 {
            constructor(e) { super(e); }
        }
        t.ProtocolRequestType0 = i;
        class a extends r.RequestType {
            constructor(e) { super(e, r.ParameterStructures.byName); }
        }
        t.ProtocolRequestType = a;
        class s extends r.NotificationType0 {
            constructor(e) { super(e); }
        }
        t.ProtocolNotificationType0 = s;
        class c extends r.NotificationType {
            constructor(e) { super(e, r.ParameterStructures.byName); }
        }
        t.ProtocolNotificationType = c;
    }, 4434: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.CallHierarchyOutgoingCallsRequest = t.CallHierarchyIncomingCallsRequest = t.CallHierarchyPrepareRequest = void 0;
        const r = n(8599);
        var o, i, a;
        (a = t.CallHierarchyPrepareRequest || (t.CallHierarchyPrepareRequest = {})).method = "textDocument/prepareCallHierarchy", a.messageDirection = r.MessageDirection.clientToServer, a.type = new r.ProtocolRequestType(a.method), (i = t.CallHierarchyIncomingCallsRequest || (t.CallHierarchyIncomingCallsRequest = {})).method = "callHierarchy/incomingCalls", i.messageDirection = r.MessageDirection.clientToServer, i.type = new r.ProtocolRequestType(i.method), (o = t.CallHierarchyOutgoingCallsRequest || (t.CallHierarchyOutgoingCallsRequest = {})).method = "callHierarchy/outgoingCalls", o.messageDirection = r.MessageDirection.clientToServer, o.type = new r.ProtocolRequestType(o.method);
    }, 7908: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.ColorPresentationRequest = t.DocumentColorRequest = void 0;
        const r = n(8599);
        var o, i;
        (i = t.DocumentColorRequest || (t.DocumentColorRequest = {})).method = "textDocument/documentColor", i.messageDirection = r.MessageDirection.clientToServer, i.type = new r.ProtocolRequestType(i.method), (o = t.ColorPresentationRequest || (t.ColorPresentationRequest = {})).method = "textDocument/colorPresentation", o.messageDirection = r.MessageDirection.clientToServer, o.type = new r.ProtocolRequestType(o.method);
    }, 5442: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.ConfigurationRequest = void 0;
        const r = n(8599);
        var o;
        (o = t.ConfigurationRequest || (t.ConfigurationRequest = {})).method = "workspace/configuration", o.messageDirection = r.MessageDirection.serverToClient, o.type = new r.ProtocolRequestType(o.method);
    }, 7210: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.DeclarationRequest = void 0;
        const r = n(8599);
        var o;
        (o = t.DeclarationRequest || (t.DeclarationRequest = {})).method = "textDocument/declaration", o.messageDirection = r.MessageDirection.clientToServer, o.type = new r.ProtocolRequestType(o.method);
    }, 5692: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.DiagnosticRefreshRequest = t.WorkspaceDiagnosticRequest = t.DocumentDiagnosticRequest = t.DocumentDiagnosticReportKind = t.DiagnosticServerCancellationData = void 0;
        const r = n(5953), o = n(2523), i = n(8599);
        var a, s, c, u;
        (t.DiagnosticServerCancellationData || (t.DiagnosticServerCancellationData = {})).is = function (e) { const t = e; return t && o.boolean(t.retriggerRequest); }, (u = t.DocumentDiagnosticReportKind || (t.DocumentDiagnosticReportKind = {})).Full = "full", u.Unchanged = "unchanged", (c = t.DocumentDiagnosticRequest || (t.DocumentDiagnosticRequest = {})).method = "textDocument/diagnostic", c.messageDirection = i.MessageDirection.clientToServer, c.type = new i.ProtocolRequestType(c.method), c.partialResult = new r.ProgressType, (s = t.WorkspaceDiagnosticRequest || (t.WorkspaceDiagnosticRequest = {})).method = "workspace/diagnostic", s.messageDirection = i.MessageDirection.clientToServer, s.type = new i.ProtocolRequestType(s.method), s.partialResult = new r.ProgressType, (a = t.DiagnosticRefreshRequest || (t.DiagnosticRefreshRequest = {})).method = "workspace/diagnostic/refresh", a.messageDirection = i.MessageDirection.clientToServer, a.type = new i.ProtocolRequestType0(a.method);
    }, 6190: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.WillDeleteFilesRequest = t.DidDeleteFilesNotification = t.DidRenameFilesNotification = t.WillRenameFilesRequest = t.DidCreateFilesNotification = t.WillCreateFilesRequest = t.FileOperationPatternKind = void 0;
        const r = n(8599);
        var o, i, a, s, c, u, l;
        (l = t.FileOperationPatternKind || (t.FileOperationPatternKind = {})).file = "file", l.folder = "folder", (u = t.WillCreateFilesRequest || (t.WillCreateFilesRequest = {})).method = "workspace/willCreateFiles", u.messageDirection = r.MessageDirection.clientToServer, u.type = new r.ProtocolRequestType(u.method), (c = t.DidCreateFilesNotification || (t.DidCreateFilesNotification = {})).method = "workspace/didCreateFiles", c.messageDirection = r.MessageDirection.clientToServer, c.type = new r.ProtocolNotificationType(c.method), (s = t.WillRenameFilesRequest || (t.WillRenameFilesRequest = {})).method = "workspace/willRenameFiles", s.messageDirection = r.MessageDirection.clientToServer, s.type = new r.ProtocolRequestType(s.method), (a = t.DidRenameFilesNotification || (t.DidRenameFilesNotification = {})).method = "workspace/didRenameFiles", a.messageDirection = r.MessageDirection.clientToServer, a.type = new r.ProtocolNotificationType(a.method), (i = t.DidDeleteFilesNotification || (t.DidDeleteFilesNotification = {})).method = "workspace/didDeleteFiles", i.messageDirection = r.MessageDirection.clientToServer, i.type = new r.ProtocolNotificationType(i.method), (o = t.WillDeleteFilesRequest || (t.WillDeleteFilesRequest = {})).method = "workspace/willDeleteFiles", o.messageDirection = r.MessageDirection.clientToServer, o.type = new r.ProtocolRequestType(o.method);
    }, 7029: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.FoldingRangeRequest = void 0;
        const r = n(8599);
        var o;
        (o = t.FoldingRangeRequest || (t.FoldingRangeRequest = {})).method = "textDocument/foldingRange", o.messageDirection = r.MessageDirection.clientToServer, o.type = new r.ProtocolRequestType(o.method);
    }, 9380: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.ImplementationRequest = void 0;
        const r = n(8599);
        var o;
        (o = t.ImplementationRequest || (t.ImplementationRequest = {})).method = "textDocument/implementation", o.messageDirection = r.MessageDirection.clientToServer, o.type = new r.ProtocolRequestType(o.method);
    }, 6315: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.InlayHintRefreshRequest = t.InlayHintResolveRequest = t.InlayHintRequest = void 0;
        const r = n(8599);
        var o, i, a;
        (a = t.InlayHintRequest || (t.InlayHintRequest = {})).method = "textDocument/inlayHint", a.messageDirection = r.MessageDirection.clientToServer, a.type = new r.ProtocolRequestType(a.method), (i = t.InlayHintResolveRequest || (t.InlayHintResolveRequest = {})).method = "inlayHint/resolve", i.messageDirection = r.MessageDirection.clientToServer, i.type = new r.ProtocolRequestType(i.method), (o = t.InlayHintRefreshRequest || (t.InlayHintRefreshRequest = {})).method = "workspace/inlayHint/refresh", o.messageDirection = r.MessageDirection.clientToServer, o.type = new r.ProtocolRequestType0(o.method);
    }, 7425: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.InlineValueRefreshRequest = t.InlineValueRequest = void 0;
        const r = n(8599);
        var o, i;
        (i = t.InlineValueRequest || (t.InlineValueRequest = {})).method = "textDocument/inlineValue", i.messageDirection = r.MessageDirection.clientToServer, i.type = new r.ProtocolRequestType(i.method), (o = t.InlineValueRefreshRequest || (t.InlineValueRefreshRequest = {})).method = "workspace/inlineValue/refresh", o.messageDirection = r.MessageDirection.clientToServer, o.type = new r.ProtocolRequestType0(o.method);
    }, 6525: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.WorkspaceSymbolRequest = t.CodeActionResolveRequest = t.CodeActionRequest = t.DocumentSymbolRequest = t.DocumentHighlightRequest = t.ReferencesRequest = t.DefinitionRequest = t.SignatureHelpRequest = t.SignatureHelpTriggerKind = t.HoverRequest = t.CompletionResolveRequest = t.CompletionRequest = t.CompletionTriggerKind = t.PublishDiagnosticsNotification = t.WatchKind = t.RelativePattern = t.FileChangeType = t.DidChangeWatchedFilesNotification = t.WillSaveTextDocumentWaitUntilRequest = t.WillSaveTextDocumentNotification = t.TextDocumentSaveReason = t.DidSaveTextDocumentNotification = t.DidCloseTextDocumentNotification = t.DidChangeTextDocumentNotification = t.TextDocumentContentChangeEvent = t.DidOpenTextDocumentNotification = t.TextDocumentSyncKind = t.TelemetryEventNotification = t.LogMessageNotification = t.ShowMessageRequest = t.ShowMessageNotification = t.MessageType = t.DidChangeConfigurationNotification = t.ExitNotification = t.ShutdownRequest = t.InitializedNotification = t.InitializeErrorCodes = t.InitializeRequest = t.WorkDoneProgressOptions = t.TextDocumentRegistrationOptions = t.StaticRegistrationOptions = t.PositionEncodingKind = t.FailureHandlingKind = t.ResourceOperationKind = t.UnregistrationRequest = t.RegistrationRequest = t.DocumentSelector = t.NotebookCellTextDocumentFilter = t.NotebookDocumentFilter = t.TextDocumentFilter = void 0, t.TypeHierarchySubtypesRequest = t.TypeHierarchyPrepareRequest = t.MonikerRequest = t.MonikerKind = t.UniquenessLevel = t.WillDeleteFilesRequest = t.DidDeleteFilesNotification = t.WillRenameFilesRequest = t.DidRenameFilesNotification = t.WillCreateFilesRequest = t.DidCreateFilesNotification = t.FileOperationPatternKind = t.LinkedEditingRangeRequest = t.ShowDocumentRequest = t.SemanticTokensRegistrationType = t.SemanticTokensRefreshRequest = t.SemanticTokensRangeRequest = t.SemanticTokensDeltaRequest = t.SemanticTokensRequest = t.TokenFormat = t.CallHierarchyPrepareRequest = t.CallHierarchyOutgoingCallsRequest = t.CallHierarchyIncomingCallsRequest = t.WorkDoneProgressCancelNotification = t.WorkDoneProgressCreateRequest = t.WorkDoneProgress = t.SelectionRangeRequest = t.DeclarationRequest = t.FoldingRangeRequest = t.ColorPresentationRequest = t.DocumentColorRequest = t.ConfigurationRequest = t.DidChangeWorkspaceFoldersNotification = t.WorkspaceFoldersRequest = t.TypeDefinitionRequest = t.ImplementationRequest = t.ApplyWorkspaceEditRequest = t.ExecuteCommandRequest = t.PrepareRenameRequest = t.RenameRequest = t.PrepareSupportDefaultBehavior = t.DocumentOnTypeFormattingRequest = t.DocumentRangeFormattingRequest = t.DocumentFormattingRequest = t.DocumentLinkResolveRequest = t.DocumentLinkRequest = t.CodeLensRefreshRequest = t.CodeLensResolveRequest = t.CodeLensRequest = t.WorkspaceSymbolResolveRequest = void 0, t.DidCloseNotebookDocumentNotification = t.DidSaveNotebookDocumentNotification = t.DidChangeNotebookDocumentNotification = t.NotebookCellArrayChange = t.DidOpenNotebookDocumentNotification = t.NotebookDocumentSyncRegistrationType = t.NotebookDocument = t.NotebookCell = t.ExecutionSummary = t.NotebookCellKind = t.DiagnosticRefreshRequest = t.WorkspaceDiagnosticRequest = t.DocumentDiagnosticRequest = t.DocumentDiagnosticReportKind = t.DiagnosticServerCancellationData = t.InlayHintRefreshRequest = t.InlayHintResolveRequest = t.InlayHintRequest = t.InlineValueRefreshRequest = t.InlineValueRequest = t.TypeHierarchySupertypesRequest = void 0;
        const r = n(8599), o = n(4767), i = n(2523), a = n(9380);
        Object.defineProperty(t, "ImplementationRequest", { enumerable: !0, get: function () { return a.ImplementationRequest; } });
        const s = n(8642);
        Object.defineProperty(t, "TypeDefinitionRequest", { enumerable: !0, get: function () { return s.TypeDefinitionRequest; } });
        const c = n(3402);
        Object.defineProperty(t, "WorkspaceFoldersRequest", { enumerable: !0, get: function () { return c.WorkspaceFoldersRequest; } }), Object.defineProperty(t, "DidChangeWorkspaceFoldersNotification", { enumerable: !0, get: function () { return c.DidChangeWorkspaceFoldersNotification; } });
        const u = n(5442);
        Object.defineProperty(t, "ConfigurationRequest", { enumerable: !0, get: function () { return u.ConfigurationRequest; } });
        const l = n(7908);
        Object.defineProperty(t, "DocumentColorRequest", { enumerable: !0, get: function () { return l.DocumentColorRequest; } }), Object.defineProperty(t, "ColorPresentationRequest", { enumerable: !0, get: function () { return l.ColorPresentationRequest; } });
        const f = n(7029);
        Object.defineProperty(t, "FoldingRangeRequest", { enumerable: !0, get: function () { return f.FoldingRangeRequest; } });
        const p = n(7210);
        Object.defineProperty(t, "DeclarationRequest", { enumerable: !0, get: function () { return p.DeclarationRequest; } });
        const h = n(2392);
        Object.defineProperty(t, "SelectionRangeRequest", { enumerable: !0, get: function () { return h.SelectionRangeRequest; } });
        const d = n(7895);
        Object.defineProperty(t, "WorkDoneProgress", { enumerable: !0, get: function () { return d.WorkDoneProgress; } }), Object.defineProperty(t, "WorkDoneProgressCreateRequest", { enumerable: !0, get: function () { return d.WorkDoneProgressCreateRequest; } }), Object.defineProperty(t, "WorkDoneProgressCancelNotification", { enumerable: !0, get: function () { return d.WorkDoneProgressCancelNotification; } });
        const y = n(4434);
        Object.defineProperty(t, "CallHierarchyIncomingCallsRequest", { enumerable: !0, get: function () { return y.CallHierarchyIncomingCallsRequest; } }), Object.defineProperty(t, "CallHierarchyOutgoingCallsRequest", { enumerable: !0, get: function () { return y.CallHierarchyOutgoingCallsRequest; } }), Object.defineProperty(t, "CallHierarchyPrepareRequest", { enumerable: !0, get: function () { return y.CallHierarchyPrepareRequest; } });
        const g = n(8489);
        Object.defineProperty(t, "TokenFormat", { enumerable: !0, get: function () { return g.TokenFormat; } }), Object.defineProperty(t, "SemanticTokensRequest", { enumerable: !0, get: function () { return g.SemanticTokensRequest; } }), Object.defineProperty(t, "SemanticTokensDeltaRequest", { enumerable: !0, get: function () { return g.SemanticTokensDeltaRequest; } }), Object.defineProperty(t, "SemanticTokensRangeRequest", { enumerable: !0, get: function () { return g.SemanticTokensRangeRequest; } }), Object.defineProperty(t, "SemanticTokensRefreshRequest", { enumerable: !0, get: function () { return g.SemanticTokensRefreshRequest; } }), Object.defineProperty(t, "SemanticTokensRegistrationType", { enumerable: !0, get: function () { return g.SemanticTokensRegistrationType; } });
        const m = n(1541);
        Object.defineProperty(t, "ShowDocumentRequest", { enumerable: !0, get: function () { return m.ShowDocumentRequest; } });
        const v = n(527);
        Object.defineProperty(t, "LinkedEditingRangeRequest", { enumerable: !0, get: function () { return v.LinkedEditingRangeRequest; } });
        const b = n(6190);
        Object.defineProperty(t, "FileOperationPatternKind", { enumerable: !0, get: function () { return b.FileOperationPatternKind; } }), Object.defineProperty(t, "DidCreateFilesNotification", { enumerable: !0, get: function () { return b.DidCreateFilesNotification; } }), Object.defineProperty(t, "WillCreateFilesRequest", { enumerable: !0, get: function () { return b.WillCreateFilesRequest; } }), Object.defineProperty(t, "DidRenameFilesNotification", { enumerable: !0, get: function () { return b.DidRenameFilesNotification; } }), Object.defineProperty(t, "WillRenameFilesRequest", { enumerable: !0, get: function () { return b.WillRenameFilesRequest; } }), Object.defineProperty(t, "DidDeleteFilesNotification", { enumerable: !0, get: function () { return b.DidDeleteFilesNotification; } }), Object.defineProperty(t, "WillDeleteFilesRequest", { enumerable: !0, get: function () { return b.WillDeleteFilesRequest; } });
        const T = n(1964);
        Object.defineProperty(t, "UniquenessLevel", { enumerable: !0, get: function () { return T.UniquenessLevel; } }), Object.defineProperty(t, "MonikerKind", { enumerable: !0, get: function () { return T.MonikerKind; } }), Object.defineProperty(t, "MonikerRequest", { enumerable: !0, get: function () { return T.MonikerRequest; } });
        const E = n(5318);
        Object.defineProperty(t, "TypeHierarchyPrepareRequest", { enumerable: !0, get: function () { return E.TypeHierarchyPrepareRequest; } }), Object.defineProperty(t, "TypeHierarchySubtypesRequest", { enumerable: !0, get: function () { return E.TypeHierarchySubtypesRequest; } }), Object.defineProperty(t, "TypeHierarchySupertypesRequest", { enumerable: !0, get: function () { return E.TypeHierarchySupertypesRequest; } });
        const _ = n(7425);
        Object.defineProperty(t, "InlineValueRequest", { enumerable: !0, get: function () { return _.InlineValueRequest; } }), Object.defineProperty(t, "InlineValueRefreshRequest", { enumerable: !0, get: function () { return _.InlineValueRefreshRequest; } });
        const R = n(6315);
        Object.defineProperty(t, "InlayHintRequest", { enumerable: !0, get: function () { return R.InlayHintRequest; } }), Object.defineProperty(t, "InlayHintResolveRequest", { enumerable: !0, get: function () { return R.InlayHintResolveRequest; } }), Object.defineProperty(t, "InlayHintRefreshRequest", { enumerable: !0, get: function () { return R.InlayHintRefreshRequest; } });
        const S = n(5692);
        Object.defineProperty(t, "DiagnosticServerCancellationData", { enumerable: !0, get: function () { return S.DiagnosticServerCancellationData; } }), Object.defineProperty(t, "DocumentDiagnosticReportKind", { enumerable: !0, get: function () { return S.DocumentDiagnosticReportKind; } }), Object.defineProperty(t, "DocumentDiagnosticRequest", { enumerable: !0, get: function () { return S.DocumentDiagnosticRequest; } }), Object.defineProperty(t, "WorkspaceDiagnosticRequest", { enumerable: !0, get: function () { return S.WorkspaceDiagnosticRequest; } }), Object.defineProperty(t, "DiagnosticRefreshRequest", { enumerable: !0, get: function () { return S.DiagnosticRefreshRequest; } });
        const O = n(4460);
        var A, N, k, w, x, C, P, I, D, L, M, j, U, F, q, W, B, $, H, V, K, G, z, X, Y, J, Q, Z, ee, te, ne, re, oe, ie, ae, se, ce, ue, le, fe, pe, he, de, ye, ge, me, ve, be, Te, Ee, _e, Re, Se, Oe, Ae, Ne, ke, we, xe;
        Object.defineProperty(t, "NotebookCellKind", { enumerable: !0, get: function () { return O.NotebookCellKind; } }), Object.defineProperty(t, "ExecutionSummary", { enumerable: !0, get: function () { return O.ExecutionSummary; } }), Object.defineProperty(t, "NotebookCell", { enumerable: !0, get: function () { return O.NotebookCell; } }), Object.defineProperty(t, "NotebookDocument", { enumerable: !0, get: function () { return O.NotebookDocument; } }), Object.defineProperty(t, "NotebookDocumentSyncRegistrationType", { enumerable: !0, get: function () { return O.NotebookDocumentSyncRegistrationType; } }), Object.defineProperty(t, "DidOpenNotebookDocumentNotification", { enumerable: !0, get: function () { return O.DidOpenNotebookDocumentNotification; } }), Object.defineProperty(t, "NotebookCellArrayChange", { enumerable: !0, get: function () { return O.NotebookCellArrayChange; } }), Object.defineProperty(t, "DidChangeNotebookDocumentNotification", { enumerable: !0, get: function () { return O.DidChangeNotebookDocumentNotification; } }), Object.defineProperty(t, "DidSaveNotebookDocumentNotification", { enumerable: !0, get: function () { return O.DidSaveNotebookDocumentNotification; } }), Object.defineProperty(t, "DidCloseNotebookDocumentNotification", { enumerable: !0, get: function () { return O.DidCloseNotebookDocumentNotification; } }), function (e) { e.is = function (e) { const t = e; return i.string(t.language) || i.string(t.scheme) || i.string(t.pattern); }; }(A = t.TextDocumentFilter || (t.TextDocumentFilter = {})), function (e) { e.is = function (e) { const t = e; return i.objectLiteral(t) && (i.string(t.notebookType) || i.string(t.scheme) || i.string(t.pattern)); }; }(N = t.NotebookDocumentFilter || (t.NotebookDocumentFilter = {})), function (e) { e.is = function (e) { const t = e; return i.objectLiteral(t) && (i.string(t.notebook) || N.is(t.notebook)) && (void 0 === t.language || i.string(t.language)); }; }(k = t.NotebookCellTextDocumentFilter || (t.NotebookCellTextDocumentFilter = {})), function (e) { e.is = function (e) { if (!Array.isArray(e))
            return !1; for (let t of e)
            if (!i.string(t) && !A.is(t) && !k.is(t))
                return !1; return !0; }; }(w = t.DocumentSelector || (t.DocumentSelector = {})), (xe = t.RegistrationRequest || (t.RegistrationRequest = {})).method = "client/registerCapability", xe.messageDirection = r.MessageDirection.serverToClient, xe.type = new r.ProtocolRequestType(xe.method), (we = t.UnregistrationRequest || (t.UnregistrationRequest = {})).method = "client/unregisterCapability", we.messageDirection = r.MessageDirection.serverToClient, we.type = new r.ProtocolRequestType(we.method), (ke = t.ResourceOperationKind || (t.ResourceOperationKind = {})).Create = "create", ke.Rename = "rename", ke.Delete = "delete", (Ne = t.FailureHandlingKind || (t.FailureHandlingKind = {})).Abort = "abort", Ne.Transactional = "transactional", Ne.TextOnlyTransactional = "textOnlyTransactional", Ne.Undo = "undo", (Ae = t.PositionEncodingKind || (t.PositionEncodingKind = {})).UTF8 = "utf-8", Ae.UTF16 = "utf-16", Ae.UTF32 = "utf-32", (t.StaticRegistrationOptions || (t.StaticRegistrationOptions = {})).hasId = function (e) { const t = e; return t && i.string(t.id) && t.id.length > 0; }, (t.TextDocumentRegistrationOptions || (t.TextDocumentRegistrationOptions = {})).is = function (e) { const t = e; return t && (null === t.documentSelector || w.is(t.documentSelector)); }, (Oe = t.WorkDoneProgressOptions || (t.WorkDoneProgressOptions = {})).is = function (e) { const t = e; return i.objectLiteral(t) && (void 0 === t.workDoneProgress || i.boolean(t.workDoneProgress)); }, Oe.hasWorkDoneProgress = function (e) { const t = e; return t && i.boolean(t.workDoneProgress); }, (Se = t.InitializeRequest || (t.InitializeRequest = {})).method = "initialize", Se.messageDirection = r.MessageDirection.clientToServer, Se.type = new r.ProtocolRequestType(Se.method), (t.InitializeErrorCodes || (t.InitializeErrorCodes = {})).unknownProtocolVersion = 1, (Re = t.InitializedNotification || (t.InitializedNotification = {})).method = "initialized", Re.messageDirection = r.MessageDirection.clientToServer, Re.type = new r.ProtocolNotificationType(Re.method), (_e = t.ShutdownRequest || (t.ShutdownRequest = {})).method = "shutdown", _e.messageDirection = r.MessageDirection.clientToServer, _e.type = new r.ProtocolRequestType0(_e.method), (Ee = t.ExitNotification || (t.ExitNotification = {})).method = "exit", Ee.messageDirection = r.MessageDirection.clientToServer, Ee.type = new r.ProtocolNotificationType0(Ee.method), (Te = t.DidChangeConfigurationNotification || (t.DidChangeConfigurationNotification = {})).method = "workspace/didChangeConfiguration", Te.messageDirection = r.MessageDirection.clientToServer, Te.type = new r.ProtocolNotificationType(Te.method), (be = t.MessageType || (t.MessageType = {})).Error = 1, be.Warning = 2, be.Info = 3, be.Log = 4, (ve = t.ShowMessageNotification || (t.ShowMessageNotification = {})).method = "window/showMessage", ve.messageDirection = r.MessageDirection.serverToClient, ve.type = new r.ProtocolNotificationType(ve.method), (me = t.ShowMessageRequest || (t.ShowMessageRequest = {})).method = "window/showMessageRequest", me.messageDirection = r.MessageDirection.serverToClient, me.type = new r.ProtocolRequestType(me.method), (ge = t.LogMessageNotification || (t.LogMessageNotification = {})).method = "window/logMessage", ge.messageDirection = r.MessageDirection.serverToClient, ge.type = new r.ProtocolNotificationType(ge.method), (ye = t.TelemetryEventNotification || (t.TelemetryEventNotification = {})).method = "telemetry/event", ye.messageDirection = r.MessageDirection.serverToClient, ye.type = new r.ProtocolNotificationType(ye.method), (de = t.TextDocumentSyncKind || (t.TextDocumentSyncKind = {})).None = 0, de.Full = 1, de.Incremental = 2, (he = t.DidOpenTextDocumentNotification || (t.DidOpenTextDocumentNotification = {})).method = "textDocument/didOpen", he.messageDirection = r.MessageDirection.clientToServer, he.type = new r.ProtocolNotificationType(he.method), (pe = t.TextDocumentContentChangeEvent || (t.TextDocumentContentChangeEvent = {})).isIncremental = function (e) { let t = e; return null != t && "string" == typeof t.text && void 0 !== t.range && (void 0 === t.rangeLength || "number" == typeof t.rangeLength); }, pe.isFull = function (e) { let t = e; return null != t && "string" == typeof t.text && void 0 === t.range && void 0 === t.rangeLength; }, (fe = t.DidChangeTextDocumentNotification || (t.DidChangeTextDocumentNotification = {})).method = "textDocument/didChange", fe.messageDirection = r.MessageDirection.clientToServer, fe.type = new r.ProtocolNotificationType(fe.method), (le = t.DidCloseTextDocumentNotification || (t.DidCloseTextDocumentNotification = {})).method = "textDocument/didClose", le.messageDirection = r.MessageDirection.clientToServer, le.type = new r.ProtocolNotificationType(le.method), (ue = t.DidSaveTextDocumentNotification || (t.DidSaveTextDocumentNotification = {})).method = "textDocument/didSave", ue.messageDirection = r.MessageDirection.clientToServer, ue.type = new r.ProtocolNotificationType(ue.method), (ce = t.TextDocumentSaveReason || (t.TextDocumentSaveReason = {})).Manual = 1, ce.AfterDelay = 2, ce.FocusOut = 3, (se = t.WillSaveTextDocumentNotification || (t.WillSaveTextDocumentNotification = {})).method = "textDocument/willSave", se.messageDirection = r.MessageDirection.clientToServer, se.type = new r.ProtocolNotificationType(se.method), (ae = t.WillSaveTextDocumentWaitUntilRequest || (t.WillSaveTextDocumentWaitUntilRequest = {})).method = "textDocument/willSaveWaitUntil", ae.messageDirection = r.MessageDirection.clientToServer, ae.type = new r.ProtocolRequestType(ae.method), (ie = t.DidChangeWatchedFilesNotification || (t.DidChangeWatchedFilesNotification = {})).method = "workspace/didChangeWatchedFiles", ie.messageDirection = r.MessageDirection.clientToServer, ie.type = new r.ProtocolNotificationType(ie.method), (oe = t.FileChangeType || (t.FileChangeType = {})).Created = 1, oe.Changed = 2, oe.Deleted = 3, (t.RelativePattern || (t.RelativePattern = {})).is = function (e) { const t = e; return i.objectLiteral(t) && (o.URI.is(t.baseUri) || o.WorkspaceFolder.is(t.baseUri)) && i.string(t.pattern); }, (re = t.WatchKind || (t.WatchKind = {})).Create = 1, re.Change = 2, re.Delete = 4, (ne = t.PublishDiagnosticsNotification || (t.PublishDiagnosticsNotification = {})).method = "textDocument/publishDiagnostics", ne.messageDirection = r.MessageDirection.serverToClient, ne.type = new r.ProtocolNotificationType(ne.method), (te = t.CompletionTriggerKind || (t.CompletionTriggerKind = {})).Invoked = 1, te.TriggerCharacter = 2, te.TriggerForIncompleteCompletions = 3, (ee = t.CompletionRequest || (t.CompletionRequest = {})).method = "textDocument/completion", ee.messageDirection = r.MessageDirection.clientToServer, ee.type = new r.ProtocolRequestType(ee.method), (Z = t.CompletionResolveRequest || (t.CompletionResolveRequest = {})).method = "completionItem/resolve", Z.messageDirection = r.MessageDirection.clientToServer, Z.type = new r.ProtocolRequestType(Z.method), (Q = t.HoverRequest || (t.HoverRequest = {})).method = "textDocument/hover", Q.messageDirection = r.MessageDirection.clientToServer, Q.type = new r.ProtocolRequestType(Q.method), (J = t.SignatureHelpTriggerKind || (t.SignatureHelpTriggerKind = {})).Invoked = 1, J.TriggerCharacter = 2, J.ContentChange = 3, (Y = t.SignatureHelpRequest || (t.SignatureHelpRequest = {})).method = "textDocument/signatureHelp", Y.messageDirection = r.MessageDirection.clientToServer, Y.type = new r.ProtocolRequestType(Y.method), (X = t.DefinitionRequest || (t.DefinitionRequest = {})).method = "textDocument/definition", X.messageDirection = r.MessageDirection.clientToServer, X.type = new r.ProtocolRequestType(X.method), (z = t.ReferencesRequest || (t.ReferencesRequest = {})).method = "textDocument/references", z.messageDirection = r.MessageDirection.clientToServer, z.type = new r.ProtocolRequestType(z.method), (G = t.DocumentHighlightRequest || (t.DocumentHighlightRequest = {})).method = "textDocument/documentHighlight", G.messageDirection = r.MessageDirection.clientToServer, G.type = new r.ProtocolRequestType(G.method), (K = t.DocumentSymbolRequest || (t.DocumentSymbolRequest = {})).method = "textDocument/documentSymbol", K.messageDirection = r.MessageDirection.clientToServer, K.type = new r.ProtocolRequestType(K.method), (V = t.CodeActionRequest || (t.CodeActionRequest = {})).method = "textDocument/codeAction", V.messageDirection = r.MessageDirection.clientToServer, V.type = new r.ProtocolRequestType(V.method), (H = t.CodeActionResolveRequest || (t.CodeActionResolveRequest = {})).method = "codeAction/resolve", H.messageDirection = r.MessageDirection.clientToServer, H.type = new r.ProtocolRequestType(H.method), ($ = t.WorkspaceSymbolRequest || (t.WorkspaceSymbolRequest = {})).method = "workspace/symbol", $.messageDirection = r.MessageDirection.clientToServer, $.type = new r.ProtocolRequestType($.method), (B = t.WorkspaceSymbolResolveRequest || (t.WorkspaceSymbolResolveRequest = {})).method = "workspaceSymbol/resolve", B.messageDirection = r.MessageDirection.clientToServer, B.type = new r.ProtocolRequestType(B.method), (W = t.CodeLensRequest || (t.CodeLensRequest = {})).method = "textDocument/codeLens", W.messageDirection = r.MessageDirection.clientToServer, W.type = new r.ProtocolRequestType(W.method), (q = t.CodeLensResolveRequest || (t.CodeLensResolveRequest = {})).method = "codeLens/resolve", q.messageDirection = r.MessageDirection.clientToServer, q.type = new r.ProtocolRequestType(q.method), (F = t.CodeLensRefreshRequest || (t.CodeLensRefreshRequest = {})).method = "workspace/codeLens/refresh", F.messageDirection = r.MessageDirection.serverToClient, F.type = new r.ProtocolRequestType0(F.method), (U = t.DocumentLinkRequest || (t.DocumentLinkRequest = {})).method = "textDocument/documentLink", U.messageDirection = r.MessageDirection.clientToServer, U.type = new r.ProtocolRequestType(U.method), (j = t.DocumentLinkResolveRequest || (t.DocumentLinkResolveRequest = {})).method = "documentLink/resolve", j.messageDirection = r.MessageDirection.clientToServer, j.type = new r.ProtocolRequestType(j.method), (M = t.DocumentFormattingRequest || (t.DocumentFormattingRequest = {})).method = "textDocument/formatting", M.messageDirection = r.MessageDirection.clientToServer, M.type = new r.ProtocolRequestType(M.method), (L = t.DocumentRangeFormattingRequest || (t.DocumentRangeFormattingRequest = {})).method = "textDocument/rangeFormatting", L.messageDirection = r.MessageDirection.clientToServer, L.type = new r.ProtocolRequestType(L.method), (D = t.DocumentOnTypeFormattingRequest || (t.DocumentOnTypeFormattingRequest = {})).method = "textDocument/onTypeFormatting", D.messageDirection = r.MessageDirection.clientToServer, D.type = new r.ProtocolRequestType(D.method), (t.PrepareSupportDefaultBehavior || (t.PrepareSupportDefaultBehavior = {})).Identifier = 1, (I = t.RenameRequest || (t.RenameRequest = {})).method = "textDocument/rename", I.messageDirection = r.MessageDirection.clientToServer, I.type = new r.ProtocolRequestType(I.method), (P = t.PrepareRenameRequest || (t.PrepareRenameRequest = {})).method = "textDocument/prepareRename", P.messageDirection = r.MessageDirection.clientToServer, P.type = new r.ProtocolRequestType(P.method), (C = t.ExecuteCommandRequest || (t.ExecuteCommandRequest = {})).method = "workspace/executeCommand", C.messageDirection = r.MessageDirection.clientToServer, C.type = new r.ProtocolRequestType(C.method), (x = t.ApplyWorkspaceEditRequest || (t.ApplyWorkspaceEditRequest = {})).method = "workspace/applyEdit", x.messageDirection = r.MessageDirection.serverToClient, x.type = new r.ProtocolRequestType("workspace/applyEdit");
    }, 527: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.LinkedEditingRangeRequest = void 0;
        const r = n(8599);
        var o;
        (o = t.LinkedEditingRangeRequest || (t.LinkedEditingRangeRequest = {})).method = "textDocument/linkedEditingRange", o.messageDirection = r.MessageDirection.clientToServer, o.type = new r.ProtocolRequestType(o.method);
    }, 1964: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.MonikerRequest = t.MonikerKind = t.UniquenessLevel = void 0;
        const r = n(8599);
        var o, i, a;
        (a = t.UniquenessLevel || (t.UniquenessLevel = {})).document = "document", a.project = "project", a.group = "group", a.scheme = "scheme", a.global = "global", (i = t.MonikerKind || (t.MonikerKind = {})).$import = "import", i.$export = "export", i.local = "local", (o = t.MonikerRequest || (t.MonikerRequest = {})).method = "textDocument/moniker", o.messageDirection = r.MessageDirection.clientToServer, o.type = new r.ProtocolRequestType(o.method);
    }, 4460: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.DidCloseNotebookDocumentNotification = t.DidSaveNotebookDocumentNotification = t.DidChangeNotebookDocumentNotification = t.NotebookCellArrayChange = t.DidOpenNotebookDocumentNotification = t.NotebookDocumentSyncRegistrationType = t.NotebookDocument = t.NotebookCell = t.ExecutionSummary = t.NotebookCellKind = void 0;
        const r = n(4767), o = n(2523), i = n(8599);
        var a, s, c, u, l, f, p, h, d, y;
        !function (e) { e.Markup = 1, e.Code = 2, e.is = function (e) { return 1 === e || 2 === e; }; }(a = t.NotebookCellKind || (t.NotebookCellKind = {})), function (e) { e.create = function (e, t) { const n = { executionOrder: e }; return !0 !== t && !1 !== t || (n.success = t), n; }, e.is = function (e) { const t = e; return o.objectLiteral(t) && r.uinteger.is(t.executionOrder) && (void 0 === t.success || o.boolean(t.success)); }, e.equals = function (e, t) { return e === t || null != e && null != t && e.executionOrder === t.executionOrder && e.success === t.success; }; }(s = t.ExecutionSummary || (t.ExecutionSummary = {})), function (e) { function t(e, n) { if (e === n)
            return !0; if (null == e || null == n)
            return !1; if (typeof e != typeof n)
            return !1; if ("object" != typeof e)
            return !1; const r = Array.isArray(e), i = Array.isArray(n); if (r !== i)
            return !1; if (r && i) {
            if (e.length !== n.length)
                return !1;
            for (let r = 0; r < e.length; r++)
                if (!t(e[r], n[r]))
                    return !1;
        } if (o.objectLiteral(e) && o.objectLiteral(n)) {
            const r = Object.keys(e), o = Object.keys(n);
            if (r.length !== o.length)
                return !1;
            if (r.sort(), o.sort(), !t(r, o))
                return !1;
            for (let o = 0; o < r.length; o++) {
                const i = r[o];
                if (!t(e[i], n[i]))
                    return !1;
            }
        } return !0; } e.create = function (e, t) { return { kind: e, document: t }; }, e.is = function (e) { const t = e; return o.objectLiteral(t) && a.is(t.kind) && r.DocumentUri.is(t.document) && (void 0 === t.metadata || o.objectLiteral(t.metadata)); }, e.diff = function (e, n) { const r = new Set; return e.document !== n.document && r.add("document"), e.kind !== n.kind && r.add("kind"), e.executionSummary !== n.executionSummary && r.add("executionSummary"), void 0 === e.metadata && void 0 === n.metadata || t(e.metadata, n.metadata) || r.add("metadata"), void 0 === e.executionSummary && void 0 === n.executionSummary || s.equals(e.executionSummary, n.executionSummary) || r.add("executionSummary"), r; }; }(c = t.NotebookCell || (t.NotebookCell = {})), (y = t.NotebookDocument || (t.NotebookDocument = {})).create = function (e, t, n, r) { return { uri: e, notebookType: t, version: n, cells: r }; }, y.is = function (e) { const t = e; return o.objectLiteral(t) && o.string(t.uri) && r.integer.is(t.version) && o.typedArray(t.cells, c.is); }, function (e) { e.method = "notebookDocument/sync", e.messageDirection = i.MessageDirection.clientToServer, e.type = new i.RegistrationType(e.method); }(u = t.NotebookDocumentSyncRegistrationType || (t.NotebookDocumentSyncRegistrationType = {})), (d = t.DidOpenNotebookDocumentNotification || (t.DidOpenNotebookDocumentNotification = {})).method = "notebookDocument/didOpen", d.messageDirection = i.MessageDirection.clientToServer, d.type = new i.ProtocolNotificationType(d.method), d.registrationMethod = u.method, (h = t.NotebookCellArrayChange || (t.NotebookCellArrayChange = {})).is = function (e) { const t = e; return o.objectLiteral(t) && r.uinteger.is(t.start) && r.uinteger.is(t.deleteCount) && (void 0 === t.cells || o.typedArray(t.cells, c.is)); }, h.create = function (e, t, n) { const r = { start: e, deleteCount: t }; return void 0 !== n && (r.cells = n), r; }, (p = t.DidChangeNotebookDocumentNotification || (t.DidChangeNotebookDocumentNotification = {})).method = "notebookDocument/didChange", p.messageDirection = i.MessageDirection.clientToServer, p.type = new i.ProtocolNotificationType(p.method), p.registrationMethod = u.method, (f = t.DidSaveNotebookDocumentNotification || (t.DidSaveNotebookDocumentNotification = {})).method = "notebookDocument/didSave", f.messageDirection = i.MessageDirection.clientToServer, f.type = new i.ProtocolNotificationType(f.method), f.registrationMethod = u.method, (l = t.DidCloseNotebookDocumentNotification || (t.DidCloseNotebookDocumentNotification = {})).method = "notebookDocument/didClose", l.messageDirection = i.MessageDirection.clientToServer, l.type = new i.ProtocolNotificationType(l.method), l.registrationMethod = u.method;
    }, 7895: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.WorkDoneProgressCancelNotification = t.WorkDoneProgressCreateRequest = t.WorkDoneProgress = void 0;
        const r = n(5953), o = n(8599);
        var i, a, s;
        (s = t.WorkDoneProgress || (t.WorkDoneProgress = {})).type = new r.ProgressType, s.is = function (e) { return e === s.type; }, (a = t.WorkDoneProgressCreateRequest || (t.WorkDoneProgressCreateRequest = {})).method = "window/workDoneProgress/create", a.messageDirection = o.MessageDirection.serverToClient, a.type = new o.ProtocolRequestType(a.method), (i = t.WorkDoneProgressCancelNotification || (t.WorkDoneProgressCancelNotification = {})).method = "window/workDoneProgress/cancel", i.messageDirection = o.MessageDirection.clientToServer, i.type = new o.ProtocolNotificationType(i.method);
    }, 2392: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.SelectionRangeRequest = void 0;
        const r = n(8599);
        var o;
        (o = t.SelectionRangeRequest || (t.SelectionRangeRequest = {})).method = "textDocument/selectionRange", o.messageDirection = r.MessageDirection.clientToServer, o.type = new r.ProtocolRequestType(o.method);
    }, 8489: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.SemanticTokensRefreshRequest = t.SemanticTokensRangeRequest = t.SemanticTokensDeltaRequest = t.SemanticTokensRequest = t.SemanticTokensRegistrationType = t.TokenFormat = void 0;
        const r = n(8599);
        var o, i, a, s, c;
        (t.TokenFormat || (t.TokenFormat = {})).Relative = "relative", function (e) { e.method = "textDocument/semanticTokens", e.type = new r.RegistrationType(e.method); }(o = t.SemanticTokensRegistrationType || (t.SemanticTokensRegistrationType = {})), (c = t.SemanticTokensRequest || (t.SemanticTokensRequest = {})).method = "textDocument/semanticTokens/full", c.messageDirection = r.MessageDirection.clientToServer, c.type = new r.ProtocolRequestType(c.method), c.registrationMethod = o.method, (s = t.SemanticTokensDeltaRequest || (t.SemanticTokensDeltaRequest = {})).method = "textDocument/semanticTokens/full/delta", s.messageDirection = r.MessageDirection.clientToServer, s.type = new r.ProtocolRequestType(s.method), s.registrationMethod = o.method, (a = t.SemanticTokensRangeRequest || (t.SemanticTokensRangeRequest = {})).method = "textDocument/semanticTokens/range", a.messageDirection = r.MessageDirection.clientToServer, a.type = new r.ProtocolRequestType(a.method), a.registrationMethod = o.method, (i = t.SemanticTokensRefreshRequest || (t.SemanticTokensRefreshRequest = {})).method = "workspace/semanticTokens/refresh", i.messageDirection = r.MessageDirection.clientToServer, i.type = new r.ProtocolRequestType0(i.method);
    }, 1541: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.ShowDocumentRequest = void 0;
        const r = n(8599);
        var o;
        (o = t.ShowDocumentRequest || (t.ShowDocumentRequest = {})).method = "window/showDocument", o.messageDirection = r.MessageDirection.serverToClient, o.type = new r.ProtocolRequestType(o.method);
    }, 8642: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.TypeDefinitionRequest = void 0;
        const r = n(8599);
        var o;
        (o = t.TypeDefinitionRequest || (t.TypeDefinitionRequest = {})).method = "textDocument/typeDefinition", o.messageDirection = r.MessageDirection.clientToServer, o.type = new r.ProtocolRequestType(o.method);
    }, 5318: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.TypeHierarchySubtypesRequest = t.TypeHierarchySupertypesRequest = t.TypeHierarchyPrepareRequest = void 0;
        const r = n(8599);
        var o, i, a;
        (a = t.TypeHierarchyPrepareRequest || (t.TypeHierarchyPrepareRequest = {})).method = "textDocument/prepareTypeHierarchy", a.messageDirection = r.MessageDirection.clientToServer, a.type = new r.ProtocolRequestType(a.method), (i = t.TypeHierarchySupertypesRequest || (t.TypeHierarchySupertypesRequest = {})).method = "typeHierarchy/supertypes", i.messageDirection = r.MessageDirection.clientToServer, i.type = new r.ProtocolRequestType(i.method), (o = t.TypeHierarchySubtypesRequest || (t.TypeHierarchySubtypesRequest = {})).method = "typeHierarchy/subtypes", o.messageDirection = r.MessageDirection.clientToServer, o.type = new r.ProtocolRequestType(o.method);
    }, 3402: (e, t, n) => {
        "use strict";
        Object.defineProperty(t, "__esModule", { value: !0 }), t.DidChangeWorkspaceFoldersNotification = t.WorkspaceFoldersRequest = void 0;
        const r = n(8599);
        var o, i;
        (i = t.WorkspaceFoldersRequest || (t.WorkspaceFoldersRequest = {})).method = "workspace/workspaceFolders", i.messageDirection = r.MessageDirection.serverToClient, i.type = new r.ProtocolRequestType0(i.method), (o = t.DidChangeWorkspaceFoldersNotification || (t.DidChangeWorkspaceFoldersNotification = {})).method = "workspace/didChangeWorkspaceFolders", o.messageDirection = r.MessageDirection.clientToServer, o.type = new r.ProtocolNotificationType(o.method);
    }, 2523: (e, t) => {
        "use strict";
        function n(e) { return "string" == typeof e || e instanceof String; }
        function r(e) { return Array.isArray(e); }
        Object.defineProperty(t, "__esModule", { value: !0 }), t.objectLiteral = t.typedArray = t.stringArray = t.array = t.func = t.error = t.number = t.string = t.boolean = void 0, t.boolean = function (e) { return !0 === e || !1 === e; }, t.string = n, t.number = function (e) { return "number" == typeof e || e instanceof Number; }, t.error = function (e) { return e instanceof Error; }, t.func = function (e) { return "function" == typeof e; }, t.array = r, t.stringArray = function (e) { return r(e) && e.every((e => n(e))); }, t.typedArray = function (e, t) { return Array.isArray(e) && e.every(t); }, t.objectLiteral = function (e) { return null !== e && "object" == typeof e; };
    }, 4881: (e, t, n) => {
        "use strict";
        n.r(t), n.d(t, { TextDocument: () => r });
        var r, o = function (e, t, n) { if (n || 2 === arguments.length)
            for (var r, o = 0, i = t.length; o < i; o++)
                !r && o in t || (r || (r = Array.prototype.slice.call(t, 0, o)), r[o] = t[o]); return e.concat(r || Array.prototype.slice.call(t)); }, i = function () { function e(e, t, n, r) { this._uri = e, this._languageId = t, this._version = n, this._content = r, this._lineOffsets = void 0; } return Object.defineProperty(e.prototype, "uri", { get: function () { return this._uri; }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "languageId", { get: function () { return this._languageId; }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "version", { get: function () { return this._version; }, enumerable: !1, configurable: !0 }), e.prototype.getText = function (e) { if (e) {
            var t = this.offsetAt(e.start), n = this.offsetAt(e.end);
            return this._content.substring(t, n);
        } return this._content; }, e.prototype.update = function (t, n) { for (var r = 0, i = t; r < i.length; r++) {
            var a = i[r];
            if (e.isIncremental(a)) {
                var u = c(a.range), l = this.offsetAt(u.start), f = this.offsetAt(u.end);
                this._content = this._content.substring(0, l) + a.text + this._content.substring(f, this._content.length);
                var p = Math.max(u.start.line, 0), h = Math.max(u.end.line, 0), d = this._lineOffsets, y = s(a.text, !1, l);
                if (h - p === y.length)
                    for (var g = 0, m = y.length; g < m; g++)
                        d[g + p + 1] = y[g];
                else
                    y.length < 1e4 ? d.splice.apply(d, o([p + 1, h - p], y, !1)) : this._lineOffsets = d = d.slice(0, p + 1).concat(y, d.slice(h + 1));
                var v = a.text.length - (f - l);
                if (0 !== v)
                    for (g = p + 1 + y.length, m = d.length; g < m; g++)
                        d[g] = d[g] + v;
            }
            else {
                if (!e.isFull(a))
                    throw new Error("Unknown change event received");
                this._content = a.text, this._lineOffsets = void 0;
            }
        } this._version = n; }, e.prototype.getLineOffsets = function () { return void 0 === this._lineOffsets && (this._lineOffsets = s(this._content, !0)), this._lineOffsets; }, e.prototype.positionAt = function (e) { e = Math.max(Math.min(e, this._content.length), 0); var t = this.getLineOffsets(), n = 0, r = t.length; if (0 === r)
            return { line: 0, character: e }; for (; n < r;) {
            var o = Math.floor((n + r) / 2);
            t[o] > e ? r = o : n = o + 1;
        } var i = n - 1; return { line: i, character: e - t[i] }; }, e.prototype.offsetAt = function (e) { var t = this.getLineOffsets(); if (e.line >= t.length)
            return this._content.length; if (e.line < 0)
            return 0; var n = t[e.line], r = e.line + 1 < t.length ? t[e.line + 1] : this._content.length; return Math.max(Math.min(n + e.character, r), n); }, Object.defineProperty(e.prototype, "lineCount", { get: function () { return this.getLineOffsets().length; }, enumerable: !1, configurable: !0 }), e.isIncremental = function (e) { var t = e; return null != t && "string" == typeof t.text && void 0 !== t.range && (void 0 === t.rangeLength || "number" == typeof t.rangeLength); }, e.isFull = function (e) { var t = e; return null != t && "string" == typeof t.text && void 0 === t.range && void 0 === t.rangeLength; }, e; }();
        function a(e, t) { if (e.length <= 1)
            return e; var n = e.length / 2 | 0, r = e.slice(0, n), o = e.slice(n); a(r, t), a(o, t); for (var i = 0, s = 0, c = 0; i < r.length && s < o.length;) {
            var u = t(r[i], o[s]);
            e[c++] = u <= 0 ? r[i++] : o[s++];
        } for (; i < r.length;)
            e[c++] = r[i++]; for (; s < o.length;)
            e[c++] = o[s++]; return e; }
        function s(e, t, n) { void 0 === n && (n = 0); for (var r = t ? [n] : [], o = 0; o < e.length; o++) {
            var i = e.charCodeAt(o);
            13 !== i && 10 !== i || (13 === i && o + 1 < e.length && 10 === e.charCodeAt(o + 1) && o++, r.push(n + o + 1));
        } return r; }
        function c(e) { var t = e.start, n = e.end; return t.line > n.line || t.line === n.line && t.character > n.character ? { start: n, end: t } : e; }
        function u(e) { var t = c(e.range); return t !== e.range ? { newText: e.newText, range: t } : e; }
        !function (e) { e.create = function (e, t, n, r) { return new i(e, t, n, r); }, e.update = function (e, t, n) { if (e instanceof i)
            return e.update(t, n), e; throw new Error("TextDocument.update: document must be created by TextDocument.create"); }, e.applyEdits = function (e, t) { for (var n = e.getText(), r = 0, o = [], i = 0, s = a(t.map(u), (function (e, t) { var n = e.range.start.line - t.range.start.line; return 0 === n ? e.range.start.character - t.range.start.character : n; })); i < s.length; i++) {
            var c = s[i], l = e.offsetAt(c.range.start);
            if (l < r)
                throw new Error("Overlapping edit");
            l > r && o.push(n.substring(r, l)), c.newText.length && o.push(c.newText), r = e.offsetAt(c.range.end);
        } return o.push(n.substr(r)), o.join(""); }; }(r || (r = {}));
    }, 4767: (e, t, n) => {
        "use strict";
        var r, o, i, a, s, c, u, l, f, p, h, d, y, g, m, v, b, T, E, _, R, S, O, A, N, k, w, x;
        n.r(t), n.d(t, { AnnotatedTextEdit: () => O, ChangeAnnotation: () => R, ChangeAnnotationIdentifier: () => S, CodeAction: () => ie, CodeActionContext: () => oe, CodeActionKind: () => ne, CodeActionTriggerKind: () => re, CodeDescription: () => b, CodeLens: () => ae, Color: () => f, ColorInformation: () => p, ColorPresentation: () => h, Command: () => E, CompletionItem: () => $, CompletionItemKind: () => j, CompletionItemLabelDetails: () => B, CompletionItemTag: () => F, CompletionList: () => H, CreateFile: () => N, DeleteFile: () => w, Diagnostic: () => T, DiagnosticRelatedInformation: () => g, DiagnosticSeverity: () => m, DiagnosticTag: () => v, DocumentHighlight: () => Y, DocumentHighlightKind: () => X, DocumentLink: () => ce, DocumentSymbol: () => te, DocumentUri: () => r, EOL: () => Oe, FoldingRange: () => y, FoldingRangeKind: () => d, FormattingOptions: () => se, Hover: () => K, InlayHint: () => be, InlayHintKind: () => me, InlayHintLabelPart: () => ve, InlineValueContext: () => ge, InlineValueEvaluatableExpression: () => ye, InlineValueText: () => he, InlineValueVariableLookup: () => de, InsertReplaceEdit: () => q, InsertTextFormat: () => U, InsertTextMode: () => W, Location: () => u, LocationLink: () => l, MarkedString: () => V, MarkupContent: () => M, MarkupKind: () => L, OptionalVersionedTextDocumentIdentifier: () => I, ParameterInformation: () => G, Position: () => s, Range: () => c, RenameFile: () => k, SelectionRange: () => ue, SemanticTokenModifiers: () => fe, SemanticTokenTypes: () => le, SemanticTokens: () => pe, SignatureInformation: () => z, SymbolInformation: () => Z, SymbolKind: () => J, SymbolTag: () => Q, TextDocument: () => Se, TextDocumentEdit: () => A, TextDocumentIdentifier: () => C, TextDocumentItem: () => D, TextEdit: () => _, URI: () => o, VersionedTextDocumentIdentifier: () => P, WorkspaceChange: () => Re, WorkspaceEdit: () => x, WorkspaceFolder: () => Te, WorkspaceSymbol: () => ee, integer: () => i, uinteger: () => a }), function (e) { e.is = function (e) { return "string" == typeof e; }; }(r || (r = {})), function (e) { e.is = function (e) { return "string" == typeof e; }; }(o || (o = {})), function (e) { e.MIN_VALUE = -2147483648, e.MAX_VALUE = 2147483647, e.is = function (t) { return "number" == typeof t && e.MIN_VALUE <= t && t <= e.MAX_VALUE; }; }(i || (i = {})), function (e) { e.MIN_VALUE = 0, e.MAX_VALUE = 2147483647, e.is = function (t) { return "number" == typeof t && e.MIN_VALUE <= t && t <= e.MAX_VALUE; }; }(a || (a = {})), function (e) { e.create = function (e, t) { return e === Number.MAX_VALUE && (e = a.MAX_VALUE), t === Number.MAX_VALUE && (t = a.MAX_VALUE), { line: e, character: t }; }, e.is = function (e) { var t = e; return Ae.objectLiteral(t) && Ae.uinteger(t.line) && Ae.uinteger(t.character); }; }(s || (s = {})), function (e) { e.create = function (e, t, n, r) { if (Ae.uinteger(e) && Ae.uinteger(t) && Ae.uinteger(n) && Ae.uinteger(r))
            return { start: s.create(e, t), end: s.create(n, r) }; if (s.is(e) && s.is(t))
            return { start: e, end: t }; throw new Error("Range#create called with invalid arguments[".concat(e, ", ").concat(t, ", ").concat(n, ", ").concat(r, "]")); }, e.is = function (e) { var t = e; return Ae.objectLiteral(t) && s.is(t.start) && s.is(t.end); }; }(c || (c = {})), function (e) { e.create = function (e, t) { return { uri: e, range: t }; }, e.is = function (e) { var t = e; return Ae.objectLiteral(t) && c.is(t.range) && (Ae.string(t.uri) || Ae.undefined(t.uri)); }; }(u || (u = {})), function (e) { e.create = function (e, t, n, r) { return { targetUri: e, targetRange: t, targetSelectionRange: n, originSelectionRange: r }; }, e.is = function (e) { var t = e; return Ae.objectLiteral(t) && c.is(t.targetRange) && Ae.string(t.targetUri) && c.is(t.targetSelectionRange) && (c.is(t.originSelectionRange) || Ae.undefined(t.originSelectionRange)); }; }(l || (l = {})), function (e) { e.create = function (e, t, n, r) { return { red: e, green: t, blue: n, alpha: r }; }, e.is = function (e) { var t = e; return Ae.objectLiteral(t) && Ae.numberRange(t.red, 0, 1) && Ae.numberRange(t.green, 0, 1) && Ae.numberRange(t.blue, 0, 1) && Ae.numberRange(t.alpha, 0, 1); }; }(f || (f = {})), function (e) { e.create = function (e, t) { return { range: e, color: t }; }, e.is = function (e) { var t = e; return Ae.objectLiteral(t) && c.is(t.range) && f.is(t.color); }; }(p || (p = {})), function (e) { e.create = function (e, t, n) { return { label: e, textEdit: t, additionalTextEdits: n }; }, e.is = function (e) { var t = e; return Ae.objectLiteral(t) && Ae.string(t.label) && (Ae.undefined(t.textEdit) || _.is(t)) && (Ae.undefined(t.additionalTextEdits) || Ae.typedArray(t.additionalTextEdits, _.is)); }; }(h || (h = {})), function (e) { e.Comment = "comment", e.Imports = "imports", e.Region = "region"; }(d || (d = {})), function (e) { e.create = function (e, t, n, r, o, i) { var a = { startLine: e, endLine: t }; return Ae.defined(n) && (a.startCharacter = n), Ae.defined(r) && (a.endCharacter = r), Ae.defined(o) && (a.kind = o), Ae.defined(i) && (a.collapsedText = i), a; }, e.is = function (e) { var t = e; return Ae.objectLiteral(t) && Ae.uinteger(t.startLine) && Ae.uinteger(t.startLine) && (Ae.undefined(t.startCharacter) || Ae.uinteger(t.startCharacter)) && (Ae.undefined(t.endCharacter) || Ae.uinteger(t.endCharacter)) && (Ae.undefined(t.kind) || Ae.string(t.kind)); }; }(y || (y = {})), function (e) { e.create = function (e, t) { return { location: e, message: t }; }, e.is = function (e) { var t = e; return Ae.defined(t) && u.is(t.location) && Ae.string(t.message); }; }(g || (g = {})), function (e) { e.Error = 1, e.Warning = 2, e.Information = 3, e.Hint = 4; }(m || (m = {})), function (e) { e.Unnecessary = 1, e.Deprecated = 2; }(v || (v = {})), function (e) { e.is = function (e) { var t = e; return Ae.objectLiteral(t) && Ae.string(t.href); }; }(b || (b = {})), function (e) { e.create = function (e, t, n, r, o, i) { var a = { range: e, message: t }; return Ae.defined(n) && (a.severity = n), Ae.defined(r) && (a.code = r), Ae.defined(o) && (a.source = o), Ae.defined(i) && (a.relatedInformation = i), a; }, e.is = function (e) { var t, n = e; return Ae.defined(n) && c.is(n.range) && Ae.string(n.message) && (Ae.number(n.severity) || Ae.undefined(n.severity)) && (Ae.integer(n.code) || Ae.string(n.code) || Ae.undefined(n.code)) && (Ae.undefined(n.codeDescription) || Ae.string(null === (t = n.codeDescription) || void 0 === t ? void 0 : t.href)) && (Ae.string(n.source) || Ae.undefined(n.source)) && (Ae.undefined(n.relatedInformation) || Ae.typedArray(n.relatedInformation, g.is)); }; }(T || (T = {})), function (e) { e.create = function (e, t) { for (var n = [], r = 2; r < arguments.length; r++)
            n[r - 2] = arguments[r]; var o = { title: e, command: t }; return Ae.defined(n) && n.length > 0 && (o.arguments = n), o; }, e.is = function (e) { var t = e; return Ae.defined(t) && Ae.string(t.title) && Ae.string(t.command); }; }(E || (E = {})), function (e) { e.replace = function (e, t) { return { range: e, newText: t }; }, e.insert = function (e, t) { return { range: { start: e, end: e }, newText: t }; }, e.del = function (e) { return { range: e, newText: "" }; }, e.is = function (e) { var t = e; return Ae.objectLiteral(t) && Ae.string(t.newText) && c.is(t.range); }; }(_ || (_ = {})), function (e) { e.create = function (e, t, n) { var r = { label: e }; return void 0 !== t && (r.needsConfirmation = t), void 0 !== n && (r.description = n), r; }, e.is = function (e) { var t = e; return Ae.objectLiteral(t) && Ae.string(t.label) && (Ae.boolean(t.needsConfirmation) || void 0 === t.needsConfirmation) && (Ae.string(t.description) || void 0 === t.description); }; }(R || (R = {})), function (e) { e.is = function (e) { var t = e; return Ae.string(t); }; }(S || (S = {})), function (e) { e.replace = function (e, t, n) { return { range: e, newText: t, annotationId: n }; }, e.insert = function (e, t, n) { return { range: { start: e, end: e }, newText: t, annotationId: n }; }, e.del = function (e, t) { return { range: e, newText: "", annotationId: t }; }, e.is = function (e) { var t = e; return _.is(t) && (R.is(t.annotationId) || S.is(t.annotationId)); }; }(O || (O = {})), function (e) { e.create = function (e, t) { return { textDocument: e, edits: t }; }, e.is = function (e) { var t = e; return Ae.defined(t) && I.is(t.textDocument) && Array.isArray(t.edits); }; }(A || (A = {})), function (e) { e.create = function (e, t, n) { var r = { kind: "create", uri: e }; return void 0 === t || void 0 === t.overwrite && void 0 === t.ignoreIfExists || (r.options = t), void 0 !== n && (r.annotationId = n), r; }, e.is = function (e) { var t = e; return t && "create" === t.kind && Ae.string(t.uri) && (void 0 === t.options || (void 0 === t.options.overwrite || Ae.boolean(t.options.overwrite)) && (void 0 === t.options.ignoreIfExists || Ae.boolean(t.options.ignoreIfExists))) && (void 0 === t.annotationId || S.is(t.annotationId)); }; }(N || (N = {})), function (e) { e.create = function (e, t, n, r) { var o = { kind: "rename", oldUri: e, newUri: t }; return void 0 === n || void 0 === n.overwrite && void 0 === n.ignoreIfExists || (o.options = n), void 0 !== r && (o.annotationId = r), o; }, e.is = function (e) { var t = e; return t && "rename" === t.kind && Ae.string(t.oldUri) && Ae.string(t.newUri) && (void 0 === t.options || (void 0 === t.options.overwrite || Ae.boolean(t.options.overwrite)) && (void 0 === t.options.ignoreIfExists || Ae.boolean(t.options.ignoreIfExists))) && (void 0 === t.annotationId || S.is(t.annotationId)); }; }(k || (k = {})), function (e) { e.create = function (e, t, n) { var r = { kind: "delete", uri: e }; return void 0 === t || void 0 === t.recursive && void 0 === t.ignoreIfNotExists || (r.options = t), void 0 !== n && (r.annotationId = n), r; }, e.is = function (e) { var t = e; return t && "delete" === t.kind && Ae.string(t.uri) && (void 0 === t.options || (void 0 === t.options.recursive || Ae.boolean(t.options.recursive)) && (void 0 === t.options.ignoreIfNotExists || Ae.boolean(t.options.ignoreIfNotExists))) && (void 0 === t.annotationId || S.is(t.annotationId)); }; }(w || (w = {})), function (e) { e.is = function (e) { var t = e; return t && (void 0 !== t.changes || void 0 !== t.documentChanges) && (void 0 === t.documentChanges || t.documentChanges.every((function (e) { return Ae.string(e.kind) ? N.is(e) || k.is(e) || w.is(e) : A.is(e); }))); }; }(x || (x = {}));
        var C, P, I, D, L, M, j, U, F, q, W, B, $, H, V, K, G, z, X, Y, J, Q, Z, ee, te, ne, re, oe, ie, ae, se, ce, ue, le, fe, pe, he, de, ye, ge, me, ve, be, Te, Ee = function () { function e(e, t) { this.edits = e, this.changeAnnotations = t; } return e.prototype.insert = function (e, t, n) { var r, o; if (void 0 === n ? r = _.insert(e, t) : S.is(n) ? (o = n, r = O.insert(e, t, n)) : (this.assertChangeAnnotations(this.changeAnnotations), o = this.changeAnnotations.manage(n), r = O.insert(e, t, o)), this.edits.push(r), void 0 !== o)
            return o; }, e.prototype.replace = function (e, t, n) { var r, o; if (void 0 === n ? r = _.replace(e, t) : S.is(n) ? (o = n, r = O.replace(e, t, n)) : (this.assertChangeAnnotations(this.changeAnnotations), o = this.changeAnnotations.manage(n), r = O.replace(e, t, o)), this.edits.push(r), void 0 !== o)
            return o; }, e.prototype.delete = function (e, t) { var n, r; if (void 0 === t ? n = _.del(e) : S.is(t) ? (r = t, n = O.del(e, t)) : (this.assertChangeAnnotations(this.changeAnnotations), r = this.changeAnnotations.manage(t), n = O.del(e, r)), this.edits.push(n), void 0 !== r)
            return r; }, e.prototype.add = function (e) { this.edits.push(e); }, e.prototype.all = function () { return this.edits; }, e.prototype.clear = function () { this.edits.splice(0, this.edits.length); }, e.prototype.assertChangeAnnotations = function (e) { if (void 0 === e)
            throw new Error("Text edit change is not configured to manage change annotations."); }, e; }(), _e = function () { function e(e) { this._annotations = void 0 === e ? Object.create(null) : e, this._counter = 0, this._size = 0; } return e.prototype.all = function () { return this._annotations; }, Object.defineProperty(e.prototype, "size", { get: function () { return this._size; }, enumerable: !1, configurable: !0 }), e.prototype.manage = function (e, t) { var n; if (S.is(e) ? n = e : (n = this.nextId(), t = e), void 0 !== this._annotations[n])
            throw new Error("Id ".concat(n, " is already in use.")); if (void 0 === t)
            throw new Error("No annotation provided for id ".concat(n)); return this._annotations[n] = t, this._size++, n; }, e.prototype.nextId = function () { return this._counter++, this._counter.toString(); }, e; }(), Re = function () { function e(e) { var t = this; this._textEditChanges = Object.create(null), void 0 !== e ? (this._workspaceEdit = e, e.documentChanges ? (this._changeAnnotations = new _e(e.changeAnnotations), e.changeAnnotations = this._changeAnnotations.all(), e.documentChanges.forEach((function (e) { if (A.is(e)) {
            var n = new Ee(e.edits, t._changeAnnotations);
            t._textEditChanges[e.textDocument.uri] = n;
        } }))) : e.changes && Object.keys(e.changes).forEach((function (n) { var r = new Ee(e.changes[n]); t._textEditChanges[n] = r; }))) : this._workspaceEdit = {}; } return Object.defineProperty(e.prototype, "edit", { get: function () { return this.initDocumentChanges(), void 0 !== this._changeAnnotations && (0 === this._changeAnnotations.size ? this._workspaceEdit.changeAnnotations = void 0 : this._workspaceEdit.changeAnnotations = this._changeAnnotations.all()), this._workspaceEdit; }, enumerable: !1, configurable: !0 }), e.prototype.getTextEditChange = function (e) { if (I.is(e)) {
            if (this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges)
                throw new Error("Workspace edit is not configured for document changes.");
            var t = { uri: e.uri, version: e.version };
            if (!(r = this._textEditChanges[t.uri])) {
                var n = { textDocument: t, edits: o = [] };
                this._workspaceEdit.documentChanges.push(n), r = new Ee(o, this._changeAnnotations), this._textEditChanges[t.uri] = r;
            }
            return r;
        } if (this.initChanges(), void 0 === this._workspaceEdit.changes)
            throw new Error("Workspace edit is not configured for normal text edit changes."); var r; if (!(r = this._textEditChanges[e])) {
            var o = [];
            this._workspaceEdit.changes[e] = o, r = new Ee(o), this._textEditChanges[e] = r;
        } return r; }, e.prototype.initDocumentChanges = function () { void 0 === this._workspaceEdit.documentChanges && void 0 === this._workspaceEdit.changes && (this._changeAnnotations = new _e, this._workspaceEdit.documentChanges = [], this._workspaceEdit.changeAnnotations = this._changeAnnotations.all()); }, e.prototype.initChanges = function () { void 0 === this._workspaceEdit.documentChanges && void 0 === this._workspaceEdit.changes && (this._workspaceEdit.changes = Object.create(null)); }, e.prototype.createFile = function (e, t, n) { if (this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges)
            throw new Error("Workspace edit is not configured for document changes."); var r, o, i; if (R.is(t) || S.is(t) ? r = t : n = t, void 0 === r ? o = N.create(e, n) : (i = S.is(r) ? r : this._changeAnnotations.manage(r), o = N.create(e, n, i)), this._workspaceEdit.documentChanges.push(o), void 0 !== i)
            return i; }, e.prototype.renameFile = function (e, t, n, r) { if (this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges)
            throw new Error("Workspace edit is not configured for document changes."); var o, i, a; if (R.is(n) || S.is(n) ? o = n : r = n, void 0 === o ? i = k.create(e, t, r) : (a = S.is(o) ? o : this._changeAnnotations.manage(o), i = k.create(e, t, r, a)), this._workspaceEdit.documentChanges.push(i), void 0 !== a)
            return a; }, e.prototype.deleteFile = function (e, t, n) { if (this.initDocumentChanges(), void 0 === this._workspaceEdit.documentChanges)
            throw new Error("Workspace edit is not configured for document changes."); var r, o, i; if (R.is(t) || S.is(t) ? r = t : n = t, void 0 === r ? o = w.create(e, n) : (i = S.is(r) ? r : this._changeAnnotations.manage(r), o = w.create(e, n, i)), this._workspaceEdit.documentChanges.push(o), void 0 !== i)
            return i; }, e; }();
        !function (e) { e.create = function (e) { return { uri: e }; }, e.is = function (e) { var t = e; return Ae.defined(t) && Ae.string(t.uri); }; }(C || (C = {})), function (e) { e.create = function (e, t) { return { uri: e, version: t }; }, e.is = function (e) { var t = e; return Ae.defined(t) && Ae.string(t.uri) && Ae.integer(t.version); }; }(P || (P = {})), function (e) { e.create = function (e, t) { return { uri: e, version: t }; }, e.is = function (e) { var t = e; return Ae.defined(t) && Ae.string(t.uri) && (null === t.version || Ae.integer(t.version)); }; }(I || (I = {})), function (e) { e.create = function (e, t, n, r) { return { uri: e, languageId: t, version: n, text: r }; }, e.is = function (e) { var t = e; return Ae.defined(t) && Ae.string(t.uri) && Ae.string(t.languageId) && Ae.integer(t.version) && Ae.string(t.text); }; }(D || (D = {})), function (e) { e.PlainText = "plaintext", e.Markdown = "markdown", e.is = function (t) { var n = t; return n === e.PlainText || n === e.Markdown; }; }(L || (L = {})), function (e) { e.is = function (e) { var t = e; return Ae.objectLiteral(e) && L.is(t.kind) && Ae.string(t.value); }; }(M || (M = {})), function (e) { e.Text = 1, e.Method = 2, e.Function = 3, e.Constructor = 4, e.Field = 5, e.Variable = 6, e.Class = 7, e.Interface = 8, e.Module = 9, e.Property = 10, e.Unit = 11, e.Value = 12, e.Enum = 13, e.Keyword = 14, e.Snippet = 15, e.Color = 16, e.File = 17, e.Reference = 18, e.Folder = 19, e.EnumMember = 20, e.Constant = 21, e.Struct = 22, e.Event = 23, e.Operator = 24, e.TypeParameter = 25; }(j || (j = {})), function (e) { e.PlainText = 1, e.Snippet = 2; }(U || (U = {})), function (e) { e.Deprecated = 1; }(F || (F = {})), function (e) { e.create = function (e, t, n) { return { newText: e, insert: t, replace: n }; }, e.is = function (e) { var t = e; return t && Ae.string(t.newText) && c.is(t.insert) && c.is(t.replace); }; }(q || (q = {})), function (e) { e.asIs = 1, e.adjustIndentation = 2; }(W || (W = {})), function (e) { e.is = function (e) { var t = e; return t && (Ae.string(t.detail) || void 0 === t.detail) && (Ae.string(t.description) || void 0 === t.description); }; }(B || (B = {})), function (e) { e.create = function (e) { return { label: e }; }; }($ || ($ = {})), function (e) { e.create = function (e, t) { return { items: e || [], isIncomplete: !!t }; }; }(H || (H = {})), function (e) { e.fromPlainText = function (e) { return e.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&"); }, e.is = function (e) { var t = e; return Ae.string(t) || Ae.objectLiteral(t) && Ae.string(t.language) && Ae.string(t.value); }; }(V || (V = {})), function (e) { e.is = function (e) { var t = e; return !!t && Ae.objectLiteral(t) && (M.is(t.contents) || V.is(t.contents) || Ae.typedArray(t.contents, V.is)) && (void 0 === e.range || c.is(e.range)); }; }(K || (K = {})), function (e) { e.create = function (e, t) { return t ? { label: e, documentation: t } : { label: e }; }; }(G || (G = {})), function (e) { e.create = function (e, t) { for (var n = [], r = 2; r < arguments.length; r++)
            n[r - 2] = arguments[r]; var o = { label: e }; return Ae.defined(t) && (o.documentation = t), Ae.defined(n) ? o.parameters = n : o.parameters = [], o; }; }(z || (z = {})), function (e) { e.Text = 1, e.Read = 2, e.Write = 3; }(X || (X = {})), function (e) { e.create = function (e, t) { var n = { range: e }; return Ae.number(t) && (n.kind = t), n; }; }(Y || (Y = {})), function (e) { e.File = 1, e.Module = 2, e.Namespace = 3, e.Package = 4, e.Class = 5, e.Method = 6, e.Property = 7, e.Field = 8, e.Constructor = 9, e.Enum = 10, e.Interface = 11, e.Function = 12, e.Variable = 13, e.Constant = 14, e.String = 15, e.Number = 16, e.Boolean = 17, e.Array = 18, e.Object = 19, e.Key = 20, e.Null = 21, e.EnumMember = 22, e.Struct = 23, e.Event = 24, e.Operator = 25, e.TypeParameter = 26; }(J || (J = {})), function (e) { e.Deprecated = 1; }(Q || (Q = {})), function (e) { e.create = function (e, t, n, r, o) { var i = { name: e, kind: t, location: { uri: r, range: n } }; return o && (i.containerName = o), i; }; }(Z || (Z = {})), function (e) { e.create = function (e, t, n, r) { return void 0 !== r ? { name: e, kind: t, location: { uri: n, range: r } } : { name: e, kind: t, location: { uri: n } }; }; }(ee || (ee = {})), function (e) { e.create = function (e, t, n, r, o, i) { var a = { name: e, detail: t, kind: n, range: r, selectionRange: o }; return void 0 !== i && (a.children = i), a; }, e.is = function (e) { var t = e; return t && Ae.string(t.name) && Ae.number(t.kind) && c.is(t.range) && c.is(t.selectionRange) && (void 0 === t.detail || Ae.string(t.detail)) && (void 0 === t.deprecated || Ae.boolean(t.deprecated)) && (void 0 === t.children || Array.isArray(t.children)) && (void 0 === t.tags || Array.isArray(t.tags)); }; }(te || (te = {})), function (e) { e.Empty = "", e.QuickFix = "quickfix", e.Refactor = "refactor", e.RefactorExtract = "refactor.extract", e.RefactorInline = "refactor.inline", e.RefactorRewrite = "refactor.rewrite", e.Source = "source", e.SourceOrganizeImports = "source.organizeImports", e.SourceFixAll = "source.fixAll"; }(ne || (ne = {})), function (e) { e.Invoked = 1, e.Automatic = 2; }(re || (re = {})), function (e) { e.create = function (e, t, n) { var r = { diagnostics: e }; return null != t && (r.only = t), null != n && (r.triggerKind = n), r; }, e.is = function (e) { var t = e; return Ae.defined(t) && Ae.typedArray(t.diagnostics, T.is) && (void 0 === t.only || Ae.typedArray(t.only, Ae.string)) && (void 0 === t.triggerKind || t.triggerKind === re.Invoked || t.triggerKind === re.Automatic); }; }(oe || (oe = {})), function (e) { e.create = function (e, t, n) { var r = { title: e }, o = !0; return "string" == typeof t ? (o = !1, r.kind = t) : E.is(t) ? r.command = t : r.edit = t, o && void 0 !== n && (r.kind = n), r; }, e.is = function (e) { var t = e; return t && Ae.string(t.title) && (void 0 === t.diagnostics || Ae.typedArray(t.diagnostics, T.is)) && (void 0 === t.kind || Ae.string(t.kind)) && (void 0 !== t.edit || void 0 !== t.command) && (void 0 === t.command || E.is(t.command)) && (void 0 === t.isPreferred || Ae.boolean(t.isPreferred)) && (void 0 === t.edit || x.is(t.edit)); }; }(ie || (ie = {})), function (e) { e.create = function (e, t) { var n = { range: e }; return Ae.defined(t) && (n.data = t), n; }, e.is = function (e) { var t = e; return Ae.defined(t) && c.is(t.range) && (Ae.undefined(t.command) || E.is(t.command)); }; }(ae || (ae = {})), function (e) { e.create = function (e, t) { return { tabSize: e, insertSpaces: t }; }, e.is = function (e) { var t = e; return Ae.defined(t) && Ae.uinteger(t.tabSize) && Ae.boolean(t.insertSpaces); }; }(se || (se = {})), function (e) { e.create = function (e, t, n) { return { range: e, target: t, data: n }; }, e.is = function (e) { var t = e; return Ae.defined(t) && c.is(t.range) && (Ae.undefined(t.target) || Ae.string(t.target)); }; }(ce || (ce = {})), function (e) { e.create = function (e, t) { return { range: e, parent: t }; }, e.is = function (t) { var n = t; return Ae.objectLiteral(n) && c.is(n.range) && (void 0 === n.parent || e.is(n.parent)); }; }(ue || (ue = {})), function (e) { e.namespace = "namespace", e.type = "type", e.class = "class", e.enum = "enum", e.interface = "interface", e.struct = "struct", e.typeParameter = "typeParameter", e.parameter = "parameter", e.variable = "variable", e.property = "property", e.enumMember = "enumMember", e.event = "event", e.function = "function", e.method = "method", e.macro = "macro", e.keyword = "keyword", e.modifier = "modifier", e.comment = "comment", e.string = "string", e.number = "number", e.regexp = "regexp", e.operator = "operator", e.decorator = "decorator"; }(le || (le = {})), function (e) { e.declaration = "declaration", e.definition = "definition", e.readonly = "readonly", e.static = "static", e.deprecated = "deprecated", e.abstract = "abstract", e.async = "async", e.modification = "modification", e.documentation = "documentation", e.defaultLibrary = "defaultLibrary"; }(fe || (fe = {})), function (e) { e.is = function (e) { var t = e; return Ae.objectLiteral(t) && (void 0 === t.resultId || "string" == typeof t.resultId) && Array.isArray(t.data) && (0 === t.data.length || "number" == typeof t.data[0]); }; }(pe || (pe = {})), function (e) { e.create = function (e, t) { return { range: e, text: t }; }, e.is = function (e) { var t = e; return null != t && c.is(t.range) && Ae.string(t.text); }; }(he || (he = {})), function (e) { e.create = function (e, t, n) { return { range: e, variableName: t, caseSensitiveLookup: n }; }, e.is = function (e) { var t = e; return null != t && c.is(t.range) && Ae.boolean(t.caseSensitiveLookup) && (Ae.string(t.variableName) || void 0 === t.variableName); }; }(de || (de = {})), function (e) { e.create = function (e, t) { return { range: e, expression: t }; }, e.is = function (e) { var t = e; return null != t && c.is(t.range) && (Ae.string(t.expression) || void 0 === t.expression); }; }(ye || (ye = {})), function (e) { e.create = function (e, t) { return { frameId: e, stoppedLocation: t }; }, e.is = function (e) { var t = e; return Ae.defined(t) && c.is(e.stoppedLocation); }; }(ge || (ge = {})), function (e) { e.Type = 1, e.Parameter = 2, e.is = function (e) { return 1 === e || 2 === e; }; }(me || (me = {})), function (e) { e.create = function (e) { return { value: e }; }, e.is = function (e) { var t = e; return Ae.objectLiteral(t) && (void 0 === t.tooltip || Ae.string(t.tooltip) || M.is(t.tooltip)) && (void 0 === t.location || u.is(t.location)) && (void 0 === t.command || E.is(t.command)); }; }(ve || (ve = {})), function (e) { e.create = function (e, t, n) { var r = { position: e, label: t }; return void 0 !== n && (r.kind = n), r; }, e.is = function (e) { var t = e; return Ae.objectLiteral(t) && s.is(t.position) && (Ae.string(t.label) || Ae.typedArray(t.label, ve.is)) && (void 0 === t.kind || me.is(t.kind)) && void 0 === t.textEdits || Ae.typedArray(t.textEdits, _.is) && (void 0 === t.tooltip || Ae.string(t.tooltip) || M.is(t.tooltip)) && (void 0 === t.paddingLeft || Ae.boolean(t.paddingLeft)) && (void 0 === t.paddingRight || Ae.boolean(t.paddingRight)); }; }(be || (be = {})), function (e) { e.is = function (e) { var t = e; return Ae.objectLiteral(t) && o.is(t.uri) && Ae.string(t.name); }; }(Te || (Te = {}));
        var Se, Oe = ["\n", "\r\n", "\r"];
        !function (e) { function t(e, n) { if (e.length <= 1)
            return e; var r = e.length / 2 | 0, o = e.slice(0, r), i = e.slice(r); t(o, n), t(i, n); for (var a = 0, s = 0, c = 0; a < o.length && s < i.length;) {
            var u = n(o[a], i[s]);
            e[c++] = u <= 0 ? o[a++] : i[s++];
        } for (; a < o.length;)
            e[c++] = o[a++]; for (; s < i.length;)
            e[c++] = i[s++]; return e; } e.create = function (e, t, n, r) { return new Ne(e, t, n, r); }, e.is = function (e) { var t = e; return !!(Ae.defined(t) && Ae.string(t.uri) && (Ae.undefined(t.languageId) || Ae.string(t.languageId)) && Ae.uinteger(t.lineCount) && Ae.func(t.getText) && Ae.func(t.positionAt) && Ae.func(t.offsetAt)); }, e.applyEdits = function (e, n) { for (var r = e.getText(), o = t(n, (function (e, t) { var n = e.range.start.line - t.range.start.line; return 0 === n ? e.range.start.character - t.range.start.character : n; })), i = r.length, a = o.length - 1; a >= 0; a--) {
            var s = o[a], c = e.offsetAt(s.range.start), u = e.offsetAt(s.range.end);
            if (!(u <= i))
                throw new Error("Overlapping edit");
            r = r.substring(0, c) + s.newText + r.substring(u, r.length), i = c;
        } return r; }; }(Se || (Se = {}));
        var Ae, Ne = function () { function e(e, t, n, r) { this._uri = e, this._languageId = t, this._version = n, this._content = r, this._lineOffsets = void 0; } return Object.defineProperty(e.prototype, "uri", { get: function () { return this._uri; }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "languageId", { get: function () { return this._languageId; }, enumerable: !1, configurable: !0 }), Object.defineProperty(e.prototype, "version", { get: function () { return this._version; }, enumerable: !1, configurable: !0 }), e.prototype.getText = function (e) { if (e) {
            var t = this.offsetAt(e.start), n = this.offsetAt(e.end);
            return this._content.substring(t, n);
        } return this._content; }, e.prototype.update = function (e, t) { this._content = e.text, this._version = t, this._lineOffsets = void 0; }, e.prototype.getLineOffsets = function () { if (void 0 === this._lineOffsets) {
            for (var e = [], t = this._content, n = !0, r = 0; r < t.length; r++) {
                n && (e.push(r), n = !1);
                var o = t.charAt(r);
                n = "\r" === o || "\n" === o, "\r" === o && r + 1 < t.length && "\n" === t.charAt(r + 1) && r++;
            }
            n && t.length > 0 && e.push(t.length), this._lineOffsets = e;
        } return this._lineOffsets; }, e.prototype.positionAt = function (e) { e = Math.max(Math.min(e, this._content.length), 0); var t = this.getLineOffsets(), n = 0, r = t.length; if (0 === r)
            return s.create(0, e); for (; n < r;) {
            var o = Math.floor((n + r) / 2);
            t[o] > e ? r = o : n = o + 1;
        } var i = n - 1; return s.create(i, e - t[i]); }, e.prototype.offsetAt = function (e) { var t = this.getLineOffsets(); if (e.line >= t.length)
            return this._content.length; if (e.line < 0)
            return 0; var n = t[e.line], r = e.line + 1 < t.length ? t[e.line + 1] : this._content.length; return Math.max(Math.min(n + e.character, r), n); }, Object.defineProperty(e.prototype, "lineCount", { get: function () { return this.getLineOffsets().length; }, enumerable: !1, configurable: !0 }), e; }();
        !function (e) { var t = Object.prototype.toString; e.defined = function (e) { return void 0 !== e; }, e.undefined = function (e) { return void 0 === e; }, e.boolean = function (e) { return !0 === e || !1 === e; }, e.string = function (e) { return "[object String]" === t.call(e); }, e.number = function (e) { return "[object Number]" === t.call(e); }, e.numberRange = function (e, n, r) { return "[object Number]" === t.call(e) && n <= e && e <= r; }, e.integer = function (e) { return "[object Number]" === t.call(e) && -2147483648 <= e && e <= 2147483647; }, e.uinteger = function (e) { return "[object Number]" === t.call(e) && 0 <= e && e <= 2147483647; }, e.func = function (e) { return "[object Function]" === t.call(e); }, e.objectLiteral = function (e) { return null !== e && "object" == typeof e; }, e.typedArray = function (e, t) { return Array.isArray(e) && e.every(t); }; }(Ae || (Ae = {}));
    }, 2094: (e, t, n) => {
        "use strict";
        var r = n(3243), o = n(2191), i = n(2680), a = n(326), s = i("Object.prototype.toString"), c = n(7226)(), u = "undefined" == typeof globalThis ? n.g : globalThis, l = o(), f = i("String.prototype.slice"), p = {}, h = Object.getPrototypeOf;
        c && a && h && r(l, (function (e) { if ("function" == typeof u[e]) {
            var t = new u[e];
            if (Symbol.toStringTag in t) {
                var n = h(t), r = a(n, Symbol.toStringTag);
                if (!r) {
                    var o = h(n);
                    r = a(o, Symbol.toStringTag);
                }
                p[e] = r.get;
            }
        } }));
        var d = n(198);
        e.exports = function (e) { return !!d(e) && (c && Symbol.toStringTag in e ? function (e) { var t = !1; return r(p, (function (n, r) { if (!t)
            try {
                var o = n.call(e);
                o === r && (t = o);
            }
            catch (e) { } })), t; }(e) : f(s(e), 8, -1)); };
    }, 2191: (e, t, n) => {
        "use strict";
        var r = ["BigInt64Array", "BigUint64Array", "Float32Array", "Float64Array", "Int16Array", "Int32Array", "Int8Array", "Uint16Array", "Uint32Array", "Uint8Array", "Uint8ClampedArray"], o = "undefined" == typeof globalThis ? n.g : globalThis;
        e.exports = function () { for (var e = [], t = 0; t < r.length; t++)
            "function" == typeof o[r[t]] && (e[e.length] = r[t]); return e; };
    } }, t = {}; function n(r) { var o = t[r]; if (void 0 !== o)
    return o.exports; var i = t[r] = { id: r, loaded: !1, exports: {} }; return e[r].call(i.exports, i, i.exports, n), i.loaded = !0, i.exports; } n.d = (e, t) => { for (var r in t)
    n.o(t, r) && !n.o(e, r) && Object.defineProperty(e, r, { enumerable: !0, get: t[r] }); }, n.g = function () { if ("object" == typeof globalThis)
    return globalThis; try {
    return this || new Function("return this")();
}
catch (e) {
    if ("object" == typeof window)
        return window;
} }(), n.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t), n.r = e => { "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 }); }, n.nmd = e => (e.paths = [], e.children || (e.children = []), e); var r = {}; return (() => {
    "use strict";
    var e = r;
    Object.defineProperty(e, "__esModule", { value: !0 }), e.XmlService = void 0;
    const t = n(3401), o = n(3429), i = n(6066), a = n(2926), s = n(6565), c = n(2723), u = n(9939);
    class l extends t.BaseService {
        $service;
        schemas = {};
        constructor(e) { super(e); }
        addDocument(e) { super.addDocument(e), this.$configureService(e.uri); }
        $getXmlSchemaUri(e) { return this.getOption(e, "schemaUri"); }
        $configureService(e) { this.getOption(e, "schemas")?.forEach((t => { t.uri === this.$getXmlSchemaUri(e) && (t.fileMatch ??= [], t.fileMatch.push(e)); let n = t.schema ?? this.schemas[t.uri]; n && (this.schemas[t.uri] = n), t.schema = void 0; })); }
        $getSchema(e) { let t = this.$getXmlSchemaUri(e); if (t && this.schemas[t])
            return JSON.parse(this.schemas[t]); }
        async doValidation(e) { let t = this.getDocument(e.uri); if (!t)
            return []; const { cst: n, tokenVector: r, lexErrors: l, parseErrors: f } = (0, o.parse)(t.getText()), p = (0, i.buildAst)(n, r), h = (0, a.checkConstraints)(p); let d = this.$getSchema(e.uri), y = []; if (d) {
            const e = (0, s.getSchemaValidators)(d);
            y = (0, c.validate)({ doc: p, validators: { attribute: [e.attribute], element: [e.element] } });
        } return [...l.map((e => (0, u.lexingErrorToDiagnostic)(t, e))), ...f.map((e => (0, u.parsingErrorToDiagnostic)(t, e))), ...h.map((e => (0, u.issueToDiagnostic)(t, e))), ...y.map((e => (0, u.issueToDiagnostic)(t, e)))]; }
    }
    e.XmlService = l;
})(), r; })()));



/***/ })

}]);
//# sourceMappingURL=bundle.949.js.map